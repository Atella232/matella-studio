import type { LabChallenge } from '../../../features/unit-v2/lab/types'
import { useRef, useState, type KeyboardEvent, type PointerEvent } from 'react'
import { MathText } from '../../../components/MathText'
import { fraction, toExactDecimal, toNumber, type FractionValue } from '../math/fraction'
import {
    initialNumberLineState,
    moveNumberLinePoint,
    numberLineBounds,
    numberLineChallenges,
    numberLineRanges,
    NUMBER_LINE_LIMITS,
    setNumberLineDenominator,
    setNumberLineRange,
    type NumberLineRange,
    type NumberLineState
} from './labTools'
import type { ToolProps } from './labTools'
import { Segmented, Stepper, ToolFrame } from './LabKit'
import { useLabText } from './useLabText'

/** Tick labels are only drawn while they still fit comfortably */
const MAX_LABELLED_TICKS = 17

function fractionLatex(value: FractionValue): string {
    if (value.denominator === 1) return String(value.numerator)
    return `${value.numerator < 0 ? '-' : ''}\\frac{${Math.abs(value.numerator)}}{${value.denominator}}`
}

function mixedLatex(value: FractionValue): string | null {
    const reduced = fraction(value.numerator, value.denominator)
    const absolute = Math.abs(reduced.numerator)
    if (reduced.denominator === 1 || absolute < reduced.denominator) return null
    const whole = Math.floor(absolute / reduced.denominator)
    return `${reduced.numerator < 0 ? '-' : ''}${whole}\\frac{${absolute % reduced.denominator}}{${reduced.denominator}}`
}

