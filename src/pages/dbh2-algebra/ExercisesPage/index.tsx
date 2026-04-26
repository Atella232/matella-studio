import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { MathText } from '../../../components/MathText'
import { normalizeAlgebraLang, pickText } from '../content'
import { algebraExerciseSections } from '../exercisesData'
import './ExercisesPage.css'

function getSectionBadge(sectionId: string) {
    switch (sectionId) {
        case 'lenguaje':
            return 'abc'
        case 'monomios':
            return 'ax'
        case 'opmonomios':
            return '+x'
        case 'polinomios':
            return 'P'
        case 'oppolinomios':
            return 'P+'
        case 'notables':
            return 'x²'
        case 'factor':
            return 'fc'
        default:
            return 'ab'
    }
}

export function ExercisesPage() {
    const { i18n } = useTranslation()
    const lang = normalizeAlgebraLang(i18n.language)
    const [expandedSection, setExpandedSection] = useState<string>('lenguaje')
    const [revealed, setRevealed] = useState<Record<string, boolean>>({})

    const labels = useMemo(
        () => ({
            pageTag: pickText(lang, { eu: 'Ariketak', es: 'Ejercicios', ar: 'التمارين' }),
            pageTitle: pickText(lang, { eu: 'Praktikatu ebatzitako ariketekin', es: 'Practica con ejercicios resueltos', ar: 'تدرّب مع تمارين محلولة' }),
            pageDescription: pickText(lang, {
                eu: 'Algebra 2 DBH proiektuko ariketa guztiak gaietan antolatuta.',
                es: 'Todos los ejercicios del proyecto Algebra 2 DBH organizados por bloques.',
                ar: 'جميع تمارين مشروع Algebra 2 DBH مرتبة حسب الكتل.'
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

    const toggleSolution = (key: string) => {
        setRevealed((current) => ({ ...current, [key]: !current[key] }))
    }

    return (
        <div className="algebra-exercises-page">
            <div className="container exercises-shell">
                <header className="exercises-page-header">
                    <div className="section-tag">{labels.pageTag}</div>
                    <h1>{labels.pageTitle}</h1>
                    <p>{labels.pageDescription}</p>
                </header>

                <div className="exercise-group-list">
                    {algebraExerciseSections.map((section) => {
                        const isOpen = expandedSection === section.id
                        const badge = getSectionBadge(section.id)

                        return (
                            <section key={section.id} className={`exercise-group ${isOpen ? 'open' : ''}`}>
                                <button
                                    type="button"
                                    className="exercise-group-head"
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
                                    <div className="exercise-group-body">
                                        <div className="exercise-cards-grid">
                                            {section.items.map((item) => {
                                                const revealKey = `${section.id}-${item.id}`
                                                const isRevealed = Boolean(revealed[revealKey])
                                                const difficultyLabel = item.difficulty === 'easy'
                                                    ? labels.easy
                                                    : item.difficulty === 'medium'
                                                        ? labels.medium
                                                        : labels.hard

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
                                                            onClick={() => toggleSolution(revealKey)}
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
