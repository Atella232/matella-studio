import { useState, type ReactNode } from 'react'
import { MathText } from '../../../components/MathText'
import { Segmented, Stepper, ToolFrame } from '../../../features/unit-v2/lab/LabKit'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import { useLabText } from '../../../features/unit-v2/lab/useLabText'
import { toExactDecimal, toNumber, type FractionValue } from '../../../features/unit-v2/math/fraction'
import type { LocalizedText, UnitLanguage } from '../../../features/unit-v2/types'
import { COLORS, INK, LINE, MUTED, PAPER, SECOND, STAGE, STAGE_TINT } from '../../dbh2-estatistika-v2/palette'
import {
    cellsLabels,
    contingencyChallenges,
    contingencyOf,
    cumulativePercents,
    CELL_MAX,
    DIE_EVENT_IDS,
    dieEvents,
    ESTIMATE_MAX,
    initialContingencyState,
    initialIntervalsState,
    initialPercentileState,
    initialScatterState,
    initialSpreadState,
    initialTableState,
    initialUnionState,
    initialUrnState,
    initialWhiskersState,
    INTERVAL_COUNTS,
    intervalPlan,
    intervalsChallenges,
    isReliable,
    PERCENTILE_COUNT_MAX,
    PERCENTILE_KS,
    PERCENTILE_VALUES,
    percentileChallenges,
    percentileOf,
    rawHeights,
    SCATTER_XS,
    SCATTER_Y_MAX,
    scatterChallenges,
    scatterEstimate,
    scatterLine,
    scatterR,
    setCell,
    setIntervals,
    setPercentile,
    setScatter,
    setSpread,
    setTableCount,
    setUnion,
    setUrn,
    setWhisker,
    someBlue,
    sameColour,
    SPREAD_MAX,
    spreadChallenges,
    spreadMean,
    spreadVariance,
    TABLE_COUNT_MAX,
    TABLE_VALUES,
    tableChallenges,
    tableMeanOf,
    tableSums,
    tableVarianceOf,
    twoRed,
    unionChallenges,
    unionOf,
    URN_MAX,
    urnChallenges,
    urnTree,
    WHISKER_MAX,
    whiskersChallenges,
    whiskersOf,
    type ContingencyState,
    type DieEventId,
    type IntervalsState,
    type PercentileState,
    type ScatterState,
    type SpreadState,
    type TableState,
    type UnionState,
    type UrnState,
    type WhiskersState
} from './labTools'

const say = (eu: string, es: string, ar: string): LocalizedText => ({ eu, es, ar })
const sum = (values: number[]) => values.reduce((total, value) => total + value, 0)
const separator = (language: UnitLanguage) => (language === 'ar' ? '.' : ',')

/** A number in the learner's language: exact when it has few decimals, otherwise rounded with ≈ */
function plain(value: number, language: UnitLanguage, digits = 2): string {
    const rounded = Math.round(value * 10 ** digits) / 10 ** digits
    const text = String(Math.abs(rounded) < 1e-12 ? 0 : rounded).replace('.', separator(language)).replace('-', '−')
    return Math.abs(rounded - value) < 1e-9 ? text : `≈ ${text}`
}

/** "= value" or "\approx value" for LaTeX from a float */
function texNumber(value: number, language: UnitLanguage, digits = 2) {
    const text = plain(value, language, digits).replace(',', '{,}').replace('−', '-')
    return text.startsWith('≈ ') ? `\\approx ${text.slice(2)}` : `=${text}`
}

/** "= value" for an exact fraction, as a decimal when short */
function texFraction(value: FractionValue, language: UnitLanguage, digits = 2) {
    const exact = toExactDecimal(value, separator(language))
    if (exact !== null && exact.replace(/^[^,.]*[,.]?/, '').length <= digits) return `=${exact.replace(',', '{,}')}`
    return texNumber(toNumber(value), language, digits)
}

const texRatio = (value: FractionValue | null) => (value === null ? '\\text{—}' : value.denominator === 1 ? String(value.numerator) : `\\frac{${value.numerator}}{${value.denominator}}`)

function Board({ height, label, children }: { height: number; label: string; children: ReactNode }) {
    return <svg viewBox={`0 0 640 ${height}`} direction="ltr" role="img" aria-label={label} style={{ width: '100%', height: 'auto', fontFamily: '"Atkinson Hyperlegible", "Noto Sans Arabic", system-ui, sans-serif' }}>{children}</svg>
}

function Readout({ latex, note }: { latex: string; note: string }) {
    return (
        <>
            <span className="fraction-v2-lab-readout-main"><MathText text={`$${latex}$`} /></span>
            <span className="fraction-v2-lab-readout-note">{note}</span>
        </>
    )
}

