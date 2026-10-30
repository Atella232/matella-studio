import { useEffect, useRef, useState } from 'react'
import { MathText } from '../../../components/MathText'
import { equals, fraction, normalizeDigits, type FractionValue } from '../math/fraction'
import { GameTopbar, LevelPicker, ResultPanel } from './GameKit'
import { useGameText } from './gameHooks'
import type { GameProps } from './index'
import { createRandom, randomSeed } from './random'
import { games } from './records'
import {
    brickPoints,
    createPyramids,
    diagnose,
    hintFor,
    PYRAMID_BRICKS,
    PYRAMID_MAX_SCORE,
    PYRAMID_ROUNDS,
    pyramidStars,
    readBrick,
    stepLatex,
    type Pyramid,
    type PyramidLevel,
    type PyramidSlip
} from './pyramid'
import './Pyramid.css'

const game = games.find((item) => item.id === 'pyramid')!

/** Rows of a three-row pyramid, top first */
const ROWS = [[0], [1, 2], [3, 4, 5]]
/** The pad: digits, the fraction bar, a space for mixed numbers (1 1/2) and backspace */
const KEYS = ['7', '8', '9', '⌫', '4', '5', '6', '/', '1', '2', '3', ' ', '0']
const MAX_INPUT = 7
const STARS = { three: 26, two: 20, one: 14 }

/** In Arabic, numbers and arithmetic keep their left-to-right order (LRI … PDI) */
const ltr = (text: string) => `\u2066${text}\u2069`
const plain = (value: FractionValue) => (value.denominator === 1 ? String(value.numerator) : `${value.numerator}/${value.denominator}`)

const positions = [
    { eu: 'Goiko adreilua', es: 'Ladrillo de arriba', en: 'Top brick', ar: 'اللبنة العليا' },
    { eu: 'Erdiko adreilua, ezkerrean', es: 'Ladrillo de en medio, a la izquierda', en: 'Middle brick, on the left', ar: 'اللبنة الوسطى اليسرى' },
    { eu: 'Erdiko adreilua, eskuinean', es: 'Ladrillo de en medio, a la derecha', en: 'Middle brick, on the right', ar: 'اللبنة الوسطى اليمنى' },
    { eu: 'Beheko adreilua, ezkerrean', es: 'Ladrillo de abajo, a la izquierda', en: 'Bottom brick, on the left', ar: 'اللبنة السفلى اليسرى' },
    { eu: 'Beheko adreilua, erdian', es: 'Ladrillo de abajo, en el centro', en: 'Bottom brick, in the centre', ar: 'اللبنة السفلى الوسطى' },
    { eu: 'Beheko adreilua, eskuinean', es: 'Ladrillo de abajo, a la derecha', en: 'Bottom brick, on the right', ar: 'اللبنة السفلى اليمنى' }
]

/** A fraction written stacked, as on the bricks */
function Stacked({ value }: { value: FractionValue }) {
    const reduced = fraction(value.numerator, value.denominator)
    if (reduced.denominator === 1) return <span className="pyramid-frac whole">{reduced.numerator}</span>
    return <span className="pyramid-frac"><span>{reduced.numerator}</span><span>{reduced.denominator}</span></span>
}

type Feedback =
    | { brick: number; kind: 'unreadable' | 'later' }
    | { brick: number; kind: 'wrong'; slip: PyramidSlip | null }
    | { brick: number; kind: 'right'; points: number }
    | null

