import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { courses } from '../src/data/courses.ts'
import { checkAnswer, hasTerminatingDecimal, toExactDecimal, type FractionValue } from '../src/features/unit-v2/math/fraction.ts'
import { isUnitV2Path } from '../src/features/unit-v2/paths.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { probabilityBatx2gChallenges, probabilityBatx2gDiagnostic, probabilityBatx2gExerciseBank, probabilityBatx2gPractice } from '../src/pages/batx2-gizarte-probabilitatea/content.ts'
import { probabilityBatx2gLessonChecks } from '../src/pages/batx2-gizarte-probabilitatea/lessonChecks.ts'
import { probabilityBatx2gLessonTexts } from '../src/pages/batx2-gizarte-probabilitatea/lessonTexts.ts'
import { evaluate, near } from './latex-math.ts'

/* Probabilitatea · 2.º Bachillerato Ciencias Sociales: the content of the unit (counting, events, tables
   and conditional probability, total probability and Bayes), with every probability recomputed. */

const counts: Record<string, { practice: number; challenges: number; bank: number }> = {
    counting: { practice: 5, challenges: 4, bank: 12 },
    events: { practice: 5, challenges: 4, bank: 13 },
    conditional: { practice: 5, challenges: 4, bank: 13 },
    bayes: { practice: 5, challenges: 3, bank: 12 }
}
const stages = Object.keys(counts)
const topics = Object.keys(probabilityBatx2gLessonChecks)

const typed = (value: FractionValue) => (hasTerminatingDecimal(value) ? toExactDecimal(value)! : `${value.numerator}/${value.denominator}`)
const written = (value: FractionValue) => `${value.numerator}/${value.denominator}`

const allTexts = (): LocalizedText[] => [
    ...probabilityBatx2gDiagnostic.flatMap((item) => [item.prompt, item.explanation, ...item.options]),
    ...[...probabilityBatx2gPractice, ...probabilityBatx2gChallenges].flatMap((item) => [item.prompt, item.hint, item.explanation]),
    ...probabilityBatx2gExerciseBank.flatMap((section) => [section.title, ...section.items.flatMap((item) => [item.question, item.solution])])
]

test('probabilitatea batx2 g: the unit is active and routed in Ciencias Sociales', () => {
    const course = courses.find((item) => item.id === 'batx2-gizarte')!
    assert.ok(course.topics.find((topic) => topic.id === 'probabilidad')!.active)
    assert.ok(isUnitV2Path('/matematika/batx2-gizarte/probabilidad'))
    assert.ok(isUnitV2Path('/matematika/batx2-gizarte/probabilidad/ariketak'))
})

test('probabilitatea batx2 g: diagnostic, practice, challenges and bank are consistent', () => {
    // The unit's block of ids is 150000–150999
    assert.deepEqual(probabilityBatx2gDiagnostic.map((question) => question.id), [150001, 150002, 150003, 150004, 150005, 150006, 150007, 150008])
    for (const question of probabilityBatx2gDiagnostic) {
        assert.ok(topics.includes(question.topic), `${question.id}`)
        assert.ok(question.correctIndex < question.options.length)
        assert.equal(new Set(question.options.map((option) => option.es)).size, question.options.length)
    }
    assert.equal(new Set(probabilityBatx2gDiagnostic.map((question) => question.correctIndex)).size, 3)
    for (const stage of stages) {
        assert.equal(probabilityBatx2gPractice.filter((item) => item.stage === stage).length, counts[stage].practice, stage)
        assert.equal(probabilityBatx2gChallenges.filter((item) => item.stage === stage).length, counts[stage].challenges, stage)
        assert.equal(probabilityBatx2gExerciseBank.find((section) => section.id === stage)!.items.length, counts[stage].bank, stage)
    }
    assert.equal(probabilityBatx2gPractice.length, 20)
    assert.equal(probabilityBatx2gChallenges.length, 15)
    for (const item of [...probabilityBatx2gPractice, ...probabilityBatx2gChallenges]) {
        assert.equal(checkAnswer(typed(item.expected), item.expected, item.answerForm), 'correct', `${item.id}`)
    }
    assert.deepEqual(probabilityBatx2gPractice.map((item) => item.id), probabilityBatx2gPractice.map((_, index) => index + 1))
    assert.deepEqual(probabilityBatx2gChallenges.map((item) => item.id), probabilityBatx2gChallenges.map((_, index) => index + 101))
    assert.deepEqual(probabilityBatx2gExerciseBank.map((section) => section.id), stages)
    const ids = probabilityBatx2gExerciseBank.flatMap((section) => section.items.map((item) => item.id))
    assert.deepEqual(ids, ids.map((_, index) => index + 1))
    for (const section of probabilityBatx2gExerciseBank) {
        assert.ok(section.items.some((item) => item.difficulty === 'easy') && section.items.some((item) => item.difficulty === 'hard'), section.id)
        for (const item of section.items) if (item.answer) assert.equal(checkAnswer(typed(item.answer.expected), item.answer.expected, item.answer.form), 'correct', `${item.id}`)
    }
    assert.deepEqual([...new Set(probabilityBatx2gChallenges.map((item) => item.points))].sort(), [10, 20, 30])
    // Outside the counting stage every closed answer is a probability
    for (const item of [...probabilityBatx2gPractice, ...probabilityBatx2gChallenges].filter((entry) => entry.stage !== 'counting')) {
        const value = item.expected.numerator / item.expected.denominator
        assert.ok(value >= 0 && value <= 1, `${item.id}: ${value}`)
    }
})

