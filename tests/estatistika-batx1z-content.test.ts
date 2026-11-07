import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { courses } from '../src/data/courses.ts'
import { checkAnswer, hasTerminatingDecimal, toExactDecimal, type FractionValue } from '../src/features/unit-v2/math/fraction.ts'
import { isUnitV2Path } from '../src/features/unit-v2/paths.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { readStatisticsAnswer } from '../src/pages/dbh2-estatistika-v2/answers.ts'
import { bachStatsChallenges, bachStatsDiagnostic, bachStatsExerciseBank, bachStatsPractice } from '../src/pages/batx1-zientziak-estatistika/content.ts'
import { bachStatsLessonChecks } from '../src/pages/batx1-zientziak-estatistika/lessonChecks.ts'
import { bachStatsLessonTexts } from '../src/pages/batx1-zientziak-estatistika/lessonTexts.ts'
import { evaluate, near } from './latex-math.ts'

const stages = ['data', 'centre', 'position', 'spread', 'interpretation']
const topics = Object.keys(bachStatsLessonChecks)

const typed = (value: FractionValue, form?: string) => (hasTerminatingDecimal(value) && (form !== 'simplified' || value.denominator === 1) ? toExactDecimal(value)! : `${value.numerator}/${value.denominator}`)
const written = (value: FractionValue) => (hasTerminatingDecimal(value) ? toExactDecimal(value)!.replace(',', '{,}') : `\\frac{${Math.abs(value.numerator)}}{${value.denominator}}`)

const allTexts = (): LocalizedText[] => [
    ...bachStatsDiagnostic.flatMap((item) => [item.prompt, item.explanation, ...item.options]),
    ...[...bachStatsPractice, ...bachStatsChallenges].flatMap((item) => [item.prompt, item.hint, item.explanation]),
    ...bachStatsExerciseBank.flatMap((section) => [section.title, ...section.items.flatMap((item) => [item.question, item.solution])])
]

/* ---------- A small statistics kit to recompute the numbers of the unit ---------- */

/** Data from a table of values and frequencies */
const expand = (rows: Array<[number, number]>) => rows.flatMap(([value, count]) => Array.from({ length: count }, () => value))
const mean = (data: number[]) => data.reduce((sum, value) => sum + value, 0) / data.length
const variance = (data: number[]) => mean(data.map((value) => value * value)) - mean(data) ** 2
/** The rule of the web (and of 4. DBH): position N·k/100; not whole → the next datum; whole → the mean of that datum and the next */
const webPercentile = (data: number[], k: number) => {
    const sorted = [...data].sort((a, b) => a - b)
    const position = (sorted.length * k) / 100
    return Number.isInteger(position) ? (sorted[position - 1] + sorted[position]) / 2 : sorted[Math.ceil(position) - 1]
}
/** The rule of the textbook: the first value whose cumulative frequency goes past N·k/100 */
const bookPercentile = (data: number[], k: number) => {
    const sorted = [...data].sort((a, b) => a - b)
    const position = (sorted.length * k) / 100
    return sorted[Math.floor(position)]
}

test('estatistika batx1 z: the unit is active and routed', () => {
    const course = courses.find((item) => item.id === 'batx1-zientziak')!
    assert.ok(course.topics.find((topic) => topic.id === 'estadistica')!.active)
    assert.ok(isUnitV2Path('/matematika/batx1-zientziak/estadistica'))
    assert.ok(isUnitV2Path('/matematika/batx1-zientziak/estadistica/ariketak'))
    // Only Ciencias for now: the Sociales topic of the same name stays as it was
    const social = courses.find((item) => item.id === 'batx1-gizarte')
    if (social) assert.ok(!social.topics.find((topic) => topic.id === 'estadistica')?.active)
})

