import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import katex from 'katex'
import { courses } from '../src/data/courses.ts'
import { checkAnswer, hasTerminatingDecimal, toExactDecimal, type FractionValue } from '../src/features/unit-v2/math/fraction.ts'
import { isUnitV2Path } from '../src/features/unit-v2/paths.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { bachSystemsChallenges, bachSystemsDiagnostic, bachSystemsExerciseBank, bachSystemsPractice } from '../src/pages/batx1-zientziak-sistemak/content.ts'
import { bachSystemsLessonChecks } from '../src/pages/batx1-zientziak-sistemak/lessonChecks.ts'
import { bachSystemsLessonTexts } from '../src/pages/batx1-zientziak-sistemak/lessonTexts.ts'
import { evaluate, near } from './latex-math.ts'

const stages = ['linear', 'gauss', 'discussion', 'nonlinear', 'inequalities']
const topics = ['linear-equations', 'classify-systems', 'equivalent-systems', 'triangular-systems', 'gauss-method', 'augmented-matrix', 'three-unknown-problems', 'solutions-count', 'parametric-solutions', 'parameter-discussion', 'nonlinear-substitution', 'radical-log-systems', 'exponential-systems', 'nonlinear-problems', 'half-plane-regions', 'region-cases']

const typed = (value: FractionValue, form?: string) => (hasTerminatingDecimal(value) && (form !== 'simplified' || value.denominator === 1) ? toExactDecimal(value)! : `${value.numerator}/${value.denominator}`)
const written = (value: FractionValue) => (hasTerminatingDecimal(value) ? toExactDecimal(value)!.replace(',', '{,}') : `\\frac{${Math.abs(value.numerator)}}{${value.denominator}}`)

const allTexts = (): LocalizedText[] => [
    ...bachSystemsDiagnostic.flatMap((item) => [item.prompt, item.explanation, ...item.options]),
    ...[...bachSystemsPractice, ...bachSystemsChallenges].flatMap((item) => [item.prompt, item.hint, item.explanation]),
    ...bachSystemsExerciseBank.flatMap((section) => [section.title, ...section.items.flatMap((item) => [item.question, item.solution])])
]

/* ---------- Systems: every row of a \begin{cases} checked at its solution ---------- */

type Values = Record<string, number>

/** The rows of every \begin{cases}…\end{cases} in a text */
const systemsIn = (text: string) => [...text.matchAll(/\\begin\{cases\}([\s\S]*?)\\end\{cases\}/g)].map(([, body]) => body.split(/\\\\/).map((row) => row.trim()))

/** Whether a row (=, ≤, ≥, <, > and chains such as 5 ≤ x + y ≤ 7) holds at the values; null when it cannot be read */
function holds(row: string, values: Values): boolean | null {
    const parts = row.split(/(\\le|\\ge|=|<|>)/)
    if (parts.length < 3) return null
    const at = (side: string) => evaluate(side, (name) => (name in values ? values[name] : Number.NaN))
    let ok = true
    for (let index = 1; index < parts.length; index += 2) {
        const left = at(parts[index - 1])
        const right = at(parts[index + 1])
        if (left === null || right === null) return null
        const relation = parts[index]
        const right_ = relation === '=' ? near(left, right) : relation === '\\le' ? left <= right + 1e-9 : relation === '\\ge' ? left >= right - 1e-9 : relation === '<' ? left < right : left > right
        ok &&= right_
    }
    return ok
}

/** Checks every readable row of every system of the text at each point; returns how many rows it read */
function checkSystems(text: string, points: Values[], where: string): number {
    let read = 0
    for (const rows of systemsIn(text)) {
        for (const values of points) {
            for (const row of rows) {
                const result = holds(row, values)
                if (result === null) continue
                read++
                assert.ok(result, `${where}: ${row} fails at ${JSON.stringify(values)}`)
            }
        }
    }
    return read
}

const xyz = (x: number, y: number, z?: number): Values => (z === undefined ? { x, y } : { x, y, z })

