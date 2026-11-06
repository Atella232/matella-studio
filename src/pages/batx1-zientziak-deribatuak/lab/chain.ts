import { randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import { say } from '../../batx1-zientziak-funtzioak/text.ts'
import { compareTo, freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'

/* ==========================================================================
   L5 · La cadena de máquinas: x enters the inner machine u = g(x) and u
   enters the outer one y = h(u). A small piece of length Δx is stretched
   g′(x) times by the first machine and h′(u) times by the second, so the
   chain stretches it h′(u)·g′(x) times: the chain rule. Before the bars
   are shown the learner predicts whether, at x = 1, the final piece is
   shorter than, as long as or longer than the first one. ▶ pushes the
   piece through the two machines.
   ========================================================================== */

export type InnerMachine = 'double' | 'shift' | 'square' | 'half'
export type OuterMachine = 'square' | 'cube' | 'triple' | 'half'

export const INNER_MACHINES: InnerMachine[] = ['double', 'shift', 'square', 'half']
export const OUTER_MACHINES: OuterMachine[] = ['square', 'cube', 'triple', 'half']

export const CHAIN_LIMITS = { x: { min: -2, max: 2 } } as const

interface Machine {
    fn: (value: number) => number
    derivative: (value: number) => number
    /** The machine in LaTeX, with its letter (x inside, u outside) */
    latex: string
    derivativeLatex: string
}

export const INNER: Record<InnerMachine, Machine> = {
    double: { fn: (x) => 2 * x, derivative: () => 2, latex: 'u=2x', derivativeLatex: "u'=2" },
    shift: { fn: (x) => x + 1, derivative: () => 1, latex: 'u=x+1', derivativeLatex: "u'=1" },
    square: { fn: (x) => x * x, derivative: (x) => 2 * x, latex: 'u=x^2', derivativeLatex: "u'=2x" },
    half: { fn: (x) => x / 2, derivative: () => 0.5, latex: 'u=\\frac{x}{2}', derivativeLatex: "u'=\\frac{1}{2}" }
}

export const OUTER: Record<OuterMachine, Machine> = {
    square: { fn: (u) => u * u, derivative: (u) => 2 * u, latex: 'y=u^2', derivativeLatex: "y'=2u" },
    cube: { fn: (u) => u ** 3, derivative: (u) => 3 * u * u, latex: 'y=u^3', derivativeLatex: "y'=3u^2" },
    triple: { fn: (u) => 3 * u, derivative: () => 3, latex: 'y=3u', derivativeLatex: "y'=3" },
    half: { fn: (u) => u / 2, derivative: () => 0.5, latex: 'y=\\frac{u}{2}', derivativeLatex: "y'=\\frac{1}{2}" }
}

export interface ChainState {
    inner: InnerMachine
    outer: OuterMachine
    x: number
    prediction: Prediction | null
}

export const initialChainState: ChainState = { inner: 'double', outer: 'square', x: 1, prediction: null }

/** A new machine asks for a new prediction; moving x does not */
export function setChain(state: ChainState, patch: Partial<Omit<ChainState, 'prediction'>>): ChainState {
    const inner = patch.inner ?? state.inner
    const outer = patch.outer ?? state.outer
    const x = Math.min(CHAIN_LIMITS.x.max, Math.max(CHAIN_LIMITS.x.min, Math.round(patch.x ?? state.x)))
    return { inner, outer, x, prediction: inner === state.inner && outer === state.outer ? state.prediction : null }
}

/** u, y and the three slopes at x */
export function chainValues(inner: InnerMachine, outer: OuterMachine, x: number) {
    const u = INNER[inner].fn(x)
    const innerSlope = INNER[inner].derivative(x)
    const outerSlope = OUTER[outer].derivative(u)
    return { u, y: OUTER[outer].fn(u), innerSlope, outerSlope, total: innerSlope * outerSlope }
}

/** At x = 1 the final piece is shorter (<), as long (=) or longer (>) than the first one */
export function chainPrediction(state: ChainState): Prediction {
    return compareTo(Math.abs(chainValues(state.inner, state.outer, 1).total), 1)
}

const total = (state: ChainState) => chainValues(state.inner, state.outer, state.x).total

export const chainChallenges: LabChallenge<ChainState>[] = [
    {
        id: 110351,
        prompt: say('$u=x^2$ eta $y=u^3$ makinekin, eraman $x$ 1 baliora: zatia $3\\cdot 2=6$ aldiz luzatzen da.', 'Con $u=x^2$ e $y=u^3$, lleva $x$ a 1: el trozo se estira $3\\cdot 2=6$ veces.', 'مع $u=x^2$ و$y=u^3$ انقل $x$ إلى 1: تتمدد القطعة $3\\cdot 2=6$ مرات.', 'With $u=x^2$ and $y=u^3$, take $x$ to 1: the piece stretches $3\\cdot 2=6$ times.'),
        hint: say('Barruan $u=x^2$; kanpoan $y=u^3$.', 'Dentro $u=x^2$; fuera $y=u^3$.', 'في الداخل $u=x^2$ وفي الخارج $y=u^3$.', 'Inside $u=x^2$; outside $y=u^3$.'),
        isSolved: (state) => state.inner === 'square' && state.outer === 'cube' && state.x === 1
    },
    {
        id: 110352,
        prompt: say('Bilatu kate bat eta $x$ bat, non katearen deribatua 0 den: zatia puntu bihurtzen da.', 'Busca una cadena y un $x$ donde la derivada de la cadena sea 0: el trozo se queda en un punto.', 'ابحث عن سلسلة وقيمة $x$ تكون فيها مشتقة السلسلة 0: تصير القطعة نقطة.', 'Find a chain and an $x$ where the derivative of the chain is 0: the piece shrinks to a point.'),
        hint: say('Makina batek 0 malda izan behar du.', 'Una de las máquinas tiene que tener pendiente 0.', 'يجب أن يكون ميل إحدى الآلتين 0.', 'One of the machines has to have slope 0.'),
        isSolved: (state) => total(state) === 0
    },
    {
        id: 110353,
        prompt: say('Jarri elkar ezeztatzen duten bi makina: katea ez da inon luzatzen ez laburtzen.', 'Junta dos máquinas que se anulen: la cadena no estira ni encoge en ningún punto.', 'اجمع آلتين تلغي إحداهما الأخرى: لا تمدد السلسلة ولا تقلص في أي نقطة.', 'Put together two machines that cancel out: the chain neither stretches nor shrinks anywhere.'),
        hint: same4('$2\\cdot\\frac{1}{2}=1$'),
        isSolved: (state) => state.inner === 'double' && state.outer === 'half'
    },
    {
        id: 110354,
        prompt: say('Lortu katearen deribatu negatibo bat: zatia buelta emanda ateratzen da.', 'Consigue una derivada de la cadena negativa: el trozo sale dado la vuelta.', 'احصل على مشتقة سالبة للسلسلة: تخرج القطعة مقلوبة.', 'Get a negative derivative of the chain: the piece comes out flipped.'),
        hint: say('$u=x^2$ makinak malda negatiboa du $x<0$ denean.', 'La máquina $u=x^2$ tiene pendiente negativa si $x<0$.', 'للآلة $u=x^2$ ميل سالب إذا كان $x<0$.', 'The machine $u=x^2$ has a negative slope if $x<0$.'),
        isSolved: (state) => total(state) < 0
    },
    {
        id: 110355,
        prompt: say('Lortu zatia 12 aldiz luzatzen duen kate bat.', 'Consigue una cadena que estire el trozo 12 veces.', 'احصل على سلسلة تمدّد القطعة 12 مرة.', 'Get a chain that stretches the piece 12 times.'),
        hint: say('Adibidez, $y=u^3$ eta $u=2$: $3\\cdot 2^2=12$.', 'Por ejemplo, $y=u^3$ con $u=2$: $3\\cdot 2^2=12$.', 'مثلًا، $y=u^3$ مع $u=2$: $3\\cdot 2^2=12$.', 'For example, $y=u^3$ with $u=2$: $3\\cdot 2^2=12$.'),
        isSolved: (state) => total(state) === 12
    }
]

function same4(formula: string) {
    return say(formula, formula, formula, formula)
}

const written = (value: number) => String(value).replace('.', '{,}')

/** Endless practice: with these two machines, find an x where the chain stretches the piece this many times */
const chainMaker: LabChallengeMaker<ChainState> = (random) => {
    const inner = INNER_MACHINES[randomInt(random, 0, INNER_MACHINES.length - 1)]
    const outer = OUTER_MACHINES[randomInt(random, 0, OUTER_MACHINES.length - 1)]
    const x = randomInt(random, CHAIN_LIMITS.x.min, CHAIN_LIMITS.x.max)
    const value = chainValues(inner, outer, x).total
    const machines = `$${INNER[inner].latex}$`
    const outside = `$${OUTER[outer].latex}$`
    const target = `$${written(value)}$`
    return {
        prompt: say(
            `${machines} eta ${outside} makinekin, bilatu katearen deribatua ${target} den $x$ bat.`,
            `Con ${machines} e ${outside}, busca un $x$ donde la derivada de la cadena sea ${target}.`,
            `مع ${machines} و${outside} ابحث عن $x$ تكون فيه مشتقة السلسلة ${target}.`,
            `With ${machines} and ${outside}, find an $x$ where the derivative of the chain is ${target}.`
        ),
        hint: say('Kanpokoaren deribatua bider barrukoarena.', 'La derivada de fuera por la de dentro.', 'مشتقة الخارجية في مشتقة الداخلية.', 'The derivative of the outside times that of the inside.'),
        isSolved: (state) => state.inner === inner && state.outer === outer && Math.abs(total(state) - value) < 1e-9,
        solution: { inner, outer, x, prediction: null }
    }
}

export const chainExtra = freshFrom(initialChainState, chainMaker)
