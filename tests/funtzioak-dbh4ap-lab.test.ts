import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { toNumber } from '../src/features/unit-v2/math/fraction.ts'
import { relationChallenges, tableChallenges } from '../src/pages/dbh2-funtzioak-v2/lab/labTools.ts'
import {
    boxChallenges,
    boxVolume,
    domainChallenges,
    explorerChallenges,
    explorerInfo,
    functionsLabChallengeIds,
    functionsLabToolForTopic,
    functionsLabTools,
    initialBoxState,
    initialDomainState,
    initialExplorerState,
    initialInterceptsState,
    initialPeriodicState,
    initialRateState,
    interceptsChallenges,
    periodicChallenges,
    periodicValue,
    rateChallenges,
    rateOf,
    setBox,
    setDomain,
    setExplorer,
    setIntercepts,
    setPeriodic,
    setRate,
    xIntercepts,
    type BoxState,
    type DomainState,
    type ExplorerState,
    type InterceptsState,
    type PeriodicState,
    type RateState
} from '../src/pages/dbh4-aplikatuak-funtzioak/lab/labTools.ts'

const topics = ['what-is', 'expressions', 'evaluate', 'domain-graph', 'domain-formula', 'intercepts', 'monotony', 'extrema', 'rate', 'continuity', 'periodicity', 'tendency', 'reading', 'study', 'modelling']
const stages = ['concept', 'domain', 'change', 'properties', 'study']
const solvedIds = <State>(challenges: Array<{ id: number; isSolved: (state: State) => boolean }>, state: State) => challenges.filter((challenge) => challenge.isSolved(state)).map((challenge) => challenge.id)
/** Each challenge is solved by its own solution, and the starting state solves none */
function checkChallenges<State>(challenges: Array<{ id: number; isSolved: (state: State) => boolean }>, solutions: State[], start: State) {
    assert.equal(solutions.length, challenges.length)
    solutions.forEach((state, index) => assert.ok(solvedIds(challenges, state).includes(challenges[index].id), `${challenges[index].id}`))
    assert.deepEqual(solvedIds(challenges, start), [])
}

test('funtzioak 4. DBH ap lab: tools, topics and challenge ids', () => {
    assert.equal(functionsLabTools.length, 8)
    for (const tool of functionsLabTools) {
        assert.ok(stages.includes(tool.stage), tool.id)
        assert.ok(topics.includes(tool.lessonTopic), tool.id)
        assert.ok(!tool.observe.es.includes('$'), tool.id)
    }
    for (const stage of stages) assert.ok(functionsLabTools.some((tool) => tool.stage === stage), stage)
    for (const topic of topics) assert.ok(functionsLabTools.some((tool) => tool.id === functionsLabToolForTopic[topic]), topic)
    assert.equal(new Set(functionsLabChallengeIds).size, functionsLabChallengeIds.length)
    assert.ok(relationChallenges.every((challenge) => functionsLabChallengeIds.includes(challenge.id)) && tableChallenges.every((challenge) => functionsLabChallengeIds.includes(challenge.id)))
    for (const challenges of [domainChallenges, interceptsChallenges, explorerChallenges, rateChallenges, periodicChallenges, boxChallenges] as Array<Array<{ id: number; prompt: Record<string, string>; hint: Record<string, string> }>>) {
        for (const challenge of challenges) {
            assert.ok(!challenge.prompt.ar.includes('{,}') && !challenge.hint.ar.includes('{,}'), `${challenge.id}`)
            for (const language of ['eu', 'es', 'ar']) for (const text of [challenge.prompt[language], challenge.hint[language]]) for (const [, formula] of text.matchAll(/\$([^$]+)\$/g)) katex.renderToString(formula, { throwOnError: true })
        }
    }
})

test('funtzioak 4. DBH ap lab: domain and range', () => {
    assert.deepEqual(setDomain(initialDomainState, { from: 3 }), { ...initialDomainState, from: 3, to: 3 })
    assert.deepEqual(setDomain(initialDomainState, { high: -4 }), { ...initialDomainState, low: -4, high: -4 })
    assert.equal(setDomain(initialDomainState, { to: 99 }).to, 6)
    const solutions: DomainState[] = [
        { graph: 0, from: -3, to: 4, low: 0, high: 0 },
        { graph: 0, from: 0, to: 0, low: -2, high: 4 },
        { graph: 1, from: -4, to: 5, low: -1, high: 3 },
        { graph: 2, from: 0, to: 6, low: -3, high: 3 }
    ]
    checkChallenges(domainChallenges, solutions, initialDomainState)
})

