import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { courses } from '../src/data/courses.ts'
import { checkAnswer, fraction, hasTerminatingDecimal, toExactDecimal, type FractionValue } from '../src/features/unit-v2/math/fraction.ts'
import { isUnitV2Path } from '../src/features/unit-v2/paths.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { binomialAtLeast, binomialAtMost, binomialPmf, choose } from '../src/pages/batx2-zientziak-banaketak/binomial.ts'
import { discreteBatx1gChallenges, discreteBatx1gDiagnostic, discreteBatx1gExerciseBank, discreteBatx1gPractice } from '../src/pages/batx1-gizarte-diskretuak/content.ts'
import { discreteBatx1gLessonChecks } from '../src/pages/batx1-gizarte-diskretuak/lessonChecks.ts'
import { evaluate, near } from './latex-math.ts'

/* Diskretuak · 1.º Bachillerato Ciencias Sociales: the content of the unit. Four stages (review, discrete
   variable, binomial and fitting); every closed answer is exact and is recomputed here from its data. */

const counts: Record<string, { practice: number; challenges: number; bank: number }> = {
    review: { practice: 3, challenges: 2, bank: 6 },
    variable: { practice: 6, challenges: 4, bank: 14 },
    binomial: { practice: 8, challenges: 6, bank: 20 },
    fit: { practice: 3, challenges: 3, bank: 10 }
}
const stages = Object.keys(counts)
const topics = Object.keys(discreteBatx1gLessonChecks)

const typed = (value: FractionValue) => (hasTerminatingDecimal(value) ? toExactDecimal(value)! : `${value.numerator}/${value.denominator}`)
const asNumber = (value: FractionValue) => value.numerator / value.denominator
const practice = (id: number) => asNumber(discreteBatx1gPractice.find((item) => item.id === id)!.expected)
const challenge = (id: number) => asNumber(discreteBatx1gChallenges.find((item) => item.id === id)!.expected)
const bank = (id: number) => asNumber(discreteBatx1gExerciseBank.flatMap((section) => section.items).find((item) => item.id === id)!.answer!.expected)
const pmf = (n: number, p: number, k: number) => asNumber(binomialPmf(n, fraction(Math.round(p * 100), 100), k))

const allTexts = (): LocalizedText[] => [
    ...discreteBatx1gDiagnostic.flatMap((item) => [item.prompt, item.explanation, ...item.options]),
    ...[...discreteBatx1gPractice, ...discreteBatx1gChallenges].flatMap((item) => [item.prompt, item.hint, item.explanation]),
    ...discreteBatx1gExerciseBank.flatMap((section) => [section.title, ...section.items.flatMap((item) => [item.question, item.solution])])
]

test('diskretuak batx1 g: the unit is active and routed in Ciencias Sociales', () => {
    const course = courses.find((item) => item.id === 'batx1-gizarte')!
    assert.ok(course.topics.find((topic) => topic.id === 'distribuciones-discretas')!.active)
    assert.ok(isUnitV2Path('/matematika/batx1-gizarte/distribuciones-discretas'))
    assert.ok(isUnitV2Path('/matematika/batx1-gizarte/distribuciones-discretas/ariketak'))
})

