import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { relationChallenges, tableChallenges } from '../src/pages/dbh2-funtzioak-v2/lab/labTools.ts'
import { domainChallenges, explorerChallenges, periodicChallenges, rateChallenges } from '../src/pages/dbh4-aplikatuak-funtzioak/lab/labTools.ts'
import {
    cubicCoefficients,
    cubicLatex,
    domainFunctionLatex,
    domainPieces,
    domainsChallenges,
    domainsRight,
    functionsAkLabChallengeIds,
    functionsAkLabToolForTopic,
    functionsAkLabTools,
    initialDomainsState,
    initialJoinState,
    initialParityState,
    initialRootsState,
    joinChallenges,
    joinValues,
    parityChallenges,
    parityLatex,
    parityOf,
    polynomialLatex,
    rootsChallenges,
    setDomains,
    setJoin,
    setParity,
    setRoot,
    signIntervals,
    togglePiece,
    type DomainsState,
    type JoinState,
    type ParityState,
    type RootsState
} from '../src/pages/dbh4-akademikoak-funtzioak/lab/labTools.ts'

const topics = ['what-is', 'images', 'range-graph', 'rational-domain', 'radical-domain', 'mixed-domain', 'discontinuities', 'piecewise', 'piecewise-continuity', 'intercepts', 'sign', 'symmetry', 'monotony', 'rate', 'periodic']
const stages = ['concept', 'domain', 'continuity', 'features', 'change']
const solvedIds = <State>(challenges: Array<{ id: number; isSolved: (state: State) => boolean }>, state: State) => challenges.filter((challenge) => challenge.isSolved(state)).map((challenge) => challenge.id)
/** Each challenge is solved by its own solution, and the starting state solves none */
function checkChallenges<State>(challenges: Array<{ id: number; isSolved: (state: State) => boolean }>, solutions: State[], start: State) {
    assert.equal(solutions.length, challenges.length)
    solutions.forEach((state, index) => assert.ok(solvedIds(challenges, state).includes(challenges[index].id), `${challenges[index].id}`))
    assert.deepEqual(solvedIds(challenges, start), [])
}

/** Marks exactly the right pieces of a domain */
const withRightPicks = (state: DomainsState): DomainsState => ({ ...state, picks: domainPieces(state) })

test('funtzioak 4. DBH ak lab: tools, topics and challenge ids', () => {
    assert.equal(functionsAkLabTools.length, 10)
    for (const tool of functionsAkLabTools) {
        assert.ok(stages.includes(tool.stage), tool.id)
        assert.ok(topics.includes(tool.lessonTopic), tool.id)
        assert.ok(!tool.observe.es.includes('$'), tool.id)
        for (const language of ['eu', 'es', 'en', 'ar'] as const) assert.ok(tool.title[language] && tool.observe[language], `${tool.id} ${language}`)
    }
    for (const stage of stages) assert.ok(functionsAkLabTools.some((tool) => tool.stage === stage), stage)
    for (const topic of topics) assert.ok(functionsAkLabTools.some((tool) => tool.id === functionsAkLabToolForTopic[topic]), topic)
    assert.equal(new Set(functionsAkLabChallengeIds).size, functionsAkLabChallengeIds.length)
    for (const reused of [relationChallenges, tableChallenges, domainChallenges, explorerChallenges, rateChallenges, periodicChallenges]) {
        assert.ok(reused.every((challenge) => functionsAkLabChallengeIds.includes(challenge.id)))
    }
    for (const challenges of [domainsChallenges, joinChallenges, rootsChallenges, parityChallenges] as Array<Array<{ id: number; prompt: Record<string, string>; hint: Record<string, string> }>>) {
        for (const challenge of challenges) {
            assert.ok(challenge.id >= 75000 && challenge.id < 76000, `${challenge.id}`)
            assert.ok(!challenge.prompt.ar.includes('{,}') && !challenge.hint.ar.includes('{,}'), `${challenge.id}`)
            for (const language of ['eu', 'es', 'en', 'ar']) for (const text of [challenge.prompt[language], challenge.hint[language]]) for (const [, formula] of text.matchAll(/\$([^$]+)\$/g)) katex.renderToString(formulaFor(language, formula), { throwOnError: true })
        }
    }
})

