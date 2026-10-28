import type { PairCard } from '../../../features/unit-v2/games/pairsMemory.ts'
import { pick, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'

/* ==========================================================================
   Proportzionaltasuna (4. DBH aplikatuak) memory, three boards of its own:
   a price after a change and the price before it (−20 % over ? → 40, and 50),
   an annual rate shared out over k periods and the index of each period
   (1 + 0,08 / 4 and 1,02), and a capital after a few years of
   compound interest and the amount it becomes. Every card has exactly one
   partner.
   ========================================================================== */

export const PROPORTION_DBH4AP_MEMORY_PAIRS = 6

export const proportionDbh4ApMemoryLevels = ['back', 'periods', 'growth'] as const

/** A number of hundredths as a decimal in LaTeX: 110 → 1{,}1 */
const hundredths = (value: number) => (value / 100).toString().replace('.', '{,}')

interface Pair {
    question: string
    answer: string
    /** The value the two cards share, to keep pairs apart */
    key: number
    /** The worked line shown when the pair is found */
    explain: string
    /** The kind of pair (the change, the periods a year, the index): no more than two of a kind on a board */
    kind: number
}

/** Changes and prices before them that give a whole number of euros after: −20 % and 50 give 40 */
const BACK_PRICES = [-50, -40, -30, -25, -20, -10, 10, 20, 21, 25, 50].flatMap((change) => [20, 30, 40, 50, 60, 80, 100, 120, 150, 200].filter((before) => Number.isInteger((before * (100 + change)) / 100)).map((before) => [change, before] as const))

/** The price after a change, and the price before it: the change over «? → 40» (side by side it is too wide for a card on a phone), and 50 */
const backPair = (random: Random): Pair => {
    const [change, before] = pick(random, BACK_PRICES)
    const after = (before * (100 + change)) / 100
    return {
        question: `\\overset{\\textstyle ${change > 0 ? '+' : '-'}${Math.abs(change)}\\,\\%}{?\\to ${after}}`,
        answer: String(before),
        key: before,
        explain: `${after}\\mathbin{:}${hundredths(100 + change)}=${before}`,
        kind: change
    }
}

/** Annual rates and periods a year whose rate per period is a whole number of quarters of a point (3 % monthly is 0,25 %) */
const PERIOD_RATES = [2, 3, 4, 12].flatMap((periods) => [2, 3, 4, 5, 6, 8, 9, 10, 12, 18, 24].filter((rate) => Number.isInteger((rate * 4) / periods)).map((rate) => [rate, periods] as const))

/** An annual rate paid k times a year, and the index of each period: 1 + 0,08 / 4 and 1,02 (the rate as a decimal keeps «/ 12» narrow) */
const periodPair = (random: Random): Pair => {
    const [rate, periods] = pick(random, PERIOD_RATES)
    const index = (10000 + (rate * 100) / periods) / 10000
    const share = String(rate / periods).replace('.', '{,}')
    const value = String(index).replace('.', '{,}')
    return { question: `1+\\frac{${hundredths(rate)}}{${periods}}`, answer: value, key: index, explain: `\\frac{${rate}\\,\\%}{${periods}}=${share}\\,\\%\\ \\to\\ ${value}`, kind: periods }
}

/** C · index^t with every value exact: the capital, the index in hundredths and two or three years */
const growthPair = (random: Random): Pair => {
    const capital = pick(random, [100, 200, 500, 1000])
    const index = pick(random, [110, 120, 150, 200, 90, 80, 50])
    const years = pick(random, [2, 3])
    const value = (capital * index ** years) / 100 ** years
    const question = `${capital}\\cdot ${hundredths(index)}^{${years}}`
    const answer = String(value).replace('.', '{,}')
    return { question, answer, key: value, explain: `${question}=${answer}`, kind: index }
}

const makers = { back: backPair, periods: periodPair, growth: growthPair }

/** Six pairs with different values, so every card has exactly one partner, and at least three kinds of pair */
export function createProportionDbh4ApMemoryBoard(random: Random, levelIndex: number): PairCard[] {
    const make = makers[proportionDbh4ApMemoryLevels[levelIndex] ?? 'back']
    const pairs: Pair[] = []
    for (let attempt = 0; pairs.length < PROPORTION_DBH4AP_MEMORY_PAIRS && attempt < 500; attempt += 1) {
        const pair = make(random)
        if (pairs.some((other) => other.key === pair.key || other.question === pair.question)) continue
        if (pairs.filter((other) => other.kind === pair.kind).length >= 2) continue
        pairs.push(pair)
    }
    return shuffle(random, pairs.flatMap((pair, setId) => [
        { id: `${setId}-q`, setId, latex: pair.question, shows: pair.answer, explain: pair.explain },
        { id: `${setId}-a`, setId, latex: pair.answer, shows: pair.answer, explain: pair.explain }
    ]))
}
