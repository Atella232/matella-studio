import { useId, useState, type ReactNode } from 'react'
import { MathText } from '../../../components/MathText'
import { Icon } from '../icons'
import { checkAnswer, type AnswerForm, type FractionValue } from '../math/fraction'
import type { LocalizedText, StageTone, UnitLanguage } from '../types'
import { englishDigits } from '../../../utils/numberFormat'
import { createRandom, randomSeed } from '../games/random'
import type { LabChallenge, LabChallengeMaker, LabExtraChallenge, LabToolInfo, OperationAnswer } from './types'
import { useLabText } from './useLabText'
import './LabKit.css'

type PrototypeLanguage = UnitLanguage

/** Touch-friendly numeric control: − value + */
export function Stepper({
    label,
    value,
    min,
    max,
    step = 1,
    format = String,
    onChange,
    language
}: {
    label: string
    value: number
    min: number
    max: number
    step?: number
    /** How the value is written, e.g. with an explicit sign */
    format?: (value: number) => string
    onChange: (value: number) => void
    language: PrototypeLanguage
}) {
    const l = useLabText(language)
    const labelId = useId()
    const clamp = (next: number) => Math.min(max, Math.max(min, next))
    return (
        <div className="fraction-v2-stepper" role="group" aria-labelledby={labelId}>
            <span id={labelId} className="fraction-v2-stepper-label">{label}</span>
            <div className="fraction-v2-stepper-row">
                <button type="button" aria-label={`${l({ eu: 'Gutxitu', es: 'Reducir', en: 'Decrease', ar: 'إنقاص' })}: ${label}`} disabled={value <= min} onClick={() => onChange(clamp(value - step))}>−</button>
                <output aria-live="polite" dir="ltr">{format(value)}</output>
                <button type="button" aria-label={`${l({ eu: 'Handitu', es: 'Aumentar', en: 'Increase', ar: 'زيادة' })}: ${label}`} disabled={value >= max} onClick={() => onChange(clamp(value + step))}>+</button>
            </div>
        </div>
    )
}

/** A small set of mutually exclusive options shown as a pill row */
export function Segmented<Value extends string>({
    label,
    value,
    options,
    onChange
}: {
    label: string
    value: Value
    options: Array<{ value: Value; label: string }>
    onChange: (value: Value) => void
}) {
    const labelId = useId()
    return (
        <div className="fraction-v2-segmented" role="group" aria-labelledby={labelId}>
            <span id={labelId} className="fraction-v2-stepper-label">{label}</span>
            <div>
                {options.map((option) => (
                    <button type="button" aria-pressed={option.value === value} onClick={() => onChange(option.value)} key={option.value}>{option.label}</button>
                ))}
            </div>
        </div>
    )
}

