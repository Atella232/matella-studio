import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { courses } from '../src/data/courses.ts'
import { checkAnswer, hasTerminatingDecimal, toExactDecimal, type FractionValue } from '../src/features/unit-v2/math/fraction.ts'
import { isUnitV2Path } from '../src/features/unit-v2/paths.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { above, below, between, inverseTable } from '../src/pages/batx2-zientziak-banaketak/normal.ts'
import { normalBatx1gChallenges, normalBatx1gDiagnostic, normalBatx1gExerciseBank, normalBatx1gPractice } from '../src/pages/batx1-gizarte-normala/content.ts'
import { normalBatx1gLessonChecks } from '../src/pages/batx1-gizarte-normala/lessonChecks.ts'
import { evaluate, near } from './latex-math.ts'

/* Normala · 1.º Bachillerato Ciencias Sociales: the content of the unit. Five stages (review, continuous
   variable, normal, approximation and fitting); every normal answer comes from the table of normal.ts. */

const counts: Record<string, { practice: number; challenges: number; bank: number }> = {
    review: { practice: 3, challenges: 2, bank: 6 },
    continuous: { practice: 4, challenges: 3, bank: 10 },
    normal: { practice: 7, challenges: 5, bank: 18 },
    approximation: { practice: 3, challenges: 2, bank: 8 },
    fit: { practice: 3, challenges: 3, bank: 8 }
}
const stages = Object.keys(counts)
const topics = Object.keys(normalBatx1gLessonChecks)

const typed = (value: FractionValue) => (hasTerminatingDecimal(value) ? toExactDecimal(value)! : `${value.numerator}/${value.denominator}`)
const asNumber = (value: FractionValue) => value.numerator / value.denominator
const practice = (id: number) => asNumber(normalBatx1gPractice.find((item) => item.id === id)!.expected)
const challenge = (id: number) => asNumber(normalBatx1gChallenges.find((item) => item.id === id)!.expected)
const bank = (id: number) => asNumber(normalBatx1gExerciseBank.flatMap((section) => section.items).find((item) => item.id === id)!.answer!.expected)

const allTexts = (): LocalizedText[] => [
    ...normalBatx1gDiagnostic.flatMap((item) => [item.prompt, item.explanation, ...item.options]),
    ...[...normalBatx1gPractice, ...normalBatx1gChallenges].flatMap((item) => [item.prompt, item.hint, item.explanation]),
    ...normalBatx1gExerciseBank.flatMap((section) => [section.title, ...section.items.flatMap((item) => [item.question, item.solution])])
]

test('normala batx1 g: the unit is active and routed in Ciencias Sociales', () => {
    const course = courses.find((item) => item.id === 'batx1-gizarte')!
    assert.ok(course.topics.find((topic) => topic.id === 'distribucion-normal')!.active)
    assert.ok(isUnitV2Path('/matematika/batx1-gizarte/distribucion-normal'))
    assert.ok(isUnitV2Path('/matematika/batx1-gizarte/distribucion-normal/ariketak'))
})

test('normala batx1 g: diagnostic, practice, challenges and bank are consistent', () => {
    // The unit's block of ids is 140000–140999
    assert.deepEqual(normalBatx1gDiagnostic.map((question) => question.id), [140001, 140002, 140003, 140004, 140005, 140006, 140007, 140008])
    for (const question of normalBatx1gDiagnostic) {
        assert.ok(topics.includes(question.topic), `${question.id}`)
        assert.ok(question.correctIndex < question.options.length)
        assert.equal(new Set(question.options.map((option) => option.es)).size, question.options.length)
    }
    assert.equal(new Set(normalBatx1gDiagnostic.map((question) => question.correctIndex)).size, 3)
    for (const stage of stages) {
        assert.equal(normalBatx1gPractice.filter((item) => item.stage === stage).length, counts[stage].practice, stage)
        assert.equal(normalBatx1gChallenges.filter((item) => item.stage === stage).length, counts[stage].challenges, stage)
        assert.equal(normalBatx1gExerciseBank.find((section) => section.id === stage)!.items.length, counts[stage].bank, stage)
    }
    assert.equal(normalBatx1gPractice.length, 20)
    assert.equal(normalBatx1gChallenges.length, 15)
    for (const item of [...normalBatx1gPractice, ...normalBatx1gChallenges]) {
        assert.ok(stages.includes(item.stage), `${item.id}`)
        assert.equal(checkAnswer(typed(item.expected), item.expected, item.answerForm), 'correct', `${item.id}`)
        for (const language of ['eu', 'es', 'en', 'ar'] as const) assert.ok(item.explanation[language].length > 0 && item.prompt[language].length > 0 && item.hint[language].length > 0, `${item.id} ${language}`)
    }
    assert.deepEqual(normalBatx1gPractice.map((item) => item.id), normalBatx1gPractice.map((_, index) => index + 1))
    assert.deepEqual(normalBatx1gChallenges.map((item) => item.id), normalBatx1gChallenges.map((_, index) => index + 101))
    assert.deepEqual(normalBatx1gExerciseBank.map((section) => section.id), stages)
    const ids = normalBatx1gExerciseBank.flatMap((section) => section.items.map((item) => item.id))
    assert.deepEqual(ids, ids.map((_, index) => index + 1))
    assert.equal(ids.length, 50)
    for (const section of normalBatx1gExerciseBank) {
        assert.ok(section.items.some((item) => item.difficulty === 'easy') && section.items.some((item) => item.difficulty === 'hard'), section.id)
        for (const item of section.items) {
            for (const language of ['eu', 'es', 'en', 'ar'] as const) assert.ok(item.question[language].length > 0 && item.solution[language].length > 0, `${item.id} ${language}`)
            if (item.answer) assert.equal(checkAnswer(typed(item.answer.expected), item.answer.expected, item.answer.form), 'correct', `${item.id}`)
        }
    }
    assert.deepEqual([...new Set(normalBatx1gChallenges.map((item) => item.points))].sort(), [10, 20, 30])
})

