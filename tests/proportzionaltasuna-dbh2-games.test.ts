import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { checkChain, typed, valueOf } from './helpers/realsRaceCheck.ts'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import { hasTerminatingDecimal, toNumber } from '../src/features/unit-v2/math/fraction.ts'
import { createProportionDbh2MemoryBoard as createProportionMemoryBoard, PROPORTION_DBH2_MEMORY_PAIRS as PROPORTION_MEMORY_PAIRS, proportionDbh2MemoryLevels as proportionMemoryLevels } from '../src/pages/dbh2-proportzionaltasuna-v2/games/boards.ts'
import { proportionDbh2GameModeForPath as proportionGameModeForPath, proportionDbh2GameProgressIds as proportionGameProgressIds, proportionDbh2Games as proportionGames } from '../src/pages/dbh2-proportzionaltasuna-v2/games/info.ts'
import { checkProportionDbh2PitAnswer as checkProportionPitAnswer, PROPORTION_DBH2_RACE_CIRCUITS as PROPORTION_RACE_CIRCUITS, proportionDbh2ParTime as proportionParTime, proportionDbh2RaceErrorTips as proportionRaceErrorTips, generateProportionDbh2RaceQuestion as generateProportionRaceQuestion, type ProportionDbh2RaceQuestion as ProportionRaceQuestion } from '../src/pages/dbh2-proportzionaltasuna-v2/games/race.ts'
import { proportionDbh2LabChallengeIds as proportionLabChallengeIds } from '../src/pages/dbh2-proportzionaltasuna-v2/lab/labTools.ts'
import { createProportionDetectiveCases, proportionDetectiveLevels, proportionDetectiveNames, proportionDetectiveTips } from '../src/pages/dbh2-proportzionaltasuna-v2/games/detective.ts'
import { createKindRounds, KIND_ROUNDS, relationOf, SITUATIONS } from '../src/pages/dbh2-proportzionaltasuna-v2/games/kind.ts'
import { applyChanges, createTagRound, tagPrice, tagSolved } from '../src/pages/dbh2-proportzionaltasuna-v2/games/tag.ts'
import { createWorkRound, finishesOnTime, totalWork } from '../src/pages/dbh2-proportzionaltasuna-v2/games/work.ts'
import { checkTexts, checkWorkedCases } from './helpers/ownGamesCheck.ts'

const renders = (latex: string) => katex.renderToString(latex, { throwOnError: true, strict: 'error' })

function checkQuestion(question: ProportionRaceQuestion): number {
    assert.equal(question.options.length, 4, question.kind)
    assert.equal(new Set(question.options.map((option) => option.latex)).size, 4, question.kind)
    assert.equal(question.options.filter((option) => option.correct).length, 1, question.kind)
    const answer = toNumber(question.answer)
    assert.ok(answer > 0, question.kind)
    for (const option of question.options) {
        renders(option.latex)
        const value = valueOf(option.latex)
        assert.ok(value !== null && value > 0, `${question.kind}: ${option.latex}`)
        if (option.correct) assert.ok(Math.abs(value! - answer) < 1e-9, `${question.kind}: ${option.latex} ≠ ${answer}`)
        else {
            assert.ok(proportionRaceErrorTips[option.error!], `${question.kind}: ${option.error}`)
            assert.ok(Math.abs(value! - answer) > 1e-9, `${question.kind}: wrong option ${option.latex} equals the answer`)
        }
    }
    for (const language of ['eu', 'es', 'en', 'ar'] as const) {
        for (const text of [question.prompt[language], question.solution[language]]) for (const [, formula] of text.matchAll(/\$([^$]+)\$/g)) renders(formula)
    }
    assert.ok(!question.prompt.ar.includes('{,}') && !question.solution.ar.includes('{,}'), question.kind)
    assert.ok(question.writable && hasTerminatingDecimal(question.answer), question.kind)
    const comma = typed(question.answer)
    for (const input of [comma, comma.replace(',', '.'), `${comma} %`]) assert.equal(checkProportionPitAnswer(question, input), 'correct', `${question.kind}: ${input}`)
    return checkChain(question.solution.es, question.kind)
}

/** Value of a memory card: a percentage (as a decimal), a change (as its index), an index or a product of indices */
const cardValue = (latex: string) => {
    const change = latex.match(/^([+-])(\d+)\\,\\%$/)
    if (change) return (100 + (change[1] === '+' ? 1 : -1) * Number(change[2])) / 100
    if (latex.includes('\\%')) return Number(latex.split('\\,\\%')[0].replace('{,}', '.')) / 100
    return valueOf(latex.replace(/^\\cdot /, ''))
}

