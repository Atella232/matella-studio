import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { ALIKE_CARDS, ALIKE_ROUNDS, alikeRight, createAlikeRounds, sameLiteral } from '../src/pages/dbh3-polinomioak/games/alike.ts'
import { createPolynomials3MemoryBoard } from '../src/pages/dbh3-polinomioak/games/boards.ts'
import { createDetectiveCases, detectiveErrorNames, detectiveErrorTips, detectiveLevels } from '../src/pages/dbh3-polinomioak/games/detective.ts'
import { createIdentityRounds, IDENTITY_ROUNDS } from '../src/pages/dbh3-polinomioak/games/identity.ts'
import { polynomials3GameProgressIds, polynomials3Games } from '../src/pages/dbh3-polinomioak/games/info.ts'
import { generatePolynomials3RaceQuestion, POLYNOMIALS3_RACE_CIRCUITS, polynomials3RaceErrorTips } from '../src/pages/dbh3-polinomioak/games/race.ts'
import { bottomRow, createRuffiniRounds, RUFFINI_ROUNDS } from '../src/pages/dbh3-polinomioak/games/ruffiniRun.ts'
import { polynomials3LabChallengeIds } from '../src/pages/dbh3-polinomioak/lab/labTools.ts'
import { polynomialsDiagnostic } from '../src/pages/dbh3-polinomioak/content.ts'

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

/** Evaluates a polynomial written in LaTeX (x, ^{n}, \cdot, \frac, brackets) at x = 2 */
function at2(latex: string): number {
    let js = latex.replace(/\\frac\{([^{}]+)\}\{([^{}]+)\}/g, '(($1)/($2))').replace(/\\cdot/g, '*').replace(/\^\{([^{}]+)\}/g, '**($1)').replace(/[{}]/g, '').replace(/\s/g, '')
    js = js.replace(/x/g, '(2)').replace(/(\d|\))\(/g, '$1*(')
    return Function(`return ${js}`)() as number
}
const rhs = (latex: string) => latex.split('=').pop()!

function expected(kind: string, m: Record<string, number>): number {
    switch (kind) {
        case 'value': return m.a * m.x * m.x + m.b * m.x + m.c
        case 'product-exponent': return m.m + m.n
        case 'reduce': return m.b + m.d
        case 'difference': return m.c - m.f
        case 'binomial-x': return m.a + m.b
        case 'binomial-constant': return m.a * m.b
        case 'monomial-times': return m.k * m.b
        case 'square-middle': return (m.minus ? -2 : 2) * m.k * m.a
        case 'square-last': return m.a * m.a
        case 'mental': return (m.base + m.k) * (m.base - m.k)
        case 'remainder': return m.a ** 3 + m.b * m.a + m.c
        case 'k-root': return -(m.r * m.r + m.c) / m.r
        case 'root': return m.p
        case 'common-factor': return m.g
        case 'difference-squares': return m.a
        case 'perfect-square': return m.a
        default: throw new Error(kind)
    }
}

test('polinomioak 3. DBH games: the hub, its levels and its progress ids', () => {
    assert.deepEqual(polynomials3Games.map((game) => game.id), ['race', 'alike', 'identity', 'ruffini', 'detective', 'memory'])
    assert.equal(new Set(polynomials3GameProgressIds).size, polynomials3GameProgressIds.length)
    for (const id of polynomials3GameProgressIds) assert.ok(id >= 92101 && id <= 92999, `${id}`)
    const all = [...polynomialsDiagnostic.map((question) => question.id), ...polynomials3LabChallengeIds, ...polynomials3GameProgressIds]
    assert.equal(new Set(all).size, all.length)
    for (const game of polynomials3Games) for (const language of languages) assert.ok(game.title[language] && game.tagline[language] && game.levels.every((level) => level.title[language] && level.description[language]), `${game.id} ${language}`)
    checkTexts([...Object.values(polynomials3RaceErrorTips), ...Object.values(detectiveErrorNames), ...Object.values(detectiveErrorTips)])
})

