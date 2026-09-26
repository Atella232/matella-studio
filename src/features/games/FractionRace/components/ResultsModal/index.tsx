import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import confetti from 'canvas-confetti'
import type {
    AttemptRecord,
    RacerState,
    Fraction,
    MixedNumber,
    FinishReason,
    RaceRecord,
    RecordAchievements
} from '../../types'
import { FractionDisplay } from '../FractionDisplay'
import { ExpressionDisplay } from '../ExpressionDisplay'
import { analyzeErrorCategory } from '../../utils/errorAnalysis'
import './ResultsModal.css'

interface ResultsModalProps {
    racers: RacerState[]
    score: number
    maxCombo: number
    correctAnswers: number
    totalQuestions: number
    elapsedTime: number
    attempts: AttemptRecord[]
    finishReason: FinishReason | null
    record?: RaceRecord
    achievements: RecordAchievements | null
    onPlayAgain: () => void
    onReviewErrors: () => void
    onExit: () => void
}



export function ResultsModal({
    racers,
    score,
    maxCombo,
    correctAnswers,
    totalQuestions,
    elapsedTime,
    attempts,
    finishReason,
    record,
    achievements,
    onPlayAgain,
    onReviewErrors,
    onExit
}: ResultsModalProps) {
    const { t } = useTranslation()
    const titleRef = useRef<HTMLHeadingElement>(null)
    const wrongAttempts = attempts.filter(attempt => !attempt.isCorrect)

    useEffect(() => {
        titleRef.current?.focus()
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') onExit()
        }
        window.addEventListener('keydown', handleEscape)
        return () => window.removeEventListener('keydown', handleEscape)
    }, [onExit])

    // Sort racers by finish time (who finished first wins)
    // Racers with finishTime are ranked first by their finishTime
    // Racers without finishTime are ranked after by their position
    const sortedRacers = [...racers].sort((a, b) => {
        // Both finished: sort by finishTime (earlier = better)
        if (a.finishTime !== null && b.finishTime !== null) {
            return a.finishTime - b.finishTime
        }
        // Only a finished: a wins
        if (a.finishTime !== null) return -1
        // Only b finished: b wins
        if (b.finishTime !== null) return 1
        // Neither finished: sort by position (higher = better)
        return b.position - a.position
    })
    const playerRank = sortedRacers.findIndex(r => r.isPlayer) + 1
    const top3 = sortedRacers.slice(0, 3)
    const accuracy = attempts.length > 0 ? correctAnswers / attempts.length : 0
    const isPerfect = finishReason !== 'mistake' && attempts.length > 0 && correctAnswers === attempts.length
    const rewardTier = finishReason === 'mistake'
        ? 'attempt'
        : isPerfect ? 'gold' : accuracy >= 0.8 ? 'silver' : accuracy >= 0.6 ? 'bronze' : 'finisher'

    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
        if (playerRank !== 1 && !isPerfect) return

        void confetti({
            particleCount: isPerfect ? 120 : 80,
            spread: 72,
            origin: { y: 0.62 },
            colors: ['#2f6fdb', '#7a55d6', '#e0a100', '#267b53']
        })
    }, [isPerfect, playerRank])

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins}:${secs.toString().padStart(2, '0')}`
    }

    const getPodiumEmoji = (rank: number) => {
        switch (rank) {
            case 1: return '🥇'
            case 2: return '🥈'
            case 3: return '🥉'
            default: return ''
        }
    }

    return (
        <div className="results-overlay">
            <div
                className="results-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="race-results-title"
            >
                <div className="results-header">
                    <h2 id="race-results-title" ref={titleRef} tabIndex={-1}>
                        🏁 {t('games.fractionRace.raceFinished')}
                    </h2>
                    <div className="player-result">
                        {playerRank === 1 ? '🏆' : getPodiumEmoji(playerRank)}
                        {t('games.fractionRace.yourPosition')}: {playerRank}º
                    </div>
                    <div className={`reward-ribbon ${rewardTier}`}>
                        <span>{rewardTier === 'gold' ? '🌟' : rewardTier === 'silver' ? '🥈' : rewardTier === 'bronze' ? '🥉' : rewardTier === 'attempt' ? '🔁' : '🏁'}</span>
                        <strong>{t(`games.fractionRace.rewardTiers.${rewardTier}`)}</strong>
                    </div>
                    {finishReason && (
                        <p className="finish-message">
                            {t(`games.fractionRace.finishReasons.${finishReason}`)}
                        </p>
                    )}
                </div>

                <div className="podium">
                    {top3.map((racer, index) => (
                        <div
                            key={racer.id}
                            className={`podium-place place-${index + 1} ${racer.isPlayer ? 'is-player' : ''}`}
                        >
                            <div className="podium-avatar">{racer.avatar}</div>
                            <div className="podium-name">{t(`games.fractionRace.${racer.id}`)}</div>
                            <div className="podium-medal">{getPodiumEmoji(index + 1)}</div>
                            <div className="podium-bar" style={{ height: `${100 - index * 25}px` }}></div>
                        </div>
                    ))}
                </div>

                <div className="stats-grid">
                    <div className="stat-card">
                        <span className="stat-value">{score}</span>
                        <span className="stat-label">{t('games.fractionRace.points')}</span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-value">{correctAnswers}/{attempts.length || totalQuestions}</span>
                        <span className="stat-label">{t('games.fractionRace.correctAnswers')}</span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-value">{formatTime(elapsedTime)}</span>
                        <span className="stat-label">{t('games.fractionRace.time')}</span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-value">x{maxCombo}</span>
                        <span className="stat-label">{t('games.fractionRace.bestCombo')}</span>
                    </div>
                </div>

                {achievements && Object.values(achievements).some(Boolean) && (
                    <div className="achievement-section">
                        <h3>✨ {t('games.fractionRace.newAchievements')}</h3>
                        <div className="achievement-list">
                            {Object.entries(achievements)
                                .filter(([, earned]) => earned)
                                .map(([achievement]) => (
                                    <span key={achievement}>
                                        {t(`games.fractionRace.achievements.${achievement}`)}
                                    </span>
                                ))}
                        </div>
                    </div>
                )}

                {record && (
                    <div className="record-summary">
                        <span>🏆 {t('games.fractionRace.bestScore')}: <strong>{record.bestScore}</strong></span>
                        <span>⏱️ {t('games.fractionRace.bestTime')}: <strong>{record.bestTime === null ? '—' : formatTime(record.bestTime)}</strong></span>
                        <span>🎯 {t('games.fractionRace.bestAccuracy')}: <strong>{Math.round(record.bestAccuracy * 100)}%</strong></span>
                        <span>🏁 {t('games.fractionRace.wins')}: <strong>{record.wins}</strong></span>
                    </div>
                )}

                {wrongAttempts.length > 0 && (
                    <div className="wrong-answers-section">
                        <h3>📚 {t('games.fractionRace.reviewErrors')}</h3>
                        <div className="wrong-answers-list">
                            {wrongAttempts.map((attempt, index) => (
                                <div key={index} className="wrong-answer-item">
                                    <div className="wrong-operation">
                                        {attempt.operation.displayTree ? (
                                            <ExpressionDisplay node={attempt.operation.displayTree} />
                                        ) : (
                                            <>
                                                <FractionDisplay fraction={attempt.operation.left} />
                                                {attempt.operation.operator === '^' ? (
                                                    <sup className="result-exponent">{attempt.operation.right as number}</sup>
                                                ) : (
                                                    <>
                                                        <span className="op">{attempt.operation.operator}</span>
                                                        <FractionDisplay fraction={attempt.operation.right as Fraction | MixedNumber} />
                                                    </>
                                                )}
                                            </>
                                        )}
                                    </div>
                                    <div className="answer-comparison">
                                        <span className="selected-answer">
                                            {t('games.fractionRace.results.yourAnswer')}:{' '}
                                            <FractionDisplay fraction={attempt.selectedAnswer} />
                                        </span>
                                        <span className="correct-answer">
                                            {t('games.fractionRace.results.correctAnswer')}:{' '}
                                            <FractionDisplay fraction={attempt.correctAnswer} />
                                        </span>
                                    </div>
                                    <p className="result-error-insight">
                                        💡 {t(`games.fractionRace.errorInsights.${analyzeErrorCategory(
                                            attempt.operation,
                                            attempt.selectedAnswer,
                                            attempt.correctAnswer
                                        )}`)}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="results-actions">
                    {wrongAttempts.length > 0 && (
                        <button className="action-btn review-errors" onClick={onReviewErrors}>
                            🎯 {t('games.fractionRace.retryErrors')}
                        </button>
                    )}
                    <button className="action-btn play-again" onClick={onPlayAgain}>
                        🔄 {t('games.fractionRace.playAgain')}
                    </button>
                    <button className="action-btn exit" onClick={onExit}>
                        🚪 {t('games.fractionRace.exit')}
                    </button>
                </div>
            </div>
        </div>
    )
}
