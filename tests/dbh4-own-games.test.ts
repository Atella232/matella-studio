import test from 'node:test'
import assert from 'node:assert/strict'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import type { WorkedCase } from '../src/features/unit-v2/games/workedDetective.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { contains } from '../src/pages/dbh4-aplikatuak-errealak/reals.ts'
import { createIntervalRounds, INTERVAL_MAX, INTERVAL_MIN, INTERVAL_ROUNDS } from '../src/pages/dbh4-games/intervals.ts'
import { createRealsDetectiveCases, realsDetectiveLevels, realsDetectiveNames, realsDetectiveTips } from '../src/pages/dbh4-games/realsDetective.ts'
import { createDivisibleRounds, createHuntRounds, createSimplifyRounds, divisorsOf, factoredLatex, fromRoots, K_MAX, K_MIN, patternLatex, polyLatex, ruffini, valueAt, withK } from '../src/pages/dbh4-games/polynomials.ts'
import { createPolyDetectiveCases, POLY_DETECTIVE_X, polyDetectiveLevels, polyDetectiveNames, polyDetectiveTips } from '../src/pages/dbh4-games/polynomialsDetective.ts'
import { buildRight, checkRight, createBuildRounds, createCheckRounds, createCrossRounds, createPaintRounds, lineAt, paintRight, pieceCount, pieceSample, pieceSolves, rootSolves, solutionLatex } from '../src/pages/dbh4-games/equations.ts'
import { createEquationsDetectiveCases, equationsDetectiveLevels, equationsDetectiveNames, equationsDetectiveTips, setCode, systemCode, type Piece } from '../src/pages/dbh4-games/equationsDetective.ts'
import { solutionsValue } from '../src/pages/dbh2-ekuazioak-v2/games/detective.ts'
import { createDomainRounds, createSlopeRounds, meanRate, rightIntervals } from '../src/pages/dbh4-games/functions.ts'
import { createFunctionsDetectiveCases, functionsDetectiveLevels, functionsDetectiveNames, functionsDetectiveTips } from '../src/pages/dbh4-games/functionsDetective.ts'
import { checkTexts, renders } from './helpers/ownGamesCheck.ts'
import { evaluate } from './helpers/realsRaceCheck.ts'

/* The own games shared by the 4. DBH applied and academic units */

/** The number at the end of a line: after the last «→», then after the last «=» or «≈»; a percentage sign and units left out */
export function endValue(latex: string): number {
    const last = latex.split('\\ \\to\\ ').pop()!.split(/=|\\approx /).pop()!
        .replace(/\\,\\%$/, '')
        .replace(/\\[ ,]\\text\{[^}]*\}(\^\{\d\})?/g, '')
        .trim()
    const value = evaluate(last.replace(/\\pi/g, `(${Math.PI})`))
    assert.ok(value !== null, `cannot read ${latex}`)
    return value!
}

/** The checks of a worked-solution detective: the level's errors, three options, the fix and the last line on their values */
export function checkDetective<Error extends string>(create: (random: ReturnType<typeof createRandom>, level: number) => WorkedCase<Error>[], levels: Error[][], names: Record<Error, LocalizedText>, tips: Record<Error, LocalizedText>, tolerance = 1e-6) {
    checkTexts([...Object.values<LocalizedText>(names), ...Object.values<LocalizedText>(tips)])
    for (let level = 0; level < levels.length; level += 1) {
        const seen = new Set<string>()
        const wrongLines = new Set<number>()
        for (let seed = 1; seed <= 100; seed += 1) {
            for (const item of create(createRandom(seed * 7919 + level), level)) {
                seen.add(item.error)
                wrongLines.add(item.wrong)
                assert.ok(levels[level].includes(item.error))
                assert.ok(item.options.includes(item.error) && new Set(item.options).size === 3)
                assert.equal(item.lines.length, 3)
                for (const line of item.lines) renders(line.latex)
                renders(item.fix)
                checkTexts([item.problem])
                assert.ok(!/\{,\}/.test(item.problem.es.replace(/\$[^$]+\$/g, '')), item.problem.es)
                assert.ok(Math.abs(endValue(item.fix) - item.right) < tolerance * Math.max(1, Math.abs(item.right)), `${item.error}: ${item.fix} ≠ ${item.right}`)
                assert.ok(Math.abs(endValue(item.lines[2].latex) - item.reached) < tolerance * Math.max(1, Math.abs(item.reached)), `${item.error}: ${item.lines[2].latex} ≠ ${item.reached}`)
            }
        }
        assert.equal(seen.size, levels[level].length, `level ${level}: ${[...seen]}`)
    }
}

