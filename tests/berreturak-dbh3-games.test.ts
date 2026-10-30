import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { powersDiagnostic } from '../src/pages/dbh3-berreturak/content.ts'
import { powersLabChallengeIds } from '../src/pages/dbh3-berreturak/lab/labTools.ts'
import { checkAnswer, toNumber } from '../src/features/unit-v2/math/fraction.ts'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import type { Tier } from '../src/features/unit-v2/games/raceCore.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { createPowersMemoryBoard, POWERS_MEMORY_PAIRS, powersMemoryLevels } from '../src/pages/dbh3-berreturak/games/boards.ts'
import { createDetectiveCases, DETECTIVE_CASES, detectiveErrorNames, detectiveErrorTips, detectiveLevels, detectiveStars, type DetectiveCase } from '../src/pages/dbh3-berreturak/games/detective.ts'
import { createExtractRounds, EXTRACT_ROUNDS, extractDone, extractPoints, extractSoFar, extractStars, hasPair, primeFactors, simplifySquareRoot, startExtract, tapPair } from '../src/pages/dbh3-berreturak/games/extract.ts'
import { createGuardItems, GUARD_ITEMS, guardPool, guardStars, guardWhy } from '../src/pages/dbh3-berreturak/games/guard.ts'
import { POWERS_GAME_RECORDS_KEY, powersGameModeForPath, powersGameProgressIds, powersGames, powersGameSlugs } from '../src/pages/dbh3-berreturak/games/info.ts'
import { createOrderRounds, nextCard, ORDER_CARDS, ORDER_ROUNDS, orderPoints, orderSolution, orderStars } from '../src/pages/dbh3-berreturak/games/order.ts'
import { checkPowersPitAnswer, generatePowersRaceQuestion, POWERS_RACE_CIRCUITS, powersParTime, powersRaceErrorTips, written, type PowersRaceQuestion } from '../src/pages/dbh3-berreturak/games/race.ts'

const languages = ['eu', 'es', 'en', 'ar'] as const

/** Plain arithmetic in LaTeX: powers, fractions, roots, products, divisions and decimal commas */
function evaluate(latex: string): number | null {
    let js = latex
        .replace(/\\,|\\ /g, '')
        .replace(/\\left|\\right/g, '')
        .replace(/(\d)\{,\}(\d)/g, '$1.$2')
        .replace(/\\cdot/g, '*')
        .replace(/:/g, '/')
        .replace(/\s+/g, '')
    for (let pass = 0; pass < 4; pass += 1) {
        js = js
            .replace(/\\frac\{([^{}]+)\}\{([^{}]+)\}/g, '(($1)/($2))')
            .replace(/\\sqrt\{([^{}]+)\}/g, 'Math.sqrt($1)')
            .replace(/(\((?:[^()]|\([^()]*\))+\)|\d+(?:\.\d+)?)\^\{([^{}]+)\}/g, 'Math.pow($1,($2))')
    }
    js = js.replace(/\)\(/g, ')*(').replace(/(\d)\(/g, '$1*(').replace(/(\d)Math/g, '$1*Math').replace(/\)Math/g, ')*Math')
    if (!/^(?:[\d+\-*/().,]|Math\.(?:pow|sqrt))+$/.test(js) || !/\d/.test(js)) return null
    try {
        return Function('Math', `return ${js}`)(Math) as number
    } catch {
        return null
    }
}

const close = (a: number, b: number) => Math.abs(a - b) <= 1e-9 * Math.max(1, Math.abs(a), Math.abs(b))
const renders = (latex: string) => katex.renderToString(latex, { throwOnError: true, strict: 'error' })

