import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { written } from '../src/pages/batx1-zientziak-errealak/games/race.ts'
import { createSpaceMemoryBoard, SPACE_MEMORY_PAIRS } from '../src/pages/batx2-zientziak-bektoreak/games/boards.ts'
import { CROSS_ROUNDS, createCrossRounds } from '../src/pages/batx2-zientziak-bektoreak/games/crossPick.ts'
import { createSpaceDetectiveCases, SPACE_DETECTIVE_CASES, spaceDetectiveLevels, spaceDetectiveNames, spaceDetectiveTips } from '../src/pages/batx2-zientziak-bektoreak/games/detective.ts'
import { createFlatRounds, FLAT_ROUNDS, mixedAt } from '../src/pages/batx2-zientziak-bektoreak/games/flatBox.ts'
import { spaceVectorsGameModeForPath, spaceVectorsGameProgressIds, spaceVectorsGames, spaceVectorsGameSlugs } from '../src/pages/batx2-zientziak-bektoreak/games/info.ts'
import { createKindRounds, KIND_ROUNDS } from '../src/pages/batx2-zientziak-bektoreak/games/kind.ts'
import { generateSpaceRaceQuestion, SPACE_RACE_CIRCUITS, spaceRaceErrorTips, spaceRaceKinds } from '../src/pages/batx2-zientziak-bektoreak/games/race.ts'
import { cross, det3, dot, type Vec3 } from '../src/pages/batx2-zientziak-bektoreak/space/vec3.ts'

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
        for (const language of ['eu', 'es', 'en'] as const) assert.ok(!/[؀-ۿ]/.test(text[language]), `Arabic in ${language}: ${text[language]}`)
        assert.ok(!/\d(?:ri|ren|rekin|ekin|ek|ak|ra|tik|z|ei|en|k)(?![a-zA-Z])/.test(text.eu.replace(/\$[^$]+\$/g, '')), text.eu)
        assert.ok(!/\$(?:ri|ren|rekin|z|ra|tik|ei|ek|ak|en|ko|an)(?![a-zA-Z])/.test(text.eu), text.eu)
    }
}

const seeds = Array.from({ length: 60 }, (_, index) => index + 1)

test('bektoreak batx2 z games: the list, the progress ids and the addresses', () => {
    assert.deepEqual(spaceVectorsGames.map((game) => game.id), ['race', 'kind', 'cross', 'flat', 'detective', 'memory'])
    assert.equal(new Set(spaceVectorsGameProgressIds).size, spaceVectorsGameProgressIds.length)
    for (const id of spaceVectorsGameProgressIds) assert.ok(id >= 119401 && id <= 119899, `${id}`)
    for (const game of spaceVectorsGames) {
        checkTexts([game.title, game.tagline, game.skills, ...game.levels.flatMap((level) => [level.title, level.description])])
        assert.equal(spaceVectorsGameModeForPath(`/matematika/batx2-zientziak/vectores-espacio/jokuak/${spaceVectorsGameSlugs[game.id]}`), game.id)
    }
    assert.equal(spaceVectorsGameModeForPath('/matematika/batx2-zientziak/vectores-espacio/jokuak'), 'hub')
})

