import { randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { compareTo, freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'

/* ==========================================================================
   L1 · Fibonacci eta zenbaki urrea (Fibonacci y el número de oro): two
   starting terms and the rule aₙ = aₙ₋₁ + aₙ₋₂. The board plots the
   quotients aₖ/aₖ₋₁ against the line of φ: they jump above and below it,
   closer and closer, whatever the two starting terms. The learner first
   predicts whether the last quotient is below φ, exactly φ or above it
   («exactly» never happens: φ is irrational). Pure logic.
   ========================================================================== */

export const PHI = (1 + Math.sqrt(5)) / 2
export const FIB_LIMITS = { start: { min: 1, max: 9 }, n: { min: 3, max: 12 } } as const

export interface FibState {
    a1: number
    a2: number
    /** How many terms are shown */
    n: number
    prediction: Prediction | null
}

export const initialFibState: FibState = { a1: 1, a2: 1, n: 5, prediction: null }

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value)))

export function setFib(state: FibState, patch: Partial<Omit<FibState, 'prediction'>>): FibState {
    const a1 = clamp(patch.a1 ?? state.a1, FIB_LIMITS.start.min, FIB_LIMITS.start.max)
    const a2 = clamp(patch.a2 ?? state.a2, FIB_LIMITS.start.min, FIB_LIMITS.start.max)
    const n = clamp(patch.n ?? state.n, FIB_LIMITS.n.min, FIB_LIMITS.n.max)
    const same = a1 === state.a1 && a2 === state.a2 && n === state.n
    return { a1, a2, n, prediction: same ? state.prediction : null }
}

/** The first `count` terms of the sequence that starts with a1, a2 */
export function fibTerms({ a1, a2 }: Pick<FibState, 'a1' | 'a2'>, count: number): number[] {
    const terms = [a1, a2]
    while (terms.length < count) terms.push(terms[terms.length - 1] + terms[terms.length - 2])
    return terms.slice(0, count)
}

/** aₖ, counting from 1 */
export const fibTerm = (state: Pick<FibState, 'a1' | 'a2'>, k: number) => fibTerms(state, k)[k - 1]
/** The quotients aₖ/aₖ₋₁ for k = 2…n */
export const fibRatios = (state: FibState) => {
    const terms = fibTerms(state, state.n)
    return terms.slice(1).map((term, index) => term / terms[index])
}
/** The last quotient, aₙ/aₙ₋₁ */
export const fibRatio = (state: FibState) => fibTerm(state, state.n) / fibTerm(state, state.n - 1)
/** Below, exactly on or above φ */
export const fibPrediction = (state: FibState): Prediction => compareTo(fibRatio(state), PHI)

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })

