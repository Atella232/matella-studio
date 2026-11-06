import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { courses } from '../src/data/courses.ts'
import { checkAnswer, hasTerminatingDecimal, toExactDecimal, type FractionValue } from '../src/features/unit-v2/math/fraction.ts'
import { isUnitV2Path } from '../src/features/unit-v2/paths.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { sunPairs } from '../src/pages/dbh4-aplikatuak-estatistika/data.ts'
import { columnTotals, crossing, deviationProducts, independentCell, isIndependent, lineXonY, lineYonX, pairStats, possibleLines, rowTotals, tableStats } from '../src/pages/batx1-zientziak-bidimentsionala/bivariate.ts'
import { bivarChallenges, bivarDiagnostic, bivarExerciseBank, bivarPractice } from '../src/pages/batx1-zientziak-bidimentsionala/content.ts'
import { FAMILY_TABLE, GROUPED_TABLE, INDEPENDENT_TABLE, PETS_TABLE, QUADRANT_PAIRS, STUDY_PAIRS, UNITS_PAIRS, WORKING_PAIRS, XY_PAIRS, YX_PAIRS } from '../src/pages/batx1-zientziak-bidimentsionala/data.ts'
import { bivarLessonChecks } from '../src/pages/batx1-zientziak-bidimentsionala/lessonChecks.ts'
import { bivarLessonTexts } from '../src/pages/batx1-zientziak-bidimentsionala/lessonTexts.ts'
import { evaluate, near } from './latex-math.ts'

const stages = ['tables', 'cloud', 'parameters', 'regression', 'problems']
const topics = Object.keys(bivarLessonChecks)

const typed = (value: FractionValue, form?: string) => (hasTerminatingDecimal(value) && (form !== 'simplified' || value.denominator === 1) ? toExactDecimal(value)! : `${value.numerator}/${value.denominator}`)
const written = (value: FractionValue) => (hasTerminatingDecimal(value) ? toExactDecimal(value)!.replace(',', '{,}') : `\\frac{${Math.abs(value.numerator)}}{${value.denominator}}`)

const allTexts = (): LocalizedText[] => [
    ...bivarDiagnostic.flatMap((item) => [item.prompt, item.explanation, ...item.options]),
    ...[...bivarPractice, ...bivarChallenges].flatMap((item) => [item.prompt, item.hint, item.explanation]),
    ...bivarExerciseBank.flatMap((section) => [section.title, ...section.items.flatMap((item) => [item.question, item.solution])])
]

test('bidimentsionala batx1 z: the unit is active and routed, and only in Ciencias', () => {
    const course = courses.find((item) => item.id === 'batx1-zientziak')!
    assert.ok(course.topics.find((topic) => topic.id === 'estadistica-bidimensional')!.active)
    assert.ok(isUnitV2Path('/matematika/batx1-zientziak/estadistica-bidimensional'))
    assert.ok(isUnitV2Path('/matematika/batx1-zientziak/estadistica-bidimensional/ariketak'))
    // The Sociales topic of the same name stays as it was
    for (const social of courses.filter((item) => item.id.startsWith('batx1') && item.id !== 'batx1-zientziak')) {
        assert.ok(!social.topics.find((topic) => topic.id === 'estadistica-bidimensional')?.active, social.id)
    }
})

