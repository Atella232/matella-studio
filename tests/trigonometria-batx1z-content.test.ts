import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import katex from 'katex'
import { courses } from '../src/data/courses.ts'
import { checkAnswer, hasTerminatingDecimal, toExactDecimal, type FractionValue } from '../src/features/unit-v2/math/fraction.ts'
import { isUnitV2Path } from '../src/features/unit-v2/paths.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { readTrigonometryAnswer } from '../src/pages/dbh4-akademikoak-trigonometria/answers.ts'
import { localize } from '../src/pages/batx1-zientziak-trigonometria/text.ts'
import { trigonometryChallenges, trigonometryDiagnostic, trigonometryExerciseBank, trigonometryPractice } from '../src/pages/batx1-zientziak-trigonometria/content.ts'
import { trigonometryLessonChecks } from '../src/pages/batx1-zientziak-trigonometria/lessonChecks.ts'
import { trigonometryLessonTexts } from '../src/pages/batx1-zientziak-trigonometria/lessonTexts.ts'

const folder = 'src/pages/batx1-zientziak-trigonometria'
const stages = ['ratios', 'sums', 'double', 'equations', 'functions']
const topics = ['radians-review', 'reciprocal', 'identities', 'sum-formulas', 'difference-tangent', 'known-ratios', 'double-angle', 'half-angle', 'sum-to-product', 'basic-equations', 'quadratic-equations', 'formula-equations', 'trig-graphs', 'transformations', 'periodic-models']
const languages = ['eu', 'es', 'en', 'ar'] as const

const typed = (value: FractionValue) => (hasTerminatingDecimal(value) ? toExactDecimal(value)! : `${value.numerator}/${value.denominator}`)
const written = (value: FractionValue) => (hasTerminatingDecimal(value) ? toExactDecimal(value)!.replace(',', '{,}') : `\\frac{${Math.abs(value.numerator)}}{${value.denominator}}`)
const valueOf = (value: FractionValue) => value.numerator / value.denominator

/* ---------- Trigonometry worked out again (angles in degrees) ---------- */

const D = Math.PI / 180
const sin = (degrees: number) => Math.sin(degrees * D)
const cos = (degrees: number) => Math.cos(degrees * D)
const tan = (degrees: number) => Math.tan(degrees * D)
const asin = (value: number) => Math.asin(value) / D
const acos = (value: number) => Math.acos(value) / D
const atan = (value: number) => Math.atan(value) / D
const sum = (list: number[]) => list.reduce((total, value) => total + value, 0)

/** The whole degrees from 0° to 359° that solve f(x) = 0; none of the equations of the unit has 0° as a solution */
function roots(f: (x: number) => number, to = 359): number[] {
    const found = Array.from({ length: to + 1 }, (_, x) => x).filter((x) => Math.abs(f(x)) < 1e-9)
    assert.ok(!found.includes(0), 'an equation with 0° as a solution: the ends of the interval would matter')
    return found
}

/** How many times f changes sign between two angles (a curve that crosses a line, without touching it) */
function crossings(f: (x: number) => number, from: number, to: number): number {
    let count = 0
    for (let x = from; x < to; x += 0.25) if (f(x) >= 0 !== f(x + 0.25) >= 0) count++
    return count
}

/**
 * Every closed answer worked out from its data, with the decimals the prompt asks for: p = practice,
 * c = challenge, b = bank. Exact answers have 0 decimals or more than enough.
 */
