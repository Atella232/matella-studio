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
import { localize } from '../src/pages/dbh4-akademikoak-trigonometria/text.ts'
import { trianglesChallenges, trianglesDiagnostic, trianglesExerciseBank, trianglesPractice } from '../src/pages/batx1-zientziak-triangeluak/content.ts'
import { trianglesLessonChecks } from '../src/pages/batx1-zientziak-triangeluak/lessonChecks.ts'
import { trianglesLessonTexts } from '../src/pages/batx1-zientziak-triangeluak/lessonTexts.ts'

const stages = ['angles', 'right', 'sines', 'cosines', 'applications']
const topics = ['quadrant-ratios', 'big-angles', 'related-angles', 'inverse-angles', 'right-review', 'height-strategy', 'sine-rule', 'ambiguous-case', 'circumradius', 'cosine-rule', 'three-sides', 'which-rule', 'heron', 'inaccessible', 'parallelogram-forces']
const languages = ['eu', 'es', 'en', 'ar'] as const

const typed = (value: FractionValue) => (hasTerminatingDecimal(value) ? toExactDecimal(value)! : `${value.numerator}/${value.denominator}`)
const written = (value: FractionValue) => (hasTerminatingDecimal(value) ? toExactDecimal(value)!.replace(',', '{,}') : `\\frac{${Math.abs(value.numerator)}}{${value.denominator}}`)
const valueOf = (value: FractionValue) => value.numerator / value.denominator

/* ---------- Trigonometry worked out again ---------- */

const D = Math.PI / 180
const sin = (degrees: number) => Math.sin(degrees * D)
const cos = (degrees: number) => Math.cos(degrees * D)
const tan = (degrees: number) => Math.tan(degrees * D)
const asin = (value: number) => Math.asin(value) / D
const acos = (value: number) => Math.acos(value) / D
const atan = (value: number) => Math.atan(value) / D
/** The side opposite A from the other two sides and the angle between them */
const cosineSide = (b: number, c: number, A: number) => Math.sqrt(b * b + c * c - 2 * b * c * cos(A))
/** The angle opposite a from the three sides */
const cosineAngle = (a: number, b: number, c: number) => acos((b * b + c * c - a * a) / (2 * b * c))
const heron = (a: number, b: number, c: number) => {
    const s = (a + b + c) / 2
    return Math.sqrt(s * (s - a) * (s - b) * (s - c))
}
/** The height over a base when the angles at its ends are A and B (B > 90° falls outside) */
const height = (base: number, A: number, B: number) => base / (1 / tan(A) + 1 / tan(B))

/**
 * Every closed answer worked out from its data, with the decimals the prompt asks for: p = practice,
 * c = challenge, b = bank. Exact answers have 0 decimals or more than enough.
 */
