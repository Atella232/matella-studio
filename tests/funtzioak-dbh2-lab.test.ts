import test from 'node:test'
import assert from 'node:assert/strict'
import { toNumber } from '../src/features/unit-v2/math/fraction.ts'
import { globalExtremes, graphXRange, isFunctionRelation, storyGraphs } from '../src/pages/dbh2-funtzioak-v2/functions.ts'
import {
    functionsLabChallengeIds,
    functionsLabToolForTopic,
    functionsLabTools,
    hitsTwice,
    initialLineState,
    initialPlaneState,
    initialReadingState,
    initialRelationState,
    initialSlopeState,
    initialTableState,
    lineChallenges,
    lineHits,
    planeChallenges,
    planeQuadrant,
    readingChallenges,
    readingInfo,
    relationChallenges,
    relations,
    setFormula,
    setLine,
    setLineParams,
    setPlanePoint,
    setReadingGraph,
    setReadingX,
    setRelation,
    setSlopePoint,
    setVerdict,
    slopeChallenges,
    slopeOf,
    tableChallenges,
    tableFormulas,
    tableValue,
    triedValues,
    tryX,
    type LineState,
    type ReadingState,
    type RelationState,
    type SlopeState,
    type TableState
} from '../src/pages/dbh2-funtzioak-v2/lab/labTools.ts'

test('funtzioak 2. DBH lab: tools, topics and challenge ids', () => {
    assert.equal(functionsLabTools.length, 6)
    assert.equal(new Set(functionsLabTools.map((tool) => tool.id)).size, 6)
    for (const tool of functionsLabTools) assert.ok(Object.values(functionsLabToolForTopic).includes(tool.id), tool.id)
    assert.equal(new Set(functionsLabChallengeIds).size, functionsLabChallengeIds.length)
    assert.equal(functionsLabChallengeIds.length, 31)
    for (const challenge of [...planeChallenges, ...relationChallenges, ...tableChallenges, ...readingChallenges, ...slopeChallenges, ...lineChallenges]) {
        for (const language of ['eu', 'es', 'ar'] as const) assert.ok(challenge.prompt[language].length > 0 && challenge.hint[language].length > 0, `${challenge.id} ${language}`)
    }
})

test('funtzioak 2. DBH lab: the plane tool', () => {
    const solved = (id: number, x: number, y: number) => planeChallenges.find((item) => item.id === id)!.isSolved(setPlanePoint(initialPlaneState, { x, y }))
    assert.ok(solved(30101, -3, 2) && !solved(30101, 3, 2))
    assert.ok(solved(30102, -2, -5) && !solved(30102, -2, 5))
    assert.ok(solved(30103, 0, -4) && !solved(30103, 0, 4))
    assert.ok(solved(30104, 3, -3) && !solved(30104, 3, 3) && !solved(30104, 2, -3))
    assert.ok(solved(30105, -5, 0) && !solved(30105, 5, 0))
    assert.equal(planeQuadrant(setPlanePoint(initialPlaneState, { x: 9, y: -9 })), 4)
    assert.deepEqual(setPlanePoint(initialPlaneState, { x: 99, y: -99 }), { x: 6, y: -6 })
    for (const challenge of planeChallenges) assert.ok(!challenge.isSolved(initialPlaneState), `${challenge.id} starts solved`)
})

