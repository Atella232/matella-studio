import { randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { compareTo, freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'
import type { Pair } from './gardener.ts'

/* ==========================================================================
   L2 · Fokua eta zuzentzailea (Foco y directriz): the parabola y² = 2px,
   with focus F(p/2, 0) and directrix x = −p/2. The learner moves a point
   P and first predicts whether d(P, F) is less than, equal to or more
   than d(P, directrix); then both distances appear, and ▶ builds the
   parabola point by point, each one as far from F as from the line.
   Whole numbers only: d(P, F)² − d(P, directrix)² = y² − 2px.
   Pure logic.
   ========================================================================== */

export const DIRECTRIX_LIMITS = { p: 6, xMin: -4, xMax: 8, y: 6 }

export interface DirectrixState {
    /** The parameter of y² = 2px */
    p: number
    point: Pair
    prediction: Prediction | null
}

export const initialDirectrixState: DirectrixState = { p: 3, point: [1, 2], prediction: null }

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value)))

export function setDirectrix(state: DirectrixState, patch: Partial<Omit<DirectrixState, 'prediction'>>): DirectrixState {
    const p = patch.p === undefined ? state.p : clamp(patch.p, 1, DIRECTRIX_LIMITS.p)
    const point: Pair = patch.point ? [clamp(patch.point[0], DIRECTRIX_LIMITS.xMin, DIRECTRIX_LIMITS.xMax), clamp(patch.point[1], -DIRECTRIX_LIMITS.y, DIRECTRIX_LIMITS.y)] : state.point
    const same = p === state.p && point[0] === state.point[0] && point[1] === state.point[1]
    return { p, point, prediction: same ? state.prediction : null }
}

export const focusOf = ({ p }: Pick<DirectrixState, 'p'>): Pair => [p / 2, 0]
export const toFocus = ({ p, point }: Pick<DirectrixState, 'p' | 'point'>) => Math.hypot(point[0] - p / 2, point[1])
export const toDirectrix = ({ p, point }: Pick<DirectrixState, 'p' | 'point'>) => Math.abs(point[0] + p / 2)

/** y² − 2px = d(P, F)² − d(P, directrix)²: negative when P is nearer the focus, zero on the parabola, positive when it is nearer the directrix */
export const parabolaValue = ({ p, point }: Pick<DirectrixState, 'p' | 'point'>) => point[1] ** 2 - 2 * p * point[0]
export const onParabola = (state: Pick<DirectrixState, 'p' | 'point'>) => parabolaValue(state) === 0

/** d(P, F) against d(P, directrix), with whole numbers */
export const directrixPrediction = (state: DirectrixState): Prediction => compareTo(Math.sign(parabolaValue(state)), 0)

/** A half in LaTeX: 3/2 as \frac{3}{2}, 2/2 as 1 */
export const halfLatex = (n: number) => (n % 2 === 0 ? String(n / 2) : `\\frac{${n}}{2}`)

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const same = (text: string): LocalizedText => say(text, text, text, text)

