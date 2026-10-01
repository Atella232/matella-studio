import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { MathText } from '../../../components/MathText'
import { fraction, toLatex, type AnswerCheck } from '../math/fraction'
import { Car, GameTopbar, LevelPicker, ResultPanel } from './GameKit'
import { formatTime, useGameText } from './gameHooks'
import type { GameProps } from './GamesHub'
import {
    lapShare,
    nextTier,
    PIT_AFTER,
    PIT_BONUS_MS,
    PIT_PENALTY_MS,
    positionFor,
    RACE_QUESTIONS,
    rivals,
    rivalTimeFor,
    starsFor,
    TURBO_BONUS_MS,
    TURBO_STREAK,
    WRONG_PENALTY_MS,
    type RaceOption,
    type RaceQuestion,
    type RaceRules,
    type Tier
} from './raceCore'
import { createRandom, randomSeed, type Random } from './random'
import { recordKey } from './records'

type Phase = 'pick' | 'countdown' | 'question' | 'answered' | 'wrong' | 'pit' | 'pit-result' | 'finished'

interface Mistake<Error extends string> {
    question: RaceQuestion<Error>
    chosen: RaceOption<Error>
}

const rivalColors: Record<string, string> = { fast: 'var(--violet)', par: 'var(--blue)', slow: 'var(--mustard)' }

/** Race clock that can pause while the student reads feedback or sits in the pit */
function useRaceClock() {
    const accumulated = useRef(0)
    const since = useRef<number | null>(null)
    const now = useCallback(() => accumulated.current + (since.current === null ? 0 : performance.now() - since.current), [])
    const start = useCallback(() => {
        if (since.current === null) since.current = performance.now()
    }, [])
    const pause = useCallback(() => {
        if (since.current !== null) {
            accumulated.current += performance.now() - since.current
            since.current = null
        }
    }, [])
    const reset = useCallback(() => {
        accumulated.current = 0
        since.current = null
    }, [])
    return { now, start, pause, reset }
}

