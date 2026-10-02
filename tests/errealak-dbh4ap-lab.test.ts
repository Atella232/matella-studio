import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { equals, fraction } from '../src/features/unit-v2/math/fraction.ts'
import type { LabChallenge } from '../src/features/unit-v2/lab/types.ts'
import {
    decimalsChallenges,
    decimalsExpansion,
    generatrixChallenges,
    generatrixValue,
    initialDecimalsState,
    initialGeneratrixState,
    initialIntervalsState,
    initialPowersState,
    initialRadicalsState,
    initialRoundingState,
    initialScientificState,
    initialZoomState,
    integersIn,
    intervalOf,
    intervalsChallenges,
    isScientific,
    nextDigit,
    powersChallenges,
    powerValue,
    radicalsChallenges,
    realsLabChallengeIds,
    realsLabToolForTopic,
    realsLabTools,
    roundingChallenges,
    roundingInfo,
    scientificChallenges,
    scientificMantissa,
    scientificNumbers,
    setDecimals,
    setGeneratrix,
    setIntervals,
    setPowerBase,
    setPowerExponent,
    setRadicand,
    setRounding,
    setScientificExponent,
    setScientificNumber,
    setZoomTarget,
    tapSegment,
    zoomChallenges,
    zoomOut,
    zoomTargets,
    zoomWindow,
    type ZoomState
} from '../src/pages/dbh4-aplikatuak-errealak/lab/labTools.ts'
import { toScientific } from '../src/pages/dbh4-aplikatuak-errealak/reals.ts'

// lessons.tsx holds JSX, which node cannot load: the topic ids, in order
const realsTopics = ['fraction-amount', 'fraction-ops', 'powers', 'decimal-kinds', 'exact-to-fraction', 'periodic-to-fraction', 'irrational', 'number-sets', 'real-line', 'intervals', 'rounding', 'errors', 'scientific', 'scientific-ops', 'roots', 'radical-simplify', 'radical-ops'].map((id) => ({ id }))

const solved = <State,>(challenges: LabChallenge<State>[], state: State) => challenges.filter((challenge) => challenge.isSolved(state)).map((challenge) => challenge.id)

test('errealak 4. DBH lab: tools, topics and challenge ids', () => {
    assert.equal(realsLabTools.length, 8)
    assert.equal(new Set(realsLabChallengeIds).size, realsLabChallengeIds.length)
    assert.equal(realsLabChallengeIds.length, 32)
    for (const topic of realsTopics) assert.ok(realsLabToolForTopic[topic.id], topic.id)
    for (const tool of realsLabTools) assert.ok(realsTopics.some((topic) => topic.id === tool.lessonTopic), tool.id)
    const all = [powersChallenges, decimalsChallenges, generatrixChallenges, zoomChallenges, intervalsChallenges, roundingChallenges, scientificChallenges, radicalsChallenges].flat() as Array<LabChallenge<unknown>>
    for (const challenge of all) {
        for (const language of ['eu', 'es', 'ar'] as const) {
            for (const text of [challenge.prompt[language], challenge.hint[language]]) {
                assert.ok(text.length > 0)
                for (const [, formula] of text.matchAll(/\$([^$]+)\$/g)) katex.renderToString(formula, { throwOnError: true, strict: 'error' })
                if (language === 'ar') assert.ok(!text.includes('{,}'), text)
            }
        }
    }
})

test('errealak 4. DBH lab: the ladder of powers divides by the base at each step', () => {
    let state = initialPowersState
    for (let exponent = 3; exponent >= -3; exponent -= 1) {
        const before = powerValue(state)
        state = setPowerExponent(state, exponent)
        if (exponent < 3) assert.ok(equals(powerValue(state), fraction(before.numerator * 1, before.denominator * 2)))
    }
    assert.deepEqual(solved(powersChallenges, state), [40101])
    assert.ok(equals(powerValue(setPowerExponent(state, 0)), fraction(1)))
    // 9/4 with a negative exponent: (2/3)^-2
    const twoThirds = setPowerExponent(setPowerBase(state, 5), -2)
    assert.ok(solved(powersChallenges, twoThirds).includes(40102))
    assert.ok(solved(powersChallenges, setPowerExponent(setPowerBase(state, 3), 3)).includes(40103))
    assert.ok(solved(powersChallenges, setPowerExponent(setPowerBase(state, 2), -3)).includes(40104))
    assert.equal(setPowerExponent(state, 99).exponent, 5)
})

test('errealak 4. DBH lab: fractions to decimals and back', () => {
    assert.deepEqual(solved(decimalsChallenges, initialDecimalsState), [])
    assert.ok(solved(decimalsChallenges, setDecimals(initialDecimalsState, { numerator: 1, denominator: 3 })).includes(40201))
    assert.ok(solved(decimalsChallenges, setDecimals(initialDecimalsState, { numerator: 1, denominator: 8 })).includes(40202))
    assert.ok(solved(decimalsChallenges, setDecimals(initialDecimalsState, { numerator: 5, denominator: 6 })).includes(40203))
    assert.ok(solved(decimalsChallenges, setDecimals(initialDecimalsState, { numerator: 1, denominator: 7 })).includes(40204))
    assert.ok(solved(decimalsChallenges, setDecimals(initialDecimalsState, { numerator: 1, denominator: 30 })).includes(40205))
    // 5/30 = 1/6 reduces below 25: not the mixed-with-big-denominator challenge
    assert.ok(!solved(decimalsChallenges, setDecimals(initialDecimalsState, { numerator: 5, denominator: 30 })).includes(40205))
    assert.equal(decimalsExpansion(setDecimals(initialDecimalsState, { denominator: 999 })).integer, '0')

    assert.ok(equals(generatrixValue(initialGeneratrixState), fraction(11, 6)))
    const third = setGeneratrix(initialGeneratrixState, { integer: 0, preLength: 0, period: 3 })
    assert.ok(solved(generatrixChallenges, third).includes(40301))
    assert.ok(solved(generatrixChallenges, setGeneratrix(initialGeneratrixState, { integer: 0, preLength: 1, pre: 0, period: 7 })).includes(40302))
    assert.ok(solved(generatrixChallenges, setGeneratrix(third, { period: 9 })).includes(40303))
    assert.ok(solved(generatrixChallenges, setGeneratrix(third, { periodLength: 2, period: 25 })).includes(40304))
    // The period never becomes only zeros
    assert.equal(setGeneratrix(third, { period: 0 }).period, 1)
})