test('estatistika batx1 z: diagnostic, practice, challenges and bank are consistent', () => {
    assert.equal(bachStatsDiagnostic.length, 8)
    // The unit's block of ids is 114000–114999
    assert.deepEqual(bachStatsDiagnostic.map((question) => question.id), [114001, 114002, 114003, 114004, 114005, 114006, 114007, 114008])
    for (const question of bachStatsDiagnostic) {
        assert.ok(topics.includes(question.topic), `${question.id}`)
        assert.ok(question.correctIndex < question.options.length)
        assert.equal(new Set(question.options.map((option) => option.es)).size, question.options.length)
    }
    assert.ok(new Set(bachStatsDiagnostic.map((question) => question.correctIndex)).size === 3)
    for (const stage of stages) {
        assert.equal(bachStatsPractice.filter((item) => item.stage === stage).length, 4, stage)
        assert.equal(bachStatsChallenges.filter((item) => item.stage === stage).length, 3, stage)
    }
    for (const item of [...bachStatsPractice, ...bachStatsChallenges]) {
        assert.ok(stages.includes(item.stage), `${item.id}`)
        assert.equal(checkAnswer(typed(item.expected, item.answerForm), item.expected, item.answerForm), 'correct', `${item.id}`)
        for (const language of ['eu', 'es', 'en', 'ar'] as const) assert.ok(item.explanation[language].length > 0 && item.prompt[language].length > 0 && item.hint[language].length > 0, `${item.id} ${language}`)
    }
    assert.deepEqual(bachStatsPractice.map((item) => item.id), bachStatsPractice.map((_, index) => index + 1))
    assert.deepEqual(bachStatsExerciseBank.map((section) => section.id), stages)
    const ids = bachStatsExerciseBank.flatMap((section) => section.items.map((item) => item.id))
    assert.deepEqual(ids, ids.map((_, index) => index + 1))
    assert.equal(ids.length, 50)
    for (const section of bachStatsExerciseBank) {
        assert.ok(section.items.some((item) => item.difficulty === 'easy') && section.items.some((item) => item.difficulty === 'hard'), section.id)
        for (const item of section.items) {
            for (const language of ['eu', 'es', 'en', 'ar'] as const) assert.ok(item.question[language].length > 0 && item.solution[language].length > 0, `${item.id} ${language}`)
            if (item.answer) assert.equal(checkAnswer(typed(item.answer.expected, item.answer.form), item.answer.expected, item.answer.form), 'correct', `${item.id}`)
        }
    }
    assert.equal(new Set(bachStatsChallenges.map((item) => item.id)).size, bachStatsChallenges.length)
    assert.deepEqual([...new Set(bachStatsChallenges.map((item) => item.points))].sort(), [10, 20, 30])
})

test('estatistika batx1 z: answers with a percent sign, a comma or a point are read', () => {
    assert.equal(checkAnswer(readStatisticsAnswer('35 %'), { numerator: 35, denominator: 1 }), 'correct')
    assert.equal(checkAnswer(readStatisticsAnswer('0.15'), { numerator: 3, denominator: 20 }), 'correct')
    assert.equal(checkAnswer(readStatisticsAnswer('0,15'), { numerator: 3, denominator: 20 }), 'correct')
})

