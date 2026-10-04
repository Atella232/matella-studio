import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { checkChain, typed, valueOf } from './helpers/realsRaceCheck.ts'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import { toNumber } from '../src/features/unit-v2/math/fraction.ts'
import { createStatisticsMemoryBoard, STATISTICS_MEMORY_PAIRS, statisticsMemoryLevels } from '../src/pages/dbh2-estatistika-v2/games/boards.ts'
import { statisticsGameModeForPath, statisticsGameProgressIds, statisticsGames } from '../src/pages/dbh2-estatistika-v2/games/info.ts'
import { checkStatisticsPitAnswer, generateStatisticsRaceQuestion, STATISTICS_RACE_CIRCUITS, statisticsParTime, statisticsRaceErrorTips, type StatisticsRaceQuestion } from '../src/pages/dbh2-estatistika-v2/games/race.ts'
import { statisticsLabChallengeIds } from '../src/pages/dbh2-estatistika-v2/lab/labTools.ts'

const renders = (latex: string) => katex.renderToString(latex, { throwOnError: true, strict: 'error' })

function checkQuestion(question: StatisticsRaceQuestion): number {
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
            assert.ok(statisticsRaceErrorTips[option.error!], `${question.kind}: ${option.error}`)
            assert.ok(Math.abs(value! - answer) > 1e-9, `${question.kind}: wrong option ${option.latex} equals the answer`)
        }
    }
    for (const language of ['eu', 'es', 'ar'] as const) {
        for (const text of [question.prompt[language], question.solution[language]]) for (const [, formula] of text.matchAll(/\$([^$]+)\$/g)) renders(formula)
    }
    assert.ok(!question.prompt.ar.includes('{,}') && !question.solution.ar.includes('{,}'), question.kind)
    // No Basque suffix glued to a generated number: «$5$ean» would read badly
    assert.ok(!/\$[a-z]/.test(question.prompt.eu), `${question.kind}: ${question.prompt.eu}`)
    const written = typed(question.answer)
    for (const input of [written, written.replace(',', '.'), `${written} %`, `${written}°`]) assert.equal(checkStatisticsPitAnswer(question, input), 'correct', `${question.kind}: ${input}`)
    return checkChain(question.solution.es, question.kind)
}

test('estatistika 2. DBH games: levels, ids and routes', () => {
    assert.equal(statisticsGames.length, 2)
    assert.equal(statisticsGames[0].levels.length, STATISTICS_RACE_CIRCUITS)
    assert.equal(statisticsGames.find((game) => game.id === 'memory')!.levels.length, statisticsMemoryLevels.length)
    assert.equal(new Set(statisticsGameProgressIds).size, statisticsGameProgressIds.length)
    assert.ok(!statisticsGameProgressIds.some((id) => statisticsLabChallengeIds.includes(id)))
    const stages = ['tables', 'graphs', 'centre', 'spread', 'chance']
    for (const game of statisticsGames) for (const level of game.levels) assert.ok(stages.includes(level.stage), `${game.id} ${level.stage}`)
    assert.equal(statisticsGameModeForPath('/matematika/dbh2/estadistica-probabilidad/juegos/carrera'), 'race')
    assert.equal(statisticsGameModeForPath('/matematika/dbh2/estadistica-probabilidad/jokuak/memoria'), 'memory')
    assert.equal(statisticsGameModeForPath('/matematika/dbh2/estadistica-probabilidad/jokuak'), 'hub')
})

test('estatistika 2. DBH race: every circuit has valid questions, typical mistakes and written answers', () => {
    const kinds = new Set<string>()
    let chains = 0
    for (let circuit = 0; circuit < STATISTICS_RACE_CIRCUITS; circuit += 1) {
        for (let seed = 1; seed <= 150; seed += 1) {
            const random = createRandom(seed * 13 + circuit)
            for (const tier of [0, 1, 2] as const) {
                const question = generateStatisticsRaceQuestion(random, circuit, tier)
                assert.equal(question.circuit, circuit)
                kinds.add(`${circuit}:${question.kind}`)
                chains += checkQuestion(question)
            }
        }
        assert.ok(statisticsParTime(circuit) > 60000)
    }
    for (const kind of ['0:cumulative', '0:relative-cumulative', '0:class-mark', '1:angle', '1:count-from-angle', '1:percent-from-angle', '2:mean-table', '2:median-table', '2:missing-datum', '3:range', '3:deviation', '3:first-quartile', '3:third-quartile', '4:complement', '4:dice-sum', '4:dice-at-least', '4:coins-2', '4:coins-3']) assert.ok(kinds.has(kind), `never generated: ${kind}`)
    assert.ok(chains > 1000, `only ${chains} worked lines checked`)
})

test('estatistika 2. DBH race: the typical mistakes show up', () => {
    const errors = new Set<string>()
    for (let seed = 1; seed <= 200; seed += 1) {
        const random = createRandom(seed)
        for (let circuit = 0; circuit < STATISTICS_RACE_CIRCUITS; circuit += 1) {
            for (const tier of [0, 2] as const) for (const option of generateStatisticsRaceQuestion(random, circuit, tier).options) if (option.error) errors.add(option.error)
        }
    }
    for (const error of Object.keys(statisticsRaceErrorTips).filter((error) => error !== 'calculation')) assert.ok(errors.has(error), `never used: ${error}`)
})

test('estatistika 2. DBH memory: every card has exactly one partner and the pair is true', () => {
    /** Value of a card: a percentage turned into degrees, an interval into its class mark, or a number */
    const cardValue = (latex: string) => {
        const percent = latex.match(/^(\d+)\\,\\%$/)
        if (percent) return Number(percent[1]) * 3.6
        const interval = latex.match(/^\[(\d+),(\d+)\)$/)
        if (interval) return (Number(interval[1]) + Number(interval[2])) / 2
        return valueOf(latex.replace('^{\\circ}', ''))!
    }
    for (let level = 0; level < statisticsMemoryLevels.length; level += 1) {
        for (let seed = 1; seed <= 80; seed += 1) {
            const cards = createStatisticsMemoryBoard(createRandom(seed + level * 100), level)
            assert.equal(cards.length, STATISTICS_MEMORY_PAIRS * 2)
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
