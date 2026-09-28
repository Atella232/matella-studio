import test from 'node:test'
import assert from 'node:assert/strict'
import { statisticsIntroChallenges, statisticsIntroDiagnostic, statisticsIntroExerciseBank, statisticsIntroPractice } from '../src/pages/dbh1-estatistika-v2/content.ts'
import { checkAnswer, hasTerminatingDecimal, toExactDecimal, type FractionValue } from '../src/features/unit-v2/math/fraction.ts'
import { isUnitV2Path } from '../src/features/unit-v2/paths.ts'

const stages = ['data', 'tables', 'graphs', 'parameters', 'probability']
const topics = ['study', 'variables', 'frequencies', 'table', 'bar-chart', 'pie-chart', 'line-chart', 'mean', 'median-mode', 'range', 'random', 'laplace', 'frequency-probability']

/** How a student would type the answer: a decimal when it ends, otherwise a fraction */
const typed = (value: FractionValue) => hasTerminatingDecimal(value) ? toExactDecimal(value)! : `${value.numerator}/${value.denominator}`
/** How the answer is written in a worked explanation */
const written = (value: FractionValue) => hasTerminatingDecimal(value) ? toExactDecimal(value)!.replace(',', '{,}') : `\\frac{${value.numerator}}{${value.denominator}}`

/** Plain arithmetic in LaTeX: fractions, products, divisions, decimal commas, thin-space thousands */
function evaluate(latex: string): number | null {
    let js = latex
        .replace(/\^\{\\circ\}/g, '')
        .replace(/\\,/g, '')
        .replace(/(\d)\{,\}(\d)/g, '$1.$2')
    for (let pass = 0; pass < 3; pass += 1) js = js.replace(/\\frac\{([^{}]+)\}\{([^{}]+)\}/g, '(($1)/($2))')
    js = js
        .replace(/\\cdot/g, '*')
        .replace(/\\mathbin\{:\}/g, '/')
        .replace(/\s+/g, '')
    if (!/^[\d+\-*/().]+$/.test(js) || !/\d/.test(js)) return null
    return Function(`return ${js}`)() as number
}

test('estatistika 1. DBH: the unit replaces the legacy pages', () => {
    assert.ok(isUnitV2Path('/matematika/dbh1/estadistica'))
    assert.ok(isUnitV2Path('/matematika/dbh1/estadistica/teoria'))
})

test('estatistika 1. DBH: diagnostic, practice, challenges and bank are consistent', () => {
    for (const question of statisticsIntroDiagnostic) {
        assert.ok(topics.includes(question.topic), `${question.id}`)
        assert.ok(question.correctIndex < question.options.length)
    }
    for (const stage of stages) {
        assert.ok(statisticsIntroPractice.some((item) => item.stage === stage), stage)
        assert.ok(statisticsIntroChallenges.some((item) => item.stage === stage), stage)
    }
    for (const item of [...statisticsIntroPractice, ...statisticsIntroChallenges]) {
        assert.ok(stages.includes(item.stage), `${item.id}`)
        assert.equal(checkAnswer(typed(item.expected), item.expected), 'correct', `${item.id} ${typed(item.expected)}`)
    }
    for (const section of statisticsIntroExerciseBank) for (const item of section.items) if (item.answer) assert.equal(checkAnswer(typed(item.answer.expected), item.answer.expected), 'correct', `${item.id}`)
    assert.deepEqual(statisticsIntroExerciseBank.map((section) => section.id), stages)
    const ids = statisticsIntroExerciseBank.flatMap((section) => section.items.map((item) => item.id))
    assert.equal(new Set(ids).size, ids.length)
})

test('estatistika 1. DBH: every worked equality is right', () => {
    const texts = [
        ...statisticsIntroPractice.flatMap((item) => [item.hint.es, item.explanation.es]),
        ...statisticsIntroChallenges.flatMap((item) => [item.hint.es, item.explanation.es]),
        ...statisticsIntroExerciseBank.flatMap((section) => section.items.map((item) => item.solution.es)),
        ...statisticsIntroDiagnostic.flatMap((item) => [item.explanation.es, ...item.options.map((option) => option.es)])
    ]
    let checked = 0
    for (const text of texts) {
        for (const [, formula] of text.matchAll(/\$([^$]+)\$/g)) {
            for (const part of formula.split(/\\qquad|\\quad|\\ \\to\\ /)) {
                const approximate = part.includes('\\approx')
                const sides = part.split(/=|\\approx/)
                if (sides.length < 2) continue
                const values = sides.map(evaluate)
                if (values.some((value) => value === null)) continue
                assert.ok(values.every((value) => Math.abs(value! - values[0]!) < (approximate ? 0.01 : 1e-9)), `${part} → ${values.join(' / ')}`)
                checked += 1
            }
        }
    }
    assert.ok(checked >= 50, `only ${checked} checked`)
})

test('estatistika 1. DBH: every answer appears in its worked explanation', () => {
    for (const item of [...statisticsIntroPractice, ...statisticsIntroChallenges]) {
        const value = written(item.expected)
        assert.ok(item.explanation.es.includes(value), `${item.id}: ${value}`)
    }
})