function checkTexts(texts: LocalizedText[]) {
    for (const text of texts) {
        for (const language of languages) {
            assert.ok(text[language].length > 0)
            for (const [, formula] of text[language].matchAll(/\$([^$]+)\$/g)) renders(formula)
        }
        assert.ok(!text.ar.includes('{,}'), text.ar)
        assert.ok(!/[؀-ۿ]/.test([...text.ar.matchAll(/\$([^$]+)\$/g)].map((match) => match[1]).join('')), text.ar)
        assert.ok(!/\d(?:ri|ren|rekin|ekin|ek|ak|ra|tik|z|ei|en|k)(?![a-zA-Z])/.test(text.eu.replace(/\$[^$]+\$/g, '')), text.eu)
        assert.ok(!/\$(?:ri|ren|rekin|z|ra|tik|ei)(?![a-zA-Z])/.test(text.eu), text.eu)
    }
}

test('berreturak 3. DBH games: the hub, the levels, the ids and the addresses', () => {
    assert.deepEqual(powersGames.map((game) => game.id), ['race', 'order', 'extract', 'guard', 'detective', 'memory'])
    assert.equal(new Set(powersGameProgressIds).size, powersGameProgressIds.length)
    assert.equal(powersGameProgressIds.length, 5 + 3 * 5)
    assert.equal(powersGames.find((game) => game.id === 'race')!.levels.length, POWERS_RACE_CIRCUITS)
    for (const game of powersGames) {
        checkTexts([game.title, game.tagline, game.skills, ...game.levels.flatMap((level) => [level.title, level.description])])
        assert.ok(game.levels.every((level) => level.progressId > 37000 && level.progressId < 38000))
    }
    assert.ok(POWERS_GAME_RECORDS_KEY.includes('berreturak'))
    for (const [id, slug] of Object.entries(powersGameSlugs)) assert.equal(powersGameModeForPath(`/matematika/dbh3/potencias-raices/jokuak/${slug}`), id)
    assert.equal(powersGameModeForPath('/matematika/dbh3/potencias-raices/juegos/carrera'), 'race')
    assert.equal(powersGameModeForPath('/matematika/dbh3/potencias-raices/juegos/guardian'), 'guard')
    assert.equal(powersGameModeForPath('/matematika/dbh3/potencias-raices/jokuak'), 'hub')
})

/** Recomputes the answer of a race question from its meta */
function recomputed(question: PowersRaceQuestion): number | null {
    const m = question.meta
    switch (question.kind) {
        case 'sign-power': return m.bracketed ? (-m.a) ** m.n : -(m.a ** m.n)
        case 'negative-power': return 1 / m.base ** m.k
        case 'fraction-power': return (m.b / m.a) ** m.k
        case 'rules': return m.base ** (m.m + m.n - m.p)
        case 'sci-product': return m.p + m.q + 1
        case 'sci-quotient': return m.p - m.q
        case 'ratio': return 10 ** (m.p - m.q)
        case 'exact-root': return m.k
        case 'outside': return m.s
        case 'inside': return m.s * m.s * m.k
        case 'like': return m.p + m.q - m.r
        case 'product-roots': return Math.sqrt(m.a * m.b)
        case 'irrational-count': return m.count
        case 'between': return Math.floor(Math.sqrt(m.radicand))
        case 'interval-count': {
            let count = 0
            for (let x = m.a; x <= m.b; x += 1) if ((x > m.a || m.closedA === 1) && (x < m.b || m.closedB === 1)) count += 1
            return count
        }
        case 'interval-length': return m.b - m.a
        case 'round': return Math.round(m.value / 10 ** (4 - m.places) + 1e-9) / 10 ** m.places
        case 'truncate': return Math.floor(m.value / 10 ** (4 - m.places) + 1e-9) / 10 ** m.places
        case 'absolute-error': return Math.abs(m.exactCents - m.approxTenths * 10) / 100
        case 'relative-error': return m.error / m.exact
        case 'sci-exponent': return m.exponent
        default: return null
    }
}

