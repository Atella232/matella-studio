import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { lineChallenges, slopeChallenges } from '../src/pages/dbh2-funtzioak-v2/lab/labTools.ts'
import { interceptsChallenges } from '../src/pages/dbh4-aplikatuak-funtzioak/lab/labTools.ts'
import {
    exponentialAt,
    exponentialChallenges,
    expandedOf,
    frameArea,
    frameChallenges,
    graphsLabChallengeIds,
    graphsLabToolForTopic,
    graphsLabTools,
    hyperbolaAt,
    hyperbolaChallenges,
    initialExponentialState,
    initialFrameState,
    initialHyperbolaState,
    initialParabolaState,
    initialPointSlopeState,
    initialRootState,
    initialTwoLinesState,
    interceptOf,
    linesRelation,
    parabolaChallenges,
    parabolaRoots,
    pointSlopeChallenges,
    rootAt,
    rootChallenges,
    setExponential,
    setFrame,
    setHyperbola,
    setParabola,
    setPointSlope,
    setRoot,
    setTwoLines,
    twoLinesChallenges,
    type ExponentialState,
    type FrameState,
    type HyperbolaState,
    type ParabolaState,
    type PointSlopeState,
    type RootState,
    type TwoLinesState
} from '../src/pages/dbh4-aplikatuak-grafikoa/lab/labTools.ts'

const topics = ['proportional', 'affine', 'linear-models', 'slope', 'line-equation', 'parallel', 'parabola', 'vertex', 'shifts', 'inverse', 'asymptotes', 'radical', 'exponential', 'growth', 'models']
const stages = ['linear', 'lines', 'quadratic', 'inverse', 'exponential']
const solvedIds = <State>(challenges: Array<{ id: number; isSolved: (state: State) => boolean }>, state: State) => challenges.filter((challenge) => challenge.isSolved(state)).map((challenge) => challenge.id)
/** Each challenge is solved by its own solution, and the starting state solves none */
function checkChallenges<State>(challenges: Array<{ id: number; isSolved: (state: State) => boolean }>, solutions: State[], start: State) {
    assert.equal(solutions.length, challenges.length)
    solutions.forEach((state, index) => assert.ok(solvedIds(challenges, state).includes(challenges[index].id), `${challenges[index].id}`))
    assert.deepEqual(solvedIds(challenges, start), [])
}

test('grafikoa 4. DBH ap lab: tools, topics and challenge ids', () => {
    assert.equal(graphsLabTools.length, 10)
    for (const tool of graphsLabTools) {
        assert.ok(stages.includes(tool.stage), tool.id)
        assert.ok(topics.includes(tool.lessonTopic), tool.id)
        assert.ok(!tool.observe.es.includes('$'), tool.id)
        assert.ok(!/\d,\d/.test(tool.observe.ar + tool.title.ar), tool.id)
    }
    for (const stage of stages) assert.ok(graphsLabTools.some((tool) => tool.stage === stage), stage)
    for (const topic of topics) assert.ok(graphsLabTools.some((tool) => tool.id === graphsLabToolForTopic[topic]), topic)
    assert.equal(new Set(graphsLabChallengeIds).size, graphsLabChallengeIds.length)
    for (const borrowed of [lineChallenges, slopeChallenges, interceptsChallenges]) assert.ok(borrowed.every((challenge) => graphsLabChallengeIds.includes(challenge.id)))
    for (const challenges of [pointSlopeChallenges, twoLinesChallenges, parabolaChallenges, hyperbolaChallenges, rootChallenges, exponentialChallenges, frameChallenges] as Array<Array<{ id: number; prompt: Record<string, string>; hint: Record<string, string> }>>) {
        for (const challenge of challenges) {
            assert.ok(!challenge.prompt.ar.includes('{,}') && !challenge.hint.ar.includes('{,}'), `${challenge.id}`)
            for (const language of ['eu', 'es', 'ar']) for (const text of [challenge.prompt[language], challenge.hint[language]]) for (const [, formula] of text.matchAll(/\$([^$]+)\$/g)) katex.renderToString(formula, { throwOnError: true })
        }
    }
})

test('grafikoa 4. DBH ap lab: a point and a slope', () => {
    assert.equal(interceptOf({ x0: 2, y0: -1, m: -2 }), 3)
    assert.deepEqual(setPointSlope(initialPointSlopeState, { m: 1.3 }), { x0: 0, y0: 0, m: 1.5 })
    assert.equal(setPointSlope(initialPointSlopeState, { x0: 9 }).x0, 5)
    const solutions: PointSlopeState[] = [{ x0: 2, y0: -1, m: -2 }, { x0: 3, y0: 7, m: 2 }, { x0: 0, y0: 2, m: 3 }, { x0: -2, y0: 1, m: 0.5 }]
    checkChallenges(pointSlopeChallenges, solutions, initialPointSlopeState)
})

