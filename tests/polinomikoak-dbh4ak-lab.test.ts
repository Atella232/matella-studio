import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { lineChallenges, slopeChallenges } from '../src/pages/dbh2-funtzioak-v2/lab/labTools.ts'
import { interceptsChallenges } from '../src/pages/dbh4-aplikatuak-funtzioak/lab/labTools.ts'
import { hyperbolaChallenges, parabolaChallenges, pointSlopeChallenges } from '../src/pages/dbh4-aplikatuak-grafikoa/lab/labTools.ts'
import {
    absoluteAt,
    absoluteChallenges,
    absoluteZeros,
    fitChallenges,
    fitExpanded,
    fitVertex,
    foldedVertex,
    initialAbsoluteState,
    initialFitState,
    initialRationalState,
    initialSecantState,
    polynomialAkLabChallengeIds,
    polynomialAkLabToolForTopic,
    polynomialAkLabTools,
    rationalAt,
    rationalChallenges,
    rationalK,
    rationalZero,
    secantChallenges,
    secantDelta,
    secantKind,
    secantXs,
    setAbsolute,
    setFit,
    setRational,
    setSecant,
    type AbsoluteState,
    type FitState,
    type RationalState,
    type SecantState
} from '../src/pages/dbh4-akademikoak-polinomikoak/lab/labTools.ts'

const topics = ['line-kinds', 'slope', 'line-equation', 'parabola-a', 'vertex', 'parabola-cuts', 'vertex-form', 'parabola-from', 'line-parabola', 'absolute-linear', 'absolute-pieces', 'absolute-quadratic', 'inverse', 'hyperbola-shift', 'rational-form']
const stages = ['lines', 'parabolas', 'shifts', 'absolute', 'rational']
const solvedIds = <State>(challenges: Array<{ id: number; isSolved: (state: State) => boolean }>, state: State) => challenges.filter((challenge) => challenge.isSolved(state)).map((challenge) => challenge.id)
/** Each challenge is solved by its own solution, and the starting state solves none */
function checkChallenges<State>(challenges: Array<{ id: number; isSolved: (state: State) => boolean }>, solutions: State[], start: State) {
    assert.equal(solutions.length, challenges.length)
    solutions.forEach((state, index) => assert.ok(solvedIds(challenges, state).includes(challenges[index].id), `${challenges[index].id}`))
    assert.deepEqual(solvedIds(challenges, start), [])
}

test('polinomikoak 4. DBH ak lab: tools, topics and challenge ids', () => {
    assert.equal(polynomialAkLabTools.length, 10)
    for (const tool of polynomialAkLabTools) {
        assert.ok(stages.includes(tool.stage), tool.id)
        assert.ok(topics.includes(tool.lessonTopic), tool.id)
        assert.ok(!tool.observe.es.includes('$'), tool.id)
        for (const language of ['eu', 'es', 'en', 'ar'] as const) assert.ok(tool.title[language] && tool.observe[language], `${tool.id} ${language}`)
    }
    for (const stage of stages) assert.ok(polynomialAkLabTools.some((tool) => tool.stage === stage), stage)
    for (const topic of topics) assert.ok(polynomialAkLabTools.some((tool) => tool.id === polynomialAkLabToolForTopic[topic]), topic)
    assert.equal(new Set(polynomialAkLabChallengeIds).size, polynomialAkLabChallengeIds.length)
    for (const reused of [lineChallenges, slopeChallenges, pointSlopeChallenges, parabolaChallenges, interceptsChallenges, hyperbolaChallenges]) {
        assert.ok(reused.every((challenge) => polynomialAkLabChallengeIds.includes(challenge.id)))
    }
    for (const challenges of [fitChallenges, secantChallenges, absoluteChallenges, rationalChallenges] as Array<Array<{ id: number; prompt: Record<string, string>; hint: Record<string, string> }>>) {
        for (const challenge of challenges) {
            assert.ok(challenge.id >= 77000 && challenge.id < 78000, `${challenge.id}`)
            assert.ok(!challenge.prompt.ar.includes('{,}') && !challenge.hint.ar.includes('{,}'), `${challenge.id}`)
            for (const language of ['eu', 'es', 'en', 'ar']) for (const text of [challenge.prompt[language], challenge.hint[language]]) for (const [, formula] of text.matchAll(/\$([^$]+)\$/g)) katex.renderToString(formulaFor(language, formula), { throwOnError: true })
        }
    }
})

