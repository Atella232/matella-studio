import type { PairCard } from '../../../features/unit-v2/games/pairsMemory.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'

/* ==========================================================================
   Segidak (3. DBH) memory: a term of an arithmetic progression and its
   value, a term of a geometric progression and its value, and a sum
   1 + 2 + … + n or 2 + 4 + … + 2n and its value. Every card has exactly
   one partner, and the text stays short enough for a card on a phone.
   ========================================================================== */

export const SEQUENCES_MEMORY_PAIRS = 6

interface MemoryPair {
    question: string
    answer: string
    key: string
}

function arithmeticPair(random: Random): MemoryPair {
    const a1 = randomInt(random, 1, 9)
    const d = randomInt(random, 2, 6)
    const n = randomInt(random, 4, 10)
    const value = a1 + (n - 1) * d
    return { question: `\\begin{gathered}a_{1}=${a1},\\ d=${d}\\\\ a_{${n}}\\end{gathered}`, answer: String(value), key: String(value) }
}

function geometricPair(random: Random): MemoryPair {
    const a1 = randomInt(random, 1, 5)
    const r = pick(random, [2, 3])
    const n = randomInt(random, 3, r === 2 ? 7 : 5)
    const value = a1 * r ** (n - 1)
    return { question: `\\begin{gathered}a_{1}=${a1},\\ r=${r}\\\\ a_{${n}}\\end{gathered}`, answer: String(value), key: String(value) }
}

function sumPair(random: Random): MemoryPair {
    const n = randomInt(random, 4, 20)
    if (random() < 0.5) return { question: `1+2+\\cdots+${n}`, answer: String((n * (n + 1)) / 2), key: String((n * (n + 1)) / 2) }
    return { question: `2+4+\\cdots+${2 * n}`, answer: String(n * (n + 1)), key: String(n * (n + 1)) }
}

const generators = [arithmeticPair, geometricPair, sumPair]

/** Six pairs with different answers, so every card has exactly one partner */
export function createSequencesMemoryBoard(random: Random, levelIndex: number): PairCard[] {
    const make = generators[levelIndex] ?? generators[0]
    const pairs: MemoryPair[] = []
    for (let attempt = 0; pairs.length < SEQUENCES_MEMORY_PAIRS && attempt < 3000; attempt += 1) {
        const pair = make(random)
        if (pairs.some((other) => other.key === pair.key || other.question === pair.question)) continue
        pairs.push(pair)
    }
    return shuffle(random, pairs.flatMap((pair, setId) => [
        { id: `${setId}-q`, setId, latex: pair.question, shows: pair.answer, explain: `${pair.question}\\ \\Rightarrow\\ ${pair.answer}` },
        { id: `${setId}-a`, setId, latex: pair.answer, shows: pair.answer, explain: `${pair.question}\\ \\Rightarrow\\ ${pair.answer}` }
    ]))
}
