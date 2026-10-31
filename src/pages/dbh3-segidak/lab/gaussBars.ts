import { randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { compareTo, freshFrom, type Prediction } from './prediction.ts'

/* ==========================================================================
   L3 · Gaussen barrak (Las barras de Gauss): the terms of an arithmetic
   progression drawn as bars. ▶ turns a copy of them upside down on top:
   every column then measures a₁ + aₙ, there are n columns, and that
   rectangle is twice the sum. The learner predicts whether the sum will
   be below, at or above 100. Pure logic, whole numbers only.
   ========================================================================== */

export const GAUSS_LIMITS = { a1: { min: 1, max: 10 }, d: { min: 1, max: 5 }, n: { min: 2, max: 12 } } as const

export interface GaussState {
    a1: number
    d: number
    n: number
    prediction: Prediction | null
}

export const initialGaussState: GaussState = { a1: 2, d: 3, n: 5, prediction: null }

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value)))

export function setGauss(state: GaussState, patch: Partial<Omit<GaussState, 'prediction'>>): GaussState {
    const a1 = clamp(patch.a1 ?? state.a1, GAUSS_LIMITS.a1.min, GAUSS_LIMITS.a1.max)
    const d = clamp(patch.d ?? state.d, GAUSS_LIMITS.d.min, GAUSS_LIMITS.d.max)
    const n = clamp(patch.n ?? state.n, GAUSS_LIMITS.n.min, GAUSS_LIMITS.n.max)
    const same = a1 === state.a1 && d === state.d && n === state.n
    return { a1, d, n, prediction: same ? state.prediction : null }
}

export const gaussLast = (state: GaussState) => state.a1 + (state.n - 1) * state.d
export const gaussSum = (state: GaussState) => ((state.a1 + gaussLast(state)) * state.n) / 2
export const gaussPrediction = (state: GaussState): Prediction => compareTo(gaussSum(state), 100)

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })

export const gaussChallenges: LabChallenge<GaussState>[] = [
    { id: 89301, prompt: say('Batu $1+2+3+\\cdots+10$.', 'Suma $1+2+3+\\cdots+10$.', 'اجمع $1+2+3+\\cdots+10$.', 'Add $1+2+3+\\cdots+10$.'), hint: say('$a_{1}=1$, $d=1$, $n=10$.', '$a_{1}=1$, $d=1$, $n=10$.', '$a_{1}=1$ و$d=1$ و$n=10$.', '$a_{1}=1$, $d=1$, $n=10$.'), isSolved: (state) => state.a1 === 1 && state.d === 1 && state.n === 10 },
    { id: 89302, prompt: say('Bakoitiak 1etik aurrera: zenbat behar dira 100 batzeko?', 'Impares desde el 1: ¿cuántos hacen falta para sumar 100?', 'الأعداد الفردية من 1: كم عددًا يلزم ليكون المجموع 100؟', 'Odd numbers from 1: how many do you need to add up to 100?'), hint: say('$a_{1}=1$, $d=2$.', '$a_{1}=1$, $d=2$.', '$a_{1}=1$ و$d=2$.', '$a_{1}=1$, $d=2$.'), isSolved: (state) => state.a1 === 1 && state.d === 2 && gaussSum(state) === 100 },
    { id: 89303, prompt: say('6 gai, $a_{1}=5$ eta batura 60.', '6 términos, $a_{1}=5$ y suma 60.', '6 حدود و$a_{1}=5$ والمجموع 60.', '6 terms, $a_{1}=5$ and a sum of 60.'), hint: say('$(5+a_{6})\\cdot 3=60$.', '$(5+a_{6})\\cdot 3=60$.', '$(5+a_{6})\\cdot 3=60$.', '$(5+a_{6})\\cdot 3=60$.'), isSolved: (state) => state.a1 === 5 && state.n === 6 && gaussSum(state) === 60 },
    { id: 89304, prompt: say('8 gai, eta bikote bakoitzak 20 balio du.', '8 términos, y cada pareja suma 20.', '8 حدود ومجموع كل زوج 20.', '8 terms, and each pair adds up to 20.'), hint: say('$a_{1}+a_{8}=20$.', '$a_{1}+a_{8}=20$.', '$a_{1}+a_{8}=20$.', '$a_{1}+a_{8}=20$.'), isSolved: (state) => state.n === 8 && state.a1 + gaussLast(state) === 20 },
    { id: 89305, prompt: say('$a_{1}=2$ eta $d=4$. Lortu batura 98.', '$a_{1}=2$ y $d=4$. Consigue que la suma sea 98.', '$a_{1}=2$ و$d=4$. اجعل المجموع 98.', '$a_{1}=2$ and $d=4$. Make the sum 98.'), hint: say('Saiatu $n$ desberdinekin.', 'Prueba con distintos $n$.', 'جرّب قيمًا مختلفة لـ $n$.', 'Try different values of $n$.'), isSolved: (state) => state.a1 === 2 && state.d === 4 && gaussSum(state) === 98 }
]

/** Endless practice: a progression and the sum to reach by choosing how many terms */
const gaussMaker: LabChallengeMaker<GaussState> = (random) => {
    const a1 = randomInt(random, 1, 10)
    const d = randomInt(random, 1, 5)
    const n = randomInt(random, 3, 12)
    const sum = gaussSum({ a1, d, n, prediction: null })
    return {
        prompt: say(`$a_{1}=${a1}$ eta $d=${d}$. Zenbat gai batu behar dira ${sum} lortzeko?`, `$a_{1}=${a1}$ y $d=${d}$. ¿Cuántos términos hay que sumar para obtener ${sum}?`, `$a_{1}=${a1}$ و$d=${d}$. كم حدًا يجب جمعه للحصول على ${sum}؟`, `$a_{1}=${a1}$ and $d=${d}$. How many terms must be added to get ${sum}?`),
        hint: say(`$S_{n}=\\frac{(a_{1}+a_{n})\\cdot n}{2}$`, `$S_{n}=\\frac{(a_{1}+a_{n})\\cdot n}{2}$`, `$S_{n}=\\frac{(a_{1}+a_{n})\\cdot n}{2}$`, `$S_{n}=\\frac{(a_{1}+a_{n})\\cdot n}{2}$`),
        isSolved: (state) => state.a1 === a1 && state.d === d && state.n === n,
        solution: { a1, d, n, prediction: null }
    }
}

export const gaussExtra = freshFrom(initialGaussState, gaussMaker)
