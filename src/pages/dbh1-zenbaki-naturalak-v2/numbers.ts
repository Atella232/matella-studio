/* ==========================================================================
   Zenbaki naturalak · number helpers shared by the content, lab and games
   ========================================================================== */

const toAsciiDigits = (text: string) => text
    .replace(/[٠-٩]/g, (digit) => String(digit.charCodeAt(0) - 0x0660))
    .replace(/[۰-۹]/g, (digit) => String(digit.charCodeAt(0) - 0x06f0))

/**
 * In class large numbers are written with a point every three digits
 * (15.000). There are no decimals in this unit, so "15.000", "15 000" or
 * "15,000" all mean fifteen thousand.
 */
export function readNaturalAnswer(input: string): string {
    const written = toAsciiDigits(input).trim()
    return /^\d{1,3}(?:[.,\s\u00a0\u202f]\d{3})+$/.test(written) ? written.replace(/\D/g, '') : input
}

const ROMAN: Array<[number, string]> = [
    [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'], [100, 'C'], [90, 'XC'],
    [50, 'L'], [40, 'XL'], [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']
]

/** Roman numeral of 1–3999 */
export function toRoman(value: number): string {
    if (!Number.isInteger(value) || value < 1 || value > 3999) throw new Error('Roman numerals go from 1 to 3999')
    let rest = value
    let result = ''
    for (const [amount, symbol] of ROMAN) {
        while (rest >= amount) {
            result += symbol
            rest -= amount
        }
    }
    return result
}

/** Value of a well-formed Roman numeral, or null */
export function fromRoman(text: string): number | null {
    const written = text.trim().toUpperCase()
    const values: Record<string, number> = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 }
    if (!/^[IVXLCDM]+$/.test(written)) return null
    let total = 0
    for (let index = 0; index < written.length; index += 1) {
        const current = values[written[index]]
        const next = values[written[index + 1]] ?? 0
        total += current < next ? -current : current
    }
    return total >= 1 && total <= 3999 && toRoman(total) === written ? total : null
}