function Text({ x, y, children, color = INK, size = 15, anchor = 'middle', weight = 700 }: { x: number; y: number; children: ReactNode; color?: string; size?: number; anchor?: 'start' | 'middle' | 'end'; weight?: number }) {
    return <text x={x} y={y} textAnchor={anchor} fontSize={size} fontWeight={weight} fill={color}>{children}</text>
}

/** A labelled number line with ticks */
function Axis({ x, y, from, to, step, language }: { x: (value: number) => number; y: number; from: number; to: number; step: number; language: UnitLanguage }) {
    const ticks = Array.from({ length: Math.floor((to - from) / step) + 1 }, (_, index) => from + index * step)
    return (
        <g>
            <line x1={x(from)} x2={x(to)} y1={y} y2={y} stroke={INK} strokeWidth={2} />
            {ticks.map((value) => (
                <g key={value}>
                    <line x1={x(value)} x2={x(value)} y1={y - 5} y2={y + 5} stroke={INK} strokeWidth={1.4} />
                    <Text x={x(value)} y={y + 22} size={13} weight={400}>{plain(value, language)}</Text>
                </g>
            ))}
        </g>
    )
}

/* ---------- 1. Intervals ---------- */

export function IntervalsTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<IntervalsState>(initialIntervalsState)
    const plan = intervalPlan(rawHeights, state.count)
    const x = (value: number) => 50 + (value - 144) * 15.5
    const top = Math.max(...plan.counts)
    const y = (count: number) => 200 - (count / Math.max(top, 1)) * 140
    const controls = (
        <Segmented label={l(say('Tarte kopurua', 'Número de intervalos', 'عدد الفئات'))} value={String(state.count)} options={INTERVAL_COUNTS.map((count) => ({ value: String(count), label: String(count) }))} onChange={(value) => setState((s) => setIntervals(s, Number(value)))} />
    )
    const d = (value: number) => plain(value, props.language).replace(',', '{,}')
    const latex = `r=29\\quad r'=${plan.extended}\\quad ${plan.extended}:${state.count}=${plan.width}`
    const note = l(say(`Hasiera: ${plain(plan.start, 'eu')}. Tarte modalaren klase-marka: ${plain(plan.marks[plan.modal], 'eu')}.`, `Empieza en ${plain(plan.start, 'es')}. Marca de clase del intervalo modal: ${plain(plan.marks[plan.modal], 'es')}.`, `البداية: ${plain(plan.start, 'ar')}. مركز الفئة المنوالية: ${plain(plan.marks[plan.modal], 'ar')}.`))
    return (
        <ToolFrame {...props} controls={controls} readout={<Readout latex={latex} note={note} />} challenges={intervalsChallenges} state={state}>
            <Board height={280} label={l(say('40 altuerak tarteetan', 'Las 40 alturas en intervalos', 'الأطوال الأربعون في فئات'))}>
                {plan.counts.map((count, index) => (
                    <g key={index}>
                        <rect x={x(plan.edges[index])} y={y(count)} width={x(plan.edges[index + 1]) - x(plan.edges[index])} height={200 - y(count)} fill={index === plan.modal ? SECOND : STAGE} fillOpacity={0.3} stroke={INK} strokeWidth={1.6} />
                        <Text x={(x(plan.edges[index]) + x(plan.edges[index + 1])) / 2} y={y(count) - 6} size={13}>{count}</Text>
                    </g>
                ))}
                {rawHeights.map((value, index) => {
                    const level = rawHeights.slice(0, index).filter((item) => item === value).length
                    return <circle key={index} cx={x(value)} cy={236 - level * 7} r={3} fill={INK} fillOpacity={0.7} />
                })}
                <line x1={x(144)} x2={x(182)} y1={200} y2={200} stroke={INK} strokeWidth={2} />
                {plan.edges.map((edge, index) => (
                    <g key={edge}>
                        <line x1={x(edge)} x2={x(edge)} y1={200} y2={244} stroke={LINE} strokeWidth={1} strokeDasharray="3 3" />
                        {(state.count <= 6 || index % 2 === 0) && <Text x={x(edge)} y={262} size={12} weight={400}>{plain(edge, props.language)}</Text>}
                    </g>
                ))}
                <Text x={600} y={30} anchor="end" size={13} color={MUTED}>cm</Text>
                <text x={20} y={30} fontSize={13} fill={MUTED} direction="ltr">{`${d(plan.min).replace('{,}', ',')} – ${d(plan.max).replace('{,}', ',')}`}</text>
            </Board>
        </ToolFrame>
    )
}

/* ---------- 2. Percentiles ---------- */

