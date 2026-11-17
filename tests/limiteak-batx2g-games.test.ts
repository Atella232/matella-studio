import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { localize } from '../src/pages/batx1-zientziak-funtzioak/text.ts'
import { BACH2G_LIMITS_MEMORY_PAIRS, createBach2gLimitsMemoryBoard } from '../src/pages/batx2-gizarte-limiteak/games/boards.ts'
import { CLOSE_ROUNDS, createCloseRounds, tariffSidesAt } from '../src/pages/batx2-gizarte-limiteak/games/closeTariff.ts'
import { BACH2G_LIMITS_DETECTIVE_ERRORS, bach2gLimitsDetectiveNames, bach2gLimitsDetectiveTips, createBach2gLimitsDetectiveCases } from '../src/pages/batx2-gizarte-limiteak/games/detective.ts'
import { bach2gLimitsGameModeForPath, bach2gLimitsGameProgressIds, bach2gLimitsGames, bach2gLimitsGameSlugs } from '../src/pages/batx2-gizarte-limiteak/games/info.ts'
import { createLongRunRounds, LONG_RUN_ROUNDS, modelAt } from '../src/pages/batx2-gizarte-limiteak/games/longRun.ts'
import { BACH2G_LIMITS_RACE_CIRCUITS, generateBach2gLimitsRaceQuestion } from '../src/pages/batx2-gizarte-limiteak/games/race.ts'

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

test('limiteak batx2 g games: the list, the ids and the addresses', () => {
    assert.equal(bach2gLimitsGames.length, 7)
    assert.equal(new Set(bach2gLimitsGameProgressIds).size, bach2gLimitsGameProgressIds.length)
    for (const id of bach2gLimitsGameProgressIds) assert.ok(id >= 145401 && id <= 145899, `${id}`)
    const stages = ['graph', 'infinity', 'point', 'continuity', 'context']
    for (const game of bach2gLimitsGames) {
        for (const level of game.levels) assert.ok(stages.includes(level.stage), `${game.id}: ${level.stage}`)
        checkTexts([game.title, game.tagline, game.skills, ...game.levels.flatMap((level) => [level.title, level.description])])
        assert.equal(bach2gLimitsGameModeForPath(`/matematika/batx2-gizarte/limites-continuidad/jokuak/${bach2gLimitsGameSlugs[game.id]}`), game.id)
    }
})

test('limiteak batx2 g games: in the long run?', () => {
    for (let seed = 1; seed <= 40; seed += 1) {
        for (let level = 0; level < 3; level += 1) {
            const rounds = createLongRunRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, LONG_RUN_ROUNDS)
            assert.equal(new Set(rounds.map((round) => round.bin)).size, 3)
            for (const round of rounds) {
                checkTexts([round.story])
                for (const language of languages) render(round.reason, language)
                // The model itself says where it goes: far on, it is near 0, near its value or huge
                const far = modelAt(round, 1e12)
                if (round.bin === 'zero') assert.ok(Math.abs(far) < 0.05, `${round.model}: ${far}`)
                if (round.bin === 'number') assert.ok(Math.abs(far - round.value!) < 0.05, `${round.model}: ${far}`)
                if (round.bin === 'infinity') assert.ok(far > 1e4, `${round.model}: ${far}`)
            }
        }
    }
})

test('limiteak batx2 g games: close the tariff', () => {
    for (let seed = 1; seed <= 40; seed += 1) {
        for (let level = 0; level < 3; level += 1) {
            const rounds = createCloseRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, CLOSE_ROUNDS)
            for (const round of rounds) {
                checkTexts([round.story])
                render(round.latex)
                for (const part of round.equation.split(/\\qquad|\\ \\to\\ /)) render(part)
                assert.equal(round.options.length, 4)
                assert.equal(new Set(round.options).size, 4)
                assert.ok(round.options.includes(round.answer))
                // With the right value the tariff closes at every edge; with any other it jumps somewhere
                for (const [left, right] of tariffSidesAt(round)) assert.ok(Math.abs(left - right) < 1e-9, `${round.latex}: ${left} ≠ ${right}`)
                for (const other of round.options.filter((value) => value !== round.answer)) {
                    assert.ok(tariffSidesAt({ ...round, answer: other }).some(([left, right]) => Math.abs(left - right) > 1e-9), `${round.latex}: ${other} closes it too`)
                }
            }
        }
    }
})

