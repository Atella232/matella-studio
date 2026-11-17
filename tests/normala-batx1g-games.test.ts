import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { toNumber } from '../src/features/unit-v2/math/fraction.ts'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { above, below, between } from '../src/pages/batx2-zientziak-banaketak/normal.ts'
import { createNormalBatx1gMemoryBoard, NORMAL_BATX1G_MEMORY_PAIRS } from '../src/pages/batx1-gizarte-normala/games/boards.ts'
import { createCutoffRounds, CUTOFF_PERCENTS, CUTOFF_ROUNDS, cutoffLatex } from '../src/pages/batx1-gizarte-normala/games/cutoffGame.ts'
import { createDensityRounds, DENSITY_ROUNDS, DENSITY_VERDICTS, isRightDensity } from '../src/pages/batx1-gizarte-normala/games/densityGame.ts'
import { createNormalBatx1gDetectiveCases, NORMAL_BATX1G_DETECTIVE_CASES, normalBatx1gDetectiveLevels, normalBatx1gDetectiveNames, normalBatx1gDetectiveTips } from '../src/pages/batx1-gizarte-normala/games/detective.ts'
import { normalBatx1gGameModeForPath, normalBatx1gGameProgressIds, normalBatx1gGames, normalBatx1gGameSlugs } from '../src/pages/batx1-gizarte-normala/games/info.ts'
import { createPercentRounds, PERCENT_ROUNDS, shareBetween } from '../src/pages/batx1-gizarte-normala/games/percentGame.ts'
import { generateNormalBatx1gRaceQuestion, NORMAL_BATX1G_RACE_CIRCUITS, normalBatx1gRaceErrorTips } from '../src/pages/batx1-gizarte-normala/games/race.ts'

const languages = ['eu', 'es', 'en', 'ar'] as const
const render = (latex: string, language: (typeof languages)[number] = 'es') => katex.renderToString(formulaFor(language, latex), { throwOnError: true, strict: 'error' })
function checkTexts(texts: LocalizedText[]) {
    for (const text of texts) {
        for (const language of languages) {
            assert.ok(text[language].length > 0)
            for (const [, formula] of text[language].matchAll(/\$([^$]+)\$/g)) render(formula, language)
        }
        assert.ok(!text.ar.includes('{,}'), text.ar)
        const words = (value: string) => value.replace(/\$[^$]+\$/g, ' ')
        if (/[a-zA-Z]{4}/.test(words(text.es))) assert.ok(/[؀-ۿ]/.test(words(text.ar)), `not Arabic: ${text.ar}`)
        assert.ok(!/\d[a-zñ]/.test(text.eu.replace(/\$[^$]+\$/g, '')), text.eu)
        assert.ok(!/%\s?\d+(?:,\d+)?(?:ek|an|ean|ra|tik|ko|en|k)\b/.test(text.eu), text.eu)
        assert.ok(!/\d\.\d/.test(words(text.es)) && !/\d,\d/.test(words(text.ar)), text.es)
    }
}
const valueOf = (latex: string) => Number(latex.replace('{,}', '.'))

test('normala batx1 g games: the list, its ids and its addresses', () => {
    assert.deepEqual(normalBatx1gGames.map((game) => game.id), ['race', 'percent', 'density', 'cutoff', 'area', 'hunt', 'detective', 'memory'])
    assert.equal(new Set(normalBatx1gGameProgressIds).size, normalBatx1gGameProgressIds.length)
    assert.ok(normalBatx1gGameProgressIds.every((id) => id >= 140401 && id <= 140899))
    for (const game of normalBatx1gGames) {
        checkTexts([game.title, game.tagline, game.skills, ...game.levels.flatMap((level) => [level.title, level.description])])
        assert.equal(normalBatx1gGameModeForPath(`/x/jokuak/${normalBatx1gGameSlugs[game.id]}`), game.id)
    }
})

test('normala batx1 g games: the race, one right option recomputed from its numbers', () => {
    assert.equal(NORMAL_BATX1G_RACE_CIRCUITS, 5)
    checkTexts(Object.values(normalBatx1gRaceErrorTips))
    const kinds = new Set<string>()
    for (let circuit = 0; circuit < 5; circuit++) {
        for (let seed = 1; seed <= 80; seed++) {
            const question = generateNormalBatx1gRaceQuestion(createRandom(seed * 31 + circuit), circuit, 'easy' as never)
            kinds.add(question.kind)
            assert.equal(question.options.filter((option) => option.correct).length, 1)
            assert.equal(new Set(question.options.map((option) => option.latex)).size, 4)
            for (const option of question.options) render(option.latex)
            checkTexts([question.prompt, question.solution])
            const m = question.meta
            const expected: Record<string, number> = {
                bar: m.percent / (100 * m.width),
                score: (m.x - m.mean) / m.sd,
                rectangle: 1 / m.base,
                triangle: 2 / m.base,
                above: above(m.k / 100) / 10_000,
                negative: below(-m.k / 100) / 10_000,
                central: between(-m.k / 100, m.k / 100) / 10_000,
                sigma: m.sd,
                edge: m.value / 10,
                mark: m.start + m.width / 2,
                expected: (m.total * between(m.from, m.to)) / 10_000,
                percent: (100 * m.largest) / m.total
            }
            assert.ok(Math.abs(toNumber(question.answer) - expected[question.kind]) < 1e-9, `${question.kind}`)
        }
    }
    assert.equal(kinds.size, 12)
})

