import { fraction, gcd, type FractionValue } from '../../features/unit-v2/math/fraction.ts'

/* ==========================================================================
   Zenbaki errealak (4. DBH, aplikatuak) — pure maths shared by the lessons,
   the content, the laboratory and the games: decimal expansions and their
   generating fraction, exact truncation and rounding of decimal numbers,
   errors, scientific notation, intervals and square-root radicals.
   Plain TypeScript, so the node tests can load it.
   ========================================================================== */

/* ---------- Writing numbers ---------- */

/** A decimal written for LaTeX with the decimal comma ({,} keeps KaTeX from spacing it) */
export const commaLatex = (text: string) => text.replace('.', '{,}')

/** A decimal written as plain text with the comma: 3.5 → 3,5 and −3,5 for negatives */
export const commaText = (text: string) => text.replace('.', ',').replace(/^-/, '−')

/** A number (integer or short decimal) as LaTeX with the decimal comma */
export const numberLatex = (value: number) => commaLatex(String(value))

/* ---------- Decimal expansion of a fraction ---------- */

export interface DecimalExpansion {
    negative: boolean
    /** Whole part, without sign */
    integer: string
    /** Digits after the comma before the period (the "anteperiodo") */
    preperiod: string
    /** Repeating digits; empty for an exact decimal */
    period: string
}

export type DecimalKind = 'exact' | 'pure' | 'mixed'

/** Long division of numerator by denominator, stopping when a remainder repeats */
export function expand(value: FractionValue): DecimalExpansion {
    const { numerator, denominator } = fraction(value.numerator, value.denominator)
    const negative = numerator < 0
    const top = Math.abs(numerator)
    const integer = String(Math.floor(top / denominator))
    let remainder = top % denominator
    const seen = new Map<number, number>()
    let digits = ''
    while (remainder !== 0 && !seen.has(remainder)) {
        seen.set(remainder, digits.length)
        remainder *= 10
        digits += String(Math.floor(remainder / denominator))
        remainder %= denominator
    }
    if (remainder === 0) return { negative, integer, preperiod: digits, period: '' }
    const start = seen.get(remainder)!
    return { negative, integer, preperiod: digits.slice(0, start), period: digits.slice(start) }
}

/** The remainders of the long division, in order, until one repeats or the division ends (for the lab) */
export function divisionRemainders(value: FractionValue): number[] {
    const { numerator, denominator } = fraction(Math.abs(value.numerator), value.denominator)
    let remainder = numerator % denominator
    const remainders: number[] = []
    while (remainder !== 0 && !remainders.includes(remainder)) {
        remainders.push(remainder)
        remainder = (remainder * 10) % denominator
    }
    remainders.push(remainder)
    return remainders
}

export const decimalKind = (expansion: DecimalExpansion): DecimalKind => (expansion.period === '' ? 'exact' : expansion.preperiod === '' ? 'pure' : 'mixed')

/** The kind of decimal a fraction gives, read from its irreducible denominator */
export function kindFromDenominator(value: FractionValue): DecimalKind {
    let denominator = fraction(value.numerator, value.denominator).denominator
    let hasTwoOrFive = false
    while (denominator % 2 === 0) { denominator /= 2; hasTwoOrFive = true }
    while (denominator % 5 === 0) { denominator /= 5; hasTwoOrFive = true }
    if (denominator === 1) return 'exact'
    return hasTwoOrFive ? 'mixed' : 'pure'
}

/** 1,8333… as LaTeX: 1{,}8\overline{3} */
export function expansionLatex(expansion: DecimalExpansion): string {
    const sign = expansion.negative ? '-' : ''
    if (expansion.preperiod === '' && expansion.period === '') return `${sign}${expansion.integer}`
    const period = expansion.period ? `\\overline{${expansion.period}}` : ''
    return `${sign}${expansion.integer}{,}${expansion.preperiod}${period}`
}

