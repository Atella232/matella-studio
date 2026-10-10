import { useState } from 'react'
import { MathText } from '../../../components/MathText'
import { Segmented, Stepper, ToolFrame } from '../../../features/unit-v2/lab/LabKit'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import { useLabText } from '../../../features/unit-v2/lab/useLabText'
import { toLatex } from '../../../features/unit-v2/math/fraction'
import { signed, trendWord } from '../../dbh2-funtzioak-v2/functions'
import { Plane, PlaneGuides, PlanePath, PlanePoint } from '../../dbh2-funtzioak-v2/plane'
import { numberLatex, sampled, smoothThrough, type Point } from '../functions'
import {
    BOX_HEIGHT,
    BOX_WIDTH,
    boxChallenges,
    boxVolume,
    discriminant,
    DOMAIN_LIMIT,
    domainChallenges,
    domainGraphs,
    domainOf,
    domainRight,
    explorerChallenges,
    explorerCurve,
    explorerGraphs,
    explorerInfo,
    initialBoxState,
    initialDomainState,
    initialExplorerState,
    initialInterceptsState,
    initialPeriodicState,
    initialRateState,
    interceptsChallenges,
    PARABOLA_LIMIT,
    PERIODIC_MAX,
    periodicChallenges,
    periodicPatterns,
    periodicValue,
    rangeRight,
    rateChallenges,
    rateFunctions,
    rateOf,
    setBox,
    setDomain,
    setExplorer,
    setIntercepts,
    setPeriodic,
    setRate,
    xIntercepts,
    type BoxState,
    type DomainState,
    type ExplorerState,
    type InterceptsState,
    type PeriodicState,
    type RateState
} from './labTools'

const INK = 'var(--ink, #1d2733)'
const STAGE = 'var(--stage, #2f6fdb)'
const SECOND = 'var(--second, #c4432a)'
const GREEN = 'var(--success, #267b53)'
const MUTED = 'var(--muted, #58616e)'
const STAGE_TINT = 'var(--stage-tint, #dde7f7)'

/** A number for the readouts: decimal comma, decimal point in Arabic, true minus sign */
const plain = (language: string, value: number) => signed(Math.round(value * 100) / 100).replace('.', language === 'ar' ? '.' : ',')
/** The same in LaTeX */
const latexNumber = (language: string, value: number) => (language === 'ar' ? numberLatex(value).replace('{,}', '.') : numberLatex(value))

/* ---------- Domain and range ---------- */

export function DomainTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<DomainState>(initialDomainState)
    const graph = domainGraphs[state.graph]
    const step = (key: 'from' | 'to' | 'low' | 'high', label: string) => (
        <Stepper label={label} value={state[key]} min={-DOMAIN_LIMIT} max={DOMAIN_LIMIT} format={signed} onChange={(value) => setState((s) => setDomain(s, { [key]: value }))} language={props.language} />
    )
    const controls = (
        <>
            <Segmented label={l({ eu: 'Grafikoa', es: 'Gráfica', ar: 'الرسم' })} value={String(state.graph)} options={domainGraphs.map((item, index) => ({ value: String(index), label: l(item.short) }))} onChange={(next) => setState((s) => setDomain(s, { graph: Number(next) }))} />
            {step('from', l({ eu: 'Izate-eremua: hasiera', es: 'Dominio: desde', ar: 'المجال: من' }))}
            {step('to', l({ eu: 'Izate-eremua: amaiera', es: 'Dominio: hasta', ar: 'المجال: إلى' }))}
            {step('low', l({ eu: 'Ibiltartea: txikiena', es: 'Recorrido: desde', ar: 'المدى: من' }))}
            {step('high', l({ eu: 'Ibiltartea: handiena', es: 'Recorrido: hasta', ar: 'المدى: إلى' }))}
        </>
    )
    const mark = (right: boolean) => (right ? ' ✓' : '')
    const readout = (
        <>
            <span className="fraction-v2-lab-readout-main"><MathText text={`$\\text{Dom}\\,f=[${state.from},\\,${state.to}]$`} /></span>
            <span className="fraction-v2-lab-readout-main"><MathText text={`$\\text{Rec}\\,f=[${state.low},\\,${state.high}]$`} /></span>
            <span className="fraction-v2-lab-readout-note">
                {l({ eu: 'Izate-eremua', es: 'Dominio', ar: 'المجال' })}{mark(domainRight(state))}
                {' · '}
                {l({ eu: 'Ibiltartea', es: 'Recorrido', ar: 'المدى' })}{mark(rangeRight(state))}
            </span>
        </>
    )
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={domainChallenges} state={state}>
            <Plane box={{ xMin: -DOMAIN_LIMIT, xMax: DOMAIN_LIMIT, yMin: -DOMAIN_LIMIT + 2, yMax: DOMAIN_LIMIT - 1 }} cell={28} label={l({ eu: 'Grafikoa eta haren itzalak ardatzetan', es: 'La gráfica y sus sombras en los ejes', ar: 'الرسم وظلاله على المحورين' })}>
                {(map) => (
                    <g>
                        <line x1={map.x(state.from)} y1={map.y(0)} x2={map.x(state.to)} y2={map.y(0)} stroke={STAGE} strokeWidth={9} strokeLinecap="round" opacity={0.45} />
                        <line x1={map.x(0)} y1={map.y(state.low)} x2={map.x(0)} y2={map.y(state.high)} stroke={SECOND} strokeWidth={9} strokeLinecap="round" opacity={0.4} />
                        <PlanePath map={map} points={smoothThrough(graph.knots)} color={INK} width={3.4} />
                        <PlanePoint map={map} point={graph.knots[0]} color={INK} radius={5} />
                        <PlanePoint map={map} point={graph.knots[graph.knots.length - 1]} color={INK} radius={5} />
                    </g>
                )}
            </Plane>
        </ToolFrame>
    )
}

