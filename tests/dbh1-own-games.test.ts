import test from 'node:test'
import assert from 'node:assert/strict'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import { createNaturalsDetectiveCases, naturalsDetectiveLevels, naturalsDetectiveNames, naturalsDetectiveTips } from '../src/pages/dbh1-zenbaki-naturalak-v2/games/detective.ts'
import { createZeroRounds, effective, ROW_MAX, sumLatex, termsLatex, ZERO_LIMIT, ZERO_ROUNDS } from '../src/pages/dbh1-zenbaki-osoak-v2/games/zeroPairs.ts'
import { createIntegersDetectiveCases, integersDetectiveLevels, integersDetectiveNames, integersDetectiveTips } from '../src/pages/dbh1-zenbaki-osoak-v2/games/detective.ts'
import { createMeetRounds, createRectanglesRounds, departures, divisorsOf, gcd, lcm, MEET_ROUNDS, rectanglePairs, RECTANGLES_MAX, RECTANGLES_ROUNDS } from '../src/pages/dbh1-zatigarritasuna-v2/games/divisibilityRounds.ts'
import { createDivisibilityDetectiveCases, divisibilityDetectiveLevels, divisibilityDetectiveNames, divisibilityDetectiveTips } from '../src/pages/dbh1-zatigarritasuna-v2/games/detective.ts'
import { createShareRounds, createStripsRounds, reduce, SHARE_ROUNDS, STRIPS_ROUNDS, valueOf } from '../src/pages/dbh1-zatikiak-v2/games/fractionRounds.ts'
import { createFractionsDetectiveCases, fractionsDetectiveLevels, fractionsDetectiveNames, fractionsDetectiveTips } from '../src/pages/dbh1-zatikiak-v2/games/detective.ts'
import { columns, createCommaRounds, createPodiumRounds, fits, placed, placedLatex, PODIUM_ROUNDS, COMMA_ROUNDS, rightOrder, wrongOrder } from '../src/pages/dbh1-hamartarrak-v2/games/decimalRounds.ts'
import { createDecimalsDetectiveCases, decimalsDetectiveLevels, decimalsDetectiveNames, decimalsDetectiveTips } from '../src/pages/dbh1-hamartarrak-v2/games/detective.ts'
import { amountFor, createGridRounds, createRecipeRounds, GRID_COLUMNS, GRID_ROUNDS, RECIPE_ROUNDS } from '../src/pages/dbh1-proportzionaltasuna-v2/games/proportionRounds.ts'
import { createProportionDetectiveCases, proportionDetectiveLevels, proportionDetectiveNames, proportionDetectiveTips } from '../src/pages/dbh1-proportzionaltasuna-v2/games/detective.ts'
import { checkDetective, endValue, renders } from './helpers/ownGamesCheck.ts'

/* The own games of the 1. DBH units */

/** The end value of a line whose big numbers group thousands with a point (15.728) */
const naturalValue = (latex: string) => endValue(latex.replace(/(\d)\.(?=\d{3}(?!\d))/g, '$1'))

test('1. DBH number detective: the errors of each level, the fix and the last line on their values', () => {
    checkDetective(createNaturalsDetectiveCases, naturalsDetectiveLevels, naturalsDetectiveNames, naturalsDetectiveTips, 1e-9, undefined, naturalValue)
})

test('1. DBH zero pairs: the answer is the sum, never 0 nor out of the stepper, rows that fit, the levels as promised', () => {
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 200; seed += 1) {
            const rounds = createZeroRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, ZERO_ROUNDS)
            for (const { terms, answer, positives, negatives } of rounds) {
                const values = terms.map(effective)
                assert.equal(answer, values.reduce((sum, value) => sum + value, 0))
                assert.equal(positives - negatives, answer)
                assert.ok(answer !== 0 && Math.abs(answer) <= ZERO_LIMIT)
                assert.ok(positives <= ROW_MAX && negatives <= ROW_MAX)
                renders(termsLatex(terms))
                renders(sumLatex(terms))
                if (level === 0) assert.ok(terms.length === 2 && terms.every((term) => term.op === '+') && Math.sign(terms[0].value) !== Math.sign(terms[1].value))
                if (level === 1) assert.ok(terms.length === 2 && terms[1].op === '-')
                if (level === 2) assert.ok(terms.length >= 3 && terms.some((term) => term.op === '-' && term.value < 0))
            }
        }
    }
})