test('bektoreak batx2 z games: every race question is right, with four different options', () => {
    const kinds = new Set<string>()
    for (let circuit = 0; circuit < SPACE_RACE_CIRCUITS; circuit++) {
        for (const seed of seeds) {
            const question = generateSpaceRaceQuestion(createRandom(seed * 7919 + circuit), circuit, 1)
            kinds.add(question.kind)
            assert.equal(question.circuit, circuit)
            assert.equal(question.options.length, 4)
            assert.equal(new Set(question.options.map((option) => option.latex)).size, 4)
            assert.equal(question.options.filter((option) => option.correct).length, 1)
            assert.equal(question.options.find((option) => option.correct)!.latex, written(question.answer))
            for (const option of question.options) render(option.latex)
            checkTexts([question.prompt, question.solution])
            const m = question.meta
            const value = question.answer.numerator / question.answer.denominator
            const v3 = (name: string): Vec3 => [m[`${name}1`], m[`${name}2`], m[`${name}3`]]
            switch (question.kind) {
                case 'ab': assert.equal(value, v3('b')[m.index] - v3('a')[m.index]); break
                case 'length': assert.ok(Math.abs(value - Math.sqrt(dot(v3('v'), v3('v')))) < 1e-9); break
                case 'symmetric': assert.equal(value, 2 * v3('m')[m.index] - v3('p')[m.index]); break
                case 'determinant': assert.equal(value, det3(v3('r'), v3('s'), v3('t'))); break
                case 'dependent': assert.equal(m.slope * value + m.offset, 0); break
                case 'combination': assert.equal(value, m.a * m.c + m.b * m.d); break
                case 'dot': assert.equal(value, dot(v3('u'), v3('v'))); break
                case 'perpendicular': assert.equal(value * m.c + m.a * m.d + m.b * m.e, 0); break
                case 'projection': assert.ok(Math.abs(value - dot(v3('u'), v3('v')) / Math.sqrt(dot(v3('u'), v3('u')))) < 1e-9); break
                case 'cross': assert.equal(value, cross(v3('u'), v3('v'))[m.index]); break
                case 'parallelogram': assert.ok(Math.abs(value - Math.sqrt(dot(cross(v3('u'), v3('v')), cross(v3('u'), v3('v'))))) < 1e-9); break
                case 'triangle': assert.ok(Math.abs(2 * value - Math.sqrt(dot(cross(v3('u'), v3('v')), cross(v3('u'), v3('v'))))) < 1e-9); break
                case 'mixed': assert.equal(value, det3(v3('u'), v3('v'), v3('w'))); break
                case 'tetra': assert.equal(6 * value, Math.abs(det3(v3('u'), v3('v'), v3('w')))); break
                case 'coplanar': assert.equal(det3(v3('u'), v3('v'), [m.a, m.b, value]), 0); break
                default: assert.fail(`unknown kind ${question.kind}`)
            }
        }
    }
    assert.deepEqual([...kinds].sort(), [...spaceRaceKinds].sort())
    checkTexts(Object.values(spaceRaceErrorTips))
})

test('bektoreak batx2 z games: ¿número o vector? in space', () => {
    for (let level = 0; level < 3; level++) {
        for (const seed of seeds) {
            const rounds = createKindRounds(createRandom(seed * 31 + level), level)
            assert.equal(rounds.length, KIND_ROUNDS)
            for (const round of rounds) {
                render(round.latex)
                render(round.working)
                if (round.kind === 'nonsense') {
                    assert.equal(round.answer, null)
                    assert.equal(round.options.length, 0)
                    continue
                }
                assert.equal(round.options.length, 4)
                assert.equal(new Set(round.options).size, 4)
                assert.ok(round.options.includes(round.answer!))
                for (const option of round.options) render(option)
                const vec = (a: Vec3) => `(${a.map((value) => value + 0).join(',')})`
                if (round.expression === 'dot') assert.equal(round.answer, String(dot(round.u, round.v) + 0))
                if (round.expression === 'cross') assert.equal(round.answer, vec(cross(round.u, round.v)))
                if (round.expression === 'mixed') assert.equal(round.answer, String(det3(round.u, round.v, round.w) + 0))
                if (round.expression === 'double-cross') assert.equal(round.answer, vec(cross(round.u, cross(round.v, round.w))))
                assert.equal(round.kind === 'vector', round.answer!.startsWith('('), round.latex)
            }
        }
    }
})

