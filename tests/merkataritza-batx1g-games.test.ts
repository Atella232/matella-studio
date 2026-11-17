import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import type { Tier } from '../src/features/unit-v2/games/raceCore.ts'
import { toExactDecimal, toNumber } from '../src/features/unit-v2/math/fraction.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { written } from '../src/pages/batx1-zientziak-errealak/games/race.ts'

import { gizMoneyGameModeForPath, gizMoneyGameProgressIds, gizMoneyGames, gizMoneyGameSlugs } from '../src/pages/batx1-gizarte-merkataritza/games/info.ts'
import { checkGizMoneyPitAnswer, generateGizMoneyRaceQuestion, GIZ_MONEY_RACE_CIRCUITS, gizMoneyRaceErrorTips } from '../src/pages/batx1-gizarte-merkataritza/games/race.ts'
import { betterOffer, createOfferRounds, OFFER_ROUNDS, offerTae } from '../src/pages/batx1-gizarte-merkataritza/games/offer.ts'
import { annuity, createGapRounds, GAPS_ROUNDS, gapRows, rightValue } from '../src/pages/batx1-gizarte-merkataritza/games/gaps.ts'
import { createGizMoneyDetectiveCases, GIZ_MONEY_DETECTIVE_CASES, gizMoneyDetectiveLevels, gizMoneyDetectiveNames, gizMoneyDetectiveTips } from '../src/pages/batx1-gizarte-merkataritza/games/detective.ts'
import { createGizMoneyMemoryBoard, GIZ_MONEY_MEMORY_PAIRS, gizMoneyMemoryLevels } from '../src/pages/batx1-gizarte-merkataritza/games/boards.ts'

const languages = ['eu', 'es', 'en', 'ar'] as const
const render = (latex: string, language: (typeof languages)[number] = 'es') => katex.renderToString(formulaFor(language, latex), { throwOnError: true, strict: 'error' })
function checkTexts(texts: LocalizedText[]) {
    for (const text of texts) {
        for (const language of languages) {
            assert.ok(text[language].length > 0)
            for (const [, formula] of text[language].matchAll(/\$([^$]+)\$/g)) render(formula, language)
        }
        assert.ok(!text.ar.includes('{,}'), text.ar)
        assert.ok(!/[؀-ۿ]/.test([...text.ar.matchAll(/\$([^$]+)\$/g)].map((match) => match[1]).join('')), text.ar)
        if (/[a-zA-Z]{4}/.test(text.es.replace(/\$[^$]+\$/g, ''))) assert.ok(/[؀-ۿ]/.test(text.ar), `not Arabic: ${text.ar}`)
        assert.ok(!/\d(?:ri|ren|rekin|ekin|ek|ak|ra|tik|z|ei|en|k)(?![a-zA-Z])/.test(text.eu.replace(/\$[^$]+\$/g, '')), text.eu)
        assert.ok(!/\$(?:ri|ren|rekin|z|ra|tik|ei|ko|an)(?![a-zA-Z])/.test(text.eu), text.eu)
    }
}

test('merkataritza batx1 g games: the hub, its levels and progress ids', () => {
    assert.deepEqual(gizMoneyGames.map((game) => game.id), ['race', 'offer', 'gaps', 'detective', 'memory', 'bank', 'till'])
    assert.equal(new Set(gizMoneyGameProgressIds).size, gizMoneyGameProgressIds.length)
    for (const id of gizMoneyGameProgressIds) assert.ok(id >= 131401 && id <= 131899, `${id}`)
    const stages = ['percent', 'interest', 'tae', 'savings', 'loans']
    for (const game of gizMoneyGames) {
        assert.ok(game.levels.length >= 3, game.id)
        for (const level of game.levels) assert.ok(stages.includes(level.stage), `${game.id}: ${level.stage}`)
        checkTexts([game.title, game.tagline, game.skills, ...game.levels.flatMap((level) => [level.title, level.description])])
        assert.equal(gizMoneyGameModeForPath(`/matematika/batx1-gizarte/aritmetica-mercantil/jokuak/${gizMoneyGameSlugs[game.id]}`), game.id)
    }
    assert.equal(gizMoneyGameModeForPath('/matematika/batx1-gizarte/aritmetica-mercantil/jokuak'), 'hub')
    assert.deepEqual(gizMoneyGames[0].levels.map((level) => level.stage), stages)
})

