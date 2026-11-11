import { pick, randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import { compareTo, freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'
import { say } from '../../batx2-zientziak-probabilitatea/lab/probability.ts'
import { between, tableLatex } from '../normal.ts'

/* ==========================================================================
   L3 · Kanpaiaren azpian (Bajo la campana): a normal N(μ; σ) with μ from
   20 to 80 and σ = 2, 4, 5 or 10, and two values a ≤ b that shade the
   area P(a ≤ X ≤ b). The values move in steps that keep z = (x − μ)/σ
   with two decimals, so the area is read from the table exactly as in
   the exercises; ▶ turns the x axis into the z axis (standardising: the
   bell and its areas stay, only the scale changes). Before the area, the
   learner says whether it is less than, equal to or more than 0,5. Pure.
   ========================================================================== */

export const BELL_SDS = [2, 4, 5, 10] as const
export const BELL_MEAN = { min: 20, max: 80, step: 5 } as const

export interface BellState {
    mean: number
    sd: number
    a: number
    b: number
    prediction: Prediction | null
}

export const initialBellState: BellState = { mean: 50, sd: 10, a: 46, b: 70, prediction: null }

/** How far a and b move at a time: z then keeps two decimals (0,5 · 0,25 · 0,2 · 0,2) */
export const bellStep = (sd: number) => (sd === 10 ? 2 : 1)
/** a and b stay within three deviations of the mean */
export const bellRange = (state: Pick<BellState, 'mean' | 'sd'>) => ({ min: state.mean - 3 * state.sd, max: state.mean + 3 * state.sd })

const snap = (state: Pick<BellState, 'mean' | 'sd'>, value: number) => {
    const { min, max } = bellRange(state)
    const step = bellStep(state.sd)
    const snapped = state.mean + step * Math.round((value - state.mean) / step)
    return Math.min(max, Math.max(min, snapped))
}

export function setBell(state: BellState, patch: Partial<Pick<BellState, 'mean' | 'sd' | 'a' | 'b'>>): BellState {
    const mean = Math.min(BELL_MEAN.max, Math.max(BELL_MEAN.min, BELL_MEAN.step * Math.round((patch.mean ?? state.mean) / BELL_MEAN.step)))
    const sd = (BELL_SDS as readonly number[]).includes(patch.sd ?? state.sd) ? (patch.sd ?? state.sd) : state.sd
    let a: number
    let b: number
    if (mean !== state.mean || sd !== state.sd) {
        // A new bell starts with the band μ ± σ
        a = mean - sd
        b = mean + sd
    } else {
        a = snap({ mean, sd }, patch.a ?? state.a)
        b = snap({ mean, sd }, patch.b ?? state.b)
        if (a > b) {
            if (patch.a !== undefined) a = b
            else b = a
        }
    }
    const same = mean === state.mean && sd === state.sd && a === state.a && b === state.b
    return { mean, sd, a, b, prediction: same ? state.prediction : null }
}

/** z = (x − μ)/σ, exact with two decimals */
export const zOf = (state: Pick<BellState, 'mean' | 'sd'>, x: number) => Math.round(((x - state.mean) / state.sd) * 100) / 100

/** P(a ≤ X ≤ b) from the table, in ten-thousandths */
export const areaOf = (state: Pick<BellState, 'mean' | 'sd' | 'a' | 'b'>) => between(zOf(state, state.a), zOf(state, state.b))

/** The shaded area compared with 0,5 */
export const bellPrediction = (state: BellState): Prediction => compareTo(areaOf(state), 5000)

/* ---------- Challenges ---------- */

export const bellChallenges: LabChallenge<BellState>[] = [
    { id: 129121, prompt: say('$N(50;\\,10)$ banaketan, itzaleztatu erdiko % 68,26.', 'En una $N(50;\\,10)$, sombrea el 68,26 % central.', 'في $N(50;\\,10)$، ظلّل الـ 68.26٪ الوسطى.', 'In $N(50;\\,10)$, shade the middle 68.26%.'), hint: say('Batez bestekotik desbideratze bat alde bakoitzera.', 'Una desviación a cada lado de la media.', 'انحراف واحد على كل جانب من المتوسط.', 'One deviation on each side of the mean.'), isSolved: (state) => state.mean === 50 && state.sd === 10 && state.a === 40 && state.b === 60 },
    { id: 129122, prompt: say('$N(60;\\,4)$ banaketan, itzaleztatu 60 puntutik aurrera 0,4332 azalera.', 'En una $N(60;\\,4)$, sombrea desde 60 un área de 0,4332.', 'في $N(60;\\,4)$، ظلّل ابتداءً من 60 مساحة قدرها 0.4332.', 'In $N(60;\\,4)$, shade an area of 0.4332 starting at 60.'), hint: say('$0{,}4332=0{,}9332-0{,}5$: bilatu 0,9332 taulan.', '$0{,}4332=0{,}9332-0{,}5$: busca 0,9332 en la tabla.', '$0{,}4332=0{,}9332-0{,}5$: ابحث عن 0.9332 في الجدول.', '$0{,}4332=0{,}9332-0{,}5$: look for 0.9332 in the table.'), isSolved: (state) => state.mean === 60 && state.sd === 4 && state.a === 60 && state.b === 66 },
    { id: 129123, prompt: say('$\\sigma=5$ eta $a=30$ izanik, lortu 0,9544 azalera, batez bestekoaren inguruan zentratua.', 'Con $\\sigma=5$ y $a=30$, consigue un área de 0,9544 centrada en la media.', 'مع $\\sigma=5$ و$a=30$، احصل على مساحة 0.9544 متمركزة حول المتوسط.', 'With $\\sigma=5$ and $a=30$, get an area of 0.9544 centred on the mean.'), hint: say('0,9544 bi desbideratzera dago alde bakoitzean: $\\mu=a+2\\sigma$.', '0,9544 está a dos desviaciones por cada lado: $\\mu=a+2\\sigma$.', '0.9544 على بعد انحرافين من كل جانب: $\\mu=a+2\\sigma$.', '0.9544 lies two deviations on each side: $\\mu=a+2\\sigma$.'), isSolved: (state) => state.sd === 5 && state.mean === 40 && state.a === 30 && state.b === 50 }
]

/** Endless practice: a bell and a, and b to be found from the area */
const bellMaker: LabChallengeMaker<BellState> = (random) => {
    for (;;) {
        const mean = BELL_MEAN.step * randomInt(random, BELL_MEAN.min / BELL_MEAN.step, BELL_MEAN.max / BELL_MEAN.step)
        const sd = pick(random, BELL_SDS)
        const step = bellStep(sd)
        const reach = Math.floor((2.5 * sd) / step)
        const low = randomInt(random, -reach, Math.floor(reach / 2))
        const high = randomInt(random, low + 1, reach)
        const solution: BellState = { mean, sd, a: mean + low * step, b: mean + high * step, prediction: null }
        const area = areaOf(solution)
        if (area <= 0) continue
        const n = `N(${mean};\\,${sd})`
        return {
            prompt: say(`$${n}$ banaketan eta $a=${solution.a}$ izanik, mugitu $b$ azalera $${tableLatex(area)}$ izan arte.`, `En una $${n}$ y con $a=${solution.a}$, mueve $b$ hasta que el área sea $${tableLatex(area)}$.`, `في $${n}$ ومع $a=${solution.a}$، حرّك $b$ حتى تصير المساحة $${tableLatex(area)}$.`, `In $${n}$ and with $a=${solution.a}$, move $b$ until the area is $${tableLatex(area)}$.`),
            hint: say('Azalera $P(Z\\le z_b)-P(Z\\le z_a)$ da: gehitu $a$ puntuaren azpikoa eta bilatu taulan.', 'El área es $P(Z\\le z_b)-P(Z\\le z_a)$: suma lo de debajo de $a$ y búscalo en la tabla.', 'المساحة $P(Z\\le z_b)-P(Z\\le z_a)$: أضف ما تحت $a$ وابحث عنه في الجدول.', 'The area is $P(Z\\le z_b)-P(Z\\le z_a)$: add what lies below $a$ and look for it in the table.'),
            isSolved: (state) => state.mean === mean && state.sd === sd && state.a === solution.a && areaOf(state) === area,
            solution
        }
    }
}

export const bellExtra = freshFrom(initialBellState, bellMaker)
