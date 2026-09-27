import { randomInt, type Random } from '../../../features/unit-v2/games/random.ts'
import type { Stars } from '../../../features/unit-v2/games/records.ts'

/* ==========================================================================
   Igogailua (El ascensor): the lift starts on a floor and moves up and
   down; tap the floor where it stops. It is the sum of integers told as a
   story: sótanos are negative, the ground floor is 0.
   ========================================================================== */

export const ELEVATOR_ROUNDS = 8
export const ELEVATOR_PENALTY_MS = 3000

export interface ElevatorLevel {
    moves: number
    lowest: number
    highest: number
    /** Largest single movement */
    step: number
    secondsPerRound: number
}

export const elevatorLevels: ElevatorLevel[] = [
    { moves: 1, lowest: -4, highest: 7, step: 5, secondsPerRound: 5 },
    { moves: 2, lowest: -4, highest: 7, step: 6, secondsPerRound: 7 },
    { moves: 3, lowest: -6, highest: 10, step: 8, secondsPerRound: 9 }
]

export interface ElevatorRound {
    start: number
    /** Movements in order: positive up, negative down */
    moves: number[]
}

export const elevatorFinal = (round: ElevatorRound) => round.moves.reduce((floor, move) => floor + move, round.start)

/** A trip that stays inside the building, crosses the ground floor when it can and never stays still */
export function createElevatorRound(random: Random, levelIndex: number): ElevatorRound {
    const level = elevatorLevels[levelIndex]
    for (let attempt = 0; attempt < 500; attempt += 1) {
        const start = randomInt(random, level.lowest, level.highest)
        const moves: number[] = []
        let floor = start
        let valid = true
        for (let index = 0; index < level.moves; index += 1) {
            const size = randomInt(random, 1, level.step)
            // Alternate directions after the first move, as in the textbook stories
            const up = index === 0 ? random() < 0.5 : moves[index - 1] < 0
            const move = up ? size : -size
            floor += move
            if (floor < level.lowest || floor > level.highest) {
                valid = false
                break
            }
            moves.push(move)
        }
        const final = floor
        const crosses = (start < 0) !== (final < 0) || final === 0 || start === 0
        if (valid && final !== start && (crosses || attempt > 200)) return { start, moves }
    }
    throw new Error('Could not build an elevator trip')
}

export function elevatorParTime(levelIndex: number): number {
    return (ELEVATOR_ROUNDS * elevatorLevels[levelIndex].secondsPerRound + 5) * 1000
}

export function elevatorStars(levelIndex: number, timeMs: number, mistakes: number): Stars {
    const par = elevatorParTime(levelIndex)
    if (timeMs <= par * 0.8 && mistakes <= 1) return 3
    if (timeMs <= par) return 2
    return 1
}
