import { useId, useState } from 'react'
import { MathText } from '../../components/MathText'
import { FitMath } from './LessonExtras'
import { WordButton, WordTranslations } from './LessonWords'
import { pickMaybeText, pickText, type LessonDefinition, type LocalizedText, type UnitLanguage } from './types'
import './LessonTexts.css'

/**
 * The new words of a lesson, each with what it means, highlighted before the explanation. In a lesson each
 * term is a button that shows it in the four languages; the summary page (static) shows it as text.
 */
export function LessonDefinitions({ definitions, language, translatable = false }: { definitions: LessonDefinition[]; language: UnitLanguage; translatable?: boolean }) {
    const [open, setOpen] = useState<number | null>(null)
    const panelId = useId()
    const label = definitions.length > 1
        ? { eu: 'Definizioak', es: 'Definiciones', en: 'Definitions', ar: 'التعريفات' }
        : { eu: 'Definizioa', es: 'Definición', en: 'Definition', ar: 'التعريف' }
    return (
        <aside className="lesson-definitions">
            <span className="lesson-definitions-label">{pickText(language, label)}</span>
            <dl>
                {definitions.map((definition, index) => (
                    <div key={index}>
                        <dt>
                            {translatable
                                ? <WordButton word={definition.term} language={language} open={open === index} panelId={panelId} onToggle={() => setOpen(open === index ? null : index)} />
                                : <MathText inline text={pickText(language, definition.term)} />}
                        </dt>
                        {open === index && <WordTranslations word={definition.term} language={language} id={panelId} />}
                        <dd><MathText inline text={pickText(language, definition.meaning)} /></dd>
                    </div>
                ))}
            </dl>
        </aside>
    )
}

/**
 * The example of the lesson as an exercise: its statement, the worked formula and, when it helps, the answer
 * in words. After «Let's solve» it is «Another example»; in a lesson without one it is the example.
 */
export function LessonExample({ prompt, example, answer, another, language }: {
    prompt: LocalizedText
    example: string | LocalizedText
    answer?: LocalizedText
    another: boolean
    language: UnitLanguage
}) {
    const label = another
        ? { eu: 'Beste adibide bat', es: 'Otro ejemplo', en: 'Another example', ar: 'مثال آخر' }
        : { eu: 'Adibidea', es: 'Ejemplo', en: 'Example', ar: 'مثال' }
    return (
        <figure className="lesson-example">
            <figcaption>
                <span className="lesson-example-label">{pickText(language, label)}</span>
                <MathText text={pickText(language, prompt)} />
            </figcaption>
            {/* An example about words (a sample, a misleading chart) has no formula: only its answer */}
            {pickMaybeText(language, example) && <FitMath className="fraction-v2-example" text={pickMaybeText(language, example)} />}
            {answer && <p className="lesson-example-answer"><MathText inline text={pickText(language, answer)} /></p>}
        </figure>
    )
}
