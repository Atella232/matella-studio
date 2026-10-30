import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import { toNumber } from '../src/features/unit-v2/math/fraction.ts'
import { createEquationsMemoryBoard, EQUATIONS_MEMORY_PAIRS, equationsMemoryLevels } from '../src/pages/dbh4-akademikoak-ekuazioak/games/boards.ts'
import { equationsGameModeForPath, equationsGameProgressIds, equationsGames } from '../src/pages/dbh4-akademikoak-ekuazioak/games/info.ts'
import { checkEquationsPitAnswer, EQUATIONS_RACE_CIRCUITS, equationsParTime, equationsRaceErrorTips, generateEquationsRaceQuestion, type EquationsRaceQuestion } from '../src/pages/dbh4-akademikoak-ekuazioak/games/race.ts'
import { equationsInequalitiesLabChallengeIds, holds, RELATIONS } from '../src/pages/dbh4-akademikoak-ekuazioak/lab/labTools.ts'

const close = (a: number, b: number) => Math.abs(a - b) < 1e-9 * Math.max(1, Math.abs(b))
/** A LaTeX option as a number: 5, -3, \frac{1}{8}, -\frac{2}{3} */
function valueOf(latex: string): number {
    const fraction = latex.match(/^(-?)\\frac\{(\d+)\}\{(\d+)\}$/)
    if (fraction) return (fraction[1] ? -1 : 1) * Number(fraction[2]) / Number(fraction[3])
    return Number(latex)
}
const typed = (latex: string) => latex.replace(/^(-?)\\frac\{(\d+)\}\{(\d+)\}$/, '$1$2/$3')
/** Real roots of Ax² + Bx + C, smallest first */
const quadraticRoots = (A: number, B: number, C: number) => {
    const delta = B * B - 4 * A * C
    if (delta < 0) return []
    return [(-B - Math.sqrt(delta)) / (2 * A), (-B + Math.sqrt(delta)) / (2 * A)].sort((p, q) => p - q)
}
const integers = Array.from({ length: 401 }, (_, k) => k - 200)

/** The answer recomputed from the data the question carries, solving the equation again */
function expected(question: EquationsRaceQuestion): number {
    const m = question.meta
    const relation = (index: number) => RELATIONS[index]
    switch (question.kind) {
        case 'discriminant': return m.b * m.b - 4 * m.a * m.c
        case 'greatest-root': {
            const roots = quadraticRoots(m.a, -m.a * (m.r + m.s), m.a * m.r * m.s)
            return Math.max(...roots)
        }
        case 'sum-product': {
            const [A, B, C] = [m.a, -m.a * (m.r + m.s), m.a * m.r * m.s]
            return m.which === 1 ? C / A : -B / A
        }
        case 'rectangle': return Math.max(...quadraticRoots(1, -(m.p + m.q), m.p * m.q))
        case 'biquadratic-count': {
            const ts = [...new Set(quadraticRoots(1, -(m.t1 + m.t2), m.t1 * m.t2))]
            return new Set(ts.flatMap((t) => (t < 0 ? [] : [Math.sqrt(t), -Math.sqrt(t)]).map((x) => x + 0))).size
        }
        case 'biquadratic-root': return Math.sqrt(Math.max(...quadraticRoots(1, -(m.a * m.a + m.b * m.b), m.a * m.a * m.b * m.b)))
        case 'factored': return m.r0 + m.r1 + m.r2
        case 'rational': {
            const x = m.p + m.a / m.b
            assert.ok(close(m.a / (x - m.p), m.b))
            return x
        }
        case 'radical': {
            const x = m.c * m.c - m.b
            assert.ok(close(Math.sqrt(x + m.b), m.c))
            return x
        }
        case 'radical-false': {
            // Square: x² + (2c − a)x + c² − b = 0, then keep the candidates that check
            const valid = quadraticRoots(1, 2 * m.c - m.a, m.c * m.c - m.b).filter((x) => m.a * x + m.b >= 0 && close(Math.sqrt(m.a * x + m.b), x + m.c))
            assert.equal(valid.length, 1, JSON.stringify(m))
            return valid[0]
        }
        case 'exponential': return (m.k - m.q) / m.p
        case 'logarithm': return m.base ** m.k - m.q
        case 'log-sum': {
            const valid = quadraticRoots(1, m.d, -m.r * (m.r + m.d)).filter((x) => x > 0 && x + m.d > 0)
            assert.equal(valid.length, 1)
            return valid[0]
        }
        case 'integer-solution': {
            const solutions = integers.filter((x) => holds(m.a * x + m.b, relation(m.relation), m.c))
            return solutions.includes(-200) ? Math.max(...solutions) : Math.min(...solutions)
        }
        case 'probe': return toNumber(question.answer)
        case 'budget': return Math.max(...integers.filter((x) => x >= 0 && m.fixed + m.rate * x <= m.budget))
        case 'tariffs': return Math.min(...integers.filter((x) => x >= 0 && m.fee + m.rateA * x < m.rateB * x))
        case 'quadratic-count': return integers.filter((x) => holds(m.a * (x - m.r) * (x - m.s), relation(m.relation), 0)).length
        case 'quadratic-greatest': return Math.max(...integers.filter((x) => holds(m.a * (x - m.r) * (x - m.s), relation(m.relation), 0)))
        case 'system-count': return integers.filter((x) => holds(m.a1 * x + m.b1, relation(m.rel1), m.c1) && holds(m.a2 * x + m.b2, relation(m.rel2), m.c2)).length
        case 'graphic-length': {
            const roots = quadraticRoots(1, -m.m, -m.n)
            return roots[1] - roots[0]
        }
        default: throw new Error(`unchecked kind ${question.kind}`)
    }
}

