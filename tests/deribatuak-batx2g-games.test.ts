import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { localize } from '../src/pages/batx1-zientziak-funtzioak/text.ts'
import { BACH2G_DERIVATIVES_MEMORY_PAIRS, createBach2gDerivativesMemoryBoard } from '../src/pages/batx2-gizarte-deribatuak/games/boards.ts'
import { BACH2G_DERIVATIVES_DETECTIVE_ERRORS, bach2gDerivativesDetectiveNames, bach2gDerivativesDetectiveTips, createBach2gDerivativesDetectiveCases } from '../src/pages/batx2-gizarte-deribatuak/games/detective.ts'
import { bach2gDerivativesGameModeForPath, bach2gDerivativesGameProgressIds, bach2gDerivativesGames, bach2gDerivativesGameSlugs } from '../src/pages/batx2-gizarte-deribatuak/games/info.ts'
import { createMatchRounds, MATCH_ROUNDS } from '../src/pages/batx2-gizarte-deribatuak/games/matchSlope.ts'
import { createNextCostRounds, NEXT_COST_ROUNDS } from '../src/pages/batx2-gizarte-deribatuak/games/nextCost.ts'
import { BACH2G_DERIVATIVES_RACE_CIRCUITS, generateBach2gDerivativesRaceQuestion } from '../src/pages/batx2-gizarte-deribatuak/games/race.ts'

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

test('deribatuak batx2 g games: the list, the ids and the addresses', () => {
    assert.equal(bach2gDerivativesGames.length, 5)
    assert.equal(new Set(bach2gDerivativesGameProgressIds).size, bach2gDerivativesGameProgressIds.length)
    for (const id of bach2gDerivativesGameProgressIds) assert.ok(id >= 146401 && id <= 146899, `${id}`)
    const stages = ['rate', 'point', 'rules', 'chain', 'economy']
    for (const game of bach2gDerivativesGames) {
        for (const level of game.levels) assert.ok(stages.includes(level.stage), `${game.id}: ${level.stage}`)
        checkTexts([game.title, game.tagline, game.skills, ...game.levels.flatMap((level) => [level.title, level.description])])
        assert.equal(bach2gDerivativesGameModeForPath(`/matematika/batx2-gizarte/derivadas/jokuak/${bach2gDerivativesGameSlugs[game.id]}`), game.id)
    }
})

test('deribatuak batx2 g games: what does the next one cost?', () => {
    for (let seed = 1; seed <= 40; seed += 1) {
        for (let level = 0; level < 3; level += 1) {
            const rounds = createNextCostRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, NEXT_COST_ROUNDS)
            for (const round of rounds) {
                checkTexts([round.story])
                for (const part of round.working.split('\\ \\to\\ ')) render(part)
                assert.equal(round.options.length, 4)
                assert.equal(new Set(round.options).size, 4)
                assert.ok(round.options.includes(round.answer))
                assert.ok(round.working.endsWith(String(round.answer).replace('.', '{,}')), round.working)
            }
        }
    }
})

test('deribatuak batx2 g games: match f with f′', () => {
    for (let seed = 1; seed <= 40; seed += 1) {
        for (let level = 0; level < 3; level += 1) {
            const rounds = createMatchRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, MATCH_ROUNDS)
            for (const round of rounds) {
                render(round.latex)
                render(round.derivative)
                assert.equal(round.options.length, 3)
                // The right graph is the numeric derivative of one of the other two (f itself)
                const f = round.options.find((curve, index) => index !== round.answer && Math.abs((curve.fn(1.001) - curve.fn(0.999)) / 0.002 - round.options[round.answer].fn(1)) < 1e-3)
                assert.ok(f, round.latex)
                // and no two graphs are the same
                for (let i = 0; i < 3; i++) for (let j = i + 1; j < 3; j++) assert.ok([-2, -0.5, 0.7, 2].some((x) => Math.abs(round.options[i].fn(x) - round.options[j].fn(x)) > 1e-6), round.latex)
            }
        }
    }
})

test('deribatuak batx2 g games: the detective', () => {
    checkTexts([...Object.values(bach2gDerivativesDetectiveNames), ...Object.values(bach2gDerivativesDetectiveTips)])
    const seen = new Set<string>()
    for (let seed = 1; seed <= 40; seed += 1) {
        for (let level = 0; level < 3; level += 1) {
            for (const item of createBach2gDerivativesDetectiveCases(createRandom(seed * 7919 + level), level)) {
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
    assert.deepEqual([...seen].sort(), [...BACH2G_DERIVATIVES_DETECTIVE_ERRORS].sort())
})

test('deribatuak batx2 g games: the race, every answer checked against its meta', () => {
    const kinds = new Set<string>()
    for (let seed = 1; seed <= 60; seed += 1) {
        for (let circuit = 0; circuit < BACH2G_DERIVATIVES_RACE_CIRCUITS; circuit += 1) {
            const question = generateBach2gDerivativesRaceQuestion(createRandom(seed * 7919 + circuit), circuit, 0)
            kinds.add(question.kind)
            assert.equal(question.circuit, circuit)
            assert.equal(question.options.filter((option) => option.correct).length, 1)
            assert.equal(new Set(question.options.map((option) => option.latex)).size, 4)
            checkTexts([question.prompt, question.solution])
            for (const option of question.options) render(option.latex)
            const answer = question.answer.numerator / question.answer.denominator
            const m = question.meta
            const d = (fn: (x: number) => number, x: number) => (fn(x + 1e-6) - fn(x - 1e-6)) / 2e-6
            const expected: Record<string, () => number> = {
                rate: () => (m.b ** 2 - m.a ** 2) / (m.b - m.a),
                sales: () => (m.p * m.m + m.q * m.m * m.m) / m.m,
                limit: () => m.b,
                point: () => d((x) => x * x + m.b * x, m.a),
                slope: () => d((x) => x ** 3 - m.k * x, m.a),
                tangent: () => -m.a * m.a,
                poly: () => d((x) => m.p * x ** 3 + m.q * x, m.a),
                product: () => d((x) => x * (x + m.c), m.a),
                quotient: () => d((x) => x / (x + m.c), 0),
                chain: () => d((x) => (m.k * x + 1) ** 2, 0),
                exp: () => d((x) => Math.exp(m.k * x), 0),
                log: () => d((x) => Math.log(x * x + m.c), m.a),
                second: () => 6 * m.a + 2 * m.q,
                next: () => d((x) => x * x + m.b * x + m.fixed, m.x),
                smooth: () => 2 * m.p
            }
            assert.ok(Math.abs(answer - expected[question.kind]()) < 1e-4, `${question.kind}: ${question.prompt.es}`)
        }
    }
    assert.equal(kinds.size, 15)
})

test('deribatuak batx2 g games: memory', () => {
    for (let seed = 1; seed <= 40; seed += 1) {
        for (let level = 0; level < 3; level += 1) {
            const cards = createBach2gDerivativesMemoryBoard(createRandom(seed * 7919 + level), level)
            assert.equal(cards.length, BACH2G_DERIVATIVES_MEMORY_PAIRS * 2)
            for (const card of cards) {
                render(card.latex)
                render(card.explain!)
            }
            const answers = cards.filter((card) => card.id.endsWith('-a')).map((card) => card.latex)
            assert.equal(new Set(answers).size, BACH2G_DERIVATIVES_MEMORY_PAIRS)
        }
    }
})
