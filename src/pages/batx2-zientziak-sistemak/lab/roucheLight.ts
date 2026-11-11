import { pick, randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'
import { classify, type SystemKind } from '../system.ts'

/* ==========================================================================
   L1 · Rouchéren semaforoa (El semáforo de Rouché): the augmented matrix
   A* of three systems of three equations. The learner changes the
   constant terms b₁, b₂, b₃ and the corner k of A, and predicts the type
   of the system (inconsistent, dependent, independent) before the ranks
   of A and A* are shown with a traffic light: red, amber, green.
   ========================================================================== */

export interface RoucheState {
    preset: number
    b: number[]
    k: number
    prediction: Prediction | null
}

export interface RouchePreset {
    /** A, with k in its corner */
    rows: (k: number) => number[][]
    b: number[]
    k: number
}

export const ROUCHE_PRESETS: RouchePreset[] = [
    { rows: (k) => [[1, 1, 1], [1, -1, 1], [2, 0, k]], b: [3, 1, 5], k: 2 },
    { rows: (k) => [[1, 2, 0], [0, 1, 1], [1, 0, k]], b: [1, 2, 3], k: 1 },
    { rows: (k) => [[1, 1, 1], [2, 2, 2], [1, -1, k]], b: [1, 3, 0], k: 1 }
]
export const ROUCHE_NAMES = ['A', 'B', 'C'] as const
export const B_LIMITS = { min: -6, max: 9 } as const
export const K_LIMITS = { min: -4, max: 4 } as const

export const loadRouche = (preset: number): RoucheState => ({ preset, b: [...ROUCHE_PRESETS[preset].b], k: ROUCHE_PRESETS[preset].k, prediction: null })
export const initialRoucheState = loadRouche(0)

export const roucheRows = (state: Pick<RoucheState, 'preset' | 'k'>) => ROUCHE_PRESETS[state.preset].rows(state.k)
export const roucheClassification = (state: Pick<RoucheState, 'preset' | 'k' | 'b'>) => classify(roucheRows(state), state.b)
export const roucheKind = (state: Pick<RoucheState, 'preset' | 'k' | 'b'>) => roucheClassification(state).kind

/** How many solutions: none, one, infinitely many (below, equal, above) */
export const KIND_PREDICTION: Record<SystemKind, Prediction> = { inconsistent: '<', determined: '=', indeterminate: '>' }
export const rouchePrediction = (state: RoucheState): Prediction => KIND_PREDICTION[roucheKind(state)]

const clamp = (value: number, limits: { min: number; max: number }) => Math.min(limits.max, Math.max(limits.min, Math.round(value)))

export function setB(state: RoucheState, index: number, value: number): RoucheState {
    const next = clamp(value, B_LIMITS)
    if (next === state.b[index]) return state
    return { ...state, b: state.b.map((item, i) => (i === index ? next : item)), prediction: null }
}
export function setCorner(state: RoucheState, k: number): RoucheState {
    const next = clamp(k, K_LIMITS)
    return next === state.k ? state : { ...state, k: next, prediction: null }
}
export const chooseRouche = (state: RoucheState, preset: number): RoucheState => (preset === state.preset ? state : loadRouche(preset))

/* ---------- Challenges ---------- */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })

export const KIND_GOALS: Record<SystemKind, LocalizedText> = {
    inconsistent: say('bateraezina', 'incompatible', 'غير متوافق', 'inconsistent'),
    indeterminate: say('bateragarri indeterminatua', 'compatible indeterminado', 'متوافقًا غير محدد', 'consistent and dependent'),
    determined: say('bateragarri determinatua', 'compatible determinado', 'متوافقًا محددًا', 'consistent and independent')
}

const goal = (name: string, kind: SystemKind) => say(`${name} sisteman, lortu sistema ${KIND_GOALS[kind].eu} izatea.`, `En ${name}, haz que sea ${KIND_GOALS[kind].es}.`, `في ${name} اجعل النظام ${KIND_GOALS[kind].ar}.`, `In ${name}, make it ${KIND_GOALS[kind].en}.`)

