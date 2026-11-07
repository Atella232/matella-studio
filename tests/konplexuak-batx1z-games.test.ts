import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import type { Tier } from '../src/features/unit-v2/games/raceCore.ts'
import { toExactDecimal, toNumber } from '../src/features/unit-v2/math/fraction.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { written } from '../src/pages/batx1-zientziak-errealak/games/race.ts'
import { localize } from '../src/pages/batx1-zientziak-konplexuak/text.ts'
import { AFFIX_LIMIT, AFFIX_ROUNDS, createAffixRounds, isAffixRight } from '../src/pages/batx1-zientziak-konplexuak/games/affix.ts'
import { COMPLEX_MEMORY_PAIRS, complexMemoryLevels, complexPolarPairs, createComplexMemoryBoard, createComplexMemoryPairs } from '../src/pages/batx1-zientziak-konplexuak/games/boards.ts'
import { COMPLEX_DETECTIVE_CASES, complexDetectiveLevels, complexDetectiveNames, complexDetectiveTips, createComplexDetectiveCases } from '../src/pages/batx1-zientziak-konplexuak/games/detective.ts'
import { createRootHuntRounds, isRootHuntRight, ROOT_HUNT_POINTS, ROOT_HUNT_ROUNDS, rootHuntEquations } from '../src/pages/batx1-zientziak-konplexuak/games/hunt.ts'
import { konplexuakBatx1zGameModeForPath, konplexuakBatx1zGameProgressIds, konplexuakBatx1zGames, konplexuakBatx1zGameSlugs } from '../src/pages/batx1-zientziak-konplexuak/games/info.ts'
import { checkComplexPitAnswer, COMPLEX_RACE_CIRCUITS, generateComplexRaceQuestion } from '../src/pages/batx1-zientziak-konplexuak/games/race.ts'
import { createTwistRounds, TWIST_LIMIT, TWIST_ROUNDS, twistRight } from '../src/pages/batx1-zientziak-konplexuak/games/twist.ts'
import { abs, arg, evaluate, mul, near, polar, pow, real, roots, type C } from './konplexuak-batx1z-math.ts'

const languages = ['eu', 'es', 'en', 'ar'] as const
const render = (latex: string, language: (typeof languages)[number] = 'es') => katex.renderToString(formulaFor(language, localize(language, latex)), { throwOnError: true, strict: 'error' })
/** A formula with z (written {z}) replaced by a number */
const withZ = (latex: string, z: C) => latex.replace(/\\overline\{z\}/g, `\\overline{(${z[0]}+${z[1]}i)}`).replace(/\{z\}/g, `{(${z[0]}+${z[1]}i)}`)

function checkTexts(texts: LocalizedText[]) {
    for (const text of texts) {
        for (const language of languages) {
            assert.ok(text[language].length > 0)
            for (const [, formula] of text[language].matchAll(/\$([^$]+)\$/g)) render(formula, language)
            assert.ok(!/\\(?:sen|tg)(?![a-zA-Z])/.test(text[language]), text[language])
        }
        assert.ok(!text.ar.includes('{,}'), text.ar)
        assert.ok(!/[؀-ۿ]/.test([...text.ar.matchAll(/\$([^$]+)\$/g)].map((match) => match[1]).join('')), text.ar)
        assert.ok(!/\d(?:ri|ren|rekin|ekin|ek|ak|ra|tik|z|ei|en|k)(?![a-zA-Z])/.test(text.eu.replace(/\$[^$]+\$/g, '')), text.eu)
        assert.ok(!/\$(?:ri|ren|rekin|z|ra|tik|ei|ek|ak|en|ko|an)(?![a-zA-Z])/.test(text.eu), text.eu)
        // MathText turns «:» into ÷ inside formulas
        for (const [, formula] of text.es.matchAll(/\$([^$]+)\$/g)) assert.ok(!formula.includes(':'), formula)
    }
}

