import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import type { Tier } from '../src/features/unit-v2/games/raceCore.ts'
import { toNumber } from '../src/features/unit-v2/math/fraction.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { pairStats } from '../src/pages/batx1-zientziak-bidimentsionala/bivariate.ts'
import { createSocialBivarMemoryBoard, SOCIAL_BIVAR_MEMORY_PAIRS, socialBivarMemoryLevels } from '../src/pages/batx1-gizarte-bidimentsionala/games/boards.ts'
import { createSocialBivarDetectiveCases, SOCIAL_BIVAR_DETECTIVE_CASES, socialBivarDetectiveLevels, socialBivarDetectiveNames, socialBivarDetectiveTips } from '../src/pages/batx1-gizarte-bidimentsionala/games/detective.ts'
import { socialBivarGameModeForPath, socialBivarGameProgressIds, socialBivarGames, socialBivarGameSlugs } from '../src/pages/batx1-gizarte-bidimentsionala/games/info.ts'
import { createPredictRounds, isReliable, PREDICT_ROUNDS } from '../src/pages/batx1-gizarte-bidimentsionala/games/predict.ts'
import { checkSocialBivarPitAnswer, generateSocialBivarRaceQuestion, SOCIAL_BIVAR_RACE_CIRCUITS, socialBivarRaceErrorTips } from '../src/pages/batx1-gizarte-bidimentsionala/games/race.ts'
import { createWhichRRounds, WHICH_R_ROUNDS } from '../src/pages/batx1-gizarte-bidimentsionala/games/whichR.ts'
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
        assert.ok(!/\d(?:ri|ren|rekin|ekin|ek|ak|ra|era|tik|z|ei|en|k|i)(?![a-zA-Z])/.test(text.eu.replace(/\$[^$]+\$/g, '')), text.eu)
        assert.ok(!/§(?:ri|ren|rekin|z|ra|tik|ei)(?![a-zA-Z])/.test(text.eu.replace(/\$[^$]+\$/g, '§')), text.eu)
        for (const [, formula] of text.es.matchAll(/\$([^$]+)\$/g)) assert.ok(!formula.includes(':'), formula)
        const words = (value: string) => value.replace(/\$[^$]+\$/g, ' ')
        assert.ok(!/\d\.\d/.test(words(text.es)) && !/\d\.\d/.test(words(text.eu)), text.es)
        assert.ok(!/(?<![\d.,])\d{4,}(?![\d])/.test(words(text.en)), text.en)
    }
}

/** Every equality of a worked line with numbers is right ({,} becomes a point: the evaluator does not read \frac with {,} inside) */
function checkWorked(latex: string, where: string) {
    let read = 0
    for (const part of latex.replace(/\{,\}/g, '.').split(/\\qquad|\\quad|\\ \\to\\ |\\to|,\\ /)) {
        const values = part.split(/\\le|\\ge|\\neq|<|>|\\approx|\\in/)[0].split('=').map((side) => evaluate(side)).filter((value): value is number => value !== null)
        if (values.length < 2) continue
        assert.ok(values.every((value) => near(value, values[0])), `${where}: ${part} → ${values.join(' / ')}`)
        read += 1
    }
    return read
}

test('bidimentsionala batx1 g games: the hub, its levels and progress ids', () => {
    assert.deepEqual(socialBivarGames.map((game) => game.id), ['race', 'which-r', 'predict', 'detective', 'memory', 'sign', 'cloud'])
    assert.equal(new Set(socialBivarGameProgressIds).size, socialBivarGameProgressIds.length)
    for (const id of socialBivarGameProgressIds) assert.ok(id >= 138401 && id <= 138899, `${id}`)
    const stages = ['cloud', 'parameters', 'regression', 'problems', 'tables']
    for (const game of socialBivarGames) {
        assert.ok(game.levels.length >= 3, game.id)
        for (const level of game.levels) {
            assert.ok(stages.includes(level.stage), `${game.id}: ${level.stage}`)
            for (const language of languages) assert.ok(!level.description[language].includes('$') && !level.title[language].includes('$'), `${game.id} ${language}`)
        }
        checkTexts([game.title, game.tagline, game.skills, ...game.levels.flatMap((level) => [level.title, level.description])])
        assert.equal(socialBivarGameModeForPath(`/matematika/batx1-gizarte/estadistica-bidimensional/jokuak/${socialBivarGameSlugs[game.id]}`), game.id)
    }
    assert.equal(socialBivarGameModeForPath('/matematika/batx1-gizarte/estadistica-bidimensional/jokuak'), 'hub')
})