export const roucheChallenges: LabChallenge<RoucheState>[] = [
    { id: 118101, prompt: goal('A', 'indeterminate'), hint: say('$k=2$ denean, $E_3=E_1+E_2$ koefizienteetan: gai askeak ere bai?', 'Con $k=2$, $E_3=E_1+E_2$ en los coeficientes: ¿y en los términos independientes?', 'مع $k=2$، $E_3=E_1+E_2$ في المعاملات: وفي الحدود الثابتة؟', 'With $k=2$, $E_3=E_1+E_2$ in the coefficients: and in the constant terms?'), isSolved: (state) => state.preset === 0 && roucheKind(state) === 'indeterminate' },
    { id: 118102, prompt: goal('A', 'determined'), hint: say('Aldatu $k$: $|A|\\neq 0$ izan behar du.', 'Cambia $k$: tiene que ser $|A|\\neq 0$.', 'غيّر $k$: يجب أن يكون $|A|\\neq 0$.', 'Change $k$: it has to be $|A|\\neq 0$.'), isSolved: (state) => state.preset === 0 && roucheKind(state) === 'determined' },
    { id: 118103, prompt: goal('B', 'inconsistent'), hint: say('$|A|=k+2$: lehenik, $k=-2$.', '$|A|=k+2$: primero, $k=-2$.', '$|A|=k+2$: أولًا $k=-2$.', '$|A|=k+2$: first, $k=-2$.'), isSolved: (state) => state.preset === 1 && roucheKind(state) === 'inconsistent' },
    { id: 118104, prompt: goal('B', 'indeterminate'), hint: say('$k=-2$ denean, $E_3=E_1-2E_2$ koefizienteetan.', 'Con $k=-2$, $E_3=E_1-2E_2$ en los coeficientes.', 'مع $k=-2$، $E_3=E_1-2E_2$ في المعاملات.', 'With $k=-2$, $E_3=E_1-2E_2$ in the coefficients.'), isSolved: (state) => state.preset === 1 && roucheKind(state) === 'indeterminate' },
    { id: 118105, prompt: goal('C', 'indeterminate'), hint: say('$E_2=2E_1$ koefizienteetan: $b_2$ ere $b_1$ zenbakiaren bikoitza izan behar da.', '$E_2=2E_1$ en los coeficientes: $b_2$ también tiene que ser el doble de $b_1$.', '$E_2=2E_1$ في المعاملات: يجب أن يكون $b_2$ أيضًا ضعف $b_1$.', '$E_2=2E_1$ in the coefficients: $b_2$ has to be twice $b_1$ as well.'), isSolved: (state) => state.preset === 2 && roucheKind(state) === 'indeterminate' }
]

/** Every state of a preset that changes only b₃ and k (a small search): the solutions of the endless challenges come from it */
function reachable(preset: number, kind: SystemKind): RoucheState | null {
    const start = loadRouche(preset)
    for (let k = K_LIMITS.min; k <= K_LIMITS.max; k++) {
        for (let b2 = B_LIMITS.min; b2 <= B_LIMITS.max; b2++) {
            for (let b3 = B_LIMITS.min; b3 <= B_LIMITS.max; b3++) {
                const state = { ...start, k, b: [start.b[0], b2, b3] }
                if (roucheKind(state) === kind) return state
            }
        }
    }
    return null
}

/** Endless practice: a preset and a type it can reach */
const roucheMaker: LabChallengeMaker<RoucheState> = (random) => {
    for (;;) {
        const preset = randomInt(random, 0, ROUCHE_PRESETS.length - 1)
        const kind = pick(random, ['inconsistent', 'indeterminate', 'determined'] as SystemKind[])
        const solution = reachable(preset, kind)
        if (!solution) continue
        return {
            prompt: goal(ROUCHE_NAMES[preset], kind),
            hint: say('Konparatu $\\operatorname{rg}(A)$, $\\operatorname{rg}(A^*)$ eta 3.', 'Compara $\\operatorname{rg}(A)$, $\\operatorname{rg}(A^*)$ y 3.', 'قارن $\\operatorname{rg}(A)$ و$\\operatorname{rg}(A^*)$ و3.', 'Compare $\\operatorname{rg}(A)$, $\\operatorname{rg}(A^*)$ and 3.'),
            isSolved: (state) => state.preset === preset && roucheKind(state) === kind,
            solution
        }
    }
}

export const roucheExtra = freshFrom(initialRoucheState, roucheMaker)
