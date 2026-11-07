import { randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { compareTo, freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'

/* ==========================================================================
   L1 · Lorazaina (El jardinero): the gardener's ellipse. Two nails, the
   foci F(c, 0) and F′(−c, 0), and a string of length 2a. The learner
   moves a point P and first predicts whether PF + PF′ is less than, equal
   to or more than 2a (inside, on or outside the ellipse); then the two
   lengths appear, and ▶ draws the ellipse with the string tight. Whole
   numbers only: P is on the ellipse when b²x² + a²y² = a²b², b² = a² − c².
   Pure logic.
   ========================================================================== */

export type Pair = [number, number]

export const GARDENER_LIMITS = { c: 4, a: 6, x: 6, y: 5 }

export interface GardenerState {
    /** Half the distance between the nails: F(c, 0), F′(−c, 0) */
    c: number
    /** Half the string */
    a: number
    p: Pair
    prediction: Prediction | null
}

export const initialGardenerState: GardenerState = { c: 3, a: 4, p: [2, 2], prediction: null }

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value)))

/** The string is always longer than the distance between the nails: a ≥ c + 1 */
export function setGardener(state: GardenerState, patch: Partial<Omit<GardenerState, 'prediction'>>): GardenerState {
    const c = patch.c === undefined ? state.c : clamp(patch.c, 0, GARDENER_LIMITS.c)
    const a = Math.max(c + 1, patch.a === undefined ? state.a : clamp(patch.a, 1, GARDENER_LIMITS.a))
    const p: Pair = patch.p ? [clamp(patch.p[0], -GARDENER_LIMITS.x, GARDENER_LIMITS.x), clamp(patch.p[1], -GARDENER_LIMITS.y, GARDENER_LIMITS.y)] : state.p
    const same = c === state.c && a === state.a && p[0] === state.p[0] && p[1] === state.p[1]
    return { c, a, p, prediction: same ? state.prediction : null }
}

export const bSquare = ({ a, c }: Pick<GardenerState, 'a' | 'c'>) => a * a - c * c
export const toFocus = ({ c, p }: Pick<GardenerState, 'c' | 'p'>) => Math.hypot(p[0] - c, p[1])
export const toOtherFocus = ({ c, p }: Pick<GardenerState, 'c' | 'p'>) => Math.hypot(p[0] + c, p[1])
export const stringSum = (state: Pick<GardenerState, 'c' | 'p'>) => toFocus(state) + toOtherFocus(state)

/** b²x² + a²y² against a²b², with whole numbers: negative inside, zero on the ellipse, positive outside */
export function ellipseValue(state: Pick<GardenerState, 'a' | 'c' | 'p'>) {
    const b2 = bSquare(state)
    return b2 * state.p[0] ** 2 + state.a ** 2 * state.p[1] ** 2 - state.a ** 2 * b2
}

export const onEllipse = (state: Pick<GardenerState, 'a' | 'c' | 'p'>) => ellipseValue(state) === 0

/** PF + PF′ against 2a, read from the whole-number test (no rounding of square roots) */
export const gardenerPrediction = (state: GardenerState): Prediction => compareTo(Math.sign(ellipseValue(state)), 0)

/** The reduced equation x²/a² + y²/b² = 1 in LaTeX (x² + y² = a² when c = 0) */
export function gardenerLatex(state: Pick<GardenerState, 'a' | 'c'>) {
    const b2 = bSquare(state)
    return state.c === 0 ? `x^2+y^2=${state.a * state.a}` : `\\frac{x^2}{${state.a * state.a}}+\\frac{y^2}{${b2}}=1`
}

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const foci = (c: number) => `$(\\pm ${c},0)$`

