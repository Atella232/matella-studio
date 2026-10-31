import { randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { compareTo, freshFrom, type Prediction } from './prediction.ts'

/* ==========================================================================
   L2 · Igela zuzenean (La rana en la recta): an arithmetic progression as a
   frog jumping along the number line. It starts on a₁ and every jump
   measures d, so after n − 1 jumps it is on aₙ = a₁ + (n − 1)·d. The
   learner predicts whether aₙ will be above, on or below a₁, then ▶ runs
   the jumps. Pure logic, whole numbers only.
   ========================================================================== */

export const FROG_LIMITS = { a1: { min: -10, max: 20 }, d: { min: -5, max: 5 }, n: { min: 1, max: 15 } } as const

export interface FrogState {
    a1: number
    d: number
    n: number
    prediction: Prediction | null
}

export const initialFrogState: FrogState = { a1: 1, d: 2, n: 4, prediction: null }

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value)))

export function setFrog(state: FrogState, patch: Partial<Omit<FrogState, 'prediction'>>): FrogState {
    const a1 = clamp(patch.a1 ?? state.a1, FROG_LIMITS.a1.min, FROG_LIMITS.a1.max)
    const d = clamp(patch.d ?? state.d, FROG_LIMITS.d.min, FROG_LIMITS.d.max)
    const n = clamp(patch.n ?? state.n, FROG_LIMITS.n.min, FROG_LIMITS.n.max)
    const same = a1 === state.a1 && d === state.d && n === state.n
    return { a1, d, n, prediction: same ? state.prediction : null }
}

export const frogTerm = (state: FrogState, k = state.n) => state.a1 + (k - 1) * state.d
/** Will aₙ be below, on or above a₁? */
export const frogPrediction = (state: FrogState): Prediction => compareTo(frogTerm(state), state.a1)

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })

export const frogChallenges: LabChallenge<FrogState>[] = [
    { id: 89201, prompt: say('$a_{1}=2$ dela, lortu $a_{10}=29$.', 'Con $a_{1}=2$, consigue $a_{10}=29$.', 'مع $a_{1}=2$ احصل على $a_{10}=29$.', 'With $a_{1}=2$, get $a_{10}=29$.'), hint: say('9 jauzitan 27 aurreratu.', 'En 9 saltos avanza 27.', 'في 9 قفزات يتقدم 27.', 'In 9 jumps it moves 27.'), isSolved: (state) => state.a1 === 2 && state.n === 10 && frogTerm(state) === 29 },
    { id: 89202, prompt: say('Hasi 12 zenbakian eta iritsi zerora bosgarren gaian.', 'Desde 12, llega a 0 en el quinto término.', 'انطلاقًا من 12 بلغ 0 في الحد الخامس.', 'Starting at 12, reach 0 at the fifth term.'), hint: say('4 jauzi, guztira $-12$.', '4 saltos, en total $-12$.', '4 قفزات مجموعها $-12$.', '4 jumps, $-12$ in total.'), isSolved: (state) => state.a1 === 12 && state.n === 5 && frogTerm(state) === 0 },
    { id: 89203, prompt: say('$d=2$ dela, aurkitu $a_{1}$ zortzigarren gaia 20 izan dadin.', 'Con $d=2$, busca $a_{1}$ para que el octavo término sea 20.', 'مع $d=2$ جد $a_{1}$ ليكون الحد الثامن 20.', 'With $d=2$, find $a_{1}$ so that the eighth term is 20.'), hint: say('$a_{1}=20-7\\cdot 2$.', '$a_{1}=20-7\\cdot 2$.', '$a_{1}=20-7\\cdot 2$.', '$a_{1}=20-7\\cdot 2$.'), isSolved: (state) => state.d === 2 && state.n === 8 && frogTerm(state) === 20 },
    { id: 89204, prompt: say('Egin progresio konstante bat: $a_{6}=a_{1}=7$.', 'Haz una progresión constante: $a_{6}=a_{1}=7$.', 'اصنع متتالية ثابتة: $a_{6}=a_{1}=7$.', 'Make a constant progression: $a_{6}=a_{1}=7$.'), hint: say('Zein jauzik ez du igela mugitzen?', '¿Qué salto no mueve a la rana?', 'أي قفزة لا تحرّك الضفدع؟', 'Which jump does not move the frog?'), isSolved: (state) => state.a1 === 7 && state.n === 6 && state.d === 0 },
    { id: 89205, prompt: say('$d=-1$ dela, lortu $a_{15}=-2$.', 'Con $d=-1$, consigue $a_{15}=-2$.', 'مع $d=-1$ احصل على $a_{15}=-2$.', 'With $d=-1$, get $a_{15}=-2$.'), hint: say('$a_{1}=-2+14$.', '$a_{1}=-2+14$.', '$a_{1}=-2+14$.', '$a_{1}=-2+14$.'), isSolved: (state) => state.d === -1 && state.n === 15 && frogTerm(state) === -2 }
]

/** Endless practice: a first term and a difference are given, and a term to reach */
const frogMaker: LabChallengeMaker<FrogState> = (random) => {
    for (;;) {
        const a1 = randomInt(random, -8, 15)
        const d = randomInt(random, -4, 4)
        const n = randomInt(random, 4, 15)
        if (d === 0) continue
        const value = a1 + (n - 1) * d
        return {
            prompt: say(`$a_{1}=${a1}$ eta $d=${d}$. Eraman igela $a_{${n}}$ gaira.`, `$a_{1}=${a1}$ y $d=${d}$. Lleva la rana hasta $a_{${n}}$.`, `$a_{1}=${a1}$ و$d=${d}$. أوصل الضفدع إلى $a_{${n}}$.`, `$a_{1}=${a1}$ and $d=${d}$. Take the frog to $a_{${n}}$.`),
            hint: say(`$a_{${n}}=${a1}+${n - 1}\\cdot(${d})=${value}$`, `$a_{${n}}=${a1}+${n - 1}\\cdot(${d})=${value}$`, `$a_{${n}}=${a1}+${n - 1}\\cdot(${d})=${value}$`, `$a_{${n}}=${a1}+${n - 1}\\cdot(${d})=${value}$`),
            isSolved: (state) => state.a1 === a1 && state.d === d && state.n === n,
            solution: { a1, d, n, prediction: null }
        }
    }
}

export const frogExtra = freshFrom(initialFrogState, frogMaker)
