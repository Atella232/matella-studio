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
import { localize } from '../src/pages/batx1-zientziak-konplexuak/text.ts'
import { complexChallenges, complexDiagnostic, complexExerciseBank, complexPractice } from '../src/pages/batx1-zientziak-konplexuak/content.ts'
import { complexLessonChecks } from '../src/pages/batx1-zientziak-konplexuak/lessonChecks.ts'
import { complexLessonTexts } from '../src/pages/batx1-zientziak-konplexuak/lessonTexts.ts'
import { abs, add, arg, conj, div, evaluate, firstQuadrant, I, mul, near, neg, polar, pow, real, roots, sqrt, sub, sum, zeroOf, type C } from './konplexuak-batx1z-math.ts'

const folder = 'src/pages/batx1-zientziak-konplexuak'
const stages = ['binomial', 'operations', 'polar', 'turns', 'roots']
const topics = ['imaginary-unit', 'binomial-form', 'complex-plane', 'add-multiply', 'division', 'powers-of-i', 'quadratic-complex', 'modulus-argument', 'polar-binomial', 'product-quotient', 'rotations', 'de-moivre', 'nth-roots', 'roots-polygons', 'binomial-equations']
const languages = ['eu', 'es', 'en', 'ar'] as const

const typed = (value: FractionValue) => (hasTerminatingDecimal(value) ? toExactDecimal(value)! : `${value.numerator}/${value.denominator}`)
const written = (value: FractionValue) => (hasTerminatingDecimal(value) ? toExactDecimal(value)!.replace(',', '{,}') : `\\frac{${Math.abs(value.numerator)}}{${value.denominator}}`)
const valueOf = (value: FractionValue) => value.numerator / value.denominator

/**
 * Every closed answer worked out from its data, with the decimals the prompt asks for: p = practice,
 * c = challenge, b = bank. Exact answers have more than enough decimals.
 */
const computed: Record<string, [number, number]> = {
    p1: [sqrt(real(-64))[1], 9], p2: [conj([-4, 9])[1], 9], p3: [4 + 1 + -6 / 2, 9], p4: [neg([-5, 2])[0], 9],
    p5: [mul([3, -2], [4, 5])[0], 9], p6: [div(real(10), [1, 3])[1], 9], p7: [pow(I, 42)[0], 9], p8: [div(add(real(6), sqrt(real(36 - 100))), real(2))[1], 9],
    p9: [abs([-5, 12]), 9], p10: [arg([-3, -3]), 9], p11: [arg([Math.sqrt(3), -1]), 9], p12: [polar(6, 240)[0], 9],
    p13: [arg(mul(polar(5, 110), polar(2, 150))), 9], p14: [abs(div(polar(12, 300), polar(4, 75))), 9], p15: [mul([3, 5], I)[0], 9], p16: [pow([1, 1], 8)[0], 9],
    p17: [abs(roots(polar(81, 200), 4)[0]), 9], p18: [Math.max(...roots(polar(27, 60), 3).map(arg)), 9], p19: [10 + 360 / 5, 9], p20: [firstQuadrant(roots(real(-27), 3))[0], 9],
    c101: [Array.from({ length: 21 }, (_, x) => x - 10).find((x) => x * x - 9 === 0 && x + 3 !== 0)!, 9], c102: [mul(sqrt(real(-12)), sqrt(real(-3)))[0], 9],
    c103: [Math.abs((3 * (-2 - -2) + -3 * (-2 - 2) + 3 * (2 - -2)) / 2), 9],
    c104: [zeroOf((x) => mul([2, x], [3, -1])[1]), 9], c105: [sum(Array.from({ length: 10 }, (_, k) => pow(I, k + 1)[0])), 9], c106: [zeroOf((b) => div([4, b], [1, 1])[0]), 9],
    c107: [arg([0, -6]), 9], c108: [abs(mul([3, 4], [5, -12])), 9], c109: [arg(neg(polar(4, 70))), 9],
    c110: [arg(div(polar(8, 50), polar(2, 290))), 9], c111: [mul([5, 2], I)[1], 9], c112: [arg(pow([1, -Math.sqrt(3)], 5)), 9],
    c113: [polar(1, 60)[0], 9], c114: [arg(pow(polar(2, 40), 3)), 9], c115: [sum(roots(polar(16, 90), 4).map(arg)), 9],
    b3: [-7, 9], b6: [(-1 - 2) * (3 - 5), 9], b8: [conj([6, -1])[1], 9],
    b9: [Array.from({ length: 21 }, (_, x) => x - 10).find((x) => x * x - x === 0 && x * x - 1 !== 0)!, 9], b10: [2 * 2 * (2 * 3), 9],
    b13: [pow(I, 100)[0], 9], b14: [pow([1, -2], 2)[1], 9], b16: [div(real(13), [2, -3])[0], 9], b18: [add(pow(I, 23), pow(I, 24))[1], 9],
    b20: [Array.from({ length: 10 }, (_, k) => k + 1).find((k) => Math.abs(pow([1, k], 2)[0]) < 1e-9)!, 9],
    b21: [abs([8, -6]), 9], b22: [arg([0, 5]), 9], b23: [arg([-4, 0]), 9], b24: [arg([1, -1]), 9], b25: [arg([-Math.sqrt(3), 1]), 9],
    b27: [polar(10, 300)[0], 9], b28: [arg([3, 4]), 2], b30: [arg([-5, -12]), 2],
    b33: [abs(pow(polar(2, 30), 4)), 9], b34: [arg(pow(polar(3, 100), 3)), 9], b36: [pow([-2, 2], 4)[0], 9], b37: [arg(div(real(1), polar(4, 50))), 9],
    b38: [mul([4, 2], polar(1, 60))[0], 2], b40: [pow([1, 1], 10)[1], 9],
    b42: [arg(roots(real(1), 5)[1]) - arg(roots(real(1), 5)[0]), 9], b43: [abs(roots(real(64), 6)[0]), 9], b45: [firstQuadrant(roots(real(-16), 4))[0], 2],
    b48: [Math.max(...roots(real(32), 5).map(arg)), 9], b49: [sum(roots([0, 8], 3).map((root) => root[0])), 9],
    b50: [6 * abs(sub(roots(real(64), 6)[0], roots(real(64), 6)[1])), 9]
}


