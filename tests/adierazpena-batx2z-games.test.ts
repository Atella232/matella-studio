import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { localize } from '../src/pages/batx1-zientziak-funtzioak/text.ts'
import { written } from '../src/pages/batx1-zientziak-errealak/games/race.ts'
import { BACH2_SKETCH_MEMORY_PAIRS, BACH2_SKETCH_MEMORY_SETS, createBach2SketchMemoryBoard } from '../src/pages/batx2-zientziak-adierazpena/games/boards.ts'
import { BACH2_SKETCH_DETECTIVE_ERRORS, bach2SketchDetectiveNames, bach2SketchDetectiveTips, createBach2SketchDetectiveCases } from '../src/pages/batx2-zientziak-adierazpena/games/detective.ts'
import { createGraphRounds, GRAPH_ROUNDS, graphFamiliesFor } from '../src/pages/batx2-zientziak-adierazpena/games/graphGame.ts'
import { bach2SketchGameModeForPath, bach2SketchGameProgressIds, bach2SketchGames, bach2SketchGameSlugs } from '../src/pages/batx2-zientziak-adierazpena/games/info.ts'
import { BACH2_SKETCH_RACE_CIRCUITS, generateBach2SketchRaceQuestion } from '../src/pages/batx2-zientziak-adierazpena/games/race.ts'
import { createReadRounds, READ_PROMPTS, READ_ROUNDS } from '../src/pages/batx2-zientziak-adierazpena/games/readGame.ts'
import { createSightRounds, SIGHT_ROUNDS } from '../src/pages/batx2-zientziak-adierazpena/games/sightGame.ts'

const languages = ['eu', 'es', 'en', 'ar'] as const
const render = (latex: string, language: (typeof languages)[number] = 'es') => katex.renderToString(formulaFor(language, localize(language, latex)), { throwOnError: true, strict: 'error' })

function checkTexts(texts: LocalizedText[]) {
    for (const text of texts) {
        for (const language of languages) {
            assert.ok(text[language].length > 0)
            for (const [, formula] of text[language].matchAll(/\$([^$]+)\$/g)) katex.renderToString(formulaFor(language, formula), { throwOnError: true, strict: 'error' })
        }
        assert.ok(!text.ar.includes('{,}'), text.ar)
        assert.ok(!/[؀-ۿ]/.test([...text.ar.matchAll(/\$([^$]+)\$/g)].map((match) => match[1]).join('')), text.ar)
        assert.ok(!/\d(?:ri|ren|rekin|ekin|ek|ak|ra|tik|z|ei|en|k)(?![a-zA-Z])/.test(text.eu.replace(/\$[^$]+\$/g, '')), text.eu)
        assert.ok(!/\$(?:ri|ren|rekin|z|ra|tik|ei)(?![a-zA-Z])/.test(text.eu), text.eu)
    }
}

/** Where f′ changes sign on a grid: [x, from, to] */
function signChanges(fp: (x: number) => number): Array<[number, number, number]> {
    const out: Array<[number, number, number]> = []
    let previous = Math.sign(fp(-5))
    for (let k = 1; k <= 2000; k++) {
        const x = -5 + k * 0.005
        const sign = Math.sign(fp(x))
        if (sign !== 0 && previous !== 0 && sign !== previous) out.push([Math.round(x * 2) / 2, previous, sign])
        if (sign !== 0) previous = sign
    }
    return out
}

test('adierazpena batx2 z games: the list, the ids and the addresses', () => {
    assert.equal(bach2SketchGames.length, 8)
    assert.equal(new Set(bach2SketchGameProgressIds).size, bach2SketchGameProgressIds.length)
    for (const id of bach2SketchGameProgressIds) assert.ok(id >= 125401 && id <= 125899, `${id}`)
    const stages = ['review', 'study', 'explog', 'roots', 'reading']
    for (const game of bach2SketchGames) {
        for (const level of game.levels) assert.ok(stages.includes(level.stage), `${game.id}: ${level.stage}`)
        checkTexts([game.title, game.tagline, game.skills, ...game.levels.flatMap((level) => [level.title, level.description])])
        assert.equal(bach2SketchGameModeForPath(`/matematika/batx2-zientziak/representacion-funciones/jokuak/${bach2SketchGameSlugs[game.id]}`), game.id)
    }
})

