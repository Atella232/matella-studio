import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import {
    areasSimilarityLabChallengeIds,
    areasSimilarityLabToolForTopic,
    areasSimilarityLabTools,
    decimalText,
    FRUSTUM_HEIGHT_MAX,
    FRUSTUM_RADIUS_MAX,
    frustumApex,
    frustumChallenges,
    frustumHundredths,
    frustumThirds,
    initialFrustumState,
    initialModelState,
    initialProjectionsState,
    initialSegmentState,
    MODEL_SCALES,
    modelChallenges,
    modelReal,
    PROJECTION_MAX,
    projectionLengths,
    projectionsChallenges,
    projectionSquares,
    segmentArea,
    segmentChallenges,
    segmentSector,
    segmentTriangle,
    setFrustum,
    setModel,
    setProjections,
    setSegment,
    smallConeThirds,
    type FrustumState,
    type ModelState,
    type ProjectionsState,
    type SegmentState
} from '../src/pages/dbh4-akademikoak-areak/lab/labTools.ts'

const topics = ['regular-polygons', 'circle-parts', 'segments', 'polyhedra-area', 'round-area', 'sphere-area', 'prism-cylinder-volume', 'pyramid-cone-volume', 'sphere-composite', 'thales', 'similar-triangles', 'right-theorems', 'ratio-powers', 'frustums', 'models']
const stages = ['plane-areas', 'solid-areas', 'volumes', 'similarity', 'ratios']
const newChallenges = [segmentChallenges, projectionsChallenges, frustumChallenges, modelChallenges] as const

/** Every state of a tool, to check that each challenge can be solved */
const segmentStates: SegmentState[] = Array.from({ length: 12 }, (_, r) => [30, 60, 90, 120, 150, 180].map((angle) => ({ r: r + 1, angle }))).flat()
const projectionStates: ProjectionsState[] = Array.from({ length: PROJECTION_MAX }, (_, m) => Array.from({ length: PROJECTION_MAX }, (_, n) => ({ m: m + 1, n: n + 1 }))).flat()
const frustumStates: FrustumState[] = []
for (let R = 2; R <= FRUSTUM_RADIUS_MAX; R += 1) for (let r = 1; r < R; r += 1) for (let h = 1; h <= FRUSTUM_HEIGHT_MAX; h += 1) frustumStates.push({ R, r, h })
const modelStates: ModelState[] = []
for (const n of MODEL_SCALES) for (let length = 1; length <= 12; length += 1) for (let width = 1; width <= 12; width += 1) for (let height = 1; height <= 12; height += 1) modelStates.push({ n, length, width, height })

test('areak 4. DBH ak lab: tools, topics and challenge ids', () => {
    assert.equal(areasSimilarityLabTools.length, 12)
    for (const tool of areasSimilarityLabTools) {
        assert.ok(stages.includes(tool.stage), tool.id)
        assert.ok(topics.includes(tool.lessonTopic), tool.id)
        for (const language of ['eu', 'es', 'en', 'ar'] as const) assert.ok(!tool.observe[language].includes('$') && tool.observe[language].length > 0, tool.id)
    }
    for (const stage of stages) assert.ok(areasSimilarityLabTools.some((tool) => tool.stage === stage), stage)
    for (const topic of topics) assert.ok(areasSimilarityLabTools.some((tool) => tool.id === areasSimilarityLabToolForTopic[topic]), topic)
    assert.equal(new Set(areasSimilarityLabChallengeIds).size, areasSimilarityLabChallengeIds.length)
    for (const challenges of newChallenges) {
        for (const challenge of challenges) {
            assert.ok(challenge.id >= 69101 && challenge.id <= 69499, `${challenge.id}`)
            assert.ok(!challenge.prompt.ar.includes('{,}') && !challenge.hint.ar.includes('{,}'), `${challenge.id}`)
            for (const language of ['eu', 'es', 'en', 'ar'] as const) {
                for (const text of [challenge.prompt[language], challenge.hint[language]]) for (const [, formula] of text.matchAll(/\$([^$]+)\$/g)) katex.renderToString(formulaFor(language, formula), { throwOnError: true })
            }
        }
    }
})

test('areak 4. DBH ak lab: every new challenge can be solved and the start solves none', () => {
    const check = <State>(challenges: ReadonlyArray<{ id: number; isSolved: (state: State) => boolean }>, states: State[], start: State) => {
        for (const challenge of challenges) assert.ok(states.some((state) => challenge.isSolved(state)), `${challenge.id}`)
        assert.deepEqual(challenges.filter((challenge) => challenge.isSolved(start)).map((challenge) => challenge.id), [])
    }
    check(segmentChallenges, segmentStates, initialSegmentState)
    check(projectionsChallenges, projectionStates, initialProjectionsState)
    check(frustumChallenges, frustumStates, initialFrustumState)
    check(modelChallenges, modelStates, initialModelState)
})

