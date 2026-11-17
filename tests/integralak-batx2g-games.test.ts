import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { localize } from '../src/pages/batx1-zientziak-funtzioak/text.ts'
import { BACH2G_INTEGRALS_MEMORY_PAIRS, createBach2gIntegralsMemoryBoard } from '../src/pages/batx2-gizarte-integralak/games/boards.ts'
import { BACH2G_INTEGRALS_DETECTIVE_ERRORS, bach2gIntegralsDetectiveNames, bach2gIntegralsDetectiveTips, createBach2gIntegralsDetectiveCases } from '../src/pages/batx2-gizarte-integralak/games/detective.ts'
import { bach2gIntegralsGameModeForPath, bach2gIntegralsGameProgressIds, bach2gIntegralsGames, bach2gIntegralsGameSlugs } from '../src/pages/batx2-gizarte-integralak/games/info.ts'
import { BACH2G_INTEGRALS_RACE_CIRCUITS, generateBach2gIntegralsRaceQuestion } from '../src/pages/batx2-gizarte-integralak/games/race.ts'
import { createSignedRounds, SIGNED_ROUNDS } from '../src/pages/batx2-gizarte-integralak/games/signedArea.ts'
import { createWhichPrimitiveRounds, WHICH_PRIMITIVE_ROUNDS } from '../src/pages/batx2-gizarte-integralak/games/whichPrimitive.ts'

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

test('integralak batx2 g games: the list, the ids and the addresses', () => {
    assert.equal(bach2gIntegralsGames.length, 5)
    assert.equal(new Set(bach2gIntegralsGameProgressIds).size, bach2gIntegralsGameProgressIds.length)
    for (const id of bach2gIntegralsGameProgressIds) assert.ok(id >= 149401 && id <= 149899, `${id}`)
    const stages = ['primitives', 'composite', 'definite', 'areas', 'economy']
    for (const game of bach2gIntegralsGames) {
        for (const level of game.levels) assert.ok(stages.includes(level.stage), `${game.id}: ${level.stage}`)
        checkTexts([game.title, game.tagline, game.skills, ...game.levels.flatMap((level) => [level.title, level.description])])
        assert.equal(bach2gIntegralsGameModeForPath(`/matematika/batx2-gizarte/integrales/jokuak/${bach2gIntegralsGameSlugs[game.id]}`), game.id)
    }
})

test('integralak batx2 g games: which antiderivative is it?', () => {
    for (let seed = 1; seed <= 40; seed += 1) {
        for (let level = 0; level < 3; level += 1) {
            const rounds = createWhichPrimitiveRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, WHICH_PRIMITIVE_ROUNDS)
            for (const round of rounds) {
                render(round.latex)
                render(round.working)
                assert.equal(round.options.length, 4)
                const xs = [0.4, 0.9, 1.7, 2.3]
                const d = (fn: (x: number) => number, x: number) => (fn(x + 1e-6) - fn(x - 1e-6)) / 2e-6
                for (const [index, option] of round.options.entries()) {
                    render(option.latex)
                    const isPrimitive = xs.every((x) => Math.abs(d(option.fn, x) - round.f(x)) < 1e-3 * Math.max(1, Math.abs(round.f(x))))
                    assert.equal(isPrimitive, index === round.answer, `${round.latex}: ${option.latex}`)
                }
            }
        }
    }
})

test('integralak batx2 g games: signed area', () => {
    for (let seed = 1; seed <= 40; seed += 1) {
        for (let level = 0; level < 3; level += 1) {
            const rounds = createSignedRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, SIGNED_ROUNDS)
            for (const round of rounds) {
                checkTexts([round.prompt])
                render(round.working)
                const { integral, area } = round.meta
                if (round.answer === 'area') assert.ok(Math.abs(integral - area) < 1e-9 && integral > 0, round.prompt.es)
                if (round.answer === 'minus') assert.ok(Math.abs(-integral - area) < 1e-9 && integral < 0, round.prompt.es)
                if (round.answer === 'split') assert.ok(Math.abs(Math.abs(integral) - area) > 1e-9, round.prompt.es)
            }
        }
    }
})

