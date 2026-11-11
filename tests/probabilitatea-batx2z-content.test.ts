import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { courses } from '../src/data/courses.ts'
import { checkAnswer, hasTerminatingDecimal, toExactDecimal, type FractionValue } from '../src/features/unit-v2/math/fraction.ts'
import { isUnitV2Path } from '../src/features/unit-v2/paths.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { readStatisticsAnswer } from '../src/pages/dbh2-estatistika-v2/answers.ts'
import { probabilityBatx2Challenges, probabilityBatx2Diagnostic, probabilityBatx2ExerciseBank, probabilityBatx2Practice } from '../src/pages/batx2-zientziak-probabilitatea/content.ts'
import { probabilityBatx2LessonChecks } from '../src/pages/batx2-zientziak-probabilitatea/lessonChecks.ts'
import { probabilityBatx2LessonTexts } from '../src/pages/batx2-zientziak-probabilitatea/lessonTexts.ts'
import { evaluate, near } from './latex-math.ts'

/* Probabilitatea · 2.º Bachillerato Ciencias: the content of the unit. The review of 4. DBH is short (2
   practice items, 3 challenges, 8 exercises); the three new stages carry the rest. */

const counts: Record<string, { practice: number; challenges: number; bank: number }> = {
    review: { practice: 2, challenges: 3, bank: 8 },
    events: { practice: 6, challenges: 4, bank: 14 },
    conditional: { practice: 6, challenges: 4, bank: 14 },
    bayes: { practice: 6, challenges: 4, bank: 14 }
}
const stages = Object.keys(counts)
const topics = Object.keys(probabilityBatx2LessonChecks)

const typed = (value: FractionValue) => (hasTerminatingDecimal(value) ? toExactDecimal(value)! : `${value.numerator}/${value.denominator}`)
const written = (value: FractionValue) => `${value.numerator}/${value.denominator}`

const allTexts = (): LocalizedText[] => [
    ...probabilityBatx2Diagnostic.flatMap((item) => [item.prompt, item.explanation, ...item.options]),
    ...[...probabilityBatx2Practice, ...probabilityBatx2Challenges].flatMap((item) => [item.prompt, item.hint, item.explanation]),
    ...probabilityBatx2ExerciseBank.flatMap((section) => [section.title, ...section.items.flatMap((item) => [item.question, item.solution])])
]

test('probabilitatea batx2 z: the unit is active and routed, and only in Ciencias', () => {
    const course = courses.find((item) => item.id === 'batx2-zientziak')!
    assert.ok(course.topics.find((topic) => topic.id === 'probabilidad')!.active)
    assert.ok(isUnitV2Path('/matematika/batx2-zientziak/probabilidad'))
    assert.ok(isUnitV2Path('/matematika/batx2-zientziak/probabilidad/ariketak'))
    const social = courses.find((item) => item.id === 'batx2-gizarte')
    if (social) assert.ok(!social.topics.find((topic) => topic.id === 'probabilidad')?.active)
})

