import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { courses } from '../src/data/courses.ts'
import { checkAnswer, hasTerminatingDecimal, toExactDecimal, type FractionValue } from '../src/features/unit-v2/math/fraction.ts'
import { isUnitV2Path } from '../src/features/unit-v2/paths.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { bach2DefiniteChallenges, bach2DefiniteDiagnostic, bach2DefiniteExerciseBank, bach2DefinitePractice } from '../src/pages/batx2-zientziak-mugatua/content.ts'

const stages = ['review', 'sums', 'fundamental', 'techniques', 'problems']
const topics = ['barrow-review', 'areas-review', 'lower-upper', 'limit-sums', 'mean-value', 'area-function', 'upper-limit', 'barrow-conditions', 'definite-change', 'definite-parts', 'piecewise', 'three-curves', 'parameter', 'integral-extrema', 'revolution']

const typed = (value: FractionValue, form?: string) => (hasTerminatingDecimal(value) && (form !== 'simplified' || value.denominator === 1) ? toExactDecimal(value)! : `${value.numerator}/${value.denominator}`)
const written = (value: FractionValue) => (hasTerminatingDecimal(value) ? toExactDecimal(value)!.replace(',', '{,}') : `\\frac{${Math.abs(value.numerator)}}{${value.denominator}}`)
const valueOf = (value: FractionValue) => value.numerator / value.denominator

/** Plain arithmetic in LaTeX (no letters): powers, fractions, roots, products, divisions and decimal commas */
function evaluate(latex: string): number | null {
    let js = latex
        .replace(/\\,/g, '')
        .replace(/\\left|\\right/g, '')
        .replace(/(\d)\{,\}(\d)/g, '$1.$2')
        .replace(/\\cdot/g, '*')
        .replace(/\\div/g, '/')
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
    ...bach2DefiniteDiagnostic.flatMap((item) => [item.prompt, item.explanation, ...item.options]),
    ...[...bach2DefinitePractice, ...bach2DefiniteChallenges].flatMap((item) => [item.prompt, item.hint, item.explanation]),
    ...bach2DefiniteExerciseBank.flatMap((section) => [section.title, ...section.items.flatMap((item) => [item.question, item.solution])])
]

test('mugatua batx2 z: the unit is active and routed', () => {
    const course = courses.find((item) => item.id === 'batx2-zientziak')!
    assert.ok(course.topics.find((topic) => topic.id === 'integral-definida')!.active)
    assert.ok(isUnitV2Path('/matematika/batx2-zientziak/integral-definida'))
    assert.ok(isUnitV2Path('/matematika/batx2-zientziak/integral-definida/ariketak'))
})

test('mugatua batx2 z: diagnostic, practice, challenges and bank are consistent', () => {
    assert.equal(bach2DefiniteDiagnostic.length, 8)
    assert.deepEqual(bach2DefiniteDiagnostic.map((question) => question.id), [127001, 127002, 127003, 127004, 127005, 127006, 127007, 127008])
    for (const question of bach2DefiniteDiagnostic) {
        assert.ok(topics.includes(question.topic), `${question.id}`)
        assert.ok(question.correctIndex < question.options.length)
        assert.equal(new Set(question.options.map((option) => option.es)).size, question.options.length)
    }
    // The right option is not always in the same place
    assert.ok(new Set(bach2DefiniteDiagnostic.map((question) => question.correctIndex)).size === 3)
    for (const stage of stages) {
        assert.equal(bach2DefinitePractice.filter((item) => item.stage === stage).length, 4, stage)
        assert.equal(bach2DefiniteChallenges.filter((item) => item.stage === stage).length, 3, stage)
    }
    for (const item of [...bach2DefinitePractice, ...bach2DefiniteChallenges]) {
        assert.ok(stages.includes(item.stage), `${item.id}`)
        assert.equal(checkAnswer(typed(item.expected, item.answerForm), item.expected, item.answerForm), 'correct', `${item.id}`)
        for (const language of ['eu', 'es', 'en', 'ar'] as const) assert.ok(item.explanation[language].length > 0 && item.prompt[language].length > 0 && item.hint[language].length > 0, `${item.id} ${language}`)
    }
    assert.deepEqual(bach2DefiniteExerciseBank.map((section) => section.id), stages)
    const ids = bach2DefiniteExerciseBank.flatMap((section) => section.items.map((item) => item.id))
    assert.deepEqual(ids, ids.map((_, index) => index + 1))
    assert.equal(ids.length, 50)
    for (const section of bach2DefiniteExerciseBank) {
        assert.ok(section.items.some((item) => item.difficulty === 'easy') && section.items.some((item) => item.difficulty === 'hard'), section.id)
        for (const item of section.items) {
            for (const language of ['eu', 'es', 'en', 'ar'] as const) assert.ok(item.question[language].length > 0 && item.solution[language].length > 0, `${item.id} ${language}`)
            if (item.answer) assert.equal(checkAnswer(typed(item.answer.expected, item.answer.form), item.answer.expected, item.answer.form), 'correct', `${item.id}`)
        }
    }
    assert.equal(new Set(bach2DefiniteChallenges.map((item) => item.id)).size, bach2DefiniteChallenges.length)
    assert.deepEqual([...new Set(bach2DefiniteChallenges.map((item) => item.points))].sort(), [10, 20, 30])
})

