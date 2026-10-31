import type { PairCard } from '../../../features/unit-v2/games/pairsMemory.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'

/* ==========================================================================
   Proportzionaltasuna (3. DBH) memory: a proportion and its missing term,
   a percentage change and its index (+20 % ↔ 1,2, −35 % ↔ 0,65), and a
   percentage of a quantity and its value. Every card has exactly one
   partner, and the text stays short enough for a card on a phone.
   ========================================================================== */

export const PROPORTION3_MEMORY_PAIRS = 6

export interface MemoryPair {
    question: string
    answer: string
    key: string
}

const dec = (value: number) => String(Math.round(value * 1000) / 1000).replace('.', '{,}')

function proportionPair(random: Random): MemoryPair | null {
    const a = randomInt(random, 2, 9)
    const b = randomInt(random, 2, 9)
    const k = pick(random, [2, 3, 4, 5])
    if (a === b) return null
    return { question: `\\frac{${a}}{${b}}=\\frac{${a * k}}{x}`, answer: String(b * k), key: String(b * k) }
}

function indexPair(random: Random): MemoryPair | null {
    const rate = pick(random, [5, 10, 15, 20, 25, 30, 35, 40, 50, 60, 75])
    const up = random() < 0.5
    const index = (up ? 100 + rate : 100 - rate) / 100
    return { question: `${up ? '+' : '-'}${rate}\\,\\%`, answer: dec(index), key: dec(index) }
}

function percentPair(random: Random): MemoryPair | null {
    const rate = pick(random, [5, 10, 15, 20, 25, 30, 40, 50, 75])
    const amount = pick(random, [20, 40, 60, 80, 120, 200, 300, 400])
    const value = (rate * amount) / 100
    if (!Number.isInteger(value)) return null
    return { question: `${rate}\\,\\%\\cdot ${amount}`, answer: String(value), key: String(value) }
}

const generators: Array<(random: Random) => MemoryPair | null> = [proportionPair, indexPair, percentPair]

/** Six pairs with different answers, so every card has exactly one partner */
export function createProportion3MemoryBoard(random: Random, levelIndex: number): PairCard[] {
    const make = generators[levelIndex] ?? generators[0]
    const pairs: MemoryPair[] = []
    for (let attempt = 0; pairs.length < PROPORTION3_MEMORY_PAIRS && attempt < 3000; attempt += 1) {
        const pair = make(random)
        if (!pair || pairs.some((other) => other.key === pair.key || other.question === pair.question)) continue
        pairs.push(pair)
    }
    return shuffle(random, pairs.flatMap((pair, setId) => [
        { id: `${setId}-q`, setId, latex: pair.question, shows: pair.answer, explain: `${pair.question}\\ \\Rightarrow\\ ${pair.answer}` },
        { id: `${setId}-a`, setId, latex: pair.answer, shows: pair.answer, explain: `${pair.question}\\ \\Rightarrow\\ ${pair.answer}` }
    ]))
}
