import type { PairCard } from '../../../features/unit-v2/games/pairsMemory.ts'
import { randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'

/* ==========================================================================
   Deribatuak (Batxilergoa 2 · Zientziak) memory: a composite function and
   its derivative, a successive derivative and its result, and a curve
   given by an equation and its y′. Every card has exactly one partner
   (each board takes a template at most once, so no two answers are the
   same), and there are no sines or arcs: the cards are not translated,
   and Spanish writes sen and arctg.
   ========================================================================== */

export const BACH2_DERIVATIVES_MEMORY_PAIRS = 6

export const bach2DerivativesMemoryLevels = ['chain', 'higher', 'implicit'] as const

interface Pair {
    question: string
    answer: string
}

const CHAIN: Array<(random: Random) => Pair> = [
    (random) => { const k = randomInt(random, 2, 4); return { question: `e^{${k}x^2}`, answer: `${2 * k}x\\,e^{${k}x^2}` } },
    (random) => { const c = randomInt(random, 1, 9); return { question: `\\ln(x^2+${c})`, answer: `\\frac{2x}{x^2+${c}}` } },
    (random) => { const a = randomInt(random, 2, 4); const n = randomInt(random, 3, 5); return { question: `(${a}x+1)^{${n}}`, answer: `${n * a}(${a}x+1)^{${n - 1}}` } },
    (random) => { const c = randomInt(random, 1, 9); return { question: `\\sqrt{x^2+${c}}`, answer: `\\frac{x}{\\sqrt{x^2+${c}}}` } },
    () => ({ question: 'e^{\\sqrt{x}}', answer: '\\frac{e^{\\sqrt{x}}}{2\\sqrt{x}}' }),
    () => ({ question: '\\ln(\\ln x)', answer: '\\frac{1}{x\\ln x}' }),
    (random) => { const n = randomInt(random, 2, 4); return { question: `(\\ln x)^{${n}}`, answer: `\\frac{${n}(\\ln x)^{${n - 1}}}{x}`.replace('^{1}', '') } },
    (random) => { const k = randomInt(random, 2, 6); return { question: `e^{${k}x}`, answer: `${k}e^{${k}x}` } }
]

const HIGHER: Array<(random: Random) => Pair> = [
    (random) => { const k = randomInt(random, 2, 4); return { question: `(e^{${k}x})''`, answer: `${k * k}e^{${k}x}` } },
    (random) => { const n = randomInt(random, 4, 6); return { question: `(x^{${n}})'''`, answer: `${n * (n - 1) * (n - 2)}x^{${n - 3}}`.replace('x^{1}', 'x') } },
    () => ({ question: "\\left(\\frac{1}{x}\\right)''", answer: '\\frac{2}{x^3}' }),
    () => ({ question: "(\\ln x)''", answer: '-\\frac{1}{x^2}' }),
    () => ({ question: "(x\\,e^x)''", answer: '(x+2)e^x' }),
    (random) => { const n = randomInt(random, 3, 6); return { question: `(e^{-x})^{(${n})}`, answer: n % 2 === 0 ? 'e^{-x}' : '-e^{-x}' } },
    () => ({ question: "(\\sqrt{x})''", answer: '-\\frac{1}{4x\\sqrt{x}}' }),
    () => ({ question: "(x^2e^x)'", answer: '(x^2+2x)e^x' })
]

const IMPLICIT: Array<(random: Random) => Pair> = [
    (random) => ({ question: `x^2+y^2=${randomInt(random, 2, 9) ** 2}`, answer: '-\\frac{x}{y}' }),
    (random) => ({ question: `xy=${randomInt(random, 2, 9)}`, answer: '-\\frac{y}{x}' }),
    (random) => { const c = randomInt(random, 2, 9); return { question: `y^2=${c}x`, answer: `\\frac{${c}}{2y}` } },
    (random) => ({ question: `x^2-y^2=${randomInt(random, 1, 9)}`, answer: '\\frac{x}{y}' }),
    (random) => { const k = randomInt(random, 2, 5); return { question: `x^2+${k}y^2=${randomInt(random, 5, 20)}`, answer: `-\\frac{x}{${k}y}` } },
    (random) => ({ question: `x^3+y^3=${randomInt(random, 2, 9)}`, answer: '-\\frac{x^2}{y^2}' }),
    () => ({ question: 'e^y=x', answer: '\\frac{1}{e^y}' }),
    () => ({ question: 'y^3=x', answer: '\\frac{1}{3y^2}' })
]

const TEMPLATES = { chain: CHAIN, higher: HIGHER, implicit: IMPLICIT }

/** Six pairs of one level, from six different templates */
export function createBach2DerivativesMemoryBoard(random: Random, levelIndex: number): PairCard[] {
    const level = bach2DerivativesMemoryLevels[levelIndex] ?? 'chain'
    const pairs = shuffle(random, TEMPLATES[level]).slice(0, BACH2_DERIVATIVES_MEMORY_PAIRS).map((make) => make(random))
    const explain = (pair: Pair) => (level === 'implicit' ? `${pair.question}\\ \\to\\ y'=${pair.answer}` : level === 'higher' ? `${pair.question}=${pair.answer}` : `\\left(${pair.question}\\right)'=${pair.answer}`)
    return shuffle(random, pairs.flatMap((pair, setId) => [
        { id: `${setId}-q`, setId, latex: pair.question, shows: pair.answer, explain: explain(pair) },
        { id: `${setId}-a`, setId, latex: level === 'implicit' ? `y'=${pair.answer}` : pair.answer, shows: pair.answer, explain: explain(pair) }
    ]))
}
