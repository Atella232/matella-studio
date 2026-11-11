/* ==========================================================================
   Vectors in space — the small exact arithmetic the three units of the
   Espacio block share (Espazioko bektoreak, Zuzenak eta planoak, Angeluak
   eta distantziak): coordinates, dot, cross and mixed products, the 3×3
   determinant and the rank of a small integer matrix. The 2.º Bachillerato
   algebra units are built at the same time on another branch, so this
   block keeps its own little versions. Plain data, no React; tests in
   tests/bektoreak-batx2z-space.test.ts.
   ========================================================================== */

export type Vec3 = readonly [number, number, number]

export const ORIGIN: Vec3 = [0, 0, 0]

export const add = (a: Vec3, b: Vec3): Vec3 => [a[0] + b[0], a[1] + b[1], a[2] + b[2]]
export const sub = (a: Vec3, b: Vec3): Vec3 => [a[0] - b[0], a[1] - b[1], a[2] - b[2]]
export const scale = (k: number, a: Vec3): Vec3 => [k * a[0], k * a[1], k * a[2]]
export const dot = (a: Vec3, b: Vec3): number => a[0] * b[0] + a[1] * b[1] + a[2] * b[2]
export const cross = (a: Vec3, b: Vec3): Vec3 => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]
export const norm2 = (a: Vec3): number => dot(a, a)
export const norm = (a: Vec3): number => Math.sqrt(norm2(a))
export const midpoint = (a: Vec3, b: Vec3): Vec3 => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2]
export const isZero = (a: Vec3): boolean => a.every((value) => Math.abs(value) < 1e-9)
export const sameVec = (a: Vec3, b: Vec3): boolean => isZero(sub(a, b))
/** u and v on the same line through the origin (the zero vector is parallel to everything) */
export const parallel = (a: Vec3, b: Vec3): boolean => isZero(cross(a, b))
export const unit = (a: Vec3): Vec3 => scale(1 / norm(a), a)

/** The 3×3 determinant of three rows */
export const det3 = (a: Vec3, b: Vec3, c: Vec3): number =>
    a[0] * (b[1] * c[2] - b[2] * c[1]) - a[1] * (b[0] * c[2] - b[2] * c[0]) + a[2] * (b[0] * c[1] - b[1] * c[0])

/** The mixed product [u, v, w] = u · (v × w), the same as the determinant of the three rows */
export const mixed = (u: Vec3, v: Vec3, w: Vec3): number => dot(u, cross(v, w))

/** The angle between two non-zero vectors, in degrees */
export const angleDeg = (a: Vec3, b: Vec3): number => {
    const cosine = Math.max(-1, Math.min(1, dot(a, b) / (norm(a) * norm(b))))
    return (Math.acos(cosine) * 180) / Math.PI
}

/**
 * The rank of a small matrix (rows of any equal length): Gaussian elimination with the largest pivot.
 * The matrices of these units hold small whole numbers, so a tolerance of 1e-9 is safe.
 */
export function rank(rows: readonly (readonly number[])[]): number {
    const matrix = rows.map((row) => [...row])
    const height = matrix.length
    const width = height ? matrix[0].length : 0
    let found = 0
    for (let column = 0; column < width && found < height; column++) {
        let pivotRow = found
        for (let row = found + 1; row < height; row++) if (Math.abs(matrix[row][column]) > Math.abs(matrix[pivotRow][column])) pivotRow = row
        if (Math.abs(matrix[pivotRow][column]) < 1e-9) continue
        ;[matrix[found], matrix[pivotRow]] = [matrix[pivotRow], matrix[found]]
        for (let row = found + 1; row < height; row++) {
            const factor = matrix[row][column] / matrix[found][column]
            for (let other = column; other < width; other++) matrix[row][other] -= factor * matrix[found][other]
        }
        found++
    }
    return found
}

const gcd2 = (a: number, b: number): number => (b === 0 ? Math.abs(a) : gcd2(b, a % b))
/** The greatest common divisor of whole numbers (0 if all are 0) */
export const gcd = (...values: number[]): number => values.reduce((acc, value) => gcd2(acc, Math.round(value)), 0)

/** The smallest whole vector with the same direction and sense (for normals and directions) */
export const primitive = (a: Vec3): Vec3 => {
    const divisor = gcd(...a) || 1
    return [a[0] / divisor, a[1] / divisor, a[2] / divisor]
}

/** −0 written as 0 */
const clean = (value: number) => (Object.is(value, -0) ? 0 : value)

/** (2,-1,3) for a formula */
export const vecLatex = (a: Vec3): string => `(${a.map(clean).join(',')})`
/** (2, −1, 3) for a drawing (real minus sign, spaces after the commas) */
export const vecText = (a: Vec3): string => `(${a.map((value) => String(clean(value)).replace('-', '−')).join(', ')})`
