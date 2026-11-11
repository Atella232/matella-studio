import { pick, randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import { compareTo, freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'
import { say } from '../../batx2-zientziak-probabilitatea/lab/probability.ts'
import { above, below, tableLatex, zLatex } from '../normal.ts'

/* ==========================================================================
   L4 · Normalaren taula (La tabla de la normal): a z with two decimals is
   chosen as in the table, a row (units and tenths), a column (the
   hundredths) and a sign; the side says whether the area below z or
   above it is wanted. The table only holds z ≥ 0: for a negative z the
   tool reads the row of |z| and turns it round with the symmetry. Before
   the value, the learner says whether the shaded area is less than,
   equal to or more than 0,5. Every value comes from normal.ts. Pure.
   ========================================================================== */

export type LookupSide = 'below' | 'above'

export interface LookupState {
    negative: boolean
    /** Units and tenths of |z|, in tenths: 12 is the row 1,2 */
    row: number
    /** The hundredths of |z| */
    column: number
    side: LookupSide
    prediction: Prediction | null
}

export const LOOKUP_ROWS = { min: 0, max: 29 } as const
export const initialLookupState: LookupState = { negative: false, row: 10, column: 0, side: 'below', prediction: null }

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value)))

export function setLookup(state: LookupState, patch: Partial<Pick<LookupState, 'negative' | 'row' | 'column' | 'side'>>): LookupState {
    const negative = patch.negative ?? state.negative
    const row = clamp(patch.row ?? state.row, LOOKUP_ROWS.min, LOOKUP_ROWS.max)
    const column = clamp(patch.column ?? state.column, 0, 9)
    const side = patch.side ?? state.side
    const same = negative === state.negative && row === state.row && column === state.column && side === state.side
    return { negative, row, column, side, prediction: same ? state.prediction : null }
}

/** z in hundredths, with its sign: −1,25 → −125 */
export const zHundredthsOf = (state: Pick<LookupState, 'negative' | 'row' | 'column'>) => (state.negative ? -1 : 1) * (state.row * 10 + state.column)
export const zOfLookup = (state: Pick<LookupState, 'negative' | 'row' | 'column'>) => zHundredthsOf(state) / 100

/** The shaded probability, in ten-thousandths */
export const lookupValue = (state: Pick<LookupState, 'negative' | 'row' | 'column' | 'side'>) => (state.side === 'below' ? below(zOfLookup(state)) : above(zOfLookup(state)))

/** The shaded area compared with 0,5 */
export const lookupPrediction = (state: LookupState): Prediction => compareTo(lookupValue(state), 5000)

/** The state that shows a given z (in hundredths) on a given side */
export const lookupFor = (zHundredths: number, side: LookupSide): LookupState => {
    const size = Math.abs(zHundredths)
    return { negative: zHundredths < 0, row: Math.floor(size / 10), column: size % 10, side, prediction: null }
}

/* ---------- Challenges ---------- */

export const lookupChallenges: LabChallenge<LookupState>[] = [
    { id: 129131, prompt: say('Bilatu $P(Z\\le k)=0{,}9332$ betetzen duen $k$.', 'Busca el $k$ que cumple $P(Z\\le k)=0{,}9332$.', 'ابحث عن $k$ الذي يحقق $P(Z\\le k)=0{,}9332$.', 'Find the $k$ with $P(Z\\le k)=0{,}9332$.'), hint: say('Taularen barruan dago: begiratu zein errenkada eta zutabetan.', 'Está dentro de la tabla: mira en qué fila y columna.', 'إنه داخل الجدول: انظر في أي صف وعمود.', 'It is inside the table: see which row and column.'), isSolved: (state) => state.side === 'below' && zHundredthsOf(state) === 150 },
    { id: 129132, prompt: say('Bilatu $P(Z\\le k)=0{,}1587$ betetzen duen $k$ negatiboa.', 'Busca el $k$ negativo que cumple $P(Z\\le k)=0{,}1587$.', 'ابحث عن $k$ السالب الذي يحقق $P(Z\\le k)=0{,}1587$.', 'Find the negative $k$ with $P(Z\\le k)=0{,}1587$.'), hint: say('$1-0{,}1587=0{,}8413$: bilatu hori, eta jarri zeinu negatiboa.', '$1-0{,}1587=0{,}8413$: busca eso y pon el signo menos.', '$1-0{,}1587=0{,}8413$: ابحث عنه وضع إشارة السالب.', '$1-0{,}1587=0{,}8413$: look for that and put the minus sign.'), isSolved: (state) => state.side === 'below' && zHundredthsOf(state) === -100 },
    { id: 129133, prompt: say('Bilatu $P(Z>k)=0{,}0228$ betetzen duen $k$.', 'Busca el $k$ que cumple $P(Z>k)=0{,}0228$.', 'ابحث عن $k$ الذي يحقق $P(Z>k)=0{,}0228$.', 'Find the $k$ with $P(Z>k)=0{,}0228$.'), hint: say('Gainetik 0,0228 badago, azpitik 0,9772 dago.', 'Si por encima hay 0,0228, por debajo hay 0,9772.', 'إذا كان فوقها 0.0228 فتحتها 0.9772.', 'If 0.0228 lies above, 0.9772 lies below.'), isSolved: (state) => state.side === 'above' && zHundredthsOf(state) === 200 }
]

/** Endless practice: a probability below or above, and the k to find (the table grows strictly up to 2,5) */
const lookupMaker: LabChallengeMaker<LookupState> = (random) => {
    const zHundredths = randomInt(random, -250, 250)
    const side = pick(random, ['below', 'above'] as const)
    const solution = lookupFor(zHundredths, side)
    const value = lookupValue(solution)
    const relation = side === 'below' ? '\\le' : '>'
    const latex = `P(Z${relation} k)=${tableLatex(value)}`
    return {
        prompt: say(`Bilatu $${latex}$ betetzen duen $k$.`, `Busca el $k$ que cumple $${latex}$.`, `ابحث عن $k$ الذي يحقق $${latex}$.`, `Find the $k$ with $${latex}$.`),
        hint: side === 'below'
            ? say('0,5 baino gutxiago bada, $k$ negatiboa da: bilatu $1-p$.', 'Si es menos de 0,5, $k$ es negativo: busca $1-p$.', 'إذا كان أقل من 0.5 فإن $k$ سالب: ابحث عن $1-p$.', 'If it is less than 0.5, $k$ is negative: look for $1-p$.')
            : say('Gainetik dagoena: azpitik $1-p$ geratzen da.', 'Lo de encima: por debajo queda $1-p$.', 'ما فوق: يبقى تحت $1-p$.', 'What lies above: $1-p$ lies below.'),
        isSolved: (state) => state.side === side && lookupValue(state) === value,
        solution
    }
}

export const lookupExtra = freshFrom(initialLookupState, lookupMaker)

/** z for LaTeX (shared with the drawing) */
export const lookupZLatex = (state: Pick<LookupState, 'negative' | 'row' | 'column'>) => zLatex(zOfLookup(state))
