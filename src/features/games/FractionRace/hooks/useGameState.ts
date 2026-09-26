import { useState, useCallback, useEffect, useRef } from 'react'
import type { FinishReason, FractionOperation, GameState, RacerState, RaceSettings } from '../types'
import { DEFAULT_RACE_SETTINGS, LEVELS, RACERS } from '../types'
import { generateOperation, generateAnswerOptions } from '../utils/fractions'
import { calculateScoreResult } from '../utils/scoring'
import { calculateRivalMovement } from '../utils/rivals'
import {
    SPRINT_DURATION_SECONDS,
    getRaceQuestionLimit,
    perfectRaceFailed,
    sprintTimeExpired
} from '../utils/raceRules'

const createInitialRacers = (): RacerState[] => RACERS.map(racer => ({
    ...racer,
    position: 0,
    speed: 0,
    hasTurbo: false,
    finishTime: null,
    raceLuck: 0.92 + Math.random() * 0.16
}))

const createInitialState = (): GameState => ({
    phase: 'menu',
    currentQuestion: null,
    answerOptions: [],
    racers: createInitialRacers(),
    questionNumber: 0,
    totalQuestions: 10,
    level: 0,
    combo: 0,
    maxCombo: 0,
    score: 0,
    correctAnswers: 0,
    attempts: [],
    startTime: null,
    questionStartTime: null,
    elapsedTime: 0,
    lastAnswerCorrect: null,
    showFeedback: false,
    turboActive: false,
    lastScoreBreakdown: null,
    selectedAnswerId: null,
    questionQueue: [],
    reviewMode: false,
    settings: DEFAULT_RACE_SETTINGS,
    finishReason: null
})

function normalizeRacersAtFinish(racers: RacerState[], now: number): RacerState[] {
    const leadingPosition = Math.max(...racers.map(racer => racer.position))
    if (leadingPosition <= 0 || leadingPosition >= 100) return racers

    return racers.map(racer => {
        const normalizedPosition = Math.min(100, racer.position / leadingPosition * 100)
        return {
            ...racer,
            position: normalizedPosition,
            finishTime: normalizedPosition >= 100 && racer.finishTime === null
                ? now
                : racer.finishTime
        }
    })
}

function finishRace(previous: GameState, reason: FinishReason, elapsedTime?: number): GameState {
    const now = Date.now()
    return {
        ...previous,
        phase: 'finished',
        finishReason: reason,
        elapsedTime: elapsedTime ?? (previous.startTime
            ? Math.floor((now - previous.startTime) / 1000)
            : previous.elapsedTime),
        showFeedback: false,
        turboActive: false,
        selectedAnswerId: null,
        racers: normalizeRacersAtFinish(previous.racers, now)
    }
}

