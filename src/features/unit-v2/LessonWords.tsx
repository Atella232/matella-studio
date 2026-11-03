import { useId, useState, type KeyboardEvent } from 'react'
import { MathText } from '../../components/MathText'
import { Icon } from './icons'
import { FitMath } from './LessonExtras'
import { pickMaybeText, pickText, type LessonWhy, type LocalizedText, type UnitLanguage } from './types'
import './LessonWords.css'

/* ==========================================================================
   The words of a lesson in the four languages (a student who studies in
   Basque can see how a word is said in Spanish, English or Arabic, and the
   other way round) and «Why does it work?», closed until it is opened.
   ========================================================================== */

/** Each language written in its own script and direction, so «الوتر» keeps its order inside a Basque page */
const languages: Array<{ code: UnitLanguage; name: string; dir: 'ltr' | 'rtl' }> = [
    { code: 'eu', name: 'Euskara', dir: 'ltr' },
    { code: 'es', name: 'Español', dir: 'ltr' },
    { code: 'en', name: 'English', dir: 'ltr' },
    { code: 'ar', name: 'العربية', dir: 'rtl' }
]

/** A word in the four languages, one line each; the language of the page goes first */
export function WordTranslations({ word, language, id }: { word: LocalizedText; language: UnitLanguage; id: string }) {
    const ordered = [...languages.filter((item) => item.code === language), ...languages.filter((item) => item.code !== language)]
    return (
        <ul className="lesson-word-panel" id={id}>
            {ordered.map((item) => (
                <li key={item.code} className={item.code === language ? 'current' : undefined}>
                    <span className="lesson-word-language" lang={item.code} dir={item.dir}>{item.name}</span>
                    <span className="lesson-word-text" lang={item.code} dir={item.dir}><MathText inline text={word[item.code]} /></span>
                </li>
            ))}
        </ul>
    )
}

/** A word that opens its translations; Esc closes them again */
export function WordButton({ word, language, open, panelId, onToggle }: {
    word: LocalizedText
    language: UnitLanguage
    open: boolean
    panelId: string
    onToggle: () => void
}) {
    const close = (event: KeyboardEvent) => {
        if (event.key === 'Escape' && open) {
            event.preventDefault()
            onToggle()
        }
    }
    return (
        <button type="button" className="lesson-word" aria-expanded={open} aria-controls={open ? panelId : undefined} onClick={onToggle} onKeyDown={close}>
            <MathText inline text={pickText(language, word)} />
            <Icon name="languages" size={15} strokeWidth={2.2} className="lesson-word-icon" />
        </button>
    )
}

/** Other key words of the lesson, as a row of buttons; one shows its translations at a time */
export function LessonVocabulary({ words, language }: { words: LocalizedText[]; language: UnitLanguage }) {
    const [open, setOpen] = useState<number | null>(null)
    const panelId = useId()
    return (
        <div className="lesson-vocabulary">
            <span className="lesson-vocabulary-label">{pickText(language, { eu: 'Hiztegia', es: 'Vocabulario', en: 'Vocabulary', ar: 'المفردات' })}</span>
            <div className="lesson-vocabulary-words">
                {words.map((word, index) => (
                    <WordButton key={index} word={word} language={language} open={open === index} panelId={panelId} onToggle={() => setOpen(open === index ? null : index)} />
                ))}
            </div>
            {open !== null && <WordTranslations word={words[open]} language={language} id={panelId} />}
        </div>
    )
}

/** «Why does it work?»: the reason behind the rule, folded so the lesson stays short */
export function LessonWhyBox({ why, language }: { why: LessonWhy; language: UnitLanguage }) {
    return (
        <details className="lesson-why">
            <summary>
                <Icon name="question" size={20} strokeWidth={2.2} />
                {pickText(language, { eu: 'Zergatik betetzen da?', es: '¿Por qué funciona?', en: 'Why does it work?', ar: 'لماذا يصح ذلك؟' })}
            </summary>
            <div className="lesson-why-body">
                <p><MathText text={pickText(language, why.text)} /></p>
                {why.math && <FitMath className="lesson-why-math" text={pickMaybeText(language, why.math)} />}
            </div>
        </details>
    )
}
