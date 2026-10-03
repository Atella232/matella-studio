import { useState, type ReactNode } from 'react'
import { MathText } from '../../../components/MathText'
import { Segmented, Stepper, ToolFrame } from '../../../features/unit-v2/lab/LabKit'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import { useLabText } from '../../../features/unit-v2/lab/useLabText'
import { fraction, toExactDecimal, toNumber, type FractionValue } from '../../../features/unit-v2/math/fraction'
import { Label } from '../../dbh2-funtzioak-v2/plane'
import {
    CAPITALS,
    chainChallenges,
    chainFinal,
    chainIndex,
    CHAIN_STARTS,
    CHANGE_LIMIT,
    CHANGE_STEP,
    changeIndex,
    chooseCompoundProblem,
    chooseRelation,
    compoundChallenges,
    compoundProblems,
    compoundResult,
    factor,
    initialChainState,
    initialCompoundState,
    initialInterestState,
    initialShareState,
    interestChallenges,
    interestOf,
    RATE_MAX,
    rightRelations,
    setChain,
    setInterest,
    setShare,
    SHARE_NUMBER_MAX,
    SHARE_TOTALS,
    shareChallenges,
    shareParts,
    YEARS_MAX,
    type ChainState,
    type CompoundState,
    type InterestState,
    type Relation,
    type ShareState
} from './labTools'

const INK = 'var(--ink, #1d2733)'
const MUTED = 'var(--muted, #58616e)'
const STAGE = 'var(--stage, #2f6fdb)'
const STAGE_TINT = 'var(--stage-tint, #dde7f7)'
const SECOND = 'var(--second, #c4432a)'
const GREEN = 'var(--success, #267b53)'
const CARD = 'var(--card, #fffcf6)'

type Text = { eu: string; es: string; ar: string }
const say = (eu: string, es: string, ar: string): Text => ({ eu, es, ar })
/** {,} in LaTeX becomes the point in Arabic */
const localLatex = (language: string, latex: string) => (language === 'ar' ? latex.replace(/\{,\}/g, '.') : latex)
/** A value in LaTeX: exact with up to two decimals, otherwise rounded with ≈ */
const valueLatex = (value: FractionValue) => {
    const exact = toExactDecimal(value, ',')
    if (exact !== null && (exact.split(',')[1] ?? '').length <= 3) return exact.replace(',', '{,}')
    return `\\approx ${(Math.round(toNumber(value) * 100) / 100).toString().replace('.', '{,}')}`
}
/** A value as plain text in the drawings */
const valueText = (language: string, value: FractionValue) => {
    const exact = toExactDecimal(value, language === 'ar' ? '.' : ',')
    if (exact !== null && (exact.split(/[.,]/)[1] ?? '').length <= 3) return exact
    const rounded = (Math.round(toNumber(value) * 100) / 100).toString()
    return `≈ ${language === 'ar' ? rounded : rounded.replace('.', ',')}`
}
/** The terms of a fraction as LaTeX */
const termLatex = (value: FractionValue) => (value.denominator === 1 ? String(value.numerator) : valueLatex(value))

function Board({ height, label, children }: { height: number; label: string; children: ReactNode }) {
    return <svg viewBox={`0 0 640 ${height}`} direction="ltr" role="img" aria-label={label} style={{ width: '100%', height: 'auto', fontFamily: '"Atkinson Hyperlegible", "Noto Sans Arabic", system-ui, sans-serif' }}>{children}</svg>
}

function Readout({ language, latex, note }: { language: string; latex: string; note: string }) {
    return (
        <>
            <span className="fraction-v2-lab-readout-main"><MathText text={localLatex(language, `$${latex}$`)} /></span>
            <span className="fraction-v2-lab-readout-note">{note}</span>
        </>
    )
}

const relationNames: Record<Relation, Text> = { direct: say('Zuzena', 'Directa', 'طردي'), inverse: say('Alderantzizkoa', 'Inversa', 'عكسي') }

/* ---------- 1. The compound-proportionality machine ---------- */

