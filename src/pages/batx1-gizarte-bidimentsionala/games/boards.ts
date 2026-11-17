import type { PairCard } from '../../../features/unit-v2/games/pairsMemory.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'

/* ==========================================================================
   Estatistika bidimentsionala (Batxilergoa 1 · Gizarte Zientziak) memory:
   σxy, σx and σy with their r; a line of Y on X and an x with the estimate
   ŷ; and the two lines solved for y (their slopes) with r². Every card has
   exactly one partner, and each one stays short enough for a phone card.
   ========================================================================== */

export const SOCIAL_BIVAR_MEMORY_PAIRS = 6

export const socialBivarMemoryLevels = ['r', 'estimate', 'lines'] as const

interface Pair {
    question: string
    answer: string
}

const tex = (value: number) => String(Math.round(value * 1000) / 1000).replace('.', '{,}')
const short = (value: number) => Math.abs(Math.round(value * 100) - value * 100) < 1e-9
/** Two rows stacked, with no brace, so the card is narrow enough */
const stacked = (top: string, bottom: string) => `\\begin{array}{c}${top}\\\\ ${bottom}\\end{array}`

/** σxy and σx·σy, and r */
function rPair(random: Random): Pair | null {
    const sx = pick(random, [2, 3, 4, 5])
    const sy = pick(random, [2, 4, 5, 10])
    const r = pick(random, [0.2, 0.25, 0.4, 0.5, 0.6, 0.75, 0.8, 0.9])
    const cov = r * sx * sy
    if (!short(cov)) return null
    return { question: `\\frac{${tex(cov)}}{${sx}\\cdot ${sy}}`, answer: `r=${tex(r)}` }
}

/** A line and an x, and the estimate */
function estimatePair(random: Random): Pair | null {
    const slope = pick(random, [0.5, 2, 3, 1.5])
    const intercept = randomInt(random, 1, 9)
    const x = randomInt(random, 2, 10)
    const y = slope * x + intercept
    if (!short(y)) return null
    return { question: stacked(`y=${tex(slope)}x+${intercept}`, `x=${x}`), answer: `\\hat{y}=${tex(y)}` }
}

/** The slopes of the two lines solved for y, and r² */
function linesPair(random: Random): Pair | null {
    const small = pick(random, [0.3, 0.4, 0.5, 0.6, 0.8, 0.9])
    const large = pick(random, [1.2, 1.5, 2, 2.5, 3])
    const square = small / large
    if (!short(square)) return null
    return { question: stacked(`m=${tex(small)}`, `m'=${tex(large)}`), answer: `r^2=${tex(square)}` }
}

/** Six pairs with different answers, so every card has exactly one partner */
export function createSocialBivarMemoryBoard(random: Random, levelIndex: number): PairCard[] {
    const level = socialBivarMemoryLevels[levelIndex] ?? 'r'
    const pairs: Pair[] = []
    for (let attempt = 0; pairs.length < SOCIAL_BIVAR_MEMORY_PAIRS && attempt < 3000; attempt += 1) {
        const pair = level === 'r' ? rPair(random) : level === 'estimate' ? estimatePair(random) : linesPair(random)
        if (!pair || pairs.some((other) => other.question === pair.question || other.answer === pair.answer)) continue
        pairs.push(pair)
    }
    return shuffle(random, pairs.flatMap((pair, setId) => [
        { id: `${setId}-q`, setId, latex: pair.question, shows: pair.answer, explain: `${pair.question}\\ \\Rightarrow\\ ${pair.answer}` },
        { id: `${setId}-a`, setId, latex: pair.answer, shows: pair.answer, explain: `${pair.question}\\ \\Rightarrow\\ ${pair.answer}` }
    ]))
}
