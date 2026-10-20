import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import { toNumber } from '../src/features/unit-v2/math/fraction.ts'
import { createStatisticsAkMemoryBoard, STATISTICS_AK_MEMORY_PAIRS, statisticsAkMemoryLevels } from '../src/pages/dbh4-akademikoak-estatistika/games/boards.ts'
import { statisticsAkGameModeForPath, statisticsAkGameProgressIds, statisticsAkGames } from '../src/pages/dbh4-akademikoak-estatistika/games/info.ts'
import {
    checkStatisticsAkPitAnswer,
    generateStatisticsAkRaceQuestion,
    STATISTICS_AK_RACE_CIRCUITS,
    statisticsAkParTime,
    statisticsAkRaceErrorTips,
    type StatisticsAkRaceQuestion
} from '../src/pages/dbh4-akademikoak-estatistika/games/race.ts'
import { statisticsAkLabChallengeIds } from '../src/pages/dbh4-akademikoak-estatistika/lab/labTools.ts'

const close = (a: number, b: number) => Math.abs(a - b) < 1e-9

/** A number option: 5, -3, 6{,}92 */
function numberOf(latex: string): number {
    const value = Number(latex.replace('{,}', '.'))
    if (Number.isNaN(value)) throw new Error(`Cannot read ${latex}`)
    return value
}

/** How a student types a number option at the pit stop */
const typed = (latex: string) => latex.replace('{,}', ',')

/** The percentile rule of the lessons, written again from scratch: N·k/100 whole → mean of two data, else the next datum */
function percentileOf(data: number[], k: number) {
    const sorted = [...data].sort((a, b) => a - b)
    const position = (sorted.length * k) / 100
    if (Number.isInteger(position)) return (sorted[position - 1] + sorted[Math.min(position, sorted.length - 1)]) / 2
    return sorted[Math.ceil(position) - 1]
}

/** The answer recomputed from the numbers of the prompt */
function expected(question: StatisticsAkRaceQuestion): number {
    const m = question.meta
    const list = (prefix: string, size: number) => Array.from({ length: size }, (_, index) => m[`${prefix}${index}`])
    switch (question.kind) {
        case 'stratum': return (m.sample * m.students) / m.total
        case 'systematic': return m.first + (m.j - 1) * (m.total / m.sample)
        case 'cumulative': return [m.f0, m.f1, m.f2, m.f3].slice(0, m.value + 1).reduce((a, b) => a + b, 0)
        case 'table-mean': return (m.f1 + 2 * m.f2 + 3 * m.f3 + 4 * m.f4) / (m.f1 + m.f2 + m.f3 + m.f4)
        case 'joined': return (m.n1 * m.m1 + m.n2 * m.m2) / (m.n1 + m.n2)
        case 'missing': return m.count * m.mean - m.known
        case 'quartile': return percentileOf(list('d', m.size), m.k)
        case 'fence': return m.upper ? m.q3 + 1.5 * (m.q3 - m.q1) : m.q1 - 1.5 * (m.q3 - m.q1)
        case 'percentile': {
            const data = [m.c0, m.c1, m.c2, m.c3, m.c4].flatMap((count, value) => Array.from({ length: count }, () => value))
            return percentileOf(data, m.k)
        }
        case 'mean-deviation': {
            const data = list('d', m.size)
            const mean = data.reduce((a, b) => a + b, 0) / m.size
            return data.reduce((total, value) => total + Math.abs(value - mean), 0) / m.size
        }
        case 'variance': return m.sx2 / m.size - (m.sx / m.size) ** 2
        case 'cv': return (100 * m.sigma) / m.mean
        case 'estimate': return m.m * m.x + m.n
        case 'intercept': return m.my - m.m * m.mx
        case 'inverse': return (m.y - m.n) / m.m
        default: throw new Error(`unchecked kind ${question.kind}`)
    }
}

test('estatistika 4. DBH ak games: levels, ids and routes', () => {
    assert.equal(statisticsAkGames.length, 2)
    assert.equal(statisticsAkGames[0].levels.length, STATISTICS_AK_RACE_CIRCUITS)
    assert.equal(statisticsAkGames[1].levels.length, statisticsAkMemoryLevels.length)
    assert.equal(new Set(statisticsAkGameProgressIds).size, statisticsAkGameProgressIds.length)
    assert.ok(!statisticsAkGameProgressIds.some((id) => statisticsAkLabChallengeIds.includes(id)))
    for (const id of statisticsAkGameProgressIds) assert.ok(id >= 82101 && id <= 82299, `${id}`)
    const stages = ['data', 'centre', 'position', 'spread', 'two']
    for (const game of statisticsAkGames) for (const level of game.levels) assert.ok(stages.includes(level.stage), `${game.id} ${level.stage}`)
    assert.deepEqual(statisticsAkGames[0].levels.map((level) => level.stage), stages)
    assert.equal(statisticsAkGameModeForPath('/matematika/dbh4-akademikoak/estadistica/juegos/carrera'), 'race')
    assert.equal(statisticsAkGameModeForPath('/matematika/dbh4-akademikoak/estadistica/jokuak/memoria'), 'memory')
    assert.equal(statisticsAkGameModeForPath('/matematika/dbh4-akademikoak/estadistica/jokuak'), 'hub')
})

