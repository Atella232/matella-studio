import { useState } from 'react'
import { MathText } from '../../../components/MathText'
import { Segmented, Stepper, ToolFrame } from '../../../features/unit-v2/lab/LabKit'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import { useLabText } from '../../../features/unit-v2/lab/useLabText'
import { Label } from '../../dbh2-funtzioak-v2/plane'
import { LinePoint, RealAxis } from '../../dbh4-aplikatuak-errealak/realLine'
import { lineMap } from '../../dbh4-aplikatuak-errealak/realLineMap'
import { radicalLatex, simplifySqrt } from '../../dbh4-aplikatuak-errealak/reals'
import { interestTable, tidy, variationIndex } from '../percent'
import {
    LEG_LIMITS,
    MAX_CHANGES,
    RATE_LIMITS,
    YEAR_LIMITS,
    hypotenuseSquare,
    initialInterestState,
    initialPercentState,
    initialPythagorasState,
    interestCapitals,
    interestChallenges,
    interestInfo,
    percentAmounts,
    percentChallenges,
    percentChanges,
    percentIndex,
    percentStart,
    percentSteps,
    pythagorasChallenges,
    setInterest,
    setLegs,
    setPercent,
    type InterestState,
    type PercentState,
    type PythagorasState
} from './labTools'

/* Zenbaki errealak eta ehunekoak (4. DBH) — the laboratory tools this unit adds. */

const INK = 'var(--ink, #1d2733)'
const MUTED = 'var(--muted, #58616e)'
const STAGE = 'var(--stage, #2f6fdb)'
const STAGE_TINT = 'var(--stage-tint, #dde7f7)'
const SECOND = 'var(--second, #c4432a)'
const LINE = 'var(--line, #d9d2c3)'
/* Fixed colours where the colour means something (up / down), whatever the stage's tone */
const UP = 'var(--coral, #c4432a)'
const UP_TINT = 'var(--coral-tint, #f8ddd5)'
const DOWN = 'var(--blue, #2f6fdb)'
const DOWN_TINT = 'var(--blue-tint, #dde7f7)'
const CARD = 'var(--card, #fffcf6)'

/** A number written with the decimal comma (point in Arabic), thousands grouped from 10 000 */
function local(language: string, value: number, places?: number): string {
    const text = places === undefined ? String(tidy(value, 6)) : value.toFixed(places)
    const [whole, decimals] = text.replace('-', '').split('.')
    const grouped = whole.length > 4 ? whole.replace(/\B(?=(\d{3})+(?!\d))/g, ' ') : whole
    const sign = text.startsWith('-') ? '−' : ''
    return `${sign}${grouped}${decimals ? `${language === 'ar' ? '.' : ','}${decimals}` : ''}`
}

/** The same number for LaTeX: {,} for the comma (a point in Arabic) */
const latexNumber = (language: string, value: number, places?: number) => local(language, value, places).replace(',', '{,}').replace(/\u2009/g, '\\,').replace('−', '-')

const signedPercent = (language: string, change: number) => `${change > 0 ? '+' : ''}${local(language, change)} %`

/* ---------- The Pythagoras builder ---------- */

