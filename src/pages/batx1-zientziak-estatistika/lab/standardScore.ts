import { pick, randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import { fraction, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'

/* ==========================================================================
   L1 · Puntuazio tipikoa (La puntuación típica): two marks, A and B, each
   in its own group with its mean and σ. Before predicting, each mark sits
   on its own ruler of marks 0–10; once the learner has said who stands
   out more, the two rulers are lined up in standard deviations and
   z = (x − x̄) / σ answers. Everything is kept in halves (a mark of 7,5 is
   15) so every z is an exact fraction. Pure logic.
   ========================================================================== */

export interface ScoreGroup {
    /** The group's mean, in halves */
    mean: number
    /** The group's standard deviation, in halves */
    sd: number
    /** The mark, in halves */
    mark: number
}

export interface ScoreState {
    groups: [ScoreGroup, ScoreGroup]
    /** The group whose numbers the steppers change */
    editing: 0 | 1
    prediction: Prediction | null
}

export const SCORE_LIMITS = { mean: { min: 4, max: 18 }, sd: { min: 1, max: 6 }, mark: { min: 0, max: 20 } } as const

/** The lesson's student: 8 in Maths (mean 7, σ 2) and 7 in Language (mean 6, σ 0,5) */
export const initialScoreState: ScoreState = { groups: [{ mean: 14, sd: 4, mark: 16 }, { mean: 12, sd: 1, mark: 14 }], editing: 0, prediction: null }

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value)))

export function setScore(state: ScoreState, group: 0 | 1, patch: Partial<ScoreGroup>): ScoreState {
    const current = state.groups[group]
    const next: ScoreGroup = {
        mean: clamp(patch.mean ?? current.mean, SCORE_LIMITS.mean.min, SCORE_LIMITS.mean.max),
        sd: clamp(patch.sd ?? current.sd, SCORE_LIMITS.sd.min, SCORE_LIMITS.sd.max),
        mark: clamp(patch.mark ?? current.mark, SCORE_LIMITS.mark.min, SCORE_LIMITS.mark.max)
    }
    const groups = (group === 0 ? [next, state.groups[1]] : [state.groups[0], next]) as [ScoreGroup, ScoreGroup]
    const same = next.mean === current.mean && next.sd === current.sd && next.mark === current.mark
    return { ...state, groups, prediction: same ? state.prediction : null }
}

export const setEditing = (state: ScoreState, editing: 0 | 1): ScoreState => ({ ...state, editing })

/** z = (x − x̄) / σ, exact (the halves cancel) */
export const zScore = (group: ScoreGroup): FractionValue => fraction(group.mark - group.mean, group.sd)
export const zValue = (group: ScoreGroup) => (group.mark - group.mean) / group.sd

/** Who stands out more: A (<), the same (=) or B (>) */
export function scorePrediction(state: ScoreState): Prediction {
    const difference = zValue(state.groups[0]) - zValue(state.groups[1])
    return Math.abs(difference) < 1e-9 ? '=' : difference > 0 ? '<' : '>'
}

const zIs = (group: ScoreGroup, numerator: number, denominator = 1) => (group.mark - group.mean) * denominator === numerator * group.sd

/* ---------- Challenges ---------- */

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })

export const scoreChallenges: LabChallenge<ScoreState>[] = [
    { id: 114101, prompt: say('Egin A notaren puntuazio tipikoa 2 izatea.', 'Haz que la nota A tenga puntuación típica 2.', 'اجعل الدرجة المعيارية للعلامة A تساوي 2.', 'Make mark A have a standard score of 2.'), hint: say('Nota batez bestekoaren gainetik egon behar da, bi desbideratze tipikora: $x=\\bar{x}+2\\sigma$.', 'La nota tiene que estar dos desviaciones típicas por encima de la media: $x=\\bar{x}+2\\sigma$.', 'يجب أن تكون العلامة فوق المتوسط بانحرافين معياريين: $x=\\bar{x}+2\\sigma$.', 'The mark must be two standard deviations above the mean: $x=\\bar{x}+2\\sigma$.'), isSolved: (state) => zIs(state.groups[0], 2) },
    { id: 114102, prompt: say('Batez besteko desberdinekin, egin A eta B notek puntuazio tipiko bera izatea.', 'Con medias distintas, haz que A y B tengan la misma puntuación típica.', 'بمتوسطين مختلفين، اجعل للعلامتين A وB الدرجة المعيارية نفسها.', 'With different means, make A and B have the same standard score.'), hint: say('Adibidez, biak batez bestekoaren gainetik desbideratze batera.', 'Por ejemplo, las dos una desviación por encima de su media.', 'مثلًا، كلتاهما فوق متوسطها بانحراف واحد.', 'For example, both one deviation above their mean.'), isSolved: (state) => state.groups[0].mean !== state.groups[1].mean && scorePrediction(state) === '=' },
    { id: 114103, prompt: say('Egin bi notak berdinak izatea, eta A nabarmentzea gehiago.', 'Haz que las dos notas sean iguales y que A destaque más.', 'اجعل العلامتين متساويتين وأن تتميّز A أكثر.', 'Make the two marks equal and have A stand out more.'), hint: say('Nota bera, baina A taldearen batez bestekoa txikiagoa edo $\\sigma$ txikiagoa.', 'La misma nota, pero con una media de A más baja o una $\\sigma$ más pequeña.', 'العلامة نفسها لكن بمتوسط أقل لـ A أو $\\sigma$ أصغر.', 'The same mark, but with a lower mean for A or a smaller $\\sigma$.'), isSolved: (state) => state.groups[0].mark === state.groups[1].mark && scorePrediction(state) === '<' }
]