/** The race of a unit: `rules` brings its circuits, questions and advice */
export function RaceGame<Error extends string>({ language, records, onResult, onExit, rules, art }: GameProps & { rules: RaceRules<Error>; art: ReactNode }) {
    const l = useGameText(language)
    const { game } = rules
    const clock = useRaceClock()
    const random = useRef<Random>(createRandom(randomSeed()))
    const [phase, setPhase] = useState<Phase>('pick')
    const [circuit, setCircuit] = useState(0)
    const [lights, setLights] = useState(0)
    const [tier, setTier] = useState<Tier>(0)
    const [streak, setStreak] = useState(0)
    const [wrongStreak, setWrongStreak] = useState(0)
    const [question, setQuestion] = useState<RaceQuestion<Error> | null>(null)
    const [chosen, setChosen] = useState<number | null>(null)
    const [correct, setCorrect] = useState(0)
    const [mistakes, setMistakes] = useState<Mistake<Error>[]>([])
    const [adjust, setAdjust] = useState(0)
    const [turbo, setTurbo] = useState(0)
    const [turboFlash, setTurboFlash] = useState(0)
    const [pitQuestion, setPitQuestion] = useState<RaceQuestion<Error> | null>(null)
    const [pitInput, setPitInput] = useState('')
    const [pitCheck, setPitCheck] = useState<AnswerCheck | null>(null)
    const [pitDone, setPitDone] = useState(false)
    const [finishTime, setFinishTime] = useState<number | null>(null)
    const best = records[recordKey(game.id, circuit)]?.timeMs ?? null

    const start = (nextCircuit: number) => {
        random.current = createRandom(randomSeed())
        clock.reset()
        setCircuit(nextCircuit)
        setTier(0)
        setStreak(0)
        setWrongStreak(0)
        setQuestion(rules.generate(random.current, nextCircuit, 0))
        setChosen(null)
        setCorrect(0)
        setMistakes([])
        setAdjust(0)
        setTurbo(0)
        setPitQuestion(null)
        setPitInput('')
        setPitCheck(null)
        setPitDone(false)
        setFinishTime(null)
        setLights(0)
        setPhase('countdown')
    }

    // Start lights: three reds, then go
    useEffect(() => {
        if (phase !== 'countdown') return
        const timer = window.setTimeout(() => {
            if (lights >= 3) {
                clock.start()
                setPhase('question')
            } else {
                setLights(lights + 1)
            }
        }, 700)
        return () => window.clearTimeout(timer)
    }, [clock, lights, phase])

    const finish = useCallback((totalAdjust: number, mistakeCount: number) => {
        clock.pause()
        const time = Math.max(0, Math.round(clock.now() + totalAdjust))
        setFinishTime(time)
        setPhase('finished')
        onResult(circuit, { stars: starsFor(rules.parTime(circuit), time, mistakeCount), score: Math.round((RACE_QUESTIONS / (RACE_QUESTIONS + mistakeCount)) * 100), timeMs: time })
    }, [circuit, clock, onResult, rules])

    const nextQuestion = useCallback((nextTierValue: Tier) => {
        setQuestion(rules.generate(random.current, circuit, nextTierValue))
        setChosen(null)
        setPhase('question')
    }, [circuit, rules])

    const answer = useCallback((index: number) => {
        if (phase !== 'question' || !question) return
        const option = question.options[index]
        setChosen(index)
        if (option.correct) {
            const newStreak = streak + 1
            const newTier = nextTier(tier, newStreak, 0)
            const bonus = newStreak >= TURBO_STREAK ? TURBO_BONUS_MS : 0
            const newAdjust = adjust - bonus
            const newCorrect = correct + 1
            setStreak(newStreak)
            setWrongStreak(0)
            setTier(newTier)
            setCorrect(newCorrect)
            if (bonus) {
                setAdjust(newAdjust)
                setTurbo((total) => total + bonus)
                setTurboFlash((count) => count + 1)
            }
            setPhase('answered')
            window.setTimeout(() => {
                if (newCorrect >= RACE_QUESTIONS) {
                    finish(newAdjust, mistakes.length)
                } else if (newCorrect === PIT_AFTER && !pitDone) {
                    clock.pause()
                    setPitQuestion(rules.generate(random.current, circuit, Math.min(2, newTier + 1) as Tier, true))
                    setPitInput('')
                    setPitCheck(null)
                    setPhase('pit')
                } else {
                    nextQuestion(newTier)
                }
            }, 550)
        } else {
            clock.pause()
            const newWrong = wrongStreak + 1
            setStreak(0)
            setWrongStreak(newWrong)
            setTier(nextTier(tier, 0, newWrong))
            setAdjust((value) => value + WRONG_PENALTY_MS)
            setMistakes((list) => [...list, { question, chosen: option }])
            setPhase('wrong')
        }
    }, [adjust, circuit, clock, correct, finish, mistakes.length, nextQuestion, phase, pitDone, question, rules, streak, tier, wrongStreak])

    // Keys 1–4 answer, so the race can be played from the keyboard
    useEffect(() => {
        if (phase !== 'question') return
        const onKey = (event: KeyboardEvent) => {
            if (event.target instanceof HTMLInputElement || event.metaKey || event.ctrlKey || event.altKey) return
            const index = ['1', '2', '3', '4'].indexOf(event.key)
            if (index >= 0) {
                event.preventDefault()
                answer(index)
            }
        }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [answer, phase])

    const resume = () => {
        clock.start()
        nextQuestion(tier)
    }

    const submitPit = () => {
        if (!pitQuestion) return
        const result = rules.checkPit(pitQuestion, pitInput)
        setPitCheck(result)
        if (result === 'unreadable' || result === 'wrong-form') return
        setAdjust((value) => value + (result === 'correct' ? -PIT_BONUS_MS : PIT_PENALTY_MS))
        setPitDone(true)
        setPhase('pit-result')
    }

    if (phase === 'pick') {
        return (
            <LevelPicker
                game={game}
                art={art}
                levelsTitle={l({ eu: 'Aukeratu zirkuitua', es: 'Elige circuito', ar: 'اختر الحلبة' })}
                language={language}
                records={records}
                onStart={start}
                onExit={onExit}
                bestLabel={(record) => record.timeMs === null ? '' : `${l({ eu: 'Marka', es: 'Récord', ar: 'الرقم' })}: ${formatTime(record.timeMs)}`}
                howTo={(
                    <ul className="fraction-v2-game-rules">
                        <li>{l({ eu: `Erantzun ${RACE_QUESTIONS} galdera zuzen helmugara iristeko. Erabili 1–4 teklak.`, es: `Acierta ${RACE_QUESTIONS} preguntas para llegar a meta. Puedes usar las teclas 1–4.`, ar: `أجب عن ${RACE_QUESTIONS} أسئلة صحيحة للوصول إلى خط النهاية. يمكنك استخدام المفاتيح 1–4.` })}</li>
                        <li>{l({ eu: `Akats bakoitzak ${WRONG_PENALTY_MS / 1000} s gehitzen ditu, baina erlojua gelditu egiten da azalpena irakurtzeko.`, es: `Cada fallo suma ${WRONG_PENALTY_MS / 1000} s, pero el reloj se para para que leas la explicación.`, ar: `كل خطأ يضيف ${WRONG_PENALTY_MS / 1000} ث، لكن الساعة تتوقف لتقرأ الشرح.` })}</li>
                        <li>{l({ eu: `${TURBO_STREAK} jarraian asmatuz gero, turboa: −1 s asmatze bakoitzeko.`, es: `Con ${TURBO_STREAK} aciertos seguidos, turbo: −1 s por acierto.`, ar: `مع ${TURBO_STREAK} إجابات صحيحة متتالية، تيربو: −1 ث لكل إجابة صحيحة.` })}</li>
                        <li>{l({ eu: `Bidearen erdian boxetan gelditu eta idatzi erantzuna: zuzena bada −${PIT_BONUS_MS / 1000} s.`, es: `A mitad de vuelta paras en boxes y escribes la respuesta: si es correcta, −${PIT_BONUS_MS / 1000} s.`, ar: `في منتصف اللفة تتوقف في الصيانة وتكتب الإجابة: إن كانت صحيحة −${PIT_BONUS_MS / 1000} ث.` })}</li>
                    </ul>
                )}
            />
        )
    }

    const level = game.levels[circuit]
    const position = finishTime === null ? null : positionFor(rules.parTime(circuit), finishTime)

    return (
        <div className="fraction-v2-race" data-stage={level.stage}>
            <GameTopbar game={game} language={language} onExit={() => { clock.pause(); onExit() }}>
                <span>{circuit + 1}. {l(level.title)}</span>
            </GameTopbar>

            <RaceTrack
                language={language}
                par={rules.parTime(circuit)}
                correct={correct}
                adjust={adjust}
                running={phase === 'question' || phase === 'answered'}
                now={clock.now}
                best={best}
                finishTime={finishTime}
                turboFlash={turboFlash}
                pitDone={pitDone}
            />

            {phase === 'countdown' && (
                <div className="fraction-v2-race-lights" role="status" aria-live="assertive">
                    {[0, 1, 2].map((index) => <span className={index < lights ? 'on' : ''} key={index} />)}
                    <strong>{lights < 3 ? 3 - lights : l({ eu: 'Aurrera!', es: '¡Ya!', ar: 'انطلق!' })}</strong>
                </div>
            )}

            {(phase === 'question' || phase === 'answered' || phase === 'wrong') && question && (
                <div className={`fraction-v2-race-panel ${phase}`}>
                    <div className="fraction-v2-race-prompt"><MathText text={l(question.prompt)} /></div>
                    {rules.figure?.(question, language)}
                    <div className="fraction-v2-race-options" role="group" aria-label={l({ eu: 'Erantzunak', es: 'Respuestas', ar: 'الإجابات' })}>
                        {question.options.map((option, index) => {
                            const state = chosen === null ? '' : option.correct && (phase !== 'question') ? 'correct' : index === chosen ? 'wrong' : ''
                            return (
                                <button
                                    type="button"
                                    className={state}
                                    disabled={phase !== 'question'}
                                    onClick={() => answer(index)}
                                    key={`${option.latex}-${index}`}
                                >
                                    <span className="fraction-v2-race-key" aria-hidden="true">{index + 1}</span>
                                    <MathText text={`$${option.latex}$`} />
                                </button>
                            )
                        })}
                    </div>
                    {phase === 'wrong' && chosen !== null && (
                        <div className="fraction-v2-race-feedback" role="alert">
                            <strong>{l({ eu: `Irristatu zara! +${WRONG_PENALTY_MS / 1000} s`, es: `¡Derrape! +${WRONG_PENALTY_MS / 1000} s`, ar: `انزلاق! +${WRONG_PENALTY_MS / 1000} ث` })}</strong>
                            <p>{l(rules.errorTip(question.options[chosen].error))}</p>
                            <div className="fraction-v2-race-solution"><MathText text={l(question.solution)} /></div>
                            <button type="button" className="fraction-v2-primary" onClick={resume} ref={(node) => node?.focus()}>
                                {l({ eu: 'Jarraitu lasterketan', es: 'Seguir la carrera', ar: 'تابع السباق' })}
                            </button>
                        </div>
                    )}
                </div>
            )}

            {(phase === 'pit' || phase === 'pit-result') && pitQuestion && (
                <div className="fraction-v2-race-pit">
                    <span className="fraction-v2-race-pit-badge">{l({ eu: 'BOXAK', es: 'BOXES', ar: 'الصيانة' })}</span>
                    <p>{l({ eu: 'Erlojua geldituta dago. Idatzi emaitza zehatza.', es: 'El reloj está parado. Escribe el resultado exacto.', ar: 'الساعة متوقفة. اكتب النتيجة الدقيقة.' })}</p>
                    <div className="fraction-v2-race-prompt"><MathText text={l(pitQuestion.prompt)} /></div>
                    {rules.figure?.(pitQuestion, language)}
                    {phase === 'pit' ? (
                        <form className="fraction-v2-race-pit-form" onSubmit={(event) => { event.preventDefault(); submitPit() }}>
                            <label htmlFor="fraction-v2-pit-answer">{l({ eu: 'Zure erantzuna', es: 'Tu respuesta', ar: 'إجابتك' })}</label>
                            <div>
                                <input
                                    id="fraction-v2-pit-answer"
                                    value={pitInput}
                                    autoComplete="off"
                                    placeholder={rules.pitPlaceholder(pitQuestion)}
                                    onChange={(event) => { setPitInput(event.target.value); setPitCheck(null) }}
                                    ref={(node) => node?.focus({ preventScroll: true })}
                                />
                                <button type="submit" className="fraction-v2-primary" disabled={!pitInput.trim()}>{l({ eu: 'Egiaztatu', es: 'Comprobar', ar: 'تحقق' })}</button>
                            </div>
                            {pitCheck === 'unreadable' && <p className="fraction-v2-race-pit-note" role="alert">{l(rules.pitUnreadable)}</p>}
                            {pitCheck === 'wrong-form' && <p className="fraction-v2-race-pit-note" role="alert">{l(rules.pitWrongForm)}</p>}
                        </form>
                    ) : (
                        <div className={`fraction-v2-race-pit-result ${pitCheck === 'correct' ? 'success' : 'error'}`} role="alert">
                            <strong>{pitCheck === 'correct'
                                ? l({ eu: `Box perfektua! −${PIT_BONUS_MS / 1000} s`, es: `¡Boxes perfectos! −${PIT_BONUS_MS / 1000} s`, ar: `صيانة مثالية! −${PIT_BONUS_MS / 1000} ث` })
                                : l({ eu: `Ez da zuzena: +${PIT_PENALTY_MS / 1000} s`, es: `No es correcto: +${PIT_PENALTY_MS / 1000} s`, ar: `غير صحيح: +${PIT_PENALTY_MS / 1000} ث` })}</strong>
                            <div className="fraction-v2-race-solution"><MathText text={l(pitQuestion.solution)} /></div>
                            <button type="button" className="fraction-v2-primary" onClick={resume} ref={(node) => node?.focus()}>
                                {l({ eu: 'Itzuli pistara', es: 'Volver a la pista', ar: 'عُد إلى الحلبة' })}
                            </button>
                        </div>
                    )}
                </div>
            )}

            {phase === 'finished' && finishTime !== null && position !== null && (
                <ResultPanel
                    language={language}
                    stars={starsFor(rules.parTime(circuit), finishTime, mistakes.length)}
                    title={position === 1
                        ? l({ eu: 'Irabazi duzu!', es: '¡Has ganado!', ar: 'لقد فزت!' })
                        : l({ eu: `${position}. postua`, es: `Puesto ${position}`, ar: `المركز ${position}` })}
                    subtitle={best !== null && finishTime < best
                        ? l({ eu: 'Marka berria!', es: '¡Nuevo récord!', ar: 'رقم قياسي جديد!' })
                        : undefined}
                    stats={[
                        { label: l({ eu: 'Denbora', es: 'Tiempo', ar: 'الوقت' }), value: formatTime(finishTime) },
                        { label: l({ eu: 'Akatsak', es: 'Fallos', ar: 'الأخطاء' }), value: String(mistakes.length) },
                        { label: 'Turbo', value: turbo ? `−${turbo / 1000} s` : '0 s' },
                        { label: l({ eu: 'Unai (erdiko erritmoa)', es: 'Unai (ritmo medio)', ar: 'أوناي (الوتيرة المتوسطة)' }), value: formatTime(rules.parTime(circuit)) }
                    ]}
                    onReplay={() => start(circuit)}
                    onNext={circuit < game.levels.length - 1 ? () => start(circuit + 1) : undefined}
                    onLevels={() => setPhase('pick')}
                >
                    <p className="fraction-v2-game-result-note">{l({ eu: '3 izar: Unai baino % 20 azkarrago eta akats bat gehienez. 2 izar: Unai baino azkarrago.', es: '3 estrellas: un 20 % más rápido que Unai y como mucho un fallo. 2 estrellas: más rápido que Unai.', ar: '3 نجوم: أسرع من أوناي بـ20٪ مع خطأ واحد على الأكثر. نجمتان: أسرع من أوناي.' })}</p>
                    {mistakes.length > 0 && (
                        <details className="fraction-v2-race-review" open={mistakes.length <= 3}>
                            <summary>{l({ eu: 'Berrikusi akatsak', es: 'Repasa los fallos', ar: 'راجع الأخطاء' })} ({mistakes.length})</summary>
                            <ol>
                                {mistakes.map((mistake, index) => (
                                    <li key={index}>
                                        <div className="fraction-v2-race-prompt small"><MathText text={l(mistake.question.prompt)} /></div>
                                        <p>
                                            <span className="wrong"><MathText text={`$${mistake.chosen.latex}$`} /></span>
                                            <span aria-hidden="true">→</span>
                                            <span className="right"><MathText text={`$${mistake.question.options.find((option) => option.correct)!.latex}$`} /></span>
                                        </p>
                                        <p>{l(rules.errorTip(mistake.chosen.error))}</p>
                                    </li>
                                ))}
                            </ol>
                        </details>
                    )}
                </ResultPanel>
            )}
        </div>
    )
}

/** Lanes of the race. Only this part re-renders with the clock. */
function RaceTrack({
    language,
    par,
    correct,
    adjust,
    running,
    now,
    best,
    finishTime,
    turboFlash,
    pitDone
}: {
    language: GameProps['language']
    par: number
    correct: number
    adjust: number
    running: boolean
    now: () => number
    best: number | null
    finishTime: number | null
    turboFlash: number
    pitDone: boolean
}) {
    const l = useGameText(language)
    const [, setTick] = useState(0)

    useEffect(() => {
        if (!running) return
        let frame = 0
        let last = 0
        const loop = (time: number) => {
            // ~15 updates per second are enough for smooth CSS-eased movement
            if (time - last > 66) {
                last = time
                setTick((value) => value + 1)
            }
            frame = requestAnimationFrame(loop)
        }
        frame = requestAnimationFrame(loop)
        return () => cancelAnimationFrame(frame)
    }, [running])

    const raceTime = finishTime ?? Math.max(0, now() + adjust)
    const playerShare = correct / RACE_QUESTIONS
    const lanes = [
        ...rivals.map((rival) => ({ id: rival.id, name: rival.name, color: rivalColors[rival.id], share: lapShare(raceTime, rivalTimeFor(par, rival)), ghost: false })),
        { id: 'player', name: l({ eu: 'Zu', es: 'Tú', ar: 'أنت' }), color: 'var(--coral)', share: playerShare, ghost: false }
    ]
    const lapLatex = correct === 0 ? '0' : toLatex(fraction(correct, RACE_QUESTIONS))

    return (
        <div className="fraction-v2-race-board" dir="ltr">
            <div className="fraction-v2-race-hud">
                <span className="fraction-v2-race-clock" aria-label={l({ eu: 'Denbora', es: 'Tiempo', ar: 'الوقت' })}>{formatTime(raceTime)}</span>
                <span className="fraction-v2-race-lap">
                    {l({ eu: 'Itzulia', es: 'Vuelta', ar: 'اللفة' })}: <MathText text={`$${lapLatex}$`} />
                </span>
                {turboFlash > 0 && <span className="fraction-v2-race-turbo" key={turboFlash} aria-live="polite">Turbo −1 s</span>}
            </div>
            <div className="fraction-v2-race-lanes">
                {lanes.map((lane) => (
                    <div className={`fraction-v2-race-lane ${lane.id === 'player' ? 'player' : ''}`} key={lane.id}>
                        <span className="fraction-v2-race-name">{lane.name}</span>
                        <div className="fraction-v2-race-road">
                            {lane.id === 'player' && (
                                <span className={`fraction-v2-race-pit-mark ${pitDone ? 'done' : ''}`} style={{ left: `${(PIT_AFTER / RACE_QUESTIONS) * 100}%` }} aria-hidden="true">P</span>
                            )}
                            {lane.id === 'player' && best !== null && (
                                <span className="fraction-v2-race-car ghost" style={{ '--share': lapShare(raceTime, best) } as React.CSSProperties} title={l({ eu: 'Zure marka', es: 'Tu récord', ar: 'رقمك القياسي' })}>
                                    <Car color="none" ghost />
                                </span>
                            )}
                            <span className="fraction-v2-race-car" style={{ '--share': lane.share } as React.CSSProperties}>
                                <Car color={lane.color} />
                            </span>
                        </div>
                    </div>
                ))}
            </div>
            <div className="fraction-v2-race-ruler" aria-hidden="true">
                {Array.from({ length: RACE_QUESTIONS + 1 }, (_, index) => (
                    <span className={index % 5 === 0 ? 'major' : ''} style={{ left: `${(index / RACE_QUESTIONS) * 100}%` }} key={index}>
                        {index === 0 ? '0' : index === RACE_QUESTIONS ? '1' : index === RACE_QUESTIONS / 2 ? '½' : ''}
                    </span>
                ))}
            </div>
            <p className="sr-only" aria-live="polite">
                {l({ eu: `${correct} / ${RACE_QUESTIONS} erantzun zuzen`, es: `${correct} de ${RACE_QUESTIONS} aciertos`, ar: `${correct} من ${RACE_QUESTIONS} إجابات صحيحة` })}
            </p>
        </div>
    )
}
