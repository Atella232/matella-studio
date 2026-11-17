import { randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { compareTo, freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'
import { say } from '../../batx2-zientziak-probabilitatea/lab/probability.ts'
import { binomialPmfDecimal } from '../../batx2-zientziak-banaketak/binomial.ts'

/* ==========================================================================
   L2 · Doitu datuak (Ajusta los datos): three tables of real-looking data
   (groups of three customers, parts with two welds, families with four
   children). The learner moves p in steps of 0,05, or presses «p = x̄/n»,
   and sees the expected bars N·P(X = k) over the observed ones, with the
   differences and the largest as a percentage of the total. Before the
   numbers, they say whether, with p = x̄/n, the largest difference stays
   under 5 %, is exactly 5 % or goes over (Matella's rule). Pure.
   ========================================================================== */

export interface FitData {
    title: LocalizedText
    /** Trials in each datum */
    trials: number
    observed: number[]
}

export const FIT_DATA: FitData[] = [
    { title: say('80 talde, 3 bezero bakoitzean: zenbatek erosten duten', '80 grupos de 3 clientes: cuántos compran', '80 مجموعة من 3 زبائن: كم منهم يشتري', '80 groups of 3 customers: how many buy'), trials: 3, observed: [11, 27, 33, 9] },
    { title: say('100 pieza, 2 soldadura bakoitzean: zenbat akastun', '100 piezas de 2 soldaduras: cuántas defectuosas', '100 قطعة بلحامين: كم لحامًا معيبًا', '100 parts with 2 welds: how many faulty'), trials: 2, observed: [70, 20, 10] },
    { title: say('50 familia, 4 seme-alaba bakoitzean: zenbat neska', '50 familias de 4 hijos: cuántas hijas', '50 أسرة لكل منها 4 أبناء: كم بنتًا', '50 families of 4 children: how many daughters'), trials: 4, observed: [3, 12, 20, 12, 3] }
]

export interface FitState {
    data: number
    /** p in hundredths, in steps of 5 */
    p: number
    prediction: Prediction | null
}

export const FIT_P = { min: 5, max: 95, step: 5 } as const
export const initialFitState: FitState = { data: 0, p: 30, prediction: null }

export function setFit(state: FitState, patch: Partial<Pick<FitState, 'data' | 'p'>>): FitState {
    const data = Math.min(FIT_DATA.length - 1, Math.max(0, patch.data ?? state.data))
    const p = Math.min(FIT_P.max, Math.max(FIT_P.min, Math.round((patch.p ?? state.p) / FIT_P.step) * FIT_P.step))
    return { data, p, prediction: data === state.data ? state.prediction : null }
}

export const totalOf = (data: FitData) => data.observed.reduce((sum, value) => sum + value, 0)
export const meanOf = (data: FitData) => data.observed.reduce((sum, value, k) => sum + k * value, 0) / totalOf(data)
/** p = x̄/n, in hundredths */
export const estimateOf = (data: FitData) => Math.round((100 * meanOf(data)) / data.trials)
/** The expected values N·P(X = k) with p in hundredths */
export const expectedOf = (data: FitData, p: number) => data.observed.map((_, k) => totalOf(data) * binomialPmfDecimal(data.trials, p / 100, k))
/** The absolute differences, observed minus expected */
export const differencesOf = (data: FitData, p: number) => expectedOf(data, p).map((value, k) => Math.abs(data.observed[k] - value))
/** The largest difference as a percentage of the total */
export const percentOf = (data: FitData, p: number) => (100 * Math.max(...differencesOf(data, p))) / totalOf(data)
/** Matella's rule: accepted when the largest difference is no more than 5 % of the total */
export const accepted = (data: FitData, p: number) => percentOf(data, p) <= 5 + 1e-9

/** With p = x̄/n, is the largest difference under 5 %, exactly 5 % or over it? */
export const fitPrediction = (state: FitState): Prediction => {
    const data = FIT_DATA[state.data]
    return compareTo(Math.round(percentOf(data, estimateOf(data)) * 1000) / 1000, 5)
}

/** The p (in steps of 0,05) with the smallest largest difference */
export function bestP(data: FitData): number {
    let best = FIT_P.min
    for (let p = FIT_P.min; p <= FIT_P.max; p += FIT_P.step) if (percentOf(data, p) < percentOf(data, best) - 1e-12) best = p
    return best
}

/* ---------- Challenges ---------- */

export const fitChallenges: LabChallenge<FitState>[] = [
    { id: 139111, prompt: say('Bezeroen datuekin, jarri datuen batez bestekotik ateratzen den $p$.', 'Con los datos de los clientes, pon la $p$ que sale de la media de los datos.', 'ببيانات الزبائن، ضع $p$ الناتج من متوسط البيانات.', 'With the customers\' data, set the $p$ that comes from the mean of the data.'), hint: say('$\\bar{x}=1{,}5$ eta $n=3$.', '$\\bar{x}=1{,}5$ y $n=3$.', '$\\bar{x}=1{,}5$ و$n=3$.', '$\\bar{x}=1{,}5$ and $n=3$.'), isSolved: (state) => state.data === 0 && state.p === 50 },
    { id: 139112, prompt: say('Soldaduren datuekin, jarri $p=\\frac{\\bar{x}}{n}$ eta begiratu doikuntza onartzen den.', 'Con los datos de las soldaduras, pon $p=\\frac{\\bar{x}}{n}$ y mira si se acepta el ajuste.', 'ببيانات اللحامات، ضع $p=\\frac{\\bar{x}}{n}$ وانظر هل تُقبل المطابقة.', 'With the welds\' data, set $p=\\frac{\\bar{x}}{n}$ and see whether the fit is accepted.'), hint: say('$\\bar{x}=\\frac{20+20}{100}=0{,}4$ eta $n=2$.', '$\\bar{x}=\\frac{20+20}{100}=0{,}4$ y $n=2$.', '$\\bar{x}=\\frac{20+20}{100}=0{,}4$ و$n=2$.', '$\\bar{x}=\\frac{20+20}{100}=0{,}4$ and $n=2$.'), isSolved: (state) => state.data === 1 && state.p === 20 },
    { id: 139113, prompt: say('Familien datuekin, bilatu $0{,}5$ baino handiagoa den eta doikuntza baztertzen duen $p$ txikiena.', 'Con los datos de las familias, busca la $p$ más pequeña mayor que $0{,}5$ con la que el ajuste se rechaza.', 'ببيانات الأسر، ابحث عن أصغر $p$ أكبر من $0{,}5$ تُرفض معه المطابقة.', 'With the families\' data, find the smallest $p$ above $0{,}5$ with which the fit is rejected.'), hint: say('Igo $p$ pixkanaka eta begiratu diferentziarik handienari.', 'Ve subiendo $p$ y mira la mayor diferencia.', 'زِد $p$ شيئًا فشيئًا وانظر إلى أكبر فرق.', 'Raise $p$ step by step and watch the largest difference.'), isSolved: (state) => state.data === 2 && state.p === firstRejectedAbove(FIT_DATA[2], 50) }
]

/** The first p above a given one (in steps of 0,05) with which the fit is rejected */
export function firstRejectedAbove(data: FitData, from: number): number {
    for (let p = from + FIT_P.step; p <= FIT_P.max; p += FIT_P.step) if (!accepted(data, p)) return p
    return FIT_P.max
}

/** The first p below a given one (in steps of 0,05) with which the fit is rejected */
export function firstRejectedBelow(data: FitData, from: number): number {
    for (let p = from - FIT_P.step; p >= FIT_P.min; p -= FIT_P.step) if (!accepted(data, p)) return p
    return FIT_P.min
}

type FitAsk = 'estimate' | 'best' | 'above' | 'below'

/** Endless practice: in one of the tables, the estimate, the p that fits best, or how far p can move before the fit is rejected */
const fitMaker: LabChallengeMaker<FitState> = (random) => {
    for (;;) {
        const data = randomInt(random, 0, FIT_DATA.length - 1)
        const table = FIT_DATA[data]
        const ask = (['estimate', 'best', 'above', 'below'] as FitAsk[])[randomInt(random, 0, 3)]
        // Moving away from x̄/n only makes sense where x̄/n is accepted
        if ((ask === 'above' || ask === 'below') && !accepted(table, estimateOf(table))) continue
        const target = ask === 'estimate' ? estimateOf(table) : ask === 'best' ? bestP(table) : ask === 'above' ? firstRejectedAbove(table, estimateOf(table)) : firstRejectedBelow(table, estimateOf(table))
        const name = table.title
        const prompt = {
            estimate: say(`«${name.eu}»: jarri $p=\\frac{\\bar{x}}{n}$.`, `«${name.es}»: pon $p=\\frac{\\bar{x}}{n}$.`, `«${name.ar}»: ضع $p=\\frac{\\bar{x}}{n}$.`, `‘${name.en}’: set $p=\\frac{\\bar{x}}{n}$.`),
            best: say(`«${name.eu}»: bilatu diferentziarik handiena txikiena egiten duen $p$.`, `«${name.es}»: busca la $p$ que hace más pequeña la mayor diferencia.`, `«${name.ar}»: ابحث عن $p$ الذي يجعل أكبر فرق أصغر ما يمكن.`, `‘${name.en}’: find the $p$ that makes the largest difference smallest.`),
            above: say(`«${name.eu}»: igo $p$ doikuntza baztertzen den lehen baliora arte.`, `«${name.es}»: sube $p$ hasta el primer valor con el que se rechaza el ajuste.`, `«${name.ar}»: زِد $p$ حتى أول قيمة تُرفض معها المطابقة.`, `‘${name.en}’: raise $p$ up to the first value with which the fit is rejected.`),
            below: say(`«${name.eu}»: jaitsi $p$ doikuntza baztertzen den lehen baliora arte.`, `«${name.es}»: baja $p$ hasta el primer valor con el que se rechaza el ajuste.`, `«${name.ar}»: أنقص $p$ حتى أول قيمة تُرفض معها المطابقة.`, `‘${name.en}’: lower $p$ down to the first value with which the fit is rejected.`)
        }[ask]
        const hint = ask === 'estimate'
            ? say('Lehenik $\\bar{x}$, eta gero zatitu $n$ zenbakiaz.', 'Primero $\\bar{x}$, y después divide entre $n$.', 'أولًا $\\bar{x}$، ثم اقسم على $n$.', 'First $\\bar{x}$, then divide by $n$.')
            : say('Hasi $\\frac{\\bar{x}}{n}$ balioan, mugitu $p$ eta begiratu ehunekoari.', 'Empieza en $\\frac{\\bar{x}}{n}$, mueve $p$ y mira el porcentaje.', 'ابدأ من $\\frac{\\bar{x}}{n}$، وحرّك $p$ وانظر إلى النسبة.', 'Start at $\\frac{\\bar{x}}{n}$, move $p$ and watch the percentage.')
        return { prompt, hint, isSolved: (state) => state.data === data && state.p === target, solution: { data, p: target, prediction: null } }
    }
}

export const fitExtra = freshFrom(initialFitState, fitMaker)
