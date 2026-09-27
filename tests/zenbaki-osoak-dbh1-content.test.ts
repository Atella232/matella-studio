import test from 'node:test'
import assert from 'node:assert/strict'
import { integerIntroChallenges, integerIntroDiagnostic, integerIntroExerciseBank, integerIntroPractice } from '../src/pages/dbh1-zenbaki-osoak-v2/content.ts'
import { checkAnswer, toNumber } from '../src/features/unit-v2/math/fraction.ts'
import { isUnitV2Path } from '../src/features/unit-v2/paths.ts'

const stages = ['meaning', 'line', 'absolute', 'addsub', 'muldiv']
const topics = ['negatives', 'integer-set', 'number-line', 'compare', 'order', 'absolute', 'opposite', 'compare-absolute', 'add-same', 'add-different', 'subtract', 'brackets', 'multiply', 'divide']

/** Evaluates an integer expression written in LaTeX (·, :, brackets), or null if it is not plain arithmetic */
function evaluate(latex: string): number | null {
    const js = latex
        .replace(/\\cdot/g, '*')
        .replace(/\\mathbin\{:\}/g, '/')
        .replace(/[[\]]/g, (bracket) => (bracket === '[' ? '(' : ')'))
        .replace(/\s+/g, '')
    if (!/^[\d+\-*/()]+$/.test(js) || !/\d/.test(js)) return null
    return Function(`return ${js}`)() as number
}

const typed = (value: number) => (value < 0 ? `−${Math.abs(value)}` : String(value))

test('zenbaki osoak 1. DBH: the unit replaces the legacy pages', () => {
    assert.ok(isUnitV2Path('/matematika/dbh1/numeros-enteros'))
    assert.ok(isUnitV2Path('/matematika/dbh1/numeros-enteros/teoria'))
})

test('zenbaki osoak 1. DBH: diagnostic, practice, challenges and bank are consistent', () => {
    for (const question of integerIntroDiagnostic) {
        assert.ok(topics.includes(question.topic), `${question.id}`)
        assert.ok(question.correctIndex < question.options.length)
    }
    for (const stage of stages) assert.ok(integerIntroPractice.some((item) => item.stage === stage), stage)
    for (const item of [...integerIntroPractice, ...integerIntroChallenges]) {
        assert.ok(stages.includes(item.stage), `${item.id}`)
        assert.equal(item.expected.denominator, 1)
        const value = toNumber(item.expected)
        assert.equal(checkAnswer(typed(value), item.expected, 'simplified'), 'correct', `${item.id}`)
        if (value > 0) assert.equal(checkAnswer(`+${value}`, item.expected, 'simplified'), 'correct')
        if (item.expression) assert.equal(evaluate(item.expression.replace(/\$/g, '')), value, `${item.id} expression`)
    }
    for (const section of integerIntroExerciseBank) {
        for (const item of section.items) {
            if (item.answer) assert.equal(checkAnswer(typed(toNumber(item.answer.expected)), item.answer.expected, 'simplified'), 'correct')
        }
    }
    assert.deepEqual(integerIntroExerciseBank.map((section) => section.id), stages)
    const ids = integerIntroExerciseBank.flatMap((section) => section.items.map((item) => item.id))
    assert.equal(new Set(ids).size, ids.length)
    assert.equal(new Set(integerIntroPractice.map((item) => item.id)).size, integerIntroPractice.length)
    assert.equal(new Set(integerIntroChallenges.map((item) => item.id)).size, integerIntroChallenges.length)
})

test('zenbaki osoak 1. DBH: every worked equality is right', () => {
    const texts = [
        ...integerIntroPractice.flatMap((item) => [item.hint.es, item.explanation.es]),
        ...integerIntroChallenges.flatMap((item) => [item.hint.es, item.explanation.es]),
        ...integerIntroExerciseBank.flatMap((section) => section.items.map((item) => item.solution.es)),
        ...integerIntroDiagnostic.map((item) => item.explanation.es)
    ]
    let checked = 0
    for (const text of texts) {
        for (const [, formula] of text.matchAll(/\$([^$]+)\$/g)) {
            for (const part of formula.replace(/\\;/g, ' ').split(/\\qquad|\\quad|\\Rightarrow/)) {
                const sides = part.split('=')
                if (sides.length < 2) continue
                const values = sides.map(evaluate)
                if (values.some((value) => value === null)) continue
                assert.ok(values.every((value) => value === values[0]), `${part} → ${values.join(' / ')}`)
                checked += 1
            }
        }
    }
    assert.ok(checked >= 30, `only ${checked} checked`)
})

test('zenbaki osoak 1. DBH: every challenge answer appears in its explanation', () => {
    for (const item of integerIntroChallenges) {
        const value = toNumber(item.expected)
        const written = value < 0 ? `-${Math.abs(value)}` : String(value)
        assert.ok(item.explanation.es.includes(written), `${item.id}: ${written}`)
    }
})
