import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import './MissionPage.css'

interface Challenge {
    id: number
    title: string
    description: string
    options: string[]
    correctIndex: number
    successMessage: string
    errorMessage: string
    points: number
}

const getChallenges = (t: any): Challenge[] => [
    {
        id: 1,
        title: t('zenbakiNaturalak.erronkak.ch1.title'),
        description: t('zenbakiNaturalak.erronkak.ch1.description'),
        options: (t('zenbakiNaturalak.erronkak.ch1.options', { returnObjects: true }) as string[]),
        correctIndex: 1,
        successMessage: t('zenbakiNaturalak.erronkak.ch1.success'),
        errorMessage: t('zenbakiNaturalak.erronkak.ch1.error'),
        points: 10
    },
    {
        id: 2,
        title: t('zenbakiNaturalak.erronkak.ch2.title'),
        description: t('zenbakiNaturalak.erronkak.ch2.description'),
        options: (t('zenbakiNaturalak.erronkak.ch2.options', { returnObjects: true }) as string[]),
        correctIndex: 0,
        successMessage: t('zenbakiNaturalak.erronkak.ch2.success'),
        errorMessage: t('zenbakiNaturalak.erronkak.ch2.error'),
        points: 10
    },
    {
        id: 3,
        title: t('zenbakiNaturalak.erronkak.ch3.title'),
        description: t('zenbakiNaturalak.erronkak.ch3.description'),
        options: (t('zenbakiNaturalak.erronkak.ch3.options', { returnObjects: true }) as string[]),
        correctIndex: 0,
        successMessage: t('zenbakiNaturalak.erronkak.ch3.success'),
        errorMessage: t('zenbakiNaturalak.erronkak.ch3.error'),
        points: 15
    },
    {
        id: 4,
        title: t('zenbakiNaturalak.erronkak.ch4.title'),
        description: t('zenbakiNaturalak.erronkak.ch4.description'),
        options: (t('zenbakiNaturalak.erronkak.ch4.options', { returnObjects: true }) as string[]),
        correctIndex: 1,
        successMessage: t('zenbakiNaturalak.erronkak.ch4.success'),
        errorMessage: t('zenbakiNaturalak.erronkak.ch4.error'),
        points: 15
    },
    {
        id: 5,
        title: t('zenbakiNaturalak.erronkak.ch5.title'),
        description: t('zenbakiNaturalak.erronkak.ch5.description'),
        options: (t('zenbakiNaturalak.erronkak.ch5.options', { returnObjects: true }) as string[]),
        correctIndex: 1,
        successMessage: t('zenbakiNaturalak.erronkak.ch5.success'),
        errorMessage: t('zenbakiNaturalak.erronkak.ch5.error'),
        points: 15
    },
    {
        id: 6,
        title: t('zenbakiNaturalak.erronkak.ch6.title'),
        description: t('zenbakiNaturalak.erronkak.ch6.description'),
        options: (t('zenbakiNaturalak.erronkak.ch6.options', { returnObjects: true }) as string[]),
        correctIndex: 0,
        successMessage: t('zenbakiNaturalak.erronkak.ch6.success'),
        errorMessage: t('zenbakiNaturalak.erronkak.ch6.error'),
        points: 20
    },
    {
        id: 7,
        title: t('zenbakiNaturalak.erronkak.ch7.title'),
        description: t('zenbakiNaturalak.erronkak.ch7.description'),
        options: (t('zenbakiNaturalak.erronkak.ch7.options', { returnObjects: true }) as string[]),
        correctIndex: 1,
        successMessage: t('zenbakiNaturalak.erronkak.ch7.success'),
        errorMessage: t('zenbakiNaturalak.erronkak.ch7.error'),
        points: 20
    },
    {
        id: 8,
        title: t('zenbakiNaturalak.erronkak.ch8.title'),
        description: t('zenbakiNaturalak.erronkak.ch8.description'),
        options: (t('zenbakiNaturalak.erronkak.ch8.options', { returnObjects: true }) as string[]),
        correctIndex: 1,
        successMessage: t('zenbakiNaturalak.erronkak.ch8.success'),
        errorMessage: t('zenbakiNaturalak.erronkak.ch8.error'),
        points: 20
    },
    {
        id: 9,
        title: t('zenbakiNaturalak.erronkak.ch9.title'),
        description: t('zenbakiNaturalak.erronkak.ch9.description'),
        options: (t('zenbakiNaturalak.erronkak.ch9.options', { returnObjects: true }) as string[]),
        correctIndex: 2,
        successMessage: t('zenbakiNaturalak.erronkak.ch9.success'),
        errorMessage: t('zenbakiNaturalak.erronkak.ch9.error'),
        points: 30
    }
]

