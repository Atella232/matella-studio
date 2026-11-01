import { randomInt } from '../../../features/unit-v2/games/random.ts'
import { compare, equals, fraction, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { freshFrom, type Prediction } from './prediction.ts'

/* ==========================================================================
   L4 · Zatitik osora (Del trozo al todo): a/b of a bar are worth Q. The
   a known pieces share Q, so one piece is Q/a; copying that piece b times
   builds the whole: Q·b/a. The usual mistake multiplies Q by a/b. First a
   guess: is the whole less than double the part, exactly double or more?
   (It is more exactly when the part is less than half.) ▶ copies the
   piece until the bar is full.
   ========================================================================== */

export const WHOLE_LIMITS = { denominator: { min: 2, max: 10 }, part: { min: 1, max: 60 } } as const

export interface WholeState {
    /** a/b of the whole are known */
    numerator: number
    denominator: number
    /** What those a/b are worth */
    part: number
    prediction: Prediction | null
}

export const initialWholeState: WholeState = { numerator: 2, denominator: 5, part: 10, prediction: null }

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value)))

/** The known part is always a proper fraction; a new problem forgets the guess */
export function setWhole(state: WholeState, patch: Partial<Pick<WholeState, 'numerator' | 'denominator' | 'part'>>): WholeState {
    const denominator = clamp(patch.denominator ?? state.denominator, WHOLE_LIMITS.denominator.min, WHOLE_LIMITS.denominator.max)
    const numerator = clamp(patch.numerator ?? state.numerator, 1, denominator - 1)
    const part = clamp(patch.part ?? state.part, WHOLE_LIMITS.part.min, WHOLE_LIMITS.part.max)
    const same = numerator === state.numerator && denominator === state.denominator && part === state.part
    return same ? state : { numerator, denominator, part, prediction: null }
}

/** One piece: Q/a */
export const piece = (state: Pick<WholeState, 'numerator' | 'part'>): FractionValue => fraction(state.part, state.numerator)
/** The whole: Q·b/a */
export const wholeOf = (state: Pick<WholeState, 'numerator' | 'denominator' | 'part'>): FractionValue => fraction(state.part * state.denominator, state.numerator)
/** The usual mistake: Q·a/b */
export const wholeMistake = (state: Pick<WholeState, 'numerator' | 'denominator' | 'part'>): FractionValue => fraction(state.part * state.numerator, state.denominator)

/** Less than double the part (<), exactly double (=) or more (>)? */
export function wholePrediction(state: WholeState): Prediction {
    const relation = compare(fraction(state.denominator, state.numerator), fraction(2))
    return relation < 0 ? '<' : relation === 0 ? '=' : '>'
}

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const predicted = (state: WholeState) => state.prediction !== null && state.prediction === wholePrediction(state)
const isProblem = (state: WholeState, numerator: number, denominator: number, part: number) => equals(fraction(state.numerator, state.denominator), fraction(numerator, denominator)) && state.part === part

const tankProblem = (numerator: number, denominator: number, part: number) => say(
    `Depositu baten $\\frac{${numerator}}{${denominator}}$ betetzeko $${part}$ litro behar dira. Jarri problema eta asmatu: osoa zatiaren bikoitza baino gutxiago, bikoitza ala gehiago da?`,
    `Para llenar $\\frac{${numerator}}{${denominator}}$ de un depósito hacen falta $${part}$ litros. Monta el problema y acierta: ¿el total es menos del doble de la parte, el doble o más?`,
    `لملء $\\frac{${numerator}}{${denominator}}$ خزان يلزم $${part}$ لترًا. ضع المسألة وخمّن: هل الكل أقل من ضعف الجزء أم ضعفه أم أكثر؟`,
    `Filling $\\frac{${numerator}}{${denominator}}$ of a tank takes $${part}$ litres. Set up the problem and guess: is the whole less than double the part, double or more?`
)
const tankHint = (numerator: number, denominator: number, part: number) => {
    const latex = `\\frac{${part}}{${numerator}}\\cdot ${denominator}`
    return say(`Zati bat: $\\frac{${part}}{${numerator}}$. Osoa: $${latex}$.`, `Un trozo: $\\frac{${part}}{${numerator}}$. El total: $${latex}$.`, `قطعة واحدة: $\\frac{${part}}{${numerator}}$. الكل: $${latex}$.`, `One piece: $\\frac{${part}}{${numerator}}$. The whole: $${latex}$.`)
}

