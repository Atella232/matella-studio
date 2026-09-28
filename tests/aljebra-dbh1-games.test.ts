import test from 'node:test'
import assert from 'node:assert/strict'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import { toNumber } from '../src/features/unit-v2/math/fraction.ts'
import { algebraGameModeForPath, algebraGameProgressIds, algebraGames } from '../src/pages/dbh1-aljebra-v2/games/info.ts'
import { ALGEBRA_RACE_CIRCUITS, algebraRaceErrorTips, checkAlgebraPitAnswer, generateAlgebraRaceQuestion } from '../src/pages/dbh1-aljebra-v2/games/race.ts'
import { algebraMemoryLevels, createAlgebraMemoryBoard, createEquationRound, equationLevels, EQUATIONS_PER_ROUND, MEMORY_PAIRS } from '../src/pages/dbh1-aljebra-v2/games/equations.ts'
import { algebraLabChallengeIds } from '../src/pages/dbh1-aljebra-v2/lab/labTools.ts'

/** Evaluates an expression in x written in LaTeX (implicit products, powers, fractions) */
function evaluate(latex: string, x: number): number {
    const js = latex
        .replace(/\\frac\{([^{}]+)\}\{([^{}]+)\}/g, '(($1)/($2))')
        .replace(/\\cdot/g, '*')
        .replace(/x\^\{(\d+)\}/g, 'P($1)')
        .replace(/(\d|\))(?=[xP(])/g, '$1*')
        .replace(/P\((\d+)\)/g, 'Math.pow(x,$1)')
        .replace(/x/g, `(${x})`)
    return Function(`return ${js}`)() as number
}

test('aljebra 1. DBH games: levels, ids and routes', () => {
    assert.equal(algebraGames.length, 3)
    assert.equal(algebraGames[0].levels.length, ALGEBRA_RACE_CIRCUITS)
    assert.equal(algebraGames.find((game) => game.id === 'balance')!.levels.length, equationLevels.length)
    assert.equal(algebraGames.find((game) => game.id === 'memory')!.levels.length, algebraMemoryLevels.length)
    assert.equal(new Set(algebraGameProgressIds).size, algebraGameProgressIds.length)
    assert.ok(!algebraGameProgressIds.some((id) => algebraLabChallengeIds.includes(id)))
    assert.equal(algebraGameModeForPath('/matematika/dbh1/algebra/juegos/balanza'), 'balance')
    for (const game of algebraGames) for (const level of game.levels) assert.ok(!JSON.stringify(level.description).includes('$'), level.progressId.toString())
})

test('aljebra 1. DBH race: four different options, one right answer, equations solved by their answer', () => {
    let equations = 0
    for (let circuit = 0; circuit < ALGEBRA_RACE_CIRCUITS; circuit += 1) {
        for (let seed = 1; seed <= 120; seed += 1) {
            const random = createRandom(seed * 17 + circuit)
            for (const tier of [0, 1, 2] as const) {
                const question = generateAlgebraRaceQuestion(random, circuit, tier)
                assert.equal(question.options.length, 4, question.kind)
                assert.equal(new Set(question.options.map((option) => option.latex)).size, 4, `${question.kind}: ${question.options.map((option) => option.latex)}`)
                assert.equal(question.options.filter((option) => option.correct).length, 1)
                for (const option of question.options) if (!option.correct) assert.ok(algebraRaceErrorTips[option.error!], option.error!)
                const right = question.options.find((option) => option.correct)!
                if (question.writable) {
                    assert.equal(Number(right.latex), toNumber(question.answer), question.kind)
                    const value = toNumber(question.answer)
                    assert.equal(checkAlgebraPitAnswer(question, value < 0 ? `−${-value}` : String(value)), 'correct')
                }
                const equation = question.prompt.es.match(/^Resuelve: \$([^$]+)\$$/)?.[1]
                if (equation) {
                    const [left, rightSide] = equation.split('=')
                    const x = toNumber(question.answer)
                    assert.ok(Math.abs(evaluate(left, x) - evaluate(rightSide, x)) < 1e-9, `${equation} x=${x}`)
                    for (const option of question.options.filter((item) => !item.correct)) {
                        const wrong = Number(option.latex)
                        assert.ok(Math.abs(evaluate(left, wrong) - evaluate(rightSide, wrong)) > 1e-9, `${equation}: ${wrong} also works`)
                    }
                    equations += 1
                }
            }
        }
    }
    assert.ok(equations > 500)
})

test('aljebra 1. DBH balance game and memory', () => {
    for (let level = 0; level < equationLevels.length; level += 1) {
        for (let seed = 1; seed <= 40; seed += 1) {
            const round = createEquationRound(createRandom(seed + level * 50), level)
            assert.equal(round.length, EQUATIONS_PER_ROUND)
            for (const item of round) {
                const [left, right] = item.latex.split('=')
                assert.ok(Math.abs(evaluate(left, item.answer) - evaluate(right, item.answer)) < 1e-9, item.latex)
            }
        }
    }
    for (let level = 0; level < algebraMemoryLevels.length; level += 1) {
        for (let seed = 1; seed <= 40; seed += 1) {
            const cards = createAlgebraMemoryBoard(createRandom(seed * 3 + level), level)
            assert.equal(cards.length, MEMORY_PAIRS * 2, `level ${level}`)
            const answers = cards.filter((card) => card.id.endsWith('-a')).map((card) => card.latex)
            assert.equal(new Set(answers).size, MEMORY_PAIRS)
            for (const card of cards.filter((item) => item.id.endsWith('-q'))) {
                const partner = cards.find((item) => item.setId === card.setId && item.id.endsWith('-a'))!
                const valueX = card.latex.match(/\(x=(-?\d+)\)/)
                if (valueX) assert.equal(evaluate(card.latex.replace(/\\ \(x=-?\d+\)/, ''), Number(valueX[1])), Number(partner.latex))
                else for (const x of [2, 3]) assert.ok(Math.abs(evaluate(card.latex, x) - evaluate(partner.latex, x)) < 1e-9, `${card.latex} = ${partner.latex}`)
            }
        }
    }
})