/** The source of one lesson in lessons.tsx, with the doubled backslashes of the strings read as one */
const lessonsSource = readFileSync(new URL('../src/pages/batx1-zientziak-sistemak/lessons.tsx', import.meta.url), 'utf8')
function lessonBlock(id: string): string {
    const start = lessonsSource.indexOf(`id: '${id}',`)
    assert.ok(start >= 0, id)
    const next = lessonsSource.indexOf("        id: '", start + 10)
    return lessonsSource.slice(start, next < 0 ? undefined : next).replace(/\\\\/g, '\\')
}

/** The solutions of the systems that each lesson solves (in «Let's solve» and its steps) */
const lessonSolutions: Record<string, Values[]> = {
    'linear-equations': [xyz(1, 2, -1)],
    'equivalent-systems': [xyz(2, 3)],
    'triangular-systems': [xyz(1, 2, 3)],
    'gauss-method': [xyz(1, 2, 3)],
    'augmented-matrix': [xyz(2, 3, 1)],
    'three-unknown-problems': [xyz(30, 20, 50)],
    'parametric-solutions': [0, 1, 2, 5].map((l) => xyz(3 - l, 1, l)),
    'nonlinear-substitution': [xyz(0, 0), xyz(2, 2), xyz(-2, -2)],
    'radical-log-systems': [xyz(20, 5)],
    'exponential-systems': [{ x: 3, y: 1, u: 8, v: 3 }],
    'nonlinear-problems': [xyz(6, 8), xyz(8, 6)],
    'half-plane-regions': [xyz(2, 1), xyz(1, 0), xyz(5, 0), xyz(1, 4)]
}

/** The solutions of the «Another example» systems */
const exampleSolutions: Record<string, Values[]> = {
    'linear-equations': [xyz(3, -1, 2)],
    'equivalent-systems': [xyz(3, 2)],
    'triangular-systems': [xyz(2, 3, 2)],
    'gauss-method': [xyz(2, 1, 1)],
    'three-unknown-problems': [xyz(14, 28, 18)],
    'solutions-count': [xyz(2, 1, 0), xyz(2, 3, 2)],
    'parametric-solutions': [0, 1, 4].map((l) => xyz(-3 + 3 * l, 4 - l, l)),
    'parameter-discussion': [{ x: 2, y: 0, a: 5 }],
    'nonlinear-substitution': [xyz(2, 3), xyz(3, 2)],
    'radical-log-systems': [xyz(9, 2)],
    'exponential-systems': [{ u: 5, v: 9 }],
    'nonlinear-problems': [xyz(7, 8), xyz(8, 7)],
    'half-plane-regions': [xyz(3, 1)]
}

/** The solutions behind the right answer of «Check it» */
const checkSolutions: Record<string, Values[]> = {
    'triangular-systems': [xyz(5, 1, 2)],
    'nonlinear-substitution': [xyz(0, 0), xyz(2, 4)],
    'radical-log-systems': [xyz(5, 2)],
    'half-plane-regions': [xyz(0, 2)],
    'region-cases': [xyz(1, 1), xyz(0, 4)]
}