test('normala batx1 g games: which percentage?', () => {
    assert.equal(shareBetween(-1, 1), 6826)
    assert.equal(shareBetween(1, null) + shareBetween(null, -1) + shareBetween(-1, 1), 10_000)
    for (let level = 0; level < 3; level++) {
        for (let seed = 1; seed <= 30; seed++) {
            const rounds = createPercentRounds(createRandom(seed), level)
            assert.equal(rounds.length, PERCENT_ROUNDS)
            for (const round of rounds) {
                assert.equal(new Set(round.options).size, 3)
                assert.equal(round.options[round.answer], shareBetween(round.from, round.to))
            }
        }
    }
})

test('normala batx1 g games: is it a density?', () => {
    for (let level = 0; level < 3; level++) {
        for (let seed = 1; seed <= 30; seed++) {
            const rounds = createDensityRounds(createRandom(seed), level)
            assert.equal(rounds.length, DENSITY_ROUNDS)
            for (const round of rounds) {
                assert.equal(new Set(round.options).size, 3)
                if (level === 0) {
                    const verdict = round.options[round.answer]
                    assert.equal(verdict, round.shape === 'line' ? 'negative' : isRightDensity(round) ? 'yes' : 'area')
                    assert.deepEqual(round.options, DENSITY_VERDICTS)
                } else {
                    assert.ok(isRightDensity(round))
                    const right = round.options[round.answer] as number
                    const h = round.height / 100
                    const expected = level === 1 ? h : round.shape === 'rectangle' ? round.to * h : (h * round.to * round.to) / (2 * round.base)
                    assert.ok(Math.abs(right / 10_000 - expected) < 1e-9, `${round.shape} ${round.base}`)
                }
            }
        }
    }
})

test('normala batx1 g games: the cut-off mark', () => {
    assert.deepEqual(CUTOFF_PERCENTS.map((item) => item.k), [1.28, 1.04, 0.84, 0.67, 0.52, 0.25])
    for (let level = 0; level < 3; level++) {
        for (let seed = 1; seed <= 30; seed++) {
            const rounds = createCutoffRounds(createRandom(seed), level)
            assert.equal(rounds.length, CUTOFF_ROUNDS)
            for (const round of rounds) {
                checkTexts([round.context])
                assert.equal(new Set(round.options).size, 3)
                round.options.forEach((option) => render(option))
                const below = round.top ? 100 - round.percent : round.percent
                // The table value at k leaves about that share below
                assert.ok(Math.abs((round.top ? round.k : -round.k) - CUTOFF_PERCENTS.find((item) => item.percent === round.percent)!.k) < 1e-9 && below > 0)
                const right = valueOf(round.options[round.answer])
                assert.ok(Math.abs(right - (level === 0 ? round.k : round.mean + round.k * round.sd)) < 1e-9, cutoffLatex(right))
            }
        }
    }
})

test('normala batx1 g games: the detective', () => {
    checkTexts([...Object.values(normalBatx1gDetectiveNames), ...Object.values(normalBatx1gDetectiveTips)])
    for (let level = 0; level < normalBatx1gDetectiveLevels.length; level++) {
        for (let seed = 1; seed <= 40; seed++) {
            const cases = createNormalBatx1gDetectiveCases(createRandom(seed), level)
            assert.equal(cases.length, NORMAL_BATX1G_DETECTIVE_CASES)
            for (const item of cases) {
                assert.equal(item.lines.length, 3)
                assert.ok(item.options.includes(item.error))
                assert.ok(Math.abs(item.right - item.reached) > 1e-9)
                item.lines.forEach((entry) => render(entry.latex))
                render(item.fix)
                checkTexts([item.problem])
            }
        }
    }
})

test('normala batx1 g games: the memory', () => {
    for (let level = 0; level < 3; level++) {
        for (let seed = 1; seed <= 20; seed++) {
            const cards = createNormalBatx1gMemoryBoard(createRandom(seed), level)
            assert.equal(cards.length, 2 * NORMAL_BATX1G_MEMORY_PAIRS)
            assert.equal(new Set(cards.map((card) => card.latex)).size, cards.length)
            cards.forEach((card) => render(card.latex))
        }
    }
})
