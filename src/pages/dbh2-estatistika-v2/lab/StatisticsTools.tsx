import { useState, type ReactNode } from 'react'
import { MathText } from '../../../components/MathText'
import { Segmented, Stepper, ToolFrame } from '../../../features/unit-v2/lab/LabKit'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import { useLabText } from '../../../features/unit-v2/lab/useLabText'
import { toExactDecimal, toNumber, type FractionValue } from '../../../features/unit-v2/math/fraction'
import type { LocalizedText, UnitLanguage } from '../../../features/unit-v2/types'
import { transportSurvey } from '../data'
import { COLORS, INK, LINE, MUTED, PAPER, SECOND, STAGE, STAGE_TINT } from '../palette'
import {
    BOX_MAX,
    boxChallenges,
    boxMean,
    CENTRE_MAX,
    CENTRE_VALUES,
    centreChallenges,
    CLASS_MAX,
    classMarks,
    COUNT_MAX,
    cumulativeChallenges,
    cumulativeOf,
    diceCell,
    diceChallenges,
    diceFavourable,
    diceProbability,
    fiveNumbers,
    groupedMean,
    HEIGHT_EDGES,
    histogramChallenges,
    initialBoxState,
    initialCentreState,
    initialCumulativeState,
    initialDiceState,
    initialHistogramState,
    initialPieState,
    meanDeviation,
    PERCENT_STEP,
    percentAngle,
    percentTotal,
    pieChallenges,
    relativeCumulative,
    setBoxValue,
    setCentreCount,
    setCount,
    setDice,
    setHistogram,
    setPercent,
    tableMean,
    tableMedian,
    tableModes,
    type BoxState,
    type CentreState,
    type CumulativeState,
    type DiceRule,
    type DiceState,
    type HistogramState,
    type PieState,
    type PolygonKind
} from './labTools'

const say = (eu: string, es: string, ar: string): LocalizedText => ({ eu, es, ar })
const sum = (values: number[]) => values.reduce((total, value) => total + value, 0)

/** A value as a decimal in the learner's language: exact when short, otherwise rounded with ≈ */
function decimal(value: FractionValue, language: UnitLanguage, digits = 2): string {
    const separator = language === 'ar' ? '.' : ','
    const exact = toExactDecimal(value, separator)
    if (exact !== null && exact.replace(/^[^,.]*[,.]?/, '').length <= digits) return exact
    const rounded = Math.round(toNumber(value) * 10 ** digits) / 10 ** digits
    return `≈ ${String(rounded).replace('.', separator)}`
}

/** "= value" or "≈ value" for LaTeX, with the comma between braces */
const texIs = (value: FractionValue, language: UnitLanguage, digits = 2) => {
    const written = decimal(value, language, digits).replace(',', '{,}')
    return written.startsWith('≈ ') ? `\\approx ${written.slice(2)}` : `=${written}`
}

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

/** A letter with a small subscript: F_i, h_i */
function Sub({ letter, index }: { letter: string; index: string }) {
    return (
        <>
            {letter}
            <tspan fontSize="0.7em" dy="0.3em">{index}</tspan>
            <tspan dy="-0.3em">{' '}</tspan>
        </>
    )
}

/* ---------- 1. Cumulative frequencies ---------- */

