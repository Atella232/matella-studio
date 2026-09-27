import type { LocalizedText } from '../../features/unit-v2/types.ts'

/**
 * Formulas whose notation changes with the language: @DIV, @GCD and @LCM are
 * Zat, ZKH and MKT in Basque (also used in Arabic, as in class) and Div,
 * m.c.d. and m.c.m. in Spanish, as in the Santillana textbook.
 */
export function notation(latex: string): LocalizedText {
    const basque = latex.replace(/@DIV/g, '\\mathrm{Zat}').replace(/@GCD/g, '\\mathrm{ZKH}').replace(/@LCM/g, '\\mathrm{MKT}')
    const spanish = latex.replace(/@DIV/g, '\\mathrm{Div}').replace(/@GCD/g, '\\text{m.c.d.}').replace(/@LCM/g, '\\text{m.c.m.}')
    return { eu: basque, es: spanish, ar: basque }
}
