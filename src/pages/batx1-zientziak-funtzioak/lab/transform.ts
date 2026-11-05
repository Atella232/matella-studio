import { pick, randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import { compareTo, freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'
import { say } from '../text.ts'

/* ==========================================================================
   L1 · Transformazioen tailerra (El taller de transformaciones): a mother
   curve (√x, x², |x|, 2ˣ or 1/x) with a marked point P becomes
   y = A·f(Bx + c) + k. Before the new curve is drawn the learner predicts
   whether P moves to the left, stays on the same vertical or moves to the
   right (the sign inside fools: x + 3 goes left; f(2x) squeezes). ▶ then
   carries P to its new place. Pure logic, whole parameters only.
   ========================================================================== */

export type TransformBase = 'sqrt' | 'square' | 'abs' | 'exp' | 'inverse'

export const TRANSFORM_BASES: TransformBase[] = ['sqrt', 'square', 'abs', 'exp', 'inverse']
export const OUTER_FACTORS = [-2, -1, 1, 2] as const
export const INNER_FACTORS = [-2, -1, 1, 2] as const
export const TRANSFORM_LIMITS = { c: { min: -4, max: 4 }, k: { min: -4, max: 4 } } as const

export interface TransformParams {
    base: TransformBase
    /** Factor outside: stretches and reflects in the x-axis */
    A: number
    /** Factor of x inside: squeezes and reflects in the y-axis */
    B: number
    /** Number added inside: a horizontal translation */
    c: number
    /** Number added outside: a vertical translation */
    k: number
}

export interface TransformState extends TransformParams {
    prediction: Prediction | null
}

export const initialTransformState: TransformState = { base: 'sqrt', A: 1, B: 1, c: 0, k: 0, prediction: null }

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value)))
const oneOf = (value: number, list: readonly number[], fallback: number) => (list.includes(value) ? value : fallback)

export function setTransform(state: TransformState, patch: Partial<TransformParams>): TransformState {
    const next: TransformParams = {
        base: patch.base ?? state.base,
        A: oneOf(patch.A ?? state.A, OUTER_FACTORS, state.A),
        B: oneOf(patch.B ?? state.B, INNER_FACTORS, state.B),
        c: clamp(patch.c ?? state.c, TRANSFORM_LIMITS.c.min, TRANSFORM_LIMITS.c.max),
        k: clamp(patch.k ?? state.k, TRANSFORM_LIMITS.k.min, TRANSFORM_LIMITS.k.max)
    }
    const same = next.base === state.base && next.A === state.A && next.B === state.B && next.c === state.c && next.k === state.k
    return { ...next, prediction: same ? state.prediction : null }
}

/** The mother function, or null where it does not exist */
export function baseValue(base: TransformBase, x: number): number | null {
    if (base === 'sqrt') return x < 0 ? null : Math.sqrt(x)
    if (base === 'square') return x * x
    if (base === 'abs') return Math.abs(x)
    if (base === 'exp') return 2 ** x
    return x === 0 ? null : 1 / x
}

/** The marked point P of each mother curve */
export const BASE_POINT: Record<TransformBase, [number, number]> = { sqrt: [4, 2], square: [2, 4], abs: [-2, 2], exp: [1, 2], inverse: [1, 1] }

/** y = A·f(Bx + c) + k at x, or null */
export function transformValue(params: TransformParams, x: number): number | null {
    const inside = baseValue(params.base, params.B * x + params.c)
    return inside === null ? null : params.A * inside + params.k
}

/** Where P lands: B·x + c = p, so x = (p − c)/B; y = A·f(p) + k */
export function movedPoint(params: TransformParams): [number, number] {
    const [p, q] = BASE_POINT[params.base]
    return [(p - params.c) / params.B, params.A * q + params.k]
}

/** Is P' to the left of P, on the same vertical or to the right? */
export const transformPrediction = (params: TransformParams): Prediction => compareTo(movedPoint(params)[0], BASE_POINT[params.base][0])

/** Two settings that draw the same curve (|−x + 1| is |x − 1|) */
export function sameCurve(a: TransformParams, b: TransformParams): boolean {
    for (let x = -8; x <= 8; x += 0.25) {
        const left = transformValue(a, x)
        const right = transformValue(b, x)
        if ((left === null) !== (right === null)) return false
        if (left !== null && right !== null && Math.abs(left - right) > 1e-9) return false
    }
    return true
}

const signed = (value: number) => (value > 0 ? `+${value}` : value < 0 ? `-${-value}` : '')

/** Bx + c in LaTeX: x+3, -x, 2x-1 */
export function innerLatex(B: number, c: number): string {
    const bx = B === 1 ? 'x' : B === -1 ? '-x' : `${B}x`
    return `${bx}${signed(c)}`
}

/** The right-hand side A·f(Bx + c) + k in LaTeX */
export function transformRight(params: TransformParams): string {
    const inner = innerLatex(params.B, params.c)
    const factor = params.A === 1 ? '' : params.A === -1 ? '-' : String(params.A)
    let body: string
    if (params.base === 'inverse') {
        const top = Math.abs(params.A)
        body = `${params.A < 0 ? '-' : ''}\\frac{${top}}{${inner}}`
    } else {
        const f = params.base === 'sqrt' ? `\\sqrt{${inner}}`
            : params.base === 'square' ? (inner === 'x' ? 'x^2' : `(${inner})^2`)
                : params.base === 'abs' ? `|${inner}|`
                    : `2^{${inner}}`
        body = `${factor}${f}`
    }
    return `${body}${signed(params.k)}`
}

