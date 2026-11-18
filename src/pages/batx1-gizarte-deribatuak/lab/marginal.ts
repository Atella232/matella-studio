import { pick, randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import { compareTo, freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'
import { same, say } from '../text.ts'

/* ==========================================================================
   L1 · Kostu marjinala (El coste marginal): a cost C(x) = a·x² + b·x + F
   and a production x. The learner predicts whether the next unit,
   C(x + 1) − C(x), costs less than, the same as or more than the marginal
   cost C′(x) = 2a·x + b. The gap is exactly a: more with a growing
   marginal cost (a > 0), the same with a straight cost, less with
   economies of scale (a < 0). ▶ shrinks the step from one unit to zero,
   so the secant turns into the tangent.
   ========================================================================== */

export const MARGINAL_CURVES = [-0.5, 0, 0.5, 1, 2] as const
export const MARGINAL_LIMITS = { b: { min: 0, max: 30 }, F: { min: 0, max: 200, step: 20 }, x: { min: 1, max: 15 } } as const

export interface MarginalState {
    /** Index in MARGINAL_CURVES */
    curve: number
    b: number
    F: number
    x: number
    prediction: Prediction | null
}

export const initialMarginalState: MarginalState = { curve: 3, b: 4, F: 100, x: 3, prediction: null }

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value)))

export function setMarginal(state: MarginalState, patch: Partial<Omit<MarginalState, 'prediction'>>): MarginalState {
    const curve = clamp(patch.curve ?? state.curve, 0, MARGINAL_CURVES.length - 1)
    const b = clamp(patch.b ?? state.b, MARGINAL_LIMITS.b.min, MARGINAL_LIMITS.b.max)
    const F = clamp((patch.F ?? state.F) / 20, 0, 10) * 20
    const x = clamp(patch.x ?? state.x, MARGINAL_LIMITS.x.min, MARGINAL_LIMITS.x.max)
    const unchanged = curve === state.curve && b === state.b && F === state.F && x === state.x
    return { curve, b, F, x, prediction: unchanged ? state.prediction : null }
}

export const curveOf = (state: Pick<MarginalState, 'curve'>) => MARGINAL_CURVES[state.curve]
export const costAt = (state: Pick<MarginalState, 'curve' | 'b' | 'F'>, x: number) => curveOf(state) * x * x + state.b * x + state.F
export const marginalAt = (state: Pick<MarginalState, 'curve' | 'b'>, x: number) => 2 * curveOf(state) * x + state.b
/** What the next unit really costs */
export const nextUnit = (state: Pick<MarginalState, 'curve' | 'b' | 'F' | 'x'>) => costAt(state, state.x + 1) - costAt(state, state.x)

/** The next unit (<, = or >) against the marginal cost; both are multiples of 0.5, so the comparison is exact */
export const marginalPrediction = (state: MarginalState): Prediction => compareTo(nextUnit(state), marginalAt(state, state.x))

const curveIndex = (a: number) => MARGINAL_CURVES.indexOf(a as (typeof MARGINAL_CURVES)[number])

export const marginalChallenges: LabChallenge<MarginalState>[] = [
    {
        id: 136101,
        prompt: say('Lortu hurrengo unitateak kostu marjinalaren berdina balio izatea.', 'Consigue que la unidad siguiente cueste exactamente lo mismo que el coste marginal.', 'اجعل الوحدة التالية تكلّف تمامًا مثل التكلفة الحدية.', 'Make the next unit cost exactly the same as the marginal cost.'),
        hint: say('Kostu zuzen batekin, malda beti berdina da.', 'Con un coste en línea recta, la pendiente es siempre la misma.', 'مع تكلفة خطية يبقى الميل نفسه دائمًا.', 'With a straight-line cost, the slope is always the same.'),
        isSolved: (state) => curveOf(state) === 0
    },
    {
        id: 136102,
        prompt: say('$a=1$ denean, lortu 30 euroko kostu marjinala $x=10$ puntuan.', 'Con $a=1$, consigue un coste marginal de 30 € en $x=10$.', 'مع $a=1$ اجعل التكلفة الحدية 30 € عند $x=10$.', 'With $a=1$, get a marginal cost of €30 at $x=10$.'),
        hint: same('$C\'(10)=2\\cdot 10+b=30$'),
        isSolved: (state) => curveOf(state) === 1 && state.x === 10 && state.b === 10
    },
    {
        id: 136103,
        prompt: say('Lortu hurrengo unitateak kostu marjinalak baino 2 € gehiago balio izatea.', 'Consigue que la unidad siguiente cueste 2 € más que el coste marginal.', 'اجعل الوحدة التالية تكلّف 2 € أكثر من التكلفة الحدية.', 'Make the next unit cost €2 more than the marginal cost.'),
        hint: same('$C(x+1)-C(x)-C\'(x)=a$'),
        isSolved: (state) => nextUnit(state) - marginalAt(state, state.x) === 2
    },
    {
        id: 136104,
        prompt: say('$a=0{,}5$ eta $b=5$ direnean, jarri $x$ kostu marjinala 15 izan dadin.', 'Con $a=0{,}5$ y $b=5$, pon la $x$ en la que el coste marginal vale 15.', 'مع $a=0{,}5$ و$b=5$ ضع $x$ الذي تكون عنده التكلفة الحدية 15.', 'With $a=0{,}5$ and $b=5$, put $x$ where the marginal cost is 15.'),
        hint: same('$C\'(x)=x+5=15$'),
        isSolved: (state) => curveOf(state) === 0.5 && state.b === 5 && state.x === 10
    },
    {
        id: 136105,
        prompt: say('Eskala-ekonomia: hurrengo unitatea marjinala baino merkeagoa, eta kostu marjinala 10 € $x=10$ puntuan.', 'Economía de escala: que la unidad siguiente cueste menos que el marginal y que el coste marginal en $x=10$ sea 10 €.', 'وفورات الحجم: اجعل الوحدة التالية أرخص من الحدية والتكلفة الحدية 10 € عند $x=10$.', 'Economies of scale: the next unit cheaper than the marginal one, and a marginal cost of €10 at $x=10$.'),
        hint: same('$a=-0{,}5\\qquad -10+b=10$'),
        isSolved: (state) => curveOf(state) < 0 && state.x === 10 && marginalAt(state, 10) === 10
    }
]

/** Endless practice: a marginal cost to reach at a given x */
const marginalMaker: LabChallengeMaker<MarginalState> = (random) => {
    for (;;) {
        const a = pick(random, [0.5, 1, 2])
        const x = randomInt(random, 1, 10)
        const b = randomInt(random, 0, 20)
        const m = 2 * a * x + b
        const shown = String(a).replace('.', '{,}')
        return {
            prompt: say(`$a=${shown}$ denean, lortu ${m} euroko kostu marjinala $x=${x}$ puntuan.`, `Con $a=${shown}$, consigue un coste marginal de ${m} € en $x=${x}$.`, `مع $a=${shown}$ اجعل التكلفة الحدية ${m} € عند $x=${x}$.`, `With $a=${shown}$, get a marginal cost of €${m} at $x=${x}$.`),
            hint: same(`$C'(${x})=2\\cdot ${shown}\\cdot ${x}+b=${m}$`),
            isSolved: (state) => curveOf(state) === a && state.x === x && state.b === b,
            solution: { ...initialMarginalState, curve: curveIndex(a), b, x }
        }
    }
}

export const marginalExtra = freshFrom(initialMarginalState, marginalMaker)
