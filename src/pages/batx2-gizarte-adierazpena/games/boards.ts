import type { PairCard } from '../../../features/unit-v2/games/pairsMemory.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'

/* ==========================================================================
   Adierazpenaren memoria (Batxilergoa 2 · Gizarte Zientziak): a function
   and one of its asymptotes. Level 1, k/(x − a) and its vertical one;
   level 2, (bx + c)/(x − a) and its horizontal one; level 3,
   (x² + px + q)/x and its oblique one.
   ========================================================================== */

export const BACH2G_SKETCH_MEMORY_PAIRS = 6

export const bach2gSketchMemoryLevels = ['vertical', 'horizontal', 'oblique'] as const

interface Pair {
    question: string
    answer: string
    explain: string
}

const signed = (value: number) => (value < 0 ? `-${-value}` : `+${value}`)
const minus = (a: number) => (a === 0 ? '' : signed(-a))

function verticalPair(random: Random): Pair | null {
    const a = randomInt(random, -7, 7)
    const k = pick(random, [1, 2, 3, 5])
    if (a === 0) return null
    return { question: `\\frac{${k}}{x${minus(a)}}`, answer: `x=${a}`, explain: `x${minus(a)}=0\\ \\to\\ x=${a}` }
}

function horizontalPair(random: Random): Pair | null {
    const b = randomInt(random, -6, 6)
    const a = randomInt(random, 1, 5)
    const c = randomInt(random, 1, 4)
    if (b === 0) return null
    return { question: `\\frac{${b}x+${c}}{x-${a}}`, answer: `y=${b}`, explain: `\\frac{${b}}{1}=${b}` }
}

function obliquePair(random: Random): Pair | null {
    const p = randomInt(random, -6, 6)
    const q = randomInt(random, 1, 5)
    return { question: `\\frac{x^2${p === 0 ? '' : `${signed(p)}x`}+${q}}{x}`, answer: `y=x${p === 0 ? '' : signed(p)}`, explain: `x${p === 0 ? '' : signed(p)}+\\frac{${q}}{x}` }
}

/** Six pairs of one level, every question and every answer different */
export function createBach2gSketchMemoryBoard(random: Random, levelIndex: number): PairCard[] {
    const level = bach2gSketchMemoryLevels[levelIndex] ?? 'vertical'
    const pairs: Pair[] = []
    for (let attempt = 0; pairs.length < BACH2G_SKETCH_MEMORY_PAIRS && attempt < 4000; attempt += 1) {
        const pair = level === 'vertical' ? verticalPair(random) : level === 'horizontal' ? horizontalPair(random) : obliquePair(random)
        if (!pair || pairs.some((other) => other.question === pair.question || other.answer === pair.answer)) continue
        pairs.push(pair)
    }
    return shuffle(random, pairs.flatMap((pair, setId) => [
        { id: `${setId}-q`, setId, latex: pair.question, shows: pair.answer, explain: pair.explain },
        { id: `${setId}-a`, setId, latex: pair.answer, shows: pair.answer, explain: pair.explain }
    ]))
}
