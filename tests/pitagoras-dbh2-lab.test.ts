import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import {
    boxChallenges,
    chordLength,
    circleChallenges,
    circleSquare,
    classifyChallenges,
    exactRoot,
    figureBuilds,
    figureChallenges,
    gridChallenges,
    hiddenTriangle,
    initialBoxState,
    initialCircleState,
    initialClassifyState,
    initialFigureState,
    initialGridState,
    initialSolveState,
    initialSquaresState,
    pythagorasLabChallengeIds,
    pythagorasLabToolForTopic,
    pythagorasLabTools,
    setBox,
    setCircle,
    setClassify,
    setFigure,
    setGrid,
    setSolve,
    setSquares,
    solveChallenges,
    spaceSquare,
    squaresChallenges,
    triangleKind,
    unknownSquare
} from '../src/pages/dbh2-pitagoras-v2/lab/labTools.ts'

const topics = ['squares', 'formula', 'triples', 'hypotenuse', 'leg', 'classify', 'triangle-height', 'diagonals', 'trapezoid', 'apothem', 'chord', 'tangent', 'box', 'grid', 'problems']
const stages = ['theorem', 'sides', 'plane', 'circle', 'space']
const solvedIds = (challenges: Array<{ id: number; isSolved: (state: never) => boolean }>, state: unknown) => challenges.filter((challenge) => challenge.isSolved(state as never)).map((challenge) => challenge.id)
const all = (challenges: Array<{ id: number }>) => challenges.map((challenge) => challenge.id).sort()
const solvedBy = (challenges: Array<{ id: number; isSolved: (state: never) => boolean }>, states: unknown[]) => [...new Set(states.flatMap((state) => solvedIds(challenges, state)))].sort()

test('pitagoras 2. DBH lab: tools, topics and challenge ids', () => {
    assert.equal(pythagorasLabTools.length, 7)
    for (const tool of pythagorasLabTools) {
        assert.ok(stages.includes(tool.stage), tool.id)
        assert.ok(topics.includes(tool.lessonTopic), tool.id)
        // The observation box is plain text
        for (const language of ['eu', 'es', 'ar'] as const) assert.ok(!tool.observe[language].includes('$'), tool.id)
    }
    for (const stage of stages) assert.ok(pythagorasLabTools.some((tool) => tool.stage === stage), stage)
    for (const topic of topics) assert.ok(pythagorasLabTools.some((tool) => tool.id === pythagorasLabToolForTopic[topic]), topic)
    assert.equal(new Set(pythagorasLabChallengeIds).size, pythagorasLabChallengeIds.length)
    for (const challenges of [squaresChallenges, classifyChallenges, solveChallenges, figureChallenges, circleChallenges, boxChallenges, gridChallenges]) {
        for (const challenge of challenges) {
            for (const language of ['eu', 'es', 'ar'] as const) {
                for (const text of [challenge.prompt[language], challenge.hint[language]]) {
                    for (const [, formula] of text.matchAll(/\$([^$]+)\$/g)) katex.renderToString(formula, { throwOnError: true })
                }
            }
        }
    }
    // No challenge is solved before touching anything
    const starts: Array<[Array<{ id: number; isSolved: (state: never) => boolean }>, unknown]> = [[squaresChallenges, initialSquaresState], [classifyChallenges, initialClassifyState], [solveChallenges, initialSolveState], [figureChallenges, initialFigureState], [circleChallenges, initialCircleState], [boxChallenges, initialBoxState], [gridChallenges, initialGridState]]
    for (const [challenges, state] of starts) assert.deepEqual(solvedIds(challenges, state), [])
})

test('pitagoras 2. DBH lab: exact roots', () => {
    assert.equal(exactRoot(169), 13)
    assert.equal(exactRoot(34), null)
    assert.equal(exactRoot(0), 0)
    assert.equal(exactRoot(-4), null)
})

