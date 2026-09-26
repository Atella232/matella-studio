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

function normalizeDigits(value: string): string {
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

export function parseFractionInput(input: string): FractionValue | null {
    const normalized = normalizeDigits(input)
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

export function answerEquals(input: string, expected: FractionValue): boolean {
    const parsed = parseFractionInput(input)
    return parsed !== null && equals(parsed, expected)
}
