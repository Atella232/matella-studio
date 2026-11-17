import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { courses } from '../src/data/courses.ts'
import { checkAnswer, hasTerminatingDecimal, toExactDecimal, type FractionValue } from '../src/features/unit-v2/math/fraction.ts'
import { isUnitV2Path } from '../src/features/unit-v2/paths.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { samplingBatx2gChallenges, samplingBatx2gDiagnostic, samplingBatx2gExerciseBank, samplingBatx2gPractice } from '../src/pages/batx2-gizarte-laginketa/content.ts'
import { samplingBatx2gLessonChecks } from '../src/pages/batx2-gizarte-laginketa/lessonChecks.ts'
import { samplingBatx2gLessonTexts } from '../src/pages/batx2-gizarte-laginketa/lessonTexts.ts'
import { evaluate, near } from './latex-math.ts'
import { below, tableValue } from '../src/pages/batx2-zientziak-banaketak/normal.ts'
import { criticalZ } from '../src/pages/batx2-gizarte-banaketak/critical.ts'

/* Laginketa · 2.º Bachillerato Ciencias Sociales: the content of the unit, with every normal value read again from the table. */

const counts: Record<string, { practice: number; challenges: number; bank: number }> = {
    sampling: { practice: 4, challenges: 3, bank: 10 },
    strata: { practice: 4, challenges: 3, bank: 10 },
    means: { practice: 4, challenges: 3, bank: 10 },
    proportions: { practice: 4, challenges: 3, bank: 10 },
    characteristic: { practice: 4, challenges: 3, bank: 10 }
}
const stages = Object.keys(counts)
const topics = Object.keys(samplingBatx2gLessonChecks)

const typed = (value: FractionValue) => (hasTerminatingDecimal(value) ? toExactDecimal(value)! : `${value.numerator}/${value.denominator}`)
const written = (value: FractionValue) => `${value.numerator}/${value.denominator}`

const allTexts = (): LocalizedText[] => [
    ...samplingBatx2gDiagnostic.flatMap((item) => [item.prompt, item.explanation, ...item.options]),
    ...[...samplingBatx2gPractice, ...samplingBatx2gChallenges].flatMap((item) => [item.prompt, item.hint, item.explanation]),
    ...samplingBatx2gExerciseBank.flatMap((section) => [section.title, ...section.items.flatMap((item) => [item.question, item.solution])])
]

test('laginketa batx2 g: the unit is active and routed in Ciencias Sociales', () => {
    const course = courses.find((item) => item.id === 'batx2-gizarte')!
    assert.ok(course.topics.find((topic) => topic.id === 'muestreo')!.active)
    assert.ok(isUnitV2Path('/matematika/batx2-gizarte/muestreo'))
    assert.ok(isUnitV2Path('/matematika/batx2-gizarte/muestreo/ariketak'))
})

test('laginketa batx2 g: diagnostic, practice, challenges and bank are consistent', () => {
    // The unit's block of ids is 152000–152999
    assert.deepEqual(samplingBatx2gDiagnostic.map((question) => question.id), [152001, 152002, 152003, 152004, 152005, 152006, 152007, 152008])
    for (const question of samplingBatx2gDiagnostic) {
        assert.ok(topics.includes(question.topic), `${question.id}`)
        assert.ok(question.correctIndex < question.options.length)
        assert.equal(new Set(question.options.map((option) => option.es)).size, question.options.length)
    }
    assert.equal(new Set(samplingBatx2gDiagnostic.map((question) => question.correctIndex)).size, 3)
    for (const stage of stages) {
        assert.equal(samplingBatx2gPractice.filter((item) => item.stage === stage).length, counts[stage].practice, stage)
        assert.equal(samplingBatx2gChallenges.filter((item) => item.stage === stage).length, counts[stage].challenges, stage)
        assert.equal(samplingBatx2gExerciseBank.find((section) => section.id === stage)!.items.length, counts[stage].bank, stage)
    }
    assert.equal(samplingBatx2gPractice.length, 20)
    assert.equal(samplingBatx2gChallenges.length, 15)
    for (const item of [...samplingBatx2gPractice, ...samplingBatx2gChallenges]) {
        assert.equal(checkAnswer(typed(item.expected), item.expected, item.answerForm), 'correct', `${item.id}`)
    }
    assert.deepEqual(samplingBatx2gPractice.map((item) => item.id), samplingBatx2gPractice.map((_, index) => index + 1))
    assert.deepEqual(samplingBatx2gChallenges.map((item) => item.id), samplingBatx2gChallenges.map((_, index) => index + 101))
    assert.deepEqual(samplingBatx2gExerciseBank.map((section) => section.id), stages)
    const ids = samplingBatx2gExerciseBank.flatMap((section) => section.items.map((item) => item.id))
    assert.deepEqual(ids, ids.map((_, index) => index + 1))
    for (const section of samplingBatx2gExerciseBank) {
        assert.ok(section.items.some((item) => item.difficulty === 'easy') && section.items.some((item) => item.difficulty === 'hard'), section.id)
        for (const item of section.items) if (item.answer) assert.equal(checkAnswer(typed(item.answer.expected), item.answer.expected, item.answer.form), 'correct', `${item.id}`)
    }
    assert.deepEqual([...new Set(samplingBatx2gChallenges.map((item) => item.points))].sort(), [10, 20, 30])
})

