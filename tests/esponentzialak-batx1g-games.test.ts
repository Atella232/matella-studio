import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import type { Tier } from '../src/features/unit-v2/games/raceCore.ts'
import { toExactDecimal, toNumber } from '../src/features/unit-v2/math/fraction.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { written } from '../src/pages/batx1-zientziak-errealak/games/race.ts'
import { SOC_EXP_LASER_FAMILIES, socExpGameModeForPath, socExpGameProgressIds, socExpGames, socExpGameSlugs } from '../src/pages/batx1-gizarte-esponentzialak/games/info.ts'
import { checkSocExpPitAnswer, generateSocExpRaceQuestion, SOC_EXP_RACE_CIRCUITS, socExpRaceErrorTips } from '../src/pages/batx1-gizarte-esponentzialak/games/race.ts'
import { createTableRounds, isTableRight, TABLE_ROUNDS, tableValue } from '../src/pages/batx1-gizarte-esponentzialak/games/table.ts'
import { applyOrder, CHECKOUT_ROUNDS, createCheckoutRounds } from '../src/pages/batx1-gizarte-esponentzialak/games/checkout.ts'
import { createSocExpDetectiveCases, SOC_EXP_DETECTIVE_CASES, socExpDetectiveLevels, socExpDetectiveNames, socExpDetectiveTips } from '../src/pages/batx1-gizarte-esponentzialak/games/detective.ts'
import { createSocExpMemoryBoard, SOC_EXP_MEMORY_PAIRS, socExpMemoryLevels } from '../src/pages/batx1-gizarte-esponentzialak/games/boards.ts'

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

test('esponentzialak batx1 g games: the hub, its levels and progress ids', () => {
    assert.deepEqual(socExpGames.map((game) => game.id), ['race', 'table', 'checkout', 'detective', 'memory', 'where', 'order', 'undo', 'growth', 'laser'])
    assert.equal(new Set(socExpGameProgressIds).size, socExpGameProgressIds.length)
    for (const id of socExpGameProgressIds) assert.ok(id >= 134401 && id <= 134899, `${id}`)
    const stages = ['transforms', 'composition', 'exponential', 'logarithmic', 'models']
    for (const game of socExpGames) {
        assert.ok(game.levels.length >= 2, game.id)
        for (const level of game.levels) assert.ok(stages.includes(level.stage), `${game.id}: ${level.stage}`)
        checkTexts([game.title, game.tagline, game.skills, ...game.levels.flatMap((level) => [level.title, level.description])])
        assert.equal(socExpGameModeForPath(`/matematika/batx1-gizarte/funciones-exponenciales/jokuak/${socExpGameSlugs[game.id]}`), game.id)
    }
    // ¿Dónde cae el punto? keeps only its first two levels (the third has stretches)
    assert.equal(socExpGames.find((game) => game.id === 'where')!.levels.length, 2)
    assert.equal(SOC_EXP_LASER_FAMILIES.length, socExpGames.find((game) => game.id === 'laser')!.levels.length)
})

test('esponentzialak batx1 g games: every race question has one right option, worked out from its numbers', () => {
    const kinds = new Set<string>()
    checkTexts(Object.values(socExpRaceErrorTips))
    for (let circuit = 0; circuit < SOC_EXP_RACE_CIRCUITS; circuit += 1) {
        for (const tier of [0, 1, 2] as Tier[]) {
            for (let seed = 1; seed <= 60; seed += 1) {
                const question = generateSocExpRaceQuestion(createRandom(seed * 7919 + circuit * 31 + tier), circuit, tier)
                kinds.add(question.kind)
                assert.equal(question.options.length, 4, question.kind)
                assert.equal(question.options.filter((option) => option.correct).length, 1)
                assert.equal(new Set(question.options.map((option) => option.latex)).size, 4, question.kind)
                assert.equal(question.options.find((option) => option.correct)!.latex, written(question.answer))
                for (const option of question.options) render(option.latex)
                checkTexts([question.prompt, question.solution])
                const typed = question.answer.denominator === 1 ? String(question.answer.numerator) : toExactDecimal(question.answer) ?? `${question.answer.numerator}/${question.answer.denominator}`
                assert.equal(checkSocExpPitAnswer(question, typed), 'correct', `${question.kind}: ${typed}`)
                const m = question.meta
                const expected: Record<string, () => number> = {
                    shift: () => m.p - m.c,
                    square: () => m.c - m.m * m.m,
                    outside: () => m.k * m.q,
                    compose: () => m.a * (m.r + m.c),
                    inverse: () => (m.v - m.b) / m.a,
                    price: () => 1.21 * (m.price - m.off),
                    power: () => m.k * m.a ** m.t,
                    percent: () => (m.down ? 1 - m.r / 100 : 1 + m.r / 100),
                    'two-points': () => Math.sqrt(m.y / m.k),
                    log: () => m.e,
                    equation: () => m.t,
                    domain: () => Math.floor(-m.a) + 1,
                    doubling: () => 2 ** m.n,
                    'half-life': () => m.start / 2 ** m.n,
                    logistic: () => m.M / (1 + m.b)
                }
                assert.ok(expected[question.kind], question.kind)
                assert.ok(Math.abs(toNumber(question.answer) - expected[question.kind]()) < 1e-6, `${question.kind}: ${toNumber(question.answer)} ≠ ${expected[question.kind]()}`)
            }
        }
    }
    assert.equal(kinds.size, 15)
})

