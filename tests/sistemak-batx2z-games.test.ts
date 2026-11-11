import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import type { Tier } from '../src/features/unit-v2/games/raceCore.ts'
import { toNumber } from '../src/features/unit-v2/math/fraction.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { createSistemakMemoryBoard, SISTEMAK_MEMORY_PAIRS, sistemakMemoryLevels } from '../src/pages/batx2-zientziak-sistemak/games/boards.ts'
import { createCramerRounds, CRAMER_ROUNDS, replaceRow, vm } from '../src/pages/batx2-zientziak-sistemak/games/cramerColumns.ts'
import { createSistemakDetectiveCases, SISTEMAK_DETECTIVE_CASES, sistemakDetectiveLevels, sistemakDetectiveNames, sistemakDetectiveTips } from '../src/pages/batx2-zientziak-sistemak/games/detective.ts'
import { sistemakGameModeForPath, sistemakGameProgressIds, sistemakGames, sistemakGameSlugs } from '../src/pages/batx2-zientziak-sistemak/games/info.ts'
import { checkSistemakPitAnswer, generateSistemakRaceQuestion, SISTEMAK_RACE_CIRCUITS, sistemakRaceErrorTips } from '../src/pages/batx2-zientziak-sistemak/games/race.ts'
import { createRoucheRounds, ROUCHE_OPTIONS, ROUCHE_ROUNDS } from '../src/pages/batx2-zientziak-sistemak/games/roucheExpress.ts'
import { augmentedRows, augmentedStarLatex, classify, cramer, detValue, rankOf, replaceColumn, satisfies } from '../src/pages/batx2-zientziak-sistemak/system.ts'
import { evaluate, near } from './latex-math.ts'
import { matrixRelations } from './matrix-latex.ts'

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
        for (const [, formula] of text.es.matchAll(/\$([^$]+)\$/g)) assert.ok(!formula.includes(':'), formula)
        assert.ok(!/\d\s*€/.test(text.en.replace(/\$[^$]+\$/g, '')), text.en)
    }
}

/** An augmented matrix A* = (A | B) written as an array, with the letters of the parameters given */
function augmentedIn(latex: string, parameters: Record<string, number> = {}): { a: number[][]; b: number[] } {
    const body = /\\begin\{array\}\{[^}]*\}([\s\S]*?)\\end\{array\}/.exec(latex)?.[1]
    assert.ok(body, latex)
    const rows = body.split('\\\\').map((row) => row.split('&').map((cell) => evaluate(cell.trim(), (name) => parameters[name])!))
    return { a: rows.map((row) => row.slice(0, -1)), b: rows.map((row) => row[row.length - 1]) }
}

/** The first \begin{cases} of a text, with numbers only, as A and B */
function systemIn(text: string, parameters: Record<string, number> = {}): { a: number[][]; b: number[] } {
    const body = /\\begin\{cases\}([\s\S]*?)\\end\{cases\}/.exec(text)?.[1]
    assert.ok(body, text)
    const rows = body.split('\\\\').map((row) => row.trim()).filter(Boolean)
    const names = ['x', 'y', 'z']
    const width = Math.max(...rows.map((row) => Math.max(...names.map((name, index) => (row.split('=')[0].includes(name) ? index + 1 : 0)))))
    const a: number[][] = []
    const b: number[] = []
    for (const row of rows) {
        const [left, right] = row.split('=')
        const coefficients = Array.from({ length: width }, () => 0)
        for (const [, sign, number, parameter, unknown] of left.matchAll(/([+-]?)(\d*)([akm]?)([xyz])/g)) {
            const size = (number ? Number(number) : 1) * (parameter ? parameters[parameter] : 1)
            coefficients[names.indexOf(unknown)] += sign === '-' ? -size : size
        }
        a.push(coefficients)
        b.push(evaluate(right, (name) => parameters[name])!)
    }
    return { a, b }
}

test('sistemak batx2 z games: the hub, its levels and progress ids', () => {
    assert.deepEqual(sistemakGames.map((game) => game.id), ['race', 'rouche-express', 'cramer-columns', 'detective', 'memory'])
    assert.equal(new Set(sistemakGameProgressIds).size, sistemakGameProgressIds.length)
    assert.ok(sistemakGameProgressIds.every((id) => id >= 118401 && id <= 118899), 'the block of ids of the unit')
    for (const game of sistemakGames) {
        checkTexts([game.title, game.tagline, game.skills, ...game.levels.flatMap((level) => [level.title, level.description])])
        assert.equal(sistemakGameModeForPath(`/matematika/batx2-zientziak/sistemas/jokuak/${sistemakGameSlugs[game.id]}`), game.id)
        for (const level of game.levels) for (const text of [level.title, level.description]) assert.ok(!text.eu.includes('$') && !/\d[a-zñ]/.test(text.eu), text.eu)
    }
    assert.equal(sistemakGameModeForPath('/matematika/batx2-zientziak/sistemas/juegos/cramer-columnas'), 'cramer-columns')
    assert.equal(sistemakGameModeForPath('/matematika/batx2-zientziak/sistemas/jokuak'), 'hub')
})

