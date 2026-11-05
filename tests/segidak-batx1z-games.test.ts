import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import type { Tier } from '../src/features/unit-v2/games/raceCore.ts'
import { toExactDecimal, toNumber } from '../src/features/unit-v2/math/fraction.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { written } from '../src/pages/batx1-zientziak-errealak/games/race.ts'
import { bachSequencesGameModeForPath, bachSequencesGameProgressIds, bachSequencesGames, bachSequencesGameSlugs } from '../src/pages/batx1-zientziak-segidak/games/info.ts'
import { BACH_SEQUENCES_RACE_CIRCUITS, bachSequencesRaceErrorTips, checkBachSequencesPitAnswer, generateBachSequencesRaceQuestion } from '../src/pages/batx1-zientziak-segidak/games/race.ts'
import { createWhereRounds, fractionLatex, MINUS, NONE, PLUS, WHERE_ROUNDS } from '../src/pages/batx1-zientziak-segidak/games/where.ts'
import { BAND_ROUNDS, bandAnswer, bandGap, bandInside, bandLatex, createBandRounds, readTerm } from '../src/pages/batx1-zientziak-segidak/games/band.ts'
import { BACH_SEQUENCES_DETECTIVE_CASES, bachSequencesDetectiveLevels, bachSequencesDetectiveNames, bachSequencesDetectiveTips, createBachSequencesDetectiveCases } from '../src/pages/batx1-zientziak-segidak/games/detective.ts'
import { BACH_SEQUENCES_MEMORY_PAIRS, bachSequencesMemoryLevels, createBachSequencesMemoryBoard } from '../src/pages/batx1-zientziak-segidak/games/boards.ts'

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
        assert.ok(!/\d(?:ri|ren|rekin|ekin|ek|ak|ra|tik|z|ei|en|k)(?![a-zA-Z])/.test(text.eu.replace(/\$[^$]+\$/g, '')), text.eu)
        assert.ok(!/\$(?:ri|ren|rekin|z|ra|tik|ei)(?![a-zA-Z])/.test(text.eu), text.eu)
    }
}

test('segidak batx1 z games: the hub, its levels and progress ids', () => {
    assert.deepEqual(bachSequencesGames.map((game) => game.id), ['race', 'where', 'band', 'detective', 'memory', 'hidden', 'sorter', 'staircase'])
    assert.equal(new Set(bachSequencesGameProgressIds).size, bachSequencesGameProgressIds.length)
    for (const id of bachSequencesGameProgressIds) assert.ok(id >= 100401 && id <= 100899, `${id}`)
    const stages = ['sequences', 'progressions', 'infinite-sums', 'limits', 'number-e']
    for (const game of bachSequencesGames) {
        assert.ok(game.levels.length >= 3, game.id)
        for (const level of game.levels) assert.ok(stages.includes(level.stage), `${game.id}: ${level.stage}`)
        checkTexts([game.title, game.tagline, game.skills, ...game.levels.flatMap((level) => [level.title, level.description])])
        assert.equal(bachSequencesGameModeForPath(`/matematika/batx1-zientziak/sucesiones/jokuak/${bachSequencesGameSlugs[game.id]}`), game.id)
    }
    assert.equal(bachSequencesGameModeForPath('/matematika/batx1-zientziak/sucesiones/jokuak'), 'hub')
})

