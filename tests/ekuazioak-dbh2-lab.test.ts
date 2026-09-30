import test from 'node:test'
import assert from 'node:assert/strict'
import { equals, fraction } from '../src/features/unit-v2/math/fraction.ts'
import { valueAt } from '../src/pages/dbh1-aljebra-v2/algebra.ts'
import {
    answerProblem,
    answerSolver,
    chooseEquation,
    clearedSide,
    clearsAll,
    discriminant,
    equationLcm,
    equationsLabChallengeIds,
    equationsLabToolForTopic,
    equationsLabTools,
    initialLcmState,
    initialProblemsState,
    initialQuadraticState,
    initialSolverState,
    initialTrialState,
    lcmChallenges,
    lcmEquations,
    lcmSolution,
    nextSolverStep,
    problemCards,
    problemsChallenges,
    quadraticChallenges,
    quadraticSolutions,
    setLcm,
    setProblem,
    setQuadratic,
    setSolverEquation,
    setTrialEquation,
    solverChallenges,
    solverEquations,
    solverSolution,
    solverStepCount,
    trialChallenges,
    trialEquations,
    tryValue
} from '../src/pages/dbh2-ekuazioak-v2/lab/labTools.ts'

const topics = ['meaning', 'elements', 'simple', 'brackets', 'special', 'denominators', 'lcm', 'mixed', 'problem-steps', 'problems-ages', 'problems-geometry', 'quadratic', 'incomplete', 'formula']
const solvedIds = <State>(challenges: Array<{ id: number; isSolved: (state: State) => boolean }>, state: State) => challenges.filter((challenge) => challenge.isSolved(state)).map((challenge) => challenge.id)

/** Evaluates one side of an equation written in LaTeX at x (fractions, brackets, implicit products) */
function side(latex: string, x: number): number {
    let js = latex.replace(/\s+/g, '').replace(/x/g, 'X')
    for (let pass = 0; pass < 2; pass += 1) js = js.replace(/\\frac\{([^{}]+)\}\{([^{}]+)\}/g, '(($1)/($2))')
    js = js.replace(/(\d|X|\))(?=X|\()/g, '$1*').replace(/X/g, `(${x})`)
    return Function(`return ${js}`)() as number
}

test('ekuazioak 2. DBH lab: tools, topics and challenge ids', () => {
    assert.equal(equationsLabTools.length, 5)
    for (const topic of topics) assert.ok(equationsLabToolForTopic[topic], topic)
    for (const tool of equationsLabTools) assert.ok(topics.includes(tool.lessonTopic), tool.id)
    assert.equal(new Set(equationsLabChallengeIds).size, 20)
})

test('ekuazioak 2. DBH lab: trying values', () => {
    let state = tryValue(initialTrialState, 3)
    assert.deepEqual(solvedIds(trialChallenges, state), [28101])
    state = setTrialEquation(state, 1)
    for (const x of [0, 4, -2]) state = tryValue(state, x)
    state = setTrialEquation(state, 3)
    for (const x of [1, 2, -3]) state = tryValue(state, x)
    state = setTrialEquation(state, 2)
    for (const x of [0, 1, 2, 3, 4]) state = tryValue(state, x)
    assert.deepEqual(solvedIds(trialChallenges, state), [28101, 28102, 28103, 28104])
    // The no-solution equation never balances
    for (let x = -6; x <= 10; x += 1) assert.notEqual(trialEquations[2].left(x), trialEquations[2].right(x))
})

