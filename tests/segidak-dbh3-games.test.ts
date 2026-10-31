import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { createSequencesMemoryBoard } from '../src/pages/dbh3-segidak/games/boards.ts'
import { createDetectiveCases, detectiveErrorNames, detectiveErrorTips, detectiveLevels } from '../src/pages/dbh3-segidak/games/detective.ts'
import { createHiddenRounds, HIDDEN_ROUNDS } from '../src/pages/dbh3-segidak/games/hidden.ts'
import { sequencesGameProgressIds, sequencesGames } from '../src/pages/dbh3-segidak/games/info.ts'
import { generateSequencesRaceQuestion, SEQUENCES_RACE_CIRCUITS, sequencesRaceErrorTips } from '../src/pages/dbh3-segidak/games/race.ts'
import { createSorterItems, sorterPool, sorterWhy } from '../src/pages/dbh3-segidak/games/sorter.ts'
import { createStaircaseRounds, staircaseSum, STAIRCASE_ROWS_MAX } from '../src/pages/dbh3-segidak/games/staircase.ts'
import { sequencesLabChallengeIds } from '../src/pages/dbh3-segidak/lab/labTools.ts'
import { sequencesDiagnostic } from '../src/pages/dbh3-segidak/content.ts'

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

function expected(kind: string, m: Record<string, number>): number {
    switch (kind) {
        case 'general': return m.p * m.n + m.q
        case 'position': return (m.value - m.q) / m.p
        case 'recursive': { let t = m.a1; for (let i = 0; i < 3; i += 1) t = m.k * t + m.c; return t }
        case 'arith-term': return m.a1 + (m.n - 1) * m.d
        case 'arith-diff': return (m.am - m.ak) / m.gap
        case 'arith-first': return m.an - (m.n - 1) * m.d
        case 'gauss': return (m.n * (m.n + 1)) / 2
        case 'arith-sum': return ((2 * m.a1 + (m.n - 1) * m.d) * m.n) / 2
        case 'odds': return m.n * m.n
        case 'evens': return m.n * (m.n + 1)
        case 'geo-term': return m.a1 * m.r ** (m.n - 1)
        case 'geo-ratio': return Math.round(((m.a2 * m.r ** m.jumps) / m.a2) ** (1 / m.jumps))
        case 'geo-next': return m.a1 * m.r ** 4
        case 'geo-sum': return (m.a1 * (m.r ** m.n - 1)) / (m.r - 1)
        case 'infinite': return m.a1 / (1 - m.p / m.q)
        case 'growth': return m.start * m.r ** m.hours
        default: throw new Error(kind)
    }
}

test('segidak 3. DBH games: the hub, its levels and its progress ids', () => {
    assert.deepEqual(sequencesGames.map((game) => game.id), ['race', 'hidden', 'sorter', 'staircase', 'detective', 'memory'])
    assert.equal(new Set(sequencesGameProgressIds).size, sequencesGameProgressIds.length)
    for (const id of sequencesGameProgressIds) assert.ok(id >= 90101 && id <= 90999, `${id}`)
    const all = [...sequencesDiagnostic.map((question) => question.id), ...sequencesLabChallengeIds, ...sequencesGameProgressIds]
    assert.equal(new Set(all).size, all.length)
    for (const game of sequencesGames) for (const language of languages) assert.ok(game.title[language] && game.tagline[language] && game.levels.every((level) => level.title[language] && level.description[language]), `${game.id} ${language}`)
    checkTexts([...Object.values(sequencesRaceErrorTips), ...Object.values(detectiveErrorNames), ...Object.values(detectiveErrorTips)])
})

test('segidak 3. DBH games: every race question is right, with three different wrong options', () => {
    for (let circuit = 0; circuit < SEQUENCES_RACE_CIRCUITS; circuit += 1) {
        const kinds = new Set<string>()
        for (const tier of [0, 1, 2] as const) {
            for (let seed = 1; seed <= 120; seed += 1) {
                const question = generateSequencesRaceQuestion(createRandom(seed * 7919 + circuit * 31 + tier), circuit, tier)
                kinds.add(question.kind)
                assert.ok(close(value(question.answer), expected(question.kind, question.meta)), `${question.kind} ${JSON.stringify(question.meta)}`)
                assert.equal(question.options.length, 4)
                assert.equal(question.options.filter((option) => option.correct).length, 1)
                assert.equal(new Set(question.options.map((option) => option.latex)).size, 4)
                checkTexts([question.prompt, question.solution])
            }
        }
        assert.ok(kinds.size >= 3, `circuit ${circuit}`)
    }
})

