import { pick } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { placeFlag, type Point } from '../motion.ts'
import { compareTo, freshFrom, type Prediction } from './prediction.ts'

/* ==========================================================================
   L4 · Bi ispilu (Dos espejos): the flag is reflected in one mirror and
   then in a second. With parallel mirrors (x = 0 and x = d) the result is
   a translation by 2d; with mirrors that cross at the origin (the X axis
   and a line at angle α) it is a rotation by 2α. First a guess: will the
   flag move less than, exactly as much as or more than the gap between
   the mirrors? ▶ shows the two reflections one after the other.
   ========================================================================== */

export type TwoMirrorsMode = 'parallel' | 'crossing'
export const GAP = { min: -4, max: 4 } as const
export const CROSSING_ANGLES = [0, 15, 30, 45, 60, 75, 90, 120, 135, 150]
export const TWO_MIRRORS_START: Point = [1, 1]

export interface TwoMirrorsState {
    mode: TwoMirrorsMode
    gap: number
    angle: number
    prediction: Prediction | null
}

export const initialTwoMirrorsState: TwoMirrorsState = { mode: 'parallel', gap: 1, angle: 30, prediction: null }

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value)))

export function setTwoMirrors(state: TwoMirrorsState, patch: Partial<Pick<TwoMirrorsState, 'mode' | 'gap' | 'angle'>>): TwoMirrorsState {
    const mode = patch.mode ?? state.mode
    const gap = clamp(patch.gap ?? state.gap, GAP.min, GAP.max)
    const angle = CROSSING_ANGLES.includes(patch.angle ?? state.angle) ? patch.angle ?? state.angle : state.angle
    return { mode, gap, angle, prediction: mode === state.mode && gap === state.gap && angle === state.angle ? state.prediction : null }
}

const tidy = (value: number) => (Math.abs(value - Math.round(value)) < 1e-9 ? Math.round(value) : value)

/** Reflection in the line through the origin at `degrees` to the X axis */
export function reflectAt([x, y]: Point, degrees: number): Point {
    const twice = (2 * degrees * Math.PI) / 180
    return [tidy(x * Math.cos(twice) + y * Math.sin(twice)), tidy(x * Math.sin(twice) - y * Math.cos(twice))]
}

/** The flag after the first mirror and after both */
export function twoMirrorsFlags(state: Pick<TwoMirrorsState, 'mode' | 'gap' | 'angle'>): { once: Point[]; twice: Point[] } {
    const flag = placeFlag(TWO_MIRRORS_START)
    if (state.mode === 'parallel') {
        const once = flag.map(([x, y]) => [-x, y] as Point)
        return { once, twice: once.map(([x, y]) => [2 * state.gap - x, y] as Point) }
    }
    const once = flag.map(([x, y]) => [x, -y] as Point)
    return { once, twice: once.map((point) => reflectAt(point, state.angle)) }
}

/** How far the flag moves: the translation, or the angle of the rotation */
export const twoMirrorsMove = (state: Pick<TwoMirrorsState, 'mode' | 'gap' | 'angle'>) => (state.mode === 'parallel' ? 2 * Math.abs(state.gap) : 2 * state.angle)
/** Less than (<), as much as (=) or more than (>) the gap or angle between the mirrors? */
export const twoMirrorsPrediction = (state: TwoMirrorsState): Prediction => compareTo(twoMirrorsMove(state), state.mode === 'parallel' ? Math.abs(state.gap) : state.angle)

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const formula = (latex: string) => say(`$${latex}$`, `$${latex}$`, `$${latex}$`, `$${latex}$`)
const shiftBy = (units: number) => say(`Bi ispilu paralelorekin, lekualdatu bandera ${Math.abs(units)} unitate ${units > 0 ? 'eskuinera' : 'ezkerrera'}.`, `Con dos espejos paralelos, traslada la bandera ${Math.abs(units)} unidades a la ${units > 0 ? 'derecha' : 'izquierda'}.`, `بمرآتين متوازيتين انقل العلم ${Math.abs(units)} وحدات إلى ${units > 0 ? 'اليمين' : 'اليسار'}.`, `With two parallel mirrors, translate the flag ${Math.abs(units)} units to the ${units > 0 ? 'right' : 'left'}.`)
const turnBy = (degrees: number) => say(`Bi ispilu ebakitzailerekin, biratu bandera $${degrees}°$.`, `Con dos espejos que se cortan, gira la bandera $${degrees}°$.`, `بمرآتين متقاطعتين أدِر العلم $${degrees}°$.`, `With two crossing mirrors, rotate the flag by $${degrees}°$.`)
const shifted = (units: number) => (state: TwoMirrorsState) => state.mode === 'parallel' && 2 * state.gap === units
const turned = (degrees: number) => (state: TwoMirrorsState) => state.mode === 'crossing' && 2 * state.angle === degrees

export const twoMirrorsChallenges: LabChallenge<TwoMirrorsState>[] = [
    { id: 97401, prompt: shiftBy(6), hint: formula('2d=6'), isSolved: shifted(6) },
    { id: 97402, prompt: shiftBy(-8), hint: formula('2d=-8'), isSolved: shifted(-8) },
    { id: 97403, prompt: turnBy(90), hint: formula('2\\alpha=90°'), isSolved: turned(90) },
    { id: 97404, prompt: say('Bi ispiluekin, egin simetria zentrala (180° biraketa).', 'Con dos espejos, haz la simetría central (giro de 180°).', 'بمرآتين أجرِ التناظر المركزي (دوران 180°).', 'With two mirrors, make the central symmetry (a 180° rotation).'), hint: say('Ispilu perpendikularrak.', 'Espejos perpendiculares.', 'مرآتان متعامدتان.', 'Perpendicular mirrors.'), isSolved: turned(180) },
    { id: 97405, prompt: turnBy(60), hint: formula('2\\alpha=60°'), isSolved: turned(60) }
]

/** Endless practice: a translation or a rotation to make */
const twoMirrorsMaker: LabChallengeMaker<TwoMirrorsState> = (random) => {
    if (random() < 0.5) {
        const units = 2 * pick(random, [-4, -3, -2, -1, 1, 2, 3, 4])
        return { prompt: shiftBy(units), hint: formula(`2d=${units}`), isSolved: shifted(units), solution: { mode: 'parallel', gap: units / 2, angle: 30, prediction: null } }
    }
    const angle = pick(random, CROSSING_ANGLES.filter((value) => value > 0))
    return { prompt: turnBy(2 * angle), hint: formula(`2\\alpha=${2 * angle}°`), isSolved: turned(2 * angle), solution: { mode: 'crossing', gap: 1, angle, prediction: null } }
}

export const twoMirrorsExtra = freshFrom(initialTwoMirrorsState, twoMirrorsMaker)
