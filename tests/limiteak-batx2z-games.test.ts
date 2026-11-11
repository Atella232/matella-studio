import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { localize } from '../src/pages/batx1-zientziak-funtzioak/text.ts'
import { ASSURE_ROUNDS, assureBin, continuousOn, createAssureRounds, intervalLatex } from '../src/pages/batx2-zientziak-limiteak/games/assure.ts'
import { BACH2_LIMITS_MEMORY_PAIRS, createBach2LimitsMemoryBoard } from '../src/pages/batx2-zientziak-limiteak/games/boards.ts'
import { BACH2_LIMITS_DETECTIVE_ERRORS, bach2LimitsDetectiveNames, bach2LimitsDetectiveTips, createBach2LimitsDetectiveCases } from '../src/pages/batx2-zientziak-limiteak/games/detective.ts'
import { changesOf, createHuntRounds, HUNT_ROUNDS } from '../src/pages/batx2-zientziak-limiteak/games/hunt.ts'
import { bach2LimitsGameModeForPath, bach2LimitsGameProgressIds, bach2LimitsGames, bach2LimitsGameSlugs } from '../src/pages/batx2-zientziak-limiteak/games/info.ts'
import { BACH2_LIMITS_RACE_CIRCUITS, generateBach2LimitsRaceQuestion } from '../src/pages/batx2-zientziak-limiteak/games/race.ts'
import { compareTerms, createWinnerRounds, leadingTerm, WINNER_ROUNDS, type Term } from '../src/pages/batx2-zientziak-limiteak/games/winner.ts'

const languages = ['eu', 'es', 'en', 'ar'] as const
const render = (latex: string, language: (typeof languages)[number] = 'es') => katex.renderToString(formulaFor(language, localize(language, latex)), { throwOnError: true, strict: 'error' })

function checkTexts(texts: LocalizedText[]) {
    for (const text of texts) {
        for (const language of languages) {
            assert.ok(text[language].length > 0)
            for (const [, formula] of text[language].matchAll(/\$([^$]+)\$/g)) katex.renderToString(formulaFor(language, formula), { throwOnError: true, strict: 'error' })
        }
        assert.ok(!text.ar.includes('{,}'), text.ar)
        assert.ok(!/[؀-ۿ]/.test([...text.ar.matchAll(/\$([^$]+)\$/g)].map((match) => match[1]).join('')), text.ar)
        assert.ok(!/\d(?:ri|ren|rekin|ekin|ek|ak|ra|tik|z|ei|en|k)(?![a-zA-Z])/.test(text.eu.replace(/\$[^$]+\$/g, '')), text.eu)
        assert.ok(!/\$(?:ri|ren|rekin|z|ra|tik|ei)(?![a-zA-Z])/.test(text.eu), text.eu)
    }
}

const value = (latex: string): number => {
    const fraction = latex.match(/^(-?)\\frac\{(\d+)\}\{(\d+)\}$/)
    if (fraction) return (fraction[1] ? -1 : 1) * Number(fraction[2]) / Number(fraction[3])
    return Number(latex.replace('{,}', '.'))
}

test('limiteak batx2 z games: the list, the ids and the addresses', () => {
    assert.equal(bach2LimitsGames.length, 8)
    assert.equal(new Set(bach2LimitsGameProgressIds).size, bach2LimitsGameProgressIds.length)
    for (const id of bach2LimitsGameProgressIds) assert.ok(id >= 122401 && id <= 122899, `${id}`)
    const stages = ['review', 'definition', 'notable', 'continuity', 'theorems']
    for (const game of bach2LimitsGames) {
        for (const level of game.levels) assert.ok(stages.includes(level.stage), `${game.id}: ${level.stage}`)
        checkTexts([game.title, game.tagline, game.skills, ...game.levels.flatMap((level) => [level.title, level.description])])
        assert.equal(bach2LimitsGameModeForPath(`/matematika/batx2-zientziak/limites-continuidad/jokuak/${bach2LimitsGameSlugs[game.id]}`), game.id)
    }
})

