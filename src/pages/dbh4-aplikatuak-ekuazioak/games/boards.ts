import type { PairCard } from '../../../features/unit-v2/games/pairsMemory.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import { createEquationsMemoryBoard } from '../../dbh2-ekuazioak-v2/games/boards.ts'
import { linearLatex } from '../lab/labTools.ts'

/* ==========================================================================
   Ekuazioak eta sistemak (4. DBH aplikatuak) memory: a first-degree
   equation and its solution (the 2. DBH board), a factored equation and
   its two solutions, and a system and its solution. Every card has
   exactly one partner.
   ========================================================================== */

export const EQUATIONS_SYSTEMS_MEMORY_PAIRS = 6

export const equationsSystemsMemoryLevels = ['first-degree', 'factored', 'systems'] as const

const binomial = (root: number) => (root === 0 ? 'x' : `x${root > 0 ? '-' : '+'}${Math.abs(root)}`)

function factoredPair(random: Random): [string, string] {
    const p = randomInt(random, -8, 8)
    const q = randomInt(random, -8, 8)
    if (p >= q) return factoredPair(random)
    return [`(${binomial(p)})(${binomial(q)})=0`, `x=${p},\\ x=${q}`]
}

function systemPair(random: Random): [string, string] {
    const x = randomInt(random, -6, 8)
    const y = randomInt(random, -6, 8)
    const a = pick(random, [1, 2, 3])
    const b = pick(random, [1, -1, 2])
    const second: [number, number] = pick(random, [[1, -1], [1, 1], [2, -1]] as Array<[number, number]>)
    if (a * second[1] - second[0] * b === 0) return systemPair(random)
    return [`${linearLatex([a, b, a * x + b * y])},\\ ${linearLatex([second[0], second[1], second[0] * x + second[1] * y])}`, `x=${x},\\ y=${y}`]
}

/** Six pairs whose answers are all different; the first level is the 2. DBH board */
export function createEquationsSystemsMemoryBoard(random: Random, levelIndex: number): PairCard[] {
    const level = equationsSystemsMemoryLevels[levelIndex] ?? 'first-degree'
    if (level === 'first-degree') return createEquationsMemoryBoard(random, 0)
    const pairs: Array<[string, string]> = []
    for (let attempt = 0; pairs.length < EQUATIONS_SYSTEMS_MEMORY_PAIRS && attempt < 500; attempt += 1) {
        const pair = level === 'factored' ? factoredPair(random) : systemPair(random)
        if (pairs.some(([question, answer]) => answer === pair[1] || question === pair[0])) continue
        pairs.push(pair)
    }
    return shuffle(random, pairs.flatMap(([question, answer], setId) => [
        { id: `${setId}-q`, setId, latex: question, shows: answer },
        { id: `${setId}-a`, setId, latex: answer, shows: answer }
    ]))
}
