import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import type { Tier } from '../src/features/unit-v2/games/raceCore.ts'
import { toNumber } from '../src/features/unit-v2/math/fraction.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { createProbabilityBatx2gDetectiveCases, PROBABILITY_BATX2G_DETECTIVE_CASES, probabilityBatx2gDetectiveLevels, probabilityBatx2gDetectiveNames, probabilityBatx2gDetectiveTips } from '../src/pages/batx2-gizarte-probabilitatea/games/detective.ts'
import { cellValue, createDivideRounds, DIVIDE_ROUNDS, divideQuestion, isRightDivision } from '../src/pages/batx2-gizarte-probabilitatea/games/divide.ts'
import { probabilityBatx2gGameModeForPath, probabilityBatx2gGameProgressIds, probabilityBatx2gGames, probabilityBatx2gGameSlugs } from '../src/pages/batx2-gizarte-probabilitatea/games/info.ts'
import { countLatex, countOf, createOrderRounds, ORDER_ROUNDS } from '../src/pages/batx2-gizarte-probabilitatea/games/order.ts'
import { checkProbabilityBatx2gPitAnswer, generateProbabilityBatx2gRaceQuestion, probabilityBatx2gRaceErrorTips } from '../src/pages/batx2-gizarte-probabilitatea/games/race.ts'
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
        const formulas = (value: string) => [...value.matchAll(/\$([^$]+)\$/g)].map((match) => match[1].replace(/\{,\}/g, '.')).sort()
        for (const language of ['eu', 'en', 'ar'] as const) assert.deepEqual(formulas(text[language]), formulas(text.es), `${language}: ${text[language]}`)
        assert.ok(!/\d[a-zñ]/.test(text.eu.replace(/\$[^$]+\$/g, '')), text.eu)
        assert.ok(!/§(?:ri|ren|rekin|z|ra|tik|ei|ek|ak|en|ko|an)(?![a-zA-Z])/.test(text.eu.replace(/\$[^$]+\$/g, '§')), text.eu)
        for (const [, formula] of text.es.matchAll(/\$([^$]+)\$/g)) assert.ok(!formula.includes(':'), formula)
    }
}

function checkWorked(latex: string, where: string) {
    let read = 0
    for (const part of latex.replace(/\{,\}/g, '.').split(/\\qquad|\\quad|\\ \\to\\ |\\to|,\\ /)) {
        const values = part.split(/\\le|\\ge|\\neq|<|>|\\approx/)[0].split('=').map((side) => evaluate(side)).filter((value): value is number => value !== null)
        if (values.length < 2) continue
        assert.ok(values.every((value) => near(value, values[0])), `${where}: ${part} → ${values.join(' / ')}`)
        read += 1
    }
    return read
}

test('probabilitatea batx2 g games: the hub, its levels and progress ids', () => {
    assert.deepEqual(probabilityBatx2gGames.map((game) => game.id), ['race', 'divide', 'order', 'detective', 'venn', 'culprit', 'memory'])
    assert.equal(new Set(probabilityBatx2gGameProgressIds).size, probabilityBatx2gGameProgressIds.length)
    for (const id of probabilityBatx2gGameProgressIds) assert.ok(id >= 150401 && id <= 150899, `${id}`)
    const stages = ['counting', 'events', 'conditional', 'bayes']
    for (const game of probabilityBatx2gGames) {
        assert.ok(game.levels.length >= 3, game.id)
        for (const level of game.levels) assert.ok(stages.includes(level.stage), `${game.id}: ${level.stage}`)
        checkTexts([game.title, game.tagline, game.skills, ...game.levels.flatMap((level) => [level.title, level.description])])
        assert.equal(probabilityBatx2gGameModeForPath(`/x/jokuak/${probabilityBatx2gGameSlugs[game.id]}`), game.id)
    }
    assert.equal(probabilityBatx2gGameModeForPath('/x/jokuak'), 'hub')
})

