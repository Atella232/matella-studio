import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import katex from 'katex'
import { courses } from '../src/data/courses.ts'
import { checkAnswer, hasTerminatingDecimal, toExactDecimal, type FractionValue } from '../src/features/unit-v2/math/fraction.ts'
import { isUnitV2Path } from '../src/features/unit-v2/paths.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { gizarteMatrizeakChallenges, gizarteMatrizeakDiagnostic, gizarteMatrizeakExerciseBank, gizarteMatrizeakPractice } from '../src/pages/batx2-gizarte-matrizeak/content.ts'
import { gizarteMatrizeakLessonChecks } from '../src/pages/batx2-gizarte-matrizeak/lessonChecks.ts'
import { gizarteMatrizeakLessonTexts } from '../src/pages/batx2-gizarte-matrizeak/lessonTexts.ts'
import { evaluate, near } from './latex-math.ts'
import { matricesIn, matrixRelations, type Env, type Relation } from './matrix-latex.ts'

/* Matrizeak · 2.º Bachillerato Ciencias Sociales. The lessons and exercises borrowed from the Ciencias twin
   are checked by tests/matrizeak-batx2z-content.test.ts; here, the unit as a whole and its own pieces. */

const stages = ['basics', 'operations', 'rank', 'inverse', 'equations']
const ownTopics = Object.keys(gizarteMatrizeakLessonTexts)
const unitTopics = [
    'data-tables', 'matrix-types', 'transpose-symmetric', 'sum-scalar', 'matrix-product', 'product-properties', 'costs-profits', 'production-chain',
    'rank-gauss', 'rank-parameter', 'inverse-definition', 'gauss-jordan', 'matrix-powers', 'matrix-equations', 'equation-systems', 'matrix-form-system'
]

const typed = (value: FractionValue, form?: string) => (hasTerminatingDecimal(value) && (form !== 'simplified' || value.denominator === 1) ? toExactDecimal(value)! : `${value.numerator}/${value.denominator}`)
const written = (value: FractionValue) => (hasTerminatingDecimal(value) ? toExactDecimal(value)!.replace(',', '{,}') : `\\frac{${Math.abs(value.numerator)}}{${value.denominator}}`)

const allTexts = (): LocalizedText[] => [
    ...gizarteMatrizeakDiagnostic.flatMap((item) => [item.prompt, item.explanation, ...item.options]),
    ...[...gizarteMatrizeakPractice, ...gizarteMatrizeakChallenges].flatMap((item) => [item.prompt, item.hint, item.explanation]),
    ...gizarteMatrizeakExerciseBank.flatMap((section) => [section.title, ...section.items.flatMap((item) => [item.question, item.solution])])
]

const lessonsSource = readFileSync(new URL('../src/pages/batx2-gizarte-matrizeak/lessons.tsx', import.meta.url), 'utf8')
function workedBlock(id: string): string {
    const start = lessonsSource.indexOf(`id: '${id}',`)
    assert.ok(start >= 0, id)
    const next = lessonsSource.indexOf("        id: '", start + 10)
    const block = lessonsSource.slice(start, next < 0 ? undefined : next).replace(/\\\\/g, '\\')
    return block.slice(block.indexOf('problem:'), block.indexOf('takeaway:'))
}

const lessonEnv: Record<string, Env> = {
    'data-tables': { M: [[15, 9, 6], [18, 8, 13]] },
    'costs-profits': { Q: [[40, 10], [20, 15]], C: [[25], [60]], V: [[40], [90]] },
    'production-chain': { A: [[4, 2], [3, 5]], B: [[2, 4], [3, 5]] },
    'matrix-form-system': { A: [[2, 3], [1, 2]], B: [[31], [18]], X: [[8], [5]] }
}
const exampleEnv: Record<string, Env> = {
    'matrix-form-system': { X: [[3], [2]] }
}

const exerciseEnv: Record<string, Env> = {
    'practice 16': { B: [[0, -1], [1, 0]] },
    'practice 17': { A: [[1, 1], [1, 2]], B: [[3], [4]], X: [[2], [1]] },
    'practice 18': { A: [[1, 1], [0, 1]], B: [[2, 5]], X: [[2, 3]] },
    'practice 19': { X: [[1, 1], [1, 1]], Y: [[2, -1], [1, -2]] },
    'practice 20': { A: [[1, 1], [1, 2]] },
    'challenge 106': { A: [[20, 35, 50]], B: [[30, 50, 80]], D: [[100], [60], [40]] },
    'challenge 113': { X: [[3, 4], [0, 2]] },
    'challenge 114': { A: [[1, 2], [1, 3]], B: [[4, 1], [5, 2]], X: [[2, -1], [1, 1]] },
    'bank 13': { G: [[400, 120], [500, 180]] },
    'bank 20': { Q: [[8, 5], [12, 6]], P: [[9, 10], [2, 1]] },
    'bank 33': { A: [[1, -1], [2, 0]] },
    'bank 37': { A: [[-1, 0], [0, 1]] },
    'bank 39': { A: [[1, 0], [-2, 1]] },
    'bank 44': { A: [[1, 1], [0, 1]], B: [[3, 2], [1, 0]], X: [[2, 2], [1, 0]] },
    'bank 45': { A: [[2, 1], [1, 1]], B: [[3, 2], [1, 1]], X: [[1, 1], [0, 1]] },
    'bank 46': { A: [[3, 2], [2, 1]], X: [[6], [4]] },
    'bank 47': { X: [[3, 1], [1, 0]], Y: [[1, -1], [1, 2]] },
    'bank 49': { A: [[3, 1], [2, 2]], B: [[1, 0], [0, 1]], X: [[0, -0.5], [-1, 0.5]] },
    'bank 50': { A: [[1, 0], [1, 1]], X: [[-1, 0], [3, -1]] }
}

