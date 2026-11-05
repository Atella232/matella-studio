import { randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { compareTo, freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'

/* ==========================================================================
   L2 · Limitearen banda (La banda del límite): the first hundred terms of
   a convergent sequence, the band from L − ε to L + ε and a term N chosen
   by the learner. The learner predicts whether N is too early (some term
   after it is still outside), exactly the first term from which all stay
   inside, or later than needed; then the terms are coloured in and out.
   The distance to the limit is written exactly (1/n, 4/(n + 1)), so
   |aₙ − L| < ε is decided without rounding. Pure logic.
   ========================================================================== */

export interface BandSequence {
    /** The general term in LaTeX */
    latex: string
    limit: number
    /** |aₙ − L|, written exactly */
    gap: (n: number) => number
    term: (n: number) => number
}

export const BAND_SEQUENCES: BandSequence[] = [
    { latex: '\\frac{2n+1}{n}', limit: 2, gap: (n) => 1 / n, term: (n) => 2 + 1 / n },
    { latex: '\\frac{3n-1}{n+1}', limit: 3, gap: (n) => 4 / (n + 1), term: (n) => 3 - 4 / (n + 1) },
    { latex: '1+\\frac{(-1)^n}{n}', limit: 1, gap: (n) => 1 / n, term: (n) => 1 + (n % 2 === 0 ? 1 : -1) / n }
]

export const BAND_EPSILONS = [0.5, 0.25, 0.1, 0.05] as const
export const BAND_TERMS = 100

export interface LimitBandState {
    sequence: number
    /** Index in BAND_EPSILONS */
    epsilon: number
    /** The term from which the learner says all stay in the band */
    from: number
    prediction: Prediction | null
}

export const initialLimitBandState: LimitBandState = { sequence: 0, epsilon: 0, from: 1, prediction: null }

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value)))

export function setLimitBand(state: LimitBandState, patch: Partial<Omit<LimitBandState, 'prediction'>>): LimitBandState {
    const sequence = clamp(patch.sequence ?? state.sequence, 0, BAND_SEQUENCES.length - 1)
    const epsilon = clamp(patch.epsilon ?? state.epsilon, 0, BAND_EPSILONS.length - 1)
    const from = clamp(patch.from ?? state.from, 1, BAND_TERMS)
    const same = sequence === state.sequence && epsilon === state.epsilon && from === state.from
    return { sequence, epsilon, from, prediction: same ? state.prediction : null }
}

/** Whether aₙ is inside the band: |aₙ − L| < ε */
export const insideBand = (sequence: number, epsilon: number, n: number) => BAND_SEQUENCES[sequence].gap(n) < BAND_EPSILONS[epsilon]
/** The first term from which every term stays in the band (the distance only shrinks) */
export function firstInside(sequence: number, epsilon: number): number {
    let n = 1
    while (!insideBand(sequence, epsilon, n)) n += 1
    return n
}
/** Too early (<), exactly the first one (=) or later than needed (>) */
export const limitBandPrediction = (state: LimitBandState): Prediction => compareTo(state.from, firstInside(state.sequence, state.epsilon))

/** ε for LaTeX, with {,} for the comma */
export const epsilonTex = (epsilon: number) => String(BAND_EPSILONS[epsilon]).replace('.', '{,}')

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })

/** «From which term on are all the terms of … within ε of the limit?» */
function askFrom(sequence: number, epsilon: number): LocalizedText {
    const { latex, limit } = BAND_SEQUENCES[sequence]
    const eps = epsilonTex(epsilon)
    return say(
        `$a_n=${latex}$ segidaren limitea ${limit} da. Jarri $N$ gai guztiak bandan geratzen diren lehen gaian, $\\varepsilon=${eps}$ denean.`,
        `El límite de $a_n=${latex}$ es ${limit}. Pon $N$ en el primer término desde el que todos quedan en la banda, con $\\varepsilon=${eps}$.`,
        `نهاية $a_n=${latex}$ هي ${limit}. ضع $N$ عند أول حد تبقى بعده كل الحدود في الشريط، مع $\\varepsilon=${eps}$.`,
        `The limit of $a_n=${latex}$ is ${limit}. Put $N$ on the first term from which they all stay in the band, with $\\varepsilon=${eps}$.`
    )
}

function hintFrom(sequence: number, epsilon: number): LocalizedText {
    const gap = sequence === 1 ? '\\frac{4}{n+1}' : '\\frac{1}{n}'
    const eps = epsilonTex(epsilon)
    return say(`Ebatzi $${gap}<${eps}$.`, `Resuelve $${gap}<${eps}$.`, `حُلّ $${gap}<${eps}$.`, `Solve $${gap}<${eps}$.`)
}

const challenge = (id: number, sequence: number, epsilon: number): LabChallenge<LimitBandState> => ({
    id,
    prompt: askFrom(sequence, epsilon),
    hint: hintFrom(sequence, epsilon),
    isSolved: (state) => state.sequence === sequence && state.epsilon === epsilon && state.from === firstInside(sequence, epsilon)
})

export const limitBandChallenges: LabChallenge<LimitBandState>[] = [
    challenge(100201, 0, 2),
    challenge(100202, 1, 0),
    challenge(100203, 2, 1),
    challenge(100204, 0, 3),
    challenge(100205, 1, 2)
]

/** Endless practice: another sequence and another ε */
const limitBandMaker: LabChallengeMaker<LimitBandState> = (random) => {
    const sequence = randomInt(random, 0, BAND_SEQUENCES.length - 1)
    const epsilon = randomInt(random, 0, BAND_EPSILONS.length - 1)
    const { prompt, hint, isSolved } = challenge(0, sequence, epsilon)
    return { prompt, hint, isSolved, solution: { sequence, epsilon, from: firstInside(sequence, epsilon), prediction: null } }
}

export const limitBandExtra = freshFrom(initialLimitBandState, limitBandMaker)
