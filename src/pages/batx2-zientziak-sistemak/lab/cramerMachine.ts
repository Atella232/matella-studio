import { randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import { compareTo, freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { cramer, detValue, replaceColumn } from '../system.ts'

/* ==========================================================================
   L2 · Cramerren makina (La máquina de Cramer): a Cramer system (|A| ≠ 0)
   of two or three equations. The learner picks an unknown and changes the
   constant terms; ▶ slides the column B into the column of that unknown.
   Before the value is shown, the learner predicts its sign; then |A_j|,
   |A| and the quotient appear. The challenges ask for a value, a zero or
   a whole solution, so B has to be chosen with the rule in mind.
   ========================================================================== */

export interface CramerState {
    preset: number
    b: number[]
    unknown: number
    prediction: Prediction | null
}

export const CRAMER_PRESETS: Array<{ rows: number[][]; b: number[] }> = [
    { rows: [[1, 1, 1], [2, -1, 1], [1, 2, -1]], b: [6, 3, 2] },
    { rows: [[2, 1], [1, -1]], b: [7, 2] },
    { rows: [[1, 2, 1], [2, 1, 0], [0, 1, 1]], b: [4, 3, 1] }
]
export const CRAMER_NAMES = ['A', 'B', 'C'] as const
export const CRAMER_LIMITS = { min: -9, max: 9 } as const
export const UNKNOWN_NAMES = ['x', 'y', 'z'] as const

export const loadCramer = (preset: number): CramerState => ({ preset, b: [...CRAMER_PRESETS[preset].b], unknown: 0, prediction: null })
export const initialCramerState = loadCramer(0)

export const cramerRows = (state: Pick<CramerState, 'preset'>) => CRAMER_PRESETS[state.preset].rows
export const cramerSolution = (state: Pick<CramerState, 'preset' | 'b'>) => cramer(cramerRows(state), state.b)!
export const cramerValue = (state: Pick<CramerState, 'preset' | 'b' | 'unknown'>) => {
    const value = cramerSolution(state)[state.unknown]
    return value.numerator / value.denominator
}
export const columnDet = (state: Pick<CramerState, 'preset' | 'b' | 'unknown'>) => detValue(replaceColumn(cramerRows(state), state.b, state.unknown))
export const baseDet = (state: Pick<CramerState, 'preset'>) => detValue(cramerRows(state))
export const cramerPrediction = (state: CramerState): Prediction => compareTo(cramerValue(state), 0)

export const chooseCramer = (state: CramerState, preset: number): CramerState => (preset === state.preset ? state : loadCramer(preset))
export function chooseUnknown(state: CramerState, unknown: number): CramerState {
    const next = Math.min(cramerRows(state).length - 1, Math.max(0, unknown))
    return next === state.unknown ? state : { ...state, unknown: next, prediction: null }
}
export function setCramerB(state: CramerState, index: number, value: number): CramerState {
    const next = Math.min(CRAMER_LIMITS.max, Math.max(CRAMER_LIMITS.min, Math.round(value)))
    if (next === state.b[index]) return state
    return { ...state, b: state.b.map((item, i) => (i === index ? next : item)), prediction: null }
}

const values = (state: Pick<CramerState, 'preset' | 'b'>) => cramerSolution(state).map((item) => item.numerator / item.denominator)

/* ---------- Challenges ---------- */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })

