import { useState, type ReactNode } from 'react'
import { MathText } from '../../../components/MathText'
import '../../../pages/dbh2-zatikiak-prototype/games/Detective.css'
import type { LocalizedText } from '../types'
import { GameTopbar, LevelPicker, ResultPanel } from './GameKit'
import { localLatex, useGameText } from './gameHooks'
import type { GameProps } from './GamesHub'
import { createRandom, randomSeed, type Random } from './random'
import type { GameInfo } from './records'
import { workedDetectiveStars, type WorkedCase } from './workedDetective'
import './WorkedDetective.css'

/* ==========================================================================
   The worked-solution detective, as in Funtzioak and Zenbaki arrazionalak
   3. DBH: three lines of a solution with exactly one wrong line, the
   lines after it carrying the mistake. The learner taps the wrong line
   (1 point) and says which mistake it is, among three (another point).
   Each unit only gives its cases and the names and tips of its mistakes.
   ========================================================================== */

export interface WorkedDetectiveConfig<Error extends string> {
    game: GameInfo
    art: ReactNode
    cases: number
    createCases: (random: Random, level: number) => WorkedCase<Error>[]
    names: Record<Error, LocalizedText>
    tips: Record<Error, LocalizedText>
}

/** Each case: first the wrong line, then what kind of mistake it is */
type Step = 'line' | 'kind' | 'done'

