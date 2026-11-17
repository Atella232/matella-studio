import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { formulaFor } from '../src/utils/latexLanguage.ts'
import { createGizarteMemoryBoard, gizarteMemoryLevels } from '../src/pages/batx2-gizarte-matrizeak/games/boards.ts'
import { createGizarteDetectiveCases, gizarteDetectiveLevels, gizarteDetectiveNames, gizarteDetectiveTips } from '../src/pages/batx2-gizarte-matrizeak/games/detective.ts'
import { createHiddenRounds, hiddenLatex, hiddenWorked } from '../src/pages/batx2-gizarte-matrizeak/games/hiddenTicket.ts'
import { gizarteMatrizeakGameProgressIds, gizarteMatrizeakGames } from '../src/pages/batx2-gizarte-matrizeak/games/info.ts'
import { generateGizarteRaceQuestion, LEFT_OUT_KINDS } from '../src/pages/batx2-gizarte-matrizeak/games/race.ts'
import { createWhichRounds, WHICH_TEMPLATES } from '../src/pages/batx2-gizarte-matrizeak/games/whichProduct.ts'
import { evaluateMatrix, gridsEqual, type Env, type Grid } from './matrix-latex.ts'

const render = (latex: string) => katex.renderToString(latex, { throwOnError: true, strict: 'error' })
function checkText(text: LocalizedText) {
    for (const language of ['eu', 'es', 'en', 'ar'] as const) {
        assert.ok(text[language].trim(), `empty ${language}`)
        for (const [, formula] of text[language].matchAll(/\$([^$]+)\$/g)) katex.renderToString(formulaFor(language, formula), { throwOnError: true, strict: 'error' })
    }
    const words = (value: string) => value.replace(/\$[^$]+\$/g, ' ')
    assert.ok(/[؀-ۿ]/.test(words(text.ar)) || !/[a-zA-Z]{3}/.test(words(text.es)), `not Arabic: ${text.ar}`)
    for (const language of ['eu', 'es', 'en'] as const) assert.ok(!/[؀-ۿ]/.test(text[language]), `Arabic in ${language}: ${text[language]}`)
    assert.ok(!/\d[a-zñ]/.test(words(text.eu)) && !/\$(?:ri|ren|rekin|z|ra|tik|ei|ek|ak|en|ko|an)(?![a-zA-Z])/.test(text.eu), text.eu)
}

test('matrizeak batx2 g games: ids in the block, all different', () => {
    assert.deepEqual(gizarteMatrizeakGames.map((game) => game.id), ['race', 'which-product', 'hidden-ticket', 'solve-x', 'detective', 'memory'])
    assert.ok(gizarteMatrizeakGameProgressIds.every((id) => id >= 141401 && id <= 141899))
    assert.equal(new Set(gizarteMatrizeakGameProgressIds).size, gizarteMatrizeakGameProgressIds.length)
    for (const game of gizarteMatrizeakGames) for (const text of [game.title, game.tagline, game.skills, ...game.levels.flatMap((level) => [level.title, level.description])]) assert.ok(text.eu && text.es && text.en && text.ar)
    const race = gizarteMatrizeakGames[0]
    assert.ok(!race.levels.some((level) => /combina|conmut/.test(level.description.es)))
})

/** Random whole matrices for the names of a template, with the sizes it gives */
function randomEnv(seed: number, template: (typeof WHICH_TEMPLATES)[number][number]): Env {
    const random = createRandom(seed)
    return Object.fromEntries(template.matrices.map((matrix) => [matrix.name, Array.from({ length: matrix.rows }, () => Array.from({ length: matrix.columns }, () => 1 + Math.floor(random() * 9)))]))
}
const transpose = (grid: Grid): Grid => grid[0].map((_, j) => grid.map((row) => row[j]))

test('matrizeak batx2 g games: in «Which product», only the right expression gives what is asked', () => {
    for (const level of WHICH_TEMPLATES) {
        assert.equal(level.length, 5)
        for (const template of level) {
            checkText(template.question)
            checkText(template.why)
            for (const matrix of template.matrices) checkText(matrix.meaning)
            for (const option of [template.right, ...template.wrong]) render(option)
            assert.equal(new Set([template.right, ...template.wrong]).size, 4)
            for (let seed = 1; seed <= 20; seed++) {
                const env = randomEnv(seed, template)
                const right = evaluateMatrix(template.right, env)
                assert.ok(Array.isArray(right), `${template.right} cannot be worked out`)
                for (const wrong of template.wrong) {
                    const value = evaluateMatrix(wrong, env)
                    if (!Array.isArray(value)) continue
                    assert.ok(!gridsEqual(value, right as Grid) && !gridsEqual(value, transpose(right as Grid)), `${wrong} gives the same as ${template.right}`)
                }
            }
        }
    }
    for (let seed = 1; seed <= 60; seed++) {
        for (const level of [0, 1, 2]) {
            const rounds = createWhichRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, 5)
            for (const round of rounds) assert.equal(round.options[round.answer], round.right)
        }
    }
})