/** Plain text of an expansion with the period written twice and dots: 1,8333… */
export function expansionText(expansion: DecimalExpansion): string {
    const sign = expansion.negative ? '−' : ''
    if (expansion.preperiod === '' && expansion.period === '') return `${sign}${expansion.integer}`
    const tail = expansion.period ? `${expansion.period}${expansion.period}${expansion.period.length === 1 ? expansion.period : ''}…` : ''
    return `${sign}${expansion.integer},${expansion.preperiod}${tail}`
}

/**
 * The generating fraction: (all the digits − the digits before the period) over
 * as many 9 as period digits followed by as many 0 as preperiod digits.
 * An exact decimal goes over 10, 100, 1000…
 */
export function generatrix(expansion: DecimalExpansion): FractionValue {
    const sign = expansion.negative ? -1 : 1
    const { integer, preperiod, period } = expansion
    // Long periods (1/59 has 58 digits) overflow plain numbers: work with BigInt and reduce
    const top = period === '' ? BigInt(integer + preperiod) : BigInt(integer + preperiod + period) - BigInt(integer + preperiod)
    const bottom = period === '' ? BigInt(10) ** BigInt(preperiod.length) : BigInt('9'.repeat(period.length) + '0'.repeat(preperiod.length))
    let a = top
    let b = bottom
    while (b !== BigInt(0)) [a, b] = [b, a % b]
    const divisor = a === BigInt(0) ? BigInt(1) : a
    return fraction(sign * Number(top / divisor), Number(bottom / divisor))
}

/** The unsimplified fraction the rule gives, as LaTeX: \frac{1833-18}{900} */
export function generatrixLatex(expansion: DecimalExpansion): string {
    const { integer, preperiod, period } = expansion
    const sign = expansion.negative ? '-' : ''
    if (period === '') return `${sign}\\frac{${Number(integer + preperiod)}}{${10 ** preperiod.length}}`
    const all = Number(integer + preperiod + period)
    const before = Number(integer + preperiod)
    return `${sign}\\frac{${all}-${before}}{${'9'.repeat(period.length)}${'0'.repeat(preperiod.length)}}`
}

/* ---------- Exact decimals: truncating and rounding ---------- */

interface ScaledDecimal {
    negative: boolean
    /** All the digits as an integer */
    digits: number
    /** How many of them are decimals */
    scale: number
}

function scaled(text: string): ScaledDecimal {
    const clean = text.replace(',', '.').replace('−', '-').trim()
    const negative = clean.startsWith('-')
    const [whole, decimals = ''] = clean.replace(/^[-+]/, '').split('.')
    return { negative, digits: Number(whole + decimals), scale: decimals.length }
}

function written(negative: boolean, digits: number, scale: number): string {
    const raw = String(digits).padStart(scale + 1, '0')
    const text = scale === 0 ? raw : `${raw.slice(0, raw.length - scale)}.${raw.slice(raw.length - scale)}`
    return negative && digits !== 0 ? `-${text}` : text
}

/** Cut a decimal (written with a point or a comma) after `places` decimals */
export function truncateDecimal(text: string, places: number): string {
    const { negative, digits, scale } = scaled(text)
    if (scale <= places) return written(negative, digits * 10 ** (places - scale), places)
    return written(negative, Math.floor(digits / 10 ** (scale - places)), places)
}

/** Round a decimal to `places` decimals: up when the first dropped digit is 5 or more */
export function roundDecimal(text: string, places: number): string {
    const { negative, digits, scale } = scaled(text)
    if (scale <= places) return written(negative, digits * 10 ** (places - scale), places)
    const unit = 10 ** (scale - places)
    const kept = Math.floor(digits / unit)
    return written(negative, digits % unit >= unit / 2 ? kept + 1 : kept, places)
}

/** |real − approximation| */
export const absoluteError = (real: number, approximation: number) => Math.abs(real - approximation)

/** Absolute error divided by the real value */
export const relativeError = (real: number, approximation: number) => absoluteError(real, approximation) / Math.abs(real)

