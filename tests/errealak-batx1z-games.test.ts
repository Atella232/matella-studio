import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import type { Tier } from '../src/features/unit-v2/games/raceCore.ts'
import { toExactDecimal, toNumber } from '../src/features/unit-v2/math/fraction.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { bachRealsGameModeForPath, bachRealsGameProgressIds, bachRealsGames, bachRealsGameSlugs } from '../src/pages/batx1-zientziak-errealak/games/info.ts'
import { BACH_REALS_RACE_CIRCUITS, bachRealsRaceErrorTips, checkBachRealsPitAnswer, generateBachRealsRaceQuestion, written } from '../src/pages/batx1-zientziak-errealak/games/race.ts'
import { createTargetRounds, isTargetHit, TARGET_ROUNDS, targetEnds, targetStart } from '../src/pages/batx1-zientziak-errealak/games/target.ts'
import { binomial, COEFFICIENT_ROUNDS, coefficientOf, createCoefficientRounds, expansionLatex, hiddenCoefficient, readCoefficient } from '../src/pages/batx1-zientziak-errealak/games/coefficient.ts'
import { BACH_REALS_DETECTIVE_CASES, bachRealsDetectiveLevels, bachRealsDetectiveNames, bachRealsDetectiveTips, createBachRealsDetectiveCases } from '../src/pages/batx1-zientziak-errealak/games/detective.ts'
import { BACH_REALS_MEMORY_PAIRS, bachRealsMemoryLevels, createBachRealsMemoryBoard } from '../src/pages/batx1-zientziak-errealak/games/boards.ts'

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

test('errealak batx1 z games: the hub, its levels and progress ids', () => {
    assert.deepEqual(bachRealsGames.map((game) => game.id), ['race', 'target', 'coefficient', 'detective', 'memory', 'place', 'intervals', 'radical', 'log'])
    assert.equal(new Set(bachRealsGameProgressIds).size, bachRealsGameProgressIds.length)
    for (const id of bachRealsGameProgressIds) assert.ok(id >= 99401 && id <= 99849, `${id}`)
    const stages = ['reals', 'absolute', 'errors', 'radicals', 'newton-stage']
    for (const game of bachRealsGames) {
        assert.ok(game.levels.length >= 3, game.id)
        for (const level of game.levels) assert.ok(stages.includes(level.stage), `${game.id}: ${level.stage}`)
        checkTexts([game.title, game.tagline, game.skills, ...game.levels.flatMap((level) => [level.title, level.description])])
        assert.equal(bachRealsGameModeForPath(`/matematika/batx1-zientziak/numeros-reales/jokuak/${bachRealsGameSlugs[game.id]}`), game.id)
    }
    assert.equal(bachRealsGameModeForPath('/matematika/batx1-zientziak/numeros-reales/jokuak'), 'hub')
})

test('errealak batx1 z games: every race question has one right option, worked out from its numbers', () => {
    const kinds = new Set<string>()
    for (let circuit = 0; circuit < BACH_REALS_RACE_CIRCUITS; circuit += 1) {
        for (const tier of [0, 1, 2] as Tier[]) {
            for (let seed = 1; seed <= 60; seed += 1) {
                const question = generateBachRealsRaceQuestion(createRandom(seed * 7919 + circuit * 31 + tier), circuit, tier)
                kinds.add(question.kind)
                assert.equal(question.circuit, circuit)
                assert.equal(question.options.length, 4, question.kind)
                assert.equal(question.options.filter((option) => option.correct).length, 1, question.kind)
                assert.equal(new Set(question.options.map((option) => option.latex)).size, 4, `${question.kind}: ${question.options.map((option) => option.latex).join(' | ')}`)
                const right = question.options.find((option) => option.correct)!
                assert.equal(right.latex, written(question.answer), question.kind)
                for (const option of question.options) render(option.latex)
                checkTexts([question.prompt, question.solution])
                // The typed answer is accepted at the pit stop
                const typed = question.answer.denominator === 1 ? String(question.answer.numerator) : toExactDecimal(question.answer) ?? `${question.answer.numerator}/${question.answer.denominator}`
                assert.equal(checkBachRealsPitAnswer(question, typed), 'correct', `${question.kind}: ${typed}`)
                // The answer from the numbers of the question
                const { meta } = question
                const value = toNumber(question.answer)
                const expected: Record<string, () => number> = {
                    intersection: () => meta.common,
                    period: () => meta.period / 99,
                    hypotenuse: () => meta.p ** 2 + meta.q ** 2,
                    distance: () => meta.b - meta.a,
                    absolute: () => meta.a - meta.r,
                    neighbourhood: () => meta.a - meta.r,
                    radius: () => meta.r,
                    figures: () => meta.digits,
                    bound: () => 5 / 10 ** (meta.places + 1),
                    relative: () => (100 * meta.error) / meta.measure,
                    extract: () => meta.k,
                    rationalize: () => meta.c,
                    log: () => meta.e,
                    'log-sum': () => meta.m + meta.n,
                    binomial: () => binomial(meta.n, meta.k),
                    terms: () => meta.n + 1,
                    coefficient: () => binomial(meta.n, meta.n - meta.power) * meta.b ** (meta.n - meta.power),
                    row: () => 2 ** meta.n
                }
                assert.ok(expected[question.kind], `no check for ${question.kind}`)
                assert.ok(Math.abs(value - expected[question.kind]()) < 1e-9, `${question.kind}: ${value} ≠ ${expected[question.kind]()}`)
            }
        }
    }
    assert.equal(kinds.size, 18)
    checkTexts(Object.values(bachRealsRaceErrorTips))
})

