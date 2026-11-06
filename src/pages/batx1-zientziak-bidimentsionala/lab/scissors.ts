import { pick } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'
import type { Pair } from '../bivariate.ts'

/* ==========================================================================
   L2 · Guraizeak (Las tijeras): a cloud of ten points with x̄ = 5,
   ȳ = 10, σx = 2, σy = 4 and the r the learner chooses, in tenths. Both
   regression lines go through (5, 10): y on x with slope 2r, and x on y
   with coefficient r/2, so their product is always r². Before seeing the
   new lines, the learner predicts whether they will be more closed, the
   same or more open than with the last r seen. ▶ runs r from −1 to 1.
   The cloud is u·cos θ + v·sin θ with u and v orthogonal, so r = cos θ
   exactly. Pure logic.
   ========================================================================== */

export interface ScissorsState {
    /** r, in tenths: −10 … 10 */
    r10: number
    /** The r (in tenths) of the last lines seen, to compare with */
    reference10: number
    prediction: Prediction | null
}

export const SCISSORS = { mx: 5, my: 10, sx: 2, sy: 4 } as const

/** Start: r = 0,5, compared with the r = 0,9 of a tight cloud */
export const initialScissorsState: ScissorsState = { r10: 5, reference10: 9, prediction: null }

const clamp = (value: number) => Math.min(10, Math.max(-10, Math.round(value)))

/** A new r: once the last lines have been seen, they become the reference */
export function setScissorsR(state: ScissorsState, r10: number): ScissorsState {
    const next = clamp(r10)
    if (next === state.r10) return state
    return { r10: next, reference10: state.prediction !== null ? state.r10 : state.reference10, prediction: null }
}

/** Closed means a smaller angle: |r| bigger closes the scissors (<), smaller opens them (>) */
export function scissorsPrediction(state: ScissorsState): Prediction {
    const now = Math.abs(state.r10)
    const before = Math.abs(state.reference10)
    return now === before ? '=' : now > before ? '<' : '>'
}

/* ---------- The cloud ---------- */

/** Ten deviations with mean 0, and ten more with mean 0 at right angles to them, both of length √10 */
const U = [-1.5, -1.2, -0.9, -0.5, -0.2, 0.2, 0.5, 0.9, 1.2, 1.5]
const W = [0.4, -1.1, 1.3, -0.2, -1.4, 1.2, 0.3, -0.9, 1.0, -0.6]
const dot = (a: number[], b: number[]) => a.reduce((total, value, index) => total + value * b[index], 0)
const meanOf = (values: number[]) => values.reduce((total, value) => total + value, 0) / values.length
const unit = (values: number[]) => {
    const centred = values.map((value) => value - meanOf(values))
    const length = Math.sqrt(dot(centred, centred) / centred.length)
    return centred.map((value) => value / length)
}
const UNIT_U = unit(U)
const UNIT_V = (() => {
    const w = unit(W)
    const along = dot(w, UNIT_U) / dot(UNIT_U, UNIT_U)
    return unit(w.map((value, index) => value - along * UNIT_U[index]))
})()

/** The ten points for a given r: x̄ = 5, ȳ = 10, σx = 2, σy = 4 */
export function scissorsCloud(r: number): Pair[] {
    const s = Math.sqrt(Math.max(0, 1 - r * r))
    return UNIT_U.map((u, index) => [SCISSORS.mx + SCISSORS.sx * u, SCISSORS.my + SCISSORS.sy * (r * u + s * UNIT_V[index])] as Pair)
}

/** The slope of y on x and the coefficient of x on y: their product is r² */
export const scissorsSlopes = (r: number) => ({ myx: (r * SCISSORS.sy) / SCISSORS.sx, mxy: (r * SCISSORS.sx) / SCISSORS.sy })

/* ---------- Challenges ---------- */

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
/** r in tenths for LaTeX: 7 → 0{,}7, −10 → -1 */
export const tenthsLatex = (tenths: number) => (Math.abs(tenths) === 10 ? `${tenths < 0 ? '-' : ''}1` : tenths === 0 ? '0' : `${tenths < 0 ? '-' : ''}0{,}${Math.abs(tenths)}`)
/** r² in hundredths for LaTeX: 49 → 0{,}49 */
const hundredthsLatex = (hundredths: number) => (hundredths === 100 ? '1' : `0{,}${String(hundredths).padStart(2, '0')}`.replace(/0$/, '').replace(/\{,\}$/, ''))

