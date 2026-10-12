import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { planeChallenges, reductionChallenges } from '../src/pages/dbh4-aplikatuak-ekuazioak/lab/labTools.ts'
import {
    circleChallenges,
    circleDiscriminant,
    circlePoints,
    classifyChallenges,
    classifyKind,
    initialCircleState,
    initialClassifyState,
    initialHalfPlaneState,
    initialMixtureState,
    initialRegionState,
    initialShoppingState,
    initialSquaresState,
    initialSubstitutionState,
    isolatedLatex,
    halfPlaneChallenges,
    linearLatex,
    mixtureChallenges,
    mixtureScenarios,
    mixtureSolution,
    mixtureTotal,
    regionArea,
    regionChallenges,
    regionPoints,
    setClassify,
    setHalfPlane,
    setMixture,
    shoppingChallenges,
    shoppingPoints,
    squaresChallenges,
    squaresSolutions,
    substituted,
    substitutionChallenges,
    substitutionSystems,
    systemsLabChallengeIds,
    systemsLabToolForTopic,
    systemsLabTools,
    type CircleState,
    type ClassifyState,
    type HalfPlaneState,
    type MixtureState,
    type RegionState,
    type ShoppingState,
    type SquaresState,
    type SubstitutionState
} from '../src/pages/dbh4-akademikoak-sistemak/lab/labTools.ts'
import { clipPolygon, inHalfPlane, solveLinear } from '../src/pages/dbh4-akademikoak-sistemak/systems.ts'

const topics = ['linear-equations', 'graphic', 'classify', 'substitution', 'equalization', 'reduction', 'simplify-first', 'line-curve', 'squares', 'check-solutions', 'half-plane', 'region', 'linear-problems', 'nonlinear-problems', 'region-problems']
const stages = ['linear', 'methods', 'nonlinear', 'half-planes', 'problems']
const solvedIds = <State>(challenges: Array<{ id: number; isSolved: (state: State) => boolean }>, state: State) => challenges.filter((challenge) => challenge.isSolved(state)).map((challenge) => challenge.id)
/** Each challenge is solved by its own solution, and the starting state solves none */
function checkChallenges<State>(challenges: Array<{ id: number; isSolved: (state: State) => boolean }>, solutions: State[], start: State) {
    assert.equal(solutions.length, challenges.length)
    solutions.forEach((state, index) => assert.ok(solvedIds(challenges, state).includes(challenges[index].id), `${challenges[index].id}`))
    assert.deepEqual(solvedIds(challenges, start), [])
}
const renders = (latex: string) => katex.renderToString(latex, { throwOnError: true })

test('sistemak 4. DBH ak lab: tools, topics and challenge ids', () => {
    assert.equal(systemsLabTools.length, 10)
    for (const tool of systemsLabTools) {
        assert.ok(stages.includes(tool.stage), tool.id)
        assert.ok(topics.includes(tool.lessonTopic), tool.id)
        for (const language of ['eu', 'es', 'ar'] as const) assert.ok(!tool.observe[language].includes('$'), tool.id)
    }
    for (const stage of stages) assert.ok(systemsLabTools.some((tool) => tool.stage === stage), stage)
    for (const topic of topics) assert.ok(systemsLabTools.some((tool) => tool.id === systemsLabToolForTopic[topic]), topic)
    assert.equal(new Set(systemsLabChallengeIds).size, systemsLabChallengeIds.length)
    for (const borrowed of [planeChallenges, reductionChallenges]) assert.ok(borrowed.every((challenge) => systemsLabChallengeIds.includes(challenge.id)))
    for (const challenges of [classifyChallenges, substitutionChallenges, circleChallenges, squaresChallenges, halfPlaneChallenges, regionChallenges, mixtureChallenges, shoppingChallenges] as Array<Array<{ id: number; prompt: Record<string, string>; hint: Record<string, string> }>>) {
        for (const challenge of challenges) {
            assert.ok(challenge.id >= 67000 && challenge.id < 68000, `${challenge.id}`)
            for (const language of ['eu', 'es', 'ar']) {
                for (const text of [challenge.prompt[language], challenge.hint[language]]) {
                    for (const [, formula] of text.matchAll(/\$([^$]+)\$/g)) {
                        renders(formula)
                        assert.ok(!/[؀-ۿ]/.test(formula), `${challenge.id} ${formula}`)
                    }
                }
            }
        }
    }
})

