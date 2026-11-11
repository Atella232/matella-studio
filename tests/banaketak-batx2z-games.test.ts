import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import type { Tier } from '../src/features/unit-v2/games/raceCore.ts'
import { fraction, toNumber } from '../src/features/unit-v2/math/fraction.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { binomialPmf, choose } from '../src/pages/batx2-zientziak-banaketak/binomial.ts'
import { AREA_ROUNDS, createAreaRounds, regionValue } from '../src/pages/batx2-zientziak-banaketak/games/areaGame.ts'
import { BINOMIAL_ROUNDS, BINOMIAL_VERDICTS, binomialLatex, createBinomialRounds } from '../src/pages/batx2-zientziak-banaketak/games/binomialGame.ts'
import { createDistributionsBatx2MemoryBoard, DISTRIBUTIONS_BATX2_MEMORY_PAIRS, distributionsBatx2MemoryLevels } from '../src/pages/batx2-zientziak-banaketak/games/boards.ts'
import { createDistributionsBatx2DetectiveCases, DISTRIBUTIONS_BATX2_DETECTIVE_CASES, distributionsBatx2DetectiveLevels, distributionsBatx2DetectiveNames, distributionsBatx2DetectiveTips } from '../src/pages/batx2-zientziak-banaketak/games/detective.ts'
import { createHuntRounds, HUNT_ROUNDS } from '../src/pages/batx2-zientziak-banaketak/games/huntGame.ts'
import { distributionsBatx2GameModeForPath, distributionsBatx2GameProgressIds, distributionsBatx2Games, distributionsBatx2GameSlugs } from '../src/pages/batx2-zientziak-banaketak/games/info.ts'
import { checkDistributionsBatx2PitAnswer, DISTRIBUTIONS_BATX2_RACE_CIRCUITS, distributionsBatx2RaceErrorTips, generateDistributionsBatx2RaceQuestion } from '../src/pages/batx2-zientziak-banaketak/games/race.ts'
import { above, below, between, tableValue } from '../src/pages/batx2-zientziak-banaketak/normal.ts'
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
        const formulas = (value: string) => [...value.matchAll(/\$([^$]+)\$/g)].map((match) => match[1].replace(/\{,\}/g, '.')).sort()
        for (const language of ['eu', 'en', 'ar'] as const) assert.deepEqual(formulas(text[language]), formulas(text.es), `${language}: ${text[language]}`)
        // No Basque suffix glued to a number or to a formula
        assert.ok(!/\d[a-zñ]/.test(text.eu.replace(/\$[^$]+\$/g, '')), text.eu)
        assert.ok(!/§(?:ri|ren|rekin|z|ra|tik|ei|ek|ak|en|ko|an)(?![a-zA-Z])/.test(text.eu.replace(/\$[^$]+\$/g, '§')), text.eu)
        // Decimals in the words, and the euro first in English
        const words = (value: string) => value.replace(/\$[^$]+\$/g, ' ')
        assert.ok(!/\d\.\d/.test(words(text.es)) && !/\d\.\d/.test(words(text.eu)), text.es)
        assert.ok(!/\d,\d/.test(words(text.en)) && !/\d,\d/.test(words(text.ar)), text.en)
        assert.ok(!/\d\s*€/.test(words(text.en)), text.en)
        // MathText turns «:» into ÷ inside formulas
        for (const [, formula] of text.es.matchAll(/\$([^$]+)\$/g)) assert.ok(!formula.includes(':'), formula)
    }
}

/** Every equality of a worked line with numbers is right (decimals inside \frac are read with the point) */
function checkWorked(latex: string, where: string) {
    let read = 0
    for (const part of latex.replace(/\{,\}/g, '.').split(/\\qquad|\\quad|\\ \\to\\ |\\to|,\\ /)) {
        const values = part.split(/\\le|\\ge|\\neq|<|>|\\approx/).at(-1)!.split('=').map((side) => evaluate(side)).filter((value): value is number => value !== null)
        if (values.length < 2) continue
        assert.ok(values.every((value) => near(value, values[0])), `${where}: ${part} → ${values.join(' / ')}`)
        read += 1
    }
    return read
}

