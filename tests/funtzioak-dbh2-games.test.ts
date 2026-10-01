import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import { equals, fraction, hasTerminatingDecimal, toExactDecimal, toNumber, type FractionValue } from '../src/features/unit-v2/math/fraction.ts'
import { isFunctionRelation, quadrantOf, slopeBetween, type Point } from '../src/pages/dbh2-funtzioak-v2/functions.ts'
import { createFunctionsMemoryBoard, createPlotRound, FUNCTIONS_MEMORY_PAIRS, functionsMemoryLevels, PLOT_ROUNDS, plotLevels, plotPoints, plotStars, samePoint } from '../src/pages/dbh2-funtzioak-v2/games/boards.ts'
import { functionsGameModeForPath, functionsGameProgressIds, functionsGames } from '../src/pages/dbh2-funtzioak-v2/games/info.ts'
import { checkFunctionsPitAnswer, FUNCTIONS_RACE_CIRCUITS, functionsParTime, functionsRaceErrorTips, generateFunctionsRaceQuestion, type FunctionsRaceQuestion } from '../src/pages/dbh2-funtzioak-v2/games/race.ts'
import { functionsLabChallengeIds } from '../src/pages/dbh2-funtzioak-v2/lab/labTools.ts'

const typed = (value: FractionValue) => (hasTerminatingDecimal(value) ? toExactDecimal(value)! : `${value.numerator}/${value.denominator}`)

