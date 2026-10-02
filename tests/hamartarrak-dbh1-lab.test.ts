import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import {
    alignPair,
    answerPair,
    balanceChallenges,
    balancePairs,
    balanceQuotient,
    balanceTerms,
    bringZero,
    checkComma,
    choosePair,
    commaChallenges,
    commaProducts,
    compareChallenges,
    compareExact,
    comparePairs,
    decimalsLabChallengeIds,
    decimalsLabToolForTopic,
    decimalsLabTools,
    divisionChallenges,
    divisionStatus,
    divisionSteps,
    exact,
    gridChallenges,
    gridValue,
    initialBalanceState,
    initialCommaState,
    initialCompareState,
    initialDivisionState,
    initialGridState,
    initialPlaceState,
    initialRoundingState,
    initialShiftState,
    initialZoomState,
    moveShift,
    multiplyBoth,
    pickCandidate,
    placeChallenges,
    placedText,
    placeText,
    placeValue,
    rightSign,
    roundingCandidates,
    roundingChallenges,
    roundingNumbers,
    roundingPlaces,
    setBalancePair,
    setCommaPlaces,
    setCommaProduct,
    setDivision,
    setGrid,
    setPlaceDigit,
    setRoundingNumber,
    setRoundingPlaces,
    setShiftBase,
    setZoomTarget,
    shiftChallenges,
    shiftedText,
    tapSegment,
    targetDigit,
    writeExact,
    zoomChallenges,
    zoomDepth,
    zoomTargets,
    type BalanceState,
    type CommaState,
    type CompareState,
    type DivisionState,
    type PlaceState,
    type RoundingState,
    type ShiftState,
    type ZoomState
} from '../src/pages/dbh1-hamartarrak-v2/lab/labTools.ts'

const topics = ['decimal-units', 'place-value', 'read-write', 'compare', 'line', 'between', 'decimal-fraction', 'fraction-division', 'rounding', 'add-sub', 'multiply', 'powers-of-ten', 'divide-natural', 'divide-decimal', 'problems']
const stages = ['structure', 'order', 'fractions', 'operations', 'division']

const solvedIds = (challenges: Array<{ id: number; isSolved: (state: never) => boolean }>, state: unknown) => challenges.filter((challenge) => challenge.isSolved(state as never)).map((challenge) => challenge.id)

test('hamartarrak 1. DBH lab: tools, topics and challenge ids', () => {
    assert.equal(decimalsLabTools.length, 9)
    for (const tool of decimalsLabTools) {
        assert.ok(stages.includes(tool.stage), tool.id)
        assert.ok(topics.includes(tool.lessonTopic), tool.id)
    }
    for (const stage of stages) assert.ok(decimalsLabTools.some((tool) => tool.stage === stage), stage)
    for (const [topic, tool] of Object.entries(decimalsLabToolForTopic)) {
        assert.ok(topics.includes(topic), topic)
        assert.ok(decimalsLabTools.some((item) => item.id === tool), `${topic} → ${tool}`)
    }
    assert.equal(new Set(decimalsLabChallengeIds).size, decimalsLabChallengeIds.length)
    assert.equal(decimalsLabChallengeIds.length, 32)
    for (const challenges of [gridChallenges, placeChallenges, compareChallenges, zoomChallenges, roundingChallenges, divisionChallenges, shiftChallenges, commaChallenges, balanceChallenges]) {
        for (const challenge of challenges) {
            for (const language of ['eu', 'es', 'ar'] as const) {
                for (const text of [challenge.prompt[language], challenge.hint[language]]) {
                    for (const [, formula] of text.matchAll(/\$([^$]+)\$/g)) katex.renderToString(formula, { throwOnError: true })
                    if (language === 'ar') assert.ok(!text.includes('{,}'), text)
                }
            }
        }
    }
})

test('hamartarrak 1. DBH lab: exact decimals', () => {
    assert.deepEqual(exact('2,35'), { units: 235, places: 2 })
    assert.equal(writeExact({ units: 5, places: 3 }), '0,005')
    assert.equal(writeExact({ units: 30, places: 1 }), '3,0')
    assert.equal(compareExact(exact('11,8'), exact('11,80')), 0)
    assert.equal(compareExact(exact('0,5'), exact('0,355')), 1)
})

