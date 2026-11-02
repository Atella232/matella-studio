import { pick, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { Stars } from '../../../features/unit-v2/games/records.ts'

/* ==========================================================================
   J2 · Bete depositua (Llena el depósito): a tank with its measures and
   a tap; the learner works out how many litres fit, sets them and opens
   the tap. Only then does the water rise: it fills the tank exactly, stays
   short or spills over. 1 dm³ = 1 L. Level 1: boxes in decimetres; level
   2: boxes in centimetres and in metres (÷ 1000, × 1000); level 3:
   cylinders, rounded to the litre.
   ========================================================================== */

export const TANK_ROUNDS = 5

export type TankShape = 'box' | 'cylinder'
export type TankUnit = 'dm' | 'cm' | 'm'

export interface TankRound {
    shape: TankShape
    unit: TankUnit
    /** Box: length, width, height; cylinder: radius and height (the second number is unused) */
    measures: [number, number, number]
    /** The litres that fit, rounded to the litre for a cylinder */
    litres: number
    /** The exact capacity, in litres */
    exact: number
    max: number
}

/** Litres in one cubic unit */
const LITRES: Record<TankUnit, number> = { dm: 1, cm: 0.001, m: 1000 }

export function tankCapacity(shape: TankShape, unit: TankUnit, [a, b, c]: [number, number, number]): number {
    const volume = shape === 'box' ? a * b * c : Math.PI * a * a * c
    return volume * LITRES[unit]
}

export function createTankRound(random: Random, levelIndex: number, unit: TankUnit): TankRound {
    for (;;) {
        let shape: TankShape = 'box'
        let measures: [number, number, number]
        if (levelIndex === 0) measures = [pick(random, [2, 3, 4, 5, 6]), pick(random, [2, 3, 4, 5]), pick(random, [2, 3, 4, 5, 8])]
        else if (levelIndex === 1 && unit === 'cm') measures = [pick(random, [20, 30, 40, 50, 60]), pick(random, [10, 20, 25, 30]), pick(random, [20, 30, 40, 50])]
        else if (levelIndex === 1) measures = [pick(random, [0.5, 1, 1.2, 1.5, 2]), pick(random, [0.4, 0.5, 0.6]), pick(random, [0.5, 0.6, 0.8, 1])]
        else {
            shape = 'cylinder'
            measures = unit === 'dm' ? [pick(random, [1, 1.5, 2, 2.5, 3]), 0, pick(random, [2, 3, 4, 5, 6])] : [pick(random, [10, 15, 20, 25]), 0, pick(random, [20, 30, 40, 50])]
        }
        const exact = tankCapacity(shape, unit, measures)
        const litres = Math.round(exact)
        // Whole litres for boxes; every tank between 4 and 900 litres
        if (shape === 'box' && Math.abs(exact - litres) > 1e-6) continue
        if (litres < 4 || litres > 900) continue
        return { shape, unit, measures, litres, exact, max: Math.max(20, Math.ceil(litres * 2 / 10) * 10) }
    }
}

export function createTankRounds(random: Random, levelIndex: number): TankRound[] {
    const units: TankUnit[] = levelIndex === 0 ? ['dm', 'dm', 'dm', 'dm', 'dm'] : levelIndex === 1 ? shuffle(random, ['cm', 'cm', 'm', 'm', pick(random, ['cm', 'm'] as const)]) : shuffle(random, ['dm', 'dm', 'cm', 'cm', pick(random, ['cm', 'dm'] as const)])
    return units.map((unit) => createTankRound(random, levelIndex, unit))
}

export const tankRight = (round: TankRound, litres: number) => litres === round.litres

export function tankStars(score: number): Stars {
    if (score >= 5) return 3
    if (score >= 4) return 2
    if (score >= 3) return 1
    return 0
}