test('funtzioak 4. DBH ak lab: building a domain piece by piece', () => {
    // The first root never passes the second, and any change clears the marks
    assert.deepEqual(setDomains(initialDomainsState, { r: 3 }), { ...initialDomainsState, r: 3, t: 3 })
    assert.deepEqual(setDomains(initialDomainsState, { t: -4 }), { ...initialDomainsState, r: -4, t: -4 })
    assert.equal(setDomains(initialDomainsState, { t: 99 }).t, 5)
    const marked = togglePiece(initialDomainsState, 2)
    assert.deepEqual(marked.picks, [false, false, true, false, false])
    assert.deepEqual(setDomains(marked, { kind: 'root' }).picks, [false, false, false, false, false])
    assert.deepEqual(setDomains(marked, {}).picks, marked.picks)
    // 1/P keeps everything but the roots; √P where P ≥ 0; 1/√P where P > 0
    const p = { sign: 1 as const, r: -3, t: 3, picks: initialDomainsState.picks }
    assert.deepEqual(domainPieces({ ...p, kind: 'fraction' }), [true, false, true, false, true])
    assert.deepEqual(domainPieces({ ...p, kind: 'root' }), [true, true, false, true, true])
    assert.deepEqual(domainPieces({ ...p, kind: 'rootDenominator' }), [true, false, false, false, true])
    assert.deepEqual(domainPieces({ ...p, sign: -1, kind: 'root' }), [false, true, true, true, false])
    // A double root: (x − 3)² ≥ 0 everywhere, −(x − 3)² only at 3
    assert.deepEqual(domainPieces({ ...p, r: 3, t: 3, kind: 'root' }), [true, true, false, false, true])
    assert.deepEqual(domainPieces({ ...p, sign: -1, r: 3, t: 3, kind: 'root' }), [false, true, false, false, false])
    assert.ok(domainsRight({ ...p, r: 3, t: 3, kind: 'root', picks: [true, true, true, true, true] }))
    assert.equal(polynomialLatex({ sign: 1, r: -4, t: 2 }), 'x^{2}+2x-8')
    assert.equal(polynomialLatex({ sign: -1, r: -2, t: 2 }), '-x^{2}+4')
    assert.equal(polynomialLatex({ sign: 1, r: 0, t: 4 }), 'x^{2}-4x')
    assert.equal(polynomialLatex({ sign: 1, r: 3, t: 3 }), 'x^{2}-6x+9')
    katex.renderToString(domainFunctionLatex({ kind: 'rootDenominator', sign: -1, r: -1, t: 5 }), { throwOnError: true })
    const solutions: DomainsState[] = [
        withRightPicks({ kind: 'fraction', sign: 1, r: -4, t: 2, picks: initialDomainsState.picks }),
        withRightPicks({ kind: 'root', sign: 1, r: -3, t: 3, picks: initialDomainsState.picks }),
        withRightPicks({ kind: 'root', sign: -1, r: -2, t: 2, picks: initialDomainsState.picks }),
        withRightPicks({ kind: 'rootDenominator', sign: 1, r: 0, t: 4, picks: initialDomainsState.picks }),
        withRightPicks({ kind: 'root', sign: 1, r: 3, t: 3, picks: initialDomainsState.picks })
    ]
    checkChallenges(domainsChallenges, solutions, initialDomainsState)
    // The right function with the wrong marks does not count
    assert.deepEqual(solvedIds(domainsChallenges, { ...solutions[1], picks: [true, false, false, false, true] }), [])
})

test('funtzioak 4. DBH ak lab: joining two pieces', () => {
    assert.deepEqual(joinValues({ preset: 0, k: 1 }), { left: 3, right: 3, jump: 0 })
    assert.deepEqual(joinValues({ preset: 1, k: 0 }), { left: 2, right: 4, jump: 2 })
    assert.deepEqual(joinValues({ preset: 2, k: 2.5 }), { left: 6.5, right: 6.5, jump: 0 })
    assert.equal(setJoin(initialJoinState, { k: 1.3 }).k, 1.5)
    assert.equal(setJoin(initialJoinState, { k: 99 }).k, 6)
    assert.equal(setJoin(initialJoinState, { preset: 7 }).preset, 2)
    const solutions: JoinState[] = [{ preset: 0, k: 1 }, { preset: 0, k: 3 }, { preset: 1, k: 2 }, { preset: 1, k: -1 }, { preset: 2, k: 2.5 }]
    checkChallenges(joinChallenges, solutions, initialJoinState)
})

test('funtzioak 4. DBH ak lab: a cubic from its roots', () => {
    assert.deepEqual(cubicCoefficients({ roots: [1, 2, -2] }), [1, -1, -4, 4])
    assert.equal(cubicLatex({ roots: [1, 2, -2] }), 'y=x^{3}-x^{2}-4x+4')
    assert.equal(cubicLatex({ roots: [0, 2, -2] }), 'y=x^{3}-4x')
    assert.equal(cubicLatex({ roots: [0, 0, 0] }), 'y=x^{3}')
    assert.deepEqual(signIntervals({ roots: [-3, 1, 2] }).map((item) => item.sign), [-1, 1, -1, 1])
    // A double root: no change of sign at 2
    assert.deepEqual(signIntervals({ roots: [2, 2, -1] }).map((item) => item.sign), [-1, 1, 1])
    assert.deepEqual(setRoot(initialRootsState, 0, -9), { roots: [-4, 0, 1] })
    const solutions: RootsState[] = [{ roots: [-2, 1, 2] }, { roots: [2, 0, -2] }, { roots: [-3, 1, 2] }, { roots: [-3, 1, 2] }, { roots: [2, -1, 2] }]
    checkChallenges(rootsChallenges, solutions, initialRootsState)
})

test('funtzioak 4. DBH ak lab: even, odd or neither', () => {
    assert.equal(parityOf({ a: 0, b: 1, c: 0, d: -2 }), 'even')
    assert.equal(parityOf({ a: 1, b: 0, c: -3, d: 0 }), 'odd')
    assert.equal(parityOf({ a: 0, b: 0, c: 0, d: 0 }), 'both')
    assert.equal(parityOf(initialParityState), 'neither')
    assert.equal(parityLatex({ a: 1, b: 0, c: -3, d: 0 }), 'y=x^{3}-3x')
    assert.equal(parityLatex({ a: -1, b: 2, c: 0, d: -1 }), 'y=-x^{3}+2x^{2}-1')
    assert.equal(parityLatex({ a: 0, b: 0, c: 0, d: 0 }), 'y=0')
    assert.deepEqual(setParity(initialParityState, { a: 9 }), { ...initialParityState, a: 3 })
    const solutions: ParityState[] = [{ a: 0, b: 1, c: 0, d: 0 }, { a: 1, b: 0, c: -3, d: 0 }, { a: 0, b: 2, c: 0, d: -2 }, { a: 1, b: 1, c: 0, d: 0 }]
    checkChallenges(parityChallenges, solutions, initialParityState)
})
