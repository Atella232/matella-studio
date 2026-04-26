import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { MathText } from '../../../components/MathText'
import { normalizeEkuazioakLang, pickText } from '../content'
import { ekuazioakExerciseSections } from '../exercisesData'
import '../../dbh2-algebra/ExercisesPage/ExercisesPage.css'

function getSectionBadge(sectionId: string) {
    switch (sectionId) {
        case 'significado': return '='
        case 'baliokideak': return '⇔'
        case 'lehen-maila': return 'x'
        case 'parentesiak': return '()'
        case 'izendatzaileak': return '⅓'
        case 'problemak': return '?'
        case 'bigarren-maila': return 'x²'
        default: return 'eq'
    }
}

export function ExercisesPage() {
    const { i18n } = useTranslation()
    const lang = normalizeEkuazioakLang(i18n.language)
    const [expandedSection, setExpandedSection] = useState<string>('significado')
    const [revealed, setRevealed] = useState<Record<string, boolean>>({})

    const labels = useMemo(
        () => ({
            pageTag: pickText(lang, { eu: 'Ariketak', es: 'Ejercicios', ar: 'التمارين' }),
            pageTitle: pickText(lang, { eu: 'Ekuazioak pausoz pauso praktikatu', es: 'Practica ecuaciones paso a paso', ar: 'تدرّب على المعادلات خطوة بخطوة' }),
            pageDescription: pickText(lang, {
                eu: '56 ariketa azpigaietan antolatuta: esanahia, baliokidetasuna, lehen maila, parentesiak, izendatzaileak, problemak eta bigarren maila.',
                es: '56 ejercicios organizados por subtemas: significado, equivalencia, primer grado, paréntesis, denominadores, problemas y segundo grado.',
                ar: '56 تمريناً مرتبة حسب الموضوع: المعنى، التكافؤ، الدرجة الأولى، الأقواس، المقامات، المسائل والدرجة الثانية.'
            }),
            sectionCount: pickText(lang, { eu: 'ariketa', es: 'ejercicios', ar: 'تمارين' }),
            exercise: pickText(lang, { eu: 'Ariketa', es: 'Ejercicio', ar: 'التمرين' }),
            reveal: pickText(lang, { eu: 'Soluzioa ikusi', es: 'Ver solución', ar: 'عرض الحل' }),
            hide: pickText(lang, { eu: 'Soluzioa ezkutatu', es: 'Ocultar solución', ar: 'إخفاء الحل' }),
            solution: pickText(lang, { eu: 'Irtenbidea', es: 'Solución', ar: 'الحل' }),
            easy: pickText(lang, { eu: 'Erraza', es: 'Fácil', ar: 'سهل' }),
            medium: pickText(lang, { eu: 'Ertaina', es: 'Media', ar: 'متوسط' }),
            hard: pickText(lang, { eu: 'Zaila', es: 'Difícil', ar: 'صعب' })
        }),
        [lang]
    )

    return (
        <div className="algebra-exercises-page">
            <div className="container exercises-shell">
                <header className="exercises-page-header">
                    <div className="section-tag">{labels.pageTag}</div>
                    <h1>{labels.pageTitle}</h1>
                    <p>{labels.pageDescription}</p>
                </header>

                <div className="exercise-group-list">
                    {ekuazioakExerciseSections.map((section) => {
                        const isOpen = expandedSection === section.id

                        return (
                            <section key={section.id} className={`exercise-group ${isOpen ? 'open' : ''}`}>
                                <button
                                    type="button"
                                    className="exercise-group-head"
                                    onClick={() => setExpandedSection(isOpen ? '' : section.id)}
                                >
                                    <div className="exercise-group-title">
                                        <span className="exercise-group-badge">{getSectionBadge(section.id)}</span>
                                        <div className="exercise-group-copy">
                                            <h2>{pickText(lang, section.title)}</h2>
                                            <p>{section.count} {labels.sectionCount}</p>
                                        </div>
                                    </div>
                                    <span className="exercise-group-arrow" aria-hidden="true">{isOpen ? '▲' : '▼'}</span>
                                </button>

                                {isOpen && (
                                    <div className="exercise-group-body">
                                        <div className="exercise-cards-grid">
                                            {section.items.map((item) => {
                                                const revealKey = `${section.id}-${item.id}`
                                                const isRevealed = Boolean(revealed[revealKey])
                                                const difficultyLabel = item.difficulty === 'easy' ? labels.easy : item.difficulty === 'medium' ? labels.medium : labels.hard

                                                return (
                                                    <article key={revealKey} className="exercise-item-card">
                                                        <div className="exercise-item-top">
                                                            <span className="exercise-item-number">{labels.exercise} {item.id}</span>
                                                            <span className={`exercise-item-level ${item.difficulty}`}>{difficultyLabel}</span>
                                                        </div>
                                                        <div className="exercise-item-question">
                                                            <MathText text={pickText(lang, item.question)} />
                                                        </div>
                                                        <button
                                                            type="button"
                                                            className="exercise-item-action"
                                                            onClick={() => setRevealed((current) => ({ ...current, [revealKey]: !current[revealKey] }))}
                                                        >
                                                            <span className="exercise-item-action-icon" aria-hidden="true">◉</span>
                                                            <span>{isRevealed ? labels.hide : labels.reveal}</span>
                                                        </button>
                                                        {isRevealed && (
                                                            <div className="exercise-item-solution">
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