test('segidak batx1 z games: every race question has one right option, worked out from its numbers', () => {
    const kinds = new Set<string>()
    for (let circuit = 0; circuit < BACH_SEQUENCES_RACE_CIRCUITS; circuit += 1) {
        for (const tier of [0, 1, 2] as Tier[]) {
            for (let seed = 1; seed <= 60; seed += 1) {
                const question = generateBachSequencesRaceQuestion(createRandom(seed * 7919 + circuit * 31 + tier), circuit, tier)
                kinds.add(question.kind)
                assert.equal(question.circuit, circuit)
                assert.equal(question.options.length, 4, question.kind)
                assert.equal(question.options.filter((option) => option.correct).length, 1, question.kind)
                assert.equal(new Set(question.options.map((option) => option.latex)).size, 4, `${question.kind}: ${question.options.map((option) => option.latex).join(' | ')}`)
                const right = question.options.find((option) => option.correct)!
                assert.equal(right.latex, written(question.answer), question.kind)
                for (const option of question.options) render(option.latex)
                checkTexts([question.prompt, question.solution])
                const typed = question.answer.denominator === 1 ? String(question.answer.numerator) : toExactDecimal(question.answer) ?? `${question.answer.numerator}/${question.answer.denominator}`
                assert.equal(checkBachSequencesPitAnswer(question, typed), 'correct', `${question.kind}: ${typed}`)
                const { meta } = question
                const value = toNumber(question.answer)
                const fibonacci = (a1: number, a2: number, k: number) => {
                    const terms = [a1, a2]
                    while (terms.length < k) terms.push(terms[terms.length - 1] + terms[terms.length - 2])
                    return terms[k - 1]
                }
                const expected: Record<string, () => number> = {
                    term: () => meta.p * meta.n + meta.q,
                    recursion: () => 8 * meta.a1 + 7 * meta.c,
                    fibonacci: () => fibonacci(meta.a1, meta.a2, 6),
                    'arith-term': () => meta.a1 + (meta.n - 1) * meta.d,
                    'geo-term': () => meta.a1 * meta.r ** (meta.n - 1),
                    'arith-sum': () => (meta.n * (2 * meta.a1 + (meta.n - 1) * meta.d)) / 2,
                    series: () => meta.a1 / (1 - meta.sign / meta.k),
                    period: () => meta.block / 99,
                    squares: () => Array.from({ length: meta.n }, (_, i) => (i + 1) ** 2).reduce((total, square) => total + square, 0),
                    quotient: () => meta.a / meta.b,
                    lower: () => 0,
                    'from-term': () => meta.c * meta.m + 1,
                    'e-exponent': () => meta.k * meta.m,
                    'e-root': () => 1 / meta.k,
                    continuous: () => (meta.rate * meta.years) / 100
                }
                assert.ok(expected[question.kind], `no check for ${question.kind}`)
                assert.ok(Math.abs(value - expected[question.kind]()) < 1e-9, `${question.kind}: ${value} ≠ ${expected[question.kind]()}`)
            }
        }
    }
    assert.equal(kinds.size, 15)
    checkTexts(Object.values(bachSequencesRaceErrorTips))
})

test('segidak batx1 z games: ¿hacia dónde va?', () => {
    assert.equal(fractionLatex(6, 4), '\\frac{3}{2}')
    assert.equal(fractionLatex(-4, 2), '-2')
    // The destination from the terms themselves: a term far along, and the next one
    const numeric = (latex: string): number | null => {
        if (latex === PLUS) return Number.POSITIVE_INFINITY
        if (latex === MINUS) return Number.NEGATIVE_INFINITY
        const fraction = latex.match(/^(-)?\\frac\{(\d+)\}\{(\d+)\}$/)
        if (fraction) return (fraction[1] ? -1 : 1) * Number(fraction[2]) / Number(fraction[3])
        if (/^-?\d+$/.test(latex)) return Number(latex)
        const power = latex.match(/^e\^\{(\d+)\}$/)
        if (power) return Math.E ** Number(power[1])
        const root = latex.match(/^e\^\{\\frac\{1\}\{(\d+)\}\}$/)
        if (root) return Math.E ** (1 / Number(root[1]))
        return null
    }
    const evaluate = (latex: string, n: number): number => {
        const js = latex
            .replace(/\\left|\\right/g, '')
            .replace(/\\cdot/g, '*')
            .replace(/(\d)n/g, '$1*n')
            .replace(/\)n/g, ')*n')
            .replace(/\\frac\{([^{}]+)\}\{([^{}]+)\}/g, '(($1)/($2))')
            .replace(/\\frac\{([^{}]+)\}\{([^{}]+)\}/g, '(($1)/($2))')
            .replace(/\^\{([^{}]+)\}/g, '**($1)')
            .replace(/\^n/g, '**n')
            .replace(/\^(\d)/g, '**$1')
            .replace(/(\d)\(/g, '$1*(')
            .replace(/\)\(/g, ')*(')
        return Function('n', `return ${js}`)(n) as number
    }
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 80; seed += 1) {
            const rounds = createWhereRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, WHERE_ROUNDS)
            assert.equal(new Set(rounds.map((round) => round.latex)).size, WHERE_ROUNDS)
            for (const round of rounds) {
                assert.equal(round.options.length, 4)
                assert.equal(new Set(round.options).size, 4)
                assert.ok(round.options.includes(round.answer))
                render(`a_n=${round.latex}`)
                for (const option of round.options) if (option !== NONE) render(option)
                const far = evaluate(round.latex, 200000)
                const next = evaluate(round.latex, 200001)
                const limit = numeric(round.answer)
                if (round.answer === NONE) assert.ok(Math.abs(far - next) > 0.5, `${round.latex} should oscillate`)
                else if (limit === Number.POSITIVE_INFINITY) assert.ok(far > 1e4 && next > 1e4, `${round.latex} → +∞`)
                else if (limit === Number.NEGATIVE_INFINITY) assert.ok(far < -1e4 && next < -1e4, `${round.latex} → −∞`)
                else assert.ok(limit !== null && Math.abs(far - limit) < 1e-3 * Math.max(1, Math.abs(limit)) && Math.abs(next - limit) < 1e-3 * Math.max(1, Math.abs(limit)), `${round.latex} → ${round.answer}: ${far}`)
            }
        }
    }
})

