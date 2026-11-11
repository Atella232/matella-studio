import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { courses } from '../src/data/courses.ts'
import { checkAnswer, hasTerminatingDecimal, toExactDecimal, type FractionValue } from '../src/features/unit-v2/math/fraction.ts'
import { isUnitV2Path } from '../src/features/unit-v2/paths.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { bach2SketchChallenges, bach2SketchDiagnostic, bach2SketchExerciseBank, bach2SketchPractice } from '../src/pages/batx2-zientziak-adierazpena/content.ts'

const stages = ['review', 'study', 'explog', 'roots', 'reading']
const topics = ['sketch-plan', 'asymptotes-review', 'rational-review', 'symmetry-period', 'asymptote-position', 'domain-edges', 'exp-products', 'exp-special', 'log-functions', 'root-functions', 'trig-functions', 'piecewise-graphs', 'absolute-graphs', 'derivative-graph', 'curve-from-data']

const typed = (value: FractionValue, form?: string) => (hasTerminatingDecimal(value) && (form !== 'simplified' || value.denominator === 1) ? toExactDecimal(value)! : `${value.numerator}/${value.denominator}`)
const written = (value: FractionValue) => (hasTerminatingDecimal(value) ? toExactDecimal(value)!.replace(',', '{,}') : `\\frac{${Math.abs(value.numerator)}}{${value.denominator}}`)

/** Plain arithmetic in LaTeX (no letters): powers, fractions, roots, products, divisions and decimal commas */
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
    if (!/^(?:[\d+\-*/().,]|Math\.(?:pow|sqrt|cbrtn))+$/.test(js) || !/\d/.test(js)) return null
    const cbrtn = (value: number, index: number) => (value < 0 ? -((-value) ** (1 / index)) : value ** (1 / index))
    try {
        return Function('Math', `return ${js}`)({ ...Math, pow: Math.pow, sqrt: Math.sqrt, cbrtn }) as number
    } catch {
        return null
    }
}

const allTexts = (): LocalizedText[] => [
    ...bach2SketchDiagnostic.flatMap((item) => [item.prompt, item.explanation, ...item.options]),
    ...[...bach2SketchPractice, ...bach2SketchChallenges].flatMap((item) => [item.prompt, item.hint, item.explanation]),
    ...bach2SketchExerciseBank.flatMap((section) => [section.title, ...section.items.flatMap((item) => [item.question, item.solution])])
]

test('adierazpena batx2 z: the unit is active and routed', () => {
    const course = courses.find((item) => item.id === 'batx2-zientziak')!
    assert.ok(course.topics.find((topic) => topic.id === 'representacion-funciones')!.active)
    assert.ok(isUnitV2Path('/matematika/batx2-zientziak/representacion-funciones'))
    assert.ok(isUnitV2Path('/matematika/batx2-zientziak/representacion-funciones/ariketak'))
})

test('adierazpena batx2 z: diagnostic, practice, challenges and bank are consistent', () => {
    assert.equal(bach2SketchDiagnostic.length, 8)
    assert.deepEqual(bach2SketchDiagnostic.map((question) => question.id), [125001, 125002, 125003, 125004, 125005, 125006, 125007, 125008])
    for (const question of bach2SketchDiagnostic) {
        assert.ok(topics.includes(question.topic), `${question.id}`)
        assert.ok(question.correctIndex < question.options.length)
        assert.equal(new Set(question.options.map((option) => option.es)).size, question.options.length)
    }
    // The right option is not always in the same place
    assert.ok(new Set(bach2SketchDiagnostic.map((question) => question.correctIndex)).size === 3)
    for (const stage of stages) {
        assert.equal(bach2SketchPractice.filter((item) => item.stage === stage).length, 4, stage)
        assert.equal(bach2SketchChallenges.filter((item) => item.stage === stage).length, 3, stage)
    }
    for (const item of [...bach2SketchPractice, ...bach2SketchChallenges]) {
        assert.ok(stages.includes(item.stage), `${item.id}`)
        assert.equal(checkAnswer(typed(item.expected, item.answerForm), item.expected, item.answerForm), 'correct', `${item.id}`)
        for (const language of ['eu', 'es', 'en', 'ar'] as const) assert.ok(item.explanation[language].length > 0 && item.prompt[language].length > 0 && item.hint[language].length > 0, `${item.id} ${language}`)
    }
    assert.deepEqual(bach2SketchExerciseBank.map((section) => section.id), stages)
    const ids = bach2SketchExerciseBank.flatMap((section) => section.items.map((item) => item.id))
    assert.deepEqual(ids, ids.map((_, index) => index + 1))
    assert.equal(ids.length, 50)
    for (const section of bach2SketchExerciseBank) {
        assert.ok(section.items.some((item) => item.difficulty === 'easy') && section.items.some((item) => item.difficulty === 'hard'), section.id)
        for (const item of section.items) {
            for (const language of ['eu', 'es', 'en', 'ar'] as const) assert.ok(item.question[language].length > 0 && item.solution[language].length > 0, `${item.id} ${language}`)
            if (item.answer) assert.equal(checkAnswer(typed(item.answer.expected, item.answer.form), item.answer.expected, item.answer.form), 'correct', `${item.id}`)
        }
    }
    assert.equal(new Set(bach2SketchChallenges.map((item) => item.id)).size, bach2SketchChallenges.length)
    assert.deepEqual([...new Set(bach2SketchChallenges.map((item) => item.points))].sort(), [10, 20, 30])
})

