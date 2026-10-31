import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { functionAnswer, type FunctionCheckKind } from '../src/pages/dbh3-funtzioak/content.ts'
import { functions3Diagnostic } from '../src/pages/dbh3-funtzioak/content.ts'
import { createFunctions3MemoryBoard } from '../src/pages/dbh3-funtzioak/games/boards.ts'
import { createDetectiveCases, detectiveErrorNames, detectiveErrorTips, detectiveLevels } from '../src/pages/dbh3-funtzioak/games/detective.ts'
import { functions3GameProgressIds, functions3Games } from '../src/pages/dbh3-funtzioak/games/info.ts'
import { createMatchRounds, createSignsRounds, createStoryRounds, curveAt, QUIZ_ROUNDS, SIGN_LETTERS, SIGN_PAIRS, signsLatex, signsWhy, storyPositions } from '../src/pages/dbh3-funtzioak/games/quiz.ts'
import { FUNCTIONS3_RACE_CIRCUITS, functions3RaceErrorTips, generateFunctions3RaceQuestion } from '../src/pages/dbh3-funtzioak/games/race.ts'
import { functions3LabChallengeIds } from '../src/pages/dbh3-funtzioak/lab/labTools.ts'

const languages = ['eu', 'es', 'en', 'ar'] as const
const value = (fraction: { numerator: number; denominator: number }) => fraction.numerator / fraction.denominator

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

/** The equation y = … of a line or a parabola, worked out at x */
function equationAt(latex: string, x: number): number {
    const js = latex.replace(/^y=/, '').replace(/\\frac\{(\d+)\}\{(\d+)\}/g, '($1/$2)').replace(/\^\{2\}/g, '**2').replace(/(\d|\))x/g, '$1*x')
    return Function('x', `return ${js.replace(/x\*\*2/g, '(x**2)')}`)(x) as number
}

test('funtzioak 3. DBH games: the hub, its levels and its progress ids', () => {
    assert.deepEqual(functions3Games.map((game) => game.id), ['race', 'match', 'story', 'signs', 'detective', 'memory'])
    assert.equal(new Set(functions3GameProgressIds).size, functions3GameProgressIds.length)
    for (const id of functions3GameProgressIds) assert.ok(id >= 55101 && id <= 55699, `${id}`)
    const all = [...functions3Diagnostic.map((question) => question.id), ...functions3LabChallengeIds, ...functions3GameProgressIds]
    assert.equal(new Set(all).size, all.length)
    for (const game of functions3Games) {
        for (const language of languages) assert.ok(game.title[language] && game.tagline[language] && game.levels.every((level) => level.title[language] && level.description[language]), `${game.id} ${language}`)
        for (const level of game.levels) for (const language of languages) assert.ok(!level.description[language].includes('$'), level.description[language])
    }
    checkTexts([...Object.values(functions3RaceErrorTips), ...Object.values(detectiveErrorNames), ...Object.values(detectiveErrorTips)])
})

test('funtzioak 3. DBH games: every race question is one of the checks of the exercises, with three different wrong options', () => {
    for (let circuit = 0; circuit < FUNCTIONS3_RACE_CIRCUITS; circuit += 1) {
        const kinds = new Set<string>()
        for (const tier of [0, 1, 2] as const) {
            for (let seed = 1; seed <= 120; seed += 1) {
                const question = generateFunctions3RaceQuestion(createRandom(seed * 7919 + circuit * 31 + tier), circuit, tier)
                kinds.add(question.kind)
                const answer = functionAnswer({ kind: question.kind as FunctionCheckKind, args: Object.values(question.meta) })
                assert.ok(Number.isInteger(answer) && answer === value(question.answer), `${question.kind} ${JSON.stringify(question.meta)}`)
                assert.equal(question.options.length, 4)
                assert.equal(question.options.filter((option) => option.correct).length, 1)
                assert.equal(new Set(question.options.map((option) => option.latex)).size, 4)
                checkTexts([question.prompt, question.solution])
            }
        }
        assert.ok(kinds.size >= 3, `circuit ${circuit}`)
    }
})

