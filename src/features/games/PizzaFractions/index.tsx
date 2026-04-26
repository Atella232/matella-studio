import { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useGameState } from './hooks/useGameState'
import { getRandomCustomer, calculateScore } from './utils/fractions'
import { Pizza } from './components/Pizza'
import { Customer } from './components/Customer'
import { OrderBubble } from './components/OrderBubble'
import { ScoreBoard } from './components/ScoreBoard'
import { FeedbackModal } from './components/FeedbackModal'
import { LEVELS } from './types'
import './PizzaFractions.css'

export function PizzaFractions() {
    const { t } = useTranslation()
    const { state, startGame, selectSlice, submitOrder, nextOrder, resetGame } = useGameState()
    const [selectedLevel, setSelectedLevel] = useState(0)

    // Random customer for current order
    const currentCustomer = useMemo(() => ({
        avatar: getRandomCustomer(),
        mood: state.feedbackType === 'correct' ? 'celebrating' as const :
            state.feedbackType === 'incorrect' ? 'confused' as const : 'neutral' as const
    }), [state.feedbackType])

    // Calculate earned score for display
    const earnedScore = useMemo(() => {
        if (state.feedbackType === 'correct') {
            return calculateScore(state.attempts + 1, state.combo - 1)
        }
        return 0
    }, [state.feedbackType, state.attempts, state.combo])

    // Start screen
    if (!state.currentOrder && !state.isGameOver) {
        return (
            <div className="pizza-game">
                <div className="container">
                    <div className="game-header">
                        <h1 className="game-title">{t('games.pizzaFractions.title')}</h1>
                        <p className="game-subtitle">{t('games.pizzaFractions.subtitle')}</p>
                    </div>

                    <div className="game-start-screen">
                        <div className="start-pizza-icon">🍕</div>
                        <p className="start-description">
                            {t('games.pizzaFractions.description')}
                        </p>

                        <div className="pizza-level-select">
                            {LEVELS.map((level, index) => (
                                <button
                                    key={index}
                                    className={`pizza-level-button ${selectedLevel === index ? 'active' : ''}`}
                                    onClick={() => setSelectedLevel(index)}
                                >
                                    {t(`common.levels.${level.name}`)}
                                </button>
                            ))}
                        </div>

                        <button
                            className="start-button"
                            onClick={() => startGame(selectedLevel)}
                        >
                            {t('games.pizzaFractions.startGame')} 🍕
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    // Game over screen
    if (state.isGameOver) {
        return (
            <div className="pizza-game">
                <div className="container">
                    <div className="game-over-screen">
                        <div className="game-over-icon">🏆</div>
                        <h2 className="game-over-title">{t('games.pizzaFractions.gameOver')}</h2>

                        <div className="game-over-stats">
                            <div className="stat-item">
                                <div className="stat-value">{state.ordersCompleted}</div>
                                <div className="stat-label">{t('games.pizzaFractions.ordersServed')}</div>
                            </div>
                            <div className="stat-item">
                                <div className="stat-value">{state.score}</div>
                                <div className="stat-label">{t('games.pizzaFractions.tipsEarned')}</div>
                            </div>
                        </div>

                        <button
                            className="play-again-button"
                            onClick={resetGame}
                        >
                            {t('games.pizzaFractions.playAgain')} 🔄
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    // Main game screen
    return (
        <div className="pizza-game">
            <div className="container">
                <div className="game-header">
                    <h1 className="game-title">{t('games.pizzaFractions.title')}</h1>
                </div>

                <ScoreBoard
                    score={state.score}
                    ordersCompleted={state.ordersCompleted}
                    ordersTotal={state.ordersTotal}
                    level={state.level}
                    combo={state.combo}
                />

                <div className="game-area">
                    <div className="customer-section">
                        <Customer
                            avatar={currentCustomer.avatar}
                            mood={currentCustomer.mood}
                        />
                        {state.currentOrder && (
                            <OrderBubble order={state.currentOrder} />
                        )}
                    </div>

                    <div className="pizza-section">
                        {state.currentOrder && (
                            <>
                                <Pizza
                                    denominator={state.currentOrder.totalSlices}
                                    selectedSlices={state.selectedSlices}
                                    onSliceClick={selectSlice}
                                    disabled={state.showFeedback}
                                />

                                <div className="pizza-controls">
                                    <div className="selection-info">
                                        <div className="selection-count">
                                            {state.selectedSlices.length === 1
                                                ? t('games.pizzaFractions.oneSliceSelected')
                                                : t('games.pizzaFractions.multipleSlicesSelected', { count: state.selectedSlices.length })
                                            }
                                        </div>
                                    </div>

                                    <div className="game-actions">
                                        <button
                                            className="reset-button"
                                            onClick={() => selectSlice(-1)}
                                            disabled={state.selectedSlices.length === 0 || state.showFeedback}
                                        >
                                            {t('games.pizzaFractions.reset')}
                                        </button>
                                        <button
                                            className="serve-button"
                                            onClick={submitOrder}
                                            disabled={state.selectedSlices.length === 0 || state.showFeedback}
                                        >
                                            🍽️ {t('games.pizzaFractions.serve')}
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* Feedback Modal */}
                {state.showFeedback && state.currentOrder && state.feedbackType && (
                    <FeedbackModal
                        type={state.feedbackType}
                        order={state.currentOrder}
                        selectedCount={state.selectedSlices.length}
                        earnedScore={earnedScore}
                        onContinue={nextOrder}
                    />
                )}
            </div>
        </div>
    )
}
