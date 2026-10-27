import { useState } from 'react'
import { MathText } from '../../../components/MathText'
import { GameTopbar, LevelPicker, ResultPanel } from '../../../features/unit-v2/games/GameKit'
import { localLatex, useGameText } from '../../../features/unit-v2/games/gameHooks'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import { createRandom, randomSeed } from '../../../features/unit-v2/games/random'
import '../../dbh2-zatikiak-prototype/games/Detective.css'
import {
    createProportionDetectiveCases,
    PROPORTION_DETECTIVE_CASES,
    proportionDetectiveErrorNames,
    proportionDetectiveErrorTips,
    proportionDetectiveStars,
    type ProportionDetectiveCase,
    type ProportionDetectiveError
} from './detective'
import './Detective.css'
import { ProportionDbh4ApGameArt } from './GameArt'
import { proportionDbh4ApGames } from './info'

const game = proportionDbh4ApGames.find((item) => item.id === 'detective')!

/** Each case: first the wrong line, then what kind of mistake it is */
type Step = 'line' | 'kind' | 'done'

export function ProportionDbh4ApDetectiveGame({ language, records, onResult, onExit }: GameProps) {
    const l = useGameText(language)
    const [phase, setPhase] = useState<'pick' | 'playing' | 'finished'>('pick')
    const [level, setLevel] = useState(0)
    const [cases, setCases] = useState<ProportionDetectiveCase[]>([])
    const [index, setIndex] = useState(0)
    const [step, setStep] = useState<Step>('line')
    const [line, setLine] = useState<number | null>(null)
    const [kind, setKind] = useState<ProportionDetectiveError | null>(null)
    const [found, setFound] = useState({ lines: 0, kinds: 0 })

    const score = found.lines + found.kinds
    const item = cases[index]
    const total = PROPORTION_DETECTIVE_CASES * 2

    const start = (nextLevel: number) => {
        setLevel(nextLevel)
        setCases(createProportionDetectiveCases(createRandom(randomSeed()), nextLevel))
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

    const chooseKind = (chosen: ProportionDetectiveError) => {
        if (step !== 'kind') return
        setKind(chosen)
        if (chosen === item.error) setFound((current) => ({ ...current, kinds: current.kinds + 1 }))
        setStep('done')
    }

    const next = () => {
        if (index + 1 >= PROPORTION_DETECTIVE_CASES) {
            onResult(level, { stars: proportionDetectiveStars(score), score, timeMs: null })
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
                art={<ProportionDbh4ApGameArt game="detective" />}
                language={language}
                records={records}
                onStart={start}
                onExit={onExit}
                bestLabel={(record) => `${l({ eu: 'Marka', es: 'Récord', ar: 'الرقم' })}: ${record.score} / ${total}`}
                howTo={(
                    <ul className="fraction-v2-game-rules">
                        <li>{l({ eu: 'Ebazpen bakoitzean lerro bakar bat dago gaizki; hortik aurrera, urratsak zuzenak dira, baina akatsa daramate.', es: 'En cada resolución hay una sola línea mal; a partir de ella, los pasos son correctos, pero arrastran el error.', ar: 'في كل حلّ سطر واحد خاطئ؛ وبعده تكون الخطوات صحيحة لكنها تحمل الخطأ.' })}</li>
                        <li>{l({ eu: 'Sakatu lerro okerra (puntu 1) eta aukeratu zein akats den (beste puntu 1).', es: 'Toca la línea equivocada (1 punto) y elige qué error es (otro punto).', ar: 'اضغط السطر الخاطئ (نقطة) ثم اختر نوع الخطأ (نقطة أخرى).' })}</li>
                        <li>{l({ eu: `${PROPORTION_DETECTIVE_CASES} kasu maila bakoitzean.`, es: `${PROPORTION_DETECTIVE_CASES} casos por nivel.`, ar: `${PROPORTION_DETECTIVE_CASES} حالات في كل مستوى.` })}</li>
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
                    stars={proportionDetectiveStars(score)}
                    title={`${score} / ${total}`}
                    subtitle={l({ eu: '3 izar: 11 puntu · 2 izar: 9 · izar 1: 6', es: '3 estrellas: 11 puntos · 2: 9 · 1: 6', ar: '3 نجوم: 11 نقطة · 2: 9 · 1: 6' })}
                    stats={[
                        { label: l({ eu: 'Lerro okerrak', es: 'Líneas encontradas', ar: 'الأسطر المكتشفة' }), value: `${found.lines} / ${PROPORTION_DETECTIVE_CASES}` },
                        { label: l({ eu: 'Akats motak', es: 'Errores identificados', ar: 'الأخطاء المحدَّدة' }), value: `${found.kinds} / ${PROPORTION_DETECTIVE_CASES}` }
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
                <span>{index + 1} / {PROPORTION_DETECTIVE_CASES}</span>
                <span><strong>{score}</strong> {l({ eu: 'puntu', es: 'puntos', ar: 'نقطة' })}</span>
            </GameTopbar>

            <section className="detective-sheet proportion-detective-sheet" aria-label={l({ eu: 'Ebazpena', es: 'La resolución', ar: 'الحل' })}>
                <p className="proportion-detective-problem">
                    <MathText text={l(item.problem)} inline />
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
                                    className={`detective-line proportion-detective-line ${marks}`}
                                    disabled={step !== 'line'}
                                    aria-label={`${l({ eu: 'Lerroa', es: 'Línea', ar: 'السطر' })} ${lineNumber(position)}: ${l(current.label)}`}
                                    onClick={() => chooseLine(position)}
                                >
                                    <span className="detective-line-number">{lineNumber(position)}</span>
                                    <span className="proportion-detective-step">
                                        <span className="proportion-detective-label" dir={language === 'ar' ? 'rtl' : 'ltr'}>{l(current.label)}</span>
                                        <MathText text={`$${localLatex(current.latex, language)}$`} />
                                    </span>
                                </button>
                            </li>
                        )
                    })}
                </ol>
            </section>

            <div className="detective-panel" aria-live="polite">
                {step === 'line' && <p className="detective-question">{l({ eu: 'Zein lerrotan dago akatsa?', es: '¿En qué línea está el error?', ar: 'في أي سطر يوجد الخطأ؟' })}</p>}
                {step !== 'line' && (
                    <p className={`detective-verdict ${line === item.wrong ? 'right' : 'wrong'}`}>
                        {line === item.wrong
                            ? l({ eu: `Ondo ikusita! Akatsa ${lineNumber(item.wrong)}. lerroan dago.`, es: `¡Bien visto! El error está en la línea ${lineNumber(item.wrong)}.`, ar: `أحسنت! الخطأ في السطر ${lineNumber(item.wrong)}.` })
                            : l({ eu: `Ez: akatsa ${lineNumber(item.wrong)}. lerroan dago.`, es: `No: el error está en la línea ${lineNumber(item.wrong)}.`, ar: `لا: الخطأ في السطر ${lineNumber(item.wrong)}.` })}
                    </p>
                )}
                {step !== 'line' && (
                    <>
                        <p className="detective-question">{l({ eu: 'Zer akats da?', es: '¿Qué error es?', ar: 'ما نوع الخطأ؟' })}</p>
                        <div className="detective-options">
                            {item.options.map((option) => (
                                <button
                                    type="button"
                                    key={option}
                                    disabled={step !== 'kind'}
                                    className={step === 'done' ? (option === item.error ? 'right' : option === kind ? 'wrong' : '') : ''}
                                    onClick={() => chooseKind(option)}
                                >
                                    {l(proportionDetectiveErrorNames[option])}
                                </button>
                            ))}
                        </div>
                    </>
                )}
                {step === 'done' && (
                    <div className="detective-explain">
                        <p>
                            <strong>{kind === item.error ? l({ eu: 'Zuzena!', es: '¡Correcto!', ar: 'صحيح!' }) : l({ eu: `Ez zehazki: «${proportionDetectiveErrorNames[item.error].eu}».`, es: `No exactamente: «${proportionDetectiveErrorNames[item.error].es}».`, ar: `ليس تمامًا: «${proportionDetectiveErrorNames[item.error].ar}».` })}</strong>{' '}
                            <MathText text={l(proportionDetectiveErrorTips[item.error])} inline />
                        </p>
                        <p className="detective-fix">
                            <span>{l({ eu: 'Hau izan behar zuen:', es: 'Debería ser:', ar: 'كان يجب أن يكون:' })}</span>
                            <MathText text={`$${localLatex(item.fix, language)}$`} />
                        </p>
                        <button type="button" className="fraction-v2-primary" onClick={next} ref={(node) => node?.focus({ preventScroll: true })}>
                            {index + 1 >= PROPORTION_DETECTIVE_CASES ? l({ eu: 'Emaitza ikusi', es: 'Ver resultado', ar: 'اعرض النتيجة' }) : l({ eu: 'Hurrengoa', es: 'Siguiente', ar: 'التالي' })}
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}