export function CumulativeTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<CumulativeState>(initialCumulativeState)
    const cumulative = cumulativeOf(state.counts)
    const total = sum(state.counts)
    const columns = [70, 170, 270, 380, 500]
    const barX = 560
    const controls = (
        <>
            {state.counts.map((count, value) => (
                <Stepper key={value} label={l(say(`${value} liburu (fᵢ)`, `${value} libros (fᵢ)`, `${value} كتب (fᵢ)`))} value={count} min={0} max={COUNT_MAX} onChange={(next) => setState((s) => setCount(s, value, next))} language={props.language} />
            ))}
        </>
    )
    const relative = (index: number) => {
        const value = relativeCumulative(state.counts, index)
        return value === null ? '—' : decimal(value, props.language)
    }
    const latex = total === 0 ? 'N=0' : `N=${total}\\qquad F_2=${cumulative[2]}\\qquad H_2=\\frac{${cumulative[2]}}{${total}}${texIs(relativeCumulative(state.counts, 2)!, props.language)}`
    return (
        <ToolFrame {...props} controls={controls} readout={<Readout latex={latex} note={l(say('Azken metatua N da: datu guztiak.', 'La última acumulada es N: todos los datos.', 'آخر متجمّع هو N: كل البيانات.'))} />} challenges={cumulativeChallenges} state={state}>
            <Board height={250} label={l(say('Maiztasun metatuen taula eta eskailera', 'Tabla y escalera de frecuencias acumuladas', 'جدول التكرارات المتجمّعة وسلّمها'))}>
                <rect x={columns[2] - 45} y={14} width={90} height={196} rx={10} fill={STAGE_TINT} />
                {[<Sub key="x" letter="x" index="i" />, <Sub key="f" letter="f" index="i" />, <Sub key="F" letter="F" index="i" />, <Sub key="h" letter="H" index="i" />].map((header, index) => (
                    <Text key={index} x={columns[index]} y={36} color={STAGE} size={17}>{header}</Text>
                ))}
                <line x1={30} x2={430} y1={46} y2={46} stroke={INK} strokeWidth={2} />
                {state.counts.map((count, value) => (
                    <g key={value}>
                        <Text x={columns[0]} y={76 + value * 30} weight={400}>{value}</Text>
                        <Text x={columns[1]} y={76 + value * 30} weight={400}>{count}</Text>
                        <Text x={columns[2]} y={76 + value * 30}>{cumulative[value]}</Text>
                        <Text x={columns[3]} y={76 + value * 30} weight={400}>{relative(value)}</Text>
                    </g>
                ))}
                <line x1={30} x2={430} y1={206} y2={206} stroke={INK} strokeWidth={1.4} />
                <Text x={columns[1]} y={232} color={STAGE}>N = {total}</Text>
                {/* The staircase of F_i */}
                <line x1={barX - 10} x2={barX + 70} y1={206} y2={206} stroke={INK} strokeWidth={2} />
                {cumulative.map((value, index) => {
                    const height = total === 0 ? 0 : (value / Math.max(total, 1)) * 170
                    return <rect key={index} x={barX - 6 + index * 15} y={206 - height} width={13} height={height} fill={index === 2 ? SECOND : STAGE} fillOpacity={0.6} stroke={INK} strokeWidth={1} />
                })}
                <Text x={barX + 32} y={232} color={MUTED} size={13}><Sub letter="F" index="i" /></Text>
            </Board>
        </ToolFrame>
    )
}

/* ---------- 2. Histogram and polygons ---------- */

const polygonNames: Record<PolygonKind, LocalizedText> = {
    frequency: say('Maiztasunak', 'Frecuencias', 'التكرارات'),
    cumulative: say('Metatuak', 'Acumuladas', 'المتجمّعة')
}

