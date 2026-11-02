export interface FractionValue {
    numerator: number
    denominator: number
}

const ARABIC_DIGITS: Record<string, string> = {
    '٠': '0',
    '١': '1',
    '٢': '2',
    '٣': '3',
    '٤': '4',
    '٥': '5',
    '٦': '6',
    '٧': '7',
    '٨': '8',
    '٩': '9',
    '۰': '0',
    '۱': '1',
    '۲': '2',
    '۳': '3',
    '۴': '4',
    '۵': '5',
    '۶': '6',
    '۷': '7',
    '۸': '8',
    '۹': '9'
}

function assertInteger(value: number, label: string) {
    if (!Number.isSafeInteger(value)) {
        throw new Error(`${label} must be a safe integer`)
    }
}

export function gcd(left: number, right: number): number {
    let a = Math.abs(left)
    let b = Math.abs(right)
    while (b !== 0) {
        const remainder = a % b
        a = b
        b = remainder
    }
    return a || 1
}

export function fraction(numerator: number, denominator = 1): FractionValue {
    assertInteger(numerator, 'Numerator')
    assertInteger(denominator, 'Denominator')
    if (denominator === 0) throw new Error('Denominator cannot be zero')

    const sign = denominator < 0 ? -1 : 1
    const divisor = gcd(numerator, denominator)
    return {
        numerator: (numerator / divisor) * sign,
        denominator: Math.abs(denominator / divisor)
    }
}

export function add(left: FractionValue, right: FractionValue): FractionValue {
    return fraction(
        left.numerator * right.denominator + right.numerator * left.denominator,
        left.denominator * right.denominator
    )
}

export function subtract(left: FractionValue, right: FractionValue): FractionValue {
    return fraction(
        left.numerator * right.denominator - right.numerator * left.denominator,
        left.denominator * right.denominator
    )
}

export function multiply(left: FractionValue, right: FractionValue): FractionValue {
    return fraction(left.numerator * right.numerator, left.denominator * right.denominator)
}

export function divide(left: FractionValue, right: FractionValue): FractionValue {
    if (right.numerator === 0) throw new Error('Cannot divide by zero')
    return fraction(left.numerator * right.denominator, left.denominator * right.numerator)
}

export function reciprocal(value: FractionValue): FractionValue {
    if (value.numerator === 0) throw new Error('Zero has no reciprocal')
    return fraction(value.denominator, value.numerator)
}

export function power(value: FractionValue, exponent: number): FractionValue {
    assertInteger(exponent, 'Exponent')
    if (exponent === 0) return fraction(1)
    const base = exponent < 0 ? reciprocal(value) : fraction(value.numerator, value.denominator)
    const magnitude = Math.abs(exponent)
    return fraction(base.numerator ** magnitude, base.denominator ** magnitude)
}

export function equals(left: FractionValue, right: FractionValue): boolean {
    const a = fraction(left.numerator, left.denominator)
    const b = fraction(right.numerator, right.denominator)
    return a.numerator === b.numerator && a.denominator === b.denominator
}

export function compare(left: FractionValue, right: FractionValue): -1 | 0 | 1 {
    const difference = left.numerator * right.denominator - right.numerator * left.denominator
    if (difference === 0) return 0
    return difference < 0 ? -1 : 1
}

export function toNumber(value: FractionValue): number {
    return value.numerator / value.denominator
}

export function toText(value: FractionValue): string {
    const normalized = fraction(value.numerator, value.denominator)
    return normalized.denominator === 1
        ? String(normalized.numerator)
        : `${normalized.numerator}/${normalized.denominator}`
}

export function toLatex(value: FractionValue): string {
    const normalized = fraction(value.numerator, value.denominator)
    if (normalized.denominator === 1) return String(normalized.numerator)
    const sign = normalized.numerator < 0 ? '-' : ''
    return `${sign}\\frac{${Math.abs(normalized.numerator)}}{${normalized.denominator}}`
}

export function toMixedText(value: FractionValue): string {
    const normalized = fraction(value.numerator, value.denominator)
    const sign = normalized.numerator < 0 ? '-' : ''
    const absoluteNumerator = Math.abs(normalized.numerator)
    const whole = Math.floor(absoluteNumerator / normalized.denominator)
    const remainder = absoluteNumerator % normalized.denominator
    if (remainder === 0) return `${sign}${whole}`
    if (whole === 0) return `${sign}${remainder}/${normalized.denominator}`
    return `${sign}${whole} ${remainder}/${normalized.denominator}`
}

export function hasTerminatingDecimal(value: FractionValue): boolean {
    let denominator = fraction(value.numerator, value.denominator).denominator
    while (denominator % 2 === 0) denominator /= 2
    while (denominator % 5 === 0) denominator /= 5
    return denominator === 1
}

export function toExactDecimal(value: FractionValue, decimalSeparator: ',' | '.' = ','): string | null {
    if (!hasTerminatingDecimal(value)) return null
    const normalized = fraction(value.numerator, value.denominator)
    let denominator = normalized.denominator
    let twos = 0
    let fives = 0
    while (denominator % 2 === 0) {
        denominator /= 2
        twos += 1
    }
    while (denominator % 5 === 0) {
        denominator /= 5
        fives += 1
    }
    const digits = Math.max(twos, fives)
    const rendered = toNumber(normalized).toFixed(digits)
    return decimalSeparator === ',' ? rendered.replace('.', ',') : rendered
}

/** Arabic-Indic and Persian digits as 0–9 */
export function normalizeDigits(value: string): string {
    return value
        .replace(/[٠-٩۰-۹]/g, (digit) => ARABIC_DIGITS[digit] ?? digit)
        .replace(/[−–—]/g, '-')
        .replace(/[⁄∕]/g, '/')
        .replace(/٫/g, ',')
        .replace(/٬/g, '')
}

