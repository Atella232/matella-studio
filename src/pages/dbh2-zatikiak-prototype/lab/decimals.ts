import { gcd } from '../math/fraction.ts'
import { pick, randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import { initialPrimesState, pairAll, primesSummary, setPrimesNumbers } from './primes.ts'

/* ==========================================================================
   From a fraction to its decimal: the long division of the numerator by the
   denominator, one digit at a time. Each remainder, with a 0 brought down,
   gives the next digit. A remainder of 0 ends the division (exact decimal);
   a remainder seen before brings the same digits back (periodic). The prime
   factors of the simplified denominator tell the kind before dividing.
   ========================================================================== */

export type DecimalKind = 'exact' | 'pure' | 'mixed'

export interface DivisionStep {
    /** The remainder before this step with a 0 brought down */
    dividend: number
    /** The digit of the quotient */
    digit: number
    /** What is left over */
    remainder: number
}

export interface LongDivision {
    /** Whole part of the quotient */
    integer: number
    /** Remainder of the whole-part division: the first remainder */
    first: number
    /** One step per decimal digit, until the remainder is 0 or repeats */
    steps: DivisionStep[]
    /**
     * Index of the step where the period starts, or null for an exact
     * decimal. The last step's remainder equals the remainder that started
     * that step: 0 means it is the first remainder (pure periodic).
     */
    periodStart: number | null
}

export interface DecimalsState {
    numerator: number
    denominator: number
    /** Decimal digits worked out so far */
    shown: number
    /** What the learner said the decimal would be, before dividing */
    prediction: DecimalKind | null
}

export const DECIMALS_LIMITS = { minNumerator: 1, minDenominator: 2, maxNumerator: 999, maxDenominator: 40 } as const

export const initialDecimalsState: DecimalsState = { numerator: 7, denominator: 12, shown: 0, prediction: null }

export function longDivision(numerator: number, denominator: number): LongDivision {
    const integer = Math.floor(numerator / denominator)
    const first = numerator % denominator
    // remainders[i] starts step i
    const remainders = [first]
    const steps: DivisionStep[] = []
    let periodStart: number | null = null
    while (first !== 0) {
        const dividend = remainders[remainders.length - 1] * 10
        const step = { dividend, digit: Math.floor(dividend / denominator), remainder: dividend % denominator }
        steps.push(step)
        if (step.remainder === 0) break
        const earlier = remainders.indexOf(step.remainder)
        if (earlier >= 0) {
            periodStart = earlier
            break
        }
        remainders.push(step.remainder)
    }
    return { integer, first, steps, periodStart }
}

export const divisionKind = (division: LongDivision): DecimalKind =>
    division.periodStart === null ? 'exact' : division.periodStart === 0 ? 'pure' : 'mixed'

export interface DenominatorFactors {
    /** Prime factors of the denominator as written */
    factors: number[]
    /** The factors that go away with the numerator when simplifying */
    cancelled: boolean[]
    /** The simplified fraction */
    numerator: number
    denominator: number
    /** Prime factors of the simplified denominator */
    left: number[]
}

/** The denominator split into primes, with the ones that simplify away marked (the L3 crossing out) */
export function denominatorFactors(numerator: number, denominator: number): DenominatorFactors {
    const summary = primesSummary(pairAll(setPrimesNumbers(initialPrimesState, { numerator, denominator })))
    const common = gcd(numerator, denominator)
    return {
        factors: summary.bottom,
        cancelled: summary.crossedBottom,
        numerator: numerator / common,
        denominator: denominator / common,
        left: summary.leftBottom
    }
}

/** The kind of decimal read from the simplified denominator: only 2 and 5 → exact; neither → pure; both kinds → mixed */
export function kindFromFactors(factors: number[]): DecimalKind {
    const twoOrFive = factors.filter((factor) => factor === 2 || factor === 5).length
    if (twoOrFive === factors.length) return 'exact'
    return twoOrFive === 0 ? 'pure' : 'mixed'
}

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value)))

/** New numbers start a new division and ask for a new prediction */
export function setDecimalsNumbers(state: DecimalsState, patch: { numerator?: number; denominator?: number }): DecimalsState {
    return {
        numerator: clamp(patch.numerator ?? state.numerator, DECIMALS_LIMITS.minNumerator, DECIMALS_LIMITS.maxNumerator),
        denominator: clamp(patch.denominator ?? state.denominator, DECIMALS_LIMITS.minDenominator, DECIMALS_LIMITS.maxDenominator),
        shown: 0,
        prediction: null
    }
}