/* ---------- Intercepts of a parabola ---------- */

export function InterceptsTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<InterceptsState>(initialInterceptsState)
    const { b, c } = state
    const xs = xIntercepts(state)
    const delta = discriminant(state)
    const formula = `y=x^{2}${b === 0 ? '' : b > 0 ? `+${b === 1 ? '' : b}x` : `-${b === -1 ? '' : -b}x`}${c === 0 ? '' : c > 0 ? `+${c}` : `-${-c}`}`
    const controls = (
        <>
            <Stepper label="b" value={b} min={-PARABOLA_LIMIT} max={PARABOLA_LIMIT} format={signed} onChange={(value) => setState((s) => setIntercepts(s, { b: value }))} language={props.language} />
            <Stepper label="c" value={c} min={-PARABOLA_LIMIT} max={PARABOLA_LIMIT} format={signed} onChange={(value) => setState((s) => setIntercepts(s, { c: value }))} language={props.language} />
        </>
    )
    const cuts = xs.map((x) => `(${latexNumber(props.language, x)},\\,0)`).join('\\quad ')
    const readout = (
        <>
            <span className="fraction-v2-lab-readout-main"><MathText text={`$${formula}$`} /></span>
            <span className="fraction-v2-lab-readout-note"><MathText text={l({ eu: `Y ardatza: $(0,\\,${c})$`, es: `Eje Y: $(0,\\,${c})$`, ar: `محور Y: $(0,\\,${c})$` })} /></span>
            <span className="fraction-v2-lab-readout-note">
                <MathText text={`$b^{2}-4c=${delta}$`} />
                {' · '}
                {xs.length === 0
                    ? l({ eu: 'X ardatza ez du ebakitzen', es: 'no corta al eje X', ar: 'لا يقطع محور X' })
                    : <MathText text={l({ eu: `X ardatza: $${cuts}$`, es: `Eje X: $${cuts}$`, ar: `محور X: $${cuts}$` })} />}
            </span>
        </>
    )
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={interceptsChallenges} state={state}>
            <Plane box={{ xMin: -6, xMax: 6, yMin: -6, yMax: 6 }} cell={26} label={formula}>
                {(map, clip) => (
                    <g>
                        <PlanePath map={map} points={sampled((x) => x * x + b * x + c, -7, 7)} color={STAGE} width={3.4} clip={clip} />
                        {xs.filter((x) => Math.abs(x) <= 6).map((x) => <PlanePoint key={x} map={map} point={[x, 0]} color={GREEN} radius={6.5} />)}
                        {Math.abs(c) <= 6 && <PlanePoint map={map} point={[0, c]} color={SECOND} radius={6.5} name={`(0, ${signed(c)})`} dx={10} dy={c >= 0 ? -8 : 18} fontSize={13} />}
                    </g>
                )}
            </Plane>
        </ToolFrame>
    )
}

/* ---------- Walking along a graph ---------- */

