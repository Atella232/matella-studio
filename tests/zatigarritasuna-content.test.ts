import test from 'node:test'
import assert from 'node:assert/strict'
import { notation } from '../src/pages/dbh2-zatigarritasuna/notation.ts'
import { isUnitV2Path } from '../src/features/unit-v2/paths.ts'
import { pickMaybeText } from '../src/features/unit-v2/types.ts'

test('zatigarritasuna: notation follows each textbook', () => {
    const formula = notation('$@GCD(12,18)=6\\quad @LCM(4,6)=12\\quad @DIV(8)$')
    assert.equal(formula.eu, '$\\mathrm{ZKH}(12,18)=6\\quad \\mathrm{MKT}(4,6)=12\\quad \\mathrm{Zat}(8)$')
    assert.equal(formula.es, '$\\text{m.c.d.}(12,18)=6\\quad \\text{m.c.m.}(4,6)=12\\quad \\mathrm{Div}(8)$')
    assert.equal(formula.ar, formula.eu)
    assert.equal(pickMaybeText('es', formula), formula.es)
    assert.equal(pickMaybeText('eu', '$1$'), '$1$')
})

test('zatigarritasuna: the unit is rendered by the V2 engine', () => {
    assert.ok(isUnitV2Path('/matematika/dbh2/divisibilidad'))
    assert.ok(isUnitV2Path('/matematika/dbh2/divisibilidad/teoria'))
    assert.ok(!isUnitV2Path('/matematika/dbh1/divisibilidad'))
})

import { divisibilityChallenges, divisibilityDiagnostic, divisibilityExerciseBank, divisibilityPractice } from '../src/pages/dbh2-zatigarritasuna/content.ts'
import { checkAnswer, toNumber } from '../src/features/unit-v2/math/fraction.ts'

const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b))
const lcm = (a: number, b: number) => (a / gcd(a, b)) * b

const stages = ['multiples', 'criteria', 'primes', 'gcd-lcm', 'problems']
const topics = ['relation', 'multiples', 'divisors', 'criteria-digit', 'criteria-sum', 'criteria-11-7', 'primes', 'factorization', 'gcd', 'lcm', 'which', 'method']

test('zatigarritasuna: diagnostic, practice and challenges are consistent', () => {
    for (const question of divisibilityDiagnostic) {
        assert.ok(topics.includes(question.topic), `${question.id}`)
        assert.ok(question.correctIndex < question.options.length)
    }
    for (const item of [...divisibilityPractice, ...divisibilityChallenges]) {
        assert.ok(stages.includes(item.stage), `${item.id}`)
        const value = toNumber(item.expected)
        assert.ok(Number.isInteger(value) && value >= 0)
        assert.equal(checkAnswer(String(value), item.expected, 'simplified'), 'correct')
    }
    assert.equal(new Set(divisibilityPractice.map((item) => item.id)).size, divisibilityPractice.length)
    assert.equal(new Set(divisibilityChallenges.map((item) => item.id)).size, divisibilityChallenges.length)
    const bankIds = divisibilityExerciseBank.flatMap((section) => section.items.map((item) => item.id))
    assert.equal(new Set(bankIds).size, bankIds.length)
    assert.deepEqual(divisibilityExerciseBank.map((section) => section.id), stages)
})

test('zatigarritasuna: every ZKH and MKT written in the exercises is right', () => {
    const texts = [
        ...divisibilityPractice.flatMap((item) => [item.prompt.eu, item.explanation.eu]),
        ...divisibilityChallenges.map((item) => item.explanation.eu),
        ...divisibilityExerciseBank.flatMap((section) => section.items.map((item) => item.solution.eu)),
        ...divisibilityDiagnostic.map((item) => item.explanation.eu)
    ]
    let checked = 0
    for (const text of texts) {
        for (const match of text.matchAll(/\\mathrm\{(ZKH|MKT)\}\(([\d,]+)\)\s*=\s*(?:[^=$]*=)?\s*(\d+)(?![\d^])/g)) {
            // "ZKH · MKT = 6 · 36 = 216" is a product, not the value of the MKT
            if (text.slice(Math.max(0, (match.index ?? 0) - 6), match.index).includes('cdot')) continue
            const numbers = match[2].split(',').map(Number)
            const expected = match[1] === 'ZKH' ? numbers.reduce(gcd) : numbers.reduce(lcm)
            assert.equal(Number(match[3]), expected, match[0])
            checked += 1
        }
    }
    assert.ok(checked >= 20, `only ${checked} checked`)
    // Practice answers asked as a plain ZKH/MKT
    for (const item of divisibilityPractice) {
        const asked = item.prompt.eu.match(/^Kalkulatu: \$\\mathrm\{(ZKH|MKT)\}\(([\d,]+)\)\$$/)
        if (!asked) continue
        const numbers = asked[2].split(',').map(Number)
        assert.equal(toNumber(item.expected), asked[1] === 'ZKH' ? numbers.reduce(gcd) : numbers.reduce(lcm))
    }
})

test('zatigarritasuna: no notation placeholder is left in any language', () => {
    const all = JSON.stringify([divisibilityDiagnostic, divisibilityPractice, divisibilityChallenges, divisibilityExerciseBank])
    assert.ok(!all.includes('@GCD') && !all.includes('@LCM') && !all.includes('@DIV'))
    assert.ok(!divisibilityPractice.some((item) => item.prompt.es.includes('ZKH') || item.explanation.es.includes('MKT}')), 'Spanish uses m.c.d. / m.c.m.')
})
