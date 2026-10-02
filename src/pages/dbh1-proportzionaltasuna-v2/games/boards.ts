import type { PairCard } from '../../../features/unit-v2/games/pairsMemory.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'

/* ==========================================================================
   Proportzionaltasuna (1. DBH) memory: a percentage and its fraction or
   decimal, a percentage of a quantity and its value, and a proportion and
   its x. Every card has exactly one partner.
   ========================================================================== */

export const PROPORTION_MEMORY_PAIRS = 6

export const proportionMemoryLevels = ['percent-forms', 'percent-of', 'proportion'] as const

interface Pair {
    question: string
    answer: string
    /** The shared value, to tell pairs apart */
    key: number
}

const forms: Array<[number, string]> = [
    [50, '\\frac{1}{2}'], [25, '\\frac{1}{4}'], [75, '\\frac{3}{4}'], [10, '\\frac{1}{10}'], [20, '\\frac{1}{5}'], [40, '\\frac{2}{5}'],
    [5, '0{,}05'], [9, '0{,}09'], [85, '0{,}85'], [30, '0{,}3'], [60, '0{,}6'], [15, '0{,}15'], [1, '0{,}01'], [100, '1']
]

function formsPair(random: Random): Pair {
    const [percent, form] = pick(random, forms)
    return { question: `${percent}\\,\\%`, answer: form, key: percent }
}

function percentOfPair(random: Random): Pair {
    const percent = pick(random, [10, 20, 25, 50, 75, 5, 30])
    const quantity = randomInt(random, 1, 12) * 20
    const value = (quantity * percent) / 100
    return { question: `${percent}\\,\\%\\cdot ${quantity}`, answer: String(value).replace('.', '{,}'), key: value }
}

function proportionPair(random: Random): Pair {
    const a = randomInt(random, 2, 6)
    const k = randomInt(random, 2, 4)
    const c = randomInt(random, 2, 9)
    if (c === a) return proportionPair(random)
    return { question: `\\frac{${a}}{${a * k}}=\\frac{${c}}{x}`, answer: `x=${c * k}`, key: c * k }
}

const makers = { 'percent-forms': formsPair, 'percent-of': percentOfPair, proportion: proportionPair }

/** Six pairs with different values, so every card has exactly one partner */
export function createProportionMemoryBoard(random: Random, levelIndex: number): PairCard[] {
    const make = makers[proportionMemoryLevels[levelIndex]]
    const pairs: Pair[] = []
    for (let attempt = 0; pairs.length < PROPORTION_MEMORY_PAIRS && attempt < 500; attempt += 1) {
        const pair = make(random)
        if (pairs.some((other) => other.key === pair.key || other.question === pair.question)) continue
        pairs.push(pair)
    }
    return shuffle(random, pairs.flatMap((pair, setId) => [
        { id: `${setId}-q`, setId, latex: pair.question, shows: pair.answer, explain: `${pair.question}\\ \\to\\ ${pair.answer}` },
        { id: `${setId}-a`, setId, latex: pair.answer, shows: pair.answer, explain: `${pair.question}\\ \\to\\ ${pair.answer}` }
    ]))
}
