import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import type { Tier } from '../src/features/unit-v2/games/raceCore.ts'
import { toExactDecimal, toNumber } from '../src/features/unit-v2/math/fraction.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { written } from '../src/pages/batx1-zientziak-errealak/games/race.ts'
import { bachGeometryGameModeForPath, bachGeometryGameProgressIds, bachGeometryGames, bachGeometryGameSlugs } from '../src/pages/batx1-zientziak-geometria/games/info.ts'
import { BACH_GEOMETRY_RACE_CIRCUITS, bachGeometryRaceErrorTips, checkBachGeometryPitAnswer, generateBachGeometryRaceQuestion } from '../src/pages/batx1-zientziak-geometria/games/race.ts'
import { createTwinRounds, rightChoice, TWINS_ROUNDS, twinLevels } from '../src/pages/batx1-zientziak-geometria/games/twins.ts'
import { createRadarRounds, detected, RADAR_ROUNDS, radarLevels } from '../src/pages/batx1-zientziak-geometria/games/radar.ts'
import { BACH_GEOMETRY_DETECTIVE_CASES, bachGeometryDetectiveLevels, bachGeometryDetectiveNames, bachGeometryDetectiveTips, createBachGeometryDetectiveCases } from '../src/pages/batx1-zientziak-geometria/games/detective.ts'
import { BACH_GEOMETRY_MEMORY_PAIRS, bachGeometryMemoryLevels, createBachGeometryMemoryBoard } from '../src/pages/batx1-zientziak-geometria/games/boards.ts'
import { continuousLatex, explicitLatex, generalLatex, isOn, lineThrough, parametricLatex, pointSlopeLatex, reduced, sameLine, vectorLatex } from '../src/pages/batx1-zientziak-geometria/games/lines.ts'

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

/** Ax + By + C = 0 read back from its LaTeX */
function readGeneral(latex: string) {
    const match = latex.match(/^(-?\d*)x([+-]\d*)y([+-]\d+)?=0$/)
    assert.ok(match, latex)
    const coefficient = (text: string) => (text === '' || text === '+' ? 1 : text === '-' ? -1 : Number(text))
    return { A: coefficient(match![1]), B: coefficient(match![2]), C: match![3] ? Number(match![3]) : 0 }
}

/** A number written in LaTeX by toLatex/written: 3, -2, \frac{3}{4}, -\frac{1}{2}, 2{,}5 */
function readNumber(latex: string) {
    const fractionMatch = latex.match(/^(-?)\\frac\{(\d+)\}\{(\d+)\}$/)
    if (fractionMatch) return (fractionMatch[1] ? -1 : 1) * (Number(fractionMatch[2]) / Number(fractionMatch[3]))
    return Number(latex.replace('{,}', '.'))
}

test('geometria batx1 z games: the hub, its levels and progress ids', () => {
    assert.deepEqual(bachGeometryGames.map((game) => game.id), ['race', 'twins', 'radar', 'detective', 'memory', 'lines'])
    assert.equal(new Set(bachGeometryGameProgressIds).size, bachGeometryGameProgressIds.length)
    for (const id of bachGeometryGameProgressIds) assert.ok(id >= 106401 && id <= 106899, `${id}`)
    const stages = ['points', 'lines', 'positions', 'distances', 'triangles']
    for (const game of bachGeometryGames) {
        assert.ok(game.levels.length >= 3, game.id)
        for (const level of game.levels) assert.ok(stages.includes(level.stage), `${game.id}: ${level.stage}`)
        checkTexts([game.title, game.tagline, game.skills, ...game.levels.flatMap((level) => [level.title, level.description])])
        assert.equal(bachGeometryGameModeForPath(`/matematika/batx1-zientziak/geometria-analitica/jokuak/${bachGeometryGameSlugs[game.id]}`), game.id)
    }
    assert.equal(bachGeometryGameModeForPath('/matematika/batx1-zientziak/geometria-analitica/jokuak'), 'hub')
})

test('geometria batx1 z games: the forms of a line', () => {
    const line = lineThrough([1, -2], [3, 2])
    assert.deepEqual(line, { A: 2, B: -3, C: -8 })
    assert.equal(generalLatex(line), '2x-3y-8=0')
    assert.equal(explicitLatex(line), 'y=\\frac{2}{3}x-\\frac{8}{3}')
    assert.equal(pointSlopeLatex([1, -2], [3, 2]), 'y+2=\\frac{2}{3}(x-1)')
    assert.equal(vectorLatex([1, -2], [3, 2]), '(x,y)=(1,-2)+t(3,2)')
    assert.equal(parametricLatex([0, -2], [1, -1]), '\\begin{cases}x=t\\\\ y=-2-t\\end{cases}')
    assert.equal(continuousLatex([1, -2], [3, 2]), '\\frac{x-1}{3}=\\frac{y+2}{2}')
    assert.deepEqual(reduced({ A: -4, B: 6, C: 2 }), { A: 2, B: -3, C: -1 })
    assert.ok(sameLine({ A: 2, B: -3, C: -8 }, { A: -4, B: 6, C: 16 }))
    assert.ok(isOn(line, [4, 0]))
})

