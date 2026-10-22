import test from 'node:test'
import assert from 'node:assert/strict'
import {
    emptyWorksheet,
    initialSumState,
    markSumWorksheet,
    setPrediction,
    setSumOp,
    setSumOperand,
    setWorksheet,
    type SumState
} from '../src/pages/dbh2-zatikiak-prototype/lab/labTools.ts'

// 3/4 + 1/6: least common denominator 12, numerators 9 and 2, result 11/12
const sum: SumState = setSumOperand(setSumOperand(initialSumState, 'first', 3, 4), 'second', 1, 6)
const fill = (state: SumState, worksheet: Partial<typeof emptyWorksheet>, answer = '') => ({ ...setWorksheet(state, worksheet), answer })

test('zatikiak worksheet: every step right, with the least common denominator', () => {
    const marks = markSumWorksheet(fill(sum, { common: '12', first: '9', second: '2', numerator: '11' }, '11/12'))
    assert.deepEqual(marks, { common: 'right', least: true, first: 'right', second: 'right', numerator: 'right', result: 'right', factors: [3, 2] })
})

test('zatikiak worksheet: any common multiple works, and the numerators follow it', () => {
    const marks = markSumWorksheet(fill(sum, { common: '24', first: '18', second: '4', numerator: '22' }, '11/12'))
    assert.equal(marks.common, 'right')
    assert.equal(marks.least, false)
    assert.deepEqual(marks.factors, [6, 4])
    assert.equal(marks.first, 'right')
    assert.equal(marks.numerator, 'right')
    // 22/24 is the right value, but not simplified
    assert.equal(markSumWorksheet(fill(sum, { common: '24' }, '22/24')).result, 'wrong-form')
})

test('zatikiak worksheet: each mistake is marked where it is', () => {
    // Not a multiple of both denominators
    let marks = markSumWorksheet(fill(sum, { common: '10', first: '9', second: '2', numerator: '11' }))
    assert.deepEqual([marks.common, marks.first, marks.second, marks.numerator], ['wrong', 'waiting', 'waiting', 'waiting'])
    // Denominator changed but numerator not
    marks = markSumWorksheet(fill(sum, { common: '12', first: '3', second: '2', numerator: '5' }))
    assert.deepEqual([marks.first, marks.second, marks.numerator], ['wrong', 'right', 'waiting'])
    // Numerators right, but the denominators added as well is a wrong result
    marks = markSumWorksheet(fill(sum, { common: '12', first: '9', second: '2', numerator: '12' }, '11/24'))
    assert.deepEqual([marks.numerator, marks.result], ['wrong', 'wrong'])
    // Steps can be skipped: only the result is checked
    marks = markSumWorksheet(fill(sum, {}, '11/12'))
    assert.deepEqual([marks.common, marks.first, marks.second, marks.numerator, marks.result], ['empty', 'empty', 'empty', 'empty', 'right'])
    assert.equal(markSumWorksheet(fill(sum, {}, 'once')).result, 'unreadable')
    // Arabic digits count as well
    assert.equal(markSumWorksheet(fill(sum, { common: '١٢', first: '٩' })).first, 'right')
})

test('zatikiak worksheet: subtraction with a negative result, and mixed numbers', () => {
    // 1/6 − 3/4 = 2/12 − 9/12 = −7/12
    const difference = setSumOp(setSumOperand(setSumOperand(initialSumState, 'first', 1, 6), 'second', 3, 4), 'subtract')
    const marks = markSumWorksheet(fill(difference, { common: '12', first: '2', second: '9', numerator: '−7' }, '-7/12'))
    assert.deepEqual([marks.first, marks.second, marks.numerator, marks.result], ['right', 'right', 'right', 'right'])
    // 5/6 + 3/4 = 19/12 = 1 7/12: both ways are right
    const improper = setSumOperand(setSumOperand(initialSumState, 'first', 5, 6), 'second', 3, 4)
    assert.equal(markSumWorksheet(fill(improper, {}, '19/12')).result, 'right')
    assert.equal(markSumWorksheet(fill(improper, {}, '1 7/12')).result, 'right')
})

test('zatikiak worksheet: a new question clears the steps, editing a step asks for a new check', () => {
    const filled = { ...fill(sum, { common: '12', first: '9' }, '11/12'), checked: true }
    assert.deepEqual(setSumOperand(filled, 'first', 1, 2).worksheet, emptyWorksheet)
    assert.deepEqual(setSumOp(filled, 'subtract').worksheet, emptyWorksheet)
    assert.equal(setWorksheet(filled, { second: '2' }).checked, false)
    // The prediction does not touch the steps
    assert.deepEqual(setPrediction(filled, '<').worksheet, filled.worksheet)
})
