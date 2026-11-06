import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'

/* ==========================================================================
   J1 · Zenbakia ala bektorea? (¿Número o vector?): three vectors u, v, w
   with whole coordinates and an expression built from them. First the
   learner says whether it gives a number, a vector or makes no sense (a
   number plus a vector); then, if it has a value, picks it among four:
   the right one and the typical mistakes (the dot product written as a
   vector, the crossed product, the magnitude as a sum…). Level 1: u·v,
   2u − v, |u|, u·u and u + 3; level 2: (u·v)w, u·(v + w), |u|v, u·v + w
   and |u| + v; level 3: all of them and (u·v)(v·w).
   ========================================================================== */

export const KIND_ROUNDS = 6

export type ValueKind = 'number' | 'vector' | 'nonsense'
export const VALUE_KINDS: ValueKind[] = ['number', 'vector', 'nonsense']

export type Expression = 'dot' | 'combination' | 'norm' | 'self' | 'plus-number' | 'scaled' | 'dot-sum' | 'norm-times' | 'dot-plus-vector' | 'norm-plus-vector' | 'dot-dot'

export type Pair = [number, number]

export interface KindRound {
    expression: Expression
    u: Pair
    v: Pair
    w: Pair
    /** The expression in LaTeX */
    latex: string
    kind: ValueKind
    /** The four values to choose from (LaTeX), right one included; empty when it makes no sense */
    options: string[]
    /** The right value in LaTeX, or null when it makes no sense */
    answer: string | null
    /** The working, in LaTeX */
    working: string
}

const pairLatex = ([x, y]: Pair) => `(${x},${y})`
const wrap = (value: number) => (value < 0 ? `(${value})` : String(value))
const dotOf = ([a, b]: Pair, [c, d]: Pair) => a * c + b * d
/** √n as a whole number when it is a perfect square */
const rootLatex = (n: number) => (Number.isInteger(Math.sqrt(n)) ? String(Math.sqrt(n)) : `\\sqrt{${n}}`)

/** Vectors with a whole magnitude, for |u|·v */
const WHOLE: Pair[] = [[3, 4], [4, 3], [-3, 4], [4, -3], [0, 2], [2, 0], [0, -3], [-2, 0]]

const vector = (random: Random): Pair => {
    for (;;) {
        const p: Pair = [randomInt(random, -3, 3), randomInt(random, -3, 3)]
        if (p[0] !== 0 || p[1] !== 0) return p
    }
}

/** The right value and three different wrong ones, shuffled; null when two of them coincide */
function choices(random: Random, right: string, wrong: string[]): string[] | null {
    const all = [right, ...wrong]
    if (new Set(all).size < 4) return null
    return shuffle(random, all)
}

