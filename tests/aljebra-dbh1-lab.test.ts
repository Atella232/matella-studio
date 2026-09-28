import test from 'node:test'
import assert from 'node:assert/strict'
import {
    algebraLabChallengeIds,
    algebraLabToolForTopic,
    algebraLabTools,
    balanceChallenges,
    balanceExercises,
    balanceSolved,
    chooseTranslation,
    divideByBoxes,
    initialMachineState,
    initialTilesState,
    initialTranslateState,
    initialTrialState,
    machineChallenges,
    machineExpressions,
    machineValue,
    phraseCards,
    removeUnit,
    setMachine,
    setTiles,
    setTrialEquation,
    startBalance,
    tilesChallenges,
    tilesResult,
    translateChallenges,
    trialChallenges,
    trialEquations,
    trialSides,
    tryValue
} from '../src/pages/dbh1-aljebra-v2/lab/labTools.ts'
import { solve, termsLatex } from '../src/pages/dbh1-aljebra-v2/algebra.ts'

const solved = <State>(challenges: Array<{ id: number; isSolved: (state: State) => boolean }>, id: number, state: State) =>
    challenges.find((challenge) => challenge.id === id)!.isSolved(state)

const topics = ['letters', 'translate', 'value', 'monomial', 'like-terms', 'polynomial', 'add-monomials', 'multiply-monomials', 'brackets', 'equation', 'trial', 'transpose', 'solve', 'problems']

test('aljebra 1. DBH lab: five tools, every lesson has one and ids are unique', () => {
    assert.equal(algebraLabTools.length, 5)
    assert.equal(algebraLabChallengeIds.length, 19)
    assert.equal(new Set(algebraLabChallengeIds).size, 19)
    for (const topic of topics) assert.ok(algebraLabTools.some((tool) => tool.id === algebraLabToolForTopic[topic]), topic)
    for (const tool of algebraLabTools) assert.ok(topics.includes(tool.lessonTopic), tool.id)
})

test('aljebra 1. DBH lab: translating phrases', () => {
    for (const card of phraseCards) assert.equal(new Set(card.options).size, 3, card.id)
    const perfect = phraseCards.reduce((state, card) => chooseTranslation(state, card.id, card.options[0]), initialTranslateState)
    assert.ok(solved(translateChallenges, 7101, perfect) && solved(translateChallenges, 7102, perfect) && solved(translateChallenges, 7103, perfect))
    const wrongFirst = phraseCards.reduce((state, card) => chooseTranslation(chooseTranslation(state, card.id, card.options[1]), card.id, card.options[0]), initialTranslateState)
    assert.ok(solved(translateChallenges, 7101, wrongFirst) && !solved(translateChallenges, 7103, wrongFirst))
})

test('aljebra 1. DBH lab: the number machine', () => {
    assert.equal(machineValue(setMachine(initialMachineState, { expression: 1, x: -2 })), -11)
    assert.equal(machineValue(setMachine(initialMachineState, { expression: 4, x: 3 })), 4.5)
    for (const expression of machineExpressions) for (let x = -5; x <= 10; x += 1) assert.ok(Number.isInteger(expression.value(x) * 2), expression.latex)
    assert.ok(solved(machineChallenges, 7202, { ...setMachine(initialMachineState, { expression: 1, x: -2 }), answer: '−11' }))
    assert.ok(solved(machineChallenges, 7204, { ...setMachine(initialMachineState, { expression: 0, x: 5 }), answer: '11' }))
    assert.ok(!solved(machineChallenges, 7204, { ...setMachine(initialMachineState, { expression: 0, x: 4 }), answer: '11' }))
})

test('aljebra 1. DBH lab: algebra tiles add like terms only', () => {
    assert.equal(termsLatex(tilesResult(initialTilesState)), '5x+3')
    assert.ok(solved(tilesChallenges, 7301, initialTilesState))
    let tiles = setTiles(setTiles(initialTilesState, 'first', { squares: 1, bars: 4, units: 0 }), 'second', { squares: 5, bars: 1, units: 0 })
    assert.equal(termsLatex(tilesResult(tiles)), '6x^{2}+5x')
    assert.ok(solved(tilesChallenges, 7302, tiles))
    tiles = setTiles(setTiles(initialTilesState, 'first', { bars: 3, units: 3 }), 'second', { bars: 2, units: -3 })
    assert.ok(solved(tilesChallenges, 7303, tiles))
    tiles = { ...setTiles(initialTilesState, 'second', { bars: 3, units: 2 }), op: 'subtract' }
    assert.equal(termsLatex(tilesResult(tiles)), '0')
    assert.ok(solved(tilesChallenges, 7304, tiles))
})

test('aljebra 1. DBH lab: the balance keeps the solution and refuses unbalancing moves', () => {
    for (const exercise of balanceExercises) {
        let state = startBalance(exercise.id)
        while (state.left.b > 0) state = removeUnit(state)
        state = state.left.a > 1 ? divideByBoxes(state) : state
        assert.ok(balanceSolved(state), `exercise ${exercise.id}`)
        assert.equal(state.right, solve({ left: { a: exercise.a, b: exercise.b }, right: { a: 0, b: exercise.c } }))
        assert.equal(state.mistakes, 0)
        assert.ok(solved(balanceChallenges, 7400 + exercise.id, state))
    }
    const early = divideByBoxes(startBalance(4))
    assert.equal(early.mistakes, 1)
    assert.ok(!solved(balanceChallenges, 7404, divideByBoxes([0, 1, 2].reduce((state) => removeUnit(state), early))))
})

test('aljebra 1. DBH lab: trial and error finds every solution in range', () => {
    trialEquations.forEach((equation, index) => {
        const x = solve(equation)!
        assert.ok(Number.isInteger(x) && x >= -5 && x <= 12, `equation ${index}`)
        const state = tryValue(setTrialEquation(initialTrialState, index), x)
        const { left, right } = trialSides(state)
        assert.equal(left, right)
        assert.ok(solved(trialChallenges, 7501 + index, state))
    })
    let slow = setTrialEquation(initialTrialState, 2)
    for (const x of [0, 1, 2, 3, 5]) slow = tryValue(slow, x)
    assert.ok(!solved(trialChallenges, 7503, slow))
})
