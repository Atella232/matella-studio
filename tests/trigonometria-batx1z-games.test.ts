import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import type { Tier } from '../src/features/unit-v2/games/raceCore.ts'
import { toExactDecimal, toNumber } from '../src/features/unit-v2/math/fraction.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { written } from '../src/pages/batx1-zientziak-errealak/games/race.ts'
import { localize } from '../src/pages/batx1-zientziak-trigonometria/text.ts'
import { createTrigonometryMemoryBoard, createTrigonometryMemoryPairs, reciprocalValue, TRIGONOMETRY_MEMORY_PAIRS, trigonometryExactPairs, trigonometryMemoryLevels } from '../src/pages/batx1-zientziak-trigonometria/games/boards.ts'
import { BUILD_FORMULAS, BUILD_LETTERS, BUILD_ROUNDS, createBuildRounds, fillTemplate, isBuildRight, lettered, rightSide } from '../src/pages/batx1-zientziak-trigonometria/games/build.ts'
import { createTrigonometryDetectiveCases, TRIGONOMETRY_DETECTIVE_CASES, trigonometryDetectiveLevels, trigonometryDetectiveNames, trigonometryDetectiveTips } from '../src/pages/batx1-zientziak-trigonometria/games/detective.ts'
import { createExactRounds, EXACT_ROUNDS, exactWorking, ratioValue, referenceAngle } from '../src/pages/batx1-zientziak-trigonometria/games/exact.ts'
import { createHuntRounds, HUNT_EQUATIONS, HUNT_POINTS, HUNT_ROUNDS, HUNT_VALUES, huntSolutions, isHuntRight } from '../src/pages/batx1-zientziak-trigonometria/games/hunt.ts'
import { trigonometryBatx1zGameModeForPath, trigonometryBatx1zGameProgressIds, trigonometryBatx1zGames, trigonometryBatx1zGameSlugs } from '../src/pages/batx1-zientziak-trigonometria/games/info.ts'
import { checkTrigonometryPitAnswer, generateTrigonometryRaceQuestion, TRIGONOMETRY_RACE_CIRCUITS } from '../src/pages/batx1-zientziak-trigonometria/games/race.ts'

const languages = ['eu', 'es', 'en', 'ar'] as const
const D = Math.PI / 180
const render = (latex: string, language: (typeof languages)[number] = 'es') => katex.renderToString(formulaFor(language, localize(language, latex)), { throwOnError: true, strict: 'error' })

function checkTexts(texts: LocalizedText[]) {
    for (const text of texts) {
        for (const language of languages) {
            assert.ok(text[language].length > 0)
            for (const [, formula] of text[language].matchAll(/\$([^$]+)\$/g)) render(formula, language)
            // \sen, \tg, \cosec and \cotg are already turned into each language's names
            assert.ok(!/\\(?:sen|tg|cosec|cotg)(?![a-zA-Z])/.test(text[language]), text[language])
        }
        assert.ok(!text.ar.includes('{,}'), text.ar)
        assert.ok(!/[؀-ۿ]/.test([...text.ar.matchAll(/\$([^$]+)\$/g)].map((match) => match[1]).join('')), text.ar)
        assert.ok(!/\d(?:ri|ren|rekin|ekin|ek|ak|ra|tik|z|ei|en|k)(?![a-zA-Z])/.test(text.eu.replace(/\$[^$]+\$/g, '')), text.eu)
        assert.ok(!/\$(?:ri|ren|rekin|z|ra|tik|ei)(?![a-zA-Z])/.test(text.eu), text.eu)
        // MathText turns «:» into ÷ inside formulas
        for (const [, formula] of text.es.matchAll(/\$([^$]+)\$/g)) assert.ok(!formula.includes(':'), formula)
    }
}

/** The whole degrees from 0° to 359° that solve f(x) = 0 */
const roots = (f: (x: number) => number) => Array.from({ length: 360 }, (_, x) => x).filter((x) => Math.abs(f(x)) < 1e-9)

