import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import './MissionPage.css'

type Difficulty = 'hasiberria' | 'aurreratua' | 'maisu'

interface Challenge {
    id: number
    difficulty: Difficulty
    title: string
    description: string
    hint: string
    validate: (answer: string) => boolean
    successMessage: string
    errorMessage: string
    points: number
}

const getChallenges = (t: any): Challenge[] => [
    // HASIBERRIA (Principiante) - 4 desafíos
    {
        id: 1,
        difficulty: 'hasiberria',
        title: t('missions.challenges.ch1.title'),
        description: t('missions.challenges.ch1.description'),
        hint: t('missions.challenges.ch1.hint'),
        validate: (ans) => ans === '18' || ans === '18 manzanas',
        successMessage: t('missions.challenges.ch1.success'),
        errorMessage: t('missions.challenges.ch1.error'),
        points: 10
    },
    {
        id: 2,
        difficulty: 'hasiberria',
        title: t('missions.challenges.ch2.title'),
        description: t('missions.challenges.ch2.description'),
        hint: t('missions.challenges.ch2.hint'),
        validate: (ans) => ans === '3/4' || ans === '0.75',
        successMessage: t('missions.challenges.ch2.success'),
        errorMessage: t('missions.challenges.ch2.error'),
        points: 10
    },
    {
        id: 3,
        difficulty: 'hasiberria',
        title: t('missions.challenges.ch3.title'),
        description: t('missions.challenges.ch3.description'),
        hint: t('missions.challenges.ch3.hint'),
        validate: (ans) => ans === '3/8',
        successMessage: t('missions.challenges.ch3.success'),
        errorMessage: t('missions.challenges.ch3.error'),
        points: 10
    },
    {
        id: 4,
        difficulty: 'hasiberria',
        title: t('missions.challenges.ch4.title'),
        description: t('missions.challenges.ch4.description'),
        hint: t('missions.challenges.ch4.hint'),
        validate: (ans) => ans === '3/4' || ans === '45/60',
        successMessage: t('missions.challenges.ch4.success'),
        errorMessage: t('missions.challenges.ch4.error'),
        points: 10
    },
    // AURRERATUA (Avanzado) - 4 desafíos
    {
        id: 5,
        difficulty: 'aurreratua',
        title: t('missions.challenges.ch5.title'),
        description: t('missions.challenges.ch5.description'),
        hint: t('missions.challenges.ch5.hint'),
        validate: (ans) => ans === '5/12',
        successMessage: t('missions.challenges.ch5.success'),
        errorMessage: t('missions.challenges.ch5.error'),
        points: 20
    },
    {
        id: 6,
        difficulty: 'aurreratua',
        title: t('missions.challenges.ch6.title'),
        description: t('missions.challenges.ch6.description'),
        hint: t('missions.challenges.ch6.hint'),
        validate: (ans) => {
            const normalized = ans.toLowerCase().replace(/\s+/g, '').replace('litros', '').replace('litro', '').replace('l', '')
            return normalized === '6000'
        },
        successMessage: t('missions.challenges.ch6.success'),
        errorMessage: t('missions.challenges.ch6.error'),
        points: 20
    },
    {
        id: 7,
        difficulty: 'aurreratua',
        title: t('missions.challenges.ch7.title'),
        description: t('missions.challenges.ch7.description'),
        hint: t('missions.challenges.ch7.hint'),
        validate: (ans) => ans === '3/5' || ans === '0.6',
        successMessage: t('missions.challenges.ch7.success'),
        errorMessage: t('missions.challenges.ch7.error'),
        points: 20
    },
    {
        id: 8,
        difficulty: 'aurreratua',
        title: t('missions.challenges.ch8.title'),
        description: t('missions.challenges.ch8.description'),
        hint: t('missions.challenges.ch8.hint'),
        validate: (ans) => ans === '35' || ans.toLowerCase().includes('35 min'),
        successMessage: t('missions.challenges.ch8.success'),
        errorMessage: t('missions.challenges.ch8.error'),
        points: 20
    },
    // MAISU (Experto) - 4 desafíos
    {
        id: 9,
        difficulty: 'maisu',
        title: t('missions.challenges.ch9.title'),
        description: t('missions.challenges.ch9.description'),
        hint: t('missions.challenges.ch9.hint'),
        validate: (ans) => ans === '3/4' || ans === '0.75',
        successMessage: t('missions.challenges.ch9.success'),
        errorMessage: t('missions.challenges.ch9.error'),
        points: 30
    },
    {
        id: 10,
        difficulty: 'maisu',
        title: t('missions.challenges.ch10.title'),
        description: t('missions.challenges.ch10.description'),
        hint: t('missions.challenges.ch10.hint'),
        validate: (ans) => ans === '90' || ans.toLowerCase().includes('90 min'),
        successMessage: t('missions.challenges.ch10.success'),
        errorMessage: t('missions.challenges.ch10.error'),
        points: 30
    },
    {
        id: 11,
        difficulty: 'maisu',
        title: t('missions.challenges.ch11.title'),
        description: t('missions.challenges.ch11.description'),
        hint: t('missions.challenges.ch11.hint'),
        validate: (ans) => ans === '1200' || ans.includes('1200'),
        successMessage: t('missions.challenges.ch11.success'),
        errorMessage: t('missions.challenges.ch11.error'),
        points: 30
    },
    {
        id: 12,
        difficulty: 'maisu',
        title: t('missions.challenges.ch12.title'),
        description: t('missions.challenges.ch12.description'),
        hint: t('missions.challenges.ch12.hint'),
        validate: (ans) => {
            const normalized = ans.toLowerCase().replace(/\s+/g, '').replace('litros', '').replace('litro', '').replace('l', '')
            return normalized === '6000'
        },
        successMessage: t('missions.challenges.ch12.success'),
        errorMessage: t('missions.challenges.ch12.error'),
        points: 40 // Increased for final boss
    }
]

