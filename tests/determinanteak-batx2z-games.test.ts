import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import type { Tier } from '../src/features/unit-v2/games/raceCore.ts'
import { toNumber } from '../src/features/unit-v2/math/fraction.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { cofactor, inverseByCofactors } from '../src/pages/batx2-zientziak-determinanteak/determinant.ts'
import { createDeterminanteakMemoryBoard, DETERMINANTEAK_MEMORY_PAIRS, determinanteakMemoryLevels } from '../src/pages/batx2-zientziak-determinanteak/games/boards.ts'
import { createDeterminanteakDetectiveCases, DETERMINANTEAK_DETECTIVE_CASES, determinanteakDetectiveLevels, determinanteakDetectiveNames, determinanteakDetectiveTips } from '../src/pages/batx2-zientziak-determinanteak/games/detective.ts'
import { determinanteakGameModeForPath, determinanteakGameProgressIds, determinanteakGames, determinanteakGameSlugs } from '../src/pages/batx2-zientziak-determinanteak/games/info.ts'
import { checkDeterminanteakPitAnswer, DETERMINANTEAK_RACE_CIRCUITS, determinanteakRaceErrorTips, generateDeterminanteakRaceQuestion } from '../src/pages/batx2-zientziak-determinanteak/games/race.ts'
import { createWhatRounds, LETTER_TEMPLATES, optionLatex, WHAT_ROUNDS } from '../src/pages/batx2-zientziak-determinanteak/games/whatHappens.ts'
import { createZeroRounds, holds, relationLatex, ZERO_ROUNDS } from '../src/pages/batx2-zientziak-determinanteak/games/zeroOrNot.ts'
import { detGrid, evaluateMatrix, gridsEqual, matricesIn, matrixRelations, type Grid } from './matrix-latex.ts'
import { near } from './latex-math.ts'

const languages = ['eu', 'es', 'en', 'ar'] as const
const render = (latex: string, language: (typeof languages)[number] = 'es') => katex.renderToString(formulaFor(language, latex), { throwOnError: true, strict: 'error' })
const value = (input: { numerator: number; denominator: number }) => input.numerator / input.denominator

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

test('determinanteak batx2 z games: the hub, its levels and progress ids', () => {
    assert.deepEqual(determinanteakGames.map((game) => game.id), ['race', 'what-happens', 'zero-or-not', 'detective', 'memory'])
    assert.equal(new Set(determinanteakGameProgressIds).size, determinanteakGameProgressIds.length)
    assert.ok(determinanteakGameProgressIds.every((id) => id >= 117401 && id <= 117899), 'the block of ids of the unit')
    for (const game of determinanteakGames) {
        checkTexts([game.title, game.tagline, game.skills, ...game.levels.flatMap((level) => [level.title, level.description])])
        assert.equal(determinanteakGameModeForPath(`/matematika/batx2-zientziak/determinantes/jokuak/${determinanteakGameSlugs[game.id]}`), game.id)
        for (const level of game.levels) for (const text of [level.title, level.description]) assert.ok(!text.eu.includes('$') && !/\d[a-zñ]/.test(text.eu), text.eu)
    }
    assert.equal(determinanteakGameModeForPath('/matematika/batx2-zientziak/determinantes/juegos/cero-sin-calcular'), 'zero-or-not')
    assert.equal(determinanteakGameModeForPath('/matematika/batx2-zientziak/determinantes/jokuak'), 'hub')
})