test('berreturak 3. DBH race: five circuits of well-formed questions', () => {
    const kinds = new Set<string>()
    for (let circuit = 0; circuit < POWERS_RACE_CIRCUITS; circuit += 1) {
        for (const tier of [0, 1, 2] as Tier[]) {
            for (let seed = 1; seed <= 120; seed += 1) {
                const question = generatePowersRaceQuestion(createRandom(seed * 7919 + circuit * 31 + tier), circuit, tier)
                const where = `${circuit}/${tier}/${seed} ${question.kind}`
                kinds.add(question.kind)
                assert.equal(question.circuit, circuit)
                assert.equal(question.options.length, 4, where)
                assert.equal(question.options.filter((option) => option.correct).length, 1, where)
                assert.equal(new Set(question.options.map((option) => option.latex)).size, 4, where)
                const right = question.options.find((option) => option.correct)!
                assert.equal(right.latex, written(question.answer), where)
                for (const option of question.options) {
                    renders(option.latex)
                    assert.equal(option.correct, option.error === null, where)
                    if (option.error) assert.ok(powersRaceErrorTips[option.error], where)
                }
                assert.equal(checkPowersPitAnswer(question, question.answer.denominator === 1 ? String(question.answer.numerator) : `${question.answer.numerator}/${question.answer.denominator}`), 'correct', where)
                const again = recomputed(question)
                if (again !== null) assert.ok(close(again, toNumber(question.answer)), `${where}: ${again} vs ${toNumber(question.answer)}`)
                checkTexts([question.prompt, question.solution])
            }
        }
        assert.ok(powersParTime(circuit) > 100000)
    }
    assert.ok(kinds.size >= 20, `only ${[...kinds].join(',')}`)
    for (const tip of Object.values(powersRaceErrorTips)) checkTexts([tip])
})

test('berreturak 3. DBH race: the numbers shown are the ones the answer is built from', () => {
    // A rounding question about 3,4567 asks for 3,46, never for 3,45
    let rounds = 0
    for (let seed = 1; seed <= 300; seed += 1) {
        const question = generatePowersRaceQuestion(createRandom(seed), 4, 1)
        if (question.kind !== 'round' && question.kind !== 'truncate') continue
        const shown = [...question.prompt.es.matchAll(/\$([^$]+)\$/g)][0][1]
        const value = Number(shown.replace('{,}', '.'))
        const places = question.meta.places
        const factor = 10 ** places
        const expected = question.kind === 'round' ? Math.round(value * factor + 1e-9) / factor : Math.floor(value * factor + 1e-9) / factor
        assert.ok(close(expected, toNumber(question.answer)), `${shown} → ${toNumber(question.answer)}`)
        const wrongOnes = question.options.filter((option) => !option.correct).map((option) => Number(option.latex.replace('{,}', '.')))
        assert.ok(wrongOnes.every((candidate) => !close(candidate, expected)))
        rounds += 1
    }
    assert.ok(rounds > 40)
    assert.equal(written(checkAnswerFraction('0,25')), '0{,}25')
})

function checkAnswerFraction(text: string) {
    const [whole, decimals = ''] = text.split(',')
    return { numerator: Number(whole + decimals), denominator: 10 ** decimals.length }
}

test('berreturak 3. DBH memory: six pairs, each card with one partner, and every pair is true', () => {
    assert.deepEqual([...powersMemoryLevels], ['powers', 'scientific', 'roots'])
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 100; seed += 1) {
            const board = createPowersMemoryBoard(createRandom(seed * 101 + level), level)
            assert.equal(board.length, POWERS_MEMORY_PAIRS * 2)
            const bySet = new Map<number, typeof board>()
            for (const card of board) bySet.set(card.setId, [...(bySet.get(card.setId) ?? []), card])
            assert.equal(bySet.size, POWERS_MEMORY_PAIRS)
            assert.equal(new Set(board.map((card) => card.latex)).size, board.length, `${level}/${seed}`)
            for (const cards of bySet.values()) {
                assert.equal(cards.length, 2)
                const values = cards.map((card) => evaluate(card.latex))
                assert.ok(values.every((value): value is number => value !== null), cards.map((card) => card.latex).join(' | '))
                assert.ok(close(values[0]!, values[1]!), cards.map((card) => card.latex).join(' | '))
                for (const card of cards) renders(card.latex)
            }
        }
    }
})

