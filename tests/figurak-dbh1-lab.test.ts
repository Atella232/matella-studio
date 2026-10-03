import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { fraction, toNumber } from '../src/features/unit-v2/math/fraction.ts'
import {
    angleKind,
    apexKind,
    arcLength,
    centersChallenges,
    centrePoint,
    circlePosition,
    circlesChallenges,
    closure,
    compositeArea,
    compositeChallenges,
    compositePieces,
    diagonalCount,
    figuresLabChallengeIds,
    figuresLabToolForTopic,
    figuresLabTools,
    initialCentersState,
    initialCirclesState,
    initialCompositeState,
    initialPolygonState,
    initialQuadState,
    initialSectorState,
    initialTilingState,
    initialTriangleState,
    interiorAngle,
    placement,
    polygonChallenges,
    quadChallenges,
    quadName,
    ringArea,
    sectorArea,
    sectorChallenges,
    setCenters,
    setCircles,
    setComposite,
    setPolygon,
    setQuad,
    setSector,
    setTiling,
    setTriangle,
    sideKind,
    tilingChallenges,
    tilingStatus,
    triangleAngles,
    triangleChallenges
} from '../src/pages/dbh1-figurak-v2/lab/labTools.ts'

const topics = ['diagonals', 'angle-sum', 'regular-angles', 'triangle-exists', 'side-angle', 'centers', 'quad-diagonals', 'quad-angles', 'symmetry', 'line-circle', 'two-circles', 'circle-angles', 'composite', 'sector-ring', 'area-problems']
const stages = ['polygons', 'triangles', 'quadrilaterals', 'circles', 'areas']
const solvedIds = (challenges: Array<{ id: number; isSolved: (state: never) => boolean }>, state: unknown) => challenges.filter((challenge) => challenge.isSolved(state as never)).map((challenge) => challenge.id)
const all = (challenges: Array<{ id: number }>) => challenges.map((challenge) => challenge.id)
const solvedBy = (challenges: Array<{ id: number; isSolved: (state: never) => boolean }>, states: unknown[]) => [...new Set(states.flatMap((state) => solvedIds(challenges, state)))].sort()

test('irudi lauak 1. DBH lab: tools, topics and challenge ids', () => {
    assert.equal(figuresLabTools.length, 8)
    for (const tool of figuresLabTools) {
        assert.ok(stages.includes(tool.stage), tool.id)
        assert.ok(topics.includes(tool.lessonTopic), tool.id)
        for (const [, formula] of tool.observe.es.matchAll(/\$([^$]+)\$/g)) katex.renderToString(formula, { throwOnError: true })
    }
    for (const stage of stages) assert.ok(figuresLabTools.some((tool) => tool.stage === stage), stage)
    for (const topic of topics) assert.ok(figuresLabTools.some((tool) => tool.id === figuresLabToolForTopic[topic]), topic)
    assert.equal(new Set(figuresLabChallengeIds).size, figuresLabChallengeIds.length)
    assert.equal(figuresLabChallengeIds.length, 31)
    for (const challenges of [polygonChallenges, tilingChallenges, triangleChallenges, centersChallenges, quadChallenges, circlesChallenges, sectorChallenges, compositeChallenges]) {
        for (const challenge of challenges) {
            for (const language of ['eu', 'es', 'ar'] as const) {
                for (const text of [challenge.prompt[language], challenge.hint[language]]) {
                    for (const [, formula] of text.matchAll(/\$([^$]+)\$/g)) katex.renderToString(formula, { throwOnError: true })
                    if (language === 'ar') assert.ok(!text.includes('{,}'), text)
                }
            }
        }
    }
})

