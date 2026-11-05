import { randomInt, type Random } from '../../../features/unit-v2/games/random.ts'

/* ==========================================================================
   J1 · Ingurunea jomugan (Entorno al blanco): the number line shows a zone
   and the learner sets the centre and the radius of the neighbourhood
   that covers it exactly, with one try. Level 1: an open interval with
   whole ends; level 2: ends with halves, written as an inequality;
   level 3: the outside of a neighbourhood, |x − a| ≥ r, two closed
   half-lines. Each round has a single answer: the centre is the midpoint
   and the radius half the length.
   ========================================================================== */

export const TARGET_ROUNDS = 5

export type TargetKind = 'interval' | 'written' | 'outside'

export interface TargetRound {
    kind: TargetKind
    centre: number
    radius: number
}

export const TARGET_LIMITS = { centre: { min: -8, max: 8 }, radius: { min: 0.5, max: 6 } } as const
/** The step of the centre and radius controls in each level */
export const targetStep = (level: number) => (level === 1 ? 0.5 : 1)

export const targetEnds = ({ centre, radius }: TargetRound) => ({ left: centre - radius, right: centre + radius })
export const isTargetHit = (round: TargetRound, centre: number, radius: number) => Math.abs(round.centre - centre) < 1e-9 && Math.abs(round.radius - radius) < 1e-9

function makeRound(random: Random, level: number): TargetRound {
    if (level === 1) {
        // Halves in at least one end, so the step of 0,5 is really needed
        for (;;) {
            const centre = randomInt(random, -10, 10) / 2
            const radius = randomInt(random, 1, 9) / 2
            const { left, right } = targetEnds({ kind: 'written', centre, radius })
            if (Number.isInteger(left) && Number.isInteger(right)) continue
            if (left < -9 || right > 9) continue
            return { kind: 'written', centre, radius }
        }
    }
    const centre = randomInt(random, -5, 5)
    const radius = randomInt(random, 1, level === 2 ? 4 : 5)
    const kind = level === 2 ? 'outside' : 'interval'
    if (centre - radius < -9 || centre + radius > 9) return makeRound(random, level)
    return { kind, centre, radius }
}

/** Five different rounds of one level */
export function createTargetRounds(random: Random, level: number): TargetRound[] {
    const rounds: TargetRound[] = []
    for (let attempt = 0; rounds.length < TARGET_ROUNDS && attempt < 500; attempt += 1) {
        const round = makeRound(random, level)
        if (rounds.some((other) => other.centre === round.centre && other.radius === round.radius)) continue
        rounds.push(round)
    }
    return rounds
}

/** Where the controls start: a neighbourhood that is never the answer (the centre is always another one) */
export function targetStart(round: TargetRound, level: number): { centre: number; radius: number } {
    return { centre: round.centre === 0 ? 2 * targetStep(level) : 0, radius: round.radius === 1 ? 2 : 1 }
}
