import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import type { Tier } from '../src/features/unit-v2/games/raceCore.ts'
import { toExactDecimal, toNumber } from '../src/features/unit-v2/math/fraction.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { written } from '../src/pages/batx1-zientziak-errealak/games/race.ts'
import { localize } from '../src/pages/dbh4-akademikoak-trigonometria/text.ts'
import { createTrianglesMemoryBoard, TRIANGLES_MEMORY_PAIRS, trianglesMemoryLevels } from '../src/pages/batx1-zientziak-triangeluak/games/boards.ts'
import { COUNT_ROUNDS, countWorking, createCountRounds } from '../src/pages/batx1-zientziak-triangeluak/games/count.ts'
import { createTrianglesDetectiveCases, TRIANGLES_DETECTIVE_CASES, trianglesDetectiveLevels, trianglesDetectiveNames, trianglesDetectiveTips } from '../src/pages/batx1-zientziak-triangeluak/games/detective.ts'
import { trianglesGameModeForPath, trianglesGameProgressIds, trianglesGames, trianglesGameSlugs } from '../src/pages/batx1-zientziak-triangeluak/games/info.ts'
import { checkMove, createPiecesRounds, offeredMoves, opposite, PIECES, PIECES_ROUNDS, solutionMoves, type Piece } from '../src/pages/batx1-zientziak-triangeluak/games/pieces.ts'
import { checkTrianglesPitAnswer, generateTrianglesRaceQuestion, TRIANGLES_RACE_CIRCUITS } from '../src/pages/batx1-zientziak-triangeluak/games/race.ts'
import { createStationRounds, flagIsClose, MAP, STATION_ROUNDS, stationDistance } from '../src/pages/batx1-zientziak-triangeluak/games/station.ts'

const languages = ['eu', 'es', 'en', 'ar'] as const
const D = Math.PI / 180
const render = (latex: string, language: (typeof languages)[number] = 'es') => katex.renderToString(formulaFor(language, localize(language, latex)), { throwOnError: true, strict: 'error' })

function checkTexts(texts: LocalizedText[]) {
    for (const text of texts) {
        for (const language of languages) {
            assert.ok(text[language].length > 0)
            for (const [, formula] of text[language].matchAll(/\$([^$]+)\$/g)) render(formula, language)
            // \sen and \tg are already turned into each language's names
            assert.ok(!/\\(?:sen|tg)(?![a-zA-Z])/.test(text[language]), text[language])
        }
        assert.ok(!text.ar.includes('{,}'), text.ar)
        assert.ok(!/[؀-ۿ]/.test([...text.ar.matchAll(/\$([^$]+)\$/g)].map((match) => match[1]).join('')), text.ar)
        assert.ok(!/\d(?:ri|ren|rekin|ekin|ek|ak|ra|tik|z|ei|en|k)(?![a-zA-Z])/.test(text.eu.replace(/\$[^$]+\$/g, '')), text.eu)
        assert.ok(!/\$(?:ri|ren|rekin|z|ra|tik|ei)(?![a-zA-Z])/.test(text.eu), text.eu)
        // MathText turns «:» into ÷ inside formulas
        for (const [, formula] of text.es.matchAll(/\$([^$]+)\$/g)) assert.ok(!formula.includes(':'), formula)
    }
}

test('triangeluak batx1 z games: the hub, its levels and progress ids', () => {
    assert.deepEqual(trianglesGames.map((game) => game.id), ['race', 'count', 'pieces', 'station', 'detective', 'memory', 'circle', 'ratios'])
    assert.equal(new Set(trianglesGameProgressIds).size, trianglesGameProgressIds.length)
    for (const id of trianglesGameProgressIds) assert.ok(id >= 102401 && id <= 102899, `${id}`)
    const stages = ['angles', 'right', 'sines', 'cosines', 'applications']
    for (const game of trianglesGames) {
        assert.ok(game.levels.length >= 3, game.id)
        for (const level of game.levels) assert.ok(stages.includes(level.stage), `${game.id}: ${level.stage}`)
        checkTexts([game.title, game.tagline, game.skills, ...game.levels.flatMap((level) => [level.title, level.description])])
        assert.equal(trianglesGameModeForPath(`/matematika/batx1-zientziak/resolucion-triangulos/jokuak/${trianglesGameSlugs[game.id]}`), game.id)
    }
    assert.equal(trianglesGameModeForPath('/matematika/batx1-zientziak/resolucion-triangulos/jokuak'), 'hub')
})

