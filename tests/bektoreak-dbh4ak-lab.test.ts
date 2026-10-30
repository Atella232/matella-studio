import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import katex from 'katex'
import {
    alignChallenges,
    bisectorChallenges,
    bisectorLine,
    circleChallenges,
    combination,
    combinationChallenges,
    continuousText,
    crossing,
    explicitText,
    formsChallenges,
    generalText,
    initialAlignState,
    initialBisectorState,
    initialCircleState,
    initialCombinationState,
    initialFormsState,
    initialParametricState,
    initialSegmentState,
    initialSlopeState,
    initialTwoLinesState,
    initialVectorState,
    lineFrom,
    midpoint,
    onLine,
    parametricChallenges,
    parametricText,
    positionOf,
    sameLine,
    segmentChallenges,
    setForms,
    setParametric,
    slopeChallenges,
    SLOPES,
    twoLinesChallenges,
    vectorChallenges,
    vectorsLabChallengeIds,
    vectorsLabToolForTopic,
    vectorsLabTools,
    type AlignState,
    type BisectorState,
    type CircleState,
    type CombinationState,
    type FormsState,
    type ParametricState,
    type Point,
    type SegmentState,
    type SlopeState,
    type TwoLinesState,
    type VectorState
} from '../src/pages/dbh4-akademikoak-bektoreak/lab/labTools.ts'

const stages = ['vectors', 'points', 'equations', 'positions', 'applications']
/** The lessons of lessons.tsx and their stages (node cannot load .tsx files) */
const topics = [
    ['vector-coordinates', 'vectors'], ['vector-operations', 'vectors'], ['parallel-vectors', 'vectors'],
    ['distance', 'points'], ['midpoint', 'points'], ['collinear', 'points'],
    ['parametric', 'equations'], ['continuous', 'equations'], ['general-explicit', 'equations'],
    ['slope', 'positions'], ['parallel-perpendicular', 'positions'], ['relative-position', 'positions'],
    ['bisector', 'applications'], ['circle', 'applications'], ['polygons', 'applications']
].map(([id, stage]) => ({ id, stage }))
const allChallenges = [vectorChallenges, combinationChallenges, segmentChallenges, alignChallenges, parametricChallenges, formsChallenges, slopeChallenges, twoLinesChallenges, bisectorChallenges, circleChallenges] as const
const range = (min: number, max: number) => Array.from({ length: max - min + 1 }, (_, index) => min + index)
const points = (limit: number): Point[] => range(-limit, limit).flatMap((x) => range(-limit, limit).map((y): Point => [x, y]))
const directions = points(6).filter(([x, y]) => x !== 0 || y !== 0)

/** Every state each tool can reach, to check that each challenge can be solved */
const P6 = points(6)
const vectorStates: VectorState[] = P6.flatMap((a) => P6.map((b) => ({ a, b })))
const combinationStates: CombinationState[] = range(-3, 3).flatMap((a) => range(-3, 3).map((b) => ({ a, b })))
const segmentStates: SegmentState[] = vectorStates
const alignStates: AlignState[] = P6.map((c) => ({ c }))
const parametricStates: ParametricState[] = P6.flatMap((p) => directions.flatMap((d) => range(-3, 3).map((t) => ({ p, d, t }))))
const formsStates: FormsState[] = P6.flatMap((p) => directions.map((d) => ({ p, d })))
const slopeStates: SlopeState[] = vectorStates
const twoLinesStates: TwoLinesState[] = range(0, SLOPES.length - 1).flatMap((slope) => range(-6, 6).map((n) => ({ slope, n })))
const bisectorStates: BisectorState[] = vectorStates
const circleStates: CircleState[] = points(5).flatMap((center) => range(1, 7).flatMap((r) => points(7).map((p) => ({ center, r, p }))))

test('bektoreak 4. DBH ak lab: tools, topics and challenge ids', () => {
    const source = readFileSync(new URL('../src/pages/dbh4-akademikoak-bektoreak/lessons.tsx', import.meta.url), 'utf8')
    assert.deepEqual([...source.matchAll(/id: '([a-z-]+)',\s+stage: '([a-z-]+)'/g)].map(([, id, stage]) => ({ id, stage })), topics)
    assert.equal(vectorsLabTools.length, 10)
    for (const tool of vectorsLabTools) {
        assert.ok(stages.includes(tool.stage), tool.id)
        assert.equal(topics.find((topic) => topic.id === tool.lessonTopic)?.stage, tool.stage, tool.id)
        for (const language of ['eu', 'es', 'en', 'ar'] as const) assert.ok(!tool.observe[language].includes('$') && tool.observe[language].length > 0, tool.id)
    }
    for (const stage of stages) assert.equal(vectorsLabTools.filter((tool) => tool.stage === stage).length, 2, stage)
    for (const topic of topics) {
        const tool = vectorsLabTools.find((item) => item.id === vectorsLabToolForTopic[topic.id])
        assert.ok(tool, topic.id)
        assert.equal(tool.stage, topic.stage, topic.id)
    }
    assert.equal(vectorsLabChallengeIds.length, 40)
    assert.equal(new Set(vectorsLabChallengeIds).size, vectorsLabChallengeIds.length)
    for (const challenges of allChallenges) {
        for (const challenge of challenges) {
            assert.ok(challenge.id >= 73001 && challenge.id <= 73999, `${challenge.id}`)
            for (const language of ['eu', 'es', 'en', 'ar'] as const) {
                for (const text of [challenge.prompt[language], challenge.hint[language]]) {
                    assert.ok(text.length > 0, `${challenge.id}`)
                    for (const [, formula] of text.matchAll(/\$([^$]+)\$/g)) katex.renderToString(formulaFor(language, formula), { throwOnError: true })
                }
            }
            assert.ok(!challenge.prompt.ar.includes('{,}') && !challenge.hint.ar.includes('{,}'), `${challenge.id}`)
        }
    }
})

