import test from 'node:test'
import assert from 'node:assert/strict'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
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
import { createCurveRounds, createGrowthRounds, createMatchRounds, curveAt, curveLatex, growthAt, hitsAll, START, uniqueFit, type Family } from '../src/pages/dbh4-games/curves.ts'
import { createGraphsDetectiveCases, graphsDetectiveLevels, graphsDetectiveNames, graphsDetectiveTips } from '../src/pages/dbh4-games/graphsDetective.ts'
import { createHalfRounds, inRegion, regionPoints } from '../src/pages/dbh4-games/halfPlanes.ts'
import { createPourRounds, isRound, POUR_ROUNDS, tripleVolume, volumeLatex, volumeOf, type Vessel } from '../src/pages/dbh4-games/pour.ts'
import { createTilesRounds, floorArea, floorCells, outlineArea, sideLengths, tileArea, TILES_ROUNDS } from '../src/pages/dbh4-games/tiles.ts'
import { CONTEXT_GROWTH, createMapRounds, createScaleRounds, createTowerRounds, MAP_ROUNDS, mapPrompt, RULER_CM, SCALE_ROUNDS, scaleFactor, scalePrompt, TOWER_MAX, TOWER_ROUNDS, towerLayout } from '../src/pages/dbh4-games/similarity.ts'
import { createGeometryDetectiveCases, geometryDetectiveLevels, geometryDetectiveNames, geometryDetectiveTips } from '../src/pages/dbh4-games/geometryDetective.ts'
import { BOX_MAX, BOX_MIN, BOX_ROUNDS, CLOUD_ROUNDS, createBoxRounds, createCloudRounds, estimateRight, kindOf, percentilePlaces } from '../src/pages/dbh4-games/statistics.ts'
import { createStatsDetectiveCases, statsDetectiveLevels, statsDetectiveNames, statsDetectiveTips } from '../src/pages/dbh4-games/statsDetective.ts'
import { argumentLatex, createLogRounds, createRadicalRounds, EXPONENT_STEPS, exponentValue, expressionLatex, LOG_ROUNDS, logQuestionLatex, powerValue, primeFactors, RADICAL_ROUNDS, radicalLatex, simplify } from '../src/pages/dbh4-games/radicals.ts'
import { createPowersDetectiveCases, powersDetectiveLevels, powersDetectiveNames, powersDetectiveTips } from '../src/pages/dbh4-games/powersDetective.ts'
import { CIRCLE_ROUNDS, CIRCLE_STEP, circleQuestionLatex, createCircleRounds, createRatiosRounds, fittingAngles, fractionLatex, QUADRANT_SIGNS, RATIOS_ROUNDS, ratioFraction, ratioValue, valueLatex } from '../src/pages/dbh4-games/trigonometry.ts'
import { createTrigDetectiveCases, trigDetectiveLevels, trigDetectiveNames, trigDetectiveTips } from '../src/pages/dbh4-games/trigDetective.ts'
import { localize } from '../src/pages/dbh4-akademikoak-trigonometria/text.ts'
import { createJumpRounds, createLinesRounds, JUMP_ROUNDS, jumpLanding, K_RANGE, lineLatex, LINES_ROUNDS, slopeOf, withK as lineWithK } from '../src/pages/dbh4-games/vectors.ts'
import { createVectorsDetectiveCases, vectorsDetectiveLevels, vectorsDetectiveNames, vectorsDetectiveTips } from '../src/pages/dbh4-games/vectorsDetective.ts'
import { binomial, BOXES_ROUNDS, createBoxesRounds, createModelRounds, factorial, MODEL_ANSWERS, MODEL_ROUNDS, modelCount, modelLatex, variations } from '../src/pages/dbh4-games/combinatorics.ts'
import { combinatoricsDetectiveLevels, combinatoricsDetectiveNames, combinatoricsDetectiveTips, createCombinatoricsDetectiveCases } from '../src/pages/dbh4-games/combinatoricsDetective.ts'
import { cellValue, createTableRounds, createTreeRounds, eventLeaves, eventProbability, eventText, leafProbability, TABLE_ROUNDS, tableAnswer, tableQuestionLatex, totalValue, TREE_ROUNDS } from '../src/pages/dbh4-games/probability.ts'
import { createProbabilityDetectiveCases, probabilityDetectiveLevels, probabilityDetectiveNames, probabilityDetectiveTips } from '../src/pages/dbh4-games/probabilityDetective.ts'
import { toNumber } from '../src/features/unit-v2/math/fraction.ts'
import { CHAIN_ROUNDS, createChainRounds, finalPrice, multiplier, totalChange } from '../src/pages/dbh4-games/percentChain.ts'
import { checkDetective, checkLanguages, checkTexts, endValue, renders } from './helpers/ownGamesCheck.ts'
import { evaluate } from './helpers/realsRaceCheck.ts'