test('4. DBH build the interval: sets inside the line, distinct rounds, the prompt says the same set', () => {
    for (const track of ['applied', 'academic'] as const) {
        for (let level = 0; level < 3; level += 1) {
            for (let seed = 1; seed <= 150; seed += 1) {
                const rounds = createIntervalRounds(createRandom(seed * 7919 + level), level, track)
                assert.equal(rounds.length, INTERVAL_ROUNDS)
                for (const { target, latex, words } of rounds) {
                    for (const end of [target.from, target.to]) if (end !== null) assert.ok(end >= INTERVAL_MIN && end <= INTERVAL_MAX)
                    if (target.from !== null && target.to !== null) assert.ok(target.from < target.to)
                    if (level === 0) assert.ok(target.from !== null && target.to !== null)
                    if (level === 1) assert.ok((target.from === null) !== (target.to === null))
                    if (latex) renders(latex)
                    if (words) checkTexts([words])
                    // An absolute value |x − c| ≤ r holds exactly on the interval
                    if (level === 2 && track === 'academic') {
                        const match = latex!.match(/^\|x([+-]\d+)?\|(\\le |<)(\d+)$/)!
                        const centre = match[1] ? -Number(match[1]) : 0
                        for (let x = -12; x <= 12; x += 0.5) assert.equal(contains(target, x), match[2] === '<' ? Math.abs(x - centre) < Number(match[3]) : Math.abs(x - centre) <= Number(match[3]), `${latex} at ${x}`)
                    }
                }
            }
        }
    }
})

test('4. DBH reals detective: both tracks', () => {
    for (const track of ['applied', 'academic'] as const) checkDetective(createRealsDetectiveCases(track), realsDetectiveLevels[track], realsDetectiveNames, realsDetectiveTips, 1e-3)
})

/* ---------- Polynomials ---------- */

test('4. DBH root hunt: whole roots that divide the constant term, the product gives the polynomial', () => {
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 150; seed += 1) {
            for (const round of createHuntRounds(createRandom(seed * 7919 + level), level)) {
                assert.deepEqual(fromRoots(round.leading, round.roots), round.coefficients)
                const constant = round.coefficients[round.coefficients.length - 1]
                for (const root of round.roots) {
                    assert.ok(divisorsOf(constant).includes(root), `${root} | ${constant}`)
                    assert.equal(ruffini(round.coefficients, root).remainder, 0)
                }
                assert.equal(round.roots.length, level === 2 ? 4 : 3)
                renders(polyLatex(round.coefficients))
                renders(factoredLatex(round.leading, round.roots))
            }
        }
    }
})

test('4. DBH divisible by x − a: only the right k leaves no remainder, inside the slider', () => {
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 150; seed += 1) {
            for (const round of createDivisibleRounds(createRandom(seed * 7919 + level), level)) {
                assert.ok(round.k >= K_MIN && round.k <= K_MAX && round.k !== 0)
                for (let k = K_MIN; k <= K_MAX; k += 1) assert.equal(ruffini(withK(round, k), round.root).remainder === 0, k === round.k, `${patternLatex(round.pattern)} k=${k}`)
                renders(patternLatex(round.pattern))
            }
        }
    }
})

test('4. DBH simplify the fraction: the right option equals the fraction, the others do not', () => {
    const value = (latex: string, x: number) => evaluate(latex.replace(/x/g, `(${x})`))!
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 150; seed += 1) {
            for (const round of createSimplifyRounds(createRandom(seed * 7919 + level), level)) {
                assert.equal(round.options.length, 4)
                for (const x of [7.5, 13, -11.5]) {
                    const exact = valueAt(round.numerator, x) / valueAt(round.denominator, x)
                    round.options.forEach((option, index) => {
                        renders(option)
                        if (index === round.right) assert.ok(Math.abs(value(option, x) - exact) < 1e-9, option)
                    })
                }
                round.options.forEach((option, index) => { if (index !== round.right) assert.ok([7.5, 13, -11.5].some((x) => Math.abs(value(option, x) - valueAt(round.numerator, x) / valueAt(round.denominator, x)) > 1e-6), option) })
            }
        }
    }
})

