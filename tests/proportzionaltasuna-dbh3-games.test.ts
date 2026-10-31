import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { createProportion3MemoryBoard } from '../src/pages/dbh3-proportzionaltasuna/games/boards.ts'
import { COPIER_PRESSES, createCopierRounds, reachable, sizeAfter } from '../src/pages/dbh3-proportzionaltasuna/games/copier.ts'
import { createGearboxRounds, gearboxSpeed, GEARBOX_ROUNDS } from '../src/pages/dbh3-proportzionaltasuna/games/gearbox.ts'
import { proportion3GameProgressIds, proportion3Games } from '../src/pages/dbh3-proportzionaltasuna/games/info.ts'
import { createLootRounds, lootSolved, startingPiles } from '../src/pages/dbh3-proportzionaltasuna/games/loot.ts'
import { generateProportion3RaceQuestion, PROPORTION3_RACE_CIRCUITS, proportion3RaceErrorTips } from '../src/pages/dbh3-proportzionaltasuna/games/race.ts'
import { createTreasureRounds, realMetres } from '../src/pages/dbh3-proportzionaltasuna/games/treasure.ts'
import { proportion3LabChallengeIds } from '../src/pages/dbh3-proportzionaltasuna/lab/labTools.ts'
import { proportion3Diagnostic } from '../src/pages/dbh3-proportzionaltasuna/content.ts'

const languages = ['eu', 'es', 'en', 'ar'] as const
const value = (fraction: { numerator: number; denominator: number }) => fraction.numerator / fraction.denominator
const close = (a: number, b: number) => Math.abs(a - b) < 1e-9 * Math.max(1, Math.abs(a))

function checkTexts(texts: LocalizedText[]) {
    for (const text of texts) {
        for (const language of languages) {
            assert.ok(text[language].length > 0)
            for (const [, formula] of text[language].matchAll(/\$([^$]+)\$/g)) katex.renderToString(formulaFor(language, formula), { throwOnError: true, strict: 'error' })
        }
        assert.ok(!text.ar.includes('{,}'), text.ar)
        assert.ok(!/[؀-ۿ]/.test([...text.ar.matchAll(/\$([^$]+)\$/g)].map((match) => match[1]).join('')), text.ar)
        assert.ok(!/\d(?:ri|ren|rekin|ekin|ek|ak|ra|tik|z|ei|en|k)(?![a-zA-Z])/.test(text.eu.replace(/\$[^$]+\$/g, '')), text.eu)
    }
}

/** What each question's answer must be, recomputed from its numbers */
function expected(kind: string, m: Record<string, number>): number {
    switch (kind) {
        case 'fourth': return (m.b * m.c) / m.a
        case 'mean': return Math.sqrt(m.a * m.b)
        case 'scale': return (m.cm * m.n) / 100000
        case 'unit-price': return m.price * m.asked
        case 'workers': return (m.workers * m.days) / m.asked
        case 'gears': return (m.teethA * m.rpmA) / m.teethB
        case 'inverse-table': return m.k / m.x2
        case 'direct-share': return (m.total / m.sum) * m.part
        case 'inverse-share': return (m.total * (1 / m.a)) / (1 / m.a + 1 / m.b)
        case 'compound': return (m.hours * m.machines * m.newPieces) / (m.newMachines * m.pieces)
        case 'final': return (m.price * (m.up ? 100 + m.rate : 100 - m.rate)) / 100
        case 'original': return m.original
        case 'chained': return Math.abs(((100 + m.r1) * (100 - m.r2)) / 10000 - 1) * 100
        case 'months': return (m.capital * m.rate * m.months) / 1200
        case 'mixture': return (m.a * m.p + m.b * m.q) / (m.a + m.b)
        case 'meet': return m.distance / (m.v1 + m.v2)
        case 'catch': return m.gap / (m.fast - m.slow)
        case 'taps': return (m.a * m.b) / (m.a + m.b)
        default: throw new Error(kind)
    }
}

test('proportzionaltasuna 3. DBH games: the hub, its levels and its progress ids', () => {
    assert.deepEqual(proportion3Games.map((game) => game.id), ['race', 'gearbox', 'copier', 'loot', 'treasure', 'memory'])
    assert.equal(new Set(proportion3GameProgressIds).size, proportion3GameProgressIds.length)
    for (const id of proportion3GameProgressIds) assert.ok(id >= 88101 && id <= 88999, `${id}`)
    // No id of this unit is used twice anywhere in it
    const all = [...proportion3Diagnostic.map((question) => question.id), ...proportion3LabChallengeIds.filter((id) => id >= 87101 && id <= 87999), ...proportion3GameProgressIds]
    assert.equal(new Set(all).size, all.length)
    for (const game of proportion3Games) for (const language of languages) assert.ok(game.title[language] && game.tagline[language] && game.levels.every((level) => level.title[language] && level.description[language]), `${game.id} ${language}`)
    checkTexts(Object.values(proportion3RaceErrorTips))
})

