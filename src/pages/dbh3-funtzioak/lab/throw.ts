import { pick } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { compareTo, freshFrom, type Prediction } from './prediction.ts'

/* ==========================================================================
   L4 · Jaurtiketa (El lanzamiento): a ball is thrown straight up at v m/s
   from a height h₀; its height is h(t) = h₀ + vt − 5t², a parabola that
   opens downwards. The learner sets v, h₀ and a time cursor. The vertex
   is at t = v/10 (that is −b/2a) and the highest point h₀ + v²/20. First a
   guess: will the ball be highest before, at or after 2 s? ▶ throws it.
   ========================================================================== */

export const THROW_LIMITS = { v: { min: 5, max: 30, step: 5 }, h0: { min: 0, max: 20, step: 5 }, t: { min: 0, max: 6, step: 0.5 } } as const

export interface ThrowState {
    v: number
    h0: number
    t: number
    prediction: Prediction | null
}

export const initialThrowState: ThrowState = { v: 15, h0: 0, t: 0.5, prediction: null }

const snap = (value: number, { min, max, step }: { min: number; max: number; step: number }) => Math.min(max, Math.max(min, Math.round(value / step) * step))

export function setThrow(state: ThrowState, patch: Partial<Pick<ThrowState, 'v' | 'h0' | 't'>>): ThrowState {
    const v = snap(patch.v ?? state.v, THROW_LIMITS.v)
    const h0 = snap(patch.h0 ?? state.h0, THROW_LIMITS.h0)
    const t = snap(patch.t ?? state.t, THROW_LIMITS.t)
    return { v, h0, t, prediction: v === state.v && h0 === state.h0 ? state.prediction : null }
}

/** Height in metres at time t; the ball stays on the ground once it lands */
export const throwHeight = (state: Pick<ThrowState, 'v' | 'h0'>, t: number) => Math.max(0, state.h0 + state.v * t - 5 * t * t)
export const throwVertex = (state: Pick<ThrowState, 'v' | 'h0'>) => ({ t: state.v / 10, h: state.h0 + (state.v * state.v) / 20 })
export const throwLanding = (state: Pick<ThrowState, 'v' | 'h0'>) => (state.v + Math.sqrt(state.v * state.v + 20 * state.h0)) / 10
/** Highest before (<), at (=) or after (>) 2 s? */
export const throwPrediction = (state: ThrowState): Prediction => compareTo(throwVertex(state).t, 2)

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const tex = (value: number) => String(value).replace('.', '{,}')
const formula = (v: number, h0: number) => `h=${h0 === 0 ? '' : `${h0}+`}${v}t-5t^{2}`
const same = (latex: string) => say(`$${latex}$`, `$${latex}$`, `$${latex}$`, `$${latex}$`)

const toTop = (v: number, h0: number) => say(
    `Jaurti $${formula(v, h0)}$ eta jarri kurtsorea punturik altuenean.`,
    `Lanza con $${formula(v, h0)}$ y pon el cursor en el punto más alto.`,
    `ارمِ بـ$${formula(v, h0)}$ وضع المؤشر عند أعلى نقطة.`,
    `Throw with $${formula(v, h0)}$ and put the cursor at the highest point.`
)
const toGround = (v: number, h0: number) => say(
    `Jaurti $${formula(v, h0)}$ eta jarri kurtsorea pilota lurrera iristen den unean.`,
    `Lanza con $${formula(v, h0)}$ y pon el cursor en el momento en que la pelota llega al suelo.`,
    `ارمِ بـ$${formula(v, h0)}$ وضع المؤشر لحظة وصول الكرة إلى الأرض.`,
    `Throw with $${formula(v, h0)}$ and put the cursor at the moment the ball reaches the ground.`
)
const is = (v: number, h0: number, t: number) => (state: ThrowState) => state.v === v && state.h0 === h0 && state.t === t

export const throwChallenges: LabChallenge<ThrowState>[] = [
    { id: 38401, prompt: say('Jaurti pilota lurretik $20$ m-ko altueraraino igo dadin.', 'Lanza la pelota desde el suelo para que suba hasta $20$ m.', 'ارمِ الكرة من الأرض لتصعد إلى $20$ م.', 'Throw the ball from the ground so that it rises to $20$ m.'), hint: same('h_{max}=\\frac{v^{2}}{20}'), isSolved: (state) => state.h0 === 0 && throwVertex(state).h === 20 },
    { id: 38402, prompt: toTop(25, 0), hint: same('t_{v}=\\frac{-b}{2a}=\\frac{v}{10}'), isSolved: is(25, 0, 2.5) },
    { id: 38403, prompt: say('Lurretik jaurtita, egin pilota zehazki $4$ s-tan lurrera itzul dadin.', 'Desde el suelo, haz que la pelota vuelva al suelo justo a los $4$ s.', 'من الأرض، اجعل الكرة تعود إلى الأرض بعد $4$ ث تمامًا.', 'From the ground, make the ball come back down after exactly $4$ s.'), hint: say('Erpina erdian dago: $t=2$.', 'El vértice está en medio: $t=2$.', 'الرأس في المنتصف: $t=2$.', 'The vertex is halfway: $t=2$.'), isSolved: (state) => state.h0 === 0 && throwLanding(state) === 4 },
    { id: 38404, prompt: toGround(10, 15), hint: same('15+10t-5t^{2}=0'), isSolved: is(10, 15, 3) },
    { id: 38405, prompt: say('$h=20t-5t^{2}$: jarri kurtsorea pilota $15$ m-ra dagoenean, jaisten ari dela.', '$h=20t-5t^{2}$: pon el cursor cuando la pelota está a $15$ m, ya bajando.', '$h=20t-5t^{2}$: ضع المؤشر عندما تكون الكرة على $15$ م وهي نازلة.', '$h=20t-5t^{2}$: put the cursor when the ball is at $15$ m, on the way down.'), hint: say('Bi une daude: $t=1$ eta beste bat, erpinaren ondoren.', 'Hay dos momentos: $t=1$ y otro, después del vértice.', 'هناك لحظتان: $t=1$ وأخرى بعد الرأس.', 'There are two moments: $t=1$ and another one after the vertex.'), isSolved: is(20, 0, 3) }
]

/** Endless practice: the top of a throw, or its landing when it falls on a half second */
const throwMaker: LabChallengeMaker<ThrowState> = (random) => {
    const v = pick(random, [5, 10, 15, 20, 25, 30])
    const h0 = pick(random, [0, 5, 10, 15, 20])
    const landing = throwLanding({ v, h0 })
    if (pick(random, [true, false]) && Number.isInteger(landing * 2) && landing <= THROW_LIMITS.t.max) {
        return { prompt: toGround(v, h0), hint: same(`${h0}+${v}t-5t^{2}=0`), isSolved: is(v, h0, landing), solution: { v, h0, t: landing, prediction: null } }
    }
    return { prompt: toTop(v, h0), hint: same(`t_{v}=\\frac{${v}}{10}=${tex(v / 10)}`), isSolved: is(v, h0, v / 10), solution: { v, h0, t: v / 10, prediction: null } }
}

export const throwExtra = freshFrom(initialThrowState, throwMaker)
