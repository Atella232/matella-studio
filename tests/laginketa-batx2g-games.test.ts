import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import type { Tier } from '../src/features/unit-v2/games/raceCore.ts'
import { toNumber } from '../src/features/unit-v2/math/fraction.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { below } from '../src/pages/batx2-zientziak-banaketak/normal.ts'
import { criticalZ } from '../src/pages/batx2-gizarte-banaketak/critical.ts'
import { ALLOCATE_ROUNDS, createAllocateRounds, largestRemainders } from '../src/pages/batx2-gizarte-laginketa/games/allocate.ts'
import { BIAS_ROUNDS, createBiasRounds, kindNames, STUDIES } from '../src/pages/batx2-gizarte-laginketa/games/bias.ts'
import { createSamplingBatx2gMemoryBoard, SAMPLING_BATX2G_MEMORY_PAIRS, samplingBatx2gMemoryLevels } from '../src/pages/batx2-gizarte-laginketa/games/boards.ts'
import { createSamplingBatx2gDetectiveCases, SAMPLING_BATX2G_DETECTIVE_CASES, samplingBatx2gDetectiveLevels, samplingBatx2gDetectiveNames, samplingBatx2gDetectiveTips } from '../src/pages/batx2-gizarte-laginketa/games/detective.ts'
import { samplingBatx2gGameModeForPath, samplingBatx2gGameProgressIds, samplingBatx2gGames, samplingBatx2gGameSlugs } from '../src/pages/batx2-gizarte-laginketa/games/info.ts'
import { checkSamplingBatx2gPitAnswer, generateSamplingBatx2gRaceQuestion, SAMPLING_BATX2G_RACE_CIRCUITS, samplingBatx2gRaceErrorTips } from '../src/pages/batx2-gizarte-laginketa/games/race.ts'
import { evaluate, near } from './latex-math.ts'

/* Laginketa · 2.º Bachillerato Ciencias Sociales: the games. */

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

const numberOf = (latex: string) => Number(latex.replace('{,}', '.'))

test('laginketa batx2 g games: the hub, its levels and progress ids', () => {
    assert.deepEqual(samplingBatx2gGames.map((game) => game.id), ['race', 'bias', 'allocate', 'detective', 'memory'])
    assert.equal(new Set(samplingBatx2gGameProgressIds).size, samplingBatx2gGameProgressIds.length)
    for (const id of samplingBatx2gGameProgressIds) assert.ok(id >= 152401 && id <= 152899, `${id}`)
    for (const game of samplingBatx2gGames) {
        for (const level of game.levels) assert.ok(['sampling', 'strata', 'means', 'proportions', 'characteristic'].includes(level.stage), `${game.id}: ${level.stage}`)
        checkTexts([game.title, game.tagline, game.skills, ...game.levels.flatMap((level) => [level.title, level.description])])
        assert.equal(samplingBatx2gGameModeForPath(`/x/jokuak/${samplingBatx2gGameSlugs[game.id]}`), game.id)
    }
})

test('laginketa batx2 g games: is it biased?', () => {
    for (const study of STUDIES) {
        checkTexts([study.goal, ...study.plans.flatMap((plan) => [plan.text, ...(plan.why ? [plan.why] : [])])])
        assert.equal(study.plans[0].why, null)
        assert.ok(study.plans.slice(1).every((plan) => plan.why !== null))
    }
    checkTexts(Object.values(kindNames))
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 60; seed += 1) {
            const rounds = createBiasRounds(createRandom(seed * 29 + level), level)
            assert.equal(rounds.length, BIAS_ROUNDS)
            for (const round of rounds) {
                if (round.kind === 'fair-or-not') assert.equal(round.fair, round.plan === 0)
                if (round.kind === 'pick-fair') assert.equal(round.order[round.answer], 0)
                if (round.kind === 'which-kind') checkTexts([round.text])
            }
            if (level === 0) {
                const fair = rounds.filter((round) => round.kind === 'fair-or-not' && round.fair).length
                assert.ok(fair >= 2 && fair <= 3)
            }
            if (level === 2) assert.equal(new Set(rounds.map((round) => round.kind === 'which-kind' && round.answer)).size, 4)
        }
    }
})

test('laginketa batx2 g games: split the sample', () => {
    assert.deepEqual(largestRemainders([460, 290, 250], 30), [14, 9, 7])
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 60; seed += 1) {
            const rounds = createAllocateRounds(createRandom(seed * 37 + level), level)
            assert.equal(rounds.length, ALLOCATE_ROUNDS)
            for (const round of rounds) {
                assert.equal(new Set(round.options).size, 3)
                assert.equal(round.options.filter((option) => option === round.answer).length, 1)
                for (const option of round.options) render(option)
                render(round.work)
                checkTexts([round.prompt])
                const numbers = [...round.prompt.es.matchAll(/\d+/g)].map((match) => Number(match[0]))
                if (level < 2) {
                    // N_A, N_B, N_C and n, read back from the prompt
                    const [a, b, c, n] = numbers.filter((value) => value !== 0).slice(-4)
                    const shares = round.answer.replace(/[()\\ ]/g, '').split(',').map(Number)
                    assert.equal(shares.reduce((x, y) => x + y, 0), n, round.prompt.es)
                    assert.deepEqual(shares, largestRemainders([a, b, c], n), round.prompt.es)
                } else {
                    const [population, n, m] = numbers
                    assert.equal(Number(round.answer), (m * population) / n)
                }
            }
        }
    }
})