test('merkataritza batx1 g games: every race question has one right option, worked out from its numbers', () => {
    const kinds = new Set<string>()
    const annuityless = (value: number) => Math.round(value * 100) / 100
    for (let circuit = 0; circuit < GIZ_MONEY_RACE_CIRCUITS; circuit += 1) {
        for (const tier of [0, 1, 2] as Tier[]) {
            for (let seed = 1; seed <= 60; seed += 1) {
                const question = generateGizMoneyRaceQuestion(createRandom(seed * 7919 + circuit * 31 + tier), circuit, tier)
                kinds.add(question.kind)
                assert.equal(question.circuit, circuit)
                assert.equal(question.options.length, 4, question.kind)
                assert.equal(question.options.filter((option) => option.correct).length, 1, question.kind)
                assert.equal(new Set(question.options.map((option) => option.latex)).size, 4, `${question.kind}: ${question.options.map((option) => option.latex).join(' | ')}`)
                const right = question.options.find((option) => option.correct)!
                assert.equal(right.latex, written(question.answer), question.kind)
                for (const option of question.options) render(option.latex)
                checkTexts([question.prompt, question.solution])
                const typed = question.answer.denominator === 1 ? String(question.answer.numerator) : toExactDecimal(question.answer) ?? `${question.answer.numerator}/${question.answer.denominator}`
                assert.equal(checkGizMoneyPitAnswer(question, typed), 'correct', `${question.kind}: ${typed}`)
                const { meta } = question
                const value = toNumber(question.answer)
                const expected: Record<string, () => number> = {
                    chain: () => annuityless(meta.price * (1 + meta.up / 100) * (1 - meta.down / 100)),
                    initial: () => meta.before,
                    final: () => annuityless(meta.capital * (1 + meta.rate / 100) ** meta.years),
                    years: () => Math.ceil(Math.log(meta.goal) / Math.log(1 + meta.rate / 100)),
                    tae: () => annuityless(((1 + meta.rate / 100 / meta.periods) ** meta.periods - 1) * 100),
                    fee: () => annuityless(((1 + meta.rate / 100) / (1 - meta.fee / 100) - 1) * 100),
                    sum: () => (meta.first * (meta.ratio ** meta.terms - 1)) / (meta.ratio - 1),
                    term: () => annuityless(meta.capital * (1 + meta.rate / 100) ** meta.year),
                    interest: () => annuityless((meta.debt * meta.rate) / 100),
                    repaid: () => meta.payment - (meta.debt * meta.rate) / 100,
                    cancel: () => annuityless(meta.debt * (1 + meta.fee / 100))
                }
                assert.ok(expected[question.kind], `no check for ${question.kind}`)
                assert.ok(Math.abs(value - expected[question.kind]()) < 1e-9, `${question.kind}: ${value} ≠ ${expected[question.kind]()}`)
            }
        }
    }
    assert.equal(kinds.size, 11)
    checkTexts(Object.values(gizMoneyRaceErrorTips))
})

