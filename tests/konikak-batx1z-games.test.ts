import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import type { Tier } from '../src/features/unit-v2/games/raceCore.ts'
import { toExactDecimal, toNumber } from '../src/features/unit-v2/math/fraction.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { written } from '../src/pages/batx1-zientziak-errealak/games/race.ts'
import { bachConicsGameModeForPath, bachConicsGameProgressIds, bachConicsGames, bachConicsGameSlugs } from '../src/pages/batx1-zientziak-konikak/games/info.ts'
import { BACH_CONICS_RACE_CIRCUITS, bachConicsRaceErrorTips, checkBachConicsPitAnswer, generateBachConicsRaceQuestion } from '../src/pages/batx1-zientziak-konikak/games/race.ts'
import { CONIC_KINDS, CONIC_ROUNDS, createConicRounds, rightOption } from '../src/pages/batx1-zientziak-konikak/games/conic.ts'
import { ANTENNA_ROUNDS, createAntennaRounds, rightAntennaOption } from '../src/pages/batx1-zientziak-konikak/games/antenna.ts'
import { BACH_CONICS_DETECTIVE_CASES, bachConicsDetectiveLevels, bachConicsDetectiveNames, bachConicsDetectiveTips, createBachConicsDetectiveCases } from '../src/pages/batx1-zientziak-konikak/games/detective.ts'
import { BACH_CONICS_MEMORY_PAIRS, bachConicsMemoryLevels, createBachConicsMemoryBoard } from '../src/pages/batx1-zientziak-konikak/games/boards.ts'
import { polynomial, ratio, squareOf } from '../src/pages/batx1-zientziak-konikak/games/conicLatex.ts'

const languages = ['eu', 'es', 'en', 'ar'] as const
const render = (latex: string, language: (typeof languages)[number] = 'es') => katex.renderToString(formulaFor(language, latex), { throwOnError: true, strict: 'error' })

function checkTexts(texts: LocalizedText[]) {
    for (const text of texts) {
        for (const language of languages) {
            assert.ok(text[language].length > 0)
            for (const [, formula] of text[language].matchAll(/\$([^$]+)\$/g)) render(formula, language)
        }
        assert.ok(!text.ar.includes('{,}'), text.ar)
        assert.ok(!/[؀-ۿ]/.test([...text.ar.matchAll(/\$([^$]+)\$/g)].map((match) => match[1]).join('')), text.ar)
        assert.ok(!/\d(?:ri|ren|rekin|ekin|ek|ak|ra|tik|z|ei|en|k)(?![a-zA-Z])/.test(text.eu.replace(/\$[^$]+\$/g, '')), text.eu)
        assert.ok(!/\$(?:ri|ren|rekin|z|ra|tik|ei)(?![a-zA-Z])/.test(text.eu), text.eu)
        // MathText turns «:» into ÷ inside formulas
        for (const [, formula] of text.es.matchAll(/\$([^$]+)\$/g)) assert.ok(!formula.includes(':'), formula)
    }
}

/** The coefficients of a polynomial in x and y written by polynomial(): 4x^2-y^2+8x-6y+5 */
function readPolynomial(latex: string) {
    const found = { x2: 0, y2: 0, x: 0, y: 0, c: 0 }
    for (const [, sign, size, letters] of latex.matchAll(/([+-]?)(\d*)(x\^2|y\^2|x|y|)/g)) {
        if (!sign && !size && !letters) continue
        const value = (sign === '-' ? -1 : 1) * (size === '' ? 1 : Number(size))
        const key = letters === 'x^2' ? 'x2' : letters === 'y^2' ? 'y2' : letters === '' ? 'c' : letters
        found[key as keyof typeof found] += value
    }
    return found
}

/** The h of (x − h)² or (x − h) in a shifted equation, 0 when x appears alone */
function shiftIn(latex: string, name: 'x' | 'y') {
    const match = latex.match(new RegExp(`\\(${name}([+-]\\d+)\\)`))
    return match ? -Number(match[1]) : 0
}

