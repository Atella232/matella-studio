import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import { toNumber } from '../src/features/unit-v2/math/fraction.ts'
import { createTrigonometryMemoryBoard, TRIGONOMETRY_MEMORY_PAIRS, trigonometryMemoryLevels } from '../src/pages/dbh4-akademikoak-trigonometria/games/boards.ts'
import { trigonometryGameModeForPath, trigonometryGameProgressIds, trigonometryGames } from '../src/pages/dbh4-akademikoak-trigonometria/games/info.ts'
import {
    checkTrigonometryPitAnswer,
    doubleObservation,
    generateTrigonometryRaceQuestion,
    reduced,
    TRIGONOMETRY_RACE_CIRCUITS,
    trigonometryParTime,
    trigonometryRaceErrorTips,
    type TrigonometryRaceQuestion
} from '../src/pages/dbh4-akademikoak-trigonometria/games/race.ts'
import { trigonometryLabChallengeIds } from '../src/pages/dbh4-akademikoak-trigonometria/lab/labTools.ts'

const close = (a: number, b: number, tolerance = 1e-6) => Math.abs(a - b) < tolerance * Math.max(1, Math.abs(b))
const rad = (degrees: number) => (degrees * Math.PI) / 180
const deg = (radians: number) => (radians * 180) / Math.PI
const hundredths = (value: number) => Math.round(value * 100) / 100

/** The value an option shows: decimals, fractions, roots and multiples of π */
function valueOf(latex: string): number {
    const sign = latex.startsWith('-') ? -1 : 1
    const body = latex.replace(/^-/, '').replace('{,}', '.')
    const piMatch = body.match(/^(?:\\frac\{(\d*)\\pi\}\{(\d+)\}|(\d*)\\pi)$/)
    if (piMatch) {
        const top = Number(piMatch[1] ?? piMatch[3] ?? '') || 1
        return sign * (top / Number(piMatch[2] ?? 1)) * Math.PI
    }
    const fractionMatch = body.match(/^\\frac\{(\d*)(?:\\sqrt\{(\d+)\})?\}\{(\d+)\}$/)
    if (fractionMatch) return sign * ((Number(fractionMatch[1]) || 1) * Math.sqrt(Number(fractionMatch[2] ?? 1))) / Number(fractionMatch[3])
    const rootMatch = body.match(/^(\d*)\\sqrt\{(\d+)\}$/)
    if (rootMatch) return sign * (Number(rootMatch[1]) || 1) * Math.sqrt(Number(rootMatch[2]))
    const value = Number(body)
    if (Number.isNaN(value)) throw new Error(`Cannot read ${latex}`)
    return sign * value
}

/** How a student types the option at the pit stop */
const typed = (latex: string) => latex.replace(/^\\frac\{(\d+)\}\{(\d+)\}$/, '$1/$2').replace('{,}', ',')

/** The answer recomputed from the numbers of the prompt */
function expected(question: TrigonometryRaceQuestion): number {
    const m = question.meta
    switch (question.kind) {
        case 'ratio': return [m.opposite / m.hypotenuse, m.adjacent / m.hypotenuse, m.opposite / m.adjacent][m.ask]
        case 'notable': return [Math.sin, Math.cos, Math.tan][m.ask](rad(m.angle))
        case 'hypotenuse': return Math.hypot(m.a, m.b)
        case 'one-ratio': {
            const cos = Math.sqrt(1 - (m.a / m.c) ** 2)
            return m.ask === 1 ? cos : m.a / m.c / cos
        }
        case 'to-decimal': return m.degrees + m.minutes / 60
        case 'to-minutes': return m.minutes
        case 'calculator': return Math.round(deg([Math.asin, Math.acos, Math.atan][m.ask](m.x100 / 100)))
        case 'side': return hundredths(m.h * (m.ask === 0 ? Math.sin(rad(m.angle)) : Math.cos(rad(m.angle))))
        case 'elevation': return hundredths(m.d * Math.tan(rad(m.angle)))
        case 'depression': return hundredths(m.h / Math.tan(rad(m.angle)))
        case 'angle': return Math.round(deg(Math.atan2(m.p, m.q)))
        case 'double': {
            // h = x · tg β = (d + x) · tg α, solved again here
            const x = (m.d * Math.tan(rad(m.far))) / (Math.tan(rad(m.near)) - Math.tan(rad(m.far)))
            return hundredths(x * Math.tan(rad(m.near)))
        }
        case 'triangle-area': return hundredths((m.b * m.c * Math.sin(rad(m.angle))) / 2)
        case 'parallelogram': return hundredths(m.a * m.b * Math.sin(rad(m.angle)))
        case 'sign': return [Math.sin, Math.cos, Math.tan][m.ask](rad(m.angle))
        case 'reduce': {
            const a = m.angle
            return a < 180 ? 180 - a : a < 270 ? a - 180 : 360 - a
        }
        case 'to-radians': return rad(m.degrees)
        case 'to-degrees': return m.degrees
        default: throw new Error(`unchecked kind ${question.kind}`)
    }
}

