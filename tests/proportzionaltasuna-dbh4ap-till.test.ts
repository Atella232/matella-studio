import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { evaluate } from './helpers/realsRaceCheck.ts'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import { localLatex } from '../src/features/unit-v2/games/gameHooks.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import {
    createTillRounds,
    euroText,
    isBack,
    productName,
    readCents,
    TILL_CUSTOMERS,
    TILL_PATIENCE,
    TILL_TRIES,
    tillAnswerText,
    tillLevels,
    tillPoints,
    tillQuestion,
    tillSlip,
    tillSlipText,
    tillStars,
    tillSteps,
    tillStickers,
    tillTagLabel,
    type TillRound,
    type TillSlip
} from '../src/pages/dbh4-aplikatuak-proportzionaltasuna/games/till.ts'

const renders = (latex: string) => katex.renderToString(latex, { throwOnError: true, strict: 'error' })

function checkText(text: LocalizedText, where: string) {
    for (const language of ['eu', 'es', 'en', 'ar'] as const) {
        const line = text[language]
        assert.ok(line.length > 0 && !line.includes('$'), `${where}: ${line}`)
        if (language === 'eu') assert.ok(!/\d-?(an|ean|ra|era|tik|etik|ko|eko|rekin|ekin|k|z)\b/.test(line), `${where}: ${line}`)
        if (language === 'ar') assert.ok(!/\d,\d/.test(line), `${where}: ${line}`)
    }
}

/** The price after each change, without rounding */
const after = (cents: number, changes: number[]) => changes.reduce((value, change) => (value * (100 + change)) / 100, cents)

/** The slips a round can show, worked out the long way */
function slips(round: TillRound): Array<[number, TillSlip]> {
    const sum = round.changes.reduce((total, change) => total + change, 0)
    if (isBack(round.kind)) {
        return [
            [after(round.shown, round.changes), 'multiplied'],
            ...(round.changes.length === 1 ? [[(round.shown * (100 - sum)) / 100, 'percent-of-final'] as [number, TillSlip]] : [[(round.shown * 100) / (100 + sum), 'added-percents'] as [number, TillSlip]])
        ]
    }
    if (round.changes.length === 2) return [[(round.shown * (100 + sum)) / 100, 'added-percents']]
    return [[(round.shown * Math.abs(sum)) / 100, 'part'], [(round.shown * (100 - sum)) / 100, 'wrong-way']]
}

test('proportzionaltasuna 4. DBH ap till: every amount is exact to the cent, and the working gives it', () => {
    tillLevels.forEach((kinds, level) => {
        const amounts = new Set<string>()
        for (let seed = 1; seed <= 150; seed += 1) {
            const rounds = createTillRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, TILL_CUSTOMERS)
            // The kinds of the level in equal numbers, and a different product for each customer
            for (const kind of kinds) assert.equal(rounds.filter((round) => round.kind === kind).length, TILL_CUSTOMERS / kinds.length)
            assert.equal(new Set(rounds.map((round) => round.product)).size, TILL_CUSTOMERS)
            for (const round of rounds) {
                const where = `level ${level}: ${JSON.stringify(round)}`
                assert.ok(Number.isInteger(round.shown) && Number.isInteger(round.answer) && round.answer > 0, where)
                // Forward, the answer is the price after the changes; back, the answer goes to the price shown
                if (isBack(round.kind)) {
                    assert.equal(after(round.answer, round.changes), round.shown, where)
                    assert.equal(round.answer % 100, 0, where)
                } else {
                    assert.equal(after(round.shown, round.changes), round.answer, where)
                    assert.equal(round.shown % 100, 0, where)
                }
                if (level === 0) assert.ok(round.shown % 500 === 0 && round.answer % 10 === 0, where)
                // Each line of the working holds, and the last value is the answer
                const steps = tillSteps(round)
                for (const step of steps) {
                    renders(step.latex)
                    assert.ok(!localLatex(step.latex, 'ar').includes('{,}'), where)
                    const [left, right] = step.latex.split('=').map(evaluate)
                    assert.ok(left !== null && Math.abs(left - right!) < 1e-9, `${where}: ${step.latex}`)
                    checkText(step.label, where)
                }
                assert.ok(Math.abs(evaluate(steps.at(-1)!.latex.split('=').at(-1)!)! - round.answer / 100) < 1e-9, where)
                // Typical slips are spotted, the answer is not one, and a near miss is not taken for one
                assert.equal(tillSlip(round, round.answer), null, where)
                for (const [value, slip] of slips(round)) {
                    if (Math.abs(value - round.answer) < 2) continue
                    assert.equal(tillSlip(round, Math.round(value)), slip, `${where}: ${value}`)
                    checkText(tillSlipText(round, slip), where)
                }
                const probe = round.answer + 37
                if (slips(round).every(([value]) => Math.abs(value - probe) > 1)) assert.equal(tillSlip(round, probe), null, where)
                for (const text of [productName(round), tillTagLabel(round), tillQuestion(round), tillAnswerText(round), ...tillStickers(round)]) checkText(text, where)
                assert.ok(tillAnswerText(round).es.includes(euroText(round.answer, 'es')), where)
                amounts.add(`${round.product}-${round.shown}-${round.changes.join()}`)
            }
        }
        assert.ok(amounts.size > 400, `level ${level}: only ${amounts.size} tags`)
    })
})

test('proportzionaltasuna 4. DBH ap till: reading the till, points and stars', () => {
    assert.equal(readCents('68'), 6800)
    assert.equal(readCents('48,4'), 4840)
    assert.equal(readCents('48.40'), 4840)
    assert.equal(readCents('48,'), 4800)
    for (const typed of ['', ',5', '1,234', '4,5,6', 'a']) assert.equal(readCents(typed), null, typed)
    assert.equal(euroText(4840, 'es'), '48,40\u00a0€')
    assert.equal(euroText(6800, 'ar'), '\u206668\u00a0€\u2069')
    assert.equal(TILL_TRIES, 2)
    assert.equal(TILL_PATIENCE.length, tillLevels.length)
    assert.equal(tillPoints(1, 1), 100)
    assert.equal(tillPoints(1, 0), 50)
    assert.equal(tillPoints(1, 0.5), 75)
    assert.equal(tillPoints(2, 1), 50)
    assert.equal(tillPoints(2, 0), 25)
    assert.equal(tillPoints(3, 1), 0)
    assert.equal(tillStars(800), 3)
    assert.equal(tillStars(600), 3)
    assert.equal(tillStars(599), 2)
    assert.equal(tillStars(450), 2)
    assert.equal(tillStars(300), 1)
    assert.equal(tillStars(299), 0)
})
