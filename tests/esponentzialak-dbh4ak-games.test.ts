import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import { toNumber } from '../src/features/unit-v2/math/fraction.ts'
import { createExponentialAkMemoryBoard, EXPONENTIAL_AK_MEMORY_PAIRS, exponentialAkMemoryLevels } from '../src/pages/dbh4-akademikoak-esponentzialak/games/boards.ts'
import { exponentialAkGameModeForPath, exponentialAkGameProgressIds, exponentialAkGames } from '../src/pages/dbh4-akademikoak-esponentzialak/games/info.ts'
import {
    checkExponentialAkPitAnswer,
    EXPONENTIAL_AK_RACE_CIRCUITS,
    exponentialAkParTime,
    exponentialAkRaceErrorTips,
    generateExponentialAkRaceQuestion,
    type ExponentialAkRaceQuestion
} from '../src/pages/dbh4-akademikoak-esponentzialak/games/race.ts'
import { exponentialAkLabChallengeIds } from '../src/pages/dbh4-akademikoak-esponentzialak/lab/labTools.ts'

const close = (a: number, b: number) => Math.abs(a - b) < 1e-9

/** A number option: 5, -3, \frac{2}{3}, -\frac{1}{2} */
function numberOf(latex: string): number {
    const match = latex.match(/^(-?)\\frac\{(\d+)\}\{(\d+)\}$/)
    if (match) return (match[1] ? -1 : 1) * Number(match[2]) / Number(match[3])
    const value = Number(latex)
    if (Number.isNaN(value)) throw new Error(`Cannot read ${latex}`)
    return value
}

/** How a student types a number option at the pit stop */
const typed = (latex: string) => latex.replace(/^(-?)\\frac\{(\d+)\}\{(\d+)\}$/, '$1$2/$3')

/** The answer recomputed from the numbers of the prompt */
function expected(question: ExponentialAkRaceQuestion): number {
    const m = question.meta
    switch (question.kind) {
        case 'exp-value': return m.a ** m.x
        case 'asymptote': return m.q
        case 'base': return m.y ** (1 / m.x)
        case 'compound': return m.capital * (1 + m.rate / 100) ** m.years
        case 'half-life': return m.mass * 0.5 ** (m.time / m.period)
        case 'exp-equation': return m.n - m.b
        case 'log-value': return m.n
        case 'log-domain': return m.p
        // log_a(x − p) + q = 0
        case 'log-zero': return m.p + m.a ** -m.q
        case 'degrees': return (180 * m.k) / m.m
        case 'trig-value': return m.sine ? Math.sin((m.sixths * Math.PI) / 6) : Math.cos((m.thirds * Math.PI) / 3)
        case 'zeros': return m.n + 1
        case 'max': return Math.abs(m.a) + m.d
        // T = 2π / k, written aπ
        case 'period': return 2 / (m.kNumerator / m.kDenominator)
        case 'amplitude': return Math.abs(m.a)
        default: throw new Error(`unchecked kind ${question.kind}`)
    }
}

test('esponentzialak 4. DBH ak games: levels, ids and routes', () => {
    assert.equal(exponentialAkGames.length, 2)
    assert.equal(exponentialAkGames[0].levels.length, EXPONENTIAL_AK_RACE_CIRCUITS)
    assert.equal(exponentialAkGames[1].levels.length, exponentialAkMemoryLevels.length)
    assert.equal(new Set(exponentialAkGameProgressIds).size, exponentialAkGameProgressIds.length)
    assert.ok(!exponentialAkGameProgressIds.some((id) => exponentialAkLabChallengeIds.includes(id)))
    for (const id of exponentialAkGameProgressIds) assert.ok(id >= 80101 && id <= 80299, `${id}`)
    const stages = ['exponential', 'growth', 'logarithmic', 'trigonometric', 'transforms']
    for (const game of exponentialAkGames) for (const level of game.levels) assert.ok(stages.includes(level.stage), `${game.id} ${level.stage}`)
    assert.deepEqual(exponentialAkGames[0].levels.map((level) => level.stage), stages)
    assert.equal(exponentialAkGameModeForPath('/matematika/dbh4-akademikoak/funciones-exponenciales/juegos/carrera'), 'race')
    assert.equal(exponentialAkGameModeForPath('/matematika/dbh4-akademikoak/funciones-exponenciales/jokuak/memoria'), 'memory')
    assert.equal(exponentialAkGameModeForPath('/matematika/dbh4-akademikoak/funciones-exponenciales/jokuak'), 'hub')
})