test('bidimentsionala batx1 g games: every race question has one right option, worked out from its numbers', () => {
    const kinds = new Set<string>()
    for (let circuit = 0; circuit < SOCIAL_BIVAR_RACE_CIRCUITS; circuit += 1) {
        for (const tier of [0, 1, 2] as Tier[]) {
            for (let seed = 1; seed <= 60; seed += 1) {
                const question = generateSocialBivarRaceQuestion(createRandom(seed * 7919 + circuit * 31 + tier), circuit, tier)
                kinds.add(question.kind)
                assert.equal(question.options.length, 4, question.kind)
                assert.equal(question.options.filter((option) => option.correct).length, 1, question.kind)
                assert.equal(new Set(question.options.map((option) => option.latex)).size, 4, `${question.kind}: ${question.options.map((option) => option.latex).join(' | ')}`)
                for (const option of question.options) render(option.latex)
                checkTexts([question.prompt, question.solution])
                const right = question.options.find((option) => option.correct)!
                assert.equal(checkSocialBivarPitAnswer(question, right.latex.replace('{,}', ',')), 'correct', `${question.kind}: ${right.latex}`)
                for (const option of question.options.filter((item) => !item.correct)) assert.ok(option.error && socialBivarRaceErrorTips[option.error], question.kind)
                checkWorked(question.solution.es.replace(/\$/g, ''), question.kind)
                const m = question.meta
                const expected: Record<string, () => number> = {
                    centroid: () => (m.a + m.b + m.c) / 3,
                    product: () => (m.x - m.mx) * (m.y - m.my),
                    functional: () => Math.sign(m.slope),
                    covariance: () => m.sum / m.n - m.mx * m.my,
                    correlation: () => m.cov / (m.sx * m.sy),
                    units: () => m.r,
                    slope: () => m.cov / m.vx,
                    estimate: () => m.my + m.slope * (m.x - m.mx),
                    estimateX: () => m.mx + m.mxy * (m.y - m.my),
                    meanY: () => m.slope * m.mx + m.intercept,
                    square: () => m.a / m.b,
                    crossing: () => (m.second - m.first) / (m.a - m.b),
                    conditional: () => m.cell / m.row,
                    expected: () => (m.row * m.column) / m.total,
                    marginal: () => (m.a * 10 + m.b * 20 + m.c * 30) / (m.a + m.b + m.c)
                }
                assert.ok(near(toNumber(question.answer), expected[question.kind]()), `${question.kind}: ${toNumber(question.answer)}`)
            }
        }
    }
    assert.equal(kinds.size, 15)
})

test('bidimentsionala batx1 g games: ¿qué r le toca?', () => {
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 40; seed += 1) {
            const rounds = createWhichRRounds(createRandom(seed * 13 + level), level)
            assert.equal(rounds.length, WHICH_R_ROUNDS)
            for (const round of rounds) {
                assert.ok(near(pairStats(round.points).r, round.r), `${round.r}`)
                assert.equal(round.options.length, 3)
                assert.equal(new Set(round.options).size, 3)
                assert.equal(round.options.filter((option) => option === round.r).length, 1)
            }
        }
    }
})

test('bidimentsionala batx1 g games: predice con la recta', () => {
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 40; seed += 1) {
            const rounds = createPredictRounds(createRandom(seed * 29 + level), level)
            assert.equal(rounds.length, PREDICT_ROUNDS)
            for (const round of rounds) {
                assert.ok(near(round.answer.value, round.slope * round.x + round.intercept))
                assert.equal(round.answer.reliable, isReliable(round))
                // Four different options, one right
                assert.equal(new Set(round.options.map((option) => `${option.value}|${option.reliable}`)).size, 4)
                assert.equal(round.options.filter((option) => option.value === round.answer.value && option.reliable === round.answer.reliable).length, 1)
                if (level === 0) assert.ok(Math.abs(round.r) >= 0.75)
                if (round.given) {
                    assert.equal(level, 2)
                    assert.ok(near(round.given.cxy / round.given.vx, round.slope))
                    assert.ok(near(round.given.my - round.slope * round.given.mx, round.intercept))
                }
            }
        }
    }
})

test('bidimentsionala batx1 g games: the detective has one wrong line, with a typical mistake', () => {
    assert.deepEqual(Object.keys(socialBivarDetectiveNames).sort(), socialBivarDetectiveLevels.flat().sort())
    assert.deepEqual(Object.keys(socialBivarDetectiveTips).sort(), socialBivarDetectiveLevels.flat().sort())
    checkTexts([...Object.values(socialBivarDetectiveNames), ...Object.values(socialBivarDetectiveTips)])
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 40; seed += 1) {
            const cases = createSocialBivarDetectiveCases(createRandom(seed * 17 + level), level)
            assert.equal(cases.length, SOCIAL_BIVAR_DETECTIVE_CASES)
            for (const item of cases) {
                assert.equal(item.lines.length, 3)
                assert.ok(item.options.includes(item.error) && item.options.length === 3)
                assert.ok(!near(item.right, item.reached))
                checkTexts([item.problem, ...item.lines.map((entry) => entry.label)])
                for (const entry of item.lines) render(entry.latex)
                render(item.fix)
                checkWorked(item.fix, item.error)
                for (const entry of item.lines.slice(0, item.wrong)) checkWorked(entry.latex, `${item.error} before the mistake`)
            }
        }
    }
})

test('bidimentsionala batx1 g games: memory pairs have one partner each', () => {
    for (let level = 0; level < socialBivarMemoryLevels.length; level += 1) {
        for (let seed = 1; seed <= 40; seed += 1) {
            const cards = createSocialBivarMemoryBoard(createRandom(seed * 11 + level), level)
            assert.equal(cards.length, 2 * SOCIAL_BIVAR_MEMORY_PAIRS)
            assert.equal(new Set(cards.map((card) => card.latex)).size, cards.length)
            for (const card of cards) render(card.latex)
            for (const card of cards.filter((item) => item.id.endsWith('-q'))) {
                const answer = cards.find((item) => item.setId === card.setId && item.id.endsWith('-a'))!
                const value = Number(answer.latex.split('=').at(-1)!.replace('{,}', '.'))
                const numbers = card.latex.replace(/\{,\}/g, '.').replace(/\\begin\{array\}\{c\}|\\end\{array\}|m'|\\\\/g, ' ').match(/\d+(?:\.\d+)?/g)!.map(Number)
                if (level === 0) assert.ok(near(value, numbers[0] / (numbers[1] * numbers[2])), card.latex)
                if (level === 1) assert.ok(near(value, numbers[0] * numbers[2] + numbers[1]), card.latex)
                if (level === 2) assert.ok(near(value, numbers[0] / numbers[1]), card.latex)
            }
        }
    }
})
