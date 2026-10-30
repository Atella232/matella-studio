import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { courses } from '../src/data/courses.ts'
import { checkAnswer, hasTerminatingDecimal, toExactDecimal, type FractionValue } from '../src/features/unit-v2/math/fraction.ts'
import { isUnitV2Path } from '../src/features/unit-v2/paths.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import {
    polynomialsFractionsChallenges as challenges,
    polynomialsFractionsDiagnostic as diagnostic,
    polynomialsFractionsExerciseBank as bank,
    polynomialsFractionsPractice as practice
} from '../src/pages/dbh4-akademikoak-polinomioak/content.ts'
import { add, deflate, divide, evaluate as valueAt, fromRoots, integerRoots, multiply, polyLatex, power, ruffini, tartaglia } from '../src/pages/dbh4-akademikoak-polinomioak/polynomials.ts'

const stages = ['operations', 'division', 'factor', 'fractions', 'operate']
const topics = ['polynomials', 'identities', 'binomial', 'long-division', 'ruffini', 'remainder', 'roots', 'factorize', 'gcd-lcm', 'algebraic-fractions', 'simplify', 'equivalent', 'add-fractions', 'multiply-fractions', 'combined']

const typed = (value: FractionValue, form?: string) => (hasTerminatingDecimal(value) && (form !== 'simplified' || value.denominator === 1) ? toExactDecimal(value)! : `${value.numerator}/${value.denominator}`)
const written = (value: FractionValue) => (hasTerminatingDecimal(value) ? toExactDecimal(value)!.replace(',', '{,}') : `\\frac{${Math.abs(value.numerator)}}{${value.denominator}}`)

/** Rewrites base^(n) as Math.pow(base,(n)), the base being a number or a (possibly nested) bracket */
function powers(js: string): string {
    let index = js.indexOf('^(')
    while (index !== -1) {
        let start = index - 1
        if (js[start] === ')') {
            let depth = 0
            for (; start >= 0; start -= 1) {
                if (js[start] === ')') depth += 1
                if (js[start] === '(') depth -= 1
                if (depth === 0) break
            }
        } else {
            while (start > 0 && /[\d.]/.test(js[start - 1])) start -= 1
        }
        let end = index + 1
        for (let depth = 0; end < js.length; end += 1) {
            if (js[end] === '(') depth += 1
            if (js[end] === ')') depth -= 1
            if (depth === 0) break
        }
        js = `${js.slice(0, start)}Math.pow(${js.slice(start, index)},${js.slice(index + 1, end + 1)})${js.slice(end + 1)}`
        index = js.indexOf('^(')
    }
    return js
}

/** Arithmetic in LaTeX where x (and only x) may appear: x is replaced by the given value */
function evaluate(latex: string, x?: number): number | null {
    let js = latex
        .replace(/\\,/g, '')
        .replace(/\\left|\\right/g, '')
        .replace(/(\d)\{,\}(\d)/g, '$1.$2')
        .replace(/\\cdot/g, '*')
        .replace(/\\mathbin\{:\}|:/g, '/')
        .replace(/\s+/g, '')
    if (x !== undefined) js = js.replace(/x/g, `(${x})`)
    for (let pass = 0; pass < 5; pass += 1) js = js.replace(/\\frac\{([^{}]+)\}\{([^{}]+)\}/g, '(($1)/($2))').replace(/\^\{([^{}]+)\}/g, '^($1)')
    js = powers(js)
    js = js.replace(/\)\(/g, ')*(').replace(/(\d)\(/g, '$1*(').replace(/(\d)Math/g, '$1*Math').replace(/\)Math/g, ')*Math').replace(/\)(\d)/g, ')*$1')
    if (!/^(?:[\d+\-*/().,]|Math\.pow)+$/.test(js) || !/\d/.test(js)) return null
    try {
        const value = Function('Math', `return ${js}`)(Math) as number
        return Number.isFinite(value) ? value : null
    } catch {
        return null
    }
}

const allTexts = (): LocalizedText[] => [
    ...diagnostic.flatMap((item) => [item.prompt, item.explanation, ...item.options]),
    ...[...practice, ...challenges].flatMap((item) => [item.prompt, item.hint, item.explanation]),
    ...bank.flatMap((section) => [section.title, ...section.items.flatMap((item) => [item.question, item.solution])])
]

