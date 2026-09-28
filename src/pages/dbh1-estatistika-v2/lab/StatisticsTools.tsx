import { useState } from 'react'
import { MathText } from '../../../components/MathText'
import { ResultAnswer, Segmented, Stepper, ToolFrame } from '../../../features/unit-v2/lab/LabKit'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import { useLabText } from '../../../features/unit-v2/lab/useLabText'
import { toExactDecimal, toNumber, type FractionValue } from '../../../features/unit-v2/math/fraction'
import type { LocalizedText, UnitLanguage } from '../../../features/unit-v2/types'
import { sportSurvey } from '../survey'
import {
    addRolls,
    answerChart,
    answerDice,
    answerMean,
    chartsChallenges,
    chooseKind,
    DATA_LIMITS,
    diceChallenges,
    diceEvents,
    eventFrequency,
    favourableOf,
    FREQUENCY_LIMITS,
    initialChartsState,
    initialDiceState,
    initialFrequencyState,
    initialMeanState,
    initialVariablesState,
    meanChallenges,
    meanOf,
    medianOf,
    modesOf,
    probabilityOf,
    rangeOf,
    relative,
    resetRolls,
    sectorAngle,
    setChart,
    setCount,
    setEvent,
    setValue,
    tableChallenges,
    throwsOf,
    total,
    variableCards,
    variablesChallenges,
    type ChartKind,
    type ChartsState,
    type DiceEvent,
    type DiceState,
    type FrequencyState,
    type MeanState,
    type VariableKind,
    type VariablesState
} from './labTools'

const INK = 'var(--ink, #1d2733)'
const STAGE = 'var(--stage, #2f6fdb)'
const STAGE_TINT = 'var(--stage-tint, #dde7f7)'
const SECOND = 'var(--second, #c4432a)'
const LINE = 'var(--line, #d6cfc2)'

/** A value as a decimal in the learner's language: exact when it ends, otherwise rounded with ≈ */
function decimal(value: FractionValue, language: UnitLanguage, digits = 2): string {
    const separator = language === 'ar' ? '.' : ','
    const exact = toExactDecimal(value, separator)
    if (exact !== null && exact.replace(/^[^,.]*[,.]?/, '').length <= digits) return exact
    const rounded = Math.round(toNumber(value) * 10 ** digits) / 10 ** digits
    return `≈ ${String(rounded).replace('.', separator)}`
}

const answerTexts = {
    placeholder: { eu: 'Adib.: 0,25 edo 1/4', es: 'Ej.: 0,25 o 1/4', ar: 'مثال: 0.25 أو 1/4' },
    unreadable: { eu: 'Idatzi zenbaki bat edo zatiki bat.', es: 'Escribe un número o una fracción.', ar: 'اكتب عددًا أو كسرًا.' }
}

/* ---------- Variable sorter ---------- */

const kindNames: Record<VariableKind, LocalizedText> = {
    qualitative: { eu: 'Kualitatiboa', es: 'Cualitativa', ar: 'نوعي' },
    discrete: { eu: 'Diskretua', es: 'Discreta', ar: 'منفصل' },
    continuous: { eu: 'Jarraitua', es: 'Continua', ar: 'متصل' }
}

export function VariablesTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<VariablesState>(initialVariablesState)
    const sortedCount = state.choices.filter((choice) => choice !== null).length
    const controls = (
        <>
            <p className="fraction-v2-lab-tip">{l({ eu: 'Aldagai bakoitzerako, aukeratu mota. Gero begiratu erronkei.', es: 'Para cada variable, elige su tipo. Después mira los retos.', ar: 'لكل متغير اختر نوعه، ثم انظر إلى التحديات.' })}</p>
            <p className="statistics-lab-score">{l({ eu: `Sailkatuta: ${sortedCount} / ${variableCards.length}`, es: `Clasificadas: ${sortedCount} / ${variableCards.length}`, ar: `المصنّفة: ${sortedCount} / ${variableCards.length}` })}</p>
            <button type="button" className="fraction-v2-secondary" onClick={() => setState(initialVariablesState)}>{l({ eu: 'Berriro hasi', es: 'Empezar de nuevo', ar: 'ابدأ من جديد' })}</button>
        </>
    )
    return (
        <ToolFrame {...props} controls={controls} challenges={variablesChallenges} state={state}>
            <ul className="statistics-lab-cards">
                {variableCards.map((card, index) => (
                    <li key={index}>
                        <p>{l(card.name)}</p>
                        <div role="group" aria-label={l(card.name)}>
                            {(['qualitative', 'discrete', 'continuous'] as const).map((kind) => (
                                <button type="button" aria-pressed={state.choices[index] === kind} onClick={() => setState((current) => chooseKind(current, index, kind))} key={kind}>{l(kindNames[kind])}</button>
                            ))}
                        </div>
                    </li>
                ))}
            </ul>
        </ToolFrame>
    )
}

