import test from 'node:test'
import assert from 'node:assert/strict'
import { checkStep, chooseOperation, evaluateExpr, operationPaths, submitStep, type Expr, type HierarchyState } from '../src/features/unit-v2/math/expression.ts'
import { readNaturalAnswer } from '../src/pages/dbh1-zenbaki-naturalak-v2/numbers.ts'
import {
    abacusChallenges,
    abacusDigits,
    addRomanSymbol,
    distributiveChallenges,
    divisionChallenges,
    divisionParts,
    initialAbacusState,
    initialDistributiveState,
    initialDivisionState,
    initialLineState,
    initialPowersState,
    initialRomanState,
    initialRoundingState,
    lineChallenges,
    lineJump,
    markValue,
    naturalsLabChallengeIds,
    naturalsLabToolForTopic,
    naturalsLabTools,
    powersChallenges,
    removeRomanSymbol,
    romanChallenges,
    romanVerdict,
    roundingChallenges,
    roundTo,
    semaphoreChallenges,
    semaphoreExercises,
    setAbacus,
    setDistributive,
    setDivision,
    setLine,
    setPowers,
    setRounding,
    startSemaphore,
    stepPlace,
    updatePowersAnswer,
    type RomanState
} from '../src/pages/dbh1-zenbaki-naturalak-v2/lab/labTools.ts'

// Lesson ids of the unit (lessons.tsx cannot be loaded by node --test)
const naturalsTopics = ['place-value', 'big-numbers', 'order', 'roman', 'rounding', 'estimation', 'add-subtract', 'multiply', 'divide', 'hierarchy', 'brackets', 'problems', 'powers', 'powers-of-ten'].map((id) => ({ id }))

const solved = <State>(challenges: Array<{ id: number; isSolved: (state: State) => boolean }>, id: number, state: State) =>
    challenges.find((challenge) => challenge.id === id)!.isSolved(state)

test('naturals lab: eight tools, every lesson has one and ids are unique', () => {
    assert.equal(naturalsLabTools.length, 8)
    assert.equal(naturalsLabChallengeIds.length, 32)
    assert.equal(new Set(naturalsLabChallengeIds).size, naturalsLabChallengeIds.length)
    const ids = new Set(naturalsLabTools.map((tool) => tool.id))
    for (const topic of naturalsTopics) assert.ok(ids.has(naturalsLabToolForTopic[topic.id]!), topic.id)
    for (const tool of naturalsLabTools) assert.ok(naturalsTopics.some((topic) => topic.id === tool.lessonTopic), tool.id)
})

test('place value table exchanges ten for one', () => {
    assert.deepEqual(abacusDigits(8706265), [8, 7, 0, 6, 2, 6, 5])
    let state = setAbacus(99999)
    state = stepPlace(state, 0, 1)
    assert.equal(state.value, 100000)
    assert.ok(solved(abacusChallenges, 2104, state))
    assert.ok(!solved(abacusChallenges, 2104, setAbacus(100000)), 'typing it directly is not the point')
    assert.equal(stepPlace(setAbacus(0), 3, -1).value, 0, 'no negative numbers')
    assert.ok(solved(abacusChallenges, 2101, setAbacus(40001)))
    assert.ok(solved(abacusChallenges, 2102, setAbacus(170000)))
    assert.ok(!solved(abacusChallenges, 2102, initialAbacusState), '8.706.265 has its 7 in the hundreds of thousands')
    assert.ok(solved(abacusChallenges, 2103, setAbacus(50000)))
})