test('konikak batx1 z games: the hub, its levels and progress ids', () => {
    assert.deepEqual(bachConicsGames.map((game) => game.id), ['race', 'conic', 'antenna', 'detective', 'memory'])
    assert.equal(new Set(bachConicsGameProgressIds).size, bachConicsGameProgressIds.length)
    for (const id of bachConicsGameProgressIds) assert.ok(id >= 107401 && id <= 107899, `${id}`)
    const stages = ['loci', 'circle', 'ellipse', 'hyperbola', 'parabola']
    for (const game of bachConicsGames) {
        assert.ok(game.levels.length >= 3, game.id)
        for (const level of game.levels) assert.ok(stages.includes(level.stage), `${game.id}: ${level.stage}`)
        // The hub shows these texts as plain text
        for (const text of [game.title, game.tagline, game.skills, ...game.levels.flatMap((level) => [level.title, level.description])]) for (const language of languages) assert.ok(!text[language].includes('$'), text[language])
        checkTexts([game.title, game.tagline, game.skills, ...game.levels.flatMap((level) => [level.title, level.description])])
        assert.equal(bachConicsGameModeForPath(`/matematika/batx1-zientziak/conicas/jokuak/${bachConicsGameSlugs[game.id]}`), game.id)
    }
    assert.equal(bachConicsGameModeForPath('/matematika/batx1-zientziak/conicas/jokuak'), 'hub')
})

test('konikak batx1 z games: writing conics', () => {
    assert.equal(squareOf('x', 3), '(x-3)^2')
    assert.equal(squareOf('y', -2), '(y+2)^2')
    assert.equal(squareOf('x', 0), 'x^2')
    assert.equal(polynomial([[4, 'x^2'], [-1, 'y^2'], [8, 'x'], [0, 'y'], [-5, '']]), '4x^2-y^2+8x-5')
    assert.deepEqual(readPolynomial('4x^2-y^2+8x-6y-5'), { x2: 4, y2: -1, x: 8, y: -6, c: -5 })
    assert.equal(ratio(6, 4), '\\frac{3}{2}')
})

test('konikak batx1 z games: every race question has one right option, worked out from its numbers', () => {
    const kinds = new Set<string>()
    for (let circuit = 0; circuit < BACH_CONICS_RACE_CIRCUITS; circuit += 1) {
        for (const tier of [0, 1, 2] as Tier[]) {
            for (let seed = 1; seed <= 60; seed += 1) {
                const question = generateBachConicsRaceQuestion(createRandom(seed * 7919 + circuit * 31 + tier), circuit, tier)
                kinds.add(question.kind)
                assert.equal(question.circuit, circuit)
                assert.equal(question.options.length, 4, question.kind)
                assert.equal(question.options.filter((option) => option.correct).length, 1, question.kind)
                assert.equal(new Set(question.options.map((option) => option.latex)).size, 4, `${question.kind}: ${question.options.map((option) => option.latex).join(' | ')}`)
                const right = question.options.find((option) => option.correct)!
                assert.equal(right.latex, written(question.answer), question.kind)
                for (const option of question.options) render(option.latex)
                checkTexts([question.prompt, question.solution])
                const typed = question.answer.denominator === 1 ? String(question.answer.numerator) : toExactDecimal(question.answer) ?? `${question.answer.numerator}/${question.answer.denominator}`
                assert.equal(checkBachConicsPitAnswer(question, typed), 'correct', `${question.kind}: ${typed}`)
                const { meta } = question
                const value = toNumber(question.answer)
                const expected: Record<string, () => number> = {
                    'point-line': () => Math.abs(meta.A * meta.x + meta.B * meta.y + meta.C) / Math.hypot(meta.A, meta.B),
                    parallel: () => meta.c0 + meta.d * Math.hypot(meta.A, meta.B),
                    equidistant: () => (meta.b1 ** 2 + meta.b2 ** 2 - meta.a1 ** 2 - meta.a2 ** 2) / (2 * (meta.b1 - meta.a1)),
                    radius: () => meta.r,
                    centre: () => (meta.index === 0 ? meta.h : meta.k),
                    tangent: () => meta.r * Math.hypot(meta.A, meta.B),
                    'ellipse-c': () => Math.sqrt(meta.a ** 2 - meta.b ** 2),
                    'ellipse-e': () => Math.sqrt(meta.a ** 2 - meta.b ** 2) / meta.a,
                    'ellipse-focus': () => meta.h + Math.sqrt(meta.a ** 2 - meta.b ** 2),
                    'hyperbola-c': () => Math.sqrt(meta.a ** 2 + meta.b ** 2),
                    asymptote: () => meta.b / meta.a,
                    'hyperbola-e': () => Math.sqrt(meta.a ** 2 + meta.b ** 2) / meta.a,
                    focus: () => meta.n / 4,
                    directrix: () => -meta.n / 4,
                    focal: () => Math.hypot(meta.x - meta.n / 4, Math.sqrt(meta.n * meta.x))
                }
                assert.ok(expected[question.kind], `no check for ${question.kind}`)
                assert.ok(Math.abs(value - expected[question.kind]()) < 1e-9, `${question.kind}: ${value} ≠ ${expected[question.kind]()}`)
                // The equidistant point really is the same distance from A and B
                if (question.kind === 'equidistant') assert.ok(Math.abs(Math.hypot(value - meta.a1, meta.a2) - Math.hypot(value - meta.b1, meta.b2)) < 1e-9)
            }
        }
    }
    assert.equal(kinds.size, 15)
    checkTexts(Object.values(bachConicsRaceErrorTips))
})

