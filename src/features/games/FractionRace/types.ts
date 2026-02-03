// Types for Fraction Race Game

export type GameMode = 'addSub' | 'mulDiv' | 'powers' | 'combined'
export type Operator = '+' | '-' | '×' | '÷' | '^'

export interface Fraction {
    numerator: number
    denominator: number
    isNegative?: boolean
}

export interface MixedNumber extends Fraction {
    whole: number
}

export type ExpressionNode =
    | { type: 'fraction', value: Fraction | MixedNumber }
    | { type: 'number', value: number }
    | { type: 'operation', operator: Operator, left: ExpressionNode, right: ExpressionNode, wrapped?: boolean }

export interface FractionOperation {
    left: Fraction | MixedNumber
    right: Fraction | MixedNumber | number  // number for exponents in powers mode
    operator: Operator
    result: Fraction
    rawResult: Fraction  // Unsimplified result for easy level
    simplifiedResult: Fraction
    isMixed: boolean
    displayTree?: ExpressionNode
}

export interface AnswerOption {
    fraction: Fraction
    isCorrect: boolean
    id: string
}

export interface RacerState {
    id: string
    name: string
    avatar: string
    color: string
    position: number  // 0-100 percentage of track
    isPlayer: boolean
    speed: number     // Current speed multiplier
    hasTurbo: boolean
    speedFactor: number  // Individual speed factor for differentiation
    finishTime: number | null  // Timestamp when racer crossed finish line
    raceLuck: number  // Random luck factor assigned at race start (0.7-1.3)
}

export interface GameState {
    phase: 'menu' | 'countdown' | 'racing' | 'finished'
    currentQuestion: FractionOperation | null
    answerOptions: AnswerOption[]
    racers: RacerState[]
    questionNumber: number
    totalQuestions: number
    level: number
    combo: number
    score: number
    correctAnswers: number
    wrongAnswers: FractionOperation[]
    startTime: number | null
    questionStartTime: number | null
    elapsedTime: number
    lastAnswerCorrect: boolean | null
    showFeedback: boolean
    turboActive: boolean
}

export interface LevelConfig {
    id: string           // Unique level identifier
    name: string         // easy, medium, hard
    gameMode: GameMode
    questionsCount: number
    operationType: 'addition' | 'subtraction' | 'mixed' | 'multiplication' | 'division' | 'mulDivMixed' | 'power' | 'combined'
    sameDenominator: boolean
    includeMixed: boolean
    maxDenominator: number
    maxExponent?: number  // For powers mode
    botSpeed: number  // Base speed for bot racers
}

// Game mode configurations
export const GAME_MODES: { id: GameMode; icon: string }[] = [
    { id: 'addSub', icon: '±' },
    { id: 'mulDiv', icon: '×÷' },
    { id: 'powers', icon: 'xⁿ' },
    { id: 'combined', icon: '(…)' }
]

export const LEVELS: LevelConfig[] = [
    // Addition/Subtraction Mode (original)
    {
        id: 'addSub-easy',
        name: 'easy',
        gameMode: 'addSub',
        questionsCount: 10,
        operationType: 'mixed',
        sameDenominator: true,
        includeMixed: false,
        maxDenominator: 8,
        botSpeed: 0.4
    },
    {
        id: 'addSub-medium',
        name: 'medium',
        gameMode: 'addSub',
        questionsCount: 10,
        operationType: 'mixed',
        sameDenominator: false,
        includeMixed: false,
        maxDenominator: 12,
        botSpeed: 0.55
    },
    {
        id: 'addSub-hard',
        name: 'hard',
        gameMode: 'addSub',
        questionsCount: 10,
        operationType: 'mixed',
        sameDenominator: false,
        includeMixed: true,
        maxDenominator: 12,
        botSpeed: 0.7
    },
    // Multiplication/Division Mode
    {
        id: 'mulDiv-easy',
        name: 'easy',
        gameMode: 'mulDiv',
        questionsCount: 10,
        operationType: 'multiplication',
        sameDenominator: false,
        includeMixed: false,
        maxDenominator: 6,
        botSpeed: 0.4
    },
    {
        id: 'mulDiv-medium',
        name: 'medium',
        gameMode: 'mulDiv',
        questionsCount: 10,
        operationType: 'mulDivMixed',
        sameDenominator: false,
        includeMixed: false,
        maxDenominator: 8,
        botSpeed: 0.55
    },
    {
        id: 'mulDiv-hard',
        name: 'hard',
        gameMode: 'mulDiv',
        questionsCount: 10,
        operationType: 'mulDivMixed',
        sameDenominator: false,
        includeMixed: true,
        maxDenominator: 10,
        botSpeed: 0.7
    },
    // Powers Mode
    {
        id: 'powers-easy',
        name: 'easy',
        gameMode: 'powers',
        questionsCount: 10,
        operationType: 'power',
        sameDenominator: false,
        includeMixed: false,
        maxDenominator: 5,
        maxExponent: 2,
        botSpeed: 0.4
    },
    {
        id: 'powers-medium',
        name: 'medium',
        gameMode: 'powers',
        questionsCount: 10,
        operationType: 'power',
        sameDenominator: false,
        includeMixed: false,
        maxDenominator: 6,
        maxExponent: 3,
        botSpeed: 0.55
    },
    {
        id: 'powers-hard',
        name: 'hard',
        gameMode: 'powers',
        questionsCount: 10,
        operationType: 'power',
        sameDenominator: false,
        includeMixed: false,
        maxDenominator: 8,
        maxExponent: 3,
        botSpeed: 0.7
    },
    // Combined Mode
    {
        id: 'combined-easy',
        name: 'easy',
        gameMode: 'combined',
        questionsCount: 10,
        operationType: 'combined',
        sameDenominator: false,
        includeMixed: false,
        maxDenominator: 6,
        botSpeed: 0.4
    },
    {
        id: 'combined-medium',
        name: 'medium',
        gameMode: 'combined',
        questionsCount: 10,
        operationType: 'combined',
        sameDenominator: false,
        includeMixed: false,
        maxDenominator: 8,
        botSpeed: 0.55
    },
    {
        id: 'combined-hard',
        name: 'hard',
        gameMode: 'combined',
        questionsCount: 10,
        operationType: 'combined',
        sameDenominator: false,
        includeMixed: false,
        maxDenominator: 10,
        maxExponent: 2,
        botSpeed: 0.7
    }
]

export const RACERS: Omit<RacerState, 'position' | 'speed' | 'hasTurbo' | 'finishTime' | 'raceLuck'>[] = [
    { id: 'player', name: 'Tú', avatar: '🏎️', color: '#4ade80', isPlayer: true, speedFactor: 1.0 },
    { id: 'bot1', name: 'Max', avatar: '🚗', color: '#f87171', isPlayer: false, speedFactor: 1.1 },  // Fastest bot
    { id: 'bot2', name: 'Luna', avatar: '🚙', color: '#60a5fa', isPlayer: false, speedFactor: 0.9 }, // Medium bot
    { id: 'bot3', name: 'Leo', avatar: '🏍️', color: '#fbbf24', isPlayer: false, speedFactor: 0.7 }  // Slowest bot
]

export const SCORE_CONFIG = {
    basePoints: 10,
    speedBonus: 5,      // Bonus for fast answers (< 3s)
    comboMultiplier: 2, // Extra points per combo level
    turboThreshold: 3   // Consecutive correct answers for turbo
}