test('1. DBH integers detective: the errors of each level, the fix and the last line on their values', () => {
    checkDetective(createIntegersDetectiveCases, integersDetectiveLevels, integersDetectiveNames, integersDetectiveTips)
})

test('1. DBH rectangles: one rectangle per pair of divisors, answers inside the stepper and never its start', () => {
    assert.deepEqual(rectanglePairs(36), [[1, 36], [2, 18], [3, 12], [4, 9], [6, 6]])
    assert.deepEqual(divisorsOf(12), [1, 2, 3, 4, 6, 12])
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 200; seed += 1) {
            const rounds = createRectanglesRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, RECTANGLES_ROUNDS)
            assert.equal(new Set(rounds.map((round) => round.n)).size, RECTANGLES_ROUNDS)
            for (const { n, ask, answer } of rounds) {
                assert.ok(answer > 0 && answer <= RECTANGLES_MAX)
                assert.equal(ask, level < 2 ? 'rectangles' : 'divisors')
                assert.equal(answer, ask === 'rectangles' ? rectanglePairs(n).length : divisorsOf(n).length)
                if (level === 0) assert.ok(n <= 24 && answer >= 2)
                if (level === 1) assert.ok(n <= 60 && answer >= 3)
            }
            if (level === 2) assert.ok(rounds.some((round) => round.answer === 2) && rounds.some((round) => round.answer % 2 === 1))
        }
    }
})

test('1. DBH buses and ribbons: the answer is the LCM or the GCD and is among the options, both kinds in level 3', () => {
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 200; seed += 1) {
            const rounds = createMeetRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, MEET_ROUNDS)
            for (const { kind, a, b, answer, options } of rounds) {
                assert.ok(a < b)
                assert.equal(answer, kind === 'lcm' ? lcm(a, b) : gcd(a, b))
                assert.ok(options.includes(answer) && new Set(options).size === options.length && options.length >= 4)
                assert.deepEqual(options, [...options].sort((x, y) => x - y))
                if (kind === 'lcm') assert.ok(answer !== b && answer !== a * b && answer <= 60 && departures(a, answer).includes(answer))
                if (kind === 'gcd') assert.ok(answer > 1 && answer !== a && b % answer === 0)
                if (level === 0) assert.equal(kind, 'lcm')
                if (level === 1) assert.equal(kind, 'gcd')
            }
            if (level === 2) assert.ok(rounds.some((round) => round.kind === 'lcm') && rounds.some((round) => round.kind === 'gcd'))
        }
    }
})

test('1. DBH divisibility detective: the errors of each level, the fix and the last line on their values', () => {
    checkDetective(createDivisibilityDetectiveCases, divisibilityDetectiveLevels, divisibilityDetectiveNames, divisibilityDetectiveTips)
})

test('1. DBH share it out: the part (or the whole) is right, four different options, the levels as promised', () => {
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 200; seed += 1) {
            const rounds = createShareRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, SHARE_ROUNDS)
            for (const { a, d, total, part, inverse, answer, options } of rounds) {
                assert.ok(a < d && total % d === 0 && part === (total / d) * a && total <= 48)
                assert.equal(answer, inverse ? total : part)
                assert.equal(inverse, level === 2)
                if (level === 0) assert.equal(a, 1)
                assert.ok(options.length === 4 && new Set(options).size === 4 && options.includes(answer) && options.every((option) => option > 0))
            }
        }
    }
})

test('1. DBH fraction strips: one right option by value, the result fits one strip, the levels as promised', () => {
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 200; seed += 1) {
            const rounds = createStripsRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, STRIPS_ROUNDS)
            for (const { first, second, op, common, options, right } of rounds) {
                const exact = op === '+' ? valueOf(first) + valueOf(second) : valueOf(first) - valueOf(second)
                assert.ok(Math.abs(exact - right) < 1e-9 && right > 0 && right <= 1)
                assert.ok(common % first.d === 0 && common % second.d === 0 && common <= 24)
                assert.equal(options.filter((option) => Math.abs(valueOf(option) - right) < 1e-9).length, 1)
                assert.ok(options.length >= 3 && options.every((option) => option.n > 0 && option.d > 0))
                if (level === 0) assert.ok(first.d === second.d && op === '+')
                if (level === 1) assert.ok(first.d !== second.d && op === '+')
                if (level === 2) assert.ok(first.d !== second.d && op === '-')
                assert.deepEqual(reduce({ n: 6, d: 8 }), { n: 3, d: 4 })
            }
        }
    }
})

