import { useState } from 'react'
import { MathText } from '../../../components/MathText'
import { Segmented, Stepper, ToolFrame } from '../../../features/unit-v2/lab/LabKit'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import { useLabText } from '../../../features/unit-v2/lab/useLabText'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import { signed } from '../../dbh2-funtzioak-v2/functions'
import { Plane, PlanePath, PlanePoint } from '../../dbh2-funtzioak-v2/plane'
import type { PlaneMap } from '../../dbh2-funtzioak-v2/planeMap'
import { sampled } from '../../dbh4-aplikatuak-grafikoa/functions'
import { localize } from '../../dbh4-akademikoak-trigonometria/text'
import { decimalSeparatorFor } from '../../../utils/numberFormat'
import {
    GROWTH_RATE,
    GROWTH_STARTS,
    GROWTH_T_MAX,
    growthChallenges,
    growthFactor,
    growthValue,
    initialGrowthState,
    initialLogShiftState,
    initialShiftState,
    initialWaveState,
    LOG_BASES,
    LOG_P_LIMIT,
    LOG_Q_LIMIT,
    logShiftAt,
    logShiftChallenges,
    logShiftZero,
    setGrowth,
    setLogShift,
    setShift,
    setWave,
    SHIFT_BASES,
    SHIFT_P_LIMIT,
    SHIFT_Q_LIMIT,
    shiftAt,
    shiftChallenges,
    shiftZero,
    WAVE_A_LIMIT,
    WAVE_D_LIMIT,
    WAVE_KS,
    waveAt,
    waveChallenges,
    wavePeriodPi,
    waveRange,
    type GrowthState,
    type LogShiftState,
    type ShiftState,
    type WaveFunction,
    type WaveState
} from './labTools'

const INK = 'var(--ink, #1d2733)'
const STAGE = 'var(--stage, #2f6fdb)'
const SECOND = 'var(--second, #c4432a)'
const GREEN = 'var(--success, #267b53)'
const MUTED = 'var(--muted, #58616e)'
const CARD = 'var(--card, #fffcf6)'
const GRID = 'var(--line, #d8d2c4)'

/** A number in LaTeX with the decimal comma (point in Arabic) */
const decimal = (language: string, value: number, digits = 2) => {
    const rounded = Math.round(value * 10 ** digits) / 10 ** digits
    return String(rounded).replace('.', language === 'ar' ? '.' : '{,}').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1\\,')
}
/** A base in LaTeX: 2, 3, 10 or \frac{1}{2} */
const baseLatex = (base: number) => (base === 0.5 ? '\\frac{1}{2}' : String(base))
const baseLabel = (base: number) => (base === 0.5 ? '1/2' : String(base))
/** x − p written as x-3, x+2 or x */
const shifted = (p: number) => (p === 0 ? 'x' : p > 0 ? `x-${p}` : `x+${-p}`)
const plus = (q: number) => (q === 0 ? '' : q > 0 ? `+${q}` : `-${-q}`)

/** A dashed line across the box: vertical at x or horizontal at y */
function Dashed({ map, x, y }: { map: PlaneMap; x?: number; y?: number }) {
    const { box } = map
    return x !== undefined
        ? <line x1={map.x(x)} y1={map.y(box.yMin)} x2={map.x(x)} y2={map.y(box.yMax)} stroke={MUTED} strokeWidth={2} strokeDasharray="7 5" />
        : <line x1={map.x(box.xMin)} y1={map.y(y!)} x2={map.x(box.xMax)} y2={map.y(y!)} stroke={MUTED} strokeWidth={2} strokeDasharray="7 5" />
}

/* ---------- Moving the exponential ---------- */

