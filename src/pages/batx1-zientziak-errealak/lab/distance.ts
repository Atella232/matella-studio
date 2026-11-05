import { randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { compareTo, freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'

/* ==========================================================================
   L1 · Distantzia zuzenean (Distancia en la recta): a neighbourhood
   E(a, r) drawn on the number line, and a point x. The bar from a to x is
   |x − a|; the learner predicts whether x falls inside, on the edge or
   outside before the distance is shown. Challenges ask for the centre and
   radius of an interval, or for the point at a given distance. Pure
   logic, whole numbers only.
   ========================================================================== */

export const DISTANCE_LIMITS = { a: { min: -6, max: 6 }, r: { min: 1, max: 5 }, x: { min: -10, max: 10 } } as const

export interface DistanceState {
    a: number
    r: number
    x: number
    prediction: Prediction | null
}

export const initialDistanceState: DistanceState = { a: 0, r: 2, x: 3, prediction: null }

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value)))

export function setDistance(state: DistanceState, patch: Partial<Omit<DistanceState, 'prediction'>>): DistanceState {
    const a = clamp(patch.a ?? state.a, DISTANCE_LIMITS.a.min, DISTANCE_LIMITS.a.max)
    const r = clamp(patch.r ?? state.r, DISTANCE_LIMITS.r.min, DISTANCE_LIMITS.r.max)
    const x = clamp(patch.x ?? state.x, DISTANCE_LIMITS.x.min, DISTANCE_LIMITS.x.max)
    const same = a === state.a && r === state.r && x === state.x
    return { a, r, x, prediction: same ? state.prediction : null }
}

export const distanceOf = ({ a, x }: DistanceState) => Math.abs(x - a)
/** The neighbourhood E(a, r) as the open interval (a − r, a + r) */
export const neighbourhoodOf = ({ a, r }: DistanceState) => ({ left: a - r, right: a + r })
/** Inside (<), on the edge (=) or outside (>): |x − a| against r */
export const distancePrediction = (state: DistanceState): Prediction => compareTo(distanceOf(state), state.r)

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })

export const distanceChallenges: LabChallenge<DistanceState>[] = [
    { id: 99101, prompt: say('Jarri $(2,8)$ tartea den ingurunea.', 'Coloca el entorno que es el intervalo $(2,8)$.', 'ضع الجوار الذي هو الفترة $(2,8)$.', 'Set the neighbourhood that is the interval $(2,8)$.'), hint: say('Erdigunea erdiko puntua da; erradioa, luzeraren erdia.', 'El centro es el punto medio; el radio, la mitad de la longitud.', 'المركز هو المنتصف، ونصف القطر نصف الطول.', 'The centre is the midpoint; the radius, half the length.'), isSolved: (state) => state.a === 5 && state.r === 3 },
    { id: 99102, prompt: say('Erdigunea 1 dela, jarri $x$ puntua $|x-1|=4$ izan dadin, ezkerrean.', 'Con centro 1, pon el punto $x$ para que $|x-1|=4$, a la izquierda.', 'مع المركز 1 ضع النقطة $x$ بحيث $|x-1|=4$ على اليسار.', 'With centre 1, put the point $x$ so that $|x-1|=4$, on the left.'), hint: say('4 unitate 1 zenbakitik ezkerrera.', '4 unidades a la izquierda del 1.', '4 وحدات يسار العدد 1.', '4 units to the left of 1.'), isSolved: (state) => state.a === 1 && state.x === -3 },
    { id: 99103, prompt: say('$E(-2,3)$ ingurunearekin, jarri $x$ kanpoan, erdigunetik 5 unitatera.', 'Con $E(-2,3)$, pon $x$ fuera, a 5 unidades del centro.', 'مع $E(-2,3)$ ضع $x$ خارجه على بعد 5 وحدات من المركز.', 'With $E(-2,3)$, put $x$ outside, 5 units from the centre.'), hint: say('Bi aukera daude: $-2+5$ edo $-2-5$.', 'Hay dos opciones: $-2+5$ o $-2-5$.', 'هناك خياران: $-2+5$ أو $-2-5$.', 'There are two options: $-2+5$ or $-2-5$.'), isSolved: (state) => state.a === -2 && state.r === 3 && distanceOf(state) === 5 },
    { id: 99104, prompt: say('Lortu $(-6,0)$ ingurunea.', 'Consigue el entorno $(-6,0)$.', 'احصل على الجوار $(-6,0)$.', 'Get the neighbourhood $(-6,0)$.'), hint: say('Luzera 6 da: erradioa 3.', 'La longitud es 6: el radio, 3.', 'الطول 6: نصف القطر 3.', 'The length is 6: the radius is 3.'), isSolved: (state) => state.a === -3 && state.r === 3 },
    { id: 99105, prompt: say('Jarri $x$ $E(4,2)$ ingurunearen ertzean, ezkerreko aldean.', 'Pon $x$ en el borde de $E(4,2)$, en el lado izquierdo.', 'ضع $x$ على حافة $E(4,2)$ من الجهة اليسرى.', 'Put $x$ on the edge of $E(4,2)$, on the left side.'), hint: say('Ezkerreko muturra: $4-2$. Ertza ez dago ingurunean.', 'El extremo izquierdo: $4-2$. El borde no está en el entorno.', 'الطرف الأيسر: $4-2$. والحافة ليست في الجوار.', 'The left endpoint: $4-2$. The edge is not in the neighbourhood.'), isSolved: (state) => state.a === 4 && state.r === 2 && state.x === 2 }
]

/** Endless practice: an open interval with whole endpoints, to be written as E(a, r) */
const distanceMaker: LabChallengeMaker<DistanceState> = (random) => {
    const a = randomInt(random, DISTANCE_LIMITS.a.min + 1, DISTANCE_LIMITS.a.max - 1)
    const r = randomInt(random, 1, 4)
    const left = a - r
    const right = a + r
    return {
        prompt: say(`Jarri $(${left},${right})$ tartea den ingurunea.`, `Coloca el entorno que es el intervalo $(${left},${right})$.`, `ضع الجوار الذي هو الفترة $(${left},${right})$.`, `Set the neighbourhood that is the interval $(${left},${right})$.`),
        hint: say(`Erdigunea $\\frac{${left}+${right}}{2}=${a}$ da.`, `El centro es $\\frac{${left}+${right}}{2}=${a}$.`, `المركز $\\frac{${left}+${right}}{2}=${a}$.`, `The centre is $\\frac{${left}+${right}}{2}=${a}$.`),
        isSolved: (state) => state.a === a && state.r === r,
        solution: { ...initialDistanceState, a, r }
    }
}

export const distanceExtra = freshFrom(initialDistanceState, distanceMaker)
