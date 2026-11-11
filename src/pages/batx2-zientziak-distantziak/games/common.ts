import { randomInt, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { cross, dot, type Vec3 } from '../../batx2-zientziak-bektoreak/space/vec3.ts'
import { generalLatex } from '../../batx2-zientziak-planoak/lab/common.ts'

/* ==========================================================================
   Small pieces shared by the games of Angeluak eta distantziak: how
   vectors, roots and fractions are written, nice angles from two
   vectors, normals and offsets of whole length (so that distances come
   out whole) and the plane A·x + B·y + C·z + D = 0 of the lessons.
   ========================================================================== */

export const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
export const vec = (a: Vec3) => `(${a.map((value) => value + 0).join(',')})`
export const tidy = (a: Vec3): Vec3 => [a[0] + 0, a[1] + 0, a[2] + 0]
export const wrap = (value: number) => (value < 0 ? `(${value})` : String(value + 0))
export const small = (random: Random, limit: number): Vec3 => [randomInt(random, -limit, limit), randomInt(random, -limit, limit), randomInt(random, -limit, limit)]
export const isZero = (a: Vec3) => a.every((value) => value === 0)
export const nonZeroCount = (a: Vec3) => a.filter((value) => value !== 0).length
export const inside = (a: Vec3, limit: number) => a.every((value) => Math.abs(value) <= limit)
export const same = (a: Vec3, b: Vec3) => a[0] === b[0] && a[1] === b[1] && a[2] === b[2]
export const isWhole = (value: number) => Number.isInteger(value)

/** √n in LaTeX, whole when n is a perfect square */
export const root = (n: number) => (Number.isInteger(Math.sqrt(n)) ? String(Math.sqrt(n)) : `\\sqrt{${n}}`)

const gcd = (a: number, b: number): number => (b === 0 ? Math.abs(a) : gcd(b, a % b))
/** p / q reduced: a whole number or \frac */
export function fracLatex(p: number, q: number): string {
    const common = gcd(p, q) || 1
    const [top, bottom] = [p / common, q / common].map((value) => value + 0)
    const sign = top * bottom < 0 ? '-' : ''
    return Math.abs(bottom) === 1 ? `${sign}${Math.abs(top)}` : `${sign}\\frac{${Math.abs(top)}}{${Math.abs(bottom)}}`
}

/** The plane n·X + D = 0 of the lessons */
export interface Plane {
    normal: Vec3
    D: number
}
export const planeLatex = ({ normal, D }: Plane) => generalLatex(normal, D)
/** The value of n·P + D: its absolute value over |n| is the distance */
export const planeValue = ({ normal, D }: Plane, p: Vec3) => dot(normal, p) + D + 0

export interface Line {
    point: Vec3
    direction: Vec3
}
/** (x,y,z) = A + t·u */
export const lineLatex = ({ point, direction }: Line, parameter = 't') => `(x,y,{z})=${vec(point)}+${parameter}\\,${vec(direction)}`

/** Normals of whole magnitude (1 or 3), so that point–plane distances come out exact */
export const WHOLE_NORMALS: Vec3[] = (() => {
    const list: Vec3[] = []
    for (let x = -2; x <= 2; x++) for (let y = -2; y <= 2; y++) for (let z = -2; z <= 2; z++) {
        const size = x * x + y * y + z * z
        if (size === 1 || size === 9) list.push([x, y, z])
    }
    return list
})()

/** Offsets of whole length 1 to 4 (coordinates from −4 to 4): a point at that distance from a line */
export const WHOLE_OFFSETS: Vec3[] = (() => {
    const list: Vec3[] = []
    for (let x = -4; x <= 4; x++) for (let y = -4; y <= 4; y++) for (let z = -4; z <= 4; z++) {
        const length = Math.sqrt(x * x + y * y + z * z)
        if (length >= 1 && length <= 4 && Number.isInteger(length)) list.push([x, y, z])
    }
    return list
})()
export const lengthOf = (a: Vec3) => Math.round(Math.sqrt(dot(a, a)))

/** The square of the cosine of the angle of a and b, times 4, when it is 0, 1, 2 or 3 (90°, 60°, 45°, 30°); else null */
export function niceQuarter(a: Vec3, b: Vec3): number | null {
    const top = 4 * dot(a, b) ** 2
    const bottom = dot(a, a) * dot(b, b)
    if (bottom === 0 || top % bottom !== 0) return null
    const quarter = top / bottom
    return quarter < 4 ? quarter : null
}
/** The angle (in degrees) whose cosine squared is quarter / 4 */
export const COS_ANGLE = [90, 60, 45, 30]
/** The angle (in degrees) whose sine squared is quarter / 4 */
export const SIN_ANGLE = [0, 30, 45, 60]

/** The distance from P to the line, squared, as top / bottom */
export function lineSquare(line: Line, p: Vec3): [number, number] {
    const c = cross([p[0] - line.point[0], p[1] - line.point[1], p[2] - line.point[2]], line.direction)
    return [dot(c, c), dot(line.direction, line.direction)]
}
