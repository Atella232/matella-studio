import test from 'node:test'
import assert from 'node:assert/strict'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import { createNaturalsDetectiveCases, naturalsDetectiveLevels, naturalsDetectiveNames, naturalsDetectiveTips } from '../src/pages/dbh1-zenbaki-naturalak-v2/games/detective.ts'
import { createZeroRounds, effective, ROW_MAX, sumLatex, termsLatex, ZERO_LIMIT, ZERO_ROUNDS } from '../src/pages/dbh1-zenbaki-osoak-v2/games/zeroPairs.ts'
import { createIntegersDetectiveCases, integersDetectiveLevels, integersDetectiveNames, integersDetectiveTips } from '../src/pages/dbh1-zenbaki-osoak-v2/games/detective.ts'
import { createMeetRounds, createRectanglesRounds, departures, divisorsOf, gcd, lcm, MEET_ROUNDS, rectanglePairs, RECTANGLES_MAX, RECTANGLES_ROUNDS } from '../src/pages/dbh1-zatigarritasuna-v2/games/divisibilityRounds.ts'
import { createDivisibilityDetectiveCases, divisibilityDetectiveLevels, divisibilityDetectiveNames, divisibilityDetectiveTips } from '../src/pages/dbh1-zatigarritasuna-v2/games/detective.ts'
import { createShareRounds, createStripsRounds, reduce, SHARE_ROUNDS, STRIPS_ROUNDS, valueOf } from '../src/pages/dbh1-zatikiak-v2/games/fractionRounds.ts'
import { createFractionsDetectiveCases, fractionsDetectiveLevels, fractionsDetectiveNames, fractionsDetectiveTips } from '../src/pages/dbh1-zatikiak-v2/games/detective.ts'
import { columns, createCommaRounds, createPodiumRounds, fits, placed, placedLatex, PODIUM_ROUNDS, COMMA_ROUNDS, rightOrder, wrongOrder } from '../src/pages/dbh1-hamartarrak-v2/games/decimalRounds.ts'
import { createDecimalsDetectiveCases, decimalsDetectiveLevels, decimalsDetectiveNames, decimalsDetectiveTips } from '../src/pages/dbh1-hamartarrak-v2/games/detective.ts'
import { amountFor, createGridRounds, createRecipeRounds, GRID_COLUMNS, GRID_ROUNDS, RECIPE_ROUNDS } from '../src/pages/dbh1-proportzionaltasuna-v2/games/proportionRounds.ts'
import { createProportionDetectiveCases, proportionDetectiveLevels, proportionDetectiveNames, proportionDetectiveTips } from '../src/pages/dbh1-proportzionaltasuna-v2/games/detective.ts'
import { COEFFICIENT_LIMIT, createTilesRounds, KINDS, LINE_MAX, polyLatex, termsLatex as tilesLatex, tileCounts, TILES_ROUNDS } from '../src/pages/dbh1-aljebra-v2/games/tilesRounds.ts'
import { ALGEBRA_DETECTIVE_X, algebraDetectiveLevels, algebraDetectiveNames, algebraDetectiveTips, createAlgebraDetectiveCases } from '../src/pages/dbh1-aljebra-v2/games/detective.ts'
import { AREA_ROUNDS, createAreaRounds, GRID } from '../src/pages/dbh1-geometria-v2/games/areaRounds.ts'
import { createGeometryDetectiveCases, geometryDetectiveLevels, geometryDetectiveNames, geometryDetectiveTips } from '../src/pages/dbh1-geometria-v2/games/detective.ts'
import { axesOf, canBuild, createSticksRounds, createSymmetryRounds, SHAPES, STICK_LIMIT, STICKS_ROUNDS, SYMMETRY_ROUNDS, type ShapeName } from '../src/pages/dbh1-figurak-v2/games/figureRounds.ts'
import { createFiguresDetectiveCases, figuresDetectiveLevels, figuresDetectiveNames, figuresDetectiveTips } from '../src/pages/dbh1-figurak-v2/games/detective.ts'
import { checkDetective, endValue, renders } from './helpers/ownGamesCheck.ts'

/* The own games of the 1. DBH units */

/** The end value of a line whose big numbers group thousands with a point (15.728) */
const naturalValue = (latex: string) => endValue(latex.replace(/(\d)\.(?=\d{3}(?!\d))/g, '$1'))

