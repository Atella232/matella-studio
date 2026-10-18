import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import { toNumber } from '../src/features/unit-v2/math/fraction.ts'
import { createFunctionsAkMemoryBoard, FUNCTIONS_AK_MEMORY_PAIRS, functionsAkMemoryLevels } from '../src/pages/dbh4-akademikoak-funtzioak/games/boards.ts'
import { functionsAkGameModeForPath, functionsAkGameProgressIds, functionsAkGames } from '../src/pages/dbh4-akademikoak-funtzioak/games/info.ts'
import {
    checkFunctionsAkPitAnswer,
    FUNCTIONS_AK_RACE_CIRCUITS,
    functionsAkParTime,
    functionsAkRaceErrorTips,
    generateFunctionsAkRaceQuestion,
    intervalLatex,
    polynomialLatex,
    withoutLatex,
    type FunctionsAkRaceQuestion
} from '../src/pages/dbh4-akademikoak-funtzioak/games/race.ts'
import { functionsAkLabChallengeIds } from '../src/pages/dbh4-akademikoak-funtzioak/lab/labTools.ts'

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

type Expected = { number: number } | { latex: string }

/** The answer recomputed from the numbers of the prompt */
function expected(question: FunctionsAkRaceQuestion): Expected {
    const m = question.meta
    switch (question.kind) {
        case 'image': return { number: m.a * m.x * m.x + m.b * m.x + m.c }
        case 'preimage': return { number: (m.value - m.n) / m.m }
        // y = (x − h)² + k
        case 'range-min': return { number: m.k }
        case 'domain-end': return { number: -m.b / m.a }
        // √(x² − r²): the whole numbers strictly between −r and r
        case 'excluded-count': return { number: 2 * m.r - 1 }
        case 'fraction-domain': return { latex: withoutLatex([m.p, m.q]) }
        case 'linear-root': return { latex: m.a > 0 ? intervalLatex(m.p, 'inf', true) : intervalLatex('-inf', m.p, false, true) }
        case 'quadratic-root': return { latex: m.outside ? `${intervalLatex('-inf', -m.r, false, true)}\\cup${intervalLatex(m.r, 'inf', true)}` : intervalLatex(-m.r, m.r, true, true) }
        case 'root-denominator': return { latex: intervalLatex(m.p, 'inf') }
        case 'piece-value': return { number: m.x < m.at ? m.m1 * m.x + m.n1 : m.m2 * m.x + m.n2 }
        case 'join': return { number: m.at * m.at + m.p - m.at }
        case 'jump': return { number: m.m2 * m.at + m.n2 - (m.m1 * m.at + m.n1) }
        // (x² − p²)/(x − p) = x + p
        case 'hole': return { number: 2 * m.p }
        case 'y-intercept': return { number: -m.r * m.s * m.t }
        case 'cubic-root': return { number: m.r }
        case 'biquadratic-root': return { number: Math.max(m.r, m.s) }
        case 'parity': return { number: m.odd ? -m.value : m.value }
        case 'negative': return { latex: intervalLatex(m.r, m.s) }
        case 'rate': {
            const value = (x: number) => x * x + m.b * x + m.c
            return { number: (value(m.to) - value(m.from)) / (m.to - m.from) }
        }
        case 'extreme': return { number: m.k }
        case 'period': return { number: m.x % m.period }
        case 'speed': return { number: (m.alpha * m.to * m.to - m.alpha * m.from * m.from) / (m.to - m.from) }
        default: throw new Error(`unchecked kind ${question.kind}`)
    }
}

/** The polynomial written in the prompt evaluated at x, for the kinds that hide the vertex form */
function checkPromptPolynomial(question: FunctionsAkRaceQuestion) {
    const m = question.meta
    if (question.kind === 'range-min') assert.ok(question.prompt.es.includes(polynomialLatex([1, -2 * m.h, m.h * m.h + m.k])), question.prompt.es)
    if (question.kind === 'extreme') assert.ok(question.prompt.es.includes(polynomialLatex([m.a, -2 * m.a * m.h, m.a * m.h * m.h + m.k])), question.prompt.es)
    if (question.kind === 'extreme') assert.ok(question.prompt.es.includes(m.a > 0 ? 'mínimo' : 'máximo'))
}

