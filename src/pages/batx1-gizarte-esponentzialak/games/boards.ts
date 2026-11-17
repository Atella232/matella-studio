import type { PairCard } from '../../../features/unit-v2/games/pairsMemory.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'

/* ==========================================================================
   Memoria (1.º Sociales · exponenciales y logaritmos): a percentage change
   and its factor, a logarithm and its value, and a function and its
   inverse. Every card has exactly one partner.
   ========================================================================== */

export const SOC_EXP_MEMORY_PAIRS = 6

export const socExpMemoryLevels = ['factors', 'logs', 'inverses'] as const

interface Pair {
    question: string
    answer: string
}

const dec = (value: number) => String(Math.round(value * 100) / 100).replace('.', '{,}')
const signed = (value: number) => (value < 0 ? `-${-value}` : `+${value}`)

function factorPair(random: Random): Pair {
    const r = pick(random, [2, 3, 5, 8, 10, 12, 15, 20, 25, 30, 40, 50])
    const up = random() < 0.5
    return { question: `${up ? '+' : '-'}${r}\\,\\%`, answer: `\\times ${dec(up ? 1 + r / 100 : 1 - r / 100)}` }
}

function logPair(random: Random): Pair | null {
    const a = pick(random, [2, 3, 5, 10])
    const e = randomInt(random, -2, a === 2 ? 6 : 3)
    if (e === 0) return null
    const argument = e > 0 ? String(a ** e) : `\\frac{1}{${a ** -e}}`
    return { question: `${a === 10 ? '\\log' : `\\log_{${a}}`} ${argument}`, answer: String(e) }
}

function inversePair(random: Random): Pair {
    const kind = pick(random, ['line', 'exp', 'log'] as const)
    if (kind === 'line') {
        const a = randomInt(random, 2, 5)
        const b = randomInt(random, 1, 6)
        return { question: `${a}x${signed(b)}`, answer: `\\frac{x-${b}}{${a}}` }
    }
    const a = pick(random, [2, 3, 10])
    const c = randomInt(random, 1, 5)
    const log = a === 10 ? '\\log' : `\\log_{${a}}`
    if (kind === 'exp') return { question: `${a}^x+${c}`, answer: `${log}(x-${c})` }
    return { question: `${log} x+${c}`, answer: `${a}^{x-${c}}` }
}

/** Six pairs of one level, every question and every answer different */
export function createSocExpMemoryBoard(random: Random, levelIndex: number): PairCard[] {
    const level = socExpMemoryLevels[levelIndex] ?? 'factors'
    const pairs: Pair[] = []
    for (let attempt = 0; pairs.length < SOC_EXP_MEMORY_PAIRS && attempt < 3000; attempt += 1) {
        const pair = level === 'factors' ? factorPair(random) : level === 'logs' ? logPair(random) : inversePair(random)
        if (!pair || pairs.some((other) => other.question === pair.question || other.answer === pair.answer)) continue
        pairs.push(pair)
    }
    return shuffle(random, pairs.flatMap((pair, setId) => [
        { id: `${setId}-q`, setId, latex: pair.question, shows: pair.answer, explain: `${pair.question}\\ \\Rightarrow\\ ${pair.answer}` },
        { id: `${setId}-a`, setId, latex: pair.answer, shows: pair.answer, explain: `${pair.question}\\ \\Rightarrow\\ ${pair.answer}` }
    ]))
}