test('areak 4. DBH ak lab: the circular segment', () => {
    assert.deepEqual(setSegment(initialSegmentState, { r: 40, angle: 400 }), { r: 12, angle: 180 })
    assert.deepEqual(setSegment(initialSegmentState, { r: 0, angle: 0 }), { r: 1, angle: 30 })
    assert.deepEqual(setSegment(initialSegmentState, { angle: 100 }).angle, 90)
    // The lesson: 12,56 − 8 = 4,56; the 60° segment of radius 6: 18,84 − 15,59 ≈ 3,25
    assert.deepEqual(segmentArea({ r: 4, angle: 90 }), { value: 456, exact: true })
    assert.deepEqual(segmentSector({ r: 6, angle: 60 }), { value: 1884, exact: true })
    assert.deepEqual(segmentTriangle({ r: 6, angle: 60 }), { value: 1559, exact: false })
    assert.deepEqual(segmentArea({ r: 6, angle: 60 }), { value: 325, exact: false })
    assert.deepEqual(segmentArea({ r: 4, angle: 180 }), { value: 2512, exact: true })
    assert.deepEqual(segmentTriangle({ r: 2, angle: 30 }), { value: 100, exact: true })
    for (const state of segmentStates) assert.ok(segmentArea(state).value > 0, `${state.r} ${state.angle}`)
})

test('areak 4. DBH ak lab: the projections give the altitude and leg theorems', () => {
    assert.deepEqual(setProjections(initialProjectionsState, { m: 0, n: 99 }), { m: 1, n: 16 })
    assert.deepEqual(projectionSquares({ m: 9, n: 16 }), { a: 25, h: 144, b: 400, c: 225 })
    assert.deepEqual(projectionLengths({ m: 9, n: 16 }), { a: 25, h: { value: 1200, exact: true }, b: { value: 2000, exact: true }, c: { value: 1500, exact: true } })
    assert.deepEqual(projectionLengths({ m: 2, n: 8 }).b, { value: 894, exact: false })
    for (const state of projectionStates) {
        const { a, h, b, c } = projectionSquares(state)
        // Pythagoras in the whole triangle and in the two small ones
        assert.equal(b + c, a * a)
        assert.equal(h + state.n * state.n, b)
        assert.equal(h + state.m * state.m, c)
    }
    // Only 9 and 16 give two whole legs with different projections
    const whole = projectionStates.filter((state) => state.m !== state.n && Number.isInteger(Math.sqrt(projectionSquares(state).b)) && Number.isInteger(Math.sqrt(projectionSquares(state).c)))
    assert.deepEqual(whole, [{ m: 9, n: 16 }, { m: 16, n: 9 }])
})

test('areak 4. DBH ak lab: the frustum is the big cone minus the small one', () => {
    assert.deepEqual(setFrustum(initialFrustumState, { R: 1 }), { R: 2, r: 1, h: 3 })
    assert.deepEqual(setFrustum({ R: 6, r: 5, h: 4 }, { R: 3 }), { R: 3, r: 2, h: 4 })
    // The lesson and the bank: 84π = 263,76 with x = 4; 28π = 87,92 with x = 3
    assert.equal(frustumThirds({ R: 6, r: 3, h: 4 }), 252)
    assert.deepEqual(frustumApex({ R: 6, r: 3, h: 4 }), { numerator: 4, denominator: 1 })
    assert.deepEqual(frustumHundredths({ R: 6, r: 3, h: 4 }), { value: 26376, exact: true })
    assert.deepEqual(frustumHundredths({ R: 4, r: 2, h: 3 }), { value: 8792, exact: true })
    for (const state of frustumStates) {
        const x = frustumApex(state).numerator / frustumApex(state).denominator
        const big = state.R * state.R * (x + state.h)
        const small = smallConeThirds(state)
        assert.ok(Math.abs(big - small.numerator / small.denominator - frustumThirds(state)) < 1e-9, `${state.R} ${state.r} ${state.h}`)
        // Halving the radius leaves the small cone with 1/8 of the whole cone
        if (state.R === 2 * state.r) assert.ok(Math.abs((small.numerator / small.denominator) * 8 - big) < 1e-9)
    }
})

test('areak 4. DBH ak lab: the model at a scale', () => {
    assert.deepEqual(setModel(initialModelState, { n: 30, length: 0, width: 99 }), { n: 50, length: 1, width: 12, height: 2 })
    assert.deepEqual(setModel(initialModelState, { n: 200 }).n, 200)
    const room = modelReal({ n: 50, length: 10, width: 8, height: 5 })
    assert.deepEqual([room.length, room.width, room.height].map(decimalText), ['5', '4', '2,5'])
    assert.equal(decimalText(room.floor), '20')
    assert.equal(decimalText(room.volume), '50')
    assert.equal(decimalText(modelReal({ n: 10, length: 1, width: 1, height: 1 }).volume), '0,001')
    // Every real measure is an exact decimal
    for (const state of modelStates.filter((_, index) => index % 7 === 0)) {
        const real = modelReal(state)
        for (const value of Object.values(real)) assert.ok(!decimalText(value).includes('/'), `${state.n}`)
        const value = (fraction: { numerator: number; denominator: number }) => fraction.numerator / fraction.denominator
        assert.ok(Math.abs(value(real.volume) - value(real.length) * value(real.width) * value(real.height)) < 1e-9 * value(real.volume))
        assert.ok(Math.abs(value(real.floor) - value(real.length) * value(real.width)) < 1e-9 * value(real.floor))
    }
})