export function PercentileTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<PercentileState>(initialPercentileState)
    const percents = cumulativePercents(state.counts)
    const total = sum(state.counts)
    const bar = (percent: number) => 40 + percent * 5.6
    const value = percentileOf(state.counts, state.k)
    const quartiles = [25, 50, 75].map((k) => percentileOf(state.counts, k))
    const controls = (
        <>
            {PERCENTILE_VALUES.map((item, index) => (
                <Stepper key={item} label={`${item} (fᵢ)`} value={state.counts[index]} min={0} max={PERCENTILE_COUNT_MAX} onChange={(next) => setState((s) => setPercentile(s, { index, count: next }))} language={props.language} />
            ))}
            <Segmented label={l(say('Pertzentila', 'Percentil', 'المئين'))} value={String(state.k)} options={PERCENTILE_KS.map((k) => ({ value: String(k), label: `p${k}` }))} onChange={(next) => setState((s) => setPercentile(s, { k: Number(next) }))} />
        </>
    )
    const latex = value === null ? 'N=0' : `p_{${state.k}}=${value}`
    return (
        <ToolFrame {...props} controls={controls} readout={<Readout latex={latex} note={`N = ${total} · Q₁ = ${quartiles[0] ?? '—'} · Me = ${quartiles[1] ?? '—'} · Q₃ = ${quartiles[2] ?? '—'}`} />} challenges={percentileChallenges} state={state}>
            <Board height={230} label={l(say('Ehuneko metatuen zinta', 'Cinta de porcentajes acumulados', 'شريط النسب المتجمّعة'))}>
                {state.counts.map((count, index) => {
                    if (count === 0) return null
                    const start = index === 0 ? 0 : percents[index - 1]
                    const end = percents[index]
                    return (
                        <g key={index}>
                            <rect x={bar(start)} y={80} width={bar(end) - bar(start)} height={50} fill={COLORS[index]} fillOpacity={0.3} stroke={INK} strokeWidth={1.6} />
                            {end - start >= 4 && <Text x={(bar(start) + bar(end)) / 2} y={112} size={17}>{PERCENTILE_VALUES[index]}</Text>}
                        </g>
                    )
                })}
                {total > 0 && <Axis x={bar} y={160} from={0} to={100} step={10} language={props.language} />}
                {total > 0 && (
                    <g>
                        <line x1={bar(state.k)} x2={bar(state.k)} y1={60} y2={148} stroke={SECOND} strokeWidth={3} />
                        <Text x={bar(state.k)} y={50} color={SECOND} size={16}>{`p${state.k} = ${value}`}</Text>
                    </g>
                )}
                <Text x={600} y={214} anchor="end" size={13} color={MUTED}>%</Text>
            </Board>
        </ToolFrame>
    )
}

/* ---------- 3. Box and whiskers ---------- */

export function WhiskersTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<WhiskersState>(initialWhiskersState)
    const box = whiskersOf(state)
    const x = (value: number) => 40 + value * 19
    const stacks = new Map<number, number>()
    const controls = (
        <>
            {state.values.map((value, index) => (
                <Stepper key={index} label={l(say(`${index + 1}. datua`, `Dato ${index + 1}`, `البيان ${index + 1}`))} value={value} min={0} max={WHISKER_MAX} onChange={(next) => setState((s) => setWhisker(s, index, next))} language={props.language} />
            ))}
        </>
    )
    const t = (value: number) => plain(value, props.language).replace(',', '{,}')
    const latex = `Q_1=${t(box.q1)}\\quad \\text{Me}=${t(box.median)}\\quad Q_3=${t(box.q3)}`
    const note = l(say(`Mugak: ${plain(box.low, 'eu')} eta ${plain(box.high, 'eu')}. Atipikoak: ${box.outliers.length}.`, `Límites: ${plain(box.low, 'es')} y ${plain(box.high, 'es')}. Atípicos: ${box.outliers.length}.`, `الحدّان: ${plain(box.low, 'ar')} و${plain(box.high, 'ar')}. الشواذ: ${box.outliers.length}.`))
    return (
        <ToolFrame {...props} controls={controls} readout={<Readout latex={latex} note={note} />} challenges={whiskersChallenges} state={state}>
            <Board height={280} label={l(say('Datuak eta kutxa-diagrama', 'Los datos y su diagrama de caja', 'البيانات ومخطط الصندوق'))}>
                {state.values.map((value, index) => {
                    const level = stacks.get(value) ?? 0
                    stacks.set(value, level + 1)
                    const outlier = box.outliers.includes(value)
                    return <circle key={index} cx={x(value)} cy={90 - level * 18} r={7} fill={outlier ? SECOND : STAGE} fillOpacity={0.65} stroke={INK} strokeWidth={1.2} />
                })}
                {[box.low, box.high].map((value, index) => value >= -2 && value <= 32 && (
                    <line key={index} x1={x(value)} x2={x(value)} y1={120} y2={210} stroke={MUTED} strokeWidth={1.4} strokeDasharray="5 4" />
                ))}
                <line x1={x(box.min)} x2={x(box.q1)} y1={165} y2={165} stroke={INK} strokeWidth={2.4} />
                <line x1={x(box.q3)} x2={x(box.max)} y1={165} y2={165} stroke={INK} strokeWidth={2.4} />
                {[box.min, box.max].map((value, index) => <line key={index} x1={x(value)} x2={x(value)} y1={151} y2={179} stroke={INK} strokeWidth={2.4} />)}
                <rect x={x(box.q1)} y={140} width={Math.max(x(box.q3) - x(box.q1), 2)} height={50} fill={STAGE_TINT} stroke={INK} strokeWidth={2.4} />
                <line x1={x(box.median)} x2={x(box.median)} y1={140} y2={190} stroke={SECOND} strokeWidth={3.4} />
                {box.outliers.map((value, index) => <Text key={index} x={x(value)} y={174} size={26} color={SECOND}>*</Text>)}
                <Axis x={x} y={232} from={0} to={30} step={5} language={props.language} />
            </Board>
        </ToolFrame>
    )
}

