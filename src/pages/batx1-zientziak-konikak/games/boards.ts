import type { PairCard } from '../../../features/unit-v2/games/pairsMemory.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import { ELLIPSE_TRIPLES, ellipseLatex, fociOf, point, ratio, squareOf } from './conicLatex.ts'

/* ==========================================================================
   Leku geometrikoak eta konikak (Batxilergoa 1 · Zientziak) memory: a
   circle and its centre, an ellipse and its foci, and a parabola and its
   focus. Every card has exactly one partner, and the text stays short
   enough for a card.
   ========================================================================== */

export const BACH_CONICS_MEMORY_PAIRS = 6

export const bachConicsMemoryLevels = ['centre', 'foci', 'focus'] as const

interface Pair {
    question: string
    answer: string
}

/** (x − h)² + (y − k)² = r² and its centre */
function centrePair(random: Random): Pair | null {
    const h = randomInt(random, -5, 5)
    const k = randomInt(random, -5, 5)
    const r = randomInt(random, 1, 6)
    if (h === 0 && k === 0) return null
    // Two short rows so the card is wide enough
    return { question: `\\begin{gathered}${squareOf('x', h)}+\\\\ ${squareOf('y', k)}=${r * r}\\end{gathered}`, answer: point('C', h, k) }
}

/** An ellipse with whole semi-axes and its foci, on the axis of the greater denominator */
function fociPair(random: Random): Pair | null {
    const [a, b, c] = pick(random, ELLIPSE_TRIPLES)
    const vertical = pick(random, [false, true])
    const [x, y] = ellipseLatex(a, b, vertical).split('+')
    return { question: `\\begin{gathered}${x}\\\\ +${y}\\end{gathered}`, answer: fociOf(c, vertical) }
}

/** y² = ±nx or x² = ±ny and its focus */
function focusPair(random: Random): Pair | null {
    const n = pick(random, [2, 4, 6, 8, 12, 16])
    const side = pick(random, [1, -1])
    const vertical = pick(random, [false, true])
    const sign = side < 0 ? '-' : ''
    const value = ratio(side * n, 4)
    return vertical ? { question: `x^2=${sign}${n}y`, answer: point('F', 0, value) } : { question: `y^2=${sign}${n}x`, answer: point('F', value, 0) }
}

/** Six pairs with different answers, so every card has exactly one partner */
export function createBachConicsMemoryBoard(random: Random, levelIndex: number): PairCard[] {
    const level = bachConicsMemoryLevels[levelIndex] ?? 'centre'
    const pairs: Pair[] = []
    for (let attempt = 0; pairs.length < BACH_CONICS_MEMORY_PAIRS && attempt < 3000; attempt += 1) {
        const pair = level === 'centre' ? centrePair(random) : level === 'foci' ? fociPair(random) : focusPair(random)
        if (!pair || pairs.some((other) => other.question === pair.question || other.answer === pair.answer)) continue
        pairs.push(pair)
    }
    return shuffle(random, pairs.flatMap((pair, setId) => [
        { id: `${setId}-q`, setId, latex: pair.question, shows: pair.answer, explain: `${pair.question}\\ \\Rightarrow\\ ${pair.answer}` },
        { id: `${setId}-a`, setId, latex: pair.answer, shows: pair.answer, explain: `${pair.question}\\ \\Rightarrow\\ ${pair.answer}` }
    ]))
}
