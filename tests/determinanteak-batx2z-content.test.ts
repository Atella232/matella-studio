import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import katex from 'katex'
import { courses } from '../src/data/courses.ts'
import { checkAnswer, hasTerminatingDecimal, toExactDecimal, type FractionValue } from '../src/features/unit-v2/math/fraction.ts'
import { isUnitV2Path } from '../src/features/unit-v2/paths.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { determinanteakChallenges, determinanteakDiagnostic, determinanteakExerciseBank, determinanteakPractice } from '../src/pages/batx2-zientziak-determinanteak/content.ts'
import { determinanteakLessonChecks } from '../src/pages/batx2-zientziak-determinanteak/lessonChecks.ts'
import { determinanteakLessonTexts } from '../src/pages/batx2-zientziak-determinanteak/lessonTexts.ts'
import { evaluate, near } from './latex-math.ts'
import { detGrid, matricesIn, matrixRelations, type Env, type Relation } from './matrix-latex.ts'

const stages = ['orders', 'properties', 'expansion', 'rank', 'inverse']
const topics = Object.keys(determinanteakLessonTexts)

const typed = (value: FractionValue, form?: string) => (hasTerminatingDecimal(value) && (form !== 'simplified' || value.denominator === 1) ? toExactDecimal(value)! : `${value.numerator}/${value.denominator}`)
const written = (value: FractionValue) => (hasTerminatingDecimal(value) ? toExactDecimal(value)!.replace(',', '{,}') : `\\frac{${Math.abs(value.numerator)}}{${value.denominator}}`)

const allTexts = (): LocalizedText[] => [
    ...determinanteakDiagnostic.flatMap((item) => [item.prompt, item.explanation, ...item.options]),
    ...[...determinanteakPractice, ...determinanteakChallenges].flatMap((item) => [item.prompt, item.hint, item.explanation]),
    ...determinanteakExerciseBank.flatMap((section) => [section.title, ...section.items.flatMap((item) => [item.question, item.solution])])
]

/** The source of one lesson in lessons.tsx, with the doubled backslashes of the strings read as one */
const lessonsSource = readFileSync(new URL('../src/pages/batx2-zientziak-determinanteak/lessons.tsx', import.meta.url), 'utf8')
function lessonBlock(id: string): string {
    const start = lessonsSource.indexOf(`id: '${id}',`)
    assert.ok(start >= 0, id)
    const next = lessonsSource.indexOf("        id: '", start + 10)
    return lessonsSource.slice(start, next < 0 ? undefined : next).replace(/\\\\/g, '\\')
}

/** «Let's solve» and its steps (the key idea speaks in general) */
function workedBlock(id: string): string {
    const block = lessonBlock(id)
    return block.slice(block.indexOf('problem:'), block.indexOf('takeaway:'))
}

/* ---------- The named matrices of each text ---------- */

const lessonEnv: Record<string, Env> = {
    'minors-cofactors': { A: [[2, 1, 3], [0, 4, 1], [5, 2, 1]] },
    'adjugate-inverse': { A: [[1, 2, 0], [0, 1, 1], [1, 0, 1]] }
}

const exampleEnv: Record<string, Env> = {}

/** «Check it» and the mistakes speak of a general A, so no named matrix there */
const checkEnv: Record<string, Env> = {}

const exerciseEnv: Record<string, Env> = {
    'practice 9': { A: [[1, 4, 2], [0, 3, 1], [2, 0, 5]] },
    'challenge 107': { A: [[2, 1, 0], [3, 4, 1], [0, 5, 2]] }
}

function assertRelations(relations: Relation[], where: string): number {
    for (const relation of relations) assert.ok(relation.holds, `${where}: ${relation.left} ${relation.relation} ${relation.right}`)
    return relations.length
}

const exerciseTexts = (): Record<string, string> => ({
    ...Object.fromEntries(determinanteakPractice.map((item) => [`practice ${item.id}`, `${item.prompt.es} ${item.hint.es} ${item.explanation.es}`])),
    ...Object.fromEntries(determinanteakChallenges.map((item) => [`challenge ${item.id}`, `${item.prompt.es} ${item.hint.es} ${item.explanation.es}`])),
    ...Object.fromEntries(determinanteakExerciseBank.flatMap((section) => section.items).map((item) => [`bank ${item.id}`, `${item.question.es} ${item.solution.es}`])),
    ...Object.fromEntries(determinanteakDiagnostic.map((item) => [`diagnostic ${item.id}`, `${item.prompt.es} ${item.explanation.es} ${item.options[item.correctIndex].es}`]))
})

