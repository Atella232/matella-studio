import test from 'node:test'
import assert from 'node:assert/strict'
import { equals, fraction, toNumber } from '../src/features/unit-v2/math/fraction.ts'
import {
    absoluteError,
    contains,
    decimalKind,
    divisionRemainders,
    expand,
    expansionLatex,
    fromScientific,
    generatrix,
    generatrixLatex,
    inequalityLatex,
    integerRoot,
    intersection,
    interval,
    intervalLatex,
    kindFromDenominator,
    primeFactors,
    rationalSet,
    relativeError,
    roundDecimal,
    simplifySqrt,
    sqrtSet,
    toScientific,
    truncateDecimal
} from '../src/pages/dbh4-aplikatuak-errealak/reals.ts'

test('errealak 4. DBH: long division finds the period and the generating fraction gives it back', () => {
    assert.equal(expansionLatex(expand(fraction(11, 6))), '1{,}8\\overline{3}')
    assert.equal(expansionLatex(expand(fraction(2, 3))), '0{,}\\overline{6}')
    assert.equal(expansionLatex(expand(fraction(8, 11))), '0{,}\\overline{72}')
    assert.equal(expansionLatex(expand(fraction(9, 5))), '1{,}8')
    assert.equal(expansionLatex(expand(fraction(-125, 11))), '-11{,}\\overline{36}')
    assert.equal(expansionLatex(expand(fraction(19, 22))), '0{,}8\\overline{63}')
    assert.equal(generatrixLatex(expand(fraction(11, 6))), '\\frac{183-18}{90}')
    assert.deepEqual(divisionRemainders(fraction(11, 6)), [5, 2, 2])
    // Every fraction with a small denominator survives the round trip, and its kind is read from the denominator
    for (let denominator = 1; denominator <= 60; denominator += 1) {
        for (let numerator = -70; numerator <= 70; numerator += 7) {
            const value = fraction(numerator, denominator)
            const expansion = expand(value)
            assert.ok(equals(generatrix(expansion), value), `${numerator}/${denominator}`)
            assert.equal(decimalKind(expansion), kindFromDenominator(value), `${numerator}/${denominator}`)
            if (expansion.period === '' && expansion.preperiod !== '') assert.equal(Number(`${expansion.integer}.${expansion.preperiod}`), Math.abs(toNumber(value)))
        }
    }
})

test('errealak 4. DBH: truncating and rounding are exact, like the textbook table', () => {
    const table: Array<[string, string, string]> = [['1.234', '1.23', '1.23'], ['82.745', '82.74', '82.75'], ['9.007', '9.00', '9.01'], ['15.107', '15.10', '15.11'], ['3.555', '3.55', '3.56'], ['8.5292', '8.52', '8.53']]
    for (const [number, truncated, rounded] of table) {
        assert.equal(truncateDecimal(number, 2), truncated)
        assert.equal(roundDecimal(number, 2), rounded)
    }
    assert.equal(roundDecimal('51,65', 0), '52')
    assert.equal(truncateDecimal('51,65', 0), '51')
    assert.equal(roundDecimal('2.4651', 1), '2.5')
    assert.equal(roundDecimal('-3.555', 2), '-3.56')
    assert.equal(roundDecimal('0.999', 2), '1.00')
    assert.equal(truncateDecimal('2.5', 3), '2.500')
    assert.ok(Math.abs(absoluteError(0.125, 0.12) - 0.005) < 1e-12)
    assert.ok(Math.abs(relativeError(0.125, 0.12) - 0.04) < 1e-12)
})

test('errealak 4. DBH: scientific notation goes there and back', () => {
    assert.deepEqual(toScientific('83400000000000000'), { mantissa: '8.34', exponent: 16 })
    assert.deepEqual(toScientific('0,0000000001846'), { mantissa: '1.846', exponent: -10 })
    assert.deepEqual(toScientific('-0.0000037'), { mantissa: '-3.7', exponent: -6 })
    assert.deepEqual(toScientific('9 170 000 000'), { mantissa: '9.17', exponent: 9 })
    for (const text of ['4800000000000', '0.00000000542', '14960000', '0.5', '7', '123.45', '0.000102']) {
        const scientific = toScientific(text)
        const mantissa = Math.abs(Number(scientific.mantissa))
        assert.ok(mantissa >= 1 && mantissa < 10, text)
        assert.equal(fromScientific(scientific), text)
    }
})

test('errealak 4. DBH: intervals are written, read and intersected', () => {
    assert.equal(intervalLatex(interval(-2, 4, true, false)), '[-2,\\,4)')
    assert.equal(intervalLatex(interval(null, -5, false, true)), '(-\\infty,\\,-5]')
    assert.equal(intervalLatex(interval(7, null, true, false)), '[7,\\,+\\infty)')
    assert.equal(inequalityLatex(interval(-2, 4, true, false)), '-2\\le x<4')
    assert.equal(inequalityLatex(interval(7, null, false, false)), 'x>7')
    assert.equal(inequalityLatex(interval(null, -5, false, true)), 'x\\le -5')
    const a = interval(-3, 7, true, false)
    assert.ok(contains(a, -3) && !contains(a, 7) && contains(a, 6.99))
    assert.deepEqual(intersection(a, interval(5, null, false, false)), interval(5, 7, false, false))
    assert.deepEqual(intersection(interval(2, 5, false, true), interval(-1, 4, true, false)), interval(2, 4, false, false))
    assert.equal(intersection(interval(0, 1, true, false), interval(1, 2, true, true)), null)
    assert.deepEqual(intersection(interval(0, 1, true, true), interval(1, 2, true, true)), interval(1, 1, true, true))
})

test('errealak 4. DBH: roots, radicals and number sets', () => {
    assert.equal(integerRoot(343, 3), 7)
    assert.equal(integerRoot(-32, 5), -2)
    assert.equal(integerRoot(-4, 2), null)
    assert.equal(integerRoot(21, 2), null)
    assert.deepEqual(simplifySqrt(72), { outside: 6, inside: 2 })
    assert.deepEqual(simplifySqrt(300), { outside: 10, inside: 3 })
    assert.deepEqual(simplifySqrt(13), { outside: 1, inside: 13 })
    for (let n = 1; n <= 500; n += 1) {
        const { outside, inside } = simplifySqrt(n)
        assert.equal(outside * outside * inside, n)
        assert.equal(simplifySqrt(inside).outside, 1)
    }
    assert.deepEqual(primeFactors(72), [2, 2, 2, 3, 3])
    assert.equal(rationalSet(fraction(6, 2)), 'natural')
    assert.equal(rationalSet(fraction(-4)), 'integer')
    assert.equal(rationalSet(fraction(13, 6)), 'rational')
    assert.equal(sqrtSet(16), 'natural')
    assert.equal(sqrtSet(21), 'irrational')
})
