/* ==========================================================================
   Aljebra · 1. DBH — the little algebra the unit needs: linear expressions
   in one letter (ax + b), first-degree equations ax + b = cx + d and how
   they are written in class (3x, −x, x², products with ·).
   ========================================================================== */

/** a·x + b */
export interface Linear {
    a: number
    b: number
}

/** left = right, both linear in x */
export interface LinearEquation {
    left: Linear
    right: Linear
}

export const linear = (a: number, b = 0): Linear => ({ a, b })

export const valueAt = (expression: Linear, x: number) => expression.a * x + expression.b

/** Coefficient in front of a letter: 1 and −1 are not written */
export function coefficientLatex(coefficient: number, letter: string): string {
    if (coefficient === 1) return letter
    if (coefficient === -1) return `-${letter}`
    return `${coefficient}${letter}`
}

/** ax + b as written in class: 3x+2, x-5, -2x, 7 */
export function linearLatex(expression: Linear, letter = 'x'): string {
    const { a, b } = expression
    if (a === 0) return String(b)
    const term = coefficientLatex(a, letter)
    if (b === 0) return term
    return `${term}${b > 0 ? '+' : '-'}${Math.abs(b)}`
}

export function equationLatex(equation: LinearEquation, letter = 'x'): string {
    return `${linearLatex(equation.left, letter)}=${linearLatex(equation.right, letter)}`
}

/** Solution of ax + b = cx + d; null when there is none or every x works */
export function solve(equation: LinearEquation): number | null {
    const a = equation.left.a - equation.right.a
    const free = equation.right.b - equation.left.b
    if (a === 0) return null
    return free / a
}

export const isSolution = (equation: LinearEquation, x: number) => valueAt(equation.left, x) === valueAt(equation.right, x)

/** Sum of like terms: every term of the list is c·x^power; returns the reduced list, highest power first */
export interface Term {
    coefficient: number
    power: number
}

export function reduceTerms(terms: Term[]): Term[] {
    const byPower = new Map<number, number>()
    for (const term of terms) byPower.set(term.power, (byPower.get(term.power) ?? 0) + term.coefficient)
    return [...byPower.entries()]
        .filter(([, coefficient]) => coefficient !== 0)
        .sort(([left], [right]) => right - left)
        .map(([power, coefficient]) => ({ coefficient, power }))
}

export function termLatex(term: Term, letter = 'x'): string {
    if (term.power === 0) return String(term.coefficient)
    const literal = term.power === 1 ? letter : `${letter}^{${term.power}}`
    return coefficientLatex(term.coefficient, literal)
}

/** A list of terms written as a polynomial: 3x^{2}-x+4 */
export function termsLatex(terms: Term[], letter = 'x'): string {
    if (terms.length === 0) return '0'
    return terms.map((term, index) => {
        const written = termLatex(term, letter)
        if (index === 0) return written
        return written.startsWith('-') ? written : `+${written}`
    }).join('')
}

/** Degree of a polynomial written as a list of terms */
export const degreeOf = (terms: Term[]) => reduceTerms(terms).reduce((max, term) => Math.max(max, term.power), 0)

/** Product of two monomials c·x^p */
export const multiplyTerms = (left: Term, right: Term): Term => ({ coefficient: left.coefficient * right.coefficient, power: left.power + right.power })