export function HistogramTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<HistogramState>(initialHistogramState)
    const total = sum(state.counts)
    const cumulative = cumulativeOf(state.counts)
    const x = (value: number) => 70 + (value - 130) * 9
    const top = state.polygon === 'cumulative' ? Math.max(30, total) : Math.max(15, ...state.counts)
    const y = (value: number) => 250 - (value / top) * 210
    const points = state.polygon === 'frequency'
        ? [[135, 0], ...classMarks.map((mark, index) => [mark, state.counts[index]]), [185, 0]]
        : [[140, 0], ...HEIGHT_EDGES.slice(1).map((edge, index) => [edge, cumulative[index]])]
    const mean = groupedMean(state.counts)
    const controls = (
        <>
            {state.counts.map((count, index) => (
                <Stepper key={index} label={`[${HEIGHT_EDGES[index]}, ${HEIGHT_EDGES[index + 1]})`} value={count} min={0} max={CLASS_MAX} onChange={(next) => setState((s) => setHistogram(s, { index, count: next }))} language={props.language} />
            ))}
            <Segmented label={l(say('Poligonoa', 'Polígono', 'المضلّع'))} value={state.polygon} options={(['frequency', 'cumulative'] as PolygonKind[]).map((value) => ({ value, label: l(polygonNames[value]) }))} onChange={(value) => setState((s) => setHistogram(s, { polygon: value }))} />
        </>
    )
    const latex = mean === null ? 'N=0' : `N=${total}\\qquad \\bar{x}${texIs(mean, props.language)}`
    return (
        <ToolFrame {...props} controls={controls} readout={<Readout latex={latex} note={l(say('Batez bestekoa klase-markekin: 145, 155, 165, 175.', 'Media con las marcas de clase: 145, 155, 165, 175.', 'المتوسط بمراكز الفئات: 145، 155، 165، 175.'))} />} challenges={histogramChallenges} state={state}>
            <Board height={290} label={l(say('Altueren histograma', 'Histograma de alturas', 'مدرّج الأطوال'))}>
                <line x1={x(130)} x2={x(130)} y1={30} y2={250} stroke={INK} strokeWidth={2} />
                <line x1={x(130)} x2={x(192)} y1={250} y2={250} stroke={INK} strokeWidth={2} />
                {[0, 0.25, 0.5, 0.75, 1].map((part) => {
                    const value = Math.round(top * part)
                    return (
                        <g key={part}>
                            {part > 0 && <line x1={x(130)} x2={x(190)} y1={y(value)} y2={y(value)} stroke={LINE} strokeWidth={1} />}
                            <Text x={x(130) - 8} y={y(value) + 5} anchor="end" color={MUTED} size={13} weight={400}>{value}</Text>
                        </g>
                    )
                })}
                {state.polygon === 'frequency' && state.counts.map((count, index) => (
                    <rect key={index} x={x(HEIGHT_EDGES[index])} y={y(count)} width={x(HEIGHT_EDGES[index + 1]) - x(HEIGHT_EDGES[index])} height={250 - y(count)} fill={STAGE} fillOpacity={0.3} stroke={INK} strokeWidth={2} />
                ))}
                {state.polygon === 'cumulative' && cumulative.map((count, index) => (
                    <rect key={index} x={x(HEIGHT_EDGES[index])} y={y(count)} width={x(HEIGHT_EDGES[index + 1]) - x(HEIGHT_EDGES[index])} height={250 - y(count)} fill={STAGE_TINT} fillOpacity={0.6} stroke={LINE} strokeWidth={1.4} />
                ))}
                {HEIGHT_EDGES.map((edge) => <Text key={edge} x={x(edge)} y={272} size={13} weight={400}>{edge}</Text>)}
                <polyline points={points.map(([value, count]) => `${x(value)},${y(count)}`).join(' ')} fill="none" stroke={SECOND} strokeWidth={3} />
                {points.map(([value, count], index) => (
                    <g key={index}>
                        <circle cx={x(value)} cy={y(count)} r={5} fill={SECOND} stroke={INK} strokeWidth={1.2} />
                        {count > 0 && <Text x={x(value)} y={y(count) - 10} size={13} color={SECOND}>{count}</Text>}
                    </g>
                ))}
                <Text x={600} y={60} anchor="end" color={MUTED} size={13}>cm</Text>
            </Board>
        </ToolFrame>
    )
}

/* ---------- 3. Pie chart from percentages ---------- */