/** A value rounded to a few decimals to show it, without floating noise */
export const tidy = (value: number, places = 6) => Number(value.toFixed(places))

/* ---------- Scientific notation ---------- */

export interface Scientific {
    /** 1 ≤ |mantissa| < 10, as a decimal string with a point */
    mantissa: string
    exponent: number
}

/** 83 400 000 → 8,34 · 10⁷ and 0,000 52 → 5,2 · 10⁻⁴, from the written number */
export function toScientific(text: string): Scientific {
    const clean = text.replace(/\s/g, '').replace(',', '.').replace('−', '-')
    const negative = clean.startsWith('-')
    const [whole, decimals = ''] = clean.replace(/^[-+]/, '').split('.')
    const all = (whole + decimals).replace(/^0+/, '')
    const leadingZeros = (whole + decimals).length - all.length
    const significant = all.replace(/0+$/, '') || '0'
    const exponent = whole.length - leadingZeros - 1
    const mantissa = significant.length > 1 ? `${significant[0]}.${significant.slice(1)}` : significant
    return { mantissa: negative ? `-${mantissa}` : mantissa, exponent }
}

/** The ordinary number of a scientific one, as a decimal string with a point */
export function fromScientific({ mantissa, exponent }: Scientific): string {
    const negative = mantissa.startsWith('-')
    const [whole, decimals = ''] = mantissa.replace('-', '').split('.')
    const digits = whole + decimals
    const point = whole.length + exponent
    let text: string
    if (point <= 0) text = `0.${'0'.repeat(-point)}${digits}`
    else if (point >= digits.length) text = digits + '0'.repeat(point - digits.length)
    else text = `${digits.slice(0, point)}.${digits.slice(point)}`
    text = text.includes('.') ? text.replace(/0+$/, '').replace(/\.$/, '') : text
    return negative ? `-${text}` : text
}

export const scientificLatex = ({ mantissa, exponent }: Scientific) => `${commaLatex(mantissa)}\\cdot 10^{${exponent}}`

/** Long numbers grouped in threes with thin spaces, as the textbook writes them: 4\,800\,000 */
export function groupedLatex(text: string): string {
    const [whole, decimals] = text.replace('-', '').split('.')
    const sign = text.startsWith('-') ? '-' : ''
    const groupedWhole = whole.replace(/\B(?=(\d{3})+(?!\d))/g, '\\,')
    const groupedDecimals = decimals ? decimals.replace(/(\d{3})(?=\d)/g, '$1\\,') : ''
    return `${sign}${groupedWhole}${decimals ? `{,}${groupedDecimals}` : ''}`
}

/* ---------- Intervals ---------- */

export interface Interval {
    /** null: −∞ */
    from: number | null
    /** null: +∞ */
    to: number | null
    closedFrom: boolean
    closedTo: boolean
}

export const interval = (from: number | null, to: number | null, closedFrom: boolean, closedTo: boolean): Interval => ({ from, to, closedFrom: from !== null && closedFrom, closedTo: to !== null && closedTo })

export function intervalLatex(value: Interval): string {
    const left = value.from === null ? '(-\\infty' : `${value.closedFrom ? '[' : '('}${numberLatex(value.from)}`
    const right = value.to === null ? '+\\infty)' : `${numberLatex(value.to)}${value.closedTo ? ']' : ')'}`
    return `${left},\\,${right}`
}

/** The same set as an inequality: −2 ≤ x < 4, x > 7, x ≤ −5 */
export function inequalityLatex(value: Interval): string {
    const low = value.from === null ? '' : `${numberLatex(value.from)}${value.closedFrom ? '\\le ' : '<'}`
    const high = value.to === null ? '' : `${value.closedTo ? '\\le ' : '<'}${numberLatex(value.to)}`
    if (value.from !== null && value.to !== null) return `${low}x${high}`
    if (value.from !== null) return `x${value.closedFrom ? '\\ge ' : '>'}${numberLatex(value.from)}`
    if (value.to !== null) return `x${high}`
    return 'x\\in\\mathbb{R}'
}

