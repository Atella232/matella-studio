import test from 'node:test'
import assert from 'node:assert/strict'
import { setMachine, setTiles } from '../src/pages/dbh1-aljebra-v2/lab/labTools.ts'
import {
    algebraLabChallengeIds,
    algebraLabToolForTopic,
    algebraLabTools,
    answerArea,
    answerIdentity,
    areaChallenges,
    areaProduct,
    factorChallenges,
    factorInside,
    factorPolynomials,
    greatestFactor,
    identityChallenges,
    identityMistake,
    identityTerms,
    identityValue,
    initialAreaState,
    initialFactorState,
    initialIdentityState,
    initialTilesState,
    MACHINE_LIMITS,
    machineChallenges,
    machineExpressions,
    setAreaModel,
    setFactor,
    setIdentity,
    tilesChallenges,
    type IdentityKind
} from '../src/pages/dbh2-aljebra-v2/lab/labTools.ts'
import { freshAnswer } from '../src/features/unit-v2/lab/types.ts'
import { algebraLabChallengeIds as dbh1LabIds } from '../src/pages/dbh1-aljebra-v2/lab/labTools.ts'

const topics = ['language', 'value', 'monomial', 'add-monomials', 'multiply-monomials', 'polynomial', 'add-polynomials', 'multiply-monomial', 'multiply-polynomials', 'square-sum', 'square-difference', 'sum-difference', 'common-factor', 'factor-identities', 'mental']
const solvedIds = <State>(challenges: Array<{ id: number; isSolved: (state: State) => boolean }>, state: State) => challenges.filter((challenge) => challenge.isSolved(state)).map((challenge) => challenge.id)

test('aljebra 2. DBH lab: tools, topics and challenge ids', () => {
    assert.equal(algebraLabTools.length, 5)
    for (const topic of topics) assert.ok(algebraLabToolForTopic[topic], topic)
    for (const tool of algebraLabTools) assert.ok(topics.includes(tool.lessonTopic), tool.id)
    assert.equal(new Set(algebraLabChallengeIds).size, 20)
    assert.ok(!algebraLabChallengeIds.some((id) => dbh1LabIds.includes(id)))
})

test('aljebra 2. DBH lab: the machine with this course polynomials', () => {
    // (x + 3)² and x² + 6x + 9 are the same polynomial
    for (let x = MACHINE_LIMITS.min; x <= MACHINE_LIMITS.max; x += 1) assert.equal(machineExpressions[2].value(x), machineExpressions[3].value(x))
    const at = (expression: number, x: number, answer: string) => ({ ...setMachine({ expression: 0, x: 0, ...freshAnswer }, { expression, x }, machineExpressions, MACHINE_LIMITS), answer, checked: true })
    assert.deepEqual(solvedIds(machineChallenges, at(0, -2, '15')), [26101])
    assert.deepEqual(solvedIds(machineChallenges, at(1, 2, '9')), [26102])
    assert.deepEqual(solvedIds(machineChallenges, at(2, -5, '4')), [26103])
    assert.deepEqual(solvedIds(machineChallenges, at(4, 10, '96')), [26104])
    assert.equal(setMachine({ expression: 0, x: 0, ...freshAnswer }, { expression: 9, x: -20 }, machineExpressions, MACHINE_LIMITS).expression, 4)
})

test('aljebra 2. DBH lab: tiles', () => {
    assert.deepEqual(solvedIds(tilesChallenges, initialTilesState), [26201])
    const subtraction = setTiles(setTiles({ ...initialTilesState, op: 'subtract' }, 'first', { squares: 5, bars: -2, units: -3 }), 'second', { squares: 4, bars: 3, units: -1 })
    assert.deepEqual(solvedIds(tilesChallenges, subtraction), [26202])
    const opposite = setTiles(setTiles(initialTilesState, 'first', { squares: 2, bars: -1, units: 3 }), 'second', { squares: -2, bars: 1, units: -3 })
    assert.deepEqual(solvedIds(tilesChallenges, opposite), [26203])
    const sum = setTiles(setTiles(initialTilesState, 'first', { squares: 3, bars: 2, units: -1 }), 'second', { squares: -2, bars: -1, units: 2 })
    assert.deepEqual(solvedIds(tilesChallenges, sum), [26204])
})

