import { randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { compareTo, freshFrom, type Prediction } from './prediction.ts'

/* ==========================================================================
   L3 · Hondarraren makina (La máquina del resto): a polynomial P(x) is
   divided by x − a with Ruffini's table, and the remainder appears next to
   the value P(a) on the graph of P. Moving a, the learner sees that the
   last number of the table is always P(a), and that the roots are the a
   where the remainder is 0. Before each division, the learner predicts
   whether the remainder will be negative, zero or positive; ▶ sweeps a
   from −5 to 5 and plots every P(a). Pure logic, whole numbers only.
   ========================================================================== */

/** Coefficients from the highest degree; every polynomial has whole roots between −5 and 5 */
export const MACHINE_POLYNOMIALS: number[][] = [
    [1, -1, -6],
    [1, 0, -7, 6],
    [1, -2, -5, 6],
    [1, 1, -4, -4],
    [2, -2, -4]
]

export const MACHINE_A = { min: -5, max: 5 } as const

export interface MachineState {
    polynomial: number
    a: number
    prediction: Prediction | null
}

export const initialMachineState: MachineState = { polynomial: 0, a: 1, prediction: null }

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value)))

export function setMachine(state: MachineState, patch: Partial<Omit<MachineState, 'prediction'>>): MachineState {
    const polynomial = clamp(patch.polynomial ?? state.polynomial, 0, MACHINE_POLYNOMIALS.length - 1)
    const a = clamp(patch.a ?? state.a, MACHINE_A.min, MACHINE_A.max)
    const same = polynomial === state.polynomial && a === state.a
    return { polynomial, a, prediction: same ? state.prediction : null }
}

/** P(a), by Horner's rule */
export const valueAt = (coefficients: number[], a: number) => coefficients.reduce((value, coefficient) => value * a + coefficient, 0)

/** Ruffini's table for dividing by x − a: the middle row and the bottom row */
export function ruffiniTable(coefficients: number[], a: number): { middle: Array<number | null>; bottom: number[] } {
    const bottom: number[] = []
    const middle: Array<number | null> = [null]
    for (const [index, coefficient] of coefficients.entries()) {
        if (index === 0) bottom.push(coefficient)
        else {
            const product = bottom[index - 1] * a
            middle.push(product)
            bottom.push(coefficient + product)
        }
    }
    return { middle, bottom }
}

export const machineRemainder = (state: MachineState) => {
    const { bottom } = ruffiniTable(MACHINE_POLYNOMIALS[state.polynomial], state.a)
    return bottom[bottom.length - 1]
}

export const machineRoots = (polynomial: number) => Array.from({ length: 11 }, (_, i) => i - 5).filter((a) => valueAt(MACHINE_POLYNOMIALS[polynomial], a) === 0)

/** Will the remainder be negative, zero or positive? */
export const machinePrediction = (state: MachineState): Prediction => compareTo(machineRemainder(state), 0)

/** The polynomial in LaTeX */
export function polyLatex(coefficients: number[]): string {
    const degree = coefficients.length - 1
    const parts: string[] = []
    coefficients.forEach((coefficient, index) => {
        if (coefficient === 0) return
        const power = degree - index
        const letter = power === 0 ? '' : power === 1 ? 'x' : `x^{${power}}`
        const size = Math.abs(coefficient)
        const number = size === 1 && letter !== '' ? '' : String(size)
        const sign = coefficient < 0 ? '-' : parts.length === 0 ? '' : '+'
        parts.push(`${sign}${number}${letter}`)
    })
    return parts.join('') || '0'
}

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const P = (index: number) => `P(x)=${polyLatex(MACHINE_POLYNOMIALS[index])}`

