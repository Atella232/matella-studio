import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { evaluate } from './helpers/realsRaceCheck.ts'
import { equals, fraction, toNumber } from '../src/features/unit-v2/math/fraction.ts'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import {
    cheapestTotal,
    couponTotals,
    initialReceiptState,
    moveReceiptStep,
    RECEIPT_ORDERS,
    receiptAnswered,
    receiptChallenges,
    receiptExpression,
    receiptExtra,
    receiptLatex,
    receiptLines,
    receiptTotal,
    receiptValid,
    setReceipt,
    type ReceiptState,
    type ReceiptStep
} from '../src/pages/dbh4-aplikatuak-proportzionaltasuna/lab/receipt.ts'

const make = (patch: Partial<Pick<ReceiptState, 'price' | 'discount' | 'vat' | 'coupon' | 'order'>>, answer = '') => ({ ...setReceipt(initialReceiptState, patch), answer, checked: answer !== '' })

function checkText(text: LocalizedText, where: string) {
    for (const language of ['eu', 'es', 'en', 'ar'] as const) {
        const line = text[language]
        assert.equal(line.split('$').length % 2, 1, `${where}: ${line}`)
        for (const [, formula] of line.matchAll(/\$([^$]+)\$/g)) {
            katex.renderToString(formulaFor(language, formula), { throwOnError: true, strict: 'error' })
            assert.ok(!/[؀-ۿ]/.test(formula), `${where}: ${formula}`)
        }
        if (language === 'eu') assert.ok(!/\d-?(an|ean|ra|era|tik|etik|ko|eko|rekin|ekin|k|z)\b/.test(line), `${where}: ${line}`)
        if (language === 'ar') assert.ok(!line.includes('{,}') && !/\d,\d/.test(line), `${where}: ${line}`)
    }
}

test('proportzionaltasuna 4. DBH ap receipt: the lines and the total', () => {
    const bag = make({ price: 80, discount: 20, vat: 21, coupon: 0, order: ['discount', 'vat', 'coupon'] })
    // 80 − 16 = 64, + 13,44 = 77,44; the empty coupon is not a line
    assert.deepEqual(receiptLines(bag).map((line) => [line.step, toNumber(line.change), toNumber(line.after)]), [['discount', -16, 64], ['vat', 13.44, 77.44]])
    // The discount and the VAT in either order give the same total
    for (const order of RECEIPT_ORDERS) assert.ok(equals(receiptTotal(bag, order), fraction(7744, 100)))
    // A 5 € coupon: first 72,60, between the discount and the VAT 71,39, last 72,44
    const coupon = make({ price: 80, discount: 20, vat: 21, coupon: 5, order: ['discount', 'vat', 'coupon'] })
    assert.deepEqual(couponTotals(coupon).map((total) => toNumber(total!)), [72.6, 71.39, 72.44])
    assert.deepEqual(cheapestTotal(coupon), fraction(7139, 100))
    assert.equal(receiptExpression({ ...coupon, order: ['discount', 'coupon', 'vat'] }), '(80\\cdot 0{,}8-5)\\cdot 1{,}21')
    assert.equal(receiptExpression({ ...coupon, order: ['coupon', 'discount', 'vat'] }), '(80-5)\\cdot 0{,}8\\cdot 1{,}21')
    assert.equal(receiptLatex(coupon), '80\\cdot 0{,}8\\cdot 1{,}21-5=72{,}44')
    // A coupon bigger than what is left makes no sense
    assert.equal(receiptValid(make({ price: 20, discount: 50, coupon: 15, order: ['discount', 'coupon', 'vat'] })), false)
    assert.equal(receiptValid(make({ price: 20, discount: 50, coupon: 15, order: ['coupon', 'discount', 'vat'] })), true)
    // Long decimals: ≈ and an answer to the cent
    const odd = make({ price: 37, discount: 15, vat: 21, coupon: 0 })
    assert.ok(receiptLatex(odd).includes('\\approx 38{,}05'))
    assert.ok(receiptAnswered({ ...odd, answer: '38,05 €', checked: true }))
    assert.ok(!receiptAnswered({ ...odd, answer: '38,06', checked: true }))
})

