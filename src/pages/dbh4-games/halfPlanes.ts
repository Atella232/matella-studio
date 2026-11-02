import { pick, randomInt, type Random } from '../../features/unit-v2/games/random.ts'

/* ==========================================================================
   Touch the solution (4. DBH systems of inequalities): one, two or three
   linear inequalities ax + by < c (or ≤, >, ≥); the learner taps a whole
   point that satisfies all of them. Any point of the region counts; the
   region is shaded after the answer.
   ========================================================================== */

export const HALF_ROUNDS = 5
export const HALF_BOX = { xMin: -6, xMax: 6, yMin: -6, yMax: 6 }

export type Sign = '<' | '<=' | '>' | '>='
export interface Inequality { a: number; b: number; c: number; sign: Sign }
export interface HalfRound { inequalities: Inequality[] }

export const holdsAt = ({ a, b, c, sign }: Inequality, x: number, y: number) => {
    const value = a * x + b * y
    return sign === '<' ? value < c : sign === '<=' ? value <= c : sign === '>' ? value > c : value >= c
}
export const inRegion = (round: HalfRound, x: number, y: number) => round.inequalities.every((inequality) => holdsAt(inequality, x, y))

/** The whole points of the box in the region */
export function regionPoints(round: HalfRound): Array<[number, number]> {
    const points: Array<[number, number]> = []
    for (let x = HALF_BOX.xMin; x <= HALF_BOX.xMax; x += 1) for (let y = HALF_BOX.yMin; y <= HALF_BOX.yMax; y += 1) if (inRegion(round, x, y)) points.push([x, y])
    return points
}

const nonzero = (min: number, max: number) => Array.from({ length: max - min + 1 }, (_, index) => index + min).filter((value) => value !== 0)

/** An inequality through a given point of the line, with the sign chosen */
function randomInequality(random: Random): Inequality {
    const a = pick(random, nonzero(-3, 3))
    const b = pick(random, [-1, 1, 2, -2])
    const [x0, y0] = [randomInt(random, -3, 3), randomInt(random, -3, 3)]
    return { a, b, c: a * x0 + b * y0, sign: pick(random, ['<', '<=', '>', '>='] as const) }
}

export function createHalfRound(random: Random, levelIndex: number): HalfRound {
    for (;;) {
        const count = levelIndex + 1
        const inequalities = Array.from({ length: count }, () => randomInequality(random))
        // A region that is neither empty nor almost the whole plane, and not too big for level 3
        const round = { inequalities }
        const size = regionPoints(round).length
        if (size < 3) continue
        if (levelIndex === 2 && size > 30) continue
        if (levelIndex === 1 && size > 70) continue
        // The centre of the plane must not always be the answer
        if (levelIndex > 0 && inRegion(round, 0, 0) && random() < 0.7) continue
        return round
    }
}

export const createHalfRounds = (random: Random, levelIndex: number) => Array.from({ length: HALF_ROUNDS }, () => createHalfRound(random, levelIndex))

const signLatex: Record<Sign, string> = { '<': '<', '<=': '\\le ', '>': '>', '>=': '\\ge ' }
export function inequalityLatex({ a, b, c, sign }: Inequality): string {
    const term = (value: number, letter: string, first: boolean) => `${value < 0 ? '-' : first ? '' : '+'}${Math.abs(value) === 1 ? '' : Math.abs(value)}${letter}`
    return `${term(a, 'x', true)}${term(b, 'y', false)}${signLatex[sign]}${c}`
}
