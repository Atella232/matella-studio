import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import {
    choose,
    drawChallenges,
    drawDistribution,
    drawOf,
    fairChallenges,
    fairExpectation,
    initialDrawState,
    initialFairState,
    initialRepeatState,
    initialSimulateState,
    initialThreeDiceState,
    initialTotalState,
    probabilityAkLabChallengeIds,
    probabilityAkLabToolForTopic,
    probabilityAkLabTools,
    repeatChallenges,
    repeatProbabilities,
    setDraw,
    setFair,
    setRepeat,
    setSimulate,
    setThreeDice,
    setTotal,
    SIMULATION_P,
    simulateChallenges,
    simulationSuccesses,
    THROW_COUNTS,
    threeDiceChallenges,
    threeDiceCount,
    totalChallenges,
    totalOf,
    type DrawState,
    type FairState,
    type RepeatState,
    type SimulateState,
    type ThreeDiceState,
    type TotalState
} from '../src/pages/dbh4-akademikoak-probabilitatea/lab/labTools.ts'

const topics = ['experiments', 'operations', 'compatible', 'frequency', 'laplace', 'properties', 'independent', 'dependent', 'trees', 'contingency', 'conditional', 'total', 'with-combinations', 'several-dice', 'fair-games']
const stages = ['events', 'probability', 'compound', 'conditional', 'counting']
const solvedIds = <State>(challenges: Array<{ id: number; isSolved: (state: State) => boolean }>, state: State) => challenges.filter((challenge) => challenge.isSolved(state)).map((challenge) => challenge.id)
/** Each challenge is solved by its own solution, and the starting state solves none */
function checkChallenges<State>(challenges: Array<{ id: number; isSolved: (state: State) => boolean }>, solutions: State[], start: State) {
    assert.equal(solutions.length, challenges.length)
    solutions.forEach((state, index) => assert.ok(solvedIds(challenges, state).includes(challenges[index].id), `${challenges[index].id}`))
    assert.deepEqual(solvedIds(challenges, start), [])
}
const value = (fraction: { numerator: number; denominator: number }) => fraction.numerator / fraction.denominator