test('sistemak 4. DBH ak lab: half-planes cut polygons right', () => {
    const square: Array<[number, number]> = [[0, 0], [4, 0], [4, 4], [0, 4]]
    const cut = clipPolygon(square, { a: 1, b: 1, c: 4, sense: '≤' })
    assert.deepEqual(cut.map((point) => point.join()).sort(), ['0,0', '0,4', '4,0'])
    assert.ok(inHalfPlane({ a: 2, b: 1, c: 4, sense: '≤' }, [0, 0]))
    assert.ok(!inHalfPlane({ a: 2, b: 1, c: 4, sense: '<' }, [2, 0]))
    assert.deepEqual(solveLinear({ a: 1, b: 1, c: 4 }, { a: 1, b: -1, c: 2 }), [3, 1])
})

test('sistemak 4. DBH ak lab: moving the second line', () => {
    assert.equal(linearLatex({ a: 0, b: 1, c: 0 }), 'y=0')
    assert.equal(linearLatex({ a: -1, b: 2, c: -3 }), '-x+2y=-3')
    // 0x + 0y is skipped
    assert.equal(setClassify({ first: 0, second: { a: 1, b: 0, c: 0 } }, { a: 0 }).second.a, -1)
    assert.equal(setClassify({ first: 0, second: { a: 0, b: 1, c: 0 } }, { b: 0 }).second.b, -1)
    assert.equal(classifyKind({ first: 0, second: { a: 2, b: 4, c: 6 } }), 'infinite')
    const solutions: ClassifyState[] = [
        { first: 0, second: { a: 2, b: 4, c: 5 } },
        { first: 1, second: { a: 4, b: -2, c: 8 } },
        { first: 0, second: { a: 1, b: -1, c: 0 } },
        { first: 2, second: { a: 0, b: 1, c: 0 } }
    ]
    checkChallenges(classifyChallenges, solutions, initialClassifyState)
})

test('sistemak 4. DBH ak lab: every way to substitute gives the same solution', () => {
    const expected = [[5, 2], [3, 2], [1, 2]]
    substitutionSystems.forEach((_, system) => {
        for (const equation of [0, 1] as const) for (const unknown of ['x', 'y'] as const) {
            const state: SubstitutionState = { system, equation, unknown }
            const { solution, k, c, value } = substituted(state)
            assert.ok(Math.abs(solution[0] - expected[system][0]) < 1e-9 && Math.abs(solution[1] - expected[system][1]) < 1e-9, `${system} ${equation} ${unknown}`)
            renders(isolatedLatex(state))
            assert.ok(Math.abs(c.numerator / c.denominator - (k.numerator / k.denominator) * (value.numerator / value.denominator)) < 1e-9)
        }
    })
    assert.equal(isolatedLatex({ system: 0, equation: 0, unknown: 'x' }), 'x=1+2y')
    assert.equal(isolatedLatex({ system: 1, equation: 0, unknown: 'y' }), 'y=\\frac{12-2x}{3}')
    assert.equal(isolatedLatex({ system: 1, equation: 1, unknown: 'y' }), 'y=\\frac{-11+5x}{2}')
    const solutions: SubstitutionState[] = [
        { system: 0, equation: 0, unknown: 'x' },
        { system: 2, equation: 1, unknown: 'x' },
        { system: 1, equation: 0, unknown: 'x' },
        { system: 0, equation: 1, unknown: 'y' }
    ]
    checkChallenges(substitutionChallenges, solutions, initialSubstitutionState)
})

test('sistemak 4. DBH ak lab: a line against a circle', () => {
    assert.deepEqual(circlePoints({ r: 5, m: -1, n: 7 }), [[3, 4], [4, 3]])
    for (let r = 1; r <= 6; r += 1) for (let m = -3; m <= 3; m += 1) for (let n = -9; n <= 9; n += 1) {
        const points = circlePoints({ r, m, n })
        assert.equal(points.length, circleDiscriminant({ r, m, n }) > 0 ? 2 : circleDiscriminant({ r, m, n }) === 0 ? 1 : 0)
        for (const [x, y] of points) {
            assert.ok(Math.abs(x * x + y * y - r * r) < 1e-9)
            assert.ok(Math.abs(y - (m * x + n)) < 1e-9)
        }
    }
    const solutions: CircleState[] = [{ r: 5, m: 0, n: 5 }, { r: 5, m: -1, n: 7 }, { r: 5, m: 0, n: 6 }, { r: 3, m: 2, n: 0 }]
    checkChallenges(circleChallenges, solutions, initialCircleState)
})

