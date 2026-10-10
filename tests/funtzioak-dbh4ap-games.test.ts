import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import { toNumber } from '../src/features/unit-v2/math/fraction.ts'
import { smoothThrough } from '../src/pages/dbh4-aplikatuak-funtzioak/functions.ts'
import { createFunctionsMemoryBoard, FUNCTIONS_MEMORY_PAIRS, functionsMemoryLevels } from '../src/pages/dbh4-aplikatuak-funtzioak/games/boards.ts'
import { functionsGameModeForPath, functionsGameProgressIds, functionsGames } from '../src/pages/dbh4-aplikatuak-funtzioak/games/info.ts'
import { checkFunctionsPitAnswer, FUNCTIONS_RACE_CIRCUITS, functionsParTime, functionsRaceErrorTips, generateFunctionsRaceQuestion, type FunctionsRaceQuestion } from '../src/pages/dbh4-aplikatuak-funtzioak/games/race.ts'
import { functionsLabChallengeIds } from '../src/pages/dbh4-aplikatuak-funtzioak/lab/labTools.ts'

const plainNumber = (latex: string) => Number(latex.replace(/\\,/g, '').replace('{,}', '.'))
const close = (a: number, b: number) => Math.abs(a - b) < 1e-6
const pairs = (flat: number[]) => Array.from({ length: flat.length / 2 }, (_, index) => [flat[2 * index], flat[2 * index + 1]] as const)

/** The answer recomputed from the data the question carries */
function expected(question: FunctionsRaceQuestion): number {
    const m = question.meta as Record<string, number>
    const list = question.meta as Record<string, number[]>
    switch (question.kind) {
        case 'evaluate': return m.a * m.k ** 2 + m.b * m.k + m.c
        case 'fare': return m.rate * m.km + m.fixed
        case 'preimage': return (m.value - m.n) / m.m
        case 'excluded': return m.q
        case 'root': return m.start
        case 'y-intercept': return m.c
        case 'x-intercept': return -m.n / m.m
        case 'rate': {
            const f = (x: number) => x * x + m.b * x + m.c
            return (f(m.to) - f(m.from)) / (m.to - m.from)
        }
        case 'speed': return (m.d2 - m.d1) / (m.t2 - m.t1)
        case 'relative-min':
        case 'relative-max': {
            const knots = pairs(list.knots)
            const middle = knots.filter((point, index) => index > 0 && index < knots.length - 1 && (question.kind === 'relative-min' ? point[1] < knots[index - 1][1] && point[1] < knots[index + 1][1] : point[1] > knots[index - 1][1] && point[1] > knots[index + 1][1]))
            assert.equal(middle.length, 1, question.kind)
            return middle[0][0]
        }
        case 'periodic': return list.values[(question.meta.x as number) % (question.meta.period as number)]
        case 'parking': return Math.ceil(m.hours + m.minutes / 60) * m.price
        case 'halving': return m.start / 2 ** m.years
        case 'read-max': return Math.max(...smoothThrough(pairs(list.knots).map(([x, y]) => [x, y])).map((point) => point[1])) * m.unit
        case 'box': return (m.width - 2 * m.x) * (m.height - 2 * m.x) * m.x
        case 'graph-rate': {
            const knots = pairs(list.knots)
            const [a, b] = [knots[m.i], knots[m.j]]
            return ((b[1] - a[1]) * m.unit) / (b[0] - a[0])
        }
        default: throw new Error(`unchecked kind ${question.kind}`)
    }
}

test('funtzioak 4. DBH ap games: levels, ids and routes', () => {
    assert.equal(functionsGames.length, 2)
    assert.equal(functionsGames[0].levels.length, FUNCTIONS_RACE_CIRCUITS)
    assert.equal(functionsGames[1].levels.length, functionsMemoryLevels.length)
    assert.equal(new Set(functionsGameProgressIds).size, functionsGameProgressIds.length)
    assert.ok(!functionsGameProgressIds.some((id) => functionsLabChallengeIds.includes(id)))
    const stages = ['concept', 'domain', 'change', 'properties', 'study']
    for (const game of functionsGames) for (const level of game.levels) assert.ok(stages.includes(level.stage), `${game.id} ${level.stage}`)
    assert.equal(functionsGameModeForPath('/matematika/dbh4-aplikatuak/funciones/juegos/carrera'), 'race')
    assert.equal(functionsGameModeForPath('/matematika/dbh4-aplikatuak/funciones/jokuak/memoria'), 'memory')
})

