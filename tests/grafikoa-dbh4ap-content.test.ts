import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { courses } from '../src/data/courses.ts'
import { checkAnswer, hasTerminatingDecimal, toExactDecimal, toNumber, type FractionValue } from '../src/features/unit-v2/math/fraction.ts'
import { isUnitV2Path } from '../src/features/unit-v2/paths.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'

import { exerciseGraphs, graphsChallenges as realsChallenges, graphsDiagnostic as realsDiagnostic, graphsExerciseBank as realsExerciseBank, graphsPractice as realsPractice } from '../src/pages/dbh4-aplikatuak-grafikoa/content.ts'
import { hyperbolaValue, quadraticRoots, quadraticValue, slopeOf, vertexOf } from '../src/pages/dbh4-aplikatuak-grafikoa/functions.ts'
import { specValue } from '../src/pages/dbh2-funtzioak-v2/functions.ts'

const stages = ['linear', 'lines', 'quadratic', 'inverse', 'exponential']
const topics = ['proportional', 'affine', 'linear-models', 'slope', 'line-equation', 'parallel', 'parabola', 'vertex', 'shifts', 'inverse', 'asymptotes', 'radical', 'exponential', 'growth', 'models']

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
    ...realsDiagnostic.flatMap((item) => [item.prompt, item.explanation, ...item.options]),
    ...[...realsPractice, ...realsChallenges].flatMap((item) => [item.prompt, item.hint, item.explanation]),
    ...realsExerciseBank.flatMap((section) => [section.title, ...section.items.flatMap((item) => [item.question, item.solution])])
]

test('grafikoa 4. DBH ap: the unit is active and routed', () => {
    const course = courses.find((item) => item.id === 'dbh4-aplikatuak')!
    assert.ok(course.topics.find((topic) => topic.id === 'grafica-funcion')!.active)
    assert.ok(isUnitV2Path('/matematika/dbh4-aplikatuak/grafica-funcion'))
    assert.ok(isUnitV2Path('/matematika/dbh4-aplikatuak/grafica-funcion/ariketak'))
})

test('grafikoa 4. DBH ap: diagnostic, practice, challenges and bank are consistent', () => {
    assert.equal(realsDiagnostic.length, 8)
    for (const question of realsDiagnostic) {
        assert.ok(topics.includes(question.topic), `${question.id}`)
        assert.ok(question.correctIndex < question.options.length)
        assert.equal(new Set(question.options.map((option) => option.es)).size, question.options.length)
    }
    // The right option is not always in the same place
    assert.ok(new Set(realsDiagnostic.map((question) => question.correctIndex)).size === 3)
    for (const stage of stages) {
        assert.equal(realsPractice.filter((item) => item.stage === stage).length, 4, stage)
        assert.ok(realsChallenges.some((item) => item.stage === stage), stage)
    }
    for (const item of [...realsPractice, ...realsChallenges]) {
        assert.ok(stages.includes(item.stage), `${item.id}`)
        assert.equal(checkAnswer(typed(item.expected, item.answerForm), item.expected, item.answerForm), 'correct', `${item.id}`)
        for (const language of ['eu', 'es', 'ar'] as const) assert.ok(item.explanation[language].length > 0 && item.prompt[language].length > 0 && item.hint[language].length > 0, `${item.id} ${language}`)
    }
    assert.deepEqual(realsExerciseBank.map((section) => section.id), stages)
    const ids = realsExerciseBank.flatMap((section) => section.items.map((item) => item.id))
    assert.deepEqual(ids, ids.map((_, index) => index + 1))
    for (const section of realsExerciseBank) {
        assert.ok(section.items.some((item) => item.difficulty === 'easy') && section.items.some((item) => item.difficulty === 'hard'), section.id)
        for (const item of section.items) {
            for (const language of ['eu', 'es', 'ar'] as const) assert.ok(item.question[language].length > 0 && item.solution[language].length > 0, `${item.id} ${language}`)
            if (item.answer) assert.equal(checkAnswer(typed(item.answer.expected, item.answer.form), item.answer.expected, item.answer.form), 'correct', `${item.id}`)
        }
    }
    assert.equal(new Set(realsChallenges.map((item) => item.id)).size, realsChallenges.length)
    assert.deepEqual([...new Set(realsChallenges.map((item) => item.points))].sort(), [10, 20, 30])
})

