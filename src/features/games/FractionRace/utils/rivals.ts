import type { RacerState } from '../types'

export function getPersonalityPace(racer: RacerState, raceProgress: number): number {
    switch (racer.personality) {
        case 'sprinter':
            return raceProgress < 0.4 ? 1.16 : 0.91
        case 'comeback':
            return raceProgress < 0.5 ? 0.82 : 1.2
        case 'steady':
            return 1
        default:
            return 1
    }
}

export function calculateRivalMovement(
    racer: RacerState,
    baseMovement: number,
    raceProgress: number,
    difficultyFactor: number,
    randomValue: number = Math.random()
): number {
    const variationRange = (1 - racer.consistency) * 0.45
    const variation = 1 + (randomValue * 2 - 1) * variationRange

    return baseMovement
        * racer.speedFactor
        * racer.raceLuck
        * getPersonalityPace(racer, raceProgress)
        * variation
        * difficultyFactor
}
