import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import { toNumber } from '../src/features/unit-v2/math/fraction.ts'
import { createPolynomialsMemoryBoard, POLYNOMIALS_MEMORY_PAIRS, polynomialsMemoryLevels } from '../src/pages/dbh4-akademikoak-polinomioak/games/boards.ts'
import { polynomialsGameModeForPath, polynomialsGameProgressIds, polynomialsGames } from '../src/pages/dbh4-akademikoak-polinomioak/games/info.ts'
import { checkPolynomialsPitAnswer, generatePolynomialsRaceQuestion, POLYNOMIALS_RACE_CIRCUITS, polynomialsParTime, polynomialsRaceErrorTips, type PolynomialsRaceQuestion } from '../src/pages/dbh4-akademikoak-polinomioak/games/race.ts'
import { polynomialsFractionsLabChallengeIds } from '../src/pages/dbh4-akademikoak-polinomioak/lab/labTools.ts'
import { deflate, evaluate, fromRoots } from '../src/pages/dbh4-akademikoak-polinomioak/polynomials.ts'

const close = (a: number, b: number) => Math.abs(a - b) < 1e-9 * Math.max(1, Math.abs(b))
/** A LaTeX option as a number: 5, -3, \frac{1}{8}, -\frac{2}{3} */
function valueOf(latex: string): number {
    const fraction = latex.match(/^(-?)\\frac\{(\d+)\}\{(\d+)\}$/)
    if (fraction) return (fraction[1] ? -1 : 1) * Number(fraction[2]) / Number(fraction[3])
    return Number(latex)
}
const typed = (latex: string) => latex.replace(/^(-?)\\frac\{(\d+)\}\{(\d+)\}$/, '$1$2/$3')
const choose = (n: number, k: number): number => (k === 0 || k === n ? 1 : choose(n - 1, k - 1) + choose(n - 1, k))

/** The answer recomputed from the data the question carries */
function expected(question: PolynomialsRaceQuestion): number {
    const m = question.meta
    const poly = (count: number) => Array.from({ length: count }, (_, i) => m[`p${i}`])
    switch (question.kind) {
        case 'product': return m.p * m.b + m.q * m.a
        case 'square': return 2 * m.p * m.a
        case 'binomial': return choose(m.n, m.k) * m.b ** (m.n - m.k)
        case 'value': return evaluate(poly(4), m.a)
        case 'remainder': return evaluate(poly(m.n), m.a)
        case 'quotient': return deflate(poly(4), m.a).at(-1)!
        case 'parameter': return -(m.a ** 3 + m.b * m.a ** 2 + m.d) / m.a
        case 'degree': return m.n - m.k
        case 'greatest-root': return Math.max(m.r0, m.r1, ...(m.r2 === 99 ? [] : [m.r2]))
        case 'missing-factor': return m.v
        case 'leading-factor': return m.v
        case 'lcm-degree': return Math.max(m.a, m.c) + m.b + m.d
        case 'fraction-value': return (m.k ** 2 + m.a) / (m.k + m.b)
        case 'hole': return m.r
        case 'simplify': return m.k + m.b
        case 'equivalent': return m.a + m.c
        case 'sum': return m.k1 * m.b + m.k2 * m.a
        case 'difference': return 2 * m.a
        case 'product-fraction': return -m.a * m.k
        case 'taps': return (m.a * m.b) / (m.a + m.b)
        default: throw new Error(`unchecked kind ${question.kind}`)
    }
}