/* ---------- 4. Five data: x̄, σ and CV ---------- */

export function SpreadTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<SpreadState>(initialSpreadState)
    const mean = toNumber(spreadMean(state.values))
    const varianceValue = spreadVariance(state.values)
    const sigma = Math.sqrt(toNumber(varianceValue))
    const x = (value: number) => 40 + value * 28
    const stacks = new Map<number, number>()
    const controls = (
        <>
            {state.values.map((value, index) => (
                <Stepper key={index} label={l(say(`${index + 1}. datua`, `Dato ${index + 1}`, `البيان ${index + 1}`))} value={value} min={0} max={SPREAD_MAX} onChange={(next) => setState((s) => setSpread(s, index, next))} language={props.language} />
            ))}
        </>
    )
    const latex = `\\bar{x}${texNumber(mean, props.language)}\\quad \\sigma^2${texFraction(varianceValue, props.language)}\\quad \\sigma${texNumber(sigma, props.language)}`
    const cv = mean === 0 ? '—' : plain(sigma / mean, props.language)
    const note = l(say(`CV = σ : x̄ ${cv}. Karratuak: desbideratzeen karratuak.`, `CV = σ : x̄ ${cv}. Los cuadrados: las desviaciones al cuadrado.`, `CV = σ : x̄ ${cv}. المربعات: مربعات الانحرافات.`))
    return (
        <ToolFrame {...props} controls={controls} readout={<Readout latex={latex} note={note} />} challenges={spreadChallenges} state={state}>
            <Board height={300} label={l(say('Datuak eta desbideratzeen karratuak', 'Los datos y los cuadrados de las desviaciones', 'البيانات ومربعات الانحرافات'))}>
                <rect x={x(mean - sigma)} y={40} width={x(mean + sigma) - x(mean - sigma)} height={190} fill={SECOND} fillOpacity={0.07} />
                <line x1={x(mean)} x2={x(mean)} y1={30} y2={236} stroke={SECOND} strokeWidth={2} strokeDasharray="5 4" />
                <Text x={x(mean)} y={24} color={SECOND} size={14}>x̄</Text>
                {state.values.map((value, index) => {
                    const level = stacks.get(value) ?? 0
                    stacks.set(value, level + 1)
                    const side = Math.min(Math.abs(value - mean) * 12, 160)
                    return (
                        <g key={index}>
                            {side > 0 && <rect x={x(value) - side / 2} y={210 - level * 16 - side} width={side} height={side} fill={COLORS[index]} fillOpacity={0.16} stroke={COLORS[index]} strokeWidth={1.6} />}
                            <circle cx={x(value)} cy={222 - level * 16} r={7} fill={COLORS[index]} stroke={INK} strokeWidth={1.2} />
                        </g>
                    )
                })}
                <Axis x={x} y={246} from={0} to={20} step={2} language={props.language} />
            </Board>
        </ToolFrame>
    )
}

/* ---------- 5. σ of a table ---------- */

