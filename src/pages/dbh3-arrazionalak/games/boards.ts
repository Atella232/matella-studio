import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { PairCard } from '../../../features/unit-v2/games/pairsMemory.ts'
import { fraction, gcd, toExactDecimal, toLatex } from '../../../features/unit-v2/math/fraction.ts'
import { createRealsMemoryBoard } from '../../dbh4-aplikatuak-errealak/games/boards.ts'

/* ==========================================================================
   Zenbaki arrazionalak (3. DBH) memory: a fraction and its irreducible
   form, an exact decimal and its fraction, a periodic decimal and its
   fraction (the 4. DBH applied unit's board).
   ========================================================================== */

export const RATIONALS_MEMORY_PAIRS = 6

export const rationalsMemoryLevels = ['simplify', 'exact', 'periodic'] as const

type Pair = [question: string, answer: string, explain: string]

function simplifyPair(random: Random): Pair {
    const denominator = randomInt(random, 2, 9)
    const numerator = randomInt(random, 1, denominator * 2) * (random() < 0.3 ? -1 : 1)
    const factor = randomInt(random, 2, 9)
    if (gcd(Math.abs(numerator), denominator) !== 1) return simplifyPair(random)
    const big = `${numerator < 0 ? '-' : ''}\\frac{${Math.abs(numerator) * factor}}{${denominator * factor}}`
    return [big, toLatex(fraction(numerator, denominator)), `${big}=${numerator < 0 ? '-' : ''}\\frac{${Math.abs(numerator) * factor}:${factor}}{${denominator * factor}:${factor}}=${toLatex(fraction(numerator, denominator))}`]
}

function exactPair(random: Random): Pair {
    const denominator = pick(random, [2, 4, 5, 8, 20, 25, 40])
    const numerator = randomInt(random, 1, denominator * 2)
    const value = fraction(numerator, denominator)
    if (value.denominator === 1) return exactPair(random)
    const decimal = toExactDecimal(value)!.replace(',', '{,}')
    const digits = decimal.split('{,}')[1].length
    const raw = Number(decimal.replace('{,}', ''))
    return [decimal, toLatex(value), `${decimal}=\\frac{${raw}}{${10 ** digits}}=${toLatex(value)}`]
}

const makers = { simplify: simplifyPair, exact: exactPair }

/** Six pairs with different answers (and different questions), so every card has exactly one partner */
export function createRationalsMemoryBoard(random: Random, levelIndex: number): PairCard[] {
    const level = rationalsMemoryLevels[levelIndex]
    if (level === 'periodic') return createRealsMemoryBoard(random, 0)
    const make = makers[level]
    const pairs: Pair[] = []
    for (let attempt = 0; pairs.length < RATIONALS_MEMORY_PAIRS && attempt < 500; attempt += 1) {
        const pair = make(random)
        if (pairs.some(([question, answer]) => answer === pair[1] || question === pair[0])) continue
        pairs.push(pair)
    }
    return shuffle(random, pairs.flatMap(([question, answer, explain], setId) => [
        { id: `${setId}-q`, setId, latex: question, shows: answer, explain },
        { id: `${setId}-a`, setId, latex: answer, shows: answer, explain }
    ]))
}
