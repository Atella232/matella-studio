import { pick, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { Stars } from '../../../features/unit-v2/games/records.ts'

/* ==========================================================================
   J1 · Eskailera (La escalera): a ladder must reach a window. The learner
   works out, with the theorem, where to put the foot of the ladder (a
   leg) or which ladder is needed (the hypotenuse), sets it and leans the
   ladder: only then is the ladder drawn, reaching the window, staying
   short or going past it. Level 1: Pythagorean triples in metres, the
   foot; level 2: triples with half metres, the foot or the ladder; level
   3: any lengths, to one decimal place. Every length is a real one: no
   window higher than 12 m.
   ========================================================================== */

export const LADDER_ROUNDS = 5

export type LadderUnknown = 'foot' | 'ladder'

export interface LadderRound {
    unknown: LadderUnknown
    /** The ladder (hypotenuse), the height of the window and the distance of the foot from the wall, in metres */
    ladder: number
    height: number
    foot: number
    /** The step of the answer: 1 m, 0.5 m in level 2 and 0.1 m in level 3 */
    step: number
    /** Where the slider starts and ends */
    min: number
    max: number
}

/** Foot, height and ladder: the foot always nearer than the window is high */
const WHOLE_TRIPLES: Array<[number, number, number]> = [[3, 4, 5], [6, 8, 10], [5, 12, 13], [9, 12, 15]]
const HALF_TRIPLES: Array<[number, number, number]> = [[2.5, 6, 6.5], [3.5, 12, 12.5], [4, 7.5, 8.5], [4.5, 6, 7.5], [1.5, 2, 2.5], [3, 4, 5], [6, 8, 10]]

const tenth = (value: number) => Math.round(value * 10) / 10

export function createLadderRound(random: Random, levelIndex: number, unknown: LadderUnknown): LadderRound {
    if (levelIndex < 2) {
        const [foot, height, ladder] = pick(random, levelIndex === 0 ? WHOLE_TRIPLES : HALF_TRIPLES)
        const step = levelIndex === 0 ? 1 : 0.5
        return unknown === 'foot'
            ? { unknown, ladder, height, foot, step, min: step, max: ladder - step }
            : { unknown, ladder, height, foot, step, min: height, max: height + foot + 2 }
    }
    for (;;) {
        // Lengths in whole metres or halves; the answer to one decimal place, never a whole number
        const ladder = pick(random, [4, 5, 6, 7, 8, 9, 10, 12])
        const height = pick(random, [2.5, 3, 3.5, 4, 4.5, 5, 6, 7, 8, 9].filter((value) => value < ladder - 0.9))
        const footExact = Math.sqrt(ladder * ladder - height * height)
        if (unknown === 'foot') {
            const foot = tenth(footExact)
            if (Number.isInteger(foot) || foot > height) continue
            return { unknown, ladder, height, foot, step: 0.1, min: 0.5, max: ladder - 0.5 }
        }
        const foot = pick(random, [1, 1.5, 2, 2.5, 3])
        const exact = tenth(Math.sqrt(height * height + foot * foot))
        if (Number.isInteger(exact)) continue
        return { unknown, ladder: exact, height, foot, step: 0.1, min: height, max: tenth(height + foot + 2) }
    }
}

export function createLadderRounds(random: Random, levelIndex: number): LadderRound[] {
    const unknowns: LadderUnknown[] = levelIndex === 0 ? Array(LADDER_ROUNDS).fill('foot') : shuffle(random, ['foot', 'foot', 'ladder', 'ladder', pick(random, ['foot', 'ladder'] as const)])
    return unknowns.map((unknown) => createLadderRound(random, levelIndex, unknown))
}

/** The value the learner has to set */
export const ladderTarget = (round: LadderRound) => (round.unknown === 'foot' ? round.foot : round.ladder)
/** Right when the value set is the target, to the step of the round */
export const ladderRight = (round: LadderRound, value: number) => Math.abs(value - ladderTarget(round)) < round.step / 2
/** Where the top of the ladder ends with the value set: its height on the wall */
export function ladderTop(round: LadderRound, value: number): number {
    const [ladder, foot] = round.unknown === 'foot' ? [round.ladder, value] : [value, round.foot]
    return ladder > foot ? Math.sqrt(ladder * ladder - foot * foot) : 0
}

export function ladderStars(score: number): Stars {
    if (score >= 5) return 3
    if (score >= 4) return 2
    if (score >= 3) return 1
    return 0
}