test('konikak batx1 z games: ¿qué cónica es?', () => {
    for (let level = 0; level < 3; level += 1) {
        const errors = new Set<string>()
        for (let seed = 1; seed <= 80; seed += 1) {
            const rounds = createConicRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, CONIC_ROUNDS)
            assert.equal(new Set(rounds.map((round) => round.latex)).size, CONIC_ROUNDS)
            for (const kind of CONIC_KINDS) assert.ok(rounds.some((round) => round.kind === kind), `level ${level}: no ${kind}`)
            for (const round of rounds) {
                render(round.latex)
                render(round.working)
                assert.equal(round.options.length, 4)
                assert.equal(round.options.filter((option) => option.error === null).length, 1)
                assert.equal(new Set(round.options.map((option) => option.latex)).size, 4)
                for (const option of round.options) {
                    render(option.latex)
                    if (option.error) errors.add(option.error)
                }
                const right = rightOption(round).latex
                const [left, rightSide] = round.latex.split('=')
                if (level === 0) {
                    if (round.kind === 'circle') assert.equal(right, `r=${Math.sqrt(Number(rightSide))}`)
                    if (round.kind === 'ellipse' || round.kind === 'hyperbola') {
                        const [dx, dy] = [...left.matchAll(/\{(\d+)\}/g)].map((match) => Number(match[1]))
                        if (round.kind === 'ellipse') {
                            const c = Math.sqrt(Math.abs(dx - dy))
                            assert.equal(right, dx > dy ? `F(\\pm ${c},0)` : `F(0,\\pm ${c})`, round.latex)
                        } else {
                            assert.equal(right, `y=\\pm ${ratio(Math.sqrt(dy), Math.sqrt(dx))}x`, round.latex)
                        }
                    }
                    if (round.kind === 'parabola') {
                        const n = Number(rightSide.replace(/[xy]/, ''))
                        assert.equal(right, left === 'y^2' ? `F(${ratio(n, 4)},0)` : `F(0,${ratio(n, 4)})`, round.latex)
                    }
                } else if (level === 1) {
                    const name = round.kind === 'parabola' ? 'V' : 'C'
                    assert.equal(right, `${name}(${shiftIn(round.latex, 'x')},${shiftIn(round.latex, 'y')})`, round.latex)
                    if (round.kind === 'hyperbola') assert.ok(round.latex.includes('}-\\frac'), round.latex)
                } else {
                    // The general equation: the coefficients of x² and y² tell the conic, and completing the square the centre
                    const p = readPolynomial(left)
                    assert.equal(rightSide, '0')
                    if (round.kind === 'circle') assert.ok(p.x2 === p.y2 && p.x2 > 0, round.latex)
                    if (round.kind === 'ellipse') assert.ok(p.x2 > 0 && p.y2 > 0 && p.x2 !== p.y2, round.latex)
                    if (round.kind === 'hyperbola') assert.ok(p.x2 * p.y2 < 0, round.latex)
                    if (round.kind === 'parabola') {
                        assert.ok(p.x2 === 0 && p.y2 === 1, round.latex)
                        const k = -p.y / 2
                        assert.equal(right, `V(${(p.c - k * k) / -p.x},${k})`, round.latex)
                    } else {
                        assert.equal(right, `C(${-p.x / (2 * p.x2)},${-p.y / (2 * p.y2)})`, round.latex)
                    }
                }
            }
        }
        assert.ok(errors.size >= 3, `level ${level}: ${[...errors].join(', ')}`)
    }
})