const computed: Record<string, [number, number]> = {
    p1: [150 / 180, 12], p2: [(11 * 180) / 6, 6], p3: [1 / Math.sqrt(1 - 25 / 169), 12], p4: [(1 / cos(37)) * cos(37) + tan(37) / tan(37), 9],
    p5: [cos(75), 3], p6: [cos(asin(4 / 5) + asin(5 / 13)), 12], p7: [tan(atan(2) + atan(3)), 9], p8: [sin(asin(15 / 17) - acos(4 / 5)), 12],
    p9: [sin(2 * acos(3 / 5)), 12], p10: [cos(2 * asin(1 / 4)), 12], p11: [cos(acos(1 / 8) / 2), 12], p12: [cos(75) + cos(15), 2],
    p13: [Math.max(...roots((x) => 2 * sin(x) - Math.sqrt(3))), 6], p14: [roots((x) => tan(x) ** 2 - 3).length, 0],
    p15: [sum(roots((x) => 2 * cos(x) ** 2 + 3 * cos(x) + 1)), 6], p16: [Math.min(...roots((x) => sin(2 * x) - Math.sqrt(2) * cos(x))), 6],
    p17: [360 / 3 / 180, 12], p18: [Math.abs(-5), 0], p19: [90 / 3 / 180, 12], p20: [18 - 15 * cos(9 * 20), 6],
    c101: [1 / sin(180 + atan(4 / 3)), 9], c102: [(1 / cos(30) ** 2 - 1) / (1 / cos(30) ** 2), 9], c103: [roots((x) => 1 / cos(x) + 2).filter((x) => sin(x) < 0)[0], 6],
    c104: [sin(105), 3], c105: [atan(1 / 2) + atan(1 / 3), 9], c106: [cos(80) * cos(20) + sin(80) * sin(20), 9],
    c107: [cos(22.5) ** 2 - sin(22.5) ** 2, 2], c108: [tan(2 * atan(3)), 9], c109: [sin(22.5), 3],
    c110: [sum(roots((x) => cos(x) - sin(x))), 6], c111: [Math.max(...roots((x) => cos(2 * x) - 3 * cos(x) - 1)), 6], c112: [roots((x) => sin(3 * x) - 0.5).length, 0],
    c113: [Array.from({ length: 541 }, (_, x) => x).filter((x) => Math.abs(sin(x)) < 1e-9).length, 0], c114: [(2 * Math.PI) / ((2 * Math.PI) / 5), 9],
    c115: [Array.from({ length: 24 }, (_, t) => t).reduce((best, t) => (14 - 6 * cos(15 * t) > 14 - 6 * cos(15 * best) ? t : best), 0), 0],
    b2: [(3 * 180) / 5, 6], b3: [1 / (1 / 5), 9], b4: [cos(acos(-8 / 17)) / sin(acos(-8 / 17)), 12], b5: [1 / cos(360 - atan(3 / 4)), 9],
    b6: [cos(30) * tan(30), 9], b7: [sin(60) ** 2 / (1 - cos(60)), 9], b8: [1 / cos(37) ** 2 + 1 / sin(37) ** 2 - 1 / (cos(37) ** 2 * sin(37) ** 2), 9],
    b9: [(sin(37) + cos(37)) ** 2 + (sin(37) - cos(37)) ** 2, 9], b10: [(sin(atan(2)) + cos(atan(2))) / (sin(atan(2)) - cos(atan(2))), 9],
    b13: [cos(15), 2], b14: [sin(asin(8 / 17) + asin(3 / 5)), 12], b15: [tan(105), 2], b17: [sin(50) * cos(10) + cos(50) * sin(10), 2],
    b18: [tan(45 - atan(1 / 2)), 9], b19: [(cos(37 + 60) + cos(37 - 60)) / (2 * cos(37)), 9], b20: [(tan(70) - tan(25)) / (1 + tan(70) * tan(25)), 9],
    b22: [2 * 0.6 * 0.8, 9], b23: [cos(2 * acos(0.5)), 9], b24: [sin(2 * (180 - asin(5 / 13))), 12], b25: [cos(acos(-1 / 3) / 2), 2], b26: [cos(22.5), 3], b29: [(1 - cos(60)) / sin(60), 2],
    b31: [roots((x) => sin(x) - 1)[0], 6], b32: [Math.max(...roots((x) => 2 * cos(x) - Math.sqrt(3))), 6], b34: [sum(roots((x) => sin(x) + Math.sqrt(2) / 2)), 6],
    b35: [roots((x) => 4 * sin(x) ** 2 - 1).length, 0], b36: [Math.max(...roots((x) => 2 * sin(x) ** 2 - 3 * cos(x))), 6], b37: [sum(roots((x) => cos(2 * x) - 0.5)), 6],
    b38: [roots((x) => cos(2 * x) + 3 * sin(x) - 2).length, 0], b39: [roots((x) => cos(3 * x)).length, 0], b40: [Math.min(...roots((x) => tan(x) ** 2 - 1 / cos(x) - 1)), 6],
    b42: [Math.max(...Array.from({ length: 360 }, (_, x) => 2 * sin(x) + 1)), 6], b43: [cos(180), 9], b44: [(2 * Math.PI) / 4 / Math.PI, 9],
    b45: [Math.min(...Array.from({ length: 360 }, (_, x) => 3 * cos(x) - 1)), 6], b46: [-(Math.PI / 2) / 2 / Math.PI, 9], b47: [crossings((x) => cos(x) - 0.3, 0, 720), 0],
    b48: [360 / 12, 6], b49: [360 / 6, 6], b50: [20 - 18 * cos(60), 6]
}

