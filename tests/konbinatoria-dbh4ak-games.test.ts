import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import { toNumber } from '../src/features/unit-v2/math/fraction.ts'
import { createCombinatoricsAkMemoryBoard, COMBINATORICS_AK_MEMORY_PAIRS, combinatoricsAkMemoryLevels } from '../src/pages/dbh4-akademikoak-konbinatoria/games/boards.ts'
import { combinatoricsAkGameModeForPath, combinatoricsAkGameProgressIds, combinatoricsAkGames } from '../src/pages/dbh4-akademikoak-konbinatoria/games/info.ts'
import {
    checkCombinatoricsAkPitAnswer,
    COMBINATORICS_AK_RACE_CIRCUITS,
    combinatoricsAkParTime,
    combinatoricsAkRaceErrorTips,
    generateCombinatoricsAkRaceQuestion,
    type CombinatoricsAkRaceQuestion
} from '../src/pages/dbh4-akademikoak-konbinatoria/games/race.ts'
import { combinatoricsAkLabChallengeIds } from '../src/pages/dbh4-akademikoak-konbinatoria/lab/labTools.ts'

const close = (a: number, b: number) => Math.abs(a - b) < 1e-9

/** A count option: 120, 40\,320 */
function numberOf(latex: string): number {
    const value = Number(latex.replace(/\\,/g, ''))
    if (Number.isNaN(value)) throw new Error(`Cannot read ${latex}`)
    return value
}

/** How a student types a count at the pit stop: 40 320 */
const typed = (latex: string) => latex.replace(/\\,/g, ' ')

const factorial = (n: number): number => (n <= 1 ? 1 : n * factorial(n - 1))
const choose = (n: number, k: number) => factorial(n) / (factorial(k) * factorial(n - k))
const arrange = (n: number, k: number) => factorial(n) / factorial(n - k)

/** The answer recomputed from the numbers of the prompt, by brute force where it is cheap */
function expected(question: CombinatoricsAkRaceQuestion): number {
    const m = question.meta
    switch (question.kind) {
        case 'product': return m.a * m.b * m.c
        case 'factorial': return factorial(m.n)
        case 'quotient': return factorial(m.a) / factorial(m.b)
        case 'vr': return m.n ** m.k
        case 'v': return arrange(m.n, m.k)
        case 'digits': {
            // Count the numbers one by one
            let count = 0
            for (let value = 10 ** (m.digits - 1); value < 10 ** m.digits; value += 1) if (m.repeat || new Set(String(value)).size === m.digits) count += 1
            return count
        }
        case 'row': return factorial(m.n)
        case 'together': return 2 * factorial(m.n - 1)
        case 'word': return factorial(m.a + m.b + m.c) / (factorial(m.a) * factorial(m.b) * factorial(m.c))
        case 'comb': return choose(m.n, m.k)
        case 'handshakes': return choose(m.n, 2)
        case 'symmetry': return choose(m.n, m.n - 2)
        case 'diagonals': return choose(m.n, 2) - m.n
        case 'grid': return choose(m.w + m.h, m.h)
        case 'committee': return choose(m.boys, m.x) * choose(m.girls, m.y)
        default: throw new Error(`unchecked kind ${question.kind}`)
    }
}

test('konbinatoria 4. DBH ak games: levels, ids and routes', () => {
    assert.equal(combinatoricsAkGames.length, 2)
    assert.equal(combinatoricsAkGames[0].levels.length, COMBINATORICS_AK_RACE_CIRCUITS)
    assert.equal(combinatoricsAkGames[1].levels.length, combinatoricsAkMemoryLevels.length)
    assert.equal(new Set(combinatoricsAkGameProgressIds).size, combinatoricsAkGameProgressIds.length)
    assert.ok(!combinatoricsAkGameProgressIds.some((id) => combinatoricsAkLabChallengeIds.includes(id)))
    for (const id of combinatoricsAkGameProgressIds) assert.ok(id >= 84101 && id <= 84299, `${id}`)
    const stages = ['counting', 'variations', 'permutations', 'combinations', 'problems']
    for (const game of combinatoricsAkGames) for (const level of game.levels) assert.ok(stages.includes(level.stage), `${game.id} ${level.stage}`)
    assert.deepEqual(combinatoricsAkGames[0].levels.map((level) => level.stage), stages)
    assert.equal(combinatoricsAkGameModeForPath('/matematika/dbh4-akademikoak/combinatoria/juegos/carrera'), 'race')
    assert.equal(combinatoricsAkGameModeForPath('/matematika/dbh4-akademikoak/combinatoria/jokuak/memoria'), 'memory')
    assert.equal(combinatoricsAkGameModeForPath('/matematika/dbh4-akademikoak/combinatoria/jokuak'), 'hub')
})

