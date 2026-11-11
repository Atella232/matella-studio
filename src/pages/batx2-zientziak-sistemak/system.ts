import { divide, fraction, type FractionValue } from '../../features/unit-v2/math/fraction.ts'
import type { LocalizedText } from '../../features/unit-v2/types.ts'
import { rank, toMatrix } from '../batx2-zientziak-matrizeak/matrix.ts'
import { det } from '../batx2-zientziak-determinanteak/determinant.ts'

/* ==========================================================================
   Sistemak · Batxilergoa 2 · Zientziak — linear systems AX = B with whole
   numbers: the augmented matrix A*, the Rouché–Frobenius classification
   (rank of A, rank of A*, number of unknowns), Cramer's rule, and the
   system written as LaTeX (\begin{cases}). Exported for the lab, the
   games and 2.º Ciencias Sociales. No React here.
   ========================================================================== */

export type SystemKind = 'determined' | 'indeterminate' | 'inconsistent'

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })

/** The words of each kind, as in 1.º Bachillerato */
export const KIND_WORDS: Record<SystemKind, LocalizedText> = {
    determined: say('Bateragarri determinatua', 'Compatible determinado', 'متوافق محدد', 'Consistent and independent'),
    indeterminate: say('Bateragarri indeterminatua', 'Compatible indeterminado', 'متوافق غير محدد', 'Consistent and dependent'),
    inconsistent: say('Bateraezina', 'Incompatible', 'غير متوافق', 'Inconsistent')
}

/** A* = (A | B) as rows */
export const augmentedRows = (a: number[][], b: number[]) => a.map((row, i) => [...row, b[i]])

export const rankOf = (rows: number[][]) => rank(toMatrix(rows))

export interface Classification {
    rankA: number
    rankAugmented: number
    unknowns: number
    kind: SystemKind
    /** n − rg(A) when it is consistent */
    parameters: number
}

/** Rouché–Frobenius */
export function classify(a: number[][], b: number[]): Classification {
    const rankA = rankOf(a)
    const rankAugmented = rankOf(augmentedRows(a, b))
    const unknowns = a[0].length
    const kind: SystemKind = rankA !== rankAugmented ? 'inconsistent' : rankA === unknowns ? 'determined' : 'indeterminate'
    return { rankA, rankAugmented, unknowns, kind, parameters: kind === 'inconsistent' ? 0 : unknowns - rankA }
}

/** A with column j replaced by B: the A_x, A_y, A_z of Cramer */
export const replaceColumn = (a: number[][], b: number[], column: number) => a.map((row, i) => row.map((value, j) => (j === column ? b[i] : value)))

export const detValue = (rows: number[][]) => {
    const value = det(rows)
    return value.numerator / value.denominator + 0
}

/** Cramer: x_j = |A_j| / |A|, or null when A is not square or |A| = 0 */
export function cramer(a: number[][], b: number[]): FractionValue[] | null {
    if (a.length !== a[0].length) return null
    const d = det(a)
    if (d.numerator === 0) return null
    return a[0].map((_, j) => divide(det(replaceColumn(a, b, j)), d))
}

/** Whether a solution satisfies every equation */
export const satisfies = (a: number[][], b: number[], solution: number[]) => a.every((row, i) => Math.abs(row.reduce((sum, value, j) => sum + value * solution[j], 0) - b[i]) < 1e-9)

export const UNKNOWNS = ['x', 'y', 'z', 't']

/** One equation as LaTeX: 2x-y+z=3, with 0 terms left out */
export function equationLatex(row: number[], value: number, names = UNKNOWNS): string {
    const terms = row.flatMap((coefficient, j) => {
        if (coefficient === 0) return []
        const size = Math.abs(coefficient) === 1 ? '' : String(Math.abs(coefficient))
        return [{ sign: coefficient < 0 ? '-' : '+', text: `${size}${names[j]}` }]
    })
    const left = terms.length ? terms.map((term, index) => (index === 0 ? (term.sign === '-' ? '-' : '') : term.sign) + term.text).join('') : '0'
    return `${left}=${value}`
}

/** The system as \begin{cases}…\end{cases} */
export const systemLatex = (a: number[][], b: number[], names = UNKNOWNS) => `\\begin{cases}${a.map((row, i) => equationLatex(row, b[i], names)).join('\\\\ ')}\\end{cases}`

/** A* as LaTeX, with the bar before the column of B */
export const augmentedStarLatex = (a: number[][], b: number[]) => `\\left(\\begin{array}{${'c'.repeat(a[0].length)}|c}${augmentedRows(a, b).map((row) => row.join('&')).join('\\\\')}\\end{array}\\right)`

/** A fraction as a number when it is whole */
export const asNumber = (value: FractionValue) => value.numerator / value.denominator
export const whole = (value: number) => fraction(value)
