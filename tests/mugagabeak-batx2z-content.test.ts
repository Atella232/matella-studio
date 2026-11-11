import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { courses } from '../src/data/courses.ts'
import { checkAnswer, hasTerminatingDecimal, toExactDecimal, type FractionValue } from '../src/features/unit-v2/math/fraction.ts'
import { isUnitV2Path } from '../src/features/unit-v2/paths.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { bach2IndefiniteChallenges, bach2IndefiniteDiagnostic, bach2IndefiniteExerciseBank, bach2IndefinitePractice } from '../src/pages/batx2-zientziak-mugagabeak/content.ts'

const stages = ['review', 'parts', 'rational', 'substitution', 'strategy']
const topics = ['table', 'composed', 'composed-arcs', 'by-parts', 'parts-twice', 'log-arcs', 'division', 'simple-roots', 'double-roots', 'no-roots', 'change', 'roots-exp', 'trig-powers', 'choose', 'conditions']

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
    ...bach2IndefiniteDiagnostic.flatMap((item) => [item.prompt, item.explanation, ...item.options]),
    ...[...bach2IndefinitePractice, ...bach2IndefiniteChallenges].flatMap((item) => [item.prompt, item.hint, item.explanation]),
    ...bach2IndefiniteExerciseBank.flatMap((section) => [section.title, ...section.items.flatMap((item) => [item.question, item.solution])])
]

test('mugagabeak batx2 z: the unit is active and routed', () => {
    const course = courses.find((item) => item.id === 'batx2-zientziak')!
    assert.ok(course.topics.find((topic) => topic.id === 'integrales-indefinidas')!.active)
    assert.ok(isUnitV2Path('/matematika/batx2-zientziak/integrales-indefinidas'))
    assert.ok(isUnitV2Path('/matematika/batx2-zientziak/integrales-indefinidas/ariketak'))
})

test('mugagabeak batx2 z: diagnostic, practice, challenges and bank are consistent', () => {
    assert.equal(bach2IndefiniteDiagnostic.length, 8)
    assert.deepEqual(bach2IndefiniteDiagnostic.map((question) => question.id), [126001, 126002, 126003, 126004, 126005, 126006, 126007, 126008])
    for (const question of bach2IndefiniteDiagnostic) {
        assert.ok(topics.includes(question.topic), `${question.id}`)
        assert.ok(question.correctIndex < question.options.length)
        assert.equal(new Set(question.options.map((option) => option.es)).size, question.options.length)
    }
    // The right option is not always in the same place
    assert.ok(new Set(bach2IndefiniteDiagnostic.map((question) => question.correctIndex)).size === 3)
    for (const stage of stages) {
        assert.equal(bach2IndefinitePractice.filter((item) => item.stage === stage).length, 4, stage)
        assert.equal(bach2IndefiniteChallenges.filter((item) => item.stage === stage).length, 3, stage)
    }
    for (const item of [...bach2IndefinitePractice, ...bach2IndefiniteChallenges]) {
        assert.ok(stages.includes(item.stage), `${item.id}`)
        assert.equal(checkAnswer(typed(item.expected, item.answerForm), item.expected, item.answerForm), 'correct', `${item.id}`)
        for (const language of ['eu', 'es', 'en', 'ar'] as const) assert.ok(item.explanation[language].length > 0 && item.prompt[language].length > 0 && item.hint[language].length > 0, `${item.id} ${language}`)
    }
    assert.deepEqual(bach2IndefiniteExerciseBank.map((section) => section.id), stages)
    const ids = bach2IndefiniteExerciseBank.flatMap((section) => section.items.map((item) => item.id))
    assert.deepEqual(ids, ids.map((_, index) => index + 1))
    assert.equal(ids.length, 50)
    for (const section of bach2IndefiniteExerciseBank) {
        assert.ok(section.items.some((item) => item.difficulty === 'easy') && section.items.some((item) => item.difficulty === 'hard'), section.id)
        for (const item of section.items) {
            for (const language of ['eu', 'es', 'en', 'ar'] as const) assert.ok(item.question[language].length > 0 && item.solution[language].length > 0, `${item.id} ${language}`)
            if (item.answer) assert.equal(checkAnswer(typed(item.answer.expected, item.answer.form), item.answer.expected, item.answer.form), 'correct', `${item.id}`)
        }
    }
    assert.equal(new Set(bach2IndefiniteChallenges.map((item) => item.id)).size, bach2IndefiniteChallenges.length)
    assert.deepEqual([...new Set(bach2IndefiniteChallenges.map((item) => item.points))].sort(), [10, 20, 30])
})

