import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import type { Tier } from '../src/features/unit-v2/games/raceCore.ts'
import { toNumber } from '../src/features/unit-v2/math/fraction.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { createBachStatsMemoryBoard, BACH_STATS_MEMORY_PAIRS, bachStatsMemoryLevels } from '../src/pages/batx1-zientziak-estatistika/games/boards.ts'
import { BACH_STATS_DETECTIVE_CASES, bachStatsDetectiveLevels, bachStatsDetectiveNames, bachStatsDetectiveTips, createBachStatsDetectiveCases } from '../src/pages/batx1-zientziak-estatistika/games/detective.ts'
import { bachStatsGameModeForPath, bachStatsGameProgressIds, bachStatsGames, bachStatsGameSlugs } from '../src/pages/batx1-zientziak-estatistika/games/info.ts'
import { BACH_STATS_RACE_CIRCUITS, bachStatsRaceErrorTips, checkBachStatsPitAnswer, generateBachStatsRaceQuestion } from '../src/pages/batx1-zientziak-estatistika/games/race.ts'
import { bestIndex, createStandoutRounds, rawBest, STANDOUT_ROUNDS, tenths, zNumber, zText } from '../src/pages/batx1-zientziak-estatistika/games/standout.ts'
import { chartCv, chartMean, chartSigma, createHistogramRounds, HISTOGRAM_ROUNDS, SHAPES } from '../src/pages/batx1-zientziak-estatistika/games/whichHistogram.ts'
import { evaluate, near } from './latex-math.ts'

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
        // No Basque suffix glued to a number or to a formula
        assert.ok(!/\d(?:ri|ren|rekin|ekin|ek|ak|ra|era|tik|z|ei|en|k|i)(?![a-zA-Z])/.test(text.eu.replace(/\$[^$]+\$/g, '')), text.eu)
        assert.ok(!/§(?:ri|ren|rekin|z|ra|tik|ei)(?![a-zA-Z])/.test(text.eu.replace(/\$[^$]+\$/g, '§')), text.eu)
        // MathText turns «:» into ÷ inside formulas
        for (const [, formula] of text.es.matchAll(/\$([^$]+)\$/g)) assert.ok(!formula.includes(':'), formula)
    }
}

/** Every equality of a worked line with numbers is right */
function checkWorked(latex: string, where: string) {
    let read = 0
    for (const part of latex.split(/\\qquad|\\quad|\\ \\to\\ |\\to|,\\ /)) {
        const values = part.split(/\\le|\\ge|\\neq|<|>|\\approx/)[0].split('=').map((side) => evaluate(side)).filter((value): value is number => value !== null)
        if (values.length < 2) continue
        assert.ok(values.every((value) => near(value, values[0])), `${where}: ${part} → ${values.join(' / ')}`)
        read += 1
    }
    return read
}

test('estatistika batx1 z games: the hub, its levels and progress ids', () => {
    assert.deepEqual(bachStatsGames.map((game) => game.id), ['race', 'standout', 'histogram', 'detective', 'memory', 'box'])
    assert.equal(new Set(bachStatsGameProgressIds).size, bachStatsGameProgressIds.length)
    // The unit's block of ids: games go from 114401 to 114899
    for (const id of bachStatsGameProgressIds) assert.ok(id >= 114401 && id <= 114899, `${id}`)
    const stages = ['data', 'centre', 'position', 'spread', 'interpretation']
    for (const game of bachStatsGames) {
        assert.ok(game.levels.length >= 3, game.id)
        for (const level of game.levels) {
            assert.ok(stages.includes(level.stage), `${game.id}: ${level.stage}`)
            // Titles and descriptions are drawn as plain text
            for (const language of languages) assert.ok(!level.description[language].includes('$') && !level.title[language].includes('$'), `${game.id} ${language}`)
        }
        checkTexts([game.title, game.tagline, game.skills, ...game.levels.flatMap((level) => [level.title, level.description])])
        assert.equal(bachStatsGameModeForPath(`/matematika/batx1-zientziak/estadistica/jokuak/${bachStatsGameSlugs[game.id]}`), game.id)
    }
    assert.equal(bachStatsGameModeForPath('/matematika/batx1-zientziak/estadistica/jokuak'), 'hub')
    assert.equal(bachStatsGameModeForPath('/matematika/batx1-zientziak/estadistica/juegos/quien-destaca'), 'standout')
})

