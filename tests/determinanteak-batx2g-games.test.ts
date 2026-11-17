import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { formulaFor } from '../src/utils/latexLanguage.ts'
import { createGizarteDeterminantDetectiveCases, gizarteDeterminantDetectiveLevels, gizarteDeterminantDetectiveNames, gizarteDeterminantDetectiveTips } from '../src/pages/batx2-gizarte-determinanteak/games/detective.ts'
import { gizarteDeterminanteakGameProgressIds, gizarteDeterminanteakGames } from '../src/pages/batx2-gizarte-determinanteak/games/info.ts'
import { createQuickRounds, quickLatex } from '../src/pages/batx2-gizarte-determinanteak/games/quickCofactor.ts'
import { generateGizarteDeterminantRaceQuestion, LEFT_OUT_KINDS } from '../src/pages/batx2-gizarte-determinanteak/games/race.ts'
import { createUniqueRounds, uniqueLatex } from '../src/pages/batx2-gizarte-determinanteak/games/uniquePrices.ts'
import { detGrid, inverseGrid } from './matrix-latex.ts'
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
}
/** The value of a LaTeX number such as 3, -2 or -\frac{2}{3} */
const read = (latex: string) => evaluate(latex)!

test('determinanteak batx2 g games: ids in the block, all different, nothing of order 4', () => {
    assert.deepEqual(gizarteDeterminanteakGames.map((game) => game.id), ['race', 'unique-prices', 'quick-cofactor', 'what-happens', 'detective', 'memory'])
    assert.ok(gizarteDeterminanteakGameProgressIds.every((id) => id >= 142401 && id <= 142899))
    assert.equal(new Set(gizarteDeterminanteakGameProgressIds).size, gizarteDeterminanteakGameProgressIds.length)
    for (const game of gizarteDeterminanteakGames) for (const text of [game.title, game.tagline, game.skills, ...game.levels.flatMap((level) => [level.title, level.description])]) {
        assert.ok(text.eu && text.es && text.en && text.ar)
        assert.ok(!/orden 4|4\. ordena/.test(`${text.es} ${text.eu}`), text.es)
    }
})

test('determinanteak batx2 g games: in «Unique prices?», the right option is the one |A| gives', () => {
    for (let seed = 1; seed <= 120; seed++) {
        for (const level of [0, 1, 2]) {
            const rounds = createUniqueRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, 5)
            if (level < 2) {
                const zeros = rounds.filter((round) => round.det === 0).length
                assert.ok(zeros >= 2 && zeros <= 3, `level ${level}: ${zeros} with |A| = 0`)
            }
            for (const round of rounds) {
                render(uniqueLatex(round))
                render(round.worked)
                if (level < 2) {
                    assert.equal(Math.round(detGrid(round.q as number[][])!), round.det)
                    assert.equal(round.verdicts.length, 4)
                    assert.equal(new Set(round.verdicts.map((option) => `${option.found}:${option.value}`)).size, 4)
                    const right = round.verdicts[round.answer]
                    assert.deepEqual(right, { found: round.det !== 0, value: round.det })
                    for (const option of round.verdicts) assert.ok(option.found === (option.value !== 0), 'a yes with |A| = 0 or a no with |A| ≠ 0')
                } else {
                    const [[p, letter], [r, s]] = round.q as [[number, string], [number, number]]
                    assert.equal(letter, 'a')
                    const a = round.values[round.answer]
                    assert.equal(p * s - r * a, 0)
                    assert.equal(new Set(round.values).size, 4)
                    for (const value of round.values) if (value !== a) assert.notEqual(p * s - r * value, 0)
                }
            }
        }
    }
})

test('determinanteak batx2 g games: in «Quick cofactor», only the right option is the cofactor or the entry of A⁻¹', () => {
    for (let seed = 1; seed <= 120; seed++) {
        for (const level of [0, 1, 2]) {
            const rounds = createQuickRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, 5)
            for (const round of rounds) {
                render(quickLatex(round))
                render(round.worked)
                assert.equal(new Set(round.options).size, 4)
                for (const option of round.options) render(option)
                const values = round.options.map(read)
                const minor = round.a.filter((_, r) => r !== round.row).map((cells) => cells.filter((_, c) => c !== round.column))
                const sign = (round.row + round.column) % 2 === 0 ? 1 : -1
                const right = level === 0 ? sign * detGrid(minor)! : inverseGrid(round.a)![round.row][round.column]
                assert.ok(Math.abs(values[round.answer] - right) < 1e-9, `${round.options[round.answer]} ≠ ${right}`)
                values.forEach((value, index) => { if (index !== round.answer) assert.ok(Math.abs(value - right) > 1e-9) })
                if (level > 0) assert.ok(Math.abs(detGrid(round.a)! - round.det) < 1e-9)
            }
        }
    }
})

test('determinanteak batx2 g games: the detective cases', () => {
    for (const errors of gizarteDeterminantDetectiveLevels) for (const error of errors) {
        checkText(gizarteDeterminantDetectiveNames[error])
        checkText(gizarteDeterminantDetectiveTips[error])
    }
    for (let seed = 1; seed <= 60; seed++) {
        for (const level of [0, 1, 2]) {
            const cases = createGizarteDeterminantDetectiveCases(createRandom(seed * 7919 + level), level)
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

test('determinanteak batx2 g games: the race leaves out order 4, and its own answers are right', () => {
    const seen = new Set<string>()
    for (let seed = 1; seed <= 150; seed++) {
        for (const circuit of [0, 1, 2, 3, 4]) {
            const question = generateGizarteDeterminantRaceQuestion(createRandom(seed * 7919 + circuit), circuit, 1)
            seen.add(question.kind)
            assert.ok(!LEFT_OUT_KINDS.includes(question.kind), question.kind)
            assert.equal(question.options.filter((option) => option.correct).length, 1)
            assert.equal(new Set(question.options.map((option) => option.latex)).size, 4)
            checkText(question.prompt)
            const meta = question.meta as Record<string, number[][] | number>
            const answer = question.answer.numerator / question.answer.denominator
            if (question.kind === 'bundles') assert.equal(answer, Math.round(detGrid(meta.q as number[][])!))
            if (question.kind === 'critical-bundle') {
                const { p, r, s } = meta as Record<string, number>
                assert.equal(p * s - r * answer, 0)
            }
        }
    }
    for (const kind of ['bundles', 'critical-bundle']) assert.ok(seen.has(kind), kind)
})
