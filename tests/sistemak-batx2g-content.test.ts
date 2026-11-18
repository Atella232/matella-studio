import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import katex from 'katex'
import { courses } from '../src/data/courses.ts'
import { checkAnswer, hasTerminatingDecimal, toExactDecimal, type FractionValue } from '../src/features/unit-v2/math/fraction.ts'
import { isUnitV2Path } from '../src/features/unit-v2/paths.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { gizarteSistemakChallenges, gizarteSistemakDiagnostic, gizarteSistemakExerciseBank, gizarteSistemakPractice } from '../src/pages/batx2-gizarte-sistemak/content.ts'
import { gizarteSistemakLessonChecks } from '../src/pages/batx2-gizarte-sistemak/lessonChecks.ts'
import { gizarteSistemakLessonTexts } from '../src/pages/batx2-gizarte-sistemak/lessonTexts.ts'
import { evaluate, near } from './latex-math.ts'
import { matricesIn, matrixRelations, type Env, type Relation } from './matrix-latex.ts'

/* Sistemak · 2.º Bachillerato Ciencias Sociales. The lessons and exercises borrowed from the Ciencias twin
   are checked by tests/sistemak-batx2z and batx1-zientziak-sistemak-content.test.ts; here, the unit as a whole and its own pieces. */

const stages = ['gauss', 'rouche', 'cramer', 'discussion', 'problems']
const ownTopics = Object.keys(gizarteSistemakLessonTexts)
const unitTopics = [
    'classify-systems', 'triangular-systems', 'gauss-method', 'solutions-count', 'parametric-solutions', 'matrix-form', 'rouche-theorem', 'rank-classify', 'prices-how-many',
    'cramer-rule', 'inverse-solve', 'homogeneous-trivial', 'parameter-determinant', 'parameter-ranks', 'parameter-solve', 'statement-system', 'word-problems', 'parameter-problems'
]

const typed = (value: FractionValue, form?: string) => (hasTerminatingDecimal(value) && (form !== 'simplified' || value.denominator === 1) ? toExactDecimal(value)! : `${value.numerator}/${value.denominator}`)
const written = (value: FractionValue) => (hasTerminatingDecimal(value) ? toExactDecimal(value)!.replace(',', '{,}') : `\\frac{${Math.abs(value.numerator)}}{${value.denominator}}`)

const allTexts = (): LocalizedText[] => [
    ...gizarteSistemakDiagnostic.flatMap((item) => [item.prompt, item.explanation, ...item.options]),
    ...[...gizarteSistemakPractice, ...gizarteSistemakChallenges].flatMap((item) => [item.prompt, item.hint, item.explanation]),
    ...gizarteSistemakExerciseBank.flatMap((section) => [section.title, ...section.items.flatMap((item) => [item.question, item.solution])])
]

const lessonsSource = readFileSync(new URL('../src/pages/batx2-gizarte-sistemak/lessons.tsx', import.meta.url), 'utf8')
function workedBlock(id: string): string {
    const start = lessonsSource.indexOf(`id: '${id}',`)
    assert.ok(start >= 0, id)
    const next = lessonsSource.indexOf("        id: '", start + 10)
    const block = lessonsSource.slice(start, next < 0 ? undefined : next).replace(/\\\\/g, '\\')
    return block.slice(block.indexOf('problem:'), block.indexOf('takeaway:'))
}

const lessonEnv: Record<string, Env> = {
    'prices-how-many': { A: [[2, 1], [1, 1], [4, 3]] }
}

const exerciseEnv: Record<string, Env> = {}

function assertRelations(relations: Relation[], where: string): number {
    for (const relation of relations) assert.ok(relation.holds, `${where}: ${relation.left} ${relation.relation} ${relation.right}`)
    return relations.length
}

