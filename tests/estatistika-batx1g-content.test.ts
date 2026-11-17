import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { courses } from '../src/data/courses.ts'
import { checkAnswer, hasTerminatingDecimal, toExactDecimal, type FractionValue } from '../src/features/unit-v2/math/fraction.ts'
import { isUnitV2Path } from '../src/features/unit-v2/paths.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { socialStatsChallenges, socialStatsDiagnostic, socialStatsExerciseBank, socialStatsPractice } from '../src/pages/batx1-gizarte-estatistika/content.ts'
import { BAND, OGIVE, SHARE, SPREAD, UNEQUAL } from '../src/pages/batx1-gizarte-estatistika/data.ts'
import { quartilesExplanation } from '../src/pages/batx1-gizarte-estatistika/borrowed.ts'
import { socialStatsLessonChecks } from '../src/pages/batx1-gizarte-estatistika/lessonChecks.ts'
import { socialStatsLessonTexts } from '../src/pages/batx1-gizarte-estatistika/lessonTexts.ts'
import { bachStatsLessonChecks } from '../src/pages/batx1-zientziak-estatistika/lessonChecks.ts'
import { bachStatsLessonTexts } from '../src/pages/batx1-zientziak-estatistika/lessonTexts.ts'
import { evaluate, near } from './latex-math.ts'

const stages = ['data', 'centre', 'position', 'spread', 'interpretation']
/** The lessons borrowed from 1.º Ciencias, in lessons.tsx */
const borrowed = ['population-sample', 'frequency-tables', 'class-intervals', 'centre-measures', 'grouped-centre', 'quartiles-percentiles', 'box-plot', 'variance-sd', 'coefficient-variation']
const topics = [...borrowed, ...Object.keys(socialStatsLessonChecks)]

const typed = (value: FractionValue, form?: string) => (hasTerminatingDecimal(value) && (form !== 'simplified' || value.denominator === 1) ? toExactDecimal(value)! : `${value.numerator}/${value.denominator}`)
const written = (value: FractionValue) => (hasTerminatingDecimal(value) ? toExactDecimal(value)!.replace(',', '{,}') : `\\frac{${Math.abs(value.numerator)}}{${value.denominator}}`)

const allTexts = (): LocalizedText[] => [
    ...socialStatsDiagnostic.flatMap((item) => [item.prompt, item.explanation, ...item.options]),
    ...[...socialStatsPractice, ...socialStatsChallenges].flatMap((item) => [item.prompt, item.hint, item.explanation]),
    ...socialStatsExerciseBank.flatMap((section) => [section.title, ...section.items.flatMap((item) => [item.question, item.solution])]),
    quartilesExplanation
]

/* ---------- A small statistics kit to recompute the numbers of the unit ---------- */

const expand = (rows: Array<[number, number]>) => rows.flatMap(([value, count]) => Array.from({ length: count }, () => value))
const mean = (data: number[]) => data.reduce((sum, value) => sum + value, 0) / data.length
const variance = (data: number[]) => mean(data.map((value) => value * value)) - mean(data) ** 2
const webPercentile = (data: number[], k: number) => {
    const sorted = [...data].sort((a, b) => a - b)
    const position = (sorted.length * k) / 100
    return Number.isInteger(position) ? (sorted[position - 1] + sorted[position]) / 2 : sorted[Math.ceil(position) - 1]
}
const bookPercentile = (data: number[], k: number) => {
    const sorted = [...data].sort((a, b) => a - b)
    return sorted[Math.floor((sorted.length * k) / 100)]
}
type Bar = { from: number; to: number; count: number }
/** The percentile k of grouped data, interpolating on the cumulative percentage polygon */
const interpolate = (bars: Bar[], k: number) => {
    const total = bars.reduce((sum, bar) => sum + bar.count, 0)
    let before = 0
    for (const bar of bars) {
        const share = (bar.count / total) * 100
        if (before + share >= k) return bar.from + ((k - before) / share) * (bar.to - bar.from)
        before += share
    }
    return bars.at(-1)!.to
}
/** The cumulative percentage below a value, on the same polygon */
const percentileOf = (bars: Bar[], x: number) => {
    const total = bars.reduce((sum, bar) => sum + bar.count, 0)
    let below = 0
    for (const bar of bars) {
        if (x >= bar.to) below += bar.count
        else if (x > bar.from) below += (bar.count * (x - bar.from)) / (bar.to - bar.from)
    }
    return (below / total) * 100
}
/** How many data lie between two values, the intervals at the ends split in proportion */
const between = (bars: Bar[], low: number, high: number) => bars.reduce((sum, bar) => sum + (bar.count * Math.max(0, Math.min(bar.to, high) - Math.max(bar.from, low))) / (bar.to - bar.from), 0)
const bars = (rows: Array<[number, number, number]>): Bar[] => rows.map(([from, to, count]) => ({ from, to, count }))

