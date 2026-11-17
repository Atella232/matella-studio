import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import type { Tier } from '../src/features/unit-v2/games/raceCore.ts'
import { toExactDecimal, toNumber } from '../src/features/unit-v2/math/fraction.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { written } from '../src/pages/batx1-zientziak-errealak/games/race.ts'
import { gizRealsGameModeForPath, gizRealsGameProgressIds, gizRealsGames, gizRealsGameSlugs } from '../src/pages/batx1-gizarte-errealak/games/info.ts'
import { checkGizRealsPitAnswer, generateGizRealsRaceQuestion, GIZ_REALS_RACE_CIRCUITS, gizRealsRaceErrorTips } from '../src/pages/batx1-gizarte-errealak/games/race.ts'
import { cardLatex, createOrderRounds, isRightOrder, ORDER_CARDS, ORDER_ROUNDS, rightOrder, scientificExponentOf, scientificLatex, valueOf } from '../src/pages/batx1-gizarte-errealak/games/order.ts'
import { createHeadlineRounds, HEADLINE_LIMITS, HEADLINE_ROUNDS, neededFigures, relativeError, rightOption, roundTo } from '../src/pages/batx1-gizarte-errealak/games/headline.ts'
import { createGizRealsDetectiveCases, GIZ_REALS_DETECTIVE_CASES, gizRealsDetectiveLevels, gizRealsDetectiveNames, gizRealsDetectiveTips } from '../src/pages/batx1-gizarte-errealak/games/detective.ts'
import { createGizRealsMemoryBoard, GIZ_REALS_MEMORY_PAIRS, gizRealsMemoryLevels } from '../src/pages/batx1-gizarte-errealak/games/boards.ts'

const languages = ['eu', 'es', 'en', 'ar'] as const
const render = (latex: string, language: (typeof languages)[number] = 'es') => katex.renderToString(formulaFor(language, latex), { throwOnError: true, strict: 'error' })
/** The value of a LaTeX number: 340\,000, 0{,}05 or 4{,}5\cdot 10^{-3} */
const valueOfLatex = (latex: string) => {
    const [mantissa, power = '{0}'] = latex.split('\\cdot 10^')
    return Number(mantissa.replace(/\\,/g, '').replace('{,}', '.')) * 10 ** Number(power.replace(/[{}]/g, ''))
}

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

test('errealak batx1 g games: the hub, its levels and progress ids', () => {
    assert.deepEqual(gizRealsGames.map((game) => game.id), ['race', 'order', 'headline', 'detective', 'memory', 'place', 'intervals', 'radical', 'log'])
    assert.equal(new Set(gizRealsGameProgressIds).size, gizRealsGameProgressIds.length)
    for (const id of gizRealsGameProgressIds) assert.ok(id >= 130401 && id <= 130899, `${id}`)
    const stages = ['numbers', 'line', 'radicals', 'logs', 'errors']
    for (const game of gizRealsGames) {
        assert.ok(game.levels.length >= 3, game.id)
        for (const level of game.levels) assert.ok(stages.includes(level.stage), `${game.id}: ${level.stage}`)
        checkTexts([game.title, game.tagline, game.skills, ...game.levels.flatMap((level) => [level.title, level.description])])
        assert.equal(gizRealsGameModeForPath(`/matematika/batx1-gizarte/numeros-reales/jokuak/${gizRealsGameSlugs[game.id]}`), game.id)
    }
    assert.equal(gizRealsGameModeForPath('/matematika/batx1-gizarte/numeros-reales/jokuak'), 'hub')
    // The race has a circuit for every stage of the unit
    assert.deepEqual(gizRealsGames[0].levels.map((level) => level.stage), stages)
})

test('errealak batx1 g games: every race question has one right option, worked out from its numbers', () => {
    const kinds = new Set<string>()
    for (let circuit = 0; circuit < GIZ_REALS_RACE_CIRCUITS; circuit += 1) {
        for (const tier of [0, 1, 2] as Tier[]) {
            for (let seed = 1; seed <= 60; seed += 1) {
                const question = generateGizRealsRaceQuestion(createRandom(seed * 7919 + circuit * 31 + tier), circuit, tier)
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
                assert.equal(checkGizRealsPitAnswer(question, typed), 'correct', `${question.kind}: ${typed}`)
                // The answer from the numbers of the question (the 1.º Ciencias kinds are checked by their own test)
                const { meta } = question
                const value = toNumber(question.answer)
                const expected: Record<string, () => number> = {
                    count: () => meta.b - meta.a,
                    rational: () => meta.count,
                    'root-power': () => meta.m / meta.n,
                    'root-product': () => 1 / meta.p + 1 / meta.q,
                    extract: () => Math.sqrt((meta.k * meta.k * meta.m) / meta.m),
                    rationalize: () => (meta.a * meta.b) / meta.b,
                    'log-value': () => meta.x,
                    'whole-part': () => Math.floor(Math.log(meta.n) / Math.log(meta.base) + 1e-12),
                    digits: () => String(2n ** BigInt(meta.n)).length,
                    scientific: () => Math.floor(Math.log10(meta.digits * 10 ** meta.shown) + 1e-12)
                }
                if (circuit === 1 || (circuit === 4 && expected[question.kind] === undefined)) continue
                assert.ok(expected[question.kind], `no check for ${question.kind}`)
                assert.ok(Math.abs(value - expected[question.kind]()) < 1e-9, `${question.kind}: ${value} ≠ ${expected[question.kind]()}`)
            }
        }
    }
    for (const kind of ['count', 'rational', 'root-power', 'root-product', 'extract', 'rationalize', 'log-value', 'whole-part', 'digits', 'scientific', 'distance', 'figures']) assert.ok(kinds.has(kind), kind)
    checkTexts(Object.values(gizRealsRaceErrorTips))
})

