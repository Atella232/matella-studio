import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import {
    checkCandidate,
    chooseKind,
    choosePlaneSystem,
    chooseRadical,
    eliminatedUnknown,
    equationsSystemsLabChallengeIds,
    equationsSystemsLabToolForTopic,
    equationsSystemsLabTools,
    initialPlaneState,
    initialRadicalState,
    initialReductionState,
    isTrueSolution,
    linearLatex,
    movePoint,
    planeChallenges,
    planeSystems,
    PLANE_LIMIT,
    radicalCandidates,
    radicalChallenges,
    radicalEquations,
    reductionChallenges,
    reductionRows,
    reductionSolution,
    reductionSystems,
    satisfies,
    setMultipliers,
    squaredQuadratic,
    squareRadical,
    systemKind,
    type PlaneState,
    type RadicalState,
    type ReductionState
} from '../src/pages/dbh4-aplikatuak-ekuazioak/lab/labTools.ts'

const topics = ['brackets', 'denominators', 'linear-problems', 'incomplete', 'formula', 'discriminant', 'factored', 'radical', 'quadratic-problems', 'two-unknowns', 'graphic', 'substitution', 'equalization', 'reduction', 'system-problems']
const stages = ['first-degree', 'quadratic', 'other', 'systems', 'methods']
const solvedIds = <State>(challenges: Array<{ id: number; isSolved: (state: State) => boolean }>, state: State) => challenges.filter((challenge) => challenge.isSolved(state)).map((challenge) => challenge.id)

test('ekuazioak 4. DBH ap lab: tools, topics and challenge ids', () => {
    assert.equal(equationsSystemsLabTools.length, 6)
    for (const tool of equationsSystemsLabTools) {
        assert.ok(stages.includes(tool.stage), tool.id)
        assert.ok(topics.includes(tool.lessonTopic), tool.id)
        assert.ok(!tool.observe.es.includes('$'), tool.id)
    }
    for (const stage of stages) assert.ok(equationsSystemsLabTools.some((tool) => tool.stage === stage), stage)
    for (const topic of topics) assert.ok(equationsSystemsLabTools.some((tool) => tool.id === equationsSystemsLabToolForTopic[topic]), topic)
    assert.equal(new Set(equationsSystemsLabChallengeIds).size, equationsSystemsLabChallengeIds.length)
    for (const challenges of [radicalChallenges, planeChallenges, reductionChallenges]) {
        for (const challenge of challenges) {
            for (const language of ['eu', 'es', 'ar'] as const) {
                for (const text of [challenge.prompt[language], challenge.hint[language]]) for (const [, formula] of text.matchAll(/\$([^$]+)\$/g)) katex.renderToString(formula, { throwOnError: true })
            }
        }
    }
})

test('ekuazioak 4. DBH ap lab: linear equations as LaTeX', () => {
    assert.equal(linearLatex([1, 1, 4]), 'x+y=4')
    assert.equal(linearLatex([2, -1, 5]), '2x-y=5')
    assert.equal(linearLatex([3, -2, -1]), '3x-2y=-1')
    assert.ok(satisfies([1, 2, 5], 1, 2))
    assert.ok(!satisfies([1, 2, 5], 2, 1))
})

test('ekuazioak 4. DBH ap lab: radical equations square to whole candidates', () => {
    assert.deepEqual(squaredQuadratic(radicalEquations[1]), [1, -11, 24])
    assert.deepEqual(radicalCandidates(radicalEquations[0]), [-1, 2])
    for (const equation of radicalEquations) {
        const candidates = radicalCandidates(equation)
        assert.equal(candidates.length, 2)
        for (const x of candidates) assert.ok(Number.isInteger(x))
        assert.ok(candidates.some((x) => isTrueSolution(equation, x)))
    }
    // Two equations with a false candidate, one with both true
    assert.equal(radicalEquations.filter((equation) => radicalCandidates(equation).every((x) => isTrueSolution(equation, x))).length, 1)
    let state: RadicalState = initialRadicalState
    // Checking before squaring does nothing
    assert.deepEqual(checkCandidate(state, 2), state)
    state = squareRadical(state)
    state = checkCandidate(state, -1)
    assert.deepEqual(solvedIds(radicalChallenges, state), [47101])
    const solveAll = (start: RadicalState) => radicalEquations.reduce((current, equation, index) => radicalCandidates(equation).reduce((s, x) => checkCandidate(s, x), squareRadical(chooseRadical(current, index))), start)
    assert.deepEqual(solvedIds(radicalChallenges, solveAll(initialRadicalState)), radicalChallenges.map((challenge) => challenge.id))
})

test('ekuazioak 4. DBH ap lab: systems on the plane', () => {
    assert.deepEqual(planeSystems.map(systemKind), ['one', 'one', 'one', 'none', 'infinite'])
    for (const system of planeSystems.slice(0, 3)) {
        const { x, y } = reductionSolution(system)
        assert.ok(Number.isInteger(x) && Number.isInteger(y) && Math.abs(x) <= PLANE_LIMIT && Math.abs(y) <= PLANE_LIMIT)
        for (const equation of [system.first, system.second]) assert.notEqual(equation[1], 0)
    }
    let state: PlaneState = movePoint(initialPlaneState, 3, 1)
    assert.deepEqual(state.hits, { 0: ['3,1'] })
    state = movePoint(choosePlaneSystem(state, 1), 2, -3)
    state = movePoint(choosePlaneSystem(state, 4), 3, 0)
    assert.deepEqual(solvedIds(planeChallenges, state), [47201, 47202])
    state = movePoint(state, 1, 1)
    state = planeSystems.reduce((current, system, index) => chooseKind(choosePlaneSystem(current, index), systemKind(system)), state)
    assert.deepEqual(solvedIds(planeChallenges, state), planeChallenges.map((challenge) => challenge.id))
    // The point never leaves the board
    assert.equal(movePoint(initialPlaneState, 99, -99).x, PLANE_LIMIT)
})

test('ekuazioak 4. DBH ap lab: the reduction method', () => {
    assert.deepEqual(reductionRows({ system: 0, m1: 2, m2: 1 }).sum, [11, 0, 33])
    assert.equal(eliminatedUnknown({ system: 0, m1: 2, m2: 1 }), 'y')
    assert.equal(eliminatedUnknown({ system: 0, m1: 5, m2: -3 }), 'x')
    assert.equal(eliminatedUnknown({ system: 0, m1: 1, m2: 1 }), null)
    for (const system of reductionSystems) {
        const { x, y } = reductionSolution(system)
        assert.ok(Number.isInteger(x) && Number.isInteger(y))
        assert.ok(satisfies(system.first, x, y) && satisfies(system.second, x, y))
    }
    let state: ReductionState = setMultipliers(initialReductionState, { m1: 2 })
    assert.deepEqual(solvedIds(reductionChallenges, state), [47301])
    // Multipliers skip 0
    assert.equal(setMultipliers(state, { m2: 0 }).m2, -1)
    state = setMultipliers(setMultipliers(state, { m1: 5 }), { m2: -3 })
    const choices: Array<[number, number]> = [[0, 0], [2, 3], [1, 1], [1, 1], [2, -3]]
    state = choices.reduce((current, [m1, m2], index) => (index === 0 ? current : setMultipliers(setMultipliers(setMultipliers(current, { system: index }), { m1 }), { m2 })), state)
    assert.deepEqual(solvedIds(reductionChallenges, state), reductionChallenges.map((challenge) => challenge.id))
})
