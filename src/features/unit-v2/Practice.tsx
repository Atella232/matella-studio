import { useState } from 'react'
import { handleTabArrow } from './tabs'
import { MathText } from '../../components/MathText'
import { checkAnswer } from './math/fraction'
import { englishDigits } from '../../utils/numberFormat'
import type { PracticeMode } from './routing'
import {
    exerciseBankSize,
    pickText,
    type ChallengeItem,
    type ExerciseDifficulty,
    type LocalizedText,
    type PracticeItem,
    type UnitDefinition,
    type UnitLanguage
} from './types'

type TaskFeedback = 'idle' | 'success' | 'error' | 'wrong-form' | 'unreadable'

function isChallengeItem(item: PracticeItem): item is ChallengeItem {
    return 'points' in item && typeof item.points === 'number'
}

export function PracticeArea({
    unit,
    language,
    mode: requestedMode,
    onModeChange,
    focusStage,
    guidedCompletedIds,
    onGuidedComplete,
    bankCompletedIds,
    onBankComplete
}: {
    unit: UnitDefinition
    language: UnitLanguage
    mode: PracticeMode
    onModeChange: (mode: PracticeMode) => void
    /** Stage of the lesson the student comes from: practice starts there */
    focusStage?: string
    guidedCompletedIds: number[]
    onGuidedComplete: (id: number) => void
    bankCompletedIds: number[]
    onBankComplete: (id: number) => void
}) {
    const l = (text: LocalizedText) => pickText(language, text)
    const guided = unit.guidedPractice ?? []
    const bankSize = exerciseBankSize(unit)
    const mode: PracticeMode = guided.length === 0 ? 'bank' : bankSize === 0 ? 'guided' : requestedMode
    const setMode = (next: PracticeMode) => { if (next !== mode) onModeChange(next) }

    const deck = <PracticeDeck key={`deck-${focusStage ?? ''}`} unit={unit} items={guided} completedIds={guidedCompletedIds} onComplete={onGuidedComplete} language={language} focusStage={focusStage} />
    const bank = <ExerciseBank key={`bank-${focusStage ?? ''}`} unit={unit} completedIds={bankCompletedIds} onComplete={onBankComplete} language={language} focusStage={focusStage} />
    if (guided.length === 0) return bank
    if (bankSize === 0) return deck

    return (
        <div className="fraction-v2-practice-area">
            <div className="fraction-v2-practice-switch" role="tablist" aria-label={l({ eu: 'Praktika mota', es: 'Tipo de práctica', en: 'Practice type', ar: 'نوع التدريب' })}>
                <button type="button" role="tab" id="fraction-v2-practice-guided-tab" aria-controls="fraction-v2-practice-panel" aria-selected={mode === 'guided'} className={mode === 'guided' ? 'active' : ''} onKeyDown={handleTabArrow} onClick={() => setMode('guided')}>
                    {l({ eu: 'Praktika gidatua', es: 'Práctica guiada', en: 'Guided practice', ar: 'تدريب موجّه' })} · {guided.length}
                </button>
                <button type="button" role="tab" id="fraction-v2-practice-bank-tab" aria-controls="fraction-v2-practice-panel" aria-selected={mode === 'bank'} className={mode === 'bank' ? 'active' : ''} onKeyDown={handleTabArrow} onClick={() => setMode('bank')}>
                    {l({ eu: 'Ariketa-bankua', es: 'Banco de ejercicios', en: 'Exercise bank', ar: 'بنك التمارين' })} · {bankSize}
                </button>
            </div>
            <div id="fraction-v2-practice-panel" role="tabpanel" aria-labelledby={`fraction-v2-practice-${mode}-tab`}>
                {mode === 'guided' ? deck : bank}
            </div>
        </div>
    )
}

