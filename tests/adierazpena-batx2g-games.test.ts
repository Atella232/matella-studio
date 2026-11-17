import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { localize } from '../src/pages/batx1-zientziak-funtzioak/text.ts'
import { BACH2G_SKETCH_MEMORY_PAIRS, createBach2gSketchMemoryBoard } from '../src/pages/batx2-gizarte-adierazpena/games/boards.ts'
import { BACH2G_SKETCH_DETECTIVE_ERRORS, bach2gSketchDetectiveNames, bach2gSketchDetectiveTips, createBach2gSketchDetectiveCases } from '../src/pages/batx2-gizarte-adierazpena/games/detective.ts'
import { bach2gSketchGameModeForPath, bach2gSketchGameProgressIds, bach2gSketchGames, bach2gSketchGameSlugs } from '../src/pages/batx2-gizarte-adierazpena/games/info.ts'
import { BACH2G_SKETCH_RACE_CIRCUITS, generateBach2gSketchRaceQuestion } from '../src/pages/batx2-gizarte-adierazpena/games/race.ts'
import { createSheetRounds, SHEET_ROUNDS } from '../src/pages/batx2-gizarte-adierazpena/games/sheet.ts'
import { createWhichRounds, WHICH_ROUNDS } from '../src/pages/batx2-gizarte-adierazpena/games/whichGraph.ts'

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

test('adierazpena batx2 g games: the list, the ids and the addresses', () => {
    assert.equal(bach2gSketchGames.length, 5)
    assert.equal(new Set(bach2gSketchGameProgressIds).size, bach2gSketchGameProgressIds.length)
    for (const id of bach2gSketchGameProgressIds) assert.ok(id >= 148401 && id <= 148899, `${id}`)
    const stages = ['first', 'asymptotes', 'derivatives', 'graphs', 'reading']
    for (const game of bach2gSketchGames) {
        for (const level of game.levels) assert.ok(stages.includes(level.stage), `${game.id}: ${level.stage}`)
        checkTexts([game.title, game.tagline, game.skills, ...game.levels.flatMap((level) => [level.title, level.description])])
        assert.equal(bach2gSketchGameModeForPath(`/matematika/batx2-gizarte/representacion-funciones/jokuak/${bach2gSketchGameSlugs[game.id]}`), game.id)
    }
})

/** A formula f(x)=… of the which-graph game, evaluated by hand */
function evaluate(latex: string): (x: number) => number {
    const js = latex
        .replace(/^f\(x\)=/, '')
        .replace(/\\ln\(([^)]*)\)/g, 'Math.log($1)')
        .replace(/e\^\{-x\}/g, 'Math.exp(-x)')
        .replace(/e\^\{x\}/g, 'Math.exp(x)')
        .replace(/\\frac\{(\d+)\}\{([^}]*)\}/g, '($1)/($2)')
        .replace(/(\d)x/g, '$1*x')
        .replace(/(\d)\(/g, '$1*(')
        .replace(/\(([^()]*)\)\^2/g, 'Math.pow($1,2)')
        .replace(/x\^(\d)/g, 'Math.pow(x,$1)')
    return Function('x', `return ${js}`) as (x: number) => number
}

test('adierazpena batx2 g games: which graph is it?', () => {
    for (let seed = 1; seed <= 40; seed += 1) {
        for (let level = 0; level < 3; level += 1) {
            const rounds = createWhichRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, WHICH_ROUNDS)
            for (const round of rounds) {
                render(round.latex)
                render(round.working)
                assert.equal(round.options.length, 3)
                const fn = evaluate(round.latex)
                const xs = [-3.3, -1.7, 0.6, 2.4, 3.6]
                // The right graph is the formula, and the other two differ from it somewhere
                for (const x of xs) {
                    const want = fn(x)
                    const got = round.options[round.answer].fn(x)
                    if (Number.isFinite(want)) assert.ok(Math.abs(want - got) < 1e-9, `${round.latex} at ${x}`)
                }
                for (let i = 0; i < 3; i++) for (let j = i + 1; j < 3; j++) assert.ok(xs.some((x) => { const a = round.options[i].fn(x); const b = round.options[j].fn(x); return Number.isFinite(a) !== Number.isFinite(b) || Math.abs(a - b) > 0.3 }), round.latex)
            }
        }
    }
})

