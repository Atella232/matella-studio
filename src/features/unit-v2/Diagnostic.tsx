import { useState } from 'react'
import { MathText } from '../../components/MathText'
import { Icon } from './icons'
import { pickText, type LocalizedText, type UnitDefinition, type UnitLanguage } from './types'

export function DiagnosticQuiz({
    unit,
    answeredIds,
    correctIds,
    onAnswer,
    onRestart,
    language,
    onStartLearning
}: {
    unit: UnitDefinition
    answeredIds: number[]
    correctIds: number[]
    onAnswer: (id: number, correct: boolean) => void
    onRestart: () => void
    language: UnitLanguage
    onStartLearning: (topic: string) => void
}) {
    const l = (text: LocalizedText) => pickText(language, text)
    const questions = unit.diagnostic ?? []
    const firstPending = questions.findIndex((item) => !answeredIds.includes(item.id))
    const [questionIndex, setQuestionIndex] = useState(Math.max(0, firstPending))
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
    const [showResult, setShowResult] = useState(firstPending === -1)
    const question = questions[questionIndex]
    const isLast = questionIndex === questions.length - 1
    const answered = selectedIndex !== null
    const count = questions.length

    // One attempt per question: the diagnostic measures, it doesn't grade
    const choose = (index: number) => {
        if (answered) return
        setSelectedIndex(index)
        onAnswer(question.id, index === question.correctIndex)
    }

    const next = () => {
        if (isLast) {
            setShowResult(true)
            return
        }
        setQuestionIndex((index) => index + 1)
        setSelectedIndex(null)
    }

    const restart = () => {
        onRestart()
        setQuestionIndex(0)
        setSelectedIndex(null)
        setShowResult(false)
    }

    if (showResult) {
        const score = questions.filter((item) => correctIds.includes(item.id)).length
        const reviewTopics = questions
            .filter((item) => answeredIds.includes(item.id) && !correctIds.includes(item.id))
            .map((item) => item.topic)
            .filter((topic, index, topics) => topics.indexOf(topic) === index)
        const firstTopic = unit.topics.find((topic) => topic.id === reviewTopics[0]) ?? unit.topics[0]

        return (
            <section className="fraction-v2-diagnostic" aria-labelledby="fraction-v2-diagnostic-title">
                <div className="fraction-v2-page-intro">
                    <span>{l({ eu: 'DIAGNOSTIKOA OSATUTA', es: 'DIAGNÓSTICO COMPLETADO', ar: 'اكتمل التشخيص' })}</span>
                    <h1 id="fraction-v2-diagnostic-title">{l({ eu: 'Zure ibilbidea prest dago', es: 'Tu ruta está preparada', ar: 'مسارك جاهز' })}</h1>
                </div>
                <div className="fraction-v2-diagnostic-card">
                    <p className="fraction-v2-diagnostic-score">
                        <strong>{score}</strong>
                        <span>{l({ eu: `/ ${count} asmatuta`, es: `de ${count} correctas`, ar: `من ${count} صحيحة` })}</span>
                    </p>
                    {reviewTopics.length === 0 ? (
                        <p>{l({ eu: 'Hasierako ideia guztiak menderatzen dituzu. Hasi nahi duzun gaitik edo jarraitu ibilbideari hasieratik.', es: 'Dominas las ideas iniciales. Empieza por el tema que prefieras o sigue la ruta desde el principio.', ar: 'أنت متقن للأفكار الأولية. ابدأ بالموضوع الذي تفضله أو تابع المسار من البداية.' })}</p>
                    ) : (
                        <>
                            <p>{l({ eu: 'Erantzunen arabera, gai hauek berrikustea gomendatzen dizugu:', es: 'Según tus respuestas, te recomendamos repasar estos temas:', ar: 'استنادًا إلى إجاباتك، نوصيك بمراجعة هذه المواضيع:' })}</p>
                            <ul className="fraction-v2-review-list">
                                {reviewTopics.map((topicId) => {
                                    const topic = unit.topics.find((item) => item.id === topicId)
                                    const tone = unit.stages.find((stage) => stage.id === topic?.stage)?.tone
                                    return topic ? (
                                        <li key={topicId}>
                                            <button type="button" data-stage={topic.stage} data-tone={tone} onClick={() => onStartLearning(topic.id)}>
                                                <span aria-hidden="true" />
                                                {l(topic.title)}
                                                <Icon name="arrow" size={16} strokeWidth={2.4} className="fraction-v2-icon-flip" />
                                            </button>
                                        </li>
                                    ) : null
                                })}
                            </ul>
                        </>
                    )}
                    <div className="fraction-v2-diagnostic-actions">
                        <button type="button" className="fraction-v2-primary" onClick={() => onStartLearning(firstTopic.id)}>
                            {reviewTopics.length === 0
                                ? l({ eu: 'Hasi lehen ikasgaitik', es: 'Empezar por la primera lección', ar: 'ابدأ بالدرس الأول' })
                                : `${l({ eu: 'Hasi hemendik:', es: 'Empezar por:', ar: 'ابدأ بـ:' })} ${l(firstTopic.title)}`}
                        </button>
                        <button type="button" className="fraction-v2-secondary" onClick={restart}>{l({ eu: 'Errepikatu diagnostikoa', es: 'Repetir el diagnóstico', ar: 'أعد التشخيص' })}</button>
                    </div>
                </div>
            </section>
        )
    }

    return (
        <section className="fraction-v2-diagnostic" aria-labelledby="fraction-v2-diagnostic-title">
            <div className="fraction-v2-page-intro">
                <span>{l({ eu: `${count} GALDERA · PUNTUAZIORIK GABE`, es: `${count} PREGUNTAS · SIN NOTA`, ar: `${count} أسئلة · بلا علامة` })}</span>
                <h1 id="fraction-v2-diagnostic-title">{l({ eu: 'Aurkitu nondik hasi', es: 'Descubre por dónde empezar', ar: 'اكتشف من أين تبدأ' })}</h1>
                <p>{l({ eu: 'Ez da azterketa bat. Erantzun galdera bakoitza behin; zure erantzunek hurrengo urratsa aukeratzen lagunduko dute.', es: 'No es un examen. Responde cada pregunta una vez; tus respuestas ayudarán a elegir el siguiente paso.', ar: 'هذا ليس اختبارًا. أجب عن كل سؤال مرة واحدة؛ ستساعد إجاباتك على اختيار الخطوة التالية.' })}</p>
            </div>
            <article className="fraction-v2-diagnostic-card" aria-live="polite">
                <div className="fraction-v2-diagnostic-progress"><span style={{ width: `${((questionIndex + (answered ? 1 : 0)) / count) * 100}%` }} /></div>
                <small>{questionIndex + 1} / {count}</small>
                <h2><MathText text={l(question.prompt)} /></h2>
                <div className="fraction-v2-diagnostic-options">
                    {question.options.map((option, index) => {
                        const state = !answered ? '' : index === question.correctIndex ? 'success' : index === selectedIndex ? 'error' : ''
                        return (
                            <button type="button" aria-pressed={selectedIndex === index} className={state} disabled={answered} onClick={() => choose(index)} key={`${question.id}-${index}`}>
                                <span dir="ltr"><MathText text={l(option)} /></span>
                            </button>
                        )
                    })}
                </div>
                {answered && (
                    <div className={`fraction-v2-feedback ${selectedIndex === question.correctIndex ? 'success' : 'error'}`}>
                        <strong>{selectedIndex === question.correctIndex
                            ? l({ eu: 'Zuzena.', es: 'Correcto.', ar: 'صحيح.' })
                            : l({ eu: 'Ez da hori.', es: 'No es esa.', ar: 'ليست هذه.' })}</strong>
                        <MathText text={l(question.explanation)} />
                    </div>
                )}
                <button type="button" className="fraction-v2-primary" disabled={!answered} onClick={next}>
                    {isLast
                        ? l({ eu: 'Ikusi emaitza', es: 'Ver el resultado', ar: 'اعرض النتيجة' })
                        : l({ eu: 'Hurrengo galdera', es: 'Siguiente pregunta', ar: 'السؤال التالي' })}
                </button>
            </article>
        </section>
    )
}
