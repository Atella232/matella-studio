// Types for Fraction Race Game

export type GameMode = 'addSub' | 'mulDiv' | 'powers' | 'combined'
export type Operator = '+' | '-' | '×' | '÷' | '^'
export type RaceFormat = 'classic' | 'sprint' | 'perfect'
export type OperationFilter = 'default' | 'addition' | 'subtraction' | 'multiplication' | 'division'
export type FinishReason = 'completed' | 'time' | 'mistake'
export type RacerPersonality = 'player' | 'sprinter' | 'steady' | 'comeback'
export type ErrorCategory = 'sign' | 'simplification' | 'commonDenominator' | 'multiplication' | 'inverse' | 'power' | 'operationOrder' | 'calculation'

export interface RaceSettings {
    format: RaceFormat
    questionCount: 5 | 10 | 20
    operationFilter: OperationFilter
    includeMixed: boolean
}

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

export interface AttemptRecord {
    operation: FractionOperation
    selectedAnswer: Fraction
    correctAnswer: Fraction
    isCorrect: boolean
    responseTimeMs: number
}

export interface ScoreBreakdown {
    basePoints: number
    speedBonus: number
    comboBonus: number
    turboBonus: number
    total: number
    comboReset: boolean
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
    personality: RacerPersonality
    consistency: number
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
    maxCombo: number
    score: number
    correctAnswers: number
    attempts: AttemptRecord[]
    startTime: number | null
    questionStartTime: number | null
    elapsedTime: number
    lastAnswerCorrect: boolean | null
    showFeedback: boolean
    turboActive: boolean
    lastScoreBreakdown: ScoreBreakdown | null
    selectedAnswerId: string | null
    questionQueue: FractionOperation[]
    reviewMode: boolean
    settings: RaceSettings
    finishReason: FinishReason | null
}

export interface RaceRecord {
    racesPlayed: number
    wins: number
    perfectRaces: number
    bestScore: number
    bestTime: number | null
    bestAccuracy: number
}

export interface RecordAchievements {
    firstRace: boolean
    firstWin: boolean
    newBestScore: boolean
    newBestTime: boolean
    newBestAccuracy: boolean
    perfectRace: boolean
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
    botSpeed: number  // Relative rival difficulty
    fastAnswerMs: number
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
        botSpeed: 0.4,
        fastAnswerMs: 4000
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
        botSpeed: 0.55,
        fastAnswerMs: 6000
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
        botSpeed: 0.7,
        fastAnswerMs: 8000
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
        botSpeed: 0.4,
        fastAnswerMs: 5000
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
        botSpeed: 0.55,
        fastAnswerMs: 7000
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
        botSpeed: 0.7,
        fastAnswerMs: 9000
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
        botSpeed: 0.4,
        fastAnswerMs: 5000
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
        botSpeed: 0.55,
        fastAnswerMs: 7000
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
        botSpeed: 0.7,
        fastAnswerMs: 9000
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
        botSpeed: 0.4,
        fastAnswerMs: 7000
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
        botSpeed: 0.55,
        fastAnswerMs: 10000
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
        botSpeed: 0.7,
        fastAnswerMs: 13000
    }
]

export const RACERS: Omit<RacerState, 'position' | 'speed' | 'hasTurbo' | 'finishTime' | 'raceLuck'>[] = [
    { id: 'player', name: 'Tú', avatar: '🏎️', color: '#267b53', isPlayer: true, speedFactor: 1.0, personality: 'player', consistency: 1 },
    { id: 'bot1', name: 'Max', avatar: '🚗', color: '#b3261e', isPlayer: false, speedFactor: 1.04, personality: 'sprinter', consistency: 0.72 },
    { id: 'bot2', name: 'Luna', avatar: '🚙', color: '#2f6fdb', isPlayer: false, speedFactor: 0.96, personality: 'steady', consistency: 0.94 },
    { id: 'bot3', name: 'Leo', avatar: '🏍️', color: '#e0a100', isPlayer: false, speedFactor: 0.9, personality: 'comeback', consistency: 0.8 }
]

export const DEFAULT_RACE_SETTINGS: RaceSettings = {
    format: 'classic',
    questionCount: 10,
    operationFilter: 'default',
    includeMixed: false
}

export const SCORE_CONFIG = {
    basePoints: 10,
    speedBonus: 5,
    comboMultiplier: 2, // Extra points for every previous answer in the streak
    turboThreshold: 3,  // Consecutive correct answers needed to activate turbo
    turboBonus: 5       // Extra points for every correct answer while turbo is active
}