/* The own games shared by the 4. DBH applied and academic units */

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
        // One or more points x = a, y = b; several are added up
        const values = [...last.matchAll(/[xy]=(-?\d+)/g)].map((match) => Number(match[1]))
        let code = 0
        for (let index = 0; index < values.length; index += 2) code += systemCode(values[index], values[index + 1])
        return code
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
    for (const track of ['applied', 'academic', 'systems'] as const) {
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

/* ---------- Graphs ---------- */

const FAMILY_LEVELS: Family[][][] = [[['line'], ['parabola'], ['inverse', 'exp']], [['parabola'], ['abs'], ['inverse']], [['exp'], ['log'], ['exp', 'log']], [['line', 'parabola'], ['abs', 'parabola'], ['inverse']]]

test('4. DBH curve laser: only the round curve hits every target, the start never does', () => {
    for (const families of FAMILY_LEVELS) {
        for (let level = 0; level < 3; level += 1) {
            for (let seed = 1; seed <= 40; seed += 1) {
                for (const round of createCurveRounds(families)(createRandom(seed * 7919 + level), level)) {
                    assert.ok(families[level].includes(round.curve.family))
                    assert.ok(hitsAll(round.curve, round.targets))
                    assert.ok(uniqueFit(round))
                    assert.ok(!hitsAll({ ...START[round.curve.family], base: round.curve.base }, round.targets))
                    renders(curveLatex(round.curve))
                }
            }
        }
    }
})

test('4. DBH which formula?: the options are different curves', () => {
    for (const families of FAMILY_LEVELS) {
        for (let level = 0; level < 3; level += 1) {
            for (let seed = 1; seed <= 60; seed += 1) {
                for (const round of createMatchRounds(families)(createRandom(seed * 7919 + level), level)) {
                    assert.equal(round.options[round.right], curveLatex(round.curve))
                    for (const option of round.options) renders(option)
                    assert.equal(new Set(round.options).size, 4)
                    // Each wrong option differs from the curve at some whole x
                    round.options.forEach((option, index) => {
                        if (index === round.right) return
                        const differs = [-5, -3, -1, 0.5, 2, 4, 5.5].some((x) => {
                            const value = evaluate(option.replace(/^y=/, '').replace(/\\log_\{(\d)\}\(([^)]*)\)/g, (_, b, inside) => `(${Math.log(Number(evaluate(inside.replace(/x/g, `(${x})`)))) / Math.log(Number(b))})`).replace(/x/g, `(${x})`))
                            const exact = curveAt(round.curve, x)
                            return value === null || exact === null || !Number.isFinite(value) || Math.abs(value - exact) > 1e-6
                        })
                        assert.ok(differs, `${option} vs ${curveLatex(round.curve)}`)
                    })
                }
            }
        }
    }
})

test('4. DBH when does it double?: the time reaches the target exactly', () => {
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 200; seed += 1) {
            for (const round of createGrowthRounds(createRandom(seed * 7919 + level), level)) {
                assert.ok(Math.abs(growthAt(round, round.time) - round.target) < 1e-9)
                assert.ok(Number.isInteger(round.target) && round.time % round.period === 0 && round.time > round.period)
                assert.ok(round.time <= round.period * 8)
            }
        }
    }
})

test('4. DBH graphs detective: the three units', () => {
    checkTexts([...Object.values(graphsDetectiveNames), ...Object.values(graphsDetectiveTips)])
    for (const track of ['graphs', 'polynomial', 'exponential'] as const) checkDetective(createGraphsDetectiveCases(track), graphsDetectiveLevels[track], graphsDetectiveNames, graphsDetectiveTips)
})

test('4. DBH touch the solution: a region with whole points, every region point solves every inequality', () => {
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 150; seed += 1) {
            for (const round of createHalfRounds(createRandom(seed * 7919 + level), level)) {
                assert.equal(round.inequalities.length, level + 1)
                const points = regionPoints(round)
                assert.ok(points.length >= 3)
                for (const [x, y] of points) assert.ok(inRegion(round, x, y))
            }
        }
    }
})