export function ExplorerTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<ExplorerState>(initialExplorerState)
    const graph = explorerGraphs[state.graph]
    const [from, to] = domainOf(graph)
    const info = explorerInfo(state)
    const curve = explorerCurve(state.graph)
    const ys = graph.knots.map((point) => point[1])
    const box = { xMin: Math.min(0, from), xMax: Math.max(0, to), yMin: Math.min(0, ...ys) - (Math.min(...ys) < 0 ? 1 : 0), yMax: Math.max(...ys) + 1 }
    const controls = (
        <>
            <Segmented label={l({ eu: 'Grafikoa', es: 'Gráfica', ar: 'الرسم' })} value={String(state.graph)} options={explorerGraphs.map((item, index) => ({ value: String(index), label: l(item.short) }))} onChange={(next) => setState((s) => setExplorer(s, { graph: Number(next) }))} />
            <Stepper label={l({ eu: 'Kurtsorea: x =', es: 'Cursor: x =', ar: 'المؤشر: x =' })} value={state.x} min={from} max={to} format={signed} onChange={(x) => setState((s) => setExplorer(s, { x }))} language={props.language} />
        </>
    )
    const tags: string[] = []
    if (info.relative === 'max') tags.push(l({ eu: 'maximo erlatiboa', es: 'máximo relativo', ar: 'عظمى نسبية' }))
    if (info.relative === 'min') tags.push(l({ eu: 'minimo erlatiboa', es: 'mínimo relativo', ar: 'صغرى نسبية' }))
    if (info.absolute === 'max') tags.push(l({ eu: 'maximo absolutua', es: 'máximo absoluto', ar: 'عظمى مطلقة' }))
    if (info.absolute === 'min') tags.push(l({ eu: 'minimo absolutua', es: 'mínimo absoluto', ar: 'صغرى مطلقة' }))
    const exact = Math.abs(info.y - Math.round(info.y * 10) / 10) < 1e-9
    const readout = (
        <>
            <span className="fraction-v2-lab-readout-main"><MathText text={`$f(${state.x})${exact ? '=' : '\\approx '}${latexNumber(props.language, Math.round(info.y * 10) / 10)}$`} /></span>
            <span className="fraction-v2-lab-readout-note">
                {state.x < to
                    ? l({ eu: `Hemendik aurrera ${l(trendWord[info.trend])} da`, es: `A partir de aquí es ${l(trendWord[info.trend])}`, ar: `من هنا تكون ${l(trendWord[info.trend])}` })
                    : l({ eu: 'Grafikoaren amaiera', es: 'Final de la gráfica', ar: 'نهاية الرسم' })}
                {tags.length > 0 ? ` · ${tags.join(' · ')}` : ''}
            </span>
        </>
    )
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={explorerChallenges} state={state}>
            <p className="functions-lab-caption"><strong>{l(graph.title)}</strong></p>
            <Plane box={box} cell={Math.min(34, Math.floor(440 / (box.xMax - box.xMin)))} label={l(graph.title)}>
                {(map) => {
                    const before = curve.filter((point) => point[0] <= state.x)
                    return (
                        <g>
                            <PlanePath map={map} points={curve} color={STAGE} width={3.4} />
                            {before.length > 1 && <PlanePath map={map} points={before} color={SECOND} width={4.2} />}
                            <PlaneGuides map={map} point={[state.x, info.y]} />
                            <PlanePoint map={map} point={[state.x, info.y]} color={SECOND} radius={7.5} />
                        </g>
                    )
                }}
            </Plane>
        </ToolFrame>
    )
}

/* ---------- Average rate of change ---------- */

