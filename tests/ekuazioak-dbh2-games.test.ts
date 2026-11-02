import test from 'node:test'
import assert from 'node:assert/strict'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import { toNumber } from '../src/features/unit-v2/math/fraction.ts'
import { equationsGameModeForPath, equationsGameProgressIds, equationsGames } from '../src/pages/dbh2-ekuazioak-v2/games/info.ts'
import { checkEquationsPitAnswer, EQUATIONS_RACE_CIRCUITS, equationsRaceErrorTips, generateEquationsRaceQuestion } from '../src/pages/dbh2-ekuazioak-v2/games/race.ts'
import { createEquationsMemoryBoard, createSolveRound, EQUATIONS_MEMORY_PAIRS, equationsMemoryLevels, SOLVES_PER_ROUND, solveLevels, solveStars } from '../src/pages/dbh2-ekuazioak-v2/games/boards.ts'
import { equationsLabChallengeIds } from '../src/pages/dbh2-ekuazioak-v2/lab/labTools.ts'
import { createEquationDetectiveCases, equationDetectiveLevels, equationDetectiveNames, equationDetectiveTips, solutionsValue } from '../src/pages/dbh2-ekuazioak-v2/games/detective.ts'
import { createPoseRounds, POSE_ROUNDS, POSE_TEMPLATES } from '../src/pages/dbh2-ekuazioak-v2/games/pose.ts'
import { checkTexts, renders } from './helpers/ownGamesCheck.ts'

/** Evaluates one side of an equation in LaTeX at x: fractions, powers, brackets, implicit products */
function side(latex: string, x: number): number {
    let js = latex.replace(/\\cdot/g, '*').replace(/\s+/g, '').replace(/x/g, 'X')
    for (let pass = 0; pass < 3; pass += 1) {
        js = js
            .replace(/\\frac\{([^{}]+)\}\{([^{}]+)\}/g, '(($1)/($2))')
            .replace(/(\([^()]+\)|X|\d+)\^\{(\d+)\}/g, 'Math.pow($1,$2)')
    }
    js = js.replace(/(\d|X|\))(?=X|\(|Math)/g, '$1*').replace(/X/g, `(${x})`)
    assert.ok(/^(?:[\d+\-*/().,]|Math\.pow)+$/.test(js), `${latex} → ${js}`)
    return Function(`return ${js}`)() as number
}

const holds = (equation: string, x: number) => {
    const [left, right] = equation.split('=')
    return Math.abs(side(left, x) - side(right, x)) < 1e-9
}

test('ekuazioak 2. DBH games: levels, ids and routes', () => {
    assert.equal(equationsGames.length, 5)
    assert.equal(equationsGames[0].levels.length, EQUATIONS_RACE_CIRCUITS)
    assert.equal(equationsGames.find((game) => game.id === 'solve')!.levels.length, solveLevels.length)
    assert.equal(equationsGames.find((game) => game.id === 'memory')!.levels.length, equationsMemoryLevels.length)
    assert.equal(new Set(equationsGameProgressIds).size, equationsGameProgressIds.length)
    assert.ok(!equationsGameProgressIds.some((id) => equationsLabChallengeIds.includes(id)))
    assert.equal(equationsGameModeForPath('/matematika/dbh2/ekuazioak/juegos/resolver'), 'solve')
})

test('ekuazioak 2. DBH race: the answer solves the equation and no wrong option does', () => {
    for (let circuit = 0; circuit < EQUATIONS_RACE_CIRCUITS; circuit += 1) {
        for (let seed = 1; seed <= 150; seed += 1) {
            const random = createRandom(seed * 13 + circuit)
            for (const tier of [0, 1, 2] as const) {
                const question = generateEquationsRaceQuestion(random, circuit, tier)
                assert.equal(question.options.length, 4, question.kind)
                assert.equal(new Set(question.options.map((option) => option.latex)).size, 4, question.kind)
                assert.equal(question.options.filter((option) => option.correct).length, 1)
                const value = toNumber(question.answer)
                assert.equal(Number(question.options.find((option) => option.correct)!.latex), value)
                assert.equal(checkEquationsPitAnswer(question, String(value)), 'correct')
                const [equation, solved] = question.solution.es.replace(/\$/g, '').split('\\ \\to\\ ')
                assert.equal(solved, `x=${value}`)
                assert.ok(holds(equation, value), `${question.kind}: ${equation} at ${value}`)
                for (const option of question.options.filter((item) => !item.correct)) {
                    assert.ok(equationsRaceErrorTips[option.error!], option.error!)
                    assert.ok(!holds(equation, Number(option.latex)), `${question.kind}: ${equation} also holds at ${option.latex}`)
                }
                if (circuit < 4) assert.ok(Number.isInteger(value))
            }
        }
    }
})