/** The volume of a vessel worked out again, with π */
function realVolume({ shape, size: r, height: h }: Vessel): number {
    switch (shape) {
        case 'cylinder': return Math.PI * r * r * h
        case 'cone': return (Math.PI * r * r * h) / 3
        case 'sphere': return (4 / 3) * Math.PI * r ** 3
        case 'hemisphere': return (2 / 3) * Math.PI * r ** 3
        case 'prism': return r * r * h
        case 'pyramid': return (r * r * h) / 3
        case 'cube': return r ** 3
    }
}

test('4. DBH how many glasses?: whole fills worked out from the volumes, the same kind of vessel, the small one smaller', () => {
    const sources = [new Set<string>(), new Set<string>(), new Set<string>()]
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 150; seed += 1) {
            const rounds = createPourRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, POUR_ROUNDS)
            assert.equal(new Set(rounds.map((round) => JSON.stringify(round))).size, POUR_ROUNDS)
            for (const { source, target, fills } of rounds) {
                sources[level].add(source.shape)
                assert.ok(Number.isInteger(fills) && fills >= 2 && fills <= 12)
                assert.ok(Math.abs(realVolume(target) / realVolume(source) - fills) < 1e-9, `${JSON.stringify(source)} ${JSON.stringify(target)}`)
                assert.equal(isRound(source.shape), isRound(target.shape))
                assert.ok(['cylinder', 'prism'].includes(target.shape))
                assert.ok(source.height <= target.height && source.size <= target.size)
                if (level === 0) assert.equal(source.size, target.size)
                if (level === 1) assert.ok(source.size < target.size)
                for (const v of [source, target]) {
                    assert.ok(tripleVolume(v) % 3 === 0)
                    renders(volumeLatex(v))
                    assert.ok(Math.abs(endValue(volumeLatex(v)) - volumeOf(v) * (isRound(v.shape) ? Math.PI : 1)) < 1e-6)
                }
            }
        }
    }
    assert.deepEqual([...sources[0]].sort(), ['cone', 'cylinder', 'prism', 'pyramid'])
    assert.deepEqual([...sources[1]].sort(), ['cube', 'cylinder', 'prism', 'pyramid'])
    assert.deepEqual([...sources[2]].sort(), ['cone', 'hemisphere', 'sphere'])
})

test('4. DBH tile the floor: the tiles counted three ways, sides in whole decimetres, the floor shapes of each level', () => {
    for (let level = 0; level < 3; level += 1) {
        const kinds = new Set<string>()
        for (let seed = 1; seed <= 150; seed += 1) {
            const rounds = createTilesRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, TILES_ROUNDS)
            for (const round of rounds) {
                kinds.add(round.kind)
                assert.equal(floorCells(round).length, round.count)
                assert.equal(outlineArea(round.outline), round.count)
                assert.ok(Math.abs(floorArea(round) / tileArea(round) - round.count) < 1e-9)
                assert.ok(round.max > round.count && round.count >= 8)
                for (const side of sideLengths(round)) assert.ok(side > 0 && Math.abs(side * 10 - Math.round(side * 10)) < 1e-9, `${side}`)
                if (level < 2) assert.equal(round.tile[0], round.tile[1])
                else assert.notEqual(round.tile[0], round.tile[1])
            }
        }
        assert.deepEqual([...kinds].sort(), [['rectangle'], ['l'], ['l', 't', 'u']][level])
    }
})

test('4. DBH grow it k times: the right option is the measure times k, k² or k³, four different options, prompts in four languages', () => {
    for (let level = 0; level < 3; level += 1) {
        const growths = new Set<string>()
        let inverse = 0
        for (let seed = 1; seed <= 150; seed += 1) {
            const rounds = createScaleRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, SCALE_ROUNDS)
            for (const round of rounds) {
                growths.add(round.growth)
                assert.equal(new Set(round.options).size, 4)
                for (const option of round.options) assert.ok(option > 0 && Math.abs(option * 100 - Math.round(option * 100)) < 1e-9)
                const right = round.options[round.right]
                if (round.inverse) {
                    inverse += 1
                    assert.equal(level, 2)
                    assert.equal(right ** (round.growth === 'area' ? 2 : 3), round.value)
                } else {
                    assert.equal(CONTEXT_GROWTH[round.context], round.growth)
                    assert.ok(Math.abs(right - round.value * scaleFactor(round.k, round.growth)) < 1e-9)
                    if (level < 2) assert.ok(round.k[1] === 1 && round.k[0] >= 2)
                    else assert.ok(round.k[0] === 1 && round.k[1] >= 2)
                }
                checkTexts([scalePrompt(round)])
                checkLanguages([scalePrompt(round)])
            }
        }
        assert.deepEqual([...growths].sort(), [['area', 'length'], ['area', 'volume'], ['area', 'length', 'volume']][level])
        if (level === 2) assert.ok(inverse > 50)
    }
})