test('triangeluak batx1 z games: every race question has one right option, worked out from its numbers', () => {
    const kinds = new Set<string>()
    for (let circuit = 0; circuit < TRIANGLES_RACE_CIRCUITS; circuit += 1) {
        for (const tier of [0, 1, 2] as Tier[]) {
            for (let seed = 1; seed <= 60; seed += 1) {
                const question = generateTrianglesRaceQuestion(createRandom(seed * 7919 + circuit * 31 + tier), circuit, tier)
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
                assert.equal(checkTrianglesPitAnswer(question, typed), 'correct', `${question.kind}: ${typed}`)
                const { meta } = question
                const value = toNumber(question.answer)
                const law = (b: number, c: number, angle: number) => Math.sqrt(b * b + c * c - 2 * b * c * Math.cos(angle * D))
                const expected: Record<string, () => number> = {
                    reduce: () => ((meta.angle % 360) + 360) % 360,
                    quadrant: () => -Math.sqrt(1 - (meta.p / meta.h) ** 2),
                    obtuse: () => 180 - Math.asin(Math.sin(meta.angle * D)) / D,
                    hypotenuse: () => Math.hypot(meta.p, meta.q),
                    leg: () => meta.hypotenuse * Math.sin(30 * D),
                    height: () => meta.a * Math.sin((180 - 150) * D),
                    'sine-side': () => (meta.a * Math.sin(90 * D)) / Math.sin(30 * D),
                    count: () => {
                        // From sen B = b · sen A / a: none above 1, one when it is 1, else the angles B that fit with A
                        const sine = (meta.b * Math.sin(30 * D)) / meta.a
                        if (sine > 1 + 1e-9) return 0
                        if (Math.abs(sine - 1) < 1e-9) return 1
                        const B = Math.asin(sine) / D
                        return [B, 180 - B].filter((angle) => 30 + angle < 180 - 1e-6).length
                    },
                    radius: () => meta.a / (2 * Math.sin(meta.angle * D)),
                    'cosine-side': () => law(meta.b, meta.c, meta.angle),
                    angle: () => Math.acos((meta.b ** 2 + meta.c ** 2 - meta.a ** 2) / (2 * meta.b * meta.c)) / D,
                    largest: () => law(meta.b, meta.c, 120),
                    area: () => 0.5 * meta.b * meta.c * Math.sin(meta.angle * D),
                    heron: () => {
                        const s = (meta.x + meta.y + meta.z) / 2
                        return Math.sqrt(s * (s - meta.x) * (s - meta.y) * (s - meta.z))
                    },
                    forces: () => Math.hypot(meta.p, meta.q)
                }
                assert.ok(expected[question.kind], question.kind)
                assert.ok(Math.abs(expected[question.kind]() - value) < 1e-9, `${question.kind}: ${JSON.stringify(meta)} → ${value}`)
            }
        }
    }
    assert.equal(kinds.size, 15)
})

test('triangeluak batx1 z games: ¿cuántos triángulos?', () => {
    for (const level of [0, 1, 2]) {
        for (let seed = 1; seed <= 60; seed += 1) {
            const rounds = createCountRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, COUNT_ROUNDS)
            assert.equal(new Set(rounds.map((round) => `${round.A}-${round.b}-${round.a}`)).size, COUNT_ROUNDS)
            assert.equal(new Set(rounds.map((round) => round.count)).size, 3, `level ${level}`)
            for (const round of rounds) {
                // The count worked out again from sen B = b · sen A / a: none above 1, one when it is 1, else the angles B that fit with A
                const sine = (round.b * Math.sin(round.A * D)) / round.a
                const B = Math.asin(Math.min(1, sine)) / D
                const count = sine > 1 + 1e-9 ? 0 : Math.abs(sine - 1) < 1e-9 ? 1 : [B, 180 - B].filter((angle) => round.A + angle < 180 - 1e-6).length
                assert.equal(round.count, count, `${round.A} ${round.b} ${round.a}`)
                const { angles } = countWorking(round)
                assert.equal(angles.length, round.count)
                for (const B of angles) assert.ok(Math.abs(round.a / Math.sin(round.A * D) - round.b / Math.sin(B * D)) < 1e-9)
                if (level === 0) assert.equal(round.drawing, 'height')
                if (level === 2) assert.equal(round.drawing, 'none')
            }
        }
    }
})

