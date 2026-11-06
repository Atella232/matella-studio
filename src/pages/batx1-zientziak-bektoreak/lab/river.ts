import { pick, randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import { fraction, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { compareTo, freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'

/* ==========================================================================
   L3 · Txalupa eta ibaia (El barco y el río): a river 12 m wide flows to
   the right at c m/s. The boat sets off from the near bank with its own
   velocity (bx, by) relative to the water, by > 0. Its real velocity is
   (bx + c, by); it takes 12/by seconds to cross and lands
   12·(bx + c)/by metres downstream (negative: upstream). The learner
   predicts upstream, straight across or downstream, and ▶ makes the
   crossing. Pure logic, whole numbers only.
   ========================================================================== */

export const RIVER_WIDTH = 12
export const RIVER_LIMITS = { current: { min: 0, max: 4 }, bx: { min: -4, max: 4 }, by: { min: 1, max: 5 } }

export interface RiverState {
    current: number
    bx: number
    by: number
    prediction: Prediction | null
}

export const initialRiverState: RiverState = { current: 2, bx: 0, by: 3, prediction: null }

const clamp = (value: number, { min, max }: { min: number; max: number }) => Math.min(max, Math.max(min, Math.round(value)))

export function setRiver(state: RiverState, patch: Partial<Omit<RiverState, 'prediction'>>): RiverState {
    const current = clamp(patch.current ?? state.current, RIVER_LIMITS.current)
    const bx = clamp(patch.bx ?? state.bx, RIVER_LIMITS.bx)
    const by = clamp(patch.by ?? state.by, RIVER_LIMITS.by)
    const same = current === state.current && bx === state.bx && by === state.by
    return { current, bx, by, prediction: same ? state.prediction : null }
}

/** The real velocity: the boat's own plus the current's */
export const realVelocity = ({ current, bx, by }: Pick<RiverState, 'current' | 'bx' | 'by'>): [number, number] => [bx + current, by]
/** Seconds to cross */
export const crossingTime = ({ by }: Pick<RiverState, 'by'>): FractionValue => fraction(RIVER_WIDTH, by)
/** Metres downstream where it lands (negative: upstream) */
export const landing = (state: Pick<RiverState, 'current' | 'bx' | 'by'>): FractionValue => fraction(RIVER_WIDTH * (state.bx + state.current), state.by)
/** Upstream (<), straight across (=) or downstream (>) */
export const riverPrediction = (state: RiverState): Prediction => compareTo(state.bx + state.current, 0)
/** |real velocity|² */
export const speedSquare = (state: Pick<RiverState, 'current' | 'bx' | 'by'>) => (state.bx + state.current) ** 2 + state.by ** 2

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const lands = (state: RiverState, metres: number) => RIVER_WIDTH * (state.bx + state.current) === metres * state.by

export const riverChallenges: LabChallenge<RiverState>[] = [
    {
        id: 105301,
        prompt: say('Korrontea $2$ m/s dela, egin txalupa justu parean irits dadin.', 'Con la corriente a $2$ m/s, haz que la barca llegue justo enfrente.', 'مع تيار سرعته $2$ m/s، اجعل القارب يصل إلى النقطة المقابلة تمامًا.', 'With the current at $2$ m/s, make the boat land straight across.'),
        hint: say('Benetako abiadurak bertikala izan behar du: $b_1+2=0$.', 'La velocidad real tiene que ser vertical: $b_1+2=0$.', 'يجب أن تكون السرعة الحقيقية رأسية: $b_1+2=0$.', 'The real velocity has to be vertical: $b_1+2=0$.'),
        isSolved: (state) => state.current === 2 && lands(state, 0)
    },
    {
        id: 105302,
        prompt: say('Korrontea $3$ m/s dela, egin txalupa $6$ m beherago irits dadin.', 'Con la corriente a $3$ m/s, haz que la barca llegue $6$ m aguas abajo.', 'مع تيار سرعته $3$ m/s، اجعل القارب يصل $6$ m مع التيار.', 'With the current at $3$ m/s, make the boat land $6$ m downstream.'),
        hint: say('Aurreratzen dena: $(b_1+3)\\cdot\\frac{12}{b_2}=6$.', 'Lo que avanza: $(b_1+3)\\cdot\\frac{12}{b_2}=6$.', 'ما يتقدمه: $(b_1+3)\\cdot\\frac{12}{b_2}=6$.', 'How far it drifts: $(b_1+3)\\cdot\\frac{12}{b_2}=6$.'),
        isSolved: (state) => state.current === 3 && lands(state, 6)
    },
    {
        id: 105303,
        prompt: say('Korrontea $3$ m/s dela, egin benetako abiadurak $5$ m/s neur dezan.', 'Con la corriente a $3$ m/s, haz que la velocidad real mida $5$ m/s.', 'مع تيار سرعته $3$ m/s، اجعل طول السرعة الحقيقية $5$ m/s.', 'With the current at $3$ m/s, make the real velocity $5$ m/s.'),
        hint: say('Pitagoras: $(b_1+3)^2+b_2^2=25$.', 'Pitágoras: $(b_1+3)^2+b_2^2=25$.', 'فيثاغورس: $(b_1+3)^2+b_2^2=25$.', 'Pythagoras: $(b_1+3)^2+b_2^2=25$.'),
        isSolved: (state) => state.current === 3 && speedSquare(state) === 25
    },
    {
        id: 105304,
        prompt: say('Korrontea $1$ m/s dela, zeharkatu ahalik eta azkarren, eta iritsi justu parean.', 'Con la corriente a $1$ m/s, cruza lo más rápido posible y llega justo enfrente.', 'مع تيار سرعته $1$ m/s، اعبر بأسرع ما يمكن وصِل إلى النقطة المقابلة تمامًا.', 'With the current at $1$ m/s, cross as fast as possible and land straight across.'),
        hint: say('Denbora $\\frac{12}{b_2}$ da: $b_2$ ahalik eta handiena.', 'El tiempo es $\\frac{12}{b_2}$: $b_2$ lo más grande posible.', 'الزمن $\\frac{12}{b_2}$: اجعل $b_2$ أكبر ما يمكن.', 'The time is $\\frac{12}{b_2}$: $b_2$ as big as possible.'),
        isSolved: (state) => state.current === 1 && state.by === RIVER_LIMITS.by.max && lands(state, 0)
    },
    {
        id: 105305,
        prompt: say('Korronterik gabe, egin txalupa $12$ m gorago irits dadin.', 'Sin corriente, haz que la barca llegue $12$ m aguas arriba.', 'دون تيار، اجعل القارب يصل $12$ m عكس التيار.', 'With no current, make the boat land $12$ m upstream.'),
        hint: say('Gorantz: $b_1$ negatiboa, eta $b_2$ adinakoa.', 'Hacia arriba: $b_1$ negativo y tan grande como $b_2$.', 'عكس التيار: $b_1$ سالب وبقدر $b_2$.', 'Upstream: $b_1$ negative and as big as $b_2$.'),
        isSolved: (state) => state.current === 0 && lands(state, -12)
    }
]

const where = (metres: number) =>
    metres === 0
        ? say('justu parean', 'justo enfrente', 'في النقطة المقابلة تمامًا', 'straight across')
        : metres > 0
            ? say(`$${metres}$ m beherago`, `$${metres}$ m aguas abajo`, `$${metres}$ m مع التيار`, `$${metres}$ m downstream`)
            : say(`$${-metres}$ m gorago`, `$${-metres}$ m aguas arriba`, `$${-metres}$ m عكس التيار`, `$${-metres}$ m upstream`)

/** Endless practice: a current and the place where the boat has to land */
const riverMaker: LabChallengeMaker<RiverState> = (random) => {
    for (;;) {
        const current = randomInt(random, 1, 3)
        const metres = pick(random, [-12, -6, 0, 6, 12, 18])
        const options: RiverState[] = []
        for (let by = 1; by <= 5; by++) for (let bx = -4; bx <= 4; bx++) if (RIVER_WIDTH * (bx + current) === metres * by) options.push({ current, bx, by, prediction: null })
        if (options.length === 0) continue
        const place = where(metres)
        return {
            prompt: say(`Korrontea $${current}$ m/s dela, egin txalupa ${place.eu} irits dadin.`, `Con la corriente a $${current}$ m/s, haz que la barca llegue ${place.es}.`, `مع تيار سرعته $${current}$ m/s، اجعل القارب يصل ${place.ar}.`, `With the current at $${current}$ m/s, make the boat land ${place.en}.`),
            hint: say(`Txalupak $(b_1+${current})\\cdot\\frac{12}{b_2}$ metro egiten ditu ibaian behera.`, `La barca baja $(b_1+${current})\\cdot\\frac{12}{b_2}$ metros con la corriente.`, `ينزل القارب مع التيار $(b_1+${current})\\cdot\\frac{12}{b_2}$ مترًا.`, `The boat drifts $(b_1+${current})\\cdot\\frac{12}{b_2}$ metres downstream.`),
            isSolved: (state) => state.current === current && lands(state, metres),
            solution: pick(random, options)
        }
    }
}

export const riverExtra = freshFrom(initialRiverState, riverMaker)
