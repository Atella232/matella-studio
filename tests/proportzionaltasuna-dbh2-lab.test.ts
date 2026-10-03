import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { fraction, toNumber } from '../src/features/unit-v2/math/fraction.ts'
import {
    chainChallenges,
    chainFinal,
    chainIndex,
    chooseCompoundProblem,
    chooseRelation,
    compoundChallenges,
    compoundProblems,
    compoundResult,
    initialChainState,
    initialCompoundState,
    initialInterestState,
    initialShareState,
    interestChallenges,
    interestOf,
    proportionDbh2LabChallengeIds,
    proportionDbh2LabToolForTopic,
    proportionDbh2LabTools,
    rightRelations,
    setChain,
    setInterest,
    setShare,
    shareChallenges,
    shareParts,
    type CompoundState
} from '../src/pages/dbh2-proportzionaltasuna-v2/lab/labTools.ts'

const topics = ['proportion-review', 'direct-review', 'inverse-review', 'compound-direct', 'compound-mixed', 'compound-unit', 'direct-share', 'share-problems', 'inverse-share', 'percent-forms', 'percent-total', 'percent-which', 'index', 'chained', 'interest']
const stages = ['proportions', 'compound', 'shares', 'percent', 'changes']
const solvedIds = (challenges: Array<{ id: number; isSolved: (state: never) => boolean }>, state: unknown) => challenges.filter((challenge) => challenge.isSolved(state as never)).map((challenge) => challenge.id)
const all = (challenges: Array<{ id: number }>) => challenges.map((challenge) => challenge.id)
const solvedBy = (challenges: Array<{ id: number; isSolved: (state: never) => boolean }>, states: unknown[]) => [...new Set(states.flatMap((state) => solvedIds(challenges, state)))].sort()

test('proportzionaltasuna 2. DBH lab: tools, topics and challenge ids', () => {
    assert.equal(proportionDbh2LabTools.length, 6)
    for (const tool of proportionDbh2LabTools) {
        assert.ok(stages.includes(tool.stage), tool.id)
        assert.ok(topics.includes(tool.lessonTopic), tool.id)
        // The observation box is plain text
        assert.ok(!tool.observe.es.includes('$'), tool.id)
    }
    for (const stage of stages) assert.ok(proportionDbh2LabTools.some((tool) => tool.stage === stage), stage)
    for (const topic of topics) assert.ok(proportionDbh2LabTools.some((tool) => tool.id === proportionDbh2LabToolForTopic[topic]), topic)
    assert.equal(new Set(proportionDbh2LabChallengeIds).size, proportionDbh2LabChallengeIds.length)
    for (const challenges of [compoundChallenges, shareChallenges, chainChallenges, interestChallenges]) {
        for (const challenge of challenges) {
            for (const language of ['eu', 'es', 'ar'] as const) {
                for (const text of [challenge.prompt[language], challenge.hint[language]]) {
                    for (const [, formula] of text.matchAll(/\$([^$]+)\$/g)) katex.renderToString(formula, { throwOnError: true })
                    if (language === 'ar') assert.ok(!text.includes('{,}'), text)
                }
            }
        }
    }
})

test('proportzionaltasuna 2. DBH lab: the compound machine gives the textbook answers', () => {
    assert.deepEqual(compoundProblems.map((_, problem) => {
        const [first, second] = rightRelations(problem)
        return toNumber(compoundResult({ problem, relations: [first, second] })!)
    }), [400, 30, 4, 10])
    let state: CompoundState = initialCompoundState
    // The wrong relation does not solve
    state = chooseRelation(chooseRelation(chooseCompoundProblem(state, 1), 0, 'direct'), 1, 'direct')
    assert.deepEqual(compoundResult(state), fraction(40, 3))
    assert.deepEqual(state.solved, [])
    for (let problem = 0; problem < compoundProblems.length; problem += 1) {
        state = chooseCompoundProblem(state, problem)
        const [first, second] = rightRelations(problem)
        state = chooseRelation(chooseRelation(state, 0, first), 1, second)
    }
    assert.deepEqual(solvedIds(compoundChallenges, state), all(compoundChallenges))
})

test('proportzionaltasuna 2. DBH lab: shares', () => {
    const make = (total: number, numbers: [number, number, number], relation: 'direct' | 'inverse') => {
        let state = setShare(initialShareState, { total, relation })
        numbers.forEach((value, index) => { state = setShare(state, { number: [index as 0 | 1 | 2, value] }) })
        return state
    }
    assert.deepEqual(shareParts(make(180, [2, 5, 8], 'direct')).map(toNumber), [24, 60, 96])
    assert.deepEqual(shareParts(make(620, [2, 3, 5], 'inverse')).map(toNumber), [300, 200, 120])
    assert.deepEqual(shareParts(make(22000, [1, 2, 3], 'inverse')).map(toNumber), [12000, 6000, 4000])
    // The parts always add up to the total
    for (const relation of ['direct', 'inverse'] as const) {
        const parts = shareParts(make(360, [3, 7, 9], relation))
        assert.ok(Math.abs(parts.reduce((sum, part) => sum + toNumber(part), 0) - 360) < 1e-9)
    }
    const states = [make(180, [8, 2, 5], 'direct'), make(620, [5, 3, 2], 'inverse'), make(120, [4, 4, 4], 'direct'), make(22000, [1, 2, 3], 'inverse')]
    assert.deepEqual(solvedBy(shareChallenges, states), all(shareChallenges).sort())
})

test('proportzionaltasuna 2. DBH lab: chained percentages', () => {
    const make = (start: number, changes: [number, number, number]) => changes.reduce((state, percent, index) => setChain(state, { change: [index as 0 | 1 | 2, percent] }), setChain(initialChainState, { start }))
    assert.equal(toNumber(chainFinal(make(100, [10, -10, 0]))), 99)
    assert.deepEqual(chainIndex(make(100, [-20, -10, 0])), fraction(72, 100))
    assert.equal(toNumber(chainFinal(make(200, [20, -25, 0]))), 180)
    assert.equal(setChain(initialChainState, { change: [0, 73] }).changes[0], 50)
    const states = [make(100, [10, -10, 0]), make(500, [-20, -10, 0]), make(80, [25, -20, 0]), make(200, [20, -25, 0])]
    assert.deepEqual(solvedBy(chainChallenges, states), all(chainChallenges).sort())
})

test('proportzionaltasuna 2. DBH lab: simple interest', () => {
    const make = (capital: number, rate: number, years: number) => setInterest(initialInterestState, { capital, rate, years })
    assert.equal(toNumber(interestOf(make(8000, 5, 3))), 1200)
    const states = [make(8000, 5, 3), make(3000, 4, 5), make(1000, 10, 10), make(5000, 5, 4)]
    assert.deepEqual(solvedBy(interestChallenges, states), all(interestChallenges).sort())
})