test('konplexuak batx1 z games: the hub, its levels and progress ids', () => {
    assert.deepEqual(konplexuakBatx1zGames.map((game) => game.id), ['race', 'affix', 'twist', 'hunt', 'detective', 'memory'])
    assert.equal(new Set(konplexuakBatx1zGameProgressIds).size, konplexuakBatx1zGameProgressIds.length)
    for (const id of konplexuakBatx1zGameProgressIds) assert.ok(id >= 104401 && id <= 104899, `${id}`)
    const stages = ['binomial', 'operations', 'polar', 'turns', 'roots']
    for (const game of konplexuakBatx1zGames) {
        assert.ok(game.levels.length >= 3, game.id)
        for (const level of game.levels) assert.ok(stages.includes(level.stage), `${game.id}: ${level.stage}`)
    }
    for (const stage of stages) assert.ok(konplexuakBatx1zGames.some((game) => game.levels.some((level) => level.stage === stage)), stage)
    for (const [id, slug] of Object.entries(konplexuakBatx1zGameSlugs)) assert.equal(konplexuakBatx1zGameModeForPath(`/matematika/batx1-zientziak/numeros-complejos/jokuak/${slug}`), id)
    for (const [slug, id] of [['carrera', 'race'], ['afijo', 'affix'], ['gira', 'twist'], ['caza', 'hunt'], ['detective', 'detective']]) assert.equal(konplexuakBatx1zGameModeForPath(`/x/juegos/${slug}`), id)
    assert.equal(konplexuakBatx1zGameModeForPath('/matematika/batx1-zientziak/numeros-complejos/jokuak'), 'hub')
})

test('konplexuak batx1 z games: where is the affix', () => {
    for (let level = 0; level < 3; level++) {
        const kinds = new Set<string>()
        for (let seed = 1; seed <= 60; seed++) {
            const rounds = createAffixRounds(createRandom(seed * 131 + level), level)
            assert.equal(rounds.length, AFFIX_ROUNDS)
            assert.equal(new Set(rounds.map((round) => round.expression)).size, AFFIX_ROUNDS)
            for (const round of rounds) {
                kinds.add(round.kind)
                assert.ok(round.answer.every((value) => Number.isInteger(value) && Math.abs(value) <= AFFIX_LIMIT), round.expression)
                // The expression and every side of the working are the number of the answer
                const value = evaluate(round.expression)
                assert.ok(value && near(value, round.answer), `${round.expression} is not ${round.answer}`)
                // The last piece of the working ends at the answer, through equal steps
                for (const side of round.working.split(/\\qquad|\\ \\to\\ /).at(-1)!.split('=')) {
                    const read = evaluate(side)
                    if (read !== null) assert.ok(near(read, round.answer), `${round.working}: ${side}`)
                }
                assert.ok(isAffixRight(round, round.answer) && !isAffixRight(round, [round.answer[0] + 1, round.answer[1]]))
                for (const language of languages) for (const latex of [round.expression, round.working]) render(`\\displaystyle ${latex}`, language)
            }
        }
        assert.ok(kinds.size >= 4, `level ${level}: only ${[...kinds]}`)
    }
})

test('konplexuak batx1 z games: turn and stretch', () => {
    for (let level = 0; level < 3; level++) {
        for (let seed = 1; seed <= 60; seed++) {
            const rounds = createTwistRounds(createRandom(seed * 337 + level), level)
            assert.equal(rounds.length, TWIST_ROUNDS)
            for (const round of rounds) {
                const value = evaluate(withZ(round.operation, round.z))
                assert.ok(value && near(value, round.answer), `${round.operation} with z = ${round.z}: ${value} ≠ ${round.answer}`)
                assert.equal(round.options.length, 4)
                assert.equal(round.options.filter((option) => option.mistake === null).length, 1)
                assert.deepEqual(round.options[twistRight(round)].point, round.answer)
                assert.equal(new Set(round.options.map((option) => option.point.join(','))).size, 4)
                for (const option of round.options) assert.ok(option.point.every((part) => Number.isInteger(part) && Math.abs(part) <= TWIST_LIMIT), `${option.point}`)
                for (const option of round.options.filter((item) => item.mistake !== null)) assert.ok(!near(option.point, round.answer))
                const working = round.working.split(/\\qquad/).at(-1)!
                const sides = working.split('=')
                assert.ok(near(evaluate(sides.at(-1)!)!, round.answer), round.working)
                for (const language of languages) for (const latex of [round.operation, round.working]) render(`\\displaystyle ${latex}`, language)
            }
        }
    }
})

