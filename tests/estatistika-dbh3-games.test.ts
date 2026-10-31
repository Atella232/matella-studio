import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { stats3Diagnostic, statsAnswer, type StatsCheckKind } from '../src/pages/dbh3-estatistika/content.ts'
import { createStats3MemoryBoard } from '../src/pages/dbh3-estatistika/games/boards.ts'
import { createDetectiveCases, detectiveErrorNames, detectiveErrorTips, detectiveLevels } from '../src/pages/dbh3-estatistika/games/detective.ts'
import { stats3GameProgressIds, stats3Games } from '../src/pages/dbh3-estatistika/games/info.ts'
import { bagProbability, bagsWhy, CHART_FOR, createBagsRounds, createReadRounds, createVariableRounds, QUIZ_ROUNDS, READ_MEASURES, readValue, readWhy, SURVEYS } from '../src/pages/dbh3-estatistika/games/quiz.ts'
import { generateStats3RaceQuestion, STATS3_RACE_CIRCUITS, stats3RaceErrorTips } from '../src/pages/dbh3-estatistika/games/race.ts'
import { stats3LabChallengeIds } from '../src/pages/dbh3-estatistika/lab/labTools.ts'

const languages = ['eu', 'es', 'en', 'ar'] as const

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

const latexOf = (value: { numerator: number; denominator: number }) => [String(value.numerator / value.denominator).replace('.', '{,}'), `\\frac{${value.numerator}}{${value.denominator}}`, String(value.numerator)]

test('estatistika 3. DBH games: the hub, its levels and its progress ids', () => {
    assert.deepEqual(stats3Games.map((game) => game.id), ['race', 'read', 'variable', 'bags', 'detective', 'memory'])
    assert.equal(new Set(stats3GameProgressIds).size, stats3GameProgressIds.length)
    for (const id of stats3GameProgressIds) assert.ok(id >= 32101 && id <= 32699, `${id}`)
    const all = [...stats3Diagnostic.map((question) => question.id), ...stats3LabChallengeIds, ...stats3GameProgressIds]
    assert.equal(new Set(all).size, all.length)
    for (const game of stats3Games) {
        for (const language of languages) assert.ok(game.title[language] && game.tagline[language] && game.levels.every((level) => level.title[language] && level.description[language]), `${game.id} ${language}`)
        for (const level of game.levels) for (const language of languages) assert.ok(!level.description[language].includes('$'), level.description[language])
    }
    checkTexts([...Object.values(stats3RaceErrorTips), ...Object.values(detectiveErrorNames), ...Object.values(detectiveErrorTips)])
})

test('estatistika 3. DBH games: every race question is one of the checks of the exercises, with three different wrong options', () => {
    for (let circuit = 0; circuit < STATS3_RACE_CIRCUITS; circuit += 1) {
        const kinds = new Set<string>()
        for (const tier of [0, 1, 2] as const) {
            for (let seed = 1; seed <= 120; seed += 1) {
                const question = generateStats3RaceQuestion(createRandom(seed * 7919 + circuit * 31 + tier), circuit, tier)
                kinds.add(question.kind)
                assert.deepEqual(statsAnswer({ kind: question.kind as StatsCheckKind, args: Object.values(question.meta) }), question.answer, `${question.kind} ${JSON.stringify(question.meta)}`)
                assert.equal(question.options.length, 4)
                const right = question.options.filter((option) => option.correct)
                assert.equal(right.length, 1)
                assert.ok(latexOf(question.answer).includes(right[0].latex), `${right[0].latex}`)
                assert.equal(new Set(question.options.map((option) => option.latex)).size, 4)
                for (const option of question.options) katex.renderToString(option.latex, { throwOnError: true, strict: 'error' })
                checkTexts([question.prompt, question.solution])
            }
        }
        assert.ok(kinds.size >= 3, `circuit ${circuit}`)
    }
})