test('merkataritza batx1 g games: qué oferta es mejor', () => {
    assert.ok(Math.abs(offerTae({ rate: 6, periods: 12, fee: 0 }) - 6.1678) < 1e-3)
    assert.ok(Math.abs(offerTae({ rate: 8, periods: 1, fee: 2 }) - 10.204) < 1e-3)
    const kinds = new Set<string>()
    for (let level = 0; level < 3; level += 1) {
        const winners = new Set<number>()
        for (let seed = 1; seed <= 80; seed += 1) {
            const rounds = createOfferRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, OFFER_ROUNDS)
            for (const round of rounds) {
                kinds.add(round.kind)
                const [a, b] = round.offers.map(offerTae)
                assert.ok(Math.abs(a - b) >= 0.02)
                const best = betterOffer(round)
                winners.add(best)
                if (round.kind === 'deposit') assert.ok(offerTae(round.offers[best]) > offerTae(round.offers[1 - best]))
                else assert.ok(offerTae(round.offers[best]) < offerTae(round.offers[1 - best]))
                if (level === 0) assert.equal(round.offers[0].rate, round.offers[1].rate)
                if (level === 2) assert.ok(round.kind === 'loan' && round.offers.some((offer) => offer.fee > 0))
            }
        }
        // The better offer is sometimes A and sometimes B
        assert.equal(winners.size, 2, `level ${level}`)
    }
    assert.equal(kinds.size, 2)
    // On level 2 the higher interest does not always win
    let higherLoses = 0
    for (let seed = 1; seed <= 200; seed++) for (const round of createOfferRounds(createRandom(seed), 1)) {
        const higher = round.offers[0].rate > round.offers[1].rate ? 0 : 1
        if (betterOffer(round) !== higher) higherLoses++
    }
    assert.ok(higherLoses > 0)
})

test('merkataritza batx1 g games: la tabla con huecos', () => {
    assert.equal(annuity(10000, 5, 4), 2820.12)
    const rows = gapRows(4000, 5, 2, annuity(4000, 5, 2))
    assert.deepEqual(rows.map((row) => [row.interest, row.repaid]), [[200, 1951.22], [102.44, 2048.78]])
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 80; seed += 1) {
            const rounds = createGapRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, GAPS_ROUNDS)
            for (const round of rounds) {
                assert.equal(round.column, ['interest', 'repaid', 'left'][level])
                assert.equal(round.options.length, 3)
                assert.equal(new Set(round.options).size, 3)
                assert.equal(round.options.filter((option) => option === rightValue(round)).length, 1)
                // Every row adds up, to the cent, and the debt ends near zero
                for (const row of round.rows) {
                    assert.ok(Math.abs(row.interest + row.repaid - round.payment) < 0.011)
                    if (row.year < round.rows.length) assert.ok(Math.abs(row.debt - row.repaid - row.left) < 0.011)
                }
                const last = round.rows.at(-1)!
                assert.ok(Math.abs(last.debt - last.repaid) < 0.1, `${last.debt} ${last.repaid}`)
            }
        }
    }
})

test('merkataritza batx1 g games: el detective del dinero', () => {
    for (const [level, errors] of gizMoneyDetectiveLevels.entries()) {
        const seen = new Set<string>()
        for (let seed = 1; seed <= 40; seed += 1) {
            const cases = createGizMoneyDetectiveCases(createRandom(seed * 7919 + level), level)
            assert.equal(cases.length, GIZ_MONEY_DETECTIVE_CASES)
            for (const item of cases) {
                seen.add(item.error)
                assert.ok(errors.includes(item.error))
                assert.equal(item.lines.length, 3)
                assert.ok(item.wrong >= 0 && item.wrong < 3)
                assert.equal(item.options.length, 3)
                assert.ok(item.options.includes(item.error))
                assert.notEqual(item.right, item.reached)
                for (const line of item.lines) render(line.latex)
                render(item.fix)
                checkTexts([item.problem, ...item.lines.map((line) => line.label)])
            }
        }
        assert.equal(seen.size, errors.length, `level ${level}`)
    }
    checkTexts([...Object.values(gizMoneyDetectiveNames), ...Object.values(gizMoneyDetectiveTips)])
})

test('merkataritza batx1 g games: memory boards have one partner per card', () => {
    for (const [level] of gizMoneyMemoryLevels.entries()) {
        for (let seed = 1; seed <= 60; seed += 1) {
            const cards = createGizMoneyMemoryBoard(createRandom(seed * 7919 + level), level)
            assert.equal(cards.length, GIZ_MONEY_MEMORY_PAIRS * 2)
            const bySet = new Map<number, string[]>()
            for (const card of cards) {
                render(card.latex)
                bySet.set(card.setId, [...(bySet.get(card.setId) ?? []), card.latex])
            }
            assert.equal(bySet.size, GIZ_MONEY_MEMORY_PAIRS)
            assert.equal(new Set(cards.map((card) => card.latex)).size, cards.length)
        }
    }
})