test('berreturak 3. DBH order: five rounds of five clearly different sizes', () => {
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 200; seed += 1) {
            const rounds = createOrderRounds(createRandom(seed * 13 + level), level)
            assert.equal(rounds.length, ORDER_ROUNDS)
            for (const round of rounds) {
                assert.equal(round.length, ORDER_CARDS)
                const solution = orderSolution(round)
                for (let index = 1; index < solution.length; index += 1) assert.ok(solution[index].log - solution[index - 1].log >= 0.06, `${level}/${seed}`)
                for (const card of round) {
                    renders(card.latex)
                    assert.ok(close(evaluate(card.latex)!, 10 ** card.log) || Math.abs(Math.log10(evaluate(card.latex)!) - card.log) < 1e-9, card.latex)
                    assert.equal(card.label !== null, level === 0)
                }
                if (level === 2) {
                    // The traps: a card not in scientific notation and a shared exponent
                    assert.ok(round.some((card) => /^\d\d\\cdot/.test(card.latex)), round.map((card) => card.latex).join(' '))
                    const exponents = round.map((card) => card.latex.match(/10\^\{(-?\d+)\}/)![1])
                    assert.ok(new Set(exponents).size < ORDER_CARDS, round.map((card) => card.latex).join(' '))
                }
                // Tapping in the right order places every card; the next card is always the smallest left
                const placed: string[] = []
                for (const card of solution) {
                    assert.equal(nextCard(round, placed)?.id, card.id)
                    placed.push(card.id)
                }
                assert.equal(nextCard(round, placed), undefined)
            }
        }
    }
    assert.equal(orderPoints(0), 5)
    assert.equal(orderPoints(9), 0)
    assert.equal(orderStars(25), 3)
    assert.equal(orderStars(15), 2)
    assert.equal(orderStars(8), 0)
})

test('berreturak 3. DBH extract: pairs of primes come out, whatever the order', () => {
    assert.deepEqual(primeFactors(72), [2, 2, 2, 3, 3])
    assert.deepEqual(simplifySquareRoot(72), { outside: 6, inside: 2 })
    assert.deepEqual(simplifySquareRoot(1800), { outside: 30, inside: 2 })
    assert.deepEqual(simplifySquareRoot(13), { outside: 1, inside: 13 })
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 150; seed += 1) {
            const rounds = createExtractRounds(createRandom(seed * 17 + level), level)
            assert.equal(rounds.length, EXTRACT_ROUNDS)
            assert.equal(new Set(rounds.map((round) => round.radicand)).size, EXTRACT_ROUNDS)
            for (const round of rounds) {
                assert.equal(round.tiles.reduce((product, tile) => product * tile.prime, 1), round.radicand)
                assert.deepEqual(round.tiles.map((tile) => tile.id), round.tiles.map((_, index) => index))
                assert.ok(round.tiles.length <= 10 && round.tiles.length >= 3, `${round.radicand}`)
                assert.ok(round.outside >= 2, `${round.radicand} has something to take out`)
                assert.ok(close(round.outside * Math.sqrt(round.inside), Math.sqrt(round.radicand)))
                // Take pairs in a random order: the result is always the same
                const random = createRandom(seed + round.radicand)
                let state = startExtract(round)
                let guard = 0
                while (!extractDone(state) && guard++ < 50) {
                    const pairs = state.tiles.flatMap((tile) => state.tiles.filter((other) => other.id > tile.id && other.prime === tile.prime).map((other) => [tile.id, other.id]))
                    const [a, b] = pairs[Math.floor(random() * pairs.length)]
                    const result = tapPair(state, a, b)
                    assert.ok(result.ok)
                    state = result.state
                }
                assert.ok(!hasPair(state))
                assert.deepEqual(extractSoFar(state), { outside: round.outside, inside: round.inside })
                assert.equal(state.mistakes, 0)
            }
        }
    }
    // Different tiles are a mistake and nothing leaves the root; the same tile twice does nothing
    const round = createExtractRounds(createRandom(5), 0)[0]
    const start = startExtract(round)
    const different = start.tiles.flatMap((tile) => start.tiles.filter((other) => other.prime !== tile.prime).map((other) => [tile.id, other.id]))[0]
    const miss = tapPair(start, different[0], different[1])
    assert.ok(!miss.ok && miss.state.mistakes === 1 && miss.state.tiles.length === start.tiles.length)
    assert.ok(!tapPair(start, 0, 0).ok && tapPair(start, 0, 0).state.mistakes === 0)
    assert.equal(extractPoints(0), 3)
    assert.equal(extractPoints(5), 0)
    assert.equal(extractStars(15), 3)
    assert.equal(extractStars(5), 0)
})