test('estatistika 3. DBH games: memory boards have six pairs with one partner each', () => {
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 60; seed += 1) {
            const board = createStats3MemoryBoard(createRandom(seed * 7919 + level), level)
            assert.equal(board.length, 12)
            for (const card of board) {
                assert.equal(board.filter((other) => other.shows === card.shows).length, 2)
                katex.renderToString(card.latex, { throwOnError: true, strict: 'error' })
                katex.renderToString(card.explain!, { throwOnError: true, strict: 'error' })
            }
        }
    }
})

test('estatistika 3. DBH games: the chart answer is the measure of its data, and the slips are wrong', () => {
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 60; seed += 1) {
            const rounds = createReadRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, QUIZ_ROUNDS)
            for (const round of rounds) {
                assert.equal(round.measure, READ_MEASURES[level])
                assert.equal(Number(round.answer.replace('{,}', '.')), readValue(round.counts, round.measure))
                assert.equal(round.options.length, 3)
                assert.equal(new Set(round.options).size, 3)
                assert.ok(round.options.includes(round.answer))
                checkTexts([readWhy(round)])
            }
        }
    }
})

test('estatistika 3. DBH games: every survey has its kind and chart, and every level uses them', () => {
    assert.ok(SURVEYS.length >= QUIZ_ROUNDS)
    for (const kind of ['qualitative', 'discrete', 'continuous'] as const) assert.ok(SURVEYS.filter((survey) => survey.kind === kind).length >= 4, kind)
    checkTexts(SURVEYS.map((survey) => survey.text))
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 40; seed += 1) {
            const rounds = createVariableRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, QUIZ_ROUNDS)
            assert.equal(new Set(rounds.map((round) => round.survey.text.es)).size, QUIZ_ROUNDS)
            for (const round of rounds) assert.equal(round.answer, round.asks === 'kind' ? round.survey.kind : CHART_FOR[round.survey.kind])
        }
    }
})

test('estatistika 3. DBH games: the bag with the greater probability wins, and every answer comes up', () => {
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 60; seed += 1) {
            const rounds = createBagsRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, QUIZ_ROUNDS)
            assert.deepEqual([...new Set(rounds.map((round) => round.answer))].sort(), ['A', 'B', 'same'])
            for (const round of rounds) {
                const a = bagProbability(round.a, round.colour)
                const b = bagProbability(round.b, round.colour)
                const pa = a.numerator / a.denominator
                const pb = b.numerator / b.denominator
                assert.equal(round.answer, Math.abs(pa - pb) < 1e-12 ? 'same' : pa > pb ? 'A' : 'B')
                if (level === 0) assert.equal(round.a.red + round.a.blue + round.a.green, round.b.red + round.b.blue + round.b.green)
                checkTexts([bagsWhy(round)])
            }
        }
    }
})

test('estatistika 3. DBH games: every detective case reaches a wrong value, and its fix gives the right one', () => {
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 80; seed += 1) {
            for (const item of createDetectiveCases(createRandom(seed * 7919 + level), level)) {
                assert.ok(detectiveLevels[level].includes(item.error))
                assert.ok(item.options.includes(item.error) && new Set(item.options).size === 3)
                assert.ok(Math.abs(item.reached - item.right) > 1e-9)
                assert.ok(item.wrong >= 0 && item.wrong < item.lines.length)
                if (Number.isInteger(item.reached)) assert.ok(item.lines[item.lines.length - 1].latex.includes(String(item.reached)), `${item.error}: ${item.lines[item.lines.length - 1].latex}`)
                if (Number.isInteger(item.right)) assert.ok(item.fix.includes(String(item.right)), `${item.error}: ${item.fix}`)
                for (const line of item.lines) katex.renderToString(line.latex, { throwOnError: true, strict: 'error' })
                katex.renderToString(item.fix, { throwOnError: true, strict: 'error' })
                checkTexts([item.problem])
            }
        }
    }
})
