import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { evaluate } from './helpers/realsRaceCheck.ts'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import { localLatex } from '../src/features/unit-v2/games/gameHooks.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import {
    BANK_ROUNDS,
    bankFinals,
    bankFormula,
    bankLesson,
    bankMargin,
    bankName,
    bankOfferTexts,
    bankPrompt,
    bankStars,
    createBankRounds,
    type BankRound
} from '../src/pages/dbh4-aplikatuak-proportzionaltasuna/games/bank.ts'
import { latexNumber, moneyText } from '../src/pages/dbh4-aplikatuak-proportzionaltasuna/games/numbers.ts'

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

/** Which kind of offer won: for level 2, whether it is the one paid most often */
function winner(round: BankRound, level: number) {
    const best = round.offers[round.best]
    if (level === 1) return best.periods === Math.max(...round.offers.map((offer) => offer.periods)) ? 'often' : 'rate'
    return best.simple ? 'simple' : best.periods === 1 ? 'annual' : 'often'
}

test('proportzionaltasuna 4. DBH ap bank: the best offer wins clearly and every kind of offer wins some rounds', () => {
    const expected = [['simple', 'annual'], ['often', 'rate'], ['simple', 'annual', 'often']]
    expected.forEach((kinds, level) => {
        const wins = new Map<string, number>()
        for (let seed = 1; seed <= 150; seed += 1) {
            const rounds = createBankRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, BANK_ROUNDS)
            for (const round of rounds) {
                const where = `level ${level}: ${JSON.stringify(round)}`
                assert.equal(round.offers.length, level === 0 ? 2 : 3, where)
                const finals = bankFinals(round)
                const others = finals.filter((_, index) => index !== round.best)
                assert.ok(others.every((final) => finals[round.best] - final >= bankMargin(round.capital)), where)
                // The offers are different, and the rates are sensible
                assert.equal(new Set(round.offers.map((offer) => JSON.stringify(offer))).size, round.offers.length, where)
                for (const offer of round.offers) assert.ok(offer.rate > 0 && offer.rate <= 12 && Math.abs(offer.rate * 10 - Math.round(offer.rate * 10)) < 1e-9, where)
                // The formula on the card gives the amount shown
                round.offers.forEach((offer, index) => {
                    const formula = bankFormula(round, offer)
                    renders(formula)
                    assert.ok(!localLatex(formula, 'ar').includes('{,}'), where)
                    // The checker does not take nested brackets, so the periodic index is worked out first
                    const flat = formula.replace(/\\left\(1\+\\frac\{([^{}]*(?:\{,\}[^{}]*)?)\}\{(\d+)\}\\right\)/, (_, rate: string, periods: string) => String(1 + Number(rate.replace('{,}', '.')) / Number(periods)))
                    assert.ok(Math.abs(evaluate(flat)! - finals[index]) < 1e-6 * finals[index], `${where}: ${formula}`)
                })
                wins.set(winner(round, level), (wins.get(winner(round, level)) ?? 0) + 1)
            }
        }
        for (const kind of kinds) assert.ok((wins.get(kind) ?? 0) > 150 * BANK_ROUNDS * 0.25, `level ${level}: ${kind} wins ${wins.get(kind) ?? 0} times`)
    })
})

test('proportzionaltasuna 4. DBH ap bank: texts', () => {
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 40; seed += 1) {
            for (const round of createBankRounds(createRandom(seed + 100 * level), level)) {
                checkText(bankPrompt(round), 'prompt')
                checkText(bankLesson(round), 'lesson')
                round.offers.forEach((offer, index) => {
                    checkText(bankName(index), 'name')
                    for (const text of bankOfferTexts(offer)) checkText(text, 'offer')
                })
            }
        }
    }
})

test('proportzionaltasuna 4. DBH ap bank: numbers and stars', () => {
    assert.equal(moneyText(4440.7311, 'es'), '4440,73')
    assert.equal(moneyText(4440.7311, 'ar'), '4440.73')
    assert.equal(moneyText(4500, 'eu'), '4500')
    assert.equal(moneyText(13488.5, 'es'), '13\u202f488,50')
    assert.equal(latexNumber(10609), '10\\,609')
    assert.equal(latexNumber(1.045), '1{,}045')
    assert.equal(latexNumber(-4), '-4')
    assert.equal(bankStars(6), 3)
    assert.equal(bankStars(5), 2)
    assert.equal(bankStars(4), 1)
    assert.equal(bankStars(3), 0)
})