test('diskretuak batx1 g: diagnostic, practice, challenges and bank are consistent', () => {
    // The unit's block of ids is 139000–139999
    assert.deepEqual(discreteBatx1gDiagnostic.map((question) => question.id), [139001, 139002, 139003, 139004, 139005, 139006, 139007, 139008])
    for (const question of discreteBatx1gDiagnostic) {
        assert.ok(topics.includes(question.topic), `${question.id}`)
        assert.ok(question.correctIndex < question.options.length)
        assert.equal(new Set(question.options.map((option) => option.es)).size, question.options.length)
    }
    assert.equal(new Set(discreteBatx1gDiagnostic.map((question) => question.correctIndex)).size, 3)
    for (const stage of stages) {
        assert.equal(discreteBatx1gPractice.filter((item) => item.stage === stage).length, counts[stage].practice, stage)
        assert.equal(discreteBatx1gChallenges.filter((item) => item.stage === stage).length, counts[stage].challenges, stage)
        assert.equal(discreteBatx1gExerciseBank.find((section) => section.id === stage)!.items.length, counts[stage].bank, stage)
    }
    assert.equal(discreteBatx1gPractice.length, 20)
    assert.equal(discreteBatx1gChallenges.length, 15)
    for (const item of [...discreteBatx1gPractice, ...discreteBatx1gChallenges]) {
        assert.ok(stages.includes(item.stage), `${item.id}`)
        assert.equal(checkAnswer(typed(item.expected), item.expected, item.answerForm), 'correct', `${item.id}`)
        for (const language of ['eu', 'es', 'en', 'ar'] as const) assert.ok(item.explanation[language].length > 0 && item.prompt[language].length > 0 && item.hint[language].length > 0, `${item.id} ${language}`)
    }
    assert.deepEqual(discreteBatx1gPractice.map((item) => item.id), discreteBatx1gPractice.map((_, index) => index + 1))
    assert.deepEqual(discreteBatx1gChallenges.map((item) => item.id), discreteBatx1gChallenges.map((_, index) => index + 101))
    assert.deepEqual(discreteBatx1gExerciseBank.map((section) => section.id), stages)
    const ids = discreteBatx1gExerciseBank.flatMap((section) => section.items.map((item) => item.id))
    assert.deepEqual(ids, ids.map((_, index) => index + 1))
    assert.equal(ids.length, 50)
    for (const section of discreteBatx1gExerciseBank) {
        assert.ok(section.items.some((item) => item.difficulty === 'easy') && section.items.some((item) => item.difficulty === 'hard'), section.id)
        for (const item of section.items) {
            for (const language of ['eu', 'es', 'en', 'ar'] as const) assert.ok(item.question[language].length > 0 && item.solution[language].length > 0, `${item.id} ${language}`)
            if (item.answer) assert.equal(checkAnswer(typed(item.answer.expected), item.answer.expected, item.answer.form), 'correct', `${item.id}`)
        }
    }
    assert.deepEqual([...new Set(discreteBatx1gChallenges.map((item) => item.points))].sort(), [10, 20, 30])
})