test('hamartarrak 1. DBH lab: the grid carries ten loose squares into a column', () => {
    assert.deepEqual(setGrid({ tenths: 4, hundredths: 9 }, { hundredths: 10 }), { tenths: 5, hundredths: 0 })
    assert.equal(gridValue(setGrid(initialGridState, { tenths: 10 })), 100)
    const solved = [30, 47, 5, 75].flatMap((value) => solvedIds(gridChallenges, { tenths: Math.floor(value / 10), hundredths: value % 10 }))
    assert.deepEqual(solved.sort(), gridChallenges.map((challenge) => challenge.id).sort())
})

test('hamartarrak 1. DBH lab: the place-value board', () => {
    const build = (digits: number[]) => digits.reduce<PlaceState>((state, digit, place) => setPlaceDigit(state, place, digit), initialPlaceState)
    assert.equal(setPlaceDigit({ digits: [0, 0, 0, 0, 0, 9] }, 5, 10).digits[5], 0)
    assert.equal(setPlaceDigit({ digits: [0, 0, 0, 0, 0, 0] }, 5, -1).digits[5], 9)
    const a = build([0, 5, 2, 3, 4, 7])
    assert.equal(placeValue(a), 52347)
    assert.equal(placeText(a), '52,347')
    assert.equal(placeText(build([0, 0, 5, 0, 0, 0])), '5')
    const solved = [build([0, 5, 2, 3, 4, 7]), build([0, 1, 2, 0, 0, 5]), build([0, 0, 3, 4, 7, 0])].flatMap((state) => solvedIds(placeChallenges, state))
    assert.deepEqual([...new Set(solved)].sort(), placeChallenges.map((challenge) => challenge.id).sort())
})

test('hamartarrak 1. DBH lab: comparing pairs', () => {
    assert.deepEqual(comparePairs.map((_, pair) => rightSign(pair)), ['<', '=', '>', '<', '<', '>'])
    assert.deepEqual(alignPair(1), { left: '11,80', right: '11,80', differs: null })
    assert.equal(alignPair(2).differs, 2)
    let state: CompareState = initialCompareState
    for (let pair = 0; pair < comparePairs.length; pair += 1) state = answerPair(choosePair(state, pair), rightSign(pair))
    assert.deepEqual(solvedIds(compareChallenges, state), compareChallenges.map((challenge) => challenge.id))
    // A wrong sign solves nothing
    assert.deepEqual(solvedIds(compareChallenges, answerPair(choosePair(initialCompareState, 2), '<')), [])
})

test('hamartarrak 1. DBH lab: zooming finds every target digit by digit', () => {
    let state: ZoomState = initialZoomState
    assert.equal(tapSegment(state, 9).miss, 9)
    for (let target = 0; target < zoomTargets.length; target += 1) {
        state = setZoomTarget(state, target)
        for (let index = 0; index < zoomDepth(target); index += 1) state = tapSegment(state, targetDigit(target, index))
        assert.equal(state.digits.length, zoomDepth(target))
    }
    assert.deepEqual(solvedIds(zoomChallenges, state), zoomChallenges.map((challenge) => challenge.id))
    assert.deepEqual([0, 1, 2].map((index) => targetDigit(1, index)), [4, 0, 8])
})

test('hamartarrak 1. DBH lab: rounding candidates', () => {
    assert.deepEqual(roundingCandidates(0, 1), { low: { units: 62, places: 1 }, high: { units: 63, places: 1 }, right: 'high' })
    assert.equal(writeExact(roundingCandidates(2, 1).high), '3,0')
    assert.equal(roundingCandidates(5, 0).right, 'low')
    assert.equal(writeExact(roundingCandidates(4, 2).high), '5,10')
    assert.deepEqual(roundingPlaces(0), [0, 1])
    assert.deepEqual(roundingPlaces(3), [0, 1, 2])
    assert.equal(setRoundingNumber({ number: 3, places: 2, picks: {} }, 0).places, 1)
    let state: RoundingState = initialRoundingState
    for (let number = 0; number < roundingNumbers.length; number += 1) {
        for (const places of roundingPlaces(number)) {
            state = setRoundingPlaces(setRoundingNumber(state, number), places)
            state = pickCandidate(state, roundingCandidates(number, places).right)
        }
    }
    assert.deepEqual(solvedIds(roundingChallenges, state), roundingChallenges.map((challenge) => challenge.id))
})

