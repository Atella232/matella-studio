import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { localize } from '../src/pages/batx1-zientziak-funtzioak/text.ts'
import { written } from '../src/pages/batx1-zientziak-errealak/games/race.ts'
import { BARROW_ROUNDS, createBarrowRounds } from '../src/pages/batx2-zientziak-mugatua/games/barrow.ts'
import { BACH2_DEFINITE_MEMORY_PAIRS, createBach2DefiniteMemoryBoard, DERIVATIVE_PAIRS, VALUE_PAIRS, VOLUME_PAIRS, type MemoryPair } from '../src/pages/batx2-zientziak-mugatua/games/boards.ts'
import { createDeriveRounds, DERIVE_ROUNDS } from '../src/pages/batx2-zientziak-mugatua/games/derive.ts'
import { BACH2_DEFINITE_DETECTIVE_CASES, BACH2_DEFINITE_DETECTIVE_ERRORS, bach2DefiniteDetectiveNames, bach2DefiniteDetectiveTips, createBach2DefiniteDetectiveCases } from '../src/pages/batx2-zientziak-mugatua/games/detective.ts'
import { bach2DefiniteGameModeForPath, bach2DefiniteGameProgressIds, bach2DefiniteGames, bach2DefiniteGameSlugs } from '../src/pages/batx2-zientziak-mugatua/games/info.ts'
import { createLimitsRounds, LIMITS_ROUNDS, type TIntegral } from '../src/pages/batx2-zientziak-mugatua/games/limits.ts'
import { BACH2_DEFINITE_RACE_CIRCUITS, bach2DefiniteRaceErrorTips, generateBach2DefiniteRaceQuestion } from '../src/pages/batx2-zientziak-mugatua/games/race.ts'

const languages = ['eu', 'es', 'en', 'ar'] as const

/** A formula renders in every language, with each language's trigonometric names */
function renders(latex: string) {
    for (const language of languages) katex.renderToString(formulaFor(language, localize(language, latex)), { throwOnError: true, strict: 'error' })
}

function checkTexts(texts: LocalizedText[]) {
    for (const text of texts) {
        for (const language of languages) {
            assert.ok(text[language].length > 0)
            for (const [, formula] of text[language].matchAll(/\$([^$]+)\$/g)) katex.renderToString(formulaFor(language, formula), { throwOnError: true, strict: 'error' })
        }
        assert.ok(!text.ar.includes('{,}'), text.ar)
        if (/[a-zA-Z]{4}/.test(text.es.replace(/\$[^$]+\$/g, ''))) assert.ok(/[؀-ۿ]/.test(text.ar.replace(/\$[^$]+\$/g, '')), `not Arabic: ${text.ar}`)
        assert.ok(!/\d[a-zñ]/.test(text.eu.replace(/\$[^$]+\$/g, '')) && !/\$(?:ri|ren|rekin|z|ra|tik|ei)(?![a-zA-Z])/.test(text.eu), text.eu)
    }
}

/** ∫ₐᵇ f by Simpson's rule */
function simpson(fn: (x: number) => number, a: number, b: number, steps = 4000): number {
    const h = (b - a) / steps
    let sum = fn(a) + fn(b)
    for (let k = 1; k < steps; k += 1) sum += fn(a + k * h) * (k % 2 ? 4 : 2)
    return (sum * h) / 3
}
const close = (a: number, b: number, tolerance = 1e-4) => Math.abs(a - b) < tolerance * Math.max(1, Math.abs(b))
const SEEDS = Array.from({ length: 60 }, (_, i) => i * 7919 + 11)

test('mugatua batx2 z games: the list, the ids and the addresses', () => {
    assert.deepEqual(bach2DefiniteGames.map((game) => game.id), ['race', 'barrow', 'limits', 'derive', 'detective', 'memory'])
    const ids = bach2DefiniteGameProgressIds
    assert.equal(new Set(ids).size, ids.length)
    for (const id of ids) assert.ok(id >= 127401 && id <= 127899, `${id}`)
    assert.equal(bach2DefiniteGames.find((game) => game.id === 'race')!.levels.length, BACH2_DEFINITE_RACE_CIRCUITS)
    for (const game of bach2DefiniteGames) {
        for (const language of languages) assert.ok(game.title[language] && game.tagline[language] && game.skills[language], `${game.id} ${language}`)
        assert.equal(bach2DefiniteGameModeForPath(`/matematika/batx2-zientziak/integral-definida/jokuak/${bach2DefiniteGameSlugs[game.id]}`), game.id)
        for (const level of game.levels) for (const language of languages) assert.ok(level.title[language] && level.description[language], `${game.id} ${language}`)
    }
    assert.equal(bach2DefiniteGameModeForPath('/matematika/batx2-zientziak/integral-definida/jokuak'), 'hub')
})