/** A LaTeX number: 0{,}1587 → 0.1587, −1{,}28 → −1.28 */
const numberOf = (latex: string) => Number(latex.replace('{,}', '.').replace('−', '-'))

test('banaketak batx2 z games: the hub, its levels and progress ids', () => {
    assert.deepEqual(distributionsBatx2Games.map((game) => game.id), ['race', 'binomial', 'area', 'hunt', 'detective', 'memory'])
    assert.equal(new Set(distributionsBatx2GameProgressIds).size, distributionsBatx2GameProgressIds.length)
    // The unit's block of ids: games go from 129401 to 129899
    for (const id of distributionsBatx2GameProgressIds) assert.ok(id >= 129401 && id <= 129899, `${id}`)
    const stages = ['review', 'discrete', 'binomial', 'normal', 'approximation']
    for (const game of distributionsBatx2Games) {
        assert.ok(game.levels.length >= 3, game.id)
        for (const level of game.levels) {
            assert.ok(stages.includes(level.stage), `${game.id}: ${level.stage}`)
            for (const language of languages) assert.ok(!level.description[language].includes('$') && !level.title[language].includes('$'), `${game.id} ${language}`)
        }
        checkTexts([game.title, game.tagline, game.skills, ...game.levels.flatMap((level) => [level.title, level.description])])
        assert.equal(distributionsBatx2GameModeForPath(`/matematika/batx2-zientziak/binomial-normal/jokuak/${distributionsBatx2GameSlugs[game.id]}`), game.id)
    }
    assert.equal(distributionsBatx2GameModeForPath('/matematika/batx2-zientziak/binomial-normal/jokuak'), 'hub')
    assert.equal(distributionsBatx2GameModeForPath('/matematika/batx2-zientziak/binomial-normal/juegos/que-area'), 'area')
})

test('banaketak batx2 z games: every race question has one right option, worked out from its numbers', () => {
    const kinds = new Set<string>()
    for (let circuit = 0; circuit < DISTRIBUTIONS_BATX2_RACE_CIRCUITS; circuit += 1) {
        for (const tier of [0, 1, 2] as Tier[]) {
            for (let seed = 1; seed <= 60; seed += 1) {
                const question = generateDistributionsBatx2RaceQuestion(createRandom(seed * 7919 + circuit * 31 + tier), circuit, tier)
                kinds.add(question.kind)
                assert.equal(question.circuit, circuit)
                assert.equal(question.options.length, 4, question.kind)
                assert.equal(question.options.filter((option) => option.correct).length, 1, question.kind)
                assert.equal(new Set(question.options.map((option) => option.latex)).size, 4, `${question.kind}: ${question.options.map((option) => option.latex).join(' | ')}`)
                for (const option of question.options) render(option.latex)
                checkTexts([question.prompt, question.solution])
                const right = question.options.find((option) => option.correct)!
                const typed = right.latex.replace('{,}', ',').replace(/\\frac\{(\d+)\}\{(\d+)\}/, '$1/$2')
                assert.equal(checkDistributionsBatx2PitAnswer(question, typed), 'correct', `${question.kind}: ${right.latex}`)
                for (const option of question.options.filter((item) => !item.correct)) assert.ok(option.error && distributionsBatx2RaceErrorTips[option.error], question.kind)
                if (!['above', 'negative', 'central', 'approx', 'edge', 'sigma'].includes(question.kind)) assert.ok(checkWorked(question.solution.es.replace(/\$/g, ''), question.kind) >= 1, `${question.kind}: ${question.solution.es}`)
                // The right answer, recomputed from the numbers of the question
                const m = question.meta
                const answer = toNumber(question.answer)
                const expected: Record<string, () => number> = {
                    coefficient: () => choose(m.n, m.k),
                    'table-mean': () => (m.low * m.share + m.high * (10 - m.share)) / 10,
                    missing: () => 1 - (m.a + m.b + m.c) / 10,
                    mean: () => (m.b + 2 * m.c) / 10,
                    gain: () => m.prize / m.faces - m.cost,
                    pmf: () => toNumber(binomialPmf(m.n, fraction(1, 2), m.k)),
                    'binomial-mean': () => (m.n * m.p) / 10,
                    'binomial-variance': () => (m.n * m.p * (10 - m.p)) / 100,
                    'at-least': () => 1 - (1 - m.p / 10) ** m.n,
                    above: () => above(m.k / 100) / 10_000,
                    negative: () => below(-m.k / 100) / 10_000,
                    central: () => between(-m.k / 100, m.k / 100) / 10_000,
                    score: () => (m.x - m.mean) / m.sd,
                    sigma: () => Math.sqrt((m.n * (m.p / 100) * (1 - m.p / 100))),
                    edge: () => m.edge / 10,
                    approx: () => below(Math.round(((m.k + 0.5 - 50) / 5) * 100) / 100) / 10_000
                }
                assert.ok(near(answer, expected[question.kind]()), `${question.kind}: ${answer}`)
            }
        }
    }
    assert.equal(kinds.size, 16)
})