test('konbinatoria 4. DBH ak race: valid options and every answer recomputed', () => {
    const kinds = new Set<string>()
    const errors = new Set<string>()
    for (let circuit = 0; circuit < COMBINATORICS_AK_RACE_CIRCUITS; circuit += 1) {
        assert.ok(combinatoricsAkParTime(circuit) > 60000)
        for (let seed = 1; seed <= 200; seed += 1) {
            const random = createRandom(seed * 41 + circuit)
            for (const tier of [0, 1, 2] as const) {
                const question = generateCombinatoricsAkRaceQuestion(random, circuit, tier)
                assert.equal(question.circuit, circuit)
                kinds.add(`${circuit}:${question.kind}`)
                assert.equal(question.options.length, 4, question.kind)
                assert.equal(new Set(question.options.map((option) => option.latex)).size, 4, question.kind)
                assert.equal(question.options.filter((option) => option.correct).length, 1)
                for (const option of question.options) {
                    katex.renderToString(option.latex, { throwOnError: true })
                    assert.ok(!/^-0(?!\{,\})/.test(option.latex) && !option.latex.includes('NaN') && !option.latex.includes('Infinity'), option.latex)
                    if (option.error) {
                        errors.add(option.error)
                        assert.ok(combinatoricsAkRaceErrorTips[option.error], option.error)
                    }
                }
                for (const language of ['eu', 'es', 'ar'] as const) {
                    for (const text of [question.prompt[language], question.solution[language]]) {
                        assert.equal((text.match(/\$/g) ?? []).length % 2, 0, text)
                        for (const [, formula] of text.matchAll(/\$([^$]+)\$/g)) {
                            katex.renderToString(formula, { throwOnError: true })
                            assert.ok(!/[؀-ۿ]/.test(formula), formula)
                            assert.ok(!formula.includes('+-') && !formula.includes('--') && !/(^|[^\d])-0(?![\d{.])/.test(formula), formula)
                            if (language === 'ar') assert.ok(!formula.includes('{,}'), formula)
                        }
                    }
                }
                // Basque: no case ending right after a formula
                const afterFormulas = question.prompt.eu.split('$').filter((_, index) => index > 0 && index % 2 === 0)
                assert.ok(afterFormulas.every((text) => !/^-?[a-z]/.test(text)), question.prompt.eu)
                const right = question.options.find((option) => option.correct)!
                const target = expected(question)
                assert.ok(close(numberOf(right.latex), target), `${question.kind} ${JSON.stringify(question.meta)} ${right.latex} ${target}`)
                assert.ok(question.writable, question.kind)
                assert.ok(close(toNumber(question.answer), target), `${question.kind} answer`)
                assert.equal(checkCombinatoricsAkPitAnswer(question, typed(right.latex)), 'correct', `${question.kind} ${typed(right.latex)}`)
                for (const option of question.options.filter((item) => !item.correct)) assert.ok(!close(numberOf(option.latex), target), `${question.kind} ${option.latex}`)
            }
        }
    }
    const all = ['0:product', '0:factorial', '0:quotient', '1:vr', '1:v', '1:digits', '2:row', '2:together', '2:word', '3:comb', '3:handshakes', '3:symmetry', '4:diagonals', '4:grid', '4:committee']
    for (const kind of all) assert.ok(kinds.has(kind), `never generated: ${kind}`)
    for (const error of Object.keys(combinatoricsAkRaceErrorTips)) assert.ok(errors.has(error), `never used: ${error}`)
})

test('konbinatoria 4. DBH ak race: tips render and the pit stop reads answers', () => {
    assert.equal(checkCombinatoricsAkPitAnswer(generateCombinatoricsAkRaceQuestion(createRandom(5), 0, 0, true), 'zzz'), 'unreadable')
    for (const tip of Object.values(combinatoricsAkRaceErrorTips)) {
        for (const language of ['eu', 'es', 'ar'] as const) {
            for (const [, formula] of tip[language].matchAll(/\$([^$]+)\$/g)) katex.renderToString(formula, { throwOnError: true })
            assert.equal((tip[language].match(/\$/g) ?? []).length % 2, 0, tip[language])
        }
    }
})

test('konbinatoria 4. DBH ak memory: every card has exactly one partner and the pair is true', () => {
    for (let level = 0; level < combinatoricsAkMemoryLevels.length; level += 1) {
        for (let seed = 1; seed <= 60; seed += 1) {
            const cards = createCombinatoricsAkMemoryBoard(createRandom(seed * 7 + level), level)
            assert.equal(cards.length, COMBINATORICS_AK_MEMORY_PAIRS * 2)
            assert.equal(new Set(cards.map((card) => card.latex)).size, cards.length)
            for (const card of cards) {
                katex.renderToString(card.latex, { throwOnError: true })
                katex.renderToString(card.explain!, { throwOnError: true })
            }
            for (const card of cards.filter((item) => item.id.endsWith('-q'))) {
                const answer = numberOf(cards.find((item) => item.setId === card.setId && item.id.endsWith('-a'))!.latex)
                let match: RegExpMatchArray | null
                if ((match = card.latex.match(/^(\d+)!$/))) assert.equal(factorial(Number(match[1])), answer, card.latex)
                else if ((match = card.latex.match(/^\\frac\{(\d+)!\}\{(\d+)!\}$/))) assert.equal(factorial(Number(match[1])) / factorial(Number(match[2])), answer, card.latex)
                else if ((match = card.latex.match(/^\\text\{VR\}_\{(\d+),(\d+)\}$/))) assert.equal(Number(match[1]) ** Number(match[2]), answer, card.latex)
                else if ((match = card.latex.match(/^\\text\{V\}_\{(\d+),(\d+)\}$/))) assert.equal(arrange(Number(match[1]), Number(match[2])), answer, card.latex)
                else if ((match = card.latex.match(/^\\binom\{(\d+)\}\{(\d+)\}$/))) assert.equal(choose(Number(match[1]), Number(match[2])), answer, card.latex)
                else assert.fail(`unread card ${card.latex}`)
            }
        }
    }
})
