import { useEffect, useState, type CSSProperties, type KeyboardEvent as ReactKeyboardEvent } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { MathText } from '../../components/MathText'
import {
    challenges,
    diagnosticQuestions,
    equivalenceRounds,
    guidedPractice,
    learningStages,
    memoryCardsSource,
    pizzaRounds,
    raceRounds,
    theoryTopics,
    normalizePrototypeLanguage,
    pickText,
    prototypeSections,
    type ChallengeItem,
    type LocalizedText,
    type MemoryCardData,
    type PracticeItem,
    type PrototypeSection,
    type TheoryTopicId
} from './content'
import {
    fractionExerciseSections,
    type ExerciseDifficulty
} from '../dbh2-zatikiak/ExercisesPage/exercisesData'
import {
    answerEquals,
    checkAnswer,
    equals,
    toLatex,
    type FractionValue
} from './math/fraction'
import {
    gameModeForPath,
    practiceModeForPath,
    sectionForPath,
    type GameMode,
    type PracticeMode
} from './routing'
import { Icon } from './icons'
import { FractionLaboratory } from './lab'
import { labChallengeIds, labToolForTopic, labTools, type LabToolId } from './lab/labTools'
import './PrototypePage.css'

type Feedback = 'idle' | 'success' | 'error'
type TaskFeedback = Feedback | 'wrong-form' | 'unreadable'

function isChallengeItem(item: PracticeItem): item is ChallengeItem {
    return 'points' in item && typeof item.points === 'number'
}

function handleTabArrow(event: ReactKeyboardEvent<HTMLButtonElement>) {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return
    const buttons = Array.from(event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>('[role="tab"]') ?? [])
    const currentIndex = buttons.indexOf(event.currentTarget)
    if (currentIndex < 0 || buttons.length === 0) return
    event.preventDefault()
    const isRtl = document.documentElement.dir === 'rtl'
    let nextIndex = currentIndex
    if (event.key === 'Home') nextIndex = 0
    else if (event.key === 'End') nextIndex = buttons.length - 1
    else {
        const forward = event.key === 'ArrowRight' ? !isRtl : isRtl
        nextIndex = (currentIndex + (forward ? 1 : -1) + buttons.length) % buttons.length
    }
    buttons[nextIndex].focus()
    buttons[nextIndex].click()
}

