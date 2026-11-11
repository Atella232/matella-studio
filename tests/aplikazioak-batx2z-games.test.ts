import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { localize } from '../src/pages/batx1-zientziak-funtzioak/text.ts'
import { BACH2_APPLICATIONS_MEMORY_PAIRS, BACH2_APPLICATIONS_MEMORY_SETS, createBach2ApplicationsMemoryBoard } from '../src/pages/batx2-zientziak-aplikazioak/games/boards.ts'
import { BACH2_APPLICATIONS_DETECTIVE_ERRORS, bach2ApplicationsDetectiveNames, bach2ApplicationsDetectiveTips, createBach2ApplicationsDetectiveCases } from '../src/pages/batx2-zientziak-aplikazioak/games/detective.ts'
import { createHopitalRounds, HOPITAL_BINS, HOPITAL_ROUNDS } from '../src/pages/batx2-zientziak-aplikazioak/games/hopitalGame.ts'
import { bach2ApplicationsGameModeForPath, bach2ApplicationsGameProgressIds, bach2ApplicationsGames, bach2ApplicationsGameSlugs } from '../src/pages/batx2-zientziak-aplikazioak/games/info.ts'
import { createOptimizeRounds, OPTIMIZE_ROUNDS } from '../src/pages/batx2-zientziak-aplikazioak/games/optimizeGame.ts'
import { BACH2_APPLICATIONS_RACE_CIRCUITS, generateBach2ApplicationsRaceQuestion } from '../src/pages/batx2-zientziak-aplikazioak/games/race.ts'
import { createRolleRounds, ROLLE_BINS, ROLLE_ROUNDS } from '../src/pages/batx2-zientziak-aplikazioak/games/rolleGame.ts'

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

/** A LaTeX number (integers, fractions, e and its powers) as a number */
function numeric(latex: string): number {
    const value = latex.trim()
    const fractionMatch = value.match(/^(-?)\\frac\{(\d+)\}\{(\d+)\}$/)
    if (fractionMatch) return (fractionMatch[1] ? -1 : 1) * Number(fractionMatch[2]) / Number(fractionMatch[3])
    if (value === 'e') return Math.E
    const power = value.match(/^e\^\{?(\d+)\}?$/)
    if (power) return Math.exp(Number(power[1]))
    if (value === '+\\infty') return Infinity
    const sqrt = value.match(/^\\sqrt\{(\d+)\}$/)
    if (sqrt) return Math.sqrt(Number(sqrt[1]))
    return Number(value.replace(/^x=/, ''))
}

test('aplikazioak batx2 z games: the list, the ids and the addresses', () => {
    assert.equal(bach2ApplicationsGames.length, 8)
    assert.equal(new Set(bach2ApplicationsGameProgressIds).size, bach2ApplicationsGameProgressIds.length)
    for (const id of bach2ApplicationsGameProgressIds) assert.ok(id >= 124401 && id <= 124899, `${id}`)
    const stages = ['review', 'rolle', 'hopital', 'conditions', 'optimization']
    for (const game of bach2ApplicationsGames) {
        for (const level of game.levels) assert.ok(stages.includes(level.stage), `${game.id}: ${level.stage}`)
        checkTexts([game.title, game.tagline, game.skills, ...game.levels.flatMap((level) => [level.title, level.description])])
        assert.equal(bach2ApplicationsGameModeForPath(`/matematika/batx2-zientziak/aplicaciones-derivada/jokuak/${bach2ApplicationsGameSlugs[game.id]}`), game.id)
    }
})