test('ekuazioak 4. DBH ak games: levels, ids and routes', () => {
    assert.equal(equationsGames.length, 2)
    assert.equal(equationsGames[0].levels.length, EQUATIONS_RACE_CIRCUITS)
    assert.equal(equationsGames[1].levels.length, equationsMemoryLevels.length)
    assert.equal(new Set(equationsGameProgressIds).size, equationsGameProgressIds.length)
    assert.ok(equationsGameProgressIds.every((id) => id >= 66000 && id < 67000))
    assert.ok(!equationsGameProgressIds.some((id) => equationsInequalitiesLabChallengeIds.includes(id)))
    const stages = ['quadratic', 'other', 'exponential', 'inequalities', 'quadratic-inequalities']
    for (const game of equationsGames) for (const level of game.levels) assert.ok(stages.includes(level.stage), `${game.id} ${level.stage}`)
    assert.deepEqual(equationsGames[0].levels.map((level) => level.stage), stages)
    assert.equal(equationsGameModeForPath('/matematika/dbh4-akademikoak/ecuaciones-inecuaciones/juegos/carrera'), 'race')
    assert.equal(equationsGameModeForPath('/matematika/dbh4-akademikoak/ecuaciones-inecuaciones/jokuak/memoria'), 'memory')
})

test('ekuazioak 4. DBH ak race: valid options and every answer recomputed', () => {
    const kinds = new Set<string>()
    const errors = new Set<string>()
    for (let circuit = 0; circuit < EQUATIONS_RACE_CIRCUITS; circuit += 1) {
        assert.ok(equationsParTime(circuit) > 60000)
        for (let seed = 1; seed <= 200; seed += 1) {
            const random = createRandom(seed * 37 + circuit)
            for (const tier of [0, 1, 2] as const) {
                const question = generateEquationsRaceQuestion(random, circuit, tier)
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
                        assert.ok(equationsRaceErrorTips[option.error], option.error)
                    }
                }
                for (const language of ['eu', 'es', 'en', 'ar'] as const) {
                    for (const text of [question.prompt[language], question.solution[language]]) {
                        for (const [, formula] of text.matchAll(/\$([^$]+)\$/g)) {
                            katex.renderToString(formulaFor(language, formula), { throwOnError: true })
                            assert.ok(!formula.includes('+-') && !formula.includes('--') && !formula.includes('+0') && !/(^|[^\d])1x/.test(formula), `${question.kind} ${formula}`)
                            assert.ok(!/[؀-ۿ]/.test(formula), formula)
                        }
                    }
                }
                assert.ok(!/\$-(?:k|ra|tik|n|ko|an|ean|z)\b/.test(question.prompt.eu), question.prompt.eu)
                assert.ok(!/\d-(?:k|ra|tik|n|ko|an|ean|z|a)\b/.test(question.prompt.eu), question.prompt.eu)
                const right = question.options.find((option) => option.correct)!
                const value = toNumber(question.answer)
                assert.ok(close(valueOf(right.latex), value), `${question.kind} ${right.latex}`)
                assert.ok(close(value, expected(question)), `${question.kind} ${JSON.stringify(question.meta)} ${value}`)
                if (question.writable) assert.equal(checkEquationsPitAnswer(question, typed(right.latex)), 'correct', `${question.kind} ${typed(right.latex)}`)
                if (question.kind === 'probe') {
                    // Exactly one of the four numbers satisfies the inequality
                    const m = question.meta
                    for (const option of question.options) assert.equal(holds(m.a * valueOf(option.latex) + m.b, RELATIONS[m.relation], m.c), option.correct, `${JSON.stringify(m)} ${option.latex}`)
                }
            }
        }
    }
    for (const kind of ['0:discriminant', '0:greatest-root', '0:sum-product', '0:rectangle', '1:biquadratic-count', '1:biquadratic-root', '1:factored', '1:rational', '2:radical', '2:radical-false', '2:exponential', '2:logarithm', '2:log-sum', '3:integer-solution', '3:probe', '3:budget', '3:tariffs', '4:quadratic-count', '4:quadratic-greatest', '4:system-count', '4:graphic-length']) assert.ok(kinds.has(kind), `never generated: ${kind}`)
    for (const error of Object.keys(equationsRaceErrorTips)) assert.ok(errors.has(error), `never used: ${error}`)
})