/** What each typical slip means, said to the learner */
const slipTips: Record<PyramidSlip, { eu: string; es: string; en: string; ar: string }> = {
    across: { eu: 'Goikoak elkarrekin eta behekoak elkarrekin kalkulatu dituzu. Lehenik, izendatzaile komuna.', es: 'Has operado arriba con arriba y abajo con abajo. Primero, denominador común.', en: 'You have combined the tops with the tops and the bottoms with the bottoms. First, find a common denominator.', ar: 'حسبت البسطين معًا والمقامين معًا. حوّل أولًا إلى مقام مشترك.' },
    added: { eu: 'Batu egin duzu, baina beherantz kendu egin behar da: goikoa ken ondokoa.', es: 'Has sumado, pero hacia abajo hay que restar: el de arriba menos el de al lado.', en: 'You added, but going down you must subtract: the top one minus the one beside it.', ar: 'لقد جمعت، لكن نزولًا يجب أن تطرح: العليا ناقص المجاورة.' },
    subtracted: { eu: 'Kendu egin duzu, baina gorantz batu egiten da.', es: 'Has restado, pero hacia arriba se suma.', en: 'You subtracted, but going up you add.', ar: 'لقد طرحت، لكن صعودًا نجمع.' },
    multiplied: { eu: 'Biderkatu egin duzu, baina beherantz zatitu egin behar da: goikoa zati ondokoa.', es: 'Has multiplicado, pero hacia abajo hay que dividir: el de arriba entre el de al lado.', en: 'You multiplied, but going down you have to divide: the top one divided by the one beside it.', ar: 'لقد ضربت، لكن نزولًا يجب أن تقسم: العليا على المجاورة.' },
    'upside-down': { eu: 'Alderantziz zatitu duzu: goikoa zati ondokoa da, ez alderantziz.', es: 'Has dividido al revés: es el de arriba entre el de al lado, no al contrario.', en: 'You divided the wrong way round: it is the top one divided by the one beside it, not the other way round.', ar: 'قسمت بالعكس: العليا على المجاورة، لا العكس.' },
    'added-not-multiplied': { eu: 'Batu egin duzu, baina piramide honetan adreilu bakoitza biderkadura da.', es: 'Has sumado, pero en esta pirámide cada ladrillo es un producto.', en: 'You added, but in this pyramid each brick is a product.', ar: 'لقد جمعت، لكن في هذا الهرم كل لبنة حاصل ضرب.' }
}