export const fibChallenges: LabChallenge<FibState>[] = [
    { id: 100101, prompt: say('Erakutsi Fibonacciren segidaren lehen 8 gaiak, $a_1=a_2=1$ hasita.', 'Muestra los 8 primeros términos de la sucesión de Fibonacci, con $a_1=a_2=1$.', 'اعرض الحدود الثمانية الأولى من متتالية فيبوناتشي مع $a_1=a_2=1$.', 'Show the first 8 terms of the Fibonacci sequence, with $a_1=a_2=1$.'), hint: say('Jarri $a_1=1$, $a_2=1$ eta 8 gai.', 'Pon $a_1=1$, $a_2=1$ y 8 términos.', 'ضع $a_1=1$ و$a_2=1$ و8 حدود.', 'Set $a_1=1$, $a_2=1$ and 8 terms.'), isSolved: (state) => state.a1 === 1 && state.a2 === 1 && state.n === 8 },
    { id: 100102, prompt: say('Aukeratu hasierako bi gaiak, $a_5=11$ izan dadin.', 'Elige los dos términos iniciales para que $a_5=11$.', 'اختر الحدين الأولين بحيث يكون $a_5=11$.', 'Choose the two starting terms so that $a_5=11$.'), hint: say('$a_5=2a_1+3a_2$ da.', 'Resulta que $a_5=2a_1+3a_2$.', 'لاحظ أن $a_5=2a_1+3a_2$.', 'It turns out that $a_5=2a_1+3a_2$.'), isSolved: (state) => state.n >= 5 && fibTerm(state, 5) === 11 },
    { id: 100103, prompt: say('$a_1=a_2=1$ hasita, aurkitu zein $n$ den lehena, zatidura $\\varphi$ zenbakitik $0{,}001$ baino gertuago egoteko.', 'Con $a_1=a_2=1$, busca el primer $n$ cuyo cociente está a menos de $0{,}001$ de $\\varphi$.', 'مع $a_1=a_2=1$ ابحث عن أول $n$ يكون خارج قسمته على بعد أقل من $0{,}001$ عن $\\varphi$.', 'With $a_1=a_2=1$, find the first $n$ whose quotient is less than $0{,}001$ away from $\\varphi$.'), hint: say('Igo gaien kopurua banan-banan, eta begiratu zatidura.', 'Sube el número de términos de uno en uno y mira el cociente.', 'زد عدد الحدود واحدًا واحدًا وانظر إلى خارج القسمة.', 'Add terms one at a time and watch the quotient.'), isSolved: (state) => state.a1 === 1 && state.a2 === 1 && state.n === 10 },
    { id: 100104, prompt: say('Hasi $a_1=2$ eta $a_2=7$ zenbakiekin, eta erakutsi 12 gai. Zatidura ere $\\varphi$ zenbakira hurbiltzen da?', 'Empieza con $a_1=2$ y $a_2=7$ y muestra 12 términos. ¿También se acerca el cociente a $\\varphi$?', 'ابدأ بـ $a_1=2$ و$a_2=7$ واعرض 12 حدًا. هل يقترب خارج القسمة من $\\varphi$ أيضًا؟', 'Start with $a_1=2$ and $a_2=7$ and show 12 terms. Does the quotient get close to $\\varphi$ too?'), hint: say('Jarri $a_1=2$, $a_2=7$ eta 12 gai.', 'Pon $a_1=2$, $a_2=7$ y 12 términos.', 'ضع $a_1=2$ و$a_2=7$ و12 حدًا.', 'Set $a_1=2$, $a_2=7$ and 12 terms.'), isSolved: (state) => state.a1 === 2 && state.a2 === 7 && state.n === 12 },
    { id: 100105, prompt: say('$a_1=a_2=1$ hasita, aurkitu $n$ txikiena: azken zatidura $\\varphi$ baino txikiagoa, eta $\\varphi$ zenbakitik $0{,}05$ baino gertuago.', 'Con $a_1=a_2=1$, busca el $n$ más pequeño con el último cociente por debajo de $\\varphi$ y a menos de $0{,}05$ de él.', 'مع $a_1=a_2=1$ ابحث عن أصغر $n$ يكون فيه آخر خارج قسمة أصغر من $\\varphi$ وعلى بعد أقل من $0{,}05$ عنه.', 'With $a_1=a_2=1$, find the smallest $n$ with the last quotient below $\\varphi$ and less than $0{,}05$ away from it.'), hint: say('Zatidurak txandaka geratzen dira $\\varphi$ zenbakiaren azpitik eta gainetik.', 'Los cocientes quedan por turnos debajo y encima de $\\varphi$.', 'تقع خوارج القسمة بالتناوب تحت $\\varphi$ وفوقه.', 'The quotients take turns below and above $\\varphi$.'), isSolved: (state) => state.a1 === 1 && state.a2 === 1 && state.n === 6 }
]

/** Endless practice: two starting terms that give a chosen term */
const fibMaker: LabChallengeMaker<FibState> = (random) => {
    const a1 = randomInt(random, FIB_LIMITS.start.min, FIB_LIMITS.start.max)
    const a2 = randomInt(random, FIB_LIMITS.start.min, FIB_LIMITS.start.max)
    const k = randomInt(random, 4, 7)
    const target = fibTerm({ a1, a2 }, k)
    // aₖ = F·a₁ + G·a₂, with the Fibonacci numbers F = Fₖ₋₂ and G = Fₖ₋₁
    const [f, g] = [fibTerm({ a1: 1, a2: 1 }, k - 2), fibTerm({ a1: 1, a2: 1 }, k - 1)]
    const formula = `a_${k}=${f === 1 ? '' : f}a_1+${g}a_2`
    return {
        prompt: say(`Aukeratu hasierako bi gaiak, $a_${k}=${target}$ izan dadin.`, `Elige los dos términos iniciales para que $a_${k}=${target}$.`, `اختر الحدين الأولين بحيث يكون $a_${k}=${target}$.`, `Choose the two starting terms so that $a_${k}=${target}$.`),
        hint: say(`$${formula}$ da.`, `Resulta que $${formula}$.`, `لاحظ أن $${formula}$.`, `It turns out that $${formula}$.`),
        isSolved: (state) => state.n >= k && fibTerm(state, k) === target,
        solution: { a1, a2, n: k, prediction: null }
    }
}

export const fibExtra = freshFrom(initialFibState, fibMaker)
