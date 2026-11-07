import { randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import { compareTo, freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'
import { same, say } from '../text.ts'

/* ==========================================================================
   L4 · Zati osoaren eskailera (La escalera de la parte entera): the
   staircase y = E(x), or the saw y = x − E(x), and a probe x that moves in
   tenths from −4 to 4. Before the value is shown the learner predicts: is
   E(x) the integer to the left of x, x itself, or the one to the right?
   (with negatives the usual slip is to cut the decimals: E(−2,4) = −2);
   for the decimal part, whether it is below, at or above one half. ▶ walks
   a dot along the stairs up to the probe. The probe is kept in tenths
   (whole numbers) so that nothing is rounded.
   ========================================================================== */

export type StairsKind = 'floor' | 'decimal'

export const STAIRS_LIMITS = { probe: { min: -40, max: 40 } } as const

export interface StairsState {
    kind: StairsKind
    /** The probe x, in tenths: −24 is −2,4 */
    probe: number
    prediction: Prediction | null
}

export const initialStairsState: StairsState = { kind: 'floor', probe: 15, prediction: null }

export function setStairs(state: StairsState, patch: Partial<Omit<StairsState, 'prediction'>>): StairsState {
    const kind = patch.kind ?? state.kind
    const probe = Math.min(STAIRS_LIMITS.probe.max, Math.max(STAIRS_LIMITS.probe.min, Math.round(patch.probe ?? state.probe)))
    return { kind, probe, prediction: kind === state.kind && probe === state.probe ? state.prediction : null }
}

/** E(x) of a number given in tenths */
export const floorOf = (tenths: number) => Math.floor(tenths / 10)
/** x − E(x), in tenths (0 to 9) */
export const decimalTenths = (tenths: number) => tenths - 10 * floorOf(tenths)

/**
 * For E(x): the integer to the left (<), x itself (=) or the one to the right (>); E(x) is never to the right.
 * For the decimal part: below (<), at (=) or above (>) one half.
 */
export function stairsPrediction(state: StairsState): Prediction {
    if (state.kind === 'floor') return decimalTenths(state.probe) === 0 ? '=' : '<'
    return compareTo(decimalTenths(state.probe), 5)
}

/** A number of tenths written for LaTeX: −2{,}4, 3, 0{,}7 */
export function tenthsLatex(tenths: number): string {
    const sign = tenths < 0 ? '-' : ''
    const whole = Math.floor(Math.abs(tenths) / 10)
    const rest = Math.abs(tenths) % 10
    return rest === 0 ? `${sign}${whole}` : `${sign}${whole}{,}${rest}`
}

const inRange = (state: StairsState, from: number, to: number) => state.probe >= from && state.probe <= to

export const stairsChallenges: LabChallenge<StairsState>[] = [
    {
        id: 108351,
        prompt: say('Jarri zunda $E(x)=-3$ duen $x$ negatibo batean.', 'Pon la sonda en un $x$ negativo con $E(x)=-3$.', 'ضع المسبار عند $x$ سالب يكون فيه $E(x)=-3$.', 'Put the probe at a negative $x$ with $E(x)=-3$.'),
        hint: say('$-3$ eta $-2$ artean, $-2$ sartu gabe.', 'Entre $-3$ y $-2$, sin llegar a $-2$.', 'بين $-3$ و$-2$ دون بلوغ $-2$.', 'Between $-3$ and $-2$, without reaching $-2$.'),
        isSolved: (state) => inRange(state, -30, -21)
    },
    {
        id: 108352,
        prompt: say('Bilatu $E(x)=-2$ eta zati hamartarra $0{,}7$ dituen $x$ zenbakia.', 'Busca el $x$ con $E(x)=-2$ y parte decimal $0{,}7$.', 'ابحث عن $x$ الذي فيه $E(x)=-2$ وجزؤه الكسري $0{,}7$.', 'Find the $x$ with $E(x)=-2$ and fractional part $0{,}7$.'),
        hint: same('$x=E(x)+0{,}7$'),
        isSolved: (state) => state.probe === -13
    },
    {
        id: 108353,
        prompt: say('Jarri zunda eskailera 1 balioetik 2 baliora igotzen den puntuan.', 'Pon la sonda justo donde la escalera sube de 1 a 2.', 'ضع المسبار حيث يصعد الدرج من 1 إلى 2 تمامًا.', 'Put the probe exactly where the staircase steps up from 1 to 2.'),
        hint: say('Maila bakoitza ezkerrean itxita dago.', 'Cada peldaño está cerrado a la izquierda.', 'كل درجة مغلقة من اليسار.', 'Each step is closed on the left.'),
        isSolved: (state) => state.probe === 20
    },
    {
        id: 108354,
        prompt: say('Zati hamartarrarekin, bilatu $x$ negatibo bat, non zati hamartarra $0{,}2$ den.', 'Con la parte decimal, busca un $x$ negativo donde valga $0{,}2$.', 'مع الجزء الكسري ابحث عن $x$ سالب يكون فيه $0{,}2$.', 'With the fractional part, find a negative $x$ where it is $0{,}2$.'),
        hint: say('$-0{,}8$ zenbakiaren zati hamartarra ez da $0{,}8$.', 'La parte decimal de $-0{,}8$ no es $0{,}8$.', 'الجزء الكسري لـ $-0{,}8$ ليس $0{,}8$.', 'The fractional part of $-0{,}8$ is not $0{,}8$.'),
        isSolved: (state) => state.kind === 'decimal' && state.probe < 0 && decimalTenths(state.probe) === 2
    },
    {
        id: 108355,
        prompt: say('Bilatu $E(x)=-1$ eta zati hamartarra $0{,}5$ baino handiagoa dituen $x$ bat.', 'Busca un $x$ con $E(x)=-1$ y parte decimal mayor que $0{,}5$.', 'ابحث عن $x$ فيه $E(x)=-1$ وجزؤه الكسري أكبر من $0{,}5$.', 'Find an $x$ with $E(x)=-1$ and fractional part greater than $0{,}5$.'),
        hint: say('$-1$ eta 0 artean, 0 zenbakitik hurbil.', 'Entre $-1$ y 0, cerca del 0.', 'بين $-1$ و0، قريبًا من 0.', 'Between $-1$ and 0, close to 0.'),
        isSolved: (state) => inRange(state, -4, -1)
    }
]

/** Endless practice: the number with a given integer part and fractional part */
const stairsMaker: LabChallengeMaker<StairsState> = (random) => {
    const whole = randomInt(random, -4, 3)
    const tenth = randomInt(random, 1, 9)
    const probe = 10 * whole + tenth
    const part = tenthsLatex(tenth)
    return {
        prompt: say(`Jarri zunda $E(x)=${whole}$ eta zati hamartarra $${part}$ dituen zenbakian.`, `Pon la sonda en el número con $E(x)=${whole}$ y parte decimal $${part}$.`, `ضع المسبار عند العدد الذي فيه $E(x)=${whole}$ وجزؤه الكسري $${part}$.`, `Put the probe at the number with $E(x)=${whole}$ and fractional part $${part}$.`),
        hint: same(`$x=E(x)+${part}$`),
        isSolved: (state) => state.probe === probe,
        solution: { kind: 'floor', probe, prediction: null }
    }
}

export const stairsExtra = freshFrom(initialStairsState, stairsMaker)
