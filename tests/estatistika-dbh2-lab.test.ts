import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import {
    boxChallenges,
    centreChallenges,
    cumulativeChallenges,
    cumulativeOf,
    diceChallenges,
    diceFavourable,
    fiveNumbers,
    groupedMean,
    histogramChallenges,
    initialBoxState,
    initialCentreState,
    initialCumulativeState,
    initialDiceState,
    initialHistogramState,
    initialPieState,
    meanDeviation,
    percentAngle,
    pieChallenges,
    relativeCumulative,
    setBoxValue,
    setCentreCount,
    setCount,
    setDice,
    setHistogram,
    setPercent,
    statisticsLabChallengeIds,
    statisticsLabToolForTopic,
    statisticsLabTools,
    tableMean,
    tableMedian,
    tableModes,
    type BoxState,
    type CentreState,
    type CumulativeState,
    type HistogramState,
    type PieState
} from '../src/pages/dbh2-estatistika-v2/lab/labTools.ts'

const topics = ['sample', 'cumulative', 'grouped', 'histogram', 'pie', 'misleading', 'mean-table', 'median-table', 'symmetry', 'deviation', 'quartiles', 'box-plot', 'events', 'tree', 'double-table']
const value = (fraction: { numerator: number; denominator: number } | null) => (fraction === null ? null : fraction.numerator / fraction.denominator)

const cumulativeWith = (counts: number[]) => counts.reduce<CumulativeState>((state, count, index) => setCount(state, index, count), initialCumulativeState)
const histogramWith = (counts: number[], polygon: HistogramState['polygon'] = 'frequency') =>
    setHistogram(counts.reduce<HistogramState>((state, count, index) => setHistogram(state, { index, count }), initialHistogramState), { polygon })
const pieWith = (percents: number[]) => percents.reduce<PieState>((state, percent, index) => setPercent(state, index, percent), initialPieState)
const centreWith = (counts: number[]) => counts.reduce<CentreState>((state, count, index) => setCentreCount(state, index, count), initialCentreState)
const boxWith = (values: number[]) => values.reduce<BoxState>((state, item, index) => setBoxValue(state, index, item), initialBoxState)

test('estatistika 2. DBH lab: tools, topics and unique challenge ids', () => {
    assert.equal(statisticsLabTools.length, 6)
    for (const topic of topics) assert.ok(statisticsLabToolForTopic[topic], topic)
    for (const tool of Object.values(statisticsLabToolForTopic)) assert.ok(statisticsLabTools.some((item) => item.id === tool))
    assert.equal(new Set(statisticsLabChallengeIds).size, statisticsLabChallengeIds.length)
    assert.equal(statisticsLabChallengeIds.length, 18)
})

test('estatistika 2. DBH lab: every challenge prompt and hint renders', () => {
    const all = [...cumulativeChallenges, ...histogramChallenges, ...pieChallenges, ...centreChallenges, ...boxChallenges, ...diceChallenges]
    for (const challenge of all) {
        for (const text of [challenge.prompt, challenge.hint]) {
            for (const language of ['eu', 'es', 'ar'] as const) {
                for (const [, formula] of text[language].matchAll(/\$([^$]+)\$/g)) katex.renderToString(formula, { throwOnError: true, strict: 'error' })
            }
        }
    }
})

test('estatistika 2. DBH lab: cumulative frequencies of the books table', () => {
    assert.deepEqual(cumulativeOf(initialCumulativeState.counts), [3, 9, 14, 18, 20])
    assert.equal(value(relativeCumulative(initialCumulativeState.counts, 2)), 0.7)
    assert.equal(relativeCumulative([0, 0, 0, 0, 0], 2), null)
    assert.equal(setCount(initialCumulativeState, 0, 99).counts[0], 12)
    for (const challenge of cumulativeChallenges) assert.ok(!challenge.isSolved(initialCumulativeState), `${challenge.id} starts solved`)
    assert.ok(cumulativeChallenges[0].isSolved(cumulativeWith([3, 6, 6, 6, 4])))
    assert.ok(cumulativeChallenges[1].isSolved(cumulativeWith([3, 2, 2, 2, 1])))
    assert.ok(cumulativeChallenges[2].isSolved(cumulativeWith([3, 6, 6, 4, 1])))
})