export function WorkedDetectiveGame<Error extends string>({ config, language, records, onResult, onExit }: GameProps & { config: WorkedDetectiveConfig<Error> }) {
    const { game, cases: count } = config
    const l = useGameText(language)
    const [phase, setPhase] = useState<'pick' | 'playing' | 'finished'>('pick')
    const [level, setLevel] = useState(0)
    const [cases, setCases] = useState<WorkedCase<Error>[]>([])
    const [index, setIndex] = useState(0)
    const [step, setStep] = useState<Step>('line')
    const [line, setLine] = useState<number | null>(null)
    const [kind, setKind] = useState<Error | null>(null)
    const [found, setFound] = useState({ lines: 0, kinds: 0 })

    const score = found.lines + found.kinds
    const item = cases[index]
    const total = count * 2
    const stars = workedDetectiveStars(score, count)
    const third = Math.ceil(total * 0.75)

    const start = (nextLevel: number) => {
        setLevel(nextLevel)
        setCases(config.createCases(createRandom(randomSeed()), nextLevel))
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

    const chooseKind = (chosen: Error) => {
        if (step !== 'kind') return
        setKind(chosen)
        if (chosen === item.error) setFound((current) => ({ ...current, kinds: current.kinds + 1 }))
        setStep('done')
    }

    const next = () => {
        if (index + 1 >= count) {
            onResult(level, { stars, score, timeMs: null })
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
                art={config.art}
                language={language}
                records={records}
                onStart={start}
                onExit={onExit}
                bestLabel={(record) => `${l({ eu: 'Marka', es: 'Récord', en: 'Record', ar: 'الرقم' })}: ${record.score} / ${total}`}
                howTo={(
                    <ul className="fraction-v2-game-rules">
                        <li>{l({ eu: 'Ebazpen bakoitzean lerro bakar bat dago gaizki; hortik aurrera, urratsak zuzenak dira, baina akatsa daramate.', es: 'En cada resolución hay una sola línea mal; a partir de ella, los pasos son correctos, pero arrastran el error.', en: 'In each solution there is just one wrong line; from that line on, the steps look right but carry the mistake.', ar: 'في كل حل سطر واحد خاطئ؛ وما بعده صحيح لكنه يحمل الخطأ.' })}</li>
                        <li>{l({ eu: 'Sakatu lerro okerra (puntu 1) eta aukeratu zein akats den (beste puntu 1).', es: 'Toca la línea equivocada (1 punto) y elige qué error es (otro punto).', en: 'Tap the wrong line (1 point) and choose which mistake it is (another point).', ar: 'المس السطر الخاطئ (نقطة) واختر نوع الخطأ (نقطة أخرى).' })}</li>
                        <li>{l({ eu: `${count} kasu maila bakoitzean.`, es: `${count} casos por nivel.`, en: `${count} cases per level.`, ar: `${count} حالات في كل مستوى.` })}</li>
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
                    stars={stars}
                    title={`${score} / ${total}`}
                    subtitle={l({ eu: `3 izar: ${total - 1} puntu · 2 izar: ${third} · izar 1: ${total / 2}`, es: `3 estrellas: ${total - 1} puntos · 2: ${third} · 1: ${total / 2}`, en: `3 stars: ${total - 1} points · 2: ${third} · 1: ${total / 2}`, ar: `3 نجوم: ${total - 1} نقطة · 2: ${third} · 1: ${total / 2}` })}
                    stats={[
                        { label: l({ eu: 'Lerro okerrak', es: 'Líneas encontradas', en: 'Lines found', ar: 'الأسطر المكتشفة' }), value: `${found.lines} / ${count}` },
                        { label: l({ eu: 'Akats motak', es: 'Errores identificados', en: 'Mistakes identified', ar: 'الأخطاء المحدَّدة' }), value: `${found.kinds} / ${count}` }
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
                <span>{index + 1} / {count}</span>
                <span><strong>{score}</strong> {l({ eu: 'puntu', es: 'puntos', en: 'points', ar: 'نقطة' })}</span>
            </GameTopbar>

            <section className="detective-sheet" aria-label={l({ eu: 'Ebazpena', es: 'La resolución', en: 'The solution', ar: 'الحل' })}>
                <p>
                    <MathText text={l(item.problem)} inline />
                </p>
                <ol className="detective-lines">
                    {item.lines.map((current, position) => {
                        const marks = step === 'line' ? '' : position === item.wrong ? 'wrong' : position === line ? 'missed' : ''
                        return (
                            <li key={position}>
                                <button
                                    type="button"
                                    className={`detective-line ${marks}`}
                                    disabled={step !== 'line'}
                                    aria-label={`${l({ eu: 'Lerroa', es: 'Línea', en: 'Line', ar: 'السطر' })} ${lineNumber(position)}: ${l(current.label)}`}
                                    onClick={() => chooseLine(position)}
                                >
                                    <span className="detective-line-number">{lineNumber(position)}</span>
                                    <span className="worked-detective-step">
                                        <span className="worked-detective-label" dir={language === 'ar' ? 'rtl' : 'ltr'}>{l(current.label)}</span>
                                        <MathText text={`$${localLatex(current.latex, language)}$`} />
                                    </span>
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
                                    <MathText text={l(config.names[option])} inline />
                                </button>
                            ))}
                        </div>
                    </>
                )}
                {step === 'done' && (
                    <div className="detective-explain">
                        <p>
                            <strong><MathText text={kind === item.error ? l({ eu: 'Zuzena!', es: '¡Correcto!', en: 'Correct!', ar: 'صحيح!' }) : l({ eu: `Ez zehazki: «${config.names[item.error].eu}».`, es: `No exactamente: «${config.names[item.error].es}».`, en: `Not exactly: “${config.names[item.error].en}”.`, ar: `ليس تمامًا: «${config.names[item.error].ar}».` })} inline /></strong>{' '}
                            <MathText text={l(config.tips[item.error])} inline />
                        </p>
                        <p className="detective-fix">
                            <span>{l({ eu: 'Hau izan behar zuen:', es: 'Debería ser:', en: 'It should be:', ar: 'كان يجب أن يكون:' })}</span>
                            <MathText text={`$${localLatex(item.fix, language)}$`} />
                        </p>
                        <button type="button" className="fraction-v2-primary" onClick={next} ref={(node) => node?.focus({ preventScroll: true })}>
                            {index + 1 >= count ? l({ eu: 'Emaitza ikusi', es: 'Ver resultado', en: 'See the result', ar: 'اعرض النتيجة' }) : l({ eu: 'Hurrengoa', es: 'Siguiente', en: 'Next', ar: 'التالي' })}
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}
