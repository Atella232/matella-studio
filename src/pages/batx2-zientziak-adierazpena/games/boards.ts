import type { PairCard } from '../../../features/unit-v2/games/pairsMemory.ts'
import { shuffle, type Random } from '../../../features/unit-v2/games/random.ts'

/* ==========================================================================
   Adierazpena (Batxilergoa 2 · Zientziak) memory: a function and its
   vertical asymptote, a function and its horizontal or oblique asymptote,
   and an absolute value and where its corners are. Each level has eight
   pairs with eight different answers, and a board takes six of them, so
   every card has exactly one partner. There are no sines or cosines (the
   cards are not translated, and Spanish writes sen) and no words; the
   cards are short, because a memory card is narrow on a phone.
   ========================================================================== */

export const BACH2_SKETCH_MEMORY_PAIRS = 6

export const bach2SketchMemoryLevels = ['vertical', 'horizontal', 'corners'] as const

interface Pair {
    question: string
    answer: string
}

const VERTICAL: Pair[] = [
    { question: '\\frac{1}{x-3}', answer: 'x=3' },
    { question: '\\frac{2}{x+1}', answer: 'x=-1' },
    { question: '\\ln(x-2)', answer: 'x=2' },
    { question: '\\frac{x}{x-5}', answer: 'x=5' },
    { question: '\\frac{1}{x+4}', answer: 'x=-4' },
    { question: '\\ln(x+3)', answer: 'x=-3' },
    { question: '\\frac{3}{x}', answer: 'x=0' },
    { question: '\\frac{x+2}{x-1}', answer: 'x=1' }
]

const HORIZONTAL: Pair[] = [
    { question: '\\frac{2x+1}{x-1}', answer: 'y=2' },
    { question: '\\frac{x^2}{x-1}', answer: 'y=x+1' },
    { question: '\\frac{3x}{x+2}', answer: 'y=3' },
    { question: '\\frac{x^2+1}{x}', answer: 'y=x' },
    { question: '\\frac{2x^2}{x+1}', answer: 'y=2x-2' },
    { question: '\\frac{x}{x^2+1}', answer: 'y=0' },
    { question: '\\frac{5-x}{x}', answer: 'y=-1' },
    { question: '\\frac{x^2-2x}{x+1}', answer: 'y=x-3' }
]

const CORNERS: Pair[] = [
    { question: '|x-3|', answer: 'x=3' },
    { question: '|2x+4|', answer: 'x=-2' },
    { question: '|x^2-1|', answer: 'x=\\pm 1' },
    { question: '|x^2-9|', answer: 'x=\\pm 3' },
    { question: '|x+5|', answer: 'x=-5' },
    { question: '|x^2-4x|', answer: 'x=0,\\ 4' },
    { question: 'e^{|x|}', answer: 'x=0' },
    { question: '|x^2-x-2|', answer: 'x=-1,\\ 2' }
]

export const BACH2_SKETCH_MEMORY_SETS = { vertical: VERTICAL, horizontal: HORIZONTAL, corners: CORNERS }

/** Six pairs of one level */
export function createBach2SketchMemoryBoard(random: Random, levelIndex: number): PairCard[] {
    const level = bach2SketchMemoryLevels[levelIndex] ?? 'vertical'
    const pairs = shuffle(random, BACH2_SKETCH_MEMORY_SETS[level]).slice(0, BACH2_SKETCH_MEMORY_PAIRS)
    const explain = (pair: Pair) => `${pair.question}\\ \\to\\ ${pair.answer}`
    return shuffle(random, pairs.flatMap((pair, setId) => [
        { id: `${setId}-q`, setId, latex: pair.question, shows: pair.answer, explain: explain(pair) },
        { id: `${setId}-a`, setId, latex: pair.answer, shows: pair.answer, explain: explain(pair) }
    ]))
}