test('bektoreak batx2 z games: ¿cuál es u×v?', () => {
    for (let level = 0; level < 3; level++) {
        for (const seed of seeds) {
            const rounds = createCrossRounds(createRandom(seed * 37 + level), level)
            assert.equal(rounds.length, CROSS_ROUNDS)
            for (const round of rounds) {
                const n = cross(round.u, round.v)
                assert.deepEqual(round.candidates.map((candidate) => candidate.letter), ['A', 'B', 'C', 'D'])
                const right = round.candidates.filter((candidate) => candidate.kind === 'right')
                assert.equal(right.length, 1)
                assert.equal(right[0].letter, round.answer)
                assert.deepEqual(right[0].vector.map((value) => value + 0), n.map((value) => value + 0))
                for (const candidate of round.candidates) {
                    if (candidate.kind === 'right') continue
                    const both = dot(candidate.vector, round.u) === 0 && dot(candidate.vector, round.v) === 0
                    if (candidate.kind === 'swapped') assert.deepEqual(candidate.vector.map((value) => value + 0), n.map((value) => -value + 0))
                    else assert.ok(!both, `${candidate.kind} is perpendicular to both`)
                }
                assert.equal(round.showCoordinates, level === 2)
            }
        }
    }
})

test('bektoreak batx2 z games: la caja aplastada', () => {
    for (let level = 0; level < 3; level++) {
        for (const seed of seeds) {
            const rounds = createFlatRounds(createRandom(seed * 41 + level), level)
            assert.equal(rounds.length, FLAT_ROUNDS)
            for (const round of rounds) {
                assert.equal(round.options.length, 4)
                assert.equal(new Set(round.options).size, 4)
                assert.ok(round.options.includes(round.answer))
                assert.ok(round.options.every(Number.isInteger))
                // The mixed product is a line in k with the slope and offset the round says
                assert.equal(mixedAt(round, 0), round.offset)
                assert.equal(mixedAt(round, 1) - mixedAt(round, 0), round.slope)
                if (level < 2) {
                    assert.equal(round.volume, 0)
                    assert.equal(mixedAt(round, round.answer), 0)
                    for (const option of round.options) if (option !== round.answer) assert.notEqual(mixedAt(round, option), 0)
                } else {
                    assert.ok(round.answer > 0)
                    assert.equal(Math.abs(mixedAt(round, round.answer)), round.volume)
                    for (const option of round.options) if (option !== round.answer && option > 0) assert.notEqual(Math.abs(mixedAt(round, option)), round.volume)
                }
                assert.notEqual(round.start, round.answer)
                assert.notEqual(mixedAt(round, round.start), level < 2 ? 0 : round.volume)
            }
        }
    }
})

test('bektoreak batx2 z games: the detective cases', () => {
    checkTexts([...Object.values(spaceDetectiveNames), ...Object.values(spaceDetectiveTips)])
    for (let level = 0; level < spaceDetectiveLevels.length; level++) {
        for (const seed of seeds) {
            const cases = createSpaceDetectiveCases(createRandom(seed * 43 + level), level)
            assert.equal(cases.length, SPACE_DETECTIVE_CASES)
            for (const item of cases) {
                assert.ok(spaceDetectiveLevels[level].includes(item.error))
                assert.ok(item.wrong >= 0 && item.wrong < item.lines.length)
                assert.ok(item.options.includes(item.error))
                assert.notEqual(item.right, item.reached)
                for (const entry of item.lines) render(entry.latex)
                render(item.fix)
                checkTexts([item.problem, ...item.lines.map((entry) => entry.label)])
            }
        }
    }
})

test('bektoreak batx2 z games: memory boards', () => {
    for (let level = 0; level < 3; level++) {
        for (const seed of seeds) {
            const cards = createSpaceMemoryBoard(createRandom(seed * 47 + level), level)
            assert.equal(cards.length, SPACE_MEMORY_PAIRS * 2)
            for (let set = 0; set < SPACE_MEMORY_PAIRS; set++) assert.equal(cards.filter((card) => card.setId === set).length, 2)
            for (const card of cards) render(card.latex)
        }
    }
})
