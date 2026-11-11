import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import katex from 'katex'
import { courses } from '../src/data/courses.ts'
import { checkAnswer, hasTerminatingDecimal, toExactDecimal, type FractionValue } from '../src/features/unit-v2/math/fraction.ts'
import { isUnitV2Path } from '../src/features/unit-v2/paths.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { sistemakChallenges, sistemakDiagnostic, sistemakExerciseBank, sistemakPractice } from '../src/pages/batx2-zientziak-sistemak/content.ts'
import { sistemakLessonChecks } from '../src/pages/batx2-zientziak-sistemak/lessonChecks.ts'
import { sistemakLessonTexts } from '../src/pages/batx2-zientziak-sistemak/lessonTexts.ts'
import { augmentedRows, classify, cramer, detValue, rankOf, replaceColumn, satisfies, systemLatex, type SystemKind } from '../src/pages/batx2-zientziak-sistemak/system.ts'
import { evaluate, near } from './latex-math.ts'
import { matricesIn, matrixRelations, type Env, type Relation } from './matrix-latex.ts'

const stages = ['rouche', 'cramer', 'homogeneous', 'discussion', 'problems']
const topics = Object.keys(sistemakLessonTexts)

const typed = (value: FractionValue, form?: string) => (hasTerminatingDecimal(value) && (form !== 'simplified' || value.denominator === 1) ? toExactDecimal(value)! : `${value.numerator}/${value.denominator}`)
const written = (value: FractionValue) => (hasTerminatingDecimal(value) ? toExactDecimal(value)!.replace(',', '{,}') : `\\frac{${Math.abs(value.numerator)}}{${value.denominator}}`)
const value = (input: FractionValue) => input.numerator / input.denominator

const allTexts = (): LocalizedText[] => [
    ...sistemakDiagnostic.flatMap((item) => [item.prompt, item.explanation, ...item.options]),
    ...[...sistemakPractice, ...sistemakChallenges].flatMap((item) => [item.prompt, item.hint, item.explanation]),
    ...sistemakExerciseBank.flatMap((section) => [section.title, ...section.items.flatMap((item) => [item.question, item.solution])])
]

/** Every text in four languages inside a value (lesson texts and checks are nested objects) */
function localizedIn(input: unknown, found: LocalizedText[] = []): LocalizedText[] {
    if (Array.isArray(input)) input.forEach((item) => localizedIn(item, found))
    else if (input && typeof input === 'object') {
        const record = input as Record<string, unknown>
        if (['eu', 'es', 'en', 'ar'].every((key) => typeof record[key] === 'string')) found.push(record as unknown as LocalizedText)
        else Object.values(record).forEach((item) => localizedIn(item, found))
    }
    return found
}

/** The source of one lesson in lessons.tsx, with the doubled backslashes of the strings read as one */
const lessonsSource = readFileSync(new URL('../src/pages/batx2-zientziak-sistemak/lessons.tsx', import.meta.url), 'utf8')
function lessonBlock(id: string): string {
    const start = lessonsSource.indexOf(`id: '${id}',`)
    assert.ok(start >= 0, id)
    const next = lessonsSource.indexOf("        id: '", start + 10)
    return lessonsSource.slice(start, next < 0 ? undefined : next).replace(/\\\\/g, '\\')
}
const workedBlock = (id: string) => {
    const block = lessonBlock(id)
    return block.slice(block.indexOf('problem:'), block.indexOf('takeaway:'))
}

/* ---------- Reading a system written as \begin{cases} ---------- */

const UNKNOWNS = ['x', 'y', 'z', 't']

/**
 * The first \begin{cases} of a text as A and B, with the letters of the parameters (a, b, k, m) given. Each row
 * is a sum of terms c·u (c a number, a parameter, or nothing), = a number or an expression in the parameters.
 */