test('limiteak batx2 g games: the detective', () => {
    checkTexts([...Object.values(bach2gLimitsDetectiveNames), ...Object.values(bach2gLimitsDetectiveTips)])
    const seen = new Set<string>()
    for (let seed = 1; seed <= 40; seed += 1) {
        for (let level = 0; level < 3; level += 1) {
            for (const item of createBach2gLimitsDetectiveCases(createRandom(seed * 7919 + level), level)) {
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
    assert.deepEqual([...seen].sort(), [...BACH2G_LIMITS_DETECTIVE_ERRORS].sort())
})

test('limiteak batx2 g games: the race, every answer checked against its meta', () => {
    const kinds = new Set<string>()
    for (let seed = 1; seed <= 60; seed += 1) {
        for (let circuit = 0; circuit < BACH2G_LIMITS_RACE_CIRCUITS; circuit += 1) {
            const question = generateBach2gLimitsRaceQuestion(createRandom(seed * 7919 + circuit), circuit, 0)
            kinds.add(question.kind)
            assert.equal(question.circuit, circuit)
            assert.equal(question.options.filter((option) => option.correct).length, 1)
            assert.equal(new Set(question.options.map((option) => option.latex)).size, 4)
            checkTexts([question.prompt, question.solution])
            for (const option of question.options) render(option.latex)
            const answer = question.answer.numerator / question.answer.denominator
            const m = question.meta
            const expected: Record<string, () => number> = {
                vanish: () => m.k,
                operate: () => m.a * m.a - m.b,
                'over-infinity': () => m.a,
                degrees: () => m.p / m.q,
                conjugate: () => m.p / 2,
                e: () => m.p * m.q,
                substitute: () => m.a * m.a + m.a * m.b,
                factor: () => 2 * m.a,
                root: () => 1 / (2 * m.a),
                parameter: () => (m.m * m.t + m.c) / m.t,
                jump: () => m.r * m.t + m.s - (m.p * m.t + m.q),
                mend: () => m.a + m.b,
                'long-run': () => m.p,
                average: () => m.c,
                charge: () => (m.p1 - m.p2) * m.boundary
            }
            assert.ok(Math.abs(answer - expected[question.kind]()) < 1e-9, `${question.kind}: ${question.prompt.es}`)
            // The limits themselves, far away or very close
            if (question.kind === 'conjugate') assert.ok(Math.abs(Math.sqrt(1e12 + m.p * 1e6) - 1e6 - answer) < 1e-4)
            if (question.kind === 'root') assert.ok(Math.abs((Math.sqrt(m.a * m.a + 1e-7) - m.a) / 1e-7 - answer) < 1e-4)
            if (question.kind === 'mend') assert.ok(Math.abs(((m.a + 1e-7) ** 2 + (m.b - m.a) * (m.a + 1e-7) - m.a * m.b) / 1e-7 - answer) < 1e-4)
        }
    }
    assert.equal(kinds.size, 15)
})

test('limiteak batx2 g games: memory', () => {
    for (let seed = 1; seed <= 40; seed += 1) {
        for (let level = 0; level < 3; level += 1) {
            const cards = createBach2gLimitsMemoryBoard(createRandom(seed * 7919 + level), level)
            assert.equal(cards.length, BACH2G_LIMITS_MEMORY_PAIRS * 2)
            for (const card of cards) {
                render(card.latex)
                render(card.explain!)
            }
            const answers = cards.filter((card) => card.id.endsWith('-a')).map((card) => card.latex)
            assert.equal(new Set(answers).size, BACH2G_LIMITS_MEMORY_PAIRS)
        }
    }
})
