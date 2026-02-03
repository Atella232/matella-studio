// Utility functions for Fraction Memory game

import type { Card, LevelConfig } from '../types'
import { LEVELS } from '../types'

/**
 * Generate a unique ID
 */
export function generateId(): string {
    return Math.random().toString(36).substring(2, 9)
}

/**
 * Greatest Common Divisor using Euclidean algorithm
 */
export function gcd(a: number, b: number): number {
    return b === 0 ? a : gcd(b, a % b)
}

/**
 * Simplify a fraction to its irreducible form
 */
export function simplifyFraction(num: number, den: number): [number, number] {
    const divisor = gcd(Math.abs(num), Math.abs(den))
    return [num / divisor, den / divisor]
}

/**
 * Check if two fractions are equivalent
 */
export function areEquivalent(
    num1: number, den1: number,
    num2: number, den2: number
): boolean {
    // Cross multiplication
    return num1 * den2 === num2 * den1
}

/**
 * Generate an equivalent fraction
 */
export function generateEquivalentFraction(
    num: number,
    den: number,
    maxDenominator: number = 24
): [number, number] {
    // Find possible multipliers
    const multipliers: number[] = []
    for (let m = 2; m <= 6; m++) {
        if (den * m <= maxDenominator) {
            multipliers.push(m)
        }
    }

    if (multipliers.length === 0) return [num, den]

    const mult = multipliers[Math.floor(Math.random() * multipliers.length)]
    return [num * mult, den * mult]
}

/**
 * Convert fraction to decimal string
 */
export function toDecimalString(num: number, den: number): string {
    const value = num / den
    // Format with a reasonable number of decimals
    if (Number.isInteger(value)) return value.toString()
    return value.toFixed(value < 1 && value * 10 % 1 === 0 ? 1 : 2)
}

/**
 * Convert fraction to percentage string
 */
export function toPercentageString(num: number, den: number): string {
    const value = (num / den) * 100
    if (Number.isInteger(value)) return `${value}%`
    return `${value.toFixed(1)}%`
}

/**
 * Generate unique fraction pairs for the game
 */
export function generateFractionPairs(level: number): Array<{ base: [number, number], equivalent: [number, number] }> {
    const config: LevelConfig = LEVELS[Math.min(level, LEVELS.length - 1)]
    const pairs: Array<{ base: [number, number], equivalent: [number, number] }> = []
    const usedFractions = new Set<string>()

    // Prevent infinite loop with iteration limit
    let iterations = 0
    const maxIterations = 1000

    while (pairs.length < config.pairs && iterations < maxIterations) {
        iterations++

        // Pick random denominator
        const den = config.denominators[Math.floor(Math.random() * config.denominators.length)]
        // Numerator between 1 and den-1 (proper fractions)
        const num = Math.floor(Math.random() * (den - 1)) + 1

        // Simplify to get canonical form
        const [simNum, simDen] = simplifyFraction(num, den)
        const key = `${simNum}/${simDen}`

        // Skip if already used
        if (usedFractions.has(key)) continue
        usedFractions.add(key)

        // Generate equivalent
        const [eqNum, eqDen] = generateEquivalentFraction(simNum, simDen)

        // If equivalent is the same as base, use a fixed multiplier
        if (simNum === eqNum && simDen === eqDen) {
            // Force an equivalent by multiplying by 2
            if (simDen * 2 <= 24) {
                pairs.push({
                    base: [simNum, simDen],
                    equivalent: [simNum * 2, simDen * 2]
                })
            }
            continue
        }

        pairs.push({
            base: [simNum, simDen],
            equivalent: [eqNum, eqDen]
        })
    }

    return pairs
}

/**
 * Create cards from fraction pairs
 */
export function createCards(level: number): Card[] {
    const config: LevelConfig = LEVELS[Math.min(level, LEVELS.length - 1)]
    const fractionPairs = generateFractionPairs(level)
    const cards: Card[] = []

    fractionPairs.forEach((pair, index) => {
        const pairId = `pair-${index}`

        // Decide card types
        const card1Type: Card['type'] = 'numeric'
        let card2Type: Card['type'] = 'numeric'

        // Randomly assign visual, decimal or percentage based on level config
        if (config.includePercentage && Math.random() < 0.2) {
            card2Type = 'percentage'
        } else if (config.includeDecimal && Math.random() < 0.3) {
            card2Type = 'decimal'
        } else if (config.includeVisual && Math.random() < 0.5) {
            card2Type = 'visual'
        }

        // Card 1: Base fraction (always numeric)
        cards.push({
            id: generateId(),
            pairId,
            type: card1Type,
            numerator: pair.base[0],
            denominator: pair.base[1],
            isFlipped: false,
            isMatched: false
        })

        // Card 2: Equivalent fraction (may be visual, decimal, percentage)
        cards.push({
            id: generateId(),
            pairId,
            type: card2Type,
            numerator: pair.equivalent[0],
            denominator: pair.equivalent[1],
            isFlipped: false,
            isMatched: false
        })
    })

    // Shuffle cards
    return shuffleArray(cards)
}

/**
 * Fisher-Yates shuffle
 */
export function shuffleArray<T>(array: T[]): T[] {
    const result = [...array]
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
            ;[result[i], result[j]] = [result[j], result[i]]
    }
    return result
}

/**
 * Calculate star rating based on moves
 */
export function calculateStars(moves: number, pairs: number): 0 | 1 | 2 | 3 {
    const optimal = pairs // Minimum moves = number of pairs
    const ratio = moves / optimal

    if (ratio <= 1.5) return 3 // Excellent
    if (ratio <= 2.0) return 2 // Good
    if (ratio <= 3.0) return 1 // Fair
    return 0 // Can do better
}

/**
 * Calculate score based on time and moves
 */
export function calculateScore(
    moves: number,
    pairs: number,
    timeSeconds: number,
    timeBonus: number
): number {
    const baseScore = pairs * 100
    const movesPenalty = Math.max(0, (moves - pairs) * 10)
    const timeBonusPoints = Math.max(0, timeBonus - timeSeconds) * 2

    return Math.max(0, baseScore - movesPenalty + timeBonusPoints)
}

/**
 * Format time as MM:SS
 */
export function formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}
