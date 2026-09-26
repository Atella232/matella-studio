import test from 'node:test'
import assert from 'node:assert/strict'
import {
    add,
    answerEquals,
    compare,
    divide,
    equals,
    fraction,
    hasTerminatingDecimal,
    multiply,
    power,
    parseFractionInput,
    subtract,
    toExactDecimal,
    toMixedText,
    toText
} from '../src/pages/dbh2-zatikiak-prototype/math/fraction.ts'

test('normalizes signs and equivalent fractions', () => {
    assert.deepEqual(fraction(2, -4), { numerator: -1, denominator: 2 })
    assert.equal(equals(fraction(3, 4), fraction(45, 60)), true)
})

test('keeps negative intermediate results in combined operations', () => {
    const negative = subtract(fraction(1, 3), fraction(5, 6))
    assert.equal(toText(negative), '-1/2')
    assert.equal(toText(add(negative, fraction(1, 4))), '-1/4')
    assert.equal(toText(multiply(negative, fraction(2, 3))), '-1/3')
    assert.equal(toText(divide(negative, fraction(3, 2))), '-1/3')
})

test('parses equivalent, localized and mixed answers', () => {
    assert.equal(answerEquals('45/60', fraction(3, 4)), true)
    assert.equal(answerEquals('0,75 litros', fraction(3, 4)), true)
    assert.equal(answerEquals('٠٫٧٥ لتر', fraction(3, 4)), true)
    assert.equal(answerEquals('75%', fraction(3, 4)), true)
    assert.equal(answerEquals('٧٥٪', fraction(3, 4)), true)
    assert.deepEqual(parseFractionInput('-1 2/3'), fraction(-5, 3))
    assert.equal(answerEquals('12000', fraction(1200)), false)
    assert.equal(answerEquals('1200 o 12000', fraction(1200)), false)
})

test('distinguishes exact decimals from recurring approximations', () => {
    assert.equal(hasTerminatingDecimal(fraction(3, 8)), true)
    assert.equal(toExactDecimal(fraction(3, 8)), '0,375')
    assert.equal(toExactDecimal(fraction(1, 4)), '0,25')
    assert.equal(hasTerminatingDecimal(fraction(1, 3)), false)
    assert.equal(toExactDecimal(fraction(1, 3)), null)
})

test('solves the corrected water-tank challenge exactly', () => {
    const remainingShare = multiply(multiply(fraction(3, 4), fraction(2, 3)), fraction(3, 5))
    assert.equal(toText(remainingShare), '3/10')
    assert.equal(toText(divide(fraction(1300), remainingShare)), '13000/3')
    assert.equal(toText(divide(fraction(1800), remainingShare)), '6000')
})

test('supports ordering and improper fraction display', () => {
    assert.equal(compare(fraction(-2, 3), fraction(1, 4)), -1)
    assert.equal(toMixedText(fraction(7, 3)), '2 1/3')
})

test('calculates powers without an exponent off-by-one', () => {
    assert.equal(toText(power(fraction(-3, 5), 2)), '9/25')
    assert.equal(toText(power(fraction(-3, 5), 3)), '-27/125')
    assert.equal(toText(power(fraction(2, 3), 0)), '1')
    assert.equal(toText(power(fraction(2, 3), -2)), '9/4')
})

test('satisfies rational arithmetic properties on a dense small domain', () => {
    for (let leftTop = -5; leftTop <= 5; leftTop += 1) {
        for (let leftBottom = 1; leftBottom <= 5; leftBottom += 1) {
            const left = fraction(leftTop, leftBottom)
            for (let rightTop = -5; rightTop <= 5; rightTop += 1) {
                for (let rightBottom = 1; rightBottom <= 5; rightBottom += 1) {
                    const right = fraction(rightTop, rightBottom)
                    assert.equal(equals(add(left, right), add(right, left)), true)
                    assert.equal(equals(multiply(left, right), multiply(right, left)), true)
                    assert.equal(equals(subtract(left, right), add(left, fraction(-right.numerator, right.denominator))), true)
                    if (right.numerator !== 0) {
                        assert.equal(equals(multiply(divide(left, right), right), left), true)
                    }
                }
            }
        }
    }
})

test('rejects division by zero', () => {
    assert.throws(() => divide(fraction(1, 2), fraction(0)), /zero/)
})
