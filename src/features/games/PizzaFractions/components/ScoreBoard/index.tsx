import { useTranslation } from 'react-i18next'
import { LEVELS } from '../../types'
import './ScoreBoard.css'

interface ScoreBoardProps {
    score: number
    ordersCompleted: number
    ordersTotal: number
    level: number
    combo: number
}

export function ScoreBoard({ score, ordersCompleted, ordersTotal, level, combo }: ScoreBoardProps) {
    const { t } = useTranslation()
    const levelConfig = LEVELS[Math.min(level, LEVELS.length - 1)]

    return (
        <div className="scoreboard" role="status" aria-live="polite">
            <div className="score-item">
                <span className="score-icon" aria-hidden="true">🪙</span>
                <span className={`score-value ${combo > 0 ? 'highlight' : ''}`}>
                    {score}
                </span>
                <span className="score-label">{t('games.pizzaFractions.tips')}</span>
            </div>

            <div className="score-item">
                <span className="score-icon" aria-hidden="true">📋</span>
                <span className="score-value">
                    {ordersCompleted}/{ordersTotal}
                </span>
                <span className="score-label">{t('games.pizzaFractions.orders')}</span>
            </div>

            <div className="score-item">
                <span className="level-badge">
                    {t('games.pizzaFractions.level')} {level + 1}
                </span>
                <span className="score-label">{levelConfig.name}</span>
                {combo >= 2 && (
                    <span className="combo-indicator">🔥 x{combo}</span>
                )}
            </div>
        </div>
    )
}
