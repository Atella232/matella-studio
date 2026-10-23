import { useRef, useState, type KeyboardEvent, type PointerEvent } from 'react'
import { MathText } from '../../../components/MathText'
import { fraction, type FractionValue } from '../math/fraction'
import type { ToolProps } from './labTools'
import { Stepper, ToolFrame } from './LabKit'
import {
    firstMarkBetween,
    initialZoomState,
    magnification,
    markOf,
    marksBetween,
    pickedValue,
    pickZoomMark,
    setZoomFraction,
    setZoomSplit,
    wholeWindow,
    zoomBeside,
    zoomChallenges,
    zoomDenominator,
    zoomExtra,
    zoomIn,
    zoomOut,
    zoomPair,
    zoomWindow,
    ZOOM_LIMITS,
    type ZoomState
} from './zoom'
import { useLabText } from './useLabText'
import './Zoom.css'

/** Beyond this many marks the line is a grey blur: only the chosen one is drawn */
const MAX_DRAWN_MARKS = 120
/** Labels under the marks only while they fit side by side on a phone */
const MAX_LABELLED_MARKS = 13

const latex = (value: FractionValue) => (value.denominator === 1 ? String(value.numerator) : `\\frac{${value.numerator}}{${value.denominator}}`)
const plain = (value: FractionValue) => (value.denominator === 1 ? String(value.numerator) : `${value.numerator}/${value.denominator}`)
/** In Arabic, a piece of arithmetic keeps its left-to-right order (LRI … PDI) */
const ltr = (text: string) => `\u2066${text}\u2069`

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
    const { first, second } = state
    const pair = zoomPair(state)
    const denominator = zoomDenominator(state)
    const between = marksBetween(state)
    const chosen = pickedValue(state)
    const { low, high } = zoomWindow(state)
    const position = (value: number) => ((value - low) / (high - low)) * 100
    const lowMark = pair ? markOf(pair[0], denominator) : 0
    const highMark = pair ? markOf(pair[1], denominator) : 0

    // Marks inside the window (a little slack keeps the ends when rounding)
    const firstMark = Math.ceil(low * denominator - 1e-9)
    const lastMark = Math.floor(high * denominator + 1e-9)
    const markCount = lastMark - firstMark + 1
    const drawMarks = markCount <= MAX_DRAWN_MARKS
    const labelMarks = markCount <= MAX_LABELLED_MARKS
    const marks = drawMarks ? Array.from({ length: markCount }, (_, index) => firstMark + index) : []

    const choose = (mark: number) => setState((current) => pickZoomMark(current, mark))
    const pickAt = (clientX: number) => {
        const track = trackRef.current
        if (!track) return
        const box = track.getBoundingClientRect()
        const ratio = Math.min(1, Math.max(0, (clientX - box.left) / box.width))
        choose(Math.round((low + ratio * (high - low)) * denominator))
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
        const moves: Record<string, number> = {
            ArrowRight: current === null ? start : current + 1,
            ArrowUp: current === null ? start : current + 1,
            ArrowLeft: current === null ? end : current - 1,
            ArrowDown: current === null ? end : current - 1,
            Home: start,
            End: end
        }
        if (!(event.key in moves)) return
        event.preventDefault()
        choose(moves[event.key])
    }

    const fractionControls = (which: 'first' | 'second', value: FractionValue, title: string) => (
        <>
            <h3>{title}</h3>
            <Stepper label={l({ eu: 'Zenbakitzailea', es: 'Numerador', ar: 'البسط' })} value={value.numerator} min={0} max={ZOOM_LIMITS.maxUnits * value.denominator} onChange={(next) => setState((current) => setZoomFraction(current, which, next, current[which].denominator))} language={props.language} />
            <Stepper label={l({ eu: 'Izendatzailea', es: 'Denominador', ar: 'المقام' })} value={value.denominator} min={ZOOM_LIMITS.minDenominator} max={ZOOM_LIMITS.maxDenominator} onChange={(next) => setState((current) => setZoomFraction(current, which, current[which].numerator, next))} language={props.language} />
        </>
    )

    const controls = (
        <>
            {fractionControls('first', first, l({ eu: 'Lehen zatikia', es: 'Primera fracción', ar: 'الكسر الأول' }))}
            {fractionControls('second', second, l({ eu: 'Bigarren zatikia', es: 'Segunda fracción', ar: 'الكسر الثاني' }))}
            <h3>{l({ eu: 'Marrak', es: 'Marcas', ar: 'العلامات' })}</h3>
            <Stepper label={l({ eu: 'Zati bakoitza, zenbat zatitan', es: 'Partir cada trozo en', ar: 'قسّم كل جزء إلى' })} value={state.split} min={ZOOM_LIMITS.minSplit} max={ZOOM_LIMITS.maxSplit} onChange={(next) => setState((current) => setZoomSplit(current, next))} language={props.language} />
            <p className="fraction-v2-lab-tip">{l({ eu: 'Sakatu edo arrastatu zuzenean marra bat aukeratzeko; teklatuarekin, geziak.', es: 'Toca o arrastra en la recta para elegir una marca; con el teclado, las flechas.', ar: 'اضغط على الخط أو اسحب لاختيار علامة؛ وبلوحة المفاتيح استعمل الأسهم.' })}</p>
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
                <span className="zoom-badge">×{zoomFactor >= 10 ? Math.round(zoomFactor) : Math.round(zoomFactor * 10) / 10}</span>
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

    const line = (
        <div
            className="zoom-track"
            ref={trackRef}
            role="slider"
            tabIndex={0}
            aria-label={l({ eu: 'Bien arteko marra', es: 'Marca entre las dos', ar: 'علامة بين الكسرين' })}
            aria-valuemin={lowMark + 1}
            aria-valuemax={Math.max(lowMark + 1, highMark - 1)}
            aria-valuenow={state.picked ?? undefined}
            aria-valuetext={chosen ? `${state.picked}/${denominator}` : l({ eu: 'bat ere ez', es: 'ninguna', ar: 'لا شيء' })}
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
                        className={`zoom-tick ${reduced.denominator === 1 ? 'whole' : ''} ${inside ? 'inside' : ''} ${isEnd ? 'end' : ''} ${mark === state.picked ? 'picked' : ''}`}
                        style={{ left: `${position(mark / denominator)}%` }}
                        aria-hidden="true"
                    >
                        {(labelMarks || reduced.denominator === 1 || mark === state.picked) && <MarkLabel mark={mark} denominator={denominator} />}
                    </span>
                )
            })}
            {!drawMarks && state.picked !== null && (
                <span className="zoom-tick inside picked" style={{ left: `${position(state.picked / denominator)}%` }} aria-hidden="true">
                    <MarkLabel mark={state.picked} denominator={denominator} />
                </span>
            )}
            {state.picked !== null && <span className="zoom-dot" style={{ left: `${position(state.picked / denominator)}%` }} aria-hidden="true" />}
            {pair ? (
                <>
                    {flag(pair[0], 'one', 'low')}
                    {flag(pair[1], 'two', 'high')}
                </>
            ) : flag(first, 'one', 'low')}
        </div>
    )

    /* ---------- Zoom buttons ---------- */

    const pairText = (left: FractionValue, right: FractionValue) => ltr(`${plain(left)} – ${plain(right)}`)
    const actions = pair && (
        <div className="zoom-actions">
            {!state.lens && (
                <button type="button" className="fraction-v2-primary" onClick={() => setState(zoomIn)}>{l({ eu: 'Hurbildu lupa', es: 'Acercar la lupa', ar: 'قرّب العدسة' })}</button>
            )}
            {state.lens && chosen && state.zooms < ZOOM_LIMITS.maxZooms && (
                <>
                    <button type="button" className="fraction-v2-primary" onClick={() => setState((current) => zoomBeside(current, 'left'))}>
                        {l({ eu: 'Lupa', es: 'Lupa', ar: 'العدسة' })}: {pairText(pair[0], chosen)}
                    </button>
                    <button type="button" className="fraction-v2-primary" onClick={() => setState((current) => zoomBeside(current, 'right'))}>
                        {l({ eu: 'Lupa', es: 'Lupa', ar: 'العدسة' })}: {pairText(chosen, pair[1])}
                    </button>
                </>
            )}
            {state.lens && (
                <button type="button" className="fraction-v2-secondary" onClick={() => setState(zoomOut)}>{l({ eu: 'Urrundu', es: 'Alejar', ar: 'بعّد' })}</button>
            )}
        </div>
    )

    const message = (() => {
        if (!pair) return l({ eu: 'Balio bera dute: zuzeneko puntu bera dira, eta ez dago ezer bien artean.', es: 'Valen lo mismo: son el mismo punto de la recta y entre ellas no hay nada.', ar: 'لهما القيمة نفسها: هما النقطة نفسها على الخط ولا شيء بينهما.' })
        if (state.zooms >= ZOOM_LIMITS.maxZooms && chosen) return l({ eu: 'Betiko jarrai zenezake: bi zatiki desberdinen artean beti dago beste bat.', es: 'Podrías seguir para siempre: entre dos fracciones distintas siempre hay otra.', ar: 'يمكنك أن تستمر إلى الأبد: بين كسرين مختلفين يوجد دائمًا كسر آخر.' })
        if (chosen && !state.lens) return l({ eu: 'Aurkitu duzu bat! Hurbildu lupa, hurbiletik ikusteko.', es: '¡Encontrada! Acerca la lupa para verla de cerca.', ar: 'وجدته! قرّب العدسة لتراه عن قرب.' })
        if (chosen) return l({ eu: 'Aurkitu duzu bat! Hurbildu lupa alde batera: berriro egongo da hutsunea.', es: '¡Encontrada! Acerca la lupa a un lado: volverá a haber hueco.', ar: 'وجدته! قرّب العدسة إلى أحد الجانبين: سيظهر فراغ من جديد.' })
        if (between === 0) return l({ eu: `${denominator} izendatzailearekin ez dago marrarik bien artean. Zatitu zati bakoitza bitan: bi zatikien gaiak bikoiztea da.`, es: `Con denominador ${denominator} no queda ninguna marca entre las dos. Parte cada trozo en 2: es multiplicar por 2 los términos de las dos fracciones.`, ar: `بالمقام ${denominator} لا توجد أي علامة بينهما. قسّم كل جزء إلى 2: هذا ضرب حدّي كل كسر في 2.` })
        return l({ eu: `Bien artean ${between === 1 ? 'marra bat dago' : `${between} marra daude`}. Sakatu bat, tarteko zatiki bat aukeratzeko.`, es: `Entre las dos hay ${between === 1 ? '1 marca' : `${between} marcas`}. Toca una para elegir una fracción en medio.`, ar: `عدد العلامات بينهما: ${between}. اضغط واحدة لتختار كسرًا في الوسط.` })
    })()

    /* ---------- Readout: the chain in the common denominator ---------- */

    const scaled = (mark: number) => `\\frac{${mark}}{${denominator}}`
    const named = (value: FractionValue, mark: number, side: 'left' | 'right') => {
        const written = latex(value)
        const common = scaled(mark)
        if (written === common) return written
        return side === 'left' ? `${written}=${common}` : `${common}=${written}`
    }
    const chain = (() => {
        if (!pair) return `${latex(first)}=${latex(second)}`
        const middle = chosen && state.picked !== null
            ? `<${scaled(state.picked)}${chosen.denominator !== denominator ? `=${latex(chosen)}` : ''}<`
            : '<'
        return `${named(pair[0], lowMark, 'left')}${middle}${named(pair[1], highMark, 'right')}`
    })()

    const readout = (
        <>
            <span className="fraction-v2-lab-readout-main"><MathText text={`$${chain}$`} /></span>
            {pair && (
                <span className="fraction-v2-lab-readout-note">
                    {l({ eu: 'Izendatzaile komuna', es: 'Denominador común', ar: 'المقام المشترك' })}: <bdi dir="ltr">{denominator}</bdi>
                    {state.lens && <> · {l({ eu: 'handipena', es: 'aumento', ar: 'التكبير' })}: <bdi dir="ltr">×{zoomFactor >= 10 ? Math.round(zoomFactor) : Math.round(zoomFactor * 10) / 10}</bdi></>}
                    {state.zooms > 0 && <> · {l({ eu: 'lupa', es: 'lupa', ar: 'العدسة' })}: <bdi dir="ltr">{state.zooms}</bdi></>}
                </span>
            )}
        </>
    )

    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={zoomChallenges} extraChallenges={zoomExtra} state={state}>
            <div className="zoom">
                {overviewBlock}
                <div className={`zoom-line ${labelMarks ? '' : 'dense'}`}>{line}</div>
                {!drawMarks && <p className="zoom-dense-note">{l({ eu: 'Marra gehiegi marrazteko: hurbildu lupa.', es: 'Demasiadas marcas para dibujarlas: acerca la lupa.', ar: 'العلامات أكثر من أن تُرسم: قرّب العدسة.' })}</p>}
                {actions}
                <p className="fraction-v2-insight" aria-live="polite">{message}</p>
            </div>
        </ToolFrame>
    )
}