test('ekuazioak 2. DBH lab: the step solver', () => {
    for (const equation of solverEquations) {
        const x = solverSolution(equation)
        const value = x.numerator / x.denominator
        const [left, right] = equation.latex.split('=')
        assert.ok(Math.abs(side(left, value) - side(right, value)) < 1e-9, equation.latex)
        assert.equal(valueAt(equation.left, value), valueAt(equation.right, value))
        if (equation.expanded) {
            const [expandedLeft, expandedRight] = equation.expanded.split('=')
            for (const point of [0, 2, -1]) {
                assert.ok(Math.abs(side(expandedLeft, point) - side(left, point)) < 1e-9, equation.expanded)
                assert.ok(Math.abs(side(expandedRight, point) - side(right, point)) < 1e-9, equation.expanded)
            }
        }
    }
    const solve = (state: typeof initialSolverState, index: number, early: boolean) => {
        let next = setSolverEquation(state, index)
        if (!early) for (let step = 1; step < solverStepCount(solverEquations[index]); step += 1) next = nextSolverStep(next)
        const x = solverSolution(solverEquations[index])
        return answerSolver(next, { answer: String(x.numerator / x.denominator), checked: true })
    }
    let state = solve(initialSolverState, 0, false)
    assert.deepEqual(solvedIds(solverChallenges, state), [28201])
    state = solve(solve(state, 2, true), 3, true)
    state = solve(state, 4, false)
    assert.deepEqual(solvedIds(solverChallenges, state), [28201, 28202, 28203, 28204])
    assert.equal(answerSolver(initialSolverState, { answer: '5', checked: true, revealed: true }).solved.length, 0)
})

test('ekuazioak 2. DBH lab: clearing denominators', () => {
    assert.deepEqual(lcmEquations.map(equationLcm), [6, 12, 4, 6])
    assert.deepEqual(lcmEquations.map((equation) => { const x = lcmSolution(equation); return x.numerator / x.denominator }), [6, 12, 7, 13])
    assert.ok(!clearsAll(lcmEquations[0], 4))
    assert.deepEqual(clearedSide(lcmEquations[2].left, 4), { a: 1, b: 5 })
    let state = setLcm(initialLcmState, { multiplier: 6 })
    state = setLcm(setLcm(state, { equation: 1 }), { multiplier: 12 })
    state = setLcm(setLcm(state, { equation: 2 }), { multiplier: 4 })
    state = setLcm(setLcm(state, { equation: 3 }), { multiplier: 6 })
    assert.deepEqual(solvedIds(lcmChallenges, state), [28301, 28302, 28303])
    state = setLcm(setLcm(state, { equation: 0 }), { multiplier: 12 })
    assert.deepEqual(solvedIds(lcmChallenges, state), [28301, 28302, 28303, 28304])
    // Changing the equation starts again from ×1
    assert.equal(setLcm({ ...initialLcmState, multiplier: 6 }, { equation: 2 }).multiplier, 1)
})

test('ekuazioak 2. DBH lab: planning problems', () => {
    for (const card of problemCards) {
        const x = card.answer.numerator / card.answer.denominator
        const [left, right] = card.options[0].split('=')
        assert.ok(Math.abs(side(left, x) - side(right, x)) < 1e-9, card.options[0])
        for (const option of card.options.slice(1)) {
            const [wrongLeft, wrongRight] = option.split('=')
            assert.ok(Math.abs(side(wrongLeft, x) - side(wrongRight, x)) > 1e-9, option)
        }
    }
    let state = answerProblem(chooseEquation(initialProblemsState, 1), { answer: '16', checked: true })
    assert.equal(state.solved.length, 0)
    for (let index = 0; index < problemCards.length; index += 1) {
        const card = problemCards[index]
        state = answerProblem(chooseEquation(setProblem(state, index), 0), { answer: String(card.answer.numerator), checked: true })
    }
    assert.deepEqual(solvedIds(problemsChallenges, state), [28401, 28402, 28403, 28404])
})

test('ekuazioak 2. DBH lab: the discriminant', () => {
    assert.deepEqual(quadraticSolutions(initialQuadraticState), [2, 3])
    assert.equal(discriminant({ a: 1, b: 2, c: 5 }), -16)
    assert.equal(setQuadratic({ a: 1, b: 0, c: 0 }, { a: 0 }).a, -1)
    assert.equal(setQuadratic({ a: -1, b: 0, c: 0 }, { a: 0 }).a, 1)
    assert.deepEqual(solvedIds(quadraticChallenges, initialQuadraticState), [28501])
    assert.deepEqual(solvedIds(quadraticChallenges, { a: 1, b: -6, c: 9 }), [28502])
    assert.deepEqual(solvedIds(quadraticChallenges, { a: 1, b: 2, c: 5 }), [28503])
    assert.deepEqual(solvedIds(quadraticChallenges, { a: 1, b: 0, c: -16 }), [28504])
    assert.ok(equals(fraction(6, 2), fraction(3)))
})