test('estatistika batx1 z games: every race question has one right option, worked out from its numbers', () => {
    const kinds = new Set<string>()
    for (let circuit = 0; circuit < BACH_STATS_RACE_CIRCUITS; circuit += 1) {
        for (const tier of [0, 1, 2] as Tier[]) {
            for (let seed = 1; seed <= 60; seed += 1) {
                const question = generateBachStatsRaceQuestion(createRandom(seed * 7919 + circuit * 31 + tier), circuit, tier)
                kinds.add(question.kind)
                assert.equal(question.circuit, circuit)
                assert.equal(question.options.length, 4, question.kind)
                assert.equal(question.options.filter((option) => option.correct).length, 1, question.kind)
                assert.equal(new Set(question.options.map((option) => option.latex)).size, 4, `${question.kind}: ${question.options.map((option) => option.latex).join(' | ')}`)
                for (const option of question.options) render(option.latex)
                checkTexts([question.prompt, question.solution])
                const right = question.options.find((option) => option.correct)!
                assert.equal(checkBachStatsPitAnswer(question, right.latex.replace('{,}', ',')), 'correct', `${question.kind}: ${right.latex}`)
                for (const option of question.options.filter((item) => !item.correct)) assert.ok(option.error && bachStatsRaceErrorTips[option.error], question.kind)
                checkWorked(question.solution.es.replace(/\$/g, ''), question.kind)
                // The right answer, recomputed from the numbers of the question
                const m = question.meta
                const answer = toNumber(question.answer)
                const expected: Record<string, () => number> = {
                    relative: () => m.count / m.total,
                    cumulative: () => m.a + m.b + m.c,
                    sector: () => (360 * m.count) / m.total,
                    mean: () => m.sum / 5,
                    missing: () => 4 * m.mean - m.sum,
                    grouped: () => m.sum / m.total,
                    place: () => Math.ceil((m.total * m.k) / 100),
                    fence: () => m.q3 + 1.5 * (m.q3 - m.q1),
                    median: () => m.median,
                    square: () => m.sigma ** 2,
                    variance: () => m.d ** 2,
                    cv: () => m.sigma / m.mean,
                    score: () => (m.datum - m.mean) / m.sigma,
                    limit: () => m.mean + 3 * m.sigma,
                    transform: () => m.a * m.sigma
                }
                assert.ok(near(answer, expected[question.kind]()), `${question.kind}: ${answer}`)
            }
        }
    }
    assert.equal(kinds.size, 15)
})

test('estatistika batx1 z games: the median of the race agrees with both rules (odd N)', () => {
    for (let seed = 1; seed <= 200; seed += 1) {
        const question = generateBachStatsRaceQuestion(createRandom(seed * 104729 + 7), 2, 1)
        if (question.kind !== 'median') continue
        const m = question.meta
        const data = [m.a, m.b, m.c, m.d].flatMap((count, index) => Array.from({ length: count }, () => index + 1))
        assert.equal(data.length % 2, 1)
        assert.equal(data[(data.length - 1) / 2], m.median)
    }
})

test('estatistika batx1 z games: ¿quién destaca más?', () => {
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 40; seed += 1) {
            const rounds = createStandoutRounds(createRandom(seed * 31 + level), level)
            assert.equal(rounds.length, STANDOUT_ROUNDS)
            let traps = 0
            for (const round of rounds) {
                assert.equal(round.people.length, level === 2 ? 3 : 2)
                assert.equal(round.lowerBetter, level === 1)
                assert.equal(round.answer, bestIndex(round.people, round.lowerBetter))
                // The best z is clearly the best
                const scores = round.people.map(zNumber)
                for (const [index, score] of scores.entries()) if (index !== round.answer) assert.ok(Math.abs(score - scores[round.answer]) >= 0.25)
                if (rawBest(round.people, round.lowerBetter) !== round.answer) traps += 1
                for (const person of round.people) {
                    render(`x=${tenths(person.value)}\\qquad z=${zText(person)}`)
                    if (!round.lowerBetter) assert.ok(person.value >= 0 && person.value <= 100)
                }
            }
            assert.equal(traps, 4)
        }
    }
})

