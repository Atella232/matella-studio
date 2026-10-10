import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import { toNumber } from '../src/features/unit-v2/math/fraction.ts'
import { createPowersMemoryBoard, POWERS_MEMORY_PAIRS, powersMemoryLevels } from '../src/pages/dbh4-akademikoak-potentziak/games/boards.ts'
import { powersGameModeForPath, powersGameProgressIds, powersGames } from '../src/pages/dbh4-akademikoak-potentziak/games/info.ts'
import { checkPowersPitAnswer, generatePowersRaceQuestion, POWERS_RACE_CIRCUITS, powersParTime, powersRaceErrorTips, type PowersRaceQuestion } from '../src/pages/dbh4-akademikoak-potentziak/games/race.ts'
import { powersLabChallengeIds } from '../src/pages/dbh4-akademikoak-potentziak/lab/labTools.ts'

const close = (a: number, b: number) => Math.abs(a - b) < 1e-9 * Math.max(1, Math.abs(b))
/** A LaTeX option as a number: 5, -3, \frac{1}{8}, -\frac{2}{3} */
function valueOf(latex: string): number {
    const fraction = latex.match(/^(-?)\\frac\{(\d+)\}\{(\d+)\}$/)
    if (fraction) return (fraction[1] ? -1 : 1) * Number(fraction[2]) / Number(fraction[3])
    return Number(latex)
}
/** What a learner would type for that option */
const typed = (latex: string) => latex.replace(/^(-?)\\frac\{(\d+)\}\{(\d+)\}$/, '$1$2/$3')
const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b))

/** The answer recomputed from the data the question carries */
function expected(question: PowersRaceQuestion): number {
    const m = question.meta
    switch (question.kind) {
        case 'negative-power': return m.base ** -m.k
        case 'factor-power': return 12 ** m.m / 6 ** m.n
        case 'scientific': return m.exponent
        case 'scientific-product': return Math.floor(Math.log10(m.a * m.b * 10 ** (m.p + m.q)) + 1e-9)
        case 'root': return Math.sign(m.radicand) * Math.round(Math.abs(m.radicand) ** (1 / m.index))
        case 'fractional': return m.base ** (m.p / m.q)
        case 'common': { const index = (m.first * m.second) / gcd(m.first, m.second); return m.b ** (index / m.second) }
        case 'simplify-index': return m.index / m.factor
        case 'extract': return Math.round((m.radicand / m.inside) ** (1 / m.index))
        case 'like': return m.k0 + m.k1 + m.k2
        case 'product': return Math.sqrt(m.left * m.right)
        case 'inside': return m.outside ** m.index * m.inside
        case 'rationalize-square': return m.k / m.b
        case 'rationalize-index': return m.b ** (m.index - m.exponent)
        case 'conjugate': return m.k / (m.a - m.b)
        case 'log': return m.x
        case 'log-base': return Math.round(m.value ** (1 / m.x))
        case 'log-sum': return Math.round(Math.log(m.m * m.n) / Math.log(m.base))
        case 'bracket': return Math.floor(Math.log(m.value) / Math.log(m.base) + 1e-12)
        default: throw new Error(`unchecked kind ${question.kind}`)
    }
}

test('potentziak 4. DBH ak games: levels, ids and routes', () => {
    assert.equal(powersGames.length, 2)
    assert.equal(powersGames[0].levels.length, POWERS_RACE_CIRCUITS)
    assert.equal(powersGames[1].levels.length, powersMemoryLevels.length)
    assert.equal(new Set(powersGameProgressIds).size, powersGameProgressIds.length)
    assert.ok(!powersGameProgressIds.some((id) => powersLabChallengeIds.includes(id)))
    const stages = ['powers', 'radicals', 'operations', 'rationalize', 'logarithms']
    for (const game of powersGames) for (const level of game.levels) assert.ok(stages.includes(level.stage), `${game.id} ${level.stage}`)
    assert.equal(powersGameModeForPath('/matematika/dbh4-akademikoak/potencias-radicales/juegos/carrera'), 'race')
    assert.equal(powersGameModeForPath('/matematika/dbh4-akademikoak/potencias-radicales/jokuak/memoria'), 'memory')
})

