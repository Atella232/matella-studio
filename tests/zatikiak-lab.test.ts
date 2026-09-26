import test from 'node:test'
import assert from 'node:assert/strict'
import {
    clearParts,
    fillAllParts,
    gridLayout,
    initialNumberLineState,
    initialPartsState,
    initialWallState,
    labChallengeIds,
    labToolForTopic,
    labTools,
    moveNumberLinePoint,
    numberLineBounds,
    numberLineChallenges,
    partsChallenges,
    selectWallPiece,
    setNumberLineDenominator,
    setNumberLineRange,
    setPartsDenominator,
    setPartsUnits,
    setWallMode,
    togglePart,
    wallChallenges,
    wallEquivalents,
    type NumberLineState,
    type PartsState
} from '../src/pages/dbh2-zatikiak-prototype/lab/labTools.ts'
import { theoryTopics } from '../src/pages/dbh2-zatikiak-prototype/content.ts'

test('parts model toggles, resizes and keeps the coloured count', () => {
    let state: PartsState = { ...initialPartsState, denominator: 4 }
    state = togglePart(state, 0)
    state = togglePart(state, 2)
    assert.deepEqual(state.filled, [0, 2])
    state = togglePart(state, 0)
    assert.deepEqual(state.filled, [2])
    assert.equal(togglePart(state, 4), state, 'ignores parts outside the drawn units')

    state = fillAllParts(state)
    assert.equal(state.filled.length, 4)
    state = setPartsDenominator(state, 6)
    assert.equal(state.filled.length, 4, 'keeps how many parts are coloured')
    state = setPartsDenominator(state, 3)
    assert.equal(state.filled.length, 3, 'never colours more parts than fit')

    state = setPartsUnits({ ...state, filled: [0, 1, 2, 3, 4] , units: 2 }, 1)
    assert.deepEqual(state.filled, [0, 1, 2], 'drops parts of removed units')
    assert.equal(setPartsUnits(state, 9).units, 4)
    assert.equal(setPartsDenominator(state, 1).denominator, 2)
    assert.deepEqual(clearParts(state).filled, [])
})

test('rectangle layout splits every denominator exactly and as square as possible', () => {
    assert.deepEqual(gridLayout(12), { rows: 3, columns: 4 })
    assert.deepEqual(gridLayout(9), { rows: 3, columns: 3 })
    assert.deepEqual(gridLayout(7), { rows: 1, columns: 7 })
    for (let denominator = 2; denominator <= 12; denominator += 1) {
        const { rows, columns } = gridLayout(denominator)
        assert.equal(rows * columns, denominator)
        assert.ok(rows <= columns)
    }
})

test('parts challenges are reachable and not solved by the starting state', () => {
    const solutions: Record<number, PartsState> = {
        701: { shape: 'bar', denominator: 4, units: 1, filled: [0, 1, 2] },
        702: { shape: 'circle', denominator: 6, units: 1, filled: [0, 1, 2, 3, 4] },
        703: { shape: 'grid', denominator: 3, units: 3, filled: [0, 1, 2, 3, 4, 5, 6] },
        704: { shape: 'bar', denominator: 8, units: 1, filled: [1, 3, 5, 7] }
    }
    for (const challenge of partsChallenges) {
        assert.equal(challenge.isSolved(initialPartsState), false, `${challenge.id} is solved before starting`)
        assert.equal(challenge.isSolved(solutions[challenge.id]), true, `${challenge.id} cannot be solved`)
        for (const language of ['eu', 'es', 'ar'] as const) {
            assert.ok(challenge.prompt[language].trim())
            assert.ok(challenge.hint[language].trim())
        }
    }
    assert.equal(new Set(labChallengeIds).size, labChallengeIds.length)
})

