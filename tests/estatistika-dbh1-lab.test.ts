import test from 'node:test'
import assert from 'node:assert/strict'
import {
    addRolls,
    answerChart,
    answerDice,
    answerMean,
    chartsChallenges,
    chooseKind,
    diceChallenges,
    eventFrequency,
    initialChartsState,
    initialDiceState,
    initialFrequencyState,
    initialMeanState,
    initialVariablesState,
    meanChallenges,
    meanOf,
    medianOf,
    modesOf,
    probabilityOf,
    rangeOf,
    relative,
    sectorAngle,
    setChart,
    setCount,
    setEvent,
    setValue,
    statisticsLabChallengeIds,
    statisticsLabToolForTopic,
    statisticsLabTools,
    tableChallenges,
    variableCards,
    variablesChallenges,
    type DiceState,
    type MeanState
} from '../src/pages/dbh1-estatistika-v2/lab/labTools.ts'
import { equals, fraction } from '../src/features/unit-v2/math/fraction.ts'

const topics = ['study', 'variables', 'frequencies', 'table', 'bar-chart', 'pie-chart', 'line-chart', 'mean', 'median-mode', 'range', 'random', 'laplace', 'frequency-probability']
const solvedIds = <State>(challenges: Array<{ id: number; isSolved: (state: State) => boolean }>, state: State) => challenges.filter((challenge) => challenge.isSolved(state)).map((challenge) => challenge.id)

test('estatistika 1. DBH lab: tools, topics and challenge ids', () => {
    assert.equal(statisticsLabTools.length, 5)
    for (const topic of topics) assert.ok(statisticsLabToolForTopic[topic], topic)
    for (const tool of statisticsLabTools) assert.ok(topics.includes(tool.lessonTopic), tool.id)
    assert.equal(new Set(statisticsLabChallengeIds).size, statisticsLabChallengeIds.length)
    assert.equal(statisticsLabChallengeIds.length, 20)
})

test('estatistika 1. DBH lab: the variable sorter', () => {
    assert.deepEqual(solvedIds(variablesChallenges, initialVariablesState), [])
    let state = initialVariablesState
    variableCards.forEach((card, index) => { if (card.kind === 'qualitative') state = chooseKind(state, index, card.kind) })
    assert.deepEqual(solvedIds(variablesChallenges, state), [11101])
    // A continuous variable marked qualitative spoils the qualitative group
    const wrong = chooseKind(state, variableCards.findIndex((card) => card.kind === 'continuous'), 'qualitative')
    assert.deepEqual(solvedIds(variablesChallenges, wrong), [])
    variableCards.forEach((card, index) => { state = chooseKind(state, index, card.kind) })
    assert.deepEqual(solvedIds(variablesChallenges, state), [11101, 11102, 11103, 11104])
})

test('estatistika 1. DBH lab: frequency table', () => {
    assert.ok(equals(relative(initialFrequencyState.counts, 0)!, fraction(2, 5)))
    assert.equal(relative([0, 0, 0, 0], 0), null)
    assert.equal(setCount(initialFrequencyState, 0, 99).counts[0], 20)
    assert.deepEqual(solvedIds(tableChallenges, { counts: [10, 5, 5, 5] }), [11201])
    assert.deepEqual(solvedIds(tableChallenges, { counts: [6, 2, 2, 2] }), [11202])
    assert.deepEqual(solvedIds(tableChallenges, { counts: [3, 3, 3, 3] }), [11203])
    assert.deepEqual(solvedIds(tableChallenges, { counts: [8, 6, 4, 2] }), [11204])
    assert.deepEqual(solvedIds(tableChallenges, { counts: [0, 0, 0, 0] }), [])
})

test('estatistika 1. DBH lab: chart maker', () => {
    assert.ok(equals(sectorAngle(initialChartsState.counts, 0)!, fraction(144)))
    let state = setChart(initialChartsState, { index: 0, count: 12 })
    assert.equal(state.counts[0], 12)
    state = { ...state, counts: [10, 5, 5, 0] }
    assert.deepEqual(solvedIds(chartsChallenges, state), [11301, 11302])
    assert.deepEqual(solvedIds(chartsChallenges, { ...setChart(state, { chart: 'bar' }), counts: [4, 4, 4, 4] }), [11303])
    // Writing the football angle twice, for two different tables
    let written = answerChart({ ...initialChartsState }, { answer: '144', checked: true })
    written = answerChart(written, { answer: '144', checked: true })
    assert.equal(written.solved.length, 1)
    written = answerChart({ ...setChart(written, { index: 0, count: 4 }) }, { answer: '90', checked: true })
    assert.deepEqual(written.solved, ['8/20', '4/16'])
    assert.ok(solvedIds(chartsChallenges, written).includes(11304))
    // A revealed answer does not count
    assert.equal(answerChart(initialChartsState, { answer: '144', checked: true, revealed: true }).solved.length, 0)
})

test('estatistika 1. DBH lab: balance of the mean', () => {
    const values = (list: number[]): MeanState => ({ ...initialMeanState, values: list })
    assert.ok(equals(meanOf([5, 7, 7, 8, 9]), fraction(36, 5)))
    assert.ok(equals(medianOf([9, 5, 7, 8, 7]), fraction(7)))
    assert.ok(equals(medianOf([1, 2, 3, 4]), fraction(5, 2)))
    assert.deepEqual(modesOf([4, 6, 4, 6, 5]), [4, 6])
    assert.equal(rangeOf([3, 12, 7]), 9)
    assert.equal(setValue(initialMeanState, 0, 40).values[0], 10)
    assert.deepEqual(solvedIds(meanChallenges, values([6, 6, 6, 6, 6])), [11401, 11402])
    assert.deepEqual(solvedIds(meanChallenges, values([3, 4, 5, 9, 9])), [11401, 11403])
    const written = answerMean(values([5, 7, 7, 8, 9]), { answer: '7,2', checked: true })
    assert.deepEqual(solvedIds(meanChallenges, written), [11404])
    assert.deepEqual(solvedIds(meanChallenges, answerMean(values([5, 5, 5, 5, 10]), { answer: '6', checked: true })), [11401, 11403])
})

test('estatistika 1. DBH lab: die simulator', () => {
    assert.ok(equals(probabilityOf('six'), fraction(1, 6)))
    assert.ok(equals(probabilityOf('less-than-5'), fraction(2, 3)))
    assert.equal(eventFrequency(initialDiceState), null)
    const rolled = addRolls(initialDiceState, [1, 2, 2, 6, 7, 0])
    assert.deepEqual(rolled.faces, [1, 2, 0, 0, 0, 1])
    assert.ok(equals(eventFrequency(rolled)!, fraction(3, 4)))
    let state: DiceState = answerDice(setEvent(initialDiceState, 'six'), { answer: '1/6', checked: true })
    state = answerDice(setEvent(state, 'less-than-5'), { answer: '4/6', checked: true })
    assert.deepEqual(solvedIds(diceChallenges, state), [11501, 11502])
    const fair = addRolls(setEvent(initialDiceState, 'even'), Array.from({ length: 1200 }, (_, index) => (index % 6) + 1))
    assert.deepEqual(solvedIds(diceChallenges, fair), [11503, 11504])
    const loaded = addRolls(setEvent(initialDiceState, 'even'), Array.from({ length: 1200 }, () => 2))
    assert.deepEqual(solvedIds(diceChallenges, loaded), [11503])
})
