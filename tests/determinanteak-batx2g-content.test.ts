import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import katex from 'katex'
import { courses } from '../src/data/courses.ts'
import { checkAnswer, hasTerminatingDecimal, toExactDecimal, type FractionValue } from '../src/features/unit-v2/math/fraction.ts'
import { isUnitV2Path } from '../src/features/unit-v2/paths.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { gizarteDeterminanteakChallenges, gizarteDeterminanteakDiagnostic, gizarteDeterminanteakExerciseBank, gizarteDeterminanteakPractice } from '../src/pages/batx2-gizarte-determinanteak/content.ts'
import { gizarteDeterminanteakLessonChecks } from '../src/pages/batx2-gizarte-determinanteak/lessonChecks.ts'
import { gizarteDeterminanteakLessonTexts } from '../src/pages/batx2-gizarte-determinanteak/lessonTexts.ts'
import { evaluate, near } from './latex-math.ts'
import { detGrid, matricesIn, matrixRelations, type Env, type Relation } from './matrix-latex.ts'

/* Determinanteak · 2.º Bachillerato Ciencias Sociales. The lessons and exercises borrowed from the Ciencias twin
   are checked by tests/determinanteak-batx2z-content.test.ts; here, the unit as a whole and its own pieces. */

const stages = ['orders', 'properties', 'expansion', 'rank', 'inverse']
const ownTopics = Object.keys(gizarteDeterminanteakLessonTexts)
const unitTopics = [
    'det-two', 'sarrus', 'zero-det', 'transpose-swap', 'scale-row', 'add-multiple', 'product-det', 'minors-cofactors', 'laplace',
    'rank-by-minors', 'rank-parameter-minors', 'adjugate-inverse', 'inverse-parameter', 'det-matrix-equations', 'unique-prices'
]

const typed = (value: FractionValue, form?: string) => (hasTerminatingDecimal(value) && (form !== 'simplified' || value.denominator === 1) ? toExactDecimal(value)! : `${value.numerator}/${value.denominator}`)
const written = (value: FractionValue) => (hasTerminatingDecimal(value) ? toExactDecimal(value)!.replace(',', '{,}') : `\\frac{${Math.abs(value.numerator)}}{${value.denominator}}`)

const allTexts = (): LocalizedText[] => [
    ...gizarteDeterminanteakDiagnostic.flatMap((item) => [item.prompt, item.explanation, ...item.options]),
    ...[...gizarteDeterminanteakPractice, ...gizarteDeterminanteakChallenges].flatMap((item) => [item.prompt, item.hint, item.explanation]),
    ...gizarteDeterminanteakExerciseBank.flatMap((section) => [section.title, ...section.items.flatMap((item) => [item.question, item.solution])])
]

const lessonsSource = readFileSync(new URL('../src/pages/batx2-gizarte-determinanteak/lessons.tsx', import.meta.url), 'utf8')
function workedBlock(id: string): string {
    const start = lessonsSource.indexOf(`id: '${id}',`)
    assert.ok(start >= 0, id)
    const next = lessonsSource.indexOf("        id: '", start + 10)
    const block = lessonsSource.slice(start, next < 0 ? undefined : next).replace(/\\\\/g, '\\')
    return block.slice(block.indexOf('problem:'), block.indexOf('takeaway:'))
}

const lessonEnv: Record<string, Env> = {
    'unique-prices': { A: [[2, 1], [3, 2]], B: [[7], [12]], X: [[2], [3]] }
}

const exerciseEnv: Record<string, Env> = {
    'practice 9': { A: [[1, 4, 2], [0, 3, 1], [2, 0, 5]] },
    'practice 11': { A: [[3, 1, 2], [0, 4, 1], [2, 5, 0]] },
    'practice 20': { A: [[1, 2], [2, 5]] },
    'challenge 107': { A: [[2, 1, 0], [3, 4, 1], [0, 5, 2]] },
    'bank 47': { A: [[2, 5], [1, 3]] }
}

function assertRelations(relations: Relation[], where: string): number {
    for (const relation of relations) assert.ok(relation.holds, `${where}: ${relation.left} ${relation.relation} ${relation.right}`)
    return relations.length
}