test('proportzionaltasuna 4. DBH ap receipt: moving lines and clearing the answer', () => {
    const answered = { ...initialReceiptState, answer: '54,45', checked: true }
    assert.ok(receiptAnswered(answered))
    const moved = moveReceiptStep(answered, 'coupon', -1)
    assert.deepEqual(moved.order, ['discount', 'coupon', 'vat'])
    assert.equal(moved.answer, '')
    // The first line cannot go up, nor the last one down
    assert.equal(moveReceiptStep(answered, 'discount', -1), answered)
    assert.equal(moveReceiptStep(answered, 'coupon', 1), answered)
    assert.equal(setReceipt(answered, { price: initialReceiptState.price }).answer, '54,45')
    assert.equal(setReceipt(answered, { vat: 7 }).vat, 21)
    assert.equal(setReceipt(answered, { discount: 120 }).discount, 90)
    assert.equal(RECEIPT_ORDERS.length, 6)
    assert.equal(new Set(RECEIPT_ORDERS.map((order) => order.join())).size, 6)
})

test('proportzionaltasuna 4. DBH ap receipt: challenges', () => {
    const order = (...steps: ReceiptStep[]) => steps
    const states = [
        make({ price: 80, discount: 20, vat: 21, coupon: 0, order: order('discount', 'vat', 'coupon') }, '77,44'),
        make({ price: 80, discount: 20, vat: 21, coupon: 0, order: order('vat', 'discount', 'coupon') }, '77,44'),
        make({ price: 80, discount: 20, vat: 21, coupon: 5, order: order('discount', 'coupon', 'vat') }, '71,39'),
        make({ price: 30, discount: 10, vat: 4, coupon: 3, order: order('vat', 'discount', 'coupon') }, '25,08')
    ]
    states.forEach((state, index) => assert.ok(receiptChallenges[index].isSolved(state), String(receiptChallenges[index].id)))
    // Not in another order, without the answer, or on arrival
    assert.ok(!receiptChallenges[0].isSolved(states[1]))
    assert.ok(!receiptChallenges[2].isSolved({ ...states[2], order: ['discount', 'vat', 'coupon'], answer: '72,44' }))
    assert.ok(!receiptChallenges[3].isSolved({ ...states[3], answer: '' }))
    for (const challenge of receiptChallenges) {
        assert.ok(!challenge.isSolved(initialReceiptState), String(challenge.id))
        checkText(challenge.prompt, String(challenge.id))
        checkText(challenge.hint, String(challenge.id))
        // A hint that is only a formula gives the total of its challenge
        const formula = challenge.hint.es.match(/^\$([^$]+)\$$/)?.[1]
        if (formula) assert.ok(Math.abs(evaluate(formula)! - toNumber(receiptTotal(states[receiptChallenges.indexOf(challenge)]))) < 1e-9, formula)
    }
})

test('proportzionaltasuna 4. DBH ap receipt: endless challenges can be solved, are new and exact to the cent', () => {
    const prompts = new Set<string>()
    let cheapest = 0
    for (let seed = 1; seed <= 300; seed += 1) {
        const challenge = receiptExtra(createRandom(seed))
        const solution = challenge.solution!
        assert.ok(challenge.isSolved(solution), challenge.prompt.es)
        assert.ok(!challenge.isSolved(initialReceiptState), challenge.prompt.es)
        assert.ok(receiptValid(solution), challenge.prompt.es)
        assert.ok(!receiptLatex(solution).includes('approx'), challenge.prompt.es)
        // The working in the hint, when there is one, evaluates to the total
        const formula = challenge.hint.es.match(/^\$([^$]+)\$$/)?.[1]
        if (formula) assert.ok(Math.abs(evaluate(formula)! - toNumber(receiptTotal(solution))) < 1e-9, `${challenge.prompt.es} ${formula}`)
        else cheapest += 1
        checkText(challenge.prompt, challenge.prompt.es)
        checkText(challenge.hint, challenge.prompt.es)
        prompts.add(challenge.prompt.es)
    }
    assert.ok(prompts.size > 200, `only ${prompts.size} prompts`)
    assert.ok(cheapest > 30 && cheapest < 150, `${cheapest} cheapest-order challenges`)
})
