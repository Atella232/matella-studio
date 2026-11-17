import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { localize } from '../src/pages/batx1-zientziak-funtzioak/text.ts'
import { BACH2G_APPLICATIONS_MEMORY_PAIRS, createBach2gApplicationsMemoryBoard } from '../src/pages/batx2-gizarte-aplikazioak/games/boards.ts'
import { BACH2G_APPLICATIONS_DETECTIVE_ERRORS, bach2gApplicationsDetectiveNames, bach2gApplicationsDetectiveTips, createBach2gApplicationsDetectiveCases } from '../src/pages/batx2-gizarte-aplikazioak/games/detective.ts'
import { createExtremeRounds, EXTREME_ROUNDS } from '../src/pages/batx2-gizarte-aplikazioak/games/extremeKind.ts'
import { bach2gApplicationsGameModeForPath, bach2gApplicationsGameProgressIds, bach2gApplicationsGames, bach2gApplicationsGameSlugs } from '../src/pages/batx2-gizarte-aplikazioak/games/info.ts'
import { createOptimizeRounds, OPTIMIZE_ROUNDS } from '../src/pages/batx2-gizarte-aplikazioak/games/optimize.ts'
import { BACH2G_APPLICATIONS_RACE_CIRCUITS, generateBach2gApplicationsRaceQuestion } from '../src/pages/batx2-gizarte-aplikazioak/games/race.ts'

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

/** A polynomial written as LaTeX, evaluated (only +, −, powers and products of integers and x) */
function poly(latex: string): (x: number) => number {
    const js = latex.replace(/^[A-Za-z]\([a-z]\)=/, '').replace(/(\d)([tx])/g, '$1*$2').replace(/[tx]\^(\d)/g, 'Math.pow(x,$1)').replace(/\bt\b/g, 'x').replace(/\\frac\{(\d+)\}\{x\}/g, '($1/x)')
    return Function('x', `return ${js}`) as (x: number) => number
}

test('aplikazioak batx2 g games: the list, the ids and the addresses', () => {
    assert.equal(bach2gApplicationsGames.length, 5)
    assert.equal(new Set(bach2gApplicationsGameProgressIds).size, bach2gApplicationsGameProgressIds.length)
    for (const id of bach2gApplicationsGameProgressIds) assert.ok(id >= 147401 && id <= 147899, `${id}`)
    const stages = ['tangent', 'growth', 'extrema', 'curvature', 'optimization']
    for (const game of bach2gApplicationsGames) {
        for (const level of game.levels) assert.ok(stages.includes(level.stage), `${game.id}: ${level.stage}`)
        checkTexts([game.title, game.tagline, game.skills, ...game.levels.flatMap((level) => [level.title, level.description])])
        assert.equal(bach2gApplicationsGameModeForPath(`/matematika/batx2-gizarte/aplicaciones-derivada/jokuak/${bach2gApplicationsGameSlugs[game.id]}`), game.id)
    }
})

test('aplikazioak batx2 g games: maximum, minimum or nothing?', () => {
    for (let seed = 1; seed <= 40; seed += 1) {
        for (let level = 0; level < 3; level += 1) {
            const rounds = createExtremeRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, EXTREME_ROUNDS)
            for (const round of rounds) {
                checkTexts([round.prompt])
                render(round.latex)
                render(round.working)
                if (level === 0) continue
                // The answer, checked on the function itself: the point is stationary and the values around it say what it is
                const fn = poly(round.latex)
                const p = Number(round.prompt.es.match(/=(-?\d+)\$\?/)![1])
                const h = 1e-3
                assert.ok(Math.abs((fn(p + 1e-6) - fn(p - 1e-6)) / 2e-6) < 1e-3, round.latex)
                const left = fn(p - h) - fn(p)
                const right = fn(p + h) - fn(p)
                const kind = left < 0 && right < 0 ? 'max' : left > 0 && right > 0 ? 'min' : 'none'
                assert.equal(kind, round.answer, `${round.latex} at ${p}`)
            }
        }
    }
})

