import { useState } from 'react'
import { MathText } from '../../../components/MathText'
import { NumberField } from '../../../features/unit-v2/lab/NumberField'
import { fraction, multiply, subtract, type FractionValue } from '../math/fraction'
import {
    BAR_LIMITS,
    barChallenges,
    barFractions,
    barSegmentNames,
    barSegmentPieces,
    barSegments,
    barSolution,
    barValues,
    initialBarModelState,
    setBarModel,
    type BarModelState,
    type BarRow,
    type BarSegment,
    type BarStep
} from './barModel'
import { resultVisible, type ToolProps } from './labTools'
import { ResultAnswer, Segmented, Stepper, ToolFrame } from './LabKit'
import { useLabText } from './useLabText'
import './BarModel.css'

const valueLatex = (value: FractionValue) => value.denominator === 1 ? String(value.numerator) : `\\frac{${value.numerator}}{${value.denominator}}`
const valueText = (value: FractionValue) => value.denominator === 1 ? String(value.numerator) : `${value.numerator}/${value.denominator}`

const remainderName = { eu: 'Geratzen dena', es: 'Lo que queda', en: 'What is left', ar: 'الباقي' }
const pieceNames: Record<BarRow, { eu: string; es: string; en: string; ar: string }> = {
    whole: { eu: 'Barraren zati bat', es: 'Una parte de la barra', en: 'A part of the bar', ar: 'جزء من الشريط' },
    rest: { eu: 'Geratzen denaren zati bat', es: 'Un trozo de lo que queda', en: 'A piece of what is left', ar: 'جزء من الباقي' }
}