/** The value of c · aˣ · xᵖ · (ln x)^q, as a natural logarithm, at x = e^t */
const logTerm = (term: Term, t: number) => Math.log(term.c) + Math.exp(t) * Math.log(term.base) + term.p * t + term.q * Math.log(t)

test('limiteak batx2 z games: who wins?', () => {
    for (let seed = 1; seed <= 40; seed += 1) {
        for (let level = 0; level < 3; level += 1) {
            const rounds = createWinnerRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, WINNER_ROUNDS)
            for (const round of rounds) {
                render(round.limit)
                const a = leadingTerm(round.top)
                const b = leadingTerm(round.bottom)
                // Far out, the gap between the logarithms of the leading terms grows, shrinks or stays as the bin says
                const gap = (t: number) => logTerm(a, t) - logTerm(b, t)
                const order = compareTerms(a, b)
                if (round.bin === 'zero') assert.ok(order < 0 && gap(60) < gap(50), round.limit)
                if (round.bin === 'infinity') assert.ok(order > 0 && gap(60) > gap(50), round.limit)
                if (round.bin === 'number') {
                    assert.equal(order, 0, round.limit)
                    assert.ok(Math.abs(value(round.value!) - a.c / b.c) < 1e-9, round.limit)
                }
            }
        }
    }
})

test('limiteak batx2 z games: does the theorem ensure it?', () => {
    for (let seed = 1; seed <= 40; seed += 1) {
        for (let level = 0; level < 3; level += 1) {
            const rounds = createAssureRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, ASSURE_ROUNDS)
            for (const round of rounds) {
                render(`f(x)=${round.fn.latex}\\quad ${intervalLatex(round)}`)
                assert.equal(round.bin, assureBin(round))
                if (level === 0) assert.equal(round.claim, 'root')
                // A «yes» is true: continuous on a closed interval, and what is claimed is there
                if (round.bin === 'yes') {
                    assert.ok(continuousOn(round) && round.closed[0] && round.closed[1])
                    const samples = Array.from({ length: 2001 }, (_, i) => round.fn.f(round.a + ((round.b - round.a) * i) / 2000))
                    assert.ok(samples.every(Number.isFinite))
                    if (round.claim === 'root') assert.ok(samples.some((y, i) => i > 0 && y * samples[i - 1] <= 0))
                    if (round.claim === 'value') assert.ok(samples.some((y, i) => i > 0 && (y - round.k) * (samples[i - 1] - round.k) <= 0))
                }
                // Continuity fails only where there is a break or the domain ends
                if (round.bin === 'continuity') assert.ok(round.fn.breaks.some((x) => x >= round.a && x <= round.b) || (round.fn.from !== undefined && round.a <= round.fn.from))
            }
        }
    }
})

test('limiteak batx2 z games: hunt the roots', () => {
    for (let seed = 1; seed <= 40; seed += 1) {
        for (let level = 0; level < 3; level += 1) {
            const rounds = createHuntRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, HUNT_ROUNDS)
            for (const round of rounds) {
                render(round.latex)
                render(`h(x)=${round.hLatex}`)
                assert.deepEqual(round.right, changesOf(round.h))
                if (level === 0) assert.equal(round.right.length, 1)
                if (level === 1) assert.equal(round.right.length, 3)
                for (const n of [-3, -2, -1, 0, 1, 2, 3]) assert.ok(Math.abs(round.h(n)) > 1e-9)
                // The written h is the function: compare at a few points
                const written = (x: number) => Function('x', `return ${round.hLatex.replace(/\^(\d)/g, '**$1').replace(/(\d)x/g, '$1*x')}`)(x) as number
                for (const x of [-2.5, -0.5, 0.7, 1.9]) assert.ok(Math.abs(written(x) - round.h(x)) < 1e-9, round.hLatex)
            }
        }
    }
})

