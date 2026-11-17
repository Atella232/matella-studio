import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import type { Tier } from '../src/features/unit-v2/games/raceCore.ts'
import { toExactDecimal, toNumber } from '../src/features/unit-v2/math/fraction.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { written } from '../src/pages/batx1-zientziak-errealak/games/race.ts'
import { socLimitsGameModeForPath, socLimitsGameProgressIds, socLimitsGames, socLimitsGameSlugs } from '../src/pages/batx1-gizarte-limiteak/games/info.ts'
import { checkSocLimitsPitAnswer, generateSocLimitsRaceQuestion, SOC_LIMITS_RACE_CIRCUITS, socLimitsRaceErrorTips } from '../src/pages/batx1-gizarte-limiteak/games/race.ts'
import { createLongRounds, LONG_ROUNDS } from '../src/pages/batx1-gizarte-limiteak/games/longRun.ts'
import { createJoinRounds, JOIN_ROUNDS, joinLatex, jumpWith } from '../src/pages/batx1-gizarte-limiteak/games/join.ts'
import { createSocLimitsDetectiveCases, SOC_LIMITS_DETECTIVE_CASES, socLimitsDetectiveLevels, socLimitsDetectiveNames, socLimitsDetectiveTips } from '../src/pages/batx1-gizarte-limiteak/games/detective.ts'
import { createSocLimitsMemoryBoard, SOC_LIMITS_MEMORY_PAIRS, socLimitsMemoryLevels } from '../src/pages/batx1-gizarte-limiteak/games/boards.ts'

const languages = ['eu', 'es', 'en', 'ar'] as const
const render = (latex: string, language: (typeof languages)[number] = 'es') => katex.renderToString(formulaFor(language, latex), { throwOnError: true, strict: 'error' })

function checkTexts(texts: LocalizedText[]) {
    for (const text of texts) {
        for (const language of languages) {
            assert.ok(text[language].length > 0)
            for (const [, formula] of text[language].matchAll(/\$([^$]+)\$/g)) render(formula, language)
            assert.ok(!text[language].replace(/\$[^$]+\$/g, '').includes('{,}'), text[language])
        }
        assert.ok(!text.ar.includes('{,}'), text.ar)
        assert.ok(!/[؀-ۿ]/.test([...text.ar.matchAll(/\$([^$]+)\$/g)].map((match) => match[1]).join('')), text.ar)
        assert.ok(!/\d(?:ri|ren|rekin|ekin|ek|ak|ra|tik|z|ei|en|k|ko)(?![a-zA-Z])/.test(text.eu.replace(/\$[^$]+\$/g, '')), text.eu)
        for (const [, formula] of text.es.matchAll(/\$([^$]+)\$/g)) assert.ok(!formula.includes(':'), formula)
    }
}

/** A limit at infinity worked out numerically: the value of f at a huge x, read as a number, +∞ or −∞ */
function numericLimit(latex: string, toward: '+' | '-'): string {
    const x = toward === '+' ? 1e6 : -1e6
    let js = latex
        .replace(/\{,\}/g, '.')
        .replace(/\\cdot/g, '*')
        .replace(/\\sqrt\{([^{}]+)\}/g, 'Math.sqrt($1)')
        .replace(/\\frac\{(.+)\}\{(.+)\}/, '(($1)/($2))')
        .replace(/(\d)x/g, '$1*x')
        .replace(/x\^(\d)/g, 'Math.pow(x,$1)')
        .replace(/(\d(?:\.\d+)?)\^x/g, 'Math.pow($1,x)')
    js = js.replace(/\)\(/g, ')*(')
    const value = Function('x', `return ${js}`)(x) as number
    if (value > 1e5) return '+\\infty'
    if (value < -1e5) return '-\\infty'
    return String(Math.round(value * 1000) / 1000)
}
const asNumber = (latex: string) => {
    const fraction = latex.match(/^(-?)\\frac\{(\d+)\}\{(\d+)\}$/)
    if (fraction) return (fraction[1] ? -1 : 1) * Number(fraction[2]) / Number(fraction[3])
    return latex.includes('infty') ? latex : Number(latex)
}

test('limiteak batx1 g games: the hub, its levels and progress ids', () => {
    assert.deepEqual(socLimitsGames.map((game) => game.id), ['race', 'long', 'join', 'detective', 'memory', 'forms', 'asymptote', 'discontinuity'])
    assert.equal(new Set(socLimitsGameProgressIds).size, socLimitsGameProgressIds.length)
    for (const id of socLimitsGameProgressIds) assert.ok(id >= 135401 && id <= 135899, `${id}`)
    const stages = ['infinity', 'more-infinity', 'point', 'continuity', 'asymptotes']
    for (const game of socLimitsGames) {
        assert.ok(game.levels.length >= 2, game.id)
        for (const level of game.levels) assert.ok(stages.includes(level.stage), `${game.id}: ${level.stage}`)
        checkTexts([game.title, game.tagline, game.skills, ...game.levels.flatMap((level) => [level.title, level.description])])
        assert.equal(socLimitsGameModeForPath(`/matematika/batx1-gizarte/limites-continuidad/jokuak/${socLimitsGameSlugs[game.id]}`), game.id)
    }
    // Left out with the number e and E(x): the third levels of the borrowed forms and discontinuity games
    assert.equal(socLimitsGames.find((game) => game.id === 'forms')!.levels.length, 2)
    assert.equal(socLimitsGames.find((game) => game.id === 'discontinuity')!.levels.length, 2)
})