const computed: Record<string, [number, number]> = {
    p1: [0.8 / -Math.sqrt(1 - 0.64), 2], p2: [2000 - 5 * 360, 0], p3: [cos(245), 2], p4: [360 - acos(-0.5), 6],
    p5: [15 * sin(52), 2], p6: [atan(7 / 9), 1], p7: [height(12, 40, 60), 2], p8: [5 * sin(180 - 130), 2],
    p9: [10 * sin(60) / sin(45), 2], p10: [7 * sin(80) / sin(35), 2], p11: [[asin(7 * sin(30) / 5), 180 - asin(7 * sin(30) / 5)].filter((B) => 30 + B < 180).length, 0], p12: [8 / sin(40) / 2, 2],
    p13: [cosineSide(4, 7, 75), 2], p14: [cosineAngle(12, 8, 10), 1], p15: [cosineAngle(9, 4, 6), 1], p16: [cosineSide(10, 6, 120), 6],
    p17: [0.5 * 7 * 10 * sin(40), 2], p18: [heron(9, 10, 17), 6], p19: [500 * sin(65) / sin(180 - 70 - 65), 2], p20: [cosineSide(50, 80, 180 - 40), 2],
    c101: [-1 / Math.sqrt(1 + 2 * 2), 2], c102: [sin(-1110), 6], c103: [[0, 360].flatMap((turn) => [asin(0.3) + turn, 180 - asin(0.3) + turn]).filter((angle) => angle < 720).length, 0],
    c104: [asin(0.9 / 6), 1], c105: [height(10, 35, 25), 2], c106: [height(10, 30, 120), 2],
    c107: [asin(4 * sin(50) / 6), 1], c108: [Math.max(...[asin(10 * sin(40) / 7), 180 - asin(10 * sin(40) / 7)].map((B) => 7 * sin(180 - 40 - B) / sin(40))), 2], c109: [10 * sin(30), 6],
    c110: [cosineAngle(7, 5, 8), 6], c111: [asin(9 * sin(70) / cosineSide(12, 9, 70)), 1], c112: [cosineAngle(13, 7, 8), 6],
    c113: [heron(5, 12, 13), 6], c114: [6 * 10 * sin(60), 2], c115: [cosineSide(24, 36, 50), 2],
    b2: [1125 - 3 * 360, 0], b3: [-Math.sqrt(1 - 144 / 169), 12], b4: [cos(-420), 6], b6: [-Math.sqrt(1 - 0.28 ** 2), 6], b7: [180 - 45, 0], b8: [sin(105), 2], b9: [360 - acos(0.2), 1], b10: [-Math.sqrt(1 - 0.36), 6],
    b11: [10 * sin(30), 6], b12: [atan(6 / 8), 1], b13: [12 * tan(35), 2], b14: [2 * 10 * sin(20), 2], b15: [height(15, 50, 70), 2], b16: [9 * sin(180 - 140), 2], b17: [2 * 8 * sin(25), 2], b18: [height(25, 40, 30), 2], b19: [20 / (1 / tan(30) - 1 / tan(45)), 2], b20: [height(10, 25, 115), 2],
    b21: [180 - 50 - 70, 0], b22: [6 * sin(45) / sin(30), 2], b24: [15 * sin(48) / sin(60), 2], b25: [12 / sin(60) / 2, 2], b26: [8 * sin(30) / 3 > 1 ? 0 : 1, 0], b27: [asin(5 * sin(60) / 8), 1], b28: [180 - asin(12 * sin(50) / 10), 1], b29: [2 * 5 * sin(180 - 30 - 70), 2], b30: [80 * sin(55) / sin(180 - 55 - 75), 2],
    b31: [cosineSide(3, 4, 90), 6], b32: [cosineSide(5, 7, 60), 2], b34: [cosineAngle(9, 6, 7), 1], b35: [cosineSide(8, 11, 135), 2], b37: [cosineAngle(12, 10, 10), 1], b38: [asin(5 * sin(40) / cosineSide(8, 5, 40)), 1], b39: [(1 + Math.sqrt(1 + 24)) / 4, 6], b40: [cosineSide(120, 150, 72), 2],
    b41: [0.5 * 8 * 9 * sin(30), 6], b42: [heron(6, 8, 10), 6], b43: [(7 + 9 + 12) / 2, 0], b44: [heron(7, 8, 9), 2], b45: [7 * 12 * sin(35), 2], b46: [Math.hypot(20, 30), 2], b47: [1 * sin(60) / sin(180 - 50 - 60), 2], b48: [6 * 0.5 * 10 * 10 * sin(60), 2], b49: [heron(5, 6, 9) + heron(9, 7, 8), 2],
    b50: [cosineSide(100 / tan(30), 100 / tan(20), 60), 2]
}

/**
 * Plain arithmetic and trigonometry in LaTeX: powers, fractions, roots, products, divisions, decimal commas,
 * thousands, and \sen, \cos, \tg of angles in degrees. Null when there is a letter or anything else.
 */
