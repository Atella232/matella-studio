import test from 'node:test'
import assert from 'node:assert/strict'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import { toNumber } from '../src/features/unit-v2/math/fraction.ts'
import { integerGameModeForPath, integerGameProgressIds, integerGames } from '../src/pages/dbh2-zenbaki-osoak/games/info.ts'
import {
    checkIntegerPitAnswer,
    generateIntegerRaceQuestion,
    INTEGER_RACE_CIRCUITS,
    integerRaceErrorTips,
    signedLatex
} from '../src/pages/dbh2-zenbaki-osoak/games/race.ts'
import { buildPyramid, createPyramid, isSolvable, pyramidLevels, PYRAMIDS_PER_LEVEL, pyramidStars, wrongCells } from '../src/pages/dbh2-zenbaki-osoak/games/pyramid.ts'
import { cardValue, createIntegerMemoryBoard, evaluateIntegerFlip, integerCardLatex, integerMemoryLevels } from '../src/pages/dbh2-zenbaki-osoak/games/memory.ts'
import { createOrderRound, nextExpected, orderLevels, ORDER_ROUNDS, orderParTime, orderStars } from '../src/pages/dbh2-zenbaki-osoak/games/order.ts'

test('integer games: levels, progress ids and routes', () => {
    assert.equal(integerGames.length, 4)
    assert.equal(integerGames.find((game) => game.id === 'race')!.levels.length, INTEGER_RACE_CIRCUITS)
    assert.equal(integerGames.find((game) => game.id === 'pyramid')!.levels.length, pyramidLevels.length)
    assert.equal(integerGames.find((game) => game.id === 'memory')!.levels.length, integerMemoryLevels.length)
    assert.equal(integerGames.find((game) => game.id === 'order')!.levels.length, orderLevels.length)
    assert.equal(new Set(integerGameProgressIds).size, integerGameProgressIds.length)
    assert.equal(integerGameModeForPath('/matematika/dbh2/numeros-enteros/jokuak/piramidea'), 'pyramid')
    assert.equal(integerGameModeForPath('/matematika/dbh2/numeros-enteros/juegos'), 'hub')
})

/** Reads a signed integer written as an option: −7, 0, +7 */
const optionValue = (latex: string) => Number(latex.replace('+', '')) + 0

test('integer race: four different options, exactly one right, every mistake explained', () => {
    for (let circuit = 0; circuit < INTEGER_RACE_CIRCUITS; circuit += 1) {
        for (let seed = 1; seed <= 150; seed += 1) {
            const random = createRandom(seed * 31 + circuit)
            for (const tier of [0, 1, 2] as const) {
                const question = generateIntegerRaceQuestion(random, circuit, tier)
                const values = question.options.map((option) => optionValue(option.latex))
                assert.equal(question.options.length, 4, question.kind)
                assert.equal(new Set(values).size, 4, `${question.kind}: ${values}`)
                assert.equal(question.options.filter((option) => option.correct).length, 1)
                const right = question.options.find((option) => option.correct)!
                assert.equal(optionValue(right.latex), toNumber(question.answer), question.kind)
                for (const option of question.options) {
                    if (!option.correct) assert.ok(integerRaceErrorTips[option.error!], option.error!)
                }
            }
        }
    }
})

test('integer race: answers match the expressions they come from', () => {
    const random = createRandom(7)
    for (let index = 0; index < 300; index += 1) {
        const question = generateIntegerRaceQuestion(random, 2 + (index % 3), 1)
        const expression = question.prompt.es.match(/\$(.*)\$/)?.[1]
        if (!expression || expression.includes('?')) continue
        const js = expression.replace(/\\cdot/g, '*').replace(/\\mathbin\{:\}/g, '/')
        assert.match(js, /^[\d+\-*/() ]+$/, expression)
        assert.equal(Function(`return ${js}`)() + 0, toNumber(question.answer) + 0, expression)
    }
})

test('integer race: the pit stop accepts the written integer', () => {
    const random = createRandom(3)
    for (let circuit = 0; circuit < INTEGER_RACE_CIRCUITS; circuit += 1) {
        const question = generateIntegerRaceQuestion(random, circuit, 1, true)
        assert.ok(question.writable)
        const value = toNumber(question.answer)
        assert.equal(checkIntegerPitAnswer(question, value < 0 ? `−${-value}` : `+${value}`), 'correct')
        assert.equal(checkIntegerPitAnswer(question, String(value + 1)), 'incorrect')
    }
    assert.equal(signedLatex(-3), '-3')
    assert.equal(signedLatex(0), '0')
})

