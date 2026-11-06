import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import type { Tier } from '../src/features/unit-v2/games/raceCore.ts'
import { toExactDecimal, toNumber } from '../src/features/unit-v2/math/fraction.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { written } from '../src/pages/batx1-zientziak-errealak/games/race.ts'
import { curveValue } from '../src/pages/batx1-zientziak-deribatuak/games/curves.ts'
import { BACH_APPLICATIONS_MEMORY_PAIRS, bachApplicationsMemoryLevels, createBachApplicationsMemoryBoard } from '../src/pages/batx1-zientziak-aplikazioak/games/boards.ts'
import { BACH_APPLICATIONS_DETECTIVE_CASES, bachApplicationsDetectiveLevels, bachApplicationsDetectiveNames, bachApplicationsDetectiveTips, createBachApplicationsDetectiveCases } from '../src/pages/batx1-zientziak-aplikazioak/games/detective.ts'
import { createExtremaRounds, EXTREMA_ROUNDS, pointKind, primeValue, zeroSpan } from '../src/pages/batx1-zientziak-aplikazioak/games/extrema.ts'
import { bachApplicationsGameModeForPath, bachApplicationsGameProgressIds, bachApplicationsGames, bachApplicationsGameSlugs } from '../src/pages/batx1-zientziak-aplikazioak/games/info.ts'
import { BACH_APPLICATIONS_RACE_CIRCUITS, bachApplicationsRaceErrorTips, checkBachApplicationsPitAnswer, generateBachApplicationsRaceQuestion } from '../src/pages/batx1-zientziak-aplikazioak/games/race.ts'
import { createShapeRounds, curveSecond, SHAPE_ROUNDS, shapeAt } from '../src/pages/batx1-zientziak-aplikazioak/games/shape.ts'
import { createUpdownRounds, sameChart, signChart, UPDOWN_ROUNDS, updownLatex, updownSlope, updownValue } from '../src/pages/batx1-zientziak-aplikazioak/games/updown.ts'

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
/** The second derivative at x, worked out numerically */
const bendOf = (fn: (x: number) => number, x: number) => (fn(x + 1e-3) - 2 * fn(x) + fn(x - 1e-3)) / 1e-6

test('aplikazioak batx1 z games: the hub, its levels and progress ids', () => {
    assert.deepEqual(bachApplicationsGames.map((game) => game.id), ['race', 'updown', 'extrema', 'shape', 'detective', 'memory'])
    assert.equal(new Set(bachApplicationsGameProgressIds).size, bachApplicationsGameProgressIds.length)
    for (const id of bachApplicationsGameProgressIds) assert.ok(id >= 111401 && id <= 111899, `${id}`)
    const stages = ['monotony', 'extremes', 'curvature', 'optimization', 'graphs']
    for (const game of bachApplicationsGames) {
        assert.ok(game.levels.length >= 3, game.id)
        for (const level of game.levels) assert.ok(stages.includes(level.stage), `${game.id}: ${level.stage}`)
        checkTexts([game.title, game.tagline, game.skills, ...game.levels.flatMap((level) => [level.title, level.description])])
        assert.equal(bachApplicationsGameModeForPath(`/matematika/batx1-zientziak/aplicaciones-derivada/jokuak/${bachApplicationsGameSlugs[game.id]}`), game.id)
    }
    assert.equal(bachApplicationsGameModeForPath('/matematika/batx1-zientziak/aplicaciones-derivada/jokuak'), 'hub')
})