function decimalToFraction(value: string): FractionValue | null {
    const normalized = value.replace(',', '.')
    if (!/^[+-]?\d+(?:\.\d+)?$/.test(normalized)) return null
    const [integerPart, decimalPart = ''] = normalized.split('.')
    if (!decimalPart) return fraction(Number(integerPart))
    const sign = integerPart.startsWith('-') ? -1 : 1
    const absoluteInteger = Math.abs(Number(integerPart))
    const denominator = 10 ** decimalPart.length
    const numerator = sign * (absoluteInteger * denominator + Number(decimalPart))
    return fraction(numerator, denominator)
}

/** Spaces between groups of three digits (15 728, also no-break and thin spaces) go: 15728. A mixed number (2 1/3) keeps its space. */
export function withoutDigitGroups(text: string): string {
    return text.replace(/(\d)[\s\u00a0\u202f\u2009]+(?=\d{3}(?![\d/]))/g, '$1')
}

/** The points of a number grouped in thousands (15.728) go: 15728 */
export function withoutThousandPoints(text: string): string {
    return text.replace(/(?<![\d.,])[1-9]\d{0,2}(?:\.\d{3})+(?![\d.,])/g, (group) => group.replace(/\./g, ''))
}

export function parseFractionInput(input: string): FractionValue | null {
    const normalized = withoutDigitGroups(normalizeDigits(input))
        .trim()
        .replace(/\s*([/.,])\s*/g, '$1')
    const isPercentage = /[%٪]/.test(normalized)
    const withPercentage = (value: FractionValue) => isPercentage ? divide(value, fraction(100)) : value

    const mixedMatch = normalized.match(/^[^\d+-]*([+-]?\d+)\s+(\d+)\/(\d+)[^\d]*$/)
    if (mixedMatch) {
        const whole = Number(mixedMatch[1])
        const top = Number(mixedMatch[2])
        const bottom = Number(mixedMatch[3])
        if (bottom === 0 || top >= bottom) return null
        const sign = whole < 0 ? -1 : 1
        return withPercentage(fraction(sign * (Math.abs(whole) * bottom + top), bottom))
    }

    const fractionMatch = normalized.match(/^[^\d+-]*([+-]?\d+)\/([+-]?\d+)[^\d]*$/)
    if (fractionMatch) {
        const top = Number(fractionMatch[1])
        const bottom = Number(fractionMatch[2])
        if (bottom === 0) return null
        return withPercentage(fraction(top, bottom))
    }

    const decimalMatch = normalized.match(/^[^\d+-]*([+-]?\d+(?:[.,]\d+)?)[^\d]*$/)
    if (!decimalMatch) return null
    const parsed = decimalToFraction(decimalMatch[1])
    return parsed ? withPercentage(parsed) : null
}

/**
 * The value of an answer and the text it was read from. A point grouping thousands (15.728) is a decimal
 * point at first; when that does not give the expected value, the number is read again without the points,
 * so 15.728 is right both where 15,728 and where 15 728 is expected. English, where the point is always
 * decimal, can switch this off.
 */
function readAnswer(input: string, expected: FractionValue, dotThousands: boolean): { value: FractionValue | null; read: string } {
    const value = parseFractionInput(input)
    if (!dotThousands || (value !== null && equals(value, expected))) return { value, read: input }
    const undotted = withoutThousandPoints(input)
    const retry = undotted === input ? null : parseFractionInput(undotted)
    return retry !== null && equals(retry, expected) ? { value: retry, read: undotted } : { value, read: input }
}

export function answerEquals(input: string, expected: FractionValue, dotThousands = true): boolean {
    const { value } = readAnswer(input, expected, dotThousands)
    return value !== null && equals(value, expected)
}

/** The written form a task asks for: any equivalent value, the irreducible fraction or a mixed number. */
export type AnswerForm = 'any' | 'simplified' | 'mixed'
export type AnswerCheck = 'correct' | 'incorrect' | 'wrong-form' | 'unreadable'

export function checkAnswer(input: string, expected: FractionValue, form: AnswerForm = 'any', dotThousands = true): AnswerCheck {
    const { value, read } = readAnswer(input, expected, dotThousands)
    if (value === null) return 'unreadable'
    if (!equals(value, expected)) return 'incorrect'
    if (form === 'any') return 'correct'

    const written = withoutDigitGroups(normalizeDigits(read)).trim().replace(/\s*([/.,])\s*/g, '$1')
        // Labels and units around the number ("x = 15", "25 m") do not change how it is written
        .replace(/^[^\d+-]+/, '')
        .replace(/[^\d%٪]+$/, '')
    const target = fraction(expected.numerator, expected.denominator)
    // A whole number is already in its simplest form, and has no fractional part to write as mixed
    if (target.denominator === 1) return /^[+-]?\d+$/.test(written) ? 'correct' : 'wrong-form'

    const plain = written.match(/^[+-]?(\d+)\/(\d+)$/)
    const isIrreducible = plain !== null && gcd(Number(plain[1]), Number(plain[2])) === 1
    // Proper fractions have no whole part, so "mixed" means their irreducible form
    if (form === 'simplified' || Math.abs(target.numerator) < target.denominator) {
        return isIrreducible ? 'correct' : 'wrong-form'
    }

    const mixed = written.match(/^[+-]?\d+\s+(\d+)\/(\d+)$/)
    return mixed !== null && gcd(Number(mixed[1]), Number(mixed[2])) === 1 ? 'correct' : 'wrong-form'
}
