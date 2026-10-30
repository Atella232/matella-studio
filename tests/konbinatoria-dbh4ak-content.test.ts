import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import { readFileSync } from 'node:fs'
import assert from 'node:assert/strict'
import katex from 'katex'
import { courses } from '../src/data/courses.ts'
import { checkAnswer, hasTerminatingDecimal, toExactDecimal, type FractionValue } from '../src/features/unit-v2/math/fraction.ts'
import { isUnitV2Path } from '../src/features/unit-v2/paths.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { readCountAnswer } from '../src/pages/dbh4-akademikoak-konbinatoria/answers.ts'
import { combinatoricsAkChallenges as challenges, combinatoricsAkDiagnostic as diagnostic, combinatoricsAkExerciseBank as exerciseBank, combinatoricsAkPractice as practice } from '../src/pages/dbh4-akademikoak-konbinatoria/content.ts'

const stages = ['counting', 'variations', 'permutations', 'combinations', 'problems']
const topics = ['tree', 'product', 'factorial', 'with-repetition', 'variations', 'conditions', 'permutations', 'restricted', 'repeated', 'combinations', 'binomial', 'pascal', 'which-model', 'geometry', 'committees']

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

test('konbinatoria 4. DBH ak: the unit is active and routed', () => {
    const course = courses.find((item) => item.id === 'dbh4-akademikoak')!
    assert.ok(course.topics.find((topic) => topic.id === 'combinatoria')!.active)
    assert.ok(isUnitV2Path('/matematika/dbh4-akademikoak/combinatoria'))
    assert.ok(isUnitV2Path('/matematika/dbh4-akademikoak/combinatoria/ariketak'))
})

test('konbinatoria 4. DBH ak: diagnostic, practice, challenges and bank are consistent', () => {
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

test('konbinatoria 4. DBH ak: every formula renders in KaTeX', () => {
    let formulas = 0
    for (const text of allTexts()) {
        for (const language of ['eu', 'es', 'en', 'ar'] as const) {
            for (const [, formula] of text[language].matchAll(/\$([^$]+)\$/g)) {
                katex.renderToString(formulaFor(language, formula), { throwOnError: true, strict: 'error' })
                formulas += 1
            }
        }
    }
    assert.ok(formulas > 200, `only ${formulas}`)
})

test('konbinatoria 4. DBH ak: Arabic never keeps the decimal comma', () => {
    for (const text of allTexts()) assert.ok(!text.ar.includes('{,}'), text.ar)
})

test('konbinatoria 4. DBH ak: every worked equality with numbers is right', () => {
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

test('konbinatoria 4. DBH ak: every answer appears in its worked explanation or solution', () => {
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

test('konbinatoria 4. DBH ak: counts with spaces, thin spaces and signs are read', () => {
    for (const [input, value] of [['40 320', 40320], ['40\u202f320', 40320], ['13 983 816', 13983816], ['120', 120], [' 9 000 ', 9000]] as const) {
        assert.equal(checkAnswer(readCountAnswer(input), { numerator: value, denominator: 1 }), 'correct', input)
    }
    assert.notEqual(checkAnswer(readCountAnswer('121'), { numerator: 120, denominator: 1 }), 'correct')
})

test('konbinatoria 4. DBH ak: the counts quoted by the lessons and figures', () => {
    const factorial = (k: number): number => (k <= 1 ? 1 : k * factorial(k - 1))
    const choose = (a: number, b: number) => factorial(a) / (factorial(b) * factorial(a - b))
    const arrange = (a: number, b: number) => factorial(a) / factorial(a - b)
    assert.equal(factorial(8) / factorial(5), 336)
    assert.equal(factorial(10) / (factorial(8) * factorial(2)), 45)
    assert.equal(5 ** 4, 625)
    assert.equal(arrange(10, 3), 720)
    assert.equal(9 * 9 * 8, 648)
    assert.equal(2 * factorial(4), 48)
    assert.equal(factorial(7) / (factorial(4) * factorial(3)), choose(7, 4))
    assert.equal(choose(7, 4), 35)
    assert.equal(choose(5, 2), 10)
    assert.equal(choose(12, 10), 66)
    assert.equal(choose(8, 3), 56)
    assert.equal(choose(5, 2) * choose(4, 3), 40)
    assert.equal(choose(49, 6), 13983816)
    assert.equal(choose(5, 2) * choose(6, 2) + choose(5, 3) * choose(6, 1) + choose(5, 4), 215)
    assert.equal(arrange(10, 7) * 3 ** 7, 1322697600)
    assert.equal(factorial(10) / (factorial(2) * factorial(3) * factorial(2)), 151200)
    // Rows of Tartaglia and their sums
    for (let row = 0; row <= 10; row += 1) assert.equal(Array.from({ length: row + 1 }, (_, k) => choose(row, k)).reduce((a, b) => a + b, 0), 2 ** row)
    // The billiards tournament: two in a row or three in total
    const games: string[] = []
    const play = (sequence: string) => {
        const last = sequence.slice(-2)
        const wins = (player: string) => sequence.split('').filter((game) => game === player).length
        if ((last.length === 2 && last[0] === last[1]) || wins('A') === 3 || wins('J') === 3) { games.push(sequence); return }
        play(sequence + 'A')
        play(sequence + 'J')
    }
    play('')
    assert.equal(games.length, 10)
    // Even three-digit numbers without repeated digits
    let even = 0
    for (let value = 100; value < 1000; value += 1) if (value % 2 === 0 && new Set(String(value)).size === 3) even += 1
    assert.equal(even, 328)
})

test('konbinatoria 4. DBH ak: lessons cover every topic and their formulas render', () => {
    // The lessons are TSX: read their source and render every formula in each language
    const source = readFileSync('src/pages/dbh4-akademikoak-konbinatoria/lessons.tsx', 'utf8').replace(/\\\\/g, '\\').replace(/\\'/g, "'")
    assert.deepEqual([...source.matchAll(/id: '([a-z-]+)',\s+stage:/g)].map((match) => match[1]), topics)
    let formulas = 0
    for (const [, formula] of source.matchAll(/\$([^$]+)\$/g)) {
        for (const language of ['eu', 'es', 'en', 'ar'] as const) katex.renderToString(formula.replace(/\{,\}/g, language === 'ar' ? '.' : '{,}'), { throwOnError: true, strict: 'error' })
        formulas += 1
    }
    assert.ok(formulas > 100, `only ${formulas}`)
})