function ChallengePanel<State>({
    challenges,
    makeExtra,
    state,
    completedIds,
    onComplete,
    language
}: {
    challenges: LabChallenge<State>[]
    /** Makes endless practice challenges once the fixed ones are done (or whenever the learner asks) */
    makeExtra?: LabChallengeMaker<State>
    state: State
    completedIds: number[]
    onComplete: (id: number) => void
    language: PrototypeLanguage
}) {
    const l = useLabText(language)
    const firstPending = challenges.findIndex((challenge) => !completedIds.includes(challenge.id))
    const [index, setIndex] = useState(Math.max(0, firstPending))
    const [extra, setExtra] = useState<LabExtraChallenge<State> | null>(null)
    const [extraSolved, setExtraSolved] = useState(0)
    const [result, setResult] = useState<'idle' | 'success' | 'error'>('idle')
    const [showHint, setShowHint] = useState(false)
    const fixed = challenges[index]
    const challenge = extra ?? fixed
    const allDone = challenges.every((item) => completedIds.includes(item.id))
    const isDone = extra ? result === 'success' : completedIds.includes(fixed.id)

    const reset = () => {
        setResult('idle')
        setShowHint(false)
    }

    const goTo = (next: number) => {
        setExtra(null)
        setIndex(next)
        reset()
    }

    const newExtra = () => {
        if (!makeExtra) return
        setExtra(makeExtra(createRandom(randomSeed())))
        reset()
    }

    const check = () => {
        const solved = challenge.isSolved(state)
        setResult(solved ? 'success' : 'error')
        if (!solved) return
        if (extra) setExtraSolved((count) => count + 1)
        else onComplete(fixed.id)
    }

    const extraKicker = l({ eu: `Erronka gehigarria · ${extraSolved} lortuta`, es: `Reto extra · ${extraSolved} ${extraSolved === 1 ? 'conseguido' : 'conseguidos'}`, en: `Extra challenge · ${extraSolved} completed`, ar: `تحدٍّ إضافي · ${extraSolved} منجزة` })

    return (
        <section className="fraction-v2-lab-challenge" aria-label={l({ eu: 'Erronkak', es: 'Retos', en: 'Challenges', ar: 'التحديات' })}>
            <div className="fraction-v2-lab-challenge-head">
                <span className="fraction-v2-lab-challenge-kicker">{extra ? extraKicker : l({ eu: `${index + 1}. erronka / ${challenges.length}`, es: `Reto ${index + 1} de ${challenges.length}`, en: `Challenge ${index + 1} of ${challenges.length}`, ar: `التحدي ${index + 1} من ${challenges.length}` })}</span>
                <div className="fraction-v2-lab-challenge-dots">
                    {challenges.map((item, itemIndex) => (
                        <button
                            type="button"
                            className={`${completedIds.includes(item.id) ? 'done' : ''} ${!extra && itemIndex === index ? 'current' : ''}`}
                            aria-label={`${l({ eu: 'Erronka', es: 'Reto', en: 'Challenge', ar: 'التحدي' })} ${itemIndex + 1}${completedIds.includes(item.id) ? ` · ${l({ eu: 'lortuta', es: 'conseguido', en: 'completed', ar: 'منجز' })}` : ''}`}
                            aria-current={!extra && itemIndex === index ? 'step' : undefined}
                            onClick={() => goTo(itemIndex)}
                            key={item.id}
                        >
                            {completedIds.includes(item.id) && <Icon name="check" size={12} strokeWidth={3.4} />}
                        </button>
                    ))}
                    {makeExtra && (
                        <button
                            type="button"
                            className={`fraction-v2-lab-challenge-extra ${extra ? 'current' : ''}`}
                            aria-label={l({ eu: 'Erronka gehigarriak', es: 'Retos extra', en: 'Extra challenges', ar: 'تحديات إضافية' })}
                            aria-current={extra ? 'step' : undefined}
                            onClick={newExtra}
                        >
                            ∞
                        </button>
                    )}
                </div>
            </div>
            <p className="fraction-v2-lab-challenge-prompt"><MathText text={l(challenge.prompt)} /></p>
            <div className="fraction-v2-lab-challenge-actions">
                <button type="button" className={`fraction-v2-primary ${isDone ? 'done' : ''}`} onClick={check} disabled={isDone}>
                    {isDone && <Icon name="check" size={18} strokeWidth={3} />}
                    {isDone ? l({ eu: 'Lortuta', es: 'Conseguido', en: 'Completed', ar: 'منجز' }) : l({ eu: 'Egiaztatu', es: 'Comprobar', en: 'Check', ar: 'تحقق' })}
                </button>
                {!isDone && (
                    <button type="button" className="fraction-v2-hint-button" aria-expanded={showHint} onClick={() => setShowHint((visible) => !visible)}>
                        {l({ eu: 'Pista', es: 'Pista', en: 'Hint', ar: 'تلميح' })}
                    </button>
                )}
                {!extra && index < challenges.length - 1 && (
                    <button type="button" className="fraction-v2-secondary" onClick={() => goTo(index + 1)}>
                        {l({ eu: 'Hurrengo erronka', es: 'Siguiente reto', en: 'Next challenge', ar: 'التحدي التالي' })}
                    </button>
                )}
                {makeExtra && (extra || index === challenges.length - 1) && (
                    <button type="button" className="fraction-v2-secondary" onClick={newExtra}>
                        {extra ? l({ eu: 'Beste erronka bat', es: 'Otro reto', en: 'Another challenge', ar: 'تحدٍّ آخر' }) : l({ eu: 'Erronka gehigarria', es: 'Reto extra', en: 'Extra challenge', ar: 'تحدٍّ إضافي' })}
                    </button>
                )}
            </div>
            {showHint && !isDone && <div className="fraction-v2-hint"><MathText text={l(challenge.hint)} /></div>}
            <div aria-live="polite">
                {result === 'success' && (
                    <div className="fraction-v2-feedback success">
                        {extra
                            ? l({ eu: 'Lortuta! Sakatu «Beste erronka bat» jarraitzeko.', es: '¡Conseguido! Pulsa «Otro reto» para seguir.', en: 'Completed! Press “Another challenge” to continue.', ar: 'أحسنت! اضغط «تحدٍّ آخر» لتتابع.' })
                            : allDone
                                ? makeExtra
                                    ? l({ eu: 'Lortuta! Erronka guztiak osatu dituzu. Jarraitu erronka gehigarriekin (∞).', es: '¡Conseguido! Has completado todos los retos. Sigue con los retos extra (∞).', en: 'Completed! You have finished all the challenges. Keep going with the extra challenges (∞).', ar: 'أحسنت! أكملت كل التحديات. تابع مع التحديات الإضافية (∞).' })
                                    : l({ eu: 'Lortuta! Tresna honetako erronka guztiak osatu dituzu.', es: '¡Conseguido! Has completado todos los retos de esta herramienta.', en: 'Completed! You have finished all the challenges for this tool.', ar: 'أحسنت! أكملت كل تحديات هذه الأداة.' })
                                : l({ eu: 'Lortuta!', es: '¡Conseguido!', en: 'Completed!', ar: 'أحسنت!' })}
                    </div>
                )}
                {result === 'error' && (
                    <div className="fraction-v2-feedback error">{l({ eu: 'Oraindik ez. Berrikusi eredua edo eskatu pista bat.', es: 'Todavía no. Revisa el modelo o pide una pista.', en: 'Not yet. Review the model or ask for a hint.', ar: 'ليس بعد. راجع النموذج أو اطلب تلميحًا.' })}</div>
                )}
            </div>
        </section>
    )
}

