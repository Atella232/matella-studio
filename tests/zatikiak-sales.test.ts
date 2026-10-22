import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import { equals, fraction, multiply } from '../src/pages/dbh2-zatikiak-prototype/math/fraction.ts'
import {
    createSaleRound,
    createSaleRounds,
    offerLabel,
    payShare,
    saleErrorTips,
    salesLevels,
    salesStars,
    SALES_ROUNDS,
    type SaleKind,
    type SaleRound
} from '../src/pages/dbh2-zatikiak-prototype/games/sales.ts'

const money = (round: SaleRound, index: number) => Number(round.options[index].label.es.replace(' €', ''))

/** The right amount, worked out again from the tag */
function rightAmount(round: SaleRound): number {
    const [offer] = round.offers
    const total = round.price * round.quantity
    if (round.kind === 'original') return round.price
    if (round.kind === 'save') return total - multiply(fraction(total), payShare(offer)).numerator
    return multiply(fraction(total), payShare(offer)).numerator
}

const texts = (round: SaleRound) => [round.question, ...round.steps, ...round.options.map((option) => option.label), ...round.offers.map(offerLabel)]

test('zatikiak sales: whole euros, one right option, and it is right', () => {
    const kinds: SaleKind[] = ['pay', 'save', 'compare', 'chained', 'chained-compare', 'original']
    for (const kind of kinds) {
        const errors = new Set<string>()
        for (let seed = 1; seed <= 150; seed += 1) {
            const round = createSaleRound(createRandom(seed * 7349 + kind.length), kind)
            const label = `${kind} ${seed}`
            assert.equal(round.kind, kind, label)
            assert.equal(round.options.filter((option) => option.correct).length, 1, label)
            assert.equal(new Set(round.options.map((option) => option.label.es)).size, round.options.length, label)
            round.options.forEach((option) => { if (!option.correct) errors.add(option.error ?? 'none') })
            if (kind === 'compare' || kind === 'chained-compare') {
                // The right offer is the cheapest, and no two offers cost the same
                const total = round.price * round.quantity
                const prices = round.offers.map((offer) => multiply(fraction(total), payShare(offer)))
                assert.ok(prices.every((value) => value.denominator === 1), label)
                const values = prices.map((value) => value.numerator)
                assert.equal(new Set(values).size, values.length, label)
                const right = round.options.findIndex((option) => option.correct)
                assert.equal(values[right], Math.min(...values), label)
                assert.ok(round.offers.length >= 2 && round.offers.length <= 3)
                if (kind === 'chained-compare') assert.ok(round.offers.some((offer) => offer.type === 'chain'), label)
                if (round.quantity > 1) assert.ok(round.offers.some((offer) => offer.type === 'take' && offer.take === round.quantity), label)
            } else {
                assert.equal(round.options.length, 4, label)
                round.options.forEach((_, index) => assert.ok(Number.isInteger(money(round, index)) && money(round, index) > 0, label))
                const right = round.options.findIndex((option) => option.correct)
                assert.equal(money(round, right), rightAmount(round), label)
                if (kind === 'original') assert.ok(round.paid !== null && round.paid < round.price)
            }
            // Every bar adds up: its parts, the paid share and the saved euros
            for (const bar of round.bars) {
                assert.ok(bar.paid > 0 && bar.paid <= bar.parts, label)
                assert.ok(equals(multiply(fraction(bar.total), fraction(bar.paid, bar.parts)), fraction(bar.paidValue)), label)
                assert.equal(bar.paidValue + bar.savedValue, bar.total, label)
            }
            for (const text of texts(round)) {
                for (const language of ['eu', 'es', 'ar'] as const) {
                    for (const [, formula] of text[language].matchAll(/\$([^$]+)\$/g)) {
                        katex.renderToString(formula, { throwOnError: true })
                        assert.ok(!/[؀-ۿ]/.test(formula), formula)
                    }
                    if (language === 'eu') assert.ok(!/\$[^$]+\$[a-z]/.test(text.eu), `${label}: ${text.eu}`)
                }
            }
        }
        // The wrong options come from more than one typical mistake
        if (kind !== 'compare' && kind !== 'chained-compare') assert.ok(errors.size >= 2, `${kind}: ${[...errors].join(',')}`)
    }
})

test('zatikiak sales: levels, tips and stars', () => {
    salesLevels.forEach((kinds, level) => {
        const rounds = createSaleRounds(createRandom(level + 11), level)
        assert.equal(rounds.length, SALES_ROUNDS)
        for (const kind of kinds) assert.ok(rounds.some((round) => round.kind === kind), `${level} ${kind}`)
    })
    for (const tip of Object.values(saleErrorTips)) for (const language of ['eu', 'es', 'ar'] as const) assert.ok(tip[language].length > 0)
    assert.deepEqual([6, 5, 4, 3, 2].map(salesStars), [3, 2, 2, 1, 0])
})
