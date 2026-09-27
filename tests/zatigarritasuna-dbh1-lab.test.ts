import test from 'node:test'
import assert from 'node:assert/strict'
import {
    divisibilityIntroLabChallengeIds,
    divisibilityIntroLabToolForTopic,
    divisibilityIntroLabTools,
    divisorTable,
    initialTableState,
    INTRO_CRITERIA,
    introCriteriaChallenges,
    introJumpsChallenges,
    introLadderChallenges,
    introRectanglesChallenges,
    introSieveChallenges,
    introSortChallenges,
    introVennChallenges,
    setTableEntry,
    setTableValue,
    tableChallenges,
    tableComplete,
    type TableState
} from '../src/pages/dbh1-zatigarritasuna-v2/lab/labTools.ts'
import {
    circleNumber,
    classifyCard,
    divideLadder,
    divisibilityLabChallengeIds,
    initialCriteriaState,
    initialJumpsState,
    initialLadderState,
    initialRectanglesState,
    initialSieveState,
    initialSortState,
    initialVennState,
    problemCards,
    setCriteriaValue,
    setJumps,
    setLadderValue,
    setRectangles,
    setVenn
} from '../src/pages/dbh2-zatigarritasuna/lab/labTools.ts'
import { divisors } from '../src/pages/dbh2-zatigarritasuna/math.ts'

const solved = <State>(challenges: Array<{ id: number; isSolved: (state: State) => boolean }>, id: number, state: State) =>
    challenges.find((challenge) => challenge.id === id)!.isSolved(state)

// Lesson ids of the unit (lessons.tsx cannot be loaded by node --test)
const topics = ['relation', 'multiples', 'divisors', 'criteria-digit', 'criteria-sum', 'primes', 'factorization', 'divisor-table', 'gcd', 'lcm', 'which', 'method']

/** Fills every cell of the table with the right product */
function fillTable(value: number): TableState {
    let state = setTableValue(initialTableState, value)
    divisorTable(value)!.cells.forEach((cells, row) => cells.forEach((product, column) => { state = setTableEntry(state, row, column, String(product)) }))
    return state
}

test('zatigarritasuna 1. DBH lab: eight tools, every lesson has one and ids are unique', () => {
    assert.equal(divisibilityIntroLabTools.length, 8)
    assert.equal(divisibilityIntroLabChallengeIds.length, 31)
    assert.equal(new Set(divisibilityIntroLabChallengeIds).size, 31)
    for (const topic of topics) assert.ok(divisibilityIntroLabTools.some((tool) => tool.id === divisibilityIntroLabToolForTopic[topic]), topic)
    for (const tool of divisibilityIntroLabTools) assert.ok(topics.includes(tool.lessonTopic), tool.id)
    // Its own progress ids, even though the tools are shared with 2. DBH
    assert.ok(!divisibilityIntroLabChallengeIds.some((id) => divisibilityLabChallengeIds.includes(id)))
    assert.deepEqual([...INTRO_CRITERIA], [2, 3, 5, 9, 10])
})