export function TableTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<TableState>(initialTableState)
    const sums = tableSums(state.counts)
    const mean = tableMeanOf(state.counts)
    const varianceValue = tableVarianceOf(state.counts)
    const columns = [60, 140, 240, 350]
    const controls = (
        <>
            {TABLE_VALUES.map((value) => (
                <Stepper key={value} label={`${value} (fᵢ)`} value={state.counts[value]} min={0} max={TABLE_COUNT_MAX} onChange={(next) => setState((s) => setTableCount(s, value, next))} language={props.language} />
            ))}
        </>
    )
    const latex = mean === null || varianceValue === null ? 'N=0' : `\\bar{x}${texFraction(mean, props.language)}\\quad \\sigma^2${texFraction(varianceValue, props.language)}\\quad \\sigma${texNumber(Math.sqrt(toNumber(varianceValue)), props.language)}`
    return (
        <ToolFrame {...props} controls={controls} readout={<Readout latex={latex} note={l(say(`N = ${sums.n} · Σ fᵢxᵢ = ${sums.fx} · Σ fᵢxᵢ² = ${sums.fx2}`, `N = ${sums.n} · Σ fᵢxᵢ = ${sums.fx} · Σ fᵢxᵢ² = ${sums.fx2}`, `N = ${sums.n} · Σ fᵢxᵢ = ${sums.fx} · Σ fᵢxᵢ² = ${sums.fx2}`))} />} challenges={tableChallenges} state={state}>
            <Board height={280} label={l(say('Taula zutabe berriekin', 'La tabla con las columnas nuevas', 'الجدول بالأعمدة الجديدة'))}>
                <rect x={columns[3] - 55} y={14} width={110} height={226} rx={10} fill={STAGE_TINT} />
                {['xᵢ', 'fᵢ', 'fᵢ·xᵢ', 'fᵢ·xᵢ²'].map((header, index) => <Text key={header} x={columns[index]} y={36} color={STAGE} size={16}>{header}</Text>)}
                <line x1={20} x2={410} y1={46} y2={46} stroke={INK} strokeWidth={2} />
                {TABLE_VALUES.map((value) => {
                    const count = state.counts[value]
                    return (
                        <g key={value}>
                            <Text x={columns[0]} y={72 + value * 26} weight={400}>{value}</Text>
                            <Text x={columns[1]} y={72 + value * 26} weight={400}>{count}</Text>
                            <Text x={columns[2]} y={72 + value * 26} weight={400}>{count * value}</Text>
                            <Text x={columns[3]} y={72 + value * 26}>{count * value * value}</Text>
                        </g>
                    )
                })}
                <line x1={20} x2={410} y1={226} y2={226} stroke={INK} strokeWidth={1.4} />
                <Text x={columns[1]} y={256} color={STAGE}>{sums.n}</Text>
                <Text x={columns[2]} y={256} color={STAGE}>{sums.fx}</Text>
                <Text x={columns[3]} y={256} color={STAGE}>{sums.fx2}</Text>
                {TABLE_VALUES.map((value) => {
                    const top = Math.max(1, ...state.counts)
                    const height = (state.counts[value] / top) * 150
                    return <rect key={value} x={450 + value * 28} y={226 - height} width={22} height={height} fill={STAGE} fillOpacity={0.5} stroke={INK} strokeWidth={1.2} />
                })}
                <line x1={444} x2={622} y1={226} y2={226} stroke={INK} strokeWidth={2} />
                {TABLE_VALUES.map((value) => <Text key={value} x={461 + value * 28} y={246} size={13} weight={400}>{value}</Text>)}
                {mean !== null && <polygon points={`${461 + toNumber(mean) * 28},${254} ${455 + toNumber(mean) * 28},${266} ${467 + toNumber(mean) * 28},${266}`} fill={SECOND} />}
            </Board>
        </ToolFrame>
    )
}

/* ---------- 6. Cloud, r and regression line ---------- */

