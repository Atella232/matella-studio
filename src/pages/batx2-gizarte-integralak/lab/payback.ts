import { randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { say } from '../../batx1-zientziak-funtzioak/text.ts'
import { compareTo, freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'

/* ==========================================================================
   L5 · Noiz berreskuratzen da inbertsioa? (¿Cuándo se recupera la
   inversión?): three new businesses whose monthly profit b(t) = mt − c
   starts negative and then turns positive. The board shades the area
   under b from 0 to T, red below the axis and green above; the readout
   gives the accumulated profit A(T) = ∫₀ᵀ b. The money comes back when
   the green area equals the red one: A(T) = 0. Before the shading, the
   learner guesses whether that happens before, at or after month 6.
   ========================================================================== */

export type Project = 'cafe' | 'shop' | 'gym'

export const PROJECTS: Project[] = ['cafe', 'shop', 'gym']

export const PAYBACK_LIMITS = { t: { min: 0, max: 12 } } as const

export interface PaybackState {
    project: Project
    t: number
    prediction: Prediction | null
}

export const initialPaybackState: PaybackState = { project: 'cafe', t: 0, prediction: null }

interface ProjectSetup {
    /** b(t) = m t − c, in thousands of euros a month */
    m: number
    c: number
    latex: string
}

export const PROJECT_SETUP: Record<Project, ProjectSetup> = {
    cafe: { m: 2, c: 6, latex: 'b(t)=2t-6' },
    shop: { m: 1, c: 2, latex: 'b(t)=t-2' },
    gym: { m: 3, c: 12, latex: 'b(t)=3t-12' }
}

export function setPayback(state: PaybackState, patch: Partial<Omit<PaybackState, 'prediction'>>): PaybackState {
    const project = patch.project ?? state.project
    const t = Math.min(PAYBACK_LIMITS.t.max, Math.max(PAYBACK_LIMITS.t.min, Math.round(patch.t ?? state.t)))
    return { project, t, prediction: project === state.project ? state.prediction : null }
}

export const rateOf = (project: Project, t: number) => PROJECT_SETUP[project].m * t - PROJECT_SETUP[project].c
/** A(T) = m T²/2 − c T */
export const accumulatedOf = (project: Project, t: number) => (PROJECT_SETUP[project].m * t * t) / 2 - PROJECT_SETUP[project].c * t
/** A(T) = 0 with T > 0 */
export const paybackMonth = (project: Project) => (2 * PROJECT_SETUP[project].c) / PROJECT_SETUP[project].m

/** The money comes back before (<), at (=) or after (>) month 6 */
export const paybackPrediction = (state: Pick<PaybackState, 'project'>): Prediction => compareTo(paybackMonth(state.project), 6)

const same = (text: string) => say(text, text, text, text)

export const paybackChallenges: LabChallenge<PaybackState>[] = [
    {
        id: 149201,
        prompt: say('Kafetegian, bilatu galera pilatua handiena den hilabetea.', 'En la cafetería, busca el mes en el que la pérdida acumulada es mayor.', 'في المقهى، ابحث عن الشهر الذي تكون فيه الخسارة المتراكمة أكبر.', 'In the café, find the month when the accumulated loss is largest.'),
        hint: same('$b(t)=0$'),
        isSolved: (state) => state.project === 'cafe' && state.t === 3
    },
    {
        id: 149202,
        prompt: say('Dendan, bilatu inbertsioa berreskuratzen den hilabetea.', 'En la tienda, busca el mes en el que se recupera la inversión.', 'في المتجر، ابحث عن الشهر الذي يُسترجع فيه الاستثمار.', 'In the shop, find the month when the investment comes back.'),
        hint: same('$\\frac{t^2}{2}-2t=0$'),
        isSolved: (state) => state.project === 'shop' && state.t === 4
    },
    {
        id: 149203,
        prompt: say('Gimnasioan, bilatu inbertsioa berreskuratzen den hilabetea.', 'En el gimnasio, busca el mes en el que se recupera la inversión.', 'في النادي الرياضي، ابحث عن الشهر الذي يُسترجع فيه الاستثمار.', 'In the gym, find the month when the investment comes back.'),
        hint: same('$\\frac{3t^2}{2}-12t=0$'),
        isSolved: (state) => state.project === 'gym' && state.t === 8
    },
    {
        id: 149204,
        prompt: say('Kafetegian, bilatu irabazi pilatua 7 mila euro den hilabetea.', 'En la cafetería, busca el mes con un beneficio acumulado de 7 mil euros.', 'في المقهى، ابحث عن الشهر الذي يكون فيه الربح المتراكم 7 آلاف يورو.', 'In the café, find the month with an accumulated profit of 7 thousand euros.'),
        hint: same('$t^2-6t=7$'),
        isSolved: (state) => state.project === 'cafe' && state.t === 7
    },
    {
        id: 149205,
        prompt: say('Gimnasioan, bilatu hileko irabazia positibo bihurtzen den hilabetea.', 'En el gimnasio, busca el mes en el que el beneficio mensual pasa a ser positivo.', 'في النادي الرياضي، ابحث عن الشهر الذي يصير فيه الربح الشهري موجبًا.', 'In the gym, find the month when the monthly profit turns positive.'),
        hint: same('$3t-12=0$'),
        isSolved: (state) => state.project === 'gym' && state.t === 4
    }
]

const NAMES: Record<Project, LocalizedText> = {
    cafe: say('Kafetegian', 'En la cafetería', 'في المقهى', 'In the café'),
    shop: say('Dendan', 'En la tienda', 'في المتجر', 'In the shop'),
    gym: say('Gimnasioan', 'En el gimnasio', 'في النادي الرياضي', 'In the gym')
}

/** Endless practice: set a month with a given accumulated profit */
const paybackMaker: LabChallengeMaker<PaybackState> = (random) => {
    const project = PROJECTS[randomInt(random, 0, PROJECTS.length - 1)]
    const t = randomInt(random, 1, 12)
    const target = accumulatedOf(project, t)
    const shown = String(target).replace('.', '{,}')
    const shownAr = String(target)
    const name = NAMES[project]
    return {
        prompt: say(`${name.eu}, bilatu $A(t)=${shown}$ den hilabete bat.`, `${name.es}, busca un mes con $A(t)=${shown}$.`, `${name.ar}، ابحث عن شهر يكون فيه $A(t)=${shownAr}$.`, `${name.en}, find a month with $A(t)=${shown}$.`),
        hint: same(`$${PROJECT_SETUP[project].latex}$`),
        isSolved: (state) => state.project === project && Math.abs(accumulatedOf(project, state.t) - target) < 1e-9,
        solution: { project, t, prediction: null }
    }
}

export const paybackExtra = freshFrom(initialPaybackState, paybackMaker)