test('ekuazioak 2. DBH quick solving and memory', () => {
    for (let level = 0; level < solveLevels.length; level += 1) {
        for (let seed = 1; seed <= 20; seed += 1) {
            const round = createSolveRound(createRandom(seed * 5 + level), level)
            assert.equal(round.length, SOLVES_PER_ROUND)
            for (const item of round) assert.ok(holds(item.latex, item.answer), `${item.latex} at ${item.answer}`)
        }
    }
    assert.equal(solveStars(0, 1000, 0), 3)
    for (let level = 0; level < equationsMemoryLevels.length; level += 1) {
        for (let seed = 1; seed <= 40; seed += 1) {
            const cards = createEquationsMemoryBoard(createRandom(seed * 7 + level), level)
            assert.equal(cards.length, EQUATIONS_MEMORY_PAIRS * 2)
            for (const card of cards.filter((item) => item.id.endsWith('-q'))) {
                const partner = cards.find((item) => item.setId === card.setId && item.id.endsWith('-a'))!
                const solutions = [...partner.latex.matchAll(/(-?\d+)/g)].map((match) => Number(match[1]))
                const values = partner.latex.includes('\\pm') ? [solutions[0], -solutions[0]] : solutions
                for (const x of values) assert.ok(holds(card.latex, x), `${card.latex} at ${x}`)
            }
        }
    }
})

/* ---------- The games of this topic ---------- */

test('ekuazioak 2. DBH pose: the right equation holds for the answer, the wrong ones do not', () => {
    for (let level = 0; level < 3; level += 1) {
        const seen = new Set<string>()
        for (let seed = 1; seed <= 150; seed += 1) {
            const rounds = createPoseRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, POSE_ROUNDS)
            for (const round of rounds) {
                seen.add(round.text.es.slice(0, 18))
                assert.equal(round.options.length, 4)
                assert.equal(new Set(round.options).size, 4)
                assert.ok(Number.isInteger(round.x) && round.x > 0, `${round.x}`)
                round.options.forEach((option, index) => {
                    renders(option)
                    assert.equal(holds(option, round.x), index === round.right, `${round.text.es}: ${option}`)
                })
                // The check is a chain of true equalities
                const parts = round.check.split('=')
                for (let index = 1; index < parts.length; index += 1) assert.ok(Math.abs(side(parts[index - 1], 0) - side(parts[index], 0)) < 1e-9, round.check)
                checkTexts([round.text, round.answer])
            }
        }
        assert.ok(seen.size >= POSE_TEMPLATES[level].length, `${seen.size}`)
    }
})

/** The value of the last line of a solution: x = 4, or x₁ = 3, x₂ = −3 */
function lineValue(latex: string): number {
    const last = latex.split('\\to\\ ').pop()!
    const values = last.split(',\\ ').map((part) => side(part.split('=').pop()!, 0))
    assert.ok(values.length > 0, latex)
    return solutionsValue(values)
}

test('ekuazioak 2. DBH detective: one wrong line, the fix ends on the right solutions', () => {
    checkTexts([...Object.values(equationDetectiveNames), ...Object.values(equationDetectiveTips)])
    for (let level = 0; level < 3; level += 1) {
        const seen = new Set<string>()
        for (let seed = 1; seed <= 100; seed += 1) {
            for (const item of createEquationDetectiveCases(createRandom(seed * 7919 + level), level)) {
                seen.add(item.error)
                assert.ok(equationDetectiveLevels[level].includes(item.error))
                assert.ok(item.options.includes(item.error) && new Set(item.options).size === 3)
                assert.equal(item.lines.length, 3)
                for (const line of item.lines) renders(line.latex)
                renders(item.fix)
                checkTexts([item.problem])
                assert.ok(Math.abs(lineValue(item.fix) - item.right) < 1e-9, `${item.error}: ${item.fix} ≠ ${item.right}`)
                assert.ok(Math.abs(lineValue(item.lines[2].latex) - item.reached) < 1e-9, `${item.error}: ${item.lines[2].latex} ≠ ${item.reached}`)
                // The right solutions solve the problem's equation
                const equation = item.problem.es.match(/\$([^$]+)\$/)![1]
                const solutions = item.fix.split('\\to\\ ').pop()!.split(',\\ ').map((part) => side(part.split('=').pop()!, 0))
                for (const solution of solutions) assert.ok(holds(equation, solution), `${item.error}: ${equation} at ${solution}`)
            }
        }
        assert.equal(seen.size, 4)
    }
})
