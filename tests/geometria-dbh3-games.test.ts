import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { angleAnswer, ANGLE_ROUNDS, createAngleRounds } from '../src/pages/dbh3-geometria/games/angles.ts'
import { createGeometry3MemoryBoard } from '../src/pages/dbh3-geometria/games/boards.ts'
import { createDetectiveCases, detectiveErrorNames, detectiveErrorTips, detectiveLevels } from '../src/pages/dbh3-geometria/games/detective.ts'
import { geometry3GameProgressIds, geometry3Games } from '../src/pages/dbh3-geometria/games/info.ts'
import { createPointRounds, POINT_ROUNDS } from '../src/pages/dbh3-geometria/games/point.ts'
import { GEOMETRY3_RACE_CIRCUITS, geometry3RaceErrorTips, generateGeometry3RaceQuestion } from '../src/pages/dbh3-geometria/games/race.ts'
import { createKindRounds, KIND_ROUNDS, kindOf } from '../src/pages/dbh3-geometria/games/triangleKind.ts'
import { geometry3LabChallengeIds } from '../src/pages/dbh3-geometria/lab/labTools.ts'
import { notablePoint } from '../src/pages/dbh3-geometria/lab/notable.ts'
import { geometry3Diagnostic } from '../src/pages/dbh3-geometria/content.ts'

const languages = ['eu', 'es', 'en', 'ar'] as const
const value = (fraction: { numerator: number; denominator: number }) => fraction.numerator / fraction.denominator
const close = (a: number, b: number) => Math.abs(a - b) < 1e-9 * Math.max(1, Math.abs(a))

function checkTexts(texts: LocalizedText[]) {
    for (const text of texts) {
        for (const language of languages) {
            assert.ok(text[language].length > 0)
            for (const [, formula] of text[language].matchAll(/\$([^$]+)\$/g)) katex.renderToString(formulaFor(language, formula), { throwOnError: true, strict: 'error' })
        }
        assert.ok(!text.ar.includes('{,}'), text.ar)
        assert.ok(!/[؀-ۿ]/.test([...text.ar.matchAll(/\$([^$]+)\$/g)].map((match) => match[1]).join('')), text.ar)
        assert.ok(!/\d(?:ri|ren|rekin|ekin|ek|ak|ra|tik|z|ei|en|k)(?![a-zA-Z])/.test(text.eu.replace(/\$[^$]+\$/g, '')), text.eu)
    }
}

function expected(kind: string, m: Record<string, number>): number {
    switch (kind) {
        case 'polygon-sum': return (m.n - 2) * 180
        case 'regular-interior': return 180 - 360 / m.n
        case 'inscribed': return m.central / 2
        case 'bisector': return m.angle / 2
        case 'centroid-vertex': return (2 * m.median) / 3
        case 'centroid-side': return m.median / 3
        case 'midpoint': return (m.a + m.b) / 2
        case 'hypotenuse': return Math.sqrt(m.b * m.b + m.c * m.c)
        case 'leg': return Math.sqrt(m.a * m.a - m.c * m.c)
        case 'distance': return Math.hypot(m.x2 - m.x, m.y2 - m.y)
        case 'triangle': return (m.base * m.height) / 2
        case 'trapezium': return ((m.big + m.small) * m.height) / 2
        case 'rhombus': return (m.long * m.short) / 2
        case 'thales': return (m.b * m.c) / m.a
        case 'area-ratio': return m.area * m.k * m.k
        case 'shadow': return (m.stick * m.shadowLength) / m.stickShadow
        default: throw new Error(kind)
    }
}

test('geometria 3. DBH games: the hub, its levels and its progress ids', () => {
    assert.deepEqual(geometry3Games.map((game) => game.id), ['race', 'angles', 'triangle', 'point', 'detective', 'memory'])
    assert.equal(new Set(geometry3GameProgressIds).size, geometry3GameProgressIds.length)
    for (const id of geometry3GameProgressIds) assert.ok(id >= 96101 && id <= 96999, `${id}`)
    const all = [...geometry3Diagnostic.map((question) => question.id), ...geometry3LabChallengeIds, ...geometry3GameProgressIds]
    assert.equal(new Set(all).size, all.length)
    for (const game of geometry3Games) {
        for (const language of languages) assert.ok(game.title[language] && game.tagline[language] && game.levels.every((level) => level.title[language] && level.description[language]), `${game.id} ${language}`)
        for (const level of game.levels) for (const language of languages) assert.ok(!level.description[language].includes('$'), level.description[language])
    }
    checkTexts([...Object.values(geometry3RaceErrorTips), ...Object.values(detectiveErrorNames), ...Object.values(detectiveErrorTips)])
})

