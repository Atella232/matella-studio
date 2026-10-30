import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import { toNumber } from '../src/features/unit-v2/math/fraction.ts'
import { AREAS_SIMILARITY_MEMORY_PAIRS, areasSimilarityMemoryLevels, createAreasSimilarityMemoryBoard } from '../src/pages/dbh4-akademikoak-areak/games/boards.ts'
import { areasSimilarityGameModeForPath, areasSimilarityGameProgressIds, areasSimilarityGames } from '../src/pages/dbh4-akademikoak-areak/games/info.ts'
import {
    AREAS_SIMILARITY_RACE_CIRCUITS,
    areasSimilarityParTime,
    areasSimilarityRaceErrorTips,
    checkAreasSimilarityPitAnswer,
    generateAreasSimilarityRaceQuestion,
    type AreasSimilarityRaceQuestion
} from '../src/pages/dbh4-akademikoak-areak/games/race.ts'
import { areasSimilarityLabChallengeIds } from '../src/pages/dbh4-akademikoak-areak/lab/labTools.ts'

const close = (a: number, b: number) => Math.abs(a - b) < 1e-6 * Math.max(1, Math.abs(b))
const valueOf = (latex: string) => Number(latex.replace(/\\,/g, '').replace('{,}', '.'))
const typed = (latex: string) => latex.replace(/\\,/g, '').replace('{,}', ',')
const PI = 3.14

/** The answer recomputed from the numbers of the prompt */
function expected(question: AreasSimilarityRaceQuestion): number {
    const m = question.meta
    switch (question.kind) {
        case 'crown': return PI * (m.R ** 2 - m.r ** 2)
        case 'sector': return (PI * m.r ** 2 * m.angle) / 360
        case 'segment': return (PI * m.r ** 2) / 4 - m.r ** 2 / 2
        case 'pyramid-area': return 2 * m.side * Math.hypot(m.height, m.side / 2) + m.side ** 2
        case 'cone-area': return PI * m.r * Math.hypot(m.height, m.r) + PI * m.r ** 2
        case 'zone': return 2 * PI * m.R * m.thickness
        case 'hemisphere': return 3 * PI * m.r ** 2
        case 'cone-volume': return (PI * m.r ** 2 * Math.sqrt(m.g ** 2 - m.r ** 2)) / 3
        case 'pyramid-volume': return (m.side ** 2 * Math.sqrt(m.apothem ** 2 - (m.side / 2) ** 2)) / 3
        case 'sphere-volume': return (4 * PI * m.r ** 3) / 3
        case 'altitude': return Math.sqrt(m.m * m.n)
        case 'leg': return Math.sqrt(m.a * m.n)
        case 'hypotenuse': return m.m + m.height ** 2 / m.m
        case 'frustum': {
            // Big cone minus small cone, with the small one's height from similarity
            const apex = (m.r * m.height) / (m.R - m.r)
            return (PI * (m.R ** 2 * (apex + m.height) - m.r ** 2 * apex)) / 3
        }
        case 'scale-area': return (m.area * m.n ** 2) / 10_000
        case 'scale-volume': return (m.volume * m.n ** 3) / 1_000_000
        case 'volume-ratio': return Math.cbrt(m.big / m.small)
        default: throw new Error(`unchecked kind ${question.kind}`)
    }
}

test('areak 4. DBH ak games: levels, ids and routes', () => {
    assert.equal(areasSimilarityGames.length, 2)
    assert.equal(areasSimilarityGames[0].levels.length, AREAS_SIMILARITY_RACE_CIRCUITS)
    assert.equal(areasSimilarityGames[1].levels.length, areasSimilarityMemoryLevels.length)
    assert.equal(new Set(areasSimilarityGameProgressIds).size, areasSimilarityGameProgressIds.length)
    assert.ok(!areasSimilarityGameProgressIds.some((id) => areasSimilarityLabChallengeIds.includes(id)))
    const stages = ['plane-areas', 'solid-areas', 'volumes', 'similarity', 'ratios']
    for (const game of areasSimilarityGames) for (const level of game.levels) assert.ok(stages.includes(level.stage), `${game.id} ${level.stage}`)
    assert.deepEqual(areasSimilarityGames[0].levels.map((level) => level.stage), stages)
    assert.equal(areasSimilarityGameModeForPath('/matematika/dbh4-akademikoak/areas-volumenes-semejanza/juegos/carrera'), 'race')
    assert.equal(areasSimilarityGameModeForPath('/matematika/dbh4-akademikoak/areas-volumenes-semejanza/jokuak/memoria'), 'memory')
})

