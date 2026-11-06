import type { PairCard } from '../../../features/unit-v2/games/pairsMemory.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'

/* ==========================================================================
   Estatistika bidimentsionala (Batxilergoa 1 · Zientziak) memory: the
   product (x − x̄)(y − ȳ) with its numbers and its value, σxy over σx·σy
   and its r, and the product of the two slopes with |r|. Every card has exactly one
   partner, and each one stays short enough for a phone card.
   ========================================================================== */

export const BIVAR_MEMORY_PAIRS = 6

export const bivarMemoryLevels = ['product', 'r', 'lines'] as const

interface Pair {
    question: string
    answer: string
}

const tex = (value: number) => String(Math.round(value * 1000) / 1000).replace('.', '{,}')

/** (x − x̄)(y − ȳ) with its numbers, and its value */
function productPair(random: Random): Pair | null {
    const mx = randomInt(random, 2, 6)
    const my = randomInt(random, 2, 6)
    const x = randomInt(random, 0, 9)
    const y = randomInt(random, 0, 9)
    if (x === mx || y === my) return null
    // {-}: a minus without the spaces of a subtraction, so the card is narrow enough
    return { question: `(${x}{-}${mx})(${y}{-}${my})`, answer: String((x - mx) * (y - my)) }
}

/** σxy / (σx·σy) and r */
function rPair(random: Random): Pair | null {
    const sx = pick(random, [1, 2, 3, 4])
    const sy = pick(random, [2, 3, 5])
    const r = pick(random, [0.5, 0.6, 0.75, 0.8, 0.9, -0.5, -0.6, -0.8, -0.9, 0.4])
    const cxy = r * sx * sy
    if (Math.abs(cxy * 100 - Math.round(cxy * 100)) > 1e-9) return null
    return { question: `\\frac{${tex(cxy)}}{${sx}\\cdot ${sy}}`, answer: `r=${tex(r)}` }
}

/** The product of the two slopes and |r|: short enough for a phone card */
function linesPair(random: Random): Pair | null {
    const [a, c] = pick(random, [[0.8, 0.45], [0.9, 0.4], [1.6, 0.4], [2, 0.32], [0.5, 0.5], [1.2, 0.3], [0.5, 0.98], [1.8, 0.45], [2.5, 0.1], [0.4, 0.4], [3, 0.12], [0.7, 0.7]] as Array<[number, number]>)
    return { question: `${tex(a)}\\cdot ${tex(c)}`, answer: `|r|=${tex(Math.sqrt(a * c))}` }
}

/** Six pairs with different answers, so every card has exactly one partner */
export function createBivarMemoryBoard(random: Random, levelIndex: number): PairCard[] {
    const level = bivarMemoryLevels[levelIndex] ?? 'product'
    const pairs: Pair[] = []
    for (let attempt = 0; pairs.length < BIVAR_MEMORY_PAIRS && attempt < 3000; attempt += 1) {
        const pair = level === 'product' ? productPair(random) : level === 'r' ? rPair(random) : linesPair(random)
        if (!pair || pairs.some((other) => other.question === pair.question || other.answer === pair.answer)) continue
        pairs.push(pair)
    }
    return shuffle(random, pairs.flatMap((pair, setId) => [
        { id: `${setId}-q`, setId, latex: pair.question, shows: pair.answer, explain: `${pair.question}\\ \\Rightarrow\\ ${pair.answer}` },
        { id: `${setId}-a`, setId, latex: pair.answer, shows: pair.answer, explain: `${pair.question}\\ \\Rightarrow\\ ${pair.answer}` }
    ]))
}
