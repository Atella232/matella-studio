import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import { toNumber } from '../src/features/unit-v2/math/fraction.ts'
import { createSystemsMemoryBoard, SYSTEMS_MEMORY_PAIRS, systemsMemoryLevels } from '../src/pages/dbh4-akademikoak-sistemak/games/boards.ts'
import { systemsGameModeForPath, systemsGameProgressIds, systemsGames } from '../src/pages/dbh4-akademikoak-sistemak/games/info.ts'
import { checkSystemsPitAnswer, SYSTEMS_RACE_CIRCUITS, systemsParTime, systemsRaceErrorTips, generateSystemsRaceQuestion, type SystemsRaceQuestion } from '../src/pages/dbh4-akademikoak-sistemak/games/race.ts'
import { systemsLabChallengeIds } from '../src/pages/dbh4-akademikoak-sistemak/lab/labTools.ts'

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

/** The answer recomputed from the data the question carries */
function expected(question: SystemsRaceQuestion): number {
    const m = question.meta
    const cramer = () => {
        const det = m.a1 * m.b2 - m.b1 * m.a2
        return m.ask === 0 ? (m.c1 * m.b2 - m.b1 * m.c2) / det : (m.a1 * m.c2 - m.c1 * m.a2) / det
    }
    const count = (a: number, b: number, c: number) => {
        let total = 0
        for (let x = 0; x <= 40; x += 1) for (let y = 0; y <= 40; y += 1) if (a * x + b * y <= c) total += 1
        return total
    }
    switch (question.kind) {
        case 'point': return (m.c - m.a * m.x) / m.b
        case 'cross':
        case 'substitution':
        case 'reduction':
        case 'equalization':
        case 'denominators':
        case 'heads-legs':
        case 'coins': {
            assert.notEqual(m.a1 * m.b2 - m.b1 * m.a2, 0, question.kind)
            return cramer()
        }
        case 'parameter': {
            // incompatible: a/a′ = b/m and c/c′ different
            const m2 = (m.b * m.a * m.factor) / m.a
            assert.ok(Math.abs(m.c / m.c2 - 1 / m.factor) > 1e-9)
            return m2
        }
        case 'axis': return m.c / m.b
        case 'sum-product': return Math.max(...quadraticRoots(1, -(m.r + m.s), m.r * m.s))
        case 'squares-count': {
            const roots = (square: number) => (square < 0 ? 0 : square === 0 ? 1 : 2)
            return roots((m.A + m.B) / 2) * roots((m.A - m.B) / 2)
        }
        case 'squares-value': return Math.sqrt((m.A + m.B) / 2)
        case 'line-circle': {
            const sum = m.a + m.b
            return Math.max(...quadraticRoots(2, -2 * sum, sum * sum - (m.a * m.a + m.b * m.b)))
        }
        case 'test-point': return m.a * m.p + m.b * m.q
        case 'lattice': return count(m.a, m.b, m.c)
        case 'vertex': return m.c / m.a
        case 'area': return (m.c * m.c) / (2 * m.a * m.b)
        case 'numbers': return (m.sum + m.difference / m.sum) / 2
        case 'rectangle': return Math.max(...quadraticRoots(1, -m.perimeter / 2, m.area))
        case 'budget': return Math.max(...Array.from({ length: 40 }, (_, y) => y).filter((y) => m.p + m.q * y <= m.budget))
        default: throw new Error(`unchecked kind ${question.kind}`)
    }
}


test('sistemak 4. DBH ak games: levels, ids and routes', () => {
    assert.equal(systemsGames.length, 2)
    assert.equal(systemsGames[0].levels.length, SYSTEMS_RACE_CIRCUITS)
    assert.equal(systemsGames[1].levels.length, systemsMemoryLevels.length)
    assert.equal(new Set(systemsGameProgressIds).size, systemsGameProgressIds.length)
    assert.ok(systemsGameProgressIds.every((id) => id >= 68000 && id < 69000))
    assert.ok(!systemsGameProgressIds.some((id) => systemsLabChallengeIds.includes(id)))
    const stages = ['linear', 'methods', 'nonlinear', 'half-planes', 'problems']
    for (const game of systemsGames) for (const level of game.levels) assert.ok(stages.includes(level.stage), `${game.id} ${level.stage}`)
    assert.deepEqual(systemsGames[0].levels.map((level) => level.stage), stages)
    assert.equal(systemsGameModeForPath('/matematika/dbh4-akademikoak/sistemas/juegos/carrera'), 'race')
    assert.equal(systemsGameModeForPath('/matematika/dbh4-akademikoak/sistemas/jokuak/memoria'), 'memory')
})

