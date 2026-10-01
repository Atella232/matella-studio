import test from 'node:test'
import assert from 'node:assert/strict'
import { toNumber } from '../src/features/unit-v2/math/fraction.ts'
import {
    globalExtremes,
    graphValue,
    graphXRange,
    graphZeros,
    isFunctionRelation,
    lineLatex,
    lineXIntercept,
    localExtremes,
    numberLatex,
    pointsAtX,
    quadrantOf,
    quadrantText,
    slopeBetween,
    storyGraphs,
    trendIntervals,
    type Point
} from '../src/pages/dbh2-funtzioak-v2/functions.ts'

test('funtzioak 2. DBH: numbers and lines are written like a textbook', () => {
    assert.equal(numberLatex(3), '3')
    assert.equal(numberLatex(-2), '-2')
    assert.equal(numberLatex(0.5), '\\frac{1}{2}')
    assert.equal(numberLatex(-1.5), '-\\frac{3}{2}')
    assert.equal(numberLatex(0.25), '0{,}25')
    assert.equal(lineLatex(2, -1), 'y=2x-1')
    assert.equal(lineLatex(-1, 0), 'y=-x')
    assert.equal(lineLatex(1, 4), 'y=x+4')
    assert.equal(lineLatex(0, 3), 'y=3')
    assert.equal(lineLatex(0, 0), 'y=0')
    assert.equal(lineLatex(0.5, 1), 'y=\\frac{1}{2}x+1')
    assert.equal(lineLatex(-3, -2), 'y=-3x-2')
})

test('funtzioak 2. DBH: quadrants and axes', () => {
    assert.equal(quadrantOf([2, 3]), 1)
    assert.equal(quadrantOf([-2, 3]), 2)
    assert.equal(quadrantOf([-2, -3]), 3)
    assert.equal(quadrantOf([2, -3]), 4)
    assert.equal(quadrantOf([0, 4]), 0)
    assert.equal(quadrantOf([-3, 0]), 0)
    assert.equal(quadrantText([-2, 3]).es, 'II cuadrante')
    assert.equal(quadrantText([0, 0]).es, 'el origen')
    assert.equal(quadrantText([0, 5]).eu, 'Y ardatzean')
})

test('funtzioak 2. DBH: relations, slopes and intercepts', () => {
    const yes: Point[] = [[1, 2], [2, 2], [3, 5]]
    const no: Point[] = [[1, 2], [1, 4], [3, 5]]
    assert.ok(isFunctionRelation(yes))
    assert.ok(!isFunctionRelation(no))
    assert.ok(isFunctionRelation([[1, 2], [1, 2]]))
    assert.equal(pointsAtX(no, 1).length, 2)
    assert.equal(toNumber(slopeBetween([1, 2], [4, 8])!), 2)
    assert.equal(toNumber(slopeBetween([-1, 4], [3, -4])!), -2)
    assert.equal(toNumber(slopeBetween([0, 1], [4, 1])!), 0)
    assert.equal(slopeBetween([2, 1], [2, 7]), null)
    assert.equal(lineXIntercept(2, -6), 3)
    assert.equal(lineXIntercept(0, 3), null)
})

test('funtzioak 2. DBH: the story graphs match what the lessons say', () => {
    for (const graph of storyGraphs) {
        const [from, to] = graphXRange(graph)
        assert.equal(graph.points.length, to - from + 1, graph.id)
        graph.points.forEach(([x], index) => assert.equal(x, from + index, graph.id))
    }
    const [temperature, plane, speed, tank, abstract] = storyGraphs
    assert.equal(graphValue(temperature, 4), 8)
    assert.deepEqual(temperature.points.filter(([, y]) => y === 4), [[3, 4]])
    assert.deepEqual(trendIntervals(plane.points), [
        { from: 0, to: 2, trend: 'up' },
        { from: 2, to: 4, trend: 'flat' },
        { from: 4, to: 5, trend: 'up' },
        { from: 5, to: 8, trend: 'down' }
    ])
    assert.deepEqual(localExtremes(speed.points), { maxima: [[3, 8], [7, 7]], minima: [[5, 2]] })
    assert.deepEqual(globalExtremes(speed.points), { max: [3, 8], min: [0, 1] })
    assert.deepEqual(trendIntervals(tank.points).map((item) => item.trend), ['down'])
    assert.deepEqual(graphZeros(abstract.points), [-3, 1, 5])
    assert.equal(graphValue(abstract, 0), 2)
    assert.equal(graphValue(abstract, 9), null)
})
