import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { areaChallenges, identityChallenges } from '../src/pages/dbh2-aljebra-v2/lab/labTools.ts'
import { rootsChallenges, ruffiniChallenges } from '../src/pages/dbh4-aplikatuak-polinomioak/lab/labTools.ts'
import {
    binomialChallenges,
    binomialCoefficient,
    binomialSum,
    commonChallenges,
    commonSum,
    domainChallenges,
    domainHoles,
    domainValue,
    expandFactors,
    factorsLatex,
    gcdChallenges,
    initialBinomialState,
    initialCommonState,
    initialDomainState,
    initialGcdState,
    initialParameterState,
    initialQuadraticState,
    initialSimplifyState,
    initialTapsState,
    parameterChallenges,
    parameterRemainder,
    polynomialsFractionsLabChallengeIds,
    polynomialsFractionsLabToolForTopic,
    polynomialsFractionsLabTools,
    quadraticChallenges,
    quadraticFactors,
    remainderInM,
    setBinomial,
    setSimplify,
    simplified,
    simplifyChallenges,
    tapsChallenges,
    tapsTogether,
    type BinomialState,
    type CommonState,
    type DomainState,
    type GcdState,
    type ParameterState,
    type QuadraticState,
    type SimplifyState,
    type TapsState
} from '../src/pages/dbh4-akademikoak-polinomioak/lab/labTools.ts'
import { evaluate } from '../src/pages/dbh4-akademikoak-polinomioak/polynomials.ts'

const topics = ['polynomials', 'identities', 'binomial', 'long-division', 'ruffini', 'remainder', 'roots', 'factorize', 'gcd-lcm', 'algebraic-fractions', 'simplify', 'equivalent', 'add-fractions', 'multiply-fractions', 'combined']
const stages = ['operations', 'division', 'factor', 'fractions', 'operate']
const solvedIds = <State>(challenges: Array<{ id: number; isSolved: (state: State) => boolean }>, state: State) => challenges.filter((challenge) => challenge.isSolved(state)).map((challenge) => challenge.id)
/** Each challenge is solved by its own solution, and the starting state solves none */
function checkChallenges<State>(challenges: Array<{ id: number; isSolved: (state: State) => boolean }>, solutions: State[], start: State) {
    assert.equal(solutions.length, challenges.length)
    solutions.forEach((state, index) => assert.ok(solvedIds(challenges, state).includes(challenges[index].id), `${challenges[index].id}`))
    assert.deepEqual(solvedIds(challenges, start), [])
}

