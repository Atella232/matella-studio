import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import katex from 'katex'
import { courses } from '../src/data/courses.ts'
import { checkAnswer, hasTerminatingDecimal, toExactDecimal, type FractionValue } from '../src/features/unit-v2/math/fraction.ts'
import { isUnitV2Path } from '../src/features/unit-v2/paths.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { matrizeakChallenges, matrizeakDiagnostic, matrizeakExerciseBank, matrizeakPractice } from '../src/pages/batx2-zientziak-matrizeak/content.ts'
import { matrizeakLessonChecks } from '../src/pages/batx2-zientziak-matrizeak/lessonChecks.ts'
import { matrizeakLessonTexts } from '../src/pages/batx2-zientziak-matrizeak/lessonTexts.ts'
import { evaluate, near } from './latex-math.ts'
import { matricesIn, matrixRelations, type Env, type Relation } from './matrix-latex.ts'

const stages = ['basics', 'operations', 'rank', 'inverse', 'equations']
const topics = Object.keys(matrizeakLessonTexts)

const typed = (value: FractionValue, form?: string) => (hasTerminatingDecimal(value) && (form !== 'simplified' || value.denominator === 1) ? toExactDecimal(value)! : `${value.numerator}/${value.denominator}`)
const written = (value: FractionValue) => (hasTerminatingDecimal(value) ? toExactDecimal(value)!.replace(',', '{,}') : `\\frac{${Math.abs(value.numerator)}}{${value.denominator}}`)

const allTexts = (): LocalizedText[] => [
    ...matrizeakDiagnostic.flatMap((item) => [item.prompt, item.explanation, ...item.options]),
    ...[...matrizeakPractice, ...matrizeakChallenges].flatMap((item) => [item.prompt, item.hint, item.explanation]),
    ...matrizeakExerciseBank.flatMap((section) => [section.title, ...section.items.flatMap((item) => [item.question, item.solution])])
]

/** The source of one lesson in lessons.tsx, with the doubled backslashes of the strings read as one */
const lessonsSource = readFileSync(new URL('../src/pages/batx2-zientziak-matrizeak/lessons.tsx', import.meta.url), 'utf8')
function lessonBlock(id: string): string {
    const start = lessonsSource.indexOf(`id: '${id}',`)
    assert.ok(start >= 0, id)
    const next = lessonsSource.indexOf("        id: '", start + 10)
    return lessonsSource.slice(start, next < 0 ? undefined : next).replace(/\\\\/g, '\\')
}

/** «Let's solve» and its steps: what the named matrices of the table are about (the key idea speaks in general) */
function workedBlock(id: string): string {
    const block = lessonBlock(id)
    return block.slice(block.indexOf('problem:'), block.indexOf('takeaway:'))
}

/* ---------- The named matrices of each text ---------- */

const lessonEnv: Record<string, Env> = {
    'what-is-a-matrix': { A: [[2, -1, 0], [5, 3, 7]] },
    'transpose-symmetric': { A: [[1, 4, 0], [-2, 3, 5]] },
    'sum-scalar': { A: [[1, 3], [0, -2]], B: [[4, 1], [-3, 5]] },
    'matrix-product': { A: [[1, 2, 0], [3, -1, 4]], B: [[2, 1], [0, 3], [1, -2]] },
    'product-properties': { A: [[1, 1], [0, 1]], B: [[2, 0], [1, 3]] },
    'matrix-applications': { Q: [[20, 5], [30, 10]], P: [[1, 2], [3, 2]] },
    'inverse-definition': { A: [[2, 1], [5, 3]] },
    'gauss-jordan': { A: [[1, 2], [3, 7]] },
    'matrix-powers': { A: [[1, 2], [0, 1]] },
    'matrix-equations': { A: [[3, 1], [2, 1]], B: [[1, 2], [0, 1]], X: [[1, 1], [-2, -1]] },
    'equation-systems': { X: [[2, 0], [1, 4]], Y: [[1, 1], [1, 1]] },
    'commuting-matrices': { A: [[1, 1], [0, 1]] }
}

const exampleEnv: Record<string, Env> = {
    'sum-scalar': { X: [[5, 4], [0, -4]] },
    'product-properties': { A: [[0, 1], [0, 0]], B: [[0, 0], [1, 0]] },
    'matrix-powers': { B: [[0, 1], [1, 0]] },
    'equation-systems': { X: [[2, 1], [1, -1]], Y: [[1, 0], [-1, 2]] }
}

/** «Check it» and the mistakes speak of a general A, so no named matrix there */
const checkEnv: Record<string, Env> = {}