test('matrizeak batx2 g games: in «The hidden receipt», the covered number solves the row and only it', () => {
    for (let seed = 1; seed <= 200; seed++) {
        for (const level of [0, 1, 2]) {
            const rounds = createHiddenRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, 5)
            for (const round of rounds) {
                const prices = level === 2 ? round.sell.map((value, k) => value - round.cost[k]) : round.sell
                assert.deepEqual(round.totals, round.q.map((row) => row.reduce((sum, value, k) => sum + value * prices[k], 0)))
                const { kind, row, column } = round.hidden
                const covered = kind === 'price' ? round.sell[column] : kind === 'quantity' ? round.q[row][column] : round.cost[column]
                assert.equal(round.value, covered)
                assert.equal(round.options[round.answer], round.value)
                assert.equal(new Set(round.options).size, 4)
                assert.ok(round.options.every((value) => Number.isInteger(value) && value > 0))
                if (kind === 'quantity') assert.equal(row, round.row)
                // Another value in the hole would change the total of the row used
                for (const option of round.options) {
                    if (option === round.value) continue
                    const sell = kind === 'price' ? round.sell.map((value, k) => (k === column ? option : value)) : round.sell
                    const cost = kind === 'cost' ? round.cost.map((value, k) => (k === column ? option : value)) : round.cost
                    const q = round.q.map((cells, r) => cells.map((value, k) => (kind === 'quantity' && r === row && k === column ? option : value)))
                    const unit = level === 2 ? sell.map((value, k) => value - cost[k]) : sell
                    assert.notEqual(q[round.row].reduce((sum, value, k) => sum + value * unit[k], 0), round.totals[round.row])
                }
                render(hiddenLatex(round))
                render(hiddenWorked(round))
            }
        }
    }
})

test('matrizeak batx2 g games: the detective cases', () => {
    for (const errors of gizarteDetectiveLevels) for (const error of errors) {
        checkText(gizarteDetectiveNames[error])
        checkText(gizarteDetectiveTips[error])
    }
    for (let seed = 1; seed <= 60; seed++) {
        for (const level of [0, 1, 2]) {
            const cases = createGizarteDetectiveCases(createRandom(seed * 7919 + level), level)
            assert.equal(cases.length, 6)
            for (const item of cases) {
                assert.notEqual(item.right, item.reached)
                assert.ok(item.wrong >= 0 && item.wrong < item.lines.length)
                assert.ok(item.options.includes(item.error))
                checkText(item.problem)
                for (const line of item.lines) render(line.latex)
                render(item.fix)
            }
        }
    }
})

test('matrizeak batx2 g games: the race leaves out what the books do not have, and its own answers are right', () => {
    const seen = new Set<string>()
    for (let seed = 1; seed <= 150; seed++) {
        for (const circuit of [0, 1, 2, 3, 4]) {
            const question = generateGizarteRaceQuestion(createRandom(seed * 7919 + circuit), circuit, 1)
            seen.add(question.kind)
            assert.ok(!LEFT_OUT_KINDS.includes(question.kind), question.kind)
            assert.equal(question.options.filter((option) => option.correct).length, 1)
            assert.equal(new Set(question.options.map((option) => option.latex)).size, 4)
            checkText(question.prompt)
            const meta = question.meta as Record<string, number[][] | number>
            const answer = question.answer.numerator / question.answer.denominator
            if (question.kind === 'table') assert.equal(answer, (meta.q as number[][])[meta.i as number][meta.j as number])
            if (question.kind === 'income') assert.equal(answer, (meta.q as number[][])[meta.i as number].reduce((sum, value, k) => sum + value * (meta.v as number[][])[0][k], 0))
            if (question.kind === 'order') assert.equal(answer, (meta.order as number[][])[0].reduce((sum, value, k) => sum + value * (meta.recipe as number[][])[k][meta.j as number], 0))
            if (question.kind === 'form') {
                const a = meta.a as number[][]
                const x = (meta.x as number[][])[0]
                assert.deepEqual(a.map((row) => row[0] * x[0] + row[1] * x[1]), (meta.b as number[][])[0])
                assert.equal(answer, x[0])
            }
        }
    }
    for (const kind of ['table', 'income', 'order', 'form']) assert.ok(seen.has(kind), kind)
})

test('matrizeak batx2 g games: memory boards with one partner per card', () => {
    for (let seed = 1; seed <= 60; seed++) {
        for (const level of gizarteMemoryLevels.keys()) {
            const cards = createGizarteMemoryBoard(createRandom(seed * 7919 + level), level)
            assert.equal(cards.length, 12)
            assert.equal(new Set(cards.map((card) => card.latex)).size, 12)
            for (const card of cards) {
                render(card.latex)
                render(card.explain)
            }
        }
    }
})