test('errealak batx1 z games: entorno al blanco', () => {
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 80; seed += 1) {
            const rounds = createTargetRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, TARGET_ROUNDS)
            assert.equal(new Set(rounds.map((round) => `${round.centre}:${round.radius}`)).size, TARGET_ROUNDS)
            for (const round of rounds) {
                const { left, right } = targetEnds(round)
                assert.ok(left >= -9 && right <= 9, `${left} ${right}`)
                assert.ok(round.radius > 0)
                assert.equal(round.kind, ['interval', 'written', 'outside'][level])
                // Halves are needed in level 2; whole numbers elsewhere
                if (level === 1) assert.ok(!Number.isInteger(left) || !Number.isInteger(right))
                else assert.ok(Number.isInteger(round.centre) && Number.isInteger(round.radius))
                // The answer is the midpoint and half the length, and the controls never start on it
                assert.ok(isTargetHit(round, (left + right) / 2, (right - left) / 2))
                const start = targetStart(round, level)
                assert.ok(!isTargetHit(round, start.centre, start.radius))
            }
        }
    }
})

test('errealak batx1 z games: el coeficiente escondido', () => {
    assert.deepEqual([0, 1, 2, 3, 4].map((k) => binomial(4, k)), [1, 4, 6, 4, 1])
    assert.equal(readCoefficient('−12'), -12)
    assert.equal(readCoefficient(' 40 '), 40)
    assert.equal(readCoefficient('4,5'), null)
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 80; seed += 1) {
            const rounds = createCoefficientRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, COEFFICIENT_ROUNDS)
            for (const round of rounds) {
                if (level === 0) assert.ok(round.a === 1 && round.b === 1)
                if (level === 1) assert.ok(round.a === 1 && round.b !== 1)
                if (level === 2) assert.ok(round.a > 1)
                assert.ok(round.k >= 1 && round.k <= round.n - 1)
                assert.ok(Math.abs(hiddenCoefficient(round)) <= 1000)
                // The coefficients are those of the polynomial: (a·x + b)ⁿ at x = 2 and x = −1
                for (const x of [2, -1]) {
                    const sum = Array.from({ length: round.n + 1 }, (_, k) => coefficientOf(round, k) * x ** (round.n - k)).reduce((total, term) => total + term, 0)
                    assert.equal(sum, (round.a * x + round.b) ** round.n)
                }
                const latex = expansionLatex(round)
                assert.equal((latex.match(/\\square/g) ?? []).length, 1)
                render(latex)
            }
        }
    }
})

test('errealak batx1 z games: el detective de los reales', () => {
    for (const [level, errors] of bachRealsDetectiveLevels.entries()) {
        const seen = new Set<string>()
        for (let seed = 1; seed <= 40; seed += 1) {
            const cases = createBachRealsDetectiveCases(createRandom(seed * 7919 + level), level)
            assert.equal(cases.length, BACH_REALS_DETECTIVE_CASES)
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
    checkTexts([...Object.values(bachRealsDetectiveNames), ...Object.values(bachRealsDetectiveTips)])
})

test('errealak batx1 z games: memory boards have one partner per card', () => {
    for (const [level] of bachRealsMemoryLevels.entries()) {
        for (let seed = 1; seed <= 60; seed += 1) {
            const cards = createBachRealsMemoryBoard(createRandom(seed * 7919 + level), level)
            assert.equal(cards.length, BACH_REALS_MEMORY_PAIRS * 2)
            const bySet = new Map<number, string[]>()
            for (const card of cards) {
                render(card.latex)
                bySet.set(card.setId, [...(bySet.get(card.setId) ?? []), card.latex])
            }
            assert.equal(bySet.size, BACH_REALS_MEMORY_PAIRS)
            assert.equal(new Set(cards.map((card) => card.latex)).size, cards.length)
        }
    }
})
