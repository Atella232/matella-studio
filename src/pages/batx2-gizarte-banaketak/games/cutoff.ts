import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { criticalZ, inverseZ } from '../critical.ts'

/* ==========================================================================
   B-J1 · Ebaketa-nota (La nota de corte): a normal of marks, salaries or
   times, and a percentage to cut: the best k % (level 1), the lowest k %
   (level 2) or the central k % (level 3, an interval). Three values to
   choose from: the right one, the cut on the wrong side and the cut
   without multiplying by σ (in level 3, the interval without σ and the
   one of another level). z comes from the table with the approved
   convention. Pure logic.
   ========================================================================== */

export const CUTOFF_ROUNDS = 6

interface Context {
    text: (mean: number, sd: number, k: number, side: 'top' | 'bottom' | 'centre') => LocalizedText
    means: number[]
    sds: number[]
}

const pctEu = (k: number) => `%\u00a0${k}`
const pctEs = (k: number) => `${k}\u00a0%`

const CONTEXTS: Context[] = [
    {
        means: [60, 65, 70],
        sds: [5, 8, 10],
        text: (mean, sd, k, side) => ({
            eu: side === 'top' ? `Azterketa bateko puntuak $N(${mean};\\,${sd})$ dira. ${pctEu(k)} onenak beka jasotzen du. Zein da ebaketa-nota?` : side === 'bottom' ? `Azterketa bateko puntuak $N(${mean};\\,${sd})$ dira. ${pctEu(k)} txarrenak errepasoa egin behar du. Zein puntuaziotik behera?` : `Azterketa bateko puntuak $N(${mean};\\,${sd})$ dira. Zein tartetan dago erdiko ${pctEu(k)}?`,
            es: side === 'top' ? `Los puntos de un examen siguen una $N(${mean};\\,${sd})$. El ${pctEs(k)} mejor recibe una beca. ¿Cuál es la nota de corte?` : side === 'bottom' ? `Los puntos de un examen siguen una $N(${mean};\\,${sd})$. El ${pctEs(k)} peor debe repasar. ¿Por debajo de qué puntuación?` : `Los puntos de un examen siguen una $N(${mean};\\,${sd})$. ¿En qué intervalo está el ${pctEs(k)} central?`,
            en: side === 'top' ? `The points of an exam follow an $N(${mean};\\,${sd})$. The best ${k}% get a grant. What is the cut-off mark?` : side === 'bottom' ? `The points of an exam follow an $N(${mean};\\,${sd})$. The lowest ${k}% must revise. Below what score?` : `The points of an exam follow an $N(${mean};\\,${sd})$. In what interval are the central ${k}%?`,
            ar: side === 'top' ? `تتبع نقاط امتحان $N(${mean};\\,${sd})$. يحصل أفضل ${pctEs(k)} على منحة. ما درجة القبول؟` : side === 'bottom' ? `تتبع نقاط امتحان $N(${mean};\\,${sd})$. يجب على أدنى ${pctEs(k)} المراجعة. تحت أي درجة؟` : `تتبع نقاط امتحان $N(${mean};\\,${sd})$. في أي فترة يقع ${pctEs(k)} الأوسط؟`
        })
    },
    {
        means: [1500, 1800, 2000],
        sds: [200, 300, 400],
        text: (mean, sd, k, side) => ({
            eu: side === 'top' ? `Soldatak $N(${mean};\\,${sd})$ dira, eurotan. Zein soldatatik gora dago ${pctEu(k)} handiena?` : side === 'bottom' ? `Soldatak $N(${mean};\\,${sd})$ dira, eurotan. Zein soldatatik behera dago ${pctEu(k)} txikiena?` : `Soldatak $N(${mean};\\,${sd})$ dira, eurotan. Zein tartetan dago erdiko ${pctEu(k)}?`,
            es: side === 'top' ? `Los sueldos siguen una $N(${mean};\\,${sd})$ en euros. ¿A partir de qué sueldo está el ${pctEs(k)} más alto?` : side === 'bottom' ? `Los sueldos siguen una $N(${mean};\\,${sd})$ en euros. ¿Por debajo de qué sueldo está el ${pctEs(k)} más bajo?` : `Los sueldos siguen una $N(${mean};\\,${sd})$ en euros. ¿En qué intervalo está el ${pctEs(k)} central?`,
            en: side === 'top' ? `Salaries follow an $N(${mean};\\,${sd})$ in euros. From what salary are the highest ${k}%?` : side === 'bottom' ? `Salaries follow an $N(${mean};\\,${sd})$ in euros. Below what salary are the lowest ${k}%?` : `Salaries follow an $N(${mean};\\,${sd})$ in euros. In what interval are the central ${k}%?`,
            ar: side === 'top' ? `تتبع الرواتب $N(${mean};\\,${sd})$ باليورو. ابتداءً من أي راتب يقع أعلى ${pctEs(k)}؟` : side === 'bottom' ? `تتبع الرواتب $N(${mean};\\,${sd})$ باليورو. تحت أي راتب يقع أدنى ${pctEs(k)}؟` : `تتبع الرواتب $N(${mean};\\,${sd})$ باليورو. في أي فترة يقع ${pctEs(k)} الأوسط؟`
        })
    }
]