test('aljebra 2. DBH lab: area model', () => {
    assert.deepEqual(areaProduct({ a: 2, b: 3 }), [{ coefficient: 1, power: 2 }, { coefficient: 5, power: 1 }, { coefficient: 6, power: 0 }])
    assert.deepEqual(areaProduct({ a: 0, b: 0 }), [{ coefficient: 1, power: 2 }])
    let state = answerArea(initialAreaState, { answer: '5', checked: true })
    state = answerArea(setAreaModel(state, { a: 4, b: 1, ask: 'constant' }), { answer: '4', checked: true })
    state = answerArea(setAreaModel(state, { a: 3, b: 3, ask: 'middle' }), { answer: '6', checked: true })
    state = answerArea(setAreaModel(state, { a: 4, b: 3, ask: 'constant' }), { answer: '12', checked: true })
    assert.deepEqual(solvedIds(areaChallenges, state), [26301, 26302, 26303, 26304])
    assert.equal(answerArea(initialAreaState, { answer: '6', checked: true }).solved.length, 0)
    assert.equal(setAreaModel(initialAreaState, { a: 20 }).a, 6)
})

test('aljebra 2. DBH lab: identities with numbers', () => {
    for (const kind of ['sum', 'difference', 'product'] as IdentityKind[]) {
        for (let a = 1; a <= 12; a += 1) {
            for (let b = 1; b <= 12; b += 1) assert.equal(identityTerms({ kind, a, b }).reduce((sum, term) => sum + term, 0), identityValue({ kind, a, b }))
        }
    }
    assert.equal(identityMistake({ kind: 'sum', a: 2, b: 3 }), 13)
    assert.equal(identityMistake({ kind: 'product', a: 2, b: 3 }), null)
    let state = answerIdentity(setIdentity(initialIdentityState, { a: 20, b: 1 }), { answer: '441', checked: true })
    state = answerIdentity(setIdentity(state, { kind: 'difference' }), { answer: '361', checked: true })
    state = answerIdentity(setIdentity(state, { kind: 'product', b: 3 }), { answer: '391', checked: true })
    assert.deepEqual(solvedIds(identityChallenges, state), [26401, 26402, 26403])
    assert.deepEqual(solvedIds(identityChallenges, setIdentity(state, { kind: 'sum', a: 3, b: 4 })), [26401, 26402, 26403, 26404])
})

test('aljebra 2. DBH lab: common factor', () => {
    assert.deepEqual(factorPolynomials.map((polynomial) => greatestFactor(polynomial.terms)), [{ coefficient: 3, power: 0 }, { coefficient: 4, power: 1 }, { coefficient: 3, power: 1 }, { coefficient: 2, power: 1 }, { coefficient: 3, power: 2 }])
    assert.deepEqual(factorInside(factorPolynomials[2].terms, 3, 1), [{ coefficient: 2, power: 2 }, { coefficient: -3, power: 1 }, { coefficient: 1, power: 0 }])
    assert.equal(factorInside(factorPolynomials[0].terms, 2, 0), null)
    assert.equal(factorInside(factorPolynomials[0].terms, 3, 1), null)
    let state = setFactor(initialFactorState, { coefficient: 3 })
    assert.deepEqual(state.finished, [0])
    for (const [polynomial, coefficient, power] of [[1, 4, 1], [2, 3, 1], [3, 2, 1], [4, 3, 2]]) state = setFactor(setFactor(state, { polynomial }), { coefficient, power })
    assert.deepEqual(solvedIds(factorChallenges, state), [26501, 26502, 26503, 26504])
    // Changing polynomial starts again from 1
    const moved = setFactor({ ...initialFactorState, coefficient: 3 }, { polynomial: 1 })
    assert.equal(moved.coefficient, 1)
})
