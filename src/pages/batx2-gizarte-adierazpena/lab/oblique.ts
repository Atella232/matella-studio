import { randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { say } from '../../batx1-zientziak-funtzioak/text.ts'
import { freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'

/* ==========================================================================
   L2 · Zatiketak ematen du zeiharra (La división da la oblicua): three
   fractions whose top degree is one more than the bottom one. The readout
   shows the division f(x) = mx + n + r/(x − a); the board draws the curve,
   the oblique asymptote and, at the chosen x₀, the gap r/(x₀ − a) between
   them. Before drawing, the learner predicts whether, for large x, the
   curve runs below (<), on (=) or above (>) the line: the sign of r.
   ========================================================================== */

export type ObliqueCurve = 'o1' | 'o2' | 'o3'

export const OBLIQUE_CURVES: ObliqueCurve[] = ['o1', 'o2', 'o3']

/** The points x₀ the learner steps along */
export const X0S = [3, 4, 5, 6, 7]

export interface ObliqueState {
    curve: ObliqueCurve
    /** Index in X0S */
    step: number
    prediction: Prediction | null
}

export const initialObliqueState: ObliqueState = { curve: 'o1', step: 0, prediction: null }

interface ObliqueSetup {
    /** f(x) = mx + n + r/(x − a) */
    m: number
    n: number
    r: number
    a: number
    latex: string
    division: string
}

export const OBLIQUE_SETUP: Record<ObliqueCurve, ObliqueSetup> = {
    o1: { m: 1, n: 0, r: 4, a: 0, latex: 'f(x)=\\frac{x^2+4}{x}', division: 'x+\\frac{4}{x}' },
    o2: { m: 1, n: -2, r: -2, a: 1, latex: 'f(x)=\\frac{x^2-3x}{x-1}', division: 'x-2-\\frac{2}{x-1}' },
    o3: { m: 1, n: 2, r: 0, a: 2, latex: 'f(x)=\\frac{x^2-4}{x-2}', division: 'x+2' }
}

export function setOblique(state: ObliqueState, patch: Partial<Omit<ObliqueState, 'prediction'>>): ObliqueState {
    const curve = patch.curve ?? state.curve
    const step = Math.min(X0S.length - 1, Math.max(0, Math.round(patch.step ?? state.step)))
    return { curve, step, prediction: curve === state.curve ? state.prediction : null }
}

export const obliqueF = (curve: ObliqueCurve, x: number) => {
    const { m, n, r, a } = OBLIQUE_SETUP[curve]
    return m * x + n + r / (x - a)
}
export const asymptoteAt = (curve: ObliqueCurve, x: number) => OBLIQUE_SETUP[curve].m * x + OBLIQUE_SETUP[curve].n
/** The gap f(x₀) − (mx₀ + n) = r/(x₀ − a) */
export const gapOf = (state: Pick<ObliqueState, 'curve' | 'step'>) => {
    const { r, a } = OBLIQUE_SETUP[state.curve]
    return r / (X0S[state.step] - a)
}

/** For large x the curve runs below (<), on (=) or above (>) the line */
export const obliquePrediction = (state: Pick<ObliqueState, 'curve'>): Prediction => {
    const { r } = OBLIQUE_SETUP[state.curve]
    return r === 0 ? '=' : r < 0 ? '<' : '>'
}

/** The gap as a fraction in LaTeX */
export function gapLatex(state: Pick<ObliqueState, 'curve' | 'step'>): string {
    const { r, a } = OBLIQUE_SETUP[state.curve]
    if (r === 0) return '0'
    const q = X0S[state.step] - a
    const g = gcd(Math.abs(r), q)
    const [p, d] = [r / g, q / g]
    return d === 1 ? String(p) : `${p < 0 ? '-' : ''}\\frac{${Math.abs(p)}}{${d}}`
}
const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b))

const same = (text: string) => say(text, text, text, text)
const at = (curve: ObliqueCurve, x: number) => (state: ObliqueState) => state.curve === curve && X0S[state.step] === x

