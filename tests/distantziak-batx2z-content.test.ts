import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { courses } from '../src/data/courses.ts'
import { checkAnswer, hasTerminatingDecimal, toExactDecimal, type FractionValue } from '../src/features/unit-v2/math/fraction.ts'
import { isUnitV2Path } from '../src/features/unit-v2/paths.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { anglesDistancesChallenges, anglesDistancesDiagnostic, anglesDistancesExerciseBank, anglesDistancesPractice } from '../src/pages/batx2-zientziak-distantziak/content.ts'

const stages = ['angles', 'projections', 'symmetric', 'point-distances', 'line-distances']
const topics = ['angle-lines', 'angle-line-plane', 'angle-planes', 'project-point-plane', 'project-point-line', 'project-line-plane', 'symmetric-plane', 'symmetric-line', 'mediator-plane', 'point-plane', 'parallel-planes', 'point-line', 'parallel-lines', 'skew-distance', 'common-perpendicular']

const typed = (value: FractionValue, form?: string) => (hasTerminatingDecimal(value) && (form !== 'simplified' || value.denominator === 1) ? toExactDecimal(value)! : `${value.numerator}/${value.denominator}`)
const written = (value: FractionValue) => (hasTerminatingDecimal(value) ? toExactDecimal(value)!.replace(',', '{,}') : `\\frac{${Math.abs(value.numerator)}}{${value.denominator}}`)

/** Plain arithmetic in LaTeX (no letters, no coordinate pairs: a comma is never an operator): powers, fractions, roots, products, divisions and decimal commas */
function evaluate(latex: string): number | null {
    let js = latex
        .replace(/\\,/g, '')
        .replace(/\\left|\\right/g, '')
        .replace(/(\d)\{,\}(\d)/g, '$1.$2')
        .replace(/\\cdot/g, '*')
        .replace(/\\div/g, '/')
        .replace(/\s+/g, '')
    for (let pass = 0; pass < 4; pass += 1) {
        js = js
            .replace(/\\frac\{([^{}]+)\}\{([^{}]+)\}/g, '(($1)/($2))')
            .replace(/\\sqrt\[(\d+)\]\{([^{}]+)\}/g, 'Math.cbrtn($2,$1)')
            .replace(/\\sqrt\{([^{}]+)\}/g, 'Math.sqrt($1)')
            .replace(/(\([^()]+\)|\d+(?:\.\d+)?)\^\{([^{}]+)\}/g, 'Math.pow($1,($2))')
    }
    js = js.replace(/\)\(/g, ')*(').replace(/(\d)\(/g, '$1*(').replace(/(\d)Math/g, '$1*Math').replace(/\)Math/g, ')*Math')
    if (!/^(?:[\d+\-*/().]|Math\.(?:pow|sqrt|cbrtn))+$/.test(js) || !/\d/.test(js)) return null
    const cbrtn = (value: number, index: number) => (value < 0 ? -((-value) ** (1 / index)) : value ** (1 / index))
    try {
        return Function('Math', `return ${js}`)({ ...Math, pow: Math.pow, sqrt: Math.sqrt, cbrtn }) as number
    } catch {
        return null
    }
}

const allTexts = (): LocalizedText[] => [
    ...anglesDistancesDiagnostic.flatMap((item) => [item.prompt, item.explanation, ...item.options]),
    ...[...anglesDistancesPractice, ...anglesDistancesChallenges].flatMap((item) => [item.prompt, item.hint, item.explanation]),
    ...anglesDistancesExerciseBank.flatMap((section) => [section.title, ...section.items.flatMap((item) => [item.question, item.solution])])
]

test('distantziak batx2 z: the unit is active and routed', () => {
    const course = courses.find((item) => item.id === 'batx2-zientziak')!
    assert.ok(course.topics.find((topic) => topic.id === 'angulos-distancias')!.active)
    assert.ok(isUnitV2Path('/matematika/batx2-zientziak/angulos-distancias'))
    assert.ok(isUnitV2Path('/matematika/batx2-zientziak/angulos-distancias/ariketak'))
})

test('distantziak batx2 z: diagnostic, practice, challenges and bank are consistent', () => {
    assert.equal(anglesDistancesDiagnostic.length, 8)
    assert.deepEqual(anglesDistancesDiagnostic.map((question) => question.id), [121001, 121002, 121003, 121004, 121005, 121006, 121007, 121008])
    for (const question of anglesDistancesDiagnostic) {
        assert.ok(topics.includes(question.topic), `${question.id}`)
        assert.ok(question.correctIndex < question.options.length)
        assert.equal(new Set(question.options.map((option) => option.es)).size, question.options.length)
    }
    // The right option is not always in the same place
    assert.ok(new Set(anglesDistancesDiagnostic.map((question) => question.correctIndex)).size === 3)
    for (const stage of stages) {
        assert.equal(anglesDistancesPractice.filter((item) => item.stage === stage).length, 4, stage)
        assert.equal(anglesDistancesChallenges.filter((item) => item.stage === stage).length, 3, stage)
    }
    for (const item of [...anglesDistancesPractice, ...anglesDistancesChallenges]) {
        assert.ok(stages.includes(item.stage), `${item.id}`)
        assert.equal(checkAnswer(typed(item.expected, item.answerForm), item.expected, item.answerForm), 'correct', `${item.id}`)
        for (const language of ['eu', 'es', 'en', 'ar'] as const) assert.ok(item.explanation[language].length > 0 && item.prompt[language].length > 0 && item.hint[language].length > 0, `${item.id} ${language}`)
    }
    assert.deepEqual(anglesDistancesExerciseBank.map((section) => section.id), stages)
    const ids = anglesDistancesExerciseBank.flatMap((section) => section.items.map((item) => item.id))
    assert.deepEqual(ids, ids.map((_, index) => index + 1))
    assert.equal(ids.length, 50)
    for (const section of anglesDistancesExerciseBank) {
        assert.ok(section.items.some((item) => item.difficulty === 'easy') && section.items.some((item) => item.difficulty === 'hard'), section.id)
        for (const item of section.items) {
            for (const language of ['eu', 'es', 'en', 'ar'] as const) assert.ok(item.question[language].length > 0 && item.solution[language].length > 0, `${item.id} ${language}`)
            if (item.answer) assert.equal(checkAnswer(typed(item.answer.expected, item.answer.form), item.answer.expected, item.answer.form), 'correct', `${item.id}`)
        }
    }
    assert.equal(new Set(anglesDistancesChallenges.map((item) => item.id)).size, anglesDistancesChallenges.length)
    assert.deepEqual([...new Set(anglesDistancesChallenges.map((item) => item.points))].sort(), [10, 20, 30])
})

