import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { formulaFor } from '../src/utils/latexLanguage.ts'
import { createProgrammingMemoryBoard, programmingMemoryLevels } from '../src/pages/batx2-gizarte-programazioa/games/boards.ts'
import { createProgrammingDetectiveCases, programmingDetectiveLevels, programmingDetectiveNames, programmingDetectiveTips } from '../src/pages/batx2-gizarte-programazioa/games/detective.ts'
import { programazioaGameProgressIds, programazioaGames } from '../src/pages/batx2-gizarte-programazioa/games/info.ts'
import { createExpressRounds, createKindRounds, createVertexRounds, KIND_OPTIONS } from '../src/pages/batx2-gizarte-programazioa/games/rounds.ts'
import { optimum, systemLatex, withSigns } from '../src/pages/batx2-gizarte-programazioa/lp.ts'
import { programazioaStages } from '../src/pages/batx2-gizarte-programazioa/stages.ts'
import { inHalfPlane } from '../src/pages/dbh4-akademikoak-sistemak/systems.ts'
import { evaluate } from './latex-math.ts'

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
    assert.ok(!/\d\s*€/.test(words(text.en)), text.en)
}

test('programazioa batx2 g games: ids in the block, all different, stages of this unit', () => {
    assert.deepEqual(programazioaGames.map((game) => game.id), ['which-vertex', 'express', 'solution-kind', 'detective', 'memory'])
    assert.ok(programazioaGameProgressIds.every((id) => id >= 144401 && id <= 144899))
    assert.equal(new Set(programazioaGameProgressIds).size, programazioaGameProgressIds.length)
    const stages = programazioaStages.map((stage) => stage.id)
    for (const game of programazioaGames) {
        for (const level of game.levels) assert.ok(stages.includes(level.stage), `${game.id}: ${level.stage}`)
        for (const text of [game.title, game.tagline, game.skills, ...game.levels.flatMap((level) => [level.title, level.description])]) {
            assert.ok(text.eu && text.es && text.en && text.ar)
            assert.ok(!/\$/.test(text.es), text.es)
        }
    }
})

test('programazioa batx2 g games: in «Which vertex wins?», the right option is the optimum', () => {
    for (let seed = 1; seed <= 100; seed++) {
        for (const level of [0, 1, 2]) {
            const rounds = createVertexRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, 5)
            for (const round of rounds) {
                render(systemLatex(round.constraints))
                const found = optimum(withSigns(round.constraints), round.objective, round.goal)
                assert.equal(found.kind, 'unique')
                assert.deepEqual(round.options[round.answer], found.at[0])
                assert.equal(new Set(round.options.map((point) => point.join())).size, 4)
                if (level === 1) assert.ok(round.options.some((point) => point[0] === 0 && point[1] === 0), 'the origin trap')
            }
        }
    }
})

test('programazioa batx2 g games: in «Constraint express», every wrong inequality differs from the right one somewhere', () => {
    const holds = (inequality: string, [x, y]: [number, number]) => {
        const [left, sense, right] = inequality.split(/(\\le|\\ge|=)/)
        const a = evaluate(left, (name) => (name === 'x' ? x : y))!
        const b = evaluate(right, (name) => (name === 'x' ? x : y))!
        return sense === '\\le' ? a <= b + 1e-9 : sense === '\\ge' ? a >= b - 1e-9 : Math.abs(a - b) < 1e-9
    }
    const grid: Array<[number, number]> = []
    for (let x = 0; x <= 130; x += 1) for (let y = 0; y <= 130; y += 3) grid.push([x, y])
    for (let seed = 1; seed <= 60; seed++) {
        for (const level of [0, 1, 2]) {
            const rounds = createExpressRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, 5)
            for (const round of rounds) {
                checkText(round.sentence)
                checkText(round.letters)
                assert.equal(new Set(round.options).size, 4)
                assert.equal(round.options[round.answer], round.right)
                for (const option of round.options) render(option)
                assert.ok(holds(round.right, round.inside) && !holds(round.right, round.outside), round.right)
                for (const option of round.options) if (option !== round.right) assert.ok(grid.some((point) => holds(option, point) !== holds(round.right, point)), `${option} is the same as ${round.right}`)
            }
        }
    }
})

test('programazioa batx2 g games: in «Unique, multiple or none?», the right kind is the one lp.ts gives', () => {
    for (let seed = 1; seed <= 100; seed++) {
        for (const level of [0, 1, 2]) {
            const rounds = createKindRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, 6)
            for (const round of rounds) {
                render(systemLatex(round.constraints))
                assert.equal(KIND_OPTIONS[round.answer], optimum(withSigns(round.constraints), round.objective, round.goal).kind)
            }
            if (level > 0) assert.ok(rounds.some((round) => round.kind === 'empty') && rounds.some((round) => round.kind === 'unbounded'), `${seed}/${level}`)
        }
    }
})

test('programazioa batx2 g games: the detective cases', () => {
    for (const errors of programmingDetectiveLevels) for (const error of errors) {
        checkText(programmingDetectiveNames[error])
        checkText(programmingDetectiveTips[error])
    }
    for (let seed = 1; seed <= 60; seed++) {
        for (const level of [0, 1, 2]) {
            const cases = createProgrammingDetectiveCases(createRandom(seed * 7919 + level), level)
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
    // The origin is never in a region of «at least»
    assert.ok(!inHalfPlane({ a: 1, b: 1, c: 4, sense: '≥' }, [0, 0]))
})

test('programazioa batx2 g games: memory boards with one partner per card', () => {
    for (let seed = 1; seed <= 60; seed++) {
        for (const level of programmingMemoryLevels.keys()) {
            const cards = createProgrammingMemoryBoard(createRandom(seed * 7919 + level), level)
            assert.equal(cards.length, 12)
            assert.equal(new Set(cards.map((card) => card.latex)).size, 12)
            for (const card of cards) {
                render(card.latex)
                render(card.explain)
            }
        }
    }
})
