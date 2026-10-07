import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import {
    apothemHundredths,
    arcHundredths,
    areasVolumesLabChallengeIds,
    areasVolumesLabToolForTopic,
    areasVolumesLabTools,
    circleChallenges,
    circleHundredths,
    compoundChallenges,
    compoundHundredths,
    compoundIsEmpty,
    hundredthsText,
    initialCircleState,
    initialCompoundState,
    initialRegularState,
    regularAreaHundredths,
    regularChallenges,
    setCircle,
    setCompound,
    setRegular,
    type CircleState,
    type CompoundState,
    type RegularState
} from '../src/pages/dbh4-aplikatuak-areak/lab/labTools.ts'

const topics = ['angles', 'triangles', 'perimeters', 'right-triangles', 'heights', 'applications', 'polygon-areas', 'circle-areas', 'composite', 'prism-area', 'pyramid-area', 'round-area', 'prism-volume', 'pyramid-volume', 'compound']
const stages = ['polygons', 'pythagoras', 'plane-areas', 'solid-areas', 'volumes']
const solvedIds = <State>(challenges: Array<{ id: number; isSolved: (state: State) => boolean }>, state: State) => challenges.filter((challenge) => challenge.isSolved(state)).map((challenge) => challenge.id)

test('areak 4. DBH ap lab: tools, topics and challenge ids', () => {
    assert.equal(areasVolumesLabTools.length, 12)
    for (const tool of areasVolumesLabTools) {
        assert.ok(stages.includes(tool.stage), tool.id)
        assert.ok(topics.includes(tool.lessonTopic), tool.id)
        assert.ok(!tool.observe.es.includes('$'), tool.id)
    }
    for (const stage of stages) assert.ok(areasVolumesLabTools.some((tool) => tool.stage === stage), stage)
    for (const topic of topics) assert.ok(areasVolumesLabTools.some((tool) => tool.id === areasVolumesLabToolForTopic[topic]), topic)
    assert.equal(new Set(areasVolumesLabChallengeIds).size, areasVolumesLabChallengeIds.length)
    for (const challenges of [circleChallenges, regularChallenges, compoundChallenges]) {
        for (const challenge of challenges) {
            assert.ok(!challenge.prompt.ar.includes('{,}') && !challenge.hint.ar.includes('{,}'), `${challenge.id}`)
            for (const language of ['eu', 'es', 'ar'] as const) {
                for (const text of [challenge.prompt[language], challenge.hint[language]]) for (const [, formula] of text.matchAll(/\$([^$]+)\$/g)) katex.renderToString(formula, { throwOnError: true })
            }
        }
    }
})

test('areak 4. DBH ap lab: hundredths are written with the comma', () => {
    assert.equal(hundredthsText(3768), '37,68')
    assert.equal(hundredthsText(3140), '31,4')
    assert.equal(hundredthsText(109900), '1099')
    assert.equal(hundredthsText(5), '0,05')
})

test('areak 4. DBH ap lab: circle and arcs', () => {
    assert.deepEqual(initialCircleState, setCircle(initialCircleState, {}))
    assert.deepEqual(setCircle(initialCircleState, { r: 99, angle: 400 }), { r: 20, angle: 360 })
    assert.deepEqual(setCircle(initialCircleState, { angle: 0 }).angle, 15)
    assert.equal(circleHundredths({ r: 5, angle: 360 }), 3140)
    assert.deepEqual(arcHundredths({ r: 4, angle: 90 }), { value: 628, exact: true })
    assert.deepEqual(arcHundredths({ r: 12, angle: 120 }), { value: 2512, exact: true })
    assert.equal(arcHundredths({ r: 1, angle: 15 }).exact, false)
    // Each challenge has a solution, and the start solves none
    const solutions: CircleState[] = [{ r: 5, angle: 360 }, { r: 4, angle: 90 }, { r: 12, angle: 120 }, { r: 10, angle: 180 }]
    solutions.forEach((state, index) => assert.ok(solvedIds(circleChallenges, state).includes(circleChallenges[index].id), `${index}`))
    assert.deepEqual(solvedIds(circleChallenges, initialCircleState), [49102])
    assert.ok(!circleChallenges[3].isSolved({ r: 11, angle: 180 }))
})

test('areak 4. DBH ap lab: regular polygon areas', () => {
    assert.deepEqual(setRegular(initialRegularState, { n: 20, side: 0 }), { n: 10, side: 1 })
    assert.deepEqual(apothemHundredths({ n: 4, side: 7 }), { value: 350, exact: true })
    assert.equal(apothemHundredths({ n: 6, side: 4 }).value, 346)
    assert.deepEqual(regularAreaHundredths({ n: 4, side: 7 }), { value: 4900, exact: true })
    assert.equal(regularAreaHundredths({ n: 3, side: 6 }).value, 1557)
    assert.deepEqual(regularAreaHundredths({ n: 3, side: 4 }), { value: 690, exact: true })
    const solutions: RegularState[] = [{ n: 6, side: 6 }, { n: 4, side: 7 }, { n: 10, side: 4 }, { n: 3, side: 6 }]
    solutions.forEach((state, index) => assert.ok(solvedIds(regularChallenges, state).includes(regularChallenges[index].id), `${index}`))
    // With side 4, only the decagon passes 100 cm²
    for (let n = 3; n <= 9; n += 1) assert.ok(!regularChallenges[2].isSolved({ n, side: 4 }), `${n}`)
    assert.deepEqual(solvedIds(regularChallenges, initialRegularState), [])
})

test('areak 4. DBH ap lab: compound solids', () => {
    assert.deepEqual(setCompound(initialCompoundState, { r: 0, h: -2, k: 99 }), { ...initialCompoundState, r: 1, h: 0, k: 15 })
    assert.ok(compoundIsEmpty({ r: 3, h: 0, top: 'none', bottom: 'none', k: 1 }))
    const iceCream: CompoundState = { r: 3, h: 0, top: 'hemisphere', bottom: 'cone', k: 12 }
    assert.deepEqual(compoundHundredths(iceCream), { value: 16956, exact: true })
    const capsule: CompoundState = { r: 3, h: 10, top: 'hemisphere', bottom: 'hemisphere', k: 1 }
    assert.deepEqual(compoundHundredths(capsule), { value: 39564, exact: true })
    const tower: CompoundState = { r: 5, h: 10, top: 'cone', bottom: 'none', k: 12 }
    assert.equal(compoundHundredths(tower).value, 109900)
    const cone: CompoundState = { r: 3, h: 0, top: 'cone', bottom: 'none', k: 6 }
    assert.equal(compoundHundredths(cone).value, 5652)
    // A cylinder alone: π r² h
    assert.equal(compoundHundredths({ r: 2, h: 5, top: 'none', bottom: 'none', k: 1 }).value, 6280)
    // A third of π is not a whole number of hundredths
    assert.equal(compoundHundredths({ r: 1, h: 0, top: 'cone', bottom: 'none', k: 1 }).exact, false)
    const solutions = [iceCream, capsule, tower, cone]
    solutions.forEach((state, index) => assert.deepEqual(solvedIds(compoundChallenges, state), [compoundChallenges[index].id], `${index}`))
    assert.deepEqual(solvedIds(compoundChallenges, initialCompoundState), [])
})