test('determinanteak batx2 z games: every race answer comes from its numbers, and the worked solution adds up', () => {
    const kinds = new Set<string>()
    for (let circuit = 0; circuit < DETERMINANTEAK_RACE_CIRCUITS; circuit++) {
        for (let seed = 1; seed <= 120; seed++) {
            const question = generateDeterminanteakRaceQuestion(createRandom(seed * 7919 + circuit), circuit, (seed % 3) as Tier)
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
                case 'two':
                case 'sarrus':
                case 'line':
                case 'block': expected = detGrid(m('a'))!; break
                case 'equation': expected = (n('v') + n('b') * n('c')) / n('d'); break
                case 'scale': expected = n('k') ** n('n') * n('d'); break
                case 'rows': expected = n('factor') * n('d'); break
                case 'product': expected = [n('a') * n('b'), n('b') / n('a'), n('a') ** 2 * n('b')][n('kind')]; break
                case 'cofactor': expected = value(cofactor(m('a'), n('i'), n('j'))); break
                case 'rank': {
                    const rows = m('rows')
                    const d = detGrid(rows)!
                    const anyTwo = [[0, 1], [0, 2], [1, 2]].some(([r1, r2]) => [[0, 1], [0, 2], [1, 2]].some(([c1, c2]) => !near(rows[r1][c1] * rows[r2][c2] - rows[r1][c2] * rows[r2][c1], 0)))
                    expected = !near(d, 0) ? 3 : anyTwo ? 2 : 1
                    assert.equal(n('rank'), expected)
                    break
                }
                case 'critical': expected = n('a'); assert.ok(near(detGrid([[1, 1, 1], [1, 2, n('q')], [1, n('r'), answer]])!, 0)); break
                case 'square': expected = Math.sqrt(n('c')); break
                case 'inverse': expected = value(inverseByCofactors(m('a'))![n('i')][n('j')]); break
                case 'singular': {
                    expected = n('r1')
                    assert.ok(near(detGrid([[answer, n('a')], [n('b'), answer + n('c')]])!, 0), 'the matrix is not singular')
                    break
                }
                case 'det-x': expected = (n('k') ** n('n') * n('b')) / n('a'); break
                default: throw new Error(question.kind)
            }
            assert.ok(near(answer, expected), `${question.kind}: ${answer} ≠ ${expected}`)
            assert.equal(checkDeterminanteakPitAnswer(question, question.answer.denominator === 1 ? String(question.answer.numerator) : `${question.answer.numerator}/${question.answer.denominator}`), 'correct')
            for (const relation of matrixRelations(question.solution.es)) assert.ok(relation.holds, `${question.kind}: ${relation.left} = ${relation.right}`)
        }
    }
    assert.equal(kinds.size, 15)
    checkTexts(Object.values(determinanteakRaceErrorTips))
})

test('determinanteak batx2 z games: what happens to the determinant, only the property gives the right option', () => {
    for (let level = 0; level < 3; level++) {
        const asked = new Set<string>()
        for (let seed = 1; seed <= 60; seed++) {
            const rounds = createWhatRounds(createRandom(seed * 104729 + level), level)
            assert.equal(rounds.length, WHAT_ROUNDS)
            for (const round of rounds) {
                asked.add(`${round.asked} ${round.factor.join('/')}`)
                assert.equal(round.options.length, 4)
                assert.equal(new Set(round.options.map(optionLatex)).size, 4)
                const right = round.options[round.answer]
                assert.ok(near(value(right), (round.factor[0] * round.base) / round.factor[1]), `${round.given} ${round.asked}`)
                render(round.given)
                render(round.asked)
                for (const option of round.options) render(optionLatex(option))
                checkTexts([round.why])
            }
        }
        assert.ok(asked.size >= 5, `level ${level}: only ${asked.size} kinds`)
    }
    // The letters: each template, with numbers put in for the letters, gives factor × the first determinant
    const letters = { a: 2, b: -1, c: 3, d: 1, e: 4, f: 0, g: -2, h: 5, i: 1 }
    const numberOf = (cell: string) => Function(...Object.keys(letters), `return ${cell.replace(/(\d)([a-i])/g, '$1*$2')}`)(...Object.values(letters)) as number
    const base = detGrid([['a', 'b', 'c'], ['d', 'e', 'f'], ['g', 'h', 'i']].map((row) => row.map(numberOf)))!
    for (const template of LETTER_TEMPLATES) assert.ok(near(detGrid(template.rows.map((row) => row.map(numberOf)))!, template.factor * base), template.rows.join(' | '))
})