test('potentziak 4. DBH ak race: valid options and every answer recomputed', () => {
    const kinds = new Set<string>()
    const errors = new Set<string>()
    for (let circuit = 0; circuit < POWERS_RACE_CIRCUITS; circuit += 1) {
        assert.ok(powersParTime(circuit) > 60000)
        for (let seed = 1; seed <= 150; seed += 1) {
            const random = createRandom(seed * 41 + circuit)
            for (const tier of [0, 1, 2] as const) {
                const question = generatePowersRaceQuestion(random, circuit, tier)
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
                        assert.ok(powersRaceErrorTips[option.error], option.error)
                    }
                }
                for (const language of ['eu', 'es', 'ar'] as const) {
                    for (const text of [question.prompt[language], question.solution[language]]) {
                        for (const [, formula] of text.matchAll(/\$([^$]+)\$/g)) katex.renderToString(formula, { throwOnError: true })
                    }
                }
                assert.ok(!/\$-(?:k|ra|tik|n|ko|an|ean)\b/.test(question.prompt.eu), question.prompt.eu)
                assert.ok(!question.prompt.ar.includes('{,}') && !question.solution.ar.includes('{,}'), question.kind)
                const right = question.options.find((option) => option.correct)!
                const value = toNumber(question.answer)
                assert.ok(close(valueOf(right.latex), value), `${question.kind} ${right.latex}`)
                assert.ok(close(value, expected(question)), `${question.kind} ${JSON.stringify(question.meta)} ${value}`)
                assert.equal(checkPowersPitAnswer(question, typed(right.latex)), 'correct', `${question.kind} ${typed(right.latex)}`)
            }
        }
    }
    for (const kind of ['0:negative-power', '0:factor-power', '0:scientific', '0:scientific-product', '1:root', '1:fractional', '1:common', '1:simplify-index', '2:extract', '2:like', '2:product', '2:inside', '3:rationalize-square', '3:rationalize-index', '3:conjugate', '4:log', '4:log-base', '4:log-sum', '4:bracket']) assert.ok(kinds.has(kind), `never generated: ${kind}`)
    for (const error of Object.keys(powersRaceErrorTips)) assert.ok(errors.has(error), `never used: ${error}`)
})

test('potentziak 4. DBH ak memory: every card has exactly one partner and the pair is true', () => {
    for (let level = 0; level < powersMemoryLevels.length; level += 1) {
        for (let seed = 1; seed <= 40; seed += 1) {
            const cards = createPowersMemoryBoard(createRandom(seed * 7 + level), level)
            assert.equal(cards.length, POWERS_MEMORY_PAIRS * 2)
            assert.equal(new Set(cards.map((card) => card.latex)).size, cards.length)
            for (const card of cards) katex.renderToString(card.latex, { throwOnError: true })
            for (const card of cards.filter((item) => item.id.endsWith('-q'))) {
                const answer = cards.find((item) => item.setId === card.setId && item.id.endsWith('-a'))!.latex
                const name = powersMemoryLevels[level]
                if (name === 'fractional') {
                    const [, base, minus, p, q] = card.latex.match(/^(\d+)\^\{(-?)\\frac\{(\d+)\}\{(\d+)\}\}$/)!
                    assert.ok(close(valueOf(answer), Number(base) ** ((minus ? -1 : 1) * Number(p) / Number(q))), card.latex)
                } else if (name === 'extract') {
                    const value = (latex: string) => {
                        const [, coefficient, index, radicand] = latex.match(/^(\d*)\\sqrt(?:\[(\d+)\])?\{(\d+)\}$/)!
                        return (coefficient ? Number(coefficient) : 1) * Number(radicand) ** (1 / (index ? Number(index) : 2))
                    }
                    assert.ok(Math.abs(value(card.latex) - value(answer)) < 1e-9, card.latex)
                } else {
                    const [, base, rest] = card.latex.match(/^\\log_\{(\d+)\} (.+)$/)!
                    assert.ok(close(Math.log(valueOf(rest)) / Math.log(Number(base)), Number(answer)), card.latex)
                }
            }
        }
    }
})