test('segidak batx1 z games: atrapa la banda', () => {
    assert.equal(readTerm(' 101 '), 101)
    assert.equal(readTerm('10,5'), null)
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 80; seed += 1) {
            const rounds = createBandRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, BAND_ROUNDS)
            for (const round of rounds) {
                render(bandLatex(round))
                const answer = bandAnswer(round)
                assert.ok(answer >= 2 && answer <= 1000)
                // The answer is inside and the term before it is not; the distance agrees with the general term
                assert.ok(bandInside(round, answer) && !bandInside(round, answer - 1))
                for (let n = answer; n < answer + 50; n += 1) assert.ok(bandInside(round, n))
                assert.ok(bandGap(round, answer) < round.p / round.q + 1e-12)
                if (round.kind === 'quotient') {
                    for (const n of [1, 7, 30]) assert.ok(Math.abs(Math.abs((round.limit * n + round.c0) / (n + round.b) - round.limit) - bandGap(round, n)) < 1e-12)
                }
                if (level === 0) assert.equal(round.kind, 'over-n')
                if (level === 1) assert.equal(round.kind, 'quotient')
                if (level === 2) assert.ok(round.kind === 'over-square' || round.kind === 'alternating')
            }
        }
    }
})

test('segidak batx1 z games: el detective de sucesiones', () => {
    for (const [level, errors] of bachSequencesDetectiveLevels.entries()) {
        const seen = new Set<string>()
        for (let seed = 1; seed <= 40; seed += 1) {
            const cases = createBachSequencesDetectiveCases(createRandom(seed * 7919 + level), level)
            assert.equal(cases.length, BACH_SEQUENCES_DETECTIVE_CASES)
            for (const item of cases) {
                seen.add(item.error)
                assert.ok(errors.includes(item.error))
                assert.equal(item.lines.length, 3)
                assert.ok(item.wrong >= 0 && item.wrong < 3)
                assert.equal(item.options.length, 3)
                assert.ok(item.options.includes(item.error))
                assert.notEqual(item.right, item.reached)
                for (const line of item.lines) render(line.latex)
                render(item.fix)
                checkTexts([item.problem, ...item.lines.map((line) => line.label)])
            }
        }
        assert.equal(seen.size, errors.length, `level ${level}`)
    }
    checkTexts([...Object.values(bachSequencesDetectiveNames), ...Object.values(bachSequencesDetectiveTips)])
})

test('segidak batx1 z games: memory boards have one partner per card', () => {
    for (const [level] of bachSequencesMemoryLevels.entries()) {
        for (let seed = 1; seed <= 60; seed += 1) {
            const cards = createBachSequencesMemoryBoard(createRandom(seed * 7919 + level), level)
            assert.equal(cards.length, BACH_SEQUENCES_MEMORY_PAIRS * 2)
            const bySet = new Map<number, string[]>()
            for (const card of cards) {
                render(card.latex)
                bySet.set(card.setId, [...(bySet.get(card.setId) ?? []), card.latex])
            }
            assert.equal(bySet.size, BACH_SEQUENCES_MEMORY_PAIRS)
            assert.equal(new Set(cards.map((card) => card.latex)).size, cards.length)
        }
    }
})