const exerciseEnv: Record<string, Env> = {
    'practice 16': { B: [[0, -1], [1, 0]] },
    'practice 17': { A: [[1, 1], [1, 2]], B: [[3], [4]], X: [[2], [1]] },
    'practice 18': { A: [[1, 1], [0, 1]], B: [[2, 5]], X: [[2, 3]] },
    'practice 19': { X: [[1, 1], [1, 1]], Y: [[2, -1], [1, -2]] },
    'challenge 106': { A: [[0, 1, 0], [0, 0, 1], [1, 1, 0]] },
    'challenge 113': { X: [[3, 4], [0, 2]] },
    'challenge 114': { A: [[1, 2], [1, 3]], B: [[4, 1], [5, 2]], X: [[2, -1], [1, 1]] },
    'bank 16': { A: [[1, 1], [1, 1]] },
    'bank 19': { A: [[1, 2], [0, 1]], B: [[1, 0], [1, 1]] },
    'bank 20': { A: [[0, 1, 0], [1, 0, 1], [0, 1, 0]] },
    'bank 33': { A: [[1, -1], [2, 0]] },
    'bank 37': { A: [[-1, 0], [0, 1]] },
    'bank 39': { A: [[1, 0], [-2, 1]] },
    'bank 44': { A: [[1, 1], [0, 1]], B: [[3, 2], [1, 0]], X: [[2, 2], [1, 0]] },
    'bank 45': { A: [[2, 1], [1, 1]], B: [[3, 2], [1, 1]], X: [[1, 1], [0, 1]] },
    'bank 46': { X: [[3, 1], [1, 0]], Y: [[1, -1], [1, 2]] },
    'bank 48': { A: [[3, 1], [2, 2]], B: [[1, 0], [0, 1]], X: [[0, -0.5], [-1, 0.5]] }
}

function assertRelations(relations: Relation[], where: string): number {
    for (const relation of relations) assert.ok(relation.holds, `${where}: ${relation.left} ${relation.relation} ${relation.right}`)
    return relations.length
}

/* ---------- Tests ---------- */

test('matrizeak batx2 z: the unit is active and routed', () => {
    const course = courses.find((item) => item.id === 'batx2-zientziak')!
    assert.ok(course.topics.find((topic) => topic.id === 'matrices')!.active)
    assert.ok(!courses.find((item) => item.id === 'batx2-gizarte')!.topics.find((topic) => topic.id === 'matrices')!.active, 'only the Ciencias course')
    assert.ok(isUnitV2Path('/matematika/batx2-zientziak/matrices'))
    assert.ok(isUnitV2Path('/matematika/batx2-zientziak/matrices/ariketak'))
})

test('matrizeak batx2 z: diagnostic, practice, challenges and bank are consistent', () => {
    assert.equal(matrizeakDiagnostic.length, 8)
    // The unit's block of ids is 116000–116999
    assert.deepEqual(matrizeakDiagnostic.map((question) => question.id), [116001, 116002, 116003, 116004, 116005, 116006, 116007, 116008])
    for (const question of matrizeakDiagnostic) {
        assert.ok(topics.includes(question.topic), `${question.id}`)
        assert.ok(question.correctIndex < question.options.length)
        assert.equal(new Set(question.options.map((option) => option.es)).size, question.options.length)
    }
    assert.ok(new Set(matrizeakDiagnostic.map((question) => question.correctIndex)).size === 3)
    for (const stage of stages) {
        assert.equal(matrizeakPractice.filter((item) => item.stage === stage).length, 4, stage)
        assert.equal(matrizeakChallenges.filter((item) => item.stage === stage).length, 3, stage)
    }
    for (const item of [...matrizeakPractice, ...matrizeakChallenges]) {
        assert.ok(stages.includes(item.stage), `${item.id}`)
        assert.equal(checkAnswer(typed(item.expected, item.answerForm), item.expected, item.answerForm), 'correct', `${item.id}`)
        for (const language of ['eu', 'es', 'en', 'ar'] as const) assert.ok(item.explanation[language].length > 0 && item.prompt[language].length > 0 && item.hint[language].length > 0, `${item.id} ${language}`)
    }
    assert.deepEqual(matrizeakPractice.map((item) => item.id), matrizeakPractice.map((_, index) => index + 1))
    assert.deepEqual(matrizeakExerciseBank.map((section) => section.id), stages)
    const ids = matrizeakExerciseBank.flatMap((section) => section.items.map((item) => item.id))
    assert.deepEqual(ids, ids.map((_, index) => index + 1))
    assert.equal(ids.length, 50)
    for (const section of matrizeakExerciseBank) {
        assert.equal(section.items.length, 10, section.id)
        assert.ok(section.items.some((item) => item.difficulty === 'easy') && section.items.some((item) => item.difficulty === 'hard'), section.id)
        for (const item of section.items) {
            for (const language of ['eu', 'es', 'en', 'ar'] as const) assert.ok(item.question[language].length > 0 && item.solution[language].length > 0, `${item.id} ${language}`)
            if (item.answer) assert.equal(checkAnswer(typed(item.answer.expected, item.answer.form), item.answer.expected, item.answer.form), 'correct', `${item.id}`)
        }
    }
    assert.deepEqual(matrizeakChallenges.map((item) => item.id), [101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115])
    assert.deepEqual([...new Set(matrizeakChallenges.map((item) => item.points))].sort(), [10, 20, 30])
})