test('trigonometria 4. DBH ak games: levels, ids and routes', () => {
    assert.equal(trigonometryGames.length, 2)
    assert.equal(trigonometryGames[0].levels.length, TRIGONOMETRY_RACE_CIRCUITS)
    assert.equal(trigonometryGames[1].levels.length, trigonometryMemoryLevels.length)
    assert.equal(new Set(trigonometryGameProgressIds).size, trigonometryGameProgressIds.length)
    assert.ok(!trigonometryGameProgressIds.some((id) => trigonometryLabChallengeIds.includes(id)))
    for (const id of trigonometryGameProgressIds) assert.ok(id >= 72101 && id <= 72299, `${id}`)
    const stages = ['ratios', 'identities', 'solving', 'problems', 'circle']
    for (const game of trigonometryGames) for (const level of game.levels) assert.ok(stages.includes(level.stage), `${game.id} ${level.stage}`)
    assert.deepEqual(trigonometryGames[0].levels.map((level) => level.stage), stages)
    assert.equal(trigonometryGameModeForPath('/matematika/dbh4-akademikoak/trigonometria/juegos/carrera'), 'race')
    assert.equal(trigonometryGameModeForPath('/matematika/dbh4-akademikoak/trigonometria/jokuak/memoria'), 'memory')
    assert.equal(trigonometryGameModeForPath('/matematika/dbh4-akademikoak/trigonometria/jokuak'), 'hub')
})

