import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { fraction, toNumber } from '../src/features/unit-v2/math/fraction.ts'
import { initialProportionState, updateProportion, type ProportionState } from '../src/pages/dbh2-zatikiak-prototype/lab/labTools.ts'
import {
    changeChallenges,
    changeResult,
    chooseCard,
    chooseProportion,
    chooseStep,
    chooseUnitProblem,
    classifyCard,
    classifyChallenges,
    initialChangeState,
    initialClassifyState,
    initialRatioState,
    initialSolveState,
    initialUnitState,
    magnitudePairs,
    percentChallenges,
    proportionLabChallengeIds,
    proportionLabToolForTopic,
    proportionLabTools,
    proportionProblems,
    ratioChallenges,
    ratioValue,
    rightSteps,
    setChange,
    setRatio,
    setTableConstant,
    setTableKind,
    solveChallenges,
    solveX,
    tableChallenges,
    tableConstants,
    tableValues,
    TABLE_XS,
    unitChallenges,
    unitProblems,
    unitResults,
    updateSolve,
    type ClassifyState,
    type SolveState,
    type TableState,
    type UnitState
} from '../src/pages/dbh1-proportzionaltasuna-v2/lab/labTools.ts'

const topics = ['magnitude', 'ratio', 'proportion', 'direct', 'direct-unit', 'rule-of-three', 'inverse', 'inverse-unit', 'inverse-rule', 'percent-meaning', 'percent-of', 'which-percent', 'discount', 'increase', 'problems']
const stages = ['ratios', 'direct', 'inverse', 'percent', 'changes']
const solvedIds = (challenges: Array<{ id: number; isSolved: (state: never) => boolean }>, state: unknown) => challenges.filter((challenge) => challenge.isSolved(state as never)).map((challenge) => challenge.id)
const all = (challenges: Array<{ id: number }>) => challenges.map((challenge) => challenge.id)

test('proportzionaltasuna 1. DBH lab: tools, topics and challenge ids', () => {
    assert.equal(proportionLabTools.length, 7)
    for (const tool of proportionLabTools) {
        assert.ok(stages.includes(tool.stage), tool.id)
        assert.ok(topics.includes(tool.lessonTopic), tool.id)
    }
    for (const stage of stages) assert.ok(proportionLabTools.some((tool) => tool.stage === stage), stage)
    for (const topic of topics) assert.ok(proportionLabTools.some((tool) => tool.id === proportionLabToolForTopic[topic]), topic)
    assert.equal(new Set(proportionLabChallengeIds).size, proportionLabChallengeIds.length)
    assert.equal(proportionLabChallengeIds.length, 24)
    for (const challenges of [ratioChallenges, solveChallenges, classifyChallenges, tableChallenges, unitChallenges, percentChallenges, changeChallenges]) {
        for (const challenge of challenges) {
            for (const language of ['eu', 'es', 'ar'] as const) {
                for (const text of [challenge.prompt[language], challenge.hint[language]]) {
                    for (const [, formula] of text.matchAll(/\$([^$]+)\$/g)) katex.renderToString(formula, { throwOnError: true })
                    if (language === 'ar') assert.ok(!text.includes('{,}'), text)
                }
            }
        }
    }
    for (const tool of proportionLabTools) for (const [, formula] of tool.observe.es.matchAll(/\$([^$]+)\$/g)) katex.renderToString(formula, { throwOnError: true })
})

test('proportzionaltasuna 1. DBH lab: the ratio machine', () => {
    assert.equal(toNumber(ratioValue(setRatio(initialRatioState, { antecedent: 12, consequent: 20 }))), 0.6)
    const solved = [setRatio(initialRatioState, { antecedent: 4, consequent: 8 }), setRatio(initialRatioState, { antecedent: 12, consequent: 20 }), setRatio(initialRatioState, { antecedent: 5, consequent: 2 })].flatMap((state) => solvedIds(ratioChallenges, state))
    assert.deepEqual([...new Set(solved)].sort(), all(ratioChallenges).sort())
    assert.deepEqual(solvedIds(ratioChallenges, setRatio(initialRatioState, { antecedent: 1, consequent: 2 })), [])
})

test('proportzionaltasuna 1. DBH lab: solving proportions', () => {
    assert.deepEqual(proportionProblems.map((_, problem) => toNumber(solveX(problem))), [14, 18, 9, 7.5])
    let state: SolveState = initialSolveState
    // A revealed result does not count
    state = updateSolve(state, { revealed: true })
    state = updateSolve(state, { answer: '14', checked: true })
    assert.deepEqual(state.solved, [])
    for (let problem = 0; problem < proportionProblems.length; problem += 1) {
        state = chooseProportion(state, problem)
        state = updateSolve(state, { answer: String(toNumber(solveX(problem))).replace('.', ','), checked: true })
    }
    assert.deepEqual(state.solved, [0, 1, 2, 3])
    assert.deepEqual(solvedIds(solveChallenges, state), all(solveChallenges))
})

