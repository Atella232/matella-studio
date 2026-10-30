import { useRef, useState, type KeyboardEvent, type PointerEvent } from 'react'
import { MathText } from '../../../components/MathText'
import { GameTopbar, LevelPicker, ResultPanel } from '../../../features/unit-v2/games/GameKit'
import { localLatex, useGameText } from '../../../features/unit-v2/games/gameHooks'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import { createRandom, randomSeed } from '../../../features/unit-v2/games/random'
import { Label } from '../../dbh2-funtzioak-v2/plane'
import { usePlayback } from '../lab/usePlayback'
import { ProportionDbh4ApGameArt } from './GameArt'
import { proportionDbh4ApGames } from './info'
import { durationText } from './numbers'
import { createRoadRounds, isTowards, ROAD_ROUNDS, roadAnswer, roadGradeTexts, roadPositions, roadProblem, roadStars, roadSteps, scoreFlag, type RoadRound, type RoadThrow } from './road'
import './Road.css'

const game = proportionDbh4ApGames.find((item) => item.id === 'road')!

const INK = 'var(--ink, #1d2733)'
const MUTED = 'var(--muted, #58616e)'
const CARD = 'var(--card, #fffcf6)'
const BLUE = '#2f6fdb'
const RED = '#c4432a'
const GREEN = 'var(--success, #267b53)'
const FLAG = 'var(--mustard, #e0a526)'

/** The road runs from km 0 at X0 to the end of the road at X1 */
const X0 = 24
const X1 = 336
const WIDTH = 360
const TRIP_MS = 3000

/** A tick every 10, 20, 25, 50 or 100 km: no more than eight on the road */
const tickStep = (road: number) => [10, 20, 25, 50, 100].find((step) => road / step <= 8) ?? 100

interface Throw {
    round: RoadRound
    flag: number
    result: RoadThrow
}

/** A car seen from above, its windscreen to the front */
function Car({ x, y, color, letter, right }: { x: number; y: number; color: string; letter: string; right: boolean }) {
    return (
        <g transform={`translate(${x} ${y})`}>
            <rect x={-16} y={-8} width={32} height={16} rx={5} fill={color} stroke={INK} strokeWidth={1.4} />
            <rect x={right ? 4 : -12} y={-6} width={8} height={12} rx={2} fill="#fff" fillOpacity={0.75} />
            <text x={right ? -5 : 5} y={4} textAnchor="middle" fontSize={11} fontWeight={700} fill="#fff">{letter}</text>
        </g>
    )
}

