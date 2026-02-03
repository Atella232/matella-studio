import { useTranslation } from 'react-i18next'
import type { RacerState, FractionOperation, Fraction, MixedNumber } from '../../types'
import { FractionDisplay } from '../FractionDisplay'
import { ExpressionDisplay } from '../ExpressionDisplay'
import './ResultsModal.css'

interface ResultsModalProps {
    racers: RacerState[]
    score: number
    correctAnswers: number
    totalQuestions: number
    elapsedTime: number
    wrongAnswers: FractionOperation[]
    onPlayAgain: () => void
    onExit: () => void
}



export function ResultsModal({
    racers,
    score,
    correctAnswers,
    totalQuestions,
    elapsedTime,
    wrongAnswers,
    onPlayAgain,
    onExit
}: ResultsModalProps) {
    const { t } = useTranslation()

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
            <div className="results-modal">
                <div className="results-header">
                    <h2>🏁 {t('games.fractionRace.raceFinished')}</h2>
                    <div className="player-result">
                        {playerRank === 1 ? '🏆' : getPodiumEmoji(playerRank)}
                        {t('games.fractionRace.yourPosition')}: {playerRank}º
                    </div>
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
                        <span className="stat-value">{correctAnswers}/{totalQuestions}</span>
                        <span className="stat-label">{t('games.fractionRace.correctAnswers')}</span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-value">{formatTime(elapsedTime)}</span>
                        <span className="stat-label">{t('games.fractionRace.time')}</span>
                    </div>
                </div>

                {wrongAnswers.length > 0 && (
                    <div className="wrong-answers-section">
                        <h3>📚 {t('games.fractionRace.reviewErrors')}</h3>
                        <div className="wrong-answers-list">
                            {wrongAnswers.map((op, index) => (
                                <div key={index} className="wrong-answer-item">
                                    <div className="wrong-operation">
                                        {op.displayTree ? (
                                            <ExpressionDisplay node={op.displayTree} />
                                        ) : (
                                            <>
                                                <FractionDisplay fraction={op.left} />
                                                {op.operator === '^' ? (
                                                    <sup className="result-exponent">{op.right as number}</sup>
                                                ) : (
                                                    <>
                                                        <span className="op">{op.operator}</span>
                                                        <FractionDisplay fraction={op.right as Fraction | MixedNumber} />
                                                    </>
                                                )}
                                            </>
                                        )}
                                    </div>
                                    <div className="correct-answer">
                                        = <FractionDisplay fraction={op.simplifiedResult} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="results-actions">
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