/* ---------- Tests ---------- */

test('determinanteak batx2 z: the unit is active and routed', () => {
    const course = courses.find((item) => item.id === 'batx2-zientziak')!
    assert.ok(course.topics.find((topic) => topic.id === 'determinantes')!.active)
    assert.ok(!courses.find((item) => item.id === 'batx2-gizarte')!.topics.find((topic) => topic.id === 'determinantes')!.active, 'only the Ciencias course')
    assert.ok(isUnitV2Path('/matematika/batx2-zientziak/determinantes'))
    assert.ok(isUnitV2Path('/matematika/batx2-zientziak/determinantes/ariketak'))
})

test('determinanteak batx2 z: diagnostic, practice, challenges and bank are consistent', () => {
    assert.equal(determinanteakDiagnostic.length, 8)
    // The unit's block of ids is 117000–117999
    assert.deepEqual(determinanteakDiagnostic.map((question) => question.id), [117001, 117002, 117003, 117004, 117005, 117006, 117007, 117008])
    for (const question of determinanteakDiagnostic) {
        assert.ok(topics.includes(question.topic), `${question.id}`)
        assert.ok(question.correctIndex < question.options.length)
        assert.equal(new Set(question.options.map((option) => option.es)).size, question.options.length)
    }
    assert.ok(new Set(determinanteakDiagnostic.map((question) => question.correctIndex)).size === 3)
    for (const stage of stages) {
        assert.equal(determinanteakPractice.filter((item) => item.stage === stage).length, 4, stage)
        assert.equal(determinanteakChallenges.filter((item) => item.stage === stage).length, 3, stage)
    }
    for (const item of [...determinanteakPractice, ...determinanteakChallenges]) {
        assert.ok(stages.includes(item.stage), `${item.id}`)
        assert.equal(checkAnswer(typed(item.expected, item.answerForm), item.expected, item.answerForm), 'correct', `${item.id}`)
        for (const language of ['eu', 'es', 'en', 'ar'] as const) assert.ok(item.explanation[language].length > 0 && item.prompt[language].length > 0 && item.hint[language].length > 0, `${item.id} ${language}`)
    }
    assert.deepEqual(determinanteakPractice.map((item) => item.id), determinanteakPractice.map((_, index) => index + 1))
    assert.deepEqual(determinanteakExerciseBank.map((section) => section.id), stages)
    const ids = determinanteakExerciseBank.flatMap((section) => section.items.map((item) => item.id))
    assert.deepEqual(ids, ids.map((_, index) => index + 1))
    assert.equal(ids.length, 50)
    for (const section of determinanteakExerciseBank) {
        assert.equal(section.items.length, 10, section.id)
        assert.ok(section.items.some((item) => item.difficulty === 'easy') && section.items.some((item) => item.difficulty === 'hard'), section.id)
        for (const item of section.items) {
            for (const language of ['eu', 'es', 'en', 'ar'] as const) assert.ok(item.question[language].length > 0 && item.solution[language].length > 0, `${item.id} ${language}`)
            if (item.answer) assert.equal(checkAnswer(typed(item.answer.expected, item.answer.form), item.answer.expected, item.answer.form), 'correct', `${item.id}`)
        }
    }
    assert.deepEqual(determinanteakChallenges.map((item) => item.id), [101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115])
    assert.deepEqual([...new Set(determinanteakChallenges.map((item) => item.points))].sort(), [10, 20, 30])
})

