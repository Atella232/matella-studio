import { randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { say } from '../../batx1-zientziak-funtzioak/text.ts'
import { freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'

/* ==========================================================================
   L1 · Kurba eta haren asintota (La curva y su asíntota): a curve with
   an oblique or horizontal asymptote and a point x₀ that the learner
   steps along a list, from close to the origin out to ±20. The board
   follows x₀ (it zooms out as x₀ grows) and shades the gap between the
   curve and its asymptote: one colour where the curve is above, another
   where it is below. The readout gives the difference f(x₀) − (mx₀ + n).
   Before drawing, the learner predicts how the curve runs for x > 0:
   always below (<), crossing the asymptote (=) or always above (>).
   ========================================================================== */

export type AsymptoteCurve = 'g1' | 'g2' | 'g3' | 'g4' | 'g5'

export const ASYMPTOTE_CURVES: AsymptoteCurve[] = ['g1', 'g2', 'g3', 'g4', 'g5']

interface AsymptoteSetup {
    f: (x: number) => number
    latex: string
    /** The asymptote y = mx + n on the right and on the left */
    right: [number, number]
    left: [number, number]
    /** The difference f(x) − (mx + n), as the learner reads it */
    differenceLatex: string
    /** The values x₀ steps through */
    xs: number[]
    start: number
    /** The difference at x = p/q as a fraction [numerator, denominator], when it is rational */
    exact?: (p: number, q: number) => [number, number]
}

const NEAR = [-20, -10, -5, -2, -1, -0.5, 0.5, 1, 2, 5, 10, 20]
const ALL = [-20, -10, -5, -2, -1, 0, 1, 2, 5, 10, 20]

export const ASYMPTOTE_SETUP: Record<AsymptoteCurve, AsymptoteSetup> = {
    g1: { f: (x) => (x * x + 1) / x, latex: '\\frac{x^2+1}{x}', right: [1, 0], left: [1, 0], differenceLatex: '\\frac{1}{x}', xs: NEAR, start: 8, exact: (p, q) => [q, p] },
    g2: { f: (x) => (x * x - 2) / x, latex: '\\frac{x^2-2}{x}', right: [1, 0], left: [1, 0], differenceLatex: '-\\frac{2}{x}', xs: NEAR, start: 8, exact: (p, q) => [-2 * q, p] },
    g3: { f: (x) => (x - 2) / (x * x + 1), latex: '\\frac{x-2}{x^2+1}', right: [0, 0], left: [0, 0], differenceLatex: '\\frac{x-2}{x^2+1}', xs: ALL, start: 7, exact: (p, q) => [q * (p - 2 * q), p * p + q * q] },
    g4: { f: (x) => (2 * x * x + 1) / (x * x + 1), latex: '\\frac{2x^2+1}{x^2+1}', right: [0, 2], left: [0, 2], differenceLatex: '-\\frac{1}{x^2+1}', xs: ALL, start: 7, exact: (p, q) => [-q * q, p * p + q * q] },
    g5: { f: (x) => Math.sqrt(x * x + 4), latex: '\\sqrt{x^2+4}', right: [1, 0], left: [-1, 0], differenceLatex: '\\sqrt{x^2+4}-|x|', xs: ALL, start: 7 }
}

export interface AsymptoteState {
    curve: AsymptoteCurve
    /** The index of x₀ in the list of the curve */
    x: number
    prediction: Prediction | null
}

export const initialAsymptoteState: AsymptoteState = { curve: 'g1', x: ASYMPTOTE_SETUP.g1.start, prediction: null }

/** A new curve starts at its own x₀ and asks for a new prediction */
export function setAsymptote(state: AsymptoteState, patch: Partial<Omit<AsymptoteState, 'prediction'>>): AsymptoteState {
    const curve = patch.curve ?? state.curve
    const setup = ASYMPTOTE_SETUP[curve]
    if (curve !== state.curve) return { curve, x: setup.start, prediction: null }
    const x = Math.min(setup.xs.length - 1, Math.max(0, Math.round(patch.x ?? state.x)))
    return { curve, x, prediction: state.prediction }
}

/** The asymptote y = mx + n on the side of x */
export const asymptoteAt = (curve: AsymptoteCurve, x: number): [number, number] => (x < 0 ? ASYMPTOTE_SETUP[curve].left : ASYMPTOTE_SETUP[curve].right)

/** The asymptote as y = …, for the readout */
export function asymptoteLatex([m, n]: [number, number]): string {
    const slope = m === 0 ? '' : m === 1 ? 'x' : m === -1 ? '-x' : `${m}x`
    if (!slope) return `y=${n}`
    return n === 0 ? `y=${slope}` : `y=${slope}${n > 0 ? '+' : '-'}${Math.abs(n)}`
}

export interface AsymptoteReading {
    x: number
    y: number
    /** f(x₀) − (mx₀ + n) */
    difference: number
    asymptote: [number, number]
}

export function asymptoteReading(state: Pick<AsymptoteState, 'curve' | 'x'>): AsymptoteReading {
    const setup = ASYMPTOTE_SETUP[state.curve]
    const x = setup.xs[state.x]
    const y = setup.f(x)
    const asymptote = asymptoteAt(state.curve, x)
    return { x, y, difference: y - (asymptote[0] * x + asymptote[1]), asymptote }
}

/** For x > 0: always below (<), crossing (=) or always above (>) */
export function asymptotePrediction(state: Pick<AsymptoteState, 'curve'>): Prediction {
    const setup = ASYMPTOTE_SETUP[state.curve]
    let above = false
    let below = false
    for (let k = 1; k <= 2000; k++) {
        const x = k * 0.025
        const [m, n] = setup.right
        const d = setup.f(x) - (m * x + n)
        if (d > 1e-12) above = true
        if (d < -1e-12) below = true
    }
    return above && below ? '=' : above ? '>' : '<'
}

const gcd = (a: number, b: number): number => (b === 0 ? Math.abs(a) : gcd(b, a % b))

/** A fraction in lowest terms with a positive denominator */
function lowest([numerator, denominator]: [number, number]): [number, number] {
    const sign = denominator < 0 ? -1 : 1
    const g = gcd(numerator, denominator) || 1
    return [(sign * numerator) / g, (sign * denominator) / g]
}

/** A fraction as LaTeX: −\frac{1}{2}, 3 */
export function fractionLatex([numerator, denominator]: [number, number]): string {
    if (denominator === 1) return String(numerator)
    return `${numerator < 0 ? '-' : ''}\\frac{${Math.abs(numerator)}}{${denominator}}`
}

/** The exact difference at the x of the list with that index, when it is rational */
export function exactDifference(curve: AsymptoteCurve, index: number): [number, number] | null {
    const setup = ASYMPTOTE_SETUP[curve]
    if (!setup.exact) return null
    const x = setup.xs[index]
    const q = Number.isInteger(x) ? 1 : 2
    return lowest(setup.exact(Math.round(x * q), q))
}

const named = (curve: AsymptoteCurve) => `$f(x)=${ASYMPTOTE_SETUP[curve].latex}$`
const at = (curve: AsymptoteCurve, value: number) => ASYMPTOTE_SETUP[curve].xs.findIndex((x) => Math.abs(x - value) < 1e-9)

export const asymptoteChallenges: LabChallenge<AsymptoteState>[] = [
    {
        id: 125101,
        prompt: say(`${named('g1')} funtzioarekin, bilatu kurba $y=x$ zuzenaren gainetik $0{,}1$ doan $x$ bat.`, `Con ${named('g1')}, busca un $x$ en el que la curva vaya $0{,}1$ por encima de $y=x$.`, `مع ${named('g1')}، ابحث عن $x$ يكون فيه المنحنى أعلى من $y=x$ بمقدار $0{,}1$.`, `With ${named('g1')}, find an $x$ where the curve runs $0{,}1$ above $y=x$.`),
        hint: say('Kendura $\\frac{1}{x}$ da.', 'La diferencia es $\\frac{1}{x}$.', 'الفرق هو $\\frac{1}{x}$.', 'The difference is $\\frac{1}{x}$.'),
        isSolved: (state) => state.curve === 'g1' && state.x === at('g1', 10)
    },
    {
        id: 125102,
        prompt: say(`${named('g2')} funtzioarekin, jarri $x$ negatibo bat. Nondik doa orain kurba?`, `Con ${named('g2')}, pon un $x$ negativo. ¿Por dónde va ahora la curva?`, `مع ${named('g2')}، ضع $x$ سالبة. أين يسير المنحنى الآن؟`, `With ${named('g2')}, set a negative $x$. Where does the curve run now?`),
        hint: say('$-\\frac{2}{x}$ kendura positiboa da $x<0$ denean.', 'La diferencia $-\\frac{2}{x}$ es positiva si $x<0$.', 'الفرق $-\\frac{2}{x}$ موجب إذا كان $x<0$.', 'The difference $-\\frac{2}{x}$ is positive if $x<0$.'),
        isSolved: (state) => state.curve === 'g2' && ASYMPTOTE_SETUP.g2.xs[state.x] < 0
    },
    {
        id: 125103,
        prompt: say(`${named('g3')} funtzioarekin, bilatu kurbak bere asintota ebakitzen duen puntua.`, `Con ${named('g3')}, busca el punto en el que la curva corta a su asíntota.`, `مع ${named('g3')}، ابحث عن النقطة التي يقطع فيها المنحنى مقاربه.`, `With ${named('g3')}, find the point where the curve crosses its asymptote.`),
        hint: say('Asintota $y=0$ da: noiz da zero zenbakitzailea?', 'La asíntota es $y=0$: ¿cuándo se anula el numerador?', 'المقارب هو $y=0$: متى ينعدم البسط؟', 'The asymptote is $y=0$: when is the numerator 0?'),
        isSolved: (state) => state.curve === 'g3' && state.x === at('g3', 2)
    },
    {
        id: 125104,
        prompt: say(`${named('g4')} funtzioarekin, bilatu kurba bere asintotatik urrunen dagoen tokia.`, `Con ${named('g4')}, busca dónde está la curva más lejos de su asíntota.`, `مع ${named('g4')}، ابحث عن الموضع الذي يكون فيه المنحنى أبعد ما يمكن عن مقاربه.`, `With ${named('g4')}, find where the curve is furthest from its asymptote.`),
        hint: say('Kendura $-\\frac{1}{x^2+1}$ da: noiz da txikiena izendatzailea?', 'La diferencia es $-\\frac{1}{x^2+1}$: ¿cuándo es menor el denominador?', 'الفرق هو $-\\frac{1}{x^2+1}$: متى يكون المقام أصغر ما يمكن؟', 'The difference is $-\\frac{1}{x^2+1}$: when is the denominator smallest?'),
        isSolved: (state) => state.curve === 'g4' && state.x === at('g4', 0)
    },
    {
        id: 125105,
        prompt: say(`${named('g5')} funtzioarekin, jarri $x=-10$ eta begiratu zein asintotari jarraitzen dion kurbak.`, `Con ${named('g5')}, pon $x=-10$ y mira qué asíntota sigue la curva.`, `مع ${named('g5')}، ضع $x=-10$ وانظر أي مقارب يتبعه المنحنى.`, `With ${named('g5')}, set $x=-10$ and see which asymptote the curve follows.`),
        hint: say('Ezkerretik $\\sqrt{x^2}=|x|=-x$.', 'Por la izquierda $\\sqrt{x^2}=|x|=-x$.', 'من اليسار $\\sqrt{x^2}=|x|=-x$.', 'On the left $\\sqrt{x^2}=|x|=-x$.'),
        isSolved: (state) => state.curve === 'g5' && state.x === at('g5', -10)
    }
]

/** Endless practice: an x where the difference takes a given exact value */
const asymptoteMaker: LabChallengeMaker<AsymptoteState> = (random) => {
    const options: Array<{ curve: AsymptoteCurve; value: [number, number]; index: number }> = []
    for (const curve of ['g1', 'g2', 'g3', 'g4'] as const) {
        const seen = new Set<string>()
        ASYMPTOTE_SETUP[curve].xs.forEach((_, index) => {
            const value = exactDifference(curve, index)!
            const key = value.join('/')
            if (value[0] === 0 || seen.has(key)) return
            seen.add(key)
            options.push({ curve, value, index })
        })
    }
    const chosen = options[randomInt(random, 0, options.length - 1)]
    const { curve, value, index } = chosen
    const target = value[0] / value[1]
    const d = `$${fractionLatex(value)}$`
    const difference = `$${ASYMPTOTE_SETUP[curve].differenceLatex}$`
    const prompt: LocalizedText = say(
        `${named(curve)} funtzioarekin, bilatu asintotarekiko kendura ${d} den $x$ bat.`,
        `Con ${named(curve)}, busca un $x$ en el que la diferencia con la asíntota sea ${d}.`,
        `مع ${named(curve)}، ابحث عن $x$ يكون فيه الفرق عن المقارب ${d}.`,
        `With ${named(curve)}, find an $x$ where the difference from the asymptote is ${d}.`
    )
    return {
        prompt,
        hint: say(`Kendura ${difference} da.`, `La diferencia es ${difference}.`, `الفرق هو ${difference}.`, `The difference is ${difference}.`),
        isSolved: (state) => state.curve === curve && Math.abs(asymptoteReading(state).difference - target) < 1e-9,
        solution: { curve, x: index, prediction: null }
    }
}

export const asymptoteExtra = freshFrom(initialAsymptoteState, asymptoteMaker)