test('number line jumps are the distance shared in equal parts', () => {
    let state = setLine(initialLineState, { mark: 3 })
    assert.equal(lineJump(state), 100)
    assert.equal(markValue(state, 3), 730)
    assert.ok(solved(lineChallenges, 2201, { ...state, answer: '730' }))
    state = setLine(state, { from: 5000, to: 6000, mark: 1 })
    assert.ok(solved(lineChallenges, 2202, { ...state, answer: '5.250' }))
    assert.ok(solved(lineChallenges, 2203, setLine(state, { from: 0, to: 1000, parts: 8 })))
    assert.equal(lineJump({ from: 0, to: 1000, parts: 3 }), null)
    state = setLine(state, { from: 2000000, to: 3000000, parts: 5, mark: 2 })
    assert.ok(solved(lineChallenges, 2204, { ...state, answer: '2.400.000' }))
    assert.equal(setLine(state, { parts: 2, mark: 5 }).mark, 1, 'the mark stays inside the line')
})

test('roman numerals: building, reading and correcting', () => {
    const write = (text: string): RomanState => text.split('').reduce((state, symbol) => addRomanSymbol(state, symbol as 'I'), { written: '' })
    assert.deepEqual(romanVerdict('XIV'), { value: 14, suggestion: null })
    assert.deepEqual(romanVerdict('IIII'), { value: null, suggestion: 'IV' })
    assert.deepEqual(romanVerdict('IL'), { value: null, suggestion: 'XLIX' })
    assert.equal(removeRomanSymbol(initialRomanState).written, 'XI')
    assert.ok(solved(romanChallenges, 2301, write('MMXXVI')))
    assert.ok(solved(romanChallenges, 2302, write('XLIX')))
    assert.ok(!solved(romanChallenges, 2302, write('IL')))
    assert.ok(solved(romanChallenges, 2303, write('CMXLIV')))
    assert.ok(solved(romanChallenges, 2304, write('LXXXVIII')))
})

test('rounding: nearest round number, the exact half goes up', () => {
    assert.equal(roundTo(14823, 1000), 15000)
    assert.equal(roundTo(26421, 1000), 26000)
    assert.equal(roundTo(3500, 1000), 4000)
    assert.equal(roundTo(36905000, 1000000), 37000000)
    assert.ok(solved(roundingChallenges, 2401, { ...setRounding(initialRoundingState, { value: 26421 }), answer: '26.000' }))
    assert.ok(solved(roundingChallenges, 2402, { ...setRounding(initialRoundingState, { value: 359481, place: 10000 }), answer: '360000' }))
    assert.ok(solved(roundingChallenges, 2403, { ...setRounding(initialRoundingState, { value: 3500 }), answer: '4.000' }))
    assert.ok(!solved(roundingChallenges, 2403, { ...setRounding(initialRoundingState, { value: 3500 }), answer: '3.000' }))
    assert.ok(solved(roundingChallenges, 2404, { ...setRounding(initialRoundingState, { value: 7980, place: 100 }), answer: '8.000' }))
    assert.ok(!solved(roundingChallenges, 2404, { ...setRounding(initialRoundingState, { value: 14823, place: 100 }), answer: '14.800' }))
})

test('distributive rectangle and sharing counters', () => {
    assert.ok(solved(distributiveChallenges, 2501, { ...initialDistributiveState, answer: '60' }))
    assert.ok(solved(distributiveChallenges, 2502, { ...setDistributive(initialDistributiveState, { factor: 7, first: 10, second: 2 }), answer: '84' }))
    assert.ok(solved(distributiveChallenges, 2503, { ...setDistributive(initialDistributiveState, { factor: 8, first: 10, second: 5 }), answer: '120' }))
    assert.ok(solved(distributiveChallenges, 2504, { ...setDistributive(initialDistributiveState, { factor: 4, first: 10, second: 3 }), answer: '52' }))
    assert.ok(solved(distributiveChallenges, 2504, { ...setDistributive(initialDistributiveState, { factor: 2, first: 20, second: 6 }), answer: '52' }) === false, 'parts are at most 12')

    assert.deepEqual(divisionParts({ dividend: 17, divisor: 5 }), { quotient: 3, remainder: 2 })
    assert.ok(solved(divisionChallenges, 2601, { ...initialDivisionState, answer: '3' }))
    assert.ok(solved(divisionChallenges, 2602, setDivision(initialDivisionState, { dividend: 34, divisor: 7 })))
    assert.ok(solved(divisionChallenges, 2603, setDivision(initialDivisionState, { dividend: 48, divisor: 8 })))
    assert.ok(solved(divisionChallenges, 2604, { ...setDivision(initialDivisionState, { dividend: 38, divisor: 5 }), answer: '7' }))
    assert.ok(solved(divisionChallenges, 2604, { ...setDivision(initialDivisionState, { dividend: 38, divisor: 7 }), answer: '5' }))
})

