import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import { toNumber } from '../src/features/unit-v2/math/fraction.ts'
import { createProbabilityAkMemoryBoard, PROBABILITY_AK_MEMORY_PAIRS, probabilityAkMemoryLevels } from '../src/pages/dbh4-akademikoak-probabilitatea/games/boards.ts'
import { probabilityAkGameModeForPath, probabilityAkGameProgressIds, probabilityAkGames } from '../src/pages/dbh4-akademikoak-probabilitatea/games/info.ts'
import {
    checkProbabilityAkPitAnswer,
    deckEvents,
    dieEvents,
    generateProbabilityAkRaceQuestion,
    PROBABILITY_AK_RACE_CIRCUITS,
    probabilityAkParTime,
    probabilityAkRaceErrorTips,
    type ProbabilityAkRaceQuestion
} from '../src/pages/dbh4-akademikoak-probabilitatea/games/race.ts'
import { probabilityAkLabChallengeIds } from '../src/pages/dbh4-akademikoak-probabilitatea/lab/labTools.ts'

const close = (a: number, b: number) => Math.abs(a - b) < 1e-9

/** An option or a card: 12, 0{,}25, \frac{3}{8} or -\frac{1}{6} */
function numberOf(latex: string): number {
    const fraction = latex.match(/^(-?)\\frac\{(\d+)\}\{(\d+)\}$/)
    if (fraction) return (fraction[1] ? -1 : 1) * (Number(fraction[2]) / Number(fraction[3]))
    const value = Number(latex.replace('{,}', '.'))
    if (Number.isNaN(value)) throw new Error(`Cannot read ${latex}`)
    return value
}

/** How a student types an option at the pit stop: 3/8, -1/6, 0,25 */
const typed = (latex: string) => latex.replace(/^(-?)\\frac\{(\d+)\}\{(\d+)\}$/, '$1$2/$3').replace('{,}', ',')

const range = (from: number, to: number) => Array.from({ length: to - from + 1 }, (_, index) => from + index)
/** Every ordered list of `length` values from 1 to `faces` */
const throws = (faces: number, length: number): number[][] => (length === 0 ? [[]] : throws(faces, length - 1).flatMap((list) => range(1, faces).map((value) => [...list, value])))
/** Every subset of `size` of 0, …, n − 1 */
const subsets = (n: number, size: number, start = 0): number[][] => (size === 0 ? [[]] : range(start, n - 1).flatMap((first) => subsets(n, size - 1, first + 1).map((rest) => [first, ...rest])))
const share = <T,>(list: T[], keep: (item: T) => boolean) => list.filter(keep).length / list.length

/** The Spanish deck and the events of the deck question, in the same order as deckEvents */
const deck = ['oros', 'copas', 'espadas', 'bastos'].flatMap((suit) => [1, 2, 3, 4, 5, 6, 7, 10, 11, 12].map((value) => ({ suit, value })))
const deckChecks: Array<(card: { suit: string; value: number }) => boolean> = [
    (card) => card.value === 1,
    (card) => card.suit === 'oros',
    (card) => card.value >= 10,
    (card) => card.suit !== 'oros',
    (card) => card.value === 1 || card.suit === 'oros',
    (card) => card.value >= 10 || card.suit === 'copas',
    (card) => card.value !== 1 && card.value < 10
]
/** The events of one die, in the same order as dieEvents */
const dieChecks: Array<(face: number) => boolean> = [(face) => face === 6, (face) => face % 2 === 0, (face) => face % 3 === 0, (face) => face < 5, (face) => [2, 3, 5].includes(face)]