test('pitagoras 2. DBH lab: squares, classification and solving', () => {
    const squares = (b: number, c: number) => setSquares(initialSquaresState, { b, c })
    assert.deepEqual(setSquares(initialSquaresState, { b: 40 }).b, 12)
    assert.deepEqual(solvedBy(squaresChallenges, [squares(3, 4), squares(5, 5), squares(5, 12), squares(9, 12)]), all(squaresChallenges))

    const sides = (a: number, b: number, c: number) => setClassify(initialClassifyState, { a, b, c })
    assert.equal(triangleKind(sides(5, 6, 7)), 'acute')
    assert.equal(triangleKind(sides(10, 6, 8)), 'right')
    assert.equal(triangleKind(sides(4, 5, 8)), 'obtuse')
    assert.equal(triangleKind(sides(3, 4, 7)), 'impossible')
    assert.deepEqual(solvedBy(classifyChallenges, [sides(15, 8, 17), sides(7, 24, 25), sides(10, 5, 7), sides(2, 3, 9)]), all(classifyChallenges))

    const hyp = (first: number, second: number) => setSolve(initialSolveState, { unknown: 'hypotenuse', first, second })
    const leg = (first: number, second: number) => setSolve(setSolve(initialSolveState, { unknown: 'leg' }), { first, second })
    assert.equal(unknownSquare(hyp(6, 8)), 100)
    assert.equal(unknownSquare(leg(5, 13)), 144)
    // The hypotenuse never drops to the leg: moving it down pulls the leg, moving the leg up pushes it
    assert.deepEqual(setSolve(leg(5, 13), { second: 4 }), { unknown: 'leg', first: 3, second: 4 })
    assert.deepEqual(setSolve(leg(5, 13), { first: 20 }), { unknown: 'leg', first: 20, second: 21 })
    assert.deepEqual(solvedBy(solveChallenges, [hyp(15, 20), leg(5, 13), leg(7, 25), hyp(4, 6)]), all(solveChallenges))
})

test('pitagoras 2. DBH lab: the hidden triangle in plane figures', () => {
    const figure = (shape: 'isosceles' | 'rectangle' | 'rhombus' | 'trapezoid' | 'hexagon', patch: { p?: number; q?: number; r?: number }) => setFigure(setFigure(initialFigureState, { shape }), patch)
    assert.equal(hiddenTriangle(figure('rectangle', { p: 12, q: 5 })).unknownSquare, 169)
    assert.equal(hiddenTriangle(figure('rhombus', { p: 24, q: 10 })).unknownSquare, 169)
    assert.equal(hiddenTriangle(figure('isosceles', { p: 10, q: 13 })).unknownSquare, 144)
    assert.equal(hiddenTriangle(figure('trapezoid', { p: 22, q: 10, r: 10 })).unknownSquare, 64)
    assert.equal(hiddenTriangle(figure('hexagon', { p: 10 })).unknownSquare, 75)
    // Measures that are halved stay even, the small base stays below the big one, and a short slanted side cannot close
    assert.equal(figure('rhombus', { p: 13 }).p % 2, 0)
    assert.ok(figure('trapezoid', { p: 10, q: 20 }).q < 10)
    assert.equal(figureBuilds(figure('isosceles', { p: 20, q: 6 })), false)
    // Changing the figure resets its measures
    assert.deepEqual(setFigure(figure('rectangle', { p: 16, q: 12 }), { shape: 'hexagon' }), { shape: 'hexagon', p: 8, q: 0, r: 0 })
    assert.deepEqual(solvedBy(figureChallenges, [figure('rectangle', { p: 12, q: 5 }), figure('rhombus', { p: 24, q: 10 }), figure('isosceles', { p: 10, q: 13 }), figure('trapezoid', { p: 22, q: 10, r: 10 }), figure('hexagon', { p: 10 })]), all(figureChallenges))
})

test('pitagoras 2. DBH lab: chords, tangents, boxes and the grid', () => {
    const chord = (r: number, d: number) => setCircle(initialCircleState, { mode: 'chord', r, d })
    const tangent = (r: number, d: number) => setCircle(setCircle(initialCircleState, { mode: 'tangent' }), { r, d })
    assert.equal(chordLength(chord(10, 6)), 16)
    assert.equal(chordLength(chord(10, 3)), null)
    assert.equal(circleSquare(tangent(5, 12)), 169)
    // The chord stays inside the circle
    assert.equal(chord(5, 9).d, 4)
    assert.deepEqual(solvedBy(circleChallenges, [chord(10, 6), chord(13, 5), tangent(5, 12), tangent(10, 24)]), all(circleChallenges))
    // A diameter of 16 is not the chord the challenge asks for
    assert.deepEqual(solvedIds(circleChallenges, chord(8, 0)), [])

    const box = (a: number, b: number, c: number) => setBox(initialBoxState, { a, b, c })
    assert.equal(spaceSquare(box(3, 4, 12)), 169)
    assert.deepEqual(solvedBy(boxChallenges, [box(2, 3, 6), box(3, 4, 12), box(1, 4, 8), box(10, 10, 10)]), all(boxChallenges))

    const grid = (x1: number, y1: number, x2: number, y2: number) => setGrid(initialGridState, { x1, y1, x2, y2 })
    assert.deepEqual(solvedBy(gridChallenges, [grid(0, 0, 3, 4), grid(1, 1, 7, 9), grid(0, 0, 12, 5), grid(1, 1, 2, 8)]), all(gridChallenges))
    // A straight segment of 5 does not count
    assert.deepEqual(solvedIds(gridChallenges, grid(0, 0, 5, 0)), [])
})