test('triangeluak batx1 z games: resuelve por piezas', () => {
    for (const level of [0, 1, 2]) {
        const shapes = new Set<string>()
        for (let seed = 1; seed <= 60; seed += 1) {
            const rounds = createPiecesRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, PIECES_ROUNDS)
            for (const round of rounds) {
                shapes.add(round.shape)
                const t = round.triangle
                // A real triangle: angles add up to 180° and the sine rule and the cosine rule hold
                assert.ok(Math.abs(t.A + t.B + t.C - 180) < 1e-9)
                for (const side of ['a', 'b', 'c'] as const) assert.ok(Math.abs(t[side] / Math.sin(t[opposite(side) as 'A'] * D) - t.a / Math.sin(t.A * D)) < 1e-9)
                assert.ok(Math.abs(t.a ** 2 - (t.b ** 2 + t.c ** 2 - 2 * t.b * t.c * Math.cos(t.A * D))) < 1e-9)
                assert.equal(round.known.length, 3)
                // The good order finishes it, every move of it is allowed when it is made
                const known: Piece[] = [...round.known]
                for (const move of solutionMoves(round)) {
                    assert.equal(checkMove(round, known, move), null, `${round.shape} ${move.piece} ${move.tool}`)
                    known.push(move.piece)
                }
                assert.deepEqual([...known].sort(), [...PIECES].sort())
                // At the start, some offered move is wrong, so the round is not a giveaway
                assert.ok(offeredMoves(round.known).some((move) => checkMove(round, round.known, move) !== null))
            }
        }
        assert.ok(shapes.size >= 2, `level ${level}`)
    }
    // The rules themselves, on one triangle with sides 7, 5, 3 and A = 120°
    const round = createPiecesRounds(createRandom(1), 1)[0]
    const triangle = { a: 7, b: 5, c: 3, A: 120, B: Math.acos(33 / 42) / D, C: 0 }
    triangle.C = 180 - triangle.A - triangle.B
    const fixed = { ...round, triangle, known: ['a', 'b', 'A'] as Piece[] }
    assert.equal(checkMove(fixed, fixed.known, { piece: 'B', tool: 'sines' }), null, 'b < a: B is safe by the sines')
    assert.equal(checkMove(fixed, fixed.known, { piece: 'C', tool: 'sum' }), 'two-angles')
    assert.equal(checkMove(fixed, fixed.known, { piece: 'c', tool: 'cosine' }), 'two-sides-angle')
    assert.equal(checkMove(fixed, fixed.known, { piece: 'c', tool: 'sines' }), 'opposite-unknown')
    assert.equal(checkMove(fixed, ['b', 'c', 'B'], { piece: 'C', tool: 'sines' }), null)
    assert.equal(checkMove(fixed, ['a', 'b', 'B'], { piece: 'A', tool: 'sines' }), 'ambiguous', 'a > b: A could be obtuse')
    assert.equal(checkMove(fixed, ['a', 'b', 'c'], { piece: 'A', tool: 'sines' }), 'no-pair')
    assert.equal(checkMove(fixed, ['a', 'b', 'c'], { piece: 'A', tool: 'cosine' }), null)
})

test('triangeluak batx1 z games: localiza la emisora', () => {
    for (let seed = 1; seed <= 100; seed += 1) {
        const rounds = createStationRounds(createRandom(seed * 7919))
        assert.equal(rounds.length, STATION_ROUNDS)
        for (const round of rounds) {
            const [x, y] = round.station
            // The station is where the two sight lines cross, inside the map
            assert.ok(y >= MAP.top && y < MAP.base && x > MAP.left && x < MAP.right)
            assert.ok(Math.abs(Math.atan2(MAP.base - y, x - MAP.left) / D - round.alpha) < 1e-9)
            assert.ok(Math.abs(Math.atan2(MAP.base - y, MAP.right - x) / D - round.beta) < 1e-9)
            // AE on the map, in metres, is the sine rule's
            const metresPerPixel = round.base / (MAP.right - MAP.left)
            assert.ok(Math.abs(Math.hypot(x - MAP.left, MAP.base - y) * metresPerPixel - stationDistance(round.base, round.alpha, round.beta)) < 1e-6)
            assert.ok(Math.abs(round.distance - stationDistance(round.base, round.alpha, round.beta)) < 1e-9)
            assert.equal(round.options.length, 3)
            assert.equal(new Set(round.options.map(Math.round)).size, 3)
            assert.ok(round.options.some((option) => Math.round(option) === Math.round(round.distance)))
            assert.ok(flagIsClose(round, round.station, 0) && !flagIsClose(round, [round.station[0] + 60, round.station[1]], 1))
        }
    }
})

