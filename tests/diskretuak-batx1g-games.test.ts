import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { toNumber } from '../src/features/unit-v2/math/fraction.ts'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { choose } from '../src/pages/batx2-zientziak-banaketak/binomial.ts'
import { createDiscreteBatx1gMemoryBoard, DISCRETE_BATX1G_MEMORY_PAIRS } from '../src/pages/batx1-gizarte-diskretuak/games/boards.ts'
import { createDiscreteBatx1gDetectiveCases, DISCRETE_BATX1G_DETECTIVE_CASES, discreteBatx1gDetectiveLevels, discreteBatx1gDetectiveNames, discreteBatx1gDetectiveTips } from '../src/pages/batx1-gizarte-diskretuak/games/detective.ts'
import { createEventsRounds, EVENTS_ROUNDS, eventProbability } from '../src/pages/batx1-gizarte-diskretuak/games/eventsGame.ts'
import { createGaltonRounds, GALTON_ROUNDS } from '../src/pages/batx1-gizarte-diskretuak/games/galtonGame.ts'
import { discreteBatx1gGameModeForPath, discreteBatx1gGameProgressIds, discreteBatx1gGames, discreteBatx1gGameSlugs } from '../src/pages/batx1-gizarte-diskretuak/games/info.ts'
import { DISCRETE_BATX1G_RACE_CIRCUITS, discreteBatx1gRaceErrorTips, generateDiscreteBatx1gRaceQuestion } from '../src/pages/batx1-gizarte-diskretuak/games/race.ts'
import { createWorthRounds, eurosLatex, gainOf, verdictOf, WORTH_ROUNDS, WORTH_VERDICTS } from '../src/pages/batx1-gizarte-diskretuak/games/worthGame.ts'

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
        assert.ok(!/\d\.\d/.test(words(text.es)) && !/\d,\d/.test(words(text.en)) && !/\d,\d/.test(words(text.ar)), text.es)
        assert.ok(!/\d\s*€/.test(words(text.en)), text.en)
    }
}
/** LaTeX of a decimal or a fraction back to a number */
const valueOf = (latex: string) => {
    const fraction = latex.match(/^(-?)\\frac\{(\d+)\}\{(\d+)\}$/)
    if (fraction) return (fraction[1] ? -1 : 1) * Number(fraction[2]) / Number(fraction[3])
    return Number(latex.replace('{,}', '.'))
}

test('diskretuak batx1 g games: the list, its ids and its addresses', () => {
    assert.deepEqual(discreteBatx1gGames.map((game) => game.id), ['race', 'galton', 'events', 'worth', 'binomial', 'detective', 'memory'])
    assert.equal(new Set(discreteBatx1gGameProgressIds).size, discreteBatx1gGameProgressIds.length)
    assert.ok(discreteBatx1gGameProgressIds.every((id) => id >= 139401 && id <= 139899))
    for (const game of discreteBatx1gGames) {
        checkTexts([game.title, game.tagline, game.skills, ...game.levels.flatMap((level) => [level.title, level.description])])
        assert.equal(discreteBatx1gGameModeForPath(`/x/jokuak/${discreteBatx1gGameSlugs[game.id]}`), game.id)
    }
    assert.equal(discreteBatx1gGameModeForPath('/x/jokuak'), 'hub')
})

test('diskretuak batx1 g games: the race, one right option recomputed from its numbers', () => {
    assert.equal(DISCRETE_BATX1G_RACE_CIRCUITS, 4)
    checkTexts(Object.values(discreteBatx1gRaceErrorTips))
    const kinds = new Set<string>()
    for (let circuit = 0; circuit < 4; circuit++) {
        for (let seed = 1; seed <= 80; seed++) {
            const question = generateDiscreteBatx1gRaceQuestion(createRandom(seed * 31 + circuit), circuit, 'easy' as never)
            kinds.add(question.kind)
            assert.equal(question.options.filter((option) => option.correct).length, 1)
            assert.equal(new Set(question.options.map((option) => option.latex)).size, 4)
            for (const option of question.options) render(option.latex)
            checkTexts([question.prompt, question.solution])
            const right = valueOf(question.options.find((option) => option.correct)!.latex)
            assert.ok(Math.abs(right - toNumber(question.answer)) < 1e-9, `${question.kind}`)
            const m = question.meta
            const expected = {
                draws: m.back ? (m.red / (m.red + m.other)) ** 2 : (m.red * (m.red - 1)) / ((m.red + m.other) * (m.red + m.other - 1)),
                orders: choose(m.n, m.k) / 2 ** m.n,
                missing: m.rest / 10,
                mean: (m.a + 2 * m.b + 3 * m.c) / 10,
                gain: m.prizes / m.tickets - m.price,
                pmf: choose(m.n, m.k) / 2 ** m.n,
                variance: (m.n * m.p * (10 - m.p)) / 100,
                atLeast: 1 - ((10 - m.p) / 10) ** m.n,
                estimate: m.p / 10,
                expected: (m.data * choose(m.trials, m.k)) / 2 ** m.trials,
                percent: (100 * m.largest) / m.data
            } as Record<string, number>
            const target = question.kind === 'binomialMean' ? (m.n * m.p) / 10 : expected[question.kind]
            assert.ok(Math.abs(toNumber(question.answer) - target) < 1e-9, `${question.kind}: ${toNumber(question.answer)} ≠ ${target}`)
        }
    }
    assert.equal(kinds.size, 12)
})

