import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { localize } from '../src/pages/batx1-zientziak-funtzioak/text.ts'
import { written } from '../src/pages/batx1-zientziak-errealak/games/race.ts'
import { BACH2_INDEFINITE_MEMORY_PAIRS, COMPOSED_PAIRS, createBach2IndefiniteMemoryBoard, PARTS_PAIRS, SUBSTITUTION_PAIRS } from '../src/pages/batx2-zientziak-mugagabeak/games/boards.ts'
import { BUILD_ROUNDS, createBuildRounds } from '../src/pages/batx2-zientziak-mugagabeak/games/build.ts'
import { CHOOSE_U_ROUNDS, createChooseURounds, optionLatex } from '../src/pages/batx2-zientziak-mugagabeak/games/chooseU.ts'
import { BACH2_INDEFINITE_DETECTIVE_CASES, BACH2_INDEFINITE_DETECTIVE_ERRORS, bach2IndefiniteDetectiveNames, bach2IndefiniteDetectiveTips, createBach2IndefiniteDetectiveCases } from '../src/pages/batx2-zientziak-mugagabeak/games/detective.ts'
import { bach2IndefiniteGameModeForPath, bach2IndefiniteGameProgressIds, bach2IndefiniteGames, bach2IndefiniteGameSlugs } from '../src/pages/batx2-zientziak-mugagabeak/games/info.ts'
import { createMethodRounds, METHOD_NAMES, METHOD_ROUNDS, METHODS } from '../src/pages/batx2-zientziak-mugagabeak/games/method.ts'
import { BACH2_INDEFINITE_RACE_CIRCUITS, bach2IndefiniteRaceErrorTips, generateBach2IndefiniteRaceQuestion } from '../src/pages/batx2-zientziak-mugagabeak/games/race.ts'

const languages = ['eu', 'es', 'en', 'ar'] as const

/** A formula renders in every language, with each language's trigonometric names */
function renders(latex: string) {
    for (const language of languages) katex.renderToString(formulaFor(language, localize(language, latex)), { throwOnError: true, strict: 'error' })
}

function checkTexts(texts: LocalizedText[]) {
    for (const text of texts) {
        for (const language of languages) {
            assert.ok(text[language].length > 0)
            for (const [, formula] of text[language].matchAll(/\$([^$]+)\$/g)) katex.renderToString(formulaFor(language, formula), { throwOnError: true, strict: 'error' })
        }
        assert.ok(!text.ar.includes('{,}'), text.ar)
        if (/[a-zA-Z]{4}/.test(text.es.replace(/\$[^$]+\$/g, ''))) assert.ok(/[؀-ۿ]/.test(text.ar.replace(/\$[^$]+\$/g, '')), `not Arabic: ${text.ar}`)
        assert.ok(!/\d[a-zñ]/.test(text.eu.replace(/\$[^$]+\$/g, '')) && !/\$(?:ri|ren|rekin|z|ra|tik|ei)(?![a-zA-Z])/.test(text.eu), text.eu)
    }
}

const POINTS = [-2.7, -1.6, -0.4, 0.35, 0.6, 1.3, 2.4, 3.7, 4.5, 5.3]
const derivative = (F: (x: number) => number, x: number) => (F(x + 1e-5) - F(x - 1e-5)) / 2e-5

/** F′ = f at the points where both are defined and f is not near a pole (at least two of them) */
function differentiatesTo(F: (x: number) => number, fn: (x: number) => number, where: string) {
    let checked = 0
    for (const x of POINTS) {
        const values = [fn(x), F(x), F(x + 1e-5), F(x - 1e-5)]
        if (!values.every(Number.isFinite) || Math.abs(values[0]) > 1e4) continue
        const d = derivative(F, x)
        assert.ok(Math.abs(d - values[0]) < 1e-4 * Math.max(1, Math.abs(values[0])), `${where} at ${x}: ${d} ≠ ${values[0]}`)
        checked += 1
    }
    assert.ok(checked >= 2, `${where}: only ${checked} points`)
}

test('mugagabeak batx2 z games: the list, the ids and the addresses', () => {
    assert.deepEqual(bach2IndefiniteGames.map((game) => game.id), ['race', 'method', 'choose-u', 'fractions', 'detective', 'memory'])
    const ids = bach2IndefiniteGameProgressIds
    assert.equal(new Set(ids).size, ids.length)
    for (const id of ids) assert.ok(id >= 126401 && id <= 126899, `${id}`)
    assert.equal(bach2IndefiniteGames.find((game) => game.id === 'race')!.levels.length, BACH2_INDEFINITE_RACE_CIRCUITS)
    for (const game of bach2IndefiniteGames) {
        for (const language of languages) assert.ok(game.title[language] && game.tagline[language] && game.skills[language], `${game.id} ${language}`)
        assert.equal(bach2IndefiniteGameModeForPath(`/matematika/batx2-zientziak/integrales-indefinidas/jokuak/${bach2IndefiniteGameSlugs[game.id]}`), game.id)
    }
    assert.equal(bach2IndefiniteGameModeForPath('/matematika/batx2-zientziak/integrales-indefinidas/jokuak'), 'hub')
})

