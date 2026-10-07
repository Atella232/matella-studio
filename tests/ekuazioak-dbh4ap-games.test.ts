import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import { toNumber } from '../src/features/unit-v2/math/fraction.ts'
import { createEquationsSystemsMemoryBoard, EQUATIONS_SYSTEMS_MEMORY_PAIRS, equationsSystemsMemoryLevels } from '../src/pages/dbh4-aplikatuak-ekuazioak/games/boards.ts'
import { equationsSystemsGameModeForPath, equationsSystemsGameProgressIds, equationsSystemsGames } from '../src/pages/dbh4-aplikatuak-ekuazioak/games/info.ts'
import { checkEquationsSystemsPitAnswer, EQUATIONS_SYSTEMS_RACE_CIRCUITS, equationsSystemsParTime, equationsSystemsRaceErrorTips, generateEquationsSystemsRaceQuestion } from '../src/pages/dbh4-aplikatuak-ekuazioak/games/race.ts'
import { equationsSystemsLabChallengeIds } from '../src/pages/dbh4-aplikatuak-ekuazioak/lab/labTools.ts'

const mathIn = (text: string) => [...text.matchAll(/\$([^$]+)\$/g)].map((match) => match[1])
const numbersIn = (text: string) => [...text.matchAll(/-?\d+/g)].map((match) => Number(match[0]))

/** "2x-y=5" → [2, -1, 5] */
function parseLinear(latex: string): [number, number, number] {
    const match = latex.match(/^(-?\d*)x(?:([+-]\d*)y)?=(-?\d+)$/) ?? latex.match(/^()(?:)([+-]?\d*)y=(-?\d+)$/)
    assert.ok(match, latex)
    const coefficient = (text: string | undefined, missing: number) => (text === undefined ? missing : text === '' || text === '+' ? 1 : text === '-' ? -1 : Number(text))
    return [coefficient(match[1], 0), coefficient(match[2], 0), Number(match[3])]
}

/** "3x^{2}-5x+2=0" → [3, -5, 2] */
function parseQuadratic(latex: string): [number, number, number] {
    const match = latex.match(/^(\d*)x\^\{2\}(?:([+-]\d*)x)?(?:([+-]\d+))?=0$/)
    assert.ok(match, latex)
    const b = match[2] === undefined ? 0 : match[2] === '+' ? 1 : match[2] === '-' ? -1 : Number(match[2])
    return [match[1] === '' ? 1 : Number(match[1]), b, match[3] === undefined ? 0 : Number(match[3])]
}

/** The roots r of the factors (x − r) in "(x-2)(x+3)=0" */
const factorRoots = (latex: string) => [...latex.matchAll(/\(x(?:([+-])(\d+))?\)/g)].map((match) => (match[1] === undefined ? 0 : match[1] === '-' ? Number(match[2]) : -Number(match[2])))

test('ekuazioak 4. DBH ap games: levels, ids and routes', () => {
    assert.equal(equationsSystemsGames.length, 2)
    assert.equal(equationsSystemsGames[0].levels.length, EQUATIONS_SYSTEMS_RACE_CIRCUITS)
    assert.equal(equationsSystemsGames[1].levels.length, equationsSystemsMemoryLevels.length)
    assert.equal(new Set(equationsSystemsGameProgressIds).size, equationsSystemsGameProgressIds.length)
    assert.ok(!equationsSystemsGameProgressIds.some((id) => equationsSystemsLabChallengeIds.includes(id)))
    const stages = ['first-degree', 'quadratic', 'other', 'systems', 'methods']
    for (const game of equationsSystemsGames) for (const level of game.levels) assert.ok(stages.includes(level.stage), `${game.id} ${level.stage}`)
    assert.equal(equationsSystemsGameModeForPath('/matematika/dbh4-aplikatuak/ecuaciones-sistemas/juegos/carrera'), 'race')
    assert.equal(equationsSystemsGameModeForPath('/matematika/dbh4-aplikatuak/ecuaciones-sistemas/jokuak/memoria'), 'memory')
})

