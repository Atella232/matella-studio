import type { PairCard } from '../../../features/unit-v2/games/pairsMemory.ts'
import { pick, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'

/* ==========================================================================
   Proportzionaltasuna eta ehunekoak (2. DBH) memory: a percentage and its
   decimal, a change and its index, and two chained indices and the total
   index. Every card has exactly one partner.
   ========================================================================== */

export const PROPORTION_DBH2_MEMORY_PAIRS = 6

export const proportionDbh2MemoryLevels = ['decimal', 'index', 'chained'] as const

interface Pair {
    question: string
    answer: string
    /** The shared value in hundredths (or ten-thousandths), to tell pairs apart */
    key: number
}

/** A number of hundredths as a decimal in LaTeX: 35 → 0{,}35, 120 → 1{,}2 */
const hundredths = (value: number) => (value / 100).toString().replace('.', '{,}')

const decimalPair = (random: Random): Pair => {
    const percent = pick(random, [2.5, 5, 8, 12, 35, 50, 75, 99, 120, 150, 200, 1])
    return { question: `${String(percent).replace('.', '{,}')}\\,\\%`, answer: hundredths(percent), key: percent }
}

const indexPair = (random: Random): Pair => {
    const change = pick(random, [-50, -40, -25, -20, -15, -5, 5, 12, 15, 20, 30, 100])
    return { question: `${change > 0 ? '+' : '-'}${Math.abs(change)}\\,\\%`, answer: `\\cdot ${hundredths(100 + change)}`, key: change }
}

const chainedPair = (random: Random): Pair => {
    const first = pick(random, [110, 120, 125, 150, 90, 80, 75, 50])
    const second = pick(random, [110, 120, 80, 90, 50])
    const total = (first * second) / 100
    return { question: `${hundredths(first)}\\cdot ${hundredths(second)}`, answer: hundredths(total), key: total }
}

const makers = { decimal: decimalPair, index: indexPair, chained: chainedPair }

/** Six pairs with different values, so every card has exactly one partner */
export function createProportionDbh2MemoryBoard(random: Random, levelIndex: number): PairCard[] {
    const make = makers[proportionDbh2MemoryLevels[levelIndex]]
    const pairs: Pair[] = []
    for (let attempt = 0; pairs.length < PROPORTION_DBH2_MEMORY_PAIRS && attempt < 500; attempt += 1) {
        const pair = make(random)
        if (pairs.some((other) => other.key === pair.key || other.question === pair.question)) continue
        pairs.push(pair)
    }
    return shuffle(random, pairs.flatMap((pair, setId) => [
        { id: `${setId}-q`, setId, latex: pair.question, shows: pair.answer, explain: `${pair.question}\\ \\to\\ ${pair.answer}` },
        { id: `${setId}-a`, setId, latex: pair.answer, shows: pair.answer, explain: `${pair.question}\\ \\to\\ ${pair.answer}` }
    ]))
}
