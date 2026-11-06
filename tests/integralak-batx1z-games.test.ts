import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import type { Tier } from '../src/features/unit-v2/games/raceCore.ts'
import { toExactDecimal, toNumber } from '../src/features/unit-v2/math/fraction.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { written } from '../src/pages/batx1-zientziak-errealak/games/race.ts'
import { graphLatex, graphValue } from '../src/pages/batx1-zientziak-deribatuak/games/match.ts'
import { localize } from '../src/pages/batx1-zientziak-funtzioak/text.ts'
import { ADJUST_ROUNDS, adjustFunctions, adjustOptionLatex, createAdjustRounds } from '../src/pages/batx1-zientziak-integralak/games/adjust.ts'
import { BACH_INTEGRALS_MEMORY_PAIRS, bachIntegralsMemoryLevels, createBachIntegralsMemoryBoard } from '../src/pages/batx1-zientziak-integralak/games/boards.ts'
import { BACH_INTEGRALS_DETECTIVE_CASES, bachIntegralsDetectiveLevels, bachIntegralsDetectiveNames, bachIntegralsDetectiveTips, createBachIntegralsDetectiveCases } from '../src/pages/batx1-zientziak-integralak/games/detective.ts'
import { createEstimateRounds, ESTIMATE_ROUNDS, estimateArea, estimateIntegral, estimateValue } from '../src/pages/batx1-zientziak-integralak/games/estimate.ts'
import { bachIntegralsGameModeForPath, bachIntegralsGameProgressIds, bachIntegralsGames, bachIntegralsGameSlugs } from '../src/pages/batx1-zientziak-integralak/games/info.ts'
import { createPrimitiveRounds, PRIMITIVE_ROUNDS } from '../src/pages/batx1-zientziak-integralak/games/primitive.ts'
import { BACH_INTEGRALS_RACE_CIRCUITS, bachIntegralsRaceErrorTips, checkBachIntegralsPitAnswer, generateBachIntegralsRaceQuestion } from '../src/pages/batx1-zientziak-integralak/games/race.ts'

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

/** The slope of a function at x, worked out numerically */
const slopeOf = (fn: (x: number) => number, x: number) => (fn(x + 1e-6) - fn(x - 1e-6)) / 2e-6
/** The integral of f from a to b, worked out numerically (Simpson) */
function simpson(fn: (x: number) => number, a: number, b: number) {
    const n = 2000
    const h = (b - a) / n
    let total = fn(a) + fn(b)
    for (let i = 1; i < n; i += 1) total += fn(a + i * h) * (i % 2 === 0 ? 2 : 4)
    return (total * h) / 3
}
/** Formulas shared by every language (memory cards, detective lines) cannot carry names that Spanish writes differently */
const sharedName = /\\(?:sin|tan|arcsin|arctan)(?![a-z])/

test('integralak batx1 z games: the hub, its levels and progress ids', () => {
    assert.deepEqual(bachIntegralsGames.map((game) => game.id), ['race', 'primitive', 'adjust', 'estimate', 'detective', 'memory'])
    assert.equal(new Set(bachIntegralsGameProgressIds).size, bachIntegralsGameProgressIds.length)
    for (const id of bachIntegralsGameProgressIds) assert.ok(id >= 112401 && id <= 112899, `${id}`)
    const stages = ['primitives', 'immediate', 'compound', 'definite', 'areas']
    for (const game of bachIntegralsGames) {
        assert.ok(game.levels.length >= 3, game.id)
        for (const level of game.levels) assert.ok(stages.includes(level.stage), `${game.id}: ${level.stage}`)
        checkTexts([game.title, game.tagline, game.skills, ...game.levels.flatMap((level) => [level.title, level.description])])
        assert.equal(bachIntegralsGameModeForPath(`/matematika/batx1-zientziak/integrales/jokuak/${bachIntegralsGameSlugs[game.id]}`), game.id)
    }
    assert.equal(bachIntegralsGameModeForPath('/matematika/batx1-zientziak/integrales/jokuak'), 'hub')
})

