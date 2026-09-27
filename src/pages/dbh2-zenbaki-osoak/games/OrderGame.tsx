import { useEffect, useRef, useState, type ReactNode } from 'react'
import { MathText } from '../../../components/MathText'
import { GameTopbar, LevelPicker, ResultPanel } from '../../../features/unit-v2/games/GameKit'
import { formatTime, nowMs, useGameText } from '../../../features/unit-v2/games/gameHooks'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import { createRandom, randomSeed, type Random } from '../../../features/unit-v2/games/random'
import { signed } from '../format'
import { IntegerGameArt } from './GameArt'
import { integerGames } from './info'
import { integerCardLatex } from './memory'
import { signedLatex } from './race'
import type { GameInfo } from '../../../features/unit-v2/games/records'
import { createOrderRound, nextExpected, ORDER_PENALTY_MS, ORDER_ROUNDS, orderLevels, orderParTime, orderStars, type OrderCard, type OrderLevel, type OrderRound } from './order'

type Phase = 'pick' | 'playing' | 'finished'

const defaultGame = integerGames.find((item) => item.id === 'order')!

/** Another unit can reuse the game with its own level list and illustration */
export interface OrderConfig {
    game: GameInfo
    levels: OrderLevel[]
    art: ReactNode
}

export function OrderGame({ language, records, onResult, onExit , config }: GameProps & { config?: OrderConfig }) {
    const game = config?.game ?? defaultGame
    const levels = config?.levels ?? orderLevels
    const l = useGameText(language)
    const random = useRef<Random>(createRandom(randomSeed()))
    const startedAt = useRef(0)
    const [phase, setPhase] = useState<Phase>('pick')
    const [level, setLevel] = useState(0)
    const [roundIndex, setRoundIndex] = useState(0)
    const [round, setRound] = useState<OrderRound | null>(null)
    const [tapped, setTapped] = useState<string[]>([])
    const [mistakes, setMistakes] = useState(0)
    const [penalty, setPenalty] = useState(0)
    const [elapsed, setElapsed] = useState(0)
    const [shake, setShake] = useState<{ id: string; count: number } | null>(null)
    const [hint, setHint] = useState<{ tapped: OrderCard; expected: number } | null>(null)

    const start = (nextLevel: number) => {
        random.current = createRandom(randomSeed())
        startedAt.current = nowMs()
        setLevel(nextLevel)
        setRoundIndex(0)
        setRound(createOrderRound(random.current, nextLevel, 0, levels))
        setTapped([])
        setMistakes(0)
        setPenalty(0)
        setElapsed(0)
        setHint(null)
        setPhase('playing')
    }

    useEffect(() => {
        if (phase !== 'playing') return
        const timer = window.setInterval(() => setElapsed(nowMs() - startedAt.current), 200)
        return () => window.clearInterval(timer)
    }, [phase])

    const tap = (card: OrderCard) => {
        if (!round || tapped.includes(card.id)) return
        const expected = nextExpected(round, tapped)
        if (card.value !== expected) {
            setMistakes((count) => count + 1)
            setPenalty((total) => total + ORDER_PENALTY_MS)
            setShake((current) => ({ id: card.id, count: (current?.count ?? 0) + 1 }))
            setHint({ tapped: card, expected: expected ?? card.value })
            return
        }
        setHint(null)
        const nextTapped = [...tapped, card.id]
        if (nextTapped.length < round.cards.length) {
            setTapped(nextTapped)
            return
        }
        if (roundIndex + 1 < ORDER_ROUNDS) {
            setRoundIndex(roundIndex + 1)
            setRound(createOrderRound(random.current, level, roundIndex + 1, levels))
            setTapped([])
            return
        }
        const total = nowMs() - startedAt.current + penalty
        setElapsed(nowMs() - startedAt.current)
        onResult(level, { stars: orderStars(level, total, mistakes, levels), score: -mistakes, timeMs: total })
        setPhase('finished')
    }

    if (phase === 'pick') {
        return (
            <LevelPicker
                game={game}
                art={config?.art ?? <IntegerGameArt game="order" />}
                language={language}
                records={records}
                onStart={start}
                onExit={onExit}
                bestLabel={(record) => (record.timeMs === null ? '' : `${l({ eu: 'Marka', es: 'Récord', ar: 'الرقم' })}: ${formatTime(record.timeMs)}`)}
                howTo={(
                    <ul className="fraction-v2-game-rules">
                        <li>{l({ eu: `${ORDER_ROUNDS} txanda. Sakatu kartak ordenan: txikienetik handienera, edo gezia beste aldera begira badago, handienetik txikienera.`, es: `${ORDER_ROUNDS} rondas. Pulsa las cartas en orden: de menor a mayor o, si la flecha mira al otro lado, de mayor a menor.`, ar: `${ORDER_ROUNDS} جولات. اضغط البطاقات بالترتيب: من الأصغر إلى الأكبر، أو من الأكبر إلى الأصغر إذا اتجه السهم إلى الجهة الأخرى.` })}</li>
                        <li>{l({ eu: `Karta okerrak +${ORDER_PENALTY_MS / 1000} s gehitzen ditu.`, es: `Cada carta equivocada suma +${ORDER_PENALTY_MS / 1000} s.`, ar: `كل بطاقة خاطئة تضيف ${ORDER_PENALTY_MS / 1000} ث.` })}</li>
                        <li>{l({ eu: 'Gogoratu: −9 < −2, zerotik urrunago dagoelako.', es: 'Recuerda: −9 < −2, porque está más lejos del cero.', ar: 'تذكّر: ⁦−9 < −2⁩ لأنه أبعد عن الصفر.' })}</li>
                    </ul>
                )}
            />
        )
    }

    const levelInfo = game.levels[level]
    const par = orderParTime(level, levels)

    /** Why the tapped card was not the next one; operations show their value */
    const hintText = (card: OrderCard, expected: number) => {
        const shown = card.kind === 'value' ? '' : `$${integerCardLatex({ ...card, setId: 0 }, language)}=${signedLatex(card.value)}$. `
        const penaltyText = `+${ORDER_PENALTY_MS / 1000} s`
        return {
            eu: `Oraindik ez. ${shown}Lehenik $${signedLatex(expected)}$ doa. ${penaltyText}`,
            es: `Todavía no. ${shown}Antes va el $${signedLatex(expected)}$. ${penaltyText}`,
            ar: `ليس بعد. ${shown}قبله يأتي $${signedLatex(expected)}$. ‏${penaltyText.replace('s', 'ث')}`
        }
    }

    return (
        <div className="integers-order-game" data-stage={levelInfo.stage}>
            <GameTopbar game={game} language={language} onExit={onExit}>
                <span>{Math.min(roundIndex + 1, ORDER_ROUNDS)} / {ORDER_ROUNDS}</span>
                <span>{formatTime(elapsed + penalty)}</span>
                <span>{l({ eu: 'Akatsak', es: 'Fallos', ar: 'الأخطاء' })}: {mistakes}</span>
            </GameTopbar>

            {phase === 'playing' && round && (
                <>
                    <p className="integers-order-direction" aria-live="polite">
                        <span aria-hidden="true" dir="ltr">{round.descending ? '← ' : ''}</span>
                        {round.descending
                            ? l({ eu: 'Handienetik txikienera', es: 'De mayor a menor', ar: 'من الأكبر إلى الأصغر' })
                            : l({ eu: 'Txikienetik handienera', es: 'De menor a mayor', ar: 'من الأصغر إلى الأكبر' })}
                        <span aria-hidden="true" dir="ltr">{round.descending ? '' : ' →'}</span>
                    </p>
                    <div className="integers-order-row" dir="ltr" aria-label={l({ eu: 'Ordenatutakoak', es: 'Ya ordenadas', ar: 'المرتبة' })}>
                        {tapped.map((id) => {
                            const card = round.cards.find((item) => item.id === id)!
                            return <span className="integers-order-slot" key={id}>{signed(card.value)}</span>
                        })}
                        {Array.from({ length: round.cards.length - tapped.length }, (_, index) => <span className="integers-order-slot empty" key={`empty-${index}`} />)}
                    </div>
                    <div className="integers-order-cards" dir="ltr">
                        {round.cards.map((card) => {
                            const done = tapped.includes(card.id)
                            const latex = integerCardLatex({ ...card, setId: 0 }, language)
                            return (
                                <button
                                    type="button"
                                    className={`integers-order-card ${done ? 'done' : ''} ${shake?.id === card.id ? 'shake' : ''}`}
                                    disabled={done}
                                    onClick={() => tap(card)}
                                    key={`${card.id}-${shake?.id === card.id ? shake.count : 0}`}
                                >
                                    <MathText text={`$${latex}$`} />
                                </button>
                            )
                        })}
                    </div>
                    <div aria-live="polite">
                        {hint && (
                            <div className="fraction-v2-feedback error">
                                <MathText text={l(hintText(hint.tapped, hint.expected))} />
                            </div>
                        )}
                    </div>
                </>
            )}

            {phase === 'finished' && (
                <ResultPanel
                    language={language}
                    stars={orderStars(level, elapsed + penalty, mistakes, levels)}
                    title={l({ eu: 'Ilarak osatuta!', es: '¡Filas completas!', ar: 'اكتملت الصفوف!' })}
                    subtitle={l({ eu: `3 izar: ${formatTime(par * 0.8)} baino gutxiago eta akats bat gehienez · 2 izar: ${formatTime(par)} baino gutxiago`, es: `3 estrellas: menos de ${formatTime(par * 0.8)} y como mucho un fallo · 2: menos de ${formatTime(par)}`, ar: `3 نجوم: أقل من ${formatTime(par * 0.8)} وخطأ واحد على الأكثر · 2: أقل من ${formatTime(par)}` })}
                    stats={[
                        { label: l({ eu: 'Denbora', es: 'Tiempo', ar: 'الوقت' }), value: formatTime(elapsed + penalty) },
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
