import { pick, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'

/* ==========================================================================
   J3 · Ehizatu erroak (Caza las raíces): an equation z^n = w and a circle
   with a point every 15°, the circle of radius |z|. The learner taps every
   solution and checks; one missing, or one too many, is a mistake. Level
   1: w real or purely imaginary (z⁴ = 16, z² = −9, z³ = 8i); level 2: w in
   polar form (z³ = 8_{135°}); level 3: the equation as it comes, in
   binomial form (z³ + 8 = 0, z² = 2 + 2√3 i). The arguments of every
   solution are multiples of 15°, so they are points of the circle: n is 2,
   3, 4 or 6. Formulas write z as {z}.
   ========================================================================== */

export const ROOT_HUNT_ROUNDS = 6
export const ROOT_HUNT_STEP = 15
export const ROOT_HUNT_POINTS = Array.from({ length: 360 / ROOT_HUNT_STEP }, (_, index) => index * ROOT_HUNT_STEP)

export interface RootHuntRound {
    equation: string
    n: number
    /** The modulus of w and its argument */
    modulus: number
    argument: number
    /** The modulus of the solutions, for LaTeX */
    rootModulus: string
    solutions: number[]
}

/** The arguments of the n-th roots of a number with argument θ */
export const rootAngles = (n: number, argument: number) => Array.from({ length: n }, (_, k) => (argument + 360 * k) / n).sort((a, b) => a - b)

/** The n-th root of a modulus for LaTeX: whole when it is, otherwise a root */
const rootOf = (n: number, modulus: number) => {
    const value = modulus ** (1 / n)
    if (Math.abs(value - Math.round(value)) < 1e-9) return String(Math.round(value))
    return n === 2 ? `\\sqrt{${modulus}}` : `\\sqrt[${n}]{${modulus}}`
}

interface Equation { equation: string; n: number; modulus: number; argument: number }

/** w real or purely imaginary: its modulus a whole power, its argument a multiple of 90° */
const LEVEL_ONE: Equation[] = [
    { equation: '{z}^2=-9', n: 2, modulus: 9, argument: 180 },
    { equation: '{z}^2=4i', n: 2, modulus: 4, argument: 90 },
    { equation: '{z}^2=-16i', n: 2, modulus: 16, argument: 270 },
    { equation: '{z}^3=8', n: 3, modulus: 8, argument: 0 },
    { equation: '{z}^3=-27', n: 3, modulus: 27, argument: 180 },
    { equation: '{z}^3=8i', n: 3, modulus: 8, argument: 90 },
    { equation: '{z}^3=-i', n: 3, modulus: 1, argument: 270 },
    { equation: '{z}^4=16', n: 4, modulus: 16, argument: 0 },
    { equation: '{z}^4=-81', n: 4, modulus: 81, argument: 180 },
    { equation: '{z}^6=1', n: 6, modulus: 1, argument: 0 },
    { equation: '{z}^6=-64', n: 6, modulus: 64, argument: 180 },
    { equation: '{z}^6=i', n: 6, modulus: 1, argument: 90 }
]

/** Level 2: w in polar form, with the argument a multiple of 15° · n */
function polarEquation(random: Random): Equation {
    const n = pick(random, [2, 3, 4, 6])
    const modulus = pick(random, n === 2 ? [4, 9, 16, 25] : n === 3 ? [1, 8, 27] : n === 4 ? [1, 16, 81] : [1, 64])
    const step = 15 * n
    const argument = pick(random, Array.from({ length: 360 / step }, (_, index) => index * step).filter((value) => value !== 0 && (value % 90 !== 0 || n === 6)))
    return { equation: `{z}^${n}=${modulus}_{${argument}°}`, n, modulus, argument }
}

/** Level 3: the equation as it comes, in binomial form */
const LEVEL_THREE: Equation[] = [
    { equation: '{z}^3+8=0', n: 3, modulus: 8, argument: 180 },
    { equation: '{z}^4+16=0', n: 4, modulus: 16, argument: 180 },
    { equation: '{z}^6+64=0', n: 6, modulus: 64, argument: 180 },
    { equation: '{z}^2+2i=0', n: 2, modulus: 2, argument: 270 },
    { equation: '{z}^3-8i=0', n: 3, modulus: 8, argument: 90 },
    { equation: '{z}^2=2+2\\sqrt{3}\\,i', n: 2, modulus: 4, argument: 60 },
    { equation: '{z}^2=-8+8\\sqrt{3}\\,i', n: 2, modulus: 16, argument: 120 },
    { equation: '{z}^3=-4\\sqrt{2}+4\\sqrt{2}\\,i', n: 3, modulus: 8, argument: 135 },
    { equation: '{z}^4=-8-8\\sqrt{3}\\,i', n: 4, modulus: 16, argument: 240 },
    { equation: '{z}^2=-2-2\\sqrt{3}\\,i', n: 2, modulus: 4, argument: 240 },
    { equation: '{z}^4-1=0', n: 4, modulus: 1, argument: 0 },
    { equation: '{z}^3+i=0', n: 3, modulus: 1, argument: 270 }
]

const toRound = ({ equation, n, modulus, argument }: Equation): RootHuntRound => ({
    equation, n, modulus, argument,
    rootModulus: rootOf(n, modulus),
    solutions: rootAngles(n, argument)
})

/** Six different rounds of one level */
export function createRootHuntRounds(random: Random, levelIndex: number): RootHuntRound[] {
    if (levelIndex === 0) return shuffle(random, LEVEL_ONE).slice(0, ROOT_HUNT_ROUNDS).map(toRound)
    if (levelIndex === 2) return shuffle(random, LEVEL_THREE).slice(0, ROOT_HUNT_ROUNDS).map(toRound)
    const rounds: RootHuntRound[] = []
    for (let attempt = 0; rounds.length < ROOT_HUNT_ROUNDS && attempt < 2000; attempt += 1) {
        const made = toRound(polarEquation(random))
        if (!rounds.some((other) => other.equation === made.equation)) rounds.push(made)
    }
    return rounds
}

/** The equations of levels 1 and 3, as the tests check them */
export const rootHuntEquations = [...LEVEL_ONE, ...LEVEL_THREE]

/** Right when the tapped points are exactly the solutions */
export const isRootHuntRight = (round: RootHuntRound, chosen: number[]) => chosen.length === round.solutions.length && round.solutions.every((angle) => chosen.includes(angle))
