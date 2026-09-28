import test from 'node:test'
import assert from 'node:assert/strict'
import { toNumber } from '../src/features/unit-v2/math/fraction.ts'
import {
    angleKind,
    answerArea,
    answerHypotenuse,
    areaChallenges,
    areaOf,
    circleArea,
    circleChallenges,
    circleLength,
    classifyTriangle,
    geometryLabChallengeIds,
    geometryLabToolForTopic,
    geometryLabTools,
    initialAreaState,
    initialCircleState,
    initialProtractorState,
    initialPythagorasState,
    initialTriangleState,
    isWholeHypotenuse,
    protractorChallenges,
    pythagorasChallenges,
    setAngle,
    setArea,
    setCircle,
    setLegs,
    setTriangle,
    thirdAngle,
    triangleChallenges
} from '../src/pages/dbh1-geometria-v2/lab/labTools.ts'

const solved = <State>(challenges: Array<{ id: number; isSolved: (state: State) => boolean }>, id: number, state: State) =>
    challenges.find((challenge) => challenge.id === id)!.isSolved(state)

const topics = ['lines', 'angles', 'angle-pairs', 'polygons', 'triangles', 'triangle-lines', 'quadrilaterals', 'circle', 'pythagoras', 'pythagoras-use', 'units', 'perimeter', 'circumference', 'area-rectangles', 'area-triangle', 'area-circle']

test('geometria 1. DBH lab: five tools, every lesson has one and ids are unique', () => {
    assert.equal(geometryLabTools.length, 5)
    assert.equal(geometryLabChallengeIds.length, 20)
    assert.equal(new Set(geometryLabChallengeIds).size, 20)
    for (const topic of topics) assert.ok(geometryLabTools.some((tool) => tool.id === geometryLabToolForTopic[topic]), topic)
    for (const tool of geometryLabTools) assert.ok(topics.includes(tool.lessonTopic), tool.id)
})

test('geometria 1. DBH lab: protractor', () => {
    assert.deepEqual([0, 45, 90, 120, 180, 270, 360].map(angleKind), ['null', 'acute', 'right', 'obtuse', 'straight', 'reflex', 'full'])
    assert.ok(solved(protractorChallenges, 9102, setAngle(initialProtractorState, 55)))
    assert.ok(solved(protractorChallenges, 9103, setAngle(initialProtractorState, 108)))
    const several = [40, 130, 180].reduce(setAngle, initialProtractorState)
    assert.ok(solved(protractorChallenges, 9104, several))
    assert.equal(setAngle(initialProtractorState, 400).angle, 360)
})

test('geometria 1. DBH lab: triangle builder', () => {
    assert.equal(thirdAngle(setTriangle(initialTriangleState, { a: 50, b: 70 })), 60)
    assert.equal(thirdAngle(setTriangle(initialTriangleState, { a: 100, b: 80 })), null)
    assert.deepEqual(classifyTriangle({ a: 60, b: 60 }), { angles: 'acute', sides: 'equilateral' })
    assert.deepEqual(classifyTriangle({ a: 90, b: 45 }), { angles: 'right', sides: 'isosceles' })
    assert.ok(solved(triangleChallenges, 9203, { a: 70, b: 40 }))
    assert.ok(solved(triangleChallenges, 9204, { a: 100, b: 30 }))
    assert.ok(!solved(triangleChallenges, 9204, { a: 100, b: 40 }))
})

test('geometria 1. DBH lab: Pythagoras records whole hypotenuses written right', () => {
    let state = answerHypotenuse(setLegs(initialPythagorasState, { legA: 5, legB: 12 }), { answer: '13', checked: true })
    assert.ok(solved(pythagorasChallenges, 9303, state))
    state = answerHypotenuse(setLegs(state, { legA: 9, legB: 12 }), { answer: '15', checked: true })
    state = answerHypotenuse(setLegs(state, { legA: 8, legB: 15 }), { answer: '17', checked: true })
    assert.ok(solved(pythagorasChallenges, 9304, state))
    const revealed = answerHypotenuse(setLegs(initialPythagorasState, { legA: 6, legB: 8 }), { answer: '10', checked: true, revealed: true })
    assert.ok(!solved(pythagorasChallenges, 9302, revealed))
    assert.ok(!isWholeHypotenuse({ legA: 1, legB: 1 }))
})

test('geometria 1. DBH lab: area grid and circle', () => {
    assert.equal(toNumber(areaOf({ shape: 'triangle', base: 5, height: 3 })), 7.5)
    let area = answerArea(setArea(initialAreaState, { shape: 'triangle', base: 6, height: 4 }), { answer: '12', checked: true })
    assert.ok(solved(areaChallenges, 9404, area))
    area = answerArea(setArea(area, { shape: 'parallelogram', base: 5, height: 4 }), { answer: '20', checked: true })
    assert.ok(solved(areaChallenges, 9402, area))
    assert.equal(toNumber(circleLength(5)), 31.4)
    assert.equal(toNumber(circleArea(10)), 314)
    assert.ok(solved(circleChallenges, 9501, { ...setCircle(initialCircleState, { radius: 5 }), answer: '31,4', checked: true }))
    assert.ok(solved(circleChallenges, 9503, { ...setCircle(initialCircleState, { radius: 30 }), answer: '188,4', checked: true }))
})
