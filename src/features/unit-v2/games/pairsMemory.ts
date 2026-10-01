import type { ReactNode } from 'react'
import type { Random } from './random.ts'
import type { GameInfo, Stars } from './records.ts'

/* ==========================================================================
   Memory of pairs shared by the units: every card shows a formula in LaTeX
   and has exactly one partner. The board makers live in each unit; this
   file holds the types and the scoring so node tests can load them.
   ========================================================================== */

export interface PairCard {
    id: string
    setId: number
    latex: string
    /** Plain value the pair shares, shown to explain a mismatch */
    shows: string
    /** Worked line shown when the pair is found, instead of "card = card" */
    explain?: string
}

export interface PairsMemoryConfig {
    game: GameInfo<string>
    art: ReactNode
    pairs: number
    createBoard: (random: Random, level: number) => PairCard[]
}

export function pairsMemoryStars(pairs: number, moves: number): Stars {
    if (moves <= Math.ceil(pairs * 1.6)) return 3
    if (moves <= Math.ceil(pairs * 2.3)) return 2
    return 1
}

