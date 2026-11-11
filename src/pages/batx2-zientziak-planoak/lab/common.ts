import { fraction, toLatex, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import { clampTo } from '../../batx2-zientziak-bektoreak/lab/common.ts'
import type { Vec3 } from '../../batx2-zientziak-bektoreak/space/vec3.ts'

/* ==========================================================================
   Small pieces shared by the laboratory tools of Zuzenak eta planoak
   espazioan: the equation of a plane written well (no 1x, no 0y, no
   +-2), exact ranks of the small matrices of the tools, a direction or
   a normal that never becomes the zero vector, and exact points.
   The general helpers (say, vec, minus…) come from the lab of
   Espazioko bektoreak.
   ========================================================================== */

export { clampTo, clampVec, isZeroVec, minus, sameVec, say, vec, wrap } from '../../batx2-zientziak-bektoreak/lab/common.ts'

const NAMES = ['x', 'y', '{z}'] as const

/** a·x + b·y + c·z in LaTeX: zero terms left out, 1 and −1 without the number, signs joined well; 0 when all are 0 */
export function linearLatex(coefficients: readonly number[], names: readonly string[] = NAMES): string {
    let text = ''
    coefficients.forEach((raw, index) => {
        const value = raw + 0
        if (value === 0) return
        const size = Math.abs(value)
        const sign = value < 0 ? '-' : text ? '+' : ''
        text += `${sign}${size === 1 ? '' : size}${names[index]}`
    })
    return text || '0'
}

/** One term k·t of a sum, written well: no 1t, no 0t, a + only when something comes before */
export const termLatex = (coefficient: number, letter: string, first = false) =>
    coefficient === 0 ? '' : `${coefficient < 0 ? '-' : first ? '' : '+'}${Math.abs(coefficient) === 1 ? '' : Math.abs(coefficient)}${letter}`
/** A constant term of a sum: nothing when it is 0 */
export const constantLatex = (value: number, first = false) => (value === 0 ? '' : `${value < 0 ? '-' : first ? '' : '+'}${Math.abs(value)}`)

/** The general equation a·x + b·y + c·z + D = 0 of the plane with normal n */
export function generalLatex(n: Vec3, D: number): string {
    const constant = D + 0
    return `${linearLatex(n)}${constant === 0 ? '' : constant < 0 ? `-${-constant}` : `+${constant}`}=0`
}

/** The equation a·x + b·y + c·z = d of the plane with normal n */
export const levelLatex = (n: Vec3, d: number) => `${linearLatex(n)}=${d + 0}`

/** The determinant of three rows of three numbers */
const det = (a: readonly number[], b: readonly number[], c: readonly number[]) =>
    a[0] * (b[1] * c[2] - b[2] * c[1]) - a[1] * (b[0] * c[2] - b[2] * c[0]) + a[2] * (b[0] * c[1] - b[1] * c[0])

/** Exact rank of a matrix of whole numbers with at most three rows, by its minors */
export function exactRank(rows: readonly (readonly number[])[]): number {
    const height = rows.length
    const width = height ? rows[0].length : 0
    const columns = [...Array(width).keys()]
    if (height >= 3) {
        for (let i = 0; i < width; i++) for (let j = i + 1; j < width; j++) for (let k = j + 1; k < width; k++) {
            const pick = (row: readonly number[]) => [row[i], row[j], row[k]]
            if (det(pick(rows[0]), pick(rows[1]), pick(rows[2])) !== 0) return 3
        }
    }
    for (let r = 0; r < height; r++) for (let s = r + 1; s < height; s++) {
        for (const i of columns) for (const j of columns) if (j > i && rows[r][i] * rows[s][j] - rows[r][j] * rows[s][i] !== 0) return 2
    }
    return rows.some((row) => row.some((value) => value !== 0)) ? 1 : 0
}

/** Two rows are proportional (the same plane, or parallel normals when only a, b and c are given) */
export const proportional = (a: readonly number[], b: readonly number[]) => exactRank([a, b]) < 2

/**
 * A new value for a direction or a normal, kept between −limit and limit. The zero vector is no
 * direction: when a step would make it, the coordinate that changed jumps over 0 to the other side.
 */
export function nonZeroStep(limit: number, previous: Vec3, next: Vec3): Vec3 {
    const clamp = clampTo(limit)
    const value: [number, number, number] = [clamp(next[0]), clamp(next[1]), clamp(next[2])]
    if (value.some((coordinate) => coordinate !== 0)) return value
    const changed = [0, 1, 2].find((index) => previous[index] !== 0) ?? 2
    value[changed] = previous[changed] > 0 ? -1 : 1
    return value
}

/** A vector without −0 (for the readouts and the comparisons) */
export const tidy = ([x, y, z]: Vec3): Vec3 => [x + 0, y + 0, z + 0]

/** An exact point with fractions, in LaTeX */
export const pointLatex = (point: readonly FractionValue[]) => `\\left(${point.map((coordinate) => toLatex(coordinate)).join(',')}\\right)`
export const fractionPoint = (numerators: Vec3, denominator: number): FractionValue[] => numerators.map((value) => fraction(value, denominator))
export const toNumbers = (point: readonly FractionValue[]): Vec3 => [point[0].numerator / point[0].denominator, point[1].numerator / point[1].denominator, point[2].numerator / point[2].denominator]
/** A point the board can draw: inside the box of the drawing */
export const insideBox = (point: Vec3, range: number) => point.every((value) => Math.abs(value) <= range + 1e-9)