/**
 * Plain arithmetic and trigonometry in LaTeX: powers, fractions, roots, products, divisions, decimal commas
 * and the six ratios of angles in degrees; π counts as 180° and a degree sign is dropped, so 240° and
 * \frac{4\pi}{3} are the same number. Null when there is a letter or anything else.
 */
function evaluate(latex: string): number | null {
    let js = latex
        .replace(/\\left|\\right/g, '')
        .replace(/\\operatorname\{(sen|tg|cosec|cotg)\}/g, '\\$1')
        .replace(/\\(?:cosec|csc)(?![a-zA-Z])/g, 'Q')
        .replace(/\\(?:cotg|cot)(?![a-zA-Z])/g, 'Z')
        .replace(/\\sec(?![a-zA-Z])/g, 'K')
        .replace(/\\(?:sen|sin)(?![a-zA-Z])/g, 'S')
        .replace(/\\cos(?![a-zA-Z])/g, 'C')
        .replace(/\\(?:tg|tan)(?![a-zA-Z])/g, 'T')
        .replace(/\\pi(?![a-zA-Z])/g, '(180)')
        .replace(/(\d)\\,(?=\d)/g, '$1')
        .replace(/\{,\}/g, '.')
        .replace(/\\cdot/g, '*')
        .replace(/\\div/g, '/')
        .replace(/\\[ ,;]/g, ' ')
    // \sen 52° is a call, \sen^2 30° a call squared; \sen(180°-120°) already has its brackets
    js = js.replace(/([SCTKQZ])\^(\d)\s*(\d+(?:\.\d+)?)°/g, '$1($3)**$2').replace(/([SCTKQZ])\s*(\d+(?:\.\d+)?)°/g, '$1($2)').replace(/°/g, '')
    for (let previous = ''; previous !== js;) {
        previous = js
        js = js.replace(/\\[dt]?frac\{([^{}]+)\}\{([^{}]+)\}/g, '(($1)/($2))').replace(/\\sqrt\{([^{}]+)\}/g, 'Math.sqrt($1)').replace(/\^\{([^{}]+)\}/g, '**($1)')
    }
    js = js.replace(/\^(\d)/g, '**$1').replace(/\)\s*\(/g, ')*(').replace(/(\d)\s*\(/g, '$1*(').replace(/(\d)\s*Math/g, '$1*Math')
        .replace(/([\d)])\s*(?=[SCTKQZ]\()/g, '$1*').replace(/\s+/g, '')
    if (!/\d/.test(js) || !/^(?:[\d.+\-*/()]|Math\.sqrt|[SCTKQZ](?=\())+$/.test(js)) return null
    try {
        const value = Function('S', 'C', 'T', 'K', 'Q', 'Z', `return ${js}`)(sin, cos, tan, (x: number) => 1 / cos(x), (x: number) => 1 / sin(x), (x: number) => 1 / tan(x)) as number
        return Number.isFinite(value) ? value : null
    } catch {
        return null
    }
}

/** The decimals of the number a side ends with: 5{,}83 has 2 */
const decimals = (latex: string) => /\{,\}(\d+)\D*$/.exec(latex.trim())?.[1].length ?? 0

/** Checks the = and ≈ of a formula whose sides are numbers; returns how many it read */
function checkFormula(formula: string, where: string): number {
    let read = 0
    // Rows (a row that starts with = or ≈ goes on with the one above), wide spaces and arrows start something new
    const pieces = formula.replace(/\\begin\{[a-z]+\}|\\end\{[a-z]+\}/g, ' ').split(/\\\\/)
        .reduce<string[]>((rows, row) => (/^\s*(?:=|\\approx)/.test(row) && rows.length ? [...rows.slice(0, -1), rows.at(-1) + row] : [...rows, row]), [])
        .flatMap((row) => row.split(/\\qquad|\\quad|\\ \\to\\ |\\to/))
    for (const piece of pieces) {
        for (const part of piece.split(/<|>|\\le|\\ge|\\neq/)) {
            const sides = part.split(/(=|\\approx)/)
            let previous: number | null = null
            let previousLatex = ''
            for (let index = 0; index < sides.length; index += 2) {
                const value = evaluate(sides[index])
                const relation = sides[index - 1]
                if (value !== null && previous !== null) {
                    read += 1
                    if (relation === '=') assert.ok(Math.abs(previous - value) < 1e-9 * Math.max(1, Math.abs(value)), `${where}: ${previousLatex} = ${sides[index]} (${previous} ≠ ${value})`)
                    else {
                        const places = Math.max(decimals(sides[index]), decimals(previousLatex))
                        assert.ok(Math.abs(previous - value) <= 0.5 * 10 ** -places + 1e-9, `${where}: ${previousLatex} ≈ ${sides[index]} (${previous}, ${value})`)
                    }
                }
                if (value !== null) {
                    previous = value
                    previousLatex = sides[index]
                } else previous = null
            }
        }
    }
    return read
}

const formulasOf = (text: string) => [...text.matchAll(/\$([^$]+)\$/g)].map(([, formula]) => formula)

const allTexts = (): LocalizedText[] => [
    ...trigonometryDiagnostic.flatMap((item) => [item.prompt, item.explanation, ...item.options]),
    ...[...trigonometryPractice, ...trigonometryChallenges].flatMap((item) => [item.prompt, item.hint, item.explanation]),
    ...trigonometryExerciseBank.flatMap((section) => [section.title, ...section.items.flatMap((item) => [item.question, item.solution])])
]

/** The lessons are TSX: their source, with lessonTexts.ts and lessonChecks.ts, read as text */
const lessonSource = ['lessons.tsx', 'lessonTexts.ts', 'lessonChecks.ts'].map((file) => readFileSync(`${folder}/${file}`, 'utf8')).join('\n').replace(/\\\\/g, '\\').replace(/\\'/g, "'")

test('trigonometria batx1 z: the unit is active and routed', () => {
    const course = courses.find((item) => item.id === 'batx1-zientziak')!
    assert.ok(course.topics.find((topic) => topic.id === 'funciones-trigonometricas')!.active)
    assert.ok(isUnitV2Path('/matematika/batx1-zientziak/funciones-trigonometricas'))
    assert.ok(isUnitV2Path('/matematika/batx1-zientziak/funciones-trigonometricas/ariketak'))
})

test('trigonometria batx1 z: diagnostic, practice, challenges and bank are consistent', () => {
    assert.deepEqual(trigonometryDiagnostic.map((question) => question.id), [103001, 103002, 103003, 103004, 103005, 103006, 103007, 103008])
    for (const question of trigonometryDiagnostic) {
        assert.ok(topics.includes(question.topic), `${question.id}`)
        assert.ok(question.correctIndex < question.options.length)
        assert.equal(new Set(question.options.map((option) => option.es)).size, question.options.length)
    }
    assert.equal(new Set(trigonometryDiagnostic.map((question) => question.correctIndex)).size, 3)
    for (const stage of stages) {
        assert.equal(trigonometryPractice.filter((item) => item.stage === stage).length, 4, stage)
        assert.equal(trigonometryChallenges.filter((item) => item.stage === stage).length, 3, stage)
    }
    assert.deepEqual(trigonometryPractice.map((item) => item.id), trigonometryPractice.map((_, index) => index + 1))
    assert.deepEqual(trigonometryChallenges.map((item) => item.id), trigonometryChallenges.map((_, index) => 101 + index))
    for (const item of [...trigonometryPractice, ...trigonometryChallenges]) {
        assert.ok(stages.includes(item.stage), `${item.id}`)
        assert.equal(checkAnswer(typed(item.expected), item.expected, item.answerForm), 'correct', `${item.id}`)
        for (const language of languages) assert.ok(item.explanation[language] && item.prompt[language] && item.hint[language], `${item.id} ${language}`)
    }
    assert.deepEqual(trigonometryExerciseBank.map((section) => section.id), stages)
    const ids = trigonometryExerciseBank.flatMap((section) => section.items.map((item) => item.id))
    assert.deepEqual(ids, ids.map((_, index) => index + 1))
    assert.equal(ids.length, 50)
    for (const section of trigonometryExerciseBank) {
        assert.equal(section.items.length, 10, section.id)
        assert.ok(section.items.some((item) => item.difficulty === 'easy') && section.items.some((item) => item.difficulty === 'hard'), section.id)
        for (const item of section.items) if (item.answer) assert.equal(checkAnswer(typed(item.answer.expected), item.answer.expected, item.answer.form), 'correct', `${item.id}`)
    }
    assert.deepEqual([...new Set(trigonometryChallenges.map((item) => item.points))].sort(), [10, 20, 30])
})

test('trigonometria batx1 z: every answer is worked out again from its data', () => {
    const answers: Array<[string, FractionValue]> = [
        ...trigonometryPractice.map((item): [string, FractionValue] => [`p${item.id}`, item.expected]),
        ...trigonometryChallenges.map((item): [string, FractionValue] => [`c${item.id}`, item.expected]),
        ...trigonometryExerciseBank.flatMap((section) => section.items.flatMap((item): Array<[string, FractionValue]> => (item.answer ? [[`b${item.id}`, item.answer.expected]] : [])))
    ]
    assert.deepEqual(answers.map(([key]) => key).sort(), Object.keys(computed).sort())
    for (const [key, expected] of answers) {
        const [value, places] = computed[key]
        assert.ok(Math.abs(Number(value.toFixed(places)) - valueOf(expected)) < 1e-9, `${key}: ${value} rounds to ${value.toFixed(places)}, not ${valueOf(expected)}`)
    }
})

test('trigonometria batx1 z: every worked equality and approximation with numbers is right', () => {
    const texts = [
        ...trigonometryPractice.flatMap((item) => [item.hint.es, item.explanation.es]),
        ...trigonometryChallenges.flatMap((item) => [item.hint.es, item.explanation.es]),
        ...trigonometryExerciseBank.flatMap((section) => section.items.map((item) => item.solution.es)),
        ...trigonometryDiagnostic.map((item) => item.explanation.es)
    ]
    let checked = 0
    for (const [index, text] of texts.entries()) for (const formula of formulasOf(text)) checked += checkFormula(formula, `content ${index}: ${formula}`)
    assert.ok(checked >= 60, `only ${checked} checked`)
})

test('trigonometria batx1 z: the lessons, examples, mistakes and questions add up too', () => {
    // Everything but the wrong side of the typical mistakes, which is wrong on purpose
    const strings = (value: unknown): string[] => (typeof value === 'string' ? [value] : value && typeof value === 'object' ? Object.values(value).flatMap(strings) : [])
    const lessonsFile = readFileSync(`${folder}/lessons.tsx`, 'utf8').replace(/\\\\/g, '\\').replace(/\\'/g, "'")
    const checks = Object.values(trigonometryLessonChecks).flatMap(({ mistake, check }) => [mistake.right, check.prompt, check.explanation, ...check.options].map((text) => text.es))
    let checked = 0
    for (const text of [lessonsFile, ...strings(trigonometryLessonTexts), ...checks]) for (const formula of formulasOf(text)) checked += checkFormula(formula, formula)
    assert.ok(checked >= 60, `only ${checked} checked`)
    // The right answer of each «Check it» with a number, worked out again (π counts as 180°)
    const values: Record<string, number> = {
        'radians-review': 180 / 5, reciprocal: 1 / (2 / 3), 'known-ratios': sin(asin(4 / 5) + acos(3 / 5)), 'double-angle': cos(2 * asin(1 / 3)), 'half-angle': sin(acos(1 / 9) / 2),
        'sum-to-product': cos(165) + cos(75), 'basic-equations': roots((x) => tan(x) - 1).length, 'quadratic-equations': roots((x) => cos(x) ** 2 - 0.25).length,
        'formula-equations': roots((x) => cos(2 * x) - sin(x)).length, transformations: 360 / 0.5, 'periodic-models': (10 - 4) / 2
    }
    for (const [id, value] of Object.entries(values)) {
        const { check } = trigonometryLessonChecks[id as keyof typeof trigonometryLessonChecks]
        const shown = evaluate(formulasOf(check.options[check.correctIndex].es)[0])
        assert.ok(shown !== null && Math.abs(shown - value) < 1e-9, `${id}: ${check.options[check.correctIndex].es} is not ${value}`)
        for (const [index, option] of check.options.entries()) {
            const other = evaluate(formulasOf(option.es)[0] ?? '')
            if (index !== check.correctIndex && other !== null) assert.ok(Math.abs(other - value) > 1e-6, `${id}: a wrong answer is also right: ${option.es}`)
        }
    }
})

test('trigonometria batx1 z: the solutions of the lessons are the right ones', () => {
    // «Let's solve», «Another example» and the questions of the equations, solved again
    assert.deepEqual(roots((x) => 2 * cos(x) + 1), [120, 240])
    assert.deepEqual(roots((x) => Math.sqrt(2) * sin(x) - 1), [45, 135])
    assert.deepEqual(roots((x) => 2 * sin(x) ** 2 - sin(x) - 1), [90, 210, 330])
    assert.deepEqual(roots((x) => 2 * cos(x) ** 2 - 3 * sin(x) - 3), [210, 270, 330])
    assert.deepEqual(roots((x) => sin(2 * x) - cos(x)), [30, 90, 150, 270])
    assert.deepEqual(roots((x) => cos(2 * x) + cos(x)), [60, 180, 300])
    // The cases of «Basic equations»
    assert.deepEqual(roots((x) => sin(x) - Math.sqrt(3) / 2), [60, 120])
    assert.deepEqual(roots((x) => cos(x) - Math.sqrt(2) / 2), [45, 315])
    assert.deepEqual(roots((x) => tan(x) + 1), [135, 315])
    // The graphs: y = sen x and y = 1/2 between 0 and 4π, y = cos x and y = −1/2 between 0 and 6π
    assert.equal(crossings((x) => sin(x) - 0.5, 0, 720), 4)
    assert.equal(crossings((x) => cos(x) + 0.5, 0, 1080), 6)
    // The quadrant of the half angle and of the double angle
    const half = acos(-7 / 25) / 2
    assert.ok(half > 45 && half < 90 && Math.abs(sin(half) - 4 / 5) < 1e-12 && Math.abs(cos(half) - 3 / 5) < 1e-12)
    const alpha = 180 - asin(3 / 5)
    assert.ok(Math.abs(sin(2 * alpha) + 24 / 25) < 1e-12 && Math.abs(cos(2 * alpha) - 7 / 25) < 1e-12)
    // The Ferris wheel and the tide
    assert.ok(Math.abs(12 - 10 * cos(12 * 5) - 7) < 1e-12 && Math.abs(3 + 2 * cos(30 * 4) - 2) < 1e-12)
})

test('trigonometria batx1 z: every formula renders in KaTeX', () => {
    let formulas = 0
    for (const text of allTexts()) {
        for (const language of languages) {
            for (const formula of formulasOf(text[language])) {
                katex.renderToString(formulaFor(language, formula), { throwOnError: true, strict: 'error' })
                formulas += 1
            }
        }
    }
    assert.ok(formulas > 300, `only ${formulas}`)
    // The lessons: each language with its names of the ratios
    let lessonFormulas = 0
    for (const formula of formulasOf(lessonSource)) {
        for (const language of languages) katex.renderToString(formulaFor(language, localize(language, formula.replace(/\{,\}/g, language === 'ar' ? '.' : '{,}'))), { throwOnError: true, strict: 'error' })
        lessonFormulas += 1
    }
    assert.ok(lessonFormulas > 150, `only ${lessonFormulas}`)
    assert.deepEqual([...lessonSource.matchAll(/id: '([a-z-]+)',\s+stage:/g)].map((match) => match[1]), topics)
})

test('trigonometria batx1 z: each language in its own place, its names of the ratios, and Arabic without the decimal comma', () => {
    for (const text of allTexts()) {
        assert.ok(!text.ar.includes('{,}'), text.ar)
        const words = (value: string) => value.replace(/\$[^$]+\$/g, ' ')
        if (/[a-zA-Z]{4}/.test(words(text.es))) assert.ok(/[؀-ۿ]/.test(words(text.ar)), `not Arabic: ${text.ar}`)
        for (const language of ['eu', 'es', 'en'] as const) assert.ok(!/[؀-ۿ]/.test(text[language]), `Arabic in ${language}: ${text[language]}`)
        if (/[a-zA-Z]{6}/.test(words(text.es))) assert.ok(text.eu !== text.es && text.en !== text.es, `copied from Spanish: ${text.es}`)
        for (const language of languages) assert.ok(!/\\(?:sen|tg|cosec|cotg)(?![a-zA-Z])/.test(text[language]), text[language])
        assert.ok(!/\\(?:sin|csc|cot)(?![a-zA-Z])/.test(text.es) && !/\\(?:tan|csc|cot)(?![a-zA-Z])/.test(text.es + text.eu), text.es)
    }
})

test('trigonometria batx1 z: Basque glues no case ending to a number', () => {
    for (const text of allTexts()) assert.ok(!/\d[a-zñ]/.test(text.eu.replace(/\$[^$]+\$/g, '')) && !/\$(?:ri|ren|rekin|z|ra|tik|ei|ek|ak|en|ko|an)(?![a-zA-Z])/.test(text.eu), text.eu)
})

test('trigonometria batx1 z: every answer appears in its worked explanation or solution', () => {
    const shows = (text: string, value: FractionValue) => {
        const plain = written(value)
        const asFraction = `\\frac{${Math.abs(value.numerator)}}{${value.denominator}}`
        return [plain, asFraction, `-${plain}`, `-${asFraction}`].some((candidate) => text.replace(/(\d)\\,(?=\d)/g, '$1').includes(candidate))
    }
    for (const item of [...trigonometryPractice, ...trigonometryChallenges]) assert.ok(shows(item.explanation.es, item.expected), `${item.id}: ${written(item.expected)}`)
    for (const section of trigonometryExerciseBank) for (const item of section.items) if (item.answer) assert.ok(shows(item.solution.es, item.answer.expected), `bank ${item.id}`)
})

test('trigonometria batx1 z: answers with degrees, fractions, signs, commas or points are read', () => {
    for (const [input, value] of [['120°', [120, 1]], ['−3/4', [-3, 4]], ['0.259', [259, 1000]], ['5/6', [5, 6]], ['−0,25', [-1, 4]], ['77/85', [77, 85]]] as const) {
        assert.equal(checkAnswer(readTrigonometryAnswer(input), { numerator: value[0], denominator: value[1] }), 'correct', input)
    }
})