test('adierazpena batx2 g games: fill in the card', () => {
    for (let seed = 1; seed <= 40; seed += 1) {
        for (let level = 0; level < 3; level += 1) {
            const rounds = createSheetRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, SHEET_ROUNDS)
            for (const round of rounds) {
                checkTexts([round.prompt])
                render(round.latex)
                render(round.working)
                assert.equal(round.options.length, 4)
                assert.equal(new Set(round.options).size, 4)
                for (const option of round.options) render(option)
                assert.ok(round.answer >= 0 && round.answer < 4)
            }
        }
    }
})

test('adierazpena batx2 g games: the detective', () => {
    checkTexts([...Object.values(bach2gSketchDetectiveNames), ...Object.values(bach2gSketchDetectiveTips)])
    const seen = new Set<string>()
    for (let seed = 1; seed <= 40; seed += 1) {
        for (let level = 0; level < 3; level += 1) {
            for (const item of createBach2gSketchDetectiveCases(createRandom(seed * 7919 + level), level)) {
                seen.add(item.error)
                assert.equal(item.lines.length, 3)
                assert.notEqual(item.right, item.reached)
                checkTexts([item.problem, ...item.lines.map((line) => line.label)])
                for (const language of languages) {
                    for (const line of item.lines) render(line.latex, language)
                    for (const part of item.fix.split('\\ \\to\\ ')) render(part, language)
                }
            }
        }
    }
    assert.deepEqual([...seen].sort(), [...BACH2G_SKETCH_DETECTIVE_ERRORS].sort())
})

test('adierazpena batx2 g games: the race, every answer checked against its meta', () => {
    const kinds = new Set<string>()
    for (let seed = 1; seed <= 60; seed += 1) {
        for (let circuit = 0; circuit < BACH2G_SKETCH_RACE_CIRCUITS; circuit += 1) {
            const question = generateBach2gSketchRaceQuestion(createRandom(seed * 7919 + circuit), circuit, 0)
            kinds.add(question.kind)
            assert.equal(question.circuit, circuit)
            assert.equal(question.options.filter((option) => option.correct).length, 1)
            assert.equal(new Set(question.options.map((option) => option.latex)).size, 4)
            checkTexts([question.prompt, question.solution])
            for (const option of question.options) render(option.latex)
            const answer = question.answer.numerator / question.answer.denominator
            const m = question.meta
            const argmin = (fn: (x: number) => number, from: number, to: number) => {
                let best = from
                for (let x = from; x <= to + 1e-9; x += 0.001) if (fn(x) < fn(best)) best = x
                return best
            }
            const expected: Record<string, () => number> = {
                out: () => m.a,
                'y-cut': () => (0 + m.p) / (0 + m.a),
                'x-cut': () => m.p,
                vertical: () => m.a,
                horizontal: () => { const f = (x: number) => (m.b * x + m.d) / (m.c * x - 1); return f(1e9) },
                oblique: () => { const f = (x: number) => (x * x + m.n * x + m.r) / x; return f(1e9) - 1e9 },
                max: () => -argmin((x) => x ** 3 - 3 * m.k * m.k * x, 0, 10),
                inflection: () => m.p,
                'min-value': () => { const f = (x: number) => x * x - 2 * m.a * x + m.c; return f(argmin(f, -10, 20)) },
                'rational-min': () => { const f = (x: number) => (x * x + m.c * m.c) / x; return f(argmin(f, 0.1, 20)) },
                'exp-top': () => argmin((x) => -(x ** m.k) * Math.exp(-x), 0.01, 10),
                ln: () => m.a,
                corner: () => m.a,
                'abs-top': () => Math.abs(0 - m.a * m.a),
                model: () => m.k
            }
            assert.ok(Math.abs(answer - expected[question.kind]()) < 1e-2, `${question.kind}: ${question.prompt.es} → ${answer} vs ${expected[question.kind]()}`)
        }
    }
    assert.equal(kinds.size, 15)
})

test('adierazpena batx2 g games: memory', () => {
    for (let seed = 1; seed <= 40; seed += 1) {
        for (let level = 0; level < 3; level += 1) {
            const cards = createBach2gSketchMemoryBoard(createRandom(seed * 7919 + level), level)
            assert.equal(cards.length, BACH2G_SKETCH_MEMORY_PAIRS * 2)
            for (const card of cards) {
                render(card.latex)
                render(card.explain!)
            }
            const answers = cards.filter((card) => card.id.endsWith('-a')).map((card) => card.latex)
            assert.equal(new Set(answers).size, BACH2G_SKETCH_MEMORY_PAIRS)
        }
    }
})