test('1. DBH number detective: the errors of each level, the fix and the last line on their values', () => {
    checkDetective(createNaturalsDetectiveCases, naturalsDetectiveLevels, naturalsDetectiveNames, naturalsDetectiveTips, 1e-9, undefined, naturalValue)
})

test('1. DBH zero pairs: the answer is the sum, never 0 nor out of the stepper, rows that fit, the levels as promised', () => {
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 200; seed += 1) {
            const rounds = createZeroRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, ZERO_ROUNDS)
            for (const { terms, answer, positives, negatives } of rounds) {
                const values = terms.map(effective)
                assert.equal(answer, values.reduce((sum, value) => sum + value, 0))
                assert.equal(positives - negatives, answer)
                assert.ok(answer !== 0 && Math.abs(answer) <= ZERO_LIMIT)
                assert.ok(positives <= ROW_MAX && negatives <= ROW_MAX)
                renders(termsLatex(terms))
                renders(sumLatex(terms))
                if (level === 0) assert.ok(terms.length === 2 && terms.every((term) => term.op === '+') && Math.sign(terms[0].value) !== Math.sign(terms[1].value))
                if (level === 1) assert.ok(terms.length === 2 && terms[1].op === '-')
                if (level === 2) assert.ok(terms.length >= 3 && terms.some((term) => term.op === '-' && term.value < 0))
            }
        }
    }
})

test('1. DBH integers detective: the errors of each level, the fix and the last line on their values', () => {
    checkDetective(createIntegersDetectiveCases, integersDetectiveLevels, integersDetectiveNames, integersDetectiveTips)
})

test('1. DBH rectangles: one rectangle per pair of divisors, answers inside the stepper and never its start', () => {
    assert.deepEqual(rectanglePairs(36), [[1, 36], [2, 18], [3, 12], [4, 9], [6, 6]])
    assert.deepEqual(divisorsOf(12), [1, 2, 3, 4, 6, 12])
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 200; seed += 1) {
            const rounds = createRectanglesRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, RECTANGLES_ROUNDS)
            assert.equal(new Set(rounds.map((round) => round.n)).size, RECTANGLES_ROUNDS)
            for (const { n, ask, answer } of rounds) {
                assert.ok(answer > 0 && answer <= RECTANGLES_MAX)
                assert.equal(ask, level < 2 ? 'rectangles' : 'divisors')
                assert.equal(answer, ask === 'rectangles' ? rectanglePairs(n).length : divisorsOf(n).length)
                if (level === 0) assert.ok(n <= 24 && answer >= 2)
                if (level === 1) assert.ok(n <= 60 && answer >= 3)
            }
            if (level === 2) assert.ok(rounds.some((round) => round.answer === 2) && rounds.some((round) => round.answer % 2 === 1))
        }
    }
})

test('1. DBH buses and ribbons: the answer is the LCM or the GCD and is among the options, both kinds in level 3', () => {
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 200; seed += 1) {
            const rounds = createMeetRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, MEET_ROUNDS)
            for (const { kind, a, b, answer, options } of rounds) {
                assert.ok(a < b)
                assert.equal(answer, kind === 'lcm' ? lcm(a, b) : gcd(a, b))
                assert.ok(options.includes(answer) && new Set(options).size === options.length && options.length >= 4)
                assert.deepEqual(options, [...options].sort((x, y) => x - y))
                if (kind === 'lcm') assert.ok(answer !== b && answer !== a * b && answer <= 60 && departures(a, answer).includes(answer))
                if (kind === 'gcd') assert.ok(answer > 1 && answer !== a && b % answer === 0)
                if (level === 0) assert.equal(kind, 'lcm')
                if (level === 1) assert.equal(kind, 'gcd')
            }
            if (level === 2) assert.ok(rounds.some((round) => round.kind === 'lcm') && rounds.some((round) => round.kind === 'gcd'))
        }
    }
})

test('1. DBH divisibility detective: the errors of each level, the fix and the last line on their values', () => {
    checkDetective(createDivisibilityDetectiveCases, divisibilityDetectiveLevels, divisibilityDetectiveNames, divisibilityDetectiveTips)
})

test('1. DBH share it out: the part (or the whole) is right, four different options, the levels as promised', () => {
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 200; seed += 1) {
            const rounds = createShareRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, SHARE_ROUNDS)
            for (const { a, d, total, part, inverse, answer, options } of rounds) {
                assert.ok(a < d && total % d === 0 && part === (total / d) * a && total <= 48)
                assert.equal(answer, inverse ? total : part)
                assert.equal(inverse, level === 2)
                if (level === 0) assert.equal(a, 1)
                assert.ok(options.length === 4 && new Set(options).size === 4 && options.includes(answer) && options.every((option) => option > 0))
            }
        }
    }
})

