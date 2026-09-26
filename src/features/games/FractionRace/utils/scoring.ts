import { SCORE_CONFIG, type ScoreBreakdown } from '../types'

export interface ScoreResult {
    combo: number
    turboActive: boolean
    breakdown: ScoreBreakdown
}

export function calculateScoreResult(
    previousCombo: number,
    isCorrect: boolean,
    isFast: boolean
): ScoreResult {
    if (!isCorrect) {
        return {
            combo: 0,
            turboActive: false,
            breakdown: {
                basePoints: 0,
                speedBonus: 0,
                comboBonus: 0,
                turboBonus: 0,
                total: 0,
                comboReset: previousCombo > 0
            }
        }
    }

    const combo = previousCombo + 1
    const turboActive = combo >= SCORE_CONFIG.turboThreshold
    const basePoints = SCORE_CONFIG.basePoints
    const speedBonus = isFast ? SCORE_CONFIG.speedBonus : 0
    const comboBonus = Math.max(0, combo - 1) * SCORE_CONFIG.comboMultiplier
    const turboBonus = turboActive ? SCORE_CONFIG.turboBonus : 0

    return {
        combo,
        turboActive,
        breakdown: {
            basePoints,
            speedBonus,
            comboBonus,
            turboBonus,
            total: basePoints + speedBonus + comboBonus + turboBonus,
            comboReset: false
        }
    }
}
