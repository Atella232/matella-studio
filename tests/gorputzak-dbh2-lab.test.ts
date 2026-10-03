import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { countElements, frustumVertices, platonic, prismVertices, pyramidVertices } from '../src/pages/dbh2-gorputzak-v2/geometry3d.ts'
import {
    apothemSquare,
    boxChallenges,
    boxTotal,
    fromHundredths,
    initialBoxState,
    initialPlatonicState,
    initialPolyhedronState,
    initialPyramidState,
    initialRoundState,
    initialTankState,
    initialVolumeState,
    PLATONIC_IDS,
    platonicChallenges,
    platonicData,
    polyhedronChallenges,
    polyhedronCounts,
    pyramidChallenges,
    pyramidTotal,
    roundChallenges,
    roundLateralPi,
    setBox,
    setPlatonic,
    setPolyhedron,
    setPyramid,
    setRound,
    setTank,
    setVolume,
    solidsLabChallengeIds,
    solidsLabToolForTopic,
    solidsLabTools,
    tankChallenges,
    tankLitres,
    timesPi,
    vertexAngleSum,
    volumeChallenges,
    volumeHundredths
} from '../src/pages/dbh2-gorputzak-v2/lab/labTools.ts'

const topics = ['elements', 'euler', 'regular', 'prism-area', 'pyramid-area', 'frustum-area', 'cylinder', 'cone', 'sphere', 'volume-units', 'capacity', 'cavalieri', 'prism-volume', 'pyramid-volume', 'sphere-volume']
const stages = ['polyhedra', 'areas', 'round', 'units', 'volume']
const solvedIds = (challenges: Array<{ id: number; isSolved: (state: never) => boolean }>, state: unknown) => challenges.filter((challenge) => challenge.isSolved(state as never)).map((challenge) => challenge.id)
const all = (challenges: Array<{ id: number }>) => challenges.map((challenge) => challenge.id).sort()
const solvedBy = (challenges: Array<{ id: number; isSolved: (state: never) => boolean }>, states: unknown[]) => [...new Set(states.flatMap((state) => solvedIds(challenges, state)))].sort()
const every = [polyhedronChallenges, platonicChallenges, boxChallenges, pyramidChallenges, roundChallenges, tankChallenges, volumeChallenges]

test('gorputzak 2. DBH lab: tools, topics and challenge ids', () => {
    assert.equal(solidsLabTools.length, 7)
    for (const tool of solidsLabTools) {
        assert.ok(stages.includes(tool.stage), tool.id)
        assert.ok(topics.includes(tool.lessonTopic), tool.id)
        for (const language of ['eu', 'es', 'ar'] as const) assert.ok(!tool.observe[language].includes('$'), tool.id)
    }
    for (const stage of stages) assert.ok(solidsLabTools.some((tool) => tool.stage === stage), stage)
    for (const topic of topics) assert.ok(solidsLabTools.some((tool) => tool.id === solidsLabToolForTopic[topic]), topic)
    assert.equal(new Set(solidsLabChallengeIds).size, solidsLabChallengeIds.length)
    for (const challenges of every) {
        for (const challenge of challenges) {
            for (const language of ['eu', 'es', 'ar'] as const) {
                for (const text of [challenge.prompt[language], challenge.hint[language]]) {
                    for (const [, formula] of text.matchAll(/\$([^$]+)\$/g)) katex.renderToString(formula, { throwOnError: true })
                }
            }
        }
    }
})

test('gorputzak 2. DBH lab: counts agree with the drawn solids and with Euler', () => {
    for (let n = 3; n <= 10; n += 1) {
        assert.deepEqual(polyhedronCounts({ kind: 'prism', n }), countElements(prismVertices(n, 1, 2)))
        assert.deepEqual(polyhedronCounts({ kind: 'pyramid', n }), countElements(pyramidVertices(n, 1, 2)))
        assert.deepEqual(polyhedronCounts({ kind: 'frustum', n }), countElements(frustumVertices(n, 1.5, 0.8, 2)))
    }
    for (const id of PLATONIC_IDS) {
        const data = platonicData[id]
        assert.deepEqual({ faces: data.faces, edges: data.edges, vertices: data.vertices }, countElements(platonic[id]))
        assert.equal(data.faces + data.vertices, data.edges + 2)
        assert.ok(vertexAngleSum(id) < 360)
    }
})