test('pyramids: sums and products, always solvable, with both signs', () => {
    assert.deepEqual(buildPyramid([2, -5, 3], 'sum'), [[-5], [-3, -2], [2, -5, 3]])
    assert.deepEqual(buildPyramid([2, -1, 3], 'product'), [[6], [-2, -3], [2, -1, 3]])
    for (let level = 0; level < pyramidLevels.length; level += 1) {
        for (let seed = 1; seed <= 100; seed += 1) {
            const pyramid = createPyramid(createRandom(seed * 17 + level), level)
            const base = pyramid.values[pyramid.values.length - 1]
            assert.ok(base.some((value) => value < 0) && base.some((value) => value > 0))
            assert.ok(isSolvable(pyramid.values, pyramid.given, pyramidLevels[level].op))
            const hidden = pyramid.given.flat().filter((shown) => !shown).length
            assert.ok(hidden > 0)
            if (pyramidLevels[level].hideBase) assert.ok(pyramid.given[pyramid.given.length - 1].some((shown) => !shown))
        }
    }
    const pyramid = createPyramid(createRandom(1), 0)
    const answers: Record<string, number | null> = {}
    pyramid.values.forEach((row, rowIndex) => row.forEach((value, index) => { if (!pyramid.given[rowIndex][index]) answers[`${rowIndex}-${index}`] = value }))
    assert.deepEqual(wrongCells(pyramid, answers), [])
    assert.equal(wrongCells(pyramid, {}).length, 3)
    assert.equal(PYRAMIDS_PER_LEVEL, 3)
    assert.deepEqual([pyramidStars(0), pyramidStars(2), pyramidStars(5)], [3, 2, 1])
})

test('memory: every card shows its value and each board has opposite traps', () => {
    for (let level = 0; level < integerMemoryLevels.length; level += 1) {
        for (let seed = 1; seed <= 80; seed += 1) {
            const { groups, groupSize } = integerMemoryLevels[level]
            const cards = createIntegerMemoryBoard(createRandom(seed * 13 + level), level)
            assert.equal(cards.length, groups * groupSize)
            for (const card of cards) assert.equal(cardValue(card), card.value, integerCardLatex(card, 'eu'))
            const values = [...new Set(cards.map((card) => card.value))]
            assert.equal(values.length, groups)
            assert.ok(values.some((value) => value !== 0 && values.includes(-value)), 'a value and its opposite')
            const latex = cards.map((card) => integerCardLatex(card, 'es'))
            assert.equal(new Set(latex).size, latex.length, 'no two cards look the same')
        }
    }
    const cards = createIntegerMemoryBoard(createRandom(5), 0)
    const [first] = cards
    const partner = cards.findIndex((card, index) => index > 0 && card.setId === first.setId)
    const stranger = cards.findIndex((card) => card.setId !== first.setId)
    assert.equal(evaluateIntegerFlip(cards, [0, partner], 2), 'match')
    assert.equal(evaluateIntegerFlip(cards, [0, stranger], 2), 'mismatch')
})

test('order: distinct values, the next card to tap and stars', () => {
    for (let level = 0; level < orderLevels.length; level += 1) {
        for (let round = 0; round < ORDER_ROUNDS; round += 1) {
            const current = createOrderRound(createRandom(level * 100 + round), level, round)
            const values = current.cards.map((card) => card.value)
            assert.equal(new Set(values).size, orderLevels[level].count)
            assert.ok(values.filter((value) => value < 0).length >= orderLevels[level].count / 2)
            for (const card of current.cards) assert.equal(cardValue({ ...card, setId: 0 }), card.value)
            const sorted = [...values].sort((left, right) => (current.descending ? right - left : left - right))
            const tapped: string[] = []
            for (const value of sorted) {
                assert.equal(nextExpected(current, tapped), value)
                tapped.push(current.cards.find((card) => card.value === value)!.id)
            }
            assert.equal(nextExpected(current, tapped), null)
        }
    }
    assert.ok(createOrderRound(createRandom(1), 1, 1).descending)
    assert.equal(orderStars(0, orderParTime(0) * 0.7, 0), 3)
    assert.equal(orderStars(0, orderParTime(0) * 0.9, 0), 2)
    assert.equal(orderStars(0, orderParTime(0) * 2, 0), 1)
})
