const DECIMAL_MARK = '\u0001'
const GROUP_MARK = '\u0002'
const DECIMAL_GAP = '\u0003'

/**
 * The formulas are written once in Spanish and Basque: decimals are 0{,}5 and thousands are 8\,706 (or the older
 * 8.706). English writes 0.5 and 8{,}706, so only those marks change; the thin spaces of a decimal part
 * (0{,}000\,072) stay. The Spanish trigonometric names (\sen, \tg) are the English ones (\sin, \tan), and the
 * median Me is Med. The stored formulas stay as they are.
 */
export function englishLatex(latex: string): string {
    return latex
        .replace(/\{,\}/g, DECIMAL_MARK)
        .replace(new RegExp(`${DECIMAL_MARK}\\d+(?:\\\\,\\d+)+`, 'g'), (part) => part.replace(/\\,/g, DECIMAL_GAP))
        .replace(/(\d)(?:\\,|\{\.\}|\.)(?=\d{3}(?!\d))/g, `$1${GROUP_MARK}`)
        .replace(new RegExp(DECIMAL_MARK, 'g'), '.')
        .replace(new RegExp(GROUP_MARK, 'g'), '{,}')
        .replace(new RegExp(DECIMAL_GAP, 'g'), '\\,')
        .replace(/\\sen(?![a-zA-Z])/g, '\\sin')
        .replace(/\\tg(?![a-zA-Z])/g, '\\tan')
        .replace(/\\(text|mathrm)\{Me\}/g, '\\$1{Med}')
}

/** The formula as the page renders it in a language: only English changes the notation */
export function formulaFor(language: string, latex: string): string {
    return language.startsWith('en') ? englishLatex(latex) : latex
}
