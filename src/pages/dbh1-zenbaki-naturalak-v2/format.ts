import { groupDigits, groupLatex } from '../../utils/numberFormat.ts'

/** Groups of three digits as the RAE asks: 15 728 (no-break space; 2918 together) in Basque, Spanish and Arabic, 15,728 in English */
export function formatNatural(value: number, language: string): string {
    return groupDigits(value, language)
}

/** Groups of three digits inside a formula ($…$): a thin space (15\,728, 2918), which English writes as a comma */
export function formatNaturalLatex(value: number): string {
    return groupLatex(value)
}
