import { randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { compareTo, freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'

/* ==========================================================================
   L2 · Zenbat zifra ditu? (¿Cuántas cifras tiene?): a number N = m · 10ᵉ,
   set with two steppers (the mantissa in tenths and the exponent), moves
   along a logarithmic ruler from 10⁻³ to 10¹⁰. The ruler is the line of
   log N: the powers of 10 are its whole numbers, so the whole-number part
   of log N is the exponent, and for N ≥ 1 the number of digits minus one.
   The learner predicts whether log N is nearer to e or to e + 1 (the
   middle is √10 ≈ 3,16) before the logarithm is shown. Pure logic.
   ========================================================================== */

export const DIGITS_LIMITS = { tenths: { min: 10, max: 99 }, exponent: { min: -3, max: 9 } } as const

export interface DigitsState {
    /** The mantissa in tenths: 34 is 3,4 */
    tenths: number
    exponent: number
    prediction: Prediction | null
}

export const initialDigitsState: DigitsState = { tenths: 20, exponent: 2, prediction: null }

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value)))

export function setDigits(state: DigitsState, patch: Partial<Omit<DigitsState, 'prediction'>>): DigitsState {
    const tenths = clamp(patch.tenths ?? state.tenths, DIGITS_LIMITS.tenths.min, DIGITS_LIMITS.tenths.max)
    const exponent = clamp(patch.exponent ?? state.exponent, DIGITS_LIMITS.exponent.min, DIGITS_LIMITS.exponent.max)
    const same = tenths === state.tenths && exponent === state.exponent
    return { tenths, exponent, prediction: same ? state.prediction : null }
}

export const mantissaOf = ({ tenths }: DigitsState) => tenths / 10
export const logOf = (state: DigitsState) => state.exponent + Math.log10(mantissaOf(state))
/** The whole-number part of log N: the exponent, since 1 ≤ m < 10 */
export const wholePartOf = (state: DigitsState) => state.exponent
/** Digits of the whole part of N (0 when N < 1) */
export const digitsOf = (state: DigitsState) => (state.exponent >= 0 ? state.exponent + 1 : 0)
/** Is log N nearer to the exponent (<), right in the middle (=) or nearer to the next whole number (>)? */
export const digitsPrediction = (state: DigitsState): Prediction => compareTo(Math.round((logOf(state) - state.exponent) * 1000), 500)

/** N written in full for LaTeX: 340\,000 or 0{,}034 (the comma becomes the point in Arabic later) */
export function fullLatex({ tenths, exponent }: DigitsState): string {
    // tenths · 10^(exponent − 1), as exact digits
    const power = exponent - 1
    if (power >= 0) {
        const digits = String(tenths) + '0'.repeat(power)
        const trimmed = digits.replace(/^0+(?=\d)/, '')
        return trimmed.length >= 5 ? trimmed.replace(/\B(?=(\d{3})+(?!\d))/g, '\\,') : trimmed
    }
    const raw = String(tenths).padStart(-power + 1, '0')
    const whole = raw.slice(0, raw.length + power) || '0'
    const decimals = raw.slice(raw.length + power).replace(/0+$/, '')
    return decimals ? `${whole}{,}${decimals}` : whole
}

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })

