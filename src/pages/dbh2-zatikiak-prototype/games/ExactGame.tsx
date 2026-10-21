import { useState } from 'react'
import { MathText } from '../../../components/MathText'
import { equals, toLatex, type FractionValue } from '../math/fraction'
import {
    createExactRounds,
    EXACT_ROUNDS,
    exactLevels,
    exactRoundPoints,
    exactStars,
    operateExact,
    solveExact,
    type ExactCard,
    type ExactOp,
    type ExactRound,
    type ExactStep
} from './exact'
import { GameTopbar, LevelPicker, ResultPanel } from './GameKit'
import { nowMs, useGameText } from './gameHooks'
import type { GameProps } from './index'
import { createRandom, randomSeed } from './random'
import { games } from './records'
import './Exact.css'

const game = games.find((item) => item.id === 'exact')!

const opSymbols: Record<ExactOp, string> = { '+': '+', '-': '−', '·': '·', ':': '÷' }
const opLatex: Record<ExactOp, string> = { '+': '+', '-': '-', '·': '\\cdot ', ':': '\\div ' }

/** A negative card or operand is bracketed after an operator */
const operandLatex = (value: FractionValue) => value.numerator < 0 ? `\\left(${toLatex(value)}\\right)` : toLatex(value)
const stepLatex = (step: ExactStep) => `${toLatex(step.left)}${opLatex[step.op]}${operandLatex(step.right)}=${toLatex(step.result)}`

interface RoundPlay {
    cards: ExactCard[]
    /** Cards before each step, so a step can be undone */
    history: Array<{ cards: ExactCard[]; step: ExactStep }>
    selected: number | null
    op: ExactOp | null
    /** The next step suggested by a hint, or 'stuck' when the current cards cannot reach the target */
    hint: ExactStep | 'stuck' | null
    hinted: boolean
    outcome: 'playing' | 'solved' | 'skipped'
    /** The card made by the last step, drawn with a short pop */
    fresh: number | null
}

const freshPlay = (round: ExactRound): RoundPlay => ({ cards: round.cards, history: [], selected: null, op: null, hint: null, hinted: false, outcome: 'playing', fresh: null })

