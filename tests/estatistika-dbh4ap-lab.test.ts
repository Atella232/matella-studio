import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { toNumber } from '../src/features/unit-v2/math/fraction.ts'
import { histogramChallenges } from '../src/pages/dbh2-estatistika-v2/lab/labTools.ts'
import {
    contingencyChallenges,
    contingencyOf,
    initialContingencyState,
    initialIntervalsState,
    initialPercentileState,
    initialScatterState,
    initialSpreadState,
    initialTableState,
    initialUnionState,
    initialUrnState,
    initialWhiskersState,
    intervalPlan,
    intervalsChallenges,
    percentileChallenges,
    percentileOf,
    rawHeights,
    scatterChallenges,
    scatterEstimate,
    scatterLine,
    scatterR,
    setIntervals,
    setPercentile,
    setScatter,
    setSpread,
    setUrn,
    someBlue,
    spreadChallenges,
    spreadVariance,
    statisticsLabChallengeIds,
    statisticsLabToolForTopic,
    statisticsLabTools,
    tableChallenges,
    tableVarianceOf,
    twoRed,
    unionChallenges,
    unionOf,
    urnChallenges,
    urnTree,
    whiskersChallenges,
    whiskersOf,
    type ContingencyState,
    type IntervalsState,
    type PercentileState,
    type ScatterState,
    type SpreadState,
    type TableState,
    type UnionState,
    type UrnState,
    type WhiskersState
} from '../src/pages/dbh4-aplikatuak-estatistika/lab/labTools.ts'
import { heightIntervals, spellingRows } from '../src/pages/dbh4-aplikatuak-estatistika/data.ts'
import { tableVariance } from '../src/pages/dbh4-aplikatuak-estatistika/stats.ts'

const topics = ['sampling', 'intervals', 'charts', 'central', 'percentiles', 'box-plot', 'variance', 'table-sd', 'cv', 'scatter', 'correlation', 'regression', 'laplace', 'compound', 'contingency']
const stages = ['data', 'centre', 'spread', 'two', 'chance']
const solvedIds = <State>(challenges: Array<{ id: number; isSolved: (state: State) => boolean }>, state: State) => challenges.filter((challenge) => challenge.isSolved(state)).map((challenge) => challenge.id)
/** Each challenge is solved by its own solution, and the starting state solves none */
function checkChallenges<State>(challenges: Array<{ id: number; isSolved: (state: State) => boolean }>, solutions: State[], start: State) {
    assert.equal(solutions.length, challenges.length)
    solutions.forEach((state, index) => assert.ok(solvedIds(challenges, state).includes(challenges[index].id), `${challenges[index].id}`))
    assert.deepEqual(solvedIds(challenges, start), [])
}

test('estatistika 4. DBH ap lab: tools, topics and challenge ids', () => {
    assert.equal(statisticsLabTools.length, 10)
    for (const tool of statisticsLabTools) {
        assert.ok(stages.includes(tool.stage), tool.id)
        assert.ok(topics.includes(tool.lessonTopic), tool.id)
        assert.ok(!tool.observe.es.includes('$'), tool.id)
        assert.ok(!/\d,\d/.test(tool.observe.ar + tool.title.ar), tool.id)
    }
    for (const stage of stages) assert.ok(statisticsLabTools.some((tool) => tool.stage === stage), stage)
    for (const topic of topics) assert.ok(statisticsLabTools.some((tool) => tool.id === statisticsLabToolForTopic[topic]), topic)
    assert.equal(new Set(statisticsLabChallengeIds).size, statisticsLabChallengeIds.length)
    assert.ok(histogramChallenges.every((challenge) => statisticsLabChallengeIds.includes(challenge.id)))
    for (const challenges of [intervalsChallenges, percentileChallenges, whiskersChallenges, spreadChallenges, tableChallenges, scatterChallenges, unionChallenges, urnChallenges, contingencyChallenges] as Array<Array<{ id: number; prompt: Record<string, string>; hint: Record<string, string> }>>) {
        for (const challenge of challenges) {
            assert.ok(!challenge.prompt.ar.includes('{,}') && !challenge.hint.ar.includes('{,}'), `${challenge.id}`)
            for (const language of ['eu', 'es', 'ar']) {
                for (const text of [challenge.prompt[language], challenge.hint[language]]) {
                    for (const [, formula] of text.matchAll(/\$([^$]+)\$/g)) {
                        katex.renderToString(formula, { throwOnError: true })
                        // No Arabic words inside the formulas
                        assert.ok(!/[؀-ۿ]/.test(formula), `${challenge.id} ${formula}`)
                    }
                }
            }
        }
    }
})

test('estatistika 4. DBH ap lab: the 40 heights in intervals', () => {
    // With 6 intervals they are the lesson's table
    const plan = intervalPlan(rawHeights, 6)
    assert.equal(rawHeights.length, 40)
    assert.deepEqual(plan.counts, heightIntervals.map((row) => row.count))
    assert.deepEqual([plan.range, plan.extended, plan.width, plan.start], [29, 30, 5, 147.5])
    assert.deepEqual([intervalPlan(rawHeights, 8).extended, intervalPlan(rawHeights, 8).start], [32, 146.5])
    for (const k of [5, 6, 8, 10]) assert.equal(intervalPlan(rawHeights, k).counts.reduce((a, b) => a + b, 0), 40, `${k}`)
    assert.equal(setIntervals(initialIntervalsState, 7).count, 5)
    const solutions: IntervalsState[] = [{ count: 8 }, { count: 6 }, { count: 10 }]
    checkChallenges(intervalsChallenges, solutions, initialIntervalsState)
})

