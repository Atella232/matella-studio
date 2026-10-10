import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import { toNumber } from '../src/features/unit-v2/math/fraction.ts'
import { createStatisticsMemoryBoard, STATISTICS_MEMORY_PAIRS, statisticsMemoryLevels } from '../src/pages/dbh4-aplikatuak-estatistika/games/boards.ts'
import { statisticsGameModeForPath, statisticsGameProgressIds, statisticsGames } from '../src/pages/dbh4-aplikatuak-estatistika/games/info.ts'
import { checkStatisticsPitAnswer, generateStatisticsRaceQuestion, STATISTICS_RACE_CIRCUITS, statisticsParTime, statisticsRaceErrorTips, type StatisticsRaceQuestion } from '../src/pages/dbh4-aplikatuak-estatistika/games/race.ts'
import { statisticsLabChallengeIds } from '../src/pages/dbh4-aplikatuak-estatistika/lab/labTools.ts'

const close = (a: number, b: number) => Math.abs(a - b) < 1e-6
/** A LaTeX option as a number: 1{,}5, -0{,}95, \frac{3}{10} */
function valueOf(latex: string): number {
    const fraction = latex.match(/^(-?)\\frac\{(\d+)\}\{(\d+)\}$/)
    if (fraction) return (fraction[1] ? -1 : 1) * Number(fraction[2]) / Number(fraction[3])
    return Number(latex.replace(/\\,/g, '').replace('{,}', '.'))
}
/** What a learner would type for that option */
const typed = (latex: string) => latex.replace(/\\,/g, '').replace('{,}', ',').replace(/^(-?)\\frac\{(\d+)\}\{(\d+)\}$/, '$1$2/$3')

/** The textbook percentile rule, written again independently */
function percentile(counts: number[], k: number) {
    const data = counts.flatMap((count, value) => Array.from({ length: count }, () => value))
    const position = (data.length * k) / 100
    return Number.isInteger(position) ? (data[position - 1] + data[position]) / 2 : data[Math.ceil(position) - 1]
}
const rs = [0.95, -0.95, 0.5, -0.5, 0.05]

/** The answer recomputed from the data the question carries */
function expected(question: StatisticsRaceQuestion): number {
    const m = question.meta
    switch (question.kind) {
        case 'width': { const r = m.max - m.min; return (Math.floor(r / m.k) + 1) }
        case 'mark': return m.from + m.width / 2
        case 'sector': return (m.part / m.total) * 360
        case 'relative': return m.h * m.total
        case 'grouped-mean': { const c = [m.c0, m.c1, m.c2]; return c.reduce((s, f, i) => s + f * (m.width * i + m.width / 2), 0) / (m.c0 + m.c1 + m.c2) }
        case 'percentile': return percentile([m.c0, m.c1, m.c2, m.c3, m.c4], m.k)
        case 'fence-up': return m.q3 + 1.5 * (m.q3 - m.q1)
        case 'fence-down': return m.q1 - 1.5 * (m.q3 - m.q1)
        case 'variance-list': { const d = Object.values(m); const mean = d.reduce((a, b) => a + b, 0) / d.length; return d.reduce((s, x) => s + (x - mean) ** 2, 0) / d.length }
        case 'sigma': return Math.sqrt(m.variance)
        case 'table-variance': { const c = [m.c0, m.c1, m.c2, m.c3]; const N = c.reduce((a, b) => a + b, 0); const mean = c.reduce((s, f, x) => s + f * x, 0) / N; return c.reduce((s, f, x) => s + f * (x - mean) ** 2, 0) / N }
        case 'cv': return (m.sigma / m.mean) * 100
        case 'estimate': return m.m * m.x + m.b
        case 'through-means': return m.ym - m.m * m.xm
        case 'r': return rs[m.cloud]
        case 'union': return m.a + m.b - m.both
        case 'draws': { const t = m.red + m.blue; return (m.red / t) * ((m.red - 1) / (t - 1)) }
        case 'conditional': return m.girlsGlasses / (m.girlsGlasses + m.girlsWithout)
        case 'at-least': return 1 - ((m.k - 1) / m.k) ** 2
        default: throw new Error(`unchecked kind ${question.kind}`)
    }
}

test('estatistika 4. DBH ap games: levels, ids and routes', () => {
    assert.equal(statisticsGames.length, 2)
    assert.equal(statisticsGames[0].levels.length, STATISTICS_RACE_CIRCUITS)
    assert.equal(statisticsGames[1].levels.length, statisticsMemoryLevels.length)
    assert.equal(new Set(statisticsGameProgressIds).size, statisticsGameProgressIds.length)
    assert.ok(!statisticsGameProgressIds.some((id) => statisticsLabChallengeIds.includes(id)))
    const stages = ['data', 'centre', 'spread', 'two', 'chance']
    for (const game of statisticsGames) for (const level of game.levels) assert.ok(stages.includes(level.stage), `${game.id} ${level.stage}`)
    assert.equal(statisticsGameModeForPath('/matematika/dbh4-aplikatuak/estadistica-probabilidad/juegos/carrera'), 'race')
    assert.equal(statisticsGameModeForPath('/matematika/dbh4-aplikatuak/estadistica-probabilidad/jokuak/memoria'), 'memory')
})

