import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import type { Tier } from '../src/features/unit-v2/games/raceCore.ts'
import { toExactDecimal, toNumber } from '../src/features/unit-v2/math/fraction.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { written } from '../src/pages/batx1-zientziak-errealak/games/race.ts'
import { SOC_FUNCTIONS_LASER_FAMILIES, socFunctionsGameModeForPath, socFunctionsGameProgressIds, socFunctionsGames, socFunctionsGameSlugs } from '../src/pages/batx1-gizarte-funtzioak/games/info.ts'
import { checkSocFunctionsPitAnswer, generateSocFunctionsRaceQuestion, SOC_FUNCTIONS_RACE_CIRCUITS, socFunctionsRaceErrorTips } from '../src/pages/batx1-gizarte-funtzioak/games/race.ts'
import { createEstimateRounds, ESTIMATE_BOX, ESTIMATE_ROUNDS, estimateOf, isEstimateRight, lineThrough } from '../src/pages/batx1-gizarte-funtzioak/games/estimate.ts'
import { bestOf, createPriceRounds, PRICE_ROUNDS, valueAt } from '../src/pages/batx1-gizarte-funtzioak/games/price.ts'
import { billFor, BILL_ROUNDS, createBillRounds } from '../src/pages/batx1-gizarte-funtzioak/games/bill.ts'
import { createSocFunctionsDetectiveCases, SOC_FUNCTIONS_DETECTIVE_CASES, socFunctionsDetectiveLevels, socFunctionsDetectiveNames, socFunctionsDetectiveTips } from '../src/pages/batx1-gizarte-funtzioak/games/detective.ts'
import { createSocFunctionsMemoryBoard, SOC_FUNCTIONS_MEMORY_PAIRS, socFunctionsMemoryLevels } from '../src/pages/batx1-gizarte-funtzioak/games/boards.ts'

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
        // Words never carry the LaTeX comma
        for (const language of languages) assert.ok(!text[language].replace(/\$[^$]+\$/g, '').includes('{,}'), text[language])
        // MathText turns «:» into ÷ inside formulas
        for (const [, formula] of text.es.matchAll(/\$([^$]+)\$/g)) assert.ok(!formula.includes(':'), formula)
    }
}

test('funtzioak batx1 g games: the hub, its levels and progress ids', () => {
    assert.deepEqual(socFunctionsGames.map((game) => game.id), ['race', 'estimate', 'price', 'bill', 'detective', 'memory', 'domain', 'laser'])
    assert.equal(new Set(socFunctionsGameProgressIds).size, socFunctionsGameProgressIds.length)
    for (const id of socFunctionsGameProgressIds) assert.ok(id >= 133401 && id <= 133899, `${id}`)
    const stages = ['families', 'linear', 'quadratic', 'inverse', 'piecewise']
    for (const game of socFunctionsGames) {
        assert.ok(game.levels.length >= 3, game.id)
        for (const level of game.levels) assert.ok(stages.includes(level.stage), `${game.id}: ${level.stage}`)
        checkTexts([game.title, game.tagline, game.skills, ...game.levels.flatMap((level) => [level.title, level.description])])
        assert.equal(socFunctionsGameModeForPath(`/matematika/batx1-gizarte/funciones/jokuak/${socFunctionsGameSlugs[game.id]}`), game.id)
    }
    assert.equal(socFunctionsGameModeForPath('/matematika/batx1-gizarte/funciones/jokuak'), 'hub')
    assert.equal(SOC_FUNCTIONS_LASER_FAMILIES.length, socFunctionsGames.find((game) => game.id === 'laser')!.levels.length)
})

