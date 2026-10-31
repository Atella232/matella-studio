import { randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { compareTo, freshFrom, type Prediction } from './prediction.ts'

/* ==========================================================================
   L1 · Angelu inskribatua (El ángulo inscrito): A and B sit at the bottom
   of a circle and span an arc of `central` degrees; P moves round the
   circle. The angle APB is worked out from the points, not from the rule,
   and it is always half the central angle when P is on the far arc (and
   180° minus that half on the near arc). The learner predicts whether the
   angle at P is acute, right or obtuse; ▶ takes P all the way round.
   ========================================================================== */

export const CENTRAL = { min: 20, max: 340, step: 10 } as const

export interface InscribedState {
    central: number
    /** The position of P on the circle, in degrees (0 = right, 90 = top) */
    p: number
    prediction: Prediction | null
}

export const initialInscribedState: InscribedState = { central: 80, p: 90, prediction: null }

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value)))
const wrap = (degrees: number) => ((Math.round(degrees) % 360) + 360) % 360

/** A and B, on either side of the bottom of the circle */
export const pointA = (central: number) => wrap(270 - central / 2)
export const pointB = (central: number) => wrap(270 + central / 2)

/** P never sits on A or B: it moves one more step on */
export function setInscribed(state: InscribedState, patch: Partial<Pick<InscribedState, 'central' | 'p'>>): InscribedState {
    const central = clamp(patch.central ?? state.central, CENTRAL.min, CENTRAL.max)
    let p = wrap(patch.p ?? state.p)
    if (p === pointA(central) || p === pointB(central)) p = wrap(p + 10)
    const same = central === state.central && p === state.p
    return { central, p, prediction: same ? state.prediction : null }
}

const at = (degrees: number) => [Math.cos((degrees * Math.PI) / 180), Math.sin((degrees * Math.PI) / 180)]

/** The angle APB in degrees, from the coordinates of the three points */
export function angleAt(central: number, p: number): number {
    const [px, py] = at(p)
    const [ax, ay] = at(pointA(central))
    const [bx, by] = at(pointB(central))
    const u = [ax - px, ay - py]
    const v = [bx - px, by - py]
    const cos = (u[0] * v[0] + u[1] * v[1]) / (Math.hypot(u[0], u[1]) * Math.hypot(v[0], v[1]))
    return Math.round((Math.acos(Math.max(-1, Math.min(1, cos))) * 180) / Math.PI * 1000) / 1000
}

export const inscribedAngle = (state: Pick<InscribedState, 'central' | 'p'>) => angleAt(state.central, state.p)
/** Is P on the arc between A and B that the central angle spans (the bottom one)? */
export const onNearArc = ({ central, p }: Pick<InscribedState, 'central' | 'p'>) => Math.abs(((p - 270 + 540) % 360) - 180) < central / 2
/** Acute (<), right (=) or obtuse (>)? */
export const inscribedPrediction = (state: InscribedState): Prediction => compareTo(inscribedAngle(state), 90)

export const setInscribedPrediction = (state: InscribedState, prediction: Prediction): InscribedState => (state.prediction === null ? { ...state, prediction } : state)

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const angleIs = (degrees: number) => (state: InscribedState) => Math.abs(inscribedAngle(state) - degrees) < 1e-6

export const inscribedChallenges: LabChallenge<InscribedState>[] = [
    { id: 95101, prompt: say('Lortu $P$ puntuan angelu zuzena.', 'Consigue un ángulo recto en $P$.', 'احصل على زاوية قائمة عند $P$.', 'Get a right angle at $P$.'), hint: say('$A$ eta $B$ diametro baten muturrak badira…', 'Si $A$ y $B$ son los extremos de un diámetro…', 'إذا كان $A$ و$B$ طرفي قطر…', 'If $A$ and $B$ are the ends of a diameter…'), isSolved: angleIs(90) },
    { id: 95102, prompt: say('Zentrala $100°$ dela, lortu $P$ puntuan $50°$.', 'Con el central de $100°$, consigue $50°$ en $P$.', 'مع مركزية $100°$ احصل على $50°$ عند $P$.', 'With a central angle of $100°$, get $50°$ at $P$.'), hint: say('Eraman $P$ goiko arkura.', 'Lleva $P$ al arco de arriba.', 'انقل $P$ إلى القوس العلوي.', 'Move $P$ to the top arc.'), isSolved: (state) => state.central === 100 && angleIs(50)(state) },
    { id: 95103, prompt: say('Lortu $P$ puntuan $130°$-ko angelu kamutsa.', 'Consigue en $P$ un ángulo obtuso de $130°$.', 'احصل عند $P$ على زاوية منفرجة $130°$.', 'Get an obtuse angle of $130°$ at $P$.'), hint: say('Beheko arkuan: $180°-\\frac{100°}{2}$.', 'En el arco de abajo: $180°-\\frac{100°}{2}$.', 'على القوس السفلي: $180°-\\frac{100°}{2}$.', 'On the bottom arc: $180°-\\frac{100°}{2}$.'), isSolved: angleIs(130) },
    { id: 95104, prompt: say('Lortu $P$ puntuan $35°$.', 'Consigue $35°$ en $P$.', 'احصل على $35°$ عند $P$.', 'Get $35°$ at $P$.'), hint: say('Zentrala bikoitza da.', 'El central es el doble.', 'المركزية ضعفها.', 'The central one is double.'), isSolved: angleIs(35) },
    { id: 95105, prompt: say('$P$ goian dagoela ($90°$ posizioan), lortu $80°$.', 'Con $P$ arriba (en la posición $90°$), consigue $80°$.', 'و$P$ في الأعلى (الموضع $90°$) احصل على $80°$.', 'With $P$ at the top (position $90°$), get $80°$.'), hint: say('Zentrala: $160°$.', 'Central: $160°$.', 'المركزية: $160°$.', 'Central: $160°$.'), isSolved: (state) => state.p === 90 && angleIs(80)(state) }
]

/** Endless practice: an angle at P to reach */
const inscribedMaker: LabChallengeMaker<InscribedState> = (random) => {
    const target = randomInt(random, 2, 16) * 5
    return {
        prompt: say(`Lortu $${target}°$ $P$ puntuan.`, `Consigue $${target}°$ en $P$.`, `احصل على $${target}°$ عند $P$.`, `Get $${target}°$ at $P$.`),
        hint: say(`Zentrala: $${2 * target}°$, eta $P$ goiko arkuan.`, `Central: $${2 * target}°$, y $P$ en el arco de arriba.`, `المركزية: $${2 * target}°$، و$P$ على القوس العلوي.`, `Central: $${2 * target}°$, with $P$ on the top arc.`),
        isSolved: angleIs(target),
        solution: { central: 2 * target, p: 90, prediction: null }
    }
}

export const inscribedExtra = freshFrom(initialInscribedState, inscribedMaker)