test('adierazpena batx2 z: every formula renders in KaTeX', () => {
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

test('adierazpena batx2 z: each language in its own place, and Arabic never keeps the decimal comma', () => {
    for (const text of allTexts()) {
        assert.ok(!text.ar.includes('{,}'), text.ar)
        const words = (value: string) => value.replace(/\$[^$]+\$/g, ' ')
        if (/[a-zA-Z]{4}/.test(words(text.es))) assert.ok(/[؀-ۿ]/.test(words(text.ar)), `not Arabic: ${text.ar}`)
        for (const language of ['eu', 'es', 'en'] as const) assert.ok(!/[؀-ۿ]/.test(text[language]), `Arabic in ${language}: ${text[language]}`)
        if (/[a-zA-Z]{6}/.test(words(text.es))) assert.ok(text.eu !== text.es && text.en !== text.es, `copied from Spanish: ${text.es}`)
    }
})

test('adierazpena batx2 z: Basque glues no case ending to a number', () => {
    for (const text of allTexts()) assert.ok(!/\d[a-zñ]/.test(text.eu.replace(/\$[^$]+\$/g, '')) && !/\$(?:ri|ren|rekin|z|ra|tik|ei|ek|ak|en|ko|an)(?![a-zA-Z])/.test(text.eu), text.eu)
})

test('adierazpena batx2 z: every worked equality with numbers is right', () => {
    const texts = [
        ...bach2SketchPractice.flatMap((item) => [item.hint.es, item.explanation.es]),
        ...bach2SketchChallenges.flatMap((item) => [item.hint.es, item.explanation.es]),
        ...bach2SketchExerciseBank.flatMap((section) => section.items.map((item) => item.solution.es)),
        ...bach2SketchDiagnostic.flatMap((item) => [item.explanation.es])
    ]
    let checked = 0
    for (const text of texts) {
        for (const [, formula] of text.matchAll(/\$([^$]+)\$/g)) {
            // Approximations (≈) and periodic decimals (\overline) are written rounded: skip them
            if (formula.includes('\\approx') || formula.includes('\\overline') || formula.includes('\\ldots')) continue
            // Rows of a gathered block are read one by one, like the parts split by wide spaces
            for (const part of formula.replace(/\\(?:begin|end)\{[a-z]+\}|&/g, '').split(/\\qquad|\\quad|\\ \\to\\ |\\to|\\\\/)) {
                const values = part.replace(/^[a-z]\)\s*/, '').split('=').map(evaluate).filter((value): value is number => value !== null)
                if (values.length < 2) continue
                assert.ok(values.every((value) => Math.abs(value - values[0]) < 1e-9 * Math.max(1, Math.abs(values[0]))), `${part} → ${values.join(' / ')}`)
                checked += 1
            }
        }
    }
    assert.ok(checked >= 10, `only ${checked} checked`)
})

test('adierazpena batx2 z: every answer appears in its worked explanation or solution', () => {
    const shows = (text: string, value: FractionValue) => {
        const plain = written(value)
        const asFraction = `\\frac{${Math.abs(value.numerator)}}{${value.denominator}}`
        const minus = value.numerator < 0 ? [`-${plain}`, `-${asFraction}`] : [asFraction]
        const scientific = [`10^{${value.numerator}}`]
        const coefficient = [`${value.numerator}\\sqrt`, `${value.numerator}\\,\\%`]
        // Thousands are grouped with thin spaces: 46\,000
        return [plain, ...minus, ...scientific, ...coefficient].some((candidate) => text.replace(/\\,/g, '').includes(candidate))
    }
    for (const item of [...bach2SketchPractice, ...bach2SketchChallenges]) assert.ok(shows(item.explanation.es, item.expected), `${item.id}: ${written(item.expected)}`)
    for (const section of bach2SketchExerciseBank) for (const item of section.items) if (item.answer) assert.ok(shows(item.solution.es, item.answer.expected), `bank ${item.id}`)
})