test('trigonometria batx1 z games: the hub, its levels and progress ids', () => {
    assert.deepEqual(trigonometryBatx1zGames.map((game) => game.id), ['race', 'build', 'hunt', 'exact', 'detective', 'memory', 'circle'])
    assert.equal(new Set(trigonometryBatx1zGameProgressIds).size, trigonometryBatx1zGameProgressIds.length)
    for (const id of trigonometryBatx1zGameProgressIds) assert.ok(id >= 103401 && id <= 103899, `${id}`)
    const stages = ['ratios', 'sums', 'double', 'equations', 'functions']
    for (const game of trigonometryBatx1zGames) {
        assert.ok(game.levels.length >= 3, game.id)
        for (const level of game.levels) assert.ok(stages.includes(level.stage), `${game.id}: ${level.stage}`)
        checkTexts([game.title, game.tagline, game.skills, ...game.levels.flatMap((level) => [level.title, level.description])])
        assert.equal(trigonometryBatx1zGameModeForPath(`/matematika/batx1-zientziak/funciones-trigonometricas/jokuak/${trigonometryBatx1zGameSlugs[game.id]}`), game.id)
    }
    assert.equal(trigonometryBatx1zGameModeForPath('/matematika/batx1-zientziak/funciones-trigonometricas/jokuak'), 'hub')
})

test('trigonometria batx1 z games: every race question has one right option, worked out from its numbers', () => {
    const kinds = new Set<string>()
    for (let circuit = 0; circuit < TRIGONOMETRY_RACE_CIRCUITS; circuit += 1) {
        for (const tier of [0, 1, 2] as Tier[]) {
            for (let seed = 1; seed <= 60; seed += 1) {
                const question = generateTrigonometryRaceQuestion(createRandom(seed * 7919 + circuit * 31 + tier), circuit, tier)
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
                assert.equal(checkTrigonometryPitAnswer(question, typed), 'correct', `${question.kind}: ${typed}`)
                const { meta } = question
                const value = toNumber(question.answer)
                const sin = (x: number) => Math.sin(x * D)
                const cos = (x: number) => Math.cos(x * D)
                const expected: Record<string, () => number> = {
                    'to-radians': () => meta.degrees / 180,
                    'to-degrees': () => (meta.k * 180) / meta.m,
                    secant: () => (meta.sign * meta.h) / meta.q,
                    cosecant: () => (meta.sign * meta.h) / meta.p,
                    'sin-sum': () => Math.sin(Math.asin(meta.p1 / meta.h1) + Math.asin(meta.p2 / meta.h2)),
                    'cos-sum': () => Math.cos(Math.acos(meta.q1 / meta.h1) + Math.acos(meta.q2 / meta.h2)),
                    'tan-sum': () => Math.tan(Math.atan(meta.a) + Math.atan(meta.b)),
                    'sin-double': () => Math.sin(2 * Math.asin(meta.p / meta.h)),
                    'cos-double': () => Math.cos(2 * Math.asin(meta.p / meta.h)),
                    half: () => Math.cos(Math.acos(2 * (meta.q / meta.h) ** 2 - 1) / 2),
                    // 2x = 45° gives 22.5°: the search goes in half degrees
                    count: () => Array.from({ length: 720 }, (_, index) => index / 2).filter((x) => Math.abs((meta.cos ? cos(meta.n * x) : sin(meta.n * x)) - meta.value) < 1e-9).length,
                    largest: () => Math.max(...roots((x) => (meta.cos ? cos(x) : sin(x)) - meta.value)),
                    quadratic: () => roots(HUNT_EQUATIONS[meta.index].f).length,
                    period: () => 2 / meta.B,
                    amplitude: () => Math.abs(meta.A),
                    ferris: () => meta.D - meta.A * cos(meta.B * meta.t)
                }
                assert.ok(expected[question.kind], question.kind)
                assert.ok(Math.abs(expected[question.kind]() - value) < 1e-9, `${question.kind}: ${expected[question.kind]()} ≠ ${value} (${JSON.stringify(meta)})`)
            }
        }
    }
    assert.equal(kinds.size, 16, [...kinds].join(' '))
})

