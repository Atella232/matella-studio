import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { written } from '../src/pages/batx1-zientziak-errealak/games/race.ts'
import { add, cross, det3, dot, scale, sub, type Vec3 } from '../src/pages/batx2-zientziak-bektoreak/space/vec3.ts'
import { createDistancesMemoryBoard, DISTANCES_MEMORY_PAIRS } from '../src/pages/batx2-zientziak-distantziak/games/boards.ts'
import { lineSquare, planeValue } from '../src/pages/batx2-zientziak-distantziak/games/common.ts'
import { buildDistancesDetectiveCase, createDistancesDetectiveCases, DISTANCES_DETECTIVE_CASES, distancesDetectiveLevels, distancesDetectiveNames, distancesDetectiveTips } from '../src/pages/batx2-zientziak-distantziak/games/detective.ts'
import { anglesDistancesGameModeForPath, anglesDistancesGameProgressIds, anglesDistancesGames, anglesDistancesGameSlugs } from '../src/pages/batx2-zientziak-distantziak/games/info.ts'
import { createMirrorRounds, MIRROR_RANGE, MIRROR_ROUNDS } from '../src/pages/batx2-zientziak-distantziak/games/mirror.ts'
import { createNearerRounds, distanceTo, NEARER_ROUNDS } from '../src/pages/batx2-zientziak-distantziak/games/nearer.ts'
import { distancesRaceErrorTips, distancesRaceKinds, DISTANCES_RACE_CIRCUITS, generateDistancesRaceQuestion } from '../src/pages/batx2-zientziak-distantziak/games/race.ts'
import { angleOf, createSineRounds, FORMULA_LATEX, SINE_ROUNDS } from '../src/pages/batx2-zientziak-distantziak/games/sine.ts'

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

/** MathText turns a colon into ÷, so no formula may hold one */
const noColon = (latex: string) => assert.ok(!latex.includes(':'), latex)
/** Formulas written well: no +-, no 1x (nor 1t, 1a, 1k), no 0y */
const tidy = (latex: string) => assert.ok(!/\+-|--|(?<![\d.])1[xytak]|(?<![\d.])1\{z\}|(?<![\d.])0[xytak]|(?<![\d.])0\{z\}/.test(latex), latex)
const close = (a: number, b: number) => Math.abs(a - b) < 1e-9

const seeds = Array.from({ length: 60 }, (_, index) => index + 1)

test('distantziak batx2 z games: the list, the progress ids and the addresses', () => {
    assert.deepEqual(anglesDistancesGames.map((game) => game.id), ['race', 'sine', 'mirror', 'nearer', 'detective', 'memory'])
    assert.equal(new Set(anglesDistancesGameProgressIds).size, anglesDistancesGameProgressIds.length)
    for (const id of anglesDistancesGameProgressIds) assert.ok(id >= 121401 && id <= 121899, `${id}`)
    for (const game of anglesDistancesGames) {
        checkTexts([game.title, game.tagline, game.skills, ...game.levels.flatMap((level) => [level.title, level.description])])
        // The hub shows these texts as they are, without formulas
        for (const text of [game.title, game.tagline, game.skills, ...game.levels.flatMap((level) => [level.title, level.description])]) assert.ok(!text.es.includes('$'), text.es)
        assert.equal(anglesDistancesGameModeForPath(`/matematika/batx2-zientziak/angulos-distancias/jokuak/${anglesDistancesGameSlugs[game.id]}`), game.id)
    }
    assert.equal(anglesDistancesGameModeForPath('/matematika/batx2-zientziak/angulos-distancias/jokuak'), 'hub')
})

