import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import type { Tier } from '../src/features/unit-v2/games/raceCore.ts'
import { toNumber } from '../src/features/unit-v2/math/fraction.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { criticalZ } from '../src/pages/batx2-gizarte-banaketak/critical.ts'
import { BACKWARDS_ROUNDS, createBackwardsRounds } from '../src/pages/batx2-gizarte-inferentzia/games/backwards.ts'
import { createInferenceBatx2gMemoryBoard, INFERENCE_BATX2G_MEMORY_PAIRS, inferenceBatx2gMemoryLevels } from '../src/pages/batx2-gizarte-inferentzia/games/boards.ts'
import { createInferenceBatx2gDetectiveCases, INFERENCE_BATX2G_DETECTIVE_CASES, inferenceBatx2gDetectiveLevels, inferenceBatx2gDetectiveNames, inferenceBatx2gDetectiveTips } from '../src/pages/batx2-gizarte-inferentzia/games/detective.ts'
import { inferenceBatx2gGameModeForPath, inferenceBatx2gGameProgressIds, inferenceBatx2gGames, inferenceBatx2gGameSlugs } from '../src/pages/batx2-gizarte-inferentzia/games/info.ts'
import { checkInferenceBatx2gPitAnswer, generateInferenceBatx2gRaceQuestion, INFERENCE_BATX2G_RACE_CIRCUITS, inferenceBatx2gRaceErrorTips } from '../src/pages/batx2-gizarte-inferentzia/games/race.ts'
import { createTruthRounds, TRUTH_POOLS, TRUTH_ROUNDS } from '../src/pages/batx2-gizarte-inferentzia/games/truth.ts'
import { evaluate, near } from './latex-math.ts'

/* Inferentzia · 2.º Bachillerato Ciencias Sociales: the games. */

const languages = ['eu', 'es', 'en', 'ar'] as const
const render = (latex: string, language: (typeof languages)[number] = 'es') => katex.renderToString(formulaFor(language, latex), { throwOnError: true, strict: 'error' })

function checkTexts(texts: LocalizedText[]) {
    for (const text of texts) {
        for (const language of languages) {
            assert.ok(text[language].length > 0)
            for (const [, formula] of text[language].matchAll(/\$([^$]+)\$/g)) render(formula, language)
        }
        assert.ok(!text.ar.includes('{,}'), text.ar)
        const formulas = (value: string) => [...value.matchAll(/\$([^$]+)\$/g)].map((match) => match[1].replace(/\{,\}/g, '.')).sort()
        for (const language of ['eu', 'en', 'ar'] as const) assert.deepEqual(formulas(text[language]), formulas(text.es), `${language}: ${text[language]}`)
        assert.ok(!/\d[a-zñ]/.test(text.eu.replace(/\$[^$]+\$/g, '')), text.eu)
    }
}

const numberOf = (latex: string) => Number(latex.replace('{,}', '.').replace(/\\,/g, ''))
const up = (value: number) => Math.ceil(value - 1e-9)

test('inferentzia batx2 g games: the hub, its levels and progress ids', () => {
    assert.deepEqual(inferenceBatx2gGames.map((game) => game.id), ['race', 'truth', 'backwards', 'detective', 'memory'])
    assert.equal(new Set(inferenceBatx2gGameProgressIds).size, inferenceBatx2gGameProgressIds.length)
    for (const id of inferenceBatx2gGameProgressIds) assert.ok(id >= 153401 && id <= 153899, `${id}`)
    for (const game of inferenceBatx2gGames) {
        for (const level of game.levels) assert.ok(['estimation', 'mean-ci', 'error-size', 'proportion-ci', 'decisions'].includes(level.stage), `${game.id}: ${level.stage}`)
        checkTexts([game.title, game.tagline, game.skills, ...game.levels.flatMap((level) => [level.title, level.description])])
        assert.equal(inferenceBatx2gGameModeForPath(`/x/jokuak/${inferenceBatx2gGameSlugs[game.id]}`), game.id)
    }
})

