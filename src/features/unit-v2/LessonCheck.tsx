import { useState } from 'react'
import { MathText } from '../../components/MathText'
import { pickText, type LessonCheck, type LocalizedText, type UnitLanguage } from './types'
import './LessonCheck.css'

/**
 * «Check it»: the lesson's quick question, where «I understand» was. A wrong answer is crossed out and sends
 * the student back to the lesson (and to its typical mistake) without giving the answer away; the right one
 * shows why and marks the lesson as understood. Render it with the lesson id as key.
 */
export function LessonCheckCard({ check, language, learned, hasMistake, onPass }: {
    check: LessonCheck
    language: UnitLanguage
    /** Already understood when the lesson opened: the card is not shown again */
    learned: boolean
    hasMistake: boolean
    onPass: () => void
}) {
    const l = (text: LocalizedText) => pickText(language, text)
    const [wrong, setWrong] = useState<number[]>([])
    const [passed, setPassed] = useState(false)

    if (learned && !passed) return null

    const choose = (index: number) => {
        if (index === check.correctIndex) {
            setPassed(true)
            onPass()
        } else {
            setWrong((tried) => [...tried, index])
        }
    }

    const showMistake = () => {
        const box = document.querySelector<HTMLElement>('.fraction-v2-lesson .lesson-mistake')
        if (!box) return
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        box.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'center' })
    }

    return (
        <section className="lesson-check" aria-label={l({ eu: 'Egiaztatu', es: 'Compruébalo', en: 'Check it', ar: 'تحقّق' })}>
            <span className="lesson-check-label">{l({ eu: 'Egiaztatu', es: 'Compruébalo', en: 'Check it', ar: 'تحقّق' })}</span>
            <p className="lesson-check-prompt"><MathText text={l(check.prompt)} /></p>
            <div className="lesson-check-options">
                {check.options.map((option, index) => {
                    const state = wrong.includes(index) ? 'wrong' : passed && index === check.correctIndex ? 'right' : ''
                    return (
                        <button type="button" className={state} disabled={passed || wrong.includes(index)} onClick={() => choose(index)} key={index}>
                            <MathText text={l(option)} />
                        </button>
                    )
                })}
            </div>
            <div aria-live="polite">
                {passed ? (
                    <p className="lesson-check-feedback right">
                        <strong>{l({ eu: 'Bai, hori da!', es: '¡Eso es!', en: 'That\'s it!', ar: 'أحسنت!' })}</strong>{' '}
                        <MathText text={l(check.explanation)} />
                    </p>
                ) : wrong.length > 0 && (
                    <p className="lesson-check-feedback wrong">
                        {l({ eu: 'Ez da hori. Irakurri berriro ikasgaia, eta saiatu berriro.', es: 'No es eso. Vuelve a leer la lección e inténtalo otra vez.', en: 'That\'s not it. Read the lesson again and have another go.', ar: 'ليس هذا. أعد قراءة الدرس ثم حاول مرة أخرى.' })}
                        {hasMistake && (
                            <>
                                {' '}
                                <button type="button" className="lesson-check-link" onClick={showMistake}>
                                    {l({ eu: 'Ikusi ohiko akatsa', es: 'Ver el error típico', en: 'See the common mistake', ar: 'انظر الخطأ الشائع' })}
                                </button>
                            </>
                        )}
                    </p>
                )}
            </div>
        </section>
    )
}