test('probabilitatea batx2 z: diagnostic, practice, challenges and bank are consistent', () => {
    // The unit's block of ids is 128000–128999
    assert.deepEqual(probabilityBatx2Diagnostic.map((question) => question.id), [128001, 128002, 128003, 128004, 128005, 128006, 128007, 128008])
    for (const question of probabilityBatx2Diagnostic) {
        assert.ok(topics.includes(question.topic), `${question.id}`)
        assert.ok(question.correctIndex < question.options.length)
        assert.equal(new Set(question.options.map((option) => option.es)).size, question.options.length)
    }
    assert.equal(new Set(probabilityBatx2Diagnostic.map((question) => question.correctIndex)).size, 3)
    for (const stage of stages) {
        assert.equal(probabilityBatx2Practice.filter((item) => item.stage === stage).length, counts[stage].practice, stage)
        assert.equal(probabilityBatx2Challenges.filter((item) => item.stage === stage).length, counts[stage].challenges, stage)
        assert.equal(probabilityBatx2ExerciseBank.find((section) => section.id === stage)!.items.length, counts[stage].bank, stage)
    }
    assert.equal(probabilityBatx2Practice.length, 20)
    assert.equal(probabilityBatx2Challenges.length, 15)
    for (const item of [...probabilityBatx2Practice, ...probabilityBatx2Challenges]) {
        assert.ok(stages.includes(item.stage), `${item.id}`)
        assert.equal(checkAnswer(typed(item.expected), item.expected, item.answerForm), 'correct', `${item.id}`)
        for (const language of ['eu', 'es', 'en', 'ar'] as const) assert.ok(item.explanation[language].length > 0 && item.prompt[language].length > 0 && item.hint[language].length > 0, `${item.id} ${language}`)
    }
    assert.deepEqual(probabilityBatx2Practice.map((item) => item.id), probabilityBatx2Practice.map((_, index) => index + 1))
    assert.deepEqual(probabilityBatx2Challenges.map((item) => item.id), probabilityBatx2Challenges.map((_, index) => index + 101))
    assert.deepEqual(probabilityBatx2ExerciseBank.map((section) => section.id), stages)
    const ids = probabilityBatx2ExerciseBank.flatMap((section) => section.items.map((item) => item.id))
    assert.deepEqual(ids, ids.map((_, index) => index + 1))
    assert.equal(ids.length, 50)
    for (const section of probabilityBatx2ExerciseBank) {
        assert.ok(section.items.some((item) => item.difficulty === 'easy') && section.items.some((item) => item.difficulty === 'hard'), section.id)
        for (const item of section.items) {
            for (const language of ['eu', 'es', 'en', 'ar'] as const) assert.ok(item.question[language].length > 0 && item.solution[language].length > 0, `${item.id} ${language}`)
            if (item.answer) assert.equal(checkAnswer(typed(item.answer.expected), item.answer.expected, item.answer.form), 'correct', `${item.id}`)
        }
    }
    assert.deepEqual([...new Set(probabilityBatx2Challenges.map((item) => item.points))].sort(), [10, 20, 30])
    // Every closed answer is a probability (between 0 and 1) except the counts of events and shots
    const counts_ = new Set([3, 104, 9, 33])
    for (const item of [...probabilityBatx2Practice, ...probabilityBatx2Challenges]) {
        const value = item.expected.numerator / item.expected.denominator
        if (!counts_.has(item.id)) assert.ok(value >= 0 && value <= 1, `${item.id}: ${value}`)
    }
})

test('probabilitatea batx2 z: answers as a fraction, a comma or a point are read', () => {
    assert.equal(checkAnswer(readStatisticsAnswer('3/8'), { numerator: 3, denominator: 8 }), 'correct')
    assert.equal(checkAnswer(readStatisticsAnswer('0.375'), { numerator: 3, denominator: 8 }), 'correct')
    assert.equal(checkAnswer(readStatisticsAnswer('0,375'), { numerator: 3, denominator: 8 }), 'correct')
    assert.equal(checkAnswer(readStatisticsAnswer('12 %'), { numerator: 12, denominator: 1 }), 'correct')
})