test('berreturak 3. DBH guard: ten different numbers per level, and every one is classified right', () => {
    const isRationalNumber = (x: number) => Array.from({ length: 2000 }, (_, index) => index + 1).some((q) => Math.abs(x * q - Math.round(x * q)) < 1e-9 * q)
    for (let level = 0; level < 3; level += 1) {
        const pool = guardPool(level)
        assert.equal(new Set(pool.map((item) => item.latex)).size, pool.length)
        for (const item of pool) {
            renders(item.latex)
            if (item.equals) renders(item.equals)
            checkTexts([guardWhy(item)])
            const value = evaluate(item.latex)
            if (item.kind === 'whole-result') assert.ok(value !== null && Number.isInteger(Math.round(value * 1e9) / 1e9), item.latex)
            if (item.kind === 'irrational-result' || item.kind === 'root-inexact') assert.ok(value !== null && !isRationalNumber(value), item.latex)
            if (item.kind === 'root-exact' || item.kind === 'exact-decimal') assert.ok(value !== null && isRationalNumber(value), item.latex)
            if (item.kind === 'fraction') assert.ok(value === null || isRationalNumber(value), item.latex)
            assert.equal(item.rational, ['fraction', 'exact-decimal', 'periodic', 'root-exact', 'whole-result'].includes(item.kind), item.latex)
            // What «equals» says is true
            if (item.equals && value !== null) {
                const other = evaluate(item.equals.includes('=') ? item.equals.split('=').pop()! : item.equals)
                if (other !== null) assert.ok(close(value, other), `${item.latex} = ${item.equals}`)
            }
        }
        for (let seed = 1; seed <= 100; seed += 1) {
            const items = createGuardItems(createRandom(seed * 7 + level), level)
            assert.equal(items.length, GUARD_ITEMS)
            assert.equal(new Set(items.map((item) => item.latex)).size, GUARD_ITEMS)
            const rationals = items.filter((item) => item.rational).length
            assert.ok(rationals >= 4 && rationals <= 6, `${level}/${seed}: ${rationals}`)
        }
    }
    assert.equal(guardStars(10), 3)
    assert.equal(guardStars(7), 2)
    assert.equal(guardStars(5), 1)
    assert.equal(guardStars(4), 0)
})

/** An equation «a = b = c» is true when every side with plain arithmetic has the same value */
function equationHolds(latex: string): boolean | null {
    if (/\\to|\\Rightarrow|\\ge|\\le|\\approx|\\ldots|<|>|\||E_|\(\d+\)/.test(latex)) return null
    const sides = latex.split('=').map(evaluate)
    if (sides.length < 2 || sides.some((side) => side === null)) return null
    return sides.every((side) => close(side!, sides[0]!))
}

