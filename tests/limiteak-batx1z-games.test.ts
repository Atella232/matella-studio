import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import type { Tier } from '../src/features/unit-v2/games/raceCore.ts'
import { toExactDecimal, toNumber } from '../src/features/unit-v2/math/fraction.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { written } from '../src/pages/batx1-zientziak-errealak/games/race.ts'
import { ASYMPTOTE_ROUNDS, asymptoteValue, createAsymptoteRounds, fromRoots, isAsymptotePick, polynomialLatex } from '../src/pages/batx1-zientziak-limiteak/games/asymptotes.ts'
import { BACH_LIMITS_MEMORY_PAIRS, bachLimitsMemoryLevels, createBachLimitsMemoryBoard } from '../src/pages/batx1-zientziak-limiteak/games/boards.ts'
import { BACH_LIMITS_DETECTIVE_CASES, bachLimitsDetectiveLevels, bachLimitsDetectiveNames, bachLimitsDetectiveTips, createBachLimitsDetectiveCases } from '../src/pages/batx1-zientziak-limiteak/games/detective.ts'
import { createDiscontinuityRounds, DISCONTINUITY_KINDS, DISCONTINUITY_ROUNDS, kindOf, linearLatex } from '../src/pages/batx1-zientziak-limiteak/games/discontinuity.ts'
import { createFormsRounds, FORM_BINS, FORMS_ROUNDS } from '../src/pages/batx1-zientziak-limiteak/games/forms.ts'
import { bachLimitsGameModeForPath, bachLimitsGameProgressIds, bachLimitsGames, bachLimitsGameSlugs } from '../src/pages/batx1-zientziak-limiteak/games/info.ts'
import { BACH_LIMITS_RACE_CIRCUITS, bachLimitsRaceErrorTips, checkBachLimitsPitAnswer, generateBachLimitsRaceQuestion } from '../src/pages/batx1-zientziak-limiteak/games/race.ts'

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

/** A limit, worked out numerically: far away for x → +∞, from both sides for x → a */
function numeric(fn: (x: number) => number, at: number | 'infinity'): number {
    if (at === 'infinity') return fn(1e7)
    return (fn(at - 1e-7) + fn(at + 1e-7)) / 2
}

test('limiteak batx1 z games: the hub, its levels and progress ids', () => {
    assert.deepEqual(bachLimitsGames.map((game) => game.id), ['race', 'forms', 'asymptote', 'discontinuity', 'detective', 'memory', 'toward', 'band'])
    assert.equal(new Set(bachLimitsGameProgressIds).size, bachLimitsGameProgressIds.length)
    for (const id of bachLimitsGameProgressIds) assert.ok(id >= 109401 && id <= 109899, `${id}`)
    const stages = ['point', 'calculus', 'infinity', 'asymptotes', 'continuity']
    for (const game of bachLimitsGames) {
        assert.ok(game.levels.length >= 3, game.id)
        for (const level of game.levels) assert.ok(stages.includes(level.stage), `${game.id}: ${level.stage}`)
        checkTexts([game.title, game.tagline, game.skills, ...game.levels.flatMap((level) => [level.title, level.description])])
        assert.equal(bachLimitsGameModeForPath(`/matematika/batx1-zientziak/limites-continuidad/jokuak/${bachLimitsGameSlugs[game.id]}`), game.id)
    }
    assert.equal(bachLimitsGameModeForPath('/matematika/batx1-zientziak/limites-continuidad/jokuak'), 'hub')
})

