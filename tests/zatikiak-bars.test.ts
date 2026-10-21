import test from 'node:test'
import assert from 'node:assert/strict'
import {
    barChallenges,
    barFractions,
    barSolution,
    barValues,
    initialBarModelState,
    setBarModel,
    type BarModelState
} from '../src/pages/dbh2-zatikiak-prototype/lab/barModel.ts'
import { equals, fraction } from '../src/pages/dbh2-zatikiak-prototype/math/fraction.ts'

const solved = (state: BarModelState) => barChallenges.filter((challenge) => challenge.isSolved(state)).map((challenge) => challenge.id)

test('zatikiak bars: the worked solution always reaches the asked value', () => {
    for (const secondOf of ['none', 'whole', 'rest'] as const) for (let parts = 2; parts <= 6; parts += 1) for (let first = 0; first <= parts; first += 1) {
        for (let second = 0; second <= 4; second += 1) for (const known of ['total', 'first', 'second', 'left'] as const) for (const asked of ['total', 'first', 'second', 'left'] as const) {
            const state = setBarModel(initialBarModelState, { secondOf, parts, first, second, restParts: 4, known, knownValue: 60, asked })
            const fractions = barFractions(state)
            assert.ok(equals(fraction(1), [fractions.first, fractions.second, fractions.left].reduce((sum, item) => fraction(sum.numerator * item.denominator + item.numerator * sum.denominator, sum.denominator * item.denominator))))
            const values = barValues(state)
            const steps = barSolution(state)
            assert.equal(values === null, steps === null)
            if (values && steps) assert.ok(equals(steps[steps.length - 1].value, values[state.asked]), `${secondOf} ${parts} ${first} ${second} ${known} ${asked}`)
        }
    }
})

test('zatikiak bars: every challenge is solved by its model and answer, and none at the start', () => {
    const solutions: BarModelState[] = [
        { ...setBarModel(initialBarModelState, { parts: 8, first: 3, known: 'first', knownValue: 45, asked: 'total' }), answer: '120' },
        { ...setBarModel(initialBarModelState, { parts: 5, first: 2, known: 'total', knownValue: 120, asked: 'left' }), answer: '72' },
        { ...setBarModel(initialBarModelState, { parts: 3, first: 1, secondOf: 'rest', restParts: 5, second: 2, known: 'left', knownValue: 36, asked: 'total' }), answer: '90' },
        { ...setBarModel(initialBarModelState, { parts: 12, first: 3, secondOf: 'whole', second: 4, known: 'left', knownValue: 10, asked: 'total' }), answer: '24' }
    ]
    solutions.forEach((state, index) => assert.ok(solved(state).includes(barChallenges[index].id), `${barChallenges[index].id}`))
    assert.deepEqual(solved(initialBarModelState), [])
    // A wrong answer or a wrong reading of "what is left" does not count
    assert.deepEqual(solved({ ...solutions[2], answer: '60' }), [])
    assert.deepEqual(solved({ ...setBarModel(solutions[2], { secondOf: 'whole', second: 2, parts: 15, first: 5 }), answer: '90' }), [])
})
