import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { localize } from '../src/pages/batx1-zientziak-funtzioak/text.ts'
import { BACH2_DERIVATIVES_MEMORY_PAIRS, createBach2DerivativesMemoryBoard } from '../src/pages/batx2-zientziak-deribatuak/games/boards.ts'
import { createDerivableRounds, DERIVABLE_BINS, DERIVABLE_ROUNDS, derivableBin } from '../src/pages/batx2-zientziak-deribatuak/games/derivable.ts'
import { BACH2_DERIVATIVES_DETECTIVE_ERRORS, bach2DerivativesDetectiveNames, bach2DerivativesDetectiveTips, createBach2DerivativesDetectiveCases } from '../src/pages/batx2-zientziak-deribatuak/games/detective.ts'
import { createHiddenRounds, HIDDEN_ROUNDS, onCurve, slopeLatex, slopeValue, tangentSlope } from '../src/pages/batx2-zientziak-deribatuak/games/hidden.ts'
import { bach2DerivativesGameModeForPath, bach2DerivativesGameProgressIds, bach2DerivativesGames, bach2DerivativesGameSlugs } from '../src/pages/batx2-zientziak-deribatuak/games/info.ts'
import { createOnionRounds, isOnionOrder, ONION_ROUNDS } from '../src/pages/batx2-zientziak-deribatuak/games/onion.ts'
import { BACH2_DERIVATIVES_RACE_CIRCUITS, generateBach2DerivativesRaceQuestion } from '../src/pages/batx2-zientziak-deribatuak/games/race.ts'

const languages = ['eu', 'es', 'en', 'ar'] as const
const render = (latex: string, language: (typeof languages)[number] = 'es') => katex.renderToString(formulaFor(language, localize(language, latex)), { throwOnError: true, strict: 'error' })

function checkTexts(texts: LocalizedText[]) {
    for (const text of texts) {
        for (const language of languages) {
            assert.ok(text[language].length > 0)
            for (const [, formula] of text[language].matchAll(/\$([^$]+)\$/g)) katex.renderToString(formulaFor(language, formula), { throwOnError: true, strict: 'error' })
        }
        assert.ok(!text.ar.includes('{,}'), text.ar)
        assert.ok(!/[؀-ۿ]/.test([...text.ar.matchAll(/\$([^$]+)\$/g)].map((match) => match[1]).join('')), text.ar)
        assert.ok(!/\d(?:ri|ren|rekin|ekin|ek|ak|ra|tik|z|ei|en|k)(?![a-zA-Z])/.test(text.eu.replace(/\$[^$]+\$/g, '')), text.eu)
        assert.ok(!/\$(?:ri|ren|rekin|z|ra|tik|ei)(?![a-zA-Z])/.test(text.eu), text.eu)
    }
}

/** One-sided limits and derivatives, numerically */
const h = 1e-6
const leftValue = (f: (x: number) => number, a: number) => f(a - h)
const rightValue = (f: (x: number) => number, a: number) => f(a + h)
const leftSlope = (f: (x: number) => number, a: number) => (f(a - h) - f(a - 2 * h)) / h
const rightSlope = (f: (x: number) => number, a: number) => (f(a + 2 * h) - f(a + h)) / h

test('deribatuak batx2 z games: the list, the ids and the addresses', () => {
    assert.equal(bach2DerivativesGames.length, 8)
    assert.equal(new Set(bach2DerivativesGameProgressIds).size, bach2DerivativesGameProgressIds.length)
    for (const id of bach2DerivativesGameProgressIds) assert.ok(id >= 123401 && id <= 123899, `${id}`)
    const stages = ['review', 'derivability', 'chain', 'special', 'tangents']
    for (const game of bach2DerivativesGames) {
        for (const level of game.levels) assert.ok(stages.includes(level.stage), `${game.id}: ${level.stage}`)
        checkTexts([game.title, game.tagline, game.skills, ...game.levels.flatMap((level) => [level.title, level.description])])
        assert.equal(bach2DerivativesGameModeForPath(`/matematika/batx2-zientziak/derivadas/jokuak/${bach2DerivativesGameSlugs[game.id]}`), game.id)
    }
})