test('esponentzialak 4. DBH ak race: valid options and every answer recomputed', () => {
    const kinds = new Set<string>()
    const errors = new Set<string>()
    for (let circuit = 0; circuit < EXPONENTIAL_AK_RACE_CIRCUITS; circuit += 1) {
        assert.ok(exponentialAkParTime(circuit) > 60000)
        for (let seed = 1; seed <= 200; seed += 1) {
            const random = createRandom(seed * 41 + circuit)
            for (const tier of [0, 1, 2] as const) {
                const question = generateExponentialAkRaceQuestion(random, circuit, tier)
                assert.equal(question.circuit, circuit)
                kinds.add(`${circuit}:${question.kind}`)
                assert.equal(question.options.length, 4, question.kind)
                assert.equal(new Set(question.options.map((option) => option.latex)).size, 4, question.kind)
                assert.equal(question.options.filter((option) => option.correct).length, 1)
                for (const option of question.options) {
                    katex.renderToString(option.latex, { throwOnError: true })
                    assert.ok(!/-0(?!\d|\{,\})/.test(option.latex) && !option.latex.includes('NaN') && !option.latex.includes('Infinity'), option.latex)
                    if (option.error) {
                        errors.add(option.error)
                        assert.ok(exponentialAkRaceErrorTips[option.error], option.error)
                    }
                }
                for (const language of ['eu', 'es', 'en', 'ar'] as const) {
                    for (const text of [question.prompt[language], question.solution[language]]) {
                        for (const [, formula] of text.matchAll(/\$([^$]+)\$/g)) {
                            katex.renderToString(formulaFor(language, formula), { throwOnError: true })
                            assert.ok(!/[؀-ۿ]/.test(formula), formula)
                            assert.ok(!formula.includes('+-') && !formula.includes('--') && !/(^|[^\d])-0(?!\d)/.test(formula), formula)
                        }
                    }
                }
                // Each language writes its own name of the sine
                if (question.prompt.es.includes('sen')) assert.ok(!question.prompt.eu.includes('operatorname{sen}') && question.prompt.ar.includes('\\sin'), question.prompt.ar)
                // Basque: no case ending right after a formula
                assert.ok(!/\$-(?:k|ra|tik|n|ko|an|ean|z|ren)\b/.test(question.prompt.eu), question.prompt.eu)
                const right = question.options.find((option) => option.correct)!
                const target = expected(question)
                assert.ok(close(numberOf(right.latex), target), `${question.kind} ${JSON.stringify(question.meta)} ${right.latex} ${target}`)
                assert.ok(question.writable, question.kind)
                assert.ok(close(toNumber(question.answer), target), `${question.kind} answer`)
                assert.equal(checkExponentialAkPitAnswer(question, typed(right.latex)), 'correct', `${question.kind} ${typed(right.latex)}`)
                for (const option of question.options.filter((item) => !item.correct)) assert.ok(!close(numberOf(option.latex), target), `${question.kind} ${option.latex}`)
            }
        }
    }
    const all = ['0:exp-value', '0:asymptote', '0:base', '1:compound', '1:half-life', '1:exp-equation', '2:log-value', '2:log-domain', '2:log-zero', '3:degrees', '3:trig-value', '3:zeros', '4:max', '4:period', '4:amplitude']
    for (const kind of all) assert.ok(kinds.has(kind), `never generated: ${kind}`)
    for (const error of Object.keys(exponentialAkRaceErrorTips)) assert.ok(errors.has(error), `never used: ${error}`)
})

test('esponentzialak 4. DBH ak race: tips render and the pit stop reads answers', () => {
    assert.equal(checkExponentialAkPitAnswer(generateExponentialAkRaceQuestion(createRandom(5), 0, 0, true), 'zzz'), 'unreadable')
    for (const tip of Object.values(exponentialAkRaceErrorTips)) {
        for (const language of ['eu', 'es', 'en', 'ar'] as const) {
            for (const [, formula] of tip[language].matchAll(/\$([^$]+)\$/g)) katex.renderToString(formulaFor(language, formula), { throwOnError: true })
            assert.equal((tip[language].match(/\$/g) ?? []).length % 2, 0, tip[language])
        }
    }
})

test('esponentzialak 4. DBH ak memory: every card has exactly one partner and the pair is true', () => {
    const fractionValue = (latex: string) => {
        const match = latex.match(/^\\frac\{1\}\{(\d+)\}$/)
        return match ? 1 / Number(match[1]) : Number(latex)
    }
    for (let level = 0; level < exponentialAkMemoryLevels.length; level += 1) {
        for (let seed = 1; seed <= 60; seed += 1) {
            const cards = createExponentialAkMemoryBoard(createRandom(seed * 7 + level), level)
            assert.equal(cards.length, EXPONENTIAL_AK_MEMORY_PAIRS * 2)
            assert.equal(new Set(cards.map((card) => card.latex)).size, cards.length)
            for (const card of cards) {
                katex.renderToString(card.latex, { throwOnError: true })
                katex.renderToString(card.explain!, { throwOnError: true })
            }
            for (const card of cards.filter((item) => item.id.endsWith('-q'))) {
                const answer = cards.find((item) => item.setId === card.setId && item.id.endsWith('-a'))!.latex
                const levelName = exponentialAkMemoryLevels[level]
                if (levelName === 'powers') {
                    const [, a, n] = card.latex.match(/^(\d+)\^\{(-?\d+)\}$/)!
                    assert.ok(close(fractionValue(answer), Number(a) ** Number(n)), card.latex)
                } else if (levelName === 'logarithms') {
                    const match = card.latex.match(/^\\small \\log(?:_\{(\d+)\})? (.+)$/)!
                    const base = Number(match[1] ?? 10)
                    assert.ok(close(base ** Number(answer), fractionValue(match[2])), card.latex)
                } else {
                    const half = card.latex.match(/^\\cos\\frac\{x\}\{(\d+)\}$/)
                    const k = half ? 1 / Number(half[1]) : Number(card.latex.match(/^\\cos (\d*)x$/)![1] || 1)
                    const period = answer.replace(/\\pi/g, 'P').replace(/^\\frac\{(\d*)P\}\{(\d+)\}$/, (_, top, bottom) => String(Number(top || 1) / Number(bottom))).replace(/^(\d*)P$/, (_, top) => String(Number(top || 1)))
                    assert.ok(close(Number(period), 2 / k), `${card.latex} ${answer}`)
                }
            }
        }
    }
})
