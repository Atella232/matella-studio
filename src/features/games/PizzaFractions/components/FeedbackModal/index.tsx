import { useTranslation } from 'react-i18next'
import type { FractionOrder } from '../../types'
import './FeedbackModal.css'

interface FeedbackModalProps {
    type: 'correct' | 'incorrect'
    order: FractionOrder
    selectedCount: number
    earnedScore?: number
    onContinue: () => void
}

export function FeedbackModal({ type, order, selectedCount, earnedScore = 0, onContinue }: FeedbackModalProps) {
    const { t } = useTranslation()
    const isCorrect = type === 'correct'

    return (
        <div className="feedback-overlay" onClick={onContinue}>
            <div
                className={`feedback-modal ${type}`}
                onClick={e => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-labelledby="feedback-title"
            >
                <div className={`feedback-icon ${type}`}>
                    {isCorrect ? '🎉' : '🤔'}
                </div>

                <h2 id="feedback-title" className={`feedback-title ${type}`}>
                    {isCorrect
                        ? t('games.pizzaFractions.correct')
                        : t('games.pizzaFractions.incorrect')
                    }
                </h2>

                <div className="feedback-explanation">
                    {isCorrect ? (
                        <div className="feedback-fraction-visual">
                            <div className="feedback-fraction">
                                <span>{order.numerator}</span>
                                <span className="feedback-fraction-line"></span>
                                <span>{order.denominator}</span>
                            </div>
                            <span className="feedback-equals">=</span>
                            <span>{order.numerator} 🍕 {t('games.pizzaFractions.of')} {order.denominator}</span>
                        </div>
                    ) : (
                        <p>
                            {t('games.pizzaFractions.selectedWrong', {
                                selected: selectedCount,
                                needed: order.numerator,
                                total: order.denominator
                            })}
                        </p>
                    )}
                </div>

                {isCorrect && earnedScore > 0 && (
                    <div className="feedback-score">
                        <span>+{earnedScore}</span>
                        <span>🪙</span>
                    </div>
                )}

                <button
                    className={`feedback-button ${type}`}
                    onClick={onContinue}
                    autoFocus
                >
                    {isCorrect
                        ? t('games.pizzaFractions.nextOrder')
                        : t('games.pizzaFractions.tryAgain')
                    }
                </button>
            </div>
        </div>
    )
}
