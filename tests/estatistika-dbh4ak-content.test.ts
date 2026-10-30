import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import { readFileSync } from 'node:fs'
import assert from 'node:assert/strict'
import katex from 'katex'
import { courses } from '../src/data/courses.ts'
import { checkAnswer, hasTerminatingDecimal, toExactDecimal, type FractionValue } from '../src/features/unit-v2/math/fraction.ts'
import { isUnitV2Path } from '../src/features/unit-v2/paths.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { readStatisticsAnswer } from '../src/pages/dbh2-estatistika-v2/answers.ts'
import { statisticsAkChallenges as challenges, statisticsAkDiagnostic as diagnostic, statisticsAkExerciseBank as exerciseBank, statisticsAkPractice as practice } from '../src/pages/dbh4-akademikoak-estatistika/content.ts'
import { classGroups, goalRows, schoolSample, schoolStrata, sportHours, waitIntervals } from '../src/pages/dbh4-akademikoak-estatistika/data.ts'
import { allocate, joinedMean, markRows, meanDeviation, tableMedian } from '../src/pages/dbh4-akademikoak-estatistika/stats.ts'
import { boxPlot, deviation, regression, tableMean, tablePercentile, tableVariance, variance } from '../src/pages/dbh4-aplikatuak-estatistika/stats.ts'
import { sunPairs } from '../src/pages/dbh4-aplikatuak-estatistika/data.ts'

const stages = ['data', 'centre', 'position', 'spread', 'two']
const topics = ['sampling', 'frequencies', 'intervals', 'mean', 'median-mode', 'grouped-centre', 'quartiles', 'percentiles', 'box-plot', 'mean-deviation', 'variance', 'cv', 'scatter', 'correlation', 'regression']

const typed = (value: FractionValue, form?: string) => (hasTerminatingDecimal(value) && (form !== 'simplified' || value.denominator === 1) ? toExactDecimal(value)! : `${value.numerator}/${value.denominator}`)
const written = (value: FractionValue) => (hasTerminatingDecimal(value) ? toExactDecimal(value)!.replace(',', '{,}') : `\\frac{${Math.abs(value.numerator)}}{${value.denominator}}`)

/** Plain arithmetic in LaTeX (no letters): powers, fractions, roots, products, divisions and decimal commas */
function evaluate(latex: string): number | null {
    let js = latex
        .replace(/\\,/g, '')
        .replace(/\\left|\\right/g, '')
        .replace(/(\d)\{,\}(\d)/g, '$1.$2')
        .replace(/\\cdot/g, '*')
        .replace(/\\mathbin\{:\}|:/g, '/')
        .replace(/\s+/g, '')
    for (let pass = 0; pass < 4; pass += 1) {
        js = js
            .replace(/\\frac\{([^{}]+)\}\{([^{}]+)\}/g, '(($1)/($2))')
            .replace(/\\sqrt\[(\d+)\]\{([^{}]+)\}/g, 'Math.cbrtn($2,$1)')
            .replace(/\\sqrt\{([^{}]+)\}/g, 'Math.sqrt($1)')
            .replace(/(\([^()]+\)|\d+(?:\.\d+)?)\^\{([^{}]+)\}/g, 'Math.pow($1,($2))')
    }
    js = js.replace(/\)\(/g, ')*(').replace(/(\d)\(/g, '$1*(').replace(/(\d)Math/g, '$1*Math').replace(/\)Math/g, ')*Math')
    if (!/^(?:[\d+\-*/().,]|Math\.(?:pow|sqrt|cbrtn))+$/.test(js) || !/\d/.test(js)) return null
    const cbrtn = (value: number, index: number) => (value < 0 ? -((-value) ** (1 / index)) : value ** (1 / index))
    try {
        return Function('Math', `return ${js}`)({ ...Math, pow: Math.pow, sqrt: Math.sqrt, cbrtn }) as number
    } catch {
        return null
    }
}

const allTexts = (): LocalizedText[] => [
    ...diagnostic.flatMap((item) => [item.prompt, item.explanation, ...item.options]),
    ...[...practice, ...challenges].flatMap((item) => [item.prompt, item.hint, item.explanation]),
    ...exerciseBank.flatMap((section) => [section.title, ...section.items.flatMap((item) => [item.question, item.solution])])
]

test('estatistika 4. DBH ak: the unit is active and routed', () => {
    const course = courses.find((item) => item.id === 'dbh4-akademikoak')!
    assert.ok(course.topics.find((topic) => topic.id === 'estadistica')!.active)
    assert.ok(isUnitV2Path('/matematika/dbh4-akademikoak/estadistica'))
    assert.ok(isUnitV2Path('/matematika/dbh4-akademikoak/estadistica/ariketak'))
})