test('4. DBH measure the tower: similar triangles give the height, the stepper reaches it, the methods of each level', () => {
    for (let level = 0; level < 3; level += 1) {
        const methods = new Set<string>()
        for (let seed = 1; seed <= 150; seed += 1) {
            const rounds = createTowerRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, TOWER_ROUNDS)
            for (const round of rounds) {
                methods.add(round.method)
                assert.ok(Math.abs(round.height - (round.known * round.far) / round.near) < 1e-9)
                assert.ok(round.height >= 4 && round.height <= TOWER_MAX)
                assert.ok(Math.abs(round.height / round.step - Math.round(round.height / round.step)) < 1e-9)
                assert.ok(towerLayout(round).extent <= 36)
                if (level === 0) assert.ok(Number.isInteger(round.height) && Number.isInteger(round.far))
            }
        }
        assert.deepEqual([...methods].sort(), [['shadow'], ['mirror', 'shadow'], ['mirror', 'shadow', 'sight']][level])
    }
})

test('4. DBH the map scale: the real distance from the scale, B on the ruler, half the rounds of each kind, prompts in four languages', () => {
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 150; seed += 1) {
            const rounds = createMapRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, MAP_ROUNDS)
            assert.equal(rounds.filter((round) => round.mode === 'place').length, 3)
            assert.equal(new Set(rounds.map((round) => round.cm)).size, MAP_ROUNDS)
            for (const round of rounds) {
                assert.ok(round.cm >= 2 && round.cm <= RULER_CM && Math.abs(round.cm / round.snap - Math.round(round.cm / round.snap)) < 1e-9)
                assert.ok(Math.abs(round.real - (round.cm * round.scale) / (round.unit === 'km' ? 100000 : 100)) < 1e-9)
                // The stepper of a read round lands on the answer
                const steps = round.real / (round.snap * round.perCm)
                assert.ok(Math.abs(steps - Math.round(steps)) < 1e-9)
                assert.ok(Math.abs(round.real * 100 - Math.round(round.real * 100)) < 1e-9)
                assert.equal(round.unit, level === 2 ? 'm' : 'km')
                checkTexts([mapPrompt(round)])
                checkLanguages([mapPrompt(round)])
            }
        }
    }
})

test('4. DBH geometry detective: areas, volumes and similarity, each level with its own errors', () => {
    for (const track of ['areas', 'academic', 'similarity'] as const) checkDetective(createGeometryDetectiveCases(track), geometryDetectiveLevels[track], geometryDetectiveNames, geometryDetectiveTips)
})

/** The textbook quartile, worked out again: place N·p/100; not whole → the next datum; whole → the mean with the next */
function bookQuartile(sorted: number[], p: number): number {
    const place = (sorted.length * p) / 100
    if (Number.isInteger(place)) return place >= sorted.length ? sorted[sorted.length - 1] : (sorted[place - 1] + sorted[place]) / 2
    return sorted[Math.ceil(place) - 1]
}

test('4. DBH build the box plot: the textbook quartiles, the places behind them, five different marks, the data of each level', () => {
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 150; seed += 1) {
            const rounds = createBoxRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, BOX_ROUNDS)
            for (const { data, q1, median, q3 } of rounds) {
                const n = data.length
                assert.deepEqual(data, [...data].sort((a, b) => a - b))
                assert.ok(data[0] >= BOX_MIN && data[n - 1] <= BOX_MAX)
                assert.deepEqual([q1, median, q3], [25, 50, 75].map((p) => bookQuartile(data, p)))
                for (const [p, value] of [[25, q1], [50, median], [75, q3]]) {
                    const places = percentilePlaces(n, p)
                    assert.equal(places.reduce((sum, place) => sum + data[place - 1], 0) / places.length, value)
                }
                // The steppers start on the smallest datum, which is none of the marks
                assert.ok(data[0] < q1 && q1 < median && median < q3 && q3 < data[n - 1])
                for (const value of [q1, median, q3]) assert.ok(Number.isInteger(value * 2))
                if (level === 0) assert.ok(n % 2 === 1 && [q1, median, q3].every(Number.isInteger))
                if (level === 1) assert.ok(n % 2 === 0 && n <= 16)
                if (level === 2) assert.ok(n >= 17)
            }
        }
    }
})

