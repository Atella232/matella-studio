import type { GameInfo as UnitGameInfo } from '../../../features/unit-v2/games/records'
import { useRef, useState, type KeyboardEvent, type PointerEvent } from 'react'
import { MathText } from '../../../components/MathText'
import { toNumber } from '../math/fraction'
import { GameTopbar, LevelPicker, ResultPanel } from './GameKit'
import { useGameText } from './gameHooks'
import type { GameProps } from './index'
import { createRandom, randomSeed } from './random'
import { games } from './records'
import {
    createTargetRounds,
    scoreThrow,
    shareToValue,
    TARGET_THROWS,
    targetHintLatex,
    targetLatex,
    targetLevels,
    targetShare,
    targetStars,
    type TargetRound,
    type ThrowResult, type TargetLevel } from './target'

type Phase = 'pick' | 'aiming' | 'thrown' | 'finished'

interface Throw {
    round: TargetRound
    guess: number
    result: ThrowResult
}

const defaultGame = games.find((item) => item.id === 'target')!

/** The 1. DBH unit reuses the game with its own level list */
export function TargetGame({ language, records, onResult, onExit, config }: GameProps & { config?: { game: UnitGameInfo; levels?: TargetLevel[] } }) {
    const game = config?.game ?? defaultGame
    const levels = config?.levels ?? targetLevels
    const l = useGameText(language)
    const separator = language === 'ar' ? '.' : ','
    const [phase, setPhase] = useState<Phase>('pick')
    const [level, setLevel] = useState(0)
    const [rounds, setRounds] = useState<TargetRound[]>([])
    const [index, setIndex] = useState(0)
    const [share, setShare] = useState(0.5)
    const [throws, setThrows] = useState<Throw[]>([])
    const lineRef = useRef<HTMLDivElement>(null)
    const dragging = useRef(false)

    const start = (nextLevel: number) => {
        setLevel(nextLevel)
        setRounds(createTargetRounds(createRandom(randomSeed()), nextLevel, levels))
        setIndex(0)
        setShare(0.5)
        setThrows([])
        setPhase('aiming')
    }

    const total = throws.reduce((sum, item) => sum + item.result.points, 0)

    const throwNow = () => {
        if (phase !== 'aiming') return
        const round = rounds[index]
        const guess = shareToValue(level, share, levels)
        setThrows((list) => [...list, { round, guess, result: scoreThrow(guess, round.value) }])
        setPhase('thrown')
    }

    const next = () => {
        if (index + 1 >= TARGET_THROWS) {
            onResult(level, { stars: targetStars(total), score: total, timeMs: null })
            setPhase('finished')
            return
        }
        setIndex(index + 1)
        setShare(0.5)
        setPhase('aiming')
    }

    const moveTo = (event: PointerEvent<HTMLDivElement>) => {
        const rect = lineRef.current?.getBoundingClientRect()
        if (!rect) return
        setShare(Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width)))
    }

    const onKey = (event: KeyboardEvent<HTMLDivElement>) => {
        if (phase !== 'aiming') return
        const steps: Record<string, number> = { ArrowRight: 0.01, ArrowUp: 0.01, ArrowLeft: -0.01, ArrowDown: -0.01, PageUp: 0.05, PageDown: -0.05 }
        if (event.key in steps) {
            event.preventDefault()
            const step = steps[event.key] * (event.shiftKey ? 5 : 1)
            setShare((value) => Math.min(1, Math.max(0, value + step)))
        } else if (event.key === 'Home' || event.key === 'End') {
            event.preventDefault()
            setShare(event.key === 'Home' ? 0 : 1)
        } else if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            throwNow()
        }
    }

    if (phase === 'pick') {
        return (
            <LevelPicker
                game={game}
                language={language}
                records={records}
                onStart={start}
                onExit={onExit}
                bestLabel={(record) => `${l({ eu: 'Marka', es: 'Récord', ar: 'الرقم' })}: ${record.score}`}
                howTo={(
                    <ul className="fraction-v2-game-rules">
                        <li>{l({ eu: `${TARGET_THROWS} jaurtiketa. Eraman markatzailea zenbakia dagoen lekura eta sakatu «Jaurti».`, es: `${TARGET_THROWS} lanzamientos. Lleva el marcador adonde está el número y pulsa «Lanzar».`, ar: `${TARGET_THROWS} رميات. حرّك المؤشر إلى موضع العدد واضغط «ارمِ».` })}</li>
                        <li>{l({ eu: 'Unitate baten ehunena baino gertuago: 100 puntu. Unitatearen 1/8tik urrunago: 0.', es: 'A menos de una centésima de unidad: 100 puntos. A más de 1/8 de unidad: 0.', ar: 'أقرب من جزء من مئة من الوحدة: 100 نقطة. أبعد من 1/8 الوحدة: 0.' })}</li>
                        <li>{l({ eu: 'Teklatuarekin: geziak mugitzeko (Shift azkarrago) eta Enter jaurtitzeko.', es: 'Con teclado: flechas para mover (Mayús, más rápido) y Enter para lanzar.', ar: 'بلوحة المفاتيح: الأسهم للتحريك (Shift أسرع) وEnter للرمي.' })}</li>
                    </ul>
                )}
            />
        )
    }

    const levelInfo = levels[level]
    const round = rounds[index]
    const lastThrow = phase === 'thrown' ? throws[throws.length - 1] : null
    const integers = Array.from({ length: levelInfo.max - levelInfo.min + 1 }, (_, offset) => levelInfo.min + offset)
    const markerLeft = `${(lastThrow ? targetShare(level, lastThrow.guess, levels) : share) * 100}%`
    const gradeText = (result: ThrowResult) => ({
        bullseye: l({ eu: 'Itua! Zuzen-zuzen.', es: '¡Diana! Justo en el blanco.', ar: 'إصابة مباشرة!' }),
        close: l({ eu: 'Oso gertu!', es: '¡Muy cerca!', ar: 'قريب جدًا!' }),
        near: l({ eu: 'Gertu.', es: 'Cerca.', ar: 'قريب.' }),
        far: l({ eu: 'Urrun geratu zara.', es: 'Te has quedado lejos.', ar: 'كنت بعيدًا.' })
    })[result.grade]

    return (
        <div className="fraction-v2-target" data-stage={game.levels[level].stage}>
            <GameTopbar game={game} language={language} onExit={onExit}>
                <span>{Math.min(index + 1, TARGET_THROWS)} / {TARGET_THROWS}</span>
                <span><strong>{total}</strong> {l({ eu: 'puntu', es: 'puntos', ar: 'نقطة' })}</span>
            </GameTopbar>

            {phase !== 'finished' && round && (
                <div className="fraction-v2-target-stage">
                    <div className="fraction-v2-target-card" aria-live="polite">
                        <span className="fraction-v2-target-ask">{l({ eu: 'Non dago?', es: '¿Dónde está?', ar: 'أين يقع؟' })}</span>
                        <MathText text={`$${targetLatex(round, separator)}$`} />
                    </div>

                    <div
                        className={`fraction-v2-target-line ${phase}`}
                        dir="ltr"
                        ref={lineRef}
                        role="slider"
                        tabIndex={phase === 'aiming' ? 0 : -1}
                        aria-label={l({ eu: 'Markatzailearen posizioa zenbaki-zuzenean', es: 'Posición del marcador en la recta', ar: 'موضع المؤشر على خط الأعداد' })}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-valuenow={Math.round(share * 100)}
                        aria-valuetext={l({ eu: `Zuzenaren % ${Math.round(share * 100)}, ${levelInfo.min} eta ${levelInfo.max} artean`, es: `${Math.round(share * 100)} % de la recta, entre ${levelInfo.min} y ${levelInfo.max}`, ar: `${Math.round(share * 100)}٪ من الخط بين ${levelInfo.min} و${levelInfo.max}` })}
                        onKeyDown={onKey}
                        onPointerDown={(event) => {
                            if (phase !== 'aiming') return
                            dragging.current = true
                            event.currentTarget.setPointerCapture(event.pointerId)
                            moveTo(event)
                        }}
                        onPointerMove={(event) => { if (dragging.current && phase === 'aiming') moveTo(event) }}
                        onPointerUp={() => { dragging.current = false }}
                        onPointerCancel={() => { dragging.current = false }}
                    >
                        <div className="fraction-v2-target-axis" />
                        {integers.map((value) => (
                            <span className="fraction-v2-target-tick major" style={{ left: `${targetShare(level, value, levels) * 100}%` }} key={value}>
                                <b>{value < 0 ? `−${Math.abs(value)}` : value}</b>
                            </span>
                        ))}
                        {lastThrow && Array.from({ length: (levelInfo.max - levelInfo.min) * lastThrow.round.value.denominator - 1 }, (_, step) => {
                            const value = levelInfo.min + (step + 1) / lastThrow.round.value.denominator
                            return Number.isInteger(value) ? null : <span className="fraction-v2-target-tick minor" style={{ left: `${targetShare(level, value, levels) * 100}%` }} key={step} />
                        })}
                        {lastThrow && (
                            <>
                                <span
                                    className="fraction-v2-target-gap"
                                    style={{
                                        left: `${Math.min(targetShare(level, lastThrow.guess, levels), targetShare(level, toNumber(lastThrow.round.value), levels)) * 100}%`,
                                        width: `${Math.abs(targetShare(level, lastThrow.guess, levels) - targetShare(level, toNumber(lastThrow.round.value), levels)) * 100}%`
                                    }}
                                />
                                <span className="fraction-v2-target-truth" style={{ left: `${targetShare(level, toNumber(lastThrow.round.value), levels) * 100}%` }}>
                                    <MathText text={`$${targetLatex(lastThrow.round, separator)}$`} />
                                </span>
                            </>
                        )}
                        <span className={`fraction-v2-target-marker ${lastThrow ? 'thrown' : ''}`} style={{ left: markerLeft }} aria-hidden="true" />
                    </div>

                    {phase === 'aiming' && (
                        <button type="button" className="fraction-v2-primary fraction-v2-target-throw" onClick={throwNow}>
                            {l({ eu: 'Jaurti', es: 'Lanzar', ar: 'ارمِ' })}
                        </button>
                    )}

                    {lastThrow && (
                        <div className={`fraction-v2-target-result ${lastThrow.result.grade}`} role="status">
                            <strong>+{lastThrow.result.points}</strong>
                            <div>
                                <p>{gradeText(lastThrow.result)}</p>
                                <p className="fraction-v2-target-hint"><MathText text={`$${targetHintLatex(lastThrow.round, separator)}$`} /></p>
                            </div>
                            <button type="button" className="fraction-v2-primary" onClick={next} ref={(node) => node?.focus({ preventScroll: true })}>
                                {index + 1 >= TARGET_THROWS ? l({ eu: 'Emaitza ikusi', es: 'Ver resultado', ar: 'اعرض النتيجة' }) : l({ eu: 'Hurrengoa', es: 'Siguiente', ar: 'التالي' })}
                            </button>
                        </div>
                    )}
                </div>
            )}

            {phase === 'finished' && (
                <ResultPanel
                    language={language}
                    stars={targetStars(total)}
                    title={`${total} ${l({ eu: 'puntu', es: 'puntos', ar: 'نقطة' })}`}
                    subtitle={l({ eu: '3 izar: 850 puntu · 2 izar: 650 · izar 1: 400', es: '3 estrellas: 850 puntos · 2: 650 · 1: 400', ar: '3 نجوم: 850 نقطة · 2: 650 · 1: 400' })}
                    stats={[
                        { label: l({ eu: 'Itua', es: 'Dianas', ar: 'إصابات' }), value: String(throws.filter((item) => item.result.grade === 'bullseye').length) },
                        { label: l({ eu: 'Oso gertu', es: 'Muy cerca', ar: 'قريب جدًا' }), value: String(throws.filter((item) => item.result.grade === 'close').length) },
                        { label: l({ eu: 'Urrun', es: 'Lejos', ar: 'بعيد' }), value: String(throws.filter((item) => item.result.grade === 'far').length) }
                    ]}
                    onReplay={() => start(level)}
                    onNext={level < game.levels.length - 1 ? () => start(level + 1) : undefined}
                    onLevels={() => setPhase('pick')}
                >
                    <ol className="fraction-v2-target-summary">
                        {throws.map((item, throwIndex) => (
                            <li className={item.result.grade} key={throwIndex}>
                                <MathText text={`$${targetLatex(item.round, separator)}$`} />
                                <span>+{item.result.points}</span>
                            </li>
                        ))}
                    </ol>
                </ResultPanel>
            )}
        </div>
    )
}
