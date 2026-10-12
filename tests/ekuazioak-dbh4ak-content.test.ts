import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import katex from 'katex'
import { courses } from '../src/data/courses.ts'
import { checkAnswer, hasTerminatingDecimal, toExactDecimal, type FractionValue } from '../src/features/unit-v2/math/fraction.ts'
import { isUnitV2Path } from '../src/features/unit-v2/paths.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import {
    equationsInequalitiesChallenges as challenges,
    equationsInequalitiesDiagnostic as diagnostic,
    equationsInequalitiesExerciseBank as bank,
    equationsInequalitiesPractice as practice
} from '../src/pages/dbh4-akademikoak-ekuazioak/content.ts'

const stages = ['quadratic', 'other', 'exponential', 'inequalities', 'quadratic-inequalities']
const topics = ['quadratic-formula', 'roots-relations', 'quadratic-problems', 'biquadratic', 'factored', 'rational', 'radical', 'exponential', 'logarithmic', 'inequalities', 'linear-inequality', 'inequality-problems', 'quadratic-inequality', 'graphic-inequality', 'inequality-systems']

const typed = (value: FractionValue, form?: string) => (hasTerminatingDecimal(value) && (form !== 'simplified' || value.denominator === 1) ? toExactDecimal(value)! : `${value.numerator}/${value.denominator}`)
const written = (value: FractionValue) => (hasTerminatingDecimal(value) ? toExactDecimal(value)!.replace(',', '{,}') : `\\frac{${Math.abs(value.numerator)}}{${value.denominator}}`)

