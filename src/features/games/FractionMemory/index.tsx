import { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useGameState } from './hooks/useGameState'
import { GameBoard } from './components/GameBoard'
import { GameOverModal } from './components/GameOverModal'
import { LEVELS } from './types'
import { toDecimalString } from './utils/fractions'
import './FractionMemory.css'

export function FractionMemory() {
    const { t } = useTranslation()
    const {
        state,
        elapsedTime,
        score,
        stars,
        startGame,
        flipCard,
        resetGame
    } = useGameState()
    const [selectedLevel, setSelectedLevel] = useState(0)

    const currentConfig = useMemo(() => LEVELS[selectedLevel], [selectedLevel])

    // Start screen
    if (state.cards.length === 0) {
        return (
            <div className="memory-game">
                <div className="container">
                    <div className="game-header">
                        <h1 className="game-title">{t('games.fractionMemory.title')}</h1>
                        <p className="game-subtitle">{t('games.fractionMemory.subtitle')}</p>
                    </div>

                    <div className="game-start-screen">
                        <div className="start-icon">🃏</div>
                        <p className="start-description">
                            {t('games.fractionMemory.description')}
                        </p>

                        <div className="level-select">
                            {LEVELS.map((level, index) => (
                                <button
                                    key={index}
                                    className={`level-button ${selectedLevel === index ? 'active' : ''}`}
                                    onClick={() => setSelectedLevel(index)}
                                >
                                    {t(`common.levels.${level.name}`)}
                                </button>
                            ))}
                        </div>

                        <div className="level-info">
                            <div className="level-info-item">
                                <span className="level-info-value">{currentConfig.pairs}</span>
                                <span className="level-info-label">{t('games.fractionMemory.pairs')}</span>
                            </div>
                            <div className="level-info-item">
                                <span className="level-info-value">{currentConfig.pairs * 2}</span>
                                <span className="level-info-label">{t('games.fractionMemory.cards')}</span>
                            </div>
                            <div className="level-info-item">
                                <span className="level-info-value">
                                    {currentConfig.includeVisual ? '✓' : '✗'}
                                </span>
                                <span className="level-info-label">{t('games.fractionMemory.visual')}</span>
                            </div>
                            <div className="level-info-item">
                                <span className="level-info-value">
                                    {currentConfig.includeDecimal ? '✓' : '✗'}
                                </span>
                                <span className="level-info-label">{t('games.fractionMemory.decimal')}</span>
                            </div>
                        </div>

                        <button
                            className="start-button"
                            onClick={() => startGame(selectedLevel)}
                        >
                            {t('games.fractionMemory.startGame')} 🎴
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    // Game in progress
    return (
        <div className="memory-game">
            <div className="container">
                <div className="game-header">
                    <h1 className="game-title">{t('games.fractionMemory.title')}</h1>
                </div>

                <div className="game-content">
                    <GameBoard
                        cards={state.cards}
                        level={state.level}
                        moves={state.moves}
                        elapsedTime={elapsedTime}
                        matchedPairs={state.matchedPairs.length}
                        totalPairs={LEVELS[state.level].pairs}
                        stars={stars}
                        onCardClick={flipCard}
                        disabled={state.showMismatchFeedback}
                    />

                    <div className="game-actions">
                        <button className="action-button reset-button" onClick={() => startGame(state.level)}>
                            🔄 {t('games.fractionMemory.restart')}
                        </button>
                        <button className="action-button exit-button" onClick={resetGame}>
                            🚪 {t('games.fractionMemory.exit')}
                        </button>
                    </div>
                </div>

                {/* Mismatch feedback toast */}
                {state.showMismatchFeedback && state.mismatchCards && (
                    <div className="mismatch-feedback">
                        <div className="mismatch-card">
                            <span className="mismatch-value">
                                {state.mismatchCards[0].numerator}/{state.mismatchCards[0].denominator}
                            </span>
                            <span className="mismatch-decimal">
                                = {toDecimalString(state.mismatchCards[0].numerator, state.mismatchCards[0].denominator)}
                            </span>
                        </div>
                        <span className="mismatch-symbol">≠</span>
                        <div className="mismatch-card">
                            <span className="mismatch-value">
                                {state.mismatchCards[1].numerator}/{state.mismatchCards[1].denominator}
                            </span>
                            <span className="mismatch-decimal">
                                = {toDecimalString(state.mismatchCards[1].numerator, state.mismatchCards[1].denominator)}
                            </span>
                        </div>
                    </div>
                )}

                {/* Game over modal */}
                {state.isGameOver && (
                    <GameOverModal
                        stars={stars}
                        score={score}
                        moves={state.moves}
                        time={elapsedTime}
                        matchedCards={state.cards.filter(c => c.isMatched)}
                        onPlayAgain={() => startGame(state.level)}
                        onExit={resetGame}
                    />
                )}
            </div>
        </div>
    )
}