test('diskretuak batx1 g games: which bin?', () => {
    for (let level = 0; level < 3; level++) {
        for (let seed = 1; seed <= 30; seed++) {
            const rounds = createGaltonRounds(createRandom(seed), level)
            assert.equal(rounds.length, GALTON_ROUNDS)
            for (const round of rounds) {
                assert.equal(new Set(round.options).size, 3)
                round.options.forEach((option) => render(option))
                const right = round.options[round.answer]
                if (level === 0) assert.equal(Number(right), round.path.reduce((sum, move) => sum + move, 0))
                if (level === 1) assert.equal(Number(right), choose(round.rows, round.bin))
                if (level === 2) assert.ok(Math.abs(valueOf(right) - choose(round.rows, round.bin) / 2 ** round.rows) < 1e-12)
            }
        }
    }
})

test('diskretuak batx1 g games: translate the event', () => {
    for (let level = 0; level < 3; level++) {
        for (let seed = 1; seed <= 30; seed++) {
            const rounds = createEventsRounds(createRandom(seed), level)
            assert.equal(rounds.length, EVENTS_ROUNDS)
            for (const round of rounds) {
                assert.equal(new Set(round.options).size, 3)
                round.options.forEach((option) => render(option))
                checkTexts([round.context, round.event])
                if (level === 2) {
                    const k = Number(round.event.es.match(/\d+/)![0])
                    const relation = round.event.es.startsWith('al menos') ? 'ge' : round.event.es.startsWith('más') ? 'gt' : round.event.es.startsWith('como') ? 'le' : 'lt'
                    assert.ok(Math.abs(valueOf(round.options[round.answer]) - eventProbability(round.n, round.p, relation, k)) < 1e-9, round.event.es)
                }
            }
        }
    }
    // «More than 1» in B(3; 0,5) is 1/2, and «at least 1» is 7/8
    assert.equal(eventProbability(3, 5, 'gt', 1), 0.5)
    assert.equal(eventProbability(3, 5, 'ge', 1), 0.875)
})

test('diskretuak batx1 g games: is it worth it?', () => {
    assert.deepEqual([250, -50, 300, 5].map(eurosLatex), ['2{,}5', '-0{,}5', '3', '0{,}05'])
    for (let level = 0; level < 3; level++) {
        for (let seed = 1; seed <= 30; seed++) {
            const rounds = createWorthRounds(createRandom(seed), level)
            assert.equal(rounds.length, WORTH_ROUNDS)
            if (level === 1) for (const verdict of WORTH_VERDICTS) assert.equal(rounds.filter((round) => verdictOf(round.game) === verdict).length, 2)
            for (const round of rounds) {
                checkTexts([round.game.text])
                assert.equal(new Set(round.options).size, 3)
                const right = round.options[round.answer]
                if (level === 0) assert.equal(right, eurosLatex(gainOf(round.game)))
                if (level === 1) assert.equal(right, verdictOf(round.game))
                if (level === 2) assert.equal(right, eurosLatex(round.game.mean))
            }
        }
    }
})

test('diskretuak batx1 g games: the detective', () => {
    checkTexts([...Object.values(discreteBatx1gDetectiveNames), ...Object.values(discreteBatx1gDetectiveTips)])
    for (let level = 0; level < discreteBatx1gDetectiveLevels.length; level++) {
        for (let seed = 1; seed <= 40; seed++) {
            const cases = createDiscreteBatx1gDetectiveCases(createRandom(seed), level)
            assert.equal(cases.length, DISCRETE_BATX1G_DETECTIVE_CASES)
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

test('diskretuak batx1 g games: the memory', () => {
    for (let level = 0; level < 3; level++) {
        for (let seed = 1; seed <= 20; seed++) {
            const cards = createDiscreteBatx1gMemoryBoard(createRandom(seed), level)
            assert.equal(cards.length, 2 * DISCRETE_BATX1G_MEMORY_PAIRS)
            assert.equal(new Set(cards.map((card) => card.latex)).size, cards.length)
            cards.forEach((card) => render(card.latex))
        }
    }
})