export const cramerChallenges: LabChallenge<CramerState>[] = [
    { id: 118201, prompt: say('A sisteman, lortu $x=0$.', 'En A, consigue $x=0$.', 'في A احصل على $x=0$.', 'In A, get $x=0$.'), hint: say('$x=0$ da $|A_x|=0$ denean.', '$x=0$ cuando $|A_x|=0$.', '$x=0$ عندما $|A_x|=0$.', '$x=0$ when $|A_x|=0$.'), isSolved: (state) => state.preset === 0 && values(state)[0] === 0 },
    { id: 118202, prompt: say('B sisteman, lortu $y$ negatiboa.', 'En B, consigue $y$ negativo.', 'في B احصل على $y$ سالب.', 'In B, get a negative $y$.'), hint: say('$|A|=-3$: $|A_y|$ positiboa behar da.', '$|A|=-3$: hace falta $|A_y|$ positivo.', '$|A|=-3$: يلزم $|A_y|$ موجب.', '$|A|=-3$: you need a positive $|A_y|$.'), isSolved: (state) => state.preset === 1 && values(state)[1] < 0 },
    { id: 118203, prompt: say('C sisteman, lortu $y=2$.', 'En C, consigue $y=2$.', 'في C احصل على $y=2$.', 'In C, get $y=2$.'), hint: say('$|A|=-1$: $|A_y|=-2$ behar da.', '$|A|=-1$: hace falta $|A_y|=-2$.', '$|A|=-1$: يلزم $|A_y|=-2$.', '$|A|=-1$: you need $|A_y|=-2$.'), isSolved: (state) => state.preset === 2 && values(state)[1] === 2 },
    { id: 118204, prompt: say('A sisteman, lortu $(1,1,1)$ soluzioa.', 'En A, consigue la solución $(1,1,1)$.', 'في A احصل على الحل $(1,1,1)$.', 'In A, get the solution $(1,1,1)$.'), hint: say('Ordeztu $x=y=z=1$ ekuazio bakoitzean: horiek dira $b$ zenbakiak.', 'Sustituye $x=y=z=1$ en cada ecuación: esos son los $b$.', 'عوّض $x=y=z=1$ في كل معادلة: تلك هي قيم $b$.', 'Put $x=y=z=1$ into each equation: those are the $b$.'), isSolved: (state) => state.preset === 0 && values(state).every((item) => item === 1) },
    { id: 118205, prompt: say('B sisteman, lortu $x=y$, biak 0 izan gabe.', 'En B, consigue $x=y$ sin que valgan 0.', 'في B احصل على $x=y$ دون أن يساويا 0.', 'In B, get $x=y$ without them being 0.'), hint: say('$x=y=t$ bada: $b_1=3t$ eta $b_2=0$.', 'Si $x=y=t$: $b_1=3t$ y $b_2=0$.', 'إذا كان $x=y=t$: $b_1=3t$ و$b_2=0$.', 'If $x=y=t$: $b_1=3t$ and $b_2=0$.'), isSolved: (state) => state.preset === 1 && values(state)[0] === values(state)[1] && values(state)[0] !== 0 }
]

/** Endless practice: a whole solution to reach, or one unknown to give a value */
const cramerMaker: LabChallengeMaker<CramerState> = (random) => {
    for (;;) {
        const preset = randomInt(random, 0, CRAMER_PRESETS.length - 1)
        const rows = CRAMER_PRESETS[preset].rows
        const target = rows.map(() => randomInt(random, -3, 3))
        const b = rows.map((row) => row.reduce((sum, item, j) => sum + item * target[j], 0))
        if (b.some((item) => item < CRAMER_LIMITS.min || item > CRAMER_LIMITS.max)) continue
        const unknown = randomInt(random, 0, rows.length - 1)
        const name = CRAMER_NAMES[preset]
        const solution: CramerState = { preset, b, unknown, prediction: null }
        if (randomInt(random, 0, 1) === 0) {
            const point = `(${target.join(',')})`
            return {
                prompt: say(`${name} sisteman, lortu $${point}$ soluzioa.`, `En ${name}, consigue la solución $${point}$.`, `في ${name} احصل على الحل $${point}$.`, `In ${name}, get the solution $${point}$.`),
                hint: say('Ordeztu soluzioa ekuazio bakoitzean: horiek dira $b$ zenbakiak.', 'Sustituye la solución en cada ecuación: esos son los $b$.', 'عوّض الحل في كل معادلة: تلك هي قيم $b$.', 'Put the solution into each equation: those are the $b$.'),
                isSolved: (state) => state.preset === preset && values(state).every((item, j) => item === target[j]),
                solution
            }
        }
        const letter = UNKNOWN_NAMES[unknown]
        return {
            prompt: say(`${name} sisteman, lortu $${letter}=${target[unknown]}$.`, `En ${name}, consigue $${letter}=${target[unknown]}$.`, `في ${name} احصل على $${letter}=${target[unknown]}$.`, `In ${name}, get $${letter}=${target[unknown]}$.`),
            hint: say(`$|A_${letter}|$ zenbakiak $${target[unknown]}\\cdot|A|$ izan behar du.`, `$|A_${letter}|$ tiene que valer $${target[unknown]}\\cdot|A|$.`, `يجب أن يساوي $|A_${letter}|$ القيمة $${target[unknown]}\\cdot|A|$.`, `$|A_${letter}|$ has to be $${target[unknown]}\\cdot|A|$.`),
            isSolved: (state) => state.preset === preset && values(state)[unknown] === target[unknown],
            solution
        }
    }
}

export const cramerExtra = freshFrom(initialCramerState, cramerMaker)
