import { MathText } from '../../components/MathText'
import { Icon } from './icons'
import { LessonMistakeBox } from './LessonExtras'
import { LessonDefinitions } from './LessonTexts'
import { summaryTitle } from './routing'
import { pickText, type LocalizedText, type UnitDefinition, type UnitLanguage } from './types'
import './UnitSummary.css'

/**
 * The whole unit on one page, to revise or print: stage by stage, every lesson with its definitions, its key
 * idea and its typical mistake, when it has them. The example boxes stay in the lessons.
 */
export function UnitSummary({ unit, language, learnedIds, onOpenTopic }: {
    unit: UnitDefinition
    language: UnitLanguage
    learnedIds: string[]
    onOpenTopic: (id: string) => void
}) {
    const l = (text: LocalizedText) => pickText(language, text)
    return (
        <article className="unit-summary" aria-labelledby="unit-summary-title">
            <header className="unit-summary-head">
                <span className="unit-summary-unit">{l(unit.courseTitle)} · {l(unit.title)}</span>
                <h1 id="unit-summary-title">{l(summaryTitle)}</h1>
                <p>{l({ eu: 'Ikasgai guztien ideia nagusiak, errepasatzeko edo inprimatzeko.', es: 'Las ideas clave de todas las lecciones, para repasar o imprimir.', en: 'The key ideas of every lesson, to revise or print.', ar: 'الأفكار الأساسية لكل الدروس، للمراجعة أو الطباعة.' })}</p>
                <button type="button" className="fraction-v2-secondary unit-summary-print" onClick={() => window.print()}>
                    {l({ eu: 'Inprimatu', es: 'Imprimir', en: 'Print', ar: 'اطبع' })}
                </button>
            </header>
            {unit.stages.map((stage, stageIndex) => (
                <section className="unit-summary-stage" data-stage={stage.id} data-tone={stage.tone} key={stage.id}>
                    <h2><span className="unit-summary-stage-badge" aria-hidden="true">{stageIndex + 1}</span>{l(stage.title)}</h2>
                    <ol>
                        {unit.topics.map((topic, index) => topic.stage !== stage.id ? null : (
                            <li key={topic.id}>
                                <button type="button" className="unit-summary-lesson" onClick={() => onOpenTopic(topic.id)}>
                                    <span className="unit-summary-number">{index + 1}</span>
                                    <span className="unit-summary-lesson-title">{l(topic.title)}</span>
                                    {learnedIds.includes(topic.id) && <Icon name="check" size={16} strokeWidth={3} className="unit-summary-done" />}
                                </button>
                                {topic.definitions && <LessonDefinitions definitions={topic.definitions} language={language} />}
                                <p className="unit-summary-idea"><MathText text={l(topic.takeaway)} /></p>
                                {topic.mistake && <LessonMistakeBox mistake={topic.mistake} language={language} />}
                            </li>
                        ))}
                    </ol>
                </section>
            ))}
        </article>
    )
}