test('mugagabeak batx2 z: every formula renders in KaTeX', () => {
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

test('mugagabeak batx2 z: each language in its own place, and Arabic never keeps the decimal comma', () => {
    for (const text of allTexts()) {
        assert.ok(!text.ar.includes('{,}'), text.ar)
        const words = (value: string) => value.replace(/\$[^$]+\$/g, ' ')
        if (/[a-zA-Z]{4}/.test(words(text.es))) assert.ok(/[؀-ۿ]/.test(words(text.ar)), `not Arabic: ${text.ar}`)
        for (const language of ['eu', 'es', 'en'] as const) assert.ok(!/[؀-ۿ]/.test(text[language]), `Arabic in ${language}: ${text[language]}`)
        if (/[a-zA-Z]{6}/.test(words(text.es))) assert.ok(text.eu !== text.es && text.en !== text.es, `copied from Spanish: ${text.es}`)
    }
})

test('mugagabeak batx2 z: Basque glues no case ending to a number', () => {
    for (const text of allTexts()) assert.ok(!/\d[a-zñ]/.test(text.eu.replace(/\$[^$]+\$/g, '')) && !/\$(?:ri|ren|rekin|z|ra|tik|ei|ek|ak|en|ko|an)(?![a-zA-Z])/.test(text.eu), text.eu)
})

test('mugagabeak batx2 z: every worked equality with numbers is right', () => {
    const texts = [
        ...bach2IndefinitePractice.flatMap((item) => [item.hint.es, item.explanation.es]),
        ...bach2IndefiniteChallenges.flatMap((item) => [item.hint.es, item.explanation.es]),
        ...bach2IndefiniteExerciseBank.flatMap((section) => section.items.map((item) => item.solution.es)),
        ...bach2IndefiniteDiagnostic.flatMap((item) => [item.explanation.es])
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

test('mugagabeak batx2 z: every answer appears in its worked explanation or solution', () => {
    const shows = (text: string, value: FractionValue) => {
        const plain = written(value)
        const asFraction = `\\frac{${Math.abs(value.numerator)}}{${value.denominator}}`
        const minus = value.numerator < 0 ? [`-${plain}`, `-${asFraction}`] : [asFraction]
        return [plain, ...minus].some((candidate) => text.replace(/\\,/g, '').includes(candidate))
    }
    for (const item of [...bach2IndefinitePractice, ...bach2IndefiniteChallenges]) assert.ok(shows(item.explanation.es, item.expected), `${item.id}: ${written(item.expected)}`)
    for (const section of bach2IndefiniteExerciseBank) for (const item of section.items) if (item.answer) assert.ok(shows(item.solution.es, item.answer.expected), `bank ${item.id}`)
})

/* Each closed answer, put back into its antiderivative, must differentiate to the integrand (numerically, at
   several points), or give the value asked for. The integrand and the antiderivative are written here again in
   JavaScript, from the statement. */
const derivative = (F: (x: number) => number, x: number) => (F(x + 1e-5) - F(x - 1e-5)) / 2e-5
const sameDerivative = (F: (x: number) => number, fn: (x: number) => number, points: number[]) => points.every((x) => Math.abs(derivative(F, x) - fn(x)) < 1e-4 * Math.max(1, Math.abs(fn(x))))

const antiderivatives: Record<number, { fn: (x: number) => number; F: (a: number) => (x: number) => number; points?: number[] }> = {
    1: { fn: (x) => 3 * x * x + 4 * x, F: (a) => (x) => x ** 3 + a * x * x },
    2: { fn: (x) => Math.cos(4 * x), F: (a) => (x) => a * Math.sin(4 * x) },
    3: { fn: (x) => 1 / (4 + x * x), F: (a) => (x) => a * Math.atan(x / 2) },
    5: { fn: (x) => x * Math.exp(2 * x), F: (a) => (x) => (x * Math.exp(2 * x)) / 2 + a * Math.exp(2 * x) },
    6: { fn: (x) => x * Math.sin(x), F: (a) => (x) => -x * Math.cos(x) + a * Math.sin(x) },
    8: { fn: (x) => x * x * Math.exp(x), F: (b) => (x) => Math.exp(x) * (x * x - 2 * x + b) },
    10: { fn: (x) => 5 / ((x - 1) * (x + 4)), F: (A) => (x) => A * Math.log(Math.abs(x - 1)) - Math.log(Math.abs(x + 4)), points: [2, 3, 5] },
    11: { fn: (x) => (3 * x + 1) / (x + 1) ** 2, F: (b) => (x) => 3 * Math.log(Math.abs(x + 1)) + b / (x + 1), points: [0.5, 1, 3] },
    12: { fn: (x) => 1 / (x * x + 2 * x + 2), F: (p) => (x) => Math.atan(x + p) },
    13: { fn: (x) => Math.log(x) ** 2 / x, F: (m) => (x) => Math.log(x) ** m / m, points: [1.5, 2, 4] },
    14: { fn: (x) => x / (x * x + 1) ** 3, F: (a) => (x) => a * (x * x + 1) ** -2 },
    15: { fn: (x) => Math.exp(Math.sqrt(x)) / Math.sqrt(x), F: (a) => (x) => a * Math.exp(Math.sqrt(x)), points: [0.5, 1, 4] },
    16: { fn: (x) => Math.sin(x) ** 3, F: (a) => (x) => -Math.cos(x) + a * Math.cos(x) ** 3 },
    101: { fn: (x) => (2 * x + 1) ** 3, F: (n) => (x) => (2 * x + 1) ** 4 / n },
    102: { fn: (x) => x / Math.sqrt(1 - x ** 4), F: (a) => (x) => a * Math.asin(x * x), points: [0.2, 0.5, 0.8] },
    103: { fn: (x) => Math.cos(x) / Math.sin(x) ** 3, F: (a) => (x) => a * Math.sin(x) ** -2, points: [0.5, 1, 2] },
    104: { fn: (x) => x * Math.cos(x), F: (a) => (x) => x * Math.sin(x) + a * Math.cos(x) },
    105: { fn: (x) => x * Math.log(x), F: (a) => (x) => (x * x / 2) * Math.log(x) + a * x * x, points: [0.5, 1, 3] },
    106: { fn: (x) => Math.exp(x) * Math.sin(x), F: (a) => (x) => a * Math.exp(x) * (Math.sin(x) - Math.cos(x)) },
    107: { fn: (x) => 2 * x / (x * x - 1), F: (a) => (x) => a * Math.log(Math.abs(x * x - 1)), points: [2, 3, 0.5] },
    108: { fn: (x) => (x + 3) / (x * x - x - 2), F: (A) => (x) => A * Math.log(Math.abs(x - 2)) - (2 / 3) * Math.log(Math.abs(x + 1)), points: [3, 4, 0] },
    109: { fn: (x) => x ** 3 / (x * x + 1), F: (a) => (x) => x * x / 2 + a * Math.log(x * x + 1) },
    110: { fn: (x) => x * x * Math.sqrt(x ** 3 + 1), F: (a) => (x) => a * Math.sqrt((x ** 3 + 1) ** 3), points: [0, 0.5, 2] },
    111: { fn: (x) => Math.cos(x) ** 3, F: (a) => (x) => Math.sin(x) + a * Math.sin(x) ** 3 },
    112: { fn: (x) => x / Math.sqrt(x + 1), F: (b) => (x) => (2 / 3) * Math.sqrt((x + 1) ** 3) + b * Math.sqrt(x + 1), points: [0, 1, 3] }
}

test('mugagabeak batx2 z: each closed coefficient makes the antiderivative right', () => {
    const items = [...bach2IndefinitePractice, ...bach2IndefiniteChallenges]
    for (const [id, check] of Object.entries(antiderivatives)) {
        const item = items.find((entry) => entry.id === Number(id))!
        assert.ok(item, id)
        const right = valueOf(item.expected)
        assert.ok(sameDerivative(check.F(right), check.fn, check.points ?? [-1, 0.5, 2]), `${id}: ${right}`)
        // A wrong value must not pass too (so the check really reads the coefficient)
        assert.ok(!sameDerivative(check.F(right + 1), check.fn, check.points ?? [-1, 0.5, 2]), `${id}: ${right + 1} passes too`)
    }
})

test('mugagabeak batx2 z: the conditions fix the asked values', () => {
    const items = [...bach2IndefinitePractice, ...bach2IndefiniteChallenges]
    const expected = (id: number) => valueOf(items.find((item) => item.id === id)!.expected)
    // 4: F = e^(x³) + k, F(0) = 5 · 7: F = x ln x − x + k through (1, 0) · 17: f = x² − 3x + 7 · 18: f = 3x² + 2x + 1
    assert.equal(expected(4), 5 - Math.exp(0))
    assert.equal(expected(7), 0 - (1 * Math.log(1) - 1))
    const f17 = (x: number) => x * x - 3 * x + (5 - (4 - 6))
    assert.equal(expected(17), f17(0))
    assert.equal(expected(18), 3 + 2 + 1)
    assert.ok(Math.abs(expected(19) - (Math.log(Math.exp(2)) + 4)) < 1e-12)
    assert.equal(expected(20), 3 - Math.exp(0) * (0 - 1))
    assert.equal(expected(113), 2 ** 4 + (3 - 1))
    const k1 = 5 - 4
    const k2 = 4 - (1 + k1)
    assert.equal(expected(114), k2)
    // 115: f′(0) = 2, f(0) = 1, f″ = 6x → f = x³ + 2x + 1
    assert.equal(expected(115), 1 + 2 + 1)
    // Bank 20: ∫ x e^(3x) dx = e^(3x)(x/3 − 1/9) · bank 45: f = ln|x + 1| + 3 at e − 1
    const bank = bach2IndefiniteExerciseBank.flatMap((section) => section.items)
    const b = valueOf(bank.find((item) => item.id === 20)!.answer!.expected)
    assert.ok(sameDerivative((x) => Math.exp(3 * x) * (x / 3 + b), (x) => x * Math.exp(3 * x), [-1, 0.5, 2]))
    assert.ok(Math.abs(valueOf(bank.find((item) => item.id === 45)!.answer!.expected) - (Math.log(Math.E) + 3)) < 1e-12)
})
