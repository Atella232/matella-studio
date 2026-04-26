import { useState, useCallback, useEffect, useRef } from 'react'
import type { GameState, RacerState } from '../types'
import { LEVELS, RACERS, SCORE_CONFIG } from '../types'
import { generateOperation, generateAnswerOptions } from '../utils/fractions'

const createInitialRacers = (): RacerState[] => {
    return RACERS.map(r => ({
        ...r,
        position: 0,
        speed: 0,
        hasTurbo: false,
        finishTime: null,
        // Random luck factor (0.7 to 1.3) - assigned per race to vary outcomes
        raceLuck: 0.7 + Math.random() * 0.6
    }))
}

const INITIAL_STATE: GameState = {
    phase: 'menu',
    currentQuestion: null,
    answerOptions: [],
    racers: createInitialRacers(),
    questionNumber: 0,
    totalQuestions: 10,
    level: 0,
    combo: 0,
    score: 0,
    correctAnswers: 0,
    wrongAnswers: [],
    startTime: null,
    questionStartTime: null,
    elapsedTime: 0,
    lastAnswerCorrect: null,
    showFeedback: false,
    turboActive: false
}

export function useGameState() {
    const [state, setState] = useState<GameState>(INITIAL_STATE)
    const timerRef = useRef<number | null>(null)
    const botTimerRef = useRef<number | null>(null)

    // Timer effect
    useEffect(() => {
        if (state.phase === 'racing' && state.startTime) {
            timerRef.current = window.setInterval(() => {
                setState(prev => ({
                    ...prev,
                    elapsedTime: Math.floor((Date.now() - (prev.startTime || Date.now())) / 1000)
                }))
            }, 1000)
        }

        return () => {
            if (timerRef.current) clearInterval(timerRef.current)
        }
    }, [state.phase, state.startTime])

    // Bot movement effect
    useEffect(() => {
        if (state.phase === 'racing') {
            const config = LEVELS[state.level]
            const baseSpeed = config.botSpeed

            botTimerRef.current = window.setInterval(() => {
                setState(prev => {
                    const now = Date.now()
                    const newRacers = prev.racers.map(racer => {
                        if (racer.isPlayer) return racer

                        // Bots move based on: speedFactor * raceLuck (per-race) * randomFactor (per-tick)
                        // This creates significant variety in race outcomes
                        const tickRandom = 0.7 + Math.random() * 0.6  // 0.7-1.3 per tick
                        const movement = (baseSpeed * racer.speedFactor * racer.raceLuck * tickRandom) * 0.3
                        const newPosition = Math.min(100, racer.position + movement)

                        // Set finishTime when crossing the finish line for the first time
                        const finishTime = newPosition >= 100 && racer.finishTime === null ? now : racer.finishTime

                        return { ...racer, position: newPosition, finishTime }
                    })

                    // Check if race should end:
                    // - Player has finished, OR
                    // - 3 racers have crossed the finish line (third place is determined)
                    const player = newRacers.find(r => r.isPlayer)
                    const playerFinished = player && player.position >= 100
                    const finishedCount = newRacers.filter(r => r.position >= 100).length
                    const raceOver = playerFinished || finishedCount >= 3

                    return {
                        ...prev,
                        racers: newRacers,
                        phase: raceOver && !prev.showFeedback ? 'finished' : prev.phase
                    }
                })
            }, 200)
        }

        return () => {
            if (botTimerRef.current) clearInterval(botTimerRef.current)
        }
    }, [state.phase, state.level])

    const startGame = useCallback((level: number = 0) => {
        const config = LEVELS[Math.min(level, LEVELS.length - 1)]
        const firstQuestion = generateOperation(level)

        setState({
            ...INITIAL_STATE,
            phase: 'countdown',
            level,
            totalQuestions: config.questionsCount,
            currentQuestion: firstQuestion,
            answerOptions: generateAnswerOptions(firstQuestion, level),
            racers: createInitialRacers()
        })

        // Start racing after countdown
        setTimeout(() => {
            setState(prev => ({
                ...prev,
                phase: 'racing',
                startTime: Date.now(),
                questionStartTime: Date.now(),
                questionNumber: 1
            }))
        }, 3000)
    }, [])

    const nextQuestion = useCallback(() => {
        setState(prev => {
            // Check if race is over
            const isLastQuestion = prev.questionNumber >= prev.totalQuestions
            const playerFinished = prev.racers.find(r => r.isPlayer)?.position === 100

            if (isLastQuestion || playerFinished) {
                return {
                    ...prev,
                    phase: 'finished',
                    showFeedback: false,
                    turboActive: false
                }
            }

            // Generate next question
            const nextQ = generateOperation(prev.level)

            return {
                ...prev,
                questionNumber: prev.questionNumber + 1,
                currentQuestion: nextQ,
                answerOptions: generateAnswerOptions(nextQ, prev.level),
                questionStartTime: Date.now(),
                showFeedback: false,
                lastAnswerCorrect: null,
                turboActive: prev.combo >= SCORE_CONFIG.turboThreshold
            }
        })
    }, [])

    const answerQuestion = useCallback((answerId: string) => {
        setState(prev => {
            if (prev.showFeedback || !prev.currentQuestion) return prev

            const selectedAnswer = prev.answerOptions.find(a => a.id === answerId)
            if (!selectedAnswer) return prev

            const isCorrect = selectedAnswer.isCorrect
            const responseTime = Date.now() - (prev.questionStartTime || Date.now())
            const isFast = responseTime < 3000

            let newScore = prev.score
            let newCombo = prev.combo
            let newTurbo = prev.turboActive
            const newWrongAnswers = [...prev.wrongAnswers]

            if (isCorrect) {
                // Calculate score
                newScore += SCORE_CONFIG.basePoints
                if (isFast) newScore += SCORE_CONFIG.speedBonus
                newCombo += 1
                newScore += newCombo * SCORE_CONFIG.comboMultiplier

                // Check for turbo
                if (newCombo >= SCORE_CONFIG.turboThreshold && !newTurbo) {
                    newTurbo = true
                }
            } else {
                newCombo = 0
                newTurbo = false
                newWrongAnswers.push(prev.currentQuestion)
            }

            // Move player based on answer
            const now = Date.now()
            const newRacers = prev.racers.map(racer => {
                if (!racer.isPlayer) return racer

                let movement = 0
                if (isCorrect) {
                    const baseMove = 100 / prev.totalQuestions
                    movement = isFast ? baseMove * 1.2 : baseMove
                    if (newTurbo) movement *= 1.5
                }

                const newPosition = Math.min(100, racer.position + movement)
                const finishTime = newPosition >= 100 && racer.finishTime === null ? now : racer.finishTime

                return {
                    ...racer,
                    position: newPosition,
                    hasTurbo: newTurbo,
                    finishTime
                }
            })

            return {
                ...prev,
                score: newScore,
                combo: newCombo,
                correctAnswers: isCorrect ? prev.correctAnswers + 1 : prev.correctAnswers,
                wrongAnswers: newWrongAnswers,
                lastAnswerCorrect: isCorrect,
                showFeedback: true,
                turboActive: newTurbo,
                racers: newRacers
            }
        })

        // Auto-advance after feedback
        setTimeout(() => {
            nextQuestion()
        }, 1500)
    }, [nextQuestion])

    const resetGame = useCallback(() => {
        if (timerRef.current) clearInterval(timerRef.current)
        if (botTimerRef.current) clearInterval(botTimerRef.current)
        setState(INITIAL_STATE)
    }, [])

    // Calculate player position (rank)
    const getPlayerRank = useCallback((): number => {
        const sorted = [...state.racers].sort((a, b) => b.position - a.position)
        const playerIndex = sorted.findIndex(r => r.isPlayer)
        return playerIndex + 1
    }, [state.racers])

    return {
        state,
        startGame,
        answerQuestion,
        resetGame,
        getPlayerRank
    }
}