export function ShiftTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<ShiftState>(initialShiftState)
    const base = SHIFT_BASES[state.base]
    const formula = `y=${baseLatex(base) === '\\frac{1}{2}' ? '\\left(\\frac{1}{2}\\right)' : baseLatex(base)}^{${shifted(state.p)}}${plus(state.q)}`
    const zero = shiftZero(state)
    const box = { xMin: -5, xMax: 5, yMin: -5, yMax: 7 }
    const controls = (
        <>
            <Segmented label={l({ eu: 'Oinarria', es: 'Base', en: 'Base', ar: 'الأساس' })} value={String(state.base)} options={SHIFT_BASES.map((value, index) => ({ value: String(index), label: baseLabel(value) }))} onChange={(value) => setState((s) => setShift(s, { base: Number(value) }))} />
            <Stepper label="p" value={state.p} min={-SHIFT_P_LIMIT} max={SHIFT_P_LIMIT} format={signed} onChange={(value) => setState((s) => setShift(s, { p: value }))} language={props.language} />
            <Stepper label="q" value={state.q} min={-SHIFT_Q_LIMIT} max={SHIFT_Q_LIMIT} format={signed} onChange={(value) => setState((s) => setShift(s, { q: value }))} language={props.language} />
        </>
    )
    const readout = (
        <>
            <span className="fraction-v2-lab-readout-main"><MathText text={`$${formula}$`} /></span>
            <span className="fraction-v2-lab-readout-note"><MathText text={l({ eu: `Asintota: $y=${state.q}$ · $(0,\\,1)\\to(${state.p},\\,${1 + state.q})$`, es: `Asíntota: $y=${state.q}$ · $(0,\\,1)\\to(${state.p},\\,${1 + state.q})$`, en: `Asymptote: $y=${state.q}$ · $(0,\\,1)\\to(${state.p},\\,${1 + state.q})$`, ar: `المقارب: $y=${state.q}$ · $(0,\\,1)\\to(${state.p},\\,${1 + state.q})$` })} /></span>
            <span className="fraction-v2-lab-readout-note">
                {zero === null
                    ? l({ eu: 'Ez du X ardatza ebakitzen', es: 'No corta al eje X', en: 'It does not cross the x-axis.', ar: 'لا تقطع محور X' })
                    : <MathText text={l({ eu: `X ardatza: $x=${decimal(props.language, zero)}$`, es: `Eje X: $x=${decimal(props.language, zero)}$`, en: `x-axis: $x=${decimal(props.language, zero)}$`, ar: `محور X: $x=${decimal(props.language, zero)}$` })} />}
            </span>
        </>
    )
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={shiftChallenges} state={state}>
            <Plane box={box} cell={26} label={formula}>
                {(map, clip) => (
                    <g>
                        <Dashed map={map} y={state.q} />
                        <PlanePath map={map} points={sampled((x) => base ** x, -5.5, 5.5)} color={MUTED} width={2} dashed clip={clip} />
                        <PlanePath map={map} points={sampled((x) => shiftAt(state, x), -5.5, 5.5, 0.02)} color={STAGE} width={3.4} clip={clip} />
                        <PlanePoint map={map} point={[state.p, 1 + state.q]} color={SECOND} radius={6} />
                        {zero !== null && Math.abs(zero) <= 5 && <PlanePoint map={map} point={[zero, 0]} color={GREEN} radius={5.5} />}
                    </g>
                )}
            </Plane>
        </ToolFrame>
    )
}

/* ---------- Growth and decay ---------- */