test('deribatuak batx2 z games: differentiable?', () => {
    for (let seed = 1; seed <= 40; seed += 1) {
        for (let level = 0; level < 3; level += 1) {
            const rounds = createDerivableRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, DERIVABLE_ROUNDS)
            for (const bin of DERIVABLE_BINS) assert.ok(rounds.filter((round) => round.bin === bin).length >= 2, `${level} ${bin}`)
            for (const round of rounds) {
                render(round.latex)
                assert.equal(round.bin, derivableBin(round.values, round.slopes))
                // The heights and slopes shown are those of the function itself
                const { f, a } = round
                assert.ok(Math.abs(leftValue(f, a) - round.values[0]) < 1e-4 && Math.abs(rightValue(f, a) - round.values[1]) < 1e-4, `${round.latex}: values`)
                assert.ok(Math.abs(leftSlope(f, a) - round.slopes[0]) < 1e-3 && Math.abs(rightSlope(f, a) - round.slopes[1]) < 1e-3, `${round.latex}: slopes`)
            }
        }
    }
})

test('deribatuak batx2 z games: peel the onion', () => {
    for (let seed = 1; seed <= 40; seed += 1) {
        for (let level = 0; level < 3; level += 1) {
            const rounds = createOnionRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, ONION_ROUNDS)
            for (const round of rounds) {
                for (const language of languages) {
                    render(round.latex, language)
                    for (const option of round.options) render(option, language)
                    for (const card of round.cards) render(card, language)
                }
                assert.equal(new Set(round.options).size, 3)
                assert.ok(round.correct >= 0 && round.correct < 3)
                // The cards are the three layers, never already in order, and only the right order wins
                assert.deepEqual([...round.cards].sort(), [...round.layers].sort())
                assert.ok(!isOnionOrder(round, round.cards))
                assert.ok(isOnionOrder(round, round.layers))
                // The product of the three factors is the derivative, where the function is defined
                for (const x of [0.3, 0.7, 1.1]) {
                    const y = round.f(x)
                    if (!Number.isFinite(y) || !Number.isFinite(round.f(x + 1e-6))) continue
                    const numeric = (round.f(x + 1e-6) - round.f(x - 1e-6)) / 2e-6
                    assert.ok(Math.abs(numeric - round.df(x)) < 1e-3 * Math.max(1, Math.abs(numeric)), `${round.latex} at ${x}: ${numeric} vs ${round.df(x)}`)
                }
            }
        }
    }
})

test('deribatuak batx2 z games: the hidden slope', () => {
    for (let seed = 1; seed <= 40; seed += 1) {
        for (let level = 0; level < 3; level += 1) {
            const rounds = createHiddenRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, HIDDEN_ROUNDS)
            for (const round of rounds) {
                render(round.latex)
                render(round.formula)
                assert.ok(onCurve(round.curve, round.point), `${round.latex} ${round.point}`)
                const right = round.slopes[round.correct]
                assert.deepEqual(right, tangentSlope(round.curve, round.point))
                assert.equal(new Set(round.slopes.map(slopeLatex)).size, 3)
                for (const slope of round.slopes) render(slopeLatex(slope))
                // The slope is the one of the curve: follow it a little way with Newton's method
                const [x0, y0] = round.point
                const F = (x: number, y: number) => (round.curve.kind === 'hyperbola' ? x * y - round.curve.k : round.curve.a * x * x + round.curve.b * x * y + round.curve.c * y * y - round.curve.d)
                const step = 1e-5
                let y = y0
                for (let i = 0; i < 30; i++) y -= F(x0 + step, y) / ((F(x0 + step, y + 1e-7) - F(x0 + step, y - 1e-7)) / 2e-7)
                assert.ok(Math.abs((y - y0) / step - slopeValue(right)) < 1e-3, `${round.latex} at ${round.point}`)
            }
        }
    }
})

test('deribatuak batx2 z games: the detective', () => {
    checkTexts([...Object.values(bach2DerivativesDetectiveNames), ...Object.values(bach2DerivativesDetectiveTips)])
    const seen = new Set<string>()
    for (let seed = 1; seed <= 40; seed += 1) {
        for (let level = 0; level < 3; level += 1) {
            for (const item of createBach2DerivativesDetectiveCases(createRandom(seed * 7919 + level), level)) {
                seen.add(item.error)
                assert.equal(item.lines.length, 3)
                assert.ok(item.wrong >= 0 && item.wrong < 3)
                assert.notEqual(item.right, item.reached)
                checkTexts([item.problem, ...item.lines.map((line) => line.label)])
                for (const language of languages) {
                    for (const line of item.lines) render(line.latex, language)
                    for (const part of item.fix.split('\\ \\to\\ ')) render(part, language)
                }
            }
        }
    }
    assert.deepEqual([...seen].sort(), [...BACH2_DERIVATIVES_DETECTIVE_ERRORS].sort())
})

