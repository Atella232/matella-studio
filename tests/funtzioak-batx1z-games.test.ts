import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import type { Tier } from '../src/features/unit-v2/games/raceCore.ts'
import { toExactDecimal, toNumber } from '../src/features/unit-v2/math/fraction.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { written } from '../src/pages/batx1-zientziak-errealak/games/race.ts'
import { localize } from '../src/pages/batx1-zientziak-funtzioak/text.ts'
import { BACH_FUNCTIONS_LASER_FAMILIES, bachFunctionsGameModeForPath, bachFunctionsGameProgressIds, bachFunctionsGames, bachFunctionsGameSlugs } from '../src/pages/batx1-zientziak-funtzioak/games/info.ts'
import { BACH_FUNCTIONS_RACE_CIRCUITS, bachFunctionsRaceErrorTips, checkBachFunctionsPitAnswer, generateBachFunctionsRaceQuestion } from '../src/pages/batx1-zientziak-funtzioak/games/race.ts'
import { applyChain, chainLatex, inverseChain, machineLabel, type Machine } from '../src/pages/batx1-zientziak-funtzioak/games/machines.ts'
import { createWhereRounds, isWherePick, WHERE_BOX, WHERE_ROUNDS, whereWorking } from '../src/pages/batx1-zientziak-funtzioak/games/where.ts'
import { chainOf, createOrderRounds, ORDER_ROUNDS, permutations, reachesGoal } from '../src/pages/batx1-zientziak-funtzioak/games/order.ts'
import { createUndoRounds, undoAnswer, undoes, UNDO_ROUNDS } from '../src/pages/batx1-zientziak-funtzioak/games/undo.ts'
import { BACH_FUNCTIONS_DETECTIVE_CASES, bachFunctionsDetectiveLevels, bachFunctionsDetectiveNames, bachFunctionsDetectiveTips, createBachFunctionsDetectiveCases } from '../src/pages/batx1-zientziak-funtzioak/games/detective.ts'
import { BACH_FUNCTIONS_MEMORY_PAIRS, bachFunctionsMemoryLevels, createBachFunctionsMemoryBoard } from '../src/pages/batx1-zientziak-funtzioak/games/boards.ts'

const languages = ['eu', 'es', 'en', 'ar'] as const
const render = (latex: string, language: (typeof languages)[number] = 'es') => katex.renderToString(formulaFor(language, localize(language, latex)), { throwOnError: true, strict: 'error' })

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

test('funtzioak batx1 z games: the hub, its levels and progress ids', () => {
    assert.deepEqual(bachFunctionsGames.map((game) => game.id), ['race', 'where', 'order', 'undo', 'detective', 'memory', 'domain', 'laser'])
    assert.equal(new Set(bachFunctionsGameProgressIds).size, bachFunctionsGameProgressIds.length)
    for (const id of bachFunctionsGameProgressIds) assert.ok(id >= 108401 && id <= 108899, `${id}`)
    const stages = ['study', 'transforms', 'inverse', 'piecewise', 'operations']
    for (const game of bachFunctionsGames) {
        assert.ok(game.levels.length >= 3, game.id)
        for (const level of game.levels) assert.ok(stages.includes(level.stage), `${game.id}: ${level.stage}`)
        checkTexts([game.title, game.tagline, game.skills, ...game.levels.flatMap((level) => [level.title, level.description])])
        assert.equal(bachFunctionsGameModeForPath(`/matematika/batx1-zientziak/funciones/jokuak/${bachFunctionsGameSlugs[game.id]}`), game.id)
    }
    assert.equal(bachFunctionsGameModeForPath('/matematika/batx1-zientziak/funciones/jokuak'), 'hub')
    // The laser has one family list per level
    assert.equal(BACH_FUNCTIONS_LASER_FAMILIES.length, bachFunctionsGames.find((game) => game.id === 'laser')!.levels.length)
})

