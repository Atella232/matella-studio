import { randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import { say } from '../../batx1-zientziak-funtzioak/text.ts'
import { compareTo, freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'

/* ==========================================================================
   L3 · Kurba inplizituaren zuzen ukitzailea (La tangente a la curva
   implícita): four curves given by an equation in x and y (a circle, an
   ellipse, a hyperbola and a parabola lying on its side) and a point
   that steps along each one. The board draws the tangent at the point;
   the readout derives the equation implicitly and gives y′ there, or
   says that the tangent is vertical. Before drawing, the learner
   predicts the sign of the slope at the starting point P of the curve:
   negative (<), zero (=) or positive (>). Every point has rational
   coordinates, so every slope is an exact fraction.
   ========================================================================== */

export type ImplicitCurve = 'circle' | 'ellipse' | 'hyperbola' | 'parabola'

export const IMPLICIT_CURVES: ImplicitCurve[] = ['circle', 'ellipse', 'hyperbola', 'parabola']

/** A slope as a fraction p/q (q = 0 for a vertical tangent) */
export interface Slope {
    p: number
    q: number
}

interface CurveSetup {
    /** The equation, and its derivative with respect to x */
    latex: string
    derived: string
    /** y′ in terms of x and y */
    formula: string
    points: Array<[number, number]>
    /** The starting point P */
    start: number
    slope: (x: number, y: number) => Slope
    /** The curve as closed or open branches of points, for the board */
    branches: () => Array<Array<[number, number]>>
    view: { xMin: number; xMax: number; yMin: number; yMax: number }
}

const around = (rx: number, ry: number) => () => [Array.from({ length: 121 }, (_, i) => [rx * Math.cos((i / 120) * 2 * Math.PI), ry * Math.sin((i / 120) * 2 * Math.PI)] as [number, number])]

export const IMPLICIT_SETUP: Record<ImplicitCurve, CurveSetup> = {
    circle: {
        latex: 'x^2+y^2=25',
        derived: "2x+2y\\,y'=0",
        formula: "y'=-\\frac{x}{y}",
        points: [[5, 0], [4, 3], [3, 4], [0, 5], [-3, 4], [-4, 3], [-5, 0], [-4, -3], [-3, -4], [0, -5], [3, -4], [4, -3]],
        start: 3,
        slope: (x, y) => ({ p: -x, q: y }),
        branches: around(5, 5),
        view: { xMin: -6, xMax: 6, yMin: -6, yMax: 6 }
    },
    ellipse: {
        latex: 'x^2+2y^2=9',
        derived: "2x+4y\\,y'=0",
        formula: "y'=-\\frac{x}{2y}",
        points: [[3, 0], [1, 2], [-1, 2], [-3, 0], [-1, -2], [1, -2]],
        start: 2,
        slope: (x, y) => ({ p: -x, q: 2 * y }),
        branches: around(3, 3 / Math.SQRT2),
        view: { xMin: -4, xMax: 4, yMin: -4, yMax: 4 }
    },
    hyperbola: {
        latex: 'xy=4',
        derived: "y+x\\,y'=0",
        formula: "y'=-\\frac{y}{x}",
        points: [[-4, -1], [-2, -2], [-1, -4], [1, 4], [2, 2], [4, 1]],
        start: 4,
        slope: (x, y) => ({ p: -y, q: x }),
        branches: () => [
            Array.from({ length: 81 }, (_, i) => { const x = -6 + (i / 80) * (6 - 0.66); return [x, 4 / x] as [number, number] }),
            Array.from({ length: 81 }, (_, i) => { const x = 0.66 + (i / 80) * (6 - 0.66); return [x, 4 / x] as [number, number] })
        ],
        view: { xMin: -6, xMax: 6, yMin: -6, yMax: 6 }
    },
    parabola: {
        latex: 'y^2=4x',
        derived: "2y\\,y'=4",
        formula: "y'=\\frac{2}{y}",
        points: [[4, -4], [1, -2], [0.25, -1], [0, 0], [0.25, 1], [1, 2], [4, 4]],
        start: 5,
        slope: (_x, y) => ({ p: 2, q: y }),
        branches: () => [Array.from({ length: 121 }, (_, i) => { const y = -5 + (i / 120) * 10; return [(y * y) / 4, y] as [number, number] })],
        view: { xMin: -2, xMax: 6, yMin: -5, yMax: 5 }
    }
}

export interface ImplicitState {
    curve: ImplicitCurve
    /** The index of the point on the curve */
    k: number
    prediction: Prediction | null
}

export const initialImplicitState: ImplicitState = { curve: 'circle', k: IMPLICIT_SETUP.circle.start, prediction: null }

/** A new curve starts at its point P and asks for a new prediction */
export function setImplicit(state: ImplicitState, patch: Partial<Omit<ImplicitState, 'prediction'>>): ImplicitState {
    const curve = patch.curve ?? state.curve
    if (curve !== state.curve) return { curve, k: IMPLICIT_SETUP[curve].start, prediction: null }
    const last = IMPLICIT_SETUP[curve].points.length - 1
    return { curve, k: Math.min(last, Math.max(0, Math.round(patch.k ?? state.k))), prediction: state.prediction }
}

export const implicitPoint = (state: Pick<ImplicitState, 'curve' | 'k'>) => IMPLICIT_SETUP[state.curve].points[state.k]

/** The slope at the point, as a fraction in lowest terms with a positive denominator (q = 0: vertical) */
export function implicitSlope(state: Pick<ImplicitState, 'curve' | 'k'>): Slope {
    const [x, y] = implicitPoint(state)
    let { p, q } = IMPLICIT_SETUP[state.curve].slope(x, y)
    if (Math.abs(q) < 1e-12) return { p: 1, q: 0 }
    // the quarter coordinates of the parabola: scale to whole numbers
    while (!Number.isInteger(p) || !Number.isInteger(q)) { p *= 4; q *= 4 }
    if (q < 0) { p = -p; q = -q }
    const gcd = (m: number, n: number): number => (n === 0 ? Math.abs(m) : gcd(n, m % n))
    const g = gcd(p, q) || 1
    return { p: p / g, q: q / g }
}

export const slopeValue = (slope: Slope) => (slope.q === 0 ? Infinity : slope.p / slope.q)

/** The slope in LaTeX: −3/4 as -\frac{3}{4}, 2 as 2 */
export function slopeLatex(slope: Slope): string {
    if (slope.q === 0) return '\\infty'
    if (slope.q === 1) return String(slope.p)
    return `${slope.p < 0 ? '-' : ''}\\frac{${Math.abs(slope.p)}}{${slope.q}}`
}

/** The sign of the slope at the starting point P */
export function implicitPrediction(state: Pick<ImplicitState, 'curve'>): Prediction {
    return compareTo(slopeValue(implicitSlope({ curve: state.curve, k: IMPLICIT_SETUP[state.curve].start })), 0)
}

const slopeIs = (curve: ImplicitCurve, p: number, q: number) => (state: ImplicitState) => {
    if (state.curve !== curve) return false
    const slope = implicitSlope(state)
    return slope.q === q && slope.p === p
}

export const implicitChallenges: LabChallenge<ImplicitState>[] = [
    {
        id: 123301,
        prompt: say('Zirkunferentzian, aurkitu zuzen ukitzaileak $\\frac{3}{4}$ malda duen puntu bat.', 'En la circunferencia, encuentra un punto con tangente de pendiente $\\frac{3}{4}$.', 'على الدائرة، جد نقطة ميل مماسها $\\frac{3}{4}$.', 'On the circle, find a point whose tangent has slope $\\frac{3}{4}$.'),
        hint: say('$-\\frac{x}{y}=\\frac{3}{4}$: $x$ eta $y$ zeinu desberdinekoak.', '$-\\frac{x}{y}=\\frac{3}{4}$: $x$ e $y$ de signos distintos.', '$-\\frac{x}{y}=\\frac{3}{4}$: إشارتا $x$ و$y$ مختلفتان.', '$-\\frac{x}{y}=\\frac{3}{4}$: $x$ and $y$ with different signs.'),
        isSolved: slopeIs('circle', 3, 4)
    },
    {
        id: 123302,
        prompt: say('Zirkunferentzian, aurkitu zuzen ukitzaile bertikala duen puntu bat.', 'En la circunferencia, encuentra un punto con tangente vertical.', 'على الدائرة، جد نقطة مماسها عمودي.', 'On the circle, find a point with a vertical tangent.'),
        hint: say('$y\'$ ez da existitzen $y=0$ denean.', '$y\'$ no existe cuando $y=0$.', '$y\'$ غير موجودة عندما $y=0$.', '$y\'$ does not exist when $y=0$.'),
        isSolved: (state) => state.curve === 'circle' && implicitSlope(state).q === 0
    },
    {
        id: 123303,
        prompt: say('Elipsean, aurkitu $-\\frac{1}{4}$ malda duen puntu bat.', 'En la elipse, encuentra un punto con pendiente $-\\frac{1}{4}$.', 'على القطع الناقص، جد نقطة ميلها $-\\frac{1}{4}$.', 'On the ellipse, find a point with slope $-\\frac{1}{4}$.'),
        hint: say('$-\\frac{x}{2y}=-\\frac{1}{4}$ betetzen da $x$ eta $y$ zeinu berekoak direnean.', '$-\\frac{x}{2y}=-\\frac{1}{4}$ con $x$ e $y$ del mismo signo.', '$-\\frac{x}{2y}=-\\frac{1}{4}$ مع $x$ و$y$ بالإشارة نفسها.', '$-\\frac{x}{2y}=-\\frac{1}{4}$ with $x$ and $y$ of the same sign.'),
        isSolved: slopeIs('ellipse', -1, 4)
    },
    {
        id: 123304,
        prompt: say('$xy=4$ hiperbolan, aurkitu $-4$ malda duen puntu bat.', 'En la hipérbola $xy=4$, encuentra un punto con pendiente $-4$.', 'على القطع الزائد $xy=4$، جد نقطة ميلها $-4$.', 'On the hyperbola $xy=4$, find a point with slope $-4$.'),
        hint: say('$-\\frac{y}{x}=-\\frac{4}{x^2}$: $x^2=1$.', '$-\\frac{y}{x}=-\\frac{4}{x^2}$: $x^2=1$.', '$-\\frac{y}{x}=-\\frac{4}{x^2}$: $x^2=1$.', '$-\\frac{y}{x}=-\\frac{4}{x^2}$: $x^2=1$.'),
        isSolved: slopeIs('hyperbola', -4, 1)
    },
    {
        id: 123305,
        prompt: say('$y^2=4x$ parabolan, aurkitu $-1$ malda duen puntua.', 'En la parábola $y^2=4x$, encuentra el punto con pendiente $-1$.', 'على القطع المكافئ $y^2=4x$، جد النقطة التي ميلها $-1$.', 'On the parabola $y^2=4x$, find the point with slope $-1$.'),
        hint: same2('$\\frac{2}{y}=-1$'),
        isSolved: slopeIs('parabola', -1, 1)
    }
]

function same2(text: string) {
    return say(text, text, text, text)
}

const NAMES: Record<ImplicitCurve, ReturnType<typeof say>> = {
    circle: say('zirkunferentzian', 'la circunferencia', 'الدائرة', 'the circle'),
    ellipse: say('elipsean', 'la elipse', 'القطع الناقص', 'the ellipse'),
    hyperbola: say('hiperbolan', 'la hipérbola', 'القطع الزائد', 'the hyperbola'),
    parabola: say('parabolan', 'la parábola', 'القطع المكافئ', 'the parabola')
}

/** Endless practice: find a point with a given slope (never the slope at the start of the circle) */
const implicitMaker: LabChallengeMaker<ImplicitState> = (random) => {
    for (;;) {
        const curve = IMPLICIT_CURVES[randomInt(random, 0, IMPLICIT_CURVES.length - 1)]
        const k = randomInt(random, 0, IMPLICIT_SETUP[curve].points.length - 1)
        const slope = implicitSlope({ curve, k })
        if (slope.q === 0 || k === IMPLICIT_SETUP[curve].start) continue
        const m = `$${slopeLatex(slope)}$`
        const isSolved = slopeIs(curve, slope.p, slope.q)
        const name = NAMES[curve]
        return {
            prompt: say(`${name.eu.charAt(0).toUpperCase()}${name.eu.slice(1)}, aurkitu ${m} malda duen puntu bat.`, `En ${name.es}, encuentra un punto con pendiente ${m}.`, `على ${name.ar}، جد نقطة ميلها ${m}.`, `On ${name.en}, find a point with slope ${m}.`),
            hint: same2(`$${IMPLICIT_SETUP[curve].formula}$`),
            isSolved,
            solution: { curve, k, prediction: null }
        }
    }
}

export const implicitExtra = freshFrom(initialImplicitState, implicitMaker)
