import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { checkChain, checkRealsQuestion, typed, valueOf } from './helpers/realsRaceCheck.ts'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import { toNumber } from '../src/features/unit-v2/math/fraction.ts'
import type { RealsRaceQuestion } from '../src/pages/dbh4-aplikatuak-errealak/games/race.ts'
import { createPercentMemoryBoard, PERCENT_MEMORY_PAIRS, percentMemoryLevels } from '../src/pages/dbh4-akademikoak-errealak/games/boards.ts'
import { percentGameModeForPath, percentGameProgressIds, percentGames } from '../src/pages/dbh4-akademikoak-errealak/games/info.ts'
import { checkPercentPitAnswer, generatePercentRaceQuestion, PERCENT_RACE_CIRCUITS, percentParTime, percentRaceErrorTips, type PercentRaceMeta, type PercentRaceQuestion } from '../src/pages/dbh4-akademikoak-errealak/games/race.ts'
import { realsPercentLabChallengeIds } from '../src/pages/dbh4-akademikoak-errealak/lab/labTools.ts'
import { chainedIndex, compoundFinal, simpleInterest, variationIndex } from '../src/pages/dbh4-akademikoak-errealak/percent.ts'

const newKinds = ['percent-of', 'index', 'chained', 'inverse', 'simple', 'compound', 'sqrt-floor', 'hypotenuse']
const value = (latex: string) => valueOf(latex)!

/** The percentage and interest questions, rebuilt from their meta */
function checkPercent(question: PercentRaceQuestion) {
    const meta = question.meta as PercentRaceMeta
    const right = question.options.findIndex((option) => option.correct)
    const wrong = question.options.filter((option) => !option.correct)
    assert.equal(question.options.length, 4, question.kind)
    assert.equal(new Set(question.options.map((option) => option.latex)).size, 4, question.kind)
    for (const option of wrong) assert.ok(percentRaceErrorTips[option.error!], `${question.kind}: ${option.error}`)
    let expected: number
    switch (meta.kind) {
        case 'percent-of': expected = (meta.p / 100) * meta.amount; break
        case 'index': expected = variationIndex(meta.change); assert.equal(expected > 1, meta.change > 0); break
        case 'chained': expected = (chainedIndex(meta.changes) - 1) * 100; assert.notEqual(expected, meta.changes[0] + meta.changes[1]); break
        case 'inverse': expected = meta.initial; assert.ok(Math.abs(meta.initial * variationIndex(meta.change) - meta.final) < 1e-9); break
        case 'simple':
            assert.ok(Math.abs(simpleInterest(meta.capital, meta.rate, meta.years) - meta.interest) < 1e-9)
            expected = meta.ask === 'rate' ? meta.rate : meta.interest
            break
        case 'compound': expected = compoundFinal(meta.capital, meta.rate, meta.years); assert.equal(meta.final, expected); break
        case 'sqrt-floor': expected = meta.low; assert.ok(meta.low ** 2 < meta.n && meta.n < (meta.low + 1) ** 2); break
        case 'hypotenuse': expected = meta.a ** 2 + meta.b ** 2; break
    }
    assert.ok(Math.abs(value(question.options[right].latex) - expected) < 1e-9, `${question.kind}: ${question.options[right].latex} ≠ ${expected}`)
    for (const option of wrong) assert.ok(Math.abs(value(option.latex) - expected) > 1e-9, `${question.kind}: ${option.latex} is also right`)
    if (question.writable) {
        assert.ok(Math.abs(toNumber(question.answer) - expected) < 1e-9)
        assert.equal(checkPercentPitAnswer(question, typed(question.answer)), 'correct', question.kind)
    }
    for (const language of ['eu', 'es', 'ar'] as const) {
        for (const text of [question.prompt[language], question.solution[language]]) {
            for (const [, formula] of text.matchAll(/\$([^$]+)\$/g)) katex.renderToString(formula, { throwOnError: true, strict: 'error' })
            if (language === 'ar') assert.ok(!text.includes('{,}'), text)
        }
    }
    for (const option of question.options) katex.renderToString(option.latex, { throwOnError: true, strict: 'error' })
    return checkChain(question.solution.es, question.kind)
}