export function RateTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<RateState>(initialRateState)
    const fn = rateFunctions[state.fn]
    const rate = rateOf(state)
    const [a, b] = state.a <= state.b ? [state.a, state.b] : [state.b, state.a]
    const fa = fn.apply(a)
    const fb = fn.apply(b)
    const values = sampled(fn.apply, fn.from, fn.to).map((point) => point[1] / fn.yUnit)
    const box = { xMin: Math.min(0, fn.from), xMax: fn.to, yMin: Math.floor(Math.min(0, ...values)), yMax: Math.ceil(Math.max(...values)) + 1 }
    const controls = (
        <>
            <Segmented label={l({ eu: 'Funtzioa', es: 'Función', ar: 'الدالة' })} value={String(state.fn)} options={rateFunctions.map((item, index) => ({ value: String(index), label: item.label }))} onChange={(next) => setState((s) => setRate(s, { fn: Number(next) }))} />
            <Stepper label="a" value={state.a} min={fn.from} max={fn.to} format={signed} onChange={(value) => setState((s) => setRate(s, { a: value }))} language={props.language} />
            <Stepper label="b" value={state.b} min={fn.from} max={fn.to} format={signed} onChange={(value) => setState((s) => setRate(s, { b: value }))} language={props.language} />
        </>
    )
    const name = fn.latex.charAt(0)
    const readout = (
        <>
            <span className="fraction-v2-lab-readout-main"><MathText text={`$${fn.latex}$`} /></span>
            <span className="fraction-v2-lab-readout-main">
                {rate === null
                    ? l({ eu: 'a eta b desberdinak izan behar dira.', es: 'a y b tienen que ser distintos.', ar: 'يجب أن يختلف a وb.' })
                    : <MathText text={`$\\text{T.V.M.}\\,[${a},\\,${b}]=\\frac{${name}(${b})-${name}(${a})}{${b}-${a < 0 ? `(${a})` : a}}$`} />}
            </span>
            <span className="fraction-v2-lab-readout-main">
                {rate !== null && <MathText text={`$=\\frac{${fb}-${fa < 0 ? `(${fa})` : fa}}{${b - a}}=${toLatex(rate)}$`} />}
            </span>
            {rate !== null && (
                <span className="fraction-v2-lab-readout-note">
                    {rate.numerator > 0
                        ? l({ eu: 'Positiboa: batez beste hazten da.', es: 'Positiva: crece de media.', ar: 'موجب: تتزايد في المتوسط.' })
                        : rate.numerator < 0
                            ? l({ eu: 'Negatiboa: batez beste txikitzen da.', es: 'Negativa: decrece de media.', ar: 'سالب: تتناقص في المتوسط.' })
                            : l({ eu: '0: bi muturretan balio bera.', es: '0: el mismo valor en los dos extremos.', ar: '0: القيمة نفسها عند الطرفين.' })}
                </span>
            )}
        </>
    )
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={rateChallenges} state={state}>
            <Plane box={box} cell={Math.min(34, Math.floor(300 / (box.yMax - box.yMin)), Math.floor(440 / (box.xMax - box.xMin)))} yUnit={fn.yUnit} label={fn.label}>
                {(map, clip) => {
                    const A: Point = [a, fa / fn.yUnit]
                    const B: Point = [b, fb / fn.yUnit]
                    const slope = a === b ? 0 : (B[1] - A[1]) / (b - a)
                    return (
                        <g>
                            <PlanePath map={map} points={sampled((x) => fn.apply(x) / fn.yUnit, fn.from, fn.to)} color={STAGE} width={3.4} clip={clip} />
                            {a !== b && (
                                <g>
                                    <PlanePath map={map} points={[[box.xMin - 1, A[1] + slope * (box.xMin - 1 - a)], [box.xMax + 1, A[1] + slope * (box.xMax + 1 - a)]]} color={SECOND} width={2.2} dashed clip={clip} />
                                    <PlanePath map={map} points={[A, [b, A[1]]]} color={INK} width={3.2} />
                                    <PlanePath map={map} points={[[b, A[1]], B]} color={GREEN} width={3.2} />
                                </g>
                            )}
                            <PlanePoint map={map} point={A} color={SECOND} radius={6} name="A" dx={-9} dy={-9} anchor="end" />
                            <PlanePoint map={map} point={B} color={SECOND} radius={6} name="B" dx={9} dy={-9} />
                        </g>
                    )
                }}
            </Plane>
        </ToolFrame>
    )
}

/* ---------- Periodic functions ---------- */

export function PeriodicTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<PeriodicState>(initialPeriodicState)
    const pattern = periodicPatterns[state.pattern]
    const { q, r, y } = periodicValue(state)
    const span = 16
    const start = Math.max(0, Math.min(PERIODIC_MAX - span, Math.floor((state.x - 4) / pattern.period) * pattern.period))
    const points: Point[] = []
    for (let k = start / pattern.period; k * pattern.period <= start + span; k += 1) {
        const base = k * pattern.period
        if (state.pattern === 0) points.push([base, 0], [base + pattern.period, pattern.first(pattern.period - 1e-9) / pattern.yUnit], [base + pattern.period, 0])
        else [0, 1, 2, 3].forEach((offset) => points.push([base + offset, pattern.first(offset)]))
    }
    const controls = (
        <>
            <Segmented label={l({ eu: 'Funtzioa', es: 'Función', ar: 'الدالة' })} value={String(state.pattern)} options={periodicPatterns.map((item, index) => ({ value: String(index), label: l(item.short) }))} onChange={(next) => setState((s) => setPeriodic(s, { pattern: Number(next) }))} />
            <Stepper label="x" value={state.x} min={0} max={PERIODIC_MAX} step={pattern.step} format={(value) => plain(props.language, value)} onChange={(x) => setState((s) => setPeriodic(s, { x }))} language={props.language} />
        </>
    )
    const n = (value: number) => latexNumber(props.language, value)
    const readout = (
        <>
            <span className="fraction-v2-lab-readout-main"><MathText text={`$${n(state.x)}=${q}\\cdot ${pattern.period}+${n(r)}$`} /></span>
            <span className="fraction-v2-lab-readout-main"><MathText text={`$f(${n(state.x)})=f(${n(r)})=${n(y)}$`} /></span>
            <span className="fraction-v2-lab-readout-note">{l({ eu: `Periodoa: T = ${pattern.period}`, es: `Periodo: T = ${pattern.period}`, ar: `الدور: T = ${pattern.period}` })}{state.pattern === 0 ? l({ eu: ' · x minututan, y litrotan', es: ' · x en minutos, y en litros', ar: ' · x بالدقائق وy باللترات' }) : ''}</span>
        </>
    )
    const box = { xMin: start, xMax: start + span, yMin: 0, yMax: state.pattern === 0 ? 5 : 4 }
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={periodicChallenges} state={state}>
            <Plane box={box} cell={26} labelStep={2} yUnit={pattern.yUnit} label={l(pattern.short)}>
                {(map, clip) => (
                    <g>
                        <PlanePath map={map} points={points} color={STAGE} width={3.2} clip={clip} />
                        <PlaneGuides map={map} point={[state.x, y / pattern.yUnit]} />
                        <PlanePoint map={map} point={[state.x, y / pattern.yUnit]} color={SECOND} radius={7} />
                    </g>
                )}
            </Plane>
        </ToolFrame>
    )
}

