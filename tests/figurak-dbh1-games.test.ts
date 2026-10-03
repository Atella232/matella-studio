import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { checkChain, typed, valueOf } from './helpers/realsRaceCheck.ts'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import { hasTerminatingDecimal, toNumber } from '../src/features/unit-v2/math/fraction.ts'
import { createFiguresMemoryBoard as createProportionMemoryBoard, FIGURES_MEMORY_PAIRS as PROPORTION_MEMORY_PAIRS, figuresMemoryLevels as proportionMemoryLevels } from '../src/pages/dbh1-figurak-v2/games/boards.ts'
import { figuresGameModeForPath as proportionGameModeForPath, figuresGameProgressIds as proportionGameProgressIds, figuresGames as proportionGames } from '../src/pages/dbh1-figurak-v2/games/info.ts'
import { checkFiguresPitAnswer as checkProportionPitAnswer, FIGURES_RACE_CIRCUITS as PROPORTION_RACE_CIRCUITS, figuresParTime as proportionParTime, figuresRaceErrorTips as proportionRaceErrorTips, generateFiguresRaceQuestion as generateProportionRaceQuestion, type FiguresRaceQuestion as ProportionRaceQuestion } from '../src/pages/dbh1-figurak-v2/games/race.ts'
import { figuresLabChallengeIds as proportionLabChallengeIds } from '../src/pages/dbh1-figurak-v2/lab/labTools.ts'

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
    for (const input of [comma, comma.replace(',', '.'), `${comma}°`, `${comma} cm²`]) assert.equal(checkProportionPitAnswer(question, input), 'correct', `${question.kind}: ${input}`)
    return checkChain(question.solution.es, question.kind)
}

/** Value of a memory card: a number of degrees, a quotient or a product */
const cardValue = (latex: string) => valueOf(latex.replace(/\^\{\\circ\}/g, ''))

test('irudi lauak 1. DBH games: levels, ids and routes', () => {
    assert.equal(proportionGames.length, 2)
    assert.equal(proportionGames[0].levels.length, PROPORTION_RACE_CIRCUITS)
    assert.equal(proportionGames.find((game) => game.id === 'memory')!.levels.length, proportionMemoryLevels.length)
    assert.equal(new Set(proportionGameProgressIds).size, proportionGameProgressIds.length)
    assert.ok(!proportionGameProgressIds.some((id) => proportionLabChallengeIds.includes(id)))
    const stages = ['polygons', 'triangles', 'quadrilaterals', 'circles', 'areas']
    for (const game of proportionGames) for (const level of game.levels) assert.ok(stages.includes(level.stage), `${game.id} ${level.stage}`)
    assert.equal(proportionGameModeForPath('/matematika/dbh1/figuras-planas/juegos/carrera'), 'race')
    assert.equal(proportionGameModeForPath('/matematika/dbh1/figuras-planas/jokuak/memoria'), 'memory')
    assert.equal(proportionGameModeForPath('/matematika/dbh1/figuras-planas/jokuak'), 'hub')
})

test('irudi lauak 1. DBH race: every circuit has valid questions, typical mistakes and written answers', () => {
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
    for (const kind of ['0:diagonals', '0:angle-sum', '0:interior', '0:central', '1:isosceles-base', '1:isosceles-apex', '1:side-max', '1:side-min', '1:circumradius', '2:parallelogram', '2:quad-missing', '2:axes', '3:tangent-exterior', '3:tangent-interior', '3:inscribed', '3:central', '4:sector', '4:ring', '4:l-shape']) assert.ok(kinds.has(kind), `never generated: ${kind}`)
    assert.ok(chains > 1500, `only ${chains} worked lines checked`)
})

test('irudi lauak 1. DBH race: the typical mistakes show up', () => {
    const errors = new Set<string>()
    for (let seed = 1; seed <= 200; seed += 1) {
        const random = createRandom(seed)
        for (let circuit = 0; circuit < PROPORTION_RACE_CIRCUITS; circuit += 1) {
            for (const tier of [0, 2] as const) for (const option of generateProportionRaceQuestion(random, circuit, tier).options) if (option.error) errors.add(option.error)
        }
    }
    for (const error of Object.keys(proportionRaceErrorTips).filter((error) => error !== 'calculation')) assert.ok(errors.has(error), `never used: ${error}`)
})

test('irudi lauak 1. DBH memory: every card has exactly one partner and the pair is true', () => {
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
