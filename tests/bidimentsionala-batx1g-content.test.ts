import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { courses } from '../src/data/courses.ts'
import { checkAnswer, hasTerminatingDecimal, toExactDecimal, type FractionValue } from '../src/features/unit-v2/math/fraction.ts'
import { isUnitV2Path } from '../src/features/unit-v2/paths.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { pairStats, tableStats } from '../src/pages/batx1-zientziak-bidimentsionala/bivariate.ts'
import { bivarLessonChecks } from '../src/pages/batx1-zientziak-bidimentsionala/lessonChecks.ts'
import { socialBivarChallenges, socialBivarDiagnostic, socialBivarExerciseBank, socialBivarPractice } from '../src/pages/batx1-gizarte-bidimentsionala/content.ts'
import { BOTH_LINES, CLOUD_NOISE, CLOUD_X, cloudWithR, LINE_XY, PREFERENCE_TABLE, R_CLOUDS } from '../src/pages/batx1-gizarte-bidimentsionala/data.ts'
import { socialBivarLessonChecks } from '../src/pages/batx1-gizarte-bidimentsionala/lessonChecks.ts'
import { socialBivarLessonTexts } from '../src/pages/batx1-gizarte-bidimentsionala/lessonTexts.ts'
import { evaluate, near } from './latex-math.ts'

const stages = ['cloud', 'parameters', 'regression', 'problems', 'tables']
/** The lessons borrowed from 1.º Ciencias, in lessons.tsx */
const borrowed = ['scatter-dependence', 'quadrants', 'covariance', 'correlation-coefficient', 'units-change', 'regression-yx', 'estimation', 'calculation-table', 'inverse-problems', 'two-variables', 'marginal', 'conditional', 'independence', 'grouped-pairs']
const topics = [...borrowed, ...Object.keys(socialBivarLessonChecks)]

const typed = (value: FractionValue, form?: string) => (hasTerminatingDecimal(value) && (form !== 'simplified' || value.denominator === 1) ? toExactDecimal(value)! : `${value.numerator}/${value.denominator}`)
const written = (value: FractionValue) => (hasTerminatingDecimal(value) ? toExactDecimal(value)!.replace(',', '{,}') : `\\frac{${Math.abs(value.numerator)}}{${value.denominator}}`)

const allTexts = (): LocalizedText[] => [
    ...socialBivarDiagnostic.flatMap((item) => [item.prompt, item.explanation, ...item.options]),
    ...[...socialBivarPractice, ...socialBivarChallenges].flatMap((item) => [item.prompt, item.hint, item.explanation]),
    ...socialBivarExerciseBank.flatMap((section) => [section.title, ...section.items.flatMap((item) => [item.question, item.solution])])
]

test('bidimentsionala batx1 g: the unit is active and routed', () => {
    const course = courses.find((item) => item.id === 'batx1-gizarte')!
    assert.ok(course.topics.find((topic) => topic.id === 'estadistica-bidimensional')!.active)
    assert.ok(isUnitV2Path('/matematika/batx1-gizarte/estadistica-bidimensional'))
    assert.ok(isUnitV2Path('/matematika/batx1-gizarte/estadistica-bidimensional/ariketak'))
})

test('bidimentsionala batx1 g: the borrowed lessons exist in 1.º Ciencias and the new ones are not there', () => {
    for (const id of borrowed) assert.ok(id in bivarLessonChecks, id)
    for (const id of Object.keys(socialBivarLessonChecks)) assert.ok(!(id in bivarLessonChecks), id)
    assert.deepEqual(Object.keys(socialBivarLessonTexts).sort(), Object.keys(socialBivarLessonChecks).sort())
    // The two lessons of Ciencias that write the line of X on Y as x = … are not borrowed (owner's choice R1)
    assert.ok(!borrowed.includes('regression-xy') && !borrowed.includes('two-lines'))
})