const workedTexts = () => [
    ...practice.flatMap((item) => [item.hint.es, item.explanation.es]),
    ...challenges.flatMap((item) => [item.hint.es, item.explanation.es]),
    ...bank.flatMap((section) => section.items.map((item) => item.solution.es)),
    ...diagnostic.flatMap((item) => [item.explanation.es])
]

/** Every equality inside the worked texts, split at \to and \qquad */
const equalities = () => workedTexts().flatMap((text) => [...text.matchAll(/\$([^$]+)\$/g)].flatMap(([, formula]) => formula.split(/\\qquad|\\quad|\\ \\to\\ |\\to/)))

test('polinomioak 4. DBH ak: the unit is active and routed', () => {
    const course = courses.find((item) => item.id === 'dbh4-akademikoak')!
    assert.ok(course.topics.find((topic) => topic.id === 'polinomios-fracciones')!.active)
    assert.ok(isUnitV2Path('/matematika/dbh4-akademikoak/polinomios-fracciones'))
    assert.ok(isUnitV2Path('/matematika/dbh4-akademikoak/polinomios-fracciones/ariketak'))
})

test('polinomioak 4. DBH ak: diagnostic, practice, challenges and bank are consistent', () => {
    assert.equal(diagnostic.length, 8)
    for (const question of diagnostic) {
        assert.ok(topics.includes(question.topic), `${question.id}`)
        assert.ok(question.correctIndex < question.options.length)
        assert.equal(new Set(question.options.map((option) => option.es)).size, question.options.length)
    }
    assert.ok(new Set(diagnostic.map((question) => question.correctIndex)).size === 3)
    for (const stage of stages) {
        assert.equal(practice.filter((item) => item.stage === stage).length, 4, stage)
        assert.equal(challenges.filter((item) => item.stage === stage).length, 3, stage)
    }
    for (const item of [...practice, ...challenges]) {
        assert.ok(stages.includes(item.stage), `${item.id}`)
        assert.equal(checkAnswer(typed(item.expected, item.answerForm), item.expected, item.answerForm), 'correct', `${item.id}`)
        for (const language of ['eu', 'es', 'en', 'ar'] as const) assert.ok(item.explanation[language].length > 0 && item.prompt[language].length > 0 && item.hint[language].length > 0, `${item.id} ${language}`)
    }
    assert.deepEqual(bank.map((section) => section.id), stages)
    const ids = bank.flatMap((section) => section.items.map((item) => item.id))
    assert.deepEqual(ids, ids.map((_, index) => index + 1))
    assert.equal(ids.length, 50)
    for (const section of bank) {
        assert.ok(section.items.some((item) => item.difficulty === 'easy') && section.items.some((item) => item.difficulty === 'hard'), section.id)
        for (const item of section.items) {
            for (const language of ['eu', 'es', 'en', 'ar'] as const) assert.ok(item.question[language].length > 0 && item.solution[language].length > 0, `${item.id} ${language}`)
            if (item.answer) assert.equal(checkAnswer(typed(item.answer.expected, item.answer.form), item.answer.expected, item.answer.form), 'correct', `${item.id}`)
        }
    }
    assert.equal(new Set(challenges.map((item) => item.id)).size, challenges.length)
    assert.deepEqual([...new Set(challenges.map((item) => item.points))].sort(), [10, 20, 30])
})

test('polinomioak 4. DBH ak: every formula renders in KaTeX', () => {
    let formulas = 0
    for (const text of allTexts()) {
        for (const language of ['eu', 'es', 'en', 'ar'] as const) {
            for (const [, formula] of text[language].matchAll(/\$([^$]+)\$/g)) {
                katex.renderToString(formulaFor(language, formula), { throwOnError: true, strict: 'error' })
                assert.ok(!/[؀-ۿ]/.test(formula), formula)
                formulas += 1
            }
        }
    }
    assert.ok(formulas > 300, `only ${formulas}`)
})

test('polinomioak 4. DBH ak: Arabic never keeps the decimal comma', () => {
    for (const text of allTexts()) assert.ok(!text.ar.includes('{,}'), text.ar)
})