export function PythagorasTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<PythagorasState>(initialPythagorasState)
    const n = hypotenuseSquare(state)
    const length = Math.sqrt(n)
    const { outside, inside } = simplifySqrt(n)
    const rational = inside === 1
    // The drawing grows with the vertical leg, so a short triangle leaves no empty band above it
    const map = lineMap(0, 10, 40, 600, 50 + state.b * 56)
    const unit = map.x(1) - map.x(0)
    const top = map.y - state.b * unit
    const controls = (
        <>
            <Stepper label={l({ eu: 'Katetoa a (zuzenean)', es: 'Cateto a (en la recta)', ar: 'الضلع a (على المستقيم)' })} value={state.a} min={LEG_LIMITS.min} max={LEG_LIMITS.max} onChange={(a) => setState((s) => setLegs(s, { a }))} language={props.language} />
            <Stepper label={l({ eu: 'Katetoa b (gora)', es: 'Cateto b (hacia arriba)', ar: 'الضلع b (إلى الأعلى)' })} value={state.b} min={LEG_LIMITS.min} max={LEG_LIMITS.max} onChange={(b) => setState((s) => setLegs(s, { b }))} language={props.language} />
        </>
    )
    const value = rational ? String(outside) : `${outside > 1 ? radicalLatex(outside, inside) : `\\sqrt{${n}}`}\\approx ${latexNumber(props.language, Math.round(length * 1000) / 1000)}`
    const readout = (
        <>
            <span className="fraction-v2-lab-readout-main"><MathText text={`$\\sqrt{${state.a}^{2}+${state.b}^{2}}=\\sqrt{${n}}${outside > 1 && !rational ? `=${radicalLatex(outside, inside)}` : ''}${rational ? `=${outside}` : ''}$`} /></span>
            <span className="fraction-v2-lab-readout-note">
                {rational
                    ? l({ eu: `${n} karratu perfektua da: puntua arrazionala (${outside}).`, es: `${n} es un cuadrado perfecto: el punto es racional (${outside}).`, ar: `${n} مربع كامل: النقطة نسبية (${outside}).` })
                    : <MathText text={l({ eu: `Ez da karratu perfektua: puntua irrazionala, $${value}$.`, es: `No es cuadrado perfecto: el punto es irracional, $${value}$.`, ar: `ليس مربعًا كاملًا: النقطة غير نسبية، $${value}$.` })} />}
            </span>
        </>
    )
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={pythagorasChallenges} state={state}>
            <svg viewBox={`0 0 640 ${map.y + 92}`} className="reals-line" role="img" aria-label={`√(${state.a}² + ${state.b}²) = √${n}`}>
                <RealAxis map={map} arabic={props.language === 'ar'} />
                <polygon points={`${map.x(0)},${map.y} ${map.x(state.a)},${map.y} ${map.x(state.a)},${top}`} fill={STAGE_TINT} stroke={INK} strokeWidth={2} />
                <rect x={map.x(state.a) - 12} y={map.y - 12} width={12} height={12} fill="none" stroke={INK} strokeWidth={1.4} />
                <line x1={map.x(0)} y1={map.y} x2={map.x(state.a)} y2={top} stroke={SECOND} strokeWidth={3.4} />
                <path d={`M${map.x(state.a)} ${top} A${length * unit} ${length * unit} 0 0 1 ${map.x(length)} ${map.y}`} fill="none" stroke={SECOND} strokeWidth={2.2} strokeDasharray="7 6" />
                <line x1={map.x(0)} y1={map.y + 58} x2={map.x(state.a)} y2={map.y + 58} stroke={INK} strokeWidth={1.6} />
                <text x={map.x(state.a / 2)} y={map.y + 80} textAnchor="middle" fontSize={17} fontWeight={700} fill={INK}>a = {state.a}</text>
                <text x={map.x(state.a) + 10} y={(map.y + top) / 2} fontSize={17} fontWeight={700} fill={INK}>b = {state.b}</text>
                <LinePoint map={map} value={length} name={rational ? String(outside) : `√${n}`} above={false} color={rational ? STAGE : SECOND} />
            </svg>
        </ToolFrame>
    )
}

/* ---------- The chained-percentages machine ---------- */