test('errealak 4. DBH lab: zooming in finds the decimals one by one', () => {
    const zoomTo = (target: number, levels: number) => {
        let state: ZoomState = setZoomTarget(initialZoomState, target)
        for (let level = 0; level < levels; level += 1) state = tapSegment(state, nextDigit(state))
        return state
    }
    for (let target = 0; target < zoomTargets.length; target += 1) {
        const state = zoomTo(target, 4)
        const { low, width } = zoomWindow(state)
        assert.ok(low <= zoomTargets[target].value && zoomTargets[target].value < low + width, zoomTargets[target].label)
        assert.ok(Math.abs(width - 1e-4) < 1e-15)
    }
    assert.deepEqual(zoomTo(3, 4).digits, [6, 6, 6, 6])
    assert.deepEqual(zoomTo(0, 3).digits, [4, 1, 4])
    const wrong = tapSegment(setZoomTarget(initialZoomState, 0), 5)
    assert.equal(wrong.miss, 5)
    assert.equal(wrong.digits.length, 0)
    assert.deepEqual(zoomOut(zoomTo(1, 2)).digits, [1])
    assert.ok(solved(zoomChallenges, zoomTo(0, 2)).includes(40401))
    assert.ok(solved(zoomChallenges, zoomTo(1, 3)).includes(40402))
    assert.ok(solved(zoomChallenges, zoomTo(3, 4)).includes(40403))
    assert.ok(solved(zoomChallenges, zoomTo(2, 2)).includes(40404))
})

test('errealak 4. DBH lab: intervals', () => {
    assert.ok(solved(intervalsChallenges, setIntervals(initialIntervalsState, { to: 4 })).includes(40501))
    assert.ok(solved(intervalsChallenges, setIntervals(initialIntervalsState, { infiniteFrom: true, to: 3, closedTo: true })).includes(40502))
    assert.ok(solved(intervalsChallenges, setIntervals(initialIntervalsState, { from: -1, to: 3, closedFrom: false })).includes(40503))
    const ray = setIntervals(initialIntervalsState, { from: 5, closedFrom: true, infiniteTo: true, probe: 5 })
    assert.ok(solved(intervalsChallenges, ray).includes(40504))
    assert.equal(integersIn(intervalOf(ray)), null)
    // The ends never cross
    const pushed = setIntervals(initialIntervalsState, { from: 6 })
    assert.ok(pushed.from < pushed.to)
    assert.equal(integersIn(intervalOf(initialIntervalsState)), 5)
})

test('errealak 4. DBH lab: rounding never errs more than truncating', () => {
    for (let number = 0; number < 6; number += 1) {
        for (let places = 0; places <= 4; places += 1) {
            const info = roundingInfo(setRounding(initialRoundingState, { number, places }))
            assert.ok(info.roundedError <= info.truncatedError + 1e-12)
            assert.ok(info.roundedError <= 0.5 * 10 ** -places + 1e-12)
        }
    }
    assert.ok(solved(roundingChallenges, setRounding(initialRoundingState, { number: 2, places: 1 })).includes(40601))
    assert.ok(solved(roundingChallenges, setRounding(initialRoundingState, { number: 0, places: 3 })).includes(40602))
    assert.ok(!solved(roundingChallenges, setRounding(initialRoundingState, { number: 0, places: 2 })).includes(40602))
    assert.equal(roundingInfo(setRounding(initialRoundingState, { number: 4, places: 2 })).rounded, '3.56')
    assert.ok(solved(roundingChallenges, setRounding(initialRoundingState, { number: 4, places: 2 })).includes(40604))
})

test('errealak 4. DBH lab: the comma jumps to scientific notation', () => {
    let state = initialScientificState
    for (let number = 0; number < scientificNumbers.length; number += 1) {
        state = setScientificNumber(state, number)
        const { exponent, mantissa } = toScientific(scientificNumbers[number].text)
        state = setScientificExponent(state, exponent)
        assert.ok(isScientific(state))
        assert.equal(scientificMantissa(state), mantissa)
        assert.ok(!isScientific(setScientificExponent(state, exponent + 1)))
    }
    assert.deepEqual(solved(scientificChallenges, state), [40701, 40702, 40703])
})

test('errealak 4. DBH lab: pairs out of the root', () => {
    assert.ok(solved(radicalsChallenges, setRadicand(initialRadicalsState, 50)).includes(40801))
    assert.ok(solved(radicalsChallenges, setRadicand(initialRadicalsState, 144)).includes(40802))
    assert.ok(solved(radicalsChallenges, setRadicand(initialRadicalsState, 48)).includes(40803))
    assert.ok(solved(radicalsChallenges, setRadicand(initialRadicalsState, 101)).includes(40804))
    assert.equal(setRadicand(initialRadicalsState, 9999).n, 400)
})
