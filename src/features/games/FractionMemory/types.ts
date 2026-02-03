// Types for Fraction Memory Game

export interface Card {
    id: string
    pairId: string
    type: 'numeric' | 'visual' | 'decimal' | 'percentage'
    numerator: number
    denominator: number
    isFlipped: boolean
    isMatched: boolean
}

export interface GameState {
    cards: Card[]
    flippedCards: string[]
    matchedPairs: string[]
    moves: number
    startTime: number | null
    endTime: number | null
    level: number
    isGameOver: boolean
    isPaused: boolean
    showMismatchFeedback: boolean
    mismatchCards: [Card, Card] | null
}

export interface LevelConfig {
    name: string
    pairs: number
    gridCols: number
    includeVisual: boolean
    includeDecimal: boolean
    includePercentage: boolean
    denominators: number[]
    timeBonus: number
}

// Adjusted levels with more denominators to ensure enough unique fractions
export const LEVELS: LevelConfig[] = [
    {
        name: 'easy',
        pairs: 6,
        gridCols: 4,
        includeVisual: true,
        includeDecimal: false,
        includePercentage: false,
        denominators: [2, 3, 4, 5, 6], // More denominators = more unique fractions
        timeBonus: 120
    },
    {
        name: 'medium',
        pairs: 8,
        gridCols: 4,
        includeVisual: true,
        includeDecimal: false,
        includePercentage: false,
        denominators: [2, 3, 4, 5, 6, 8],
        timeBonus: 180
    },
    {
        name: 'hard',
        pairs: 10,
        gridCols: 5,
        includeVisual: true,
        includeDecimal: true,
        includePercentage: false,
        denominators: [2, 3, 4, 5, 6, 8, 10],
        timeBonus: 240
    },
    {
        name: 'expert',
        pairs: 12,
        gridCols: 6,
        includeVisual: true,
        includeDecimal: true,
        includePercentage: true,
        denominators: [2, 3, 4, 5, 6, 8, 10, 12],
        timeBonus: 300
    }
]

export interface MatchResult {
    pairId: string
    card1: Card
    card2: Card
    isMatch: boolean
}

export type StarRating = 0 | 1 | 2 | 3
