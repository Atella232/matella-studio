import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { MathText } from '../../../components/MathText'
import {
    fractionExerciseSections,
    normalizeFractionLang,
    pickText,
    type ExerciseDifficulty
} from './exercisesData'
import { validateExerciseAnswer } from './exerciseValidation'
import './ExercisesPage.css'

type ExerciseFeedback = 'idle' | 'success' | 'error'

function getSectionBadge(sectionId: string) {
    switch (sectionId) {
        case 'representacion':
            return '½'
        case 'equivalentes':
            return '='
        case 'comparacion':
            return '<>'
        case 'suma-resta':
            return '+'
        case 'producto-division':
            return '×'
        case 'potencias':
            return 'a²'
        case 'problemas':
            return 'ctx'
        default:
            return 'fr'
    }
}

function getDifficultyLabel(difficulty: ExerciseDifficulty, labels: Record<ExerciseDifficulty, string>) {
    return labels[difficulty]
}

export function ExercisesPage() {
    const { i18n } = useTranslation()
    const lang = normalizeFractionLang(i18n.language)
    const [expandedSection, setExpandedSection] = useState<string>('representacion')
    const [revealed, setRevealed] = useState<Record<string, boolean>>({})
    const [answers, setAnswers] = useState<Record<string, string>>({})
    const [feedback, setFeedback] = useState<Record<string, ExerciseFeedback>>({})

    const labels = useMemo(
        () => ({
            pageTag: pickText(lang, { eu: 'Ariketak', es: 'Ejercicios', ar: 'التمارين' }),
            pageTitle: pickText(lang, {
                eu: 'Zatikiak urratsez urrats praktikatu',
                es: 'Practica fracciones paso a paso',
                ar: 'تدرّب على الكسور خطوة بخطوة'
            }),
            pageDescription: pickText(lang, {
                eu: 'DBH 2ko zatikiak azpigaitan eta mailatan antolatuta: kontzeptua, baliokidetasuna, konparazioa, eragiketak eta problemak.',
                es: 'Banco de ejercicios de fracciones para 2º ESO organizado por subtemas y niveles: concepto, equivalencia, comparación, operaciones y problemas.',
                ar: 'مجموعة تمارين الكسور للسنة الثانية مرتبة حسب المحاور والمستويات: المفهوم، التكافؤ، المقارنة، العمليات والمسائل.'
            }),
            sectionCount: pickText(lang, { eu: 'ariketa', es: 'ejercicios', ar: 'تمارين' }),
            exercise: pickText(lang, { eu: 'Ariketa', es: 'Ejercicio', ar: 'التمرين' }),
            reveal: pickText(lang, { eu: 'Soluzioa ikusi', es: 'Ver solución', ar: 'عرض الحل' }),
            hide: pickText(lang, { eu: 'Soluzioa ezkutatu', es: 'Ocultar solución', ar: 'إخفاء الحل' }),
            solution: pickText(lang, { eu: 'Irtenbidea', es: 'Solución', ar: 'الحل' }),
            answer: pickText(lang, { eu: 'Zure erantzuna', es: 'Tu respuesta', ar: 'إجابتك' }),
            answerPlaceholder: pickText(lang, {
                eu: 'Adib.: 3/4, 0,75 edo ordenatutako zerrenda',
                es: 'Ej.: 3/4, 0,75 o una lista ordenada',
                ar: 'مثال: 3/4 أو 0.75 أو قائمة مرتبة'
            }),
            check: pickText(lang, { eu: 'Egiaztatu', es: 'Comprobar', ar: 'تحقق' }),
            correct: pickText(lang, {
                eu: 'Zuzena. Jarraian prozedura ikus dezakezu.',
                es: 'Correcto. Puedes consultar el procedimiento debajo.',
                ar: 'صحيح. يمكنك مراجعة طريقة الحل أدناه.'
            }),
            incorrect: pickText(lang, {
                eu: 'Oraindik ez. Berrikusi ordena, zeinuak eta sinplifikazioa.',
                es: 'Todavía no. Revisa el orden, los signos y la simplificación.',
                ar: 'ليست صحيحة بعد. راجع الترتيب والإشارات والتبسيط.'
            }),
            difficulty: {
                easy: pickText(lang, { eu: 'Erraza', es: 'Fácil', ar: 'سهل' }),
                medium: pickText(lang, { eu: 'Ertaina', es: 'Media', ar: 'متوسط' }),
                hard: pickText(lang, { eu: 'Zaila', es: 'Difícil', ar: 'صعب' })
            }
        }),
        [lang]
    )

    const toggleSolution = (key: string) => {
        setRevealed((current) => ({ ...current, [key]: !current[key] }))
    }

    const checkAnswer = (sectionId: string, exerciseId: number, key: string) => {
        const isCorrect = validateExerciseAnswer(sectionId, exerciseId, answers[key] ?? '', lang)
        setFeedback((current) => ({ ...current, [key]: isCorrect ? 'success' : 'error' }))
        if (isCorrect) {
            setRevealed((current) => ({ ...current, [key]: true }))
        }
    }

    return (
        <div className="fraction-exercises-page">
            <div className="container exercises-shell">
                <header className="exercises-page-header">
                    <div className="section-tag">{labels.pageTag}</div>
                    <h1>{labels.pageTitle}</h1>
                    <p>{labels.pageDescription}</p>
                </header>

                <div className="exercise-group-list">
                    {fractionExerciseSections.map((section) => {
                        const isOpen = expandedSection === section.id
                        const badge = getSectionBadge(section.id)

                        return (
                            <section key={section.id} className={`exercise-group ${isOpen ? 'open' : ''}`}>
                                <button
                                    type="button"
                                    className="exercise-group-head"
                                    aria-expanded={isOpen}
                                    aria-controls={`exercise-section-${section.id}`}
                                    onClick={() => setExpandedSection(isOpen ? '' : section.id)}
                                >
                                    <div className="exercise-group-title">
                                        <span className="exercise-group-badge">{badge}</span>
                                        <div className="exercise-group-copy">
                                            <h2>{pickText(lang, section.title)}</h2>
                                            <p>{section.count} {labels.sectionCount}</p>
                                        </div>
                                    </div>
                                    <span className="exercise-group-arrow" aria-hidden="true">{isOpen ? '▲' : '▼'}</span>
                                </button>

                                {isOpen && (
                                    <div className="exercise-group-body" id={`exercise-section-${section.id}`}>
                                        <div className="exercise-cards-grid">
                                            {section.items.map((item) => {
                                                const revealKey = `${section.id}-${item.id}`
                                                const isRevealed = Boolean(revealed[revealKey])
                                                const answerFeedback = feedback[revealKey] ?? 'idle'

                                                return (
                                                    <article key={revealKey} className="exercise-item-card">
                                                        <div className="exercise-item-top">
                                                            <span className="exercise-item-number">{labels.exercise} {item.id}</span>
                                                            <span className={`exercise-item-level ${item.difficulty}`}>
                                                                {getDifficultyLabel(item.difficulty, labels.difficulty)}
                                                            </span>
                                                        </div>

                                                        <div className="exercise-item-question">
                                                            <MathText text={pickText(lang, item.question)} />
                                                        </div>

                                                        <div className="exercise-answer-block">
                                                            <label
                                                                className="exercise-answer-label"
                                                                htmlFor={`exercise-answer-${revealKey}`}
                                                            >
                                                                {labels.answer}
                                                            </label>
                                                            <div className="exercise-answer-row">
                                                                <input
                                                                    id={`exercise-answer-${revealKey}`}
                                                                    className={`exercise-answer-input ${answerFeedback}`}
                                                                    type="text"
                                                                    value={answers[revealKey] ?? ''}
                                                                    placeholder={labels.answerPlaceholder}
                                                                    autoComplete="off"
                                                                    onChange={(event) => {
                                                                        setAnswers((current) => ({
                                                                            ...current,
                                                                            [revealKey]: event.target.value
                                                                        }))
                                                                        setFeedback((current) => ({
                                                                            ...current,
                                                                            [revealKey]: 'idle'
                                                                        }))
                                                                    }}
                                                                    onKeyDown={(event) => {
                                                                        if (event.key === 'Enter') {
                                                                            checkAnswer(section.id, item.id, revealKey)
                                                                        }
                                                                    }}
                                                                />
                                                                <button
                                                                    type="button"
                                                                    className="exercise-answer-check"
                                                                    onClick={() => checkAnswer(section.id, item.id, revealKey)}
                                                                >
                                                                    {labels.check}
                                                                </button>
                                                            </div>
                                                            {answerFeedback !== 'idle' && (
                                                                <div
                                                                    className={`exercise-answer-feedback ${answerFeedback}`}
                                                                    role="status"
                                                                    aria-live="polite"
                                                                >
                                                                    <span aria-hidden="true">{answerFeedback === 'success' ? '✓' : '×'}</span>
                                                                    <span>{answerFeedback === 'success' ? labels.correct : labels.incorrect}</span>
                                                                </div>
                                                            )}
                                                        </div>

                                                        <button
                                                            type="button"
                                                            className="exercise-item-action"
                                                            aria-expanded={isRevealed}
                                                            aria-controls={`exercise-solution-${revealKey}`}
                                                            onClick={() => toggleSolution(revealKey)}
                                                        >
                                                            <span className="exercise-item-action-icon" aria-hidden="true">◉</span>
                                                            <span>{isRevealed ? labels.hide : labels.reveal}</span>
                                                        </button>

                                                        {isRevealed && (
                                                            <div
                                                                className="exercise-item-solution"
                                                                id={`exercise-solution-${revealKey}`}
                                                            >
                                                                <div className="exercise-item-solution-label">{labels.solution}</div>
                                                                <div className="exercise-item-solution-body">
                                                                    <MathText text={pickText(lang, item.solution)} />
                                                                </div>
                                                            </div>
                                                        )}
                                                    </article>
                                                )
                                            })}
                                        </div>
                                    </div>
                                )}
                            </section>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