/** LaTeX with x only as JavaScript: x^{2}-5x+6, 2x-1\le 3 */
function js(latex: string, x: number): string {
    return latex
        .replace(/\{(\\le|\\ge|[+\-<>])\}/g, '$1')
        .replace(/\\le/g, '<=').replace(/\\ge/g, '>=')
        .replace(/\^\{(\d+)\}/g, '**$1')
        .replace(/(\d)x/g, '$1*x')
        .replace(/x/g, `(${x})`)
}
/** An interval in LaTeX as a test: [-2,\,3), (-\infty,\,4] */
function inInterval(latex: string, x: number): boolean {
    const match = latex.match(/^([[(])(-?\d+|-\\infty),\\,(-?\d+|\+\\infty)([\])])$/)
    assert.ok(match, latex)
    const [, open, from, to, close] = match
    const low = from.includes('infty') ? -Infinity : Number(from)
    const high = to.includes('infty') ? Infinity : Number(to)
    return (open === '[' ? x >= low : x > low) && (close === ']' ? x <= high : x < high)
}

test('ekuazioak 4. DBH ak memory: every card has exactly one partner and the pair is true', () => {
    for (let level = 0; level < equationsMemoryLevels.length; level += 1) {
        for (let seed = 1; seed <= 40; seed += 1) {
            const cards = createEquationsMemoryBoard(createRandom(seed * 7 + level), level)
            assert.equal(cards.length, EQUATIONS_MEMORY_PAIRS * 2)
            assert.equal(new Set(cards.map((card) => card.latex)).size, cards.length)
            for (const card of cards) {
                katex.renderToString(card.latex, { throwOnError: true })
                assert.ok(!card.latex.includes('+-') && !card.latex.includes('+0'), card.latex)
                // Two-digit coefficients do not fit a phone card
                assert.ok(!/\d\d/.test(card.latex), card.latex)
            }
            for (const card of cards.filter((item) => item.id.endsWith('-q'))) {
                const answer = cards.find((item) => item.setId === card.setId && item.id.endsWith('-a'))!.latex
                if (equationsMemoryLevels[level] === 'sum-product') {
                    const [, sum, product] = card.latex.match(/^\\begin\{array\}\{c\}S=(-?\d+)\\\\P=(-?\d+)\\end\{array\}$/)!.map(Number)
                    for (const x of [1.7, -2.3, 3.1]) assert.ok(close(Function(`return ${js(answer, x)}`)() as number, x * x - sum * x + product), `${card.latex} / ${answer}`)
                } else {
                    for (let x = -7; x <= 7; x += 0.25) assert.equal(Function(`return ${js(card.latex, x)}`)() as boolean, inInterval(answer, x), `${card.latex} / ${answer} at ${x}`)
                }
            }
        }
    }
})