test('funtzioak batx1 z games: every race question has one right option, worked out from its numbers', () => {
    const kinds = new Set<string>()
    for (let circuit = 0; circuit < BACH_FUNCTIONS_RACE_CIRCUITS; circuit += 1) {
        for (const tier of [0, 1, 2] as Tier[]) {
            for (let seed = 1; seed <= 60; seed += 1) {
                const question = generateBachFunctionsRaceQuestion(createRandom(seed * 7919 + circuit * 31 + tier), circuit, tier)
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
                assert.equal(checkBachFunctionsPitAnswer(question, typed), 'correct', `${question.kind}: ${typed}`)
                const { meta } = question
                const value = toNumber(question.answer)
                const integers = Array.from({ length: 41 }, (_, i) => i - 20)
                const arcs: Record<number, number> = {}
                const expected: Record<string, () => number> = {
                    'domain-count': () => integers.filter((x) => x - meta.a >= 0 && meta.b - x >= 0).length,
                    odd: () => -meta.b,
                    period: () => meta.v,
                    shift: () => meta.p - meta.c,
                    stretch: () => meta.p / meta.k,
                    outside: () => meta.A * meta.q + meta.k,
                    'inverse-line': () => (meta.v - meta.b) / meta.a,
                    'inverse-exp': () => meta.r,
                    arc: () => {
                        // Worked out again from the prompt: the angle in degrees in the principal range
                        const prompt = question.prompt.en
                        const read = prompt.match(/\\(arcsin|arccos|arctan)\\left\(([^$]+)\\right\)/)!
                        const raw = read[2].replace('\\frac{1}{2}', '0.5').replace('\\frac{\\sqrt{3}}{2}', String(Math.sqrt(3) / 2)).replace('\\frac{\\sqrt{2}}{2}', String(Math.SQRT2 / 2)).replace('\\sqrt{3}', String(Math.sqrt(3)))
                        const x = Number(raw)
                        const radians = read[1] === 'arcsin' ? Math.asin(x) : read[1] === 'arccos' ? Math.acos(x) : Math.atan(x)
                        arcs[meta.index] = Math.round((radians * 180) / Math.PI)
                        return arcs[meta.index]
                    },
                    floor: () => Math.floor(-(meta.a + meta.d / 10)),
                    piece: () => meta.t * meta.t + meta.c,
                    absolute: () => Math.abs(meta.b * meta.b - meta.a * meta.b),
                    compose: () => meta.a * (meta.r * meta.r + meta.c) + meta.b,
                    quotient: () => Math.max(meta.b, meta.c),
                    product: () => (meta.r + meta.a) * (meta.r - meta.b)
                }
                assert.ok(expected[question.kind], `no check for ${question.kind}`)
                assert.ok(Math.abs(value - expected[question.kind]()) < 1e-9, `${question.kind}: ${value} ≠ ${expected[question.kind]()}`)
                // Every wrong option carries a tip
                for (const option of question.options.filter((item) => !item.correct)) assert.ok(bachFunctionsRaceErrorTips[option.error!], `${question.kind}: ${option.error}`)
            }
        }
    }
    assert.equal(kinds.size, 15)
    checkTexts(Object.values(bachFunctionsRaceErrorTips))
})

test('funtzioak batx1 z games: ¿dónde cae el punto? has one right point on the board', () => {
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 80; seed += 1) {
            const rounds = createWhereRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, WHERE_ROUNDS, `level ${level} seed ${seed}`)
            for (const round of rounds) {
                const [p, q] = round.point
                const [x, y] = round.answer
                // The point really comes from P: B·x + c = p and y = A·q + k
                assert.equal(round.B * x + round.c, p, round.latex)
                assert.equal(round.A * q + round.k, y, round.latex)
                assert.ok(Number.isInteger(x) && Number.isInteger(y) && Math.abs(x) < WHERE_BOX && Math.abs(y) < WHERE_BOX, round.latex)
                assert.ok(x !== p || y !== q, round.latex)
                // Moving x the wrong way lands somewhere else
                if (round.c !== 0) assert.notEqual((p + round.c) / round.B, x, round.latex)
                assert.ok(isWherePick(round, [x, y]))
                assert.ok(!isWherePick(round, [x + 1, y]) && !isWherePick(round, round.point) && !isWherePick(round, null))
                render(round.latex)
                for (const line of whereWorking(round)) render(line)
                const changes = [round.c !== 0, round.k !== 0, round.A !== 1, round.B !== 1].filter(Boolean).length
                if (level === 0) assert.equal(changes, 1, round.latex)
                if (level === 1) assert.equal(changes, 2, round.latex)
                if (level === 2) assert.ok(changes >= 3 && (Math.abs(round.A) === 2 || Math.abs(round.B) === 2), round.latex)
            }
        }
    }
})

