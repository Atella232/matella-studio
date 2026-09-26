import { useCallback, useEffect, useState } from 'react'
import { MathText } from '../../../components/MathText'
import { add, fraction, subtract, toLatex, toNumber, toText, type FractionValue } from '../math/fraction'
import { GameTopbar, LevelPicker, ResultPanel } from './GameKit'
import { useGameText } from './gameHooks'
import type { GameProps } from './index'
import { createRandom, randomSeed } from './random'
import { games } from './records'
import {
    brickFitsAnywhere,
    createWallSequence,
    discardBrick,
    fitsInRow,
    initialWallGame,
    placeBrick,
    rowTotal,
    WALL_LIVES,
    WALL_UNITS,
    wallFinished,
    wallLevels,
    wallStars,
    type WallState
} from './wall'

type Phase = 'pick' | 'playing' | 'finished'

interface Message {
    tone: 'info' | 'success' | 'error'
    latex?: string
    text: string
}

const game = games.find((item) => item.id === 'wall')!

function Brick({ value, scale = 1 }: { value: FractionValue; scale?: number }) {
    return (
        <span className="fraction-v2-brick" data-denominator={value.denominator} style={{ width: `${toNumber(value) * 100 * scale}%` }}>
            <span className="fraction-v2-brick-label" aria-hidden="true"><span>{value.numerator}</span><span>{value.denominator}</span></span>
        </span>
    )
}

