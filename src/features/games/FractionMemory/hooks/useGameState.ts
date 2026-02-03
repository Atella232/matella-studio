import { useState, useCallback, useRef, useEffect } from 'react'
import type { GameState } from '../types'
import { LEVELS } from '../types'
import { createCards, areEquivalent, calculateScore, calculateStars } from '../utils/fractions'

const FLIP_DELAY = 1000 // Time to show mismatched cards

const INITIAL_STATE: GameState = {
    cards: [],
    flippedCards: [],
    matchedPairs: [],
    moves: 0,
    startTime: null,
    endTime: null,
    level: 0,
    isGameOver: false,
    isPaused: false,
    showMismatchFeedback: false,
    mismatchCards: null
}

export function useGameState() {
    const [state, setState] = useState<GameState>(INITIAL_STATE)
    const flipTimeoutRef = useRef<number | null>(null)
    const timerRef = useRef<number | null>(null)
    const [elapsedTime, setElapsedTime] = useState(0)

    // Timer effect
    useEffect(() => {
        if (state.startTime && !state.isGameOver && !state.isPaused) {
            timerRef.current = window.setInterval(() => {
                setElapsedTime(Math.floor((Date.now() - state.startTime!) / 1000))
            }, 1000)
        }

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current)
            }
        }
    }, [state.startTime, state.isGameOver, state.isPaused])

    const startGame = useCallback((level: number = 0) => {
        // Clear any pending timeouts
        if (flipTimeoutRef.current) {
            clearTimeout(flipTimeoutRef.current)
        }
        if (timerRef.current) {
            clearInterval(timerRef.current)
        }

        const cards = createCards(level)
        setElapsedTime(0)

        setState({
            ...INITIAL_STATE,
            level,
            cards,
            startTime: Date.now()
        })
    }, [])

    const flipCard = useCallback((cardId: string) => {
        setState(prev => {
            // Ignore if game is over, card already matched, or already flipped
            if (prev.isGameOver || prev.showMismatchFeedback) return prev

            const card = prev.cards.find(c => c.id === cardId)
            if (!card || card.isMatched || prev.flippedCards.includes(cardId)) return prev

            // Can only flip 2 cards at a time
            if (prev.flippedCards.length >= 2) return prev

            const newFlippedCards = [...prev.flippedCards, cardId]

            // Update card to flipped
            const newCards = prev.cards.map(c =>
                c.id === cardId ? { ...c, isFlipped: true } : c
            )

            // If we have 2 cards flipped, check for match
            if (newFlippedCards.length === 2) {
                const [id1, id2] = newFlippedCards
                const card1 = newCards.find(c => c.id === id1)!
                const card2 = newCards.find(c => c.id === id2)!

                const isMatch = areEquivalent(
                    card1.numerator, card1.denominator,
                    card2.numerator, card2.denominator
                )

                if (isMatch) {
                    // Mark as matched
                    const matchedCards = newCards.map(c =>
                        c.id === id1 || c.id === id2 ? { ...c, isMatched: true } : c
                    )
                    const newMatchedPairs = [...prev.matchedPairs, card1.pairId]

                    // Check if game is over
                    const config = LEVELS[prev.level]
                    const isGameOver = newMatchedPairs.length >= config.pairs

                    return {
                        ...prev,
                        cards: matchedCards,
                        flippedCards: [],
                        matchedPairs: newMatchedPairs,
                        moves: prev.moves + 1,
                        isGameOver,
                        endTime: isGameOver ? Date.now() : null
                    }
                } else {
                    // Show mismatch feedback and flip back after delay
                    flipTimeoutRef.current = window.setTimeout(() => {
                        setState(s => ({
                            ...s,
                            cards: s.cards.map(c =>
                                c.id === id1 || c.id === id2 ? { ...c, isFlipped: false } : c
                            ),
                            flippedCards: [],
                            showMismatchFeedback: false,
                            mismatchCards: null
                        }))
                    }, FLIP_DELAY)

                    return {
                        ...prev,
                        cards: newCards,
                        flippedCards: newFlippedCards,
                        moves: prev.moves + 1,
                        showMismatchFeedback: true,
                        mismatchCards: [card1, card2]
                    }
                }
            }

            return {
                ...prev,
                cards: newCards,
                flippedCards: newFlippedCards
            }
        })
    }, [])

    const resetGame = useCallback(() => {
        if (flipTimeoutRef.current) {
            clearTimeout(flipTimeoutRef.current)
        }
        if (timerRef.current) {
            clearInterval(timerRef.current)
        }
        setElapsedTime(0)
        setState(INITIAL_STATE)
    }, [])

    const pauseGame = useCallback(() => {
        setState(prev => ({ ...prev, isPaused: true }))
    }, [])

    const resumeGame = useCallback(() => {
        setState(prev => ({ ...prev, isPaused: false }))
    }, [])

    // Calculate derived values
    const config = LEVELS[state.level]
    const score = state.isGameOver
        ? calculateScore(state.moves, config.pairs, elapsedTime, config.timeBonus)
        : 0
    const stars = state.isGameOver
        ? calculateStars(state.moves, config.pairs)
        : 0

    return {
        state,
        elapsedTime,
        score,
        stars,
        startGame,
        flipCard,
        resetGame,
        pauseGame,
        resumeGame
    }
}