export function ScatterTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<ScatterState>(initialScatterState)
    const r = scatterR(state)
    const line = scatterLine(state)
    const estimate = scatterEstimate(state)
    const x = (value: number) => 60 + value * 42
    const y = (value: number) => 250 - value * 21
        const controls = (
        <>
            {SCATTER_XS.map((value, index) => (
                <Stepper key={value} label={`y (x = ${value})`} value={state.ys[index]} min={0} max={SCATTER_Y_MAX} onChange={(next) => setState((s) => setScatter(s, { index, y: next }))} language={props.language} />
            ))}
            <Stepper label={l(say('Estimatu x =', 'Estimar en x =', 'التقدير عند x ='))} value={state.at} min={0} max={ESTIMATE_MAX} onChange={(next) => setState((s) => setScatter(s, { at: next }))} language={props.language} />
        </>
    )
    const latex = r === null ? 'r\\ \\text{—}' : `r${texNumber(r, props.language)}\\qquad \\hat{y}(${state.at})${texNumber(estimate, props.language)}`
    const reliable = isReliable(state)
    const note = r === null
        ? l(say('y guztiak berdinak: ez dago korrelaziorik neurtzeko.', 'Todas las y iguales: no hay correlación que medir.', 'كل قيم y متساوية: لا ارتباط يُقاس.'))
        : `ŷ = ${plain(line.slope, props.language)}x ${line.intercept < 0 ? '−' : '+'} ${plain(Math.abs(line.intercept), props.language).replace('≈ ', '')} · ${l(reliable ? say('estimazio fidagarria', 'estimación fiable', 'تقدير موثوق') : say('estimazio ez-fidagarria', 'estimación poco fiable', 'تقدير غير موثوق'))}`
    return (
        <ToolFrame {...props} controls={controls} readout={<Readout latex={latex} note={note} />} challenges={scatterChallenges} state={state}>
            <Board height={290} label={l(say('Puntu-hodeia eta erregresio-zuzena', 'Nube de puntos y recta de regresión', 'سحابة النقاط ومستقيم الانحدار'))}>
                <rect x={x(1)} y={y(10.5)} width={x(6) - x(1)} height={y(0) - y(10.5)} fill={STAGE_TINT} fillOpacity={0.5} />
                {Array.from({ length: 13 }, (_, value) => <line key={`v${value}`} x1={x(value)} x2={x(value)} y1={y(0)} y2={y(10.5)} stroke={LINE} strokeWidth={1} />)}
                {[0, 2, 4, 6, 8, 10].map((value) => (
                    <g key={`h${value}`}>
                        <line x1={x(0)} x2={x(12)} y1={y(value)} y2={y(value)} stroke={LINE} strokeWidth={1} />
                        <Text x={x(0) - 8} y={y(value) + 5} anchor="end" size={12} weight={400} color={MUTED}>{value}</Text>
                    </g>
                ))}
                <line x1={x(0)} x2={x(12.4)} y1={y(0)} y2={y(0)} stroke={INK} strokeWidth={2} />
                <line x1={x(0)} x2={x(0)} y1={y(0)} y2={y(10.8)} stroke={INK} strokeWidth={2} />
                {Array.from({ length: 13 }, (_, value) => <Text key={`n${value}`} x={x(value)} y={y(0) + 18} size={12} weight={400} color={MUTED}>{value}</Text>)}
                <clipPath id="scatter-clip"><rect x={x(0)} y={y(11)} width={x(12) - x(0)} height={y(0) - y(11)} /></clipPath>
                {r !== null && <line x1={x(0)} y1={y(line.intercept)} x2={x(12)} y2={y(line.slope * 12 + line.intercept)} stroke={SECOND} strokeWidth={2.4} clipPath="url(#scatter-clip)" />}
                {r !== null && estimate >= -0.5 && estimate <= 11.5 && (
                    <g>
                        <line x1={x(state.at)} x2={x(state.at)} y1={y(0)} y2={y(estimate)} stroke={reliable ? COLORS[3] : SECOND} strokeWidth={2} strokeDasharray="5 4" />
                        <circle cx={x(state.at)} cy={y(estimate)} r={6} fill={reliable ? COLORS[3] : SECOND} stroke={INK} strokeWidth={1.2} />
                    </g>
                )}
                {SCATTER_XS.map((value, index) => <circle key={value} cx={x(value)} cy={y(state.ys[index])} r={7} fill={STAGE} fillOpacity={0.8} stroke={INK} strokeWidth={1.4} />)}
            </Board>
        </ToolFrame>
    )
}

/* ---------- 7. Union of two events ---------- */

