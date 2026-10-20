import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { exponentialChallenges } from '../src/pages/dbh4-aplikatuak-grafikoa/lab/labTools.ts'
import { ladderChallenges } from '../src/pages/dbh4-akademikoak-potentziak/lab/labTools.ts'
import { circleChallenges } from '../src/pages/dbh4-akademikoak-trigonometria/lab/labTools.ts'
import {
    exponentialAkLabChallengeIds,
    exponentialAkLabToolForTopic,
    exponentialAkLabTools,
    growthChallenges,
    growthValue,
    initialGrowthState,
    initialLogShiftState,
    initialShiftState,
    initialWaveState,
    logShiftAt,
    logShiftChallenges,
    logShiftZero,
    setGrowth,
    setLogShift,
    setShift,
    setWave,
    shiftAt,
    shiftChallenges,
    shiftZero,
    waveAt,
    waveChallenges,
    wavePeriodPi,
    waveRange,
    type GrowthState,
    type LogShiftState,
    type ShiftState,
    type WaveState
} from '../src/pages/dbh4-akademikoak-esponentzialak/lab/labTools.ts'

const topics = ['exp-graph', 'exp-values', 'exp-shifts', 'growth', 'decay', 'exp-equations', 'log-values', 'log-graph', 'log-shifts', 'trig-values', 'sine', 'cosine', 'amplitude', 'period', 'tangent']
const stages = ['exponential', 'growth', 'logarithmic', 'trigonometric', 'transforms']
const close = (a: number, b: number) => Math.abs(a - b) < 1e-9
const solvedIds = <State>(challenges: Array<{ id: number; isSolved: (state: State) => boolean }>, state: State) => challenges.filter((challenge) => challenge.isSolved(state)).map((challenge) => challenge.id)
/** Each challenge is solved by its own solution, and the starting state solves none */
function checkChallenges<State>(challenges: Array<{ id: number; isSolved: (state: State) => boolean }>, solutions: State[], start: State) {
    assert.equal(solutions.length, challenges.length)
    solutions.forEach((state, index) => assert.ok(solvedIds(challenges, state).includes(challenges[index].id), `${challenges[index].id}`))
    assert.deepEqual(solvedIds(challenges, start), [])
}

test('esponentzialak 4. DBH ak lab: tools, topics and challenge ids', () => {
    assert.equal(exponentialAkLabTools.length, 7)
    for (const tool of exponentialAkLabTools) {
        assert.ok(stages.includes(tool.stage), tool.id)
        assert.ok(topics.includes(tool.lessonTopic), tool.id)
        assert.ok(!tool.observe.es.includes('$'), tool.id)
        for (const language of ['eu', 'es', 'ar'] as const) assert.ok(tool.title[language] && tool.observe[language], `${tool.id} ${language}`)
    }
    for (const stage of stages) assert.ok(exponentialAkLabTools.some((tool) => tool.stage === stage), stage)
    for (const topic of topics) assert.ok(exponentialAkLabTools.some((tool) => tool.id === exponentialAkLabToolForTopic[topic]), topic)
    assert.equal(new Set(exponentialAkLabChallengeIds).size, exponentialAkLabChallengeIds.length)
    for (const reused of [exponentialChallenges, ladderChallenges, circleChallenges]) assert.ok(reused.every((challenge) => exponentialAkLabChallengeIds.includes(challenge.id)))
    for (const challenges of [shiftChallenges, growthChallenges, logShiftChallenges, waveChallenges] as Array<Array<{ id: number; prompt: Record<string, string>; hint: Record<string, string> }>>) {
        for (const challenge of challenges) {
            assert.ok(challenge.id >= 79000 && challenge.id < 80000, `${challenge.id}`)
            assert.ok(!challenge.prompt.ar.includes('{,}') && !challenge.hint.ar.includes('{,}'), `${challenge.id}`)
            for (const language of ['eu', 'es', 'ar']) for (const text of [challenge.prompt[language], challenge.hint[language]]) for (const [, formula] of text.matchAll(/\$([^$]+)\$/g)) katex.renderToString(formula, { throwOnError: true })
        }
    }
})

