import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import type { Tier } from '../src/features/unit-v2/games/raceCore.ts'
import { fraction, toExactDecimal, toNumber } from '../src/features/unit-v2/math/fraction.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { written } from '../src/pages/batx1-zientziak-errealak/games/race.ts'
import { bachVectorsGameModeForPath, bachVectorsGameProgressIds, bachVectorsGames, bachVectorsGameSlugs } from '../src/pages/batx1-zientziak-bektoreak/games/info.ts'
import { BACH_VECTORS_RACE_CIRCUITS, bachVectorsRaceErrorTips, checkBachVectorsPitAnswer, generateBachVectorsRaceQuestion } from '../src/pages/batx1-zientziak-bektoreak/games/race.ts'
import { createKindRounds, isKindChoice, KIND_ROUNDS, kindLevels } from '../src/pages/batx1-zientziak-bektoreak/games/kind.ts'
import { createPolygonRounds, POLYGON_ROUNDS, polygonPairs, polygonRound, vertices, type Shape } from '../src/pages/batx1-zientziak-bektoreak/games/polygon.ts'
import { BACH_VECTORS_DETECTIVE_CASES, bachVectorsDetectiveLevels, bachVectorsDetectiveNames, bachVectorsDetectiveTips, createBachVectorsDetectiveCases } from '../src/pages/batx1-zientziak-bektoreak/games/detective.ts'
import { BACH_VECTORS_MEMORY_PAIRS, bachVectorsMemoryLevels, createBachVectorsMemoryBoard } from '../src/pages/batx1-zientziak-bektoreak/games/boards.ts'

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
        // MathText turns «:» into ÷ inside formulas
        for (const [, formula] of text.es.matchAll(/\$([^$]+)\$/g)) assert.ok(!formula.includes(':'), formula)
    }
}

/** A coordinate pair written in LaTeX, read back */
const readPair = (latex: string) => latex.match(/^\((-?\d+),(-?\d+)\)$/)?.slice(1).map(Number)

test('bektoreak batx1 z games: the hub, its levels and progress ids', () => {
    assert.deepEqual(bachVectorsGames.map((game) => game.id), ['race', 'kind', 'polygon', 'detective', 'memory', 'jump', 'lines'])
    assert.equal(new Set(bachVectorsGameProgressIds).size, bachVectorsGameProgressIds.length)
    for (const id of bachVectorsGameProgressIds) assert.ok(id >= 105401 && id <= 105899, `${id}`)
    const stages = ['vectors', 'bases', 'dot', 'analytic', 'applications']
    for (const game of bachVectorsGames) {
        assert.ok(game.levels.length >= 3, game.id)
        for (const level of game.levels) assert.ok(stages.includes(level.stage), `${game.id}: ${level.stage}`)
        checkTexts([game.title, game.tagline, game.skills, ...game.levels.flatMap((level) => [level.title, level.description])])
        assert.equal(bachVectorsGameModeForPath(`/matematika/batx1-zientziak/vectores/jokuak/${bachVectorsGameSlugs[game.id]}`), game.id)
    }
    assert.equal(bachVectorsGameModeForPath('/matematika/batx1-zientziak/vectores/jokuak'), 'hub')
})

