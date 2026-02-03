// Utility functions for fractions

import type { FractionOrder, LevelConfig } from '../types'
import { LEVELS } from '../types'

/**
 * Generates a random fraction order based on level configuration
 */
export function generateFraction(level: number): FractionOrder {
    const config: LevelConfig = LEVELS[Math.min(level, LEVELS.length - 1)]
    const challenge = config.challenges[Math.floor(Math.random() * config.challenges.length)]

    const [totalSlices, numerator, denominator] = challenge
    // Calculate target slices: (numerator / denominator) * totalSlices
    const targetSlices = Math.round((numerator / denominator) * totalSlices)

    return {
        numerator,
        denominator,
        totalSlices,
        targetSlices
    }
}

/**
 * Check if selected slices match the requested fraction
 */
export function validateFraction(
    order: FractionOrder,
    selectedSlices: number[]
): boolean {
    return selectedSlices.length === order.targetSlices
}

/**
 * Format fraction as string
 */
export function formatFraction(fraction: FractionOrder): string {
    return `${fraction.numerator}/${fraction.denominator}`
}

/**
 * Get explanation text for a fraction
 */
export function getFractionExplanation(fraction: FractionOrder, t: (key: string, options?: object) => string): string {
    return t('games.pizzaFractions.explanation', {
        num: fraction.numerator,
        den: fraction.denominator,
        total: fraction.totalSlices,
        target: fraction.targetSlices
    })
}

/**
 * Calculate score for a correct answer
 */
export function calculateScore(attempts: number, combo: number): number {
    const baseScore = attempts === 1 ? 10 : 5
    const comboBonus = combo * 2
    return baseScore + comboBonus
}

/**
 * Get a random customer
 */
export function getRandomCustomer() {
    const customers = ['👧', '👦', '👩', '👨', '👵', '👴', '🧑', '👱‍♀️', '👱', '🧔']
    return customers[Math.floor(Math.random() * customers.length)]
}

/**
 * Generate SVG path for a pizza slice
 */
export function getSlicePath(
    index: number,
    total: number,
    radius: number,
    centerX: number,
    centerY: number
): string {
    const anglePerSlice = (2 * Math.PI) / total
    const startAngle = index * anglePerSlice - Math.PI / 2 // Start from top
    const endAngle = startAngle + anglePerSlice

    const x1 = centerX + radius * Math.cos(startAngle)
    const y1 = centerY + radius * Math.sin(startAngle)
    const x2 = centerX + radius * Math.cos(endAngle)
    const y2 = centerY + radius * Math.sin(endAngle)

    const largeArcFlag = anglePerSlice > Math.PI ? 1 : 0

    return `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`
}
