import test from 'node:test'
import assert from 'node:assert/strict'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import { toNumber } from '../src/features/unit-v2/math/fraction.ts'
import { statisticsGameModeForPath, statisticsGameProgressIds, statisticsGames } from '../src/pages/dbh1-estatistika-v2/games/info.ts'
import { checkStatisticsPitAnswer, generateStatisticsRaceQuestion, STATISTICS_RACE_CIRCUITS, statisticsRaceErrorTips } from '../src/pages/dbh1-estatistika-v2/games/race.ts'
import { createMeanRound, createStatisticsMemoryBoard, MEAN_ROUNDS, meanLevels, meanOfData, meanPoints, meanStars, STATISTICS_MEMORY_PAIRS, statisticsMemoryLevels } from '../src/pages/dbh1-estatistika-v2/games/boards.ts'
import { statisticsLabChallengeIds } from '../src/pages/dbh1-estatistika-v2/lab/labTools.ts'

/** Plain arithmetic: fractions, ·, :, percentages and die events P({…}) */
function evaluate(latex: string): number {
    const event = latex.match(/^P\(\\\{([\d,]+)\\\}\)$/)
    if (event) return event[1].split(',').length / 6
    let js = latex.replace(/\\,\\%$/, '/100').replace(/(\d)\{,\}(\d)/g, '$1.$2').replace(/\\cdot/g, '*').replace(/\\mathbin\{:\}/g, '/')
    for (let pass = 0; pass < 2; pass += 1) js = js.replace(/\\frac\{([^{}]+)\}\{([^{}]+)\}/g, '(($1)/($2))')
    js = js.replace(/\s+/g, '')
    assert.ok(/^[\d+\-*/().]+$/.test(js), latex)
    return Function(`return ${js}`)() as number
}

test('estatistika 1. DBH games: levels, ids and routes', () => {
    assert.equal(statisticsGames.length, 3)
    assert.equal(statisticsGames[0].levels.length, STATISTICS_RACE_CIRCUITS)
    assert.equal(statisticsGames.find((game) => game.id === 'mean')!.levels.length, meanLevels.length)
    assert.equal(statisticsGames.find((game) => game.id === 'memory')!.levels.length, statisticsMemoryLevels.length)
    assert.equal(new Set(statisticsGameProgressIds).size, statisticsGameProgressIds.length)
    assert.ok(!statisticsGameProgressIds.some((id) => statisticsLabChallengeIds.includes(id)))
    assert.equal(statisticsGameModeForPath('/matematika/dbh1/estadistica/juegos/media'), 'mean')
    assert.equal(statisticsGameModeForPath('/matematika/dbh1/estadistica/jokuak/lasterketa'), 'race')
})

test('estatistika 1. DBH race: four different positive options, one right answer, worked solution matches', () => {
    for (let circuit = 0; circuit < STATISTICS_RACE_CIRCUITS; circuit += 1) {
        for (let seed = 1; seed <= 120; seed += 1) {
            const random = createRandom(seed * 31 + circuit)
            for (const tier of [0, 1, 2] as const) {
                const question = generateStatisticsRaceQuestion(random, circuit, tier)
                assert.equal(question.options.length, 4, question.kind)
                const values = question.options.map((option) => evaluate(option.latex))
                assert.equal(new Set(values.map((value) => value.toFixed(9))).size, 4, `${question.kind}: ${question.options.map((option) => option.latex).join(' | ')}`)
                assert.equal(question.options.filter((option) => option.correct).length, 1)
                for (const [index, option] of question.options.entries()) {
                    assert.ok(values[index] > 0, `${question.kind}: ${option.latex}`)
                    if (!option.correct) assert.ok(statisticsRaceErrorTips[option.error!], option.error!)
                }
                const value = toNumber(question.answer)
                assert.ok(Math.abs(evaluate(question.options.find((option) => option.correct)!.latex) - value) < 1e-9, question.kind)
                if (circuit === 4) assert.ok(value > 0 && value <= 1)
                const typed = question.answer.denominator === 1 || [2, 4, 5, 10, 20, 25, 50, 100].includes(question.answer.denominator) ? String(value).replace('.', ',') : `${question.answer.numerator}/${question.answer.denominator}`
                assert.equal(checkStatisticsPitAnswer(question, typed), 'correct', `${question.kind} ${typed}`)
                const worked = question.solution.es
                if (worked.startsWith('$')) {
                    const results = worked.replace(/\$/g, '').split('=').map(evaluate)
                    assert.ok(results.every((result) => Math.abs(result - results[0]) < 1e-9), `${question.kind}: ${worked}`)
                    assert.ok(Math.abs(results[0] - value) < 1e-9, `${question.kind}: ${worked}`)
                } else {
                    assert.ok(worked.endsWith(` ${String(value).replace('.', ',')}`), `${question.kind}: ${worked}`)
                }
            }
        }
    }
})

test('estatistika 1. DBH mean game and memory', () => {
    for (let level = 0; level < meanLevels.length; level += 1) {
        const round = createMeanRound(createRandom(level + 5), level)
        assert.equal(round.length, MEAN_ROUNDS)
        for (const values of round) {
            assert.equal(values.length, meanLevels[level].count)
            assert.ok(values.every((value) => value >= 0 && value <= meanLevels[level].max))
            if (meanLevels[level].wholeMean) assert.ok(Number.isInteger(meanOfData(values)))
        }
    }
    assert.deepEqual([meanPoints(6.2, [4, 6, 8], 10), meanPoints(6.7, [4, 6, 8], 10), meanPoints(7.4, [4, 6, 8], 10), meanPoints(9, [4, 6, 8], 10)], [3, 2, 1, 0])
    assert.equal(meanStars(24), 3)
    for (let level = 0; level < statisticsMemoryLevels.length; level += 1) {
        for (let seed = 1; seed <= 40; seed += 1) {
            const cards = createStatisticsMemoryBoard(createRandom(seed * 7 + level), level)
            assert.equal(cards.length, STATISTICS_MEMORY_PAIRS * 2)
            const answers = cards.filter((card) => card.id.endsWith('-a')).map((card) => evaluate(card.latex))
            assert.equal(new Set(answers).size, STATISTICS_MEMORY_PAIRS)
            for (const card of cards.filter((item) => item.id.endsWith('-q'))) {
                const partner = cards.find((item) => item.setId === card.setId && item.id.endsWith('-a'))!
                assert.ok(Math.abs(evaluate(card.latex) - evaluate(partner.latex)) < 1e-9, `${card.latex} = ${partner.latex}`)
            }
        }
    }
})
