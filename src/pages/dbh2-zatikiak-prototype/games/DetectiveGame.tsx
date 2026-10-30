import { useState } from 'react'
import { MathText } from '../../../components/MathText'
import {
    createDetectiveCases,
    DETECTIVE_CASES,
    detectiveErrorNames,
    detectiveErrorTips,
    detectiveStars,
    type DetectiveCase,
    type DetectiveError
} from './detective'
import { GameTopbar, LevelPicker, ResultPanel } from './GameKit'
import { useGameText } from './gameHooks'
import type { GameProps } from './index'
import { createRandom, randomSeed } from './random'
import { games } from './records'
import './Detective.css'

const game = games.find((item) => item.id === 'detective')!

/** Each case: first the wrong line, then what kind of mistake it is */
type Step = 'line' | 'kind' | 'done'

export function DetectiveGame({ language, records, onResult, onExit }: GameProps) {
    const l = useGameText(language)
    const [phase, setPhase] = useState<'pick' | 'playing' | 'finished'>('pick')
    const [level, setLevel] = useState(0)
    const [cases, setCases] = useState<DetectiveCase[]>([])
    const [index, setIndex] = useState(0)
    const [step, setStep] = useState<Step>('line')
    const [line, setLine] = useState<number | null>(null)
    const [kind, setKind] = useState<DetectiveError | null>(null)
    const [found, setFound] = useState({ lines: 0, kinds: 0 })

    const score = found.lines + found.kinds
    const item = cases[index]

    const start = (nextLevel: number) => {
        setLevel(nextLevel)
        setCases(createDetectiveCases(createRandom(randomSeed()), nextLevel))
        setIndex(0)
        setStep('line')
        setLine(null)
        setKind(null)
        setFound({ lines: 0, kinds: 0 })
        setPhase('playing')
    }

    const chooseLine = (chosen: number) => {
        if (step !== 'line') return
        setLine(chosen)
        if (chosen === item.wrong) setFound((current) => ({ ...current, lines: current.lines + 1 }))
        setStep('kind')
    }

    const chooseKind = (chosen: DetectiveError) => {
        if (step !== 'kind') return
        setKind(chosen)
        if (chosen === item.error) setFound((current) => ({ ...current, kinds: current.kinds + 1 }))
        setStep('done')
    }

    const next = () => {
        if (index + 1 >= DETECTIVE_CASES) {
            onResult(level, { stars: detectiveStars(score), score, timeMs: null })
            setPhase('finished')
            return
        }
        setIndex(index + 1)
        setStep('line')
        setLine(null)
        setKind(null)
    }

    if (phase === 'pick') {
        return (
            <LevelPicker
                game={game}
                language={language}
                records={records}
                onStart={start}
                onExit={onExit}
                bestLabel={(record) => `${l({ eu: 'Marka', es: 'Récord', en: 'Record', ar: 'الرقم' })}: ${record.score} / ${DETECTIVE_CASES * 2}`}
                howTo={(
                    <ul className="fraction-v2-game-rules">
                        <li>{l({ eu: 'Ebazpen bakoitzean lerro bakar bat dago gaizki; hortik aurrera, urratsak zuzenak dira, baina emaitza okerretik abiatuta.', es: 'En cada resolución hay una sola línea mal; a partir de ella, los pasos son correctos, pero arrastran el error.', en: 'In each solution there is one wrong line; from it onwards, the steps are correct but carry the error forward.', ar: 'في كل حلّ سطر واحد خاطئ؛ وبعده تكون الخطوات صحيحة لكنها تحمل الخطأ.' })}</li>
                        <li>{l({ eu: 'Sakatu lerro okerra (puntu 1) eta aukeratu zein akats den (beste puntu 1).', es: 'Toca la línea equivocada (1 punto) y elige qué error es (otro punto).', en: 'Tap the wrong line (1 point) and choose which mistake it is (another point).', ar: 'اضغط السطر الخاطئ (نقطة) ثم اختر نوع الخطأ (نقطة أخرى).' })}</li>
                        <li>{l({ eu: `${DETECTIVE_CASES} kasu maila bakoitzean.`, es: `${DETECTIVE_CASES} casos por nivel.`, en: `${DETECTIVE_CASES} cases per level.`, ar: `${DETECTIVE_CASES} حالات في كل مستوى.` })}</li>
                    </ul>
                )}
            />
        )
    }

    if (phase === 'finished') {
        return (
            <div className="detective-game" data-stage={game.levels[level].stage}>
                <GameTopbar game={game} language={language} onExit={onExit} />
                <ResultPanel
                    language={language}
                    stars={detectiveStars(score)}
                    title={`${score} / ${DETECTIVE_CASES * 2}`}
                    subtitle={l({ eu: '3 izar: 11 puntu · 2 izar: 9 · izar 1: 6', es: '3 estrellas: 11 puntos · 2: 9 · 1: 6', en: '3 stars: 11 points · 2: 9 · 1: 6', ar: '3 نجوم: 11 نقطة · 2: 9 · 1: 6' })}
                    stats={[
                        { label: l({ eu: 'Lerro okerrak', es: 'Líneas encontradas', en: 'Lines found', ar: 'الأسطر المكتشفة' }), value: `${found.lines} / ${DETECTIVE_CASES}` },
                        { label: l({ eu: 'Akats motak', es: 'Errores identificados', en: 'Mistakes identified', ar: 'الأخطاء المحدَّدة' }), value: `${found.kinds} / ${DETECTIVE_CASES}` }
                    ]}
                    onReplay={() => start(level)}
                    onNext={level < game.levels.length - 1 ? () => start(level + 1) : undefined}
                    onLevels={() => setPhase('pick')}
                />
            </div>
        )
    }

    // Only while a level is being set up
    if (!item) return <></>
    const lineNumber = (position: number) => position + 1

    return (
        <div className="detective-game" data-stage={game.levels[level].stage}>
            <GameTopbar game={game} language={language} onExit={onExit}>
                <span>{index + 1} / {DETECTIVE_CASES}</span>
                <span><strong>{score}</strong> {l({ eu: 'puntu', es: 'puntos', en: 'points', ar: 'نقطة' })}</span>
            </GameTopbar>

            <section className="detective-sheet" aria-label={l({ eu: 'Ebazpena', es: 'La resolución', en: 'The solution', ar: 'الحل' })}>
                <p className="detective-statement">
                    <span className="detective-statement-label">{l({ eu: 'Kalkulatu', es: 'Calcula', en: 'Calculate', ar: 'احسب' })}</span>
                    <MathText text={`$${item.statement}$`} />
                </p>
                <ol className="detective-lines">
                    {item.lines.map((current, position) => {
                        const marks = step === 'line'
                            ? ''
                            : position === item.wrong ? 'wrong' : position === line ? 'missed' : ''
                        return (
                            <li key={position}>
                                <button
                                    type="button"
                                    className={`detective-line ${marks}`}
                                    disabled={step !== 'line'}
                                    aria-label={`${l({ eu: 'Lerroa', es: 'Línea', en: 'Line', ar: 'السطر' })} ${lineNumber(position)}`}
                                    onClick={() => chooseLine(position)}
                                >
                                    <span className="detective-line-number">{lineNumber(position)}</span>
                                    <MathText text={`$=${current.latex}$`} />
                                </button>
                            </li>
                        )
                    })}
                </ol>
            </section>

            <div className="detective-panel" aria-live="polite">
                {step === 'line' && <p className="detective-question">{l({ eu: 'Zein lerrotan dago akatsa?', es: '¿En qué línea está el error?', en: 'Which line has the error?', ar: 'في أي سطر يوجد الخطأ؟' })}</p>}
                {step !== 'line' && (
                    <p className={`detective-verdict ${line === item.wrong ? 'right' : 'wrong'}`}>
                        {line === item.wrong
                            ? l({ eu: `Ondo ikusita! Akatsa ${lineNumber(item.wrong)}. lerroan dago.`, es: `¡Bien visto! El error está en la línea ${lineNumber(item.wrong)}.`, en: `Well spotted! The error is on line ${lineNumber(item.wrong)}.`, ar: `أحسنت! الخطأ في السطر ${lineNumber(item.wrong)}.` })
                            : l({ eu: `Ez: akatsa ${lineNumber(item.wrong)}. lerroan dago.`, es: `No: el error está en la línea ${lineNumber(item.wrong)}.`, en: `No: the error is on line ${lineNumber(item.wrong)}.`, ar: `لا: الخطأ في السطر ${lineNumber(item.wrong)}.` })}
                    </p>
                )}
                {step !== 'line' && (
                    <>
                        <p className="detective-question">{l({ eu: 'Zer akats da?', es: '¿Qué error es?', en: 'What kind of error is it?', ar: 'ما نوع الخطأ؟' })}</p>
                        <div className="detective-options">
                            {item.options.map((option) => (
                                <button
                                    type="button"
                                    key={option}
                                    disabled={step !== 'kind'}
                                    className={step === 'done' ? (option === item.error ? 'right' : option === kind ? 'wrong' : '') : ''}
                                    onClick={() => chooseKind(option)}
                                >
                                    {l(detectiveErrorNames[option])}
                                </button>
                            ))}
                        </div>
                    </>
                )}
                {step === 'done' && (
                    <div className="detective-explain">
                        <p><strong>{kind === item.error ? l({ eu: 'Zuzena!', es: '¡Correcto!', en: 'Correct!', ar: 'صحيح!' }) : l({ eu: `Ez zehazki: «${detectiveErrorNames[item.error].eu}» da.`, es: `No exactamente: es «${detectiveErrorNames[item.error].es}».`, en: `Not exactly: it is ‘${detectiveErrorNames[item.error].en}’.`, ar: `ليس تمامًا: إنه «${detectiveErrorNames[item.error].ar}».` })}</strong> {l(detectiveErrorTips[item.error])}</p>
                        <p className="detective-fix">
                            <span>{l({ eu: 'Hau izan behar zuen:', es: 'Debería ser:', en: 'It should be:', ar: 'كان يجب أن يكون:' })}</span>
                            <MathText text={`$=${item.fix}$`} />
                        </p>
                        <button type="button" className="fraction-v2-primary" onClick={next} ref={(node) => node?.focus({ preventScroll: true })}>
                            {index + 1 >= DETECTIVE_CASES ? l({ eu: 'Emaitza ikusi', es: 'Ver resultado', en: 'See the result', ar: 'اعرض النتيجة' }) : l({ eu: 'Hurrengoa', es: 'Siguiente', en: 'Next', ar: 'التالي' })}
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}