test('probabilitatea batx2 g games: the counting circuit of the race is right, with the other models as mistakes', () => {
    const factorial = (n: number): number => (n <= 1 ? 1 : n * factorial(n - 1))
    const kinds = new Set<string>()
    for (let seed = 1; seed <= 300; seed += 1) {
        const question = generateProbabilityBatx2gRaceQuestion(createRandom(seed), 0, (seed % 3) as Tier)
        kinds.add(question.kind)
        assert.equal(question.circuit, 0)
        const { n, k, women, men } = question.meta
        const expected = {
            posts: () => factorial(n) / factorial(n - k),
            pin: () => n ** k,
            queue: () => factorial(n),
            committee: () => factorial(n) / factorial(n - k) / factorial(k),
            lot: () => (women * (women - 1)) / ((women + men) * (women + men - 1))
        }[question.kind]!()
        assert.ok(near(toNumber(question.answer), expected), `${question.kind}: ${question.prompt.es}`)
        assert.equal(question.options.filter((option) => option.correct).length, 1)
        assert.equal(new Set(question.options.map((option) => option.latex)).size, 4)
        for (const option of question.options) {
            render(option.latex)
            if (!option.correct) assert.ok(!near(evaluate(option.latex.replace(/\{,\}/g, '.'))!, expected), `${question.kind}: ${option.latex}`)
        }
        assert.equal(checkProbabilityBatx2gPitAnswer(question, String(question.answer.numerator) + (question.answer.denominator === 1 ? '' : `/${question.answer.denominator}`)), 'correct')
        checkTexts([question.prompt, question.solution])
    }
    assert.deepEqual([...kinds].sort(), ['committee', 'lot', 'pin', 'posts', 'queue'])
    // The other circuits are the ones of 2.º Ciencias
    for (const circuit of [1, 2, 3]) assert.equal(generateProbabilityBatx2gRaceQuestion(createRandom(circuit), circuit, 1).circuit, circuit)
    checkTexts(Object.values(probabilityBatx2gRaceErrorTips))
})

test('probabilitatea batx2 g games: which cells do I divide?', () => {
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 60; seed += 1) {
            const rounds = createDivideRounds(createRandom(seed * 13 + level), level)
            assert.equal(rounds.length, DIVIDE_ROUNDS)
            for (const round of rounds) {
                // Totals add up
                assert.equal(cellValue(round, [0, 2]) + cellValue(round, [1, 2]), cellValue(round, [2, 2]))
                assert.equal(cellValue(round, [2, 0]) + cellValue(round, [2, 1]), cellValue(round, [2, 2]))
                // The right cells are right; the grand total below a conditional is not
                assert.ok(isRightDivision(round, round.top, round.bottom))
                if (round.kind.startsWith('given')) assert.ok(!isRightDivision(round, round.top, [2, 2]), `${round.kind}`)
                assert.ok(cellValue(round, round.top) <= cellValue(round, round.bottom))
                checkTexts([divideQuestion(round)])
            }
            const kinds = new Set(rounds.map((round) => round.kind))
            if (level === 0) assert.deepEqual([...kinds].sort(), ['both', 'margin'])
            if (level === 1) assert.deepEqual([...kinds], ['given-row'])
        }
    }
})

test('probabilitatea batx2 g games: does the order matter?', () => {
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 60; seed += 1) {
            const rounds = createOrderRounds(createRandom(seed * 19 + level), level)
            assert.equal(rounds.length, ORDER_ROUNDS)
            assert.equal(new Set(rounds.map((round) => round.situation.es)).size, ORDER_ROUNDS)
            for (const round of rounds) {
                if (level === 0) assert.ok(['V', 'C'].includes(round.model))
                const right = countOf(round.model, round.n, round.k)
                assert.equal(round.options.filter((value) => value === right).length, 1)
                assert.equal(new Set(round.options).size, 3)
                render(countLatex(round))
                checkWorked(countLatex(round), round.model)
                checkTexts([round.situation])
            }
        }
    }
})

test('probabilitatea batx2 g games: the detective has one wrong line, with a mistake of this unit', () => {
    assert.deepEqual(Object.keys(probabilityBatx2gDetectiveNames).sort(), probabilityBatx2gDetectiveLevels.flat().sort())
    checkTexts([...Object.values(probabilityBatx2gDetectiveNames), ...Object.values(probabilityBatx2gDetectiveTips)])
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 40; seed += 1) {
            const cases = createProbabilityBatx2gDetectiveCases(createRandom(seed * 17 + level), level)
            assert.equal(cases.length, PROBABILITY_BATX2G_DETECTIVE_CASES)
            for (const item of cases) {
                assert.equal(item.lines.length, 3)
                assert.ok(item.options.includes(item.error) && item.options.length === 3)
                assert.ok(!near(item.right, item.reached), `${item.error}: ${item.right}`)
                checkTexts([item.problem, ...item.lines.map((entry) => entry.label)])
                for (const entry of item.lines) render(entry.latex)
                render(item.fix)
                checkWorked(item.fix, item.error)
                // The value the fix reaches is the right one
                const last = item.fix.replace(/\{,\}/g, '.').split('=').at(-1)!
                assert.ok(near(evaluate(last)!, item.right), `${item.error}: ${item.fix} vs ${item.right}`)
            }
        }
    }
})