export function NumberLineTool(props: ToolProps & { challenges?: LabChallenge<NumberLineState>[]; ranges?: NumberLineRange[] }) {
    const l = useLabText(props.language)
    const [state, setState] = useState<NumberLineState>(initialNumberLineState)
    const trackRef = useRef<HTMLDivElement>(null)
    const dragging = useRef(false)
    const { denominator, numerator } = state
    const { min: minUnit, max: maxUnit } = numberLineRanges[state.range]
    const { min: minStep, max: maxStep } = numberLineBounds(state)
    const position = (step: number) => ((step / denominator - minUnit) / (maxUnit - minUnit)) * 100
    const steps = Array.from({ length: maxStep - minStep + 1 }, (_, index) => minStep + index)
    const showStepLabels = denominator > 1 && steps.length <= MAX_LABELLED_TICKS

    const value: FractionValue = { numerator, denominator }
    const reduced = fraction(numerator, denominator)
    const separator = props.language === 'ar' ? '.' : ','
    const exactDecimal = toExactDecimal(value, separator)
    const decimal = exactDecimal ?? toNumber(value).toFixed(3).replace('.', separator)
    const lower = Math.floor(numerator / denominator)
    const isWhole = numerator % denominator === 0

    const moveToPointer = (clientX: number) => {
        const track = trackRef.current
        if (!track) return
        const box = track.getBoundingClientRect()
        const ratio = Math.min(1, Math.max(0, (clientX - box.left) / box.width))
        const units = minUnit + ratio * (maxUnit - minUnit)
        setState((current) => moveNumberLinePoint(current, units * current.denominator))
    }

    const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
        dragging.current = true
        event.currentTarget.setPointerCapture(event.pointerId)
        moveToPointer(event.clientX)
    }

    const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
        if (dragging.current) moveToPointer(event.clientX)
    }

    const onPointerUp = () => {
        dragging.current = false
    }

    const onHandleKey = (event: KeyboardEvent<HTMLDivElement>) => {
        const moves: Record<string, number> = {
            ArrowRight: numerator + 1,
            ArrowUp: numerator + 1,
            ArrowLeft: numerator - 1,
            ArrowDown: numerator - 1,
            PageUp: numerator + denominator,
            PageDown: numerator - denominator,
            Home: minStep,
            End: maxStep
        }
        if (!(event.key in moves)) return
        event.preventDefault()
        setState((current) => moveNumberLinePoint(current, moves[event.key]))
    }

    const allRanges: Array<{ value: NumberLineRange; label: string }> = [
        { value: '0-1', label: '0 – 1' },
        { value: '0-2', label: '0 – 2' },
        { value: '0-3', label: '0 – 3' },
        { value: '-2-2', label: '−2 – 2' }
    ]
    const rangeOptions = allRanges.filter((option) => !props.ranges || props.ranges.includes(option.value))

    const controls = (
        <>
            <Segmented label={l({ eu: 'Tartea', es: 'Tramo', ar: 'المجال' })} value={state.range} options={rangeOptions} onChange={(next) => setState((current) => setNumberLineRange(current, next))} />
            <Stepper
                label={l({ eu: 'Jauziak unitateko', es: 'Saltos por unidad', ar: 'القفزات في كل وحدة' })}
                value={denominator}
                min={NUMBER_LINE_LIMITS.minDenominator}
                max={NUMBER_LINE_LIMITS.maxDenominator}
                onChange={(next) => setState((current) => setNumberLineDenominator(current, next))}
                language={props.language}
            />
            <Stepper
                label={l({ eu: 'Jauziak 0tik', es: 'Saltos desde el 0', ar: 'القفزات من 0' })}
                value={numerator}
                min={minStep}
                max={maxStep}
                onChange={(next) => setState((current) => moveNumberLinePoint(current, next))}
                language={props.language}
            />
            <p className="fraction-v2-lab-tip">{l({ eu: 'Arrastatu puntua edo erabili teklatuko geziak.', es: 'Arrastra el punto o usa las flechas del teclado.', ar: 'اسحب النقطة أو استعمل أسهم لوحة المفاتيح.' })}</p>
        </>
    )

    const readout = (
        <>
            <span className="fraction-v2-lab-readout-main">
                <MathText text={`$${fractionLatex(value)}$`} />
                {(reduced.denominator !== denominator) && (
                    <>
                        <span aria-hidden="true">=</span>
                        <MathText text={`$${fractionLatex(reduced)}$`} />
                    </>
                )}
                {mixedLatex(value) && (
                    <>
                        <span aria-hidden="true">=</span>
                        <MathText text={`$${mixedLatex(value)}$`} />
                    </>
                )}
                {!isWhole && (
                    <>
                        <span aria-hidden="true">{exactDecimal === null ? '≈' : '='}</span>
                        <span className="fraction-v2-lab-decimal">{decimal}</span>
                    </>
                )}
            </span>
            <span className="fraction-v2-lab-readout-note">
                {isWhole
                    ? l({ eu: 'Zenbaki osoa da.', es: 'Es un número entero.', ar: 'إنه عدد صحيح.' })
                    : l({ eu: `${lower} eta ${lower + 1} artean dago.`, es: `Está entre ${lower} y ${lower + 1}.`, ar: `يقع بين ${lower} و${lower + 1}.` })}
            </span>
        </>
    )

    const zero = position(0)
    const point = position(numerator)

    return (
        <ToolFrame
            {...props}
            controls={controls}
            readout={readout}
            challenges={props.challenges ?? numberLineChallenges}
            state={state}
        >
            <div className="fraction-v2-nl">
                <div
                    className="fraction-v2-nl-track"
                    ref={trackRef}
                    onPointerDown={onPointerDown}
                    onPointerMove={onPointerMove}
                    onPointerUp={onPointerUp}
                    onPointerCancel={onPointerUp}
                >
                    <span className="fraction-v2-nl-axis" aria-hidden="true" />
                    <span
                        className={`fraction-v2-nl-jumps ${numerator < 0 ? 'negative' : ''}`}
                        style={{ left: `${Math.min(zero, point)}%`, width: `${Math.abs(point - zero)}%` }}
                        aria-hidden="true"
                    />
                    {steps.map((step) => {
                        const whole = step % denominator === 0
                        return (
                            <span className={`fraction-v2-nl-tick ${whole ? 'whole' : ''}`} style={{ left: `${position(step)}%` }} key={step} aria-hidden="true">
                                {whole
                                    ? <span className="fraction-v2-nl-whole-label">{step / denominator < 0 ? `−${Math.abs(step / denominator)}` : step / denominator}</span>
                                    : showStepLabels && <span className="fraction-v2-nl-step-label">{step < 0 ? '−' : ''}{Math.abs(step)}/{denominator}</span>}
                            </span>
                        )
                    })}
                    <div
                        className="fraction-v2-nl-handle"
                        style={{ left: `${point}%` }}
                        role="slider"
                        tabIndex={0}
                        aria-label={l({ eu: 'Zuzeneko puntua', es: 'Punto en la recta', ar: 'النقطة على خط الأعداد' })}
                        aria-valuemin={minStep}
                        aria-valuemax={maxStep}
                        aria-valuenow={numerator}
                        aria-valuetext={`${numerator}/${denominator}`}
                        onKeyDown={onHandleKey}
                    >
                        <span className="fraction-v2-nl-flag"><MathText text={`$${fractionLatex(value)}$`} /></span>
                        <span className="fraction-v2-nl-dot" />
                    </div>
                </div>
            </div>
        </ToolFrame>
    )
}
