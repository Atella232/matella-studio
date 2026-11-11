import { pick, randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import { equals, fraction, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import { freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'
import { probLatex, say, tenthsLatex } from './probability.ts'

/* ==========================================================================
   L4 · Kausak karratuan (Las causas en el cuadrado): three causes A₁, A₂,
   A₃ (machines, say) are three vertical strips as wide as their share,
   P(Aᵢ); in each strip the part painted from the bottom is P(D/Aᵢ). The
   painted area is the total probability P(D), and Bayes is the share of
   the painted area that each strip puts in: P(Aᵢ/D). Before the shares
   are shown, the learner bets on the most likely cause given D, which is
   often not the cause that fails most nor the one that makes most. Shares
   in tenths and failure rates in whole percents, so P(D) is an exact
   number of thousandths. Pure logic, exported for the games.
   ========================================================================== */

export interface CausesState {
    /** P(A₁), P(A₂), P(A₃) in tenths, adding up to 10 */
    shares: [number, number, number]
    /** P(D/Aᵢ) in percent */
    rates: [number, number, number]
    /** The cause whose numbers the steppers change */
    editing: 0 | 1 | 2
    prediction: Prediction | null
}

export const CAUSES_LIMITS = { share: { min: 1, max: 8 }, rate: { min: 0, max: 100 } } as const
export const initialCausesState: CausesState = { shares: [5, 3, 2], rates: [5, 10, 20], editing: 0, prediction: null }

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value)))

/** Changing the share of A₁ or A₂ gives the rest to A₃, which keeps at least one tenth */
export function setShare(state: CausesState, cause: 0 | 1, share: number): CausesState {
    const other = state.shares[1 - cause]
    const value = clamp(share, CAUSES_LIMITS.share.min, 10 - other - 1)
    const shares = [...state.shares] as CausesState['shares']
    shares[cause] = value
    shares[2] = 10 - shares[0] - shares[1]
    return value === state.shares[cause] ? state : { ...state, shares, prediction: null }
}

export function setRate(state: CausesState, cause: 0 | 1 | 2, rate: number): CausesState {
    const value = clamp(rate, CAUSES_LIMITS.rate.min, CAUSES_LIMITS.rate.max)
    if (value === state.rates[cause]) return state
    const rates = [...state.rates] as CausesState['rates']
    rates[cause] = value
    return { ...state, rates, prediction: null }
}

export const setEditingCause = (state: CausesState, editing: 0 | 1 | 2): CausesState => ({ ...state, editing })

/** Each path P(Aᵢ)·P(D/Aᵢ) in thousandths */
export const pathsOf = (state: Pick<CausesState, 'shares' | 'rates'>): [number, number, number] => state.shares.map((share, index) => share * state.rates[index]) as [number, number, number]
/** P(D) in thousandths */
export const totalOf = (state: Pick<CausesState, 'shares' | 'rates'>) => pathsOf(state).reduce((sum, path) => sum + path, 0)
/** P(Aᵢ/D), exact; null when D is impossible */
export function posteriorOf(state: Pick<CausesState, 'shares' | 'rates'>, cause: number): FractionValue | null {
    const total = totalOf(state)
    return total === 0 ? null : fraction(pathsOf(state)[cause], total)
}

/** The most likely cause given D (the first one on a tie): A₁ (<), A₂ (=) or A₃ (>) */
export function likeliestCause(state: Pick<CausesState, 'shares' | 'rates'>): 0 | 1 | 2 {
    const paths = pathsOf(state)
    const best = Math.max(...paths)
    return paths.indexOf(best) as 0 | 1 | 2
}
export const causesPrediction = (state: CausesState): Prediction => (['<', '=', '>'] as const)[likeliestCause(state)]

/** A probability in thousandths for LaTeX: 95 → 0{,}095 */
export const thousandthsLatex = (thousandths: number) => probLatex(fraction(thousandths, 1000))

/* ---------- Challenges ---------- */