test('funtzioak 4. DBH ak games: levels, ids and routes', () => {
    assert.equal(functionsAkGames.length, 2)
    assert.equal(functionsAkGames[0].levels.length, FUNCTIONS_AK_RACE_CIRCUITS)
    assert.equal(functionsAkGames[1].levels.length, functionsAkMemoryLevels.length)
    assert.equal(new Set(functionsAkGameProgressIds).size, functionsAkGameProgressIds.length)
    assert.ok(!functionsAkGameProgressIds.some((id) => functionsAkLabChallengeIds.includes(id)))
    for (const id of functionsAkGameProgressIds) assert.ok(id >= 76101 && id <= 76299, `${id}`)
    const stages = ['concept', 'domain', 'continuity', 'features', 'change']
    for (const game of functionsAkGames) for (const level of game.levels) assert.ok(stages.includes(level.stage), `${game.id} ${level.stage}`)
    assert.deepEqual(functionsAkGames[0].levels.map((level) => level.stage), stages)
    assert.equal(functionsAkGameModeForPath('/matematika/dbh4-akademikoak/funciones/juegos/carrera'), 'race')
    assert.equal(functionsAkGameModeForPath('/matematika/dbh4-akademikoak/funciones/jokuak/memoria'), 'memory')
    assert.equal(functionsAkGameModeForPath('/matematika/dbh4-akademikoak/funciones/jokuak'), 'hub')
})

test('funtzioak 4. DBH ak race: valid options and every answer recomputed', () => {
    const kinds = new Set<string>()
    const errors = new Set<string>()
    for (let circuit = 0; circuit < FUNCTIONS_AK_RACE_CIRCUITS; circuit += 1) {
        assert.ok(functionsAkParTime(circuit) > 60000)
        for (let seed = 1; seed <= 200; seed += 1) {
            const random = createRandom(seed * 41 + circuit)
            for (const tier of [0, 1, 2] as const) {
                const question = generateFunctionsAkRaceQuestion(random, circuit, tier)
                assert.equal(question.circuit, circuit)
                kinds.add(`${circuit}:${question.kind}`)
                assert.equal(question.options.length, 4, question.kind)
                assert.equal(new Set(question.options.map((option) => option.latex)).size, 4, question.kind)
                assert.equal(question.options.filter((option) => option.correct).length, 1)
                for (const option of question.options) {
                    katex.renderToString(option.latex, { throwOnError: true })
                    assert.ok(!/-0(?!\d|\{,\})/.test(option.latex) && !option.latex.includes('NaN'), option.latex)
                    if (option.error) {
                        errors.add(option.error)
                        assert.ok(functionsAkRaceErrorTips[option.error], option.error)
                    }
                }
                for (const language of ['eu', 'es', 'ar'] as const) {
                    for (const text of [question.prompt[language], question.solution[language]]) {
                        for (const [, formula] of text.matchAll(/\$([^$]+)\$/g)) {
                            katex.renderToString(formula, { throwOnError: true })
                            assert.ok(!/[؀-ۿ]/.test(formula), formula)
                            assert.ok(!formula.includes('+-') && !formula.includes('--'), formula)
                        }
                    }
                }
                // Basque: no case ending right after a formula
                assert.ok(!/\$-(?:k|ra|tik|n|ko|an|ean|z|ren)\b/.test(question.prompt.eu), question.prompt.eu)
                checkPromptPolynomial(question)
                const right = question.options.find((option) => option.correct)!
                const target = expected(question)
                if ('number' in target) {
                    assert.ok(close(numberOf(right.latex), target.number), `${question.kind} ${JSON.stringify(question.meta)} ${right.latex} ${target.number}`)
                    assert.ok(question.writable, question.kind)
                    assert.ok(close(toNumber(question.answer), target.number), `${question.kind} answer`)
                    assert.equal(checkFunctionsAkPitAnswer(question, typed(right.latex)), 'correct', `${question.kind} ${typed(right.latex)}`)
                    for (const option of question.options.filter((item) => !item.correct)) assert.ok(!close(numberOf(option.latex), target.number), `${question.kind} ${option.latex}`)
                } else {
                    assert.equal(right.latex, target.latex, `${question.kind} ${JSON.stringify(question.meta)}`)
                    assert.ok(!question.writable, question.kind)
                }
            }
        }
    }
    const all = ['0:image', '0:preimage', '0:range-min', '1:domain-end', '1:excluded-count', '1:fraction-domain', '1:linear-root', '1:quadratic-root', '1:root-denominator', '2:piece-value', '2:join', '2:jump', '2:hole', '3:y-intercept', '3:cubic-root', '3:biquadratic-root', '3:parity', '3:negative', '4:rate', '4:extreme', '4:period', '4:speed']
    for (const kind of all) assert.ok(kinds.has(kind), `never generated: ${kind}`)
    for (const error of Object.keys(functionsAkRaceErrorTips)) assert.ok(errors.has(error), `never used: ${error}`)
    for (let circuit = 0; circuit < FUNCTIONS_AK_RACE_CIRCUITS; circuit += 1) assert.ok(generateFunctionsAkRaceQuestion(createRandom(circuit), circuit, 1, true).writable)
})

