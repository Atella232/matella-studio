import type { PairCard } from '../../../features/unit-v2/games/pairsMemory.ts'
import { randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import { choose } from '../../batx2-zientziak-banaketak/binomial.ts'

/* ==========================================================================
   Diskretuak (Batxilergoa 1 · Gizarte Zientziak) memory: a Galton bin
   (rows and bin, stacked) and its paths C(n, k); a binomial and its mean
   μ = np; and a fit (N data, B(n; 0,5) and a value k, stacked) and its
   expected value. Every card has exactly one partner and is short enough
   for a phone card.
   ========================================================================== */

export const DISCRETE_BATX1G_MEMORY_PAIRS = 6

export const discreteBatx1gMemoryLevels = ['paths', 'mean', 'expected'] as const

interface Pair {
    question: string
    answer: string
}

const tenths = (value: number) => String(value / 10).replace('.', '{,}')
const stacked = (top: string, bottom: string) => `\\begin{array}{c}${top}\\\\ ${bottom}\\end{array}`

function pathsPair(random: Random): Pair {
    const n = randomInt(random, 3, 9)
    const k = randomInt(random, 1, n - 1)
    return { question: stacked(`n=${n}`, `k=${k}`), answer: String(choose(n, k)) }
}

function meanPair(random: Random): Pair {
    const n = 10 * randomInt(random, 1, 10)
    const p = randomInt(random, 1, 9)
    return { question: `B(${n};\\,${tenths(p)})`, answer: `\\mu=${String((n * p) / 10).replace('.', '{,}')}` }
}

function expectedPair(random: Random): Pair {
    const trials = randomInt(random, 2, 3)
    const data = 2 ** trials * randomInt(random, 2, 12)
    const k = randomInt(random, 0, trials)
    return { question: stacked(`N=${data},\\ B(${trials};\\,0{,}5)`, `X=${k}`), answer: `E=${String((data * choose(trials, k)) / 2 ** trials).replace('.', '{,}')}` }
}

/** Six pairs with different questions and answers, so every card has exactly one partner */
export function createDiscreteBatx1gMemoryBoard(random: Random, levelIndex: number): PairCard[] {
    const level = discreteBatx1gMemoryLevels[levelIndex] ?? 'paths'
    const pairs: Pair[] = []
    for (let attempt = 0; pairs.length < DISCRETE_BATX1G_MEMORY_PAIRS && attempt < 3000; attempt += 1) {
        const pair = level === 'paths' ? pathsPair(random) : level === 'mean' ? meanPair(random) : expectedPair(random)
        if (pairs.some((other) => other.question === pair.question || other.answer === pair.answer)) continue
        pairs.push(pair)
    }
    return shuffle(random, pairs.flatMap((pair, setId) => [
        { id: `${setId}-q`, setId, latex: pair.question, shows: pair.answer, explain: `${pair.question}\\ \\Rightarrow\\ ${pair.answer}` },
        { id: `${setId}-a`, setId, latex: pair.answer, shows: pair.answer, explain: `${pair.question}\\ \\Rightarrow\\ ${pair.answer}` }
    ]))
}