test('integralak batx1 z games: every race question has one right option, worked out from its numbers', () => {
    const kinds = new Set<string>()
    for (let circuit = 0; circuit < BACH_INTEGRALS_RACE_CIRCUITS; circuit += 1) {
        for (const tier of [0, 1, 2] as Tier[]) {
            for (let seed = 1; seed <= 60; seed += 1) {
                const question = generateBachIntegralsRaceQuestion(createRandom(seed * 7919 + circuit * 31 + tier), circuit, tier)
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
                assert.equal(checkBachIntegralsPitAnswer(question, typed), 'correct', `${question.kind}: ${typed}`)
                const { meta: m } = question
                const value = toNumber(question.answer)
                // Each answer checked against the calculus itself: slopes and numerical integrals
                const expected: Record<string, () => number> = {
                    point: () => m.q - (m.p * m.p + m.b * m.p),
                    // The m with (xᵐ/m)′ = xⁿ: the slope at x = 1.5 divided by 1.5ⁿ is 1 only for m = n + 1
                    exponent: () => [-6, -5, -4, -3, -2, -1, 1, 2, 3, 4, 5, 6, 7, 8].find((k) => Math.abs(slopeOf((x) => x ** k / k, 1.5) - 1.5 ** m.n) < 1e-4)!,
                    coefficient: () => simpson((x) => m.c * x ** m.n, 0, 1),
                    exp: () => m.q - Math.exp(0),
                    log: () => m.q + simpson((x) => m.a / x, 1, Math.E),
                    arctan: () => { const p = [-4, -3, -2, -1, 1, 2, 3, 4].find((k) => Math.abs((1.3 + k) ** 2 + 1 - (1.3 ** 2 + 2 * m.p * 1.3 + m.p * m.p + 1)) < 1e-9); return p! },
                    chain: () => slopeOf((x) => x * (x * x + m.b) ** m.n, 1) === 0 ? 0 : simpson((x) => x * (x * x + m.b) ** m.n, 0, 1) / ((1 + m.b) ** (m.n + 1) - m.b ** (m.n + 1)),
                    'exp-chain': () => simpson((x) => Math.exp(m.a * x), 0, 1) / (Math.exp(m.a) - 1),
                    'log-chain': () => simpson((x) => (m.c * x) / (x * x + m.b), 0, 1) / (Math.log(1 + m.b) - Math.log(m.b)),
                    'line-integral': () => simpson((x) => 2 * x + m.b, m.p, m.q),
                    cube: () => simpson((x) => 3 * x * x, 0, m.p),
                    split: () => -(m.u + m.v),
                    cap: () => simpson((x) => m.c * m.c - x * x, -m.c, m.c),
                    between: () => simpson((x) => m.p * x - x * x, 0, m.p),
                    cross: () => simpson((x) => Math.abs(x - m.p), 0, 2 * m.p)
                }
                assert.ok(expected[question.kind], `no check for ${question.kind}`)
                assert.ok(Math.abs(value - expected[question.kind]()) < 2e-3, `${question.kind}: ${value} ≠ ${expected[question.kind]()}`)
                for (const option of question.options.filter((item) => !item.correct)) assert.ok(bachIntegralsRaceErrorTips[option.error!], `${question.kind}: ${option.error}`)
            }
        }
    }
    assert.equal(kinds.size, 15)
    checkTexts(Object.values(bachIntegralsRaceErrorTips))
})

test('integralak batx1 z games: ¿de quién es la primitiva? — only the right graph has f as its slope', () => {
    const xs = [-2.5, -1.5, -0.5, 0.5, 1.5, 2.5]
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 40; seed += 1) {
            const rounds = createPrimitiveRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, PRIMITIVE_ROUNDS)
            for (const round of rounds) {
                assert.equal(new Set(round.options.map(graphLatex)).size, 3)
                // Where f exists (1/x and ln x only for x > 0)
                const points = xs.filter((x) => Number.isFinite(graphValue(round.f, x)) && round.options.every((option) => Number.isFinite(graphValue(option, x - 1e-5)) && Number.isFinite(graphValue(option, x + 1e-5))))
                assert.ok(points.length >= 3)
                round.options.forEach((option, index) => {
                    const gaps = points.map((x) => Math.abs(slopeOf((t) => graphValue(option, t), x) - graphValue(round.f, x)))
                    if (index === round.answer) assert.ok(gaps.every((gap) => gap < 1e-4), `${graphLatex(option)} is not an antiderivative of ${graphLatex(round.f)}`)
                    // A wrong option is not F moved up or down: its slope differs from f somewhere
                    else assert.ok(gaps.some((gap) => gap > 0.2), `${graphLatex(option)} is also an antiderivative of ${graphLatex(round.f)}`)
                })
                for (const graph of [round.f, ...round.options]) render(`y=${graphLatex(graph)}`)
            }
        }
    }
})

test('integralak batx1 z games: ajusta la constante — only the right number gives the integrand back', () => {
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 40; seed += 1) {
            const rounds = createAdjustRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, ADJUST_ROUNDS)
            for (const round of rounds) {
                const { integrand, core } = adjustFunctions(round.spec)
                assert.equal(new Set(round.factors).size, 3)
                round.factors.forEach((factor, index) => {
                    const gaps = [0.3, 0.7, 1.1].map((x) => Math.abs(slopeOf((t) => factor * core(t), x) - integrand(x)))
                    if (index === round.answer) assert.ok(gaps.every((gap) => gap < 1e-4 * Math.max(1, Math.abs(integrand(1.1)))), `${adjustOptionLatex(round, index)} for ${round.integrand}`)
                    else assert.ok(gaps.some((gap) => gap > 1e-3), `${adjustOptionLatex(round, index)} is also right for ${round.integrand}`)
                    for (const language of languages) render(localize(language, adjustOptionLatex(round, index)), language)
                })
                for (const language of languages) render(localize(language, `\\int ${round.integrand}\\,dx`), language)
                render(round.u)
            }
        }
    }
})

