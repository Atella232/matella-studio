import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import katex from 'katex'
import { courses } from '../src/data/courses.ts'
import { checkAnswer, hasTerminatingDecimal, toExactDecimal, type FractionValue } from '../src/features/unit-v2/math/fraction.ts'
import { isUnitV2Path } from '../src/features/unit-v2/paths.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { programazioaChallenges, programazioaDiagnostic, programazioaExerciseBank, programazioaPractice } from '../src/pages/batx2-gizarte-programazioa/content.ts'
import { programazioaLessonChecks } from '../src/pages/batx2-gizarte-programazioa/lessonChecks.ts'
import { programazioaLessonTexts } from '../src/pages/batx2-gizarte-programazioa/lessonTexts.ts'
import { evaluate, near } from './latex-math.ts'
import { matricesIn, matrixRelations, type Env, type Relation } from './matrix-latex.ts'

/* Programazio lineala · 2.º Bachillerato Ciencias Sociales. The lessons and exercises borrowed from the Ciencias twin
   are checked by tests/batx1-zientziak-sistemak-content.test.ts; here, the unit as a whole and its own pieces. */

const stages = ['regions', 'feasible', 'objective', 'cases', 'problems']
const ownTopics = Object.keys(programazioaLessonTexts)
const unitTopics = [
    'half-plane-regions', 'region-cases', 'constraints', 'vertices', 'integer-points', 'level-lines', 'vertex-method', 'solution-types', 'max-profit', 'min-cost', 'full-problem'
]

const typed = (value: FractionValue, form?: string) => (hasTerminatingDecimal(value) && (form !== 'simplified' || value.denominator === 1) ? toExactDecimal(value)! : `${value.numerator}/${value.denominator}`)
const written = (value: FractionValue) => (hasTerminatingDecimal(value) ? toExactDecimal(value)!.replace(',', '{,}') : `\\frac{${Math.abs(value.numerator)}}{${value.denominator}}`)

const allTexts = (): LocalizedText[] => [
    ...programazioaDiagnostic.flatMap((item) => [item.prompt, item.explanation, ...item.options]),
    ...[...programazioaPractice, ...programazioaChallenges].flatMap((item) => [item.prompt, item.hint, item.explanation]),
    ...programazioaExerciseBank.flatMap((section) => [section.title, ...section.items.flatMap((item) => [item.question, item.solution])])
]

const lessonsSource = readFileSync(new URL('../src/pages/batx2-gizarte-programazioa/lessons.tsx', import.meta.url), 'utf8')
function workedBlock(id: string): string {
    const start = lessonsSource.indexOf(`id: '${id}',`)
    assert.ok(start >= 0, id)
    const next = lessonsSource.indexOf("        id: '", start + 10)
    const block = lessonsSource.slice(start, next < 0 ? undefined : next).replace(/\\\\/g, '\\')
    return block.slice(block.indexOf('problem:'), block.indexOf('takeaway:'))
}

const lessonEnv: Record<string, Env> = {}

const exerciseEnv: Record<string, Env> = {}

function assertRelations(relations: Relation[], where: string): number {
    for (const relation of relations) assert.ok(relation.holds, `${where}: ${relation.left} ${relation.relation} ${relation.right}`)
    return relations.length
}