/** The answer recomputed from the numbers of the prompt, by brute force */
function expected(question: ProbabilityAkRaceQuestion): number {
    const m = question.meta
    switch (question.kind) {
        case 'union-count': return range(1, m.total).filter((k) => k % m.a === 0 || k % m.b === 0).length
        case 'sample-space': return throws(2, m.coins).length * throws(6, m.dice).length
        case 'neither': return range(1, m.total).filter((k) => k % m.a !== 0 && (m.b === 0 || k % m.b !== 0)).length
        case 'two-dice': return share(throws(6, 2), ([a, b]) => a + b === m.total)
        case 'deck': return share(deck, deckChecks[m.event])
        case 'union':
            assert.ok(m.i <= Math.min(m.p, m.q) && m.p + m.q - m.i <= 100, JSON.stringify(m))
            return m.form === 0 ? (m.p + m.q - m.i) / 100 : m.i / 100
        case 'independent': return m.coin
            ? share(throws(2, 1).flatMap(([coin]) => range(1, 6).map((face) => [coin, face])), ([coin, face]) => coin === 1 && dieChecks[m.second](face))
            : share(throws(6, 2), ([a, b]) => dieChecks[m.first](a) && dieChecks[m.second](b))
        case 'no-replacement': {
            const balls = [...Array(m.red).fill('r'), ...Array(m.blue).fill('b')]
            const draws = range(0, balls.length - 1).flatMap((first) => range(0, balls.length - 1).filter((second) => second !== first).map((second) => [balls[first], balls[second]]))
            return share(draws, ([a, b]) => (m.oneOfEach ? a !== b : a === 'r' && b === 'r'))
        }
        case 'at-least': return share(throws(m.die ? 6 : 2, m.times), (list) => list.includes(m.die ? 6 : 1))
        case 'table': return m.givenGirl ? m.c / (m.c + m.d) : m.c / (m.a + m.c)
        case 'formula':
            // The data are possible: the intersection fits in both events and the union is at most 1
            assert.ok(m.x <= Math.min(m.y, m.z) && m.z + m.y - m.x <= 100, JSON.stringify(m))
            return m.x / m.y
        case 'total': return range(1, 6).reduce((total, face) => total + (face <= m.faces ? m.red1 / m.size1 : m.red2 / m.size2) / 6, 0)
        case 'draw-all': return share(subsets(m.total, m.drawn), (picked) => picked.every((ball) => ball < m.red))
        case 'max-dice': return share(throws(6, m.dice), (list) => Math.max(...list) === m.top)
        case 'expectation': return range(1, 6).reduce((total, face) => total + (face <= m.faces ? m.prize : -m.loss) / 6, 0)
        default: throw new Error(`unchecked kind ${question.kind}`)
    }
}

test('probabilitatea 4. DBH ak games: levels, ids and routes', () => {
    assert.equal(probabilityAkGames.length, 2)
    assert.equal(probabilityAkGames[0].levels.length, PROBABILITY_AK_RACE_CIRCUITS)
    assert.equal(probabilityAkGames[1].levels.length, probabilityAkMemoryLevels.length)
    assert.equal(new Set(probabilityAkGameProgressIds).size, probabilityAkGameProgressIds.length)
    assert.ok(!probabilityAkGameProgressIds.some((id) => probabilityAkLabChallengeIds.includes(id)))
    for (const id of probabilityAkGameProgressIds) assert.ok(id >= 86101 && id <= 86299, `${id}`)
    const stages = ['events', 'probability', 'compound', 'conditional', 'counting']
    for (const game of probabilityAkGames) for (const level of game.levels) assert.ok(stages.includes(level.stage), `${game.id} ${level.stage}`)
    assert.deepEqual(probabilityAkGames[0].levels.map((level) => level.stage), stages)
    assert.equal(probabilityAkGameModeForPath('/matematika/dbh4-akademikoak/probabilidad/juegos/carrera'), 'race')
    assert.equal(probabilityAkGameModeForPath('/matematika/dbh4-akademikoak/probabilidad/jokuak/memoria'), 'memory')
    assert.equal(probabilityAkGameModeForPath('/matematika/dbh4-akademikoak/probabilidad/jokuak'), 'hub')
    assert.equal(deckEvents.length, deckChecks.length)
    assert.equal(dieEvents.length, dieChecks.length)
    dieEvents.forEach((event, index) => assert.deepEqual(event.faces, range(1, 6).filter(dieChecks[index])))
    deckEvents.forEach((event, index) => assert.equal(event.count, deck.filter(deckChecks[index]).length))
})

