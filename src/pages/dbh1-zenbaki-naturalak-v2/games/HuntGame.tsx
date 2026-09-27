import { useEffect, useRef, useState } from 'react'
import { GameTopbar, LevelPicker, ResultPanel } from '../../../features/unit-v2/games/GameKit'
import { formatTime, nowMs, useGameText } from '../../../features/unit-v2/games/gameHooks'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import { createRandom, randomSeed, type Random } from '../../../features/unit-v2/games/random'
import { formatNatural } from '../format'
import { NaturalsGameArt } from './GameArt'
import { createHuntRound, HUNT_PENALTY_MS, HUNT_ROUNDS, huntParTime, huntStars, targetsLeft, type HuntRound } from './hunt'
import { naturalsGames } from './info'

type Phase = 'pick' | 'playing' | 'finished'

const game = naturalsGames.find((item) => item.id === 'hunt')!

export function HuntGame({ language, records, onResult, onExit }: GameProps) {
    const l = useGameText(language)
    const random = useRef<Random>(createRandom(randomSeed()))
    const startedAt = useRef(0)
    const [phase, setPhase] = useState<Phase>('pick')
    const [level, setLevel] = useState(0)
    const [roundIndex, setRoundIndex] = useState(0)
    const [round, setRound] = useState<HuntRound | null>(null)
    const [found, setFound] = useState<number[]>([])
    const [missed, setMissed] = useState<number | null>(null)
    const [mistakes, setMistakes] = useState(0)
    const [penalty, setPenalty] = useState(0)
    const [elapsed, setElapsed] = useState(0)

    const start = (nextLevel: number) => {
        random.current = createRandom(randomSeed())
        startedAt.current = nowMs()
        setLevel(nextLevel)
        setRoundIndex(0)
        setRound(createHuntRound(random.current, nextLevel))
        setFound([])
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

    const tap = (value: number) => {
        if (!round || found.includes(value)) return
        if (!round.rule.test(value)) {
            setMissed(value)
            setMistakes((count) => count + 1)
            setPenalty((total) => total + HUNT_PENALTY_MS)
            return
        }
        setMissed(null)
        const nextFound = [...found, value]
        if (targetsLeft(round, nextFound) > 0) {
            setFound(nextFound)
            return
        }
        if (roundIndex + 1 < HUNT_ROUNDS) {
            setRoundIndex(roundIndex + 1)
            setRound(createHuntRound(random.current, level))
            setFound([])
            return
        }
        const time = nowMs() - startedAt.current
        setElapsed(time)
        onResult(level, { stars: huntStars(level, time + penalty, mistakes), score: -mistakes, timeMs: time + penalty })
        setPhase('finished')
    }

    if (phase === 'pick') {
        return (
            <LevelPicker
                game={game}
                art={<NaturalsGameArt game="hunt" />}
                language={language}
                records={records}
                onStart={start}
                onExit={onExit}
                bestLabel={(record) => (record.timeMs === null ? '' : `${l({ eu: 'Marka', es: 'Récord', ar: 'الرقم' })}: ${formatTime(record.timeMs)}`)}
                howTo={(
                    <ul className="fraction-v2-game-rules">
                        <li>{l({ eu: `${HUNT_ROUNDS} txanda. Sakatu baldintza betetzen duten zenbaki guztiak; txanda amaitzen da denak aurkitzean.`, es: `${HUNT_ROUNDS} rondas. Pulsa todos los números que cumplen la condición; la ronda acaba cuando los encuentras todos.`, ar: `${HUNT_ROUNDS} جولات. اضغط كل الأعداد التي تحقق الشرط؛ تنتهي الجولة عندما تجدها كلها.` })}</li>
                        <li>{l({ eu: `Zenbaki oker bakoitzak +${HUNT_PENALTY_MS / 1000} s gehitzen ditu.`, es: `Cada número equivocado suma +${HUNT_PENALTY_MS / 1000} s.`, ar: `كل عدد خاطئ يضيف ${HUNT_PENALTY_MS / 1000} ث.` })}</li>
                        <li>{l({ eu: 'Kontuz tranpekin: zifra bera beste posizio batean, erditik gertu dauden zenbakiak…', es: 'Cuidado con las trampas: la misma cifra en otra posición, números justo al lado de la mitad…', ar: 'احذر الفخاخ: الرقم نفسه في مرتبة أخرى، أعداد قريبة جدًا من المنتصف…' })}</li>
                    </ul>
                )}
            />
        )
    }

    const par = huntParTime(level)
    const total = elapsed + penalty

    return (
        <div className="naturals-hunt" data-stage={game.levels[level].stage}>
            <GameTopbar game={game} language={language} onExit={onExit}>
                <span>{Math.min(roundIndex + 1, HUNT_ROUNDS)} / {HUNT_ROUNDS}</span>
                <span>{formatTime(total)}</span>
                <span>{l({ eu: 'Akatsak', es: 'Fallos', ar: 'الأخطاء' })}: {mistakes}</span>
            </GameTopbar>

            {phase === 'playing' && round && (
                <>
                    <p className="naturals-hunt-rule" aria-live="polite">
                        <strong>{l(round.rule.label)}</strong>
                        <span>{l({ eu: `${targetsLeft(round, found)} falta dira`, es: `Faltan ${targetsLeft(round, found)}`, ar: `بقي ${targetsLeft(round, found)}` })}</span>
                    </p>
                    <div className="naturals-hunt-grid" dir="ltr">
                        {round.numbers.map((value) => (
                            <button
                                type="button"
                                className={`${found.includes(value) ? 'found' : ''} ${missed === value ? 'missed' : ''}`}
                                disabled={found.includes(value)}
                                onClick={() => tap(value)}
                                key={`${roundIndex}-${value}`}
                            >
                                {formatNatural(value)}
                            </button>
                        ))}
                    </div>
                    <div aria-live="polite">
                        {missed !== null && (
                            <div className="fraction-v2-feedback error">
                                {l({ eu: `${formatNatural(missed)} ez: `, es: `${formatNatural(missed)} no: `, ar: `${formatNatural(missed)} لا: ` })}{l(round.rule.why(missed))} +{HUNT_PENALTY_MS / 1000} s
                            </div>
                        )}
                    </div>
                </>
            )}

            {phase === 'finished' && (
                <ResultPanel
                    language={language}
                    stars={huntStars(level, total, mistakes)}
                    title={l({ eu: 'Ehiza amaituta!', es: '¡Caza terminada!', ar: 'انتهى الصيد!' })}
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