export function GrowthTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<GrowthState>(initialGrowthState)
    const start = GROWTH_STARTS[state.k]
    const values = Array.from({ length: GROWTH_T_MAX + 1 }, (_, t) => growthValue(state, t))
    const top = Math.max(start * 1.1, ...values.slice(0, Math.max(state.t, 4) + 1))
    const factorLatex = decimal(props.language, growthFactor(state))
    const controls = (
        <>
            <Segmented label={l({ eu: 'Hasierako balioa', es: 'Valor inicial', en: 'Starting value', ar: 'القيمة الابتدائية' })} value={String(state.k)} options={GROWTH_STARTS.map((value, index) => ({ value: String(index), label: String(value) }))} onChange={(value) => setState((s) => setGrowth(s, { k: Number(value) }))} />
            <Stepper label={l({ eu: 'Ehunekoa urrats bakoitzean', es: 'Porcentaje en cada paso', en: 'Percentage at each step', ar: 'النسبة في كل خطوة' })} value={state.r} min={GROWTH_RATE.min} max={GROWTH_RATE.max} step={GROWTH_RATE.step} format={(value) => `${signed(value)} %`} onChange={(value) => setState((s) => setGrowth(s, { r: value }))} language={props.language} />
            <Stepper label={l({ eu: 'Urratsak (t)', es: 'Pasos (t)', en: 'Steps (t)', ar: 'الخطوات (t)' })} value={state.t} min={0} max={GROWTH_T_MAX} format={String} onChange={(value) => setState((s) => setGrowth(s, { t: value }))} language={props.language} />
        </>
    )
    const readout = (
        <>
            <span className="fraction-v2-lab-readout-main"><MathText text={`$y=${start}\\cdot ${factorLatex}^{t}$`} /></span>
            <span className="fraction-v2-lab-readout-main"><MathText text={`$t=${state.t}\\ \\to\\ y=${decimal(props.language, growthValue(state))}$`} /></span>
            <span className="fraction-v2-lab-readout-note">
                {state.r > 0 ? l({ eu: 'Hazkundea', es: 'Crecimiento', en: 'Growth', ar: 'نمو' }) : state.r < 0 ? l({ eu: 'Beherakuntza', es: 'Decrecimiento', en: 'Decay', ar: 'تناقص' }) : l({ eu: 'Konstantea', es: 'Constante', en: 'Constant', ar: 'ثابتة' })}
            </span>
        </>
    )
    // A bar chart: one bar per step up to 10, the chosen one highlighted
    const width = 360
    const height = 220
    const barWidth = 26
    const scale = (value: number) => (value / top) * (height - 30)
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={growthChallenges} state={state}>
            <svg viewBox={`0 0 ${width} ${height + 30}`} role="img" aria-label={l({ eu: 'Balioa urrats bakoitzean', es: 'El valor en cada paso', en: 'The value at each step', ar: 'القيمة في كل خطوة' })} style={{ width: '100%', maxWidth: 520, display: 'block', margin: '0 auto' }} direction="ltr">
                <rect x={0} y={0} width={width} height={height + 30} fill={CARD} />
                <line x1={20} y1={height} x2={width - 10} y2={height} stroke={INK} strokeWidth={2} />
                {values.map((value, t) => {
                    const h = Math.min(height - 10, scale(value))
                    return (
                        <g key={t}>
                            <rect x={24 + t * 30} y={height - h} width={barWidth} height={h} rx={3} fill={t === state.t ? SECOND : STAGE} opacity={t <= state.t ? 1 : 0.35} />
                            <text x={24 + t * 30 + barWidth / 2} y={height + 18} textAnchor="middle" fontSize={13} fill={MUTED}>{t}</text>
                        </g>
                    )
                })}
                <text x={24} y={18} fontSize={14} fontWeight={700} fill={INK}>{props.language === 'ar' ? growthValue(state) : String(growthValue(state)).replace('.', decimalSeparatorFor(props.language))}</text>
            </svg>
        </ToolFrame>
    )
}

/* ---------- Moving the logarithm ---------- */