test('programazioa batx2 g: the unit is active and routed, with the lessons in order', () => {
    const course = courses.find((item) => item.id === 'batx2-gizarte')!
    assert.ok(course.topics.find((topic) => topic.id === 'programacion-lineal')!.active)
    assert.ok(isUnitV2Path('/matematika/batx2-gizarte/programacion-lineal'))
    assert.ok(isUnitV2Path('/matematika/batx2-gizarte/programacion-lineal/ariketak'))
    const order = /const order = \[([\s\S]*?)\]/.exec(lessonsSource)![1]
    assert.deepEqual([...order.matchAll(/'([^']+)'/g)].map(([, id]) => id), unitTopics)
    for (const block of lessonsSource.split("        id: '").slice(1)) assert.ok(!/unit: '(?!batx1-zientziak\/|batx2-zientziak\/)/.test(block), 'a «Before you start» link to a unit that is not on main')
})

test('programazioa batx2 g: diagnostic, practice, challenges and bank are consistent', () => {
    assert.deepEqual(programazioaDiagnostic.map((question) => question.id), [144001, 144002, 144003, 144004, 144005, 144006, 144007, 144008])
    for (const question of programazioaDiagnostic) {
        assert.ok(unitTopics.includes(question.topic), `${question.id}: ${question.topic}`)
        assert.ok(question.correctIndex < question.options.length)
        assert.equal(new Set(question.options.map((option) => option.es)).size, question.options.length)
    }
    assert.equal(new Set(programazioaDiagnostic.map((question) => question.correctIndex)).size, 3)
    for (const stage of stages) {
        assert.equal(programazioaPractice.filter((item) => item.stage === stage).length, 4, stage)
        assert.deepEqual(programazioaChallenges.filter((item) => item.stage === stage).map((item) => item.points), [10, 20, 30], stage)
    }
    for (const item of [...programazioaPractice, ...programazioaChallenges]) {
        assert.ok(stages.includes(item.stage), `${item.id}`)
        assert.equal(checkAnswer(typed(item.expected, item.answerForm), item.expected, item.answerForm), 'correct', `${item.id}`)
    }
    assert.deepEqual(programazioaPractice.map((item) => item.id), programazioaPractice.map((_, index) => index + 1))
    assert.deepEqual(programazioaChallenges.map((item) => item.id), programazioaChallenges.map((_, index) => 101 + index))
    assert.deepEqual(programazioaExerciseBank.map((section) => section.id), stages)
    const ids = programazioaExerciseBank.flatMap((section) => section.items.map((item) => item.id))
    assert.deepEqual(ids, ids.map((_, index) => index + 1))
    for (const section of programazioaExerciseBank) {
        assert.equal(section.items.length, 10, section.id)
        assert.ok(section.items.some((item) => item.difficulty === 'easy') && section.items.some((item) => item.difficulty === 'hard'), section.id)
        for (const item of section.items) if (item.answer) assert.equal(checkAnswer(typed(item.answer.expected, item.answer.form), item.answer.expected, item.answer.form), 'correct', `${item.id}`)
    }
})

test('programazioa batx2 g: every optimum asked is the one of the vertices', () => {
    // The kinds built by lp.ts are checked by construction; here, that every answer of a «Maximise / Minimise» is one of the values listed
    for (const item of [...programazioaPractice, ...programazioaChallenges]) {
        if (!/Maximiza|Minimiza|beneficio|coste/.test(item.prompt.es) || !/F\(/.test(item.explanation.es)) continue
        const values = [...item.explanation.es.matchAll(/=(-?\d+)/g)].map(([, value]) => Number(value))
        const expected = item.expected.numerator / item.expected.denominator
        assert.ok(values.includes(expected), `${item.id}`)
        assert.equal(expected, /Minimiza|mínimo/.test(item.prompt.es) ? Math.min(...values) : Math.max(...values), `${item.id}`)
    }
})

test('programazioa batx2 g: every formula renders in KaTeX', () => {
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

test('programazioa batx2 g: each language in its own place, Arabic without the decimal comma', () => {
    for (const text of allTexts()) {
        assert.ok(!text.ar.includes('{,}'), text.ar)
        const words = (value: string) => value.replace(/\$[^$]+\$/g, ' ')
        if (/[a-zA-Z]{4}/.test(words(text.es))) assert.ok(/[؀-ۿ]/.test(words(text.ar)), `not Arabic: ${text.ar}`)
        for (const language of ['eu', 'es', 'en'] as const) assert.ok(!/[؀-ۿ]/.test(text[language]), `Arabic in ${language}: ${text[language]}`)
        if (/[a-zA-Z]{6}/.test(words(text.es))) assert.ok(text.eu !== text.es && text.en !== text.es, `copied from Spanish: ${text.es}`)
    }
})

test('programazioa batx2 g: Basque glues no case ending to a number, English writes the euro first, thousands grouped', () => {
    for (const text of allTexts()) {
        assert.ok(!/\d[a-zñ]/.test(text.eu.replace(/\$[^$]+\$/g, '')) && !/\$(?:ri|ren|rekin|z|ra|tik|ei|ek|ak|en|ko|an)(?![a-zA-Z])/.test(text.eu), text.eu)
        assert.ok(!/\d\s*€/.test(text.en.replace(/\$[^$]+\$/g, '')), text.en)
        for (const language of ['eu', 'es', 'en', 'ar'] as const) assert.ok(!/(?<![\d\\,])\d{5,}/.test(text[language]), `${language}: ${text[language]}`)
    }
})

test('programazioa batx2 g: every worked equality of plain numbers is right, and every answer is shown', () => {
    let checked = 0
    const texts = [
        ...[...programazioaPractice, ...programazioaChallenges].flatMap((item) => [item.hint.es, item.explanation.es]),
        ...programazioaExerciseBank.flatMap((section) => section.items.map((item) => item.solution.es)),
        ...programazioaDiagnostic.map((item) => item.explanation.es)
    ]
    for (const text of texts) {
        for (const [, formula] of text.matchAll(/\$([^$]+)\$/g)) {
            if (/\\begin|\|/.test(formula)) continue
            for (const part of formula.split(/\\qquad|\\quad|\\ \\to\\ |\\to|,\\ /)) {
                const values = part.split(/\\le|\\ge|\\neq|<|>/)[0].split('=').map((side) => evaluate(side)).filter((value): value is number => value !== null)
                if (values.length < 2) continue
                assert.ok(values.every((value) => near(value, values[0])), `${part} → ${values.join(' / ')}`)
                checked += 1
            }
        }
    }
    assert.ok(checked >= 10, `only ${checked} checked`)
    const shows = (text: string, value: FractionValue) => [written(value), `-${written(value)}`].some((candidate) => text.replace(/\\,/g, '').includes(candidate))
    for (const item of [...programazioaPractice, ...programazioaChallenges]) assert.ok(shows(item.explanation.es, item.expected), `${item.id}: ${written(item.expected)}`)
    for (const item of programazioaExerciseBank.flatMap((section) => section.items)) if (item.answer) assert.ok(shows(item.solution.es, item.answer.expected), `bank ${item.id}: ${written(item.answer.expected)}`)
})

test('programazioa batx2 g: the equalities of the own lesson hold', (t) => {
    let read = 0
    for (const id of ownTopics) {
        read += assertRelations(matrixRelations(workedBlock(id), lessonEnv[id]), `lesson ${id}`)
        const entry = programazioaLessonTexts[id as keyof typeof programazioaLessonTexts]
        const example = typeof entry.example === 'string' ? entry.example : entry.example.es
        read += assertRelations(matrixRelations(`${entry.examplePrompt!.es} ${example} ${entry.exampleAnswer?.es ?? ''}`), `example ${id}`)
        const checks = programazioaLessonChecks[id as keyof typeof programazioaLessonChecks]
        read += assertRelations(matrixRelations([checks.mistake.right, checks.check.explanation].map((text) => text.es).join(' ')), `check ${id}`)
    }
    t.diagnostic(`${read} equalities checked`)
    assert.ok(read >= 3, `only ${read} checked`)
})

test('programazioa batx2 g: the equalities of practice, challenges and bank hold', (t) => {
    const texts: Record<string, string> = {
        ...Object.fromEntries(programazioaPractice.map((item) => [`practice ${item.id}`, `${item.prompt.es} ${item.hint.es} ${item.explanation.es}`])),
        ...Object.fromEntries(programazioaChallenges.map((item) => [`challenge ${item.id}`, `${item.prompt.es} ${item.hint.es} ${item.explanation.es}`])),
        ...Object.fromEntries(programazioaExerciseBank.flatMap((section) => section.items).map((item) => [`bank ${item.id}`, `${item.question.es} ${item.solution.es}`]))
    }
    for (const where of Object.keys(exerciseEnv)) assert.ok(where in texts, where)
    let read = 0
    for (const [where, text] of Object.entries(texts)) read += assertRelations(matrixRelations(text, exerciseEnv[where]), where)
    t.diagnostic(`${read} equalities checked`)
    assert.ok(read >= 0, `only ${read} checked`)
    for (const text of allTexts()) for (const matrix of matricesIn(text.es)) if (matrix) assert.ok(matrix.every((row) => row.length === matrix[0].length))
})

