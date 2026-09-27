import test from 'node:test'
import assert from 'node:assert/strict'
import { digitSum, divisors, elevenSums, factorize, factorLatex, gcd, isPrime, lcm, sevenSteps } from '../src/pages/dbh2-zatigarritasuna/math.ts'
import {
    circleNumber,
    classifyCard,
    commonLandings,
    CRITERIA,
    criteriaChallenges,
    criterionWorking,
    crossedOut,
    divideLadder,
    divisibilityLabChallengeIds,
    divisibilityLabToolForTopic,
    divisibilityLabTools,
    initialCriteriaState,
    initialJumpsState,
    initialLadderState,
    initialRectanglesState,
    initialSieveState,
    initialSortState,
    initialVennState,
    jumpsChallenges,
    ladderChallenges,
    ladderRest,
    ladderStuck,
    PRIMES_UP_TO_100,
    problemCards,
    rectanglesChallenges,
    rectangleSplit,
    setCriteriaValue,
    setJumps,
    setLadderValue,
    setRectangles,
    setVenn,
    sieveChallenges,
    sieveComplete,
    sortChallenges,
    vennChallenges,
    vennRegions
} from '../src/pages/dbh2-zatigarritasuna/lab/labTools.ts'

const solved = <State>(challenges: Array<{ id: number; isSolved: (state: State) => boolean }>, id: number, state: State) =>
    challenges.find((challenge) => challenge.id === id)!.isSolved(state)

test('divisibility math: divisors, primes, factorizations and rules', () => {
    assert.deepEqual(divisors(36), [1, 2, 3, 4, 6, 9, 12, 18, 36])
    assert.deepEqual(factorize(360), [[2, 3], [3, 2], [5, 1]])
    assert.equal(factorLatex(factorize(1001)), '7\\cdot 11\\cdot 13')
    assert.equal(gcd(24, 36), 12)
    assert.equal(lcm(12, 18), 36)
    assert.equal(digitSum(4131), 9)
    assert.deepEqual(elevenSums(3234), { even: 6, odd: 6 })
    // The handout's examples for 7
    assert.deepEqual(sevenSteps(3232).map((step) => step.result), [319, 13])
    assert.deepEqual(sevenSteps(3234).map((step) => step.result), [315, 21])
    for (let value = 10; value < 3000; value += 1) {
        for (const criterion of CRITERIA) assert.equal(criterionWorking(criterion, value).applies, value % criterion === 0, `${value} / ${criterion}`)
    }
    assert.equal(PRIMES_UP_TO_100, 25)
    assert.ok(isPrime(97) && !isPrime(91))
})

test('divisibility lab: tools, topics and unique challenge ids', () => {
    assert.equal(divisibilityLabTools.length, 7)
    assert.equal(new Set(divisibilityLabChallengeIds).size, divisibilityLabChallengeIds.length)
    const ids = new Set(divisibilityLabTools.map((tool) => tool.id))
    for (const tool of Object.values(divisibilityLabToolForTopic)) assert.ok(tool && ids.has(tool))
})

test('rectangles find divisor pairs and show remainders', () => {
    let state = initialRectanglesState
    for (const perRow of [1, 2, 3, 4, 5, 6]) state = setRectangles(state, { total: 12, perRow })
    assert.deepEqual(state.found[12], [1, 2, 3, 4, 6, 12])
    assert.ok(solved(rectanglesChallenges, 1102, state))
    assert.deepEqual(rectangleSplit({ total: 25, perRow: 4 }), { rows: 6, rest: 1 })
    let prime = setRectangles(state, { total: 23, perRow: 1 })
    assert.ok(solved(rectanglesChallenges, 1104, prime))
    prime = setRectangles(state, { total: 25, perRow: 5 })
    assert.ok(!solved(rectanglesChallenges, 1104, prime))
})

test('frog jumps meet at the lcm', () => {
    assert.deepEqual(commonLandings({ first: 4, second: 6 }), [12, 24, 36, 48, 60])
    assert.ok(solved(jumpsChallenges, 1201, { ...setJumps(initialJumpsState, { first: 6, second: 4 }), answer: '12' }))
    assert.ok(solved(jumpsChallenges, 1202, { ...setJumps(initialJumpsState, { first: 6, second: 10 }), answer: '30' }))
    assert.ok(solved(jumpsChallenges, 1203, { ...setJumps(initialJumpsState, { first: 4, second: 9 }), answer: '36' }))
    assert.ok(!solved(jumpsChallenges, 1203, { ...setJumps(initialJumpsState, { first: 4, second: 6 }), answer: '24' }))
    assert.ok(solved(jumpsChallenges, 1204, { ...setJumps(initialJumpsState, { first: 3, second: 12 }), answer: '12' }))
})

