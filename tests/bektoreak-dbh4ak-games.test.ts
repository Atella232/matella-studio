import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import { fraction, toNumber } from '../src/features/unit-v2/math/fraction.ts'
import { createVectorsMemoryBoard, VECTORS_MEMORY_PAIRS, vectorsMemoryLevels } from '../src/pages/dbh4-akademikoak-bektoreak/games/boards.ts'
import { vectorsGameModeForPath, vectorsGameProgressIds, vectorsGames } from '../src/pages/dbh4-akademikoak-bektoreak/games/info.ts'
import {
    checkVectorsPitAnswer,
    circleLatex,
    explicitLatex,
    generalLatex,
    generateVectorsRaceQuestion,
    pairLatex,
    sumLatex,
    VECTORS_RACE_CIRCUITS,
    vectorsParTime,
    vectorsRaceErrorTips,
    type VectorsRaceQuestion
} from '../src/pages/dbh4-akademikoak-bektoreak/games/race.ts'
import { vectorsLabChallengeIds } from '../src/pages/dbh4-akademikoak-bektoreak/lab/labTools.ts'

const close = (a: number, b: number) => Math.abs(a - b) < 1e-9

/** A number option: 5, -3, \frac{2}{3}, -\frac{1}{2} */
function numberOf(latex: string): number {
    const match = latex.match(/^(-?)\\frac\{(\d+)\}\{(\d+)\}$/)
    if (match) return (match[1] ? -1 : 1) * Number(match[2]) / Number(match[3])
    const value = Number(latex)
    if (Number.isNaN(value)) throw new Error(`Cannot read ${latex}`)
    return value
}

/** A point option: (3,\,-4) */
function pairOf(latex: string): [number, number] {
    const match = latex.match(/^\((-?\d+),\\,(-?\d+)\)$/)
    if (!match) throw new Error(`Cannot read ${latex}`)
    return [Number(match[1]), Number(match[2])]
}

/** How a student types a number option at the pit stop */
const typed = (latex: string) => latex.replace(/^(-?)\\frac\{(\d+)\}\{(\d+)\}$/, '$1$2/$3')

type Expected = { number: number } | { point: [number, number] } | { latex: string }

/** The answer recomputed from the numbers of the prompt */
function expected(question: VectorsRaceQuestion): Expected {
    const m = question.meta
    switch (question.kind) {
        case 'vector': return { point: [m.bx - m.ax, m.by - m.ay] }
        case 'modulus': return { number: Math.hypot(m.x, m.y) }
        case 'combination': return { point: [m.k * m.ux + m.sign * m.vx, m.k * m.uy + m.sign * m.vy] }
        // (a, b) ∥ (c, y) ⇔ a·y − b·c = 0
        case 'parallel': return { number: (m.b * m.c) / m.a }
        case 'distance': return { number: Math.hypot(m.bx - m.ax, m.by - m.ay) }
        case 'midpoint': return { point: [(m.ax + m.bx) / 2, (m.ay + m.by) / 2] }
        case 'symmetric': return { point: [2 * m.mx - m.ax, 2 * m.my - m.ay] }
        case 'aligned': return { number: m.ay + ((m.by - m.ay) * (m.cx - m.ax)) / (m.bx - m.ax) }
        case 'slope': return { number: (m.by - m.ay) / (m.bx - m.ax) }
        case 'general-slope': return { number: -m.a / m.b }
        case 'intercept': return { number: m.py - m.m * m.px }
        case 'parametric': return { point: [m.px + m.t * m.dx, m.py + m.t * m.dy] }
        case 'explicit': {
            const slope = (m.by - m.ay) / (m.bx - m.ax)
            return { latex: explicitLatex(fraction(slope), fraction(m.ay - slope * m.ax)) }
        }
        case 'slope-position': {
            const slope = m.m / m.q
            return { number: m.ask === 0 ? slope : -1 / slope }
        }
        case 'crossing': {
            const x = (m.n2 - m.n1) / (m.m1 - m.m2)
            return { point: [x, m.m1 * x + m.n1] }
        }
        // r: a1 x + b1 y + c1 = 0, s: a2 x + k y + c2 = 0
        case 'parameter': return { number: m.ask === 0 ? (m.a2 * m.b1) / m.a1 : (-m.a1 * m.a2) / m.b1 }
        case 'bisector': return { number: -(m.bx - m.ax) / (m.by - m.ay) }
        case 'circle-centre': return { point: [m.a, m.b] }
        case 'circle-radius': return { number: m.r }
        case 'circle-equation': return { latex: circleLatex(m.a, m.b, m.r * m.r) }
        // D = A + C − B, and ABCD is not degenerate
        case 'vertex': return { point: [m.ax + m.cx - m.bx, m.ay + m.cy - m.by] }
        default: throw new Error(`unchecked kind ${question.kind}`)
    }
}