function evaluate(latex: string): number | null {
    let js = latex
        .replace(/\\left|\\right/g, '')
        .replace(/\\operatorname\{(sen|tg)\}/g, '\\$1')
        .replace(/\\(?:sen|sin)(?![a-zA-Z])/g, 'S')
        .replace(/\\cos(?![a-zA-Z])/g, 'C')
        .replace(/\\(?:tg|tan)(?![a-zA-Z])/g, 'T')
        .replace(/(\d)\\,(?=\d)/g, '$1')
        .replace(/\{,\}/g, '.')
        .replace(/\\cdot/g, '*')
        .replace(/\\div/g, '/')
        .replace(/\\[ ,;]/g, ' ')
    // \sen 52° is a call; \sen(180°-120°) already has its brackets
    js = js.replace(/([SCT])\s*(\d+(?:\.\d+)?)°/g, '$1($2)').replace(/°/g, '')
    for (let previous = ''; previous !== js;) {
        previous = js
        js = js.replace(/\\[dt]?frac\{([^{}]+)\}\{([^{}]+)\}/g, '(($1)/($2))').replace(/\\sqrt\{([^{}]+)\}/g, 'Math.sqrt($1)').replace(/\^\{([^{}]+)\}/g, '**($1)')
    }
    js = js.replace(/\^(\d)/g, '**$1').replace(/\)\s*\(/g, ')*(').replace(/(\d)\s*\(/g, '$1*(').replace(/(\d)\s*Math/g, '$1*Math').replace(/\s+/g, '')
    if (!/\d/.test(js) || !/^(?:[\d.+\-*/()]|Math\.sqrt|[SCT](?=\())+$/.test(js)) return null
    try {
        const value = Function('S', 'C', 'T', `return ${js}`)(sin, cos, tan) as number
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
    const pieces = formula.replace(/\\begin\{[a-z]+\}|\\end\{[a-z]+\}/g, ' ').split(/\\\\|\\qquad|\\quad|\\ \\to\\ |\\to/)
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
    ...trianglesDiagnostic.flatMap((item) => [item.prompt, item.explanation, ...item.options]),
    ...[...trianglesPractice, ...trianglesChallenges].flatMap((item) => [item.prompt, item.hint, item.explanation]),
    ...trianglesExerciseBank.flatMap((section) => [section.title, ...section.items.flatMap((item) => [item.question, item.solution])])
]

/** The lessons are TSX: their source, with lessonTexts.ts and lessonChecks.ts, read as text */
const lessonSource = ['lessons.tsx', 'lessonTexts.ts', 'lessonChecks.ts'].map((file) => readFileSync(`src/pages/batx1-zientziak-triangeluak/${file}`, 'utf8')).join('\n').replace(/\\\\/g, '\\').replace(/\\'/g, "'")

test('triangeluak batx1 z: the unit is active and routed', () => {
    const course = courses.find((item) => item.id === 'batx1-zientziak')!
    assert.ok(course.topics.find((topic) => topic.id === 'resolucion-triangulos')!.active)
    assert.ok(isUnitV2Path('/matematika/batx1-zientziak/resolucion-triangulos'))
    assert.ok(isUnitV2Path('/matematika/batx1-zientziak/resolucion-triangulos/ariketak'))
})

test('triangeluak batx1 z: diagnostic, practice, challenges and bank are consistent', () => {
    assert.deepEqual(trianglesDiagnostic.map((question) => question.id), [102001, 102002, 102003, 102004, 102005, 102006, 102007, 102008])
    for (const question of trianglesDiagnostic) {
        assert.ok(topics.includes(question.topic), `${question.id}`)
        assert.ok(question.correctIndex < question.options.length)
        assert.equal(new Set(question.options.map((option) => option.es)).size, question.options.length)
    }
    assert.equal(new Set(trianglesDiagnostic.map((question) => question.correctIndex)).size, 3)
    for (const stage of stages) {
        assert.equal(trianglesPractice.filter((item) => item.stage === stage).length, 4, stage)
        assert.equal(trianglesChallenges.filter((item) => item.stage === stage).length, 3, stage)
    }
    assert.deepEqual(trianglesPractice.map((item) => item.id), trianglesPractice.map((_, index) => index + 1))
    assert.deepEqual(trianglesChallenges.map((item) => item.id), trianglesChallenges.map((_, index) => 101 + index))
    for (const item of [...trianglesPractice, ...trianglesChallenges]) {
        assert.ok(stages.includes(item.stage), `${item.id}`)
        assert.equal(checkAnswer(typed(item.expected), item.expected, item.answerForm), 'correct', `${item.id}`)
        for (const language of languages) assert.ok(item.explanation[language] && item.prompt[language] && item.hint[language], `${item.id} ${language}`)
    }
    assert.deepEqual(trianglesExerciseBank.map((section) => section.id), stages)
    const ids = trianglesExerciseBank.flatMap((section) => section.items.map((item) => item.id))
    assert.deepEqual(ids, ids.map((_, index) => index + 1))
    assert.equal(ids.length, 50)
    for (const section of trianglesExerciseBank) {
        assert.equal(section.items.length, 10, section.id)
        assert.ok(section.items.some((item) => item.difficulty === 'easy') && section.items.some((item) => item.difficulty === 'hard'), section.id)
        for (const item of section.items) if (item.answer) assert.equal(checkAnswer(typed(item.answer.expected), item.answer.expected, item.answer.form), 'correct', `${item.id}`)
    }
    assert.deepEqual([...new Set(trianglesChallenges.map((item) => item.points))].sort(), [10, 20, 30])
})

test('triangeluak batx1 z: every answer is worked out again from its data', () => {
    const answers: Array<[string, FractionValue]> = [
        ...trianglesPractice.map((item): [string, FractionValue] => [`p${item.id}`, item.expected]),
        ...trianglesChallenges.map((item): [string, FractionValue] => [`c${item.id}`, item.expected]),
        ...trianglesExerciseBank.flatMap((section) => section.items.flatMap((item): Array<[string, FractionValue]> => (item.answer ? [[`b${item.id}`, item.answer.expected]] : [])))
    ]
    assert.deepEqual(answers.map(([key]) => key).sort(), Object.keys(computed).sort())
    for (const [key, expected] of answers) {
        const [value, places] = computed[key]
        assert.ok(Math.abs(Number(value.toFixed(places)) - valueOf(expected)) < 1e-9, `${key}: ${value} rounds to ${value.toFixed(places)}, not ${valueOf(expected)}`)
    }
})

test('triangeluak batx1 z: every worked equality and approximation with numbers is right', () => {
    const texts = [
        ...trianglesPractice.flatMap((item) => [item.hint.es, item.explanation.es]),
        ...trianglesChallenges.flatMap((item) => [item.hint.es, item.explanation.es]),
        ...trianglesExerciseBank.flatMap((section) => section.items.map((item) => item.solution.es)),
        ...trianglesDiagnostic.map((item) => item.explanation.es)
    ]
    let checked = 0
    for (const [index, text] of texts.entries()) for (const formula of formulasOf(text)) checked += checkFormula(formula, `content ${index}: ${formula}`)
    assert.ok(checked >= 60, `only ${checked} checked`)
})

test('triangeluak batx1 z: the lessons, examples, mistakes and questions add up too', () => {
    // Everything but the wrong side of the typical mistakes, which is wrong on purpose
    const strings = (value: unknown): string[] => (typeof value === 'string' ? [value] : value && typeof value === 'object' ? Object.values(value).flatMap(strings) : [])
    const lessonsFile = readFileSync('src/pages/batx1-zientziak-triangeluak/lessons.tsx', 'utf8').replace(/\\\\/g, '\\').replace(/\\'/g, "'")
    const checks = Object.values(trianglesLessonChecks).flatMap(({ mistake, check }) => [mistake.right, check.prompt, check.explanation, ...check.options].map((text) => text.es))
    let checked = 0
    for (const text of [lessonsFile, ...strings(trianglesLessonTexts), ...checks]) for (const formula of formulasOf(text)) checked += checkFormula(formula, formula)
    assert.ok(checked >= 40, `only ${checked} checked`)
    // The right answer of each «Check it» is its explanation's last value
    const values: Record<string, number> = { 'quadrant-ratios': 15 / 17, 'big-angles': 280, 'related-angles': -sin(10), 'inverse-angles': 225, 'right-review': 15, 'height-strategy': 3, 'sine-rule': 10, 'ambiguous-case': 1, circumradius: 9 / (2 * sin(60)), 'cosine-rule': cosineSide(3, 5, 120), heron: 0.5 * 6 * 10 * sin(30), inaccessible: 50, 'parallelogram-forces': cosineSide(10, 10, 180 - 120) }
    for (const [id, value] of Object.entries(values)) {
        const { check } = trianglesLessonChecks[id as keyof typeof trianglesLessonChecks]
        const shown = evaluate(formulasOf(check.options[check.correctIndex].es)[0])
        assert.ok(shown !== null && Math.abs(shown - value) < 1e-9, `${id}: ${check.options[check.correctIndex].es} is not ${value}`)
        for (const [index, option] of check.options.entries()) {
            const other = evaluate(formulasOf(option.es)[0] ?? '')
            if (index !== check.correctIndex && other !== null) assert.ok(Math.abs(other - value) > 1e-6, `${id}: a wrong answer is also right: ${option.es}`)
        }
    }
    // The answers of the examples, worked out again
    assert.ok(Math.abs(acos(-0.4) - 113.6) < 0.05 && Math.abs(360 - acos(-0.4) - 246.4) < 0.05)
    assert.ok(10 * sin(35) / 4 > 1, 'ambiguous-case: the example has no triangle')
    assert.ok(Math.abs(2 * 6 * sin(48) - 8.92) < 0.005)
    assert.ok(trianglesLessonTexts['three-sides'].exampleAnswer!.es.startsWith('Obtusángulo') && 11 * 11 > 6 * 6 + 8 * 8)
})

test('triangeluak batx1 z: the numbers of the lessons are right', () => {
    // Values that the steps write after an arrow (an angle from its ratio), worked out here
    const near = (value: number, shown: number, places: number) => Math.abs(value - shown) <= 0.5 * 10 ** -places + 1e-9
    assert.ok(near(asin(0.6), 36.9, 1) && near(atan(20 / 21), 43.6, 1))
    assert.ok(near(height(10, 30, 45), 3.66, 2) && near(height(10, 30, 45) / sin(30), 7.32, 2))
    assert.ok(near(asin(8 * sin(40) / 6), 59.0, 1) && near(180 - asin(8 * sin(40) / 6), 121.0, 1))
    assert.ok(near(cosineAngle(5, 7, 3), 38.2, 1))
    const c = cosineSide(9, 6, 50)
    assert.ok(near(c, 6.9, 2) && near(asin(6 * sin(50) / c), 41.8, 1) && near(180 - 50 - asin(6 * sin(50) / c), 88.2, 1))
    assert.ok(near(cosineSide(12, 15, 38), 9.24, 2) && near(cosineSide(4, 6, 110), 8.27, 2) && near(cosineSide(8, 5, 180 - 110), 7.85, 2))
    assert.ok(near(Math.sqrt(3700), 60.83, 2))
})

test('triangeluak batx1 z: every formula renders in KaTeX', () => {
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

test('triangeluak batx1 z: each language in its own place, its names of the ratios, and Arabic without the decimal comma', () => {
    for (const text of allTexts()) {
        assert.ok(!text.ar.includes('{,}'), text.ar)
        const words = (value: string) => value.replace(/\$[^$]+\$/g, ' ')
        if (/[a-zA-Z]{4}/.test(words(text.es))) assert.ok(/[؀-ۿ]/.test(words(text.ar)), `not Arabic: ${text.ar}`)
        for (const language of ['eu', 'es', 'en'] as const) assert.ok(!/[؀-ۿ]/.test(text[language]), `Arabic in ${language}: ${text[language]}`)
        if (/[a-zA-Z]{6}/.test(words(text.es))) assert.ok(text.eu !== text.es && text.en !== text.es, `copied from Spanish: ${text.es}`)
        for (const language of languages) assert.ok(!/\\(?:sen|tg)(?![a-zA-Z])/.test(text[language]), text[language])
        assert.ok(!/\\sin(?![a-zA-Z])/.test(text.es) && !/\\tan(?![a-zA-Z])/.test(text.es + text.eu), text.es)
    }
})

test('triangeluak batx1 z: Basque glues no case ending to a number', () => {
    for (const text of allTexts()) assert.ok(!/\d[a-zñ]/.test(text.eu.replace(/\$[^$]+\$/g, '')) && !/\$(?:ri|ren|rekin|z|ra|tik|ei|ek|ak|en|ko|an)(?![a-zA-Z])/.test(text.eu), text.eu)
})

test('triangeluak batx1 z: every answer appears in its worked explanation or solution', () => {
    const shows = (text: string, value: FractionValue) => {
        const plain = written(value)
        const asFraction = `\\frac{${Math.abs(value.numerator)}}{${value.denominator}}`
        return [plain, asFraction, `-${plain}`, `-${asFraction}`].some((candidate) => text.replace(/(\d)\\,(?=\d)/g, '$1').includes(candidate))
    }
    for (const item of [...trianglesPractice, ...trianglesChallenges]) assert.ok(shows(item.explanation.es, item.expected), `${item.id}: ${written(item.expected)}`)
    for (const section of trianglesExerciseBank) for (const item of section.items) if (item.answer) assert.ok(shows(item.solution.es, item.answer.expected), `bank ${item.id}`)
})

test('triangeluak batx1 z: answers with degrees, units, signs, commas or points are read', () => {
    for (const [input, value] of [['36,9°', [369, 10]], ['−0,45', [-9, 20]], ['12.25 cm', [49, 4]], ['640,86 m', [32043, 50]], ['−5/13', [-5, 13]]] as const) {
        assert.equal(checkAnswer(readTrigonometryAnswer(input), { numerator: value[0], denominator: value[1] }), 'correct', input)
    }
})
