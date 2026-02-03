import { useTranslation } from 'react-i18next'
import type { Card as CardType, StarRating } from '../../types'
import { LEVELS } from '../../types'
import { formatTime } from '../../utils/fractions'
import { Card } from '../Card'
import './GameBoard.css'

interface GameBoardProps {
    cards: CardType[]
    level: number
    moves: number
    elapsedTime: number
    matchedPairs: number
    totalPairs: number
    stars: StarRating
    onCardClick: (cardId: string) => void
    disabled?: boolean
}

export function GameBoard({
    cards,
    level,
    moves,
    elapsedTime,
    matchedPairs,
    totalPairs,
    stars,
    onCardClick,
    disabled
}: GameBoardProps) {
    const { t } = useTranslation()
    const config = LEVELS[level]

    return (
        <div className="board-container">
            <div className="board-header">
                <div className="stats-group">
                    <div className="stat-item">
                        <span className="stat-icon">⏱️</span>
                        <span className="stat-value">{formatTime(elapsedTime)}</span>
                        <span className="stat-label">{t('games.fractionMemory.time')}</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-icon">👆</span>
                        <span className="stat-value">{moves}</span>
                        <span className="stat-label">{t('games.fractionMemory.moves')}</span>
                    </div>
                </div>

                <div className="pairs-counter">
                    <span className="pairs-counter-icon">🃏</span>
                    <span>{matchedPairs} / {totalPairs}</span>
                </div>

                <div className="stars-display">
                    {[1, 2, 3].map((star) => (
                        <span
                            key={star}
                            className={`star ${star <= stars ? 'earned' : ''}`}
                        >
                            ⭐
                        </span>
                    ))}
                </div>
            </div>

            <div className={`game-board cols-${config.gridCols}`}>
                {cards.map((card) => (
                    <Card
                        key={card.id}
                        card={card}
                        onClick={onCardClick}
                        disabled={disabled}
                    />
                ))}
            </div>
        </div>
    )
}
