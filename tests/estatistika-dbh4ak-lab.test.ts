import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { toNumber } from '../src/features/unit-v2/math/fraction.ts'
import { centreChallenges, cumulativeChallenges, histogramChallenges } from '../src/pages/dbh2-estatistika-v2/lab/labTools.ts'
import { intervalsChallenges, percentileChallenges, scatterChallenges, tableChallenges, whiskersChallenges } from '../src/pages/dbh4-aplikatuak-estatistika/lab/labTools.ts'
import {
    balanceChallenges,
    deviationChallenges,
    initialBalanceState,
    initialDeviationState,
    initialStrataState,
    initialTransformState,
    joinedMeanOf,
    meanDeviationOf,
    samplingFraction,
    setBalance,
    setDeviation,
    setStrata,
    setTransform,
    statisticsAkLabChallengeIds,
    statisticsAkLabToolForTopic,
    statisticsAkLabTools,
    strataChallenges,
    strataShares,
    transformChallenges,
    transformedCv,
    transformedMean,
    transformedSigma,
    varianceOf,
    type BalanceState,
    type DeviationState,
    type StrataState,
    type TransformState
} from '../src/pages/dbh4-akademikoak-estatistika/lab/labTools.ts'
import { classGroups, schoolSample, schoolStrata } from '../src/pages/dbh4-akademikoak-estatistika/data.ts'
import { joinedMean, meanDeviation } from '../src/pages/dbh4-akademikoak-estatistika/stats.ts'

const topics = ['sampling', 'frequencies', 'intervals', 'mean', 'median-mode', 'grouped-centre', 'quartiles', 'percentiles', 'box-plot', 'mean-deviation', 'variance', 'cv', 'scatter', 'correlation', 'regression']
const stages = ['data', 'centre', 'position', 'spread', 'two']
const solvedIds = <State>(challenges: Array<{ id: number; isSolved: (state: State) => boolean }>, state: State) => challenges.filter((challenge) => challenge.isSolved(state)).map((challenge) => challenge.id)
/** Each challenge is solved by its own solution, and the starting state solves none */
function checkChallenges<State>(challenges: Array<{ id: number; isSolved: (state: State) => boolean }>, solutions: State[], start: State) {
    assert.equal(solutions.length, challenges.length)
    solutions.forEach((state, index) => assert.ok(solvedIds(challenges, state).includes(challenges[index].id), `${challenges[index].id}`))
    assert.deepEqual(solvedIds(challenges, start), [])
}

test('estatistika 4. DBH ak lab: tools, topics and challenge ids', () => {
    assert.equal(statisticsAkLabTools.length, 12)
    for (const tool of statisticsAkLabTools) {
        assert.ok(stages.includes(tool.stage), tool.id)
        assert.ok(topics.includes(tool.lessonTopic), tool.id)
        assert.ok(!tool.observe.es.includes('$'), tool.id)
        assert.ok(!/\d,\d/.test(tool.observe.ar + tool.title.ar), tool.id)
    }
    for (const stage of stages) assert.ok(statisticsAkLabTools.some((tool) => tool.stage === stage), stage)
    for (const topic of topics) assert.ok(statisticsAkLabTools.some((tool) => tool.id === statisticsAkLabToolForTopic[topic]), topic)
    assert.equal(new Set(statisticsAkLabChallengeIds).size, statisticsAkLabChallengeIds.length)
    // The borrowed tools keep their own challenge ids
    for (const borrowed of [cumulativeChallenges, centreChallenges, histogramChallenges, intervalsChallenges, percentileChallenges, whiskersChallenges, tableChallenges, scatterChallenges]) {
        assert.ok(borrowed.every((challenge) => statisticsAkLabChallengeIds.includes(challenge.id)))
    }
    for (const challenges of [strataChallenges, balanceChallenges, deviationChallenges, transformChallenges] as Array<Array<{ id: number; prompt: Record<string, string>; hint: Record<string, string> }>>) {
        for (const challenge of challenges) {
            assert.ok(challenge.id >= 81101 && challenge.id < 81500, `${challenge.id}`)
            assert.ok(!challenge.prompt.ar.includes('{,}') && !challenge.hint.ar.includes('{,}'), `${challenge.id}`)
            for (const language of ['eu', 'es', 'ar']) {
                for (const text of [challenge.prompt[language], challenge.hint[language]]) {
                    for (const [, formula] of text.matchAll(/\$([^$]+)\$/g)) {
                        katex.renderToString(formula, { throwOnError: true })
                        assert.ok(!/[؀-ۿ]/.test(formula), `${challenge.id} ${formula}`)
                    }
                }
            }
        }
    }
})

