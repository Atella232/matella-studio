import { useState, useCallback } from 'react'
import type { GameState } from '../types'
import { LEVELS } from '../types'
import { generateFraction, calculateScore } from '../utils/fractions'

const INITIAL_STATE: GameState = {
    currentOrder: null,
    selectedSlices: [],
    score: 0,
    ordersCompleted: 0,
    ordersTotal: 10,
    level: 0,
    combo: 0,
    attempts: 0,
    isGameOver: false,
    showFeedback: false,
    feedbackType: null
}

export function useGameState() {
    const [state, setState] = useState<GameState>(INITIAL_STATE)

    const startGame = useCallback((level: number = 0) => {
        const config = LEVELS[Math.min(level, LEVELS.length - 1)]
        const firstOrder = generateFraction(level)

        setState({
            ...INITIAL_STATE,
            level,
            ordersTotal: config.ordersCount,
            currentOrder: firstOrder
        })
    }, [])

    const selectSlice = useCallback((sliceIndex: number) => {
        setState(prev => {
            if (prev.showFeedback) return prev

            const isSelected = prev.selectedSlices.includes(sliceIndex)
            const newSelected = isSelected
                ? prev.selectedSlices.filter(i => i !== sliceIndex)
                : [...prev.selectedSlices, sliceIndex]

            return { ...prev, selectedSlices: newSelected }
        })
    }, [])

    const submitOrder = useCallback(() => {
        setState(prev => {
            if (!prev.currentOrder || prev.showFeedback) return prev

            const isCorrect = prev.selectedSlices.length === prev.currentOrder.targetSlices
            const newAttempts = prev.attempts + 1

            if (isCorrect) {
                const newCombo = prev.combo + 1
                const earnedScore = calculateScore(newAttempts, prev.combo)

                return {
                    ...prev,
                    score: prev.score + earnedScore,
                    combo: newCombo,
                    attempts: 0,
                    showFeedback: true,
                    feedbackType: 'correct'
                }
            } else {
                return {
                    ...prev,
                    attempts: newAttempts,
                    combo: 0,
                    showFeedback: true,
                    feedbackType: 'incorrect'
                }
            }
        })
    }, [])

    const nextOrder = useCallback(() => {
        setState(prev => {
            if (prev.feedbackType === 'incorrect') {
                // Allow retry
                return {
                    ...prev,
                    showFeedback: false,
                    feedbackType: null,
                    selectedSlices: []
                }
            }

            const newOrdersCompleted = prev.ordersCompleted + 1

            // Check if game is over
            if (newOrdersCompleted >= prev.ordersTotal) {
                return {
                    ...prev,
                    ordersCompleted: newOrdersCompleted,
                    isGameOver: true,
                    showFeedback: false,
                    feedbackType: null
                }
            }

            // Check if level up (every 3 consecutive correct orders)
            // We increase level if combo is a multiple of 3 (3, 6, 9...)
            const shouldLevelUp = prev.combo > 0 && prev.combo % 3 === 0
            const nextLevel = shouldLevelUp
                ? Math.min(prev.level + 1, LEVELS.length - 1)
                : prev.level

            return {
                ...prev,
                ordersCompleted: newOrdersCompleted,
                level: nextLevel,
                currentOrder: generateFraction(nextLevel),
                selectedSlices: [],
                showFeedback: false,
                feedbackType: null
            }
        })
    }, [])

    const resetGame = useCallback(() => {
        setState(INITIAL_STATE)
    }, [])

    return {
        state,
        startGame,
        selectSlice,
        submitOrder,
        nextOrder,
        resetGame
    }
}