test('grafikoa 4. DBH ap lab: two lines', () => {
    assert.deepEqual(linesRelation({ m: -1, n: 4 }), { kind: 'secant', at: [1, 3] })
    assert.deepEqual(linesRelation({ m: 2, n: 5 }), { kind: 'parallel' })
    assert.deepEqual(linesRelation({ m: 2, n: 1 }), { kind: 'same' })
    assert.equal(setTwoLines(initialTwoLinesState, { n: 20 }).n, 6)
    const solutions: TwoLinesState[] = [{ m: 2, n: -3 }, { m: -1, n: 4 }, { m: -2, n: 1 }, { m: 2, n: 1 }]
    checkChallenges(twoLinesChallenges, solutions, initialTwoLinesState)
})

test('grafikoa 4. DBH ap lab: the parabola and its vertex', () => {
    assert.deepEqual(expandedOf({ a: 1, p: 2, q: -1 }), { a: 1, b: -4, c: 3 })
    assert.deepEqual(parabolaRoots({ a: 1, p: 2, q: -1 }), [1, 3])
    assert.deepEqual(parabolaRoots({ a: 1, p: 3, q: 0 }), [3])
    assert.deepEqual(parabolaRoots({ a: 2, p: 0, q: 1 }), [])
    // a never becomes 0
    assert.equal(setParabola({ a: 0.5, p: 0, q: 0 }, { a: 0 }).a, -0.5)
    assert.equal(setParabola({ a: -0.5, p: 0, q: 0 }, { a: 0 }).a, 0.5)
    const solutions: ParabolaState[] = [{ a: 1, p: 2, q: -1 }, { a: -1, p: -1, q: 3 }, { a: 2, p: 0, q: 1 }, { a: 1, p: 3, q: 0 }, { a: -1, p: 1, q: 4 }]
    checkChallenges(parabolaChallenges, solutions, initialParabolaState)
})

test('grafikoa 4. DBH ap lab: the hyperbola', () => {
    assert.equal(hyperbolaAt({ k: 4, a: 1, b: 0 }, 3), 2)
    assert.equal(hyperbolaAt({ k: 4, a: 1, b: 0 }, 1), null)
    assert.equal(setHyperbola({ k: 1, a: 0, b: 0 }, { k: 0 }).k, -1)
    assert.equal(setHyperbola({ k: -1, a: 0, b: 0 }, { k: 0 }).k, 1)
    const solutions: HyperbolaState[] = [{ k: 6, a: 0, b: 0 }, { k: -3, a: 0, b: 0 }, { k: 1, a: 2, b: 1 }, { k: 4, a: 1, b: 0 }]
    checkChallenges(hyperbolaChallenges, solutions, initialHyperbolaState)
})

test('grafikoa 4. DBH ap lab: square roots', () => {
    assert.equal(rootAt({ s: 1, a: 2, b: 1 }, 6), 3)
    assert.equal(rootAt({ s: 1, a: 2, b: 1 }, 1), null)
    assert.equal(setRoot(initialRootState, { a: -9 }).a, -4)
    const solutions: RootState[] = [{ s: 1, a: -3, b: 0 }, { s: 1, a: 2, b: 1 }, { s: -1, a: 0, b: 2 }, { s: 1, a: 0, b: 0 }]
    checkChallenges(rootChallenges, solutions, initialRootState)
})

test('grafikoa 4. DBH ap lab: the exponential', () => {
    assert.equal(exponentialAt({ k: 2, base: 5, x: 3 }), 16)
    assert.equal(exponentialAt({ k: 4, base: 1, x: -2 }), 16)
    assert.deepEqual(setExponential(initialExponentialState, { k: 9, x: -8 }), { k: 5, base: 5, x: -3 })
    const solutions: ExponentialState[] = [{ k: 3, base: 3, x: 0 }, { k: 4, base: 1, x: 0 }, { k: 2, base: 5, x: 3 }, { k: 2, base: 4, x: 0 }, { k: 1, base: 2, x: 0 }]
    checkChallenges(exponentialChallenges, solutions, initialExponentialState)
})

test('grafikoa 4. DBH ap lab: the rectangle of fixed perimeter', () => {
    assert.equal(frameArea({ perimeter: 1, x: 5 }), 25)
    assert.deepEqual(setFrame(initialFrameState, { x: 20 }), { perimeter: 1, x: 9.5 })
    assert.deepEqual(setFrame({ perimeter: 2, x: 14 }, { perimeter: 0 }), { perimeter: 0, x: 5.5 })
    // The largest area among the half steps is the square
    for (const perimeter of [0, 1, 2]) {
        const states = Array.from({ length: 40 }, (_, index) => setFrame({ perimeter, x: 1 }, { x: 0.5 + index * 0.5 }))
        const best = states.reduce((top, state) => (frameArea(state) > frameArea(top) ? state : top))
        assert.equal(best.x * 4, [12, 20, 30][perimeter])
    }
    const solutions: FrameState[] = [{ perimeter: 1, x: 5 }, { perimeter: 1, x: 2 }, { perimeter: 0, x: 3 }, { perimeter: 2, x: 5 }]
    checkChallenges(frameChallenges, solutions, initialFrameState)
})