/** The division opens once there is a prediction, which stays until the fraction changes or the division starts again */
export const predictDecimal = (state: DecimalsState, prediction: DecimalKind): DecimalsState =>
    state.prediction === null ? { ...state, prediction } : state

const stepCount = (state: DecimalsState) => longDivision(state.numerator, state.denominator).steps.length

export const nextDigit = (state: DecimalsState): DecimalsState =>
    state.prediction === null ? state : { ...state, shown: Math.min(stepCount(state), state.shown + 1) }

export const finishDivision = (state: DecimalsState): DecimalsState =>
    state.prediction === null ? state : { ...state, shown: stepCount(state) }

export const restartDivision = (state: DecimalsState): DecimalsState => ({ ...state, shown: 0, prediction: null })

/** The division has reached a remainder of 0 or a repeated one */
export const divisionDone = (state: DecimalsState) => state.prediction !== null && state.shown >= stepCount(state)

/** Digits of the quotient, the period apart: 7/12 → 0, "58", "3" */
export function quotientParts(division: LongDivision): { integer: number; preperiod: string; period: string } {
    const digits = division.steps.map((step) => step.digit).join('')
    const start = division.periodStart ?? digits.length
    return { integer: division.integer, preperiod: digits.slice(0, start), period: digits.slice(start) }
}

/** 7/12 → 0{,}58\overline{3}; in Arabic the decimal point is a dot */
export function decimalLatex(division: LongDivision, separator: ',' | '.' = ','): string {
    const { integer, preperiod, period } = quotientParts(division)
    if (!preperiod && !period) return String(integer)
    return `${integer}{${separator}}${preperiod}${period ? `\\overline{${period}}` : ''}`
}

/* ---------- Challenges ---------- */

/** In Arabic, a piece of arithmetic keeps its left-to-right order (LRI … PDI) */
const ltr = (text: string) => `\u2066${text}\u2069`

const kindOf = (state: DecimalsState) => divisionKind(longDivision(state.numerator, state.denominator))

export const decimalsChallenges: LabChallenge<DecimalsState>[] = [
    {
        id: 1801,
        prompt: {
            eu: 'Zatitu 3/8 zifraz zifra, hondarra 0 izan arte.',
            es: 'Divide 3/8 cifra a cifra hasta que el resto sea 0.',
            ar: 'اقسم 3/8 رقمًا رقمًا حتى يصبح الباقي 0.'
        },
        hint: {
            eu: 'Jarri 3 goian eta 8 behean, iragarri eta sakatu «Hurrengo zifra».',
            es: 'Pon 3 arriba y 8 abajo, predice y pulsa «Siguiente cifra».',
            ar: 'ضع 3 في الأعلى و8 في الأسفل، ثم توقّع واضغط «الرقم التالي».'
        },
        isSolved: (state) => state.numerator === 3 && state.denominator === 8 && divisionDone(state)
    },
    {
        id: 1802,
        prompt: {
            eu: 'Lortu 6 zifrako periodoa duen hamartar periodiko huts bat.',
            es: 'Consigue un decimal periódico puro con un periodo de 6 cifras.',
            ar: 'احصل على عدد عشري دوري بحت دوره من 6 أرقام.'
        },
        hint: {
            eu: 'Probatu zazpirenekin: 7 zatitzean 6 hondar posible baino ez daude.',
            es: 'Prueba con séptimos: al dividir entre 7 solo hay 6 restos posibles.',
            ar: 'جرّب الأسباع: عند القسمة على 7 لا يوجد إلا 6 بواقٍ ممكنة.'
        },
        isSolved: (state) => {
            const division = longDivision(state.numerator, state.denominator)
            return divisionDone(state) && divisionKind(division) === 'pure' && quotientParts(division).period.length === 6
        }
    },
    {
        id: 1803,
        prompt: {
            eu: 'Lortu periodiko misto bat, periodoaren aurretik bi zifra dituena.',
            es: 'Consigue un periódico mixto con dos cifras antes del periodo.',
            ar: 'احصل على عدد دوري مختلط قبل دوره رقمان.'
        },
        hint: {
            eu: 'Izendatzaileak bi 2 (edo bi 5) eta beste faktore bat behar ditu. Adibidez: 1/12.',
            es: 'El denominador necesita dos doses (o dos cincos) y otro factor. Por ejemplo, 1/12.',
            ar: `يحتاج المقام إلى عاملين 2 (أو عاملين 5) وعامل آخر. مثلًا ${ltr('1/12')}.`
        },
        isSolved: (state) => {
            const division = longDivision(state.numerator, state.denominator)
            return divisionDone(state) && divisionKind(division) === 'mixed' && quotientParts(division).preperiod.length === 2
        }
    },
    {
        id: 1804,
        prompt: {
            eu: 'Aurkitu izendatzailean 3 duen zatiki bat, hamartar zehatza ematen duena (ez zenbaki osoa).',
            es: 'Encuentra una fracción con un 3 en el denominador que dé un decimal exacto (no un entero).',
            ar: 'جد كسرًا في مقامه العامل 3 ويعطي عددًا عشريًا منتهيًا (لا عددًا صحيحًا).'
        },
        hint: {
            eu: 'Sinplifikatu lehenik: 3 zenbakitzailearekin joan daiteke. Adibidez: 3/6.',
            es: 'Simplifica primero: el 3 se puede ir con el numerador. Prueba con 3/6.',
            ar: `اختزل أولًا: قد يذهب العامل 3 مع البسط. جرّب ${ltr('3/6')}.`
        },
        isSolved: (state) => state.denominator % 3 === 0 && divisionDone(state) && kindOf(state) === 'exact' && state.numerator % state.denominator !== 0
    }
]