test('distantziak batx2 z games: every race question is right, with four different options', () => {
    const kinds = new Set<string>()
    for (let circuit = 0; circuit < DISTANCES_RACE_CIRCUITS; circuit++) {
        for (const seed of seeds) {
            const question = generateDistancesRaceQuestion(createRandom(seed * 7919 + circuit), circuit, 1)
            kinds.add(question.kind)
            assert.equal(question.circuit, circuit)
            assert.equal(question.options.length, 4)
            assert.equal(new Set(question.options.map((option) => option.latex)).size, 4)
            assert.equal(question.options.filter((option) => option.correct).length, 1)
            assert.equal(question.options.find((option) => option.correct)!.latex, written(question.answer))
            for (const option of question.options) render(option.latex)
            checkTexts([question.prompt, question.solution])
            for (const [, formula] of `${question.prompt.es} ${question.solution.es}`.matchAll(/\$([^$]+)\$/g)) { noColon(formula); tidy(formula) }
            const m = question.meta
            const value = question.answer.numerator / question.answer.denominator
            const v3 = (name: string): Vec3 => [m[`${name}1`], m[`${name}2`], m[`${name}3`]]
            switch (question.kind) {
                case 'angle-lines': assert.equal(value, angleOf('lines', v3('a'), v3('b'))); break
                case 'angle-line-plane': assert.equal(value, angleOf('line-plane', v3('a'), v3('b'))); break
                case 'angle-planes': assert.equal(value, angleOf('planes', v3('a'), v3('b'))); break
                case 'foot-t': {
                    // P + t·n is on the plane
                    const foot = add(v3('p'), scale(value, v3('n')))
                    assert.ok(close(dot(v3('n'), foot) + m.D, 0))
                    break
                }
                case 'foot-plane': {
                    const n = v3('n')
                    const t = -(dot(n, v3('p')) + m.D) / dot(n, n)
                    assert.ok(close(value, v3('p')[m.index] + t * n[m.index]))
                    break
                }
                case 'foot-line': {
                    const u = v3('u')
                    const t = dot(sub(v3('p'), v3('a')), u) / dot(u, u)
                    assert.ok(close(value, v3('a')[m.index] + t * u[m.index]))
                    break
                }
                case 'symmetric-plane': {
                    const n = v3('n')
                    const t = -(dot(n, v3('p')) + m.D) / dot(n, n)
                    assert.ok(close(value, v3('p')[m.index] + 2 * t * n[m.index]))
                    break
                }
                case 'symmetric-line': {
                    const u = v3('u')
                    const t = dot(sub(v3('p'), v3('a')), u) / dot(u, u)
                    const foot = add(v3('a'), scale(t, u))
                    assert.ok(close(value, 2 * foot[m.index] - v3('p')[m.index]))
                    break
                }
                case 'mediator-d': {
                    const n = sub(v3('b'), v3('a'))
                    // The plane n·X + D = 0 is at the same distance from A and B
                    assert.ok(close(Math.abs(dot(n, v3('a')) + value), Math.abs(dot(n, v3('b')) + value)))
                    break
                }
                case 'point-plane': assert.ok(close(value, Math.abs(planeValue({ normal: v3('n'), D: m.D }, v3('p'))) / Math.sqrt(dot(v3('n'), v3('n'))))); break
                case 'parallel-planes': {
                    // A point of the first plane, and its distance to the second
                    const n = v3('n')
                    const point = scale(-m.D1 / dot(n, n), n)
                    const n2 = scale(2, n)
                    assert.ok(close(value, Math.abs(dot(n2, point) + m.D2) / Math.sqrt(dot(n2, n2))))
                    break
                }
                case 'point-line':
                case 'parallel-lines': {
                    const [top, bottom] = lineSquare({ point: v3('a'), direction: v3('u') }, v3('p'))
                    assert.ok(close(value, Math.sqrt(top / bottom)))
                    break
                }
                case 'mixed': assert.equal(value, det3(sub(v3('b'), v3('a')), v3('u'), v3('v'))); break
                case 'skew': {
                    const w = cross(v3('u'), v3('v'))
                    assert.ok(close(value, Math.abs(dot(v3('b'), w)) / Math.sqrt(dot(w, w))))
                    break
                }
                default: assert.fail(`unknown kind ${question.kind}`)
            }
        }
    }
    assert.deepEqual([...kinds].sort(), [...distancesRaceKinds].sort())
    checkTexts(Object.values(distancesRaceErrorTips))
})

test('distantziak batx2 z games: sine or cosine, the right formula and angle', () => {
    for (const latex of Object.values(FORMULA_LATEX)) render(latex)
    for (let level = 0; level < 3; level++) {
        for (const seed of seeds) {
            const rounds = createSineRounds(createRandom(seed * 31 + level), level)
            assert.equal(rounds.length, SINE_ROUNDS)
            for (const round of rounds) {
                assert.equal(round.angle, angleOf(round.type, round.a, round.b))
                assert.equal(round.options.length, 4)
                assert.equal(new Set(round.options).size, 4)
                assert.ok(round.options.includes(round.angle))
                for (const latex of [round.first, round.second, round.working]) { render(latex); noColon(latex.replace(/\\colon/g, '')); tidy(latex) }
            }
            if (level === 1) assert.ok(rounds.every((round) => round.type === 'line-plane'))
            if (level === 2) assert.equal(new Set(rounds.map((round) => round.type)).size, 3)
        }
    }
})

