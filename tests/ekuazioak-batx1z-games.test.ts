import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import type { Tier } from '../src/features/unit-v2/games/raceCore.ts'
import { toExactDecimal, toNumber } from '../src/features/unit-v2/math/fraction.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { written } from '../src/pages/batx1-zientziak-errealak/games/race.ts'
import { bachEquationsGameModeForPath, bachEquationsGameProgressIds, bachEquationsGames, bachEquationsGameSlugs } from '../src/pages/batx1-zientziak-ekuazioak/games/info.ts'
import { BACH_EQUATIONS_RACE_CIRCUITS, bachEquationsRaceErrorTips, checkBachEquationsPitAnswer, generateBachEquationsRaceQuestion } from '../src/pages/batx1-zientziak-ekuazioak/games/race.ts'
import { CANDIDATE_VERDICTS, createValidRounds, isValidChoice, VALID_ROUNDS, validValues, verdictOf } from '../src/pages/batx1-zientziak-ekuazioak/games/valid.ts'
import { breakpoints, createSignsRounds, isSignsChoice, signsLatex, SIGNS_ROUNDS, signsValue, solutionLatex, stretches, stretchSigns } from '../src/pages/batx1-zientziak-ekuazioak/games/signs.ts'
import { BACH_EQUATIONS_DETECTIVE_CASES, bachEquationsDetectiveLevels, bachEquationsDetectiveNames, bachEquationsDetectiveTips, createBachEquationsDetectiveCases } from '../src/pages/batx1-zientziak-ekuazioak/games/detective.ts'
import { BACH_EQUATIONS_MEMORY_PAIRS, bachEquationsMemoryLevels, createBachEquationsMemoryBoard } from '../src/pages/batx1-zientziak-ekuazioak/games/boards.ts'

const languages = ['eu', 'es', 'en', 'ar'] as const
const render = (latex: string, language: (typeof languages)[number] = 'es') => katex.renderToString(formulaFor(language, latex), { throwOnError: true, strict: 'error' })

function checkTexts(texts: LocalizedText[]) {
    for (const text of texts) {
        for (const language of languages) {
            assert.ok(text[language].length > 0)
            for (const [, formula] of text[language].matchAll(/\$([^$]+)\$/g)) render(formula, language)
        }
        assert.ok(!text.ar.includes('{,}'), text.ar)
        assert.ok(!/[؀-ۿ]/.test([...text.ar.matchAll(/\$([^$]+)\$/g)].map((match) => match[1]).join('')), text.ar)
        assert.ok(!/\d(?:ri|ren|rekin|ekin|ek|ak|ra|tik|z|ei|en|k)(?![a-zA-Z])/.test(text.eu.replace(/\$[^$]+\$/g, '')), text.eu)
        assert.ok(!/\$(?:ri|ren|rekin|z|ra|tik|ei)(?![a-zA-Z])/.test(text.eu), text.eu)
        // MathText turns «:» into ÷ inside formulas
        for (const [, formula] of text.es.matchAll(/\$([^$]+)\$/g)) assert.ok(!formula.includes(':'), formula)
    }
}

test('ekuazioak batx1 z games: the hub, its levels and progress ids', () => {
    assert.deepEqual(bachEquationsGames.map((game) => game.id), ['race', 'valid', 'signs', 'detective', 'memory', 'check', 'paint', 'hunt', 'simplify'])
    assert.equal(new Set(bachEquationsGameProgressIds).size, bachEquationsGameProgressIds.length)
    for (const id of bachEquationsGameProgressIds) assert.ok(id >= 101401 && id <= 101899, `${id}`)
    const stages = ['polynomials', 'polynomial-equations', 'radical-absolute', 'exp-log', 'inequalities']
    for (const game of bachEquationsGames) {
        assert.ok(game.levels.length >= 3, game.id)
        for (const level of game.levels) assert.ok(stages.includes(level.stage), `${game.id}: ${level.stage}`)
        checkTexts([game.title, game.tagline, game.skills, ...game.levels.flatMap((level) => [level.title, level.description])])
        assert.equal(bachEquationsGameModeForPath(`/matematika/batx1-zientziak/ecuaciones-inecuaciones/jokuak/${bachEquationsGameSlugs[game.id]}`), game.id)
    }
    assert.equal(bachEquationsGameModeForPath('/matematika/batx1-zientziak/ecuaciones-inecuaciones/jokuak'), 'hub')
})