export function PieTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<PieState>(initialPieState)
    const total = percentTotal(state)
    const cx = 170
    const cy = 150
    const r = 115
    const point = (degrees: number, radius = r) => [cx + radius * Math.cos((degrees * Math.PI) / 180), cy + radius * Math.sin((degrees * Math.PI) / 180)]
    const starts = state.percents.map((_, index) => -90 + percentAngle(sum(state.percents.slice(0, index))))
    const controls = (
        <>
            {transportSurvey.map((row, index) => (
                <Stepper key={index} label={`${l(row.name)} (%)`} value={state.percents[index]} min={0} max={100} step={PERCENT_STEP} onChange={(next) => setState((s) => setPercent(s, index, next))} language={props.language} />
            ))}
        </>
    )
    const note = total === 100
        ? l(say('Ehunekoek 100 ematen dute: zirkulua osorik dago.', 'Los porcentajes suman 100: el círculo está completo.', 'مجموع النسب 100: الدائرة كاملة.'))
        : l(say(`Ehunekoek ${total} ematen dute: ${total < 100 ? 'zirkulua ez da osatzen' : 'gehiegi dira'}.`, `Los porcentajes suman ${total}: ${total < 100 ? 'el círculo no se completa' : 'sobran'}.`, `مجموع النسب ${total}: ${total < 100 ? 'الدائرة غير مكتملة' : 'زائدة'}.`))
    return (
        <ToolFrame {...props} controls={controls} readout={<Readout latex={`${total}\\,\\%\\ \\to\\ ${percentAngle(total).toString().replace('.', props.language === 'ar' ? '.' : '{,}')}^{\\circ}`} note={note} />} challenges={pieChallenges} state={state}>
            <Board height={300} label={l(say('Sektore-diagrama', 'Diagrama de sectores', 'مخطط دائري'))}>
                <circle cx={cx} cy={cy} r={r} fill={PAPER} stroke={LINE} strokeWidth={2} strokeDasharray="6 5" />
                {state.percents.map((percent, index) => {
                    if (percent === 0) return null
                    const angle = Math.min(percentAngle(percent), 359.99)
                    const start = starts[index]
                    if (start >= 270) return null
                    const end = Math.min(start + angle, 270)
                    const [x1, y1] = point(start)
                    const [x2, y2] = point(end)
                    const [lx, ly] = point((start + end) / 2, r * 0.62)
                    const full = end - start >= 359.99
                    return (
                        <g key={index}>
                            {full ? <circle cx={cx} cy={cy} r={r} fill={COLORS[index]} fillOpacity={0.72} stroke={INK} strokeWidth={2} /> : <path d={`M${cx} ${cy} L${x1} ${y1} A${r} ${r} 0 ${end - start > 180 ? 1 : 0} 1 ${x2} ${y2} Z`} fill={COLORS[index]} fillOpacity={0.72} stroke={INK} strokeWidth={2} />}
                            {end - start >= 18 && <Text x={lx} y={ly + 5} size={14}>{`${Math.round((end - start) * 10) / 10}°`.replace('.', props.language === 'ar' ? '.' : ',')}</Text>}
                        </g>
                    )
                })}
                {transportSurvey.map((_, index) => (
                    <g key={index}>
                        <rect x={330} y={70 + index * 44} width={20} height={20} fill={COLORS[index]} fillOpacity={0.72} stroke={INK} strokeWidth={1.4} />
                        <Text x={360} y={86 + index * 44} anchor="start" size={15}>{`${state.percents[index]} % → ${String(percentAngle(state.percents[index])).replace('.', props.language === 'ar' ? '.' : ',')}°`}</Text>
                    </g>
                ))}
                <Text x={330} y={270} anchor="start" size={15} color={total === 100 ? STAGE : SECOND}>Σ = {total} %</Text>
            </Board>
        </ToolFrame>
    )
}

/* ---------- 4. The centre of a table ---------- */

export function CentreTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<CentreState>(initialCentreState)
    const total = sum(state.counts)
    const mean = tableMean(state.counts)
    const median = tableMedian(state.counts)
    const modes = tableModes(state.counts)
    const x = (value: number) => 80 + value * 95
    const unit = 18
    const marker = (value: FractionValue | null, color: string, label: string, row: number) => {
        if (value === null) return null
        const at = x(toNumber(value))
        return (
            <g>
                <polygon points={`${at},${226 + row * 22} ${at - 8},${240 + row * 22} ${at + 8},${240 + row * 22}`} fill={color} />
                <Text x={at + 14} y={239 + row * 22} anchor="start" size={13} color={color}>{label}</Text>
            </g>
        )
    }
    const controls = (
        <>
            {CENTRE_VALUES.map((value) => (
                <Stepper key={value} label={`${value} (fᵢ)`} value={state.counts[value]} min={0} max={CENTRE_MAX} onChange={(next) => setState((s) => setCentreCount(s, value, next))} language={props.language} />
            ))}
        </>
    )
    const latex = mean === null || median === null ? 'N=0' : `\\bar{x}${texIs(mean, props.language)}\\qquad \\text{Me}${texIs(median, props.language)}\\qquad \\text{Mo}=${modes.join(',\\ ')}`
    return (
        <ToolFrame {...props} controls={controls} readout={<Readout latex={latex} note={l(say(`N = ${total}. Gorria batez bestekoa da, urdina mediana.`, `N = ${total}. La roja es la media; la azul, la mediana.`, `N = ${total}. الأحمر المتوسط والأزرق الوسيط.`))} />} challenges={centreChallenges} state={state}>
            <Board height={290} label={l(say('Maiztasunen barra-diagrama eta parametroak', 'Diagrama de barras de frecuencias y parámetros', 'مخطط أعمدة التكرارات والمقاييس'))}>
                <line x1={40} x2={620} y1={210} y2={210} stroke={INK} strokeWidth={2} />
                {CENTRE_VALUES.map((value) => {
                    const count = state.counts[value]
                    const isMode = modes.includes(value)
                    return (
                        <g key={value}>
                            <rect x={x(value) - 26} y={210 - count * unit} width={52} height={count * unit} fill={isMode ? COLORS[2] : STAGE} fillOpacity={0.55} stroke={INK} strokeWidth={1.8} />
                            {count > 0 && <Text x={x(value)} y={202 - count * unit} size={14}>{count}</Text>}
                        </g>
                    )
                })}
                {CENTRE_VALUES.map((value) => <Text key={value} x={x(value)} y={222 + 46} size={15}>{value}</Text>)}
                {marker(mean, SECOND, 'x̄', 0)}
                {marker(median, STAGE, 'Me', 1)}
            </Board>
        </ToolFrame>
    )
}