/* ---------- The box made from a card ---------- */

export function BoxTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<BoxState>(initialBoxState)
    const volume = boxVolume(state)
    const s = 5
    const cut = state.x * s
    const controls = (
        <>
            <Stepper label="x (cm)" value={state.x} min={0.5} max={BOX_HEIGHT / 2 - 0.5} step={0.5} format={(value) => plain(props.language, value)} onChange={(x) => setState((current) => setBox(current, x))} language={props.language} />
        </>
    )
    const n = (value: number) => latexNumber(props.language, value)
    const readout = (
        <>
            <span className="fraction-v2-lab-readout-main"><MathText text={`$V(${n(state.x)})=${n(BOX_WIDTH - 2 * state.x)}\\cdot ${n(BOX_HEIGHT - 2 * state.x)}\\cdot ${n(state.x)}=${n(volume)}$`} /></span>
            <span className="fraction-v2-lab-readout-note">{l({ eu: 'cm³ · izate-eremua: 0 < x < 15', es: 'cm³ · dominio: 0 < x < 15', ar: 'سم³ · المجال: 0 < x < 15' })}</span>
        </>
    )
    const curve = sampled((x) => ((BOX_WIDTH - 2 * x) * (BOX_HEIGHT - 2 * x) * x) / 500, 0, 15, 0.25)
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={boxChallenges} state={state}>
            <svg viewBox="0 0 230 180" className="functions-plane" role="img" aria-label={l({ eu: 'Kartulina ebakita', es: 'La cartulina recortada', ar: 'الورق المقوى مقصوصًا' })} style={{ maxWidth: 300 }}>
                <rect x={15} y={15} width={BOX_WIDTH * s} height={BOX_HEIGHT * s} fill={STAGE_TINT} stroke={INK} strokeWidth={2} />
                {[[15, 15], [15 + BOX_WIDTH * s - cut, 15], [15, 15 + BOX_HEIGHT * s - cut], [15 + BOX_WIDTH * s - cut, 15 + BOX_HEIGHT * s - cut]].map(([x, y], index) => (
                    <rect key={index} x={x} y={y} width={cut} height={cut} fill="#fffcf6" stroke={SECOND} strokeWidth={1.6} strokeDasharray="4 3" />
                ))}
                <rect x={15 + cut} y={15 + cut} width={BOX_WIDTH * s - 2 * cut} height={BOX_HEIGHT * s - 2 * cut} fill="none" stroke={INK} strokeWidth={1.2} strokeDasharray="5 4" />
            </svg>
            <Plane box={{ xMin: 0, xMax: 15, yMin: 0, yMax: 7 }} cell={26} xUnit={1} yUnit={500} labelStep={2} xName="x" yName="V" label={`V(${state.x}) = ${volume}`}>
                {(map, clip) => (
                    <g>
                        <PlanePath map={map} points={curve} color={STAGE} width={3.2} clip={clip} />
                        <PlaneGuides map={map} point={[state.x, volume / 500]} />
                        <PlanePoint map={map} point={[state.x, volume / 500]} color={SECOND} radius={7} />
                        <text x={map.x(15) - 4} y={map.y(7) + 16} textAnchor="end" fontSize={13} fill={MUTED}>V (cm³)</text>
                    </g>
                )}
            </Plane>
        </ToolFrame>
    )
}