test('errealak batx1 g games: ordena la economía', () => {
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 80; seed += 1) {
            const rounds = createOrderRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, ORDER_ROUNDS)
            for (const round of rounds) {
                assert.equal(round.cards.length, ORDER_CARDS)
                // Every card shows its own value, and its scientific form is the same number with one digit before the point
                for (const card of round.cards) {
                    const shown = valueOfLatex(cardLatex(card))
                    assert.ok(Math.abs(shown - valueOf(card)) < 1e-9 * valueOf(card), `${cardLatex(card)} ≠ ${valueOf(card)}`)
                    const scientific = scientificLatex(card)
                    assert.ok(Math.abs(valueOfLatex(scientific) - valueOf(card)) < 1e-9 * valueOf(card), scientific)
                    assert.ok(/^\d(\{,\}\d+)?\\cdot 10\^\{-?\d+\}$/.test(scientific), scientific)
                    render(cardLatex(card))
                    checkTexts([card.label])
                    if (level === 0) assert.equal(card.shown, scientificExponentOf(card))
                    if (level === 2) assert.ok(valueOf(card) < 1)
                    else assert.ok(valueOf(card) > 1e6)
                }
                // The right order is increasing, the only one accepted, and no two figures are almost equal
                const order = rightOrder(round)
                assert.ok(isRightOrder(round, order))
                assert.ok(!isRightOrder(round, [...order].reverse()))
                for (let index = 1; index < order.length; index++) assert.ok(valueOf(round.cards[order[index]]) / valueOf(round.cards[order[index - 1]]) > 1.04)
                if (level > 0) assert.ok(round.cards.filter((card) => card.shown !== scientificExponentOf(card)).length >= 2)
            }
        }
    }
})

test('errealak batx1 g games: el titular justo', () => {
    assert.equal(roundTo(2847362, 1), 3000000)
    assert.equal(roundTo(2847362, 2), 2800000)
    assert.equal(roundTo(2847362, 3), 2850000)
    assert.equal(roundTo(2847362, 4), 2847000)
    assert.equal(neededFigures(2847362, 0.05), 2)
    assert.equal(neededFigures(2847362, 0.01), 3)
    const answers = new Set<number>()
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 80; seed += 1) {
            const rounds = createHeadlineRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, HEADLINE_ROUNDS)
            for (const round of rounds) {
                assert.equal(round.limit, HEADLINE_LIMITS[level])
                assert.deepEqual(round.options.map((option) => option.figures).sort(), [1, 2, 3, 4])
                assert.equal(new Set(round.options.map((option) => option.value)).size, 4)
                const right = round.options[rightOption(round)]
                answers.add(right.figures)
                // The chosen headline keeps under the limit, and every shorter one goes over it
                assert.ok(relativeError(round.exact, right.value) < round.limit)
                for (const option of round.options) if (option.figures < right.figures) assert.ok(relativeError(round.exact, option.value) >= round.limit)
                if (level > 0) assert.ok(right.figures > 1)
                checkTexts([round.label])
            }
        }
    }
    assert.ok(answers.size >= 3, `answers ${[...answers].join(', ')}`)
})

test('errealak batx1 g games: el detective de los reales', () => {
    for (const [level, errors] of gizRealsDetectiveLevels.entries()) {
        const seen = new Set<string>()
        for (let seed = 1; seed <= 40; seed += 1) {
            const cases = createGizRealsDetectiveCases(createRandom(seed * 7919 + level), level)
            assert.equal(cases.length, GIZ_REALS_DETECTIVE_CASES)
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
    checkTexts([...Object.values(gizRealsDetectiveNames), ...Object.values(gizRealsDetectiveTips)])
    // The digits of 2ⁿ worked with 0,301 are the true ones
    for (let seed = 1; seed <= 60; seed++) {
        for (const item of createGizRealsDetectiveCases(createRandom(seed), 1).filter((one) => one.error === 'digits-whole-part')) {
            const n = Number(item.problem.es.match(/2\^\{(\d+)\}/)![1])
            assert.equal(item.right, String(2n ** BigInt(n)).length)
        }
    }
})

test('errealak batx1 g games: memory boards have one partner per card', () => {
    for (const [level] of gizRealsMemoryLevels.entries()) {
        for (let seed = 1; seed <= 60; seed += 1) {
            const cards = createGizRealsMemoryBoard(createRandom(seed * 7919 + level), level)
            assert.equal(cards.length, GIZ_REALS_MEMORY_PAIRS * 2)
            const bySet = new Map<number, string[]>()
            for (const card of cards) {
                render(card.latex)
                bySet.set(card.setId, [...(bySet.get(card.setId) ?? []), card.latex])
            }
            assert.equal(bySet.size, GIZ_REALS_MEMORY_PAIRS)
            assert.equal(new Set(cards.map((card) => card.latex)).size, cards.length)
            // A number and its scientific notation are the same number
            if (level === 2) for (const [question, answer] of bySet.values()) assert.ok(Math.abs(valueOfLatex(question) - valueOfLatex(answer)) < 1e-12 * Math.max(1, valueOfLatex(answer)), `${question} ${answer}`)
        }
    }
})