/** The solutions of the systems in practice, challenges and bank, by section and id */
const exerciseSolutions: Record<string, Values[]> = {
    'practice 3': [xyz(2, 3)],
    'practice 4': [xyz(2, 3)],
    'practice 5': [xyz(2, 2, 3)],
    'practice 6': [xyz(1, -1, 2)],
    'practice 11': [0, 2].map((l) => xyz(4 - 2 * l, 1 + l, l)),
    'practice 13': [xyz(4, 2), xyz(2, 4)],
    'practice 14': [xyz(20, 5)],
    'practice 15': [{ x: 3, y: 1 }],
    'practice 17': [xyz(0, 0), xyz(2, 0), xyz(1, 1)],
    'practice 18': [xyz(3, 6)],
    'challenge 101': [{ x: 2, y: 1, a: 3, b: 2 }],
    'challenge 103': [{ a: 4, b: 2 }],
    'challenge 104': [xyz(1, 2, 3)],
    'challenge 105': [xyz(5, -2, -3)],
    'challenge 106': [xyz(4, 9, 5)],
    'challenge 107': [],
    'challenge 108': [{ x: 0, y: -1, z: 2, a: 1 }, { x: -2, y: 3, z: 0, a: 1 }],
    'challenge 109': [{ x: 1, y: 1, z: 0, a: 1, b: 2 }],
    'challenge 110': [xyz(3, 1), xyz(-1, -3)],
    'challenge 111': [xyz(2, 1)],
    'challenge 112': [xyz(9, 4)],
    'challenge 113': [xyz(0, 0), xyz(3, 0), xyz(0, 3)],
    'challenge 114': [xyz(2, 3), xyz(5, 2), xyz(2, 5)],
    'challenge 115': [xyz(3, 0), xyz(0, 6)],
    'bank 1': [xyz(1, 1, 1)],
    'bank 3': [xyz(2, 1)],
    'bank 6': [xyz(4, 2)],
    'bank 7': [xyz(2, 3)],
    'bank 8': [xyz(3, -1)],
    'bank 10': [{ x: 2, y: 1, a: 2, b: 1 }],
    'bank 11': [xyz(1, 2, 1)],
    'bank 12': [xyz(2, 1)],
    'bank 14': [xyz(1, 1, 1)],
    'bank 15': [xyz(2, 1, 0)],
    'bank 18': [xyz(1, 1, 2)],
    'bank 19': [{ a: 11, b: 14, c: 20 }],
    'bank 24': [xyz(2, -1, 0), xyz(3, -3, 1)],
    'bank 25': [xyz(3, 2, 0)],
    'bank 29': [0, 2].map((l) => xyz(l, 1, 2 - l)),
    'bank 31': [xyz(2, 4), xyz(-2, 4)],
    'bank 32': [xyz(5, 2), xyz(2, 5)],
    'bank 33': [{ x: 4, y: 2 }],
    'bank 34': [xyz(4, 3), xyz(-3, -4)],
    'bank 35': [xyz(3, 2), xyz(-3, 2), xyz(3, -2), xyz(-3, -2)],
    'bank 36': [xyz(20, 2)],
    'bank 38': [xyz(0, 0), xyz(2, 8), xyz(-2, -8)],
    'bank 44': [xyz(1, 1), xyz(3, 1), xyz(1, 3)],
    'bank 45': [xyz(0, 0), xyz(6, 0), xyz(0, 3)],
    'bank 49': [xyz(4, 3), xyz(0, 0)],
    'bank 50': [xyz(0, 0), xyz(4, 0), xyz(0, 4)]
}

test('sistemak batx1 z: the unit is active and routed', () => {
    const course = courses.find((item) => item.id === 'batx1-zientziak')!
    assert.ok(course.topics.find((topic) => topic.id === 'sistemas')!.active)
    assert.ok(isUnitV2Path('/matematika/batx1-zientziak/sistemas'))
    assert.ok(isUnitV2Path('/matematika/batx1-zientziak/sistemas/ariketak'))
})

