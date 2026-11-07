import { randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { compareTo, freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'

/* ==========================================================================
   L3 · Eszentrikotasuna (La excentricidad): one focus F at the origin, a
   directrix x = L/e and the points P with d(P, F) = e · d(P, directrix).
   In polar form r = L / (1 + e·cos θ), with L = 2: e = 0 gives a circle,
   0 < e < 1 an ellipse, e = 1 a parabola and e > 1 a hyperbola (the
   branch round the focus). The learner moves e in quarters and the point
   P by its angle θ (every 30°), predicts which conic comes out, and ▶
   draws it. Pure logic.
   ========================================================================== */

/** The semi-latus rectum: the distance from F to the curve straight above it */
export const SEMI_LATUS = 2
/** e = k / 4, k = 0 … 8 */
export const QUARTERS = 8

export interface EccentricityState {
    /** e = k / 4 */
    k: number
    /** The angle of P seen from F, in degrees, a multiple of 30 */
    angle: number
    prediction: Prediction | null
}

export const initialEccentricityState: EccentricityState = { k: 3, angle: 90, prediction: null }

export const eOf = ({ k }: Pick<EccentricityState, 'k'>) => k / 4

const cosOf = (angle: number) => Math.cos((angle * Math.PI) / 180)

/** The point exists when 1 + e·cos θ > 0 */
export const validAngle = (k: number, angle: number) => 1 + (k / 4) * cosOf(angle) > 1e-9

/** The angles P can take: −150° … 180° when the curve is closed; a symmetric range around 0° otherwise */
export function angleRange(k: number): { min: number; max: number } {
    if (validAngle(k, 180)) return { min: -150, max: 180 }
    let max = 0
    while (validAngle(k, max + 30)) max += 30
    return { min: -max, max }
}

export function setEccentricity(state: EccentricityState, patch: Partial<Omit<EccentricityState, 'prediction'>>): EccentricityState {
    const k = patch.k === undefined ? state.k : Math.min(QUARTERS, Math.max(0, Math.round(patch.k)))
    const range = angleRange(k)
    const wanted = Math.round((patch.angle ?? state.angle) / 30) * 30
    const angle = Math.min(range.max, Math.max(range.min, wanted))
    const same = k === state.k && angle === state.angle
    return { k, angle, prediction: same ? state.prediction : null }
}

/** r = L / (1 + e·cos θ) */
export const radiusAt = (k: number, angle: number) => SEMI_LATUS / (1 + (k / 4) * cosOf(angle))

export function pointOf({ k, angle }: Pick<EccentricityState, 'k' | 'angle'>): [number, number] {
    const r = radiusAt(k, angle)
    return [r * cosOf(angle), r * Math.sin((angle * Math.PI) / 180)]
}

/** d(P, F) = r; d(P, directrix) = r / e (no directrix when e = 0) */
export const toFocus = (state: Pick<EccentricityState, 'k' | 'angle'>) => radiusAt(state.k, state.angle)
export const toDirectrix = (state: Pick<EccentricityState, 'k' | 'angle'>) => (state.k === 0 ? null : radiusAt(state.k, state.angle) / eOf(state))
export const directrixX = ({ k }: Pick<EccentricityState, 'k'>) => (k === 0 ? null : SEMI_LATUS / (k / 4))

/** Ellipse (e < 1, a circle when e = 0), parabola (e = 1) or hyperbola (e > 1) */
export const eccentricityPrediction = (state: EccentricityState): Prediction => compareTo(state.k, 4)

/** e = k/4 in LaTeX: 0, \frac{1}{4}, \frac{1}{2}, \frac{3}{4}, 1, \frac{5}{4}, \frac{3}{2}, \frac{7}{4}, 2 */
export function eLatex(k: number) {
    const divisor = k % 4 === 0 ? 4 : k % 2 === 0 ? 2 : 1
    const numerator = k / divisor
    const denominator = 4 / divisor
    return denominator === 1 ? String(numerator) : `\\frac{${numerator}}{${denominator}}`
}

/** The points of the curve, for drawing: the whole closed curve, or the branch round F while r stays reasonable */
export function curvePoints(k: number, steps = 180): Array<[number, number]> {
    const points: Array<[number, number]> = []
    for (let i = 0; i <= steps; i += 1) {
        const angle = -180 + (360 * i) / steps
        if (!validAngle(k, angle)) continue
        const r = radiusAt(k, angle)
        if (r > 40) continue
        points.push([r * cosOf(angle), r * Math.sin((angle * Math.PI) / 180)])
    }
    return points
}

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const same = (text: string): LocalizedText => say(text, text, text, text)

export const eccentricityChallenges: LabChallenge<EccentricityState>[] = [
    {
        id: 107301,
        prompt: say('Egin zirkunferentzia bat.', 'Haz una circunferencia.', 'ارسم دائرة.', 'Make a circle.'),
        hint: say('Zirkunferentziak $e=0$ du.', 'La circunferencia tiene $e=0$.', 'للدائرة $e=0$.', 'A circle has $e=0$.'),
        isSolved: (state) => state.k === 0
    },
    {
        id: 107302,
        prompt: say('Egin parabola bat.', 'Haz una parábola.', 'ارسم قطعًا مكافئًا.', 'Make a parabola.'),
        hint: say('Parabolak $e=1$ du: distantzia bera fokura eta zuzentzailera.', 'La parábola tiene $e=1$: la misma distancia al foco y a la directriz.', 'للقطع المكافئ $e=1$: المسافة نفسها إلى البؤرة والدليل.', 'A parabola has $e=1$: the same distance to the focus and to the directrix.'),
        isSolved: (state) => state.k === 4
    },
    {
        id: 107303,
        prompt: say('Egin elipse bat, non fokurako distantzia zuzentzailerakoaren erdia den.', 'Haz una elipse en la que la distancia al foco sea la mitad de la distancia a la directriz.', 'ارسم قطعًا ناقصًا تكون فيه المسافة إلى البؤرة نصف المسافة إلى الدليل.', 'Make an ellipse in which the distance to the focus is half the distance to the directrix.'),
        hint: same('$e=\\frac{1}{2}$'),
        isSolved: (state) => state.k === 2
    },
    {
        id: 107304,
        prompt: say('Egin hiperbola bat, $\\frac{3}{2}$ baino eszentrikotasun txikiagoarekin.', 'Haz una hipérbola con excentricidad menor que $\\frac{3}{2}$.', 'ارسم قطعًا زائدًا اختلافه المركزي أصغر من $\\frac{3}{2}$.', 'Make a hyperbola with eccentricity less than $\\frac{3}{2}$.'),
        hint: say('$1$ baino handiagoa eta $\\frac{3}{2}$ baino txikiagoa izan behar du.', 'Tiene que ser mayor que $1$ y menor que $\\frac{3}{2}$.', 'يجب أن يكون أكبر من $1$ وأصغر من $\\frac{3}{2}$.', 'It has to be greater than $1$ and less than $\\frac{3}{2}$.'),
        isSolved: (state) => state.k === 5
    },
    {
        id: 107305,
        prompt: say('$e=\\frac{1}{2}$ izanik, eraman $P$ kurban fokutik hurbilen dagoen puntura.', 'Con $e=\\frac{1}{2}$, lleva $P$ al punto de la curva más cercano al foco.', 'مع $e=\\frac{1}{2}$ انقل $P$ إلى أقرب نقطة من المنحنى إلى البؤرة.', 'With $e=\\frac{1}{2}$, take $P$ to the point of the curve closest to the focus.'),
        hint: say('Zuzentzailerantz begira dagoen erpina da.', 'Es el vértice que mira hacia la directriz.', 'إنه الرأس المواجه للدليل.', 'It is the vertex facing the directrix.'),
        isSolved: (state) => state.k === 2 && state.angle === 0
    }
]

const places = [
    { angle: 0, eu: 'fokutik hurbilen dagoen erpinean', es: 'en el vértice más cercano al foco', ar: 'في الرأس الأقرب إلى البؤرة', en: 'at the vertex closest to the focus' },
    { angle: 90, eu: 'fokuaren gainean', es: 'justo encima del foco', ar: 'فوق البؤرة مباشرة', en: 'straight above the focus' },
    { angle: -90, eu: 'fokuaren azpian', es: 'justo debajo del foco', ar: 'تحت البؤرة مباشرة', en: 'straight below the focus' }
]

/** Endless practice: a conic by its eccentricity and a place for P on it */
const eccentricityMaker: LabChallengeMaker<EccentricityState> = (random) => {
    for (;;) {
        const k = randomInt(random, 0, QUARTERS)
        const place = places[randomInt(random, 0, places.length - 1)]
        // A circle has no vertex closest to its centre
        if (k === 0 && place.angle === 0) continue
        const e = `$e=${eLatex(k)}$`
        return {
            prompt: say(`Egin ${e} eszentrikotasuneko konika, eta jarri $P$ ${place.eu}.`, `Haz la cónica de excentricidad ${e} y pon $P$ ${place.es}.`, `ارسم القطع المخروطي ذا الاختلاف المركزي ${e} وضع $P$ ${place.ar}.`, `Make the conic with eccentricity ${e} and put $P$ ${place.en}.`),
            hint: say('$e$ lauren bat aldatzen da; $P$, $30^\\circ$ bakoitzean.', '$e$ cambia de cuarto en cuarto; $P$, de $30^\\circ$ en $30^\\circ$.', 'يتغير $e$ ربعًا ربعًا؛ و$P$ كل $30^\\circ$.', '$e$ changes a quarter at a time; $P$, $30^\\circ$ at a time.'),
            isSolved: (state) => state.k === k && state.angle === place.angle,
            solution: { k, angle: place.angle, prediction: null }
        }
    }
}

export const eccentricityExtra = freshFrom(initialEccentricityState, eccentricityMaker)