test('matrizeak batx2 z: every formula renders in KaTeX', () => {
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

test('matrizeak batx2 z: each language in its own place, and Arabic never keeps the decimal comma', () => {
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

test('matrizeak batx2 z: Basque glues no case ending to a number, English writes the euro first', () => {
    for (const text of allTexts()) {
        assert.ok(!/\d[a-zñ]/.test(text.eu.replace(/\$[^$]+\$/g, '')) && !/\$(?:ri|ren|rekin|z|ra|tik|ei|ek|ak|en|ko|an)(?![a-zA-Z])/.test(text.eu), text.eu)
        assert.ok(!/\d\s*€/.test(text.en.replace(/\$[^$]+\$/g, '')), text.en)
    }
})

test('matrizeak batx2 z: every worked equality with numbers is right', () => {
    const texts = [
        ...matrizeakPractice.flatMap((item) => [item.hint.es, item.explanation.es]),
        ...matrizeakChallenges.flatMap((item) => [item.hint.es, item.explanation.es]),
        ...matrizeakExerciseBank.flatMap((section) => section.items.map((item) => item.solution.es)),
        ...matrizeakDiagnostic.flatMap((item) => [item.explanation.es])
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
    assert.ok(checked >= 15, `only ${checked} checked`)
})

test('matrizeak batx2 z: every answer appears in its worked explanation or solution', () => {
    const shows = (text: string, value: FractionValue) => {
        const plain = written(value)
        return [plain, value.numerator < 0 ? `-${plain}` : plain].some((candidate) => text.replace(/\\,/g, '').includes(candidate))
    }
    for (const item of [...matrizeakPractice, ...matrizeakChallenges]) assert.ok(shows(item.explanation.es, item.expected), `${item.id}: ${written(item.expected)}`)
    for (const item of matrizeakExerciseBank.flatMap((section) => section.items)) if (item.answer) assert.ok(shows(item.solution.es, item.answer.expected), `${item.id}: ${written(item.answer.expected)}`)
})

test('matrizeak batx2 z: the matrix equalities of the lessons hold (sums, products, powers, inverses)', (t) => {
    let read = 0
    for (const id of topics) {
        read += assertRelations(matrixRelations(workedBlock(id), lessonEnv[id]), `lesson ${id}`)
        const entry = matrizeakLessonTexts[id as keyof typeof matrizeakLessonTexts]
        const example = typeof entry.example === 'string' ? entry.example : entry.example.es
        const caseMaths = (entry.cases ?? []).map((item) => (typeof item.math === 'string' ? item.math : item.math?.es ?? '')).join(' ')
        const whyMath = typeof entry.why?.math === 'string' ? entry.why.math : entry.why?.math?.es ?? ''
        read += assertRelations(matrixRelations(`${entry.examplePrompt!.es} ${example} ${entry.exampleAnswer?.es ?? ''} ${caseMaths} ${whyMath}`, exampleEnv[id]), `example ${id}`)
        const checks = matrizeakLessonChecks[id as keyof typeof matrizeakLessonChecks]
        // The wrong line of the mistake box is wrong on purpose: it is checked apart
        const checkText = [checks.mistake.right, checks.check.prompt, checks.check.explanation, ...checks.check.options].map((text) => text.es).join(' ')
        read += assertRelations(matrixRelations(checkText, checkEnv[id]), `check ${id}`)
    }
    t.diagnostic(`${read} equalities checked`)
    assert.ok(read >= 40, `only ${read} checked`)
})

test('matrizeak batx2 z: the wrong line of each typical mistake really is wrong', () => {
    let read = 0
    for (const [id, { mistake }] of Object.entries(matrizeakLessonChecks)) {
        for (const relation of matrixRelations(mistake.wrong.es, checkEnv[id])) {
            read += 1
            assert.ok(!relation.holds, `${id}: the mistake ${relation.left} = ${relation.right} is right`)
        }
    }
    assert.ok(read >= 4, `only ${read} mistakes read`)
})

test('matrizeak batx2 z: «Check it» on a calculation of matrices has one right answer', () => {
    let read = 0
    for (const [id, { check }] of Object.entries(matrizeakLessonChecks)) {
        const asked = [...check.prompt.es.matchAll(/\$([^$]+)\$/g)].map(([, formula]) => formula)
        if (asked.length !== 1 || !/[+-]|\\cdot/.test(asked[0].replace(/\\begin\{pmatrix\}[\s\S]*?\\end\{pmatrix\}/g, 'M'))) continue
        const results = check.options.map((option) => matrixRelations(`$${asked[0]}=${option.es.replace(/^\$|\$$/g, '')}$`))
        if (results.some((list) => list.length !== 1)) continue
        read += 1
        results.forEach((list, index) => assert.equal(list[0].holds, index === check.correctIndex, `${id}: option ${index}`))
    }
    assert.ok(read >= 1)
})

test('matrizeak batx2 z: the matrix equalities of practice, challenges and bank hold', (t) => {
    const texts: Record<string, string> = {
        ...Object.fromEntries(matrizeakPractice.map((item) => [`practice ${item.id}`, `${item.prompt.es} ${item.hint.es} ${item.explanation.es}`])),
        ...Object.fromEntries(matrizeakChallenges.map((item) => [`challenge ${item.id}`, `${item.prompt.es} ${item.hint.es} ${item.explanation.es}`])),
        ...Object.fromEntries(matrizeakExerciseBank.flatMap((section) => section.items).map((item) => [`bank ${item.id}`, `${item.question.es} ${item.solution.es}`])),
        ...Object.fromEntries(matrizeakDiagnostic.map((item) => [`diagnostic ${item.id}`, `${item.prompt.es} ${item.explanation.es} ${item.options[item.correctIndex].es}`]))
    }
    for (const where of Object.keys(exerciseEnv)) assert.ok(where in texts, where)
    let read = 0
    for (const [where, text] of Object.entries(texts)) read += assertRelations(matrixRelations(text, exerciseEnv[where]), where)
    t.diagnostic(`${read} equalities checked`)
    assert.ok(read >= 50, `only ${read} checked`)
})

test('matrizeak batx2 z: the named matrices of the tables are the ones the texts write', () => {
    // The matrices given as A = …, B = … in a statement are the ones of the table
    const statements: Array<[string, string, Env]> = [
        ...Object.entries(lessonEnv).map(([id, env]): [string, string, Env] => [`lesson ${id}`, workedBlock(id), env]),
        ...matrizeakPractice.map((item): [string, string, Env] => [`practice ${item.id}`, item.prompt.es, exerciseEnv[`practice ${item.id}`] ?? {}]),
        ...matrizeakChallenges.map((item): [string, string, Env] => [`challenge ${item.id}`, item.prompt.es, exerciseEnv[`challenge ${item.id}`] ?? {}]),
        ...matrizeakExerciseBank.flatMap((section) => section.items).map((item): [string, string, Env] => [`bank ${item.id}`, item.question.es, exerciseEnv[`bank ${item.id}`] ?? {}])
    ]
    let read = 0
    for (const [where, text, env] of statements) {
        for (const relation of matrixRelations(text, env)) {
            read += 1
            assert.ok(relation.holds, `${where}: ${relation.left} = ${relation.right}`)
        }
    }
    assert.ok(read >= 20, `only ${read} read`)
    // Every matrix written with numbers is rectangular and readable
    for (const text of allTexts()) for (const matrix of matricesIn(text.es)) if (matrix) assert.ok(matrix.every((row) => row.length === matrix[0].length))
})

test('matrizeak batx2 z: no impossible equality of numbers inside a formula', () => {
    const texts = [...allTexts(), ...Object.values(matrizeakLessonTexts).flatMap((entry) => [entry.explanation, ...(typeof entry.example === 'string' ? [] : [entry.example])])]
    for (const text of texts) {
        for (const [, formula] of text.es.matchAll(/\$([^$]+)\$/g)) assert.ok(!/(?:^|[^\w^{])0\s*=\s*-?[1-9]/.test(formula), formula)
    }
})
