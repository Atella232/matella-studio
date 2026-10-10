import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import { toNumber } from '../src/features/unit-v2/math/fraction.ts'
import { createGraphsMemoryBoard, GRAPHS_MEMORY_PAIRS, graphsMemoryLevels } from '../src/pages/dbh4-aplikatuak-grafikoa/games/boards.ts'
import { graphsGameModeForPath, graphsGameProgressIds, graphsGames } from '../src/pages/dbh4-aplikatuak-grafikoa/games/info.ts'
import { checkGraphsPitAnswer, GRAPHS_RACE_CIRCUITS, graphsParTime, graphsRaceErrorTips, generateGraphsRaceQuestion, type GraphsRaceQuestion } from '../src/pages/dbh4-aplikatuak-grafikoa/games/race.ts'
import { graphsLabChallengeIds } from '../src/pages/dbh4-aplikatuak-grafikoa/lab/labTools.ts'

const plainNumber = (latex: string) => Number(latex.replace(/\\,/g, '').replace('{,}', '.'))
const close = (a: number, b: number) => Math.abs(a - b) < 1e-6
const models = [[30, 15], [32, 1.8], [3, 2]]

/** The answer recomputed from the data the question carries */
function expected(question: GraphsRaceQuestion): number {
    const m = question.meta
    switch (question.kind) {
        case 'proportional': return m.y / m.x
        case 'x-cut': return -m.n / m.m
        case 'model': return models[m.model][0] + models[m.model][1] * m.x
        case 'model-back': return (m.y - models[m.model][0]) / models[m.model][1]
        case 'slope': return (m.y2 - m.y1) / (m.x2 - m.x1)
        case 'intercept':
        case 'parallel': return m.y0 - m.m * m.x0
        case 'meet': return (m.n2 - m.n1) / (m.m1 - m.m2)
        case 'quad-value': return m.a * m.k ** 2 + m.b * m.k + m.c
        case 'vertex-x': return -m.b / (2 * m.a)
        case 'vertex-y': { const x = -m.b / (2 * m.a); return m.a * x * x + m.b * x + m.c }
        case 'roots': return (-m.b + Math.sqrt(m.b * m.b - 4 * m.c)) / 2
        case 'graph-c': return m.p * m.p + m.q
        case 'k': return m.x * m.y
        case 'inverse-problem': return (m.workers * m.hours) / m.more
        case 'vertical': return m.a
        case 'horizontal': return m.b
        case 'root-domain': return -m.shift
        case 'root-value': return Math.sqrt(m.x + m.shift) + m.plusB
        case 'exponential': return m.k * m.base ** m.x
        case 'growth':
        case 'decay': return m.start * m.factor ** m.years
        case 'base': return m.y1 / m.k
        case 'max-area': return (m.perimeter / 4) ** 2
        default: throw new Error(`unchecked kind ${question.kind}`)
    }
}

test('grafikoa 4. DBH ap games: levels, ids and routes', () => {
    assert.equal(graphsGames.length, 2)
    assert.equal(graphsGames[0].levels.length, GRAPHS_RACE_CIRCUITS)
    assert.equal(graphsGames[1].levels.length, graphsMemoryLevels.length)
    assert.equal(new Set(graphsGameProgressIds).size, graphsGameProgressIds.length)
    assert.ok(!graphsGameProgressIds.some((id) => graphsLabChallengeIds.includes(id)))
    const stages = ['linear', 'lines', 'quadratic', 'inverse', 'exponential']
    for (const game of graphsGames) for (const level of game.levels) assert.ok(stages.includes(level.stage), `${game.id} ${level.stage}`)
    assert.equal(graphsGameModeForPath('/matematika/dbh4-aplikatuak/grafica-funcion/juegos/carrera'), 'race')
    assert.equal(graphsGameModeForPath('/matematika/dbh4-aplikatuak/grafica-funcion/jokuak/memoria'), 'memory')
})

