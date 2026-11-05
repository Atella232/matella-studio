import { pick, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'

/* ==========================================================================
   J3 · Aurkitu igorlea (Localiza la emisora): two listening posts A and B
   on a base of known length hear a hidden radio station E, each in a
   direction: the angles α at A and β at B. The learner puts a flag where
   the station is; then the two sight lines are drawn, and the distance AE
   comes from the sine rule. Level 1: the first part of each sight line is
   drawn; level 2: only the angles; level 3: the sight lines are drawn and
   the learner chooses the distance AE among three (the right pair, the
   wrong pair, the distance to the base). The map is 360 wide in the
   board's units: A at x = 40, B at x = 320.
   ========================================================================== */

export const STATION_ROUNDS = 6
export const MAP = { left: 40, right: 320, base: 236, top: 22 }

export interface StationRound {
    /** The length of the base AB, in metres */
    base: number
    alpha: number
    beta: number
    /** The station on the map */
    station: [number, number]
    /** The distance AE, in metres */
    distance: number
    /** Level 3: the three distances to choose from, the right one among them */
    options: number[]
}

const D = Math.PI / 180

/** Where the two sight lines cross, on the map */
export function stationPoint(alpha: number, beta: number): [number, number] {
    const width = MAP.right - MAP.left
    const x = (width * Math.tan(beta * D)) / (Math.tan(alpha * D) + Math.tan(beta * D))
    return [MAP.left + x, MAP.base - x * Math.tan(alpha * D)]
}

/** AE by the sine rule: the base times sen β over sen E */
export const stationDistance = (base: number, alpha: number, beta: number) => (base * Math.sin(beta * D)) / Math.sin((180 - alpha - beta) * D)

/** Whether a flag on the map is close enough to the station: a tenth of the base on level 1, an eighth on level 2 */
export function flagIsClose(round: StationRound, flag: [number, number], levelIndex: number): boolean {
    const width = MAP.right - MAP.left
    const tolerance = levelIndex === 0 ? width / 10 : width / 8
    return Math.hypot(flag[0] - round.station[0], flag[1] - round.station[1]) <= tolerance
}

export const toMetres = (round: StationRound, pixels: number) => (pixels * round.base) / (MAP.right - MAP.left)

function makeRound(random: Random): StationRound | null {
    const base = pick(random, [120, 150, 200, 240, 300, 400, 500])
    const alpha = pick(random, [30, 35, 40, 45, 50, 55, 60, 65, 70, 75])
    const beta = pick(random, [30, 35, 40, 45, 50, 55, 60, 65, 70, 75])
    if (alpha + beta > 140) return null
    const station = stationPoint(alpha, beta)
    if (station[1] < MAP.top + 10) return null
    const distance = stationDistance(base, alpha, beta)
    // The wrong pair (sen α over sen E) and the height of E over the base
    const wrongPair = (base * Math.sin(alpha * D)) / Math.sin((180 - alpha - beta) * D)
    const height = distance * Math.sin(alpha * D)
    const values = [distance, wrongPair, height]
    // Three different answers, at least 4 % apart, so the choice is never a guess between two equal ones
    for (const [i, x] of values.entries()) for (const y of values.slice(i + 1)) if (Math.abs(x - y) < 0.04 * distance) return null
    return { base, alpha, beta, station, distance, options: shuffle(random, values) }
}

export function createStationRounds(random: Random): StationRound[] {
    const rounds: StationRound[] = []
    while (rounds.length < STATION_ROUNDS) {
        const made = makeRound(random)
        if (made && !rounds.some((other) => other.alpha === made.alpha && other.beta === made.beta)) rounds.push(made)
    }
    return rounds
}

/** The distance rounded to the metre, as the options show it */
export const metres = (value: number) => Math.round(value)