test('estatistika 4. DBH ak: diagnostic, practice, challenges and bank are consistent', () => {
    assert.equal(diagnostic.length, 8)
    for (const question of diagnostic) {
        assert.ok(topics.includes(question.topic), `${question.id}`)
        assert.ok(question.correctIndex < question.options.length)
        assert.equal(new Set(question.options.map((option) => option.es)).size, question.options.length)
    }
    // The right option is not always in the same place
    assert.ok(new Set(diagnostic.map((question) => question.correctIndex)).size === 3)
    for (const stage of stages) {
        assert.equal(practice.filter((item) => item.stage === stage).length, 4, stage)
        assert.ok(challenges.some((item) => item.stage === stage), stage)
    }
    for (const item of [...practice, ...challenges]) {
        assert.ok(stages.includes(item.stage), `${item.id}`)
        assert.equal(checkAnswer(typed(item.expected, item.answerForm), item.expected, item.answerForm), 'correct', `${item.id}`)
        for (const language of ['eu', 'es', 'en', 'ar'] as const) assert.ok(item.explanation[language].length > 0 && item.prompt[language].length > 0 && item.hint[language].length > 0, `${item.id} ${language}`)
    }
    assert.deepEqual(exerciseBank.map((section) => section.id), stages)
    const ids = exerciseBank.flatMap((section) => section.items.map((item) => item.id))
    assert.deepEqual(ids, ids.map((_, index) => index + 1))
    for (const section of exerciseBank) {
        assert.ok(section.items.some((item) => item.difficulty === 'easy') && section.items.some((item) => item.difficulty === 'hard'), section.id)
        for (const item of section.items) {
            for (const language of ['eu', 'es', 'en', 'ar'] as const) assert.ok(item.question[language].length > 0 && item.solution[language].length > 0, `${item.id} ${language}`)
            if (item.answer) assert.equal(checkAnswer(typed(item.answer.expected, item.answer.form), item.answer.expected, item.answer.form), 'correct', `${item.id}`)
        }
    }
    assert.equal(new Set(challenges.map((item) => item.id)).size, challenges.length)
    assert.deepEqual([...new Set(challenges.map((item) => item.points))].sort(), [10, 20, 30])
})