test('funtzioak 4. DBH ap race: valid options and every answer recomputed', () => {
    const kinds = new Set<string>()
    const errors = new Set<string>()
    for (let circuit = 0; circuit < FUNCTIONS_RACE_CIRCUITS; circuit += 1) {
        assert.ok(functionsParTime(circuit) > 60000)
        for (let seed = 1; seed <= 150; seed += 1) {
            const random = createRandom(seed * 41 + circuit)
            for (const tier of [0, 1, 2] as const) {
                const question = generateFunctionsRaceQuestion(random, circuit, tier)
                assert.equal(question.circuit, circuit)
                kinds.add(`${circuit}:${question.kind}`)
                assert.equal(question.options.length, 4, question.kind)
                assert.equal(new Set(question.options.map((option) => option.latex)).size, 4, question.kind)
                assert.equal(question.options.filter((option) => option.correct).length, 1)
                for (const option of question.options) {
                    katex.renderToString(option.latex, { throwOnError: true })
                    if (option.error) {
                        errors.add(option.error)
                        assert.ok(functionsRaceErrorTips[option.error], option.error)
                    }
                }
                for (const language of ['eu', 'es', 'ar'] as const) for (const text of [question.prompt[language], question.solution[language]]) for (const [, formula] of text.matchAll(/\$([^$]+)\$/g)) katex.renderToString(formula, { throwOnError: true })
                assert.ok(!question.prompt.ar.includes('{,}') && !question.solution.ar.includes('{,}'), question.kind)
                const right = question.options.find((option) => option.correct)!
                const value = toNumber(question.answer)
                assert.ok(close(plainNumber(right.latex), value), `${question.kind} ${right.latex}`)
                assert.ok(close(value, expected(question)), `${question.kind} ${JSON.stringify(question.meta)}`)
                assert.equal(checkFunctionsPitAnswer(question, right.latex.replace(/\\,/g, '').replace('{,}', ',')), 'correct', question.kind)
                if (question.graph) assert.ok(question.graph.curves!.length > 0)
            }
        }
    }
    for (const kind of ['0:evaluate', '0:fare', '0:preimage', '1:excluded', '1:root', '1:y-intercept', '1:x-intercept', '2:rate', '2:speed', '2:relative-min', '2:relative-max', '3:periodic', '3:parking', '3:halving', '4:read-max', '4:box', '4:graph-rate']) assert.ok(kinds.has(kind), `never generated: ${kind}`)
    for (const error of ['sign-square', 'no-fixed', 'image-instead', 'numerator-zero', 'sign-flip', 'value-at-one', 'y-intercept', 'no-divide', 'order', 'y-instead', 'wrong-extreme', 'wrong-rest', 'no-round-up', 'half-once', 'squares', 'one-cut', 'no-height']) assert.ok(errors.has(error), `never used: ${error}`)
})

test('funtzioak 4. DBH ap memory: every card has exactly one partner and the pair is true', () => {
    for (let level = 0; level < functionsMemoryLevels.length; level += 1) {
        for (let seed = 1; seed <= 40; seed += 1) {
            const cards = createFunctionsMemoryBoard(createRandom(seed * 7 + level), level)
            assert.equal(cards.length, FUNCTIONS_MEMORY_PAIRS * 2)
            assert.equal(new Set(cards.map((card) => card.latex)).size, cards.length)
            for (const card of cards) katex.renderToString(card.latex, { throwOnError: true })
            for (const card of cards.filter((item) => item.id.endsWith('-q'))) {
                const answer = cards.find((item) => item.setId === card.setId && item.id.endsWith('-a'))!.latex
                const name = functionsMemoryLevels[level]
                if (name === 'images') {
                    const [, b, c, k] = card.latex.match(/^x\^\{2\}(?:([+-]\d*)x)?([+-]\d+)?,\\ x=(-?\d+)$/)!
                    const coefficient = b === undefined ? 0 : b === '+' ? 1 : b === '-' ? -1 : Number(b)
                    const x = Number(k)
                    assert.equal(Number(answer), x * x + coefficient * x + Number(c ?? 0), card.latex)
                } else if (name === 'domains') {
                    const [, kind, inside] = card.latex.match(/^y=(\\frac\{1\}|\\sqrt)\{(x(?:[+-]\d+)?)\}$/)!
                    const a = inside === 'x' ? 0 : -Number(inside.slice(1))
                    assert.equal(answer, kind === '\\sqrt' ? `[${a},\\,+\\infty)` : `\\mathbb{R}-\\{${a}\\}`, card.latex)
                } else {
                    const [, k, power, from, to] = card.latex.match(/^(-?\d*)x\^\{(\d)\},\\ \[(-?\d+),\\,(-?\d+)\]$/)!
                    const factor = k === '' ? 1 : k === '-' ? -1 : Number(k)
                    const f = (x: number) => factor * x ** Number(power)
                    assert.equal(Number(answer), (f(Number(to)) - f(Number(from))) / (Number(to) - Number(from)), card.latex)
                }
            }
        }
    }
})
