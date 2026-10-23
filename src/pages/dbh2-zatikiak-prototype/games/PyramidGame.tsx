import { useState, type KeyboardEvent } from 'react'
import { MathText } from '../../../components/MathText'
import { equals, fraction, normalizeDigits, parseFractionInput, type FractionValue } from '../math/fraction'
import { GameTopbar, LevelPicker, ResultPanel } from './GameKit'
import { useGameText } from './gameHooks'
import type { GameProps } from './index'
import { createRandom, randomSeed } from './random'
import { games } from './records'
import {
    createPyramids,
    hintFor,
    PYRAMID_BRICKS,
    PYRAMID_MAX_SCORE,
    PYRAMID_POINTS,
    PYRAMID_ROUNDS,
    pyramidStars,
    stepLatex,
    type Pyramid,
    type PyramidLevel
} from './pyramid'
import './Pyramid.css'

const game = games.find((item) => item.id === 'pyramid')!

/** Rows of a three-row pyramid, top first */
const ROWS = [[0], [1, 2], [3, 4, 5]]
const KEYS = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '/', '0', '⌫']

/** In Arabic, a piece of arithmetic keeps its left-to-right order (LRI … PDI) */
const ltr = (text: string) => `⁦${text}⁩`

/** A fraction written stacked, as on the bricks */
function Stacked({ value }: { value: FractionValue }) {
    const reduced = fraction(value.numerator, value.denominator)
    if (reduced.denominator === 1) return <span className="pyramid-frac whole">{reduced.numerator}</span>
    return <span className="pyramid-frac"><span>{reduced.numerator}</span><span>{reduced.denominator}</span></span>
}

type Feedback = { brick: number; kind: 'wrong' | 'unreadable' | 'later' | 'hint' } | null

