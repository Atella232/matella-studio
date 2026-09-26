import test from 'node:test'
import assert from 'node:assert/strict'
import { equals, fraction, toNumber } from '../src/pages/dbh2-zatikiak-prototype/math/fraction.ts'
import { createRandom } from '../src/pages/dbh2-zatikiak-prototype/games/random.ts'
import {
    checkPitAnswer,
    generateRaceQuestion,
    lapShare,
    nextTier,
    parTime,
    raceErrorTips,
    racePosition,
    raceStars,
    rivalTime,
    rivals,
    RACE_CIRCUITS,
    type Tier
} from '../src/pages/dbh2-zatikiak-prototype/games/race.ts'
import { cardLatex, createMemoryBoard, evaluateFlip, memoryLevels, memoryStars, mismatchLatex, supportsKind } from '../src/pages/dbh2-zatikiak-prototype/games/memory.ts'
import { createTargetRounds, scoreThrow, targetHintLatex, shareToValue, targetLatex, targetLevels, targetShare, targetStars, TARGET_THROWS } from '../src/pages/dbh2-zatikiak-prototype/games/target.ts'
import {
    brickFitsAnywhere,
    createWallSequence,
    createWallUnits,
    dealWallUnits,
    decomposeUnit,
    discardBrick,
    initialWallGame,
    placeBrick,
    rowTotal,
    wallLevels,
    wallStars,
    WALL_UNITS
} from '../src/pages/dbh2-zatikiak-prototype/games/wall.ts'
import { gameProgressIds, games, mergeRecord, parseRecords } from '../src/pages/dbh2-zatikiak-prototype/games/records.ts'

const tiers: Tier[] = [0, 1, 2]

test('race: every generated question has four distinct options and exactly one right answer', () => {
    for (let circuit = 0; circuit < RACE_CIRCUITS; circuit += 1) {
        for (const tier of tiers) {
            for (let seed = 0; seed < 300; seed += 1) {
                const question = generateRaceQuestion(createRandom(seed * 31 + circuit * 1009 + tier), circuit, tier)
                const latexes = question.options.map((option) => option.latex)
                assert.equal(question.options.length, 4, question.kind)
                assert.equal(question.options.filter((option) => option.correct).length, 1, question.kind)
                assert.equal(new Set(latexes).size, 4, `${question.kind}: ${latexes.join(' | ')}`)
                assert.ok(!/NaN|Infinity|undefined/.test(latexes.join() + question.prompt.es + question.solution.es), question.kind)
                for (const option of question.options) {
                    assert.equal(option.correct, option.error === null)
                    if (!option.correct) assert.ok(raceErrorTips[option.error!], option.error!)
                }
            }
        }
    }
})

test('race: pit-stop questions accept the exact answer and reject the wrong form', () => {
    for (let circuit = 0; circuit < RACE_CIRCUITS; circuit += 1) {
        for (let seed = 0; seed < 100; seed += 1) {
            const question = generateRaceQuestion(createRandom(seed + circuit * 97), circuit, 1, true)
            assert.ok(question.writable, question.kind)
            const { numerator, denominator } = question.answer
            const written = denominator === 1 ? String(numerator) : `${numerator}/${denominator}`
            assert.equal(checkPitAnswer(question, written), 'correct', `${question.kind} ${written}`)
            assert.equal(checkPitAnswer(question, `${numerator + 1}/${denominator}`), 'incorrect')
        }
    }
    const random = createRandom(4)
    let simplify
    do simplify = generateRaceQuestion(random, 0, 1, true)
    while (simplify.kind !== 'simplify')
    const doubled = `${simplify.answer.numerator * 2}/${simplify.answer.denominator * 2}`
    assert.equal(checkPitAnswer(simplify, doubled), 'wrong-form')
})

test('race: percent answers may be written with or without the sign', () => {
    const random = createRandom(11)
    let question
    do question = generateRaceQuestion(random, 5, 1, true)
    while (question.kind !== 'to-percent')
    const value = String(question.answer.numerator)
    assert.equal(checkPitAnswer(question, value), 'correct')
    assert.equal(checkPitAnswer(question, `${value}%`), 'correct')
})