export function PercentTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<PercentState>(initialPercentState)
    const changes = percentChanges(state)
    const start = percentStart(state)
    const values = changes.reduce<number[]>((list, change) => [...list, tidy(list[list.length - 1] * variationIndex(change), 6)], [start])
    const index = percentIndex(state)
    const total = tidy((index - 1) * 100, 6)
    const indexLatex = (change: number) => latexNumber(props.language, variationIndex(change))
    const controls = (
        <>
            <Segmented label={l({ eu: 'Hasierako kantitatea', es: 'Cantidad inicial', ar: 'الكمية الأولية' })} value={String(state.amount)} options={percentAmounts.map((amount, position) => ({ value: String(position), label: local(props.language, amount) }))} onChange={(next) => setState((s) => setPercent(s, { amount: Number(next) }))} />
            <Stepper label={l({ eu: 'Aldaketa kopurua', es: 'Número de variaciones', ar: 'عدد التغيرات' })} value={state.count} min={1} max={MAX_CHANGES} onChange={(count) => setState((s) => setPercent(s, { count }))} language={props.language} />
            {changes.map((_, position) => (
                <Stepper key={position} label={l({ eu: `${position + 1}. aldaketa`, es: `Variación ${position + 1}`, ar: `التغير ${position + 1}` })} value={state.steps[position]} min={0} max={percentSteps.length - 1} format={(step) => signedPercent(props.language, percentSteps[step])} onChange={(value) => setState((s) => setPercent(s, { step: { index: position, value } }))} language={props.language} />
            ))}
        </>
    )
    const readout = (
        <>
            <span className="fraction-v2-lab-readout-main"><MathText text={`$${latexNumber(props.language, start)}${changes.map((change) => `\\cdot ${indexLatex(change)}`).join('')}=${latexNumber(props.language, values[values.length - 1])}$`} /></span>
            <span className="fraction-v2-lab-readout-note">
                <MathText text={l({
                    eu: `Indize osoa: $${latexNumber(props.language, index)}$ → ${total === 0 ? 'aldaketarik ez' : total > 0 ? `% ${local(props.language, total)} igo` : `% ${local(props.language, -total)} jaitsi`}.`,
                    es: `Índice total: $${latexNumber(props.language, index)}$ → ${total === 0 ? 'sin variación' : total > 0 ? `sube un ${local(props.language, total)} %` : `baja un ${local(props.language, -total)} %`}.`,
                    ar: `المؤشر الكلي: $${latexNumber(props.language, index)}$ ← ${total === 0 ? 'بلا تغير' : total > 0 ? `زيادة ${local(props.language, total)} %` : `نقصان ${local(props.language, -total)} %`}.`
                })} />
            </span>
        </>
    )
    const boxes = values.length
    const boxWidth = boxes === 4 ? 116 : boxes === 3 ? 140 : 170
    const gap = (600 - boxes * boxWidth) / Math.max(1, boxes - 1)
    const x = (position: number) => 20 + position * (boxWidth + gap)
    const highest = Math.max(...values)
    const tone = (change: number) => (change > 0 ? UP : change < 0 ? DOWN : MUTED)
    const tint = (change: number) => (change > 0 ? UP_TINT : change < 0 ? DOWN_TINT : CARD)
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={percentChallenges} state={state}>
            <svg viewBox="0 0 640 300" className="reals-line" role="img" aria-label={values.map((value) => local(props.language, value)).join(' → ')}>
                {values.map((value, position) => {
                    const height = (value / highest) * 180
                    return (
                        <g key={position}>
                            <rect x={x(position) + boxWidth / 2 - 30} y={230 - height} width={60} height={height} rx={8} fill={position === 0 ? CARD : tint(changes[position - 1])} stroke={position === 0 ? INK : tone(changes[position - 1])} strokeWidth={2} />
                            <text x={x(position) + boxWidth / 2} y={258} textAnchor="middle" fontSize={17} fontWeight={700} fill={INK}>{local(props.language, value)}</text>
                            {position > 0 && (
                                <g>
                                    <line x1={x(position - 1) + boxWidth / 2 + 36} y1={140} x2={x(position) + boxWidth / 2 - 42} y2={140} stroke={tone(changes[position - 1])} strokeWidth={2.4} />
                                    <path d={`M${x(position) + boxWidth / 2 - 34} 140 l-10 -6 v12 z`} fill={tone(changes[position - 1])} />
                                    <text x={(x(position - 1) + x(position)) / 2 + boxWidth / 2} y={128} textAnchor="middle" fontSize={15} fontWeight={700} fill={tone(changes[position - 1])}>× {local(props.language, variationIndex(changes[position - 1]))}</text>
                                </g>
                            )}
                        </g>
                    )
                })}
                <line x1={20} y1={230} x2={620} y2={230} stroke={LINE} strokeWidth={1.6} />
                <text x={320} y={290} textAnchor="middle" fontSize={16} fill={MUTED}>{changes.map((change) => `(${signedPercent(props.language, change)})`).join('  ')}</text>
            </svg>
        </ToolFrame>
    )
}

/* ---------- The interest race ---------- */

