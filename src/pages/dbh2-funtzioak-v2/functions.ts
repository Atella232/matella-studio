import { fraction, type FractionValue } from '../../features/unit-v2/math/fraction.ts'
import type { LocalizedText } from '../../features/unit-v2/types.ts'
import type { PlaneBox } from './planeMap.ts'

/* ==========================================================================
   Funtzioak (2. DBH) — pure maths shared by the lessons, the laboratory and
   the games: points and quadrants, straight lines written as y = mx + n,
   slopes, intercepts and the polyline "story graphs" read in the lab.
   Everything here is plain TypeScript so the node tests can load it.
   ========================================================================== */

export type Point = readonly [x: number, y: number]

/* ---------- Writing numbers and lines ---------- */

/** A number as LaTeX: halves as fractions, other decimals with the decimal comma */
export function numberLatex(value: number): string {
    if (Number.isInteger(value)) return String(value)
    if (Number.isInteger(value * 2)) return `${value < 0 ? '-' : ''}\\frac{${Math.abs(value * 2)}}{2}`
    return String(value).replace('.', '{,}')
}

/** y = mx + n written the way a textbook does: y = 2x − 1, y = −x, y = 3, y = ½x + 1 */
export function lineLatex(m: number, n: number): string {
    const slope = m === 0 ? '' : m === 1 ? 'x' : m === -1 ? '-x' : `${numberLatex(m)}x`
    if (slope === '') return `y=${numberLatex(n)}`
    if (n === 0) return `y=${slope}`
    const intercept = n < 0 ? `-${numberLatex(-n)}` : `+${numberLatex(n)}`
    return `y=${slope}${intercept}`
}

/** A point as LaTeX: (−2, 3) */
export const pointLatex = (point: Point) => `(${numberLatex(point[0])},\\,${numberLatex(point[1])})`

/** Plain text with a true minus sign, for readouts and aria labels */
export const signed = (value: number) => (value < 0 ? `−${Math.abs(value)}` : String(value))

export const lineValue = (m: number, n: number, x: number) => m * x + n

/* ---------- Quadrants ---------- */

/** 1–4, or 0 when the point is on an axis */
export function quadrantOf([x, y]: Point): 0 | 1 | 2 | 3 | 4 {
    if (x === 0 || y === 0) return 0
    if (x > 0) return y > 0 ? 1 : 4
    return y > 0 ? 2 : 3
}

export const quadrantRoman = ['', 'I', 'II', 'III', 'IV'] as const

export function quadrantText(point: Point): LocalizedText {
    const quadrant = quadrantOf(point)
    if (quadrant > 0) {
        const roman = quadrantRoman[quadrant]
        return { eu: `${roman}. koadrantea`, es: `${roman} cuadrante`, ar: `الربع ${roman}` }
    }
    const [x, y] = point
    if (x === 0 && y === 0) return { eu: 'jatorria', es: 'el origen', ar: 'نقطة الأصل' }
    return y === 0
        ? { eu: 'X ardatzean', es: 'en el eje X', ar: 'على محور X' }
        : { eu: 'Y ardatzean', es: 'en el eje Y', ar: 'على محور Y' }
}

/* ---------- Relations and functions ---------- */

/** A relation is a function when no x has two different y */
export function isFunctionRelation(points: readonly Point[]): boolean {
    const seen = new Map<number, number>()
    for (const [x, y] of points) {
        if (seen.has(x) && seen.get(x) !== y) return false
        seen.set(x, y)
    }
    return true
}

/** Points of the relation that share the abscissa x */
export const pointsAtX = (points: readonly Point[], x: number) => points.filter((point) => point[0] === x)

/* ---------- Slope and intercepts ---------- */

export const slopeBetween = (a: Point, b: Point): FractionValue | null => (a[0] === b[0] ? null : fraction(b[1] - a[1], b[0] - a[0]))

