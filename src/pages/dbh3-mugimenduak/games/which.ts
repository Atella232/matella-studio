import type { Stars } from '../../../features/unit-v2/games/records.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import { enlarge, placeFlag, reflect, rotate, translate, type Point } from '../motion.ts'

/* ==========================================================================
   J2 · Zer mugimendu da? (¿Qué movimiento es?): the flag and its image are
   drawn; the learner names the movement. A translation keeps the flag the
   same way up; a rotation turns it; a reflection flips it; an enlargement
   changes its size. Level 1 mixes translations and reflections, level 2
   adds rotations and level 3 enlargements.
   ========================================================================== */

export const WHICH_ROUNDS = 8

export type MovementKind = 'translation' | 'rotation' | 'reflection' | 'homothety'

export interface WhichRound {
    kind: MovementKind
    flag: Point[]
    image: Point[]
}

const KINDS: MovementKind[][] = [['translation', 'reflection'], ['translation', 'rotation', 'reflection'], ['translation', 'rotation', 'reflection', 'homothety']]

export const whichKinds = (level: number) => KINDS[level] ?? KINDS[0]

function imageFor(random: Random, kind: MovementKind, flag: Point[]): Point[] {
    if (kind === 'translation') {
        const vector: Point = [pick(random, [-5, -4, 4, 5]), randomInt(random, -3, 3)]
        return flag.map((point) => translate(point, vector))
    }
    if (kind === 'rotation') {
        const angle = pick(random, [90, 180, 270])
        return flag.map((point) => rotate(point, angle))
    }
    if (kind === 'reflection') {
        const axis = pick(random, [{ kind: 'vertical' as const, at: 0 }, { kind: 'horizontal' as const, at: 0 }, { kind: 'diagonal' as const }])
        return flag.map((point) => reflect(point, axis))
    }
    // k = −1 would look like a rotation of 180°, so it is left out
    const k = pick(random, [2, 0.5, 1.5])
    return flag.map((point) => enlarge(point, k))
}

export function createWhichRounds(random: Random, level: number): WhichRound[] {
    const kinds = whichKinds(level)
    const plan = shuffle(random, Array.from({ length: WHICH_ROUNDS }, (_, index) => kinds[index % kinds.length]))
    return plan.map((kind) => {
        for (;;) {
            const flag = placeFlag([randomInt(random, 1, 3), randomInt(random, -2, 1)])
            const image = imageFor(random, kind, flag)
            // Everything on the grid from −7 to 7
            if (image.every(([x, y]) => Math.abs(x) <= 7 && Math.abs(y) <= 7)) return { kind, flag, image }
        }
    })
}

export function whichStars(score: number): Stars {
    if (score >= 8) return 3
    if (score >= 6) return 2
    if (score >= 4) return 1
    return 0
}
