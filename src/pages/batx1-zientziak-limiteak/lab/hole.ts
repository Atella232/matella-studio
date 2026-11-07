import { randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import { freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'
import { same, say } from '../../batx1-zientziak-funtzioak/text.ts'

/* ==========================================================================
   L2 · 0/0 zuloa (El agujero del 0/0): the learner builds
   f(x) = (x − r)(x − s) / (x − d)ᵖ with the two roots of the numerator, the
   root of the denominator and its power (1 or 2), and sees it written
   expanded, as in the exercises. Before the graph is shown the learner
   predicts what happens at x = d: k/0 and a vertical asymptote straight
   away (<), 0/0 and a hole (=), or 0/0 that after simplifying still gives
   k/0 and an asymptote (>). ▶ brings two probes to x = d from both sides.
   ========================================================================== */

export const HOLE_LIMITS = { root: { min: -3, max: 3 } } as const

export interface HoleState {
    /** The roots of the numerator */
    r: number
    s: number
    /** The root of the denominator and its power */
    d: number
    power: 1 | 2
    prediction: Prediction | null
}

export const initialHoleState: HoleState = { r: 2, s: -1, d: 1, power: 1, prediction: null }

const clampRoot = (value: number) => Math.min(HOLE_LIMITS.root.max, Math.max(HOLE_LIMITS.root.min, Math.round(value)))

export function setHole(state: HoleState, patch: Partial<Omit<HoleState, 'prediction'>>): HoleState {
    const r = clampRoot(patch.r ?? state.r)
    const s = clampRoot(patch.s ?? state.s)
    const d = clampRoot(patch.d ?? state.d)
    const power: 1 | 2 = (patch.power ?? state.power) === 2 ? 2 : 1
    const unchanged = r === state.r && s === state.s && d === state.d && power === state.power
    return { r, s, d, power, prediction: unchanged ? state.prediction : null }
}

/** How many times d is a root of the numerator */
export const multiplicity = (state: HoleState) => (state.r === state.d ? 1 : 0) + (state.s === state.d ? 1 : 0)

/** k/0 at once (<), 0/0 and a hole (=), 0/0 and still an asymptote (>) */
export function holeKind(state: HoleState): Prediction {
    const m = multiplicity(state)
    if (m === 0) return '<'
    return m >= state.power ? '=' : '>'
}

export const holePrediction = holeKind

/** f(x), or null at x = d */
export function holeValue(state: HoleState, x: number): number | null {
    if (Math.abs(x - state.d) < 1e-12) return null
    return ((x - state.r) * (x - state.s)) / (x - state.d) ** state.power
}

/** The height of the hole (the limit), when there is one */
export function holeLimit(state: HoleState): number | null {
    if (holeKind(state) !== '=') return null
    const m = multiplicity(state)
    if (state.power === 2) return 1
    if (m === 2) return 0
    return state.d - (state.r === state.d ? state.s : state.r)
}

/** The sign of f just left and just right of d where it goes to infinity: +1 or −1 for each side */
export function holeSides(state: HoleState): [number, number] | null {
    if (holeKind(state) === '=') return null
    const m = multiplicity(state)
    const rest = m === 0 ? (state.d - state.r) * (state.d - state.s) : state.d - (state.r === state.d ? state.s : state.r)
    const order = state.power - m
    const sign = Math.sign(rest)
    return order === 2 ? [sign, sign] : [-sign, sign]
}

/** a·x + b written for LaTeX after a first term: +3, -2, nothing for 0 */
const term = (coefficient: number, letter: string) => {
    if (coefficient === 0) return ''
    const size = Math.abs(coefficient) === 1 && letter ? '' : String(Math.abs(coefficient))
    return `${coefficient < 0 ? '-' : '+'}${size}${letter}`
}

/** x² + bx + c */
export const quadraticLatex = (b: number, c: number) => `x^2${term(b, 'x')}${term(c, '')}`
/** x − a, or x for a = 0 */
export const factorLatex = (a: number) => (a === 0 ? 'x' : `x${a < 0 ? '+' : '-'}${Math.abs(a)}`)

export function numeratorLatex(state: HoleState): string {
    return quadraticLatex(-(state.r + state.s), state.r * state.s)
}

export function denominatorLatex(state: HoleState): string {
    return state.power === 1 ? factorLatex(state.d) : quadraticLatex(-2 * state.d, state.d * state.d)
}

export const holeLatex = (state: HoleState) => `f(x)=\\frac{${numeratorLatex(state)}}{${denominatorLatex(state)}}`

/** What substituting x = d gives: \frac{0}{0} or \frac{k}{0} */
export function substituteLatex(state: HoleState): string {
    const top = (state.d - state.r) * (state.d - state.s)
    return `f(${state.d})\\to\\frac{${top}}{0}`
}

const kindIs = (state: HoleState, kind: Prediction) => holeKind(state) === kind

export const holeChallenges: LabChallenge<HoleState>[] = [
    {
        id: 109201,
        prompt: say('Egin $\\frac{0}{0}$ eta zulo bat $x=2$ puntuan.', 'Haz que salga $\\frac{0}{0}$ y un agujero en $x=2$.', 'اجعل $\\frac{0}{0}$ يظهر مع ثقب عند $x=2$.', 'Make $\\frac{0}{0}$ and a hole appear at $x=2$.'),
        hint: say('Izendatzailea $x-2$, eta zenbakitzailearen erro bat 2.', 'Denominador $x-2$, y una raíz del numerador en 2.', 'المقام $x-2$، وأحد جذور البسط 2.', 'Denominator $x-2$, and one root of the numerator at 2.'),
        isSolved: (state) => state.d === 2 && kindIs(state, '=')
    },
    {
        id: 109202,
        prompt: say('Eraiki zulo bat 3 altueran.', 'Construye un agujero a altura 3.', 'ابنِ ثقبًا على الارتفاع 3.', 'Build a hole at height 3.'),
        hint: same('$\\frac{(x-d)(x-s)}{x-d}=x-s\\ \\to\\ d-s$'),
        isSolved: (state) => holeLimit(state) === 3
    },
    {
        id: 109203,
        prompt: say('Lortu $\\frac{0}{0}$, baina sinplifikatu ondoren asintota bertikal bat geratzen dela.', 'Consigue $\\frac{0}{0}$, pero que al simplificar quede una asíntota vertical.', 'احصل على $\\frac{0}{0}$ لكن بحيث يبقى بعد الاختزال مقارب رأسي.', 'Get $\\frac{0}{0}$, but so that after simplifying a vertical asymptote is left.'),
        hint: say('Izendatzailea berretu: $(x-d)^2$.', 'Eleva el denominador: $(x-d)^2$.', 'ارفع المقام إلى قوة: $(x-d)^2$.', 'Raise the denominator: $(x-d)^2$.'),
        isSolved: (state) => kindIs(state, '>')
    },
    {
        id: 109204,
        prompt: say('Jarri zuloa X ardatzean.', 'Pon el agujero sobre el eje X.', 'ضع الثقب على محور X.', 'Put the hole on the x-axis.'),
        hint: say('Zenbakitzailearen bi erroak $d$ izan behar dira.', 'Las dos raíces del numerador tienen que ser $d$.', 'يجب أن يكون جذرا البسط كلاهما $d$.', 'Both roots of the numerator have to be $d$.'),
        isSolved: (state) => holeLimit(state) === 0
    },
    {
        id: 109205,
        prompt: say('Egin $x=-2$ asintota bertikala, bi aldeetan $+\\infty$ izanik.', 'Haz la asíntota vertical $x=-2$ con $+\\infty$ a los dos lados.', 'اصنع المقارب الرأسي $x=-2$ مع $+\\infty$ على الجانبين.', 'Make the vertical asymptote $x=-2$ with $+\\infty$ on both sides.'),
        hint: say('Izendatzailea $(x+2)^2$ ez da inoiz negatiboa.', 'El denominador $(x+2)^2$ nunca es negativo.', 'المقام $(x+2)^2$ ليس سالبًا أبدًا.', 'The denominator $(x+2)^2$ is never negative.'),
        isSolved: (state) => {
            const sides = holeSides(state)
            return state.d === -2 && sides !== null && sides[0] === 1 && sides[1] === 1
        }
    }
]

/** Endless practice: a hole at a given point */
const holeMaker: LabChallengeMaker<HoleState> = (random) => {
    for (;;) {
        const d = randomInt(random, -3, 3)
        const s = randomInt(random, -3, 3)
        const height = d - s
        if (s === d) continue
        const point = `$(${d},${height})$`
        return {
            prompt: say(`Eraiki zulo bat ${point} puntuan.`, `Construye un agujero en el punto ${point}.`, `ابنِ ثقبًا عند النقطة ${point}.`, `Build a hole at the point ${point}.`),
            hint: same(`$\\frac{(${factorLatex(d)})(x-s)}{${factorLatex(d)}}\\to ${d}-s=${height}$`),
            isSolved: (state) => state.d === d && holeLimit(state) === height,
            solution: { r: d, s, d, power: 1, prediction: null }
        }
    }
}

export const holeExtra = freshFrom(initialHoleState, holeMaker)