test('laginketa batx2 g games: the detective has one wrong line, with a mistake of this unit', () => {
    assert.deepEqual(Object.keys(samplingBatx2gDetectiveNames).sort(), samplingBatx2gDetectiveLevels.flat().sort())
    checkTexts([...Object.values(samplingBatx2gDetectiveNames), ...Object.values(samplingBatx2gDetectiveTips)])
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 40; seed += 1) {
            const cases = createSamplingBatx2gDetectiveCases(createRandom(seed * 13 + level), level)
            assert.equal(cases.length, SAMPLING_BATX2G_DETECTIVE_CASES)
            for (const item of cases) {
                assert.equal(item.lines.length, 3)
                assert.ok(!near(item.right, item.reached), `${item.error}`)
                checkTexts([item.problem, ...item.lines.map((entry) => entry.label)])
                for (const entry of item.lines) render(entry.latex)
                render(item.fix)
                const last = item.fix.replace(/\{,\}/g, '.').split(/=|\\to/).at(-1)!.replace(/^\\ /, '').trim()
                const reached = evaluate(last)
                if (reached !== null && !last.includes(';')) assert.ok(Math.abs(reached - item.right) < 0.0006, `${item.error}: ${item.fix} vs ${item.right}`)
            }
        }
    }
})

test('laginketa batx2 g games: every race question has one right option, worked out from its numbers', () => {
    const kinds = new Set<string>()
    for (let circuit = 0; circuit < SAMPLING_BATX2G_RACE_CIRCUITS; circuit += 1) {
        for (const tier of [0, 1, 2] as Tier[]) {
            for (let seed = 1; seed <= 60; seed += 1) {
                const question = generateSamplingBatx2gRaceQuestion(createRandom(seed * 7919 + circuit * 31 + tier), circuit, tier)
                kinds.add(question.kind)
                assert.equal(question.circuit, circuit)
                assert.equal(question.options.length, 4, question.kind)
                assert.equal(question.options.filter((option) => option.correct).length, 1, question.kind)
                assert.equal(new Set(question.options.map((option) => option.latex)).size, 4, `${question.kind}: ${question.options.map((option) => option.latex).join(' | ')}`)
                for (const option of question.options) render(option.latex)
                checkTexts([question.prompt, question.solution])
                const right = question.options.find((option) => option.correct)!
                const typed = right.latex.replace('{,}', ',').replace(/\\frac\{(\d+)\}\{(\d+)\}/, '$1/$2')
                assert.equal(checkSamplingBatx2gPitAnswer(question, typed), 'correct', `${question.kind}: ${right.latex}`)
                for (const option of question.options.filter((item) => !item.correct)) assert.ok(option.error && samplingBatx2gRaceErrorTips[option.error], question.kind)
                const m = question.meta
                const expected: Record<string, () => number> = {
                    step: () => m.population / m.n,
                    chosen: () => m.start + (m.k - 1) * m.h,
                    share: () => (m.n * m.a) / (m.a + m.b + m.c),
                    equal: () => m.n / m.k,
                    'mean-sd': () => m.sd / Math.sqrt(m.n),
                    'mean-tail': () => 1 - below(m.z) / 10_000,
                    proportion: () => m.x / m.n,
                    'proportion-sd': () => Math.sqrt((m.p * (1 - m.p)) / m.n),
                    radius: () => (criticalZ(m.level) * m.sd) / Math.sqrt(m.n),
                    end: () => m.mean - (criticalZ(95) * m.sd) / Math.sqrt(m.n)
                }
                assert.ok(near(toNumber(question.answer), expected[question.kind]()), `${question.kind}: ${toNumber(question.answer)}`)
                if (question.kind === 'mean-tail') assert.ok(near((m.x - m.mean) / (m.sd / Math.sqrt(m.n)), m.z))
            }
        }
    }
    assert.equal(kinds.size, 10)
})

test('laginketa batx2 g games: memory pairs have one partner each, and each pair is right', () => {
    for (let level = 0; level < samplingBatx2gMemoryLevels.length; level += 1) {
        for (let seed = 1; seed <= 40; seed += 1) {
            const cards = createSamplingBatx2gMemoryBoard(createRandom(seed * 11 + level), level)
            assert.equal(cards.length, 2 * SAMPLING_BATX2G_MEMORY_PAIRS)
            assert.equal(new Set(cards.map((card) => card.latex)).size, cards.length)
            for (const card of cards) {
                render(card.latex)
                assert.equal(cards.filter((other) => other.setId === card.setId).length, 2)
            }
            for (let set = 0; set < SAMPLING_BATX2G_MEMORY_PAIRS; set += 1) {
                const [first, second] = cards.filter((card) => card.setId === set)
                const question = first.id.endsWith('-q') ? first.latex : second.latex
                const answer = (first.id.endsWith('-a') ? first.latex : second.latex).split('=').at(-1)!
                const numbers = [...question.matchAll(/\d+(?:\{,\}\d+)?/g)].map((match) => numberOf(match[0]))
                const value = numberOf(answer)
                if (level === 0) assert.ok(near(value, numbers[0] / numbers[1]), `${question} ${answer}`)
                if (level === 1) assert.ok(near(value, numbers[0] / Math.sqrt(numbers[1])), `${question} ${answer}`)
                if (level === 2) assert.ok(near(value, Math.sqrt((numbers[0] * (1 - numbers[0])) / numbers[1])), `${question} ${answer}`)
            }
        }
    }
})
