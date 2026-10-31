import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { createEquations3MemoryBoard } from '../src/pages/dbh3-ekuazioak/games/boards.ts'
import { createCrossingRounds, CROSSING_ROUNDS, crossingRight, lineLatex } from '../src/pages/dbh3-ekuazioak/games/crossing.ts'
import { createDetectiveCases, detectiveErrorNames, detectiveErrorTips, detectiveLevels } from '../src/pages/dbh3-ekuazioak/games/detective.ts'
import { equations3GameProgressIds, equations3Games } from '../src/pages/dbh3-ekuazioak/games/info.ts'
import { EQUATIONS3_RACE_CIRCUITS, equations3RaceErrorTips, generateEquations3RaceQuestion } from '../src/pages/dbh3-ekuazioak/games/race.ts'
import { createRootsRounds, ROOTS_RANGE, ROOTS_ROUNDS, rootsRight } from '../src/pages/dbh3-ekuazioak/games/roots.ts'
import { createStepRounds, linearSolution, STEP_ROUNDS } from '../src/pages/dbh3-ekuazioak/games/step.ts'
import { equations3LabChallengeIds } from '../src/pages/dbh3-ekuazioak/lab/labTools.ts'
import { equations3Diagnostic } from '../src/pages/dbh3-ekuazioak/content.ts'

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
        case 'two-sides': return (m.d - m.b) / (m.a - m.c)
        case 'bracket': return m.r / m.k + m.p
        case 'fraction': return m.m * (m.q - m.p)
        case 'negative-root': return -m.n
        case 'common-x': return m.k
        case 'larger-root': return Math.max(m.p, m.q)
        case 'discriminant': return m.b * m.b - 4 * m.c
        case 'pair': return m.c - m.a * m.x
        case 'crossing': return (m.n2 - m.n1) / (m.m1 - m.m2)
        case 'parallel': return m.m * m.b
        case 'substitution-x': return m.s / (m.k + 1)
        case 'substitution-y': return (m.k * m.s) / (m.k + 1)
        case 'elimination-x': return (m.s + m.d) / 2
        case 'elimination-y': return (m.s - m.d) / 2
        case 'scaled': return (m.c1 - m.c2) / (m.a - 1)
        case 'consecutive': return (m.total - (m.count === 2 ? 1 : 3)) / m.count
        case 'ages': return m.mother - 2 * m.son
        case 'tickets': return (m.money - m.small * m.count) / (m.big - m.small)
        default: throw new Error(kind)
    }
}

test('ekuazioak 3. DBH games: the hub, its levels and its progress ids', () => {
    assert.deepEqual(equations3Games.map((game) => game.id), ['race', 'step', 'roots', 'crossing', 'detective', 'memory'])
    assert.equal(new Set(equations3GameProgressIds).size, equations3GameProgressIds.length)
    for (const id of equations3GameProgressIds) assert.ok(id >= 94101 && id <= 94999, `${id}`)
    const all = [...equations3Diagnostic.map((question) => question.id), ...equations3LabChallengeIds, ...equations3GameProgressIds]
    assert.equal(new Set(all).size, all.length)
    for (const game of equations3Games) {
        for (const language of languages) assert.ok(game.title[language] && game.tagline[language] && game.levels.every((level) => level.title[language] && level.description[language]), `${game.id} ${language}`)
        // Level descriptions are plain text
        for (const level of game.levels) for (const language of languages) assert.ok(!level.description[language].includes('$'), level.description[language])
    }
    checkTexts([...Object.values(equations3RaceErrorTips), ...Object.values(detectiveErrorNames), ...Object.values(detectiveErrorTips)])
})

