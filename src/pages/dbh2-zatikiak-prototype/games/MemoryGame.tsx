import { useEffect, useRef, useState } from 'react'
import { MathText } from '../../../components/MathText'
import { fraction, toNumber, toText } from '../math/fraction'
import { GameTopbar, LevelPicker, ResultPanel } from './GameKit'
import { formatTime, useGameText, nowMs } from './gameHooks'
import type { GameProps } from './index'
import { cardLatex, createMemoryBoard, evaluateFlip, memoryLevels, memoryStars, mismatchLatex, type MemoryCard } from './memory'
import { createRandom, randomSeed } from './random'
import { games } from './records'

type Phase = 'pick' | 'playing' | 'finished'

const game = games.find((item) => item.id === 'memory')!
const MISMATCH_MS = 1300

/** A unit bar (or two) with the value shaded */
function MiniBar({ card }: { card: MemoryCard }) {
    const value = fraction(card.value.numerator, card.value.denominator)
    const units = Math.max(1, Math.ceil(toNumber(value)))
    return (
        <span className="fraction-v2-mini-bars" aria-hidden="true">
            {Array.from({ length: units }, (_, unit) => (
                <span className="fraction-v2-mini-bar" key={unit}>
                    {Array.from({ length: value.denominator }, (_, part) => (
                        <span className={unit * value.denominator + part < value.numerator ? 'filled' : ''} key={part} />
                    ))}
                </span>
            ))}
        </span>
    )
}

/** A number line from 0 to the next whole number, marked in steps of 1/denominator */
function MiniLine({ card }: { card: MemoryCard }) {
    const value = fraction(card.value.numerator, card.value.denominator)
    const max = Math.max(1, Math.ceil(toNumber(value)))
    const steps = max * value.denominator
    const x = (share: number) => 8 + share * 104
    return (
        <svg className="fraction-v2-mini-line" viewBox="0 0 120 44" aria-hidden="true">
            <line x1="8" y1="22" x2="112" y2="22" stroke="var(--ink)" strokeWidth="1.8" />
            {Array.from({ length: steps + 1 }, (_, step) => {
                const major = step % value.denominator === 0
                return <line key={step} x1={x(step / steps)} x2={x(step / steps)} y1={major ? 14 : 18} y2={major ? 30 : 26} stroke="var(--ink)" strokeWidth={major ? 1.8 : 1.1} />
            })}
            {Array.from({ length: max + 1 }, (_, whole) => (
                <text key={whole} x={x(whole / max)} y="42" textAnchor="middle" fontSize="10" fill="var(--ink)">{whole}</text>
            ))}
            <circle cx={x(toNumber(value) / max)} cy="22" r="4.5" fill="var(--coral)" stroke="var(--ink)" strokeWidth="1.6" />
        </svg>
    )
}

function CardFace({ card, separator }: { card: MemoryCard; separator: ',' | '.' }) {
    if (card.kind === 'bar') return <MiniBar card={card} />
    if (card.kind === 'line') return <MiniLine card={card} />
    return <MathText text={`$${cardLatex(card, separator)}$`} />
}