/* ---------- Frequency table ---------- */

function CountSteppers({ counts, language, onChange }: { counts: number[]; language: UnitLanguage; onChange: (index: number, count: number) => void }) {
    const l = useLabText(language)
    return (
        <>
            {sportSurvey.map((row, index) => (
                <Stepper key={index} label={`${l(row.name)} (fᵢ)`} value={counts[index]} min={FREQUENCY_LIMITS.min} max={FREQUENCY_LIMITS.max} onChange={(next) => onChange(index, next)} language={language} />
            ))}
        </>
    )
}

export function TableTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<FrequencyState>(initialFrequencyState)
    const { counts } = state
    const n = total(counts)
    const controls = <CountSteppers counts={counts} language={props.language} onChange={(index, count) => setState((current) => setCount(current, index, count))} />
    const readout = (
        <>
            <span className="fraction-v2-lab-readout-main"><MathText text={`$N=${counts.join('+')}=${n}$`} /></span>
            <span className="fraction-v2-lab-readout-note">{l({ eu: 'Maiztasun erlatiboa: fᵢ : N. Ehunekoa: hᵢ · 100.', es: 'Frecuencia relativa: fᵢ : N. Porcentaje: hᵢ · 100.', ar: 'التكرار النسبي: fᵢ : N. النسبة المئوية: hᵢ · 100.' })}</span>
        </>
    )
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={tableChallenges} state={state}>
            <div className="statistics-lab-figure">
                <table className="statistics-lab-table">
                    <thead>
                        <tr>
                            <th scope="col">{l({ eu: 'Kirola', es: 'Deporte', ar: 'الرياضة' })}</th>
                            <th scope="col">fᵢ</th>
                            <th scope="col">hᵢ</th>
                            <th scope="col">%</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sportSurvey.map((row, index) => {
                            const h = relative(counts, index)
                            return (
                                <tr key={index}>
                                    <th scope="row"><span className="statistics-lab-swatch" style={{ background: row.color }} />{l(row.name)}</th>
                                    <td>{counts[index]}</td>
                                    <td>{h ? decimal(h, props.language) : '—'}</td>
                                    <td>{h ? decimal({ numerator: h.numerator * 100, denominator: h.denominator }, props.language, 1) : '—'}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th scope="row">{l({ eu: 'Guztira', es: 'Total', ar: 'المجموع' })}</th>
                            <td>{n}</td>
                            <td>{n > 0 ? '1' : '—'}</td>
                            <td>{n > 0 ? '100' : '—'}</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </ToolFrame>
    )
}

/* ---------- Chart maker ---------- */

function BarChart({ counts, language }: { counts: number[]; language: UnitLanguage }) {
    const l = useLabText(language)
    const top = Math.max(4, ...counts)
    const height = 190
    const unit = height / top
    const step = top > 10 ? 2 : 1
    return (
        <svg viewBox="0 0 480 260" role="img" aria-label={counts.join(', ')}>
            {Array.from({ length: Math.floor(top / step) + 1 }, (_, index) => index * step).map((value) => (
                <g key={value}>
                    <line x1={50} x2={460} y1={220 - value * unit} y2={220 - value * unit} stroke={LINE} strokeWidth={1} />
                    <text x={42} y={225 - value * unit} textAnchor="end" fontSize={13} fill={INK}>{value}</text>
                </g>
            ))}
            {counts.map((count, index) => (
                <g key={index}>
                    <rect x={70 + index * 100} y={220 - count * unit} width={64} height={count * unit} fill={sportSurvey[index].color} fillOpacity={0.8} stroke={INK} strokeWidth={1.6} />
                    <text x={102 + index * 100} y={244} textAnchor="middle" fontSize={13} fill={INK}>{l(sportSurvey[index].name)}</text>
                </g>
            ))}
            <line x1={50} x2={460} y1={220} y2={220} stroke={INK} strokeWidth={2} />
            <line x1={50} x2={50} y1={20} y2={220} stroke={INK} strokeWidth={2} />
        </svg>
    )
}

function PieChart({ counts, language }: { counts: number[]; language: UnitLanguage }) {
    const l = useLabText(language)
    const n = total(counts)
    const cx = 140
    const cy = 130
    const r = 105
    const starts = counts.map((_, index) => -90 + (n === 0 ? 0 : (360 * total(counts.slice(0, index))) / n))
    const point = (degrees: number, radius: number) => [cx + radius * Math.cos((degrees * Math.PI) / 180), cy + radius * Math.sin((degrees * Math.PI) / 180)]
    return (
        <svg viewBox="0 0 480 260" role="img" aria-label={counts.join(', ')}>
            {n === 0 && <circle cx={cx} cy={cy} r={r} fill="none" stroke={INK} strokeWidth={2} strokeDasharray="6 5" />}
            {counts.map((count, index) => {
                if (n === 0 || count === 0) return null
                const angle = (360 * count) / n
                const start = starts[index]
                const [lx, ly] = point(start + angle / 2, r * 0.62)
                if (count === n) {
                    return (
                        <g key={index}>
                            <circle cx={cx} cy={cy} r={r} fill={sportSurvey[index].color} fillOpacity={0.8} stroke={INK} strokeWidth={2} />
                            <text x={cx} y={cy + 5} textAnchor="middle" fontSize={14} fontWeight={700} fill={INK}>360°</text>
                        </g>
                    )
                }
                const [x1, y1] = point(start, r)
                const [x2, y2] = point(start + angle, r)
                return (
                    <g key={index}>
                        <path d={`M${cx} ${cy} L${x1} ${y1} A${r} ${r} 0 ${angle > 180 ? 1 : 0} 1 ${x2} ${y2} Z`} fill={sportSurvey[index].color} fillOpacity={0.8} stroke={INK} strokeWidth={2} />
                        {angle >= 20 && <text x={lx} y={ly + 5} textAnchor="middle" fontSize={13} fontWeight={700} fill={INK}>{Math.round(angle * 10) / 10}°</text>}
                    </g>
                )
            })}
            {sportSurvey.map((row, index) => (
                <g key={`legend${index}`}>
                    <rect x={280} y={62 + index * 36} width={18} height={18} fill={row.color} fillOpacity={0.8} stroke={INK} strokeWidth={1.4} />
                    <text x={308} y={77 + index * 36} fontSize={15} fill={INK}>{l(row.name)}: {counts[index]}</text>
                </g>
            ))}
        </svg>
    )
}

export function ChartsTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<ChartsState>(initialChartsState)
    const { counts, chart } = state
    const n = total(counts)
    const angle = sectorAngle(counts, 0)
    const controls = (
        <>
            <Segmented label={l({ eu: 'Grafikoa', es: 'Gráfico', ar: 'المخطط' })} value={chart} options={(['pie', 'bar'] as ChartKind[]).map((value) => ({ value, label: value === 'pie' ? l({ eu: 'Sektoreak', es: 'Sectores', ar: 'دائري' }) : l({ eu: 'Barrak', es: 'Barras', ar: 'أعمدة' }) }))} onChange={(next) => setState((current) => setChart(current, { chart: next }))} />
            <CountSteppers counts={counts} language={props.language} onChange={(index, count) => setState((current) => setChart(current, { index, count }))} />
        </>
    )
    const readout = angle && (
        <>
            <span className="fraction-v2-lab-readout-main">
                {l({ eu: 'Futbolaren sektorea:', es: 'Sector del fútbol:', ar: 'قطاع كرة القدم:' })}{' '}
                <MathText text={`$\\frac{${counts[0]}}{${n}}\\cdot 360^{\\circ}${state.checked || state.revealed ? `=${decimal(angle, props.language).replace(',', '{,}').replace('≈ ', '\\approx ')}^{\\circ}` : ''}$`} />
            </span>
            <ResultAnswer language={props.language} state={state} expected={angle} placeholder={{ eu: 'Adib.: 144', es: 'Ej.: 144', ar: 'مثال: 144' }} unreadable={answerTexts.unreadable} onChange={(patch) => setState((current) => answerChart(current, patch))} />
        </>
    )
    return (
        <ToolFrame {...props} controls={controls} readout={readout || undefined} challenges={chartsChallenges} state={state}>
            <div className="statistics-lab-figure">
                {chart === 'bar' ? <BarChart counts={counts} language={props.language} /> : <PieChart counts={counts} language={props.language} />}
            </div>
        </ToolFrame>
    )
}