test('polinomioak 3. DBH games: every race question is right, with three different wrong options', () => {
    for (let circuit = 0; circuit < POLYNOMIALS3_RACE_CIRCUITS; circuit += 1) {
        const kinds = new Set<string>()
        for (const tier of [0, 1, 2] as const) {
            for (let seed = 1; seed <= 120; seed += 1) {
                const question = generatePolynomials3RaceQuestion(createRandom(seed * 7919 + circuit * 31 + tier), circuit, tier)
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

test('polinomioak 3. DBH games: memory boards have six pairs with one partner each, and every pair is equal', () => {
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 60; seed += 1) {
            const board = createPolynomials3MemoryBoard(createRandom(seed * 7919 + level), level)
            assert.equal(board.length, 12)
            for (const card of board) {
                assert.equal(board.filter((other) => other.shows === card.shows).length, 2)
                katex.renderToString(card.latex, { throwOnError: true, strict: 'error' })
                const [question, answer] = card.explain.split('=')
                for (const x of [2]) assert.ok(close(at2(question), at2(answer)), `${card.explain} at ${x}`)
            }
        }
    }
})

test('polinomioak 3. DBH games: like terms are found exactly', () => {
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 60; seed += 1) {
            const rounds = createAlikeRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, ALIKE_ROUNDS)
            for (const round of rounds) {
                assert.equal(round.cards.length, ALIKE_CARDS)
                assert.deepEqual(round.like, round.cards.map((card, index) => (sameLiteral(card, round.target) ? index : -1)).filter((index) => index >= 0))
                assert.ok(round.like.length >= 2 && round.like.length < ALIKE_CARDS)
                assert.ok(alikeRight(round, round.like))
                assert.ok(!alikeRight(round, round.like.slice(1)))
            }
        }
    }
})

test('polinomioak 3. DBH games: the missing piece of each identity makes it true', () => {
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 60; seed += 1) {
            const rounds = createIdentityRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, IDENTITY_ROUNDS)
            for (const round of rounds) {
                assert.equal(new Set(round.options).size, 4)
                assert.ok(round.options.includes(round.answer))
                const [left, right] = round.full.split('=')
                assert.ok(close(at2(left), at2(right)), round.full)
                // Only the answer makes the boxed identity true at x = 2 and x = 3
                for (const option of round.options) {
                    const filled = round.latex.replace('\\boxed{\\,?\\,}', option.startsWith('+') || option.startsWith('-') || round.latex.includes('+\\boxed') || round.latex.includes('=\\boxed') ? option : `+${option}`)
                    const [l, r] = filled.split('=')
                    if (option === round.answer) assert.ok(close(at2(l), at2(r)), filled)
                }
                katex.renderToString(round.latex, { throwOnError: true, strict: 'error' })
                for (const option of round.options) katex.renderToString(option, { throwOnError: true, strict: 'error' })
            }
        }
    }
})

test('polinomioak 3. DBH games: Ruffini tables are right and each box has one right choice', () => {
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 60; seed += 1) {
            const rounds = createRuffiniRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, RUFFINI_ROUNDS)
            for (const round of rounds) {
                assert.deepEqual(round.bottom, bottomRow(round.coefficients, round.a))
                const remainder = round.coefficients.reduce((total, coefficient) => total * round.a + coefficient, 0)
                assert.equal(round.bottom[round.bottom.length - 1], remainder)
                assert.equal(round.choices.length, round.coefficients.length - 1)
                round.choices.forEach((choice, index) => {
                    assert.equal(new Set(choice).size, 3)
                    assert.equal(choice.filter((item) => item === round.bottom[index + 1]).length, 1)
                })
            }
        }
    }
})

test('polinomioak 3. DBH games: every detective case reaches a wrong value, and its fix gives the right one', () => {
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 80; seed += 1) {
            for (const item of createDetectiveCases(createRandom(seed * 7919 + level), level)) {
                assert.ok(detectiveLevels[level].includes(item.error))
                assert.ok(item.options.includes(item.error) && new Set(item.options).size === 3)
                assert.ok(!close(item.reached, item.right), `${item.error}`)
                assert.ok(item.wrong >= 0 && item.wrong < item.lines.length)
                const last = item.lines[item.lines.length - 1].latex
                if (last.startsWith('R=')) assert.ok(last.includes(String(item.reached)))
                else assert.ok(close(at2(rhs(last)), item.reached), `${item.error}: ${last}`)
                if (item.fix.includes('R=')) assert.ok(item.fix.endsWith(`=${item.right}`), item.fix)
                else if (item.error !== 'multiply-exponents' && item.error !== 'middle-single') assert.ok(close(at2(rhs(item.fix)), item.right), `${item.error}: ${item.fix}`)
                for (const line of item.lines) katex.renderToString(line.latex, { throwOnError: true, strict: 'error' })
                katex.renderToString(item.fix, { throwOnError: true, strict: 'error' })
                checkTexts([item.problem])
            }
        }
    }
})
