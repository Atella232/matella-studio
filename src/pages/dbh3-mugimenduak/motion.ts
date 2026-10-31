/* ==========================================================================
   Planoko mugimenduak · 3. DBH — the movements of the plane as pure
   functions on points: translation by a vector, rotation about a centre
   (exact for multiples of 90°), reflection in a vertical, horizontal or
   diagonal line, and enlargement from a centre. The flag is the shape the
   unit moves around: a pole and a triangle, so that its image shows at a
   glance whether it has been turned or flipped.
   ========================================================================== */

export type Point = [number, number]

/** The flag: pole from (0, 0) to (0, 3) and a triangle to its tip P = (2, 2) */
export const FLAG: Point[] = [[0, 0], [0, 3], [2, 2], [0, 1]]
export const FLAG_TIP = 2

const tidy = (value: number) => (Math.abs(value) < 1e-9 ? 0 : Math.round(value * 1e9) / 1e9)

export const translate = ([x, y]: Point, [a, b]: Point): Point => [x + a, y + b]

/** Rotation anticlockwise by `degrees` about `centre` */
export function rotate([x, y]: Point, degrees: number, [cx, cy]: Point = [0, 0]): Point {
    const turn = ((Math.round(degrees) % 360) + 360) % 360
    const dx = x - cx
    const dy = y - cy
    // Multiples of 90° are worked out exactly
    if (turn === 0) return [x, y]
    if (turn === 90) return [cx - dy, cy + dx]
    if (turn === 180) return [cx - dx, cy - dy]
    if (turn === 270) return [cx + dy, cy - dx]
    const radians = (turn * Math.PI) / 180
    return [tidy(cx + dx * Math.cos(radians) - dy * Math.sin(radians)), tidy(cy + dx * Math.sin(radians) + dy * Math.cos(radians))]
}

export type Axis = { kind: 'vertical'; at: number } | { kind: 'horizontal'; at: number } | { kind: 'diagonal' }

/** Reflection in the line x = at, y = at or y = x */
export function reflect([x, y]: Point, axis: Axis): Point {
    if (axis.kind === 'vertical') return [2 * axis.at - x, y]
    if (axis.kind === 'horizontal') return [x, 2 * axis.at - y]
    return [y, x]
}

/** Enlargement with centre `centre` and factor k */
export const enlarge = ([x, y]: Point, k: number, [cx, cy]: Point = [0, 0]): Point => [tidy(cx + k * (x - cx)), tidy(cy + k * (y - cy))]

export const modulus = ([a, b]: Point) => Math.hypot(a, b)

export const placeFlag = (at: Point): Point[] => FLAG.map((point) => translate(point, at))