test('esponentzialak 4. DBH ak lab: moving the exponential', () => {
    assert.equal(shiftAt({ base: 0, p: 2, q: 1 }, 2), 2)
    assert.equal(shiftAt({ base: 2, p: 0, q: 0 }, -2), 4)
    assert.equal(shiftZero({ base: 0, p: 0, q: -4 }), 2)
    assert.equal(shiftZero({ base: 0, p: 0, q: 1 }), null)
    assert.deepEqual(setShift(initialShiftState, { base: 9, p: -9, q: 9 }), { base: 2, p: -3, q: 4 })
    const solutions: ShiftState[] = [{ base: 0, p: 3, q: 0 }, { base: 2, p: 1, q: 2 }, { base: 0, p: 0, q: 1 }, { base: 0, p: 0, q: -4 }, { base: 1, p: -1, q: -3 }]
    checkChallenges(shiftChallenges, solutions, initialShiftState)
})

test('esponentzialak 4. DBH ak lab: growth and decay', () => {
    assert.equal(growthValue({ k: 3, r: 10, t: 2 }), 1210)
    assert.equal(growthValue({ k: 4, r: -50, t: 3 }), 250)
    assert.equal(growthValue({ k: 1, r: 200, t: 3 }), 5400)
    assert.deepEqual(setGrowth(initialGrowthState, { r: 13, t: 99 }), { k: 3, r: 15, t: 10 })
    assert.equal(setGrowth(initialGrowthState, { r: -90 }).r, -50)
    const solutions: GrowthState[] = [{ k: 3, r: 10, t: 2 }, { k: 2, r: 100, t: 3 }, { k: 4, r: -50, t: 3 }, { k: 4, r: -10, t: 2 }, { k: 1, r: 200, t: 3 }]
    checkChallenges(growthChallenges, solutions, initialGrowthState)
})

test('esponentzialak 4. DBH ak lab: moving the logarithm', () => {
    assert.equal(logShiftAt({ base: 0, p: -2, q: 0 }, 6), 3)
    assert.equal(logShiftAt({ base: 0, p: -2, q: 0 }, -2), null)
    assert.ok(close(logShiftAt({ base: 3, p: 0, q: 0 }, 4)!, -2))
    assert.equal(logShiftZero({ base: 0, p: -2, q: 0 }), -1)
    assert.equal(logShiftZero({ base: 2, p: 0, q: 3 }), 0.001)
    assert.deepEqual(setLogShift(initialLogShiftState, { base: 9, p: 9, q: -9 }), { base: 3, p: 4, q: -3 })
    const solutions: LogShiftState[] = [{ base: 0, p: -2, q: 0 }, { base: 2, p: 1, q: 3 }, { base: 3, p: 0, q: 0 }, { base: 2, p: 0, q: 3 }, { base: 1, p: -3, q: 1 }]
    checkChallenges(logShiftChallenges, solutions, initialLogShiftState)
})

test('esponentzialak 4. DBH ak lab: waves', () => {
    assert.ok(close(waveAt({ fn: 'sin', a: 2, k: 1, d: 1 }, Math.PI / 2), 3))
    assert.ok(close(waveAt({ fn: 'cos', a: -1, k: 1, d: 0 }, 0), -1))
    assert.equal(wavePeriodPi({ ...initialWaveState, k: 2 }), 1)
    assert.equal(wavePeriodPi({ ...initialWaveState, k: 0 }), 4)
    assert.deepEqual(waveRange({ fn: 'sin', a: -3, k: 1, d: 1 }), [-2, 4])
    // A never vanishes
    assert.equal(setWave(initialWaveState, { a: 0 }).a, -1)
    const solutions: WaveState[] = [{ fn: 'sin', a: 1, k: 1, d: 1 }, { fn: 'cos', a: -3, k: 2, d: 0 }, { fn: 'sin', a: 2, k: 1, d: 3 }, { fn: 'sin', a: 1, k: 0, d: 0 }, { fn: 'cos', a: -1, k: 1, d: 0 }]
    checkChallenges(waveChallenges, solutions, initialWaveState)
})