test('estatistika batx1 z: every formula renders in KaTeX', () => {
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

test('estatistika batx1 z: each language in its own place, and Arabic never keeps the decimal comma', () => {
    for (const text of allTexts()) {
        assert.ok(!text.ar.includes('{,}'), text.ar)
        const words = (value: string) => value.replace(/\$[^$]+\$/g, ' ')
        if (/[a-zA-Z]{4}/.test(words(text.es))) assert.ok(/[؀-ۿ]/.test(words(text.ar)), `not Arabic: ${text.ar}`)
        for (const language of ['eu', 'es', 'en'] as const) assert.ok(!/[؀-ۿ]/.test(text[language]), `Arabic in ${language}: ${text[language]}`)
        if (/[a-zA-Z]{6}/.test(words(text.es))) assert.ok(text.eu !== text.es && text.en !== text.es, `copied from Spanish: ${text.es}`)
        // Decimals in the words: a comma in Basque and Spanish, a point in English and Arabic
        assert.ok(!/\d\.\d/.test(words(text.es)) && !/\d\.\d/.test(words(text.eu)), `decimal point: ${text.es}`)
        assert.ok(!/\d,\d/.test(words(text.en)) || /\d,\d{3}/.test(words(text.en)), `decimal comma in English: ${text.en}`)
    }
})

test('estatistika batx1 z: Basque glues no case ending to a number, English writes the euro first', () => {
    for (const text of allTexts()) {
        assert.ok(!/\d[a-zñ]/.test(text.eu.replace(/\$[^$]+\$/g, '')) && !/\$(?:ri|ren|rekin|z|ra|tik|ei|ek|ak|en|ko|an)(?![a-zA-Z])/.test(text.eu), text.eu)
        assert.ok(!/\d\s*€/.test(text.en.replace(/\$[^$]+\$/g, '')), text.en)
    }
})

test('estatistika batx1 z: every worked equality with numbers is right', () => {
    const texts = [
        ...bachStatsPractice.flatMap((item) => [item.hint.es, item.explanation.es]),
        ...bachStatsChallenges.flatMap((item) => [item.hint.es, item.explanation.es]),
        ...bachStatsExerciseBank.flatMap((section) => section.items.map((item) => item.solution.es)),
        ...bachStatsDiagnostic.flatMap((item) => [item.explanation.es])
    ]
    let checked = 0
    for (const text of texts) {
        for (const [, formula] of text.matchAll(/\$([^$]+)\$/g)) {
            for (const part of formula.split(/\\qquad|\\quad|\\ \\to\\ |\\to|,\\ /)) {
                const values = part.split(/\\le|\\ge|\\neq|<|>|\\approx/)[0].split('=').map((side) => evaluate(side)).filter((value): value is number => value !== null)
                if (values.length < 2) continue
                assert.ok(values.every((value) => near(value, values[0])), `${part} → ${values.join(' / ')}`)
                checked += 1
            }
        }
    }
    assert.ok(checked >= 40, `only ${checked} checked`)
})

test('estatistika batx1 z: every answer appears in its worked explanation or solution', () => {
    const shows = (text: string, value: FractionValue) => {
        const plain = written(value)
        const words = toExactDecimal(value) ?? ''
        return [plain, value.numerator < 0 ? `-${plain}` : plain, words].some((candidate) => candidate && text.replace(/\\,/g, '').includes(candidate))
    }
    for (const item of [...bachStatsPractice, ...bachStatsChallenges]) assert.ok(shows(`${item.explanation.es} ${item.hint.es}`, item.expected), `${item.id}: ${written(item.expected)}`)
    for (const item of bachStatsExerciseBank.flatMap((section) => section.items)) if (item.answer) assert.ok(shows(item.solution.es, item.answer.expected), `${item.id}: ${written(item.answer.expected)}`)
})

test('estatistika batx1 z: the tables of the lessons give the numbers the lessons write', () => {
    const goals = expand([[0, 4], [1, 7], [2, 5], [3, 3], [4, 1]])
    assert.equal(mean(goals), 1.5)
    assert.equal(webPercentile(goals, 50), 1)
    const siblings = expand([[0, 2], [1, 5], [2, 2], [3, 1]])
    assert.ok(near(mean(siblings), 1.2))
    assert.ok(near(mean(siblings.map((value) => Math.abs(value - 1.2))), 0.68))
    const table = expand([[1, 3], [2, 4], [3, 2], [4, 1]])
    assert.ok(near(mean(table), 2.1))
    assert.ok(near(variance(table), 0.89))
    assert.ok(Math.abs(Math.sqrt(variance(table)) - 0.94) < 0.005)
    const missing = expand([[1, 3], [2, 6], [3, 7], [4, 4]])
    assert.equal(missing.length, 20)
    assert.ok(near(mean(missing), 2.6))
    const ages = expand([[25, 8], [35, 14], [45, 12], [55, 6]])
    assert.equal(mean(ages), 39)
    // «Another example» answers
    assert.ok(near(variance([1, 3, 5]), 8 / 3))
    assert.ok(Math.abs(Math.sqrt(8 / 3) - 1.63) < 0.005)
    assert.ok(near(mean([3, 8, 5, 6, 9, 5]), 6) && webPercentile([3, 8, 5, 6, 9, 5], 50) === 5.5)
})

test('estatistika batx1 z: every percentile asked gives the same datum with the web rule and with the textbook rule', () => {
    // The web takes the mean of two data when N·k/100 is whole; the textbook takes the next datum.
    // The unit only asks for whole positions where both give the same value.
    const cases: Array<{ where: string; data: number[]; k: number; expected: number }> = [
        { where: 'lesson Q1', data: expand([[0, 9], [1, 8], [2, 6], [3, 4], [4, 3]]), k: 25, expected: 0 },
        { where: 'lesson Q3', data: expand([[0, 9], [1, 8], [2, 6], [3, 4], [4, 3]]), k: 75, expected: 2 },
        { where: 'lesson P85', data: expand([[0, 9], [1, 8], [2, 6], [3, 4], [4, 3]]), k: 85, expected: 3 },
        { where: 'example P30', data: expand([[1, 3], [2, 5], [3, 6], [4, 4], [5, 2]]), k: 30, expected: 2 },
        { where: 'practice 9', data: expand([[1, 4], [2, 7], [3, 7], [4, 4]]), k: 25, expected: 2 },
        { where: 'practice 10', data: expand([[1, 4], [2, 7], [3, 7], [4, 4]]), k: 90, expected: 4 },
        { where: 'challenge 109', data: expand([[10, 7], [20, 9], [30, 6], [40, 3]]), k: 70, expected: 30 },
        { where: 'bank 15', data: expand([[1, 2], [2, 5], [3, 6], [4, 7]]), k: 50, expected: 3 },
        { where: 'bank 25', data: expand([[0, 6], [1, 9], [2, 8], [3, 3]]), k: 40, expected: 1 },
        { where: 'bank 28', data: expand([[1, 8], [2, 12], [3, 15], [4, 10], [5, 5]]), k: 75, expected: 4 },
        { where: 'bank 30', data: [1, 2, 2, 2, 2, 3, 4, 5], k: 25, expected: 2 }
    ]
    for (const item of cases) {
        assert.equal(webPercentile(item.data, item.k), item.expected, `${item.where}: web rule`)
        assert.equal(bookPercentile(item.data, item.k), item.expected, `${item.where}: textbook rule`)
    }
})

test('estatistika batx1 z: the wrong answers of «Check it» really are wrong and the right ones right', () => {
    assert.equal(webPercentile([4, 1, 7, 3, 9, 6], 50), 5)
    assert.equal(Math.max(7, 3, 12, 9) - Math.min(7, 3, 12, 9), 9)
    assert.equal(mean([2, 6, 7, 5]), 5)
    assert.equal((4 * 5 + 6 * 15) / 10, 11)
    // Outliers: only 135 is outside 100 ± 3·10
    for (const [value, outside] of [[125, false], [135, true], [71, false]] as const) assert.equal(Math.abs(value - 100) > 30, outside, `${value}`)
    // Box: 21 is past 10 + 1,5·6 = 19
    assert.ok(21 > 10 + 1.5 * 6)
})

test('estatistika batx1 z: the lesson examples are worked exercises with an answer', () => {
    for (const [id, entry] of Object.entries(bachStatsLessonTexts)) {
        assert.ok(entry.examplePrompt && entry.exampleAnswer, id)
    }
})
