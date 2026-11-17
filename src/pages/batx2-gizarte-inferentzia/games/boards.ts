import type { PairCard } from '../../../features/unit-v2/games/pairsMemory.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import { criticalZ, decimalLatex } from '../../batx2-gizarte-banaketak/critical.ts'

/* ==========================================================================
   Inferentzia (Batxilergoa 2 · Gizarte Zientziak) memory: a confidence
   level and its critical value; an interval and its midpoint x̄; an
   interval and its error E. Every card has exactly one partner, and each
   one stays short enough for a phone card.
   ========================================================================== */

export const INFERENCE_BATX2G_MEMORY_PAIRS = 6

export const inferenceBatx2gMemoryLevels = ['critical', 'midpoint', 'error'] as const

interface Pair {
    question: string
    answer: string
}

const d = decimalLatex
const LEVELS = [80, 88, 90, 92, 94, 95, 96, 97, 98, 99]

function criticalPair(random: Random): Pair {
    const level = pick(random, LEVELS)
    return { question: `${level}\\,\\%`, answer: `{z}_{\\alpha/2}=${d(criticalZ(level))}` }
}

function intervalPair(random: Random, asks: 'midpoint' | 'error'): Pair {
    const mean = randomInt(random, 10, 60)
    const error = pick(random, [0.5, 1, 1.5, 2, 2.5, 3, 4, 5, 1.96, 2.94, 3.92])
    const question = `(${d(mean - error)};\\ ${d(mean + error)})`
    return { question, answer: asks === 'midpoint' ? `\\bar{x}=${mean}` : `E=${d(error)}` }
}

/** Six pairs with different answers, so every card has exactly one partner */
export function createInferenceBatx2gMemoryBoard(random: Random, levelIndex: number): PairCard[] {
    const level = inferenceBatx2gMemoryLevels[levelIndex] ?? 'critical'
    const pairs: Pair[] = []
    for (let attempt = 0; pairs.length < INFERENCE_BATX2G_MEMORY_PAIRS && attempt < 3000; attempt += 1) {
        const pair = level === 'critical' ? criticalPair(random) : intervalPair(random, level)
        if (pairs.some((other) => other.question === pair.question || other.answer === pair.answer)) continue
        pairs.push(pair)
    }
    return shuffle(random, pairs.flatMap((pair, setId) => [
        { id: `${setId}-q`, setId, latex: pair.question, shows: pair.answer, explain: `${pair.question}\\ \\Rightarrow\\ ${pair.answer}` },
        { id: `${setId}-a`, setId, latex: pair.answer, shows: pair.answer, explain: `${pair.question}\\ \\Rightarrow\\ ${pair.answer}` }
    ]))
}