export function ExactGame({ language, records, onResult, onExit }: GameProps) {
    const l = useGameText(language)
    const [phase, setPhase] = useState<'pick' | 'playing' | 'finished'>('pick')
    const [level, setLevel] = useState(0)
    const [rounds, setRounds] = useState<ExactRound[]>([])
    const [index, setIndex] = useState(0)
    const [play, setPlay] = useState<RoundPlay | null>(null)
    const [points, setPoints] = useState<number[]>([])
    const [startedAt, setStartedAt] = useState(0)
    const [warning, setWarning] = useState(false)

    const levelInfo = exactLevels[level]
    const round = rounds[index]
    const score = points.reduce((total, value) => total + value, 0)

    const start = (nextLevel: number) => {
        const nextRounds = createExactRounds(createRandom(randomSeed()), nextLevel)
        setLevel(nextLevel)
        setRounds(nextRounds)
        setIndex(0)
        setPlay(freshPlay(nextRounds[0]))
        setPoints([])
        setStartedAt(nowMs())
        setWarning(false)
        setPhase('playing')
    }

    const update = (change: (current: RoundPlay) => RoundPlay) => setPlay((current) => (current ? change(current) : current))

    /** Puts the result card where the first one was; the round is solved when it is the target */
    const combine = (current: RoundPlay, firstId: number, op: ExactOp, secondId: number) => {
        const first = current.cards.find((card) => card.id === firstId)!
        const second = current.cards.find((card) => card.id === secondId)!
        const result = operateExact(op, first.value, second.value)
        if (!result) {
            setWarning(true)
            setPlay({ ...current, op: null })
            return
        }
        const id = Math.max(...current.cards.map((card) => card.id), ...current.history.flatMap((item) => item.cards.map((card) => card.id))) + 1
        const cards = current.cards.flatMap((card) => card.id === firstId ? [{ id, value: result }] : card.id === secondId ? [] : [card])
        const solved = equals(result, round.target)
        if (solved) setPoints((list) => [...list, exactRoundPoints(true, current.hinted)])
        setPlay({
            ...current,
            cards,
            history: [...current.history, { cards: current.cards, step: { left: first.value, op, right: second.value, result } }],
            selected: solved ? null : id,
            op: null,
            hint: null,
            outcome: solved ? 'solved' : 'playing',
            fresh: id
        })
    }

    const tapCard = (id: number) => {
        if (!play || play.outcome !== 'playing') return
        setWarning(false)
        if (play.selected === id) setPlay({ ...play, selected: null, op: null })
        else if (play.selected !== null && play.op !== null) combine(play, play.selected, play.op, id)
        else setPlay({ ...play, selected: id, op: null })
    }

    const tapOp = (op: ExactOp) => update((current) => (current.outcome === 'playing' && current.selected !== null ? { ...current, op: current.op === op ? null : op } : current))

    const undo = () => update((current) => {
        const last = current.history[current.history.length - 1]
        if (!last || current.outcome !== 'playing') return current
        return { ...current, cards: last.cards, history: current.history.slice(0, -1), selected: null, op: null, hint: null, fresh: null }
    })

    const hint = () => update((current) => {
        const found = solveExact(current.cards.map((card) => card.value), round.target, levelInfo.ops)
        if (!found || found.length === 0) return { ...current, hint: 'stuck' }
        return { ...current, hint: found[0], hinted: true, selected: null, op: null }
    })

    const giveUp = () => {
        setPoints((list) => [...list, 0])
        update((current) => ({ ...current, outcome: 'skipped', selected: null, op: null, hint: null }))
    }

    const next = () => {
        if (index + 1 >= EXACT_ROUNDS) {
            onResult(level, { stars: exactStars(score), score, timeMs: nowMs() - startedAt })
            setPhase('finished')
            return
        }
        setIndex(index + 1)
        setPlay(freshPlay(rounds[index + 1]))
        setWarning(false)
    }

    if (phase === 'pick') {
        return (
            <LevelPicker
                game={game}
                language={language}
                records={records}
                onStart={start}
                onExit={onExit}
                bestLabel={(record) => `${l({ eu: 'Marka', es: 'Récord', ar: 'الرقم' })}: ${record.score}`}
                howTo={(
                    <ul className="fraction-v2-game-rules">
                        <li>{l({ eu: 'Sakatu karta bat, eragiketa bat eta beste karta bat: biak emaitzaren karta bihurtzen dira.', es: 'Toca una carta, una operación y otra carta: las dos se convierten en la carta del resultado.', ar: 'اضغط بطاقة ثم عملية ثم بطاقة أخرى: تتحوّل البطاقتان إلى بطاقة النتيجة.' })}</li>
                        <li>{l({ eu: 'Iritsi zehazki helburura. Ez dituzu karta guztiak erabili behar.', es: 'Llega exactamente al objetivo. No hace falta usar todas las cartas.', ar: 'صل إلى الهدف تمامًا. لا يلزم استعمال كل البطاقات.' })}</li>
                        <li>{l({ eu: `${EXACT_ROUNDS} txanda: 100 puntu bakoitzeko, 50 pista erabiliz gero.`, es: `${EXACT_ROUNDS} rondas: 100 puntos cada una, 50 si usas una pista.`, ar: `${EXACT_ROUNDS} جولات: 100 نقطة لكل جولة، و50 إذا استعملت تلميحًا.` })}</li>
                    </ul>
                )}
            />
        )
    }

    if (phase === 'finished') {
        const solved = points.filter((value) => value > 0).length
        return (
            <div className="exact-game" data-stage={game.levels[level].stage}>
                <GameTopbar game={game} language={language} onExit={onExit} />
                <ResultPanel
                    language={language}
                    stars={exactStars(score)}
                    title={`${score} ${l({ eu: 'puntu', es: 'puntos', ar: 'نقطة' })}`}
                    subtitle={l({ eu: '3 izar: 450 puntu · 2 izar: 300 · izar 1: 150', es: '3 estrellas: 450 puntos · 2: 300 · 1: 150', ar: '3 نجوم: 450 نقطة · 2: 300 · 1: 150' })}
                    stats={[
                        { label: l({ eu: 'Lortuak', es: 'Resueltas', ar: 'محلولة' }), value: `${solved} / ${EXACT_ROUNDS}` },
                        { label: l({ eu: 'Pistarik gabe', es: 'Sin pista', ar: 'بلا تلميح' }), value: String(points.filter((value) => value === 100).length) }
                    ]}
                    onReplay={() => start(level)}
                    onNext={level < game.levels.length - 1 ? () => start(level + 1) : undefined}
                    onLevels={() => setPhase('pick')}
                />
            </div>
        )
    }

    // Only while a level is being set up
    if (!play || !round) return <></>
    const playing = play.outcome === 'playing'
    const hintStep = play.hint && play.hint !== 'stuck' ? play.hint : null
    // The two cards the hint points at (the first match of each value)
    const hintIds: number[] = []
    if (hintStep) {
        const left = play.cards.find((card) => equals(card.value, hintStep.left))
        const right = play.cards.find((card) => card.id !== left?.id && equals(card.value, hintStep.right))
        if (left) hintIds.push(left.id)
        if (right) hintIds.push(right.id)
    }
    const status = !playing
        ? null
        : play.selected === null
            ? l({ eu: 'Aukeratu karta bat.', es: 'Elige una carta.', ar: 'اختر بطاقة.' })
            : play.op === null
                ? l({ eu: 'Aukeratu eragiketa bat (edo beste karta bat).', es: 'Elige una operación (u otra carta).', ar: 'اختر عملية (أو بطاقة أخرى).' })
                : l({ eu: 'Aukeratu bigarren karta.', es: 'Elige la segunda carta.', ar: 'اختر البطاقة الثانية.' })

    return (
        <div className="exact-game" data-stage={game.levels[level].stage}>
            <GameTopbar game={game} language={language} onExit={onExit}>
                <span>{index + 1} / {EXACT_ROUNDS}</span>
                <span><strong>{score}</strong> {l({ eu: 'puntu', es: 'puntos', ar: 'نقطة' })}</span>
            </GameTopbar>

            <div className="exact-target" aria-live="polite">
                <span className="exact-target-label">{l({ eu: 'Helburua', es: 'Objetivo', ar: 'الهدف' })}</span>
                <MathText text={`$${toLatex(round.target)}$`} />
            </div>

            <div className="exact-cards" role="group" aria-label={l({ eu: 'Kartak', es: 'Cartas', ar: 'البطاقات' })}>
                {play.cards.map((card) => (
                    <button
                        type="button"
                        key={card.id}
                        className={[
                            'exact-card',
                            play.selected === card.id ? 'selected' : '',
                            hintIds.includes(card.id) ? 'hinted' : '',
                            play.fresh === card.id ? 'fresh' : '',
                            !playing && equals(card.value, round.target) ? 'target' : ''
                        ].join(' ')}
                        aria-pressed={play.selected === card.id}
                        disabled={!playing}
                        onClick={() => tapCard(card.id)}
                    >
                        <MathText text={`$${toLatex(card.value)}$`} />
                    </button>
                ))}
            </div>

            <div className="exact-ops" role="group" aria-label={l({ eu: 'Eragiketak', es: 'Operaciones', ar: 'العمليات' })}>
                {levelInfo.ops.map((op) => (
                    <button type="button" key={op} aria-pressed={play.op === op} disabled={!playing || play.selected === null} onClick={() => tapOp(op)}>
                        {opSymbols[op]}
                    </button>
                ))}
            </div>

            {status && <p className="exact-status" aria-live="polite">{status}</p>}
            {warning && <p className="exact-warning" role="alert">{l({ eu: 'Ezin da zeroz zatitu.', es: 'No se puede dividir entre cero.', ar: 'لا يمكن القسمة على صفر.' })}</p>}
            {play.hint === 'stuck' && <p className="exact-warning" role="status">{l({ eu: 'Bide honetatik ez zara iristen: desegin urratsen bat.', es: 'Por este camino no se llega: deshaz algún paso.', ar: 'لا يوصل هذا الطريق إلى الهدف: تراجع عن خطوة.' })}</p>}
            {hintStep && (
                <p className="exact-hint" role="status">
                    <strong>{l({ eu: 'Pista:', es: 'Pista:', ar: 'تلميح:' })}</strong>{' '}
                    <MathText text={`$${toLatex(hintStep.left)}${opLatex[hintStep.op]}${operandLatex(hintStep.right)}$`} />
                </p>
            )}

            {play.history.length > 0 && (
                <ol className="exact-steps">
                    {play.history.map((item, stepIndex) => <li key={stepIndex}><MathText text={`$${stepLatex(item.step)}$`} /></li>)}
                </ol>
            )}

            {playing ? (
                <div className="exact-actions">
                    <button type="button" className="fraction-v2-secondary" disabled={play.history.length === 0} onClick={undo}>{l({ eu: 'Desegin', es: 'Deshacer', ar: 'تراجع' })}</button>
                    <button type="button" className="fraction-v2-secondary" onClick={hint}>{l({ eu: 'Pista', es: 'Pista', ar: 'تلميح' })}</button>
                    <button type="button" className="fraction-v2-secondary" onClick={giveUp}>{l({ eu: 'Ebazpena ikusi', es: 'Ver una solución', ar: 'اعرض حلًّا' })}</button>
                </div>
            ) : (
                <div className={`exact-outcome ${play.outcome}`} role="status">
                    {play.outcome === 'solved' ? (
                        <p><strong>{l({ eu: 'Zehatza!', es: '¡Exacto!', ar: 'بالضبط!' })}</strong> +{points[points.length - 1]}</p>
                    ) : (
                        <>
                            <p><strong>{l({ eu: 'Ebazpen bat:', es: 'Una solución:', ar: 'حلّ ممكن:' })}</strong></p>
                            <ol className="exact-steps">
                                {round.solution.map((step, stepIndex) => <li key={stepIndex}><MathText text={`$${stepLatex(step)}$`} /></li>)}
                            </ol>
                        </>
                    )}
                    <button type="button" className="fraction-v2-primary" onClick={next} ref={(node) => node?.focus({ preventScroll: true })}>
                        {index + 1 >= EXACT_ROUNDS ? l({ eu: 'Emaitza ikusi', es: 'Ver resultado', ar: 'اعرض النتيجة' }) : l({ eu: 'Hurrengoa', es: 'Siguiente', ar: 'التالي' })}
                    </button>
                </div>
            )}
        </div>
    )
}