test('sistemak batx1 z: diagnostic, practice, challenges and bank are consistent', () => {
    assert.equal(bachSystemsDiagnostic.length, 8)
    // The unit's block of ids is 113000–113999
    assert.deepEqual(bachSystemsDiagnostic.map((question) => question.id), [113001, 113002, 113003, 113004, 113005, 113006, 113007, 113008])
    for (const question of bachSystemsDiagnostic) {
        assert.ok(topics.includes(question.topic), `${question.id}`)
        assert.ok(question.correctIndex < question.options.length)
        assert.equal(new Set(question.options.map((option) => option.es)).size, question.options.length)
    }
    assert.ok(new Set(bachSystemsDiagnostic.map((question) => question.correctIndex)).size === 3)
    for (const stage of stages) {
        assert.equal(bachSystemsPractice.filter((item) => item.stage === stage).length, 4, stage)
        assert.equal(bachSystemsChallenges.filter((item) => item.stage === stage).length, 3, stage)
    }
    for (const item of [...bachSystemsPractice, ...bachSystemsChallenges]) {
        assert.ok(stages.includes(item.stage), `${item.id}`)
        assert.equal(checkAnswer(typed(item.expected, item.answerForm), item.expected, item.answerForm), 'correct', `${item.id}`)
        for (const language of ['eu', 'es', 'en', 'ar'] as const) assert.ok(item.explanation[language].length > 0 && item.prompt[language].length > 0 && item.hint[language].length > 0, `${item.id} ${language}`)
    }
    assert.deepEqual(bachSystemsPractice.map((item) => item.id), bachSystemsPractice.map((_, index) => index + 1))
    assert.deepEqual(bachSystemsExerciseBank.map((section) => section.id), stages)
    const ids = bachSystemsExerciseBank.flatMap((section) => section.items.map((item) => item.id))
    assert.deepEqual(ids, ids.map((_, index) => index + 1))
    assert.equal(ids.length, 50)
    for (const section of bachSystemsExerciseBank) {
        assert.ok(section.items.some((item) => item.difficulty === 'easy') && section.items.some((item) => item.difficulty === 'hard'), section.id)
        for (const item of section.items) {
            for (const language of ['eu', 'es', 'en', 'ar'] as const) assert.ok(item.question[language].length > 0 && item.solution[language].length > 0, `${item.id} ${language}`)
            if (item.answer) assert.equal(checkAnswer(typed(item.answer.expected, item.answer.form), item.answer.expected, item.answer.form), 'correct', `${item.id}`)
        }
    }
    assert.equal(new Set(bachSystemsChallenges.map((item) => item.id)).size, bachSystemsChallenges.length)
    assert.deepEqual([...new Set(bachSystemsChallenges.map((item) => item.points))].sort(), [10, 20, 30])
})