export function UnionTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<UnionState>(initialUnionState)
    const result = unionOf(state)
    const options = DIE_EVENT_IDS.map((value) => ({ value, label: l(dieEvents[value].name) }))
    const controls = (
        <>
            <Segmented label="A" value={state.a} options={options} onChange={(value) => setState((s) => setUnion(s, { a: value as DieEventId }))} />
            <Segmented label="B" value={state.b} options={options} onChange={(value) => setState((s) => setUnion(s, { b: value as DieEventId }))} />
        </>
    )
    const latex = `\\frac{${result.A.length}}{6}+\\frac{${result.B.length}}{6}-\\frac{${result.both.length}}{6}=\\frac{${result.either.length}}{6}`
    const note = l(result.compatible
        ? say(`Bateragarriak: ${result.both.join(', ')} bietan dago.`, `Compatibles: ${result.both.join(', ')} está en los dos.`, `متوافقان: ${result.both.join('، ')} في كليهما.`)
        : say('Bateraezinak: ez dago zati komunik.', 'Incompatibles: no hay parte común.', 'متنافيان: لا جزء مشترك.'))
    return (
        <ToolFrame {...props} controls={controls} readout={<Readout latex={`P(A\\cup B)=${latex}`} note={note} />} challenges={unionChallenges} state={state}>
            <Board height={220} label={l(say('Dadoaren sei aurpegiak', 'Las seis caras del dado', 'أوجه النرد الستة'))}>
                {[1, 2, 3, 4, 5, 6].map((face, index) => {
                    const inA = result.A.includes(face)
                    const inB = result.B.includes(face)
                    const cx = 70 + index * 100
                    return (
                        <g key={face}>
                            <rect x={cx - 34} y={50} width={68} height={68} rx={12} fill={inA && inB ? '#c9a0dc' : inA ? STAGE_TINT : inB ? '#f6d5cc' : PAPER} stroke={INK} strokeWidth={2} />
                            <Text x={cx} y={94} size={26}>{face}</Text>
                            {inA && <rect x={cx - 30} y={134} width={60} height={14} rx={7} fill={STAGE} fillOpacity={0.8} />}
                            {inB && <rect x={cx - 30} y={156} width={60} height={14} rx={7} fill={SECOND} fillOpacity={0.8} />}
                        </g>
                    )
                })}
                <Text x={14} y={146} anchor="start" size={14} color={STAGE}>A</Text>
                <Text x={14} y={168} anchor="start" size={14} color={SECOND}>B</Text>
                <Text x={320} y={204} size={15} color={result.either.length === 6 ? STAGE : INK}>{`A ∪ B = {${result.either.join(', ')}}`}</Text>
            </Board>
        </ToolFrame>
    )
}

/* ---------- 8. Two draws from an urn ---------- */

export function UrnTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<UrnState>(initialUrnState)
    const paths = urnTree(state)
    const controls = (
        <>
            <Stepper label={l(say('Bola gorriak', 'Bolas rojas', 'كرات حمراء'))} value={state.red} min={1} max={URN_MAX} onChange={(next) => setState((s) => setUrn(s, { red: next }))} language={props.language} />
            <Stepper label={l(say('Bola urdinak', 'Bolas azules', 'كرات زرقاء'))} value={state.blue} min={1} max={URN_MAX} onChange={(next) => setState((s) => setUrn(s, { blue: next }))} language={props.language} />
            <Segmented label={l(say('Lehen bola', 'La primera bola', 'الكرة الأولى'))} value={state.replace ? 'yes' : 'no'} options={[{ value: 'yes', label: l(say('Itzuli', 'Se devuelve', 'تُعاد')) }, { value: 'no', label: l(say('Ez itzuli', 'No se devuelve', 'لا تُعاد')) }]} onChange={(value) => setState((s) => setUrn(s, { replace: value === 'yes' }))} />
        </>
    )
    const latex = `P(RR)=${texRatio(twoRed(state))}\\qquad 1-P(RR)=${texRatio(someBlue(state))}`
    const same = sameColour(state)
    const node = (cx: number, cy: number, red: boolean) => <circle cx={cx} cy={cy} r={12} fill={red ? SECOND : STAGE} fillOpacity={0.85} stroke={INK} strokeWidth={1.4} />
    const frac = (cx: number, cy: number, value: FractionValue) => (
        <g>
            <Text x={cx} y={cy - 4} size={13}>{value.numerator}</Text>
            <line x1={cx - 9} x2={cx + 9} y1={cy} y2={cy} stroke={INK} strokeWidth={1.2} />
            <Text x={cx} y={cy + 14} size={13}>{value.denominator}</Text>
        </g>
    )
    return (
        <ToolFrame {...props} controls={controls} readout={<Readout latex={latex} note={l(say(`R: gorria. 1 − P(RR): gutxienez bat urdin. Kolore bera: ${same.numerator}/${same.denominator}.`, `R: roja. 1 − P(RR): al menos una azul. Mismo color: ${same.numerator}/${same.denominator}.`, `R: حمراء. 1 − P(RR): زرقاء واحدة على الأقل. اللون نفسه: ${same.numerator}/${same.denominator}.`))} />} challenges={urnChallenges} state={state}>
            <Board height={290} label={l(say('Kutxa eta zuhaitz-diagrama', 'La urna y el diagrama de árbol', 'الجرّة والمخطط الشجري'))}>
                <path d="M30 70 h80 v120 q0 16 -16 16 h-48 q-16 0 -16 -16 z" fill={PAPER} stroke={INK} strokeWidth={2} />
                {Array.from({ length: state.red + state.blue }, (_, index) => (
                    <circle key={index} cx={46 + (index % 3) * 24} cy={190 - Math.floor(index / 3) * 24} r={10} fill={index < state.red ? SECOND : STAGE} fillOpacity={0.85} stroke={INK} strokeWidth={1.2} />
                ))}
                <circle cx={160} cy={145} r={5} fill={INK} />
                {[true, false].map((firstRed, first) => {
                    const fy = first === 0 ? 85 : 205
                    const firstPath = paths[first * 2]
                    return (
                        <g key={first}>
                            <line x1={165} y1={145} x2={268} y2={fy} stroke={INK} strokeWidth={1.6} />
                            {frac(212, (145 + fy) / 2 + (first === 0 ? -14 : 14), firstPath.first)}
                            {node(280, fy, firstRed)}
                            {[0, 1].map((second) => {
                                const path = paths[first * 2 + second]
                                const sy = fy + (second === 0 ? -34 : 34)
                                return (
                                    <g key={second}>
                                        <line x1={292} y1={fy} x2={398} y2={sy} stroke={INK} strokeWidth={1.6} />
                                        {frac(345, (fy + sy) / 2 + (second === 0 ? -12 : 12), path.then)}
                                        {node(410, sy, path.secondRed)}
                                        <Text x={440} y={sy + 5} anchor="start" size={15} weight={path.firstRed && path.secondRed ? 700 : 400} color={path.firstRed && path.secondRed ? SECOND : INK}>{`${path.firstRed ? 'R' : 'A'}${path.secondRed ? 'R' : 'A'}: ${path.path.numerator}/${path.path.denominator}`}</Text>
                                    </g>
                                )
                            })}
                        </g>
                    )
                })}
            </Board>
        </ToolFrame>
    )
}