test('race: the level adapts to streaks', () => {
    assert.equal(nextTier(0, 3, 0), 1)
    assert.equal(nextTier(2, 6, 0), 2)
    assert.equal(nextTier(1, 0, 2), 0)
    assert.equal(nextTier(0, 0, 3), 0)
    assert.equal(nextTier(1, 2, 0), 1)
})

test('race: rivals run at a steady, known pace and stars follow the par time', () => {
    for (let circuit = 0; circuit < RACE_CIRCUITS; circuit += 1) {
        const times = rivals.map((rival) => rivalTime(circuit, rival))
        assert.deepEqual([...times].sort((a, b) => b - a), times)
        assert.equal(rivalTime(circuit, rivals[1]), parTime(circuit))
        assert.equal(racePosition(circuit, 1), 1)
        assert.equal(racePosition(circuit, parTime(circuit) * 2), 4)
        assert.equal(raceStars(circuit, parTime(circuit) * 0.7, 0), 3)
        assert.equal(raceStars(circuit, parTime(circuit) * 0.7, 3), 2)
        assert.equal(raceStars(circuit, parTime(circuit) * 1.5, 0), 1)
    }
    assert.equal(lapShare(5000, 10000), 0.5)
    assert.equal(lapShare(20000, 10000), 1)
})

test('memory: boards hold complete groups of different values', () => {
    memoryLevels.forEach((level, levelIndex) => {
        for (let seed = 0; seed < 200; seed += 1) {
            const cards = createMemoryBoard(createRandom(seed), levelIndex)
            assert.equal(cards.length, level.groups * level.groupSize)
            const sets = new Map<number, typeof cards>()
            for (const card of cards) sets.set(card.setId, [...(sets.get(card.setId) ?? []), card])
            assert.equal(sets.size, level.groups)
            const values = [...sets.values()].map((group) => group[0].value)
            for (const [index, value] of values.entries()) {
                assert.ok(values.every((other, otherIndex) => otherIndex === index || !equals(other, value)))
            }
            for (const group of sets.values()) {
                assert.equal(group.length, level.groupSize)
                assert.ok(group.every((card) => supportsKind(card.value, card.kind)))
                // The cards of a group never look identical
                const faces = group.map((card) => `${card.kind}:${cardLatex(card)}`)
                assert.equal(new Set(faces).size, group.length, faces.join())
            }
        }
    })
})

test('memory: a turn ends on the first card from another set', () => {
    const cards = createMemoryBoard(createRandom(3), 2)
    const first = cards.findIndex((card) => card.setId === 0)
    const same = cards.findIndex((card, index) => card.setId === 0 && index !== first)
    const third = cards.findIndex((card, index) => card.setId === 0 && index !== first && index !== same)
    const other = cards.findIndex((card) => card.setId === 1)
    assert.equal(evaluateFlip(cards, [first], 3), 'continue')
    assert.equal(evaluateFlip(cards, [first, same], 3), 'continue')
    assert.equal(evaluateFlip(cards, [first, same, third], 3), 'match')
    assert.equal(evaluateFlip(cards, [first, other], 3), 'mismatch')
    assert.equal(memoryStars(0, 8), 3)
    assert.equal(memoryStars(0, 30), 1)
    const [a, b] = [{ id: 'a', setId: 0, value: fraction(1, 4), kind: 'fraction' as const }, { id: 'b', setId: 1, value: fraction(2, 5), kind: 'decimal' as const }]
    assert.equal(mismatchLatex(a, b), '0{,}25\\neq 0{,}4')
})

test('target: rounds stay inside the line, are distinct and are not whole numbers', () => {
    targetLevels.forEach((level, levelIndex) => {
        for (let seed = 0; seed < 100; seed += 1) {
            const rounds = createTargetRounds(createRandom(seed), levelIndex)
            assert.equal(rounds.length, TARGET_THROWS)
            for (const round of rounds) {
                const value = toNumber(round.value)
                assert.ok(value > level.min && value < level.max)
                assert.notEqual(round.value.denominator, 1)
                assert.ok(!/NaN|undefined/.test(targetLatex(round)))
            }
            assert.equal(new Set(rounds.map((round) => `${round.value.numerator}/${round.value.denominator}`)).size, TARGET_THROWS)
        }
    })
})