export function CompoundTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<CompoundState>(initialCompoundState)
    const problem = compoundProblems[state.problem]
    const result = compoundResult(state)
    const right = rightRelations(state.problem)
    const allRight = state.relations[0] === right[0] && state.relations[1] === right[1]
    const controls = (
        <>
            <Segmented label={l(say('Problema', 'Problema', 'المسألة'))} value={String(state.problem)} options={compoundProblems.map((_, index) => ({ value: String(index), label: `${index + 1}${state.solved.includes(index) ? ' ✓' : ''}` }))} onChange={(next) => setState((s) => chooseCompoundProblem(s, Number(next)))} />
            <p className="fraction-v2-lab-tip">{l(problem.text)}</p>
            {problem.magnitudes.map((magnitude, index) => (
                <Segmented key={index} label={l(magnitude.name)} value={state.relations[index] ?? ''} options={(['direct', 'inverse'] as Relation[]).map((relation) => ({ value: relation, label: l(relationNames[relation]) }))} onChange={(relation) => setState((s) => chooseRelation(s, index as 0 | 1, relation as Relation))} />
            ))}
        </>
    )
    const fractionLatex = (index: number) => {
        const relation = state.relations[index]
        const magnitude = problem.magnitudes[index]
        if (!relation) return '\\square'
        const [top, bottom] = relation === 'direct' ? [magnitude.next, magnitude.old] : [magnitude.old, magnitude.next]
        return `\\frac{${termLatex(top)}}{${termLatex(bottom)}}`
    }
    const latex = `x=${termLatex(problem.known)}\\cdot ${fractionLatex(0)}\\cdot ${fractionLatex(1)}${result ? `=${valueLatex(result)}` : ''}`
    const note = !result
        ? l(say('Aukeratu magnitude bakoitzaren erlazioa.', 'Elige la relación de cada magnitud.', 'اختر علاقة كل مقدار.'))
        : allRight
            ? l(say('Zuzena! Bi erlazioak ondo daude.', '¡Correcto! Las dos relaciones están bien.', 'صحيح! العلاقتان صحيحتان.'))
            : l(say('Berrikusi: hau handitzean, ezezaguna handitu ala txikitu egiten da?', 'Revisa: al crecer esta, ¿la incógnita crece o decrece?', 'راجع: حين يزيد هذا هل يزيد المجهول أم ينقص؟'))
    const cell = 150
    return (
        <ToolFrame {...props} controls={controls} readout={<Readout language={props.language} latex={latex} note={note} />} challenges={compoundChallenges} state={state}>
            <Board height={230} label={l(problem.text)}>
                {[...problem.magnitudes.map((magnitude) => ({ head: magnitude.name, old: magnitude.old, next: magnitude.next as FractionValue | null })), { head: problem.unknown, old: problem.known, next: result && allRight ? result : null }].map((column, index) => {
                    const x = 50 + index * (cell + 30)
                    const relation = index < 2 ? state.relations[index] : null
                    const color = relation === 'inverse' ? SECOND : STAGE
                    return (
                        <g key={index}>
                            <rect x={x} y={14} width={cell} height={38} fill={index === 2 ? '#fbebc0' : STAGE_TINT} stroke={INK} strokeWidth={1.6} />
                            <Label x={x + cell / 2} y={39} textAnchor="middle" fontSize={15} fontWeight={700} fill={INK}>{l(column.head)}</Label>
                            {[column.old, column.next].map((value, row) => (
                                <g key={row}>
                                    <rect x={x} y={52 + row * 44} width={cell} height={44} fill={CARD} stroke={INK} strokeWidth={1.6} />
                                    <text x={x + cell / 2} y={81 + row * 44} textAnchor="middle" fontSize={20} fontWeight={700} fill={value ? INK : SECOND}>{value ? valueText(props.language, value) : 'x'}</text>
                                </g>
                            ))}
                            {relation && <path d={relation === 'direct' ? `M${x + cell / 2} 152 l0 34 m-6 -9 l6 9 l6 -9` : `M${x + cell / 2} 186 l0 -34 m-6 9 l6 -9 l6 9`} fill="none" stroke={color} strokeWidth={2.6} />}
                            {index === 2 && <path d={`M${x + cell / 2} 152 l0 34 m-6 -9 l6 9 l6 -9`} fill="none" stroke={INK} strokeWidth={2.6} />}
                            {relation && <text x={x + cell / 2} y={214} textAnchor="middle" fontSize={16} fontWeight={700} fill={color}>{`· ${valueText(props.language, factor(problem.magnitudes[index], relation))}`}</text>}
                        </g>
                    )
                })}
            </Board>
        </ToolFrame>
    )
}

/* ---------- 2. Proportional shares ---------- */