test('aplikazioak batx1 z games: every race question has one right option, worked out from its numbers', () => {
    const kinds = new Set<string>()
    for (let circuit = 0; circuit < BACH_APPLICATIONS_RACE_CIRCUITS; circuit += 1) {
        for (const tier of [0, 1, 2] as Tier[]) {
            for (let seed = 1; seed <= 60; seed += 1) {
                const question = generateBachApplicationsRaceQuestion(createRandom(seed * 7919 + circuit * 31 + tier), circuit, tier)
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
                assert.equal(checkBachApplicationsPitAnswer(question, typed), 'correct', `${question.kind}: ${typed}`)
                const { meta: m } = question
                const value = toNumber(question.answer)
                // Where f′ is 0, found numerically on a fine grid
                const zeroOf = (fn: (x: number) => number, from: number, to: number) => {
                    let best = from
                    for (let x = from; x <= to; x += 1e-4) if (Math.abs(slopeOf(fn, x)) < Math.abs(slopeOf(fn, best))) best = x
                    return best
                }
                const expected: Record<string, () => number> = {
                    turn: () => zeroOf((x) => x * x + m.b * x + m.c, -6, 6),
                    rise: () => zeroOf((x) => x ** 3 - 3 * m.p * m.p * x, 0.5, 6),
                    // The least a with f′ ≥ 0 everywhere: the minimum of f′ without a is −b²/3
                    parameter: () => -Math.min(...Array.from({ length: 2001 }, (_, i) => -10 + i / 100).map((x) => 3 * x * x + 2 * m.b * x)),
                    'max-x': () => zeroOf((x) => x ** 3 - 3 * m.p * m.p * x + m.c, -6, -0.5),
                    'min-value': () => { const x = zeroOf((t) => t * t - 2 * m.p * t + m.q, -6, 6); return x * x - 2 * m.p * x + m.q },
                    second: () => bendOf((t) => t ** 3 + m.b * t * t + m.c * t, m.a),
                    'inflection-x': () => { let best = -5; for (let x = -5; x <= 5; x += 1e-3) if (Math.abs(bendOf((t) => t ** 3 + 3 * m.p * t * t + m.c * t, x)) < Math.abs(bendOf((t) => t ** 3 + 3 * m.p * t * t + m.c * t, best))) best = x; return best },
                    'inflection-y': () => { const x = zeroOf((t) => 3 * t * t - 6 * m.p * t, -5, 5); return x ** 3 - 3 * m.p * x * x + m.q },
                    'inflection-a': () => -3 * m.p,
                    product: () => (m.s / 2) * (m.s / 2),
                    absolute: () => Math.max(...Array.from({ length: 1001 }, (_, i) => (i / 1000) * m.b).map((x) => x * x - 2 * m.p * x)),
                    profit: () => Math.max(...Array.from({ length: 4001 }, (_, i) => i / 100).map((x) => -x * x + 2 * m.p * x - m.q)),
                    // Checked against the real changes of sign in the next test
                    count: () => [2, 0, 0, 1, 3, 1, 1, 2][m.index],
                    asymptote: () => m.a,
                    'exp-min': () => zeroOf((x) => x * Math.exp(m.k * x), -3, 1)
                }
                assert.ok(expected[question.kind], `no check for ${question.kind}`)
                assert.ok(Math.abs(value - expected[question.kind]()) < 2e-3, `${question.kind}: ${value} ≠ ${expected[question.kind]()}`)
                for (const option of question.options.filter((item) => !item.correct)) assert.ok(bachApplicationsRaceErrorTips[option.error!], `${question.kind}: ${option.error}`)
            }
        }
    }
    assert.equal(kinds.size, 15)
    checkTexts(Object.values(bachApplicationsRaceErrorTips))
})

test('aplikazioak batx1 z games: the extrema counted in the race are real', () => {
    // f′ of each function of the «how many extrema» question, and the changes of sign it really has
    const derivatives: Array<(x: number) => number> = [
        (x) => 3 * x * x - 3, (x) => 3 * x * x + 3, (x) => 3 * x * x, (x) => 4 * x ** 3,
        (x) => 4 * x ** 3 - 4 * x, (x) => 4 * x ** 3 - 12 * x * x, (x) => 12 * x ** 3 - 12 * x * x, (x) => (2 * x + x * x) * Math.exp(x)
    ]
    const expected = [2, 0, 0, 1, 3, 1, 1, 2]
    derivatives.forEach((derivative, index) => {
        let changes = 0
        let previous = Math.sign(derivative(-5.0003))
        for (let x = -5; x <= 5; x += 0.001) {
            const sign = Math.sign(derivative(x))
            if (sign !== 0 && previous !== 0 && sign !== previous) changes += 1
            if (sign !== 0) previous = sign
        }
        assert.equal(changes, expected[index], `function ${index}`)
    })
})

test('aplikazioak batx1 z games: sube o baja offers f once, and two graphs with another sign chart', () => {
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 40; seed += 1) {
            const rounds = createUpdownRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, UPDOWN_ROUNDS)
            for (const round of rounds) {
                assert.equal(round.options.length, 3)
                assert.equal(round.options.filter((option) => sameChart(option, round.f)).length, 1)
                assert.ok(sameChart(round.options[round.answer], round.f))
                // The slope is the derivative of the curve, and the chart matches it
                for (const x of [-3.5, -2.5, -0.7, 0.4, 1.6, 2.7]) {
                    if (round.f.kind === 'hyperbola' && Math.abs(x - round.f.h) < 0.3) continue
                    assert.ok(Math.abs(updownSlope(round.f, x) - slopeOf((t) => updownValue(round.f, t), x)) < 1e-4, `${round.f.kind} at ${x}`)
                }
                for (const piece of signChart(round.f).pieces) assert.equal(Math.sign(updownSlope(round.f, (piece.from + piece.to) / 2)), piece.sign)
                render(`f(x)=${updownLatex(round.f)}`)
                // The formula draws the same curve
                if (level === 2) assert.ok(['parabola', 'cubic', 'flat', 'hyperbola'].includes(round.f.kind))
            }
        }
    }
})