export function BarModelTool(props: ToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<BarModelState>(initialBarModelState)
    const update = (patch: Parameters<typeof setBarModel>[1]) => setState((current) => setBarModel(current, patch))
    const fractions = barFractions(state)
    const values = barValues(state)
    const steps = barSolution(state)
    const expected = values?.[state.asked] ?? fraction(0)
    const shown = values !== null && resultVisible(state, expected)
    const segmentOptions = barSegments(state).map((segment) => ({ value: segment, label: l(barSegmentNames[segment]) }))

    const controls = (
        <>
            <h3>{l({ eu: 'Barra', es: 'La barra', en: 'The bar', ar: 'الشريط' })}</h3>
            <Stepper label={l({ eu: 'Barraren zatiak', es: 'Partes de la barra', en: 'Parts of the bar', ar: 'أجزاء الشريط' })} value={state.parts} min={BAR_LIMITS.minParts} max={BAR_LIMITS.maxParts} onChange={(parts) => update({ parts })} language={props.language} />
            <Stepper label={l(barSegmentNames.first)} value={state.first} min={0} max={state.parts} onChange={(first) => update({ first })} language={props.language} />
            <Segmented
                label={l(barSegmentNames.second)}
                value={state.secondOf}
                options={[
                    { value: 'none', label: l({ eu: 'Ez dago', es: 'No hay', en: 'None', ar: 'لا يوجد' }) },
                    { value: 'whole', label: l({ eu: 'Osoarena', es: 'Del total', en: 'Of the whole', ar: 'من الكل' }) },
                    { value: 'rest', label: l({ eu: 'Geratzen denarena', es: 'De lo que queda', en: 'Of what is left', ar: 'من الباقي' }) }
                ]}
                onChange={(secondOf) => update({ secondOf })}
            />
            {state.secondOf === 'whole' && (
                <Stepper label={l({ eu: '2. zatiaren zatiak', es: 'Partes de la 2.ª', en: 'Parts of the 2nd part', ar: 'أجزاء الجزء الثاني' })} value={state.second} min={0} max={state.parts - state.first} onChange={(second) => update({ second })} language={props.language} />
            )}
            {state.secondOf === 'rest' && (
                <>
                    <Stepper label={l({ eu: 'Geratzen denaren zatiak', es: 'Partes de lo que queda', en: 'Parts of what is left', ar: 'أجزاء الباقي' })} value={state.restParts} min={BAR_LIMITS.minParts} max={BAR_LIMITS.maxParts} onChange={(restParts) => update({ restParts })} language={props.language} />
                    <Stepper label={l({ eu: 'Hartutako zatiak', es: 'Partes que se toman', en: 'Parts taken', ar: 'الأجزاء المأخوذة' })} value={state.second} min={0} max={state.restParts} onChange={(second) => update({ second })} language={props.language} />
                </>
            )}
            <h3>{l({ eu: 'Datuak', es: 'Los datos', en: 'The data', ar: 'المعطيات' })}</h3>
            <Segmented label={l({ eu: 'Datua', es: 'Dato', en: 'Given', ar: 'المعطى' })} value={state.known} options={segmentOptions} onChange={(known) => update({ known })} />
            <NumberField label={l({ eu: 'Datuaren balioa', es: 'Valor del dato', en: 'Given value', ar: 'قيمة المعطى' })} value={state.knownValue} min={BAR_LIMITS.minValue} max={BAR_LIMITS.maxValue} onChange={(knownValue) => update({ knownValue })} language={props.language} />
            <Segmented label={l({ eu: 'Galdera', es: 'Pregunta', en: 'Question', ar: 'السؤال' })} value={state.asked} options={segmentOptions} onChange={(asked) => update({ asked })} />
        </>
    )

    // Fractions of the whole: the second part of a remainder is a fraction of a fraction, so a product
    const restFraction = fraction(state.parts - state.first, state.parts)
    const fractionLines: Array<{ segment: BarSegment | 'remainder'; latex: string }> = [
        { segment: 'first', latex: valueLatex(fractions.first) }
    ]
    if (state.secondOf === 'rest') {
        fractionLines.push({ segment: 'remainder', latex: `1-${valueLatex(fractions.first)}=${valueLatex(restFraction)}` })
        fractionLines.push({ segment: 'second', latex: `\\frac{${state.second}}{${state.restParts}}\\cdot${valueLatex(restFraction)}=${valueLatex(fractions.second)}` })
    } else if (state.secondOf === 'whole') {
        fractionLines.push({ segment: 'second', latex: valueLatex(fractions.second) })
    }
    fractionLines.push({
        segment: 'left',
        latex: `1-${valueLatex(fractions.first)}${state.secondOf === 'none' ? '' : `-${valueLatex(fractions.second)}`}=${valueLatex(fractions.left)}`
    })

    const stepLine = (step: BarStep) => step.kind === 'split'
        ? { name: l(pieceNames[step.row]), latex: `${valueLatex(step.value)}\\div ${step.count}=${valueLatex(step.piece)}` }
        : { name: l(step.subject === 'remainder' ? remainderName : barSegmentNames[step.subject]), latex: `${step.count}\\cdot${valueLatex(step.piece)}=${valueLatex(step.value)}` }

    const readout = (
        <div className="bar-model-readout">
            <p className="bar-model-readout-title">{l({ eu: 'Osoaren zatikiak', es: 'Fracciones del total', en: 'Fractions of the whole', ar: 'الكسور من الكل' })}</p>
            <ul className="bar-model-fractions">
                {fractionLines.map((line) => (
                    <li key={line.segment}>
                        <i className={`bar-model-swatch ${line.segment}`} aria-hidden="true" />
                        <span>{l(line.segment === 'remainder' ? remainderName : barSegmentNames[line.segment])}:</span>
                        <bdi dir="ltr"><MathText text={`$${line.latex}$`} /></bdi>
                    </li>
                ))}
            </ul>
            {values === null ? (
                <p className="bar-model-readout-warning">{l({
                    eu: 'Datua ezin da zati huts batean egon: aukeratu beste bat edo koloreztatu zatiren bat.',
                    es: 'El dato no puede estar en una parte vacía: elige otro o colorea alguna parte.',
                    en: 'The given value can’t go in an empty part: choose another part or colour some of the parts.',
                    ar: 'لا يمكن أن يكون المعطى في جزء فارغ: اختر غيره أو لوّن بعض الأجزاء.'
                })}</p>
            ) : (
                <>
                    <p className="bar-model-question">
                        <span>{l(barSegmentNames[state.known])} = <bdi dir="ltr">{state.knownValue}</bdi></span>
                        <span>{l(barSegmentNames[state.asked])} = {shown ? <bdi dir="ltr">{valueText(expected)}</bdi> : '?'}</span>
                    </p>
                    <ResultAnswer language={props.language} state={state} expected={expected} onChange={(patch) => setState((current) => ({ ...current, ...patch }))} />
                    {shown && steps && (
                        <ol className="bar-model-steps">
                            {steps.map((step, index) => {
                                const line = stepLine(step)
                                return (
                                    <li key={index}>
                                        <span>{line.name}:</span>
                                        <bdi dir="ltr"><MathText text={`$${line.latex}$`} /></bdi>
                                    </li>
                                )
                            })}
                        </ol>
                    )}
                </>
            )}
        </div>
    )

    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={barChallenges} state={state}>
            <BarDiagram state={state} values={values} shown={shown} language={props.language} />
        </ToolFrame>
    )
}

