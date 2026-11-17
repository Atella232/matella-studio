import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import type { Tier } from '../src/features/unit-v2/games/raceCore.ts'
import { toExactDecimal, toNumber } from '../src/features/unit-v2/math/fraction.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { written } from '../src/pages/batx1-zientziak-errealak/games/race.ts'

import { gizAlgebraGameModeForPath, gizAlgebraGameProgressIds, gizAlgebraGames, gizAlgebraGameSlugs } from '../src/pages/batx1-gizarte-aljebra/games/info.ts'
import { checkGizAlgebraPitAnswer, generateGizAlgebraRaceQuestion, GIZ_ALGEBRA_RACE_CIRCUITS, gizAlgebraRaceErrorTips } from '../src/pages/batx1-gizarte-aljebra/games/race.ts'
import { BOX_ROUNDS, boxDeterminant, createBoxRounds, solveBox } from '../src/pages/batx1-gizarte-aljebra/games/boxOffice.ts'
import { createGainRounds, GAIN_ROUNDS, gainBreakEven, gainProfit, gainVerdict } from '../src/pages/batx1-gizarte-aljebra/games/gain.ts'
import { createGizAlgebraDetectiveCases, GIZ_ALGEBRA_DETECTIVE_CASES, gizAlgebraDetectiveLevels, gizAlgebraDetectiveNames, gizAlgebraDetectiveTips } from '../src/pages/batx1-gizarte-aljebra/games/detective.ts'
import { createGizAlgebraMemoryBoard, GIZ_ALGEBRA_MEMORY_PAIRS, gizAlgebraMemoryLevels } from '../src/pages/batx1-gizarte-aljebra/games/boards.ts'

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
        if (/[a-zA-Z]{4}/.test(text.es.replace(/\$[^$]+\$/g, ''))) assert.ok(/[؀-ۿ]/.test(text.ar), `not Arabic: ${text.ar}`)
        assert.ok(!/\d(?:ri|ren|rekin|ekin|ek|ak|ra|tik|z|ei|en|k)(?![a-zA-Z])/.test(text.eu.replace(/\$[^$]+\$/g, '')), text.eu)
        assert.ok(!/\$(?:ri|ren|rekin|z|ra|tik|ei|ko|an)(?![a-zA-Z])/.test(text.eu), text.eu)
    }
}

test('aljebra batx1 g games: the hub, its levels and progress ids', () => {
    assert.deepEqual(gizAlgebraGames.map((game) => game.id), ['race', 'box', 'gain', 'detective', 'memory', 'zero', 'valid', 'signs'])
    assert.equal(new Set(gizAlgebraGameProgressIds).size, gizAlgebraGameProgressIds.length)
    for (const id of gizAlgebraGameProgressIds) assert.ok(id >= 132401 && id <= 132899, `${id}`)
    const stages = ['polynomials', 'equations', 'systems', 'inequalities', 'economy']
    for (const game of gizAlgebraGames) {
        assert.ok(game.levels.length >= 3, game.id)
        for (const level of game.levels) assert.ok(stages.includes(level.stage), `${game.id}: ${level.stage}`)
        checkTexts([game.title, game.tagline, game.skills, ...game.levels.flatMap((level) => [level.title, level.description])])
        assert.equal(gizAlgebraGameModeForPath(`/matematika/batx1-gizarte/algebra/jokuak/${gizAlgebraGameSlugs[game.id]}`), game.id)
    }
    assert.equal(gizAlgebraGameModeForPath('/matematika/batx1-gizarte/algebra/jokuak'), 'hub')
    assert.deepEqual(gizAlgebraGames[0].levels.map((level) => level.stage), stages)
})

test('aljebra batx1 g games: every race question has one right option, worked out from its numbers', () => {
    const kinds = new Set<string>()
    for (let circuit = 0; circuit < GIZ_ALGEBRA_RACE_CIRCUITS; circuit += 1) {
        for (const tier of [0, 1, 2] as Tier[]) {
            for (let seed = 1; seed <= 60; seed += 1) {
                const question = generateGizAlgebraRaceQuestion(createRandom(seed * 7919 + circuit * 31 + tier), circuit, tier)
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
                assert.equal(checkGizAlgebraPitAnswer(question, typed), 'correct', `${question.kind}: ${typed}`)
                const { meta } = question
                const value = toNumber(question.answer)
                const poly = (x: number) => x ** 3 + meta.p * x * x + meta.q * x + meta.r
                const expected: Record<string, () => number> = {
                    remainder: () => poly(meta.a),
                    root: () => (meta.r ** 3 + meta.b * meta.r ** 2 + meta.c * meta.r + meta.d === 0 ? meta.r : NaN),
                    fraction: () => (meta.v * meta.v - meta.a * meta.a) / (meta.v - meta.a),
                    biquadratic: () => (meta.negative ? meta.m : Math.max(meta.m, meta.n)),
                    radical: () => (Math.sqrt(meta.t + meta.a) === meta.t - meta.b ? meta.t : NaN),
                    exponential: () => meta.power - meta.shift,
                    log: () => meta.m / meta.k,
                    prices: () => (meta.takings - meta.a * meta.total) / (meta.b - meta.a),
                    'sum-product': () => (meta.s + Math.sqrt(meta.s * meta.s - 4 * meta.p)) / 2,
                    triangular: () => meta.total - (meta.middle - meta.k * meta.z) - meta.z,
                    greatest: () => Math.ceil((meta.a - meta.c) / meta.k) - 1,
                    'count-quadratic': () => meta.b - meta.a + 1,
                    'count-rational': () => meta.a + meta.b,
                    'break-even': () => meta.fixed / (meta.price - meta.cost),
                    profit: () => meta.price * meta.units - meta.fixed - meta.cost * meta.units,
                    equilibrium: () => (meta.a + meta.d) / (meta.b + meta.c)
                }
                assert.ok(expected[question.kind], `no check for ${question.kind}`)
                assert.ok(Math.abs(value - expected[question.kind]()) < 1e-9, `${question.kind}: ${value} ≠ ${expected[question.kind]()}`)
            }
        }
    }
    assert.equal(kinds.size, 16)
    checkTexts(Object.values(gizAlgebraRaceErrorTips))
})