test('ekuazioak batx1 z games: every race question has one right option, worked out from its numbers', () => {
    const kinds = new Set<string>()
    for (let circuit = 0; circuit < BACH_EQUATIONS_RACE_CIRCUITS; circuit += 1) {
        for (const tier of [0, 1, 2] as Tier[]) {
            for (let seed = 1; seed <= 60; seed += 1) {
                const question = generateBachEquationsRaceQuestion(createRandom(seed * 7919 + circuit * 31 + tier), circuit, tier)
                kinds.add(question.kind)
                assert.equal(question.circuit, circuit)
                assert.equal(question.options.length, 4, question.kind)
                assert.equal(question.options.filter((option) => option.correct).length, 1, question.kind)
                assert.equal(new Set(question.options.map((option) => option.latex)).size, 4, `${question.kind}: ${question.options.map((option) => option.latex).join(' | ')}`)
                const right = question.options.find((option) => option.correct)!
                assert.equal(right.latex, written(question.answer), question.kind)
                for (const option of question.options) render(option.latex)
                checkTexts([question.prompt, question.solution])
                const typed = question.answer.denominator === 1 ? String(question.answer.numerator) : toExactDecimal(question.answer) ?? `${question.answer.numerator}/${question.answer.denominator}`
                assert.equal(checkBachEquationsPitAnswer(question, typed), 'correct', `${question.kind}: ${typed}`)
                const { meta } = question
                const value = toNumber(question.answer)
                const cubic = (x: number) => x ** 3 + meta.p * x * x + meta.q * x + meta.r
                const expected: Record<string, () => number> = {
                    remainder: () => cubic(meta.a),
                    'one-root': () => meta.root,
                    parameter: () => -(meta.a * meta.a + meta.c) / meta.a,
                    'largest-root': () => Math.max(meta.r1, meta.r2, meta.r3),
                    biquadratic: () => [-4, -3, -2, -1, 0, 1, 2, 3, 4].filter((x) => Math.abs(x ** 4 - (meta.t1 + meta.t2) * x * x + meta.t1 * meta.t2) < 1e-9).length,
                    'cube-change': () => Math.max(meta.p, meta.q),
                    radical: () => [-6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7].filter((x) => x + meta.p >= 0 && Math.abs(Math.sqrt(x + meta.p) - (x + meta.q)) < 1e-9)[0],
                    'absolute-sum': () => (meta.a + meta.c) + (meta.a - meta.c),
                    'absolute-largest': () => (meta.b + meta.c) / meta.a,
                    'same-base': () => [-1, 0, 1, 2, 3].find((x) => Math.abs(meta.base ** (meta.m * x + meta.n) - meta.base ** Math.round(Math.log(meta.base ** (meta.m * value + meta.n)) / Math.log(meta.base))) < 1e-9)!,
                    'exp-change': () => Math.max(...[0, 1, 2, 3, 4].filter((x) => 4 ** x - (meta.a + meta.b) * 2 ** x + meta.a * meta.b === 0)),
                    log: () => meta.base ** meta.k - meta.a,
                    integers: () => Array.from({ length: 41 }, (_, i) => i - 20).filter((x) => (meta.strict ? (x - meta.a) * (x - meta.b) < 0 : (x - meta.a) * (x - meta.b) <= 0)).length,
                    'absolute-integers': () => Array.from({ length: 41 }, (_, i) => i - 20).filter((x) => (meta.strict ? Math.abs(x - meta.a) < meta.c : Math.abs(x - meta.a) <= meta.c)).length,
                    'quotient-max': () => Math.max(...Array.from({ length: 41 }, (_, i) => i - 20).filter((x) => x !== meta.h && (x - meta.r) / (x - meta.h) <= 0))
                }
                assert.ok(expected[question.kind], `no check for ${question.kind}`)
                assert.ok(Math.abs(value - expected[question.kind]()) < 1e-9, `${question.kind}: ${value} ≠ ${expected[question.kind]()}`)
                if (question.kind === 'radical') {
                    // Exactly one of the two squared roots is true
                    const squared = [-6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7].filter((x) => x + meta.p === (x + meta.q) ** 2)
                    assert.equal(squared.length, 2)
                }
            }
        }
    }
    assert.equal(kinds.size, 15)
    checkTexts(Object.values(bachEquationsRaceErrorTips))
})

