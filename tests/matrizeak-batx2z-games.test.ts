import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import type { Tier } from '../src/features/unit-v2/games/raceCore.ts'
import { toNumber } from '../src/features/unit-v2/math/fraction.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { createPowerRounds, periodOf, POWER_ROUNDS, powerLatex } from '../src/pages/batx2-zientziak-matrizeak/games/bigPower.ts'
import { createMatrizeakMemoryBoard, MATRIZEAK_MEMORY_PAIRS, matrizeakMemoryLevels } from '../src/pages/batx2-zientziak-matrizeak/games/boards.ts'
import { createMatrizeakDetectiveCases, MATRIZEAK_DETECTIVE_CASES, matrizeakDetectiveLevels, matrizeakDetectiveNames, matrizeakDetectiveTips } from '../src/pages/batx2-zientziak-matrizeak/games/detective.ts'
import { chainSize, createDominoRounds, DOMINO_ROUNDS, expressionLatex, expressionSize, fits } from '../src/pages/batx2-zientziak-matrizeak/games/dominoes.ts'
import { matrizeakGameModeForPath, matrizeakGameProgressIds, matrizeakGames, matrizeakGameSlugs } from '../src/pages/batx2-zientziak-matrizeak/games/info.ts'
import { checkMatrizeakPitAnswer, generateMatrizeakRaceQuestion, MATRIZEAK_RACE_CIRCUITS, matrizeakRaceErrorTips } from '../src/pages/batx2-zientziak-matrizeak/games/race.ts'
import { createSolveRounds, SOLVE_ROUNDS, SOLVE_TEMPLATES } from '../src/pages/batx2-zientziak-matrizeak/games/solveX.ts'
import { evaluateMatrix, gridsEqual, inverseGrid, matricesIn, matrixRelations, multiplyGrids, type Grid } from './matrix-latex.ts'
import { near } from './latex-math.ts'

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
        for (const language of ['eu', 'es', 'en'] as const) assert.ok(!/[؀-ۿ]/.test(text[language]), text[language])
        assert.ok(!/\d(?:ri|ren|rekin|ekin|ek|ak|ra|tik|z|ei|en|k)(?![a-zA-Z])/.test(text.eu.replace(/\$[^$]+\$/g, '')), text.eu)
        assert.ok(!/§(?:ri|ren|rekin|z|ra|tik|ei)(?![a-zA-Z])/.test(text.eu.replace(/\$[^$]+\$/g, '§')), text.eu)
        // MathText turns «:» into ÷ inside formulas
        for (const [, formula] of text.es.matchAll(/\$([^$]+)\$/g)) assert.ok(!formula.includes(':'), formula)
    }
}

const power = (base: Grid, exponent: number): Grid => {
    let result: Grid = base.map((row, i) => row.map((_, j) => (i === j ? 1 : 0)))
    for (let step = 0; step < exponent; step++) result = multiplyGrids(result, base)!
    return result
}

test('matrizeak batx2 z games: the hub, its levels and progress ids', () => {
    assert.deepEqual(matrizeakGames.map((game) => game.id), ['race', 'dominoes', 'solve-x', 'big-power', 'detective', 'memory'])
    assert.equal(new Set(matrizeakGameProgressIds).size, matrizeakGameProgressIds.length)
    assert.ok(matrizeakGameProgressIds.every((id) => id >= 116401 && id <= 116899), 'the block of ids of the unit')
    for (const game of matrizeakGames) {
        checkTexts([game.title, game.tagline, game.skills, ...game.levels.flatMap((level) => [level.title, level.description])])
        assert.equal(matrizeakGameModeForPath(`/matematika/batx2-zientziak/matrices/jokuak/${matrizeakGameSlugs[game.id]}`), game.id)
        // Level titles and descriptions are drawn as plain text: no LaTeX, and no Basque ending after a digit
        for (const level of game.levels) for (const text of [level.title, level.description]) assert.ok(!text.eu.includes('$') && !/\d[a-zñ]/.test(text.eu), text.eu)
    }
    assert.equal(matrizeakGameModeForPath('/matematika/batx2-zientziak/matrices/juegos/potencia-gigante'), 'big-power')
    assert.equal(matrizeakGameModeForPath('/matematika/batx2-zientziak/matrices/jokuak'), 'hub')
})