test('sistemak 4. DBH ak race: valid options and every answer recomputed', () => {
    const kinds = new Set<string>()
    const errors = new Set<string>()
    for (let circuit = 0; circuit < SYSTEMS_RACE_CIRCUITS; circuit += 1) {
        assert.ok(systemsParTime(circuit) > 60000)
        for (let seed = 1; seed <= 200; seed += 1) {
            const random = createRandom(seed * 37 + circuit)
            for (const tier of [0, 1, 2] as const) {
                const question = generateSystemsRaceQuestion(random, circuit, tier)
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
                        assert.ok(systemsRaceErrorTips[option.error], option.error)
                    }
                }
                for (const language of ['eu', 'es', 'ar'] as const) {
                    for (const text of [question.prompt[language], question.solution[language]]) {
                        for (const [, formula] of text.matchAll(/\$([^$]+)\$/g)) {
                            katex.renderToString(formula, { throwOnError: true })
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
                if (question.writable) assert.equal(checkSystemsPitAnswer(question, typed(right.latex)), 'correct', `${question.kind} ${typed(right.latex)}`)
            }
        }
    }
    for (const kind of ['0:point', '0:cross', '0:parameter', '0:axis', '1:substitution', '1:reduction', '1:equalization', '1:denominators', '2:sum-product', '2:squares-count', '2:squares-value', '2:line-circle', '3:test-point', '3:lattice', '3:vertex', '3:area', '4:heads-legs', '4:coins', '4:numbers', '4:rectangle', '4:budget']) assert.ok(kinds.has(kind), `never generated: ${kind}`)
    for (const error of Object.keys(systemsRaceErrorTips)) assert.ok(errors.has(error), `never used: ${error}`)
})

/** LaTeX of a linear equation with x and y as JavaScript, evaluated at (x, y) */
function js(latex: string, x: number, y: number): number {
    const body = latex.replace(/\{([+\-=])\}/g, '$1').replace(/(\d)([xy])/g, '$1*$2').replace(/x/g, `(${x})`).replace(/y/g, `(${y})`)
    return Function(`return ${body}`)() as number
}

test('sistemak 4. DBH ak memory: every card has exactly one partner and the pair is true', () => {
    for (let level = 0; level < systemsMemoryLevels.length; level += 1) {
        for (let seed = 1; seed <= 40; seed += 1) {
            const cards = createSystemsMemoryBoard(createRandom(seed * 7 + level), level)
            assert.equal(cards.length, SYSTEMS_MEMORY_PAIRS * 2)
            assert.equal(new Set(cards.map((card) => card.latex)).size, cards.length)
            for (const card of cards) {
                katex.renderToString(card.latex, { throwOnError: true })
                assert.ok(!card.latex.includes('+-') && !card.latex.includes('{+}{-}') && !card.latex.includes('{+}0'), card.latex)
                // Two-digit coefficients do not fit a phone card; a bare count does
                if (!/^\d+$/.test(card.latex)) assert.ok(!/\d\d/.test(card.latex), card.latex)
            }
            for (const card of cards.filter((item) => item.id.endsWith('-q'))) {
                const answer = cards.find((item) => item.setId === card.setId && item.id.endsWith('-a'))!.latex
                const rows = card.latex.replace('\\begin{array}{c}', '').replace('\\end{array}', '').split('\\\\')
                if (systemsMemoryLevels[level] === 'linear') {
                    // No row starts with a minus sign: it would not fit a phone card
                    for (const row of rows) assert.ok(!row.startsWith('-'), row)
                    const [x, y] = answer.slice(1, -1).split(',').map(Number)
                    for (const row of rows) {
                        const [left, right] = row.split('{=}')
                        assert.ok(Math.abs(js(left, x, y) - Number(right.replace(/\{-\}/, '-'))) < 1e-9, `${row} at ${answer}`)
                    }
                    // and it is the only solution
                    const [a1, b1] = [js(rows[0].split('{=}')[0], 1, 0) - js(rows[0].split('{=}')[0], 0, 0), js(rows[0].split('{=}')[0], 0, 1) - js(rows[0].split('{=}')[0], 0, 0)]
                    const [a2, b2] = [js(rows[1].split('{=}')[0], 1, 0) - js(rows[1].split('{=}')[0], 0, 0), js(rows[1].split('{=}')[0], 0, 1) - js(rows[1].split('{=}')[0], 0, 0)]
                    assert.notEqual(a1 * b2 - a2 * b1, 0, card.latex)
                } else if (systemsMemoryLevels[level] === 'nonlinear') {
                    const [r, s] = answer.split(',\\ ').map(Number)
                    const sum = Number(rows[0].split('{=}')[1].replace(/\{-\}/, '-'))
                    const product = Number(rows[1].split('{=}')[1].replace(/\{-\}/, '-'))
                    assert.ok(r + s === sum, card.latex)
                    assert.ok(r * s === product, card.latex)
                } else {
                    const [, a, b, c] = rows[1].replace(/\{([+-]|\\le)\}/g, '$1').match(/^(\d?)x\+(\d?)y\\le\s?(\d+)$/)!.map((value) => (value === '' ? 1 : Number(value)))
                    let count = 0
                    for (let x = 0; x <= 20; x += 1) for (let y = 0; y <= 20; y += 1) if (a * x + b * y <= c) count += 1
                    assert.equal(Number(answer), count, card.latex)
                }
            }
        }
    }
})