test('bektoreak 4. DBH ak games: levels, ids and routes', () => {
    assert.equal(vectorsGames.length, 2)
    assert.equal(vectorsGames[0].levels.length, VECTORS_RACE_CIRCUITS)
    assert.equal(vectorsGames[1].levels.length, vectorsMemoryLevels.length)
    assert.equal(new Set(vectorsGameProgressIds).size, vectorsGameProgressIds.length)
    assert.ok(!vectorsGameProgressIds.some((id) => vectorsLabChallengeIds.includes(id)))
    for (const id of vectorsGameProgressIds) assert.ok(id >= 74101 && id <= 74299, `${id}`)
    const stages = ['vectors', 'points', 'equations', 'positions', 'applications']
    for (const game of vectorsGames) for (const level of game.levels) assert.ok(stages.includes(level.stage), `${game.id} ${level.stage}`)
    assert.deepEqual(vectorsGames[0].levels.map((level) => level.stage), stages)
    assert.equal(vectorsGameModeForPath('/matematika/dbh4-akademikoak/vectores-rectas/juegos/carrera'), 'race')
    assert.equal(vectorsGameModeForPath('/matematika/dbh4-akademikoak/vectores-rectas/jokuak/memoria'), 'memory')
    assert.equal(vectorsGameModeForPath('/matematika/dbh4-akademikoak/vectores-rectas/jokuak'), 'hub')
})

test('bektoreak 4. DBH ak race: valid options and every answer recomputed', () => {
    const kinds = new Set<string>()
    const errors = new Set<string>()
    for (let circuit = 0; circuit < VECTORS_RACE_CIRCUITS; circuit += 1) {
        assert.ok(vectorsParTime(circuit) > 60000)
        for (let seed = 1; seed <= 200; seed += 1) {
            const random = createRandom(seed * 41 + circuit)
            for (const tier of [0, 1, 2] as const) {
                const question = generateVectorsRaceQuestion(random, circuit, tier)
                assert.equal(question.circuit, circuit)
                kinds.add(`${circuit}:${question.kind}`)
                assert.equal(question.options.length, 4, question.kind)
                assert.equal(new Set(question.options.map((option) => option.latex)).size, 4, question.kind)
                assert.equal(question.options.filter((option) => option.correct).length, 1)
                for (const option of question.options) {
                    katex.renderToString(option.latex, { throwOnError: true })
                    assert.ok(!option.latex.includes('-0') && !option.latex.includes('NaN'), option.latex)
                    if (option.error) {
                        errors.add(option.error)
                        assert.ok(vectorsRaceErrorTips[option.error], option.error)
                    }
                }
                for (const language of ['eu', 'es', 'en', 'ar'] as const) {
                    for (const text of [question.prompt[language], question.solution[language]]) {
                        for (const [, formula] of text.matchAll(/\$([^$]+)\$/g)) {
                            katex.renderToString(formulaFor(language, formula), { throwOnError: true })
                            assert.ok(!/[؀-ۿ]/.test(formula), formula)
                            assert.ok(!/(?<!\\colon\s?)\b[rs]:/.test(formula), `MathText turns ":" into ÷: ${formula}`)
                        }
                    }
                }
                // Basque: no case ending right after a formula
                assert.ok(!/\$-(?:k|ra|tik|n|ko|an|ean|z|ren)\b/.test(question.prompt.eu), question.prompt.eu)
                const right = question.options.find((option) => option.correct)!
                const target = expected(question)
                if ('number' in target) {
                    assert.ok(close(numberOf(right.latex), target.number), `${question.kind} ${JSON.stringify(question.meta)} ${right.latex} ${target.number}`)
                    assert.ok(question.writable, question.kind)
                    assert.ok(close(toNumber(question.answer), target.number), `${question.kind} answer`)
                    assert.equal(checkVectorsPitAnswer(question, typed(right.latex)), 'correct', `${question.kind} ${typed(right.latex)}`)
                    for (const option of question.options.filter((item) => !item.correct)) assert.ok(!close(numberOf(option.latex), target.number), `${question.kind} ${option.latex}`)
                } else if ('point' in target) {
                    assert.deepEqual(pairOf(right.latex), target.point.map((value) => value || 0), `${question.kind} ${JSON.stringify(question.meta)}`)
                    assert.ok(!question.writable, question.kind)
                    for (const option of question.options.filter((item) => !item.correct)) assert.notDeepEqual(pairOf(option.latex), target.point)
                } else {
                    assert.equal(right.latex, target.latex, question.kind)
                    assert.ok(!question.writable, question.kind)
                }
                if (question.kind === 'vertex') {
                    const m = question.meta
                    assert.notEqual((m.bx - m.ax) * (m.cy - m.ay) - (m.by - m.ay) * (m.cx - m.ax), 0)
                }
            }
        }
    }
    const all = ['0:vector', '0:modulus', '0:combination', '0:parallel', '1:distance', '1:midpoint', '1:symmetric', '1:aligned', '2:slope', '2:general-slope', '2:intercept', '2:parametric', '2:explicit', '3:slope-position', '3:crossing', '3:parameter', '4:bisector', '4:circle-centre', '4:circle-radius', '4:circle-equation', '4:vertex']
    for (const kind of all) assert.ok(kinds.has(kind), `never generated: ${kind}`)
    for (const error of Object.keys(vectorsRaceErrorTips)) assert.ok(errors.has(error), `never used: ${error}`)
    for (let circuit = 0; circuit < VECTORS_RACE_CIRCUITS; circuit += 1) assert.ok(generateVectorsRaceQuestion(createRandom(circuit), circuit, 1, true).writable)
})