/* ---------- 5. Box and whiskers ---------- */

export function BoxTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<BoxState>(initialBoxState)
    const summary = fiveNumbers(state.values)
    const mean = boxMean(state.values)
    const deviation = meanDeviation(state.values)
    const x = (value: number) => 60 + value * 52
    const stacks = new Map<number, number>()
    const controls = (
        <>
            {state.values.map((value, index) => (
                <Stepper key={index} label={l(say(`${index + 1}. datua`, `Dato ${index + 1}`, `البيان ${index + 1}`))} value={value} min={0} max={BOX_MAX} onChange={(next) => setState((s) => setBoxValue(s, index, next))} language={props.language} />
            ))}
        </>
    )
    const latex = `\\text{Me}=${summary.median}\\quad Q_1=${summary.q1}\\quad Q_3=${summary.q3}\\quad \\bar{x}${texIs(mean, props.language)}\\quad \\text{DM}${texIs(deviation, props.language)}`
    const dots = state.values.map((value) => {
        const level = stacks.get(value) ?? 0
        stacks.set(value, level + 1)
        return { value, level }
    })
    return (
        <ToolFrame {...props} controls={controls} readout={<Readout latex={latex} note={l(say(`Ibiltartea: ${summary.max} − ${summary.min} = ${summary.max - summary.min}. Kutxa: ${summary.q3} − ${summary.q1} = ${summary.q3 - summary.q1}.`, `Recorrido: ${summary.max} − ${summary.min} = ${summary.max - summary.min}. Caja: ${summary.q3} − ${summary.q1} = ${summary.q3 - summary.q1}.`, `المدى: ${summary.max} − ${summary.min} = ${summary.max - summary.min}. الصندوق: ${summary.q3} − ${summary.q1} = ${summary.q3 - summary.q1}.`))} />} challenges={boxChallenges} state={state}>
            <Board height={300} label={l(say('Datuak eta kutxa-diagrama', 'Los datos y su diagrama de caja', 'البيانات ومخطط الصندوق'))}>
                {dots.map(({ value, level }, index) => (
                    <circle key={index} cx={x(value)} cy={110 - level * 22} r={9} fill={STAGE} fillOpacity={0.6} stroke={INK} strokeWidth={1.4} />
                ))}
                <line x1={x(0)} x2={x(10)} y1={126} y2={126} stroke={LINE} strokeWidth={1.4} />
                <line x1={x(summary.min)} x2={x(summary.q1)} y1={190} y2={190} stroke={INK} strokeWidth={2.4} />
                <line x1={x(summary.q3)} x2={x(summary.max)} y1={190} y2={190} stroke={INK} strokeWidth={2.4} />
                <line x1={x(summary.min)} x2={x(summary.min)} y1={176} y2={204} stroke={INK} strokeWidth={2.4} />
                <line x1={x(summary.max)} x2={x(summary.max)} y1={176} y2={204} stroke={INK} strokeWidth={2.4} />
                <rect x={x(summary.q1)} y={166} width={Math.max(x(summary.q3) - x(summary.q1), 2)} height={48} fill={STAGE_TINT} stroke={INK} strokeWidth={2.4} />
                <line x1={x(summary.median)} x2={x(summary.median)} y1={166} y2={214} stroke={SECOND} strokeWidth={3.4} />
                <line x1={x(toNumber(mean))} x2={x(toNumber(mean))} y1={140} y2={160} stroke={SECOND} strokeWidth={2} strokeDasharray="4 3" />
                <Text x={x(toNumber(mean))} y={152} anchor="start" size={12} color={SECOND}>{' x̄'}</Text>
                <line x1={x(0)} x2={x(10)} y1={250} y2={250} stroke={INK} strokeWidth={2} />
                {Array.from({ length: 11 }, (_, value) => (
                    <g key={value}>
                        <line x1={x(value)} x2={x(value)} y1={244} y2={256} stroke={INK} strokeWidth={1.6} />
                        <Text x={x(value)} y={276} size={14} weight={400}>{value}</Text>
                    </g>
                ))}
            </Board>
        </ToolFrame>
    )
}

