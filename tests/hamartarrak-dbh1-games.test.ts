import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { checkChain, typed, valueOf } from './helpers/realsRaceCheck.ts'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import { hasTerminatingDecimal, toNumber } from '../src/features/unit-v2/math/fraction.ts'
import { createTargetRounds } from '../src/pages/dbh2-zatikiak-prototype/games/target.ts'
import { createDecimalsMemoryBoard, DECIMALS_MEMORY_PAIRS, decimalsMemoryLevels } from '../src/pages/dbh1-hamartarrak-v2/games/boards.ts'
import { decimalsGameModeForPath, decimalsGameProgressIds, decimalsGames, decimalsTargetLevels } from '../src/pages/dbh1-hamartarrak-v2/games/info.ts'
import { checkDecimalsPitAnswer, DECIMALS_RACE_CIRCUITS, decimalsParTime, decimalsRaceErrorTips, generateDecimalsRaceQuestion, type DecimalsRaceQuestion } from '../src/pages/dbh1-hamartarrak-v2/games/race.ts'
import { decimalsLabChallengeIds } from '../src/pages/dbh1-hamartarrak-v2/lab/labTools.ts'

const renders = (latex: string) => katex.renderToString(latex, { throwOnError: true, strict: 'error' })

function checkQuestion(question: DecimalsRaceQuestion): number {
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
            assert.ok(decimalsRaceErrorTips[option.error!], `${question.kind}: ${option.error}`)
            assert.ok(Math.abs(value! - answer) > 1e-9, `${question.kind}: wrong option ${option.latex} equals the answer`)
        }
    }
    for (const language of ['eu', 'es', 'ar'] as const) {
        for (const text of [question.prompt[language], question.solution[language]]) for (const [, formula] of text.matchAll(/\$([^$]+)\$/g)) renders(formula)
    }
    assert.ok(!question.prompt.ar.includes('{,}') && !question.solution.ar.includes('{,}'), question.kind)
    if (question.writable) {
        assert.ok(hasTerminatingDecimal(question.answer), question.kind)
        const comma = typed(question.answer)
        assert.equal(checkDecimalsPitAnswer(question, comma), 'correct', `${question.kind}: ${comma}`)
        assert.equal(checkDecimalsPitAnswer(question, comma.replace(',', '.')), 'correct', `${question.kind}: point`)
    }
    return checkChain(question.solution.es, question.kind)
}

test('hamartarrak 1. DBH games: levels, ids and routes', () => {
    assert.equal(decimalsGames.length, 3)
    assert.equal(decimalsGames[0].levels.length, DECIMALS_RACE_CIRCUITS)
    assert.equal(decimalsGames.find((game) => game.id === 'target')!.levels.length, decimalsTargetLevels.length)
    assert.equal(decimalsGames.find((game) => game.id === 'memory')!.levels.length, decimalsMemoryLevels.length)
    assert.equal(new Set(decimalsGameProgressIds).size, decimalsGameProgressIds.length)
    assert.ok(!decimalsGameProgressIds.some((id) => decimalsLabChallengeIds.includes(id)))
    const stages = ['structure', 'order', 'fractions', 'operations', 'division']
    for (const game of decimalsGames) for (const level of game.levels) assert.ok(stages.includes(level.stage), `${game.id} ${level.stage}`)
    assert.equal(decimalsGameModeForPath('/matematika/dbh1/numeros-decimales/juegos/diana'), 'target')
    assert.equal(decimalsGameModeForPath('/matematika/dbh1/numeros-decimales/jokuak/lasterketa'), 'race')
    assert.equal(decimalsGameModeForPath('/matematika/dbh1/numeros-decimales/jokuak'), 'hub')
})