test('trigonometria batx1 z games: monta la fórmula', () => {
    // Exactly one way of filling the gaps gives the left side, at several pairs of angles
    const angles: Array<[number, number]> = [[0.37, 0.91], [1.2, -0.4], [0.73, 0.18]]
    for (const formula of BUILD_FORMULAS) {
        const combinations = formula.gaps.reduce<number[][]>((list, gap) => list.flatMap((prefix) => gap.map((_, index) => [...prefix, index])), [[]])
        const right = combinations.filter((choice) => angles.every(([a, b]) => Math.abs(formula.combine(choice.map((index, gap) => formula.gaps[gap][index].value(a, b)), a, b) - formula.truth(a, b)) < 1e-9))
        assert.deepEqual(right, [formula.gaps.map(() => 0)], formula.id)
        for (const gap of formula.gaps) assert.equal(new Set(gap.map((piece) => piece.latex)).size, gap.length, formula.id)
        for (const letters of BUILD_LETTERS) {
            render(lettered(formula.left, letters))
            for (const gap of formula.gaps) for (const piece of gap) render(lettered(piece.latex, letters))
        }
    }
    for (let level = 0; level < 3; level++) {
        for (let seed = 1; seed <= 40; seed++) {
            const rounds = createBuildRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, BUILD_ROUNDS)
            assert.equal(new Set(rounds.map((round) => `${round.formula} ${round.letters.join()}`)).size, BUILD_ROUNDS)
            for (const round of rounds) {
                assert.equal(BUILD_FORMULAS.find((formula) => formula.id === round.formula)!.level, level)
                const rightChoice = round.gaps.map((gap) => gap.right)
                assert.ok(isBuildRight(round, rightChoice))
                assert.ok(!isBuildRight(round, rightChoice.map((index, gap) => (index + 1) % round.gaps[gap].options.length)))
                for (const language of languages) {
                    render(`${round.left}=${rightSide(round)}`, language)
                    render(`${round.left}=${fillTemplate(round, round.gaps.map(() => null), 0)}`, language)
                }
                // The letters keep the commands apart: \sen x, never \senx
                assert.ok(!/\\(?:sen|cos|tg)[a-zA-Z]/.test(rightSide(round).replace(/\\(?:sen|cos|tg)(?:\\alpha|\\beta)/g, '')), rightSide(round))
            }
        }
    }
})

test('trigonometria batx1 z games: caza las soluciones', () => {
    // The notable values and their angles
    for (const value of HUNT_VALUES) {
        for (const angle of value.angles.sin) assert.ok(Math.abs(Math.sin(angle * D) - value.value) < 1e-9, `sin ${angle}`)
        for (const angle of value.angles.cos) assert.ok(Math.abs(Math.cos(angle * D) - value.value) < 1e-9, `cos ${angle}`)
        for (const angle of value.angles.tan) assert.ok(Math.abs(Math.tan(angle * D) - value.value) < 1e-9, `tan ${angle}`)
    }
    // Level 3: the solutions of every equation, worked out again
    for (const item of HUNT_EQUATIONS) {
        assert.deepEqual(roots(item.f), item.solutions, item.equation)
        render(item.equation)
    }
    for (let level = 0; level < 3; level++) {
        for (let seed = 1; seed <= 40; seed++) {
            const rounds = createHuntRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, HUNT_ROUNDS)
            assert.equal(new Set(rounds.map((round) => round.equation)).size, HUNT_ROUNDS)
            for (const round of rounds) {
                for (const language of languages) render(round.equation, language)
                assert.ok(round.solutions.length > 0)
                for (const x of round.solutions) assert.ok(HUNT_POINTS.includes(x), `${round.equation}: ${x}`)
                assert.ok(isHuntRight(round, [...round.solutions].reverse()))
                assert.ok(!isHuntRight(round, round.solutions.slice(1)))
                assert.ok(!isHuntRight(round, [...round.solutions, HUNT_POINTS.find((x) => !round.solutions.includes(x))!]))
                // The equation as written has exactly these solutions among the points
                const [ratio, n, value] = round.kind.split('-')
                if (level < 2 && ratio && n) {
                    const notable = HUNT_VALUES.find((item) => item.latex === round.kind.slice(ratio.length + n.length + 2))!
                    assert.ok(notable, round.kind + value)
                    assert.deepEqual(huntSolutions(ratio as 'sin' | 'cos' | 'tan', Number(n), notable), round.solutions)
                    const f = (x: number) => (ratio === 'sin' ? Math.sin : ratio === 'cos' ? Math.cos : Math.tan)(Number(n) * x * D) - notable.value
                    assert.deepEqual(HUNT_POINTS.filter((x) => Math.abs(f(x)) < 1e-9), round.solutions, round.equation)
                    assert.equal(Number(n) === 1, level === 0)
                }
            }
        }
    }
})

