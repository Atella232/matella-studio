import { randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { modulus, placeFlag, translate, type Point } from '../motion.ts'
import { compareTo, freshFrom, type Prediction } from './prediction.ts'

/* ==========================================================================
   L1 · Lekualdatu (Desliza la bandera): the flag stands with its foot at
   (−3, −2) and its tip at (−1, 0); the learner chooses the vector (a, b)
   and the whole flag moves by it, without turning. First a guess: will
   the flag travel less than, exactly or more than 5 units (the length of
   the vector)? ▶ slides it along the vector.
   ========================================================================== */

export const SLIDE_START: Point = [-3, -2]
export const SLIDE_LIMITS = { a: { min: -4, max: 6 }, b: { min: -3, max: 4 } } as const

export interface SlideState {
    a: number
    b: number
    prediction: Prediction | null
}

export const initialSlideState: SlideState = { a: 1, b: 1, prediction: null }

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value)))

export function setSlide(state: SlideState, patch: Partial<Pick<SlideState, 'a' | 'b'>>): SlideState {
    const a = clamp(patch.a ?? state.a, SLIDE_LIMITS.a.min, SLIDE_LIMITS.a.max)
    const b = clamp(patch.b ?? state.b, SLIDE_LIMITS.b.min, SLIDE_LIMITS.b.max)
    return { a, b, prediction: a === state.a && b === state.b ? state.prediction : null }
}

export const slideFlag = (state: Pick<SlideState, 'a' | 'b'>) => placeFlag(SLIDE_START).map((point) => translate(point, [state.a, state.b]))
export const slideTip = (state: Pick<SlideState, 'a' | 'b'>) => slideFlag(state)[2]
export const slideLength = (state: Pick<SlideState, 'a' | 'b'>) => modulus([state.a, state.b])
/** Shorter than (<), exactly (=) or longer than (>) 5 units? */
export const slidePrediction = (state: SlideState): Prediction => compareTo(slideLength(state), 5)

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const tipAt = (x: number, y: number) => (state: SlideState) => slideTip(state)[0] === x && slideTip(state)[1] === y
const tipTo = (x: number, y: number) => say(`Eraman $P$ punta $(${x},${y})$ puntura.`, `Lleva la punta $P$ al punto $(${x},${y})$.`, `انقل الطرف $P$ إلى النقطة $(${x},${y})$.`, `Take the tip $P$ to the point $(${x},${y})$.`)
const vectorHint = (x: number, y: number) => say(`$\\vec{v}=(${x}-(-1),\\ ${y}-0)$`, `$\\vec{v}=(${x}-(-1),\\ ${y}-0)$`, `$\\vec{v}=(${x}-(-1),\\ ${y}-0)$`, `$\\vec{v}=(${x}-(-1),\\ ${y}-0)$`)

export const slideChallenges: LabChallenge<SlideState>[] = [
    { id: 97101, prompt: tipTo(4, 3), hint: vectorHint(4, 3), isSolved: tipAt(4, 3) },
    { id: 97102, prompt: say('Mugitu bandera zehazki 5 unitate, zuzen-zuzen ez.', 'Mueve la bandera exactamente 5 unidades, pero no en línea recta horizontal ni vertical.', 'حرّك العلم 5 وحدات تمامًا، لكن ليس أفقيًا ولا عموديًا.', 'Move the flag exactly 5 units, but not straight across or straight up.'), hint: say('$3^{2}+4^{2}=5^{2}$', '$3^{2}+4^{2}=5^{2}$', '$3^{2}+4^{2}=5^{2}$', '$3^{2}+4^{2}=5^{2}$'), isSolved: (state) => slideLength(state) === 5 && state.a !== 0 && state.b !== 0 },
    { id: 97103, prompt: say('Eraman banderaren oina jatorrira.', 'Lleva el pie de la bandera al origen.', 'انقل قاعدة العلم إلى الأصل.', 'Take the foot of the flag to the origin.'), hint: say('Oina $(-3,-2)$ puntuan dago.', 'El pie está en $(-3,-2)$.', 'القاعدة في $(-3,-2)$.', 'The foot is at $(-3,-2)$.'), isSolved: (state) => state.a === 3 && state.b === 2 },
    { id: 97104, prompt: say('Igo bandera 4 unitate, alboetara mugitu gabe.', 'Sube la bandera 4 unidades sin moverla a los lados.', 'ارفع العلم 4 وحدات دون تحريكه جانبًا.', 'Lift the flag 4 units without moving it sideways.'), hint: same4('\\vec{v}=(0,4)'), isSolved: (state) => state.a === 0 && state.b === 4 },
    { id: 97105, prompt: tipTo(-5, -3), hint: vectorHint(-5, -3), isSolved: tipAt(-5, -3) }
]

function same4(latex: string): LocalizedText {
    return say(`$${latex}$`, `$${latex}$`, `$${latex}$`, `$${latex}$`)
}

/** Endless practice: a point to take the tip to */
const slideMaker: LabChallengeMaker<SlideState> = (random) => {
    const a = randomInt(random, SLIDE_LIMITS.a.min, SLIDE_LIMITS.a.max)
    const b = randomInt(random, SLIDE_LIMITS.b.min, SLIDE_LIMITS.b.max)
    const [x, y] = slideTip({ a, b })
    return { prompt: tipTo(x, y), hint: vectorHint(x, y), isSolved: tipAt(x, y), solution: { a, b, prediction: null } }
}

export const slideExtra = freshFrom(initialSlideState, slideMaker)