test('funtzioak 2. DBH lab: the vertical line test agrees with the maths', () => {
    assert.deepEqual(relations.map((item) => item.isFunction), [true, false, true, true, false, true, true, false])
    for (const item of relations) if (!item.curve) assert.equal(item.isFunction, isFunctionRelation(item.points))
    // The curves: every point of the drawing satisfies the rule the vertical line reads
    for (const item of relations) {
        if (!item.curve) continue
        for (const [x, y] of item.curve.path) assert.ok(item.curve.at(x).some((value) => Math.abs(value - y) < 0.01) || Math.abs(Math.abs(x) - 3) < 0.01, `${x}, ${y}`)
    }
    // Sweeping the line over a non-function relation finds the double exit; over a function it never does
    for (let index = 0; index < relations.length; index += 1) {
        let state: RelationState = setRelation(initialRelationState, index)
        for (let k = -5; k <= 5; k += 1) state = setLine(state, k)
        assert.equal(state.found.includes(index), !relations[index].isFunction, `relation ${index}`)
    }
    assert.ok(hitsTwice({ relation: 1, k: 2 }) && lineHits({ relation: 1, k: 2 }).length === 3)
    assert.ok(!hitsTwice({ relation: 0, k: 1 }))
    const classify = (indexes: number[]) => indexes.reduce((state: RelationState, index) => setVerdict(setRelation(state, index), relations[index].isFunction ? 'yes' : 'no'), initialRelationState)
    assert.ok(relationChallenges[1].isSolved(classify([0, 1, 2])) && !relationChallenges[1].isSolved(classify([0, 1])))
    const all = relations.map((_, index) => index)
    assert.ok(relationChallenges[2].isSolved(classify(all)) && !relationChallenges[2].isSolved(classify([0, 1, 2, 3, 4, 5])))
    const wrong = setVerdict(setRelation(classify(all), 1), 'yes')
    assert.ok(!relationChallenges[2].isSolved(wrong))
    assert.ok(relationChallenges[0].isSolved(setLine(setRelation(initialRelationState, 1), 2)))
    assert.ok(!relationChallenges[0].isSolved(initialRelationState))
    assert.equal(setVerdict(setVerdict(initialRelationState, 'yes'), null).verdicts[0], undefined)
})

test('funtzioak 2. DBH lab: the table tool', () => {
    assert.deepEqual(tableFormulas.map((formula) => formula.apply(2)), [5, 1, 2, -4, 4])
    assert.equal(tableValue({ formula: 2, x: -3 }), 7)
    let state: TableState = initialTableState
    for (const x of [-2, -1, 1, 2]) state = tryX(state, x)
    assert.deepEqual(triedValues(state), [-2, -1, 0, 1, 2])
    assert.ok(tableChallenges[0].isSolved(state) && !tableChallenges[0].isSolved(initialTableState))
    assert.ok(tableChallenges[1].isSolved(tryX(initialTableState, 3)) && tableValue({ formula: 0, x: 3 }) === 7)
    assert.ok(!tableChallenges[1].isSolved(tryX(initialTableState, 2)))
    let squares = setFormula(initialTableState, 2)
    squares = tryX(tryX(squares, 2), -2)
    assert.ok(tableChallenges[2].isSolved(squares) && tableValue({ formula: 2, x: 2 }) === 2)
    const zero = tryX(setFormula(initialTableState, 1), 3)
    assert.ok(tableChallenges[3].isSolved(zero) && tableValue(zero) === 0)
    let constant = setFormula(initialTableState, 4)
    for (const x of [-1, 2]) constant = tryX(constant, x)
    assert.ok(tableChallenges[4].isSolved(constant) && !tableChallenges[4].isSolved(setFormula(initialTableState, 4)))
    assert.equal(tryX(initialTableState, 99).x, 3)
    // Every formula stays inside the plane drawn by the tool (x from −3 to 3, y from −6 to 8)
    for (const formula of tableFormulas) for (let x = -3; x <= 3; x += 1) assert.ok(formula.apply(x) >= -6 && formula.apply(x) <= 8, `${formula.latex} at ${x}`)
})

test('funtzioak 2. DBH lab: the reading tool', () => {
    const at = (graph: number, x: number): ReadingState => setReadingX(setReadingGraph(graph), x)
    assert.ok(readingChallenges[0].isSolved(at(0, 5)) && readingInfo(at(0, 5)).y === 11)
    assert.ok(readingChallenges[1].isSolved(at(1, globalExtremes(storyGraphs[1].points).max[0])) && !readingChallenges[1].isSolved(at(1, 2)))
    assert.ok(readingChallenges[2].isSolved(at(1, 3)) && readingInfo(at(1, 3)).trend === 'flat')
    assert.ok(readingChallenges[3].isSolved(at(2, 5)) && readingInfo(at(2, 5)).isMin && !readingChallenges[3].isSolved(at(2, 3)))
    assert.ok(readingChallenges[4].isSolved(at(3, 5)) && readingInfo(at(3, 5)).isZero)
    assert.ok(readingChallenges[5].isSolved(at(4, -3)) && readingInfo(at(4, -3)).isZero)
    for (const challenge of readingChallenges) assert.ok(!challenge.isSolved(initialReadingState), `${challenge.id} starts solved`)
    assert.ok(readingInfo(at(2, 3)).isMax && readingInfo(at(2, 7)).isMax)
    assert.equal(readingInfo(at(0, 8)).trend, 'down')
    for (let graph = 0; graph < storyGraphs.length; graph += 1) {
        const [from, to] = graphXRange(storyGraphs[graph])
        assert.equal(setReadingX(setReadingGraph(graph), -99).x, from)
        assert.equal(setReadingX(setReadingGraph(graph), 99).x, to)
        for (let x = from; x <= to; x += 1) assert.equal(typeof readingInfo({ graph, x }).y, 'number')
    }
})