function make(random: Random, expression: Expression): KindRound | null {
    const u = expression === 'norm-times' ? pick(random, WHOLE) : vector(random)
    const v = vector(random)
    const w = vector(random)
    const base = { expression, u, v, w }
    const uv = dotOf(u, v)
    switch (expression) {
        case 'dot': {
            const right = String(uv)
            const options = choices(random, right, [pairLatex([u[0] * v[0], u[1] * v[1]]), String(u[0] * v[1] + u[1] * v[0]), String(u[0] * v[0] - u[1] * v[1])])
            return options && { ...base, latex: '\\vec{u}\\cdot\\vec{v}', kind: 'number', options, answer: right, working: `${u[0]}\\cdot ${wrap(v[0])}+${wrap(u[1])}\\cdot ${wrap(v[1])}=${uv}` }
        }
        case 'combination': {
            const value: Pair = [2 * u[0] - v[0], 2 * u[1] - v[1]]
            const right = pairLatex(value)
            const options = choices(random, right, [pairLatex([2 * u[0] - v[0], u[1] - v[1]]), pairLatex([2 * u[0] + v[0], 2 * u[1] + v[1]]), String(2 * uv)])
            return options && { ...base, latex: '2\\vec{u}-\\vec{v}', kind: 'vector', options, answer: right, working: `(${2 * u[0]},${2 * u[1]})-${pairLatex(v)}=${right}` }
        }
        case 'norm': {
            const square = u[0] * u[0] + u[1] * u[1]
            const right = rootLatex(square)
            const options = choices(random, right, [String(Math.abs(u[0]) + Math.abs(u[1])), String(square), pairLatex([Math.abs(u[0]), Math.abs(u[1])])])
            return options && { ...base, latex: '|\\vec{u}|', kind: 'number', options, answer: right, working: `\\sqrt{${u[0] * u[0]}+${u[1] * u[1]}}=${right}` }
        }
        case 'self': {
            const square = u[0] * u[0] + u[1] * u[1]
            const right = String(square)
            const options = choices(random, right, [pairLatex([u[0] * u[0], u[1] * u[1]]), rootLatex(square) === right ? String(2 * square) : rootLatex(square), String(u[0] + u[1])])
            return options && { ...base, latex: '\\vec{u}\\cdot\\vec{u}', kind: 'number', options, answer: right, working: `\\vec{u}\\cdot\\vec{u}=|\\vec{u}|^2=${square}` }
        }
        case 'scaled': {
            const value: Pair = [uv * w[0], uv * w[1]]
            const right = pairLatex(value)
            if (uv === 0 || uv === 1) return null
            const options = choices(random, right, [String(uv), pairLatex([u[0] * v[0] * w[0], u[1] * v[1] * w[1]]), String(uv * (w[0] + w[1]))])
            return options && { ...base, latex: '(\\vec{u}\\cdot\\vec{v})\\,\\vec{w}', kind: 'vector', options, answer: right, working: `\\vec{u}\\cdot\\vec{v}=${uv}\\ \\to\\ ${uv}\\cdot ${pairLatex(w)}=${right}` }
        }
        case 'dot-sum': {
            const sum: Pair = [v[0] + w[0], v[1] + w[1]]
            const value = dotOf(u, sum)
            const right = String(value)
            const options = choices(random, right, [pairLatex([u[0] * sum[0], u[1] * sum[1]]), String(uv), String(dotOf(u, w))])
            return options && { ...base, latex: '\\vec{u}\\cdot(\\vec{v}+\\vec{w})', kind: 'number', options, answer: right, working: `${pairLatex(u)}\\cdot ${pairLatex(sum)}=${value}` }
        }
        case 'norm-times': {
            const length = Math.sqrt(u[0] * u[0] + u[1] * u[1])
            const value: Pair = [length * v[0], length * v[1]]
            const right = pairLatex(value)
            if (length === 1) return null
            const options = choices(random, right, [String(length * (v[0] + v[1])), pairLatex([u[0] * v[0], u[1] * v[1]]), pairLatex([(Math.abs(u[0]) + Math.abs(u[1])) * v[0], (Math.abs(u[0]) + Math.abs(u[1])) * v[1]])])
            return options && { ...base, latex: '|\\vec{u}|\\,\\vec{v}', kind: 'vector', options, answer: right, working: `|\\vec{u}|=${length}\\ \\to\\ ${length}\\cdot ${pairLatex(v)}=${right}` }
        }
        case 'dot-dot': {
            const vw = dotOf(v, w)
            const value = uv * vw
            const right = String(value)
            if (uv === 0 || vw === 0) return null
            const options = choices(random, right, [pairLatex([uv * w[0], uv * w[1]]), String(uv + vw), pairLatex([uv, vw])])
            return options && { ...base, latex: '(\\vec{u}\\cdot\\vec{v})(\\vec{v}\\cdot\\vec{w})', kind: 'number', options, answer: right, working: `${uv}\\cdot ${wrap(vw)}=${value}` }
        }
        case 'plus-number': {
            const k = randomInt(random, 2, 5)
            return { ...base, latex: `\\vec{u}+${k}`, kind: 'nonsense', options: [], answer: null, working: `${pairLatex(u)}+${k}` }
        }
        case 'dot-plus-vector':
            return { ...base, latex: '\\vec{u}\\cdot\\vec{v}+\\vec{w}', kind: 'nonsense', options: [], answer: null, working: `${uv}+${pairLatex(w)}` }
        case 'norm-plus-vector':
            return { ...base, latex: '|\\vec{u}|+\\vec{v}', kind: 'nonsense', options: [], answer: null, working: `${rootLatex(u[0] * u[0] + u[1] * u[1])}+${pairLatex(v)}` }
    }
}

export const kindLevels: Expression[][] = [
    ['dot', 'combination', 'norm', 'self', 'plus-number'],
    ['scaled', 'dot-sum', 'norm-times', 'dot-plus-vector', 'norm-plus-vector'],
    ['dot', 'combination', 'norm', 'scaled', 'dot-sum', 'norm-times', 'dot-dot', 'dot-plus-vector', 'norm-plus-vector', 'self']
]

/** Six rounds of one level: every expression of the level before any repeats, no two alike */
export function createKindRounds(random: Random, level: number): KindRound[] {
    const pool = kindLevels[level] ?? kindLevels[0]
    const mixed = shuffle(random, pool)
    const order = shuffle(random, Array.from({ length: KIND_ROUNDS }, (_, index) => mixed[index % mixed.length]))
    const rounds: KindRound[] = []
    for (const expression of order) {
        for (let attempt = 0; attempt < 500; attempt += 1) {
            const round = make(random, expression)
            if (round && !rounds.some((other) => other.latex === round.latex && pairLatex(other.u) === pairLatex(round.u) && pairLatex(other.v) === pairLatex(round.v))) {
                rounds.push(round)
                break
            }
        }
    }
    return rounds
}

/** Right when the kind is right and, if it has a value, the value too */
export const isKindChoice = (round: KindRound, kind: ValueKind | null, value: string | null) => kind === round.kind && (round.kind === 'nonsense' || value === round.answer)
