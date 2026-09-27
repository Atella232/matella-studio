import test from 'node:test'
import assert from 'node:assert/strict'
import {
    checkStep,
    chooseOperation,
    compareChallenges,
    countersChallenges,
    evaluateExpr,
    hierarchyChallenges,
    hierarchyExercises,
    initialCompareState,
    initialCountersState,
    initialJumpsState,
    initialLineState,
    initialMirrorState,
    initialSignsState,
    integerLabChallengeIds,
    integerLabToolForTopic,
    integerLabTools,
    jumpsChallenges,
    jumpsResult,
    lineChallenges,
    mirrorChallenges,
    operationPaths,
    reduceStep,
    setCompareValue,
    setJumps,
    setSignsDividend,
    setSignsOp,
    setSignsSize,
    signsChallenges,
    signsResult,
    startHierarchy,
    submitStep,
    type Expr,
    type HierarchyState
} from '../src/pages/dbh2-zenbaki-osoak/lab/labTools.ts'

const solved = <State>(challenges: Array<{ id: number; isSolved: (state: State) => boolean }>, id: number, state: State) =>
    challenges.find((challenge) => challenge.id === id)!.isSolved(state)

test('zenbaki osoak lab: every tool has 4 challenges and unique ids', () => {
    assert.equal(integerLabTools.length, 7)
    assert.equal(integerLabChallengeIds.length, 28)
    assert.equal(new Set(integerLabChallengeIds).size, 28)
    const tools = new Set(integerLabTools.map((tool) => tool.id))
    for (const tool of Object.values(integerLabToolForTopic)) assert.ok(tool && tools.has(tool))
})

test('zenbaki osoak lab: line, mirror and compare challenges', () => {
    assert.ok(!solved(lineChallenges, 1102, { ...initialLineState, value: -6 }))
    assert.ok(solved(lineChallenges, 1102, { context: 'temperature', value: -6 }))
    assert.ok(solved(lineChallenges, 1103, { context: 'floors', value: -2 }))
    assert.ok(solved(mirrorChallenges, 1203, { value: -5, showOpposite: true }))
    assert.ok(!solved(mirrorChallenges, 1203, { ...initialMirrorState, value: 5 }))

    const compare = setCompareValue(setCompareValue(initialCompareState, 'first', -8), 'second', -3)
    assert.equal(compare.guess, null)
    assert.ok(solved(compareChallenges, 1301, { ...compare, guess: '<' }))
    assert.ok(!solved(compareChallenges, 1301, { ...compare, guess: '>' }))
    assert.ok(solved(compareChallenges, 1302, { first: 4, second: -4, guess: '>' }))
    assert.ok(solved(compareChallenges, 1303, { first: -9, second: -2, guess: '<' }))
    assert.ok(!solved(compareChallenges, 1303, { first: 9, second: 2, guess: '>' }))
    assert.ok(solved(compareChallenges, 1304, { first: -1, second: 0, guess: '<' }))
})

test('zenbaki osoak lab: counters represent values with zero pairs', () => {
    assert.ok(solved(countersChallenges, 1401, { positive: 1, negative: 4 }))
    assert.ok(solved(countersChallenges, 1402, { positive: 4, negative: 4 }))
    assert.ok(solved(countersChallenges, 1403, { positive: 5, negative: 3 }))
    assert.ok(!solved(countersChallenges, 1403, initialCountersState))
    assert.ok(solved(countersChallenges, 1404, { positive: 10, negative: 13 }))
})

test('zenbaki osoak lab: jumps turn subtraction into adding the opposite', () => {
    const minusNegative = setJumps(initialJumpsState, { start: 2, op: 'subtract', amount: -5 })
    assert.equal(jumpsResult(minusNegative), 7)
    assert.ok(!solved(jumpsChallenges, 1502, minusNegative))
    assert.ok(solved(jumpsChallenges, 1502, { ...minusNegative, answer: '7', checked: true }))
    assert.ok(solved(jumpsChallenges, 1501, { ...initialJumpsState, answer: '+3' }))
    assert.ok(solved(jumpsChallenges, 1503, { ...setJumps(initialJumpsState, { start: 6, amount: -6 }), answer: '0' }))
    assert.ok(solved(jumpsChallenges, 1504, { ...setJumps(initialJumpsState, { start: -3, amount: -4 }), answer: '−7' }))
    assert.equal(setJumps(initialJumpsState, { amount: 40 }).amount, 9)
})

