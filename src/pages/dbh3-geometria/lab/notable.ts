import { pick, randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { freshFrom, type Prediction } from './prediction.ts'

/* ==========================================================================
   L2 · Puntu nabarmenak (Los puntos notables): a triangle with A = (0, 0)
   and B = (6, 0) fixed and a vertex C the learner moves on the grid. One
   kind of line is drawn (perpendicular bisectors, angle bisectors,
   medians or altitudes) with the point where they meet. First a guess:
   will the point be inside the triangle, on a side or outside? ▶ draws
   the three lines one after the other.
   ========================================================================== */

export type NotableKind = 'circumcentre' | 'incentre' | 'centroid' | 'orthocentre'
export const NOTABLE_KINDS: NotableKind[] = ['circumcentre', 'incentre', 'centroid', 'orthocentre']

export const C_LIMITS = { x: { min: -2, max: 8 }, y: { min: 1, max: 7 } } as const
export const A: Point = [0, 0]
export const B: Point = [6, 0]

export type Point = [number, number]

export interface NotableState {
    kind: NotableKind
    c: Point
    prediction: Prediction | null
}

export const initialNotableState: NotableState = { kind: 'circumcentre', c: [1, 4], prediction: null }

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value)))

export function setNotable(state: NotableState, patch: { kind?: NotableKind; x?: number; y?: number }): NotableState {
    const kind = patch.kind ?? state.kind
    const c: Point = [clamp(patch.x ?? state.c[0], C_LIMITS.x.min, C_LIMITS.x.max), clamp(patch.y ?? state.c[1], C_LIMITS.y.min, C_LIMITS.y.max)]
    const same = kind === state.kind && c[0] === state.c[0] && c[1] === state.c[1]
    return { kind, c, prediction: same ? state.prediction : null }
}

const distance = (p: Point, q: Point) => Math.hypot(p[0] - q[0], p[1] - q[1])

/** The point where the lines of each kind meet, for A = (0, 0), B = (6, 0) and C */
export function notablePoint(kind: NotableKind, [cx, cy]: Point): Point {
    if (kind === 'circumcentre') return [3, ((3 - cx) ** 2 + cy * cy - 9) / (2 * cy)]
    if (kind === 'centroid') return [(6 + cx) / 3, cy / 3]
    if (kind === 'orthocentre') return [cx, (-cx * (cx - 6)) / cy]
    const a = distance(B, [cx, cy])
    const b = distance(A, [cx, cy])
    const c = 6
    return [(a * 0 + b * 6 + c * cx) / (a + b + c), (c * cy) / (a + b + c)]
}

/** The three lines of a kind, each as two far-apart points */
export function notableLines(kind: NotableKind, c: Point, point: Point): Array<[Point, Point]> {
    const vertices: Point[] = [A, B, c]
    const far = (from: Point, direction: Point): [Point, Point] => {
        const length = Math.hypot(direction[0], direction[1]) || 1
        const unit: Point = [direction[0] / length, direction[1] / length]
        return [[from[0] - unit[0] * 30, from[1] - unit[1] * 30], [from[0] + unit[0] * 30, from[1] + unit[1] * 30]]
    }
    return vertices.map((vertex, index) => {
        const p = vertices[(index + 1) % 3]
        const q = vertices[(index + 2) % 3]
        const mid: Point = [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2]
        if (kind === 'circumcentre') return far(mid, [-(q[1] - p[1]), q[0] - p[0]])
        if (kind === 'orthocentre') return far(vertex, [-(q[1] - p[1]), q[0] - p[0]])
        if (kind === 'centroid') return [vertex, mid]
        // Angle bisector: from the vertex through the incentre to the opposite side
        const direction: Point = [point[0] - vertex[0], point[1] - vertex[1]]
        return [vertex, [vertex[0] + direction[0] * 1.6, vertex[1] + direction[1] * 1.6]]
    })
}

export type Place = 'inside' | 'side' | 'outside'

/** Inside the triangle, on one of its sides (or a vertex), or outside */
export function placeOf(point: Point, c: Point): Place {
    const cross = (p: Point, q: Point, r: Point) => (q[0] - p[0]) * (r[1] - p[1]) - (q[1] - p[1]) * (r[0] - p[0])
    const signs = [cross(A, B, point), cross(B, c, point), cross(c, A, point)].map((value) => (Math.abs(value) < 1e-9 ? 0 : Math.sign(value)))
    if (signs.every((sign) => sign >= 0) || signs.every((sign) => sign <= 0)) return signs.includes(0) ? 'side' : 'inside'
    return 'outside'
}

export const notablePlace = (state: NotableState) => placeOf(notablePoint(state.kind, state.c), state.c)
/** Inside (<), on a side (=) or outside (>)? */
export const notablePrediction = (state: NotableState): Prediction => ({ inside: '<', side: '=', outside: '>' } as const)[notablePlace(state)]