test('polinomioak 4. DBH ak: every worked equality with numbers is right', () => {
    let checked = 0
    for (const part of equalities()) {
        if (part.includes('\\approx') || part.includes('\\ldots')) continue
        const values = part.replace(/^[a-z]\)\s*/, '').split('=').map((side) => evaluate(side)).filter((value): value is number => value !== null)
        if (values.length < 2) continue
        assert.ok(values.every((value) => Math.abs(value - values[0]) < 1e-9 * Math.max(1, Math.abs(values[0]))), `${part} → ${values.join(' / ')}`)
        checked += 1
    }
    assert.ok(checked >= 30, `only ${checked} checked`)
})

test('polinomioak 4. DBH ak: every identity in x holds for several values of x', () => {
    let checked = 0
    for (const part of equalities()) {
        // a\mathbin{:}2x means a monomial divided by 2x, which plain arithmetic would read as (a : 2)·x
        if (part.includes('\\mathbin{:}')) continue
        const sides = part.split('=')
        // Only identities: every side depends on x and on no other letter
        if (sides.length < 2 || !sides.every((side) => /x/.test(side) && !/[a-wyzA-Z]/.test(side.replace(/\\(?:frac|cdot|left|right|mathbin)/g, '')))) continue
        for (const x of [1.7, -2.3, 3.1, 0.6]) {
            const values = sides.map((side) => evaluate(side, x))
            if (values.some((value) => value === null)) assert.fail(`cannot read ${part}`)
            assert.ok(values.every((value) => Math.abs(value! - values[0]!) < 1e-7 * Math.max(1, Math.abs(values[0]!))), `${part} at x = ${x} → ${values.join(' / ')}`)
        }
        checked += 1
    }
    assert.ok(checked >= 40, `only ${checked} identities checked`)
})

test('polinomioak 4. DBH ak: every answer appears in its worked explanation or solution', () => {
    const shows = (text: string, value: FractionValue) => {
        const plain = written(value)
        const asFraction = `\\frac{${Math.abs(value.numerator)}}{${value.denominator}}`
        const minus = value.numerator < 0 ? [`-${asFraction}`] : [asFraction]
        return [plain, ...minus].some((candidate) => text.replace(/\\,/g, '').includes(candidate))
    }
    for (const item of [...practice, ...challenges]) assert.ok(shows(item.explanation.es, item.expected), `${item.id}: ${written(item.expected)}`)
    for (const section of bank) for (const item of section.items) if (item.answer) assert.ok(shows(item.solution.es, item.answer.expected), `bank ${item.id}`)
})

test('polinomioak 4. DBH ak: the polynomial helpers', () => {
    assert.deepEqual(multiply([3, 0, 2, -4], [-2, 5]), [-6, 15, -4, 18, -20])
    assert.deepEqual(add([1, -3, 0, 0, 5, 9], [5, 3, -11]), [1, -3, 0, 5, 8, -2])
    assert.deepEqual(power([1, -2], 4), [1, -8, 24, -32, 16])
    assert.deepEqual(tartaglia(5), [1, 5, 10, 10, 5, 1])
    assert.deepEqual(ruffini([1, 3, -3, 3, -4], -1).bottom, [1, 2, -5, 8, -12])
    assert.deepEqual(deflate([4, 12, 5, -6], 0.5), [4, 14, 12])
    assert.equal(valueAt([7, 0, -5, 2, -24], 10), 69496)
    assert.deepEqual(divide([6, -1, 4, 5], [2, 1]), { quotient: [3, -2, 3], remainder: [2] })
    assert.deepEqual(divide([1, -2, 0, 3], [1, 0, 1]), { quotient: [1, -2], remainder: [-1, 5] })
    assert.deepEqual(fromRoots([3, -2, -1]), [1, 0, -7, -6])
    assert.deepEqual(integerRoots([1, 2, -23, -60, 0]), [-4, -3, 0, 5])
    assert.deepEqual(integerRoots([1, -7, 8, 16]), [-1, 4, 4])
    assert.deepEqual(integerRoots([1, 0, 2, -1, 8]), [])
    assert.equal(polyLatex([1, 0, -7, -6]), 'x^{3}-7x-6')
    assert.equal(polyLatex([-1, 1, 0]), '-x^{2}+x')
})