export const scissorsChallenges: LabChallenge<ScissorsState>[] = [
    { id: 115201, prompt: say('Egin bi erregresio-zuzenak bat etortzea.', 'Haz que las dos rectas de regresión coincidan.', 'اجعل مستقيمي الانحدار يتطابقان.', 'Make the two regression lines the same.'), hint: say('Guraizeak guztiz ixten dira puntuak zuzen baten gainean daudenean: $|r|=1$.', 'Las tijeras se cierran del todo cuando los puntos están sobre una recta: $|r|=1$.', 'ينغلق المقصّ تمامًا عندما تكون النقاط على مستقيم: $|r|=1$.', 'The scissors close completely when the points lie on a straight line: $|r|=1$.'), isSolved: (state) => Math.abs(state.r10) === 10 },
    { id: 115202, prompt: say('Egin bi zuzenak perpendikularrak izatea.', 'Haz que las dos rectas sean perpendiculares.', 'اجعل المستقيمين متعامدين.', 'Make the two lines perpendicular.'), hint: say('Mendekotasun linealik ez dagoenean, $y=\\bar{y}$ eta $x=\\bar{x}$ geratzen dira.', 'Cuando no hay dependencia lineal quedan $y=\\bar{y}$ y $x=\\bar{x}$.', 'عندما لا يوجد ارتباط خطي يبقى $y=\\bar{y}$ و$x=\\bar{x}$.', 'When there is no linear dependence you are left with $y=\\bar{y}$ and $x=\\bar{x}$.'), isSolved: (state) => state.r10 === 0 },
    { id: 115203, prompt: say('Egin $m_{yx}\\cdot m_{xy}=0{,}64$ izatea, hodeia beherantz doala.', 'Haz que $m_{yx}\\cdot m_{xy}=0{,}64$ con la nube bajando.', 'اجعل $m_{yx}\\cdot m_{xy}=0{,}64$ والسحابة هابطة.', 'Make $m_{yx}\\cdot m_{xy}=0{,}64$ with the cloud falling.'), hint: say('Biderkadura $r^2$ da, eta hodeia beherantz badoa, r negatiboa da.', 'El producto es $r^2$, y si la nube baja, r es negativo.', 'الجداء هو $r^2$، وإذا هبطت السحابة كان r سالبًا.', 'The product is $r^2$, and if the cloud falls, r is negative.'), isSolved: (state) => state.r10 === -8 }
]

/** Endless practice: a product of the coefficients with a direction, or the same angle with the other sign */
const scissorsMaker: LabChallengeMaker<ScissorsState> = (random) => {
    const size = pick(random, [2, 3, 4, 6, 7, 9])
    const sign = pick(random, [1, -1])
    const kind = pick(random, ['product', 'product', 'mirror'] as const)
    const target = sign * size
    const solution: ScissorsState = { r10: target, reference10: initialScissorsState.reference10, prediction: null }
    if (kind === 'mirror') {
        const other = tenthsLatex(-target)
        return {
            prompt: say(`Egin zuzenak $r=${other}$ denean bezain irekiak izatea, baina hodeia ${sign > 0 ? 'gorantz' : 'beherantz'} doala.`, `Haz que las rectas estén tan abiertas como con $r=${other}$, pero con la nube ${sign > 0 ? 'subiendo' : 'bajando'}.`, `اجعل المستقيمين منفتحين كما مع $r=${other}$، لكن والسحابة ${sign > 0 ? 'صاعدة' : 'هابطة'}.`, `Make the lines as open as with $r=${other}$, but with the cloud ${sign > 0 ? 'rising' : 'falling'}.`),
            hint: say('Angelua $|r|$ balioaren araberakoa da; zeinuak noranzkoa bakarrik aldatzen du.', 'El ángulo depende de $|r|$; el signo solo cambia hacia dónde van.', 'تتعلق الزاوية بـ $|r|$؛ أما الإشارة فتغيّر الاتجاه فقط.', 'The angle depends on $|r|$; the sign only changes which way they go.'),
            isSolved: (state) => state.r10 === target,
            solution
        }
    }
    const product = hundredthsLatex(size * size)
    return {
        prompt: say(`Egin $m_{yx}\\cdot m_{xy}=${product}$ izatea, hodeia ${sign > 0 ? 'gorantz' : 'beherantz'} doala.`, `Haz que $m_{yx}\\cdot m_{xy}=${product}$ con la nube ${sign > 0 ? 'subiendo' : 'bajando'}.`, `اجعل $m_{yx}\\cdot m_{xy}=${product}$ والسحابة ${sign > 0 ? 'صاعدة' : 'هابطة'}.`, `Make $m_{yx}\\cdot m_{xy}=${product}$ with the cloud ${sign > 0 ? 'rising' : 'falling'}.`),
        hint: say(`Biderkadura $r^2$ da: $r=\\pm\\sqrt{${product}}$.`, `El producto es $r^2$: $r=\\pm\\sqrt{${product}}$.`, `الجداء هو $r^2$: $r=\\pm\\sqrt{${product}}$.`, `The product is $r^2$: $r=\\pm\\sqrt{${product}}$.`),
        isSolved: (state) => state.r10 === target,
        solution
    }
}

export const scissorsExtra = freshFrom(initialScissorsState, scissorsMaker)