test('sistemak batx2 z games: every race answer comes from its numbers', () => {
    const kinds = new Set<string>()
    for (let circuit = 0; circuit < SISTEMAK_RACE_CIRCUITS; circuit++) {
        for (let seed = 1; seed <= 120; seed++) {
            const question = generateSistemakRaceQuestion(createRandom(seed * 7919 + circuit), circuit, (seed % 3) as Tier)
            kinds.add(`${circuit} ${question.kind}`)
            assert.equal(question.circuit, circuit)
            assert.equal(question.options.length, 4)
            assert.equal(question.options.filter((option) => option.correct).length, 1)
            assert.equal(new Set(question.options.map((option) => option.latex)).size, 4)
            for (const option of question.options) render(option.latex)
            checkTexts([question.prompt, question.solution])
            const meta = question.meta as Record<string, never>
            const answer = toNumber(question.answer)
            const m = (name: string) => meta[name] as unknown as number[][]
            const v = (name: string) => meta[name] as unknown as number[]
            const n = (name: string) => meta[name] as unknown as number
            let expected: number
            switch (question.kind) {
                case 'parameters':
                case 'homogeneous-parameters': expected = n('n') - n('r'); break
                case 'rank-star': expected = rankOf(augmentedRows([[n('p'), n('q')], [n('k') * n('p'), n('k') * n('q')]], [n('s'), n('t')])); break
                case 'concurrent': {
                    expected = n('k')
                    const point = [n('p'), n('q')]
                    assert.ok(satisfies([[1, 1], [1, -1], [n('a'), n('b')]], [point[0] + point[1], point[0] - point[1], answer], point))
                    break
                }
                case 'column': expected = detValue(replaceColumn(m('a'), v('b'), 0)); break
                case 'solve2': expected = value(cramer(m('a'), v('b'))![0]); break
                case 'solve3': expected = value(cramer(m('a'), v('b'))![n('j')]); break
                case 'homogeneous-k': expected = n('k'); assert.equal(detValue([[1, answer], [n('c'), n('d')]]), 0); break
                case 'homogeneous-square': expected = n('c'); assert.equal(detValue([[answer, n('c')], [n('c'), answer]]), 0); break
                case 'critical': expected = n('a'); assert.equal(detValue([[1, 1, 1], [1, 2, n('q')], [1, n('r'), answer]]), 0); break
                case 'dependent-b': expected = n('p') * n('s'); assert.equal(classify([[1, 1], [n('p'), n('p')]], [n('s'), answer]).kind, 'indeterminate'); break
                case 'square-critical': expected = n('root'); assert.equal(answer * answer, 4 * n('c')); break
                case 'sum-difference': expected = n('x'); break
                case 'given-solution': expected = n('m'); assert.equal(n('p') + answer * n('q'), n('s')); break
                case 'prices': expected = value(cramer([[n('a'), n('b')], [n('c'), n('d')]], [n('s1'), n('s2')])![0]); break
                default: throw new Error(question.kind)
            }
            assert.ok(near(answer, expected), `${question.kind}: ${answer} ≠ ${expected}`)
            // The system written in the statement is the one of the numbers
            if (['column', 'solve2', 'solve3'].includes(question.kind)) {
                const written = systemIn(question.prompt.es)
                assert.deepEqual(written, { a: m('a'), b: v('b') }, question.prompt.es)
            }
            if (question.kind === 'critical') assert.equal(detValue(systemIn(question.prompt.es, { a: answer }).a), 0, question.prompt.es)
            const typed = question.answer.denominator === 1 ? String(question.answer.numerator) : `${question.answer.numerator}/${question.answer.denominator}`
            assert.equal(checkSistemakPitAnswer(question, typed), 'correct')
            for (const relation of matrixRelations(question.solution.es)) assert.ok(relation.holds, `${question.kind}: ${relation.left} = ${relation.right}`)
        }
    }
    assert.equal(kinds.size, 15)
    checkTexts(Object.values(sistemakRaceErrorTips))
})

test('sistemak batx2 z games: Rouché express, the right button is the type the system has', () => {
    for (let level = 0; level < 3; level++) {
        const seen = new Set<string>()
        for (let seed = 1; seed <= 50; seed++) {
            const rounds = createRoucheRounds(createRandom(seed * 104729 + level), level)
            assert.equal(rounds.length, ROUCHE_ROUNDS)
            for (const round of rounds) {
                seen.add(round.kind)
                assert.equal(ROUCHE_OPTIONS[round.answer], round.kind)
                for (const latex of [...round.shown, round.why]) render(latex)
                if (level === 0) {
                    const [rankA, rankStar, n] = round.ranks!
                    assert.equal(round.kind, rankA !== rankStar ? 'inconsistent' : rankA === n ? 'determined' : 'indeterminate')
                    assert.ok(rankStar - rankA <= 1 && rankA <= n)
                } else {
                    assert.equal(classify(round.rows!, round.b!).kind, round.kind)
                    if (level === 1) assert.equal(round.shown[0], `A^*=${augmentedStarLatex(round.rows!, round.b!)}`)
                    else {
                        const a = Number(round.shown[1].replace('a=', ''))
                        const written = systemIn(round.shown[0], { a })
                        assert.deepEqual(written, { a: round.rows!, b: round.b! })
                    }
                }
            }
        }
        assert.equal(seen.size, 3, `level ${level}: every type appears`)
    }
})

