import { randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { compareTo, freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'
import { samePair, type Pair } from './pencil.ts'

/* ==========================================================================
   L3 · Bi zuzenen angelua (El ángulo de dos rectas): two lines through
   the origin, each set by a direction vector with whole coordinates. The
   angle of two lines is the acute one, so the cosine takes the absolute
   value of the dot product. The learner first predicts whether the angle
   is less than, equal to or more than 45°; then the cosine and the angle
   appear. Everything is compared with whole numbers: α < 45° exactly when
   2(u·v)² > |u|²|v|². Pure logic.
   ========================================================================== */

export const ANGLE_LIMIT = 4

export interface LineAngleState {
    r: Pair
    s: Pair
    prediction: Prediction | null
}

export const initialLineAngleState: LineAngleState = { r: [3, 1], s: [1, 3], prediction: null }

const clamp = (value: number) => Math.min(ANGLE_LIMIT, Math.max(-ANGLE_LIMIT, Math.round(value)))

export function setLineAngle(state: LineAngleState, patch: Partial<Omit<LineAngleState, 'prediction'>>): LineAngleState {
    const r: Pair = patch.r ? [clamp(patch.r[0]), clamp(patch.r[1])] : state.r
    const s: Pair = patch.s ? [clamp(patch.s[0]), clamp(patch.s[1])] : state.s
    const same = samePair(r, state.r) && samePair(s, state.s)
    return { r, s, prediction: same ? state.prediction : null }
}

export const dotOf = ([a, b]: Pair, [c, d]: Pair) => a * c + b * d
export const crossOf = ([a, b]: Pair, [c, d]: Pair) => a * d - b * c
export const squareOf = ([a, b]: Pair) => a * a + b * b
export const isZero = (p: Pair) => p[0] === 0 && p[1] === 0

/** Both lines exist: neither direction vector is zero */
export const hasLines = ({ r, s }: Pick<LineAngleState, 'r' | 's'>) => !isZero(r) && !isZero(s)

/** The acute angle between the lines, in degrees, or null if a direction is zero */
export function lineAngleOf(state: Pick<LineAngleState, 'r' | 's'>): number | null {
    if (!hasLines(state)) return null
    const cosine = Math.min(1, Math.abs(dotOf(state.r, state.s)) / Math.sqrt(squareOf(state.r) * squareOf(state.s)))
    return (Math.acos(cosine) * 180) / Math.PI
}

/** Below, at or above 45°, with whole numbers only: |r|²|s|² − 2(r·s)² */
export function lineAnglePrediction(state: Pick<LineAngleState, 'r' | 's'>): Prediction | null {
    if (!hasLines(state)) return null
    const dot = dotOf(state.r, state.s)
    return compareTo(squareOf(state.r) * squareOf(state.s) - 2 * dot * dot, 0)
}

export const isRight = (state: Pick<LineAngleState, 'r' | 's'>) => hasLines(state) && dotOf(state.r, state.s) === 0
export const isHalfRight = (state: Pick<LineAngleState, 'r' | 's'>) => lineAnglePrediction(state) === '='
export const isSameLine = (state: Pick<LineAngleState, 'r' | 's'>) => hasLines(state) && crossOf(state.r, state.s) === 0

/** The line through the origin with direction (a, b): bx − ay = 0 in LaTeX, with its first coefficient positive */
export function throughOriginLatex([x0, y0]: Pair) {
    const gcd = (m: number, n: number): number => (n === 0 ? Math.abs(m) || 1 : gcd(n, m % n))
    const g = gcd(x0, y0)
    const [a, b] = [x0 / g, y0 / g]
    const flip = b < 0 || (b === 0 && a > 0) ? -1 : 1
    const term = (coefficient: number, name: string, first: boolean) => {
        if (coefficient === 0) return ''
        const sign = coefficient < 0 ? '-' : first ? '' : '+'
        const size = Math.abs(coefficient) === 1 ? '' : String(Math.abs(coefficient))
        return `${sign}${size}${name}`
    }
    const x = term(flip * b, 'x', true)
    const y = term(-flip * a, 'y', x === '')
    return `${x}${y}=0`
}

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })

export const lineAngleChallenges: LabChallenge<LineAngleState>[] = [
    {
        id: 106201,
        prompt: say('Egin bi zuzenak perpendikularrak.', 'Haz que las dos rectas sean perpendiculares.', 'اجعل المستقيمين متعامدين.', 'Make the two lines perpendicular.'),
        hint: say('$(a,b)$ eta $(-b,a)$: biderkadura eskalarra 0.', '$(a,b)$ y $(-b,a)$: producto escalar 0.', '$(a,b)$ و$(-b,a)$: الجداء السلمي 0.', '$(a,b)$ and $(-b,a)$: dot product 0.'),
        isSolved: isRight
    },
    {
        id: 106202,
        prompt: say('$\\vec{d}_r=(1,0)$ dela, lortu $45^\\circ$ angelua.', 'Con $\\vec{d}_r=(1,0)$, consigue un ángulo de $45^\\circ$.', 'مع $\\vec{d}_r=(1,0)$ احصل على زاوية $45^\\circ$.', 'With $\\vec{d}_r=(1,0)$, get an angle of $45^\\circ$.'),
        hint: say('Diagonal batek bi koordenatu berdinak ditu, balio absolutuan.', 'Una diagonal tiene las dos coordenadas iguales en valor absoluto.', 'للقطر مركّبتان متساويتان بالقيمة المطلقة.', 'A diagonal has both coordinates equal in absolute value.'),
        isSolved: (state) => samePair(state.r, [1, 0]) && isHalfRight(state)
    },
    {
        id: 106203,
        prompt: say('$\\vec{d}_r=(1,2)$ dela, lortu $45^\\circ$ angelua.', 'Con $\\vec{d}_r=(1,2)$, consigue un ángulo de $45^\\circ$.', 'مع $\\vec{d}_r=(1,2)$ احصل على زاوية $45^\\circ$.', 'With $\\vec{d}_r=(1,2)$, get an angle of $45^\\circ$.'),
        hint: say('Biratu $(1,2)$ $45^\\circ$: $(a-b,a+b)$.', 'Gira $(1,2)$ $45^\\circ$: $(a-b,a+b)$.', 'أدِر $(1,2)$ بزاوية $45^\\circ$: $(a-b,a+b)$.', 'Turn $(1,2)$ through $45^\\circ$: $(a-b,a+b)$.'),
        isSolved: (state) => samePair(state.r, [1, 2]) && isHalfRight(state)
    },
    {
        id: 106204,
        prompt: say('Egin bi zuzenak bat etor daitezen, bektore desberdinekin.', 'Haz que las dos rectas coincidan con vectores distintos.', 'اجعل المستقيمين منطبقين بمتجهين مختلفين.', 'Make the two lines coincide with different vectors.'),
        hint: say('Bektore paraleloak: $\\vec{d}_s=k\\,\\vec{d}_r$, $k\\neq 1$ izanik.', 'Vectores paralelos: $\\vec{d}_s=k\\,\\vec{d}_r$ con $k\\neq 1$.', 'متجهان متوازيان: $\\vec{d}_s=k\\,\\vec{d}_r$ مع $k\\neq 1$.', 'Parallel vectors: $\\vec{d}_s=k\\,\\vec{d}_r$ with $k\\neq 1$.'),
        isSolved: (state) => isSameLine(state) && !samePair(state.r, state.s)
    },
    {
        id: 106205,
        prompt: say('Lortu $45^\\circ$ angelua, zuzen horizontal eta bertikalik gabe.', 'Consigue un ángulo de $45^\\circ$ sin rectas horizontales ni verticales.', 'احصل على زاوية $45^\\circ$ دون مستقيمات أفقية أو رأسية.', 'Get an angle of $45^\\circ$ with no horizontal or vertical lines.'),
        hint: say('Koordenatu guztiak zero ez: adibidez $(1,3)$ eta $(-1,2)$.', 'Ninguna coordenada cero: por ejemplo $(1,3)$ y $(-1,2)$.', 'لا مركّبة صفرية: مثلًا $(1,3)$ و$(-1,2)$.', 'No zero coordinate: for example $(1,3)$ and $(-1,2)$.'),
        isSolved: (state) => isHalfRight(state) && [...state.r, ...state.s].every((value) => value !== 0)
    }
]

/** Endless practice: a fixed first line and the angle the second one has to make */
const lineAngleMaker: LabChallengeMaker<LineAngleState> = (random) => {
    for (;;) {
        const r: Pair = [randomInt(random, -3, 3), randomInt(random, -3, 3)]
        if (isZero(r)) continue
        const kind = randomInt(random, 0, 2)
        const s: Pair = kind === 0 ? [-r[1], r[0]] : kind === 1 ? [r[0] - r[1], r[0] + r[1]] : [-r[0], -r[1]]
        if (Math.abs(s[0]) > ANGLE_LIMIT || Math.abs(s[1]) > ANGLE_LIMIT) continue
        const degrees = [90, 45, 0][kind]
        const check = [isRight, isHalfRight, isSameLine][kind]
        return {
            prompt: say(`$\\vec{d}_r=(${r[0]},${r[1]})$ dela, lortu $${degrees}^\\circ$ angelua.`, `Con $\\vec{d}_r=(${r[0]},${r[1]})$, consigue un ángulo de $${degrees}^\\circ$.`, `مع $\\vec{d}_r=(${r[0]},${r[1]})$ احصل على زاوية $${degrees}^\\circ$.`, `With $\\vec{d}_r=(${r[0]},${r[1]})$, get an angle of $${degrees}^\\circ$.`),
            hint: [
                say('Perpendikularra: $(-b,a)$.', 'Perpendicular: $(-b,a)$.', 'العمودي: $(-b,a)$.', 'Perpendicular: $(-b,a)$.'),
                say('$45^\\circ$ biratuta: $(a-b,a+b)$.', 'Girado $45^\\circ$: $(a-b,a+b)$.', 'بعد الدوران $45^\\circ$: $(a-b,a+b)$.', 'Turned through $45^\\circ$: $(a-b,a+b)$.'),
                say('Zuzen bera: bektore paralelo bat.', 'La misma recta: un vector paralelo.', 'المستقيم نفسه: متجه موازٍ.', 'The same line: a parallel vector.')
            ][kind],
            isSolved: (state) => samePair(state.r, r) && check(state),
            solution: { r, s, prediction: null }
        }
    }
}

export const lineAngleExtra = freshFrom(initialLineAngleState, lineAngleMaker)