/** Where the line y = mx + n cuts the X axis; null for a horizontal line (none or all of the axis) */
export const lineXIntercept = (m: number, n: number): number | null => (m === 0 ? null : -n / m)

/* ---------- Story graphs read in the laboratory ---------- */

export type Trend = 'up' | 'down' | 'flat'

export interface StoryGraph {
    id: string
    title: LocalizedText
    /** One word for the selector of the laboratory */
    short: LocalizedText
    xLabel: LocalizedText
    yLabel: LocalizedText
    /** One point for every whole x between the first and the last */
    points: Point[]
}

export const storyGraphs: StoryGraph[] = [
    {
        id: 'temperature',
        title: { eu: 'Tenperatura egun batean', es: 'Temperatura a lo largo del día', ar: 'درجة الحرارة خلال اليوم' },
        short: { eu: 'Tenperatura', es: 'Temperatura', ar: 'الحرارة' },
        xLabel: { eu: 'ordua (h)', es: 'hora (h)', ar: 'الساعة (س)' },
        yLabel: { eu: 'tenperatura (°C)', es: 'temperatura (°C)', ar: 'الحرارة (°م)' },
        points: [[0, 3], [1, 2], [2, 1], [3, 4], [4, 8], [5, 11], [6, 12], [7, 9], [8, 6]]
    },
    {
        id: 'plane',
        title: { eu: 'Hegazkin baten altuera', es: 'Altura de una avioneta', ar: 'ارتفاع طائرة صغيرة' },
        short: { eu: 'Hegazkina', es: 'Avioneta', ar: 'الطائرة' },
        xLabel: { eu: 'denbora (h)', es: 'tiempo (h)', ar: 'الزمن (س)' },
        yLabel: { eu: 'altuera (km)', es: 'altura (km)', ar: 'الارتفاع (كم)' },
        points: [[0, 0], [1, 2], [2, 4], [3, 4], [4, 4], [5, 6], [6, 3], [7, 1], [8, 0]]
    },
    {
        id: 'speed',
        title: { eu: 'Lasterketa-auto baten abiadura', es: 'Velocidad de un coche de carreras', ar: 'سرعة سيارة سباق' },
        short: { eu: 'Abiadura', es: 'Velocidad', ar: 'السرعة' },
        xLabel: { eu: 'ibilbidea (km)', es: 'recorrido (km)', ar: 'المسافة (كم)' },
        yLabel: { eu: 'abiadura (×10 km/h)', es: 'velocidad (×10 km/h)', ar: 'السرعة (×10 كم/س)' },
        points: [[0, 1], [1, 3], [2, 6], [3, 8], [4, 5], [5, 2], [6, 5], [7, 7], [8, 4]]
    },
    {
        id: 'tank',
        title: { eu: 'Depositu bat hustuz', es: 'Un depósito que se vacía', ar: 'خزان يفرغ' },
        short: { eu: 'Depositua', es: 'Depósito', ar: 'الخزان' },
        xLabel: { eu: 'denbora (min)', es: 'tiempo (min)', ar: 'الزمن (د)' },
        yLabel: { eu: 'ura (litro)', es: 'agua (litros)', ar: 'الماء (لتر)' },
        points: [[0, 8], [1, 7], [2, 5], [3, 4], [4, 2], [5, 0]]
    },
    {
        id: 'abstract',
        title: { eu: 'Funtzio bat', es: 'Una función', ar: 'دالة' },
        short: { eu: 'f(x)', es: 'f(x)', ar: 'f(x)' },
        xLabel: { eu: 'x', es: 'x', ar: 'x' },
        yLabel: { eu: 'y', es: 'y', ar: 'y' },
        points: [[-4, -2], [-3, 0], [-2, 2], [-1, 3], [0, 2], [1, 0], [2, -2], [3, -3], [4, -1], [5, 0]]
    }
]