test('adierazpena batx2 z games: which graph is it?', () => {
    // The members of a family render and can be told apart on the plane
    for (let level = 0; level < 3; level += 1) {
        for (const family of graphFamiliesFor(level, createRandom(11 + level))) {
            const { xMin, xMax, yMin, yMax } = family.view
            for (const member of family.members) {
                for (const language of languages) { render(member.latex, language); render(member.note, language) }
            }
            for (let i = 0; i < family.members.length; i++) for (let j = i + 1; j < family.members.length; j++) {
                let apart = 0
                for (let x = xMin; x <= xMax; x += 0.05) {
                    const a = family.members[i].fn(x)
                    const b = family.members[j].fn(x)
                    const inA = Number.isFinite(a) && a >= yMin && a <= yMax
                    const inB = Number.isFinite(b) && b >= yMin && b <= yMax
                    if (inA !== inB || (inA && Math.abs(a - b) > 0.4)) apart += 1
                }
                assert.ok(apart > 20, `${family.members[i].latex} and ${family.members[j].latex} look alike`)
            }
        }
    }
    for (let seed = 1; seed <= 30; seed += 1) {
        for (let level = 0; level < 3; level += 1) {
            const rounds = createGraphRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, GRAPH_ROUNDS)
            assert.equal(new Set(rounds.map((round) => round.latex)).size, GRAPH_ROUNDS)
            for (const round of rounds) {
                assert.equal(round.options.length, 3)
                assert.equal(round.options[round.correct].latex, round.latex)
                assert.equal(new Set(round.options.map((option) => option.latex)).size, 3)
            }
        }
    }
})

test('adierazpena batx2 z games: read the derivative', () => {
    checkTexts(Object.values(READ_PROMPTS))
    const value = (latex: string) => Number(latex.replace(/^x=/, ''))
    for (let seed = 1; seed <= 40; seed += 1) {
        for (let level = 0; level < 3; level += 1) {
            const rounds = createReadRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, READ_ROUNDS)
            for (const round of rounds) {
                assert.equal(new Set(round.options).size, 3, round.options.join(' | '))
                for (const option of round.options) render(option)
                checkTexts([round.explain])
                const right = round.options[round.correct]
                const changes = signChanges(round.fp)
                if (round.question === 'max') assert.ok(changes.some(([x, from, to]) => x === value(right) && from > 0 && to < 0), `max ${right}`)
                if (round.question === 'min') assert.ok(changes.some(([x, from, to]) => x === value(right) && from < 0 && to > 0), `min ${right}`)
                if (round.question === 'count') assert.equal(changes.length, Number(right), `count ${right}`)
                if (round.question === 'inflection') {
                    const second = (x: number) => (round.fp(x + 1e-5) - round.fp(x - 1e-5)) / 2e-5
                    const x = value(right)
                    assert.ok(second(x - 0.1) * second(x + 0.1) < 0, `inflection ${right}`)
                }
                if (round.question === 'increase') {
                    const { a, b } = round.meta
                    const mid = (a + b) / 2
                    const inside = round.fp(mid) > 0
                    assert.equal(right, inside ? `(${a},\\,${b})` : `(-\\infty,\\,${a})\\cup(${b},\\,+\\infty)`)
                    assert.equal(round.fp(a - 0.5) > 0, !inside)
                }
            }
        }
    }
})

test('adierazpena batx2 z games: asymptotes in sight', () => {
    for (let seed = 1; seed <= 40; seed += 1) {
        for (let level = 0; level < 3; level += 1) {
            const rounds = createSightRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, SIGHT_ROUNDS)
            assert.equal(new Set(rounds.map((round) => round.latex)).size, SIGHT_ROUNDS)
            for (const round of rounds) {
                assert.equal(new Set(round.options).size, 3)
                for (const language of languages) { render(round.latex, language); render(round.explain, language); for (const option of round.options) render(option, language) }
                const { verticals, horizontals, obliques } = round.meta
                const f = round.fn
                // Every vertical asymptote blows up on at least one side
                for (const p of verticals) assert.ok(Math.abs(f(p + 1e-9)) > 15 || Math.abs(f(p - 1e-9)) > 15, `${round.latex}: x = ${p}`)
                // Every horizontal asymptote is the limit on one side at least
                for (const k of horizontals) assert.ok([1e4, -1e4].some((x) => Number.isFinite(f(x)) && Math.abs(f(x) - k) < 1e-2), `${round.latex}: y = ${k}`)
                for (const [m, n] of obliques) assert.ok([1e4, -1e4].some((x) => Number.isFinite(f(x)) && Math.abs(f(x) - (m * x + n)) < 1e-2), `${round.latex}: y = ${m}x + ${n}`)
                // And there is no other: on each side the function has the asymptotes listed, or none
                for (const x of [1e4, -1e4]) {
                    const y = f(x)
                    // Only where f settles down far away is there a horizontal asymptote to name
                    if (!Number.isFinite(y) || Math.abs(f(100 * x) - y) > 1e-2) continue
                    assert.ok(horizontals.some((k) => Math.abs(y - k) < 1e-2), `${round.latex}: side ${x}`)
                }
                // The right list names them all
                const right = round.options[round.correct]
                for (const p of verticals) assert.ok(right.includes(`x=${p}`) || right.includes(`x=\\pm ${Math.abs(p)}`), `${round.latex}: ${right}`)
                for (const k of horizontals) assert.ok(right.includes(`y=${k}`), `${round.latex}: ${right}`)
            }
        }
    }
})

