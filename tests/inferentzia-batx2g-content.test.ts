import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { courses } from '../src/data/courses.ts'
import { checkAnswer, hasTerminatingDecimal, toExactDecimal, type FractionValue } from '../src/features/unit-v2/math/fraction.ts'
import { isUnitV2Path } from '../src/features/unit-v2/paths.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { inferenceBatx2gChallenges, inferenceBatx2gDiagnostic, inferenceBatx2gExerciseBank, inferenceBatx2gPractice } from '../src/pages/batx2-gizarte-inferentzia/content.ts'
import { inferenceBatx2gLessonChecks } from '../src/pages/batx2-gizarte-inferentzia/lessonChecks.ts'
import { inferenceBatx2gLessonTexts } from '../src/pages/batx2-gizarte-inferentzia/lessonTexts.ts'
import { evaluate, near } from './latex-math.ts'
import { below, tableValue } from '../src/pages/batx2-zientziak-banaketak/normal.ts'
import { criticalZ } from '../src/pages/batx2-gizarte-banaketak/critical.ts'

/* Inferentzia · 2.º Bachillerato Ciencias Sociales: the content of the unit, with every normal value read again from the table. */

const counts: Record<string, { practice: number; challenges: number; bank: number }> = {
    estimation: { practice: 4, challenges: 3, bank: 10 },
    'mean-ci': { practice: 4, challenges: 3, bank: 10 },
    'error-size': { practice: 4, challenges: 3, bank: 10 },
    'proportion-ci': { practice: 4, challenges: 3, bank: 10 },
    decisions: { practice: 4, challenges: 3, bank: 10 }
}
const stages = Object.keys(counts)
const topics = Object.keys(inferenceBatx2gLessonChecks)

const typed = (value: FractionValue) => (hasTerminatingDecimal(value) ? toExactDecimal(value)! : `${value.numerator}/${value.denominator}`)
const written = (value: FractionValue) => `${value.numerator}/${value.denominator}`

const allTexts = (): LocalizedText[] => [
    ...inferenceBatx2gDiagnostic.flatMap((item) => [item.prompt, item.explanation, ...item.options]),
    ...[...inferenceBatx2gPractice, ...inferenceBatx2gChallenges].flatMap((item) => [item.prompt, item.hint, item.explanation]),
    ...inferenceBatx2gExerciseBank.flatMap((section) => [section.title, ...section.items.flatMap((item) => [item.question, item.solution])])
]

test('inferentzia batx2 g: the unit is active and routed in Ciencias Sociales', () => {
    const course = courses.find((item) => item.id === 'batx2-gizarte')!
    assert.ok(course.topics.find((topic) => topic.id === 'inferencia')!.active)
    assert.ok(isUnitV2Path('/matematika/batx2-gizarte/inferencia'))
    assert.ok(isUnitV2Path('/matematika/batx2-gizarte/inferencia/ariketak'))
})

test('inferentzia batx2 g: diagnostic, practice, challenges and bank are consistent', () => {
    // The unit's block of ids is 153000–153999
    assert.deepEqual(inferenceBatx2gDiagnostic.map((question) => question.id), [153001, 153002, 153003, 153004, 153005, 153006, 153007, 153008])
    for (const question of inferenceBatx2gDiagnostic) {
        assert.ok(topics.includes(question.topic), `${question.id}`)
        assert.ok(question.correctIndex < question.options.length)
        assert.equal(new Set(question.options.map((option) => option.es)).size, question.options.length)
    }
    assert.equal(new Set(inferenceBatx2gDiagnostic.map((question) => question.correctIndex)).size, 3)
    for (const stage of stages) {
        assert.equal(inferenceBatx2gPractice.filter((item) => item.stage === stage).length, counts[stage].practice, stage)
        assert.equal(inferenceBatx2gChallenges.filter((item) => item.stage === stage).length, counts[stage].challenges, stage)
        assert.equal(inferenceBatx2gExerciseBank.find((section) => section.id === stage)!.items.length, counts[stage].bank, stage)
    }
    assert.equal(inferenceBatx2gPractice.length, 20)
    assert.equal(inferenceBatx2gChallenges.length, 15)
    for (const item of [...inferenceBatx2gPractice, ...inferenceBatx2gChallenges]) {
        assert.equal(checkAnswer(typed(item.expected), item.expected, item.answerForm), 'correct', `${item.id}`)
    }
    assert.deepEqual(inferenceBatx2gPractice.map((item) => item.id), inferenceBatx2gPractice.map((_, index) => index + 1))
    assert.deepEqual(inferenceBatx2gChallenges.map((item) => item.id), inferenceBatx2gChallenges.map((_, index) => index + 101))
    assert.deepEqual(inferenceBatx2gExerciseBank.map((section) => section.id), stages)
    const ids = inferenceBatx2gExerciseBank.flatMap((section) => section.items.map((item) => item.id))
    assert.deepEqual(ids, ids.map((_, index) => index + 1))
    for (const section of inferenceBatx2gExerciseBank) {
        assert.ok(section.items.some((item) => item.difficulty === 'easy') && section.items.some((item) => item.difficulty === 'hard'), section.id)
        for (const item of section.items) if (item.answer) assert.equal(checkAnswer(typed(item.answer.expected), item.answer.expected, item.answer.form), 'correct', `${item.id}`)
    }
    assert.deepEqual([...new Set(inferenceBatx2gChallenges.map((item) => item.points))].sort(), [10, 20, 30])
})