test('ekuazioak 3. DBH games: every race question is right, with three different wrong options', () => {
    for (let circuit = 0; circuit < EQUATIONS3_RACE_CIRCUITS; circuit += 1) {
        const kinds = new Set<string>()
        for (const tier of [0, 1, 2] as const) {
            for (let seed = 1; seed <= 120; seed += 1) {
                const question = generateEquations3RaceQuestion(createRandom(seed * 7919 + circuit * 31 + tier), circuit, tier)
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

test('ekuazioak 3. DBH games: memory boards have six pairs with one partner each', () => {
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 60; seed += 1) {
            const board = createEquations3MemoryBoard(createRandom(seed * 7919 + level), level)
            assert.equal(board.length, 12)
            for (const card of board) {
                assert.equal(board.filter((other) => other.shows === card.shows).length, 2)
                katex.renderToString(card.latex, { throwOnError: true, strict: 'error' })
            }
        }
    }
})

test('ekuazioak 3. DBH games: the right step keeps the solution and the other two lose it', () => {
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 60; seed += 1) {
            const rounds = createStepRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, STEP_ROUNDS)
            for (const round of rounds) {
                const solution = linearSolution(round.before)
                assert.equal(round.options.length, 3)
                for (const option of round.options) {
                    katex.renderToString(option.latex, { throwOnError: true, strict: 'error' })
                    assert.equal(close(linearSolution(option), solution), option.latex === round.answer, option.latex)
                }
                katex.renderToString(round.before.latex, { throwOnError: true, strict: 'error' })
            }
        }
    }
})

test('ekuazioak 3. DBH games: the roots on the line are the real solutions', () => {
    for (let level = 0; level < 3; level += 1) {
        let none = 0
        for (let seed = 1; seed <= 60; seed += 1) {
            const rounds = createRootsRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, ROOTS_ROUNDS)
            for (const round of rounds) {
                const solutions = Array.from({ length: 2 * ROOTS_RANGE + 1 }, (_, i) => i - ROOTS_RANGE).filter((x) => round.a * x * x + round.b * x + round.c === 0)
                assert.deepEqual(round.roots, solutions, round.latex)
                // No solution only when the discriminant is negative
                if (round.roots.length === 0) {
                    assert.ok(round.b * round.b - 4 * round.a * round.c < 0)
                    none += 1
                }
                assert.ok(rootsRight(round, round.roots))
                katex.renderToString(round.latex, { throwOnError: true, strict: 'error' })
            }
        }
        if (level === 2) assert.ok(none > 0)
    }
})

test('ekuazioak 3. DBH games: the crossing is on both lines, and parallel or identical lines are what they say', () => {
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 80; seed += 1) {
            const rounds = createCrossingRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, CROSSING_ROUNDS)
            if (level === 2) assert.ok(rounds.some((round) => round.kind === 'none') && rounds.some((round) => round.kind === 'infinite'))
            for (const round of rounds) {
                const [first, second] = round.lines
                const det = first.a * second.b - first.b * second.a
                if (round.kind === 'one') {
                    assert.ok(det !== 0 && round.point)
                    for (const line of round.lines) assert.equal(line.a * round.point![0] + line.b * round.point![1], line.c)
                    assert.ok(Math.abs(round.point![0]) <= 4 && Math.abs(round.point![1]) <= 4)
                    assert.ok(crossingRight(round, { point: round.point! }))
                    assert.ok(!crossingRight(round, { kind: 'none' }))
                } else {
                    assert.equal(det, 0)
                    // Proportional constants: the same line; otherwise parallel
                    const same = first.a * second.c === first.c * second.a && first.b * second.c === first.c * second.b
                    assert.equal(round.kind, same ? 'infinite' : 'none')
                }
                for (const line of round.lines) katex.renderToString(lineLatex(line), { throwOnError: true, strict: 'error' })
            }
        }
    }
})

test('ekuazioak 3. DBH games: every detective case reaches a wrong value, and its fix gives the right one', () => {
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 80; seed += 1) {
            for (const item of createDetectiveCases(createRandom(seed * 7919 + level), level)) {
                assert.ok(detectiveLevels[level].includes(item.error))
                assert.ok(item.options.includes(item.error) && new Set(item.options).size === 3)
                assert.notEqual(item.reached, item.right)
                assert.ok(item.wrong >= 0 && item.wrong < item.lines.length)
                assert.ok(item.lines[item.lines.length - 1].latex.includes(String(item.reached)), `${item.error}: ${item.lines[item.lines.length - 1].latex}`)
                assert.ok(item.fix.includes(String(item.right)), `${item.error}: ${item.fix}`)
                for (const line of item.lines) katex.renderToString(line.latex, { throwOnError: true, strict: 'error' })
                katex.renderToString(item.fix, { throwOnError: true, strict: 'error' })
                checkTexts([item.problem])
            }
        }
    }
})
