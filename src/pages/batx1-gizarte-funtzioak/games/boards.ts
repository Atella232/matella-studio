import type { PairCard } from '../../../features/unit-v2/games/pairsMemory.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'

/* ==========================================================================
   Funtzio elementalak (Batxilergoa 1 · Gizarte Zientziak) memory: a
   function and its domain, a parabola and its vertex, and a shifted
   hyperbola and its asymptotes. Every card has exactly one partner, and
   the text stays short enough for a card.
   ========================================================================== */

export const SOC_FUNCTIONS_MEMORY_PAIRS = 6

export const socFunctionsMemoryLevels = ['domains', 'vertices', 'asymptotes'] as const

interface Pair {
    question: string
    answer: string
}

const signed = (value: number) => (value < 0 ? `-${-value}` : `+${value}`)
const binomial = (root: number) => (root === 0 ? 'x' : `x${signed(-root)}`)

function domainPair(random: Random): Pair {
    const a = randomInt(random, -5, 5)
    const kind = pick(random, ['root', 'fraction', 'root-fraction', 'reverse'] as const)
    if (kind === 'root') return { question: `\\sqrt{${binomial(a)}}`, answer: `[${a},+\\infty)` }
    if (kind === 'fraction') return { question: `\\frac{1}{${binomial(a)}}`, answer: `\\mathbb{R}-\\{${a}\\}` }
    if (kind === 'root-fraction') return { question: `\\frac{1}{\\sqrt{${binomial(a)}}}`, answer: `(${a},+\\infty)` }
    return { question: `\\sqrt{${a}-x}`, answer: `(-\\infty,${a}]` }
}

function vertexPair(random: Random): Pair | null {
    const h = randomInt(random, -4, 4)
    const k = randomInt(random, -5, 5)
    const b = -2 * h
    const c = h * h + k
    if (b === 0 && c === 0) return null
    const formula = `x^2${b === 0 ? '' : `${signed(b)}x`}${c === 0 ? '' : signed(c)}`
    return { question: formula, answer: `V(${h},${k})` }
}

function asymptotePair(random: Random): Pair {
    const a = randomInt(random, -4, 4)
    const b = pick(random, [-4, -3, -2, -1, 1, 2, 3, 4])
    const k = pick(random, [1, 2, 3, 5])
    const front = a === 0 ? '' : `${a}+`
    return { question: `${front}\\frac{${k}}{${binomial(b)}}`, answer: `x=${b},\\ y=${a}` }
}

/** Six pairs of one level, every question and every answer different */
export function createSocFunctionsMemoryBoard(random: Random, levelIndex: number): PairCard[] {
    const level = socFunctionsMemoryLevels[levelIndex] ?? 'domains'
    const pairs: Pair[] = []
    for (let attempt = 0; pairs.length < SOC_FUNCTIONS_MEMORY_PAIRS && attempt < 3000; attempt += 1) {
        const pair = level === 'domains' ? domainPair(random) : level === 'vertices' ? vertexPair(random) : asymptotePair(random)
        if (!pair || pairs.some((other) => other.question === pair.question || other.answer === pair.answer)) continue
        pairs.push(pair)
    }
    return shuffle(random, pairs.flatMap((pair, setId) => [
        { id: `${setId}-q`, setId, latex: pair.question, shows: pair.answer, explain: `${pair.question}\\ \\Rightarrow\\ ${pair.answer}` },
        { id: `${setId}-a`, setId, latex: pair.answer, shows: pair.answer, explain: `${pair.question}\\ \\Rightarrow\\ ${pair.answer}` }
    ]))
}