test('zenbaki osoak lab: sign rule tool never divides by zero', () => {
    assert.equal(setSignsSize({ ...initialSignsState, size: 1 }, 0).size, -1)
    assert.equal(setSignsSize({ ...initialSignsState, size: -1 }, 0).size, 1)
    const division = setSignsDividend(setSignsSize(setSignsOp(initialSignsState, 'divide'), 5), -20)
    assert.equal(division.groups, -4)
    assert.equal(signsResult(division), -4)
    assert.ok(solved(signsChallenges, 1603, { ...division, answer: '-4' }))
    assert.ok(solved(signsChallenges, 1601, { ...initialSignsState, answer: '-12' }))
    assert.ok(solved(signsChallenges, 1602, { ...initialSignsState, groups: -2, size: -3, answer: '6' }))
    assert.ok(solved(signsChallenges, 1604, { ...initialSignsState, groups: -4, size: 3, answer: '-12' }))
})

test('zenbaki osoak lab: hierarchy exercises match the textbook results', () => {
    assert.deepEqual(hierarchyExercises.map((item) => evaluateExpr(item.expr)), [35, 9, -8, 8])
})

/** Solves an exercise choosing the first valid operation each time */
function solve(state: HierarchyState): HierarchyState {
    let current = state
    while (current.expr.kind !== 'num') {
        const path = operationPaths(current.expr).find((candidate) => checkStep(current.expr, candidate) === 'ok')
        assert.ok(path, 'no valid step')
        current = chooseOperation(current, path)
        current = submitStep(current, true)
    }
    return current
}

test('zenbaki osoak lab: hierarchy respects brackets and products first', () => {
    const first = hierarchyExercises[0].expr
    const paths = operationPaths(first)
    // 20 − 3·(−4) + (−18):(−6): reading order is −, ·, +, :
    assert.deepEqual(paths.map((path) => checkStep(first, path)), ['muldiv-first', 'ok', 'muldiv-first', 'ok'])
    const afterProduct = reduceStep(first, paths[1])
    const nextPaths = operationPaths(afterProduct)
    assert.equal(checkStep(afterProduct, nextPaths[0]), 'muldiv-first')

    const second = hierarchyExercises[1].expr
    assert.equal(checkStep(second, []), 'muldiv-first')
    assert.equal(checkStep(second, ['r']), 'inside-first')
    const third = reduceStep(reduceStep(hierarchyExercises[2].expr, ['l', 'r', 'l', 'i']), ['r', 'r', 'i'])
    // (−4) − (−10):(−5) + (−6):(+3): the + waits for the products; after them, the − before the +
    assert.equal(checkStep(third, []), 'muldiv-first')
    const onlySums = reduceStep(reduceStep(third, ['l', 'r']), ['r'])
    assert.equal(checkStep(onlySums, []), 'left-first')
    assert.equal(checkStep(second, ['r', 'l', 'i']), 'ok', 'the subtraction inside the bracket goes first')

    for (const exercise of hierarchyExercises) {
        const done = solve(startHierarchy(exercise.id))
        assert.equal((done.expr as Extract<Expr, { kind: 'num' }>).value, evaluateExpr(exercise.expr))
        assert.ok(done.finished[exercise.id])
    }
})

test('zenbaki osoak lab: hierarchy challenges count mistakes', () => {
    let state = startHierarchy(2)
    const wrong = operationPaths(state.expr).find((path) => checkStep(state.expr, path) !== 'ok')!
    state = chooseOperation(state, wrong)
    assert.equal(state.orderMistakes, 1)
    state = solve(state)
    assert.ok(!solved(hierarchyChallenges, 1702, state))
    assert.ok(solved(hierarchyChallenges, 1702, solve(startHierarchy(2))))

    let typed = startHierarchy(4)
    while (typed.expr.kind !== 'num') {
        const path = operationPaths(typed.expr).find((candidate) => checkStep(typed.expr, candidate) === 'ok')!
        typed = chooseOperation(typed, path)
        const node = path.reduce<Expr>((current, step) => (current as never)[step === 'l' ? 'left' : step === 'r' ? 'right' : 'inner'], typed.expr)
        const { value } = reduceStep(node, []) as Extract<Expr, { kind: 'num' }>
        typed = submitStep({ ...typed, answer: String(value) })
    }
    assert.ok(solved(hierarchyChallenges, 1704, typed))
    assert.ok(!solved(hierarchyChallenges, 1704, solve(startHierarchy(4))), 'revealed steps count as mistakes')
})

test('zenbaki osoak lab: no challenge is solved by the starting state', () => {
    const starts: Array<[Array<{ isSolved: (state: never) => boolean }>, unknown]> = [
        [lineChallenges, initialLineState],
        [mirrorChallenges, initialMirrorState],
        [compareChallenges, initialCompareState],
        [countersChallenges, initialCountersState],
        [jumpsChallenges, initialJumpsState],
        [signsChallenges, initialSignsState],
        [hierarchyChallenges, startHierarchy(1)]
    ]
    for (const [challenges, state] of starts) {
        for (const challenge of challenges) assert.ok(!challenge.isSolved(state as never))
    }
})
