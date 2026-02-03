import { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useGameState } from './hooks/useGameState'
import { RaceTrack } from './components/RaceTrack'
import { QuestionPanel } from './components/QuestionPanel'
import { TrafficLight } from './components/TrafficLight'
import { ResultsModal } from './components/ResultsModal'
import { LEVELS, GAME_MODES, type GameMode } from './types'
import './FractionRace.css'

export function FractionRace() {
    const { t } = useTranslation()
    const { state, startGame, answerQuestion, resetGame } = useGameState()
    const [selectedMode, setSelectedMode] = useState<GameMode>('addSub')
    const [selectedDifficultyIndex, setSelectedDifficultyIndex] = useState(0)

    const visibleLevels = useMemo(() => LEVELS.filter(l => l.gameMode === selectedMode), [selectedMode])
    const currentConfig = useMemo(() => visibleLevels[selectedDifficultyIndex] || visibleLevels[0], [visibleLevels, selectedDifficultyIndex])

    // Menu screen
    if (state.phase === 'menu') {
        return (
            <div className="fraction-race">
                <div className="container">
                    <div className="game-header">
                        <h1 className="game-title">🏎️ {t('games.fractionRace.title')}</h1>
                        <p className="game-subtitle">{t('games.fractionRace.subtitle')}</p>
                    </div>

                    <div className="game-start-screen">
                        <div className="start-icon">🏁</div>
                        <p className="start-description">
                            {t('games.fractionRace.description')}
                        </p>

                        <div className="mode-select">
                            {GAME_MODES.map(mode => (
                                <button
                                    key={mode.id}
                                    className={`mode-button ${selectedMode === mode.id ? 'active' : ''}`}
                                    onClick={() => {
                                        setSelectedMode(mode.id)
                                        setSelectedDifficultyIndex(0) // Reset to easy when changing mode
                                    }}
                                >
                                    <span className="mode-icon">{mode.icon}</span>
                                    {t(`games.fractionRace.modes.${mode.id}`)}
                                </button>
                            ))}
                        </div>

                        <div className="level-select">
                            {visibleLevels.map((level, index) => (
                                <button
                                    key={level.id}
                                    className={`level-button ${selectedDifficultyIndex === index ? 'active' : ''}`}
                                    onClick={() => setSelectedDifficultyIndex(index)}
                                >
                                    {t(`common.levels.${level.name}`)}
                                </button>
                            ))}
                        </div>

                        <div className="level-info">
                            <div className="level-info-item">
                                <span className="level-info-value">{currentConfig.questionsCount}</span>
                                <span className="level-info-label">{t('games.fractionRace.questions')}</span>
                            </div>
                            <div className="level-info-item">
                                <span className="level-info-value">
                                    {currentConfig.gameMode === 'combined' ? '(…)' :
                                        currentConfig.gameMode === 'powers' ? '^' :
                                            currentConfig.gameMode === 'mulDiv' ? '×÷' :
                                                currentConfig.operationType === 'addition' ? '+' :
                                                    currentConfig.operationType === 'subtraction' ? '−' : '±'}
                                </span>
                                <span className="level-info-label">{t('games.fractionRace.operations')}</span>
                            </div>
                            <div className="level-info-item">
                                <span className="level-info-value">
                                    {currentConfig.gameMode === 'powers'
                                        ? currentConfig.maxExponent
                                        : (currentConfig.includeMixed ? '✓' : '✗')}
                                </span>
                                <span className="level-info-label">
                                    {currentConfig.gameMode === 'powers'
                                        ? t('games.fractionRace.maxExponent')
                                        : t('games.fractionRace.mixedNumbers')}
                                </span>
                            </div>
                            <div className="level-info-item">
                                <span className="level-info-value">3</span>
                                <span className="level-info-label">{t('games.fractionRace.opponents')}</span>
                            </div>
                        </div>

                        <button
                            className="start-button"
                            onClick={() => {
                                const globalIndex = LEVELS.findIndex(l => l.id === currentConfig.id)
                                startGame(globalIndex)
                            }}
                        >
                            {t('games.fractionRace.startRace')} 🚀
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    // Countdown screen
    if (state.phase === 'countdown') {
        return (
            <div className="fraction-race">
                <div className="container">
                    <div className="game-header">
                        <h1 className="game-title">🏎️ {t('games.fractionRace.title')}</h1>
                    </div>
                    <RaceTrack racers={state.racers} showTurbo={false} />
                    <TrafficLight onComplete={() => { }} />
                </div>
            </div>
        )
    }

    // Race finished
    if (state.phase === 'finished') {
        return (
            <div className="fraction-race">
                <div className="container">
                    <RaceTrack racers={state.racers} showTurbo={false} />
                    <ResultsModal
                        racers={state.racers}
                        score={state.score}
                        correctAnswers={state.correctAnswers}
                        totalQuestions={state.totalQuestions}
                        elapsedTime={state.elapsedTime}
                        wrongAnswers={state.wrongAnswers}
                        onPlayAgain={() => startGame(state.level)}
                        onExit={resetGame}
                    />
                </div>
            </div>
        )
    }

    // Racing (in progress)
    return (
        <div className="fraction-race">
            <div className="container">
                <div className="race-header">
                    <div className="race-stats">
                        <span className="stat">
                            ⏱ {Math.floor(state.elapsedTime / 60)}:{(state.elapsedTime % 60).toString().padStart(2, '0')}
                        </span>
                        <span className="stat">
                            🏆 {state.score} {t('games.fractionRace.pts')}
                        </span>
                    </div>
                    <button className="exit-race-btn" onClick={resetGame}>
                        ✕ {t('games.fractionRace.exit')}
                    </button>
                </div>

                <RaceTrack
                    racers={state.racers}
                    showTurbo={state.turboActive && state.combo === 3}
                />

                {state.currentQuestion && (
                    <QuestionPanel
                        operation={state.currentQuestion}
                        options={state.answerOptions}
                        onAnswer={answerQuestion}
                        disabled={state.showFeedback}
                        showFeedback={state.showFeedback}
                        lastAnswerCorrect={state.lastAnswerCorrect}
                        combo={state.combo}
                        questionNumber={state.questionNumber}
                        totalQuestions={state.totalQuestions}
                    />
                )}
            </div>
        </div>
    )
}
