import type { PairCard } from '../../../features/unit-v2/games/pairsMemory.ts'
import { randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import { linearLatex } from '../lab/labTools.ts'
import { latticePoints } from '../systems.ts'

/* ==========================================================================
   Sistemak (4. DBH akademikoak) memory: a linear system and its solution,
   a sum and a product and the two numbers, and the triangle x, y ≥ 0,
   ax + by ≤ c and how many whole points it holds. Every card has exactly
   one partner, and the text stays short enough for a phone card: one
   equation per line, and braces around the signs drop their spacing.
   ========================================================================== */

export const SYSTEMS_MEMORY_PAIRS = 6

export const systemsMemoryLevels = ['linear', 'nonlinear', 'region'] as const

interface Pair {
    question: string
    answer: string
}

/** Braces drop the spacing around signs and relations, so an equation fits a phone card */
const tight = (latex: string) => latex.replace(/(\\le|\\ge|=|<|>)/g, '{$1}').replace(/([\dxy}])([+-])/g, '$1{$2}')
const lines = (...rows: string[]) => `\\begin{array}{c}${rows.map(tight).join('\\\\')}\\end{array}`

function linearPair(random: Random): Pair | null {
    const x = randomInt(random, -4, 5)
    const y = randomInt(random, -4, 5)
    const b = randomInt(random, -3, 3)
    // a2 > 0: an equation that starts with a minus sign does not fit a phone card
    const a2 = randomInt(random, 1, 3)
    if (b === 0 || a2 * b === -1) return null
    // x + by = c1 and a2·x − y = c2: one solution, coefficients of one digit
    const c1 = x + b * y
    const c2 = a2 * x - y
    if (Math.abs(c1) > 9 || Math.abs(c2) > 9) return null
    return { question: lines(linearLatex({ a: 1, b, c: c1 }), linearLatex({ a: a2, b: -1, c: c2 })), answer: `(${x},${y})` }
}

function nonlinearPair(random: Random): Pair | null {
    const r = randomInt(random, -4, 8)
    const s = randomInt(random, r + 1, 9)
    if (Math.abs(r * s) > 9 || Math.abs(r + s) > 9 || r + s === 0) return null
    return { question: lines(`x+y=${r + s}`, `xy=${r * s}`), answer: `${r},\\ ${s}` }
}

function regionPair(random: Random): Pair | null {
    const a = randomInt(random, 1, 3)
    const b = randomInt(random, 1, 3)
    const c = randomInt(random, 2, 7)
    const count = latticePoints({ xMin: 0, xMax: 10, yMin: 0, yMax: 10 }, [{ a, b, c, sense: '≤' }, { a: 1, b: 0, c: 0, sense: '≥' }, { a: 0, b: 1, c: 0, sense: '≥' }]).length
    return { question: lines('x,y\\ge 0', linearLatex({ a, b, c }, '\\le ')), answer: String(count) }
}

/** Six pairs with different questions and answers, so every card has exactly one partner */
export function createSystemsMemoryBoard(random: Random, levelIndex: number): PairCard[] {
    const level = systemsMemoryLevels[levelIndex] ?? 'linear'
    const pairs: Pair[] = []
    for (let attempt = 0; pairs.length < SYSTEMS_MEMORY_PAIRS && attempt < 3000; attempt += 1) {
        const pair = level === 'linear' ? linearPair(random) : level === 'nonlinear' ? nonlinearPair(random) : regionPair(random)
        if (!pair || pairs.some((other) => other.question === pair.question || other.answer === pair.answer)) continue
        pairs.push(pair)
    }
    return shuffle(random, pairs.flatMap((pair, setId) => [
        { id: `${setId}-q`, setId, latex: pair.question, shows: pair.answer, explain: `${pair.question}\\ \\Rightarrow\\ ${pair.answer}` },
        { id: `${setId}-a`, setId, latex: pair.answer, shows: pair.answer, explain: `${pair.question}\\ \\Rightarrow\\ ${pair.answer}` }
    ]))
}
