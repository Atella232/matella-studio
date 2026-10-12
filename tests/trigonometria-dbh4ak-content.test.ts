import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import katex from 'katex'
import { courses } from '../src/data/courses.ts'
import { checkAnswer, hasTerminatingDecimal, toExactDecimal, type FractionValue } from '../src/features/unit-v2/math/fraction.ts'
import { isUnitV2Path } from '../src/features/unit-v2/paths.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { readTrigonometryAnswer } from '../src/pages/dbh4-akademikoak-trigonometria/answers.ts'
import { localize } from '../src/pages/dbh4-akademikoak-trigonometria/text.ts'

import { trigonometryChallenges as realsChallenges, trigonometryDiagnostic as realsDiagnostic, trigonometryExerciseBank as realsExerciseBank, trigonometryPractice as realsPractice } from '../src/pages/dbh4-akademikoak-trigonometria/content.ts'

const stages = ['ratios', 'identities', 'solving', 'problems', 'circle']
const topics = ['right-ratios', 'ratio-properties', 'notable-angles', 'fundamental', 'one-ratio', 'calculator', 'two-sides', 'side-angle', 'elevation', 'double-observation', 'oblique', 'trig-area', 'unit-circle', 'reduction', 'radians']

const typed = (value: FractionValue, form?: string) => (hasTerminatingDecimal(value) && (form !== 'simplified' || value.denominator === 1) ? toExactDecimal(value)! : `${value.numerator}/${value.denominator}`)
const written = (value: FractionValue) => (hasTerminatingDecimal(value) ? toExactDecimal(value)!.replace(',', '{,}') : `\\frac{${Math.abs(value.numerator)}}{${value.denominator}}`)

/** Plain arithmetic in LaTeX (no letters): powers, fractions, roots, products, divisions and decimal commas */
function evaluate(latex: string): number | null {
    let js = latex
        .replace(/\\,/g, '')
        .replace(/\\left|\\right/g, '')
        .replace(/(\d)\{,\}(\d)/g, '$1.$2')
        .replace(/\\cdot/g, '*')
        .replace(/\\mathbin\{:\}|:/g, '/')
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
    ...realsDiagnostic.flatMap((item) => [item.prompt, item.explanation, ...item.options]),
    ...[...realsPractice, ...realsChallenges].flatMap((item) => [item.prompt, item.hint, item.explanation]),
    ...realsExerciseBank.flatMap((section) => [section.title, ...section.items.flatMap((item) => [item.question, item.solution])])
]

test('trigonometria 4. DBH ak: the unit is active and routed', () => {
    const course = courses.find((item) => item.id === 'dbh4-akademikoak')!
    assert.ok(course.topics.find((topic) => topic.id === 'trigonometria')!.active)
    assert.ok(isUnitV2Path('/matematika/dbh4-akademikoak/trigonometria'))
    assert.ok(isUnitV2Path('/matematika/dbh4-akademikoak/trigonometria/ariketak'))
})

test('trigonometria 4. DBH ak: diagnostic, practice, challenges and bank are consistent', () => {
    assert.equal(realsDiagnostic.length, 8)
    for (const question of realsDiagnostic) {
        assert.ok(topics.includes(question.topic), `${question.id}`)
        assert.ok(question.correctIndex < question.options.length)
        assert.equal(new Set(question.options.map((option) => option.es)).size, question.options.length)
    }
    // The right option is not always in the same place
    assert.ok(new Set(realsDiagnostic.map((question) => question.correctIndex)).size === 3)
    for (const stage of stages) {
        assert.equal(realsPractice.filter((item) => item.stage === stage).length, 4, stage)
        assert.ok(realsChallenges.some((item) => item.stage === stage), stage)
    }
    for (const item of [...realsPractice, ...realsChallenges]) {
        assert.ok(stages.includes(item.stage), `${item.id}`)
        assert.equal(checkAnswer(typed(item.expected, item.answerForm), item.expected, item.answerForm), 'correct', `${item.id}`)
        for (const language of ['eu', 'es', 'ar'] as const) assert.ok(item.explanation[language].length > 0 && item.prompt[language].length > 0 && item.hint[language].length > 0, `${item.id} ${language}`)
    }
    assert.deepEqual(realsExerciseBank.map((section) => section.id), stages)
    const ids = realsExerciseBank.flatMap((section) => section.items.map((item) => item.id))
    assert.deepEqual(ids, ids.map((_, index) => index + 1))
    for (const section of realsExerciseBank) {
        assert.ok(section.items.some((item) => item.difficulty === 'easy') && section.items.some((item) => item.difficulty === 'hard'), section.id)
        for (const item of section.items) {
            for (const language of ['eu', 'es', 'ar'] as const) assert.ok(item.question[language].length > 0 && item.solution[language].length > 0, `${item.id} ${language}`)
            if (item.answer) assert.equal(checkAnswer(typed(item.answer.expected, item.answer.form), item.answer.expected, item.answer.form), 'correct', `${item.id}`)
        }
    }
    assert.equal(new Set(realsChallenges.map((item) => item.id)).size, realsChallenges.length)
    assert.deepEqual([...new Set(realsChallenges.map((item) => item.points))].sort(), [10, 20, 30])
})