test('integralak batx2 g games: the detective', () => {
    checkTexts([...Object.values(bach2gIntegralsDetectiveNames), ...Object.values(bach2gIntegralsDetectiveTips)])
    const seen = new Set<string>()
    for (let seed = 1; seed <= 40; seed += 1) {
        for (let level = 0; level < 3; level += 1) {
            for (const item of createBach2gIntegralsDetectiveCases(createRandom(seed * 7919 + level), level)) {
                seen.add(item.error)
                assert.equal(item.lines.length, 3)
                assert.notEqual(item.right, item.reached)
                checkTexts([item.problem, ...item.lines.map((line) => line.label)])
                for (const language of languages) {
                    for (const line of item.lines) render(line.latex, language)
                    for (const part of item.fix.split('\\ \\to\\ ')) render(part, language)
                }
            }
        }
    }
    assert.deepEqual([...seen].sort(), [...BACH2G_INTEGRALS_DETECTIVE_ERRORS].sort())
})

test('integralak batx2 g games: the race, every answer checked against its meta', () => {
    const kinds = new Set<string>()
    for (let seed = 1; seed <= 60; seed += 1) {
        for (let circuit = 0; circuit < BACH2G_INTEGRALS_RACE_CIRCUITS; circuit += 1) {
            const question = generateBach2gIntegralsRaceQuestion(createRandom(seed * 7919 + circuit), circuit, 0)
            kinds.add(question.kind)
            assert.equal(question.circuit, circuit)
            assert.equal(question.options.filter((option) => option.correct).length, 1)
            assert.equal(new Set(question.options.map((option) => option.latex)).size, 4)
            checkTexts([question.prompt, question.solution])
            for (const option of question.options) render(option.latex)
            const answer = question.answer.numerator / question.answer.denominator
            const m = question.meta
            const num = (fn: (x: number) => number, a: number, b: number) => { let sum = 0; for (let k = 0; k < 4000; k++) sum += fn(a + ((k + 0.5) * (b - a)) / 4000); return (sum * (b - a)) / 4000 }
            const expected: Record<string, () => number> = {
                power: () => num((x) => m.a * x ** m.n, 0, m.b),
                coefficient: () => m.k * (m.n + 1),
                constant: () => m.v - m.a,
                chain: () => m.n + 1,
                log: () => m.m / 2,
                exp: () => m.a / m.k,
                line: () => num((x) => 2 * x + m.c, m.a, m.b),
                parabola: () => num((x) => 3 * x * x, 0, m.b),
                join: () => m.p + m.q,
                under: () => num((x) => m.k * x * x, 0, m.b),
                cross: () => num((x) => Math.abs(x), -m.r, m.s),
                between: () => num((x) => Math.abs(m.a * x - x * x), 0, m.a),
                cost: () => m.K + num((x) => 2 * x + m.b, 0, m.x),
                pile: () => num((t) => 2 * m.m * t, 0, m.T),
                income: () => num((x) => m.p - 2 * x, m.a, m.b)
            }
            assert.ok(Math.abs(answer - expected[question.kind]()) < 1e-2, `${question.kind}: ${question.prompt.es} → ${answer} vs ${expected[question.kind]()}`)
        }
    }
    assert.equal(kinds.size, 15)
})

test('integralak batx2 g games: memory', () => {
    for (let seed = 1; seed <= 40; seed += 1) {
        for (let level = 0; level < 3; level += 1) {
            const cards = createBach2gIntegralsMemoryBoard(createRandom(seed * 7919 + level), level)
            assert.equal(cards.length, BACH2G_INTEGRALS_MEMORY_PAIRS * 2)
            for (const card of cards) {
                render(card.latex)
                render(card.explain!)
            }
            const answers = cards.filter((card) => card.id.endsWith('-a')).map((card) => card.latex)
            assert.equal(new Set(answers).size, BACH2G_INTEGRALS_MEMORY_PAIRS)
        }
    }
})
