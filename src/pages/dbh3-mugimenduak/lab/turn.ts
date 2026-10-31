import { pick, randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { placeFlag, rotate, type Point } from '../motion.ts'
import { compareTo, freshFrom, type Prediction } from './prediction.ts'

/* ==========================================================================
   L2 · Biratu (Gira la bandera): the flag stands with its foot at (1, 0)
   and its tip P at (3, 2). The learner chooses the centre of the rotation
   and the angle (a quarter, half or three quarters of a turn). First a
   guess: will the tip P′ end up to the left of P, level with it or to its
   right? ▶ turns the flag through the angle.
   ========================================================================== */

export const TURN_ANGLES = [0, 90, 180, 270]
export const TURN_CENTRE = { min: -3, max: 3 } as const
export const TURN_START: Point = [1, 0]

export interface TurnState {
    angle: number
    centre: Point
    prediction: Prediction | null
}

export const initialTurnState: TurnState = { angle: 0, centre: [0, 0], prediction: null }

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value)))

export function setTurn(state: TurnState, patch: { angle?: number; x?: number; y?: number }): TurnState {
    const angle = TURN_ANGLES.includes(patch.angle ?? state.angle) ? patch.angle ?? state.angle : state.angle
    const centre: Point = [clamp(patch.x ?? state.centre[0], TURN_CENTRE.min, TURN_CENTRE.max), clamp(patch.y ?? state.centre[1], TURN_CENTRE.min, TURN_CENTRE.max)]
    const same = angle === state.angle && centre[0] === state.centre[0] && centre[1] === state.centre[1]
    return { angle, centre, prediction: same ? state.prediction : null }
}

export const turnFlag = (state: Pick<TurnState, 'angle' | 'centre'>, angle = state.angle) => placeFlag(TURN_START).map((point) => rotate(point, angle, state.centre))
export const turnTip = (state: Pick<TurnState, 'angle' | 'centre'>) => turnFlag(state)[2]
/** Left of P (<), level with it (=) or right of it (>)? */
export const turnPrediction = (state: TurnState): Prediction => compareTo(turnTip(state)[0], 3)

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const tipAt = (x: number, y: number) => (state: TurnState) => turnTip(state)[0] === x && turnTip(state)[1] === y
const tipTo = (x: number, y: number) => say(`Biratu bandera $P$ punta $(${x},${y})$ puntuan gera dadin.`, `Gira la bandera para que la punta $P$ quede en $(${x},${y})$.`, `أدِر العلم لتقع النقطة $P$ في $(${x},${y})$.`, `Rotate the flag so that its tip $P$ ends up at $(${x},${y})$.`)

export const turnChallenges: LabChallenge<TurnState>[] = [
    { id: 97201, prompt: tipTo(-2, 3), hint: say('Zentroa $O$, $90°$: $(x,y)\\to(-y,x)$.', 'Centro $O$, $90°$: $(x,y)\\to(-y,x)$.', 'المركز $O$، $90°$: $(x,y)\\to(-y,x)$.', 'Centre $O$, $90°$: $(x,y)\\to(-y,x)$.'), isSolved: tipAt(-2, 3) },
    { id: 97202, prompt: tipTo(-3, -2), hint: say('Simetria zentrala jatorrian.', 'Simetría central en el origen.', 'تناظر مركزي في الأصل.', 'Central symmetry in the origin.'), isSolved: tipAt(-3, -2) },
    { id: 97203, prompt: say('Egin simetria zentrala $(1,1)$ zentroarekin.', 'Haz la simetría central de centro $(1,1)$.', 'أجرِ التناظر المركزي حول $(1,1)$.', 'Do the central symmetry with centre $(1,1)$.'), hint: same('$180°$'), isSolved: (state) => state.angle === 180 && state.centre[0] === 1 && state.centre[1] === 1 },
    { id: 97204, prompt: tipTo(2, -3), hint: say('Hiru laurden: $(x,y)\\to(y,-x)$.', 'Tres cuartos: $(x,y)\\to(y,-x)$.', 'ثلاثة أرباع: $(x,y)\\to(y,-x)$.', 'Three quarters: $(x,y)\\to(y,-x)$.'), isSolved: tipAt(2, -3) },
    { id: 97205, prompt: say('$90°$ biratuz, eraman $P$ punta $(1,4)$ puntura. Zein da zentroa?', 'Girando $90°$, lleva la punta $P$ a $(1,4)$. ¿Cuál es el centro?', 'بدوران $90°$ انقل $P$ إلى $(1,4)$. ما المركز؟', 'Turning $90°$, take the tip $P$ to $(1,4)$. Where is the centre?'), hint: say('Zentroa $P$ eta $P\'$ puntuetatik distantzia berera dago.', 'El centro está a la misma distancia de $P$ y de $P\'$.', 'المركز على البعد نفسه من $P$ و$P\'$.', 'The centre is the same distance from $P$ and $P\'$.'), isSolved: (state) => state.angle === 90 && tipAt(1, 4)(state) }
]

function same(latex: string): LocalizedText {
    return say(`$${latex}$`, `$${latex}$`, `$${latex}$`, `$${latex}$`)
}

/** Endless practice: a point to send the tip to */
const turnMaker: LabChallengeMaker<TurnState> = (random) => {
    const angle = pick(random, [90, 180, 270])
    const centre: Point = [randomInt(random, -2, 2), randomInt(random, -2, 2)]
    const [x, y] = turnTip({ angle, centre })
    return { prompt: tipTo(x, y), hint: say(`$${angle}°$, zentroa $(${centre[0]},${centre[1]})$`, `$${angle}°$, centro $(${centre[0]},${centre[1]})$`, `$${angle}°$، المركز $(${centre[0]},${centre[1]})$`, `$${angle}°$, centre $(${centre[0]},${centre[1]})$`), isSolved: tipAt(x, y), solution: { angle, centre, prediction: null } }
}

export const turnExtra = freshFrom(initialTurnState, turnMaker)
