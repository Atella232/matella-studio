import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import type { Card, StarRating } from '../../types'
import { formatTime } from '../../utils/fractions'
import './GameOverModal.css'

interface GameOverModalProps {
    stars: StarRating
    score: number
    moves: number
    time: number
    matchedCards: Card[]
    onPlayAgain: () => void
    onExit: () => void
}

export function GameOverModal({
    stars,
    score,
    moves,
    time,
    matchedCards,
    onPlayAgain,
    onExit
}: GameOverModalProps) {
    const { t } = useTranslation()

    // Extract unique equivalences
    const equivalences = useMemo(() => {
        const pairs = new Map<string, [Card, Card]>()

        matchedCards.forEach(card => {
            const existing = pairs.get(card.pairId)
            if (existing) {
                existing[1] = card
            } else {
                pairs.set(card.pairId, [card, card])
            }
        })

        return Array.from(pairs.values()).map(([c1, c2]) => ({
            left: `${c1.numerator}/${c1.denominator}`,
            right: `${c2.numerator}/${c2.denominator}`
        }))
    }, [matchedCards])

    // Confetti elements
    const confetti = useMemo(() => {
        if (stars < 2) return []

        return Array.from({ length: 50 }, (_, i) => ({
            id: i,
            left: `${Math.random() * 100}%`,
            delay: `${Math.random() * 2}s`,
            color: ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff'][Math.floor(Math.random() * 5)]
        }))
    }, [stars])

    return (
        <div className="game-over-modal">
            {confetti.length > 0 && (
                <div className="confetti-container">
                    {confetti.map(c => (
                        <div
                            key={c.id}
                            className="confetti"
                            style={{
                                left: c.left,
                                animationDelay: c.delay,
                                backgroundColor: c.color
                            }}
                        />
                    ))}
                </div>
            )}

            <div className="modal-content">
                <div className="modal-icon">🎉</div>
                <h2 className="modal-title">{t('games.fractionMemory.completed')}</h2>

                <div className="modal-stars">
                    {[1, 2, 3].map((star) => (
                        <span
                            key={star}
                            className={`modal-star ${star <= stars ? 'earned' : ''}`}
                            style={{ '--delay': `${(star - 1) * 0.2}s` } as React.CSSProperties}
                        >
                            ⭐
                        </span>
                    ))}
                </div>

                <div className="modal-stats">
                    <div className="modal-stat">
                        <span className="modal-stat-value">{score}</span>
                        <span className="modal-stat-label">{t('games.fractionMemory.score')}</span>
                    </div>
                    <div className="modal-stat">
                        <span className="modal-stat-value">{moves}</span>
                        <span className="modal-stat-label">{t('games.fractionMemory.moves')}</span>
                    </div>
                    <div className="modal-stat">
                        <span className="modal-stat-value">{formatTime(time)}</span>
                        <span className="modal-stat-label">{t('games.fractionMemory.time')}</span>
                    </div>
                </div>

                {equivalences.length > 0 && (
                    <div className="modal-equivalences">
                        <div className="modal-equivalences-title">
                            {t('games.fractionMemory.equivalencesFound')}
                        </div>
                        <div className="equivalence-list">
                            {equivalences.slice(0, 8).map((eq, i) => (
                                <span key={i} className="equivalence-item">
                                    {eq.left} = {eq.right}
                                </span>
                            ))}
                            {equivalences.length > 8 && (
                                <span className="equivalence-item">+{equivalences.length - 8}</span>
                            )}
                        </div>
                    </div>
                )}

                <div className="modal-actions">
                    <button className="modal-btn modal-btn-secondary" onClick={onExit}>
                        {t('games.fractionMemory.exit')}
                    </button>
                    <button className="modal-btn modal-btn-primary" onClick={onPlayAgain}>
                        {t('games.fractionMemory.playAgain')} 🔄
                    </button>
                </div>
            </div>
        </div>
    )
}
