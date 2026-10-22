import test from 'node:test'
import assert from 'node:assert/strict'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import { gcd } from '../src/pages/dbh2-zatikiak-prototype/math/fraction.ts'
import { labToolForTopic, labTools } from '../src/pages/dbh2-zatikiak-prototype/lab/labTools.ts'
import {
    decimalLatex,
    decimalsChallenges,
    decimalsExtra,
    denominatorFactors,
    divisionDone,
    divisionKind,
    finishDivision,
    initialDecimalsState,
    kindFromFactors,
    longDivision,
    nextDigit,
    predictDecimal,
    quotientParts,
    restartDivision,
    setDecimalsNumbers,
    type DecimalKind,
    type DecimalsState
} from '../src/pages/dbh2-zatikiak-prototype/lab/decimals.ts'

const at = (numerator: number, denominator: number) => setDecimalsNumbers(initialDecimalsState, { numerator, denominator })
const divided = (numerator: number, denominator: number, prediction: DecimalKind = 'exact') => finishDivision(predictDecimal(at(numerator, denominator), prediction))
const solved = (state: DecimalsState) => decimalsChallenges.filter((challenge) => challenge.isSolved(state)).map((challenge) => challenge.id)
const exponent = (n: number, prime: number) => {
    let count = 0
    for (let rest = n; rest % prime === 0; rest /= prime) count += 1
    return count
}

test('zatikiak decimals: long division with its remainders and period', () => {
    const cases: Array<[number, number, number, string, string]> = [
        [3, 8, 0, '375', ''],
        [7, 12, 0, '58', '3'],
        [1, 7, 0, '', '142857'],
        [11, 6, 1, '8', '3'],
        [1, 3, 0, '', '3'],
        [1, 12, 0, '08', '3'],
        [12, 4, 3, '', '']
    ]
    for (const [numerator, denominator, integer, preperiod, period] of cases) {
        assert.deepEqual(quotientParts(longDivision(numerator, denominator)), { integer, preperiod, period }, `${numerator}/${denominator}`)
    }
    const division = longDivision(7, 12)
    assert.deepEqual(division.steps, [
        { dividend: 70, digit: 5, remainder: 10 },
        { dividend: 100, digit: 8, remainder: 4 },
        { dividend: 40, digit: 3, remainder: 4 }
    ])
    assert.equal(division.first, 7)
    assert.equal(division.periodStart, 2)
    assert.equal(decimalLatex(division), '0{,}58\\overline{3}')
    assert.equal(decimalLatex(longDivision(3, 8), '.'), '0{.}375')
    assert.equal(decimalLatex(longDivision(12, 4)), '3')
    assert.equal(divisionKind(longDivision(1, 7)), 'pure')
    assert.equal(divisionKind(division), 'mixed')
    assert.equal(divisionKind(longDivision(3, 8)), 'exact')
})

test('zatikiak decimals: every division gives the fraction back and the denominator predicts its kind', () => {
    for (let denominator = 2; denominator <= 40; denominator += 1) {
        for (let numerator = 1; numerator <= 200; numerator += 1) {
            const division = longDivision(numerator, denominator)
            const label = `${numerator}/${denominator}`
            // Each step brings down a 0 and divides again
            let carried = division.first
            for (const step of division.steps) {
                assert.equal(step.dividend, carried * 10, label)
                assert.ok(step.digit >= 0 && step.digit <= 9, label)
                assert.equal(step.remainder, step.dividend - step.digit * denominator, label)
                carried = step.remainder
            }
            // The division stops at 0 or at the first remainder seen twice
            const remainders = [division.first, ...division.steps.map((step) => step.remainder)]
            if (division.periodStart === null) assert.equal(remainders[remainders.length - 1], 0, label)
            else {
                assert.equal(remainders.indexOf(remainders[remainders.length - 1]), division.periodStart, label)
                assert.equal(new Set(remainders.slice(0, -1)).size, remainders.length - 1, label)
            }
            // The decimal is worth the fraction: integer + (pre·period − pre) / (99…9 00…0)
            const { integer, preperiod, period } = quotientParts(division)
            const [top, bottom] = period
                ? [BigInt(preperiod + period) - BigInt(preperiod || '0'), (10n ** BigInt(period.length) - 1n) * 10n ** BigInt(preperiod.length)]
                : [BigInt(preperiod || '0'), 10n ** BigInt(preperiod.length)]
            assert.equal((BigInt(integer) * bottom + top) * BigInt(denominator), BigInt(numerator) * bottom, label)
            // Without dividing: the simplified denominator tells the kind and how many digits come before the period
            const factors = denominatorFactors(numerator, denominator)
            assert.equal(factors.left.reduce((total, factor) => total * factor, 1), denominator / gcd(numerator, denominator), label)
            assert.equal(divisionKind(division), kindFromFactors(factors.left), label)
            assert.equal(preperiod.length, Math.max(exponent(factors.denominator, 2), exponent(factors.denominator, 5)), label)
            assert.ok(period.length < denominator, label)
        }
    }
})

