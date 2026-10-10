import type { PairCard } from '../../../features/unit-v2/games/pairsMemory.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import { polyLatex } from '../../dbh4-aplikatuak-funtzioak/games/race.ts'

/* ==========================================================================
   Funtzio baten grafikoa (4. DBH aplikatuak) memory: two points and the
   slope of their line, a parabola y = ax² + bx + c (written without
   "y =", to fit on a card) and its vertex, and a power aˣ and its
   value. Every card has exactly one partner.
   ========================================================================== */

export const GRAPHS_MEMORY_PAIRS = 6

export const graphsMemoryLevels = ['slopes', 'vertices', 'powers'] as const

interface Pair {
    question: string
    answer: string
    /** The shared answer, to tell pairs apart */
    key: string
}

const fractionLatex = (numerator: number, denominator: number) => {
    const sign = numerator * denominator < 0 ? '-' : ''
    const [p, q] = [Math.abs(numerator), Math.abs(denominator)]
    return q === 1 ? `${sign}${p}` : `${sign}\\frac{${p}}{${q}}`
}

function slopePair(random: Random): Pair {
    const x1 = randomInt(random, -3, 3)
    const y1 = randomInt(random, -4, 4)
    const dx = pick(random, [1, 2, 3])
    const dy = randomInt(random, -6, 6)
    const divisor = [3, 2].find((d) => dx % d === 0 && dy % d === 0) ?? 1
    const [p, q] = [dy / divisor, dx / divisor]
    const point = (x: number, y: number) => `(${x},${y})`
    return { question: `\\begin{gathered}${point(x1, y1)}\\\\ ${point(x1 + dx, y1 + dy)}\\end{gathered}`, answer: `m=${fractionLatex(p, q)}`, key: `${p}/${q}` }
}

function vertexPair(random: Random): Pair | null {
    const a = pick(random, [1, 1, -1])
    const p = randomInt(random, -3, 3)
    const q = randomInt(random, -4, 4)
    const c = a * p * p + q
    // Short enough to fit on a card: x² − 6x + 5, never a two-digit c
    if (Math.abs(c) > 9) return null
    return { question: polyLatex(a, -2 * a * p, c), answer: `V(${p},\\,${q})`, key: `${p},${q}` }
}

function powerPair(random: Random): Pair {
    const base = pick(random, [2, 3, 4, 5, 10])
    const exponent = randomInt(random, -2, 3)
    const value = exponent >= 0 ? String(base ** exponent) : `\\frac{1}{${base ** -exponent}}`
    return { question: `${base}^{${exponent}}`, answer: value, key: value }
}

/** Six pairs with different answers, so every card has exactly one partner */
export function createGraphsMemoryBoard(random: Random, levelIndex: number): PairCard[] {
    const level = graphsMemoryLevels[levelIndex] ?? 'slopes'
    const pairs: Pair[] = []
    for (let attempt = 0; pairs.length < GRAPHS_MEMORY_PAIRS && attempt < 2000; attempt += 1) {
        const pair = level === 'slopes' ? slopePair(random) : level === 'vertices' ? vertexPair(random) : powerPair(random)
        if (!pair || pairs.some((other) => other.key === pair.key || other.question === pair.question)) continue
        pairs.push(pair)
    }
    return shuffle(random, pairs.flatMap((pair, setId) => [
        { id: `${setId}-q`, setId, latex: pair.question, shows: pair.answer, explain: `${pair.question}\\ \\Rightarrow\\ ${pair.answer}` },
        { id: `${setId}-a`, setId, latex: pair.answer, shows: pair.answer, explain: `${pair.question}\\ \\Rightarrow\\ ${pair.answer}` }
    ]))
}