test('trigonometria batx1 z games: valor exacto', () => {
    for (let level = 0; level < 3; level++) {
        const seen = new Set<string>()
        for (let seed = 1; seed <= 40; seed++) {
            const rounds = createExactRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, EXACT_ROUNDS)
            for (const round of rounds) {
                seen.add(`${round.ratio} ${round.angle}`)
                const truth = ratioValue(round.ratio, round.angle)
                assert.equal(round.options.length, 4)
                assert.equal(round.options.filter((option) => Math.abs(option.value - truth) < 1e-9).length, 1, `${round.ratio} ${round.angle}`)
                assert.ok(Math.abs(round.options[round.right].value - truth) < 1e-9)
                assert.equal(new Set(round.options.map((option) => option.latex)).size, 4)
                // Each option's LaTeX is the number it stands for
                for (const option of round.options) {
                    const js = option.latex.replace(/\\frac\{(.+)\}\{(\d)\}$/, '($1)/$2').replace(/\\sqrt\{(\d)\+\\sqrt\{(\d)\}\}/g, 'Math.sqrt($1+Math.sqrt($2))').replace(/\\sqrt\{(\d)-\\sqrt\{(\d)\}\}/g, 'Math.sqrt($1-Math.sqrt($2))').replace(/\\sqrt\{(\d)\}/g, 'Math.sqrt($1)')
                    assert.ok(Math.abs(Function(`return ${js}`)() - option.value) < 1e-9, option.latex)
                }
                const reference = referenceAngle(round.angle)
                assert.ok(reference > 0 && reference < 90 && Math.abs(Math.abs(ratioValue(round.ratio, reference)) - Math.abs(truth)) < 1e-9)
                for (const line of exactWorking(round)) for (const language of languages) render(line, language)
            }
        }
        assert.ok(seen.size >= [6, 18, 10][level], `level ${level}: ${seen.size}`)
    }
})

test('trigonometria batx1 z games: el detective de trigonometría', () => {
    for (const [level, errors] of trigonometryDetectiveLevels.entries()) {
        const seen = new Set<string>()
        for (let seed = 1; seed <= 40; seed += 1) {
            const cases = createTrigonometryDetectiveCases(createRandom(seed * 7919 + level), level)
            assert.equal(cases.length, TRIGONOMETRY_DETECTIVE_CASES)
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
    checkTexts([...Object.values(trigonometryDetectiveNames), ...Object.values(trigonometryDetectiveTips)])
})

test('trigonometria batx1 z games: memory boards have one partner per card, and the pairs are right', () => {
    for (const [level, name] of trigonometryMemoryLevels.entries()) {
        for (let seed = 1; seed <= 40; seed++) {
            const pairs = createTrigonometryMemoryPairs(createRandom(seed * 7919 + level), level)
            assert.equal(pairs.length, TRIGONOMETRY_MEMORY_PAIRS, name)
            assert.equal(new Set(pairs.map((pair) => pair.question)).size, pairs.length)
            assert.equal(new Set(pairs.map((pair) => pair.answer)).size, pairs.length)
            for (const pair of pairs) {
                for (const language of languages) {
                    render(pair.question, language)
                    render(pair.answer, language)
                }
                if (name === 'radians') {
                    const [, top, bottom] = pair.answer.match(/^(?:\\frac\{(\d*)\\pi\}\{(\d+)\}|(\d*)\\pi)$/) ?? []
                    const radians = pair.answer.startsWith('\\frac') ? (Number(top || 1) / Number(bottom)) : Number(pair.answer.replace('\\pi', '') || 1)
                    assert.ok(Math.abs(radians * 180 - pair.value) < 1e-9, `${pair.question} ${pair.answer}`)
                    assert.equal(pair.question, `${pair.value}^{\\circ}`)
                }
                if (name === 'reciprocal') {
                    const [, ratio, angle] = pair.question.match(/^\\(sec|cosec|cotg) (\d+)\^\{\\circ\}$/)!
                    assert.ok(Math.abs(reciprocalValue(ratio as 'sec' | 'cosec' | 'cotg', Number(angle)) - pair.value) < 1e-9)
                }
            }
            const board = createTrigonometryMemoryBoard(createRandom(seed * 7919 + level), level, (latex) => localize('es', latex))
            assert.equal(board.length, 2 * TRIGONOMETRY_MEMORY_PAIRS)
            for (const card of board) assert.ok(!/\\(?:sen|tg|cosec|cotg)(?![a-zA-Z])/.test(card.latex), card.latex)
        }
    }
    // The exact values, worked out again
    const D2 = Math.PI / 180
    for (const pair of trigonometryExactPairs) {
        const [, ratio, angle] = pair.question.match(/^\\(sen|cos|tg) ([\d{,}]+)\^\{\\circ\}$/)!
        const degrees = Number(angle.replace('{,}', '.'))
        const value = ratio === 'sen' ? Math.sin(degrees * D2) : ratio === 'cos' ? Math.cos(degrees * D2) : Math.tan(degrees * D2)
        assert.ok(Math.abs(value - pair.value) < 1e-9, pair.question)
    }
})