test('funtzioak batx1 g games: every race question has one right option, worked out from its numbers', () => {
    const kinds = new Set<string>()
    checkTexts(Object.values(socFunctionsRaceErrorTips))
    for (let circuit = 0; circuit < SOC_FUNCTIONS_RACE_CIRCUITS; circuit += 1) {
        for (const tier of [0, 1, 2] as Tier[]) {
            for (let seed = 1; seed <= 60; seed += 1) {
                const question = generateSocFunctionsRaceQuestion(createRandom(seed * 7919 + circuit * 31 + tier), circuit, tier)
                kinds.add(question.kind)
                assert.equal(question.circuit, circuit)
                assert.equal(question.options.length, 4, question.kind)
                assert.equal(question.options.filter((option) => option.correct).length, 1, question.kind)
                assert.equal(new Set(question.options.map((option) => option.latex)).size, 4, `${question.kind}: ${question.options.map((option) => option.latex).join(' | ')}`)
                assert.equal(question.options.find((option) => option.correct)!.latex, written(question.answer), question.kind)
                for (const option of question.options) render(option.latex)
                checkTexts([question.prompt, question.solution])
                const typed = question.answer.denominator === 1 ? String(question.answer.numerator) : toExactDecimal(question.answer) ?? `${question.answer.numerator}/${question.answer.denominator}`
                assert.equal(checkSocFunctionsPitAnswer(question, typed), 'correct', `${question.kind}: ${typed}`)
                const m = question.meta
                const expected: Record<string, () => number> = {
                    'domain-count': () => m.b - m.a + 1,
                    excluded: () => m.b,
                    'top-price': () => m.Q / m.k,
                    slope: () => (m.y2 - m.y1) / (m.x2 - m.x1),
                    interpolation: () => m.y1 + ((m.y2 - m.y1) / (m.x2 - m.x1)) * (m.x - m.x1),
                    tariff: () => m.F / ((m.b - m.a) / 10),
                    vertex: () => -m.b / (2 * m.a),
                    profit: () => {
                        // The greatest value of −x² + 2hx − c over every whole x
                        let best = -Infinity
                        for (let x = 0; x <= 2 * m.h; x += 1) best = Math.max(best, -x * x + 2 * m.h * x - m.c)
                        return best
                    },
                    'best-price': () => m.Q / (2 * m.k),
                    inverse: () => (m.x1 * m.y1) / m.x2,
                    average: () => m.v + m.F / m.x,
                    asymptote: () => m.a,
                    threshold: () => m.m * m.t - m.b,
                    bill: () => (m.r1 * m.L + m.r2 * (m.x - m.L)) / 10,
                    absolute: () => Math.abs(m.r * m.r - m.a * m.r)
                }
                assert.ok(expected[question.kind], question.kind)
                assert.ok(Math.abs(toNumber(question.answer) - expected[question.kind]()) < 1e-9, `${question.kind}: ${toNumber(question.answer)} ≠ ${expected[question.kind]()}`)
            }
        }
    }
    assert.equal(kinds.size, 15)
})

test('funtzioak batx1 g games: estima el dato has one right point on the board', () => {
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 60; seed += 1) {
            const rounds = createEstimateRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, ESTIMATE_ROUNDS)
            assert.ok(rounds.some((round) => round.kind === 'inter') && rounds.some((round) => round.kind === 'extra'))
            for (const round of rounds) {
                assert.equal(round.mode, level === 2 ? 'parabolic' : 'linear')
                const [x, y] = round.answer
                assert.ok(Number.isInteger(x) && Number.isInteger(y) && y >= 0 && y <= ESTIMATE_BOX && x >= 0 && x <= ESTIMATE_BOX)
                assert.ok(Math.abs(estimateOf(round, x) - y) < 1e-9)
                // The model goes through its data
                for (const [dx, dy] of round.data) assert.ok(Math.abs(estimateOf(round, dx) - dy) < 1e-9)
                const xs = round.data.map(([dx]) => dx)
                assert.ok(!xs.includes(round.target))
                assert.equal(round.kind, round.target > Math.min(...xs) && round.target < Math.max(...xs) ? 'inter' : 'extra')
                assert.ok(isEstimateRight(round, [x, y], round.kind))
                assert.ok(!isEstimateRight(round, [x, y], round.kind === 'inter' ? 'extra' : 'inter'))
                assert.ok(!isEstimateRight(round, [x, y + 1], round.kind))
                if (round.mode === 'parabolic') {
                    // The line through the two nearest data lands elsewhere
                    assert.ok(round.lineValue !== null && Math.abs(round.lineValue - y) >= 1)
                    const nearest = [...round.data].sort((one, other) => Math.abs(one[0] - round.target) - Math.abs(other[0] - round.target)).slice(0, 2).sort((one, other) => one[0] - other[0])
                    assert.ok(Math.abs(lineThrough(nearest[0], nearest[1], round.target) - round.lineValue!) < 1e-9)
                }
            }
        }
    }
})