test('funtzioak 4. DBH ak race: writing helpers and tips', () => {
    assert.equal(polynomialLatex([1, -2, -3]), 'x^{2}-2x-3')
    assert.equal(polynomialLatex([-1, 0, 4]), '-x^{2}+4')
    assert.equal(polynomialLatex([1, 0, -9, 0]), 'x^{3}-9x')
    assert.equal(polynomialLatex([0, 0]), '0')
    assert.equal(intervalLatex(3, 'inf', true), '[3,\\,+\\infty)')
    assert.equal(intervalLatex('-inf', -2, false, true), '(-\\infty,\\,-2]')
    assert.equal(withoutLatex([2, -4]), '\\mathbb{R}-\\{-4,\\,2\\}')
    assert.equal(checkFunctionsAkPitAnswer(generateFunctionsAkRaceQuestion(createRandom(5), 0, 0, true), 'zzz'), 'unreadable')
    for (const tip of Object.values(functionsAkRaceErrorTips)) {
        for (const language of ['eu', 'es', 'ar'] as const) {
            for (const [, formula] of tip[language].matchAll(/\$([^$]+)\$/g)) katex.renderToString(formula, { throwOnError: true })
            assert.equal((tip[language].match(/\$/g) ?? []).length % 2, 0, tip[language])
        }
    }
})

test('funtzioak 4. DBH ak memory: every card has exactly one partner and the pair is true', () => {
    for (let level = 0; level < functionsAkMemoryLevels.length; level += 1) {
        for (let seed = 1; seed <= 60; seed += 1) {
            const cards = createFunctionsAkMemoryBoard(createRandom(seed * 7 + level), level)
            assert.equal(cards.length, FUNCTIONS_AK_MEMORY_PAIRS * 2)
            assert.equal(new Set(cards.map((card) => card.latex)).size, cards.length)
            for (const card of cards) {
                katex.renderToString(card.latex, { throwOnError: true })
                katex.renderToString(card.explain!, { throwOnError: true })
            }
            for (const card of cards.filter((item) => item.id.endsWith('-q'))) {
                const answer = cards.find((item) => item.setId === card.setId && item.id.endsWith('-a'))!.latex
                const level_ = functionsAkMemoryLevels[level]
                if (level_ === 'domains') {
                    const constant = (match: RegExpMatchArray) => Number(match[1] ?? 0)
                    const reverse = card.latex.match(/^\\sqrt\{-x([+-]\d+)?\}$/)
                    const root = card.latex.match(/^\\sqrt\{x([+-]\d+)?\}$/)
                    const fraction_ = card.latex.match(/^\\frac\{1\}\{x([+-]\d+)?\}$/)
                    const denominator = card.latex.match(/^\\frac\{1\}\{\\sqrt\{x([+-]\d+)?\}\}$/)
                    const expectedAnswer = reverse ? intervalLatex('-inf', constant(reverse), false, true)
                        : root ? intervalLatex(-constant(root), 'inf', true)
                            : fraction_ ? withoutLatex([-constant(fraction_)])
                                : denominator ? intervalLatex(-constant(denominator), 'inf') : 'unread'
                    assert.equal(answer, expectedAnswer, card.latex)
                } else if (level_ === 'images') {
                    // \small x^{2}+bx+c \\ f(x0)
                    const match = card.latex.match(/^\\small \\begin\{array\}\{c\}(.*)\\\\f\((-?\d+)\)/)!
                    const x0 = Number(match[2])
                    const polynomial = match[1]
                    const b = Number(polynomial.match(/([+-]\d*)x(?!\^)/)?.[1].replace(/^([+-])$/, '$11') ?? 0)
                    const c = Number(polynomial.match(/([+-]\d+)$/)?.[1] ?? 0)
                    assert.equal(Number(answer), x0 * x0 + b * x0 + c, card.latex)
                } else {
                    const match = card.latex.match(/^\\begin\{array\}\{c\}(.*)\\\\\[(-?\d+),\\,(-?\d+)\]/)!
                    const b = Number(match[1].match(/([+-]\d*)x$/)?.[1].replace(/^([+-])$/, '$11') ?? 0)
                    const [from, to] = [Number(match[2]), Number(match[3])]
                    assert.equal(Number(answer), (to * to + b * to - from * from - b * from) / (to - from), card.latex)
                }
            }
        }
    }
})