test('inferentzia batx2 g games: true or false?', () => {
    for (const pool of [TRUTH_POOLS.MEANING, TRUTH_POOLS.CHANGES]) {
        checkTexts(pool.flatMap((round) => [round.sentence, round.why]))
        assert.ok(pool.filter((round) => round.truth).length >= TRUTH_ROUNDS / 2 && pool.filter((round) => !round.truth).length >= TRUTH_ROUNDS / 2)
    }
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 60; seed += 1) {
            const rounds = createTruthRounds(createRandom(seed * 41 + level), level)
            assert.equal(rounds.length, TRUTH_ROUNDS)
            assert.equal(rounds.filter((round) => round.truth).length, TRUTH_ROUNDS / 2)
            if (level < 2) continue
            for (const round of rounds) {
                checkTexts([round.context!, round.sentence, round.why])
                const [low, high] = [...round.context!.es.matchAll(/(\d+(?:\{,\}\d+)?);\\ (\d+(?:\{,\}\d+)?)/g)][0].slice(1).map(numberOf)
                const value = numberOf(round.sentence.es.match(/=(-?[\d{},]+)\$/)![1])
                const sentence = round.sentence.es
                if (sentence.startsWith('$\\bar{x}')) assert.equal(near(value, (low + high) / 2), round.truth, sentence)
                else if (sentence.startsWith('$E')) assert.equal(near(value, (high - low) / 2), round.truth, sentence)
                else assert.equal(value >= low - 1e-9 && value <= high + 1e-9, round.truth, sentence)
            }
        }
    }
})

test('inferentzia batx2 g games: from the interval to the data', () => {
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 60; seed += 1) {
            const rounds = createBackwardsRounds(createRandom(seed * 43 + level), level)
            assert.equal(rounds.length, BACKWARDS_ROUNDS)
            for (const round of rounds) {
                assert.equal(new Set(round.options).size, 3)
                assert.equal(round.options.filter((option) => option === round.answer).length, 1)
                for (const option of round.options) render(option)
                render(round.work)
                checkTexts([round.prompt])
                const [low, high] = [...round.prompt.es.matchAll(/\((\d+(?:\{,\}\d+)?);\\ (\d+(?:\{,\}\d+)?)\)/g)][0].slice(1).map(numberOf)
                if (level === 0) {
                    const expected = round.prompt.es.includes('\\bar{x}$?') ? (low + high) / 2 : (high - low) / 2
                    assert.ok(near(numberOf(round.answer), expected), round.prompt.es)
                } else {
                    const sd = Number(round.prompt.es.match(/\\sigma=(\d+)/)![1])
                    const error = (high - low) / 2
                    if (level === 1) {
                        const z = criticalZ(Number(round.prompt.es.match(/al (\d+)/)![1]))
                        assert.ok(near(Number(round.answer), ((z * sd) / error) ** 2), round.prompt.es)
                    } else {
                        const n = Number(round.prompt.es.match(/n=(\d+)/)![1])
                        const level = Number(round.answer.replace('\\,\\%', ''))
                        assert.ok(near(criticalZ(level), (error * Math.sqrt(n)) / sd), round.prompt.es)
                    }
                }
            }
        }
    }
})

test('inferentzia batx2 g games: the detective has one wrong line, with a mistake of this unit', () => {
    assert.deepEqual(Object.keys(inferenceBatx2gDetectiveNames).sort(), inferenceBatx2gDetectiveLevels.flat().sort())
    checkTexts([...Object.values(inferenceBatx2gDetectiveNames), ...Object.values(inferenceBatx2gDetectiveTips)])
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 40; seed += 1) {
            const cases = createInferenceBatx2gDetectiveCases(createRandom(seed * 13 + level), level)
            assert.equal(cases.length, INFERENCE_BATX2G_DETECTIVE_CASES)
            for (const item of cases) {
                assert.equal(item.lines.length, 3)
                assert.ok(!near(item.right, item.reached), `${item.error}`)
                checkTexts([item.problem, ...item.lines.map((entry) => entry.label)])
                for (const entry of item.lines) render(entry.latex)
                render(item.fix)
                const last = item.fix.replace(/\{,\}/g, '.').split(/=|\\to/).at(-1)!.replace(/^\\ /, '').trim()
                const reached = evaluate(last)
                if (reached !== null) assert.ok(Math.abs(reached - item.right) < 0.0006, `${item.error}: ${item.fix} vs ${item.right}`)
            }
        }
    }
})