test('laginketa batx2 g: every formula renders in KaTeX', () => {
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

test('laginketa batx2 g: each language in its own place, the same formulas, and Arabic never keeps the decimal comma', () => {
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

test('laginketa batx2 g: Basque glues no case ending to a number', () => {
    for (const text of allTexts()) {
        assert.ok(!/\d[a-zñ]/.test(text.eu.replace(/\$[^$]+\$/g, '')) && !/\$(?:ri|ren|rekin|z|ra|tik|ei|ek|ak|en|ko|an)(?![a-zA-Z])/.test(text.eu), text.eu)
    }
})

test('laginketa batx2 g: every worked equality with numbers is right', () => {
    const texts = [
        ...samplingBatx2gPractice.flatMap((item) => [item.hint.es, item.explanation.es]),
        ...samplingBatx2gChallenges.flatMap((item) => [item.hint.es, item.explanation.es]),
        ...samplingBatx2gExerciseBank.flatMap((section) => section.items.map((item) => item.solution.es)),
        ...samplingBatx2gDiagnostic.flatMap((item) => [item.explanation.es])
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

test('laginketa batx2 g: every answer appears in its worked explanation or solution', () => {
    const shows = (text: string, value: FractionValue) => {
        const decimal = toExactDecimal(value) ?? ''
        const candidates = [`\\frac{${value.numerator}}{${value.denominator}}`, decimal.replace(',', '{,}'), decimal, value.denominator === 1 ? String(value.numerator) : '']
        return candidates.some((candidate) => candidate && text.replace(/\\,/g, '').includes(candidate))
    }
    for (const item of [...samplingBatx2gPractice, ...samplingBatx2gChallenges]) assert.ok(shows(`${item.explanation.es} ${item.hint.es}`, item.expected), `${item.id}: ${written(item.expected)}`)
    for (const item of samplingBatx2gExerciseBank.flatMap((section) => section.items)) if (item.answer) assert.ok(shows(item.solution.es, item.answer.expected), `${item.id}: ${written(item.answer.expected)}`)
})

/* ---------- The values of the unit, recomputed ---------- */

const t = (z: number) => below(z) / 10_000

test('laginketa batx2 g: the normal values and critical values of the lessons and exercises', () => {
    assert.equal(tableValue(1.5), 9332)
    // lessons and examples
    assert.ok(near(1 - t(1), 0.1587) && near(t(2), 0.9772) && near(1 - t(1.5), 0.0668) && near(1 - t(2), 0.0228))
    assert.ok(near(170 - criticalZ(95) * 2, 166.08) && near(0.4 + criticalZ(95) * 0.02, 0.4392) && near(criticalZ(95) * 2, 3.92))
    assert.ok(near(criticalZ(90) * 0.03, 0.04935) && near(t(1), 0.8413))
    // practice and challenges
    assert.ok(near(criticalZ(95) * 3, 5.88) && near(criticalZ(95) * 0.025, 0.049) && near(criticalZ(99) * 2, 5.15) && near(criticalZ(90) * 0.02, 0.0329))
    assert.ok(near(2 * t(2) - 1, 0.9544))
    // bank
    assert.ok(near(t(1.5), 0.9332) && near(2 * t(1) - 1, 0.6826) && near(criticalZ(90) * 5, 8.225) && near(0.5 - criticalZ(95) * 0.05, 0.402))
    assert.ok(near(criticalZ(99) * 0.01, 0.02575) && near(30 - criticalZ(99), 27.425) && near(60 + criticalZ(95), 61.96))
})

test('laginketa batx2 g: the stratified allocations with the largest remainders', () => {
    const allocate = (sizes: number[], n: number) => {
        const total = sizes.reduce((a, b) => a + b, 0)
        const raw = sizes.map((size) => (n * size) / total)
        const base = raw.map(Math.floor)
        const order = raw.map((value, index) => [value - Math.floor(value), index]).sort((a, b) => b[0] - a[0])
        const missing = n - base.reduce((a, b) => a + b, 0)
        for (let k = 0; k < missing; k += 1) base[order[k][1]] += 1
        return base
    }
    assert.deepEqual(allocate([460, 290, 250], 30), [14, 9, 7])
    assert.deepEqual(allocate([420, 350, 230], 40), [17, 14, 9])
    assert.deepEqual(allocate([330, 450, 220], 30), [10, 13, 7])
    assert.deepEqual(allocate([330, 250, 120], 56), [26, 20, 10])
    assert.deepEqual(allocate([360, 240, 200], 40), [18, 12, 10])
})

test('laginketa batx2 g: the lesson examples are worked exercises with an answer', () => {
    for (const [id, entry] of Object.entries(samplingBatx2gLessonTexts)) assert.ok(entry.examplePrompt && entry.exampleAnswer, id)
})