export const gardenerChallenges: LabChallenge<GardenerState>[] = [
    {
        id: 107101,
        prompt: say(`Fokuak ${foci(4)} puntuetan eta soka $2a=10$ izanik, jarri $P$ elipsearen gainean, $X$ ardatzetik kanpo.`, `Con los focos en ${foci(4)} y la cuerda $2a=10$, pon $P$ sobre la elipse, fuera del eje $X$.`, `مع البؤرتين في ${foci(4)} والخيط $2a=10$، ضع $P$ على القطع الناقص خارج المحور $X$.`, `With the foci at ${foci(4)} and the string $2a=10$, put $P$ on the ellipse, off the $X$ axis.`),
        hint: say('Ardatz txikian: $(0,b)$, $b^2=a^2-c^2=9$ izanik.', 'En el eje menor: $(0,b)$, con $b^2=a^2-c^2=9$.', 'على المحور الأصغر: $(0,b)$ حيث $b^2=a^2-c^2=9$.', 'On the minor axis: $(0,b)$, with $b^2=a^2-c^2=9$.'),
        isSolved: (state) => state.c === 4 && state.a === 5 && onEllipse(state) && state.p[1] !== 0
    },
    {
        id: 107102,
        prompt: say(`Fokuak ${foci(3)} puntuetan izanik, aukeratu soka, elipsea $(0,4)$ puntutik pasa dadin.`, `Con los focos en ${foci(3)}, elige la cuerda para que la elipse pase por $(0,4)$.`, `مع البؤرتين في ${foci(3)} اختر الخيط ليمر القطع الناقص بـ $(0,4)$.`, `With the foci at ${foci(3)}, choose the string so that the ellipse passes through $(0,4)$.`),
        hint: say('$(0,4)$ puntutik foku bakoitza $\\sqrt{9+16}=5$ distantziara dago: sokak $10$ neurtzen du.', 'Desde $(0,4)$ cada foco está a $\\sqrt{9+16}=5$: la cuerda mide $10$.', 'من $(0,4)$ تبعد كل بؤرة $\\sqrt{9+16}=5$: طول الخيط $10$.', 'From $(0,4)$ each focus is $\\sqrt{9+16}=5$ away: the string is $10$ long.'),
        isSolved: (state) => state.c === 3 && state.a === 5
    },
    {
        id: 107103,
        prompt: say('Elkartu bi fokuak jatorrian eta egin $4$ erradioko zirkunferentzia bat.', 'Junta los dos focos en el origen y haz una circunferencia de radio $4$.', 'اجمع البؤرتين في الأصل وارسم دائرة نصف قطرها $4$.', 'Put both foci together at the origin and make a circle of radius $4$.'),
        hint: say('$c=0$ denean, elipsea $a$ erradioko zirkunferentzia da.', 'Con $c=0$ la elipse es una circunferencia de radio $a$.', 'عندما $c=0$ يكون القطع الناقص دائرة نصف قطرها $a$.', 'With $c=0$ the ellipse is a circle of radius $a$.'),
        isSolved: (state) => state.c === 0 && state.a === 4
    },
    {
        id: 107104,
        prompt: say('Aukeratu $c$ eta $a$, eszentrikotasuna $\\frac{3}{5}$ izan dadin.', 'Elige $c$ y $a$ para que la excentricidad sea $\\frac{3}{5}$.', 'اختر $c$ و$a$ ليكون الاختلاف المركزي $\\frac{3}{5}$.', 'Choose $c$ and $a$ so that the eccentricity is $\\frac{3}{5}$.'),
        hint: say('$e=\\frac{c}{a}$', '$e=\\frac{c}{a}$', '$e=\\frac{c}{a}$', '$e=\\frac{c}{a}$'),
        isSolved: (state) => state.c > 0 && 5 * state.c === 3 * state.a
    },
    {
        id: 107105,
        prompt: say(`Fokuak ${foci(2)} eta soka $2a=8$ izanik, jarri $P$ elipsearen gainean, $F(2,0)$ fokuaren bertikalean.`, `Con focos ${foci(2)} y cuerda $2a=8$, pon $P$ sobre la elipse en la vertical del foco $F(2,0)$.`, `مع البؤرتين ${foci(2)} والخيط $2a=8$ ضع $P$ على القطع الناقص على الخط الرأسي المار بالبؤرة $F(2,0)$.`, `With foci ${foci(2)} and string $2a=8$, put $P$ on the ellipse straight above or below the focus $F(2,0)$.`),
        hint: same('$x=2$: $\\frac{4}{16}+\\frac{y^2}{12}=1$'),
        isSolved: (state) => state.c === 2 && state.a === 4 && state.p[0] === 2 && Math.abs(state.p[1]) === 3
    }
]

function same(text: string): LocalizedText {
    return say(text, text, text, text)
}

