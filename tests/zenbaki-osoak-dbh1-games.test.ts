import test from 'node:test'
import assert from 'node:assert/strict'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import { toNumber } from '../src/features/unit-v2/math/fraction.ts'
import { introGameModeForPath, introGameProgressIds, introGames, introOrderLevels, introPyramidLevels } from '../src/pages/dbh1-zenbaki-osoak-v2/games/info.ts'
import { checkIntroPitAnswer, generateIntroRaceQuestion, INTRO_RACE_CIRCUITS, introRaceErrorTips } from '../src/pages/dbh1-zenbaki-osoak-v2/games/race.ts'
import { createElevatorRound, elevatorFinal, elevatorLevels } from '../src/pages/dbh1-zenbaki-osoak-v2/games/elevator.ts'
import { introLabChallengeIds } from '../src/pages/dbh1-zenbaki-osoak-v2/lab/labTools.ts'
import { buildPyramid, createPyramid } from '../src/pages/dbh2-zenbaki-osoak/games/pyramid.ts'
import { createOrderRound } from '../src/pages/dbh2-zenbaki-osoak/games/order.ts'

const readSigned = (latex: string) => Number(latex.replace('+', ''))

test('zenbaki osoak 1. DBH games: hub, levels, addresses and ids', () => {
    assert.equal(introGames.length, 4)
    assert.equal(new Set(introGameProgressIds).size, introGameProgressIds.length)
    for (const id of introGameProgressIds) assert.ok(!introLabChallengeIds.includes(id))
    assert.equal(introGames.find((game) => game.id === 'race')!.levels.length, INTRO_RACE_CIRCUITS)
    assert.equal(introGames.find((game) => game.id === 'pyramid')!.levels.length, introPyramidLevels.length)
    assert.equal(introGames.find((game) => game.id === 'order')!.levels.length, introOrderLevels.length)
    assert.equal(introGameModeForPath('/matematika/dbh1/numeros-enteros/jokuak/igogailua'), 'elevator')
    assert.equal(introGameModeForPath('/matematika/dbh1/numeros-enteros/juegos/ascensor'), 'elevator')
    assert.equal(introGameModeForPath('/matematika/dbh1/numeros-enteros/juegos'), 'hub')
})

test('zenbaki osoak 1. DBH race: one right option per question, the easy levels only', () => {
    const random = createRandom(11)
    for (let circuit = 0; circuit < INTRO_RACE_CIRCUITS; circuit += 1) {
        for (const tier of [0, 1, 2] as const) {
            for (let round = 0; round < 120; round += 1) {
                const question = generateIntroRaceQuestion(random, circuit, tier)
                assert.equal(question.circuit, circuit)
                assert.equal(question.options.length, 4)
                assert.equal(new Set(question.options.map((option) => option.latex)).size, 4)
                const right = question.options.filter((option) => option.correct)
                assert.equal(right.length, 1)
                assert.equal(readSigned(right[0].latex), toNumber(question.answer), question.kind)
                for (const option of question.options.filter((item) => !item.correct)) assert.ok(introRaceErrorTips[option.error!], question.kind)
                if (question.writable) {
                    const value = toNumber(question.answer)
                    assert.equal(checkIntroPitAnswer(question, value < 0 ? `−${-value}` : String(value)), 'correct')
                }
                // 2. DBH combined operations never appear in first year
                assert.ok(!question.kind.startsWith('combined'), question.kind)
            }
        }
    }
})

test('zenbaki osoak 1. DBH race: situations take the sign of the words', () => {
    const random = createRandom(3)
    for (let round = 0; round < 200; round += 1) {
        const question = generateIntroRaceQuestion(random, 0, 0)
        const value = toNumber(question.answer)
        const negative = /sótano|bajo cero|Debo|profundidad|bajado/.test(question.prompt.es)
        assert.equal(value < 0, negative, question.prompt.es)
    }
})

test('zenbaki osoak 1. DBH elevator: trips stay in the building and move', () => {
    const random = createRandom(8)
    for (let level = 0; level < elevatorLevels.length; level += 1) {
        const { lowest, highest, moves } = elevatorLevels[level]
        for (let round = 0; round < 200; round += 1) {
            const trip = createElevatorRound(random, level)
            assert.equal(trip.moves.length, moves)
            assert.ok(trip.moves.every((move) => move !== 0))
            let floor = trip.start
            for (const move of trip.moves) {
                floor += move
                assert.ok(floor >= lowest && floor <= highest)
            }
            assert.equal(elevatorFinal(trip), floor)
            assert.notEqual(floor, trip.start)
        }
    }
})

test('zenbaki osoak 1. DBH: the 2. DBH pyramid and order games with first-year levels', () => {
    const random = createRandom(21)
    for (let level = 0; level < introPyramidLevels.length; level += 1) {
        for (let round = 0; round < 40; round += 1) {
            const pyramid = createPyramid(random, level, introPyramidLevels)
            const base = pyramid.values[pyramid.values.length - 1]
            assert.equal(base.length, introPyramidLevels[level].rows)
            assert.ok(base.every((value) => Math.abs(value) <= introPyramidLevels[level].max))
            assert.deepEqual(buildPyramid(base, 'sum'), pyramid.values)
        }
    }
    for (let level = 0; level < introOrderLevels.length; level += 1) {
        const round = createOrderRound(random, level, 1, introOrderLevels)
        assert.equal(round.cards.length, introOrderLevels[level].count)
        assert.ok(round.cards.every((card) => card.value >= introOrderLevels[level].min && card.value <= introOrderLevels[level].max))
    }
})