test('aplikazioak batx2 g games: optimise the firm', () => {
    for (let seed = 1; seed <= 40; seed += 1) {
        for (let level = 0; level < 3; level += 1) {
            const rounds = createOptimizeRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, OPTIMIZE_ROUNDS)
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

test('aplikazioak batx2 g games: the detective', () => {
    checkTexts([...Object.values(bach2gApplicationsDetectiveNames), ...Object.values(bach2gApplicationsDetectiveTips)])
    const seen = new Set<string>()
    for (let seed = 1; seed <= 40; seed += 1) {
        for (let level = 0; level < 3; level += 1) {
            for (const item of createBach2gApplicationsDetectiveCases(createRandom(seed * 7919 + level), level)) {
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
    assert.deepEqual([...seen].sort(), [...BACH2G_APPLICATIONS_DETECTIVE_ERRORS].sort())
})

test('aplikazioak batx2 g games: the race, every answer checked against its meta', () => {
    const kinds = new Set<string>()
    for (let seed = 1; seed <= 60; seed += 1) {
        for (let circuit = 0; circuit < BACH2G_APPLICATIONS_RACE_CIRCUITS; circuit += 1) {
            const question = generateBach2gApplicationsRaceQuestion(createRandom(seed * 7919 + circuit), circuit, 0)
            kinds.add(question.kind)
            assert.equal(question.circuit, circuit)
            assert.equal(question.options.filter((option) => option.correct).length, 1)
            assert.equal(new Set(question.options.map((option) => option.latex)).size, 4)
            checkTexts([question.prompt, question.solution])
            for (const option of question.options) render(option.latex)
            const answer = question.answer.numerator / question.answer.denominator
            const m = question.meta
            const d = (fn: (x: number) => number, x: number) => (fn(x + 1e-6) - fn(x - 1e-6)) / 2e-6
            const argmax = (fn: (x: number) => number, from: number, to: number) => {
                let best = from
                for (let x = from; x <= to + 1e-9; x += 0.5) if (fn(x) > fn(best)) best = x
                return best
            }
            const expected: Record<string, () => number> = {
                tangent: () => { const f = (x: number) => x * x + m.b * x; return f(m.a) - d(f, m.a) * m.a },
                slope: () => d((x) => x ** 3 + m.c * x, m.a),
                parallel: () => (m.m - m.b) / 2,
                turn: () => m.a,
                sign: () => d((x) => x ** 3 - m.k * x, m.a),
                grow: () => argmax((t) => -t * t + 2 * m.a * t + m.c, 0, 20),
                top: () => { const f = (x: number) => -x * x + 2 * m.a * x + m.c; return f(argmax(f, -10, 10)) },
                minimum: () => argmax((x) => -(x ** 3) + 3 * m.k * m.k * x, 0, 10),
                absolute: () => Math.max(m.a * m.a, m.b * m.b),
                inflection: () => m.p,
                second: () => { const f = (x: number) => x ** 4 + m.q * x * x; return (f(m.a + 1e-3) - 2 * f(m.a) + f(m.a - 1e-3)) / 1e-6 },
                pace: () => { const v = (t: number) => -(t ** 3) + 3 * m.p * t * t; return d(v, m.p) },
                units: () => argmax((x) => -x * x + 2 * m.a * x - m.c, 0, 100),
                profit: () => { const b = (x: number) => m.p * x - x * x - m.c; return b(argmax(b, 0, 100)) },
                average: () => argmax((x) => -(x + m.b + (m.r * m.r) / x), 1, 100)
            }
            assert.ok(Math.abs(answer - expected[question.kind]()) < 1e-2, `${question.kind}: ${question.prompt.es} → ${answer} vs ${expected[question.kind]()}`)
        }
    }
    assert.equal(kinds.size, 15)
})

test('aplikazioak batx2 g games: memory', () => {
    for (let seed = 1; seed <= 40; seed += 1) {
        for (let level = 0; level < 3; level += 1) {
            const cards = createBach2gApplicationsMemoryBoard(createRandom(seed * 7919 + level), level)
            assert.equal(cards.length, BACH2G_APPLICATIONS_MEMORY_PAIRS * 2)
            for (const card of cards) {
                render(card.latex)
                render(card.explain!)
            }
            const answers = cards.filter((card) => card.id.endsWith('-a')).map((card) => card.latex)
            assert.equal(new Set(answers).size, BACH2G_APPLICATIONS_MEMORY_PAIRS)
        }
    }
})
