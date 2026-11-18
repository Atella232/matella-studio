import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { formulaFor } from '../src/utils/latexLanguage.ts'
import { classify } from '../src/pages/batx2-zientziak-sistemak/system.ts'
import { BUSINESS_OPTIONS, businessLatex, createBusinessRounds } from '../src/pages/batx2-gizarte-sistemak/games/business.ts'
import { createGizarteSystemsDetectiveCases, gizarteSystemsDetectiveLevels, gizarteSystemsDetectiveNames, gizarteSystemsDetectiveTips } from '../src/pages/batx2-gizarte-sistemak/games/detective.ts'
import { gizarteSistemakGameProgressIds, gizarteSistemakGames } from '../src/pages/batx2-gizarte-sistemak/games/info.ts'
import { generateGizarteSystemsRaceQuestion, LEFT_OUT_KINDS } from '../src/pages/batx2-gizarte-sistemak/games/race.ts'
import { createTranslateRounds } from '../src/pages/batx2-gizarte-sistemak/games/translate.ts'
import { gizarteSistemakStages } from '../src/pages/batx2-gizarte-sistemak/stages.ts'
import { evaluate } from './latex-math.ts'

const render = (latex: string) => katex.renderToString(latex, { throwOnError: true, strict: 'error' })
function checkText(text: LocalizedText) {
    for (const language of ['eu', 'es', 'en', 'ar'] as const) {
        assert.ok(text[language].trim(), `empty ${language}`)
        for (const [, formula] of text[language].matchAll(/\$([^$]+)\$/g)) katex.renderToString(formulaFor(language, formula), { throwOnError: true, strict: 'error' })
    }
    const words = (value: string) => value.replace(/\$[^$]+\$/g, ' ')
    assert.ok(/[؀-ۿ]/.test(words(text.ar)) || !/[a-zA-Z]{3}/.test(words(text.es)), `not Arabic: ${text.ar}`)
    for (const language of ['eu', 'es', 'en'] as const) assert.ok(!/[؀-ۿ]/.test(text[language]), `Arabic in ${language}: ${text[language]}`)
    assert.ok(!/\d[a-zñ]/.test(words(text.eu)) && !/\$(?:ri|ren|rekin|z|ra|tik|ei|ek|ak|en|ko|an)(?![a-zA-Z])/.test(text.eu), text.eu)
    assert.ok(!/\d\s*€/.test(words(text.en)), text.en)
}

test('sistemak batx2 g games: ids in the block, all different, stages of this unit, no lines', () => {
    assert.deepEqual(gizarteSistemakGames.map((game) => game.id), ['race', 'business', 'translate', 'rouche-express', 'cramer-columns', 'detective', 'memory'])
    assert.ok(gizarteSistemakGameProgressIds.every((id) => id >= 143401 && id <= 143899))
    assert.equal(new Set(gizarteSistemakGameProgressIds).size, gizarteSistemakGameProgressIds.length)
    const stages = gizarteSistemakStages.map((stage) => stage.id)
    for (const game of gizarteSistemakGames) {
        for (const level of game.levels) assert.ok(stages.includes(level.stage), `${game.id}: ${level.stage}`)
        for (const text of [game.title, game.tagline, game.skills, ...game.levels.flatMap((level) => [level.title, level.description])]) {
            assert.ok(text.eu && text.es && text.en && text.ar)
            assert.ok(!/recta/.test(text.es), text.es)
            assert.ok(!/\d[a-zñ]/.test(text.eu), text.eu)
        }
    }
})