test('1. DBH fraction strips: one right option by value, the result fits one strip, the levels as promised', () => {
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 200; seed += 1) {
            const rounds = createStripsRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, STRIPS_ROUNDS)
            for (const { first, second, op, common, options, right } of rounds) {
                const exact = op === '+' ? valueOf(first) + valueOf(second) : valueOf(first) - valueOf(second)
                assert.ok(Math.abs(exact - right) < 1e-9 && right > 0 && right <= 1)
                assert.ok(common % first.d === 0 && common % second.d === 0 && common <= 24)
                assert.equal(options.filter((option) => Math.abs(valueOf(option) - right) < 1e-9).length, 1)
                assert.ok(options.length >= 3 && options.every((option) => option.n > 0 && option.d > 0))
                if (level === 0) assert.ok(first.d === second.d && op === '+')
                if (level === 1) assert.ok(first.d !== second.d && op === '+')
                if (level === 2) assert.ok(first.d !== second.d && op === '-')
                assert.deepEqual(reduce({ n: 6, d: 8 }), { n: 3, d: 4 })
            }
        }
    }
})

test('1. DBH fractions detective: the errors of each level, the fix and the last line on their values', () => {
    checkDetective(createFractionsDetectiveCases, fractionsDetectiveLevels, fractionsDetectiveNames, fractionsDetectiveTips)
})

test('1. DBH move the comma: the digits are placed as written, the answer is the operation, never the start', () => {
    assert.equal(placed('345', -2), '3,45')
    assert.equal(placed('6', -2), '0,06')
    assert.equal(placed('35', 1), '350')
    assert.deepEqual(columns('6', -2), [null, null, null, '0', '0', '6', null])
    assert.deepEqual(columns('35', 1), [null, '3', '5', '0', null, null, null])
    const value = (digits: string, exponent: number) => Number(placed(digits, exponent).replace(',', '.'))
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 200; seed += 1) {
            const rounds = createCommaRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, COMMA_ROUNDS)
            for (const round of rounds) {
                assert.ok(fits(round.digits, round.start) && fits(round.digits, round.answer) && round.start !== round.answer)
                assert.ok(!round.digits.startsWith('0') && !round.digits.endsWith('0'))
                renders(round.question)
                renders(placedLatex(round.digits, round.answer))
                const result = endValue(`${round.question}`.replace(/\\div /g, '/').replace(/\\cdot /g, '*').replace(/\{,\}/g, '.').replace(/^/, '0+'))
                assert.ok(Math.abs(result - value(round.digits, round.answer)) < 1e-9, `${round.question} ≠ ${placed(round.digits, round.answer)}`)
                assert.equal(round.kind, ['power', 'product', 'tenth'][level])
                if (level === 1) assert.ok(round.hint && round.start >= 0)
            }
        }
    }
})

test('1. DBH podium: different values, the trap bites in level 2, five numbers in level 3', () => {
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 200; seed += 1) {
            const rounds = createPodiumRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, PODIUM_ROUNDS)
            for (const { entries } of rounds) {
                assert.equal(entries.length, level === 2 ? 5 : 4)
                assert.equal(new Set(entries.map((item) => item.value)).size, entries.length)
                for (const item of entries) assert.equal(Number(item.text), item.value)
                if (level === 0) assert.ok(entries.every((item) => item.text.split('.')[1].length === 2))
                if (level === 1) assert.ok(wrongOrder(entries).some((item, index) => item !== rightOrder(entries)[index]))
            }
        }
    }
})

test('1. DBH decimals detective: the errors of each level, the fix and the last line on their values', () => {
    checkDetective(createDecimalsDetectiveCases, decimalsDetectiveLevels, decimalsDetectiveNames, decimalsDetectiveTips)
})

test('1. DBH recipe: the answer is proportional, four different options, the levels as promised', () => {
    for (let level = 0; level < 3; level += 1) {
        const places = new Set<number>()
        for (let seed = 1; seed <= 200; seed += 1) {
            const rounds = createRecipeRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, RECIPE_ROUNDS)
            for (const round of rounds) {
                const { people, target, given, answer, options } = round
                assert.ok(target !== people && target > 0)
                if (level === 0) assert.ok(target === 2 * people || target === people / 2)
                if (level < 2) assert.ok(given === null && answer === amountFor(round, target))
                else assert.ok(given === amountFor(round, target) && answer === target)
                assert.ok(options.length === 4 && new Set(options).size === 4 && options.includes(answer) && options.every((option) => option > 0))
                places.add(options.indexOf(answer))
            }
        }
        assert.ok(places.size >= 3, `level ${level}: the answer always in the same place`)
    }
})