export const setNotablePrediction = (state: NotableState, prediction: Prediction): NotableState => (state.prediction === null ? { ...state, prediction } : state)

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const pointIs = (kind: NotableKind, x: number, y: number) => (state: NotableState) => {
    const [px, py] = notablePoint(kind, state.c)
    return state.kind === kind && Math.abs(px - x) < 1e-9 && Math.abs(py - y) < 1e-9
}

export const notableChallenges: LabChallenge<NotableState>[] = [
    { id: 95201, prompt: say('Jarri zirkunzentroa triangeluaren alde batean.', 'Pon el circuncentro sobre un lado del triángulo.', 'ضع مركز الدائرة المحيطة على ضلع من أضلاع المثلث.', 'Put the circumcentre on a side of the triangle.'), hint: say('Triangelu zuzen batean, hipotenusaren erdian dago.', 'En un triángulo rectángulo está en el punto medio de la hipotenusa.', 'في المثلث القائم يقع في منتصف الوتر.', 'In a right triangle it is at the midpoint of the hypotenuse.'), isSolved: (state) => state.kind === 'circumcentre' && notablePlace(state) === 'side' },
    { id: 95202, prompt: say('Atera ortozentroa triangelutik kanpora.', 'Saca el ortocentro fuera del triángulo.', 'أخرج ملتقى الارتفاعات من المثلث.', 'Move the orthocentre outside the triangle.'), hint: say('Triangelu kamutsa egin.', 'Haz un triángulo obtusángulo.', 'اصنع مثلثًا منفرجًا.', 'Make an obtuse triangle.'), isSolved: (state) => state.kind === 'orthocentre' && notablePlace(state) === 'outside' },
    { id: 95203, prompt: say('Jarri ortozentroa erpin batean.', 'Haz que el ortocentro sea un vértice.', 'اجعل ملتقى الارتفاعات رأسًا.', 'Make the orthocentre a vertex.'), hint: say('Triangelu zuzenean, bi altuera katetoak dira.', 'En un triángulo rectángulo, dos alturas son los catetos.', 'في المثلث القائم ارتفاعان هما الضلعان القائمان.', 'In a right triangle, two altitudes are the legs.'), isSolved: (state) => state.kind === 'orthocentre' && [A, B, state.c].some((vertex) => distance(vertex, notablePoint('orthocentre', state.c)) < 1e-9) },
    { id: 95204, prompt: say('Jarri barizentroa $(3,2)$ puntuan.', 'Pon el baricentro en el punto $(3,2)$.', 'ضع مركز الثقل في النقطة $(3,2)$.', 'Put the centroid at the point $(3,2)$.'), hint: say('Barizentroa erpinen batez bestekoa da.', 'El baricentro es la media de los vértices.', 'مركز الثقل متوسط الرؤوس.', 'The centroid is the mean of the vertices.'), isSolved: pointIs('centroid', 3, 2) },
    { id: 95205, prompt: say('Jarri inzentroa $x=3$ zuzenean.', 'Pon el incentro sobre la recta $x=3$.', 'ضع مركز الدائرة المحاطة على المستقيم $x=3$.', 'Put the incentre on the line $x=3$.'), hint: say('Triangelu isoszele bat: $C$ erdian.', 'Un triángulo isósceles: $C$ en el medio.', 'مثلث متساوي الساقين: $C$ في المنتصف.', 'An isosceles triangle: $C$ in the middle.'), isSolved: (state) => state.kind === 'incentre' && Math.abs(notablePoint('incentre', state.c)[0] - 3) < 1e-9 }
]

/** Endless practice: the centroid or the circumcentre at a given point */
const notableMaker: LabChallengeMaker<NotableState> = (random) => {
    for (;;) {
        const c: Point = [randomInt(random, C_LIMITS.x.min, C_LIMITS.x.max), randomInt(random, C_LIMITS.y.min, C_LIMITS.y.max)]
        const kind = pick(random, ['centroid', 'circumcentre'] as NotableKind[])
        const [x, y] = notablePoint(kind, c)
        if (!Number.isInteger(x) || !Number.isInteger(y)) continue
        const name = kind === 'centroid' ? say('barizentroa', 'el baricentro', 'مركز الثقل', 'the centroid') : say('zirkunzentroa', 'el circuncentro', 'مركز الدائرة المحيطة', 'the circumcentre')
        return {
            prompt: say(`Jarri ${name.eu} $(${x},${y})$ puntuan.`, `Pon ${name.es} en el punto $(${x},${y})$.`, `ضع ${name.ar} في النقطة $(${x},${y})$.`, `Put ${name.en} at the point $(${x},${y})$.`),
            hint: say(`Adibidez, $C=(${c[0]},${c[1]})$.`, `Por ejemplo, $C=(${c[0]},${c[1]})$.`, `مثلًا $C=(${c[0]},${c[1]})$.`, `For example, $C=(${c[0]},${c[1]})$.`),
            isSolved: pointIs(kind, x, y),
            solution: { kind, c, prediction: null }
        }
    }
}

export const notableExtra = freshFrom(initialNotableState, notableMaker)