test('konplexuak batx1 z games: hunt the roots', () => {
    // The equations of levels 1 and 3: w read from the equation is the w the round uses
    for (const equation of rootHuntEquations) {
        const [left, right] = equation.equation.split('=')
        const constant = left.replace(/^\{z\}\^\d/, '')
        const w = constant ? (evaluate(`-(${constant})`) ?? real(0)) : evaluate(right)!
        assert.ok(near(w, polar(equation.modulus, equation.argument)), `${equation.equation}: ${w}`)
    }
    for (let level = 0; level < 3; level++) {
        for (let seed = 1; seed <= 40; seed++) {
            const rounds = createRootHuntRounds(createRandom(seed * 71 + level), level)
            assert.equal(rounds.length, ROOT_HUNT_ROUNDS)
            assert.equal(new Set(rounds.map((round) => round.equation)).size, ROOT_HUNT_ROUNDS)
            for (const round of rounds) {
                assert.equal(round.solutions.length, round.n)
                const w = polar(round.modulus, round.argument)
                for (const angle of round.solutions) {
                    assert.ok(ROOT_HUNT_POINTS.includes(angle), `${round.equation}: ${angle}`)
                    const root = polar(round.modulus ** (1 / round.n), angle)
                    assert.ok(near(pow(root, round.n), w), `${round.equation}: ${angle}`)
                    assert.ok(Math.abs(evaluate(round.rootModulus)![0] - round.modulus ** (1 / round.n)) < 1e-9)
                }
                assert.deepEqual(round.solutions.map((angle) => Math.round(angle * 1e6) / 1e6), roots(w, round.n).map(arg).map((angle) => Math.round(angle * 1e6) / 1e6).sort((a, b) => a - b))
                assert.ok(isRootHuntRight(round, [...round.solutions].reverse()) && !isRootHuntRight(round, round.solutions.slice(1)))
                for (const language of languages) render(round.equation, language)
            }
        }
    }
})

test('konplexuak batx1 z games: the detective', () => {
    assert.deepEqual(complexDetectiveLevels.flat().sort(), Object.keys(complexDetectiveNames).sort())
    assert.deepEqual(Object.keys(complexDetectiveTips).sort(), Object.keys(complexDetectiveNames).sort())
    checkTexts([...Object.values(complexDetectiveNames), ...Object.values(complexDetectiveTips)])
    for (let level = 0; level < 3; level++) {
        for (let seed = 1; seed <= 40; seed++) {
            const cases = createComplexDetectiveCases(createRandom(seed * 17 + level), level)
            assert.equal(cases.length, COMPLEX_DETECTIVE_CASES)
            for (const item of cases) {
                assert.ok(complexDetectiveLevels[level].includes(item.error))
                assert.ok(Math.abs(item.right - item.reached) > 1e-9, item.problem.es)
                assert.ok(item.wrong >= 0 && item.wrong < item.lines.length)
                assert.ok(item.options.includes(item.error) && item.options.length === 3)
                checkTexts([item.problem])
                for (const language of languages) {
                    for (const line of item.lines) render(line.latex, language)
                    render(item.fix, language)
                }
            }
        }
    }
})

