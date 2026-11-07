import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import type { Tier } from '../src/features/unit-v2/games/raceCore.ts'
import { toNumber } from '../src/features/unit-v2/math/fraction.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { bachSystemsGameModeForPath, bachSystemsGameProgressIds, bachSystemsGames, bachSystemsGameSlugs } from '../src/pages/batx1-zientziak-sistemak/games/info.ts'
import { BACH_SYSTEMS_RACE_CIRCUITS, bachSystemsRaceErrorTips, checkBachSystemsPitAnswer, generateBachSystemsRaceQuestion } from '../src/pages/batx1-zientziak-sistemak/games/race.ts'
import { combined, createZeroRounds, ZERO_ROUNDS, zeroLeft, zeroMatrixLatex, zeroOperationLatex, zeroRowLatex } from '../src/pages/batx1-zientziak-sistemak/games/zero.ts'
import { createLastRowRounds, LAST_ROW_ROUNDS, lastRowLatex, lastRowMatrixLatex, roundNumbers, rowsKind } from '../src/pages/batx1-zientziak-sistemak/games/lastRow.ts'
import { BACH_SYSTEMS_DETECTIVE_CASES, bachSystemsDetectiveLevels, bachSystemsDetectiveNames, bachSystemsDetectiveTips, createBachSystemsDetectiveCases } from '../src/pages/batx1-zientziak-sistemak/games/detective.ts'
import { BACH_SYSTEMS_MEMORY_PAIRS, bachSystemsMemoryLevels, createBachSystemsMemoryBoard } from '../src/pages/batx1-zientziak-sistemak/games/boards.ts'
import { evaluate, near } from './latex-math.ts'

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
        // No Basque suffix glued to a number or to a formula (the $ that opens a formula is not a suffix)
        assert.ok(!/\d(?:ri|ren|rekin|ekin|ek|ak|ra|tik|z|ei|en|k)(?![a-zA-Z])/.test(text.eu.replace(/\$[^$]+\$/g, '')), text.eu)
        assert.ok(!/§(?:ri|ren|rekin|z|ra|tik|ei)(?![a-zA-Z])/.test(text.eu.replace(/\$[^$]+\$/g, '§')), text.eu)
        // MathText turns «:» into ÷ inside formulas
        for (const [, formula] of text.es.matchAll(/\$([^$]+)\$/g)) assert.ok(!formula.includes(':'), formula)
    }
}

/** Every row of a \begin{cases} in a prompt, checked at a point */
const rowsOf = (text: string) => [...text.matchAll(/\\begin\{cases\}([\s\S]*?)\\end\{cases\}/g)].flatMap(([, body]) => body.split(/\\\\/).map((row) => row.trim()))
function holdsAt(row: string, values: Record<string, number>): boolean | null {
    const [left, right] = row.split('=')
    if (right === undefined || /\\le|\\ge|</.test(row)) return null
    const at = (side: string) => evaluate(side, (name) => (name in values ? values[name] : Number.NaN))
    const a = at(left)
    const b = at(right)
    return a === null || b === null ? null : near(a, b)
}

test('sistemak batx1 z games: the hub, its levels and progress ids', () => {
    assert.deepEqual(bachSystemsGames.map((game) => game.id), ['race', 'zero', 'last-row', 'detective', 'memory', 'cross', 'touch'])
    assert.equal(new Set(bachSystemsGameProgressIds).size, bachSystemsGameProgressIds.length)
    // The unit's block of ids: games go from 113401 to 113899
    for (const id of bachSystemsGameProgressIds) assert.ok(id >= 113401 && id <= 113899, `${id}`)
    const stages = ['linear', 'gauss', 'discussion', 'nonlinear', 'inequalities']
    for (const game of bachSystemsGames) {
        assert.ok(game.levels.length >= 3, game.id)
        for (const level of game.levels) {
            assert.ok(stages.includes(level.stage), `${game.id}: ${level.stage}`)
            // Titles and descriptions are drawn as plain text
            for (const language of languages) assert.ok(!level.description[language].includes('$') && !level.title[language].includes('$'), `${game.id} ${language}`)
        }
        checkTexts([game.title, game.tagline, game.skills, ...game.levels.flatMap((level) => [level.title, level.description])])
        assert.equal(bachSystemsGameModeForPath(`/matematika/batx1-zientziak/sistemas/jokuak/${bachSystemsGameSlugs[game.id]}`), game.id)
    }
    assert.equal(bachSystemsGameModeForPath('/matematika/batx1-zientziak/sistemas/jokuak'), 'hub')
})