export function PyramidGame({ language, records, onResult, onExit }: GameProps) {
    const l = useGameText(language)
    const [phase, setPhase] = useState<'pick' | 'playing' | 'finished'>('pick')
    const [level, setLevel] = useState<PyramidLevel>(0)
    const [pyramids, setPyramids] = useState<Pyramid[]>([])
    const [index, setIndex] = useState(0)
    /** Bricks the learner has got right */
    const [filled, setFilled] = useState<boolean[]>([])
    /** Bricks that cost a mistake or a hint: they score less */
    const [helped, setHelped] = useState<boolean[]>([])
    const [selected, setSelected] = useState<number | null>(null)
    const [input, setInput] = useState('')
    const [feedback, setFeedback] = useState<Feedback>(null)
    const [score, setScore] = useState(0)
    const [perfect, setPerfect] = useState(0)

    const pyramid = pyramids[index]
    const known = pyramid ? pyramid.given.map((given, brick) => given || filled[brick]) : []
    const complete = known.length > 0 && known.every(Boolean)

    const firstOpen = (target: Pyramid, done: boolean[]) => {
        const open = target.given.map((given, brick) => !given && !done[brick])
        // Prefer a brick that can be worked out now
        const ready = open.findIndex((isOpen, brick) => isOpen && hintFor(target.given.map((given, b) => given || done[b]), brick) !== null)
        return ready >= 0 ? ready : open.indexOf(true)
    }

    const startPyramid = (target: Pyramid) => {
        const none = Array.from({ length: PYRAMID_BRICKS }, () => false)
        setFilled(none)
        setHelped(none)
        setSelected(firstOpen(target, none))
        setInput('')
        setFeedback(null)
    }

    const start = (nextLevel: number) => {
        const created = createPyramids(createRandom(randomSeed()), nextLevel as PyramidLevel)
        setLevel(nextLevel as PyramidLevel)
        setPyramids(created)
        setIndex(0)
        setScore(0)
        setPerfect(0)
        startPyramid(created[0])
        setPhase('playing')
    }

    const choose = (brick: number) => {
        if (!pyramid || pyramid.given[brick] || filled[brick]) return
        setSelected(brick)
        setInput('')
        setFeedback(null)
    }

    const press = (key: string) => {
        if (selected === null) return
        setFeedback(null)
        if (key === '⌫') setInput((text) => text.slice(0, -1))
        else setInput((text) => (text.length >= 7 ? text : text + key))
    }

    const check = () => {
        if (selected === null || !pyramid) return
        const value = parseFractionInput(input)
        if (!value) {
            setFeedback({ brick: selected, kind: 'unreadable' })
            return
        }
        if (!equals(value, pyramid.values[selected])) {
            setHelped((current) => current.map((item, brick) => item || brick === selected))
            setFeedback({ brick: selected, kind: 'wrong' })
            return
        }
        const points = helped[selected] ? PYRAMID_POINTS.later : PYRAMID_POINTS.first
        const done = filled.map((item, brick) => item || brick === selected)
        setScore((total) => total + points)
        setFilled(done)
        setInput('')
        setFeedback(null)
        const open = firstOpen(pyramid, done)
        setSelected(open >= 0 ? open : null)
        if (open < 0 && !helped.some(Boolean)) setPerfect((count) => count + 1)
    }

    const hint = () => {
        if (selected === null || !pyramid) return
        const step = hintFor(known, selected)
        if (!step) {
            setFeedback({ brick: selected, kind: 'later' })
            return
        }
        setHelped((current) => current.map((item, brick) => item || brick === selected))
        setFeedback({ brick: selected, kind: 'hint' })
    }

    const next = () => {
        if (index + 1 >= PYRAMID_ROUNDS) {
            onResult(level, { stars: pyramidStars(score), score, timeMs: null })
            setPhase('finished')
            return
        }
        setIndex(index + 1)
        startPyramid(pyramids[index + 1])
    }

    /** Typing on a real keyboard works too */
    const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        if (complete || selected === null) return
        const key = normalizeDigits(event.key)
        if (/^[0-9]$/.test(key) || key === '/') press(key)
        else if (event.key === 'Backspace') press('⌫')
        else if (event.key === 'Enter') check()
        else return
        event.preventDefault()
    }

    if (phase === 'pick') {
        return (
            <LevelPicker
                game={game}
                language={language}
                records={records}
                onStart={start}
                onExit={onExit}
                bestLabel={(record) => `${l({ eu: 'Marka', es: 'Récord', ar: 'الرقم' })}: ${record.score} / ${PYRAMID_MAX_SCORE}`}
                howTo={(
                    <ul className="fraction-v2-game-rules">
                        <li>{l({ eu: `${PYRAMID_ROUNDS} piramide maila bakoitzean. Sakatu adreilu huts bat eta idatzi haren zatikia.`, es: `${PYRAMID_ROUNDS} pirámides por nivel. Toca un ladrillo vacío y escribe su fracción.`, ar: `${PYRAMID_ROUNDS} أهرامات في كل مستوى. اضغط لبنة فارغة واكتب كسرها.` })}</li>
                        <li>{l({ eu: 'Lehen saiakeran asmatutako adreilu bakoitzak 2 puntu ematen ditu; akats edo pista baten ondoren, puntu 1.', es: 'Cada ladrillo acertado a la primera vale 2 puntos; después de un error o de una pista, 1.', ar: 'كل لبنة صحيحة من المحاولة الأولى بنقطتين؛ وبعد خطأ أو تلميح بنقطة واحدة.' })}</li>
                        <li>{l({ eu: '3 izar: 26 puntu · 2: 20 · 1: 14.', es: '3 estrellas: 26 puntos · 2: 20 · 1: 14.', ar: '3 نجوم: 26 نقطة · 2: 20 · 1: 14.' })}</li>
                    </ul>
                )}
            />
        )
    }

    if (phase === 'finished') {
        return (
            <div className="pyramid-game" data-stage={game.levels[level].stage}>
                <GameTopbar game={game} language={language} onExit={onExit} />
                <ResultPanel
                    language={language}
                    stars={pyramidStars(score)}
                    title={`${score} / ${PYRAMID_MAX_SCORE}`}
                    subtitle={l({ eu: '3 izar: 26 · 2 izar: 20 · izar 1: 14', es: '3 estrellas: 26 · 2: 20 · 1: 14', ar: '3 نجوم: 26 · 2: 20 · 1: 14' })}
                    stats={[
                        { label: l({ eu: 'Puntuak', es: 'Puntos', ar: 'النقاط' }), value: `${score} / ${PYRAMID_MAX_SCORE}` },
                        { label: l({ eu: 'Akatsik gabe', es: 'Sin fallos', ar: 'دون أخطاء' }), value: `${perfect} / ${PYRAMID_ROUNDS}` }
                    ]}
                    onReplay={() => start(level)}
                    onNext={level < game.levels.length - 1 ? () => start(level + 1) : undefined}
                    onLevels={() => setPhase('pick')}
                />
            </div>
        )
    }

    // Only while a level is being set up
    if (!pyramid) return <></>

    const step = selected !== null ? hintFor(known, selected) : null
    const rule = pyramid.op === 'sum'
        ? { eu: 'Adreilu bakoitza azpian dituen bien batura da.', es: 'Cada ladrillo es la suma de los dos que tiene debajo.', ar: 'كل لبنة هي مجموع اللبنتين اللتين تحتها.' }
        : { eu: 'Adreilu bakoitza azpian dituen bien biderkadura da.', es: 'Cada ladrillo es el producto de los dos que tiene debajo.', ar: 'كل لبنة هي حاصل ضرب اللبنتين اللتين تحتها.' }

    const feedbackText = (() => {
        if (!feedback) return null
        if (feedback.kind === 'unreadable') return l({ eu: 'Idatzi zatiki bat, adibidez 3/4.', es: 'Escribe una fracción, como 3/4.', ar: `اكتب كسرًا مثل ${ltr('3/4')}.` })
        if (feedback.kind === 'wrong') return l({ eu: 'Ez da hori. Saiatu berriro edo eskatu pista bat.', es: 'No es eso. Prueba otra vez o pide una pista.', ar: 'ليس هذا. حاول مرة أخرى أو اطلب تلميحًا.' })
        if (feedback.kind === 'later') return l({ eu: 'Adreilu hau ezin da oraindik kalkulatu: hasi beste batekin.', es: 'Este ladrillo todavía no se puede calcular: empieza por otro.', ar: 'لا يمكن حساب هذه اللبنة بعد: ابدأ بلبنة أخرى.' })
        return null
    })()

    return (
        <div className="pyramid-game" data-stage={game.levels[level].stage}>
            <GameTopbar game={game} language={language} onExit={onExit}>
                <span>{index + 1} / {PYRAMID_ROUNDS}</span>
                <span><strong>{score}</strong> {l({ eu: 'puntu', es: score === 1 ? 'punto' : 'puntos', ar: 'نقاط' })}</span>
            </GameTopbar>

            <p className="pyramid-rule">{l(rule)}</p>

            <div className="pyramid" dir="ltr" onKeyDown={onKeyDown}>
                {ROWS.map((row, rowIndex) => (
                    <div className="pyramid-row" key={rowIndex}>
                        {row.map((brick) => {
                            const value = pyramid.values[brick]
                            const shown = pyramid.given[brick]
                            const done = filled[brick]
                            const isSelected = selected === brick && !done
                            const wrong = feedback?.brick === brick && feedback.kind === 'wrong'
                            if (shown) {
                                return <span key={brick} className="pyramid-brick given" role="img" aria-label={`${value.numerator}/${value.denominator}`}><Stacked value={value} /></span>
                            }
                            return (
                                <button
                                    type="button"
                                    key={brick}
                                    className={`pyramid-brick ${done ? 'done' : 'open'} ${isSelected ? 'selected' : ''} ${wrong ? 'wrong' : ''}`}
                                    aria-pressed={isSelected}
                                    aria-label={done ? `${value.numerator}/${value.denominator}` : l({ eu: 'Adreilu hutsa', es: 'Ladrillo vacío', ar: 'لبنة فارغة' })}
                                    disabled={done}
                                    onClick={() => choose(brick)}
                                >
                                    {done
                                        ? <Stacked value={value} />
                                        : isSelected && input
                                            ? <span className="pyramid-typing">{input}</span>
                                            : <span className="pyramid-unknown">?</span>}
                                </button>
                            )
                        })}
                    </div>
                ))}
            </div>

            {!complete && selected !== null && (
                <div className="pyramid-entry">
                    <p className="pyramid-feedback" aria-live="polite">
                        {feedback?.kind === 'hint' && step
                            ? <>{l({ eu: 'Pista:', es: 'Pista:', ar: 'تلميح:' })} <bdi dir="ltr"><MathText inline text={`$${stepLatex(pyramid, step)}$`} /></bdi></>
                            : feedbackText ?? <span className="pyramid-entry-help">{l({ eu: 'Idatzi hautatutako adreiluaren zatikia.', es: 'Escribe la fracción del ladrillo marcado.', ar: 'اكتب كسر اللبنة المحدّدة.' })}</span>}
                    </p>
                    <div className="pyramid-keypad" dir="ltr" role="group" aria-label={l({ eu: 'Teklatua', es: 'Teclado', ar: 'لوحة المفاتيح' })}>
                        {KEYS.map((key) => (
                            <button type="button" key={key} onClick={() => press(key)} aria-label={key === '⌫' ? l({ eu: 'Ezabatu', es: 'Borrar', ar: 'احذف' }) : key}>{key}</button>
                        ))}
                    </div>
                    <div className="pyramid-entry-actions">
                        <button type="button" className="fraction-v2-secondary" onClick={hint}>{l({ eu: 'Pista', es: 'Pista', ar: 'تلميح' })}</button>
                        <button type="button" className="fraction-v2-primary" disabled={!input} onClick={check}>{l({ eu: 'Egiaztatu', es: 'Comprobar', ar: 'تحقّق' })}</button>
                    </div>
                </div>
            )}

            {complete && (
                <div className="pyramid-done" role="status">
                    <p><strong>{l({ eu: 'Piramidea osatuta!', es: '¡Pirámide completa!', ar: 'اكتمل الهرم!' })}</strong></p>
                    <button type="button" className="fraction-v2-primary" onClick={next} ref={(node) => node?.focus({ preventScroll: true })}>
                        {index + 1 >= PYRAMID_ROUNDS ? l({ eu: 'Emaitza ikusi', es: 'Ver resultado', ar: 'اعرض النتيجة' }) : l({ eu: 'Hurrengoa', es: 'Siguiente', ar: 'التالي' })}
                    </button>
                </div>
            )}
        </div>
    )
}
