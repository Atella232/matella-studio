import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import { add, cross, det3, dot, scale, sub, type Vec3 } from '../space/vec3.ts'

/* ==========================================================================
   J1 · Zenbakia ala bektorea? espazioan (¿Número o vector? en el espacio):
   three vectors u, v and w with whole coordinates and an expression built
   from the three products of the unit. First the learner says whether it
   gives a number, a vector or makes no sense (a number plus a vector, a
   cross product of a number); then, if it has a value, picks it among
   four: the right one and the typical mistakes (the dot product written
   as a vector, the minus of the j forgotten, v × u for u × v, the
   determinant with the sign changed…). Level 1: u·v, u×v, 2u − v, u·u
   and u + k; level 2: [u,v,w], (u·v)w, |u×v|, (u·v)×w and u×v + k;
   level 3: all of them and u×(v×w).
   ========================================================================== */

export const KIND_ROUNDS = 6

export type ValueKind = 'number' | 'vector' | 'nonsense'
export const VALUE_KINDS: ValueKind[] = ['number', 'vector', 'nonsense']

export type Expression = 'dot' | 'cross' | 'combination' | 'self' | 'plus-number' | 'mixed' | 'scaled' | 'area' | 'cross-number' | 'cross-plus-number' | 'double-cross'

export interface KindRound {
    expression: Expression
    u: Vec3
    v: Vec3
    w: Vec3
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

const vec = (a: Vec3) => `(${a.map((value) => value + 0).join(',')})`
const wrap = (value: number) => (value < 0 ? `(${value})` : String(value + 0))
const root = (n: number) => (Number.isInteger(Math.sqrt(n)) ? String(Math.sqrt(n)) : `\\sqrt{${n}}`)
/** u × v with the minus of the j forgotten */
const jForgotten = (u: Vec3, v: Vec3): Vec3 => {
    const [a, b, c] = cross(u, v)
    return [a, -b, c]
}
const termwise = (u: Vec3, v: Vec3): Vec3 => [u[0] * v[0], u[1] * v[1], u[2] * v[2]]

const vector = (random: Random): Vec3 => {
    for (;;) {
        const p: Vec3 = [randomInt(random, -3, 3), randomInt(random, -3, 3), randomInt(random, -3, 3)]
        if (p.filter((value) => value === 0).length <= 1) return p
    }
}

/** Pairs with a whole |u × v|, for the area */
const WHOLE_AREA: Array<[Vec3, Vec3]> = [[[1, 0, 2], [2, -2, 0]], [[2, 1, 0], [2, 2, 3]], [[3, 0, 1], [0, -2, 1]], [[1, 2, 2], [2, 1, -2]], [[2, 0, -1], [0, 3, 2]], [[1, 1, 0], [0, 1, 1]], [[0, 2, -1], [-1, 2, 0]], [[2, 2, 1], [1, 0, 0]]]

/** The right value and three different wrong ones, shuffled; null when two of them coincide */
function choices(random: Random, right: string, wrong: string[]): string[] | null {
    const all = [right, ...wrong]
    if (new Set(all).size < 4) return null
    return shuffle(random, all)
}

function make(random: Random, expression: Expression): KindRound | null {
    const [areaU, areaV] = pick(random, WHOLE_AREA)
    const u = expression === 'area' ? areaU : vector(random)
    const v = expression === 'area' ? areaV : vector(random)
    const w = vector(random)
    const base = { expression, u, v, w }
    const uv = dot(u, v) + 0
    const k = pick(random, [2, 3, 4, 5])
    switch (expression) {
        case 'dot': {
            const right = String(uv)
            const options = choices(random, right, [vec(termwise(u, v)), String(uv - u[2] * v[2]), vec(cross(u, v))])
            return options && { ...base, latex: '\\vec{u}\\cdot\\vec{v}', kind: 'number', options, answer: right, working: `${u.map((value, index) => `${wrap(value)}\\cdot ${wrap(v[index])}`).join('+')}=${uv}` }
        }
        case 'cross': {
            const value = cross(u, v)
            const right = vec(value)
            if (value[1] === 0) return null
            const options = choices(random, right, [vec(jForgotten(u, v)), vec(scale(-1, value)), String(uv)])
            return options && { ...base, latex: '\\vec{u}\\times\\vec{v}', kind: 'vector', options, answer: right, working: `\\begin{vmatrix}\\vec{i}&\\vec{j}&\\vec{k}\\\\${u.join('&')}\\\\${v.join('&')}\\end{vmatrix}=${right}` }
        }
        case 'combination': {
            const value = sub(scale(2, u), v)
            const right = vec(value)
            const options = choices(random, right, [vec([2 * u[0] - v[0], u[1] - v[1], u[2] - v[2]]), vec(add(scale(2, u), v)), String(2 * uv)])
            return options && { ...base, latex: '2\\vec{u}-\\vec{v}', kind: 'vector', options, answer: right, working: `${vec(scale(2, u))}-${vec(v)}=${right}` }
        }
        case 'self': {
            const square = dot(u, u)
            const right = String(square)
            const options = choices(random, right, [vec(termwise(u, u)), root(square) === right ? String(square + 1) : root(square), String((u[0] + u[1] + u[2]) ** 2)])
            return options && { ...base, latex: '\\vec{u}\\cdot\\vec{u}', kind: 'number', options, answer: right, working: `|\\vec{u}|^2=${u.map((value) => `${wrap(value)}^2`).join('+')}=${square}` }
        }
        case 'plus-number':
            return { ...base, latex: `\\vec{u}+${k}`, kind: 'nonsense', options: [], answer: null, working: `${vec(u)}+${k}` }
        case 'mixed': {
            const value = det3(u, v, w) + 0
            if (value === 0) return null
            const right = String(value)
            const options = choices(random, right, [String(-value), vec(cross(v, w)), String(dot(u, jForgotten(v, w)) + 0)])
            return options && { ...base, latex: '[\\vec{u},\\vec{v},\\vec{w}]', kind: 'number', options, answer: right, working: `\\begin{vmatrix}${[u, v, w].map((row) => row.join('&')).join('\\\\')}\\end{vmatrix}=${right}` }
        }
        case 'scaled': {
            if (uv === 0) return null
            const value = scale(uv, w)
            const right = vec(value)
            const options = choices(random, right, [vec(scale(uv, u)), vec([uv * w[0], w[1], w[2]]), String(uv + w[0] + w[1] + w[2])])
            return options && { ...base, latex: '(\\vec{u}\\cdot\\vec{v})\\,\\vec{w}', kind: 'vector', options, answer: right, working: `\\vec{u}\\cdot\\vec{v}=${uv}\\ \\to\\ ${uv}\\,${vec(w)}=${right}` }
        }
        case 'area': {
            const value = cross(u, v)
            const square = dot(value, value)
            const right = root(square)
            const options = choices(random, right, [String(square), vec(value), String(Math.abs(value[0]) + Math.abs(value[1]) + Math.abs(value[2]))])
            return options && { ...base, latex: '|\\vec{u}\\times\\vec{v}|', kind: 'number', options, answer: right, working: `|${vec(value)}|=\\sqrt{${square}}=${right}` }
        }
        case 'cross-number':
            return { ...base, latex: '(\\vec{u}\\cdot\\vec{v})\\times\\vec{w}', kind: 'nonsense', options: [], answer: null, working: `\\vec{u}\\cdot\\vec{v}=${uv}\\ \\to\\ ${uv}\\times${vec(w)}` }
        case 'cross-plus-number':
            return { ...base, latex: `\\vec{u}\\times\\vec{v}+${k}`, kind: 'nonsense', options: [], answer: null, working: `${vec(cross(u, v))}+${k}` }
        case 'double-cross': {
            const value = cross(u, cross(v, w))
            const wrongOrder = cross(cross(u, v), w)
            const right = vec(value)
            const options = choices(random, right, [vec(wrongOrder), vec(scale(-1, value)), String(det3(u, v, w) + 0)])
            return options && { ...base, latex: '\\vec{u}\\times(\\vec{v}\\times\\vec{w})', kind: 'vector', options, answer: right, working: `\\vec{v}\\times\\vec{w}=${vec(cross(v, w))}\\ \\to\\ \\vec{u}\\times${vec(cross(v, w))}=${right}` }
        }
    }
}

export const kindLevels: Expression[][] = [
    ['dot', 'cross', 'combination', 'self', 'plus-number'],
    ['mixed', 'scaled', 'area', 'cross-number', 'cross-plus-number'],
    ['dot', 'cross', 'mixed', 'scaled', 'area', 'double-cross', 'cross-number', 'plus-number', 'combination', 'self']
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
            if (round && !rounds.some((other) => other.latex === round.latex && vec(other.u) === vec(round.u) && vec(other.v) === vec(round.v))) {
                rounds.push(round)
                break
            }
        }
    }
    return rounds
}

/** Right when the kind is right and, if it has a value, the value too */
export const isKindChoice = (round: KindRound, kind: ValueKind | null, value: string | null) => kind === round.kind && (round.kind === 'nonsense' || value === round.answer)