test('banaketak batx2 z games: ¿es binomial?', () => {
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 40; seed += 1) {
            const rounds = createBinomialRounds(createRandom(seed * 37 + level), level)
            assert.equal(rounds.length, BINOMIAL_ROUNDS)
            assert.equal(new Set(rounds.map((round) => round.situation.text.es)).size, BINOMIAL_ROUNDS)
            if (level === 0) for (const verdict of BINOMIAL_VERDICTS) assert.ok(rounds.some((round) => round.situation.verdict === verdict), verdict)
            for (const round of rounds) {
                checkTexts([round.situation.text])
                assert.equal(new Set(round.options).size, round.options.length)
                if (level === 0) {
                    assert.equal(round.options[round.answer], round.situation.verdict)
                    continue
                }
                const { n, p } = round.situation
                assert.ok(n && p)
                for (const option of round.options) render(option)
                if (level === 1) assert.equal(round.options[round.answer], binomialLatex(n, p))
                if (level === 2) {
                    // The right expression is P(X = k), and the other two are not
                    const exact = toNumber(binomialPmf(n, fraction(p.numerator, p.denominator), round.k!))
                    const value = (latex: string) => evaluate(latex.replace(/\{,\}/g, '.').replace(/\\binom\{(\d+)\}\{(\d+)\}/, (_, a, b) => String(choose(Number(a), Number(b)))))!
                    assert.ok(near(value(round.options[round.answer]), exact), round.options[round.answer])
                    for (const [index, option] of round.options.entries()) if (index !== round.answer) assert.ok(!near(value(option), exact), option)
                }
            }
        }
    }
})

test('banaketak batx2 z games: ¿qué área es?', () => {
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 40; seed += 1) {
            const rounds = createAreaRounds(createRandom(seed * 43 + level), level)
            assert.equal(rounds.length, AREA_ROUNDS)
            for (const round of rounds) {
                assert.equal(round.regions.length, 3)
                assert.equal(regionValue(round.regions[round.answer]), round.value)
                // The wrong regions shade a different area (never the right one by chance)
                for (const [index, region] of round.regions.entries()) if (index !== round.answer) assert.notEqual(regionValue(region), round.value, round.asked)
                render(round.asked)
                render(round.worked)
                if (level === 2 || round.worked.includes('=1-')) assert.ok(checkWorked(round.worked, round.asked) >= 1, round.worked)
                // The asked probability, read back from its own numbers
                const numbers = [...round.asked.matchAll(/-?\d+(?:\{,\}\d+)?/g)].map((match) => numberOf(match[0]))
                const expected = level === 2 ? between(numbers[0], numbers[1]) : round.asked.includes('\\le') ? below(numbers[0]) : above(numbers[0])
                assert.equal(round.value, expected, round.asked)
                if (level === 1) assert.ok(numbers[0] < 0)
                if (level === 0) assert.ok(numbers[0] > 0)
            }
        }
    }
})