test('bidimentsionala batx1 z: diagnostic, practice, challenges and bank are consistent', () => {
    assert.equal(bivarDiagnostic.length, 8)
    // The unit's block of ids is 115000–115999
    assert.deepEqual(bivarDiagnostic.map((question) => question.id), [115001, 115002, 115003, 115004, 115005, 115006, 115007, 115008])
    for (const question of bivarDiagnostic) {
        assert.ok(topics.includes(question.topic), `${question.id}`)
        assert.ok(question.correctIndex < question.options.length)
        assert.equal(new Set(question.options.map((option) => option.es)).size, question.options.length)
    }
    assert.ok(new Set(bivarDiagnostic.map((question) => question.correctIndex)).size === 3)
    for (const stage of stages) {
        assert.equal(bivarPractice.filter((item) => item.stage === stage).length, 4, stage)
        assert.equal(bivarChallenges.filter((item) => item.stage === stage).length, 3, stage)
    }
    for (const item of [...bivarPractice, ...bivarChallenges]) {
        assert.ok(stages.includes(item.stage), `${item.id}`)
        assert.equal(checkAnswer(typed(item.expected, item.answerForm), item.expected, item.answerForm), 'correct', `${item.id}`)
        for (const language of ['eu', 'es', 'en', 'ar'] as const) assert.ok(item.explanation[language].length > 0 && item.prompt[language].length > 0 && item.hint[language].length > 0, `${item.id} ${language}`)
    }
    assert.deepEqual(bivarPractice.map((item) => item.id), bivarPractice.map((_, index) => index + 1))
    assert.deepEqual(bivarExerciseBank.map((section) => section.id), stages)
    const ids = bivarExerciseBank.flatMap((section) => section.items.map((item) => item.id))
    assert.deepEqual(ids, ids.map((_, index) => index + 1))
    assert.equal(ids.length, 50)
    for (const section of bivarExerciseBank) {
        assert.ok(section.items.some((item) => item.difficulty === 'easy') && section.items.some((item) => item.difficulty === 'hard'), section.id)
        for (const item of section.items) {
            for (const language of ['eu', 'es', 'en', 'ar'] as const) assert.ok(item.question[language].length > 0 && item.solution[language].length > 0, `${item.id} ${language}`)
            if (item.answer) assert.equal(checkAnswer(typed(item.answer.expected, item.answer.form), item.answer.expected, item.answer.form), 'correct', `${item.id}`)
        }
    }
    assert.equal(new Set(bivarChallenges.map((item) => item.id)).size, bivarChallenges.length)
    assert.deepEqual([...new Set(bivarChallenges.map((item) => item.points))].sort(), [10, 20, 30])
})

