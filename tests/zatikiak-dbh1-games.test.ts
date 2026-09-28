import test from 'node:test'
import assert from 'node:assert/strict'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import { checkAnswer, toNumber } from '../src/features/unit-v2/math/fraction.ts'
import { gameProgressIds } from '../src/pages/dbh2-zatikiak-prototype/games/records.ts'
import { createMemoryBoard, memoryStars } from '../src/pages/dbh2-zatikiak-prototype/games/memory.ts'
import { createTargetRounds, shareToValue, targetShare } from '../src/pages/dbh2-zatikiak-prototype/games/target.ts'
import {
    introFractionGameModeForPath,
    introFractionGameProgressIds,
    introFractionGames,
    introMemoryLevels,
    introTargetLevels
} from '../src/pages/dbh1-zatikiak-v2/games/info.ts'
import {
    checkIntroFractionPitAnswer,
    generateIntroFractionRaceQuestion,
    INTRO_FRACTION_RACE_CIRCUITS,
    introFractionRaceErrorTips
} from '../src/pages/dbh1-zatikiak-v2/games/race.ts'
import { fractionsIntroLabChallengeIds } from '../src/pages/dbh1-zatikiak-v2/lab/labTools.ts'

test('zatikiak 1. DBH games: levels, ids and routes', () => {
    assert.equal(introFractionGames.length, 4)
    assert.equal(introFractionGames[0].levels.length, INTRO_FRACTION_RACE_CIRCUITS)
    assert.equal(introTargetLevels.length, introFractionGames.find((game) => game.id === 'target')!.levels.length)
    assert.equal(introMemoryLevels.length, introFractionGames.find((game) => game.id === 'memory')!.levels.length)
    assert.equal(new Set(introFractionGameProgressIds).size, introFractionGameProgressIds.length)
    assert.ok(!introFractionGameProgressIds.some((id) => fractionsIntroLabChallengeIds.includes(id) || gameProgressIds.includes(id)))
    assert.equal(introFractionGameModeForPath('/matematika/dbh1/zatikiak/juegos/carrera'), 'race')
    assert.equal(introFractionGameModeForPath('/matematika/dbh1/zatikiak/jokuak/pizza'), 'hub')
})

test('zatikiak 1. DBH race: four different options, one right answer, no negative fractions', () => {
    for (let circuit = 0; circuit < INTRO_FRACTION_RACE_CIRCUITS; circuit += 1) {
        for (let seed = 1; seed <= 100; seed += 1) {
            const random = createRandom(seed * 31 + circuit)
            for (const tier of [0, 1, 2] as const) {
                const question = generateIntroFractionRaceQuestion(random, circuit, tier)
                assert.equal(question.circuit, circuit)
                assert.equal(question.options.length, 4, question.kind)
                assert.equal(new Set(question.options.map((option) => option.latex)).size, 4, question.kind)
                assert.equal(question.options.filter((option) => option.correct).length, 1)
                for (const option of question.options) if (!option.correct) assert.ok(introFractionRaceErrorTips[option.error!], option.error!)
                assert.ok(toNumber(question.answer) >= 0, `${question.kind}: negative answer`)
                assert.ok(!question.options.some((option) => option.latex.startsWith('-')), `${question.kind}: negative option`)
                assert.ok(!/\\%|\(-/.test(question.prompt.es), `${question.kind}: ${question.prompt.es}`)
                const { numerator, denominator } = question.answer
                if (question.writable && question.answerForm !== 'mixed') {
                    const typed = denominator === 1 ? String(numerator) : `${numerator}/${denominator}`
                    assert.equal(checkIntroFractionPitAnswer(question, typed), 'correct', `${question.kind} ${typed}`)
                }
                if (question.kind === 'to-mixed') {
                    const whole = Math.floor(numerator / denominator)
                    assert.equal(checkAnswer(`${whole} ${numerator - whole * denominator}/${denominator}`, question.answer, 'mixed'), 'correct')
                }
            }
        }
    }
})

test('zatikiak 1. DBH target and memory: first-year levels stay positive and without percentages', () => {
    for (let level = 0; level < introTargetLevels.length; level += 1) {
        const rounds = createTargetRounds(createRandom(level + 3), level, introTargetLevels)
        for (const round of rounds) {
            const value = toNumber(round.value)
            assert.ok(value >= introTargetLevels[level].min && value <= introTargetLevels[level].max)
        }
        assert.ok(Math.abs(shareToValue(level, targetShare(level, 0.5, introTargetLevels), introTargetLevels) - 0.5) < 1e-9)
    }
    for (let level = 0; level < introMemoryLevels.length; level += 1) {
        for (let seed = 1; seed <= 30; seed += 1) {
            const cards = createMemoryBoard(createRandom(seed + level * 100), level, introMemoryLevels)
            assert.equal(cards.length, introMemoryLevels[level].groups * introMemoryLevels[level].groupSize, `level ${level}`)
            assert.ok(!cards.some((card) => card.kind === 'percent'))
        }
    }
    assert.equal(memoryStars(0, 1, introMemoryLevels), 3)
})