test('sistemak batx1 z: every formula renders in KaTeX', () => {
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

test('sistemak batx1 z: each language in its own place, and Arabic never keeps the decimal comma', () => {
    for (const text of allTexts()) {
        assert.ok(!text.ar.includes('{,}'), text.ar)
        const words = (value: string) => value.replace(/\$[^$]+\$/g, ' ')
        if (/[a-zA-Z]{4}/.test(words(text.es))) assert.ok(/[؀-ۿ]/.test(words(text.ar)), `not Arabic: ${text.ar}`)
        for (const language of ['eu', 'es', 'en'] as const) assert.ok(!/[؀-ۿ]/.test(text[language]), `Arabic in ${language}: ${text[language]}`)
        if (/[a-zA-Z]{6}/.test(words(text.es))) assert.ok(text.eu !== text.es && text.en !== text.es, `copied from Spanish: ${text.es}`)
    }
})

test('sistemak batx1 z: Basque glues no case ending to a number, English writes the euro first', () => {
    for (const text of allTexts()) {
        assert.ok(!/\d[a-zñ]/.test(text.eu.replace(/\$[^$]+\$/g, '')) && !/\$(?:ri|ren|rekin|z|ra|tik|ei|ek|ak|en|ko|an)(?![a-zA-Z])/.test(text.eu), text.eu)
        assert.ok(!/\d\s*€/.test(text.en.replace(/\$[^$]+\$/g, '')), text.en)
    }
})

test('sistemak batx1 z: no impossible equality of numbers inside a formula (0z = 5 keeps its letter)', () => {
    const texts = [...allTexts(), ...Object.values(bachSystemsLessonTexts).flatMap((entry) => [entry.explanation, ...(typeof entry.example === 'string' ? [] : [entry.example])])]
    for (const text of texts) {
        for (const [, formula] of text.es.matchAll(/\$([^$]+)\$/g)) assert.ok(!/(?:^|[^\w^{])0\s*=\s*-?[1-9]/.test(formula), formula)
    }
})

test('sistemak batx1 z: every worked equality with numbers is right', () => {
    const texts = [
        ...bachSystemsPractice.flatMap((item) => [item.hint.es, item.explanation.es]),
        ...bachSystemsChallenges.flatMap((item) => [item.hint.es, item.explanation.es]),
        ...bachSystemsExerciseBank.flatMap((section) => section.items.map((item) => item.solution.es)),
        ...bachSystemsDiagnostic.flatMap((item) => [item.explanation.es])
    ]
    let checked = 0
    for (const text of texts) {
        for (const [, formula] of text.matchAll(/\$([^$]+)\$/g)) {
            for (const part of formula.split(/\\qquad|\\quad|\\ \\to\\ |\\to|,\\ /)) {
                const values = part.split(/\\le|\\ge|\\neq|<|>/)[0].split('=').map((side) => evaluate(side)).filter((value): value is number => value !== null)
                if (values.length < 2) continue
                assert.ok(values.every((value) => near(value, values[0])), `${part} → ${values.join(' / ')}`)
                checked += 1
            }
        }
    }
    assert.ok(checked >= 20, `only ${checked} checked`)
})

test('sistemak batx1 z: every answer appears in its worked explanation or solution', () => {
    const shows = (text: string, value: FractionValue) => {
        const plain = written(value)
        return [plain, value.numerator < 0 ? `-${plain}` : plain].some((candidate) => text.replace(/\\,/g, '').includes(candidate))
    }
    for (const item of [...bachSystemsPractice, ...bachSystemsChallenges]) assert.ok(shows(item.explanation.es, item.expected), `${item.id}: ${written(item.expected)}`)
    for (const item of bachSystemsExerciseBank.flatMap((section) => section.items)) if (item.answer) assert.ok(shows(item.solution.es, item.answer.expected), `${item.id}: ${written(item.answer.expected)}`)
})

test('sistemak batx1 z: the systems of the lessons hold at the solutions they give', (t) => {
    let read = 0
    for (const [id, points] of Object.entries(lessonSolutions)) read += checkSystems(lessonBlock(id), points, `lesson ${id}`)
    for (const [id, points] of Object.entries(exampleSolutions)) {
        const entry = bachSystemsLessonTexts[id as keyof typeof bachSystemsLessonTexts]
        const example = typeof entry.example === 'string' ? entry.example : entry.example.es
        read += checkSystems(`${entry.examplePrompt!.es} ${example}`, points, `example ${id}`)
    }
    for (const [id, points] of Object.entries(checkSolutions)) read += checkSystems(bachSystemsLessonChecks[id as keyof typeof bachSystemsLessonChecks].check.prompt.es, points, `check ${id}`)
    t.diagnostic(`${read} rows checked`)
    assert.ok(read >= 60, `only ${read} rows checked`)
})

test('sistemak batx1 z: the systems of practice, challenges and bank hold at their solutions', (t) => {
    const texts: Record<string, string> = {
        ...Object.fromEntries(bachSystemsPractice.map((item) => [`practice ${item.id}`, `${item.prompt.es} ${item.hint.es}`])),
        ...Object.fromEntries(bachSystemsChallenges.map((item) => [`challenge ${item.id}`, `${item.prompt.es} ${item.hint.es} ${item.explanation.es}`])),
        ...Object.fromEntries(bachSystemsExerciseBank.flatMap((section) => section.items).map((item) => [`bank ${item.id}`, `${item.question.es} ${item.solution.es}`]))
    }
    let read = 0
    for (const [where, points] of Object.entries(exerciseSolutions)) {
        assert.ok(where in texts, where)
        read += checkSystems(texts[where], points, where)
    }
    t.diagnostic(`${read} rows checked`)
    assert.ok(read >= 80, `only ${read} rows checked`)
})

test('sistemak batx1 z: the wrong answers of «Check it» really are wrong', () => {
    // The triples and points offered as wrong answers miss some row of the system they are asked about
    const wrongPoints: Record<string, Values[]> = {
        'linear-equations': [xyz(1, 3, 0), xyz(4, 2, 0)],
        'half-plane-regions': [xyz(2, 0), xyz(1, 1)]
    }
    for (const [id, points] of Object.entries(wrongPoints)) {
        const rowsList = systemsIn(bachSystemsLessonChecks[id as keyof typeof bachSystemsLessonChecks].check.prompt.es)
        const formulas = [...bachSystemsLessonChecks[id as keyof typeof bachSystemsLessonChecks].check.prompt.es.matchAll(/\$([^$]+)\$/g)].map(([, formula]) => formula)
        const rows = rowsList.length ? rowsList.flat() : formulas.filter((formula) => /[=<>]|\\le|\\ge/.test(formula))
        for (const point of points) assert.ok(rows.some((row) => holds(row, point) === false), `${id}: ${JSON.stringify(point)} satisfies everything`)
    }
})
