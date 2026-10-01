import { useEffect, useRef, useState } from 'react'
import { MathText } from '../../../components/MathText'
import { GameTopbar, LevelPicker, ResultPanel } from './GameKit'
import { formatTime, nowMs, useGameText } from './gameHooks'
import type { GameProps } from './GamesHub'
import { createRandom, randomSeed } from './random'
import { pairsMemoryStars, type PairsMemoryConfig, type PairCard } from './pairsMemory'

/* ==========================================================================
   Memory of pairs shared by the units: every card shows a formula in LaTeX
   and has exactly one partner (an expression and its result, a figure's
   data and its area…). A unit gives its game info, art and a board maker.
   ========================================================================== */

type Phase = 'pick' | 'playing' | 'finished'

const MISMATCH_MS = 1300

export function PairsMemoryGame({ language, records, onResult, onExit, config }: GameProps & { config: PairsMemoryConfig }) {
    const { game, art, pairs, createBoard } = config
    const stars = (moves: number) => pairsMemoryStars(pairs, moves)
    const l = useGameText(language)
    const [phase, setPhase] = useState<Phase>('pick')
    const [level, setLevel] = useState(0)
    const [cards, setCards] = useState<PairCard[]>([])
    const [flipped, setFlipped] = useState<number[]>([])
    const [matched, setMatched] = useState<number[]>([])
    const [moves, setMoves] = useState(0)
    const [locked, setLocked] = useState(false)
    const [message, setMessage] = useState<{ tone: 'success' | 'error'; latex: string } | null>(null)
    const [elapsed, setElapsed] = useState(0)
    const startedAt = useRef(0)

    const start = (nextLevel: number) => {
        setLevel(nextLevel)
        setCards(createBoard(createRandom(randomSeed()), nextLevel))
        setFlipped([])
        setMatched([])
        setMoves(0)
        setLocked(false)
        setMessage(null)
        setElapsed(0)
        startedAt.current = 0
        setPhase('playing')
    }

    useEffect(() => {
        if (phase !== 'playing' || startedAt.current === 0) return
        const timer = window.setInterval(() => setElapsed(nowMs() - startedAt.current), 250)
        return () => window.clearInterval(timer)
    }, [phase, moves, flipped.length])

    const select = (index: number) => {
        if (phase !== 'playing' || locked) return
        const card = cards[index]
        if (matched.includes(card.setId) || flipped.includes(index)) return
        if (startedAt.current === 0) startedAt.current = nowMs()
        const next = [...flipped, index]
        setFlipped(next)
        if (next.length < 2) return
        const nextMoves = moves + 1
        setMoves(nextMoves)
        const first = cards[next[0]]
        if (first.setId === card.setId) {
            const nextMatched = [...matched, card.setId]
            setMatched(nextMatched)
            setFlipped([])
            setMessage({ tone: 'success', latex: first.explain ?? card.explain ?? `${first.latex}=${card.latex}`.replace(/\\ \(x=(-?\d+)\)=/, '\\ (x=$1)\\ \\to\\ ') })
            if (nextMatched.length === pairs) {
                const time = nowMs() - startedAt.current
                setElapsed(time)
                onResult(level, { stars: stars(nextMoves), score: -nextMoves, timeMs: time })
                window.setTimeout(() => setPhase('finished'), 600)
            }
            return
        }
        setMessage({ tone: 'error', latex: `${first.shows}\\quad\\neq\\quad ${card.shows}` })
        setLocked(true)
        window.setTimeout(() => {
            setFlipped([])
            setLocked(false)
        }, MISMATCH_MS)
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
                bestLabel={(record) => `${l({ eu: 'Marka', es: 'Récord', ar: 'الرقم' })}: ${-record.score} ${l({ eu: 'txanda', es: 'turnos', ar: 'أدوار' })}`}
                howTo={(
                    <ul className="fraction-v2-game-rules">
                        <li>{l({ eu: 'Buelta eman kartei eta aurkitu balio bera duten bikoteak.', es: 'Da la vuelta a las cartas y encuentra las parejas que valen lo mismo.', ar: 'اقلب البطاقات وجد الأزواج ذات القيمة نفسها.' })}</li>
                        <li>{l({ eu: 'Zenbat eta txanda gutxiago, orduan eta izar gehiago.', es: 'Cuantos menos turnos, más estrellas.', ar: 'كلما قلت الأدوار زادت النجوم.' })}</li>
                    </ul>
                )}
            />
        )
    }

    return (
        <div className="fraction-v2-memory" data-stage={game.levels[level].stage}>
            <GameTopbar game={game} language={language} onExit={onExit}>
                <span><strong>{matched.length}</strong> / {pairs}</span>
                <span>{moves} {l({ eu: 'txanda', es: 'turnos', ar: 'أدوار' })}</span>
                <span>{formatTime(elapsed)}</span>
            </GameTopbar>

            {phase === 'playing' && (
                <>
                    <div className={`fraction-v2-memory-board size-${cards.length}`}>
                        {cards.map((card, index) => {
                            const isMatched = matched.includes(card.setId)
                            const visible = isMatched || flipped.includes(index)
                            return (
                                <button
                                    type="button"
                                    className={`fraction-v2-memory-card ${visible ? 'visible' : ''} ${isMatched ? 'matched' : ''}`}
                                    aria-label={visible ? `${l({ eu: `${index + 1}. karta`, es: `Carta ${index + 1}`, ar: `البطاقة ${index + 1}` })}: ${card.latex.replace(/\\cdot/g, '·').replace(/\^\{(\d+)\}/g, '^$1').replace(/\\ /g, ' ')}` : l({ eu: `${index + 1}. karta, ezkutuan`, es: `Carta ${index + 1}, oculta`, ar: `البطاقة ${index + 1}، مخفية` })}
                                    aria-pressed={visible}
                                    onClick={() => select(index)}
                                    key={card.id}
                                >
                                    <span className="fraction-v2-memory-inner">
                                        <span className="fraction-v2-memory-back" aria-hidden="true" />
                                        <span className="fraction-v2-memory-front">{visible && <MathText text={`$${card.latex}$`} />}</span>
                                    </span>
                                </button>
                            )
                        })}
                    </div>
                    <div className={`fraction-v2-memory-message ${message?.tone ?? ''}`} aria-live="polite">
                        {message
                            ? (
                                <>
                                    <span>{message.tone === 'success' ? l({ eu: 'Balio bera!', es: '¡Mismo valor!', ar: 'القيمة نفسها!' }) : l({ eu: 'Ez dute balio bera:', es: 'No valen lo mismo:', ar: 'ليست بالقيمة نفسها:' })}</span>
                                    <MathText text={`$${message.latex}$`} />
                                </>
                            )
                            : <span>{l({ eu: 'Aukeratu balio bera duten bi karta.', es: 'Elige dos cartas con el mismo valor.', ar: 'اختر بطاقتين لهما القيمة نفسها.' })}</span>}
                    </div>
                </>
            )}

            {phase === 'finished' && (
                <ResultPanel
                    language={language}
                    stars={stars(moves)}
                    title={l({ eu: `${moves} txandatan osatuta`, es: `Completado en ${moves} turnos`, ar: `اكتملت في ${moves} أدوار` })}
                    subtitle={l({ eu: `3 izar: ${Math.ceil(pairs * 1.6)} txanda edo gutxiago · 2 izar: ${Math.ceil(pairs * 2.3)}`, es: `3 estrellas: ${Math.ceil(pairs * 1.6)} turnos o menos · 2: ${Math.ceil(pairs * 2.3)}`, ar: `3 نجوم: ${Math.ceil(pairs * 1.6)} أدوار أو أقل · 2: ${Math.ceil(pairs * 2.3)}` })}
                    stats={[
                        { label: l({ eu: 'Txandak', es: 'Turnos', ar: 'الأدوار' }), value: String(moves) },
                        { label: l({ eu: 'Denbora', es: 'Tiempo', ar: 'الوقت' }), value: formatTime(elapsed) }
                    ]}
                    onReplay={() => start(level)}
                    onNext={level < game.levels.length - 1 ? () => start(level + 1) : undefined}
                    onLevels={() => setPhase('pick')}
                />
            )}
        </div>
    )
}