test('mugatua batx2 z games · does Barrow work?: the values, the asymptotes and the splits', () => {
    for (const level of [0, 1, 2]) {
        for (const seed of SEEDS) {
            const rounds = createBarrowRounds(createRandom(seed), level)
            assert.equal(rounds.length, BARROW_ROUNDS)
            assert.equal(new Set(rounds.map((round) => `${round.integral}${round.definition ?? ''}`)).size, rounds.length, `level ${level} seed ${seed}: repeated`)
            for (const round of rounds) {
                renders(round.integral)
                if (round.definition) renders(round.definition)
                renders(round.worked)
                checkTexts([...round.options, round.why])
                assert.equal(round.options.length, 3)
                assert.equal(new Set(round.options.map((option) => option.es)).size, 3, round.integral)
                const right = round.options[round.answer].es
                if (round.value === null) {
                    // An asymptote inside: the right answer names it, and it is inside the interval
                    assert.ok(round.pole !== undefined && round.pole > round.a && round.pole < round.b, round.integral)
                    assert.ok(right.startsWith(`No: asíntota en $x=${round.pole}$`), `${round.integral}: ${right}`)
                } else {
                    // Barrow works: f has no pole inside, and the value is the integral
                    if (round.pole !== undefined) assert.ok(round.pole < round.a || round.pole > round.b, round.integral)
                    const split = ['abs', 'jump'].includes(round.kind) ? (round.integral.includes('|') ? Number(round.integral.match(/x-(\d)/)![1]) : null) : null
                    const numeric = split === null && round.kind !== 'jump'
                        ? simpson(round.fn, round.a, round.b)
                        : round.kind === 'jump'
                            ? (() => {
                                const c = Number(round.definition!.match(/x<(\d)/)![1])
                                return simpson(round.fn, round.a, c - 1e-9) + simpson(round.fn, c, round.b)
                            })()
                            : simpson(round.fn, round.a, split!) + simpson(round.fn, split!, round.b)
                    assert.ok(close(numeric, round.value), `${round.integral}: ${numeric} ≠ ${round.value}`)
                    assert.ok(right.startsWith('Sí'), `${round.integral}: ${right}`)
                }
            }
        }
    }
})

test('mugatua batx2 z games · change the limits: only the right integral in t has the value of the original', () => {
    const value = (item: TIntegral) => item.factor * simpson(item.fn, item.from, item.to)
    for (const level of [0, 1, 2]) {
        for (const seed of SEEDS) {
            const rounds = createLimitsRounds(createRandom(seed), level)
            assert.equal(rounds.length, LIMITS_ROUNDS)
            assert.equal(new Set(rounds.map((round) => round.integral)).size, rounds.length, `level ${level} seed ${seed}: repeated`)
            for (const round of rounds) {
                for (const latex of [round.integral, round.change, ...round.options, ...round.worked]) renders(latex)
                assert.equal(new Set(round.options).size, 3, round.integral)
                const original = simpson(round.original.fn, round.original.a, round.original.b)
                round.integrals.forEach((item, index) => {
                    if (index === round.answer) assert.ok(close(value(item), original), `${round.integral} → ${round.options[index]}: ${value(item)} ≠ ${original}`)
                    else assert.ok(!close(value(item), original, 1e-3), `${round.integral}: ${round.options[index]} is right too`)
                })
            }
        }
    }
})

test('mugatua batx2 z games · differentiate the integral function: F′ is the right option, numerically', () => {
    const points = [0.45, 0.8, 1.3]
    for (const level of [0, 1, 2]) {
        for (const seed of SEEDS.slice(0, 30)) {
            const rounds = createDeriveRounds(createRandom(seed), level)
            assert.equal(rounds.length, DERIVE_ROUNDS)
            for (const round of rounds) {
                for (const latex of [round.F, round.worked, ...round.options]) renders(latex)
                assert.equal(new Set(round.options).size, 3, round.F)
                const F = (x: number) => simpson(round.f, round.low(x), round.high(x), 600)
                for (const x of points) {
                    const d = (F(x + 1e-4) - F(x - 1e-4)) / 2e-4
                    assert.ok(close(d, round.fns[round.answer](x), 1e-3), `${round.F} at ${x}: ${d} ≠ ${round.fns[round.answer](x)}`)
                }
                round.fns.forEach((fn, index) => {
                    if (index !== round.answer) assert.ok(points.some((x) => !close(fn(x), round.fns[round.answer](x), 1e-3)), `${round.F}: ${round.options[index]} is right too`)
                })
            }
        }
    }
})

