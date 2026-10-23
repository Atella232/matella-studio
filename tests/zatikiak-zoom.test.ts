import test from 'node:test'
import assert from 'node:assert/strict'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import { compare, equals, fraction } from '../src/pages/dbh2-zatikiak-prototype/math/fraction.ts'
import { labTools } from '../src/pages/dbh2-zatikiak-prototype/lab/labTools.ts'
import {
    canZoomIn,
    firstMarkBetween,
    initialZoomState,
    markForTap,
    magnification,
    marksBetween,
    pickedValue,
    pickZoomMark,
    randomNeighbours,
    setZoomFraction,
    setZoomSplit,
    zoomBack,
    zoomBeside,
    zoomChallenges,
    zoomCount,
    zoomDenominator,
    zoomExtra,
    zoomIn,
    zoomOut,
    zoomPair,
    zoomSolution,
    zoomWindow,
    ZOOM_LIMITS,
    type ZoomState
} from '../src/pages/dbh2-zatikiak-prototype/lab/zoom.ts'

const pairOf = (a: [number, number], b: [number, number]) =>
    setZoomFraction(setZoomFraction(initialZoomState, 'first', ...a), 'second', ...b)
const solved = (state: ZoomState) => zoomChallenges.filter((challenge) => challenge.isSolved(state)).map((challenge) => challenge.id)
/** Pick the first mark between the pair */
const pickFirst = (state: ZoomState) => pickZoomMark(state, firstMarkBetween(state) ?? 0)

test('zatikiak zoom: marks of the common denominator and cutting them finer', () => {
    let state = pairOf([1, 2], [1, 3])
    assert.deepEqual(zoomPair(state), [{ numerator: 1, denominator: 3 }, { numerator: 1, denominator: 2 }], 'smaller first')
    assert.equal(zoomDenominator(state), 6)
    assert.equal(marksBetween(state), 0, '2/6 and 3/6 are next to each other')
    assert.equal(pickZoomMark(state, 2), state, 'an end is not between')
    state = setZoomSplit(state, 2)
    assert.equal(zoomDenominator(state), 12)
    assert.equal(marksBetween(state), 1)
    state = pickZoomMark(state, 5)
    assert.ok(equals(pickedValue(state)!, fraction(5, 12)))
    assert.equal(pickZoomMark(state, 7).picked, 5, 'outside the pair changes nothing')
    // Cutting finer keeps the chosen mark when it is still a mark, and drops it when not
    assert.equal(setZoomSplit(state, 4).picked, 10)
    assert.equal(setZoomSplit(state, 3).picked, null)
    assert.equal(setZoomSplit(state, 99).split, ZOOM_LIMITS.maxSplit)
    // Equal values: no pair, nothing between
    const same = pairOf([2, 4], [3, 6])
    assert.equal(zoomPair(same), null)
    assert.equal(marksBetween(same), 0)
    assert.equal(zoomIn(same), same)
    // New fractions start again and stay within the limits
    assert.deepEqual(setZoomFraction(state, 'first', 50, 20).first, { numerator: 36, denominator: 12 })
    assert.equal(setZoomFraction(state, 'first', 1, 3).picked, null)
})

test('zatikiak zoom: a tap on the stretch chooses the nearest mark inside it', () => {
    const state = setZoomSplit(pairOf([1, 3], [1, 2]), 2)
    assert.equal(markForTap(state, 5 / 12), 5)
    assert.equal(markForTap(state, 1 / 3 + 0.001), 5, 'next to an end')
    assert.equal(markForTap(state, 1 / 3 - 0.02), 5, 'just outside, within half a mark')
    assert.equal(markForTap(state, 0.1), null, 'far away')
    assert.equal(markForTap(pairOf([1, 3], [1, 2]), 0.4), null, 'nothing between yet')
})