test('probabilitatea 4. DBH ak lab: tools, topics and challenge ids', () => {
    assert.equal(probabilityAkLabTools.length, 10)
    for (const tool of probabilityAkLabTools) {
        assert.ok(stages.includes(tool.stage), tool.id)
        assert.ok(topics.includes(tool.lessonTopic), tool.id)
        assert.ok(!tool.observe.es.includes('$'), tool.id)
    }
    for (const stage of stages) assert.ok(probabilityAkLabTools.some((tool) => tool.stage === stage), stage)
    for (const topic of topics) assert.ok(probabilityAkLabTools.some((tool) => tool.id === probabilityAkLabToolForTopic[topic]), topic)
    assert.equal(new Set(probabilityAkLabChallengeIds).size, probabilityAkLabChallengeIds.length)
    const own = [simulateChallenges, repeatChallenges, totalChallenges, drawChallenges, threeDiceChallenges, fairChallenges] as Array<Array<{ id: number; prompt: Record<string, string>; hint: Record<string, string> }>>
    for (const challenges of own) {
        for (const challenge of challenges) {
            assert.ok(challenge.id >= 85101 && challenge.id < 85700, `${challenge.id}`)
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

test('probabilitatea 4. DBH ak lab: thousands of throws', () => {
    for (const id of ['coin', 'die', 'pin'] as const) {
        const successes = simulationSuccesses[id]
        assert.equal(successes.length, THROW_COUNTS.length)
        // Counts never go down, and never exceed the throws
        successes.forEach((count, index) => assert.ok(count <= THROW_COUNTS[index] && (index === 0 || count >= successes[index - 1]), `${id} ${index}`))
        // With 5000 throws the frequency is close to the probability
        assert.ok(Math.abs(successes[successes.length - 1] / 5000 - SIMULATION_P[id]) < 0.01, id)
    }
    assert.equal(setSimulate(initialSimulateState, { step: 20 }).step, THROW_COUNTS.length - 1)
    const solutions: SimulateState[] = [{ experiment: 'die', step: 0 }, { experiment: 'coin', step: 8 }, { experiment: 'pin', step: 6 }]
    checkChallenges(simulateChallenges, solutions, initialSimulateState)
})

test('probabilitatea 4. DBH ak lab: at least once', () => {
    const six = (times: number) => repeatProbabilities({ event: 'six', times }).atLeastOnce
    assert.ok(six(3) < 0.5 && six(4) > 0.5)
    const doubleSix = (times: number) => repeatProbabilities({ event: 'double-six', times }).atLeastOnce
    assert.ok(doubleSix(24) < 0.5 && doubleSix(25) > 0.5)
    for (let times = 1; times <= 30; times += 1) {
        const { never, atLeastOnce } = repeatProbabilities({ event: 'ace', times })
        assert.ok(Math.abs(never + atLeastOnce - 1) < 1e-12)
        assert.ok(Math.abs(never - 0.9 ** times) < 1e-12)
    }
    assert.equal(setRepeat(initialRepeatState, { times: 99 }).times, 30)
    const solutions: RepeatState[] = [{ event: 'six', times: 4 }, { event: 'double-six', times: 25 }, { event: 'heads', times: 7 }]
    checkChallenges(repeatChallenges, solutions, initialRepeatState)
})

test('probabilitatea 4. DBH ak lab: the die chooses the urn', () => {
    // The lesson: faces 1 and 2 to urn I (2 red of 5), the rest to urn II (4 red of 5)
    const lesson = totalOf({ faces: 2, redI: 2, redII: 4 })
    assert.equal(value(lesson.red), 2 / 3)
    assert.equal(value(lesson.fromI!), 1 / 5)
    // Brute force over the 30 equally likely (face, ball) pairs
    for (let faces = 1; faces <= 5; faces += 1) for (let redI = 0; redI <= 5; redI += 1) for (let redII = 0; redII <= 5; redII += 1) {
        let red = 0
        for (let face = 1; face <= 6; face += 1) for (let ball = 0; ball < 5; ball += 1) if (ball < (face <= faces ? redI : redII)) red += 1
        assert.equal(Math.abs(value(totalOf({ faces, redI, redII }).red) - red / 30) < 1e-12, true)
    }
    assert.equal(totalOf({ faces: 3, redI: 0, redII: 0 }).fromI, null)
    assert.deepEqual(setTotal(initialTotalState, { faces: 9, redI: -2 }), { faces: 5, redI: 0, redII: 2 })
    const solutions: TotalState[] = [{ faces: 2, redI: 2, redII: 4 }, { faces: 3, redI: 1, redII: 4 }, { faces: 3, redI: 2, redII: 2 }]
    checkChallenges(totalChallenges, solutions, initialTotalState)
})

test('probabilitatea 4. DBH ak lab: drawing several at once', () => {
    assert.equal(choose(40, 3), 9880)
    assert.equal(value(drawOf({ total: 40, good: 10, k: 3, j: 3 }).probability), 3 / 247)
    // The distribution of j adds up to 1 and matches a brute-force count
    for (const state of [initialDrawState, { total: 10, good: 4, k: 3, j: 0 }, { total: 12, good: 5, k: 5, j: 0 }] as DrawState[]) {
        const distribution = drawDistribution(state)
        assert.ok(Math.abs(distribution.reduce((total, item) => total + value(item), 0) - 1) < 1e-12)
        const counts = Array.from({ length: state.k + 1 }, () => 0)
        const pick = (start: number, left: number, good: number) => {
            if (left === 0) { counts[good] += 1; return }
            for (let ball = start; ball < state.total; ball += 1) pick(ball + 1, left - 1, good + (ball < state.good ? 1 : 0))
        }
        pick(0, state.k, 0)
        counts.forEach((count, j) => assert.ok(Math.abs(count / choose(state.total, state.k) - value(distribution[j])) < 1e-12, `${j}`))
    }
    assert.deepEqual(setDraw({ total: 10, good: 8, k: 5, j: 5 }, { total: 3 }), { total: 3, good: 3, k: 3, j: 3 })
    const solutions: DrawState[] = [{ total: 40, good: 10, k: 3, j: 3 }, { total: 10, good: 4, k: 3, j: 1 }, { total: 10, good: 6, k: 2, j: 2 }]
    checkChallenges(drawChallenges, solutions, initialDrawState)
})

test('probabilitatea 4. DBH ak lab: three dice', () => {
    for (const statistic of ['max', 'min', 'median', 'sum'] as const) {
        const [min, max] = statistic === 'sum' ? [3, 18] : [1, 6]
        let total = 0
        for (let v = min; v <= max; v += 1) total += threeDiceCount({ statistic, value: v })
        assert.equal(total, 216, statistic)
    }
    assert.equal(threeDiceCount({ statistic: 'max', value: 4 }), 37)
    assert.equal(threeDiceCount({ statistic: 'median', value: 2 }), 40)
    assert.equal(threeDiceCount({ statistic: 'median', value: 5 }), 40)
    assert.equal(threeDiceCount({ statistic: 'sum', value: 10 }), 27)
    assert.equal(setThreeDice({ statistic: 'sum', value: 15 }, { statistic: 'max' }).value, 6)
    const solutions: ThreeDiceState[] = [{ statistic: 'max', value: 6 }, { statistic: 'sum', value: 10 }, { statistic: 'median', value: 2 }]
    checkChallenges(threeDiceChallenges, solutions, initialThreeDiceState)
})

test('probabilitatea 4. DBH ak lab: the fair game', () => {
    assert.equal(value(fairExpectation({ winning: 2, prize: 6, loss: 3 })), 0)
    assert.equal(value(fairExpectation(initialFairState)), -2 / 3)
    assert.deepEqual(setFair(initialFairState, { prize: 40, loss: 0 }), { winning: 2, prize: 12, loss: 1 })
    const solutions: FairState[] = [{ winning: 2, prize: 6, loss: 3 }, { winning: 1, prize: 10, loss: 2 }, { winning: 3, prize: 5, loss: 3 }]
    checkChallenges(fairChallenges, solutions, initialFairState)
})
