import test from 'node:test'
import assert from 'node:assert/strict'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import { createNaturalsDetectiveCases, naturalsDetectiveLevels, naturalsDetectiveNames, naturalsDetectiveTips } from '../src/pages/dbh1-zenbaki-naturalak-v2/games/detective.ts'
import { createZeroRounds, effective, ROW_MAX, sumLatex, termsLatex, ZERO_LIMIT, ZERO_ROUNDS } from '../src/pages/dbh1-zenbaki-osoak-v2/games/zeroPairs.ts'
import { createIntegersDetectiveCases, integersDetectiveLevels, integersDetectiveNames, integersDetectiveTips } from '../src/pages/dbh1-zenbaki-osoak-v2/games/detective.ts'
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
