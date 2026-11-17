import type { PairCard } from '../../../features/unit-v2/games/pairsMemory.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'

/* ==========================================================================
   Laginketa (Batxilergoa 2 · Gizarte Zientziak) memory: a list and a
   sample with their step h = N/n; σ and n with the deviation of the
   means σ/√n; p and n with the deviation of the proportions √(pq/n).
   Every card has exactly one partner, and each one stays short enough for
   a phone card.
   ========================================================================== */

export const SAMPLING_BATX2G_MEMORY_PAIRS = 6

export const samplingBatx2gMemoryLevels = ['step', 'means', 'proportions'] as const

interface Pair {
    question: string
    answer: string
}

const dec = (value: number) => String(Math.round(value * 1e6) / 1e6).replace('.', '{,}')
/** Two rows stacked, with no brace, so the card is narrow enough */
const stacked = (top: string, bottom: string) => `\\begin{array}{c}${top}\\\\ ${bottom}\\end{array}`

function stepPair(random: Random): Pair {
    const n = pick(random, [10, 20, 25, 40, 50])
    const h = randomInt(random, 4, 40)
    return { question: stacked(`N=${n * h}`, `n=${n}`), answer: `h=${h}` }
}

function meansPair(random: Random): Pair {
    const root = randomInt(random, 2, 10)
    const sd = root * randomInt(random, 1, 6)
    return { question: stacked(`\\sigma=${sd}`, `n=${root * root}`), answer: `\\sigma_{\\bar{X}}=${sd / root}` }
}

function proportionsPair(random: Random): Pair {
    const [p, n] = pick(random, [[0.5, 100], [0.5, 400], [0.5, 625], [0.5, 2500], [0.2, 100], [0.2, 400], [0.2, 1600], [0.1, 900], [0.1, 100], [0.4, 600], [0.9, 400]] as const)
    return { question: stacked(`p=${dec(p)}`, `n=${n}`), answer: `\\sigma_{\\hat{p}}=${dec(Math.sqrt((p * (1 - p)) / n))}` }
}

/** Six pairs with different answers, so every card has exactly one partner */
export function createSamplingBatx2gMemoryBoard(random: Random, levelIndex: number): PairCard[] {
    const level = samplingBatx2gMemoryLevels[levelIndex] ?? 'step'
    const pairs: Pair[] = []
    for (let attempt = 0; pairs.length < SAMPLING_BATX2G_MEMORY_PAIRS && attempt < 3000; attempt += 1) {
        const pair = level === 'step' ? stepPair(random) : level === 'means' ? meansPair(random) : proportionsPair(random)
        if (pairs.some((other) => other.question === pair.question || other.answer === pair.answer)) continue
        pairs.push(pair)
    }
    return shuffle(random, pairs.flatMap((pair, setId) => [
        { id: `${setId}-q`, setId, latex: pair.question, shows: pair.answer, explain: `${pair.question}\\ \\Rightarrow\\ ${pair.answer}` },
        { id: `${setId}-a`, setId, latex: pair.answer, shows: pair.answer, explain: `${pair.question}\\ \\Rightarrow\\ ${pair.answer}` }
    ]))
}
