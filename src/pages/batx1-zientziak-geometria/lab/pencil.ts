import { randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import { fraction, toLatex, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { compareTo, freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'

/* ==========================================================================
   L2 · Zuzen-sorta (El haz de rectas): a centre P with whole coordinates
   and a slope m from a short list turn a line around P: every line of the
   pencil y − y₀ = m(x − x₀). A point Q sits somewhere on the board; the
   learner first predicts whether Q is below, on or above the line, then
   the equation and the height of the line at Q appear. Pure logic.
   ========================================================================== */

export type Pair = [number, number]

/** The slopes the line can take, from the steepest down to the steepest up */
export const PENCIL_SLOPES: FractionValue[] = [fraction(-3), fraction(-2), fraction(-1), fraction(-1, 2), fraction(-1, 3), fraction(0), fraction(1, 3), fraction(1, 2), fraction(1), fraction(2), fraction(3)]
export const PENCIL_LIMITS = { centre: 3, point: 5 } as const

export interface PencilState {
    p: Pair
    /** Index in PENCIL_SLOPES */
    slope: number
    q: Pair
    prediction: Prediction | null
}

export const slopeIndex = (numerator: number, denominator = 1) => PENCIL_SLOPES.findIndex((m) => m.numerator * denominator === numerator * m.denominator)

export const initialPencilState: PencilState = { p: [1, 1], slope: slopeIndex(1), q: [3, 4], prediction: null }

const clamp = (value: number, limit: number) => Math.min(limit, Math.max(-limit, Math.round(value)))
const clampPair = ([x, y]: Pair, limit: number): Pair => [clamp(x, limit), clamp(y, limit)]
export const samePair = (p: Pair, q: Pair) => p[0] === q[0] && p[1] === q[1]

export function setPencil(state: PencilState, patch: Partial<Omit<PencilState, 'prediction'>>): PencilState {
    const p = patch.p ? clampPair(patch.p, PENCIL_LIMITS.centre) : state.p
    const slope = patch.slope === undefined ? state.slope : Math.min(PENCIL_SLOPES.length - 1, Math.max(0, Math.round(patch.slope)))
    const q = patch.q ? clampPair(patch.q, PENCIL_LIMITS.point) : state.q
    const same = samePair(p, state.p) && slope === state.slope && samePair(q, state.q)
    return { p, slope, q, prediction: same ? state.prediction : null }
}

export const pencilSlope = (state: Pick<PencilState, 'slope'>) => PENCIL_SLOPES[state.slope]

/** How far a point is above the line, times the denominator of m (so it stays whole): b(y − y₀) − a(x − x₀) */
export function aboveBy({ p, slope }: Pick<PencilState, 'p' | 'slope'>, [x, y]: Pair) {
    const { numerator, denominator } = PENCIL_SLOPES[slope]
    return denominator * (y - p[1]) - numerator * (x - p[0])
}

export const onPencil = (state: Pick<PencilState, 'p' | 'slope'>, point: Pair) => aboveBy(state, point) === 0

/** Below, on or above the line: what the learner predicts for Q */
export const pencilPrediction = (state: PencilState): Prediction => compareTo(aboveBy(state, state.q), 0)

/** The height of the line at x: y₀ + m(x − x₀) */
export function heightAt({ p, slope }: Pick<PencilState, 'p' | 'slope'>, x: number): FractionValue {
    const { numerator, denominator } = PENCIL_SLOPES[slope]
    return fraction(p[1] * denominator + numerator * (x - p[0]), denominator)
}

/** The y-intercept n of y = mx + n */
export const interceptOf = (state: Pick<PencilState, 'p' | 'slope'>) => heightAt(state, 0)

/** x − a, written so that a negative a turns into a plus */
export const shiftLatex = (name: string, value: number) => (value === 0 ? name : value > 0 ? `${name}-${value}` : `${name}+${-value}`)

/** y − y₀ = m(x − x₀) in LaTeX */
export function pointSlopeLatex({ p, slope }: Pick<PencilState, 'p' | 'slope'>) {
    const m = PENCIL_SLOPES[slope]
    const inner = shiftLatex('x', p[0])
    const factor = p[0] === 0 ? inner : `(${inner})`
    const right = m.numerator === 0 ? '0' : m.numerator === m.denominator ? factor : m.numerator === -m.denominator ? `-${factor}` : `${toLatex(m)}${factor}`
    return `${shiftLatex('y', p[1])}=${right}`
}

/** y = mx + n in LaTeX */
export function explicitLatex(state: Pick<PencilState, 'p' | 'slope'>) {
    const m = PENCIL_SLOPES[state.slope]
    const n = interceptOf(state)
    const term = m.numerator === 0 ? '' : m.numerator === m.denominator ? 'x' : m.numerator === -m.denominator ? '-x' : `${toLatex(m)}x`
    if (n.numerator === 0) return `y=${term || '0'}`
    if (!term) return `y=${toLatex(n)}`
    return `y=${term}${n.numerator < 0 ? '' : '+'}${toLatex(n)}`
}

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })

export const pencilChallenges: LabChallenge<PencilState>[] = [
    {
        id: 106101,
        prompt: say('$P(0,1)$ zentroa dela, egin sortako zuzena $(2,-3)$ puntutik pasa dadin.', 'Con centro $P(0,1)$, haz que la recta del haz pase por $(2,-3)$.', 'مع المركز $P(0,1)$ اجعل مستقيم الحزمة يمر بـ $(2,-3)$.', 'With centre $P(0,1)$, make the line of the pencil pass through $(2,-3)$.'),
        hint: say('Malda: $\\frac{-3-1}{2-0}$.', 'Pendiente: $\\frac{-3-1}{2-0}$.', 'الميل: $\\frac{-3-1}{2-0}$.', 'Slope: $\\frac{-3-1}{2-0}$.'),
        isSolved: (state) => samePair(state.p, [0, 1]) && onPencil(state, [2, -3])
    },
    {
        id: 106102,
        prompt: say('$P(-1,2)$ zentroa dela, lortu $y=\\frac{1}{2}x+4$ zuzenaren paraleloa.', 'Con centro $P(-1,2)$, consigue la paralela a $y=\\frac{1}{2}x+4$.', 'مع المركز $P(-1,2)$ احصل على الموازي لـ $y=\\frac{1}{2}x+4$.', 'With centre $P(-1,2)$, get the parallel to $y=\\frac{1}{2}x+4$.'),
        hint: say('Paraleloek malda bera dute.', 'Las paralelas tienen la misma pendiente.', 'للمتوازيين الميل نفسه.', 'Parallel lines have the same slope.'),
        isSolved: (state) => samePair(state.p, [-1, 2]) && state.slope === slopeIndex(1, 2)
    },
    {
        id: 106103,
        prompt: say('$P(2,1)$ zentroa dela, lortu $y=3x$ zuzenaren perpendikularra.', 'Con centro $P(2,1)$, consigue la perpendicular a $y=3x$.', 'مع المركز $P(2,1)$ احصل على العمودي على $y=3x$.', 'With centre $P(2,1)$, get the perpendicular to $y=3x$.'),
        hint: say('Perpendikularrak: $m\\cdot m\'=-1$.', 'Perpendiculares: $m\\cdot m\'=-1$.', 'متعامدان: $m\\cdot m\'=-1$.', 'Perpendicular: $m\\cdot m\'=-1$.'),
        isSolved: (state) => samePair(state.p, [2, 1]) && state.slope === slopeIndex(-1, 3)
    },
    {
        id: 106104,
        prompt: say('$P(2,-1)$ zentroa dela, aurkitu $Y$ ardatza $3$ puntuan mozten duen sortako zuzena.', 'Con centro $P(2,-1)$, halla la recta del haz que corta al eje $Y$ en $3$.', 'مع المركز $P(2,-1)$ أوجد مستقيم الحزمة الذي يقطع المحور $Y$ عند $3$.', 'With centre $P(2,-1)$, find the line of the pencil that cuts the $Y$ axis at $3$.'),
        hint: say('Zuzenak $(0,3)$ puntutik pasatu behar du.', 'La recta tiene que pasar por $(0,3)$.', 'يجب أن يمر المستقيم بـ $(0,3)$.', 'The line has to pass through $(0,3)$.'),
        isSolved: (state) => samePair(state.p, [2, -1]) && onPencil(state, [0, 3])
    },
    {
        id: 106105,
        prompt: say('$P(1,1)$ zentroa eta $-\\frac{1}{2}$ malda direla, jarri $Q$ zuzenean, $x=5$ denean.', 'Con centro $P(1,1)$ y pendiente $-\\frac{1}{2}$, pon $Q$ sobre la recta con $x=5$.', 'مع المركز $P(1,1)$ والميل $-\\frac{1}{2}$ ضع $Q$ على المستقيم عند $x=5$.', 'With centre $P(1,1)$ and slope $-\\frac{1}{2}$, put $Q$ on the line at $x=5$.'),
        hint: say('$y=1-\\frac{1}{2}(5-1)$.', '$y=1-\\frac{1}{2}(5-1)$.', '$y=1-\\frac{1}{2}(5-1)$.', '$y=1-\\frac{1}{2}(5-1)$.'),
        isSolved: (state) => samePair(state.p, [1, 1]) && state.slope === slopeIndex(-1, 2) && samePair(state.q, [5, -1])
    }
]

/** Endless practice: a centre and a point the line must pass through, or the y-intercept it must have */
const pencilMaker: LabChallengeMaker<PencilState> = (random) => {
    for (;;) {
        const p: Pair = [randomInt(random, -PENCIL_LIMITS.centre, PENCIL_LIMITS.centre), randomInt(random, -PENCIL_LIMITS.centre, PENCIL_LIMITS.centre)]
        const slope = randomInt(random, 0, PENCIL_SLOPES.length - 1)
        const line = { p, slope }
        if (random() < 0.6) {
            const x = randomInt(random, -PENCIL_LIMITS.point, PENCIL_LIMITS.point)
            const y = heightAt(line, x)
            if (x === p[0] || y.denominator !== 1 || Math.abs(y.numerator) > PENCIL_LIMITS.point) continue
            const target: Pair = [x, y.numerator]
            return {
                prompt: say(`$P(${p[0]},${p[1]})$ zentroa dela, egin sortako zuzena $(${x},${y.numerator})$ puntutik pasa dadin.`, `Con centro $P(${p[0]},${p[1]})$, haz que la recta del haz pase por $(${x},${y.numerator})$.`, `مع المركز $P(${p[0]},${p[1]})$ اجعل مستقيم الحزمة يمر بـ $(${x},${y.numerator})$.`, `With centre $P(${p[0]},${p[1]})$, make the line of the pencil pass through $(${x},${y.numerator})$.`),
                hint: say('Malda: $\\frac{y-y_0}{x-x_0}$.', 'Pendiente: $\\frac{y-y_0}{x-x_0}$.', 'الميل: $\\frac{y-y_0}{x-x_0}$.', 'Slope: $\\frac{y-y_0}{x-x_0}$.'),
                isSolved: (state) => samePair(state.p, p) && onPencil(state, target),
                solution: { p, slope, q: target, prediction: null }
            }
        }
        const n = interceptOf(line)
        if (p[0] === 0 || n.denominator !== 1 || Math.abs(n.numerator) > 8) continue
        return {
            prompt: say(`$P(${p[0]},${p[1]})$ zentroa dela, aurkitu $Y$ ardatza $${n.numerator}$ puntuan mozten duen sortako zuzena.`, `Con centro $P(${p[0]},${p[1]})$, halla la recta del haz que corta al eje $Y$ en $${n.numerator}$.`, `مع المركز $P(${p[0]},${p[1]})$ أوجد مستقيم الحزمة الذي يقطع المحور $Y$ عند $${n.numerator}$.`, `With centre $P(${p[0]},${p[1]})$, find the line of the pencil that cuts the $Y$ axis at $${n.numerator}$.`),
            hint: say(`Zuzenak $(0,${n.numerator})$ puntutik pasatu behar du.`, `La recta tiene que pasar por $(0,${n.numerator})$.`, `يجب أن يمر المستقيم بـ $(0,${n.numerator})$.`, `The line has to pass through $(0,${n.numerator})$.`),
            isSolved: (state) => samePair(state.p, p) && onPencil(state, [0, n.numerator]),
            solution: { p, slope, q: initialPencilState.q, prediction: null }
        }
    }
}

export const pencilExtra = freshFrom(initialPencilState, pencilMaker)
