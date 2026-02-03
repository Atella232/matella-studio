// Types for Pizza Fractions Game

export interface FractionOrder {
    numerator: number
    denominator: number
    totalSlices: number // How many slices the pizza is divided into
    targetSlices: number // How many slices to select
}

export interface Customer {
    id: string
    name: string
    avatar: string
    mood: 'neutral' | 'happy' | 'confused' | 'celebrating'
}

export interface GameState {
    currentOrder: FractionOrder | null
    selectedSlices: number[]
    score: number
    ordersCompleted: number
    ordersTotal: number
    level: number
    combo: number
    attempts: number
    isGameOver: boolean
    showFeedback: boolean
    feedbackType: 'correct' | 'incorrect' | null
}

export interface LevelConfig {
    name: string
    ordersCount: number
    // Each challenge: [totalSlices, numerator, denominator]
    // Player must select (numerator/denominator * totalSlices) slices
    challenges: Array<[number, number, number]>
}

// New level configuration with more challenging exercises
export const LEVELS: LevelConfig[] = [
    {
        name: 'easy', // Correspondencia Directa
        ordersCount: 8,
        challenges: [
            [2, 1, 2],
            [3, 1, 3], [3, 2, 3],
            [4, 1, 4], [4, 2, 4], [4, 3, 4],
            [6, 1, 6], [6, 5, 6]
        ]
    },
    {
        name: 'medium', // Equivalencias Simples y Unitarias
        ordersCount: 10,
        challenges: [
            [4, 1, 2], // 1/2 de 4 -> 2
            [6, 1, 2], // 1/2 de 6 -> 3
            [6, 1, 3], // 1/3 de 6 -> 2
            [8, 1, 2], // 1/2 de 8 -> 4
            [8, 1, 4], // 1/4 de 8 -> 2
            [10, 1, 2], // 1/2 de 10 -> 5
            [10, 1, 5]  // 1/5 de 10 -> 2
        ]
    },
    {
        name: 'hard', // Equivalencias Complejas (Operador)
        ordersCount: 10,
        challenges: [
            [6, 2, 3], // 2/3 de 6 -> 4
            [8, 3, 4], // 3/4 de 8 -> 6
            [8, 3, 8], [8, 5, 8], [8, 7, 8], // Propias de 8
            [10, 2, 5], [10, 3, 5], [10, 4, 5], // d/5 de 10
            [12, 1, 2], [12, 1, 3], [12, 1, 4], [12, 1, 6], // Unitarias de 12
            [12, 2, 3], [12, 3, 4], [12, 5, 6] // Complejas de 12
        ]
    },
]

export const CUSTOMERS: Customer[] = [
    { id: '1', name: 'Ana', avatar: '👧', mood: 'neutral' },
    { id: '2', name: 'Carlos', avatar: '👦', mood: 'neutral' },
    { id: '3', name: 'María', avatar: '👩', mood: 'neutral' },
    { id: '4', name: 'Pedro', avatar: '👨', mood: 'neutral' },
    { id: '5', name: 'Lucía', avatar: '👵', mood: 'neutral' },
    { id: '6', name: 'Miguel', avatar: '👴', mood: 'neutral' }
]

export const SCORE_CONFIG = {
    firstAttempt: 10,
    secondAttempt: 5,
    comboBonus: 2
}
