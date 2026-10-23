import test from 'node:test'
import assert from 'node:assert/strict'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import { equals, fraction } from '../src/pages/dbh2-zatikiak-prototype/math/fraction.ts'
import { games } from '../src/pages/dbh2-zatikiak-prototype/games/records.ts'
import { gameModeForPath, gameSlugs } from '../src/pages/dbh2-zatikiak-prototype/routing.ts'
import {
    brokenNeighbour,
    cardLatex,
    cardText,
    compareLatex,
    createTrains,
    fittingGaps,
    fits,
    hookAt,
    inOrder,
    TRAIN_ARRIVALS,
    TRAIN_MAX_SCORE,
    TRAINS_PER_LEVEL,
    trainStars,
    type TrainCard,
    type TrainLevel
} from '../src/pages/dbh2-zatikiak-prototype/games/train.ts'

const f = (numerator: number, denominator: number): TrainCard => ({ value: fraction(numerator, denominator), form: 'fraction', written: { numerator, denominator } })

test('zatikiak train: where a wagon fits, and the neighbour a wrong gap breaks with', () => {
    const train = [f(1, 4), f(1, 2), f(3, 4)]
    assert.deepEqual(fittingGaps(train, f(2, 3)), { first: 2, last: 2 })
    assert.deepEqual(fittingGaps(train, f(2, 4)), { first: 1, last: 2 }, 'equal to 1/2: either side')
    assert.deepEqual(fittingGaps(train, f(1, 8)), { first: 0, last: 0 })
    assert.ok(fits(train, f(2, 3), 2) && !fits(train, f(2, 3), 1) && !fits(train, f(2, 3), 3))
    assert.deepEqual(brokenNeighbour(train, f(2, 3), 1), { neighbour: train[1], cardIsLarger: true })
    assert.deepEqual(brokenNeighbour(train, f(2, 3), 3), { neighbour: train[2], cardIsLarger: false })
    assert.equal(brokenNeighbour(train, f(2, 3), 2), null)
    assert.ok(inOrder(hookAt(train, f(2, 3), 2)))
    assert.ok(!inOrder(hookAt(train, f(2, 3), 0)))
})

test('zatikiak train: every level builds trains of different, tidy wagons with a close pair', () => {
    for (const level of [0, 1, 2] as TrainLevel[]) {
        for (let seed = 1; seed <= 150; seed += 1) {
            const trains = createTrains(createRandom(seed * 911 + level), level)
            assert.equal(trains.length, TRAINS_PER_LEVEL)
            for (const train of trains) {
                const label = `level ${level} seed ${seed}: ${train.cards.map((card) => cardText(card)).join(' ')}`
                assert.equal(train.cards.length, TRAIN_ARRIVALS + 1, label)
                assert.equal(new Set(train.cards.map((card) => cardText(card))).size, train.cards.length, `${label}: all written differently`)
                const values = train.cards.map((card) => card.value)
                const pairs = values.filter((value, index) => values.slice(index + 1).some((other) => equals(other, value))).length
                assert.ok(pairs <= 1, `${label}: at most one pair worth the same`)
                for (const card of train.cards) {
                    const number = card.value.numerator / card.value.denominator
                    if (level < 2) assert.ok(number > 0 && number < 3, label)
                    else assert.ok(number > -2 && number < 2 && number !== 0, label)
                    assert.ok(equals(card.value, fraction(card.written.numerator, card.written.denominator)) || card.form !== 'fraction', label)
                }
                // Playing it always ends with a train in order
                let hooked = [train.cards[0]]
                for (const card of train.cards.slice(1)) hooked = hookAt(hooked, card, fittingGaps(hooked, card).first)
                assert.ok(inOrder(hooked), label)
            }
        }
    }
})

test('zatikiak train: numbers written as on the wagons, and why one goes after another', () => {
    assert.equal(cardLatex(f(6, 8)), '\\frac{6}{8}')
    assert.equal(cardLatex({ value: fraction(5, 4), form: 'mixed', written: fraction(5, 4) }), '1\\tfrac{1}{4}')
    assert.equal(cardLatex({ value: fraction(-5, 4), form: 'mixed', written: fraction(-5, 4) }), '-1\\tfrac{1}{4}')
    assert.equal(cardLatex({ value: fraction(3, 4), form: 'decimal', written: fraction(3, 4) }), '0{,}75')
    assert.equal(cardLatex({ value: fraction(-3, 2), form: 'decimal', written: fraction(-3, 2) }, '.'), '-1{.}5')
    assert.equal(cardText({ value: fraction(-5, 4), form: 'mixed', written: fraction(-5, 4) }), '−1\u00a01/4')
    assert.equal(cardText({ value: fraction(3, 4), form: 'decimal', written: fraction(3, 4) }), '0,75')
    assert.equal(compareLatex(f(3, 4), f(2, 3)), '\\frac{3}{4}=\\frac{9}{12}>\\frac{8}{12}=\\frac{2}{3}')
    assert.equal(compareLatex({ value: fraction(3, 4), form: 'decimal', written: fraction(3, 4) }, f(2, 3)), '0{,}75=\\frac{3}{4}=\\frac{9}{12}>\\frac{8}{12}=\\frac{2}{3}')
    assert.equal(compareLatex(f(-1, 2), f(-3, 4)), '-\\frac{1}{2}=-\\frac{2}{4}>-\\frac{3}{4}')
    assert.equal(compareLatex(f(6, 8), f(3, 4)), '\\frac{6}{8}=\\frac{3}{4}=\\frac{3}{4}')
})

test('zatikiak train: stars, and listed with three levels', () => {
    assert.equal(TRAIN_MAX_SCORE, 10)
    assert.deepEqual([10, 9, 8, 7, 6, 5, 4].map(trainStars), [3, 3, 2, 2, 1, 1, 0])
    const train = games.find((item) => item.id === 'train')
    assert.ok(train)
    assert.deepEqual(train.levels.map((item) => item.progressId), [1501, 1502, 1503])
    assert.equal(gameSlugs.train, 'trena')
    assert.equal(gameModeForPath('/matematika/dbh2/zatikiak/juegos/tren'), 'train')
    assert.equal(gameModeForPath('/matematika/dbh2/zatikiak/jokuak/trena'), 'train')
})