test('limiteak batx2 z games: the detective', () => {
    checkTexts([...Object.values(bach2LimitsDetectiveNames), ...Object.values(bach2LimitsDetectiveTips)])
    const seen = new Set<string>()
    for (let seed = 1; seed <= 40; seed += 1) {
        for (let level = 0; level < 3; level += 1) {
            for (const item of createBach2LimitsDetectiveCases(createRandom(seed * 7919 + level), level)) {
                seen.add(item.error)
                assert.equal(item.lines.length, 3)
                assert.ok(item.wrong >= 0 && item.wrong < 3)
                assert.notEqual(item.right, item.reached)
                checkTexts([item.problem, ...item.lines.map((line) => line.label)])
                for (const language of languages) {
                    for (const line of item.lines) render(line.latex, language)
                    for (const part of item.fix.split('\\ \\to\\ ')) render(part, language)
                }
            }
        }
    }
    assert.deepEqual([...seen].sort(), [...BACH2_LIMITS_DETECTIVE_ERRORS].sort())
})

test('limiteak batx2 z games: the race, every answer checked against its meta', () => {
    const kinds = new Set<string>()
    for (let seed = 1; seed <= 60; seed += 1) {
        for (let circuit = 0; circuit < BACH2_LIMITS_RACE_CIRCUITS; circuit += 1) {
            const question = generateBach2LimitsRaceQuestion(createRandom(seed * 7919 + circuit), circuit, 'base')
            kinds.add(question.kind)
            assert.equal(question.options.filter((option) => option.correct).length, 1)
            assert.equal(new Set(question.options.map((option) => option.latex)).size, 4)
            checkTexts([question.prompt, question.solution])
            for (const option of question.options) render(option.latex)
            const answer = question.answer.numerator / question.answer.denominator
            const m = question.meta
            const expected: Record<string, () => number> = {
                factor: () => 2 * m.a,
                degrees: () => m.p / m.q,
                conjugate: () => m.p / 2,
                delta: () => m.epsilon / m.m,
                k: () => m.d / m.epsilon,
                minus: () => -m.p,
                sine: () => m.p / m.q,
                e: () => m.p * m.q,
                orders: () => m.p / m.q,
                'exp-sine': () => m.q - 1,
                poly: () => m.m * m.t + m.c - m.t * m.t,
                two: () => 2 * (m.p + m.q),
                bolzano: () => m.n,
                count: () => {
                    const f = (x: number) => x ** 3 - m.b * x + m.c
                    return [-3, -2, -1, 0, 1, 2].filter((x) => f(x) * f(x + 1) < 0).length
                },
                max: () => Math.max(m.alpha ** 2 + m.p * m.alpha, m.beta ** 2 + m.p * m.beta)
            }
            assert.ok(Math.abs(answer - expected[question.kind]()) < 1e-9, `${question.kind}: ${question.prompt.es}`)
            // The checks behind the meta: Bolzano's root is there, the limits are what the formulas give
            if (question.kind === 'bolzano') {
                const f = (x: number) => x ** 3 + x - m.q
                assert.ok(f(m.n) < 0 && f(m.n + 1) > 0)
            }
            if (question.kind === 'sine') assert.ok(Math.abs(Math.sin(m.p * 1e-6) / (m.q * 1e-6) - answer) < 1e-6)
            if (question.kind === 'minus') assert.ok(Math.abs((m.p * -1e6) / Math.sqrt(1e12 + m.q) - answer) < 1e-6)
        }
    }
    assert.equal(kinds.size, 15)
})

test('limiteak batx2 z games: memory', () => {
    for (let seed = 1; seed <= 40; seed += 1) {
        for (let level = 0; level < 3; level += 1) {
            const cards = createBach2LimitsMemoryBoard(createRandom(seed * 7919 + level), level)
            assert.equal(cards.length, BACH2_LIMITS_MEMORY_PAIRS * 2)
            for (const card of cards) {
                render(card.latex)
                render(card.explain)
                assert.ok(!card.latex.includes('\\sin'), 'memory cards are not translated: no sines')
            }
            const answers = cards.filter((card) => card.id.endsWith('-a')).map((card) => card.latex)
            assert.equal(new Set(answers).size, BACH2_LIMITS_MEMORY_PAIRS)
        }
    }
})
