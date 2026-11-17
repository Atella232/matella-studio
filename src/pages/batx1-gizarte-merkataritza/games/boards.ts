import type { PairCard } from '../../../features/unit-v2/games/pairsMemory.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'

/* ==========================================================================
   Merkataritza-aritmetika (Batxilergoa 1 · Gizarte Zientziak) memory: a
   percentage and its index, a growth factor and its value, and a
   geometric sum and its result. Every card has exactly one partner.
   ========================================================================== */

export const GIZ_MONEY_MEMORY_PAIRS = 6

export const gizMoneyMemoryLevels = ['index', 'factor', 'sum'] as const

interface Pair {
    question: string
    answer: string
    key: string
}

const dec = (value: number, places: number) => (Math.round(value * 10 ** places) / 10 ** places).toString().replace('.', '{,}')

function indexPair(random: Random): Pair {
    const percent = pick(random, [5, 8, 10, 12, 15, 20, 25, 30, 35, 40, 60, 75])
    const up = random() < 0.5
    const index = up ? 1 + percent / 100 : 1 - percent / 100
    return { question: `${up ? '+' : '-'}${percent}\\,\\%`, answer: dec(index, 2), key: dec(index, 2) }
}

function factorPair(random: Random): Pair {
    const rate = pick(random, [1, 2, 3, 4, 5, 10])
    const power = randomInt(random, 2, 3)
    const base = 1 + rate / 100
    return { question: `${dec(base, 2)}^{${power}}`, answer: dec(base ** power, 6), key: `${rate}^${power}` }
}

function sumPair(random: Random): Pair {
    const first = randomInt(random, 1, 5)
    const ratio = pick(random, [2, 3])
    const terms = randomInt(random, 3, 4)
    const list = Array.from({ length: terms }, (_, index) => first * ratio ** index)
    const total = list.reduce((sum, value) => sum + value, 0)
    return { question: list.join('+'), answer: String(total), key: String(total) }
}

/** Six pairs with different answers, so every card has exactly one partner */
export function createGizMoneyMemoryBoard(random: Random, levelIndex: number): PairCard[] {
    const level = gizMoneyMemoryLevels[levelIndex] ?? 'index'
    const pairs: Pair[] = []
    for (let attempt = 0; pairs.length < GIZ_MONEY_MEMORY_PAIRS && attempt < 2000; attempt += 1) {
        const pair = level === 'index' ? indexPair(random) : level === 'factor' ? factorPair(random) : sumPair(random)
        if (pairs.some((other) => other.key === pair.key || other.question === pair.question || other.answer === pair.answer)) continue
        pairs.push(pair)
    }
    return shuffle(random, pairs.flatMap((pair, setId) => [
        { id: `${setId}-q`, setId, latex: pair.question, shows: pair.answer, explain: `${pair.question}\\ \\to\\ ${pair.answer}` },
        { id: `${setId}-a`, setId, latex: pair.answer, shows: pair.answer, explain: `${pair.question}\\ \\to\\ ${pair.answer}` }
    ]))
}