test('bektoreak batx1 z games: every race question has one right option, worked out from its numbers', () => {
    const kinds = new Set<string>()
    for (let circuit = 0; circuit < BACH_VECTORS_RACE_CIRCUITS; circuit += 1) {
        for (const tier of [0, 1, 2] as Tier[]) {
            for (let seed = 1; seed <= 60; seed += 1) {
                const question = generateBachVectorsRaceQuestion(createRandom(seed * 7919 + circuit * 31 + tier), circuit, tier)
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
                assert.equal(checkBachVectorsPitAnswer(question, typed), 'correct', `${question.kind}: ${typed}`)
                const { meta } = question
                const value = toNumber(question.answer)
                const dot = (a: number, b: number, c: number, d: number) => a * c + b * d
                const angle = (a: number, b: number, c: number, d: number) => Math.round((Math.acos(dot(a, b, c, d) / Math.hypot(a, b) / Math.hypot(c, d)) * 180) / Math.PI)
                const expected: Record<string, () => number> = {
                    ab: () => (meta.index === 0 ? meta.b1 - meta.a1 : meta.b2 - meta.a2),
                    modulus: () => Math.hypot(meta.x, meta.y),
                    combination: () => meta.a * (meta.index === 0 ? meta.u1 : meta.u2) - meta.b * (meta.index === 0 ? meta.v1 : meta.v2),
                    parallel: () => (meta.a * meta.d) / meta.c,
                    coefficient: () => {
                        // Cramer: w = a·u + b·v
                        const det = meta.u1 * meta.v2 - meta.u2 * meta.v1
                        return meta.first ? (meta.w1 * meta.v2 - meta.w2 * meta.v1) / det : (meta.u1 * meta.w2 - meta.u2 * meta.w1) / det
                    },
                    canonical: () => meta.a * (meta.index === 0 ? meta.u1 : meta.u2) + meta.b * (meta.index === 0 ? meta.v1 : meta.v2),
                    'angle-product': () => meta.p * meta.q * Math.cos((meta.angle * Math.PI) / 180),
                    polygon: () => (meta.triangle ? meta.s * meta.s * Math.cos((2 * Math.PI) / 3) : -meta.s * meta.s),
                    'square-sum': () => meta.p ** 2 + 2 * meta.k + meta.q ** 2,
                    dot: () => dot(meta.u1, meta.u2, meta.v1, meta.v2),
                    perpendicular: () => -(meta.a * meta.d) / meta.c,
                    angle: () => angle(meta.u1, meta.u2, meta.v1, meta.v2),
                    projection: () => dot(meta.u1, meta.u2, meta.v1, meta.v2) / Math.hypot(meta.v1, meta.v2),
                    work: () => dot(meta.f1, meta.f2, meta.d1, meta.d2),
                    resultant: () => Math.hypot(meta.p, meta.q)
                }
                assert.ok(expected[question.kind], `no check for ${question.kind}`)
                assert.ok(Math.abs(value - expected[question.kind]()) < 1e-9, `${question.kind}: ${value} ≠ ${expected[question.kind]()}`)
                if (question.kind === 'parallel') assert.equal(meta.a * meta.d, value * meta.c)
                if (question.kind === 'perpendicular') assert.equal(value * meta.c + meta.a * meta.d, 0)
            }
        }
    }
    assert.equal(kinds.size, 15)
    checkTexts(Object.values(bachVectorsRaceErrorTips))
})

test('bektoreak batx1 z games: ¿número o vector?', () => {
    for (let level = 0; level < kindLevels.length; level += 1) {
        const seen = new Set<string>()
        for (let seed = 1; seed <= 80; seed += 1) {
            const rounds = createKindRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, KIND_ROUNDS)
            for (const round of rounds) {
                seen.add(round.expression)
                assert.ok(kindLevels[level].includes(round.expression))
                render(round.latex)
                render(round.working)
                const { u, v, w } = round
                const dot = (a: number[], b: number[]) => a[0] * b[0] + a[1] * b[1]
                if (round.kind === 'nonsense') {
                    assert.equal(round.answer, null)
                    assert.deepEqual(round.options, [])
                    assert.ok(isKindChoice(round, 'nonsense', null))
                    assert.ok(!isKindChoice(round, 'number', null))
                    continue
                }
                assert.equal(round.options.length, 4)
                assert.equal(new Set(round.options).size, 4)
                assert.ok(round.options.includes(round.answer!))
                for (const option of round.options) render(option)
                assert.ok(isKindChoice(round, round.kind, round.answer))
                assert.ok(!isKindChoice(round, round.kind === 'number' ? 'vector' : 'number', round.answer))
                const expected: Record<string, () => number | number[]> = {
                    dot: () => dot(u, v),
                    combination: () => [2 * u[0] - v[0], 2 * u[1] - v[1]],
                    norm: () => Math.hypot(u[0], u[1]),
                    self: () => dot(u, u),
                    scaled: () => [dot(u, v) * w[0], dot(u, v) * w[1]],
                    'dot-sum': () => dot(u, [v[0] + w[0], v[1] + w[1]]),
                    'norm-times': () => [Math.hypot(u[0], u[1]) * v[0], Math.hypot(u[0], u[1]) * v[1]],
                    'dot-dot': () => dot(u, v) * dot(v, w)
                }
                const value = expected[round.expression]()
                if (Array.isArray(value)) {
                    assert.equal(round.kind, 'vector', round.expression)
                    assert.deepEqual(readPair(round.answer!), value.map((item) => item + 0), round.expression)
                } else {
                    assert.equal(round.kind, 'number', round.expression)
                    const read = round.answer!.startsWith('\\sqrt') ? Math.sqrt(Number(round.answer!.slice(6, -1))) : Number(round.answer)
                    assert.ok(Math.abs(read - value) < 1e-9, `${round.expression}: ${round.answer} ≠ ${value}`)
                }
            }
        }
        assert.deepEqual([...seen].sort(), [...new Set(kindLevels[level])].sort(), `level ${level}`)
    }
})