export function MemoryGame({ language, records, onResult, onExit }: GameProps) {
    const l = useGameText(language)
    const separator = language === 'ar' ? '.' : ','
    const [phase, setPhase] = useState<Phase>('pick')
    const [level, setLevel] = useState(0)
    const [cards, setCards] = useState<MemoryCard[]>([])
    const [flipped, setFlipped] = useState<number[]>([])
    const [matched, setMatched] = useState<number[]>([])
    const [moves, setMoves] = useState(0)
    const [locked, setLocked] = useState(false)
    const [message, setMessage] = useState<{ tone: 'success' | 'error'; latex: string } | null>(null)
    const [elapsed, setElapsed] = useState(0)
    const startedAt = useRef(0)
    const { groups, groupSize } = memoryLevels[level] ?? memoryLevels[0]

    const start = (nextLevel: number) => {
        setLevel(nextLevel)
        setCards(createMemoryBoard(createRandom(randomSeed()), nextLevel))
        setFlipped([])
        setMatched([])
        setMoves(0)
        setLocked(false)
        setMessage(null)
        setElapsed(0)
        startedAt.current = 0
        setPhase('playing')
    }

    // The clock starts with the first card
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
        const result = evaluateFlip(cards, next, groupSize)
        setFlipped(next)
        if (result === 'continue') return
        const nextMoves = moves + 1
        setMoves(nextMoves)
        if (result === 'match') {
            const nextMatched = [...matched, card.setId]
            setMatched(nextMatched)
            setFlipped([])
            setMessage({ tone: 'success', latex: next.map((cardIndex) => cards[cardIndex].kind === 'bar' || cards[cardIndex].kind === 'line' ? toText(cards[cardIndex].value) : cardLatex(cards[cardIndex], separator)).join('=') })
            if (nextMatched.length === groups) {
                const time = nowMs() - startedAt.current
                setElapsed(time)
                onResult(level, { stars: memoryStars(level, nextMoves), score: -nextMoves, timeMs: time })
                window.setTimeout(() => setPhase('finished'), 600)
            }
            return
        }
        const [first] = next
        setMessage({ tone: 'error', latex: mismatchLatex(cards[first], cards[index], separator) })
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
                language={language}
                records={records}
                onStart={start}
                onExit={onExit}
                bestLabel={(record) => `${l({ eu: 'Marka', es: 'Récord', ar: 'الرقم' })}: ${-record.score} ${l({ eu: 'txanda', es: 'turnos', ar: 'أدوار' })}`}
                howTo={(
                    <ul className="fraction-v2-game-rules">
                        <li>{l({ eu: 'Buelta eman kartei eta aurkitu balio bera duten bikoteak (edo hirukoteak).', es: 'Da la vuelta a las cartas y encuentra las parejas (o tríos) con el mismo valor.', ar: 'اقلب البطاقات وجد الأزواج (أو الثلاثيات) ذات القيمة نفسها.' })}</li>
                        <li>{l({ eu: 'Kontuz tranpekin: 1/4 ez da 0,4.', es: 'Cuidado con las trampas: 1/4 no es 0,4.', ar: 'احذر الفخاخ: 1/4 ليس 0.4.' })}</li>
                        <li>{l({ eu: 'Zenbat eta txanda gutxiago, orduan eta izar gehiago.', es: 'Cuantos menos turnos, más estrellas.', ar: 'كلما قلت الأدوار زادت النجوم.' })}</li>
                    </ul>
                )}
            />
        )
    }

    return (
        <div className="fraction-v2-memory" data-stage={game.levels[level].stage}>
            <GameTopbar game={game} language={language} onExit={onExit}>
                <span><strong>{matched.length}</strong> / {groups}</span>
                <span>{moves} {l({ eu: 'txanda', es: 'turnos', ar: 'أدوار' })}</span>
                <span>{formatTime(elapsed)}</span>
            </GameTopbar>

            {phase === 'playing' && (
                <>
                    <div className={`fraction-v2-memory-board size-${cards.length}`}>
                        {cards.map((card, index) => {
                            const isMatched = matched.includes(card.setId)
                            const visible = isMatched || flipped.includes(index)
                            const spoken = card.kind === 'bar'
                                ? l({ eu: `barra: ${toText(card.value)}`, es: `barra: ${toText(card.value)}`, ar: `شريط: ${toText(card.value)}` })
                                : card.kind === 'line'
                                    ? l({ eu: `zuzeneko puntua: ${toText(card.value)}`, es: `punto en la recta: ${toText(card.value)}`, ar: `نقطة على الخط: ${toText(card.value)}` })
                                    : (cardLatex(card, separator) ?? '').replace(/\\tfrac\{(\d+)\}\{(\d+)\}/, ' $1/$2').replace(/\\frac\{(\d+)\}\{(\d+)\}/, '$1/$2').replace(/\{,\}/, ',').replace('\\%', '%')
                            return (
                                <button
                                    type="button"
                                    className={`fraction-v2-memory-card ${visible ? 'visible' : ''} ${isMatched ? 'matched' : ''} kind-${card.kind}`}
                                    aria-label={visible
                                        ? `${l({ eu: `${index + 1}. karta`, es: `Carta ${index + 1}`, ar: `البطاقة ${index + 1}` })}: ${spoken}`
                                        : l({ eu: `${index + 1}. karta, ezkutuan`, es: `Carta ${index + 1}, oculta`, ar: `البطاقة ${index + 1}، مخفية` })}
                                    aria-pressed={visible}
                                    onClick={() => select(index)}
                                    key={card.id}
                                >
                                    <span className="fraction-v2-memory-inner">
                                        <span className="fraction-v2-memory-back" aria-hidden="true" />
                                        <span className="fraction-v2-memory-front">{visible && <CardFace card={card} separator={separator} />}</span>
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
                            : <span>{groupSize === 3 ? l({ eu: 'Aukeratu balio bera duten hiru karta.', es: 'Elige tres cartas con el mismo valor.', ar: 'اختر ثلاث بطاقات لها القيمة نفسها.' }) : l({ eu: 'Aukeratu balio bera duten bi karta.', es: 'Elige dos cartas con el mismo valor.', ar: 'اختر بطاقتين لهما القيمة نفسها.' })}</span>}
                    </div>
                </>
            )}

            {phase === 'finished' && (
                <ResultPanel
                    language={language}
                    stars={memoryStars(level, moves)}
                    title={l({ eu: `${moves} txandatan osatuta`, es: `Completado en ${moves} turnos`, ar: `اكتملت في ${moves} أدوار` })}
                    subtitle={l({ eu: `3 izar: ${Math.ceil(groups * 1.6)} txanda edo gutxiago · 2 izar: ${Math.ceil(groups * 2.3)}`, es: `3 estrellas: ${Math.ceil(groups * 1.6)} turnos o menos · 2: ${Math.ceil(groups * 2.3)}`, ar: `3 نجوم: ${Math.ceil(groups * 1.6)} أدوار أو أقل · 2: ${Math.ceil(groups * 2.3)}` })}
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