test('gorputzak 2. DBH lab: setters keep the state in range', () => {
    assert.equal(setPolyhedron(initialPolyhedronState, { n: 40 }).n, 10)
    assert.equal(setPlatonic(initialPlatonicState, { turn: -1 }).turn, 23)
    assert.equal(setPyramid(initialPyramidState, { side: 7 }).side % 2, 0)
    assert.equal(setBox(initialBoxState, { a: 0 }).a, 1)
    assert.equal(setTank(initialTankState, { c: 99 }).c, 20)
    assert.equal(setRound(initialRoundState, { r: 99 }).r, 12)
    assert.equal(setVolume(initialVolumeState, { h: 0 }).h, 1)
})

test('gorputzak 2. DBH lab: numbers are written right', () => {
    assert.equal(fromHundredths(18840), '188,4')
    assert.equal(fromHundredths(11304), '113,04')
    assert.equal(fromHundredths(31400), '314')
    assert.equal(timesPi(60), '188,4')
    assert.equal(boxTotal({ a: 5, b: 4, c: 3 }), 94)
    assert.equal(apothemSquare({ side: 10, height: 12 }), 169)
    assert.equal(pyramidTotal({ side: 10, height: 12 }), 360)
    assert.equal(pyramidTotal({ side: 8, height: 5 }), null)
    assert.equal(roundLateralPi({ body: 'cone', r: 6, h: 8 }), 60)
    assert.equal(tankLitres({ a: 10, b: 10, c: 10 }), 1000)
    assert.deepEqual(volumeHundredths({ body: 'sphere', r: 3, h: 1 }), { value: 11304, exact: true })
    assert.deepEqual(volumeHundredths({ body: 'cone', r: 3, h: 4 }), { value: 3768, exact: true })
    assert.equal(volumeHundredths({ body: 'pyramid', r: 1, h: 1 }).exact, false)
})

test('gorputzak 2. DBH lab: every challenge can be solved and none is solved at the start', () => {
    assert.deepEqual(solvedIds(polyhedronChallenges, initialPolyhedronState), [])
    assert.deepEqual(solvedBy(polyhedronChallenges, [{ kind: 'prism', n: 6 }, { kind: 'pyramid', n: 6 }, { kind: 'pyramid', n: 10 }, { kind: 'frustum', n: 7 }]), all(polyhedronChallenges))
    assert.deepEqual(solvedIds(platonicChallenges, initialPlatonicState), [])
    assert.deepEqual(solvedBy(platonicChallenges, [{ solid: 'dodeca', turn: 0 }, { solid: 'octa', turn: 0 }, { solid: 'icosa', turn: 12 }]), all(platonicChallenges))
    assert.deepEqual(solvedIds(boxChallenges, initialBoxState), [])
    assert.deepEqual(solvedBy(boxChallenges, [{ a: 5, b: 4, c: 3 }, { a: 5, b: 5, c: 5 }, { a: 2, b: 3, c: 4 }, { a: 4, b: 4, c: 2 }]), all(boxChallenges))
    assert.deepEqual(solvedIds(pyramidChallenges, initialPyramidState), [])
    assert.deepEqual(solvedBy(pyramidChallenges, [{ side: 10, height: 12 }, { side: 6, height: 4 }, { side: 16, height: 15 }]), all(pyramidChallenges))
    assert.deepEqual(solvedIds(roundChallenges, initialRoundState), [])
    assert.deepEqual(solvedBy(roundChallenges, [{ body: 'cylinder', r: 3, h: 10 }, { body: 'cone', r: 6, h: 8 }, { body: 'sphere', r: 5, h: 1 }, { body: 'cylinder', r: 4, h: 4 }]), all(roundChallenges))
    assert.deepEqual(solvedIds(tankChallenges, initialTankState), [])
    assert.deepEqual(solvedBy(tankChallenges, [{ a: 10, b: 10, c: 10 }, { a: 4, b: 3, c: 5 }, { a: 20, b: 10, c: 5 }, { a: 20, b: 12, c: 10 }]), all(tankChallenges))
    assert.deepEqual(solvedIds(volumeChallenges, initialVolumeState), [])
    assert.deepEqual(solvedBy(volumeChallenges, [{ body: 'pyramid', r: 10, h: 12 }, { body: 'cone', r: 3, h: 4 }, { body: 'sphere', r: 3, h: 1 }, { body: 'cylinder', r: 3, h: 4 }]), all(volumeChallenges))
})