test('criteria machine keeps the numbers tried', () => {
    const state = [12, 330, 3234, 161].reduce(setCriteriaValue, initialCriteriaState)
    for (const id of [1301, 1302, 1303, 1304]) assert.ok(solved(criteriaChallenges, id, state), String(id))
    assert.equal(setCriteriaValue(initialCriteriaState, 5).value, 10)
})

test('sieve: 2, 3, 5 and 7 are enough up to 100', () => {
    let state = initialSieveState
    for (const value of [2, 3, 5]) state = circleNumber(state, value)
    assert.ok(!sieveComplete(state))
    assert.equal(circleNumber(state, 9), state, 'crossed numbers cannot be circled')
    state = circleNumber(state, 7)
    assert.ok(sieveComplete(state))
    assert.equal(100 - crossedOut(state).size, 25)
    assert.ok(solved(sieveChallenges, 1403, { ...state, answer: '25' }))
    assert.ok(solved(sieveChallenges, 1404, circleNumber(state, 11)))
    assert.ok(!solved(sieveChallenges, 1404, circleNumber(circleNumber(circleNumber(initialSieveState, 2), 3), 11)))
})

test('factor ladder only accepts exact divisions', () => {
    let state = initialLadderState
    state = divideLadder(state, 7)
    assert.equal(state.rejected, 7)
    for (const prime of [2, 2, 2, 3, 3, 5]) state = divideLadder(state, prime)
    assert.equal(ladderRest(state), 1)
    assert.ok(solved(ladderChallenges, 1501, state))
    let other = setLadderValue(state, 1001)
    for (const prime of [7, 11, 13]) other = divideLadder(other, prime)
    assert.ok(solved(ladderChallenges, 1502, other))
    other = setLadderValue(other, 42)
    for (const prime of [2, 3, 7]) other = divideLadder(other, prime)
    assert.ok(solved(ladderChallenges, 1503, other))
    assert.ok(ladderStuck(setLadderValue(other, 289)), '289 = 17 · 17 has no button')
})

test('venn regions give the ZKH and the MKT', () => {
    assert.deepEqual(vennRegions(12, 18), { onlyFirst: [2], shared: [2, 3], onlySecond: [3] })
    assert.ok(solved(vennChallenges, 1601, { ...setVenn(initialVennState, { first: 36, second: 24 }), answer: '12' }))
    assert.ok(solved(vennChallenges, 1602, { ...setVenn(initialVennState, { ask: 'lcm' }), answer: '36' }))
    assert.ok(solved(vennChallenges, 1603, { ...setVenn(initialVennState, { first: 15, second: 22, ask: 'lcm' }), answer: '330' }))
    assert.ok(solved(vennChallenges, 1604, setVenn(initialVennState, { first: 12, second: 30 })))
})

test('sorting problems counts mistakes', () => {
    let state = initialSortState
    for (const card of problemCards) state = classifyCard(state, card.id, card.kind)
    for (const id of [1701, 1702, 1703]) assert.ok(solved(sortChallenges, id, state))
    const wrong = classifyCard(initialSortState, 'tiles', 'lcm')
    assert.equal(wrong.mistakes, 1)
    assert.equal(problemCards.filter((card) => card.kind === 'gcd').length, 4)
})

test('no challenge is solved by the starting state', () => {
    const starts: Array<[Array<{ isSolved: (state: never) => boolean }>, unknown]> = [
        [rectanglesChallenges, initialRectanglesState],
        [jumpsChallenges, initialJumpsState],
        [criteriaChallenges, initialCriteriaState],
        [sieveChallenges, initialSieveState],
        [ladderChallenges, initialLadderState],
        [vennChallenges, initialVennState],
        [sortChallenges, initialSortState]
    ]
    for (const [challenges, state] of starts) for (const challenge of challenges) assert.ok(!challenge.isSolved(state as never))
})