test('zatikiak decimals: the simplified denominator crosses out what goes with the numerator', () => {
    assert.deepEqual(denominatorFactors(9, 12), { factors: [2, 2, 3], cancelled: [false, false, true], numerator: 3, denominator: 4, left: [2, 2] })
    assert.deepEqual(denominatorFactors(7, 12).cancelled, [false, false, false])
    assert.deepEqual(denominatorFactors(12, 4).left, [])
    assert.equal(kindFromFactors([]), 'exact')
    assert.equal(kindFromFactors([2, 5, 5]), 'exact')
    assert.equal(kindFromFactors([3, 7]), 'pure')
    assert.equal(kindFromFactors([2, 3]), 'mixed')
})

test('zatikiak decimals: predict first, then divide digit by digit', () => {
    let state = at(7, 12)
    assert.equal(nextDigit(state), state, 'no division before a prediction')
    assert.equal(finishDivision(state), state)
    assert.equal(divisionDone(state), false)
    state = predictDecimal(state, 'pure')
    assert.equal(predictDecimal(state, 'mixed').prediction, 'pure', 'a prediction cannot be changed afterwards')
    state = nextDigit(nextDigit(state))
    assert.equal(state.shown, 2)
    assert.equal(divisionDone(state), false)
    state = nextDigit(nextDigit(state))
    assert.equal(state.shown, 3, 'never past the end')
    assert.ok(divisionDone(state))
    assert.deepEqual(restartDivision(state), { ...state, shown: 0, prediction: null })
    // A whole number is done as soon as it is predicted
    assert.ok(divisionDone(predictDecimal(at(12, 4), 'exact')))
    // New numbers start again and stay within the limits
    assert.deepEqual(setDecimalsNumbers(state, { denominator: 500 }), { numerator: 7, denominator: 40, shown: 0, prediction: null })
    assert.equal(setDecimalsNumbers(state, { denominator: 1 }).denominator, 2)
    assert.equal(setDecimalsNumbers(state, { numerator: 0 }).numerator, 1)
})

test('zatikiak decimals: challenges and endless practice', () => {
    assert.deepEqual(decimalsChallenges.map((challenge) => challenge.id), [1801, 1802, 1803, 1804])
    assert.deepEqual(solved(initialDecimalsState), [])
    assert.ok(solved(divided(3, 8)).includes(1801))
    assert.ok(solved(divided(1, 7)).includes(1802))
    assert.ok(solved(divided(1, 13)).includes(1802))
    assert.ok(solved(divided(1, 12)).includes(1803))
    assert.ok(solved(divided(3, 6)).includes(1804))
    // Half-done, a whole number or the wrong kind does not count
    assert.ok(!solved(nextDigit(predictDecimal(at(3, 8), 'exact'))).includes(1801))
    assert.ok(!solved(divided(3, 3)).includes(1804))
    assert.ok(!solved(divided(5, 6)).includes(1803), 'one digit before the period')
    assert.ok(!solved(divided(1, 21)).includes(1803))
    for (const challenge of decimalsChallenges) {
        for (const language of ['eu', 'es', 'ar'] as const) {
            assert.ok(challenge.prompt[language].trim() && challenge.hint[language].trim())
            // Basque statements never put a suffix right after a number
            if (language === 'eu') assert.doesNotMatch(challenge.prompt.eu + challenge.hint.eu, /\d(?:ren|ko|ra|tik|rekin|an|ean|ek|z)\b/)
        }
    }
    const kinds = new Set<DecimalKind>()
    for (let seed = 1; seed <= 300; seed += 1) {
        const challenge = decimalsExtra(createRandom(seed * 389))
        const { numerator, denominator, prediction } = challenge.solution
        assert.ok(challenge.isSolved(challenge.solution) && !challenge.isSolved(initialDecimalsState), `${seed}`)
        assert.ok(!challenge.isSolved({ ...challenge.solution, prediction: prediction === 'exact' ? 'pure' : 'exact' }), 'the prediction must be right')
        assert.ok(numerator <= 999 && denominator <= 40 && numerator % denominator !== 0, `${numerator}/${denominator}`)
        kinds.add(divisionKind(longDivision(numerator, denominator)))
        for (const text of [...Object.values(challenge.prompt), ...Object.values(challenge.hint)]) assert.ok(text.length > 0)
    }
    assert.equal(kinds.size, 3)
})

test('zatikiak decimals: the tool opens from the fractions, decimals and percentages lesson', () => {
    const tool = labTools.find((item) => item.id === 'decimals')
    assert.ok(tool)
    assert.equal(tool.stage, 'proportionality')
    assert.equal(tool.lessonTopic, 'percentages')
    assert.equal(labToolForTopic.percentages, 'decimals')
})