function DiagnosticQuiz({
    answeredIds,
    correctIds,
    onAnswer,
    onRestart,
    language,
    onStartLearning
}: {
    answeredIds: number[]
    correctIds: number[]
    onAnswer: (id: number, correct: boolean) => void
    onRestart: () => void
    language: ReturnType<typeof normalizePrototypeLanguage>
    onStartLearning: (topic: TheoryTopicId) => void
}) {
    const l = (text: LocalizedText) => pickText(language, text)
    const firstPending = diagnosticQuestions.findIndex((item) => !answeredIds.includes(item.id))
    const [questionIndex, setQuestionIndex] = useState(Math.max(0, firstPending))
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
    const [showResult, setShowResult] = useState(firstPending === -1)
    const question = diagnosticQuestions[questionIndex]
    const isLast = questionIndex === diagnosticQuestions.length - 1
    const answered = selectedIndex !== null

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
        const score = diagnosticQuestions.filter((item) => correctIds.includes(item.id)).length
        const reviewTopics = diagnosticQuestions
            .filter((item) => answeredIds.includes(item.id) && !correctIds.includes(item.id))
            .map((item) => item.topic)
            .filter((topic, index, topics) => topics.indexOf(topic) === index)
        const firstTopic = theoryTopics.find((topic) => topic.id === (reviewTopics[0] ?? 'meaning')) ?? theoryTopics[0]

        return (
            <section className="fraction-v2-diagnostic" aria-labelledby="fraction-v2-diagnostic-title">
                <div className="fraction-v2-page-intro">
                    <span>{l({ eu: 'DIAGNOSTIKOA OSATUTA', es: 'DIAGNÓSTICO COMPLETADO', ar: 'اكتمل التشخيص' })}</span>
                    <h1 id="fraction-v2-diagnostic-title">{l({ eu: 'Zure ibilbidea prest dago', es: 'Tu ruta está preparada', ar: 'مسارك جاهز' })}</h1>
                </div>
                <div className="fraction-v2-diagnostic-card">
                    <p className="fraction-v2-diagnostic-score">
                        <strong>{score}</strong>
                        <span>{l({ eu: `/ ${diagnosticQuestions.length} asmatuta`, es: `de ${diagnosticQuestions.length} correctas`, ar: `من ${diagnosticQuestions.length} صحيحة` })}</span>
                    </p>
                    {reviewTopics.length === 0 ? (
                        <p>{l({ eu: 'Hasierako ideia guztiak menderatzen dituzu. Hasi nahi duzun gaitik edo jarraitu ibilbideari hasieratik.', es: 'Dominas las ideas iniciales. Empieza por el tema que prefieras o sigue la ruta desde el principio.', ar: 'أنت متقن للأفكار الأولية. ابدأ بالموضوع الذي تفضله أو تابع المسار من البداية.' })}</p>
                    ) : (
                        <>
                            <p>{l({ eu: 'Erantzunen arabera, gai hauek berrikustea gomendatzen dizugu:', es: 'Según tus respuestas, te recomendamos repasar estos temas:', ar: 'استنادًا إلى إجاباتك، نوصيك بمراجعة هذه المواضيع:' })}</p>
                            <ul className="fraction-v2-review-list">
                                {reviewTopics.map((topicId) => {
                                    const topic = theoryTopics.find((item) => item.id === topicId)
                                    return topic ? (
                                        <li key={topicId}>
                                            <button type="button" data-stage={topic.stage} onClick={() => onStartLearning(topic.id)}>
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
                <span>{l({ eu: '6 GALDERA · PUNTUAZIORIK GABE', es: '6 PREGUNTAS · SIN NOTA', ar: '6 أسئلة · بلا علامة' })}</span>
                <h1 id="fraction-v2-diagnostic-title">{l({ eu: 'Aurkitu nondik hasi', es: 'Descubre por dónde empezar', ar: 'اكتشف من أين تبدأ' })}</h1>
                <p>{l({ eu: 'Ez da azterketa bat. Erantzun galdera bakoitza behin; zure erantzunek hurrengo urratsa aukeratzen lagunduko dute.', es: 'No es un examen. Responde cada pregunta una vez; tus respuestas ayudarán a elegir el siguiente paso.', ar: 'هذا ليس اختبارًا. أجب عن كل سؤال مرة واحدة؛ ستساعد إجاباتك على اختيار الخطوة التالية.' })}</p>
            </div>
            <article className="fraction-v2-diagnostic-card" aria-live="polite">
                <div className="fraction-v2-diagnostic-progress"><span style={{ width: `${((questionIndex + (answered ? 1 : 0)) / diagnosticQuestions.length) * 100}%` }} /></div>
                <small>{questionIndex + 1} / {diagnosticQuestions.length}</small>
                <h2>{l(question.prompt)}</h2>
                <div className="fraction-v2-diagnostic-options">
                    {question.options.map((option, index) => {
                        const state = !answered ? '' : index === question.correctIndex ? 'success' : index === selectedIndex ? 'error' : ''
                        return (
                            <button type="button" aria-pressed={selectedIndex === index} className={state} disabled={answered} onClick={() => choose(index)} key={`${question.id}-${index}`}>
                                <span dir="ltr">{l(option)}</span>
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

function PracticeArea({
    language,
    initialMode,
    guidedCompletedIds,
    onGuidedComplete,
    bankCompletedIds,
    onBankComplete
}: {
    language: ReturnType<typeof normalizePrototypeLanguage>
    initialMode: PracticeMode
    guidedCompletedIds: number[]
    onGuidedComplete: (id: number) => void
    bankCompletedIds: number[]
    onBankComplete: (id: number) => void
}) {
    const l = (text: LocalizedText) => pickText(language, text)
    const [mode, setMode] = useState<PracticeMode>(initialMode)

    return (
        <div className="fraction-v2-practice-area">
            <div className="fraction-v2-practice-switch" role="tablist" aria-label={l({ eu: 'Praktika mota', es: 'Tipo de práctica', ar: 'نوع التدريب' })}>
                <button type="button" role="tab" id="fraction-v2-practice-guided-tab" aria-controls="fraction-v2-practice-panel" aria-selected={mode === 'guided'} className={mode === 'guided' ? 'active' : ''} onKeyDown={handleTabArrow} onClick={() => setMode('guided')}>
                    {l({ eu: 'Praktika gidatua', es: 'Práctica guiada', ar: 'تدريب موجّه' })} · {guidedPractice.length}
                </button>
                <button type="button" role="tab" id="fraction-v2-practice-bank-tab" aria-controls="fraction-v2-practice-panel" aria-selected={mode === 'bank'} className={mode === 'bank' ? 'active' : ''} onKeyDown={handleTabArrow} onClick={() => setMode('bank')}>
                    {l({ eu: 'Ariketa-bankua', es: 'Banco de ejercicios', ar: 'بنك التمارين' })} · 42
                </button>
            </div>
            <div id="fraction-v2-practice-panel" role="tabpanel" aria-labelledby={`fraction-v2-practice-${mode}-tab`}>
            {mode === 'guided' ? (
                <PracticeDeck
                    items={guidedPractice}
                    completedIds={guidedCompletedIds}
                    onComplete={onGuidedComplete}
                    language={language}
                />
            ) : (
                <ExerciseBank
                    completedIds={bankCompletedIds}
                    onComplete={onBankComplete}
                    language={language}
                />
            )}
            </div>
        </div>
    )
}

function ExerciseBank({
    completedIds,
    onComplete,
    language
}: {
    completedIds: number[]
    onComplete: (id: number) => void
    language: ReturnType<typeof normalizePrototypeLanguage>
}) {
    const l = (text: LocalizedText) => pickText(language, text)
    const [sectionId, setSectionId] = useState(fractionExerciseSections[0].id)
    const [difficulty, setDifficulty] = useState<'all' | ExerciseDifficulty>('all')
    const [attempts, setAttempts] = useState<Record<string, string>>({})
    const [revealed, setRevealed] = useState<string[]>([])
    const sectionIndex = fractionExerciseSections.findIndex((section) => section.id === sectionId)
    const section = fractionExerciseSections[sectionIndex] ?? fractionExerciseSections[0]
    const items = section.items.filter((item) => difficulty === 'all' || item.difficulty === difficulty)
    const exerciseProgressId = (itemId: number) => sectionIndex * 100 + itemId

    const difficultyLabel: Record<'all' | ExerciseDifficulty, LocalizedText> = {
        all: { eu: 'Guztiak', es: 'Todas', ar: 'الكل' },
        easy: { eu: 'Oinarrizkoa', es: 'Básica', ar: 'أساسي' },
        medium: { eu: 'Ertaina', es: 'Media', ar: 'متوسط' },
        hard: { eu: 'Sakontzea', es: 'Profundización', ar: 'متقدم' }
    }

    return (
        <section className="fraction-v2-bank" aria-labelledby="fraction-v2-bank-title">
            <div className="fraction-v2-page-intro">
                <span>{l({ eu: '42 ARIKETA', es: '42 EJERCICIOS', ar: '42 تمرينًا' })}</span>
                <h1 id="fraction-v2-bank-title">{l({ eu: 'Praktikatu gai eta zailtasunaren arabera', es: 'Practica por tema y dificultad', ar: 'تدرّب حسب الموضوع والصعوبة' })}</h1>
                <p>{l({ eu: 'Lehenik idatzi zure saiakera. Ondoren alderatu urratsez urratseko ebazpenarekin eta markatu lortu duzun.', es: 'Escribe primero tu intento. Después compáralo con la resolución y marca si lo has conseguido.', ar: 'اكتب محاولتك أولًا، ثم قارنها بالحل وحدد إن كنت قد أتقنتها.' })}</p>
            </div>

            <div className="fraction-v2-bank-toolbar">
                <label htmlFor="fraction-v2-bank-section">{l({ eu: 'Gaia', es: 'Tema', ar: 'الموضوع' })}</label>
                <select id="fraction-v2-bank-section" value={sectionId} onChange={(event) => setSectionId(event.target.value)}>
                    {fractionExerciseSections.map((item) => <option value={item.id} key={item.id}>{item.title[language]}</option>)}
                </select>
                <div className="fraction-v2-difficulty-filter" aria-label={l({ eu: 'Zailtasuna', es: 'Dificultad', ar: 'الصعوبة' })}>
                    {(Object.keys(difficultyLabel) as Array<'all' | ExerciseDifficulty>).map((level) => (
                        <button type="button" aria-pressed={difficulty === level} onClick={() => setDifficulty(level)} key={level}>{l(difficultyLabel[level])}</button>
                    ))}
                </div>
                <strong>{completedIds.length} / 42</strong>
            </div>

            <div className="fraction-v2-bank-grid">
                {items.map((item) => {
                    const key = `${section.id}-${item.id}`
                    const progressId = exerciseProgressId(item.id)
                    const hasAttempt = Boolean(attempts[key]?.trim())
                    const isRevealed = revealed.includes(key)
                    const isComplete = completedIds.includes(progressId)
                    return (
                        <article className={`fraction-v2-bank-card ${isComplete ? 'complete' : ''}`} key={key}>
                            <div className="fraction-v2-bank-card-meta">
                                <span>{item.id}</span>
                                <em>{l(difficultyLabel[item.difficulty])}</em>
                                {isComplete && <strong>✓</strong>}
                            </div>
                            <div className="fraction-v2-bank-question"><MathText text={item.question[language]} /></div>
                            <label htmlFor={`fraction-v2-bank-attempt-${key}`}>{l({ eu: 'Zure saiakera', es: 'Tu intento', ar: 'محاولتك' })}</label>
                            <textarea
                                id={`fraction-v2-bank-attempt-${key}`}
                                rows={2}
                                value={attempts[key] ?? ''}
                                onChange={(event) => setAttempts((state) => ({ ...state, [key]: event.target.value }))}
                                placeholder={l({ eu: 'Idatzi emaitza edo arrazoibidea…', es: 'Escribe el resultado o razonamiento…', ar: 'اكتب النتيجة أو الاستدلال…' })}
                            />
                            <button
                                type="button"
                                className="fraction-v2-hint-button"
                                disabled={!hasAttempt}
                                aria-expanded={isRevealed}
                                onClick={() => setRevealed((keys) => keys.includes(key) ? keys.filter((itemKey) => itemKey !== key) : [...keys, key])}
                            >
                                {isRevealed ? l({ eu: 'Ebazpena ezkutatu', es: 'Ocultar resolución', ar: 'إخفاء الحل' }) : l({ eu: 'Ebazpena alderatu', es: 'Comparar con la resolución', ar: 'قارن بالحل' })}
                            </button>
                            {!hasAttempt && <small>{l({ eu: 'Ebazpena ikusi aurretik saiakera bat idatzi.', es: 'Escribe un intento antes de ver la resolución.', ar: 'اكتب محاولة قبل عرض الحل.' })}</small>}
                            {isRevealed && (
                                <div className="fraction-v2-bank-solution">
                                    <MathText text={item.solution[language]} />
                                    <div>
                                        <button type="button" className={`fraction-v2-primary ${isComplete ? 'done' : ''}`} onClick={() => onComplete(progressId)} disabled={isComplete}>{isComplete ? '✓' : l({ eu: 'Lortu dut', es: 'Lo he conseguido', ar: 'أتقنتها' })}</button>
                                        <button type="button" className="fraction-v2-secondary" onClick={() => setRevealed((keys) => keys.filter((itemKey) => itemKey !== key))}>{l({ eu: 'Berriro saiatu', es: 'Volver a intentar', ar: 'حاول مجددًا' })}</button>
                                    </div>
                                </div>
                            )}
                        </article>
                    )
                })}
            </div>
        </section>
    )
}

function useStoredIds(key: string, fallbackKey?: string) {
    const [ids, setIds] = useState<number[]>(() => {
        try {
            const stored = localStorage.getItem(key) ?? (fallbackKey ? localStorage.getItem(fallbackKey) : null)
            if (!stored) return []
            const parsed: unknown = JSON.parse(stored)
            return Array.isArray(parsed) ? parsed.filter((id): id is number => typeof id === 'number' && Number.isSafeInteger(id)) : []
        } catch {
            return []
        }
    })

    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(ids))
        } catch {
            // Storage can be unavailable (private mode); progress then lasts for the session only
        }
    }, [ids, key])

    const addId = (id: number) => setIds((current) => current.includes(id) ? current : [...current, id])
    const reset = () => setIds([])
    return { ids, addId, reset }
}

function useStoredTopics(key: string) {
    const [ids, setIds] = useState<TheoryTopicId[]>(() => {
        try {
            const stored = localStorage.getItem(key)
            if (!stored) return []
            const parsed: unknown = JSON.parse(stored)
            const validIds = new Set(theoryTopics.map((topic) => topic.id))
            return Array.isArray(parsed) ? parsed.filter((id): id is TheoryTopicId => typeof id === 'string' && validIds.has(id as TheoryTopicId)) : []
        } catch {
            return []
        }
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(ids))
    }, [ids, key])

    const addId = (id: TheoryTopicId) => setIds((current) => current.includes(id) ? current : [...current, id])
    const reset = () => setIds([])
    return { ids, addId, reset }
}

const TOTAL_GAME_GOALS = equivalenceRounds.length + pizzaRounds.length + new Set(memoryCardsSource.map((card) => card.pairId)).size + raceRounds.length

export function ZatikiakPrototypePage() {
    const { t, i18n } = useTranslation()
    const location = useLocation()
    const language = normalizePrototypeLanguage(i18n.language)
    const isRtl = language === 'ar'
    const l = (text: LocalizedText) => pickText(language, text)
    const [sectionState, setSectionState] = useState(() => ({
        pathname: location.pathname,
        section: sectionForPath(location.pathname)
    }))
    const section: PrototypeSection = sectionState.pathname === location.pathname
        ? sectionState.section
        : sectionForPath(location.pathname)
    const [topicId, setTopicId] = useState<TheoryTopicId>('meaning')
    const [moreOpen, setMoreOpen] = useState(false)
    const [labTool, setLabTool] = useState<LabToolId>('parts')
    const learned = useStoredTopics('matella-zatikiak-v2-learned')
    const diagnosticProgress = useStoredIds('matella-zatikiak-v2-diagnostic')
    const diagnosticCorrect = useStoredIds('matella-zatikiak-v2-diagnostic-correct', 'matella-zatikiak-v2-diagnostic')
    const practiceProgress = useStoredIds('matella-zatikiak-v2-practice')
    const bankProgress = useStoredIds('matella-zatikiak-v2-exercise-bank')
    const challengeProgress = useStoredIds('matella-zatikiak-v2-challenges')
    const playProgress = useStoredIds('matella-zatikiak-v2-play')
    const labProgress = useStoredIds('matella-zatikiak-v2-lab')

    useEffect(() => {
        document.documentElement.lang = language
        document.documentElement.dir = isRtl ? 'rtl' : 'ltr'
    }, [isRtl, language])

    useEffect(() => {
        const previousTitle = document.title
        document.title = language === 'eu' ? 'Zatikiak · 2. DBH | Matella' : language === 'es' ? 'Fracciones · 2.º ESO | Matella' : 'الكسور · الصف الثاني | Matella'
        return () => { document.title = previousTitle }
    }, [language])

    const navigate = (next: PrototypeSection) => {
        setSectionState({ pathname: location.pathname, section: next })
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' })
    }

    const resetAllProgress = () => {
        const confirmed = window.confirm(l({ eu: 'Unitate honetako aurrerapen guztia ezabatu nahi duzu?', es: '¿Quieres borrar todo el progreso de esta unidad?', ar: 'هل تريد حذف كل التقدم في هذه الوحدة؟' }))
        if (!confirmed) return
        diagnosticProgress.reset()
        diagnosticCorrect.reset()
        learned.reset()
        practiceProgress.reset()
        bankProgress.reset()
        challengeProgress.reset()
        playProgress.reset()
        labProgress.reset()
    }

    const completedGoals = diagnosticProgress.ids.length + learned.ids.length + practiceProgress.ids.length + bankProgress.ids.length + challengeProgress.ids.length + playProgress.ids.length + labProgress.ids.filter((id) => labChallengeIds.includes(id)).length
    const totalGoals = diagnosticQuestions.length + theoryTopics.length + guidedPractice.length + 42 + challenges.length + TOTAL_GAME_GOALS + labChallengeIds.length
    const progress = Math.round((completedGoals / totalGoals) * 100)
    const recommendedTopic = theoryTopics.find((topic) => !learned.ids.includes(topic.id)) ?? theoryTopics[theoryTopics.length - 1]

    const unitTitle = l({ eu: 'Zatikiak', es: 'Fracciones', ar: 'الكسور' })
    const courseTitle = l({ eu: '2. DBH', es: '2.º ESO', ar: 'الصف الثاني' })
    const mobilePrimarySections: PrototypeSection[] = ['route', 'learn', 'practice', 'play']
    const mobileMoreSections = prototypeSections.filter((item) => !mobilePrimarySections.includes(item.id))
    const moreIsActive = mobileMoreSections.some((item) => item.id === section)

    return (
        <div className="fraction-v2" dir={isRtl ? 'rtl' : 'ltr'}>
            <header className="fraction-v2-header">
                <div className="fraction-v2-topbar">
                    <Link className="fraction-v2-brand" to="/" aria-label={l({ eu: 'Matella, hasiera', es: 'Matella, inicio', ar: 'Matella، الصفحة الرئيسية' })}>
                        <span className="fraction-v2-brand-mark" aria-hidden="true"><span /><span /><span /><span /></span>
                        <span className="fraction-v2-brand-name">Matella</span>
                    </Link>
                    <Link className="fraction-v2-mobile-back" to="/matematika/dbh2" aria-label={`${l({ eu: 'Itzuli', es: 'Volver a', ar: 'العودة إلى' })} ${courseTitle}`}>
                        <Icon name="back" size={22} className="fraction-v2-icon-flip" />
                    </Link>
                    <nav className="fraction-v2-breadcrumb" aria-label={l({ eu: 'Kokapena', es: 'Ruta de navegación', ar: 'مسار التنقل' })}>
                        <Link to="/matematika">{l({ eu: 'Matematika', es: 'Matemáticas', ar: 'الرياضيات' })}</Link>
                        <span aria-hidden="true">/</span>
                        <Link to="/matematika/dbh2">{courseTitle}</Link>
                        <span aria-hidden="true">/</span>
                        <span aria-current="page">{unitTitle}</span>
                    </nav>
                    <span className="fraction-v2-mobile-title">{unitTitle}</span>
                    <div className="fraction-v2-language" role="group" aria-label={l({ eu: 'Hizkuntza', es: 'Idioma', ar: 'اللغة' })}>
                        {([['eu', 'EU'], ['es', 'ES'], ['ar', 'عربي']] as const).map(([code, label]) => (
                            <button type="button" lang={code} aria-pressed={language === code} onClick={() => void i18n.changeLanguage(code)} key={code}>{label}</button>
                        ))}
                    </div>
                </div>
                <nav className="fraction-v2-nav" aria-label={l({ eu: 'Unitateko atalak', es: 'Secciones de la unidad', ar: 'أقسام الوحدة' })}>
                    {prototypeSections.map((item) => (
                        <button
                            type="button"
                            className={`${section === item.id ? 'active' : ''} ${mobilePrimarySections.includes(item.id) ? 'primary' : 'secondary'}`}
                            aria-current={section === item.id ? 'page' : undefined}
                            onClick={() => { setMoreOpen(false); navigate(item.id) }}
                            key={item.id}
                        >
                            <Icon name={item.id} size={20} />
                            <span>{l(item.label)}</span>
                        </button>
                    ))}
                    <button
                        type="button"
                        className={`fraction-v2-nav-more ${moreIsActive ? 'active' : ''}`}
                        aria-expanded={moreOpen}
                        aria-controls="fraction-v2-more-menu"
                        onClick={() => setMoreOpen((open) => !open)}
                    >
                        <Icon name={moreOpen ? 'close' : 'more'} size={20} />
                        <span>{l({ eu: 'Gehiago', es: 'Más', ar: 'المزيد' })}</span>
                    </button>
                </nav>
                {moreOpen && (
                    <div className="fraction-v2-more-menu" id="fraction-v2-more-menu">
                        {mobileMoreSections.map((item) => (
                            <button type="button" className={section === item.id ? 'active' : ''} aria-current={section === item.id ? 'page' : undefined} onClick={() => { setMoreOpen(false); navigate(item.id) }} key={item.id}>
                                <Icon name={item.id} size={22} />
                                {l(item.label)}
                            </button>
                        ))}
                    </div>
                )}
            </header>

            <main className="fraction-v2-main">
                {section === 'route' && renderRoute()}
                {section === 'diagnostic' && (
                    <DiagnosticQuiz
                        answeredIds={diagnosticProgress.ids}
                        correctIds={diagnosticCorrect.ids}
                        onAnswer={(id, correct) => {
                            diagnosticProgress.addId(id)
                            if (correct) diagnosticCorrect.addId(id)
                        }}
                        onRestart={() => { diagnosticProgress.reset(); diagnosticCorrect.reset() }}
                        language={language}
                        onStartLearning={(nextTopic) => { setTopicId(nextTopic); navigate('learn') }}
                    />
                )}
                {section === 'learn' && renderLearn()}
                {section === 'lab' && (
                    <FractionLaboratory
                        language={language}
                        tool={labTool}
                        onToolChange={setLabTool}
                        completedIds={labProgress.ids}
                        onComplete={labProgress.addId}
                        onOpenLesson={openTopic}
                    />
                )}
                {section === 'practice' && (
                    <PracticeArea
                        key={`practice-${location.pathname}`}
                        language={language}
                        initialMode={practiceModeForPath(location.pathname)}
                        guidedCompletedIds={practiceProgress.ids}
                        onGuidedComplete={practiceProgress.addId}
                        bankCompletedIds={bankProgress.ids}
                        onBankComplete={bankProgress.addId}
                    />
                )}
                {section === 'challenges' && (
                    <PracticeDeck
                        items={challenges}
                        completedIds={challengeProgress.ids}
                        onComplete={challengeProgress.addId}
                        language={language}
                        challengeMode
                    />
                )}
                {section === 'play' && (
                    <GamesArea
                        key={`games-${location.pathname}`}
                        completedIds={playProgress.ids}
                        onComplete={playProgress.addId}
                        language={language}
                        initialGame={gameModeForPath(location.pathname)}
                    />
                )}
            </main>
        </div>
    )

    function lessonsLabel(count: number) {
        return count === 1
            ? l({ eu: 'Ikasgai 1', es: '1 lección', ar: 'درس واحد' })
            : l({ eu: `${count} ikasgai`, es: `${count} lecciones`, ar: `${count} دروس` })
    }

    function openTopic(nextTopic: TheoryTopicId) {
        setTopicId(nextTopic)
        navigate('learn')
    }

    function renderRoute() {
        const recommendedIndex = theoryTopics.findIndex((topic) => topic.id === recommendedTopic.id)
        const recommendedStageIndex = learningStages.findIndex((stage) => stage.id === recommendedTopic.stage)
        const hasStarted = completedGoals > 0
        const diagnosticPending = diagnosticProgress.ids.length < diagnosticQuestions.length
        const tools: Array<{ id: PrototypeSection; title: LocalizedText; description: LocalizedText }> = [
            { id: 'lab', title: { eu: 'Laborategia', es: 'Laboratorio', ar: 'المختبر' }, description: { eu: `${labTools.length} tresna zatikiak manipulatzeko, erronkekin.`, es: `${labTools.length} herramientas para manipular fracciones, con retos.`, ar: `${labTools.length} أدوات للتعامل مع الكسور، مع تحديات.` } },
            { id: 'practice', title: { eu: 'Praktika', es: 'Práctica', ar: 'التدريب' }, description: { eu: `${guidedPractice.length} jarduera gidatu eta 42 ariketa zailtasunaren arabera.`, es: `${guidedPractice.length} actividades guiadas y 42 ejercicios por dificultad.`, ar: `${guidedPractice.length} أنشطة موجّهة و42 تمرينًا حسب الصعوبة.` } },
            { id: 'challenges', title: { eu: 'Erronkak', es: 'Retos', ar: 'التحديات' }, description: { eu: `Bizitza errealeko ${challenges.length} problema ikasitakoa aplikatzeko.`, es: `${challenges.length} problemas de la vida real para aplicar lo aprendido.`, ar: `${challenges.length} مسألة من الحياة الواقعية لتطبيق ما تعلّمته.` } },
            { id: 'play', title: { eu: 'Jokoak', es: 'Juegos', ar: 'الألعاب' }, description: { eu: 'Lau joko abiadura eta zehaztasuna entrenatzeko.', es: 'Cuatro juegos para entrenar rapidez y precisión.', ar: 'أربع ألعاب لتدريب السرعة والدقة.' } }
        ]

        return (
            <div className="fraction-v2-route">
                <section className="fraction-v2-hero" aria-labelledby="fraction-v2-unit-title">
                    <div className="fraction-v2-hero-copy">
                        <span className="fraction-v2-chip fraction-v2-chip-coral">{courseTitle} · {l({ eu: 'Matematika', es: 'Matemáticas', ar: 'الرياضيات' })}</span>
                        <h1 id="fraction-v2-unit-title">{unitTitle}</h1>
                        <p>{l({
                            eu: 'Zatia, banaketa, neurria eta zenbakia: ezagutu zatiki batek izan dezakeen guztia eta ikasi harekin segurtasunez kalkulatzen.',
                            es: 'Parte, reparto, medida y número: descubre todo lo que puede ser una fracción y aprende a calcular con ella con seguridad.',
                            ar: 'جزء وتقسيم وقياس وعدد: اكتشف كل ما يمكن أن يكونه الكسر وتعلّم الحساب به بثقة.'
                        })}</p>
                        <div className="fraction-v2-hero-actions">
                            <button type="button" className="fraction-v2-primary" onClick={() => diagnosticPending ? navigate('diagnostic') : openTopic(recommendedTopic.id)}>
                                {diagnosticPending
                                    ? l({ eu: 'Hasi diagnostikoarekin', es: 'Empezar con el diagnóstico', ar: 'ابدأ بالتشخيص' })
                                    : l({ eu: 'Jarraitu hurrengo urratsarekin', es: 'Seguir con el siguiente paso', ar: 'تابع إلى الخطوة التالية' })}
                                <Icon name="arrow" size={18} strokeWidth={2.4} className="fraction-v2-icon-flip" />
                            </button>
                            <button type="button" className="fraction-v2-secondary" onClick={() => navigate('lab')}>
                                {l({ eu: 'Ireki laborategia', es: 'Abrir el laboratorio', ar: 'افتح المختبر' })}
                            </button>
                        </div>
                        {diagnosticPending && (
                            <p className="fraction-v2-hero-note">{l({ eu: '6 galdera, notarik gabe. Nondik hastea komeni zaizun esango dizugu.', es: '6 preguntas, sin nota. Te diremos por dónde te conviene empezar.', ar: '6 أسئلة بلا علامة. سنقترح عليك من أين تبدأ.' })}</p>
                        )}
                    </div>
                    <div className="fraction-v2-collage" aria-hidden="true">
                        <div className="fraction-v2-collage-pizza"><span /><span /></div>
                        <div className="fraction-v2-collage-sticker"><span>3</span><span>4</span></div>
                        <div className="fraction-v2-collage-bar">
                            <div><span className="filled" /><span className="filled" /><span /><span /><span /></div>
                            <strong>2 / 5</strong>
                        </div>
                        <div className="fraction-v2-collage-line">
                            <div><span className="tick" /><span className="tick" /><span className="tick" /><span className="tick" /><span className="dot" /></div>
                            <p><span>0</span><span>1</span><span>2</span><span>3</span></p>
                        </div>
                    </div>
                </section>

                <section className="fraction-v2-continue" aria-label={l({ eu: 'Zure aurrerapena', es: 'Tu progreso', ar: 'تقدمك' })}>
                    <div className="fraction-v2-ring" style={{ '--progress': `${progress}%` } as CSSProperties} role="img" aria-label={`${progress}%`}>
                        <span>{progress}%</span>
                    </div>
                    <div className="fraction-v2-continue-text">
                        <span>{hasStarted
                            ? l({ eu: 'Jarraitu utzi zenuen lekutik', es: 'Continúa donde lo dejaste', ar: 'تابع من حيث توقفت' })
                            : l({ eu: 'Hasi hemendik', es: 'Empieza por aquí', ar: 'ابدأ من هنا' })}</span>
                        <strong>{l({ eu: 'Ikasgaia', es: 'Lección', ar: 'الدرس' })} {recommendedIndex + 1} · {l(recommendedTopic.title)}</strong>
                    </div>
                    <span className="fraction-v2-chip" data-stage={recommendedTopic.stage}>{l({ eu: `${recommendedStageIndex + 1}. etapa`, es: `Etapa ${recommendedStageIndex + 1}`, ar: `المرحلة ${recommendedStageIndex + 1}` })}</span>
                    <button type="button" className="fraction-v2-stage-button" data-stage={recommendedTopic.stage} onClick={() => openTopic(recommendedTopic.id)}>
                        {hasStarted ? l({ eu: 'Jarraitu', es: 'Continuar', ar: 'تابع' }) : l({ eu: 'Hasi', es: 'Empezar', ar: 'ابدأ' })}
                    </button>
                </section>

                <section className="fraction-v2-overview" aria-labelledby="fraction-v2-path-title">
                    <div className="fraction-v2-section-heading">
                        <h2 id="fraction-v2-path-title">{l({ eu: 'Zure ibilbidea', es: 'Tu ruta', ar: 'مسارك' })}</h2>
                        <p>{l({ eu: 'Bost etapa, zatikiaren ideiatik proportzionaltasunera', es: 'Cinco etapas, de la idea de fracción a la proporcionalidad', ar: 'خمس مراحل، من فكرة الكسر إلى التناسب' })}</p>
                    </div>
                    <ol className="fraction-v2-path-grid">
                        {learningStages.map((stage, index) => {
                            const stageTopics = theoryTopics.filter((topic) => topic.stage === stage.id)
                            const learnedCount = stageTopics.filter((topic) => learned.ids.includes(topic.id)).length
                            const complete = learnedCount === stageTopics.length
                            const current = !complete && stage.id === recommendedTopic.stage
                            return (
                                <li key={stage.id}>
                                    <button
                                        type="button"
                                        className={`fraction-v2-path-card ${complete ? 'complete' : ''} ${current ? 'current' : ''}`}
                                        data-stage={stage.id}
                                        aria-current={current ? 'step' : undefined}
                                        onClick={() => openTopic((stageTopics.find((topic) => !learned.ids.includes(topic.id)) ?? stageTopics[0]).id)}
                                    >
                                        <span className="fraction-v2-stage-badge">{complete ? <Icon name="check" size={18} strokeWidth={3} /> : index + 1}</span>
                                        <strong>{l(stage.title)}</strong>
                                        {current && (
                                            <span className="fraction-v2-meter"><span style={{ width: `${(learnedCount / stageTopics.length) * 100}%` }} /></span>
                                        )}
                                        <small>{complete
                                            ? `${l({ eu: 'Osatuta', es: 'Completada', ar: 'مكتملة' })} · ${lessonsLabel(stageTopics.length)}`
                                            : current
                                                ? `${l({ eu: 'Martxan', es: 'En curso', ar: 'قيد التقدم' })} · ${learnedCount} / ${stageTopics.length}`
                                                : lessonsLabel(stageTopics.length)}</small>
                                    </button>
                                </li>
                            )
                        })}
                    </ol>
                </section>

                <section className="fraction-v2-tools" aria-labelledby="fraction-v2-tools-title">
                    <div className="fraction-v2-section-heading">
                        <h2 id="fraction-v2-tools-title">{l({ eu: 'Ikasteko beste modu batzuk', es: 'Más formas de aprender', ar: 'طرق أخرى للتعلّم' })}</h2>
                    </div>
                    <div className="fraction-v2-tools-grid">
                        {tools.map((tool) => (
                            <button type="button" className="fraction-v2-tool-card" data-tool={tool.id} onClick={() => navigate(tool.id)} key={tool.id}>
                                <span className="fraction-v2-tool-icon"><Icon name={tool.id} size={24} strokeWidth={1.9} /></span>
                                <strong>{l(tool.title)}</strong>
                                <span>{l(tool.description)}</span>
                            </button>
                        ))}
                    </div>
                </section>

                <div className="fraction-v2-route-footer">
                    <nav aria-label={l({ eu: 'Informazio legala', es: 'Información legal', ar: 'معلومات قانونية' })}>
                        <Link to="/accesibilidad">{t('footer.accessibility')}</Link>
                        <Link to="/privacidad">{t('footer.privacy')}</Link>
                        <Link to="/creditos">{t('footer.credits')}</Link>
                    </nav>
                    <button type="button" onClick={resetAllProgress}>{l({ eu: 'Aurrerapena berrezarri', es: 'Reiniciar el progreso', ar: 'إعادة ضبط التقدم' })}</button>
                </div>
            </div>
        )
    }

    function renderLearn() {
        const currentIndex = Math.max(0, theoryTopics.findIndex((topic) => topic.id === topicId))
        const currentTopic = theoryTopics[currentIndex]
        const currentStageIndex = learningStages.findIndex((stage) => stage.id === currentTopic.stage)
        const nextTopic = theoryTopics[currentIndex + 1]
        const isLearned = learned.ids.includes(currentTopic.id)
        const selectTopic = (id: TheoryTopicId) => {
            setTopicId(id)
            const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
            window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' })
        }

        return (
            <section className="fraction-v2-learning">
                <nav className="fraction-v2-lesson-index" aria-label={l({ eu: 'Ikasgaiak', es: 'Lecciones', ar: 'الدروس' })}>
                    {learningStages.map((stage, stageIndex) => (
                        <div className="fraction-v2-lesson-group" data-stage={stage.id} key={stage.id}>
                            <span className="fraction-v2-lesson-group-title"><span aria-hidden="true" />{stageIndex + 1} · {l(stage.title)}</span>
                            {theoryTopics.map((topic, index) => topic.stage !== stage.id ? null : (
                                <button
                                    type="button"
                                    className={`${topic.id === currentTopic.id ? 'active' : ''} ${learned.ids.includes(topic.id) ? 'done' : ''}`}
                                    aria-current={topic.id === currentTopic.id ? 'step' : undefined}
                                    onClick={() => selectTopic(topic.id)}
                                    key={topic.id}
                                >
                                    <span className="fraction-v2-lesson-number">{learned.ids.includes(topic.id) && topic.id !== currentTopic.id ? <Icon name="check" size={14} strokeWidth={3.2} /> : index + 1}</span>
                                    {l(topic.title)}
                                </button>
                            ))}
                        </div>
                    ))}
                </nav>

                <article className="fraction-v2-lesson" data-stage={currentTopic.stage} aria-labelledby="fraction-v2-lesson-title">
                    <div className="fraction-v2-lesson-meta">
                        <span className="fraction-v2-chip" data-stage={currentTopic.stage}>{l({ eu: `${currentStageIndex + 1}. etapa`, es: `Etapa ${currentStageIndex + 1}`, ar: `المرحلة ${currentStageIndex + 1}` })} · {l(learningStages[currentStageIndex].title)}</span>
                        <span>{l({ eu: `${currentIndex + 1}. ikasgaia / ${theoryTopics.length}`, es: `Lección ${currentIndex + 1} de ${theoryTopics.length}`, ar: `الدرس ${currentIndex + 1} من ${theoryTopics.length}` })}</span>
                    </div>
                    <h1 id="fraction-v2-lesson-title">{l(currentTopic.title)}</h1>
                    <p className="fraction-v2-lesson-goal"><strong>{l({ eu: 'Helburua:', es: 'Objetivo:', ar: 'الهدف:' })}</strong> {l(currentTopic.goal)}</p>
                    <p className="fraction-v2-lesson-body">{l(currentTopic.explanation)}</p>
                    <figure className="fraction-v2-example">
                        <MathText text={currentTopic.example} />
                    </figure>
                    <aside className="fraction-v2-takeaway">
                        <span className="fraction-v2-takeaway-icon"><Icon name="bulb" size={22} /></span>
                        <div>
                            <span>{l({ eu: 'Ideia nagusia', es: 'Idea clave', ar: 'الفكرة الأساسية' })}</span>
                            <p>{l(currentTopic.takeaway)}</p>
                        </div>
                    </aside>
                    <div className="fraction-v2-lesson-actions">
                        <button type="button" className={`fraction-v2-primary ${isLearned ? 'done' : ''}`} onClick={() => learned.addId(currentTopic.id)} disabled={isLearned}>
                            {isLearned && <Icon name="check" size={18} strokeWidth={3} />}
                            {isLearned
                                ? l({ eu: 'Ulertuta', es: 'Entendido', ar: 'تم الفهم' })
                                : l({ eu: 'Ulertu dut', es: 'Lo he entendido', ar: 'فهمت' })}
                        </button>
                        <button type="button" className="fraction-v2-secondary" onClick={() => navigate('practice')}>
                            {l({ eu: 'Praktikatu', es: 'Practicar', ar: 'تدرّب' })}
                        </button>
                        {labToolForTopic[currentTopic.id] && (
                            <button type="button" className="fraction-v2-secondary" onClick={() => { setLabTool(labToolForTopic[currentTopic.id]!); navigate('lab') }}>
                                <Icon name="lab" size={18} />
                                {l({ eu: 'Esperimentatu laborategian', es: 'Experimentar en el laboratorio', ar: 'جرّب في المختبر' })}
                            </button>
                        )}
                        {nextTopic && (
                            <button type="button" className="fraction-v2-next" data-stage={nextTopic.stage} onClick={() => selectTopic(nextTopic.id)}>
                                <span>{l({ eu: 'Hurrengoa:', es: 'Siguiente:', ar: 'التالي:' })} {l(nextTopic.title)}</span>
                                <Icon name="arrow" size={18} strokeWidth={2.4} className="fraction-v2-icon-flip" />
                            </button>
                        )}
                    </div>
                </article>
            </section>
        )
    }
}

function PracticeDeck({
    items,
    completedIds,
    onComplete,
    language,
    challengeMode = false
}: {
    items: PracticeItem[]
    completedIds: number[]
    onComplete: (id: number) => void
    language: ReturnType<typeof normalizePrototypeLanguage>
    challengeMode?: boolean
}) {
    const l = (text: LocalizedText) => pickText(language, text)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [answers, setAnswers] = useState<Record<number, string>>({})
    const [feedback, setFeedback] = useState<Record<number, TaskFeedback>>({})
    const [hints, setHints] = useState<number[]>([])
    const current = items[currentIndex]
    const isComplete = completedIds.includes(current.id)
    const currentFeedback = feedback[current.id] ?? (isComplete ? 'success' : 'idle')
    const errorByStage: Record<PracticeItem['stage'], LocalizedText> = {
        meaning: { eu: 'Begiratu zer adierazten duten zenbakitzaileak eta izendatzaileak, eta ea unitate osoak dauden.', es: 'Revisa qué representan numerador y denominador y si hay unidades completas.', ar: 'راجع معنى البسط والمقام وهل توجد وحدات كاملة.' },
        equivalence: { eu: 'Egiaztatu bi terminoetan faktore bera erabili duzula eta emaitza sinplifikatuta dagoela.', es: 'Comprueba que has usado el mismo factor en ambos términos y que el resultado está simplificado.', ar: 'تحقق من استعمال العامل نفسه في البسط والمقام ومن تبسيط النتيجة.' },
        ordering: { eu: 'Begiratu zeinuari lehenik; gero erabili izendatzaile komuna edo biderketa gurutzatua.', es: 'Observa primero el signo; después usa denominador común o productos cruzados.', ar: 'ابدأ بالإشارة ثم استعمل مقامًا مشتركًا أو الضرب التبادلي.' },
        operations: { eu: 'Berrikusi eragiketen ordena, zeinua eta azken sinplifikazioa.', es: 'Revisa el orden de operaciones, el signo y la simplificación final.', ar: 'راجع ترتيب العمليات والإشارة والتبسيط النهائي.' },
        proportionality: { eu: 'Identifikatu zatiaren eta guztizkoaren arteko erlazioa, eta egiaztatu unitatea.', es: 'Identifica la relación entre la parte y el total y comprueba la unidad.', ar: 'حدّد العلاقة بين الجزء والكل وتحقق من الوحدة.' }
    }

    const answerForm = current.answerForm ?? 'any'
    const formMessage: LocalizedText = answerForm === 'mixed'
        ? { eu: 'Balioa zuzena da, baina idatzi zenbaki misto gisa: oso bat eta zatiki propio laburtezin bat, adibidez 2 1/3.', es: 'El valor es correcto, pero escríbelo como número mixto: un entero y una fracción propia irreducible, por ejemplo 2 1/3.', ar: 'القيمة صحيحة، لكن اكتبها عددًا كسريًا: عدد صحيح وكسر حقيقي في أبسط صورة، مثل 2 1/3.' }
        : { eu: 'Balioa zuzena da, baina oraindik sinplifika daiteke. Idatzi zatiki laburtezina.', es: 'El valor es correcto, pero todavía se puede simplificar. Escribe la fracción irreducible.', ar: 'القيمة صحيحة، لكن يمكن تبسيطها أكثر. اكتب الكسر في أبسط صورة.' }
    const placeholder: LocalizedText = answerForm === 'mixed'
        ? { eu: 'Adib.: 2 1/3', es: 'Ej.: 2 1/3', ar: 'مثال: 2 1/3' }
        : answerForm === 'simplified'
            ? { eu: 'Adib.: 3/4', es: 'Ej.: 3/4', ar: 'مثال: 3/4' }
            : { eu: 'Adib.: 3/4 edo 0,75', es: 'Ej.: 3/4 o 0,75', ar: 'مثال: 3/4 أو 0.75' }

    const check = () => {
        const result = checkAnswer(answers[current.id] ?? '', current.expected, answerForm)
        const next: TaskFeedback = result === 'correct' ? 'success' : result === 'incorrect' ? 'error' : result
        setFeedback((state) => ({ ...state, [current.id]: next }))
        if (result === 'correct') onComplete(current.id)
    }

    return (
        <section className="fraction-v2-practice" aria-labelledby="fraction-v2-practice-title">
            <div className="fraction-v2-page-intro">
                <span>{challengeMode ? l({ eu: 'ERRONKAK', es: 'RETOS', ar: 'التحديات' }) : l({ eu: 'PRAKTIKA GIDATUA', es: 'PRÁCTICA GUIADA', ar: 'تدريب موجّه' })}</span>
                <h1 id="fraction-v2-practice-title">{challengeMode
                    ? l({ eu: 'Aplikatu egoera errealetan', es: 'Aplica en situaciones reales', ar: 'طبّق في مواقف واقعية' })
                    : l({ eu: 'Saiatu, jaso pista eta ulertu', es: 'Intenta, recibe una pista y comprende', ar: 'حاول ثم خذ تلميحًا وافهم' })}</h1>
                <p>{l({ eu: 'Enuntziatuak forma zehatzik eskatzen ez badu, zatiki baliokideak eta koma edo puntua duten hamartarrak onartzen dira.', es: 'Si el enunciado no pide una forma concreta, se aceptan fracciones equivalentes y decimales con coma o punto.', ar: 'إذا لم يطلب السؤال صيغة محددة، تُقبل الكسور المكافئة والأعداد العشرية بالفاصلة أو النقطة.' })}</p>
            </div>

            <div className="fraction-v2-task-layout">
                <nav className="fraction-v2-task-list" aria-label={l({ eu: 'Ariketen zerrenda', es: 'Lista de ejercicios', ar: 'قائمة التمارين' })}>
                    {items.map((item, index) => (
                        <button
                            type="button"
                            className={`${index === currentIndex ? 'active' : ''} ${completedIds.includes(item.id) ? 'done' : ''}`}
                            data-stage={item.stage}
                            aria-current={index === currentIndex ? 'step' : undefined}
                            aria-label={`${index + 1}: ${l(item.prompt)}`}
                            onClick={() => setCurrentIndex(index)}
                            key={item.id}
                        >
                            <span>{completedIds.includes(item.id) ? '✓' : index + 1}</span>
                            {challengeMode ? `${'★'.repeat(isChallengeItem(item) ? Math.max(1, item.points / 10) : 1)}` : l(learningStages.find((stage) => stage.id === item.stage)?.title ?? learningStages[0].title)}
                        </button>
                    ))}
                </nav>

                <article className={`fraction-v2-task-card ${currentFeedback}`} data-stage={current.stage} aria-live="polite">
                    <div className="fraction-v2-task-meta">
                        <span>{currentIndex + 1} / {items.length}</span>
                        {challengeMode && isChallengeItem(current) && <strong>+{current.points} pts</strong>}
                    </div>
                    <h2>{l(current.prompt)}</h2>
                    {current.expression && <div className="fraction-v2-task-expression"><MathText text={current.expression} /></div>}
                    <label htmlFor={`fraction-v2-answer-${current.id}`}>{l({ eu: 'Zure erantzuna', es: 'Tu respuesta', ar: 'إجابتك' })}</label>
                    <div className="fraction-v2-answer-row">
                        <input
                            id={`fraction-v2-answer-${current.id}`}
                            value={answers[current.id] ?? ''}
                            onChange={(event) => {
                                setAnswers((state) => ({ ...state, [current.id]: event.target.value }))
                                setFeedback((state) => ({ ...state, [current.id]: 'idle' }))
                            }}
                            onKeyDown={(event) => { if (event.key === 'Enter') check() }}
                            placeholder={l(placeholder)}
                            inputMode={answerForm === 'mixed' ? 'text' : 'decimal'}
                        />
                        <button type="button" className="fraction-v2-primary" onClick={check}>{l({ eu: 'Egiaztatu', es: 'Comprobar', ar: 'تحقق' })}</button>
                    </div>
                    <button type="button" className="fraction-v2-hint-button" aria-expanded={hints.includes(current.id)} onClick={() => setHints((ids) => ids.includes(current.id) ? ids.filter((id) => id !== current.id) : [...ids, current.id])}>
                        {l({ eu: 'Pista bat behar dut', es: 'Necesito una pista', ar: 'أحتاج إلى تلميح' })}
                    </button>
                    {hints.includes(current.id) && <div className="fraction-v2-hint"><MathText text={l(current.hint)} /></div>}
                    {currentFeedback === 'error' && <div className="fraction-v2-feedback error">{l(errorByStage[current.stage])}</div>}
                    {currentFeedback === 'wrong-form' && <div className="fraction-v2-feedback form">{l(formMessage)}</div>}
                    {currentFeedback === 'unreadable' && <div className="fraction-v2-feedback">{l({ eu: 'Ez dut erantzun hori ulertzen. Idatzi zatiki bat (3/4), zenbaki misto bat (2 1/3) edo hamartar bat (0,75).', es: 'No entiendo esa respuesta. Escribe una fracción (3/4), un número mixto (2 1/3) o un decimal (0,75).', ar: 'لم أفهم هذه الإجابة. اكتب كسرًا (3/4) أو عددًا كسريًا (2 1/3) أو عددًا عشريًا (0.75).' })}</div>}
                    {currentFeedback === 'success' && (
                        <div className="fraction-v2-feedback success">
                            <strong>{l({ eu: 'Zuzena.', es: 'Correcto.', ar: 'صحيح.' })}</strong>
                            <MathText text={l(current.explanation)} />
                        </div>
                    )}
                    <div className="fraction-v2-task-navigation">
                        <button type="button" disabled={currentIndex === 0} onClick={() => setCurrentIndex((index) => index - 1)}>{l({ eu: 'Aurrekoa', es: 'Anterior', ar: 'السابق' })}</button>
                        <button type="button" disabled={currentIndex === items.length - 1} onClick={() => setCurrentIndex((index) => index + 1)}>{l({ eu: 'Hurrengoa', es: 'Siguiente', ar: 'التالي' })}</button>
                    </div>
                </article>
            </div>
        </section>
    )
}

function GamesArea({ completedIds, onComplete, language, initialGame }: { completedIds: number[]; onComplete: (id: number) => void; language: ReturnType<typeof normalizePrototypeLanguage>; initialGame: GameMode }) {
    const l = (text: LocalizedText) => pickText(language, text)
    const [game, setGame] = useState<GameMode>(initialGame)
    const gameOptions: Array<{ id: typeof game; icon: string; title: LocalizedText; description: LocalizedText }> = [
        { id: 'equivalence', icon: '≡', title: { eu: 'Baliokide azkarra', es: 'Equivalencia rápida', ar: 'تكافؤ سريع' }, description: { eu: 'Balio bera aukeratu.', es: 'Elige el mismo valor.', ar: 'اختر القيمة نفسها.' } },
        { id: 'pizza', icon: '◉', title: { eu: 'Pizza zehatza', es: 'Pizza exacta', ar: 'بيتزا دقيقة' }, description: { eu: 'Prestatu eskatutako zatia.', es: 'Prepara la porción pedida.', ar: 'حضّر الكسر المطلوب.' } },
        { id: 'memory', icon: '▦', title: { eu: 'Memoria', es: 'Memoria', ar: 'الذاكرة' }, description: { eu: 'Lotu adierazpen zehatzak.', es: 'Empareja representaciones exactas.', ar: 'طابق التمثيلات الدقيقة.' } },
        { id: 'race', icon: '➜', title: { eu: 'Kalkulu-lasterketa', es: 'Carrera de cálculo', ar: 'سباق الحساب' }, description: { eu: 'Ebatzi zeinua galdu gabe.', es: 'Resuelve sin perder el signo.', ar: 'احسب من دون فقدان الإشارة.' } }
    ]

    return (
        <section className="fraction-v2-games" aria-labelledby="fraction-v2-games-title">
            <div className="fraction-v2-page-intro">
                <span>{l({ eu: '4 JOKO-MODU', es: '4 MODOS DE JUEGO', ar: '4 أنماط لعب' })}</span>
                <h1 id="fraction-v2-games-title">{l({ eu: 'Jolastu, baina beti balio zehatzarekin', es: 'Juega, siempre con valores exactos', ar: 'العب بقيم دقيقة دائمًا' })}</h1>
                <p>{l({ eu: 'Entrenatu lau jokorekin: baliokidetasunak, pizza, memoria eta kalkulua.', es: 'Entrena con cuatro juegos: equivalencias, pizza, memoria y cálculo.', ar: 'تدرّب بأربع ألعاب: التكافؤ والبيتزا والذاكرة والحساب.' })}</p>
            </div>
            <div className="fraction-v2-game-tabs" role="tablist" aria-label={l({ eu: 'Jokoa aukeratu', es: 'Elegir juego', ar: 'اختر لعبة' })}>
                {gameOptions.map((option) => (
                    <button type="button" role="tab" id={`fraction-v2-game-tab-${option.id}`} aria-controls="fraction-v2-game-panel" aria-selected={game === option.id} className={game === option.id ? 'active' : ''} onKeyDown={handleTabArrow} onClick={() => setGame(option.id)} key={option.id}>
                        <span aria-hidden="true">{option.icon}</span><strong>{l(option.title)}</strong><small>{l(option.description)}</small>
                    </button>
                ))}
            </div>
            <div id="fraction-v2-game-panel" role="tabpanel" aria-labelledby={`fraction-v2-game-tab-${game}`}>
                {game === 'equivalence' && <ExactEquivalenceGame completedIds={completedIds} onComplete={onComplete} language={language} />}
                {game === 'pizza' && <ExactPizzaGame completedIds={completedIds} onComplete={onComplete} language={language} />}
                {game === 'memory' && <ExactMemoryGame completedIds={completedIds} onComplete={onComplete} language={language} />}
                {game === 'race' && <FractionSprint completedIds={completedIds} onComplete={onComplete} language={language} />}
            </div>
        </section>
    )
}

function ExactPizzaGame({ completedIds, onComplete, language }: { completedIds: number[]; onComplete: (id: number) => void; language: ReturnType<typeof normalizePrototypeLanguage> }) {
    const l = (text: LocalizedText) => pickText(language, text)
    const [roundIndex, setRoundIndex] = useState(0)
    const [selectedSlices, setSelectedSlices] = useState(0)
    const [feedback, setFeedback] = useState<Feedback>('idle')
    const round = pizzaRounds[roundIndex]
    const denominator = round.target.denominator
    const targetSlices = round.target.numerator
    const selectedAngle = (selectedSlices / denominator) * 360
    const sliceAngle = 360 / denominator

    const reset = () => {
        setSelectedSlices(0)
        setFeedback('idle')
    }

    const serve = () => {
        const correct = selectedSlices === targetSlices
        setFeedback(correct ? 'success' : 'error')
        if (correct) onComplete(round.id)
    }

    const next = () => {
        setRoundIndex((index) => (index + 1) % pizzaRounds.length)
        reset()
    }

    return (
        <div className="fraction-v2-game-card fraction-v2-pizza-game">
            <div className="fraction-v2-game-score">{pizzaRounds.filter((item) => completedIds.includes(item.id)).length} / {pizzaRounds.length}</div>
            <p>{l({ eu: 'Prestatu bezeroak eskatutako pizza-zatia.', es: 'Prepara la fracción de pizza solicitada.', ar: 'حضّر كسر البيتزا المطلوب.' })}</p>
            <div className="fraction-v2-pizza-order"><MathText text={`$${toLatex(round.target)}$`} /></div>
            <div
                className="fraction-v2-pizza"
                role="img"
                aria-label={`${l({ eu: 'Hautatutako pizza', es: 'Pizza seleccionada', ar: 'البيتزا المحددة' })}: ${selectedSlices}/${denominator}`}
                style={{ '--selected-angle': `${selectedAngle}deg`, '--slice-angle': `${sliceAngle}deg` } as CSSProperties}
            />
            <div className="fraction-v2-pizza-count"><strong>{selectedSlices}</strong> / {denominator}</div>
            <div className="fraction-v2-pizza-controls">
                <button type="button" aria-label={l({ eu: 'Zati bat kendu', es: 'Quitar una porción', ar: 'أنقص قطعة' })} disabled={selectedSlices === 0} onClick={() => { setSelectedSlices((count) => count - 1); setFeedback('idle') }}>−</button>
                <button type="button" aria-label={l({ eu: 'Zati bat gehitu', es: 'Añadir una porción', ar: 'أضف قطعة' })} disabled={selectedSlices === denominator} onClick={() => { setSelectedSlices((count) => count + 1); setFeedback('idle') }}>+</button>
                <button type="button" onClick={reset}>{l({ eu: 'Garbitu', es: 'Limpiar', ar: 'مسح' })}</button>
                <button type="button" className="fraction-v2-primary" onClick={serve}>{l({ eu: 'Zerbitzatu', es: 'Servir', ar: 'قدّم' })}</button>
            </div>
            {feedback !== 'idle' && <div className={`fraction-v2-game-feedback ${feedback}`} aria-live="polite">{feedback === 'success' ? l({ eu: 'Eskaera zehatza. Ongi!', es: 'Pedido exacto. ¡Bien!', ar: 'الطلب مطابق تمامًا. أحسنت!' }) : l({ eu: 'Begiratu zenbat zati dauden eta zenbat aukeratu dituzun.', es: 'Revisa cuántas porciones hay y cuántas has elegido.', ar: 'راجع عدد القطع وعدد القطع التي اخترتها.' })}</div>}
            <button type="button" className="fraction-v2-secondary" onClick={next}>{l({ eu: 'Hurrengo eskaera', es: 'Siguiente pedido', ar: 'الطلب التالي' })}</button>
        </div>
    )
}

function ExactMemoryGame({ completedIds, onComplete, language }: { completedIds: number[]; onComplete: (id: number) => void; language: ReturnType<typeof normalizePrototypeLanguage> }) {
    const l = (text: LocalizedText) => pickText(language, text)
    const [cards, setCards] = useState<MemoryCardData[]>(() => [...memoryCardsSource].sort(() => Math.random() - 0.5))
    const [flipped, setFlipped] = useState<number[]>([])
    const [matchedPairs, setMatchedPairs] = useState<number[]>(() => [...new Set(completedIds.filter((id) => id >= 401 && id <= 406))])
    const [moves, setMoves] = useState(0)
    const [message, setMessage] = useState('')

    const selectCard = (index: number) => {
        const card = cards[index]
        if (matchedPairs.includes(card.pairId) || flipped.includes(index)) return

        const active = flipped.length === 2 ? [] : flipped
        const next = [...active, index]
        setFlipped(next)
        setMessage('')
        if (next.length === 2) {
            setMoves((count) => count + 1)
            const first = cards[next[0]]
            const second = cards[next[1]]
            if (first.pairId === second.pairId) {
                setMatchedPairs((pairs) => pairs.includes(first.pairId) ? pairs : [...pairs, first.pairId])
                onComplete(first.pairId)
                setMessage(l({ eu: 'Baliokide zehatzak.', es: 'Representaciones exactamente equivalentes.', ar: 'تمثيلان متكافئان تمامًا.' }))
            } else {
                setMessage(l({ eu: 'Ez dute balio bera. Aukeratu beste karta bat jarraitzeko.', es: 'No tienen el mismo valor. Elige otra carta para continuar.', ar: 'ليستا بالقيمة نفسها. اختر بطاقة أخرى للمتابعة.' }))
            }
        }
    }

    const reset = () => {
        setCards([...memoryCardsSource].sort(() => Math.random() - 0.5))
        setFlipped([])
        setMatchedPairs([])
        setMoves(0)
        setMessage('')
    }

    return (
        <div className="fraction-v2-game-card fraction-v2-memory-game">
            <div className="fraction-v2-memory-meta"><span>{matchedPairs.length} / 6</span><span>{moves} {l({ eu: 'mugimendu', es: 'movimientos', ar: 'محاولات' })}</span></div>
            <p>{l({ eu: 'Aurkitu balio bera duten bi karta.', es: 'Encuentra dos cartas con el mismo valor.', ar: 'اعثر على بطاقتين لهما القيمة نفسها.' })}</p>
            <div className="fraction-v2-memory-grid">
                {cards.map((card, index) => {
                    const visible = flipped.includes(index) || matchedPairs.includes(card.pairId)
                    return (
                        <button
                            type="button"
                            className={`${visible ? 'visible' : ''} ${matchedPairs.includes(card.pairId) ? 'matched' : ''}`}
                            aria-label={visible ? `${l({ eu: `Karta ${index + 1}`, es: `Carta ${index + 1}`, ar: `البطاقة ${index + 1}` })}: ${l(card.spoken)}` : l({ eu: `Karta ${index + 1}, ezkutuan`, es: `Carta ${index + 1}, oculta`, ar: `البطاقة ${index + 1}، مخفية` })}
                            aria-pressed={visible}
                            onClick={() => selectCard(index)}
                            key={card.id}
                        >
                            {visible ? <MathText text={language === 'ar' ? card.display.replace('0,', '0.') : card.display} /> : <span aria-hidden="true">?</span>}
                        </button>
                    )
                })}
            </div>
            {message && <div className="fraction-v2-game-feedback" aria-live="polite">{message}</div>}
            {matchedPairs.length === 6 && <div className="fraction-v2-game-feedback success">{l({ eu: 'Taula osatu duzu!', es: '¡Has completado el tablero!', ar: 'أكملت اللوحة!' })}</div>}
            <button type="button" className="fraction-v2-secondary" onClick={reset}>{l({ eu: 'Taula berria', es: 'Nuevo tablero', ar: 'لوحة جديدة' })}</button>
        </div>
    )
}

function FractionSprint({ completedIds, onComplete, language }: { completedIds: number[]; onComplete: (id: number) => void; language: ReturnType<typeof normalizePrototypeLanguage> }) {
    const l = (text: LocalizedText) => pickText(language, text)
    const [roundIndex, setRoundIndex] = useState(0)
    const [answer, setAnswer] = useState('')
    const [feedback, setFeedback] = useState<Feedback>('idle')
    const [showHint, setShowHint] = useState(false)
    const round = raceRounds[roundIndex]
    const completedRounds = raceRounds.filter((item) => completedIds.includes(item.id)).length

    const check = () => {
        const correct = answerEquals(answer, round.expected)
        setFeedback(correct ? 'success' : 'error')
        if (correct) onComplete(round.id)
    }

    const next = () => {
        setRoundIndex((index) => (index + 1) % raceRounds.length)
        setAnswer('')
        setFeedback('idle')
        setShowHint(false)
    }

    return (
        <div className="fraction-v2-game-card fraction-v2-race-game">
            <div className="fraction-v2-race-track" aria-label={`${completedRounds} / ${raceRounds.length}`}><span style={{ width: `${(completedRounds / raceRounds.length) * 100}%` }} /></div>
            <p>{l({ eu: 'Ebatzi zehazki. Zatiki baliokideak eta koma edo puntua onartzen dira.', es: 'Resuelve exactamente. Se aceptan fracciones equivalentes y coma o punto decimal.', ar: 'احسب بدقة. تُقبل الكسور المكافئة والفاصلة أو النقطة العشرية.' })}</p>
            <div className="fraction-v2-task-expression"><MathText text={round.expression} /></div>
            <label htmlFor="fraction-v2-race-answer">{l({ eu: 'Emaitza', es: 'Resultado', ar: 'النتيجة' })}</label>
            <div className="fraction-v2-answer-row">
                <input id="fraction-v2-race-answer" value={answer} onChange={(event) => { setAnswer(event.target.value); setFeedback('idle') }} onKeyDown={(event) => { if (event.key === 'Enter') check() }} inputMode="decimal" />
                <button type="button" className="fraction-v2-primary" onClick={check}>{l({ eu: 'Egiaztatu', es: 'Comprobar', ar: 'تحقق' })}</button>
            </div>
            <button type="button" className="fraction-v2-hint-button" aria-expanded={showHint} onClick={() => setShowHint((visible) => !visible)}>{l({ eu: 'Pista', es: 'Pista', ar: 'تلميح' })}</button>
            {showHint && <div className="fraction-v2-hint"><MathText text={l(round.hint)} /></div>}
            {feedback !== 'idle' && <div className={`fraction-v2-game-feedback ${feedback}`}>{feedback === 'success' ? <MathText text={`${l({ eu: 'Zuzena:', es: 'Correcto:', ar: 'صحيح:' })} $${toLatex(round.expected)}$`} /> : l({ eu: 'Ez da oraindik. Errespetatu eragiketen ordena eta zeinua.', es: 'Todavía no. Respeta el orden de operaciones y el signo.', ar: 'ليست صحيحة بعد. احترم ترتيب العمليات والإشارة.' })}</div>}
            <button type="button" className="fraction-v2-secondary" onClick={next}>{l({ eu: 'Hurrengo kalkulua', es: 'Siguiente cálculo', ar: 'الحساب التالي' })}</button>
        </div>
    )
}

/** LaTeX for a fraction exactly as written, without simplifying it */
function writtenLatex(value: FractionValue): string {
    if (value.denominator === 1) return String(value.numerator)
    return `${value.numerator < 0 ? '-' : ''}\\frac{${Math.abs(value.numerator)}}{${value.denominator}}`
}

function shuffledOrder(length: number): number[] {
    const order = Array.from({ length }, (_, index) => index)
    for (let index = order.length - 1; index > 0; index -= 1) {
        const swap = Math.floor(Math.random() * (index + 1))
        ;[order[index], order[swap]] = [order[swap], order[index]]
    }
    return order
}

function ExactEquivalenceGame({ completedIds, onComplete, language }: { completedIds: number[]; onComplete: (id: number) => void; language: ReturnType<typeof normalizePrototypeLanguage> }) {
    const l = (text: LocalizedText) => pickText(language, text)
    const [roundIndex, setRoundIndex] = useState(0)
    const [order, setOrder] = useState(() => shuffledOrder(equivalenceRounds[0].options.length))
    const [tried, setTried] = useState<number[]>([])
    const round = equivalenceRounds[roundIndex]
    const solved = tried.some((index) => equals(round.options[index], round.prompt))
    const lastTry = tried[tried.length - 1]

    const choose = (index: number) => {
        if (solved || tried.includes(index)) return
        setTried((current) => [...current, index])
        if (equals(round.options[index], round.prompt)) onComplete(round.id)
    }

    const next = () => {
        const nextIndex = (roundIndex + 1) % equivalenceRounds.length
        setRoundIndex(nextIndex)
        setOrder(shuffledOrder(equivalenceRounds[nextIndex].options.length))
        setTried([])
    }

    return (
        <div className="fraction-v2-game">
            <div className="fraction-v2-game-card">
                <div className="fraction-v2-game-score">{equivalenceRounds.filter((item) => completedIds.includes(item.id)).length} / {equivalenceRounds.length}</div>
                <p>{l({ eu: 'Zein da zatiki honen baliokidea?', es: '¿Cuál es equivalente a esta fracción?', ar: 'أي كسر يكافئ هذا الكسر؟' })}</p>
                <div className="fraction-v2-game-prompt"><MathText text={`$${writtenLatex(round.prompt)}$`} /></div>
                <div className="fraction-v2-game-options">
                    {order.map((index) => {
                        const option = round.options[index]
                        const isTried = tried.includes(index)
                        const isCorrect = equals(option, round.prompt)
                        return (
                            <button
                                type="button"
                                className={isTried ? (isCorrect ? 'correct' : 'incorrect') : ''}
                                aria-label={`${option.numerator}/${option.denominator}`}
                                aria-pressed={isTried}
                                disabled={solved && !isTried}
                                onClick={() => choose(index)}
                                key={`${round.id}-${index}`}
                            >
                                <MathText text={`$${writtenLatex(option)}$`} />
                            </button>
                        )
                    })}
                </div>
                {lastTry !== undefined && (
                    <div className={`fraction-v2-game-feedback ${solved ? 'success' : 'error'}`} aria-live="polite">
                        {solved
                            ? l({ eu: 'Bai. Biek balio bera dute.', es: 'Sí. Ambas tienen exactamente el mismo valor.', ar: 'نعم. للكسرين القيمة نفسها تمامًا.' })
                            : l({ eu: 'Ez oraindik. Sinplifikatu bietako bakoitza eta alderatu.', es: 'Todavía no. Simplifica cada una y compáralas.', ar: 'ليس بعد. بسّط كل كسر ثم قارن بينهما.' })}
                    </div>
                )}
                <button type="button" className="fraction-v2-primary" onClick={next}>{l({ eu: 'Hurrengo txanda', es: 'Siguiente ronda', ar: 'الجولة التالية' })}</button>
            </div>
        </div>
    )
}
