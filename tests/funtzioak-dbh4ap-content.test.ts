import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { courses } from '../src/data/courses.ts'
import { checkAnswer, hasTerminatingDecimal, toExactDecimal, toNumber, type FractionValue } from '../src/features/unit-v2/math/fraction.ts'
import { isUnitV2Path } from '../src/features/unit-v2/paths.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'

import { exerciseGraphs, functionsChallenges as realsChallenges, functionsDiagnostic as realsDiagnostic, functionsExerciseBank as realsExerciseBank, functionsPractice as realsPractice } from '../src/pages/dbh4-aplikatuak-funtzioak/content.ts'
import { averageRate, reduceToPeriod, smoothThrough, studyKnots } from '../src/pages/dbh4-aplikatuak-funtzioak/functions.ts'
import { localExtremes, specValue } from '../src/pages/dbh2-funtzioak-v2/functions.ts'

const stages = ['concept', 'domain', 'change', 'properties', 'study']
const topics = ['what-is', 'expressions', 'evaluate', 'domain-graph', 'domain-formula', 'intercepts', 'monotony', 'extrema', 'rate', 'continuity', 'periodicity', 'tendency', 'reading', 'study', 'modelling']

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

test('funtzioak 4. DBH ap: the unit is active and routed', () => {
    const course = courses.find((item) => item.id === 'dbh4-aplikatuak')!
    assert.ok(course.topics.find((topic) => topic.id === 'funciones')!.active)
    assert.ok(isUnitV2Path('/matematika/dbh4-aplikatuak/funciones'))
    assert.ok(isUnitV2Path('/matematika/dbh4-aplikatuak/funciones/ariketak'))
})

test('funtzioak 4. DBH ap: diagnostic, practice, challenges and bank are consistent', () => {
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

test('funtzioak 4. DBH ap: every formula renders in KaTeX', () => {
    let formulas = 0
    for (const text of allTexts()) {
        for (const language of ['eu', 'es', 'ar'] as const) {
            for (const [, formula] of text[language].matchAll(/\$([^$]+)\$/g)) {
                katex.renderToString(formula, { throwOnError: true, strict: 'error' })
                formulas += 1
            }
        }
    }
    assert.ok(formulas > 400, `only ${formulas}`)
})

test('funtzioak 4. DBH ap: Arabic never keeps the decimal comma', () => {
    for (const text of allTexts()) assert.ok(!text.ar.includes('{,}'), text.ar)
})

test('funtzioak 4. DBH ap: every worked equality with numbers is right', () => {
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

test('funtzioak 4. DBH ap: every answer appears in its worked explanation or solution', () => {
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

test('funtzioak 4. DBH ap: answers with units, signs and fractions are read', () => {
    for (const [input, value] of [['−20', [-20, 1]], ['-1/3', [-1, 3]], ['120 mg/dl', [120, 1]], ['11,7 €', [117, 10]], ['x = 4', [4, 1]], ['50 m/min', [50, 1]], ['0.25', [1, 4]]] as const) {
        assert.equal(checkAnswer(input, { numerator: value[0], denominator: value[1] }), 'correct', input)
    }
})

test('funtzioak 4. DBH ap: the graphs drawn with the exercises agree with their answers', () => {
    const { domainGraph, studyGraph, cubicGraph, parabolaGraph, periodicGraph, glucoseGraph, speedGraph, tapGraph, brokenGraph } = exerciseGraphs
    const answerOf = (list: Array<{ id: number; expected: { numerator: number; denominator: number } }>, id: number) => {
        const value = list.find((item) => item.id === id)!.expected
        return value.numerator / value.denominator
    }
    const bankAnswer = (id: number) => {
        const value = realsExerciseBank.flatMap((section) => section.items).find((item) => item.id === id)!.answer!.expected
        return value.numerator / value.denominator
    }
    const ys = (spec: typeof domainGraph) => spec.curves!.flatMap((curve) => curve.points.map((point) => point[1] * (spec.yUnit ?? 1)))
    // A smooth curve never goes above or below its knots
    const smooth = smoothThrough(studyKnots)
    assert.equal(Math.max(...smooth.map((point) => point[1])), 3)
    assert.equal(Math.min(...smooth.map((point) => point[1])), 0)
    assert.equal(Math.max(...ys(domainGraph)), answerOf(realsPractice, 5))
    assert.equal(Math.min(...ys(domainGraph)), -2)
    const study = localExtremes(studyKnots)
    assert.equal(study.maxima.length, answerOf(realsPractice, 10))
    assert.equal(study.minima.length, bankAnswer(22))
    assert.equal(Math.max(...ys(studyGraph)), bankAnswer(29))
    // The cubic peaks at x = −2
    const cubic = cubicGraph.curves![0].points
    const peak = cubic.filter((point) => point[0] < 0).reduce((best, point) => (point[1] > best[1] ? point : best))
    assert.equal(peak[0], answerOf(realsPractice, 9))
    assert.equal(peak[1], 2)
    assert.equal(toNumber(averageRate(0, specValue(parabolaGraph, 0)!, 2, specValue(parabolaGraph, 2)!)), answerOf(realsPractice, 11))
    assert.equal(toNumber(averageRate(1, specValue(parabolaGraph, 1)!, 3, specValue(parabolaGraph, 3)!)), bankAnswer(23))
    assert.equal(toNumber(averageRate(1, specValue(parabolaGraph, 1)!, 4, specValue(parabolaGraph, 4)!)), bankAnswer(24))
    // Periodic graph: period 4, f(21) and f(42)
    assert.equal(specValue(periodicGraph, 4), specValue(periodicGraph, 0))
    assert.equal(specValue(periodicGraph, reduceToPeriod(21, answerOf(realsPractice, 14))), answerOf(realsPractice, 15))
    assert.equal(specValue(periodicGraph, reduceToPeriod(42, 4)), bankAnswer(35))
    assert.equal(Math.max(...ys(glucoseGraph)), answerOf(realsPractice, 17))
    assert.ok(Math.abs(Math.min(...ys(glucoseGraph)) - 80) < 1e-9)
    assert.equal(specValue(glucoseGraph, bankAnswer(41)), 80)
    assert.equal(specValue(speedGraph, 15), answerOf(realsPractice, 18))
    assert.equal(Math.max(...ys(speedGraph)), bankAnswer(42))
    assert.equal(Math.max(...ys(tapGraph)), bankAnswer(12))
    assert.equal(brokenGraph.points!.find((point) => !point.hollow && point.at[0] === 2)!.at[1], bankAnswer(32))
})
