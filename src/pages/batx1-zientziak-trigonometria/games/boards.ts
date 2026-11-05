import type { PairCard } from '../../../features/unit-v2/games/pairsMemory.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'

/* ==========================================================================
   Formula eta funtzio trigonometrikoak (Batxilergoa 1 · Zientziak) memory:
   an angle in degrees and the same angle in radians; a secant, a
   cosecant or a cotangent of a notable angle and its value; and a ratio
   of an angle that is not notable (75°, 15°, 105°…) and its exact value.
   Cards write \sen, \tg, \cosec and \cotg; index.tsx gives each language
   its names before the game draws them. Every card has exactly one
   partner (no two pairs share a question or an answer), and the text
   stays short enough for a phone card. `value` lets the tests check
   every pair.
   ========================================================================== */

export const TRIGONOMETRY_MEMORY_PAIRS = 6

export const trigonometryMemoryLevels = ['radians', 'reciprocal', 'exact'] as const

export interface TrigonometryPair {
    question: string
    answer: string
    /** The values of both sides, the same number (an angle in degrees, or a ratio) */
    value: number
}

const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b))
const D = Math.PI / 180

function radiansPair(random: Random): TrigonometryPair | null {
    const degrees = randomInt(random, 1, 23) * 15
    if (degrees === 180) return null
    const divisor = gcd(degrees, 180)
    const [top, bottom] = [degrees / divisor, 180 / divisor]
    const pi = top === 1 ? '\\pi' : `${top}\\pi`
    return { question: `${degrees}^{\\circ}`, answer: bottom === 1 ? pi : `\\frac{${pi}}{${bottom}}`, value: degrees }
}

/** The new ratios at notable angles, with their value written short */
const RECIPROCALS: Array<{ ratio: 'sec' | 'cosec' | 'cotg'; angle: number }> = [
    { ratio: 'sec', angle: 60 }, { ratio: 'sec', angle: 120 }, { ratio: 'sec', angle: 45 }, { ratio: 'sec', angle: 180 }, { ratio: 'sec', angle: 30 },
    { ratio: 'cosec', angle: 30 }, { ratio: 'cosec', angle: 210 }, { ratio: 'cosec', angle: 45 }, { ratio: 'cosec', angle: 270 }, { ratio: 'cosec', angle: 60 },
    { ratio: 'cotg', angle: 45 }, { ratio: 'cotg', angle: 135 }, { ratio: 'cotg', angle: 30 }, { ratio: 'cotg', angle: 90 }, { ratio: 'cotg', angle: 150 }
]
const SHORT: Array<{ value: number; latex: string }> = [
    { value: 2, latex: '2' }, { value: -2, latex: '-2' }, { value: 1, latex: '1' }, { value: -1, latex: '-1' }, { value: 0, latex: '0' },
    { value: Math.SQRT2, latex: '\\sqrt{2}' }, { value: Math.sqrt(3), latex: '\\sqrt{3}' }, { value: -Math.sqrt(3), latex: '-\\sqrt{3}' },
    { value: 2 / Math.sqrt(3), latex: '\\frac{2\\sqrt{3}}{3}' }
]

export const reciprocalValue = (ratio: 'sec' | 'cosec' | 'cotg', angle: number) => {
    const s = Math.sin(angle * D)
    const c = Math.cos(angle * D)
    return ratio === 'sec' ? 1 / c : ratio === 'cosec' ? 1 / s : Math.abs(s) < 1e-12 ? NaN : (Math.abs(c) < 1e-12 ? 0 : c) / s
}

function reciprocalPair(random: Random): TrigonometryPair | null {
    const { ratio, angle } = pick(random, RECIPROCALS)
    const value = reciprocalValue(ratio, angle)
    const short = SHORT.find((item) => Math.abs(item.value - value) < 1e-9)
    return short ? { question: `\\${ratio} ${angle}^{\\circ}`, answer: short.latex, value } : null
}

/** Ratios of angles that are not notable and their exact values */
const s6 = Math.sqrt(6)
const s2 = Math.SQRT2
const s3 = Math.sqrt(3)
const EXACT: Array<{ question: string; answer: string; value: number }> = [
    { question: '\\sen 75^{\\circ}', answer: '\\frac{\\sqrt{6}+\\sqrt{2}}{4}', value: (s6 + s2) / 4 },
    { question: '\\cos 75^{\\circ}', answer: '\\frac{\\sqrt{6}-\\sqrt{2}}{4}', value: (s6 - s2) / 4 },
    { question: '\\cos 105^{\\circ}', answer: '\\frac{\\sqrt{2}-\\sqrt{6}}{4}', value: (s2 - s6) / 4 },
    { question: '\\tg 75^{\\circ}', answer: '2+\\sqrt{3}', value: 2 + s3 },
    { question: '\\tg 15^{\\circ}', answer: '2-\\sqrt{3}', value: 2 - s3 },
    { question: '\\tg 105^{\\circ}', answer: '-2-\\sqrt{3}', value: -2 - s3 },
    { question: '\\sen 195^{\\circ}', answer: '\\frac{\\sqrt{2}-\\sqrt{6}}{4}', value: (s2 - s6) / 4 },
    { question: '\\sen 255^{\\circ}', answer: '-\\frac{\\sqrt{6}+\\sqrt{2}}{4}', value: -(s6 + s2) / 4 },
    { question: '\\cos 22{,}5^{\\circ}', answer: '\\frac{\\sqrt{2+\\sqrt{2}}}{2}', value: Math.sqrt(2 + s2) / 2 },
    { question: '\\sen 22{,}5^{\\circ}', answer: '\\frac{\\sqrt{2-\\sqrt{2}}}{2}', value: Math.sqrt(2 - s2) / 2 }
]

/** The pairs of the exact level, as the tests check them */
export const trigonometryExactPairs = EXACT

function exactPair(random: Random): TrigonometryPair {
    return pick(random, EXACT)
}

/** Six pairs with different questions and answers, so every card has exactly one partner */
export function createTrigonometryMemoryPairs(random: Random, levelIndex: number): TrigonometryPair[] {
    const level = trigonometryMemoryLevels[levelIndex] ?? 'radians'
    const pairs: TrigonometryPair[] = []
    for (let attempt = 0; pairs.length < TRIGONOMETRY_MEMORY_PAIRS && attempt < 3000; attempt += 1) {
        const pair = level === 'radians' ? radiansPair(random) : level === 'reciprocal' ? reciprocalPair(random) : exactPair(random)
        if (!pair || pairs.some((other) => other.question === pair.question || other.answer === pair.answer)) continue
        pairs.push(pair)
    }
    return pairs
}

/** The cards of a board, with each formula passed through the language's names */
export function createTrigonometryMemoryBoard(random: Random, levelIndex: number, names: (latex: string) => string = (latex) => latex): PairCard[] {
    const pairs = createTrigonometryMemoryPairs(random, levelIndex)
    return shuffle(random, pairs.flatMap((pair, setId) => {
        const question = names(pair.question)
        const answer = names(pair.answer)
        const explain = `${question}=${answer}`
        return [
            { id: `${setId}-q`, setId, latex: question, shows: answer, explain },
            { id: `${setId}-a`, setId, latex: answer, shows: answer, explain }
        ]
    }))
}
