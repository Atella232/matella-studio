import test from 'node:test'
import assert from 'node:assert/strict'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import { add, equals, fraction, multiply } from '../src/pages/dbh2-zatikiak-prototype/math/fraction.ts'
import { games } from '../src/pages/dbh2-zatikiak-prototype/games/records.ts'
import { gameModeForPath, gameSlugs } from '../src/pages/dbh2-zatikiak-prototype/routing.ts'
import {
    buildValues,
    createPyramids,
    DOWNWARD_PATTERNS,
    hintFor,
    nextSteps,
    PYRAMID_MAX_SCORE,
    PYRAMID_RELATIONS,
    PYRAMID_ROUNDS,
    pyramidStars,
    solvable,
    stepLatex,
    stepValue,
    type PyramidLevel
} from '../src/pages/dbh2-zatikiak-prototype/games/pyramid.ts'

test('zatikiak pyramid: every brick is the sum (or product) of the two under it', () => {
    const values = buildValues('sum', [fraction(1, 4), fraction(1, 4), fraction(5, 12)])
    assert.deepEqual(values.map((value) => `${value.numerator}/${value.denominator}`), ['7/6', '1/2', '2/3', '1/4', '1/4', '5/12'])
    const product = buildValues('product', [fraction(1, 2), fraction(2, 3), fraction(3)])
    assert.deepEqual(product.map((value) => `${value.numerator}/${value.denominator}`), ['2/3', '1/3', '2/1', '1/2', '2/3', '3/1'])
})

test('zatikiak pyramid: which shown bricks leave a pyramid that can be finished', () => {
    assert.ok(solvable([false, false, false, true, true, true]))
    assert.ok(solvable([true, true, false, false, true, false]), 'top, a middle brick and the middle of the bottom')
    assert.ok(!solvable([true, true, true, false, false, false]), 'the top three do not fix the bottom')
    assert.ok(!solvable([false, false, false, true, false, true]))
    assert.equal(DOWNWARD_PATTERNS.length, 15)
    for (const pattern of DOWNWARD_PATTERNS) {
        assert.equal(pattern.filter(Boolean).length, 3)
        assert.ok(solvable(pattern) && !(pattern[3] && pattern[4] && pattern[5]))
    }
    assert.deepEqual(nextSteps([true, true, false, false, true, false]).map((step) => [step.brick, step.way]), [[2, 'down'], [3, 'down']])
})

test('zatikiak pyramid: every level can be finished brick by brick, and every step gives the right value', () => {
    for (const level of [0, 1, 2] as PyramidLevel[]) {
        for (let seed = 1; seed <= 150; seed += 1) {
            const pyramids = createPyramids(createRandom(seed * 4021 + level), level)
            assert.equal(pyramids.length, PYRAMID_ROUNDS)
            for (const pyramid of pyramids) {
                const label = `level ${level} seed ${seed}: ${pyramid.values.map((value) => `${value.numerator}/${value.denominator}`).join(' ')}`
                assert.equal(pyramid.op, level === 2 ? 'product' : 'sum', label)
                assert.equal(pyramid.given.filter(Boolean).length, 3, label)
                assert.ok(pyramid.values.every((value) => value.numerator > 0), `${label}: positive bricks`)
                for (const [above, left, right] of PYRAMID_RELATIONS) {
                    const expected = pyramid.op === 'sum' ? add(pyramid.values[left], pyramid.values[right]) : multiply(pyramid.values[left], pyramid.values[right])
                    assert.ok(equals(pyramid.values[above], expected), label)
                }
                if (level === 0) assert.deepEqual(pyramid.given, [false, false, false, true, true, true], label)
                if (level === 1) assert.ok(!pyramid.given.slice(3).every(Boolean), `${label}: something to find downwards`)
                // Play it: always some brick to work out, and the step gives its value
                const known = [...pyramid.given]
                while (!known.every(Boolean)) {
                    const steps = nextSteps(known)
                    assert.ok(steps.length > 0, label)
                    for (const step of steps) {
                        assert.ok(equals(stepValue(pyramid, step)!, pyramid.values[step.brick]), label)
                        assert.ok(hintFor(known, step.brick), label)
                        assert.ok(stepLatex(pyramid, step).length > 0)
                        known[step.brick] = true
                    }
                }
            }
        }
    }
})

test('zatikiak pyramid: hints, points and stars', () => {
    const known = [false, false, false, true, true, true]
    assert.equal(hintFor(known, 0), null, 'the top needs the middle row first')
    assert.deepEqual(hintFor(known, 1), { brick: 1, way: 'up', from: [3, 4] })
    const pyramid = { op: 'sum' as const, values: buildValues('sum', [fraction(1, 4), fraction(1, 4), fraction(5, 12)]), given: [true, true, false, false, true, false] }
    assert.equal(stepLatex(pyramid, { brick: 3, way: 'down', from: [1, 4] }), '\\frac{1}{2}-\\frac{1}{4}')
    const products = { op: 'product' as const, values: buildValues('product', [fraction(1, 2), fraction(2, 3), fraction(3)]), given: [true, false, false, false, false, false] }
    assert.equal(stepLatex(products, { brick: 5, way: 'down', from: [2, 4] }), '2\\div \\left(\\frac{2}{3}\\right)')
    assert.equal(PYRAMID_MAX_SCORE, 30)
    assert.deepEqual([30, 26, 25, 20, 19, 14, 13].map(pyramidStars), [3, 3, 2, 2, 1, 1, 0])
})

test('zatikiak pyramid: listed with three levels and reachable by its address', () => {
    const pyramid = games.find((item) => item.id === 'pyramid')
    assert.ok(pyramid)
    assert.deepEqual(pyramid.levels.map((item) => item.progressId), [1401, 1402, 1403])
    assert.equal(gameSlugs.pyramid, 'piramidea')
    assert.equal(gameModeForPath('/matematika/dbh2/zatikiak/juegos/piramide'), 'pyramid')
    assert.equal(gameModeForPath('/matematika/dbh2/zatikiak/jokuak/piramidea'), 'pyramid')
})
