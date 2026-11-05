import { pick, randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { compareTo, freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'

/* ==========================================================================
   L3 · Aldagai-aldaketaren makina (La máquina del cambio de variable):
   two roots t₁ and t₂ of a second-degree equation in t, and the change
   t = x², t = x³ or t = 2ˣ. Undoing the change takes each t to its x:
   ±√t (two, one or none), ∛t (always one) or log₂ t (only if t > 0). The
   learner first predicts whether there will be fewer than two, exactly two
   or more than two solutions in x; ▶ carries each t across, and the ones
   that give nothing fall out. Pure logic, whole t only.
   ========================================================================== */

export type ChangeKind = 'square' | 'cube' | 'exp'

export const CHANGE_LIMITS = { t: { min: -9, max: 9 } } as const

export interface ChangeState {
    kind: ChangeKind
    t1: number
    t2: number
    prediction: Prediction | null
}

export const initialChangeState: ChangeState = { kind: 'square', t1: 9, t2: 0, prediction: null }

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value)))

export function setChange(state: ChangeState, patch: Partial<Omit<ChangeState, 'prediction'>>): ChangeState {
    const kind = patch.kind ?? state.kind
    const t1 = clamp(patch.t1 ?? state.t1, CHANGE_LIMITS.t.min, CHANGE_LIMITS.t.max)
    const t2 = clamp(patch.t2 ?? state.t2, CHANGE_LIMITS.t.min, CHANGE_LIMITS.t.max)
    const same = kind === state.kind && t1 === state.t1 && t2 === state.t2
    return { kind, t1, t2, prediction: same ? state.prediction : null }
}

/** The values of x that one t gives back */
export function xFromT(kind: ChangeKind, t: number): number[] {
    if (kind === 'cube') return [Math.cbrt(t)]
    if (kind === 'exp') return t > 0 ? [Math.log2(t)] : []
    if (t < 0) return []
    return t === 0 ? [0] : [-Math.sqrt(t), Math.sqrt(t)]
}
/** The different t roots (one when t₁ = t₂) */
export const tRoots = ({ t1, t2 }: Pick<ChangeState, 't1' | 't2'>) => (t1 === t2 ? [t1] : [t1, t2])
/** Every solution in x, smallest first */
export const changeSolutions = (state: Pick<ChangeState, 'kind' | 't1' | 't2'>) => tRoots(state).flatMap((t) => xFromT(state.kind, t)).sort((a, b) => a - b)
/** Fewer than two (<), two (=) or more than two (>) solutions */
export const changePrediction = (state: ChangeState): Prediction => compareTo(changeSolutions(state).length, 2)

/** a·u + b written as a term with its sign: −7u, +12 */
const term = (coefficient: number, unit: string, first = false) => {
    if (coefficient === 0) return ''
    const sign = coefficient < 0 ? '-' : first ? '' : '+'
    const size = Math.abs(coefficient)
    return `${sign}${size === 1 && unit ? '' : size}${unit}`
}
/** t² − (t₁ + t₂)t + t₁t₂ = 0 */
export const tEquationLatex = ({ t1, t2 }: Pick<ChangeState, 't1' | 't2'>) => `t^2${term(-(t1 + t2), 't')}${term(t1 * t2, '')}=0`
/** The equation in x that the change hides */
export function xEquationLatex({ kind, t1, t2 }: Pick<ChangeState, 'kind' | 't1' | 't2'>): string {
    const [high, low] = kind === 'square' ? ['x^4', 'x^2'] : kind === 'cube' ? ['x^6', 'x^3'] : ['4^x', '\\cdot 2^x']
    const middle = -(t1 + t2)
    const middleTerm = kind === 'exp'
        ? (middle === 0 ? '' : `${middle < 0 ? '-' : '+'}${Math.abs(middle) === 1 ? '2^x' : `${Math.abs(middle)}${low}`}`)
        : term(middle, low)
    return `${high}${middleTerm}${term(t1 * t2, '')}=0`
}
export const changeLatex = (kind: ChangeKind) => (kind === 'square' ? 't=x^2' : kind === 'cube' ? 't=x^3' : 't=2^x')

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const sameT = (state: ChangeState, a: number, b: number) => (state.t1 === a && state.t2 === b) || (state.t1 === b && state.t2 === a)

