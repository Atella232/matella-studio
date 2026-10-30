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
import { probabilityAkChallenges as challenges, probabilityAkDiagnostic as diagnostic, probabilityAkExerciseBank as exerciseBank, probabilityAkPractice as practice } from '../src/pages/dbh4-akademikoak-probabilitatea/content.ts'

const stages = ['events', 'probability', 'compound', 'conditional', 'counting']
const topics = ['experiments', 'operations', 'compatible', 'frequency', 'laplace', 'properties', 'independent', 'dependent', 'trees', 'contingency', 'conditional', 'total', 'with-combinations', 'several-dice', 'fair-games']

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
            .replace(/\\sqrt\{([^{}]+)\}/g, 'Math.sqrt($1)')
            .replace(/(\([^()]+\)|\d+(?:\.\d+)?)\^\{([^{}]+)\}/g, 'Math.pow($1,($2))')
    }
    js = js.replace(/\)\(/g, ')*(').replace(/(\d)\(/g, '$1*(').replace(/(\d)Math/g, '$1*Math').replace(/\)Math/g, ')*Math')
    if (!/^(?:[\d+\-*/().,]|Math\.(?:pow|sqrt))+$/.test(js) || !/\d/.test(js)) return null
    try {
        return Function('Math', `return ${js}`)(Math) as number
    } catch {
        return null
    }
}

const allTexts = (): LocalizedText[] => [
    ...diagnostic.flatMap((item) => [item.prompt, item.explanation, ...item.options]),
    ...[...practice, ...challenges].flatMap((item) => [item.prompt, item.hint, item.explanation]),
    ...exerciseBank.flatMap((section) => [section.title, ...section.items.flatMap((item) => [item.question, item.solution])])
]

test('probabilitatea 4. DBH ak: the unit is active and routed', () => {
    const course = courses.find((item) => item.id === 'dbh4-akademikoak')!
    assert.ok(course.topics.find((topic) => topic.id === 'probabilidad')!.active)
    assert.ok(isUnitV2Path('/matematika/dbh4-akademikoak/probabilidad'))
    assert.ok(isUnitV2Path('/matematika/dbh4-akademikoak/probabilidad/ariketak'))
})

test('probabilitatea 4. DBH ak: diagnostic, practice, challenges and bank are consistent', () => {
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
    // Probabilities stay between 0 and 1; only counts and money leave that range
    for (const item of [...practice, ...challenges]) {
        const value = item.expected.numerator / item.expected.denominator
        if (item.expected.denominator > 1 && value > 0) assert.ok(value < 1, `${item.id}`)
    }
})

test('probabilitatea 4. DBH ak: every formula renders in KaTeX', () => {
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
    assert.ok(formulas > 200, `only ${formulas}`)
})

test('probabilitatea 4. DBH ak: Arabic never keeps the decimal comma', () => {
    for (const text of allTexts()) assert.ok(!text.ar.includes('{,}'), text.ar)
})

test('probabilitatea 4. DBH ak: every worked equality with numbers is right', () => {
    const texts = [
        ...practice.flatMap((item) => [item.hint.es, item.explanation.es]),
        ...challenges.flatMap((item) => [item.hint.es, item.explanation.es]),
        ...exerciseBank.flatMap((section) => section.items.map((item) => item.solution.es)),
        ...diagnostic.flatMap((item) => [item.explanation.es])
    ]
    let checked = 0
    for (const text of texts) {
        for (const [, formula] of text.matchAll(/\$([^$]+)\$/g)) {
            // Approximations (≈) are written rounded, and lists (\ldots) are not equalities: skip them
            if (formula.includes('\\approx') || formula.includes('\\ldots')) continue
            for (const part of formula.split(/\\qquad|\\quad|\\ \\to\\ |\\to/)) {
                const values = part.split('=').map(evaluate).filter((value): value is number => value !== null)
                if (values.length < 2) continue
                assert.ok(values.every((value) => Math.abs(value - values[0]) < 1e-9 * Math.max(1, Math.abs(values[0]))), `${part} → ${values.join(' / ')}`)
                checked += 1
            }
        }
    }
    assert.ok(checked >= 60, `only ${checked} checked`)
})

test('probabilitatea 4. DBH ak: every answer appears in its worked explanation or solution', () => {
    const shows = (text: string, value: FractionValue) => {
        const plain = written(value)
        const asFraction = `\\frac{${Math.abs(value.numerator)}}{${value.denominator}}`
        const minus = value.numerator < 0 ? [`-${plain}`, `-${asFraction}`] : [asFraction]
        return [plain, ...minus].some((candidate) => text.replace(/\\,/g, '').includes(candidate))
    }
    for (const item of [...practice, ...challenges]) assert.ok(shows(item.explanation.es, item.expected), `${item.id}: ${written(item.expected)}`)
    for (const section of exerciseBank) for (const item of section.items) if (item.answer) assert.ok(shows(item.solution.es, item.answer.expected), `bank ${item.id}`)
})

test('probabilitatea 4. DBH ak: fractions, decimals and negative gains are read', () => {
    for (const [input, numerator, denominator] of [['3/8', 3, 8], ['0,375', 3, 8], ['0.375', 3, 8], ['6/16', 3, 8], ['-1/6', -1, 6], ['-0,8', -4, 5], ['12', 12, 1], [' 5 / 27 ', 5, 27]] as const) {
        assert.equal(checkAnswer(readStatisticsAnswer(input), { numerator, denominator }), 'correct', input)
    }
    // A rounded decimal is not the exact probability
    assert.notEqual(checkAnswer(readStatisticsAnswer('0,17'), { numerator: 1, denominator: 6 }), 'correct')
})

