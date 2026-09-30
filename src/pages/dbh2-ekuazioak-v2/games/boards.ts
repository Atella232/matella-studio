import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { Stars } from '../../../features/unit-v2/games/records.ts'
import type { PairCard } from '../../../features/unit-v2/games/pairsMemory.ts'
import type { Tier } from '../../../features/unit-v2/games/raceCore.ts'
import { toNumber } from '../../../features/unit-v2/math/fraction.ts'
import { linearLatex } from '../../dbh1-aljebra-v2/algebra.ts'
import { generateEquationsRaceQuestion } from './race.ts'

/* ==========================================================================
   Ekuazioak (2. DBH) games besides the race:
   - Ebatzi azkar: eight equations in a row, type x; a wrong answer costs
     time. The equations come from the race generators.
   - Memoria: an equation and its solution.
   ========================================================================== */

/* ---------- Quick solving ---------- */

export const SOLVES_PER_ROUND = 8
export const SOLVE_PENALTY_MS = 3000

export interface SolveLevel {
    /** Race circuits and tiers the equations come from */
    sources: Array<{ circuit: number; tier: Tier }>
    secondsPerItem: number
}

export const solveLevels: SolveLevel[] = [
    { sources: [{ circuit: 0, tier: 1 }, { circuit: 1, tier: 0 }], secondsPerItem: 9 },
    { sources: [{ circuit: 1, tier: 1 }, { circuit: 2, tier: 0 }, { circuit: 2, tier: 1 }], secondsPerItem: 14 },
    { sources: [{ circuit: 4, tier: 0 }, { circuit: 4, tier: 1 }], secondsPerItem: 14 }
]

export interface SolveItem {
    latex: string
    answer: number
    /** Second-degree equations ask for the larger solution */
    larger: boolean
}

export function createSolveRound(random: Random, levelIndex: number): SolveItem[] {
    const items: SolveItem[] = []
    while (items.length < SOLVES_PER_ROUND) {
        const source = pick(random, solveLevels[levelIndex].sources)
        const question = generateEquationsRaceQuestion(random, source.circuit, source.tier)
        const latex = question.solution.es.replace(/\$/g, '').split('\\ \\to\\ ')[0]
        if (items.some((item) => item.latex === latex)) continue
        items.push({ latex, answer: toNumber(question.answer), larger: source.circuit === 4 })
    }
    return items
}

export function solveParTime(levelIndex: number): number {
    return (SOLVES_PER_ROUND * solveLevels[levelIndex].secondsPerItem + 5) * 1000
}

export function solveStars(levelIndex: number, timeMs: number, mistakes: number): Stars {
    const par = solveParTime(levelIndex)
    if (timeMs <= par * 0.8 && mistakes <= 1) return 3
    if (timeMs <= par) return 2
    return 1
}

/* ---------- Memory ---------- */

export const EQUATIONS_MEMORY_PAIRS = 6

export const equationsMemoryLevels = ['first-degree', 'denominators', 'quadratic'] as const

function firstDegreePair(random: Random): [string, number] {
    const x = randomInt(random, -9, 12)
    const a = randomInt(random, 2, 7)
    const b = randomInt(random, -9, 9)
    if (b === 0) return firstDegreePair(random)
    return [`${linearLatex({ a, b })}=${a * x + b}`, x]
}

function denominatorPair(random: Random): [string, number] {
    const p = randomInt(random, 2, 6)
    const r = randomInt(random, -5, 6)
    const k = randomInt(random, -8, 8)
    if (k === 0) return [`\\frac{x}{${p}}=${r}`, p * r]
    return [`\\frac{${linearLatex({ a: 1, b: k })}}{${p}}=${r}`, p * r - k]
}

function quadraticPair(random: Random): [string, string] {
    const root = randomInt(random, 2, 12)
    if (random() < 0.5) return [`x^{2}=${root * root}`, `x=\\pm ${root}`]
    return [`x^{2}-${root}x=0`, `x=0,\\ x=${root}`]
}

/** Six pairs whose solutions are all different, so every card has exactly one partner */
export function createEquationsMemoryBoard(random: Random, levelIndex: number): PairCard[] {
    const level = equationsMemoryLevels[levelIndex]
    const pairs: Array<[string, string]> = []
    for (let attempt = 0; pairs.length < EQUATIONS_MEMORY_PAIRS && attempt < 500; attempt += 1) {
        const pair: [string, string] = level === 'quadratic'
            ? quadraticPair(random)
            : (([equation, x]) => [equation, `x=${x}`] as [string, string])(level === 'first-degree' ? firstDegreePair(random) : denominatorPair(random))
        if (pairs.some(([question, answer]) => answer === pair[1] || question === pair[0])) continue
        pairs.push(pair)
    }
    return shuffle(random, pairs.flatMap(([question, answer], setId) => [
        { id: `${setId}-q`, setId, latex: question, shows: answer },
        { id: `${setId}-a`, setId, latex: answer, shows: answer }
    ]))
}