/** Rewrites base^(n) as Math.pow(base,(n)), the base being a number or a (possibly nested) bracket */
function powers(js: string): string {
    let index = js.indexOf('^(')
    while (index !== -1) {
        let start = index - 1
        if (js[start] === ')') {
            for (let depth = 0; start >= 0; start -= 1) {
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
    for (let pass = 0; pass < 5; pass += 1) {
        js = js
            .replace(/\\frac\{([^{}]+)\}\{([^{}]+)\}/g, '(($1)/($2))')
            .replace(/\\sqrt\{([^{}]+)\}/g, 'Math.sqrt($1)')
            .replace(/\^\{([^{}]+)\}/g, '^($1)')
    }
    js = powers(js)
    js = js.replace(/\)\(/g, ')*(').replace(/(\d)\(/g, '$1*(').replace(/(\d)Math/g, '$1*Math').replace(/\)Math/g, ')*Math').replace(/\)(\d)/g, ')*$1')
    if (!/^(?:[\d+\-*/().,]|Math\.(?:pow|sqrt))+$/.test(js) || !/\d/.test(js)) return null
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
/** The content and the lessons (read as text: they are TSX), where every equation must appear */
const everything = () => `${allTexts().map((text) => text.es).join(' ')} ${readFileSync('src/pages/dbh4-akademikoak-ekuazioak/lessons.tsx', 'utf8').replace(/\\\\/g, '\\')}`

test('ekuazioak 4. DBH ak: the unit is active and routed', () => {
    const course = courses.find((item) => item.id === 'dbh4-akademikoak')!
    assert.ok(course.topics.find((topic) => topic.id === 'ecuaciones-inecuaciones')!.active)
    assert.ok(isUnitV2Path('/matematika/dbh4-akademikoak/ecuaciones-inecuaciones'))
    assert.ok(isUnitV2Path('/matematika/dbh4-akademikoak/ecuaciones-inecuaciones/ariketak'))
})

test('ekuazioak 4. DBH ak: diagnostic, practice, challenges and bank are consistent', () => {
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
        for (const language of ['eu', 'es', 'ar'] as const) assert.ok(item.explanation[language].length > 0 && item.prompt[language].length > 0 && item.hint[language].length > 0, `${item.id} ${language}`)
    }
    assert.deepEqual(bank.map((section) => section.id), stages)
    const ids = bank.flatMap((section) => section.items.map((item) => item.id))
    assert.deepEqual(ids, ids.map((_, index) => index + 1))
    assert.equal(ids.length, 50)
    for (const section of bank) {
        assert.ok(section.items.some((item) => item.difficulty === 'easy') && section.items.some((item) => item.difficulty === 'hard'), section.id)
        for (const item of section.items) {
            for (const language of ['eu', 'es', 'ar'] as const) assert.ok(item.question[language].length > 0 && item.solution[language].length > 0, `${item.id} ${language}`)
            if (item.answer) assert.equal(checkAnswer(typed(item.answer.expected, item.answer.form), item.answer.expected, item.answer.form), 'correct', `${item.id}`)
        }
    }
    assert.equal(new Set(challenges.map((item) => item.id)).size, challenges.length)
    assert.deepEqual([...new Set(challenges.map((item) => item.points))].sort(), [10, 20, 30])
})

test('ekuazioak 4. DBH ak: every formula renders in KaTeX', () => {
    let formulas = 0
    for (const text of allTexts()) {
        for (const language of ['eu', 'es', 'ar'] as const) {
            for (const [, formula] of text[language].matchAll(/\$([^$]+)\$/g)) {
                katex.renderToString(formula, { throwOnError: true, strict: 'error' })
                assert.ok(!/[؀-ۿ]/.test(formula), formula)
                formulas += 1
            }
        }
    }
    assert.ok(formulas > 300, `only ${formulas}`)
})

test('ekuazioak 4. DBH ak: Arabic never keeps the decimal comma', () => {
    for (const text of allTexts()) assert.ok(!text.ar.includes('{,}'), text.ar)
})

test('ekuazioak 4. DBH ak: every worked equality with numbers is right', () => {
    const texts = [
        ...practice.flatMap((item) => [item.hint.es, item.explanation.es]),
        ...challenges.flatMap((item) => [item.hint.es, item.explanation.es]),
        ...bank.flatMap((section) => section.items.map((item) => item.solution.es)),
        ...diagnostic.flatMap((item) => [item.explanation.es])
    ]
    let checked = 0
    for (const text of texts) {
        for (const [, formula] of text.matchAll(/\$([^$]+)\$/g)) {
            if (formula.includes('\\approx') || formula.includes('\\ldots')) continue
            for (const part of formula.split(/\\qquad|\\quad|\\ \\to\\ |\\to/)) {
                const values = part.split('=').map((side) => evaluate(side)).filter((value): value is number => value !== null)
                if (values.length < 2) continue
                assert.ok(values.every((value) => Math.abs(value - values[0]) < 1e-9 * Math.max(1, Math.abs(values[0]))), `${part} → ${values.join(' / ')}`)
                checked += 1
            }
        }
    }
    assert.ok(checked >= 30, `only ${checked} checked`)
})

/** Every equation of the unit, its solutions and the values that must fail (false solutions) */
const equations: Array<[string, number[], number[]]> = [
    ['3x^{2}-4x-4=0', [2, -2 / 3], []],
    ['10x^{2}-3x-1=0', [1 / 2, -1 / 5], []],
    ['2x^{2}-50=0', [5, -5], []],
    ['(x+6)^{2}=x^{2}+(x+3)^{2}', [9], []],
    ['x(x+4)=60', [6], []],
    ['x^{4}-13x^{2}+36=0', [3, -3, 2, -2], []],
    ['4x^{4}+19x^{2}-5=0', [1 / 2, -1 / 2], []],
    ['x^{4}-5x^{2}+4=0', [1, -1, 2, -2], []],
    ['3x^{4}-12x^{2}=0', [0, 2, -2], []],
    ['x^{3}-4x^{2}+x+6=0', [-1, 2, 3], []],
    ['x^{3}-7x-6=0', [-1, -2, 3], []],
    ['x^{3}-x^{2}-4x+4=0', [1, 2, -2], []],
    ['\\frac{1}{x}+\\frac{1}{x+1}=\\frac{3}{2}', [1, -2 / 3], []],
    ['\\frac{x}{x-2}+\\frac{2}{x}=\\frac{4}{x(x-2)}', [-4], [2]],
    ['\\frac{6}{x}-\\frac{6}{x+1}=1', [2, -3], []],
    ['\\frac{x+1}{x-1}=\\frac{2}{x^{2}-1}+1', [0], []],
    ['\\frac{x}{x-3}=\\frac{3}{x-3}+2', [], [3]],
    ['\\sqrt{20-x}=x-8', [11], [4]],
    ['\\sqrt{4x+5}=x+2', [1, -1], []],
    ['x-1=\\sqrt{2x-3}', [2], []],
    ['\\sqrt{x+2}=x', [2], [-1]],
    ['3^{x+1}+3^{x}=108', [3], []],
    ['2^{x+1}=\\frac{1}{8}', [-4], []],
    ['2^{x}+2^{x+3}=36', [2], []],
    ['4^{x}+4^{x+2}=272', [2], []],
    ['3^{x^{2}-5}=81', [3, -3], []],
    ['3^{2x}-10\\cdot 3^{x}+9=0', [2, 0], []],
    ['x^{2}+3x-70=0', [7], []],
    ['x^{2}+(17-x)^{2}=169', [12, 5], []],
    ['x(x+1)=156', [12], []]
]

test('ekuazioak 4. DBH ak: every equation holds at its solutions and fails at the false ones', () => {
    const text = everything()
    for (const [equation, solutions, wrong] of equations) {
        assert.ok(text.includes(equation), `not in the unit: ${equation}`)
        const [left, right] = equation.split('=')
        const gap = (x: number) => {
            const a = evaluate(left, x)
            const b = evaluate(right, x)
            return a === null || b === null ? null : Math.abs(a - b)
        }
        for (const x of solutions) assert.ok((gap(x) ?? 1) < 1e-9, `${equation} at ${x}`)
        for (const x of wrong) {
            const value = gap(x)
            assert.ok(value === null || value > 1e-9, `${equation} should fail at ${x}`)
        }
    }
})

/** Inequalities of the unit with values inside and outside their solution */
const inequalities: Array<[string, number[], number[]]> = [
    ['x^{2}-8x<12', [0, 2, 1.1], [-5, 10]],
    ['3x+2<10', [0, 1, 2], [3]],
    ['\\frac{x-1}{2}-\\frac{x+3}{3}\\ge 1', [15, 20], [14]],
    ['-2x+7>\\frac{x}{2}-3', [3, 0], [4, 5]],
    ['x^{2}-2x-3\\le 0', [-1, 0, 3], [-2, 4]],
    ['x^{2}-x-6<0', [-1, 2], [-2, 3]],
    ['x^{2}-x-6>0', [-3, 4], [0, 3]],
    ['x^{2}-4<0', [-1, 0, 1], [-2, 2]],
    ['x^{2}-5x\\le 0', [0, 5], [-1, 6]],
    ['x^{2}-9\\le 0', [-3, 3], [-4, 4]],
    ['2x+5\\ge 25', [10], [9]],
    ['5-2x\\ge 1', [2], [3]],
    ['\\frac{x}{3}-1<\\frac{x}{2}', [-5], [-6]],
    ['2(x-1)-3(x+2)\\le x', [-4], [-5]],
    ['x^{2}-5x+4\\le -2', [2, 3], [1, 4]]
]

test('ekuazioak 4. DBH ak: every inequality holds inside its solution and fails outside', () => {
    const text = everything()
    for (const [inequality, inside, outside] of inequalities) {
        assert.ok(text.includes(inequality), `not in the unit: ${inequality}`)
        const [, left, sign, right] = inequality.match(/^(.+?)(\\le|\\ge|<|>)(.+)$/)!
        const holds = (x: number) => {
            const a = evaluate(left, x)!
            const b = evaluate(right, x)!
            return sign === '<' ? a < b : sign === '>' ? a > b : sign === '\\le' ? a <= b + 1e-12 : a >= b - 1e-12
        }
        for (const x of inside) assert.ok(holds(x), `${inequality} at ${x}`)
        for (const x of outside) assert.ok(!holds(x), `${inequality} should fail at ${x}`)
    }
})

test('ekuazioak 4. DBH ak: every answer appears in its worked explanation or solution', () => {
    const shows = (text: string, value: FractionValue) => {
        const plain = written(value)
        const asFraction = `\\frac{${Math.abs(value.numerator)}}{${value.denominator}}`
        const minus = value.numerator < 0 ? [`-${asFraction}`] : [asFraction]
        return [plain, ...minus].some((candidate) => text.replace(/\\,/g, '').includes(candidate))
    }
    for (const item of [...practice, ...challenges]) assert.ok(shows(item.explanation.es, item.expected), `${item.id}: ${written(item.expected)}`)
    for (const section of bank) for (const item of section.items) if (item.answer) assert.ok(shows(item.solution.es, item.answer.expected), `bank ${item.id}`)
})