test('irudi lauak 1. DBH lab: the polygon inside', () => {
    assert.deepEqual([3, 4, 5, 6, 8, 10].map(diagonalCount), [0, 2, 5, 9, 20, 35])
    assert.equal(toNumber(interiorAngle(6)), 120)
    assert.equal(setPolygon(initialPolygonState, { sides: 40 }).sides, 12)
    const states = [8, 7, 9, 12].map((sides) => setPolygon(initialPolygonState, { sides }))
    assert.deepEqual(solvedBy(polygonChallenges, states), all(polygonChallenges).sort())
    assert.deepEqual(solvedIds(polygonChallenges, initialPolygonState), [])
})

test('irudi lauak 1. DBH lab: tiles around a vertex', () => {
    assert.equal(tilingStatus(setTiling(initialTilingState, { sides: 4, copies: 4 })), 'closed')
    assert.equal(tilingStatus(setTiling(initialTilingState, { sides: 5, copies: 3 })), 'gap')
    assert.equal(tilingStatus(setTiling(initialTilingState, { sides: 8, copies: 3 })), 'overlap')
    const states = [setTiling(initialTilingState, { sides: 3, copies: 6 }), setTiling(initialTilingState, { sides: 6, copies: 3 }), setTiling(initialTilingState, { sides: 5, copies: 3 }), setTiling(initialTilingState, { sides: 5, copies: 4 })]
    assert.deepEqual(solvedBy(tilingChallenges, states), all(tilingChallenges).sort())
})

test('irudi lauak 1. DBH lab: building a triangle', () => {
    const make = (a: number, b: number, c: number) => setTriangle(initialTriangleState, { a, b, c })
    assert.equal(closure(make(3, 5, 7)), 'closes')
    assert.equal(closure(make(3, 4, 7)), 'flat')
    assert.equal(closure(make(3, 4, 8)), 'open')
    assert.equal(angleKind(make(3, 4, 5)), 'right')
    assert.equal(angleKind(make(4, 4, 7)), 'obtuse')
    assert.equal(sideKind(make(6, 6, 6)), 'equilateral')
    assert.deepEqual(triangleAngles(make(6, 6, 6)), [60, 60, 60])
    assert.equal(triangleAngles(make(3, 4, 5))[2], 90)
    const states = [make(3, 4, 8), make(3, 4, 7), make(4, 4, 7), make(6, 8, 10)]
    assert.deepEqual(solvedBy(triangleChallenges, states), all(triangleChallenges).sort())
    assert.deepEqual(solvedIds(triangleChallenges, make(5, 5, 5)), [])
})

test('irudi lauak 1. DBH lab: notable points follow the kind of triangle', () => {
    const at = (x: number, h: number, point: 'circum' | 'in' | 'centroid' | 'ortho') => setCenters(initialCentersState, { x, h, point })
    // Right angle at A when C is straight above it: circumcentre at the middle of BC, orthocentre at A
    assert.deepEqual(apexKind(at(0, 6, 'circum')), { kind: 'right', vertex: 'A' })
    assert.deepEqual(centrePoint(at(0, 6, 'circum')), [5, 3])
    assert.deepEqual(centrePoint(at(0, 6, 'ortho')), [0, 0])
    // Right angle at C: x(10 − x) = h²
    assert.equal(apexKind(at(2, 4, 'circum')).kind, 'right')
    assert.equal(apexKind(at(5, 1, 'circum')).kind, 'obtuse')
    assert.equal(placement(at(5, 1, 'circum')), 'outside')
    assert.equal(placement(at(5, 6, 'ortho')), 'inside')
    // The circumcentre is the same distance from the three vertices
    const state = at(3, 5, 'circum')
    const [ox, oy] = centrePoint(state)
    const distances = [[0, 0], [10, 0], [3, 5]].map(([x, y]) => Math.hypot(x - ox, y - oy))
    assert.ok(distances.every((distance) => Math.abs(distance - distances[0]) < 1e-9))
    const states = [at(12, 2, 'circum'), at(0, 5, 'circum'), at(10, 3, 'ortho'), at(-2, 3, 'centroid')]
    assert.deepEqual(solvedBy(centersChallenges, states), all(centersChallenges).sort())
})

