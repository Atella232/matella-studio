import test from 'node:test'
import assert from 'node:assert/strict'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import { toNumber } from '../src/features/unit-v2/math/fraction.ts'
import { algebraGameModeForPath, algebraGameProgressIds, algebraGames } from '../src/pages/dbh2-aljebra-v2/games/info.ts'
import { ALGEBRA_RACE_CIRCUITS, algebraRaceErrorTips, checkAlgebraPitAnswer, generateAlgebraRaceQuestion } from '../src/pages/dbh2-aljebra-v2/games/race.ts'
import { ALGEBRA_MEMORY_PAIRS, algebraMemoryLevels, createAlgebraMemoryBoard, createExpansionRound, EXPANSIONS_PER_ROUND, expansionLevels, expansionStars } from '../src/pages/dbh2-aljebra-v2/games/boards.ts'
import { algebraLabChallengeIds } from '../src/pages/dbh2-aljebra-v2/lab/labTools.ts'
import { ALGEBRA_DETECTIVE_X, algebraDetectiveLevels, algebraDetectiveNames, algebraDetectiveTips, createAlgebraDetectiveCases } from '../src/pages/dbh2-aljebra-v2/games/detective.ts'
import { createPyramidRound, pyramidHolds, pyramidSolved, PYRAMID_BRICKS } from '../src/pages/dbh2-aljebra-v2/games/pyramid.ts'
import { checkTexts, renders } from './helpers/ownGamesCheck.ts'

/** Evaluates a LaTeX expression in x (or n) at a number: powers, implicit products, fractions, subscripts */
function evaluate(latex: string, x: number): number {
    let js = latex
        .replace(/a_\{\d+\}|a_\{n\}/g, '')
        .replace(/\\cdot/g, '*')
        .replace(/\\mathbin\{:\}/g, '/')
        .replace(/\\div/g, '/')
        .replace(/\s+/g, '')
        .replace(/[xn]/g, 'X')
    for (let pass = 0; pass < 3; pass += 1) {
        js = js
            .replace(/\\frac\{([^{}]+)\}\{([^{}]+)\}/g, '(($1)/($2))')
            .replace(/(\([^()]+\)|X|\d+)\^\{(\d+)\}/g, 'Math.pow($1,$2)')
    }
    js = js.replace(/(\d|X|\))(?=X|\(|Math)/g, '$1*').replace(/X/g, `(${x})`)
    assert.ok(/^(?:[\d+\-*/().]|Math\.pow|,)+$/.test(js), `${latex} → ${js}`)
    return Function(`return ${js}`)() as number
}

const mathIn = (text: string) => [...text.matchAll(/\$([^$]+)\$/g)].map((match) => match[1])

test('aljebra 2. DBH games: levels, ids and routes', () => {
    assert.equal(algebraGames.length, 5)
    assert.equal(algebraGames[0].levels.length, ALGEBRA_RACE_CIRCUITS)
    assert.equal(algebraGames.find((game) => game.id === 'expand')!.levels.length, expansionLevels.length)
    assert.equal(algebraGames.find((game) => game.id === 'memory')!.levels.length, algebraMemoryLevels.length)
    assert.equal(new Set(algebraGameProgressIds).size, algebraGameProgressIds.length)
    assert.ok(!algebraGameProgressIds.some((id) => algebraLabChallengeIds.includes(id)))
    assert.equal(algebraGameModeForPath('/matematika/dbh2/algebra/juegos/desarrollo'), 'expand')
    assert.equal(algebraGameModeForPath('/matematika/dbh2/algebra/jokuak/piramidea'), 'pyramid')
    assert.equal(algebraGameModeForPath('/matematika/dbh2/algebra/juegos/detective'), 'detective')
})

test('aljebra 2. DBH race: four different options, the right one equals the question, the wrong ones do not', () => {
    const points = [2, 3, -1, 5]
    for (let circuit = 0; circuit < ALGEBRA_RACE_CIRCUITS; circuit += 1) {
        for (let seed = 1; seed <= 120; seed += 1) {
            const random = createRandom(seed * 17 + circuit)
            for (const tier of [0, 1, 2] as const) {
                const question = generateAlgebraRaceQuestion(random, circuit, tier)
                assert.equal(question.options.length, 4, question.kind)
                assert.equal(new Set(question.options.map((option) => option.latex)).size, 4, question.kind)
                assert.equal(question.options.filter((option) => option.correct).length, 1)
                for (const option of question.options) if (!option.correct) assert.ok(algebraRaceErrorTips[option.error!], option.error!)
                const right = question.options.find((option) => option.correct)!
                const worked = mathIn(question.solution.es)[0]
                const sides = worked.split('=')
                if (question.writable) {
                    const value = toNumber(question.answer)
                    assert.equal(Number(right.latex), value)
                    for (const side of sides) assert.equal(evaluate(side, 0), value, `${question.kind}: ${worked}`)
                    assert.equal(checkAlgebraPitAnswer(question, String(value)), 'correct')
                    continue
                }
                // Expression questions: the worked equality holds and the right option is its last side
                assert.equal(sides[sides.length - 1], right.latex)
                const shown = mathIn(question.prompt.es)[0]
                for (const x of points) assert.ok(Math.abs(evaluate(shown, x) - evaluate(right.latex, x)) < 1e-9, `${question.kind}: ${shown} = ${right.latex}`)
                // A common factor that is not the greatest is still equal: it is wrong only because it is not finished
                for (const option of question.options.filter((item) => !item.correct && item.error !== 'not-greatest')) {
                    assert.ok(points.some((x) => Math.abs(evaluate(shown, x) - evaluate(option.latex, x)) > 1e-9), `${question.kind}: ${shown} ≠ ${option.latex}`)
                }
            }
        }
    }
})