/* ---------- Balance of the mean ---------- */

export function MeanTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<MeanState>(initialMeanState)
    const { values } = state
    const mean = meanOf(values)
    const shown = state.checked || state.revealed
    const x = (value: number) => 50 + value * 38
    const stacks = new Map<number, number>()
    const dots = values.map((value) => {
        const level = stacks.get(value) ?? 0
        stacks.set(value, level + 1)
        return { value, level }
    })
    const controls = (
        <>
            {values.map((value, index) => (
                <Stepper key={index} label={l({ eu: `${index + 1}. datua`, es: `Dato ${index + 1}`, ar: `القيمة ${index + 1}` })} value={value} min={DATA_LIMITS.min} max={DATA_LIMITS.max} onChange={(next) => setState((current) => setValue(current, index, next))} language={props.language} />
            ))}
        </>
    )
    const readout = (
        <>
            <span className="fraction-v2-lab-readout-main">
                <MathText text={`$\\bar{x}=\\frac{${values.join('+')}}{${values.length}}${shown ? `=${decimal(mean, props.language).replace(',', '{,}').replace('≈ ', '\\approx ')}` : ''}$`} />
            </span>
            <span className="fraction-v2-lab-readout-note">
                {l({ eu: 'Mediana', es: 'Mediana', ar: 'الوسيط' })}: {decimal(medianOf(values), props.language)} · {l({ eu: 'Moda', es: 'Moda', ar: 'المنوال' })}: {modesOf(values).join(', ')} · {l({ eu: 'Ibiltartea', es: 'Rango', ar: 'المدى' })}: {rangeOf(values)}
            </span>
            <ResultAnswer language={props.language} state={state} expected={mean} placeholder={{ eu: 'Adib.: 7,2', es: 'Ej.: 7,2', ar: 'مثال: 7.2' }} unreadable={answerTexts.unreadable} onChange={(patch) => setState((current) => answerMean(current, patch))} />
        </>
    )
    const meanX = x(toNumber(mean))
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={meanChallenges} state={state}>
            <div className="statistics-lab-figure">
                <svg viewBox="0 0 480 240" role="img" aria-label={values.join(', ')}>
                    <line x1={x(0) - 10} x2={x(10) + 10} y1={170} y2={170} stroke={INK} strokeWidth={3} strokeLinecap="round" />
                    {Array.from({ length: 11 }, (_, value) => (
                        <g key={value}>
                            <line x1={x(value)} x2={x(value)} y1={165} y2={175} stroke={INK} strokeWidth={1.4} />
                            <text x={x(value)} y={228} textAnchor="middle" fontSize={14} fill={INK}>{value}</text>
                        </g>
                    ))}
                    {dots.map((dot, index) => <circle key={index} cx={x(dot.value)} cy={156 - dot.level * 24} r={10} fill={STAGE_TINT} stroke={STAGE} strokeWidth={2.4} />)}
                    <polygon points={`${meanX},${174} ${meanX - 14},${204} ${meanX + 14},${204}`} fill={shown ? SECOND : 'none'} stroke={SECOND} strokeWidth={2.4} strokeDasharray={shown ? undefined : '4 3'} />
                    <text x={meanX} y={24} textAnchor="middle" fontSize={14} fontWeight={700} fill={SECOND}>{shown ? 'x̄' : 'x̄ ?'}</text>
                    <line x1={meanX} x2={meanX} y1={30} y2={170} stroke={SECOND} strokeWidth={1.4} strokeDasharray="5 4" opacity={shown ? 1 : 0.35} />
                </svg>
            </div>
        </ToolFrame>
    )
}

