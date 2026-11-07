import { randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { compareTo, freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'
import { samePair, type Pair } from './pencil.ts'

/* ==========================================================================
   L4 · Biderik laburrena (La distancia más corta): a line r from a short
   list, a point P and a point Q that walks along r in whole steps. The
   learner first predicts whether the distance from P to r is less than,
   equal to or more than |PQ|; then both lengths appear, and ▶ slides Q
   to the foot of the perpendicular, where |PQ| is smallest and equals
   |Ax₀ + By₀ + C| / √(A² + B²). Exact comparisons use whole numbers:
   d(P, r)² = (Ax₀ + By₀ + C)² / (A² + B²). Pure logic.
   ========================================================================== */

export interface ShortLine {
    A: number
    B: number
    C: number
    /** A whole point of the line and the whole step between neighbours */
    start: Pair
    step: Pair
}

export const SHORT_LINES: ShortLine[] = [
    { A: 1, B: -1, C: 1, start: [0, 1], step: [1, 1] },
    { A: 3, B: 4, C: -12, start: [0, 3], step: [4, -3] },
    { A: 1, B: 2, C: -4, start: [0, 2], step: [2, -1] },
    { A: 2, B: -1, C: -2, start: [0, -2], step: [1, 2] }
]

export const SHORT_POINT_LIMIT = 5
/** Q stays on the board: |x|, |y| ≤ 6 */
const BOARD = 6

export interface ShortestState {
    /** Index in SHORT_LINES */
    line: number
    p: Pair
    /** Q = start + t · step */
    t: number
    prediction: Prediction | null
}

export const initialShortestState: ShortestState = { line: 0, p: [2, 4], t: 0, prediction: null }

/** The whole steps t that keep Q on the board */
export function stepRange(index: number): { min: number; max: number } {
    const { start, step } = SHORT_LINES[index]
    let min = 0
    let max = 0
    const inside = (t: number) => Math.abs(start[0] + t * step[0]) <= BOARD && Math.abs(start[1] + t * step[1]) <= BOARD
    while (inside(min - 1)) min -= 1
    while (inside(max + 1)) max += 1
    return { min, max }
}

const clampPoint = (value: number) => Math.min(SHORT_POINT_LIMIT, Math.max(-SHORT_POINT_LIMIT, Math.round(value)))

export function setShortest(state: ShortestState, patch: Partial<Omit<ShortestState, 'prediction'>>): ShortestState {
    const line = patch.line === undefined ? state.line : Math.min(SHORT_LINES.length - 1, Math.max(0, Math.round(patch.line)))
    const p: Pair = patch.p ? [clampPoint(patch.p[0]), clampPoint(patch.p[1])] : state.p
    const range = stepRange(line)
    const t = Math.min(range.max, Math.max(range.min, Math.round(patch.t ?? state.t)))
    const same = line === state.line && samePair(p, state.p) && t === state.t
    return { line, p, t, prediction: same ? state.prediction : null }
}

export const lineOf = (state: Pick<ShortestState, 'line'>) => SHORT_LINES[state.line]

export function pointQ(state: Pick<ShortestState, 'line' | 't'>): Pair {
    const { start, step } = lineOf(state)
    return [start[0] + state.t * step[0], start[1] + state.t * step[1]]
}

/** Ax₀ + By₀ + C for P */
export function valueAt(state: Pick<ShortestState, 'line' | 'p'>) {
    const { A, B, C } = lineOf(state)
    return A * state.p[0] + B * state.p[1] + C
}

export const normalSquare = (state: Pick<ShortestState, 'line'>) => lineOf(state).A ** 2 + lineOf(state).B ** 2
export const distanceOf = (state: Pick<ShortestState, 'line' | 'p'>) => Math.abs(valueAt(state)) / Math.sqrt(normalSquare(state))
export function pqSquare(state: Pick<ShortestState, 'line' | 'p' | 't'>) {
    const q = pointQ(state)
    return (state.p[0] - q[0]) ** 2 + (state.p[1] - q[1]) ** 2
}

/** The foot of the perpendicular from P: P − (Ax₀ + By₀ + C)/(A² + B²) · (A, B) */
export function footOf(state: Pick<ShortestState, 'line' | 'p'>): [number, number] {
    const { A, B } = lineOf(state)
    const k = valueAt(state) / normalSquare(state)
    return [state.p[0] - k * A, state.p[1] - k * B]
}

/** Q is exactly the foot, compared with whole numbers */
export function isFoot(state: Pick<ShortestState, 'line' | 'p' | 't'>) {
    const { A, B } = lineOf(state)
    const n = normalSquare(state)
    const value = valueAt(state)
    const q = pointQ(state)
    return q[0] * n === state.p[0] * n - value * A && q[1] * n === state.p[1] * n - value * B
}

/** d(P, r) against |PQ|, with whole numbers: (Ax₀ + By₀ + C)² against |PQ|² · (A² + B²) */
export const shortestPrediction = (state: ShortestState): Prediction => compareTo(valueAt(state) ** 2, pqSquare(state) * normalSquare(state))

/** Ax + By + C = 0 in LaTeX */
export function generalLatex({ A, B, C }: Pick<ShortLine, 'A' | 'B' | 'C'>) {
    const parts: string[] = []
    const add = (coefficient: number, name: string) => {
        if (coefficient === 0) return
        const sign = coefficient < 0 ? '-' : parts.length === 0 ? '' : '+'
        const size = Math.abs(coefficient) === 1 && name ? '' : String(Math.abs(coefficient))
        parts.push(`${sign}${size}${name}`)
    }
    add(A, 'x')
    add(B, 'y')
    add(C, '')
    return `${parts.join('')}=0`
}

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const lineText = (index: number) => `$r$: $${generalLatex(SHORT_LINES[index])}$`

export const shortestChallenges: LabChallenge<ShortestState>[] = [
    {
        id: 106301,
        prompt: say(`${lineText(0)} zuzenean, eraman $Q$ $P(3,0)$ puntutik hurbilen dagoen puntura.`, `En ${lineText(0)}, lleva $Q$ al punto más cercano a $P(3,0)$.`, `على ${lineText(0)} انقل $Q$ إلى أقرب نقطة من $P(3,0)$.`, `On ${lineText(0)}, take $Q$ to the point closest to $P(3,0)$.`),
        hint: say('Hurbilena perpendikularraren oina da: $\\overrightarrow{PQ}$ normalaren paraleloa.', 'El más cercano es el pie de la perpendicular: $\\overrightarrow{PQ}$ paralelo al normal.', 'الأقرب هو موقع العمود: $\\overrightarrow{PQ}$ موازٍ للناظمي.', 'The closest one is the foot of the perpendicular: $\\overrightarrow{PQ}$ parallel to the normal.'),
        isSolved: (state) => state.line === 0 && samePair(state.p, [3, 0]) && isFoot(state)
    },
    {
        id: 106302,
        prompt: say(`Jarri $P$ ${lineText(1)} zuzenetik $2$ distantziara.`, `Pon $P$ a distancia $2$ de ${lineText(1)}.`, `ضع $P$ على بعد $2$ من ${lineText(1)}.`, `Put $P$ at distance $2$ from ${lineText(1)}.`),
        hint: say('$|3x+4y-12|=2\\cdot 5=10$.', '$|3x+4y-12|=2\\cdot 5=10$.', '$|3x+4y-12|=2\\cdot 5=10$.', '$|3x+4y-12|=2\\cdot 5=10$.'),
        isSolved: (state) => state.line === 1 && Math.abs(valueAt(state)) === 10
    },
    {
        id: 106303,
        prompt: say(`Jarri $P$ ${lineText(2)} zuzenaren gainean.`, `Pon $P$ sobre ${lineText(2)}.`, `ضع $P$ على ${lineText(2)}.`, `Put $P$ on ${lineText(2)}.`),
        hint: say('Distantzia 0: $P$ puntuak ekuazioa betetzen du.', 'Distancia 0: $P$ cumple la ecuación.', 'المسافة 0: ‏$P$ تحقق المعادلة.', 'Distance 0: $P$ satisfies the equation.'),
        isSolved: (state) => state.line === 2 && valueAt(state) === 0
    },
    {
        id: 106304,
        prompt: say(`${lineText(3)} zuzenean, eraman $Q$ $P(0,3)$ puntutik hurbilen dagoen puntura.`, `En ${lineText(3)}, lleva $Q$ al punto más cercano a $P(0,3)$.`, `على ${lineText(3)} انقل $Q$ إلى أقرب نقطة من $P(0,3)$.`, `On ${lineText(3)}, take $Q$ to the point closest to $P(0,3)$.`),
        hint: say('$\\overrightarrow{PQ}$ eta $\\vec{d}=(1,2)$ perpendikularrak izan behar dira.', '$\\overrightarrow{PQ}$ y $\\vec{d}=(1,2)$ tienen que ser perpendiculares.', 'يجب أن يتعامد $\\overrightarrow{PQ}$ و$\\vec{d}=(1,2)$.', '$\\overrightarrow{PQ}$ and $\\vec{d}=(1,2)$ have to be perpendicular.'),
        isSolved: (state) => state.line === 3 && samePair(state.p, [0, 3]) && isFoot(state)
    },
    {
        id: 106305,
        prompt: say(`Jarri $P$ ${lineText(1)} zuzenetik $5$ distantziara.`, `Pon $P$ a distancia $5$ de ${lineText(1)}.`, `ضع $P$ على بعد $5$ من ${lineText(1)}.`, `Put $P$ at distance $5$ from ${lineText(1)}.`),
        hint: say('$|3x+4y-12|=25$: $3x+4y=37$ edo $3x+4y=-13$.', '$|3x+4y-12|=25$: $3x+4y=37$ o $3x+4y=-13$.', '$|3x+4y-12|=25$: ‏$3x+4y=37$ أو $3x+4y=-13$.', '$|3x+4y-12|=25$: $3x+4y=37$ or $3x+4y=-13$.'),
        isSolved: (state) => state.line === 1 && Math.abs(valueAt(state)) === 25
    }
]

/** Endless practice: a line, a point and the closest point of the line, always a whole point */
const shortestMaker: LabChallengeMaker<ShortestState> = (random) => {
    for (;;) {
        const line = randomInt(random, 0, SHORT_LINES.length - 1)
        const { A, B, start, step } = SHORT_LINES[line]
        const range = stepRange(line)
        const t = randomInt(random, range.min, range.max)
        const k = randomInt(random, -2, 2)
        if (k === 0) continue
        const p: Pair = [start[0] + t * step[0] + k * A, start[1] + t * step[1] + k * B]
        if (Math.abs(p[0]) > SHORT_POINT_LIMIT || Math.abs(p[1]) > SHORT_POINT_LIMIT) continue
        return {
            prompt: say(`${lineText(line)} zuzenean, eraman $Q$ $P(${p[0]},${p[1]})$ puntutik hurbilen dagoen puntura.`, `En ${lineText(line)}, lleva $Q$ al punto más cercano a $P(${p[0]},${p[1]})$.`, `على ${lineText(line)} انقل $Q$ إلى أقرب نقطة من $P(${p[0]},${p[1]})$.`, `On ${lineText(line)}, take $Q$ to the point closest to $P(${p[0]},${p[1]})$.`),
            hint: say('Hurbilena perpendikularraren oina da; ▶ botoiak erakusten du.', 'El más cercano es el pie de la perpendicular; el botón ▶ lo enseña.', 'الأقرب هو موقع العمود؛ والزر ▶ يبيّنه.', 'The closest one is the foot of the perpendicular; the ▶ button shows it.'),
            isSolved: (state) => state.line === line && samePair(state.p, p) && isFoot(state),
            solution: { line, p, t, prediction: null }
        }
    }
}

export const shortestExtra = freshFrom(initialShortestState, shortestMaker)
