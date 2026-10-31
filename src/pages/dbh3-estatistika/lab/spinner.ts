import { createRandom, pick } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { compareTo, freshFrom, type Prediction } from './prediction.ts'

/* ==========================================================================
   L4 · Ruleta (La ruleta): the learner paints a spinner with equal sectors,
   red, blue and green (12 at most). Laplace gives P(red) = red sectors ÷
   all sectors. ▶ spins it 10, 100 or 1000 times (each a fixed draw, so it
   can be tested) and the relative frequency of red gets close to the
   probability. First a guess: is P(red) less than, exactly or more than
   one half?
   ========================================================================== */

export const SPINNER_MAX = 12
export const SPINS = [10, 100, 1000] as const

export interface SpinnerState {
    red: number
    blue: number
    green: number
    spins: number
    prediction: Prediction | null
}

export const initialSpinnerState: SpinnerState = { red: 1, blue: 1, green: 1, spins: 0, prediction: null }

export const sectors = (state: Pick<SpinnerState, 'red' | 'blue' | 'green'>) => state.red + state.blue + state.green

export function setSpinner(state: SpinnerState, patch: Partial<Pick<SpinnerState, 'red' | 'blue' | 'green' | 'spins'>>): SpinnerState {
    const clamp = (value: number) => Math.min(8, Math.max(0, Math.round(value)))
    let red = clamp(patch.red ?? state.red)
    let blue = clamp(patch.blue ?? state.blue)
    let green = clamp(patch.green ?? state.green)
    // At least one sector and at most twelve: the colour just changed gives way
    if (red + blue + green === 0) {
        if (patch.red !== undefined) red = 1
        else if (patch.blue !== undefined) blue = 1
        else green = 1
    }
    const over = red + blue + green - SPINNER_MAX
    if (over > 0) {
        if (patch.red !== undefined) red -= over
        else if (patch.blue !== undefined) blue -= over
        else green -= over
    }
    const spins = Math.min(SPINS.length - 1, Math.max(0, Math.round(patch.spins ?? state.spins)))
    const sameWheel = red === state.red && blue === state.blue && green === state.green
    return { red, blue, green, spins, prediction: sameWheel ? state.prediction : null }
}

export const redProbability = (state: Pick<SpinnerState, 'red' | 'blue' | 'green'>) => state.red / sectors(state)
/** P(red) less than (<), exactly (=) or more than (>) one half? */
export const spinnerPrediction = (state: SpinnerState): Prediction => compareTo(redProbability(state), 0.5)

/** How many reds come up in the fixed draw of this wheel */
export function spinReds(state: Pick<SpinnerState, 'red' | 'blue' | 'green' | 'spins'>): number {
    const random = createRandom(1000 * state.red + 100 * state.blue + 10 * state.green + state.spins + 7)
    let reds = 0
    for (let spin = 0; spin < SPINS[state.spins]; spin += 1) if (Math.floor(random() * sectors(state)) < state.red) reds += 1
    return reds
}

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (latex: string) => say(`$${latex}$`, `$${latex}$`, `$${latex}$`, `$${latex}$`)

const RED = say('gorria', 'rojo', 'الأحمر', 'red')
const probabilityOf = (top: number, bottom: number, total: number) => say(
    `Margotu ${total} sektoreko ruleta bat, gorria ateratzeko probabilitatea $\\frac{${top}}{${bottom}}$ izan dadin.`,
    `Pinta una ruleta de ${total} sectores en la que la probabilidad de ${RED.es} sea $\\frac{${top}}{${bottom}}$.`,
    `لوّن دولابًا من $${total}$ قطاعات يكون فيه احتمال ${RED.ar} $\\frac{${top}}{${bottom}}$.`,
    `Paint a spinner with ${total} sectors where the probability of ${RED.en} is $\\frac{${top}}{${bottom}}$.`
)
const probabilityHint = (top: number, bottom: number, total: number) => same(`\\frac{${top}}{${bottom}}=\\frac{${(top * total) / bottom}}{${total}}`)
const redIs = (top: number, bottom: number, total: number) => (state: SpinnerState) => sectors(state) === total && state.red * bottom === top * total