test('sistemak batx1 z games: every race question has one right option, worked out from its numbers', () => {
    const kinds = new Set<string>()
    for (let circuit = 0; circuit < BACH_SYSTEMS_RACE_CIRCUITS; circuit += 1) {
        for (const tier of [0, 1, 2] as Tier[]) {
            for (let seed = 1; seed <= 60; seed += 1) {
                const question = generateBachSystemsRaceQuestion(createRandom(seed * 7919 + circuit * 31 + tier), circuit, tier)
                kinds.add(question.kind)
                assert.equal(question.circuit, circuit)
                assert.equal(question.options.length, 4, question.kind)
                assert.equal(question.options.filter((option) => option.correct).length, 1, question.kind)
                assert.equal(new Set(question.options.map((option) => option.latex)).size, 4, `${question.kind}: ${question.options.map((option) => option.latex).join(' | ')}`)
                for (const option of question.options) render(option.latex)
                checkTexts([question.prompt, question.solution])
                const right = question.options.find((option) => option.correct)!
                assert.equal(checkBachSystemsPitAnswer(question, right.latex.replace(/\\frac\{(\d+)\}\{(\d+)\}/, '$1/$2').replace('{,}', ',')), 'correct', `${question.kind}: ${right.latex}`)
                const answer = toNumber(question.answer)
                const { meta } = question
                // The answer, worked out again from the numbers of the question
                const expected: Record<string, number> = {
                    missing: meta.k,
                    inconsistent: meta.k,
                    coefficient: meta.q - meta.a * meta.p,
                    back: meta.x,
                    k: -meta.a,
                    problem: (meta.s - meta.d) / 4,
                    'last-row': meta.d / meta.c,
                    lambda: meta.p + meta.q * meta.v,
                    critical: meta.s * meta.p,
                    'sum-product': Math.max(meta.m, meta.n),
                    squares: meta.y2 > 0 ? 4 : meta.y2 === 0 ? 2 : 0,
                    exponential: meta.x + meta.y,
                    lattice: ((meta.n + 1) * (meta.n + 2)) / 2,
                    boundary: (meta.c - 2 * meta.a) / meta.b,
                    area: (meta.c * meta.c) / (2 * meta.a * meta.b)
                }
                assert.ok(question.kind in expected, question.kind)
                assert.ok(near(answer, expected[question.kind]), `${question.kind}: ${answer} ≠ ${expected[question.kind]}`)
                // The systems of the prompt hold at their solution
                if (question.kind === 'back') for (const row of rowsOf(question.prompt.es)) assert.notEqual(holdsAt(row, { x: meta.x, y: meta.y, z: meta.z }), false, row)
                if (question.kind === 'sum-product') for (const row of rowsOf(question.prompt.es)) assert.notEqual(holdsAt(row, { x: meta.n, y: meta.m }), false, row)
                if (question.kind === 'exponential') assert.ok(question.prompt.es.includes(`2^x+2^y=${2 ** meta.x + 2 ** meta.y}`))
                // With the critical a the coefficient of y vanishes but the right-hand side does not
                if (question.kind === 'critical') assert.notEqual(meta.b - meta.s * meta.r, 0)
                if (question.kind === 'inconsistent') assert.notEqual(meta.t, meta.k * meta.r)
            }
        }
    }
    assert.equal(kinds.size, 15)
    checkTexts(Object.values(bachSystemsRaceErrorTips))
})

test('sistemak batx1 z games: haz el cero', () => {
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 80; seed += 1) {
            const rounds = createZeroRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, ZERO_ROUNDS, `level ${level} seed ${seed}`)
            for (const [index, round] of rounds.entries()) {
                assert.equal(round.options.length, 4)
                // Exactly one option leaves the 0, and it is the answer
                const zeros = round.options.map((option) => zeroLeft(round, option) === 0)
                assert.equal(zeros.filter(Boolean).length, 1, `level ${level}: ${zeroMatrixLatex(round.rows)}`)
                assert.ok(zeros[round.answer])
                assert.equal(new Set(round.options.map((option) => zeroOperationLatex(round.target, round.source, option))).size, 4)
                for (const option of round.options) {
                    assert.ok(option.m >= 1 && option.k !== 0)
                    render(zeroOperationLatex(round.target, round.source, option))
                }
                // Levels 1 and 2 need no m; level 3 always does
                const right = round.options[round.answer]
                assert.equal(right.m === 1, level < 2, `level ${level}: m = ${right.m}`)
                // The new row is the whole row, constant term too
                assert.deepEqual(round.after[round.target], combined(round.rows, round.target, round.source, right))
                assert.equal(round.after[round.target][round.column], 0)
                render(zeroMatrixLatex(round.rows))
                render(zeroRowLatex(round.after[round.target]))
                // The solution satisfies the starting rows and the rows after the step: they are equivalent
                if (round.solution) {
                    for (const row of [...round.rows, ...round.after]) {
                        const total = row.slice(0, -1).reduce((sum, value, column) => sum + value * round.solution![column], 0)
                        assert.equal(total, row[row.length - 1])
                    }
                }
                // At level 2 the three steps follow one another on the same matrix
                if (level === 1 && index % 3 !== 0) assert.deepEqual(round.rows, rounds[index - 1].after)
                if (level === 1) assert.equal(round.solution !== null, index % 3 === 2)
            }
        }
    }
})