test('funtzioak 4. DBH ap lab: intercepts of a parabola', () => {
    assert.deepEqual(xIntercepts({ b: -2, c: -3 }), [-1, 3])
    assert.deepEqual(xIntercepts({ b: -4, c: 4 }), [2])
    assert.deepEqual(xIntercepts({ b: 0, c: 1 }), [])
    assert.deepEqual(setIntercepts(initialInterceptsState, { b: -9 }), { b: -6, c: 1 })
    const solutions: InterceptsState[] = [{ b: 0, c: -3 }, { b: -2, c: -3 }, { b: -4, c: 4 }, { b: -5, c: 4 }]
    checkChallenges(interceptsChallenges, solutions, initialInterceptsState)
})

test('funtzioak 4. DBH ap lab: walking along a graph', () => {
    assert.deepEqual(setExplorer(initialExplorerState, { x: 20 }), { graph: 0, x: 8 })
    assert.deepEqual(setExplorer({ graph: 0, x: 5 }, { graph: 2 }), { graph: 2, x: -4 })
    const peak = explorerInfo({ graph: 0, x: 1 })
    assert.equal(peak.y, 3)
    assert.equal(peak.relative, 'max')
    assert.equal(peak.absolute, 'max')
    assert.equal(explorerInfo({ graph: 0, x: 1 }).trend, 'down')
    assert.equal(explorerInfo({ graph: 0, x: 2 }).trend, 'down')
    assert.equal(explorerInfo({ graph: 0, x: 3 }).trend, 'up')
    const solutions: ExplorerState[] = [{ graph: 0, x: 5 }, { graph: 1, x: 8 }, { graph: 2, x: 2 }, { graph: 2, x: 0 }]
    checkChallenges(explorerChallenges, solutions, initialExplorerState)
})

test('funtzioak 4. DBH ap lab: average rate of change', () => {
    assert.equal(toNumber(rateOf({ fn: 0, a: 1, b: 4 })!), 1)
    assert.equal(toNumber(rateOf({ fn: 0, a: 4, b: 1 })!), 1)
    assert.equal(rateOf({ fn: 0, a: 2, b: 2 }), null)
    assert.equal(toNumber(rateOf({ fn: 2, a: 1, b: 3 })!), 20)
    assert.deepEqual(setRate(initialRateState, { fn: 2 }), { fn: 2, a: 0, b: 1 })
    assert.equal(setRate(initialRateState, { b: 99 }).b, 5)
    const solutions: RateState[] = [{ fn: 0, a: 1, b: 3 }, { fn: 0, a: 1, b: 4 }, { fn: 1, a: 1, b: 2 }, { fn: 2, a: 4, b: 8 }]
    checkChallenges(rateChallenges, solutions, initialRateState)
})

test('funtzioak 4. DBH ap lab: periodic functions', () => {
    assert.deepEqual(periodicValue({ pattern: 0, x: 17 }), { q: 8, r: 1, y: 20 })
    assert.deepEqual(periodicValue({ pattern: 0, x: 40.5 }), { q: 20, r: 0.5, y: 10 })
    assert.deepEqual(periodicValue({ pattern: 1, x: 42 }), { q: 10, r: 2, y: 3 })
    assert.equal(setPeriodic(initialPeriodicState, { x: 3.3 }).x, 3.5)
    assert.equal(setPeriodic({ pattern: 1, x: 0 }, { x: 3.3 }).x, 3)
    assert.deepEqual(setPeriodic({ pattern: 0, x: 9 }, { pattern: 1 }), { pattern: 1, x: 0 })
    const solutions: PeriodicState[] = [{ pattern: 0, x: 17 }, { pattern: 0, x: 31.5 }, { pattern: 1, x: 24 }, { pattern: 1, x: 42 }]
    checkChallenges(periodicChallenges, solutions, initialPeriodicState)
})

test('funtzioak 4. DBH ap lab: the box made from a card', () => {
    assert.equal(boxVolume({ x: 5 }), 3000)
    assert.equal(boxVolume({ x: 10 }), 2000)
    assert.deepEqual(setBox(initialBoxState, 20), { x: 14.5 })
    assert.deepEqual(setBox(initialBoxState, 0), { x: 0.5 })
    // 5,5 is the largest volume among the half steps
    const volumes = Array.from({ length: 29 }, (_, index) => boxVolume({ x: 0.5 + index * 0.5 }))
    assert.equal(0.5 + volumes.indexOf(Math.max(...volumes)) * 0.5, 5.5)
    const solutions: BoxState[] = [{ x: 5 }, { x: 5.5 }, { x: 10 }, { x: 14 }]
    checkChallenges(boxChallenges, solutions, initialBoxState)
})
