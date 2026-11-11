import { pick, randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import { compareTo, freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'
import { say } from '../../batx2-zientziak-probabilitatea/lab/probability.ts'
import { binomialPmfDecimal } from '../binomial.ts'
import { above, below, between } from '../normal.ts'

/* ==========================================================================
   L5 · Binomiala kanpaiaren azpian (La binomial bajo la campana): four
   binomials whose σ = √(npq) is 2, 2, 5 or 10, so every edge k ± 0,5
   standardises to a z with two decimals and the normal is read from the
   table exactly. The learner picks k and «at most / at least / exactly»,
   and switches the continuity correction on or off: the bars give the
   exact binomial, the shaded bell the approximation. Before the numbers,
   the learner says whether the normal falls short of the exact value, is
   equal or goes over it. Pure logic.
   ========================================================================== */

export const APPROX_CASES = [
    { n: 16, p: 0.5, mean: 8, sd: 2 },
    { n: 25, p: 0.2, mean: 5, sd: 2 },
    { n: 100, p: 0.5, mean: 50, sd: 5 },
    { n: 400, p: 0.5, mean: 200, sd: 10 }
] as const

export type ApproxMode = 'atMost' | 'atLeast' | 'eq'

export interface ApproxState {
    caseIndex: number
    k: number
    mode: ApproxMode
    corrected: boolean
    prediction: Prediction | null
}

export const initialApproxState: ApproxState = { caseIndex: 2, k: 55, mode: 'atMost', corrected: false, prediction: null }

/** The values of k shown for a case: three deviations around the mean */
export function approxWindow(caseIndex: number) {
    const { n, mean, sd } = APPROX_CASES[caseIndex]
    return { min: Math.max(0, Math.ceil(mean - 3 * sd)), max: Math.min(n, Math.floor(mean + 3 * sd)) }
}

export function setApprox(state: ApproxState, patch: Partial<Pick<ApproxState, 'caseIndex' | 'k' | 'mode' | 'corrected'>>): ApproxState {
    const caseIndex = Math.min(APPROX_CASES.length - 1, Math.max(0, patch.caseIndex ?? state.caseIndex))
    const window = approxWindow(caseIndex)
    // A new binomial starts one deviation above its mean
    const start = caseIndex === state.caseIndex ? (patch.k ?? state.k) : APPROX_CASES[caseIndex].mean + APPROX_CASES[caseIndex].sd
    const k = Math.min(window.max, Math.max(window.min, Math.round(start)))
    const mode = patch.mode ?? state.mode
    const corrected = patch.corrected ?? state.corrected
    const same = caseIndex === state.caseIndex && k === state.k && mode === state.mode && corrected === state.corrected
    return { caseIndex, k, mode, corrected, prediction: same ? state.prediction : null }
}

/** Whether the value j of the binomial counts */
export const approxCounts = (state: Pick<ApproxState, 'k' | 'mode'>, j: number) => (state.mode === 'eq' ? j === state.k : state.mode === 'atLeast' ? j >= state.k : j <= state.k)

/** The exact binomial probability, as a decimal */
export function exactOf(state: Pick<ApproxState, 'caseIndex' | 'k' | 'mode'>): number {
    const { n, p } = APPROX_CASES[state.caseIndex]
    let total = 0
    for (let j = 0; j <= n; j += 1) if (approxCounts(state, j)) total += binomialPmfDecimal(n, p, j)
    return total
}

/** The edges of the shaded band of Y on the x axis (null when the band is a single point) */
export function edgesOf(state: Pick<ApproxState, 'caseIndex' | 'k' | 'mode' | 'corrected'>): { from: number | null; to: number | null } {
    const half = state.corrected ? 0.5 : 0
    if (state.mode === 'atMost') return { from: null, to: state.k + half }
    if (state.mode === 'atLeast') return { from: state.k - half, to: null }
    return { from: state.k - half, to: state.k + half }
}

/** z of an edge, exact with two decimals */
export const approxZ = (caseIndex: number, x: number) => Math.round(((x - APPROX_CASES[caseIndex].mean) / APPROX_CASES[caseIndex].sd) * 100) / 100

/** The normal approximation from the table, in ten-thousandths */
export function approxOf(state: Pick<ApproxState, 'caseIndex' | 'k' | 'mode' | 'corrected'>): number {
    const { from, to } = edgesOf(state)
    if (from !== null && to !== null) return from === to ? 0 : between(approxZ(state.caseIndex, from), approxZ(state.caseIndex, to))
    if (to !== null) return below(approxZ(state.caseIndex, to))
    return above(approxZ(state.caseIndex, from!))
}

/** The normal compared with the exact binomial */
export const approxPrediction = (state: ApproxState): Prediction => compareTo(Math.round(approxOf(state)) / 10_000, Math.round(exactOf(state) * 10_000) / 10_000)

/* ---------- Challenges ---------- */

const caseLatex = (caseIndex: number) => {
    const { n, p } = APPROX_CASES[caseIndex]
    return `B(${n};\\,${String(p).replace('.', '{,}')})`
}
const modeLatex = (mode: ApproxMode, k: number) => (mode === 'atMost' ? `P(X\\le ${k})` : mode === 'atLeast' ? `P(X\\ge ${k})` : `P(X=${k})`)

export const approxChallenges: LabChallenge<ApproxState>[] = [
    { id: 129141, prompt: say('$B(100;\\,0{,}5)$ banaketan, hurbildu $P(X\\ge 60)$ zuzenketarekin.', 'En $B(100;\\,0{,}5)$, aproxima $P(X\\ge 60)$ con la corrección.', 'في $B(100;\\,0{,}5)$، قرّب $P(X\\ge 60)$ مع التصحيح.', 'In $B(100;\\,0{,}5)$, approximate $P(X\\ge 60)$ with the correction.'), hint: say('Aukeratu «gutxienez», $k=60$, eta piztu zuzenketa: 59,5 puntutik hasten da.', 'Elige «al menos», $k=60$, y activa la corrección: empieza en 59,5.', 'اختر «على الأقل» و$k=60$ وفعّل التصحيح: يبدأ عند 59.5.', 'Choose ‘at least’, $k=60$, and switch on the correction: it starts at 59.5.'), isSolved: (state) => state.caseIndex === 2 && state.k === 60 && state.mode === 'atLeast' && state.corrected },
    { id: 129142, prompt: say('Bilatu kasu bat non normalak, zuzenketarik gabe, 0 ematen duen, binomialak ez.', 'Busca un caso en el que la normal sin corrección dé 0 aunque la binomial no.', 'ابحث عن حالة يعطي فيها التوزيع الطبيعي دون تصحيح 0 مع أن الثنائي لا يعطيه.', 'Find a case in which the normal without the correction gives 0 although the binomial does not.'), hint: say('Puntu bakar batek ez du azalerarik.', 'Un solo punto no tiene área.', 'النقطة الواحدة بلا مساحة.', 'A single point has no area.'), isSolved: (state) => state.mode === 'eq' && !state.corrected && exactOf(state) > 0 },
    { id: 129143, prompt: say('$B(16;\\,0{,}5)$ banaketan eta zuzenketarekin, lortu normalak eta binomialak 0,001 baino gutxiagoko aldea izatea $P(X\\le k)$ probabilitatean.', 'En $B(16;\\,0{,}5)$ y con la corrección, consigue que la normal y la binomial se diferencien menos de 0,001 en $P(X\\le k)$.', 'في $B(16;\\,0{,}5)$ ومع التصحيح، اجعل الفرق بين الطبيعي والثنائي أقل من 0.001 في $P(X\\le k)$.', 'In $B(16;\\,0{,}5)$ and with the correction, make the normal and the binomial differ by less than 0.001 in $P(X\\le k)$.'), hint: say('Probatu batez bestekoaren inguruko $k$ balioak.', 'Prueba valores de $k$ cerca de la media.', 'جرّب قيم $k$ قرب المتوسط.', 'Try values of $k$ near the mean.'), isSolved: (state) => state.caseIndex === 0 && state.mode === 'atMost' && state.corrected && Math.abs(approxOf(state) / 10_000 - exactOf(state)) < 0.001 }
]

/** Endless practice: approximate a given probability with the correction */
const approxMaker: LabChallengeMaker<ApproxState> = (random) => {
    const caseIndex = randomInt(random, 0, APPROX_CASES.length - 1)
    const window = approxWindow(caseIndex)
    const k = randomInt(random, window.min, window.max)
    const mode = pick(random, ['atMost', 'atLeast', 'eq'] as const)
    const solution: ApproxState = { caseIndex, k, mode, corrected: true, prediction: null }
    const asked = `${modeLatex(mode, k)}`
    const bin = caseLatex(caseIndex)
    return {
        prompt: say(`$${bin}$ banaketan, hurbildu $${asked}$ zuzenketarekin.`, `En $${bin}$, aproxima $${asked}$ con la corrección.`, `في $${bin}$، قرّب $${asked}$ مع التصحيح.`, `In $${bin}$, approximate $${asked}$ with the correction.`),
        hint: say('Aukeratu binomiala, $k$ eta modua, eta piztu zuzenketa.', 'Elige la binomial, $k$ y el modo, y activa la corrección.', 'اختر التوزيع الثنائي و$k$ والنوع، وفعّل التصحيح.', 'Choose the binomial, $k$ and the mode, and switch on the correction.'),
        isSolved: (state) => state.caseIndex === caseIndex && state.k === k && state.mode === mode && state.corrected,
        solution
    }
}

export const approxExtra = freshFrom(initialApproxState, approxMaker)

/** For the drawing and the readout */
export { caseLatex, modeLatex }
