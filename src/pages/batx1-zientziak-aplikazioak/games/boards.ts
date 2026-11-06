import type { PairCard } from '../../../features/unit-v2/games/pairsMemory.ts'
import { pick, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'

/* ==========================================================================
   Deribatuaren aplikazioak (Batxilergoa 1 · Zientziak) memory: a function
   and one number that describes it. Level 1, extrema: x² − 2px or −x² + 2px
   and the x of its vertex; level 2, inflections: x³ − 3px² and the x of
   its inflection; level 3, optimisation:
   x(S − x), the product of two numbers adding up to S, and its greatest
   value S²/4. Every card has exactly one partner, and the text stays
   narrow enough for a card at 375 px.
   ========================================================================== */

export const BACH_APPLICATIONS_MEMORY_PAIRS = 6

export const bachApplicationsMemoryLevels = ['extrema', 'inflections', 'optimal'] as const

interface Pair {
    question: string
    answer: string
    explain: string
}

const signed = (value: number) => (value === 0 ? '' : value < 0 ? `-${-value}` : `+${value}`)
const linear = (value: number) => (value === 0 ? '' : value === 1 ? '+x' : value === -1 ? '-x' : `${signed(value)}x`)

function extremaPair(random: Random): Pair {
    const p = pick(random, [-4, -3, -2, -1, 1, 2, 3, 4])
    const sign = pick(random, [1, -1])
    // No constant term: the card stays narrow at 375 px
    const question = `${sign < 0 ? '-' : ''}x^2${linear(-2 * p * sign)}`
    return { question, answer: `x=${p}`, explain: `f'(x)=${sign < 0 ? '-' : ''}2x${signed(-2 * p * sign)}=0\\ \\to\\ x=${p}` }
}

function inflectionPair(random: Random): Pair {
    const p = pick(random, [-4, -3, -2, -1, 1, 2, 3, 4])
    return { question: `x^3${signed(-3 * p)}x^2`, answer: `x=${p}`, explain: `f''(x)=6x${signed(-6 * p)}=0\\ \\to\\ x=${p}` }
}

function optimalPair(random: Random): Pair {
    const s = pick(random, [4, 6, 8, 10, 12, 14, 16, 18])
    return { question: `x(${s}-x)`, answer: String((s * s) / 4), explain: `x=${s / 2}\\ \\to\\ ${s / 2}\\cdot ${s / 2}=${(s * s) / 4}` }
}

/** Six pairs of one level, every question and every answer different */
export function createBachApplicationsMemoryBoard(random: Random, levelIndex: number): PairCard[] {
    const level = bachApplicationsMemoryLevels[levelIndex] ?? 'extrema'
    const make = level === 'extrema' ? extremaPair : level === 'inflections' ? inflectionPair : optimalPair
    const pairs: Pair[] = []
    for (let attempt = 0; pairs.length < BACH_APPLICATIONS_MEMORY_PAIRS && attempt < 3000; attempt += 1) {
        const pair = make(random)
        if (pairs.some((other) => other.question === pair.question || other.answer === pair.answer)) continue
        pairs.push(pair)
    }
    return shuffle(random, pairs.flatMap((pair, setId) => [
        { id: `${setId}-q`, setId, latex: pair.question, shows: pair.answer, explain: pair.explain },
        { id: `${setId}-a`, setId, latex: pair.answer, shows: pair.answer, explain: pair.explain }
    ]))
}
