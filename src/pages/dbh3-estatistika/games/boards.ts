import type { PairCard } from '../../../features/unit-v2/games/pairsMemory.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import { fraction } from '../../../features/unit-v2/math/fraction.ts'
import { percentile } from '../../dbh4-aplikatuak-estatistika/stats.ts'

/* ==========================================================================
   Estatistika eta probabilitatea (3. DBH) memory: a list of data and its
   mean, a list and its median, a bag and a probability. Every card has
   exactly one partner, and the text stays short enough for a card on a
   phone (two lines with gathered).
   ========================================================================== */

export const STATS3_MEMORY_PAIRS = 6

interface MemoryPair {
    question: string
    answer: string
}

const num = (value: number) => String(value).replace('.', '{,}')

function meanPair(random: Random): MemoryPair | null {
    const data = Array.from({ length: 3 }, () => randomInt(random, 1, 12))
    const total = data.reduce((sum, value) => sum + value, 0)
    if (total % 3 !== 0) return null
    return { question: `\\bar{x}:\\ ${data.join(',')}`, answer: String(total / 3) }
}

function medianPair(random: Random): MemoryPair | null {
    const data = Array.from({ length: 4 }, () => randomInt(random, 1, 15))
    const value = percentile(data, 50)
    return { question: `\\begin{gathered}Me\\\\ ${data.join(',')}\\end{gathered}`, answer: num(value) }
}

function bagPair(random: Random): MemoryPair {
    const red = randomInt(random, 1, 5)
    const blue = pick(random, [1, 2, 3, 4, 5, 6, 7])
    const p = fraction(red, red + blue)
    return { question: `\\begin{gathered}${red}\\ R\\\\ ${blue}\\ B\\end{gathered}`, answer: `\\frac{${p.numerator}}{${p.denominator}}` }
}

const generators: Array<(random: Random) => MemoryPair | null> = [meanPair, medianPair, bagPair]

/** Six pairs with different answers, so every card has exactly one partner */
export function createStats3MemoryBoard(random: Random, levelIndex: number): PairCard[] {
    const make = generators[levelIndex] ?? generators[0]
    const pairs: MemoryPair[] = []
    for (let attempt = 0; pairs.length < STATS3_MEMORY_PAIRS && attempt < 5000; attempt += 1) {
        const next = make(random)
        if (!next || pairs.some((other) => other.answer === next.answer || other.question === next.question)) continue
        pairs.push(next)
    }
    return shuffle(random, pairs.flatMap((item, setId) => [
        { id: `${setId}-q`, setId, latex: item.question, shows: item.answer, explain: `${item.question}\\ \\to\\ ${item.answer}` },
        { id: `${setId}-a`, setId, latex: item.answer, shows: item.answer, explain: `${item.question}\\ \\to\\ ${item.answer}` }
    ]))
}