function systemIn(text: string, parameters: Record<string, number> = {}): { a: number[][]; b: number[] } {
    const body = /\\begin\{cases\}([\s\S]*?)\\end\{cases\}/.exec(text)?.[1]
    assert.ok(body, `no system in ${text}`)
    const rows = body.split('\\\\').map((row) => row.trim()).filter(Boolean)
    const width = Math.max(...rows.map((row) => Math.max(...UNKNOWNS.map((name, index) => (row.split('=')[0].includes(name) ? index + 1 : 0)))))
    const a: number[][] = []
    const b: number[] = []
    for (const row of rows) {
        const [left, right] = row.split('=')
        const coefficients = Array.from({ length: width }, () => 0)
        for (const [, sign, number, parameter, unknown] of left.matchAll(/([+-]?)(\d*)([abkm]?)([xyzt])/g)) {
            const size = (number ? Number(number) : 1) * (parameter ? parameters[parameter] : 1)
            assert.ok(!Number.isNaN(size), `${parameter} is not given for ${row}`)
            coefficients[UNKNOWNS.indexOf(unknown)] += sign === '-' ? -size : size
        }
        const constant = evaluate(right, (name) => parameters[name])
        assert.ok(constant !== null, right)
        // A parameter such as 5/2 leaves fractions: the row times the smallest whole number that clears them
        const scale = [1, 2, 3, 4, 5, 6, 8, 10, 12].find((k) => [...coefficients, constant].every((item) => Math.abs(item * k - Math.round(item * k)) < 1e-9)) ?? 1
        a.push(coefficients.map((item) => Math.round(item * scale)))
        b.push(Math.round(constant * scale))
    }
    return { a, b }
}

type Claim =
    | { kind: 'unknown'; index: number }
    | { kind: 'type'; type: SystemKind | 'compatible' | 'not-determined' }
    | { kind: 'nontrivial' }
    | { kind: 'solution'; solution: number[]; only?: boolean }
    | { kind: 'rank-augmented' }
    | { kind: 'parameters' }
    | { kind: 'det' }
    | { kind: 'det-column'; index: number }

/** What the answer of each item is, checked by solving its system with system.ts; the answer goes in as the parameter `answer` names */
const claims: Record<string, { claim: Claim; answer?: string; parameters?: Record<string, number> }> = {
    'practice 3': { claim: { kind: 'rank-augmented' } },
    'practice 5': { claim: { kind: 'unknown', index: 0 } },
    'practice 6': { claim: { kind: 'det' } },
    'practice 7': { claim: { kind: 'unknown', index: 1 } },
    'practice 9': { claim: { kind: 'nontrivial' }, answer: 'k' },
    'practice 10': { claim: { kind: 'nontrivial' }, answer: 'a' },
    'practice 13': { claim: { kind: 'type', type: 'not-determined' }, answer: 'a' },
    'practice 14': { claim: { kind: 'type', type: 'indeterminate' }, answer: 'b' },
    'practice 15': { claim: { kind: 'type', type: 'inconsistent' }, answer: 'a' },
    'practice 16': { claim: { kind: 'unknown', index: 0 }, parameters: { a: 3 } },
    'practice 18': { claim: { kind: 'type', type: 'compatible' }, answer: 'k' },
    'practice 19': { claim: { kind: 'solution', solution: [1, -1, 2] }, answer: 'm' },
    'practice 20': { claim: { kind: 'unknown', index: 0 } },
    'challenge 102': { claim: { kind: 'type', type: 'compatible' }, answer: 'k' },
    'challenge 103': { claim: { kind: 'parameters' } },
    'challenge 104': { claim: { kind: 'det-column', index: 0 } },
    'challenge 105': { claim: { kind: 'unknown', index: 2 } },
    'challenge 108': { claim: { kind: 'nontrivial' }, answer: 'm' },
    'challenge 109': { claim: { kind: 'nontrivial' }, answer: 'k' },
    'challenge 111': { claim: { kind: 'type', type: 'inconsistent' }, answer: 'm' },
    'challenge 112': { claim: { kind: 'type', type: 'indeterminate' }, answer: 'a' },
    'challenge 114': { claim: { kind: 'unknown', index: 0 } },
    'challenge 115': { claim: { kind: 'solution', solution: [2, -1, 1], only: true }, answer: 'a' },
    'bank 4': { claim: { kind: 'rank-augmented' } },
    'bank 5': { claim: { kind: 'parameters' } },
    'bank 6': { claim: { kind: 'rank-augmented' } },
    'bank 8': { claim: { kind: 'parameters' } },
    'bank 11': { claim: { kind: 'det-column', index: 0 } },
    'bank 12': { claim: { kind: 'unknown', index: 0 } },
    'bank 14': { claim: { kind: 'unknown', index: 0 } },
    'bank 15': { claim: { kind: 'unknown', index: 2 } },
    'bank 17': { claim: { kind: 'unknown', index: 1 } },
    'bank 18': { claim: { kind: 'unknown', index: 1 } },
    'bank 20': { claim: { kind: 'unknown', index: 0 }, parameters: { a: 3 } },
    'bank 24': { claim: { kind: 'nontrivial' }, answer: 'k' },
    'bank 26': { claim: { kind: 'nontrivial' }, answer: 'a' },
    'bank 29': { claim: { kind: 'nontrivial' }, answer: 'm' },
    'bank 32': { claim: { kind: 'type', type: 'not-determined' }, answer: 'a' },
    'bank 34': { claim: { kind: 'type', type: 'indeterminate' }, answer: 'a' },
    'bank 35': { claim: { kind: 'type', type: 'indeterminate' }, answer: 'a' },
    'bank 36': { claim: { kind: 'type', type: 'compatible' }, answer: 'b' },
    'bank 37': { claim: { kind: 'type', type: 'inconsistent' }, answer: 'a' },
    'bank 39': { claim: { kind: 'unknown', index: 1 }, parameters: { a: 5 } },
    'bank 40': { claim: { kind: 'type', type: 'compatible' }, answer: 'b', parameters: { a: 2 } },
    'bank 43': { claim: { kind: 'type', type: 'compatible' }, answer: 'k' },
    'bank 47': { claim: { kind: 'solution', solution: [1, 1, 1] }, answer: 'a' },
    'bank 49': { claim: { kind: 'type', type: 'compatible' }, answer: 'k' }
}

