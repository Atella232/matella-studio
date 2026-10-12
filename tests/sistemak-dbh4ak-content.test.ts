import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import katex from 'katex'
import { courses } from '../src/data/courses.ts'
import { checkAnswer, hasTerminatingDecimal, toExactDecimal, type FractionValue } from '../src/features/unit-v2/math/fraction.ts'
import { isUnitV2Path } from '../src/features/unit-v2/paths.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { systemsChallenges as challenges, systemsDiagnostic as diagnostic, systemsExerciseBank as bank, systemsPractice as practice } from '../src/pages/dbh4-akademikoak-sistemak/content.ts'
import { classify, latticePoints, region, type HalfPlane, type Linear, type Point, type SystemKind } from '../src/pages/dbh4-akademikoak-sistemak/systems.ts'

const stages = ['linear', 'methods', 'nonlinear', 'half-planes', 'problems']
const topics = ['linear-equations', 'graphic', 'classify', 'substitution', 'equalization', 'reduction', 'simplify-first', 'line-curve', 'squares', 'check-solutions', 'half-plane', 'region', 'linear-problems', 'nonlinear-problems', 'region-problems']

const typed = (value: FractionValue, form?: string) => (hasTerminatingDecimal(value) && (form !== 'simplified' || value.denominator === 1) ? toExactDecimal(value)! : `${value.numerator}/${value.denominator}`)
const written = (value: FractionValue) => (hasTerminatingDecimal(value) ? toExactDecimal(value)!.replace(',', '{,}') : `\\frac{${Math.abs(value.numerator)}}{${value.denominator}}`)

/** Rewrites base^(n) as Math.pow(base,(n)), the base being a number or a (possibly nested) bracket */
function powers(js: string): string {
    let index = js.indexOf('^(')
    while (index !== -1) {
        let start = index - 1
        if (js[start] === ')') {
            for (let depth = 0; start >= 0; start -= 1) {
                if (js[start] === ')') depth += 1
                if (js[start] === '(') depth -= 1
                if (depth === 0) break
            }
        } else {
            while (start > 0 && /[\d.]/.test(js[start - 1])) start -= 1
        }
        let end = index + 1
        for (let depth = 0; end < js.length; end += 1) {
            if (js[end] === '(') depth += 1
            if (js[end] === ')') depth -= 1
            if (depth === 0) break
        }
        js = `${js.slice(0, start)}Math.pow(${js.slice(start, index)},${js.slice(index + 1, end + 1)})${js.slice(end + 1)}`
        index = js.indexOf('^(')
    }
    return js
}

/** Arithmetic in LaTeX where x and y may appear: they are replaced by the given values */
function evaluate(latex: string, x?: number, y?: number): number | null {
    let js = latex
        .replace(/\\,/g, '')
        .replace(/\\left|\\right/g, '')
        .replace(/(\d)\{,\}(\d)/g, '$1.$2')
        .replace(/\\cdot/g, '*')
        .replace(/\\mathbin\{:\}|:/g, '/')
        .replace(/\s+/g, '')
    if (x !== undefined) js = js.replace(/x/g, `(${x})`)
    if (y !== undefined) js = js.replace(/y/g, `(${y})`)
    for (let pass = 0; pass < 5; pass += 1) {
        js = js
            .replace(/\\frac\{([^{}]+)\}\{([^{}]+)\}/g, '(($1)/($2))')
            .replace(/\\sqrt\{([^{}]+)\}/g, 'Math.sqrt($1)')
            .replace(/\^\{([^{}]+)\}/g, '^($1)')
    }
    js = powers(js)
    js = js.replace(/\)\(/g, ')*(').replace(/(\d)\(/g, '$1*(').replace(/(\d)Math/g, '$1*Math').replace(/\)Math/g, ')*Math').replace(/\)(\d)/g, ')*$1')
    if (!/^(?:[\d+\-*/().,]|Math\.(?:pow|sqrt))+$/.test(js) || !/\d/.test(js)) return null
    try {
        const value = Function('Math', `return ${js}`)(Math) as number
        return Number.isFinite(value) ? value : null
    } catch {
        return null
    }
}