/** Plain arithmetic in LaTeX (no letters) */
function evaluate(latex: string): number | null {
    let js = latex.replace(/\\,/g, '').replace(/\\cdot/g, '*').replace(/\s+/g, '')
    for (let pass = 0; pass < 3; pass += 1) {
        js = js.replace(/\\frac\{([^{}]+)\}\{([^{}]+)\}/g, '(($1)/($2))').replace(/(\([^()]+\)|\d+(?:\.\d+)?)\^\{(\d+)\}/g, 'Math.pow($1,$2)')
    }
    js = js.replace(/\)\(/g, ')*(').replace(/(\d)\(/g, '$1*(')
    if (!/^(?:[\d+\-*/().,]|Math\.pow)+$/.test(js) || !/\d/.test(js)) return null
    try {
        return Function(`return ${js}`)() as number
    } catch {
        return null
    }
}

const onLine = (m: number, n: number, [x, y]: Point) => m * x + n === y
const interval = (index: number) => `(${index},\\,${index + 1})`
const relationLatex = (pairs: Point[]) => pairs.map(([x, y]) => `${x}\\to ${y}`).join(',\\ ')

/** m and n of a line written as y=2x-6, y=-x+3, y=x, y=4 */
function parseLine(latex: string): { m: number; n: number } {
    const match = latex.match(/^y=(-?\d*)x?([+-]\d+)?$/)!
    assert.ok(match, latex)
    const hasX = latex.includes('x')
    const coefficient = match[1]
    const m = !hasX ? 0 : coefficient === '' ? 1 : coefficient === '-' ? -1 : Number(coefficient)
    const n = hasX ? Number(match[2] ?? 0) : Number(coefficient)
    return { m, n }
}

function check(question: FunctionsRaceQuestion) {
    const { meta } = question
    const right = question.options.findIndex((option) => option.correct)
    const wrong = question.options.map((_, index) => index).filter((index) => index !== right)
    assert.equal(question.options.length, 4, question.kind)
    assert.equal(new Set(question.options.map((option) => option.latex)).size, 4, question.kind)
    assert.equal(question.options.filter((option) => option.correct).length, 1)
    for (const index of wrong) assert.ok(functionsRaceErrorTips[question.options[index].error!], `${question.kind}: ${question.options[index].error}`)
    const answerNumber = toNumber(question.answer)
    const text = (value: number) => String(value)
    switch (meta.kind) {
        case 'quadrant':
            assert.equal(question.options[right].latex, `\\text{${['', 'I', 'II', 'III', 'IV'][quadrantOf(meta.point)]}}`)
            assert.ok(!question.writable)
            break
        case 'relation':
            assert.equal(meta.right, right)
            meta.relations.forEach((relation, index) => {
                assert.equal(question.options[index].latex, relationLatex(relation))
                assert.equal(isFunctionRelation(relation), index === right, `${relationLatex(relation)}`)
            })
            break
        case 'area': {
            const xs = meta.vertices.map((vertex) => vertex[0])
            const ys = meta.vertices.map((vertex) => vertex[1])
            assert.equal(meta.area, (Math.max(...xs) - Math.min(...xs)) * (Math.max(...ys) - Math.min(...ys)))
            assert.equal(question.options[right].latex, text(meta.area))
            assert.equal(answerNumber, meta.area)
            break
        }
        case 'value':
            assert.equal(meta.y, meta.m * meta.x + meta.n)
            assert.equal(question.options[right].latex, text(meta.y))
            assert.equal(answerNumber, meta.y)
            break
        case 'square':
            assert.equal(meta.y, meta.x * meta.x - meta.k)
            assert.equal(question.options[right].latex, text(meta.y))
            assert.equal(answerNumber, meta.y)
            break
        case 'inverse':
            assert.equal(meta.m * meta.x + meta.n, meta.y)
            assert.equal(question.options[right].latex, text(meta.x))
            assert.equal(answerNumber, meta.x)
            break
        case 'point-on-line':
            assert.equal(meta.right, right)
            meta.points.forEach((point, index) => assert.equal(onLine(meta.m, meta.n, point), index === right, `${point}`))
            break
        case 'table':
            if (meta.ask === 'max') {
                assert.equal(meta.answer, Math.max(...meta.ys))
                assert.equal(meta.ys.filter((y) => y === meta.answer).length, 1)
            } else if (meta.ask === 'argmin') {
                assert.equal(meta.ys[meta.answer], Math.min(...meta.ys))
                assert.equal(meta.ys.filter((y) => y === Math.min(...meta.ys)).length, 1)
            } else {
                assert.equal(question.options[right].latex, interval(meta.answer))
                meta.ys.slice(1).forEach((y, index) => assert.equal(y < meta.ys[index], index === meta.answer, `step ${index}`))
            }
            if (meta.ask !== 'decreasing') assert.equal(question.options[right].latex, text(meta.answer))
            break
        case 'intercept':
            if (meta.axis === 'x') assert.equal(meta.m * meta.answer + meta.n, 0)
            else assert.equal(meta.answer, meta.n)
            assert.equal(question.options[right].latex, text(meta.answer))
            break
        case 'through-origin':
            assert.equal(meta.m * meta.point[0], meta.point[1])
            assert.equal(question.options[right].latex, text(meta.m))
            break
        case 'slope': {
            assert.ok(equals(meta.m, slopeBetween(meta.a, meta.b)!))
            assert.ok(equals(question.answer, meta.m))
            const rightLatex = question.options[right].latex
            for (const index of wrong) assert.notEqual(question.options[index].latex, rightLatex)
            break
        }
        case 'proportional-value':
            assert.equal(meta.m * meta.x, meta.y)
            assert.equal(question.options[right].latex, text(meta.y))
            break
        case 'steepest':
            assert.equal(meta.right, right)
            assert.equal(Math.abs(meta.slopes[right]), Math.max(...meta.slopes.map(Math.abs)))
            assert.equal(meta.slopes.filter((slope) => Math.abs(slope) === Math.abs(meta.slopes[right])).length, 1)
            assert.ok(meta.slopes[right] < 0 && Math.max(...meta.slopes) < Math.abs(meta.slopes[right]))
            break
        case 'decreasing':
            assert.equal(meta.right, right)
            meta.slopes.forEach((slope, index) => assert.equal(slope < 0, index === right))
            break
        case 'line-n':
            assert.ok(onLine(meta.m, meta.n, meta.a) && onLine(meta.m, meta.n, meta.b))
            assert.equal(question.options[right].latex, text(meta.n))
            break
        case 'equation':
            assert.equal(meta.right, right)
            meta.equations.forEach((line, index) => {
                const passes = onLine(line.m, line.n, meta.a) && onLine(line.m, line.n, meta.b)
                assert.equal(passes, index === right, `${question.options[index].latex}`)
                assert.deepEqual(parseLine(question.options[index].latex), line)
            })
            break
        case 'tariff':
            assert.equal(meta.m * meta.x + meta.n, meta.y)
            assert.equal(question.options[right].latex, text(meta.mode === 'value' ? meta.y : meta.x))
            break
        case 'meeting':
            assert.equal(meta.first.m * meta.x + meta.first.n, meta.second.m * meta.x + meta.second.n)
            assert.equal(question.options[right].latex, text(meta.x))
            break
    }
    if (question.writable) {
        assert.equal(checkFunctionsPitAnswer(question, typed(question.answer)), 'correct', question.kind)
        const chain = question.solution.es.replace(/\$/g, '')
        for (const part of chain.split(/\\qquad|\\quad|\\ \\to\\ /)) {
            const values = part.split(/=|>/).map(evaluate).filter((value): value is number => value !== null)
            if (values.length >= 2 && !part.includes('>')) assert.ok(values.every((value) => Math.abs(value - values[0]) < 1e-9), `${question.kind}: ${part}`)
        }
    }
}

test('funtzioak 2. DBH games: levels, ids and routes', () => {
    assert.equal(functionsGames.length, 3)
    assert.equal(functionsGames[0].levels.length, FUNCTIONS_RACE_CIRCUITS)
    assert.equal(functionsGames.find((game) => game.id === 'plot')!.levels.length, plotLevels.length)
    assert.equal(functionsGames.find((game) => game.id === 'memory')!.levels.length, functionsMemoryLevels.length)
    assert.equal(new Set(functionsGameProgressIds).size, functionsGameProgressIds.length)
    assert.ok(!functionsGameProgressIds.some((id) => functionsLabChallengeIds.includes(id)))
    assert.equal(functionsGameModeForPath('/matematika/dbh2/funciones/juegos/puntos'), 'plot')
    assert.equal(functionsGameModeForPath('/matematika/dbh2/funciones/jokuak/lasterketa'), 'race')
    assert.equal(functionsGameModeForPath('/matematika/dbh2/funciones/jokuak'), 'hub')
})

test('funtzioak 2. DBH race: every question is right and every wrong option is really wrong', () => {
    const kinds = new Set<string>()
    for (let circuit = 0; circuit < FUNCTIONS_RACE_CIRCUITS; circuit += 1) {
        for (let seed = 1; seed <= 200; seed += 1) {
            const random = createRandom(seed * 17 + circuit)
            for (const tier of [0, 1, 2] as const) {
                const question = generateFunctionsRaceQuestion(random, circuit, tier)
                kinds.add(question.kind)
                assert.equal(question.circuit, circuit)
                check(question)
                const pit = generateFunctionsRaceQuestion(random, circuit, tier, true)
                assert.ok(pit.writable, `${circuit} ${pit.kind}`)
                check(pit)
            }
        }
        assert.ok(functionsParTime(circuit) > 60000)
    }
    for (const kind of ['quadrant', 'relation', 'area', 'value', 'square', 'inverse', 'point-on-line', 'max', 'argmin', 'decreasing', 'intercept-x', 'intercept-y', 'through-origin', 'slope', 'proportional-value', 'steepest', 'decreasing-line', 'line-n', 'equation', 'tariff-value', 'tariff-solve', 'meeting']) assert.ok(kinds.has(kind), `never generated: ${kind}`)
})

test('funtzioak 2. DBH race: fractional slopes are accepted in the pit stop', () => {
    let seen = 0
    for (let seed = 1; seed <= 300; seed += 1) {
        const question = generateFunctionsRaceQuestion(createRandom(seed), 3, 2)
        if (question.meta.kind !== 'slope' || question.answer.denominator === 1) continue
        seen += 1
        assert.equal(checkFunctionsPitAnswer(question, `${question.answer.numerator}/${question.answer.denominator}`), 'correct')
        assert.equal(checkFunctionsPitAnswer(question, `${question.answer.numerator + 1}/${question.answer.denominator}`), 'incorrect')
    }
    assert.ok(seen > 10, `only ${seen}`)
})

test('funtzioak 2. DBH plotting game: targets are valid and score fairly', () => {
    for (let level = 0; level < plotLevels.length; level += 1) {
        const { box } = plotLevels[level]
        for (let seed = 1; seed <= 60; seed += 1) {
            const targets = createPlotRound(createRandom(seed * 3 + level), level)
            assert.equal(targets.length, PLOT_ROUNDS)
            assert.equal(new Set(targets.map((target) => target.point.join(','))).size, PLOT_ROUNDS)
            for (const target of targets) {
                const [x, y] = target.point
                assert.ok(x >= box.xMin && x <= box.xMax && y >= box.yMin && y <= box.yMax, `${target.point}`)
                if (level === 0) assert.ok(x > 0 && y > 0)
                if (level === 2) {
                    const values = target.worked.replace(/\\ \\to\\ .*/, '').split('=').map(evaluate).filter((value): value is number => value !== null)
                    assert.ok(values.length >= 2 && values.every((value) => value === y), target.worked)
                }
                for (const language of ['eu', 'es', 'ar'] as const) assert.ok(target.prompt[language].length > 0)
            }
        }
    }
    assert.ok(samePoint([1, 2], [1, 2]) && !samePoint([1, 2], [2, 1]))
    assert.deepEqual([plotPoints(0), plotPoints(1), plotPoints(2)], [2, 1, 0])
    assert.deepEqual([plotStars(16), plotStars(14), plotStars(10), plotStars(4)], [3, 3, 2, 1])
})

test('funtzioak 2. DBH memory: every card has exactly one partner and the pair is true', () => {
    for (let level = 0; level < functionsMemoryLevels.length; level += 1) {
        for (let seed = 1; seed <= 80; seed += 1) {
            const cards = createFunctionsMemoryBoard(createRandom(seed * 7 + level), level)
            assert.equal(cards.length, FUNCTIONS_MEMORY_PAIRS * 2)
            assert.equal(new Set(cards.map((card) => card.latex)).size, cards.length)
            for (const card of cards.filter((item) => item.id.endsWith('-q'))) {
                const partner = cards.find((item) => item.setId === card.setId && item.id.endsWith('-a'))!
                assert.ok(card.explain && card.explain === partner.explain)
                if (level === 0) {
                    const [formula, xPart] = card.latex.split(',\\ x=')
                    const { m, n } = parseLine(formula)
                    assert.equal(partner.latex, `y=${m * Number(xPart) + n}`)
                } else if (level === 1) {
                    const [a, b] = card.latex.split(',\\ B').map((part, index) => (index === 0 ? part.slice(1) : part))
                    const point = (text: string): Point => { const [x, y] = text.replace(/[()]/g, '').split(',\\,').map(Number); return [x, y] }
                    const slope = slopeBetween(point(a), point(b))!
                    const expected = slope.denominator === 1 ? `m=${slope.numerator}` : `m=${slope.numerator < 0 ? '-' : ''}\\frac{${Math.abs(slope.numerator)}}{${slope.denominator}}`
                    assert.equal(partner.latex, expected)
                } else {
                    const { m, n } = parseLine(card.latex)
                    assert.equal(partner.latex, `(${-n / m},\\,0)`)
                    assert.ok(Number.isInteger(-n / m) && m !== 0)
                }
                // The worked line checks out when it has only numbers
                for (const part of card.explain!.split('\\ \\to\\ ')) {
                    const values = part.split('=').map(evaluate).filter((value): value is number => value !== null)
                    if (values.length >= 2) assert.ok(values.every((value) => Math.abs(value - values[0]) < 1e-9), card.explain)
                }
            }
        }
    }
    assert.equal(fraction(3, 6).denominator, 2)
})

test('funtzioak 2. DBH games: everything the games show renders in KaTeX', () => {
    const render = (latex: string) => katex.renderToString(latex, { throwOnError: true, strict: 'error' })
    const formulas = (text: string) => [...text.matchAll(/\$([^$]+)\$/g)].map((match) => match[1])
    for (let circuit = 0; circuit < FUNCTIONS_RACE_CIRCUITS; circuit += 1) {
        for (let seed = 1; seed <= 60; seed += 1) {
            for (const tier of [0, 1, 2] as const) {
                const question = generateFunctionsRaceQuestion(createRandom(seed * 11 + circuit), circuit, tier)
                for (const option of question.options) render(option.latex)
                for (const text of [question.prompt, question.solution]) for (const language of ['eu', 'es', 'ar'] as const) {
                    assert.ok(text[language].length > 0)
                    for (const formula of formulas(text[language])) render(formula)
                }
            }
        }
    }
    for (let level = 0; level < plotLevels.length; level += 1) {
        for (const target of createPlotRound(createRandom(level + 5), level)) {
            for (const language of ['eu', 'es', 'ar'] as const) for (const formula of formulas(target.prompt[language])) render(formula)
            render(target.worked)
        }
    }
    for (let level = 0; level < functionsMemoryLevels.length; level += 1) {
        for (const card of createFunctionsMemoryBoard(createRandom(level + 9), level)) {
            render(card.latex)
            render(card.explain!)
        }
    }
})
