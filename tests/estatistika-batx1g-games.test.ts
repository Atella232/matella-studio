import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import type { Tier } from '../src/features/unit-v2/games/raceCore.ts'
import { toNumber } from '../src/features/unit-v2/math/fraction.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { createSocialStatsMemoryBoard, SOCIAL_STATS_MEMORY_PAIRS, socialStatsMemoryLevels } from '../src/pages/batx1-gizarte-estatistika/games/boards.ts'
import { createSocialStatsDetectiveCases, SOCIAL_STATS_DETECTIVE_CASES, socialStatsDetectiveLevels, socialStatsDetectiveNames, socialStatsDetectiveTips } from '../src/pages/batx1-gizarte-estatistika/games/detective.ts'
import { createHuntRounds, cumulativeOf, HUNT_ROUNDS, huntPercentile, huntPercentOf } from '../src/pages/batx1-gizarte-estatistika/games/hunt.ts'
import { socialStatsGameModeForPath, socialStatsGameProgressIds, socialStatsGames, socialStatsGameSlugs } from '../src/pages/batx1-gizarte-estatistika/games/info.ts'
import { acceptedCount, createQualityRounds, faultyCount, QUALITY_ROUNDS, qualityAnswer, qualityTotal } from '../src/pages/batx1-gizarte-estatistika/games/quality.ts'
import { checkSocialStatsPitAnswer, generateSocialStatsRaceQuestion, SOCIAL_STATS_RACE_CIRCUITS, socialStatsRaceErrorTips } from '../src/pages/batx1-gizarte-estatistika/games/race.ts'
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
        for (const language of ['eu', 'es', 'en'] as const) assert.ok(!/[؀-ۿ]/.test(text[language]), text[language])
        // No Basque suffix glued to a number or to a formula
        assert.ok(!/\d(?:ri|ren|rekin|ekin|ek|ak|ra|era|tik|z|ei|en|k|i)(?![a-zA-Z])/.test(text.eu.replace(/\$[^$]+\$/g, '')), text.eu)
        assert.ok(!/§(?:ri|ren|rekin|z|ra|tik|ei)(?![a-zA-Z])/.test(text.eu.replace(/\$[^$]+\$/g, '§')), text.eu)
        // MathText turns «:» into ÷ inside formulas
        for (const [, formula] of text.es.matchAll(/\$([^$]+)\$/g)) assert.ok(!formula.includes(':'), formula)
        // Decimals in the words: a comma in Basque and Spanish, a point in English; English groups four digits
        const words = (value: string) => value.replace(/\$[^$]+\$/g, ' ')
        assert.ok(!/\d\.\d/.test(words(text.es)) && !/\d\.\d/.test(words(text.eu)), text.es)
        assert.ok(!/(?<![\d.,])\d{4,}(?![\d])/.test(words(text.en)), text.en)
    }
}

/** Every equality of a worked line with numbers is right */
function checkWorked(latex: string, where: string) {
    let read = 0
    // The evaluator does not read \frac with {,} inside: the decimal comma becomes a point first
    for (const part of latex.replace(/\{,\}/g, '.').split(/\\qquad|\\quad|\\ \\to\\ |\\to|,\\ /)) {
        const values = part.split(/\\le|\\ge|\\neq|<|>|\\approx|\\in/)[0].split('=').map((side) => evaluate(side)).filter((value): value is number => value !== null)
        if (values.length < 2) continue
        assert.ok(values.every((value) => near(value, values[0])), `${where}: ${part} → ${values.join(' / ')}`)
        read += 1
    }
    return read
}