test('triangeluak batx1 z games: el detective de triángulos', () => {
    for (const [level, errors] of trianglesDetectiveLevels.entries()) {
        const seen = new Set<string>()
        for (let seed = 1; seed <= 40; seed += 1) {
            const cases = createTrianglesDetectiveCases(createRandom(seed * 7919 + level), level)
            assert.equal(cases.length, TRIANGLES_DETECTIVE_CASES)
            assert.equal(new Set(cases.map((item) => item.problem.es)).size, cases.length)
            for (const item of cases) {
                seen.add(item.error)
                assert.ok(errors.includes(item.error))
                assert.equal(item.lines.length, 3)
                assert.equal(new Set(item.lines.map((line) => line.latex)).size, 3, item.lines.map((line) => line.latex).join(' | '))
                assert.ok(item.wrong >= 0 && item.wrong < 3)
                assert.equal(item.options.length, 3)
                assert.ok(item.options.includes(item.error))
                assert.ok(Math.abs(item.right - item.reached) > 1e-6)
                for (const line of item.lines) for (const language of languages) render(line.latex, language)
                for (const language of languages) render(item.fix, language)
                checkTexts([item.problem, ...item.lines.map((line) => line.label)])
            }
        }
        assert.equal(seen.size, errors.length, `level ${level}`)
    }
    checkTexts([...Object.values(trianglesDetectiveNames), ...Object.values(trianglesDetectiveTips)])
})

test('triangeluak batx1 z games: memory boards have one partner per card, and the pairs are right', () => {
    for (const [level] of trianglesMemoryLevels.entries()) {
        for (let seed = 1; seed <= 60; seed += 1) {
            const cards = createTrianglesMemoryBoard(createRandom(seed * 7919 + level), level)
            assert.equal(cards.length, TRIANGLES_MEMORY_PAIRS * 2)
            assert.equal(new Set(cards.map((card) => card.latex)).size, cards.length)
            const bySet = new Map<number, string[]>()
            for (const card of cards) {
                render(card.latex)
                // Values only: no names of ratios, which differ from language to language
                assert.ok(!/\\(?:sen|sin|tg|tan|cos)/.test(card.latex), card.latex)
                bySet.set(card.setId, [...(bySet.get(card.setId) ?? []), card.latex])
            }
            assert.equal(bySet.size, TRIANGLES_MEMORY_PAIRS)
            for (const pair of bySet.values()) {
                // The cards are shuffled: the question is the one in rows, or (turns) the angle outside 0°–360°
                const outside = (latex: string) => { const value = Number(latex.match(/-?\d+/)?.[0]); return value < 0 || value >= 360 }
                const [question, answer] = level === 0 ? (outside(pair[0]) ? pair : [pair[1], pair[0]]) : pair[0].includes('array') ? pair : [pair[1], pair[0]]
                const numbers = (text: string) => (text.match(/-?\d+/g) ?? []).map(Number)
                if (level === 0) {
                    const [angle] = numbers(question)
                    const [reduced] = numbers(answer)
                    assert.equal(((angle % 360) + 360) % 360, reduced, `${question} ↔ ${answer}`)
                }
                if (level === 1) {
                    const [x, y, angle] = numbers(question)
                    const [side] = numbers(answer)
                    if (question.startsWith('\\begin{array}{c}a')) assert.ok(Math.abs((x * Math.sin(90 * D)) / Math.sin(30 * D) - side) < 1e-9 && y === 30 && angle === 90, question)
                    else assert.ok(Math.abs(Math.sqrt(x * x + y * y - 2 * x * y * Math.cos(angle * D)) - side) < 1e-9, `${question} ↔ ${answer}`)
                }
                if (level === 2) {
                    const values = numbers(question)
                    const [area] = numbers(answer)
                    if (question.includes('A{=}')) assert.ok(Math.abs(0.5 * values[0] * values[1] * Math.sin(values[2] * D) - area) < 1e-9, question)
                    else {
                        const [x, y, z] = values
                        const s = (x + y + z) / 2
                        assert.ok(Math.abs(Math.sqrt(s * (s - x) * (s - y) * (s - z)) - area) < 1e-9, `${question} ↔ ${answer}`)
                    }
                }
            }
        }
    }
})
