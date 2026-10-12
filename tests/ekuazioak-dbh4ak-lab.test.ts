import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { quadraticChallenges } from '../src/pages/dbh2-ekuazioak-v2/lab/labTools.ts'
import { radicalChallenges } from '../src/pages/dbh4-aplikatuak-ekuazioak/lab/labTools.ts'
import {
    biquadraticChallenges,
    biquadraticLatex,
    biquadraticSolutions,
    equationsInequalitiesLabChallengeIds,
    equationsInequalitiesLabToolForTopic,
    equationsInequalitiesLabTools,
    exponentialChallenges,
    exponents,
    graphicChallenges,
    graphicCrossings,
    holds,
    initialBiquadraticState,
    initialExponentialState,
    initialGraphicState,
    initialLinearState,
    initialRootsState,
    initialSignState,
    initialSystemState,
    initialTariffsState,
    intersect,
    linearChallenges,
    linearSolution,
    linearSpan,
    RELATIONS,
    resolventLatex,
    rootsChallenges,
    rootsEquation,
    setLatex,
    setLinear,
    signChallenges,
    signSolution,
    signValue,
    span,
    spanContains,
    systemChallenges,
    systemSolution,
    tariffCross,
    tariffsChallenges,
    type BiquadraticState,
    type ExponentialState,
    type GraphicState,
    type LinearState,
    type RootsState,
    type SignState,
    type SystemState,
    type TariffsState
} from '../src/pages/dbh4-akademikoak-ekuazioak/lab/labTools.ts'

const topics = ['quadratic-formula', 'roots-relations', 'quadratic-problems', 'biquadratic', 'factored', 'rational', 'radical', 'exponential', 'logarithmic', 'inequalities', 'linear-inequality', 'inequality-problems', 'quadratic-inequality', 'graphic-inequality', 'inequality-systems']
const stages = ['quadratic', 'other', 'exponential', 'inequalities', 'quadratic-inequalities']
const solvedIds = <State>(challenges: Array<{ id: number; isSolved: (state: State) => boolean }>, state: State) => challenges.filter((challenge) => challenge.isSolved(state)).map((challenge) => challenge.id)
/** Each challenge is solved by its own solution, and the starting state solves none */
function checkChallenges<State>(challenges: Array<{ id: number; isSolved: (state: State) => boolean }>, solutions: State[], start: State) {
    assert.equal(solutions.length, challenges.length)
    solutions.forEach((state, index) => assert.ok(solvedIds(challenges, state).includes(challenges[index].id), `${challenges[index].id}`))
    assert.deepEqual(solvedIds(challenges, start), [])
}
const inSet = (spans: ReturnType<typeof signSolution>, x: number) => spans.some((s) => spanContains(s, x))
const renders = (latex: string) => katex.renderToString(latex, { throwOnError: true })
/** Every x from −7 to 7 in quarters */
const samples = Array.from({ length: 57 }, (_, k) => -7 + k / 4)

test('ekuazioak 4. DBH ak lab: tools, topics and challenge ids', () => {
    assert.equal(equationsInequalitiesLabTools.length, 10)
    for (const tool of equationsInequalitiesLabTools) {
        assert.ok(stages.includes(tool.stage), tool.id)
        assert.ok(topics.includes(tool.lessonTopic), tool.id)
        for (const language of ['eu', 'es', 'ar'] as const) assert.ok(!tool.observe[language].includes('$'), tool.id)
    }
    for (const stage of stages) assert.ok(equationsInequalitiesLabTools.some((tool) => tool.stage === stage), stage)
    for (const topic of topics) assert.ok(equationsInequalitiesLabTools.some((tool) => tool.id === equationsInequalitiesLabToolForTopic[topic]), topic)
    assert.equal(new Set(equationsInequalitiesLabChallengeIds).size, equationsInequalitiesLabChallengeIds.length)
    for (const borrowed of [quadraticChallenges, radicalChallenges]) assert.ok(borrowed.every((challenge) => equationsInequalitiesLabChallengeIds.includes(challenge.id)))
    for (const challenges of [rootsChallenges, biquadraticChallenges, exponentialChallenges, linearChallenges, tariffsChallenges, signChallenges, graphicChallenges, systemChallenges] as Array<Array<{ id: number; prompt: Record<string, string>; hint: Record<string, string> }>>) {
        for (const challenge of challenges) {
            assert.ok(challenge.id >= 65000 && challenge.id < 66000, `${challenge.id}`)
            for (const language of ['eu', 'es', 'ar']) {
                for (const text of [challenge.prompt[language], challenge.hint[language]]) {
                    for (const [, formula] of text.matchAll(/\$([^$]+)\$/g)) {
                        renders(formula)
                        assert.ok(!/[؀-ۿ]/.test(formula), `${challenge.id} ${formula}`)
                    }
                }
            }
        }
    }
})