test('4. DBH polynomials detective: both tracks', () => {
    for (const track of ['applied', 'academic'] as const) {
        checkDetective((random, level) => createPolyDetectiveCases(track)(random, level).map((item) => ({ ...item, fix: item.fix.replace(/x/g, `(${POLY_DETECTIVE_X})`), lines: item.lines.map((line, index) => (index === 2 ? { ...line, latex: line.latex.replace(/x/g, `(${POLY_DETECTIVE_X})`) } : line)) })), polyDetectiveLevels[track], polyDetectiveNames, polyDetectiveTips)
    }
})

/* ---------- Equations ---------- */

test('4. DBH is it a solution?: the solutions satisfy the equation, the other candidates do not', () => {
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 200; seed += 1) {
            for (const round of createCheckRounds(createRandom(seed * 7919 + level), level)) {
                renders(round.latex)
                const [left, right] = round.latex.split('=')
                for (const candidate of round.candidates) {
                    const at = (side: string) => evaluate(side.replace(/x/g, `(${candidate})`))
                    const l = at(left)
                    const r = at(right)
                    const solves = l !== null && r !== null && Number.isFinite(l) && Math.abs(l - r) < 1e-9
                    assert.equal(round.solutions.includes(candidate), solves, `${round.latex} at ${candidate}`)
                }
                assert.ok(checkRight(round, round.solutions))
                if (round.solutions.length < round.candidates.length) assert.ok(!checkRight(round, round.candidates))
            }
        }
    }
})

test('4. DBH paint the solution: pieces and ends agree with the polynomial', () => {
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 200; seed += 1) {
            for (const round of createPaintRounds(createRandom(seed * 7919 + level), level)) {
                for (const root of round.roots) assert.ok(Math.abs(round.coefficients.reduce((total, c) => total * root + c, 0)) < 1e-9)
                const pieces = Array.from({ length: pieceCount(round) }, (_, piece) => pieceSolves(round, piece))
                const ends = round.roots.map(() => rootSolves(round))
                assert.ok(paintRight(round, pieces, ends))
                assert.ok(!paintRight(round, pieces.map((on) => !on), ends))
                for (let piece = 0; piece < pieceCount(round); piece += 1) assert.ok(Math.abs(pieceSample(round, piece)) < 20)
                renders(solutionLatex(round))
            }
        }
    }
})

test('4. DBH build the equation and the crossing point', () => {
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 200; seed += 1) {
            for (const round of createBuildRounds(createRandom(seed * 7919 + level), level)) {
                const [r1, r2] = round.roots
                assert.ok(buildRight(round, -(r1 + r2), r1 * r2))
                assert.ok(!buildRight(round, r1 + r2, r1 * r2) || r1 + r2 === 0)
            }
            for (const round of createCrossRounds(createRandom(seed * 7919 + level), level)) {
                for (const line of round.lines) assert.ok(Math.abs(lineAt(line, round.point[0]) - round.point[1]) < 1e-9)
                assert.notEqual(round.lines[0].a * round.lines[1].b, round.lines[1].a * round.lines[0].b)
                assert.ok(Math.abs(round.point[0]) <= 6 && Math.abs(round.point[1]) <= 6)
            }
        }
    }
})