test('estatistika 4. DBH ak: every formula renders in KaTeX', () => {
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

test('estatistika 4. DBH ak: Arabic never keeps the decimal comma', () => {
    for (const text of allTexts()) assert.ok(!text.ar.includes('{,}'), text.ar)
})

test('estatistika 4. DBH ak: every worked equality with numbers is right', () => {
    const texts = [
        ...practice.flatMap((item) => [item.hint.es, item.explanation.es]),
        ...challenges.flatMap((item) => [item.hint.es, item.explanation.es]),
        ...exerciseBank.flatMap((section) => section.items.map((item) => item.solution.es)),
        ...diagnostic.flatMap((item) => [item.explanation.es])
    ]
    let checked = 0
    for (const text of texts) {
        for (const [, formula] of text.matchAll(/\$([^$]+)\$/g)) {
            // Approximations (≈) and periodic decimals (\overline) are written rounded: skip them
            if (formula.includes('\\approx') || formula.includes('\\overline') || formula.includes('\\ldots')) continue
            for (const part of formula.split(/\\qquad|\\quad|\\ \\to\\ |\\to/)) {
                const values = part.replace(/^[a-z]\)\s*/, '').split('=').map(evaluate).filter((value): value is number => value !== null)
                if (values.length < 2) continue
                assert.ok(values.every((value) => Math.abs(value - values[0]) < 1e-9 * Math.max(1, Math.abs(values[0]))), `${part} → ${values.join(' / ')}`)
                checked += 1
            }
        }
    }
    assert.ok(checked >= 30, `only ${checked} checked`)
})

test('estatistika 4. DBH ak: every answer appears in its worked explanation or solution', () => {
    const shows = (text: string, value: FractionValue) => {
        const plain = written(value)
        const asFraction = `\\frac{${Math.abs(value.numerator)}}{${value.denominator}}`
        const minus = value.numerator < 0 ? [`-${plain}`, `-${asFraction}`] : [asFraction]
        const scientific = [`10^{${value.numerator}}`]
        const coefficient = [`${value.numerator}\\sqrt`, `${value.numerator}\\,\\%`, `${value.numerator}\\sqrt[3]`]
        // Thousands are grouped with thin spaces: 10\,000
        return [plain, ...minus, ...scientific, ...coefficient].some((candidate) => text.replace(/\\,/g, '').includes(candidate))
    }
    for (const item of [...practice, ...challenges]) assert.ok(shows(item.explanation.es, item.expected), `${item.id}: ${written(item.expected)}`)
    for (const section of exerciseBank) for (const item of section.items) if (item.answer) assert.ok(shows(item.solution.es, item.answer.expected), `bank ${item.id}`)
})

test('estatistika 4. DBH ak: answers with percent signs, minus signs and fractions are read', () => {
    for (const [input, value] of [['−0,95', [-95, 100]], ['27,5 %', [55, 2]], ['3/52', [3, 52]], ['111,6°', [1116, 10]], ['0.4712', [4712, 10000]]] as const) {
        assert.equal(checkAnswer(readStatisticsAnswer(input), { numerator: value[0], denominator: value[1] }), 'correct', input)
    }
})

test('estatistika 4. DBH ak: the data sets give the numbers the lessons and figures quote', () => {
    const close = (a: number, b: number, digits = 2) => assert.ok(Math.abs(a - b) < 0.5 * 10 ** -digits, `${a} ≉ ${b}`)
    assert.deepEqual(allocate(schoolStrata.map((row) => row.students), schoolSample), [18, 15, 14, 13])
    assert.equal(tableMean(goalRows), 1.8)
    assert.equal(tableMedian(goalRows), 2)
    close(tableVariance(goalRows), 1.76, 9)
    close(Math.sqrt(tableVariance(goalRows)), 1.33)
    close(joinedMean(classGroups), 6.92, 9)
    const box = boxPlot(sportHours)
    assert.deepEqual([box.q1, box.median, box.q3, box.low, box.high, box.min, box.max], [3.5, 5.5, 7.5, -2.5, 13.5, 2, 9])
    assert.deepEqual(box.outliers, [15])
    close(tableMean(markRows(waitIntervals)), 30.75, 9)
    assert.equal(meanDeviation([4, 6, 7, 8, 10]), 1.6)
    // The worked lists of the practice, challenges and bank
    const list = (data: number[]) => data.map((value) => ({ value, count: 1 }))
    assert.deepEqual([25, 75].map((p) => tablePercentile(list([3, 5, 6, 6, 8, 9, 10, 12, 14]), p)), [6, 10])
    assert.deepEqual([25, 75].map((p) => tablePercentile(list([1, 2, 4, 4, 5, 7, 8, 8, 9, 12]), p)), [4, 8])
    const marks = [4, 5, 6, 7, 8, 9].map((value, index) => ({ value, count: [5, 8, 9, 10, 6, 2][index] }))
    assert.deepEqual([80, 40].map((p) => tablePercentile(marks, p)), [7.5, 6])
    assert.equal(tableMedian([10, 20, 30, 40].map((value, index) => ({ value, count: [4, 7, 5, 4][index] }))), 20)
    assert.equal(tableMedian([2, 4, 6, 8, 10].map((value, index) => ({ value, count: [3, 1, 5, 2, 7][index] }))), 7)
    assert.equal(meanDeviation([2, 4, 6, 8, 10]), 2.4)
    assert.equal(meanDeviation([2, 2, 5, 7]), 2)
    assert.equal(variance([3, 5, 7, 9]), 5)
    assert.equal(deviation([2, 4, 4, 4, 5, 5, 7, 9]), 2)
    close(deviation([2, 4, 6, 8]), 2.24)
    close(tableVariance([1, 2, 3, 4].map((value, index) => ({ value, count: [2, 5, 6, 1][index] }))), 0.67)
    const line = regression(sunPairs)
    assert.deepEqual([line.slope, line.intercept, ...line.centre], [0.5, 8, 6, 11])
})

test('estatistika 4. DBH ak: lessons cover every topic and their formulas render', () => {
    // The lessons are TSX: read their source and render every formula in each language
    const source = readFileSync('src/pages/dbh4-akademikoak-estatistika/lessons.tsx', 'utf8').replace(/\\\\/g, '\\').replace(/\\'/g, "'")
    assert.deepEqual([...source.matchAll(/id: '([a-z-]+)',\s+stage:/g)].map((match) => match[1]), topics)
    let formulas = 0
    for (const [, formula] of source.matchAll(/\$([^$]+)\$/g)) {
        for (const language of ['eu', 'es', 'en', 'ar'] as const) katex.renderToString(formula.replace(/\{,\}/g, language === 'ar' ? '.' : '{,}'), { throwOnError: true, strict: 'error' })
        formulas += 1
    }
    assert.ok(formulas > 100, `only ${formulas}`)
})
