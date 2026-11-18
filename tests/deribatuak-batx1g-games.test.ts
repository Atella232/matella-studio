import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import type { Tier } from '../src/features/unit-v2/games/raceCore.ts'
import { toExactDecimal, toNumber } from '../src/features/unit-v2/math/fraction.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { written } from '../src/pages/batx1-zientziak-errealak/games/race.ts'
import { socDerivGameModeForPath, socDerivGameProgressIds, socDerivGames, socDerivGameSlugs } from '../src/pages/batx1-gizarte-deribatuak/games/info.ts'
import { checkSocDerivPitAnswer, generateSocDerivRaceQuestion, SOC_DERIV_RACE_CIRCUITS, socDerivRaceErrorTips } from '../src/pages/batx1-gizarte-deribatuak/games/race.ts'
import { costSlope, createProduceRounds, PRODUCE_MAX, PRODUCE_ROUNDS, profitAt, revenueSlope } from '../src/pages/batx1-gizarte-deribatuak/games/produce.ts'
import { createRatesRounds, RATES_ROUNDS } from '../src/pages/batx1-gizarte-deribatuak/games/rates.ts'
import { createSocDerivDetectiveCases, SOC_DERIV_DETECTIVE_CASES, socDerivDetectiveLevels, socDerivDetectiveNames, socDerivDetectiveTips } from '../src/pages/batx1-gizarte-deribatuak/games/detective.ts'
import { createSocDerivMemoryBoard, SOC_DERIV_MEMORY_PAIRS, socDerivMemoryLevels } from '../src/pages/batx1-gizarte-deribatuak/games/boards.ts'

const languages = ['eu', 'es', 'en', 'ar'] as const
const render = (latex: string, language: (typeof languages)[number] = 'es') => katex.renderToString(formulaFor(language, latex), { throwOnError: true, strict: 'error' })

function checkTexts(texts: LocalizedText[]) {
    for (const text of texts) {
        for (const language of languages) {
            assert.ok(text[language].length > 0)
            for (const [, formula] of text[language].matchAll(/\$([^$]+)\$/g)) render(formula, language)
            assert.ok(!text[language].replace(/\$[^$]+\$/g, '').includes('{,}'), text[language])
        }
        assert.ok(!text.ar.includes('{,}'), text.ar)
        assert.ok(!/[؀-ۿ]/.test([...text.ar.matchAll(/\$([^$]+)\$/g)].map((match) => match[1]).join('')), text.ar)
        assert.ok(!/\d(?:ri|ren|rekin|ekin|ek|ak|ra|tik|z|ei|en|k|ko)(?![a-zA-Z])/.test(text.eu.replace(/\$[^$]+\$/g, '')), text.eu)
        for (const [, formula] of text.es.matchAll(/\$([^$]+)\$/g)) assert.ok(!formula.includes(':'), formula)
    }
}

test('deribatuak batx1 g games: the hub, its levels and progress ids', () => {
    assert.deepEqual(socDerivGames.map((game) => game.id), ['race', 'produce', 'rates', 'detective', 'memory', 'slopes', 'match', 'updown', 'extrema'])
    assert.equal(new Set(socDerivGameProgressIds).size, socDerivGameProgressIds.length)
    for (const id of socDerivGameProgressIds) assert.ok(id >= 136401 && id <= 136899, `${id}`)
    const stages = ['rate', 'rules', 'monotony', 'optimization', 'graphs']
    for (const game of socDerivGames) {
        assert.ok(game.levels.length >= 2, game.id)
        for (const level of game.levels) assert.ok(stages.includes(level.stage), `${game.id}: ${level.stage}`)
        checkTexts([game.title, game.tagline, game.skills, ...game.levels.flatMap((level) => [level.title, level.description])])
        assert.equal(socDerivGameModeForPath(`/matematika/batx1-gizarte/derivadas/jokuak/${socDerivGameSlugs[game.id]}`), game.id)
    }
    // Left out with the trigonometric derivatives: the third level of match f and f′
    assert.equal(socDerivGames.find((game) => game.id === 'match')!.levels.length, 2)
})