/** The decimals of the number a side ends with: 53{,}13° has 2 */
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
            let previous: C | null = null
            let previousLatex = ''
            for (let index = 0; index < sides.length; index += 2) {
                const value = evaluate(sides[index])
                const relation = sides[index - 1]
                if (value !== null && previous !== null) {
                    read += 1
                    if (relation === '=') assert.ok(near(previous, value), `${where}: ${previousLatex} = ${sides[index]} (${previous} ≠ ${value})`)
                    else {
                        const places = Math.max(decimals(sides[index]), decimals(previousLatex))
                        assert.ok(Math.abs(previous[0] - value[0]) <= 0.5 * 10 ** -places + 1e-9 && Math.abs(previous[1] - value[1]) <= 0.5 * 10 ** -places + 1e-9, `${where}: ${previousLatex} ≈ ${sides[index]} (${previous}, ${value})`)
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
    ...complexDiagnostic.flatMap((item) => [item.prompt, item.explanation, ...item.options]),
    ...[...complexPractice, ...complexChallenges].flatMap((item) => [item.prompt, item.hint, item.explanation]),
    ...complexExerciseBank.flatMap((section) => [section.title, ...section.items.flatMap((item) => [item.question, item.solution])])
]

/** The lessons are TSX: their source, with lessonTexts.ts and lessonChecks.ts, read as text */
const lessonSource = ['lessons.tsx', 'lessonTexts.ts', 'lessonChecks.ts'].map((file) => readFileSync(`${folder}/${file}`, 'utf8')).join('\n').replace(/\\\\/g, '\\').replace(/\\'/g, "'")

test('konplexuak batx1 z: the evaluator reads complex numbers, polar forms and roots', () => {
    const cases: Array<[string, C]> = [
        ['(2+3i)(4-i)', [11, 10]], ['8-2i+12i-3i^2', [11, 10]], ['\\frac{5+5i}{2+i}', [3, 1]], ['i^{27}', [0, -1]], ['2\\sqrt{3}\\,i\\cdot\\sqrt{3}\\,i', [-6, 0]],
        ['|-6+8i|', [10, 0]], ['4_{150°}', [-2 * Math.sqrt(3), 2]], ['(\\sqrt{2}_{45°})^8', [16, 0]], ['\\overline{3-5i}', [3, 5]], ['-6_{40°}', neg(polar(6, 40))],
        ['\\left(\\frac{6}{2}\\right)_{150°-60°}', [0, 3]], ['\\sqrt[3]{8}', [2, 0]], ['\\sqrt{-36}', [0, 6]], ['4(\\cos 150°+i\\operatorname{sen} 150°)', polar(4, 150)], ['(2-\\sqrt{3})+(1+2\\sqrt{3})i', [2 - Math.sqrt(3), 1 + 2 * Math.sqrt(3)]]
    ]
    for (const [latex, value] of cases) {
        const read = evaluate(latex)
        assert.ok(read && near(read, value), `${latex}: ${read} ≠ ${value}`)
    }
    for (const latex of ['{z}=3', 'x^2+9', '\\alpha', 'a+bi', '(3,\\ 2)', 'r_\\alpha']) assert.equal(evaluate(latex), null, latex)
})

test('konplexuak batx1 z: the unit is active and routed', () => {
    const course = courses.find((item) => item.id === 'batx1-zientziak')!
    assert.ok(course.topics.find((topic) => topic.id === 'numeros-complejos')!.active)
    assert.ok(isUnitV2Path('/matematika/batx1-zientziak/numeros-complejos'))
    assert.ok(isUnitV2Path('/matematika/batx1-zientziak/numeros-complejos/ariketak'))
})

test('konplexuak batx1 z: diagnostic, practice, challenges and bank are consistent', () => {
    assert.deepEqual(complexDiagnostic.map((question) => question.id), [104001, 104002, 104003, 104004, 104005, 104006, 104007, 104008])
    for (const question of complexDiagnostic) {
        assert.ok(topics.includes(question.topic), `${question.id}`)
        assert.ok(question.correctIndex < question.options.length)
        assert.equal(new Set(question.options.map((option) => option.es)).size, question.options.length)
    }
    assert.equal(new Set(complexDiagnostic.map((question) => question.correctIndex)).size, 3)
    for (const stage of stages) {
        assert.equal(complexPractice.filter((item) => item.stage === stage).length, 4, stage)
        assert.equal(complexChallenges.filter((item) => item.stage === stage).length, 3, stage)
    }
    assert.deepEqual(complexPractice.map((item) => item.id), complexPractice.map((_, index) => index + 1))
    assert.deepEqual(complexChallenges.map((item) => item.id), complexChallenges.map((_, index) => 101 + index))
    for (const item of [...complexPractice, ...complexChallenges]) {
        assert.ok(stages.includes(item.stage), `${item.id}`)
        assert.equal(checkAnswer(typed(item.expected), item.expected, item.answerForm), 'correct', `${item.id}`)
        for (const language of languages) assert.ok(item.explanation[language] && item.prompt[language] && item.hint[language], `${item.id} ${language}`)
    }
    assert.deepEqual(complexExerciseBank.map((section) => section.id), stages)
    const ids = complexExerciseBank.flatMap((section) => section.items.map((item) => item.id))
    assert.deepEqual(ids, ids.map((_, index) => index + 1))
    assert.equal(ids.length, 50)
    for (const section of complexExerciseBank) {
        assert.equal(section.items.length, 10, section.id)
        assert.ok(section.items.some((item) => item.difficulty === 'easy') && section.items.some((item) => item.difficulty === 'hard'), section.id)
        for (const item of section.items) if (item.answer) assert.equal(checkAnswer(typed(item.answer.expected), item.answer.expected, item.answer.form), 'correct', `${item.id}`)
    }
    assert.deepEqual([...new Set(complexChallenges.map((item) => item.points))].sort(), [10, 20, 30])
})

test('konplexuak batx1 z: every answer is worked out again from its data', () => {
    const answers: Array<[string, FractionValue]> = [
        ...complexPractice.map((item): [string, FractionValue] => [`p${item.id}`, item.expected]),
        ...complexChallenges.map((item): [string, FractionValue] => [`c${item.id}`, item.expected]),
        ...complexExerciseBank.flatMap((section) => section.items.flatMap((item): Array<[string, FractionValue]> => (item.answer ? [[`b${item.id}`, item.answer.expected]] : [])))
    ]
    assert.deepEqual(answers.map(([key]) => key).sort(), Object.keys(computed).sort())
    for (const [key, expected] of answers) {
        const [value, places] = computed[key]
        assert.ok(Math.abs(Number(value.toFixed(places)) - valueOf(expected)) < 1e-9, `${key}: ${value} rounds to ${value.toFixed(places)}, not ${valueOf(expected)}`)
    }
})

test('konplexuak batx1 z: every worked equality and approximation with numbers is right', () => {
    const texts = [
        ...complexPractice.flatMap((item) => [item.hint.es, item.explanation.es]),
        ...complexChallenges.flatMap((item) => [item.hint.es, item.explanation.es]),
        ...complexExerciseBank.flatMap((section) => section.items.map((item) => item.solution.es)),
        ...complexDiagnostic.map((item) => item.explanation.es)
    ]
    let checked = 0
    for (const [index, text] of texts.entries()) for (const formula of formulasOf(text)) checked += checkFormula(formula, `content ${index}: ${formula}`)
    assert.ok(checked >= 80, `only ${checked} checked`)
})

test('konplexuak batx1 z: the lessons, examples, mistakes and questions add up too', () => {
    // Everything but the wrong side of the typical mistakes, which is wrong on purpose
    const strings = (value: unknown): string[] => (typeof value === 'string' ? [value] : value && typeof value === 'object' ? Object.values(value).flatMap(strings) : [])
    const lessonsFile = readFileSync(`${folder}/lessons.tsx`, 'utf8').replace(/\\\\/g, '\\').replace(/\\'/g, "'")
    const checks = Object.values(complexLessonChecks).flatMap(({ mistake, check }) => [mistake.right, check.prompt, check.explanation, ...check.options].map((text) => text.es))
    let checked = 0
    for (const text of [lessonsFile, ...strings(complexLessonTexts), ...checks]) for (const formula of formulasOf(text)) checked += checkFormula(formula, formula)
    assert.ok(checked >= 60, `only ${checked} checked`)
    // The right answer of each «Check it» that is a number, worked out again; no wrong answer has the same value
    const values: Record<string, C> = {
        'imaginary-unit': sqrt(real(-25)), 'binomial-form': conj([-6, -1]), 'add-multiply': pow([1, 2], 2), division: div(real(5), [2, -1]), 'powers-of-i': pow(I, 22),
        'modulus-argument': real(abs([-6, 8])), 'polar-binomial': polar(6, 90), 'product-quotient': div(polar(8, 100), polar(4, 40)), 'de-moivre': pow(polar(3, 50), 2),
        'nth-roots': real(roots(polar(16, 80), 4).map(arg).find((angle) => angle > 90 && angle < 180)!),
        'binomial-equations': real(roots(real(64), 6).filter((root) => Math.abs(root[1]) < 1e-9).length)
    }
    for (const [id, value] of Object.entries(values)) {
        const { check } = complexLessonChecks[id as keyof typeof complexLessonChecks]
        const shown = evaluate(formulasOf(check.options[check.correctIndex].es)[0])
        assert.ok(shown !== null && near(shown, value), `${id}: ${check.options[check.correctIndex].es} is not ${value}`)
        for (const [index, option] of check.options.entries()) {
            const other = evaluate(formulasOf(option.es)[0] ?? '')
            if (index !== check.correctIndex && other !== null) assert.ok(!near(other, value), `${id}: a wrong answer is also right: ${option.es}`)
        }
    }
    // A vertex of the hexagon: turning it 60° five more times gets back to it, and the wrong ones are not vertices
    const { check } = complexLessonChecks['roots-polygons']
    const vertex = (latex: string) => near(pow(div(evaluate(latex)!, polar(3, 10)), 6), real(1))
    check.options.forEach((option, index) => assert.equal(vertex(formulasOf(option.es)[0]), index === check.correctIndex, option.es))
})

test('konplexuak batx1 z: the solutions of the lessons are the right ones', () => {
    // «Let's solve» and «Another example» of the equations, solved again
    const solves = (coefficients: number[], root: C) => near(coefficients.reduce<C>((total, coefficient) => add(mul(total, root), real(coefficient)), [0, 0]), [0, 0])
    assert.ok(solves([1, 0, 9], [0, 3]) && solves([1, 0, 9], [0, -3]) && solves([1, 0, 49], [0, 7]))
    for (const [coefficients, a, b] of [[[1, -4, 13], 2, 3], [[1, 6, 10], -3, 1], [[1, 4, 8], -2, 2], [[1, 2, 5], -1, 2], [[1, -2, 10], 1, 3], [[1, -6, 25], 3, 4], [[1, 2, 10], -1, 3], [[1, -6, 13], 3, 2]] as Array<[number[], number, number]>) {
        assert.ok(solves(coefficients, [a, b]) && solves(coefficients, [a, -b]), `${coefficients}`)
    }
    // The binomial equations: every root found is a solution, and there are as many as the degree
    for (const [w, n, angles] of [[real(-8), 3, [60, 180, 300]], [real(-16), 4, [45, 135, 225, 315]], [[0, 8], 3, [30, 150, 270]], [polar(9, 100), 2, [50, 230]], [polar(27, 60), 3, [20, 140, 260]], [[0, -9], 2, [135, 315]], [real(27), 3, [0, 120, 240]]] as Array<[C, number, number[]]>) {
        assert.deepEqual(roots(w, n).map((root) => Math.round(arg(root) * 1e6) / 1e6), angles, `${w} ${n}`)
        for (const root of roots(w, n)) assert.ok(near(pow(root, n), w))
    }
    // The triangle with a vertex at 2i and the square with a vertex at 3 + i
    assert.deepEqual([90, 210, 330].map((angle) => polar(2, angle)).map(([a, b]) => [Math.round(a * 1e9) / 1e9, Math.round(b * 1e9) / 1e9]), [[0, 2], [-Math.round(Math.sqrt(3) * 1e9) / 1e9, -1], [Math.round(Math.sqrt(3) * 1e9) / 1e9, -1]])
    assert.ok([[-1, 3], [-3, -1], [1, -3]].every((vertex, index) => near(mul([3, 1], pow(I, index + 1)), vertex as C)))
    // The modulus and the argument of the lessons (with their quadrant)
    assert.ok(abs([-1, Math.sqrt(3)]) - 2 < 1e-12 && Math.abs(arg([-1, Math.sqrt(3)]) - 120) < 1e-9 && Math.abs(arg([-2, -2]) - 225) < 1e-9 && Math.abs(arg([-1, -1]) - 225) < 1e-9)
    assert.ok(Math.abs(arg([3, 4]) - 53.13) < 0.005 && Math.abs(arg([-3, 4]) - 126.87) < 0.005 && Math.abs(arg([3, -4]) - 306.87) < 0.005)
})

test('konplexuak batx1 z: every formula renders in KaTeX', () => {
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
    // The lessons: each language with its name of the sine and the tangent
    let lessonFormulas = 0
    for (const formula of formulasOf(lessonSource)) {
        for (const language of languages) katex.renderToString(formulaFor(language, localize(language, formula.replace(/\{,\}/g, language === 'ar' ? '.' : '{,}'))), { throwOnError: true, strict: 'error' })
        lessonFormulas += 1
    }
    assert.ok(lessonFormulas > 150, `only ${lessonFormulas}`)
    assert.deepEqual([...lessonSource.matchAll(/id: '([a-z-]+)',\s+stage:/g)].map((match) => match[1]), topics)
})

test('konplexuak batx1 z: each language in its own place, its names, and Arabic without the decimal comma', () => {
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

test('konplexuak batx1 z: Basque glues no case ending to a number, and z is always {z}', () => {
    for (const text of allTexts()) assert.ok(!/\d[a-zñ]/.test(text.eu.replace(/\$[^$]+\$/g, '')) && !/\$(?:ri|ren|rekin|z|ra|tik|ei|ek|ak|en|ko|an)(?![a-zA-Z])/.test(text.eu), text.eu)
    for (const text of allTexts()) for (const language of languages) for (const formula of formulasOf(text[language])) assert.ok(!/(?<![\\a-zA-Z{])z(?![}a-zA-Z])/.test(formula.replace(/\\[a-zA-Z]+\{z\}|\{z\}/g, '')), formula)
})

test('konplexuak batx1 z: every answer appears in its worked explanation or solution', () => {
    const shows = (text: string, value: FractionValue) => {
        const plain = written(value)
        const asFraction = `\\frac{${Math.abs(value.numerator)}}{${value.denominator}}`
        return [plain, asFraction, `-${plain}`, `-${asFraction}`].some((candidate) => text.replace(/(\d)\\,(?=\d)/g, '$1').includes(candidate))
    }
    for (const item of [...complexPractice, ...complexChallenges]) assert.ok(shows(item.explanation.es, item.expected), `${item.id}: ${written(item.expected)}`)
    for (const section of complexExerciseBank) for (const item of section.items) if (item.answer) assert.ok(shows(item.solution.es, item.answer.expected), `bank ${item.id}`)
})

test('konplexuak batx1 z: answers with degrees, fractions, signs, commas or points are read', () => {
    for (const [input, value] of [['120°', [120, 1]], ['−3/4', [-3, 4]], ['53.13', [5313, 100]], ['3/2', [3, 2]], ['−64', [-64, 1]], ['247,38', [24738, 100]]] as const) {
        assert.equal(checkAnswer(readTrigonometryAnswer(input), { numerator: value[0], denominator: value[1] }), 'correct', input)
    }
})