test('geometria batx1 z games: every race question has one right option, worked out from its numbers', () => {
    const kinds = new Set<string>()
    for (let circuit = 0; circuit < BACH_GEOMETRY_RACE_CIRCUITS; circuit += 1) {
        for (const tier of [0, 1, 2] as Tier[]) {
            for (let seed = 1; seed <= 60; seed += 1) {
                const question = generateBachGeometryRaceQuestion(createRandom(seed * 7919 + circuit * 31 + tier), circuit, tier)
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
                assert.equal(checkBachGeometryPitAnswer(question, typed), 'correct', `${question.kind}: ${typed}`)
                const { meta } = question
                const value = toNumber(question.answer)
                const expected: Record<string, () => number> = {
                    midpoint: () => (meta.index === 0 ? (meta.a1 + meta.b1) / 2 : (meta.a2 + meta.b2) / 2),
                    symmetric: () => (meta.index === 0 ? 2 * meta.p1 - meta.a1 : 2 * meta.p2 - meta.a2),
                    divide: () => meta.a + (meta.tn / meta.td) * (meta.b - meta.a),
                    slope: () => -meta.A / meta.B,
                    intercept: () => -meta.C / meta.B,
                    'line-c': () => -(meta.A * meta.p1 + meta.B * meta.p2),
                    'parallel-k': () => (meta.a2 * meta.b) / meta.b2,
                    'perpendicular-k': () => -(meta.b * meta.b2) / meta.a2,
                    crossing: () => {
                        // Cramer
                        const det = meta.a1 * meta.b2 - meta.a2 * meta.b1
                        return meta.index === 0 ? (meta.e1 * meta.b2 - meta.e2 * meta.b1) / det : (meta.a1 * meta.e2 - meta.a2 * meta.e1) / det
                    },
                    'point-line': () => Math.abs(meta.A * meta.p1 + meta.B * meta.p2 + meta.C) / Math.hypot(meta.A, meta.B),
                    'parallel-lines': () => Math.abs(meta.c1 - meta.c2) / Math.hypot(meta.A, meta.B),
                    reflection: () => 2 * meta.k - meta.own,
                    centroid: () => (meta.v1 + meta.v2 + meta.v3) / 3,
                    area: () => Math.abs(meta.u1 * meta.v2 - meta.u2 * meta.v1) / 2,
                    'third-vertex': () => 3 * meta.g - meta.a - meta.b
                }
                assert.ok(expected[question.kind], `no check for ${question.kind}`)
                assert.ok(Math.abs(value - expected[question.kind]()) < 1e-9, `${question.kind}: ${value} ≠ ${expected[question.kind]()}`)
            }
        }
    }
    assert.equal(kinds.size, 15)
    checkTexts(Object.values(bachGeometryRaceErrorTips))
})

test('geometria batx1 z games: rectas gemelas', () => {
    for (let level = 0; level < twinLevels.length; level += 1) {
        const pairs = new Set<string>()
        for (let seed = 1; seed <= 80; seed += 1) {
            const rounds = createTwinRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, TWINS_ROUNDS)
            for (const round of rounds) {
                pairs.add(`${round.given}>${round.target}`)
                assert.ok(twinLevels[level].some(([given, target]) => given === round.given && target === round.target))
                assert.ok(isOn(round.line, round.givenPoint))
                assert.ok(sameLine(lineThrough(round.givenPoint, round.givenDirection), round.line))
                render(round.givenLatex)
                assert.equal(round.choices.length, 4)
                assert.equal(new Set(round.choices.map((choice) => choice.latex)).size, 4)
                assert.equal(round.choices.filter((choice) => choice.error === null).length, 1)
                assert.ok(sameLine(rightChoice(round).line, round.line))
                assert.notEqual(rightChoice(round).latex, round.givenLatex)
                for (const choice of round.choices) {
                    render(choice.latex)
                    // Each option is written with a point of its own line and a direction along it
                    assert.ok(isOn(choice.line, choice.point), choice.latex)
                    assert.equal(choice.line.A * choice.direction[0] + choice.line.B * choice.direction[1], 0, choice.latex)
                    if (choice.error !== null) assert.ok(!sameLine(choice.line, round.line), `${choice.error}: ${choice.latex}`)
                }
                for (let index = 0; index < 4; index += 1) for (let other = index + 1; other < 4; other += 1) assert.ok(!sameLine(round.choices[index].line, round.choices[other].line))
            }
            assert.equal(new Set(rounds.map((round) => generalLatex(round.line))).size, TWINS_ROUNDS)
        }
        assert.equal(pairs.size, twinLevels[level].length, `level ${level}`)
    }
})