test('inferentzia batx2 g games: every race question has one right option, worked out from its numbers', () => {
    const kinds = new Set<string>()
    for (let circuit = 0; circuit < INFERENCE_BATX2G_RACE_CIRCUITS; circuit += 1) {
        for (const tier of [0, 1, 2] as Tier[]) {
            for (let seed = 1; seed <= 60; seed += 1) {
                const question = generateInferenceBatx2gRaceQuestion(createRandom(seed * 7919 + circuit * 31 + tier), circuit, tier)
                kinds.add(question.kind)
                assert.equal(question.circuit, circuit)
                assert.equal(question.options.length, 4, question.kind)
                assert.equal(question.options.filter((option) => option.correct).length, 1, question.kind)
                assert.equal(new Set(question.options.map((option) => option.latex)).size, 4, `${question.kind}: ${question.options.map((option) => option.latex).join(' | ')}`)
                for (const option of question.options) render(option.latex)
                checkTexts([question.prompt, question.solution])
                const right = question.options.find((option) => option.correct)!
                const typed = right.latex.replace('{,}', ',').replace(/\\frac\{(\d+)\}\{(\d+)\}/, '$1/$2')
                assert.equal(checkInferenceBatx2gPitAnswer(question, typed), 'correct', `${question.kind}: ${right.latex}`)
                for (const option of question.options.filter((item) => !item.correct)) assert.ok(option.error && inferenceBatx2gRaceErrorTips[option.error], question.kind)
                const m = question.meta
                const expected: Record<string, () => number> = {
                    proportion: () => m.x / m.n,
                    critical: () => criticalZ(m.level),
                    error: () => (criticalZ(m.level) * m.sd) / Math.sqrt(m.n),
                    end: () => m.mean - (criticalZ(95) * m.sd) / Math.sqrt(m.n),
                    size: () => up(((criticalZ(m.level) * m.sd) / m.e) ** 2),
                    quarter: () => m.error / Math.sqrt(m.factor),
                    'proportion-error': () => criticalZ(m.level) * Math.sqrt((m.p * (1 - m.p)) / m.n),
                    'proportion-size': () => up((criticalZ(m.level) ** 2 * 0.25) / m.e ** 2),
                    poll: () => 1.96 * Math.sqrt(0.25 / m.n),
                    width: () => m.e
                }
                assert.ok(near(toNumber(question.answer), expected[question.kind]()), `${question.kind}: ${toNumber(question.answer)}`)
            }
        }
    }
    assert.equal(kinds.size, 10)
})

test('inferentzia batx2 g games: memory pairs have one partner each, and each pair is right', () => {
    for (let level = 0; level < inferenceBatx2gMemoryLevels.length; level += 1) {
        for (let seed = 1; seed <= 40; seed += 1) {
            const cards = createInferenceBatx2gMemoryBoard(createRandom(seed * 11 + level), level)
            assert.equal(cards.length, 2 * INFERENCE_BATX2G_MEMORY_PAIRS)
            assert.equal(new Set(cards.map((card) => card.latex)).size, cards.length)
            for (const card of cards) {
                render(card.latex)
                assert.equal(cards.filter((other) => other.setId === card.setId).length, 2)
            }
            for (let set = 0; set < INFERENCE_BATX2G_MEMORY_PAIRS; set += 1) {
                const [first, second] = cards.filter((card) => card.setId === set)
                const question = first.id.endsWith('-q') ? first.latex : second.latex
                const answer = numberOf((first.id.endsWith('-a') ? first.latex : second.latex).split('=').at(-1)!)
                const numbers = [...question.matchAll(/\d+(?:\{,\}\d+)?/g)].map((match) => numberOf(match[0]))
                if (level === 0) assert.ok(near(answer, criticalZ(numbers[0])), `${question} ${answer}`)
                if (level === 1) assert.ok(near(answer, (numbers[0] + numbers[1]) / 2), `${question} ${answer}`)
                if (level === 2) assert.ok(near(answer, (numbers[1] - numbers[0]) / 2), `${question} ${answer}`)
            }
        }
    }
})
