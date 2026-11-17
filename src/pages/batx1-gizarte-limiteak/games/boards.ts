import type { PairCard } from '../../../features/unit-v2/games/pairsMemory.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import { ratioLatex } from './longRun.ts'

/* ==========================================================================
   Memoria (1.º Sociales · límites): a limit at infinity and its value, a
   0/0 limit and its value, and a quotient and its asymptotes. Every card
   has exactly one partner.
   ========================================================================== */

export const SOC_LIMITS_MEMORY_PAIRS = 6

export const socLimitsMemoryLevels = ['infinity', 'point', 'asymptotes'] as const

interface Pair {
    question: string
    answer: string
}

const lead = (a: number, n: number) => `${a === 1 ? '' : a}x${n === 1 ? '' : `^${n}`}`

function infinityPair(random: Random): Pair {
    const n = randomInt(random, 1, 3)
    const a = randomInt(random, 1, 9)
    const b = randomInt(random, 1, 4)
    const c = randomInt(random, 1, 9)
    return { question: `\\lim_{x\\to+\\infty}\\frac{${lead(a, n)}+${c}}{${lead(b, n)}}`, answer: ratioLatex(a, b) }
}

function pointPair(random: Random): Pair {
    const a = randomInt(random, 1, 6)
    if (random() < 0.5) return { question: `\\lim_{x\\to ${a}}\\frac{x^2-${a * a}}{x-${a}}`, answer: String(2 * a) }
    const k = pick(random, [2, 3, 5])
    return { question: `\\lim_{x\\to ${a}}\\frac{${k}x^2-${k * a}x}{x-${a}}`, answer: String(k * a) }
}

function asymptotePair(random: Random): Pair {
    const a = randomInt(random, 1, 6)
    const b = randomInt(random, 2, 7)
    return { question: `\\frac{${b}x+1}{x-${a}}`, answer: `x=${a},\\ y=${b}` }
}

/** Six pairs of one level, every question and every answer different */
export function createSocLimitsMemoryBoard(random: Random, levelIndex: number): PairCard[] {
    const level = socLimitsMemoryLevels[levelIndex] ?? 'infinity'
    const pairs: Pair[] = []
    for (let attempt = 0; pairs.length < SOC_LIMITS_MEMORY_PAIRS && attempt < 3000; attempt += 1) {
        const pair = level === 'infinity' ? infinityPair(random) : level === 'point' ? pointPair(random) : asymptotePair(random)
        if (pairs.some((other) => other.question === pair.question || other.answer === pair.answer)) continue
        pairs.push(pair)
    }
    return shuffle(random, pairs.flatMap((pair, setId) => [
        { id: `${setId}-q`, setId, latex: pair.question, shows: pair.answer, explain: `${pair.question}\\ \\Rightarrow\\ ${pair.answer}` },
        { id: `${setId}-a`, setId, latex: pair.answer, shows: pair.answer, explain: `${pair.question}\\ \\Rightarrow\\ ${pair.answer}` }
    ]))
}