test('trigonometria 4. DBH ak race: valid options and every answer recomputed', () => {
    const kinds = new Set<string>()
    const errors = new Set<string>()
    for (let circuit = 0; circuit < TRIGONOMETRY_RACE_CIRCUITS; circuit += 1) {
        assert.ok(trigonometryParTime(circuit) > 60000)
        for (let seed = 1; seed <= 200; seed += 1) {
            const random = createRandom(seed * 41 + circuit)
            for (const tier of [0, 1, 2] as const) {
                const question = generateTrigonometryRaceQuestion(random, circuit, tier)
                assert.equal(question.circuit, circuit)
                kinds.add(`${circuit}:${question.kind}`)
                assert.equal(question.options.length, 4, question.kind)
                assert.equal(new Set(question.options.map((option) => option.latex)).size, 4, question.kind)
                assert.equal(question.options.filter((option) => option.correct).length, 1)
                for (const option of question.options) {
                    katex.renderToString(option.latex, { throwOnError: true })
                    if (option.error) {
                        errors.add(option.error)
                        assert.ok(trigonometryRaceErrorTips[option.error], option.error)
                    }
                }
                for (const language of ['eu', 'es', 'ar'] as const) {
                    for (const text of [question.prompt[language], question.solution[language]]) {
                        assert.ok(!text.includes('\\sen') && !text.includes('\\tg'), `${question.kind} ${language}: names not localized`)
                        for (const [, formula] of text.matchAll(/\$([^$]+)\$/g)) {
                            katex.renderToString(formula, { throwOnError: true })
                            assert.ok(!/[؀-ۿ]/.test(formula), formula)
                        }
                    }
                    if (language === 'ar') assert.ok(!question.prompt.ar.includes('{,}') && !question.solution.ar.includes('{,}'), question.kind)
                }
                // Basque: no case ending right after a formula
                assert.ok(!/\$-(?:k|ra|tik|n|ko|an|ean|z)\b/.test(question.prompt.eu), question.prompt.eu)
                const right = question.options.find((option) => option.correct)!
                const value = valueOf(right.latex)
                assert.ok(close(value, expected(question)), `${question.kind} ${JSON.stringify(question.meta)} ${right.latex} ${expected(question)}`)
                assert.ok(close(toNumber(question.answer), value, 1e-4), `${question.kind} answer ${toNumber(question.answer)} ${value}`)
                if (question.writable) assert.equal(checkTrigonometryPitAnswer(question, typed(right.latex)), 'correct', `${question.kind} ${typed(right.latex)}`)
                else assert.ok(/\\sqrt|\\pi/.test(question.options.map((option) => option.latex).join(' ')), `${question.kind}: only roots or π are chosen instead of written`)
                // Every wrong option is a different value
                for (const option of question.options.filter((item) => !item.correct)) assert.ok(!close(valueOf(option.latex), value, 1e-9), `${question.kind} ${option.latex}`)
            }
        }
    }
    const all = ['0:ratio', '0:notable', '0:hypotenuse', '1:one-ratio', '1:to-decimal', '1:to-minutes', '1:calculator', '2:side', '2:elevation', '2:depression', '2:angle', '3:double', '3:triangle-area', '3:parallelogram', '4:sign', '4:reduce', '4:to-radians', '4:to-degrees']
    for (const kind of all) assert.ok(kinds.has(kind), `never generated: ${kind}`)
    for (const error of Object.keys(trigonometryRaceErrorTips)) assert.ok(errors.has(error), `never used: ${error}`)
    for (let circuit = 0; circuit < TRIGONOMETRY_RACE_CIRCUITS; circuit += 1) assert.ok(generateTrigonometryRaceQuestion(createRandom(circuit), circuit, 1, true).writable)
})

test('trigonometria 4. DBH ak race: helpers', () => {
    const classic = doubleObservation(20, 30, 60)
    assert.ok(close(classic.x, 10) && close(classic.h, 10 * Math.sqrt(3)))
    assert.deepEqual([30, 150, 210, 330].map(reduced), [30, 30, 30, 30])
    assert.equal(checkTrigonometryPitAnswer(generateTrigonometryRaceQuestion(createRandom(5), 2, 0, true), 'zzz'), 'unreadable')
})

test('trigonometria 4. DBH ak memory: every card has exactly one partner and the pair is true', () => {
    for (let level = 0; level < trigonometryMemoryLevels.length; level += 1) {
        for (let seed = 1; seed <= 60; seed += 1) {
            const cards = createTrigonometryMemoryBoard(createRandom(seed * 7 + level), level)
            assert.equal(cards.length, TRIGONOMETRY_MEMORY_PAIRS * 2)
            assert.equal(new Set(cards.map((card) => card.latex)).size, cards.length)
            for (const card of cards) {
                katex.renderToString(card.latex, { throwOnError: true })
                katex.renderToString(card.explain!, { throwOnError: true })
                assert.ok(!/\\(?:sin|sen|tg|tan|cos)/.test(card.latex), 'cards carry values only')
            }
            for (const card of cards.filter((item) => item.id.endsWith('-q'))) {
                const answer = cards.find((item) => item.setId === card.setId && item.id.endsWith('-a'))!.latex
                const numbers = (card.latex.match(/\d+/g) ?? []).map(Number)
                if (trigonometryMemoryLevels[level] === 'radians') {
                    assert.ok(close(valueOf(answer), rad(numbers[0])), `${card.latex} ${answer}`)
                } else if (trigonometryMemoryLevels[level] === 'minutes') {
                    assert.ok(close(valueOf(answer.replace('^{\\circ}', '')), numbers[0] + numbers[1] / 60), `${card.latex} ${answer}`)
                } else {
                    const [b, c, angle] = numbers
                    assert.ok(close(valueOf(answer.replace('S{=}', '')), (b * c * Math.sin(rad(angle))) / 2), `${card.latex} ${answer}`)
                }
            }
        }
    }
})