test('sistemak batx2 g games: in «How many solutions does the business have?», the right option is the one Rouché gives', () => {
    for (let seed = 1; seed <= 100; seed++) {
        for (const level of [0, 1, 2]) {
            const rounds = createBusinessRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, 6)
            for (const round of rounds) {
                render(businessLatex(round))
                if (level < 2) {
                    assert.equal(round.q[0].length, level === 0 ? 2 : 3)
                    const found = classify(round.q, round.totals)
                    assert.equal(BUSINESS_OPTIONS[round.answer], found.kind)
                } else {
                    const price = round.values[round.answer]
                    assert.equal(classify(round.q, [round.totals[0], round.totals[1], price]).kind, 'determined')
                    for (const value of round.values) if (value !== price) assert.equal(classify(round.q, [round.totals[0], round.totals[1], value]).kind, 'inconsistent')
                    assert.equal(new Set(round.values).size, 4)
                }
            }
            if (level < 2) for (const kind of BUSINESS_OPTIONS) assert.ok(rounds.some((round) => round.kind === kind), `${seed}/${level}: no ${kind}`)
        }
    }
})

test('sistemak batx2 g games: in «Translate the sentence», only the right equation holds for the values that make the sentence true', () => {
    const holds = (equation: string, sample: Record<string, number>) => {
        const [left, right] = equation.split('=')
        const value = (side: string) => evaluate(side.replace(/\{,\}/g, '.'), (name) => sample[name] ?? Number.NaN)
        const a = value(left)
        const b = value(right)
        assert.ok(a !== null && b !== null, equation)
        return Math.abs(a! - b!) < 1e-9
    }
    for (let seed = 1; seed <= 100; seed++) {
        for (const level of [0, 1, 2]) {
            const rounds = createTranslateRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, 5)
            for (const round of rounds) {
                checkText(round.sentence)
                checkText(round.letters)
                assert.equal(new Set(round.options).size, 4)
                assert.equal(round.options[round.answer], round.right)
                for (const option of round.options) {
                    render(option)
                    assert.equal(holds(option, round.sample), option === round.right, `${option} with ${JSON.stringify(round.sample)}`)
                }
            }
        }
    }
})

test('sistemak batx2 g games: the detective cases', () => {
    for (const errors of gizarteSystemsDetectiveLevels) for (const error of errors) {
        checkText(gizarteSystemsDetectiveNames[error])
        checkText(gizarteSystemsDetectiveTips[error])
    }
    for (let seed = 1; seed <= 60; seed++) {
        for (const level of [0, 1, 2]) {
            const cases = createGizarteSystemsDetectiveCases(createRandom(seed * 7919 + level), level)
            assert.equal(cases.length, 6)
            for (const item of cases) {
                assert.notEqual(item.right, item.reached)
                assert.ok(item.wrong >= 0 && item.wrong < item.lines.length)
                assert.ok(item.options.includes(item.error))
                checkText(item.problem)
                for (const line of item.lines) render(line.latex)
                render(item.fix)
            }
        }
    }
})

test('sistemak batx2 g games: the race leaves out the lines, and its own answers are right', () => {
    const seen = new Set<string>()
    for (let seed = 1; seed <= 150; seed++) {
        for (const circuit of [0, 1, 2, 3, 4]) {
            const question = generateGizarteSystemsRaceQuestion(createRandom(seed * 7919 + circuit), circuit, 1)
            seen.add(question.kind)
            assert.ok(!LEFT_OUT_KINDS.includes(question.kind), question.kind)
            assert.equal(question.options.filter((option) => option.correct).length, 1)
            assert.equal(new Set(question.options.map((option) => option.latex)).size, 4)
            if (['third-bundle', 'invest'].includes(question.kind)) checkText(question.prompt)
            const meta = question.meta as Record<string, number | number[]>
            const answer = question.answer.numerator / question.answer.denominator
            if (question.kind === 'third-bundle') {
                const [first, second, prices] = [meta.first, meta.second, meta.prices] as number[][]
                assert.equal(answer, (first[0] + second[0]) * prices[0] + (first[1] + second[1]) * prices[1])
            }
            if (question.kind === 'invest') assert.equal(answer * ((meta.k as number) + 1), meta.total)
        }
    }
    for (const kind of ['third-bundle', 'invest']) assert.ok(seen.has(kind), kind)
})