test('distantziak batx2 z games: the mirror, only one candidate is the symmetric point', () => {
    for (let level = 0; level < 3; level++) {
        for (const seed of seeds) {
            const rounds = createMirrorRounds(createRandom(seed * 37 + level), level)
            assert.equal(rounds.length, MIRROR_ROUNDS)
            for (const round of rounds) {
                assert.equal(round.options.length, 4)
                assert.equal(new Set(round.options.map((option) => option.at.join())).size, 4)
                assert.equal(round.options.filter((option) => option.kind === 'right').length, 1)
                assert.equal(round.options[round.answer].kind, 'right')
                const image = round.options[round.answer].at
                const middle = scale(0.5, add(round.p, image))
                if (round.plane) {
                    // The midpoint is on the plane and P P' is along the normal
                    assert.ok(close(planeValue(round.plane, middle), 0), round.given)
                    assert.deepEqual(cross(sub(image, round.p), round.plane.normal).map((value) => value + 0), [0, 0, 0])
                } else {
                    // The midpoint is on the line and P P' is perpendicular to it
                    const [top] = lineSquare(round.line!, middle)
                    assert.ok(close(top, 0), round.given)
                    assert.equal(dot(sub(image, round.p), round.line!.direction) + 0, 0)
                }
                for (const option of round.options) assert.ok(option.at.every((value) => Number.isInteger(value) && Math.abs(value) <= MIRROR_RANGE))
                if (level === 0) assert.equal(round.plane!.normal.filter((value) => value !== 0).length, 1)
                for (const latex of [round.given, ...round.working]) { render(latex); noColon(latex.replace(/\\colon/g, '')); tidy(latex) }
            }
        }
    }
})

test('distantziak batx2 z games: who is nearer, the answer is the real comparison', () => {
    for (let level = 0; level < 3; level++) {
        const seen = new Set<string>()
        for (const seed of seeds) {
            const rounds = createNearerRounds(createRandom(seed * 41 + level), level)
            assert.equal(rounds.length, NEARER_ROUNDS)
            for (const round of rounds) {
                seen.add(round.answer)
                const [first, second] = round.objects.map((object) => distanceTo(object, round.p))
                assert.ok(close(first, round.distances[0]) && close(second, round.distances[1]), round.latex.join(' | '))
                const real = close(first, second) ? 'same' : first < second ? 'first' : 'second'
                assert.equal(round.answer, real)
                // The feet are at that distance, on their objects
                round.feet.forEach((foot, index) => {
                    const object = round.objects[index]
                    assert.ok(close(Math.sqrt(dot(sub(foot, round.p), sub(foot, round.p))), round.distances[index]))
                    if (object.kind === 'plane') assert.ok(close(planeValue(object.plane, foot), 0))
                    else assert.ok(close(lineSquare(object.line, foot)[0], 0))
                })
                for (const latex of [...round.latex, ...round.working]) { render(latex); noColon(latex.replace(/\\colon/g, '')); tidy(latex) }
            }
        }
        assert.equal(seen.size, 3)
    }
})

test('distantziak batx2 z games: the detective cases', () => {
    checkTexts([...Object.values(distancesDetectiveNames), ...Object.values(distancesDetectiveTips)])
    for (const error of distancesDetectiveLevels.flat()) {
        let built = 0
        for (let seed = 1; seed <= 400 && built < 5; seed++) if (buildDistancesDetectiveCase(createRandom(seed * 13), error)) built += 1
        assert.ok(built >= 5, `${error} builds too rarely`)
    }
    for (let level = 0; level < distancesDetectiveLevels.length; level++) {
        for (const seed of seeds) {
            const cases = createDistancesDetectiveCases(createRandom(seed * 43 + level), level)
            assert.equal(cases.length, DISTANCES_DETECTIVE_CASES)
            for (const item of cases) {
                assert.ok(distancesDetectiveLevels[level].includes(item.error))
                assert.ok(item.wrong >= 0 && item.wrong < item.lines.length)
                assert.ok(item.options.includes(item.error))
                assert.notEqual(item.right, item.reached)
                for (const entry of item.lines) { render(entry.latex); noColon(entry.latex); tidy(entry.latex) }
                // The game shows the fix in pieces, one per arrow: each piece has to be a formula of its own
                for (const part of item.fix.split('\\ \\to\\ ')) render(part)
                assert.ok(!item.fix.includes('gathered'), item.fix)
                noColon(item.fix)
                tidy(item.fix)
                checkTexts([item.problem, ...item.lines.map((entry) => entry.label)])
            }
        }
    }
})

test('distantziak batx2 z games: memory boards', () => {
    for (let level = 0; level < 3; level++) {
        for (const seed of seeds) {
            const cards = createDistancesMemoryBoard(createRandom(seed * 47 + level), level)
            assert.equal(cards.length, DISTANCES_MEMORY_PAIRS * 2)
            for (let set = 0; set < DISTANCES_MEMORY_PAIRS; set++) assert.equal(cards.filter((card) => card.setId === set).length, 2)
            assert.equal(new Set(cards.map((card) => card.latex)).size, cards.length)
            for (const card of cards) { render(card.latex); tidy(card.latex); render(card.explain) }
        }
    }
})