test('polinomioak 4. DBH ak lab: tools, topics and challenge ids', () => {
    assert.equal(polynomialsFractionsLabTools.length, 12)
    for (const tool of polynomialsFractionsLabTools) {
        assert.ok(stages.includes(tool.stage), tool.id)
        assert.ok(topics.includes(tool.lessonTopic), tool.id)
        assert.ok(!tool.observe.es.includes('$'), tool.id)
    }
    for (const stage of stages) assert.ok(polynomialsFractionsLabTools.some((tool) => tool.stage === stage), stage)
    for (const topic of topics) assert.ok(polynomialsFractionsLabTools.some((tool) => tool.id === polynomialsFractionsLabToolForTopic[topic]), topic)
    assert.equal(new Set(polynomialsFractionsLabChallengeIds).size, polynomialsFractionsLabChallengeIds.length)
    for (const borrowed of [areaChallenges, identityChallenges, ruffiniChallenges, rootsChallenges]) assert.ok(borrowed.every((challenge) => polynomialsFractionsLabChallengeIds.includes(challenge.id)))
    for (const challenges of [binomialChallenges, parameterChallenges, quadraticChallenges, gcdChallenges, domainChallenges, simplifyChallenges, commonChallenges, tapsChallenges] as Array<Array<{ id: number; prompt: Record<string, string>; hint: Record<string, string> }>>) {
        for (const challenge of challenges) {
            assert.ok(challenge.id >= 63000 && challenge.id < 64000, `${challenge.id}`)
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

test('polinomioak 4. DBH ak lab: Tartaglia', () => {
    assert.equal(binomialCoefficient({ n: 4, b: -2 }, 2), 24)
    assert.equal(binomialSum({ n: 3, b: 3 }), 64)
    // b never stays at 0
    assert.equal(setBinomial({ n: 2, b: 1 }, { b: 0 }).b, -1)
    assert.equal(setBinomial({ n: 2, b: -1 }, { b: 0 }).b, 1)
    const solutions: BinomialState[] = [{ n: 4, b: -2 }, { n: 4, b: 2 }, { n: 5, b: -1 }, { n: 6, b: 1 }]
    checkChallenges(binomialChallenges, solutions, initialBinomialState)
})

test('polinomioak 4. DBH ak lab: the remainder with a parameter', () => {
    // 7x³ − 5mx − 2 : (x + 1) leaves 5m − 9
    assert.deepEqual(remainderInM({ family: 0, a: -1 }), [5, -9])
    assert.equal(parameterRemainder({ family: 1, m: 4, a: 2 }), 0)
    const solutions: ParameterState[] = [{ family: 0, m: 1, a: -1 }, { family: 1, m: 4, a: 2 }, { family: 2, m: 2, a: -3 }, { family: 1, m: 4, a: 1 }]
    checkChallenges(parameterChallenges, solutions, initialParameterState)
})

test('polinomioak 4. DBH ak lab: factorising ax² + bx + c', () => {
    assert.equal(quadraticFactors({ a: 3, b: 2, c: -8 }).latex, '(x+2)(3x-4)')
    assert.equal(quadraticFactors({ a: 6, b: -1, c: -2 }).latex, '(2x+1)(3x-2)')
    assert.equal(quadraticFactors({ a: 2, b: 2, c: 0 }).latex, '2x(x+1)')
    assert.equal(quadraticFactors({ a: 4, b: -4, c: 1 }).latex, '(2x-1)^{2}')
    assert.equal(quadraticFactors({ a: 1, b: 0, c: 0 }).latex, 'x^{2}')
    assert.equal(quadraticFactors({ a: 1, b: 1, c: 1 }).kind, 'irreducible')
    assert.equal(quadraticFactors({ a: 1, b: 0, c: -2 }).kind, 'irrational')
    // Every factorisation expands back to the polynomial
    for (let a = 1; a <= 6; a += 1) for (let b = -9; b <= 9; b += 1) for (let c = -9; c <= 9; c += 1) {
        const { roots } = quadraticFactors({ a, b, c })
        for (const root of roots) assert.equal(a * root.numerator ** 2 + b * root.numerator * root.denominator + c * root.denominator ** 2, 0, `${a} ${b} ${c}`)
    }
    const solutions: QuadraticState[] = [{ a: 3, b: 2, c: -8 }, { a: 1, b: 2, c: 1 }, { a: 1, b: 1, c: 1 }, { a: 2, b: 5, c: -3 }]
    checkChallenges(quadraticChallenges, solutions, initialQuadraticState)
})

test('polinomioak 4. DBH ak lab: m.c.d. and m.c.m.', () => {
    assert.deepEqual(expandFactors([1, 0, 0, 1]), [1, 2, 0])
    assert.equal(factorsLatex([2, 1, 0, 0]), 'x^{2}(x-1)')
    assert.equal(factorsLatex([0, 0, 1, 0]), 'x+1')
    assert.equal(factorsLatex([0, 0, 0, 0]), '1')
    const solutions: GcdState[] = [
        { p: [1, 0, 0, 0], q: [1, 1, 0, 0] },
        { p: [1, 1, 0, 0], q: [0, 0, 1, 1] },
        { p: [2, 1, 0, 0], q: [1, 1, 1, 0] },
        { p: [2, 1, 0, 0], q: [1, 1, 1, 1] }
    ]
    checkChallenges(gcdChallenges, solutions, initialGcdState)
})

test('polinomioak 4. DBH ak lab: the value of a fraction', () => {
    assert.deepEqual(domainHoles(0), [-2, 2])
    assert.deepEqual(domainHoles(3), [0, 1])
    assert.deepEqual(domainValue({ fraction: 0, x: 3 }), { numerator: 4, denominator: 5 })
    const solutions: DomainState[] = [{ fraction: 0, x: 2 }, { fraction: 0, x: -1 }, { fraction: 2, x: 5 }, { fraction: 1, x: -2 }]
    checkChallenges(domainChallenges, solutions, initialDomainState)
})

test('polinomioak 4. DBH ak lab: simplifying', () => {
    // Degree 4 at most
    assert.deepEqual(setSimplify({ numerator: [2, 2, 0, 0], denominator: [0, 0, 0, 0] }, 'numerator', 2, 1).numerator, [2, 2, 0, 0])
    assert.deepEqual(simplified({ numerator: [0, 1, 1, 0], denominator: [0, 0, 1, 0] }), { numerator: [0, 1, 0, 0], denominator: [0, 0, 0, 0] })
    const solutions: SimplifyState[] = [
        { numerator: [0, 1, 1, 0], denominator: [0, 0, 1, 0] },
        { numerator: [2, 0, 0, 0], denominator: [1, 0, 0, 0] },
        { numerator: [1, 1, 0, 0], denominator: [0, 0, 1, 1] },
        { numerator: [1, 1, 0, 0], denominator: [1, 1, 0, 1] }
    ]
    checkChallenges(simplifyChallenges, solutions, initialSimplifyState)
})

test('polinomioak 4. DBH ak lab: the common denominator', () => {
    // 2/x + 1/(x + 1) = (3x + 2)/(x(x + 1)), checked at x = 3
    const sum = commonSum({ first: 0, second: 1, k1: 2, k2: 1 })
    assert.equal(evaluate(sum.numerator, 3) / evaluate(expandFactors(sum.lcm), 3), 2 / 3 + 1 / 4)
    const solutions: CommonState[] = [
        { first: 0, second: 1, k1: 2, k2: 1 },
        { first: 2, second: 1, k1: 1, k2: -1 },
        { first: 3, second: 2, k1: 1, k2: 1 },
        { first: 0, second: 2, k1: 2, k2: -1 }
    ]
    checkChallenges(commonChallenges, solutions, initialCommonState)
})

test('polinomioak 4. DBH ak lab: two taps', () => {
    assert.deepEqual(tapsTogether({ a: 6, b: 3 }), { numerator: 2, denominator: 1 })
    const solutions: TapsState[] = [{ a: 8, b: 8 }, { a: 18, b: 36 }, { a: 6, b: 3 }, { a: 12, b: 6 }]
    checkChallenges(tapsChallenges, solutions, initialTapsState)
})
