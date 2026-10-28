import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { evaluate } from './helpers/realsRaceCheck.ts'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import { localLatex } from '../src/features/unit-v2/games/gameHooks.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import {
    amountText,
    createMixRounds,
    MIX_ROUNDS,
    MIX_TRIES,
    mixAmounts,
    mixBalanceLatex,
    mixHeading,
    mixHint,
    mixLatex,
    mixLevels,
    mixPoints,
    mixSide,
    mixSolutionText,
    mixStars,
    mixTarget,
    mixTask,
    mixVerdict,
    settingMax,
    solutionSetting,
    valueText
} from '../src/pages/dbh4-aplikatuak-proportzionaltasuna/games/mixture.ts'

const renders = (latex: string) => katex.renderToString(latex, { throwOnError: true, strict: 'error' })

function checkText(text: LocalizedText, where: string) {
    for (const language of ['eu', 'es', 'ar'] as const) {
        const line = text[language]
        assert.equal(line.split('$').length % 2, 1, `${where}: ${line}`)
        for (const match of line.matchAll(/\$([^$]+)\$/g)) {
            renders(match[1])
            assert.ok(!/[؀-ۿ]/.test(match[1]), `${where}: ${match[1]}`)
            if (language === 'eu') assert.ok(!/^[a-zA-Z]/.test(line.slice((match.index ?? 0) + match[0].length)), `${where}: suffix after ${match[0]} in ${line}`)
        }
        if (language === 'eu') assert.ok(!/\d-?(an|ean|ra|era|tik|etik|ko|eko|rekin|ekin|k|z)\b/.test(line), `${where}: ${line}`)
        if (language === 'ar') assert.ok(!line.includes('{,}') && !/\d,\d/.test(line), `${where}: ${line}`)
    }
}

/** Each side of a = b = c (or a = b ≈ c) as a number */
const sides = (latex: string) => latex.split(/=|\\approx/).map(evaluate)

test('proportzionaltasuna 4. DBH ap mixture: one setting of the slider balances the seesaw, in whole kilos or grams', () => {
    mixLevels.forEach((level, levelIndex) => {
        const rounds = new Set<string>()
        for (let seed = 1; seed <= 150; seed += 1) {
            const game = createMixRounds(createRandom(seed * 7919 + levelIndex), levelIndex)
            assert.equal(game.length, MIX_ROUNDS)
            // The gold level: three whole bars and two to add to
            if (level.kinds.length > 1) assert.deepEqual(game.map((round) => round.kind).sort(), ['add', 'add', 'total', 'total', 'total'])
            for (const round of game) {
                const where = `level ${levelIndex}: ${JSON.stringify(round)}`
                assert.ok(level.kinds.includes(round.kind), where)
                assert.equal(round.product === 'gold', level.gold, where)
                const [low, high] = round.values
                assert.ok(low < round.target && round.target < high && round.target % 10 === 0, where)
                // The answer is inside the slider, and no other setting gives the target
                const answer = solutionSetting(round)
                assert.ok(answer > 0 && answer < settingMax(round), where)
                assert.deepEqual(mixAmounts(round, answer), round.solution, where)
                for (let setting = 0; setting <= settingMax(round); setting += 1) {
                    const amounts = mixAmounts(round, setting)
                    if (amounts[0] + amounts[1] === 0) continue
                    const side = mixSide(round, amounts)
                    assert.equal(side === 0, setting === answer, `${where}: ${setting}`)
                    // More of the dear product never makes it cheaper
                    if (setting > 0 && round.kind === 'total') assert.ok(side >= mixSide(round, mixAmounts(round, setting - 1)), where)
                }
                // Every try's working holds, and its verdict says the right thing
                for (const setting of [1, answer, settingMax(round) - 1]) {
                    const amounts = mixAmounts(round, setting)
                    if (amounts.includes(0)) continue
                    const latex = mixLatex(round, amounts)
                    renders(latex)
                    assert.ok(!localLatex(latex, 'ar').includes('{,}'), where)
                    const values = sides(latex)
                    // Rounded to the cent (to the thousandth for gold) after ≈
                    const rounding = round.product === 'gold' ? 0.0005 : 0.005
                    assert.ok(values.every((value) => value !== null && Math.abs(value - values[0]!) <= rounding + 1e-9), `${where}: ${latex}`)
                    const mean = (amounts[0] * low + amounts[1] * high) / (amounts[0] + amounts[1])
                    assert.ok(Math.abs(values[0]! - mean / (round.product === 'gold' ? 1000 : 100)) < 1e-9, where)
                    const verdict = mixVerdict(round, amounts)
                    assert.equal(verdict.right, setting === answer, where)
                    checkText(verdict.text, where)
                    checkText(mixHint(round, amounts), where)
                    for (const line of mixHint(round, amounts).es.matchAll(/\$([^$]+)\$/g)) {
                        const [left, right] = sides(line[1])
                        assert.ok(Math.abs(left! - right!) < 1e-9, `${where}: ${line[1]}`)
                    }
                }
                const balance = sides(mixBalanceLatex(round))
                assert.ok(Math.abs(balance[0]! - balance[1]!) < 1e-9, `${where}: ${mixBalanceLatex(round)}`)
                for (const text of [mixHeading(round), mixTarget(round), mixTask(round), mixSolutionText(round)]) checkText(text, where)
                // The numbers of the round are in the task
                assert.ok(mixTask(round).es.includes(amountText(round, round.amount, 'es')), where)
                if (round.kind === 'add') for (const value of round.values) assert.ok(mixTask(round).es.includes(valueText(round, value, 'es')), where)
                rounds.add(JSON.stringify(round))
            }
        }
        assert.ok(rounds.size > 300, `level ${levelIndex}: only ${rounds.size} rounds`)
    })
})

test('proportzionaltasuna 4. DBH ap mixture: texts, points and stars', () => {
    const coffee = createMixRounds(createRandom(11), 0)[0]
    assert.ok(valueText(coffee, 840, 'es') === '8,40 €/kg' && valueText(coffee, 840, 'ar') === '8.40 €/كغ' && valueText(coffee, 800, 'eu') === '8 €/kg')
    const gold = createMixRounds(createRandom(11), 2)[0]
    assert.ok(valueText(gold, 820, 'es') === '0,82' && valueText(gold, 820, 'ar') === '0.82' && valueText(gold, 1000, 'eu') === '1')
    assert.equal(valueText(gold, 2500 / 3, 'es'), '0,833')
    assert.equal(amountText(gold, 40, 'ar'), '40 غ')
    assert.deepEqual([1, 2, 3, 4].map(mixPoints), [3, 2, 1, 0])
    assert.equal(MIX_TRIES, 3)
    assert.equal(mixStars(13), 3)
    assert.equal(mixStars(12), 2)
    assert.equal(mixStars(10), 2)
    assert.equal(mixStars(6), 1)
    assert.equal(mixStars(5), 0)
})