export function WallGame({ language, records, onResult, onExit }: GameProps) {
    const l = useGameText(language)
    const [phase, setPhase] = useState<Phase>('pick')
    const [level, setLevel] = useState(0)
    const [sequence, setSequence] = useState<FractionValue[]>([])
    const [state, setState] = useState<WallState>(initialWallGame)
    const [message, setMessage] = useState<Message | null>(null)
    const [clearing, setClearing] = useState<{ row: number; bricks: FractionValue[] } | null>(null)
    const levelInfo = wallLevels[level]

    const start = (nextLevel: number) => {
        setLevel(nextLevel)
        setSequence(createWallSequence(createRandom(randomSeed()), nextLevel))
        setState(initialWallGame())
        setMessage(null)
        setClearing(null)
        setPhase('playing')
    }

    const settle = useCallback((next: WallState) => {
        setState(next)
        if (wallFinished(next, sequence)) {
            onResult(level, { stars: wallStars(next.cleared), score: next.cleared, timeMs: null })
            window.setTimeout(() => setPhase('finished'), 700)
        }
    }, [level, onResult, sequence])

    const place = useCallback((row: number) => {
        if (phase !== 'playing' || wallFinished(state, sequence)) return
        const brick = sequence[state.next]
        const before = state.rows[row]
        const { state: next, event } = placeBrick(state, sequence, row)
        const brickLatex = toLatex(brick)
        if (event.type === 'overflow') {
            setMessage({
                tone: 'error',
                latex: `${toLatex(rowTotal(before))}+${brickLatex}>1`,
                text: l({ eu: 'Ez da sartzen: ilara batek ezin du unitate bat baino gehiago izan.', es: 'No cabe: una fila no puede pasar de una unidad.', ar: 'لا تتسع: لا يمكن أن يتجاوز الصف وحدة واحدة.' })
            })
            return
        }
        if (event.type === 'cleared') {
            const bricks = [...before, brick]
            setClearing({ row, bricks })
            window.setTimeout(() => setClearing((current) => current?.row === row ? null : current), 750)
            setMessage({
                tone: 'success',
                latex: `${bricks.map((item) => toLatex(item)).join('+')}=1`,
                text: l({ eu: 'Ilara osatuta!', es: '¡Fila completa!', ar: 'اكتمل الصف!' })
            })
        } else {
            const total = rowTotal(next.rows[row])
            setMessage({
                tone: 'info',
                latex: before.length ? `${toLatex(rowTotal(before))}+${brickLatex}=${toLatex(total)}` : brickLatex,
                text: l({ eu: `${row + 1}. ilara`, es: `Fila ${row + 1}`, ar: `الصف ${row + 1}` })
            })
        }
        settle(next)
    }, [l, phase, sequence, settle, state])

    const discard = () => {
        if (phase !== 'playing' || wallFinished(state, sequence)) return
        const { state: next } = discardBrick(state)
        setMessage({
            tone: 'error',
            text: next.lives > 0
                ? l({ eu: `Adreilua bota duzu. ${next.lives} bizitza geratzen zaizkizu.`, es: `Has tirado el ladrillo. Te quedan ${next.lives} vidas.`, ar: `رميت الطوبة. بقي لك ${next.lives} محاولات.` })
                : l({ eu: 'Bizitzarik gabe geratu zara.', es: 'Te has quedado sin vidas.', ar: 'نفدت محاولاتك.' })
        })
        settle(next)
    }

    useEffect(() => {
        if (phase !== 'playing') return
        const onKey = (event: KeyboardEvent) => {
            if (event.metaKey || event.ctrlKey || event.altKey) return
            const row = ['1', '2', '3', '4'].indexOf(event.key)
            if (row >= 0) {
                event.preventDefault()
                place(row)
            }
        }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [phase, place])

    if (phase === 'pick') {
        return (
            <LevelPicker
                game={game}
                language={language}
                records={records}
                onStart={start}
                onExit={onExit}
                bestLabel={(record) => `${l({ eu: 'Marka', es: 'Récord', ar: 'الرقم' })}: ${record.score} / ${WALL_UNITS}`}
                howTo={(
                    <ul className="fraction-v2-game-rules">
                        <li>{l({ eu: 'Sakatu ilara bat (edo 1–4 teklak) adreilua bertan jartzeko.', es: 'Pulsa una fila (o las teclas 1–4) para colocar el ladrillo.', ar: 'اضغط على صف (أو المفاتيح 1–4) لوضع الطوبة فيه.' })}</li>
                        <li>{l({ eu: 'Ilara batek zehazki 1 balio duenean, desagertu egiten da.', es: 'Cuando una fila vale exactamente 1, desaparece.', ar: 'عندما يساوي الصف 1 تمامًا، يختفي.' })}</li>
                        <li>{l({ eu: `Adreilu bat inon sartzen ez bada, bota egin behar duzu. ${WALL_LIVES} bizitza dituzu.`, es: `Si un ladrillo no cabe en ninguna fila, tendrás que tirarlo. Tienes ${WALL_LIVES} vidas.`, ar: `إذا لم تتسع الطوبة في أي صف فعليك رميها. لديك ${WALL_LIVES} محاولات.` })}</li>
                        <li>{l({ eu: `${WALL_UNITS} unitate osa daitezke: denak osatzeko, planifikatu aurrez.`, es: `Se pueden completar ${WALL_UNITS} unidades: para lograrlas todas, planifica.`, ar: `يمكن إكمال ${WALL_UNITS} وحدات: خطط مسبقًا لإكمالها كلها.` })}</li>
                    </ul>
                )}
            />
        )
    }

    const current = sequence[state.next]
    const upcoming = sequence.slice(state.next + 1, state.next + 3)
    const stuck = current ? !brickFitsAnywhere(state, current) : false
    const left = sequence.length - state.next

    return (
        <div className="fraction-v2-wall-game" data-stage={game.levels[level].stage}>
            <GameTopbar game={game} language={language} onExit={onExit}>
                <span className="fraction-v2-wall-lives" aria-label={l({ eu: `${state.lives} bizitza`, es: `${state.lives} vidas`, ar: `${state.lives} محاولات` })}>
                    {Array.from({ length: WALL_LIVES }, (_, index) => <span className={index < state.lives ? 'on' : ''} key={index} aria-hidden="true">♥</span>)}
                </span>
                <span><strong>{state.cleared}</strong> / {WALL_UNITS}</span>
            </GameTopbar>

            {phase === 'playing' && (
                <>
                    <div className="fraction-v2-wall-dock">
                        <div className="fraction-v2-wall-current">
                            <span className="fraction-v2-wall-caption">{l({ eu: 'Adreilu hau', es: 'Este ladrillo', ar: 'هذه الطوبة' })}</span>
                            <div className="fraction-v2-wall-scale" aria-label={current ? toText(current) : ''}>
                                {current && <Brick value={current} />}
                            </div>
                        </div>
                        <div className="fraction-v2-wall-next">
                            <span className="fraction-v2-wall-caption">{l({ eu: 'Ondoren', es: 'Después', ar: 'التالي' })}</span>
                            <div>
                                {upcoming.map((brick, index) => <MathText text={`$${toLatex(brick)}$`} key={index} />)}
                                {upcoming.length === 0 && <span>—</span>}
                            </div>
                            <small>{l({ eu: `${left} adreilu`, es: `${left} ladrillos`, ar: `${left} طوبات` })}</small>
                        </div>
                    </div>

                    <div className="fraction-v2-wall-rows" dir="ltr">
                        {state.rows.map((row, rowIndex) => {
                            const total = rowTotal(row)
                            const fits = current ? fitsInRow(row, current) : false
                            const flashing = clearing?.row === rowIndex
                            const bricks = flashing ? clearing.bricks : row
                            const missing = subtract(fraction(1), total)
                            return (
                                <button
                                    type="button"
                                    className={`fraction-v2-wall-row ${flashing ? 'clearing' : ''} ${levelInfo.showMissing && !fits ? 'blocked' : ''}`}
                                    onClick={() => place(rowIndex)}
                                    aria-label={`${l({ eu: `${rowIndex + 1}. ilara`, es: `Fila ${rowIndex + 1}`, ar: `الصف ${rowIndex + 1}` })}: ${toText(total)}${levelInfo.showMissing && !fits ? ` · ${l({ eu: 'ez da sartzen', es: 'no cabe', ar: 'لا تتسع' })}` : ''}`}
                                    key={rowIndex}
                                >
                                    <span className="fraction-v2-wall-key" aria-hidden="true">{rowIndex + 1}</span>
                                    <span className="fraction-v2-wall-bar">
                                        {bricks.map((brick, brickIndex) => <Brick value={brick} key={brickIndex} />)}
                                        {!flashing && current && fits && (
                                            <span className="fraction-v2-wall-ghost" style={{ left: `${toNumber(total) * 100}%`, width: `${toNumber(current) * 100}%` }} aria-hidden="true" />
                                        )}
                                    </span>
                                    <span className="fraction-v2-wall-total" aria-hidden="true">
                                        <MathText text={`$${flashing ? '1' : toLatex(total)}$`} />
                                        {levelInfo.showMissing && !flashing && row.length > 0 && (
                                            <small>{l({ eu: 'falta', es: 'falta', ar: 'ينقص' })} <MathText text={`$${toLatex(missing)}$`} /></small>
                                        )}
                                    </span>
                                </button>
                            )
                        })}
                    </div>

                    <div className="fraction-v2-wall-actions">
                        <div className={`fraction-v2-wall-message ${message?.tone ?? ''}`} aria-live="polite">
                            {stuck
                                ? <span>{l({ eu: 'Adreilu hau ez da inongo ilaratan sartzen. Bota egin behar duzu.', es: 'Este ladrillo no cabe en ninguna fila. Tienes que tirarlo.', ar: 'هذه الطوبة لا تتسع في أي صف. عليك رميها.' })}</span>
                                : message && (
                                    <>
                                        <span>{message.text}</span>
                                        {message.latex && <MathText text={`$${message.latex}$`} />}
                                    </>
                                )}
                        </div>
                        <button type="button" className={stuck ? 'fraction-v2-primary' : 'fraction-v2-secondary'} onClick={discard}>
                            {l({ eu: 'Bota adreilua (−1 ♥)', es: 'Tirar ladrillo (−1 ♥)', ar: 'ارمِ الطوبة (−1 ♥)' })}
                        </button>
                    </div>
                </>
            )}

            {phase === 'finished' && (
                <ResultPanel
                    language={language}
                    stars={wallStars(state.cleared)}
                    title={l({ eu: `${state.cleared} unitate osatuta`, es: `${state.cleared} unidades completadas`, ar: `${state.cleared} وحدات مكتملة` })}
                    subtitle={state.lives <= 0
                        ? l({ eu: 'Bizitzak amaitu dira.', es: 'Se acabaron las vidas.', ar: 'انتهت المحاولات.' })
                        : l({ eu: '3 izar: 8 unitate · 2 izar: 6 · izar 1: 4', es: '3 estrellas: 8 unidades · 2: 6 · 1: 4', ar: '3 نجوم: 8 وحدات · 2: 6 · 1: 4' })}
                    stats={[
                        { label: l({ eu: 'Unitateak', es: 'Unidades', ar: 'الوحدات' }), value: `${state.cleared} / ${WALL_UNITS}` },
                        { label: l({ eu: 'Botatako adreiluak', es: 'Ladrillos tirados', ar: 'الطوب المرمي' }), value: String(state.discarded) },
                        { label: l({ eu: 'Erdizka geratu dena', es: 'Lo que quedó a medias', ar: 'ما بقي ناقصًا' }), value: toText(state.rows.reduce((sum, row) => add(sum, rowTotal(row)), fraction(0))) }
                    ]}
                    onReplay={() => start(level)}
                    onNext={level < game.levels.length - 1 ? () => start(level + 1) : undefined}
                    onLevels={() => setPhase('pick')}
                />
            )}
        </div>
    )
}
