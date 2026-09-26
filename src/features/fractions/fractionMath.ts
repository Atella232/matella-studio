export interface FractionValue {
    numerator: number
    denominator: number
}

const ARABIC_DIGITS: Record<string, string> = {
    '٠': '0', '١': '1', '٢': '2', '٣': '3', '٤': '4',
    '٥': '5', '٦': '6', '٧': '7', '٨': '8', '٩': '9',
    '۰': '0', '۱': '1', '۲': '2', '۳': '3', '۴': '4',
    '۵': '5', '۶': '6', '۷': '7', '۸': '8', '۹': '9'
}

export function gcd(a: number, b: number): number {
    let left = Math.abs(a)
    let right = Math.abs(b)

    while (right !== 0) {
        const remainder = left % right
        left = right
        right = remainder
    }

    return left || 1
}

export function fraction(numerator: number, denominator: number = 1): FractionValue {
    if (!Number.isFinite(numerator) || !Number.isFinite(denominator) || denominator === 0) {
        throw new Error('A fraction needs finite values and a non-zero denominator')
    }

    const sign = denominator < 0 ? -1 : 1
    const divisor = gcd(numerator, denominator)

    return {
        numerator: sign * numerator / divisor,
        denominator: Math.abs(denominator) / divisor
    }
}

export function equals(left: FractionValue, right: FractionValue): boolean {
    const normalizedLeft = fraction(left.numerator, left.denominator)
    const normalizedRight = fraction(right.numerator, right.denominator)
    return normalizedLeft.numerator === normalizedRight.numerator
        && normalizedLeft.denominator === normalizedRight.denominator
}

export function normalizeLocalizedDigits(value: string): string {
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
    const normalized = normalizeLocalizedDigits(input)
        .trim()
        .replace(/\b(?:y|eta)\b/gi, ' ')
        .replace(/\s*([/.,])\s*/g, '$1')

    const isPercentage = /[%٪]/.test(normalized)
    const withPercentage = (value: FractionValue) => isPercentage
        ? fraction(value.numerator, value.denominator * 100)
        : value

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

export function hasTerminatingDecimal(value: FractionValue): boolean {
    let denominator = fraction(value.numerator, value.denominator).denominator
    while (denominator % 2 === 0) denominator /= 2
    while (denominator % 5 === 0) denominator /= 5
    return denominator === 1
}

export function toExactDecimal(value: FractionValue, decimalSeparator: ',' | '.' = ','): string | null {
    const normalized = fraction(value.numerator, value.denominator)
    if (!hasTerminatingDecimal(normalized)) return null

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
    const rendered = (normalized.numerator / normalized.denominator).toFixed(digits)
    return decimalSeparator === ',' ? rendered.replace('.', ',') : rendered
}

export function formatDecimal(
    value: FractionValue,
    decimalSeparator: ',' | '.' = ',',
    approximateDigits: number = 3
): { value: string, exact: boolean } {
    const exactValue = toExactDecimal(value, decimalSeparator)
    if (exactValue !== null) return { value: exactValue, exact: true }

    const rendered = (value.numerator / value.denominator).toFixed(approximateDigits)
    return {
        value: decimalSeparator === ',' ? rendered.replace('.', ',') : rendered,
        exact: false
    }
}

export function formatPercentage(
    value: FractionValue,
    decimalSeparator: ',' | '.' = ',',
    approximateDigits: number = 1
): { value: string, exact: boolean } {
    const percentage = fraction(value.numerator * 100, value.denominator)
    const formatted = formatDecimal(percentage, decimalSeparator, approximateDigits)
    return { value: `${formatted.value}%`, exact: formatted.exact }
}