test('diskretuak batx1 g: every formula renders in KaTeX', () => {
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

test('diskretuak batx1 g: each language in its own place, the same formulas, and Arabic never keeps the decimal comma', () => {
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

test('diskretuak batx1 g: Basque glues no case ending to a number, English writes the euro first', () => {
    for (const text of allTexts()) {
        assert.ok(!/\d[a-zñ]/.test(text.eu.replace(/\$[^$]+\$/g, '')) && !/\$(?:ri|ren|rekin|z|ra|tik|ei|ek|ak|en|ko|an)(?![a-zA-Z])/.test(text.eu), text.eu)
        assert.ok(!/%\s?\d+(?:,\d+)?(?:ek|an|ean|ra|tik|ko|en)\b/.test(text.eu), text.eu)
        assert.ok(!/\d\s*€/.test(text.en.replace(/\$[^$]+\$/g, '')), text.en)
    }
})

test('diskretuak batx1 g: every worked equality with numbers is right', () => {
    const texts = [
        ...discreteBatx1gPractice.flatMap((item) => [item.hint.es, item.explanation.es]),
        ...discreteBatx1gChallenges.flatMap((item) => [item.hint.es, item.explanation.es]),
        ...discreteBatx1gExerciseBank.flatMap((section) => section.items.map((item) => item.solution.es)),
        ...discreteBatx1gDiagnostic.flatMap((item) => [item.explanation.es])
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
    assert.ok(checked >= 50, `only ${checked} checked`)
})

test('diskretuak batx1 g: every answer appears in its worked explanation or solution', () => {
    const shows = (text: string, value: FractionValue) => {
        const decimal = toExactDecimal(value) ?? ''
        const candidates = [`\\frac{${value.numerator}}{${value.denominator}}`, decimal.replace(',', '{,}'), decimal, value.denominator === 1 ? String(value.numerator) : '']
        return candidates.some((candidate) => candidate && text.replace(/\\,/g, '').includes(candidate))
    }
    for (const item of [...discreteBatx1gPractice, ...discreteBatx1gChallenges]) assert.ok(shows(`${item.explanation.es} ${item.hint.es}`, item.expected), `${item.id}`)
    for (const item of discreteBatx1gExerciseBank.flatMap((section) => section.items)) if (item.answer) assert.ok(shows(item.solution.es, item.answer.expected), `${item.id}`)
})

test('diskretuak batx1 g: the binomial answers are what the binomial gives', () => {
    assert.ok(near(practice(3), pmf(3, 0.5, 1)))
    assert.equal(practice(10), choose(3, 1))
    assert.ok(near(practice(11), pmf(6, 0.5, 3)))
    assert.ok(near(practice(12), pmf(4, 0.5, 2)))
    assert.ok(near(practice(13), pmf(3, 0.1, 0)))
    assert.ok(near(practice(14), asNumber(binomialAtLeast(3, fraction(1, 10), 1))))
    assert.ok(near(practice(15), pmf(2, 0.3, 1)))
    assert.ok(near(challenge(107), pmf(6, 0.5, 2)))
    assert.ok(near(challenge(108), pmf(5, 0.5, 5)))
    assert.ok(near(challenge(109), asNumber(binomialAtLeast(4, fraction(1, 2), 3))))
    assert.ok(near(challenge(110), asNumber(binomialAtLeast(3, fraction(1, 5), 2))))
    // The smallest number of rolls with a probability of some six above 0,5
    assert.equal(challenge(112), [1, 2, 3, 4, 5, 6].find((rolls) => 1 - (5 / 6) ** rolls > 0.5))
    assert.ok(near(bank(27), pmf(4, 0.5, 4)))
    assert.ok(near(bank(28), pmf(3, 0.4, 2)))
    assert.ok(near(bank(29), pmf(5, 0.2, 0)))
    assert.ok(near(bank(30), asNumber(binomialAtLeast(5, fraction(1, 5), 1))))
    assert.ok(near(bank(31), asNumber(binomialAtMost(4, fraction(3, 10), 1))))
    assert.ok(near(bank(33), asNumber(binomialAtLeast(3, fraction(1, 2), 2))))
    assert.ok(near(bank(40), asNumber(binomialAtLeast(3, fraction(9, 10), 2))))
})

test('diskretuak batx1 g: the fitting items follow Matella\'s rule', () => {
    /** p from the mean, the expected values and the largest difference as a percentage of the total */
    const fit = (trials: number, observed: number[]) => {
        const total = observed.reduce((sum, value) => sum + value, 0)
        const mean = observed.reduce((sum, value, k) => sum + k * value, 0) / total
        const p = mean / trials
        const expected = observed.map((_, k) => total * pmf(trials, p, k))
        const largest = Math.max(...observed.map((value, k) => Math.abs(value - expected[k])))
        return { p, expected, percent: (100 * largest) / total }
    }
    const lesson = fit(3, [11, 27, 33, 9])
    assert.ok(near(lesson.p, 0.5))
    assert.deepEqual(lesson.expected.map((value) => Math.round(value * 1000) / 1000), [10, 30, 30, 10])
    assert.ok(near(lesson.percent, 3.75) && lesson.percent < 5)
    assert.ok(near(challenge(115), fit(2, [30, 40, 30]).percent))
    const close = fit(2, [9, 22, 9])
    assert.ok(near(bank(47), close.p) && near(close.percent, 5))
    assert.ok(near(bank(49), fit(2, [70, 20, 10]).percent))
})
