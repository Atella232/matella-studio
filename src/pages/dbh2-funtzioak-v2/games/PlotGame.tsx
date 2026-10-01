import { useState, type KeyboardEvent } from 'react'
import { MathText } from '../../../components/MathText'
import { GameTopbar, LevelPicker, ResultPanel } from '../../../features/unit-v2/games/GameKit'
import { useGameText } from '../../../features/unit-v2/games/gameHooks'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import { createRandom, randomSeed } from '../../../features/unit-v2/games/random'
import { pointLatex, signed, type Point } from '../functions'
import { Plane, PlaneGuides, PlanePoint } from '../plane'
import { PLOT_ROUNDS, PLOT_TRIES, createPlotRound, plotLevels, plotPoints, plotStars, samePoint, type PlotTarget } from './boards'
import { FunctionsGameArt } from './GameArt'
import { functionsGames } from './info'

type Phase = 'pick' | 'playing' | 'finished'

const game = functionsGames.find((item) => item.id === 'plot')!
const STAGE = 'var(--stage, #2f6fdb)'
const GREEN = 'var(--success, #267b53)'
const SECOND = 'var(--second, #c4432a)'

export function PlotGame({ language, records, onResult, onExit }: GameProps) {
    const l = useGameText(language)
    const [phase, setPhase] = useState<Phase>('pick')
    const [level, setLevel] = useState(0)
    const [targets, setTargets] = useState<PlotTarget[]>([])
    const [index, setIndex] = useState(0)
    const [candidate, setCandidate] = useState<Point | null>(null)
    const [failed, setFailed] = useState(0)
    const [outcome, setOutcome] = useState<'idle' | 'retry' | 'right' | 'revealed'>('idle')
    const [total, setTotal] = useState(0)

    const start = (nextLevel: number) => {
        setLevel(nextLevel)
        setTargets(createPlotRound(createRandom(randomSeed()), nextLevel))
        setIndex(0)
        setCandidate(null)
        setFailed(0)
        setOutcome('idle')
        setTotal(0)
        setPhase('playing')
    }

    const { box } = plotLevels[level]
    const target = targets[index]
    const clampPoint = ([x, y]: Point): Point => [Math.min(box.xMax, Math.max(box.xMin, x)), Math.min(box.yMax, Math.max(box.yMin, y))]
    const finished = outcome === 'right' || outcome === 'revealed'

    const check = () => {
        if (!candidate || !target || finished) return
        if (samePoint(candidate, target.point)) {
            setTotal((sum) => sum + plotPoints(failed))
            setOutcome('right')
            return
        }
        if (failed + 1 >= PLOT_TRIES) {
            setFailed(failed + 1)
            setOutcome('revealed')
            return
        }
        setFailed(failed + 1)
        setOutcome('retry')
    }

    const next = () => {
        if (index + 1 < targets.length) {
            setIndex(index + 1)
            setCandidate(null)
            setFailed(0)
            setOutcome('idle')
            return
        }
        onResult(level, { stars: plotStars(total), score: total, timeMs: null })
        setPhase('finished')
    }

    const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        if (finished) return
        const moves: Record<string, Point> = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, 1], ArrowDown: [0, -1] }
        const move = moves[event.key]
        if (move) {
            event.preventDefault()
            const from: Point = candidate ?? clampPoint([0, 0])
            setCandidate(candidate ? clampPoint([from[0] + move[0], from[1] + move[1]]) : from)
            if (outcome === 'retry') setOutcome('idle')
        } else if (event.key === 'Enter' && candidate) {
            event.preventDefault()
            check()
        }
    }

    if (phase === 'pick') {
        return (
            <LevelPicker
                game={game}
                art={<FunctionsGameArt game="plot" />}
                language={language}
                records={records}
                onStart={start}
                onExit={onExit}
                bestLabel={(record) => `${l({ eu: 'Marka', es: 'Récord', ar: 'الرقم' })}: ${record.score} ${l({ eu: 'puntu', es: 'puntos', ar: 'نقطة' })}`}
                howTo={(
                    <ul className="fraction-v2-game-rules">
                        <li>{l({ eu: `${PLOT_ROUNDS} puntu. Sakatu planoan puntua dagoen tokian eta egiaztatu.`, es: `${PLOT_ROUNDS} puntos. Pulsa en el plano donde está el punto y comprueba.`, ar: `${PLOT_ROUNDS} نقاط. اضغط على موضع النقطة في المستوى ثم تحقق.` })}</li>
                        <li>{l({ eu: 'Lehen saiakeran: 2 puntu; bigarrenean: 1.', es: 'A la primera: 2 puntos; a la segunda: 1.', ar: 'من المحاولة الأولى: نقطتان؛ من الثانية: نقطة.' })}</li>
                        <li>{l({ eu: 'Teklatuarekin: geziek puntua mugitzen dute eta Enter-ek egiaztatzen du.', es: 'Con el teclado: las flechas mueven el punto y Enter comprueba.', ar: 'بلوحة المفاتيح: الأسهم تحرّك النقطة وEnter يتحقق.' })}</li>
                    </ul>
                )}
            />
        )
    }

    return (
        <div className="functions-plot-game" data-stage={game.levels[level].stage}>
            <GameTopbar game={game} language={language} onExit={onExit}>
                <span><strong>{Math.min(index + 1, PLOT_ROUNDS)}</strong> / {PLOT_ROUNDS}</span>
                <span>{total} {l({ eu: 'puntu', es: 'puntos', ar: 'نقطة' })}</span>
            </GameTopbar>

            {phase === 'playing' && target && (
                <div className="functions-plot-card">
                    <p className="functions-plot-prompt"><MathText text={l(target.prompt)} /></p>
                    <div className="functions-plot-board" tabIndex={0} role="group" aria-label={l({ eu: 'Planoa. Geziekin mugitu puntua.', es: 'Plano. Mueve el punto con las flechas.', ar: 'المستوى. حرّك النقطة بالأسهم.' })} onKeyDown={onKeyDown}>
                        <Plane box={box} cell={box.xMax - box.xMin > 10 ? 28 : 32} label={l({ eu: 'Planoa', es: 'Plano', ar: 'المستوى' })} onPick={(point) => { if (finished) return; setCandidate(point); if (outcome === 'retry') setOutcome('idle') }}>
                            {(map) => (
                                <g>
                                    {candidate && !finished && <PlaneGuides map={map} point={candidate} color={STAGE} />}
                                    {candidate && <PlanePoint map={map} point={candidate} color={outcome === 'revealed' ? SECOND : STAGE} radius={7.5} />}
                                    {outcome === 'revealed' && <PlanePoint map={map} point={target.point} color={GREEN} radius={8.5} name={`A${pointLatex(target.point).replace(/\\,/g, '').replace(/\\frac\{(\d+)\}\{(\d+)\}/g, '$1/$2')}`} dx={10} dy={-10} fontSize={14} />}
                                    {outcome === 'right' && <PlanePoint map={map} point={target.point} color={GREEN} radius={8.5} />}
                                </g>
                            )}
                        </Plane>
                    </div>
                    <p className="functions-plot-readout" aria-live="polite">
                        {candidate
                            ? l({ eu: `Hautatuta: (${signed(candidate[0])}, ${signed(candidate[1])})`, es: `Elegido: (${signed(candidate[0])}, ${signed(candidate[1])})`, ar: `المختار: (${signed(candidate[0])}, ${signed(candidate[1])})` })
                            : l({ eu: 'Sakatu planoan edo erabili geziak.', es: 'Pulsa en el plano o usa las flechas.', ar: 'اضغط على المستوى أو استعمل الأسهم.' })}
                    </p>
                    <div aria-live="polite">
                        {outcome === 'retry' && <div className="fraction-v2-feedback error">{l({ eu: 'Ez da hori. Berriro saiatu: lehenengo x ardatzean, gero y ardatzean.', es: 'No es ahí. Inténtalo otra vez: primero el eje x y luego el y.', ar: 'ليس هناك. حاول مرة أخرى: أولًا محور x ثم y.' })}</div>}
                        {outcome === 'right' && <div className="fraction-v2-feedback success">{l({ eu: `Zuzena! +${plotPoints(failed)} puntu. `, es: `¡Correcto! +${plotPoints(failed)} puntos. `, ar: `صحيح! +${plotPoints(failed)} نقطة. ` })}<MathText text={`$${target.worked}$`} /></div>}
                        {outcome === 'revealed' && <div className="fraction-v2-feedback error">{l({ eu: 'Hau zen puntua: ', es: 'El punto era: ', ar: 'كانت النقطة: ' })}<MathText text={`$${target.worked}$`} /></div>}
                    </div>
                    <div className="functions-plot-actions">
                        {finished
                            ? <button type="button" className="fraction-v2-primary" onClick={next} autoFocus>{index + 1 < targets.length ? l({ eu: 'Hurrengoa', es: 'Siguiente', ar: 'التالي' }) : l({ eu: 'Amaitu', es: 'Terminar', ar: 'إنهاء' })}</button>
                            : <button type="button" className="fraction-v2-primary" onClick={check} disabled={!candidate}>{l({ eu: 'Egiaztatu', es: 'Comprobar', ar: 'تحقق' })}</button>}
                    </div>
                </div>
            )}

            {phase === 'finished' && (
                <ResultPanel
                    language={language}
                    stars={plotStars(total)}
                    title={l({ eu: `${total} puntu`, es: `${total} puntos`, ar: `${total} نقطة` })}
                    subtitle={l({ eu: '3 izar: 14 puntu edo gehiago · 2 izar: 10', es: '3 estrellas: 14 puntos o más · 2: 10', ar: '3 نجوم: 14 نقطة أو أكثر · 2: 10' })}
                    stats={[{ label: l({ eu: 'Puntuak', es: 'Puntos', ar: 'النقاط' }), value: `${total} / ${PLOT_ROUNDS * 2}` }]}
                    onReplay={() => start(level)}
                    onNext={level < game.levels.length - 1 ? () => start(level + 1) : undefined}
                    onLevels={() => setPhase('pick')}
                />
            )}
        </div>
    )
}