test('bektoreak 4. DBH ak race: writing helpers and tips', () => {
    assert.equal(pairLatex([3, -4]), '(3,\\,-4)')
    assert.equal(sumLatex([[2, 'x'], [-1, 'y'], [3, '']]), '2x-y+3')
    assert.equal(sumLatex([[0, 'x'], [0, '']]), '0')
    assert.equal(generalLatex(-1, 0, -5), '-x-5=0')
    assert.equal(explicitLatex(fraction(2, 3), fraction(-4)), 'y=\\frac{2}{3}x-4')
    assert.equal(explicitLatex(fraction(-1), fraction(0)), 'y=-x')
    assert.equal(circleLatex(2, -1, 9), '(x-2)^{2}+(y+1)^{2}=9')
    assert.equal(circleLatex(0, 3, 4), 'x^{2}+(y-3)^{2}=4')
    assert.equal(checkVectorsPitAnswer(generateVectorsRaceQuestion(createRandom(5), 1, 0, true), 'zzz'), 'unreadable')
    for (const tip of Object.values(vectorsRaceErrorTips)) {
        for (const language of ['eu', 'es', 'en', 'ar'] as const) {
            for (const [, formula] of tip[language].matchAll(/\$([^$]+)\$/g)) katex.renderToString(formulaFor(language, formula), { throwOnError: true })
            assert.equal((tip[language].match(/\$/g) ?? []).length % 2, 0, tip[language])
        }
    }
})

test('bektoreak 4. DBH ak memory: every card has exactly one partner and the pair is true', () => {
    for (let level = 0; level < vectorsMemoryLevels.length; level += 1) {
        for (let seed = 1; seed <= 60; seed += 1) {
            const cards = createVectorsMemoryBoard(createRandom(seed * 7 + level), level)
            assert.equal(cards.length, VECTORS_MEMORY_PAIRS * 2)
            assert.equal(new Set(cards.map((card) => card.latex)).size, cards.length)
            for (const card of cards) {
                katex.renderToString(card.latex, { throwOnError: true })
                katex.renderToString(card.explain!, { throwOnError: true })
            }
            for (const card of cards.filter((item) => item.id.endsWith('-q'))) {
                const answer = cards.find((item) => item.setId === card.setId && item.id.endsWith('-a'))!.latex
                const numbers = (text: string) => (text.match(/-?\d+/g) ?? []).map(Number)
                const level_ = vectorsMemoryLevels[level]
                if (level_ === 'vectors') {
                    const [ax, ay, bx, by] = numbers(card.latex)
                    assert.equal(answer, `\\begin{array}{c}\\vec{AB}\\\\${pairLatex([bx - ax, by - ay])}\\end{array}`)
                } else if (level_ === 'equations') {
                    // Both forms give the same y at x = 0 and x = 6
                    const general = card.latex.replace(/\\begin\{array\}\{c\}|\\end\{array\}|\\\\/g, '').replace('=0', '')
                    const coefficient = (variable: string) => {
                        const match = general.match(new RegExp(`([+-]?\\d*)${variable}`))
                        if (!match) return 0
                        return match[1] === '' || match[1] === '+' ? 1 : match[1] === '-' ? -1 : Number(match[1])
                    }
                    const a = coefficient('x')
                    const b = coefficient('y')
                    const c = Number(general.replace(/[+-]?\d*[xy]/g, '') || 0)
                    assert.ok(a > 0 && b !== 0, card.latex)
                    const explicit = answer.replace('y=', '')
                    const slopeMatch = explicit.match(/^(-?)(?:\\frac\{(\d+)\}\{(\d+)\}|(\d*))x/)
                    const slope = slopeMatch ? (slopeMatch[1] ? -1 : 1) * (slopeMatch[2] ? Number(slopeMatch[2]) / Number(slopeMatch[3]) : Number(slopeMatch[4] || 1)) : 0
                    const intercept = Number(explicit.replace(/^-?(?:\\frac\{\d+\}\{\d+\}|\d*)x/, '') || 0)
                    for (const x of [0, 6]) assert.ok(close(a * x + b * (slope * x + intercept) + c, 0), `${card.latex} ${answer}`)
                } else {
                    const [cx, cy, r] = numbers(answer)
                    assert.equal(card.latex.replace(/\\small |\\begin\{array\}\{c\}|\\end\{array\}|\\\\/g, ''), circleLatex(cx, cy, r * r))
                }
            }
        }
    }
})
