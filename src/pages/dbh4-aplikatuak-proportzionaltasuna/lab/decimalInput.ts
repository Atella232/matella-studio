import { normalizeDigits } from '../../../features/unit-v2/math/fraction.ts'
import type { UnitLanguage } from '../../../features/unit-v2/types.ts'
import { decimalSeparatorFor, englishDigits } from '../../../utils/numberFormat.ts'

/**
 * A typed number with up to two decimals (3,2 % or 448,80 €), the decimal mark of each language:
 * 3,2 in Basque and Spanish (18.700 and 18 700 are thousands), 3.2 in English (18,700 is thousands)
 * and Arabic. A comma is also read as the decimal mark in English and Arabic. Null when it cannot be read.
 */
export function readDecimalField(text: string, language: UnitLanguage): number | null {
    let plain = normalizeDigits(text).replace(/[\s€%٪]/g, '').replace(/٫/g, '.')
    if (language === 'en') plain = englishDigits(plain)
    else if (/^\d{1,3}(?:\.\d{3})+(?:,\d+)?$/.test(plain)) plain = plain.replace(/\./g, '')
    plain = plain.replace(',', '.')
    return /^\d+(?:\.\d{1,2})?$/.test(plain) ? Number(plain) : null
}

/** 3,2 or 448,80 (3.2 and 448.80 in English and Arabic); euros keep their two decimals */
export function decimalFieldText(value: number, language: UnitLanguage, money = false): string {
    const text = money && !Number.isInteger(value) ? value.toFixed(2) : String(value)
    return language === 'ar' ? text : text.replace('.', decimalSeparatorFor(language))
}