test('1. DBH fractions detective: the errors of each level, the fix and the last line on their values', () => {
    checkDetective(createFractionsDetectiveCases, fractionsDetectiveLevels, fractionsDetectiveNames, fractionsDetectiveTips)
})

test('1. DBH move the comma: the digits are placed as written, the answer is the operation, never the start', () => {
    assert.equal(placed('345', -2), '3,45')
    assert.equal(placed('6', -2), '0,06')
    assert.equal(placed('35', 1), '350')
    assert.deepEqual(columns('6', -2), [null, null, null, '0', '0', '6', null])
    assert.deepEqual(columns('35', 1), [null, '3', '5', '0', null, null, null])
    const value = (digits: string, exponent: number) => Number(placed(digits, exponent).replace(',', '.'))
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 200; seed += 1) {
            const rounds = createCommaRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, COMMA_ROUNDS)
            for (const round of rounds) {
                assert.ok(fits(round.digits, round.start) && fits(round.digits, round.answer) && round.start !== round.answer)
                assert.ok(!round.digits.startsWith('0') && !round.digits.endsWith('0'))
                renders(round.question)
                renders(placedLatex(round.digits, round.answer))
                const result = endValue(`${round.question}`.replace(/\\div /g, '/').replace(/\\cdot /g, '*').replace(/\{,\}/g, '.').replace(/^/, '0+'))
                assert.ok(Math.abs(result - value(round.digits, round.answer)) < 1e-9, `${round.question} ≠ ${placed(round.digits, round.answer)}`)
                assert.equal(round.kind, ['power', 'product', 'tenth'][level])
                if (level === 1) assert.ok(round.hint && round.start >= 0)
            }
        }
    }
})

test('1. DBH podium: different values, the trap bites in level 2, five numbers in level 3', () => {
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 200; seed += 1) {
            const rounds = createPodiumRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, PODIUM_ROUNDS)
            for (const { entries } of rounds) {
                assert.equal(entries.length, level === 2 ? 5 : 4)
                assert.equal(new Set(entries.map((item) => item.value)).size, entries.length)
                for (const item of entries) assert.equal(Number(item.text), item.value)
                if (level === 0) assert.ok(entries.every((item) => item.text.split('.')[1].length === 2))
                if (level === 1) assert.ok(wrongOrder(entries).some((item, index) => item !== rightOrder(entries)[index]))
            }
        }
    }
})

test('1. DBH decimals detective: the errors of each level, the fix and the last line on their values', () => {
    checkDetective(createDecimalsDetectiveCases, decimalsDetectiveLevels, decimalsDetectiveNames, decimalsDetectiveTips)
})

test('1. DBH recipe: the answer is proportional, four different options, the levels as promised', () => {
    for (let level = 0; level < 3; level += 1) {
        const places = new Set<number>()
        for (let seed = 1; seed <= 200; seed += 1) {
            const rounds = createRecipeRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, RECIPE_ROUNDS)
            for (const round of rounds) {
                const { people, target, given, answer, options } = round
                assert.ok(target !== people && target > 0)
                if (level === 0) assert.ok(target === 2 * people || target === people / 2)
                if (level < 2) assert.ok(given === null && answer === amountFor(round, target))
                else assert.ok(given === amountFor(round, target) && answer === target)
                assert.ok(options.length === 4 && new Set(options).size === 4 && options.includes(answer) && options.every((option) => option > 0))
                places.add(options.indexOf(answer))
            }
        }
        assert.ok(places.size >= 3, `level ${level}: the answer always in the same place`)
    }
})

test('1. DBH paint the percentage: a whole number of squares that fits the grid, rises and discounts in level 3', () => {
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 200; seed += 1) {
            const rounds = createGridRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, GRID_ROUNDS)
            for (const { total, percent, kind, answer, shown } of rounds) {
                const part = (total * percent) / 100
                assert.ok(Number.isInteger(part) && part > 0 && answer > 0 && answer <= shown && shown % GRID_COLUMNS === total % GRID_COLUMNS)
                assert.equal(answer, kind === 'part' ? part : kind === 'rise' ? total + part : total - part)
                assert.equal(kind === 'part', level < 2)
                assert.ok(answer !== 0)
            }
        }
    }
})

test('1. DBH proportionality detective: the errors of each level, the fix and the last line on their values', () => {
    checkDetective(createProportionDetectiveCases, proportionDetectiveLevels, proportionDetectiveNames, proportionDetectiveTips)
})
