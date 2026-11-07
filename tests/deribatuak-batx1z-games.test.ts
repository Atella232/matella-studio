import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import type { Tier } from '../src/features/unit-v2/games/raceCore.ts'
import { toExactDecimal, toNumber } from '../src/features/unit-v2/math/fraction.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { written } from '../src/pages/batx1-zientziak-errealak/games/race.ts'
import { BACH_DERIVATIVES_MEMORY_PAIRS, bachDerivativesMemoryLevels, createBachDerivativesMemoryBoard } from '../src/pages/batx1-zientziak-deribatuak/games/boards.ts'
import { curveSlope, curveValue } from '../src/pages/batx1-zientziak-deribatuak/games/curves.ts'
import { BACH_DERIVATIVES_DETECTIVE_CASES, bachDerivativesDetectiveLevels, bachDerivativesDetectiveNames, bachDerivativesDetectiveTips, createBachDerivativesDetectiveCases } from '../src/pages/batx1-zientziak-deribatuak/games/detective.ts'
import { bachDerivativesGameModeForPath, bachDerivativesGameProgressIds, bachDerivativesGames, bachDerivativesGameSlugs } from '../src/pages/batx1-zientziak-deribatuak/games/info.ts'
import { createMatchRounds, derivativeOf, graphLatex, graphValue, MATCH_ROUNDS } from '../src/pages/batx1-zientziak-deribatuak/games/match.ts'
import { BACH_DERIVATIVES_RACE_CIRCUITS, bachDerivativesRaceErrorTips, checkBachDerivativesPitAnswer, generateBachDerivativesRaceQuestion } from '../src/pages/batx1-zientziak-deribatuak/games/race.ts'
import { createSlopeRounds, SLOPE_ROUNDS } from '../src/pages/batx1-zientziak-deribatuak/games/slopes.ts'
import { createTangentRounds, TANGENT_LIMIT, TANGENT_ROUNDS, tangentLatex } from '../src/pages/batx1-zientziak-deribatuak/games/tangent.ts'
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

/** The slope of a function at x, worked out numerically */
const slopeOf = (fn: (x: number) => number, x: number) => (fn(x + 1e-6) - fn(x - 1e-6)) / 2e-6

test('deribatuak batx1 z games: the hub, its levels and progress ids', () => {
    assert.deepEqual(bachDerivativesGames.map((game) => game.id), ['race', 'slopes', 'match', 'tangent', 'detective', 'memory'])
    assert.equal(new Set(bachDerivativesGameProgressIds).size, bachDerivativesGameProgressIds.length)
    for (const id of bachDerivativesGameProgressIds) assert.ok(id >= 110401 && id <= 110899, `${id}`)
    const stages = ['rate', 'derivability', 'function', 'rules', 'elementary']
    for (const game of bachDerivativesGames) {
        assert.ok(game.levels.length >= 3, game.id)
        for (const level of game.levels) assert.ok(stages.includes(level.stage), `${game.id}: ${level.stage}`)
        checkTexts([game.title, game.tagline, game.skills, ...game.levels.flatMap((level) => [level.title, level.description])])
        assert.equal(bachDerivativesGameModeForPath(`/matematika/batx1-zientziak/derivadas/jokuak/${bachDerivativesGameSlugs[game.id]}`), game.id)
    }
    assert.equal(bachDerivativesGameModeForPath('/matematika/batx1-zientziak/derivadas/jokuak'), 'hub')
})

