import { randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import { say } from '../../batx1-zientziak-funtzioak/text.ts'
import { freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'

/* ==========================================================================
   L3 · Leundu tarifa (Suaviza la tarifa): a curve up to a point p and a
   line ax + b after it. Two steppers move a and b; the joint shows the
   jump (different values) and the corner (different slopes). Only one
   pair leaves neither. Before drawing, the learner predicts how many
   conditions that takes: one, two (right) or three.
   ========================================================================== */

export type SmoothSetup = 's1' | 's2' | 's3'

export const SMOOTH_SETUPS: SmoothSetup[] = ['s1', 's2', 's3']

export const SMOOTH_LIMITS = { a: { min: -6, max: 8 }, b: { min: -10, max: 12 } } as const

export interface SmoothState {
    setup: SmoothSetup
    a: number
    b: number
    prediction: Prediction | null
}

export const initialSmoothState: SmoothState = { setup: 's1', a: 1, b: 1, prediction: null }

interface Setup {
    /** The curve, its derivative and where it ends */
    f: (x: number) => number
    d: (x: number) => number
    p: number
    latex: string
    solution: [number, number]
    view: { xMin: number; xMax: number; yMin: number; yMax: number }
}

export const SMOOTH_SETUP: Record<SmoothSetup, Setup> = {
    s1: { f: (x) => x * x, d: (x) => 2 * x, p: 2, latex: 'x^2', solution: [4, -4], view: { xMin: -1, xMax: 5, yMin: -2, yMax: 16 } },
    s2: { f: (x) => x * x + 1, d: (x) => 2 * x, p: 1, latex: 'x^2+1', solution: [2, 0], view: { xMin: -2, xMax: 4, yMin: -2, yMax: 10 } },
    s3: { f: (x) => -x * x + 6 * x, d: (x) => -2 * x + 6, p: 3, latex: '-x^2+6x', solution: [0, 9], view: { xMin: 0, xMax: 6, yMin: -2, yMax: 12 } }
}

export function setSmooth(state: SmoothState, patch: Partial<Omit<SmoothState, 'prediction'>>): SmoothState {
    const setup = patch.setup ?? state.setup
    const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value)))
    return {
        setup,
        a: clamp(patch.a ?? state.a, SMOOTH_LIMITS.a.min, SMOOTH_LIMITS.a.max),
        b: clamp(patch.b ?? state.b, SMOOTH_LIMITS.b.min, SMOOTH_LIMITS.b.max),
        prediction: setup === state.setup ? state.prediction : null
    }
}

/** The function in LaTeX */
export function smoothLatex(state: Pick<SmoothState, 'setup'>): string {
    const { p, latex } = SMOOTH_SETUP[state.setup]
    return `f(x)=\\begin{cases}${latex} & x\\le ${p}\\\\ ax+b & x>${p}\\end{cases}`
}

/** [left value, right value, left slope, right slope] at the joint */
export function jointOf(state: Pick<SmoothState, 'setup' | 'a' | 'b'>): [number, number, number, number] {
    const { f, d, p } = SMOOTH_SETUP[state.setup]
    return [f(p), state.a * p + state.b, d(p), state.a]
}

export const noJump = (state: Pick<SmoothState, 'setup' | 'a' | 'b'>) => { const [l, r] = jointOf(state); return l === r }
export const noCorner = (state: Pick<SmoothState, 'setup' | 'a' | 'b'>) => { const [, , l, r] = jointOf(state); return l === r }
export const isSmooth = (state: Pick<SmoothState, 'setup' | 'a' | 'b'>) => noJump(state) && noCorner(state)

/** Two conditions: the same value and the same slope */
export const smoothPrediction = (): Prediction => '='

const same = (text: string) => say(text, text, text, text)

export const smoothChallenges: LabChallenge<SmoothState>[] = [
    {
        id: 146301,
        prompt: say('$f_1$ funtzioan, kendu jauzia eta punta.', 'En $f_1$, quita el salto y el pico.', 'في $f_1$ أزل القفزة والزاوية.', 'In $f_1$, remove the jump and the corner.'),
        hint: same('$4=2a+b\\qquad 4=a$'),
        isSolved: (state) => state.setup === 's1' && isSmooth(state)
    },
    {
        id: 146302,
        prompt: say('$f_2$ funtzioan, kendu jauzia eta punta.', 'En $f_2$, quita el salto y el pico.', 'في $f_2$ أزل القفزة والزاوية.', 'In $f_2$, remove the jump and the corner.'),
        hint: same('$2=a+b\\qquad 2=a$'),
        isSolved: (state) => state.setup === 's2' && isSmooth(state)
    },
    {
        id: 146303,
        prompt: say('$f_3$ funtzioan, kendu jauzia eta punta.', 'En $f_3$, quita el salto y el pico.', 'في $f_3$ أزل القفزة والزاوية.', 'In $f_3$, remove the jump and the corner.'),
        hint: say('$x=3$ puntuan kurba goian dago: malda 0.', 'En $x=3$ la curva está en lo más alto: pendiente 0.', 'عند $x=3$ يكون المنحنى في قمته: الميل 0.', 'At $x=3$ the curve is at its top: slope 0.'),
        isSolved: (state) => state.setup === 's3' && isSmooth(state)
    },
    {
        id: 146304,
        prompt: say('$f_1$ funtzioan, $a=2$ izanik, kendu jauzia: punta bat geratzen da.', 'En $f_1$, con $a=2$, quita el salto: queda un pico.', 'في $f_1$ مع $a=2$ أزل القفزة: تبقى زاوية.', 'In $f_1$, with $a=2$, remove the jump: a corner is left.'),
        hint: same('$4=2\\cdot 2+b$'),
        isSolved: (state) => state.setup === 's1' && state.a === 2 && noJump(state)
    },
    {
        id: 146305,
        prompt: say('$f_2$ funtzioan, $a=5$ izanik, kendu jauzia.', 'En $f_2$, con $a=5$, quita el salto.', 'في $f_2$ مع $a=5$ أزل القفزة.', 'In $f_2$, with $a=5$, remove the jump.'),
        hint: same('$2=5+b$'),
        isSolved: (state) => state.setup === 's2' && state.a === 5 && noJump(state)
    }
]

const NAMES: Record<SmoothSetup, string> = { s1: 'f_1', s2: 'f_2', s3: 'f_3' }

/** Endless practice: with a given a, close the jump */
const smoothMaker: LabChallengeMaker<SmoothState> = (random) => {
    for (;;) {
        const setup = SMOOTH_SETUPS[randomInt(random, 0, 2)]
        const a = randomInt(random, -3, 6)
        const { f, p } = SMOOTH_SETUP[setup]
        const b = f(p) - a * p
        if (b < SMOOTH_LIMITS.b.min || b > SMOOTH_LIMITS.b.max) continue
        const name = `$${NAMES[setup]}$`
        return {
            prompt: say(`${name} funtzioan, $a=${a}$ izanik, kendu jauzia.`, `En ${name}, con $a=${a}$, quita el salto.`, `في ${name} مع $a=${a}$ أزل القفزة.`, `In ${name}, with $a=${a}$, remove the jump.`),
            hint: say('Lotunean bi zatiek balio bera.', 'En la unión, los dos trozos valen lo mismo.', 'عند الالتقاء يتساوى الجزآن.', 'At the joint, both pieces give the same.'),
            isSolved: (state) => state.setup === setup && state.a === a && noJump(state),
            solution: { setup, a, b, prediction: null }
        }
    }
}

export const smoothExtra = freshFrom(initialSmoothState, smoothMaker)