test('polinomikoak 4. DBH ak lab: a parabola from its roots', () => {
    assert.deepEqual(fitExpanded({ a: 1, r: -1, t: 3 }), { a: 1, b: -2, c: -3 })
    assert.deepEqual(fitVertex({ a: 1, r: -1, t: 3 }), [1, -4])
    assert.deepEqual(fitVertex({ a: -2, r: 2, t: 4 }), [3, 2])
    // a never becomes 0: one step down from 0,5 is −0,5
    assert.equal(setFit({ a: 0.5, r: 0, t: 0 }, { a: 0 }).a, -0.5)
    assert.equal(setFit(initialFitState, { a: 9 }).a, 3)
    assert.equal(setFit(initialFitState, { r: -9 }).r, -5)
    const solutions: FitState[] = [{ a: 1, r: 3, t: -1 }, { a: -2, r: -1, t: 3 }, { a: -2, r: 4, t: 2 }, { a: 0.5, r: -2, t: -2 }, { a: 1, r: -3, t: 2 }]
    checkChallenges(fitChallenges, solutions, initialFitState)
})

test('polinomikoak 4. DBH ak lab: a line against y = x² − 1', () => {
    assert.deepEqual(secantXs({ m: 1, n: 1 }), [-1, 2])
    assert.equal(secantDelta({ m: 1, n: 1 }), 9)
    assert.equal(secantKind({ m: 0, n: -1 }), 'tangent')
    assert.equal(secantKind({ m: 2, n: -2 }), 'tangent')
    assert.deepEqual(secantXs({ m: 2, n: -2 }), [1])
    assert.equal(secantKind({ m: 1, n: -2 }), 'exterior')
    assert.deepEqual(setSecant(initialSecantState, { m: 9, n: -9 }), { m: 4, n: -6 })
    const solutions: SecantState[] = [{ m: 1, n: 1 }, { m: 0, n: -1 }, { m: 2, n: -2 }, { m: 1, n: -3 }, { m: 4, n: -4 }]
    checkChallenges(secantChallenges, solutions, initialSecantState)
})

test('polinomikoak 4. DBH ak lab: folding an absolute value', () => {
    const v: AbsoluteState = { ...initialAbsoluteState, kind: 'line', m: 2, n: -4 }
    assert.deepEqual(absoluteZeros(v), [2])
    assert.equal(absoluteAt(v, 0), 4)
    assert.equal(absoluteAt(v, -1), 6)
    const p: AbsoluteState = { ...initialAbsoluteState, kind: 'parabola', b: -2, c: -3 }
    assert.deepEqual(absoluteZeros(p), [-1, 3])
    assert.deepEqual(foldedVertex(p), [1, 4])
    assert.deepEqual(absoluteZeros({ ...p, b: 0, c: 2 }), [])
    // m never becomes 0
    assert.equal(setAbsolute({ ...v, m: 1 }, { m: 0 }).m, -1)
    const solutions: AbsoluteState[] = [
        { ...initialAbsoluteState, kind: 'line', m: -1, n: 3 },
        { ...initialAbsoluteState, kind: 'line', m: -2, n: 4 },
        { ...initialAbsoluteState, kind: 'parabola', b: 0, c: -4 },
        { ...initialAbsoluteState, kind: 'parabola', b: -2, c: -3 },
        { ...initialAbsoluteState, kind: 'parabola', b: -4, c: 4 }
    ]
    checkChallenges(absoluteChallenges, solutions, initialAbsoluteState)
})

test('polinomikoak 4. DBH ak lab: (ax + b)/(x + d)', () => {
    const state: RationalState = { a: 2, b: 1, d: -1 }
    assert.equal(rationalK(state), 3)
    assert.equal(rationalAt(state, 2), 5)
    assert.equal(rationalAt(state, 1), null)
    assert.equal(rationalZero(state), -0.5)
    // k = 0: a line with a hole, no intercept from the numerator
    assert.equal(rationalK({ a: 2, b: 4, d: 2 }), 0)
    assert.equal(rationalZero({ a: 2, b: 4, d: 2 }), null)
    assert.deepEqual(setRational(initialRationalState, { a: 9, d: -9 }), { a: 4, b: 1, d: -4 })
    const solutions: RationalState[] = [{ a: 2, b: 0, d: -1 }, { a: 2, b: 1, d: -1 }, { a: 1, b: -3, d: 1 }, { a: 1, b: 0, d: 2 }, { a: 2, b: 4, d: 2 }]
    checkChallenges(rationalChallenges, solutions, initialRationalState)
})
