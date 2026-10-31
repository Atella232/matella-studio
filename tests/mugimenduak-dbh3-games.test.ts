import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { createMotions3MemoryBoard } from '../src/pages/dbh3-mugimenduak/games/boards.ts'
import { createDetectiveCases, detectiveErrorNames, detectiveErrorTips, detectiveLevels } from '../src/pages/dbh3-mugimenduak/games/detective.ts'
import { motions3GameProgressIds, motions3Games } from '../src/pages/dbh3-mugimenduak/games/info.ts'
import { movementText } from '../src/pages/dbh3-mugimenduak/games/MovementText.ts'
import { generateMotions3RaceQuestion, MOTIONS3_RACE_CIRCUITS, motions3RaceErrorTips } from '../src/pages/dbh3-mugimenduak/games/race.ts'
import { createTileRounds, interiorAngle, mixtureSum, TILE_ROUNDS } from '../src/pages/dbh3-mugimenduak/games/tiles.ts'
import { createWhereRounds, imageOf, WHERE_GRID, WHERE_ROUNDS } from '../src/pages/dbh3-mugimenduak/games/where.ts'
import { createWhichRounds, WHICH_ROUNDS, whichKinds } from '../src/pages/dbh3-mugimenduak/games/which.ts'
import { motions3LabChallengeIds } from '../src/pages/dbh3-mugimenduak/lab/labTools.ts'
import { motions3Diagnostic } from '../src/pages/dbh3-mugimenduak/content.ts'
import type { Point } from '../src/pages/dbh3-mugimenduak/motion.ts'

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
        case 'component': return m.c - m.a
        case 'modulus': return Math.hypot(m.a, m.b)
        case 'sum': return m.a + m.c
        case 'translate': return m.x + m.a
        case 'vector-from': return m.x2 - m.x
        case 'two-translations': return m.a + m.c
        case 'rotate-90': return -m.y
        case 'rotate-180': return -m.x
        case 'rotate-270': return m.y
        case 'central': return 2 * m.o - m.p
        case 'order': return 360 / m.sides
        case 'reflect-x': return -m.y
        case 'reflect-y': return -m.x
        case 'reflect-k': return 2 * m.k - m.x
        case 'two-mirrors': return 2 * (m.k2 - m.k1)
        case 'tiles': return 360 / interiorAngle(m.sides)
        case 'frieze': return (m.count - 1) * m.step + m.width
        case 'homothety': return m.k * m.x
        default: throw new Error(kind)
    }
}

/** Turned the same way (> 0) or flipped (< 0): the sign of the area of the flag's triangle */
const orientation = ([, top, end, low]: Point[]) => Math.sign((end[0] - top[0]) * (low[1] - top[1]) - (end[1] - top[1]) * (low[0] - top[0]))
const size = ([base, top]: Point[]) => Math.hypot(top[0] - base[0], top[1] - base[1])

test('mugimenduak 3. DBH games: the hub, its levels and its progress ids', () => {
    assert.deepEqual(motions3Games.map((game) => game.id), ['race', 'where', 'which', 'tiles', 'detective', 'memory'])
    assert.equal(new Set(motions3GameProgressIds).size, motions3GameProgressIds.length)
    for (const id of motions3GameProgressIds) assert.ok(id >= 98101 && id <= 98999, `${id}`)
    const all = [...motions3Diagnostic.map((question) => question.id), ...motions3LabChallengeIds, ...motions3GameProgressIds]
    assert.equal(new Set(all).size, all.length)
    for (const game of motions3Games) {
        for (const language of languages) assert.ok(game.title[language] && game.tagline[language] && game.levels.every((level) => level.title[language] && level.description[language]), `${game.id} ${language}`)
        for (const level of game.levels) for (const language of languages) assert.ok(!level.description[language].includes('$'), level.description[language])
    }
    checkTexts([...Object.values(motions3RaceErrorTips), ...Object.values(detectiveErrorNames), ...Object.values(detectiveErrorTips)])
})

