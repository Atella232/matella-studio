import { thousandsSeparatorFor } from '../../utils/numberFormat.ts'

/** Groups of three digits as written in class: 15.728 in Spanish and Basque, 15,728 in English */
export function formatNatural(value: number, language: string): string {
    return String(value).replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparatorFor(language))
}

/** Groups of three digits inside a formula ($…$): always the point, because MathText writes it as {,} in English */
export function formatNaturalLatex(value: number): string {
    return String(value).replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}