test('deribatuak batx2 z games: the race, every answer checked against its meta', () => {
    const kinds = new Set<string>()
    for (let seed = 1; seed <= 60; seed += 1) {
        for (let circuit = 0; circuit < BACH2_DERIVATIVES_RACE_CIRCUITS; circuit += 1) {
            const question = generateBach2DerivativesRaceQuestion(createRandom(seed * 7919 + circuit), circuit, 'base')
            kinds.add(question.kind)
            assert.equal(question.options.filter((option) => option.correct).length, 1)
            assert.equal(new Set(question.options.map((option) => option.latex)).size, 4)
            checkTexts([question.prompt, question.solution])
            for (const option of question.options) render(option.latex)
            const answer = question.answer.numerator / question.answer.denominator
            const m = question.meta
            const expected: Record<string, () => number> = {
                tangent: () => 3 * m.a * m.a + m.p,
                normal: () => -1 / (2 * m.a + m.p),
                product: () => 1 + m.q + 2 * (1 + m.p),
                join: () => m.a * m.a + m.b,
                corners: () => m.count,
                side: () => 1 + m.p,
                three: () => m.p * m.q,
                table: () => 2 / (1 + m.c),
                nth: () => m.k ** m.n,
                inverse: () => 1 / (3 + m.p),
                circle: () => -m.a / m.b,
                ellipse: () => -m.a / (m.k * m.b),
                horizontal: () => -m.b / 2,
                coefficient: () => m.m - 2 * m.a,
                exterior: () => 2 * m.k
            }
            assert.ok(Math.abs(answer - expected[question.kind]()) < 1e-9, `${question.kind}: ${question.prompt.es}`)
            // The numbers behind the meta, worked out another way
            const derivative = (f: (x: number) => number, x: number) => (f(x + 1e-6) - f(x - 1e-6)) / 2e-6
            if (question.kind === 'three') assert.ok(Math.abs(derivative((x) => Math.exp(m.p * Math.sin(m.q * x)), 0) - answer) < 1e-5)
            if (question.kind === 'table') assert.ok(Math.abs(derivative((x) => Math.log(x * x + m.c), 1) - answer) < 1e-5)
            if (question.kind === 'product') assert.ok(Math.abs(derivative((x) => (x + m.p) * (x * x + m.q), 1) - answer) < 1e-5)
            if (question.kind === 'inverse') {
                const f = (x: number) => x ** 3 + m.p * x
                const inverse = (y: number) => { let x = 1; for (let i = 0; i < 40; i++) x -= (f(x) - y) / (3 * x * x + m.p); return x }
                assert.ok(Math.abs(derivative(inverse, 1 + m.p) - answer) < 1e-5)
            }
            if (question.kind === 'corners') {
                // Count the points where the one-sided derivatives differ, between −6 and 6
                const latex = question.prompt.es.match(/\$f\(x\)=\|(.+)\|\$/)![1]
                const inside = (x: number) => Function('x', `return ${latex.replace(/\^(\d)/g, '**$1').replace(/(\d)x/g, '$1*x')}`)(x) as number
                const f = (x: number) => Math.abs(inside(x))
                let count = 0
                for (let x = -6; x <= 6; x += 1) if (Math.abs(inside(x)) < 1e-9 && Math.abs(leftSlope(f, x) - rightSlope(f, x)) > 1e-3) count += 1
                assert.equal(count, answer, latex)
            }
        }
    }
    assert.equal(kinds.size, 15)
})

test('deribatuak batx2 z games: memory', () => {
    for (let seed = 1; seed <= 40; seed += 1) {
        for (let level = 0; level < 3; level += 1) {
            const cards = createBach2DerivativesMemoryBoard(createRandom(seed * 7919 + level), level)
            assert.equal(cards.length, BACH2_DERIVATIVES_MEMORY_PAIRS * 2)
            for (const card of cards) {
                render(card.latex)
                render(card.explain)
                assert.ok(!/\\(?:sin|cos|tan|arc)/.test(card.latex), 'memory cards are not translated: no sines or arcs')
            }
            const answers = cards.filter((card) => card.id.endsWith('-a')).map((card) => card.latex)
            assert.equal(new Set(answers).size, BACH2_DERIVATIVES_MEMORY_PAIRS)
            const questions = cards.filter((card) => card.id.endsWith('-q')).map((card) => card.latex)
            assert.equal(new Set(questions).size, BACH2_DERIVATIVES_MEMORY_PAIRS)
        }
    }
})