export const causesChallenges: LabChallenge<CausesState>[] = [
    { id: 128161, prompt: say('Egin $A_1$ izatea kausarik probableena $D$ jakinda, beste biek baino huts gutxiago eginda ere.', 'Haz que $A_1$ sea la causa más probable sabiendo $D$, aunque falle menos que las otras dos.', 'اجعل $A_1$ السبب الأرجح مع العلم بـ $D$، مع أنه يخطئ أقل من السببين الآخرين.', 'Make $A_1$ the most likely cause given $D$, even though it fails less than the other two.'), hint: say('$A_1$ bidea $P(A_1)\\cdot P(D/A_1)$ da: zerrenda zabal batek akats-tasa txikia orekatzen du.', 'El camino de $A_1$ es $P(A_1)\\cdot P(D/A_1)$: una franja ancha compensa una tasa de fallo pequeña.', 'مسار $A_1$ هو $P(A_1)\\cdot P(D/A_1)$: الشريط العريض يعوّض نسبة خطأ صغيرة.', 'The path of $A_1$ is $P(A_1)\\cdot P(D/A_1)$: a wide strip makes up for a small failure rate.'), isSolved: (state) => totalOf(state) > 0 && pathsOf(state)[0] > pathsOf(state)[1] && pathsOf(state)[0] > pathsOf(state)[2] && state.rates[0] < state.rates[1] && state.rates[0] < state.rates[2] },
    { id: 128162, prompt: say('Egin $P(D)=0{,}1$ izatea.', 'Haz que $P(D)=0{,}1$.', 'اجعل $P(D)=0{,}1$.', 'Make $P(D)=0{,}1$.'), hint: say('$P(D)$ margotutako azalera osoa da: $P(A_1)\\cdot P(D/A_1)+P(A_2)\\cdot P(D/A_2)+P(A_3)\\cdot P(D/A_3)$.', '$P(D)$ es toda el área pintada: $P(A_1)\\cdot P(D/A_1)+P(A_2)\\cdot P(D/A_2)+P(A_3)\\cdot P(D/A_3)$.', '$P(D)$ هو كل المساحة الملوّنة: $P(A_1)\\cdot P(D/A_1)+P(A_2)\\cdot P(D/A_2)+P(A_3)\\cdot P(D/A_3)$.', '$P(D)$ is the whole painted area: $P(A_1)\\cdot P(D/A_1)+P(A_2)\\cdot P(D/A_2)+P(A_3)\\cdot P(D/A_3)$.'), isSolved: (state) => totalOf(state) === 100 },
    { id: 128163, prompt: say('Egin $P(A_2/D)=\\frac{1}{2}$ izatea.', 'Haz que $P(A_2/D)=\\frac{1}{2}$.', 'اجعل $P(A_2/D)=\\frac{1}{2}$.', 'Make $P(A_2/D)=\\frac{1}{2}$.'), hint: say('$A_2$ bideak beste bien batura bezainbeste balio behar du.', 'El camino de $A_2$ tiene que valer lo mismo que los otros dos juntos.', 'يجب أن يساوي مسار $A_2$ المسارين الآخرين معًا.', 'The path of $A_2$ has to be worth as much as the other two together.'), isSolved: (state) => totalOf(state) > 0 && 2 * pathsOf(state)[1] === totalOf(state) }
]

const NAMES = ['A_1', 'A_2', 'A_3'] as const

/** Endless practice: given shares, reach a posterior or a total probability by changing one failure rate */
const causesMaker: LabChallengeMaker<CausesState> = (random) => {
    for (;;) {
        const first = randomInt(random, 2, 6)
        const second = randomInt(random, 1, 8 - first)
        const shares: CausesState['shares'] = [first, second, 10 - first - second]
        const rates: CausesState['rates'] = [5 * randomInt(random, 1, 8), 5 * randomInt(random, 1, 8), 5 * randomInt(random, 1, 8)]
        const solution: CausesState = { shares, rates, editing: 0, prediction: null }
        const cause = randomInt(random, 0, 2) as 0 | 1 | 2
        const given = shares.map((share, index) => `P(${NAMES[index]})=${tenthsLatex(share)}`).join(',\\ ')
        const others = [0, 1, 2].filter((index) => index !== cause)
        const fixed = others.map((index) => `P(D/${NAMES[index]})=${probLatex(fraction(rates[index], 100))}`).join(',\\ ')
        const sameFixed = (state: CausesState) => state.shares.every((share, index) => share === shares[index]) && others.every((index) => state.rates[index] === rates[index])
        if (pick(random, [true, false])) {
            const target = posteriorOf(solution, cause)!
            if (target.numerator === 0 || target.numerator === target.denominator) continue
            return {
                prompt: say(`$${given}$ eta $${fixed}$ izanik, egin $P(${NAMES[cause]}/D)=${probLatex(target)}$ izatea.`, `Con $${given}$ y $${fixed}$, haz que $P(${NAMES[cause]}/D)=${probLatex(target)}$.`, `مع $${given}$ و$${fixed}$، اجعل $P(${NAMES[cause]}/D)=${probLatex(target)}$.`, `With $${given}$ and $${fixed}$, make $P(${NAMES[cause]}/D)=${probLatex(target)}$.`),
                hint: say(`Aldatu $P(D/${NAMES[cause]})$: haren bidea zati $D$ gertaeraren azalera osoa.`, `Cambia $P(D/${NAMES[cause]})$: su camino entre toda el área de $D$.`, `غيّر $P(D/${NAMES[cause]})$: مساره على كل مساحة $D$.`, `Change $P(D/${NAMES[cause]})$: its path over the whole area of $D$.`),
                isSolved: (state) => sameFixed(state) && posteriorOf(state, cause) !== null && equals(posteriorOf(state, cause)!, target),
                solution
            }
        }
        const total = totalOf(solution)
        return {
            prompt: say(`$${given}$ eta $${fixed}$ izanik, egin $P(D)=${thousandthsLatex(total)}$ izatea.`, `Con $${given}$ y $${fixed}$, haz que $P(D)=${thousandthsLatex(total)}$.`, `مع $${given}$ و$${fixed}$، اجعل $P(D)=${thousandthsLatex(total)}$.`, `With $${given}$ and $${fixed}$, make $P(D)=${thousandthsLatex(total)}$.`),
            hint: say(`Aldatu $P(D/${NAMES[cause]})$, hiru bideen batura $P(D)$ izan dadin.`, `Cambia $P(D/${NAMES[cause]})$ para que la suma de los tres caminos sea $P(D)$.`, `غيّر $P(D/${NAMES[cause]})$ ليصير مجموع المسارات الثلاثة $P(D)$.`, `Change $P(D/${NAMES[cause]})$ so that the three paths add up to $P(D)$.`),
            isSolved: (state) => sameFixed(state) && totalOf(state) === total,
            solution
        }
    }
}

export const causesExtra = freshFrom(initialCausesState, causesMaker)
