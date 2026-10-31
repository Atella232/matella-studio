import type { PairCard } from '../../../features/unit-v2/games/pairsMemory.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'

/* ==========================================================================
   Polinomioak (3. DBH) memory: a product of monomials and its result, the
   square of a binomial and its expansion, and a polynomial and its
   factorisation. Every card has exactly one partner, and the text stays
   short enough for a card on a phone.
   ========================================================================== */

export const POLYNOMIALS3_MEMORY_PAIRS = 6

interface MemoryPair {
    question: string
    answer: string
}

const letter = (power: number) => (power === 1 ? 'x' : `x^{${power}}`)

function monomialPair(random: Random): MemoryPair {
    const a = randomInt(random, 2, 6)
    const b = randomInt(random, 2, 5)
    const m = randomInt(random, 1, 3)
    const n = randomInt(random, 1, 3)
    return { question: `${a}${letter(m)}\\cdot ${b}${letter(n)}`, answer: `${a * b}${letter(m + n)}` }
}

function squarePair(random: Random): MemoryPair {
    const a = randomInt(random, 1, 9)
    return random() < 0.5
        ? { question: `(x+${a})^{2}`, answer: `x^{2}+${2 * a}x+${a * a}` }
        : { question: `(x-${a})^{2}`, answer: `x^{2}-${2 * a}x+${a * a}` }
}

function factorPair(random: Random): MemoryPair {
    const a = randomInt(random, 2, 9)
    return pick(random, [
        { question: `x^{2}-${a * a}`, answer: `(x+${a})(x-${a})` },
        { question: `x^{2}+${2 * a}x+${a * a}`, answer: `(x+${a})^{2}` },
        { question: `${a}x^{2}+${a}x`, answer: `${a}x(x+1)` }
    ])
}

const generators = [monomialPair, squarePair, factorPair]

/** Six pairs with different answers, so every card has exactly one partner */
export function createPolynomials3MemoryBoard(random: Random, levelIndex: number): PairCard[] {
    const make = generators[levelIndex] ?? generators[0]
    const pairs: MemoryPair[] = []
    for (let attempt = 0; pairs.length < POLYNOMIALS3_MEMORY_PAIRS && attempt < 3000; attempt += 1) {
        const pair = make(random)
        if (pairs.some((other) => other.answer === pair.answer || other.question === pair.question)) continue
        pairs.push(pair)
    }
    return shuffle(random, pairs.flatMap((pair, setId) => [
        { id: `${setId}-q`, setId, latex: pair.question, shows: pair.answer, explain: `${pair.question}=${pair.answer}` },
        { id: `${setId}-a`, setId, latex: pair.answer, shows: pair.answer, explain: `${pair.question}=${pair.answer}` }
    ]))
}
