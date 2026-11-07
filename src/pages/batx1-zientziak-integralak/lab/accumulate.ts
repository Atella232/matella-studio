import { randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { say } from '../../batx1-zientziak-funtzioak/text.ts'
import { compareTo, freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'
import { exact, numberLatex } from './numbers.ts'

/* ==========================================================================
   L5 · La función área: A(x) = ∫₀ˣ f(t) dt. Above, f with the region
   from 0 to x shaded (blue above the axis, red below); below, the graph
   of A drawn up to x. ▶ moves x from 0 to the right end and draws A as
   it goes. A grows where f > 0, decreases where f < 0 and stops where
   f = 0: A′ = f, the idea behind Barrow's rule. Before the graph of A is
   shown, the learner guesses whether A grows, stays flat or decreases at
   the marked point p of each function.
   ========================================================================== */

export type AccumulateFunction = 'line' | 'parabola' | 'twoCuts' | 'cosine'

export const ACCUMULATE_FUNCTIONS: AccumulateFunction[] = ['line', 'parabola', 'twoCuts', 'cosine']

interface AccumulateSetup {
    f: (x: number) => number
    /** A(x) = ∫₀ˣ f, with A(0) = 0 */
    A: (x: number) => number
    latex: string
    areaLatex: string
    /** The marked point of the prediction */
    p: number
    /** The right end, in half units (x goes from 0 to tMax / 2) */
    tMax: number
    /** The y ranges of the two planes */
    fView: [number, number]
    aView: [number, number]
}

export const ACCUMULATE_SETUP: Record<AccumulateFunction, AccumulateSetup> = {
    line: { f: (x) => 2 - x, A: (x) => 2 * x - x * x / 2, latex: 'f(x)=2-x', areaLatex: 'A(x)=2x-\\frac{x^2}{2}', p: 3, tMax: 10, fView: [-3, 2], aView: [-3, 2] },
    parabola: { f: (x) => x * x - 1, A: (x) => x ** 3 / 3 - x, latex: 'f(x)=x^2-1', areaLatex: 'A(x)=\\frac{x^3}{3}-x', p: 1, tMax: 5, fView: [-1, 5], aView: [-1, 3] },
    twoCuts: { f: (x) => x * x - 4 * x + 3, A: (x) => x ** 3 / 3 - 2 * x * x + 3 * x, latex: 'f(x)=x^2-4x+3', areaLatex: 'A(x)=\\frac{x^3}{3}-2x^2+3x', p: 4, tMax: 9, fView: [-1, 5], aView: [-1, 3] },
    cosine: { f: (x) => Math.cos(x), A: (x) => Math.sin(x), latex: 'f(x)=\\cos x', areaLatex: 'A(x)=\\sin x', p: 1, tMax: 10, fView: [-1, 1], aView: [-1, 1] }
}

export interface AccumulateState {
    fn: AccumulateFunction
    /** x = t / 2 */
    t: number
    prediction: Prediction | null
}

export const initialAccumulateState: AccumulateState = { fn: 'line', t: 1, prediction: null }

/** Only a new function asks for a new prediction; x stays inside the new function's range */
export function setAccumulate(state: AccumulateState, patch: Partial<Omit<AccumulateState, 'prediction'>>): AccumulateState {
    const fn = patch.fn ?? state.fn
    const t = Math.min(ACCUMULATE_SETUP[fn].tMax, Math.max(0, Math.round(patch.t ?? state.t)))
    return { fn, t, prediction: fn === state.fn ? state.prediction : null }
}

export const accumulateX = (state: AccumulateState) => state.t / 2
export const areaAt = (fn: AccumulateFunction, x: number) => exact(ACCUMULATE_SETUP[fn].A(x))
export const heightAt = (fn: AccumulateFunction, x: number) => exact(ACCUMULATE_SETUP[fn].f(x))

/** At the marked point, A decreases (<), stays flat (=) or grows (>): the sign of f(p) */
export const accumulatePrediction = (state: AccumulateState): Prediction => compareTo(heightAt(state.fn, ACCUMULATE_SETUP[state.fn].p), 0)

/** Whether A has a maximum (f goes from + to −) or a minimum (− to +) at x */
export function turning(fn: AccumulateFunction, x: number): 'maximum' | 'minimum' | null {
    const { f } = ACCUMULATE_SETUP[fn]
    const [left, right] = [f(x - 1e-3), f(x + 1e-3)]
    if (left > 0 && right < 0) return 'maximum'
    if (left < 0 && right > 0) return 'minimum'
    return null
}

const withF = (fn: AccumulateFunction, goal: LocalizedText): LocalizedText => {
    const f = ACCUMULATE_SETUP[fn].latex
    return say(`$${f}$ funtzioarekin, ${goal.eu}`, `Con $${f}$, ${goal.es}`, `مع $${f}$، ${goal.ar}`, `With $${f}$, ${goal.en}`)
}

const at = (fn: AccumulateFunction, x: number) => (state: AccumulateState) => state.fn === fn && accumulateX(state) === x

export const accumulateChallenges: LabChallenge<AccumulateState>[] = [
    {
        id: 112351,
        prompt: withF('line', say('eraman $x$, $A(x)$ maximoa den puntura.', 'lleva $x$ al punto donde $A(x)$ es máxima.', 'انقل $x$ إلى النقطة التي تكون فيها $A(x)$ عظمى.', 'move $x$ to the point where $A(x)$ is greatest.')),
        hint: say('$A$ hazten da $f>0$ den bitartean: gelditu $f$ zero denean.', '$A$ crece mientras $f>0$: para donde $f$ se anula.', 'تتزايد $A$ ما دام $f>0$: توقف حيث تنعدم $f$.', '$A$ grows while $f>0$: stop where $f$ is zero.'),
        isSolved: at('line', 2)
    },
    {
        id: 112352,
        prompt: withF('twoCuts', say('aurkitu $A(x)$ berriro 0 den $x>0$ puntua.', 'encuentra el $x>0$ donde $A(x)$ vuelve a valer 0.', 'أوجد $x>0$ الذي تعود فيه $A(x)$ إلى 0.', 'find the $x>0$ where $A(x)$ is 0 again.')),
        hint: say('Gaineko zatia eta azpikoa berdintzen diren tokian.', 'Donde la parte de arriba y la de abajo se igualan.', 'حيث يتساوى الجزء العلوي والسفلي.', 'Where the part above and the part below balance out.'),
        isSolved: (state) => state.fn === 'twoCuts' && accumulateX(state) > 0 && areaAt('twoCuts', accumulateX(state)) === 0
    },
    {
        id: 112353,
        prompt: withF('parabola', say('eraman $x$, $A(x)$ minimoa den puntura.', 'lleva $x$ al punto donde $A(x)$ es mínima.', 'انقل $x$ إلى النقطة التي تكون فيها $A(x)$ صغرى.', 'move $x$ to the point where $A(x)$ is least.')),
        hint: say('$A$ jaisten da $f<0$ den bitartean.', '$A$ baja mientras $f<0$.', 'تتناقص $A$ ما دام $f<0$.', '$A$ goes down while $f<0$.'),
        isSolved: at('parabola', 1)
    },
    {
        id: 112354,
        prompt: withF('line', say('aurkitu $A(x)$ berriro 0 den $x>0$ puntua.', 'encuentra el $x>0$ donde $A(x)$ vuelve a valer 0.', 'أوجد $x>0$ الذي تعود فيه $A(x)$ إلى 0.', 'find the $x>0$ where $A(x)$ is 0 again.')),
        hint: say('Ardatzaren azpiko triangeluak gainekoa berdindu behar du.', 'El triángulo de debajo del eje tiene que igualar al de arriba.', 'يجب أن يساوي المثلث تحت المحور المثلث فوقه.', 'The triangle below the axis must match the one above.'),
        isSolved: (state) => state.fn === 'line' && accumulateX(state) > 0 && areaAt('line', accumulateX(state)) === 0
    },
    {
        id: 112355,
        prompt: withF('cosine', say('eraman $x$, $A(x)$ beherakorra den puntu batera.', 'lleva $x$ a un punto donde $A(x)$ decrezca.', 'انقل $x$ إلى نقطة تكون فيها $A(x)$ متناقصة.', 'move $x$ to a point where $A(x)$ decreases.')),
        hint: same("$A'(x)=f(x)$"),
        isSolved: (state) => state.fn === 'cosine' && heightAt('cosine', accumulateX(state)) < 0
    }
]

function same(value: string) {
    return say(value, value, value, value)
}

/** Endless practice: a value of A, where A grows or decreases, or its maximum or minimum */
const accumulateMaker: LabChallengeMaker<AccumulateState> = (random) => {
    for (;;) {
        const fn = ACCUMULATE_FUNCTIONS[randomInt(random, 0, ACCUMULATE_FUNCTIONS.length - 1)]
        const { tMax } = ACCUMULATE_SETUP[fn]
        const t = randomInt(random, 1, tMax)
        const x = t / 2
        const kind = randomInt(random, 0, 2)
        if (kind === 0) {
            // A value of A: only the polynomials give exact numbers, and it must be reached at one x only
            if (fn === 'cosine') continue
            const value = areaAt(fn, x)
            const others = Array.from({ length: tMax + 1 }, (_, k) => k).filter((k) => areaAt(fn, k / 2) === value)
            if (others.length > 1) continue
            return {
                prompt: withF(fn, say(`eraman $x$, $A(x)=${numberLatex(value)}$ den puntura.`, `lleva $x$ al punto donde $A(x)=${numberLatex(value)}$.`, `انقل $x$ إلى النقطة التي يكون فيها $A(x)=${numberLatex(value)}$.`, `move $x$ to the point where $A(x)=${numberLatex(value)}$.`)),
                hint: same(`$${ACCUMULATE_SETUP[fn].areaLatex}$`),
                isSolved: (state) => state.fn === fn && areaAt(fn, accumulateX(state)) === value,
                solution: { fn, t, prediction: null }
            }
        }
        if (kind === 1) {
            const sign = Math.sign(heightAt(fn, x))
            if (sign === 0) continue
            const goal = sign > 0
                ? say('eraman $x$, $A(x)$ gorakorra den puntu batera.', 'lleva $x$ a un punto donde $A(x)$ crezca.', 'انقل $x$ إلى نقطة تكون فيها $A(x)$ متزايدة.', 'move $x$ to a point where $A(x)$ increases.')
                : say('eraman $x$, $A(x)$ beherakorra den puntu batera.', 'lleva $x$ a un punto donde $A(x)$ decrezca.', 'انقل $x$ إلى نقطة تكون فيها $A(x)$ متناقصة.', 'move $x$ to a point where $A(x)$ decreases.')
            return {
                prompt: withF(fn, goal),
                hint: same("$A'(x)=f(x)$"),
                isSolved: (state) => state.fn === fn && Math.sign(heightAt(fn, accumulateX(state))) === sign,
                solution: { fn, t, prediction: null }
            }
        }
        // The maximum or the minimum of A, where f changes sign on the grid
        const kindOfTurn = turning(fn, x)
        if (kindOfTurn === null) continue
        const goal = kindOfTurn === 'maximum'
            ? say('eraman $x$, $A(x)$ maximoa den puntura.', 'lleva $x$ al punto donde $A(x)$ es máxima.', 'انقل $x$ إلى النقطة التي تكون فيها $A(x)$ عظمى.', 'move $x$ to the point where $A(x)$ is greatest.')
            : say('eraman $x$, $A(x)$ minimoa den puntura.', 'lleva $x$ al punto donde $A(x)$ es mínima.', 'انقل $x$ إلى النقطة التي تكون فيها $A(x)$ صغرى.', 'move $x$ to the point where $A(x)$ is least.')
        return {
            prompt: withF(fn, goal),
            hint: say('$A$ funtzioak $f$ funtzioak zeinua aldatzen duen tokian du muturra.', '$A$ tiene su extremo donde $f$ cambia de signo.', 'لـ $A$ قيمتها القصوى حيث تغيّر $f$ إشارتها.', '$A$ has its extremum where $f$ changes sign.'),
            isSolved: (state) => state.fn === fn && turning(fn, accumulateX(state)) === kindOfTurn,
            solution: { fn, t, prediction: null }
        }
    }
}

export const accumulateExtra = freshFrom(initialAccumulateState, accumulateMaker)
