import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { say } from '../../batx2-zientziak-probabilitatea/lab/probability.ts'
import { inverseTable } from '../../batx2-zientziak-banaketak/normal.ts'

/* ==========================================================================
   J3 · Ebaketa-nota (Nota de corte): a normal and a percentage at the top
   or at the bottom. Level 1 asks for k: the wrong options look up the
   wrong side (k for the other tail) or forget the sign. Level 2 asks for
   x = μ + kσ: the wrong options go to the other side (μ − kσ) or forget σ
   (μ + k). Level 3, the same in situations: places, grants, quality
   checks. Only percentages whose k is not a tie in the table (never 5 %).
   Pure.
   ========================================================================== */

export const CUTOFF_ROUNDS = 6

/** Percentages with an unambiguous k in the table, and that k */
export const CUTOFF_PERCENTS: Array<{ percent: number; k: number }> = [10, 15, 20, 25, 30, 40].map((percent) => ({ percent, k: inverseTable((100 - percent) * 100)! }))

export interface CutoffRound {
    context: LocalizedText
    mean: number
    sd: number
    percent: number
    top: boolean
    /** The k with its sign: positive for the top, negative for the bottom */
    k: number
    /** LaTeX options */
    options: string[]
    answer: number
}

const decimal = (value: number) => {
    for (let places = 0; places <= 4; places += 1) if (Math.abs(Math.round(value * 10 ** places) - value * 10 ** places) < 1e-7) return value.toFixed(places).replace('.', '{,}').replace('-', '-')
    return value.toFixed(4).replace('.', '{,}')
}

const CONTEXTS: Array<(percent: number, top: boolean) => LocalizedText> = [
    (percent, top) => (top
        ? say(`Sarbide-proba: nota onena duen % ${percent} onartzen da.`, `Prueba de acceso: se admite al ${percent} % con mejor nota.`, `اختبار قبول: يُقبل أفضل ${percent}٪.`, `Entrance test: the best ${percent}% are admitted.`)
        : say(`Azterketa: % ${percent} baxuenak errefortzua du.`, `Examen: el ${percent} % más bajo tiene refuerzo.`, `امتحان: يحصل أدنى ${percent}٪ على دعم.`, `Exam: the lowest ${percent}% get extra help.`)),
    (percent, top) => (top
        ? say(`Beka: errenta altuena duen % ${percent} kanpoan geratzen da.`, `Beca: el ${percent} % con más renta queda fuera.`, `منحة: يُستبعد أعلى ${percent}٪ دخلًا.`, `Grant: the ${percent}% with the highest income are left out.`)
        : say(`Beka: errenta baxuena duen % ${percent} hartzen da.`, `Beca: se la lleva el ${percent} % con menos renta.`, `منحة: يحصل عليها أدنى ${percent}٪ دخلًا.`, `Grant: the ${percent}% with the lowest income get it.`)),
    (percent, top) => (top
        ? say(`Kalitatea: pisu handiena duen % ${percent} baztertzen da.`, `Calidad: se descarta el ${percent} % que más pesa.`, `الجودة: يُستبعد أثقل ${percent}٪.`, `Quality: the heaviest ${percent}% are rejected.`)
        : say(`Kalitatea: pisu txikiena duen % ${percent} baztertzen da.`, `Calidad: se descarta el ${percent} % que menos pesa.`, `الجودة: يُستبعد أخف ${percent}٪.`, `Quality: the lightest ${percent}% are rejected.`))
]

function makeRound(random: Random, level: number): CutoffRound | null {
    const { percent, k: magnitude } = pick(random, CUTOFF_PERCENTS)
    const top = random() < 0.5
    const k = top ? magnitude : -magnitude
    const sd = pick(random, [2, 5, 10, 15, 20])
    const mean = 10 * randomInt(random, 5, 30)
    const context = level === 2 ? pick(random, CONTEXTS)(percent, top) : top
        ? say(`% ${percent} gainetik geratzen da.`, `El ${percent} % queda por encima.`, `${percent}٪ يبقى فوق.`, `${percent}% lies above.`)
        : say(`% ${percent} azpitik geratzen da.`, `El ${percent} % queda por debajo.`, `${percent}٪ يبقى تحت.`, `${percent}% lies below.`)
    let values: string[]
    if (level === 0) {
        const other = CUTOFF_PERCENTS.find((item) => item.percent !== percent && Math.abs(item.k - magnitude) > 0.05)!
        values = [decimal(k), decimal(-k), decimal(top ? other.k : -other.k)]
    } else {
        values = [decimal(mean + k * sd), decimal(mean - k * sd), decimal(mean + k)]
    }
    if (new Set(values).size < 3) return null
    const options = shuffle(random, values)
    return { context, mean, sd, percent, top, k, options, answer: options.indexOf(values[0]) }
}

export function createCutoffRounds(random: Random, level: number): CutoffRound[] {
    const rounds: CutoffRound[] = []
    for (let attempt = 0; attempt < 2000 && rounds.length < CUTOFF_ROUNDS; attempt += 1) {
        const round = makeRound(random, level)
        if (round && !rounds.some((other) => other.percent === round.percent && other.top === round.top && other.mean === round.mean)) rounds.push(round)
    }
    return rounds
}

export const cutoffLatex = decimal
