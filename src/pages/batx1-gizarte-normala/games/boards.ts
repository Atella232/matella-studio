import type { PairCard } from '../../../features/unit-v2/games/pairsMemory.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import { above, between, tableLatex, zLatex } from '../../batx2-zientziak-banaketak/normal.ts'

/* ==========================================================================
   Normala (Batxilergoa 1 · Gizarte Zientziak) memory: an interval of a
   normal in whole σ (stacked with its normal) and its percentage; a
   probability above a value and its number from the table; and a normal
   with a value x, stacked, and its standard score z. Every card has
   exactly one partner, and each one stays short enough for a phone card.
   ========================================================================== */

export const NORMAL_BATX1G_MEMORY_PAIRS = 6

export const normalBatx1gMemoryLevels = ['rule', 'table', 'score'] as const

interface Pair {
    question: string
    answer: string
}

const stacked = (top: string, bottom: string) => `\\begin{array}{c}${top}\\\\ ${bottom}\\end{array}`
/** Hundredths of a percent for LaTeX */
const percentLatex = (tenThousandths: number) => `${String(tenThousandths / 100).replace('.', '{,}')}\\,\\%`

const RULE: Array<[number | null, number | null]> = [[-1, 1], [-2, 2], [-3, 3], [0, 1], [0, 2], [1, null], [null, -2], [-1, 2], [-2, 1], [2, null], [0, 3], [-3, 0]]

function rulePair(random: Random): Pair {
    const sd = pick(random, [2, 5, 10])
    const mean = 10 * randomInt(random, 5, 15)
    const [from, to] = pick(random, RULE)
    const share = between(from ?? -8, to ?? 8)
    const a = from === null ? null : mean + from * sd
    const b = to === null ? null : mean + to * sd
    const interval = a === null ? `X\\le ${b}` : b === null ? `X\\ge ${a}` : `${a}\\le X\\le ${b}`
    return { question: stacked(`N(${mean};\\,${sd})`, interval), answer: percentLatex(share) }
}

function tablePair(random: Random): Pair {
    const k = randomInt(random, 2, 25) / 10
    return { question: `P(Z>${zLatex(k)})`, answer: tableLatex(above(k)) }
}

function scorePair(random: Random): Pair {
    const sd = pick(random, [2, 4, 5, 10])
    const mean = 10 * randomInt(random, 2, 9)
    const steps = randomInt(random, -8, 8)
    return { question: stacked(`N(${mean};\\,${sd})`, `x=${mean + steps}`), answer: `{z}=${zLatex(steps / sd)}` }
}

/** Six pairs with different questions and answers, so every card has exactly one partner */
export function createNormalBatx1gMemoryBoard(random: Random, levelIndex: number): PairCard[] {
    const level = normalBatx1gMemoryLevels[levelIndex] ?? 'rule'
    const pairs: Pair[] = []
    for (let attempt = 0; pairs.length < NORMAL_BATX1G_MEMORY_PAIRS && attempt < 3000; attempt += 1) {
        const pair = level === 'rule' ? rulePair(random) : level === 'table' ? tablePair(random) : scorePair(random)
        if (pairs.some((other) => other.question === pair.question || other.answer === pair.answer)) continue
        pairs.push(pair)
    }
    return shuffle(random, pairs.flatMap((pair, setId) => [
        { id: `${setId}-q`, setId, latex: pair.question, shows: pair.answer, explain: `${pair.question}\\ \\Rightarrow\\ ${pair.answer}` },
        { id: `${setId}-a`, setId, latex: pair.answer, shows: pair.answer, explain: `${pair.question}\\ \\Rightarrow\\ ${pair.answer}` }
    ]))
}
