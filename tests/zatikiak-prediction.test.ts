import test from 'node:test'
import assert from 'node:assert/strict'
import {
    initialProductState,
    initialProportionState,
    initialSumState,
    productPrediction,
    proportionPrediction,
    setPrediction,
    setProductOp,
    setProductOperand,
    setSumOp,
    setSumOperand,
    sumPrediction,
    updateProportion
} from '../src/pages/dbh2-zatikiak-prototype/lab/labTools.ts'

const half = { numerator: 1, denominator: 2 }

test('zatikiak prediction: where the result is against the reference', () => {
    // Adding: against 1
    assert.equal(sumPrediction({ ...initialSumState, first: half, second: { numerator: 2, denominator: 4 } }).relation, '=')
    assert.equal(sumPrediction({ ...initialSumState, first: { numerator: 2, denominator: 3 }, second: { numerator: 3, denominator: 5 } }).relation, '>')
    assert.equal(sumPrediction(initialSumState).relation, '<')
    // Subtracting: positive, zero or negative
    const subtract = setSumOp(initialSumState, 'subtract')
    assert.equal(sumPrediction(subtract).relation, '>')
    assert.equal(sumPrediction({ ...subtract, first: { numerator: 1, denominator: 3 }, second: half }).relation, '<')
    assert.equal(sumPrediction({ ...subtract, first: half, second: { numerator: 3, denominator: 6 } }).relation, '=')
    // Multiplying by less than 1 shrinks, dividing by less than 1 grows, and 1 changes nothing
    assert.equal(productPrediction(initialProductState).relation, '<')
    assert.equal(productPrediction(setProductOp(initialProductState, 'divide')).relation, '>')
    assert.equal(productPrediction({ ...initialProductState, second: { numerator: 5, denominator: 5 } }).relation, '=')
    assert.equal(productPrediction({ ...initialProductState, op: 'divide', second: { numerator: 4, denominator: 4 } }).relation, '=')
    // Every pair of operands the tool can show follows the rule
    for (let a = 2; a <= 12; a += 1) for (let n = 1; n <= a; n += 1) for (let b = 2; b <= 12; b += 1) for (let m = 1; m <= b; m += 1) {
        const state = { ...initialProductState, first: { numerator: n, denominator: a }, second: { numerator: m, denominator: b } }
        const expected = m === b ? '=' : '<'
        assert.equal(productPrediction(state).relation, expected)
        assert.equal(productPrediction({ ...state, op: 'divide' }).relation, expected === '=' ? '=' : '>')
    }
    // A fraction or a percentage of a quantity: against half of it
    assert.equal(proportionPrediction(initialProportionState).relation, '>')
    assert.equal(proportionPrediction(updateProportion(initialProportionState, { mode: 'percent', percent: 50 })).relation, '=')
    assert.equal(proportionPrediction(updateProportion(initialProportionState, { mode: 'percent', percent: 25 })).relation, '<')
})

test('zatikiak prediction: the first guess stays, and a new question asks again', () => {
    let state = setPrediction(initialSumState, '>')
    assert.equal(state.prediction, '>')
    assert.equal(setPrediction(state, '<').prediction, '>')
    state = setSumOperand(state, 'first', 3, 4)
    assert.equal(state.prediction, null)
    assert.equal(setSumOp(setPrediction(state, '<'), 'subtract').prediction, null)
    assert.equal(setProductOperand(setPrediction(initialProductState, '<'), 'second', 2, 3).prediction, null)
    assert.equal(updateProportion(setPrediction(initialProportionState, '>'), { quantity: 80 }).prediction, null)
})
