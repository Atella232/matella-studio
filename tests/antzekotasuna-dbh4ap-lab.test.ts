import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { equals, fraction, toNumber } from '../src/features/unit-v2/math/fraction.ts'
import {
    divideChallenges,
    divideParts,
    growthChallenges,
    growthFactors,
    homothetyArea,
    homothetyChallenges,
    homothetyPerimeter,
    initialDivideState,
    initialGrowthState,
    initialHomothetyState,
    initialMapState,
    initialRectanglesState,
    initialShadowsState,
    initialThalesState,
    isSimilar,
    mapChallenges,
    realDistance,
    rectanglesChallenges,
    setDivide,
    setHomothety,
    setMap,
    setRectangles,
    setShadows,
    setThales,
    shadowsChallenges,
    similarityLabChallengeIds,
    similarityLabToolForTopic,
    similarityLabTools,
    smallSide,
    thalesChallenges,
    treeHeight,
    type DivideState,
    type GrowthState,
    type HomothetyState,
    type MapState,
    type RectanglesState,
    type ShadowsState,
    type ThalesState
} from '../src/pages/dbh4-aplikatuak-antzekotasuna/lab/labTools.ts'

const topics = ['thales', 'divide', 'thales-position', 'similar-figures', 'criteria', 'homothety', 'perimeter-ratio', 'area-ratio', 'volume-ratio', 'scale', 'find-scale', 'plans', 'shadows', 'mirror', 'sight']
const stages = ['thales', 'similarity', 'ratios', 'scales', 'heights']
const solvedIds = <State>(challenges: Array<{ id: number; isSolved: (state: State) => boolean }>, state: State) => challenges.filter((challenge) => challenge.isSolved(state)).map((challenge) => challenge.id)
/** Each challenge is solved by its own solution, and the starting state solves none */
function checkChallenges<State>(challenges: Array<{ id: number; isSolved: (state: State) => boolean }>, solutions: State[], start: State) {
    assert.equal(solutions.length, challenges.length)
    solutions.forEach((state, index) => assert.ok(solvedIds(challenges, state).includes(challenges[index].id), `${challenges[index].id}`))
    assert.deepEqual(solvedIds(challenges, start), [])
}

test('antzekotasuna 4. DBH ap lab: tools, topics and challenge ids', () => {
    assert.equal(similarityLabTools.length, 8)
    for (const tool of similarityLabTools) {
        assert.ok(stages.includes(tool.stage), tool.id)
        assert.ok(topics.includes(tool.lessonTopic), tool.id)
        assert.ok(!tool.observe.es.includes('$'), tool.id)
    }
    for (const stage of stages) assert.ok(similarityLabTools.some((tool) => tool.stage === stage), stage)
    for (const topic of topics) assert.ok(similarityLabTools.some((tool) => tool.id === similarityLabToolForTopic[topic]), topic)
    assert.equal(new Set(similarityLabChallengeIds).size, similarityLabChallengeIds.length)
    for (const challenges of [divideChallenges, thalesChallenges, rectanglesChallenges, homothetyChallenges, growthChallenges, mapChallenges, shadowsChallenges] as Array<Array<{ id: number; prompt: Record<string, string>; hint: Record<string, string> }>>) {
        for (const challenge of challenges) {
            assert.ok(!challenge.prompt.ar.includes('{,}') && !challenge.hint.ar.includes('{,}'), `${challenge.id}`)
            for (const language of ['eu', 'es', 'ar']) for (const text of [challenge.prompt[language], challenge.hint[language]]) for (const [, formula] of text.matchAll(/\$([^$]+)\$/g)) katex.renderToString(formula, { throwOnError: true })
        }
    }
})

test('antzekotasuna 4. DBH ap lab: dividing a segment', () => {
    assert.deepEqual(setDivide(initialDivideState, { count: 5 }).weights, [1, 1, 1, 1, 1])
    assert.deepEqual(setDivide(initialDivideState, { count: 9, length: 99 }), { length: 30, weights: [1, 1, 1, 1, 1] })
    assert.deepEqual(setDivide(initialDivideState, { weight: [1, 9] }).weights, [1, 6, 1])
    const parts = divideParts({ length: 22, weights: [2, 4, 5] })
    assert.ok([4, 8, 10].every((value, index) => equals(parts[index], fraction(value))))
    const solutions: DivideState[] = [{ length: 10, weights: [1, 1, 1, 1, 1] }, { length: 18, weights: [1, 1, 1, 1] }, { length: 22, weights: [2, 4, 5] }, { length: 30, weights: [1, 2, 3] }]
    checkChallenges(divideChallenges, solutions, initialDivideState)
})