test('limiteak batx1 g games: every race question has one right option, worked out from its numbers', () => {
    const kinds = new Set<string>()
    checkTexts(Object.values(socLimitsRaceErrorTips))
    for (let circuit = 0; circuit < SOC_LIMITS_RACE_CIRCUITS; circuit += 1) {
        for (const tier of [0, 1, 2] as Tier[]) {
            for (let seed = 1; seed <= 60; seed += 1) {
                const question = generateSocLimitsRaceQuestion(createRandom(seed * 7919 + circuit * 31 + tier), circuit, tier)
                kinds.add(question.kind)
                assert.equal(question.options.length, 4, question.kind)
                assert.equal(question.options.filter((option) => option.correct).length, 1)
                assert.equal(new Set(question.options.map((option) => option.latex)).size, 4, question.kind)
                assert.equal(question.options.find((option) => option.correct)!.latex, written(question.answer))
                for (const option of question.options) render(option.latex)
                checkTexts([question.prompt, question.solution])
                const typed = question.answer.denominator === 1 ? String(question.answer.numerator) : toExactDecimal(question.answer) ?? `${question.answer.numerator}/${question.answer.denominator}`
                assert.equal(checkSocLimitsPitAnswer(question, typed), 'correct', `${question.kind}: ${typed}`)
                const m = question.meta
                const expected: Record<string, () => number> = {
                    'same-degree': () => m.a / m.b,
                    'lower-degree': () => 0,
                    decay: () => m.c,
                    minus: () => m.a / m.b,
                    root: () => m.r / m.m,
                    cost: () => m.unit,
                    side: () => (m.fromLeft ? m.a * m.a + m.p : m.m * m.a + m.q),
                    zero: () => m.r + m.s,
                    common: () => m.k * m.a,
                    parameter: () => m.m1 * m.a + m.c1 - m.m2 * m.a,
                    hole: () => 2 * m.a,
                    jump: () => m.value - m.m * m.a,
                    vertical: () => m.a,
                    horizontal: () => m.a / m.b,
                    oblique: () => m.p - m.d
                }
                assert.ok(expected[question.kind], question.kind)
                assert.ok(Math.abs(toNumber(question.answer) - expected[question.kind]()) < 1e-6, `${question.kind}: ${toNumber(question.answer)} ≠ ${expected[question.kind]()}`)
            }
        }
    }
    assert.equal(kinds.size, 15)
})

test('limiteak batx1 g games: ¿y a la larga? has one right card, the limit of the function', () => {
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 60; seed += 1) {
            const rounds = createLongRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, LONG_ROUNDS)
            assert.equal(new Set(rounds.map((round) => round.latex)).size, LONG_ROUNDS)
            for (const round of rounds) {
                assert.equal(round.options.length, 4)
                assert.equal(new Set(round.options).size, 4)
                assert.ok(round.options.includes(round.answer))
                for (const latex of [round.latex, round.working, ...round.options]) render(latex)
                // The right card is what the function does at a huge x, and no wrong card is
                const value = numericLimit(round.latex, round.toward)
                const right = asNumber(round.answer)
                if (typeof right === 'string') assert.equal(value, right, `${round.latex} → ${value}`)
                else assert.ok(Math.abs(Number(value) - right) < 0.01, `${round.latex} → ${value}, card ${round.answer}`)
                for (const option of round.options.filter((item) => item !== round.answer)) {
                    const wrong = asNumber(option)
                    assert.ok(typeof wrong === 'string' ? wrong !== value : Math.abs(Number(value) - wrong) > 0.01 || Number.isNaN(Number(value)), `${round.latex}: ${option} is also right`)
                }
            }
        }
    }
})

test('limiteak batx1 g games: empalma los trozos has one k that joins the pieces', () => {
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 60; seed += 1) {
            const rounds = createJoinRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, JOIN_ROUNDS)
            for (const round of rounds) {
                render(joinLatex(round))
                assert.equal(round.options.length, 4)
                assert.equal(new Set(round.options).size, 4)
                assert.ok(round.options.includes(round.answer))
                assert.ok(Math.abs(jumpWith(round, round.answer)) < 1e-9, joinLatex(round))
                for (const option of round.options.filter((item) => item !== round.answer)) assert.ok(Math.abs(jumpWith(round, option)) > 1e-9, `${joinLatex(round)}: k = ${option}`)
                assert.equal(round.tariff, level === 2)
            }
        }
    }
})

test('limiteak batx1 g games: the detective cases are well made', () => {
    assert.equal(socLimitsDetectiveLevels.flat().length, 12)
    checkTexts([...Object.values(socLimitsDetectiveNames), ...Object.values(socLimitsDetectiveTips)])
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 40; seed += 1) {
            const cases = createSocLimitsDetectiveCases(createRandom(seed * 7919 + level), level)
            assert.equal(cases.length, SOC_LIMITS_DETECTIVE_CASES)
            for (const item of cases) {
                assert.ok(socLimitsDetectiveLevels[level].includes(item.error))
                assert.ok(item.wrong >= 0 && item.wrong < item.lines.length)
                assert.ok(Math.abs(item.right - item.reached) > 1e-9)
                checkTexts([item.problem, ...item.lines.map((line) => line.label)])
                for (const language of languages) for (const line of item.lines) render(line.latex.replace(/\{,\}/g, language === 'ar' ? '.' : '{,}'), language)
                render(item.fix)
            }
        }
    }
})

test('limiteak batx1 g games: memory boards have six pairs with one partner each', () => {
    assert.deepEqual([...socLimitsMemoryLevels], ['infinity', 'point', 'asymptotes'])
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 60; seed += 1) {
            const board = createSocLimitsMemoryBoard(createRandom(seed * 7919 + level), level)
            assert.equal(board.length, 2 * SOC_LIMITS_MEMORY_PAIRS)
            const latexes = board.map((card) => card.latex)
            assert.equal(new Set(latexes).size, latexes.length, latexes.join(' | '))
            for (const card of board) render(card.latex)
        }
    }
})
