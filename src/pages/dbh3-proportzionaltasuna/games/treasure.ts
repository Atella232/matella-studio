import { pick, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { Stars } from '../../../features/unit-v2/games/records.ts'

/* ==========================================================================
   Altxorraren mapa (El mapa del tesoro, 3. DBH): three ways of reading a
   map's scale. Level 1: the clue gives the real distance and the learner
   moves the chest along the ruler to the right number of centimetres.
   Level 2: the ruler shows the distance on the map and the learner picks
   the real one (the wrong options are the unit slips: a factor of 10, 100
   or 1000). Level 3: the map distance and the real one are known, and the
   learner picks the scale. Distances are whole metres, maps in halves of a
   centimetre. Pure logic, no React.
   ========================================================================== */

export const TREASURE_ROUNDS = 6
export const TREASURE_HALVES_MAX = 24

export const TREASURE_SCALES = [5000, 10000, 20000, 25000, 50000, 100000, 200000] as const

export type TreasureMode = 'place' | 'measure' | 'scale'

export interface TreasureRound {
    mode: TreasureMode
    scale: number
    /** Map distance in halves of a cm */
    halves: number
    /** Real distance in metres */
    metres: number
    /** Options: metres (measure) or scales (scale); empty when the chest is placed by hand */
    options: number[]
    answer: number
}

export const realMetres = (scale: number, halves: number) => (halves * scale) / 200

function round(random: Random, mode: TreasureMode): TreasureRound | null {
    const scale = pick(random, TREASURE_SCALES)
    const halves = pick(random, [3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 15, 16, 18, 20])
    const metres = realMetres(scale, halves)
    if (!Number.isInteger(metres)) return null
    if (mode === 'place') return { mode, scale, halves, metres, options: [], answer: halves }
    if (mode === 'measure') {
        const options = [...new Set([metres, metres * 10, metres / 10, metres * 100, metres / 100, metres * 1000])].filter((value) => Number.isInteger(value) && value > 0)
        if (options.length < 4) return null
        return { mode, scale, halves, metres, options: shuffle(random, [metres, ...shuffle(random, options.filter((value) => value !== metres)).slice(0, 3)]), answer: metres }
    }
    const others = TREASURE_SCALES.filter((value) => value !== scale)
    return { mode, scale, halves, metres, options: shuffle(random, [scale, ...shuffle(random, [...others]).slice(0, 3)]), answer: scale }
}

const modes: TreasureMode[] = ['place', 'measure', 'scale']

export function createTreasureRounds(random: Random, level: number): TreasureRound[] {
    const mode = modes[level] ?? modes[0]
    const rounds: TreasureRound[] = []
    for (let attempt = 0; rounds.length < TREASURE_ROUNDS && attempt < 5000; attempt += 1) {
        const next = round(random, mode)
        if (!next || rounds.some((other) => other.scale === next.scale && other.halves === next.halves)) continue
        rounds.push(next)
    }
    return rounds
}

export function treasureStars(score: number): Stars {
    if (score >= 6) return 3
    if (score >= 5) return 2
    if (score >= 3) return 1
    return 0
}