test('deribatuak batx1 g games: every race question has one right option, worked out from its numbers', () => {
    const kinds = new Set<string>()
    checkTexts(Object.values(socDerivRaceErrorTips))
    for (let circuit = 0; circuit < SOC_DERIV_RACE_CIRCUITS; circuit += 1) {
        for (const tier of [0, 1, 2] as Tier[]) {
            for (let seed = 1; seed <= 60; seed += 1) {
                const question = generateSocDerivRaceQuestion(createRandom(seed * 7919 + circuit * 31 + tier), circuit, tier)
                kinds.add(question.kind)
                assert.equal(question.options.length, 4, question.kind)
                assert.equal(question.options.filter((option) => option.correct).length, 1)
                assert.equal(new Set(question.options.map((option) => option.latex)).size, 4, question.kind)
                assert.equal(question.options.find((option) => option.correct)!.latex, written(question.answer))
                for (const option of question.options) render(option.latex)
                checkTexts([question.prompt, question.solution])
                const typed = question.answer.denominator === 1 ? String(question.answer.numerator) : toExactDecimal(question.answer) ?? `${question.answer.numerator}/${question.answer.denominator}`
                assert.equal(checkSocDerivPitAnswer(question, typed), 'correct', `${question.kind}: ${typed}`)
                const m = question.meta
                const expected: Record<string, () => number> = {
                    average: () => (m.a * m.q * m.q + m.b * m.q - m.a * m.p * m.p - m.b * m.p) / (m.q - m.p),
                    slope: () => 2 * m.a * m.x + m.b,
                    tangent: () => m.x0 * m.x0 + m.k - 2 * m.x0 * m.x0,
                    polynomial: () => 3 * m.a * m.x * m.x + m.b,
                    product: () => 2 * m.x * (m.x + m.c) + m.x * m.x + m.a,
                    chain: () => m.n * (m.b * m.x + m.c) ** (m.n - 1) * m.b,
                    'vertex-x': () => -m.b / (2 * m.a),
                    'vertex-value': () => m.k,
                    parameter: () => -2 * m.x0,
                    production: () => m.best,
                    profit: () => ((m.p - m.v) / 2) ** 2 - m.F,
                    numbers: () => (m.S / 2) ** 2,
                    count: () => (m.sign < 0 ? 2 : 0),
                    asymptote: () => m.a,
                    minimum: () => m.s
                }
                assert.ok(expected[question.kind], question.kind)
                assert.ok(Math.abs(toNumber(question.answer) - expected[question.kind]()) < 1e-6, `${question.kind}: ${toNumber(question.answer)} ≠ ${expected[question.kind]()}`)
            }
        }
    }
    assert.equal(kinds.size, 15)
})

test('deribatuak batx1 g games: ¿cuánto producir? has its best production where I′ = C′', () => {
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 60; seed += 1) {
            const rounds = createProduceRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, PRODUCE_ROUNDS)
            for (const round of rounds) {
                assert.ok(Number.isInteger(round.answer) && round.answer >= 1 && round.answer <= PRODUCE_MAX)
                assert.ok(Math.abs(revenueSlope(round, round.answer) - costSlope(round, round.answer)) < 1e-9)
                // The answer beats every other whole production
                for (let x = 1; x <= PRODUCE_MAX; x += 1) if (x !== round.answer) assert.ok(profitAt(round, x) < profitAt(round, round.answer))
                assert.equal(round.d > 0, level === 2)
            }
        }
    }
})

test('deribatuak batx1 g games: ¿media o instantánea? has one right card', () => {
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 60; seed += 1) {
            const rounds = createRatesRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, RATES_ROUNDS)
            for (const round of rounds) {
                assert.equal(round.options.length, 4)
                assert.equal(new Set(round.options).size, 4)
                assert.ok(round.options.includes(round.answer))
                render(round.latex)
                render(round.working)
                checkTexts([round.prompt])
            }
        }
    }
})

test('deribatuak batx1 g games: the detective cases are well made', () => {
    assert.equal(socDerivDetectiveLevels.flat().length, 12)
    checkTexts([...Object.values(socDerivDetectiveNames), ...Object.values(socDerivDetectiveTips)])
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 40; seed += 1) {
            const cases = createSocDerivDetectiveCases(createRandom(seed * 7919 + level), level)
            assert.equal(cases.length, SOC_DERIV_DETECTIVE_CASES)
            for (const item of cases) {
                assert.ok(socDerivDetectiveLevels[level].includes(item.error))
                assert.ok(item.wrong >= 0 && item.wrong < item.lines.length)
                assert.ok(Math.abs(item.right - item.reached) > 1e-9)
                checkTexts([item.problem, ...item.lines.map((line) => line.label)])
                for (const language of languages) for (const line of item.lines) render(line.latex.replace(/\{,\}/g, language === 'ar' ? '.' : '{,}'), language)
                render(item.fix)
            }
        }
    }
})

test('deribatuak batx1 g games: memory boards have six pairs with one partner each', () => {
    assert.deepEqual([...socDerivMemoryLevels], ['powers', 'extremes', 'profit'])
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 60; seed += 1) {
            const board = createSocDerivMemoryBoard(createRandom(seed * 7919 + level), level)
            assert.equal(board.length, 2 * SOC_DERIV_MEMORY_PAIRS)
            const latexes = board.map((card) => card.latex)
            assert.equal(new Set(latexes).size, latexes.length, latexes.join(' | '))
            for (const card of board) render(card.latex)
        }
    }
})