test('matrizeak batx2 z games: every race answer comes from its numbers, and the mistakes are wrong', () => {
    const kinds = new Set<string>()
    for (let circuit = 0; circuit < MATRIZEAK_RACE_CIRCUITS; circuit++) {
        for (let seed = 1; seed <= 120; seed++) {
            const question = generateMatrizeakRaceQuestion(createRandom(seed * 7919 + circuit), circuit, (seed % 3) as Tier)
            kinds.add(`${circuit} ${question.kind}`)
            assert.equal(question.circuit, circuit)
            assert.equal(question.options.length, 4)
            assert.equal(question.options.filter((option) => option.correct).length, 1)
            assert.equal(new Set(question.options.map((option) => option.latex)).size, 4)
            for (const option of question.options) render(option.latex)
            checkTexts([question.prompt, question.solution])
            const meta = question.meta as Record<string, never>
            const answer = toNumber(question.answer)
            const m = (name: string) => meta[name] as unknown as Grid
            const n = (name: string) => meta[name] as unknown as number
            let expected: number
            switch (question.kind) {
                case 'entry': expected = m('a')[n('i')][n('j')]; break
                case 'transpose': expected = n('n'); break
                case 'symmetric': expected = n('d') - n('c'); break
                case 'sum': expected = n('k') * m('a')[n('i')][n('j')] + m('b')[n('i')][n('j')]; break
                case 'product': expected = multiplyGrids(m('a'), m('b'))![n('i')][n('j')]; break
                case 'paths': expected = multiplyGrids(m('a'), m('a'))![n('i')][n('j')]; break
                case 'rank': {
                    // The rank by elimination on numbers
                    const rows = m('rows').map((row) => [...row])
                    let rank = 0
                    for (let column = 0; column < 3 && rank < 3; column++) {
                        const pivot = rows.slice(rank).findIndex((row) => Math.abs(row[column]) > 1e-9)
                        if (pivot < 0) continue
                        ;[rows[rank], rows[rank + pivot]] = [rows[rank + pivot], rows[rank]]
                        for (let r = rank + 1; r < 3; r++) {
                            const factor = rows[r][column] / rows[rank][column]
                            rows[r] = rows[r].map((value, c) => value - factor * rows[rank][c])
                        }
                        rank++
                    }
                    expected = rank
                    assert.equal(n('rank'), rank)
                    break
                }
                case 'critical': expected = (n('b') * n('c')) / n('a'); break
                case 'combination': expected = n('s') * n('p') + n('t') * n('q'); break
                case 'inverse': expected = inverseGrid(m('a'))![n('i')][n('j')]; break
                case 'singular': expected = (n('a') * n('d')) / n('b'); break
                case 'power': expected = power([[1, n('a')], [0, 1]], n('n'))[0][1]; break
                case 'solve': expected = multiplyGrids(inverseGrid(m('a'))!, m('b'))![0][0]; break
                case 'system': expected = (m('m')[n('i')][n('j')] + m('n')[n('i')][n('j')]) / 2; break
                case 'commute': {
                    const a = [[1, n('p')], [0, n('q')]]
                    const x = [[n('a'), n('b')], [0, answer]]
                    assert.ok(gridsEqual(multiplyGrids(a, x)!, multiplyGrids(x, a)!), 'X does not commute')
                    expected = answer
                    break
                }
                default: throw new Error(question.kind)
            }
            assert.ok(near(answer, expected), `${question.kind}: ${answer} ≠ ${expected}`)
            assert.equal(checkMatrizeakPitAnswer(question, String(answer).replace('.', ',')), 'correct')
            // The worked solution adds up
            for (const relation of matrixRelations(question.solution.es)) assert.ok(relation.holds, `${question.kind}: ${relation.left} = ${relation.right}`)
        }
    }
    assert.equal(kinds.size, 15)
    checkTexts(Object.values(matrizeakRaceErrorTips))
})

test('matrizeak batx2 z games: dominoes, exactly one tile fits', () => {
    for (let level = 0; level < 3; level++) {
        for (let seed = 1; seed <= 80; seed++) {
            const rounds = createDominoRounds(createRandom(seed * 104729 + level), level)
            assert.equal(rounds.length, DOMINO_ROUNDS)
            for (const round of rounds) {
                assert.equal(round.options.length, 4)
                if (level < 2) {
                    assert.deepEqual(round.options.map((option) => fits(round, option)), round.options.map((_, index) => index === round.answer))
                    assert.ok(round.chain.filter((item) => item === null).length === 1)
                } else {
                    const size = expressionSize(round)
                    const same = (option: (typeof round.options)[number]) => (option === null || size === null ? option === size : option[0] === size[0] && option[1] === size[1])
                    assert.deepEqual(round.options.map(same), round.options.map((_, index) => index === round.answer))
                    render(expressionLatex(round))
                }
            }
        }
    }
    assert.deepEqual(chainSize([[2, 3], [3, 4], [4, 1]]), [2, 1])
    assert.equal(chainSize([[2, 3], [2, 4]]), null)
})