test('funtzioak batx1 z games: ordena las máquinas has exactly one order', () => {
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 80; seed += 1) {
            const rounds = createOrderRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, ORDER_ROUNDS, `level ${level} seed ${seed}`)
            for (const round of rounds) {
                const size = round.machines.length
                assert.ok(level === 0 ? size === 2 : level === 1 ? size === 3 : size >= 2)
                assert.equal(permutations(size).filter((order) => reachesGoal(round, order)).length, 1, JSON.stringify(round))
                assert.ok(reachesGoal(round, round.order))
                assert.ok(!reachesGoal(round, round.order.slice(0, -1)))
                if (level < 2) assert.equal(applyChain(chainOf(round, round.order), round.input!), round.target)
                else {
                    assert.equal(round.formula, chainLatex(chainOf(round, round.order)))
                    render(round.formula!)
                }
            }
        }
    }
})

test('funtzioak batx1 z games: deshaz la máquina is undone by the inverses in reverse order', () => {
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 80; seed += 1) {
            const rounds = createUndoRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, UNDO_ROUNDS, `level ${level} seed ${seed}`)
            for (const round of rounds) {
                const answer = undoAnswer(round)
                assert.ok(answer.every((index) => index >= 0), round.formula)
                assert.ok(undoes(round, answer), round.formula)
                // Laying the machines of f again never undoes it
                const originals = round.chain.map((machine) => round.cards.findIndex((card) => machineLabel(card) === machineLabel(machine)))
                if (originals.every((index) => index >= 0) && round.chain.every((machine) => machine.op !== 'neg')) assert.ok(!undoes(round, originals), round.formula)
                // The cards are all different, and there are at least two more than needed
                assert.equal(new Set(round.cards.map(machineLabel)).size, round.cards.length)
                assert.ok(round.cards.length >= round.chain.length + 2)
                render(`f(x)=${round.formula}`)
                render(`f^{-1}(x)=${round.inverse}`)
                assert.equal(round.inverse, chainLatex(inverseChain(round.chain)))
            }
        }
    }
    // The formula of a chain matches the chain at several points
    const chains: Machine[][] = [[{ op: 'mul', n: 2 }, { op: 'add', n: 4 }], [{ op: 'add', n: -3 }, { op: 'square' }], [{ op: 'exp2' }, { op: 'add', n: 1 }], [{ op: 'add', n: 2 }, { op: 'div', n: 3 }]]
    assert.deepEqual(chains.map(chainLatex), ['2x+4', '(x-3)^2', '2^{x}+1', '\\frac{x+2}{3}'])
})

test('funtzioak batx1 z games: the detective cases are well made', () => {
    assert.equal(bachFunctionsDetectiveLevels.flat().length, 12)
    checkTexts([...Object.values(bachFunctionsDetectiveNames), ...Object.values(bachFunctionsDetectiveTips)])
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 40; seed += 1) {
            const cases = createBachFunctionsDetectiveCases(createRandom(seed * 7919 + level), level)
            assert.equal(cases.length, BACH_FUNCTIONS_DETECTIVE_CASES)
            for (const item of cases) {
                assert.ok(bachFunctionsDetectiveLevels[level].includes(item.error))
                assert.ok(item.wrong >= 0 && item.wrong < item.lines.length)
                assert.ok(Math.abs(item.right - item.reached) > 1e-9)
                assert.equal(item.options.length, 3)
                assert.ok(item.options.includes(item.error))
                checkTexts([item.problem, ...item.lines.map((line) => line.label)])
                for (const language of languages) for (const line of item.lines) render(line.latex.replace(/\{,\}/g, language === 'ar' ? '.' : '{,}'), language)
                for (const part of item.fix.split('\\ \\to\\ ')) render(part)
            }
        }
    }
})

test('funtzioak batx1 z games: memory boards have six pairs with one partner each', () => {
    assert.deepEqual([...bachFunctionsMemoryLevels], ['floor', 'inverses', 'domains'])
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 60; seed += 1) {
            const board = createBachFunctionsMemoryBoard(createRandom(seed * 7919 + level), level)
            assert.equal(board.length, 2 * BACH_FUNCTIONS_MEMORY_PAIRS)
            const latexes = board.map((card) => card.latex)
            assert.equal(new Set(latexes).size, latexes.length, latexes.join(' | '))
            for (const card of board) render(card.latex)
            if (level === 0) {
                // E(−2,4) and −3
                for (const card of board.filter((item) => item.id.endsWith('-q'))) {
                    const x = Number(card.latex.replace(/^E\(|\)$/g, '').replace('{,}', '.'))
                    assert.equal(String(Math.floor(x)), card.shows, card.latex)
                }
            }
        }
    }
})
