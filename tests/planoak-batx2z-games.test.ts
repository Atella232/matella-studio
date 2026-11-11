import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { written } from '../src/pages/batx1-zientziak-errealak/games/race.ts'
import { add, cross, det3, dot, scale, sub, type Vec3 } from '../src/pages/batx2-zientziak-bektoreak/space/vec3.ts'
import { createPlanesMemoryBoard, PLANES_MEMORY_PAIRS } from '../src/pages/batx2-zientziak-planoak/games/boards.ts'
import { CLASSIFY_ROUNDS, createClassifyRounds, POSITIONS, positionOf } from '../src/pages/batx2-zientziak-planoak/games/classify.ts'
import { buildPlanesDetectiveCase, createPlanesDetectiveCases, PLANES_DETECTIVE_CASES, planesDetectiveLevels, planesDetectiveNames, planesDetectiveTips } from '../src/pages/batx2-zientziak-planoak/games/detective.ts'
import { linesPlanesGameModeForPath, linesPlanesGameProgressIds, linesPlanesGames, linesPlanesGameSlugs } from '../src/pages/batx2-zientziak-planoak/games/info.ts'
import { boxedLatex, createMissingRounds, MISSING_ROUNDS } from '../src/pages/batx2-zientziak-planoak/games/missingPlane.ts'
import { generatePlanesRaceQuestion, PLANES_RACE_CIRCUITS, planesRaceErrorTips, planesRaceKinds } from '../src/pages/batx2-zientziak-planoak/games/race.ts'
import { createTwinRounds, isSameLine, TWIN_ROUNDS } from '../src/pages/batx2-zientziak-planoak/games/twins.ts'

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

const seeds = Array.from({ length: 60 }, (_, index) => index + 1)

test('planoak batx2 z games: the list, the progress ids and the addresses', () => {
    assert.deepEqual(linesPlanesGames.map((game) => game.id), ['race', 'twins', 'classify', 'missing', 'detective', 'memory'])
    assert.equal(new Set(linesPlanesGameProgressIds).size, linesPlanesGameProgressIds.length)
    for (const id of linesPlanesGameProgressIds) assert.ok(id >= 120401 && id <= 120899, `${id}`)
    for (const game of linesPlanesGames) {
        checkTexts([game.title, game.tagline, game.skills, ...game.levels.flatMap((level) => [level.title, level.description])])
        assert.equal(linesPlanesGameModeForPath(`/matematika/batx2-zientziak/rectas-planos/jokuak/${linesPlanesGameSlugs[game.id]}`), game.id)
    }
    assert.equal(linesPlanesGameModeForPath('/matematika/batx2-zientziak/rectas-planos/jokuak'), 'hub')
})

test('planoak batx2 z games: every race question is right, with four different options', () => {
    const kinds = new Set<string>()
    for (let circuit = 0; circuit < PLANES_RACE_CIRCUITS; circuit++) {
        for (const seed of seeds) {
            const question = generatePlanesRaceQuestion(createRandom(seed * 7919 + circuit), circuit, 1)
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
                case 'line-point': assert.equal(value, v3('a')[m.index] + m.t * v3('u')[m.index]); break
                case 'continuous-point': assert.equal(value, v3('a')[m.index]); break
                case 'implicit-direction': assert.equal(value, cross(v3('n'), v3('m'))[m.index]); break
                case 'plane-d': assert.equal(value, -dot(v3('n'), v3('p'))); break
                case 'three-points': assert.equal(value, cross(sub(v3('b'), v3('a')), sub(v3('c'), v3('a')))[m.index]); break
                case 'parallel-d': assert.equal(value, dot(v3('n'), v3('p'))); break
                case 'mixed': assert.equal(value, det3(v3('w'), v3('u'), v3('v'))); break
                case 'parallel-k': assert.equal(value, m.factor * v3('u')[m.index]); break
                case 'meet-k': {
                    const b: Vec3 = [m.b1, m.b2, value]
                    assert.equal(det3(sub(b, v3('a')), v3('u'), v3('v')), 0)
                    assert.notEqual(cross(v3('u'), v3('v'))[2], 0)
                    break
                }
                case 'meet-t': assert.equal(dot(v3('n'), add(v3('a'), scale(value, v3('u')))), m.d); break
                case 'parallel-m': {
                    const u: [number, number, number] = [...v3('u')]
                    u[m.index] = value
                    assert.equal(dot(u, v3('n')), 0)
                    break
                }
                case 'meet-point': {
                    const t = (m.d - dot(v3('n'), v3('a'))) / dot(v3('u'), v3('n'))
                    assert.ok(Math.abs(value - (v3('a')[m.index] + t * v3('u')[m.index])) < 1e-9)
                    break
                }
                case 'det': assert.equal(value, det3(v3('r'), v3('s'), v3('t'))); break
                case 'det-a': {
                    const t: [number, number, number] = [...v3('t')]
                    t[m.index] = value
                    assert.equal(det3(v3('r'), v3('s'), t), 0)
                    break
                }
                case 'parallel-planes': assert.equal(value, m.factor * v3('n')[m.index]); break
                default: assert.fail(`unknown kind ${question.kind}`)
            }
        }
    }
    assert.deepEqual([...kinds].sort(), [...planesRaceKinds].sort())
    checkTexts(Object.values(planesRaceErrorTips))
})

