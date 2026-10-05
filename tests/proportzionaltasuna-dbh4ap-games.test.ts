import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { checkChain, typed, valueOf } from './helpers/realsRaceCheck.ts'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import { hasTerminatingDecimal, toNumber } from '../src/features/unit-v2/math/fraction.ts'
import { createProportionDbh4ApMemoryBoard as createProportionMemoryBoard, PROPORTION_DBH4AP_MEMORY_PAIRS as PROPORTION_MEMORY_PAIRS, proportionDbh4ApMemoryLevels as proportionMemoryLevels } from '../src/pages/dbh4-aplikatuak-proportzionaltasuna/games/boards.ts'
import { proportionDbh4ApGameModeForPath as proportionGameModeForPath, proportionDbh4ApGameProgressIds as proportionGameProgressIds, proportionDbh4ApGames as proportionGames } from '../src/pages/dbh4-aplikatuak-proportzionaltasuna/games/info.ts'
import { checkProportionDbh4ApPitAnswer as checkProportionPitAnswer, PROPORTION_DBH4AP_RACE_CIRCUITS as PROPORTION_RACE_CIRCUITS, proportionDbh4ApParTime as proportionParTime, proportionDbh4ApRaceErrorTips as proportionRaceErrorTips, generateProportionDbh4ApRaceQuestion as generateProportionRaceQuestion, type ProportionDbh4ApRaceQuestion as ProportionRaceQuestion } from '../src/pages/dbh4-aplikatuak-proportzionaltasuna/games/race.ts'
import { proportionDbh4ApLabChallengeIds as proportionLabChallengeIds } from '../src/pages/dbh4-aplikatuak-proportzionaltasuna/lab/labTools.ts'

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
    for (const language of ['eu', 'es', 'ar'] as const) {
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

test('proportzionaltasuna 4. DBH ap games: levels, ids and routes', () => {
    assert.equal(proportionGames.length, 2)
    assert.equal(proportionGames[0].levels.length, PROPORTION_RACE_CIRCUITS)
    assert.equal(proportionGames.find((game) => game.id === 'memory')!.levels.length, proportionMemoryLevels.length)
    assert.equal(new Set(proportionGameProgressIds).size, proportionGameProgressIds.length)
    assert.ok(!proportionGameProgressIds.some((id) => proportionLabChallengeIds.includes(id)))
    const stages = ['simple', 'compound', 'percent', 'interest', 'problems']
    for (const game of proportionGames) for (const level of game.levels) assert.ok(stages.includes(level.stage), `${game.id} ${level.stage}`)
    assert.equal(proportionGameModeForPath('/matematika/dbh4-aplikatuak/proporcionalidad/juegos/carrera'), 'race')
    assert.equal(proportionGameModeForPath('/matematika/dbh4-aplikatuak/proporcionalidad/jokuak/memoria'), 'memory')
    assert.equal(proportionGameModeForPath('/matematika/dbh4-aplikatuak/proporcionalidad/jokuak'), 'hub')
})

test('proportzionaltasuna 4. DBH ap race: every circuit has valid questions, typical mistakes and written answers', () => {
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
    for (const kind of ['0:fourth', '0:inverse', '1:compound-inverse-inverse', '1:compound-direct-direct', '1:compound-inverse-direct', '1:direct-share', '1:inverse-share', '2:percent-of', '2:total', '2:variation', '2:initial-rise', '2:initial-discount', '2:chained', '3:compound', '3:initial-capital', '3:months', '4:mixture', '4:meet', '4:chase', '4:taps']) assert.ok(kinds.has(kind), `never generated: ${kind}`)
    assert.ok(chains > 1500, `only ${chains} worked lines checked`)
})

test('proportzionaltasuna 4. DBH ap race: the typical mistakes show up', () => {
    const errors = new Set<string>()
    for (let seed = 1; seed <= 200; seed += 1) {
        const random = createRandom(seed)
        for (let circuit = 0; circuit < PROPORTION_RACE_CIRCUITS; circuit += 1) {
            for (const tier of [0, 2] as const) for (const option of generateProportionRaceQuestion(random, circuit, tier).options) if (option.error) errors.add(option.error)
        }
    }
    for (const error of Object.keys(proportionRaceErrorTips).filter((error) => error !== 'calculation')) assert.ok(errors.has(error), `never used: ${error}`)
})

test('proportzionaltasuna 4. DBH ap memory: every card has exactly one partner and the pair is true', () => {
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

test('proportzionaltasuna 4. DBH ap race: the percentage circuit never asks for interest', () => {
    for (let seed = 1; seed <= 300; seed += 1) assert.notEqual(generateProportionRaceQuestion(createRandom(seed), 2, 1).kind, 'interest')
})