const allTexts = (): LocalizedText[] => [
    ...diagnostic.flatMap((item) => [item.prompt, item.explanation, ...item.options]),
    ...[...practice, ...challenges].flatMap((item) => [item.prompt, item.hint, item.explanation]),
    ...bank.flatMap((section) => [section.title, ...section.items.flatMap((item) => [item.question, item.solution])])
]
/** The content and the lessons (read as text: they are TSX), where every equation must appear */
const everything = () => `${allTexts().map((text) => text.es).join(' ')} ${readFileSync('src/pages/dbh4-akademikoak-sistemak/lessons.tsx', 'utf8').replace(/\\\\/g, '\\')}`

test('sistemak 4. DBH ak: the unit is active and routed', () => {
    const course = courses.find((item) => item.id === 'dbh4-akademikoak')!
    assert.ok(course.topics.find((topic) => topic.id === 'sistemas')!.active)
    assert.ok(isUnitV2Path('/matematika/dbh4-akademikoak/sistemas'))
    assert.ok(isUnitV2Path('/matematika/dbh4-akademikoak/sistemas/ariketak'))
})

test('sistemak 4. DBH ak: diagnostic, practice, challenges and bank are consistent', () => {
    assert.equal(diagnostic.length, 8)
    for (const question of diagnostic) {
        assert.ok(topics.includes(question.topic), `${question.id}`)
        assert.ok(question.correctIndex < question.options.length)
        assert.equal(new Set(question.options.map((option) => option.es)).size, question.options.length)
    }
    assert.ok(new Set(diagnostic.map((question) => question.correctIndex)).size === 3)
    for (const stage of stages) {
        assert.equal(practice.filter((item) => item.stage === stage).length, 4, stage)
        assert.equal(challenges.filter((item) => item.stage === stage).length, 3, stage)
    }
    for (const item of [...practice, ...challenges]) {
        assert.ok(stages.includes(item.stage), `${item.id}`)
        assert.equal(checkAnswer(typed(item.expected, item.answerForm), item.expected, item.answerForm), 'correct', `${item.id}`)
        for (const language of ['eu', 'es', 'ar'] as const) assert.ok(item.explanation[language].length > 0 && item.prompt[language].length > 0 && item.hint[language].length > 0, `${item.id} ${language}`)
    }
    assert.deepEqual(bank.map((section) => section.id), stages)
    const ids = bank.flatMap((section) => section.items.map((item) => item.id))
    assert.deepEqual(ids, ids.map((_, index) => index + 1))
    assert.equal(ids.length, 50)
    for (const section of bank) {
        assert.ok(section.items.some((item) => item.difficulty === 'easy') && section.items.some((item) => item.difficulty === 'hard'), section.id)
        for (const item of section.items) {
            for (const language of ['eu', 'es', 'ar'] as const) assert.ok(item.question[language].length > 0 && item.solution[language].length > 0, `${item.id} ${language}`)
            if (item.answer) assert.equal(checkAnswer(typed(item.answer.expected, item.answer.form), item.answer.expected, item.answer.form), 'correct', `${item.id}`)
        }
    }
    assert.equal(new Set(challenges.map((item) => item.id)).size, challenges.length)
    assert.deepEqual([...new Set(challenges.map((item) => item.points))].sort(), [10, 20, 30])
})

test('sistemak 4. DBH ak: every formula renders in KaTeX', () => {
    let formulas = 0
    for (const text of allTexts()) {
        for (const language of ['eu', 'es', 'ar'] as const) {
            for (const [, formula] of text[language].matchAll(/\$([^$]+)\$/g)) {
                katex.renderToString(formula, { throwOnError: true, strict: 'error' })
                assert.ok(!/[؀-ۿ]/.test(formula), formula)
                formulas += 1
            }
        }
    }
    assert.ok(formulas > 300, `only ${formulas}`)
})

test('sistemak 4. DBH ak: Arabic never keeps the decimal comma', () => {
    for (const text of allTexts()) assert.ok(!text.ar.includes('{,}'), text.ar)
})