/* ---------- The drawing ---------- */

const X0 = 20
const WIDTH = 320
const ROW_HEIGHT = 46
const WHOLE_Y = 78
const REST_Y = 172

/** Horizontal bracket over or under [x1, x2], with its label away from the bar */
function Bracket({ x1, x2, y, up, label, kind, segment, found }: { x1: number; x2: number; y: number; up: boolean; label: string; kind: 'known' | 'asked'; segment: BarSegment; found: boolean }) {
    // y is the end of the arms next to the bar; the bar of the bracket is 9 away from it
    const line = up ? y - 9 : y + 9
    const middle = (x1 + x2) / 2
    const tip = up ? line - 5 : line + 5
    return (
        <g className={`bar-model-bracket ${segment} ${kind} ${found ? 'found' : ''}`}>
            <path d={`M${x1 + 1},${y} V${line} H${x2 - 1} V${y} M${middle},${line} V${tip}`} />
            <text x={middle} y={up ? tip - 6 : tip + 17} textAnchor="middle">{label}</text>
        </g>
    )
}

function BarDiagram({ state, values, shown, language }: { state: BarModelState; values: ReturnType<typeof barValues>; shown: boolean; language: ToolProps['language'] }) {
    const l = useLabText(language)
    const rest = state.secondOf === 'rest'
    const height = rest ? 262 : WHOLE_Y + ROW_HEIGHT + 8
    const wholePiece = WIDTH / state.parts
    const restPiece = WIDTH / state.restParts
    const restX = X0 + wholePiece * state.first
    const total = values?.total ?? null
    const wholePieceValue = total && multiply(total, fraction(1, state.parts))
    const restPieceValue = total && multiply(total, multiply(subtract(fraction(1), fraction(state.first, state.parts)), fraction(1, state.restParts)))

    const wholeTone = (index: number) => {
        if (index < state.first) return 'first'
        if (rest) return 'remainder'
        if (state.secondOf === 'whole' && index < state.first + state.second) return 'second'
        return 'left'
    }

    /** Where a segment lies: its bar and its start and end in pieces of that bar */
    const span = (segment: BarSegment): { row: BarRow | 'top'; from: number; to: number } => {
        const { row, count } = barSegmentPieces(state, segment)
        if (segment === 'total') return { row: 'top', from: 0, to: state.parts }
        if (segment === 'first') return { row, from: 0, to: count }
        if (segment === 'second') return { row, from: rest ? 0 : state.first, to: (rest ? 0 : state.first) + count }
        const pieces = row === 'rest' ? state.restParts : state.parts
        return { row, from: pieces - count, to: pieces }
    }

    const brackets = (['known', 'asked'] as const)
        .filter((kind) => kind === 'known' || state.asked !== state.known)
        .map((kind) => {
            const segment = kind === 'known' ? state.known : state.asked
            const value = values?.[segment]
            const label = kind === 'known' || shown ? (value ? valueText(value) : String(state.knownValue)) : '?'
            const { row, from, to } = span(segment)
            if (from === to) return null
            const piece = row === 'rest' ? restPiece : wholePiece
            const [x1, x2] = [X0 + from * piece, X0 + to * piece]
            if (row === 'top') return <Bracket key={kind} x1={x1} x2={x2} y={38} up label={label} kind={kind} segment={segment} found={shown} />
            if (row === 'whole') return <Bracket key={kind} x1={x1} x2={x2} y={WHOLE_Y - 4} up label={label} kind={kind} segment={segment} found={shown} />
            return <Bracket key={kind} x1={x1} x2={x2} y={REST_Y + ROW_HEIGHT + 4} up={false} label={label} kind={kind} segment={segment} found={shown} />
        })

    const pieceLabel = (value: FractionValue | null, width: number) => {
        if (!shown || !value) return null
        const text = valueText(value)
        return text.length * 8 + 6 <= width ? text : null
    }

    const description = l({
        eu: `${state.parts} zatiko barra: ${state.first} 1. zatian.`,
        es: `Barra de ${state.parts} partes: ${state.first} en la 1.ª parte.`,
        en: `Bar of ${state.parts} parts: ${state.first} in the 1st part.`,
        ar: `شريط من ${state.parts} أجزاء: ${state.first} في الجزء الأول.`
    })

    return (
        <div className="bar-model">
            <svg viewBox={`0 0 360 ${height}`} role="img" aria-label={description}>
                {Array.from({ length: state.parts }, (_, index) => {
                    const label = pieceLabel(wholePieceValue, wholePiece)
                    return (
                        <g key={index} className={`bar-model-piece ${wholeTone(index)}`}>
                            <rect x={X0 + index * wholePiece} y={WHOLE_Y} width={wholePiece} height={ROW_HEIGHT} />
                            {label && <text x={X0 + (index + 0.5) * wholePiece} y={WHOLE_Y + ROW_HEIGHT / 2 + 5} textAnchor="middle">{label}</text>}
                        </g>
                    )
                })}
                <rect className="bar-model-outline" x={X0} y={WHOLE_Y} width={WIDTH} height={ROW_HEIGHT} rx={6} />
                {rest && (
                    <>
                        <path className="bar-model-zoom" d={`M${restX},${WHOLE_Y + ROW_HEIGHT} L${X0},${REST_Y} M${X0 + WIDTH},${WHOLE_Y + ROW_HEIGHT} L${X0 + WIDTH},${REST_Y}`} />
                        {Array.from({ length: state.restParts }, (_, index) => {
                            const label = pieceLabel(restPieceValue, restPiece)
                            return (
                                <g key={index} className={`bar-model-piece ${index < state.second ? 'second' : 'left'}`}>
                                    <rect x={X0 + index * restPiece} y={REST_Y} width={restPiece} height={ROW_HEIGHT} />
                                    {label && <text x={X0 + (index + 0.5) * restPiece} y={REST_Y + ROW_HEIGHT / 2 + 5} textAnchor="middle">{label}</text>}
                                </g>
                            )
                        })}
                        <rect className="bar-model-outline" x={X0} y={REST_Y} width={WIDTH} height={ROW_HEIGHT} rx={6} />
                    </>
                )}
                {brackets}
            </svg>
            <p className="fraction-v2-insight">
                {shown
                    ? l({ eu: 'Zati bat ezagututa, barra osoa ezagutzen da.', es: 'Conocido un trozo, se conoce toda la barra.', en: 'Once you know one piece, you know the whole bar.', ar: 'بمعرفة جزء واحد تُعرف قيمة الشريط كله.' })
                    : l({ eu: 'Bilatu zati batek zenbat balio duen: datua bere zatien artean banatzen da.', es: 'Busca cuánto vale un trozo: el dato se reparte entre sus trozos.', en: 'Find how much one piece is worth: the given value is shared between its pieces.', ar: 'ابحث عن قيمة جزء واحد: المعطى يتوزّع على أجزائه.' })}
            </p>
        </div>
    )
}