test('proportzionaltasuna 2. DBH games: levels, ids and routes', () => {
    assert.deepEqual(proportionGames.map((game) => game.id), ['race', 'tag', 'kind', 'work', 'detective', 'memory'])
    for (const game of proportionGames) for (const level of game.levels) for (const language of ['eu', 'es', 'en', 'ar'] as const) assert.ok(!level.description[language].includes('$'))
    assert.equal(proportionGameModeForPath('/matematika/dbh2/proporcionalidad/juegos/etiqueta'), 'tag')
    assert.equal(proportionGameModeForPath('/matematika/dbh2/proporcionalidad/jokuak/obra'), 'work')
    assert.equal(proportionGameModeForPath('/matematika/dbh2/proporcionalidad/juegos/directa-inversa'), 'kind')
    assert.equal(proportionGameModeForPath('/matematika/dbh2/proporcionalidad/juegos/detective'), 'detective')
    assert.equal(proportionGames[0].levels.length, PROPORTION_RACE_CIRCUITS)
    assert.equal(proportionGames.find((game) => game.id === 'memory')!.levels.length, proportionMemoryLevels.length)
    assert.equal(new Set(proportionGameProgressIds).size, proportionGameProgressIds.length)
    assert.ok(!proportionGameProgressIds.some((id) => proportionLabChallengeIds.includes(id)))
    const stages = ['proportions', 'compound', 'shares', 'percent', 'changes']
    for (const game of proportionGames) for (const level of game.levels) assert.ok(stages.includes(level.stage), `${game.id} ${level.stage}`)
    assert.equal(proportionGameModeForPath('/matematika/dbh2/proporcionalidad/juegos/carrera'), 'race')
    assert.equal(proportionGameModeForPath('/matematika/dbh2/proporcionalidad/jokuak/memoria'), 'memory')
    assert.equal(proportionGameModeForPath('/matematika/dbh2/proporcionalidad/jokuak'), 'hub')
})

test('proportzionaltasuna 2. DBH race: every circuit has valid questions, typical mistakes and written answers', () => {
    const kinds = new Set<string>()
    let chains = 0
    for (let circuit = 0; circuit < PROPORTION_RACE_CIRCUITS; circuit += 1) {
        for (let seed = 1; seed <= 150; seed += 1) {
            const random = createRandom(seed * 13 + circuit)
            for (const tier of [0, 1, 2] as const) {
                const question = generateProportionRaceQuestion(random, circuit, tier)
                assert.equal(question.circuit, circuit)
                kinds.add(`${circuit}:${question.kind}`)
                chains += checkQuestion(question)
            }
        }
        assert.ok(proportionParTime(circuit) > 60000)
    }
    for (const kind of ['0:fourth', '0:inverse', '1:compound-inverse-inverse', '1:compound-direct-direct', '1:compound-inverse-direct', '2:direct-share', '2:inverse-share', '3:percent-of', '3:total', '3:variation', '4:initial-rise', '4:initial-discount', '4:chained', '4:interest']) assert.ok(kinds.has(kind), `never generated: ${kind}`)
    assert.ok(chains > 1500, `only ${chains} worked lines checked`)
})

test('proportzionaltasuna 2. DBH race: the typical mistakes show up', () => {
    const errors = new Set<string>()
    for (let seed = 1; seed <= 200; seed += 1) {
        const random = createRandom(seed)
        for (let circuit = 0; circuit < PROPORTION_RACE_CIRCUITS; circuit += 1) {
            for (const tier of [0, 2] as const) for (const option of generateProportionRaceQuestion(random, circuit, tier).options) if (option.error) errors.add(option.error)
        }
    }
    for (const error of Object.keys(proportionRaceErrorTips).filter((error) => error !== 'calculation')) assert.ok(errors.has(error), `never used: ${error}`)
})

