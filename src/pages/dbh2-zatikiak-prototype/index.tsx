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
    add,
    answerEquals,
    compare,
    divide,
    equals,
    fraction,
    multiply,
    subtract,
    toExactDecimal,
    toLatex,
    toMixedText,
    toNumber,
    toText,
    type FractionValue
} from './math/fraction'
import {
    gameModeForPath,
    practiceModeForPath,
    sectionForPath,
    type GameMode,
    type PracticeMode
} from './routing'
import './PrototypePage.css'

type Feedback = 'idle' | 'success' | 'error'
type LabMode = 'pizza' | 'area' | 'numberline' | 'equivalence' | 'compare' | 'operations' | 'proportion'
type Operation = 'add' | 'subtract' | 'multiply' | 'divide'

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

function DiagnosticQuiz({ completedIds, onComplete, language, onStartLearning }: { completedIds: number[]; onComplete: (id: number) => void; language: ReturnType<typeof normalizePrototypeLanguage>; onStartLearning: (topic: TheoryTopicId) => void }) {
    const l = (text: LocalizedText) => pickText(language, text)
    const [questionIndex, setQuestionIndex] = useState(0)
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
    const [feedback, setFeedback] = useState<Feedback>('idle')
    const [reviewTopics, setReviewTopics] = useState<TheoryTopicId[]>([])
    const question = diagnosticQuestions[questionIndex]
    const complete = diagnosticQuestions.every((item) => completedIds.includes(item.id))

    const choose = (index: number) => {
        setSelectedIndex(index)
        const correct = index === question.correctIndex
        setFeedback(correct ? 'success' : 'error')
        if (correct) onComplete(question.id)
        else setReviewTopics((topics) => topics.includes(question.topic) ? topics : [...topics, question.topic])
    }

    const next = () => {
        setQuestionIndex((index) => Math.min(index + 1, diagnosticQuestions.length - 1))
        setSelectedIndex(null)
        setFeedback('idle')
    }

    if (complete) {
        const firstReview = reviewTopics[0] ?? 'meaning'
        return (
            <section className="fraction-v2-diagnostic" aria-labelledby="fraction-v2-diagnostic-title">
                <div className="fraction-v2-page-intro">
                    <span>{l({ eu: 'DIAGNOSTIKOA OSATUTA', es: 'DIAGNÓSTICO COMPLETADO', ar: 'اكتمل التشخيص' })}</span>
                    <h1 id="fraction-v2-diagnostic-title">{l({ eu: 'Ibilbidea prest dago', es: 'Tu ruta está preparada', ar: 'مسارك جاهز' })}</h1>
                    <p>{reviewTopics.length === 0
                        ? l({ eu: 'Oinarrizko ideia guztiak menderatzen dituzu. Hasi nahi duzun gaitik.', es: 'Dominas todas las ideas iniciales. Puedes comenzar por el tema que prefieras.', ar: 'أنت متقن للأفكار الأولية. يمكنك البدء بالموضوع الذي تفضله.' })
                        : l({ eu: 'Erantzunen arabera, lehenik berrikusteko gai bat proposatzen dizugu.', es: 'Según tus respuestas, te proponemos un primer tema de revisión.', ar: 'استنادًا إلى إجاباتك نقترح موضوعًا أول للمراجعة.' })}</p>
                </div>
                <div className="fraction-v2-diagnostic-result">
                    <strong>{completedIds.filter((id) => id >= 601 && id <= 606).length} / 6</strong>
                    <button type="button" className="fraction-v2-primary" onClick={() => onStartLearning(firstReview)}>{l({ eu: 'Ikasten hasi', es: 'Empezar a aprender', ar: 'ابدأ التعلم' })}</button>
                </div>
            </section>
        )
    }

    return (
        <section className="fraction-v2-diagnostic" aria-labelledby="fraction-v2-diagnostic-title">
            <div className="fraction-v2-page-intro">
                <span>{l({ eu: '6 GALDERA · PUNTUAZIORIK GABE', es: '6 PREGUNTAS · SIN NOTA', ar: '6 أسئلة · بلا علامة' })}</span>
                <h1 id="fraction-v2-diagnostic-title">{l({ eu: 'Aurkitu nondik hasi', es: 'Descubre por dónde empezar', ar: 'اكتشف من أين تبدأ' })}</h1>
                <p>{l({ eu: 'Ez da azterketa bat. Erantzunek hurrengo urrats egokia aukeratzen lagunduko dute.', es: 'No es un examen. Tus respuestas ayudarán a elegir el siguiente paso adecuado.', ar: 'هذا ليس اختبارًا. ستساعد إجاباتك على اختيار الخطوة التالية المناسبة.' })}</p>
            </div>
            <article className="fraction-v2-diagnostic-card" aria-live="polite">
                <div className="fraction-v2-diagnostic-progress"><span style={{ width: `${((questionIndex + 1) / diagnosticQuestions.length) * 100}%` }} /></div>
                <small>{questionIndex + 1} / {diagnosticQuestions.length}</small>
                <h2>{l(question.prompt)}</h2>
                <div className="fraction-v2-diagnostic-options">
                    {question.options.map((option, index) => (
                        <button type="button" aria-pressed={selectedIndex === index} className={selectedIndex === index ? feedback : ''} disabled={feedback === 'success'} onClick={() => choose(index)} key={`${question.id}-${index}`}><span dir="ltr">{l(option)}</span></button>
                    ))}
                </div>
                {feedback !== 'idle' && <div className={`fraction-v2-feedback ${feedback}`}><MathText text={l(question.explanation)} /></div>}
                <button type="button" className="fraction-v2-primary" disabled={feedback !== 'success' || questionIndex === diagnosticQuestions.length - 1} onClick={next}>{l({ eu: 'Hurrengo galdera', es: 'Siguiente pregunta', ar: 'السؤال التالي' })}</button>
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
                                        <button type="button" className="fraction-v2-primary" onClick={() => onComplete(progressId)} disabled={isComplete}>{isComplete ? '✓' : l({ eu: 'Lortu dut', es: 'Lo he conseguido', ar: 'أتقنتها' })}</button>
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

function useStoredIds(key: string) {
    const [ids, setIds] = useState<number[]>(() => {
        try {
            const stored = localStorage.getItem(key)
            if (!stored) return []
            const parsed: unknown = JSON.parse(stored)
            return Array.isArray(parsed) ? parsed.filter((id): id is number => typeof id === 'number' && Number.isSafeInteger(id)) : []
        } catch {
            return []
        }
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(ids))
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

function FractionModel({ value, label }: { value: FractionValue; label: string }) {
    const normalized = fraction(value.numerator, value.denominator)
    const absoluteNumerator = Math.abs(normalized.numerator)
    const unitCount = Math.max(1, Math.ceil(absoluteNumerator / normalized.denominator))
    const units = Array.from({ length: unitCount }, (_, unitIndex) => unitIndex)
    const segments = Array.from({ length: normalized.denominator }, (_, segmentIndex) => segmentIndex)

    return (
        <div className="fraction-v2-model-wrap">
            <div
                className={`fraction-v2-model ${normalized.numerator < 0 ? 'negative' : ''}`}
                role="img"
                aria-label={`${label}: ${toText(normalized)}`}
            >
                {normalized.numerator < 0 && <span className="fraction-v2-sign" aria-hidden="true">−</span>}
                <div className="fraction-v2-units" aria-hidden="true">
                    {units.map((unitIndex) => (
                        <div
                            className="fraction-v2-unit"
                            style={{ '--parts': normalized.denominator } as CSSProperties}
                            key={unitIndex}
                        >
                            {segments.map((segmentIndex) => {
                                const position = unitIndex * normalized.denominator + segmentIndex
                                return <span className={position < absoluteNumerator ? 'filled' : ''} key={segmentIndex} />
                            })}
                        </div>
                    ))}
                </div>
            </div>
            <MathText text={`$${toLatex(normalized)}$`} />
            {absoluteNumerator > normalized.denominator && (
                <span className="fraction-v2-mixed">{toMixedText(normalized)}</span>
            )}
        </div>
    )
}

function NumberLineModel({ value, label }: { value: FractionValue; label: string }) {
    const numericValue = toNumber(value)
    const minimum = Math.floor(Math.min(0, numericValue)) - 1
    const maximum = Math.ceil(Math.max(0, numericValue)) + 1
    const position = ((numericValue - minimum) / (maximum - minimum)) * 100

    return (
        <div className="fraction-v2-number-line" role="img" aria-label={`${label}: ${toText(value)}`}>
            <span className="fraction-v2-line-start">{minimum}</span>
            <span className="fraction-v2-line-end">{maximum}</span>
            <span className="fraction-v2-line-marker" style={{ insetInlineStart: `${position}%` }}>
                <MathText text={`$${toLatex(value)}$`} />
            </span>
        </div>
    )
}

const TOTAL_GAME_GOALS = equivalenceRounds.length + pizzaRounds.length + new Set(memoryCardsSource.map((card) => card.pairId)).size + raceRounds.length

export function ZatikiakPrototypePage() {
    const { i18n } = useTranslation()
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
    const learned = useStoredTopics('matella-zatikiak-v2-learned')
    const diagnosticProgress = useStoredIds('matella-zatikiak-v2-diagnostic')
    const practiceProgress = useStoredIds('matella-zatikiak-v2-practice')
    const bankProgress = useStoredIds('matella-zatikiak-v2-exercise-bank')
    const challengeProgress = useStoredIds('matella-zatikiak-v2-challenges')
    const playProgress = useStoredIds('matella-zatikiak-v2-play')

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
        const confirmed = window.confirm(l({ eu: 'V2ko aurrerapen guztia ezabatu nahi duzu?', es: '¿Quieres borrar todo el progreso de la V2?', ar: 'هل تريد حذف كل تقدم النسخة الجديدة؟' }))
        if (!confirmed) return
        diagnosticProgress.reset()
        learned.reset()
        practiceProgress.reset()
        bankProgress.reset()
        challengeProgress.reset()
        playProgress.reset()
    }

    const completedGoals = diagnosticProgress.ids.length + learned.ids.length + practiceProgress.ids.length + bankProgress.ids.length + challengeProgress.ids.length + playProgress.ids.length
    const totalGoals = diagnosticQuestions.length + theoryTopics.length + guidedPractice.length + 42 + challenges.length + TOTAL_GAME_GOALS
    const progress = Math.round((completedGoals / totalGoals) * 100)
    const recommendedTopic = theoryTopics.find((topic) => !learned.ids.includes(topic.id)) ?? theoryTopics[theoryTopics.length - 1]

    return (
        <div className="fraction-v2" dir={isRtl ? 'rtl' : 'ltr'}>
            <header className="fraction-v2-header">
                <div className="fraction-v2-brand">
                    <span className="fraction-v2-brand-mark" aria-hidden="true">⅔</span>
                    <span>
                        <strong>{l({ eu: 'Zatikiak', es: 'Fracciones', ar: 'الكسور' })}</strong>
                        <small>{l({ eu: '2. DBH · bertsio berria', es: '2.º ESO · versión nueva', ar: 'الصف الثاني · النسخة الجديدة' })}</small>
                    </span>
                </div>
                <nav className="fraction-v2-nav" aria-label={l({ eu: 'Unitateko nabigazioa', es: 'Navegación de la unidad', ar: 'التنقل في الوحدة' })}>
                    {prototypeSections.map((item) => (
                        <button
                            type="button"
                            className={section === item.id ? 'active' : ''}
                            aria-current={section === item.id ? 'page' : undefined}
                            onClick={() => navigate(item.id)}
                            key={item.id}
                        >
                            <span aria-hidden="true">{item.icon}</span>
                            {l(item.label)}
                        </button>
                    ))}
                </nav>
                <div className="fraction-v2-language" role="group" aria-label={l({ eu: 'Hizkuntza', es: 'Idioma', ar: 'اللغة' })}>
                    {(['eu', 'es', 'ar'] as const).map((code) => (
                        <button type="button" aria-pressed={language === code} onClick={() => void i18n.changeLanguage(code)} key={code}>{code.toUpperCase()}</button>
                    ))}
                </div>
                <div className="fraction-v2-progress" aria-label={`${l({ eu: 'Aurrerapena', es: 'Progreso', ar: 'التقدم' })}: ${progress}%`}>
                    <span style={{ width: `${progress}%` }} />
                </div>
            </header>

            <main className="fraction-v2-main">
                {section === 'route' && renderRoute()}
                {section === 'diagnostic' && (
                    <DiagnosticQuiz
                        completedIds={diagnosticProgress.ids}
                        onComplete={diagnosticProgress.addId}
                        language={language}
                        onStartLearning={(nextTopic) => { setTopicId(nextTopic); navigate('learn') }}
                    />
                )}
                {section === 'learn' && renderLearn()}
                {section === 'lab' && <FractionLaboratory language={language} />}
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

    function renderRoute() {
        return (
            <div className="fraction-v2-route">
                <section className="fraction-v2-hero">
                    <div className="fraction-v2-kicker">{l({ eu: 'ULERTU · IRUDIKATU · ARRAZOITU', es: 'COMPRENDE · REPRESENTA · RAZONA', ar: 'افهم · مثّل · استدل' })}</div>
                    <h1>{l({ eu: 'Zatikiei buruz ikastea baino gehiago.', es: 'Mucho más que memorizar fracciones.', ar: 'أكثر بكثير من حفظ الكسور.' })}</h1>
                    <p>{l({
                        eu: 'Ibilbide gidatu honek esanahia, irudikapena eta kalkulu zehatza lotzen ditu. Urrats bakoitzean manipulatu, erantzun eta azalduko duzu.',
                        es: 'Esta ruta guiada conecta significado, representación y cálculo exacto. En cada paso manipularás, responderás y explicarás.',
                        ar: 'يربط هذا المسار الموجّه بين المعنى والتمثيل والحساب الدقيق. في كل خطوة ستتفاعل وتجيب وتشرح.'
                    })}</p>
                    <div className="fraction-v2-hero-actions">
                        <button type="button" className="fraction-v2-primary" onClick={() => {
                            if (diagnosticProgress.ids.length < diagnosticQuestions.length) navigate('diagnostic')
                            else {
                                setTopicId(recommendedTopic.id)
                                navigate('learn')
                            }
                        }}>
                            {diagnosticProgress.ids.length < diagnosticQuestions.length
                                ? l({ eu: 'Hasi diagnostikoarekin', es: 'Empezar con el diagnóstico', ar: 'ابدأ بالتشخيص' })
                                : l({ eu: 'Jarraitu hurrengo urratsarekin', es: 'Continuar con el siguiente paso', ar: 'تابع إلى الخطوة التالية' })}
                        </button>
                        <button type="button" className="fraction-v2-secondary" onClick={() => navigate('lab')}>
                            {l({ eu: 'Ireki laborategia', es: 'Abrir laboratorio', ar: 'افتح المختبر' })}
                        </button>
                    </div>
                    <div className="fraction-v2-curriculum" aria-label={l({ eu: 'Curriculum-loturak', es: 'Conexiones curriculares', ar: 'الارتباط بالمنهج' })}>
                        <span>{l({ eu: 'Irudikapen anitzak', es: 'Representaciones múltiples', ar: 'تمثيلات متعددة' })}</span>
                        <span>{l({ eu: 'Kalkulu zehatza', es: 'Cálculo exacto', ar: 'حساب دقيق' })}</span>
                        <span>{l({ eu: 'Proportzionaltasuna', es: 'Proporcionalidad', ar: 'التناسب' })}</span>
                        <span>{l({ eu: 'Errorearen analisia', es: 'Análisis del error', ar: 'تحليل الخطأ' })}</span>
                    </div>
                </section>

                <section className="fraction-v2-overview" aria-labelledby="fraction-v2-path-title">
                    <div className="fraction-v2-section-heading">
                        <span>{progress}%</span>
                        <div>
                            <h2 id="fraction-v2-path-title">{l({ eu: 'Zure ikaskuntza-ibilbidea', es: 'Tu ruta de aprendizaje', ar: 'مسار تعلّمك' })}</h2>
                            <p>{completedGoals} / {totalGoals} {l({ eu: 'helburu osatuta', es: 'objetivos completados', ar: 'هدفًا مكتملًا' })}</p>
                        </div>
                    </div>
                    <div className="fraction-v2-path-grid">
                        {learningStages.map((stage, index) => {
                            const stageTopics = theoryTopics.filter((topic) => topic.stage === stage.id)
                            const complete = stageTopics.every((topic) => learned.ids.includes(topic.id))
                            const recommended = stage.id === recommendedTopic.stage
                            return (
                                <button
                                    type="button"
                                    className={`fraction-v2-path-card ${complete ? 'complete' : ''} ${recommended ? 'recommended' : ''}`}
                                    style={{ '--stage-color': stage.color } as CSSProperties}
                                    onClick={() => {
                                        const nextTopic = stageTopics.find((topic) => !learned.ids.includes(topic.id)) ?? stageTopics[0]
                                        setTopicId(nextTopic.id)
                                        navigate('learn')
                                    }}
                                    key={stage.id}
                                >
                                    <span className="fraction-v2-path-index">{complete ? '✓' : index + 1}</span>
                                    <span className="fraction-v2-path-icon" aria-hidden="true">{stage.icon}</span>
                                    <strong>{l(stage.title)}</strong>
                                    <small>{l(stage.goal)}</small>
                                    {recommended && <em>{l({ eu: 'Hurrengo urratsa', es: 'Siguiente paso', ar: 'الخطوة التالية' })}</em>}
                                </button>
                            )
                        })}
                    </div>
                </section>

                <section className="fraction-v2-principles">
                    <article><strong>1</strong><h3>{l({ eu: 'Lehenik ulertu', es: 'Primero comprende', ar: 'افهم أولًا' })}</h3><p>{l({ eu: 'Arau bakoitzak irudi eta azalpen bat du.', es: 'Cada regla nace de una imagen y una explicación.', ar: 'تنطلق كل قاعدة من صورة وتفسير.' })}</p></article>
                    <article><strong>2</strong><h3>{l({ eu: 'Ondoren praktikatu', es: 'Después practica', ar: 'ثم تدرّب' })}</h3><p>{l({ eu: 'Pista erantzuna baino lehen agertzen da.', es: 'La pista aparece antes que la solución.', ar: 'يظهر التلميح قبل الحل.' })}</p></article>
                    <article><strong>3</strong><h3>{l({ eu: 'Azkenik aplikatu', es: 'Finalmente aplica', ar: 'وأخيرًا طبّق' })}</h3><p>{l({ eu: 'Testuinguruko erronkek arrazoibidea egiaztatzen dute.', es: 'Los retos contextualizados comprueban el razonamiento.', ar: 'تختبر التحديات السياقية الاستدلال.' })}</p></article>
                </section>

                <div className="fraction-v2-route-footer">
                    <Link className="fraction-v2-back" to="/matematika/dbh2/zatikiak">
                        {l({ eu: '← Oraingo bertsiora itzuli', es: '← Volver a la versión actual', ar: 'العودة إلى النسخة الحالية ←' })}
                    </Link>
                    <button type="button" onClick={resetAllProgress}>{l({ eu: 'V2ko aurrerapena berrezarri', es: 'Reiniciar progreso de la V2', ar: 'إعادة ضبط تقدم النسخة الجديدة' })}</button>
                </div>
            </div>
        )
    }

    function renderLearn() {
        const currentTopic = theoryTopics.find((topic) => topic.id === topicId) ?? theoryTopics[0]
        return (
            <section className="fraction-v2-learning" aria-labelledby="fraction-v2-learning-title">
                <div className="fraction-v2-page-intro">
                    <span>{l({ eu: 'IKASI', es: 'APRENDE', ar: 'تعلّم' })}</span>
                    <h1 id="fraction-v2-learning-title">{l({ eu: 'Ideia bat aldi bakoitzean', es: 'Una idea cada vez', ar: 'فكرة واحدة في كل مرة' })}</h1>
                    <p>{l({ eu: 'Aukeratu urrats bat. Edukia laburra da eta zuzenean dagokion praktikara eramaten du.', es: 'Elige un paso. El contenido es breve y conduce directamente a su práctica.', ar: 'اختر خطوة. المحتوى موجز ويقود مباشرة إلى التدريب المرتبط به.' })}</p>
                </div>
                <div className="fraction-v2-learning-layout">
                    <div className="fraction-v2-stage-tabs" role="tablist" aria-label={l({ eu: 'Ikaskuntza-urratsak', es: 'Etapas de aprendizaje', ar: 'مراحل التعلم' })}>
                        {theoryTopics.map((topic, index) => (
                            <button
                                type="button"
                                role="tab"
                                id={`fraction-v2-theory-tab-${topic.id}`}
                                aria-controls="fraction-v2-theory-panel"
                                aria-selected={topic.id === currentTopic.id}
                                className={topic.id === currentTopic.id ? 'active' : ''}
                                onKeyDown={handleTabArrow}
                                onClick={() => setTopicId(topic.id)}
                                key={topic.id}
                            >
                                <span>{learned.ids.includes(topic.id) ? '✓' : index + 1}</span>
                                {l(topic.title)}
                            </button>
                        ))}
                    </div>
                    <article
                        className="fraction-v2-lesson"
                        role="tabpanel"
                        id="fraction-v2-theory-panel"
                        aria-labelledby={`fraction-v2-theory-tab-${currentTopic.id}`}
                        style={{ '--stage-color': currentTopic.color } as CSSProperties}
                    >
                        <span className="fraction-v2-lesson-icon" aria-hidden="true">{currentTopic.icon}</span>
                        <p className="fraction-v2-lesson-goal"><strong>{l({ eu: 'Helburua:', es: 'Objetivo:', ar: 'الهدف:' })}</strong> {l(currentTopic.goal)}</p>
                        <h2>{l(currentTopic.title)}</h2>
                        <p>{l(currentTopic.explanation)}</p>
                        <div className="fraction-v2-example"><MathText text={currentTopic.example} /></div>
                        <div className="fraction-v2-takeaway"><span aria-hidden="true">◆</span><p>{l(currentTopic.takeaway)}</p></div>
                        <div className="fraction-v2-lesson-actions">
                            <button type="button" className="fraction-v2-primary" onClick={() => learned.addId(currentTopic.id)} disabled={learned.ids.includes(currentTopic.id)}>
                                {learned.ids.includes(currentTopic.id)
                                    ? l({ eu: 'Ulertuta', es: 'Comprendido', ar: 'تم الفهم' })
                                    : l({ eu: 'Ulertu dut', es: 'Lo he comprendido', ar: 'فهمت' })}
                            </button>
                            <button type="button" className="fraction-v2-secondary" onClick={() => navigate('practice')}>
                                {l({ eu: 'Praktikara joan', es: 'Ir a la práctica', ar: 'انتقل إلى التدريب' })}
                            </button>
                        </div>
                    </article>
                </div>
            </section>
        )
    }
}

function FractionLaboratory({ language }: { language: ReturnType<typeof normalizePrototypeLanguage> }) {
    const l = (text: LocalizedText) => pickText(language, text)
    const [mode, setMode] = useState<LabMode>('pizza')
    const [numerator, setNumerator] = useState(7)
    const [denominator, setDenominator] = useState(3)
    const [secondNumerator, setSecondNumerator] = useState(-2)
    const [secondDenominator, setSecondDenominator] = useState(5)
    const [multiplier, setMultiplier] = useState(2)
    const [quantity, setQuantity] = useState(120)
    const [operation, setOperation] = useState<Operation>('add')
    const first = fraction(numerator, denominator)
    const second = fraction(secondNumerator, secondDenominator)
    const comparison = compare(first, second)
    let result: FractionValue | null
    try {
        if (operation === 'add') result = add(first, second)
        else if (operation === 'subtract') result = subtract(first, second)
        else if (operation === 'multiply') result = multiply(first, second)
        else result = divide(first, second)
    } catch {
        result = null
    }

    const labels: Record<Operation, string> = { add: '+', subtract: '−', multiply: '×', divide: '÷' }
    const fractionOfQuantity = multiply(first, fraction(quantity))
    const percentage = multiply(first, fraction(100))
    const exactDecimal = toExactDecimal(first, language === 'ar' ? '.' : ',')
    const approximateDecimal = toNumber(first).toFixed(3).replace('.', language === 'ar' ? '.' : ',')
    const pizzaNumerator = Math.min(Math.max(numerator, 0), denominator)
    const pizzaSelectedAngle = (pizzaNumerator / denominator) * 360
    const pizzaSliceAngle = 360 / denominator

    return (
        <section className="fraction-v2-lab" aria-labelledby="fraction-v2-lab-title">
            <div className="fraction-v2-page-intro">
                <span>{l({ eu: 'LABORATEGIA', es: 'LABORATORIO', ar: 'المختبر' })}</span>
                <h1 id="fraction-v2-lab-title">{l({ eu: 'Ikusi balioa, ez soilik ikurra', es: 'Observa el valor, no solo el símbolo', ar: 'شاهد القيمة لا الرمز فقط' })}</h1>
                <p>{l({ eu: 'Zazpi tresna zehatzek pizza, azalera, zenbaki-zuzena, baliokidetasuna, konparazioa, eragiketak eta proportzioak lotzen dituzte.', es: 'Siete herramientas exactas conectan pizza, área, recta numérica, equivalencia, comparación, operaciones y proporciones.', ar: 'تربط سبع أدوات دقيقة بين البيتزا والمساحة وخط الأعداد والتكافؤ والمقارنة والعمليات والتناسب.' })}</p>
            </div>

            <div className="fraction-v2-lab-tabs" role="tablist" aria-label={l({ eu: 'Tresna aukeratu', es: 'Elegir herramienta', ar: 'اختر أداة' })}>
                {([
                    ['pizza', { eu: 'Pizza', es: 'Pizza', ar: 'البيتزا' }],
                    ['area', { eu: 'Azalera', es: 'Área', ar: 'المساحة' }],
                    ['numberline', { eu: 'Zenbaki-zuzena', es: 'Recta', ar: 'خط الأعداد' }],
                    ['equivalence', { eu: 'Baliokidetasuna', es: 'Equivalencia', ar: 'التكافؤ' }],
                    ['compare', { eu: 'Konparatu', es: 'Compara', ar: 'قارن' }],
                    ['operations', { eu: 'Eragiketak', es: 'Operaciones', ar: 'العمليات' }],
                    ['proportion', { eu: 'Proportzioa', es: 'Proporción', ar: 'التناسب' }]
                ] as Array<[LabMode, LocalizedText]>).map(([id, label]) => (
                    <button type="button" role="tab" id={`fraction-v2-lab-tab-${id}`} aria-controls="fraction-v2-lab-panel" aria-selected={mode === id} className={mode === id ? 'active' : ''} onKeyDown={handleTabArrow} onClick={() => setMode(id)} key={id}>{l(label)}</button>
                ))}
            </div>

            <div className="fraction-v2-lab-board">
                <div className="fraction-v2-controls">
                    <h2>{l({ eu: 'Lehen zatikia', es: 'Primera fracción', ar: 'الكسر الأول' })}</h2>
                    <label htmlFor="fraction-v2-numerator">{l({ eu: 'Zenbakitzailea', es: 'Numerador', ar: 'البسط' })}: <strong>{mode === 'pizza' ? pizzaNumerator : numerator}</strong></label>
                    <input id="fraction-v2-numerator" type="range" min={mode === 'pizza' ? 0 : -12} max={mode === 'pizza' ? denominator : 12} value={mode === 'pizza' ? pizzaNumerator : numerator} onInput={(event) => setNumerator(Number(event.currentTarget.value))} />
                    <label htmlFor="fraction-v2-denominator">{l({ eu: 'Izendatzailea', es: 'Denominador', ar: 'المقام' })}: <strong>{denominator}</strong></label>
                    <input id="fraction-v2-denominator" type="range" min="2" max="12" value={denominator} onInput={(event) => setDenominator(Number(event.currentTarget.value))} />

                    {mode === 'equivalence' && (
                        <>
                            <label htmlFor="fraction-v2-multiplier">{l({ eu: 'Biderkatzailea', es: 'Multiplicador', ar: 'المضاعِف' })}: <strong>{multiplier}</strong></label>
                            <input id="fraction-v2-multiplier" type="range" min="1" max="6" value={multiplier} onInput={(event) => setMultiplier(Number(event.currentTarget.value))} />
                        </>
                    )}

                    {(mode === 'compare' || mode === 'operations') && (
                        <>
                            <h2>{l({ eu: 'Bigarren zatikia', es: 'Segunda fracción', ar: 'الكسر الثاني' })}</h2>
                            <label htmlFor="fraction-v2-second-numerator">{l({ eu: 'Zenbakitzailea', es: 'Numerador', ar: 'البسط' })}: <strong>{secondNumerator}</strong></label>
                            <input id="fraction-v2-second-numerator" type="range" min="-12" max="12" value={secondNumerator} onInput={(event) => setSecondNumerator(Number(event.currentTarget.value))} />
                            <label htmlFor="fraction-v2-second-denominator">{l({ eu: 'Izendatzailea', es: 'Denominador', ar: 'المقام' })}: <strong>{secondDenominator}</strong></label>
                            <input id="fraction-v2-second-denominator" type="range" min="2" max="12" value={secondDenominator} onInput={(event) => setSecondDenominator(Number(event.currentTarget.value))} />
                            {mode === 'operations' && <div className="fraction-v2-operation-picker" aria-label={l({ eu: 'Eragiketa', es: 'Operación', ar: 'العملية' })}>
                                {(Object.keys(labels) as Operation[]).map((item) => (
                                    <button type="button" aria-pressed={operation === item} onClick={() => setOperation(item)} key={item}>{labels[item]}</button>
                                ))}
                            </div>}
                        </>
                    )}
                    {mode === 'proportion' && (
                        <>
                            <h2>{l({ eu: 'Kantitatea', es: 'Cantidad', ar: 'الكمية' })}</h2>
                            <label htmlFor="fraction-v2-quantity">{l({ eu: 'Guztizkoa', es: 'Total', ar: 'المجموع' })}: <strong>{quantity}</strong></label>
                            <input id="fraction-v2-quantity" type="range" min="1" max="300" value={quantity} onInput={(event) => setQuantity(Number(event.currentTarget.value))} />
                        </>
                    )}
                </div>

                <div className="fraction-v2-visuals" role="tabpanel" id="fraction-v2-lab-panel" aria-labelledby={`fraction-v2-lab-tab-${mode}`}>
                    {mode === 'pizza' && (
                        <>
                            <div
                                className="fraction-v2-pizza fraction-v2-lab-pizza"
                                role="img"
                                aria-label={`${l({ eu: 'Pizza-zatikia', es: 'Fracción de pizza', ar: 'كسر البيتزا' })}: ${pizzaNumerator}/${denominator}`}
                                style={{ '--selected-angle': `${pizzaSelectedAngle}deg`, '--slice-angle': `${pizzaSliceAngle}deg` } as CSSProperties}
                            />
                            <div className="fraction-v2-operation-result"><MathText text={`$\\frac{${pizzaNumerator}}{${denominator}}$`} /></div>
                            <p className="fraction-v2-insight">{l({ eu: 'Pizza-laborategiak zatiki propioak eraikitzen ditu. Zatiki inpropioak ikusteko, erabili azalera-eredua.', es: 'El laboratorio de pizza construye fracciones propias. Para impropias, utiliza el modelo de área.', ar: 'يبني مختبر البيتزا الكسور الحقيقية. وللكسور غير الحقيقية استعمل نموذج المساحة.' })}</p>
                        </>
                    )}
                    {mode === 'area' && (
                        <>
                            <FractionModel value={first} label={l({ eu: 'Azalera-eredua', es: 'Modelo de área', ar: 'نموذج المساحة' })} />
                            <p className="fraction-v2-insight">{l({ eu: 'Unitate oso guztiak marrazten dira eta zati kopurua izendatzailearekin bat dator beti.', es: 'Se dibujan todas las unidades completas y el número de partes coincide siempre con el denominador.', ar: 'تُرسم كل الوحدات الكاملة ويطابق عدد الأجزاء المقام دائمًا.' })}</p>
                        </>
                    )}
                    {mode === 'numberline' && (
                        <>
                            <NumberLineModel value={first} label={l({ eu: 'Zenbaki-zuzena', es: 'Recta numérica', ar: 'خط الأعداد' })} />
                            <div className="fraction-v2-operation-result"><MathText text={`$${toLatex(first)}${exactDecimal === null ? '\\approx' : '='}${exactDecimal ?? approximateDecimal}$`} /></div>
                            <p className="fraction-v2-insight">{l({ eu: 'Eskala automatikoki zabaltzen da: markatzailea ez da inoiz pantailatik kanpo geratzen.', es: 'La escala se amplía automáticamente: el marcador nunca queda fuera de la pantalla.', ar: 'يتوسع المقياس تلقائيًا، فلا تخرج العلامة من الشاشة.' })}</p>
                        </>
                    )}
                    {mode === 'equivalence' && (
                        <>
                            <div className="fraction-v2-equivalence-pair">
                                <FractionModel value={first} label={l({ eu: 'Jatorrizko zatikia', es: 'Fracción original', ar: 'الكسر الأصلي' })} />
                                <span aria-hidden="true">=</span>
                                <FractionModel value={{ numerator: first.numerator * multiplier, denominator: first.denominator * multiplier }} label={l({ eu: 'Zatiki baliokidea', es: 'Fracción equivalente', ar: 'الكسر المكافئ' })} />
                            </div>
                            <MathText text={`$\\frac{${first.numerator}}{${first.denominator}}=\\frac{${first.numerator}\\cdot${multiplier}}{${first.denominator}\\cdot${multiplier}}=\\frac{${first.numerator * multiplier}}{${first.denominator * multiplier}}$`} />
                        </>
                    )}
                    {mode === 'operations' && (
                        <>
                            <div className="fraction-v2-operation-result">
                                <MathText text={`$${toLatex(first)}\\;${labels[operation]}\\;${toLatex(second)}$`} />
                                <span aria-hidden="true">=</span>
                                {result ? <MathText text={`$${toLatex(result)}$`} /> : <strong>{l({ eu: 'Ezin da zeroz zatitu', es: 'No se puede dividir entre cero', ar: 'لا يمكن القسمة على صفر' })}</strong>}
                            </div>
                            <div className="fraction-v2-operands">
                                <FractionModel value={first} label={l({ eu: 'Lehen eragigaia', es: 'Primer operando', ar: 'المعامل الأول' })} />
                                <span>{comparison === 0 ? '=' : comparison < 0 ? '<' : '>'}</span>
                                <FractionModel value={second} label={l({ eu: 'Bigarren eragigaia', es: 'Segundo operando', ar: 'المعامل الثاني' })} />
                            </div>
                        </>
                    )}
                    {mode === 'compare' && (
                        <>
                            <div className="fraction-v2-operation-result">
                                <MathText text={`$${toLatex(first)}\\;${comparison === 0 ? '=' : comparison < 0 ? '<' : '>'}\\;${toLatex(second)}$`} />
                            </div>
                            <div className="fraction-v2-operands">
                                <FractionModel value={first} label={l({ eu: 'Lehen zatikia', es: 'Primera fracción', ar: 'الكسر الأول' })} />
                                <span>{comparison === 0 ? '=' : comparison < 0 ? '<' : '>'}</span>
                                <FractionModel value={second} label={l({ eu: 'Bigarren zatikia', es: 'Segunda fracción', ar: 'الكسر الثاني' })} />
                            </div>
                            <p className="fraction-v2-insight">{l({ eu: 'Konparazioak balio zehatza erabiltzen du, ez biribildutako hamartarra.', es: 'La comparación utiliza el valor exacto, no un decimal redondeado.', ar: 'تستعمل المقارنة القيمة الدقيقة لا عددًا عشريًا مقرّبًا.' })}</p>
                        </>
                    )}
                    {mode === 'proportion' && (
                        <>
                            <div className="fraction-v2-proportion-grid">
                                <article><span>{l({ eu: 'Zatikia', es: 'Fracción', ar: 'الكسر' })}</span><MathText text={`$${toLatex(first)}$`} /></article>
                                <article><span>{l({ eu: 'Hamartarra', es: 'Decimal', ar: 'العشري' })}</span><strong>{exactDecimal ?? l({ eu: 'periodikoa', es: 'periódico', ar: 'دوري' })}</strong></article>
                                <article><span>{l({ eu: 'Ehunekoa', es: 'Porcentaje', ar: 'النسبة المئوية' })}</span><MathText text={`$${toLatex(percentage)}\\%$`} /></article>
                            </div>
                            <div className="fraction-v2-operation-result">
                                <MathText text={`$${quantity}\\cdot${toLatex(first)}=${toLatex(fractionOfQuantity)}$`} />
                            </div>
                            <p className="fraction-v2-insight">{exactDecimal === null
                                ? l({ eu: 'Hamartarra periodikoa denez, ez da berdintasun faltsurik erakusten.', es: 'Como el decimal es periódico, no se muestra una igualdad falsa con una aproximación.', ar: 'لأن العدد العشري دوري، لا نعرض مساواة زائفة مع قيمة تقريبية.' })
                                : l({ eu: 'Hiru adierazpenek balio bera dute zehazki.', es: 'Las tres representaciones tienen exactamente el mismo valor.', ar: 'للتمثيلات الثلاثة القيمة الدقيقة نفسها.' })}</p>
                        </>
                    )}
                </div>
            </div>
        </section>
    )
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
    const [feedback, setFeedback] = useState<Record<number, Feedback>>({})
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

    const check = () => {
        const correct = answerEquals(answers[current.id] ?? '', current.expected)
        setFeedback((state) => ({ ...state, [current.id]: correct ? 'success' : 'error' }))
        if (correct) onComplete(current.id)
    }

    return (
        <section className="fraction-v2-practice" aria-labelledby="fraction-v2-practice-title">
            <div className="fraction-v2-page-intro">
                <span>{challengeMode ? l({ eu: 'ERRONKAK', es: 'RETOS', ar: 'التحديات' }) : l({ eu: 'PRAKTIKA GIDATUA', es: 'PRÁCTICA GUIADA', ar: 'تدريب موجّه' })}</span>
                <h1 id="fraction-v2-practice-title">{challengeMode
                    ? l({ eu: 'Aplikatu egoera errealetan', es: 'Aplica en situaciones reales', ar: 'طبّق في مواقف واقعية' })
                    : l({ eu: 'Saiatu, jaso pista eta ulertu', es: 'Intenta, recibe una pista y comprende', ar: 'حاول ثم خذ تلميحًا وافهم' })}</h1>
                <p>{l({ eu: 'Erantzun baliokideak eta koma edo puntua duten hamartarrak onartzen dira.', es: 'Se aceptan fracciones equivalentes y decimales con coma o punto.', ar: 'تُقبل الكسور المكافئة والأعداد العشرية بالفاصلة أو النقطة.' })}</p>
            </div>

            <div className="fraction-v2-task-layout">
                <nav className="fraction-v2-task-list" aria-label={l({ eu: 'Ariketen zerrenda', es: 'Lista de ejercicios', ar: 'قائمة التمارين' })}>
                    {items.map((item, index) => (
                        <button
                            type="button"
                            className={index === currentIndex ? 'active' : ''}
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

                <article className={`fraction-v2-task-card ${currentFeedback}`} aria-live="polite">
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
                            placeholder={l({ eu: 'Adib.: 3/4 edo 0,75', es: 'Ej.: 3/4 o 0,75', ar: 'مثال: 3/4 أو 0.75' })}
                            inputMode="decimal"
                        />
                        <button type="button" className="fraction-v2-primary" onClick={check}>{l({ eu: 'Egiaztatu', es: 'Comprobar', ar: 'تحقق' })}</button>
                    </div>
                    <button type="button" className="fraction-v2-hint-button" aria-expanded={hints.includes(current.id)} onClick={() => setHints((ids) => ids.includes(current.id) ? ids.filter((id) => id !== current.id) : [...ids, current.id])}>
                        {l({ eu: 'Pista bat behar dut', es: 'Necesito una pista', ar: 'أحتاج إلى تلميح' })}
                    </button>
                    {hints.includes(current.id) && <div className="fraction-v2-hint"><MathText text={l(current.hint)} /></div>}
                    {currentFeedback === 'error' && <div className="fraction-v2-feedback error">{l(errorByStage[current.stage])}</div>}
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
                <p>{l({ eu: 'Pizza, memoria eta lasterketa berreraiki dira motor matematiko beraren gainean. Ez dago zati fantasmik edo hurbilketa faltsurik.', es: 'Pizza, memoria y carrera se han reconstruido sobre el mismo motor matemático. No hay porciones fantasma ni aproximaciones falsas.', ar: 'أُعيد بناء البيتزا والذاكرة والسباق فوق المحرك الرياضي نفسه، بلا أجزاء وهمية أو تقريبات زائفة.' })}</p>
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
            <p>{l({ eu: 'Aurkitu balio bera duten bi adierazpenak. Karta ezkutuen edukia ez da irakurgailuari erakusten.', es: 'Encuentra dos representaciones del mismo valor. El contenido oculto no se expone al lector de pantalla.', ar: 'اعثر على تمثيلين للقيمة نفسها. لا يُكشف محتوى البطاقة المخفية لقارئ الشاشة.' })}</p>
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

function ExactEquivalenceGame({ completedIds, onComplete, language }: { completedIds: number[]; onComplete: (id: number) => void; language: ReturnType<typeof normalizePrototypeLanguage> }) {
    const l = (text: LocalizedText) => pickText(language, text)
    const [roundIndex, setRoundIndex] = useState(0)
    const [selected, setSelected] = useState<number | null>(null)
    const round = equivalenceRounds[roundIndex]
    const correct = selected !== null && equals(round.options[selected], round.prompt)

    const choose = (index: number) => {
        setSelected(index)
        if (equals(round.options[index], round.prompt)) onComplete(round.id)
    }

    const next = () => {
        setRoundIndex((index) => (index + 1) % equivalenceRounds.length)
        setSelected(null)
    }

    return (
        <section className="fraction-v2-game" aria-labelledby="fraction-v2-game-title">
            <div className="fraction-v2-page-intro">
                <span>{l({ eu: 'JOKO ZEHATZA', es: 'JUEGO EXACTO', ar: 'لعبة دقيقة' })}</span>
                <h1 id="fraction-v2-game-title">{l({ eu: 'Aurkitu baliokidea', es: 'Encuentra la equivalente', ar: 'اعثر على الكسر المكافئ' })}</h1>
                <p>{l({ eu: 'Ez dago hurbilketarik: aukera zuzenak balio bera du zehazki.', es: 'No hay aproximaciones: la opción correcta tiene exactamente el mismo valor.', ar: 'لا توجد تقريبـات: الخيار الصحيح يملك القيمة نفسها تمامًا.' })}</p>
            </div>
            <div className="fraction-v2-game-card">
                <div className="fraction-v2-game-score">{equivalenceRounds.filter((item) => completedIds.includes(item.id)).length} / {equivalenceRounds.length}</div>
                <p>{l({ eu: 'Zein da zatiki honen baliokidea?', es: '¿Cuál es equivalente a esta fracción?', ar: 'أي كسر يكافئ هذا الكسر؟' })}</p>
                <div className="fraction-v2-game-prompt"><MathText text={`$${toLatex(round.prompt)}$`} /></div>
                <div className="fraction-v2-game-options">
                    {round.options.map((option, index) => (
                        <button
                            type="button"
                            className={selected === index ? (correct ? 'correct' : 'incorrect') : ''}
                            aria-label={option.denominator === 1 ? `${option.numerator}` : `${option.numerator}/${option.denominator}`}
                            aria-pressed={selected === index}
                            onClick={() => choose(index)}
                            key={toText(option)}
                        >
                            <MathText text={`$${option.denominator === 1 ? option.numerator : `${option.numerator < 0 ? '-' : ''}\\frac{${Math.abs(option.numerator)}}{${option.denominator}}`}$`} />
                        </button>
                    ))}
                </div>
                {selected !== null && (
                    <div className={`fraction-v2-game-feedback ${correct ? 'success' : 'error'}`} aria-live="polite">
                        {correct
                            ? l({ eu: 'Bai. Biek balio bera dute.', es: 'Sí. Ambas tienen exactamente el mismo valor.', ar: 'نعم. للكسرين القيمة نفسها تمامًا.' })
                            : l({ eu: 'Ez oraindik. Sinplifikatu aukera eta alderatu.', es: 'Todavía no. Simplifica la opción y compara.', ar: 'ليس بعد. بسّط الخيار ثم قارن.' })}
                    </div>
                )}
                <button type="button" className="fraction-v2-primary" onClick={next}>{l({ eu: 'Hurrengo txanda', es: 'Siguiente ronda', ar: 'الجولة التالية' })}</button>
            </div>
        </section>
    )
}