test('1. DBH paint the percentage: a whole number of squares that fits the grid, rises and discounts in level 3', () => {
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 200; seed += 1) {
            const rounds = createGridRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, GRID_ROUNDS)
            for (const { total, percent, kind, answer, shown } of rounds) {
                const part = (total * percent) / 100
                assert.ok(Number.isInteger(part) && part > 0 && answer > 0 && answer <= shown && shown % GRID_COLUMNS === total % GRID_COLUMNS)
                assert.equal(answer, kind === 'part' ? part : kind === 'rise' ? total + part : total - part)
                assert.equal(kind === 'part', level < 2)
                assert.ok(answer !== 0)
            }
        }
    }
})

test('1. DBH proportionality detective: the errors of each level, the fix and the last line on their values', () => {
    checkDetective(createProportionDetectiveCases, proportionDetectiveLevels, proportionDetectiveNames, proportionDetectiveTips)
})

test('1. DBH algebra tiles: the answer is the sum of each kind, never all zero, rows that fit, the levels as promised', () => {
    assert.equal(polyLatex({ x2: 1, x: -2, c: 1 }), 'x^{2}-2x+1')
    assert.equal(tilesLatex([{ kind: 'x', value: 3 }, { kind: 'c', value: -2 }, { kind: 'x', value: -1 }]), '3x-2-x')
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 200; seed += 1) {
            const rounds = createTilesRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, TILES_ROUNDS)
            for (const { terms, answer } of rounds) {
                for (const kind of KINDS) {
                    assert.equal(answer[kind], terms.filter((term) => term.kind === kind).reduce((sum, term) => sum + term.value, 0))
                    assert.ok(Math.abs(answer[kind]) <= COEFFICIENT_LIMIT)
                    const [positives, negatives] = tileCounts(terms, kind)
                    assert.ok(positives <= LINE_MAX[kind] && negatives <= LINE_MAX[kind] && positives - negatives === answer[kind])
                }
                assert.ok(answer.x !== 0)
                renders(tilesLatex(terms))
                renders(polyLatex(answer))
                if (level === 0) assert.ok(terms.every((term) => term.value > 0 && term.kind !== 'x2'))
                if (level === 1) assert.ok(terms.some((term) => term.value < 0) && terms.every((term) => term.kind !== 'x2'))
                if (level === 2) assert.ok(answer.x2 !== 0)
            }
        }
    }
})

test('1. DBH algebra detective: the errors of each level, the fix and the last line on their values at x = 2', () => {
    const atX = (latex: string) => endValue(latex.replace(/(\d)x/g, `$1\\cdot (${ALGEBRA_DETECTIVE_X})`).replace(/x/g, `(${ALGEBRA_DETECTIVE_X})`))
    checkDetective(createAlgebraDetectiveCases, algebraDetectiveLevels, algebraDetectiveNames, algebraDetectiveTips, 1e-9, undefined, (latex) => (/^x=/.test(latex.split('\\ \\to\\ ').pop()!) ? endValue(latex) : atX(latex)))
})

test('1. DBH areas on the grid: the area is the shoelace area, the shape and the shape it comes from fit the grid', () => {
    const shoelace = (points: Array<[number, number]>) => Math.abs(points.reduce((sum, [x, y], index) => {
        const [nx, ny] = points[(index + 1) % points.length]
        return sum + x * ny - nx * y
    }, 0)) / 2
    for (let level = 0; level < 3; level += 1) {
        const kinds = new Set<string>()
        for (let seed = 1; seed <= 200; seed += 1) {
            const rounds = createAreaRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, AREA_ROUNDS)
            for (const { kind, points, area, options, base } of rounds) {
                kinds.add(kind)
                assert.equal(shoelace(points), area)
                assert.ok(points.every(([x, y]) => x >= 0 && x <= GRID.columns && y >= 0 && y <= GRID.rows), kind)
                assert.ok(options.includes(area) && new Set(options).size === options.length && options.length >= 3 && options.every((option) => Number.isInteger(option) && option > 0))
                if (kind === 'triangle') {
                    const apex = points[2][0]
                    assert.ok(apex + base <= GRID.columns || apex - base >= 0)
                }
                if (kind === 'trapezoid') assert.ok(points[1][0] + base <= GRID.columns && points[2][0] + (points[1][0] - points[0][0]) <= GRID.columns)
            }
        }
        assert.deepEqual([...kinds].sort(), [['parallelogram', 'rectangle'], ['triangle'], ['rhombus', 'trapezoid']][level])
    }
})

