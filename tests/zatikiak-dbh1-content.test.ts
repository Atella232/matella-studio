import test from 'node:test'
import assert from 'node:assert/strict'
import { fractionsIntroChallenges, fractionsIntroDiagnostic, fractionsIntroExerciseBank, fractionsIntroPractice } from '../src/pages/dbh1-zatikiak-v2/content.ts'
import { checkAnswer, toNumber } from '../src/features/unit-v2/math/fraction.ts'
import { isUnitV2Path } from '../src/features/unit-v2/paths.ts'

const stages = ['meaning', 'types', 'equivalence', 'operations', 'problems']
const topics = ['what', 'represent', 'division', 'types', 'mixed', 'line', 'equivalent', 'amplify-simplify', 'compare', 'add-same', 'add-different', 'multiply', 'divide', 'fraction-of', 'problems']

/**
 * Evaluates plain arithmetic with fractions written in LaTeX: \frac, mixed
 * numbers (3\frac{2}{5}), ·, :, brackets and decimal commas. Null when the
 * text is not plain arithmetic (a \square, words…).
 */
function evaluate(latex: string): number | null {
    let js = latex
        .replace(/\\left|\\right/g, '')
        .replace(/(\d)\\frac\{(\d+)\}\{(\d+)\}/g, '($1+$2/$3)')
        .replace(/\\frac\{([^{}]+)\}\{([^{}]+)\}/g, '(($1)/($2))')
        .replace(/\\cdot/g, '*')
        .replace(/\\mathbin\{:\}/g, '/')
        .replace(/(\d)\{,\}(\d)/g, '$1.$2')
        .replace(/\s+/g, '')
    // a second pass for fractions whose terms were products (\frac{3\cdot 4}{5\cdot 4})
    js = js.replace(/\\frac\{([^{}]+)\}\{([^{}]+)\}/g, '(($1)/($2))')
    if (!/^[\d+\-*/().]+$/.test(js) || !/\d/.test(js)) return null
    return Function(`return ${js}`)() as number
}

test('zatikiak 1. DBH: the unit replaces the legacy pages', () => {
    assert.ok(isUnitV2Path('/matematika/dbh1/zatikiak'))
    assert.ok(isUnitV2Path('/matematika/dbh1/zatikiak/jokuak/pizza'))
})

test('zatikiak 1. DBH: diagnostic, practice, challenges and bank are consistent', () => {
    for (const question of fractionsIntroDiagnostic) {
        assert.ok(topics.includes(question.topic), `${question.id}`)
        assert.ok(question.correctIndex < question.options.length)
    }
    for (const stage of stages) assert.ok(fractionsIntroPractice.some((item) => item.stage === stage), stage)
    for (const item of [...fractionsIntroPractice, ...fractionsIntroChallenges]) {
        assert.ok(stages.includes(item.stage), `${item.id}`)
        const { numerator, denominator } = item.expected
        const typed = denominator === 1 ? String(numerator) : `${numerator}/${denominator}`
        if (item.answerForm !== 'mixed') assert.equal(checkAnswer(typed, item.expected, item.answerForm ?? 'any'), 'correct', `${item.id}`)
    }
    for (const section of fractionsIntroExerciseBank) {
        for (const item of section.items) {
            if (!item.answer) continue
            const { numerator, denominator } = item.answer.expected
            assert.equal(checkAnswer(denominator === 1 ? String(numerator) : `${numerator}/${denominator}`, item.answer.expected, item.answer.form ?? 'any'), 'correct', `bank ${item.id}`)
        }
    }
    assert.deepEqual(fractionsIntroExerciseBank.map((section) => section.id), stages)
    const ids = fractionsIntroExerciseBank.flatMap((section) => section.items.map((item) => item.id))
    assert.equal(new Set(ids).size, ids.length)
    assert.equal(new Set(fractionsIntroPractice.map((item) => item.id)).size, fractionsIntroPractice.length)
    assert.equal(new Set(fractionsIntroChallenges.map((item) => item.id)).size, fractionsIntroChallenges.length)
    // Mixed-number answers: 17/5 typed as 3 2/5
    assert.equal(checkAnswer('3 2/5', fractionsIntroPractice.find((item) => item.id === 5)!.expected, 'mixed'), 'correct')
})

test('zatikiak 1. DBH: every worked equality is right', () => {
    const texts = [
        ...fractionsIntroPractice.flatMap((item) => [item.prompt.es, item.hint.es, item.explanation.es]),
        ...fractionsIntroChallenges.flatMap((item) => [item.hint.es, item.explanation.es]),
        ...fractionsIntroExerciseBank.flatMap((section) => section.items.flatMap((item) => [item.question.es, item.solution.es])),
        ...fractionsIntroDiagnostic.flatMap((item) => [item.explanation.es, ...item.options.map((option) => option.es)])
    ]
    let checked = 0
    for (const text of texts) {
        for (const [, formula] of text.matchAll(/\$([^$]+)\$/g)) {
            for (const part of formula.split(/\\qquad|\\quad|\\Rightarrow|,\\ /)) {
                const sides = part.split('=')
                if (sides.length < 2) continue
                const values = sides.map(evaluate)
                if (values.some((value) => value === null)) continue
                assert.ok(values.every((value) => Math.abs(value! - values[0]!) < 1e-9), `${part} → ${values.join(' / ')}`)
                checked += 1
            }
        }
    }
    assert.ok(checked >= 50, `only ${checked} checked`)
})

test('zatikiak 1. DBH: every challenge answer appears in its explanation', () => {
    for (const item of fractionsIntroChallenges) {
        const value = toNumber(item.expected)
        const { numerator, denominator } = item.expected
        const shown = denominator === 1 ? String(numerator) : `\\frac{${numerator}}{${denominator}}`
        assert.ok(item.explanation.es.includes(shown) || item.explanation.es.includes(String(value)), `${item.id}`)
    }
})