export function contains(value: Interval, x: number): boolean {
    const aboveLow = value.from === null || x > value.from || (value.closedFrom && x === value.from)
    const belowHigh = value.to === null || x < value.to || (value.closedTo && x === value.to)
    return aboveLow && belowHigh
}

/** Numbers that are in both intervals; null when they share none */
export function intersection(a: Interval, b: Interval): Interval | null {
    const pickLow = (): [number | null, boolean] => {
        if (a.from === null) return [b.from, b.closedFrom]
        if (b.from === null) return [a.from, a.closedFrom]
        if (a.from !== b.from) return a.from > b.from ? [a.from, a.closedFrom] : [b.from, b.closedFrom]
        return [a.from, a.closedFrom && b.closedFrom]
    }
    const pickHigh = (): [number | null, boolean] => {
        if (a.to === null) return [b.to, b.closedTo]
        if (b.to === null) return [a.to, a.closedTo]
        if (a.to !== b.to) return a.to < b.to ? [a.to, a.closedTo] : [b.to, b.closedTo]
        return [a.to, a.closedTo && b.closedTo]
    }
    const [from, closedFrom] = pickLow()
    const [to, closedTo] = pickHigh()
    if (from !== null && to !== null && (from > to || (from === to && !(closedFrom && closedTo)))) return null
    return interval(from, to, closedFrom, closedTo)
}

/* ---------- Roots and radicals ---------- */

/** The whole k-th root of n, or null when it is not whole */
export function integerRoot(n: number, k: number): number | null {
    if (n < 0) return k % 2 === 1 ? (integerRoot(-n, k) === null ? null : -integerRoot(-n, k)!) : null
    const guess = Math.round(n ** (1 / k))
    for (const candidate of [guess - 1, guess, guess + 1]) if (candidate >= 0 && candidate ** k === n) return candidate
    return null
}

/** √n = a√b with b as small as possible: √72 = 6√2 */
export function simplifySqrt(n: number): { outside: number; inside: number } {
    let outside = 1
    let inside = n
    for (let factor = 2; factor * factor <= inside; factor += 1) {
        while (inside % (factor * factor) === 0) {
            inside /= factor * factor
            outside *= factor
        }
    }
    return { outside, inside }
}

/** a√b as LaTeX: 6\sqrt{2}, \sqrt{5}, 3 (when b = 1), −2\sqrt{3} */
export function radicalLatex(outside: number, inside: number): string {
    if (inside === 1) return String(outside)
    if (outside === 0) return '0'
    const coefficient = outside === 1 ? '' : outside === -1 ? '-' : String(outside)
    return `${coefficient}\\sqrt{${inside}}`
}

/** The prime factors of n, smallest first: 72 → [2, 2, 2, 3, 3] */
export function primeFactors(n: number): number[] {
    const factors: number[] = []
    let rest = n
    for (let factor = 2; factor * factor <= rest; factor += 1) {
        while (rest % factor === 0) {
            factors.push(factor)
            rest /= factor
        }
    }
    if (rest > 1) factors.push(rest)
    return factors
}

export const isPerfectSquare = (n: number) => n >= 0 && integerRoot(n, 2) !== null

/* ---------- Number sets ---------- */

export type NumberSet = 'natural' | 'integer' | 'rational' | 'irrational'

/** The smallest set a rational number belongs to */
export function rationalSet(value: FractionValue): NumberSet {
    const reduced = fraction(value.numerator, value.denominator)
    if (reduced.denominator !== 1) return 'rational'
    return reduced.numerator >= 0 ? 'natural' : 'integer'
}

/** The smallest set √n belongs to (n ≥ 0) */
export const sqrtSet = (n: number): NumberSet => (isPerfectSquare(n) ? 'natural' : 'irrational')

/** Is a/b already irreducible? */
export const isIrreducible = (a: number, b: number) => gcd(a, b) === 1
