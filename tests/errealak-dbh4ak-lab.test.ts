import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import type { LabChallenge } from '../src/features/unit-v2/lab/types.ts'
import {
    hypotenuseSquare,
    initialInterestState,
    initialPercentState,
    initialPythagorasState,
    interestChallenges,
    interestInfo,
    percentChallenges,
    percentFinal,
    percentIndex,
    percentSteps,
    pythagorasChallenges,
    realsPercentLabChallengeIds,
    realsPercentLabToolForTopic,
    realsPercentLabTools,
    setInterest,
    setLegs,
    setPercent
} from '../src/pages/dbh4-akademikoak-errealak/lab/labTools.ts'

// lessons.tsx holds JSX, which node cannot load: the topic ids, in order
const topics = ['decimal-kinds', 'generatrix', 'order-density', 'irrational', 'number-sets', 'represent', 'successive', 'intervals', 'interval-ops', 'rounding', 'errors', 'percent-basics', 'percent-change', 'chained', 'percent-inverse', 'simple-interest', 'compound-interest', 'interest-compare']
const stages = ['rational', 'reals', 'approx', 'percent', 'interest']

const solved = <State,>(challenges: LabChallenge<State>[], state: State) => challenges.filter((challenge) => challenge.isSolved(state)).map((challenge) => challenge.id)
const step = (change: number) => percentSteps.indexOf(change)

test('errealak eta ehunekoak 4. DBH lab: tools, topics and challenge ids', () => {
    assert.equal(realsPercentLabTools.length, 8)
    assert.equal(new Set(realsPercentLabTools.map((tool) => tool.id)).size, 8)
    for (const tool of realsPercentLabTools) {
        assert.ok(stages.includes(tool.stage), tool.id)
        assert.ok(topics.includes(tool.lessonTopic), tool.id)
    }
    for (const topic of topics) assert.ok(realsPercentLabToolForTopic[topic], topic)
    assert.equal(new Set(realsPercentLabChallengeIds).size, realsPercentLabChallengeIds.length)
    for (const challenge of [...pythagorasChallenges, ...percentChallenges, ...interestChallenges] as Array<LabChallenge<unknown>>) {
        for (const language of ['eu', 'es', 'ar'] as const) {
            for (const text of [challenge.prompt[language], challenge.hint[language]]) {
                for (const [, formula] of text.matchAll(/\$([^$]+)\$/g)) katex.renderToString(formula, { throwOnError: true, strict: 'error' })
                if (language === 'ar') assert.ok(!text.includes('{,}') && !/\d,\d/.test(text.replace(/\$[^$]*\$/g, '')), text)
            }
        }
    }
})

test('errealak eta ehunekoak 4. DBH lab: the Pythagoras builder', () => {
    assert.deepEqual(solved(pythagorasChallenges, initialPythagorasState), [])
    assert.ok(solved(pythagorasChallenges, setLegs(initialPythagorasState, { a: 2, b: 3 })).includes(40901))
    assert.ok(solved(pythagorasChallenges, setLegs(initialPythagorasState, { a: 3, b: 4 })).includes(40902))
    assert.ok(solved(pythagorasChallenges, setLegs(initialPythagorasState, { a: 7, b: 1 })).includes(40903))
    assert.ok(solved(pythagorasChallenges, setLegs(initialPythagorasState, { a: 5, b: 5 })).includes(40903))
    assert.ok(solved(pythagorasChallenges, setLegs(initialPythagorasState, { a: 2, b: 2 })).includes(40904))
    assert.equal(hypotenuseSquare(setLegs(initialPythagorasState, { a: 99, b: -4 })), 50)
})

test('errealak eta ehunekoak 4. DBH lab: the chained-percentages machine', () => {
    // Starts with +21 % on 100
    assert.equal(percentFinal(initialPercentState), 121)
    const two = setPercent(initialPercentState, { count: 2 })
    assert.ok(solved(percentChallenges, setPercent(initialPercentState, { amount: 1 })).includes(41001))
    assert.ok(solved(percentChallenges, setPercent(setPercent(two, { step: { index: 0, value: step(25) } }), { step: { index: 1, value: step(-20) } })).includes(41002))
    assert.ok(!solved(percentChallenges, setPercent(two, { step: { index: 0, value: step(0) } })).includes(41002))
    const tenTen = setPercent(setPercent(two, { step: { index: 0, value: step(10) } }), { step: { index: 1, value: step(-10) } })
    assert.ok(solved(percentChallenges, tenTen).includes(41003))
    assert.equal(percentIndex(tenTen), 0.99)
    assert.ok(solved(percentChallenges, setPercent(setPercent(two, { step: { index: 0, value: step(30) } }), { step: { index: 1, value: step(30) } })).includes(41004))
    const car = setPercent(setPercent(setPercent(two, { amount: 4 }), { step: { index: 0, value: step(21) } }), { step: { index: 1, value: step(-20) } })
    assert.equal(percentFinal(car), 17424)
    assert.ok(solved(percentChallenges, car).includes(41005))
    assert.equal(setPercent(initialPercentState, { count: 9 }).count, 3)
})

test('errealak eta ehunekoak 4. DBH lab: the interest race', () => {
    assert.deepEqual(interestInfo(initialInterestState), { capital: 1000, simple: 1100, compound: 1104.08, difference: 4.08 })
    assert.ok(solved(interestChallenges, setInterest(initialInterestState, { rate: 10, years: 5 })).includes(41101))
    assert.ok(solved(interestChallenges, setInterest(initialInterestState, { rate: 10, years: 8 })).includes(41102))
    assert.ok(!solved(interestChallenges, setInterest(initialInterestState, { rate: 9, years: 8 })).includes(41102))
    const oneYear = setInterest(initialInterestState, { years: 1 })
    assert.ok(solved(interestChallenges, oneYear).includes(41103))
    assert.equal(interestInfo(oneYear).difference, 0)
    assert.ok(solved(interestChallenges, setInterest(initialInterestState, { rate: 10, years: 10 })).includes(41104))
    assert.equal(setInterest(initialInterestState, { rate: 3.3 }).rate, 3.5)
})
