import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { courses } from '../src/data/courses.ts'
import { checkAnswer, hasTerminatingDecimal, toExactDecimal, type FractionValue } from '../src/features/unit-v2/math/fraction.ts'
import { isUnitV2Path } from '../src/features/unit-v2/paths.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { distributionsBatx2gChallenges, distributionsBatx2gDiagnostic, distributionsBatx2gExerciseBank, distributionsBatx2gPractice } from '../src/pages/batx2-gizarte-banaketak/content.ts'
import { distributionsBatx2gLessonChecks } from '../src/pages/batx2-gizarte-banaketak/lessonChecks.ts'
import { distributionsBatx2gLessonTexts } from '../src/pages/batx2-gizarte-banaketak/lessonTexts.ts'
import { evaluate, near } from './latex-math.ts'
import { below, tableValue } from '../src/pages/batx2-zientziak-banaketak/normal.ts'
import { binomialPmfDecimal } from '../src/pages/batx2-zientziak-banaketak/binomial.ts'
import { criticalZ, inverseZ } from '../src/pages/batx2-gizarte-banaketak/critical.ts'

/* Banaketak · 2.º Bachillerato Ciencias Sociales: the content of the unit, with every normal value read again from the table. */

const counts: Record<string, { practice: number; challenges: number; bank: number }> = {
    discrete: { practice: 5, challenges: 4, bank: 12 },
    binomial: { practice: 5, challenges: 4, bank: 13 },
    normal: { practice: 5, challenges: 4, bank: 13 },
    approximation: { practice: 5, challenges: 3, bank: 12 }
}
const stages = Object.keys(counts)
const topics = Object.keys(distributionsBatx2gLessonChecks)

const typed = (value: FractionValue) => (hasTerminatingDecimal(value) ? toExactDecimal(value)! : `${value.numerator}/${value.denominator}`)
const written = (value: FractionValue) => `${value.numerator}/${value.denominator}`

const allTexts = (): LocalizedText[] => [
    ...distributionsBatx2gDiagnostic.flatMap((item) => [item.prompt, item.explanation, ...item.options]),
    ...[...distributionsBatx2gPractice, ...distributionsBatx2gChallenges].flatMap((item) => [item.prompt, item.hint, item.explanation]),
    ...distributionsBatx2gExerciseBank.flatMap((section) => [section.title, ...section.items.flatMap((item) => [item.question, item.solution])])
]

test('banaketak batx2 g: the unit is active and routed in Ciencias Sociales', () => {
    const course = courses.find((item) => item.id === 'batx2-gizarte')!
    assert.ok(course.topics.find((topic) => topic.id === 'binomial-normal')!.active)
    assert.ok(isUnitV2Path('/matematika/batx2-gizarte/binomial-normal'))
    assert.ok(isUnitV2Path('/matematika/batx2-gizarte/binomial-normal/ariketak'))
})

test('banaketak batx2 g: diagnostic, practice, challenges and bank are consistent', () => {
    // The unit's block of ids is 151000–151999
    assert.deepEqual(distributionsBatx2gDiagnostic.map((question) => question.id), [151001, 151002, 151003, 151004, 151005, 151006, 151007, 151008])
    for (const question of distributionsBatx2gDiagnostic) {
        assert.ok(topics.includes(question.topic), `${question.id}`)
        assert.ok(question.correctIndex < question.options.length)
        assert.equal(new Set(question.options.map((option) => option.es)).size, question.options.length)
    }
    assert.equal(new Set(distributionsBatx2gDiagnostic.map((question) => question.correctIndex)).size, 3)
    for (const stage of stages) {
        assert.equal(distributionsBatx2gPractice.filter((item) => item.stage === stage).length, counts[stage].practice, stage)
        assert.equal(distributionsBatx2gChallenges.filter((item) => item.stage === stage).length, counts[stage].challenges, stage)
        assert.equal(distributionsBatx2gExerciseBank.find((section) => section.id === stage)!.items.length, counts[stage].bank, stage)
    }
    assert.equal(distributionsBatx2gPractice.length, 20)
    assert.equal(distributionsBatx2gChallenges.length, 15)
    for (const item of [...distributionsBatx2gPractice, ...distributionsBatx2gChallenges]) {
        assert.equal(checkAnswer(typed(item.expected), item.expected, item.answerForm), 'correct', `${item.id}`)
    }
    assert.deepEqual(distributionsBatx2gPractice.map((item) => item.id), distributionsBatx2gPractice.map((_, index) => index + 1))
    assert.deepEqual(distributionsBatx2gChallenges.map((item) => item.id), distributionsBatx2gChallenges.map((_, index) => index + 101))
    assert.deepEqual(distributionsBatx2gExerciseBank.map((section) => section.id), stages)
    const ids = distributionsBatx2gExerciseBank.flatMap((section) => section.items.map((item) => item.id))
    assert.deepEqual(ids, ids.map((_, index) => index + 1))
    for (const section of distributionsBatx2gExerciseBank) {
        assert.ok(section.items.some((item) => item.difficulty === 'easy') && section.items.some((item) => item.difficulty === 'hard'), section.id)
        for (const item of section.items) if (item.answer) assert.equal(checkAnswer(typed(item.answer.expected), item.answer.expected, item.answer.form), 'correct', `${item.id}`)
    }
    assert.deepEqual([...new Set(distributionsBatx2gChallenges.map((item) => item.points))].sort(), [10, 20, 30])
})