test('target: scoring rewards distance in units', () => {
    assert.deepEqual(scoreThrow(0.75, fraction(3, 4)), { points: 100, grade: 'bullseye', errorUnits: 0 })
    assert.equal(scoreThrow(0.76, fraction(3, 4)).points, 100)
    assert.equal(scoreThrow(0.5, fraction(3, 4)).points, 0)
    assert.equal(scoreThrow(0.8, fraction(3, 4)).grade, 'near')
    assert.ok(scoreThrow(0.77, fraction(3, 4)).points > scoreThrow(0.8, fraction(3, 4)).points)
    assert.equal(targetShare(2, 0), 0.5)
    assert.equal(shareToValue(1, 0.5), 1.5)
    assert.equal(targetStars(1000), 3)
    assert.equal(targetStars(100), 0)
})

test('wall: every unit decomposes exactly and a perfect game exists', () => {
    wallLevels.forEach((level, levelIndex) => {
        for (let seed = 0; seed < 200; seed += 1) {
            const random = createRandom(seed)
            for (const family of level.families) {
                const bricks = decomposeUnit(random, family)
                assert.ok(bricks.length >= 2 && bricks.length <= 5)
                assert.ok(equals(rowTotal(bricks), fraction(1)))
            }
            const units = createWallUnits(createRandom(seed), levelIndex)
            assert.equal(units.length, WALL_UNITS)
            const sequence = dealWallUnits(createRandom(seed + 1), units)
            assert.ok(equals(rowTotal(sequence), fraction(WALL_UNITS)))
            // Each chunk holds exactly the bricks of two units: sending every brick
            // back to its unit's row clears them all
            let offset = 0
            for (let index = 0; index < units.length; index += 2) {
                const pair = [...units[index], ...units[index + 1]]
                const chunk = sequence.slice(offset, offset + pair.length)
                const key = (items: typeof pair) => items.map((item) => `${item.numerator}/${item.denominator}`).sort().join()
                assert.equal(key(chunk), key(pair))
                offset += pair.length
            }
            assert.ok(createWallSequence(createRandom(seed), levelIndex).length >= WALL_UNITS * 2)
        }
    })
})

test('wall: bricks that overflow are refused and discards cost lives', () => {
    const sequence = [fraction(1, 2), fraction(3, 4), fraction(1, 2)]
    let state = initialWallGame()
    state = placeBrick(state, sequence, 0).state
    const overflow = placeBrick(state, sequence, 0)
    assert.equal(overflow.event.type, 'overflow')
    assert.equal(overflow.state, state)
    assert.ok(brickFitsAnywhere(state, sequence[1]))
    state = discardBrick(state).state
    assert.equal(state.lives, 2)
    const cleared = placeBrick(state, sequence, 0)
    assert.equal(cleared.event.type, 'cleared')
    assert.equal(cleared.state.cleared, 1)
    assert.equal(cleared.state.rows[0].length, 0)
    assert.equal(wallStars(8), 3)
    assert.equal(wallStars(3), 0)
})

test('records: keep the best stars, score and time separately', () => {
    assert.deepEqual(mergeRecord({ stars: 3, score: 500, timeMs: 90000 }, { stars: 1, score: 700, timeMs: 80000 }), { stars: 3, score: 700, timeMs: 80000 })
    assert.deepEqual(mergeRecord(undefined, { stars: 2, score: 1, timeMs: null }), { stars: 2, score: 1, timeMs: null })
    assert.deepEqual(parseRecords('{"race-0":{"stars":2,"score":10,"timeMs":5000},"bad":{"stars":9}}'), { 'race-0': { stars: 2, score: 10, timeMs: 5000 } })
    assert.deepEqual(parseRecords('not json'), {})
    assert.equal(new Set(gameProgressIds).size, gameProgressIds.length)
    assert.equal(games.length, 4)
})

test('target: the hint rewrites the number step by step', () => {
    assert.equal(targetHintLatex({ value: fraction(7, 4), form: 'decimal' }), '1{,}75=\\frac{7}{4}=1+\\frac{3}{4}')
    assert.equal(targetHintLatex({ value: fraction(-5, 3), form: 'mixed' }), '-1\\tfrac{2}{3}=-\\frac{5}{3}=-\\left(1+\\frac{2}{3}\\right)')
    assert.equal(targetHintLatex({ value: fraction(3, 8), form: 'fraction' }), '\\frac{3}{8}=3\\cdot\\frac{1}{8}')
})