export const digitsChallenges: LabChallenge<DigitsState>[] = [
    {
        id: 130201,
        prompt: say('Jarri sei zifrako zenbaki bat: bere logaritmoaren zati osoa 5 da.', 'Coloca un número de seis cifras: la parte entera de su logaritmo es 5.', 'ضع عددًا من ستة أرقام: الجزء الصحيح من لوغاريتمه 5.', 'Place a six-digit number: the whole-number part of its logarithm is 5.'),
        hint: say('Sei zifrako zenbakiak $10^{5}$ eta $10^{6}$ artean daude.', 'Los números de seis cifras están entre $10^{5}$ y $10^{6}$.', 'الأعداد ذات الستة أرقام بين $10^{5}$ و$10^{6}$.', 'Six-digit numbers lie between $10^{5}$ and $10^{6}$.'),
        isSolved: (state) => state.exponent === 5
    },
    {
        id: 130202,
        prompt: say('Hiri batek $340\\,000$ biztanle ditu. Jarri zenbaki hori erregelan.', 'Una ciudad tiene $340\\,000$ habitantes. Coloca ese número en la regla.', 'في مدينة $340\\,000$ ساكن. ضع هذا العدد على المسطرة.', 'A city has $340\\,000$ inhabitants. Place that number on the ruler.'),
        hint: same('$340\\,000=3{,}4\\cdot 10^{5}$'),
        isSolved: (state) => state.tenths === 34 && state.exponent === 5
    },
    {
        id: 130203,
        prompt: say('Bilatu logaritmoa $4{,}5$ inguruan duen zenbaki bat: 4 eta 5 arteko erdian.', 'Busca un número cuyo logaritmo sea casi $4{,}5$: a medio camino entre 4 y 5.', 'ابحث عن عدد لوغاريتمه قريب جدًا من $4{,}5$: في منتصف المسافة بين 4 و5.', 'Find a number whose logarithm is almost $4{,}5$: halfway between 4 and 5.'),
        hint: say('Erdia ez da $5\\cdot 10^{4}$: $\\log 3{,}16\\approx 0{,}5$ da.', 'El punto medio no es $5\\cdot 10^{4}$: $\\log 3{,}16\\approx 0{,}5$.', 'المنتصف ليس $5\\cdot 10^{4}$: ‏$\\log 3{,}16\\approx 0{,}5$.', 'The middle is not $5\\cdot 10^{4}$: $\\log 3{,}16\\approx 0{,}5$.'),
        isSolved: (state) => state.exponent === 4 && Math.abs(logOf(state) - 4.5) < 0.01
    },
    {
        id: 130204,
        prompt: say('Mezu bat bidaltzeak $0{,}05$ euro balio du. Jarri prezio hori erregelan.', 'Enviar un mensaje cuesta $0{,}05$ euros. Coloca ese precio en la regla.', 'إرسال رسالة يكلف $0{,}05$ يورو. ضع هذا السعر على المسطرة.', 'Sending a message costs $0{,}05$ euros. Place that price on the ruler.'),
        hint: same('$0{,}05=5\\cdot 10^{-2}$'),
        isSolved: (state) => state.tenths === 50 && state.exponent === -2
    },
    {
        id: 130205,
        prompt: say('Eskualde baten BPGa $\\log N\\approx 7{,}9$ da. Jarri $N$ zenbaki bat.', 'El PIB de una región cumple $\\log N\\approx 7{,}9$. Coloca un número $N$ así.', 'الناتج المحلي لمنطقة يحقق $\\log N\\approx 7{,}9$. ضع عددًا $N$ كهذا.', 'The GDP of a region has $\\log N\\approx 7{,}9$. Place such a number $N$.'),
        hint: say('Berretzailea 7; mantisaren logaritmoa $0{,}9$ ingurukoa da: mantisa 8 ingurukoa.', 'El exponente es 7; el logaritmo de la mantisa ronda $0{,}9$: la mantisa ronda 8.', 'الأس 7، ولوغاريتم الجزء العشري نحو $0{,}9$: فالجزء العشري نحو 8.', 'The exponent is 7; the logarithm of the mantissa is about $0{,}9$: the mantissa is about 8.'),
        isSolved: (state) => state.exponent === 7 && Math.abs(logOf(state) - 7.9) < 0.01
    }
]

function same(value: string): LocalizedText {
    return { eu: value, es: value, en: value, ar: value.replace(/\{,\}/g, '.') }
}

/** Endless practice: a number written in full, to be placed on the ruler */
const digitsMaker: LabChallengeMaker<DigitsState> = (random) => {
    const exponent = randomInt(random, -2, 8)
    const tenths = randomInt(random, 11, 99)
    const solution = setDigits(initialDigitsState, { tenths, exponent })
    const full = fullLatex(solution)
    const mantissa = (tenths / 10).toFixed(1).replace('.', '{,}').replace('{,}0', '')
    return {
        prompt: say(`Jarri $N=${full}$ erregelan.`, `Coloca $N=${full}$ en la regla.`, `ضع $N=${full}$ على المسطرة.`, `Place $N=${full}$ on the ruler.`),
        hint: same(`$${full}=${mantissa}\\cdot 10^{${exponent}}$`),
        isSolved: (state) => state.tenths === tenths && state.exponent === exponent,
        solution
    }
}

export const digitsExtra = freshFrom(initialDigitsState, digitsMaker)