function ExerciseBank({
    unit,
    completedIds,
    onComplete,
    language,
    focusStage
}: {
    unit: UnitDefinition
    completedIds: number[]
    onComplete: (id: number) => void
    language: UnitLanguage
    focusStage?: string
}) {
    const l = (text: LocalizedText) => pickText(language, text)
    const sections = unit.exerciseBank ?? []
    const total = exerciseBankSize(unit)
    // Bank sections share their id with the stage they practise
    const [sectionId, setSectionId] = useState(sections.find((item) => item.id === focusStage)?.id ?? sections[0]?.id ?? '')
    const [difficulty, setDifficulty] = useState<'all' | ExerciseDifficulty>('all')
    const [attempts, setAttempts] = useState<Record<string, string>>({})
    const [revealed, setRevealed] = useState<string[]>([])
    const [checks, setChecks] = useState<Record<string, TaskFeedback>>({})
    const sectionIndex = Math.max(0, sections.findIndex((section) => section.id === sectionId))
    const section = sections[sectionIndex]
    const items = section ? section.items.filter((item) => difficulty === 'all' || item.difficulty === difficulty) : []
    const exerciseProgressId = (itemId: number) => sectionIndex * 100 + itemId

    const difficultyLabel: Record<'all' | ExerciseDifficulty, LocalizedText> = {
        all: { eu: 'Guztiak', es: 'Todas', en: 'All', ar: 'الكل' },
        easy: { eu: 'Oinarrizkoa', es: 'Básica', en: 'Basic', ar: 'أساسي' },
        medium: { eu: 'Ertaina', es: 'Media', en: 'Medium', ar: 'متوسط' },
        hard: { eu: 'Sakontzea', es: 'Profundización', en: 'Extension', ar: 'متقدم' }
    }

    if (!section) return null

    return (
        <section className="fraction-v2-bank" aria-labelledby="fraction-v2-bank-title">
            <div className="fraction-v2-page-intro">
                <span>{l({ eu: `${total} ARIKETA`, es: `${total} EJERCICIOS`, en: `${total} EXERCISES`, ar: `${total} تمرينًا` })}</span>
                <h1 id="fraction-v2-bank-title">{l({ eu: 'Praktikatu gai eta zailtasunaren arabera', es: 'Practica por tema y dificultad', en: 'Practise by topic and difficulty', ar: 'تدرّب حسب الموضوع والصعوبة' })}</h1>
                <p>{l({ eu: 'Emaitza zenbaki bat denean, idatzi eta egiaztatu: zuzena bada, lortutzat markatzen da. Gainerakoetan, idatzi zure saiakera, alderatu ebazpenarekin eta markatu lortu duzun.', es: 'Cuando el resultado es un número, escríbelo y compruébalo: si es correcto, se marca como conseguido. En los demás, escribe tu intento, compáralo con la resolución y marca si lo has conseguido.', en: 'When the result is a number, write it and check it: if it is correct, it is marked as completed. For the rest, write your attempt, compare it with the worked solution and mark whether you have completed it.', ar: 'عندما تكون النتيجة عددًا اكتبها وتحقق منها: إذا كانت صحيحة تُحتسب تلقائيًا. وفي غيرها اكتب محاولتك وقارنها بالحل وحدد إن كنت قد أتقنتها.' })}</p>
            </div>

            <div className="fraction-v2-bank-toolbar">
                <label htmlFor="fraction-v2-bank-section">{l({ eu: 'Gaia', es: 'Tema', en: 'Topic', ar: 'الموضوع' })}</label>
                <select id="fraction-v2-bank-section" value={section.id} onChange={(event) => setSectionId(event.target.value)}>
                    {sections.map((item) => <option value={item.id} key={item.id}>{item.title[language]}</option>)}
                </select>
                <div className="fraction-v2-difficulty-filter" aria-label={l({ eu: 'Zailtasuna', es: 'Dificultad', en: 'Difficulty', ar: 'الصعوبة' })}>
                    {(Object.keys(difficultyLabel) as Array<'all' | ExerciseDifficulty>).map((level) => (
                        <button type="button" aria-pressed={difficulty === level} onClick={() => setDifficulty(level)} key={level}>{l(difficultyLabel[level])}</button>
                    ))}
                </div>
                <strong>{completedIds.length} / {total}</strong>
            </div>

            <div className="fraction-v2-bank-grid">
                {items.map((item) => {
                    const key = `${section.id}-${item.id}`
                    const progressId = exerciseProgressId(item.id)
                    const hasAttempt = Boolean(attempts[key]?.trim())
                    const isRevealed = revealed.includes(key)
                    const isComplete = completedIds.includes(progressId)
                    const answer = item.answer
                    const answerForm = answer?.form ?? unit.answers.defaultForm
                    const feedback = checks[key] ?? 'idle'
                    const check = () => {
                        if (!answer) return
                        const written = attempts[key] ?? ''
                        const answerText = language === 'en' ? englishDigits(written) : written
                        const result = checkAnswer(unit.answers.normalizeInput?.(answerText) ?? answerText, answer.expected, answerForm)
                        const next: TaskFeedback = result === 'correct' ? 'success' : result === 'incorrect' ? 'error' : result
                        setChecks((state) => ({ ...state, [key]: next }))
                        if (next === 'success' && !isComplete) onComplete(progressId)
                    }
                    return (
                        <article className={`fraction-v2-bank-card ${isComplete ? 'complete' : ''}`} key={key}>
                            <div className="fraction-v2-bank-card-meta">
                                <span>{item.id}</span>
                                <em>{l(difficultyLabel[item.difficulty])}</em>
                                {isComplete && <strong>✓</strong>}
                            </div>
                            <div className="fraction-v2-bank-question"><MathText text={item.question[language]} /></div>
                            {item.figure && <div className="fraction-v2-task-figure">{item.figure(language)}</div>}
                            {answer ? (
                                <>
                                    <label htmlFor={`fraction-v2-bank-attempt-${key}`}>{l({ eu: 'Zure erantzuna', es: 'Tu respuesta', en: 'Your answer', ar: 'إجابتك' })}</label>
                                    <div className="fraction-v2-answer-row">
                                        <input
                                            id={`fraction-v2-bank-attempt-${key}`}
                                            value={attempts[key] ?? ''}
                                            onChange={(event) => {
                                                setAttempts((state) => ({ ...state, [key]: event.target.value }))
                                                setChecks((state) => ({ ...state, [key]: 'idle' }))
                                            }}
                                            onKeyDown={(event) => { if (event.key === 'Enter') check() }}
                                            placeholder={l(unit.answers.placeholder(answerForm))}
                                            inputMode={answerForm === 'mixed' ? 'text' : unit.answers.inputMode}
                                        />
                                        <button type="button" className="fraction-v2-primary" onClick={check} disabled={!hasAttempt}>{l({ eu: 'Egiaztatu', es: 'Comprobar', en: 'Check', ar: 'تحقق' })}</button>
                                    </div>
                                    <div aria-live="polite">
                                        {feedback === 'success' && <div className="fraction-v2-feedback success">{l({ eu: 'Zuzena! Ariketa lortuta.', es: '¡Correcto! Ejercicio conseguido.', en: 'Correct! Exercise completed.', ar: 'صحيح! أتقنت التمرين.' })}</div>}
                                        {feedback === 'error' && <div className="fraction-v2-feedback error">{l(unit.errorByStage[section.id] ?? { eu: 'Ez da zuzena. Berrikusi urratsak eta saiatu berriro.', es: 'No es correcto. Revisa los pasos y vuelve a intentarlo.', en: 'Not correct. Review the steps and try again.', ar: 'ليست صحيحة. راجع الخطوات وحاول مجددًا.' })}</div>}
                                        {feedback === 'wrong-form' && <div className="fraction-v2-feedback form">{l(answer.formMessage ?? unit.answers.wrongForm(answerForm))}</div>}
                                        {feedback === 'unreadable' && <div className="fraction-v2-feedback">{l(unit.answers.unreadable)}</div>}
                                    </div>
                                </>
                            ) : (
                                <>
                                    <label htmlFor={`fraction-v2-bank-attempt-${key}`}>{l({ eu: 'Zure saiakera', es: 'Tu intento', en: 'Your attempt', ar: 'محاولتك' })}</label>
                                    <textarea
                                        id={`fraction-v2-bank-attempt-${key}`}
                                        rows={2}
                                        value={attempts[key] ?? ''}
                                        onChange={(event) => setAttempts((state) => ({ ...state, [key]: event.target.value }))}
                                        placeholder={l({ eu: 'Idatzi emaitza edo arrazoibidea…', es: 'Escribe el resultado o razonamiento…', en: 'Write the answer or your reasoning…', ar: 'اكتب النتيجة أو الاستدلال…' })}
                                    />
                                </>
                            )}
                            <button
                                type="button"
                                className="fraction-v2-hint-button"
                                disabled={!hasAttempt}
                                aria-expanded={isRevealed}
                                onClick={() => setRevealed((keys) => keys.includes(key) ? keys.filter((itemKey) => itemKey !== key) : [...keys, key])}
                            >
                                {isRevealed ? l({ eu: 'Ebazpena ezkutatu', es: 'Ocultar resolución', en: 'Hide solution', ar: 'إخفاء الحل' }) : l({ eu: 'Ebazpena alderatu', es: 'Comparar con la resolución', en: 'Compare with the solution', ar: 'قارن بالحل' })}
                            </button>
                            {!hasAttempt && <small>{l({ eu: 'Ebazpena ikusi aurretik saiakera bat idatzi.', es: 'Escribe un intento antes de ver la resolución.', en: 'Write an attempt before you see the solution.', ar: 'اكتب محاولة قبل عرض الحل.' })}</small>}
                            {isRevealed && (
                                <div className="fraction-v2-bank-solution">
                                    <MathText text={item.solution[language]} />
                                    {item.solutionFigure && <div className="fraction-v2-task-figure">{item.solutionFigure(language)}</div>}
                                    <div>
                                        {/* A checked exercise is only completed by a correct answer */}
                                        {!answer && <button type="button" className={`fraction-v2-primary ${isComplete ? 'done' : ''}`} onClick={() => onComplete(progressId)} disabled={isComplete}>{isComplete ? '✓' : l({ eu: 'Lortu dut', es: 'Lo he conseguido', en: 'I\'ve got it', ar: 'أتقنتها' })}</button>}
                                        <button type="button" className="fraction-v2-secondary" onClick={() => setRevealed((keys) => keys.filter((itemKey) => itemKey !== key))}>{l({ eu: 'Berriro saiatu', es: 'Volver a intentar', en: 'Try again', ar: 'حاول مجددًا' })}</button>
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

export function PracticeDeck({
    unit,
    items,
    completedIds,
    onComplete,
    language,
    challengeMode = false,
    focusStage
}: {
    unit: UnitDefinition
    items: PracticeItem[]
    completedIds: number[]
    onComplete: (id: number) => void
    language: UnitLanguage
    challengeMode?: boolean
    focusStage?: string
}) {
    const l = (text: LocalizedText) => pickText(language, text)
    const [currentIndex, setCurrentIndex] = useState(() => startIndex(items, completedIds, focusStage))
    const [answers, setAnswers] = useState<Record<number, string>>({})
    const [feedback, setFeedback] = useState<Record<number, TaskFeedback>>({})
    const [hints, setHints] = useState<number[]>([])
    const current = items[currentIndex]
    if (!current) return null
    const isComplete = completedIds.includes(current.id)
    const currentFeedback = feedback[current.id] ?? (isComplete ? 'success' : 'idle')
    const answerForm = current.answerForm ?? unit.answers.defaultForm
    const stageOf = (id: string) => unit.stages.find((stage) => stage.id === id) ?? unit.stages[0]

    const check = () => {
        const written = answers[current.id] ?? ''
        const answerText = language === 'en' ? englishDigits(written) : written
        const result = checkAnswer(unit.answers.normalizeInput?.(answerText) ?? answerText, current.expected, answerForm)
        const next: TaskFeedback = result === 'correct' ? 'success' : result === 'incorrect' ? 'error' : result
        setFeedback((state) => ({ ...state, [current.id]: next }))
        if (result === 'correct') onComplete(current.id)
    }

    return (
        <section className="fraction-v2-practice" aria-labelledby="fraction-v2-practice-title">
            <div className="fraction-v2-page-intro">
                <span>{challengeMode ? l({ eu: 'ERRONKAK', es: 'RETOS', en: 'CHALLENGES', ar: 'التحديات' }) : l({ eu: 'PRAKTIKA GIDATUA', es: 'PRÁCTICA GUIADA', en: 'GUIDED PRACTICE', ar: 'تدريب موجّه' })}</span>
                <h1 id="fraction-v2-practice-title">{challengeMode
                    ? l({ eu: 'Aplikatu egoera errealetan', es: 'Aplica en situaciones reales', en: 'Apply it in real-life situations', ar: 'طبّق في مواقف واقعية' })
                    : l({ eu: 'Saiatu, jaso pista eta ulertu', es: 'Intenta, recibe una pista y comprende', en: 'Try, get a hint and understand', ar: 'حاول ثم خذ تلميحًا وافهم' })}</h1>
                <p>{l(unit.answers.note)}</p>
            </div>

            <div className="fraction-v2-task-layout">
                <nav className="fraction-v2-task-list" aria-label={l({ eu: 'Ariketen zerrenda', es: 'Lista de ejercicios', en: 'Exercise list', ar: 'قائمة التمارين' })}>
                    {items.map((item, index) => (
                        <button
                            type="button"
                            className={`${index === currentIndex ? 'active' : ''} ${completedIds.includes(item.id) ? 'done' : ''}`}
                            data-stage={item.stage}
                            data-tone={stageOf(item.stage).tone}
                            aria-current={index === currentIndex ? 'step' : undefined}
                            aria-label={`${index + 1}: ${l(item.prompt)}`}
                            onClick={() => setCurrentIndex(index)}
                            key={item.id}
                        >
                            <span>{completedIds.includes(item.id) ? '✓' : index + 1}</span>
                            {challengeMode ? `${'★'.repeat(isChallengeItem(item) ? Math.max(1, item.points / 10) : 1)}` : l(stageOf(item.stage).title)}
                        </button>
                    ))}
                </nav>

                <article className={`fraction-v2-task-card ${currentFeedback}`} data-stage={current.stage} data-tone={stageOf(current.stage).tone} aria-live="polite">
                    <div className="fraction-v2-task-meta">
                        <span>{currentIndex + 1} / {items.length}</span>
                        {challengeMode && isChallengeItem(current) && <strong>+{current.points} pts</strong>}
                    </div>
                    <h2><MathText text={l(current.prompt)} /></h2>
                    {current.expression && <div className="fraction-v2-task-expression"><MathText text={current.expression} /></div>}
                    {current.figure && <div className="fraction-v2-task-figure">{current.figure(language)}</div>}
                    <label htmlFor={`fraction-v2-answer-${current.id}`}>{l({ eu: 'Zure erantzuna', es: 'Tu respuesta', en: 'Your answer', ar: 'إجابتك' })}</label>
                    <div className="fraction-v2-answer-row">
                        <input
                            id={`fraction-v2-answer-${current.id}`}
                            value={answers[current.id] ?? ''}
                            onChange={(event) => {
                                setAnswers((state) => ({ ...state, [current.id]: event.target.value }))
                                setFeedback((state) => ({ ...state, [current.id]: 'idle' }))
                            }}
                            onKeyDown={(event) => { if (event.key === 'Enter') check() }}
                            placeholder={l(unit.answers.placeholder(answerForm))}
                            inputMode={answerForm === 'mixed' ? 'text' : unit.answers.inputMode}
                        />
                        <button type="button" className="fraction-v2-primary" onClick={check}>{l({ eu: 'Egiaztatu', es: 'Comprobar', en: 'Check', ar: 'تحقق' })}</button>
                    </div>
                    <button type="button" className="fraction-v2-hint-button" aria-expanded={hints.includes(current.id)} onClick={() => setHints((ids) => ids.includes(current.id) ? ids.filter((id) => id !== current.id) : [...ids, current.id])}>
                        {l({ eu: 'Pista bat behar dut', es: 'Necesito una pista', en: 'I need a hint', ar: 'أحتاج إلى تلميح' })}
                    </button>
                    {hints.includes(current.id) && <div className="fraction-v2-hint"><MathText text={l(current.hint)} /></div>}
                    {currentFeedback === 'error' && <div className="fraction-v2-feedback error">{l(unit.errorByStage[current.stage] ?? { eu: 'Ez da zuzena. Berrikusi urratsak.', es: 'No es correcto. Revisa los pasos.', en: 'Not correct. Review the steps.', ar: 'ليست صحيحة. راجع الخطوات.' })}</div>}
                    {currentFeedback === 'wrong-form' && <div className="fraction-v2-feedback form">{l(unit.answers.wrongForm(answerForm))}</div>}
                    {currentFeedback === 'unreadable' && <div className="fraction-v2-feedback">{l(unit.answers.unreadable)}</div>}
                    {currentFeedback === 'success' && (
                        <div className="fraction-v2-feedback success">
                            <strong>{l({ eu: 'Zuzena.', es: 'Correcto.', en: 'Correct.', ar: 'صحيح.' })}</strong>
                            <MathText text={l(current.explanation)} />
                        </div>
                    )}
                    <div className="fraction-v2-task-navigation">
                        <button type="button" disabled={currentIndex === 0} onClick={() => setCurrentIndex((index) => index - 1)}>{l({ eu: 'Aurrekoa', es: 'Anterior', en: 'Previous', ar: 'السابق' })}</button>
                        <button type="button" disabled={currentIndex === items.length - 1} onClick={() => setCurrentIndex((index) => index + 1)}>{l({ eu: 'Hurrengoa', es: 'Siguiente', en: 'Next', ar: 'التالي' })}</button>
                    </div>
                </article>
            </div>
        </section>
    )
}

/** First pending activity of the stage (or its first one if all are done); the first activity without a stage */
function startIndex(items: PracticeItem[], completedIds: number[], stage?: string): number {
    if (!stage) return 0
    const inStage = items.map((item, index) => ({ item, index })).filter(({ item }) => item.stage === stage)
    const pending = inStage.find(({ item }) => !completedIds.includes(item.id))
    return (pending ?? inStage[0])?.index ?? 0
}
