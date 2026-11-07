import { pick, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import { curveValue, randomCurve, type Curve } from './curves.ts'

/* ==========================================================================
   J2 · Empareja f y f′ (Batxilergoa 1 · Zientziak, Deribatuak): the graph
   of f above and three small graphs below; one of them is f′. Level 1: f
   is a parabola and the options are lines (f′, f′ upside down, and a line
   that is 0 at the wrong place); level 2: f is a cubic and the options are
   parabolas (the same mistakes, or f itself); level 3: sin, cos, eˣ, e⁻ˣ
   and ln x, with the derivatives that are mixed up (cos and −cos, eˣ and
   e⁻ˣ, f itself). Formulas only come in after the answer.
   ========================================================================== */

export const MATCH_ROUNDS = 6

export type Named = 'sin' | 'cos' | 'negsin' | 'negcos' | 'exp' | 'negexp' | 'mnegexp' | 'ln' | 'inv'

export type Graph =
    | { kind: 'line'; m: number; n: number }
    | { kind: 'curve'; curve: Curve }
    | { kind: 'named'; name: Named }

export interface MatchRound {
    f: Graph
    options: Graph[]
    answer: number
}

const NAMED: Record<Named, { fn: (x: number) => number; latex: string }> = {
    sin: { fn: Math.sin, latex: '\\sin x' },
    cos: { fn: Math.cos, latex: '\\cos x' },
    negsin: { fn: (x) => -Math.sin(x), latex: '-\\sin x' },
    negcos: { fn: (x) => -Math.cos(x), latex: '-\\cos x' },
    exp: { fn: Math.exp, latex: 'e^x' },
    negexp: { fn: (x) => Math.exp(-x), latex: 'e^{-x}' },
    mnegexp: { fn: (x) => -Math.exp(-x), latex: '-e^{-x}' },
    ln: { fn: (x) => (x > 0 ? Math.log(x) : Number.NaN), latex: '\\ln x' },
    inv: { fn: (x) => (x > 0 ? 1 / x : Number.NaN), latex: '\\frac{1}{x}' }
}

export function graphValue(graph: Graph, x: number): number {
    if (graph.kind === 'line') return graph.m * x + graph.n
    if (graph.kind === 'curve') return curveValue(graph.curve, x)
    return NAMED[graph.name].fn(x)
}

/** A number for LaTeX: whole or a half */
function numberLatex(value: number): string {
    if (Number.isInteger(value)) return String(value)
    const twice = Math.round(value * 2)
    return `${twice < 0 ? '-' : ''}\\frac{${Math.abs(twice)}}{2}`
}
/** The coefficient in front of a letter: 1 and −1 are not written */
const coefficientLatex = (value: number) => (value === 1 ? '' : value === -1 ? '-' : numberLatex(value))
const plusLatex = (value: number) => (value === 0 ? '' : value > 0 ? `+${numberLatex(value)}` : numberLatex(value))

export function graphLatex(graph: Graph): string {
    if (graph.kind === 'named') return NAMED[graph.name].latex
    if (graph.kind === 'line') {
        if (graph.m === 0) return numberLatex(graph.n)
        return `${coefficientLatex(graph.m)}x${plusLatex(graph.n)}`
    }
    const { kind, a, h, k } = graph.curve
    const shifted = h === 0 ? 'x' : `(x${h > 0 ? '-' : '+'}${Math.abs(h)})`
    if (kind === 'parabola') return `${coefficientLatex(a)}${shifted}^2${plusLatex(k)}`
    const inner = h === 0 ? 'x^3-3x' : `${shifted}^3-3${shifted}`
    return `${coefficientLatex(a)}\\left(${inner}\\right)${plusLatex(k)}`
}

/** The derivative of a graph, as a graph */
export function derivativeOf(graph: Graph): Graph {
    if (graph.kind === 'line') return { kind: 'line', m: 0, n: graph.m }
    if (graph.kind === 'curve') {
        const { kind, a, h } = graph.curve
        // a(x − h)² + k → 2a(x − h); a((x − h)³ − 3(x − h)) + k → 3a(x − h)² − 3a
        return kind === 'parabola' ? { kind: 'line', m: 2 * a, n: -2 * a * h } : { kind: 'curve', curve: { kind: 'parabola', a: 3 * a, h, k: -3 * a } }
    }
    const next: Record<Named, Named | null> = { sin: 'cos', cos: 'negsin', negsin: 'negcos', negcos: 'sin', exp: 'exp', negexp: 'mnegexp', mnegexp: 'negexp', ln: 'inv', inv: null }
    return { kind: 'named', name: next[graph.name]! }
}

const key = (graph: Graph) => graphLatex(graph)

function round(random: Random, f: Graph, right: Graph, wrong: Graph[]): MatchRound | null {
    const distinct = wrong.filter((graph, index) => key(graph) !== key(right) && wrong.findIndex((other) => key(other) === key(graph)) === index)
    if (distinct.length < 2) return null
    const options = shuffle(random, [right, ...shuffle(random, distinct).slice(0, 2)])
    return { f, options, answer: options.indexOf(right) }
}

function parabolaRound(random: Random): MatchRound | null {
    const curve = randomCurve(random, 'parabola')
    const f: Graph = { kind: 'curve', curve }
    const right = derivativeOf(f) as Extract<Graph, { kind: 'line' }>
    const shift = pick(random, [-2, 2])
    const flipped: Graph = { kind: 'line', m: -right.m, n: -right.n }
    const moved: Graph = { kind: 'line', m: right.m, n: -right.m * (curve.h + shift) }
    return round(random, f, right, [flipped, moved, f])
}

function cubicRound(random: Random): MatchRound | null {
    const curve = randomCurve(random, 'cubic')
    const f: Graph = { kind: 'curve', curve }
    const right = derivativeOf(f)
    const { a, h } = curve
    const flipped: Graph = { kind: 'curve', curve: { kind: 'parabola', a: -3 * a, h, k: 3 * a } }
    const wide: Graph = { kind: 'curve', curve: { kind: 'parabola', a: 3 * a, h, k: -12 * a } }
    return round(random, f, right, [flipped, wide, f])
}

const ELEMENTARY: Array<{ f: Named; wrong: Named[] }> = [
    { f: 'sin', wrong: ['negcos', 'negsin', 'sin'] },
    { f: 'cos', wrong: ['sin', 'cos', 'negcos'] },
    { f: 'exp', wrong: ['negexp', 'ln', 'mnegexp'] },
    { f: 'negexp', wrong: ['negexp', 'exp', 'inv'] },
    { f: 'ln', wrong: ['exp', 'ln', 'negexp'] }
]

function elementaryRound(random: Random): MatchRound | null {
    const choice = pick(random, ELEMENTARY)
    const f: Graph = { kind: 'named', name: choice.f }
    return round(random, f, derivativeOf(f), choice.wrong.map((name) => ({ kind: 'named', name })))
}

export function createMatchRounds(random: Random, levelIndex: number): MatchRound[] {
    const make = [parabolaRound, cubicRound, elementaryRound][levelIndex] ?? parabolaRound
    const rounds: MatchRound[] = []
    for (let attempt = 0; rounds.length < MATCH_ROUNDS && attempt < 4000; attempt += 1) {
        const next = make(random)
        if (!next) continue
        // In the last level the five functions come back, but not twice in a row
        const last = rounds[rounds.length - 1]
        if (last && key(last.f) === key(next.f)) continue
        if (levelIndex < 2 && rounds.some((other) => key(other.f) === key(next.f))) continue
        rounds.push(next)
    }
    return rounds
}