test('mugatua batx2 z games · detective: every mistake makes a case, and the texts are in four languages', () => {
    assert.equal(BACH2_DEFINITE_DETECTIVE_ERRORS.length, 9)
    checkTexts([...Object.values(bach2DefiniteDetectiveNames), ...Object.values(bach2DefiniteDetectiveTips)])
    const seen = new Set<string>()
    for (const level of [0, 1, 2]) {
        for (const seed of SEEDS.slice(0, 30)) {
            const cases = createBach2DefiniteDetectiveCases(createRandom(seed), level)
            assert.equal(cases.length, BACH2_DEFINITE_DETECTIVE_CASES)
            for (const item of cases) {
                seen.add(item.error)
                checkTexts([item.problem, ...item.lines.map((line) => line.label)])
                for (const latex of [...item.lines.map((line) => line.latex), item.fix]) renders(latex)
                assert.equal(item.options.length, 3)
                assert.ok(item.options.includes(item.error))
                assert.ok(item.wrong >= 0 && item.wrong < item.lines.length)
                assert.notEqual(item.right, item.reached)
            }
        }
    }
    assert.deepEqual([...seen].sort(), [...BACH2_DEFINITE_DETECTIVE_ERRORS].sort())
})

test('mugatua batx2 z games · race: one right option, the typical mistakes, and the right number', () => {
    checkTexts(Object.values(bach2DefiniteRaceErrorTips))
    const kinds = new Set<string>()
    for (let circuit = 0; circuit < BACH2_DEFINITE_RACE_CIRCUITS; circuit += 1) {
        for (const seed of SEEDS) {
            const question = generateBach2DefiniteRaceQuestion(createRandom(seed + circuit), circuit, 'easy')
            kinds.add(question.kind)
            checkTexts([question.prompt, question.solution])
            assert.equal(question.options.length, 4)
            assert.equal(question.options.filter((option) => option.correct).length, 1)
            assert.equal(new Set(question.options.map((option) => option.latex)).size, 4)
            for (const option of question.options) renders(option.latex)
            assert.equal(question.options.find((option) => option.correct)!.latex, written(question.answer))
            const m = question.meta
            const answer = question.answer.numerator / question.answer.denominator
            const expected: Record<string, () => number> = {
                barrow: () => simpson((x) => 3 * x * x, m.a, m.b),
                chord: () => simpson((x) => m.m * x - x * x, 0, m.m),
                sum: () => Array.from({ length: m.n }, (_, i) => (m.upper ? i + 1 : i) ** 2).reduce((a, b) => a + b, 0),
                mean: () => simpson(m.square ? (x) => 3 * x * x : (x) => m.k * x, 0, m.b) / m.b,
                'upper-x': () => m.q * m.q + m.p,
                'upper-square': () => {
                    const F = (x: number) => simpson((t) => m.k * t, 1, x * x, 200)
                    return (F(m.q + 1e-4) - F(m.q - 1e-4)) / 2e-4
                },
                change: () => simpson((x) => 2 * x * (x * x + 1) ** m.n, 0, 1),
                abs: () => simpson((x) => Math.abs(x - m.c), 0, m.c) + simpson((x) => Math.abs(x - m.c), m.c, m.b),
                parameter: () => Math.sqrt((2 * ((m.k * m.b * m.b) / 2)) / m.k),
                volume: () => simpson((x) => x * x, 0, m.b),
                cap: () => simpson((x) => m.n * m.n - x * x, -m.n, m.n)
            }
            assert.ok(expected[question.kind], question.kind)
            assert.ok(close(expected[question.kind](), answer, 1e-3), `${question.kind} ${JSON.stringify(m)}: ${expected[question.kind]()} ≠ ${answer}`)
        }
    }
    assert.deepEqual([...kinds].sort(), ['abs', 'barrow', 'cap', 'change', 'chord', 'mean', 'parameter', 'sum', 'upper-square', 'upper-x', 'volume'])
})

test('mugatua batx2 z games · memory: every pair is right and every board has six different pairs', () => {
    const check = (item: MemoryPair) => {
        renders(item.question)
        renders(item.answer)
        if (item.kind === 'value') {
            const breaks = item.question.includes('|') ? [item.a, ...[0, 1].filter((c) => c > item.a && c < item.b), item.b] : [item.a, item.b]
            let total = 0
            for (let i = 1; i < breaks.length; i += 1) total += simpson(item.fn, breaks[i - 1], breaks[i])
            assert.ok(close(item.factor * total, item.value), `${item.question}: ${item.factor * total} ≠ ${item.value}`)
        } else {
            for (const x of [0.5, 0.9, 1.4]) {
                const F = (u: number) => simpson(item.fn, item.low(u), item.high(u), 400)
                const d = (F(x + 1e-4) - F(x - 1e-4)) / 2e-4
                assert.ok(close(d, item.derivative(x), 1e-3), `${item.question} at ${x}: ${d} ≠ ${item.derivative(x)}`)
            }
        }
    }
    for (const item of [...VALUE_PAIRS, ...DERIVATIVE_PAIRS, ...VOLUME_PAIRS]) check(item)
    for (const level of [0, 1, 2]) {
        for (const seed of SEEDS.slice(0, 30)) {
            const board = createBach2DefiniteMemoryBoard(createRandom(seed), level)
            assert.equal(board.length, 2 * BACH2_DEFINITE_MEMORY_PAIRS)
            assert.equal(new Set(board.map((card) => card.latex)).size, board.length, `level ${level} seed ${seed}: a card repeats`)
            for (const card of board) renders(card.explain)
        }
    }
})