test('aljebra 2. DBH quick expansion and memory', () => {
    for (let level = 0; level < expansionLevels.length; level += 1) {
        for (let seed = 1; seed <= 30; seed += 1) {
            const round = createExpansionRound(createRandom(seed * 3 + level), level)
            assert.equal(round.length, EXPANSIONS_PER_ROUND)
            for (const item of round) {
                // The expansion equals the product at several points
                for (const x of [2, 3, -1]) assert.ok(Math.abs(evaluate(item.latex, x) - evaluate(item.expansion, x)) < 1e-9, `${item.latex} = ${item.expansion}`)
                const expected = item.ask === 'constant' ? evaluate(item.latex, 0) : (evaluate(item.latex, 1) - evaluate(item.latex, -1)) / 2
                assert.equal(item.answer, expected, `${item.latex} ${item.ask}`)
            }
        }
    }
    assert.equal(expansionStars(0, 1000, 0), 3)
    for (let level = 0; level < algebraMemoryLevels.length; level += 1) {
        for (let seed = 1; seed <= 40; seed += 1) {
            const cards = createAlgebraMemoryBoard(createRandom(seed * 7 + level), level)
            assert.equal(cards.length, ALGEBRA_MEMORY_PAIRS * 2)
            assert.equal(new Set(cards.map((card) => card.latex)).size, cards.length)
            for (const card of cards.filter((item) => item.id.endsWith('-q'))) {
                const partner = cards.find((item) => item.setId === card.setId && item.id.endsWith('-a'))!
                for (const x of [2, 3, -1]) assert.ok(Math.abs(evaluate(card.latex, x) - evaluate(partner.latex, x)) < 1e-9, `${card.latex} = ${partner.latex}`)
            }
        }
    }
})

/* ---------- The games of this topic ---------- */

test('aljebra 2. DBH pyramid: the bricks hold, three right cards and three different mistakes', () => {
    for (let level = 0; level < 3; level += 1) {
        const patterns = new Set<string>()
        for (let seed = 1; seed <= 300; seed += 1) {
            const round = createPyramidRound(createRandom(seed * 7919 + level), level)
            assert.equal(round.bricks.length, PYRAMID_BRICKS)
            assert.equal(round.operation, level === 0 ? 'sum' : 'product')
            assert.ok(pyramidHolds(round.operation, round.bricks))
            assert.ok(round.bricks.every((term) => Number.isInteger(term.coefficient) && term.coefficient !== 0))
            assert.equal(round.hidden.length, 3)
            assert.equal(round.cards.length, 6)
            assert.equal(new Set(round.cards.map((card) => card.latex)).size, 6)
            for (const card of round.cards) renders(card.latex)
            // Placing each right card on its brick solves the round; a decoy anywhere does not
            const placed = Object.fromEntries(round.hidden.map((brick) => [brick, round.cards.findIndex((card) => card.brick === brick)]))
            assert.ok(pyramidSolved(round, placed))
            const decoy = round.cards.findIndex((card) => card.brick === null)
            assert.ok(!pyramidSolved(round, { ...placed, [round.hidden[0]]: decoy }))
            patterns.add(round.hidden.join())
            // Level 2 builds upwards only; level 3 has an empty bottom brick
            if (level === 1) assert.deepEqual(round.hidden, [3, 4, 5])
            if (level === 2) assert.ok(round.hidden.some((brick) => brick < 3))
        }
        assert.equal(patterns.size, [4, 1, 3][level])
    }
})

/** The last side of a line: after the last «=» or «→» */
const lastSide = (latex: string) => latex.split('=').pop()!.replace(/^.*\\to\\ /, '')

test('aljebra 2. DBH detective: one wrong line, the fix ends on the right polynomial', () => {
    checkTexts([...Object.values(algebraDetectiveNames), ...Object.values(algebraDetectiveTips)])
    for (let level = 0; level < 3; level += 1) {
        const seen = new Set<string>()
        for (let seed = 1; seed <= 80; seed += 1) {
            for (const item of createAlgebraDetectiveCases(createRandom(seed * 7919 + level), level)) {
                seen.add(item.error)
                assert.ok(algebraDetectiveLevels[level].includes(item.error))
                assert.ok(item.options.includes(item.error) && new Set(item.options).size === 3)
                assert.equal(item.lines.length, 3)
                for (const line of item.lines) renders(line.latex)
                renders(item.fix)
                checkTexts([item.problem])
                const fix = lastSide(item.fix.split('\\to\\ ').pop()!)
                assert.ok(Math.abs(evaluate(fix, ALGEBRA_DETECTIVE_X) - item.right) < 1e-9, `${item.error}: ${item.fix} ≠ ${item.right}`)
                assert.ok(Math.abs(evaluate(lastSide(item.lines[2].latex), ALGEBRA_DETECTIVE_X) - item.reached) < 1e-9, `${item.error}: ${item.lines[2].latex} ≠ ${item.reached}`)
                assert.ok(Math.abs(item.right - item.reached) > 1e-9)
            }
        }
        assert.equal(seen.size, 4)
    }
})