test('bektoreak 4. DBH ak lab: every challenge can be solved and the start solves none', () => {
    const check = <State>(challenges: ReadonlyArray<{ id: number; isSolved: (state: State) => boolean }>, states: State[], start: State) => {
        for (const challenge of challenges) assert.ok(states.some((state) => challenge.isSolved(state)), `${challenge.id}`)
        assert.deepEqual(challenges.filter((challenge) => challenge.isSolved(start)).map((challenge) => challenge.id), [])
        assert.ok(states.some((state) => JSON.stringify(state) === JSON.stringify(start)), 'the start is a reachable state')
    }
    check(vectorChallenges, vectorStates, initialVectorState)
    check(combinationChallenges, combinationStates, initialCombinationState)
    check(segmentChallenges, segmentStates, initialSegmentState)
    check(alignChallenges, alignStates, initialAlignState)
    check(parametricChallenges, parametricStates, initialParametricState)
    check(formsChallenges, formsStates, initialFormsState)
    check(slopeChallenges, slopeStates, initialSlopeState)
    check(twoLinesChallenges, twoLinesStates, initialTwoLinesState)
    check(bisectorChallenges, bisectorStates, initialBisectorState)
    check(circleChallenges, circleStates, initialCircleState)
})

test('bektoreak 4. DBH ak lab: lines and their equations', () => {
    // The line of the lesson: P(2, −1), d = (4, 6)
    const line = lineFrom([2, -1], [4, 6])
    assert.deepEqual(line, { A: 3, B: -2, C: -8 })
    assert.equal(generalText(line), '3x − 2y − 8 = 0')
    assert.equal(explicitText(line), 'y = 3/2·x − 4')
    assert.equal(continuousText([2, -1], [4, 6]), '(x − 2) / 4 = (y + 1) / 6')
    assert.equal(parametricText([2, -1], [4, 6]), 'x = 2 + 4t,  y = −1 + 6t')
    assert.equal(continuousText([0, 3], [1, 0]), null)
    assert.equal(explicitText(lineFrom([-3, 0], [0, 2])), 'x = −3')
    assert.equal(explicitText(lineFrom([0, 3], [5, 0])), 'y = 3')
    assert.equal(explicitText(lineFrom([0, 0], [1, -1])), 'y = −x')
    assert.ok(sameLine(lineFrom([0, 2], [3, 2]), lineFrom([-3, 0], [-6, -4])))
    // Every line passes through its point and its point plus the direction
    for (const p of points(3)) for (const d of directions.slice(0, 60)) {
        const l = lineFrom(p, d)
        assert.ok(onLine(l, p) && onLine(l, [p[0] + d[0], p[1] + d[1]]))
    }
    // The direction never becomes (0, 0)
    assert.deepEqual(setParametric({ p: [0, 0], d: [1, 0], t: 0 }, { d: [0, 0] }).d, [-1, 0])
    assert.deepEqual(setForms({ p: [0, 0], d: [0, 1] }, { d: [0, 0] }).d, [0, -1])
})

test('bektoreak 4. DBH ak lab: combinations, midpoints, crossings and bisectors', () => {
    assert.deepEqual(combination({ a: 2, b: -1 }), [5, 0])
    assert.deepEqual(midpoint({ a: [2, -3], b: [6, 5] }).map((value) => value.numerator / value.denominator), [4, 1])
    assert.equal(positionOf({ slope: SLOPES.findIndex((m) => m.numerator === 2 && m.denominator === 1), n: -1 }), 'coincident')
    const secant = { slope: SLOPES.findIndex((m) => m.numerator === -1 && m.denominator === 1), n: 2 }
    assert.deepEqual(crossing(secant), [1, 1])
    // The bisector of the lesson: A(1, 1), B(5, 3) → y = −2x + 8; its points are equidistant from A and B
    const bisector = bisectorLine({ a: [1, 1], b: [5, 3] })!
    assert.ok(sameLine(bisector, { A: 2, B: 1, C: -8 }))
    for (const state of bisectorStates.filter((_, index) => index % 97 === 0)) {
        const l = bisectorLine(state)
        if (!l) continue
        const m: Point = [(state.a[0] + state.b[0]) / 2, (state.a[1] + state.b[1]) / 2]
        assert.ok(Math.abs(l.A * m[0] + l.B * m[1] + l.C) < 1e-9, JSON.stringify(state))
    }
})