function assertRelations(relations: Relation[], where: string): number {
    for (const relation of relations) assert.ok(relation.holds, `${where}: ${relation.left} ${relation.relation} ${relation.right}`)
    return relations.length
}

test('matrizeak batx2 g: the unit is active and routed, with the lessons in order', () => {
    const course = courses.find((item) => item.id === 'batx2-gizarte')!
    assert.ok(course.topics.find((topic) => topic.id === 'matrices')!.active)
    assert.ok(isUnitV2Path('/matematika/batx2-gizarte/matrices'))
    assert.ok(isUnitV2Path('/matematika/batx2-gizarte/matrices/ariketak'))
    const order = /const order = \[([\s\S]*?)\]/.exec(lessonsSource)![1]
    assert.deepEqual([...order.matchAll(/'([^']+)'/g)].map(([, id]) => id), unitTopics)
    for (const block of lessonsSource.split("        id: '").slice(1)) assert.ok(!/unit: '(?!batx1-zientziak\/)/.test(block), 'a «Before you start» link to a unit that is not on main')
})

test('matrizeak batx2 g: diagnostic, practice, challenges and bank are consistent', () => {
    assert.deepEqual(gizarteMatrizeakDiagnostic.map((question) => question.id), [141001, 141002, 141003, 141004, 141005, 141006, 141007, 141008])
    for (const question of gizarteMatrizeakDiagnostic) {
        assert.ok(unitTopics.includes(question.topic), `${question.id}: ${question.topic}`)
        assert.ok(question.correctIndex < question.options.length)
        assert.equal(new Set(question.options.map((option) => option.es)).size, question.options.length)
    }
    assert.equal(new Set(gizarteMatrizeakDiagnostic.map((question) => question.correctIndex)).size, 3)
    for (const stage of stages) {
        assert.equal(gizarteMatrizeakPractice.filter((item) => item.stage === stage).length, 4, stage)
        const challenges = gizarteMatrizeakChallenges.filter((item) => item.stage === stage)
        assert.deepEqual(challenges.map((item) => item.points), [10, 20, 30], stage)
    }
    for (const item of [...gizarteMatrizeakPractice, ...gizarteMatrizeakChallenges]) {
        assert.ok(stages.includes(item.stage), `${item.id}`)
        assert.equal(checkAnswer(typed(item.expected, item.answerForm), item.expected, item.answerForm), 'correct', `${item.id}`)
    }
    assert.deepEqual(gizarteMatrizeakPractice.map((item) => item.id), gizarteMatrizeakPractice.map((_, index) => index + 1))
    assert.deepEqual(gizarteMatrizeakChallenges.map((item) => item.id), gizarteMatrizeakChallenges.map((_, index) => 101 + index))
    assert.deepEqual(gizarteMatrizeakExerciseBank.map((section) => section.id), stages)
    const ids = gizarteMatrizeakExerciseBank.flatMap((section) => section.items.map((item) => item.id))
    assert.deepEqual(ids, ids.map((_, index) => index + 1))
    for (const section of gizarteMatrizeakExerciseBank) {
        assert.equal(section.items.length, 10, section.id)
        assert.ok(section.items.some((item) => item.difficulty === 'easy') && section.items.some((item) => item.difficulty === 'hard'), section.id)
        for (const item of section.items) if (item.answer) assert.equal(checkAnswer(typed(item.answer.expected, item.answer.form), item.answer.expected, item.answer.form), 'correct', `${item.id}`)
    }
    // Nothing left about linear dependence or commuting matrices, which the Sociales books leave out
    for (const text of allTexts()) assert.ok(!/conmut|combinación lineal/.test(text.es), text.es)
})

test('matrizeak batx2 g: every formula renders in KaTeX', () => {
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

test('matrizeak batx2 g: each language in its own place, Arabic without the decimal comma', () => {
    for (const text of allTexts()) {
        assert.ok(!text.ar.includes('{,}'), text.ar)
        const words = (value: string) => value.replace(/\$[^$]+\$/g, ' ')
        if (/[a-zA-Z]{4}/.test(words(text.es))) assert.ok(/[؀-ۿ]/.test(words(text.ar)), `not Arabic: ${text.ar}`)
        for (const language of ['eu', 'es', 'en'] as const) assert.ok(!/[؀-ۿ]/.test(text[language]), `Arabic in ${language}: ${text[language]}`)
        if (/[a-zA-Z]{6}/.test(words(text.es))) assert.ok(text.eu !== text.es && text.en !== text.es, `copied from Spanish: ${text.es}`)
    }
})

test('matrizeak batx2 g: Basque glues no case ending to a number, English writes the euro first, thousands grouped', () => {
    for (const text of allTexts()) {
        assert.ok(!/\d[a-zñ]/.test(text.eu.replace(/\$[^$]+\$/g, '')) && !/\$(?:ri|ren|rekin|z|ra|tik|ei|ek|ak|en|ko|an)(?![a-zA-Z])/.test(text.eu), text.eu)
        assert.ok(!/\d\s*€/.test(text.en.replace(/\$[^$]+\$/g, '')), text.en)
        for (const language of ['eu', 'es', 'en', 'ar'] as const) assert.ok(!/(?<![\d\\,])\d{5,}/.test(text[language]), `${language}: ${text[language]}`)
    }
})

test('matrizeak batx2 g: every worked equality with numbers is right, and every answer is shown', () => {
    let checked = 0
    const texts = [
        ...[...gizarteMatrizeakPractice, ...gizarteMatrizeakChallenges].flatMap((item) => [item.hint.es, item.explanation.es]),
        ...gizarteMatrizeakExerciseBank.flatMap((section) => section.items.map((item) => item.solution.es))
    ]
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
    assert.ok(checked >= 15, `only ${checked} checked`)
    const shows = (text: string, value: FractionValue) => [written(value), `-${written(value)}`].some((candidate) => text.replace(/\\,/g, '').includes(candidate))
    for (const item of [...gizarteMatrizeakPractice, ...gizarteMatrizeakChallenges]) assert.ok(shows(item.explanation.es, item.expected), `${item.id}: ${written(item.expected)}`)
})

test('matrizeak batx2 g: the matrix equalities of the own lessons hold', (t) => {
    let read = 0
    for (const id of ownTopics) {
        read += assertRelations(matrixRelations(workedBlock(id), lessonEnv[id]), `lesson ${id}`)
        const entry = gizarteMatrizeakLessonTexts[id as keyof typeof gizarteMatrizeakLessonTexts]
        const example = typeof entry.example === 'string' ? entry.example : entry.example.es
        const whyMath = typeof entry.why?.math === 'string' ? entry.why.math : entry.why?.math?.es ?? ''
        read += assertRelations(matrixRelations(`${entry.examplePrompt!.es} ${example} ${entry.exampleAnswer?.es ?? ''} ${whyMath}`, exampleEnv[id]), `example ${id}`)
        const checks = gizarteMatrizeakLessonChecks[id as keyof typeof gizarteMatrizeakLessonChecks]
        read += assertRelations(matrixRelations([checks.mistake.right, checks.check.explanation].map((text) => text.es).join(' ')), `check ${id}`)
    }
    t.diagnostic(`${read} equalities checked`)
    assert.ok(read >= 8, `only ${read} checked`)
})

test('matrizeak batx2 g: the matrix equalities of practice, challenges and bank hold', (t) => {
    const texts: Record<string, string> = {
        ...Object.fromEntries(gizarteMatrizeakPractice.map((item) => [`practice ${item.id}`, `${item.prompt.es} ${item.hint.es} ${item.explanation.es}`])),
        ...Object.fromEntries(gizarteMatrizeakChallenges.map((item) => [`challenge ${item.id}`, `${item.prompt.es} ${item.hint.es} ${item.explanation.es}`])),
        ...Object.fromEntries(gizarteMatrizeakExerciseBank.flatMap((section) => section.items).map((item) => [`bank ${item.id}`, `${item.question.es} ${item.solution.es}`]))
    }
    for (const where of Object.keys(exerciseEnv)) assert.ok(where in texts, where)
    let read = 0
    for (const [where, text] of Object.entries(texts)) read += assertRelations(matrixRelations(text, exerciseEnv[where]), where)
    t.diagnostic(`${read} equalities checked`)
    assert.ok(read >= 40, `only ${read} checked`)
    for (const text of allTexts()) for (const matrix of matricesIn(text.es)) if (matrix) assert.ok(matrix.every((row) => row.length === matrix[0].length))
})

test('matrizeak batx2 g: the right answer of each own «Check it» on prices is the one worked out', () => {
    const { check } = gizarteMatrizeakLessonChecks['costs-profits']
    assert.equal(check.options[check.correctIndex].es, `$${10 * 8 + 20 * 5}$`)
    assert.equal(new Set(Object.values(gizarteMatrizeakLessonChecks).map((entry) => entry.check.correctIndex)).size, 3)
})