/** Solves an exercise choosing the first valid operation and typing the right results */
function solve(state: HierarchyState): HierarchyState {
    let current = state
    while (current.expr.kind !== 'num') {
        const path = operationPaths(current.expr).find((candidate) => checkStep(current.expr, candidate) === 'ok')
        assert.ok(path, 'no valid step')
        current = chooseOperation(current, path)
        const node = current.selected && current.expr
        assert.ok(node)
        current = submitStep(current, true)
    }
    return current
}

test('semaphore exercises follow the order of operations', () => {
    assert.deepEqual(semaphoreExercises.map((item) => evaluateExpr(item.expr)), [44, 7, 12, 130])
    // 20 − (3 + 5) · 2 + 12 : 4 — the bracket goes first; the − waits
    const second = startSemaphore(2)
    const paths = operationPaths(second.expr)
    assert.deepEqual(paths.map((path) => checkStep(second.expr, path)), ['muldiv-first', 'ok', 'inside-first', 'muldiv-first', 'ok'])
    for (const exercise of semaphoreExercises) {
        const done = solve(startSemaphore(exercise.id))
        assert.equal((done.expr as Extract<Expr, { kind: 'num' }>).value, evaluateExpr(exercise.expr))
    }
    let state = startSemaphore(4)
    let stepCount = 0
    while (state.expr.kind !== 'num') {
        const path = operationPaths(state.expr).find((candidate) => checkStep(state.expr, candidate) === 'ok')!
        state = chooseOperation(state, path)
        stepCount += 1
        const node = path.reduce<Expr>((current, step) => (step === 'i' && current.kind === 'group' ? current.inner : current.kind === 'bin' ? (step === 'l' ? current.left : current.right) : current), state.expr)
        assert.ok(node.kind === 'bin' && node.left.kind === 'num' && node.right.kind === 'num')
        const value = evaluateExpr(node)
        // Results over a thousand may be typed with a point
        state = submitStep({ ...state, answer: value.toLocaleString('de-DE') }, false, readNaturalAnswer)
    }
    assert.equal(stepCount, 5)
    assert.ok(solved(semaphoreChallenges, 2704, state))
    const wrongOrder = chooseOperation(startSemaphore(2), [])
    assert.equal(wrongOrder.feedback, 'muldiv-first')
    assert.ok(!solved(semaphoreChallenges, 2702, solve(wrongOrder)))
})

test('powers remember the ones worked out', () => {
    let state = setPowers(initialPowersState, { base: 2, exponent: 5 })
    assert.ok(solved(powersChallenges, 2801, { ...state, answer: '32' }))
    assert.ok(solved(powersChallenges, 2802, { ...setPowers(state, { base: 5, exponent: 3 }), answer: '125' }))
    assert.ok(solved(powersChallenges, 2803, { ...setPowers(state, { base: 10, exponent: 6 }), answer: '1.000.000' }))
    state = updatePowersAnswer(setPowers(state, { base: 8, exponent: 2 }), { answer: '64', checked: true })
    assert.ok(!solved(powersChallenges, 2804, state))
    state = updatePowersAnswer(setPowers(state, { base: 4, exponent: 3 }), { answer: '64', checked: true })
    assert.ok(solved(powersChallenges, 2804, state))
    const revealed = updatePowersAnswer(setPowers(initialPowersState, { base: 2, exponent: 6 }), { revealed: true, checked: true, answer: '64' })
    assert.deepEqual(revealed.solved, [], 'a revealed result does not count')
})