/* ---------- 9. Contingency table ---------- */

export function ContingencyTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<ContingencyState>(initialContingencyState)
    const table = contingencyOf(state)
    const [a, b, c, d] = state.cells
    const controls = (
        <>
            {cellsLabels.map((label, index) => (
                <Stepper key={index} label={l(label)} value={state.cells[index]} min={0} max={CELL_MAX} onChange={(next) => setState((s) => setCell(s, index, next))} language={props.language} />
            ))}
        </>
    )
    const latex = `P(G)=${texRatio(table.pGlasses)}\\qquad P(G/N)=${texRatio(table.pGlassesGivenGirl)}`
    const girlGivenGlasses = table.pGirlGivenGlasses === null ? '—' : `${table.pGirlGivenGlasses.numerator}/${table.pGirlGivenGlasses.denominator}`
    const columns = [say('Mutilak', 'Chicos', 'الأولاد'), say('Neskak', 'Chicas', 'البنات'), say('Guztira', 'Total', 'المجموع')]
    const rows = [
        { name: say('Betaurrekoekin (G)', 'Con gafas (G)', 'بنظارات (G)'), values: [a, b, a + b] },
        { name: say('Betaurrekorik gabe', 'Sin gafas', 'بلا نظارات'), values: [c, d, c + d] },
        { name: say('Guztira', 'Total', 'المجموع'), values: [table.boys, table.girls, table.total] }
    ]
    const colX = [340, 450, 560]
    return (
        <ToolFrame {...props} controls={controls} readout={<Readout latex={latex} note={l(say(`G: betaurrekoak. N: neska. P(N/G) = ${girlGivenGlasses}.`, `G: gafas. N: chica. P(N/G) = ${girlGivenGlasses}.`, `G: نظارات. N: بنت. P(N/G) = ${girlGivenGlasses}.`))} />} challenges={contingencyChallenges} state={state}>
            <Board height={220} label={l(say('Kontingentzia-taula', 'Tabla de contingencia', 'جدول التوافق'))}>
                <rect x={colX[1] - 40} y={20} width={80} height={170} rx={8} fill={STAGE_TINT} />
                {columns.map((column, index) => <Text key={index} x={colX[index]} y={44} color={STAGE} size={16}>{l(column)}</Text>)}
                <line x1={20} x2={620} y1={58} y2={58} stroke={INK} strokeWidth={2} />
                <line x1={270} x2={270} y1={20} y2={190} stroke={INK} strokeWidth={2} />
                <line x1={20} x2={620} y1={146} y2={146} stroke={INK} strokeWidth={1.4} />
                <line x1={505} x2={505} y1={20} y2={190} stroke={INK} strokeWidth={1.4} />
                {rows.map((row, rowIndex) => (
                    <g key={rowIndex}>
                        <text x={props.language === 'ar' ? 255 : 30} y={92 + rowIndex * 42} textAnchor={props.language === 'ar' ? 'end' : 'start'} fontSize={15} fontWeight={700} fill={INK} direction={props.language === 'ar' ? 'rtl' : undefined}>{l(row.name)}</text>
                        {row.values.map((value, index) => <Text key={index} x={colX[index]} y={92 + rowIndex * 42} size={17} weight={rowIndex === 2 || index === 2 ? 700 : 400}>{value}</Text>)}
                    </g>
                ))}
            </Board>
        </ToolFrame>
    )
}