test('4. DBH guess the correlation: r recomputed, its band, the kinds of each level, the estimate inside the plane', () => {
    for (let level = 0; level < 3; level += 1) {
        const kinds = new Set<string>()
        for (let seed = 1; seed <= 100; seed += 1) {
            const rounds = createCloudRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, CLOUD_ROUNDS)
            for (const round of rounds) {
                kinds.add(round.kind)
                const n = round.points.length
                const [mx, my] = [0, 1].map((index) => round.points.reduce((sum, point) => sum + point[index], 0) / n)
                const sxy = round.points.reduce((sum, [x, y]) => sum + (x - mx) * (y - my), 0)
                const sxx = round.points.reduce((sum, [x]) => sum + (x - mx) ** 2, 0)
                const syy = round.points.reduce((sum, [, y]) => sum + (y - my) ** 2, 0)
                assert.ok(Math.abs(sxy / Math.sqrt(sxx * syy) - round.r) < 1e-9)
                assert.equal(kindOf(round.r), round.kind)
                assert.ok(Math.abs(round.slope - sxy / sxx) < 1e-9 && Math.abs(round.intercept - (my - round.slope * mx)) < 1e-9)
                for (const [x, y] of round.points) assert.ok(x >= 0 && x <= 10 && y >= 0 && y <= 10)
                if (level < 2) assert.equal(round.ask, null)
                else {
                    assert.ok(round.ask !== null && round.ask >= 2 && round.ask <= 8 && round.kind.startsWith('strong'))
                    const predicted = round.slope * round.ask + round.intercept
                    assert.ok(predicted >= 1 && predicted <= 9)
                    assert.ok(estimateRight(round, Math.round(predicted)) && !estimateRight(round, Math.round(predicted) + 3))
                }
            }
        }
        assert.deepEqual([...kinds].sort(), [['none', 'strong-negative', 'strong-positive'], ['none', 'strong-negative', 'strong-positive', 'weak-negative', 'weak-positive'], ['strong-negative', 'strong-positive']][level])
    }
})

test('4. DBH statistics detective: grouped data, quartiles, spread, samples and regression', () => {
    for (const track of ['applied', 'academic'] as const) checkDetective(createStatsDetectiveCases(track), statsDetectiveLevels[track], statsDetectiveNames, statsDetectiveTips)
})

test('4. DBH simplify the radical: the value is kept, nothing is left to take out, the steppers start off the answer', () => {
    for (let level = 0; level < 3; level += 1) {
        const indices = new Set<number>()
        for (let seed = 1; seed <= 150; seed += 1) {
            const rounds = createRadicalRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, RADICAL_ROUNDS)
            for (const round of rounds) {
                indices.add(round.index)
                const value = round.terms.reduce((sum, term) => sum + term.sign * term.coefficient * term.radicand ** (1 / round.index), 0)
                assert.ok(Math.abs(value - round.outside * round.inside ** (1 / round.index)) < 1e-9, expressionLatex(round))
                // b has no n-th power left inside, and a > 1 or the sum really simplifies
                for (const prime of new Set(primeFactors(round.inside))) assert.ok(primeFactors(round.inside).filter((factor) => factor === prime).length < round.index)
                assert.ok(round.outside >= 1 && round.inside > 1)
                assert.ok(!(round.outside === 1 && round.inside === round.terms[0].radicand))
                for (const term of round.terms) assert.ok(primeFactors(term.radicand).every((prime) => prime <= 11))
                if (level < 2) assert.deepEqual(simplify(round.terms[0].radicand, round.index), { outside: round.outside, inside: round.inside })
                else assert.equal(round.terms.length, 2)
                renders(expressionLatex(round))
                renders(radicalLatex(round.index, round.outside, round.inside))
                assert.ok(Math.abs(evaluate(radicalLatex(round.index, round.outside, round.inside))! - value) < 1e-9)
            }
        }
        assert.deepEqual([...indices].sort(), [[2], [3, 4], [2]][level])
    }
})

test('4. DBH find the exponent: b to the exponent gives the number, the stepper reaches every answer, the questions render', () => {
    for (let level = 0; level < 3; level += 1) {
        const unknowns = new Set<string>()
        for (let seed = 1; seed <= 150; seed += 1) {
            const rounds = createLogRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, LOG_ROUNDS)
            for (const round of rounds) {
                unknowns.add(round.unknown)
                renders(logQuestionLatex(round))
                const argument = evaluate(argumentLatex(round.base, round.exponent).replace(/\{,\}/g, '.'))!
                assert.ok(Math.abs(argument - powerValue(round.base, round.exponent)) < 1e-9 * Math.max(1, argument), argumentLatex(round.base, round.exponent))
                if (round.unknown === 'exponent') {
                    assert.ok(EXPONENT_STEPS.some((step) => exponentValue(step) === exponentValue(round.exponent)))
                    assert.notEqual(exponentValue(round.exponent), 0)
                } else assert.ok(Number.isInteger(exponentValue(round.exponent)) && round.exponent[0] >= 2 && round.exponent[0] <= 8 && round.base <= 10)
                if (level === 1) assert.ok(round.exponent[0] < 0 || round.exponent[1] > 1)
            }
        }
        assert.deepEqual([...unknowns].sort(), [['exponent'], ['exponent'], ['argument', 'base']][level])
    }
})