export const wholeChallenges: LabChallenge<WholeState>[] = [
    { id: 33701, prompt: tankProblem(3, 8, 24), hint: tankHint(3, 8, 24), isSolved: (state) => isProblem(state, 3, 8, 24) && predicted(state) },
    { id: 33702, prompt: say('Klase bateko $\\frac{2}{3}$ neskak dira: $16$ neska. Jarri problema eta asmatu.', 'En una clase, $\\frac{2}{3}$ son chicas: $16$ chicas. Monta el problema y acierta.', 'في صف، $\\frac{2}{3}$ بنات: $16$ بنتًا. ضع المسألة وخمّن.', 'In a class, $\\frac{2}{3}$ are girls: $16$ girls. Set up the problem and guess.'), hint: tankHint(2, 3, 16), isSolved: (state) => isProblem(state, 2, 3, 16) && predicted(state) },
    { id: 33703, prompt: say('Zatia $30$ da. Aukeratu zatikia, osoa $50$ izan dadin.', 'La parte vale $30$. Elige la fracción para que el total sea $50$.', 'الجزء يساوي $30$. اختر الكسر ليكون الكل $50$.', 'The part is worth $30$. Choose the fraction so that the whole is $50$.'), hint: say('$\\frac{30}{50}$ sinplifikatu.', 'Simplifica $\\frac{30}{50}$.', 'اختزل $\\frac{30}{50}$.', 'Simplify $\\frac{30}{50}$.'), isSolved: (state) => state.part === 30 && equals(wholeOf(state), fraction(50)) },
    { id: 33704, prompt: say('Zatia $12$ da eta osoa $60$. Zein zatiki da?', 'La parte vale $12$ y el total, $60$. ¿Qué fracción es?', 'الجزء $12$ والكل $60$. ما الكسر؟', 'The part is $12$ and the whole $60$. Which fraction is it?'), hint: say('$\\frac{12}{60}$ sinplifikatu.', 'Simplifica $\\frac{12}{60}$.', 'اختزل $\\frac{12}{60}$.', 'Simplify $\\frac{12}{60}$.'), isSolved: (state) => state.part === 12 && equals(wholeOf(state), fraction(60)) },
    { id: 33705, prompt: say('Zenbakitzailea $3$ izanik, egin osoa zatiaren bikoitza justu izan dadin.', 'Con numerador $3$, haz que el total sea justo el doble de la parte.', 'بالبسط $3$، اجعل الكل ضعف الجزء تمامًا.', 'With numerator $3$, make the whole exactly double the part.'), hint: say('Bikoitza: zatia erdia da, $\\frac{3}{6}$.', 'El doble: la parte es la mitad, $\\frac{3}{6}$.', 'الضعف: الجزء هو النصف، $\\frac{3}{6}$.', 'Double: the part is half, $\\frac{3}{6}$.'), isSolved: (state) => state.numerator === 3 && state.denominator === 6 }
]

/** Endless practice: a/b of a tank and the litres they take */
const wholeMaker: LabChallengeMaker<WholeState> = (random) => {
    const denominator = randomInt(random, 2, 10)
    const numerator = randomInt(random, 1, denominator - 1)
    const part = numerator * randomInt(random, 1, Math.floor(60 / numerator))
    const solution: WholeState = { numerator, denominator, part, prediction: null }
    return { prompt: tankProblem(numerator, denominator, part), hint: tankHint(numerator, denominator, part), isSolved: (state) => isProblem(state, numerator, denominator, part) && predicted(state), solution: { ...solution, prediction: wholePrediction(solution) } }
}

export const wholeExtra = freshFrom(initialWholeState, wholeMaker)