test('grafikoa 4. DBH ap: every formula renders in KaTeX', () => {
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

test('grafikoa 4. DBH ap: Arabic never keeps the decimal comma', () => {
    for (const text of allTexts()) assert.ok(!text.ar.includes('{,}'), text.ar)
})

test('grafikoa 4. DBH ap: every worked equality with numbers is right', () => {
    const texts = [
        ...realsPractice.flatMap((item) => [item.hint.es, item.explanation.es]),
        ...realsChallenges.flatMap((item) => [item.hint.es, item.explanation.es]),
        ...realsExerciseBank.flatMap((section) => section.items.map((item) => item.solution.es)),
        ...realsDiagnostic.flatMap((item) => [item.explanation.es])
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

test('grafikoa 4. DBH ap: every answer appears in its worked explanation or solution', () => {
    const shows = (text: string, value: FractionValue) => {
        const plain = written(value)
        const asFraction = `\\frac{${Math.abs(value.numerator)}}{${value.denominator}}`
        const minus = value.numerator < 0 ? [`-${plain}`, `-${asFraction}`] : [asFraction]
        const scientific = [`10^{${value.numerator}}`]
        const coefficient = [`${value.numerator}\\sqrt`, `${value.numerator}\\,\\%`, `${value.numerator}\\sqrt[3]`]
        // Thousands are grouped with thin spaces: 10\,000
        return [plain, ...minus, ...scientific, ...coefficient].some((candidate) => text.replace(/\\,/g, '').includes(candidate))
    }
    for (const item of [...realsPractice, ...realsChallenges]) assert.ok(shows(item.explanation.es, item.expected), `${item.id}: ${written(item.expected)}`)
    for (const section of realsExerciseBank) for (const item of section.items) if (item.answer) assert.ok(shows(item.solution.es, item.answer.expected), `bank ${item.id}`)
})

test('grafikoa 4. DBH ap: answers with units, signs and fractions are read', () => {
    for (const [input, value] of [['−12/7', [-12, 7]], ['-1/2', [-1, 2]], ['105,8 °F', [1058, 10]], ['27993,6 €', [279936, 10]], ['x = −5', [-5, 1]], ['25 m²', [25, 1]], ['0.4', [2, 5]]] as const) {
        assert.equal(checkAnswer(input, { numerator: value[0], denominator: value[1] }), 'correct', input)
    }
})

test('grafikoa 4. DBH ap: the graphs drawn with the exercises agree with their answers', () => {
    const { lineGraph, twoLinesGraph, parabolaGraph, hyperbolaGraph, rootGraph, exponentialGraph } = exerciseGraphs
    const answerOf = (id: number) => toNumber(realsPractice.find((item) => item.id === id)!.expected)
    const bankAnswer = (id: number) => toNumber(realsExerciseBank.flatMap((section) => section.items).find((item) => item.id === id)!.answer!.expected)
    // The named points A and B lie on the line and give its slope
    const [a, b] = lineGraph.points!.map((point) => point.at)
    const line = lineGraph.lines![0]
    for (const point of [a, b]) assert.equal(line.m * point[0] + line.n, point[1])
    assert.equal(toNumber(slopeOf(a, b)!), answerOf(6))
    // Two lines meet at the answer's ordinate
    const [l1, l2] = twoLinesGraph.lines!
    const x = (l2.n - l1.n) / (l1.m - l2.m)
    assert.equal(l1.m * x + l1.n, answerOf(8))
    // Parabola y = x² − 2x − 3
    assert.deepEqual(vertexOf(1, -2, -3), [1, answerOf(11)])
    assert.equal(specValue(parabolaGraph, 1), answerOf(11))
    assert.equal(quadraticRoots(1, -2, -3)[0], bankAnswer(25))
    assert.equal(specValue(parabolaGraph, -1), 0)
    // Hyperbola through P(2, 3)
    const p = hyperbolaGraph.points![0].at
    assert.equal(hyperbolaValue(6, 0, 0, p[0]), p[1])
    assert.equal(hyperbolaValue(p[0] * p[1], 0, 0, -3), answerOf(14))
    assert.ok(hyperbolaGraph.curves!.length === 2)
    // Root and exponential
    assert.equal(specValue(rootGraph, 5), answerOf(16))
    assert.equal(specValue(rootGraph, 0), 2)
    for (const point of rootGraph.points!) assert.equal(Math.sqrt(point.at[0] + 4), point.at[1])
    assert.equal(specValue(exponentialGraph, 0), bankAnswer(47))
    for (const point of exponentialGraph.points!) assert.equal(4 * 0.5 ** point.at[0], point.at[1])
    assert.equal(4 * 0.5 ** 3, answerOf(19))
    assert.equal(quadraticValue(-1, 10, 0, 5), answerOf(20))
})