export function ProportionDbh4ApRoadGame({ language, records, onResult, onExit }: GameProps) {
    const l = useGameText(language)
    const [phase, setPhase] = useState<'pick' | 'playing' | 'finished'>('pick')
    const [level, setLevel] = useState(0)
    const [seed, setSeed] = useState(0)
    const [rounds, setRounds] = useState<RoadRound[]>([])
    const [index, setIndex] = useState(0)
    /** km of the flag, or null until the player plants it */
    const [flag, setFlag] = useState<number | null>(null)
    const [throws, setThrows] = useState<Throw[]>([])
    const boardRef = useRef<SVGSVGElement>(null)
    const dragging = useRef(false)
    // The trip belongs to this game and this round
    const trip = usePlayback(`${seed}-${index}`, TRIP_MS)

    const round = rounds[index]
    const thrown = throws.length > index
    const arrived = thrown && trip.progress === 1
    const total = throws.reduce((sum, item) => sum + item.result.points, 0)
    // The points of a throw count once the cars arrive
    const counted = total - (thrown && !arrived ? throws[index].result.points : 0)
    const letters = language === 'ar' ? ['أ', 'ب'] : ['A', 'B']

    const start = (nextLevel: number) => {
        const nextSeed = randomSeed()
        setLevel(nextLevel)
        setSeed(nextSeed)
        setRounds(createRoadRounds(createRandom(nextSeed), nextLevel))
        setIndex(0)
        setFlag(null)
        setThrows([])
        setPhase('playing')
    }

    const go = () => {
        if (thrown || flag === null) return
        setThrows((list) => [...list, { round, flag, result: scoreFlag(flag, round) }])
        trip.play()
    }

    const next = () => {
        if (index + 1 >= ROAD_ROUNDS) {
            onResult(level, { stars: roadStars(total), score: total, timeMs: null })
            setPhase('finished')
            return
        }
        setIndex(index + 1)
        setFlag(null)
    }

    const moveTo = (event: PointerEvent<SVGSVGElement>) => {
        const rect = boardRef.current?.getBoundingClientRect()
        if (!rect || !round) return
        const x = ((event.clientX - rect.left) / rect.width) * WIDTH
        setFlag(Math.min(round.road, Math.max(0, Math.round(((x - X0) / (X1 - X0)) * round.road))))
    }

    const nudge = (step: number) => setFlag((value) => Math.min(round.road, Math.max(0, (value ?? Math.round(round.road / 2)) + step)))

    const onKey = (event: KeyboardEvent<SVGSVGElement>) => {
        if (thrown) return
        const steps: Record<string, number> = { ArrowRight: 1, ArrowUp: 1, ArrowLeft: -1, ArrowDown: -1, PageUp: 10, PageDown: -10 }
        if (event.key in steps) {
            event.preventDefault()
            nudge(steps[event.key] * (event.shiftKey ? 10 : 1))
        } else if (event.key === 'Home' || event.key === 'End') {
            event.preventDefault()
            setFlag(event.key === 'Home' ? 0 : round.road)
        } else if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            go()
        }
    }

    if (phase === 'pick') {
        return (
            <LevelPicker
                game={game}
                art={<ProportionDbh4ApGameArt game="road" />}
                language={language}
                records={records}
                onStart={start}
                onExit={onExit}
                bestLabel={(record) => `${l({ eu: 'Marka', es: 'Récord', en: 'Record', ar: 'الرقم' })}: ${record.score}`}
                howTo={(
                    <ul className="fraction-v2-game-rules">
                        <li>{l({ eu: 'Sakatu errepidean bandera jartzeko, A eta B elkartuko diren lekuan. Gero, sakatu «Irteera!».', es: 'Toca la carretera para poner la bandera donde se encontrarán A y B. Después, pulsa «¡Salida!».', en: 'Tap the road to place the flag where A and B will meet. Then press ‘Go!’.', ar: 'المس الطريق لتضع الراية حيث ستلتقي أ وب. ثم اضغط «انطلاق!».' })}</li>
                        <li>{l({ eu: `${ROAD_ROUNDS} bidaia. Errepidearen % 1 baino gertuago: 100 puntu. % 15 baino urrunago: 0.`, es: `${ROAD_ROUNDS} viajes. A menos del 1 % de la carretera: 100 puntos. A más del 15 %: 0.`, en: `${ROAD_ROUNDS} journeys. Less than 1% of the road away: 100 points. More than 15% away: 0.`, ar: `${ROAD_ROUNDS} رحلات. أقرب من 1٪ من الطريق: 100 نقطة. أبعد من 15٪: 0.` })}</li>
                        <li>{l({ eu: 'Kalkulatu: lehenik denbora, gero kilometroak. − eta + botoiek bandera km bat mugitzen dute.', es: 'Calcula: primero el tiempo, después los kilómetros. Los botones − y + mueven la bandera 1 km.', en: 'Calculate: first the time, then the kilometres. The − and + buttons move the flag 1 km.', ar: 'احسب: الزمن أولًا، ثم الكيلومترات. الزرّان − و+ يحرّكان الراية 1 كم.' })}</li>
                    </ul>
                )}
            />
        )
    }

    if (phase === 'finished') {
        return (
            <div className="road-game" data-stage={game.levels[level].stage}>
                <GameTopbar game={game} language={language} onExit={onExit} />
                <ResultPanel
                    language={language}
                    stars={roadStars(total)}
                    title={`${total} ${l({ eu: 'puntu', es: 'puntos', en: 'points', ar: 'نقطة' })}`}
                    subtitle={l({ eu: '3 izar: 510 puntu · 2 izar: 390 · izar 1: 240', es: '3 estrellas: 510 puntos · 2: 390 · 1: 240', en: '3 stars: 510 points · 2: 390 · 1: 240', ar: '3 نجوم: 510 نقاط · 2: 390 · 1: 240' })}
                    stats={[
                        { label: l({ eu: 'Itua', es: 'Dianas', en: 'Bullseyes', ar: 'إصابات' }), value: String(throws.filter((item) => item.result.grade === 'bullseye').length) },
                        { label: l({ eu: 'Oso gertu', es: 'Muy cerca', en: 'Very close', ar: 'قريب جدًا' }), value: String(throws.filter((item) => item.result.grade === 'close').length) },
                        { label: l({ eu: 'Urrun', es: 'Lejos', en: 'Far', ar: 'بعيد' }), value: String(throws.filter((item) => item.result.grade === 'far').length) }
                    ]}
                    onReplay={() => start(level)}
                    onNext={level < game.levels.length - 1 ? () => start(level + 1) : undefined}
                    onLevels={() => setPhase('pick')}
                />
            </div>
        )
    }

    // Only while a level is being set up
    if (!round) return <></>
    const x = (km: number) => X0 + (Math.min(Math.max(km, 0), round.road) / round.road) * (X1 - X0)
    const clock = thrown && trip.progress !== null ? trip.progress * round.minutes : 0
    const [aKm, bKm] = roadPositions(round, clock)
    const towards = isTowards(round.kind)
    const lastThrow = thrown ? throws[index] : null
    const step = tickStep(round.road)
    // B's start gets its own label; the ticks next to it keep quiet
    const bStart = round.distance > 0 ? round.distance : null
    const ticks = Array.from({ length: Math.floor(round.road / step) + 1 }, (_, tick) => tick * step)
    const late = round.kind === 'late-meet' ? 1 : round.kind === 'late-chase' ? 0 : null
    // Left to right as a whole; after an Arabic letter the numbers would jump in front of it, so a left-to-right mark follows it
    const speedLabel = (vehicle: 0 | 1) => `\u2066${letters[vehicle]}\u200e · ${round.speeds[vehicle]} km/h${late === vehicle ? ` · +${round.delay} min` : ''}\u2069`

    return (
        <div className="road-game" data-stage={game.levels[level].stage}>
            <GameTopbar game={game} language={language} onExit={onExit}>
                <span>{index + 1} / {ROAD_ROUNDS}</span>
                <span><strong>{counted}</strong> {l({ eu: 'puntu', es: 'puntos', en: 'points', ar: 'نقطة' })}</span>
            </GameTopbar>

            <p className="road-problem">{l(roadProblem(round))}</p>
            <p className="road-question">{l({ eu: 'Non elkartuko dira? Jarri bandera.', es: '¿Dónde se encuentran? Pon la bandera.', en: 'Where do they meet? Place the flag.', ar: 'أين تلتقيان؟ ضع الراية.' })}</p>

            <svg
                ref={boardRef}
                className={`road-board ${thrown ? 'thrown' : ''}`}
                viewBox={`0 0 ${WIDTH} 168`}
                direction="ltr"
                role="slider"
                tabIndex={thrown ? -1 : 0}
                aria-label={l({ eu: 'Banderaren lekua errepidean (km)', es: 'Lugar de la bandera en la carretera (km)', en: 'Position of the flag on the road (km)', ar: 'موضع الراية على الطريق (كم)' })}
                aria-valuemin={0}
                aria-valuemax={round.road}
                aria-valuenow={flag ?? undefined}
                aria-valuetext={flag === null ? l({ eu: 'Bandera jarri gabe', es: 'Sin bandera', en: 'No flag', ar: 'بلا راية' }) : `${flag} km`}
                onKeyDown={onKey}
                onPointerDown={(event) => {
                    if (thrown) return
                    dragging.current = true
                    event.currentTarget.setPointerCapture(event.pointerId)
                    moveTo(event)
                }}
                onPointerMove={(event) => { if (dragging.current && !thrown) moveTo(event) }}
                onPointerUp={() => { dragging.current = false }}
                onPointerCancel={() => { dragging.current = false }}
            >
                <text x={12} y={14} fontSize={13} fontWeight={700} fill={BLUE}>{speedLabel(0)}</text>
                <text x={348} y={14} textAnchor="end" fontSize={13} fontWeight={700} fill={RED}>{speedLabel(1)}</text>

                {/* The road from above: B's lane on top, A's below */}
                <rect x={8} y={56} width={344} height={48} rx={6} fill="var(--paper-deep, #ece6da)" stroke={INK} strokeWidth={1.6} />
                <line x1={12} x2={348} y1={80} y2={80} stroke={CARD} strokeWidth={2} strokeDasharray="10 8" />
                <line x1={x(0)} x2={x(0)} y1={56} y2={104} stroke={BLUE} strokeWidth={3} />
                {bStart !== null && <line x1={x(bStart)} x2={x(bStart)} y1={56} y2={104} stroke={RED} strokeWidth={3} strokeDasharray={towards ? undefined : '5 4'} />}

                {ticks.map((km) => (
                    <g key={km}>
                        <line x1={x(km)} x2={x(km)} y1={104} y2={110} stroke={INK} strokeWidth={1.4} />
                        {(bStart === null || Math.abs(x(km) - x(bStart)) > 28) && <text x={x(km)} y={124} textAnchor="middle" fontSize={12} fill={MUTED}>{km}</text>}
                    </g>
                ))}
                {bStart !== null && <text x={x(bStart)} y={124} textAnchor="middle" fontSize={13} fontWeight={700} fill={RED}>{bStart}</text>}

                {/* After the trip: where they really met, and how far the flag was */}
                {arrived && lastThrow && (
                    <>
                        <rect x={Math.min(x(lastThrow.flag), x(round.meeting))} y={56} width={Math.abs(x(lastThrow.flag) - x(round.meeting))} height={48} fill="var(--error, #c4452c)" fillOpacity={0.18} />
                        <line x1={x(round.meeting)} x2={x(round.meeting)} y1={50} y2={110} stroke={GREEN} strokeWidth={3} />
                        <text x={Math.min(Math.max(x(round.meeting), 34), 326)} y={142} textAnchor="middle" fontSize={15} fontWeight={700} fill={GREEN}>{`${round.meeting} km`}</text>
                    </>
                )}

                <Car x={x(bKm)} y={68} color={RED} letter={letters[1]} right={!towards} />
                <Car x={x(aKm)} y={92} color={BLUE} letter={letters[0]} right />

                {flag !== null && (
                    <g className="road-flag" pointerEvents="none">
                        <line x1={x(flag)} x2={x(flag)} y1={22} y2={106} stroke={INK} strokeWidth={2.4} />
                        <path d={`M${x(flag)} 22 L${x(flag) + (x(flag) > 300 ? -22 : 22)} 29 L${x(flag)} 36 Z`} fill={FLAG} stroke={INK} strokeWidth={1.4} strokeLinejoin="round" />
                    </g>
                )}

                {thrown && <text x={180} y={162} textAnchor="middle" fontSize={16} fontWeight={700} fill={arrived ? GREEN : INK}>{durationText(clock, 'eu')}</text>}
                {flag === null && !thrown && <Label x={180} y={44} textAnchor="middle" fontSize={13} fontWeight={700} fill={MUTED}>{l({ eu: 'Sakatu errepidean ↓', es: 'Toca la carretera ↓', en: 'Tap the road ↓', ar: 'المس الطريق ↓' })}</Label>}
            </svg>

            {!thrown && (
                <div className="road-controls">
                    <div className="road-nudge" dir="ltr">
                        <button type="button" onClick={() => nudge(-1)} aria-label={l({ eu: 'Km bat atzera', es: 'Un km menos', en: '1 km back', ar: 'كيلومتر أقل' })}>−</button>
                        <span className="road-flag-value" aria-live="polite">
                            {flag === null
                                ? l({ eu: 'Bandera gabe', es: 'Sin bandera', en: 'No flag', ar: 'بلا راية' })
                                : l({ eu: `Bandera: ${flag} km`, es: `Bandera: km ${flag}`, en: `Flag: ${flag} km`, ar: `الراية: ${flag} كم` })}
                        </span>
                        <button type="button" onClick={() => nudge(1)} aria-label={l({ eu: 'Km bat aurrera', es: 'Un km más', en: '1 km forward', ar: 'كيلومتر أكثر' })}>+</button>
                    </div>
                    <button type="button" className="fraction-v2-primary" disabled={flag === null} onClick={go}>
                        {l({ eu: 'Irteera!', es: '¡Salida!', en: 'Go!', ar: 'انطلاق!' })}
                    </button>
                </div>
            )}

            {arrived && lastThrow && (
                <>
                    <div className={`road-result ${lastThrow.result.grade}`} role="status">
                        <strong dir="ltr">+{lastThrow.result.points}</strong>
                        <div>
                            <p className="road-grade">{l(roadGradeTexts[lastThrow.result.grade])}</p>
                            <p>{l(roadAnswer(round))}</p>
                        </div>
                    </div>
                    <ol className="road-steps">
                        {roadSteps(round).map((item, position) => (
                            <li key={position}>
                                <span className="road-step-label">{l(item.label)}</span>
                                <MathText text={`$${localLatex(item.latex, language)}$`} />
                            </li>
                        ))}
                    </ol>
                    <button type="button" className="fraction-v2-primary road-next" onClick={next} ref={(node) => node?.focus({ preventScroll: true })}>
                        {index + 1 >= ROAD_ROUNDS ? l({ eu: 'Emaitza ikusi', es: 'Ver resultado', en: 'See the result', ar: 'اعرض النتيجة' }) : l({ eu: 'Hurrengoa', es: 'Siguiente', en: 'Next', ar: 'التالي' })}
                    </button>
                </>
            )}
        </div>
    )
}