test('estatistika batx1 g: the unit is active and routed', () => {
    const course = courses.find((item) => item.id === 'batx1-gizarte')!
    assert.ok(course.topics.find((topic) => topic.id === 'estadistica')!.active)
    assert.ok(isUnitV2Path('/matematika/batx1-gizarte/estadistica'))
    assert.ok(isUnitV2Path('/matematika/batx1-gizarte/estadistica/ariketak'))
})

test('estatistika batx1 g: the borrowed lessons exist in 1.º Ciencias and the new ones are not there', () => {
    for (const id of borrowed) assert.ok(id in bachStatsLessonChecks, id)
    for (const id of Object.keys(socialStatsLessonChecks)) assert.ok(!(id in bachStatsLessonChecks), id)
    assert.deepEqual(Object.keys(socialStatsLessonTexts).sort(), Object.keys(socialStatsLessonChecks).sort())
    // «Quartiles and percentiles» no longer says that grouped data give the class mark
    const original = bachStatsLessonTexts['quartiles-percentiles'].explanation
    for (const language of ['eu', 'es', 'en', 'ar'] as const) {
        assert.notEqual(quartilesExplanation[language], original[language], language)
        assert.ok(!/marca|marka|class mark|مركز الفئة/.test(quartilesExplanation[language]), language)
    }
})

test('estatistika batx1 g: diagnostic, practice, challenges and bank are consistent', () => {
    assert.equal(socialStatsDiagnostic.length, 8)
    // The unit's block of ids is 137000–137999
    assert.deepEqual(socialStatsDiagnostic.map((question) => question.id), [137001, 137002, 137003, 137004, 137005, 137006, 137007, 137008])
    for (const question of socialStatsDiagnostic) {
        assert.ok(topics.includes(question.topic), `${question.id}`)
        assert.ok(question.correctIndex < question.options.length)
        assert.equal(new Set(question.options.map((option) => option.es)).size, question.options.length)
    }
    assert.ok(new Set(socialStatsDiagnostic.map((question) => question.correctIndex)).size === 3)
    for (const stage of stages) {
        assert.equal(socialStatsPractice.filter((item) => item.stage === stage).length, 4, stage)
        assert.equal(socialStatsChallenges.filter((item) => item.stage === stage).length, 3, stage)
    }
    for (const item of [...socialStatsPractice, ...socialStatsChallenges]) {
        assert.ok(stages.includes(item.stage), `${item.id}`)
        assert.equal(checkAnswer(typed(item.expected, item.answerForm), item.expected, item.answerForm), 'correct', `${item.id}`)
        for (const language of ['eu', 'es', 'en', 'ar'] as const) assert.ok(item.explanation[language].length > 0 && item.prompt[language].length > 0 && item.hint[language].length > 0, `${item.id} ${language}`)
    }
    assert.deepEqual(socialStatsPractice.map((item) => item.id), socialStatsPractice.map((_, index) => index + 1))
    assert.deepEqual(socialStatsExerciseBank.map((section) => section.id), stages)
    const ids = socialStatsExerciseBank.flatMap((section) => section.items.map((item) => item.id))
    assert.deepEqual(ids, ids.map((_, index) => index + 1))
    assert.equal(ids.length, 50)
    for (const section of socialStatsExerciseBank) {
        assert.equal(section.items.length, 10, section.id)
        assert.ok(section.items.some((item) => item.difficulty === 'easy') && section.items.some((item) => item.difficulty === 'hard'), section.id)
        for (const item of section.items) {
            for (const language of ['eu', 'es', 'en', 'ar'] as const) assert.ok(item.question[language].length > 0 && item.solution[language].length > 0, `${item.id} ${language}`)
            if (item.answer) assert.equal(checkAnswer(typed(item.answer.expected, item.answer.form), item.answer.expected, item.answer.form), 'correct', `${item.id}`)
        }
    }
    assert.deepEqual(socialStatsChallenges.map((item) => item.id), Array.from({ length: 15 }, (_, index) => 101 + index))
    assert.deepEqual([...new Set(socialStatsChallenges.map((item) => item.points))].sort(), [10, 20, 30])
})