/** Shared layout for every lab tool: header, what to notice, controls, model and challenges */
export function ToolFrame<State>({
    tool,
    tone,
    language,
    stageLabel,
    controls,
    readout,
    children,
    challenges,
    extraChallenges,
    state,
    completedIds,
    onComplete,
    onOpenLesson
}: {
    tool: LabToolInfo
    tone?: StageTone
    language: PrototypeLanguage
    stageLabel: string
    controls: ReactNode
    readout?: ReactNode
    children: ReactNode
    challenges?: LabChallenge<State>[]
    /** Endless practice challenges after the fixed ones */
    extraChallenges?: LabChallengeMaker<State>
    state?: State
    completedIds: number[]
    onComplete: (id: number) => void
    onOpenLesson: () => void
}) {
    const l = useLabText(language)
    // On a phone the hint starts folded so the model is closer to the top
    const [observeOpen, setObserveOpen] = useState(false)
    return (
        <div className="fraction-v2-lab-tool" data-stage={tool.stage} data-tone={tone} role="tabpanel" id="fraction-v2-lab-panel" aria-labelledby={`fraction-v2-lab-tab-${tool.id}`}>
            <div className="fraction-v2-lab-tool-head">
                <div>
                    <span className="fraction-v2-chip" data-stage={tool.stage} data-tone={tone}>{stageLabel}</span>
                    <h2>{l(tool.title)}</h2>
                </div>
                <button type="button" className="fraction-v2-lab-lesson-link" onClick={onOpenLesson}>
                    <Icon name="learn" size={18} />
                    {l({ eu: 'Ikusi ikasgaia', es: 'Ver la lección', en: 'See the lesson', ar: 'اعرض الدرس' })}
                </button>
            </div>
            <div className={`fraction-v2-lab-observe ${observeOpen ? 'open' : ''}`}>
                <span className="fraction-v2-lab-observe-icon"><Icon name="bulb" size={18} /></span>
                <p><strong>{l({ eu: 'Zeri begiratu:', es: 'Qué observar:', en: 'What to look for:', ar: 'ما الذي تلاحظه:' })}</strong> {l(tool.observe)}</p>
                <button type="button" className="fraction-v2-lab-observe-toggle" aria-expanded={observeOpen} onClick={() => setObserveOpen((open) => !open)}>
                    {observeOpen ? l({ eu: 'Tolestu', es: 'Plegar', en: 'Collapse', ar: 'إخفاء' }) : l({ eu: 'Irakurri dena', es: 'Leer todo', en: 'Read all', ar: 'اقرأ الكل' })}
                </button>
            </div>
            <div className="fraction-v2-lab-board">
                <div className="fraction-v2-controls">{controls}</div>
                <div className="fraction-v2-visuals">
                    {children}
                    {readout && <div className="fraction-v2-lab-readout">{readout}</div>}
                </div>
            </div>
            {challenges && state !== undefined && challenges.length > 0 && (
                <ChallengePanel
                    key={tool.id}
                    challenges={challenges}
                    makeExtra={extraChallenges}
                    state={state}
                    completedIds={completedIds}
                    onComplete={onComplete}
                    language={language}
                />
            )}
        </div>
    )
}

