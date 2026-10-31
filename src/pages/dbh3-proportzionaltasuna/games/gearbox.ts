import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { Stars } from '../../../features/unit-v2/games/records.ts'

/* ==========================================================================
   Kanbio-kaxa (La caja de cambios, 3. DBH): the motor turns wheel A; the
   learner picks, from four wheels, the one that makes the last wheel turn
   at the speed asked for. Teeth · turns is the same on meshing wheels.
   Level 1 is a single pair. Level 2 puts a wheel in the middle, which
   changes nothing (the trap is to use its teeth). Level 3 has two wheels on
   the same axle, which turn together: the ratio has to be applied twice.
   Exactly one of the four wheels is right. Pure logic, no React.
   ========================================================================== */

export const GEARBOX_ROUNDS = 8
export const GEAR_TEETH = { min: 8, max: 48 } as const

export type GearboxMode = 'pair' | 'idler' | 'axle'

export interface GearboxRound {
    mode: GearboxMode
    teethA: number
    rpmA: number
    /** The wheel in the middle (idler) or the first one on the shared axle (axle) */
    teethB?: number
    /** The second wheel on the shared axle (axle mode) */
    teethC?: number
    target: number
    /** Teeth of the four wheels to choose from, the right one among them */
    options: number[]
    answer: number
}

const evenTeeth = (value: number) => Number.isInteger(value) && value % 2 === 0 && value >= GEAR_TEETH.min && value <= GEAR_TEETH.max

/** Speed of the last wheel when `teeth` is chosen */
export function gearboxSpeed(round: GearboxRound, teeth: number): number {
    if (round.mode === 'axle') {
        const rpmB = (round.teethA * round.rpmA) / round.teethB!
        return (round.teethC! * rpmB) / teeth
    }
    // A wheel in the middle passes the same teeth per minute on: it does not change the speed
    return (round.teethA * round.rpmA) / teeth
}

/** Four different even teeth counts: the answer and three typical mistakes, or nearby wheels */
function withOptions(random: Random, answer: number, mistakes: number[]): number[] | null {
    const set = new Set([answer])
    for (const value of [...mistakes, answer + 4, answer - 4, answer + 8, answer - 6, answer * 2, answer / 2]) {
        if (set.size === 4) break
        if (evenTeeth(value)) set.add(value)
    }
    return set.size === 4 ? shuffle(random, [...set]) : null
}

function pairRound(random: Random): GearboxRound | null {
    const teethA = randomInt(random, 5, 24) * 2
    const rpmA = pick(random, [10, 15, 20, 30, 40])
    const answer = randomInt(random, 4, 24) * 2
    const target = (teethA * rpmA) / answer
    if (answer === teethA || !Number.isInteger(target)) return null
    // The direct mistake: more teeth for a faster wheel
    const options = withOptions(random, answer, [(teethA * target) / rpmA, teethA])
    return options && { mode: 'pair', teethA, rpmA, target, options, answer }
}

function idlerRound(random: Random): GearboxRound | null {
    const base = pairRound(random)
    if (!base) return null
    const teethB = randomInt(random, 4, 24) * 2
    // The trap: work with the middle wheel's teeth
    const trap = (teethB * base.rpmA) / base.target
    if (teethB === base.teethA || teethB === base.answer || !evenTeeth(trap) || trap === base.answer) return null
    const options = withOptions(random, base.answer, [trap, (base.teethA * base.target) / base.rpmA])
    return options && { ...base, mode: 'idler', teethB, options }
}

function axleRound(random: Random): GearboxRound | null {
    const teethA = randomInt(random, 6, 24) * 2
    const rpmA = pick(random, [10, 15, 20, 30])
    const teethB = randomInt(random, 4, 20) * 2
    const rpmB = (teethA * rpmA) / teethB
    const teethC = randomInt(random, 6, 24) * 2
    const answer = randomInt(random, 4, 20) * 2
    const target = (teethC * rpmB) / answer
    if (!Number.isInteger(rpmB) || !Number.isInteger(target) || target > 200 || teethA === teethB || teethC === answer) return null
    // The trap: forget that B and C share an axle and use A's turns
    const options = withOptions(random, answer, [(teethC * rpmA) / target, (teethA * rpmA) / target])
    return options && { mode: 'axle', teethA, rpmA, teethB, teethC, target, options, answer }
}

const makers: Array<(random: Random) => GearboxRound | null> = [pairRound, idlerRound, axleRound]

export function createGearboxRounds(random: Random, level: number): GearboxRound[] {
    const maker = makers[level] ?? makers[0]
    const rounds: GearboxRound[] = []
    for (let attempt = 0; rounds.length < GEARBOX_ROUNDS && attempt < 20000; attempt += 1) {
        const round = maker(random)
        if (!round || rounds.some((other) => other.teethA === round.teethA && other.target === round.target)) continue
        rounds.push(round)
    }
    return rounds
}

export function gearboxStars(score: number): Stars {
    if (score >= 8) return 3
    if (score >= 6) return 2
    if (score >= 4) return 1
    return 0
}
