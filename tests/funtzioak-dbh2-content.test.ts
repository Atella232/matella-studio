import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { functionsChallenges, functionsDiagnostic, functionsExerciseBank, functionsPractice } from '../src/pages/dbh2-funtzioak-v2/content.ts'
import { checkAnswer, hasTerminatingDecimal, toExactDecimal, type FractionValue } from '../src/features/unit-v2/math/fraction.ts'
import { isUnitV2Path } from '../src/features/unit-v2/paths.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'

const stages = ['idea', 'representations', 'reading', 'proportional', 'lines']
const topics = ['coordinates', 'function', 'variables', 'tables', 'formula', 'plot', 'continuity', 'graph-reading', 'intercepts', 'variation', 'extremes', 'direct-proportion', 'slope', 'slope-sign', 'affine', 'constant', 'line-equation']

const typed = (value: FractionValue) => (hasTerminatingDecimal(value) ? toExactDecimal(value)! : `${value.numerator}/${value.denominator}`)
const written = (value: FractionValue) => (hasTerminatingDecimal(value) ? toExactDecimal(value)!.replace(',', '{,}') : `\\frac{${value.numerator}}{${value.denominator}}`)

/** Plain arithmetic in LaTeX (no letters): powers, fractions, products, divisions and decimal commas */
export function evaluate(latex: string): number | null {
    let js = latex
        .replace(/\\,/g, '')
        .replace(/(\d)\{,\}(\d)/g, '$1.$2')
        .replace(/\\cdot/g, '*')
        .replace(/\\mathbin\{:\}/g, '/')
        .replace(/\s+/g, '')
    for (let pass = 0; pass < 3; pass += 1) {
        js = js
            .replace(/\\frac\{([^{}]+)\}\{([^{}]+)\}/g, '(($1)/($2))')
            .replace(/(\([^()]+\)|\d+(?:\.\d+)?)\^\{(\d+)\}/g, 'Math.pow($1,$2)')
    }
    js = js.replace(/\)\(/g, ')*(').replace(/(\d)\(/g, '$1*(')
    if (!/^(?:[\d+\-*/().,]|Math\.pow)+$/.test(js) || !/\d/.test(js)) return null
    return Function(`return ${js}`)() as number
}

const allTexts = (): LocalizedText[] => [
    ...functionsDiagnostic.flatMap((item) => [item.prompt, item.explanation, ...item.options]),
    ...[...functionsPractice, ...functionsChallenges].flatMap((item) => [item.prompt, item.hint, item.explanation]),
    ...functionsExerciseBank.flatMap((section) => [section.title, ...section.items.flatMap((item) => [item.question, item.solution])])
]

test('funtzioak 2. DBH: the unit replaces the legacy pages', () => {
    assert.ok(isUnitV2Path('/matematika/dbh2/funciones'))
    assert.ok(isUnitV2Path('/matematika/dbh2/funciones/ejercicios'))
})

test('funtzioak 2. DBH: diagnostic, practice, challenges and bank are consistent', () => {
    assert.equal(functionsDiagnostic.length, 8)
    for (const question of functionsDiagnostic) {
        assert.ok(topics.includes(question.topic), `${question.id}`)
        assert.ok(question.correctIndex < question.options.length)
    }
    assert.equal(new Set(functionsDiagnostic.map((item) => item.id)).size, functionsDiagnostic.length)
    for (const stage of stages) {
        assert.equal(functionsPractice.filter((item) => item.stage === stage).length, 4, stage)
        assert.ok(functionsChallenges.some((item) => item.stage === stage), stage)
    }
    for (const item of [...functionsPractice, ...functionsChallenges]) {
        assert.ok(stages.includes(item.stage), `${item.id}`)
        assert.equal(checkAnswer(typed(item.expected), item.expected), 'correct', `${item.id}`)
        for (const language of ['eu', 'es', 'ar'] as const) assert.ok(item.explanation[language].length > 0 && item.prompt[language].length > 0 && item.hint[language].length > 0, `${item.id} ${language}`)
    }
    assert.deepEqual(functionsExerciseBank.map((section) => section.id), stages)
    const ids = functionsExerciseBank.flatMap((section) => section.items.map((item) => item.id))
    assert.equal(new Set(ids).size, ids.length)
    assert.deepEqual(ids, ids.map((_, index) => index + 1))
    for (const section of functionsExerciseBank) {
        assert.ok(section.items.some((item) => item.difficulty === 'easy') && section.items.some((item) => item.difficulty === 'hard'), section.id)
        for (const item of section.items) {
            for (const language of ['eu', 'es', 'ar'] as const) assert.ok(item.question[language].length > 0 && item.solution[language].length > 0, `${item.id} ${language}`)
            if (item.answer) assert.equal(checkAnswer(typed(item.answer.expected), item.answer.expected), 'correct', `${item.id}`)
        }
    }
    assert.ok(new Set(functionsChallenges.map((item) => item.id)).size === functionsChallenges.length)
    assert.deepEqual([...new Set(functionsChallenges.map((item) => item.points))].sort(), [10, 20, 30])
})

test('funtzioak 2. DBH: every formula renders in KaTeX', () => {
    let formulas = 0
    for (const text of allTexts()) {
        for (const language of ['eu', 'es', 'ar'] as const) {
            for (const [, formula] of text[language].matchAll(/\$([^$]+)\$/g)) {
                katex.renderToString(formula, { throwOnError: true, strict: 'error' })
                formulas += 1
            }
        }
    }
    assert.ok(formulas > 800, `only ${formulas}`)
})

test('funtzioak 2. DBH: Arabic never keeps the decimal comma', () => {
    for (const text of allTexts()) assert.ok(!text.ar.includes('{,}'), text.ar)
})

test('funtzioak 2. DBH: every worked equality with numbers is right', () => {
    const texts = [
        ...functionsPractice.flatMap((item) => [item.hint.es, item.explanation.es]),
        ...functionsChallenges.flatMap((item) => [item.hint.es, item.explanation.es]),
        ...functionsExerciseBank.flatMap((section) => section.items.map((item) => item.solution.es)),
        ...functionsDiagnostic.flatMap((item) => [item.explanation.es, ...item.options.map((option) => option.es)])
    ]
    let checked = 0
    for (const text of texts) {
        for (const [, formula] of text.matchAll(/\$([^$]+)\$/g)) {
            for (const part of formula.split(/\\qquad|\\quad|\\ \\to\\ /)) {
                // Only the sides without letters are compared: 3\cdot 4-2=12-2=10 checks every step
                const values = part.replace(/^[a-z]\)\s*/, '').split('=').map(evaluate).filter((value): value is number => value !== null)
                if (values.length < 2) continue
                assert.ok(values.every((value) => Math.abs(value - values[0]) < 1e-9), `${part} → ${values.join(' / ')}`)
                checked += 1
            }
        }
    }
    assert.ok(checked >= 40, `only ${checked} checked`)
})

test('funtzioak 2. DBH: every answer appears in its worked explanation or solution', () => {
    const shows = (text: string, value: FractionValue) => {
        const plain = written(value)
        const spaced = plain.replace(/^(-?)(\d+)(\d{3})$/, '$1$2\\,$3')
        const minus = value.numerator < 0 ? [`-${written({ numerator: -value.numerator, denominator: value.denominator })}`] : []
        return [plain, spaced, ...minus].some((candidate) => text.includes(candidate))
    }
    for (const item of [...functionsPractice, ...functionsChallenges]) assert.ok(shows(item.explanation.es, item.expected), `${item.id}: ${written(item.expected)}`)
    for (const section of functionsExerciseBank) for (const item of section.items) if (item.answer) assert.ok(shows(item.solution.es, item.answer.expected), `bank ${item.id}`)
})
