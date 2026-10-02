import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { PairCard } from '../../../features/unit-v2/games/pairsMemory.ts'
import { createRealsMemoryBoard } from '../../dbh4-aplikatuak-errealak/games/boards.ts'
import { inequalityLatex, interval, intervalLatex } from '../../dbh4-aplikatuak-errealak/reals.ts'
import { tidy, variationIndex } from '../percent.ts'

/* ==========================================================================
   Zenbaki errealak eta ehunekoak (4. DBH, akademikoak) memory: a periodic
   decimal and its fraction (the applied unit's board), a percentage change
   and its index, an interval and its inequality.
   ========================================================================== */

export const PERCENT_MEMORY_PAIRS = 6

export const percentMemoryLevels = ['generatrix', 'index', 'intervals'] as const

type Pair = [question: string, answer: string, explain: string]

const num = (value: number) => String(tidy(value, 6)).replace('.', '{,}')
const changes = [5, 10, 15, 20, 21, 25, 30, 50, 12.5, -5, -10, -12.5, -15, -20, -25, -30, -40, -50]

function indexPair(random: Random): Pair {
    const change = pick(random, changes)
    const index = variationIndex(change)
    const p = num(Math.abs(change))
    return [`${change > 0 ? '+' : '-'}${p}\\,\\%`, `\\times ${num(index)}`, `100\\,\\%${change > 0 ? '+' : '-'}${p}\\,\\%=${num(100 + change)}\\,\\%\\ \\to\\ ${num(index)}`]
}

function intervalPair(random: Random): Pair {
    const from = randomInt(random, -6, 3)
    const to = from + randomInt(random, 1, 6)
    const kind = randomInt(random, 0, 5)
    const value = kind === 4 ? interval(null, to, false, random() < 0.5) : kind === 5 ? interval(from, null, random() < 0.5, false) : interval(from, to, random() < 0.5, random() < 0.5)
    return [inequalityLatex(value), intervalLatex(value), `${inequalityLatex(value)}\\ \\to\\ ${intervalLatex(value)}`]
}

const makers = { index: indexPair, intervals: intervalPair }

/** Six pairs with different answers (and different questions), so every card has exactly one partner */
export function createPercentMemoryBoard(random: Random, levelIndex: number): PairCard[] {
    const level = percentMemoryLevels[levelIndex]
    if (level === 'generatrix') return createRealsMemoryBoard(random, 0)
    const make = makers[level]
    const pairs: Pair[] = []
    for (let attempt = 0; pairs.length < PERCENT_MEMORY_PAIRS && attempt < 500; attempt += 1) {
        const pair = make(random)
        if (pairs.some(([question, answer]) => answer === pair[1] || question === pair[0])) continue
        pairs.push(pair)
    }
    return shuffle(random, pairs.flatMap(([question, answer, explain], setId) => [
        { id: `${setId}-q`, setId, latex: question, shows: answer, explain },
        { id: `${setId}-a`, setId, latex: answer, shows: answer, explain }
    ]))
}