test('funtzioak batx1 g games: el precio justo has the vertex among four cards', () => {
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 60; seed += 1) {
            const rounds = createPriceRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, PRICE_ROUNDS)
            for (const round of rounds) {
                assert.equal(round.kind, ['revenue', 'profit', 'raise'][level])
                assert.equal(round.options.length, 4)
                assert.equal(new Set(round.options).size, 4)
                assert.ok(round.options.includes(round.answer))
                assert.ok(Math.abs(bestOf(round) - round.answer) < 1e-9)
                // The right card brings in strictly more than every other card
                for (const option of round.options.filter((value) => value !== round.answer)) assert.ok(valueAt(round, option) < valueAt(round, round.answer), `${option} vs ${round.answer}`)
                if (round.kind === 'raise') {
                    // (start + step·x)(units − loss·x) is greatest at the right number of rises
                    const units = round.A - round.B * round.start
                    const moves = (round.answer - round.start) / round.step
                    assert.ok(Number.isInteger(moves) && moves >= 1)
                    for (const other of [moves - 1, moves + 1]) assert.ok((round.start + round.step * other) * (units - round.loss * other) < (round.start + round.step * moves) * (units - round.loss * moves))
                }
            }
        }
    }
})

test('funtzioak batx1 g games: la factura a trozos has one right card', () => {
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 60; seed += 1) {
            const rounds = createBillRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, BILL_ROUNDS)
            for (const round of rounds) {
                assert.equal(round.options.length, 4)
                assert.equal(new Set(round.options).size, 4)
                assert.ok(round.options.includes(round.answer))
                assert.equal(billFor(round, round.amount), round.bill)
                assert.ok(Number.isInteger(round.bill))
                if (level < 2) {
                    assert.equal(round.answer, round.bill)
                } else {
                    // Backwards: only the right amount gives the bill
                    assert.equal(round.answer, round.amount)
                    assert.ok(round.amount > round.limit)
                    for (const option of round.options.filter((value) => value !== round.answer)) assert.notEqual(billFor(round, option), round.bill)
                }
            }
        }
    }
})

test('funtzioak batx1 g games: the detective cases are well made', () => {
    assert.equal(socFunctionsDetectiveLevels.flat().length, 12)
    checkTexts([...Object.values(socFunctionsDetectiveNames), ...Object.values(socFunctionsDetectiveTips)])
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 40; seed += 1) {
            const cases = createSocFunctionsDetectiveCases(createRandom(seed * 7919 + level), level)
            assert.equal(cases.length, SOC_FUNCTIONS_DETECTIVE_CASES)
            for (const item of cases) {
                assert.ok(socFunctionsDetectiveLevels[level].includes(item.error))
                assert.ok(item.wrong >= 0 && item.wrong < item.lines.length)
                assert.ok(Math.abs(item.right - item.reached) > 1e-9)
                assert.equal(item.options.length, 3)
                assert.ok(item.options.includes(item.error))
                checkTexts([item.problem, ...item.lines.map((line) => line.label)])
                for (const language of languages) for (const line of item.lines) render(line.latex.replace(/\{,\}/g, language === 'ar' ? '.' : '{,}'), language)
                for (const part of item.fix.split('\\ \\to\\ ')) render(part)
            }
        }
    }
})

test('funtzioak batx1 g games: memory boards have six pairs with one partner each', () => {
    assert.deepEqual([...socFunctionsMemoryLevels], ['domains', 'vertices', 'asymptotes'])
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 60; seed += 1) {
            const board = createSocFunctionsMemoryBoard(createRandom(seed * 7919 + level), level)
            assert.equal(board.length, 2 * SOC_FUNCTIONS_MEMORY_PAIRS)
            const latexes = board.map((card) => card.latex)
            assert.equal(new Set(latexes).size, latexes.length, latexes.join(' | '))
            for (const card of board) render(card.latex)
            if (level === 1) {
                // x² + bx + c and its vertex
                for (const card of board.filter((item) => item.id.endsWith('-q'))) {
                    const [, h, k] = card.shows.match(/V\((-?\d+),(-?\d+)\)/)!.map(Number)
                    const b = Number(card.latex.match(/x\^2([+-]\d+)x/)?.[1] ?? 0)
                    assert.equal(-b / 2 + 0, h, card.latex)
                    const c = Number(card.latex.replace(/x\^2([+-]\d+x)?/, '') || 0)
                    assert.equal(h * h + b * h + c, k, card.latex)
                }
            }
        }
    }
})