test('bidimentsionala batx1 g: diagnostic, practice, challenges and bank are consistent', () => {
    assert.deepEqual(socialBivarDiagnostic.map((question) => question.id), [138001, 138002, 138003, 138004, 138005, 138006, 138007, 138008])
    for (const question of socialBivarDiagnostic) {
        assert.ok(topics.includes(question.topic), `${question.id}`)
        assert.ok(question.correctIndex < question.options.length)
        assert.equal(new Set(question.options.map((option) => option.es)).size, question.options.length)
    }
    assert.equal(new Set(socialBivarDiagnostic.map((question) => question.correctIndex)).size, 3)
    for (const stage of stages) {
        assert.equal(socialBivarPractice.filter((item) => item.stage === stage).length, 4, stage)
        assert.equal(socialBivarChallenges.filter((item) => item.stage === stage).length, 3, stage)
    }
    for (const item of [...socialBivarPractice, ...socialBivarChallenges]) {
        assert.equal(checkAnswer(typed(item.expected, item.answerForm), item.expected, item.answerForm), 'correct', `${item.id}`)
        for (const language of ['eu', 'es', 'en', 'ar'] as const) assert.ok(item.explanation[language].length > 0 && item.prompt[language].length > 0 && item.hint[language].length > 0, `${item.id} ${language}`)
    }
    assert.deepEqual(socialBivarPractice.map((item) => item.id), socialBivarPractice.map((_, index) => index + 1))
    assert.deepEqual(socialBivarExerciseBank.map((section) => section.id), stages)
    const ids = socialBivarExerciseBank.flatMap((section) => section.items.map((item) => item.id))
    assert.deepEqual(ids, ids.map((_, index) => index + 1))
    assert.equal(ids.length, 50)
    for (const section of socialBivarExerciseBank) {
        assert.equal(section.items.length, 10, section.id)
        assert.ok(section.items.some((item) => item.difficulty === 'easy') && section.items.some((item) => item.difficulty === 'hard'), section.id)
        for (const item of section.items) if (item.answer) assert.equal(checkAnswer(typed(item.answer.expected, item.answer.form), item.answer.expected, item.answer.form), 'correct', `${item.id}`)
    }
    assert.deepEqual(socialBivarChallenges.map((item) => item.id), Array.from({ length: 15 }, (_, index) => 101 + index))
    assert.deepEqual([...new Set(socialBivarChallenges.map((item) => item.points))].sort(), [10, 20, 30])
})