test('sistemak 4. DBH ak: every worked equality with numbers is right', () => {
    const texts = [
        ...practice.flatMap((item) => [item.hint.es, item.explanation.es]),
        ...challenges.flatMap((item) => [item.hint.es, item.explanation.es]),
        ...bank.flatMap((section) => section.items.map((item) => item.solution.es)),
        ...diagnostic.flatMap((item) => [item.explanation.es])
    ]
    let checked = 0
    for (const text of texts) {
        for (const [, formula] of text.matchAll(/\$([^$]+)\$/g)) {
            if (formula.includes('\\approx') || formula.includes('\\ldots')) continue
            for (const part of formula.split(/\\qquad|\\quad|\\ \\to\\ |\\to/)) {
                const values = part.split('=').map((side) => evaluate(side)).filter((value): value is number => value !== null)
                if (values.length < 2) continue
                assert.ok(values.every((value) => Math.abs(value - values[0]) < 1e-9 * Math.max(1, Math.abs(values[0]))), `${part} → ${values.join(' / ')}`)
                checked += 1
            }
        }
    }
    assert.ok(checked >= 30, `only ${checked} checked`)
})

/** Every system of the unit, its solutions and the pairs that must fail (false solutions) */
const systems: Array<[string[], Point[], Point[]]> = [
    [['x+y=4', 'x-y=2'], [[3, 1]], []],
    [['2x+y=7', 'x-y=-1'], [[2, 3]], []],
    [['2x+y=7', 'x-y=2'], [[3, 1]], []],
    [['-x+3y=-4', '5x+y=4'], [[1, -1]], []],
    [['x+5y=7', '3x-5y=11'], [[9 / 2, 1 / 2]], []],
    [['x-2y=1', '3x+y=17'], [[5, 2]], []],
    [['x=2y+1', 'x=7-y'], [[5, 2]], []],
    [['y=2x-1', 'y=-x+5'], [[2, 3]], []],
    [['3x-5y=-26', '4x+10y=32'], [[-2, 4]], []],
    [['22x+17y=49', '31x-26y=119'], [[3, -1]], []],
    [['2x+3y=12', '5x-2y=11'], [[3, 2]], []],
    [['3x-2(y-1)=y-x+1', '2x-y=x+y-9'], [[5, 7]], []],
    [['\\frac{x}{5}-\\frac{y}{4}=4', '-2(x+y)=1-\\frac{x}{2}'], [[10, -8]], []],
    [['\\frac{x}{2}+\\frac{y}{3}=4', '2(x-y)=x-4'], [[5, 9 / 2]], []],
    [['x^{2}+y^{2}=25', 'x+y=7'], [[3, 4], [4, 3]], []],
    [['y=x^{2}-1', 'y=x+1'], [[2, 3], [-1, 0]], []],
    [['x^{2}+y^{2}=41', 'x^{2}-y^{2}=9'], [[5, 4], [5, -4], [-5, 4], [-5, -4]], []],
    [['x^{2}+y^{2}=13', 'x^{2}-y^{2}=5'], [[3, 2], [3, -2], [-3, 2], [-3, -2]], []],
    [['x^{2}+y^{2}=34', 'x^{2}-y^{2}=16'], [[5, 3], [-5, -3]], []],
    [['x^{2}+y^{2}=10', '2x^{2}-y^{2}=17'], [[3, 1], [-3, -1]], []],
    [['x-y=15', 'xy=100'], [[20, 5], [-5, -20]], []],
    [['xy=6', 'x-y=1'], [[3, 2], [-2, -3]], []],
    [['x+y=5', 'xy=6'], [[2, 3], [3, 2]], []],
    [['x+y=7', 'xy=12'], [[3, 4], [4, 3]], []],
    [['\\sqrt{x-2}=y+2', '2x-3=2-y'], [[3, -1]], [[17 / 4, -7 / 2]]],
    [['\\frac{1}{x-y}+\\frac{3}{x}=2', '3x-y-1=0'], [[1, 2], [3 / 4, 5 / 4]], []],
    [['x+y=1', 'x^{2}+xy+y^{2}=21'], [[-4, 5], [5, -4]], []],
    [['x+y=17', 'x^{2}+y^{2}=169'], [[12, 5], [5, 12]], []],
    [['x+y=27', 'x^{2}-y^{2}=81'], [[15, 12]], []],
    [['x+y=14', 'xy=48'], [[8, 6], [6, 8]], []],
    [['3x+2y=7', '5x-2y=9'], [[2, 1 / 2]], []],
    [['4x-3y=-1', 'x-2y=-9'], [[5, 7]], []],
    [['5x+2y=1', '3x-y=5'], [[1, -2]], []],
    [['4x-5y=80', '-3x-4y=2'], [[10, -8]], []],
    [['\\frac{x+1}{2}-\\frac{y}{3}=1', 'x-(y-1)=2'], [[1, 0]], []],
    [['\\frac{x}{3}+\\frac{y}{2}=3', '\\frac{x}{2}-\\frac{y}{4}=\\frac{1}{2}'], [[3, 4]], []],
    [['3-2(x-4)=5y+6', '5x-3y=12x-(4-y)'], [[0, 1]], []],
    [['2x+5y=5', '7x+4y=4'], [[0, 1]], []],
    [['x+y=20', '2x+4y=56'], [[12, 8]], []],
    [['x+y=20', 'x+2y=25'], [[15, 5]], []],
    [['x+y=120', '15x+10y=1\\,550'], [[70, 50]], []],
    [['x-5=3(y-5)', 'x+10=2(y+10)'], [[50, 20]], []],
    [['x+y=10', 'x-y=4'], [[7, 3]], []],
    [['y=2x', 'x+y=12'], [[4, 8]], []],
    [['y=x+3', 'y=2x+1'], [[2, 5]], []],
    [['x+y=10', 'x-y=2'], [[6, 4]], []],
    [['x=2y', 'x+y=9'], [[6, 3]], []],
    [['m+n=3', '3m+n=7'], [], []]
]