test('estatistika batx1 z games: ¿qué histograma?', () => {
    // The shapes: ten data each, symmetric, σ from tight to spread out
    for (const shape of SHAPES) assert.equal(shape.reduce((sum, count) => sum + count, 0), 10)
    assert.ok(near(chartSigma({ shape: 4, offset: 0 }) ** 2, 2))
    assert.equal(chartMean({ shape: 0, offset: 10 }), 13)
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 40; seed += 1) {
            const rounds = createHistogramRounds(createRandom(seed * 53 + level), level)
            assert.equal(rounds.length, HISTOGRAM_ROUNDS)
            for (const round of rounds) {
                assert.equal(round.charts.length, 3)
                const answer = round.charts[round.answer]
                if (round.question === 'max-sd') assert.ok(round.charts.every((chart) => chart === answer || chartSigma(chart) < chartSigma(answer) - 0.29))
                if (round.question === 'min-sd') assert.ok(round.charts.every((chart) => chart === answer || chartSigma(chart) > chartSigma(answer) + 0.29))
                if (round.question === 'max-cv') assert.ok(round.charts.every((chart) => chart === answer || chartCv(chart) < chartCv(answer) - 0.039))
                if (round.question === 'match') {
                    // Only the answer has both measures; the others share one of them
                    const both = round.charts.filter((chart) => near(chartMean(chart), chartMean(answer)) && near(chartSigma(chart), chartSigma(answer)))
                    assert.equal(both.length, 1)
                    assert.ok(round.charts.some((chart) => chart !== answer && near(chartMean(chart), chartMean(answer))))
                    assert.ok(round.charts.some((chart) => chart !== answer && near(chartSigma(chart), chartSigma(answer))))
                }
            }
        }
    }
})

test('estatistika batx1 z games: the detective has one wrong line, with a typical mistake', () => {
    assert.deepEqual(Object.keys(bachStatsDetectiveNames).sort(), bachStatsDetectiveLevels.flat().sort())
    checkTexts([...Object.values(bachStatsDetectiveNames), ...Object.values(bachStatsDetectiveTips)])
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 40; seed += 1) {
            const cases = createBachStatsDetectiveCases(createRandom(seed * 17 + level), level)
            assert.equal(cases.length, BACH_STATS_DETECTIVE_CASES)
            for (const item of cases) {
                assert.equal(item.lines.length, 3)
                assert.ok(item.wrong >= 0 && item.wrong < 3)
                assert.ok(item.options.includes(item.error) && item.options.length === 3)
                assert.ok(!near(item.right, item.reached))
                checkTexts([item.problem, ...item.lines.map((entry) => entry.label)])
                for (const entry of item.lines) render(entry.latex)
                render(item.fix)
                checkWorked(item.fix, item.error)
                // The lines before the wrong one are right
                for (const entry of item.lines.slice(0, item.wrong)) checkWorked(entry.latex, `${item.error} before the mistake`)
            }
        }
    }
})

test('estatistika batx1 z games: memory pairs have one partner each', () => {
    for (let level = 0; level < bachStatsMemoryLevels.length; level += 1) {
        for (let seed = 1; seed <= 40; seed += 1) {
            const cards = createBachStatsMemoryBoard(createRandom(seed * 11 + level), level)
            assert.equal(cards.length, 2 * BACH_STATS_MEMORY_PAIRS)
            assert.equal(new Set(cards.map((card) => card.latex)).size, cards.length)
            for (const card of cards) {
                render(card.latex)
                assert.ok(!card.latex.includes(':'), card.latex)
            }
            // The answer cards are right
            for (const card of cards.filter((item) => item.id.endsWith('-q'))) {
                const answer = cards.find((item) => item.setId === card.setId && item.id.endsWith('-a'))!
                const value = Number(answer.latex.split('=')[1].replace('{,}', '.'))
                const numbers = card.latex.replace(/\{,\}/g, '.').match(/-?\d+(?:\.\d+)?/g)!.map(Number)
                if (level === 0) assert.ok(near(value, numbers.reduce((sum, item) => sum + item, 0) / 3))
                if (level === 1) assert.ok(near(value, evaluate(card.latex.replace(/\{,\}/g, '.'))!), card.latex)
                if (level === 2) assert.ok(near(value, numbers[1] / numbers[0]))
            }
        }
    }
})