/** LaTeX with x only, evaluated at a value of x */
function atX(latex: string, x: number): number {
    let js = latex.replace(/\{([+-])\}/g, '$1').replace(/\^\{(\d+)\}/g, '**$1').replace(/\\frac\{([^{}]+)\}\{([^{}]+)\}/g, '(($1)/($2))').replace(/x/g, `(${x})`)
    js = js.replace(/\)\(/g, ')*(').replace(/(\d)\(/g, '$1*(')
    return Function(`return ${js}`)() as number
}

test('polinomioak 4. DBH ak games: levels, ids and routes', () => {
    assert.equal(polynomialsGames.length, 2)
    assert.equal(polynomialsGames[0].levels.length, POLYNOMIALS_RACE_CIRCUITS)
    assert.equal(polynomialsGames[1].levels.length, polynomialsMemoryLevels.length)
    assert.equal(new Set(polynomialsGameProgressIds).size, polynomialsGameProgressIds.length)
    assert.ok(!polynomialsGameProgressIds.some((id) => polynomialsFractionsLabChallengeIds.includes(id)))
    const stages = ['operations', 'division', 'factor', 'fractions', 'operate']
    for (const game of polynomialsGames) for (const level of game.levels) assert.ok(stages.includes(level.stage), `${game.id} ${level.stage}`)
    assert.equal(polynomialsGameModeForPath('/matematika/dbh4-akademikoak/polinomios-fracciones/juegos/carrera'), 'race')
    assert.equal(polynomialsGameModeForPath('/matematika/dbh4-akademikoak/polinomios-fracciones/jokuak/memoria'), 'memory')
})

test('polinomioak 4. DBH ak race: valid options and every answer recomputed', () => {
    const kinds = new Set<string>()
    const errors = new Set<string>()
    for (let circuit = 0; circuit < POLYNOMIALS_RACE_CIRCUITS; circuit += 1) {
        assert.ok(polynomialsParTime(circuit) > 60000)
        for (let seed = 1; seed <= 150; seed += 1) {
            const random = createRandom(seed * 37 + circuit)
            for (const tier of [0, 1, 2] as const) {
                const question = generatePolynomialsRaceQuestion(random, circuit, tier)
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
                        assert.ok(polynomialsRaceErrorTips[option.error], option.error)
                    }
                }
                for (const language of ['eu', 'es', 'ar'] as const) {
                    for (const text of [question.prompt[language], question.solution[language]]) {
                        for (const [, formula] of text.matchAll(/\$([^$]+)\$/g)) {
                            katex.renderToString(formula, { throwOnError: true })
                            assert.ok(!formula.includes('+-') && !formula.includes('--') && !formula.includes('+0x') && !/(^|[^\d])1x/.test(formula), `${question.kind} ${formula}`)
                        }
                    }
                }
                assert.ok(!/\$-(?:k|ra|tik|n|ko|an|ean|z)\b/.test(question.prompt.eu), question.prompt.eu)
                const right = question.options.find((option) => option.correct)!
                const value = toNumber(question.answer)
                assert.ok(close(valueOf(right.latex), value), `${question.kind} ${right.latex}`)
                assert.ok(close(value, expected(question)), `${question.kind} ${JSON.stringify(question.meta)} ${value}`)
                assert.equal(checkPolynomialsPitAnswer(question, typed(right.latex)), 'correct', `${question.kind} ${typed(right.latex)}`)
            }
        }
    }
    for (const kind of ['0:product', '0:square', '0:binomial', '0:value', '1:remainder', '1:quotient', '1:parameter', '1:degree', '2:greatest-root', '2:missing-factor', '2:leading-factor', '2:lcm-degree', '3:fraction-value', '3:hole', '3:simplify', '3:equivalent', '4:sum', '4:difference', '4:product-fraction', '4:taps']) assert.ok(kinds.has(kind), `never generated: ${kind}`)
    for (const error of Object.keys(polynomialsRaceErrorTips)) assert.ok(errors.has(error), `never used: ${error}`)
})

test('polinomioak 4. DBH ak memory: every card has exactly one partner and the pair is true', () => {
    for (let level = 0; level < polynomialsMemoryLevels.length; level += 1) {
        for (let seed = 1; seed <= 40; seed += 1) {
            const cards = createPolynomialsMemoryBoard(createRandom(seed * 7 + level), level)
            assert.equal(cards.length, POLYNOMIALS_MEMORY_PAIRS * 2)
            assert.equal(new Set(cards.map((card) => card.latex)).size, cards.length)
            for (const card of cards) {
                katex.renderToString(card.latex, { throwOnError: true })
                assert.ok(!card.latex.includes('+-') && !card.latex.includes('+0'), card.latex)
                // Two-digit coefficients do not fit a phone card
                assert.ok(!/\d\d/.test(card.latex), card.latex)
            }
            for (const card of cards.filter((item) => item.id.endsWith('-q'))) {
                const answer = cards.find((item) => item.setId === card.setId && item.id.endsWith('-a'))!.latex
                if (polynomialsMemoryLevels[level] === 'roots') {
                    const roots = answer.split(',\\ ').map(Number)
                    assert.deepEqual(fromRoots(roots).join(), [1, -(roots[0] + roots[1]), roots[0] * roots[1]].join())
                    for (const root of roots) assert.ok(Math.abs(atX(card.latex, root)) < 1e-9, `${card.latex} at ${root}`)
                } else {
                    for (const x of [1.7, -2.3, 3.1]) assert.ok(close(atX(card.latex, x), atX(answer, x)), `${card.latex} / ${answer}`)
                }
            }
        }
    }
})