test('inferentzia batx2 g: every formula renders in KaTeX', () => {
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

test('inferentzia batx2 g: each language in its own place, the same formulas, and Arabic never keeps the decimal comma', () => {
    const shapes = (value: string) => [...value.matchAll(/\$([^$]+)\$/g)].map(([, formula]) => formula.replace(/\{,\}/g, '.'))
    for (const text of allTexts()) {
        assert.ok(!text.ar.includes('{,}'), text.ar)
        const words = (value: string) => value.replace(/\$[^$]+\$/g, ' ')
        if (/[a-zA-Z]{4}/.test(words(text.es))) assert.ok(/[؀-ۿ]/.test(words(text.ar)), `not Arabic: ${text.ar}`)
        for (const language of ['eu', 'es', 'en'] as const) assert.ok(!/[؀-ۿ]/.test(text[language]), `Arabic in ${language}: ${text[language]}`)
        if (/[a-zA-Z]{6}/.test(words(text.es))) assert.ok(text.eu !== text.es && text.en !== text.es, `copied from Spanish: ${text.es}`)
        for (const language of ['eu', 'en', 'ar'] as const) assert.deepEqual(shapes(text[language]), shapes(text.es), `${language}: ${text[language]}`)
        assert.ok(!/\d\.\d/.test(words(text.es)) && !/\d\.\d/.test(words(text.eu)), `decimal point: ${text.es}`)
        assert.ok(!/\d,\d/.test(words(text.en)) || /\d,\d{3}/.test(words(text.en)), `decimal comma in English: ${text.en}`)
    }
})

test('inferentzia batx2 g: Basque glues no case ending to a number', () => {
    for (const text of allTexts()) {
        assert.ok(!/\d[a-zñ]/.test(text.eu.replace(/\$[^$]+\$/g, '')) && !/\$(?:ri|ren|rekin|z|ra|tik|ei|ek|ak|en|ko|an)(?![a-zA-Z])/.test(text.eu), text.eu)
    }
})

test('inferentzia batx2 g: every worked equality with numbers is right', () => {
    const texts = [
        ...inferenceBatx2gPractice.flatMap((item) => [item.hint.es, item.explanation.es]),
        ...inferenceBatx2gChallenges.flatMap((item) => [item.hint.es, item.explanation.es]),
        ...inferenceBatx2gExerciseBank.flatMap((section) => section.items.map((item) => item.solution.es)),
        ...inferenceBatx2gDiagnostic.flatMap((item) => [item.explanation.es])
    ]
    let checked = 0
    for (const text of texts) {
        for (const [, formula] of text.matchAll(/\$([^$]+)\$/g)) {
            for (const part of formula.split(/\\qquad|\\quad|\\ \\to\\ |\\to|,\\ /)) {
                const sides = part.split(/\\le|\\ge|\\neq|<|>/)[0]
                const exact = sides.split('\\approx')[0].split('=').map((side) => evaluate(side)).filter((value): value is number => value !== null)
                if (exact.length >= 2) {
                    assert.ok(exact.every((value) => near(value, exact[0])), `${part} → ${exact.join(' / ')}`)
                    checked += 1
                }
            }
        }
    }
    assert.ok(checked >= 70, `only ${checked} checked`)
})

test('inferentzia batx2 g: every answer appears in its worked explanation or solution', () => {
    const shows = (text: string, value: FractionValue) => {
        const decimal = toExactDecimal(value) ?? ''
        const candidates = [`\\frac{${value.numerator}}{${value.denominator}}`, decimal.replace(',', '{,}'), decimal, value.denominator === 1 ? String(value.numerator) : '']
        return candidates.some((candidate) => candidate && text.replace(/\\,/g, '').includes(candidate))
    }
    for (const item of [...inferenceBatx2gPractice, ...inferenceBatx2gChallenges]) assert.ok(shows(`${item.explanation.es} ${item.hint.es}`, item.expected), `${item.id}: ${written(item.expected)}`)
    for (const item of inferenceBatx2gExerciseBank.flatMap((section) => section.items)) if (item.answer) assert.ok(shows(item.solution.es, item.answer.expected), `${item.id}: ${written(item.answer.expected)}`)
})

/* ---------- The values of the unit, recomputed ---------- */

const t = (z: number) => below(z) / 10_000
const up = (value: number) => Math.ceil(value - 1e-9)

test('inferentzia batx2 g: the critical values and table values the unit uses', () => {
    assert.deepEqual([80, 88, 90, 92, 94, 95, 96, 97, 98, 99].map(criticalZ), [1.28, 1.555, 1.645, 1.75, 1.88, 1.96, 2.05, 2.17, 2.33, 2.575])
    assert.equal(tableValue(1.75), 9599)
    assert.equal(tableValue(1.76), 9608)
    assert.equal(tableValue(1.55), 9394)
    assert.equal(tableValue(1.56), 9406)
    assert.equal(tableValue(2.05), 9798)
    assert.equal(tableValue(2.17), 9850)
    assert.equal(tableValue(2.33), 9901)
    assert.ok(near(t(1.28), 0.8997) && near(2 * t(2) - 1, 0.9544))
})

test('inferentzia batx2 g: the sample sizes are rounded up from the formula', () => {
    const forMean = (level: number, sd: number, error: number) => up(((criticalZ(level) * sd) / error) ** 2)
    const forProportion = (level: number, pq: number, error: number) => up((criticalZ(level) ** 2 * pq) / error ** 2)
    // lessons and examples
    assert.equal(forMean(95, 15, 2), 217)
    assert.equal(forMean(90, 10, 1), 271)
    assert.equal(forMean(95, 10, 2), 97)
    assert.equal(forMean(99, 10, 2), 166)
    assert.equal(forMean(99, 6, 2), 60)
    assert.equal(forMean(90, 4, 1), 44)
    assert.equal(forProportion(95, 0.25, 0.03), 1068)
    assert.equal(forProportion(95, 0.16, 0.04), 385)
    // practice, challenges and bank
    assert.equal(forMean(95, 20, 5), 62)
    assert.equal(forProportion(95, 0.25, 0.05), 385)
    assert.equal(forMean(99, 9, 3), 60)
    assert.equal(forMean(99, 25, 5), 166)
    assert.equal(forProportion(90, 0.09, 0.03), 271)
    assert.equal(forMean(95, 10, 1) - forMean(90, 10, 1), 114)
    assert.equal(forMean(95, 5, 1), 97)
    assert.equal(forMean(90, 12, 2), 98)
    assert.equal(forMean(99, 40, 4), 664)
    assert.equal(forProportion(95, 0.25, 0.02), 2401)
    assert.equal(forProportion(90, 0.21, 0.05), 228)
    assert.equal(forMean(99, 8, 2), 107)
})

test('inferentzia batx2 g: the intervals and errors of the lessons and exercises', () => {
    const error = (level: number, sd: number, n: number) => (criticalZ(level) * sd) / Math.sqrt(n)
    assert.ok(near(172 - error(95, 8, 64), 170.04) && near(50 + error(90, 10, 25), 53.29))
    assert.ok(near(error(99, 12, 36), 5.15) && near(error(95, 6, 16), 2.94) && near(error(95, 10, 400), 0.98))
    assert.ok(near(error(95, Math.sqrt(0.16), 400), 0.0392) && near(error(90, Math.sqrt(0.09), 100), 0.04935))
    assert.ok(near(error(99, Math.sqrt(0.09), 900), 0.02575) && near(error(95, 0.5, 2500), 0.0196) && near(error(99, 0.5, 400), 0.064375))
    assert.ok(near(490 + error(95, 40, 100), 497.84) && near(80 - error(95, 15, 25), 74.12) && near(120 - error(90, 30, 100), 115.065))
    assert.ok(near(error(95, 0.5, 1600), 0.0245) && near(error(95, 0.5, 10_000), 0.0098) && near(15 + error(99, 3, 36), 16.2875))
    assert.ok(near(0.4 + error(90, Math.sqrt(0.24), 2400), 0.41645) && near(246 + error(99, 20, 100), 251.15))
})

test('inferentzia batx2 g: the lesson examples are worked exercises with an answer', () => {
    for (const [id, entry] of Object.entries(inferenceBatx2gLessonTexts)) assert.ok(entry.examplePrompt && entry.exampleAnswer, id)
})
