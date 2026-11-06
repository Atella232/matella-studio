import { pick, randomInt, type Random } from '../../../features/unit-v2/games/random.ts'
import { curveValue, randomCurve, type Curve } from '../../batx1-zientziak-deribatuak/games/curves.ts'

/* ==========================================================================
   J4 · ¿∪ o ∩? (Batxilergoa 1 · Zientziak, Deribatuaren aplikazioak): is
   the curve cóncava (∪), convexa (∩) or at a point of inflection, at
   x = a? Level 1 reads it from a graph with a marked point (parabolas and
   cubics); level 2 from f″ (a line, a product of two factors or a square
   (x − r)², where f″ = 0 without an inflection); level 3 from f itself (a
   cubic, a quartic, or x⁴ + c, the trap). Plain data.
   ========================================================================== */

export const SHAPE_ROUNDS = 6

export type Shape = 'up' | 'down' | 'inflection'

export const SHAPES: Shape[] = ['up', 'down', 'inflection']

interface ShapeBase {
    a: number
    answer: Shape
}

export interface GraphShapeRound extends ShapeBase {
    kind: 'graph'
    curve: Curve
}

export interface FormulaShapeRound extends ShapeBase {
    kind: 'second' | 'function'
    /** The formula shown: f″(x) = … or f(x) = … */
    latex: string
    /** f″ at the point, for the explanation */
    second: number
    /** f″ as a function, for the tests */
    secondOf: (x: number) => number
    /** f″ written out, for the explanation of level 3 */
    secondLatex: string
}

export type ShapeRound = GraphShapeRound | FormulaShapeRound

/** f″ of a curve of curves.ts: parabola 2a, cubic 6a(x − h) */
export const curveSecond = ({ kind, a, h }: Curve, x: number) => (kind === 'parabola' ? 2 * a : 6 * a * (x - h))

/** The shape at x from f″: ∪ where f″ > 0, ∩ where f″ < 0, an inflection only where f″ changes sign */
export function shapeAt(second: (x: number) => number, x: number): Shape {
    const left = second(x - 1e-3)
    const right = second(x + 1e-3)
    if (left * right < 0) return 'inflection'
    const here = Math.abs(second(x)) > 1e-12 ? second(x) : left
    return here > 0 ? 'up' : 'down'
}

const signed = (value: number) => (value === 0 ? '' : value > 0 ? `+${value}` : `-${-value}`)
const term = (coefficient: number, letter: string, first = false) => {
    if (coefficient === 0) return ''
    const sign = coefficient < 0 ? '-' : first ? '' : '+'
    const size = Math.abs(coefficient) === 1 ? '' : String(Math.abs(coefficient))
    return `${sign}${size}${letter}`
}
const factor = (r: number) => (r === 0 ? 'x' : `(x${signed(-r)})`)

function graphRound(random: Random): GraphShapeRound | null {
    const curve = randomCurve(random)
    const wantInflection = curve.kind === 'cubic' && random() < 0.35
    const a = wantInflection ? curve.h : pick(random, [-3, -2.5, -2, -1.5, -1, -0.5, 0.5, 1, 1.5, 2, 2.5, 3].filter((x) => Math.abs(x - curve.h) >= 1))
    if (Math.abs(curveValue(curve, a)) > 3.5) return null
    return { kind: 'graph', curve, a, answer: shapeAt((x) => curveSecond(curve, x), a) }
}

function secondRound(random: Random): FormulaShapeRound | null {
    const type = pick(random, ['line', 'product', 'square'] as const)
    const a = randomInt(random, -3, 3)
    if (type === 'line') {
        const k = pick(random, [-6, -4, -2, 2, 4, 6])
        const r = randomInt(random, -3, 3)
        const secondOf = (x: number) => k * (x - r)
        return { kind: 'second', a, latex: `f''(x)=${term(k, 'x', true)}${signed(-k * r)}`, second: secondOf(a), secondOf, secondLatex: '', answer: shapeAt(secondOf, a) }
    }
    if (type === 'product') {
        const p = randomInt(random, -3, 1)
        const q = p + randomInt(random, 2, 3)
        const secondOf = (x: number) => (x - p) * (x - q)
        return { kind: 'second', a, latex: `f''(x)=${factor(p)}${factor(q)}`, second: secondOf(a), secondOf, secondLatex: '', answer: shapeAt(secondOf, a) }
    }
    // (x − r)²: at r, f″ = 0 but there is no inflection
    const r = randomInt(random, -2, 2)
    const at = random() < 0.6 ? r : a
    const secondOf = (x: number) => (x - r) ** 2
    return { kind: 'second', a: at, latex: `f''(x)=${r === 0 ? 'x^2' : `${factor(r)}^2`}`, second: secondOf(at), secondOf, secondLatex: '', answer: shapeAt(secondOf, at) }
}

function functionRound(random: Random): FormulaShapeRound | null {
    const type = pick(random, ['cubic', 'quartic', 'trap'] as const)
    if (type === 'cubic') {
        // f = x³ + bx² + cx: f″ = 6x + 2b, an inflection at −b/3
        const b = pick(random, [-6, -3, 3, 6])
        const c = randomInt(random, -4, 4)
        const a = random() < 0.4 ? -b / 3 : randomInt(random, -3, 3)
        const secondOf = (x: number) => 6 * x + 2 * b
        return { kind: 'function', a, latex: `f(x)=x^3${term(b, 'x^2')}${term(c, 'x')}`, second: secondOf(a), secondOf, secondLatex: `f''(x)=6x${signed(2 * b)}`, answer: shapeAt(secondOf, a) }
    }
    if (type === 'quartic') {
        // f = x⁴ − 6p²x²: f″ = 12x² − 12p², inflections at ±p
        const p = pick(random, [1, 2])
        const a = pick(random, [-p, p, 0, 3, -3])
        const secondOf = (x: number) => 12 * x * x - 12 * p * p
        return { kind: 'function', a, latex: `f(x)=x^4-${6 * p * p}x^2`, second: secondOf(a), secondOf, secondLatex: `f''(x)=12x^2-${12 * p * p}`, answer: shapeAt(secondOf, a) }
    }
    // x⁴ + c at 0: f″(0) = 0, but it is ∪ on both sides
    const c = randomInt(random, -3, 3)
    const secondOf = (x: number) => 12 * x * x
    return { kind: 'function', a: 0, latex: `f(x)=x^4${signed(c)}`, second: 0, secondOf, secondLatex: 'f\'\'(x)=12x^2', answer: shapeAt(secondOf, 0) }
}

const makers = [graphRound, secondRound, functionRound]

const keyOf = (item: ShapeRound) => (item.kind === 'graph' ? JSON.stringify([item.curve, item.a]) : `${item.latex}@${item.a}`)

export function createShapeRounds(random: Random, levelIndex: number): ShapeRound[] {
    const make = makers[levelIndex] ?? graphRound
    const rounds: ShapeRound[] = []
    for (let attempt = 0; rounds.length < SHAPE_ROUNDS && attempt < 4000; attempt += 1) {
        const next = make(random)
        if (!next || rounds.some((other) => keyOf(other) === keyOf(next))) continue
        // Not three rounds with the same answer in a row
        if (rounds.length >= 2 && rounds.slice(-2).every((other) => other.answer === next.answer)) continue
        rounds.push(next)
    }
    return rounds
}
