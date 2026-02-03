import { useTranslation } from 'react-i18next'
import type { FractionOperation, AnswerOption, Fraction, MixedNumber } from '../../types'
import { FractionDisplay } from '../FractionDisplay'
import { ExpressionDisplay } from '../ExpressionDisplay'
import './QuestionPanel.css'

interface QuestionPanelProps {
    operation: FractionOperation
    options: AnswerOption[]
    onAnswer: (id: string) => void
    disabled: boolean
    showFeedback: boolean
    lastAnswerCorrect: boolean | null
    combo: number
    questionNumber: number
    totalQuestions: number
}

export function QuestionPanel({
    operation,
    options,
    onAnswer,
    disabled,
    showFeedback,
    lastAnswerCorrect,
    combo,
    questionNumber,
    totalQuestions
}: QuestionPanelProps) {
    const { t } = useTranslation()

    return (
        <div className={`question-panel ${showFeedback ? (lastAnswerCorrect ? 'feedback-correct' : 'feedback-incorrect') : ''}`}>
            <div className="question-header">
                <span className="question-number">
                    {t('games.fractionRace.question')} {questionNumber}/{totalQuestions}
                </span>
                {combo >= 2 && (
                    <span className="combo-indicator">
                        🔥 {t('games.fractionRace.combo')} x{combo}
                    </span>
                )}
            </div>

            <div className="operation-display">
                {operation.displayTree ? (
                    <ExpressionDisplay node={operation.displayTree} />
                ) : (
                    <>
                        <FractionDisplay fraction={operation.left} />
                        {operation.operator === '^' ? (
                            <sup className="question-exponent">{operation.right as number}</sup>
                        ) : (
                            <>
                                <span className="operator">{operation.operator}</span>
                                <FractionDisplay fraction={operation.right as Fraction | MixedNumber} />
                            </>
                        )}
                    </>
                )}
                <span className="equals">=</span>
                <span className="answer-placeholder">?</span>
            </div>

            <div className="answer-options">
                {options.map((option) => (
                    <button
                        key={option.id}
                        className={`answer-button ${showFeedback && option.isCorrect ? 'correct-answer' : ''} ${showFeedback && !option.isCorrect ? 'wrong-answer' : ''}`}
                        onClick={() => onAnswer(option.id)}
                        disabled={disabled}
                    >
                        <FractionDisplay fraction={option.fraction} />
                    </button>
                ))}
            </div>

            {showFeedback && (
                <div className={`feedback-message ${lastAnswerCorrect ? 'correct' : 'incorrect'}`}>
                    {lastAnswerCorrect
                        ? `✅ ${t('games.fractionRace.correct')}`
                        : `❌ ${t('games.fractionRace.incorrect')}`
                    }
                </div>
            )}
        </div>
    )
}