test('antzekotasuna 4. DBH ap lab: Thales position and rectangles', () => {
    assert.deepEqual(setThales(initialThalesState, { ab: 4 }), { ab: 4, bc: 10, cut: 3 })
    assert.ok(equals(smallSide({ ab: 12, bc: 10, cut: 6 }), fraction(5)))
    const thales: ThalesState[] = [{ ab: 12, bc: 10, cut: 6 }, { ab: 8, bc: 6, cut: 6 }, { ab: 12, bc: 10, cut: 3 }]
    checkChallenges(thalesChallenges, thales, initialThalesState)
    assert.ok(isSimilar({ original: 0, width: 10, height: 15 }))
    assert.ok(!isSimilar({ original: 0, width: 3, height: 7 }))
    assert.deepEqual(setRectangles(initialRectanglesState, { original: 9, width: 0 }), { original: 2, width: 1, height: 8 })
    const rectangles: RectanglesState[] = [{ original: 0, width: 10, height: 15 }, { original: 1, width: 6, height: 15 }, { original: 0, width: 3, height: 7 }, { original: 2, width: 15, height: 20 }]
    checkChallenges(rectanglesChallenges, rectangles, initialRectanglesState)
})

test('antzekotasuna 4. DBH ap lab: homothety and growth', () => {
    assert.deepEqual(setHomothety(initialHomothetyState, { r: 7 }), { r: 3 })
    assert.deepEqual(setHomothety(initialHomothetyState, { r: 1.3 }), { r: 1.5 })
    assert.ok(equals(homothetyPerimeter({ r: 2.5 }), fraction(30)))
    assert.ok(equals(homothetyArea({ r: 2.5 }), fraction(75, 2)))
    const homothety: HomothetyState[] = [{ r: 2 }, { r: 3 }, { r: 0.5 }, { r: 2.5 }]
    checkChallenges(homothetyChallenges, homothety, initialHomothetyState)
    const factors = growthFactors({ shape: 'cube', r: 1.5 })
    assert.equal(toNumber(factors.area), 2.25)
    assert.equal(toNumber(factors.volume), 3.375)
    const growth: GrowthState[] = [{ shape: 'cube', r: 2 }, { shape: 'square', r: 2.5 }, { shape: 'cube', r: 0.5 }, { shape: 'square', r: 3 }]
    checkChallenges(growthChallenges, growth, initialGrowthState)
})

test('antzekotasuna 4. DBH ap lab: maps and shadows', () => {
    assert.deepEqual(setMap(initialMapState, { scale: 12345, cm: 99 }), { scale: 50000, cm: 20 })
    const real = realDistance({ scale: 300000, cm: 4 })
    assert.equal(real.cm, 1200000)
    assert.ok(equals(real.km, fraction(12)))
    const maps: MapState[] = [{ scale: 50000, cm: 4 }, { scale: 300000, cm: 4 }, { scale: 250000, cm: 4 }, { scale: 100, cm: 5 }]
    checkChallenges(mapChallenges, maps, initialMapState)
    assert.deepEqual(setShadows(initialShadowsState, { stick: 9, stickShadow: 0, treeShadow: 99 }), { stick: 3, stickShadow: 0.5, treeShadow: 24 })
    assert.ok(equals(treeHeight({ stick: 1.5, stickShadow: 2, treeShadow: 12 }), fraction(9)))
    const shadows: ShadowsState[] = [{ stick: 1.5, stickShadow: 2, treeShadow: 12 }, { stick: 2, stickShadow: 2, treeShadow: 5 }, { stick: 2, stickShadow: 1.5, treeShadow: 18 }, { stick: 1.5, stickShadow: 1, treeShadow: 20 }]
    checkChallenges(shadowsChallenges, shadows, initialShadowsState)
})