test('zatikiak zoom: windows, magnification and going deeper', () => {
    let state = setZoomSplit(pairOf([1, 3], [1, 2]), 2)
    assert.deepEqual(zoomWindow(state), { low: 0, high: 1, firstMark: 0, lastMark: 12 })
    assert.deepEqual(zoomWindow(pairOf([3, 2], [7, 3])), { low: 1, high: 3, firstMark: 6, lastMark: 18 })
    assert.deepEqual(zoomWindow(pairOf([2, 1], [2, 1])), { low: 2, high: 3, firstMark: 2, lastMark: 3 })
    // The lens never shows more than the whole units, and is only offered when it magnifies
    const wide = pairOf([0, 3], [6, 2])
    assert.equal(canZoomIn(wide), false)
    assert.ok(magnification(zoomIn(wide)) >= 1)
    assert.deepEqual(zoomWindow(zoomIn(pairOf([0, 1], [1, 2]))).low, 0, 'no negative marks before 0')
    assert.equal(canZoomIn(state), true)
    state = zoomIn(state)
    const { low, high } = zoomWindow(state)
    assert.ok(Math.abs(low - (1 / 3 - 1 / 24)) < 1e-12 && Math.abs(high - (1 / 2 + 1 / 24)) < 1e-12)
    assert.ok(Math.abs(magnification(state) - 4) < 1e-9)
    assert.equal(zoomBeside(state, 'left'), state, 'nothing chosen yet')
    state = zoomBeside(pickFirst(state), 'left')
    assert.equal(zoomCount(state), 1)
    assert.deepEqual(zoomPair(state), [{ numerator: 1, denominator: 3 }, { numerator: 5, denominator: 12 }])
    assert.equal(state.split, 1)
    assert.equal(marksBetween(state), 0, 'a new gap to fill')
    // There is always another one: keep going to the deepest zoom
    for (let round = 1; round < ZOOM_LIMITS.maxZooms; round += 1) {
        state = zoomBeside(pickFirst(setZoomSplit(state, 2)), round % 2 ? 'right' : 'left')
        const pair = zoomPair(state)!
        assert.equal(compare(pair[0], pair[1]), -1)
        assert.ok(compare(fraction(1, 3), pair[0]) <= 0 && compare(pair[1], fraction(1, 2)) < 0)
    }
    assert.equal(zoomCount(state), ZOOM_LIMITS.maxZooms)
    const deepest = pickFirst(setZoomSplit(state, 2))
    assert.notEqual(deepest.picked, null)
    assert.equal(zoomBeside(deepest, 'left'), deepest, 'no zooming past the limit')
    assert.ok(magnification(deepest) > 200, "six zooms magnify the line hundreds of times")
    assert.deepEqual(zoomOut(deepest), { ...deepest, lens: null, split: 1, picked: null, trail: [] })
    // Back out one view at a time, each as it was left, or jump to any earlier one
    const back = zoomBack(deepest)
    assert.equal(zoomCount(back), ZOOM_LIMITS.maxZooms - 1)
    assert.deepEqual({ lens: back.lens, split: back.split, picked: back.picked }, deepest.trail[ZOOM_LIMITS.maxZooms - 1])
    assert.notEqual(back.picked, null, 'the mark chosen there is still chosen')
    const start = zoomBack(deepest, 0)
    assert.equal(zoomCount(start), 0)
    assert.deepEqual(zoomPair(start), [{ numerator: 1, denominator: 3 }, { numerator: 1, denominator: 2 }])
    assert.equal(zoomBack(start), start, 'nothing to go back to')
})

test('zatikiak zoom: challenges', () => {
    assert.deepEqual(zoomChallenges.map((challenge) => challenge.id), [1901, 1902, 1903, 1904])
    assert.deepEqual(solved(initialZoomState), [])
    assert.ok(solved(pickFirst(setZoomSplit(pairOf([1, 2], [1, 3]), 3))).includes(1901))
    const close = pickFirst(setZoomSplit(pairOf([5, 6], [7, 9]), 2))
    assert.ok(!solved(close).includes(1902), 'the lens has to be used')
    assert.ok(solved(zoomIn(close)).includes(1902))
    assert.ok(!solved(pickFirst(setZoomSplit(pairOf([2, 5], [3, 5]), 5))).includes(1903), 'only 4 marks')
    assert.ok(solved(pickFirst(setZoomSplit(pairOf([2, 5], [3, 5]), 6))).includes(1903))
    let deep = zoomIn(setZoomSplit(pairOf([1, 4], [1, 2]), 2))
    for (let round = 0; round < 3; round += 1) deep = zoomBeside(pickFirst(setZoomSplit(deep, 2)), 'right')
    assert.ok(!solved(deep).includes(1904), 'something must be found at the end')
    assert.ok(solved(pickFirst(setZoomSplit(deep, 2))).includes(1904))
    for (const challenge of zoomChallenges) {
        for (const language of ['eu', 'es', 'ar'] as const) assert.ok(challenge.prompt[language].trim() && challenge.hint[language].trim())
        assert.doesNotMatch(challenge.prompt.eu + challenge.hint.eu, /\d(?:ren|ko|ra|tik|rekin|tan|an|ean|ek|z)\b/, 'no suffix after a number in Basque')
        // Arabic: every fraction sits inside LRI … PDI
        assert.doesNotMatch((challenge.prompt.ar + challenge.hint.ar).replace(/\u2066[^\u2069]*\u2069/g, ''), /\d\/\d/, `${challenge.id} Arabic fractions isolated`)
    }
})

test('zatikiak zoom: endless practice uses neighbouring fractions', () => {
    for (let seed = 1; seed <= 300; seed += 1) {
        const [first, second] = randomNeighbours(createRandom(seed * 271))
        assert.equal(Math.abs(first.numerator * second.denominator - second.numerator * first.denominator), 1)
        assert.ok(first.denominator <= 12 && second.denominator <= 12 && first.numerator < first.denominator && second.numerator < second.denominator)
        assert.equal(marksBetween(pairOf([first.numerator, first.denominator], [second.numerator, second.denominator])), 0, 'no mark between at first')
        const challenge = zoomExtra(createRandom(seed * 271))
        assert.ok(challenge.isSolved(challenge.solution) && !challenge.isSolved(initialZoomState), `${seed}`)
        for (const text of [...Object.values(challenge.prompt), ...Object.values(challenge.hint)]) assert.ok(text.length > 0)
        assert.doesNotMatch(challenge.prompt.ar.replace(/\u2066[^\u2069]*\u2069/g, ''), /\d\/\d/)
    }
    assert.ok(zoomSolution(fraction(1, 2), fraction(1, 2)).picked === null)
})

test('zatikiak zoom: the tool is in the ordering stage', () => {
    const tool = labTools.find((item) => item.id === 'zoom')
    assert.ok(tool)
    assert.equal(tool.stage, 'ordering')
    assert.equal(tool.lessonTopic, 'ordering')
})
