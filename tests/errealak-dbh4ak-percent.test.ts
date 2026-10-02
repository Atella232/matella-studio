import test from 'node:test'
import assert from 'node:assert/strict'
import { applyChanges, cents, chainedIndex, compoundFinal, indexToPercent, initialAmount, interestTable, money, percentOf, percentWhich, simpleInterest, variationIndex } from '../src/pages/dbh4-akademikoak-errealak/percent.ts'

test('errealak eta ehunekoak 4. DBH: percentages, indices and chains, like the textbook', () => {
    assert.equal(percentOf(16, 220), 35.2)
    assert.equal(percentOf(8.5, 48), 4.08)
    assert.equal(percentWhich(25, 200), 12.5)
    assert.equal(variationIndex(21), 1.21)
    assert.equal(variationIndex(-12.5), 0.875)
    assert.equal(indexToPercent(1.105), 10.5)
    assert.equal(chainedIndex([30, -15]), 1.105)
    assert.equal(chainedIndex([-20, 21]), 0.968)
    assert.equal(applyChanges(18000, [-20, 21]), 17424)
    assert.equal(applyChanges(45, [30, -15]), 49.725)
    assert.equal(initialAmount(98, [-12.5]), 112)
    assert.equal(cents(initialAmount(125, [-25, -30])), 238.1)
    // Going up 25 % and down 20 % is the identity
    assert.equal(chainedIndex([25, -20]), 1)
})

test('errealak eta ehunekoak 4. DBH: simple and compound interest', () => {
    assert.equal(simpleInterest(2000, 3, 5), 300)
    assert.equal(simpleInterest(4500, 3, 8 / 12), 90)
    assert.equal(simpleInterest(670, 3, 30 / 12), 50.25)
    assert.equal(compoundFinal(600, 3.4, 5), 709.18)
    assert.equal(compoundFinal(3400, 3.4, 2), 3635.13)
    assert.equal(compoundFinal(1000, 2, 5), 1104.08)
    assert.equal(compoundFinal(1000, 7, 5), 1402.55)
    assert.equal(compoundFinal(10000, 5, 3) - 10000, 1576.25)
    assert.equal(money(1104.0808), '1104,08')
    const table = interestTable(1000, 10, 10)
    assert.equal(table.length, 11)
    // The first year both give the same; afterwards compound is always ahead
    assert.equal(table[1].simple, table[1].compound)
    for (const row of table.slice(2)) assert.ok(row.compound > row.simple, `${row.year}`)
    assert.equal(table[10].simple, 2000)
    assert.equal(table[10].compound, 2593.74)
})