const getDifficultyConfig = (t: any) => ({
    hasiberria: {
        label: t('missions.levels.hasiberria.label'),
        sublabel: t('missions.levels.hasiberria.sublabel'),
        icon: '🌱',
        color: '#22C55E',
        bgColor: '#DCFCE7'
    },
    aurreratua: {
        label: t('missions.levels.aurreratua.label'),
        sublabel: t('missions.levels.aurreratua.sublabel'),
        icon: '🔥',
        color: '#F59E0B',
        bgColor: '#FEF3C7'
    },
    maisu: {
        label: t('missions.levels.maisu.label'),
        sublabel: t('missions.levels.maisu.sublabel'),
        icon: '⭐',
        color: '#EF4444',
        bgColor: '#FEE2E2'
    }
})

export function MissionPage() {
    const { t } = useTranslation()
    const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | null>(null)
    const [currentChallenge, setCurrentChallenge] = useState<Challenge | null>(null)
    const [answer, setAnswer] = useState('')
    const [feedback, setFeedback] = useState<'idle' | 'success' | 'error'>('idle')
    const [showHint, setShowHint] = useState(false)
    const [completedChallenges, setCompletedChallenges] = useState<number[]>([])
    const [totalPoints, setTotalPoints] = useState(0)

    const allChallenges = getChallenges(t)

    const filteredChallenges = selectedDifficulty
        ? allChallenges.filter((c: Challenge) => c.difficulty === selectedDifficulty)
        : []

    const handleCheck = () => {
        if (!currentChallenge) return
        if (currentChallenge.validate(answer.trim())) {
            setFeedback('success')
            if (!completedChallenges.includes(currentChallenge.id)) {
                setCompletedChallenges([...completedChallenges, currentChallenge.id])
                setTotalPoints(totalPoints + currentChallenge.points)
            }
        } else {
            setFeedback('error')
        }
    }

    const handleSelectChallenge = (challenge: Challenge) => {
        setCurrentChallenge(challenge)
        setAnswer('')
        setFeedback('idle')
        setShowHint(false)
    }

    const handleBack = () => {
        if (currentChallenge) {
            setCurrentChallenge(null)
        } else {
            setSelectedDifficulty(null)
        }
        setAnswer('')
        setFeedback('idle')
        setShowHint(false)
    }

    const difficultyConfig = getDifficultyConfig(t)

    const getLevelProgress = (difficulty: Difficulty) => {
        const levelChallenges = allChallenges.filter((c: Challenge) => c.difficulty === difficulty)
        const completed = levelChallenges.filter((c: Challenge) => completedChallenges.includes(c.id)).length
        return { completed, total: levelChallenges.length }
    }

    // Vista de selección de nivel
    if (!selectedDifficulty) {
        return (
            <div className="mission-page">
                <div className="container">
                    <header className="mission-header">
                        <h1>🎯 {t('missions.title')}</h1>
                        <p className="mission-subtitle">{t('missions.subtitle')}</p>
                    </header>

                    <div className="points-display glass">
                        <span className="points-icon">🏆</span>
                        <span className="points-value">{totalPoints}</span>
                        <span className="points-label">{t('missions.points')}</span>
                    </div>

                    <div className="difficulty-grid">
                        {(Object.keys(difficultyConfig) as Difficulty[]).map((diff: Difficulty) => {
                            const config = difficultyConfig[diff]
                            const progress = getLevelProgress(diff)
                            return (
                                <button
                                    key={diff}
                                    className="difficulty-card glass"
                                    onClick={() => setSelectedDifficulty(diff)}
                                    style={{ '--level-color': config.color, '--level-bg': config.bgColor } as React.CSSProperties}
                                >
                                    <span className="difficulty-icon">{config.icon}</span>
                                    <h3>{config.label}</h3>
                                    <p className="difficulty-sublabel">{config.sublabel}</p>
                                    <div className="difficulty-progress">
                                        <div className="mini-progress-bar">
                                            <div
                                                className="mini-progress-fill"
                                                style={{ width: `${(progress.completed / progress.total) * 100}%` }}
                                            />
                                        </div>
                                        <span>{progress.completed}/{progress.total}</span>
                                    </div>
                                    {progress.completed === progress.total && progress.total > 0 && (
                                        <span className="level-complete-badge">{t('missions.levelCompleted')}</span>
                                    )}
                                </button>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }

    // Vista de lista de desafíos
    if (!currentChallenge) {
        const config = difficultyConfig[selectedDifficulty]
        return (
            <div className="mission-page">
                <div className="container">
                    <button className="back-button" onClick={handleBack}>
                        ← {t('common.back')}
                    </button>

                    <header className="mission-header level-header" style={{ '--level-color': config.color } as React.CSSProperties}>
                        <span className="level-icon">{config.icon}</span>
                        <h1>{config.label}</h1>
                        <p className="mission-subtitle">{config.sublabel}</p>
                    </header>

                    <div className="challenges-grid">
                        {filteredChallenges.map((challenge: Challenge, index: number) => {
                            const isCompleted = completedChallenges.includes(challenge.id)
                            return (
                                <button
                                    key={challenge.id}
                                    className={`challenge-card glass ${isCompleted ? 'completed' : ''}`}
                                    onClick={() => handleSelectChallenge(challenge)}
                                    style={{ '--level-color': config.color } as React.CSSProperties}
                                >
                                    <span className="challenge-number">{index + 1}</span>
                                    <h4>{challenge.title}</h4>
                                    <div className="challenge-meta">
                                        <span className="challenge-points">+{challenge.points} pts</span>
                                        {isCompleted && <span className="completed-check">✓</span>}
                                    </div>
                                </button>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }

    // Vista de desafío activo
    const config = difficultyConfig[currentChallenge.difficulty]
    return (
        <div className="mission-page">
            <div className="container">
                <button className="back-button" onClick={handleBack}>
                    ← {t('common.back')}
                </button>

                <div className="challenge-container glass" style={{ '--level-color': config.color } as React.CSSProperties}>
                    <div className="challenge-header">
                        <span className="challenge-difficulty-badge" style={{ background: config.bgColor, color: config.color }}>
                            {config.icon} {config.label}
                        </span>
                        <span className="challenge-points-badge">+{currentChallenge.points} pts</span>
                    </div>

                    <h2 className="challenge-title">{currentChallenge.title}</h2>
                    <p className="challenge-description">{currentChallenge.description}</p>

                    <div className="answer-section">
                        <input
                            type="text"
                            value={answer}
                            onChange={(e) => {
                                setAnswer(e.target.value)
                                setFeedback('idle')
                            }}
                            placeholder={t('missions.placeholder')}
                            className={`answer-input ${feedback !== 'idle' ? feedback : ''}`}
                            onKeyDown={(e) => e.key === 'Enter' && handleCheck()}
                        />
                        <button onClick={handleCheck} className="btn btn-primary check-btn">
                            {t('common.check')}
                        </button>
                    </div>

                    {feedback === 'success' && (
                        <div className="feedback success" role="alert">
                            <span className="feedback-icon">🎉</span>
                            <p>{currentChallenge.successMessage}</p>
                        </div>
                    )}

                    {feedback === 'error' && (
                        <div className="feedback error" role="alert">
                            <span className="feedback-icon">❌</span>
                            <p>{currentChallenge.errorMessage}</p>
                        </div>
                    )}

                    <button onClick={() => setShowHint(!showHint)} className="hint-toggle">
                        💡 {showHint ? t('common.hideHint') : t('common.showHint')}
                    </button>

                    {showHint && (
                        <div className="hint-box">
                            <p>{currentChallenge.hint}</p>
                        </div>
                    )}
                </div>

                {completedChallenges.includes(currentChallenge.id) && (
                    <div className="success-banner glass">
                        <span>🏆</span>
                        <p>{t('missions.completed')}</p>
                    </div>
                )}
            </div>
        </div>
    )
}