test('mugimenduak 3. DBH games: every race question is right, with three different wrong options', () => {
    for (let circuit = 0; circuit < MOTIONS3_RACE_CIRCUITS; circuit += 1) {
        const kinds = new Set<string>()
        for (const tier of [0, 1, 2] as const) {
            for (let seed = 1; seed <= 120; seed += 1) {
                const question = generateMotions3RaceQuestion(createRandom(seed * 7919 + circuit * 31 + tier), circuit, tier)
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

test('mugimenduak 3. DBH games: memory boards have six pairs with one partner each', () => {
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 60; seed += 1) {
            const board = createMotions3MemoryBoard(createRandom(seed * 7919 + level), level)
            assert.equal(board.length, 12)
            for (const card of board) {
                assert.equal(board.filter((other) => other.shows === card.shows).length, 2)
                katex.renderToString(card.latex, { throwOnError: true, strict: 'error' })
                katex.renderToString(card.explain, { throwOnError: true, strict: 'error' })
            }
        }
    }
})

test('mugimenduak 3. DBH games: where the point lands is its image, on the grid', () => {
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 80; seed += 1) {
            const rounds = createWhereRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, WHERE_ROUNDS)
            for (const round of rounds) {
                assert.deepEqual(round.image, imageOf(round.point, round.movement))
                assert.ok(Math.abs(round.image[0]) <= WHERE_GRID && Math.abs(round.image[1]) <= WHERE_GRID)
                assert.ok(round.image[0] !== round.point[0] || round.image[1] !== round.point[1])
                checkTexts([movementText(round.movement)])
            }
        }
    }
})

test('mugimenduak 3. DBH games: each movement leaves its mark on the flag', () => {
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 80; seed += 1) {
            const rounds = createWhichRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, WHICH_ROUNDS)
            for (const round of rounds) {
                assert.ok(whichKinds(level).includes(round.kind))
                const flipped = orientation(round.image) !== orientation(round.flag)
                const resized = Math.abs(size(round.image) - size(round.flag)) > 1e-9
                // A reflection flips, an enlargement resizes, a rotation turns, a translation does none of them
                assert.equal(flipped, round.kind === 'reflection', round.kind)
                assert.equal(resized, round.kind === 'homothety', round.kind)
                if (round.kind === 'translation') {
                    const shift = [round.image[0][0] - round.flag[0][0], round.image[0][1] - round.flag[0][1]]
                    round.flag.forEach((p, index) => assert.deepEqual([round.image[index][0] - p[0], round.image[index][1] - p[1]], shift))
                }
                if (round.kind === 'rotation') assert.ok(round.flag.some((p, index) => p[0] !== round.image[index][0] || p[1] !== round.image[index][1]))
                for (const [x, y] of round.image) assert.ok(Math.abs(x) <= 7 && Math.abs(y) <= 7)
            }
            assert.ok(new Set(rounds.map((round) => round.kind)).size === whichKinds(level).length)
        }
    }
})

test('mugimenduak 3. DBH games: the tiles answer comes from the angles', () => {
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 60; seed += 1) {
            const rounds = createTileRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, TILE_ROUNDS)
            for (const round of rounds) {
                if (round.kind === 'single') assert.equal(round.answer, [3, 4, 6].includes(round.sides))
                if (round.kind === 'count') assert.equal(round.answer * interiorAngle(round.sides), 360)
                if (round.kind === 'mixture') assert.equal(round.answer, Math.abs(mixtureSum(round.polygons) - 360) < 1e-9)
            }
            if (level === 2) assert.ok(rounds.some((round) => round.kind === 'mixture' && round.answer) && rounds.some((round) => round.kind === 'mixture' && !round.answer))
        }
    }
})

test('mugimenduak 3. DBH games: every detective case reaches a wrong value, and its fix gives the right one', () => {
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