export const graphXRange = (graph: StoryGraph): [number, number] => [graph.points[0][0], graph.points[graph.points.length - 1][0]]

export const graphValue = (graph: StoryGraph, x: number): number | null => graph.points.find((point) => point[0] === x)?.[1] ?? null

export function trendBetween(from: Point, to: Point): Trend {
    return to[1] > from[1] ? 'up' : to[1] < from[1] ? 'down' : 'flat'
}

export interface TrendInterval {
    from: number
    to: number
    trend: Trend
}

/** The stretches where the graph keeps rising, falling or staying level */
export function trendIntervals(points: readonly Point[]): TrendInterval[] {
    const intervals: TrendInterval[] = []
    for (let index = 1; index < points.length; index += 1) {
        const trend = trendBetween(points[index - 1], points[index])
        const last = intervals[intervals.length - 1]
        if (last && last.trend === trend) last.to = points[index][0]
        else intervals.push({ from: points[index - 1][0], to: points[index][0], trend })
    }
    return intervals
}

/** Peaks and valleys inside the graph (not at its ends) */
export function localExtremes(points: readonly Point[]): { maxima: Point[]; minima: Point[] } {
    const maxima: Point[] = []
    const minima: Point[] = []
    for (let index = 1; index < points.length - 1; index += 1) {
        const before = trendBetween(points[index - 1], points[index])
        const after = trendBetween(points[index], points[index + 1])
        if (before === 'up' && after === 'down') maxima.push(points[index])
        if (before === 'down' && after === 'up') minima.push(points[index])
    }
    return { maxima, minima }
}

/** Highest and lowest point of the whole graph (the first one when it repeats) */
export function globalExtremes(points: readonly Point[]): { max: Point; min: Point } {
    return {
        max: points.reduce((best, point) => (point[1] > best[1] ? point : best)),
        min: points.reduce((best, point) => (point[1] < best[1] ? point : best))
    }
}

/** Whole x where the graph meets the X axis */
export const graphZeros = (points: readonly Point[]): number[] => points.filter((point) => point[1] === 0).map((point) => point[0])

/* ---------- Graphs drawn beside exercises ---------- */

export type GraphColor = 'stage' | 'second' | 'mustard' | 'green' | 'ink'

/**
 * A graph described as plain data, so the exercises that use it stay in
 * TypeScript the tests can load (and check against the drawing). Values are
 * in grid squares; xUnit / yUnit say what one square is worth on each axis.
 */
export interface GraphSpec {
    box: PlaneBox
    cell?: number
    labelStep?: number
    xUnit?: number
    yUnit?: number
    xTitle?: LocalizedText
    yTitle?: LocalizedText
    /** Polylines through whole points (story graphs, a function sampled) */
    curves?: Array<{ points: Point[]; color?: GraphColor; dashed?: boolean }>
    /** Straight lines y = mx + n across the whole box */
    lines?: Array<{ m: number; n: number; color?: GraphColor; dashed?: boolean; name?: string; at?: number }>
    /** Separate dots: the points of a discrete graph, or points to name */
    points?: Array<{ at: Point; name?: string; color?: GraphColor; below?: boolean; left?: boolean }>
}

/** The value a graph's curve takes at x, in the units of the axes (null outside it) */
export function specValue(spec: GraphSpec, x: number, curve = 0): number | null {
    const points = spec.curves?.[curve]?.points
    if (!points) return null
    const scaled = x / (spec.xUnit ?? 1)
    const found = points.find((point) => point[0] === scaled)
    return found ? found[1] * (spec.yUnit ?? 1) : null
}

export const trendWord: Record<Trend, LocalizedText> = {
    up: { eu: 'gorakorra', es: 'creciente', ar: 'متزايدة' },
    down: { eu: 'beherakorra', es: 'decreciente', ar: 'متناقصة' },
    flat: { eu: 'konstantea', es: 'constante', ar: 'ثابتة' }
}