test('4. DBH powers detective: powers, roots and logarithms', () => {
    checkDetective(createPowersDetectiveCases, powersDetectiveLevels, powersDetectiveNames, powersDetectiveTips)
})

test('4. DBH the unit circle: one angle of the stepper fits, exact values, the quadrants of each level', () => {
    for (let level = 0; level < 3; level += 1) {
        const quadrants = new Set<number>()
        for (let seed = 1; seed <= 150; seed += 1) {
            const rounds = createCircleRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, CIRCLE_ROUNDS)
            for (const round of rounds) {
                quadrants.add(Math.ceil(round.angle / 90))
                assert.ok(round.angle > 0 && round.angle < 360 && round.angle % CIRCLE_STEP === 0)
                assert.deepEqual(fittingAngles(round, ratioValue(round.given, round.angle)!), [round.angle])
                for (const language of ['eu', 'es', 'en', 'ar'] as const) renders(localize(language, circleQuestionLatex(round)))
                const value = evaluate(valueLatex(ratioValue(round.given, round.angle)!))!
                assert.ok(Math.abs(value - ratioValue(round.given, round.angle)!) < 1e-9)
                if (level === 0) assert.ok(round.firstQuadrant && round.angle <= 90 && round.condition === null)
                assert.equal(round.radians, level === 2)
            }
        }
        if (level > 0) assert.deepEqual([...quadrants].sort(), [1, 2, 3, 4])
    }
})

test('4. DBH the other ratios: the right options follow the identity and the signs of the quadrant', () => {
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 150; seed += 1) {
            const rounds = createRatiosRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, RATIOS_ROUNDS)
            for (const round of rounds) {
                const [p, q, r] = round.triple
                assert.equal(p * p + q * q, r * r)
                const sen = ratioFraction('sen', round.triple, round.quadrant)
                const cos = ratioFraction('cos', round.triple, round.quadrant)
                assert.ok(Math.abs((sen[0] / sen[1]) ** 2 + (cos[0] / cos[1]) ** 2 - 1) < 1e-12)
                assert.equal(round.asked.length, 2)
                for (const asked of round.asked) {
                    assert.equal(new Set(asked.options.map((option) => option.join('/'))).size, 4)
                    const [a, b] = asked.options[asked.right]
                    assert.deepEqual([a, b], ratioFraction(asked.ratio, round.triple, round.quadrant))
                    assert.equal(Math.sign(a), QUADRANT_SIGNS[round.quadrant][asked.ratio])
                    renders(fractionLatex([a, b]))
                }
                if (level === 0) assert.equal(round.quadrant, 1)
                if (level === 1) assert.ok(round.quadrant > 1 && round.signs === null)
                if (level === 2) {
                    // The sign of the given ratio and the sign shown leave one quadrant
                    const fits = ([1, 2, 3, 4] as const).filter((quadrant) => QUADRANT_SIGNS[quadrant][round.given] === QUADRANT_SIGNS[round.quadrant][round.given] && round.signs!.every(({ ratio, sign }) => QUADRANT_SIGNS[quadrant][ratio] === sign))
                    assert.deepEqual(fits, [round.quadrant])
                }
            }
        }
    }
})

test('4. DBH trigonometry detective: right triangles, identities and problems, with sen and tg in every language', () => {
    for (const language of ['eu', 'es', 'en', 'ar'] as const) checkDetective(createTrigDetectiveCases, trigDetectiveLevels, trigDetectiveNames, trigDetectiveTips, 1e-6, (latex) => localize(language, latex))
})

test('4. DBH the vector jump: the answer lands on the target, inside the plane, never at the start of the steppers', () => {
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 150; seed += 1) {
            const rounds = createJumpRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, JUMP_ROUNDS)
            for (const round of rounds) {
                assert.equal(round.kind, ['vector', 'mirror', 'combination'][level])
                const landing = jumpLanding(round, round.answer)
                if (round.kind === 'vector') assert.deepEqual(landing, round.b)
                if (round.kind === 'mirror') assert.deepEqual([(round.a[0] + landing[0]) / 2, (round.a[1] + landing[1]) / 2], round.m)
                if (round.kind === 'combination') {
                    assert.deepEqual(landing, round.w)
                    assert.notEqual(round.u[0] * round.v[1] - round.u[1] * round.v[0], 0)
                    assert.ok(round.answer.every((value) => value !== 0 && Math.abs(value) <= 4))
                }
                for (const value of [...landing, ...round.answer]) assert.ok(Math.abs(value) <= 12)
                assert.ok(!(round.answer[0] === 0 && round.answer[1] === 0))
            }
        }
    }
})