/* ---------- Tests ---------- */

test('sistemak batx2 z: the unit is active and routed', () => {
    const course = courses.find((item) => item.id === 'batx2-zientziak')!
    assert.ok(course.topics.find((topic) => topic.id === 'sistemas')!.active)
    assert.ok(!courses.find((item) => item.id === 'batx2-gizarte')!.topics.find((topic) => topic.id === 'sistemas')!.active, 'only the Ciencias course')
    assert.ok(isUnitV2Path('/matematika/batx2-zientziak/sistemas'))
    assert.ok(isUnitV2Path('/matematika/batx2-zientziak/sistemas/ariketak'))
})

test('sistemak batx2 z: diagnostic, practice, challenges and bank are consistent', () => {
    assert.equal(sistemakDiagnostic.length, 8)
    // The unit's block of ids is 118000–118999
    assert.deepEqual(sistemakDiagnostic.map((question) => question.id), [118001, 118002, 118003, 118004, 118005, 118006, 118007, 118008])
    for (const question of sistemakDiagnostic) {
        assert.ok(topics.includes(question.topic), `${question.id}`)
        assert.ok(question.correctIndex < question.options.length)
        assert.equal(new Set(question.options.map((option) => option.es)).size, question.options.length)
    }
    assert.ok(new Set(sistemakDiagnostic.map((question) => question.correctIndex)).size === 3)
    for (const stage of stages) {
        assert.equal(sistemakPractice.filter((item) => item.stage === stage).length, 4, stage)
        assert.equal(sistemakChallenges.filter((item) => item.stage === stage).length, 3, stage)
    }
    for (const item of [...sistemakPractice, ...sistemakChallenges]) {
        assert.ok(stages.includes(item.stage), `${item.id}`)
        assert.equal(checkAnswer(typed(item.expected, item.answerForm), item.expected, item.answerForm), 'correct', `${item.id}`)
        for (const language of ['eu', 'es', 'en', 'ar'] as const) assert.ok(item.explanation[language].length > 0 && item.prompt[language].length > 0 && item.hint[language].length > 0, `${item.id} ${language}`)
    }
    assert.deepEqual(sistemakPractice.map((item) => item.id), sistemakPractice.map((_, index) => index + 1))
    assert.deepEqual(sistemakExerciseBank.map((section) => section.id), stages)
    const ids = sistemakExerciseBank.flatMap((section) => section.items.map((item) => item.id))
    assert.deepEqual(ids, ids.map((_, index) => index + 1))
    for (const section of sistemakExerciseBank) {
        assert.equal(section.items.length, 10, section.id)
        assert.ok(section.items.some((item) => item.difficulty === 'easy') && section.items.some((item) => item.difficulty === 'hard'), section.id)
        for (const item of section.items) {
            for (const language of ['eu', 'es', 'en', 'ar'] as const) assert.ok(item.question[language].length > 0 && item.solution[language].length > 0, `${item.id} ${language}`)
            if (item.answer) assert.equal(checkAnswer(typed(item.answer.expected, item.answer.form), item.answer.expected, item.answer.form), 'correct', `${item.id}`)
        }
    }
    assert.deepEqual(sistemakChallenges.map((item) => item.id), [101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115])
    assert.deepEqual([...new Set(sistemakChallenges.map((item) => item.points))].sort(), [10, 20, 30])
})

