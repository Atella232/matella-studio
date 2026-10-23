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
    sumParts,
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

test('zatikiak balance: size alone does not give the answer away', () => {
    for (const level of [0, 1, 2] as BalanceLevel[]) {
        const ranks = new Map<number, number>()
        let singles = 0
        for (let seed = 1; seed <= 300; seed += 1) {
            for (const round of createBalanceRounds(createRandom(seed * 131 + level), level)) {
                const order = round.tray.map((_, index) => index).sort((a, b) => compare(round.tray[a], round.tray[b]))
                assert.ok(!round.solution.includes(order[order.length - 1]), 'the right weight is never the heaviest')
                if (round.solution.length === 1) {
                    singles += 1
                    const rank = order.indexOf(round.solution[0])
                    ranks.set(rank, (ranks.get(rank) ?? 0) + 1)
                    assert.ok(rank > 0, 'nor the lightest')
                }
                // Two pieces never just repeat the loaded weights
                if (level === 1 && round.solution.length === 2) {
                    assert.ok(!round.solution.every((index) => round.left.some((weight) => equals(weight, round.tray[index]))))
                }
                // Every weight is a tidy fraction
                assert.ok(round.tray.every((value) => fraction(value.numerator, value.denominator).denominator <= 24))
            }
        }
        // No single place in the order wins half the time
        for (const count of ranks.values()) assert.ok(count < singles * 0.5, `level ${level}: ${[...ranks]}`)
    }
})

test('zatikiak balance: the first rounds of each level are the easier ones', () => {
    for (let seed = 1; seed <= 100; seed += 1) {
        const rounds = createBalanceRounds(createRandom(seed), 0)
        for (const round of rounds.slice(0, 3)) {
            assert.equal(round.solution.length, 2, 'two pieces at first')
            assert.ok(round.tray.every((value) => 10 % fraction(value.numerator, value.denominator).denominator === 0 || 8 % fraction(value.numerator, value.denominator).denominator === 0 || 6 % fraction(value.numerator, value.denominator).denominator === 0))
        }
    }
})

test('zatikiak balance: weighing, points and stars', () => {
    const round: BalanceRound = { left: [fraction(1, 3), fraction(1, 4)], right: [], tray: [fraction(1, 2), fraction(1, 12), fraction(2, 7)], solution: [0, 1] }
    assert.equal(weigh(round, [2]), 'lighter')
    assert.equal(weigh(round, [0, 2]), 'heavier')
    assert.equal(weigh(round, [0, 1]), 'balanced')
    assert.deepEqual([1, 2, 3, 4].map(balancePoints), [3, 2, 1, 0])
    assert.equal(BALANCE_MAX_SCORE, 18)
    assert.deepEqual([18, 16, 15, 12, 11, 9, 8].map(balanceStars), [3, 3, 2, 2, 1, 1, 0])
    assert.equal(sumLatex([fraction(1, 3), fraction(1, 4)]), '\\frac{1}{3}+\\frac{1}{4}=\\frac{4}{12}+\\frac{3}{12}=\\frac{7}{12}')
    assert.equal(sumLatex([fraction(1, 2), fraction(1, 6)]), '\\frac{1}{2}+\\frac{1}{6}=\\frac{3}{6}+\\frac{1}{6}=\\frac{4}{6}=\\frac{2}{3}')
    assert.equal(sumLatex([fraction(3, 4)]), '\\frac{3}{4}')
    assert.equal(sumLatex([fraction(3, 4)], 8), '\\frac{3}{4}=\\frac{6}{8}', 'one weight, rewritten over the common denominator')
    assert.deepEqual(sumParts([fraction(1, 2), fraction(1, 4)], 8), ['\\frac{1}{2}+\\frac{1}{4}', '\\frac{4}{8}+\\frac{2}{8}', '\\frac{6}{8}', '\\frac{3}{4}'])
})

test('zatikiak balance: listed with three levels and reachable by its address', () => {
    const balance = games.find((item) => item.id === 'balance')
    assert.ok(balance)
    assert.deepEqual(balance.levels.map((item) => item.progressId), [1301, 1302, 1303])
    assert.equal(gameSlugs.balance, 'balantza')
    assert.equal(gameModeForPath('/matematika/dbh2/zatikiak/juegos/balanza'), 'balance')
    assert.equal(gameModeForPath('/matematika/dbh2/zatikiak/jokuak/balantza'), 'balance')
})