/* ---------- Die simulator ---------- */

const rollDice = (times: number) => Array.from({ length: times }, () => 1 + Math.floor(Math.random() * 6))

export function DiceTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<DiceState>(initialDiceState)
    const throws = throwsOf(state)
    const frequency = eventFrequency(state)
    const probability = probabilityOf(state.event)
    const { faces: favourable } = diceEvents[state.event]
    const top = Math.max(1, ...state.faces)
    const controls = (
        <>
            <Segmented label={l({ eu: 'Gertaera', es: 'Suceso', ar: 'الحدث' })} value={state.event} options={(Object.keys(diceEvents) as DiceEvent[]).map((value) => ({ value, label: l(diceEvents[value].name) }))} onChange={(next) => setState((current) => setEvent(current, next))} />
            <span className="fraction-v2-stepper-label">{l({ eu: 'Jaurti', es: 'Lanzar', ar: 'ارمِ' })}</span>
            <div className="fraction-v2-lab-quick-actions">
                {[1, 10, 100, 1000].map((times) => (
                    <button type="button" key={times} onClick={() => setState((current) => addRolls(current, rollDice(times)))}>×{times}</button>
                ))}
            </div>
            <button type="button" className="fraction-v2-secondary" onClick={() => setState(resetRolls)}>{l({ eu: 'Hustu', es: 'Vaciar', ar: 'إفراغ' })}</button>
        </>
    )
    const readout = (
        <>
            <span className="fraction-v2-lab-readout-main">
                {l({ eu: `${throws} jaurtiketa · aldekoak: ${favourableOf(state)}`, es: `${throws} lanzamientos · favorables: ${favourableOf(state)}`, ar: `${throws} رمية · الملائمة: ${favourableOf(state)}` })}
                {frequency && <> · h = {decimal(frequency, props.language, 3)}</>}
            </span>
            <span className="fraction-v2-lab-readout-note">
                {l({ eu: 'Aldeko kasuak', es: 'Casos favorables', ar: 'الحالات الملائمة' })}: {`{${favourable.join(', ')}}`}
                {(state.checked || state.revealed) && <> · P = {decimal(probability, props.language, 3)}</>}
            </span>
            <ResultAnswer language={props.language} state={state} expected={probability} placeholder={answerTexts.placeholder} unreadable={answerTexts.unreadable} onChange={(patch) => setState((current) => answerDice(current, patch))} />
        </>
    )
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={diceChallenges} state={state}>
            <div className="statistics-lab-figure">
                <svg viewBox="0 0 480 250" role="img" aria-label={state.faces.join(', ')}>
                    {state.faces.map((count, index) => {
                        const height = (count / top) * 160
                        const isFavourable = favourable.includes(index + 1)
                        return (
                            <g key={index}>
                                <rect x={40 + index * 70} y={190 - height} width={50} height={height} fill={isFavourable ? STAGE_TINT : 'none'} stroke={isFavourable ? STAGE : INK} strokeWidth={2} />
                                <text x={65 + index * 70} y={184 - height} textAnchor="middle" fontSize={13} fill={INK}>{count}</text>
                                <rect x={50 + index * 70} y={200} width={30} height={30} rx={6} fill={isFavourable ? STAGE : '#fffcf6'} stroke={INK} strokeWidth={1.6} />
                                <text x={65 + index * 70} y={221} textAnchor="middle" fontSize={16} fontWeight={700} fill={isFavourable ? '#fffcf6' : INK}>{index + 1}</text>
                            </g>
                        )
                    })}
                    <line x1={30} x2={460} y1={190} y2={190} stroke={INK} strokeWidth={2} />
                </svg>
            </div>
        </ToolFrame>
    )
}