test('aljebra batx1 g games: cuadra la taquilla', () => {
    for (let level = 0; level < 3; level += 1) {
        const asked = new Set<number>()
        for (let seed = 1; seed <= 80; seed += 1) {
            const rounds = createBoxRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, BOX_ROUNDS)
            for (const round of rounds) {
                assert.equal(round.prices.length, level === 0 ? 2 : 3)
                assert.equal(round.relation.kind, ['none', 'times', 'sum'][level])
                // The totals and the extra fact give back the counts, and only them
                assert.notEqual(boxDeterminant(round), 0)
                assert.deepEqual(solveBox(round).map((value) => Math.round(value * 1e9) / 1e9), round.counts)
                assert.equal(round.counts.reduce((sum, value) => sum + value, 0), round.tickets)
                assert.equal(round.counts.reduce((sum, value, index) => sum + value * round.prices[index], 0), round.takings)
                for (const count of round.counts) assert.ok(Number.isInteger(count) && count > 0)
                assert.ok(round.prices.every((price, index) => index === 0 || price > round.prices[index - 1]))
                assert.equal(round.options.length, 3)
                assert.equal(new Set(round.options).size, 3)
                assert.equal(round.options.filter((option) => option === round.counts[round.ask]).length, 1)
                for (const option of round.options) assert.ok(Number.isInteger(option) && option >= 0)
                asked.add(round.ask)
            }
        }
        assert.ok(asked.size >= 2, `level ${level}`)
    }
})

test('aljebra batx1 g games: gana o pierde', () => {
    for (let level = 0; level < 3; level += 1) {
        const verdicts = new Set<string>()
        for (let seed = 1; seed <= 80; seed += 1) {
            const rounds = createGainRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, GAIN_ROUNDS)
            for (const round of rounds) {
                assert.equal(round.kind, ['verdict', 'formula', 'point'][level])
                const point = gainBreakEven(round)
                assert.ok(Number.isInteger(point) && point > 0)
                assert.ok(round.price > round.cost)
                if (round.kind === 'point') {
                    assert.equal(round.options.length, 3)
                    assert.equal(new Set(round.options).size, 3)
                    assert.equal(round.options.filter((option) => option === point).length, 1)
                } else {
                    assert.ok(round.units > 0)
                    const verdict = gainVerdict(round)
                    verdicts.add(verdict)
                    assert.equal(verdict, gainProfit(round) < 0 ? 'lose' : gainProfit(round) === 0 ? 'even' : 'win')
                    assert.equal(Math.sign(gainProfit(round)), Math.sign(round.units - point))
                }
            }
        }
        if (level < 2) assert.equal(verdicts.size, 3, `level ${level}`)
    }
})

test('aljebra batx1 g games: el detective del álgebra', () => {
    for (const [level, errors] of gizAlgebraDetectiveLevels.entries()) {
        const seen = new Set<string>()
        for (let seed = 1; seed <= 40; seed += 1) {
            const cases = createGizAlgebraDetectiveCases(createRandom(seed * 7919 + level), level)
            assert.equal(cases.length, GIZ_ALGEBRA_DETECTIVE_CASES)
            for (const item of cases) {
                seen.add(item.error)
                assert.ok(errors.includes(item.error))
                assert.equal(item.lines.length, 3)
                assert.ok(item.wrong >= 0 && item.wrong < 3)
                assert.equal(item.options.length, 3)
                assert.ok(item.options.includes(item.error))
                assert.notEqual(item.right, item.reached)
                for (const line of item.lines) render(line.latex)
                render(item.fix)
                checkTexts([item.problem, ...item.lines.map((line) => line.label)])
            }
        }
        assert.equal(seen.size, errors.length, `level ${level}`)
    }
    checkTexts([...Object.values(gizAlgebraDetectiveNames), ...Object.values(gizAlgebraDetectiveTips)])
})

test('aljebra batx1 g games: memory boards have one partner per card', () => {
    for (const [level] of gizAlgebraMemoryLevels.entries()) {
        for (let seed = 1; seed <= 60; seed += 1) {
            const cards = createGizAlgebraMemoryBoard(createRandom(seed * 7919 + level), level)
            assert.equal(cards.length, GIZ_ALGEBRA_MEMORY_PAIRS * 2)
            const bySet = new Map<number, string[]>()
            for (const card of cards) {
                render(card.latex)
                bySet.set(card.setId, [...(bySet.get(card.setId) ?? []), card.latex])
            }
            assert.equal(bySet.size, GIZ_ALGEBRA_MEMORY_PAIRS)
            assert.equal(new Set(cards.map((card) => card.latex)).size, cards.length)
        }
    }
})
