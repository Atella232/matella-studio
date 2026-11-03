import { MathText } from '../../components/MathText'
import { FitMath } from './LessonExtras'
import { pickMaybeText, pickText, type LessonDefinition, type LocalizedText, type UnitLanguage } from './types'
import './LessonTexts.css'

/** The new words of a lesson, each with what it means, highlighted before the explanation */
export function LessonDefinitions({ definitions, language }: { definitions: LessonDefinition[]; language: UnitLanguage }) {
    const label = definitions.length > 1
        ? { eu: 'Definizioak', es: 'Definiciones', en: 'Definitions', ar: 'التعريفات' }
        : { eu: 'Definizioa', es: 'Definición', en: 'Definition', ar: 'التعريف' }
    return (
        <aside className="lesson-definitions">
            <span className="lesson-definitions-label">{pickText(language, label)}</span>
            <dl>
                {definitions.map((definition, index) => (
                    <div key={index}>
                        <dt><MathText inline text={pickText(language, definition.term)} /></dt>
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
            <FitMath className="fraction-v2-example" text={pickMaybeText(language, example)} />
            {answer && <p className="lesson-example-answer"><MathText inline text={pickText(language, answer)} /></p>}
        </figure>
    )
}