test('geometria batx1 z games: el radar', () => {
    for (let level = 0; level < radarLevels.length; level += 1) {
        const errors = new Set<string>()
        let near = 0
        for (let seed = 1; seed <= 80; seed += 1) {
            const rounds = createRadarRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, RADAR_ROUNDS)
            for (const round of rounds) {
                assert.equal(round.kind, radarLevels[level])
                const { A, B, C } = round.route
                const length = Math.hypot(A, B)
                const distance = round.second
                    ? Math.abs(C - round.second.C / 2) / length
                    : Math.abs(A * round.radar[0] + B * round.radar[1] + C) / length
                if (round.second) assert.deepEqual([round.second.A, round.second.B], [2 * A, 2 * B])
                assert.ok(Math.abs(toNumber(round.value) - distance) < 1e-9, `${round.routeLatex}: ${toNumber(round.value)} ≠ ${distance}`)
                assert.equal(round.answer, written(round.value))
                assert.equal(round.options.length, 4)
                assert.equal(new Set(round.options.map((option) => option.latex)).size, 4)
                assert.equal(round.options.filter((option) => option.error === null).length, 1)
                assert.equal(round.options.find((option) => option.error === null)!.latex, round.answer)
                for (const option of round.options) {
                    render(option.latex)
                    if (option.error) errors.add(option.error)
                    if (option.error) assert.notEqual(readNumber(option.latex), distance)
                }
                render(round.routeLatex)
                if (round.secondLatex) render(round.secondLatex)
                render(round.working)
                if (round.kind === 'explicit') assert.ok(round.routeLatex.startsWith('y='))
                if (!round.second) {
                    assert.ok(round.range >= 2)
                    assert.equal(detected(round), distance <= round.range)
                    if (detected(round)) near += 1
                }
            }
        }
        assert.ok(errors.size >= 3, `level ${level}: ${[...errors].join(', ')}`)
        if (level < 2) assert.ok(near > 20, `level ${level}: the ship is detected only ${near} times`)
    }
})

test('geometria batx1 z games: the lines detective', () => {
    checkTexts([...Object.values(bachGeometryDetectiveNames), ...Object.values(bachGeometryDetectiveTips)])
    for (let level = 0; level < bachGeometryDetectiveLevels.length; level += 1) {
        const seen = new Set<string>()
        for (let seed = 1; seed <= 60; seed += 1) {
            const cases = createBachGeometryDetectiveCases(createRandom(seed * 7919 + level), level)
            assert.equal(cases.length, BACH_GEOMETRY_DETECTIVE_CASES)
            for (const item of cases) {
                seen.add(item.error)
                assert.ok(bachGeometryDetectiveLevels[level].includes(item.error))
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

test('geometria batx1 z games: memory boards', () => {
    for (let level = 0; level < bachGeometryMemoryLevels.length; level += 1) {
        for (let seed = 1; seed <= 80; seed += 1) {
            const board = createBachGeometryMemoryBoard(createRandom(seed * 7919 + level), level)
            assert.equal(board.length, BACH_GEOMETRY_MEMORY_PAIRS * 2)
            const answers = board.filter((card) => card.id.endsWith('-a'))
            assert.equal(new Set(answers.map((card) => card.latex)).size, BACH_GEOMETRY_MEMORY_PAIRS)
            for (const card of board) {
                render(card.latex)
                if (card.explain) render(card.explain)
            }
            for (const question of board.filter((card) => card.id.endsWith('-q'))) {
                const answer = board.find((card) => card.id === `${question.setId}-a`)!.latex
                const kind = bachGeometryMemoryLevels[level]
                if (kind === 'slope') {
                    const { A, B } = readGeneral(question.latex)
                    assert.ok(Math.abs(readNumber(answer.replace('m=', '')) + A / B) < 1e-9, `${question.latex} → ${answer}`)
                }
                if (kind === 'midpoint') {
                    const numbers = [...question.latex.matchAll(/-?\d+/g)].map((match) => Number(match[0]))
                    assert.equal(answer, `M(${(numbers[0] + numbers[2]) / 2},${(numbers[1] + numbers[3]) / 2})`)
                }
                if (kind === 'distance') {
                    const [, pointText, lineText] = question.latex.match(/^\\begin\{gathered\}P\((-?\d+,-?\d+)\)\\\\ (.+)\\end\{gathered\}$/)!
                    const [x, y] = pointText.split(',').map(Number)
                    const { A, B, C } = readGeneral(lineText)
                    assert.equal(Number(answer.replace('d=', '')), Math.abs(A * x + B * y + C) / Math.hypot(A, B), question.latex)
                }
            }
        }
    }
})