test('aplikazioak batx2 z games: does L\'Hôpital apply?', () => {
    // The value of each limit, worked out numerically close to its point
    const near = (latex: string): number | null => {
        const point = latex.match(/\\lim_\{x\\to ([^}]+)\}/)![1]
        if (point.includes('infty')) return null
        return Number(point.replace('^+', ''))
    }
    for (let seed = 1; seed <= 40; seed += 1) {
        for (let level = 0; level < 3; level += 1) {
            const rounds = createHopitalRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, HOPITAL_ROUNDS)
            assert.equal(new Set(rounds.map((round) => round.latex)).size, HOPITAL_ROUNDS)
            for (const bin of HOPITAL_BINS) assert.ok(rounds.filter((round) => round.bin === bin).length >= 2, `${level} ${bin}`)
            for (const round of rounds) {
                for (const language of languages) render(round.latex, language)
                render(round.form)
                render(round.value)
                // 0/0 and ∞/∞ are the only forms of «now»; a plain number is «none»
                if (round.bin === 'now') assert.ok(['\\frac{0}{0}', '\\frac{\\infty}{\\infty}'].includes(round.form), round.latex)
                if (round.bin === 'none') assert.ok(!/\\frac\{0\}\{0\}|\\frac\{\\infty\}\{\\infty\}|0\\cdot|\\infty-\\infty|\^\{\\infty\}|0\^0|\\infty\^0/.test(round.form), round.latex)
                const a = near(round.latex)
                if (a === null || round.value.includes('infty')) continue
                assert.ok(Number.isFinite(numeric(round.value)), round.value)
            }
        }
    }
})

test('aplikazioak batx2 z games: does Rolle hold?', () => {
    for (let seed = 1; seed <= 40; seed += 1) {
        for (let level = 0; level < 3; level += 1) {
            const rounds = createRolleRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, ROLLE_ROUNDS)
            for (const bin of ROLLE_BINS) assert.ok(rounds.some((round) => round.bin === bin), `${level} ${bin}`)
            for (const round of rounds) {
                for (const language of languages) render(`f(x)=${round.latex}`, language)
                render(round.interval)
                render(`f(a)=${round.fa}\\qquad f(b)=${round.fb}`)
                if (round.point) render(round.point)
                // Equal heights unless the heights are what fails
                assert.equal(round.fa === round.fb, round.bin !== 'heights', `${round.latex} ${round.interval}`)
                if (round.bin === 'yes') assert.ok(round.point.startsWith('c='), round.latex)
            }
        }
    }
    // The heights written are those of the function: x² + px at both ends
    for (let seed = 1; seed <= 40; seed += 1) {
        for (const round of createRolleRounds(createRandom(seed), 0).filter((item) => item.latex.startsWith('x^2'))) {
            const p = Number(round.latex.match(/x\^2([+-]\d+)x/)?.[1] ?? 0)
            const [a, b] = round.interval.slice(1, -1).split(',\\,').map(Number)
            assert.equal(String(a * a + p * a), round.fa)
            assert.equal(String(b * b + p * b), round.fb)
        }
    }
})