test('funtzioak 2. DBH lab: the slope tool', () => {
    assert.equal(toNumber(slopeOf(initialSlopeState)!), 4 / 3)
    assert.ok(slopeChallenges[0].isSolved({ a: [-1, -2], b: [2, 4] }) && !slopeChallenges[0].isSolved(initialSlopeState))
    const move = (state: SlopeState, which: 'a' | 'b', axis: 0 | 1, value: number) => setSlopePoint(state, which, axis, value)
    const from = (a: [number, number], b: [number, number]): SlopeState => ({ a, b })
    assert.ok(slopeChallenges[1].isSolved(from([0, 3], [2, 1])) && !slopeChallenges[1].isSolved(initialSlopeState))
    assert.ok(slopeChallenges[2].isSolved(from([-2, 1], [3, 1])) && !slopeChallenges[2].isSolved(from([2, 1], [2, 1])))
    assert.ok(slopeChallenges[3].isSolved(from([0, 0], [2, 1])) && slopeChallenges[3].isSolved(from([-2, 3], [2, 5])) && !slopeChallenges[3].isSolved(initialSlopeState))
    assert.ok(slopeChallenges[4].isSolved(from([2, -1], [2, 4])) && !slopeChallenges[4].isSolved(from([2, 4], [2, 4])))
    assert.equal(slopeOf(from([2, -1], [2, 4])), null)
    assert.ok(slopeChallenges[5].isSolved(from([0, 0], [2, -2])) && slopeChallenges[5].isSolved(from([-1, 1], [3, -3])) && !slopeChallenges[5].isSolved(from([0, 1], [2, -1])))
    for (const challenge of slopeChallenges) assert.ok(!challenge.isSolved(initialSlopeState), `${challenge.id} starts solved`)
    assert.deepEqual(move(initialSlopeState, 'a', 0, 99).a, [5, -1])
})

test('funtzioak 2. DBH lab: the line tool', () => {
    const line = (m: number, n: number): LineState => setLineParams(initialLineState, { m, n })
    assert.ok(lineChallenges[0].isSolved(line(2, -1)) && !lineChallenges[0].isSolved(line(2, 1)))
    assert.ok(lineChallenges[1].isSolved(line(-2, 4)) && -4 / -2 === 2 && -2 * 2 + 4 === 0)
    assert.ok(lineChallenges[2].isSolved(line(0, 3)))
    assert.ok(lineChallenges[3].isSolved(line(-1, 0)) && !lineChallenges[3].isSolved(line(-1, 1)) && !lineChallenges[3].isSolved(line(1, 0)))
    assert.ok(lineChallenges[4].isSolved(line(0.5, 1)))
    for (const state of [line(1, -3), line(-1, 3), line(2, -6)]) assert.ok(lineChallenges[5].isSolved(state))
    assert.ok(!lineChallenges[5].isSolved(line(0, 0)) && !lineChallenges[5].isSolved(line(1, 3)))
    assert.deepEqual(setLineParams(initialLineState, { m: 0.7, n: 99 }), { m: 0.5, n: 6 })
    assert.deepEqual(setLineParams(initialLineState, { m: -99 }), { m: -5, n: 0 })
    for (const challenge of lineChallenges) assert.ok(!challenge.isSolved(initialLineState), `${challenge.id} starts solved`)
})
