import test from 'node:test'
import assert from 'node:assert/strict'
import { checkAnswer, fraction, parseFractionInput } from '../src/features/unit-v2/math/fraction.ts'

/* Thousands are grouped with a space (RAE): answers are right with a space, a point or nothing */

test('a whole number is right grouped with a space, a no-break or thin space, a point or nothing', () => {
    for (const written of ['15 728', '15\u00a0728', '15\u202f728', '15\u2009728', '15.728', '15728']) {
        assert.equal(checkAnswer(written, fraction(15728)), 'correct', written)
        assert.equal(checkAnswer(written, fraction(15728), 'simplified'), 'correct', written)
    }
    assert.equal(checkAnswer('1 234 567', fraction(1234567)), 'correct')
    assert.equal(checkAnswer('1.234.567', fraction(1234567)), 'correct')
    assert.equal(checkAnswer('15 728 €', fraction(15728)), 'correct')
})

test('a point is still a decimal point where a decimal is expected, and always in English', () => {
    assert.equal(checkAnswer('15.728', fraction(15728, 1000)), 'correct')
    assert.equal(checkAnswer('15,728', fraction(15728, 1000)), 'correct')
    assert.equal(checkAnswer('15.728', fraction(15728), 'any', false), 'incorrect')
    assert.equal(checkAnswer('15.72', fraction(1572)), 'incorrect')
})

test('a mixed number keeps its space', () => {
    assert.deepEqual(parseFractionInput('2 1/3'), fraction(7, 3))
    assert.deepEqual(parseFractionInput('12 100/300'), fraction(37, 3))
})