/* ---------- New fractions and endless practice ---------- */

/** Denominators up to 40 by the kind of decimal they give (once the fraction is irreducible) */
const DENOMINATORS: Record<DecimalKind, number[]> = {
    exact: [2, 4, 5, 8, 10, 16, 20, 25, 40],
    pure: [3, 7, 9, 11, 13, 21, 27, 33, 37],
    mixed: [6, 12, 14, 15, 18, 22, 24, 30, 35, 36]
}

const KINDS: DecimalKind[] = ['exact', 'pure', 'mixed']

/**
 * A fraction worth dividing: an irreducible one of a random kind, proper or
 * a little improper; sometimes both terms are doubled or tripled, so that the
 * learner has to simplify before reading the denominator.
 */
export function randomDecimalsFraction(random: () => number): { numerator: number; denominator: number } {
    for (;;) {
        const denominator = pick(random, DENOMINATORS[pick(random, KINDS)])
        const numerator = randomInt(random, 1, 2 * denominator - 1)
        if (numerator % denominator === 0 || gcd(numerator, denominator) !== 1) continue
        const factor = random() < 0.3 ? pick(random, [2, 3]) : 1
        if (denominator * factor > DECIMALS_LIMITS.maxDenominator) continue
        return { numerator: numerator * factor, denominator: denominator * factor }
    }
}

export const decimalsExtra: LabChallengeMaker<DecimalsState> = (random) => {
    const { numerator, denominator } = randomDecimalsFraction(random)
    const kind = divisionKind(longDivision(numerator, denominator))
    const { left, denominator: simplified } = denominatorFactors(numerator, denominator)
    const product = left.join('·')
    return {
        prompt: {
            eu: `Iragarri ondo zer hamartar emango duen ${numerator}/${denominator} zatikiak, eta zatitu amaierara arte.`,
            es: `Predice bien qué decimal da ${numerator}/${denominator} y divide hasta el final.`,
            ar: `توقّع بشكل صحيح نوع العدد العشري للكسر ${numerator}/${denominator}، ثم اقسم حتى النهاية.`
        },
        hint: {
            eu: `Izendatzaile sinplifikatua: ${simplified} = ${product}. 2 eta 5 bakarrik → zehatza; ez 2 ez 5 → hutsa; biak → mistoa.`,
            es: `Denominador simplificado: ${simplified} = ${product}. Solo 2 y 5 → exacto; ni 2 ni 5 → puro; de los dos tipos → mixto.`,
            ar: `المقام بعد الاختزال: ${ltr(`${simplified} = ${product}`)}. 2 و5 فقط ← منتهٍ؛ لا 2 ولا 5 ← دوري بحت؛ كلاهما ← دوري مختلط.`
        },
        isSolved: (state) => state.numerator === numerator && state.denominator === denominator && divisionDone(state) && state.prediction === kind,
        solution: finishDivision(predictDecimal(setDecimalsNumbers(initialDecimalsState, { numerator, denominator }), kind))
    }
}