test('1. DBH geometry detective: the errors of each level, the fix and the last line on their values', () => {
    checkDetective(createGeometryDetectiveCases, geometryDetectiveLevels, geometryDetectiveNames, geometryDetectiveTips, 1e-9, undefined, (latex) => endValue(latex.replace(/\^\{\\circ\}/g, '')))
})

test('1. DBH can it be built?: the answer follows the triangle inequality, both answers appear, level 3 asks the range', () => {
    for (let level = 0; level < 3; level += 1) {
        let borderline = 0
        for (let seed = 1; seed <= 200; seed += 1) {
            const rounds = createSticksRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, STICKS_ROUNDS)
            if (level < 2) assert.ok(rounds.some((round) => round.possible) && rounds.some((round) => !round.possible))
            for (const { sides, range, possible } of rounds) {
                if (level === 2) {
                    const [a, b] = sides
                    assert.deepEqual(range, [Math.abs(a - b) + 1, a + b - 1])
                    assert.ok(range![0] > 0 && range![1] <= STICK_LIMIT)
                    continue
                }
                assert.equal(possible, canBuild(sides))
                assert.ok(sides.every((side) => side >= 2 && side <= STICK_LIMIT))
                const [longest, a, b] = [...sides].sort((p, q) => q - p)
                if (a + b === longest) borderline += 1
            }
        }
        if (level === 0) assert.equal(borderline, 0)
        if (level === 1) assert.ok(borderline > 0)
    }
})

test('1. DBH lines of symmetry: the axes of each shape are right, level 3 counts and never starts on the answer', () => {
    const expected: Record<ShapeName, number> = { 'rectangle': 2, 'square': 4, 'rhombus': 2, 'isosceles-trapezoid': 1, 'kite': 1, 'parallelogram': 0, 'right-trapezoid': 0, 'isosceles-triangle': 1, 'equilateral-triangle': 3, 'scalene-triangle': 0, 'pentagon': 5, 'hexagon': 6, 'octagon': 8 }
    /** Reflecting every vertex in an axis gives the same set of vertices */
    const mirrors = (points: Array<[number, number]>, [[x1, y1], [x2, y2]]: Array<[number, number]>) => points.every(([x, y]) => {
        const [dx, dy] = [x2 - x1, y2 - y1]
        const t = ((x - x1) * dx + (y - y1) * dy) / (dx * dx + dy * dy)
        const [fx, fy] = [x1 + t * dx, y1 + t * dy]
        const [rx, ry] = [2 * fx - x, 2 * fy - y]
        return points.some(([px, py]) => Math.hypot(px - rx, py - ry) < 0.6)
    })
    for (const name of Object.keys(expected) as ShapeName[]) {
        assert.equal(axesOf(name).length, expected[name], name)
        for (const axis of axesOf(name)) assert.ok(mirrors(SHAPES[name].points, [axis.from, axis.to]), `${name}: an axis that does not mirror`)
        for (const candidate of SHAPES[name].candidates) assert.equal(mirrors(SHAPES[name].points, [candidate.from, candidate.to]), candidate.axis, `${name}: candidate ${JSON.stringify(candidate)}`)
    }
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 50; seed += 1) {
            const rounds = createSymmetryRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, SYMMETRY_ROUNDS)
            assert.equal(new Set(rounds.map((round) => round.shape)).size, SYMMETRY_ROUNDS)
            for (const round of rounds) {
                assert.equal(round.count, level === 2)
                if (level === 2) assert.ok(round.axes > 0)
                else assert.ok(SHAPES[round.shape].candidates.length === 4)
            }
        }
    }
})

test('1. DBH shapes detective: the errors of each level, the fix and the last line on their values', () => {
    checkDetective(createFiguresDetectiveCases, figuresDetectiveLevels, figuresDetectiveNames, figuresDetectiveTips, 1e-9, undefined, (latex) => endValue(latex.replace(/\^\{\\circ\}/g, '')))
})
