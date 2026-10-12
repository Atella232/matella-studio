import type { PairCard } from '../../../features/unit-v2/games/pairsMemory.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import { fromRoots, polyLatex } from '../../dbh4-akademikoak-polinomioak/polynomials.ts'
import { flip, ray, relationLatex, RELATIONS, setLatex, span, type Relation } from '../lab/labTools.ts'

/* ==========================================================================
   Ekuazioak eta inekuazioak (4. DBH akademikoak) memory: the sum and the
   product of the roots and their polynomial, a linear inequality and its
   interval, and a quadratic inequality and its interval. Every card has
   exactly one partner, and the text stays short enough for a phone card:
   no coefficient has two digits.
   ========================================================================== */

export const EQUATIONS_MEMORY_PAIRS = 6

export const equationsMemoryLevels = ['sum-product', 'linear', 'quadratic'] as const

/** Braces drop the spacing around signs and relations, so an inequality fits a phone card: x^{2}{-}5x{+}6{<}0 */
const tight = (latex: string) => latex.replace(/(\\le|\\ge|<|>)/g, '{$1}').replace(/([\dx}])([+-])/g, '$1{$2}')

interface Pair {
    question: string
    answer: string
}

function sumProductPair(random: Random): Pair | null {
    const r = randomInt(random, -5, 5)
    const s = randomInt(random, -5, 5)
    const [, b, c] = fromRoots([r, s])
    if (r > s || Math.abs(b) > 9 || Math.abs(c) > 9) return null
    return { question: `\\begin{array}{c}S=${r + s}\\\\P=${r * s}\\end{array}`, answer: polyLatex([1, b, c]) }
}

function linearPair(random: Random): Pair | null {
    const a = pick(random, [-3, -2, -1, 2, 3])
    const end = randomInt(random, -5, 5)
    const b = randomInt(random, -9, 9)
    const relation = pick(random, RELATIONS)
    const c = a * end + b
    if (Math.abs(c) > 9) return null
    const solved: Relation = a < 0 ? flip[relation] : relation
    return { question: tight(`${polyLatex([a, b])}${relationLatex[relation]}${c}`), answer: setLatex([ray(solved, end)]) }
}

function quadraticPair(random: Random): Pair | null {
    const r = randomInt(random, -4, 3)
    const s = randomInt(random, r + 1, 4)
    const [, b, c] = fromRoots([r, s])
    if (Math.abs(b) > 9 || Math.abs(c) > 9) return null
    const closed = randomInt(random, 0, 1) === 1
    return { question: tight(`${polyLatex([1, b, c])}${closed ? '\\le' : '<'}0`), answer: setLatex([span(r, s, closed, closed)]) }
}

/** Six pairs with different questions and answers, so every card has exactly one partner */
export function createEquationsMemoryBoard(random: Random, levelIndex: number): PairCard[] {
    const level = equationsMemoryLevels[levelIndex] ?? 'sum-product'
    const pairs: Pair[] = []
    for (let attempt = 0; pairs.length < EQUATIONS_MEMORY_PAIRS && attempt < 2000; attempt += 1) {
        const pair = level === 'sum-product' ? sumProductPair(random) : level === 'linear' ? linearPair(random) : quadraticPair(random)
        if (!pair || pairs.some((other) => other.question === pair.question || other.answer === pair.answer)) continue
        pairs.push(pair)
    }
    return shuffle(random, pairs.flatMap((pair, setId) => [
        { id: `${setId}-q`, setId, latex: pair.question, shows: pair.answer, explain: `${pair.question}\\ \\Rightarrow\\ ${pair.answer}` },
        { id: `${setId}-a`, setId, latex: pair.answer, shows: pair.answer, explain: `${pair.question}\\ \\Rightarrow\\ ${pair.answer}` }
    ]))
}
