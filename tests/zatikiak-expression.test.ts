import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import {
    currentTokens,
    EXPRESSION_PRESETS,
    expressionChallenges,
    expressionDone,
    expressionLatex,
    expressionValue,
    initialExpressionState,
    loadExpression,
    readyTargets,
    tapExpression,
    tapTargets,
    type ExpressionState
} from '../src/pages/dbh2-zatikiak-prototype/lab/expression.ts'
import { equals, fraction } from '../src/pages/dbh2-zatikiak-prototype/math/fraction.ts'

const results = [fraction(2, 3), fraction(3, 4), fraction(3, 4), fraction(3, 4), fraction(1, 2), fraction(1, 3), fraction(5, 4), fraction(-1, 12)]

/** Seeded choices, so a failing run can be repeated */
function seeded(seed: number) {
    let value = seed
    return () => {
        value = (value * 1103515245 + 12345) % 2147483648
        return value / 2147483648
    }
}

/** Taps ready operations in the order chosen by `pick` until the expression is a single number */
function solve(preset: number, pick: (ready: number[]) => number): ExpressionState {
    let state = loadExpression(preset)
    for (let guard = 0; !expressionDone(state); guard += 1) {
        assert.ok(guard < 20, `${preset} does not finish`)
        state = tapExpression(state, pick(readyTargets(currentTokens(state))))
    }
    return state
}

test('zatikiak expression: every order the rules allow keeps the value and ends in the result', () => {
    EXPRESSION_PRESETS.forEach((_, preset) => {
        const start = loadExpression(preset)
        assert.ok(equals(expressionValue(currentTokens(start)), results[preset]), `${preset}`)
        for (let run = 0; run < 12; run += 1) {
            const random = seeded(preset * 100 + run + 1)
            const state = solve(preset, (ready) => ready[Math.floor(random() * ready.length)])
            assert.equal(state.mistakes, 0)
            // Each line is a rewriting of the same value
            for (const line of state.lines) assert.ok(equals(expressionValue(line), results[preset]), `${preset} ${expressionLatex(line)}`)
            const [last] = currentTokens(state)
            assert.ok(last.kind === 'num' && equals(last.value, results[preset]))
        }
    })
})

test('zatikiak expression: an operation that has to wait is a mistake, with its rule and what it would give', () => {
    const tap = (preset: number, target: number) => tapExpression(loadExpression(preset), target)
    // 1/2 + 3/4 · 2/9: adding first gives 5/4 · 2/9
    let state = tap(0, 1)
    assert.equal(state.lines.length, 1)
    assert.equal(state.mistakes, 1)
    assert.ok(state.feedback?.kind === 'mistake' && state.feedback.reasons.join() === 'precedence' && equals(state.feedback.wrong!, fraction(5, 18)))
    assert.deepEqual(state.feedback.focus, [3])
    // 5/6 − 1/3 + 1/4: adding first takes 7/12 away
    state = tap(1, 3)
    assert.ok(state.feedback?.kind === 'mistake' && state.feedback.reasons.join() === 'left-to-right' && equals(state.feedback.wrong!, fraction(1, 4)))
    // 2/3 : 4/9 · 1/2: multiplying first divides by 2/9
    state = tap(2, 3)
    assert.ok(state.feedback?.kind === 'mistake' && state.feedback.reasons.join() === 'left-to-right' && equals(state.feedback.wrong!, fraction(3)))
    // (1/2 − 1/3) · 3 + (1/2)²: the dot waits for the bracket, and has no neighbour number on its left
    state = tap(3, 5)
    assert.ok(state.feedback?.kind === 'mistake' && state.feedback.reasons.join() === 'parentheses' && state.feedback.wrong === null)
    // The sum waits for the product and for the power: both rules are given, powers first
    state = tap(3, 7)
    assert.ok(state.feedback?.kind === 'mistake' && state.feedback.reasons.join() === 'power,precedence')
    // (2/3 − 1/2)² · 9 …: the square of the bracket waits for its inside
    state = tap(7, 4)
    assert.ok(state.feedback?.kind === 'mistake' && state.feedback.reasons.join() === 'parentheses')
    assert.deepEqual(state.feedback.focus, [2])

    // Every tap that is not ready is a mistake that leaves the expression as it was
    EXPRESSION_PRESETS.forEach((_, preset) => {
        const start = loadExpression(preset)
        const tokens = currentTokens(start)
        const ready = readyTargets(tokens)
        for (const target of tapTargets(tokens)) {
            const next = tapExpression(start, target)
            if (ready.includes(target)) {
                assert.equal(next.lines.length, 2)
                assert.equal(next.mistakes, 0)
            } else {
                assert.equal(next.lines.length, 1)
                assert.equal(next.mistakes, 1)
                assert.ok(next.feedback?.kind === 'mistake' && next.feedback.reasons.length > 0 && next.feedback.focus.length > 0 && next.feedback.focus.every((item) => ready.includes(item)), `${preset} ${target}`)
            }
        }
    })
    // Tapping something that is not an operation changes nothing, and a finished expression stays finished
    assert.equal(tapExpression(initialExpressionState, 0), initialExpressionState)
    const done = solve(0, (ready) => ready[0])
    assert.equal(tapExpression(done, 0), done)
})

test('zatikiak expression: the lines and challenges are written in LaTeX', () => {
    assert.equal(expressionLatex(currentTokens(loadExpression(6))), '\\frac{3}{4}-\\left(-\\frac{1}{2}\\right)^{3}\\div \\frac{1}{4}')
    EXPRESSION_PRESETS.forEach((_, preset) => {
        for (const line of solve(preset, (ready) => ready[ready.length - 1]).lines) katex.renderToString(expressionLatex(line), { throwOnError: true })
    })
    for (const challenge of expressionChallenges) {
        for (const text of Object.values(challenge.prompt)) {
            for (const [, formula] of text.matchAll(/\$([^$]+)\$/g)) {
                katex.renderToString(formula, { throwOnError: true })
                assert.ok(!/[؀-ۿ]/.test(formula), `${challenge.id}`)
            }
        }
    }
})

test('zatikiak expression: each challenge is a clean run of its expression', () => {
    const solvedIds = (state: ExpressionState) => expressionChallenges.filter((challenge) => challenge.isSolved(state)).map((challenge) => challenge.id)
    assert.deepEqual(solvedIds(initialExpressionState), [])
    for (const [index, preset] of [0, 1, 3, 6].entries()) {
        const clean = solve(preset, (ready) => ready[0])
        assert.deepEqual(solvedIds(clean), [expressionChallenges[index].id])
        // One mistake on the way spoils the run
        const wrongTarget = tapTargets(currentTokens(loadExpression(preset))).find((target) => !readyTargets(currentTokens(loadExpression(preset))).includes(target))!
        let state = tapExpression(loadExpression(preset), wrongTarget)
        while (!expressionDone(state)) state = tapExpression(state, readyTargets(currentTokens(state))[0])
        assert.deepEqual(solvedIds(state), [])
    }
})