test('normala batx1 g: every formula renders in KaTeX', () => {
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

test('normala batx1 g: each language in its own place, the same formulas, and Arabic never keeps the decimal comma', () => {
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
        assert.ok(!/\d,\d/.test(words(text.ar)), `decimal comma in Arabic: ${text.ar}`)
    }
})

test('normala batx1 g: Basque glues no case ending to a number, English writes the euro first', () => {
    for (const text of allTexts()) {
        assert.ok(!/\d[a-zñ]/.test(text.eu.replace(/\$[^$]+\$/g, '')) && !/\$(?:ri|ren|rekin|z|ra|tik|ei|ek|ak|en|ko|an)(?![a-zA-Z])/.test(text.eu), text.eu)
        assert.ok(!/%\s?\d+(?:,\d+)?(?:ek|an|ean|ra|tik|ko|en)\b/.test(text.eu), text.eu)
        assert.ok(!/\d\s*€/.test(text.en.replace(/\$[^$]+\$/g, '')), text.en)
    }
})

test('normala batx1 g: every worked equality with numbers is right', () => {
    const texts = [
        ...normalBatx1gPractice.flatMap((item) => [item.hint.es, item.explanation.es]),
        ...normalBatx1gChallenges.flatMap((item) => [item.hint.es, item.explanation.es]),
        ...normalBatx1gExerciseBank.flatMap((section) => section.items.map((item) => item.solution.es)),
        ...normalBatx1gDiagnostic.flatMap((item) => [item.explanation.es])
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
    assert.ok(checked >= 40, `only ${checked} checked`)
})

test('normala batx1 g: every answer appears in its worked explanation or solution', () => {
    const shows = (text: string, value: FractionValue) => {
        const decimal = toExactDecimal(value) ?? ''
        const candidates = [`\\frac{${value.numerator}}{${value.denominator}}`, decimal.replace(',', '{,}'), decimal, value.denominator === 1 ? String(value.numerator) : '']
        return candidates.some((candidate) => candidate && text.replace(/\\,/g, '').includes(candidate))
    }
    for (const item of [...normalBatx1gPractice, ...normalBatx1gChallenges]) assert.ok(shows(`${item.explanation.es} ${item.hint.es}`, item.expected), `${item.id}`)
    for (const item of normalBatx1gExerciseBank.flatMap((section) => section.items)) if (item.answer) assert.ok(shows(item.solution.es, item.answer.expected), `${item.id}`)
})

test('normala batx1 g: the normal answers are the values of the table', () => {
    const t = (tenThousandths: number) => tenThousandths / 10_000
    // Practice
    assert.ok(near(practice(9), t((10_000 - between(-1, 1)) / 2)))
    assert.ok(near(practice(10), t(below(1.6))))
    assert.ok(near(practice(11), t(above(0.4))))
    assert.ok(near(practice(12), t(between(-1, 2))))
    assert.ok(near(practice(13), t(below((870 - 800) / 50))))
    assert.equal(inverseTable(below(1.75)), practice(14))
    assert.ok(near(practice(17), t(below((55.5 - 50) / 5))))
    assert.ok(near(practice(19), 200 * t(between(0, 1))))
    // Challenges
    assert.ok(near(challenge(107), t(between(-2.5, -0.5))))
    assert.ok(near(challenge(108), 100 * t(between(-1.25, 1.25))))
    assert.equal(inverseTable(7500), 0.67)
    assert.ok(near(challenge(109), 1800 + 0.67 * 300))
    assert.equal(below(-2), 228)
    assert.ok(near(challenge(111), t(below((190.5 - 200) / 10))))
    assert.ok(near(challenge(112), t(above((59.5 - 50) / 5))))
    assert.ok(near(challenge(114), 400 * t(above(1))))
    assert.ok(near(challenge(115), 41 - 100 * t(between(-1, 0))))
    // Bank
    assert.ok(near(bank(25), t(above((68 - 60) / 5))))
    assert.ok(near(bank(26), t(below((95 - 110) / 10))))
    assert.ok(near(bank(27), 100 * t(between((160 - 168) / 8, (180 - 168) / 8))))
    assert.equal(inverseTable(9000), 1.28)
    assert.ok(near(bank(30), 5.5 + 1.28 * 2))
    assert.ok(near(bank(31), 12 + 0.67 * 3))
    assert.ok(near(bank(40), t(below((140.5 - 125) / 10))))
    assert.ok(near(bank(41), t(between(-1.1, 1.1))))
    assert.ok(near(bank(47), 80 * t(between(-1, 0))))
})

test('normala batx1 g: the fit of the 80 heights accepts N(170; 10) with the 5 % rule', () => {
    const marks = [155, 165, 175, 185]
    const counts = [15, 25, 25, 15]
    const total = counts.reduce((sum, value) => sum + value, 0)
    const mean = marks.reduce((sum, mark, index) => sum + mark * counts[index], 0) / total
    const variance = marks.reduce((sum, mark, index) => sum + (mark - mean) ** 2 * counts[index], 0) / total
    assert.equal(mean, 170)
    assert.equal(variance, 100)
    const expected = [below(-1), between(-1, 0), between(0, 1), above(1)].map((value) => (total * value) / 10_000)
    assert.ok(near(expected.reduce((sum, value) => sum + value, 0), 80))
    const largest = Math.max(...expected.map((value, index) => Math.abs(value - counts[index])))
    assert.ok(near(largest, 2.304) && largest / total < 0.05)
})