test('estatistika batx1 g: every formula renders in KaTeX', () => {
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

test('estatistika batx1 g: each language in its own place, and Arabic never keeps the decimal comma', () => {
    for (const text of allTexts()) {
        assert.ok(!text.ar.includes('{,}'), text.ar)
        const words = (value: string) => value.replace(/\$[^$]+\$/g, ' ')
        if (/[a-zA-Z]{4}/.test(words(text.es))) assert.ok(/[؀-ۿ]/.test(words(text.ar)), `not Arabic: ${text.ar}`)
        for (const language of ['eu', 'es', 'en'] as const) assert.ok(!/[؀-ۿ]/.test(text[language]), `Arabic in ${language}: ${text[language]}`)
        if (/[a-zA-Z]{6}/.test(words(text.es))) assert.ok(text.eu !== text.es && text.en !== text.es, `copied from Spanish: ${text.es}`)
        assert.ok(!/\d\.\d/.test(words(text.es)) && !/\d\.\d/.test(words(text.eu)), `decimal point: ${text.es}`)
        assert.ok(!/\d,\d/.test(words(text.en)) || /\d,\d{3}/.test(words(text.en)), `decimal comma in English: ${text.en}`)
        // Thousands: 3,000 in English; four digits together and a space from five in the others
        assert.ok(!/(?<![\d.,])\d{4,}(?![\d])/.test(words(text.en)), `group the thousands in English: ${text.en}`)
        for (const language of ['eu', 'es', 'ar'] as const) assert.ok(!/(?<![\d.,\u00a0 ])\d{5,}/.test(words(text[language])), `group the thousands in ${language}`)
    }
})

test('estatistika batx1 g: Basque glues no case ending to a number, English writes the euro first', () => {
    for (const text of allTexts()) {
        assert.ok(!/\d[a-zñ]/.test(text.eu.replace(/\$[^$]+\$/g, '')) && !/\$(?:ri|ren|rekin|z|ra|tik|ei|ek|ak|en|ko|an)(?![a-zA-Z])/.test(text.eu), text.eu)
        assert.ok(!/\d\s*€/.test(text.en.replace(/\$[^$]+\$/g, '')), text.en)
    }
})

test('estatistika batx1 g: every worked equality with numbers is right', () => {
    const texts = [
        ...socialStatsPractice.flatMap((item) => [item.hint.es, item.explanation.es]),
        ...socialStatsChallenges.flatMap((item) => [item.hint.es, item.explanation.es]),
        ...socialStatsExerciseBank.flatMap((section) => section.items.map((item) => item.solution.es)),
        ...socialStatsDiagnostic.flatMap((item) => [item.explanation.es])
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
    assert.ok(checked >= 60, `only ${checked} checked`)
})

test('estatistika batx1 g: every answer appears in its worked explanation or solution', () => {
    const shows = (text: string, value: FractionValue) => {
        const plain = written(value)
        const words = toExactDecimal(value) ?? ''
        return [plain, value.numerator < 0 ? `-${plain}` : plain, words].some((candidate) => candidate && text.replace(/\\,/g, '').includes(candidate))
    }
    // A percentage worked out as a part (0,15 → 15 %) also counts
    const showsPart = (text: string, value: FractionValue) => shows(text, value) || shows(text, { numerator: value.numerator, denominator: value.denominator * 100 })
    for (const item of [...socialStatsPractice, ...socialStatsChallenges]) assert.ok(showsPart(`${item.explanation.es} ${item.hint.es}`, item.expected), `${item.id}: ${written(item.expected)}`)
    for (const item of socialStatsExerciseBank.flatMap((section) => section.items)) if (item.answer) assert.ok(showsPart(item.solution.es, item.answer.expected), `${item.id}: ${written(item.answer.expected)}`)
})

test('estatistika batx1 g: each figure draws the numbers of its lesson', () => {
    // Different widths: heights 12, 18, 10 and 2,5
    assert.deepEqual(UNEQUAL.map((bar) => bar.count / (bar.to - bar.from)), [12, 18, 10, 2.5])
    assert.equal(UNEQUAL.reduce((sum, bar) => sum + bar.count, 0), 60)
    // The 200 customers: the polygon, Q1, Me and the percentile of 45
    const total = OGIVE.bars.reduce((sum, bar) => sum + bar.count, 0)
    assert.equal(total, 200)
    let running = 0
    assert.deepEqual(OGIVE.points, [[20, 0], ...OGIVE.bars.map((bar) => [bar.to, ((running += bar.count) / total) * 100])])
    assert.ok(near(interpolate(OGIVE.bars, 25), OGIVE.q1) && OGIVE.q1 === 35)
    assert.ok(near(interpolate(OGIVE.bars, 50), OGIVE.median) && OGIVE.median === 42.5)
    assert.ok(near(percentileOf(OGIVE.bars, OGIVE.value), OGIVE.valuePercent) && OGIVE.valuePercent === 60)
    assert.ok(near(((100 - OGIVE.valuePercent) / 100) * total, 80))
    // Same mean, spread A < B < C
    for (const chart of SPREAD) {
        const data = expand(chart.counts.map((count, index) => [index + 1, count]))
        assert.equal(data.length, 10)
        assert.ok(near(mean(data), 3), chart.name)
        assert.ok(near(variance(data), chart.variance), chart.name)
    }
    // The faulty parts: 365 acceptable of 500, 27 % faulty
    const accepted = between(SHARE.bars, ...SHARE.accepted)
    assert.ok(near(accepted, 365))
    assert.ok(near(((500 - accepted) / 500) * 100, 27))
    // The band: x̄ = 20, σ = 7 and 61,6 % inside
    const waits = expand(BAND.bars.map((bar) => [(bar.from + bar.to) / 2, bar.count]))
    assert.equal(mean(waits), BAND.mean)
    assert.ok(near(Math.sqrt(variance(waits)), BAND.sd))
    assert.ok(near((between(BAND.bars, BAND.mean - BAND.sd, BAND.mean + BAND.sd) / 50) * 100, 61.6))
})

test('estatistika batx1 g: the interpolations and splits of the exercises are exact', () => {
    // Lessons' examples
    assert.ok(near(interpolate(bars([[6, 10, 5], [10, 14, 15], [14, 18, 5]]), 35), 11))
    assert.ok(near(between(bars([[10, 16, 30], [16, 22, 60]]), 13, 19), 45))
    // Practice, challenges and bank
    assert.ok(near(interpolate(bars([[0, 10, 20], [10, 20, 35], [20, 30, 40], [30, 40, 5]]), 75), 25))
    assert.ok(near(interpolate(bars([[0, 5, 10], [5, 10, 30], [10, 15, 40], [15, 20, 20]]), 60), 12.5))
    assert.ok(near(between(bars([[18, 20, 60], [20, 22, 420], [22, 24, 120]]), 19, 23), 510))
    assert.ok(near(between(bars([[8, 10, 30], [10, 12, 180], [12, 14, 40]]), 9, 13), 215))
    assert.ok(near(between(bars([[0, 8, 40], [8, 16, 24]]), 4, 10), 26))
    // Challenge 115: the table gives x̄ = 20 and σ = 9, and 64,8 % in the band
    const service = bars([[0, 10, 7], [10, 20, 18], [20, 30, 18], [30, 40, 7]])
    const marks = expand(service.map((bar) => [(bar.from + bar.to) / 2, bar.count]))
    assert.equal(mean(marks), 20)
    assert.ok(near(Math.sqrt(variance(marks)), 9))
    assert.ok(near((between(service, 11, 29) / 50) * 100, 64.8))
    // Bank 36: σ = 5
    assert.ok(near(Math.sqrt(variance(expand([[10, 2], [20, 12], [30, 2]]))), 5))
    // Missing frequencies: example, challenge 106 and bank 19
    assert.ok(near(mean(expand([[1, 3], [2, 6], [3, 7], [4, 4]])), 2.6))
    assert.ok(near(mean(expand([[0, 4], [1, 5], [2, 6], [3, 5]])), 1.6))
    assert.ok(near(mean(expand([[1, 2], [2, 6], [3, 6], [4, 2]])), 2.5))
})

test('estatistika batx1 g: every percentile of raw data gives the same datum with the web rule and with the textbook rule', () => {
    const cases: Array<{ where: string; data: number[]; k: number; expected: number }> = [
        { where: 'practice 9', data: [2, 3, 5, 6, 8, 9, 11, 12, 14, 15], k: 25, expected: 5 },
        { where: 'bank 24', data: [4, 6, 7, 9, 10, 12, 13, 15, 18, 20], k: 35, expected: 9 }
    ]
    for (const item of cases) {
        assert.equal(webPercentile(item.data, item.k), item.expected, `${item.where}: web rule`)
        assert.equal(bookPercentile(item.data, item.k), item.expected, `${item.where}: textbook rule`)
    }
    // Medians with N even use the mean of the two middle data in both rules
    assert.equal(webPercentile([2, 3, 3, 4, 5, 6, 6, 7, 8, 8, 9, 10, 11, 12], 50), 6.5)
    assert.equal(webPercentile([3, 5, 6, 8, 9, 10, 12, 15], 50), 8.5)
})

test('estatistika batx1 g: the lesson examples are worked exercises with an answer', () => {
    for (const [id, entry] of Object.entries(socialStatsLessonTexts)) assert.ok(entry.examplePrompt && entry.exampleAnswer, id)
})
