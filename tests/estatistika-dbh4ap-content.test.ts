import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { courses } from '../src/data/courses.ts'
import { checkAnswer, hasTerminatingDecimal, toExactDecimal, type FractionValue } from '../src/features/unit-v2/math/fraction.ts'
import { isUnitV2Path } from '../src/features/unit-v2/paths.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { readStatisticsAnswer } from '../src/pages/dbh2-estatistika-v2/answers.ts'
import { statisticsChallenges as challenges, statisticsDiagnostic as diagnostic, statisticsExerciseBank as exerciseBank, statisticsPractice as practice } from '../src/pages/dbh4-aplikatuak-estatistika/content.ts'
import { carRows, classHeights, correlationClouds, glassesTable, gradesA, gradesB, heightRows, spellingRows, studyPairs, sunPairs } from '../src/pages/dbh4-aplikatuak-estatistika/data.ts'
import { boxPlot, correlation, regression, tableDeviation, tableMean, tablePercentile, tableVariance, variance } from '../src/pages/dbh4-aplikatuak-estatistika/stats.ts'

const stages = ['data', 'centre', 'spread', 'two', 'chance']
const topics = ['sampling', 'intervals', 'charts', 'central', 'percentiles', 'box-plot', 'variance', 'table-sd', 'cv', 'scatter', 'correlation', 'regression', 'laplace', 'compound', 'contingency']

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

test('estatistika 4. DBH ap: the unit is active and routed', () => {
    const course = courses.find((item) => item.id === 'dbh4-aplikatuak')!
    assert.ok(course.topics.find((topic) => topic.id === 'estadistica-probabilidad')!.active)
    assert.ok(isUnitV2Path('/matematika/dbh4-aplikatuak/estadistica-probabilidad'))
    assert.ok(isUnitV2Path('/matematika/dbh4-aplikatuak/estadistica-probabilidad/ariketak'))
})

test('estatistika 4. DBH ap: diagnostic, practice, challenges and bank are consistent', () => {
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
        for (const language of ['eu', 'es', 'ar'] as const) assert.ok(item.explanation[language].length > 0 && item.prompt[language].length > 0 && item.hint[language].length > 0, `${item.id} ${language}`)
    }
    assert.deepEqual(exerciseBank.map((section) => section.id), stages)
    const ids = exerciseBank.flatMap((section) => section.items.map((item) => item.id))
    assert.deepEqual(ids, ids.map((_, index) => index + 1))
    for (const section of exerciseBank) {
        assert.ok(section.items.some((item) => item.difficulty === 'easy') && section.items.some((item) => item.difficulty === 'hard'), section.id)
        for (const item of section.items) {
            for (const language of ['eu', 'es', 'ar'] as const) assert.ok(item.question[language].length > 0 && item.solution[language].length > 0, `${item.id} ${language}`)
            if (item.answer) assert.equal(checkAnswer(typed(item.answer.expected, item.answer.form), item.answer.expected, item.answer.form), 'correct', `${item.id}`)
        }
    }
    assert.equal(new Set(challenges.map((item) => item.id)).size, challenges.length)
    assert.deepEqual([...new Set(challenges.map((item) => item.points))].sort(), [10, 20, 30])
})

test('estatistika 4. DBH ap: every formula renders in KaTeX', () => {
    let formulas = 0
    for (const text of allTexts()) {
        for (const language of ['eu', 'es', 'ar'] as const) {
            for (const [, formula] of text[language].matchAll(/\$([^$]+)\$/g)) {
                katex.renderToString(formula, { throwOnError: true, strict: 'error' })
                formulas += 1
            }
        }
    }
    assert.ok(formulas > 300, `only ${formulas}`)
})

test('estatistika 4. DBH ap: Arabic never keeps the decimal comma', () => {
    for (const text of allTexts()) assert.ok(!text.ar.includes('{,}'), text.ar)
})

test('estatistika 4. DBH ap: every worked equality with numbers is right', () => {
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

test('estatistika 4. DBH ap: every answer appears in its worked explanation or solution', () => {
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

test('estatistika 4. DBH ap: answers with percent signs, minus signs and fractions are read', () => {
    for (const [input, value] of [['−0,95', [-95, 100]], ['27,5 %', [55, 2]], ['3/52', [3, 52]], ['111,6°', [1116, 10]], ['0.4712', [4712, 10000]]] as const) {
        assert.equal(checkAnswer(readStatisticsAnswer(input), { numerator: value[0], denominator: value[1] }), 'correct', input)
    }
})

test('estatistika 4. DBH ap: the data sets give the numbers the lessons and figures quote', () => {
    const close = (a: number, b: number, digits = 2) => assert.ok(Math.abs(a - b) < 0.5 * 10 ** -digits, `${a} ≉ ${b}`)
    assert.equal(tableMean(heightRows), 163.5)
    assert.equal(tablePercentile(heightRows, 50), 165)
    close(tableVariance(heightRows), 40.25, 6)
    close(tableDeviation(heightRows), 6.34)
    assert.equal(tableMean(carRows), 1.6)
    assert.deepEqual([25, 50, 75, 90, 80, 40].map((p) => tablePercentile(carRows, p)), [1, 1, 2, 3, 3, 1])
    close(tableDeviation(carRows), 1.13)
    assert.equal(tableMean(spellingRows), 1.7)
    close(tableVariance(spellingRows), 2.46, 6)
    close(tableDeviation(spellingRows), 1.57)
    assert.equal(tablePercentile(spellingRows, 50), 1)
    const box = boxPlot(classHeights)
    assert.deepEqual([box.q1, box.median, box.q3, box.low, box.high, box.min, box.max], [171, 175.5, 181, 156, 196, 158, 184])
    assert.deepEqual(box.outliers, [150])
    assert.equal(variance(gradesA), 4)
    close(variance(gradesB), 0.4, 9)
    close(correlation(studyPairs), 0.95)
    const line = regression(sunPairs)
    assert.deepEqual([line.slope, line.intercept], [0.5, 8])
    close(correlation(sunPairs), 0.87)
    const rs = correlationClouds.map(correlation)
    assert.ok(rs[0] > 0.9 && rs[1] < -0.9 && rs[2] > 0.3 && rs[2] < 0.7 && Math.abs(rs[3]) < 0.2, rs.join(' '))
    assert.equal(glassesTable.flat().reduce((sum, value) => sum + value, 0), 1000)
    assert.equal(glassesTable[0][1] + glassesTable[1][1], 400)
    // Anaya's percentile examples
    const listA = [18, 20, 22, 22, 23, 24, 25, 25, 27, 28, 30, 30, 31, 32, 35]
    assert.deepEqual([25, 60].map((p) => tablePercentile(listA.map((value) => ({ value, count: 1 })), p)), [22, 27.5])
    const baskets = [1, 2, 3, 4, 5, 6, 7, 8].map((value, index) => ({ value, count: [1, 3, 5, 7, 7, 3, 3, 1][index] }))
    close(tableDeviation(baskets), 1.67)
})
