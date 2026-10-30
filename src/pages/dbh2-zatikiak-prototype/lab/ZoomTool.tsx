import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent, type RefObject } from 'react'
import { MathText } from '../../../components/MathText'
import { add, equals, fraction, type FractionValue } from '../math/fraction'
import type { ToolProps } from './labTools'
import { Stepper, ToolFrame } from './LabKit'
import {
    canZoomIn,
    firstMarkBetween,
    initialZoomState,
    magnification,
    markForTap,
    markOf,
    marksBetween,
    pickedValue,
    pickZoomMark,
    setZoomFraction,
    setZoomSplit,
    wholeWindow,
    zoomBack,
    zoomBeside,
    zoomChallenges,
    zoomCount,
    zoomDenominator,
    zoomExtra,
    zoomIn,
    zoomMidpoint,
    zoomOut,
    zoomPair,
    zoomWindow,
    ZOOM_LIMITS,
    type ZoomState
} from './zoom'
import { useLabText } from './useLabText'
import './Zoom.css'

/** Beyond this many marks the line is a grey blur: only whole numbers, the ends and the chosen one are drawn */
const MAX_DRAWN_MARKS = 120

const latex = (value: FractionValue) => (value.denominator === 1 ? String(value.numerator) : `\\frac{${value.numerator}}{${value.denominator}}`)
const plain = (value: FractionValue) => (value.denominator === 1 ? String(value.numerator) : `${value.numerator}/${value.denominator}`)
/** In Arabic, a piece of arithmetic keeps its left-to-right order (LRI … PDI) */
const ltr = (text: string) => `\u2066${text}\u2069`
const times = (factor: number) => `×${factor >= 10 ? Math.round(factor) : Math.round(factor * 10) / 10}`

/** Width of an element, kept up to date, so the labels are only drawn where they fit */
function useWidth(ref: RefObject<HTMLElement | null>): number {
    const [width, setWidth] = useState(0)
    useEffect(() => {
        const element = ref.current
        if (!element) return
        const observer = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width))
        observer.observe(element)
        return () => observer.disconnect()
    }, [ref])
    return width
}

/** A mark's label: a small stacked fraction, or a whole number */
function MarkLabel({ mark, denominator }: { mark: number; denominator: number }) {
    const value = fraction(mark, denominator)
    if (value.denominator === 1) return <span className="zoom-label whole">{value.numerator}</span>
    return (
        <span className="zoom-label">
            <span>{mark}</span>
            <span>{denominator}</span>
        </span>
    )
}