test('berreturak 3. DBH detective: six cases per level, one wrong line each, and the numbers check', () => {
    const seen = new Set<string>()
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 250; seed += 1) {
            const cases = createDetectiveCases(createRandom(seed * 19 + level), level)
            assert.equal(cases.length, DETECTIVE_CASES)
            for (const item of cases) {
                const where = `${level}/${seed} ${item.error}`
                seen.add(item.error)
                assert.ok(detectiveLevels[level].includes(item.error), where)
                assert.equal(item.lines.length, 3, where)
                assert.ok(item.wrong >= 0 && item.wrong <= 2, where)
                assert.equal(item.options.length, 3, where)
                assert.equal(new Set(item.options).size, 3, where)
                assert.ok(item.options.includes(item.error), where)
                // The same wrong identity read the other way round is never offered as a distractor
                if (item.error === 'add-radicands') assert.ok(!item.options.includes('root-sum'), where)
                if (item.error === 'root-sum') assert.ok(!item.options.includes('add-radicands'), where)
                checkTexts([item.problem])
                for (const current of item.lines) { checkTexts([current.label]); renders(current.latex) }
                renders(item.fix)
                // The lines before the wrong one are right, and so is the fix
                item.lines.slice(0, item.wrong).forEach((current) => { const holds = equationHolds(current.latex); assert.ok(holds !== false, `${where}: ${current.latex}`) })
                const fix = equationHolds(item.fix)
                assert.ok(fix !== false, `${where}: fix ${item.fix}`)
                const wrongLine = equationHolds(item.lines[item.wrong].latex)
                assert.ok(wrongLine !== true, `${where}: the wrong line holds: ${item.lines[item.wrong].latex}`)
                checkSemantics(item)
            }
        }
    }
    assert.equal(seen.size, Object.keys(detectiveErrorNames).length)
    for (const error of Object.keys(detectiveErrorNames) as Array<keyof typeof detectiveErrorNames>) checkTexts([detectiveErrorNames[error], detectiveErrorTips[error]])
    assert.equal(detectiveStars(12), 3)
    assert.equal(detectiveStars(9), 2)
    assert.equal(detectiveStars(5), 0)
})

/** Checks that a case is really the mistake it says it is, from the numbers it was built from */
function checkSemantics(item: DetectiveCase) {
    const m = item.meta
    const last = item.lines[2].latex
    switch (item.error) {
        case 'interval-count': {
            const count = Array.from({ length: m.b - m.a }, (_, index) => m.a + index).length
            assert.ok(item.fix.includes(`=${count}`), item.fix)
            assert.ok(last.endsWith(`=${count + 1}`), last)
            break
        }
        case 'rel-denominator': {
            assert.ok(item.lines[1].latex.includes(`{${m.approx}}`) && item.fix.includes(`{${m.exact}}`))
            assert.ok(Math.abs(m.exact - m.approx) / m.exact <= 0.1, `${m.exact} vs ${m.approx}`)
            assert.notEqual(item.lines[2].latex.split('=').pop(), item.fix.split('=').pop())
            break
        }
        case 'bounds': {
            assert.ok(m.n * m.n < m.radicand && m.radicand < (m.n + 1) ** 2)
            assert.ok(item.fix.startsWith(`${m.n}<`))
            break
        }
        case 'round-trunc': {
            const right = (Number(`${m.first}${m.d1}${m.d2}`) + 1) / 100
            assert.ok(item.fix.endsWith(right.toFixed(2).replace('.', '{,}')), item.fix)
            assert.ok(m.d3 >= 5)
            break
        }
        case 'sci-sign':
            assert.ok(item.fix.includes(`10^{-${m.places}}`) && !item.lines[1].latex.includes('-'))
            break
        case 'no-adjust': {
            const product = m.a * m.b
            assert.ok(product >= 10 && item.lines[2].latex.startsWith(`${product}\\cdot`))
            break
        }
        default:
            break
    }
}

test('berreturak 3. DBH games: nothing is shared by accident (checkAnswer accepts a typed fraction)', () => {
    assert.equal(checkAnswer('9/25', checkAnswerFraction('0,36')), 'correct')
})

test('berreturak 3. DBH: no progress id repeats across the diagnostic, the lab and the games', () => {
    const ids = [...powersDiagnostic.map((question) => question.id), ...powersLabChallengeIds, ...powersGameProgressIds]
    assert.equal(new Set(ids).size, ids.length)
})