test('matrizeak batx2 z games: solve for X, only the right way solves the equation', () => {
    const matrices: Grid[] = [[[2, 1], [1, 1]], [[1, 2], [3, 5]], [[3, -1], [2, 1]], [[1, 1], [-1, 2]]]
    for (const [level, templates] of SOLVE_TEMPLATES.entries()) {
        assert.equal(templates.length, SOLVE_ROUNDS)
        for (const template of templates) {
            for (let trial = 0; trial < 3; trial++) {
                const env = { A: matrices[trial], B: matrices[(trial + 1) % 4], C: matrices[(trial + 2) % 4] }
                const solves = (option: string) => {
                    const x = evaluateMatrix(option.replace(/^X=/, ''), env)
                    if (x === null || typeof x === 'number') return false
                    const relations = matrixRelations(`$${template.equation}$`, { ...env, X: x })
                    return relations.length === 1 && relations[0].holds
                }
                assert.ok(solves(template.right), `level ${level}: ${template.right} does not solve ${template.equation}`)
                for (const wrong of template.wrong) assert.ok(!solves(wrong), `level ${level}: ${wrong} also solves ${template.equation}`)
            }
            for (const latex of [template.equation, template.right, ...template.wrong]) render(latex)
            checkTexts([template.why])
        }
        const rounds = createSolveRounds(createRandom(level + 1), level)
        assert.equal(rounds.length, SOLVE_ROUNDS)
        for (const round of rounds) assert.equal(round.options.length, 4)
    }
})

test('matrizeak batx2 z games: the giant power is the real power', () => {
    for (let level = 0; level < 3; level++) {
        for (let seed = 1; seed <= 40; seed++) {
            const rounds = createPowerRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, POWER_ROUNDS)
            for (const round of rounds) {
                const right = power(round.base, round.exponent)
                assert.deepEqual(round.options.map((option) => gridsEqual(option, right)), round.options.map((_, index) => index === round.answer))
                assert.deepEqual(round.shown, [1, 2, 3].map((k) => power(round.base, k)))
                if (level < 2) assert.ok(round.period === (level === 0 ? 2 : periodOf(round.base)) && round.period > 0)
                else assert.equal(round.period, 0)
                for (const option of round.options) render(powerLatex(option))
            }
        }
    }
})

test('matrizeak batx2 z games: the detective, one wrong line and a fix that adds up', () => {
    checkTexts([...Object.values(matrizeakDetectiveNames), ...Object.values(matrizeakDetectiveTips)])
    for (let level = 0; level < matrizeakDetectiveLevels.length; level++) {
        const seen = new Set<string>()
        for (let seed = 1; seed <= 40; seed++) {
            const cases = createMatrizeakDetectiveCases(createRandom(seed * 31 + level), level)
            assert.equal(cases.length, MATRIZEAK_DETECTIVE_CASES)
            for (const item of cases) {
                seen.add(item.error)
                assert.ok(matrizeakDetectiveLevels[level].includes(item.error))
                assert.ok(item.options.includes(item.error) && item.options.length === 3)
                assert.ok(item.wrong >= 0 && item.wrong < item.lines.length && item.lines.length === 3)
                assert.ok(Math.abs(item.right - item.reached) > 1e-9)
                checkTexts([item.problem, ...item.lines.map((line) => line.label)])
                for (const line of item.lines) render(line.latex)
                render(item.fix)
                for (const relation of matrixRelations(`$${item.fix}$`)) assert.ok(relation.holds, `${item.error}: fix ${relation.left} = ${relation.right}`)
            }
        }
        assert.equal(seen.size, 4, `level ${level}`)
    }
})

test('matrizeak batx2 z games: memory pairs are right and every card has one partner', () => {
    for (let level = 0; level < matrizeakMemoryLevels.length; level++) {
        for (let seed = 1; seed <= 40; seed++) {
            const board = createMatrizeakMemoryBoard(createRandom(seed * 13 + level), level)
            assert.equal(board.length, 2 * MATRIZEAK_MEMORY_PAIRS)
            assert.equal(new Set(board.map((card) => card.latex)).size, board.length)
            for (let set = 0; set < MATRIZEAK_MEMORY_PAIRS; set++) {
                const [question, answer] = ['q', 'a'].map((side) => board.find((card) => card.id === `${set}-${side}`)!)
                render(question.latex)
                render(answer.latex)
                if (level === 0) assert.deepEqual(evaluateMatrix(question.latex), [[Number(answer.latex)]])
                if (level === 1) {
                    const [a] = matricesIn(`$${question.latex}$`)
                    const [t] = matricesIn(`$${answer.latex}$`)
                    assert.ok(gridsEqual(a![0].map((_, j) => a!.map((row) => row[j])), t!))
                }
                if (level === 2) {
                    const [a] = matricesIn(`$${question.latex}$`)
                    const [b] = matricesIn(`$${answer.latex}$`)
                    assert.ok(gridsEqual(multiplyGrids(a!, b!)!, [[1, 0], [0, 1]]))
                }
            }
        }
    }
})