test('funtzioak 3. DBH games: memory boards have six pairs with one partner each', () => {
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 60; seed += 1) {
            const board = createFunctions3MemoryBoard(createRandom(seed * 7919 + level), level)
            assert.equal(board.length, 12)
            for (const card of board) {
                assert.equal(board.filter((other) => other.shows === card.shows).length, 2)
                katex.renderToString(card.latex, { throwOnError: true, strict: 'error' })
                katex.renderToString(card.explain!, { throwOnError: true, strict: 'error' })
            }
        }
    }
})

test('funtzioak 3. DBH games: the right equation is the graph drawn, and the wrong ones are not', () => {
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 60; seed += 1) {
            const rounds = createMatchRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, QUIZ_ROUNDS)
            for (const round of rounds) {
                assert.equal(round.options.length, 4)
                assert.equal(new Set(round.options).size, 4)
                assert.ok(round.options.includes(round.answer))
                for (const option of round.options) {
                    katex.renderToString(option, { throwOnError: true, strict: 'error' })
                    const sameGraph = [-2, -1, 0, 1, 2, 3].every((x) => Math.abs(equationAt(option, x) - curveAt(round.curve, x)) < 1e-9)
                    assert.equal(sameGraph, option === round.answer, `${option} for ${JSON.stringify(round.curve)}`)
                }
                checkTexts([round.why])
            }
        }
    }
})

test('funtzioak 3. DBH games: each walk story has one graph, never behind home', () => {
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 60; seed += 1) {
            const rounds = createStoryRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, QUIZ_ROUNDS)
            for (const round of rounds) {
                assert.deepEqual(round.answer, storyPositions(round.stretches))
                assert.equal(round.options.length, 3)
                assert.equal(new Set(round.options.map((option) => option.join())).size, 3)
                assert.ok(round.options.some((option) => option.join() === round.answer.join()))
                for (const option of round.options) assert.ok(option.every((distance) => distance >= 0 && distance <= 12))
                checkTexts([round.story])
            }
        }
    }
})

test('funtzioak 3. DBH games: the signs are read off the graph, and every pair comes up', () => {
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 60; seed += 1) {
            const rounds = createSignsRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, QUIZ_ROUNDS)
            assert.deepEqual([...new Set(rounds.map((round) => round.answer))].sort(), [...SIGN_PAIRS].sort())
            for (const round of rounds) {
                const curve = round.curve
                const first = curve.kind === 'line' ? curve.m : curve.kind === 'parabola' ? curve.a : 0
                const second = curve.kind === 'line' ? curve.n : curve.kind === 'parabola' ? (level === 1 ? curve.c : -curve.b / (2 * curve.a)) : 0
                assert.equal(round.answer, `${first > 0 ? '+' : '-'}${second > 0 ? '+' : '-'}`)
                assert.ok(second !== 0)
                checkTexts([signsWhy(round, level)])
            }
            for (const pair of SIGN_PAIRS) katex.renderToString(signsLatex(pair, SIGN_LETTERS[level]), { throwOnError: true, strict: 'error' })
        }
    }
})

test('funtzioak 3. DBH games: every detective case reaches a wrong value, and its fix gives the right one', () => {
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 80; seed += 1) {
            for (const item of createDetectiveCases(createRandom(seed * 7919 + level), level)) {
                assert.ok(detectiveLevels[level].includes(item.error))
                assert.ok(item.options.includes(item.error) && new Set(item.options).size === 3)
                assert.notEqual(item.reached, item.right)
                assert.ok(item.wrong >= 0 && item.wrong < item.lines.length)
                if (Number.isInteger(item.reached)) assert.ok(item.lines[item.lines.length - 1].latex.includes(String(item.reached)), `${item.error}: ${item.lines[item.lines.length - 1].latex}`)
                assert.ok(item.fix.includes(String(item.right)), `${item.error}: ${item.fix}`)
                for (const line of item.lines) katex.renderToString(line.latex, { throwOnError: true, strict: 'error' })
                katex.renderToString(item.fix, { throwOnError: true, strict: 'error' })
                checkTexts([item.problem])
            }
        }
    }
})
