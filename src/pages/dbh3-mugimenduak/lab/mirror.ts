import { pick, randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { placeFlag, reflect, type Axis, type Point } from '../motion.ts'
import { compareTo, freshFrom, type Prediction } from './prediction.ts'

/* ==========================================================================
   L3 · Ispilua (El espejo): the flag stands with its foot at (1, 0) and
   its tip P at (3, 2); the learner places a mirror: the line x = k, the
   line y = k or the diagonal y = x. First a guess: will the tip P′ be to
   the left of P, level with it or to its right? ▶ folds the flag over
   the mirror.
   ========================================================================== */

export type MirrorKind = Axis['kind']
export const MIRROR_KINDS: MirrorKind[] = ['vertical', 'horizontal', 'diagonal']
export const MIRROR_K = { min: -3, max: 3 } as const
export const MIRROR_START: Point = [1, 0]

export interface MirrorState {
    kind: MirrorKind
    k: number
    prediction: Prediction | null
}

export const initialMirrorState: MirrorState = { kind: 'vertical', k: 1, prediction: null }

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value)))

export function setMirror(state: MirrorState, patch: Partial<Pick<MirrorState, 'kind' | 'k'>>): MirrorState {
    const kind = patch.kind ?? state.kind
    const k = clamp(patch.k ?? state.k, MIRROR_K.min, MIRROR_K.max)
    return { kind, k, prediction: kind === state.kind && k === state.k ? state.prediction : null }
}

export const mirrorAxis = ({ kind, k }: Pick<MirrorState, 'kind' | 'k'>): Axis => (kind === 'diagonal' ? { kind } : { kind, at: k })
export const mirrorFlag = (state: Pick<MirrorState, 'kind' | 'k'>) => placeFlag(MIRROR_START).map((point) => reflect(point, mirrorAxis(state)))
export const mirrorTip = (state: Pick<MirrorState, 'kind' | 'k'>) => mirrorFlag(state)[2]
/** Left of P (<), level with it (=) or right of it (>)? */
export const mirrorPrediction = (state: MirrorState): Prediction => compareTo(mirrorTip(state)[0], 3)

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const tipAt = (x: number, y: number) => (state: MirrorState) => mirrorTip(state)[0] === x && mirrorTip(state)[1] === y
const tipTo = (x: number, y: number) => say(`Jarri ispilua $P$ punta $(${x},${y})$ puntuan islatzeko.`, `Coloca el espejo para que la punta $P$ se refleje en $(${x},${y})$.`, `ضع المرآة لتنعكس النقطة $P$ في $(${x},${y})$.`, `Place the mirror so that the tip $P$ is reflected to $(${x},${y})$.`)
const formula = (latex: string) => say(`$${latex}$`, `$${latex}$`, `$${latex}$`, `$${latex}$`)

export const mirrorChallenges: LabChallenge<MirrorState>[] = [
    { id: 97301, prompt: tipTo(-3, 2), hint: say('Y ardatza: $x=0$.', 'El eje Y: $x=0$.', 'محور Y: $x=0$.', 'The Y axis: $x=0$.'), isSolved: tipAt(-3, 2) },
    { id: 97302, prompt: tipTo(3, -2), hint: say('X ardatza: $y=0$.', 'El eje X: $y=0$.', 'محور X: $y=0$.', 'The X axis: $y=0$.'), isSolved: tipAt(3, -2) },
    { id: 97303, prompt: tipTo(2, 3), hint: formula('(x,y)\\to(y,x)'), isSolved: tipAt(2, 3) },
    { id: 97304, prompt: tipTo(1, 2), hint: formula('2k-3=1'), isSolved: tipAt(1, 2) },
    { id: 97305, prompt: say('Eraman banderaren oina $(5,0)$ puntura.', 'Lleva el pie de la bandera al punto $(5,0)$.', 'انقل قاعدة العلم إلى النقطة $(5,0)$.', 'Take the foot of the flag to the point $(5,0)$.'), hint: formula('2k-1=5'), isSolved: (state) => mirrorFlag(state)[0][0] === 5 && mirrorFlag(state)[0][1] === 0 }
]

/** Endless practice: a point to reflect the tip to */
const mirrorMaker: LabChallengeMaker<MirrorState> = (random) => {
    const kind = pick(random, MIRROR_KINDS)
    const k = kind === 'diagonal' ? 0 : randomInt(random, MIRROR_K.min, MIRROR_K.max)
    const [x, y] = mirrorTip({ kind, k })
    return { prompt: tipTo(x, y), hint: kind === 'diagonal' ? formula('y=x') : formula(`${kind === 'vertical' ? 'x' : 'y'}=${k}`), isSolved: tipAt(x, y), solution: { kind, k, prediction: null } }
}

export const mirrorExtra = freshFrom(initialMirrorState, mirrorMaker)
