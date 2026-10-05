import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { fraction, toNumber } from '../src/features/unit-v2/math/fraction.ts'
import {
    atMeeting,
    cents,
    compoundAfter,
    fillHours,
    growthChallenges,
    initialGrowthState,
    initialMixtureState,
    initialMotionState,
    initialTapsState,
    meetingMinutes,
    mixtureChallenges,
    mixturePrice,
    motionChallenges,
    positions,
    proportionDbh4ApLabChallengeIds,
    proportionDbh4ApLabToolForTopic,
    proportionDbh4ApLabTools,
    setGrowth,
    setMixture,
    setMotion,
    setTaps,
    simpleAfter,
    tapsChallenges
} from '../src/pages/dbh4-aplikatuak-proportzionaltasuna/lab/labTools.ts'

const topics = ['relations', 'direct-rule', 'inverse-rule', 'compound', 'direct-share', 'inverse-share', 'percent-calc', 'index', 'chained', 'simple-interest', 'compound-interest', 'periods', 'mixtures', 'motion', 'taps']
const stages = ['simple', 'compound', 'percent', 'interest', 'problems']
const solvedIds = (challenges: Array<{ id: number; isSolved: (state: never) => boolean }>, state: unknown) => challenges.filter((challenge) => challenge.isSolved(state as never)).map((challenge) => challenge.id)
const all = (challenges: Array<{ id: number }>) => challenges.map((challenge) => challenge.id)
const solvedBy = (challenges: Array<{ id: number; isSolved: (state: never) => boolean }>, states: unknown[]) => [...new Set(states.flatMap((state) => solvedIds(challenges, state)))].sort()

test('proportzionaltasuna 4. DBH ap lab: tools, topics and challenge ids', () => {
    assert.equal(proportionDbh4ApLabTools.length, 9)
    for (const tool of proportionDbh4ApLabTools) {
        assert.ok(stages.includes(tool.stage), tool.id)
        assert.ok(topics.includes(tool.lessonTopic), tool.id)
        // The observation box is plain text
        assert.ok(!tool.observe.es.includes('$'), tool.id)
    }
    for (const stage of stages) assert.ok(proportionDbh4ApLabTools.some((tool) => tool.stage === stage), stage)
    for (const topic of topics) assert.ok(proportionDbh4ApLabTools.some((tool) => tool.id === proportionDbh4ApLabToolForTopic[topic]), topic)
    assert.equal(new Set(proportionDbh4ApLabChallengeIds).size, proportionDbh4ApLabChallengeIds.length)
    for (const challenges of [growthChallenges, mixtureChallenges, motionChallenges, tapsChallenges]) {
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

test('proportzionaltasuna 4. DBH ap lab: simple against compound interest', () => {
    // The lesson's example: 1000 € at 10 %
    assert.deepEqual([0, 1, 2, 3].map((year) => toNumber(simpleAfter(initialGrowthState, year))), [1000, 1100, 1200, 1300])
    assert.deepEqual([0, 1, 2, 3].map((year) => cents(compoundAfter(initialGrowthState, year))), [1000, 1100, 1210, 1331])
    // The textbook values
    assert.equal(cents(compoundAfter(setGrowth(initialGrowthState, { capital: 10000, rate: 12, years: 1, periods: 12 }), 1)), 11268.25)
    assert.equal(cents(compoundAfter(setGrowth(initialGrowthState, { capital: 10000, rate: 12, years: 1, periods: 4 }), 1)), 11255.09)
    // Limits
    assert.equal(setGrowth(initialGrowthState, { rate: 40, years: 0 }).rate, 12)
    assert.equal(setGrowth(initialGrowthState, { years: 0 }).years, 1)
    const states = [
        initialGrowthState,
        setGrowth(initialGrowthState, { capital: 10000, rate: 12, years: 10 }),
        setGrowth(initialGrowthState, { rate: 12, years: 7 }),
        setGrowth(initialGrowthState, { capital: 10000, rate: 12, years: 1, periods: 12 })
    ]
    assert.deepEqual(solvedBy(growthChallenges, states), all(growthChallenges))
    // Six years at 12 % is not yet the double
    assert.ok(!solvedIds(growthChallenges, setGrowth(initialGrowthState, { rate: 12, years: 6 })).includes(43103))
})

test('proportzionaltasuna 4. DBH ap lab: the mixture', () => {
    assert.deepEqual(mixturePrice(initialMixtureState), fraction(1040, 100))
    assert.equal(setMixture(initialMixtureState, { kilos: [0, 99] }).kilos[0], 30)
    const states = [
        initialMixtureState,
        setMixture(setMixture(initialMixtureState, { kilos: [1, 12] }), { price: [1, 600] }),
        setMixture(setMixture(setMixture(setMixture(initialMixtureState, { kilos: [0, 12] }), { price: [0, 1500] }), { kilos: [1, 10] }), { price: [1, 950] }),
        setMixture(setMixture(setMixture(setMixture(initialMixtureState, { kilos: [0, 1] }), { price: [0, 740] }), { kilos: [1, 3] }), { price: [1, 520] })
    ]
    assert.deepEqual(solvedBy(mixtureChallenges, states), all(mixtureChallenges))
    // Equal prices are not «halfway between two prices»
    assert.ok(!solvedIds(mixtureChallenges, setMixture(setMixture(initialMixtureState, { kilos: [1, 12] }), { price: [1, 1240] })).includes(43202))
})

test('proportzionaltasuna 4. DBH ap lab: two vehicles', () => {
    assert.deepEqual(meetingMinutes(initialMotionState), fraction(80))
    const met = setMotion(initialMotionState, { minutes: 80 })
    assert.ok(atMeeting(met))
    assert.deepEqual(positions(met)[0], positions(met)[1])
    // The clock moves in steps of 5 minutes
    assert.equal(setMotion(initialMotionState, { minutes: 83 }).minutes, 85)
    const chase = setMotion(setMotion(setMotion(setMotion(initialMotionState, { mode: 'chase' }), { distance: 75 }), { speed: [0, 120] }), { speed: [1, 90] })
    assert.deepEqual(meetingMinutes(chase), fraction(150))
    const states = [
        met,
        setMotion(chase, { minutes: 150 }),
        setMotion(setMotion(setMotion(initialMotionState, { distance: 120 }), { speed: [0, 50] }), { speed: [1, 70] }),
        setMotion(chase, { speed: [0, 90] })
    ]
    assert.deepEqual(solvedBy(motionChallenges, states), all(motionChallenges))
    assert.equal(meetingMinutes(setMotion(chase, { speed: [0, 80] })), null)
})

test('proportzionaltasuna 4. DBH ap lab: taps and drain', () => {
    assert.deepEqual(fillHours(initialTapsState), fraction(35, 12))
    // Tap A cannot be closed; tap B and the drain can
    assert.equal(setTaps(initialTapsState, { tap: [0, 0] }).taps[0], 1)
    assert.equal(setTaps(initialTapsState, { tap: [1, 0] }).taps[1], 0)
    const states = [
        initialTapsState,
        setTaps(setTaps(initialTapsState, { tap: [0, 3] }), { tap: [1, 6] }),
        setTaps(setTaps(setTaps(initialTapsState, { tap: [0, 8] }), { tap: [1, 12] }), { drain: 4 }),
        setTaps(setTaps(setTaps(initialTapsState, { tap: [0, 2] }), { tap: [1, 3] }), { drain: 6 })
    ]
    assert.deepEqual(solvedBy(tapsChallenges, states), all(tapsChallenges))
    assert.equal(fillHours(states[2]), null)
})