export function LogShiftTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<LogShiftState>(initialLogShiftState)
    const base = LOG_BASES[state.base]
    const log = base === 10 ? '\\log' : `\\log_{${baseLatex(base)}}`
    const formula = `y=${log}${state.p === 0 ? '\\,x' : `(${shifted(state.p)})`}${plus(state.q)}`
    const zero = logShiftZero(state)
    const box = { xMin: -5, xMax: 7, yMin: -5, yMax: 5 }
    const controls = (
        <>
            <Segmented label={l({ eu: 'Oinarria', es: 'Base', en: 'Base', ar: 'الأساس' })} value={String(state.base)} options={LOG_BASES.map((value, index) => ({ value: String(index), label: baseLabel(value) }))} onChange={(value) => setState((s) => setLogShift(s, { base: Number(value) }))} />
            <Stepper label="p" value={state.p} min={-LOG_P_LIMIT} max={LOG_P_LIMIT} format={signed} onChange={(value) => setState((s) => setLogShift(s, { p: value }))} language={props.language} />
            <Stepper label="q" value={state.q} min={-LOG_Q_LIMIT} max={LOG_Q_LIMIT} format={signed} onChange={(value) => setState((s) => setLogShift(s, { q: value }))} language={props.language} />
        </>
    )
    const readout = (
        <>
            <span className="fraction-v2-lab-readout-main"><MathText text={`$${formula}$`} /></span>
            <span className="fraction-v2-lab-readout-note"><MathText text={`$\\text{Dom}\\,f=(${state.p},\\,+\\infty)$ · $x=${state.p}$`} /></span>
            <span className="fraction-v2-lab-readout-note"><MathText text={l({ eu: `$(1,\\,0)\\to(${state.p + 1},\\,${state.q})$ · X ardatza: $x=${decimal(props.language, zero, 3)}$`, es: `$(1,\\,0)\\to(${state.p + 1},\\,${state.q})$ · eje X: $x=${decimal(props.language, zero, 3)}$`, en: `$(1,\\,0)\\to(${state.p + 1},\\,${state.q})$ · x-axis: $x=${decimal(props.language, zero, 3)}$`, ar: `$(1,\\,0)\\to(${state.p + 1},\\,${state.q})$ · محور X: $x=${decimal(props.language, zero, 3)}$` })} /></span>
        </>
    )
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={logShiftChallenges} state={state}>
            <Plane box={box} cell={26} label={formula}>
                {(map, clip) => (
                    <g>
                        <Dashed map={map} x={state.p} />
                        <PlanePath map={map} points={sampled((x) => logShiftAt(state, x) ?? 0, state.p + 0.001, 7.5, 0.005).filter(([x]) => x > state.p)} color={STAGE} width={3.4} clip={clip} />
                        <PlanePoint map={map} point={[state.p + 1, state.q]} color={SECOND} radius={6} />
                        {zero <= 7 && <PlanePoint map={map} point={[zero, 0]} color={GREEN} radius={5.5} />}
                    </g>
                )}
            </Plane>
        </ToolFrame>
    )
}

/* ---------- The wave A · sen kx + d ---------- */

const PI_LABELS: Record<number, string> = { 1: 'π/2', 2: 'π', 3: '3π/2', 4: '2π', 5: '5π/2', 6: '3π', 7: '7π/2', 8: '4π' }

function WavePlane({ state, language }: { state: WaveState; language: UnitLanguage }) {
    const width = 520
    const height = 320
    const ox = 40
    const xMax = 4 * Math.PI
    const yMax = 6
    const x = (value: number) => ox + (value / xMax) * (width - ox - 20)
    const y = (value: number) => height / 2 - (value / yMax) * (height / 2 - 14)
    const points = sampled((value) => waveAt(state, value), 0, xMax, 0.02)
    const [low, high] = waveRange(state)
    const name = state.fn === 'cos' ? 'cos' : language === 'es' ? 'sen' : 'sin'
    return (
        <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label={`y = A ${name} kx + d`} style={{ width: '100%', maxWidth: 560, display: 'block', margin: '0 auto' }} direction="ltr">
            <rect x={0} y={0} width={width} height={height} fill={CARD} />
            {Array.from({ length: 9 }, (_, index) => index).map((quarter) => <line key={quarter} x1={x((quarter * Math.PI) / 2)} y1={8} x2={x((quarter * Math.PI) / 2)} y2={height - 8} stroke={GRID} strokeWidth={1} />)}
            {Array.from({ length: 13 }, (_, index) => index - 6).filter((value) => value % 2 === 0).map((value) => <line key={value} x1={ox} y1={y(value)} x2={width - 10} y2={y(value)} stroke={GRID} strokeWidth={1} />)}
            <rect x={ox} y={y(high)} width={width - ox - 10} height={y(low) - y(high)} fill={SECOND} opacity={0.08} />
            <line x1={ox} y1={y(0)} x2={width - 6} y2={y(0)} stroke={INK} strokeWidth={2} />
            <line x1={ox} y1={height - 6} x2={ox} y2={6} stroke={INK} strokeWidth={2} />
            {[-6, -4, -2, 2, 4, 6].map((value) => <text key={value} x={ox - 6} y={y(value) + 6} textAnchor="end" fontSize={17} fill={MUTED}>{value < 0 ? `−${-value}` : value}</text>)}
            {Object.entries(PI_LABELS).map(([quarter, label]) => <text key={quarter} x={x((Number(quarter) * Math.PI) / 2)} y={y(0) + 20} textAnchor="middle" fontSize={16} fill={MUTED}>{Number(quarter) % 2 === 0 ? label : ''}</text>)}
            <line x1={ox} y1={y(state.d)} x2={width - 10} y2={y(state.d)} stroke={MUTED} strokeWidth={1.6} strokeDasharray="6 5" />
            <polyline points={points.map(([px, py]) => `${x(px)},${y(py)}`).join(' ')} fill="none" stroke={STAGE} strokeWidth={3.4} strokeLinejoin="round" />
        </svg>
    )
}