test('zatigarritasuna 1. DBH lab: shared tools with first-year challenges', () => {
    let rectangles = setRectangles(initialRectanglesState, { total: 18, perRow: 3 })
    assert.ok(solved(introRectanglesChallenges, 3101, rectangles))
    for (const perRow of [1, 2, 3, 4]) rectangles = setRectangles(rectangles, { total: 24, perRow })
    assert.ok(solved(introRectanglesChallenges, 3102, rectangles))
    assert.ok(!solved(introRectanglesChallenges, 3102, setRectangles(initialRectanglesState, { total: 24, perRow: 4 })))
    rectangles = setRectangles(setRectangles(initialRectanglesState, { total: 13, perRow: 13 }), { perRow: 1 })
    assert.ok(solved(introRectanglesChallenges, 3104, rectangles))

    assert.ok(solved(introJumpsChallenges, 3201, { ...setJumps(initialJumpsState, { first: 3, second: 2 }), answer: '6' }))
    assert.ok(!solved(introJumpsChallenges, 3202, { ...setJumps(initialJumpsState, { first: 4, second: 6 }), answer: '24' }))
    assert.ok(solved(introJumpsChallenges, 3204, { ...setJumps(initialJumpsState, { first: 5, second: 10 }), answer: '10' }))

    assert.ok(!solved(introCriteriaChallenges, 3303, initialCriteriaState))
    assert.ok(solved(introCriteriaChallenges, 3303, setCriteriaValue(initialCriteriaState, 120)))
    assert.ok(solved(introCriteriaChallenges, 3304, setCriteriaValue(initialCriteriaState, 1008)))
    assert.ok(solved(introCriteriaChallenges, 3302, setCriteriaValue(initialCriteriaState, 12)))
    assert.ok(!solved(introCriteriaChallenges, 3302, setCriteriaValue(initialCriteriaState, 18)))

    let sieve = [2, 3, 5, 7].reduce(circleNumber, initialSieveState)
    assert.ok(solved(introSieveChallenges, 3404, sieve))
    assert.ok(solved(introSieveChallenges, 3403, { ...sieve, answer: '25' }))
    sieve = circleNumber(sieve, 11)
    assert.ok(!solved(introSieveChallenges, 3404, sieve))

    let ladder = setLadderValue(initialLadderState, 36)
    for (const prime of [2, 2, 3, 3]) ladder = divideLadder(ladder, prime)
    assert.ok(solved(introLadderChallenges, 3501, ladder))
    ladder = setLadderValue(ladder, 30)
    for (const prime of [2, 3, 5]) ladder = divideLadder(ladder, prime)
    assert.ok(solved(introLadderChallenges, 3504, ladder))

    assert.ok(solved(introVennChallenges, 3701, { ...setVenn(initialVennState, { first: 18, second: 12, ask: 'gcd' }), answer: '6' }))
    assert.ok(solved(introVennChallenges, 3704, { ...setVenn(initialVennState, { first: 8, second: 9, ask: 'lcm' }), answer: '72' }))
    assert.ok(!solved(introVennChallenges, 3704, { ...setVenn(initialVennState, { first: 4, second: 9, ask: 'lcm' }), answer: '36' }))

    const sorted = problemCards.reduce((state, card) => classifyCard(state, card.id, card.kind), initialSortState)
    assert.ok(solved(introSortChallenges, 3803, sorted))
    const mistaken = problemCards.reduce((state, card) => classifyCard(classifyCard(state, card.id, card.kind === 'gcd' ? 'lcm' : 'gcd'), card.id, card.kind), initialSortState)
    assert.ok(solved(introSortChallenges, 3801, mistaken) && !solved(introSortChallenges, 3803, mistaken))
})

test('zatigarritasuna 1. DBH lab: the divisor table lists every divisor', () => {
    for (let value = 2; value <= 200; value += 1) {
        const table = divisorTable(value)
        if (!table) continue
        assert.deepEqual(table.cells.flat().sort((a, b) => a - b), divisors(value), `${value}`)
    }
    assert.deepEqual(divisorTable(36), { top: [1, 2, 4], left: [1, 3, 9], cells: [[1, 2, 4], [3, 6, 12], [9, 18, 36]] })
    assert.deepEqual(divisorTable(16)?.left, [1])
    assert.equal(divisorTable(30), null)

    const table36 = fillTable(36)
    assert.ok(tableComplete(table36) && solved(tableChallenges, 3601, table36))
    // One wrong cell keeps it open
    const wrong = setTableEntry(setTableValue(initialTableState, 36), 0, 0, '2')
    assert.ok(!tableComplete(wrong))
    const table45 = fillTable(45)
    assert.ok(!solved(tableChallenges, 3602, table45))
    assert.ok(solved(tableChallenges, 3602, { ...table45, answer: '6' }))
    assert.ok(solved(tableChallenges, 3603, fillTable(24)))
    assert.ok(!solved(tableChallenges, 3603, fillTable(36)))
    assert.ok(solved(tableChallenges, 3604, fillTable(16)))
    assert.ok(!solved(tableChallenges, 3604, fillTable(13)))
    // Changing the number clears the cells but keeps the finished tables
    const next = setTableValue(table36, 45)
    assert.deepEqual(next.entries, {})
    assert.deepEqual(next.finished, [36])
})
