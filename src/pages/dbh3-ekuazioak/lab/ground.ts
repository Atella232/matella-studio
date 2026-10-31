import { randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { freshFrom, type Prediction } from './prediction.ts'

/* ==========================================================================
   L2 · Parabola lurrean (La parábola y el suelo): the solutions of
   x² + bx + c = 0 are the points where y = x² + bx + c touches the ground
   (the x axis). The learner moves b and c, predicts how many solutions
   there will be (none, one, two) and then sees the discriminant and the
   points; ▶ lowers the parabola onto its place from high above, so that
   the ground goes from untouched to touched once to crossed twice.
   ========================================================================== */

export const GROUND_LIMITS = { b: { min: -8, max: 8 }, c: { min: -12, max: 12 } } as const

export interface GroundState {
    b: number
    c: number
    prediction: Prediction | null
}

export const initialGroundState: GroundState = { b: -2, c: -3, prediction: null }

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value)))

export function setGround(state: GroundState, patch: Partial<Omit<GroundState, 'prediction'>>): GroundState {
    const b = clamp(patch.b ?? state.b, GROUND_LIMITS.b.min, GROUND_LIMITS.b.max)
    const c = clamp(patch.c ?? state.c, GROUND_LIMITS.c.min, GROUND_LIMITS.c.max)
    return { b, c, prediction: b === state.b && c === state.c ? state.prediction : null }
}

export const groundDiscriminant = ({ b, c }: Pick<GroundState, 'b' | 'c'>) => b * b - 4 * c
/** The solutions, smallest first */
export function groundRoots(state: Pick<GroundState, 'b' | 'c'>): number[] {
    const delta = groundDiscriminant(state)
    if (delta < 0) return []
    if (delta === 0) return [-state.b / 2]
    const root = Math.sqrt(delta)
    return [(-state.b - root) / 2, (-state.b + root) / 2]
}
/** No solution (<), one (=) or two (>) */
export const groundPrediction = (state: GroundState): Prediction => {
    const delta = groundDiscriminant(state)
    return delta < 0 ? '<' : delta === 0 ? '=' : '>'
}

/** The equation in LaTeX */
export function groundLatex({ b, c }: Pick<GroundState, 'b' | 'c'>): string {
    const bx = b === 0 ? '' : `${b < 0 ? '-' : '+'}${Math.abs(b) === 1 ? '' : Math.abs(b)}x`
    const cc = c === 0 ? '' : `${c < 0 ? '-' : '+'}${Math.abs(c)}`
    return `x^{2}${bx}${cc}=0`
}

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const hasRoots = (wanted: number[]) => (state: GroundState) => {
    const roots = groundRoots(state)
    return roots.length === wanted.length && roots.every((root, index) => Math.abs(root - wanted[index]) < 1e-9)
}

export const groundChallenges: LabChallenge<GroundState>[] = [
    { id: 93201, prompt: say('$b=6$ dela, lortu ebazpen bakarra.', 'Con $b=6$, consigue una sola solución.', 'مع $b=6$ احصل على حلّ واحد.', 'With $b=6$, get a single solution.'), hint: say('$\\Delta=36-4c=0$.', '$\\Delta=36-4c=0$.', '$\\Delta=36-4c=0$.', '$\\Delta=36-4c=0$.'), isSolved: (state) => state.b === 6 && groundDiscriminant(state) === 0 },
    { id: 93202, prompt: say('Lortu $x=2$ eta $x=5$ ebazpenak.', 'Consigue las soluciones $x=2$ y $x=5$.', 'احصل على الحلّين $x=2$ و$x=5$.', 'Get the solutions $x=2$ and $x=5$.'), hint: say('$(x-2)(x-5)=x^{2}-7x+10$.', '$(x-2)(x-5)=x^{2}-7x+10$.', '$(x-2)(x-5)=x^{2}-7x+10$.', '$(x-2)(x-5)=x^{2}-7x+10$.'), isSolved: hasRoots([2, 5]) },
    { id: 93203, prompt: say('Lortu $x=0$ ebazpena eta beste bat, $x=4$.', 'Consigue la solución $x=0$ y otra, $x=4$.', 'احصل على الحل $x=0$ وحلّ آخر $x=4$.', 'Get the solution $x=0$ and another one, $x=4$.'), hint: say('$x=0$ ebazpena bada, $c=0$.', 'Si $x=0$ es solución, $c=0$.', 'إذا كان $x=0$ حلًّا فإن $c=0$.', 'If $x=0$ is a solution, $c=0$.'), isSolved: hasRoots([0, 4]) },
    { id: 93204, prompt: say('$b=4$ dela, kendu ebazpen guztiak $c$ txikiena erabiliz.', 'Con $b=4$, quita todas las soluciones con el menor $c$ posible.', 'مع $b=4$ أزل كل الحلول بأصغر $c$ ممكن.', 'With $b=4$, remove every solution with the smallest possible $c$.'), hint: say('$16-4c<0$.', '$16-4c<0$.', '$16-4c<0$.', '$16-4c<0$.'), isSolved: (state) => state.b === 4 && state.c === 5 },
    { id: 93205, prompt: say('Lortu $x=-3$ eta $x=3$ ebazpenak.', 'Consigue las soluciones $x=-3$ y $x=3$.', 'احصل على الحلّين $x=-3$ و$x=3$.', 'Get the solutions $x=-3$ and $x=3$.'), hint: say('Ekuazio osatugabea: $b=0$.', 'Ecuación incompleta: $b=0$.', 'معادلة ناقصة: $b=0$.', 'An incomplete equation: $b=0$.'), isSolved: hasRoots([-3, 3]) }
]

/** Endless practice: two whole solutions to reach */
const groundMaker: LabChallengeMaker<GroundState> = (random) => {
    for (;;) {
        const p = randomInt(random, -5, 5)
        const q = randomInt(random, -5, 5)
        const b = -(p + q)
        const c = p * q
        if (p >= q || b < GROUND_LIMITS.b.min || b > GROUND_LIMITS.b.max || c < GROUND_LIMITS.c.min || c > GROUND_LIMITS.c.max) continue
        return {
            prompt: say(`Lortu $x=${p}$ eta $x=${q}$ ebazpenak.`, `Consigue las soluciones $x=${p}$ y $x=${q}$.`, `احصل على الحلّين $x=${p}$ و$x=${q}$.`, `Get the solutions $x=${p}$ and $x=${q}$.`),
            hint: say(`$b=${b}$ eta $c=${c}$.`, `$b=${b}$ y $c=${c}$.`, `$b=${b}$ و$c=${c}$.`, `$b=${b}$ and $c=${c}$.`),
            isSolved: hasRoots([p, q]),
            solution: { b, c, prediction: null }
        }
    }
}

export const groundExtra = freshFrom(initialGroundState, groundMaker)
