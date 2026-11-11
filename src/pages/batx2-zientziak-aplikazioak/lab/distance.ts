import { randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import { say } from '../../batx1-zientziak-funtzioak/text.ts'
import { compareTo, freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'

/* ==========================================================================
   L4 · Kurba baterainoko distantzia minimoa (La distancia mínima a una
   curva): a fixed point P and a curve; the learner steps the point Q
   along the curve and, after the prediction, sees the segment PQ, the
   tangent at Q and the graph of d(x) under the plane. At the closest
   point PQ is perpendicular to the tangent (it lies on the normal) and
   d(x) is lowest. Before drawing, the learner predicts whether the
   closest point is to the left of P (<), straight above or below it (=)
   or to its right (>).
   ========================================================================== */

export type DistanceCurve = 'parabola' | 'root' | 'hyperbola' | 'line' | 'valley'

export const DISTANCE_CURVES: DistanceCurve[] = ['parabola', 'root', 'hyperbola', 'line', 'valley']

interface DistanceSetup {
    f: (x: number) => number
    derivative: (x: number) => number
    latex: string
    P: [number, number]
    pLatex: string
    pLatexAr: string
    /** The abscissas Q steps through, and the closest one */
    xs: number[]
    best: number
    view: { xMin: number; xMax: number; yMin: number; yMax: number }
}

const range = (from: number, to: number, step: number) => Array.from({ length: Math.round((to - from) / step) + 1 }, (_, i) => Math.round((from + i * step) * 1000) / 1000)

export const DISTANCE_SETUP: Record<DistanceCurve, DistanceSetup> = {
    parabola: { f: (x) => x * x, derivative: (x) => 2 * x, latex: 'y=x^2', P: [3, 0], pLatex: 'P(3,\\,0)', pLatexAr: 'P(3,\\,0)', xs: range(-1, 2, 0.25), best: 1, view: { xMin: -1.5, xMax: 3.5, yMin: -0.8, yMax: 4.2 } },
    root: { f: Math.sqrt, derivative: (x) => 1 / (2 * Math.sqrt(x)), latex: 'y=\\sqrt{x}', P: [4.5, 0], pLatex: 'P\\left(\\frac{9}{2},\\,0\\right)', pLatexAr: 'P\\left(\\frac{9}{2},\\,0\\right)', xs: range(0.5, 6.5, 0.5), best: 4, view: { xMin: -0.5, xMax: 7, yMin: -0.8, yMax: 3.5 } },
    hyperbola: { f: (x) => 1 / x, derivative: (x) => -1 / (x * x), latex: 'y=\\frac{1}{x}', P: [0, 0], pLatex: 'O(0,\\,0)', pLatexAr: 'O(0,\\,0)', xs: range(0.5, 3, 0.25), best: 1, view: { xMin: -0.6, xMax: 3.4, yMin: -0.6, yMax: 3.4 } },
    line: { f: (x) => x + 1, derivative: () => 1, latex: 'y=x+1', P: [-2, 3], pLatex: 'P(-2,\\,3)', pLatexAr: 'P(-2,\\,3)', xs: range(-3, 2, 0.5), best: 0, view: { xMin: -3.5, xMax: 2.5, yMin: -2.4, yMax: 3.6 } },
    valley: { f: (x) => x * x, derivative: (x) => 2 * x, latex: 'y=x^2', P: [0, -1], pLatex: 'P(0,\\,-1)', pLatexAr: 'P(0,\\,-1)', xs: range(-2, 2, 0.25), best: 0, view: { xMin: -2.4, xMax: 2.4, yMin: -1.6, yMax: 4.2 } }
}

export interface DistanceState {
    curve: DistanceCurve
    /** The index of the abscissa of Q */
    k: number
    prediction: Prediction | null
}

export const initialDistanceState: DistanceState = { curve: 'parabola', k: 0, prediction: null }

export function setDistance(state: DistanceState, patch: Partial<Omit<DistanceState, 'prediction'>>): DistanceState {
    const curve = patch.curve ?? state.curve
    if (curve !== state.curve) return { curve, k: 0, prediction: null }
    const last = DISTANCE_SETUP[curve].xs.length - 1
    return { curve, k: Math.min(last, Math.max(0, Math.round(patch.k ?? state.k))), prediction: state.prediction }
}

/** The square of the distance from P to (x, f(x)) */
export function squaredDistance(curve: DistanceCurve, x: number): number {
    const setup = DISTANCE_SETUP[curve]
    return (x - setup.P[0]) ** 2 + (setup.f(x) - setup.P[1]) ** 2
}

export interface DistanceReading {
    x: number
    y: number
    D: number
    d: number
    /** Whether PQ is perpendicular to the tangent at Q */
    perpendicular: boolean
    /** Whether Q is the closest point of the list */
    closest: boolean
}

export function distanceReading(state: Pick<DistanceState, 'curve' | 'k'>): DistanceReading {
    const setup = DISTANCE_SETUP[state.curve]
    const x = setup.xs[state.k]
    const y = setup.f(x)
    const D = squaredDistance(state.curve, x)
    // PQ · (1, f′(x)) = 0 when PQ is perpendicular to the tangent
    const dot = (x - setup.P[0]) + (y - setup.P[1]) * setup.derivative(x)
    return { x, y, D, d: Math.sqrt(D), perpendicular: Math.abs(dot) < 1e-9, closest: setup.xs.every((other) => squaredDistance(state.curve, other) >= D - 1e-12) }
}

/** Where is the closest point, compared with the abscissa of P? */
export const distancePrediction = (state: Pick<DistanceState, 'curve'>): Prediction => compareTo(DISTANCE_SETUP[state.curve].best, DISTANCE_SETUP[state.curve].P[0])

const closestOn = (curve: DistanceCurve) => (state: DistanceState) => state.curve === curve && distanceReading(state).closest

export const distanceChallenges: LabChallenge<DistanceState>[] = [
    {
        id: 124351,
        prompt: say('$y=x^2$ eta $P(3,\\,0)$ direla, eraman $Q$ puntu hurbilenera.', 'Con $y=x^2$ y $P(3,\\,0)$, lleva $Q$ al punto más cercano.', 'مع $y=x^2$ و$P(3,\\,0)$، انقل $Q$ إلى أقرب نقطة.', 'With $y=x^2$ and $P(3,\\,0)$, take $Q$ to the closest point.'),
        hint: say('Begiratu $d(x)$ grafikoaren punturik baxuena.', 'Mira el punto más bajo de la gráfica de $d(x)$.', 'انظر إلى أدنى نقطة في رسم $d(x)$.', 'Look at the lowest point of the graph of $d(x)$.'),
        isSolved: closestOn('parabola')
    },
    {
        id: 124352,
        prompt: say('$y=\\sqrt{x}$ eta $P\\left(\\frac{9}{2},\\,0\\right)$ direla, eraman $Q$ puntu hurbilenera.', 'Con $y=\\sqrt{x}$ y $P\\left(\\frac{9}{2},\\,0\\right)$, lleva $Q$ al punto más cercano.', 'مع $y=\\sqrt{x}$ و$P\\left(\\frac{9}{2},\\,0\\right)$، انقل $Q$ إلى أقرب نقطة.', 'With $y=\\sqrt{x}$ and $P\\left(\\frac{9}{2},\\,0\\right)$, take $Q$ to the closest point.'),
        hint: same('$D(x)=x^2-8x+\\frac{81}{4}$'),
        isSolved: closestOn('root')
    },
    {
        id: 124353,
        prompt: say('Aurkitu puntu hurbilena $P$ puntuaren bertikal berean duen kurba, eta eraman $Q$ hara.', 'Encuentra la curva cuyo punto más cercano está en la misma vertical que $P$, y lleva $Q$ allí.', 'جد المنحنى الذي تقع أقرب نقطة منه على الخط الرأسي نفسه مع $P$، وانقل $Q$ إليها.', 'Find the curve whose closest point is straight above or below $P$, and take $Q$ there.'),
        hint: say('$P$ puntua kurbaren simetria-ardatzean dago.', '$P$ está en el eje de simetría de la curva.', 'تقع $P$ على محور تناظر المنحنى.', '$P$ is on the axis of symmetry of the curve.'),
        isSolved: closestOn('valley')
    },
    {
        id: 124354,
        prompt: say('$y=\\frac{1}{x}$ kurbarekin, aurkitu jatorritik hurbilen dagoen puntua.', 'Con $y=\\frac{1}{x}$, encuentra el punto más cercano al origen.', 'مع $y=\\frac{1}{x}$، جد أقرب نقطة إلى الأصل.', 'With $y=\\frac{1}{x}$, find the point closest to the origin.'),
        hint: same('$D(x)=x^2+\\frac{1}{x^2}$'),
        isSolved: closestOn('hyperbola')
    },
    {
        id: 124355,
        prompt: say('$y=x+1$ zuzenarekin, jarri $Q$ puntua $PQ$ zuzenarekiko perpendikularra den tokian.', 'Con la recta $y=x+1$, coloca $Q$ donde $PQ$ es perpendicular a la recta.', 'مع المستقيم $y=x+1$، ضع $Q$ حيث تكون $PQ$ عمودية على المستقيم.', 'With the line $y=x+1$, put $Q$ where $PQ$ is perpendicular to the line.'),
        hint: say('Malden biderkadura $-1$ da.', 'El producto de las pendientes es $-1$.', 'جداء الميلين $-1$.', 'The product of the slopes is $-1$.'),
        isSolved: (state) => state.curve === 'line' && distanceReading(state).perpendicular
    }
]

function same(text: string) {
    return say(text, text, text, text)
}

/** A value of D for a prompt: integers and quarters, with the decimal mark of each language */
function valueLatex(value: number, arabic: boolean): string | null {
    const quarters = Math.round(value * 4)
    if (Math.abs(quarters / 4 - value) > 1e-9) return null
    const text = String(quarters / 4)
    return arabic ? text : text.replace('.', '{,}')
}

/** Endless practice: put Q where the square of the distance has a given value */
const distanceMaker: LabChallengeMaker<DistanceState> = (random) => {
    for (;;) {
        const curve = DISTANCE_CURVES[randomInt(random, 0, DISTANCE_CURVES.length - 1)]
        const setup = DISTANCE_SETUP[curve]
        const k = randomInt(random, 0, setup.xs.length - 1)
        const D = squaredDistance(curve, setup.xs[k])
        const latex = valueLatex(D, false)
        const latexAr = valueLatex(D, true)
        if (latex === null || latexAr === null || D > 40) continue
        const curveLatex = `$${setup.latex}$`
        const point = `$${setup.pLatex}$`
        return {
            prompt: say(`${curveLatex} eta ${point} direla, jarri $Q$ puntua $D=d^2=${latex}$ den tokian.`, `Con ${curveLatex} y ${point}, coloca $Q$ donde $D=d^2=${latex}$.`, `مع ${curveLatex} و$${setup.pLatexAr}$، ضع $Q$ حيث $D=d^2=${latexAr}$.`, `With ${curveLatex} and ${point}, put $Q$ where $D=d^2=${latex}$.`),
            hint: say('Irakurri $D$ irakurgailuan, $Q$ mugitu ahala.', 'Lee $D$ en el marcador mientras mueves $Q$.', 'اقرأ $D$ في العدّاد وأنت تحرّك $Q$.', 'Read $D$ in the readout as you move $Q$.'),
            isSolved: (state) => state.curve === curve && Math.abs(distanceReading(state).D - D) < 1e-9,
            solution: { curve, k, prediction: null }
        }
    }
}

export const distanceExtra = freshFrom(initialDistanceState, distanceMaker)