export function WaveTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<WaveState>(initialWaveState)
    const k = WAVE_KS[state.k]
    const kLatex = k === 0.5 ? '\\frac{x}{2}' : k === 1 ? 'x' : `${k}x`
    const aLatex = state.a === 1 ? '' : state.a === -1 ? '-' : String(state.a)
    const fn = state.fn === 'sin' ? '\\sen' : '\\cos'
    const formula = localize(props.language, `y=${aLatex}${fn}\\,${kLatex}${plus(state.d)}`)
    const period = wavePeriodPi(state)
    const periodLatex = period === 1 ? '\\pi' : `${period}\\pi`
    const [low, high] = waveRange(state)
    const fns: Array<{ value: WaveFunction; label: string }> = [
        { value: 'sin', label: props.language === 'es' ? 'sen' : 'sin' },
        { value: 'cos', label: 'cos' }
    ]
    const controls = (
        <>
            <Segmented label={l({ eu: 'Funtzioa', es: 'Función', en: 'Function', ar: 'الدالة' })} value={state.fn} options={fns} onChange={(value) => setState((s) => setWave(s, { fn: value }))} />
            <Stepper label="A" value={state.a} min={-WAVE_A_LIMIT} max={WAVE_A_LIMIT} format={signed} onChange={(value) => setState((s) => setWave(s, { a: value }))} language={props.language} />
            <Segmented label="k" value={String(state.k)} options={WAVE_KS.map((value, index) => ({ value: String(index), label: value === 0.5 ? '1/2' : String(value) }))} onChange={(value) => setState((s) => setWave(s, { k: Number(value) }))} />
            <Stepper label="d" value={state.d} min={-WAVE_D_LIMIT} max={WAVE_D_LIMIT} format={signed} onChange={(value) => setState((s) => setWave(s, { d: value }))} language={props.language} />
        </>
    )
    const readout = (
        <>
            <span className="fraction-v2-lab-readout-main"><MathText text={`$${formula}$`} /></span>
            <span className="fraction-v2-lab-readout-note"><MathText text={l({ eu: `Periodoa: $T=${periodLatex}$`, es: `Periodo: $T=${periodLatex}$`, en: `Period: $T=${periodLatex}$`, ar: `الدور: $T=${periodLatex}$` })} /></span>
            <span className="fraction-v2-lab-readout-note"><MathText text={l({ eu: `Ibiltartea: $[${low},\\,${high}]$`, es: `Recorrido: $[${low},\\,${high}]$`, en: `Range: $[${low},\\,${high}]$`, ar: `المدى: $[${low},\\,${high}]$` })} /></span>
        </>
    )
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={waveChallenges} state={state}>
            <WavePlane state={state} language={props.language} />
        </ToolFrame>
    )
}