test('trigonometria 4. DBH ak: every formula renders in KaTeX', () => {
    let formulas = 0
    for (const text of allTexts()) {
        for (const language of ['eu', 'es', 'ar'] as const) {
            for (const [, formula] of text[language].matchAll(/\$([^$]+)\$/g)) {
                katex.renderToString(formula, { throwOnError: true, strict: 'error' })
                formulas += 1
            }
        }
    }
    assert.ok(formulas > 400, `only ${formulas}`)
})

test('trigonometria 4. DBH ak: Arabic never keeps the decimal comma', () => {
    for (const text of allTexts()) assert.ok(!text.ar.includes('{,}'), text.ar)
})

test('trigonometria 4. DBH ak: every worked equality with numbers is right', () => {
    const texts = [
        ...realsPractice.flatMap((item) => [item.hint.es, item.explanation.es]),
        ...realsChallenges.flatMap((item) => [item.hint.es, item.explanation.es]),
        ...realsExerciseBank.flatMap((section) => section.items.map((item) => item.solution.es)),
        ...realsDiagnostic.flatMap((item) => [item.explanation.es])
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
    assert.ok(checked >= 30, `only ${checked} checked`)
})

test('trigonometria 4. DBH ak: every answer appears in its worked explanation or solution', () => {
    const shows = (text: string, value: FractionValue) => {
        const plain = written(value)
        const asFraction = `\\frac{${Math.abs(value.numerator)}}{${value.denominator}}`
        const minus = value.numerator < 0 ? [`-${plain}`, `-${asFraction}`] : [asFraction]
        const scientific = [`10^{${value.numerator}}`]
        const coefficient = [`${value.numerator}\\sqrt`, `${value.numerator}\\,\\%`, `${value.numerator}\\sqrt[3]`]
        // Thousands are grouped with thin spaces: 10\,000
        return [plain, ...minus, ...scientific, ...coefficient].some((candidate) => text.replace(/\\,/g, '').includes(candidate))
    }
    for (const item of [...realsPractice, ...realsChallenges]) assert.ok(shows(item.explanation.es, item.expected), `${item.id}: ${written(item.expected)}`)
    for (const section of realsExerciseBank) for (const item of section.items) if (item.answer) assert.ok(shows(item.solution.es, item.answer.expected), `bank ${item.id}`)
})

test('trigonometria 4. DBH ak: answers with units, signs, commas or points are read', () => {
    for (const [input, value] of [['0,75', [3, 4]], ['−0,8', [-4, 5]], ['-0.5', [-1, 2]], ['36,9°', [369, 10]], ['2,62 rad', [131, 50]], ['144,56 m', [3614, 25]], ['3/4', [3, 4]]] as const) {
        assert.equal(checkAnswer(readTrigonometryAnswer(input), { numerator: value[0], denominator: value[1] }), 'correct', input)
    }
})

test('trigonometria 4. DBH ak: lessons cover every topic and their formulas render', () => {
    // The lessons are TSX: read their source and render every formula in each language
    const source = readFileSync('src/pages/dbh4-akademikoak-trigonometria/lessons.tsx', 'utf8').replace(/\\\\/g, '\\').replace(/\\'/g, "'")
    assert.deepEqual([...source.matchAll(/id: '([a-z-]+)',\s+stage:/g)].map((match) => match[1]), topics)
    let formulas = 0
    for (const [, formula] of source.matchAll(/\$([^$]+)\$/g)) {
        for (const language of ['eu', 'es', 'ar'] as const) katex.renderToString(localize(language, formula.replace(/\{,\}/g, language === 'ar' ? '.' : '{,}')), { throwOnError: true, strict: 'error' })
        formulas += 1
    }
    assert.ok(formulas > 200, `only ${formulas}`)
})

test('trigonometria 4. DBH ak: each language writes its own names of the ratios', () => {
    assert.equal(localize('es', '\\sen\\alpha+\\tg\\alpha'), '\\operatorname{sen}\\alpha+\\operatorname{tg}\\alpha')
    assert.equal(localize('eu', '\\sen\\alpha+\\tg\\alpha'), '\\sin\\alpha+\\operatorname{tg}\\alpha')
    assert.equal(localize('ar', '\\sen\\alpha+\\tg\\alpha'), '\\sin\\alpha+\\tan\\alpha')
    for (const text of allTexts()) for (const language of ['eu', 'es', 'ar'] as const) assert.ok(!/\\(?:sen|tg)(?![a-zA-Z])/.test(text[language]), text[language])
})