test('adierazpena batx2 z games: the detective', () => {
    checkTexts([...Object.values(bach2SketchDetectiveNames), ...Object.values(bach2SketchDetectiveTips)])
    assert.equal(BACH2_SKETCH_DETECTIVE_ERRORS.length, 12)
    const seen = new Set<string>()
    for (let seed = 1; seed <= 40; seed += 1) {
        for (let level = 0; level < 3; level += 1) {
            const cases = createBach2SketchDetectiveCases(createRandom(seed * 7919 + level), level)
            for (const item of cases) {
                seen.add(item.error)
                assert.ok(item.wrong >= 0 && item.wrong < item.lines.length)
                assert.ok(item.options.includes(item.error) && item.options.length === 3)
                assert.ok(Math.abs(item.right - item.reached) > 1e-9)
                checkTexts([item.problem, ...item.lines.map((entry) => entry.label)])
                for (const language of languages) { for (const entry of item.lines) render(entry.latex, language); render(item.fix, language) }
            }
        }
    }
    assert.equal(seen.size, 12)
})

test('adierazpena batx2 z games: the race', () => {
    for (let circuit = 0; circuit < BACH2_SKETCH_RACE_CIRCUITS; circuit += 1) {
        const kinds = new Set<string>()
        for (let seed = 1; seed <= 60; seed += 1) {
            const question = generateBach2SketchRaceQuestion(createRandom(seed * 7919 + circuit), circuit, 'normal')
            kinds.add(question.kind)
            assert.equal(question.options.length, 4)
            assert.equal(question.options.filter((option) => option.correct).length, 1)
            assert.equal(new Set(question.options.map((option) => option.latex)).size, 4)
            assert.equal(question.options.find((option) => option.correct)!.latex, written(question.answer))
            checkTexts([question.prompt, question.solution])
            for (const option of question.options) render(option.latex)
            const m = question.meta
            const answer = question.answer.numerator / question.answer.denominator
            const expected: Record<string, number> = {
                vertical: m.p, horizontal: m.a / m.c, oblique: m.b + m.p,
                odd: -m.v, period: 2 / m.k, edge: m.a,
                'exp-max': 1 / m.k, log: m.p, 'exp-horizontal': m.k,
                root: m.p, trig: Math.sqrt(m.a * m.a + m.b * m.b), piece: (m.p * m.p - m.b) / m.p,
                corners: m.count, fprime: m.a, inflection: (m.a + m.b) / 2
            }
            assert.ok(Math.abs(expected[question.kind] - answer) < 1e-9, `${question.kind}: ${answer}`)
            // The maximum of a·sin x + b·cos x, checked on a grid
            if (question.kind === 'trig') {
                let top = -Infinity
                for (let x = 0; x < 2 * Math.PI; x += 1e-4) top = Math.max(top, m.a * Math.sin(x) + m.b * Math.cos(x))
                assert.ok(Math.abs(top - answer) < 1e-3)
            }
            // The n of √(x² + 2px) on the right
            if (question.kind === 'root') assert.ok(Math.abs(Math.sqrt(1e12 + 2 * m.p * 1e6) - 1e6 - answer) < 1e-3)
        }
        assert.equal(kinds.size, 3, `circuit ${circuit}`)
    }
})

test('adierazpena batx2 z games: the memory', () => {
    for (const [level, pairs] of Object.entries(BACH2_SKETCH_MEMORY_SETS)) {
        assert.equal(pairs.length, 8, level)
        assert.equal(new Set(pairs.map((pair) => pair.answer)).size, 8, level)
        for (const pair of pairs) { render(pair.question); render(pair.answer); assert.ok(!/\\(sin|cos|tan)/.test(pair.question), pair.question) }
    }
    for (let level = 0; level < 3; level += 1) {
        const board = createBach2SketchMemoryBoard(createRandom(level + 5), level)
        assert.equal(board.length, BACH2_SKETCH_MEMORY_PAIRS * 2)
    }
})