export function InterestTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<InterestState>(initialInterestState)
    const info = interestInfo(state)
    const table = interestTable(info.capital, state.rate, state.years)
    const highest = table[table.length - 1].compound
    const x = (year: number) => 60 + (year / state.years) * 470
    const y = (value: number) => 250 - ((value - info.capital) / Math.max(1, highest - info.capital)) * 200
    const path = (key: 'simple' | 'compound') => table.map((row, index) => `${index === 0 ? 'M' : 'L'}${x(row.year)} ${y(row[key])}`).join(' ')
    const rate = latexNumber(props.language, state.rate)
    const controls = (
        <>
            <Segmented label={l({ eu: 'Kapitala (€)', es: 'Capital (€)', ar: 'رأس المال (€)' })} value={String(state.capital)} options={interestCapitals.map((capital, position) => ({ value: String(position), label: local(props.language, capital) }))} onChange={(next) => setState((s) => setInterest(s, { capital: Number(next) }))} />
            <Stepper label={l({ eu: 'Interes-tasa (%)', es: 'Rédito (%)', ar: 'المعدل (%)' })} value={state.rate} min={RATE_LIMITS.min} max={RATE_LIMITS.max} step={RATE_LIMITS.step} format={(value) => `${local(props.language, value)} %`} onChange={(next) => setState((s) => setInterest(s, { rate: next }))} language={props.language} />
            <Stepper label={l({ eu: 'Urteak', es: 'Años', ar: 'الأعوام' })} value={state.years} min={YEAR_LIMITS.min} max={YEAR_LIMITS.max} onChange={(years) => setState((s) => setInterest(s, { years }))} language={props.language} />
        </>
    )
    const readout = (
        <>
            <span className="fraction-v2-lab-readout-main"><MathText text={`$${latexNumber(props.language, info.capital)}+\\frac{${info.capital}\\cdot ${rate}\\cdot ${state.years}}{100}=${latexNumber(props.language, info.simple, 2)}$`} /></span>
            <span className="fraction-v2-lab-readout-main"><MathText text={`$${latexNumber(props.language, info.capital)}\\cdot\\left(1+\\frac{${rate}}{100}\\right)^{${state.years}}\\approx ${latexNumber(props.language, info.compound, 2)}$`} /></span>
            <span className="fraction-v2-lab-readout-note">{l({ eu: `Konposatuak ${local(props.language, info.difference, 2)} € gehiago ematen ditu.`, es: `El compuesto da ${local(props.language, info.difference, 2)} € más.`, ar: `تعطي المركبة ${local(props.language, info.difference, 2)} € أكثر.` })}</span>
        </>
    )
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={interestChallenges} state={state}>
            <svg viewBox="0 0 640 300" className="reals-line" role="img" aria-label={l({ eu: 'Interes sinplea eta konposatua urtez urte', es: 'Interés simple y compuesto año a año', ar: 'الفائدة البسيطة والمركبة عامًا بعد عام' })}>
                <line x1={60} y1={250} x2={540} y2={250} stroke={INK} strokeWidth={2} />
                <line x1={60} y1={250} x2={60} y2={34} stroke={INK} strokeWidth={2} />
                {table.filter((row) => state.years <= 10 || row.year % 2 === 0 || row.year === state.years).map((row) => <text key={row.year} x={x(row.year)} y={272} textAnchor="middle" fontSize={13} fill={MUTED}>{row.year}</text>)}
                <path d={path('simple')} fill="none" stroke={STAGE} strokeWidth={3} />
                <path d={path('compound')} fill="none" stroke={SECOND} strokeWidth={3} />
                {table.map((row) => <circle key={row.year} cx={x(row.year)} cy={y(row.compound)} r={3.2} fill={SECOND} />)}
                <text x={548} y={y(info.compound) + 5} fontSize={15} fontWeight={700} fill={SECOND}>{local(props.language, info.compound, 2)}</text>
                <text x={548} y={Math.max(y(info.simple) + 5, y(info.compound) + 24)} fontSize={15} fontWeight={700} fill={STAGE}>{local(props.language, info.simple, 2)}</text>
                <Label x={80} y={52} fontSize={14} fontWeight={700} fill={SECOND}>{l({ eu: 'konposatua', es: 'compuesto', ar: 'المركبة' })}</Label>
                <Label x={80} y={72} fontSize={14} fontWeight={700} fill={STAGE}>{l({ eu: 'sinplea', es: 'simple', ar: 'البسيطة' })}</Label>
                <Label x={320} y={294} textAnchor="middle" fontSize={13} fill={MUTED}>{l({ eu: 'urteak', es: 'años', ar: 'الأعوام' })}</Label>
            </svg>
        </ToolFrame>
    )
}