test('determinanteak batx2 z: every formula renders in KaTeX', () => {
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

test('determinanteak batx2 z: each language in its own place, and Arabic never keeps the decimal comma', () => {
    for (const text of allTexts()) {
        assert.ok(!text.ar.includes('{,}'), text.ar)
        const words = (value: string) => value.replace(/\$[^$]+\$/g, ' ')
        if (/[a-zA-Z]{4}/.test(words(text.es))) assert.ok(/[؀-ۿ]/.test(words(text.ar)), `not Arabic: ${text.ar}`)
        for (const language of ['eu', 'es', 'en'] as const) assert.ok(!/[؀-ۿ]/.test(text[language]), `Arabic in ${language}: ${text[language]}`)
        if (/[a-zA-Z]{6}/.test(words(text.es))) assert.ok(text.eu !== text.es && text.en !== text.es, `copied from Spanish: ${text.es}`)
        // A word of Spanish left in the formulas of every language (y, o) would be read in Basque and Arabic too
        if (text.eu === text.es) assert.ok(!/\$\s+(?:y|o|e)\s+\$/.test(text.es), `a Spanish word between formulas: ${text.es}`)
    }
})

test('determinanteak batx2 z: Basque glues no case ending to a number or a formula', () => {
    for (const text of allTexts()) {
        assert.ok(!/\d[a-zñ]/.test(text.eu.replace(/\$[^$]+\$/g, '')) && !/\$(?:ri|ren|rekin|z|ra|tik|ei|ek|ak|en|ko|an)(?![a-zA-Z])/.test(text.eu), text.eu)
    }
})

test('determinanteak batx2 z: every worked equality of plain numbers is right', () => {
    const texts = [
        ...determinanteakPractice.flatMap((item) => [item.hint.es, item.explanation.es]),
        ...determinanteakChallenges.flatMap((item) => [item.hint.es, item.explanation.es]),
        ...determinanteakExerciseBank.flatMap((section) => section.items.map((item) => item.solution.es)),
        ...determinanteakDiagnostic.flatMap((item) => [item.explanation.es])
    ]
    let checked = 0
    for (const text of texts) {
        for (const [, formula] of text.matchAll(/\$([^$]+)\$/g)) {
            // The determinants and matrices are read apart, by the matrix reader
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
})

test('determinanteak batx2 z: every answer appears in its worked explanation or solution', () => {
    const shows = (text: string, value: FractionValue) => {
        const plain = written(value)
        return [plain, value.numerator < 0 ? `-${plain}` : plain].some((candidate) => text.replace(/\\,/g, '').includes(candidate))
    }
    for (const item of [...determinanteakPractice, ...determinanteakChallenges]) assert.ok(shows(item.explanation.es, item.expected), `${item.id}: ${written(item.expected)}`)
    for (const item of determinanteakExerciseBank.flatMap((section) => section.items)) if (item.answer) assert.ok(shows(item.solution.es, item.answer.expected), `${item.id}: ${written(item.answer.expected)}`)
})

test('determinanteak batx2 z: a determinant written with numbers is worked out the same in the answer', () => {
    // «Work out |…|»: the number expected is the value of the determinant of the statement
    let read = 0
    for (const item of [...determinanteakPractice, ...determinanteakChallenges]) {
        const asked = [...item.prompt.es.matchAll(/\$\\begin\{vmatrix\}([\s\S]*?)\\end\{vmatrix\}\$/g)]
        if (!item.prompt.es.startsWith('Calcula') || asked.length !== 1) continue
        const grid = asked[0][1].split('\\\\').map((row) => row.split('&').map((cell) => evaluate(cell.trim().replace(/^\{([^{}]*)\}$/, '$1'))))
        if (grid.some((row) => row.some((value) => value === null))) continue
        read += 1
        assert.ok(near(detGrid(grid as number[][])!, item.expected.numerator / item.expected.denominator), `${item.id}`)
    }
    for (const item of determinanteakExerciseBank.flatMap((section) => section.items)) {
        const asked = [...item.question.es.matchAll(/\$\\begin\{vmatrix\}([\s\S]*?)\\end\{vmatrix\}\$/g)]
        if (!item.question.es.startsWith('Calcula') || asked.length !== 1 || !item.answer) continue
        const grid = asked[0][1].split('\\\\').map((row) => row.split('&').map((cell) => evaluate(cell.trim())))
        if (grid.some((row) => row.some((value) => value === null))) continue
        read += 1
        assert.ok(near(detGrid(grid as number[][])!, item.answer.expected.numerator / item.answer.expected.denominator), `bank ${item.id}`)
    }
    assert.ok(read >= 12, `only ${read} read`)
})

test('determinanteak batx2 z: the equalities of the lessons hold (determinants, products, inverses)', (t) => {
    let read = 0
    for (const id of topics) {
        read += assertRelations(matrixRelations(workedBlock(id), lessonEnv[id]), `lesson ${id}`)
        const entry = determinanteakLessonTexts[id as keyof typeof determinanteakLessonTexts]
        const example = typeof entry.example === 'string' ? entry.example : entry.example.es
        const caseMaths = (entry.cases ?? []).map((item) => (typeof item.math === 'string' ? item.math : item.math?.es ?? '')).join(' ')
        const whyMath = typeof entry.why?.math === 'string' ? entry.why.math : entry.why?.math?.es ?? ''
        read += assertRelations(matrixRelations(`${entry.examplePrompt!.es} ${example} ${entry.exampleAnswer?.es ?? ''} ${caseMaths} ${whyMath}`, exampleEnv[id]), `example ${id}`)
        const checks = determinanteakLessonChecks[id as keyof typeof determinanteakLessonChecks]
        // The wrong line of the mistake box is wrong on purpose: it is checked apart
        const checkText = [checks.mistake.right, checks.check.prompt, checks.check.explanation, ...checks.check.options].map((text) => text.es).join(' ')
        read += assertRelations(matrixRelations(checkText, checkEnv[id]), `check ${id}`)
    }
    t.diagnostic(`${read} equalities checked`)
    assert.ok(read >= 40, `only ${read} checked`)
})

test('determinanteak batx2 z: the wrong line of each typical mistake really is wrong', () => {
    // A chain like |…| = 1·4 + 2·3 = 10 is wrong in its first step and right in its sum: one wrong step is enough
    let read = 0
    for (const [id, { mistake }] of Object.entries(determinanteakLessonChecks)) {
        const relations = matrixRelations(mistake.wrong.es, checkEnv[id])
        if (!relations.length) continue
        read += 1
        assert.ok(relations.some((relation) => !relation.holds), `${id}: every step of the mistake is right`)
    }
    assert.ok(read >= 2, `only ${read} mistakes read`)
})

test('determinanteak batx2 z: «Check it» on a determinant with numbers has one right answer', () => {
    let read = 0
    for (const [id, { check }] of Object.entries(determinanteakLessonChecks)) {
        const asked = [...check.prompt.es.matchAll(/\$([^$]+)\$/g)].map(([, formula]) => formula)
        if (asked.length !== 1 || !/\\begin\{vmatrix\}/.test(asked[0]) || /=/.test(asked[0])) continue
        const results = check.options.map((option) => matrixRelations(`$${asked[0]}=${option.es.replace(/^\$|\$$/g, '')}$`))
        if (results.some((list) => list.length !== 1)) continue
        read += 1
        results.forEach((list, index) => assert.equal(list[0].holds, index === check.correctIndex, `${id}: option ${index}`))
    }
    assert.ok(read >= 1, `only ${read} read`)
})

test('determinanteak batx2 z: the equalities of practice, challenges and bank hold', (t) => {
    const texts = exerciseTexts()
    for (const where of Object.keys(exerciseEnv)) assert.ok(where in texts, where)
    let read = 0
    for (const [where, text] of Object.entries(texts)) read += assertRelations(matrixRelations(text, exerciseEnv[where]), where)
    t.diagnostic(`${read} equalities checked`)
    assert.ok(read >= 50, `only ${read} checked`)
})

test('determinanteak batx2 z: every matrix written with numbers is rectangular', () => {
    for (const text of allTexts()) for (const matrix of matricesIn(text.es)) if (matrix) assert.ok(matrix.every((row) => row.length === matrix[0].length))
})

test('determinanteak batx2 z: no impossible equality of numbers inside a formula', () => {
    const texts = [...allTexts(), ...Object.values(determinanteakLessonTexts).flatMap((entry) => [entry.explanation, ...(typeof entry.example === 'string' ? [] : [entry.example])])]
    for (const text of texts) {
        for (const [, formula] of text.es.matchAll(/\$([^$]+)\$/g)) assert.ok(!/(?:^|[^\w^{])0\s*=\s*-?[1-9]/.test(formula), formula)
    }
})