test('probabilitatea 4. DBH ak race: valid options and every answer recomputed', () => {
    const kinds = new Set<string>()
    const errors = new Set<string>()
    for (let circuit = 0; circuit < PROBABILITY_AK_RACE_CIRCUITS; circuit += 1) {
        assert.ok(probabilityAkParTime(circuit) > 60000)
        for (let seed = 1; seed <= 200; seed += 1) {
            const random = createRandom(seed * 43 + circuit)
            for (const tier of [0, 1, 2] as const) {
                const question = generateProbabilityAkRaceQuestion(random, circuit, tier)
                assert.equal(question.circuit, circuit)
                kinds.add(`${circuit}:${question.kind}`)
                assert.equal(question.options.length, 4, question.kind)
                assert.equal(new Set(question.options.map((option) => option.latex)).size, 4, question.kind)
                assert.equal(question.options.filter((option) => option.correct).length, 1)
                const values = question.options.map((option) => numberOf(option.latex))
                assert.equal(new Set(values.map((value) => value.toFixed(9))).size, 4, `${question.kind} same value twice`)
                for (const option of question.options) {
                    katex.renderToString(option.latex, { throwOnError: true })
                    assert.ok(!option.latex.includes('NaN') && !option.latex.includes('Infinity') && option.latex !== '-0', option.latex)
                    if (option.error) {
                        errors.add(option.error)
                        assert.ok(probabilityAkRaceErrorTips[option.error], option.error)
                    }
                }
                // Probabilities stay between 0 and 1; only counts and the expected gain leave that range
                if (!['union-count', 'sample-space', 'neither', 'expectation'].includes(question.kind)) for (const value of values) assert.ok(value > 0 && value <= 1, `${question.kind} ${value}`)
                for (const language of ['eu', 'es', 'en', 'ar'] as const) {
                    for (const text of [question.prompt[language], question.solution[language]]) {
                        assert.equal((text.match(/\$/g) ?? []).length % 2, 0, text)
                        for (const [, formula] of text.matchAll(/\$([^$]+)\$/g)) {
                            katex.renderToString(formulaFor(language, formula), { throwOnError: true })
                            assert.ok(!/[؀-ۿ]/.test(formula), formula)
                            assert.ok(!formula.includes('+-') && !formula.includes('--'), formula)
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
                assert.equal(checkProbabilityAkPitAnswer(question, typed(right.latex)), 'correct', `${question.kind} ${typed(right.latex)}`)
                for (const option of question.options.filter((item) => !item.correct)) assert.ok(!close(numberOf(option.latex), target), `${question.kind} ${option.latex}`)
            }
        }
    }
    const all = ['0:union-count', '0:sample-space', '0:neither', '1:two-dice', '1:deck', '1:union', '2:independent', '2:no-replacement', '2:at-least', '3:table', '3:formula', '3:total', '4:draw-all', '4:max-dice', '4:expectation']
    for (const kind of all) assert.ok(kinds.has(kind), `never generated: ${kind}`)
    for (const error of Object.keys(probabilityAkRaceErrorTips)) assert.ok(errors.has(error), `never used: ${error}`)
})

test('probabilitatea 4. DBH ak race: tips render and the pit stop reads answers', () => {
    assert.equal(checkProbabilityAkPitAnswer(generateProbabilityAkRaceQuestion(createRandom(5), 1, 0, true), 'zzz'), 'unreadable')
    for (const tip of Object.values(probabilityAkRaceErrorTips)) {
        for (const language of ['eu', 'es', 'en', 'ar'] as const) {
            for (const [, formula] of tip[language].matchAll(/\$([^$]+)\$/g)) katex.renderToString(formulaFor(language, formula), { throwOnError: true })
            assert.equal((tip[language].match(/\$/g) ?? []).length % 2, 0, tip[language])
        }
    }
})

test('probabilitatea 4. DBH ak memory: every card has exactly one partner and the pair is true', () => {
    for (let level = 0; level < probabilityAkMemoryLevels.length; level += 1) {
        for (let seed = 1; seed <= 60; seed += 1) {
            const cards = createProbabilityAkMemoryBoard(createRandom(seed * 7 + level), level)
            assert.equal(cards.length, PROBABILITY_AK_MEMORY_PAIRS * 2)
            assert.equal(new Set(cards.map((card) => card.latex)).size, cards.length)
            for (const card of cards) {
                katex.renderToString(card.latex, { throwOnError: true })
                katex.renderToString(card.explain!, { throwOnError: true })
            }
            for (const card of cards.filter((item) => item.id.endsWith('-q'))) {
                const answer = numberOf(cards.find((item) => item.setId === card.setId && item.id.endsWith('-a'))!.latex)
                let match: RegExpMatchArray | null
                if ((match = card.latex.match(/^P\(S=(\d+)\)$/))) assert.ok(close(share(throws(6, 2), ([a, b]) => a + b === Number(match![1])), answer), card.latex)
                else if ((match = card.latex.match(/^(.+)\\cdot(.+)$/))) assert.ok(close(numberOf(match[1]) * numberOf(match[2]), answer), card.latex)
                else if ((match = card.latex.match(/^\\frac\{([\d{},]+)\}\{([\d{},]+)\}$/))) assert.ok(close(numberOf(match[1]) / numberOf(match[2]), answer), card.latex)
                else assert.fail(`unread card ${card.latex}`)
            }
        }
    }
})
