import { useRef, useState, type KeyboardEvent, type MouseEvent, type ReactNode } from 'react'
import { MathText } from '../../../components/MathText'
import { GameTopbar, LevelPicker, ResultPanel } from '../../../features/unit-v2/games/GameKit'
import { useGameText } from '../../../features/unit-v2/games/gameHooks'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import { createRandom, randomSeed } from '../../../features/unit-v2/games/random'
import type { GameInfo } from '../../../features/unit-v2/games/records'
import { LinePoint, RealAxis } from '../realLine'
import { lineMap, tickText } from '../realLineMap'
import { PLACE_ROUNDS, PLACE_TRIES, createPlaceRound, isPlacedRight, placeHint, placeLevels, placePoints, placeStars, snapToMark, type PlaceTarget } from './boards'
import { RealsGameArt } from './GameArt'
import { realsGames } from './info'

type Phase = 'pick' | 'playing' | 'finished'

const appliedGame = realsGames.find((item) => item.id === 'place')!
const STAGE = 'var(--stage, #2f6fdb)'
const GREEN = 'var(--success, #267b53)'
const SECOND = 'var(--second, #c4432a)'
const WIDTH = 640
const X0 = 40
const X1 = 600

/** Kokatu zuzenean: click (or move with the arrows) to the mark where the number is */
export function PlaceGame(props: GameProps) {
    return <PlaceGameView {...props} game={appliedGame} />
}