export const changeChallenges: LabChallenge<ChangeState>[] = [
    { id: 101301, prompt: say('$t=x^2$ eginda, lortu 4 soluzio.', 'Con $t=x^2$, consigue 4 soluciones.', 'مع $t=x^2$ احصل على 4 حلول.', 'With $t=x^2$, get 4 solutions.'), hint: say('Bi $t$ positibo eta desberdin.', 'Dos $t$ positivos y distintos.', 'قيمتان موجبتان مختلفتان لـ $t$.', 'Two different positive values of $t$.'), isSolved: (state) => state.kind === 'square' && changeSolutions(state).length === 4 },
    { id: 101302, prompt: say('$t=x^2$ eginda, lortu 2 soluzio: $t$ bat positiboa eta bestea negatiboa.', 'Con $t=x^2$, consigue 2 soluciones: un $t$ positivo y otro negativo.', 'مع $t=x^2$ احصل على حلّين: قيمة موجبة لـ $t$ وأخرى سالبة.', 'With $t=x^2$, get 2 solutions: one positive $t$ and one negative.'), hint: say('$t$ negatiboa baztertu egiten da.', 'El $t$ negativo se descarta.', 'تُستبعد القيمة السالبة لـ $t$.', 'The negative $t$ is thrown out.'), isSolved: (state) => state.kind === 'square' && Math.min(state.t1, state.t2) < 0 && Math.max(state.t1, state.t2) > 0 },
    { id: 101303, prompt: say('$t=2^x$ eginda, egin soluziorik ez egotea.', 'Con $t=2^x$, haz que no haya ninguna solución.', 'مع $t=2^x$ اجعل المعادلة بلا حل.', 'With $t=2^x$, make it have no solution at all.'), hint: same('$2^x>0$'), isSolved: (state) => state.kind === 'exp' && changeSolutions(state).length === 0 },
    { id: 101304, prompt: say('Eraiki $x^6-7x^3-8=0$.', 'Construye $x^6-7x^3-8=0$.', 'ابنِ $x^6-7x^3-8=0$.', 'Build $x^6-7x^3-8=0$.'), hint: say('$t=x^3$; $t$ ekuazioaren erroak 8 eta $-1$ dira.', '$t=x^3$; las raíces en $t$ son 8 y $-1$.', '$t=x^3$؛ جذرا المعادلة في $t$ هما 8 و$-1$.', '$t=x^3$; the roots in $t$ are 8 and $-1$.'), isSolved: (state) => state.kind === 'cube' && sameT(state, 8, -1) },
    { id: 101305, prompt: say('Eraiki $4^x-2^x-12=0$, eta begiratu zein $t$ baztertzen den.', 'Construye $4^x-2^x-12=0$ y mira qué $t$ se descarta.', 'ابنِ $4^x-2^x-12=0$ وانظر أيّ $t$ يُستبعد.', 'Build $4^x-2^x-12=0$ and see which $t$ is thrown out.'), hint: say('$t=2^x$; $t$ ekuazioaren erroak 4 eta $-3$ dira.', '$t=2^x$; las raíces en $t$ son 4 y $-3$.', '$t=2^x$؛ جذرا المعادلة في $t$ هما 4 و$-3$.', '$t=2^x$; the roots in $t$ are 4 and $-3$.'), isSolved: (state) => state.kind === 'exp' && sameT(state, 4, -3) }
]

function same(value: string): LocalizedText {
    return say(value, value, value, value)
}

/** The two values of t that give exactly `count` solutions for each change */
const recipes: Record<ChangeKind, Record<number, (random: () => number) => [number, number]>> = {
    square: {
        0: (random) => [-randomInt(random, 1, 4), -randomInt(random, 5, 9)],
        1: (random) => [0, -randomInt(random, 1, 9)],
        2: (random) => [pick(random, [1, 4, 9]), -randomInt(random, 1, 9)],
        3: (random) => [0, pick(random, [1, 4, 9])],
        4: (random) => [pick(random, [1, 4]), 9]
    },
    cube: {
        1: (random) => { const t = pick(random, [-8, -1, 1, 8]); return [t, t] },
        2: (random) => [pick(random, [-8, -1]), pick(random, [1, 8])]
    },
    exp: {
        0: (random) => [-randomInt(random, 1, 4), -randomInt(random, 5, 9)],
        1: (random) => [pick(random, [1, 2, 4, 8]), -randomInt(random, 1, 9)],
        2: (random) => [pick(random, [1, 2]), pick(random, [4, 8])]
    }
}

/** Endless practice: a change and a number of solutions to reach */
const changeMaker: LabChallengeMaker<ChangeState> = (random) => {
    const kind = pick<ChangeKind>(random, ['square', 'cube', 'exp'])
    const counts = Object.keys(recipes[kind]).map(Number)
    const count = pick(random, counts)
    const [t1, t2] = recipes[kind][count](random)
    const change = changeLatex(kind)
    return {
        prompt: say(`$${change}$ eginda, lortu zehazki ${count} soluzio.`, `Con $${change}$, consigue exactamente ${count} ${count === 1 ? 'solución' : 'soluciones'}.`, `مع $${change}$ احصل على ${count} من الحلول بالضبط.`, `With $${change}$, get exactly ${count} ${count === 1 ? 'solution' : 'solutions'}.`),
        hint: kind === 'square'
            ? say('$t>0$ bakoitzak bi ematen ditu, $t=0$ balioak bat eta $t<0$ balioak bat ere ez.', 'Cada $t>0$ da dos, $t=0$ da una y $t<0$ ninguna.', 'كل $t>0$ يعطي حلّين، و$t=0$ حلًّا واحدًا، و$t<0$ لا شيء.', 'Each $t>0$ gives two, $t=0$ gives one and $t<0$ none.')
            : kind === 'cube'
                ? say('$t$ bakoitzak bat ematen du; bi $t$ berdinek, bat bakarrik.', 'Cada $t$ da una; dos $t$ iguales, una sola.', 'كل $t$ يعطي حلًّا واحدًا، وقيمتان متساويتان تعطيان حلًّا واحدًا.', 'Each $t$ gives one; two equal values of $t$, just one.')
                : say('$t>0$ bakoitzak bat ematen du; $t\\le 0$ direnek ez.', 'Cada $t>0$ da una; los $t\\le 0$, ninguna.', 'كل $t>0$ يعطي حلًّا واحدًا، ولا تعطي $t\\le 0$ شيئًا.', 'Each $t>0$ gives one; the $t\\le 0$ give none.'),
        isSolved: (state) => state.kind === kind && changeSolutions(state).length === count,
        solution: { kind, t1, t2, prediction: null }
    }
}

export const changeExtra = freshFrom(initialChangeState, changeMaker)