export function useGameState() {
    const [state, setState] = useState<GameState>(createInitialState)
    const timerRef = useRef<number | null>(null)

    useEffect(() => {
        if (state.phase === 'racing' && state.startTime) {
            timerRef.current = window.setInterval(() => {
                setState(previous => {
                    if (previous.phase !== 'racing') return previous
                    const elapsedTime = Math.floor((Date.now() - (previous.startTime || Date.now())) / 1000)
                    if (sprintTimeExpired(previous.settings, elapsedTime)) {
                        return finishRace(previous, 'time', SPRINT_DURATION_SECONDS)
                    }
                    return { ...previous, elapsedTime }
                })
            }, 1000)
        }

        return () => {
            if (timerRef.current !== null) {
                clearInterval(timerRef.current)
                timerRef.current = null
            }
        }
    }, [state.phase, state.startTime])

    const prepareRace = useCallback((
        level: number,
        questionQueue: FractionOperation[] = [],
        settings: RaceSettings = DEFAULT_RACE_SETTINGS
    ) => {
        const safeLevel = Math.max(0, Math.min(level, LEVELS.length - 1))
        const raceSettings: RaceSettings = questionQueue.length > 0
            ? { ...settings, format: 'classic' }
            : settings
        const firstQuestion = questionQueue[0] ?? generateOperation(safeLevel, raceSettings)
        const totalQuestions = getRaceQuestionLimit(raceSettings, questionQueue.length)

        setState({
            ...createInitialState(),
            phase: 'countdown',
            level: safeLevel,
            totalQuestions,
            currentQuestion: firstQuestion,
            answerOptions: generateAnswerOptions(firstQuestion),
            questionQueue,
            reviewMode: questionQueue.length > 0,
            settings: raceSettings
        })
    }, [])

    const startGame = useCallback((
        level: number = 0,
        settings: RaceSettings = DEFAULT_RACE_SETTINGS
    ) => {
        prepareRace(level, [], settings)
    }, [prepareRace])

    const startErrorReview = useCallback((
        operations: FractionOperation[],
        level: number,
        settings: RaceSettings = DEFAULT_RACE_SETTINGS
    ) => {
        if (operations.length > 0) prepareRace(level, operations, settings)
    }, [prepareRace])

    const beginRace = useCallback(() => {
        setState(previous => {
            if (previous.phase !== 'countdown') return previous

            const now = Date.now()
            return {
                ...previous,
                phase: 'racing',
                startTime: now,
                questionStartTime: now,
                questionNumber: 1
            }
        })
    }, [])

    const nextQuestion = useCallback(() => {
        setState(previous => {
            if (previous.phase !== 'racing' || !previous.showFeedback) return previous

            const stoppedByMistake = perfectRaceFailed(previous.settings, previous.lastAnswerCorrect)
            const isLastQuestion = previous.questionNumber >= previous.totalQuestions
            if (stoppedByMistake) return finishRace(previous, 'mistake')
            if (isLastQuestion) return finishRace(previous, 'completed')

            const nextQuestionIndex = previous.questionNumber
            const nextOperation = previous.questionQueue[nextQuestionIndex]
                ?? generateOperation(previous.level, previous.settings)

            return {
                ...previous,
                questionNumber: previous.questionNumber + 1,
                currentQuestion: nextOperation,
                answerOptions: generateAnswerOptions(nextOperation),
                questionStartTime: Date.now(),
                showFeedback: false,
                lastAnswerCorrect: null,
                lastScoreBreakdown: null,
                selectedAnswerId: null
            }
        })
    }, [])

    const answerQuestion = useCallback((answerId: string) => {
        setState(previous => {
            if (previous.phase !== 'racing' || previous.showFeedback || !previous.currentQuestion) {
                return previous
            }

            const selectedAnswer = previous.answerOptions.find(option => option.id === answerId)
            const correctAnswer = previous.answerOptions.find(option => option.isCorrect)
            if (!selectedAnswer || !correctAnswer) return previous

            const config = LEVELS[previous.level]
            const responseTime = Date.now() - (previous.questionStartTime || Date.now())
            const isFast = responseTime <= config.fastAnswerMs
            const isCorrect = selectedAnswer.isCorrect

            const scoreResult = calculateScoreResult(previous.combo, isCorrect, isFast)
            const newScore = previous.score + scoreResult.breakdown.total
            const newCombo = scoreResult.combo
            const newTurbo = scoreResult.turboActive

            const now = Date.now()
            const baseMovement = 100 / previous.totalQuestions
            const difficultyFactor = 0.8 + config.botSpeed * 0.5
            const raceProgress = previous.questionNumber / previous.totalQuestions
            let newRacers = previous.racers.map(racer => {
                const movement = racer.isPlayer
                    ? (isCorrect ? baseMovement : 0)
                    : calculateRivalMovement(
                        racer,
                        baseMovement,
                        raceProgress,
                        difficultyFactor
                    )
                const newPosition = Math.min(100, racer.position + movement)
                const finishTime = newPosition >= 100 && racer.finishTime === null
                    ? now
                    : racer.finishTime

                return {
                    ...racer,
                    position: newPosition,
                    hasTurbo: racer.isPlayer ? newTurbo : false,
                    finishTime
                }
            })

            const isFinalAnswer = previous.questionNumber >= previous.totalQuestions
            const leadingPosition = Math.max(...newRacers.map(racer => racer.position))
            if (isFinalAnswer && leadingPosition > 0 && leadingPosition < 100) {
                newRacers = newRacers.map(racer => {
                    const normalizedPosition = Math.min(100, racer.position / leadingPosition * 100)
                    return {
                        ...racer,
                        position: normalizedPosition,
                        finishTime: normalizedPosition >= 100 && racer.finishTime === null
                            ? now
                            : racer.finishTime
                    }
                })
            }

            return {
                ...previous,
                score: newScore,
                combo: newCombo,
                maxCombo: Math.max(previous.maxCombo, newCombo),
                correctAnswers: isCorrect
                    ? previous.correctAnswers + 1
                    : previous.correctAnswers,
                attempts: [
                    ...previous.attempts,
                    {
                        operation: previous.currentQuestion,
                        selectedAnswer: selectedAnswer.fraction,
                        correctAnswer: correctAnswer.fraction,
                        isCorrect,
                        responseTimeMs: responseTime
                    }
                ],
                lastAnswerCorrect: isCorrect,
                showFeedback: true,
                turboActive: newTurbo,
                lastScoreBreakdown: scoreResult.breakdown,
                selectedAnswerId: selectedAnswer.id,
                racers: newRacers
            }
        })
    }, [])

    const resetGame = useCallback(() => {
        if (timerRef.current !== null) {
            clearInterval(timerRef.current)
            timerRef.current = null
        }
        setState(createInitialState())
    }, [])

    const getPlayerRank = useCallback((): number => {
        const sorted = [...state.racers].sort((a, b) => b.position - a.position)
        return sorted.findIndex(racer => racer.isPlayer) + 1
    }, [state.racers])

    return {
        state,
        startGame,
        startErrorReview,
        beginRace,
        answerQuestion,
        nextQuestion,
        resetGame,
        getPlayerRank
    }
}
