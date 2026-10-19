import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import { toNumber } from '../src/features/unit-v2/math/fraction.ts'
import { createPolynomialAkMemoryBoard, POLYNOMIAL_AK_MEMORY_PAIRS, polynomialAkMemoryLevels } from '../src/pages/dbh4-akademikoak-polinomikoak/games/boards.ts'
import { polynomialAkGameModeForPath, polynomialAkGameProgressIds, polynomialAkGames } from '../src/pages/dbh4-akademikoak-polinomikoak/games/info.ts'
import {
    checkPolynomialAkPitAnswer,
    generatePolynomialAkRaceQuestion,
    POLYNOMIAL_AK_RACE_CIRCUITS,
    polynomialAkParTime,
    polynomialAkRaceErrorTips,
    type PolynomialAkRaceQuestion
} from '../src/pages/dbh4-akademikoak-polinomikoak/games/race.ts'
import { polynomialAkLabChallengeIds } from '../src/pages/dbh4-akademikoak-polinomikoak/lab/labTools.ts'
import { polynomialLatex } from '../src/pages/dbh4-akademikoak-funtzioak/games/race.ts'

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
function expected(question: PolynomialAkRaceQuestion): number {
    const m = question.meta
    const roots = (b: number, c: number) => {
        const root = Math.sqrt(b * b - 4 * c)
        return [(-b - root) / 2, (-b + root) / 2]
    }
    switch (question.kind) {
        case 'slope': return (m.y2 - m.y1) / (m.x2 - m.x1)
        case 'intercept': return m.y0 - m.m * m.x0
        case 'x-cut': return -m.n / m.m
        case 'vertex-x': return -m.b / (2 * m.a)
        // y = a(x − h)² + k
        case 'extreme': return m.k
        case 'largest-root': return roots(m.b, m.c)[1]
        // x² + bx + c with b = −2h
        case 'vertex-form': return m.c - m.h * m.h
        case 'fit-a': return (m.y0 - m.q) / (m.x0 - m.p) ** 2
        // x² = mx + n
        case 'meet': return roots(-m.m, -m.n)[1]
        // x² − mx − n = 0 with Δ = 0
        case 'tangent': return -(m.m * m.m) / 4
        case 'abs-value': return Math.abs(m.m * m.x + m.n)
        case 'peak': return -m.n / m.m
        case 'abs-equation': return m.a + m.b
        // |x² + bx + c|: the inner vertex, reflected up
        case 'fold': return Math.abs(m.c - (m.b * m.b) / 4)
        case 'k': return m.x0 * m.y0
        case 'inverse': return (m.workers * m.days) / m.other
        case 'vertical': return -m.d
        case 'horizontal': return m.a / m.c
        default: throw new Error(`unchecked kind ${question.kind}`)
    }
}

/** The formulas in the prompt match the numbers of `meta` */
function checkPrompt(question: PolynomialAkRaceQuestion) {
    const m = question.meta
    const es = question.prompt.es
    if (question.kind === 'extreme') {
        assert.ok(es.includes(polynomialLatex([m.a, -2 * m.a * m.h, m.a * m.h * m.h + m.k])), es)
        assert.ok(es.includes(m.a > 0 ? 'mínimo' : 'máximo'))
    }
    if (question.kind === 'vertex-form') assert.ok(es.includes(polynomialLatex([1, -2 * m.h, m.c])), es)
    if (question.kind === 'largest-root' || question.kind === 'fold') assert.ok(es.includes(polynomialLatex([1, m.b, m.c])), es)
    if (question.kind === 'meet') assert.ok(es.includes(polynomialLatex([m.m, m.n])), es)
    if (question.kind === 'vertex-x') assert.ok(es.includes(`y=${polynomialLatex([m.a, m.b, m.c])}$`), es)
    // The fold question only makes sense when the inner parabola dips under the axis
    if (question.kind === 'fold') assert.ok(m.b * m.b - 4 * m.c > 0, es)
}

test('polinomikoak 4. DBH ak games: levels, ids and routes', () => {
    assert.equal(polynomialAkGames.length, 2)
    assert.equal(polynomialAkGames[0].levels.length, POLYNOMIAL_AK_RACE_CIRCUITS)
    assert.equal(polynomialAkGames[1].levels.length, polynomialAkMemoryLevels.length)
    assert.equal(new Set(polynomialAkGameProgressIds).size, polynomialAkGameProgressIds.length)
    assert.ok(!polynomialAkGameProgressIds.some((id) => polynomialAkLabChallengeIds.includes(id)))
    for (const id of polynomialAkGameProgressIds) assert.ok(id >= 78101 && id <= 78299, `${id}`)
    const stages = ['lines', 'parabolas', 'shifts', 'absolute', 'rational']
    for (const game of polynomialAkGames) for (const level of game.levels) assert.ok(stages.includes(level.stage), `${game.id} ${level.stage}`)
    assert.deepEqual(polynomialAkGames[0].levels.map((level) => level.stage), stages)
    assert.equal(polynomialAkGameModeForPath('/matematika/dbh4-akademikoak/funciones-polinomicas-racionales/juegos/carrera'), 'race')
    assert.equal(polynomialAkGameModeForPath('/matematika/dbh4-akademikoak/funciones-polinomicas-racionales/jokuak/memoria'), 'memory')
    assert.equal(polynomialAkGameModeForPath('/matematika/dbh4-akademikoak/funciones-polinomicas-racionales/jokuak'), 'hub')
})