test('sistemak 4. DBH ak lab: two squares', () => {
    assert.equal(squaresSolutions({ A: 41, B: 9 }).length, 4)
    for (let A = 1; A <= 60; A += 1) for (let B = -30; B <= 30; B += 1) {
        for (const [x, y] of squaresSolutions({ A, B })) {
            assert.ok(Math.abs(x * x + y * y - A) < 1e-9)
            assert.ok(Math.abs(x * x - y * y - B) < 1e-9)
        }
    }
    const solutions: SquaresState[] = [{ A: 41, B: 9 }, { A: 9, B: 9 }, { A: 5, B: 9 }, { A: 13, B: 5 }]
    checkChallenges(squaresChallenges, solutions, initialSquaresState)
})

test('sistemak 4. DBH ak lab: a half-plane and its test point', () => {
    assert.equal(setHalfPlane({ ...initialHalfPlaneState, a: 0, b: 1 }, { b: 0 }).b, -1)
    const solutions: HalfPlaneState[] = [
        { a: 1, b: 1, c: -2, sense: '≤', px: 0, py: 0 },
        { a: 2, b: 1, c: 4, sense: '≤', px: 1, py: 1 },
        { a: 1, b: 1, c: 0, sense: '≥', px: 0, py: 0 },
        { a: 1, b: 1, c: 3, sense: '<', px: 1, py: 2 }
    ]
    checkChallenges(halfPlaneChallenges, solutions, initialHalfPlaneState)
})

test('sistemak 4. DBH ak lab: the whole points of the triangle', () => {
    assert.equal(regionPoints({ a: 1, b: 1, c: 4 }).length, 15)
    assert.equal(regionPoints({ a: 3, b: 2, c: 12 }).length, 19)
    assert.deepEqual(regionArea({ a: 1, b: 1, c: 5 }), { numerator: 25, denominator: 2 })
    const solutions: RegionState[] = [{ a: 1, b: 1, c: 3 }, { a: 3, b: 2, c: 12 }, { a: 1, b: 1, c: 5 }, { a: 3, b: 2, c: 12 }]
    checkChallenges(regionChallenges, solutions, initialRegionState)
})

test('sistemak 4. DBH ak lab: how many and how much', () => {
    mixtureScenarios.forEach((scenario, index) => {
        const x = mixtureSolution(index)
        assert.ok(Number.isInteger(x) && x >= 0 && x <= scenario.count && x % scenario.step === 0, `${index}`)
        assert.equal(mixtureTotal({ scenario: index, x }), scenario.total)
    })
    assert.deepEqual([0, 1, 2, 3].map(mixtureSolution), [12, 15, 70, 15])
    // Changing the scenario starts again from 0, and x follows the step
    assert.equal(setMixture({ scenario: 0, x: 12 }, { scenario: 2 }).x, 0)
    assert.equal(setMixture({ scenario: 2, x: 0 }, { x: 74 }).x, 70)
    const solutions: MixtureState[] = [0, 1, 2, 3].map((scenario) => ({ scenario, x: mixtureSolution(scenario) }))
    checkChallenges(mixtureChallenges, solutions, initialMixtureState)
})

test('sistemak 4. DBH ak lab: shopping under a budget', () => {
    assert.equal(shoppingPoints({ budget: 12, p: 3, q: 2, x: 0, y: 0 }).length, 19)
    const solutions: ShoppingState[] = [
        { budget: 12, p: 3, q: 2, x: 0, y: 6 },
        { budget: 12, p: 3, q: 2, x: 1, y: 4 },
        { budget: 12, p: 3, q: 2, x: 2, y: 3 },
        { budget: 20, p: 4, q: 2, x: 0, y: 10 }
    ]
    checkChallenges(shoppingChallenges, solutions, initialShoppingState)
})
