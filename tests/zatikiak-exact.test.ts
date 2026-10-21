import test from 'node:test'
import assert from 'node:assert/strict'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import { equals, fraction, type FractionValue } from '../src/pages/dbh2-zatikiak-prototype/math/fraction.ts'
import {
    createExactRounds,
    EXACT_ROUNDS,
    exactLevels,
    exactRoundPoints,
    exactStars,
    operateExact,
    solveExact,
    type ExactStep
} from '../src/pages/dbh2-zatikiak-prototype/games/exact.ts'

/** Plays the steps on the cards: each step must use cards that are there, and the target must appear */
function replay(cards: FractionValue[], steps: ExactStep[], target: FractionValue): boolean {
    let pool = [...cards]
    for (const step of steps) {
        const left = pool.findIndex((card) => equals(card, step.left))
        if (left < 0) return false
        pool = pool.filter((_, index) => index !== left)
        const right = pool.findIndex((card) => equals(card, step.right))
        if (right < 0) return false
        pool = pool.filter((_, index) => index !== right)
        const result = operateExact(step.op, step.left, step.right)
        if (!result || !equals(result, step.result)) return false
        pool.push(result)
    }
    return pool.some((card) => equals(card, target))
}

test('zatikiak exact: every round can be solved, and the target is never a card already', () => {
    exactLevels.forEach((level, levelIndex) => {
        const targets = new Set<string>()
        for (let seed = 1; seed <= 60; seed += 1) {
            const rounds = createExactRounds(createRandom(seed * 977 + levelIndex), levelIndex)
            assert.equal(rounds.length, EXACT_ROUNDS)
            for (const round of rounds) {
                const values = round.cards.map((card) => card.value)
                assert.equal(values.length, level.cards)
                assert.equal(new Set(round.cards.map((card) => card.id)).size, level.cards)
                for (const value of values) {
                    assert.ok(value.numerator > 0, 'positive cards')
                    assert.ok(level.denominators.includes(value.denominator) || value.denominator === 1, `${value.numerator}/${value.denominator}`)
                }
                assert.ok(!values.some((value) => equals(value, round.target)))
                assert.ok(round.target.numerator > 0 && round.target.denominator <= level.maxTargetDenominator)
                // The built solution works, uses only the level's operations and positive steps
                assert.ok(replay(values, round.solution, round.target))
                for (const step of round.solution) assert.ok(level.ops.includes(step.op) && step.result.numerator > 0)
                assert.ok(round.solution.length >= level.used[0] - 1 && round.solution.length <= level.used[1] - 1)
                // The hint search finds a way that is no longer than the built one
                const found = solveExact(values, round.target, level.ops)
                assert.ok(found && found.length >= 1 && found.length <= round.solution.length && replay(values, found, round.target))
                targets.add(`${round.target.numerator}/${round.target.denominator}`)
            }
        }
        assert.ok(targets.size > 40, `level ${levelIndex}: ${targets.size} targets`)
    })
})

test('zatikiak exact: the solver, the points and the stars', () => {
    assert.deepEqual(solveExact([fraction(1, 2), fraction(3, 4)], fraction(3, 4), ['+']), [])
    assert.equal(solveExact([fraction(1, 2)], fraction(1, 3), ['+', '-', '·', ':']), null)
    assert.equal(solveExact([fraction(1, 2), fraction(1, 2)], fraction(1, 3), ['+', '-']), null)
    const found = solveExact([fraction(1, 2), fraction(1, 3), fraction(2)], fraction(5, 3), ['+', '-', '·', ':'])
    assert.ok(found && replay([fraction(1, 2), fraction(1, 3), fraction(2)], found, fraction(5, 3)))
    assert.equal(operateExact(':', fraction(1, 2), fraction(0)), null)
    assert.equal(exactRoundPoints(true, false), 100)
    assert.equal(exactRoundPoints(true, true), 50)
    assert.equal(exactRoundPoints(false, true), 0)
    assert.deepEqual([500, 450, 400, 300, 150, 100].map(exactStars), [3, 3, 2, 2, 1, 0])
})