test('mugatua batx2 z: every formula renders in KaTeX', () => {
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

test('mugatua batx2 z: each language in its own place, and Arabic never keeps the decimal comma', () => {
    for (const text of allTexts()) {
        assert.ok(!text.ar.includes('{,}'), text.ar)
        const words = (value: string) => value.replace(/\$[^$]+\$/g, ' ')
        if (/[a-zA-Z]{4}/.test(words(text.es))) assert.ok(/[؀-ۿ]/.test(words(text.ar)), `not Arabic: ${text.ar}`)
        for (const language of ['eu', 'es', 'en'] as const) assert.ok(!/[؀-ۿ]/.test(text[language]), `Arabic in ${language}: ${text[language]}`)
        if (/[a-zA-Z]{6}/.test(words(text.es))) assert.ok(text.eu !== text.es && text.en !== text.es, `copied from Spanish: ${text.es}`)
    }
})

test('mugatua batx2 z: Basque glues no case ending to a number', () => {
    for (const text of allTexts()) assert.ok(!/\d[a-zñ]/.test(text.eu.replace(/\$[^$]+\$/g, '')) && !/\$(?:ri|ren|rekin|z|ra|tik|ei|ek|ak|en|ko|an)(?![a-zA-Z])/.test(text.eu), text.eu)
})

test('mugatua batx2 z: every worked equality with numbers is right', () => {
    const texts = [
        ...bach2DefinitePractice.flatMap((item) => [item.hint.es, item.explanation.es]),
        ...bach2DefiniteChallenges.flatMap((item) => [item.hint.es, item.explanation.es]),
        ...bach2DefiniteExerciseBank.flatMap((section) => section.items.map((item) => item.solution.es)),
        ...bach2DefiniteDiagnostic.flatMap((item) => [item.explanation.es])
    ]
    let checked = 0
    for (const text of texts) {
        for (const [, formula] of text.matchAll(/\$([^$]+)\$/g)) {
            if (formula.includes('\\approx') || formula.includes('\\overline') || formula.includes('\\ldots')) continue
            for (const part of formula.replace(/\\begin\{[a-z]+\}|\\end\{[a-z]+\}|&/g, ' ').split(/\\\\|\\qquad|\\quad|\\ \\to\\ |\\to/)) {
                const values = part.replace(/^[a-z]\)\s*/, '').split('=').map(evaluate).filter((value): value is number => value !== null)
                if (values.length < 2) continue
                assert.ok(values.every((value) => Math.abs(value - values[0]) < 1e-9 * Math.max(1, Math.abs(values[0]))), `${part} → ${values.join(' / ')}`)
                checked += 1
            }
        }
    }
    assert.ok(checked >= 3, `only ${checked} checked`)
})

test('mugatua batx2 z: every answer appears in its worked explanation or solution', () => {
    const shows = (text: string, value: FractionValue) => {
        const plain = written(value)
        const asFraction = `\\frac{${Math.abs(value.numerator)}}{${value.denominator}}`
        const minus = value.numerator < 0 ? [`-${plain}`, `-${asFraction}`] : [asFraction]
        return [plain, ...minus].some((candidate) => text.replace(/\\,/g, '').includes(candidate))
    }
    for (const item of [...bach2DefinitePractice, ...bach2DefiniteChallenges]) assert.ok(shows(item.explanation.es, item.expected), `${item.id}: ${written(item.expected)}`)
    for (const section of bach2DefiniteExerciseBank) for (const item of section.items) if (item.answer) assert.ok(shows(item.solution.es, item.answer.expected), `bank ${item.id}`)
})

/* Each closed answer is worked out again here, numerically, from the statement: the integral by Simpson's rule,
   F′(a) as a numeric derivative of the integral function, the parameter or the a of aπ from the condition. */
function simpson(fn: (x: number) => number, a: number, b: number, steps = 2000): number {
    const h = (b - a) / steps
    let sum = fn(a) + fn(b)
    for (let k = 1; k < steps; k += 1) sum += fn(a + k * h) * (k % 2 ? 4 : 2)
    return (sum * h) / 3
}
const abs = (fn: (x: number) => number) => (x: number) => Math.abs(fn(x))
/** F′(at) for F(x) = ∫ from low(x) to high(x) of fn */
const slope = (fn: (t: number) => number, low: (x: number) => number, high: (x: number) => number, at: number) => {
    const F = (x: number) => simpson(fn, low(x), high(x))
    return (F(at + 1e-4) - F(at - 1e-4)) / 2e-4
}
const fixed = (value: number) => () => value
/** Where F(x) = ∫₀ˣ fn is smallest (or largest) on [from, to], by trying x every 0.001 */
const extremum = (fn: (t: number) => number, from: number, to: number, kind: 'min' | 'max') => {
    let best = from
    for (let x = from; x <= to; x += 0.001) {
        const better = kind === 'min' ? simpson(fn, 0, x, 200) < simpson(fn, 0, best, 200) : simpson(fn, 0, x, 200) > simpson(fn, 0, best, 200)
        if (better) best = x
    }
    return Math.round(best * 100) / 100
}

const values: Record<string, () => number> = {
    p1: () => simpson((x) => 4 * x ** 3 - 1, 1, 2),
    p2: () => 10 - 3,
    p3: () => simpson(abs((x) => x * x - 1), 0, 2),
    p4: () => simpson((x) => 2 * x - x * x, 0, 2),
    p5: () => 0 + 1 + 2,
    p6: () => 1 + 4 + 9,
    p7: () => (4 * (1e6 + 1) ** 2) / 1e12,
    p8: () => simpson((x) => 6 * x * x, 0, 2) / 2,
    p9: () => slope((t) => t * t + 5, fixed(0), (x) => x, 2),
    p10: () => slope((t) => 1 / (t + 1), fixed(1), (x) => x * x, 1),
    p11: () => slope((t) => t, fixed(0), (x) => 3 * x, 2),
    p12: () => simpson((x) => 1 / (x - 1) ** 2, 2, 3),
    p13: () => simpson((x) => 2 * x * (x * x + 1) ** 3, 0, 1),
    p14: () => simpson((x) => x / Math.sqrt(x * x + 16), 0, 3),
    p15: () => simpson(Math.log, 1, Math.E),
    p16: () => simpson(abs((x) => x - 1), 0, 4),
    p17: () => simpson((x) => Math.min(x * x, 6 - x), 0, 6),
    p18: () => Math.sqrt(25),
    p19: () => extremum((t) => t * t - 9, 0.5, 6, 'min'),
    p20: () => simpson((x) => x, 0, 2),
    c101: () => simpson((x) => x * x + 1, -1, 2),
    c102: () => simpson(abs((x) => x ** 3), -1, 2),
    c103: () => simpson(abs((x) => x - (x * x - 2 * x)), 0, 3),
    c104: () => 2 * 4 + 2 * 16,
    c105: () => (4 + 3) - (3 + 0),
    c106: () => 1 / Math.sqrt(simpson((x) => 1 / (x * x), 1, 4) / 3),
    c107: () => slope((t) => Math.sqrt(t * t + 5), fixed(2), (x) => x, 2),
    c108: () => slope((t) => 1 / (1 + t), fixed(0), (x) => x ** 3, 1),
    c109: () => slope((t) => t * t, (x) => x, (x) => 2 * x, 1),
    c110: () => simpson((x) => x / (x * x + 1) ** 2, 0, 2),
    c111: () => simpson((x) => x * x * Math.exp(x ** 3), 0, 1) / (Math.E - 1),
    c112: () => simpson((x) => x * Math.cos(x), 0, Math.PI),
    c113: () => 18 / simpson((x) => x * x, 0, 3),
    c114: () => simpson((x) => Math.min(Math.sqrt(x), 2 - x), 0, 2),
    c115: () => simpson((x) => 4 - x * x, -2, 2),
    b1: () => simpson((x) => 2 * x + 1, 0, 3),
    b2: () => simpson((x) => 1 / Math.sqrt(x), 1, 4),
    b5: () => 8 - 5,
    b6: () => -simpson((x) => 3 * x * x - 1, 0, 2),
    b7: () => simpson(abs((x) => x ** 3 - x), -1, 1),
    b8: () => simpson((x) => 4 - x * x, -2, 2),
    b9: () => simpson((x) => Math.sqrt(x) - x * x, 0, 1),
    b10: () => simpson(abs((x) => x * x - 4 * x + 3), 0, 3),
    b12: () => Array.from({ length: 10 }, (_, k) => (k + 1) ** 2).reduce((a, b) => a + b, 0),
    b13: () => simpson((x) => 2 * x, 1, 5) / 4,
    b14: () => (1e6 + 1) / 2e6,
    b15: () => ((1e6 - 1) * (2e6 - 1)) / 6e12,
    b16: () => (simpson((x) => 2 * x + 3, 0, 4) / 4 - 3) / 2,
    b18: () => (9 * (1e6 + 1) * (2e6 + 1)) / 2e12,
    b20: () => simpson((t) => 20 + 6 * t, 0, 10) / 10,
    b22: () => slope((t) => Math.exp(-t * t), fixed(0), (x) => x, 0),
    b23: () => simpson((t) => 1 / t, 2, 2),
    b26: () => slope((t) => 1 / t, fixed(1), (x) => 2 * x, 3),
    b29: () => slope((t) => t, (x) => x, (x) => x * x, 2),
    b30: () => 3 ** 2,
    b31: () => simpson((x) => (2 * x + 1) ** 3, 0, 1),
    b32: () => simpson(Math.abs, -1, 2),
    b36: () => simpson((x) => (x < 1 ? 2 * x : 2), 0, 3, 3000),
    b38: () => simpson(abs((x) => x * x - 1), 0, 2),
    b40: () => Math.exp(simpson((x) => Math.exp(x) / (1 + Math.exp(x)), 0, Math.log(3))),
    b41: () => simpson((x) => 1 - x * x, -1, 1),
    b42: () => Math.cbrt(64),
    b43: () => simpson((x) => x * x, 0, 3),
    b44: () => simpson((x) => 2 - x - x * x, 0, 1),
    b45: () => Math.cbrt(6 * (4 / 3)),
    b46: () => extremum((t) => t * t - 4 * t + 3, 0, 2, 'max'),
    b49: () => simpson((x) => Math.min(x * x, 9) - (x * x) / 9, 0, 9, 3000)
}

test('mugatua batx2 z: each closed answer is the value worked out again from the statement', () => {
    const closed = [
        ...bach2DefinitePractice.map((item) => [`p${item.id}`, item.expected] as const),
        ...bach2DefiniteChallenges.map((item) => [`c${item.id}`, item.expected] as const),
        ...bach2DefiniteExerciseBank.flatMap((section) => section.items.filter((item) => item.answer).map((item) => [`b${item.id}`, item.answer!.expected] as const))
    ]
    for (const [key, expected] of closed) {
        const check = values[key]
        assert.ok(check, `${key}: no check written`)
        assert.ok(Math.abs(check() - valueOf(expected)) < 1e-5 * Math.max(1, Math.abs(valueOf(expected))), `${key}: ${check()} ≠ ${valueOf(expected)}`)
    }
    assert.equal(closed.length, Object.keys(values).length, 'a check for an item that no longer has an answer')
})