test('grafikoa 4. DBH ap race: valid options and every answer recomputed', () => {
    const kinds = new Set<string>()
    const errors = new Set<string>()
    for (let circuit = 0; circuit < GRAPHS_RACE_CIRCUITS; circuit += 1) {
        assert.ok(graphsParTime(circuit) > 60000)
        for (let seed = 1; seed <= 150; seed += 1) {
            const random = createRandom(seed * 41 + circuit)
            for (const tier of [0, 1, 2] as const) {
                const question = generateGraphsRaceQuestion(random, circuit, tier)
                assert.equal(question.circuit, circuit)
                kinds.add(`${circuit}:${question.kind}`)
                assert.equal(question.options.length, 4, question.kind)
                assert.equal(new Set(question.options.map((option) => option.latex)).size, 4, question.kind)
                assert.equal(question.options.filter((option) => option.correct).length, 1)
                for (const option of question.options) {
                    katex.renderToString(option.latex, { throwOnError: true })
                    assert.ok(option.latex !== '-0', `${question.kind} ${option.latex}`)
                    if (option.error) {
                        errors.add(option.error)
                        assert.ok(graphsRaceErrorTips[option.error], option.error)
                    }
                }
                for (const language of ['eu', 'es', 'ar'] as const) for (const text of [question.prompt[language], question.solution[language]]) for (const [, formula] of text.matchAll(/\$([^$]+)\$/g)) katex.renderToString(formula, { throwOnError: true })
                assert.ok(!question.prompt.ar.includes('{,}') && !question.solution.ar.includes('{,}'), question.kind)
                const right = question.options.find((option) => option.correct)!
                const value = toNumber(question.answer)
                assert.ok(close(plainNumber(right.latex), value), `${question.kind} ${right.latex}`)
                assert.ok(close(value, expected(question)), `${question.kind} ${JSON.stringify(question.meta)}`)
                assert.equal(checkGraphsPitAnswer(question, right.latex.replace(/\\,/g, '').replace('{,}', ',')), 'correct', question.kind)
                if (question.graph) {
                    // The graph's y-intercept is the answer c
                    const at0 = question.graph.curves![0].points.find((point) => point[0] === 0)!
                    assert.ok(close(at0[1], value), question.kind)
                }
            }
        }
    }
    for (const kind of ['0:proportional', '0:x-cut', '0:model', '0:model-back', '1:slope', '1:intercept', '1:parallel', '1:meet', '2:quad-value', '2:vertex-x', '2:vertex-y', '2:roots', '2:graph-c', '3:k', '3:inverse-problem', '3:vertical', '3:horizontal', '3:root-domain', '3:root-value', '4:exponential', '4:growth', '4:decay', '4:base', '4:max-area']) assert.ok(kinds.has(kind), `never generated: ${kind}`)
    for (const error of Object.keys(graphsRaceErrorTips)) assert.ok(errors.has(error), `never used: ${error}`)
})

test('grafikoa 4. DBH ap memory: every card has exactly one partner and the pair is true', () => {
    const value = (latex: string) => {
        const fraction = latex.match(/^(-?)\\frac\{(\d+)\}\{(\d+)\}$/)
        return fraction ? (fraction[1] ? -1 : 1) * Number(fraction[2]) / Number(fraction[3]) : Number(latex)
    }
    for (let level = 0; level < graphsMemoryLevels.length; level += 1) {
        for (let seed = 1; seed <= 40; seed += 1) {
            const cards = createGraphsMemoryBoard(createRandom(seed * 7 + level), level)
            assert.equal(cards.length, GRAPHS_MEMORY_PAIRS * 2)
            assert.equal(new Set(cards.map((card) => card.latex)).size, cards.length)
            for (const card of cards) katex.renderToString(card.latex, { throwOnError: true })
            for (const card of cards.filter((item) => item.id.endsWith('-q'))) {
                const answer = cards.find((item) => item.setId === card.setId && item.id.endsWith('-a'))!.latex
                const name = graphsMemoryLevels[level]
                if (name === 'slopes') {
                    const [x1, y1, x2, y2] = [...card.latex.matchAll(/-?\d+/g)].map((match) => Number(match[0]))
                    assert.ok(close(value(answer.replace('m=', '')), (y2 - y1) / (x2 - x1)), card.latex)
                } else if (name === 'vertices') {
                    const [, p, q] = answer.match(/^V\((-?\d+),\\,(-?\d+)\)$/)!.map(Number)
                    const terms = card.latex
                    const [, a, b, c] = terms.match(/^(-?\d*)x\^\{2\}(?:([+-]\d*)x)?([+-]\d+)?$/)!
                    const coefficient = (text: string | undefined, fallback: number) => (text === undefined ? fallback : text === '' || text === '+' ? 1 : text === '-' ? -1 : Number(text))
                    const [A, B, C] = [coefficient(a, 1), coefficient(b, 0), coefficient(c, 0)]
                    assert.ok(close(-B / (2 * A), p), card.latex)
                    assert.equal(A * p * p + B * p + C, q, card.latex)
                } else {
                    const [, base, exponent] = card.latex.match(/^(\d+)\^\{(-?\d+)\}$/)!.map(Number)
                    assert.ok(close(value(answer), base ** exponent), card.latex)
                }
            }
        }
    }
})