test('every lab tool and lesson link points to something that exists', () => {
    const topicIds = new Set(theoryTopics.map((topic) => topic.id))
    const toolIds = new Set(labTools.map((tool) => tool.id))
    for (const tool of labTools) {
        assert.ok(topicIds.has(tool.lessonTopic), `${tool.id} links to a missing lesson`)
        for (const language of ['eu', 'es', 'ar'] as const) {
            assert.ok(tool.title[language].trim())
            assert.ok(tool.observe[language].trim())
        }
    }
    for (const [topic, tool] of Object.entries(labToolForTopic)) {
        assert.ok(topicIds.has(topic as never), `unknown lesson ${topic}`)
        assert.ok(toolIds.has(tool), `unknown tool ${tool}`)
    }
})

test('number line keeps the point on the chosen range and jumps', () => {
    let state: NumberLineState = { ...initialNumberLineState, range: '0-1', denominator: 4, numerator: 3 }
    state = setNumberLineDenominator(state, 8)
    assert.equal(state.numerator, 6, '3/4 stays in place as 6/8')
    state = setNumberLineDenominator(state, 3)
    assert.equal(state.numerator, 2, 'rounds to the nearest third')
    state = moveNumberLinePoint(state, 99)
    assert.equal(state.numerator, 3, 'cannot leave the range')
    state = setNumberLineRange({ ...state, numerator: 7, range: '0-3' }, '0-1')
    assert.equal(state.numerator, 3)
    assert.deepEqual(numberLineBounds({ range: '-2-2', denominator: 2, numerator: 0 }), { min: -4, max: 4 })
})

test('number line challenges accept every correct placement', () => {
    const [threeQuarters, sevenThirds, minusHalf, between] = numberLineChallenges
    assert.ok(threeQuarters.isSolved({ range: '0-1', denominator: 8, numerator: 6 }))
    assert.ok(!threeQuarters.isSolved(initialNumberLineState))
    assert.ok(sevenThirds.isSolved({ range: '0-3', denominator: 3, numerator: 7 }))
    assert.ok(minusHalf.isSolved({ range: '-2-2', denominator: 4, numerator: -2 }))
    assert.ok(between.isSolved({ range: '0-1', denominator: 12, numerator: 5 }))
    assert.ok(!between.isSolved({ range: '0-1', denominator: 12, numerator: 4 }), '1/3 itself is not between')
    assert.ok(!between.isSolved({ range: '0-1', denominator: 2, numerator: 1 }), '1/2 itself is not between')
})

test('fraction wall finds equivalents and pairs pieces for comparison', () => {
    assert.deepEqual(wallEquivalents({ numerator: 2, denominator: 3 }).map((piece) => `${piece.numerator}/${piece.denominator}`), ['2/3', '4/6', '6/9', '8/12'])
    assert.equal(wallEquivalents({ numerator: 1, denominator: 7 }).length, 1)

    let state = selectWallPiece(initialWallState, { numerator: 1, denominator: 7 })
    state = setWallMode(state, 'compare')
    assert.equal(state.first, null, 'a new mode starts a fresh selection')
    state = selectWallPiece(state, { numerator: 2, denominator: 3 })
    state = selectWallPiece(state, { numerator: 3, denominator: 4 })
    assert.ok(wallChallenges[3].isSolved(state))
    state = selectWallPiece(state, { numerator: 1, denominator: 2 })
    assert.deepEqual(state, { mode: 'compare', first: { numerator: 1, denominator: 2 }, second: null }, 'a third click starts a new pair')
})

test('fraction wall challenges', () => {
    const pick = (numerator: number, denominator: number) => selectWallPiece(initialWallState, { numerator, denominator })
    const [equivalent, larger, unit] = wallChallenges
    assert.ok(equivalent.isSolved(pick(8, 12)))
    assert.ok(!equivalent.isSolved(pick(2, 3)), 'needs a denominator greater than 3')
    assert.ok(larger.isSolved(pick(5, 8)))
    assert.ok(!larger.isSolved(pick(3, 5)))
    assert.ok(unit.isSolved(pick(1, 7)))
    assert.ok(!unit.isSolved(pick(1, 8)))
})