test('planoak batx2 z games: twin lines, only one option is the same line', () => {
    for (let level = 0; level < 3; level++) {
        for (const seed of seeds) {
            const rounds = createTwinRounds(createRandom(seed * 31 + level), level)
            assert.equal(rounds.length, TWIN_ROUNDS)
            for (const round of rounds) {
                assert.equal(round.options.length, 4)
                round.options.forEach((option, index) => assert.equal(isSameLine(option, round.point, round.direction), index === round.answer, `${round.given} ${option.latex}`))
                for (const latex of [round.given, round.working, ...round.options.map((option) => option.latex)]) { render(latex); noColon(latex); tidy(latex) }
            }
        }
    }
})

test('planoak batx2 z games: classify the pair, the answer is the real position and every position comes up', () => {
    for (let level = 0; level < 3; level++) {
        const seen = new Set<string>()
        for (const seed of seeds) {
            const rounds = createClassifyRounds(createRandom(seed * 37 + level), level)
            assert.equal(rounds.length, CLASSIFY_ROUNDS)
            for (const round of rounds) {
                seen.add(round.answer)
                assert.ok(POSITIONS[round.type].includes(round.answer))
                assert.equal(positionOf(round.type, round.lines, round.planes), round.answer, `${round.first} | ${round.second}`)
                for (const latex of [round.first, round.second, round.working]) { render(latex); noColon(latex); tidy(latex) }
            }
            // Every position of the level among the six answers
            assert.equal(new Set(rounds.map((round) => round.answer)).size, POSITIONS[rounds[0].type].length)
        }
        assert.ok(seen.size >= 3)
    }
})

test('planoak batx2 z games: the missing plane holds its data and only one number fits', () => {
    for (let level = 0; level < 3; level++) {
        for (const seed of seeds) {
            const rounds = createMissingRounds(createRandom(seed * 41 + level), level)
            assert.equal(rounds.length, MISSING_ROUNDS)
            for (const round of rounds) {
                assert.equal(round.options.length, 4)
                assert.equal(new Set(round.options).size, 4)
                assert.ok(round.options.includes(round.answer))
                assert.equal(round.answer, round.place === 3 ? round.level : round.normal[round.place])
                const holds = (point: Vec3) => dot(round.normal, point) === round.level
                // The data: the points are on the plane, the line lies in it (point–line) or is perpendicular to it
                if (round.variant === 'three-points' || round.variant === 'point-line') for (const item of round.points) assert.ok(holds(item.at), round.prompt.es)
                if (round.variant === 'parallel' || round.variant === 'perpendicular') assert.ok(holds(round.points[0].at))
                if (round.variant === 'parallel') assert.deepEqual(round.normal, round.plane!.normal)
                if (round.variant === 'perpendicular') assert.deepEqual(cross(round.normal, round.line!.direction).map((value) => value + 0), [0, 0, 0])
                if (round.variant === 'point-line') assert.equal(dot(round.normal, round.line!.direction), 0)
                // Another number in the box gives a plane that misses the data
                for (const option of round.options) {
                    if (option === round.answer) continue
                    const normal: [number, number, number] = [...round.normal]
                    let level = round.level
                    if (round.place === 3) level = option
                    else normal[round.place] = option
                    const missesPoint = round.points.some((item) => dot(normal, item.at) !== level)
                    const missesLine = round.variant === 'point-line' && dot(normal, round.line!.direction) !== 0
                    const missesDirection = (round.variant === 'perpendicular' && cross(normal, round.line!.direction).some((value) => value !== 0)) || (round.variant === 'parallel' && cross(normal, round.plane!.normal).some((value) => value !== 0))
                    assert.ok(missesPoint || missesLine || missesDirection, `${round.prompt.es}: ${option}`)
                }
                const boxed = boxedLatex(round.normal, round.level, round.place)
                render(boxed)
                tidy(boxed.replace('\\square\\,', 'k'))
                render(round.working)
                checkTexts([round.prompt])
            }
        }
    }
})

test('planoak batx2 z games: the detective cases', () => {
    checkTexts([...Object.values(planesDetectiveNames), ...Object.values(planesDetectiveTips)])
    for (const error of planesDetectiveLevels.flat()) {
        let built = 0
        for (let seed = 1; seed <= 200 && built < 5; seed++) if (buildPlanesDetectiveCase(createRandom(seed * 13), error)) built += 1
        assert.ok(built >= 5, `${error} builds too rarely`)
    }
    for (let level = 0; level < planesDetectiveLevels.length; level++) {
        for (const seed of seeds) {
            const cases = createPlanesDetectiveCases(createRandom(seed * 43 + level), level)
            assert.equal(cases.length, PLANES_DETECTIVE_CASES)
            for (const item of cases) {
                assert.ok(planesDetectiveLevels[level].includes(item.error))
                assert.ok(item.wrong >= 0 && item.wrong < item.lines.length)
                assert.ok(item.options.includes(item.error))
                assert.notEqual(item.right, item.reached)
                for (const entry of item.lines) { render(entry.latex); noColon(entry.latex); tidy(entry.latex) }
                // The game shows the fix in pieces, one per arrow: each piece has to be a formula of its own
                for (const part of item.fix.split('\\ \\to\\ ')) render(part)
                noColon(item.fix)
                checkTexts([item.problem, ...item.lines.map((entry) => entry.label)])
            }
        }
    }
})

test('planoak batx2 z games: memory boards', () => {
    for (let level = 0; level < 3; level++) {
        for (const seed of seeds) {
            const cards = createPlanesMemoryBoard(createRandom(seed * 47 + level), level)
            assert.equal(cards.length, PLANES_MEMORY_PAIRS * 2)
            for (let set = 0; set < PLANES_MEMORY_PAIRS; set++) assert.equal(cards.filter((card) => card.setId === set).length, 2)
            assert.equal(new Set(cards.map((card) => card.latex)).size, cards.length)
            for (const card of cards) { render(card.latex); tidy(card.latex) }
        }
    }
})