test('ekuazioak 4. DBH ak lab: sets of real numbers', () => {
    assert.equal(setLatex([span(null, 3, false, true), span(5, 5, true, true)]), '(-\\infty,\\,3]\\cup \\{5\\}')
    assert.equal(setLatex([span(null, null)]), '\\mathbb{R}')
    assert.equal(setLatex([]), '\\varnothing')
    assert.equal(setLatex([span(-0.5, 1.5)]), '(-\\frac{1}{2},\\,\\frac{3}{2})')
    assert.deepEqual(intersect(span(0, null, true), span(null, 0, false, true)), span(0, 0, true, true))
    assert.equal(intersect(span(0, null), span(null, 0, false, true)), null)
    assert.deepEqual(intersect(span(1, null, true), span(1, null)), span(1, null))
    // The intersection holds exactly the numbers in both
    const ends = [-2, 0, 2]
    const spans = ends.flatMap((from) => ends.flatMap((to) => [true, false].flatMap((closedFrom) => [true, false].map((closedTo) => span(from, to, closedFrom, closedTo))))).concat([span(null, 1, false, true), span(1, null), span(null, null)])
    for (const a of spans) for (const b of spans) {
        const both = intersect(a, b)
        for (const x of samples) assert.equal(both ? spanContains(both, x) : false, spanContains(a, x) && spanContains(b, x), `${JSON.stringify(a)} ${JSON.stringify(b)} ${x}`)
    }
})

test('ekuazioak 4. DBH ak lab: from the roots to the equation', () => {
    assert.deepEqual(rootsEquation({ a: 2, r1: 3, r2: -2 }), [2, -2, -12])
    for (let a = 1; a <= 3; a += 1) for (let r1 = -6; r1 <= 6; r1 += 1) for (let r2 = -6; r2 <= 6; r2 += 1) {
        const [p, q, c] = rootsEquation({ a, r1, r2 })
        for (const root of [r1, r2]) assert.equal(p * root * root + q * root + c, 0)
    }
    const solutions: RootsState[] = [{ a: 1, r1: 2, r2: 3 }, { a: 1, r1: 4, r2: -4 }, { a: 1, r1: 3, r2: 3 }, { a: 2, r1: 3, r2: -2 }]
    checkChallenges(rootsChallenges, solutions, initialRootsState)
})

test('ekuazioak 4. DBH ak lab: biquadratics', () => {
    assert.equal(biquadraticLatex({ t1: 4, t2: 9 }), 'x^{4}-13x^{2}+36')
    assert.equal(resolventLatex({ t1: 4, t2: 9 }), 't^{2}-13t+36')
    assert.deepEqual(biquadraticSolutions({ t1: 4, t2: 9 }), [-3, -2, 2, 3])
    assert.deepEqual(biquadraticSolutions({ t1: 0, t2: 1 }), [-1, 0, 1])
    assert.deepEqual(biquadraticSolutions({ t1: 4, t2: 4 }), [-2, 2])
    for (let t1 = -4; t1 <= 9; t1 += 1) for (let t2 = -4; t2 <= 9; t2 += 1) {
        for (const x of biquadraticSolutions({ t1, t2 })) assert.ok(Math.abs(x ** 4 - (t1 + t2) * x * x + t1 * t2) < 1e-9)
        renders(`${biquadraticLatex({ t1, t2 })}=0\\ \\to\\ ${resolventLatex({ t1, t2 })}=0`)
    }
    const solutions: BiquadraticState[] = [{ t1: 4, t2: 9 }, { t1: 4, t2: -1 }, { t1: 0, t2: 4 }, { t1: -1, t2: -2 }]
    checkChallenges(biquadraticChallenges, solutions, initialBiquadraticState)
})

test('ekuazioak 4. DBH ak lab: exponentials', () => {
    assert.deepEqual(exponents({ equation: 3, x: 3 }), [8, 8])
    // Each equation has exactly one solution in the stepper range
    for (let equation = 0; equation < 4; equation += 1) {
        const hits = Array.from({ length: 11 }, (_, k) => k - 4).filter((x) => { const [left, right] = exponents({ equation, x }); return left === right })
        assert.equal(hits.length, 1, `${equation}`)
    }
    const solutions: ExponentialState[] = [{ equation: 0, x: 3 }, { equation: 1, x: 2 }, { equation: 2, x: 0 }, { equation: 3, x: 3 }]
    checkChallenges(exponentialChallenges, solutions, initialExponentialState)
})

