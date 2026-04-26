import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { MathText } from '../../../components/MathText'
import { ekuazioakQuizQuestions, normalizeEkuazioakLang, pickText } from '../content'
import '../../dbh2-algebra/GamesPage/GamesPage.css'
import './GamesPage.css'

type Mode = 'mixed' | 'lehen-maila' | 'problemak' | 'bigarren-maila'

export function GamesPage() {
    const { i18n } = useTranslation()
    const lang = normalizeEkuazioakLang(i18n.language)
    const [mode, setMode] = useState<Mode>('mixed')
    const [index, setIndex] = useState(0)
    const [score, setScore] = useState(0)
    const [selected, setSelected] = useState<number | null>(null)

    const questions = useMemo(() => {
        return ekuazioakQuizQuestions.filter((question) => mode === 'mixed' || question.category === mode || question.category === 'mixed')
    }, [mode])

    const current = questions[index % questions.length]
    const modeIcon = (item: Mode) => {
        if (item === 'mixed') return '🧠'
        if (item === 'lehen-maila') return '🔎'
        if (item === 'problemak') return '📝'
        return '📈'
    }

    const reset = (nextMode: Mode) => {
        setMode(nextMode)
        setIndex(0)
        setScore(0)
        setSelected(null)
    }

    const answer = (option: number) => {
        if (selected !== null) return
        setSelected(option)
        if (option === current.answer) setScore((value) => value + 1)
    }

    return (
        <div className="games-hub algebra-games ekuazioak-games">
            <div className="container">
                <div className="games-header">
                    <h1>🎮 {pickText(lang, { eu: 'Ekuazioen Jokuak', es: 'Juegos de Ecuaciones', ar: 'ألعاب المعادلات' })}</h1>
                    <p>{pickText(lang, { eu: 'Quiz azkarrak: lehen maila, problemak eta bigarren maila.', es: 'Quizzes rápidos: primer grado, problemas y segundo grado.', ar: 'اختبارات سريعة: الدرجة الأولى والمسائل والدرجة الثانية.' })}</p>
                </div>

                <div className="games-grid">
                    {(['mixed', 'lehen-maila', 'problemak', 'bigarren-maila'] as Mode[]).map((item) => (
                        <button key={item} className={`game-card mode-card ${mode === item ? 'active' : ''}`} onClick={() => reset(item)}>
                            <div className="game-card-icon">{modeIcon(item)}</div>
                            <h2 className="game-card-title">{pickText(lang, {
                                eu: item === 'mixed' ? 'Mix orokorra' : item === 'lehen-maila' ? 'Lehen maila' : item === 'problemak' ? 'Problemak' : 'Bigarren maila',
                                es: item === 'mixed' ? 'Modo mixto' : item === 'lehen-maila' ? 'Primer grado' : item === 'problemak' ? 'Problemas' : 'Segundo grado',
                                ar: item === 'mixed' ? 'الوضع المختلط' : item === 'lehen-maila' ? 'الدرجة الأولى' : item === 'problemak' ? 'المسائل' : 'الدرجة الثانية'
                            })}</h2>
                        </button>
                    ))}
                </div>

                <div className="quiz-shell">
                    <div className="quiz-meta">
                        <span>{pickText(lang, { eu: 'Puntuazioa', es: 'Puntuación', ar: 'النتيجة' })}: {score}</span>
                        <span>{index + 1}/{questions.length}</span>
                    </div>
                    <div className="quiz-question">
                        <MathText text={pickText(lang, current.question)} />
                    </div>
                    <div className="quiz-options">
                        {current.options.map((option, optionIndex) => (
                            <button key={optionIndex} className={`quiz-option ${selected === optionIndex ? (optionIndex === current.answer ? 'correct' : 'wrong') : ''}`} onClick={() => answer(optionIndex)}>
                                <MathText text={pickText(lang, option)} />
                            </button>
                        ))}
                    </div>
                    <div className="quiz-actions">
                        <button className="btn btn-primary" onClick={() => { setSelected(null); setIndex((value) => value + 1) }}>{pickText(lang, { eu: 'Hurrengoa', es: 'Siguiente', ar: 'التالي' })}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