test('probabilitatea 4. DBH ak: the probabilities quoted by the lessons and figures', () => {
    const faces = [1, 2, 3, 4, 5, 6]
    const pairs = faces.flatMap((a) => faces.map((b) => [a, b]))
    const triples = faces.flatMap((a) => faces.flatMap((b) => faces.map((c) => [a, b, c])))
    const count = <T,>(list: T[], keep: (item: T) => boolean) => list.filter(keep).length
    // Two dice: sums 7 and 11, maximum 5 and 3, product even, sum below 5, sum 8 or a double
    assert.equal(count(pairs, ([a, b]) => a + b === 7), 6)
    assert.equal(count(pairs, ([a, b]) => a + b === 11), 2)
    assert.equal(count(pairs, ([a, b]) => a + b === 9), 4)
    assert.equal(count(pairs, ([a, b]) => Math.max(a, b) === 4), 7)
    assert.equal(count(pairs, ([a, b]) => Math.max(a, b) === 5), 9)
    assert.equal(count(pairs, ([a, b]) => Math.max(a, b) === 3), 5)
    assert.equal(count(pairs, ([a, b]) => (a * b) % 2 === 0), 27)
    assert.equal(count(pairs, ([a, b]) => a + b < 5), 6)
    assert.equal(count(pairs, ([a, b]) => a + b === 8 || a === b), 10)
    assert.equal(count(pairs, ([a, b]) => Math.min(a, b) === 1), 11)
    assert.equal(count(pairs, ([a, b]) => a + b === 7 || a === 3), 11)
    // Three dice: maximum 4 and 6, median 2, all different, all equal, exactly two sixes
    assert.equal(triples.length, 216)
    assert.equal(count(triples, (t) => Math.max(...t) === 4), 37)
    assert.equal(count(triples, (t) => Math.max(...t) === 6), 91)
    assert.equal(count(triples, (t) => [...t].sort((x, y) => x - y)[1] === 2), 40)
    assert.equal(count(triples, (t) => new Set(t).size === 3), 120)
    assert.equal(count(triples, (t) => new Set(t).size === 1), 6)
    assert.equal(count(triples, (t) => t.filter((x) => x === 6).length === 2), 15)
    // Three coins: «the first is heads» or «at least two heads»
    const coins = ['C', '+'].flatMap((a) => ['C', '+'].flatMap((b) => ['C', '+'].map((c) => a + b + c)))
    assert.equal(count(coins, (c) => c[0] === 'C' || c.split('C').length - 1 >= 2), 5)
    assert.equal(count(coins, (c) => c.split('C').length - 1 >= 2), 4)
    // Balls 1 to 30: neither a multiple of 2 nor of 3
    assert.equal(count(Array.from({ length: 30 }, (_, i) => i + 1), (k) => k % 2 !== 0 && k % 3 !== 0), 10)
    // The deck: neither gold nor court card; cups or court card
    const deck = ['oros', 'copas', 'espadas', 'bastos'].flatMap((suit) => [1, 2, 3, 4, 5, 6, 7, 10, 11, 12].map((value) => ({ suit, value })))
    assert.equal(count(deck, (card) => card.suit !== 'oros' && card.value < 10), 21)
    assert.equal(count(deck, (card) => card.suit === 'copas' || card.value >= 10), 19)
    assert.equal(count(deck, (card) => card.value !== 1 && card.value < 10), 24)
    // Three people in six seats with A and B together; five friends in a row
    let together = 0
    let seatings = 0
    for (let a = 0; a < 6; a += 1) for (let b = 0; b < 6; b += 1) for (let c = 0; c < 6; c += 1) {
        if (a === b || b === c || a === c) continue
        seatings += 1
        if (Math.abs(a - b) === 1) together += 1
    }
    assert.equal(seatings, 120)
    assert.equal(together, 40)
    // Combinations
    const choose = (n: number, k: number): number => (k === 0 ? 1 : (choose(n, k - 1) * (n - k + 1)) / k)
    assert.equal(choose(40, 3), 9880)
    assert.equal(choose(10, 3), 120)
    assert.equal(choose(49, 6), 13983816)
    assert.equal(choose(10, 2) / choose(40, 2), 3 / 52)
    assert.equal(choose(10, 4), 210)
    assert.equal(choose(7, 2) * choose(3, 2), 63)
    assert.equal((choose(4, 1) * choose(5, 2)) / choose(10, 3), 1 / 3)
    // The die in the fair game and the median rule
    assert.equal(6 * (2 / 6) - 3 * (4 / 6), 0)
    assert.equal(3 * 2 ** 2 * 4 + 2 ** 3 - (3 * 1 * 5 + 1), 40)
    // At least one six: three throws are not enough, four are
    const someSix = (throws: number) => 1 - (5 / 6) ** throws
    assert.ok(someSix(3) < 0.5 && someSix(4) > 0.5)
})

test('probabilitatea 4. DBH ak: lessons cover every topic and their formulas render', () => {
    // The lessons are TSX: read their source and render every formula in each language
    const source = readFileSync('src/pages/dbh4-akademikoak-probabilitatea/lessons.tsx', 'utf8').replace(/\\\\/g, '\\').replace(/\\'/g, "'")
    assert.deepEqual([...source.matchAll(/id: '([a-z-]+)',\s+stage:/g)].map((match) => match[1]), topics)
    let formulas = 0
    for (const [, formula] of source.matchAll(/\$([^$]+)\$/g)) {
        for (const language of ['eu', 'es', 'en', 'ar'] as const) katex.renderToString(formula.replace(/\{,\}/g, language === 'ar' ? '.' : '{,}'), { throwOnError: true, strict: 'error' })
        formulas += 1
    }
    assert.ok(formulas > 100, `only ${formulas}`)
})