test('banaketak batx2 g: every formula renders in KaTeX', () => {
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

test('banaketak batx2 g: each language in its own place, the same formulas, and Arabic never keeps the decimal comma', () => {
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

test('banaketak batx2 g: Basque glues no case ending to a number', () => {
    for (const text of allTexts()) {
        assert.ok(!/\d[a-zñ]/.test(text.eu.replace(/\$[^$]+\$/g, '')) && !/\$(?:ri|ren|rekin|z|ra|tik|ei|ek|ak|en|ko|an)(?![a-zA-Z])/.test(text.eu), text.eu)
    }
})

test('banaketak batx2 g: every worked equality with numbers is right', () => {
    const texts = [
        ...distributionsBatx2gPractice.flatMap((item) => [item.hint.es, item.explanation.es]),
        ...distributionsBatx2gChallenges.flatMap((item) => [item.hint.es, item.explanation.es]),
        ...distributionsBatx2gExerciseBank.flatMap((section) => section.items.map((item) => item.solution.es)),
        ...distributionsBatx2gDiagnostic.flatMap((item) => [item.explanation.es])
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

test('banaketak batx2 g: every answer appears in its worked explanation or solution', () => {
    const shows = (text: string, value: FractionValue) => {
        const decimal = toExactDecimal(value) ?? ''
        const candidates = [`\\frac{${value.numerator}}{${value.denominator}}`, decimal.replace(',', '{,}'), decimal, value.denominator === 1 ? String(value.numerator) : '']
        return candidates.some((candidate) => candidate && text.replace(/\\,/g, '').includes(candidate))
    }
    for (const item of [...distributionsBatx2gPractice, ...distributionsBatx2gChallenges]) assert.ok(shows(`${item.explanation.es} ${item.hint.es}`, item.expected), `${item.id}: ${written(item.expected)}`)
    for (const item of distributionsBatx2gExerciseBank.flatMap((section) => section.items)) if (item.answer) assert.ok(shows(item.solution.es, item.answer.expected), `${item.id}: ${written(item.answer.expected)}`)
})

/* ---------- The values of the unit, recomputed ---------- */

const t = (z: number) => below(z) / 10_000

test('banaketak batx2 g: the critical values follow the approved convention', () => {
    assert.equal(criticalZ(90), 1.645)
    assert.equal(criticalZ(95), 1.96)
    assert.equal(criticalZ(99), 2.575)
    assert.equal(criticalZ(80), 1.28)
    assert.equal(criticalZ(94), 1.88)
    assert.equal(criticalZ(96), 2.05)
    assert.equal(criticalZ(98), 2.33)
    assert.equal(inverseZ(8500), 1.04)
    assert.equal(inverseZ(7000), 0.52)
    assert.equal(tableValue(1.4), 9192)
})

test('banaketak batx2 g: the normal and binomial values of the lessons and exercises', () => {
    const at = (n: number, p: number, k: number) => binomialPmfDecimal(n, p, k)
    // lessons
    assert.ok(near(at(5, 0.3, 2), 0.3087) && near(1 - 0.7 ** 5, 0.83193))
    assert.ok(near(t(1) - t(-1), 0.6826) && near(1 - t(2), 0.0228))
    assert.ok(near(t(1.5) - t(-1), 0.7745))
    assert.ok(near(48 + inverseZ(8500) * 6, 54.24))
    assert.ok(near(90 + criticalZ(95) * 15, 119.4))
    assert.ok(near(1 - t(1.5), 0.0668))
    // practice and challenges
    assert.ok(near(at(4, 0.5, 2), 0.375) && near(at(3, 0.4, 3), 0.064) && near(1 - 0.8 ** 5, 0.67232))
    assert.ok(near(t(0.75), 0.7734) && near(1 - t(1.1), 0.1357) && near(2 * t(1.25) - 1, 0.7888))
    assert.ok(near(70 + inverseZ(7500) * 10, 76.7) && near(500 - criticalZ(99) * 20, 448.5))
    assert.ok(near(1 - t(0.9), 0.1841) && near(t(-1.45), 0.0735))
    assert.ok(near(t(2) - t(-1), 0.8185) && near(1000 - inverseZ(9000) * 200, 744))
    assert.ok(near(50 + criticalZ(90) * 10, 66.45) && near(2 * t(1.1) - 1, 0.7286))
    assert.ok(near(at(4, 0.5, 3) + at(4, 0.5, 4), 0.3125))
    // bank
    assert.ok(near(at(4, 0.2, 1), 0.4096) && near(at(3, 0.6, 2), 0.432) && near(at(5, 0.4, 0) + at(5, 0.4, 1), 0.33696) && near(at(6, 0.5, 3), 0.3125))
    assert.ok(near(t(1.5) - t(0.5), 0.2417) && near(1 - t(-1.25), 0.8944) && near(t(-1.2), 0.1151))
    assert.ok(near(60 + inverseZ(7000) * 10, 65.2) && near(70 - criticalZ(80) * 10, 57.2) && near(criticalZ(99) * 5, 12.875))
    assert.ok(near(t(0.75), 0.7734) && near(t(-0.5), 0.3085) && near(1 - t(1.45), 0.0735))
    assert.ok(near(t(0.5) - t(0.3), 0.0736) && near(2 * t(1.05) - 1, 0.7062) && near(1 - t(1.25), 0.1056))
    // the normal approximations agree with the exact binomial to about 0,01
    let exact = 0
    for (let k = 45; k <= 55; k += 1) exact += at(100, 0.5, k)
    assert.ok(Math.abs(exact - 0.7286) < 0.01)
})

test('banaketak batx2 g: the lesson examples are worked exercises with an answer', () => {
    for (const [id, entry] of Object.entries(distributionsBatx2gLessonTexts)) assert.ok(entry.examplePrompt && entry.exampleAnswer, id)
})