test('4. DBH find k: parallel, perpendicular or through the point with the k found, and only that k', () => {
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 150; seed += 1) {
            const rounds = createLinesRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, LINES_ROUNDS)
            for (const round of rounds) {
                assert.ok(round.k !== 0 && Math.abs(round.k) <= K_RANGE)
                const holds = (k: number) => {
                    const line = lineWithK(round, k)
                    if (round.kind === 'parallel') return line.a * round.fixed.b - line.b * round.fixed.a === 0
                    if (round.kind === 'perpendicular') return line.a * round.fixed.a + line.b * round.fixed.b === 0
                    return line.a * round.point![0] + line.b * round.point![1] + line.c === 0
                }
                assert.deepEqual(Array.from({ length: 2 * K_RANGE + 1 }, (_, index) => index - K_RANGE).filter(holds), [round.k])
                if (round.kind === 'parallel') {
                    // Parallel, not the same line
                    assert.ok(Math.abs(slopeOf(lineWithK(round, round.k))! - slopeOf(round.fixed)!) < 1e-9)
                    assert.notEqual(lineWithK(round, round.k).c * round.fixed.b, round.fixed.c * lineWithK(round, round.k).b)
                }
                renders(lineLatex(round.fixed))
                renders(lineLatex(round.moving, { slot: round.slot, text: 'k' }))
                renders(lineLatex(lineWithK(round, round.k)))
            }
        }
    }
})

/** A point (x,y) at the end of a line as x·1000 + y; anything else as a number */
function pointRead(latex: string): number {
    const last = latex.split('\\ \\to\\ ').pop()!.split('=').pop()!.trim()
    const match = last.match(/^\((-?\d+),(-?\d+)\)$/)
    return match ? Number(match[1]) * 1000 + Number(match[2]) : endValue(latex)
}

test('4. DBH vectors detective: vectors, lines and their positions', () => {
    checkDetective(createVectorsDetectiveCases, vectorsDetectiveLevels, vectorsDetectiveNames, vectorsDetectiveTips, 1e-6, (latex) => latex, pointRead)
})

test('4. DBH does order matter?: the right count is the model of the situation, four different options, both orders in a set', () => {
    for (let level = 0; level < 3; level += 1) {
        const models = new Set<string>()
        for (let seed = 1; seed <= 150; seed += 1) {
            const rounds = createModelRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, MODEL_ROUNDS)
            assert.equal(new Set(rounds.map((round) => MODEL_ANSWERS[round.model].order)).size, 2)
            for (const round of rounds) {
                models.add(round.model)
                assert.equal(new Set(round.options).size, 4)
                assert.equal(round.options[round.right], modelCount(round.model, round.n, round.k))
                // The count worked out again from scratch
                const again = round.model === 'repetition' ? round.n ** round.k : round.model === 'permutations' ? factorial(round.n) : round.model === 'combinations' ? factorial(round.n) / (factorial(round.k) * factorial(round.n - round.k)) : factorial(round.n) / factorial(round.n - round.k)
                assert.equal(round.options[round.right], again)
                checkTexts([round.text])
                checkLanguages([round.text])
                renders(modelLatex(round.model, round.n, round.k))
            }
        }
        assert.deepEqual([...models].sort(), [['combinations', 'variations'], ['combinations', 'permutations', 'repetition', 'variations'], ['combinations', 'permutations', 'repetition', 'variations']][level])
    }
})

test('4. DBH the box method: the boxes multiply to the count, every box within the steppers, the condition filled first', () => {
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 150; seed += 1) {
            const rounds = createBoxesRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, BOXES_ROUNDS)
            for (const round of rounds) {
                assert.equal(round.boxes.reduce((product, value) => product * value, 1), round.total)
                for (const value of round.boxes) assert.ok(value >= 1 && value <= 10)
                // The steppers start on 1 in every box, never the answer
                assert.ok(round.total > 1)
                if (level === 0) assert.ok(round.boxes.every((value) => value === round.boxes[0]) && round.first === null)
                if (level === 1) assert.equal(round.total, variations(round.boxes[0], round.boxes.length))
                if (level === 2) assert.ok(round.first !== null)
                checkTexts([round.text])
                checkLanguages([round.text])
            }
        }
    }
    // Counted by brute force: three-digit numbers with different digits, not starting with 0
    let count = 0
    for (let value = 100; value <= 999; value += 1) if (new Set(String(value)).size === 3) count += 1
    assert.equal(count, 9 * 9 * 8)
    assert.equal(binomial(6, 2), 15)
})