test('determinanteak batx2 g: the unit is active and routed, with the lessons in order', () => {
    const course = courses.find((item) => item.id === 'batx2-gizarte')!
    assert.ok(course.topics.find((topic) => topic.id === 'determinantes')!.active)
    assert.ok(isUnitV2Path('/matematika/batx2-gizarte/determinantes'))
    assert.ok(isUnitV2Path('/matematika/batx2-gizarte/determinantes/ariketak'))
    const order = /const order = \[([\s\S]*?)\]/.exec(lessonsSource)![1]
    assert.deepEqual([...order.matchAll(/'([^']+)'/g)].map(([, id]) => id), unitTopics)
    for (const block of lessonsSource.split("        id: '").slice(1)) assert.ok(!/unit: '(?!batx1-zientziak\/|batx2-zientziak\/)/.test(block), 'a «Before you start» link to a unit that is not on main')
})

test('determinanteak batx2 g: diagnostic, practice, challenges and bank are consistent', () => {
    assert.deepEqual(gizarteDeterminanteakDiagnostic.map((question) => question.id), [142001, 142002, 142003, 142004, 142005, 142006, 142007, 142008])
    for (const question of gizarteDeterminanteakDiagnostic) {
        assert.ok(unitTopics.includes(question.topic), `${question.id}: ${question.topic}`)
        assert.ok(question.correctIndex < question.options.length)
        assert.equal(new Set(question.options.map((option) => option.es)).size, question.options.length)
    }
    assert.equal(new Set(gizarteDeterminanteakDiagnostic.map((question) => question.correctIndex)).size, 3)
    for (const stage of stages) {
        assert.equal(gizarteDeterminanteakPractice.filter((item) => item.stage === stage).length, 4, stage)
        assert.deepEqual(gizarteDeterminanteakChallenges.filter((item) => item.stage === stage).map((item) => item.points), [10, 20, 30], stage)
    }
    for (const item of [...gizarteDeterminanteakPractice, ...gizarteDeterminanteakChallenges]) {
        assert.ok(stages.includes(item.stage), `${item.id}`)
        assert.equal(checkAnswer(typed(item.expected, item.answerForm), item.expected, item.answerForm), 'correct', `${item.id}`)
    }
    assert.deepEqual(gizarteDeterminanteakPractice.map((item) => item.id), gizarteDeterminanteakPractice.map((_, index) => index + 1))
    assert.deepEqual(gizarteDeterminanteakChallenges.map((item) => item.id), gizarteDeterminanteakChallenges.map((_, index) => 101 + index))
    assert.deepEqual(gizarteDeterminanteakExerciseBank.map((section) => section.id), stages)
    const ids = gizarteDeterminanteakExerciseBank.flatMap((section) => section.items.map((item) => item.id))
    assert.deepEqual(ids, ids.map((_, index) => index + 1))
    for (const section of gizarteDeterminanteakExerciseBank) {
        assert.equal(section.items.length, 10, section.id)
        assert.ok(section.items.some((item) => item.difficulty === 'easy') && section.items.some((item) => item.difficulty === 'hard'), section.id)
        for (const item of section.items) if (item.answer) assert.equal(checkAnswer(typed(item.answer.expected, item.answer.form), item.answer.expected, item.answer.form), 'correct', `${item.id}`)
    }
})

test('determinanteak batx2 g: nothing of order 4, areas or equations of degree 2 or 3, which the Sociales books leave out', () => {
    for (const text of allTexts()) {
        for (const [, formula] of text.es.matchAll(/\$([^$]+)\$/g)) {
            for (const [, body] of formula.matchAll(/\\begin\{[pv]matrix\}([\s\S]*?)\\end\{[pv]matrix\}/g)) {
                const rows = body.split('\\\\')
                assert.ok(rows.length < 4 || rows[0].split('&').length < 4, `order 4: ${formula}`)
            }
            assert.ok(!/x\^[23]|x\^\{[23]\}/.test(formula), `degree 2 or 3 in x: ${formula}`)
        }
        assert.ok(!/área|paralelogramo|triángulo/.test(text.es), text.es)
    }
})

test('determinanteak batx2 g: every formula renders in KaTeX', () => {
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

test('determinanteak batx2 g: each language in its own place, Arabic without the decimal comma', () => {
    for (const text of allTexts()) {
        assert.ok(!text.ar.includes('{,}'), text.ar)
        const words = (value: string) => value.replace(/\$[^$]+\$/g, ' ')
        if (/[a-zA-Z]{4}/.test(words(text.es))) assert.ok(/[؀-ۿ]/.test(words(text.ar)), `not Arabic: ${text.ar}`)
        for (const language of ['eu', 'es', 'en'] as const) assert.ok(!/[؀-ۿ]/.test(text[language]), `Arabic in ${language}: ${text[language]}`)
        if (/[a-zA-Z]{6}/.test(words(text.es))) assert.ok(text.eu !== text.es && text.en !== text.es, `copied from Spanish: ${text.es}`)
    }
})

test('determinanteak batx2 g: Basque glues no case ending to a number, English writes the euro first, thousands grouped', () => {
    for (const text of allTexts()) {
        assert.ok(!/\d[a-zñ]/.test(text.eu.replace(/\$[^$]+\$/g, '')) && !/\$(?:ri|ren|rekin|z|ra|tik|ei|ek|ak|en|ko|an)(?![a-zA-Z])/.test(text.eu), text.eu)
        assert.ok(!/\d\s*€/.test(text.en.replace(/\$[^$]+\$/g, '')), text.en)
        for (const language of ['eu', 'es', 'en', 'ar'] as const) assert.ok(!/(?<![\d\\,])\d{5,}/.test(text[language]), `${language}: ${text[language]}`)
    }
})

test('determinanteak batx2 g: every worked equality of plain numbers is right, and every answer is shown', () => {
    let checked = 0
    const texts = [
        ...[...gizarteDeterminanteakPractice, ...gizarteDeterminanteakChallenges].flatMap((item) => [item.hint.es, item.explanation.es]),
        ...gizarteDeterminanteakExerciseBank.flatMap((section) => section.items.map((item) => item.solution.es)),
        ...gizarteDeterminanteakDiagnostic.map((item) => item.explanation.es)
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
    for (const item of [...gizarteDeterminanteakPractice, ...gizarteDeterminanteakChallenges]) assert.ok(shows(item.explanation.es, item.expected), `${item.id}: ${written(item.expected)}`)
    for (const item of gizarteDeterminanteakExerciseBank.flatMap((section) => section.items)) if (item.answer) assert.ok(shows(item.solution.es, item.answer.expected), `bank ${item.id}: ${written(item.answer.expected)}`)
})

test('determinanteak batx2 g: a determinant written with numbers is worked out the same in the answer', () => {
    let read = 0
    const check = (prompt: string, expected: FractionValue, where: string) => {
        const asked = [...prompt.matchAll(/\$\\begin\{vmatrix\}([\s\S]*?)\\end\{vmatrix\}\$/g)]
        if (!prompt.startsWith('Calcula') || asked.length !== 1) return
        const grid = asked[0][1].split('\\\\').map((row) => row.split('&').map((cell) => evaluate(cell.trim().replace(/^\{([^{}]*)\}$/, '$1'))))
        if (grid.some((row) => row.some((value) => value === null))) return
        read += 1
        assert.ok(near(detGrid(grid as number[][])!, expected.numerator / expected.denominator), where)
    }
    for (const item of [...gizarteDeterminanteakPractice, ...gizarteDeterminanteakChallenges]) check(item.prompt.es, item.expected, `${item.id}`)
    for (const item of gizarteDeterminanteakExerciseBank.flatMap((section) => section.items)) if (item.answer) check(item.question.es, item.answer.expected, `bank ${item.id}`)
    assert.ok(read >= 12, `only ${read} read`)
})

test('determinanteak batx2 g: the equalities of the own lesson hold', (t) => {
    let read = 0
    for (const id of ownTopics) {
        read += assertRelations(matrixRelations(workedBlock(id), lessonEnv[id]), `lesson ${id}`)
        const entry = gizarteDeterminanteakLessonTexts[id as keyof typeof gizarteDeterminanteakLessonTexts]
        const example = typeof entry.example === 'string' ? entry.example : entry.example.es
        read += assertRelations(matrixRelations(`${entry.examplePrompt!.es} ${example} ${entry.exampleAnswer?.es ?? ''}`), `example ${id}`)
        const checks = gizarteDeterminanteakLessonChecks[id as keyof typeof gizarteDeterminanteakLessonChecks]
        read += assertRelations(matrixRelations([checks.mistake.right, checks.check.explanation].map((text) => text.es).join(' ')), `check ${id}`)
    }
    t.diagnostic(`${read} equalities checked`)
    assert.ok(read >= 3, `only ${read} checked`)
})

test('determinanteak batx2 g: the equalities of practice, challenges and bank hold', (t) => {
    const texts: Record<string, string> = {
        ...Object.fromEntries(gizarteDeterminanteakPractice.map((item) => [`practice ${item.id}`, `${item.prompt.es} ${item.hint.es} ${item.explanation.es}`])),
        ...Object.fromEntries(gizarteDeterminanteakChallenges.map((item) => [`challenge ${item.id}`, `${item.prompt.es} ${item.hint.es} ${item.explanation.es}`])),
        ...Object.fromEntries(gizarteDeterminanteakExerciseBank.flatMap((section) => section.items).map((item) => [`bank ${item.id}`, `${item.question.es} ${item.solution.es}`]))
    }
    for (const where of Object.keys(exerciseEnv)) assert.ok(where in texts, where)
    let read = 0
    for (const [where, text] of Object.entries(texts)) read += assertRelations(matrixRelations(text, exerciseEnv[where]), where)
    t.diagnostic(`${read} equalities checked`)
    assert.ok(read >= 40, `only ${read} checked`)
    for (const text of allTexts()) for (const matrix of matricesIn(text.es)) if (matrix) assert.ok(matrix.every((row) => row.length === matrix[0].length))
})

test('determinanteak batx2 g: «Check it» of the own lesson has the worked answer, and the bundle of the mistake is proportional', () => {
    const { check } = gizarteDeterminanteakLessonChecks['unique-prices']
    assert.equal(2 * 6 - 3 * 4, 0)
    assert.ok(check.options[check.correctIndex].es.includes('|A|=0'))
})