test('bidimentsionala batx1 z: every formula renders in KaTeX', () => {
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

test('bidimentsionala batx1 z: each language in its own place, and Arabic never keeps the decimal comma', () => {
    for (const text of allTexts()) {
        assert.ok(!text.ar.includes('{,}'), text.ar)
        const words = (value: string) => value.replace(/\$[^$]+\$/g, ' ')
        if (/[a-zA-Z]{4}/.test(words(text.es))) assert.ok(/[؀-ۿ]/.test(words(text.ar)), `not Arabic: ${text.ar}`)
        for (const language of ['eu', 'es', 'en'] as const) assert.ok(!/[؀-ۿ]/.test(text[language]), `Arabic in ${language}: ${text[language]}`)
        if (/[a-zA-Z]{6}/.test(words(text.es))) assert.ok(text.eu !== text.es && text.en !== text.es, `copied from Spanish: ${text.es}`)
        // Decimals in the words: a comma in Basque and Spanish, a point in English and Arabic
        assert.ok(!/\d\.\d/.test(words(text.es)) && !/\d\.\d/.test(words(text.eu)), `decimal point: ${text.es}`)
        assert.ok(!/\d,\d/.test(words(text.en)) || /\d,\d{3}/.test(words(text.en)), `decimal comma in English: ${text.en}`)
        // The same formulas in every language (Arabic with the point)
        const formulas = (value: string) => [...value.matchAll(/\$([^$]+)\$/g)].map(([, formula]) => formula)
        for (const language of ['eu', 'en'] as const) assert.deepEqual(formulas(text[language]).sort(), formulas(text.es).sort(), `${language}: ${text[language]}`)
        assert.deepEqual(formulas(text.ar).sort(), formulas(text.es).map((formula) => formula.replace(/\{,\}/g, '.')).sort(), `ar: ${text.ar}`)
    }
})

test('bidimentsionala batx1 z: Basque glues no case ending to a number', () => {
    for (const text of allTexts()) {
        assert.ok(!/\d[a-zñ]/.test(text.eu.replace(/\$[^$]+\$/g, '')) && !/\$(?:ri|ren|rekin|z|ra|tik|ei|ek|ak|en|ko|an)(?![a-zA-Z])/.test(text.eu), text.eu)
    }
})

test('bidimentsionala batx1 z: every worked equality with numbers is right', () => {
    const texts = [
        ...bivarPractice.flatMap((item) => [item.hint.es, item.explanation.es]),
        ...bivarChallenges.flatMap((item) => [item.hint.es, item.explanation.es]),
        ...bivarExerciseBank.flatMap((section) => section.items.map((item) => item.solution.es)),
        ...bivarDiagnostic.flatMap((item) => [item.explanation.es])
    ]
    let checked = 0
    for (const text of texts) {
        for (const [, formula] of text.matchAll(/\$([^$]+)\$/g)) {
            // Rows of a gathered block are equalities of their own
            for (const part of formula.replace(/\\(?:begin|end)\{gathered\}/g, '').split(/\\\\|\\qquad|\\quad|\\ \\to\\ |\\to|,\\ /)) {
                const values = part.split(/\\le|\\ge|\\neq|<|>|\\approx/)[0].split('=').map((side) => evaluate(side)).filter((value): value is number => value !== null)
                if (values.length < 2) continue
                assert.ok(values.every((value) => near(value, values[0])), `${part} → ${values.join(' / ')}`)
                checked += 1
            }
        }
    }
    assert.ok(checked >= 40, `only ${checked} checked`)
})

test('bidimentsionala batx1 z: every answer appears in its worked explanation or solution', () => {
    const shows = (text: string, value: FractionValue) => {
        const plain = written(value)
        const words = toExactDecimal(value) ?? ''
        return [plain, value.numerator < 0 ? `-${plain}` : plain, words].some((candidate) => candidate && text.replace(/\\,/g, '').includes(candidate))
    }
    for (const item of [...bivarPractice, ...bivarChallenges]) assert.ok(shows(`${item.explanation.es} ${item.hint.es}`, item.expected), `${item.id}: ${written(item.expected)}`)
    for (const item of bivarExerciseBank.flatMap((section) => section.items)) if (item.answer) assert.ok(shows(item.solution.es, item.answer.expected), `${item.id}: ${written(item.answer.expected)}`)
})

test('bidimentsionala batx1 z: the tables and clouds of the lessons give the numbers the lessons write', () => {
    // Two-variable data: the pair (2, 1) three times, N = 10
    assert.equal(FAMILY_TABLE[1][1], 3)
    assert.equal(FAMILY_TABLE.flat().reduce((a, b) => a + b, 0), 10)
    // Marginals: rows 6, 8, 6 and columns 8, 12; x̄ = 1, ȳ = 0,6
    assert.deepEqual(rowTotals(PETS_TABLE), [6, 8, 6])
    assert.deepEqual(columnTotals(PETS_TABLE), [8, 12])
    const pets = tableStats([0, 1, 2], [0, 1], PETS_TABLE)
    assert.ok(near(pets.mx, 1) && near(pets.my, 0.6))
    // Independence: (1, 1) = 30 · 20 / 50 = 12, and the completed table is independent
    assert.equal(independentCell(30, 20, 50), 12)
    assert.ok(isIndependent(INDEPENDENT_TABLE))
    assert.ok(isIndependent([[6, 4], [3, 2]]) && isIndependent([[8, 12], [6, 9]]) && !isIndependent([[5, 10], [4, 6]]))
    // Quadrants: centre (3, 4), products 4, 1, 0, 1, 6
    assert.deepEqual(deviationProducts(QUADRANT_PAIRS), [4, 1, 0, 1, 6])
    assert.ok(near(pairStats(QUADRANT_PAIRS).cxy, 2.4))
    // Covariance of the study hours
    assert.ok(near(pairStats(STUDY_PAIRS).cxy, 1.8))
    // Units: r = 0,6 in metres and in centimetres
    const metres = pairStats(UNITS_PAIRS)
    const centimetres = pairStats(UNITS_PAIRS.map(([x, y]) => [100 * x, y]))
    assert.ok(near(metres.r, 0.6) && near(centimetres.r, 0.6) && near(centimetres.cxy, 100 * metres.cxy))
    // The line of y on x: x̄ = 4, ȳ = 10, σx² = 2,5, σxy = 5 → y = 2x + 2
    const yx = pairStats(YX_PAIRS)
    assert.ok(near(yx.mx, 4) && near(yx.my, 10) && near(yx.vx, 2.5) && near(yx.cxy, 5))
    assert.deepEqual(lineYonX(yx), { slope: 2, intercept: 2 })
    // The line of x on y: x̄ = 5, ȳ = 8, σy² = 4, σxy = 3 → x = 0,75y − 1
    const xy = pairStats(XY_PAIRS)
    assert.ok(near(xy.mx, 5) && near(xy.my, 8) && near(xy.vy, 4) && near(xy.cxy, 3))
    assert.deepEqual(lineXonY(xy), { slope: 0.75, intercept: -1 })
    // Estimates: the 4. DBH sunshine data give y = 0,5x + 8 and r ≈ 0,87
    const sun = pairStats(sunPairs)
    assert.deepEqual(lineYonX(sun), { slope: 0.5, intercept: 8 })
    assert.equal(Math.round(sun.r * 100) / 100, 0.87)
    // The two lines cross at (5, 10) and r² = 0,36
    assert.deepEqual(crossing(0.9, 5.5, 0.4, 1)!.map((value) => Math.round(value * 1e9) / 1e9), [5, 10])
    assert.ok(possibleLines(0.9, 0.4) && !possibleLines(1.5, 0.8) && !possibleLines(2, -0.2))
    // Grouped data: σxy = 2,8
    const grouped = tableStats([10, 20], [1, 3], GROUPED_TABLE)
    assert.ok(near(grouped.mx, 16) && near(grouped.my, 2.2) && near(grouped.cxy, 2.8))
    // The working table: r = 0,8
    assert.ok(near(pairStats(WORKING_PAIRS).r, 0.8))
})

test('bidimentsionala batx1 z: the examples and the exercises with pairs give their answers', () => {
    assert.ok(near(pairStats([[1, 2], [3, 2], [5, 8]]).cxy, 4))
    assert.ok(near(pairStats([[1, 2], [2, 8], [4, 4], [5, 10]]).r, 0.6))
    assert.ok(near(tableStats([2, 4], [1, 5], [[3, 1], [1, 3]]).cxy, 1))
    assert.ok(near(pairStats([[1, 2], [2, 2], [3, 5]]).cxy, 1))
    assert.ok(near(pairStats([[2, 8], [4, 6], [6, 4], [8, 2]]).r, -1))
    assert.ok(near(pairStats([[1, 3], [2, 1], [3, 2]]).cxy, -1 / 3))
    assert.ok(near(pairStats([[1, 2], [2, 4], [3, 6], [4, 8]]).r, 1))
    assert.ok(near(pairStats([[1, 1], [2, 3], [3, 2], [4, 4]]).r, 0.8))
    assert.ok(near(deviationProducts([[1, 6], [3, 4], [5, 2], [7, 0]]).reduce((a, b) => a + b, 0), -20))
    assert.ok(near(deviationProducts([[1, 7], [2, 5], [3, 4], [4, 2], [5, 2]]).reduce((a, b) => a + b, 0), -13))
    assert.ok(near(tableStats([10, 30], [2, 4], [[5, 0], [0, 5]]).r, 1))
    // The pairs of lines of the exercises cross where they say and give r² ≤ 1
    assert.deepEqual(crossing(0.6, 4, 0.6, 0.8)!.map((value) => Math.round(value * 1e9) / 1e9), [5, 7])
    assert.deepEqual(crossing(2, -2, 0.3, 1.6)!.map((value) => Math.round(value * 1e9) / 1e9), [2.5, 3])
    assert.deepEqual(crossing(-0.5, 9, -1.28, 13.68)!.map((value) => Math.round(value * 1e9) / 1e9), [6, 6])
    assert.deepEqual(crossing(-1.6, 18, -0.4, 9)!.map((value) => Math.round(value * 1e9) / 1e9), [5, 10])
    assert.deepEqual(crossing(0.5, 3, 0.5, 1.5)!.map((value) => Math.round(value * 1e9) / 1e9), [4, 5])
})

test('bidimentsionala batx1 z: the lesson examples are worked exercises with an answer', () => {
    for (const [id, entry] of Object.entries(bivarLessonTexts)) {
        assert.ok(entry.examplePrompt && entry.exampleAnswer, id)
    }
})