test('sistemak 4. DBH ak: every system holds at its solutions and fails at the false ones', () => {
    const text = everything()
    for (const [equations, solutions, wrong] of systems) {
        if (!solutions.length) continue
        for (const equation of equations) {
            assert.ok(text.includes(equation), `not in the unit: ${equation}`)
            const [left, right] = equation.split('=')
            const gap = ([x, y]: Point) => {
                const a = evaluate(left, x, y)
                const b = evaluate(right, x, y)
                return a === null || b === null ? null : Math.abs(a - b)
            }
            for (const point of solutions) assert.ok((gap(point) ?? 1) < 1e-9, `${equation} at ${point}`)
        }
        // A false solution fails at least one equation
        for (const point of wrong) {
            const fails = equations.some((equation) => {
                const [left, right] = equation.split('=')
                const a = evaluate(left, ...point)
                const b = evaluate(right, ...point)
                return a === null || b === null || Math.abs(a - b) > 1e-9
            })
            assert.ok(fails, `${equations.join(', ')} should fail at ${point}`)
        }
    }
})

/** Inequalities in two unknowns with points inside and outside their half-plane */
const halfPlanes: Array<[string, Point[], Point[]]> = [
    ['2x+y\\le 4', [[0, 0], [2, 0], [1, 2], [-1, 5]], [[3, 0], [0, 5]]],
    ['x+2y\\le -1', [[-1, 0], [0, -1]], [[0, 0]]],
    ['2x-3y>8', [[3, -1]], [[0, 0], [4, 0]]],
    ['2x-y>3', [[3, 2]], [[0, 0], [3, 3]]],
    ['3x+2y\\le 12', [[0, 6], [4, 0], [1, 4]], [[1, 5], [5, 0]]],
    ['3x+2y\\le 20', [[4, 4]], [[5, 5]]],
    ['2x+y\\le 10', [[3, 4]], [[3, 5]]],
    ['x+y<6', [[1, 4]], [[1, 5]]]
]

test('sistemak 4. DBH ak: every inequality holds inside its half-plane and fails outside', () => {
    const text = everything()
    for (const [inequality, inside, outside] of halfPlanes) {
        assert.ok(text.includes(inequality), `not in the unit: ${inequality}`)
        const [, left, sign, right] = inequality.match(/^(.+?)(\\le|\\ge|<|>)(.+)$/)!
        const holds = ([x, y]: Point) => {
            const a = evaluate(left, x, y)!
            const b = evaluate(right, x, y)!
            return sign === '<' ? a < b : sign === '>' ? a > b : sign === '\\le' ? a <= b + 1e-12 : a >= b - 1e-12
        }
        for (const point of inside) assert.ok(holds(point), `${inequality} at ${point}`)
        for (const point of outside) assert.ok(!holds(point), `${inequality} should fail at ${point}`)
    }
})

