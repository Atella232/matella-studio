import { pick, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import { randomCurve } from '../../batx1-zientziak-deribatuak/games/curves.ts'
import { derivativeOf, graphLatex, type Graph, type Named } from '../../batx1-zientziak-deribatuak/games/match.ts'

/* ==========================================================================
   J1 · ¿De quién es la primitiva? (Batxilergoa 1 · Zientziak, Integralak):
   the graph of f above and three small graphs below; one of them is an
   antiderivative F of f (its slope at each point is the height of f).
   Level 1: f is a line and the options are parabolas (F, F upside down,
   F moved sideways); level 2: f is a parabola and the options are cubics
   (the same mistakes, or f itself); level 3: cos, sin, eˣ, e⁻ˣ and 1/x,
   with the antiderivatives that are mixed up (sin and −sin, −cos and cos,
   f itself). A wrong option is never F moved up or down: that would be
   another antiderivative. Formulas only come in after the answer. The
   graphs are those of Deribatuak (match.ts).
   ========================================================================== */

export const PRIMITIVE_ROUNDS = 6

export interface PrimitiveRound {
    f: Graph
    options: Graph[]
    answer: number
}

const key = (graph: Graph) => graphLatex(graph)

function round(random: Random, f: Graph, right: Graph, wrong: Graph[]): PrimitiveRound | null {
    const distinct = wrong.filter((graph, index) => key(graph) !== key(right) && wrong.findIndex((other) => key(other) === key(graph)) === index)
    if (distinct.length < 2) return null
    const options = shuffle(random, [right, ...shuffle(random, distinct).slice(0, 2)])
    return { f, options, answer: options.indexOf(right) }
}

function lineRound(random: Random): PrimitiveRound | null {
    const curve = randomCurve(random, 'parabola')
    const right: Graph = { kind: 'curve', curve }
    const f = derivativeOf(right)
    const flipped: Graph = { kind: 'curve', curve: { ...curve, a: -curve.a, k: -curve.k } }
    const moved: Graph = { kind: 'curve', curve: { ...curve, h: curve.h + pick(random, [-2, 2]) } }
    return round(random, f, right, [flipped, moved])
}

function parabolaRound(random: Random): PrimitiveRound | null {
    const curve = randomCurve(random, 'cubic')
    const right: Graph = { kind: 'curve', curve }
    const f = derivativeOf(right)
    const flipped: Graph = { kind: 'curve', curve: { ...curve, a: -curve.a, k: -curve.k } }
    const moved: Graph = { kind: 'curve', curve: { ...curve, h: curve.h + pick(random, [-1, 1]) } }
    return round(random, f, right, [flipped, moved, f])
}

const ELEMENTARY: Array<{ f: Named; F: Named; wrong: Named[] }> = [
    { f: 'cos', F: 'sin', wrong: ['negsin', 'cos'] },
    { f: 'sin', F: 'negcos', wrong: ['cos', 'negsin'] },
    { f: 'exp', F: 'exp', wrong: ['negexp', 'ln'] },
    { f: 'negexp', F: 'mnegexp', wrong: ['negexp', 'exp'] },
    { f: 'inv', F: 'ln', wrong: ['inv', 'exp'] }
]

function elementaryRound(random: Random): PrimitiveRound | null {
    const choice = pick(random, ELEMENTARY)
    return round(random, { kind: 'named', name: choice.f }, { kind: 'named', name: choice.F }, choice.wrong.map((name) => ({ kind: 'named', name })))
}

export function createPrimitiveRounds(random: Random, levelIndex: number): PrimitiveRound[] {
    const make = [lineRound, parabolaRound, elementaryRound][levelIndex] ?? lineRound
    const rounds: PrimitiveRound[] = []
    for (let attempt = 0; rounds.length < PRIMITIVE_ROUNDS && attempt < 4000; attempt += 1) {
        const next = make(random)
        if (!next) continue
        // Level 3 has five functions: each may come back once, the others must not repeat
        const repeats = rounds.filter((other) => key(other.f) === key(next.f)).length
        if (repeats >= (levelIndex === 2 ? 2 : 1)) continue
        rounds.push(next)
    }
    return rounds
}
