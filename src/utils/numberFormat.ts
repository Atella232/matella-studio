/**
 * Spanish and Basque write 0,5 and group thousands with a point (15.000); Arabic keeps its own
 * habits where the code already set them; English writes 0.5 and groups thousands with a comma (15,000).
 */

/** The decimal mark of text shown to the student */
export function decimalSeparatorFor(language: string): ',' | '.' {
    return language === 'en' ? '.' : ','
}

/** The mark that groups thousands in text shown to the student */
export function thousandsSeparatorFor(language: string): ',' | '.' {
    return language === 'en' ? ',' : '.'
}

/**
 * English answers may group thousands with commas (15,000). The readers of the units work on plain digits,
 * so those commas go. A decimal comma (0,5) and a leading zero are left alone.
 */
export function englishDigits(input: string): string {
    return input.replace(/(?<![\d,])[1-9]\d{0,2}(?:,\d{3})+(?!\d)/g, (group) => group.replace(/,/g, ''))
}

/**
 * A placeholder written the Spanish way (2,35 or 15.000) as English writes it (2.35 or 15,000).
 * Decimals here have one or two digits, so a point followed by three digits is a group of thousands.
 */
export function englishNumberText(text: string): string {
    return text.replace(/(\d)([.,])(\d+)/g, (_, whole: string, mark: string, digits: string) => {
        const groupsThousands = mark === '.' && digits.length === 3
        return `${whole}${groupsThousands ? ',' : '.'}${digits}`
    })
}