export const transformLatex = (params: TransformParams) => `y=${transformRight(params)}`

const identity = (base: TransformBase): TransformParams => ({ base, A: 1, B: 1, c: 0, k: 0 })
export const baseLatex = (base: TransformBase) => transformLatex(identity(base))

const target = (params: TransformParams) => (state: TransformState) => sameCurve(state, params)

export const transformChallenges: LabChallenge<TransformState>[] = [
    {
        id: 108101,
        prompt: say('Eraman $y=x^2$ parabolaren erpina $(3,-2)$ puntura.', 'Lleva el vértice de $y=x^2$ a $(3,-2)$.', 'انقل رأس $y=x^2$ إلى $(3,-2)$.', 'Move the vertex of $y=x^2$ to $(3,-2)$.'),
        hint: say('Erpina barrukoa 0 den lekuan dago: $x-3=0$.', 'El vértice está donde lo de dentro vale 0: $x-3=0$.', 'الرأس حيث يساوي ما بالداخل 0: $x-3=0$.', 'The vertex is where the inside is 0: $x-3=0$.'),
        isSolved: (state) => state.base === 'square' && Math.abs(-state.c / state.B - 3) < 1e-9 && state.k === -2
    },
    {
        id: 108102,
        prompt: say('Eraiki $y=-\\sqrt{x}$.', 'Construye $y=-\\sqrt{x}$.', 'ابنِ $y=-\\sqrt{x}$.', 'Build $y=-\\sqrt{x}$.'),
        hint: say('Kanpoko zeinua: X ardatzean islatzen da.', 'El signo de fuera: se refleja en el eje X.', 'الإشارة الخارجية: انعكاس في محور X.', 'The sign outside: it is reflected in the x-axis.'),
        isSolved: target({ base: 'sqrt', A: -1, B: 1, c: 0, k: 0 })
    },
    {
        id: 108103,
        prompt: say('Eraiki $y=\\sqrt{-x}+2$.', 'Construye $y=\\sqrt{-x}+2$.', 'ابنِ $y=\\sqrt{-x}+2$.', 'Build $y=\\sqrt{-x}+2$.'),
        hint: say('Barruko zeinua: Y ardatzean islatzen da.', 'El signo de dentro: se refleja en el eje Y.', 'الإشارة الداخلية: انعكاس في محور Y.', 'The sign inside: it is reflected in the y-axis.'),
        isSolved: target({ base: 'sqrt', A: 1, B: -1, c: 0, k: 2 })
    },
    {
        id: 108104,
        prompt: say('Eraiki $y=2|x-1|-3$.', 'Construye $y=2|x-1|-3$.', 'ابنِ $y=2|x-1|-3$.', 'Build $y=2|x-1|-3$.'),
        hint: say('Erpina $(1,-3)$ puntuan, eta adarrak bi aldiz maldatsuago.', 'Vértice en $(1,-3)$ y ramas el doble de empinadas.', 'الرأس عند $(1,-3)$ والفرعان أشد انحدارًا بالضعف.', 'Vertex at $(1,-3)$ and branches twice as steep.'),
        isSolved: target({ base: 'abs', A: 2, B: 1, c: -1, k: -3 })
    },
    {
        id: 108105,
        prompt: say('$y=2^x$ funtzioarekin, eraman $P(1,2)$ puntua $(-1,5)$ puntura.', 'Con $y=2^x$, lleva el punto $P(1,2)$ a $(-1,5)$.', 'مع $y=2^x$ انقل النقطة $P(1,2)$ إلى $(-1,5)$.', 'With $y=2^x$, take the point $P(1,2)$ to $(-1,5)$.'),
        hint: say('Barrukoak 1 izan behar du $x=-1$ denean; kanpokoak 2 bihurtzen du 5.', 'Lo de dentro tiene que valer 1 en $x=-1$; lo de fuera convierte el 2 en 5.', 'يجب أن يساوي ما بالداخل 1 عند $x=-1$، وما بالخارج يحوّل 2 إلى 5.', 'The inside must be 1 at $x=-1$; the outside turns 2 into 5.'),
        isSolved: (state) => {
            if (state.base !== 'exp') return false
            const [x, y] = movedPoint(state)
            return Math.abs(x + 1) < 1e-9 && Math.abs(y - 5) < 1e-9
        }
    }
]

/** Endless practice: build a transformed curve from its formula */
const transformMaker: LabChallengeMaker<TransformState> = (random) => {
    for (;;) {
        const params: TransformParams = {
            base: pick(random, TRANSFORM_BASES),
            A: pick(random, [...OUTER_FACTORS]),
            B: pick(random, [-1, 1, 1, 2]),
            c: randomInt(random, -3, 3),
            k: randomInt(random, -3, 3)
        }
        if (params.A === 1 && params.B === 1 && params.c === 0 && params.k === 0) continue
        const latex = transformLatex(params)
        return {
            prompt: say(`Eraiki $${latex}$.`, `Construye $${latex}$.`, `ابنِ $${latex}$.`, `Build $${latex}$.`),
            hint: say('Lehenik barrukoa ($x$ aldagaian), eta gero kanpokoa.', 'Primero lo de dentro (en la $x$) y después lo de fuera.', 'أولًا ما بالداخل (في $x$) ثم ما بالخارج.', 'First the inside (on $x$) and then the outside.'),
            isSolved: target(params),
            solution: { ...params, prediction: null }
        }
    }
}

export const transformExtra = freshFrom(initialTransformState, transformMaker)