/** A number in halves for LaTeX: 15 → 7{,}5 */
export const halfLatex = (halves: number) => (halves % 2 === 0 ? String(halves / 2) : `${(halves - 1) / 2}{,}5`)
/** A z for LaTeX: 1{,}5, -2, \frac{1}{3} */
export function zLatex(value: FractionValue): string {
    const sign = value.numerator < 0 ? '-' : ''
    const n = Math.abs(value.numerator)
    if (value.denominator === 1) return `${sign}${n}`
    if (value.denominator === 2) return `${sign}${(n - 1) / 2}{,}5`
    if (value.denominator === 4 || value.denominator === 5 || value.denominator === 10) return `${sign}${String(n / value.denominator).replace('.', '{,}')}`
    return `${sign}\\frac{${n}}{${value.denominator}}`
}

const NAMES = ['A', 'B'] as const

/** Endless practice: give one of the marks a standard score, or make the two equal with different σ */
const scoreMaker: LabChallengeMaker<ScoreState> = (random) => {
    for (;;) {
        const group = pick<0 | 1>(random, [0, 1])
        const goal = pick(random, ['value', 'value', 'equal'] as const)
        const mean = randomInt(random, 8, 16)
        const sd = randomInt(random, 1, 4)
        if (goal === 'value') {
            // z in halves: −2, −1,5 … 2,5
            const twiceZ = pick(random, [-4, -3, -2, 2, 3, 4, 5])
            const mark2 = 2 * mean + twiceZ * sd
            if (mark2 % 2 !== 0) continue
            const mark = mark2 / 2
            if (mark < SCORE_LIMITS.mark.min || mark > SCORE_LIMITS.mark.max) continue
            const z = zLatex(fraction(twiceZ, 2))
            const times = twiceZ < 0 ? `(${z})` : z
            const solution = setScore(initialScoreState, group, { mean, sd, mark })
            return {
                prompt: say(`Egin ${NAMES[group]} notaren puntuazio tipikoa $${z}$ izatea.`, `Haz que la nota ${NAMES[group]} tenga puntuación típica $${z}$.`, `اجعل الدرجة المعيارية للعلامة ${NAMES[group]} تساوي $${z}$.`, `Make mark ${NAMES[group]} have a standard score of $${z}$.`),
                hint: say(`$x=\\bar{x}+${times}\\cdot\\sigma$: aukeratu batez bestekoa eta $\\sigma$, eta kalkulatu nota.`, `$x=\\bar{x}+${times}\\cdot\\sigma$: elige la media y $\\sigma$, y calcula la nota.`, `$x=\\bar{x}+${times}\\cdot\\sigma$: اختر المتوسط و$\\sigma$ ثم احسب العلامة.`, `$x=\\bar{x}+${times}\\cdot\\sigma$: choose the mean and $\\sigma$, then work out the mark.`),
                isSolved: (state) => zIs(state.groups[group], twiceZ, 2),
                solution
            }
        }
        // The same z for both, with different σ
        const twiceZ = pick(random, [-2, 2, 4])
        const otherSd = sd === 4 ? 2 : sd + 1
        const markA = mean + (twiceZ * sd) / 2
        const markB = mean + (twiceZ * otherSd) / 2
        if (!Number.isInteger(markA) || !Number.isInteger(markB) || [markA, markB].some((mark) => mark < 0 || mark > 20)) continue
        const z = zLatex(fraction(twiceZ, 2))
        const solution: ScoreState = { groups: [{ mean, sd, mark: markA }, { mean, sd: otherSd, mark: markB }], editing: 0, prediction: null }
        return {
            prompt: say(`$\\sigma$ desberdinekin, egin bi notek $${z}$ puntuazio tipikoa izatea.`, `Con $\\sigma$ distintas, haz que las dos notas tengan puntuación típica $${z}$.`, `بانحرافين $\\sigma$ مختلفين، اجعل الدرجة المعيارية للعلامتين $${z}$.`, `With different $\\sigma$, make both marks have a standard score of $${z}$.`),
            hint: say('Talde bakoitzean, $x=\\bar{x}+z\\cdot\\sigma$.', 'En cada grupo, $x=\\bar{x}+z\\cdot\\sigma$.', 'في كل مجموعة $x=\\bar{x}+z\\cdot\\sigma$.', 'In each group, $x=\\bar{x}+z\\cdot\\sigma$.'),
            isSolved: (state) => state.groups[0].sd !== state.groups[1].sd && zIs(state.groups[0], twiceZ, 2) && zIs(state.groups[1], twiceZ, 2),
            solution
        }
    }
}

export const scoreExtra = freshFrom(initialScoreState, scoreMaker)