test('polinomikoak 4. DBH ak race: valid options and every answer recomputed', () => {
    const kinds = new Set<string>()
    const errors = new Set<string>()
    for (let circuit = 0; circuit < POLYNOMIAL_AK_RACE_CIRCUITS; circuit += 1) {
        assert.ok(polynomialAkParTime(circuit) > 60000)
        for (let seed = 1; seed <= 200; seed += 1) {
            const random = createRandom(seed * 41 + circuit)
            for (const tier of [0, 1, 2] as const) {
                const question = generatePolynomialAkRaceQuestion(random, circuit, tier)
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
                        assert.ok(polynomialAkRaceErrorTips[option.error], option.error)
                    }
                }
                for (const language of ['eu', 'es', 'ar'] as const) {
                    for (const text of [question.prompt[language], question.solution[language]]) {
                        for (const [, formula] of text.matchAll(/\$([^$]+)\$/g)) {
                            katex.renderToString(formula, { throwOnError: true })
                            assert.ok(!/[؀-ۿ]/.test(formula), formula)
                            assert.ok(!formula.includes('+-') && !formula.includes('--') && !/(^|[^\d])-0(?!\d)/.test(formula), formula)
                        }
                    }
                }
                // Basque: no case ending right after a formula
                assert.ok(!/\$-(?:k|ra|tik|n|ko|an|ean|z|ren)\b/.test(question.prompt.eu), question.prompt.eu)
                checkPrompt(question)
                const right = question.options.find((option) => option.correct)!
                const target = expected(question)
                assert.ok(close(numberOf(right.latex), target), `${question.kind} ${JSON.stringify(question.meta)} ${right.latex} ${target}`)
                assert.ok(question.writable, question.kind)
                assert.ok(close(toNumber(question.answer), target), `${question.kind} answer`)
                assert.equal(checkPolynomialAkPitAnswer(question, typed(right.latex)), 'correct', `${question.kind} ${typed(right.latex)}`)
                for (const option of question.options.filter((item) => !item.correct)) assert.ok(!close(numberOf(option.latex), target), `${question.kind} ${option.latex}`)
            }
        }
    }
    const all = ['0:slope', '0:intercept', '0:x-cut', '1:vertex-x', '1:extreme', '1:largest-root', '2:vertex-form', '2:fit-a', '2:meet', '2:tangent', '3:abs-value', '3:peak', '3:abs-equation', '3:fold', '4:k', '4:inverse', '4:vertical', '4:horizontal']
    for (const kind of all) assert.ok(kinds.has(kind), `never generated: ${kind}`)
    for (const error of Object.keys(polynomialAkRaceErrorTips)) assert.ok(errors.has(error), `never used: ${error}`)
})

test('polinomikoak 4. DBH ak race: tips render and the pit stop reads answers', () => {
    assert.equal(checkPolynomialAkPitAnswer(generatePolynomialAkRaceQuestion(createRandom(5), 0, 0, true), 'zzz'), 'unreadable')
    for (const tip of Object.values(polynomialAkRaceErrorTips)) {
        for (const language of ['eu', 'es', 'ar'] as const) {
            for (const [, formula] of tip[language].matchAll(/\$([^$]+)\$/g)) katex.renderToString(formula, { throwOnError: true })
            assert.equal((tip[language].match(/\$/g) ?? []).length % 2, 0, tip[language])
        }
    }
})

test('polinomikoak 4. DBH ak memory: every card has exactly one partner and the pair is true', () => {
    for (let level = 0; level < polynomialAkMemoryLevels.length; level += 1) {
        for (let seed = 1; seed <= 60; seed += 1) {
            const cards = createPolynomialAkMemoryBoard(createRandom(seed * 7 + level), level)
            assert.equal(cards.length, POLYNOMIAL_AK_MEMORY_PAIRS * 2)
            assert.equal(new Set(cards.map((card) => card.latex)).size, cards.length)
            for (const card of cards) {
                katex.renderToString(card.latex, { throwOnError: true })
                katex.renderToString(card.explain!, { throwOnError: true })
                assert.ok(!card.latex.includes('+-') && !card.latex.includes('--'), card.latex)
            }
            for (const card of cards.filter((item) => item.id.endsWith('-q'))) {
                const answer = cards.find((item) => item.setId === card.setId && item.id.endsWith('-a'))!.latex
                const levelName = polynomialAkMemoryLevels[level]
                if (levelName === 'slopes') {
                    const [x1, y1, x2, y2] = [...card.latex.matchAll(/\((-?\d+),\\,(-?\d+)\)/g)].flatMap((match) => [Number(match[1]), Number(match[2])])
                    assert.equal(Number(answer), (y2 - y1) / (x2 - x1), card.latex)
                } else if (levelName === 'vertices') {
                    const polynomial = card.latex.replace('\\small ', '')
                    const vertex = answer.match(/^\((-?\d+),\\,(-?\d+)\)$/)!
                    const [h, k] = [Number(vertex[1]), Number(vertex[2])]
                    assert.equal(polynomial, polynomialLatex([1, -2 * h, h * h + k]), card.latex)
                } else {
                    const match = card.latex.match(/^\\frac\{(-?\d*)x([+-]\d+)?\}\{x([+-]\d+)\}$/)!
                    const a = match[1] === '' ? 1 : match[1] === '-' ? -1 : Number(match[1])
                    const b = Number(match[2] ?? 0)
                    const d = Number(match[3])
                    assert.notEqual(b, a * d, card.latex)
                    assert.equal(answer, `\\small\\begin{gathered}x=${-d}\\\\y=${a}\\end{gathered}`, card.latex)
                }
            }
        }
    }
})