test('4. DBH combinatorics detective: counting, models and combinations', () => {
    checkDetective(createCombinatoricsDetectiveCases, combinatoricsDetectiveLevels, combinatoricsDetectiveNames, combinatoricsDetectiveTips)
})

test('4. DBH the paths of the tree: the leaves add up to 1, the event is checked by drawing every pair, the kinds of each level', () => {
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 150; seed += 1) {
            const rounds = createTreeRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, TREE_ROUNDS)
            for (const round of rounds) {
                const colours = round.counts.length
                assert.equal(colours, level === 2 ? 3 : 2)
                if (level === 0) assert.ok(round.replace)
                if (level === 1) assert.ok(!round.replace)
                const leaves = Array.from({ length: colours * colours }, (_, index) => `${Math.floor(index / colours)}-${index % colours}`)
                assert.ok(Math.abs(leaves.reduce((sum, leaf) => sum + toNumber(leafProbability(round, leaf)), 0) - 1) < 1e-12)
                assert.deepEqual(round.right, eventLeaves(colours, round.event, round.colour))
                assert.ok(round.right.length > 0 && round.right.length < colours * colours)
                // The event probability by listing every ordered pair of balls
                const balls = round.counts.flatMap((count, colour) => Array<number>(count).fill(colour))
                let hits = 0
                let all = 0
                balls.forEach((first, i) => balls.forEach((second, j) => {
                    if (!round.replace && i === j) return
                    all += 1
                    if (round.right.includes(`${first}-${second}`)) hits += 1
                }))
                assert.ok(Math.abs(toNumber(eventProbability(round)) - hits / all) < 1e-12)
                checkTexts([eventText(round)])
                checkLanguages([eventText(round)])
            }
        }
    }
})

test('4. DBH the contingency table: the cells and the total give the probability, as counted from the table', () => {
    for (let level = 0; level < 3; level += 1) {
        const questions = new Set<string>()
        for (let seed = 1; seed <= 150; seed += 1) {
            const rounds = createTableRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, TABLE_ROUNDS)
            for (const round of rounds) {
                questions.add(round.question)
                const [[a, b], [c, d]] = round.cells
                const expected = { row: (a + b) / (a + b + c + d), cell: a / (a + b + c + d), union: (a + b + c) / (a + b + c + d), 'given-row': a / (a + b), 'given-column': a / (a + c) }[round.question]
                assert.ok(Math.abs(toNumber(tableAnswer(round)) - expected) < 1e-12)
                assert.equal(round.numerator.reduce((sum, cell) => sum + cellValue(round, cell), 0) / totalValue(round, round.denominator), expected)
                renders(tableQuestionLatex(round))
            }
        }
        assert.deepEqual([...questions].sort(), [['cell', 'row'], ['cell', 'union'], ['given-column', 'given-row']][level])
    }
})

test('4. DBH probability detective: Laplace, compound events and conditional probability', () => {
    checkDetective(createProbabilityDetectiveCases, probabilityDetectiveLevels, probabilityDetectiveNames, probabilityDetectiveTips)
})

test('4. DBH chained percentages: the multipliers give the total change (not the sum), the way back divides, four different options', () => {
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 150; seed += 1) {
            const rounds = createChainRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, CHAIN_ROUNDS)
            for (const round of rounds) {
                assert.equal(round.changes.length, [2, 3, 1][level])
                assert.equal(new Set(round.options).size, 4)
                assert.equal(round.inverse, level === 2)
                const right = round.options[round.right]
                if (round.inverse) {
                    assert.equal(right, round.start)
                    assert.ok(Math.abs(finalPrice(round) / multiplier(round.changes[0]) - round.start) < 1e-9)
                } else {
                    const factor = round.changes.reduce((product, change) => product * (100 + change) / 100, 1)
                    assert.ok(Math.abs(right - (factor - 1) * 100) < 1e-9)
                    assert.equal(right, totalChange(round.changes))
                    assert.ok(right !== round.changes.reduce((sum, change) => sum + change, 0))
                }
                for (const option of round.options) assert.ok(Math.abs(option * 100 - Math.round(option * 100)) < 1e-9)
            }
        }
    }
})