test('hamartarrak 1. DBH race: every circuit has valid questions, typical mistakes and written answers', () => {
    const kinds = new Set<string>()
    let chains = 0
    for (let circuit = 0; circuit < DECIMALS_RACE_CIRCUITS; circuit += 1) {
        for (let seed = 1; seed <= 120; seed += 1) {
            const random = createRandom(seed * 13 + circuit)
            for (const tier of [0, 1, 2] as const) {
                for (const requireWritable of [false, true]) {
                    const question = generateDecimalsRaceQuestion(random, circuit, tier, requireWritable)
                    assert.equal(question.circuit, circuit)
                    if (requireWritable) assert.ok(question.writable, `${circuit} ${question.kind}`)
                    kinds.add(`${circuit}:${question.kind}`)
                    chains += checkQuestion(question)
                }
            }
        }
        assert.ok(decimalsParTime(circuit) > 60000)
    }
    const expected = ['0:digit-value', '0:compose', '0:convert', '1:largest', '1:smallest', '1:between', '1:midpoint', '2:to-fraction', '2:to-decimal', '2:round', '3:add', '3:subtract', '3:multiply', '3:shift', '4:divide-natural', '4:divide-decimal', '4:price', '4:share']
    for (const kind of expected) assert.ok(kinds.has(kind), `never generated: ${kind}`)
    assert.ok(chains > 2000, `only ${chains} worked lines checked`)
})

test('hamartarrak 1. DBH race: the typical mistakes show up', () => {
    const errors = new Set<string>()
    for (let seed = 1; seed <= 200; seed += 1) {
        const random = createRandom(seed)
        for (let circuit = 0; circuit < DECIMALS_RACE_CIRCUITS; circuit += 1) {
            for (const option of generateDecimalsRaceQuestion(random, circuit, 2).options) if (option.error) errors.add(option.error)
        }
    }
    for (const error of ['place', 'more-digits', 'outside', 'fraction-digits', 'truncate', 'comma-align', 'comma-count', 'shift-direction', 'shift-count', 'divisor-only']) assert.ok(errors.has(error), `never used: ${error}`)
})

test('hamartarrak 1. DBH memory: every card has exactly one partner and the pair is true', () => {
    for (let level = 0; level < decimalsMemoryLevels.length; level += 1) {
        for (let seed = 1; seed <= 60; seed += 1) {
            const cards = createDecimalsMemoryBoard(createRandom(seed + level * 100), level)
            assert.equal(cards.length, DECIMALS_MEMORY_PAIRS * 2)
            assert.equal(new Set(cards.map((card) => card.latex)).size, cards.length)
            for (const card of cards) {
                renders(card.latex)
                const partner = cards.find((other) => other.setId === card.setId && other.id !== card.id)!
                const a = valueOf(card.latex.replace(/\\ldots/g, ''))
                const b = valueOf(partner.latex.replace(/\\ldots/g, ''))
                assert.ok(a !== null && b !== null, `${card.latex} / ${partner.latex}`)
                // Periodic decimals are written with three digits and dots
                assert.ok(Math.abs(a! - b!) < (card.latex.includes('ldots') || partner.latex.includes('ldots') ? 1e-3 : 1e-9), `${card.latex} ≠ ${partner.latex}`)
                // No other card has the same value
                for (const other of cards.filter((item) => item.setId !== card.setId)) assert.ok(Math.abs(valueOf(other.latex.replace(/\\ldots/g, ''))! - a!) > 1e-4, `${card.latex} ~ ${other.latex}`)
            }
        }
    }
})

test('hamartarrak 1. DBH target: decimal rounds inside each level', () => {
    for (let level = 0; level < decimalsTargetLevels.length; level += 1) {
        for (let seed = 1; seed <= 30; seed += 1) {
            const rounds = createTargetRounds(createRandom(seed), level, decimalsTargetLevels)
            assert.equal(rounds.length, 10)
            for (const round of rounds) {
                assert.equal(round.form, 'decimal')
                const value = toNumber(round.value)
                assert.ok(value > decimalsTargetLevels[level].min && value < decimalsTargetLevels[level].max)
                assert.ok(!Number.isInteger(value))
            }
        }
    }
})