test('errealak eta ehunekoak 4. DBH games: levels, ids and routes', () => {
    assert.equal(percentGames.length, 3)
    assert.equal(percentGames[0].levels.length, PERCENT_RACE_CIRCUITS)
    assert.equal(percentGames.find((game) => game.id === 'memory')!.levels.length, percentMemoryLevels.length)
    assert.equal(new Set(percentGameProgressIds).size, percentGameProgressIds.length)
    assert.ok(!percentGameProgressIds.some((id) => realsPercentLabChallengeIds.includes(id)))
    const stages = ['rational', 'reals', 'approx', 'percent', 'interest']
    for (const game of percentGames) for (const level of game.levels) assert.ok(stages.includes(level.stage), `${game.id} ${level.stage}`)
    assert.equal(percentGameModeForPath('/matematika/dbh4-akademikoak/numeros-reales/juegos/recta'), 'place')
    assert.equal(percentGameModeForPath('/matematika/dbh4-akademikoak/numeros-reales/jokuak/lasterketa'), 'race')
    assert.equal(percentGameModeForPath('/matematika/dbh4-akademikoak/numeros-reales/jokuak'), 'hub')
})

test('errealak eta ehunekoak 4. DBH race: every question is right and every wrong option is really wrong', () => {
    const kinds = new Set<string>()
    let chains = 0
    for (let circuit = 0; circuit < PERCENT_RACE_CIRCUITS; circuit += 1) {
        for (let seed = 1; seed <= 200; seed += 1) {
            const random = createRandom(seed * 13 + circuit)
            for (const tier of [0, 1, 2] as const) {
                for (const requireWritable of [false, true]) {
                    const question = generatePercentRaceQuestion(random, circuit, tier, requireWritable)
                    assert.equal(question.circuit, circuit)
                    if (requireWritable) assert.ok(question.writable, `${circuit} ${question.kind}`)
                    kinds.add(question.meta.kind)
                    chains += newKinds.includes(question.meta.kind) ? checkPercent(question) : checkRealsQuestion(question as unknown as RealsRaceQuestion, percentRaceErrorTips, checkPercentPitAnswer as never)
                }
            }
        }
        assert.ok(percentParTime(circuit) > 60000)
    }
    for (const kind of [...newKinds, 'kind-pick', 'expansion', 'generatrix', 'irrational-pick', 'sqrt-between', 'interval', 'interval-count', 'round', 'abs-error']) assert.ok(kinds.has(kind), `never generated: ${kind}`)
    assert.ok(chains > 1500, `only ${chains} worked lines checked`)
})

test('errealak eta ehunekoak 4. DBH memory: every card has exactly one partner and the pair is true', () => {
    for (let level = 0; level < percentMemoryLevels.length; level += 1) {
        for (let seed = 1; seed <= 80; seed += 1) {
            const cards = createPercentMemoryBoard(createRandom(seed * 7 + level), level)
            assert.equal(cards.length, PERCENT_MEMORY_PAIRS * 2)
            assert.equal(new Set(cards.map((card) => card.latex)).size, cards.length)
            for (const card of cards.filter((item) => item.id.endsWith('-q'))) {
                const partner = cards.find((item) => item.setId === card.setId && item.id.endsWith('-a'))!
                katex.renderToString(card.latex, { throwOnError: true, strict: 'error' })
                katex.renderToString(card.explain!, { throwOnError: true, strict: 'error' })
                if (percentMemoryLevels[level] === 'index') {
                    const change = value(card.latex.replace('\\,\\%', ''))
                    assert.ok(Math.abs(value(partner.latex.replace('\\times ', '')) - variationIndex(change)) < 1e-9, card.latex)
                } else if (percentMemoryLevels[level] === 'intervals') {
                    assert.equal(card.explain, `${card.latex}\\ \\to\\ ${partner.latex}`)
                    assert.ok(card.latex.includes('x'))
                }
            }
        }
    }
})
