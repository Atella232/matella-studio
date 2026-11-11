import { randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import { dot, type Vec3 } from '../../batx2-zientziak-bektoreak/space/vec3.ts'
import { COS_ANGLE, isZero, lineLatex, niceQuarter, nonZeroCount, planeLatex, root, SIN_ANGLE, small } from './common.ts'

/* ==========================================================================
   J1 · Sinua ala kosinua? (¿Seno o coseno?): two lines, a line and a
   plane, or two planes, written as equations. The learner first picks
   the formula (the cosine of the directions, the cosine of the normals
   or the sine of a direction and a normal) and then the angle, with the
   complement and the obtuse angle (no absolute value) among the options.
   Level 1: two lines or two planes; level 2: a line and a plane; level
   3: all three mixed. The angles are 0°, 30°, 45°, 60° or 90°.
   ========================================================================== */

export const SINE_ROUNDS = 6

export type AngleCase = 'lines' | 'line-plane' | 'planes'
export type AngleFormula = 'directions' | 'normals' | 'sine'

export const FORMULAS: AngleFormula[] = ['directions', 'normals', 'sine']
export const FORMULA_OF: Record<AngleCase, AngleFormula> = { lines: 'directions', 'line-plane': 'sine', planes: 'normals' }
export const FORMULA_LATEX: Record<AngleFormula, string> = {
    directions: '\\cos\\alpha=\\frac{|\\vec{u}\\cdot\\vec{v}|}{|\\vec{u}|\\,|\\vec{v}|}',
    normals: '\\cos\\alpha=\\frac{|\\vec{n}_1\\cdot\\vec{n}_2|}{|\\vec{n}_1|\\,|\\vec{n}_2|}',
    sine: '\\sin\\alpha=\\frac{|\\vec{u}\\cdot\\vec{n}|}{|\\vec{u}|\\,|\\vec{n}|}'
}

export interface SineRound {
    type: AngleCase
    /** The vector of each object: a direction for a line, a normal for a plane */
    a: Vec3
    b: Vec3
    first: string
    second: string
    angle: number
    options: number[]
    working: string
}

const FILLERS = [0, 30, 45, 60, 90, 120, 135, 150]

/** The angle the formula of the case gives for the two vectors (the tests check every round with it) */
export function angleOf(type: AngleCase, a: Vec3, b: Vec3): number | null {
    const quarter = niceQuarter(a, b)
    if (quarter === null) return null
    return type === 'line-plane' ? SIN_ANGLE[quarter] : COS_ANGLE[quarter]
}

function round(random: Random, type: AngleCase): SineRound | null {
    const a = small(random, 2)
    const b = small(random, 2)
    if (isZero(a) || isZero(b) || nonZeroCount(a) < 2 || nonZeroCount(b) < 2) return null
    const angle = angleOf(type, a, b)
    if (angle === null) return null
    const products = dot(a, b)
    // The obtuse angle as a trap only makes sense when the dot product is negative: then it shows up often
    if (products > 0 && randomInt(random, 0, 2) === 0) return null
    const level = () => randomInt(random, -4, 4)
    const point = () => small(random, 2)
    const first = type === 'planes' ? `\\pi_1\\colon ${planeLatex({ normal: a, D: level() })}` : `r\\colon ${lineLatex({ point: point(), direction: a })}`
    const second = type === 'lines' ? `s\\colon ${lineLatex({ point: point(), direction: b }, '\\lambda')}` : `\\pi${type === 'planes' ? '_2' : ''}\\colon ${planeLatex({ normal: b, D: level() })}`
    const traps = [90 - angle, 180 - angle, ...shuffle(random, FILLERS)]
    const options: number[] = [angle]
    for (const value of traps) if (options.length < 4 && value >= 0 && !options.includes(value)) options.push(value)
    const trig = type === 'line-plane' ? '\\sin' : '\\cos'
    const working = `${trig}\\alpha=\\frac{|${products}|}{${root(dot(a, a))}\\,${root(dot(b, b))}}\\ \\Rightarrow\\ \\alpha=${angle}^\\circ`
    return { type, a, b, first, second, angle, options: shuffle(random, options), working }
}

const LEVEL_TYPES: AngleCase[][] = [['lines', 'planes'], ['line-plane'], ['lines', 'line-plane', 'planes']]

/** Six rounds of one level, the cases of the level in turn */
export function createSineRounds(random: Random, level: number): SineRound[] {
    const types = LEVEL_TYPES[Math.min(2, Math.max(0, level))]
    const order = shuffle(random, Array.from({ length: SINE_ROUNDS }, (_, index) => types[index % types.length]))
    const rounds: SineRound[] = []
    for (const type of order) {
        for (let attempt = 0; attempt < 5000; attempt++) {
            const next = round(random, type)
            if (next && !rounds.some((other) => other.first === next.first || other.second === next.second)) {
                rounds.push(next)
                break
            }
        }
    }
    return rounds
}