test('estatistika 2. DBH lab: histogram, grouped mean and polygons', () => {
    assert.equal(value(groupedMean(initialHistogramState.counts)), 162)
    for (const challenge of histogramChallenges) assert.ok(!challenge.isSolved(initialHistogramState), `${challenge.id} starts solved`)
    assert.ok(histogramChallenges[0].isSolved(histogramWith([3, 13, 12, 6])))
    const symmetric = histogramWith([4, 10, 10, 4])
    assert.ok(histogramChallenges[1].isSolved(symmetric))
    assert.equal(value(groupedMean(symmetric.counts)), 160)
    assert.ok(!histogramChallenges[2].isSolved(histogramWith([3, 9, 8, 10])))
    assert.ok(histogramChallenges[2].isSolved(histogramWith([3, 9, 8, 10], 'cumulative')))
})

test('estatistika 2. DBH lab: pie chart angles from percentages', () => {
    assert.deepEqual([45, 30, 15, 10].map(percentAngle), [162, 108, 54, 36])
    for (const challenge of pieChallenges) assert.ok(!challenge.isSolved(initialPieState), `${challenge.id} starts solved`)
    assert.ok(pieChallenges[0].isSolved(pieWith([45, 25, 20, 10])))
    assert.ok(!pieChallenges[0].isSolved(pieWith([45, 25, 15, 10])))
    assert.ok(pieChallenges[1].isSolved(pieWith([25, 25, 25, 25])))
    assert.ok(pieChallenges[2].isSolved(pieWith([45, 20, 15, 20])))
})

test('estatistika 2. DBH lab: mean, median and modes of a table', () => {
    assert.equal(value(tableMean([3, 6, 5, 4, 2, 0])), 1.8)
    assert.equal(value(tableMedian([3, 6, 5, 4, 2, 0])), 2)
    assert.equal(value(tableMedian([0, 1, 4, 3, 2, 0])), 2.5)
    assert.deepEqual(tableModes([0, 4, 0, 0, 4, 0]), [1, 4])
    assert.deepEqual(tableModes([0, 0, 0, 0, 0, 0]), [])
    for (const challenge of centreChallenges) assert.ok(!challenge.isSolved(initialCentreState), `${challenge.id} starts solved`)
    assert.ok(centreChallenges[0].isSolved(centreWith([2, 2, 2, 2, 2, 0])))
    assert.ok(centreChallenges[1].isSolved(centreWith([0, 6, 0, 0, 0, 5])))
    assert.ok(centreChallenges[2].isSolved(centreWith([0, 4, 0, 0, 4, 0])))
})

test('estatistika 2. DBH lab: five numbers and mean deviation of seven data', () => {
    const summary = fiveNumbers([9, 2, 6, 4, 7, 5, 6])
    assert.deepEqual([summary.min, summary.q1, summary.median, summary.q3, summary.max], [2, 4, 6, 7, 9])
    assert.equal(value(meanDeviation([1, 3, 5, 5, 5, 7, 9])), 12 / 7)
    assert.equal(value(meanDeviation([5, 5, 5, 5, 5, 5, 5])), 0)
    for (const challenge of boxChallenges) assert.ok(!challenge.isSolved(initialBoxState), `${challenge.id} starts solved`)
    assert.ok(boxChallenges[0].isSolved(boxWith([2, 4, 5, 5, 6, 7, 8])))
    assert.ok(boxChallenges[1].isSolved(boxWith([0, 4, 5, 5, 5, 6, 10])))
    assert.ok(boxChallenges[2].isSolved(boxWith([1, 3, 5, 5, 5, 7, 9])))
})

test('estatistika 2. DBH lab: events on the sum of two dice', () => {
    assert.equal(diceFavourable(setDice(initialDiceState, { rule: 'equal', target: 7 })), 6)
    assert.equal(diceFavourable(setDice(initialDiceState, { rule: 'atLeast', target: 2 })), 36)
    assert.equal(diceFavourable(setDice(initialDiceState, { rule: 'atMost', target: 4 })), 6)
    assert.equal(setDice(initialDiceState, { target: 20 }).target, 12)
    for (const challenge of diceChallenges) assert.ok(!challenge.isSolved(initialDiceState), `${challenge.id} starts solved`)
    assert.ok(diceChallenges[0].isSolved(setDice(initialDiceState, { target: 7 })))
    assert.ok(diceChallenges[1].isSolved(setDice(initialDiceState, { target: 4 })))
    assert.ok(diceChallenges[2].isSolved(setDice(initialDiceState, { rule: 'atLeast', target: 10 })))
    assert.ok(!diceChallenges[2].isSolved(setDice(initialDiceState, { rule: 'atMost', target: 4 })))
})
