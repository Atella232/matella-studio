import test from 'node:test'
import assert from 'node:assert/strict'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import { gcd } from '../src/pages/dbh2-zatikiak-prototype/math/fraction.ts'
import {
    clearPrimes,
    initialPrimesState,
    pairAll,
    primeFactors,
    primesChallenges,
    primesExtra,
    primesSummary,
    setPrimesNumbers,
    tapFactor,
    type PrimesState
} from '../src/pages/dbh2-zatikiak-prototype/lab/primes.ts'

const isPrime = (n: number) => n > 1 && Array.from({ length: Math.floor(Math.sqrt(n)) - 1 }, (_, i) => i + 2).every((d) => n % d !== 0)
const lcm = (a: number, b: number) => (a * b) / gcd(a, b)
const solved = (state: PrimesState) => primesChallenges.filter((challenge) => challenge.isSolved(state)).map((challenge) => challenge.id)

test('zatikiak primes: factorisations', () => {
    assert.deepEqual(primeFactors(1), [])
    assert.deepEqual(primeFactors(84), [2, 2, 3, 7])
    assert.deepEqual(primeFactors(997), [997])
    for (let n = 2; n <= 999; n += 1) {
        const factors = primeFactors(n)
        assert.equal(factors.reduce((total, factor) => total * factor, 1), n)
        assert.ok(factors.every(isPrime) && factors.every((factor, index) => index === 0 || factor >= factors[index - 1]), `${n}`)
    }
})

test('zatikiak primes: crossing out every pair gives the gcd, the lcm and the irreducible fraction', () => {
    for (let numerator = 1; numerator <= 120; numerator += 7) {
        for (let denominator = 2; denominator <= 240; denominator += 11) {
            const summary = primesSummary(pairAll(setPrimesNumbers(initialPrimesState, { numerator, denominator })))
            const common = gcd(numerator, denominator)
            assert.ok(summary.complete, `${numerator}/${denominator}`)
            assert.equal(summary.divisor, common)
            assert.equal(summary.multiple, lcm(numerator, denominator))
            assert.equal(summary.leftTop.reduce((total, f) => total * f, 1), numerator / common)
            assert.equal(summary.leftBottom.reduce((total, f) => total * f, 1), denominator / common)
        }
    }
})

test('zatikiak primes: tapping tiles', () => {
    // 84/126: top 2 2 3 7, bottom 2 3 3 7
    let state = setPrimesNumbers(initialPrimesState, { numerator: 84, denominator: 126 })
    state = tapFactor(state, 'top', 0)
    assert.deepEqual(state.selected, { row: 'top', index: 0 })
    assert.equal(tapFactor(state, 'top', 0).selected, null, 'the same tile again deselects')
    assert.deepEqual(tapFactor(state, 'top', 2).selected, { row: 'top', index: 2 }, 'another tile of the same row is selected instead')
    // 2 above with 3 below: a mismatch, nothing crossed out
    const mismatch = tapFactor(state, 'bottom', 1)
    assert.ok(mismatch.mismatch && mismatch.pairs.length === 0 && mismatch.selected === null)
    // 2 above with 2 below: crossed out
    state = tapFactor(state, 'bottom', 0)
    assert.deepEqual(state.pairs, [[0, 0]])
    assert.equal(primesSummary(state).complete, false)
    // A crossed-out tile cannot be paired again; tapping it brings the pair back
    assert.deepEqual(tapFactor(state, 'bottom', 0).pairs, [])
    state = tapFactor(tapFactor(state, 'bottom', 3), 'top', 3)
    state = tapFactor(tapFactor(state, 'top', 2), 'bottom', 1)
    const summary = primesSummary(state)
    assert.ok(summary.complete)
    assert.deepEqual([summary.divisor, summary.multiple, summary.leftTop, summary.leftBottom], [42, 252, [2], [3]])
    assert.deepEqual(clearPrimes(state).pairs, [])
    assert.equal(tapFactor(state, 'top', 9), state, 'a tile that does not exist changes nothing')
    // New numbers start again and stay within the limits
    assert.deepEqual(setPrimesNumbers(state, { denominator: 5000 }), { numerator: 84, denominator: 999, pairs: [], selected: null, mismatch: false })
    assert.equal(setPrimesNumbers(state, { denominator: 1 }).denominator, 2)
})

test('zatikiak primes: challenges and endless practice', () => {
    const at = (numerator: number, denominator: number) => pairAll(setPrimesNumbers(initialPrimesState, { numerator, denominator }))
    assert.deepEqual(solved(initialPrimesState), [])
    assert.ok(solved(at(84, 126)).includes(1701))
    assert.ok(solved(at(90, 60)).includes(1702))
    assert.ok(solved(at(12, 18)).includes(1703))
    assert.ok(solved(at(30, 60)).includes(1704))
    // Half-done does not count
    assert.ok(!solved(tapFactor(tapFactor(setPrimesNumbers(initialPrimesState, { numerator: 84, denominator: 126 }), 'top', 0), 'bottom', 0)).includes(1701))
    for (let seed = 1; seed <= 300; seed += 1) {
        const challenge = primesExtra(createRandom(seed * 613))
        const { numerator, denominator } = challenge.solution
        assert.ok(challenge.isSolved(challenge.solution) && !challenge.isSolved(initialPrimesState), `${seed}`)
        assert.ok(numerator <= 999 && denominator <= 999 && gcd(numerator, denominator) > 1 && numerator !== denominator)
        for (const text of [...Object.values(challenge.prompt), ...Object.values(challenge.hint)]) assert.ok(text.length > 0)
    }
})