test('geometria 3. DBH games: every race question is right, with three different wrong options', () => {
    for (let circuit = 0; circuit < GEOMETRY3_RACE_CIRCUITS; circuit += 1) {
        const kinds = new Set<string>()
        for (const tier of [0, 1, 2] as const) {
            for (let seed = 1; seed <= 120; seed += 1) {
                const question = generateGeometry3RaceQuestion(createRandom(seed * 7919 + circuit * 31 + tier), circuit, tier)
                kinds.add(question.kind)
                assert.ok(close(value(question.answer), expected(question.kind, question.meta)), `${question.kind} ${JSON.stringify(question.meta)}`)
                assert.equal(question.options.length, 4)
                assert.equal(question.options.filter((option) => option.correct).length, 1)
                assert.equal(new Set(question.options.map((option) => option.latex)).size, 4)
                checkTexts([question.prompt, question.solution])
            }
        }
        assert.ok(kinds.size >= 3, `circuit ${circuit}`)
    }
})

test('geometria 3. DBH games: memory boards have six pairs with one partner each', () => {
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 60; seed += 1) {
            const board = createGeometry3MemoryBoard(createRandom(seed * 7919 + level), level)
            assert.equal(board.length, 12)
            for (const card of board) {
                assert.equal(board.filter((other) => other.shows === card.shows).length, 2)
                katex.renderToString(card.latex, { throwOnError: true, strict: 'error' })
            }
        }
    }
})

test('geometria 3. DBH games: the angle hunt has one right option that the figure gives', () => {
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 80; seed += 1) {
            const rounds = createAngleRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, ANGLE_ROUNDS)
            for (const round of rounds) {
                assert.equal(round.answer, angleAnswer(round.figure))
                assert.ok(round.answer > 0 && round.answer < 180, JSON.stringify(round.figure))
                assert.equal(new Set(round.options).size, 4)
                assert.equal(round.options.filter((option) => option === round.answer).length, 1)
                if (round.figure.type === 'triangle') assert.equal(round.figure.known.reduce((sum, angle) => sum + angle, 0) + round.answer, 180)
                if (round.figure.type === 'quad') assert.equal(round.figure.known.reduce((sum, angle) => sum + angle, 0) + round.answer, 360)
                if (round.figure.type === 'circle') assert.equal(round.figure.inscribed, round.figure.near ? 180 - round.figure.central / 2 : round.figure.central / 2)
            }
        }
    }
})

test('geometria 3. DBH games: the kind of each triangle follows from its sides', () => {
    for (let level = 0; level < 3; level += 1) {
        let none = 0
        for (let seed = 1; seed <= 80; seed += 1) {
            const rounds = createKindRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, KIND_ROUNDS)
            for (const round of rounds) {
                const [a, b, c] = round.sides
                assert.ok(a <= b && b <= c && a > 0)
                assert.equal(round.kind, kindOf(round.sides))
                if (round.kind === 'none') none += 1
                if (level < 2) assert.notEqual(round.kind, 'none')
            }
            if (level === 2) assert.ok(rounds.some((round) => round.kind === 'none'))
        }
        if (level === 2) assert.ok(none > 0)
    }
    assert.equal(kindOf([3, 4, 5]), 'right')
    assert.equal(kindOf([4, 5, 6]), 'acute')
    assert.equal(kindOf([3, 4, 6]), 'obtuse')
    assert.equal(kindOf([2, 3, 5]), 'none')
})

test('geometria 3. DBH games: every notable point is on the board, and the triangles are neither right nor isosceles over AB', () => {
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 80; seed += 1) {
            const rounds = createPointRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, POINT_ROUNDS)
            for (const round of rounds) {
                const [x, y] = notablePoint(round.kind, round.c)
                assert.ok(Math.abs(x) <= 9 && Math.abs(y) <= 9, JSON.stringify(round))
                assert.notEqual(round.c[0], 3)
                assert.equal(round.lines, 3 - level)
            }
            assert.ok(new Set(rounds.map((round) => round.kind)).size >= 3)
        }
    }
})

test('geometria 3. DBH games: every detective case reaches a wrong value, and its fix gives the right one', () => {
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 80; seed += 1) {
            for (const item of createDetectiveCases(createRandom(seed * 7919 + level), level)) {
                assert.ok(detectiveLevels[level].includes(item.error))
                assert.ok(item.options.includes(item.error) && new Set(item.options).size === 3)
                assert.notEqual(item.reached, item.right)
                assert.ok(item.wrong >= 0 && item.wrong < item.lines.length)
                assert.ok(item.lines[item.lines.length - 1].latex.includes(String(item.reached)), `${item.error}: ${item.lines[item.lines.length - 1].latex}`)
                assert.ok(item.fix.includes(String(item.right)), `${item.error}: ${item.fix}`)
                for (const line of item.lines) katex.renderToString(line.latex, { throwOnError: true, strict: 'error' })
                katex.renderToString(item.fix, { throwOnError: true, strict: 'error' })
                checkTexts([item.problem])
            }
        }
    }
})