test('ekuazioak 4. DBH ap race: valid options and every new question checked against its prompt', () => {
    const kinds = new Set<string>()
    for (let circuit = 0; circuit < EQUATIONS_SYSTEMS_RACE_CIRCUITS; circuit += 1) {
        assert.ok(equationsSystemsParTime(circuit) > 60000)
        for (let seed = 1; seed <= 120; seed += 1) {
            const random = createRandom(seed * 23 + circuit)
            for (const tier of [0, 1, 2] as const) {
                const question = generateEquationsSystemsRaceQuestion(random, circuit, tier)
                assert.equal(question.circuit, circuit)
                kinds.add(`${circuit}:${question.kind}`)
                assert.equal(question.options.length, 4, question.kind)
                assert.equal(new Set(question.options.map((option) => option.latex)).size, 4, question.kind)
                assert.equal(question.options.filter((option) => option.correct).length, 1)
                for (const option of question.options) {
                    katex.renderToString(option.latex, { throwOnError: true })
                    if (!option.correct) assert.ok(equationsSystemsRaceErrorTips[option.error!], option.error!)
                }
                for (const language of ['eu', 'es', 'ar'] as const) for (const text of [question.prompt[language], question.solution[language]]) for (const formula of mathIn(text)) katex.renderToString(formula, { throwOnError: true })
                const right = question.options.find((option) => option.correct)!
                assert.ok(question.writable)
                assert.equal(Number(right.latex), toNumber(question.answer), question.kind)
                assert.equal(checkEquationsSystemsPitAnswer(question, right.latex), 'correct')
                if (circuit === 0 || question.kind !== 'discriminant' && circuit === 1) continue
                const value = toNumber(question.answer)
                const wrong = question.options.filter((option) => !option.correct).map((option) => Number(option.latex))
                const shown = mathIn(question.prompt.es)
                if (question.kind === 'discriminant') {
                    const [a, b, c] = parseQuadratic(shown[0])
                    assert.equal(b * b - 4 * a * c, value, shown[0])
                } else if (question.kind === 'factored') {
                    const roots = factorRoots(shown[0])
                    assert.equal(value, question.prompt.es.includes('mayor') ? Math.max(...roots) : Math.min(...roots), shown[0])
                } else if (question.kind === 'radical') {
                    const [, inside, rightSide] = shown[0].match(/^\\sqrt\{(.+)\}=(.+)$/)!
                    const at = (side: string, x: number) => (side === 'x' ? x : x + Number(side.slice(1)))
                    const holds = (x: number) => at(inside, x) >= 0 && Math.sqrt(at(inside, x)) === at(rightSide, x)
                    assert.ok(holds(value), shown[0])
                    for (const option of wrong) assert.ok(!holds(option), `${shown[0]}: ${option}`)
                } else if (question.kind === 'product') {
                    assert.equal(value * (value + 1), numbersIn(question.prompt.es)[0])
                } else if (question.kind === 'point') {
                    const [a, b, c] = parseLinear(shown[0])
                    const x = Number(shown[1].split('=')[1])
                    assert.equal(a * x + b * value, c, shown[0])
                } else if (question.kind === 'substitution' || question.kind === 'reduction') {
                    const [first, second] = shown[0].split(',\\ ').map(parseLinear)
                    const askX = question.prompt.es.endsWith('x?')
                    const det = first[0] * second[1] - second[0] * first[1]
                    const x = (first[2] * second[1] - second[2] * first[1]) / det
                    const y = (first[0] * second[2] - second[0] * first[2]) / det
                    assert.equal(value, askX ? x : y, shown[0])
                    assert.ok(Number.isInteger(x) && Number.isInteger(y))
                } else if (question.kind === 'farm') {
                    const [heads, legs] = numbersIn(question.prompt.es)
                    const hens = heads - value
                    assert.ok(hens > 0 && 2 * hens + 4 * value === legs)
                } else if (question.kind === 'sum-difference') {
                    const [sum, difference] = numbersIn(question.prompt.es)
                    assert.equal(value, (sum + difference) / 2)
                }
            }
        }
    }
    for (const kind of ['1:discriminant', '2:factored', '2:radical', '2:product', '3:point', '3:substitution', '4:reduction', '4:farm', '4:sum-difference']) assert.ok(kinds.has(kind), `never generated: ${kind}`)
})

test('ekuazioak 4. DBH ap race: the typical mistakes show up', () => {
    const errors = new Set<string>()
    for (let seed = 1; seed <= 200; seed += 1) {
        const random = createRandom(seed)
        for (let circuit = 0; circuit < EQUATIONS_SYSTEMS_RACE_CIRCUITS; circuit += 1) {
            for (const tier of [0, 1, 2] as const) for (const option of generateEquationsSystemsRaceQuestion(random, circuit, tier).options) if (option.error) errors.add(option.error)
        }
    }
    for (const error of ['delta-sign', 'factor-sign', 'false-root', 'other-unknown', 'negative-solution', 'transpose-sign']) assert.ok(errors.has(error), `never used: ${error}`)
})

test('ekuazioak 4. DBH ap memory: every card has exactly one partner and the pair is true', () => {
    for (let level = 0; level < equationsSystemsMemoryLevels.length; level += 1) {
        for (let seed = 1; seed <= 40; seed += 1) {
            const cards = createEquationsSystemsMemoryBoard(createRandom(seed * 7 + level), level)
            assert.equal(cards.length, EQUATIONS_SYSTEMS_MEMORY_PAIRS * 2)
            assert.equal(new Set(cards.map((card) => card.latex)).size, cards.length)
            for (const card of cards) katex.renderToString(card.latex, { throwOnError: true })
            if (equationsSystemsMemoryLevels[level] === 'first-degree') continue
            for (const card of cards.filter((item) => item.id.endsWith('-q'))) {
                const partner = cards.find((item) => item.setId === card.setId && item.id.endsWith('-a'))!
                const values = numbersIn(partner.latex)
                if (equationsSystemsMemoryLevels[level] === 'factored') {
                    assert.deepEqual(factorRoots(card.latex).sort((a, b) => a - b), values, card.latex)
                } else {
                    const [x, y] = values
                    for (const equation of card.latex.split(',\\ ').map(parseLinear)) assert.equal(equation[0] * x + equation[1] * y, equation[2], card.latex)
                }
            }
        }
    }
})
