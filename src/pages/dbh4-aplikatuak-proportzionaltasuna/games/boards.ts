import type { PairCard } from '../../../features/unit-v2/games/pairsMemory.ts'
import { pick, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import { createProportionDbh2MemoryBoard } from '../../dbh2-proportzionaltasuna-v2/games/boards.ts'

/* ==========================================================================
   Proportzionaltasuna (4. DBH aplikatuak) memory: a change and its index,
   two chained indices and the total index (both from 2. DBH), and a
   capital after a few years of compound interest and the amount it
   becomes. Every card has exactly one partner.
   ========================================================================== */

export const PROPORTION_DBH4AP_MEMORY_PAIRS = 6

export const proportionDbh4ApMemoryLevels = ['index', 'chained', 'growth'] as const

/** A number of hundredths as a decimal in LaTeX: 110 → 1{,}1 */
const hundredths = (value: number) => (value / 100).toString().replace('.', '{,}')

interface Pair {
    question: string
    answer: string
    key: number
}

/** C · index^t with every value exact: the capital, the index in hundredths and two or three years */
const growthPair = (random: Random): Pair => {
    const capital = pick(random, [100, 200, 500, 1000])
    const index = pick(random, [110, 120, 150, 200, 90, 80, 50])
    const years = pick(random, [2, 3])
    const value = (capital * index ** years) / 100 ** years
    return { question: `${capital}\\cdot ${hundredths(index)}^{${years}}`, answer: String(value).replace('.', '{,}'), key: value }
}

function growthBoard(random: Random): PairCard[] {
    const pairs: Pair[] = []
    for (let attempt = 0; pairs.length < PROPORTION_DBH4AP_MEMORY_PAIRS && attempt < 500; attempt += 1) {
        const pair = growthPair(random)
        if (pairs.some((other) => other.key === pair.key || other.question === pair.question)) continue
        pairs.push(pair)
    }
    return shuffle(random, pairs.flatMap((pair, setId) => [
        { id: `${setId}-q`, setId, latex: pair.question, shows: pair.answer, explain: `${pair.question}=${pair.answer}` },
        { id: `${setId}-a`, setId, latex: pair.answer, shows: pair.answer, explain: `${pair.question}=${pair.answer}` }
    ]))
}

/** Six pairs with different values; the first two levels are the 2. DBH boards */
export function createProportionDbh4ApMemoryBoard(random: Random, levelIndex: number): PairCard[] {
    const level = proportionDbh4ApMemoryLevels[levelIndex] ?? 'index'
    if (level === 'growth') return growthBoard(random)
    return createProportionDbh2MemoryBoard(random, level === 'index' ? 1 : 2)
}