test('distantziak batx2 z: every formula renders in KaTeX', () => {
    let formulas = 0
    for (const text of allTexts()) {
        for (const language of ['eu', 'es', 'en', 'ar'] as const) {
            for (const [, formula] of text[language].matchAll(/\$([^$]+)\$/g)) {
                katex.renderToString(formulaFor(language, formula), { throwOnError: true, strict: 'error' })
                formulas += 1
            }
        }
    }
    assert.ok(formulas > 300, `only ${formulas}`)
})

test('distantziak batx2 z: each language in its own place, and Arabic never keeps the decimal comma', () => {
    for (const text of allTexts()) {
        assert.ok(!text.ar.includes('{,}'), text.ar)
        const words = (value: string) => value.replace(/\$[^$]+\$/g, ' ')
        if (/[a-zA-Z]{4}/.test(words(text.es))) assert.ok(/[؀-ۿ]/.test(words(text.ar)), `not Arabic: ${text.ar}`)
        for (const language of ['eu', 'es', 'en'] as const) assert.ok(!/[؀-ۿ]/.test(text[language]), `Arabic in ${language}: ${text[language]}`)
        if (/[a-zA-Z]{6}/.test(words(text.es))) assert.ok(text.eu !== text.es && text.en !== text.es, `copied from Spanish: ${text.es}`)
    }
})

test('distantziak batx2 z: Basque glues no case ending to a number', () => {
    for (const text of allTexts()) assert.ok(!/\d[a-zñ]/.test(text.eu.replace(/\$[^$]+\$/g, '')) && !/\$(?:ri|ren|rekin|z|ra|tik|ei|ek|ak|en|ko|an)(?![a-zA-Z])/.test(text.eu), text.eu)
})

test('distantziak batx2 z: every worked equality with numbers is right', () => {
    const texts = [
        ...anglesDistancesPractice.flatMap((item) => [item.hint.es, item.explanation.es]),
        ...anglesDistancesChallenges.flatMap((item) => [item.hint.es, item.explanation.es]),
        ...anglesDistancesExerciseBank.flatMap((section) => section.items.map((item) => item.solution.es)),
        ...anglesDistancesDiagnostic.flatMap((item) => [item.explanation.es])
    ]
    let checked = 0
    for (const text of texts) {
        for (const [, formula] of text.matchAll(/\$([^$]+)\$/g)) {
            // Approximations (≈) and periodic decimals (\overline) are written rounded: skip them
            if (formula.includes('\\approx') || formula.includes('\\overline') || formula.includes('\\ldots')) continue
            for (const part of formula.split(/\\qquad|\\quad|\\ \\to\\ |\\to/)) {
                const values = part.replace(/^[a-z]\)\s*/, '').split('=').map(evaluate).filter((value): value is number => value !== null)
                if (values.length < 2) continue
                assert.ok(values.every((value) => Math.abs(value - values[0]) < 1e-9 * Math.max(1, Math.abs(values[0]))), `${part} → ${values.join(' / ')}`)
                checked += 1
            }
        }
    }
    assert.ok(checked >= 10, `only ${checked} checked`)
})

test('distantziak batx2 z: every answer appears in its worked explanation or solution', () => {
    const shows = (text: string, value: FractionValue) => {
        const plain = written(value)
        const asFraction = `\\frac{${Math.abs(value.numerator)}}{${value.denominator}}`
        const minus = value.numerator < 0 ? [`-${plain}`, `-${asFraction}`] : [asFraction]
        const scientific = [`10^{${value.numerator}}`]
        const coefficient = [`${value.numerator}\\sqrt`, `${value.numerator}\\,\\%`]
        // Thousands are grouped with thin spaces: 46\,000
        return [plain, ...minus, ...scientific, ...coefficient].some((candidate) => text.replace(/\\,/g, '').includes(candidate))
    }
    for (const item of [...anglesDistancesPractice, ...anglesDistancesChallenges]) assert.ok(shows(item.explanation.es, item.expected), `${item.id}: ${written(item.expected)}`)
    for (const section of anglesDistancesExerciseBank) for (const item of section.items) if (item.answer) assert.ok(shows(item.solution.es, item.answer.expected), `bank ${item.id}`)
})
