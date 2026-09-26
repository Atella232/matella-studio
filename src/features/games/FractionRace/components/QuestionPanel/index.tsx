import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import {
    SCORE_CONFIG,
    type FractionOperation,
    type AnswerOption,
    type Fraction,
    type MixedNumber,
    type ScoreBreakdown
} from '../../types'
import { FractionDisplay } from '../FractionDisplay'
import { ExpressionDisplay } from '../ExpressionDisplay'
import { analyzeErrorCategory } from '../../utils/errorAnalysis'
import './QuestionPanel.css'

interface QuestionPanelProps {
    operation: FractionOperation
    options: AnswerOption[]
    onAnswer: (id: string) => void
    onContinue: () => void
    disabled: boolean
    showFeedback: boolean
    lastAnswerCorrect: boolean | null
    selectedAnswerId: string | null
    combo: number
    scoreBreakdown: ScoreBreakdown | null
    questionNumber: number
    totalQuestions: number
    isLastQuestion: boolean
    hideQuestionTotal?: boolean
}

export function QuestionPanel({
    operation,
    options,
    onAnswer,
    onContinue,
    disabled,
    showFeedback,
    lastAnswerCorrect,
    selectedAnswerId,
    combo,
    scoreBreakdown,
    questionNumber,
    totalQuestions,
    isLastQuestion,
    hideQuestionTotal = false
}: QuestionPanelProps) {
    const { t } = useTranslation()
    const selectedAnswer = options.find(option => option.id === selectedAnswerId)
    const correctAnswer = options.find(option => option.isCorrect)
    const errorCategory = !lastAnswerCorrect && selectedAnswer && correctAnswer
        ? analyzeErrorCategory(operation, selectedAnswer.fraction, correctAnswer.fraction)
        : null
    const turboProgress = Math.min(combo, SCORE_CONFIG.turboThreshold)
    const turboActive = combo >= SCORE_CONFIG.turboThreshold
    const explanationKey = operation.displayTree
        ? 'combined'
        : operation.operator === '^'
            ? 'power'
            : operation.operator === '×'
                ? 'multiply'
                : operation.operator === '÷'
                    ? 'divide'
                    : 'addSubtract'

    useEffect(() => {
        const handleShortcut = (event: KeyboardEvent) => {
            if (showFeedback || event.altKey || event.ctrlKey || event.metaKey) return
            const optionIndex = Number(event.key) - 1
            if (optionIndex >= 0 && optionIndex < options.length) {
                event.preventDefault()
                onAnswer(options[optionIndex].id)
            }
        }

        window.addEventListener('keydown', handleShortcut)
        return () => window.removeEventListener('keydown', handleShortcut)
    }, [onAnswer, options, showFeedback])

    return (
        <section
            className={`question-panel ${showFeedback ? (lastAnswerCorrect ? 'feedback-correct' : 'feedback-incorrect') : ''}`}
            aria-labelledby="race-question-heading"
        >
            <div className="question-header">
                <span className="question-number" id="race-question-heading">
                    {t('games.fractionRace.question')} {questionNumber}
                    {!hideQuestionTotal && `/${totalQuestions}`}
                </span>
                <div className={`power-meter ${turboActive ? 'turbo-active' : ''}`}>
                    <div className="power-meter-labels">
                        <span className="combo-indicator">
                            🔥 {t('games.fractionRace.combo')} x{combo}
                        </span>
                        <span className="turbo-progress-label">
                            {turboActive
                                ? `⚡ ${t('games.fractionRace.turboActiveBonus', { points: SCORE_CONFIG.turboBonus })}`
                                : t('games.fractionRace.turboProgress', {
                                    current: turboProgress,
                                    target: SCORE_CONFIG.turboThreshold
                                })}
                        </span>
                    </div>
                    <div
                        className="turbo-meter-track"
                        role="progressbar"
                        aria-label={t('games.fractionRace.turboProgress', {
                            current: turboProgress,
                            target: SCORE_CONFIG.turboThreshold
                        })}
                        aria-valuemin={0}
                        aria-valuemax={SCORE_CONFIG.turboThreshold}
                        aria-valuenow={turboProgress}
                    >
                        {Array.from({ length: SCORE_CONFIG.turboThreshold }, (_, index) => (
                            <span
                                key={index}
                                className={index < turboProgress ? 'filled' : ''}
                                aria-hidden="true"
                            />
                        ))}
                    </div>
                </div>
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
                {options.map((option, index) => (
                    <button
                        key={option.id}
                        className={`answer-button ${showFeedback && option.isCorrect ? 'correct-answer' : ''} ${showFeedback && option.id === selectedAnswerId && !option.isCorrect ? 'selected-wrong-answer' : ''} ${showFeedback && option.id !== selectedAnswerId && !option.isCorrect ? 'muted-answer' : ''}`}
                        onClick={() => onAnswer(option.id)}
                        disabled={disabled}
                        aria-keyshortcuts={`${index + 1}`}
                        aria-pressed={option.id === selectedAnswerId}
                    >
                        <span className="answer-shortcut" aria-hidden="true">{index + 1}</span>
                        <FractionDisplay fraction={option.fraction} />
                    </button>
                ))}
            </div>

            {showFeedback && (
                <div
                    className={`feedback-panel ${lastAnswerCorrect ? 'correct' : 'incorrect'}`}
                    role="status"
                    aria-live="polite"
                >
                    <div className="feedback-message">
                        {lastAnswerCorrect
                            ? `✅ ${t('games.fractionRace.correct')}`
                            : `❌ ${t('games.fractionRace.incorrect')}`
                        }
                    </div>
                    {scoreBreakdown && (
                        <div
                            className={`score-breakdown ${lastAnswerCorrect ? '' : 'no-score'}`}
                            aria-label={lastAnswerCorrect
                                ? t('games.fractionRace.scoreEarned', { points: scoreBreakdown.total })
                                : t('games.fractionRace.noPoints')}
                        >
                            {lastAnswerCorrect ? (
                                <>
                                    <span>✓ {t('games.fractionRace.baseScore')} +{scoreBreakdown.basePoints}</span>
                                    {scoreBreakdown.speedBonus > 0 && (
                                        <span>⚡ {t('games.fractionRace.speedScore')} +{scoreBreakdown.speedBonus}</span>
                                    )}
                                    {scoreBreakdown.comboBonus > 0 && (
                                        <span>🔥 {t('games.fractionRace.comboScore')} +{scoreBreakdown.comboBonus}</span>
                                    )}
                                    {scoreBreakdown.turboBonus > 0 && (
                                        <span>🚀 {t('games.fractionRace.turboScore')} +{scoreBreakdown.turboBonus}</span>
                                    )}
                                    <strong>+{scoreBreakdown.total} {t('games.fractionRace.pts')}</strong>
                                </>
                            ) : (
                                <>
                                    <strong>0 {t('games.fractionRace.pts')}</strong>
                                    {scoreBreakdown.comboReset && (
                                        <span>↺ {t('games.fractionRace.comboReset')}</span>
                                    )}
                                </>
                            )}
                        </div>
                    )}
                    <div className="feedback-answer-summary">
                        {selectedAnswer && (
                            <span>
                                {t('games.fractionRace.results.yourAnswer')}:{' '}
                                <FractionDisplay fraction={selectedAnswer.fraction} />
                            </span>
                        )}
                        {correctAnswer && (
                            <span>
                                {t('games.fractionRace.results.correctAnswer')}:{' '}
                                <FractionDisplay fraction={correctAnswer.fraction} />
                            </span>
                        )}
                    </div>
                    <p className="feedback-explanation">
                        {t(`games.fractionRace.explanations.${explanationKey}`)}
                    </p>
                    {errorCategory && (
                        <p className="error-insight">
                            💡 {t(`games.fractionRace.errorInsights.${errorCategory}`)}
                        </p>
                    )}
                    <button className="continue-button" onClick={onContinue} autoFocus>
                        {t(isLastQuestion
                            ? 'games.fractionRace.viewResults'
                            : 'games.fractionRace.continue')}
                    </button>
                </div>
            )}
        </section>
    )
}