test('bektoreak batx1 z games: productos en el polígono', () => {
    const shapes: Shape[] = ['square', 'triangle', 'hexagon']
    for (const shape of shapes) {
        for (const side of [2, 3, 4]) {
            const points = vertices(shape, side)
            // Every side of the polygon is s long
            const names = Object.keys(points).filter((name) => name !== 'O')
            names.forEach((name, index) => {
                const next = points[names[(index + 1) % names.length]]
                assert.ok(Math.abs(Math.hypot(next[0] - points[name][0], next[1] - points[name][1]) - side) < 1e-9, `${shape} ${name}`)
            })
            for (const level of polygonPairs[shape]) {
                for (const pair of level) {
                    const round = polygonRound(shape, side, pair)
                    const [a, b] = pair.split('·')
                    const u = [points[a[1]][0] - points[a[0]][0], points[a[1]][1] - points[a[0]][1]]
                    const v = [points[b[1]][0] - points[b[0]][0], points[b[1]][1] - points[b[0]][1]]
                    const dot = u[0] * v[0] + u[1] * v[1]
                    assert.ok(Math.abs(round.value - dot) < 1e-9, `${shape} ${pair}: ${round.value} ≠ ${dot}`)
                    assert.equal(round.answer, written(fraction(Math.round(round.value * 4), 4)))
                    assert.equal(round.options.length, 4, `${shape} ${pair}: ${round.options.join(' | ')}`)
                    assert.equal(new Set(round.options).size, 4)
                    assert.ok(round.options.includes(round.answer))
                    for (const option of round.options) render(option)
                    render(round.working)
                    assert.ok([0, 30, 45, 60, 90, 120, 135, 150, 180].includes(round.angle), `${shape} ${pair}: ${round.angle}`)
                }
            }
        }
    }
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 60; seed += 1) {
            const rounds = createPolygonRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, POLYGON_ROUNDS)
            assert.equal(new Set(rounds.map((round) => `${round.shape}${round.first.join('')}${round.second.join('')}`)).size, POLYGON_ROUNDS)
        }
    }
    // Level 1 starts both vectors at the same point; level 2 never does, so one has to be moved
    for (const shape of shapes) for (const pair of polygonPairs[shape][0]) assert.equal(pair[0], pair[3], `${shape} ${pair}`)
    for (const shape of shapes) for (const pair of polygonPairs[shape][1]) assert.notEqual(pair[0], pair[3], `${shape} ${pair}`)
})

test('bektoreak batx1 z games: the vectors detective', () => {
    checkTexts([...Object.values(bachVectorsDetectiveNames), ...Object.values(bachVectorsDetectiveTips)])
    for (let level = 0; level < bachVectorsDetectiveLevels.length; level += 1) {
        const seen = new Set<string>()
        for (let seed = 1; seed <= 60; seed += 1) {
            const cases = createBachVectorsDetectiveCases(createRandom(seed * 7919 + level), level)
            assert.equal(cases.length, BACH_VECTORS_DETECTIVE_CASES)
            for (const item of cases) {
                seen.add(item.error)
                assert.ok(bachVectorsDetectiveLevels[level].includes(item.error))
                assert.equal(item.lines.length, 3)
                assert.ok(item.wrong >= 0 && item.wrong < item.lines.length)
                assert.equal(item.options.length, 3)
                assert.ok(item.options.includes(item.error))
                assert.ok(Math.abs(item.right - item.reached) > 1e-9)
                for (const line of item.lines) render(line.latex)
                render(item.fix)
                checkTexts([item.problem, ...item.lines.map((line) => line.label)])
            }
        }
        assert.equal(seen.size, 4, `level ${level}`)
    }
})

test('bektoreak batx1 z games: memory boards', () => {
    for (let level = 0; level < bachVectorsMemoryLevels.length; level += 1) {
        for (let seed = 1; seed <= 80; seed += 1) {
            const board = createBachVectorsMemoryBoard(createRandom(seed * 7919 + level), level)
            assert.equal(board.length, BACH_VECTORS_MEMORY_PAIRS * 2)
            const answers = board.filter((card) => card.id.endsWith('-a'))
            assert.equal(new Set(answers.map((card) => card.latex)).size, BACH_VECTORS_MEMORY_PAIRS)
            for (const card of board) {
                render(card.latex)
                if (card.explain) render(card.explain)
            }
            for (const question of board.filter((card) => card.id.endsWith('-q'))) {
                const answer = board.find((card) => card.id === `${question.setId}-a`)!.latex
                const numbers = [...question.latex.matchAll(/-?\d+/g)].map((match) => Number(match[0]))
                if (bachVectorsMemoryLevels[level] === 'dot') assert.equal(Number(answer), numbers[0] * numbers[2] + numbers[1] * numbers[3], question.latex)
                if (bachVectorsMemoryLevels[level] === 'magnitude') {
                    const value = answer.startsWith('\\sqrt') ? Math.sqrt(Number(answer.slice(6, -1))) : Number(answer)
                    assert.ok(Math.abs(value - Math.hypot(numbers[0], numbers[1])) < 1e-9, question.latex)
                }
                if (bachVectorsMemoryLevels[level] === 'perpendicular') {
                    const k = Number(answer.replace('k=', ''))
                    assert.equal(k * numbers[1] + numbers[0] * numbers[2], 0, question.latex)
                }
            }
        }
    }
})
