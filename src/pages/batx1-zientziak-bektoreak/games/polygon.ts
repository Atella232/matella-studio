import { fraction } from '../../../features/unit-v2/math/fraction.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import { written } from '../../batx1-zientziak-errealak/games/race.ts'

/* ==========================================================================
   J2 · Biderkadurak poligonoan (Productos en el polígono): a square, an
   equilateral triangle or a regular hexagon of side s with two of its
   vectors marked. The learner picks u·v among four values: the right one,
   the one with the sign changed (the inner angle of the polygon taken for
   the angle of two vectors that follow each other), |u|·|v| with the
   cosine forgotten, and another. Level 1: both vectors leave the same
   vertex (or the centre); level 2: one starts where the other ends, so
   it has to be moved; level 3: diagonals and everything mixed. The value
   is worked out from the coordinates, so it is always right.
   ========================================================================== */

export const POLYGON_ROUNDS = 6

export type Shape = 'square' | 'triangle' | 'hexagon'
export type Point = [number, number]

export interface PolygonRound {
    shape: Shape
    side: number
    /** The two vectors as pairs of vertex names: ['A', 'B'] is AB */
    first: [string, string]
    second: [string, string]
    /** The angle between them, in degrees */
    angle: number
    /** u·v in LaTeX, and its value */
    answer: string
    value: number
    options: string[]
    /** |u| |v| cos α = value, in LaTeX */
    working: string
}

const ROOT3 = Math.sqrt(3)

/** The vertices of a shape of side s (and the centre O of the hexagon) */
export function vertices(shape: Shape, s: number): Record<string, Point> {
    if (shape === 'square') return { A: [0, 0], B: [s, 0], C: [s, s], D: [0, s] }
    if (shape === 'triangle') return { A: [0, 0], B: [s, 0], C: [s / 2, (s * ROOT3) / 2] }
    const names = ['A', 'B', 'C', 'D', 'E', 'F']
    const points: Record<string, Point> = { O: [0, 0] }
    names.forEach((name, index) => {
        const turn = (index * Math.PI) / 3
        points[name] = [s * Math.cos(turn), s * Math.sin(turn)]
    })
    return points
}

/** The vectors of each level, as «AB·AC» */
const PAIRS: Record<Shape, string[][]> = {
    square: [['AB·AD', 'AB·AC', 'AD·AC', 'BA·BC'], ['AB·BC', 'AB·CD', 'BC·CD', 'AB·DA'], ['AC·BD', 'AC·AB', 'AC·BC', 'AC·CD', 'BD·BA']],
    triangle: [['AB·AC', 'BA·BC', 'CA·CB'], ['AB·BC', 'BC·CA', 'CA·AB'], ['AB·BC', 'AB·AC', 'BC·CA', 'CA·CB']],
    hexagon: [['OA·OB', 'OA·OC', 'OA·OD', 'OB·OF'], ['AB·BC', 'AB·CD', 'AB·DE', 'BC·DE'], ['AD·AB', 'AC·AE', 'AD·BE', 'AB·OC', 'AC·AD']]
}

const vectorOf = (points: Record<string, Point>, [from, to]: [string, string]): Point => [points[to][0] - points[from][0], points[to][1] - points[from][1]]
const dot = (u: Point, v: Point) => u[0] * v[0] + u[1] * v[1]
const squareOf = (u: Point) => dot(u, u)

/** k√m with the square factors taken out of m; s is a whole number */
function rootLatex(coefficient: number, radicand: number): string {
    let outside = coefficient
    let inside = radicand
    for (let factor = 2; factor * factor <= inside; factor += 1) {
        while (inside % (factor * factor) === 0) {
            inside /= factor * factor
            outside *= factor
        }
    }
    return inside === 1 ? String(outside) : `${outside === 1 ? '' : outside}\\sqrt{${inside}}`
}

const COSINES: Record<number, string> = { 0: '1', 30: '\\frac{\\sqrt{3}}{2}', 45: '\\frac{\\sqrt{2}}{2}', 60: '\\frac{1}{2}', 90: '0', 120: '\\left(-\\frac{1}{2}\\right)', 135: '\\left(-\\frac{\\sqrt{2}}{2}\\right)', 150: '\\left(-\\frac{\\sqrt{3}}{2}\\right)', 180: '(-1)' }

export function polygonRound(shape: Shape, side: number, pair: string): PolygonRound {
    const [a, b] = pair.split('·')
    const first: [string, string] = [a[0], a[1]]
    const second: [string, string] = [b[0], b[1]]
    const points = vertices(shape, side)
    const u = vectorOf(points, first)
    const v = vectorOf(points, second)
    // Every product here is a whole multiple of s²/4
    const quarters = Math.round((4 * dot(u, v)) / (side * side))
    const value = (quarters * side * side) / 4
    const answer = written(fraction(quarters * side * side, 4))!
    const lengths = [Math.round(squareOf(u) / (side * side)), Math.round(squareOf(v) / (side * side))]
    const angle = Math.round((Math.acos(Math.max(-1, Math.min(1, dot(u, v) / Math.sqrt(squareOf(u) * squareOf(v))))) * 180) / Math.PI)
    const product = rootLatex(side * side, lengths[0] * lengths[1])
    const wrong = [value === 0 ? `-${product}` : written(fraction(-quarters * side * side, 4))!, product, value === 0 ? written(fraction(side * side, 2))! : '0', written(fraction(quarters * side * side, 2))!]
    const options = [answer, ...wrong.filter((latex, index) => latex !== answer && wrong.indexOf(latex) === index)].slice(0, 4)
    const working = `${rootLatex(side, lengths[0])}\\cdot ${rootLatex(side, lengths[1])}\\cdot ${COSINES[angle]}=${answer}`
    return { shape, side, first, second, angle, answer, value, options, working }
}

/** Six rounds of one level, all different, with their options shuffled */
export function createPolygonRounds(random: Random, level: number): PolygonRound[] {
    const rounds: PolygonRound[] = []
    for (let attempt = 0; rounds.length < POLYGON_ROUNDS && attempt < 500; attempt += 1) {
        const shape = pick<Shape>(random, ['square', 'triangle', 'hexagon'])
        const pair = pick(random, PAIRS[shape][level] ?? PAIRS[shape][0])
        const side = randomInt(random, 2, 4)
        const round = polygonRound(shape, side, pair)
        if (round.options.length < 4 || rounds.some((other) => other.shape === shape && other.first.join('') === round.first.join('') && other.second.join('') === round.second.join(''))) continue
        rounds.push({ ...round, options: shuffle(random, round.options) })
    }
    return rounds
}

/** The vectors of every level, for the tests */
export const polygonPairs = PAIRS