export function ShareTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<ShareState>(initialShareState)
    const parts = shareParts(state)
    const colors = ['#2f6fdb', '#c4432a', '#267b53']
    const controls = (
        <>
            <Segmented label={l(say('Kantitatea', 'Cantidad', 'الكمية'))} value={String(state.total)} options={SHARE_TOTALS.map((total) => ({ value: String(total), label: String(total) }))} onChange={(total) => setState((s) => setShare(s, { total: Number(total) }))} />
            <Segmented label={l(say('Banaketa', 'Reparto', 'التوزيع'))} value={state.relation} options={[{ value: 'direct', label: l(say('Zuzena', 'Directo', 'طردي')) }, { value: 'inverse', label: l(say('Alderantzizkoa', 'Inverso', 'عكسي')) }]} onChange={(relation) => setState((s) => setShare(s, { relation: relation as Relation }))} />
            {state.numbers.map((value, index) => (
                <Stepper key={index} label={`${l(say('Zenbakia', 'Número', 'العدد'))} ${index + 1}`} value={value} min={1} max={SHARE_NUMBER_MAX} onChange={(next) => setState((s) => setShare(s, { number: [index as 0 | 1 | 2, next] }))} language={props.language} />
            ))}
        </>
    )
    const [a, b, c] = state.numbers
    const latex = state.relation === 'direct'
        ? `${state.total}\\mathbin{:}(${a}+${b}+${c})=${valueLatex(fraction(state.total, a + b + c))}`
        : `\\frac{1}{${a}},\\ \\frac{1}{${b}},\\ \\frac{1}{${c}}`
    const note = parts.map((part) => valueText(props.language, part)).join(' + ') + ` = ${state.total}`
    const total = parts.reduce((sum, part) => sum + toNumber(part), 0)
    // Where each part starts on the bar
    const segments = parts.map((_, index) => parts.slice(0, index).reduce((sum, part) => sum + (toNumber(part) / total) * 560, 0))
    return (
        <ToolFrame {...props} controls={controls} readout={<Readout language={props.language} latex={latex} note={note} />} challenges={shareChallenges} state={state}>
            <Board height={200} label={l(say('Banaketa barra batean', 'El reparto en una barra', 'التوزيع في شريط'))}>
                {parts.map((part, index) => {
                    const width = (toNumber(part) / total) * 560
                    return (
                        <g key={index}>
                            <rect x={40 + segments[index]} y={60} width={width} height={56} fill={colors[index]} fillOpacity={0.35} stroke={INK} strokeWidth={2} />
                            <text x={40 + segments[index] + width / 2} y={46} textAnchor="middle" fontSize={17} fontWeight={700} fill={colors[index]}>{state.numbers[index]}</text>
                            <text x={40 + segments[index] + width / 2} y={146} textAnchor="middle" fontSize={17} fontWeight={700} fill={INK}>{valueText(props.language, part)}</text>
                        </g>
                    )
                })}
                <text x={600} y={186} textAnchor="end" fontSize={15} fontWeight={700} fill={MUTED}>{state.total}</text>
            </Board>
        </ToolFrame>
    )
}

/* ---------- 3. Chained percentages ---------- */

export function ChainTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<ChainState>(initialChainState)
    const sign = (percent: number) => (percent > 0 ? `+${percent} %` : `${percent} %`)
    const controls = (
        <>
            <Segmented label={l(say('Hasierako prezioa', 'Precio inicial', 'السعر الأصلي'))} value={String(state.start)} options={CHAIN_STARTS.map((start) => ({ value: String(start), label: `${start} €` }))} onChange={(start) => setState((s) => setChain(s, { start: Number(start) }))} />
            {state.changes.map((percent, index) => (
                <Stepper key={index} label={`${l(say('Aldaketa', 'Cambio', 'التغيّر'))} ${index + 1}`} value={percent} min={-CHANGE_LIMIT} max={CHANGE_LIMIT} step={CHANGE_STEP} format={sign} onChange={(next) => setState((s) => setChain(s, { change: [index as 0 | 1 | 2, next] }))} language={props.language} />
            ))}
        </>
    )
    const active = state.changes.filter((percent) => percent !== 0)
    const latex = `${state.start}${active.map((percent) => `\\cdot ${valueLatex(changeIndex(percent))}`).join('')}=${valueLatex(chainFinal(state))}`
    const index = chainIndex(state)
    const change = (toNumber(index) - 1) * 100
    const note = l(say(`Indize osoa ${valueText('eu', index)}: guztira ${change >= 0 ? '+' : ''}${(Math.round(change * 100) / 100).toString().replace('.', ',')} %.`, `Índice total ${valueText('es', index)}: en total ${change >= 0 ? '+' : ''}${(Math.round(change * 100) / 100).toString().replace('.', ',')} %.`, `المؤشر الكلي ${valueText('ar', index)}: إجمالًا ${change >= 0 ? '+' : ''}${Math.round(change * 100) / 100}٪.`))
    // Running amounts after each active change
    const steps = active.reduce<FractionValue[]>((list, percent) => [...list, { numerator: list[list.length - 1].numerator * (100 + percent), denominator: list[list.length - 1].denominator * 100 }], [{ numerator: state.start, denominator: 1 }])
    const width = 500 / Math.max(1, steps.length - 1)
    return (
        <ToolFrame {...props} controls={controls} readout={<Readout language={props.language} latex={latex} note={note} />} challenges={chainChallenges} state={state}>
            <Board height={180} label={l(say('Aldaketen katea', 'La cadena de cambios', 'سلسلة التغيّرات'))}>
                {steps.map((value, step) => {
                    const x = steps.length === 1 ? 320 : 70 + step * width
                    return (
                        <g key={step}>
                            {step > 0 && (
                                <g>
                                    <line x1={70 + (step - 1) * width + 54} x2={x - 62} y1={70} y2={70} stroke={active[step - 1] > 0 ? GREEN : SECOND} strokeWidth={2.4} />
                                    <path d={`M${x - 54} 70 l-10 -6 l0 12 z`} fill={active[step - 1] > 0 ? GREEN : SECOND} />
                                    <text x={(70 + (step - 1) * width + x) / 2} y={56} textAnchor="middle" fontSize={15} fontWeight={700} fill={active[step - 1] > 0 ? GREEN : SECOND}>{`· ${valueText(props.language, changeIndex(active[step - 1]))}`}</text>
                                </g>
                            )}
                            <rect x={x - 54} y={46} width={108} height={48} rx={10} fill={step === 0 ? STAGE_TINT : step === steps.length - 1 ? '#fbebc0' : CARD} stroke={INK} strokeWidth={1.8} />
                            <text x={x} y={77} textAnchor="middle" fontSize={18} fontWeight={700} fill={INK}>{valueText(props.language, value)}</text>
                        </g>
                    )
                })}
                <text x={320} y={150} textAnchor="middle" fontSize={18} fontWeight={700} fill={STAGE}>{`· ${valueText(props.language, index)}`}</text>
            </Board>
        </ToolFrame>
    )
}