export const machineChallenges: LabChallenge<MachineState>[] = [
    { id: 91301, prompt: say(`$${P(0)}$. Aurkitu erro positiboa.`, `$${P(0)}$. Encuentra la raíz positiva.`, `$${P(0)}$. جد الجذر الموجب.`, `$${P(0)}$. Find the positive root.`), hint: say('Probatu $-6$ zenbakiaren zatitzaileak.', 'Prueba los divisores de $-6$.', 'جرّب قواسم $-6$.', 'Try the divisors of $-6$.'), isSolved: (state) => state.polynomial === 0 && state.a === 3 },
    { id: 91302, prompt: say(`$${P(1)}$. Aurkitu erro negatiboa.`, `$${P(1)}$. Encuentra la raíz negativa.`, `$${P(1)}$. جد الجذر السالب.`, `$${P(1)}$. Find the negative root.`), hint: say('Zatitzaile negatiboak ere bai.', 'También los divisores negativos.', 'والقواسم السالبة أيضًا.', 'The negative divisors too.'), isSolved: (state) => state.polynomial === 1 && state.a === -3 },
    { id: 91303, prompt: say(`$${P(2)}$. Lortu $-4$ hondarra.`, `$${P(2)}$. Consigue resto $-4$.`, `$${P(2)}$. احصل على الباقي $-4$.`, `$${P(2)}$. Get a remainder of $-4$.`), hint: say('$P(a)=-4$ bilatzen da.', 'Se busca $P(a)=-4$.', 'نبحث عن $P(a)=-4$.', 'You are looking for $P(a)=-4$.'), isSolved: (state) => state.polynomial === 2 && machineRemainder(state) === -4 },
    { id: 91304, prompt: say(`$${P(3)}$. Aurkitu erro bat, $x=-1$ ez dena.`, `$${P(3)}$. Encuentra una raíz distinta de $x=-1$.`, `$${P(3)}$. جد جذرًا غير $x=-1$.`, `$${P(3)}$. Find a root other than $x=-1$.`), hint: say('$x^{2}(x+1)-4(x+1)$.', '$x^{2}(x+1)-4(x+1)$.', '$x^{2}(x+1)-4(x+1)$.', '$x^{2}(x+1)-4(x+1)$.'), isSolved: (state) => state.polynomial === 3 && state.a !== -1 && machineRemainder(state) === 0 },
    { id: 91305, prompt: say(`$${P(4)}$. Lortu hondarrik handiena $-5$ eta $5$ artean.`, `$${P(4)}$. Consigue el mayor resto entre $-5$ y $5$.`, `$${P(4)}$. احصل على أكبر باقٍ بين $-5$ و$5$.`, `$${P(4)}$. Get the largest remainder between $-5$ and $5$.`), hint: say('Mutur batean.', 'En uno de los extremos.', 'في أحد الطرفين.', 'At one of the ends.'), isSolved: (state) => state.polynomial === 4 && state.a === -5 }
]

/** Endless practice: a remainder to reach on one of the polynomials */
const machineMaker: LabChallengeMaker<MachineState> = (random) => {
    for (;;) {
        const polynomial = randomInt(random, 0, MACHINE_POLYNOMIALS.length - 1)
        const a = randomInt(random, -4, 4)
        const value = valueAt(MACHINE_POLYNOMIALS[polynomial], a)
        // Only when exactly one a gives that remainder
        const matches = Array.from({ length: 11 }, (_, i) => i - 5).filter((candidate) => valueAt(MACHINE_POLYNOMIALS[polynomial], candidate) === value)
        if (matches.length !== 1) continue
        return {
            prompt: say(`$${P(polynomial)}$. Lortu ${value} hondarra.`, `$${P(polynomial)}$. Consigue resto ${value}.`, `$${P(polynomial)}$. احصل على الباقي ${value}.`, `$${P(polynomial)}$. Get a remainder of ${value}.`),
            hint: say(`Bilatu $P(a)=${value}$.`, `Busca $P(a)=${value}$.`, `ابحث عن $P(a)=${value}$.`, `Look for $P(a)=${value}$.`),
            isSolved: (state) => state.polynomial === polynomial && state.a === a,
            solution: { polynomial, a, prediction: null }
        }
    }
}

export const machineExtra = freshFrom(initialMachineState, machineMaker)
