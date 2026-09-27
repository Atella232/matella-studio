import { useEffect, useRef, useState } from 'react'
import { MathText } from '../../../components/MathText'
import { GameTopbar, LevelPicker, ResultPanel } from '../../../features/unit-v2/games/GameKit'
import { formatTime, nowMs, useGameText } from '../../../features/unit-v2/games/gameHooks'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import { createRandom, randomSeed } from '../../../features/unit-v2/games/random'
import { IntegerGameArt } from './GameArt'
import { integerGames } from './info'
import { signedLatex } from './race'
import { createIntegerMemoryBoard, evaluateIntegerFlip, integerCardLatex, integerMemoryLevels, integerMemoryStars, type IntegerCard } from './memory'

type Phase = 'pick' | 'playing' | 'finished'

const game = integerGames.find((item) => item.id === 'memory')!
const MISMATCH_MS = 1300

/** What a screen reader says for a card: the LaTeX made readable */
function spokenCard(latex: string): string {
    return latex
        .replace(/\\lvert\s?/g, '|')
        .replace(/\\rvert/g, '|')
        .replace(/\\mathrm\{(\w+)\}/g, '$1')
        .replace(/\\cdot/g, '·')
        .replace(/\\mathbin\{:\}/g, ':')
        .replace(/-/g, '−')
}

export function IntegerMemoryGame({ language, records, onResult, onExit }: GameProps) {
    const l = useGameText(language)
    const [phase, setPhase] = useState<Phase>('pick')
    const [level, setLevel] = useState(0)
    const [cards, setCards] = useState<IntegerCard[]>([])
    const [flipped, setFlipped] = useState<number[]>([])
    const [matched, setMatched] = useState<number[]>([])
    const [moves, setMoves] = useState(0)
    const [locked, setLocked] = useState(false)
    const [message, setMessage] = useState<{ tone: 'success' | 'error'; latex: string } | null>(null)
    const [elapsed, setElapsed] = useState(0)
    const startedAt = useRef(0)
    const { groups, groupSize } = integerMemoryLevels[level]

    const start = (nextLevel: number) => {
        setLevel(nextLevel)
        setCards(createIntegerMemoryBoard(createRandom(randomSeed()), nextLevel))
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
        const result = evaluateIntegerFlip(cards, next, groupSize)
        setFlipped(next)
        if (result === 'continue') return
        const nextMoves = moves + 1
        setMoves(nextMoves)
        if (result === 'match') {
            const nextMatched = [...matched, card.setId]
            setMatched(nextMatched)
            setFlipped([])
            setMessage({ tone: 'success', latex: next.map((cardIndex) => integerCardLatex(cards[cardIndex], language)).join('=') })
            if (nextMatched.length === groups) {
                const time = nowMs() - startedAt.current
                setElapsed(time)
                onResult(level, { stars: integerMemoryStars(level, nextMoves), score: -nextMoves, timeMs: time })
                window.setTimeout(() => setPhase('finished'), 600)
            }
            return
        }
        const [first] = next
        // Operations show their value; plain numbers are shown once
        const reading = (item: IntegerCard) => (item.kind === 'value' ? signedLatex(item.value) : `${integerCardLatex(item, language)}=${signedLatex(item.value)}`)
        setMessage({ tone: 'error', latex: `${reading(cards[first])}\\quad\\neq\\quad ${reading(card)}` })
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
                art={<IntegerGameArt game="memory" />}
                language={language}
                records={records}
                onStart={start}
                onExit={onExit}
                bestLabel={(record) => `${l({ eu: 'Marka', es: 'Récord', ar: 'الرقم' })}: ${-record.score} ${l({ eu: 'txanda', es: 'turnos', ar: 'أدوار' })}`}
                howTo={(
                    <ul className="fraction-v2-game-rules">
                        <li>{l({ eu: 'Buelta eman kartei eta aurkitu balio bera duten bikoteak (edo hirukoteak).', es: 'Da la vuelta a las cartas y encuentra las parejas (o tríos) con el mismo valor.', ar: 'اقلب البطاقات وجد الأزواج (أو الثلاثيات) ذات القيمة نفسها.' })}</li>
                        <li>{l({ eu: 'Kontuz tranpekin: +4 eta −4 biak daude taulan.', es: 'Cuidado con las trampas: +4 y −4 están los dos en el tablero.', ar: 'احذر الفخاخ: ⁦+4⁩ و⁦−4⁩ كلاهما على اللوحة.' })}</li>
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
                            const latex = integerCardLatex(card, language)
                            return (
                                <button
                                    type="button"
                                    className={`fraction-v2-memory-card ${visible ? 'visible' : ''} ${isMatched ? 'matched' : ''}`}
                                    aria-label={visible
                                        ? `${l({ eu: `${index + 1}. karta`, es: `Carta ${index + 1}`, ar: `البطاقة ${index + 1}` })}: ${spokenCard(latex)}`
                                        : l({ eu: `${index + 1}. karta, ezkutuan`, es: `Carta ${index + 1}, oculta`, ar: `البطاقة ${index + 1}، مخفية` })}
                                    aria-pressed={visible}
                                    onClick={() => select(index)}
                                    key={card.id}
                                >
                                    <span className="fraction-v2-memory-inner">
                                        <span className="fraction-v2-memory-back" aria-hidden="true" />
                                        <span className="fraction-v2-memory-front">{visible && <MathText text={`$${latex}$`} />}</span>
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
                    stars={integerMemoryStars(level, moves)}
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