/* ---------- 6. The table of two dice ---------- */

const ruleNames: Record<DiceRule, string> = { equal: '=', atLeast: '≥', atMost: '≤' }

export function DiceTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<DiceState>(initialDiceState)
    const favourable = diceFavourable(state)
    const probability = diceProbability(state)
    const size = 38
    const x0 = 200
    const y0 = 34
    const controls = (
        <>
            <Segmented label={l(say('Gertaera: batura', 'Suceso: la suma', 'الحدث: المجموع'))} value={state.rule} options={(['equal', 'atLeast', 'atMost'] as DiceRule[]).map((value) => ({ value, label: ruleNames[value] }))} onChange={(value) => setState((s) => setDice(s, { rule: value }))} />
            <Stepper label={l(say('Zenbakia', 'Número', 'العدد'))} value={state.target} min={2} max={12} onChange={(value) => setState((s) => setDice(s, { target: value }))} language={props.language} />
        </>
    )
    const simplified = probability.denominator === 36 ? '' : `=\\frac{${probability.numerator}}{${probability.denominator}}`
    const latex = `P=\\frac{${favourable}}{36}${favourable === 0 ? '=0' : simplified}\\qquad P(\\bar{A})=\\frac{${36 - favourable}}{36}`
    return (
        <ToolFrame {...props} controls={controls} readout={<Readout latex={latex} note={l(say(`Batura ${ruleNames[state.rule]} ${state.target}: ${favourable} gelaxka 36tik.`, `Suma ${ruleNames[state.rule]} ${state.target}: ${favourable} casillas de 36.`, `المجموع ${ruleNames[state.rule]} ${state.target}: ${favourable} خانة من 36.`))} />} challenges={diceChallenges} state={state}>
            <Board height={300} label={l(say('Bi dadoren baturen taula', 'Tabla de sumas de dos dados', 'جدول مجاميع نردين'))}>
                <Text x={x0 - 26} y={y0 + 14} color={MUTED} size={16}>+</Text>
                {[1, 2, 3, 4, 5, 6].map((face) => (
                    <g key={face}>
                        <Text x={x0 + (face - 0.5) * size} y={y0 + 14} color={STAGE} size={16}>{face}</Text>
                        <Text x={x0 - 14} y={y0 + 24 + (face - 0.5) * size + 5} color={STAGE} size={16}>{face}</Text>
                    </g>
                ))}
                {[1, 2, 3, 4, 5, 6].flatMap((a) => [1, 2, 3, 4, 5, 6].map((b) => {
                    const on = diceCell(state.rule, state.target, a, b)
                    return (
                        <g key={`${a}-${b}`}>
                            <rect x={x0 + (b - 1) * size} y={y0 + 24 + (a - 1) * size} width={size - 3} height={size - 3} rx={6} fill={on ? SECOND : PAPER} fillOpacity={on ? 0.8 : 1} stroke={INK} strokeWidth={1.4} />
                            <Text x={x0 + (b - 1) * size + (size - 3) / 2} y={y0 + 24 + (a - 1) * size + 24} size={15} color={on ? PAPER : INK}>{a + b}</Text>
                        </g>
                    )
                }))}
            </Board>
        </ToolFrame>
    )
}
