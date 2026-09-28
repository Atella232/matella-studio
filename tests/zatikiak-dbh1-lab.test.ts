import test from 'node:test'
import assert from 'node:assert/strict'
import {
    fractionsIntroLabChallengeIds,
    fractionsIntroLabToolForTopic,
    fractionsIntroLabTools,
    INTRO_NUMBER_LINE_RANGES,
    introCompareChallenges,
    introEquivalenceChallenges,
    introNumberLineChallenges,
    introPartsChallenges,
    introProductChallenges,
    introProportionChallenges,
    introSumChallenges,
    introWallChallenges
} from '../src/pages/dbh1-zatikiak-v2/lab/labTools.ts'
import {
    compareRelation,
    initialCompareState,
    initialEquivalenceState,
    initialNumberLineState,
    initialPartsState,
    initialProductState,
    initialProportionState,
    initialSumState,
    initialWallState,
    labChallengeIds,
    moveNumberLinePoint,
    selectWallPiece,
    setCompareFraction,
    setEquivalenceBase,
    setNumberLineDenominator,
    setNumberLineRange,
    setPartsDenominator,
    setPartsUnits,
    setProductOp,
    setProductOperand,
    setSumOp,
    setSumOperand,
    setWallMode,
    togglePart,
    updateProportion
} from '../src/pages/dbh2-zatikiak-prototype/lab/labTools.ts'

const solved = <State>(challenges: Array<{ id: number; isSolved: (state: State) => boolean }>, id: number, state: State) =>
    challenges.find((challenge) => challenge.id === id)!.isSolved(state)

// Lesson ids of the unit (lessons.tsx cannot be loaded by node --test)
const topics = ['what', 'represent', 'division', 'types', 'mixed', 'line', 'equivalent', 'amplify-simplify', 'compare', 'add-same', 'add-different', 'multiply', 'divide', 'fraction-of', 'problems']

test('zatikiak 1. DBH lab: eight tools, every lesson has one and ids are unique', () => {
    assert.equal(fractionsIntroLabTools.length, 8)
    assert.equal(fractionsIntroLabChallengeIds.length, 32)
    assert.equal(new Set(fractionsIntroLabChallengeIds).size, 32)
    for (const topic of topics) assert.ok(fractionsIntroLabTools.some((tool) => tool.id === fractionsIntroLabToolForTopic[topic]), topic)
    for (const tool of fractionsIntroLabTools) assert.ok(topics.includes(tool.lessonTopic), tool.id)
    assert.ok(!fractionsIntroLabChallengeIds.some((id) => labChallengeIds.includes(id)))
    assert.ok(!INTRO_NUMBER_LINE_RANGES.some((range) => range.startsWith('-')))
})

test('zatikiak 1. DBH lab: every challenge can be solved with the tools', () => {
    let parts = setPartsDenominator({ ...initialPartsState, shape: 'circle' }, 8)
    for (const index of [0, 1, 2]) parts = togglePart(parts, index)
    assert.ok(solved(introPartsChallenges, 5101, parts))
    parts = setPartsUnits(parts, 2)
    for (let index = 3; index < 11; index += 1) parts = togglePart(parts, index)
    assert.ok(solved(introPartsChallenges, 5104, parts))

    let line = moveNumberLinePoint(setNumberLineDenominator(setNumberLineRange(initialNumberLineState, '0-2'), 3), 5)
    assert.ok(solved(introNumberLineChallenges, 5202, line))
    line = moveNumberLinePoint(setNumberLineDenominator(setNumberLineRange(initialNumberLineState, '0-3'), 4), 11)
    assert.ok(solved(introNumberLineChallenges, 5203, line))

    assert.ok(solved(introWallChallenges, 5301, selectWallPiece(initialWallState, { numerator: 3, denominator: 6 })))
    assert.ok(!solved(introWallChallenges, 5301, selectWallPiece(initialWallState, { numerator: 1, denominator: 2 })))
    const wall = selectWallPiece(selectWallPiece(setWallMode(initialWallState, 'compare'), { numerator: 3, denominator: 5 }), { numerator: 1, denominator: 2 })
    assert.ok(solved(introWallChallenges, 5304, wall))

    assert.ok(solved(introEquivalenceChallenges, 5401, setEquivalenceBase({ ...initialEquivalenceState, factor: 2 }, 3, 5)))
    assert.ok(solved(introEquivalenceChallenges, 5403, { ...setEquivalenceBase({ ...initialEquivalenceState, mode: 'simplify' }, 6, 9), divisor: 3 }))
    assert.ok(solved(introEquivalenceChallenges, 5404, { ...setEquivalenceBase({ ...initialEquivalenceState, mode: 'simplify' }, 10, 12), divisor: 2 }))

    let compare = setCompareFraction(setCompareFraction(initialCompareState, 'first', 3, 5), 'second', 3, 8)
    compare = { ...compare, guess: compareRelation(compare) }
    assert.ok(solved(introCompareChallenges, 5502, compare))
    assert.ok(!solved(introCompareChallenges, 5502, { ...compare, guess: '<' }))

    let sum = setSumOperand(setSumOperand(setSumOp(initialSumState, 'subtract'), 'first', 5, 6), 'second', 1, 3)
    assert.ok(solved(introSumChallenges, 5603, { ...sum, answer: '1/2' }))
    sum = setSumOperand(setSumOperand(initialSumState, 'first', 1, 3), 'second', 4, 6)
    assert.ok(solved(introSumChallenges, 5604, sum))

    let product = setProductOperand(setProductOperand(initialProductState, 'first', 2, 3), 'second', 3, 4)
    assert.ok(solved(introProductChallenges, 5701, { ...product, answer: '1/2' }))
    assert.ok(!solved(introProductChallenges, 5701, { ...product, answer: '6/12' }))
    product = setProductOperand(setProductOperand(setProductOp(initialProductState, 'divide'), 'first', 3, 4), 'second', 1, 8)
    assert.ok(solved(introProductChallenges, 5703, { ...product, answer: '6' }))

    assert.ok(solved(introProportionChallenges, 5801, { ...updateProportion(initialProportionState, { numerator: 3, denominator: 8, quantity: 120 }), answer: '45' }))
    assert.ok(solved(introProportionChallenges, 5804, { ...updateProportion(initialProportionState, { numerator: 3, denominator: 4, quantity: 60 }), answer: '45' }))
    assert.ok(!solved(introProportionChallenges, 5804, { ...updateProportion(initialProportionState, { numerator: 1, denominator: 2, quantity: 60 }), answer: '45' }))
})
