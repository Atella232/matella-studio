import type { PairCard } from '../../../features/unit-v2/games/pairsMemory.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'

/* ==========================================================================
   Ekuazioak eta sistemak (3. DBH) memory: a first-degree equation and its
   solution, a quadratic equation and its solutions, and a system and its
   pair. Every card has exactly one partner, and the text stays short
   enough for a card on a phone.
   ========================================================================== */

export const EQUATIONS3_MEMORY_PAIRS = 6

interface MemoryPair {
    question: string
    answer: string
}

const term = (k: number) => (k === 1 ? 'x' : `${k}x`)

function linearPair(random: Random): MemoryPair {
    const x = randomInt(random, -6, 9)
    const a = randomInt(random, 2, 5)
    const b = randomInt(random, 1, 9)
    return { question: `${term(a)}+${b}=${a * x + b}`, answer: `x=${x}` }
}

function quadraticPair(random: Random): MemoryPair {
    const n = randomInt(random, 1, 9)
    return pick(random, [
        { question: `x^{2}=${n * n}`, answer: `x=\\pm ${n}` },
        { question: `x^{2}-${n}x=0`, answer: `x=0,\\ x=${n}` },
        { question: `x^{2}+${n}x=0`, answer: `x=0,\\ x=-${n}` }
    ])
}

function systemPair(random: Random): MemoryPair {
    const x = randomInt(random, 1, 7)
    const y = randomInt(random, 0, 6)
    // Two lines, so that the card stays narrow on a phone
    return { question: `\\begin{gathered}x+y=${x + y}\\\\ x-y=${x - y}\\end{gathered}`, answer: `(${x},${y})` }
}

const generators = [linearPair, quadraticPair, systemPair]

/** Six pairs with different answers, so every card has exactly one partner */
export function createEquations3MemoryBoard(random: Random, levelIndex: number): PairCard[] {
    const make = generators[levelIndex] ?? generators[0]
    const pairs: MemoryPair[] = []
    for (let attempt = 0; pairs.length < EQUATIONS3_MEMORY_PAIRS && attempt < 3000; attempt += 1) {
        const pair = make(random)
        if (pairs.some((other) => other.answer === pair.answer || other.question === pair.question)) continue
        pairs.push(pair)
    }
    return shuffle(random, pairs.flatMap((pair, setId) => [
        { id: `${setId}-q`, setId, latex: pair.question, shows: pair.answer, explain: `${pair.question}\\ \\to\\ ${pair.answer}` },
        { id: `${setId}-a`, setId, latex: pair.answer, shows: pair.answer, explain: `${pair.question}\\ \\to\\ ${pair.answer}` }
    ]))
}
