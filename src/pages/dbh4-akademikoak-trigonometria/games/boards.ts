import type { PairCard } from '../../../features/unit-v2/games/pairsMemory.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import { fraction } from '../../../features/unit-v2/math/fraction.ts'
import { hundredthsLatex, piLatex } from './race.ts'

/* ==========================================================================
   Trigonometria (4. DBH akademikoak) memory: an angle in degrees and the
   same angle in radians, an angle in degrees and minutes and the same angle
   with decimals, and two sides with the angle between them and the area of
   the triangle (½ · b · c · sen A with 30°, 90° or 150°, so the area is
   exact). Cards carry values only, never the names of the ratios, so they
   read the same in every language. Every card has exactly one partner, and
   the text stays short enough for a phone card.
   ========================================================================== */

export const TRIGONOMETRY_MEMORY_PAIRS = 6

export const trigonometryMemoryLevels = ['radians', 'minutes', 'areas'] as const

interface Pair {
    question: string
    answer: string
}

const lines = (...rows: string[]) => `\\begin{array}{c}${rows.join('\\\\')}\\end{array}`

function radiansPair(random: Random): Pair {
    const degrees = randomInt(random, 1, 24) * 15
    return { question: `${degrees}^{\\circ}`, answer: piLatex(fraction(degrees, 180)) }
}

function minutesPair(random: Random): Pair {
    const degrees = randomInt(random, 1, 89)
    const minutes = pick(random, [6, 12, 15, 18, 24, 30, 36, 42, 45, 48, 54])
    return { question: `${degrees}^{\\circ}\\,${minutes}'`, answer: `${hundredthsLatex(degrees * 100 + (minutes * 100) / 60)}^{\\circ}` }
}

/** The sine of the angles whose area comes out exact */
const EXACT_SINES: Record<number, number> = { 30: 0.5, 90: 1, 150: 0.5 }

function areaPair(random: Random): Pair {
    const b = randomInt(random, 2, 10)
    const c = randomInt(random, 2, 10)
    const angle = pick(random, [30, 90, 150])
    const area = (b * c * EXACT_SINES[angle]) / 2
    return { question: lines(`b{=}${b},\\ c{=}${c}`, `A{=}${angle}^{\\circ}`), answer: `S{=}${hundredthsLatex(Math.round(area * 100))}` }
}

/** Six pairs with different questions and answers, so every card has exactly one partner */
export function createTrigonometryMemoryBoard(random: Random, levelIndex: number): PairCard[] {
    const level = trigonometryMemoryLevels[levelIndex] ?? 'radians'
    const pairs: Pair[] = []
    for (let attempt = 0; pairs.length < TRIGONOMETRY_MEMORY_PAIRS && attempt < 3000; attempt += 1) {
        const pair = level === 'radians' ? radiansPair(random) : level === 'minutes' ? minutesPair(random) : areaPair(random)
        if (pairs.some((other) => other.question === pair.question || other.answer === pair.answer)) continue
        pairs.push(pair)
    }
    return shuffle(random, pairs.flatMap((pair, setId) => [
        { id: `${setId}-q`, setId, latex: pair.question, shows: pair.answer, explain: `${pair.question}\\ \\Rightarrow\\ ${pair.answer}` },
        { id: `${setId}-a`, setId, latex: pair.answer, shows: pair.answer, explain: `${pair.question}\\ \\Rightarrow\\ ${pair.answer}` }
    ]))
}