test('sistemak batx2 z games: Cramer column by column, exactly one option is |A_j| (or its value)', () => {
    for (let level = 0; level < 3; level++) {
        for (let seed = 1; seed <= 50; seed++) {
            const rounds = createCramerRounds(createRandom(seed * 31 + level), level)
            assert.equal(rounds.length, CRAMER_ROUNDS)
            for (const round of rounds) {
                assert.equal(round.options.length, 4)
                assert.equal(new Set(round.options.map((option) => option.latex)).size, 4)
                const right = round.options[round.answer]
                assert.equal(right.kind, 'right')
                const d = detValue(round.rows)
                assert.notEqual(d, 0)
                const dj = detValue(replaceColumn(round.rows, round.b, round.unknown))
                assert.ok(near(value(round.value), dj / d))
                assert.ok(near(value(cramer(round.rows, round.b)![round.unknown]), dj / d))
                if (level < 2) {
                    assert.equal(right.latex, vm(replaceColumn(round.rows, round.b, round.unknown)))
                    const row = round.options.find((option) => option.kind === 'row')
                    if (row) assert.equal(row.latex, vm(replaceRow(round.rows, round.b, round.unknown)))
                    // Only the right option is the determinant with B in the column of the unknown
                    for (const option of round.options) if (option !== right) assert.notEqual(option.latex, right.latex)
                }
                for (const option of round.options) render(option.latex)
                assert.ok(satisfies(round.rows, round.b, cramer(round.rows, round.b)!.map(value)))
            }
        }
    }
})

test('sistemak batx2 z games: the detective, one wrong line and a fix that adds up', () => {
    checkTexts([...Object.values(sistemakDetectiveNames), ...Object.values(sistemakDetectiveTips)])
    for (let level = 0; level < sistemakDetectiveLevels.length; level++) {
        const seen = new Set<string>()
        for (let seed = 1; seed <= 40; seed++) {
            const cases = createSistemakDetectiveCases(createRandom(seed * 31 + level), level)
            assert.equal(cases.length, SISTEMAK_DETECTIVE_CASES)
            for (const item of cases) {
                seen.add(item.error)
                assert.ok(sistemakDetectiveLevels[level].includes(item.error))
                assert.ok(item.options.includes(item.error) && item.options.length === 3)
                assert.ok(item.wrong >= 0 && item.wrong < item.lines.length && item.lines.length === 3)
                assert.ok(Math.abs(item.right - item.reached) > 1e-9)
                checkTexts([item.problem, ...item.lines.map((line) => line.label)])
                for (const line of item.lines) render(line.latex)
                render(item.fix)
                for (const relation of matrixRelations(`$${item.fix}$`)) assert.ok(relation.holds, `${item.error}: fix ${relation.left} = ${relation.right}`)
                for (const line of item.lines.slice(0, item.wrong)) for (const relation of matrixRelations(`$${line.latex}$`)) assert.ok(relation.holds, `${item.error}: line ${relation.left} = ${relation.right}`)
                // The rank cases: the system of the statement has the ranks the fix gives
                if (['border-forgotten', 'det-zero-inconsistent', 'rows-counted'].includes(item.error)) {
                    const { a, b } = systemIn(item.problem.es)
                    const result = classify(a, b)
                    if (item.error === 'rows-counted') assert.equal(result.rankA, item.right)
                    else assert.equal(result.rankAugmented, item.right)
                }
            }
        }
        assert.equal(seen.size, 4, `level ${level}`)
    }
})

test('sistemak batx2 z games: memory pairs are right and every card has one partner', () => {
    for (let level = 0; level < sistemakMemoryLevels.length; level++) {
        for (let seed = 1; seed <= 40; seed++) {
            const board = createSistemakMemoryBoard(createRandom(seed * 13 + level), level)
            assert.equal(board.length, 2 * SISTEMAK_MEMORY_PAIRS)
            assert.equal(new Set(board.map((card) => card.latex)).size, board.length)
            for (let set = 0; set < SISTEMAK_MEMORY_PAIRS; set++) {
                const [question, answer] = ['q', 'a'].map((side) => board.find((card) => card.id === `${set}-${side}`)!)
                render(question.latex)
                render(answer.latex)
                if (level === 0) {
                    const { a, b } = augmentedIn(question.latex)
                    const point = answer.latex.replace(/[()]/g, '').split(',').map(Number)
                    assert.ok(satisfies(a, b, point) && detValue(a) !== 0, question.explain)
                } else if (level === 1) {
                    const { a, b } = augmentedIn(question.latex)
                    assert.equal(detValue(replaceColumn(a, b, 0)), Number(answer.latex.replace('|A_x|=', '')))
                } else {
                    const k = Number(answer.latex.replace('k=', ''))
                    const { a } = augmentedIn(question.latex, { k })
                    assert.equal(detValue(a), 0, question.explain)
                }
            }
        }
    }
})
