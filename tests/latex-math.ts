/* Reading the formulas of the lessons: the numbers they work out and their letters. Shared by
   lesson-checks.test.ts and lesson-texts.test.ts (this file is not a test). */

export const formulas = (text: string) => [...text.matchAll(/\$([^$]+)\$/g)].map(([, formula]) => formula)

/** A unit written after the number (20 cm, 12 m², 5 €), left out before evaluating */
export const unit = /(?:\\[ ,;]|\s)*(?:\\(?:text|mathrm)\{[^{}]*\}(?:\^\{?\d\}?)?|\\text\{€\}|€)\s*$/

/** A letter that is not part of a LaTeX command (the x of 3x, not the c of \\cdot) */
export const letter = /(?<!\\[a-zA-Z]*)[a-z]/g

/** The number tried for a letter: a different one for each letter and for each trial */
export const letterValue = (name: string, trial: number) => 0.7 + (name.charCodeAt(0) % 7) * 0.37 + trial * 1.13

/**
 * Evaluates a numeric expression (·, :, \frac, powers, roots, π, decimal commas, brackets); null when
 * it is something else. With a trial, each letter becomes a number, so 3x+5x and 8x can be compared.
 */
export function evaluate(latex: string, trial?: number | ((name: string) => number)): number | null {
    let js = latex.replace(/\\left|\\right/g, '').replace(/^\s*\\approx\s*/, '').replace(unit, '')
    if (trial !== undefined) js = js.replace(letter, (name) => `(${typeof trial === 'number' ? letterValue(name, trial) : trial(name)})`)
    js = js.replace(/(\d)\\,(?=\d)/g, '$1') // thousands: 39\,999
    js = js.replace(/(\d+)\s*\\frac\{(\d+)\}\{(\d+)\}/g, '($1+($2)/($3))') // a mixed number: 4 5/6 is 4 + 5/6
    // Innermost first, so a power inside a root or a fraction inside a fraction also works
    for (let previous = ''; previous !== js;) {
        previous = js
        js = js.replace(/\\[dt]?frac\{([^{}]+)\}\{([^{}]+)\}/g, '(($1)/($2))').replace(/\\sqrt\{([^{}]+)\}/g, 'Math.sqrt($1)').replace(/\^\{([^{}]+)\}/g, '**($1)')
    }
    js = js.replace(/\^(\d)/g, '**$1').replace(/\\pi/g, 'Math.PI').replace(/\{,\}/g, '.').replace(/\\cdot/g, '*').replace(/\\mathbin\{:\}/g, '/').replace(/\\div/g, '/').replace(/[[\]]/g, (b) => (b === '[' ? '(' : ')'))
    js = js.replace(/([\d)])\s*(?=\()/g, '$1*') // products without a dot: 2x, ab, (x+1)(x-1)
    if (!/^(?:[\d.+\-*/() ]|Math\.sqrt|Math\.PI)+$/.test(js)) return null
    try {
        const value = Function(`return ${js}`)() as number
        return Number.isFinite(value) ? value : null
    } catch {
        return null // −3**2 is not valid JavaScript: check it by hand
    }
}

/** A formula with an operation in it (not just a signed number such as −8) */
export const isCalculation = (latex: string) => /[\d)\]}]\s*(?:[+-]|\\cdot|\\mathbin\{:\}|\\div|\^)|\\frac|\\sqrt/.test(latex)

export const near = (a: number, b: number) => Math.abs(a - b) < 1e-9 * Math.max(1, Math.abs(b))