test('hamartarrak 1. DBH lab: the long division', () => {
    const run = (dividend: number, divisor: number) => {
        let state: DivisionState = setDivision(initialDivisionState, { dividend, divisor })
        for (let step = 0; step < 10; step += 1) state = bringZero(state)
        return state
    }
    assert.deepEqual(divisionSteps(125, 20, 5), { whole: 6, digits: [2, 5], remainders: [5, 10, 0] })
    assert.equal(divisionStatus(run(1, 8)), 'exact')
    assert.equal(divisionStatus(run(7, 3)), 'periodic')
    assert.equal(divisionStatus(run(1, 7)), 'periodic')
    assert.equal(run(1, 7).steps, 6)
    const solved = [run(1, 8), run(7, 3), run(25, 4)].flatMap((state) => solvedIds(divisionChallenges, state))
    assert.deepEqual([...new Set(solved)].sort(), divisionChallenges.map((challenge) => challenge.id).sort())
    // Changing the numbers starts again
    assert.equal(setDivision(run(1, 8), { divisor: 4 }).steps, 0)
})

test('hamartarrak 1. DBH lab: the jumping comma', () => {
    assert.equal(shiftedText(0, 3), '4739')
    assert.equal(shiftedText(1, -2), '8,347')
    assert.equal(shiftedText(1, 2), '83470')
    assert.equal(shiftedText(2, 2), '78')
    assert.equal(shiftedText(3, -3), '0,0125')
    assert.equal(shiftedText(3, 1), '125')
    let state: ShiftState = initialShiftState
    const go = (base: number, shift: number) => {
        state = setShiftBase(state, base)
        for (let step = 0; step < Math.abs(shift); step += 1) state = moveShift(state, Math.sign(shift))
    }
    go(0, 3)
    go(1, -2)
    go(2, 2)
    go(3, -3)
    assert.deepEqual(solvedIds(shiftChallenges, state), shiftChallenges.map((challenge) => challenge.id))
    assert.equal(moveShift({ ...initialShiftState, shift: 3 }, 1).shift, 3)
})

test('hamartarrak 1. DBH lab: where the comma goes', () => {
    assert.equal(placedText({ product: 4, places: 3 }), '0,006')
    assert.equal(placedText({ product: 0, places: 2 }), '4,05')
    let state: CommaState = checkComma(setCommaPlaces(initialCommaState, 1))
    assert.equal(state.wrong, true)
    for (let product = 0; product < commaProducts.length; product += 1) {
        const [a, b] = commaProducts[product].map(exact)
        state = checkComma(setCommaPlaces(setCommaProduct(state, product), a.places + b.places))
        assert.equal(state.wrong, false)
    }
    assert.deepEqual(solvedIds(commaChallenges, state), commaChallenges.map((challenge) => challenge.id))
})

test('hamartarrak 1. DBH lab: taking the comma out of the divisor', () => {
    assert.deepEqual(balanceTerms(2, 2), { dividend: { units: 700, places: 0 }, divisor: { units: 5, places: 0 } })
    assert.deepEqual(balancePairs.map((_, pair) => writeExact(balanceQuotient(pair))), ['6,4', '38', '140', '127'])
    // The quotient does not change: dividend / divisor is the same at every step
    for (let pair = 0; pair < balancePairs.length; pair += 1) {
        const values = [0, 1, 2].map((times) => {
            const { dividend, divisor } = balanceTerms(pair, times)
            return (dividend.units / 10 ** dividend.places) / (divisor.units / 10 ** divisor.places)
        })
        assert.ok(values.every((value) => Math.abs(value - values[0]) < 1e-9), `pair ${pair}`)
    }
    let state: BalanceState = initialBalanceState
    for (let pair = 0; pair < balancePairs.length; pair += 1) {
        state = setBalancePair(state, pair)
        while (balanceTerms(state.pair, state.times).divisor.places > 0) state = multiplyBoth(state)
    }
    assert.deepEqual(solvedIds(balanceChallenges, state), balanceChallenges.map((challenge) => challenge.id))
})
