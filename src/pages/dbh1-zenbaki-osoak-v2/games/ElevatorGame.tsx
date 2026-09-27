import { useEffect, useRef, useState } from 'react'
import { MathText } from '../../../components/MathText'
import { GameTopbar, LevelPicker, ResultPanel } from '../../../features/unit-v2/games/GameKit'
import { formatTime, nowMs, useGameText } from '../../../features/unit-v2/games/gameHooks'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import { createRandom, randomSeed, type Random } from '../../../features/unit-v2/games/random'
import type { LocalizedText } from '../../../features/unit-v2/types'
import { signed } from '../../dbh2-zenbaki-osoak/format'
import { ElevatorArt } from './ElevatorArt'
import { createElevatorRound, ELEVATOR_PENALTY_MS, ELEVATOR_ROUNDS, elevatorFinal, elevatorLevels, elevatorParTime, elevatorStars, type ElevatorRound } from './elevator'
import { introGames } from './info'

type Phase = 'pick' | 'playing' | 'finished'

const game = introGames.find((item) => item.id === 'elevator')!

const floorName = (floor: number): LocalizedText => (floor === 0
    ? { eu: 'beheko solairua', es: 'la planta baja', ar: 'الطابق الأرضي' }
    : floor > 0
        ? { eu: `${floor}. solairua`, es: `la planta ${floor}`, ar: `الطابق ${floor}` }
        : { eu: `${-floor}. sotoa`, es: `el sótano ${-floor}`, ar: `القبو ${-floor}` })

const moveText = (move: number): LocalizedText => (move > 0
    ? { eu: `${move} igo`, es: `sube ${move}`, ar: `يصعد ${move}` }
    : { eu: `${-move} jaitsi`, es: `baja ${-move}`, ar: `ينزل ${-move}` })

/** The trip as a sum of integers: −2 + (+5) + (−4) */
const tripLatex = (round: ElevatorRound) => [signed(round.start).replace('−', '-'), ...round.moves.map((move) => `(${signed(move).replace('−', '-')})`)].join('+')