/** The value of the end of an equations line: a system, a set of reals or a list of solutions */
function equationCode(latex: string): number {
    const last = latex.split('\\ \\to\\ ').pop()!
    if (/y=/.test(last)) {
        const [x, y] = [...last.matchAll(/[xy]=(-?\d+)/g)].map((match) => Number(match[1]))
        return systemCode(x, y)
    }
    if (/infty|^[[(]/.test(last)) {
        const pieces: Piece[] = last.split('\\cup ').map((part) => {
            const match = part.match(/^([[(])(-\\infty|-?\d+),\\,(\+\\infty|-?\d+)([\])])$/)!
            assert.ok(match, part)
            return [match[2].includes('infty') ? null : Number(match[2]), match[3].includes('infty') ? null : Number(match[3]), match[1] === '[', match[4] === ']']
        })
        return setCode(pieces)
    }
    const values = last.split(',\\ ').flatMap((part) => {
        const value = part.split('=').pop()!
        if (value.startsWith('\\pm ')) {
            const size = evaluate(value.slice(4))!
            return [-size, size]
        }
        return [evaluate(value)!]
    })
    return solutionsValue(values.sort((a, b) => a - b))
}

test('4. DBH equations detective: both tracks', () => {
    for (const track of ['applied', 'academic'] as const) {
        checkTexts([...Object.values(equationsDetectiveNames), ...Object.values(equationsDetectiveTips)])
        for (let level = 0; level < 3; level += 1) {
            const seen = new Set<string>()
            for (let seed = 1; seed <= 100; seed += 1) {
                for (const item of createEquationsDetectiveCases(track)(createRandom(seed * 7919 + level), level)) {
                    seen.add(item.error)
                    assert.ok(equationsDetectiveLevels[track][level].includes(item.error))
                    assert.ok(item.options.includes(item.error) && new Set(item.options).size === 3)
                    for (const line of item.lines) renders(line.latex)
                    renders(item.fix)
                    checkTexts([item.problem])
                    assert.ok(Math.abs(equationCode(item.fix) - item.right) < 1e-6, `${item.error}: ${item.fix} ≠ ${item.right}`)
                    assert.ok(Math.abs(equationCode(item.lines[2].latex) - item.reached) < 1e-6, `${item.error}: ${item.lines[2].latex} ≠ ${item.reached}`)
                }
            }
            assert.equal(seen.size, 4, `${track} ${level}`)
        }
    }
})

/* ---------- Functions ---------- */

test('4. DBH paint the domain: f is defined exactly on the painted pieces and ends', () => {
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 200; seed += 1) {
            for (const round of createDomainRounds(createRandom(seed * 7919 + level), level)) {
                renders(`f(x)=${round.display}`)
                const defined = (x: number) => {
                    const value = evaluate(round.display.replace(/x/g, `(${x})`))
                    return value !== null && Number.isFinite(value) && !Number.isNaN(value)
                }
                for (let piece = 0; piece < pieceCount(round); piece += 1) assert.equal(defined(pieceSample(round, piece)), pieceSolves(round, piece), `${round.display} piece ${piece}`)
                for (const root of round.roots) assert.equal(defined(root), rootSolves(round), `${round.display} at ${root}`)
            }
        }
    }
})

test('4. DBH the mean slope: some interval reaches the target, [0, 1] does not', () => {
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 200; seed += 1) {
            for (const round of createSlopeRounds(createRandom(seed * 7919 + level), level)) {
                const right = rightIntervals(round)
                assert.ok(right.length > 0)
                for (const [a, b] of right) assert.ok(Math.abs(meanRate(round.coefficients, a, b) - round.target) < 1e-9)
                assert.ok(!right.some(([a, b]) => a === 0 && b === 1))
            }
        }
    }
})

test('4. DBH functions detective', () => {
    checkTexts([...Object.values(functionsDetectiveNames), ...Object.values(functionsDetectiveTips)])
    for (let level = 0; level < 3; level += 1) {
        const seen = new Set<string>()
        for (let seed = 1; seed <= 100; seed += 1) {
            for (const item of createFunctionsDetectiveCases(createRandom(seed * 7919 + level), level)) {
                seen.add(item.error)
                assert.ok(functionsDetectiveLevels[level].includes(item.error))
                for (const line of item.lines) renders(line.latex)
                renders(item.fix)
                checkTexts([item.problem])
                const code = (latex: string) => (level === 1 ? equationCode(latex) : endValue(latex))
                assert.ok(Math.abs(code(item.fix) - item.right) < 1e-6, `${item.error}: ${item.fix} ≠ ${item.right}`)
                assert.ok(Math.abs(code(item.lines[2].latex) - item.reached) < 1e-6, `${item.error}: ${item.lines[2].latex} ≠ ${item.reached}`)
            }
        }
        assert.equal(seen.size, 4)
    }
})