test('proportzionaltasuna 2. DBH memory: every card has exactly one partner and the pair is true', () => {
    for (let level = 0; level < proportionMemoryLevels.length; level += 1) {
        for (let seed = 1; seed <= 60; seed += 1) {
            const cards = createProportionMemoryBoard(createRandom(seed + level * 100), level)
            assert.equal(cards.length, PROPORTION_MEMORY_PAIRS * 2)
            assert.equal(new Set(cards.map((card) => card.latex)).size, cards.length)
            for (const card of cards) {
                renders(card.latex)
                const partner = cards.find((other) => other.setId === card.setId && other.id !== card.id)!
                const a = cardValue(card.latex)
                const b = cardValue(partner.latex)
                assert.ok(a !== null && b !== null && Math.abs(a - b) < 1e-9, `${card.latex} ≠ ${partner.latex}`)
                for (const other of cards.filter((item) => item.setId !== card.setId)) assert.ok(Math.abs(cardValue(other.latex)! - a!) > 1e-9, `${card.latex} ~ ${other.latex}`)
            }
        }
    }
})

/* ---------- The four games of this unit ---------- */

test('proportzionaltasuna 2. DBH tag: the right stickers give the target, in cents, and percentages do not add up', () => {
    assert.equal(applyChanges(100, [20, -20]), 96)
    assert.equal(applyChanges(80, [-25]), 60)
    for (let level = 0; level < 3; level += 1) {
        let traps = 0
        for (let seed = 1; seed <= 200; seed += 1) {
            const round = createTagRound(createRandom(seed * 7919 + level), level)
            assert.ok(tagSolved(round, round.solution))
            assert.notEqual(round.target, round.price)
            assert.ok(Math.abs(round.target * 100 - Math.round(round.target * 100)) < 1e-9)
            assert.equal(new Set(round.stickers).size, round.stickers.length)
            assert.equal(round.stickers.length, [4, 5, 6][level])
            if (round.solution.length > 1) for (let index = 0; index < round.stickers.length; index += 1) assert.ok(!tagSolved(round, [index]), `${round.price} ${round.stickers}`)
            // The order of the stickers does not matter
            assert.equal(tagPrice(round, [...round.solution].reverse()), round.target)
            if (level === 1 && round.stickers[round.solution[0]] === -round.stickers[round.solution[1]]) traps += 1
        }
        if (level === 1) assert.ok(traps > 50, `${traps}`)
    }
})

test('proportzionaltasuna 2. DBH kind: every answer at least twice, tables match their answer', () => {
    checkTexts(SITUATIONS.flatMap((item) => [item.text, item.why]))
    for (const answer of ['direct', 'inverse', 'none'] as const) assert.ok(SITUATIONS.filter((item) => item.answer === answer).length >= 3)
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 100; seed += 1) {
            const rounds = createKindRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, KIND_ROUNDS)
            for (const answer of ['direct', 'inverse', 'none'] as const) assert.ok(rounds.filter((round) => round.answer === answer).length >= 2)
            for (const round of rounds) {
                if (level === 0) assert.equal(round.shown, 'situation')
                if (level === 1) assert.equal(round.shown, 'table')
                if (round.shown === 'table') {
                    assert.equal(relationOf(round.xs, round.ys), round.answer)
                    assert.equal(new Set(round.xs).size, 4)
                    assert.ok(round.ys.every((y) => Number.isInteger(y) && y > 0))
                    checkTexts([round.why])
                }
            }
        }
    }
})

test('proportzionaltasuna 2. DBH work: the solution finishes exactly on the deadline', () => {
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 200; seed += 1) {
            const round = createWorkRound(createRandom(seed * 7919 + level), level)
            assert.ok(finishesOnTime(round, round.solution.workers, round.solution.hours))
            assert.equal(round.solution.workers * round.solution.hours * round.deadline, totalWork(round))
            assert.ok(round.solution.workers >= 1 && round.solution.workers <= 24 && round.solution.hours >= 1 && round.solution.hours <= 10)
            assert.ok(!finishesOnTime(round, round.workers, round.fixedHours ?? round.hours) || level === 2)
            if (level === 0) assert.equal(round.fixedHours, round.hours)
            if (level === 1) assert.notEqual(round.fixedHours, round.hours)
            if (level === 2) assert.equal(round.fixedHours, null)
        }
    }
})

test('proportzionaltasuna 2. DBH detective: one wrong line, the fix gives the right value', () => {
    checkTexts([...Object.values(proportionDetectiveNames), ...Object.values(proportionDetectiveTips)])
    for (let level = 0; level < 3; level += 1) {
        const seen = new Set<string>()
        for (let seed = 1; seed <= 80; seed += 1) {
            const cases = createProportionDetectiveCases(createRandom(seed * 7919 + level), level)
            for (const item of cases) seen.add(item.error)
            checkWorkedCases(cases, proportionDetectiveLevels[level])
        }
        assert.equal(seen.size, 4)
    }
})