export function MissionPage() {
    const { t } = useTranslation()
    const [currentIndex, setCurrentIndex] = useState(0)
    const [selectedOption, setSelectedOption] = useState<number | null>(null)
    const [feedback, setFeedback] = useState<'idle' | 'success' | 'error'>('idle')
    const [completedChallenges, setCompletedChallenges] = useState<number[]>([])
    const [totalPoints, setTotalPoints] = useState(0)
    const [showSummary, setShowSummary] = useState(false)

    const allChallenges = getChallenges(t)
    const currentChallenge = allChallenges[currentIndex]
    const isCompleted = completedChallenges.includes(currentChallenge.id)

    const handleOptionSelect = (index: number) => {
        if (feedback !== 'idle') return
        setSelectedOption(index)
    }

    const handleCheck = () => {
        if (selectedOption === null || !currentChallenge) return
        if (selectedOption === currentChallenge.correctIndex) {
            setFeedback('success')
            if (!completedChallenges.includes(currentChallenge.id)) {
                setCompletedChallenges([...completedChallenges, currentChallenge.id])
                setTotalPoints(totalPoints + currentChallenge.points)
            }
        } else {
            setFeedback('error')
        }
    }

    const handleNext = () => {
        if (currentIndex < allChallenges.length - 1) {
            setCurrentIndex(currentIndex + 1)
            setSelectedOption(null)
            setFeedback('idle')
        } else {
            setShowSummary(true)
        }
    }

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1)
            setSelectedOption(null)
            setFeedback('idle')
        }
    }

    const handleRestart = () => {
        setCurrentIndex(0)
        setSelectedOption(null)
        setFeedback('idle')
        setCompletedChallenges([])
        setTotalPoints(0)
        setShowSummary(false)
    }

    if (showSummary) {
        const maxPoints = allChallenges.reduce((sum, c) => sum + c.points, 0)
        const percentage = Math.round((totalPoints / maxPoints) * 100)
        return (
            <div className="zn-mission-page">
                <div className="container">
                    <div className="zn-summary-card glass">
                        <div className="zn-summary-icon">🏆</div>
                        <h1>{t('zenbakiNaturalak.erronkak.title')}</h1>
                        <div className="zn-score-display">
                            <span className="zn-score-value">{totalPoints}</span>
                            <span className="zn-score-max">/ {maxPoints} pts</span>
                        </div>
                        <div className="zn-progress-bar-large">
                            <div
                                className="zn-progress-fill"
                                style={{ width: `${percentage}%` }}
                            />
                        </div>
                        <p className="zn-score-pct">{percentage}%</p>
                        <p className="zn-completed-msg">
                            {completedChallenges.length} / {allChallenges.length} {t('common.completed') || 'completados'}
                        </p>
                        <button onClick={handleRestart} className="btn btn-primary zn-restart-btn">
                            🔄 {t('common.restart') || 'Reiniciar'}
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="zn-mission-page">
            <div className="container">
                <header className="zn-mission-header">
                    <h1>🎯 {t('zenbakiNaturalak.erronkak.title')}</h1>
                    <div className="zn-points-display glass">
                        <span>🏆</span>
                        <span className="zn-points-value">{totalPoints}</span>
                        <span className="zn-points-label">pts</span>
                    </div>
                </header>

                {/* Progress dots */}
                <div className="zn-progress-dots">
                    {allChallenges.map((c, i) => (
                        <button
                            key={c.id}
                            className={`zn-dot ${i === currentIndex ? 'active' : ''} ${completedChallenges.includes(c.id) ? 'done' : ''}`}
                            onClick={() => {
                                setCurrentIndex(i)
                                setSelectedOption(null)
                                setFeedback('idle')
                            }}
                            aria-label={`Challenge ${i + 1}`}
                        />
                    ))}
                </div>

                {/* Challenge card */}
                <div className="zn-challenge-card glass">
                    <div className="zn-challenge-top">
                        <span className="zn-challenge-num">#{currentIndex + 1}</span>
                        <span className="zn-challenge-pts">+{currentChallenge.points} pts</span>
                        {isCompleted && <span className="zn-done-badge">✓</span>}
                    </div>

                    <h2 className="zn-challenge-title">{currentChallenge.title}</h2>
                    <p className="zn-challenge-desc">{currentChallenge.description}</p>

                    <div className="zn-options-grid">
                        {currentChallenge.options.map((option, i) => {
                            let cls = 'zn-option'
                            if (selectedOption === i) {
                                if (feedback === 'idle') cls += ' selected'
                                else if (feedback === 'success') cls += ' correct'
                                else cls += ' wrong'
                            }
                            if (feedback !== 'idle' && i === currentChallenge.correctIndex) {
                                cls += ' correct'
                            }
                            return (
                                <button
                                    key={i}
                                    className={cls}
                                    onClick={() => handleOptionSelect(i)}
                                    disabled={feedback !== 'idle'}
                                >
                                    <span className="zn-option-letter">{String.fromCharCode(65 + i)}</span>
                                    <span className="zn-option-text">{option}</span>
                                </button>
                            )
                        })}
                    </div>

                    {feedback !== 'idle' && (
                        <div className={`zn-feedback ${feedback}`} role="alert">
                            <span className="zn-feedback-icon">
                                {feedback === 'success' ? '🎉' : '❌'}
                            </span>
                            <p>
                                {feedback === 'success'
                                    ? currentChallenge.successMessage
                                    : currentChallenge.errorMessage}
                            </p>
                        </div>
                    )}

                    <div className="zn-actions">
                        <button
                            className="zn-btn-nav"
                            onClick={handlePrev}
                            disabled={currentIndex === 0}
                        >
                            ← {t('common.back') || 'Atrás'}
                        </button>

                        {feedback === 'idle' ? (
                            <button
                                className="btn btn-primary zn-check-btn"
                                onClick={handleCheck}
                                disabled={selectedOption === null}
                            >
                                {t('common.check') || 'Comprobar'}
                            </button>
                        ) : (
                            <button className="btn btn-primary zn-next-btn" onClick={handleNext}>
                                {currentIndex < allChallenges.length - 1
                                    ? (t('common.next') || 'Siguiente') + ' →'
                                    : '🏁 ' + (t('common.finish') || 'Finalizar')}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