test('sistemak batx1 z games: lee la última fila', () => {
    for (let level = 0; level < 3; level += 1) {
        const seen = new Set<string>()
        for (let seed = 1; seed <= 80; seed += 1) {
            const rounds = createLastRowRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, LAST_ROW_ROUNDS)
            for (const round of rounds) {
                render(lastRowMatrixLatex(round))
                render(lastRowLatex(round))
                seen.add(round.kind)
                if (round.mode === 'kind') {
                    // The kind is what the numbers say
                    assert.equal(rowsKind(roundNumbers(round)), round.kind, lastRowMatrixLatex(round))
                    continue
                }
                // Level 3: only the critical a gives the kind asked; the other two give one solution
                assert.equal(level, 2)
                assert.equal(round.values.length, 3)
                assert.equal(new Set(round.values).size, 3)
                assert.ok(round.values.includes(round.critical))
                for (const a of round.values) assert.equal(rowsKind(roundNumbers(round, a)), a === round.critical ? round.asked : 'one', `${lastRowMatrixLatex(round)} a=${a}`)
            }
        }
        assert.equal(seen.size, level === 2 ? 2 : 3, `level ${level}`)
    }
    // A 0 on the right of a row that still has z is one solution, not none
    assert.equal(rowsKind([[1, 2, 1, 3], [0, 1, 1, 2], [0, 0, -2, 0]]), 'one')
    assert.equal(rowsKind([[1, 2, 1, 3], [0, 0, 0, 4], [0, 0, 0, 0]]), 'none')
    assert.equal(rowsKind([[1, 2, 1, 3], [0, 0, 0, 0], [0, 0, 0, 0]]), 'infinite')
})

test('sistemak batx1 z games: el detective de sistemas', () => {
    assert.equal(bachSystemsDetectiveLevels.flat().length, 12)
    assert.equal(new Set(bachSystemsDetectiveLevels.flat()).size, 12)
    checkTexts([...Object.values(bachSystemsDetectiveNames), ...Object.values(bachSystemsDetectiveTips)])
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 60; seed += 1) {
            const made = createBachSystemsDetectiveCases(createRandom(seed * 7919 + level), level)
            assert.equal(made.length, BACH_SYSTEMS_DETECTIVE_CASES)
            for (const item of made) {
                assert.ok(bachSystemsDetectiveLevels[level].includes(item.error))
                assert.equal(item.lines.length, 3)
                assert.ok(item.wrong >= 0 && item.wrong < 3)
                assert.equal(item.options.length, 3)
                assert.ok(item.options.includes(item.error))
                assert.notEqual(item.right, item.reached)
                checkTexts([item.problem])
                for (const line of item.lines) {
                    render(line.latex)
                    checkTexts([line.label])
                }
                render(item.fix)
                // The worked numbers of the fix add up
                for (const piece of item.fix.split(/\\ \\to\\ |,\\ /)) {
                    const sides = piece.split('=').map((side) => evaluate(side)).filter((value): value is number => value !== null)
                    if (sides.length > 1) assert.ok(sides.every((value) => near(value, sides[0])), `${item.error}: ${piece}`)
                }
            }
        }
    }
})

test('sistemak batx1 z games: memory boards have one partner per card', () => {
    for (let level = 0; level < bachSystemsMemoryLevels.length; level += 1) {
        for (let seed = 1; seed <= 60; seed += 1) {
            const cards = createBachSystemsMemoryBoard(createRandom(seed * 7919 + level), level)
            assert.equal(cards.length, BACH_SYSTEMS_MEMORY_PAIRS * 2)
            const answers = new Map<number, string>()
            for (const card of cards) {
                render(card.latex)
                render(card.explain)
                // Short enough for a phone card: at most 12 symbols in a row
                for (const row of card.latex.replace(/\\begin\{array\}\{c\}|\\end\{array\}/g, '').split('\\\\')) assert.ok(row.replace(/\\[a-z]+|[{}\\ ]/g, '').length <= 12, row)
                answers.set(card.setId, card.shows)
            }
            assert.equal(new Set(answers.values()).size, BACH_SYSTEMS_MEMORY_PAIRS)
        }
    }
    // A 2 × 2 card's system really has its solution
    const cards = createBachSystemsMemoryBoard(createRandom(42), 0)
    for (const card of cards.filter((item) => item.latex.startsWith('\\begin{array}'))) {
        const [x, y] = card.shows.slice(1, -1).split(',').map(Number)
        for (const row of card.latex.replace(/\\begin\{array\}\{c\}|\\end\{array\}/g, '').split('\\\\')) assert.equal(holdsAt(row.trim(), { x, y }), true, row)
    }
})