test('estatistika 4. DBH ak lab: the stratified sample', () => {
    // The starting school is the lesson's
    assert.deepEqual(initialStrataState.sizes, schoolStrata.map((row) => row.students))
    assert.equal(initialStrataState.sample, schoolSample)
    assert.deepEqual(strataShares(initialStrataState).map(toNumber), [18, 15, 14, 13])
    assert.equal(toNumber(samplingFraction(initialStrataState)), 0.1)
    assert.equal(setStrata(initialStrataState, { index: 0, size: 333 }).sizes[0], 300)
    assert.equal(setStrata(initialStrataState, { index: 0, size: 3 }).sizes[0], 10)
    assert.equal(setStrata(initialStrataState, { sample: 63 }).sample, 65)
    const solutions: StrataState[] = [
        { sizes: [100, 100, 100, 100], sample: 80 },
        { sizes: [300, 100, 100, 100], sample: 50 },
        { sizes: [180, 150, 130, 90], sample: 55 }
    ]
    checkChallenges(strataChallenges, solutions, initialStrataState)
})

test('estatistika 4. DBH ak lab: two groups on a balance', () => {
    assert.equal(toNumber(joinedMeanOf(initialBalanceState)), joinedMean(classGroups))
    assert.equal(toNumber(joinedMeanOf(initialBalanceState)), 6.92)
    assert.equal(setBalance(initialBalanceState, { group: 0, size: 99 }).sizes[0], 40)
    assert.equal(setBalance(initialBalanceState, { group: 1, mean: -3 }).means[1], 0)
    const solutions: BalanceState[] = [
        { sizes: [10, 10], means: [40, 70] },
        { sizes: [5, 15], means: [60, 80] },
        { sizes: [10, 5], means: [40, 70] }
    ]
    checkChallenges(balanceChallenges, solutions, initialBalanceState)
})

test('estatistika 4. DBH ak lab: distances and squares', () => {
    assert.equal(toNumber(meanDeviationOf(initialDeviationState.values)), meanDeviation(initialDeviationState.values))
    assert.equal(toNumber(meanDeviationOf([4, 6, 7, 8, 10])), 1.6)
    assert.equal(toNumber(varianceOf([4, 6, 7, 8, 10])), 4)
    assert.equal(setDeviation(initialDeviationState, 0, 14).values[0], 10)
    const solutions: DeviationState[] = [
        { values: [2, 3, 5, 7, 8] },
        { values: [4, 5, 6, 7, 8] },
        { values: [1, 4, 5, 7, 8] }
    ]
    checkChallenges(deviationChallenges, solutions, initialDeviationState)
    // DM with mean 5 equals 2 in the first, and the third has σ² = 6
    assert.equal(toNumber(meanDeviationOf([2, 3, 5, 7, 8])), 2)
    assert.equal(toNumber(varianceOf([1, 4, 5, 7, 8])), 6)
})

test('estatistika 4. DBH ak lab: the data a · x + b', () => {
    assert.deepEqual([toNumber(transformedMean(initialTransformState)), transformedSigma(initialTransformState)], [5, 2])
    for (const a of [1, 2, 3, 4]) {
        for (const b of [-4, 0, 7, 15]) {
            const state = { a, b }
            assert.equal(toNumber(transformedMean(state)), 5 * a + b)
            assert.ok(Math.abs(transformedSigma(state) - 2 * a) < 1e-9)
            assert.ok(Math.abs(toNumber(transformedCv(state)!) - (2 * a) / (5 * a + b)) < 1e-12)
        }
    }
    assert.equal(transformedCv({ a: 1, b: -5 }), null)
    assert.deepEqual(setTransform(initialTransformState, { a: 9, b: -20 }), { a: 4, b: -5 })
    const solutions: TransformState[] = [{ a: 1, b: 10 }, { a: 3, b: 0 }, { a: 2, b: 10 }]
    checkChallenges(transformChallenges, solutions, initialTransformState)
})
