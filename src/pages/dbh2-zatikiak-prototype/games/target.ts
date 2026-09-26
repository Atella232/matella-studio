import { equals, fraction, hasTerminatingDecimal, toLatex, toNumber, type FractionValue } from '../math/fraction.ts'
import { decimalLatex } from './memory.ts'
import { pick, randomInt, type Random } from './random.ts'
import type { Stars } from './records.ts'

/* ==========================================================================
   Itua (Diana): throw each number onto the number line. The closer, the more
   points. After every throw the line shows where the number really is and how
   to find it.
   ========================================================================== */

export const TARGET_THROWS = 10

export type TargetForm = 'fraction' | 'mixed' | 'decimal'

export interface TargetLevel {
    min: number
    max: number
    forms: TargetForm[]
    denominators: number[]
    negatives: boolean
}

export const targetLevels: TargetLevel[] = [
    { min: 0, max: 1, forms: ['fraction'], denominators: [2, 3, 4, 5, 6, 8, 10], negatives: false },
    { min: 0, max: 3, forms: ['fraction', 'mixed', 'decimal'], denominators: [2, 3, 4, 5, 6, 8], negatives: false },
    { min: -2, max: 2, forms: ['fraction', 'mixed', 'decimal'], denominators: [2, 3, 4, 5, 6], negatives: true }
]

export interface TargetRound {
    value: FractionValue
    form: TargetForm
}

function formFits(value: FractionValue, form: TargetForm): boolean {
    if (form === 'decimal') return hasTerminatingDecimal(value)
    if (form === 'mixed') return Math.abs(value.numerator) > value.denominator
    return true
}

export function createTargetRounds(random: Random, levelIndex: number): TargetRound[] {
    const level = targetLevels[levelIndex]
    const rounds: TargetRound[] = []
    let guard = 0
    while (rounds.length < TARGET_THROWS && guard < 2000) {
        guard += 1
        const denominator = pick(random, level.denominators)
        const low = Math.ceil(level.min * denominator) + 1
        const high = Math.floor(level.max * denominator) - 1
        const numerator = randomInt(random, low, high)
        if (numerator % denominator === 0) continue
        const value = fraction(numerator, denominator)
        if (rounds.some((round) => equals(round.value, value))) continue
        const forms = level.forms.filter((form) => formFits(value, form))
        rounds.push({ value, form: pick(random, forms) })
    }
    return rounds
}

export function targetLatex(round: TargetRound, separator: ',' | '.' = ','): string {
    const value = round.value
    if (round.form === 'decimal') return decimalLatex(value, separator)
    if (round.form === 'mixed') {
        const sign = value.numerator < 0 ? '-' : ''
        const absolute = Math.abs(value.numerator)
        const whole = Math.floor(absolute / value.denominator)
        return `${sign}${whole}\\tfrac{${absolute - whole * value.denominator}}{${value.denominator}}`
    }
    return toLatex(value)
}

/** Share of the range in which the value lies (0 = left end, 1 = right end) */
export function targetShare(levelIndex: number, value: number): number {
    const { min, max } = targetLevels[levelIndex]
    return (value - min) / (max - min)
}

export function shareToValue(levelIndex: number, share: number): number {
    const { min, max } = targetLevels[levelIndex]
    return min + Math.min(1, Math.max(0, share)) * (max - min)
}

export type ThrowGrade = 'bullseye' | 'close' | 'near' | 'far'

export interface ThrowResult {
    points: number
    grade: ThrowGrade
    /** Distance as a share of one unit, so it reads the same on every level */
    errorUnits: number
}

/**
 * Points depend on the distance measured in units: within 1/100 of a unit is a
 * bullseye (100 points); beyond 1/8 of a unit it scores nothing.
 */
export function scoreThrow(guess: number, value: FractionValue): ThrowResult {
    const errorUnits = Math.abs(guess - toNumber(value))
    const bullseye = 0.01
    const zero = 0.125
    const points = errorUnits <= bullseye ? 100 : Math.max(0, Math.round(100 * (1 - (errorUnits - bullseye) / (zero - bullseye))))
    const grade: ThrowGrade = errorUnits <= bullseye ? 'bullseye' : errorUnits <= 0.03 ? 'close' : errorUnits <= 0.07 ? 'near' : 'far'
    return { points, grade, errorUnits }
}

export function targetStars(total: number): Stars {
    if (total >= 850) return 3
    if (total >= 650) return 2
    if (total >= 400) return 1
    return 0
}

/**
 * How to find the value on the line: decimals and mixed numbers are rewritten
 * as a fraction, and improper fractions are split into whole part + rest,
 * e.g. 1,75 = 7/4 = 1 + 3/4.
 */
export function targetHintLatex(round: TargetRound, separator: ',' | '.' = ','): string {
    const value = round.value
    const absolute = Math.abs(value.numerator)
    const whole = Math.floor(absolute / value.denominator)
    const rest = absolute - whole * value.denominator
    const negative = value.numerator < 0
    const steps: string[] = []
    if (round.form !== 'fraction') steps.push(targetLatex(round, separator))
    steps.push(toLatex(value))
    if (whole === 0) {
        steps.push(`${negative ? '-' : ''}${rest}\\cdot\\frac{1}{${value.denominator}}`)
    } else if (rest > 0) {
        steps.push(negative ? `-\\left(${whole}+\\frac{${rest}}{${value.denominator}}\\right)` : `${whole}+\\frac{${rest}}{${value.denominator}}`)
    }
    return steps.join('=')
}
