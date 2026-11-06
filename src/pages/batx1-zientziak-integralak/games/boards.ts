import type { PairCard } from '../../../features/unit-v2/games/pairsMemory.ts'
import { pick, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'

/* ==========================================================================
   Integralak (Batxilergoa 1 · Zientziak) memory: a function and its
   antiderivative, or a definite integral and its value. Level 1, powers:
   c·xⁿ and (c/(n + 1))·xⁿ⁺¹; level 2, basic and composite integrals
   (e^(ax), a/x, aˣ, u′/u…); level 3, definite integrals. The constant k
   is left out of the cards (it goes in the explanation), every card has
   exactly one partner, and the text stays narrow enough for a card at
   375 px: no sin or tan, which each language writes in its own way.
   ========================================================================== */

export const BACH_INTEGRALS_MEMORY_PAIRS = 6

export const bachIntegralsMemoryLevels = ['powers', 'basic', 'definite'] as const

interface Pair {
    question: string
    answer: string
    explain: string
}

const coefficient = (value: number) => (value === 1 ? '' : String(value))

function powerPair(random: Random): Pair {
    const n = pick(random, [1, 2, 3, 4, 5])
    const m = pick(random, [1, 2, 3])
    const c = m * (n + 1)
    const question = `${c}x${n === 1 ? '' : `^${n}`}`
    const answer = `${coefficient(m)}x^${n + 1}`
    return { question, answer, explain: `\\int ${question}\\,dx=${answer}+k` }
}

const BASIC: Array<[string, string]> = [
    ['e^{2x}', '\\frac{e^{2x}}{2}'],
    ['e^{-x}', '-e^{-x}'],
    ['3e^{3x}', 'e^{3x}'],
    ['\\frac{1}{x}', '\\ln|x|'],
    ['\\frac{2}{x}', '2\\ln|x|'],
    ['\\frac{3}{x}', '3\\ln|x|'],
    ['2^x', '\\frac{2^x}{\\ln 2}'],
    ['2x\\,e^{x^2}', 'e^{x^2}'],
    ['e^{3x}', '\\frac{e^{3x}}{3}'],
    ['\\frac{1}{x^2}', '-\\frac{1}{x}'],
    ['\\frac{1}{2\\sqrt{x}}', '\\sqrt{x}']
]

function basicPair(random: Random): Pair {
    const [question, answer] = pick(random, BASIC)
    return { question, answer, explain: `\\int ${question}\\,dx=${answer}+k` }
}

function definitePair(random: Random): Pair {
    const kind = pick(random, ['line', 'double', 'square'] as const)
    const p = pick(random, [1, 2, 3, 4])
    if (kind === 'line') {
        // ∫₀ᵖ x dx = p²/2
        const value = p % 2 === 0 ? String((p * p) / 2) : `\\frac{${p * p}}{2}`
        return { question: `\\int_0^{${p}}x\\,dx`, answer: value, explain: `\\left[\\frac{x^2}{2}\\right]_0^{${p}}=${value}` }
    }
    if (kind === 'double') {
        // ∫₀ᵖ 2x dx = p²
        return { question: `\\int_0^{${p}}2x\\,dx`, answer: String(p * p), explain: `\\left[x^2\\right]_0^{${p}}=${p * p}` }
    }
    // ∫₀ᵖ 3x² dx = p³
    return { question: `\\int_0^{${p}}3x^2\\,dx`, answer: String(p ** 3), explain: `\\left[x^3\\right]_0^{${p}}=${p ** 3}` }
}

/** Six pairs of one level, every question and every answer different */
export function createBachIntegralsMemoryBoard(random: Random, levelIndex: number): PairCard[] {
    const level = bachIntegralsMemoryLevels[levelIndex] ?? 'powers'
    const make = level === 'powers' ? powerPair : level === 'basic' ? basicPair : definitePair
    const pairs: Pair[] = []
    for (let attempt = 0; pairs.length < BACH_INTEGRALS_MEMORY_PAIRS && attempt < 3000; attempt += 1) {
        const pair = make(random)
        // No card may repeat another, not even a question showing what another pair answers
        const cards = pairs.flatMap((other) => [other.question, other.answer])
        if (pair.question === pair.answer || cards.includes(pair.question) || cards.includes(pair.answer)) continue
        pairs.push(pair)
    }
    return shuffle(random, pairs.flatMap((pair, setId) => [
        { id: `${setId}-q`, setId, latex: pair.question, shows: pair.answer, explain: pair.explain },
        { id: `${setId}-a`, setId, latex: pair.answer, shows: pair.answer, explain: pair.explain }
    ]))
}