test('mugagabeak batx2 z games · which method: eight rounds, two per basket, every result right', () => {
    checkTexts(Object.values(METHOD_NAMES))
    for (let seed = 1; seed <= 40; seed += 1) {
        for (let level = 0; level < 3; level += 1) {
            const rounds = createMethodRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, METHOD_ROUNDS)
            for (const method of METHODS) assert.equal(rounds.filter((round) => round.method === method).length, 2, `${seed} ${level} ${method}`)
            assert.equal(new Set(rounds.map((round) => round.integrand)).size, rounds.length, `${seed} ${level}: a repeated integral`)
            for (const round of rounds) {
                assert.equal(METHODS[round.answer], round.method)
                differentiatesTo(round.F, round.fn, round.integrand)
                for (const latex of [`\\int ${round.integrand}\\,dx`, round.first, round.result]) renders(latex)
                checkTexts([round.why])
            }
        }
    }
})

test('mugagabeak batx2 z games · choose the u: one good split, and the result is right', () => {
    for (let seed = 1; seed <= 40; seed += 1) {
        for (let level = 0; level < 3; level += 1) {
            const rounds = createChooseURounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, CHOOSE_U_ROUNDS)
            assert.equal(new Set(rounds.map((round) => round.integrand)).size, rounds.length)
            for (const round of rounds) {
                assert.equal(round.options.length, 3)
                assert.equal(new Set(round.options.map(optionLatex)).size, 3, round.integrand)
                assert.equal(round.kinds[round.answer], 'right')
                assert.equal(round.kinds.filter((kind) => kind === 'right').length, 1)
                // The good split never takes the whole integrand as u with dv = dx unless it is a single factor
                differentiatesTo(round.F, round.fn, round.integrand)
                for (const latex of [`\\int ${round.integrand}\\,dx`, round.duv, round.step, ...round.options.map(optionLatex)]) renders(latex)
            }
        }
    }
})

test('mugagabeak batx2 z games · build the fractions: only the right option rebuilds R', () => {
    for (let seed = 1; seed <= 40; seed += 1) {
        for (let level = 0; level < 3; level += 1) {
            const rounds = createBuildRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, BUILD_ROUNDS)
            for (const round of rounds) {
                assert.equal(new Set(round.options).size, round.options.length, round.rational)
                assert.ok(round.answer >= 0 && round.answer < round.options.length)
                for (const latex of [round.rational, round.reason, ...round.options]) renders(latex)
                if (level === 0) {
                    assert.equal(round.ask, 'skeleton')
                    continue
                }
                const R = round.R!
                const points = [0.37, 1.61, -2.53, 4.2].filter((x) => Number.isFinite(R(x)) && Math.abs(R(x)) < 1e4)
                for (const [index, value] of round.values!.entries()) {
                    const equal = points.every((x) => Math.abs(value(x) - R(x)) < 1e-9 * Math.max(1, Math.abs(R(x))))
                    assert.equal(equal, index === round.answer, `${round.rational}: option ${round.options[index]}`)
                }
            }
        }
    }
})

test('mugagabeak batx2 z games · detective: three lines, one wrong, and the formulas render', () => {
    assert.equal(BACH2_INDEFINITE_DETECTIVE_ERRORS.length, 12)
    checkTexts([...Object.values(bach2IndefiniteDetectiveNames), ...Object.values(bach2IndefiniteDetectiveTips)])
    for (let seed = 1; seed <= 30; seed += 1) {
        for (let level = 0; level < 3; level += 1) {
            const cases = createBach2IndefiniteDetectiveCases(createRandom(seed * 7919 + level), level)
            assert.equal(cases.length, BACH2_INDEFINITE_DETECTIVE_CASES)
            for (const item of cases) {
                assert.equal(item.lines.length, 3)
                assert.ok(item.wrong >= 0 && item.wrong < 3)
                assert.ok(item.options.includes(item.error) && item.options.length === 3)
                assert.notEqual(item.right, item.reached)
                for (const latex of [...item.lines.map((line) => line.latex), item.fix]) renders(latex)
                checkTexts([item.problem, ...item.lines.map((line) => line.label)])
            }
        }
    }
})