test('konikak batx1 z games: la antena', () => {
    for (let level = 0; level < 3; level += 1) {
        const errors = new Set<string>()
        for (let seed = 1; seed <= 80; seed += 1) {
            const rounds = createAntennaRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, ANTENNA_ROUNDS)
            for (const round of rounds) {
                checkTexts([round.prompt])
                render(round.working)
                assert.equal(round.options.length, 4)
                assert.equal(new Set(round.options.map((option) => option.latex)).size, 4)
                for (const option of round.options) {
                    render(option.latex)
                    if (option.error) errors.add(option.error)
                }
                const numbers = [...round.prompt.es.matchAll(/\$(\d+)/g)].map((match) => Number(match[1]))
                const right = rightAntennaOption(round).latex
                if (level === 0) {
                    const n = Number(round.prompt.es.match(/y\^2=(\d+)x/)![1])
                    assert.equal(right, ratio(n, 4))
                } else if (level === 1) {
                    const [width, depth] = numbers
                    // The rim (depth, width / 2) is on y² = 4fx
                    assert.equal(Number(right), (width / 2) ** 2 / (4 * depth), round.prompt.es)
                } else {
                    const [a, b] = numbers
                    assert.equal(Number(right), Math.sqrt(a * a - b * b), round.prompt.es)
                }
            }
        }
        assert.ok(errors.size >= 3, `level ${level}: ${[...errors].join(', ')}`)
    }
})

test('konikak batx1 z games: the conics detective', () => {
    checkTexts([...Object.values(bachConicsDetectiveNames), ...Object.values(bachConicsDetectiveTips)])
    for (let level = 0; level < bachConicsDetectiveLevels.length; level += 1) {
        const seen = new Set<string>()
        for (let seed = 1; seed <= 60; seed += 1) {
            const cases = createBachConicsDetectiveCases(createRandom(seed * 7919 + level), level)
            assert.equal(cases.length, BACH_CONICS_DETECTIVE_CASES)
            for (const item of cases) {
                seen.add(item.error)
                assert.ok(bachConicsDetectiveLevels[level].includes(item.error))
                assert.equal(item.lines.length, 3)
                assert.ok(item.wrong >= 0 && item.wrong < item.lines.length)
                assert.equal(item.options.length, 3)
                assert.ok(item.options.includes(item.error))
                assert.ok(Math.abs(item.right - item.reached) > 1e-9)
                for (const line of item.lines) render(line.latex)
                render(item.fix)
                checkTexts([item.problem, ...item.lines.map((line) => line.label)])
            }
        }
        assert.equal(seen.size, 4, `level ${level}`)
    }
})

test('konikak batx1 z games: memory boards', () => {
    for (let level = 0; level < bachConicsMemoryLevels.length; level += 1) {
        for (let seed = 1; seed <= 80; seed += 1) {
            const board = createBachConicsMemoryBoard(createRandom(seed * 7919 + level), level)
            assert.equal(board.length, BACH_CONICS_MEMORY_PAIRS * 2)
            const answers = board.filter((card) => card.id.endsWith('-a'))
            assert.equal(new Set(answers.map((card) => card.latex)).size, BACH_CONICS_MEMORY_PAIRS)
            for (const card of board) {
                render(card.latex)
                if (card.explain) render(card.explain)
            }
            for (const question of board.filter((card) => card.id.endsWith('-q'))) {
                const answer = board.find((card) => card.id === `${question.setId}-a`)!.latex
                const kind = bachConicsMemoryLevels[level]
                if (kind === 'centre') assert.equal(answer, `C(${shiftIn(question.latex, 'x')},${shiftIn(question.latex, 'y')})`, question.latex)
                if (kind === 'foci') {
                    const [dx, dy] = [...question.latex.matchAll(/\{(\d+)\}/g)].map((match) => Number(match[1]))
                    const c = Math.sqrt(Math.abs(dx - dy))
                    assert.equal(answer, dx > dy ? `F(\\pm ${c},0)` : `F(0,\\pm ${c})`, question.latex)
                }
                if (kind === 'focus') {
                    const [squared, side] = question.latex.split('=')
                    const n = Number(side.replace(/[xy]/, ''))
                    assert.equal(answer, squared === 'y^2' ? `F(${ratio(n, 4)},0)` : `F(0,${ratio(n, 4)})`, question.latex)
                }
            }
        }
    }
})