test('limiteak batx1 z games: every race question has one right option, worked out from its numbers', () => {
    const kinds = new Set<string>()
    for (let circuit = 0; circuit < BACH_LIMITS_RACE_CIRCUITS; circuit += 1) {
        for (const tier of [0, 1, 2] as Tier[]) {
            for (let seed = 1; seed <= 60; seed += 1) {
                const question = generateBachLimitsRaceQuestion(createRandom(seed * 7919 + circuit * 31 + tier), circuit, tier)
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
                assert.equal(checkBachLimitsPitAnswer(question, typed), 'correct', `${question.kind}: ${typed}`)
                const { meta: m } = question
                const value = toNumber(question.answer)
                // Every answer worked out again, numerically where it is a limit
                const expected: Record<string, () => number> = {
                    side: () => numeric((x) => m.m * x + m.c, m.t),
                    'join-limit': () => m.t * m.t + m.q - m.m * m.t,
                    'vertical-count': () => (m.r === m.d ? 1 : 2),
                    factor: () => numeric((x) => (x * x - (m.a + m.b) * x + m.a * m.b) / (x - m.a), m.a),
                    conjugate: () => numeric((x) => (Math.sqrt(x) - m.c) / (x - m.c * m.c), m.c * m.c),
                    substitute: () => (m.a * m.a + m.p) / (m.a + m.q),
                    degrees: () => numeric((x) => (m.a * x * x + m.p * x) / (m.b * x * x + m.q), 'infinity'),
                    'root-difference': () => numeric((x) => (m.p * x) / (Math.sqrt(x * x + m.p * x) + x), 'infinity'),
                    e: () => m.p * m.q,
                    horizontal: () => numeric((x) => (m.a * x + m.c) / (m.b * x + m.e), 'infinity'),
                    oblique: () => numeric((x) => (x * x + m.p * x + m.q) / (x - m.d) - x, 'infinity'),
                    slope: () => numeric((x) => (m.a * x * x + 1) / (m.b * x + m.c) / x, 'infinity'),
                    continuity: () => m.t * m.t + m.c - m.a * m.t,
                    fill: () => numeric((x) => (x * x - m.a * m.a) / (x - m.a), m.a),
                    bolzano: () => {
                        const f = (x: number) => x ** 3 + x - m.q
                        return [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5].find((n) => f(n) < 0 && f(n + 1) > 0)!
                    }
                }
                assert.ok(expected[question.kind], `no check for ${question.kind}`)
                assert.ok(Math.abs(value - expected[question.kind]()) < 1e-4, `${question.kind}: ${value} ≠ ${expected[question.kind]()}`)
                for (const option of question.options.filter((item) => !item.correct)) assert.ok(bachLimitsRaceErrorTips[option.error!], `${question.kind}: ${option.error}`)
            }
        }
    }
    assert.equal(kinds.size, 15)
    checkTexts(Object.values(bachLimitsRaceErrorTips))
})

test('limiteak batx1 z games: ¿indeterminación o no? gives every kind of answer, each one right', () => {
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 60; seed += 1) {
            const rounds = createFormsRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, FORMS_ROUNDS)
            assert.equal(new Set(rounds.map((round) => round.limit)).size, rounds.length)
            for (const bin of FORM_BINS) assert.ok(rounds.some((round) => round.bin === bin), `level ${level}: no ${bin}`)
            for (const round of rounds) {
                render(round.limit)
                render(round.form)
                // The indeterminate forms are exactly these
                const indeterminate = ['\\frac{0}{0}', '\\frac{\\infty}{\\infty}', '\\infty-\\infty', '\\infty\\cdot 0', '1^{\\infty}', '\\infty^{0}'].includes(round.form)
                assert.equal(round.bin === 'indeterminate', indeterminate, `${round.limit}: ${round.form}`)
                if (round.bin === 'zero') assert.ok(/^\\frac\{(?:0|\d+)\}\{(?:-?\d+|\\infty)\}$|^0\^\{\\infty\}$|^\\left\(\\frac\{1\}\{\d\}\\right\)\^\{\\infty\}$/.test(round.form), round.form)
            }
        }
    }
})

test('limiteak batx1 z games: caza las asíntotas marks exactly the asymptotes', () => {
    assert.equal(polynomialLatex(fromRoots(1, [2, -1])), 'x^2-x-2')
    assert.equal(polynomialLatex(fromRoots(-2, [3])), '-2x+6')
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 60; seed += 1) {
            const rounds = createAsymptoteRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, ASYMPTOTE_ROUNDS, `level ${level} seed ${seed}`)
            for (const round of rounds) {
                render(round.latex)
                for (const card of round.cards) render(card.latex)
                assert.equal(new Set(round.cards.map((card) => card.latex)).size, round.cards.length)
                assert.ok(round.cards.length >= 4 && round.cards.some((card) => !card.right))
                const rightCards = round.cards.map((card, index) => (card.right ? index : -1)).filter((index) => index >= 0)
                assert.ok(isAsymptotePick(round, rightCards))
                assert.ok(!isAsymptotePick(round, rightCards.slice(1)))
                // Each vertical asymptote really blows up, and a hole does not
                for (const d of round.verticals) assert.ok(Math.abs(asymptoteValue(round, d + 1e-6)!) > 1e4, `${round.latex}: x=${d}`)
                if (round.hole) assert.ok(Math.abs(asymptoteValue(round, round.hole[0] + 1e-6)! - round.hole[1]) < 1e-4, round.latex)
                if (round.horizontal !== null) assert.ok(Math.abs(asymptoteValue(round, 1e6)! - round.horizontal) < 1e-3, round.latex)
                if (round.oblique) assert.ok(Math.abs(asymptoteValue(round, 1e6)! - (round.oblique[0] * 1e6 + round.oblique[1])) < 1e-3, round.latex)
                // The right cards are the asymptotes listed
                const listed = [...round.verticals.map((d) => `x=${d}`), ...(round.horizontal !== null && level > 0 ? [`y=${round.horizontal}`] : []), ...(round.oblique ? ['oblique'] : [])]
                assert.equal(rightCards.length, listed.length, round.latex)
                if (level === 0) assert.ok(round.cards.every((card) => card.latex.startsWith('x=')))
                if (level === 2) assert.ok(round.oblique !== null && round.horizontal === null)
            }
        }
    }
})