test('proportzionaltasuna 3. DBH games: every race question is right, with three different wrong options', () => {
    for (let circuit = 0; circuit < PROPORTION3_RACE_CIRCUITS; circuit += 1) {
        const kinds = new Set<string>()
        for (const tier of [0, 1, 2] as const) {
            for (let seed = 1; seed <= 120; seed += 1) {
                const question = generateProportion3RaceQuestion(createRandom(seed * 7919 + circuit * 31 + tier), circuit, tier)
                kinds.add(question.kind)
                assert.equal(question.circuit, circuit)
                assert.ok(close(value(question.answer), expected(question.kind, question.meta)), `${question.kind} ${JSON.stringify(question.meta)}`)
                assert.equal(question.options.length, 4)
                assert.equal(question.options.filter((option) => option.correct).length, 1)
                assert.equal(new Set(question.options.map((option) => option.latex)).size, 4)
                for (const option of question.options) katex.renderToString(option.latex, { throwOnError: true, strict: 'error' })
                checkTexts([question.prompt, question.solution])
            }
        }
        assert.ok(kinds.size >= 3, `circuit ${circuit}: ${[...kinds].join(', ')}`)
    }
})

test('proportzionaltasuna 3. DBH games: memory boards have six pairs with one partner each', () => {
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 60; seed += 1) {
            const board = createProportion3MemoryBoard(createRandom(seed * 7919 + level), level)
            assert.equal(board.length, 12)
            const shows = board.map((card) => card.shows)
            for (const card of board) {
                assert.equal(shows.filter((item) => item === card.shows).length, 2)
                katex.renderToString(card.latex, { throwOnError: true, strict: 'error' })
            }
        }
    }
})

test('proportzionaltasuna 3. DBH games: the gearbox has exactly one right wheel in every round', () => {
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 80; seed += 1) {
            const rounds = createGearboxRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, GEARBOX_ROUNDS)
            for (const round of rounds) {
                assert.equal(round.options.length, 4)
                assert.equal(new Set(round.options).size, 4)
                assert.ok(round.options.every((teeth) => teeth % 2 === 0 && teeth >= 8 && teeth <= 48))
                assert.deepEqual(round.options.filter((teeth) => close(gearboxSpeed(round, teeth), round.target)), [round.answer])
                if (round.mode === 'idler') assert.ok(round.teethB !== undefined)
                if (round.mode === 'axle') assert.ok(round.teethB !== undefined && round.teethC !== undefined)
            }
        }
    }
})

test('proportzionaltasuna 3. DBH games: the photocopier always lands on a reachable, new size', () => {
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 60; seed += 1) {
            for (const round of createCopierRounds(createRandom(seed * 7919 + level), level)) {
                assert.equal(round.presses, COPIER_PRESSES[level])
                assert.equal(sizeAfter(round.start, round.solution), round.target)
                assert.notEqual(round.target, round.start)
                assert.ok(reachable(round.start, level, round.presses).has(round.target))
                assert.equal(round.target % 10, 0)
            }
        }
    }
})

test('proportzionaltasuna 3. DBH games: every loot split adds up, and inverse shares go to the fewest mistakes', () => {
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 80; seed += 1) {
            for (const round of createLootRounds(createRandom(seed * 7919 + level), level)) {
                assert.equal(round.shares.reduce((a, b) => a + b, 0), round.total)
                assert.ok(round.shares.every((share) => share % round.step === 0))
                assert.ok(!lootSolved(round, startingPiles(round)), `${JSON.stringify(round)} starts solved`)
                for (let i = 0; i < round.numbers.length; i += 1) {
                    for (let j = 0; j < round.numbers.length; j += 1) {
                        if (round.numbers[i] < round.numbers[j]) assert.ok(round.kind === 'direct' ? round.shares[i] < round.shares[j] : round.shares[i] > round.shares[j])
                    }
                    // The share is proportional to the number (direct) or to its reciprocal (inverse)
                    const ratio = round.kind === 'direct' ? round.shares[i] / round.numbers[i] : round.shares[i] * round.numbers[i]
                    const first = round.kind === 'direct' ? round.shares[0] / round.numbers[0] : round.shares[0] * round.numbers[0]
                    assert.ok(close(ratio, first))
                }
            }
        }
    }
})

test('proportzionaltasuna 3. DBH games: the treasure map has one right answer per round', () => {
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 80; seed += 1) {
            for (const round of createTreasureRounds(createRandom(seed * 7919 + level), level)) {
                assert.equal(realMetres(round.scale, round.halves), round.metres)
                if (round.mode === 'place') assert.equal(round.answer, round.halves)
                else {
                    assert.equal(round.options.length, 4)
                    assert.equal(new Set(round.options).size, 4)
                    assert.ok(round.options.includes(round.answer))
                }
                if (round.mode === 'measure') assert.equal(round.answer, round.metres)
                if (round.mode === 'scale') assert.deepEqual(round.options.filter((scale) => realMetres(scale, round.halves) === round.metres), [round.scale])
            }
        }
    }
})