test('estatistika 4. DBH ap race: valid options and every answer recomputed', () => {
    const kinds = new Set<string>()
    const errors = new Set<string>()
    for (let circuit = 0; circuit < STATISTICS_RACE_CIRCUITS; circuit += 1) {
        assert.ok(statisticsParTime(circuit) > 60000)
        for (let seed = 1; seed <= 150; seed += 1) {
            const random = createRandom(seed * 41 + circuit)
            for (const tier of [0, 1, 2] as const) {
                const question = generateStatisticsRaceQuestion(random, circuit, tier)
                assert.equal(question.circuit, circuit)
                kinds.add(`${circuit}:${question.kind}`)
                assert.equal(question.options.length, 4, question.kind)
                assert.equal(new Set(question.options.map((option) => option.latex)).size, 4, question.kind)
                assert.equal(question.options.filter((option) => option.correct).length, 1)
                for (const option of question.options) {
                    katex.renderToString(option.latex, { throwOnError: true })
                    assert.ok(option.latex !== '-0', `${question.kind} ${option.latex}`)
                    if (option.error) {
                        errors.add(option.error)
                        assert.ok(statisticsRaceErrorTips[option.error], option.error)
                    }
                    // Probabilities stay between 0 and 1
                    if (circuit === 4) assert.ok(valueOf(option.latex) > 0 && valueOf(option.latex) <= 1, `${question.kind} ${option.latex}`)
                }
                for (const language of ['eu', 'es', 'ar'] as const) {
                    for (const text of [question.prompt[language], question.solution[language]]) {
                        for (const [, formula] of text.matchAll(/\$([^$]+)\$/g)) katex.renderToString(formula, { throwOnError: true })
                    }
                }
                // No Basque suffix glued to a generated number
                assert.ok(!/\$-(?:k|ra|tik|n|ko|an|ean)\b/.test(question.prompt.eu), question.prompt.eu)
                assert.ok(!question.prompt.ar.includes('{,}') && !question.solution.ar.includes('{,}'), question.kind)
                const right = question.options.find((option) => option.correct)!
                const value = toNumber(question.answer)
                assert.ok(close(valueOf(right.latex), value), `${question.kind} ${right.latex}`)
                assert.ok(close(value, expected(question)), `${question.kind} ${JSON.stringify(question.meta)} ${value}`)
                assert.equal(checkStatisticsPitAnswer(question, typed(right.latex)), 'correct', `${question.kind} ${typed(right.latex)}`)
            }
        }
    }
    for (const kind of ['0:width', '0:mark', '0:sector', '0:relative', '1:grouped-mean', '1:percentile', '1:fence-up', '1:fence-down', '2:variance-list', '2:sigma', '2:table-variance', '2:cv', '3:estimate', '3:through-means', '3:r', '4:union', '4:draws', '4:conditional', '4:at-least']) assert.ok(kinds.has(kind), `never generated: ${kind}`)
    for (const error of Object.keys(statisticsRaceErrorTips)) assert.ok(errors.has(error), `never used: ${error}`)
})

test('estatistika 4. DBH ap memory: every card has exactly one partner and the pair is true', () => {
    for (let level = 0; level < statisticsMemoryLevels.length; level += 1) {
        for (let seed = 1; seed <= 40; seed += 1) {
            const cards = createStatisticsMemoryBoard(createRandom(seed * 7 + level), level)
            assert.equal(cards.length, STATISTICS_MEMORY_PAIRS * 2)
            assert.equal(new Set(cards.map((card) => card.latex)).size, cards.length)
            for (const card of cards) katex.renderToString(card.latex, { throwOnError: true })
            for (const card of cards.filter((item) => item.id.endsWith('-q'))) {
                const answer = cards.find((item) => item.setId === card.setId && item.id.endsWith('-a'))!.latex
                const numbers = [...card.latex.matchAll(/\d+/g)].map((match) => Number(match[0]))
                const name = statisticsMemoryLevels[level]
                if (name === 'fences') {
                    // Q_1 and Q_3: the subscripts 1 and 3 come first
                    const [, q1, , q3] = numbers
                    assert.ok(close(valueOf(answer), q3 + 1.5 * (q3 - q1)), card.latex)
                } else if (name === 'variation') {
                    const [mean, sigma] = numbers
                    assert.ok(close(valueOf(answer.replace('\\,\\%', '')), (sigma / mean) * 100), card.latex)
                } else {
                    const [a, b, c, d] = numbers
                    assert.ok(close(valueOf(answer), (a * c) / (b * d)), card.latex)
                }
            }
        }
    }
})