export function ZoomTool(props: ToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<ZoomState>(initialZoomState)
    const trackRef = useRef<HTMLDivElement>(null)
    const dragging = useRef(false)
    const trackWidth = useWidth(trackRef)
    const { first, second } = state
    const pair = zoomPair(state)
    const denominator = zoomDenominator(state)
    const between = marksBetween(state)
    const chosen = pickedValue(state)
    const { low, high, firstMark, lastMark } = zoomWindow(state)
    const position = (value: number) => ((value - low) / (high - low)) * 100
    const lowMark = pair ? markOf(pair[0], denominator) : 0
    const highMark = pair ? markOf(pair[1], denominator) : 0
    const zooms = zoomCount(state)
    // The mean is the other way to find one; it is offered once the learner has found their own
    const [showMean, setShowMean] = useState(false)
    const mean = zoomMidpoint(state)
    const meanShown = showMean && chosen !== null && mean !== null

    /* ---------- Which marks to draw, and which to label ---------- */

    const markCount = lastMark - firstMark + 1
    const drawAll = markCount <= MAX_DRAWN_MARKS
    const wholeMarks: number[] = []
    for (let unit = Math.ceil(firstMark / denominator); unit * denominator <= lastMark; unit += 1) wholeMarks.push(unit * denominator)
    const marks = drawAll
        ? Array.from({ length: markCount }, (_, index) => firstMark + index)
        : [...new Set([...wholeMarks, ...(pair ? [lowMark, highMark] : []), ...(state.picked !== null ? [state.picked] : [])])].filter((mark) => mark >= firstMark && mark <= lastMark).sort((a, b) => a - b)
    // A stacked label is about as wide as its longest number; leave a gap between neighbours
    const labelWidth = String(Math.max(Math.abs(lastMark), denominator)).length * 7.5 + 10
    const spacing = trackWidth > 0 && markCount > 1 ? trackWidth / (markCount - 1) : 0
    const labelAll = drawAll && spacing >= labelWidth
    // The chosen label is boxed and wider: its neighbours give way when it would touch them
    const crowded = spacing < labelWidth + 14
    const showLabel = (mark: number) => {
        if (fraction(mark, denominator).denominator === 1 || mark === state.picked) return true
        if (!labelAll) return false
        return !(crowded && state.picked !== null && Math.abs(mark - state.picked) === 1)
    }

    /* ---------- Choosing a mark with the pointer or the keyboard ---------- */

    const choose = (mark: number | null) => {
        if (mark !== null) setState((current) => pickZoomMark(current, mark))
    }
    const pickAt = (clientX: number) => {
        const track = trackRef.current
        if (!track) return
        const box = track.getBoundingClientRect()
        const ratio = Math.min(1, Math.max(0, (clientX - box.left) / box.width))
        choose(markForTap(state, low + ratio * (high - low)))
    }
    const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
        dragging.current = true
        event.currentTarget.setPointerCapture(event.pointerId)
        pickAt(event.clientX)
    }
    const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
        if (dragging.current) pickAt(event.clientX)
    }
    const onPointerUp = () => {
        dragging.current = false
    }
    const onKey = (event: KeyboardEvent<HTMLDivElement>) => {
        const start = firstMarkBetween(state)
        if (start === null) return
        const end = highMark - 1
        const current = state.picked
        const page = Math.max(1, Math.round(between / 10))
        const moves: Record<string, number> = {
            ArrowRight: current === null ? start : current + 1,
            ArrowUp: current === null ? start : current + 1,
            ArrowLeft: current === null ? end : current - 1,
            ArrowDown: current === null ? end : current - 1,
            PageUp: current === null ? start : current + page,
            PageDown: current === null ? end : current - page,
            Home: start,
            End: end
        }
        if (!(event.key in moves)) return
        event.preventDefault()
        choose(Math.min(end, Math.max(start, moves[event.key])))
    }

    /** Zoom buttons disappear once used: keep the keyboard on the line */
    const act = (change: (current: ZoomState) => ZoomState) => {
        setState(change)
        trackRef.current?.focus({ preventScroll: true })
    }

    /* ---------- Controls ---------- */

    const fractionControls = (which: 'first' | 'second', value: FractionValue, title: string) => (
        <>
            <h3>{title}</h3>
            <Stepper label={l({ eu: 'Zenbakitzailea', es: 'Numerador', en: 'Numerator', ar: 'البسط' })} value={value.numerator} min={0} max={ZOOM_LIMITS.maxUnits * value.denominator} onChange={(next) => setState((current) => setZoomFraction(current, which, next, current[which].denominator))} language={props.language} />
            <Stepper label={l({ eu: 'Izendatzailea', es: 'Denominador', en: 'Denominator', ar: 'المقام' })} value={value.denominator} min={ZOOM_LIMITS.minDenominator} max={ZOOM_LIMITS.maxDenominator} onChange={(next) => setState((current) => setZoomFraction(current, which, current[which].numerator, next))} language={props.language} />
        </>
    )

    const controls = (
        <>
            {fractionControls('first', first, l({ eu: 'Lehen zatikia', es: 'Primera fracción', en: 'First fraction', ar: 'الكسر الأول' }))}
            {fractionControls('second', second, l({ eu: 'Bigarren zatikia', es: 'Segunda fracción', en: 'Second fraction', ar: 'الكسر الثاني' }))}
            <h3>{l({ eu: 'Marrak', es: 'Marcas', en: 'Marks', ar: 'العلامات' })}</h3>
            <Stepper label={l({ eu: 'Zati bakoitza, zenbat zatitan', es: 'Partir cada trozo en', en: 'Split each piece into', ar: 'قسّم كل جزء إلى' })} value={state.split} min={ZOOM_LIMITS.minSplit} max={ZOOM_LIMITS.maxSplit} onChange={(next) => setState((current) => setZoomSplit(current, next))} language={props.language} />
            <p className="fraction-v2-lab-tip">{l({ eu: 'Sakatu edo arrastatu zenbaki-zuzenean marra bat aukeratzeko; teklatuarekin, geziak.', es: 'Toca o arrastra en la recta para elegir una marca; con el teclado, las flechas.', en: 'Tap or drag on the number line to choose a mark; with the keyboard, use the arrows.', ar: 'اضغط على الخط أو اسحب لاختيار علامة؛ وبلوحة المفاتيح استعمل الأسهم.' })}</p>
        </>
    )

    /* ---------- Overview: the whole units, with the part that is magnified ---------- */

    const whole = wholeWindow(state)
    const overview = (value: number) => ((value - whole.low) / (whole.high - whole.low)) * 100
    const bandLeft = overview(low)
    const bandRight = overview(high)
    const zoomFactor = magnification(state)
    const overviewBlock = state.lens && (
        <div className="zoom-overview" aria-hidden="true">
            <div className="zoom-overview-line">
                <span className="zoom-overview-axis" />
                <span className="zoom-overview-band" style={{ left: `${bandLeft}%`, width: `${Math.max(0.8, bandRight - bandLeft)}%` }} />
                {[first, second].map((value, index) => (
                    <span key={index} className="zoom-overview-dot" style={{ left: `${overview(value.numerator / value.denominator)}%` }} />
                ))}
                <span className="zoom-overview-end start">{whole.low}</span>
                <span className="zoom-overview-end end">{whole.high}</span>
                <span className="zoom-badge">{times(zoomFactor)}</span>
            </div>
            <svg className="zoom-connector" viewBox="0 0 100 30" preserveAspectRatio="none">
                <polygon points={`${bandLeft},0 ${bandRight},0 100,30 0,30`} />
                <line x1={bandLeft} y1={0} x2={0} y2={30} vectorEffect="non-scaling-stroke" />
                <line x1={bandRight} y1={0} x2={100} y2={30} vectorEffect="non-scaling-stroke" />
            </svg>
        </div>
    )

    /* ---------- The magnified line ---------- */

    const flag = (value: FractionValue, row: 'one' | 'two', side: 'low' | 'high') => (
        <span className={`zoom-flag ${row} ${side}`} style={{ left: `${position(value.numerator / value.denominator)}%` }}>
            <span className="zoom-flag-bubble"><MathText inline text={`$${latex(value)}$`} /></span>
        </span>
    )

    const ends = pair ? l({ eu: `${plain(pair[0])} eta ${plain(pair[1])}`, es: `${plain(pair[0])} y ${plain(pair[1])}`, en: `${plain(pair[0])} and ${plain(pair[1])}`, ar: `${ltr(plain(pair[0]))} و${ltr(plain(pair[1]))}` }) : ''
    const line = (
        <div
            className="zoom-track"
            ref={trackRef}
            role="slider"
            tabIndex={0}
            aria-label={pair ? l({ eu: `Marra, ${ends} artean`, es: `Marca entre ${ends}`, en: `Mark between ${ends}`, ar: `علامة بين ${ends}` }) : l({ eu: 'Marra', es: 'Marca', en: 'Mark', ar: 'علامة' })}
            aria-disabled={between < 1}
            aria-valuemin={lowMark + 1}
            aria-valuemax={Math.max(lowMark + 1, highMark - 1)}
            aria-valuenow={state.picked ?? undefined}
            aria-valuetext={chosen ? plain(chosen) : l({ eu: 'bat ere ez', es: 'ninguna', en: 'none', ar: 'لا شيء' })}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            onKeyDown={onKey}
        >
            <span className="zoom-axis" aria-hidden="true" />
            {pair && (
                <span className="zoom-between" style={{ left: `${position(lowMark / denominator)}%`, width: `${position(highMark / denominator) - position(lowMark / denominator)}%` }} aria-hidden="true" />
            )}
            {marks.map((mark) => {
                const reduced = fraction(mark, denominator)
                const isEnd = pair !== null && (mark === lowMark || mark === highMark)
                const inside = pair !== null && mark > lowMark && mark < highMark
                return (
                    <span
                        key={`${reduced.numerator}/${reduced.denominator}`}
                        className={`zoom-tick ${reduced.denominator === 1 ? 'whole' : ''} ${inside ? 'inside' : ''} ${isEnd ? 'end' : ''} ${mark === state.picked ? 'picked' : ''} ${drawAll ? '' : 'sparse'}`}
                        style={{ left: `${position(mark / denominator)}%` }}
                        aria-hidden="true"
                    >
                        {showLabel(mark) && <MarkLabel mark={mark} denominator={denominator} />}
                    </span>
                )
            })}
            {state.picked !== null && <span className="zoom-dot" style={{ left: `${position(state.picked / denominator)}%` }} aria-hidden="true" />}
            {meanShown && mean && <span className="zoom-mean" style={{ left: `${position(mean.numerator / mean.denominator)}%` }} aria-hidden="true" />}
            {pair ? (
                <>
                    {flag(pair[0], 'one', 'low')}
                    {flag(pair[1], 'two', 'high')}
                </>
            ) : flag(first, 'one', 'low')}
        </div>
    )

    /* ---------- Zoom buttons and the trail of views ---------- */

    const lensBetween = (left: FractionValue, right: FractionValue) =>
        l({ eu: `Lupa: ${plain(left)} eta ${plain(right)} artean`, es: `Lupa entre ${plain(left)} y ${plain(right)}`, en: `Zoom between ${plain(left)} and ${plain(right)}`, ar: `العدسة بين ${ltr(plain(left))} و${ltr(plain(right))}` })
    const actions = pair && (
        <div className="zoom-actions">
            {canZoomIn(state) && (
                <button type="button" className="fraction-v2-primary" onClick={() => act(zoomIn)}>{l({ eu: 'Hurbildu lupa', es: 'Acercar la lupa', en: 'Zoom in', ar: 'قرّب العدسة' })}</button>
            )}
            {chosen && zooms < ZOOM_LIMITS.maxZooms && (
                <>
                    <button type="button" className="fraction-v2-primary" onClick={() => act((current) => zoomBeside(current, 'left'))}>{lensBetween(pair[0], chosen)}</button>
                    <button type="button" className="fraction-v2-primary" onClick={() => act((current) => zoomBeside(current, 'right'))}>{lensBetween(chosen, pair[1])}</button>
                </>
            )}
            {zooms > 0 && (
                <button type="button" className="fraction-v2-secondary" onClick={() => act((current) => zoomBack(current))}>{l({ eu: 'Pauso bat atzera', es: 'Un paso atrás', en: 'One step back', ar: 'خطوة إلى الوراء' })}</button>
            )}
            {state.lens && (
                <button type="button" className="fraction-v2-secondary" onClick={() => act(zoomOut)}>{l({ eu: 'Urrundu lupa', es: 'Alejar la lupa', en: 'Zoom out', ar: 'أبعِد العدسة' })}</button>
            )}
        </div>
    )

    // Each view left behind, then the one on screen: the stretch keeps getting smaller
    const trail = zooms > 0 && (
        <nav className="zoom-trail" aria-label={l({ eu: 'Luparen bidea', es: 'Camino de la lupa', en: 'Zoom path', ar: 'مسار العدسة' })}>
            <span className="zoom-trail-title">{l({ eu: 'Luparen bidea', es: 'Camino de la lupa', en: 'Zoom path', ar: 'مسار العدسة' })}</span>
            <ol>
                {[...state.trail, null].map((view, index) => {
                    const shown = view === null ? state : { ...state, ...view }
                    const shownPair = zoomPair(shown)
                    if (!shownPair) return null
                    const label = <bdi dir="ltr">{plain(shownPair[0])} … {plain(shownPair[1])} <small>{times(magnification(shown))}</small></bdi>
                    return (
                        <li key={index}>
                            {view === null
                                ? <span className="zoom-trail-step current" aria-current="step">{label}</span>
                                : <button type="button" className="zoom-trail-step" onClick={() => act((current) => zoomBack(current, index))}>{label}</button>}
                        </li>
                    )
                })}
            </ol>
        </nav>
    )

    const meanBlock = pair && chosen && mean && (
        <div className="zoom-mean-box">
            <button type="button" className="zoom-mean-toggle" aria-expanded={showMean} onClick={() => setShowMean((open) => !open)}>
                {l({ eu: 'Beste modu bat: batez bestekoa', es: 'Otra forma: la media', en: 'Another way: the mean', ar: 'طريقة أخرى: المتوسط' })}
                <span aria-hidden="true">{showMean ? '−' : '+'}</span>
            </button>
            {showMean && (
                <div className="zoom-mean-body">
                    <p>{l({ eu: 'Bi zatikiren batez bestekoa beti dago justu erdian: batu biak eta hartu erdia.', es: 'La media de dos fracciones queda siempre justo en medio: suma las dos y toma la mitad.', en: 'The mean of two fractions is always exactly in the middle: add the two and take half.', ar: 'متوسط كسرين يقع دائمًا في المنتصف تمامًا: اجمعهما وخذ النصف.' })}</p>
                    <p className="zoom-mean-formula" dir="ltr"><MathText inline text={`$\\frac{1}{2}\\cdot\\left(${latex(pair[0])}+${latex(pair[1])}\\right)=\\frac{1}{2}\\cdot${latex(add(pair[0], pair[1]))}=${latex(mean)}$`.replaceAll('\\frac', '\\dfrac')} /></p>
                    <p>
                        <span className="zoom-mean-key" aria-hidden="true" />
                        {equals(mean, chosen)
                            ? l({ eu: 'Zuk aukeratutakoa da, hain zuzen!', es: '¡Es justo la que has elegido!', en: 'That is exactly the one you chose!', ar: 'إنه بالضبط الكسر الذي اخترته!' })
                            : l({ eu: 'Bien arteko beste zatiki bat da, zurea ez bezalakoa.', es: 'Es otra fracción entre las dos, distinta de la tuya.', en: 'It is another fraction between the two, different from yours.', ar: 'إنه كسر آخر بينهما غير الذي اخترته.' })}
                    </p>
                </div>
            )}
        </div>
    )

    const message = (() => {
        if (!pair) return l({ eu: 'Balio bera dute: zenbaki-zuzeneko puntu bera dira, eta ez dago ezer bien artean.', es: 'Valen lo mismo: son el mismo punto de la recta y entre ellas no hay nada.', en: 'They are equal: they are the same point on the number line and there is nothing between them.', ar: 'لهما القيمة نفسها: هما النقطة نفسها على الخط ولا شيء بينهما.' })
        if (chosen) {
            const found = l({ eu: `Bat aurkitu duzu: ${plain(chosen)}. ${plain(pair[0])} eta ${plain(pair[1])} artean dago.`, es: `¡Ya tienes una! ${plain(chosen)} está entre ${plain(pair[0])} y ${plain(pair[1])}.`, en: `You have found one! ${plain(chosen)} is between ${plain(pair[0])} and ${plain(pair[1])}.`, ar: `وجدت واحدًا: ${ltr(plain(chosen))}، وهو بين ${ltr(plain(pair[0]))} و${ltr(plain(pair[1]))}.` })
            if (zooms >= ZOOM_LIMITS.maxZooms) return `${found} ${l({ eu: 'Amaierarik gabe jarrai dezakezu: bi zatiki desberdinen artean beti dago beste bat.', es: 'Podrías seguir sin fin: entre dos fracciones distintas siempre hay otra.', en: 'You could keep going forever: between two different fractions there is always another one.', ar: 'يمكنك أن تستمر بلا نهاية: بين كسرين مختلفين يوجد دائمًا كسر آخر.' })}`
            if (canZoomIn(state)) return `${found} ${l({ eu: 'Hurbildu lupa, hurbiletik ikusteko.', es: 'Acerca la lupa para verla de cerca.', en: 'Zoom in to see it up close.', ar: 'قرّب العدسة لتراه عن قرب.' })}`
            return `${found} ${l({ eu: 'Hurbildu lupa haren eta mutur baten artean: berriro egongo da hutsunea.', es: 'Acerca la lupa entre ella y uno de los extremos: volverá a haber hueco.', en: 'Zoom in between it and one of the ends: there will be a gap again.', ar: 'قرّب العدسة بينه وبين أحد الطرفين: سيظهر فراغ من جديد.' })}`
        }
        if (between === 0) return l({ eu: `${denominator} izendatzailearekin ez dago marrarik bien artean. Zatitu zati bakoitza bitan: bi zatikien gaiak bikoiztea da.`, es: `Con denominador ${denominator} no queda ninguna marca entre las dos. Parte cada trozo en 2: es multiplicar por 2 los términos de las dos fracciones.`, en: `With denominator ${denominator} there is no mark left between the two. Split each piece into 2: it means multiplying both terms of both fractions by 2.`, ar: `بالمقام ${denominator} لا توجد أي علامة بينهما. قسّم كل جزء إلى 2: هذا ضرب حدّي كل كسر في 2.` })
        return l({ eu: `Bien artean ${between === 1 ? 'marra bat dago' : `${between} marra daude`}. Sakatu horietako bat, tarteko zatiki bat aukeratzeko.`, es: `Entre las dos hay ${between === 1 ? '1 marca' : `${between} marcas`}. Toca una para elegir una fracción en medio.`, en: `There are ${between === 1 ? '1 marca' : `${between} marcas`} between the two. Tap one to choose a fraction in between.`, ar: `عدد العلامات بينهما: ${between}. اضغط على إحداها لتختار كسرًا في الوسط.` })
    })()

    /* ---------- Readout: the chain in the common denominator, in pieces that can wrap ---------- */

    const scaled = (mark: number) => `\\frac{${mark}}{${denominator}}`
    const named = (value: FractionValue, mark: number, side: 'left' | 'right') => {
        const written = latex(value)
        const common = scaled(mark)
        if (written === common) return written
        return side === 'left' ? `${written}=${common}` : `${common}=${written}`
    }
    const pieces = (() => {
        if (!pair) return [`${latex(first)}=${latex(second)}`]
        const middle = chosen && state.picked !== null ? [`${scaled(state.picked)}${chosen.denominator !== denominator ? `=${latex(chosen)}` : ''}`] : []
        return [named(pair[0], lowMark, 'left'), ...middle, named(pair[1], highMark, 'right')]
    })()

    const readout = (
        <>
            <span className="fraction-v2-lab-readout-main zoom-chain" dir="ltr">
                {pieces.map((piece, index) => (
                    <span key={index} className="zoom-chain-piece">
                        {index > 0 && <MathText inline text="$<$" />}
                        <MathText inline text={`$${piece}$`} />
                    </span>
                ))}
            </span>
            {pair && (
                <span className="fraction-v2-lab-readout-note">
                    {l({ eu: 'Izendatzaile komuna', es: 'Denominador común', en: 'Common denominator', ar: 'المقام المشترك' })}: <bdi dir="ltr">{denominator}</bdi>
                    {state.lens && <> · {l({ eu: 'handipena', es: 'aumento', en: 'magnification', ar: 'التكبير' })}: <bdi dir="ltr">{times(zoomFactor)}</bdi></>}
                    {zooms > 0 && <> · {l({ eu: 'hurbilketak', es: 'acercamientos', en: 'zoom-ins', ar: 'مرات التقريب' })}: <bdi dir="ltr">{zooms}</bdi></>}
                </span>
            )}
        </>
    )

    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={zoomChallenges} extraChallenges={zoomExtra} state={state}>
            <div className="zoom">
                {overviewBlock}
                <div className="zoom-line">{line}</div>
                {!drawAll && <p className="zoom-dense-note">{l({ eu: 'Marra gehiegi daude denak marrazteko: hurbildu lupa.', es: 'Demasiadas marcas para dibujarlas todas: acerca la lupa.', en: 'Too many marks to draw them all: zoom in.', ar: 'العلامات أكثر من أن تُرسم كلها: قرّب العدسة.' })}</p>}
                {actions}
                {meanBlock}
                {trail}
                <p className="fraction-v2-insight" aria-live="polite">{message}</p>
            </div>
        </ToolFrame>
    )
}