test('integralak batx1 z games: área a ojo — the right number is the region, the others are far from it', () => {
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 40; seed += 1) {
            const rounds = createEstimateRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, ESTIMATE_ROUNDS)
            for (const round of rounds) {
                const f = (x: number) => estimateValue(round.curve, x)
                const integral = estimateIntegral(round.curve, round.a, round.b)
                assert.ok(Math.abs(integral - simpson(f, round.a, round.b)) < 1e-6)
                assert.ok(Math.abs(estimateArea(round.curve, round.a, round.b) - simpson((x) => Math.abs(f(x)), round.a, round.b)) < 1e-3)
                assert.equal(new Set(round.options.map((value) => Math.round(value * 1e6))).size, 3)
                assert.equal(round.options[round.answer], integral)
                if (round.question === 'area') {
                    // The region is above the axis, so the area is the integral; the wrong numbers are at least ×1.4 away
                    for (let x = round.a; x <= round.b + 1e-9; x += 0.05) assert.ok(f(x) >= -1e-9, `${JSON.stringify(round.curve)} at ${x}`)
                    for (const value of round.options.filter((_, index) => index !== round.answer)) assert.ok(Math.max(value, integral) / Math.min(value, integral) >= 1.4 - 1e-9, `${value} vs ${integral}`)
                } else {
                    // The options are the integral, the area and the integral with the wrong sign
                    assert.deepEqual([...round.options].sort((u, v) => u - v), [integral, estimateArea(round.curve, round.a, round.b), -integral].sort((u, v) => u - v))
                }
                // Everything stays on the 8 × 8 plane
                assert.ok(round.a >= -4 && round.b <= 4)
                for (let x = round.a; x <= round.b + 1e-9; x += 0.05) assert.ok(Math.abs(f(x)) <= 4 + 1e-9, `${JSON.stringify(round.curve)} at ${x}`)
            }
            // The right number is not always the middle one
        }
    }
    const middles = Array.from({ length: 40 }, (_, seed) => createEstimateRounds(createRandom(seed + 1), 0)).flat().map((round) => [...round.options].sort((u, v) => u - v).indexOf(round.options[round.answer]))
    assert.ok(new Set(middles).size === 3, 'the right number sits in every place')
})

test('integralak batx1 z games: the detective has one wrong line in every case', () => {
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 40; seed += 1) {
            const cases = createBachIntegralsDetectiveCases(createRandom(seed * 7919 + level), level)
            assert.equal(cases.length, BACH_INTEGRALS_DETECTIVE_CASES)
            for (const item of cases) {
                assert.ok(bachIntegralsDetectiveLevels[level].includes(item.error))
                assert.ok(item.wrong >= 0 && item.wrong < item.lines.length)
                assert.ok(item.options.includes(item.error) && item.options.length === 3)
                for (const line of item.lines) {
                    render(line.latex)
                    assert.ok(!sharedName.test(line.latex), line.latex)
                }
                render(item.fix)
                assert.ok(!sharedName.test(item.fix), item.fix)
                assert.ok(!item.lines.some((line) => /\(\(/.test(line.latex)), `double brackets: ${item.lines.map((line) => line.latex).join(' | ')}`)
                assert.ok(!item.lines.some((line) => /\\text/.test(line.latex)), 'no words in a line')
                checkTexts([item.problem, ...item.lines.map((line) => line.label)])
            }
        }
    }
    checkTexts([...Object.values(bachIntegralsDetectiveNames), ...Object.values(bachIntegralsDetectiveTips)])
})

test('integralak batx1 z games: memory pairs are all different and drawn by KaTeX', () => {
    for (let level = 0; level < bachIntegralsMemoryLevels.length; level += 1) {
        for (let seed = 1; seed <= 60; seed += 1) {
            const cards = createBachIntegralsMemoryBoard(createRandom(seed * 7919 + level), level)
            assert.equal(cards.length, BACH_INTEGRALS_MEMORY_PAIRS * 2)
            assert.equal(new Set(cards.map((card) => card.latex)).size, cards.length, cards.map((card) => card.latex).join(' | '))
            for (const card of cards) {
                render(card.latex)
                render(card.explain)
                assert.ok(!sharedName.test(card.latex) && !sharedName.test(card.explain), card.latex)
                assert.ok(!/(?<![\d.])1x/.test(card.latex), card.latex)
            }
        }
    }
})