test('determinanteak batx2 z games: zero without working it out, exactly one statement is true', () => {
    for (let level = 0; level < 3; level++) {
        let traps = 0
        for (let seed = 1; seed <= 60; seed++) {
            const rounds = createZeroRounds(createRandom(seed * 31 + level), level)
            assert.equal(rounds.length, ZERO_ROUNDS)
            for (const round of rounds) {
                const d = detGrid(round.rows)!
                assert.ok(near(d, round.value))
                assert.equal(round.options.length, 4)
                assert.equal(round.options[3], null)
                const truth = round.options.map((option) => (option === null ? !near(d, 0) : holds(round.rows, option)))
                assert.deepEqual(truth, round.options.map((_, index) => index === round.answer))
                if (!near(d, 0)) traps += 1
                for (const option of round.options) render(relationLatex(option))
                if (level === 0) assert.ok(round.options.slice(0, 3).some((option) => option !== null && option.b === 0))
            }
        }
        assert.ok(traps > 30, `level ${level}: only ${traps} traps`)
    }
})

test('determinanteak batx2 z games: the detective, one wrong line and a fix that adds up', () => {
    checkTexts([...Object.values(determinanteakDetectiveNames), ...Object.values(determinanteakDetectiveTips)])
    for (let level = 0; level < determinanteakDetectiveLevels.length; level++) {
        const seen = new Set<string>()
        for (let seed = 1; seed <= 40; seed++) {
            const cases = createDeterminanteakDetectiveCases(createRandom(seed * 31 + level), level)
            assert.equal(cases.length, DETERMINANTEAK_DETECTIVE_CASES)
            for (const item of cases) {
                seen.add(item.error)
                assert.ok(determinanteakDetectiveLevels[level].includes(item.error))
                assert.ok(item.options.includes(item.error) && item.options.length === 3)
                assert.ok(item.wrong >= 0 && item.wrong < item.lines.length && item.lines.length === 3)
                assert.ok(Math.abs(item.right - item.reached) > 1e-9)
                checkTexts([item.problem, ...item.lines.map((line) => line.label)])
                for (const line of item.lines) render(line.latex)
                render(item.fix)
                for (const relation of matrixRelations(`$${item.fix}$`)) assert.ok(relation.holds, `${item.error}: fix ${relation.left} = ${relation.right}`)
                // The lines before the wrong one are right
                for (const line of item.lines.slice(0, item.wrong)) for (const relation of matrixRelations(`$${line.latex}$`)) assert.ok(relation.holds, `${item.error}: line ${relation.left} = ${relation.right}`)
            }
        }
        assert.equal(seen.size, 4, `level ${level}`)
    }
})

test('determinanteak batx2 z games: memory pairs are right and every card has one partner', () => {
    for (let level = 0; level < determinanteakMemoryLevels.length; level++) {
        for (let seed = 1; seed <= 40; seed++) {
            const board = createDeterminanteakMemoryBoard(createRandom(seed * 13 + level), level)
            assert.equal(board.length, 2 * DETERMINANTEAK_MEMORY_PAIRS)
            assert.equal(new Set(board.map((card) => card.latex)).size, board.length)
            for (let set = 0; set < DETERMINANTEAK_MEMORY_PAIRS; set++) {
                const [question, answer] = ['q', 'a'].map((side) => board.find((card) => card.id === `${set}-${side}`)!)
                render(question.latex)
                render(answer.latex)
                render(question.explain)
                if (level < 2) assert.ok(near(evaluateMatrix(question.latex) as number, Number(answer.latex)), question.explain)
                else {
                    const [a] = matricesIn(`$${question.latex}$`)
                    const [adjugate] = matricesIn(`$${answer.latex}$`)
                    assert.ok(gridsEqual(adjugate!, a!.map((row, i) => row.map((_, j) => value(cofactor(a!, i, j))))))
                }
            }
        }
    }
})
