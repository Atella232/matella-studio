import test from 'node:test'
import assert from 'node:assert/strict'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import { add, compare, equals, fraction } from '../src/pages/dbh2-zatikiak-prototype/math/fraction.ts'
import { games } from '../src/pages/dbh2-zatikiak-prototype/games/records.ts'
import { gameModeForPath, gameSlugs } from '../src/pages/dbh2-zatikiak-prototype/routing.ts'
import {
    BALANCE_MAX_SCORE,
    BALANCE_ROUNDS,
    balancePoints,
    balanceStars,
    createBalanceRounds,
    leftWeight,
    rightWeight,
    sumLatex,
    weigh,
    type BalanceLevel,
    type BalanceRound
} from '../src/pages/dbh2-zatikiak-prototype/games/balance.ts'

const key = (value: { numerator: number; denominator: number }) => `${fraction(value.numerator, value.denominator).numerator}/${fraction(value.numerator, value.denominator).denominator}`

test('zatikiak balance: every round can be balanced with the tray', () => {
    for (const level of [0, 1, 2] as BalanceLevel[]) {
        for (let seed = 1; seed <= 200; seed += 1) {
            const rounds = createBalanceRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, BALANCE_ROUNDS)
            assert.equal(new Set(rounds.map((round) => [...round.left, ...round.right].map(key).join('+'))).size, BALANCE_ROUNDS, 'no repeated round')
            for (const round of rounds) {
                const label = `level ${level} seed ${seed}: ${round.left.map(key)} | ${round.right.map(key)} | ${round.tray.map(key)}`
                assert.equal(weigh(round, round.solution), 'balanced', label)
                assert.ok(round.solution.every((index) => index >= 0 && index < round.tray.length), label)
                assert.equal(new Set(round.solution).size, round.solution.length, label)
                assert.notEqual(weigh(round, []), 'balanced', `${label}: an empty pan must not balance`)
                assert.ok(round.tray.every((value) => value.numerator > 0 && value.denominator > 0), label)
                assert.equal(new Set(round.tray.map(key)).size, round.tray.length, `${label}: tray weights differ`)
                assert.equal(round.tray.length, level === 1 ? 6 : 5, label)
            }
        }
    }
})

test('zatikiak balance: each level asks for its own idea', () => {
    for (let seed = 1; seed <= 150; seed += 1) {
        const [equal] = createBalanceRounds(createRandom(seed), 0)
        assert.equal(equal.left.length, 1)
        assert.equal(equal.right.length, 0)
        assert.ok(equal.solution.length >= 1)
        assert.ok(compare(leftWeight(equal), fraction(3, 2)) <= 0)

        const [sum] = createBalanceRounds(createRandom(seed), 1)
        assert.equal(sum.left.length, 2)
        assert.notEqual(sum.left[0].denominator, sum.left[1].denominator, 'different denominators')
        // The typical wrong sum (adding across) never balances
        const across = fraction(sum.left[0].numerator + sum.left[1].numerator, sum.left[0].denominator + sum.left[1].denominator)
        assert.ok(!equals(across, leftWeight(sum)))

        const [missing] = createBalanceRounds(createRandom(seed), 2)
        assert.equal(missing.right.length, 1, 'the learner pan starts with a weight')
        assert.equal(weigh(missing, []), 'lighter')
        assert.ok(equals(add(rightWeight(missing, missing.solution), fraction(0)), leftWeight(missing)))
    }
})

test('zatikiak balance: weighing, points and stars', () => {
    const round: BalanceRound = { left: [fraction(1, 3), fraction(1, 4)], right: [], tray: [fraction(1, 2), fraction(1, 12), fraction(2, 7)], solution: [0, 1] }
    assert.equal(weigh(round, [2]), 'lighter')
    assert.equal(weigh(round, [0, 2]), 'heavier')
    assert.equal(weigh(round, [0, 1]), 'balanced')
    assert.deepEqual([1, 2, 3, 4].map(balancePoints), [3, 2, 1, 0])
    assert.equal(BALANCE_MAX_SCORE, 18)
    assert.deepEqual([18, 15, 14, 11, 10, 7, 6].map(balanceStars), [3, 3, 2, 2, 1, 1, 0])
    assert.equal(sumLatex([fraction(1, 3), fraction(1, 4)]), '\\frac{1}{3}+\\frac{1}{4}=\\frac{4}{12}+\\frac{3}{12}=\\frac{7}{12}')
    assert.equal(sumLatex([fraction(1, 2), fraction(1, 6)]), '\\frac{1}{2}+\\frac{1}{6}=\\frac{3}{6}+\\frac{1}{6}=\\frac{4}{6}=\\frac{2}{3}')
    assert.equal(sumLatex([fraction(3, 4)]), '\\frac{3}{4}')
})

test('zatikiak balance: listed with three levels and reachable by its address', () => {
    const balance = games.find((item) => item.id === 'balance')
    assert.ok(balance)
    assert.deepEqual(balance.levels.map((item) => item.progressId), [1301, 1302, 1303])
    assert.equal(gameSlugs.balance, 'balantza')
    assert.equal(gameModeForPath('/matematika/dbh2/zatikiak/juegos/balanza'), 'balance')
    assert.equal(gameModeForPath('/matematika/dbh2/zatikiak/jokuak/balantza'), 'balance')
})