test('sistemak batx2 g: the unit is active and routed, with the lessons in order', () => {
    const course = courses.find((item) => item.id === 'batx2-gizarte')!
    assert.ok(course.topics.find((topic) => topic.id === 'sistemas')!.active)
    assert.ok(isUnitV2Path('/matematika/batx2-gizarte/sistemas'))
    assert.ok(isUnitV2Path('/matematika/batx2-gizarte/sistemas/ariketak'))
    const order = /const order = \[([\s\S]*?)\]/.exec(lessonsSource)![1]
    assert.deepEqual([...order.matchAll(/'([^']+)'/g)].map(([, id]) => id), unitTopics)
    for (const block of lessonsSource.split("        id: '").slice(1)) assert.ok(!/unit: '(?!batx1-zientziak\/|batx2-zientziak\/)/.test(block), 'a «Before you start» link to a unit that is not on main')
})

test('sistemak batx2 g: diagnostic, practice, challenges and bank are consistent', () => {
    assert.deepEqual(gizarteSistemakDiagnostic.map((question) => question.id), [143001, 143002, 143003, 143004, 143005, 143006, 143007, 143008])
    for (const question of gizarteSistemakDiagnostic) {
        assert.ok(unitTopics.includes(question.topic), `${question.id}: ${question.topic}`)
        assert.ok(question.correctIndex < question.options.length)
        assert.equal(new Set(question.options.map((option) => option.es)).size, question.options.length)
    }
    assert.equal(new Set(gizarteSistemakDiagnostic.map((question) => question.correctIndex)).size, 3)
    for (const stage of stages) {
        assert.equal(gizarteSistemakPractice.filter((item) => item.stage === stage).length, 4, stage)
        assert.deepEqual(gizarteSistemakChallenges.filter((item) => item.stage === stage).map((item) => item.points), [10, 20, 30], stage)
    }
    for (const item of [...gizarteSistemakPractice, ...gizarteSistemakChallenges]) {
        assert.ok(stages.includes(item.stage), `${item.id}`)
        assert.equal(checkAnswer(typed(item.expected, item.answerForm), item.expected, item.answerForm), 'correct', `${item.id}`)
    }
    assert.deepEqual(gizarteSistemakPractice.map((item) => item.id), gizarteSistemakPractice.map((_, index) => index + 1))
    assert.deepEqual(gizarteSistemakChallenges.map((item) => item.id), gizarteSistemakChallenges.map((_, index) => 101 + index))
    assert.deepEqual(gizarteSistemakExerciseBank.map((section) => section.id), stages)
    const ids = gizarteSistemakExerciseBank.flatMap((section) => section.items.map((item) => item.id))
    assert.deepEqual(ids, ids.map((_, index) => index + 1))
    for (const section of gizarteSistemakExerciseBank) {
        assert.equal(section.items.length, 10, section.id)
        assert.ok(section.items.some((item) => item.difficulty === 'easy') && section.items.some((item) => item.difficulty === 'hard'), section.id)
        for (const item of section.items) if (item.answer) assert.equal(checkAnswer(typed(item.answer.expected, item.answer.form), item.answer.expected, item.answer.form), 'correct', `${item.id}`)
    }
})

test('sistemak batx2 g: nothing with four unknowns, which this unit leaves out', () => {
    for (const text of allTexts()) {
        assert.ok(!/[+-]t\b|[+-]w\b/.test(text.es), text.es)
    }
})

test('sistemak batx2 g: every formula renders in KaTeX', () => {
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

test('sistemak batx2 g: each language in its own place, Arabic without the decimal comma', () => {
    for (const text of allTexts()) {
        assert.ok(!text.ar.includes('{,}'), text.ar)
        const words = (value: string) => value.replace(/\$[^$]+\$/g, ' ')
        if (/[a-zA-Z]{4}/.test(words(text.es))) assert.ok(/[؀-ۿ]/.test(words(text.ar)), `not Arabic: ${text.ar}`)
        for (const language of ['eu', 'es', 'en'] as const) assert.ok(!/[؀-ۿ]/.test(text[language]), `Arabic in ${language}: ${text[language]}`)
        if (/[a-zA-Z]{6}/.test(words(text.es)) && !/^Rouché-Frobenius$/.test(text.es)) assert.ok(text.eu !== text.es && text.en !== text.es, `copied from Spanish: ${text.es}`)
    }
})

test('sistemak batx2 g: Basque glues no case ending to a number, English writes the euro first, thousands grouped', () => {
    for (const text of allTexts()) {
        assert.ok(!/\d[a-zñ]/.test(text.eu.replace(/\$[^$]+\$/g, '')) && !/\$(?:ri|ren|rekin|z|ra|tik|ei|ek|ak|en|ko|an)(?![a-zA-Z])/.test(text.eu), text.eu)
        assert.ok(!/\d\s*€/.test(text.en.replace(/\$[^$]+\$/g, '')), text.en)
        for (const language of ['eu', 'es', 'en', 'ar'] as const) assert.ok(!/(?<![\d\\,])\d{5,}/.test(text[language]), `${language}: ${text[language]}`)
    }
})

test('sistemak batx2 g: every worked equality of plain numbers is right, and every answer is shown', () => {
    let checked = 0
    const texts = [
        ...[...gizarteSistemakPractice, ...gizarteSistemakChallenges].flatMap((item) => [item.hint.es, item.explanation.es]),
        ...gizarteSistemakExerciseBank.flatMap((section) => section.items.map((item) => item.solution.es)),
        ...gizarteSistemakDiagnostic.map((item) => item.explanation.es)
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
    for (const item of [...gizarteSistemakPractice, ...gizarteSistemakChallenges]) assert.ok(shows(item.explanation.es, item.expected), `${item.id}: ${written(item.expected)}`)
    for (const item of gizarteSistemakExerciseBank.flatMap((section) => section.items)) if (item.answer) assert.ok(shows(item.solution.es, item.answer.expected), `bank ${item.id}: ${written(item.answer.expected)}`)
})

test('sistemak batx2 g: the equalities of the own lesson hold', (t) => {
    let read = 0
    for (const id of ownTopics) {
        read += assertRelations(matrixRelations(workedBlock(id), lessonEnv[id]), `lesson ${id}`)
        const entry = gizarteSistemakLessonTexts[id as keyof typeof gizarteSistemakLessonTexts]
        const example = typeof entry.example === 'string' ? entry.example : entry.example.es
        read += assertRelations(matrixRelations(`${entry.examplePrompt!.es} ${example} ${entry.exampleAnswer?.es ?? ''}`), `example ${id}`)
        const checks = gizarteSistemakLessonChecks[id as keyof typeof gizarteSistemakLessonChecks]
        read += assertRelations(matrixRelations([checks.mistake.right, checks.check.explanation].map((text) => text.es).join(' ')), `check ${id}`)
    }
    t.diagnostic(`${read} equalities checked`)
    assert.ok(read >= 3, `only ${read} checked`)
})

test('sistemak batx2 g: the equalities of practice, challenges and bank hold', (t) => {
    const texts: Record<string, string> = {
        ...Object.fromEntries(gizarteSistemakPractice.map((item) => [`practice ${item.id}`, `${item.prompt.es} ${item.hint.es} ${item.explanation.es}`])),
        ...Object.fromEntries(gizarteSistemakChallenges.map((item) => [`challenge ${item.id}`, `${item.prompt.es} ${item.hint.es} ${item.explanation.es}`])),
        ...Object.fromEntries(gizarteSistemakExerciseBank.flatMap((section) => section.items).map((item) => [`bank ${item.id}`, `${item.question.es} ${item.solution.es}`]))
    }
    for (const where of Object.keys(exerciseEnv)) assert.ok(where in texts, where)
    let read = 0
    for (const [where, text] of Object.entries(texts)) read += assertRelations(matrixRelations(text, exerciseEnv[where]), where)
    t.diagnostic(`${read} equalities checked`)
    assert.ok(read >= 40, `only ${read} checked`)
    for (const text of allTexts()) for (const matrix of matricesIn(text.es)) if (matrix) assert.ok(matrix.every((row) => row.length === matrix[0].length))
})