test('deribatuak batx1 z games: every race question has one right option, worked out from its numbers', () => {
    const kinds = new Set<string>()
    for (let circuit = 0; circuit < BACH_DERIVATIVES_RACE_CIRCUITS; circuit += 1) {
        for (const tier of [0, 1, 2] as Tier[]) {
            for (let seed = 1; seed <= 60; seed += 1) {
                const question = generateBachDerivativesRaceQuestion(createRandom(seed * 7919 + circuit * 31 + tier), circuit, tier)
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
                assert.equal(checkBachDerivativesPitAnswer(question, typed), 'correct', `${question.kind}: ${typed}`)
                const { meta: m } = question
                const value = toNumber(question.answer)
                const expected: Record<string, () => number> = {
                    tvm: () => ((m.q * m.q + m.b * m.q) - (m.p * m.p + m.b * m.p)) / (m.q - m.p),
                    point: () => slopeOf((x) => m.c * x * x + m.b * x, m.a),
                    'tangent-n': () => m.a * m.a + m.c - m.a * slopeOf((x) => x * x + m.c, m.a),
                    'one-sided': () => slopeOf((x) => x * x, m.t),
                    'join-k': () => m.t * m.t - m.m * m.t,
                    'smooth-m': () => slopeOf((x) => x * x, m.t),
                    power: () => slopeOf((x) => x ** m.n, m.a),
                    root: () => slopeOf((x) => m.k * Math.sqrt(x), m.c * m.c),
                    polynomial: () => slopeOf((x) => m.a * x ** 3 + m.b * x * x + m.c * x + m.d, 1),
                    product: () => slopeOf((x) => (x + m.p) * (x + m.q), m.a),
                    quotient: () => slopeOf((x) => (x + m.p) / (x + m.q), m.a),
                    chain: () => slopeOf((x) => (m.k * x + m.c) ** m.n, 0),
                    exp: () => slopeOf((x) => Math.exp(m.k * x) + m.m * x, 0),
                    log: () => slopeOf((x) => Math.log(x * x + m.c), m.a),
                    trig: () => slopeOf((x) => m.a * Math.sin(m.k * x) + m.b * Math.cos(x), 0)
                }
                assert.ok(expected[question.kind], `no check for ${question.kind}`)
                assert.ok(Math.abs(value - expected[question.kind]()) < 1e-3, `${question.kind}: ${value} ≠ ${expected[question.kind]()}`)
                for (const option of question.options.filter((item) => !item.correct)) assert.ok(bachDerivativesRaceErrorTips[option.error!], `${question.kind}: ${option.error}`)
            }
        }
    }
    assert.equal(kinds.size, 15)
    checkTexts(Object.values(bachDerivativesRaceErrorTips))
})

test('deribatuak batx1 z games: ¿qué pendiente? has exactly one right point', () => {
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 60; seed += 1) {
            const rounds = createSlopeRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, SLOPE_ROUNDS, `level ${level} seed ${seed}`)
            for (const round of rounds) {
                assert.equal(round.xs.length, 3)
                assert.deepEqual(round.xs, [...round.xs].sort((p, q) => p - q))
                for (const x of round.xs) assert.ok(Math.abs(curveValue(round.curve, x)) <= 3.5, `${x}`)
                const slopes = round.xs.map((x) => curveSlope(round.curve, x))
                // The curve's slope is its derivative
                for (const x of round.xs) assert.ok(Math.abs(slopeOf((value) => curveValue(round.curve, value), x) - curveSlope(round.curve, x)) < 1e-4)
                const fits = (slope: number, index: number) => {
                    switch (round.question) {
                        case 'zero': return slope === 0
                        case 'positive': return slope > 0
                        case 'negative': return slope < 0
                        case 'greatest': return slope === Math.max(...slopes)
                        case 'smallest': return slope === Math.min(...slopes)
                        case 'parallel': return round.line !== null && slope === round.line[0] && index >= 0
                    }
                }
                const right = slopes.map((slope, index) => fits(slope, index))
                assert.equal(right.filter(Boolean).length, 1, `${round.question}: ${slopes.join(' ')}`)
                assert.ok(right[round.answer], round.question)
                if (level === 0) assert.ok(['zero', 'positive', 'negative'].includes(round.question))
                if (level === 1) assert.ok(['greatest', 'smallest'].includes(round.question))
                if (level === 2) assert.equal(round.question, 'parallel')
                if (round.line) for (const x of round.xs) assert.ok(Math.abs(curveValue(round.curve, x) - (round.line[0] * x + round.line[1])) >= 1.5, 'the line passes near a point')
            }
        }
    }
})