test('estatistika 4. DBH ap lab: percentiles of a table', () => {
    // The cars of the lesson
    assert.deepEqual([25, 50, 75, 90].map((k) => percentileOf(initialPercentileState.counts, k)), [1, 1, 2, 3])
    assert.equal(percentileOf([0, 0, 0, 0, 0], 50), null)
    assert.equal(setPercentile(initialPercentileState, { index: 0, count: 40 }).counts[0], 15)
    assert.equal(setPercentile(initialPercentileState, { k: 33 }).k, 50)
    const solutions: PercentileState[] = [
        { counts: [2, 2, 4, 2, 0], k: 50 },
        { counts: [1, 0, 8, 1, 0], k: 50 },
        { counts: [4, 4, 0, 0, 2], k: 50 }
    ]
    checkChallenges(percentileChallenges, solutions, initialPercentileState)
})

test('estatistika 4. DBH ap lab: box and whiskers', () => {
    const box = whiskersOf(initialWhiskersState)
    assert.deepEqual([box.q1, box.median, box.q3, box.low, box.high, box.max], [9.5, 11.5, 13.5, 3.5, 19.5, 14])
    assert.deepEqual(box.outliers, [20])
    const solutions: WhiskersState[] = [
        { values: [6, 9, 10, 11, 12, 13, 14, 17] },
        { values: [0, 10, 10, 11, 12, 12, 12, 30] },
        { values: [2, 6, 8, 10, 12, 12, 14, 18] }
    ]
    checkChallenges(whiskersChallenges, solutions, initialWhiskersState)
})

test('estatistika 4. DBH ap lab: five data and their spread', () => {
    assert.equal(toNumber(spreadVariance(initialSpreadState.values)), 4)
    assert.equal(toNumber(spreadVariance([6, 7, 7, 7, 8])), 0.4)
    assert.equal(setSpread(initialSpreadState, 0, 25).values[0], 20)
    const solutions: SpreadState[] = [{ values: [8, 8, 8, 8, 8] }, { values: [6, 7, 7, 7, 8] }, { values: [7, 9, 10, 11, 13] }]
    checkChallenges(spreadChallenges, solutions, initialSpreadState)
})

test('estatistika 4. DBH ap lab: σ of a table', () => {
    // The spelling table of the lesson
    assert.equal(toNumber(tableVarianceOf(initialTableState.counts)!), Number(tableVariance(spellingRows).toFixed(10)))
    assert.equal(tableVarianceOf([0, 0, 0, 0, 0, 0]), null)
    const solutions: TableState[] = [{ counts: [0, 0, 5, 0, 0, 0] }, { counts: [5, 0, 0, 0, 0, 5] }, { counts: [0, 3, 0, 3, 0, 0] }]
    checkChallenges(tableChallenges, solutions, initialTableState)
})

test('estatistika 4. DBH ap lab: cloud, r and regression line', () => {
    const line = scatterLine({ ys: [3, 4, 5, 6, 7, 8], at: 3 })
    assert.deepEqual([line.slope, line.intercept], [1, 2])
    assert.equal(scatterR({ ys: [4, 4, 4, 4, 4, 4], at: 3 }), null)
    assert.ok(Math.abs(scatterR(initialScatterState)! - 0.946) < 0.001)
    assert.equal(setScatter(initialScatterState, { at: 20 }).at, 12)
    const solutions: ScatterState[] = [
        { ys: [3, 4, 5, 6, 7, 8], at: 3 },
        { ys: [9, 8, 6, 5, 3, 1], at: 3 },
        { ys: [2, 8, 5, 5, 8, 2], at: 3 },
        { ys: [3, 4, 5, 6, 7, 8], at: 3 }
    ]
    checkChallenges(scatterChallenges, solutions, initialScatterState)
    assert.equal(scatterEstimate(solutions[3]), 5)
})

test('estatistika 4. DBH ap lab: union of two events', () => {
    assert.deepEqual(unionOf({ a: 'even', b: 'three' }).either, [2, 3, 4, 6])
    assert.deepEqual(unionOf({ a: 'even', b: 'three' }).both, [6])
    const solutions: UnionState[] = [{ a: 'below3', b: 'above3' }, { a: 'below5', b: 'above3' }, { a: 'even', b: 'three' }]
    checkChallenges(unionChallenges, solutions, initialUnionState)
})

test('estatistika 4. DBH ap lab: two draws from an urn', () => {
    // 3 red and 2 blue without replacement: 3/5 · 2/4 = 3/10
    assert.equal(toNumber(twoRed(initialUrnState)), 0.3)
    assert.equal(toNumber(someBlue(initialUrnState)), 0.7)
    const total = urnTree(initialUrnState).reduce((sum, path) => sum + toNumber(path.path), 0)
    assert.ok(Math.abs(total - 1) < 1e-12)
    assert.equal(setUrn(initialUrnState, { red: 0 }).red, 1)
    const solutions: UrnState[] = [{ red: 2, blue: 2, replace: true }, { red: 2, blue: 2, replace: false }, { red: 3, blue: 1, replace: false }]
    checkChallenges(urnChallenges, solutions, initialUrnState)
})

test('estatistika 4. DBH ap lab: contingency table', () => {
    const table = contingencyOf({ cells: [187, 113, 413, 287] })
    assert.equal(table.total, 1000)
    assert.deepEqual(table.pGlassesGivenGirl, { numerator: 113, denominator: 400 })
    const solutions: ContingencyState[] = [{ cells: [3, 5, 9, 5] }, { cells: [5, 5, 15, 15] }, { cells: [2, 6, 18, 14] }]
    checkChallenges(contingencyChallenges, solutions, initialContingencyState)
})