export type CutoffSide = 'top' | 'bottom' | 'centre'

export interface CutoffRound {
    prompt: LocalizedText
    mean: number
    sd: number
    k: number
    side: CutoffSide
    z: number
    /** LaTeX of each option; the right one is answer */
    options: string[]
    answer: string
}

const round3 = (value: number) => Math.round(value * 1000) / 1000
/** A value with up to three decimals for LaTeX, decimal comma */
export const valueLatex = (value: number) => String(round3(value)).replace('.', '{,}')
const intervalLatex = (low: number, high: number) => `(${valueLatex(low)};\\ ${valueLatex(high)})`

const TAILS = [5, 10, 15, 20, 25, 30, 40]
const CENTRES = [80, 90, 95, 99]

function makeRound(random: Random, level: number): CutoffRound | null {
    const context = pick(random, CONTEXTS)
    const mean = pick(random, context.means)
    const sd = pick(random, context.sds)
    const side: CutoffSide = level === 0 ? 'top' : level === 1 ? 'bottom' : 'centre'
    if (side === 'centre') {
        const k = pick(random, CENTRES)
        const z = criticalZ(k)
        const other = criticalZ(pick(random, CENTRES.filter((value) => value !== k)))
        const right = intervalLatex(mean - z * sd, mean + z * sd)
        const options = [right, intervalLatex(mean - z, mean + z), intervalLatex(mean - other * sd, mean + other * sd)]
        if (new Set(options).size < 3) return null
        return { prompt: context.text(mean, sd, k, side), mean, sd, k, side, z, options, answer: right }
    }
    const k = pick(random, TAILS)
    const z = inverseZ(10_000 - k * 100)
    const cut = side === 'top' ? mean + z * sd : mean - z * sd
    const right = valueLatex(cut)
    const options = [right, valueLatex(side === 'top' ? mean - z * sd : mean + z * sd), valueLatex(side === 'top' ? mean + z : mean - z)]
    if (new Set(options).size < 3 || randomInt(random, 0, 0) !== 0) return null
    return { prompt: context.text(mean, sd, k, side), mean, sd, k, side, z, options, answer: right }
}

/** Six rounds of a level, no two the same */
export function createCutoffRounds(random: Random, level: number): CutoffRound[] {
    const rounds: CutoffRound[] = []
    for (let attempt = 0; rounds.length < CUTOFF_ROUNDS && attempt < 500; attempt += 1) {
        const round = makeRound(random, level)
        if (!round || rounds.some((other) => other.prompt.es === round.prompt.es)) continue
        rounds.push({ ...round, options: shuffle(random, round.options) })
    }
    return rounds
}
