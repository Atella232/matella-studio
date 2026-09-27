import test from 'node:test'
import assert from 'node:assert/strict'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import { toNumber } from '../src/features/unit-v2/math/fraction.ts'
import { divisibilityGameProgressIds } from '../src/pages/dbh2-zatigarritasuna/games/info.ts'
import { createHuntRound, HUNT_CELLS, huntStars, targetsLeft } from '../src/pages/dbh2-zatigarritasuna/games/hunt.ts'
import { createFactorNumbers, FACTOR_NUMBERS, factorPool } from '../src/pages/dbh2-zatigarritasuna/games/factor.ts'
import { factorize } from '../src/pages/dbh2-zatigarritasuna/math.ts'
import {
    introDivisibilityGameModeForPath,
    introDivisibilityGameProgressIds,
    introDivisibilityGames,
    introFactorLevels,
    introHuntLevels
} from '../src/pages/dbh1-zatigarritasuna-v2/games/info.ts'
import {
    checkIntroDivisibilityPitAnswer,
    generateIntroDivisibilityRaceQuestion,
    INTRO_RACE_CIRCUITS,
    introDivisibilityRaceErrorTips
} from '../src/pages/dbh1-zatigarritasuna-v2/games/race.ts'
import { divisibilityIntroLabChallengeIds } from '../src/pages/dbh1-zatigarritasuna-v2/lab/labTools.ts'

test('zatigarritasuna 1. DBH games: levels, ids and routes', () => {
    assert.equal(introDivisibilityGames.length, 4)
    assert.equal(introDivisibilityGames[0].levels.length, INTRO_RACE_CIRCUITS)
    assert.equal(introHuntLevels.length, introDivisibilityGames.find((game) => game.id === 'hunt')!.levels.length)
    assert.equal(introFactorLevels.length, introDivisibilityGames.find((game) => game.id === 'factor')!.levels.length)
    assert.equal(new Set(introDivisibilityGameProgressIds).size, introDivisibilityGameProgressIds.length)
    // Unit progress: games and lab never share an id, and none is a 2. DBH id
    assert.ok(!introDivisibilityGameProgressIds.some((id) => divisibilityIntroLabChallengeIds.includes(id) || divisibilityGameProgressIds.includes(id)))
    assert.equal(introDivisibilityGameModeForPath('/matematika/dbh1/divisibilidad/juegos/caza'), 'hunt')
    assert.equal(introDivisibilityGameModeForPath('/matematika/dbh1/divisibilidad/jokuak'), 'hub')
})

test('zatigarritasuna 1. DBH race: four different options, one right answer, first-year level', () => {
    let leftOver = 0
    for (let circuit = 0; circuit < INTRO_RACE_CIRCUITS; circuit += 1) {
        for (let seed = 1; seed <= 120; seed += 1) {
            const random = createRandom(seed * 71 + circuit)
            for (const tier of [0, 1, 2] as const) {
                const question = generateIntroDivisibilityRaceQuestion(random, circuit, tier)
                assert.equal(question.options.length, 4, question.kind)
                assert.equal(new Set(question.options.map((option) => option.latex)).size, 4, question.kind)
                assert.equal(question.options.filter((option) => option.correct).length, 1)
                for (const option of question.options) if (!option.correct) assert.ok(introDivisibilityRaceErrorTips[option.error!], option.error!)
                const right = question.options.find((option) => option.correct)!
                if (/^\d+$/.test(right.latex) && question.kind !== 'factorization') assert.equal(Number(right.latex), toNumber(question.answer), question.kind)
                // No rule for 11 in the first year
                assert.ok(question.kind !== 'divisible-11', question.kind)
                if (question.kind === 'left-over') {
                    leftOver += 1
                    const [, total, size, groups, rest] = question.solution.es.match(/\$(\d+)=(\d+)\\cdot (\d+)\+(\d+)\$/)!.map(Number)
                    assert.equal(total, size * groups + rest)
                    assert.ok(rest < size)
                    assert.equal(rest, toNumber(question.answer))
                    assert.equal(checkIntroDivisibilityPitAnswer(question, String(rest)), 'correct')
                }
            }
        }
    }
    assert.ok(leftOver > 50, `only ${leftOver} left-over questions`)
})

test('zatigarritasuna 1. DBH hunt and factorization: every first-year level can be played', () => {
    for (let level = 0; level < introHuntLevels.length; level += 1) {
        for (let seed = 1; seed <= 60; seed += 1) {
            const round = createHuntRound(createRandom(seed + level * 1000), level, introHuntLevels)
            assert.equal(round.numbers.length, HUNT_CELLS)
            assert.equal(new Set(round.numbers).size, HUNT_CELLS)
            const targets = targetsLeft(round, [])
            assert.ok(targets >= 4 && targets <= 7, `${round.rule.id}: ${targets}`)
            assert.ok(!round.rule.id.includes('11'))
        }
    }
    assert.equal(huntStars(0, 1000, 0, introHuntLevels), 3)
    for (let level = 0; level < introFactorLevels.length; level += 1) {
        const { primes, max } = introFactorLevels[level]
        const pool = factorPool(level, introFactorLevels)
        assert.ok(pool.length >= FACTOR_NUMBERS + 4, `level ${level}: ${pool.length}`)
        for (const value of pool) {
            assert.ok(value <= max)
            assert.ok(factorize(value).every(([prime]) => primes.includes(prime)), `${value}`)
        }
        const numbers = createFactorNumbers(createRandom(level + 5), level, introFactorLevels)
        assert.equal(new Set(numbers).size, FACTOR_NUMBERS)
    }
})
