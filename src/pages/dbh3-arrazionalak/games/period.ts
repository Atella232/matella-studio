import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { Stars } from '../../../features/unit-v2/games/records.ts'
import { fraction, gcd, toLatex, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { expand, kindFromDenominator, type DecimalKind } from '../../dbh4-aplikatuak-errealak/reals.ts'

/* ==========================================================================
   J4 · Ehizatu periodoa (Caza el periodo): numbers fall one at a time and
   the learner drops each into its bin before it reaches the floor:
   exact, purely recurring or mixed recurring. Level 1: decimals written
   out (0,375; 0,333…; 0,1666…); level 2: fractions in lowest terms (the
   denominator tells: only 2 and 5, no 2 or 5, or both kinds); level 3:
   fractions that are not in lowest terms, so the denominator misleads
   until they are simplified (6/15 = 2/5 is exact), and decimals.
   ========================================================================== */

export const PERIOD_ITEMS = 12
/** How long a number takes to fall, per level */
export const PERIOD_FALL_MS = [8000, 7000, 7000]
export const PERIOD_KINDS: DecimalKind[] = ['exact', 'pure', 'mixed']

export interface PeriodItem {
    /** What falls, as LaTeX */
    latex: string
    value: FractionValue
    kind: DecimalKind
    why: LocalizedText
}

const DENOMINATORS: Record<DecimalKind, number[]> = {
    exact: [2, 4, 5, 8, 10, 16, 20, 25, 40],
    pure: [3, 7, 9, 11, 27, 33],
    mixed: [6, 12, 15, 18, 22, 30, 36, 45]
}

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })

function irreducible(random: Random, kind: DecimalKind): FractionValue {
    for (;;) {
        const denominator = pick(random, DENOMINATORS[kind])
        const numerator = randomInt(random, 1, 2 * denominator - 1)
        if (gcd(numerator, denominator) === 1 && numerator % denominator !== 0) return fraction(numerator, denominator)
    }
}

/** 0,375 or 0,1666… as LaTeX: the period written out until at least six digits and then dots */
export function writtenDecimal(value: FractionValue): string {
    const { integer, preperiod, period } = expand(value)
    if (period === '') return `${integer}{,}${preperiod}`
    let digits = preperiod
    while (digits.length < Math.max(6, preperiod.length + 2 * period.length)) digits += period
    return `${integer}{,}${digits}\\ldots`
}

/** The factors of a denominator, written for the reason: 2 · 2 · 3 */
const factorsOf = (denominator: number) => {
    const factors: number[] = []
    let rest = denominator
    for (let prime = 2; rest > 1; prime += 1) while (rest % prime === 0) { factors.push(prime); rest /= prime }
    return factors.join('\\cdot ')
}

function reasonFor(value: FractionValue, kind: DecimalKind, shown: string): LocalizedText {
    const decimal = writtenDecimal(value)
    const simplest = toLatex(value)
    const head = shown === simplest ? `$${shown}=${decimal}$` : shown === decimal ? `$${decimal}=${simplest}$` : `$${shown}=${simplest}=${decimal}$`
    const denominator = `$${value.denominator}=${factorsOf(value.denominator)}$`
    if (kind === 'exact') return say(`${head}: amaitzen da. ${denominator}: 2 eta 5 bakarrik.`, `${head}: se acaba. ${denominator}: solo 2 y 5.`, `${head}: ينتهي. ${denominator}: فيه 2 و5 فقط.`, `${head}: it ends. ${denominator}: only 2s and 5s.`)
    if (kind === 'pure') return say(`${head}: periodoa komaren ondoren berehala. ${denominator}: ez du 2 edo 5 faktorerik.`, `${head}: el periodo empieza justo tras la coma. ${denominator}: ni 2 ni 5.`, `${head}: يبدأ الدور بعد الفاصلة مباشرة. ${denominator}: لا 2 ولا 5.`, `${head}: the period starts right after the point. ${denominator}: no 2 and no 5.`)
    return say(`${head}: periodoaren aurretik beste zifra batzuk daude. ${denominator}: 2 edo 5, eta beste zerbait.`, `${head}: antes del periodo hay otras cifras. ${denominator}: 2 o 5, y algo más.`, `${head}: قبل الدور أرقام أخرى. ${denominator}: فيه 2 أو 5 وعامل آخر.`, `${head}: other digits come before the period. ${denominator}: a 2 or a 5, and something else.`)
}

export function createPeriodItem(random: Random, levelIndex: number): PeriodItem {
    const kind = pick(random, PERIOD_KINDS)
    const value = irreducible(random, kind)
    if (levelIndex === 0 || (levelIndex === 2 && random() < 0.3)) {
        const latex = writtenDecimal(value)
        return { latex, value, kind, why: reasonFor(value, kind, latex) }
    }
    if (levelIndex === 1) {
        const latex = toLatex(value)
        return { latex, value, kind, why: reasonFor(value, kind, latex) }
    }
    // A fraction that is not in lowest terms: a factor that hides the kind (3 or 7 on an exact one, 2 or 5 on a pure one)
    const factor = kind === 'exact' ? pick(random, [3, 7, 9]) : kind === 'pure' ? pick(random, [2, 5, 4]) : pick(random, [3, 7])
    const latex = `\\frac{${value.numerator * factor}}{${value.denominator * factor}}`
    return { latex, value, kind, why: reasonFor(value, kind, latex) }
}

export function createPeriodItems(random: Random, levelIndex: number): PeriodItem[] {
    // Four of each kind, so no bin can be guessed by luck
    const kinds = shuffle(random, PERIOD_KINDS.flatMap((kind) => Array.from({ length: PERIOD_ITEMS / 3 }, () => kind)))
    return kinds.map((kind) => {
        for (;;) {
            const item = createPeriodItem(random, levelIndex)
            if (item.kind === kind) return item
        }
    })
}

/** The kind read from the denominator agrees with the long division (checked by the tests) */
export const periodKindAgrees = (item: PeriodItem) => kindFromDenominator(item.value) === item.kind

export function periodStars(score: number): Stars {
    if (score >= 11) return 3
    if (score >= 9) return 2
    if (score >= 6) return 1
    return 0
}
