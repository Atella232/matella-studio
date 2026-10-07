import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import {
    candidates,
    chooseRootsPolynomial,
    currentQuotient,
    deflate,
    evaluate,
    factorizationLatex,
    initialRootsState,
    initialRuffiniState,
    polynomialLatex,
    polynomialsLabChallengeIds,
    polynomialsLabToolForTopic,
    polynomialsLabTools,
    rootsChallenges,
    rootsFinished,
    rootsPolynomials,
    ruffiniChallenges,
    ruffiniFinish,
    ruffiniRemainder,
    ruffiniRows,
    ruffiniStep,
    setRuffini,
    tryCandidate,
    type RootsState
} from '../src/pages/dbh4-aplikatuak-polinomioak/lab/labTools.ts'

const topics = ['monomials', 'polynomial-value', 'language', 'add-subtract', 'multiply', 'identities', 'long-division', 'ruffini', 'remainder', 'roots', 'common-factor', 'factorize', 'algebraic-fractions', 'simplify', 'problems']
const stages = ['monomials', 'operations', 'division', 'factor', 'expressions']
const solvedIds = (challenges: Array<{ id: number; isSolved: (state: never) => boolean }>, state: unknown) => challenges.filter((challenge) => challenge.isSolved(state as never)).map((challenge) => challenge.id)
const all = (challenges: Array<{ id: number }>) => challenges.map((challenge) => challenge.id)
const solvedBy = (challenges: Array<{ id: number; isSolved: (state: never) => boolean }>, states: unknown[]) => [...new Set(states.flatMap((state) => solvedIds(challenges, state)))].sort()

test('polinomioak 4. DBH ap lab: tools, topics and challenge ids', () => {
    assert.equal(polynomialsLabTools.length, 7)
    for (const tool of polynomialsLabTools) {
        assert.ok(stages.includes(tool.stage), tool.id)
        assert.ok(topics.includes(tool.lessonTopic), tool.id)
        assert.ok(!tool.observe.es.includes('$'), tool.id)
    }
    for (const stage of stages.filter((stage) => stage !== 'expressions')) assert.ok(polynomialsLabTools.some((tool) => tool.stage === stage), stage)
    for (const topic of topics) assert.ok(polynomialsLabTools.some((tool) => tool.id === polynomialsLabToolForTopic[topic]), topic)
    assert.equal(new Set(polynomialsLabChallengeIds).size, polynomialsLabChallengeIds.length)
    for (const challenges of [ruffiniChallenges, rootsChallenges]) {
        for (const challenge of challenges) {
            for (const language of ['eu', 'es', 'ar'] as const) {
                for (const text of [challenge.prompt[language], challenge.hint[language]]) for (const [, formula] of text.matchAll(/\$([^$]+)\$/g)) katex.renderToString(formula, { throwOnError: true })
            }
        }
    }
})

test('polinomioak 4. DBH ap lab: polynomial helpers', () => {
    assert.equal(evaluate([1, -8, 15, 7, 8], 4), 20)
    assert.deepEqual(ruffiniRows([1, -7, 9, -3], 5), { products: [null, 5, -10, -5], bottom: [1, -2, -1, -8] })
    assert.deepEqual(deflate([1, -6, 11, -6], 1), [1, -5, 6])
    assert.equal(polynomialLatex([2, -7, 0, 1, -3]), '2x^{4}-7x^{3}+x-3')
    assert.equal(polynomialLatex([1, 0, 0, 0, 0, -32]), 'x^{5}-32')
    assert.deepEqual(candidates([1, 2, -8, 0]), [0])
    assert.deepEqual(candidates([1, -6, 11, -6]), [1, -1, 2, -2, 3, -3, 6, -6])
    // The remainder theorem holds for every polynomial and every a
    for (const coefficients of [[1, -7, 9, -3], [2, 7, 2, 4], [3, -5, -9, 3]]) for (let a = -6; a <= 6; a += 1) assert.equal(ruffiniRows(coefficients, a).bottom.at(-1), evaluate(coefficients, a))
})

test('polinomioak 4. DBH ap lab: the Ruffini table', () => {
    let state = initialRuffiniState
    assert.equal(ruffiniRemainder(state), null)
    state = ruffiniStep(ruffiniStep(ruffiniStep(state)))
    assert.equal(ruffiniRemainder(state), -8)
    // A new a starts again
    assert.equal(setRuffini(state, { a: 3 }).steps, 1)
    assert.equal(setRuffini(state, { a: 40 }).a, 6)
    const states = [
        state,
        ruffiniFinish(setRuffini(state, { polynomial: 1, a: -3 })),
        ruffiniFinish(setRuffini(state, { polynomial: 3, a: -2 })),
        ruffiniFinish(setRuffini(state, { polynomial: 4, a: 2 }))
    ]
    assert.deepEqual(solvedBy(ruffiniChallenges, states), all(ruffiniChallenges))
    assert.equal(ruffiniRemainder(states[1]), 7)
})

test('polinomioak 4. DBH ap lab: hunting for roots ends in the factorisation', () => {
    const tryAll = (state: RootsState, values: number[]) => values.reduce(tryCandidate, state)
    const first = tryAll(initialRootsState, [-1, 1, 2])
    assert.ok(rootsFinished(first))
    assert.equal(factorizationLatex(first), '(x-1)(x-2)(x-3)')
    const double = tryAll(chooseRootsPolynomial(initialRootsState, 3), [1, 1, 3])
    assert.equal(factorizationLatex(double), '(x-1)^{2}(x-3)(x+3)')
    const single = tryAll(chooseRootsPolynomial(initialRootsState, 4), [2, 1, -1])
    assert.ok(rootsFinished(single))
    assert.equal(factorizationLatex(single), '(x-2)(x^{2}+x+1)')
    const cube = tryAll(chooseRootsPolynomial(initialRootsState, 5), [-1, -1])
    assert.equal(factorizationLatex(cube), '(x+1)^{3}')
    assert.equal(factorizationLatex(tryAll(chooseRootsPolynomial(initialRootsState, 2), [0, 2])), 'x(x-2)(x+4)')
    assert.deepEqual(solvedBy(rootsChallenges, [first, double, single, cube]), all(rootsChallenges))
    // Every listed polynomial factors back into itself
    for (let polynomial = 0; polynomial < rootsPolynomials.length; polynomial += 1) {
        let state = chooseRootsPolynomial(initialRootsState, polynomial)
        for (let guard = 0; guard < 40 && !rootsFinished(state); guard += 1) state = tryCandidate(state, candidates(currentQuotient(state)).find((candidate) => !state.misses.includes(candidate))!)
        assert.ok(rootsFinished(state), `${polynomial}`)
        katex.renderToString(factorizationLatex(state), { throwOnError: true })
    }
})