export const obliqueChallenges: LabChallenge<ObliqueState>[] = [
    {
        id: 148101,
        prompt: say('Lehen kurban, bilatu tartea 1 den $x_0$.', 'En la primera curva, busca el $x_0$ en el que la distancia es 1.', 'في المنحنى الأول، ابحث عن $x_0$ الذي تكون فيه المسافة 1.', 'On the first curve, find the $x_0$ where the gap is 1.'),
        hint: same('$\\frac{4}{x_0}=1$'),
        isSolved: at('o1', 4)
    },
    {
        id: 148102,
        prompt: say('Bigarren kurban, bilatu tartea $-1$ den $x_0$.', 'En la segunda curva, busca el $x_0$ en el que la distancia es $-1$.', 'في المنحنى الثاني، ابحث عن $x_0$ الذي تكون فيه المسافة $-1$.', 'On the second curve, find the $x_0$ where the gap is $-1$.'),
        hint: same('$-\\frac{2}{x_0-1}=-1$'),
        isSolved: at('o2', 3)
    },
    {
        id: 148103,
        prompt: say('Lehen kurban, bilatu tartea 1 baino txikiagoa den lehen $x_0$.', 'En la primera curva, busca el primer $x_0$ en el que la distancia es menor que 1.', 'في المنحنى الأول، ابحث عن أول $x_0$ تكون فيه المسافة أقل من 1.', 'On the first curve, find the first $x_0$ where the gap is less than 1.'),
        hint: same('$\\frac{4}{x_0}<1$'),
        isSolved: at('o1', 5)
    },
    {
        id: 148104,
        prompt: say('Bilatu kurba eta asintota bat egiten diren kurba.', 'Busca la curva que coincide con su asíntota.', 'ابحث عن المنحنى الذي ينطبق على مقاربه.', 'Find the curve that coincides with its asymptote.'),
        hint: say('Hondarra zero.', 'Resto cero.', 'الباقي صفر.', 'Remainder zero.'),
        isSolved: (state) => state.curve === 'o3'
    },
    {
        id: 148105,
        prompt: say('Bigarren kurban, bilatu kurba asintotatik hurbilen dagoen $x_0$.', 'En la segunda curva, busca el $x_0$ en el que la curva está más cerca de la asíntota.', 'في المنحنى الثاني، ابحث عن $x_0$ الذي يكون فيه المنحنى أقرب إلى المقارب.', 'On the second curve, find the $x_0$ where the curve is closest to the asymptote.'),
        hint: same('$\\left|\\frac{2}{x_0-1}\\right|$'),
        isSolved: at('o2', 7)
    }
]

const NAMES: Record<'o1' | 'o2', LocalizedText> = {
    o1: say('Lehen kurban', 'En la primera curva', 'في المنحنى الأول', 'On the first curve'),
    o2: say('Bigarren kurban', 'En la segunda curva', 'في المنحنى الثاني', 'On the second curve')
}

/** Endless practice: set the x₀ with a given gap */
const obliqueMaker: LabChallengeMaker<ObliqueState> = (random) => {
    const curve = randomInt(random, 0, 1) === 0 ? 'o1' : 'o2'
    const step = randomInt(random, 0, X0S.length - 1)
    const shown = gapLatex({ curve, step })
    const name = NAMES[curve]
    return {
        prompt: say(`${name.eu}, bilatu tartea $${shown}$ den $x_0$.`, `${name.es}, busca el $x_0$ en el que la distancia es $${shown}$.`, `${name.ar}، ابحث عن $x_0$ الذي تكون فيه المسافة $${shown}$.`, `${name.en}, find the $x_0$ where the gap is $${shown}$.`),
        hint: same(`$f(x)=${OBLIQUE_SETUP[curve].division}$`),
        isSolved: (state) => state.curve === curve && state.step === step,
        solution: { curve, step, prediction: null }
    }
}

export const obliqueExtra = freshFrom(initialObliqueState, obliqueMaker)