const h = (a: number, b: number, c: number, sense: HalfPlane['sense']): HalfPlane => ({ a, b, c, sense })
const area = (points: Point[]) => Math.abs(points.reduce((sum, [x, y], index) => {
    const [nx, ny] = points[(index + 1) % points.length]
    return sum + x * ny - nx * y
}, 0)) / 2

test('sistemak 4. DBH ak: the whole points and the areas of the regions', () => {
    const box = { xMin: -10, xMax: 20, yMin: -10, yMax: 20 }
    const counts: Array<[HalfPlane[], number]> = [
        [[h(1, 1, 4, '≤'), h(1, 0, 0, '≥'), h(0, 1, 0, '≥')], 15],
        [[h(1, 1, 3, '≤'), h(1, 0, 0, '≥'), h(0, 1, 0, '≥')], 10],
        [[h(3, 2, 12, '≤'), h(1, 0, 0, '≥'), h(0, 1, 0, '≥')], 19],
        [[h(2, 1, 4, '≤'), h(1, 0, 0, '≥'), h(0, 1, 0, '≥')], 9],
        [[h(1, 0, 1, '≥'), h(0, 1, 1, '≥'), h(1, 1, 6, '<')], 10],
        [[h(0, 1, 0, '>'), h(-1, 1, 0, '<'), h(1, 0, 5, '<')], 6],
        [[h(2, 1, 10, '≤'), h(1, 0, 2, '≥'), h(0, 1, 3, '≥')], 6]
    ]
    for (const [halves, count] of counts) assert.equal(latticePoints(box, halves).length, count, JSON.stringify(halves))
    const areas: Array<[HalfPlane[], number]> = [
        [[h(0, 1, 1, '≥'), h(1, 0, 4, '≤'), h(-1, 1, 0, '≤')], 4.5],
        [[h(1, 0, 0, '≥'), h(0, 1, 0, '≥'), h(1, 1, 5, '≤')], 12.5],
        [[h(0, 1, 0, '≥'), h(-1, 1, 0, '≤'), h(1, 0, 6, '≤')], 18]
    ]
    for (const [halves, value] of areas) assert.ok(Math.abs(area(region(box, halves)) - value) < 1e-9, JSON.stringify(halves))
})

test('sistemak 4. DBH ak: the classifications of the unit', () => {
    const e = (a: number, b: number, c: number): Linear => ({ a, b, c })
    const cases: Array<[Linear, Linear, SystemKind]> = [
        [e(2, 1, 7), e(1, -1, 2), 'one'],
        [e(1, 2, 3), e(2, 4, 5), 'none'],
        [e(1, 2, 3), e(2, 4, 6), 'infinite'],
        [e(3, -1, 2), e(6, -2, 4), 'infinite'],
        [e(3, -1, 2), e(6, -2, 5), 'none'],
        [e(2, -1, 3), e(4, -2, 5), 'none'],
        [e(2, -3, 1), e(4, -6, 2), 'infinite'],
        [e(1, 2, 3), e(2, 4, 5), 'none'],
        [e(2, 3, 2), e(4, 6, 1), 'none'],
        [e(3, 6, 6), e(1, 2, 2), 'infinite'],
        [e(3, 6, 9), e(2, 4, 6), 'infinite'],
        [e(1, 1, 4), e(2, 2, 5), 'none'],
        [e(-1, 1, 5), e(1, -1, -5), 'infinite']
    ]
    for (const [first, second, kind] of cases) assert.equal(classify(first, second), kind, `${JSON.stringify(first)} ${JSON.stringify(second)}`)
})

test('sistemak 4. DBH ak: every answer appears in its worked explanation or solution', () => {
    const shows = (text: string, value: FractionValue) => {
        const plain = written(value)
        const asFraction = `\\frac{${Math.abs(value.numerator)}}{${value.denominator}}`
        const minus = value.numerator < 0 ? [`-${asFraction}`] : [asFraction]
        return [plain, ...minus].some((candidate) => text.replace(/\\,/g, '').includes(candidate))
    }
    for (const item of [...practice, ...challenges]) assert.ok(shows(item.explanation.es, item.expected), `${item.id}: ${written(item.expected)}`)
    for (const section of bank) for (const item of section.items) if (item.answer) assert.ok(shows(item.solution.es, item.answer.expected), `bank ${item.id}`)
})
