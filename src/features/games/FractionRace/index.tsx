import { useEffect, useState, useMemo, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import { useGameState } from './hooks/useGameState'
import { useRaceProgress } from './hooks/useRaceProgress'
import { useRaceAudio } from './hooks/useRaceAudio'
import { RaceTrack } from './components/RaceTrack'
import { QuestionPanel } from './components/QuestionPanel'
import { TrafficLight } from './components/TrafficLight'
import { ResultsModal } from './components/ResultsModal'
import {
    DEFAULT_RACE_SETTINGS,
    LEVELS,
    GAME_MODES,
    SCORE_CONFIG,
    type GameMode,
    type OperationFilter,
    type RaceFormat,
    type RaceSettings
} from './types'
import './FractionRace.css'
import { SPRINT_DURATION_SECONDS } from './utils/raceRules'

export function FractionRace() {
    const { t } = useTranslation()
    const location = useLocation()
    const isDbh1 = location.pathname.includes('/dbh1/')
    const {
        state,
        startGame,
        startErrorReview,
        beginRace,
        answerQuestion,
        nextQuestion,
        resetGame,
        getPlayerRank
    } = useGameState()
    const {
        getRecord,
        registerRace,
        latestAchievements,
        clearLatestAchievements
    } = useRaceProgress()
    const { soundEnabled, toggleSound, playSound } = useRaceAudio()
    const [selectedMode, setSelectedMode] = useState<GameMode>('addSub')
    const [selectedDifficultyIndex, setSelectedDifficultyIndex] = useState(0)
    const [raceSettings, setRaceSettings] = useState<RaceSettings>(DEFAULT_RACE_SETTINGS)
    const registeredRaceRef = useRef<number | null>(null)

    const visibleLevels = useMemo(() => LEVELS.filter(l => l.gameMode === selectedMode), [selectedMode])
    const currentConfig = useMemo(() => visibleLevels[selectedDifficultyIndex] || visibleLevels[0], [visibleLevels, selectedDifficultyIndex])
    const availableModes = useMemo(() => isDbh1 ? GAME_MODES.filter(m => m.id !== 'powers') : GAME_MODES, [isDbh1])
    const currentRecord = getRecord(currentConfig.id, raceSettings.format)

    useEffect(() => {
        if (state.phase === 'racing') window.scrollTo({ top: 0, behavior: 'auto' })
    }, [state.phase])

    useEffect(() => {
        if (state.phase !== 'finished' || !state.startTime || registeredRaceRef.current === state.startTime) return
        registeredRaceRef.current = state.startTime
        if (state.reviewMode) {
            playSound('finish')
            return
        }
        const rank = state.attempts.length > 0 ? getPlayerRank() : state.racers.length
        registerRace(LEVELS[state.level].id, state.settings.format, {
            score: state.score,
            elapsedTime: state.elapsedTime,
            correctAnswers: state.correctAnswers,
            attempts: state.attempts.length,
            rank,
            completed: state.finishReason !== 'mistake'
                && (state.settings.format === 'sprint' || state.attempts.length >= state.totalQuestions)
        })
        playSound('finish')
    }, [getPlayerRank, playSound, registerRace, state])

    const updateRaceSettings = <K extends keyof RaceSettings,>(key: K, value: RaceSettings[K]) => {
        setRaceSettings(previous => ({ ...previous, [key]: value }))
    }

    const launchRace = () => {
        const globalIndex = LEVELS.findIndex(level => level.id === currentConfig.id)
        clearLatestAchievements()
        playSound('start')
        startGame(globalIndex, raceSettings)
    }

    const handleAnswer = (answerId: string) => {
        const selectedAnswer = state.answerOptions.find(option => option.id === answerId)
        if (selectedAnswer?.isCorrect) {
            playSound(state.combo + 1 === SCORE_CONFIG.turboThreshold ? 'turbo' : 'correct')
        } else {
            playSound('incorrect')
        }
        answerQuestion(answerId)
    }

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

                        <div className="start-toolbar">
                            <span>{t('games.fractionRace.chooseRaceFormat')}</span>
                            <button
                                className="sound-toggle"
                                type="button"
                                aria-pressed={soundEnabled}
                                onClick={toggleSound}
                            >
                                {soundEnabled ? '🔊' : '🔇'} {t(soundEnabled
                                    ? 'games.fractionRace.soundOn'
                                    : 'games.fractionRace.soundOff')}
                            </button>
                        </div>

                        <div
                            className="format-select"
                            role="group"
                            aria-label={t('games.fractionRace.chooseRaceFormat')}
                        >
                            {(['classic', 'sprint', 'perfect'] as RaceFormat[]).map(format => (
                                <button
                                    key={format}
                                    className={`format-button ${raceSettings.format === format ? 'active' : ''}`}
                                    aria-pressed={raceSettings.format === format}
                                    onClick={() => updateRaceSettings('format', format)}
                                >
                                    <span className="format-icon">
                                        {format === 'classic' ? '🏁' : format === 'sprint' ? '⏱️' : '💎'}
                                    </span>
                                    <strong>{t(`games.fractionRace.formats.${format}.name`)}</strong>
                                    <small>{t(`games.fractionRace.formats.${format}.description`)}</small>
                                </button>
                            ))}
                        </div>

                        <div
                            className="mode-select"
                            role="group"
                            aria-label={t('games.fractionRace.modeSelection')}
                        >
                            {availableModes.map(mode => (
                                <button
                                    key={mode.id}
                                    className={`mode-button ${selectedMode === mode.id ? 'active' : ''}`}
                                    aria-pressed={selectedMode === mode.id}
                                    onClick={() => {
                                        setSelectedMode(mode.id)
                                        setSelectedDifficultyIndex(0) // Reset to easy when changing mode
                                        const firstModeLevel = LEVELS.find(level => level.gameMode === mode.id)
                                        setRaceSettings(previous => ({
                                            ...previous,
                                            operationFilter: 'default',
                                            includeMixed: firstModeLevel?.includeMixed ?? false
                                        }))
                                    }}
                                >
                                    <span className="mode-icon">{mode.icon}</span>
                                    {t(`games.fractionRace.modes.${mode.id}`)}
                                </button>
                            ))}
                        </div>

                        <div
                            className="level-select"
                            role="group"
                            aria-label={t('games.fractionRace.difficultySelection')}
                        >
                            {visibleLevels.map((level, index) => (
                                <button
                                    key={level.id}
                                    className={`level-button ${selectedDifficultyIndex === index ? 'active' : ''}`}
                                    aria-pressed={selectedDifficultyIndex === index}
                                    onClick={() => {
                                        setSelectedDifficultyIndex(index)
                                        setRaceSettings(previous => ({
                                            ...previous,
                                            includeMixed: level.includeMixed
                                        }))
                                    }}
                                >
                                    {t(`common.levels.${level.name}`)}
                                </button>
                            ))}
                        </div>

                        <div className="race-options-panel">
                            {raceSettings.format !== 'sprint' && (
                                <div className="race-option-group">
                                    <span className="race-option-label">{t('games.fractionRace.questionCountSelection')}</span>
                                    <div className="segmented-options" role="group" aria-label={t('games.fractionRace.questionCountSelection')}>
                                        {([5, 10, 20] as const).map(count => (
                                            <button
                                                key={count}
                                                aria-pressed={raceSettings.questionCount === count}
                                                className={raceSettings.questionCount === count ? 'active' : ''}
                                                onClick={() => updateRaceSettings('questionCount', count)}
                                            >
                                                {count}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {(selectedMode === 'addSub' || selectedMode === 'mulDiv') && (
                                <div className="race-option-group">
                                    <span className="race-option-label">{t('games.fractionRace.operationSelection')}</span>
                                    <div className="segmented-options" role="group" aria-label={t('games.fractionRace.operationSelection')}>
                                        {(selectedMode === 'addSub'
                                            ? ['default', 'addition', 'subtraction']
                                            : ['default', 'multiplication', 'division']
                                        ).map(filter => (
                                            <button
                                                key={filter}
                                                aria-pressed={raceSettings.operationFilter === filter}
                                                className={raceSettings.operationFilter === filter ? 'active' : ''}
                                                onClick={() => updateRaceSettings('operationFilter', filter as OperationFilter)}
                                            >
                                                {t(`games.fractionRace.operationFilters.${filter}`)}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {(selectedMode === 'addSub' || selectedMode === 'mulDiv') && (
                                <button
                                    type="button"
                                    className={`mixed-toggle ${raceSettings.includeMixed ? 'active' : ''}`}
                                    aria-pressed={raceSettings.includeMixed}
                                    onClick={() => updateRaceSettings('includeMixed', !raceSettings.includeMixed)}
                                >
                                    {raceSettings.includeMixed ? '✓' : '○'} {t('games.fractionRace.includeMixedOption')}
                                </button>
                            )}
                        </div>

                        <div className="level-info">
                            <div className="level-info-item">
                                <span className="level-info-value">
                                    {raceSettings.format === 'sprint' ? '60s' : raceSettings.questionCount}
                                </span>
                                <span className="level-info-label">{t(raceSettings.format === 'sprint'
                                    ? 'games.fractionRace.timeLimit'
                                    : 'games.fractionRace.questions')}</span>
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
                                        : (raceSettings.includeMixed ? '✓' : '✗')}
                                </span>
                                <span className="level-info-label">
                                    {currentConfig.gameMode === 'powers'
                                        ? t('games.fractionRace.maxExponent')
                                        : t('games.fractionRace.mixedNumbers')}
                                </span>
                            </div>
                            <div className="level-info-item">
                                <span className="level-info-value">≤ {currentConfig.fastAnswerMs / 1000}s</span>
                                <span className="level-info-label">{t('games.fractionRace.fastTime')}</span>
                            </div>
                        </div>

                        <div className="level-details">
                            <span>{t('games.fractionRace.maxDenominator', { value: currentConfig.maxDenominator })}</span>
                            <span>
                                {t(currentConfig.sameDenominator
                                    ? 'games.fractionRace.sameDenominators'
                                    : 'games.fractionRace.differentDenominators')}
                            </span>
                            <span>{t('games.fractionRace.simplifiedAnswers')}</span>
                        </div>

                        <div className="personal-progress-card" aria-label={t('games.fractionRace.personalProgress')}>
                            <div className="personal-progress-title">
                                <span>🏅 {t('games.fractionRace.personalProgress')}</span>
                                <small>{t(`games.fractionRace.formats.${raceSettings.format}.name`)}</small>
                            </div>
                            {currentRecord ? (
                                <div className="personal-progress-stats">
                                    <span><strong>{currentRecord.racesPlayed}</strong>{t('games.fractionRace.racesPlayed')}</span>
                                    <span><strong>{currentRecord.wins}</strong>{t('games.fractionRace.wins')}</span>
                                    <span><strong>{currentRecord.bestScore}</strong>{t('games.fractionRace.bestScore')}</span>
                                    <span>
                                        <strong>{currentRecord.bestTime === null
                                            ? '—'
                                            : `${Math.floor(currentRecord.bestTime / 60)}:${(currentRecord.bestTime % 60).toString().padStart(2, '0')}`}</strong>
                                        {t('games.fractionRace.bestTime')}
                                    </span>
                                    <span><strong>{Math.round(currentRecord.bestAccuracy * 100)}%</strong>{t('games.fractionRace.bestAccuracy')}</span>
                                </div>
                            ) : (
                                <p>{t('games.fractionRace.noRecordYet')}</p>
                            )}
                        </div>

                        <button
                            className="start-button"
                            onClick={launchRace}
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
                    <TrafficLight onComplete={beginRace} />
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
                        maxCombo={state.maxCombo}
                        correctAnswers={state.correctAnswers}
                        totalQuestions={state.totalQuestions}
                        elapsedTime={state.elapsedTime}
                        attempts={state.attempts}
                        finishReason={state.finishReason}
                        record={state.reviewMode
                            ? undefined
                            : getRecord(LEVELS[state.level].id, state.settings.format)}
                        achievements={state.reviewMode ? null : latestAchievements}
                        onPlayAgain={() => {
                            clearLatestAchievements()
                            playSound('start')
                            startGame(state.level, state.settings)
                        }}
                        onReviewErrors={() => startErrorReview(
                            state.attempts
                                .filter(attempt => !attempt.isCorrect)
                                .map(attempt => attempt.operation),
                            state.level,
                            state.settings
                        )}
                        onExit={() => {
                            clearLatestAchievements()
                            resetGame()
                        }}
                    />
                </div>
            </div>
        )
    }

    // Racing (in progress)
    const displayedSeconds = state.settings.format === 'sprint'
        ? Math.max(0, SPRINT_DURATION_SECONDS - state.elapsedTime)
        : state.elapsedTime
    const displayedTime = `${Math.floor(displayedSeconds / 60)}:${(displayedSeconds % 60).toString().padStart(2, '0')}`

    return (
        <div className="fraction-race">
            <div className="container racing-container">
                <div className="race-header">
                    <div className="race-score-area">
                        <div className="race-stats">
                            {state.reviewMode && (
                                <span className="review-mode-badge">🎯 {t('games.fractionRace.reviewMode')}</span>
                            )}
                            <span className="stat">
                                {state.settings.format === 'sprint' ? '⏳' : '⏱'}{' '}
                                {displayedTime}
                            </span>
                            <span className="stat score-total" aria-live="polite">
                                🏆 {state.score} {t('games.fractionRace.pts')}
                            </span>
                            <span className="race-format-badge">
                                {t(`games.fractionRace.formats.${state.settings.format}.name`)}
                            </span>
                        </div>
                        <div className="score-rules" aria-label={t('games.fractionRace.scoringGuide')}>
                            <span>✓ +{SCORE_CONFIG.basePoints} {t('games.fractionRace.baseScore')}</span>
                            <span>⚡ +{SCORE_CONFIG.speedBonus} {t('games.fractionRace.speedScore')}</span>
                            <span>🔥 +{SCORE_CONFIG.comboMultiplier} {t('games.fractionRace.comboStep')}</span>
                            <span>🚀 +{SCORE_CONFIG.turboBonus} {t('games.fractionRace.turboScore')}</span>
                        </div>
                    </div>
                    <div className="race-controls">
                        <button
                            className="race-sound-btn"
                            type="button"
                            aria-pressed={soundEnabled}
                            aria-label={t(soundEnabled
                                ? 'games.fractionRace.soundOn'
                                : 'games.fractionRace.soundOff')}
                            onClick={toggleSound}
                        >
                            {soundEnabled ? '🔊' : '🔇'}
                        </button>
                        <button className="exit-race-btn" onClick={resetGame}>
                            ✕ {t('games.fractionRace.exit')}
                        </button>
                    </div>
                </div>

                <div className="race-play-layout">
                    <RaceTrack
                        racers={state.racers}
                        showTurbo={state.turboActive && state.combo === 3 && state.showFeedback}
                    />

                    {state.currentQuestion && (
                        <QuestionPanel
                            operation={state.currentQuestion}
                            options={state.answerOptions}
                            onAnswer={handleAnswer}
                            onContinue={nextQuestion}
                            disabled={state.showFeedback}
                            showFeedback={state.showFeedback}
                            lastAnswerCorrect={state.lastAnswerCorrect}
                            selectedAnswerId={state.selectedAnswerId}
                            combo={state.combo}
                            scoreBreakdown={state.lastScoreBreakdown}
                            questionNumber={state.questionNumber}
                            totalQuestions={state.totalQuestions}
                            hideQuestionTotal={state.settings.format === 'sprint'}
                            isLastQuestion={state.questionNumber >= state.totalQuestions
                                || (state.settings.format === 'perfect'
                                    && state.showFeedback
                                    && state.lastAnswerCorrect === false)}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}