test('probabilitatea batx2 g: every formula renders in KaTeX', () => {
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

test('probabilitatea batx2 g: each language in its own place, the same formulas, and Arabic never keeps the decimal comma', () => {
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

test('probabilitatea batx2 g: Basque glues no case ending to a number', () => {
    for (const text of allTexts()) {
        assert.ok(!/\d[a-zñ]/.test(text.eu.replace(/\$[^$]+\$/g, '')) && !/\$(?:ri|ren|rekin|z|ra|tik|ei|ek|ak|en|ko|an)(?![a-zA-Z])/.test(text.eu), text.eu)
    }
})

test('probabilitatea batx2 g: every worked equality with numbers is right', () => {
    const texts = [
        ...probabilityBatx2gPractice.flatMap((item) => [item.hint.es, item.explanation.es]),
        ...probabilityBatx2gChallenges.flatMap((item) => [item.hint.es, item.explanation.es]),
        ...probabilityBatx2gExerciseBank.flatMap((section) => section.items.map((item) => item.solution.es)),
        ...probabilityBatx2gDiagnostic.flatMap((item) => [item.explanation.es])
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

test('probabilitatea batx2 g: every answer appears in its worked explanation or solution', () => {
    const shows = (text: string, value: FractionValue) => {
        const decimal = toExactDecimal(value) ?? ''
        const candidates = [`\\frac{${value.numerator}}{${value.denominator}}`, decimal.replace(',', '{,}'), decimal, value.denominator === 1 ? String(value.numerator) : '']
        return candidates.some((candidate) => candidate && text.replace(/\\,/g, '').includes(candidate))
    }
    for (const item of [...probabilityBatx2gPractice, ...probabilityBatx2gChallenges]) assert.ok(shows(`${item.explanation.es} ${item.hint.es}`, item.expected), `${item.id}: ${written(item.expected)}`)
    for (const item of probabilityBatx2gExerciseBank.flatMap((section) => section.items)) if (item.answer) assert.ok(shows(item.solution.es, item.answer.expected), `${item.id}: ${written(item.answer.expected)}`)
})

/* ---------- The counts and probabilities of the unit, recomputed from scratch ---------- */

/** Every ordered selection of k items without repetition */
function arrangements<T>(items: T[], k: number): T[][] {
    if (k === 0) return [[]]
    return items.flatMap((item, index) => arrangements([...items.slice(0, index), ...items.slice(index + 1)], k - 1).map((rest) => [item, ...rest]))
}
/** Every unordered selection of k items */
function subsets<T>(items: T[], k: number): T[][] {
    if (k === 0) return [[]]
    if (items.length < k) return []
    const [first, ...rest] = items
    return [...subsets(rest, k - 1).map((tail) => [first, ...tail]), ...subsets(rest, k)]
}
const share = <T>(all: T[], keep: (item: T) => boolean) => all.filter(keep).length / all.length
const people = (spec: Record<string, number>) => Object.entries(spec).flatMap(([kind, count]) => Array.from({ length: count }, (_, index) => `${kind}${index}`))
const range = (from: number, to: number) => Array.from({ length: to - from + 1 }, (_, index) => from + index)

test('probabilitatea batx2 g: the counts of the counting stage, by listing every case', () => {
    assert.equal(arrangements(range(1, 12), 3).length, 1320) // lesson: three posts among 12
    assert.equal(arrangements(range(1, 5), 5).length, 120) // lesson: five speeches
    assert.equal(subsets(range(1, 10), 3).length, 120) // lesson: committee of 3 of 10
    assert.equal(arrangements(range(1, 8), 3).length, 336) // check: medals
    assert.equal(subsets(range(1, 8), 4).length, 70) // check: teams
    assert.equal(subsets(range(1, 10), 2).length, 45) // check: two numbers
    assert.equal(subsets(range(1, 20), 3).length, 1140) // bank 8
    assert.equal(subsets(range(1, 10), 4).length, 210) // bank 6
    // lesson: three women of 7 among 12
    assert.ok(near(share(subsets(people({ w: 7, m: 5 }), 3), (group) => group.every((person) => person.startsWith('w'))), 7 / 44))
    // example: two English speakers of 5 among 9; practice 5: two girls of 4 among 10
    assert.ok(near(share(subsets(people({ e: 5, o: 4 }), 2), (group) => group.every((person) => person.startsWith('e'))), 5 / 18))
    assert.ok(near(share(subsets(people({ g: 4, b: 6 }), 2), (group) => group.every((person) => person.startsWith('g'))), 2 / 15))
    // challenge 104: Ane and Jon among 3 prizes of 10
    assert.ok(near(share(subsets(range(1, 10), 3), (group) => group.includes(1) && group.includes(2)), 1 / 15))
    // bank 9, 10 and 12: committees of 3 from 6 men and 4 women
    const committees = subsets(people({ m: 6, w: 4 }), 3)
    const women = (group: string[]) => group.filter((person) => person.startsWith('w')).length
    assert.equal(committees.filter((group) => women(group) === 1).length, 60)
    assert.ok(near(share(committees, (group) => women(group) === 1), 1 / 2))
    assert.ok(near(share(committees, (group) => women(group) >= 1), 5 / 6))
    // bank 11: Ana and Bea together in a row of 5
    assert.ok(near(share(arrangements(range(1, 5), 5), (row) => Math.abs(row.indexOf(1) - row.indexOf(2)) === 1), 2 / 5))
    // challenge 112: exactly two young of 3 among 5, choosing 3
    assert.ok(near(share(subsets(people({ y: 3, a: 2 }), 3), (group) => group.filter((person) => person.startsWith('y')).length === 2), 0.6))
})

test('probabilitatea batx2 g: the probabilities of the lessons and of the exercises', () => {
    // lesson events: the ten turns
    const turns = range(1, 10)
    assert.deepEqual(turns.filter((x) => x % 2 === 0 && x > 6), [8, 10])
    // lesson trees: one woman and one man of 6 and 4; bank 37: the three girls
    assert.ok(near(share(arrangements(people({ w: 6, m: 4 }), 2), ([a, b]) => a[0] !== b[0]), 8 / 15))
    assert.ok(near(share(arrangements(people({ g: 3, b: 5 }), 3), (draw) => draw.every((person) => person.startsWith('g'))), 1 / 56))
    // lesson total and bayes: the warehouses
    const total = 0.45 * 0.04 + 0.35 * 0.02 + 0.2 * 0.1
    assert.ok(near(total, 0.045) && near(0.02 / total, 4 / 9))
    // lesson screening and challenge 115
    assert.ok(near((0.02 * 0.95) / (0.02 * 0.95 + 0.98 * 0.05), 19 / 68))
    assert.ok(near((0.04 * 0.9) / (0.04 * 0.9 + 0.96 * 0.06), 5 / 13))
    // practice 10 and bank 25: numbered tickets
    assert.ok(near(share(range(1, 20), (x) => x % 4 === 0 || x > 15), 0.4))
    assert.ok(near(share(range(1, 30), (x) => x % 3 === 0 || x % 5 === 0), 7 / 15))
    // bank 49 and 50: urns
    assert.ok(near((0.5 * 3 / 5) / (0.5 * 3 / 5 + 0.5 * 1 / 4), 12 / 17))
    assert.ok(near((2 / 3) * (2 / 3) + (1 / 3) * (1 / 3), 5 / 9))
    // bank 47
    assert.ok(near(0.027 / (0.027 + 0.97 * 0.05), 54 / 151))
})

test('probabilitatea batx2 g: the lesson examples are worked exercises with an answer', () => {
    for (const [id, entry] of Object.entries(probabilityBatx2gLessonTexts)) assert.ok(entry.examplePrompt && entry.exampleAnswer, id)
})