test('ekuazioak batx1 z games: ¿válida o falsa?', () => {
    assert.deepEqual(CANDIDATE_VERDICTS, ['valid', 'denominator', 'sign', 'domain'])
    const kindsByLevel = [new Set<string>(), new Set<string>(), new Set<string>()]
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 80; seed += 1) {
            const rounds = createValidRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, VALID_ROUNDS)
            assert.equal(new Set(rounds.map((round) => round.latex)).size, VALID_ROUNDS)
            for (const round of rounds) {
                kindsByLevel[level].add(round.kind)
                render(round.latex)
                render(round.reduced)
                const { meta } = round
                assert.equal(round.candidates.length, 2)
                assert.ok(validValues(round).length >= 1)
                for (const candidate of round.candidates) {
                    const x = candidate.value
                    // Every candidate solves the squared equation, and is checked in the first one
                    if (round.kind === 'rational') {
                        assert.equal(x * x - (meta.a + meta.b) * x + meta.a * meta.b, 0)
                        assert.equal(candidate.reason === 'denominator', x === meta.a)
                    } else if (round.kind === 'radical') {
                        assert.equal(x + meta.p, (x + meta.q) ** 2)
                        assert.equal(candidate.reason === null, Math.abs(Math.sqrt(x + meta.p) - (x + meta.q)) < 1e-9)
                        if (candidate.reason !== null) assert.equal(candidate.reason, 'sign')
                    } else if (round.kind === 'log-double') {
                        assert.equal(x * x, x + meta.k)
                        assert.equal(candidate.reason === null, x > 0 && x + meta.k > 0)
                        if (candidate.reason !== null) assert.equal(candidate.reason, 'domain')
                    } else {
                        assert.equal((x + meta.a) * (x - meta.a), meta.c)
                        assert.equal(candidate.reason === null, x - meta.a > 0)
                        if (candidate.reason !== null) assert.equal(candidate.reason, 'domain')
                    }
                }
                assert.ok(isValidChoice(round, round.candidates.map(verdictOf)))
                assert.ok(!isValidChoice(round, round.candidates.map(() => 'valid')) || round.candidates.every((candidate) => candidate.reason === null))
                assert.ok(!isValidChoice(round, round.candidates.map(() => null)))
            }
        }
    }
    assert.deepEqual([...kindsByLevel[0]].sort(), ['radical', 'rational'])
    assert.deepEqual([...kindsByLevel[1]].sort(), ['log-double', 'log-sum', 'radical'])
    assert.equal(kindsByLevel[2].size, 4)
})

test('ekuazioak batx1 z games: rellena la tabla de signos', () => {
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 80; seed += 1) {
            const rounds = createSignsRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, SIGNS_ROUNDS)
            assert.equal(new Set(rounds.map(signsLatex)).size, SIGNS_ROUNDS)
            for (const round of rounds) {
                render(signsLatex(round))
                const points = breakpoints(round)
                const pieces = stretches(round)
                assert.equal(pieces.length, points.length + 1)
                assert.ok(pieces.length <= 4)
                // The sign of each stretch, from a few points inside it
                const signs = stretchSigns(round)
                pieces.forEach(([left, right], index) => {
                    for (const t of [0.1, 0.5, 0.9]) {
                        const x = left === -Infinity ? right - 1 - 10 * t : right === Infinity ? left + 1 + 10 * t : left + (right - left) * t
                        assert.equal(Math.sign(signsValue(round, x)), signs[index], `${signsLatex(round)} at ${x}`)
                    }
                })
                // Three different options, one of them the solution; the hole is never inside a closed end
                assert.equal(round.options.length, 3)
                assert.equal(new Set(round.options).size, 3)
                const solution = solutionLatex(round)
                assert.ok(round.options.includes(solution))
                for (const option of round.options) render(option)
                if (round.hole !== null) {
                    assert.ok(!solution.includes(`[${round.hole},`) && !solution.includes(`,${round.hole}]`), solution)
                }
                assert.ok(isSignsChoice(round, signs, solution))
                assert.ok(!isSignsChoice(round, signs.map((sign) => -sign), solution))
                for (const option of round.options.filter((item) => item !== solution)) assert.ok(!isSignsChoice(round, signs, option))
                if (level === 0) assert.ok(round.roots.length === 2 && round.hole === null)
                if (level === 1) assert.ok(round.roots.length === 3 && round.hole === null)
                if (level === 2) assert.ok(round.roots.length === 1 && round.hole !== null)
            }
        }
    }
})