test('deribatuak batx1 z games: empareja f y f′ offers the derivative once, and two graphs that are not it', () => {
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 60; seed += 1) {
            const rounds = createMatchRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, MATCH_ROUNDS, `level ${level} seed ${seed}`)
            for (const round of rounds) {
                assert.equal(round.options.length, 3)
                render(graphLatex(round.f))
                const xs = [0.5, 1.3, 2.2, 3.1]
                const isDerivative = (index: number) => xs.every((x) => Math.abs(graphValue(round.options[index], x) - slopeOf((value) => graphValue(round.f, value), x)) < 1e-4)
                assert.ok(isDerivative(round.answer), graphLatex(round.f))
                for (let index = 0; index < 3; index += 1) {
                    render(graphLatex(round.options[index]))
                    if (index !== round.answer) assert.ok(!isDerivative(index), `${graphLatex(round.f)}: ${graphLatex(round.options[index])}`)
                }
                assert.equal(graphLatex(round.options[round.answer]), graphLatex(derivativeOf(round.f)))
            }
        }
    }
})

test('deribatuak batx1 z games: tangente exacta asks for whole m and n that really make the tangent', () => {
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 60; seed += 1) {
            const rounds = createTangentRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, TANGENT_ROUNDS, `level ${level} seed ${seed}`)
            for (const round of rounds) {
                render(round.latex)
                render(tangentLatex(round.m, round.n))
                assert.ok(Number.isInteger(round.m) && Number.isInteger(round.n))
                assert.ok(Math.abs(round.m) <= TANGENT_LIMIT && Math.abs(round.n) <= TANGENT_LIMIT)
                assert.ok(Math.abs(slopeOf(round.fn, round.a) - round.m) < 1e-4, round.latex)
                assert.ok(Math.abs(round.fn(round.a) - (round.m * round.a + round.n)) < 1e-9, round.latex)
                // The starting line y = 0 is never the answer
                assert.ok(round.m !== 0 || round.n !== 0, round.latex)
            }
        }
    }
})

test('deribatuak batx1 z games: the detective has one wrong line in every case', () => {
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 40; seed += 1) {
            const cases = createBachDerivativesDetectiveCases(createRandom(seed * 7919 + level), level)
            assert.equal(cases.length, BACH_DERIVATIVES_DETECTIVE_CASES)
            for (const item of cases) {
                assert.ok(bachDerivativesDetectiveLevels[level].includes(item.error))
                assert.ok(item.wrong >= 0 && item.wrong < item.lines.length)
                assert.ok(item.options.includes(item.error) && item.options.length === 3)
                for (const line of item.lines) render(line.latex)
                render(item.fix)
                assert.ok(!item.lines.some((line) => /\\(sin|tan)/.test(line.latex)), 'no sin or tan in a line')
                checkTexts([item.problem, ...item.lines.map((line) => line.label)])
            }
        }
    }
    checkTexts([...Object.values(bachDerivativesDetectiveNames), ...Object.values(bachDerivativesDetectiveTips)])
})

test('deribatuak batx1 z games: memory pairs are all different and drawn by KaTeX', () => {
    for (let level = 0; level < bachDerivativesMemoryLevels.length; level += 1) {
        for (let seed = 1; seed <= 60; seed += 1) {
            const cards = createBachDerivativesMemoryBoard(createRandom(seed * 7919 + level), level)
            assert.equal(cards.length, BACH_DERIVATIVES_MEMORY_PAIRS * 2)
            assert.equal(new Set(cards.map((card) => card.latex)).size, cards.length, cards.map((card) => card.latex).join(' | '))
            for (const card of cards) {
                render(card.latex)
                render(card.explain)
                assert.ok(!/\\(sin|tan)/.test(card.latex))
                assert.ok(!/(?<![\d.])1x/.test(card.latex), card.latex)
            }
        }
    }
})
