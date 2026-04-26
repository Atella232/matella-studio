import { useState, type CSSProperties } from 'react'
import { useTranslation } from 'react-i18next'
import { MathText } from '../../../components/MathText'
import { ekuazioakMissions, normalizeEkuazioakLang, pickText, type Difficulty } from '../content'
import '../../dbh1-zatikiak/MissionPage/MissionPage.css'

const difficultyMeta = {
    hasiberria: { icon: '🌱', color: '#22C55E' },
    aurreratua: { icon: '🔥', color: '#F59E0B' },
    maisu: { icon: '⭐', color: '#EF4444' }
} as const

function normalizeAnswer(value: string) {
    return value.replace(/\s+/g, '').replace(/،/g, ',').toLowerCase()
}

export function MissionPage() {
    const { i18n } = useTranslation()
    const lang = normalizeEkuazioakLang(i18n.language)
    const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | null>(null)
    const [currentId, setCurrentId] = useState<number | null>(null)
    const [answer, setAnswer] = useState('')
    const [feedback, setFeedback] = useState<'idle' | 'success' | 'error'>('idle')
    const [showHint, setShowHint] = useState(false)
    const [completed, setCompleted] = useState<number[]>([])

    const currentChallenge = ekuazioakMissions.find((mission) => mission.id === currentId) ?? null
    const filtered = selectedDifficulty ? ekuazioakMissions.filter((mission) => mission.difficulty === selectedDifficulty) : []
    const totalPoints = completed.reduce((sum, id) => sum + (ekuazioakMissions.find((mission) => mission.id === id)?.points ?? 0), 0)

    if (!selectedDifficulty) {
        return (
            <div className="mission-page">
                <div className="container">
                    <header className="mission-header">
                        <h1>🎯 {pickText(lang, { eu: 'Ekuazioen Erronkak', es: 'Retos de Ecuaciones', ar: 'تحديات المعادلات' })}</h1>
                        <p className="mission-subtitle">{pickText(lang, { eu: 'Ebatzi, egiaztatu eta problemak ekuazio bihurtu hiru mailatan.', es: 'Resuelve, comprueba y convierte problemas en ecuaciones en tres niveles.', ar: 'حل وتحقق وحوّل المسائل إلى معادلات في ثلاثة مستويات.' })}</p>
                    </header>

                    <div className="points-display glass">
                        <span className="points-icon">🏆</span>
                        <span className="points-value">{totalPoints}</span>
                        <span className="points-label">{pickText(lang, { eu: 'puntu', es: 'puntos', ar: 'نقاط' })}</span>
                    </div>

                    <div className="difficulty-grid">
                        {(Object.keys(difficultyMeta) as Difficulty[]).map((difficulty) => {
                            const missions = ekuazioakMissions.filter((mission) => mission.difficulty === difficulty)
                            const done = missions.filter((mission) => completed.includes(mission.id)).length
                            return (
                                <button key={difficulty} className="difficulty-card glass" style={{ '--level-color': difficultyMeta[difficulty].color } as CSSProperties} onClick={() => setSelectedDifficulty(difficulty)}>
                                    <span className="difficulty-icon">{difficultyMeta[difficulty].icon}</span>
                                    <h3>{pickText(lang, { eu: difficulty === 'hasiberria' ? 'Hasiberria' : difficulty === 'aurreratua' ? 'Aurreratua' : 'Maisu', es: difficulty === 'hasiberria' ? 'Inicial' : difficulty === 'aurreratua' ? 'Avanzado' : 'Maestro', ar: difficulty === 'hasiberria' ? 'مبتدئ' : difficulty === 'aurreratua' ? 'متقدم' : 'خبير' })}</h3>
                                    <p className="difficulty-sublabel">{done}/{missions.length}</p>
                                </button>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }

    if (!currentChallenge) {
        return (
            <div className="mission-page">
                <div className="container">
                    <button className="back-button" onClick={() => setSelectedDifficulty(null)}>← {pickText(lang, { eu: 'Itzuli', es: 'Volver', ar: 'رجوع' })}</button>
                    <div className="challenges-grid">
                        {filtered.map((mission, index) => (
                            <button key={mission.id} className={`challenge-card glass ${completed.includes(mission.id) ? 'completed' : ''}`} style={{ '--level-color': difficultyMeta[mission.difficulty].color } as CSSProperties} onClick={() => { setCurrentId(mission.id); setAnswer(''); setFeedback('idle'); setShowHint(false) }}>
                                <span className="challenge-number">{index + 1}</span>
                                <h4>{pickText(lang, mission.title)}</h4>
                                <div className="challenge-meta"><span className="challenge-points">+{mission.points}</span>{completed.includes(mission.id) && <span className="completed-check">✓</span>}</div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        )
    }

    const check = () => {
        const normalized = normalizeAnswer(answer)
        if (currentChallenge.answer.some((candidate) => normalizeAnswer(candidate) === normalized)) {
            setFeedback('success')
            if (!completed.includes(currentChallenge.id)) setCompleted([...completed, currentChallenge.id])
        } else {
            setFeedback('error')
        }
    }

    return (
        <div className="mission-page">
            <div className="container">
                <button className="back-button" onClick={() => setCurrentId(null)}>← {pickText(lang, { eu: 'Erronketara', es: 'Retos', ar: 'التحديات' })}</button>
                <div className="challenge-container glass" style={{ '--level-color': difficultyMeta[currentChallenge.difficulty].color } as CSSProperties}>
                    <div className="challenge-header">
                        <span className="challenge-difficulty-badge">{difficultyMeta[currentChallenge.difficulty].icon}</span>
                        <span className="challenge-points-badge">+{currentChallenge.points}</span>
                    </div>
                    <h2 className="challenge-title">{pickText(lang, currentChallenge.title)}</h2>
                    <p className="challenge-description"><MathText text={pickText(lang, currentChallenge.description)} /></p>
                    <div className="answer-section">
                        <input className={`answer-input ${feedback !== 'idle' ? feedback : ''}`} value={answer} onChange={(event) => { setAnswer(event.target.value); setFeedback('idle') }} onKeyDown={(event) => event.key === 'Enter' && check()} />
                        <button onClick={check} className="btn btn-primary check-btn">{pickText(lang, { eu: 'Egiaztatu', es: 'Comprobar', ar: 'تحقق' })}</button>
                    </div>
                    {feedback === 'success' && <div className="feedback success"><span className="feedback-icon">🎉</span><p><MathText text={pickText(lang, currentChallenge.success)} /></p></div>}
                    {feedback === 'error' && <div className="feedback error"><span className="feedback-icon">❌</span><p><MathText text={pickText(lang, currentChallenge.error)} /></p></div>}
                    <button onClick={() => setShowHint(!showHint)} className="hint-toggle">💡 {pickText(lang, { eu: showHint ? 'Pista ezkutatu' : 'Pista ikusi', es: showHint ? 'Ocultar pista' : 'Ver pista', ar: showHint ? 'إخفاء التلميح' : 'عرض التلميح' })}</button>
                    {showHint && <div className="hint-box"><p><MathText text={pickText(lang, currentChallenge.hint)} /></p></div>}
                </div>
            </div>
        </div>
    )
}