test('esponentzialak batx1 g games: lineal o exponencial', () => {
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 60; seed += 1) {
            const rounds = createTableRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, TABLE_ROUNDS)
            for (const round of rounds) {
                const [v0, v1, v2, v3] = round.values
                if (round.kind === 'linear') assert.ok(Math.abs(v1 - v0 - (v3 - v2)) < 1e-6)
                else assert.ok(Math.abs(v1 / v0 - v3 / v2) < 1e-6)
                const step = round.kind === 'linear' ? v1 - v0 : v1 / v0
                assert.ok(Math.abs(tableValue(round.kind, v0, step, round.target) - round.answer) < 0.01)
                assert.equal(round.options.length, 4)
                assert.equal(new Set(round.options).size, 4)
                assert.ok(round.options.includes(round.answer))
                assert.ok(isTableRight(round, round.kind, round.answer))
                assert.ok(!isTableRight(round, round.kind === 'linear' ? 'exponential' : 'linear', round.answer))
            }
        }
    }
})

test('esponentzialak batx1 g games: descuento, IVA y envío has one right card', () => {
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 60; seed += 1) {
            const rounds = createCheckoutRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, CHECKOUT_ROUNDS)
            for (const round of rounds) {
                if (level === 0) {
                    assert.equal(round.options.length, 4)
                    assert.equal(new Set(round.options).size, 4)
                    assert.equal(round.options[round.answer], applyOrder(round, round.orders[0]))
                    // The other order gives another price
                    assert.notEqual(applyOrder(round, [1, 0]), round.target)
                } else {
                    assert.equal(round.orders.length, level === 1 ? 2 : 4)
                    const results = round.orders.map((order) => applyOrder(round, order))
                    assert.equal(results.filter((cents) => cents === round.target).length, 1)
                    assert.equal(results[round.answer], round.target)
                }
            }
        }
    }
})

test('esponentzialak batx1 g games: the detective cases are well made', () => {
    assert.equal(socExpDetectiveLevels.flat().length, 12)
    checkTexts([...Object.values(socExpDetectiveNames), ...Object.values(socExpDetectiveTips)])
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 40; seed += 1) {
            const cases = createSocExpDetectiveCases(createRandom(seed * 7919 + level), level)
            assert.equal(cases.length, SOC_EXP_DETECTIVE_CASES)
            for (const item of cases) {
                assert.ok(socExpDetectiveLevels[level].includes(item.error))
                assert.ok(item.wrong >= 0 && item.wrong < item.lines.length)
                assert.ok(Math.abs(item.right - item.reached) > 1e-9)
                checkTexts([item.problem, ...item.lines.map((line) => line.label)])
                for (const language of languages) for (const line of item.lines) render(line.latex.replace(/\{,\}/g, language === 'ar' ? '.' : '{,}'), language)
                for (const part of item.fix.split('\\ \\to\\ ')) render(part)
            }
        }
    }
})

test('esponentzialak batx1 g games: memory boards have six pairs with one partner each', () => {
    assert.deepEqual([...socExpMemoryLevels], ['factors', 'logs', 'inverses'])
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 60; seed += 1) {
            const board = createSocExpMemoryBoard(createRandom(seed * 7919 + level), level)
            assert.equal(board.length, 2 * SOC_EXP_MEMORY_PAIRS)
            const latexes = board.map((card) => card.latex)
            assert.equal(new Set(latexes).size, latexes.length, latexes.join(' | '))
            for (const card of board) render(card.latex)
        }
    }
})