test('areak 4. DBH ak race: valid options and every new answer recomputed', () => {
    const kinds = new Set<string>()
    const errors = new Set<string>()
    for (let circuit = 0; circuit < AREAS_SIMILARITY_RACE_CIRCUITS; circuit += 1) {
        assert.ok(areasSimilarityParTime(circuit) > 60000)
        for (let seed = 1; seed <= 200; seed += 1) {
            const random = createRandom(seed * 37 + circuit)
            for (const tier of [0, 1, 2] as const) {
                const question = generateAreasSimilarityRaceQuestion(random, circuit, tier)
                assert.equal(question.circuit, circuit)
                kinds.add(`${circuit}:${question.kind}`)
                assert.equal(question.options.length, 4, question.kind)
                assert.equal(new Set(question.options.map((option) => option.latex)).size, 4, question.kind)
                assert.equal(question.options.filter((option) => option.correct).length, 1)
                for (const option of question.options) {
                    katex.renderToString(option.latex, { throwOnError: true })
                    if (option.error) {
                        errors.add(option.error)
                        assert.ok(areasSimilarityRaceErrorTips[option.error], option.error)
                    }
                }
                for (const language of ['eu', 'es', 'en', 'ar'] as const) {
                    for (const text of [question.prompt[language], question.solution[language]]) {
                        for (const [, formula] of text.matchAll(/\$([^$]+)\$/g)) {
                            katex.renderToString(formulaFor(language, formula), { throwOnError: true })
                            assert.ok(!/[؀-ۿ]/.test(formula), formula)
                        }
                    }
                    if (language === 'ar') assert.ok(!question.prompt.ar.includes('{,}') && !question.solution.ar.includes('{,}'), question.kind)
                }
                const right = question.options.find((option) => option.correct)!
                if (question.writable) assert.equal(checkAreasSimilarityPitAnswer(question, typed(right.latex)), 'correct', `${question.kind} ${typed(right.latex)}`)
                if (question.kind.includes(':')) continue
                // Basque: no case ending right after a number written in a formula (own questions)
                assert.ok(!/\$-(?:k|ra|tik|n|ko|an|ean|z)\b/.test(question.prompt.eu), question.prompt.eu)
                const value = toNumber(question.answer)
                assert.ok(close(valueOf(right.latex), value), `${question.kind} ${right.latex}`)
                assert.ok(close(value, expected(question)), `${question.kind} ${JSON.stringify(question.meta)} ${value} ${expected(question)}`)
                // Every wrong option is a different value
                for (const option of question.options.filter((item) => !item.correct)) assert.ok(!close(valueOf(option.latex), value), `${question.kind} ${option.latex}`)
            }
        }
    }
    const own = ['0:crown', '0:sector', '0:segment', '1:pyramid-area', '1:cone-area', '1:zone', '1:hemisphere', '2:cone-volume', '2:pyramid-volume', '2:sphere-volume', '3:altitude', '3:leg', '3:hypotenuse', '4:frustum', '4:scale-area', '4:scale-volume', '4:volume-ratio']
    for (const kind of own) assert.ok(kinds.has(kind), `never generated: ${kind}`)
    for (const circuit of [0, 1, 2, 3, 4]) assert.ok([...kinds].some((kind) => kind.startsWith(`${circuit}:`) && kind.split(':').length > 2), `circuit ${circuit} borrows nothing`)
    for (const error of ['crown-radii', 'arc-not-area', 'segment-sector', 'height-not-apothem', 'height-not-generatrix', 'whole-sphere', 'cone-third', 'no-root', 'other-projection', 'one-part', 'r-not-squared', 'r-not-cubed', 'cube-root']) assert.ok(errors.has(error), `never used: ${error}`)
    // A written answer can always be asked
    for (let circuit = 0; circuit < AREAS_SIMILARITY_RACE_CIRCUITS; circuit += 1) assert.ok(generateAreasSimilarityRaceQuestion(createRandom(circuit), circuit, 1, true).writable)
})

test('areak 4. DBH ak memory: every card has exactly one partner and the pair is true', () => {
    for (let level = 0; level < areasSimilarityMemoryLevels.length; level += 1) {
        for (let seed = 1; seed <= 60; seed += 1) {
            const cards = createAreasSimilarityMemoryBoard(createRandom(seed * 7 + level), level)
            assert.equal(cards.length, AREAS_SIMILARITY_MEMORY_PAIRS * 2)
            assert.equal(new Set(cards.map((card) => card.latex)).size, cards.length)
            for (const card of cards) {
                katex.renderToString(card.latex, { throwOnError: true })
                katex.renderToString(card.explain, { throwOnError: true })
            }
            for (const card of cards.filter((item) => item.id.endsWith('-q'))) {
                const answer = cards.find((item) => item.setId === card.setId && item.id.endsWith('-a'))!.latex
                const numbers = (card.latex.match(/\d+/g) ?? []).map(Number)
                const value = Number(answer.replace(/^h\{=\}/, '').replace(/\\pi$/, '') || '1')
                if (areasSimilarityMemoryLevels[level] === 'altitude') {
                    assert.equal(value * value, numbers[0] * numbers[1], card.latex)
                } else if (areasSimilarityMemoryLevels[level] === 'ratios') {
                    const [k] = numbers
                    assert.equal(value, card.latex.includes('V_') ? k ** 3 : k ** 2, card.latex)
                } else if (card.latex.startsWith('\\pi')) {
                    assert.equal(value, numbers[0] ** 2 * numbers[2], card.latex)
                } else if (card.latex.startsWith('\\frac{4')) {
                    assert.equal(value, (4 * numbers[1] ** 3) / 3, card.latex)
                } else {
                    assert.equal(value, (numbers[0] ** 2 * numbers[2]) / 3, card.latex)
                }
            }
        }
    }
})