test('sistemak batx2 z: every formula renders in KaTeX', () => {
    let formulas = 0
    for (const text of allTexts()) {
        for (const language of ['eu', 'es', 'en', 'ar'] as const) {
            for (const [, formula] of text[language].matchAll(/\$([^$]+)\$/g)) {
                katex.renderToString(formulaFor(language, formula), { throwOnError: true, strict: 'error' })
                formulas += 1
            }
        }
    }
    assert.ok(formulas > 400, `only ${formulas}`)
})

test('sistemak batx2 z: each language in its own place, and Arabic never keeps the decimal comma', () => {
    for (const text of allTexts()) {
        assert.ok(!text.ar.includes('{,}'), text.ar)
        const words = (input: string) => input.replace(/\$[^$]+\$/g, ' ')
        if (/[a-zA-Z]{4}/.test(words(text.es))) assert.ok(/[؀-ۿ]/.test(words(text.ar)), `not Arabic: ${text.ar}`)
        for (const language of ['eu', 'es', 'en'] as const) assert.ok(!/[؀-ۿ]/.test(text[language]), `Arabic in ${language}: ${text[language]}`)
        if (/[a-zA-Z]{6}/.test(words(text.es))) assert.ok(text.eu !== text.es && text.en !== text.es, `copied from Spanish: ${text.es}`)
    }
})

test('sistemak batx2 z: no words of one language inside another (a phrase passed where only a formula goes)', () => {
    const names = new Set(['Rouché', 'Frobenius', 'Cramer', 'Sarrus', 'Gauss'])
    const words = (text: string, size: number) => (text.replace(/\$[^$]+\$/g, ' ').match(new RegExp(`[A-Za-zÀ-ÿñÑ]{${size},}`, 'g')) ?? []).filter((word) => !names.has(word))
    const texts = [...allTexts(), ...localizedIn(sistemakLessonTexts), ...localizedIn(sistemakLessonChecks)]
    assert.ok(texts.length > 400, `only ${texts.length} texts`)
    for (const text of texts) {
        assert.deepEqual(words(text.ar, 4), [], `Latin words in Arabic: ${text.ar}`)
        if (text.eu === text.es) continue
        const pairs = (input: string) => { const list = words(input, 4); return list.slice(1).map((word, index) => `${list[index]} ${word}`) }
        const basque = new Set(pairs(text.eu))
        for (const language of ['es', 'en'] as const) assert.deepEqual(pairs(text[language]).filter((pair) => basque.has(pair)), [], `Basque in ${language}: ${text[language]}`)
    }
})

test('sistemak batx2 z: Basque glues no case ending to a number or a formula; English writes the euro first', () => {
    for (const text of allTexts()) {
        assert.ok(!/\d[a-zñ]/.test(text.eu.replace(/\$[^$]+\$/g, '')) && !/\$(?:ri|ren|rekin|z|ra|tik|ei|ek|ak|en|ko|an)(?![a-zA-Z])/.test(text.eu), text.eu)
        assert.ok(!/\d\s*€/.test(text.en.replace(/\$[^$]+\$/g, '')), text.en)
    }
})

