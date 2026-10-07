import type { PairCard } from '../../../features/unit-v2/games/pairsMemory.ts'
import { randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import { createAlgebraMemoryBoard } from '../../dbh2-aljebra-v2/games/boards.ts'
import { binomialLatex, evaluate, polynomialLatex } from '../lab/labTools.ts'

/* ==========================================================================
   Polinomioak (4. DBH aplikatuak) memory: a notable product and its
   expansion, a polynomial and its common factor (both from 2. DBH), and a
   division by (x − a) and its remainder. Every card has exactly one
   partner.
   ========================================================================== */

export const POLYNOMIALS_MEMORY_PAIRS = 6

export const polynomialsMemoryLevels = ['products', 'factor', 'remainder'] as const

const signed = (random: Random, min: number, max: number) => randomInt(random, min, max) * (random() < 0.5 ? -1 : 1)

/** A division of a quadratic by (x − a) and its remainder, all six remainders different */
function remainderBoard(random: Random): PairCard[] {
    const pairs: Array<{ question: string; remainder: number }> = []
    for (let attempt = 0; pairs.length < POLYNOMIALS_MEMORY_PAIRS && attempt < 500; attempt += 1) {
        const coefficients = [1, signed(random, 1, 5), signed(random, 1, 9)]
        const a = signed(random, 1, 3)
        const remainder = evaluate(coefficients, a)
        const question = `(${polynomialLatex(coefficients)})\\mathbin{:}(${binomialLatex(a)})`
        if (pairs.some((pair) => pair.remainder === remainder || pair.question === question)) continue
        pairs.push({ question, remainder })
    }
    return shuffle(random, pairs.flatMap((pair, setId) => [
        { id: `${setId}-q`, setId, latex: pair.question, shows: `R=${pair.remainder}` },
        { id: `${setId}-a`, setId, latex: `R=${pair.remainder}`, shows: `R=${pair.remainder}` }
    ]))
}

/** Six pairs; the first two levels are the 2. DBH products and common factor boards */
export function createPolynomialsMemoryBoard(random: Random, levelIndex: number): PairCard[] {
    const level = polynomialsMemoryLevels[levelIndex] ?? 'products'
    if (level === 'remainder') return remainderBoard(random)
    return createAlgebraMemoryBoard(random, level === 'products' ? 1 : 2)
}
