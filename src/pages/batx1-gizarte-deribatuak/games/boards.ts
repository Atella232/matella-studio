import type { PairCard } from '../../../features/unit-v2/games/pairsMemory.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'

/* ==========================================================================
   Memoria (1.º Sociales · derivadas): a power and its derivative, a
   parabola and the x of its extreme, a profit and its best production.
   Every card has exactly one partner.
   ========================================================================== */

export const SOC_DERIV_MEMORY_PAIRS = 6

export const socDerivMemoryLevels = ['powers', 'extremes', 'profit'] as const

interface Pair {
    question: string
    answer: string
}

const coefficient = (value: number) => (value === 1 ? '' : String(value))

function powerPair(random: Random): Pair {
    const k = randomInt(random, 1, 5)
    const n = randomInt(random, 2, 6)
    return { question: `${coefficient(k)}x^${n}`, answer: `${k * n}x${n - 1 === 1 ? '' : `^${n - 1}`}` }
}

function extremePair(random: Random): Pair {
    const h = randomInt(random, -6, 6)
    const c = randomInt(random, -9, 9)
    if (h === 0) return { question: `x^2${c < 0 ? c : `+${c}`}`, answer: 'x=0' }
    return { question: `x^2${h > 0 ? '-' : '+'}${2 * Math.abs(h)}x${c === 0 ? '' : c < 0 ? c : `+${c}`}`, answer: `x=${h}` }
}

function profitPair(random: Random): Pair {
    const best = randomInt(random, 3, 30)
    const F = pick(random, [0, 50, 100])
    return { question: `-x^2+${2 * best}x${F ? `-${F}` : ''}`, answer: `x=${best}` }
}

/** Six pairs of one level, every question and every answer different */
export function createSocDerivMemoryBoard(random: Random, levelIndex: number): PairCard[] {
    const level = socDerivMemoryLevels[levelIndex] ?? 'powers'
    const pairs: Pair[] = []
    for (let attempt = 0; pairs.length < SOC_DERIV_MEMORY_PAIRS && attempt < 3000; attempt += 1) {
        const pair = level === 'powers' ? powerPair(random) : level === 'extremes' ? extremePair(random) : profitPair(random)
        if (pairs.some((other) => [other.question, other.answer].some((latex) => latex === pair.question || latex === pair.answer))) continue
        pairs.push(pair)
    }
    return shuffle(random, pairs.flatMap((pair, setId) => [
        { id: `${setId}-q`, setId, latex: pair.question, shows: pair.answer, explain: `${pair.question}\\ \\Rightarrow\\ ${pair.answer}` },
        { id: `${setId}-a`, setId, latex: pair.answer, shows: pair.answer, explain: `${pair.question}\\ \\Rightarrow\\ ${pair.answer}` }
    ]))
}