/* ---------- 4. Simple interest ---------- */

export function InterestTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<InterestState>(initialInterestState)
    const interest = interestOf(state)
    const yearly = (state.capital * state.rate) / 100
    // The final amount fills the width, leaving room for the label
    const scale = 470 / (state.capital + yearly * state.years)
    const controls = (
        <>
            <Segmented label={l(say('Kapitala', 'Capital', 'رأس المال'))} value={String(state.capital)} options={CAPITALS.map((capital) => ({ value: String(capital), label: `${capital} €` }))} onChange={(capital) => setState((s) => setInterest(s, { capital: Number(capital) }))} />
            <Stepper label={l(say('Interes-tasa (%)', 'Tipo de interés (%)', 'سعر الفائدة (٪)'))} value={state.rate} min={1} max={RATE_MAX} onChange={(rate) => setState((s) => setInterest(s, { rate }))} language={props.language} />
            <Stepper label={l(say('Urteak', 'Años', 'السنوات'))} value={state.years} min={1} max={YEARS_MAX} onChange={(years) => setState((s) => setInterest(s, { years }))} language={props.language} />
        </>
    )
    const latex = `I=\\frac{${state.capital}\\cdot ${state.rate}\\cdot ${state.years}}{100}=${valueLatex(interest)}`
    const note = l(say(`Urtero ${yearly} €. Amaieran: ${state.capital + toNumber(interest)} €.`, `Cada año, ${yearly} €. Al final: ${state.capital + toNumber(interest)} €.`, `كل سنة ${yearly} €. في النهاية: ${state.capital + toNumber(interest)} €.`))
    const rowHeight = Math.min(34, 260 / (state.years + 1))
    return (
        <ToolFrame {...props} controls={controls} readout={<Readout language={props.language} latex={latex} note={note} />} challenges={interestChallenges} state={state}>
            <Board height={24 + (state.years + 1) * (rowHeight + 4)} label={l(say('Kapitala eta interesa urtez urte', 'Capital e interés año a año', 'رأس المال والفائدة سنة بعد سنة'))}>
                {Array.from({ length: state.years + 1 }, (_, year) => {
                    const y = 16 + year * (rowHeight + 4)
                    return (
                        <g key={year}>
                            <text x={34} y={y + rowHeight - 6} textAnchor="end" fontSize={13} fontWeight={700} fill={MUTED}>{year}</text>
                            <rect x={40} y={y} width={state.capital * scale} height={rowHeight} fill={STAGE} fillOpacity={0.25} stroke={INK} strokeWidth={1} />
                            {year > 0 && <rect x={40 + state.capital * scale} y={y} width={yearly * year * scale} height={rowHeight} fill={GREEN} fillOpacity={0.45} stroke={INK} strokeWidth={1} />}
                            {year > 0 && <text x={48 + (state.capital + yearly * year) * scale} y={y + rowHeight - 6} fontSize={14} fontWeight={700} fill={GREEN}>{`+${yearly * year} €`}</text>}
                        </g>
                    )
                })}
            </Board>
        </ToolFrame>
    )
}