test('aplikazioak batx1 z games: caza los extremos asks for a point that is just one of the three', () => {
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 40; seed += 1) {
            const rounds = createExtremaRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, EXTREMA_ROUNDS)
            for (const round of rounds) {
                const kinds = round.xs.map((x) => pointKind(round, x))
                assert.equal(kinds[round.answer], round.question)
                assert.equal(kinds.filter((kind) => kind === round.question).length, 1)
                // Around the zeros f′ fills the plane without leaving it, and every bump between zeros is well above the axis
                const [from, to] = zeroSpan(round.roots)
                for (let x = from; x <= to; x += 0.05) assert.ok(Math.abs(primeValue(round, x)) <= 3 + 1e-9)
                const zeros = round.roots.map((root) => root.x).sort((p, q) => p - q)
                for (let index = 0; index + 1 < zeros.length; index += 1) assert.ok(Math.abs(primeValue(round, (zeros[index] + zeros[index + 1]) / 2)) > 0.5, `flat bump in ${JSON.stringify(round.roots)}`)
                // A maximum is where f′ goes from + to −, checked a little further away
                const x = round.xs[round.answer]
                if (round.question === 'maximum') assert.ok(primeValue(round, x - 0.2) > 0 && primeValue(round, x + 0.2) < 0)
                if (round.question === 'minimum') assert.ok(primeValue(round, x - 0.2) < 0 && primeValue(round, x + 0.2) > 0)
                if (round.question === 'flat') assert.ok(primeValue(round, x - 0.2) * primeValue(round, x + 0.2) > 0)
            }
            if (level === 2) assert.ok(rounds.some((round) => round.roots.some((root) => root.m === 2)))
        }
    }
})

test('aplikazioak batx1 z games: ¿∪ o ∩? reads f″ right, and its traps are there', () => {
    let traps = 0
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 40; seed += 1) {
            const rounds = createShapeRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, SHAPE_ROUNDS)
            for (const round of rounds) {
                if (round.kind === 'graph') {
                    // f″ of the drawn curve, worked out numerically
                    const second = (x: number) => bendOf((u) => curveValue(round.curve, u), x)
                    assert.ok(Math.abs(second(round.a) - curveSecond(round.curve, round.a)) < 1e-2)
                    assert.equal(shapeAt((x) => curveSecond(round.curve, x), round.a), round.answer)
                    assert.ok(Math.abs(curveValue(round.curve, round.a)) <= 3.5)
                    continue
                }
                render(round.latex)
                if (round.secondLatex) render(round.secondLatex)
                assert.equal(round.secondOf(round.a), round.second)
                assert.equal(shapeAt(round.secondOf, round.a), round.answer)
                // f″ = 0 without a change of sign is ∪, not an inflection
                if (round.second === 0 && round.answer !== 'inflection') traps += 1
            }
        }
    }
    assert.ok(traps > 10, `only ${traps} traps`)
})

test('aplikazioak batx1 z games: the detective has one wrong line in every case', () => {
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 40; seed += 1) {
            const cases = createBachApplicationsDetectiveCases(createRandom(seed * 7919 + level), level)
            assert.equal(cases.length, BACH_APPLICATIONS_DETECTIVE_CASES)
            for (const item of cases) {
                assert.ok(bachApplicationsDetectiveLevels[level].includes(item.error))
                assert.ok(item.wrong >= 0 && item.wrong < item.lines.length)
                assert.ok(item.options.includes(item.error) && item.options.length === 3)
                for (const line of item.lines) render(line.latex)
                render(item.fix)
                assert.ok(!item.lines.some((line) => /\(\(/.test(line.latex)), `double brackets: ${item.lines.map((line) => line.latex).join(' | ')}`)
                assert.ok(!item.lines.some((line) => /\\text/.test(line.latex)), 'no words in a line')
                checkTexts([item.problem, ...item.lines.map((line) => line.label)])
            }
        }
    }
    checkTexts([...Object.values(bachApplicationsDetectiveNames), ...Object.values(bachApplicationsDetectiveTips)])
})

test('aplikazioak batx1 z games: memory pairs are all different and drawn by KaTeX', () => {
    for (let level = 0; level < bachApplicationsMemoryLevels.length; level += 1) {
        for (let seed = 1; seed <= 60; seed += 1) {
            const cards = createBachApplicationsMemoryBoard(createRandom(seed * 7919 + level), level)
            assert.equal(cards.length, BACH_APPLICATIONS_MEMORY_PAIRS * 2)
            assert.equal(new Set(cards.map((card) => card.latex)).size, cards.length, cards.map((card) => card.latex).join(' | '))
            for (const card of cards) {
                render(card.latex)
                render(card.explain)
                assert.ok(!/(?<![\d.])1x/.test(card.latex), card.latex)
            }
        }
    }
})
