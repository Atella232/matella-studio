import test from 'node:test'
import assert from 'node:assert/strict'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import { toNumber } from '../src/features/unit-v2/math/fraction.ts'
import { ren, rekin } from '../src/pages/dbh2-zatigarritasuna/basque.ts'
import { gcd, lcm } from '../src/pages/dbh2-zatigarritasuna/math.ts'
import { divisibilityGameModeForPath, divisibilityGameProgressIds, divisibilityGames } from '../src/pages/dbh2-zatigarritasuna/games/info.ts'
import { checkDivisibilityPitAnswer, DIVISIBILITY_RACE_CIRCUITS, divisibilityRaceErrorTips, generateDivisibilityRaceQuestion } from '../src/pages/dbh2-zatigarritasuna/games/race.ts'
import { createHuntRound, HUNT_CELLS, huntLevels, huntParTime, huntStars, targetsLeft } from '../src/pages/dbh2-zatigarritasuna/games/hunt.ts'
import { createFactorNumbers, FACTOR_NUMBERS, factorLevels, factorPool } from '../src/pages/dbh2-zatigarritasuna/games/factor.ts'
import { createDivisibilityMemoryBoard, divisibilityCardLatex, divisibilityCardValue, divisibilityMemoryLevels, evaluateDivisibilityFlip } from '../src/pages/dbh2-zatigarritasuna/games/memory.ts'

test('basque suffixes after numbers', () => {
    assert.deepEqual([3, 5, 6, 10, 11, 15, 20, 30, 40, 100, 1000, 36].map(ren), ['3ren', '5en', '6ren', '10en', '11ren', '15en', '20ren', '30en', '40ren', '100en', '1000ren', '36ren'])
    assert.deepEqual([2, 3, 5, 9, 10, 11].map(rekin), ['2rekin', '3rekin', '5ekin', '9rekin', '10ekin', '11rekin'])
})

test('divisibility games: levels, ids and routes', () => {
    assert.equal(divisibilityGames.length, 4)
    assert.equal(divisibilityGames[0].levels.length, DIVISIBILITY_RACE_CIRCUITS)
    assert.equal(new Set(divisibilityGameProgressIds).size, divisibilityGameProgressIds.length)
    assert.equal(divisibilityGameModeForPath('/matematika/dbh2/divisibilidad/jokuak/ehiza'), 'hunt')
})

test('divisibility race: four different options, one right answer, every mistake explained', () => {
    for (let circuit = 0; circuit < DIVISIBILITY_RACE_CIRCUITS; circuit += 1) {
        for (let seed = 1; seed <= 120; seed += 1) {
            const random = createRandom(seed * 53 + circuit)
            for (const tier of [0, 1, 2] as const) {
                const question = generateDivisibilityRaceQuestion(random, circuit, tier)
                assert.equal(question.options.length, 4, question.kind)
                assert.equal(new Set(question.options.map((option) => option.latex)).size, 4, question.kind)
                assert.equal(question.options.filter((option) => option.correct).length, 1)
                for (const option of question.options) if (!option.correct) assert.ok(divisibilityRaceErrorTips[option.error!], option.error!)
                const right = question.options.find((option) => option.correct)!
                if (/^\d+$/.test(right.latex) && question.kind !== 'factorization') assert.equal(Number(right.latex), toNumber(question.answer), question.kind)
            }
        }
    }
})

test('divisibility race: the right option really is right', () => {
    const random = createRandom(11)
    for (let index = 0; index < 400; index += 1) {
        const circuit = index % DIVISIBILITY_RACE_CIRCUITS
        const question = generateDivisibilityRaceQuestion(random, circuit, (index % 3) as 0 | 1 | 2)
        const prompt = question.prompt.eu
        const value = toNumber(question.answer)
        const gcdMatch = prompt.match(/ZKH\}\((\d+),(\d+)\)/)
        if (gcdMatch) assert.equal(value, gcd(Number(gcdMatch[1]), Number(gcdMatch[2])))
        const lcmMatch = prompt.match(/MKT\}\((\d+),(\d+)\)/)
        if (lcmMatch) assert.equal(value, lcm(Number(lcmMatch[1]), Number(lcmMatch[2])))
        if (question.kind.startsWith('divisible-')) {
            const d = Number(question.kind.split('-')[1])
            for (const option of question.options) assert.equal(Number(option.latex) % d === 0, option.correct, `${option.latex} / ${d}`)
        }
        if (question.kind === 'prime') for (const option of question.options) assert.equal(option.correct, [...Array(Number(option.latex)).keys()].slice(2).every((d) => Number(option.latex) % d !== 0))
        if (question.kind === 'multiple') {
            const n = Number(prompt.match(/^Zein da (\d+)/)![1])
            for (const option of question.options) assert.equal(Number(option.latex) % n === 0, option.correct)
        }
        if (question.writable) assert.equal(checkDivisibilityPitAnswer(question, String(value)), 'correct')
    }
})

test('hunt rounds: 16 distinct numbers with 4 to 7 targets', () => {
    for (let level = 0; level < huntLevels.length; level += 1) {
        for (let seed = 1; seed <= 60; seed += 1) {
            const round = createHuntRound(createRandom(seed * 7 + level), level)
            assert.equal(round.numbers.length, HUNT_CELLS)
            assert.equal(new Set(round.numbers).size, HUNT_CELLS)
            const targets = targetsLeft(round, [])
            assert.ok(targets >= 4 && targets <= 7, `${round.rule.id}: ${targets}`)
        }
    }
    assert.equal(huntStars(0, huntParTime(0) * 0.5, 0), 3)
    assert.equal(huntStars(0, huntParTime(0) * 1.5, 0), 1)
})

test('factor game: every number uses only the level buttons', () => {
    for (let level = 0; level < factorLevels.length; level += 1) {
        assert.ok(factorPool(level).length > 20)
        const numbers = createFactorNumbers(createRandom(level + 3), level)
        assert.equal(numbers.length, FACTOR_NUMBERS)
        assert.equal(new Set(numbers).size, FACTOR_NUMBERS)
        const newest = factorLevels[level].primes.at(-1)!
        assert.ok(numbers.filter((value) => value % newest === 0).length >= 2)
    }
})

test('memory boards: every card shows its value, no two cards look the same', () => {
    for (let level = 0; level < divisibilityMemoryLevels.length; level += 1) {
        for (let seed = 1; seed <= 60; seed += 1) {
            const { groups, groupSize } = divisibilityMemoryLevels[level]
            const cards = createDivisibilityMemoryBoard(createRandom(seed * 3 + level), level)
            assert.equal(cards.length, groups * groupSize)
            for (const card of cards) assert.equal(divisibilityCardValue(card), card.value)
            const latex = cards.map((card) => divisibilityCardLatex(card, 'eu'))
            assert.equal(new Set(latex).size, latex.length)
            assert.equal(new Set(cards.map((card) => card.value)).size, groups)
        }
    }
    const cards = createDivisibilityMemoryBoard(createRandom(1), 1)
    const pairs = cards.filter((card) => card.kind === 'gcd' || card.kind === 'lcm')
    assert.ok(pairs.some((card) => pairs.some((other) => other !== card && other.terms.join() === card.terms.join())), 'the ZKH and MKT of one pair are both on the board')
    const partner = cards.findIndex((card, index) => index > 0 && card.setId === cards[0].setId)
    assert.equal(evaluateDivisibilityFlip(cards, [0, partner], 2), 'match')
})