export function ElevatorGame({ language, records, onResult, onExit }: GameProps) {
    const l = useGameText(language)
    const random = useRef<Random>(createRandom(randomSeed()))
    const startedAt = useRef(0)
    const [phase, setPhase] = useState<Phase>('pick')
    const [level, setLevel] = useState(0)
    const [index, setIndex] = useState(0)
    const [round, setRound] = useState<ElevatorRound | null>(null)
    const [missed, setMissed] = useState<number | null>(null)
    const [mistakes, setMistakes] = useState(0)
    const [penalty, setPenalty] = useState(0)
    const [elapsed, setElapsed] = useState(0)
    const { lowest, highest } = elevatorLevels[level]

    const start = (nextLevel: number) => {
        random.current = createRandom(randomSeed())
        startedAt.current = nowMs()
        setLevel(nextLevel)
        setIndex(0)
        setRound(createElevatorRound(random.current, nextLevel))
        setMissed(null)
        setMistakes(0)
        setPenalty(0)
        setElapsed(0)
        setPhase('playing')
    }

    useEffect(() => {
        if (phase !== 'playing') return
        const timer = window.setInterval(() => setElapsed(nowMs() - startedAt.current), 200)
        return () => window.clearInterval(timer)
    }, [phase])

    const tap = (floor: number) => {
        if (!round) return
        if (floor !== elevatorFinal(round)) {
            setMissed(floor)
            setMistakes((count) => count + 1)
            setPenalty((total) => total + ELEVATOR_PENALTY_MS)
            return
        }
        setMissed(null)
        if (index + 1 < ELEVATOR_ROUNDS) {
            setIndex(index + 1)
            setRound(createElevatorRound(random.current, level))
            return
        }
        const time = nowMs() - startedAt.current
        setElapsed(time)
        onResult(level, { stars: elevatorStars(level, time + penalty, mistakes), score: -mistakes, timeMs: time + penalty })
        setPhase('finished')
    }

    if (phase === 'pick') {
        return (
            <LevelPicker
                game={game}
                art={<ElevatorArt />}
                language={language}
                records={records}
                onStart={start}
                onExit={onExit}
                bestLabel={(record) => (record.timeMs === null ? '' : `${l({ eu: 'Marka', es: 'Récord', ar: 'الرقم' })}: ${formatTime(record.timeMs)}`)}
                howTo={(
                    <ul className="fraction-v2-game-rules">
                        <li>{l({ eu: `${ELEVATOR_ROUNDS} bidaia. Irakurri non hasten den igogailua eta nola mugitzen den, eta sakatu gelditzen den solairua.`, es: `${ELEVATOR_ROUNDS} viajes. Lee dónde empieza el ascensor y cómo se mueve, y pulsa la planta donde se para.`, ar: `${ELEVATOR_ROUNDS} رحلات. اقرأ أين يبدأ المصعد وكيف يتحرك، واضغط الطابق الذي يتوقف فيه.` })}</li>
                        <li>{l({ eu: 'Sotoak negatiboak dira; beheko solairua, 0.', es: 'Los sótanos son negativos; la planta baja, 0.', ar: 'الأقبية سالبة؛ والطابق الأرضي 0.' })}</li>
                        <li>{l({ eu: `Solairu oker bakoitzak +${ELEVATOR_PENALTY_MS / 1000} s gehitzen ditu.`, es: `Cada planta equivocada suma +${ELEVATOR_PENALTY_MS / 1000} s.`, ar: `كل طابق خاطئ يضيف ${ELEVATOR_PENALTY_MS / 1000} ث.` })}</li>
                    </ul>
                )}
            />
        )
    }

    const par = elevatorParTime(level)
    const total = elapsed + penalty
    const floors = Array.from({ length: highest - lowest + 1 }, (_, offset) => highest - offset)

    return (
        <div className="integers-elevator" data-stage={game.levels[level].stage}>
            <GameTopbar game={game} language={language} onExit={onExit}>
                <span>{Math.min(index + 1, ELEVATOR_ROUNDS)} / {ELEVATOR_ROUNDS}</span>
                <span>{formatTime(total)}</span>
                <span>{l({ eu: 'Akatsak', es: 'Fallos', ar: 'الأخطاء' })}: {mistakes}</span>
            </GameTopbar>

            {phase === 'playing' && round && (
                <div className="integers-elevator-board">
                    <div className="integers-elevator-story" aria-live="polite">
                        <p>
                            {l({ eu: 'Igogailua hemen dago: ', es: 'El ascensor está en ', ar: 'المصعد في ' })}
                            <strong>{l(floorName(round.start))}</strong>
                        </p>
                        <ol>
                            {round.moves.map((move, moveIndex) => (
                                <li className={move > 0 ? 'up' : 'down'} key={moveIndex}>{move > 0 ? '▲' : '▼'} {l(moveText(move))}</li>
                            ))}
                        </ol>
                        <p className="integers-elevator-question">{l({ eu: 'Zein solairutan gelditzen da?', es: '¿En qué planta se para?', ar: 'في أي طابق يتوقف؟' })}</p>
                        {missed !== null && (
                            <div className="fraction-v2-feedback error">
                                {l({ eu: `${signed(missed)} ez. `, es: `${signed(missed)} no. `, ar: `${signed(missed)} لا. ` })}
                                <MathText text={`$${tripLatex(round)}=${signed(elevatorFinal(round)).replace('−', '-')}$`} />
                                {l({ eu: ` +${ELEVATOR_PENALTY_MS / 1000} s`, es: ` +${ELEVATOR_PENALTY_MS / 1000} s`, ar: ` +${ELEVATOR_PENALTY_MS / 1000} ث` })}
                            </div>
                        )}
                    </div>
                    <div className="integers-elevator-panel" dir="ltr" role="group" aria-label={l({ eu: 'Igogailuaren botoiak', es: 'Botones del ascensor', ar: 'أزرار المصعد' })}>
                        {floors.map((floor) => (
                            <button
                                type="button"
                                className={`${floor < 0 ? 'basement' : floor === 0 ? 'ground' : ''} ${floor === round.start ? 'start' : ''} ${missed === floor ? 'missed' : ''}`}
                                onClick={() => tap(floor)}
                                aria-label={l(floorName(floor))}
                                key={floor}
                            >
                                {signed(floor)}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {phase === 'finished' && (
                <ResultPanel
                    language={language}
                    stars={elevatorStars(level, total, mistakes)}
                    title={l({ eu: 'Bidaiak amaituta!', es: '¡Viajes terminados!', ar: 'انتهت الرحلات!' })}
                    subtitle={l({ eu: `3 izar: ${formatTime(par * 0.8)} baino gutxiago eta akats bat gehienez · 2 izar: ${formatTime(par)} baino gutxiago`, es: `3 estrellas: menos de ${formatTime(par * 0.8)} y como mucho un fallo · 2: menos de ${formatTime(par)}`, ar: `3 نجوم: أقل من ${formatTime(par * 0.8)} وخطأ واحد على الأكثر · 2: أقل من ${formatTime(par)}` })}
                    stats={[
                        { label: l({ eu: 'Denbora', es: 'Tiempo', ar: 'الوقت' }), value: formatTime(total) },
                        { label: l({ eu: 'Akatsak', es: 'Fallos', ar: 'الأخطاء' }), value: String(mistakes) }
                    ]}
                    onReplay={() => start(level)}
                    onNext={level < game.levels.length - 1 ? () => start(level + 1) : undefined}
                    onLevels={() => setPhase('pick')}
                />
            )}
        </div>
    )
}
