import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { checkChain, typed, valueOf } from './helpers/realsRaceCheck.ts'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import { hasTerminatingDecimal, toNumber } from '../src/features/unit-v2/math/fraction.ts'
import { createSolidsMemoryBoard, SOLIDS_MEMORY_PAIRS, solidsMemoryLevels } from '../src/pages/dbh2-gorputzak-v2/games/boards.ts'
import { solidsGameModeForPath, solidsGameProgressIds, solidsGames } from '../src/pages/dbh2-gorputzak-v2/games/info.ts'
import { checkSolidsPitAnswer, generateSolidsRaceQuestion, SOLIDS_RACE_CIRCUITS, solidsParTime, solidsRaceErrorTips, type SolidsRaceQuestion } from '../src/pages/dbh2-gorputzak-v2/games/race.ts'
import { solidsLabChallengeIds } from '../src/pages/dbh2-gorputzak-v2/lab/labTools.ts'

const renders = (latex: string) => katex.renderToString(latex, { throwOnError: true, strict: 'error' })

function checkQuestion(question: SolidsRaceQuestion): number {
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
            assert.ok(solidsRaceErrorTips[option.error!], `${question.kind}: ${option.error}`)
            assert.ok(Math.abs(value! - answer) > 1e-9, `${question.kind}: wrong option ${option.latex} equals the answer`)
        }
    }
    for (const language of ['eu', 'es', 'ar'] as const) {
        for (const text of [question.prompt[language], question.solution[language]]) for (const [, formula] of text.matchAll(/\$([^$]+)\$/g)) renders(formula)
        assert.ok(!question.prompt[language].includes('?') || question.prompt[language].trim().length > 10)
    }
    assert.ok(!question.prompt.ar.includes('{,}') && !question.solution.ar.includes('{,}'), question.kind)
    assert.ok(question.writable && hasTerminatingDecimal(question.answer), question.kind)
    const comma = typed(question.answer)
    for (const input of [comma, comma.replace(',', '.'), `${comma} cm²`, `${comma} cm³`, `${comma} L`]) assert.equal(checkSolidsPitAnswer(question, input), 'correct', `${question.kind}: ${input}`)
    return checkChain(question.solution.es, question.kind)
}

test('gorputzak 2. DBH games: levels, ids and routes', () => {
    assert.equal(solidsGames.length, 2)
    assert.equal(solidsGames[0].levels.length, SOLIDS_RACE_CIRCUITS)
    assert.equal(solidsGames.find((game) => game.id === 'memory')!.levels.length, solidsMemoryLevels.length)
    assert.equal(new Set(solidsGameProgressIds).size, solidsGameProgressIds.length)
    assert.ok(!solidsGameProgressIds.some((id) => solidsLabChallengeIds.includes(id)))
    const stages = ['polyhedra', 'areas', 'round', 'units', 'volume']
    for (const game of solidsGames) for (const level of game.levels) assert.ok(stages.includes(level.stage), `${game.id} ${level.stage}`)
    assert.equal(solidsGameModeForPath('/matematika/dbh2/cuerpos-geometricos/juegos/carrera'), 'race')
    assert.equal(solidsGameModeForPath('/matematika/dbh2/cuerpos-geometricos/jokuak/memoria'), 'memory')
    assert.equal(solidsGameModeForPath('/matematika/dbh2/cuerpos-geometricos/jokuak'), 'hub')
})

test('gorputzak 2. DBH race: every circuit has valid questions, typical mistakes and written answers', () => {
    const kinds = new Set<string>()
    let chains = 0
    for (let circuit = 0; circuit < SOLIDS_RACE_CIRCUITS; circuit += 1) {
        for (let seed = 1; seed <= 150; seed += 1) {
            const random = createRandom(seed * 13 + circuit)
            for (const tier of [0, 1, 2] as const) {
                const question = generateSolidsRaceQuestion(random, circuit, tier)
                assert.equal(question.circuit, circuit)
                kinds.add(`${circuit}:${question.kind}`)
                chains += checkQuestion(question)
            }
        }
        assert.ok(solidsParTime(circuit) > 60000)
    }
    for (const kind of ['0:count-faces', '0:count-edges', '0:count-vertices', '0:euler-faces', '0:euler-vertices', '0:euler-edges', '1:cube', '1:cuboid', '1:pyramid-apothem', '1:pyramid-height', '2:cylinder', '2:cylinder-diameter', '2:cone', '2:cone-height', '2:sphere', '2:sphere-diameter', '3:units', '3:litres', '3:tank-dm', '3:tank-cm', '4:prism-volume', '4:cylinder-volume', '4:pyramid-volume', '4:cone-volume', '4:sphere-volume']) assert.ok(kinds.has(kind), `never generated: ${kind}`)
    assert.ok(chains > 1500, `only ${chains} worked lines checked`)
})

test('gorputzak 2. DBH race: the typical mistakes show up', () => {
    const errors = new Set<string>()
    for (let seed = 1; seed <= 200; seed += 1) {
        const random = createRandom(seed)
        for (let circuit = 0; circuit < SOLIDS_RACE_CIRCUITS; circuit += 1) {
            for (const tier of [0, 2] as const) for (const option of generateSolidsRaceQuestion(random, circuit, tier).options) if (option.error) errors.add(option.error)
        }
    }
    for (const error of Object.keys(solidsRaceErrorTips).filter((error) => error !== 'calculation')) assert.ok(errors.has(error), `never used: ${error}`)
})

test('gorputzak 2. DBH memory: every card has exactly one partner and the pair is true', () => {
    /** Value of a card: a number, or an amount with a unit turned into cm³ */
    const cardValue = (latex: string) => {
        const unit = latex.match(/\\ \\text\{(m|dm|cm|L|mL)\}/)?.[1]
        const factor = unit ? { m: 1_000_000, dm: 1000, L: 1000, cm: 1, mL: 1 }[unit] : 1
        return valueOf(latex.replace(/\\ \\text\{[^}]*\}(\^\{3\})?/, ''))! * factor
    }
    for (let level = 0; level < solidsMemoryLevels.length; level += 1) {
        for (let seed = 1; seed <= 80; seed += 1) {
            const cards = createSolidsMemoryBoard(createRandom(seed + level * 100), level)
            assert.equal(cards.length, SOLIDS_MEMORY_PAIRS * 2)
            assert.equal(new Set(cards.map((card) => card.latex)).size, cards.length)
            for (const card of cards) {
                renders(card.latex)
                const partner = cards.find((other) => other.setId === card.setId && other.id !== card.id)!
                const a = cardValue(card.latex)
                const b = cardValue(partner.latex)
                assert.ok(Number.isFinite(a) && Math.abs(a - b) < 1e-6, `${card.latex} ≠ ${partner.latex}`)
                for (const other of cards.filter((item) => item.setId !== card.setId)) assert.ok(Math.abs(cardValue(other.latex) - a) > 1e-6, `${card.latex} ~ ${other.latex}`)
            }
        }
    }
})