test('proportzionaltasuna 1. DBH lab: sorting pairs of magnitudes', () => {
    assert.deepEqual(['direct', 'inverse', 'none'].map((kind) => magnitudePairs.filter((pair) => pair.kind === kind).length), [4, 4, 3])
    let state: ClassifyState = initialClassifyState
    for (let card = 0; card < magnitudePairs.length; card += 1) state = classifyCard(chooseCard(state, card), magnitudePairs[card].kind)
    assert.deepEqual(solvedIds(classifyChallenges, state), all(classifyChallenges))
    const wrong = classifyCard(chooseCard(state, 2), 'direct')
    assert.deepEqual(solvedIds(classifyChallenges, wrong), all(classifyChallenges).slice(0, 2))
})

test('proportzionaltasuna 1. DBH lab: tables keep the ratio or the product', () => {
    const states: TableState[] = []
    for (const kind of ['direct', 'inverse'] as const) {
        for (let index = 0; index < tableConstants[kind].length; index += 1) {
            const state = setTableConstant(setTableKind(kind), index)
            states.push(state)
            const ys = tableValues(state).map(toNumber)
            const keep = TABLE_XS.map((x, column) => (kind === 'direct' ? ys[column] / x : ys[column] * x))
            assert.ok(keep.every((value) => Math.abs(value - keep[0]) < 1e-9), `${kind} ${index}`)
        }
    }
    const solved = states.flatMap((state) => solvedIds(tableChallenges, state))
    assert.deepEqual([...new Set(solved)].sort(), all(tableChallenges).sort())
})

test('proportzionaltasuna 1. DBH lab: two steps to the answer', () => {
    assert.deepEqual(unitProblems.map((_, problem) => {
        const [first, second] = rightSteps(problem)
        return toNumber(unitResults({ problem, first, second }).wanted!)
    }), [60, 30, 6, 9])
    let state: UnitState = initialUnitState
    // A wrong first step does not solve
    state = chooseStep(chooseStep(state, 'first', 'times'), 'second', 'divide')
    assert.deepEqual(state.solved, [])
    for (let problem = 0; problem < unitProblems.length; problem += 1) {
        state = chooseUnitProblem(state, problem)
        const [first, second] = rightSteps(problem)
        state = chooseStep(chooseStep(state, 'first', first), 'second', second)
    }
    assert.deepEqual(solvedIds(unitChallenges, state), all(unitChallenges))
})

test('proportzionaltasuna 1. DBH lab: the 2. DBH percentage tool with first-year challenges', () => {
    const answer = (patch: Partial<ProportionState>, typed: string): ProportionState => ({ ...updateProportion(initialProportionState, patch), answer: typed, checked: true })
    const states = [
        answer({ mode: 'percent', percent: 25, quantity: 80 }, '20'),
        answer({ mode: 'percent', percent: 15, quantity: 60 }, '9'),
        updateProportion(initialProportionState, { mode: 'forms', numerator: 3, denominator: 4 }),
        updateProportion(initialProportionState, { mode: 'forms', numerator: 2, denominator: 10 })
    ]
    const solved = states.flatMap((state) => solvedIds(percentChallenges, state))
    assert.deepEqual([...new Set(solved)].sort(), all(percentChallenges).sort())
    assert.deepEqual(solvedIds(percentChallenges, answer({ mode: 'percent', percent: 25, quantity: 80 }, '25')), [])
})

test('proportzionaltasuna 1. DBH lab: discounts and increases', () => {
    assert.deepEqual(changeResult(setChange(initialChangeState, { price: 60, percent: 15 })), { change: fraction(9), final: fraction(51), paid: 85 })
    const states = [
        setChange(initialChangeState, { kind: 'discount', price: 60, percent: 15 }),
        setChange(initialChangeState, { kind: 'increase', price: 75, percent: 15 }),
        setChange(initialChangeState, { kind: 'discount', price: 80, percent: 10 }),
        setChange(initialChangeState, { kind: 'increase', price: 200, percent: 5 })
    ]
    const solved = states.flatMap((state) => solvedIds(changeChallenges, state))
    assert.deepEqual([...new Set(solved)].sort(), all(changeChallenges).sort())
})