test('sistemak batx2 z: every worked equality of plain numbers is right', () => {
    const texts = [
        ...[...sistemakPractice, ...sistemakChallenges].flatMap((item) => [item.hint.es, item.explanation.es]),
        ...sistemakExerciseBank.flatMap((section) => section.items.map((item) => item.solution.es)),
        ...sistemakDiagnostic.map((item) => item.explanation.es)
    ]
    let checked = 0
    for (const text of texts) {
        for (const [, formula] of text.matchAll(/\$([^$]+)\$/g)) {
            if (/\\begin|\|/.test(formula)) continue
            for (const part of formula.split(/\\qquad|\\quad|\\ \\to\\ |\\to|,\\ /)) {
                const values = part.split(/\\le|\\ge|\\neq|<|>/)[0].split('=').map((side) => evaluate(side)).filter((item): item is number => item !== null)
                if (values.length < 2) continue
                assert.ok(values.every((item) => near(item, values[0])), `${part} → ${values.join(' / ')}`)
                checked += 1
            }
        }
    }
    assert.ok(checked >= 15, `only ${checked} checked`)
})

test('sistemak batx2 z: every answer appears in its worked explanation or solution', () => {
    const shows = (text: string, expected: FractionValue) => {
        const plain = written(expected)
        return [plain, expected.numerator < 0 ? `-${plain}` : plain].some((candidate) => text.replace(/\\,/g, '').includes(candidate))
    }
    for (const item of [...sistemakPractice, ...sistemakChallenges]) assert.ok(shows(item.explanation.es, item.expected), `${item.id}: ${written(item.expected)}`)
    for (const item of sistemakExerciseBank.flatMap((section) => section.items)) if (item.answer) assert.ok(shows(item.solution.es, item.answer.expected), `${item.id}: ${written(item.answer.expected)}`)
})

test('sistemak batx2 z: every answer is what the system of its statement gives (Rouché, Cramer, ranks)', () => {
    const items: Record<string, { prompt: string; worked: string; expected: FractionValue }> = {
        ...Object.fromEntries(sistemakPractice.map((item) => [`practice ${item.id}`, { prompt: item.prompt.es, worked: item.explanation.es, expected: item.expected }])),
        ...Object.fromEntries(sistemakChallenges.map((item) => [`challenge ${item.id}`, { prompt: item.prompt.es, worked: item.explanation.es, expected: item.expected }])),
        ...Object.fromEntries(sistemakExerciseBank.flatMap((section) => section.items).filter((item) => item.answer).map((item) => [`bank ${item.id}`, { prompt: item.question.es, worked: item.solution.es, expected: item.answer!.expected }]))
    }
    for (const [where, { claim, answer, parameters }] of Object.entries(claims)) {
        const item = items[where]
        assert.ok(item, where)
        const expected = value(item.expected)
        // A word problem has its system in the worked explanation
        const source = /\\begin\{cases\}/.test(item.prompt) ? item.prompt : item.worked
        const { a, b } = systemIn(source, { ...parameters, ...(answer ? { [answer]: expected } : {}) })
        const kind = classify(a, b)
        switch (claim.kind) {
            case 'unknown': assert.ok(near(value(cramer(a, b)![claim.index]), expected), where); break
            case 'det': assert.ok(near(detValue(a), expected), where); break
            case 'det-column': assert.ok(near(detValue(replaceColumn(a, b, claim.index)), expected), where); break
            case 'rank-augmented': assert.equal(rankOf(augmentedRows(a, b)), expected, where); break
            case 'parameters': assert.equal(kind.parameters, expected, where); break
            case 'nontrivial': assert.ok(b.every((item) => item === 0) && near(detValue(a), 0), where); break
            case 'solution': {
                assert.ok(satisfies(a, b, claim.solution), where)
                if (claim.only) assert.equal(kind.kind, 'determined', where)
                break
            }
            case 'type': {
                if (claim.type === 'compatible') assert.notEqual(kind.kind, 'inconsistent', where)
                else if (claim.type === 'not-determined') assert.notEqual(kind.kind, 'determined', where)
                else assert.equal(kind.kind, claim.type, where)
                // The answer is the only value that does it: one more or one less does not
                if (answer && claim.type !== 'compatible' && claim.type !== 'not-determined') {
                    for (const other of [expected + 1, expected - 1]) {
                        const moved = systemIn(source, { ...parameters, [answer]: other })
                        assert.notEqual(classify(moved.a, moved.b).kind, claim.type, `${where}: also with ${other}`)
                    }
                }
                break
            }
        }
    }
    assert.ok(Object.keys(claims).length >= 40)
})

