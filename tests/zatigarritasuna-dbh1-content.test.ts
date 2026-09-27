import test from 'node:test'
import assert from 'node:assert/strict'
import { divisibilityIntroChallenges, divisibilityIntroDiagnostic, divisibilityIntroExerciseBank, divisibilityIntroPractice } from '../src/pages/dbh1-zatigarritasuna-v2/content.ts'
import { divisors, gcdOf, lcmOf } from '../src/pages/dbh2-zatigarritasuna/math.ts'
import { checkAnswer, toNumber } from '../src/features/unit-v2/math/fraction.ts'
import { readNaturalAnswer } from '../src/pages/dbh1-zenbaki-naturalak-v2/numbers.ts'
import { isUnitV2Path } from '../src/features/unit-v2/paths.ts'

const stages = ['multiples', 'criteria', 'primes', 'gcd-lcm', 'problems']
const topics = ['relation', 'multiples', 'divisors', 'criteria-digit', 'criteria-sum', 'primes', 'factorization', 'divisor-table', 'gcd', 'lcm', 'which', 'method']

/** Evaluates plain arithmetic written in LaTeX (·, :, powers), or null if it is not plain arithmetic */
function evaluate(latex: string): number | null {
    const js = latex
        .replace(/\\cdot/g, '*')
        .replace(/\\mathbin\{:\}/g, '/')
        .replace(/\^\{(\d+)\}/g, '**$1')
        .replace(/\s+|\\,/g, '')
    if (!/^[\d+\-*/()]+$/.test(js) || !/\d/.test(js)) return null
    return Function(`return ${js}`)() as number
}

/** Every Basque/Arabic text of the unit's exercises (the notation is Zat / ZKH / MKT there) */
const basqueTexts = () => [
    ...divisibilityIntroPractice.flatMap((item) => [item.prompt.eu, item.hint.eu, item.explanation.eu]),
    ...divisibilityIntroChallenges.flatMap((item) => [item.prompt.eu, item.hint.eu, item.explanation.eu]),
    ...divisibilityIntroExerciseBank.flatMap((section) => section.items.flatMap((item) => [item.question.eu, item.solution.eu])),
    ...divisibilityIntroDiagnostic.flatMap((item) => [item.explanation.eu, ...item.options.map((option) => option.eu)])
]

test('zatigarritasuna 1. DBH: the unit replaces the legacy pages', () => {
    assert.ok(isUnitV2Path('/matematika/dbh1/divisibilidad'))
    assert.ok(isUnitV2Path('/matematika/dbh1/divisibilidad/laboratorio'))
})

test('zatigarritasuna 1. DBH: diagnostic, practice, challenges and bank are consistent', () => {
    for (const question of divisibilityIntroDiagnostic) {
        assert.ok(topics.includes(question.topic), `${question.id}`)
        assert.ok(question.correctIndex < question.options.length)
    }
    for (const stage of stages) assert.ok(divisibilityIntroPractice.some((item) => item.stage === stage), stage)
    for (const item of [...divisibilityIntroPractice, ...divisibilityIntroChallenges]) {
        assert.ok(stages.includes(item.stage), `${item.id}`)
        const value = toNumber(item.expected)
        assert.ok(Number.isInteger(value) && value >= 0)
        assert.equal(checkAnswer(String(value), item.expected, 'simplified'), 'correct')
    }
    for (const section of divisibilityIntroExerciseBank) {
        for (const item of section.items) {
            if (item.answer) assert.equal(checkAnswer(String(toNumber(item.answer.expected)), item.answer.expected, 'simplified'), 'correct')
        }
    }
    assert.deepEqual(divisibilityIntroExerciseBank.map((section) => section.id), stages)
    const bankIds = divisibilityIntroExerciseBank.flatMap((section) => section.items.map((item) => item.id))
    assert.equal(new Set(bankIds).size, bankIds.length)
    assert.equal(new Set(divisibilityIntroPractice.map((item) => item.id)).size, divisibilityIntroPractice.length)
    assert.equal(new Set(divisibilityIntroChallenges.map((item) => item.id)).size, divisibilityIntroChallenges.length)
})

test('zatigarritasuna 1. DBH: every ZKH, MKT and list of divisors written is right', () => {
    let checked = 0
    for (const text of basqueTexts()) {
        for (const match of text.matchAll(/\\mathrm\{(ZKH|MKT)\}\(([\d,]+)\)\s*=\s*(?:[^=$]*=)?\s*(\d+)(?![\d^])/g)) {
            const numbers = match[2].split(',').map(Number)
            assert.equal(Number(match[3]), match[1] === 'ZKH' ? gcdOf(numbers) : lcmOf(numbers), match[0])
            checked += 1
        }
        for (const match of text.matchAll(/\\mathrm\{Zat\}\((\d+)\)=\\\{([\d,]+)\\\}/g)) {
            assert.deepEqual(match[2].split(',').map(Number), divisors(Number(match[1])), match[0])
            checked += 1
        }
    }
    assert.ok(checked >= 30, `only ${checked} checked`)
    for (const item of divisibilityIntroPractice) {
        const asked = item.prompt.eu.match(/^Kalkulatu: \$\\mathrm\{(ZKH|MKT)\}\(([\d,]+)\)\$$/)
        if (!asked) continue
        const numbers = asked[2].split(',').map(Number)
        assert.equal(toNumber(item.expected), asked[1] === 'ZKH' ? gcdOf(numbers) : lcmOf(numbers))
    }
})

test('zatigarritasuna 1. DBH: every worked equality and factorization is right', () => {
    let checked = 0
    for (const text of basqueTexts()) {
        for (const [, formula] of text.matchAll(/\$([^$]+)\$/g)) {
            for (const part of formula.split(/\\qquad|\\quad|\\Rightarrow|,\\ /)) {
                const sides = part.replace(/\\mathrm\{(ZKH|MKT)\}\([\d,]+\)/g, '').split('=').filter((side) => side.trim() !== '')
                if (sides.length < 2) continue
                const values = sides.map(evaluate)
                if (values.some((value) => value === null)) continue
                assert.ok(values.every((value) => value === values[0]), `${part} → ${values.join(' / ')}`)
                checked += 1
            }
        }
    }
    assert.ok(checked >= 40, `only ${checked} checked`)
})

test('zatigarritasuna 1. DBH: no notation placeholder is left and Spanish uses m.c.d. / m.c.m.', () => {
    const all = JSON.stringify([divisibilityIntroDiagnostic, divisibilityIntroPractice, divisibilityIntroChallenges, divisibilityIntroExerciseBank])
    assert.ok(!all.includes('@GCD') && !all.includes('@LCM') && !all.includes('@DIV'))
    const spanish = JSON.stringify([divisibilityIntroPractice, divisibilityIntroChallenges].flat().map((item) => [item.prompt.es, item.explanation.es]))
    assert.ok(!spanish.includes('ZKH') && !spanish.includes('MKT'))
})

test('zatigarritasuna 1. DBH: answers written with a thousands point are read as whole numbers', () => {
    assert.equal(readNaturalAnswer('1.000'), '1000')
    assert.equal(readNaturalAnswer('992'), '992')
})
