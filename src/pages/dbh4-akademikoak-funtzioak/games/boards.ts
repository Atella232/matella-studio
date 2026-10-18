import type { PairCard } from '../../../features/unit-v2/games/pairsMemory.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import { intervalLatex, polynomialLatex, withoutLatex } from './race.ts'

/* ==========================================================================
   Funtzioak (4. DBH akademikoak) memory: a function and its domain (a
   fraction, a root, a root the other way round, a root in the
   denominator), a quadratic and one of its images, and a quadratic on an
   interval and its T.V.M. Cards carry formulas only, so they read the
   same in every language. Every card has exactly one partner, and the
   text stays short enough for a phone card.
   ========================================================================== */

export const FUNCTIONS_AK_MEMORY_PAIRS = 6

export const functionsAkMemoryLevels = ['domains', 'images', 'rates'] as const

interface Pair2 {
    question: string
    answer: string
}

const lines = (...rows: string[]) => `\\begin{array}{c}${rows.join('\\\\')}\\end{array}`

function domainPair(random: Random): Pair2 {
    const p = randomInt(random, -5, 5)
    const kind = pick(random, ['root', 'reverse', 'fraction', 'denominator'] as const)
    const linear = polynomialLatex([1, -p])
    if (kind === 'root') return { question: `\\sqrt{${linear}}`, answer: intervalLatex(p, 'inf', true) }
    if (kind === 'reverse') return { question: `\\sqrt{${polynomialLatex([-1, p])}}`, answer: intervalLatex('-inf', p, false, true) }
    if (kind === 'fraction') return { question: `\\frac{1}{${linear}}`, answer: withoutLatex([p]) }
    return { question: `\\frac{1}{\\sqrt{${linear}}}`, answer: intervalLatex(p, 'inf') }
}

function imagePair(random: Random): Pair2 {
    const b = randomInt(random, -4, 4)
    const c = randomInt(random, -3, 3)
    const x = randomInt(random, -3, 3)
    return { question: `\\small ${lines(polynomialLatex([1, b, c]), `f(${x})`)}`, answer: String(x * x + b * x + c) }
}

function ratePair(random: Random): Pair2 {
    const b = randomInt(random, -3, 3)
    const from = randomInt(random, -3, 2)
    const to = from + randomInt(random, 1, 3)
    // (to² − from²) / (to − from) + b
    return { question: lines(polynomialLatex([1, b, 0]), `[${from},\\,${to}]`), answer: String(from + to + b) }
}

/** Six pairs with different questions and answers, so every card has exactly one partner */
export function createFunctionsAkMemoryBoard(random: Random, levelIndex: number): PairCard[] {
    const level = functionsAkMemoryLevels[levelIndex] ?? 'domains'
    const pairs: Pair2[] = []
    for (let attempt = 0; pairs.length < FUNCTIONS_AK_MEMORY_PAIRS && attempt < 3000; attempt += 1) {
        const pair = level === 'domains' ? domainPair(random) : level === 'images' ? imagePair(random) : ratePair(random)
        if (pairs.some((other) => other.question === pair.question || other.answer === pair.answer)) continue
        pairs.push(pair)
    }
    return shuffle(random, pairs.flatMap((pair, setId) => [
        { id: `${setId}-q`, setId, latex: pair.question, shows: pair.answer, explain: `${pair.question}\\ \\Rightarrow\\ ${pair.answer}` },
        { id: `${setId}-a`, setId, latex: pair.answer, shows: pair.answer, explain: `${pair.question}\\ \\Rightarrow\\ ${pair.answer}` }
    ]))
}