test('aplikazioak batx2 z games: set up and optimise', () => {
    for (let seed = 1; seed <= 40; seed += 1) {
        for (let level = 0; level < 3; level += 1) {
            const rounds = createOptimizeRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, OPTIMIZE_ROUNDS)
            assert.equal(new Set(rounds.map((round) => round.prompt.es)).size, OPTIMIZE_ROUNDS)
            for (const round of rounds) {
                checkTexts([round.prompt])
                assert.equal(new Set(round.functions).size, 3)
                assert.equal(new Set(round.values).size, 3)
                for (const latex of [...round.functions, ...round.values, round.working]) render(latex)
                // The optimum of the right function, found on a fine grid, is the right value
                const fn = round.functions[round.function]
                const body = fn.replace(/^[A-Z]\(x\)=/, '')
                const js = body
                    .replace(/\\left|\\right/g, '')
                    .replace(/\\frac\{([^{}]+)\}\{([^{}]+)\}/g, '(($1)/($2))')
                    .replace(/\^2/g, '**2')
                    .replace(/(\d)x/g, '$1*x')
                    .replace(/(\d)\(/g, '$1*(')
                    .replace(/x\(/g, 'x*(')
                    .replace(/\)\(/g, ')*(')
                const f = Function('x', `return ${js}`) as (x: number) => number
                let best = { x: 0, y: f(0.01) }
                const values: number[] = []
                for (let x = 0.01; x <= 60; x += 0.01) {
                    const y = f(x)
                    if (!Number.isFinite(y)) continue
                    values.push(y)
                }
                const max = Math.max(...values)
                const min = Math.min(...values)
                const target = numeric(round.values[round.value])
                best = { x: 0, y: Math.abs(max - target) < Math.abs(min - target) ? max : min }
                assert.ok(Math.abs(best.y - target) < 1e-3, `${round.prompt.es}: ${fn} → ${best.y}, not ${target}`)
            }
        }
    }
})

test('aplikazioak batx2 z games: the detective', () => {
    checkTexts([...Object.values(bach2ApplicationsDetectiveNames), ...Object.values(bach2ApplicationsDetectiveTips)])
    const seen = new Set<string>()
    for (let seed = 1; seed <= 40; seed += 1) {
        for (let level = 0; level < 3; level += 1) {
            for (const item of createBach2ApplicationsDetectiveCases(createRandom(seed * 7919 + level), level)) {
                seen.add(item.error)
                assert.equal(item.lines.length, 3)
                assert.ok(item.wrong >= 0 && item.wrong < 3)
                assert.notEqual(item.right, item.reached)
                checkTexts([item.problem, ...item.lines.map((line) => line.label)])
                for (const language of languages) {
                    for (const line of item.lines) render(line.latex, language)
                    for (const part of item.fix.split('\\ \\to\\ ')) render(part, language)
                }
            }
        }
    }
    assert.deepEqual([...seen].sort(), [...BACH2_APPLICATIONS_DETECTIVE_ERRORS].sort())
})

test('aplikazioak batx2 z games: the race, every answer checked against its meta', () => {
    const kinds = new Set<string>()
    for (let seed = 1; seed <= 60; seed += 1) {
        for (let circuit = 0; circuit < BACH2_APPLICATIONS_RACE_CIRCUITS; circuit += 1) {
            const question = generateBach2ApplicationsRaceQuestion(createRandom(seed * 7919 + circuit), circuit, 'base')
            kinds.add(question.kind)
            assert.equal(question.options.filter((option) => option.correct).length, 1)
            assert.equal(new Set(question.options.map((option) => option.latex)).size, 4)
            checkTexts([question.prompt, question.solution])
            for (const option of question.options) render(option.latex)
            const answer = question.answer.numerator / question.answer.denominator
            const m = question.meta
            const expected: Record<string, () => number> = {
                max: () => -m.k,
                inflection: () => -m.a / 3,
                absolute: () => Math.max(m.p * m.p, m.q * m.q),
                rolle: () => m.c,
                mean: () => (m.a + m.b) / 2,
                roots: () => (Math.abs(m.q) < 2 ? 3 : 1),
                sine: () => m.k / m.m,
                cosine: () => (m.k * m.k) / 2,
                power: () => m.k * m.m,
                minimum: () => -2 * m.p,
                'inflection-coefficient': () => -3 * m.k,
                tangent: () => m.m + m.n,
                product: () => (m.s * m.s) / 4,
                area: () => (m.p * m.p) / 16,
                sum: () => 2 * m.r
            }
            assert.ok(Math.abs(answer - expected[question.kind]()) < 1e-9, `${question.kind}: ${question.prompt.es}`)
            // The same numbers, worked out another way
            const derivative = (f: (x: number) => number, x: number) => (f(x + 1e-6) - f(x - 1e-6)) / 2e-6
            if (question.kind === 'max') assert.ok(Math.abs(derivative((x) => x ** 3 - 3 * m.k * m.k * x, answer)) < 1e-5 && answer < 0)
            if (question.kind === 'sine') assert.ok(Math.abs(Math.sin(m.k * 1e-5) / (m.m * 1e-5) - answer) < 1e-6)
            if (question.kind === 'cosine') assert.ok(Math.abs((1 - Math.cos(m.k * 1e-3)) / 1e-6 - answer) < 1e-4)
            if (question.kind === 'power') assert.ok(Math.abs((m.m / 1e-6) * Math.log(1 + m.k * 1e-6) - answer) < 1e-4)
            if (question.kind === 'roots') {
                let changes = 0
                const f = (x: number) => x ** 3 - 3 * x + m.q
                for (let x = -5; x < 5; x += 0.01) if (Math.sign(f(x)) !== Math.sign(f(x + 0.01))) changes += 1
                assert.equal(changes, answer)
            }
        }
    }
    assert.equal(kinds.size, 15)
})

test('aplikazioak batx2 z games: no coefficient 0 or 1 written out (x^2x, +1x, +0x)', () => {
    const ugly = /(^|[^\d.])1x|[+-]0x|x\^[23]x/
    const texts: string[] = []
    const all = (text: LocalizedText) => languages.map((language) => text[language])
    for (let seed = 1; seed <= 60; seed += 1) {
        for (let circuit = 0; circuit < BACH2_APPLICATIONS_RACE_CIRCUITS; circuit += 1) {
            const question = generateBach2ApplicationsRaceQuestion(createRandom(seed * 7919 + circuit), circuit, 'base')
            texts.push(...all(question.prompt), ...all(question.solution), ...question.options.map((option) => option.latex))
        }
        for (let level = 0; level < 3; level += 1) {
            const random = () => createRandom(seed * 7919 + level)
            for (const item of createBach2ApplicationsDetectiveCases(random(), level)) texts.push(...all(item.problem), ...item.lines.map((line) => line.latex), item.fix)
            for (const round of createHopitalRounds(random(), level)) texts.push(round.latex)
            for (const round of createRolleRounds(random(), level)) texts.push(round.latex)
            for (const round of createOptimizeRounds(random(), level)) texts.push(...all(round.prompt), ...round.functions)
        }
    }
    const bad = texts.filter((text) => ugly.test(text))
    assert.deepEqual([...new Set(bad)].slice(0, 5), [])
})

test('aplikazioak batx2 z games: memory', () => {
    for (const set of Object.values(BACH2_APPLICATIONS_MEMORY_SETS)) assert.equal(new Set(set.map((pair) => pair.answer)).size, set.length)
    for (let seed = 1; seed <= 40; seed += 1) {
        for (let level = 0; level < 3; level += 1) {
            const cards = createBach2ApplicationsMemoryBoard(createRandom(seed * 7919 + level), level)
            assert.equal(cards.length, BACH2_APPLICATIONS_MEMORY_PAIRS * 2)
            for (const card of cards) {
                render(card.latex)
                render(card.explain)
                assert.ok(!/\\(?:sin|cos|tan|arc)/.test(card.latex), 'memory cards are not translated: no sines or arcs')
            }
            const answers = cards.filter((card) => card.id.endsWith('-a')).map((card) => card.latex)
            assert.equal(new Set(answers).size, BACH2_APPLICATIONS_MEMORY_PAIRS)
        }
    }
    // Each limit and each optimum is what the pair says
    const limits: Record<string, number> = { '2': 2, '3': 3, '\\frac{1}{2}': 0.5, '1': 1, '0': 0, '8': 8, e: Math.E, 'e^2': Math.E ** 2 }
    const near = (fn: (x: number) => number, a: number) => fn(a + 1e-6)
    const checks: Array<[string, number]> = [
        ['2', near((x) => Math.log(1 + 2 * x) / x, 0)],
        ['3', near((x) => (Math.exp(3 * x) - 1) / x, 0)],
        ['\\frac{1}{2}', (Math.exp(1e-4) - 1 - 1e-4) / 1e-8],
        ['1', near((x) => Math.log(x) / (x - 1), 1)],
        ['0', near((x) => x * Math.log(x), 0)],
        ['8', near((x) => (x * x - 16) / (x - 4), 4)],
        ['e', (1 + 1e-7) ** 1e7],
        ['e^2', (1 + 2e-7) ** 1e7]
    ]
    for (const [answer, value] of checks) assert.ok(Math.abs(limits[answer] - value) < 1e-3, `${answer}: ${value}`)
})
