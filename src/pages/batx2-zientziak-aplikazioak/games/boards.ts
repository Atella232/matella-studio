import type { PairCard } from '../../../features/unit-v2/games/pairsMemory.ts'
import { shuffle, type Random } from '../../../features/unit-v2/games/random.ts'

/* ==========================================================================
   Aplikazioak (Batxilergoa 2 · Zientziak) memory: a limit and its value
   (L'Hôpital), a function and the abscissa of its only extremum, and an
   optimisation and its optimum. Each level has eight pairs with eight
   different answers, and a board takes six of them, so every card has
   exactly one partner. There are no sines or cosines: the cards are not
   translated, and Spanish writes sen.
   ========================================================================== */

export const BACH2_APPLICATIONS_MEMORY_PAIRS = 6

export const bach2ApplicationsMemoryLevels = ['limits', 'extrema', 'optima'] as const

interface Pair {
    question: string
    answer: string
}

const LIMITS: Pair[] = [
    { question: '\\lim_{x\\to 0}\\frac{\\ln(1+2x)}{x}', answer: '2' },
    { question: '\\lim_{x\\to 0}\\frac{e^{3x}-1}{x}', answer: '3' },
    { question: '\\lim_{x\\to 0}\\frac{e^x-1-x}{x^2}', answer: '\\frac{1}{2}' },
    { question: '\\lim_{x\\to 1}\\frac{\\ln x}{x-1}', answer: '1' },
    { question: '\\lim_{x\\to 0^+}x\\ln x', answer: '0' },
    { question: '\\lim_{x\\to 4}\\frac{x^2-16}{x-4}', answer: '8' },
    { question: '\\lim_{x\\to 0}(1+x)^{1/x}', answer: 'e' },
    { question: '\\lim_{x\\to 0}(1+2x)^{1/x}', answer: 'e^2' }
]

const EXTREMA: Pair[] = [
    { question: 'x^2-6x', answer: 'x=3' },
    { question: 'x^2+4x', answer: 'x=-2' },
    { question: 'x\\,e^{-x}', answer: 'x=1' },
    { question: 'x\\ln x', answer: 'x=\\frac{1}{e}' },
    { question: 'e^x-x', answer: 'x=0' },
    { question: 'x^2-4x', answer: 'x=2' },
    { question: '\\frac{\\ln x}{x}', answer: 'x=e' },
    { question: '(x-5)^2+1', answer: 'x=5' }
]

/** Short on purpose: a memory card is narrow on a phone */
const OPTIMA: Pair[] = [
    { question: '\\max\\ x(10-x)', answer: '25' },
    { question: '\\max\\ x(12-x)', answer: '36' },
    { question: '\\max\\ x(6-x)', answer: '9' },
    { question: '\\min\\ x^2-6x', answer: '-9' },
    { question: '\\min\\ x^2+4x', answer: '-4' },
    { question: '\\max\\ 8x-x^2', answer: '16' },
    { question: '\\min\\ x^2-2x', answer: '-1' },
    { question: '\\max\\ 4x-x^2', answer: '4' }
]

export const BACH2_APPLICATIONS_MEMORY_SETS = { limits: LIMITS, extrema: EXTREMA, optima: OPTIMA }

/** Six pairs of one level */
export function createBach2ApplicationsMemoryBoard(random: Random, levelIndex: number): PairCard[] {
    const level = bach2ApplicationsMemoryLevels[levelIndex] ?? 'limits'
    const pairs = shuffle(random, BACH2_APPLICATIONS_MEMORY_SETS[level]).slice(0, BACH2_APPLICATIONS_MEMORY_PAIRS)
    const explain = (pair: Pair) => `${pair.question}\\ \\to\\ ${pair.answer}`
    return shuffle(random, pairs.flatMap((pair, setId) => [
        { id: `${setId}-q`, setId, latex: pair.question, shows: pair.answer, explain: explain(pair) },
        { id: `${setId}-a`, setId, latex: pair.answer, shows: pair.answer, explain: explain(pair) }
    ]))
}