export function PyramidGame({ language, records, onResult, onExit }: GameProps) {
    const l = useGameText(language)
    const [phase, setPhase] = useState<'pick' | 'playing' | 'finished'>('pick')
    const [level, setLevel] = useState<PyramidLevel>(0)
    const [pyramids, setPyramids] = useState<Pyramid[]>([])
    const [index, setIndex] = useState(0)
    /** Bricks the learner has got right */
    const [filled, setFilled] = useState<boolean[]>([])
    /** Mistakes and hints on each brick: each one takes a point away */
    const [slips, setSlips] = useState<number[]>([])
    /** How far the hint has gone on each brick: 0 none, 1 the bricks to use, 2 the operation */
    const [hints, setHints] = useState<number[]>([])
    const [selected, setSelected] = useState<number | null>(null)
    const [input, setInput] = useState('')
    const [feedback, setFeedback] = useState<Feedback>(null)
    const [score, setScore] = useState(0)
    const [perfect, setPerfect] = useState(0)
    const brickRefs = useRef<Array<HTMLButtonElement | null>>([])

    const pyramid = pyramids[index]
    const known = pyramid ? pyramid.given.map((given, brick) => given || filled[brick]) : []
    const complete = known.length > 0 && known.every(Boolean)
    const step = pyramid && selected !== null ? hintFor(known, selected) : null

    const firstOpen = (target: Pyramid, done: boolean[]) => {
        const open = target.given.map((given, brick) => !given && !done[brick])
        // Prefer a brick that can be worked out now
        const ready = open.findIndex((isOpen, brick) => isOpen && hintFor(target.given.map((given, b) => given || done[b]), brick) !== null)
        return ready >= 0 ? ready : open.indexOf(true)
    }

    const startPyramid = (target: Pyramid) => {
        const zeros = Array.from({ length: PYRAMID_BRICKS }, () => 0)
        setFilled(zeros.map(() => false))
        setSlips(zeros)
        setHints(zeros)
        setSelected(firstOpen(target, zeros.map(() => false)))
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
        if (!pyramid || pyramid.given[brick] || filled[brick] || brick === selected) return
        setSelected(brick)
        setInput('')
        setFeedback(null)
    }

    const press = (key: string) => {
        if (selected === null || complete) return
        // After a wrong answer, a new digit starts a new answer; backspace still edits the old one
        const fresh = feedback?.kind === 'wrong' && key !== '⌫'
        if (feedback?.kind !== 'right') setFeedback(null)
        if (key === '⌫') setInput((text) => text.slice(0, -1))
        else setInput((current) => {
            const text = fresh ? '' : current
            return text.length >= MAX_INPUT || (key === ' ' && (text === '' || text.endsWith(' '))) ? text : text + key
        })
    }

    const check = () => {
        if (selected === null || !pyramid || complete) return
        const value = readBrick(input)
        if (!value) {
            setFeedback({ brick: selected, kind: 'unreadable' })
            return
        }
        if (!equals(value, pyramid.values[selected])) {
            setSlips((current) => current.map((count, brick) => (brick === selected ? count + 1 : count)))
            setFeedback({ brick: selected, kind: 'wrong', slip: diagnose(pyramid, known, selected, value) })
            return
        }
        const points = brickPoints(slips[selected])
        const done = filled.map((item, brick) => item || brick === selected)
        setScore((total) => total + points)
        setFilled(done)
        setInput('')
        setFeedback({ brick: selected, kind: 'right', points })
        const open = firstOpen(pyramid, done)
        setSelected(open >= 0 ? open : null)
        if (open < 0 && slips.every((count) => count === 0)) setPerfect((count) => count + 1)
    }

    const hint = () => {
        if (selected === null || !pyramid) return
        if (!step) {
            setFeedback({ brick: selected, kind: 'later' })
            return
        }
        // The first hint on a brick costs a point; the second only adds the operation
        if (hints[selected] === 0) setSlips((current) => current.map((count, brick) => (brick === selected ? count + 1 : count)))
        setHints((current) => current.map((tier, brick) => (brick === selected ? Math.min(2, tier + 1) : tier)))
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

    // The keyboard follows the chosen brick
    useEffect(() => {
        if (phase === 'playing' && selected !== null) brickRefs.current[selected]?.focus({ preventScroll: true })
    }, [phase, selected, index])

    // A real keyboard works anywhere in the game, not only on the pad
    const keyboard = useRef<(event: KeyboardEvent) => void>(() => {})
    useEffect(() => {
        keyboard.current = (event: KeyboardEvent) => {
            if (phase !== 'playing' || complete || selected === null || event.ctrlKey || event.metaKey || event.altKey) return
            const target = event.target as HTMLElement | null
            const onButton = target?.tagName === 'BUTTON'
            const onChosen = target === brickRefs.current[selected]
            const key = normalizeDigits(event.key)
            if (/^[0-9]$/.test(key) || key === '/') press(key)
            else if (key === ',' || key === '.') press(',')
            else if (key === ' ' && (!onButton || onChosen)) press(' ')
            else if (event.key === 'Backspace') press('⌫')
            // Enter on another button clicks it; on the chosen brick (or nowhere) it checks
            else if (event.key === 'Enter' && (!onButton || onChosen)) check()
            else return
            event.preventDefault()
        }
    })
    useEffect(() => {
        const listener = (event: KeyboardEvent) => keyboard.current(event)
        window.addEventListener('keydown', listener)
        return () => window.removeEventListener('keydown', listener)
    }, [])

    const outOf = (value: number, total: number) => (language === 'ar' ? ltr(`${value} / ${total}`) : `${value} / ${total}`)
    const starsText = l({
        eu: `3 izar: ${STARS.three} puntu · 2: ${STARS.two} · 1: ${STARS.one}.`,
        es: `3 estrellas: ${STARS.three} puntos · 2: ${STARS.two} · 1: ${STARS.one}.`,
        en: `3 stars: ${STARS.three} points · 2: ${STARS.two} · 1: ${STARS.one}.`,
        ar: `3 نجوم: ${STARS.three} نقطة · 2: ${STARS.two} · 1: ${STARS.one}.`
    })

    if (phase === 'pick') {
        return (
            <LevelPicker
                game={game}
                language={language}
                records={records}
                onStart={start}
                onExit={onExit}
                bestLabel={(record) => `${l({ eu: 'Marka', es: 'Récord', en: 'Record', ar: 'أفضل نتيجة' })}: ${outOf(record.score, PYRAMID_MAX_SCORE)}`}
                howTo={(
                    <ul className="fraction-v2-game-rules">
                        <li>{l({ eu: `${PYRAMID_ROUNDS} piramide maila bakoitzean. Sakatu adreilu huts bat eta idatzi haren zatikia; zenbaki mistoak ere bai (1 1/2).`, es: `${PYRAMID_ROUNDS} pirámides por nivel. Toca un ladrillo vacío y escribe su fracción; también vale un número mixto (1 1/2).`, en: `${PYRAMID_ROUNDS} pyramids per level. Tap an empty brick and write its fraction; a mixed number (1 1/2) also counts.`, ar: `${PYRAMID_ROUNDS} أهرامات في كل مستوى. اضغط على لبنة فارغة واكتب كسرها؛ ويُقبل العدد الكسري أيضًا (${ltr('1 1/2')}).` })}</li>
                        <li>{l({ eu: 'Lehen saiakeran asmatutako adreilu bakoitzak 2 puntu ematen ditu. Akats edo pista bakoitzak puntu bat kentzen du.', es: 'Cada ladrillo acertado a la primera vale 2 puntos. Cada error o pista resta uno.', en: 'Each brick you get right first time is worth 2 points. Each error or hint takes off one point.', ar: 'كل لبنة صحيحة من المحاولة الأولى بنقطتين. وكل خطأ أو تلميح يُنقص نقطة.' })}</li>
                        <li>{starsText}</li>
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
                    title={outOf(score, PYRAMID_MAX_SCORE)}
                    subtitle={starsText}
                    stats={[
                        { label: l({ eu: 'Puntuak', es: 'Puntos', en: 'Points', ar: 'النقاط' }), value: outOf(score, PYRAMID_MAX_SCORE) },
                        { label: l({ eu: 'Akatsik gabe', es: 'Sin fallos', en: 'No mistakes', ar: 'دون أخطاء' }), value: outOf(perfect, PYRAMID_ROUNDS) }
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

    const rule = pyramid.op === 'sum'
        ? { eu: 'Adreilu bakoitza azpiko bi adreiluen batura da.', es: 'Cada ladrillo es la suma de los dos que tiene debajo.', en: 'Each brick is the sum of the two below it.', ar: 'كل لبنة هي مجموع اللبنتين اللتين تحتها.' }
        : { eu: 'Adreilu bakoitza azpiko bi adreiluen biderkadura da.', es: 'Cada ladrillo es el producto de los dos que tiene debajo.', en: 'Each brick is the product of the two below it.', ar: 'كل لبنة هي حاصل ضرب اللبنتين اللتين تحتها.' }
    const tier = selected !== null ? hints[selected] : 0
    const lit: number[] = tier > 0 && step ? step.from : []

    const message = (() => {
        if (!feedback) return null
        if (feedback.kind === 'right') {
            return l({
                eu: `Ondo! +${feedback.points} puntu`,
                es: `¡Bien! +${feedback.points} ${feedback.points === 1 ? 'punto' : 'puntos'}`,
                en: `Good! +${feedback.points} ${feedback.points === 1 ? 'point' : 'points'}`,
                ar: feedback.points === 0 ? 'صحيح!' : feedback.points === 1 ? 'صحيح! +نقطة واحدة' : 'صحيح! +نقطتان'
            })
        }
        if (feedback.kind === 'unreadable') return l({ eu: 'Idatzi zatiki oso bat, adibidez 3/4 edo 1 1/2.', es: 'Escribe una fracción completa, como 3/4 o 1 1/2.', en: 'Write a complete fraction, such as 3/4 or 1 1/2.', ar: `اكتب كسرًا كاملًا مثل ${ltr('3/4')} أو ${ltr('1 1/2')}.` })
        if (feedback.kind === 'wrong') {
            return feedback.slip
                ? l(slipTips[feedback.slip])
                : l({ eu: 'Ez da hori. Saiatu berriro edo eskatu pista bat.', es: 'No es eso. Prueba otra vez o pide una pista.', en: 'That is not it. Try again or ask for a hint.', ar: 'ليس هذا. حاول مرة أخرى أو اطلب تلميحًا.' })
        }
        return l({ eu: 'Adreilu hau ezin da oraindik kalkulatu: hasi beste batekin.', es: 'Este ladrillo todavía no se puede calcular: empieza por otro.', en: 'This brick cannot be worked out yet: start with another one.', ar: 'لا يمكن حساب هذه اللبنة بعد: ابدأ بلبنة أخرى.' })
    })()

    return (
        <div className="pyramid-game" data-stage={game.levels[level].stage}>
            <GameTopbar game={game} language={language} onExit={onExit}>
                <span><bdi dir="ltr">{index + 1} / {PYRAMID_ROUNDS}</bdi></span>
                <span>{l({ eu: 'Puntuak', es: 'Puntos', en: 'Points', ar: 'النقاط' })}: <strong><bdi dir="ltr">{score}</bdi></strong></span>
            </GameTopbar>

            <p className="pyramid-rule">{l(rule)}</p>

            <div className="pyramid" dir="ltr" role="group" aria-label={l({ eu: 'Piramidea', es: 'Pirámide', en: 'Pyramid', ar: 'الهرم' })}>
                {ROWS.map((row, rowIndex) => (
                    <div className="pyramid-row" key={rowIndex}>
                        {row.map((brick) => {
                            const value = pyramid.values[brick]
                            const shown = pyramid.given[brick]
                            const done = filled[brick]
                            const isSelected = selected === brick && !done
                            const wrong = isSelected && feedback?.brick === brick && feedback.kind === 'wrong'
                            const source = lit.includes(brick) ? 'source' : ''
                            const where = l(positions[brick])
                            if (shown) {
                                return <span key={brick} className={`pyramid-brick given ${source}`} role="img" aria-label={`${where}: ${plain(value)}`}><Stacked value={value} /></span>
                            }
                            const typed = isSelected && input
                            return (
                                <button
                                    type="button"
                                    key={brick}
                                    ref={(node) => { brickRefs.current[brick] = node }}
                                    className={`pyramid-brick ${done ? 'done' : 'open'} ${isSelected ? 'selected' : ''} ${wrong ? 'wrong' : ''} ${source}`}
                                    aria-pressed={isSelected}
                                    aria-disabled={done}
                                    aria-label={`${where}: ${done ? plain(value) : typed ? input : l({ eu: 'hutsik', es: 'vacío', en: 'Empty', ar: 'فارغة' })}`}
                                    onClick={() => choose(brick)}
                                >
                                    {done
                                        ? <Stacked value={value} />
                                        : typed
                                            ? <span className={`pyramid-typing ${input.length > 5 ? 'long' : ''}`}>{input}</span>
                                            : <span className="pyramid-unknown">?</span>}
                                </button>
                            )
                        })}
                    </div>
                ))}
            </div>

            {!complete && selected !== null && (
                <div className="pyramid-entry">
                    <div className="pyramid-feedback" aria-live="polite">
                        {message && <p className={feedback?.kind ?? ''}>{message}</p>}
                        {tier === 1 && step && <p className="pyramid-hint">{l({ eu: 'Pista: begiratu markatutako bi adreiluei.', es: 'Pista: fíjate en los dos ladrillos marcados.', en: 'Hint: look at the two marked bricks.', ar: 'تلميح: انظر إلى اللبنتين المحدّدتين.' })}</p>}
                        {tier === 2 && step && <p className="pyramid-hint">{l({ eu: 'Pista:', es: 'Pista:', en: 'Hint:', ar: 'تلميح:' })} <bdi dir="ltr"><MathText inline text={`$${stepLatex(pyramid, step).replaceAll('\\frac', '\\dfrac')}$`} /></bdi></p>}
                        {!message && tier === 0 && <p className="pyramid-entry-help">{l({ eu: 'Idatzi hautatutako adreiluaren zatikia.', es: 'Escribe la fracción del ladrillo seleccionado.', en: 'Write the fraction of the selected brick.', ar: 'اكتب كسر اللبنة المحدّدة.' })}</p>}
                    </div>
                    <div className="pyramid-keypad" dir="ltr" role="group" aria-label={l({ eu: 'Teklatua', es: 'Teclado', en: 'Keyboard', ar: 'لوحة المفاتيح' })}>
                        {KEYS.map((key) => (
                            <button
                                type="button"
                                key={key}
                                className={key === '0' ? 'zero' : key === ' ' ? 'space' : ''}
                                onClick={() => press(key)}
                                aria-label={key === '⌫' ? l({ eu: 'Ezabatu', es: 'Borrar', en: 'Delete', ar: 'احذف' }) : key === ' ' ? l({ eu: 'Zuriunea (zenbaki mistoak)', es: 'Espacio (números mixtos)', en: 'Space (mixed numbers)', ar: 'مسافة (للعدد الكسري)' }) : key}
                            >
                                {key === ' ' ? '␣' : key}
                            </button>
                        ))}
                    </div>
                    <div className="pyramid-entry-actions">
                        <button type="button" className="fraction-v2-secondary" disabled={tier >= 2} onClick={hint}>{tier === 1 ? l({ eu: 'Pista gehiago', es: 'Más pista', en: 'Another hint', ar: 'تلميح آخر' }) : l({ eu: 'Pista', es: 'Pista', en: 'Hint', ar: 'تلميح' })}</button>
                        <button type="button" className="fraction-v2-primary" disabled={!input.trim()} onClick={check}>{l({ eu: 'Egiaztatu', es: 'Comprobar', en: 'Check', ar: 'تحقّق' })}</button>
                    </div>
                </div>
            )}

            {complete && (
                <div className="pyramid-done" role="status">
                    <p><strong>{l({ eu: 'Piramidea osatu duzu!', es: '¡Pirámide completa!', en: 'Pyramid complete!', ar: 'اكتمل الهرم!' })}</strong> {message}</p>
                    <button type="button" className="fraction-v2-primary" onClick={next} ref={(node) => node?.focus({ preventScroll: true })}>
                        {index + 1 >= PYRAMID_ROUNDS ? l({ eu: 'Emaitza ikusi', es: 'Ver resultado', en: 'See the result', ar: 'اعرض النتيجة' }) : l({ eu: 'Hurrengoa', es: 'Siguiente', en: 'Next', ar: 'التالي' })}
                    </button>
                </div>
            )}
        </div>
    )
}