test('estatistika batx1 g games: the hub, its levels and progress ids', () => {
    assert.deepEqual(socialStatsGames.map((game) => game.id), ['race', 'quality', 'hunt', 'detective', 'memory', 'histogram', 'box'])
    assert.equal(new Set(socialStatsGameProgressIds).size, socialStatsGameProgressIds.length)
    // The unit's block of ids: games go from 137401 to 137899
    for (const id of socialStatsGameProgressIds) assert.ok(id >= 137401 && id <= 137899, `${id}`)
    const stages = ['data', 'centre', 'position', 'spread', 'interpretation']
    for (const game of socialStatsGames) {
        assert.ok(game.levels.length >= 3, game.id)
        for (const level of game.levels) {
            assert.ok(stages.includes(level.stage), `${game.id}: ${level.stage}`)
            for (const language of languages) assert.ok(!level.description[language].includes('$') && !level.title[language].includes('$'), `${game.id} ${language}`)
        }
        checkTexts([game.title, game.tagline, game.skills, ...game.levels.flatMap((level) => [level.title, level.description])])
        assert.equal(socialStatsGameModeForPath(`/matematika/batx1-gizarte/estadistica/jokuak/${socialStatsGameSlugs[game.id]}`), game.id)
    }
    assert.equal(socialStatsGameModeForPath('/matematika/batx1-gizarte/estadistica/jokuak'), 'hub')
    assert.equal(socialStatsGameModeForPath('/matematika/batx1-gizarte/estadistica/juegos/calidad'), 'quality')
})

test('estatistika batx1 g games: every race question has one right option, worked out from its numbers', () => {
    const kinds = new Set<string>()
    for (let circuit = 0; circuit < SOCIAL_STATS_RACE_CIRCUITS; circuit += 1) {
        for (const tier of [0, 1, 2] as Tier[]) {
            for (let seed = 1; seed <= 60; seed += 1) {
                const question = generateSocialStatsRaceQuestion(createRandom(seed * 7919 + circuit * 31 + tier), circuit, tier)
                kinds.add(question.kind)
                assert.equal(question.circuit, circuit)
                assert.equal(question.options.length, 4, question.kind)
                assert.equal(question.options.filter((option) => option.correct).length, 1, question.kind)
                assert.equal(new Set(question.options.map((option) => option.latex)).size, 4, `${question.kind}: ${question.options.map((option) => option.latex).join(' | ')}`)
                for (const option of question.options) render(option.latex)
                checkTexts([question.prompt, question.solution])
                const right = question.options.find((option) => option.correct)!
                assert.equal(checkSocialStatsPitAnswer(question, right.latex.replace('{,}', ',')), 'correct', `${question.kind}: ${right.latex}`)
                for (const option of question.options.filter((item) => !item.correct)) assert.ok(option.error && socialStatsRaceErrorTips[option.error], question.kind)
                assert.ok(checkWorked(question.solution.es.replace(/\$/g, ''), question.kind) > 0 || question.kind === 'median', question.kind)
                // The right answer, recomputed from the numbers of the question
                const m = question.meta
                const answer = toNumber(question.answer)
                const expected: Record<string, () => number> = {
                    percent: () => (100 * m.count) / m.total,
                    cumulative: () => (100 * (m.a + m.b + m.c)) / (m.a + m.b + m.c + m.d),
                    height: () => m.count / m.width,
                    mean: () => m.sum / 5,
                    grouped: () => (m.p * (m.start + 5) + m.q * (m.start + 15)) / (m.p + m.q),
                    groups: () => (m.a * m.meanA + m.b * m.meanB) / (m.a + m.b),
                    percentile: () => m.from + ((m.k - m.before) / m.share) * m.width,
                    value: () => m.before + ((m.x - m.from) / m.width) * m.share,
                    median: () => m.median,
                    root: () => m.sigma,
                    variance: () => m.d ** 2,
                    cv: () => (100 * m.sigma) / m.mean,
                    quartile: () => m.total * m.share,
                    part: () => (m.count * (m.from + m.width - m.cut)) / m.width,
                    band: () => m.mean + m.sigma
                }
                assert.ok(near(answer, expected[question.kind]()), `${question.kind}: ${answer}`)
            }
        }
    }
    assert.equal(kinds.size, 15)
})

test('estatistika batx1 g games: control de calidad', () => {
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 60; seed += 1) {
            const rounds = createQualityRounds(createRandom(seed * 13 + level), level)
            assert.equal(rounds.length, QUALITY_ROUNDS)
            for (const round of rounds) {
                const total = qualityTotal(round)
                // The limits fall inside the second and fourth intervals
                assert.ok(round.low > round.start + round.width && round.low < round.start + 2 * round.width)
                assert.ok(round.high > round.start + 3 * round.width && round.high < round.start + 4 * round.width)
                if (level === 0) assert.ok(near(round.low, round.start + 1.5 * round.width) && near(round.high, round.start + 3.5 * round.width))
                assert.ok(Number.isInteger(acceptedCount(round)) && Number.isInteger(faultyCount(round)))
                assert.equal(round.percent, level === 2)
                if (round.percent) assert.ok([200, 400, 500].includes(total))
                // One right option and three different mistakes
                const answer = qualityAnswer(round)
                assert.equal(round.options.filter((option) => option.mistake === null).length, 1)
                assert.ok(near(round.options.find((option) => option.mistake === null)!.value, answer))
                assert.equal(new Set(round.options.map((option) => option.value)).size, 4)
                for (const option of round.options) assert.ok(Number.isInteger(option.value * 10))
            }
        }
    }
})

