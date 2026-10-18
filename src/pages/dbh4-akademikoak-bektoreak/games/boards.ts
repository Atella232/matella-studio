import type { PairCard } from '../../../features/unit-v2/games/pairsMemory.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import { fraction } from '../../../features/unit-v2/math/fraction.ts'
import { circleLatex, explicitLatex, generalLatex, pairLatex, type Pair } from './race.ts'

/* ==========================================================================
   Bektoreak eta zuzenak (4. DBH akademikoak) memory: two points and the
   vector between them, a line in general form and the same line in
   explicit form, and the equation of a circle and its centre and radius.
   Cards carry formulas only, so they read the same in every language.
   Every card has exactly one partner, and the text stays short enough for
   a phone card.
   ========================================================================== */

export const VECTORS_MEMORY_PAIRS = 6

export const vectorsMemoryLevels = ['vectors', 'equations', 'circles'] as const

interface Pair2 {
    question: string
    answer: string
}

const lines = (...rows: string[]) => `\\begin{array}{c}${rows.join('\\\\')}\\end{array}`
const point = (random: Random): Pair => [randomInt(random, -5, 5), randomInt(random, -5, 5)]

function vectorPair(random: Random): Pair2 | null {
    const a = point(random)
    const b = point(random)
    if (a[0] === b[0] && a[1] === b[1]) return null
    return { question: lines(`A${pairLatex(a)}`, `B${pairLatex(b)}`), answer: lines('\\vec{AB}', pairLatex([b[0] - a[0], b[1] - a[1]])) }
}

function equationPair(random: Random): Pair2 {
    // y = (p/q)x + n  ⇔  p x − q y + q n = 0, written with A > 0
    const q = pick(random, [1, 1, 2, 3])
    const p = pick(random, [-3, -2, -1, 1, 2, 3].filter((value) => q === 1 || Math.abs(value) % q !== 0))
    const n = randomInt(random, -5, 5)
    const sign = p < 0 ? -1 : 1
    const general = generalLatex(sign * p, -sign * q, sign * q * n)
    // Two lines on the card: 3x-2y / +8=0
    const split = general.search(/[+-][^+-]*=0$/)
    return { question: split > 0 ? lines(general.slice(0, split), general.slice(split)) : general, answer: explicitLatex(fraction(p, q), fraction(n)) }
}

function circlePair(random: Random): Pair2 {
    const a = randomInt(random, -4, 4)
    const b = randomInt(random, -4, 4)
    const r = randomInt(random, 1, 6)
    const equation = circleLatex(a, b, r * r)
    // Two short lines on the card: (x-2)^2+ / (y+1)^2=9
    const split = equation.indexOf('+', equation.indexOf('^{2}')) + 1
    return { question: `\\small ${lines(equation.slice(0, split), equation.slice(split))}`, answer: lines(`C${pairLatex([a, b])}`, `r=${r}`) }
}

/** Six pairs with different questions and answers, so every card has exactly one partner */
export function createVectorsMemoryBoard(random: Random, levelIndex: number): PairCard[] {
    const level = vectorsMemoryLevels[levelIndex] ?? 'vectors'
    const pairs: Pair2[] = []
    for (let attempt = 0; pairs.length < VECTORS_MEMORY_PAIRS && attempt < 3000; attempt += 1) {
        const pair = level === 'vectors' ? vectorPair(random) : level === 'equations' ? equationPair(random) : circlePair(random)
        if (!pair || pairs.some((other) => other.question === pair.question || other.answer === pair.answer)) continue
        pairs.push(pair)
    }
    return shuffle(random, pairs.flatMap((pair, setId) => [
        { id: `${setId}-q`, setId, latex: pair.question, shows: pair.answer, explain: `${pair.question}\\ \\Rightarrow\\ ${pair.answer}` },
        { id: `${setId}-a`, setId, latex: pair.answer, shows: pair.answer, explain: `${pair.question}\\ \\Rightarrow\\ ${pair.answer}` }
    ]))
}