/** Endless practice: a vertex on an axis, or the string that reaches a point of the X axis */
const gardenerMaker: LabChallengeMaker<GardenerState> = (random) => {
    for (;;) {
        const c = randomInt(random, 1, GARDENER_LIMITS.c)
        const a = randomInt(random, c + 1, GARDENER_LIMITS.a)
        const kind = randomInt(random, 0, 2)
        if (kind === 0) {
            const side = randomInt(random, 0, 1) === 0 ? 1 : -1
            const p: Pair = [side * a, 0]
            return {
                prompt: say(`Fokuak ${foci(c)} puntuetan eta soka $2a=${2 * a}$ izanik, jarri $P$ elipsearen gainean, $X$ ardatzean, ${side > 0 ? 'eskuinean' : 'ezkerrean'}.`, `Con los focos en ${foci(c)} y la cuerda $2a=${2 * a}$, pon $P$ sobre la elipse, en el eje $X$, a la ${side > 0 ? 'derecha' : 'izquierda'}.`, `مع البؤرتين في ${foci(c)} والخيط $2a=${2 * a}$ ضع $P$ على القطع الناقص على المحور $X$ ${side > 0 ? 'يمينًا' : 'يسارًا'}.`, `With the foci at ${foci(c)} and the string $2a=${2 * a}$, put $P$ on the ellipse, on the $X$ axis, to the ${side > 0 ? 'right' : 'left'}.`),
                hint: say('$X$ ardatzeko erpinak $(\\pm a,0)$ dira.', 'Los vértices del eje $X$ son $(\\pm a,0)$.', 'رأسا المحور $X$ هما $(\\pm a,0)$.', 'The vertices on the $X$ axis are $(\\pm a,0)$.'),
                isSolved: (state) => state.c === c && state.a === a && state.p[0] === p[0] && state.p[1] === 0,
                solution: { c, a, p, prediction: null }
            }
        }
        if (kind === 1) {
            return {
                prompt: say(`Fokuak ${foci(c)} puntuetan izanik, aukeratu soka, elipsea $(${a},0)$ puntutik pasa dadin.`, `Con los focos en ${foci(c)}, elige la cuerda para que la elipse pase por $(${a},0)$.`, `مع البؤرتين في ${foci(c)} اختر الخيط ليمر القطع الناقص بـ $(${a},0)$.`, `With the foci at ${foci(c)}, choose the string so that the ellipse passes through $(${a},0)$.`),
                hint: say('Erpin batetik fokuetarako distantzien batura $2a$ da.', 'Desde un vértice, las distancias a los focos suman $2a$.', 'من رأس، مجموع البعدين عن البؤرتين $2a$.', 'From a vertex, the distances to the foci add up to $2a$.'),
                isSolved: (state) => state.c === c && state.a === a,
                solution: { c, a, p: initialGardenerState.p, prediction: null }
            }
        }
        const b = Math.sqrt(a * a - c * c)
        if (!Number.isInteger(b) || b > GARDENER_LIMITS.y) continue
        const up = randomInt(random, 0, 1) === 0 ? 1 : -1
        return {
            prompt: say(`Fokuak ${foci(c)} puntuetan eta soka $2a=${2 * a}$ izanik, jarri $P$ elipsearen gainean, $Y$ ardatzean, ${up > 0 ? 'goian' : 'behean'}.`, `Con los focos en ${foci(c)} y la cuerda $2a=${2 * a}$, pon $P$ sobre la elipse, en el eje $Y$, ${up > 0 ? 'arriba' : 'abajo'}.`, `مع البؤرتين في ${foci(c)} والخيط $2a=${2 * a}$ ضع $P$ على القطع الناقص على المحور $Y$ ${up > 0 ? 'في الأعلى' : 'في الأسفل'}.`, `With the foci at ${foci(c)} and the string $2a=${2 * a}$, put $P$ on the ellipse, on the $Y$ axis, ${up > 0 ? 'at the top' : 'at the bottom'}.`),
            hint: say('$b^2=a^2-c^2$', '$b^2=a^2-c^2$', '$b^2=a^2-c^2$', '$b^2=a^2-c^2$'),
            isSolved: (state) => state.c === c && state.a === a && state.p[0] === 0 && state.p[1] === up * b,
            solution: { c, a, p: [0, up * b], prediction: null }
        }
    }
}

export const gardenerExtra = freshFrom(initialGardenerState, gardenerMaker)