test('irudi lauak 1. DBH lab: the quadrilateral from its diagonals', () => {
    const make = (first: number, second: number, angle: 90 | 60, cut: 'both' | 'one') => setQuad(initialQuadState, { first, second, angle, cut })
    assert.equal(quadName(make(6, 6, 90, 'both')), 'square')
    assert.equal(quadName(make(6, 6, 60, 'both')), 'rectangle')
    assert.equal(quadName(make(8, 4, 90, 'both')), 'rhombus')
    assert.equal(quadName(make(8, 4, 60, 'both')), 'romboid')
    assert.equal(quadName(make(8, 4, 90, 'one')), 'kite')
    assert.equal(quadName(make(8, 4, 60, 'one')), 'trapezoid')
    const states = [make(6, 6, 90, 'both'), make(8, 4, 90, 'both'), make(6, 6, 60, 'both'), make(8, 4, 90, 'one')]
    assert.deepEqual(solvedBy(quadChallenges, states), all(quadChallenges).sort())
})

test('irudi lauak 1. DBH lab: positions of circles', () => {
    const two = (first: number, second: number, distance: number) => setCircles(initialCirclesState, { mode: 'two', first, second, distance })
    assert.deepEqual([9, 20, 3, 17, 0].map((distance) => circlePosition(two(7, 10, distance))), ['secant', 'exterior', 'tangent-interior', 'tangent-exterior', 'concentric'])
    assert.equal(circlePosition(two(8, 5, 2)), 'interior')
    assert.equal(circlePosition(two(4, 4, 0)), 'coincident')
    assert.deepEqual([3, 5, 8].map((distance) => circlePosition(setCircles(initialCirclesState, { mode: 'line', first: 5, distance }))), ['secant', 'tangent', 'exterior'])
    const states = [setCircles(initialCirclesState, { mode: 'line', first: 5, distance: 5 }), two(5, 3, 8), two(5, 3, 2), two(5, 3, 0)]
    assert.deepEqual(solvedBy(circlesChallenges, states), all(circlesChallenges).sort())
})

test('irudi lauak 1. DBH lab: sectors and rings with π ≈ 3,14', () => {
    const sector = (radius: number, angle: number) => setSector(initialSectorState, { mode: 'sector', radius, angle })
    assert.deepEqual(sectorArea(sector(10, 90)), fraction(785, 10))
    assert.deepEqual(arcLength(sector(10, 180)), fraction(314, 10))
    assert.deepEqual(ringArea(setSector(initialSectorState, { mode: 'ring', outer: 5, inner: 3 })), fraction(5024, 100))
    // The inner radius always stays below the outer one, and angles move in steps of 15°
    assert.equal(setSector(initialSectorState, { outer: 3, inner: 9 }).inner, 2)
    assert.equal(setSector(initialSectorState, { angle: 100 }).angle, 105)
    const states = [sector(10, 90), sector(10, 180), setSector(initialSectorState, { mode: 'ring', outer: 5, inner: 3 }), sector(6, 120)]
    assert.deepEqual(solvedBy(sectorChallenges, states), all(sectorChallenges).sort())
})

test('irudi lauak 1. DBH lab: the L shape by completing or splitting', () => {
    for (const width of [4, 7, 12]) {
        for (const height of [3, 6, 10]) {
            const state = setComposite(initialCompositeState, { width, height, cutWidth: 2, cutHeight: 2 })
            const [tall, short] = compositePieces(state)
            assert.equal(tall + short, compositeArea(state))
        }
    }
    const states = [initialCompositeState, setComposite(initialCompositeState, { width: 8, height: 6, cutWidth: 6, cutHeight: 4 }), setComposite(initialCompositeState, { width: 10, height: 6, cutWidth: 6, cutHeight: 2 })]
    assert.deepEqual(solvedBy(compositeChallenges, states), all(compositeChallenges).sort())
    assert.equal(setComposite(initialCompositeState, { width: 4 }).cutWidth, 3)
})