test('segidak 3. DBH games: memory boards have six pairs with one partner each', () => {
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 60; seed += 1) {
            const board = createSequencesMemoryBoard(createRandom(seed * 7919 + level), level)
            assert.equal(board.length, 12)
            for (const card of board) {
                assert.equal(board.filter((other) => other.shows === card.shows).length, 2)
                katex.renderToString(card.latex, { throwOnError: true, strict: 'error' })
            }
        }
    }
})

test('segidak 3. DBH games: the hidden term follows the rule and is the only right option', () => {
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 80; seed += 1) {
            const rounds = createHiddenRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, HIDDEN_ROUNDS)
            for (const round of rounds) {
                assert.equal(round.terms[round.hole], round.answer)
                assert.equal(new Set(round.options).size, 4)
                assert.equal(round.options.filter((option) => option === round.answer).length, 1)
                const t = round.terms
                if (round.kind === 'arithmetic') assert.ok(t.every((term, k) => k === 0 || term - t[k - 1] === t[1] - t[0]))
                if (round.kind === 'geometric') assert.ok(t.every((term, k) => k === 0 || close(term / t[k - 1], t[1] / t[0])))
                if (round.kind === 'fibonacci') assert.ok(t.every((term, k) => k < 2 || term === t[k - 1] + t[k - 2]))
            }
        }
    }
})

test('segidak 3. DBH games: the sorter is right about every sequence', () => {
    const numbers = (latex: string) => latex.split(',\\,').map((part) => {
        const clean = part.replace(/\{,\}/g, '.').replace(/\\frac\{(\d+)\}\{(\d+)\}/, '($1/$2)').replace(/(\d)\\sqrt\{2\}/, '$1*Math.SQRT2').replace(/\\sqrt\{2\}/, 'Math.SQRT2')
        return Function('Math', `return ${clean}`)(Math) as number
    })
    for (let level = 0; level < 3; level += 1) {
        for (const item of sorterPool(level)) {
            const t = numbers(item.latex)
            const arithmetic = t.every((term, k) => k === 0 || close(term - t[k - 1], t[1] - t[0]))
            const geometric = t.every((term, k) => k === 0 || close(term / t[k - 1], t[1] / t[0]))
            assert.ok(!(arithmetic && geometric), item.latex)
            assert.equal(item.kind, arithmetic ? 'arithmetic' : geometric ? 'geometric' : 'neither', item.latex)
            checkTexts([sorterWhy(item)])
        }
        for (let seed = 1; seed <= 40; seed += 1) assert.equal(createSorterItems(createRandom(seed * 7919 + level), level).length, 10)
    }
})

test('segidak 3. DBH games: every staircase has exactly one right number of rows', () => {
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 80; seed += 1) {
            for (const round of createStaircaseRounds(createRandom(seed * 7919 + level), level)) {
                const fits = Array.from({ length: STAIRCASE_ROWS_MAX }, (_, i) => i + 1).filter((rows) => staircaseSum(round.a1, round.d, rows) === round.total)
                assert.deepEqual(fits, [round.rows])
            }
        }
    }
})

test('segidak 3. DBH games: every detective case reaches a wrong value, and its fix gives the right one', () => {
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 80; seed += 1) {
            for (const item of createDetectiveCases(createRandom(seed * 7919 + level), level)) {
                assert.ok(detectiveLevels[level].includes(item.error))
                assert.ok(item.options.includes(item.error) && new Set(item.options).size === 3)
                assert.notEqual(item.reached, item.right)
                assert.ok(item.wrong >= 0 && item.wrong < item.lines.length)
                assert.ok(item.lines[item.lines.length - 1].latex.includes(String(item.reached)))
                if (Number.isFinite(item.right)) assert.ok(item.fix.includes(String(item.right)), `${item.error}: ${item.fix}`)
                for (const line of item.lines) katex.renderToString(line.latex, { throwOnError: true, strict: 'error' })
                katex.renderToString(item.fix, { throwOnError: true, strict: 'error' })
                checkTexts([item.problem])
            }
        }
    }
})