test('limiteak batx1 z games: ¿qué discontinuidad? answers what the limits say', () => {
    assert.equal(linearLatex(2, -3), '2x-3')
    assert.equal(linearLatex(-1, 0), '-x')
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 60; seed += 1) {
            const rounds = createDiscontinuityRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, DISCONTINUITY_ROUNDS, `level ${level} seed ${seed}`)
            for (const kind of DISCONTINUITY_KINDS) assert.ok(rounds.some((round) => round.answer === kind), `level ${level}: no ${kind}`)
            for (const round of rounds) {
                assert.equal(kindOf(round), round.answer, round.kind)
                if (level === 0) assert.equal(round.latex, null)
                else render(round.latex!)
                // The pieces next to a give the one-sided limits
                const leftPiece = round.pieces.find((piece) => piece.from < round.a && piece.to >= round.a - 0.1)!
                const rightPiece = round.pieces.find((piece) => piece.from <= round.a + 0.1 && piece.to > round.a)!
                const near = (piece: typeof leftPiece, x: number) => piece.fn(x)
                if (Number.isFinite(round.left)) assert.ok(Math.abs(near(leftPiece, round.a - 1e-7) - round.left) < 1e-4, `${round.kind} left`)
                else assert.ok(Math.sign(near(leftPiece, round.a - 1e-7)) === Math.sign(round.left) && Math.abs(near(leftPiece, round.a - 1e-7)) > 1e4, `${round.kind} left ∞`)
                if (Number.isFinite(round.right)) assert.ok(Math.abs(near(rightPiece, round.a + 1e-7) - round.right) < 1e-4, `${round.kind} right`)
                else assert.ok(Math.sign(near(rightPiece, round.a + 1e-7)) === Math.sign(round.right), `${round.kind} right ∞`)
            }
        }
    }
})

test('limiteak batx1 z games: the detective cases are well made', () => {
    assert.equal(bachLimitsDetectiveLevels.flat().length, 12)
    checkTexts([...Object.values(bachLimitsDetectiveNames), ...Object.values(bachLimitsDetectiveTips)])
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 40; seed += 1) {
            const cases = createBachLimitsDetectiveCases(createRandom(seed * 7919 + level), level)
            assert.equal(cases.length, BACH_LIMITS_DETECTIVE_CASES)
            for (const item of cases) {
                assert.ok(bachLimitsDetectiveLevels[level].includes(item.error))
                assert.ok(item.wrong >= 0 && item.wrong < item.lines.length)
                assert.ok(Math.abs(item.right - item.reached) > 1e-9)
                assert.equal(item.options.length, 3)
                assert.ok(item.options.includes(item.error))
                checkTexts([item.problem, ...item.lines.map((line) => line.label)])
                for (const language of languages) for (const line of item.lines) render(line.latex, language)
                for (const part of item.fix.split('\\ \\to\\ ')) render(part)
            }
        }
    }
})

test('limiteak batx1 z games: memory boards have six pairs with one partner each', () => {
    assert.deepEqual([...bachLimitsMemoryLevels], ['point', 'infinity', 'asymptotes'])
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 60; seed += 1) {
            const board = createBachLimitsMemoryBoard(createRandom(seed * 7919 + level), level)
            assert.equal(board.length, 2 * BACH_LIMITS_MEMORY_PAIRS)
            const latexes = board.map((card) => card.latex)
            assert.equal(new Set(latexes).size, latexes.length, latexes.join(' | '))
            for (const card of board) {
                render(card.latex)
                render(card.explain)
            }
        }
    }
})