test('ekuazioak 4. DBH ak lab: a linear inequality', () => {
    assert.deepEqual(linearSolution({ a: -2, b: 4, c: 10, relation: '>' }), { relation: '<', end: { numerator: -3, denominator: 1 }, flipped: true })
    // a never stays at 0
    assert.equal(setLinear({ ...initialLinearState, a: -1 }, { a: 0 }).a, 1)
    assert.equal(setLinear({ ...initialLinearState, a: 1 }, { a: 0 }).a, -1)
    // The solution holds exactly the numbers that satisfy the inequality
    for (let a = -5; a <= 5; a += 1) for (let b = -9; b <= 9; b += 3) for (let c = -9; c <= 12; c += 3) for (const relation of RELATIONS) {
        if (a === 0) continue
        const state: LinearState = { a, b, c, relation, probe: 0 }
        for (const x of samples) assert.equal(spanContains(linearSpan(state), x), holds(a * x + b, relation, c), `${a} ${b} ${c} ${relation} ${x}`)
    }
    const solutions: LinearState[] = [
        { a: -2, b: 4, c: 10, relation: '>', probe: 0 },
        { a: -1, b: 0, c: -2, relation: '≤', probe: 0 },
        { a: 1, b: 0, c: -1, relation: '≤', probe: -1 },
        { a: 2, b: 0, c: 3, relation: '<', probe: 0 }
    ]
    checkChallenges(linearChallenges, solutions, initialLinearState)
})

test('ekuazioak 4. DBH ak lab: two tariffs', () => {
    assert.deepEqual(tariffCross(0), { numerator: 20, denominator: 3 })
    assert.deepEqual(tariffCross(2), { numerator: 9, denominator: 1 })
    const solutions: TariffsState[] = [{ scenario: 0, x: 7 }, { scenario: 1, x: 9 }, { scenario: 2, x: 9 }, { scenario: 2, x: 10 }]
    checkChallenges(tariffsChallenges, solutions, initialTariffsState)
})

test('ekuazioak 4. DBH ak lab: the sign of a parabola', () => {
    assert.equal(setLatex(signSolution({ a: 1, r1: 3, r2: -1, relation: '≤' })), '[-1,\\,3]')
    assert.equal(setLatex(signSolution({ a: -1, r1: 2, r2: 2, relation: '<' })), '(-\\infty,\\,2)\\cup (2,\\,+\\infty)')
    // The solution holds exactly the numbers that satisfy the inequality
    for (const a of [1, -1] as const) for (let r1 = -5; r1 <= 5; r1 += 1) for (let r2 = -5; r2 <= 5; r2 += 1) for (const relation of RELATIONS) {
        const state: SignState = { a, r1, r2, relation }
        const solution = signSolution(state)
        renders(setLatex(solution))
        for (const x of samples) assert.equal(inSet(solution, x), holds(signValue(state, x), relation, 0), `${a} ${r1} ${r2} ${relation} ${x}`)
    }
    const solutions: SignState[] = [{ a: 1, r1: -1, r2: 3, relation: '≤' }, { a: 1, r1: -2, r2: 2, relation: '>' }, { a: 1, r1: 0, r2: 0, relation: '<' }, { a: 1, r1: 1, r2: 1, relation: '≤' }]
    checkChallenges(signChallenges, solutions, initialSignState)
})

test('ekuazioak 4. DBH ak lab: parabola and line', () => {
    assert.deepEqual(graphicCrossings({ m: 2, n: 3 }), [-1, 3])
    assert.deepEqual(graphicCrossings({ m: 2, n: -1 }), [1])
    assert.deepEqual(graphicCrossings({ m: 0, n: -1 }), [])
    for (let m = -4; m <= 4; m += 1) for (let n = -4; n <= 9; n += 1) {
        for (const x of graphicCrossings({ m, n })) assert.ok(Math.abs(x * x - m * x - n) < 1e-9)
    }
    const solutions: GraphicState[] = [{ m: 0, n: 4 }, { m: 2, n: 3 }, { m: 2, n: -1 }, { m: 2, n: -2 }]
    checkChallenges(graphicChallenges, solutions, initialGraphicState)
})

test('ekuazioak 4. DBH ak lab: two inequalities at once', () => {
    assert.equal(setLatex(systemSolution({ p: -1, first: '≥', q: 4, second: '<' })), '[-1,\\,4)')
    assert.equal(setLatex(systemSolution({ p: 0, first: '<', q: 2, second: '>' })), '\\varnothing')
    const solutions: SystemState[] = [
        { p: -1, first: '≥', q: 4, second: '<' },
        { p: 0, first: '<', q: 2, second: '>' },
        { p: 2, first: '≥', q: 2, second: '≤' },
        { p: 3, first: '>', q: 1, second: '≥' }
    ]
    checkChallenges(systemChallenges, solutions, initialSystemState)
})