export const directrixChallenges: LabChallenge<DirectrixState>[] = [
    {
        id: 107201,
        prompt: say('$p=4$ izanik, jarri $P$ parabolaren gainean, $y=4$ altueran.', 'Con $p=4$, pon $P$ sobre la parábola a la altura $y=4$.', 'مع $p=4$ ضع $P$ على القطع المكافئ عند الارتفاع $y=4$.', 'With $p=4$, put $P$ on the parabola at height $y=4$.'),
        hint: same('$x=\\frac{y^2}{2p}=\\frac{16}{8}=2$'),
        isSolved: (state) => state.p === 4 && state.point[0] === 2 && state.point[1] === 4
    },
    {
        id: 107202,
        prompt: say('Aukeratu $p$, parabola $(2,2)$ puntutik pasa dadin.', 'Elige $p$ para que la parábola pase por $(2,2)$.', 'اختر $p$ ليمر القطع المكافئ بـ $(2,2)$.', 'Choose $p$ so that the parabola passes through $(2,2)$.'),
        hint: same('$2^2=2p\\cdot 2$'),
        isSolved: (state) => state.p === 1
    },
    {
        id: 107203,
        prompt: say('Jarri $P$ $(3,0)$ fokua duen parabolaren gainean, erpinetik kanpo.', 'Pon $P$ sobre la parábola de foco $(3,0)$, fuera del vértice.', 'ضع $P$ على القطع المكافئ الذي بؤرته $(3,0)$، بعيدًا عن الرأس.', 'Put $P$ on the parabola with focus $(3,0)$, away from the vertex.'),
        hint: say('Fokua $(3,0)$: $p=6$ eta $y^2=12x$.', 'Foco $(3,0)$: $p=6$ e $y^2=12x$.', 'البؤرة $(3,0)$: $p=6$ و$y^2=12x$.', 'Focus $(3,0)$: $p=6$ and $y^2=12x$.'),
        isSolved: (state) => state.p === 6 && onParabola(state) && state.point[1] !== 0
    },
    {
        id: 107204,
        prompt: say('$p=2$ izanik, jarri $P$ fokutik eta zuzentzailetik distantzia berera, $X$ ardatzaren azpian.', 'Con $p=2$, pon $P$ a la misma distancia del foco y de la directriz, por debajo del eje $X$.', 'مع $p=2$ ضع $P$ على المسافة نفسها من البؤرة والدليل، تحت المحور $X$.', 'With $p=2$, put $P$ the same distance from the focus and from the directrix, below the $X$ axis.'),
        hint: same('$y^2=4x$'),
        isSolved: (state) => state.p === 2 && onParabola(state) && state.point[1] < 0
    },
    {
        id: 107205,
        prompt: say('Egin fokua $(1,0)$ izan dadin, eta jarri $P$ parabolaren gainean, $x=4$ izanik.', 'Haz que el foco sea $(1,0)$ y pon $P$ sobre la parábola con $x=4$.', 'اجعل البؤرة $(1,0)$ وضع $P$ على القطع المكافئ حيث $x=4$.', 'Make the focus $(1,0)$ and put $P$ on the parabola with $x=4$.'),
        hint: say('$\\frac{p}{2}=1$, beraz $p=2$ eta $y^2=4x=16$.', '$\\frac{p}{2}=1$, así que $p=2$ e $y^2=4x=16$.', '$\\frac{p}{2}=1$ إذن $p=2$ و$y^2=4x=16$.', '$\\frac{p}{2}=1$, so $p=2$ and $y^2=4x=16$.'),
        isSolved: (state) => state.p === 2 && state.point[0] === 4 && Math.abs(state.point[1]) === 4
    }
]

/** The whole points (x, y) with y ≠ 0 of y² = 2px that fit on the board */
export function wholePoints(p: number): Pair[] {
    const points: Pair[] = []
    for (let y = -DIRECTRIX_LIMITS.y; y <= DIRECTRIX_LIMITS.y; y += 1) {
        if (y === 0 || (y * y) % (2 * p) !== 0) continue
        const x = (y * y) / (2 * p)
        if (x <= DIRECTRIX_LIMITS.xMax) points.push([x, y])
    }
    return points
}

/** Endless practice: a parabola and a height where it has a whole point */
const directrixMaker: LabChallengeMaker<DirectrixState> = (random) => {
    for (;;) {
        const p = randomInt(random, 1, DIRECTRIX_LIMITS.p)
        const points = wholePoints(p)
        if (!points.length) continue
        const point = points[randomInt(random, 0, points.length - 1)]
        return {
            prompt: say(`$p=${p}$ izanik, jarri $P$ parabolaren gainean, $y=${point[1]}$ altueran.`, `Con $p=${p}$, pon $P$ sobre la parábola a la altura $y=${point[1]}$.`, `مع $p=${p}$ ضع $P$ على القطع المكافئ عند الارتفاع $y=${point[1]}$.`, `With $p=${p}$, put $P$ on the parabola at height $y=${point[1]}$.`),
            hint: say('$x=\\frac{y^2}{2p}$: fokutik eta zuzentzailetik distantzia bera.', '$x=\\frac{y^2}{2p}$: la misma distancia al foco y a la directriz.', '$x=\\frac{y^2}{2p}$: المسافة نفسها إلى البؤرة والدليل.', '$x=\\frac{y^2}{2p}$: the same distance to the focus and to the directrix.'),
            isSolved: (state) => state.p === p && state.point[0] === point[0] && state.point[1] === point[1],
            solution: { p, point, prediction: null }
        }
    }
}

export const directrixExtra = freshFrom(initialDirectrixState, directrixMaker)