test('banaketak batx2 z games: busca en la tabla', () => {
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 40; seed += 1) {
            const rounds = createHuntRounds(createRandom(seed * 59 + level), level)
            assert.equal(rounds.length, HUNT_ROUNDS)
            for (const round of rounds) {
                assert.equal(round.options.length, 3)
                assert.equal(new Set(round.options).size, 3)
                const { z, side, p } = round.meta
                assert.ok(Math.abs(z) >= 0.1 && Math.abs(z) <= 2.5)
                assert.equal(p, side === 'below' ? below(z) : above(z))
                // Only one z of the table gives that probability on that side
                const same = Array.from({ length: 501 }, (_, index) => (index - 250) / 100).filter((other) => (side === 'below' ? below(other) : above(other)) === p)
                assert.deepEqual(same, [Math.round(z * 100) / 100], `${p}`)
                const right = numberOf(round.options[round.answer])
                assert.ok(near(right, round.unknown === 'k' ? z : round.meta.x!), round.options[round.answer])
                if (level === 0) assert.ok(z > 0 && side === 'below')
                if (level === 1) assert.ok(side === 'above' || z < 0)
                for (const latex of [...round.data, ...round.options, ...round.worked]) render(latex)
                for (const latex of round.worked) checkWorked(latex, latex)
                // The table is read where the worked lines say
                assert.ok(round.worked.some((latex) => latex.includes(String(tableValue(Math.abs(z))).padStart(4, '0'))), round.worked.join(' | '))
            }
        }
    }
})

test('banaketak batx2 z games: the detective has one wrong line, with a typical mistake of the unit', () => {
    assert.deepEqual(Object.keys(distributionsBatx2DetectiveNames).sort(), distributionsBatx2DetectiveLevels.flat().sort())
    checkTexts([...Object.values(distributionsBatx2DetectiveNames), ...Object.values(distributionsBatx2DetectiveTips)])
    const seen = new Set<string>()
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 40; seed += 1) {
            const cases = createDistributionsBatx2DetectiveCases(createRandom(seed * 17 + level), level)
            assert.equal(cases.length, DISTRIBUTIONS_BATX2_DETECTIVE_CASES)
            for (const item of cases) {
                seen.add(item.error)
                assert.equal(item.lines.length, 3)
                assert.ok(item.wrong >= 0 && item.wrong < 3)
                assert.ok(item.options.includes(item.error) && item.options.length === 3)
                assert.ok(!near(item.right, item.reached), `${item.error}: ${item.right}`)
                checkTexts([item.problem, ...item.lines.map((entry) => entry.label)])
                for (const entry of item.lines) render(entry.latex)
                render(item.fix)
                for (const entry of item.lines) checkWorked(entry.latex, `${item.error}: ${entry.latex}`)
                checkWorked(item.fix, `${item.error}: ${item.fix}`)
            }
        }
    }
    assert.equal(seen.size, 12)
})

test('banaketak batx2 z games: memory pairs have one partner each, and each pair is right', () => {
    for (let level = 0; level < distributionsBatx2MemoryLevels.length; level += 1) {
        for (let seed = 1; seed <= 40; seed += 1) {
            const cards = createDistributionsBatx2MemoryBoard(createRandom(seed * 11 + level), level)
            assert.equal(cards.length, 2 * DISTRIBUTIONS_BATX2_MEMORY_PAIRS)
            assert.equal(new Set(cards.map((card) => card.latex)).size, cards.length)
            for (const card of cards) {
                render(card.latex)
                assert.equal(cards.filter((other) => other.setId === card.setId).length, 2)
            }
            for (let set = 0; set < DISTRIBUTIONS_BATX2_MEMORY_PAIRS; set += 1) {
                const [first, second] = cards.filter((card) => card.setId === set)
                const question = first.id.endsWith('-q') ? first.latex : second.latex
                const answer = (first.id.endsWith('-a') ? first.latex : second.latex).split('=').at(-1)!
                const numbers = [...question.matchAll(/-?\d+(?:\{,\}\d+)?/g)].map((match) => numberOf(match[0]))
                const value = numberOf(answer)
                if (level === 0) assert.ok(near(value, numbers[0] * numbers[1]), `${question} ${answer}`)
                if (level === 1) assert.equal(Math.round(value * 10_000), above(numbers[0]), `${question} ${answer}`)
                if (level === 2) assert.ok(near(value, (numbers[2] - numbers[0]) / numbers[1]), `${question} ${answer}`)
            }
        }
    }
})
