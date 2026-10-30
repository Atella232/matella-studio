import { MathText } from '../../components/MathText'
import { Icon } from './icons'
import { pickMaybeText, pickText, type LessonMistake, type LessonStep, type UnitLanguage } from './types'
import './LessonExtras.css'

/** The explanation split into cases: one card each, with its name, a short sentence and its formula */
export function LessonCases({ cases, language }: { cases: LessonStep[]; language: UnitLanguage }) {
    return (
        <ul className="lesson-cases">
            {cases.map((item, index) => (
                <li key={index}>
                    {item.title && <strong><MathText text={pickText(language, item.title)} /></strong>}
                    <p><MathText text={pickText(language, item.text)} /></p>
                    {item.math && <div className="lesson-cases-math"><MathText text={pickMaybeText(language, item.math)} /></div>}
                </li>
            ))}
        </ul>
    )
}

/** The typical mistake of the lesson: what is often written, crossed out, and the right way */
export function LessonMistakeBox({ mistake, language }: { mistake: LessonMistake; language: UnitLanguage }) {
    return (
        <aside className="lesson-mistake">
            <span className="lesson-mistake-label">{pickText(language, { eu: 'Ohiko akatsa', es: 'Error típico', en: 'Common mistake', ar: 'خطأ شائع' })}</span>
            <p className="lesson-mistake-wrong">
                <span className="lesson-mistake-mark" role="img" aria-label={pickText(language, { eu: 'Gaizki', es: 'Mal', en: 'Wrong', ar: 'خطأ' })}><Icon name="close" size={16} strokeWidth={3} /></span>
                <MathText text={pickText(language, mistake.wrong)} />
            </p>
            <p className="lesson-mistake-right">
                <span className="lesson-mistake-mark" role="img" aria-label={pickText(language, { eu: 'Ondo', es: 'Bien', en: 'Right', ar: 'صحيح' })}><Icon name="check" size={16} strokeWidth={3} /></span>
                <MathText text={pickText(language, mistake.right)} />
            </p>
        </aside>
    )
}