test('ekuazioak batx1 z games: el detective de ecuaciones', () => {
    for (const [level, errors] of bachEquationsDetectiveLevels.entries()) {
        const seen = new Set<string>()
        for (let seed = 1; seed <= 40; seed += 1) {
            const cases = createBachEquationsDetectiveCases(createRandom(seed * 7919 + level), level)
            assert.equal(cases.length, BACH_EQUATIONS_DETECTIVE_CASES)
            assert.equal(new Set(cases.map((item) => item.problem.es)).size, cases.length)
            for (const item of cases) {
                seen.add(item.error)
                assert.ok(errors.includes(item.error))
                assert.equal(item.lines.length, 3)
                assert.ok(item.wrong >= 0 && item.wrong < 3)
                assert.equal(item.options.length, 3)
                assert.ok(item.options.includes(item.error))
                assert.notEqual(item.right, item.reached)
                for (const line of item.lines) render(line.latex)
                render(item.fix)
                checkTexts([item.problem, ...item.lines.map((line) => line.label)])
            }
        }
        assert.equal(seen.size, errors.length, `level ${level}`)
    }
    checkTexts([...Object.values(bachEquationsDetectiveNames), ...Object.values(bachEquationsDetectiveTips)])
})

test('ekuazioak batx1 z games: memory boards have one partner per card', () => {
    for (const [level] of bachEquationsMemoryLevels.entries()) {
        for (let seed = 1; seed <= 60; seed += 1) {
            const cards = createBachEquationsMemoryBoard(createRandom(seed * 7919 + level), level)
            assert.equal(cards.length, BACH_EQUATIONS_MEMORY_PAIRS * 2)
            const bySet = new Map<number, string[]>()
            for (const card of cards) {
                render(card.latex)
                bySet.set(card.setId, [...(bySet.get(card.setId) ?? []), card.latex])
            }
            assert.equal(bySet.size, BACH_EQUATIONS_MEMORY_PAIRS)
            assert.equal(new Set(cards.map((card) => card.latex)).size, cards.length)
            for (const [question, answer] of bySet.values()) {
                const pair = question.includes('=') || question.includes('<') || question.includes('\\le') ? [question, answer] : [answer, question]
                const [equation, result] = [pair[0].replace(/\\begin\{gathered\}|\\end\{gathered\}|\\\\ /g, ''), pair[1]]
                if (level === 0) {
                    const [r1, r2] = result.split(',\\ ').map(Number)
                    const [, b, c] = equation.match(/^x\^\{2\}(?:([+-]\d*)x)?([+-]\d+)?=0$/) ?? []
                    const at = (x: number) => x * x + (b === undefined ? 0 : Number(b === '-' ? -1 : b === '+' ? 1 : b)) * x + (c === undefined ? 0 : Number(c))
                    assert.ok(Math.abs(at(r1)) < 1e-9 && Math.abs(at(r2)) < 1e-9, `${equation} ↔ ${result}`)
                }
                if (level === 1) {
                    const x = Number(result)
                    const power = equation.match(/^(\d)\^\{x([+-]\d+)\}=(\d+)$/)
                    const log = equation.match(/^\\log_\{(\d)\}x=(\d)$/)
                    if (power) assert.equal(Number(power[1]) ** (x + Number(power[2])), Number(power[3]), equation)
                    else if (log) assert.equal(Number(log[1]) ** Number(log[2]), x, equation)
                    else assert.fail(equation)
                }
                if (level === 2) {
                    const interval = result.match(/^([[(])(-?\d+),(-?\d+)([\])])$/)
                    assert.ok(interval, result)
                    const [, open, left, right, close] = interval
                    const holds = (x: number) => {
                        const abs = equation.match(/^\|x([+-]\d+)?\|(<|\\le)(\d+)$/)
                        const square = equation.match(/^x\^2(<|\\le)(\d+)$/)
                        if (abs) return abs[2] === '<' ? Math.abs(x + Number(abs[1] ?? 0)) < Number(abs[3]) : Math.abs(x + Number(abs[1] ?? 0)) <= Number(abs[3])
                        if (square) return square[1] === '<' ? x * x < Number(square[2]) : x * x <= Number(square[2])
                        throw new Error(equation)
                    }
                    assert.equal(holds(Number(left)), open === '[', `${equation} ↔ ${result}`)
                    assert.equal(holds(Number(right)), close === ']', `${equation} ↔ ${result}`)
                    assert.ok(holds((Number(left) + Number(right)) / 2) && !holds(Number(left) - 1) && !holds(Number(right) + 1))
                }
            }
        }
    }
})