test('estatistika batx1 g games: caza el percentil', () => {
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 60; seed += 1) {
            const rounds = createHuntRounds(createRandom(seed * 29 + level), level)
            assert.equal(rounds.length, HUNT_ROUNDS)
            for (const round of rounds) {
                assert.equal(round.percents.reduce((sum, value) => sum + value, 0), 100)
                assert.equal(cumulativeOf(round.percents).at(-1), 100)
                assert.equal(round.kind, (['percentile', 'value', 'between'] as const)[level])
                const answer = round.kind === 'percentile'
                    ? huntPercentile(round.start, round.width, round.percents, round.k!).value
                    : round.kind === 'value'
                        ? huntPercentOf(round.start, round.width, round.percents, round.x!).value
                        : huntPercentOf(round.start, round.width, round.percents, round.pair![1]).value - huntPercentOf(round.start, round.width, round.percents, round.pair![0]).value
                assert.ok(near(answer, round.answer))
                assert.equal(round.options.filter((option) => option.mistake === null).length, 1)
                assert.ok(near(round.options.find((option) => option.mistake === null)!.value, answer))
                assert.ok(round.options.length >= 3)
                assert.equal(new Set(round.options.map((option) => Math.round(option.value * 100))).size, round.options.length)
                for (const option of round.options) assert.ok(Number.isInteger(Math.round(option.value * 100)) && near(Math.round(option.value * 10) / 10, option.value))
                // P_k never on a point of the polygon: the answer is inside an interval
                if (round.kind === 'percentile') assert.ok(!cumulativeOf(round.percents).includes(round.k!))
            }
        }
    }
})

test('estatistika batx1 g games: the detective has one wrong line, with a typical mistake', () => {
    assert.deepEqual(Object.keys(socialStatsDetectiveNames).sort(), socialStatsDetectiveLevels.flat().sort())
    assert.deepEqual(Object.keys(socialStatsDetectiveTips).sort(), socialStatsDetectiveLevels.flat().sort())
    checkTexts([...Object.values(socialStatsDetectiveNames), ...Object.values(socialStatsDetectiveTips)])
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 40; seed += 1) {
            const cases = createSocialStatsDetectiveCases(createRandom(seed * 17 + level), level)
            assert.equal(cases.length, SOCIAL_STATS_DETECTIVE_CASES)
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

test('estatistika batx1 g games: memory pairs have one partner each', () => {
    for (let level = 0; level < socialStatsMemoryLevels.length; level += 1) {
        for (let seed = 1; seed <= 40; seed += 1) {
            const cards = createSocialStatsMemoryBoard(createRandom(seed * 11 + level), level)
            assert.equal(cards.length, 2 * SOCIAL_STATS_MEMORY_PAIRS)
            assert.equal(new Set(cards.map((card) => card.latex)).size, cards.length)
            for (const card of cards) {
                render(card.latex)
                assert.ok(!card.latex.includes(':'), card.latex)
            }
            for (const card of cards.filter((item) => item.id.endsWith('-q'))) {
                const answer = cards.find((item) => item.setId === card.setId && item.id.endsWith('-a'))!
                const value = Number(answer.latex.split('=').at(-1)!.replace('{,}', '.'))
                const numbers = card.latex.replace(/\{,\}/g, '.').match(/\d+(?:\.\d+)?/g)!.map(Number)
                if (level === 0) assert.ok(near(value, numbers[0] / numbers[1]), card.latex)
                if (level === 1) assert.ok(near(value, evaluate(card.latex)!), card.latex)
                if (level === 2) assert.ok(near(value, (numbers[0] * numbers[1] + numbers[2] * numbers[3]) / (numbers[0] + numbers[2])), card.latex)
            }
        }
    }
})