test('sistemak batx2 z: the systems of the lessons are what the lessons say', () => {
    const lesson = (id: string) => lessonBlock(id)
    const problem = (id: string, parameters: Record<string, number> = {}) => systemIn(lesson(id), parameters)
    const kind = (id: string, parameters: Record<string, number> = {}) => { const { a, b } = problem(id, parameters); return classify(a, b) }
    assert.equal(kind('rank-classify').kind, 'indeterminate')
    assert.equal(kind('geometric-meaning').kind, 'determined')
    assert.ok(satisfies(problem('geometric-meaning').a, problem('geometric-meaning').b, [2, 1]))
    assert.deepEqual(cramer(problem('cramer-rule').a, problem('cramer-rule').b)!.map(value), [1, 2, 3])
    const indeterminate = problem('cramer-indeterminate')
    assert.equal(classify(indeterminate.a, indeterminate.b).kind, 'indeterminate')
    for (const lambda of [0, 1, -2, 5]) assert.ok(satisfies(indeterminate.a, indeterminate.b, [3 - lambda, 1, lambda]))
    assert.deepEqual(cramer(problem('inverse-solve').a, problem('inverse-solve').b)!.map(value), [2, -1])
    assert.equal(kind('homogeneous-trivial').kind, 'determined')
    for (const k of [0, 2]) assert.equal(kind('homogeneous-parameter', { k }).kind, 'indeterminate')
    assert.equal(kind('homogeneous-parameter', { k: 3 }).kind, 'determined')
    const k2 = problem('homogeneous-parameter', { k: 2 })
    for (const lambda of [1, -3]) assert.ok(satisfies(k2.a, k2.b, [0, -lambda, lambda]))
    assert.equal(kind('parameter-determinant', { a: 1 }).kind, 'indeterminate')
    assert.equal(kind('parameter-determinant', { a: 1 }).parameters, 2)
    assert.equal(kind('parameter-ranks', { a: -2 }).kind, 'inconsistent')
    for (const a of [0, 3, -1, 2]) {
        const { a: rows, b } = problem('parameter-solve', { a })
        assert.equal(classify(rows, b).kind, 'determined')
        for (const unknown of cramer(rows, b)!) assert.ok(near(value(unknown), 1 / (a + 2)))
    }
    assert.equal(kind('extra-equations', { k: 3 }).kind, 'determined')
    assert.equal(kind('extra-equations', { k: 4 }).kind, 'inconsistent')
    assert.ok(satisfies(problem('extra-equations', { k: 3 }).a, problem('extra-equations', { k: 3 }).b, [1, 1]))
    const word = /\\begin\{cases\}x\+y\+z=70[\s\S]*?\\end\{cases\}/.exec(lesson('word-problems'))![0]
    assert.deepEqual(cramer(systemIn(word).a, systemIn(word).b)!.map(value), [30, 15, 25])
    const given = problem('parameter-problems', { a: 2 })
    assert.ok(satisfies(given.a, given.b, [1, 2, -1]))
    assert.equal(classify(given.a, given.b).kind, 'determined')
    // The examples
    const example = (id: string, parameters: Record<string, number> = {}) => systemIn(sistemakLessonTexts[id as keyof typeof sistemakLessonTexts].examplePrompt!.es, parameters)
    const ex = (id: string, parameters: Record<string, number> = {}) => { const { a, b } = example(id, parameters); return classify(a, b) }
    assert.equal(ex('rank-classify').kind, 'inconsistent')
    assert.deepEqual(cramer(example('cramer-rule').a, example('cramer-rule').b)!.map(value), [2, -1])
    const exIndeterminate = example('cramer-indeterminate')
    for (const lambda of [0, 1, 4]) assert.ok(satisfies(exIndeterminate.a, exIndeterminate.b, [-2 + 2 * lambda, 3 - lambda, lambda]))
    assert.ok(near(detValue(example('homogeneous-trivial').a), 0))
    for (const m of [2, -2]) assert.ok(near(detValue(example('homogeneous-parameter', { m }).a), 0))
    for (const m of [3, -3]) assert.notEqual(ex('parameter-determinant', { m }).kind, 'determined')
    assert.equal(ex('parameter-ranks', { m: 2 }).kind, 'inconsistent')
    assert.deepEqual(cramer(example('parameter-solve', { m: 3 }).a, example('parameter-solve', { m: 3 }).b)!.map(value), [0.5, 0.5])
    assert.equal(ex('extra-equations', { a: 4 }).kind, 'determined')
    assert.equal(ex('extra-equations', { a: 5 }).kind, 'inconsistent')
    const wordExample = systemIn(String(sistemakLessonTexts['word-problems'].example.es))
    assert.deepEqual(cramer(wordExample.a, wordExample.b)!.map(value), [6, 2, 4])
    assert.ok(satisfies(example('parameter-problems', { m: 3 }).a, example('parameter-problems', { m: 3 }).b, [2, 1]))
    // The writer of systems prints what the lessons write
    assert.equal(systemLatex([[2, 1, -1], [1, -1, 2], [3, 0, 2]], [3, 1, 4]), '\\begin{cases}2x+y-z=3\\\\ x-y+2z=1\\\\ 3x+2z=4\\end{cases}')
})