test('bidimentsionala batx1 g: every formula renders in KaTeX', () => {
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

test('bidimentsionala batx1 g: each language in its own place, and Arabic never keeps the decimal comma', () => {
    for (const text of allTexts()) {
        assert.ok(!text.ar.includes('{,}'), text.ar)
        const words = (value: string) => value.replace(/\$[^$]+\$/g, ' ')
        if (/[a-zA-Z]{4}/.test(words(text.es))) assert.ok(/[؀-ۿ]/.test(words(text.ar)), `not Arabic: ${text.ar}`)
        for (const language of ['eu', 'es', 'en'] as const) assert.ok(!/[؀-ۿ]/.test(text[language]), `Arabic in ${language}: ${text[language]}`)
        assert.ok(!/[؀-ۿ]/.test([...text.ar.matchAll(/\$([^$]+)\$/g)].map((match) => match[1]).join('')), `Arabic in a formula: ${text.ar}`)
        if (/[a-zA-Z]{6}/.test(words(text.es))) assert.ok(text.eu !== text.es && text.en !== text.es, `copied from Spanish: ${text.es}`)
        assert.ok(!/\d\.\d/.test(words(text.es)) && !/\d\.\d/.test(words(text.eu)), `decimal point: ${text.es}`)
        assert.ok(!/\d,\d/.test(words(text.en)) || /\d,\d{3}/.test(words(text.en)), `decimal comma in English: ${text.en}`)
    }
})

test('bidimentsionala batx1 g: Basque glues no case ending to a number', () => {
    for (const text of allTexts()) {
        assert.ok(!/\d[a-zñ]/.test(text.eu.replace(/\$[^$]+\$/g, '')) && !/\$(?:ri|ren|rekin|z|ra|tik|ei|ek|ak|en|ko|an)(?![a-zA-Z])/.test(text.eu), text.eu)
    }
})

test('bidimentsionala batx1 g: every worked equality with numbers is right', () => {
    const texts = [
        ...socialBivarPractice.flatMap((item) => [item.hint.es, item.explanation.es]),
        ...socialBivarChallenges.flatMap((item) => [item.hint.es, item.explanation.es]),
        ...socialBivarExerciseBank.flatMap((section) => section.items.map((item) => item.solution.es)),
        ...socialBivarDiagnostic.map((item) => item.explanation.es)
    ]
    let checked = 0
    for (const text of texts) {
        // The evaluator does not read \frac with {,} inside: the decimal comma becomes a point first
        for (const [, formula] of text.replace(/\{,\}/g, '.').matchAll(/\$([^$]+)\$/g)) {
            for (const part of formula.split(/\\qquad|\\quad|\\ \\to\\ |\\to|,\\ /)) {
                const values = part.split(/\\le|\\ge|\\neq|<|>|\\approx/)[0].split('=').map((side) => evaluate(side)).filter((value): value is number => value !== null)
                if (values.length < 2) continue
                assert.ok(values.every((value) => near(value, values[0])), `${part} → ${values.join(' / ')}`)
                checked += 1
            }
        }
    }
    assert.ok(checked >= 60, `only ${checked} checked`)
})

test('bidimentsionala batx1 g: every answer appears in its worked explanation or solution', () => {
    const shows = (text: string, value: FractionValue) => {
        const plain = written(value)
        const words = toExactDecimal(value) ?? ''
        return [plain, words, words.replace('-', '−')].some((candidate) => candidate && text.replace(/\\,/g, '').includes(candidate))
    }
    for (const item of [...socialBivarPractice, ...socialBivarChallenges]) assert.ok(shows(`${item.explanation.es} ${item.hint.es}`, item.expected), `${item.id}: ${written(item.expected)}`)
    for (const item of socialBivarExerciseBank.flatMap((section) => section.items)) if (item.answer) assert.ok(shows(item.solution.es, item.answer.expected), `${item.id}: ${written(item.answer.expected)}`)
})

test('bidimentsionala batx1 g: each figure and lesson draws the numbers it writes', () => {
    // The clouds have exactly the r of the lesson
    const noiseMean = CLOUD_NOISE.reduce((sum, value) => sum + value, 0) / CLOUD_NOISE.length
    assert.ok(near(noiseMean, 0))
    for (const r of R_CLOUDS) assert.ok(near(pairStats(cloudWithR(r)).r, r), `${r}`)
    assert.equal(cloudWithR(0.5).length, CLOUD_X.length)
    // The line of X on Y: y = 2x − 2 and x = 8 for y = 14
    const { mx, my, vy, cxy, y } = LINE_XY
    assert.equal(my - (vy / cxy) * mx, -2)
    assert.equal(mx + (cxy / vy) * (y - my), 8)
    // Both lines: they cross at (4, 7) and r² = 0,64
    const [m1, b1] = BOTH_LINES.yx
    const [m2, b2] = BOTH_LINES.xy
    const x = (b2 - b1) / (m1 - m2)
    assert.ok(near(x, 4) && near(m1 * x + b1, 7))
    assert.ok(near(m1 / m2, 0.64))
    // The preference table: marginal x̄ = 35, σ = 5; conditioned on sport, 32,5
    const rows = PREFERENCE_TABLE.cells.map((row) => row.reduce((sum, value) => sum + value, 0))
    const marginal = tableStats(PREFERENCE_TABLE.marks, [0], rows.map((count) => [count]))
    assert.equal(marginal.n, 32)
    assert.equal(marginal.mx, 35)
    assert.equal(marginal.vx, 25)
    const sport = PREFERENCE_TABLE.cells.map((row) => row[2])
    assert.equal(sport.reduce((sum, count, index) => sum + count * PREFERENCE_TABLE.marks[index], 0) / sport.reduce((sum, count) => sum + count, 0), 32.5)
    // Challenge 106 and bank 18–19, 36–38
    const challenge = pairStats([[1, 0], [2, 4], [3, 2], [4, 6]])
    assert.ok(near(challenge.r, 0.8))
    const bank = pairStats([[1, 3], [2, 1], [3, 5], [4, 3]])
    assert.ok(near(bank.cxy, 0.5) && near(bank.vy, 2))
    const fourPairs = pairStats([[1, 2], [3, 4], [5, 4], [7, 6]])
    assert.ok(near(fourPairs.cxy, 3) && near(fourPairs.vx, 5) && near(fourPairs.my - fourPairs.myx * fourPairs.mx, 1.6))
})

test('bidimentsionala batx1 g: the lesson examples are worked exercises with an answer', () => {
    for (const [id, entry] of Object.entries(socialBivarLessonTexts)) assert.ok(entry.examplePrompt && entry.exampleAnswer, id)
})