export const spinnerChallenges: LabChallenge<SpinnerState>[] = [
    { id: 56401, prompt: probabilityOf(1, 3, 6), hint: probabilityHint(1, 3, 6), isSolved: redIs(1, 3, 6) },
    { id: 56402, prompt: say('Egin gorria ezinezkoa eta urdina ziurra.', 'Haz que el rojo sea imposible y el azul seguro.', 'اجعل الأحمر مستحيلًا والأزرق أكيدًا.', 'Make red impossible and blue certain.'), hint: say('Ezinezkoa: probabilitatea $0$. Ziurra: probabilitatea $1$.', 'Imposible: probabilidad $0$. Seguro: probabilidad $1$.', 'المستحيل: احتماله $0$. الأكيد: احتماله $1$.', 'Impossible: probability $0$. Certain: probability $1$.'), isSolved: (state) => state.red === 0 && state.green === 0 && state.blue > 0 },
    { id: 56403, prompt: say('Egin urdina eta berdea ateratzeko probabilitateak $\\frac{1}{4}$ izan daitezen biak.', 'Haz que la probabilidad del azul y la del verde sean las dos $\\frac{1}{4}$.', 'اجعل احتمال الأزرق واحتمال الأخضر $\\frac{1}{4}$ كليهما.', 'Make the probability of blue and of green both $\\frac{1}{4}$.'), hint: say('Orduan gorria $\\frac{1}{2}$ da.', 'Entonces el rojo es $\\frac{1}{2}$.', 'عندها يكون الأحمر $\\frac{1}{2}$.', 'Then red is $\\frac{1}{2}$.'), isSolved: (state) => 4 * state.blue === sectors(state) && 4 * state.green === sectors(state) },
    { id: 56404, prompt: say('8 sektorerekin, egin gorria ez ateratzeko probabilitatea $\\frac{3}{4}$ izan dadin.', 'Con 8 sectores, haz que la probabilidad de no sacar rojo sea $\\frac{3}{4}$.', 'بـ$8$ قطاعات، اجعل احتمال عدم ظهور الأحمر $\\frac{3}{4}$.', 'With 8 sectors, make the probability of not getting red $\\frac{3}{4}$.'), hint: same('1-\\frac{3}{4}=\\frac{2}{8}'), isSolved: redIs(1, 4, 8) },
    { id: 56405, prompt: say('Egin gorria urdina baino bi aldiz probableagoa, eta berdea $\\frac{1}{2}$.', 'Haz que el rojo sea el doble de probable que el azul, y el verde $\\frac{1}{2}$.', 'اجعل الأحمر ضعف احتمال الأزرق، والأخضر $\\frac{1}{2}$.', 'Make red twice as likely as blue, and green $\\frac{1}{2}$.'), hint: say('Adibidez 6 sektore: gorriak, urdinak eta berdeak.', 'Por ejemplo 6 sectores: rojos, azules y verdes.', 'مثلًا $6$ قطاعات: حمراء وزرقاء وخضراء.', 'For example 6 sectors: red, blue and green.'), isSolved: (state) => state.blue > 0 && state.red === 2 * state.blue && 2 * state.green === sectors(state) }
]

/** Endless practice: a probability of red and the number of sectors to paint */
const spinnerMaker: LabChallengeMaker<SpinnerState> = (random) => {
    for (;;) {
        const total = pick(random, [4, 6, 8, 10, 12])
        const red = pick(random, Array.from({ length: Math.min(8, total - 1) }, (_, index) => index + 1))
        const rest = total - red
        const blue = Math.min(8, Math.ceil(rest / 2))
        const green = rest - blue
        if (green > 8) continue
        const divisor = gcd(red, total)
        const top = red / divisor
        const bottom = total / divisor
        return { prompt: probabilityOf(top, bottom, total), hint: probabilityHint(top, bottom, total), isSolved: redIs(top, bottom, total), solution: { red, blue, green, spins: 0, prediction: null } }
    }
}

function gcd(a: number, b: number): number {
    return b === 0 ? a : gcd(b, a % b)
}

export const spinnerExtra = freshFrom(initialSpinnerState, spinnerMaker)