/** The same game with another unit's levels and progress ids (the academic unit uses it too) */
export function PlaceGameView({ language, records, onResult, onExit, game, art = <RealsGameArt game="place" /> }: GameProps & { game: GameInfo<string>; art?: ReactNode }) {
    const l = useGameText(language)
    const svg = useRef<SVGSVGElement>(null)
    const [phase, setPhase] = useState<Phase>('pick')
    const [level, setLevel] = useState(0)
    const [targets, setTargets] = useState<PlaceTarget[]>([])
    const [index, setIndex] = useState(0)
    const [candidate, setCandidate] = useState<number | null>(null)
    const [failed, setFailed] = useState(0)
    const [outcome, setOutcome] = useState<'idle' | 'retry' | 'right' | 'revealed'>('idle')
    const [total, setTotal] = useState(0)

    const start = (nextLevel: number) => {
        setLevel(nextLevel)
        setTargets(createPlaceRound(createRandom(randomSeed()), nextLevel))
        setIndex(0)
        setCandidate(null)
        setFailed(0)
        setOutcome('idle')
        setTotal(0)
        setPhase('playing')
    }

    const settings = placeLevels[level]
    const map = lineMap(settings.from, settings.to, X0, X1, 64)
    const target = targets[index]
    const finished = outcome === 'right' || outcome === 'revealed'
    const arabic = language === 'ar'
    const fix = (latex: string) => (arabic ? latex.replace(/\{,\}/g, '.') : latex)

    const choose = (value: number) => {
        if (finished) return
        setCandidate(snapToMark(settings, value))
        if (outcome === 'retry') setOutcome('idle')
    }

    const onClick = (event: MouseEvent<SVGSVGElement>) => {
        const box = svg.current?.getBoundingClientRect()
        if (!box || box.width === 0) return
        const x = ((event.clientX - box.left) / box.width) * WIDTH
        choose(settings.from + ((x - X0) / (X1 - X0)) * (settings.to - settings.from))
    }

    const check = () => {
        if (candidate === null || !target || finished) return
        if (isPlacedRight(settings, candidate, target.value)) {
            setTotal((sum) => sum + placePoints(failed))
            setOutcome('right')
            return
        }
        setFailed(failed + 1)
        setOutcome(failed + 1 >= PLACE_TRIES ? 'revealed' : 'retry')
    }

    const next = () => {
        if (index + 1 < targets.length) {
            setIndex(index + 1)
            setCandidate(null)
            setFailed(0)
            setOutcome('idle')
            return
        }
        onResult(level, { stars: placeStars(total), score: total, timeMs: null })
        setPhase('finished')
    }

    const step = 1 / settings.minor
    const nudge = (by: number) => choose(candidate === null ? (settings.from + settings.to) / 2 : candidate + by)

    const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        if (finished) return
        const moves: Record<string, number> = { ArrowLeft: -step, ArrowRight: step, ArrowDown: -step, ArrowUp: step, PageDown: -1, PageUp: 1 }
        if (event.key in moves) {
            event.preventDefault()
            nudge(moves[event.key])
        } else if (event.key === 'Enter' && candidate !== null) {
            event.preventDefault()
            check()
        }
    }

    if (phase === 'pick') {
        return (
            <LevelPicker
                game={game}
                art={art}
                language={language}
                records={records}
                onStart={start}
                onExit={onExit}
                bestLabel={(record) => `${l({ eu: 'Marka', es: 'Récord', ar: 'الرقم' })}: ${record.score} ${l({ eu: 'puntu', es: 'puntos', ar: 'نقطة' })}`}
                howTo={(
                    <ul className="fraction-v2-game-rules">
                        <li>{l({ eu: `${PLACE_ROUNDS} zenbaki. Sakatu zuzenean zenbakia dagoen marka eta egiaztatu.`, es: `${PLACE_ROUNDS} números. Pulsa en la recta la marca donde está el número y comprueba.`, ar: `${PLACE_ROUNDS} أعداد. اضغط على العلامة التي يقع عندها العدد ثم تحقق.` })}</li>
                        <li>{l({ eu: 'Lehen saiakeran: 2 puntu; bigarrenean: 1.', es: 'A la primera: 2 puntos; a la segunda: 1.', ar: 'من المحاولة الأولى: نقطتان؛ من الثانية: نقطة.' })}</li>
                        {/* The irrational level is the third: units that stop at the rationals give only two */}
                        {game.levels.length > 2 && <li>{l({ eu: 'Irrazionalak: inguruko bi hamarrenetako edozein balio du.', es: 'Irracionales: vale cualquiera de las dos décimas que lo rodean.', ar: 'غير النسبية: يُقبل أي من العُشرين المحيطين به.' })}</li>}
                        <li>{l({ eu: 'Teklatuarekin: geziek marka batetik bestera mugitzen dute eta Enter-ek egiaztatzen du.', es: 'Con el teclado: las flechas mueven de marca en marca y Enter comprueba.', ar: 'بلوحة المفاتيح: الأسهم تنقل من علامة إلى أخرى وEnter يتحقق.' })}</li>
                    </ul>
                )}
            />
        )
    }

    return (
        <div className="reals-place-game" data-stage={game.levels[level].stage}>
            <GameTopbar game={game} language={language} onExit={onExit}>
                <span><strong>{Math.min(index + 1, PLACE_ROUNDS)}</strong> / {PLACE_ROUNDS}</span>
                <span>{total} {l({ eu: 'puntu', es: 'puntos', ar: 'نقطة' })}</span>
            </GameTopbar>

            {phase === 'playing' && target && (
                <div className="reals-place-card">
                    <p className="reals-place-prompt"><MathText text={l({ eu: `Kokatu $${fix(target.latex)}$ zuzenean.`, es: `Sitúa $${fix(target.latex)}$ en la recta.`, ar: `ضع $${fix(target.latex)}$ على المستقيم.` })} /></p>
                    <div className="reals-place-board" tabIndex={0} role="group" aria-label={l({ eu: 'Zuzen erreala. Geziekin mugitu puntua.', es: 'Recta real. Mueve el punto con las flechas.', ar: 'المستقيم الحقيقي. حرّك النقطة بالأسهم.' })} onKeyDown={onKeyDown}>
                        <svg ref={svg} viewBox={`0 0 ${WIDTH} 110`} className="reals-line reals-place-line" onClick={onClick} aria-hidden="true">
                            <rect x="0" y="20" width={WIDTH} height="70" fill="transparent" />
                            <RealAxis map={map} minor={settings.minor} arabic={arabic} fontSize={17} />
                            {candidate !== null && <LinePoint map={map} value={candidate} color={outcome === 'revealed' ? SECOND : STAGE} radius={8} name={tickText(candidate, arabic)} fontSize={16} />}
                            {finished && <LinePoint map={map} value={target.value} color={GREEN} radius={8.5} />}
                        </svg>
                    </div>
                    <p className="reals-place-readout" aria-live="polite">
                        {candidate !== null
                            ? l({ eu: `Hautatuta: ${tickText(candidate)}`, es: `Elegido: ${tickText(candidate)}`, ar: `المختار: \u2066${tickText(candidate, true)}\u2069` })
                            : l({ eu: 'Sakatu zuzenean edo erabili geziak.', es: 'Pulsa en la recta o usa las flechas.', ar: 'اضغط على المستقيم أو استعمل الأسهم.' })}
                    </p>
                    <div aria-live="polite">
                        {outcome === 'retry' && candidate !== null && <div className="fraction-v2-feedback error">{l(placeHint(candidate, target.value))}</div>}
                        {outcome === 'right' && <div className="fraction-v2-feedback success">{l({ eu: `Zuzena! +${placePoints(failed)} puntu. `, es: `¡Correcto! +${placePoints(failed)} puntos. `, ar: `صحيح! +${placePoints(failed)} نقطة. ` })}<MathText text={`$${fix(target.worked)}$`} /></div>}
                        {outcome === 'revealed' && <div className="fraction-v2-feedback error">{l({ eu: 'Hemen zegoen (berdea): ', es: 'Estaba aquí (en verde): ', ar: 'كان هنا (بالأخضر): ' })}<MathText text={`$${fix(target.worked)}$`} /></div>}
                    </div>
                    <div className="reals-place-actions">
                        {!finished && (
                            // The line reads left to right in every language, and so do these buttons
                            <span className="reals-place-nudge" dir="ltr">
                                <button type="button" className="fraction-v2-secondary" onClick={() => nudge(-step)} aria-label={l({ eu: 'Marka bat ezkerrera', es: 'Una marca a la izquierda', ar: 'علامة واحدة إلى اليسار' })}>←</button>
                                <button type="button" className="fraction-v2-secondary" onClick={() => nudge(step)} aria-label={l({ eu: 'Marka bat eskuinera', es: 'Una marca a la derecha', ar: 'علامة واحدة إلى اليمين' })}>→</button>
                            </span>
                        )}
                        {finished
                            ? <button type="button" className="fraction-v2-primary" onClick={next} autoFocus>{index + 1 < targets.length ? l({ eu: 'Hurrengoa', es: 'Siguiente', ar: 'التالي' }) : l({ eu: 'Amaitu', es: 'Terminar', ar: 'إنهاء' })}</button>
                            : <button type="button" className="fraction-v2-primary" onClick={check} disabled={candidate === null}>{l({ eu: 'Egiaztatu', es: 'Comprobar', ar: 'تحقق' })}</button>}
                    </div>
                </div>
            )}

            {phase === 'finished' && (
                <ResultPanel
                    language={language}
                    stars={placeStars(total)}
                    title={l({ eu: `${total} puntu`, es: `${total} puntos`, ar: `${total} نقطة` })}
                    subtitle={l({ eu: '3 izar: 14 puntu edo gehiago · 2 izar: 10', es: '3 estrellas: 14 puntos o más · 2: 10', ar: '3 نجوم: 14 نقطة أو أكثر · 2: 10' })}
                    stats={[{ label: l({ eu: 'Puntuak', es: 'Puntos', ar: 'النقاط' }), value: `${total} / ${PLACE_ROUNDS * 2}` }]}
                    onReplay={() => start(level)}
                    onNext={level < game.levels.length - 1 ? () => start(level + 1) : undefined}
                    onLevels={() => setPhase('pick')}
                />
            )}
        </div>
    )
}