const lessonEnv: Record<string, Env> = {
    'matrix-form': { A: [[2, 1, -1], [1, -1, 2], [3, 0, 2]] },
    'inverse-solve': { A: [[3, 1], [5, 2]], B: [[5], [8]] }
}

function assertRelations(relations: Relation[], where: string): number {
    for (const relation of relations) assert.ok(relation.holds, `${where}: ${relation.left} ${relation.relation} ${relation.right}`)
    return relations.length
}

test('sistemak batx2 z: the determinants and matrices written in the lessons, checks and exercises hold', (t) => {
    let read = 0
    for (const id of topics) {
        read += assertRelations(matrixRelations(workedBlock(id), lessonEnv[id]), `lesson ${id}`)
        const entry = sistemakLessonTexts[id as keyof typeof sistemakLessonTexts]
        const example = typeof entry.example === 'string' ? entry.example : entry.example.es
        const caseMaths = (entry.cases ?? []).map((item) => (typeof item.math === 'string' ? item.math : item.math?.es ?? '')).join(' ')
        read += assertRelations(matrixRelations(`${entry.examplePrompt!.es} ${example} ${entry.exampleAnswer?.es ?? ''} ${caseMaths}`), `example ${id}`)
        const checks = sistemakLessonChecks[id as keyof typeof sistemakLessonChecks]
        read += assertRelations(matrixRelations([checks.mistake.right, checks.check.prompt, checks.check.explanation].map((text) => text.es).join(' ')), `check ${id}`)
    }
    for (const item of [...sistemakPractice, ...sistemakChallenges]) read += assertRelations(matrixRelations(`${item.hint.es} ${item.explanation.es}`), `item ${item.id}`)
    for (const item of sistemakExerciseBank.flatMap((section) => section.items)) read += assertRelations(matrixRelations(item.solution.es), `bank ${item.id}`)
    t.diagnostic(`${read} equalities checked`)
    assert.ok(read >= 30, `only ${read} checked`)
    for (const text of allTexts()) for (const matrix of matricesIn(text.es)) if (matrix) assert.ok(matrix.every((row) => row.length === matrix[0].length))
})
