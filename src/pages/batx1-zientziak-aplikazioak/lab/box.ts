import { randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import { say } from '../../batx1-zientziak-funtzioak/text.ts'
import { groupDigits } from '../../../utils/numberFormat.ts'
import { compareTo, freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'

/* ==========================================================================
   L3 · La caja sin tapa: a square sheet of side L (12, 18, 24 or 30 cm);
   a square of side x is cut from each corner (x in half centimetres) and
   the sides are folded up. The board shows the sheet with its cuts and,
   once the learner has guessed, the graph of V(x) = x(L − 2x)² with the
   point of the current cut; ▶ cuts from 0 to L/2. Before the graph the
   learner guesses whether the best cut, L/6, is less than, exactly or
   more than 3 cm.
   ========================================================================== */

export const BOX_SIZES = [12, 18, 24, 30] as const

export interface BoxState {
    /** Index of the side of the sheet in BOX_SIZES */
    size: number
    /** The cut is x = k / 2 */
    k: number
    prediction: Prediction | null
}

export const initialBoxState: BoxState = { size: 0, k: 2, prediction: null }

export const boxSide = (state: BoxState) => BOX_SIZES[state.size]
export const boxCut = (state: BoxState) => state.k / 2
/** The cut goes from 0,5 cm to half the sheet minus 0,5 cm */
export const boxLimits = (size: number) => ({ min: 1, max: BOX_SIZES[size] - 1 })

/** Only a new sheet asks for a new prediction; the cut stays inside the new sheet */
export function setBox(state: BoxState, patch: Partial<Omit<BoxState, 'prediction'>>): BoxState {
    const size = Math.min(BOX_SIZES.length - 1, Math.max(0, Math.round(patch.size ?? state.size)))
    const { min, max } = boxLimits(size)
    const k = Math.min(max, Math.max(min, Math.round(patch.k ?? state.k)))
    return { size, k, prediction: size === state.size ? state.prediction : null }
}

export const volume = (side: number, x: number) => x * (side - 2 * x) ** 2
/** V′(x) = (L − 2x)(L − 6x) */
export const volumeSlope = (side: number, x: number) => (side - 2 * x) * (side - 6 * x)
export const bestCut = (side: number) => side / 6

/** The best cut is less than (<), exactly (=) or more than (>) 3 cm */
export const boxPrediction = (state: BoxState): Prediction => compareTo(bestCut(boxSide(state)), 3)

const at = (side: number, x: number) => (state: BoxState) => boxSide(state) === side && boxCut(state) === x

export const boxChallenges: LabChallenge<BoxState>[] = [
    {
        id: 111201,
        prompt: say('12 cm aldeko txaparekin, aurkitu bolumen maximoa ematen duen ebakia.', 'Con la chapa de 12 cm, encuentra el corte que da el volumen máximo.', 'بالصفيحة التي طول ضلعها 12 سم، اعثر على القطع الذي يعطي أكبر حجم.', 'With the 12 cm sheet, find the cut that gives the greatest volume.'),
        hint: same("$V'(x)=(12-2x)(12-6x)$"),
        isSolved: at(12, 2)
    },
    {
        id: 111202,
        prompt: say('18 cm aldeko txaparekin, lortu 400 cm³ edo gehiagoko bolumena.', 'Con la chapa de 18 cm, consigue un volumen de 400 cm³ o más.', 'بالصفيحة التي طول ضلعها 18 سم، احصل على حجم 400 سم³ أو أكثر.', 'With the 18 cm sheet, get a volume of 400 cm³ or more.'),
        hint: say('Begiratu $V(x)$ grafikoari: gailurraren ondoan.', 'Mira la gráfica de $V(x)$: cerca de la cima.', 'انظر إلى رسم $V(x)$: قرب القمة.', 'Look at the graph of $V(x)$: near the peak.'),
        isSolved: (state) => boxSide(state) === 18 && volume(18, boxCut(state)) >= 400
    },
    {
        id: 111203,
        prompt: say('24 cm aldeko txaparekin, zer ebakik ematen du bolumen maximoa?', 'Con la chapa de 24 cm, ¿qué corte da el volumen máximo?', 'بالصفيحة التي طول ضلعها 24 سم، أي قطع يعطي أكبر حجم؟', 'With the 24 cm sheet, which cut gives the greatest volume?'),
        hint: say('Ebaki onena txaparen aldearen seiren bat da.', 'El mejor corte es la sexta parte del lado de la chapa.', 'أفضل قطع هو سدس ضلع الصفيحة.', 'The best cut is one sixth of the side of the sheet.'),
        isSolved: at(24, 4)
    },
    {
        id: 111204,
        prompt: say('30 cm aldeko txaparekin, moztu behar baino gehiago: lortu $V\'(x)<0$.', 'Con la chapa de 30 cm, corta más de la cuenta: consigue $V\'(x)<0$.', 'بالصفيحة التي طول ضلعها 30 سم، اقطع أكثر من اللازم: احصل على $V\'(x)<0$.', 'With the 30 cm sheet, cut too much: get $V\'(x)<0$.'),
        hint: same("$V'(x)=(30-2x)(30-6x)$"),
        isSolved: (state) => boxSide(state) === 30 && volumeSlope(30, boxCut(state)) < 0
    },
    {
        id: 111205,
        prompt: say('12 cm aldeko txaparekin, egin oinarriaren aldea 6 cm duen kutxa.', 'Con la chapa de 12 cm, haz una caja cuya base tenga 6 cm de lado.', 'بالصفيحة التي طول ضلعها 12 سم، اصنع علبة طول ضلع قاعدتها 6 سم.', 'With the 12 cm sheet, make a box whose base has a side of 6 cm.'),
        hint: same('$12-2x=6$'),
        isSolved: at(12, 3)
    }
]

function same(value: string) {
    return say(value, value, value, value)
}

/** Endless practice: the best cut, a base of a given side or a volume of at least N */
const boxMaker: LabChallengeMaker<BoxState> = (random) => {
    const size = randomInt(random, 0, BOX_SIZES.length - 1)
    const side = BOX_SIZES[size]
    const kind = randomInt(random, 0, 2)
    if (kind === 0) {
        return {
            prompt: say(`${side} cm aldeko txaparekin, aurkitu bolumen maximoa ematen duen ebakia.`, `Con la chapa de ${side} cm, encuentra el corte que da el volumen máximo.`, `بالصفيحة التي طول ضلعها ${side} سم، اعثر على القطع الذي يعطي أكبر حجم.`, `With the ${side} cm sheet, find the cut that gives the greatest volume.`),
            hint: same(`$V'(x)=(${side}-2x)(${side}-6x)$`),
            isSolved: at(side, bestCut(side)),
            solution: { size, k: bestCut(side) * 2, prediction: null }
        }
    }
    if (kind === 1) {
        // A base of side b: x = (L − b) / 2, a whole number of half centimetres
        const k = randomInt(random, 2, side - 2)
        const base = side - k
        return {
            prompt: say(`${side} cm aldeko txaparekin, egin oinarriaren aldea ${base} cm duen kutxa.`, `Con la chapa de ${side} cm, haz una caja cuya base tenga ${base} cm de lado.`, `بالصفيحة التي طول ضلعها ${side} سم، اصنع علبة طول ضلع قاعدتها ${base} سم.`, `With the ${side} cm sheet, make a box whose base has a side of ${base} cm.`),
            hint: same(`$${side}-2x=${base}$`),
            isSolved: at(side, k / 2),
            solution: { size, k, prediction: null }
        }
    }
    // A volume of at least N: a round number under the maximum
    const best = volume(side, bestCut(side))
    const step = side <= 18 ? 50 : 100
    const target = Math.floor((best * (0.8 + random() * 0.15)) / step) * step
    return {
        prompt: say(`${side} cm aldeko txaparekin, lortu ${target} cm³ edo gehiagoko bolumena.`, `Con la chapa de ${side} cm, consigue un volumen de ${target} cm³ o más.`, `بالصفيحة التي طول ضلعها ${side} سم، احصل على حجم ${target} سم³ أو أكثر.`, `With the ${side} cm sheet, get a volume of ${groupDigits(target, 'en')} cm³ or more.`),
        hint: say('Begiratu $V(x)$ grafikoari: gailurraren ondoan.', 'Mira la gráfica de $V(x)$: cerca de la cima.', 'انظر إلى رسم $V(x)$: قرب القمة.', 'Look at the graph of $V(x)$: near the peak.'),
        isSolved: (state) => boxSide(state) === side && volume(side, boxCut(state)) >= target,
        solution: { size, k: bestCut(side) * 2, prediction: null }
    }
}

export const boxExtra = freshFrom(initialBoxState, boxMaker)