test('estatistika 4. DBH ak race: valid options and every answer recomputed', () => {
    const kinds = new Set<string>()
    const errors = new Set<string>()
    for (let circuit = 0; circuit < STATISTICS_AK_RACE_CIRCUITS; circuit += 1) {
        assert.ok(statisticsAkParTime(circuit) > 60000)
        for (let seed = 1; seed <= 200; seed += 1) {
            const random = createRandom(seed * 41 + circuit)
            for (const tier of [0, 1, 2] as const) {
                const question = generateStatisticsAkRaceQuestion(random, circuit, tier)
                assert.equal(question.circuit, circuit)
                kinds.add(`${circuit}:${question.kind}`)
                assert.equal(question.options.length, 4, question.kind)
                assert.equal(new Set(question.options.map((option) => option.latex)).size, 4, question.kind)
                assert.equal(question.options.filter((option) => option.correct).length, 1)
                for (const option of question.options) {
                    katex.renderToString(option.latex, { throwOnError: true })
                    assert.ok(!/^-0(?!\{,\})/.test(option.latex) && !option.latex.includes('NaN') && !option.latex.includes('Infinity'), option.latex)
                    if (option.error) {
                        errors.add(option.error)
                        assert.ok(statisticsAkRaceErrorTips[option.error], option.error)
                    }
                }
                for (const language of ['eu', 'es', 'ar'] as const) {
                    for (const text of [question.prompt[language], question.solution[language]]) {
                        assert.equal((text.match(/\$/g) ?? []).length % 2, 0, text)
                        for (const [, formula] of text.matchAll(/\$([^$]+)\$/g)) {
                            katex.renderToString(formula, { throwOnError: true })
                            assert.ok(!/[؀-ۿ]/.test(formula), formula)
                            assert.ok(!formula.includes('+-') && !formula.includes('--') && !/(^|[^\d])-0(?![\d{.])/.test(formula), formula)
                            if (language === 'ar') assert.ok(!formula.includes('{,}'), formula)
                        }
                    }
                }
                // Basque: no case ending right after a formula
                const afterFormulas = question.prompt.eu.split('$').filter((_, index) => index > 0 && index % 2 === 0)
                assert.ok(afterFormulas.every((text) => !/^-?[a-z]/.test(text)), question.prompt.eu)
                const right = question.options.find((option) => option.correct)!
                const target = expected(question)
                assert.ok(close(numberOf(right.latex), target), `${question.kind} ${JSON.stringify(question.meta)} ${right.latex} ${target}`)
                assert.ok(question.writable, question.kind)
                assert.ok(close(toNumber(question.answer), target), `${question.kind} answer`)
                assert.equal(checkStatisticsAkPitAnswer(question, typed(right.latex)), 'correct', `${question.kind} ${typed(right.latex)}`)
                for (const option of question.options.filter((item) => !item.correct)) assert.ok(!close(numberOf(option.latex), target), `${question.kind} ${option.latex}`)
            }
        }
    }
    const all = ['0:stratum', '0:systematic', '0:cumulative', '1:table-mean', '1:joined', '1:missing', '2:quartile', '2:fence', '2:percentile', '3:mean-deviation', '3:variance', '3:cv', '4:estimate', '4:intercept', '4:inverse']
    for (const kind of all) assert.ok(kinds.has(kind), `never generated: ${kind}`)
    for (const error of Object.keys(statisticsAkRaceErrorTips)) assert.ok(errors.has(error), `never used: ${error}`)
})

test('estatistika 4. DBH ak race: tips render and the pit stop reads answers', () => {
    assert.equal(checkStatisticsAkPitAnswer(generateStatisticsAkRaceQuestion(createRandom(5), 0, 0, true), 'zzz'), 'unreadable')
    for (const tip of Object.values(statisticsAkRaceErrorTips)) {
        for (const language of ['eu', 'es', 'ar'] as const) {
            for (const [, formula] of tip[language].matchAll(/\$([^$]+)\$/g)) katex.renderToString(formula, { throwOnError: true })
            assert.equal((tip[language].match(/\$/g) ?? []).length % 2, 0, tip[language])
        }
    }
})

test('estatistika 4. DBH ak memory: every card has exactly one partner and the pair is true', () => {
    const decimal = (latex: string) => Number(latex.replace('{,}', '.'))
    for (let level = 0; level < statisticsAkMemoryLevels.length; level += 1) {
        for (let seed = 1; seed <= 60; seed += 1) {
            const cards = createStatisticsAkMemoryBoard(createRandom(seed * 7 + level), level)
            assert.equal(cards.length, STATISTICS_AK_MEMORY_PAIRS * 2)
            assert.equal(new Set(cards.map((card) => card.latex)).size, cards.length)
            for (const card of cards) {
                katex.renderToString(card.latex, { throwOnError: true })
                katex.renderToString(card.explain!, { throwOnError: true })
            }
            for (const card of cards.filter((item) => item.id.endsWith('-q'))) {
                const answer = decimal(cards.find((item) => item.setId === card.setId && item.id.endsWith('-a'))!.latex)
                const levelName = statisticsAkMemoryLevels[level]
                if (levelName === 'shares') {
                    const [, sample, students, total] = card.latex.match(/^(\d+)\\cdot\\frac\{(\d+)\}\{(\d+)\}$/)!.map(Number)
                    assert.equal((sample * students) / total, answer, card.latex)
                } else if (levelName === 'means') {
                    const data = card.latex.match(/\\bar\{x\}\\\\ (.*)\\end/)![1].split(',\\,').map(Number)
                    assert.equal(data.reduce((a, b) => a + b, 0) / data.length, answer, card.latex)
                } else {
                    const [, sigma, mean] = card.latex.match(/\\sigma=(\d+)\\\\ \\bar\{x\}=(\d+)/)!.map(Number)
                    assert.ok(close(sigma / mean, answer), card.latex)
                }
            }
        }
    }
})
