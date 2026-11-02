/**
 * Spanish, Basque and Arabic group thousands with a space, as the RAE asks: 15 728, and four digits stay
 * together (2918). Spanish and Basque write 0,5; Arabic 0.5. English writes 0.5 and groups thousands with a
 * comma (15,000). In text the space is a no-break space, so a number never splits across two lines; in
 * formulas it is a thin space (15\,728).
 */

/** The no-break space that groups thousands in text */
export const GROUP_SPACE = '\u00a0'

/** The decimal mark of text shown to the student */
export function decimalSeparatorFor(language: string): ',' | '.' {
    return language === 'en' ? '.' : ','
}

/** The mark that groups thousands in text shown to the student */
export function thousandsSeparatorFor(language: string): ',' | typeof GROUP_SPACE {
    return language === 'en' ? ',' : GROUP_SPACE
}

/** The whole part of a number (digits only, maybe with a minus) with its thousands grouped by `mark`, from `from` digits */
function groupWhole(whole: string, mark: string, from: number): string {
    const digits = whole.replace('-', '')
    return digits.length < from ? whole : whole.replace(/\B(?=(\d{3})+(?!\d))/g, mark)
}

/**
 * A number as text with its thousands grouped: 15 728 and 2918 in Basque, Spanish and Arabic (no-break
 * space, only from five digits), 15,728 and 2,918 in English. A decimal part keeps its digits as they are.
 */
export function groupDigits(value: number | string, language: string): string {
    const text = String(value)
    const match = text.match(/^(-?\d+)(.*)$/)
    if (!match) return text
    return language === 'en' ? `${groupWhole(match[1], ',', 4)}${match[2]}` : `${groupWhole(match[1], GROUP_SPACE, 5)}${match[2]}`
}

/** The same inside a formula, written once for every language: 15\,728 and 2918 (English turns \, into a comma) */
export function groupLatex(value: number | string): string {
    const text = String(value)
    const match = text.match(/^(-?\d+)(.*)$/)
    return match ? `${groupWhole(match[1], '\\,', 5)}${match[2]}` : text
}

/**
 * English answers may group thousands with commas (15,000). The readers of the units work on plain digits,
 * so those commas go. A decimal comma (0,5) and a leading zero are left alone.
 */
export function englishDigits(input: string): string {
    return input.replace(/(?<![\d,])[1-9]\d{0,2}(?:,\d{3})+(?!\d)/g, (group) => group.replace(/,/g, ''))
}

/**
 * A placeholder written the Spanish way (2,35 or 15 000) as English writes it (2.35 or 15,000).
 * Decimals here have one or two digits, so a point followed by three digits is a group of thousands (older
 * placeholders), and so is a space.
 */
export function englishNumberText(text: string): string {
    return text
        .replace(/(\d)([.,])(\d+)/g, (_, whole: string, mark: string, digits: string) => {
            const groupsThousands = mark === '.' && digits.length === 3
            return `${whole}${groupsThousands ? ',' : '.'}${digits}`
        })
        .replace(/(\d)[ \u00a0\u202f](?=\d{3}(?!\d))/g, '$1,')
}