test('mugagabeak batx2 z games · race: one right option among four, checked against its numbers', () => {
    checkTexts(Object.values(bach2IndefiniteRaceErrorTips))
    const expected: Record<string, (meta: Record<string, number>) => number> = {
        cosine: ({ k }) => 1 / k,
        arctan: ({ c }) => 1 / c,
        power: ({ k, n }) => k * (n + 1),
        'x-exp': ({ m }) => -1 / (m * m),
        'x-ln': ({ n }) => -1 / (n + 1) ** 2,
        'square-exp': ({ p }) => 2 + p,
        cover: ({ A }) => A,
        division: ({ a, c }) => a * a + c,
        double: ({ a, p, q }) => p * a + q,
        'square-change': ({ n }) => 1 / (2 * (n + 1)),
        'log-change': ({ c, n }) => c / (n + 1),
        'root-change': ({ c }) => 2 * c,
        point: ({ b, p, q }) => q - p * p - b * p,
        'two-constants': ({ p, q }) => 1 + p + q,
        tangent: ({ m, n }) => 1 + m + n
    }
    // The integrals behind the numbers, checked by differentiating
    const integrals: Record<string, (meta: Record<string, number>, value: number) => [(x: number) => number, (x: number) => number]> = {
        cosine: ({ k }, a) => [(x) => Math.cos(k * x), (x) => a * Math.sin(k * x)],
        arctan: ({ c }, a) => [(x) => 1 / (c * c + x * x), (x) => a * Math.atan(x / c)],
        power: ({ k, b, n }, m) => [(x) => (k * x + b) ** n, (x) => (k * x + b) ** (n + 1) / m],
        'x-exp': ({ m }, b) => [(x) => x * Math.exp(m * x), (x) => Math.exp(m * x) * (x / m + b)],
        'x-ln': ({ n }, a) => [(x) => x ** n * Math.log(x), (x) => (x ** (n + 1) / (n + 1)) * Math.log(x) + a * x ** (n + 1)],
        'square-exp': ({ p }, c) => [(x) => (x * x + p) * Math.exp(x), (x) => Math.exp(x) * (x * x - 2 * x + c)],
        'square-change': ({ c, n }, a) => [(x) => x * (x * x + c) ** n, (x) => a * (x * x + c) ** (n + 1)],
        'log-change': ({ c, n }, a) => [(x) => (c * Math.log(x) ** n) / x, (x) => a * Math.log(x) ** (n + 1)],
        'root-change': ({ c }, a) => [(x) => (c * Math.exp(Math.sqrt(x))) / Math.sqrt(x), (x) => a * Math.exp(Math.sqrt(x))]
    }
    const kinds = new Set<string>()
    for (let circuit = 0; circuit < BACH2_INDEFINITE_RACE_CIRCUITS; circuit += 1) {
        for (let seed = 1; seed <= 80; seed += 1) {
            for (const tier of [0, 1, 2] as const) {
                const question = generateBach2IndefiniteRaceQuestion(createRandom(seed * 7919 + circuit * 31 + tier), circuit, tier)
                kinds.add(question.kind)
                assert.equal(question.circuit, circuit)
                assert.equal(question.options.length, 4)
                assert.equal(question.options.filter((option) => option.correct).length, 1)
                assert.equal(new Set(question.options.map((option) => option.latex)).size, 4)
                const value = question.answer.numerator / question.answer.denominator
                assert.ok(Math.abs(value - expected[question.kind](question.meta)) < 1e-9, `${question.kind} ${JSON.stringify(question.meta)}`)
                assert.equal(question.options.find((option) => option.correct)!.latex, written(question.answer))
                if (integrals[question.kind]) {
                    const [fn, F] = integrals[question.kind](question.meta, value)
                    differentiatesTo(F, fn, `${question.kind} ${JSON.stringify(question.meta)}`)
                }
                checkTexts([question.prompt, question.solution])
                for (const option of question.options) renders(option.latex)
            }
        }
    }
    assert.equal(kinds.size, 15)
})

test('mugagabeak batx2 z games · memory: every pair is a function and its antiderivative, every card different', () => {
    for (const pair of [...COMPOSED_PAIRS, ...PARTS_PAIRS, ...SUBSTITUTION_PAIRS]) {
        differentiatesTo(pair.F, pair.fn, pair.question)
        renders(pair.question)
        renders(pair.answer)
        assert.ok(!/\\(?:sin|tan|arcsin|arctan)/.test(pair.question + pair.answer), pair.question)
    }
    for (let seed = 1; seed <= 60; seed += 1) {
        for (let level = 0; level < 3; level += 1) {
            const board = createBach2IndefiniteMemoryBoard(createRandom(seed * 7919 + level), level)
            assert.equal(board.length, 2 * BACH2_INDEFINITE_MEMORY_PAIRS)
            assert.equal(new Set(board.map((card) => card.latex)).size, board.length, `${seed} ${level}`)
            for (let set = 0; set < BACH2_INDEFINITE_MEMORY_PAIRS; set += 1) assert.equal(board.filter((card) => card.setId === set).length, 2)
        }
    }
})
