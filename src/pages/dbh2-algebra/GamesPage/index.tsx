import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { MathText } from '../../../components/MathText'
import { algebraQuizQuestions, normalizeAlgebraLang, pickText } from '../content'
import './GamesPage.css'

type Mode = 'mixed' | 'monomios' | 'polinomios'

export function GamesPage() {
    const { i18n } = useTranslation()
    const lang = normalizeAlgebraLang(i18n.language)
    const [mode, setMode] = useState<Mode>('mixed')
    const [index, setIndex] = useState(0)
    const [score, setScore] = useState(0)
    const [selected, setSelected] = useState<number | null>(null)

    const questions = useMemo(() => {
        return algebraQuizQuestions.filter((question) => mode === 'mixed' || question.category === mode)
    }, [mode])

    const current = questions[index % questions.length]

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

    const next = () => {
        setSelected(null)
        setIndex((value) => value + 1)
    }

    return (
        <div className="games-hub algebra-games">
            <div className="container">
                <div className="games-header">
                    <h1>🎮 {pickText(lang, { eu: 'Aljebraren Jokuak', es: 'Juegos de Álgebra', ar: 'ألعاب الجبر' })}</h1>
                    <p>{pickText(lang, { eu: 'Quiz azkarrak, blokez bloke. Jatorrizko proiektuko galderekin entrenatu.', es: 'Quizzes rápidos por bloques. Entrena con preguntas del proyecto original.', ar: 'اختبارات سريعة حسب الكتل. تدرب بأسئلة المشروع الأصلي.' })}</p>
                </div>

                <div className="games-grid">
                    {(['mixed', 'monomios', 'polinomios'] as Mode[]).map((item) => (
                        <button key={item} className={`game-card mode-card ${mode === item ? 'active' : ''}`} onClick={() => reset(item)}>
                            <div className="game-card-icon">{item === 'mixed' ? '🧠' : item === 'monomios' ? '🔷' : '📈'}</div>
                            <h2 className="game-card-title">{pickText(lang, { eu: item === 'mixed' ? 'Mix orokorra' : item === 'monomios' ? 'Monomioak' : 'Polinomioak', es: item === 'mixed' ? 'Modo mixto' : item === 'monomios' ? 'Monomios' : 'Polinomios', ar: item === 'mixed' ? 'الوضع المختلط' : item === 'monomios' ? 'الحدود الأحادية' : 'كثيرات الحدود' })}</h2>
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
                        <button className="btn btn-primary" onClick={next}>{pickText(lang, { eu: 'Hurrengoa', es: 'Siguiente', ar: 'التالي' })}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