/** "Your result" field for the operation tools: type, check, or reveal the worked result */
export function ResultAnswer({
    language,
    state,
    expected,
    form = 'any',
    placeholder,
    unreadable,
    normalizeInput = (input: string) => input,
    onChange
}: {
    language: PrototypeLanguage
    state: OperationAnswer
    expected: FractionValue
    form?: AnswerForm
    /** Example of a well-written answer in this unit */
    placeholder: LocalizedText
    /** Shown when the answer cannot be read as a number */
    unreadable: LocalizedText
    /** Rewrites the answer before it is checked (e.g. drops the point in 15.000) */
    normalizeInput?: (input: string) => string
    onChange: (patch: Partial<OperationAnswer>) => void
}) {
    const l = useLabText(language)
    const inputId = useId()
    const result = state.checked ? checkAnswer(normalizeInput(language === 'en' ? englishDigits(state.answer) : state.answer), expected, form) : null
    return (
        <div className="fraction-v2-lab-answer">
            <label htmlFor={inputId}>{l({ eu: 'Zure emaitza', es: 'Tu resultado', en: 'Your result', ar: 'نتيجتك' })}</label>
            <div className="fraction-v2-lab-answer-row">
                <input
                    id={inputId}
                    value={state.answer}
                    inputMode="text"
                    placeholder={l(placeholder)}
                    onChange={(event) => onChange({ answer: event.target.value, checked: false })}
                    onKeyDown={(event) => { if (event.key === 'Enter') onChange({ checked: true }) }}
                />
                <button type="button" className="fraction-v2-primary" onClick={() => onChange({ checked: true })}>{l({ eu: 'Egiaztatu', es: 'Comprobar', en: 'Check', ar: 'تحقق' })}</button>
            </div>
            <div className="fraction-v2-lab-answer-foot" aria-live="polite">
                {result === 'correct' && <span className="fraction-v2-lab-answer-status success">{l({ eu: 'Zuzena!', es: '¡Correcto!', en: 'Correct!', ar: 'صحيح!' })}</span>}
                {result === 'incorrect' && <span className="fraction-v2-lab-answer-status error">{l({ eu: 'Oraindik ez. Berrikusi eredua.', es: 'Todavía no. Revisa el modelo.', en: 'Not yet. Review the model.', ar: 'ليس بعد. راجع النموذج.' })}</span>}
                {result === 'unreadable' && <span className="fraction-v2-lab-answer-status">{l(unreadable)}</span>}
                {result === 'wrong-form' && <span className="fraction-v2-lab-answer-status">{l({ eu: 'Balioa zuzena da, baina idatzi forma sinpleenean.', es: 'El valor es correcto, pero escríbelo en su forma más sencilla.', en: 'The value is correct, but write it in its simplest form.', ar: 'القيمة صحيحة، لكن اكتبها في أبسط صورة.' })}</span>}
                {!state.revealed && result !== 'correct' && (
                    <button type="button" className="fraction-v2-hint-button" onClick={() => onChange({ revealed: true })}>{l({ eu: 'Ikusi emaitza', es: 'Ver el resultado', en: 'See the result', ar: 'اعرض النتيجة' })}</button>
                )}
            </div>
        </div>
    )
}