test('probabilitatea batx2 z: every formula renders in KaTeX', () => {
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

test('probabilitatea batx2 z: each language in its own place, the same formulas, and Arabic never keeps the decimal comma', () => {
    const shapes = (value: string) => [...value.matchAll(/\$([^$]+)\$/g)].map(([, formula]) => formula.replace(/\{,\}/g, '.'))
    for (const text of allTexts()) {
        assert.ok(!text.ar.includes('{,}'), text.ar)
        const words = (value: string) => value.replace(/\$[^$]+\$/g, ' ')
        if (/[a-zA-Z]{4}/.test(words(text.es))) assert.ok(/[؀-ۿ]/.test(words(text.ar)), `not Arabic: ${text.ar}`)
        for (const language of ['eu', 'es', 'en'] as const) assert.ok(!/[؀-ۿ]/.test(text[language]), `Arabic in ${language}: ${text[language]}`)
        if (/[a-zA-Z]{6}/.test(words(text.es))) assert.ok(text.eu !== text.es && text.en !== text.es, `copied from Spanish: ${text.es}`)
        // The same formulas, in the same order, in the four languages
        for (const language of ['eu', 'en', 'ar'] as const) assert.deepEqual(shapes(text[language]), shapes(text.es), `${language}: ${text[language]}`)
        // Decimals in the words: a comma in Basque and Spanish, a point in English and Arabic
        assert.ok(!/\d\.\d/.test(words(text.es)) && !/\d\.\d/.test(words(text.eu)), `decimal point: ${text.es}`)
        assert.ok(!/\d,\d/.test(words(text.en)) || /\d,\d{3}/.test(words(text.en)), `decimal comma in English: ${text.en}`)
    }
})

test('probabilitatea batx2 z: Basque glues no case ending to a number, English writes the euro first', () => {
    for (const text of allTexts()) {
        assert.ok(!/\d[a-zñ]/.test(text.eu.replace(/\$[^$]+\$/g, '')) && !/\$(?:ri|ren|rekin|z|ra|tik|ei|ek|ak|en|ko|an)(?![a-zA-Z])/.test(text.eu), text.eu)
        assert.ok(!/\d\s*€/.test(text.en.replace(/\$[^$]+\$/g, '')), text.en)
    }
})

test('probabilitatea batx2 z: every worked equality with numbers is right', () => {
    const texts = [
        ...probabilityBatx2Practice.flatMap((item) => [item.hint.es, item.explanation.es]),
        ...probabilityBatx2Challenges.flatMap((item) => [item.hint.es, item.explanation.es]),
        ...probabilityBatx2ExerciseBank.flatMap((section) => section.items.map((item) => item.solution.es)),
        ...probabilityBatx2Diagnostic.flatMap((item) => [item.explanation.es])
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
    assert.ok(checked >= 80, `only ${checked} checked`)
})

test('probabilitatea batx2 z: every answer appears in its worked explanation or solution', () => {
    const shows = (text: string, value: FractionValue) => {
        const decimal = toExactDecimal(value) ?? ''
        const candidates = [`\\frac{${value.numerator}}{${value.denominator}}`, decimal.replace(',', '{,}'), decimal, value.denominator === 1 ? String(value.numerator) : '']
        return candidates.some((candidate) => candidate && text.replace(/\\,/g, '').includes(candidate))
    }
    for (const item of [...probabilityBatx2Practice, ...probabilityBatx2Challenges]) assert.ok(shows(`${item.explanation.es} ${item.hint.es}`, item.expected), `${item.id}: ${written(item.expected)}`)
    for (const item of probabilityBatx2ExerciseBank.flatMap((section) => section.items)) if (item.answer) assert.ok(shows(item.solution.es, item.answer.expected), `${item.id}: ${written(item.answer.expected)}`)
})

/* ---------- The probabilities of the unit, recomputed from scratch ---------- */

/** Every ordered draw of k balls without replacement from an urn, as lists of colours */
function draws(urn: string[], k: number): string[][] {
    if (k === 0) return [[]]
    return urn.flatMap((ball, index) => draws([...urn.slice(0, index), ...urn.slice(index + 1)], k - 1).map((rest) => [ball, ...rest]))
}
const share = <T>(all: T[], keep: (item: T) => boolean) => all.filter(keep).length / all.length
const urn = (spec: Record<string, number>) => Object.entries(spec).flatMap(([colour, count]) => Array<string>(count).fill(colour))
/** Moves each ball of urn I to urn II in turn and draws one: P(colour), and P(moved = from | drew colour) */
function transfer(first: string[], second: string[], colour: string, from: string) {
    let total = 0
    let joint = 0
    for (const moved of first) {
        const after = [...second, moved]
        const chance = share(after, (ball) => ball === colour) / first.length
        total += chance
        if (moved === from) joint += chance
    }
    return { total, posterior: joint / total }
}

test('probabilitatea batx2 z: the lessons give the probabilities that counting every case gives', () => {
    // review-events: the 12-sided die
    const twelve = Array.from({ length: 12 }, (_, index) => index + 1)
    assert.ok(near(share(twelve, (x) => x % 3 === 0 || x > 8), 1 / 2))
    // review-compound: two draws without replacement, same colour
    assert.ok(near(share(draws(urn({ w: 4, b: 2 }), 2), ([a, b]) => a === b), 7 / 15))
    // review-counting: two girls of 6 among 10
    assert.ok(near(share(draws(urn({ g: 6, b: 4 }), 2), ([a, b]) => a === 'g' && b === 'g'), 1 / 3))
    // event-space: subsets of 5 outcomes
    assert.equal(2 ** 5, 32)
    // product-rule: three good batteries of 7 among 10
    assert.ok(near(share(draws(urn({ g: 7, f: 3 }), 3), (draw) => draw.every((battery) => battery === 'g')), 7 / 24))
    // percent-tables: the gym, P(M/N)
    assert.ok(near((0.6 * 0.3) / (0.6 * 0.3 + 0.4 * 0.5), 9 / 19))
    // total-probability and bayes: the factory
    const total = 0.5 * 0.02 + 0.3 * 0.03 + 0.2 * 0.05
    assert.ok(near(total, 0.029))
    assert.ok(near((0.2 * 0.05) / total, 10 / 29))
    // diagnostic-tests: 1 % ill, 99 % and 1 %
    assert.ok(near((0.01 * 0.99) / (0.01 * 0.99 + 0.99 * 0.01), 1 / 2))
    assert.ok(near((0.1 * 0.99) / (0.1 * 0.99 + 0.9 * 0.01), 11 / 12))
    // two-stage: a ball from I (3 white, 1 black) to II (2 white, 2 black)
    const moved = transfer(urn({ w: 3, b: 1 }), urn({ w: 2, b: 2 }), 'w', 'b')
    assert.ok(near(moved.total, 11 / 20) && near(moved.posterior, 2 / 11))
    // «Check it» of two-stage and the master challenge 115
    assert.ok(near(transfer(urn({ w: 1, b: 1 }), urn({ w: 1, b: 2 }), 'w', 'w').total, 3 / 8))
    assert.ok(near(transfer(urn({ w: 2, b: 3 }), urn({ w: 4, b: 1 }), 'w', 'w').posterior, 5 / 11))
    // bank 47 and 48
    const bank = transfer(urn({ w: 3, b: 2 }), urn({ w: 1, b: 1 }), 'b', 'b')
    assert.ok(near(bank.total, 7 / 15) && near(bank.posterior, 4 / 7))
    // two-stage example and bank 49: an urn chosen at random, two balls drawn
    const both = (spec: Record<string, number>, colour: string) => share(draws(urn(spec), 2), ([a, b]) => a === colour && b === colour)
    assert.ok(near((both({ w: 2, b: 2 }, 'b') + both({ w: 3, b: 1 }, 'b')) / 2, 1 / 12))
    assert.ok(near((both({ w: 3, b: 2 }, 'w') + both({ w: 2, b: 3 }, 'w')) / 2, 1 / 5))
    // challenge 101: sum 9 with two dice; challenge 110: at least one 6 in three rolls
    const dice = Array.from({ length: 36 }, (_, index) => [Math.floor(index / 6) + 1, (index % 6) + 1])
    assert.ok(near(share(dice, ([a, b]) => a + b === 9), 1 / 9))
    assert.ok(near(1 - (5 / 6) ** 3, 91 / 216))
    // challenge 103: different colours; bank 28: three red of 6 among 10
    assert.ok(near(share(draws(urn({ r: 4, g: 6 }), 2), ([a, b]) => a !== b), 8 / 15))
    assert.ok(near(share(draws(urn({ r: 6, b: 4 }), 3), (draw) => draw.every((ball) => ball === 'r')), 1 / 6))
    // bank 33: the least n with 1 − 0,7ⁿ > 0,9
    assert.equal(Array.from({ length: 20 }, (_, index) => index + 1).find((shots) => 1 - 0.7 ** shots > 0.9), 7)
    // bank 8: even numbers of three different digits from 1–5
    const numbers = draws(['1', '2', '3', '4', '5'], 3)
    assert.equal(numbers.length, 60)
    assert.ok(near(share(numbers, (digits) => Number(digits[2]) % 2 === 0), 2 / 5))
})

test('probabilitatea batx2 z: the wrong answers of «Check it» really are wrong', () => {
    // review-compound: with replacement would be 4/25; the right one is 1/10
    assert.ok(near(share(draws(urn({ r: 3, b: 2 }), 2), ([a, b]) => a === 'b' && b === 'b'), 1 / 10))
    // product-rule: two lemon sweets of 4 among 10
    assert.ok(near(share(draws(urn({ s: 6, l: 4 }), 2), ([a, b]) => a === 'l' && b === 'l'), 2 / 15))
    // total-probability: the late days
    assert.ok(near(0.7 * 0.1 + 0.3 * 0.4, 0.19))
    // bayes: the broken boxes
    assert.ok(near((0.2 * 0.1) / (0.2 * 0.1 + 0.8 * 0.05), 1 / 3))
    // independence: mutually exclusive events with positive probabilities are not independent
    assert.ok(!near(0, 0.3 * 0.4))
})

test('probabilitatea batx2 z: the lesson examples are worked exercises with an answer', () => {
    for (const [id, entry] of Object.entries(probabilityBatx2LessonTexts)) {
        assert.ok(entry.examplePrompt && entry.exampleAnswer, id)
    }
})