test('konplexuak batx1 z games: the race', () => {
    for (let circuit = 0; circuit < COMPLEX_RACE_CIRCUITS; circuit++) {
        const kinds = new Set<string>()
        for (let seed = 1; seed <= 120; seed++) {
            const question = generateComplexRaceQuestion(createRandom(seed * 7 + circuit), circuit, (seed % 3) as Tier)
            kinds.add(question.kind)
            assert.equal(question.options.filter((option) => option.correct).length, 1)
            assert.equal(new Set(question.options.map((option) => option.latex)).size, question.options.length)
            assert.equal(question.options.find((option) => option.correct)!.latex, written(question.answer))
            const typed = toExactDecimal(question.answer) ?? `${question.answer.numerator}/${question.answer.denominator}`
            assert.equal(checkComplexPitAnswer(question, typed.replace('{,}', ',')), 'correct', question.prompt.es)
            const meta = question.meta
            const answer = toNumber(question.answer)
            const expected: Record<string, () => number> = {
                part: () => {
                    const z: C = [meta.a, meta.b]
                    const value = meta.form === 0 ? z : meta.form === 1 ? [-z[0], -z[1]] : [z[0], -z[1]]
                    return value[meta.imaginary]
                },
                root: () => meta.n,
                product: () => mul([meta.a, meta.b], [meta.c, meta.d])[0],
                'power-imaginary': () => mul(real(meta.k), pow([0, 1], meta.n))[1],
                'power-real': () => mul(real(meta.k), pow([0, 1], meta.n))[0],
                division: () => meta.a,
                modulus: () => abs([meta.a, meta.b]),
                argument: () => arg([meta.a, meta.b]),
                'polar-real': () => polar(meta.r, meta.angle)[0],
                'product-argument': () => arg(polar(1, meta.alpha + meta.beta)),
                quotient: () => meta.r / meta.s,
                'moivre-modulus': () => meta.r ** meta.n,
                'moivre-argument': () => arg(pow(polar(1, meta.alpha), meta.n)),
                'root-modulus': () => meta.R ** (1 / meta.n),
                'first-argument': () => meta.theta / meta.n,
                separation: () => 360 / meta.n,
                'real-roots': () => roots(real(meta.R), meta.n).filter((root) => Math.abs(root[1]) < 1e-9).length
            }
            assert.ok(Math.abs(expected[question.kind]() - answer) < 1e-9, `${question.kind}: ${question.prompt.es} → ${answer}`)
            // The wrong options are not right by chance
            for (const option of question.options.filter((item) => !item.correct)) assert.ok(option.error !== null)
            checkTexts([question.prompt, question.solution])
            for (const option of question.options) for (const language of languages) render(option.latex, language)
        }
        assert.ok(kinds.size >= 2, `circuit ${circuit}: ${[...kinds]}`)
    }
})

test('konplexuak batx1 z games: the memory pairs', () => {
    for (const pair of complexPolarPairs) assert.ok(near(evaluate(pair.question)!, evaluate(pair.answer)!) && near(evaluate(pair.answer)!, pair.value), pair.question)
    for (let level = 0; level < complexMemoryLevels.length; level++) {
        for (let seed = 1; seed <= 60; seed++) {
            const pairs = createComplexMemoryPairs(createRandom(seed * 19 + level), level)
            assert.equal(pairs.length, COMPLEX_MEMORY_PAIRS)
            assert.equal(new Set(pairs.map((pair) => pair.question)).size, COMPLEX_MEMORY_PAIRS)
            assert.equal(new Set(pairs.map((pair) => pair.answer)).size, COMPLEX_MEMORY_PAIRS)
            for (const pair of pairs) {
                const question = evaluate(pair.question)
                const answer = evaluate(pair.answer)
                assert.ok(question && answer && near(question, answer) && near(answer, pair.value), `${pair.question} = ${pair.answer}`)
            }
            // No card has two partners: no question equals another pair's answer in value
            for (const pair of pairs) assert.equal(pairs.filter((other) => near(other.value, pair.value)).length, 1, pair.question)
            const board = createComplexMemoryBoard(createRandom(seed), level)
            assert.equal(board.length, 2 * COMPLEX_MEMORY_PAIRS)
            for (const card of board) for (const language of languages) render(card.latex, language)
        }
    }
})
