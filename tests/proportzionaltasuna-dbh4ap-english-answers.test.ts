import test from 'node:test'
import assert from 'node:assert/strict'
import { toExactDecimal } from '../src/features/unit-v2/math/fraction.ts'
import { readLabAnswer, typeLabAnswer } from '../src/pages/dbh4-aplikatuak-proportzionaltasuna/answers.ts'
import { initialPercentBarState, percentAnswered, setPercentBar } from '../src/pages/dbh4-aplikatuak-proportzionaltasuna/lab/percentBar.ts'
import { initialReceiptState, receiptAnswered, setReceipt } from '../src/pages/dbh4-aplikatuak-proportzionaltasuna/lab/receipt.ts'
import { expectedGraphAnswer, graphAnswered, initialRoadGraphState } from '../src/pages/dbh4-aplikatuak-proportzionaltasuna/lab/roadGraph.ts'
import { initialRuleState, ruleAnswered, setRule } from '../src/pages/dbh4-aplikatuak-proportzionaltasuna/lab/ruleOfThree.ts'

/* The lab checks read an answer typed on the English page with its commas between thousands (2,178 is two thousand one hundred and seventy-eight) */

const typed = <State extends { answer: string; english?: boolean }>(state: State, answer: string, language: 'eu' | 'es' | 'en' | 'ar') =>
    typeLabAnswer(state, { answer, checked: true }, language)

test('proportzionaltasuna 4. DBH ap lab answers: the reader keeps the language of the page', () => {
    assert.equal(readLabAnswer(typed({ answer: '' }, '18,700', 'en')), '18700')
    assert.equal(readLabAnswer(typed({ answer: '' }, '18,700', 'es')), '18,700')
    // A decimal comma stays a decimal comma in English too: 3,25 is not a group of thousands
    assert.equal(readLabAnswer(typed({ answer: '' }, '3,25', 'en')), '3,25')
    // A state without the flag reads as before
    assert.equal(readLabAnswer({ answer: '2,5 €' }), '2,5')
})

test('proportzionaltasuna 4. DBH ap lab answers: thousands with commas in English in every tool', () => {
    // The receipt: 2000 € with 10 % off and 21 % VAT is 2178 €
    const receipt = setReceipt(initialReceiptState, { price: 2000, discount: 10, vat: 21, coupon: 0 })
    assert.ok(receiptAnswered(typed(receipt, '2,178', 'en')))
    assert.ok(receiptAnswered(typed(receipt, '2,178.00 €', 'en')))
    assert.ok(!receiptAnswered(typed(receipt, '2,178', 'es')))
    assert.ok(receiptAnswered(typed(receipt, '2178', 'es')))
    // The 100 % bar: 15 % of 12 000 € is 1800 €
    const bar = setPercentBar(initialPercentBarState, { find: 'part', change: 'of', whole: 12000, rate: 15 })
    assert.ok(percentAnswered(typed(bar, '1,800', 'en')))
    assert.ok(!percentAnswered(typed(bar, '1,800', 'eu')))
    // The rule of three: 2 kg cost 1500 €, so 4 kg cost 3000 €
    const rule = { ...setRule(initialRuleState, { context: 'price', a: 2, b: 1500, c: 4 }), relation: 'direct' as const }
    assert.ok(ruleAnswered(typed(rule, '3,000', 'en')))
    assert.ok(!ruleAnswered(typed(rule, '3,000', 'es')))
    // The graph: the meeting minute, with an English decimal point
    const minute = toExactDecimal(expectedGraphAnswer(initialRoadGraphState)!, '.')!
    assert.ok(graphAnswered(typed(initialRoadGraphState, minute, 'en')))
})
