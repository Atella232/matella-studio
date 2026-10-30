import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { evaluate } from './helpers/realsRaceCheck.ts'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import { equals, toNumber } from '../src/features/unit-v2/math/fraction.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import {
    createTankRounds,
    sameChoice,
    TANK_ROUNDS,
    TANK_TRIES,
    tankChoices,
    tankHint,
    tankHours,
    tankLatex,
    tankLevels,
    tankPoints,
    tankRate,
    tankSolutionText,
    tankStars,
    tankTarget,
    tankVerdict
} from '../src/pages/dbh4-aplikatuak-proportzionaltasuna/games/tank.ts'

const renders = (latex: string) => katex.renderToString(latex, { throwOnError: true, strict: 'error' })

function checkText(text: LocalizedText, where: string) {
    for (const language of ['eu', 'es', 'en', 'ar'] as const) {
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

test('proportzionaltasuna 4. DBH ap tank: one combination fills the tank in the target time, a whole number of minutes', () => {
    tankLevels.forEach((level, levelIndex) => {
        const targets = new Set<string>()
        for (let seed = 1; seed <= 150; seed += 1) {
            const rounds = createTankRounds(createRandom(seed * 7919 + levelIndex), levelIndex)
            assert.equal(rounds.length, TANK_ROUNDS)
            // On the last level the drain is needed in three rounds and must stay shut in two
            assert.equal(rounds.filter((round) => round.solution.drain).length, level.drain ? 3 : 0)
            for (const round of rounds) {
                const where = `level ${levelIndex}: ${JSON.stringify(round)}`
                assert.equal(round.taps.length, level.taps, where)
                assert.equal(new Set(round.taps).size, level.taps, where)
                assert.deepEqual(round.taps, [...round.taps].sort((a, b) => a - b), where)
                assert.equal(round.drain > 0, level.drain, where)
                assert.ok(!round.taps.includes(round.drain), where)
                assert.ok(level.open.includes(round.solution.taps.filter(Boolean).length), where)
                const minutes = 60 * toNumber(round.target)
                assert.ok(Math.abs(minutes - Math.round(minutes)) < 1e-9 && minutes >= 30 && minutes <= 600, where)
                assert.ok(tankVerdict(round, round.solution).right, where)
                // Only the solution gives the target
                const hits = tankChoices(round).filter((choice) => equals(tankHours(round, choice) ?? round.target, round.target) && tankHours(round, choice) !== null)
                assert.equal(hits.length, 1, where)
                assert.ok(sameChoice(hits[0], round.solution), where)
                // Each choice: the sum of the parts of an hour holds, and its verdict has a text
                for (const choice of tankChoices(round)) {
                    const latex = tankLatex(round, choice)
                    renders(latex)
                    const sides = latex.split('=').map(evaluate)
                    assert.ok(sides.every((side) => Math.abs(side! - toNumber(tankRate(round, choice))) < 1e-9), `${where}: ${latex}`)
                    checkText(tankVerdict(round, choice).text, where)
                }
                checkText(tankHint(round), where)
                checkText(tankSolutionText(round), where)
                checkText(tankTarget(round), where)
                targets.add(`${round.taps.join()}-${round.drain}-${minutes}`)
            }
        }
        assert.ok(targets.size > 150, `level ${levelIndex}: only ${targets.size} rounds`)
    })
})

test('proportzionaltasuna 4. DBH ap tank: texts, points and stars', () => {
    const round = createTankRounds(createRandom(3), 2).find((item) => item.solution.drain)!
    assert.ok(tankSolutionText(round).es.endsWith('y el desagüe.'), tankSolutionText(round).es)
    assert.ok(tankSolutionText(round).ar.includes('والمصرف'), tankSolutionText(round).ar)
    assert.deepEqual([1, 2, 3, 4].map(tankPoints), [3, 2, 1, 0])
    assert.equal(TANK_TRIES, 3)
    assert.equal(tankStars(15), 3)
    assert.equal(tankStars(13), 3)
    assert.equal(tankStars(12), 2)
    assert.equal(tankStars(10), 2)
    assert.equal(tankStars(6), 1)
    assert.equal(tankStars(5), 0)
})
