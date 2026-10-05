import { Fragment, useState, type ReactNode } from 'react'
import { MathText } from '../../../components/MathText'
import { Segmented, Stepper, ToolFrame } from '../../../features/unit-v2/lab/LabKit'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import { useLabText } from '../../../features/unit-v2/lab/useLabText'
import { fraction, toExactDecimal, toNumber, type FractionValue } from '../../../features/unit-v2/math/fraction'
import { Label } from '../../dbh2-funtzioak-v2/plane'
import {
    atMeeting,
    cents,
    CLOCK_MAX,
    CLOCK_STEP,
    closingSpeed,
    compoundAfter,
    fillHours,
    fillRate,
    GROWTH_CAPITALS,
    GROWTH_PERIODS,
    GROWTH_RATE_MAX,
    GROWTH_YEARS_MAX,
    growthChallenges,
    initialGrowthState,
    initialMixtureState,
    initialMotionState,
    initialTapsState,
    meetingMinutes,
    MIXTURE_KILOS_MAX,
    MIXTURE_PRICES,
    mixtureChallenges,
    mixtureCost,
    mixturePrice,
    MOTION_DISTANCES,
    motionChallenges,
    positions,
    setGrowth,
    setMixture,
    setMotion,
    setTaps,
    simpleAfter,
    SPEED_MAX,
    SPEED_MIN,
    SPEED_STEP,
    TAP_HOURS_MAX,
    tapsChallenges,
    type GrowthState,
    type MixtureState,
    type MotionMode,
    type MotionState,
    type TapsState
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
/** Money or any number rounded to the cent, with the comma (point in Arabic) */
const money = (language: string, value: number) => {
    const rounded = cents(value)
    const text = Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(2)
    return language === 'ar' ? text : text.replace('.', ',')
}
/** The same for LaTeX */
const moneyLatex = (value: number) => money('eu', value).replace(',', '{,}')
/** An exact value in LaTeX: a short decimal, otherwise a fraction */
const exactLatex = (value: FractionValue) => {
    if (shortDecimal(value)) return toExactDecimal(value, ',')!.replace(',', '{,}')
    return `${value.numerator < 0 ? '-' : ''}\\frac{${Math.abs(value.numerator)}}{${value.denominator}}`
}
/** True when the value is a decimal with at most two digits after the comma */
const shortDecimal = (value: FractionValue) => {
    const exact = toExactDecimal(value, ',')
    return exact !== null && (exact.split(',')[1] ?? '').length <= 2
}
/** Hours as «2 h 55 min», rounded to the minute */
const hoursText = (hours: number) => {
    const minutes = Math.round(hours * 60)
    const whole = Math.floor(minutes / 60)
    const rest = minutes % 60
    return whole === 0 ? `${rest} min` : rest === 0 ? `${whole} h` : `${whole} h ${rest} min`
}

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

/* ---------- 1. Simple or compound interest ---------- */

const periodNames: Record<number, Text> = {
    1: say('urtekoa', 'anual', 'سنوية'),
    2: say('seihilekoa', 'semestral', 'نصف سنوية'),
    4: say('hiruhilekoa', 'trimestral', 'ربع سنوية'),
    12: say('hilekoa', 'mensual', 'شهرية')
}

export function GrowthTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<GrowthState>(initialGrowthState)
    const controls = (
        <>
            <Segmented label={l(say('Kapitala', 'Capital', 'رأس المال'))} value={String(state.capital)} options={GROWTH_CAPITALS.map((capital) => ({ value: String(capital), label: `${capital} €` }))} onChange={(capital) => setState((s) => setGrowth(s, { capital: Number(capital) }))} />
            <Stepper label={l(say('Interes-tasa (%)', 'Tipo de interés (%)', 'سعر الفائدة (٪)'))} value={state.rate} min={1} max={GROWTH_RATE_MAX} onChange={(rate) => setState((s) => setGrowth(s, { rate }))} language={props.language} />
            <Stepper label={l(say('Urteak', 'Años', 'السنوات'))} value={state.years} min={1} max={GROWTH_YEARS_MAX} onChange={(years) => setState((s) => setGrowth(s, { years }))} language={props.language} />
            <Segmented label={l(say('Kapitalizazioa (k)', 'Capitalización (k)', 'الرسملة (k)'))} value={String(state.periods)} options={GROWTH_PERIODS.map((k) => ({ value: String(k), label: `${k} · ${l(periodNames[k])}` }))} onChange={(periods) => setState((s) => setGrowth(s, { periods: Number(periods) }))} />
        </>
    )
    const years = Array.from({ length: state.years + 1 }, (_, year) => year)
    const finalCompound = compoundAfter(state, state.years)
    const finalSimple = toNumber(simpleAfter(state, state.years))
    // Yearly: C · 1,1^t. With k periods: C · (1 + r/100k)^(k·t)
    const equalsSign = Math.abs(finalCompound - cents(finalCompound)) < 1e-6 ? '=' : '\\approx '
    const latex = state.periods === 1
        ? `${state.capital}\\cdot ${exactLatex(fraction(100 + state.rate, 100))}^{${state.years}}${equalsSign}${moneyLatex(finalCompound)}`
        : `${state.capital}\\cdot\\left(1+\\frac{${state.rate}}{${100 * state.periods}}\\right)^{${state.periods}\\cdot ${state.years}}${equalsSign}${moneyLatex(finalCompound)}`
    const note = l(say(
        `Bakuna: ${money('eu', finalSimple)} €. Konposatua: ${money('eu', finalCompound)} € (+${money('eu', finalCompound - finalSimple)} €).`,
        `Simple: ${money('es', finalSimple)} €. Compuesto: ${money('es', finalCompound)} € (+${money('es', finalCompound - finalSimple)} €).`,
        `البسيطة: ${money('ar', finalSimple)} €. المركّبة: ${money('ar', finalCompound)} € (+${money('ar', finalCompound - finalSimple)} €).`
    ))
    const top = Math.max(finalCompound, finalSimple)
    const base = 210
    const scale = 170 / top
    const slot = 560 / years.length
    const bar = Math.min(26, slot / 2 - 4)
    return (
        <ToolFrame {...props} controls={controls} readout={<Readout language={props.language} latex={latex} note={note} />} challenges={growthChallenges} state={state}>
            <Board height={250} label={l(say('Bakuna eta konposatua urtez urte', 'Simple y compuesto año a año', 'البسيطة والمركّبة سنة بعد سنة'))}>
                <line x1={40} x2={610} y1={base} y2={base} stroke={INK} strokeWidth={2} />
                {years.map((year) => {
                    const x = 50 + year * slot + slot / 2
                    const simple = toNumber(simpleAfter(state, year))
                    const compound = compoundAfter(state, year)
                    return (
                        <g key={year}>
                            <rect x={x - bar - 1} y={base - simple * scale} width={bar} height={simple * scale} fill={STAGE} fillOpacity={0.3} stroke={INK} strokeWidth={1.2} />
                            <rect x={x + 1} y={base - compound * scale} width={bar} height={compound * scale} fill={GREEN} fillOpacity={0.45} stroke={INK} strokeWidth={1.2} />
                            <text x={x} y={base + 18} textAnchor="middle" fontSize={13} fontWeight={700} fill={MUTED}>{year}</text>
                        </g>
                    )
                })}
                <text x={50 + state.years * slot + slot / 2 + bar / 2} y={base - finalCompound * scale - 8} textAnchor="middle" fontSize={13} fontWeight={700} fill={GREEN}>{money(props.language, finalCompound)}</text>
                <rect x={50} y={12} width={14} height={14} fill={STAGE} fillOpacity={0.3} stroke={INK} />
                <Label x={70} y={24} fontSize={13} fontWeight={700} fill={STAGE}>{l(say('bakuna', 'simple', 'بسيطة'))}</Label>
                <rect x={150} y={12} width={14} height={14} fill={GREEN} fillOpacity={0.45} stroke={INK} />
                <Label x={170} y={24} fontSize={13} fontWeight={700} fill={GREEN}>{l(say('konposatua', 'compuesto', 'مركّبة'))}</Label>
                <Label x={600} y={244} textAnchor="end" fontSize={13} fill={MUTED}>{l(say('urteak', 'años', 'السنوات'))}</Label>
            </Board>
        </ToolFrame>
    )
}

/* ---------- 2. The mixture ---------- */

export function MixtureTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<MixtureState>(initialMixtureState)
    const priceOption = (price: number) => ({ value: String(price), label: `${money(props.language, price / 100)} €` })
    const controls = (
        <>
            {[0, 1].map((index) => (
                <Fragment key={index}>
                    <Stepper label={`${index === 0 ? 'A' : 'B'} · kg`} value={state.kilos[index]} min={1} max={MIXTURE_KILOS_MAX} onChange={(kilos) => setState((s) => setMixture(s, { kilos: [index as 0 | 1, kilos] }))} language={props.language} />
                    <Segmented label={`${index === 0 ? 'A' : 'B'} · €/kg`} value={String(state.prices[index])} options={MIXTURE_PRICES.map(priceOption)} onChange={(price) => setState((s) => setMixture(s, { price: [index as 0 | 1, Number(price)] }))} />
                </Fragment>
            ))}
        </>
    )
    const cost = mixtureCost(state)
    const mean = mixturePrice(state)
    const [ka, kb] = state.kilos
    const [pa, pb] = state.prices.map((price) => moneyLatex(price / 100))
    const latex = `\\frac{${ka}\\cdot ${pa}+${kb}\\cdot ${pb}}{${ka + kb}}=\\frac{${exactLatex(cost)}}{${ka + kb}}${shortDecimal(mean) ? '=' : '\\approx '}${moneyLatex(toNumber(mean))}`
    const note = l(say(`${ka + kb} kg, ${money('eu', toNumber(cost))} €: ${money('eu', toNumber(mean))} €/kg.`, `${ka + kb} kg, ${money('es', toNumber(cost))} €: ${money('es', toNumber(mean))} €/kg.`, `${ka + kb} كغ، ${money('ar', toNumber(cost))} €: ${money('ar', toNumber(mean))} €/كغ.`))
    // A price line from 5 € to 15 €
    const line = (euros: number) => 60 + ((euros - 5) / 10) * 520
    const meanX = line(toNumber(mean))
    const sacks = state.kilos.map((kilos) => 30 + kilos * 3)
    return (
        <ToolFrame {...props} controls={controls} readout={<Readout language={props.language} latex={latex} note={note} />} challenges={mixtureChallenges} state={state}>
            <Board height={230} label={l(say('Bi prezio eta prezio ertaina', 'Dos precios y el precio medio', 'سعران والسعر المتوسط'))}>
                {[0, 1].map((index) => {
                    const x = line(state.prices[index] / 100)
                    const height = sacks[index]
                    return (
                        <g key={index}>
                            <path d={`M${x - 24} ${150 - height} h48 l-6 ${height} h-36 z`} fill={index === 0 ? '#8a5a33' : '#c4a27a'} fillOpacity={0.55} stroke={INK} strokeWidth={1.8} />
                            <text x={x} y={150 - height / 2 + 6} textAnchor="middle" fontSize={15} fontWeight={700} fill={INK}>{`${state.kilos[index]} kg`}</text>
                            <text x={x} y={190} textAnchor="middle" fontSize={14} fontWeight={700} fill={MUTED}>{money(props.language, state.prices[index] / 100)}</text>
                        </g>
                    )
                })}
                <line x1={line(5)} x2={line(15)} y1={170} y2={170} stroke={INK} strokeWidth={2} />
                {[5, 10, 15].map((euros) => <line key={euros} x1={line(euros)} x2={line(euros)} y1={164} y2={176} stroke={INK} strokeWidth={1.6} />)}
                <path d={`M${meanX} 168 l-9 -16 h18 z`} fill={SECOND} />
                <text x={meanX} y={214} textAnchor="middle" fontSize={16} fontWeight={700} fill={SECOND}>{`${money(props.language, toNumber(mean))} €/kg`}</text>
            </Board>
        </ToolFrame>
    )
}

/* ---------- 3. Two vehicles on a road ---------- */

function Car({ x, y, color, back = false }: { x: number; y: number; color: string; back?: boolean }) {
    return (
        <g transform={`translate(${x} ${y}) scale(${back ? -1 : 1} 1)`}>
            <rect x={-20} y={-13} width={40} height={16} rx={5} fill={color} stroke={INK} strokeWidth={1.4} />
            <rect x={-6} y={-22} width={20} height={11} rx={3} fill={color} fillOpacity={0.6} stroke={INK} strokeWidth={1.2} />
            <circle cx={-11} cy={5} r={4.5} fill={INK} />
            <circle cx={11} cy={5} r={4.5} fill={INK} />
        </g>
    )
}

export function MotionTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<MotionState>(initialMotionState)
    const controls = (
        <>
            <Segmented label={l(say('Nola', 'Cómo', 'كيف'))} value={state.mode} options={[{ value: 'meet', label: l(say('Elkarrengana', 'Al encuentro', 'تلاقٍ')) }, { value: 'chase', label: l(say('Atzetik', 'Persecución', 'مطاردة')) }]} onChange={(mode) => setState((s) => setMotion(s, { mode: mode as MotionMode }))} />
            <Segmented label={l(say('Distantzia (km)', 'Distancia (km)', 'المسافة (كم)'))} value={String(state.distance)} options={MOTION_DISTANCES.map((distance) => ({ value: String(distance), label: String(distance) }))} onChange={(distance) => setState((s) => setMotion(s, { distance: Number(distance) }))} />
            <Stepper label="A · km/h" value={state.speeds[0]} min={SPEED_MIN} max={SPEED_MAX} step={SPEED_STEP} onChange={(speed) => setState((s) => setMotion(s, { speed: [0, speed] }))} language={props.language} />
            <Stepper label="B · km/h" value={state.speeds[1]} min={SPEED_MIN} max={SPEED_MAX} step={SPEED_STEP} onChange={(speed) => setState((s) => setMotion(s, { speed: [1, speed] }))} language={props.language} />
            <Stepper label={l(say('Erlojua (min)', 'Reloj (min)', 'الساعة (د)'))} value={state.minutes} min={0} max={CLOCK_MAX} step={CLOCK_STEP} onChange={(minutes) => setState((s) => setMotion(s, { minutes }))} language={props.language} />
        </>
    )
    const meeting = meetingMinutes(state)
    const speed = closingSpeed(state)
    const sign = state.mode === 'meet' ? '+' : '-'
    const latex = meeting
        ? `${state.distance}\\mathbin{:}(${state.speeds[0]}${sign}${state.speeds[1]})=${exactLatex(fraction(meeting.numerator, meeting.denominator * 60))}\\ \\text{h}`
        : `${state.speeds[0]}-${state.speeds[1]}=${speed}\\le 0`
    const [a, b] = positions(state)
    const gap = Math.abs(toNumber(b) - toNumber(a))
    const note = meeting === null
        ? l(say('Ez dira inoiz elkartzen: aurrekoa ez da motelagoa.', 'No se encuentran nunca: el de delante no es más lento.', 'لن يلتقيا أبدًا: الأمامي ليس أبطأ.'))
        : atMeeting(state)
            ? l(say(`Elkartu dira! ${hoursText(toNumber(meeting) / 60)} ondoren.`, `¡Se encuentran! A las ${hoursText(toNumber(meeting) / 60)}.`, `التقيا! بعد ${hoursText(toNumber(meeting) / 60)}.`))
            : l(say(`${state.minutes} min: ${money('eu', gap)} km falta dira. Elkartzeko: ${hoursText(toNumber(meeting) / 60)}.`, `${state.minutes} min: faltan ${money('es', gap)} km. Se encuentran a las ${hoursText(toNumber(meeting) / 60)}.`, `${state.minutes} د: تبقى ${money('ar', gap)} كم. يلتقيان بعد ${hoursText(toNumber(meeting) / 60)}.`))
    // The road shows from A's start to a bit beyond the furthest point
    const far = Math.max(state.distance, toNumber(a), toNumber(b)) * 1.05
    const road = (km: number) => 50 + (Math.max(0, Math.min(km, far)) / far) * 540
    return (
        <ToolFrame {...props} controls={controls} readout={<Readout language={props.language} latex={latex} note={note} />} challenges={motionChallenges} state={state}>
            <Board height={170} label={l(say('Errepidea eta bi ibilgailuak', 'La carretera y los dos vehículos', 'الطريق والمركبتان'))}>
                <line x1={50} x2={590} y1={100} y2={100} stroke={INK} strokeWidth={3} />
                <line x1={50} x2={590} y1={100} y2={100} stroke={CARD} strokeWidth={1} strokeDasharray="10 10" />
                <line x1={road(0)} x2={road(0)} y1={92} y2={110} stroke={STAGE} strokeWidth={2} />
                <line x1={road(state.distance)} x2={road(state.distance)} y1={92} y2={110} stroke={SECOND} strokeWidth={2} />
                <text x={road(0)} y={130} textAnchor="middle" fontSize={13} fontWeight={700} fill={STAGE}>0</text>
                <text x={road(state.distance)} y={130} textAnchor="middle" fontSize={13} fontWeight={700} fill={SECOND}>{`${state.distance} km`}</text>
                <Car x={road(toNumber(a))} y={86} color="#2f6fdb" />
                <Car x={road(toNumber(b))} y={86} color="#c4432a" back={state.mode === 'meet'} />
                <text x={road(toNumber(a))} y={52} textAnchor="middle" fontSize={14} fontWeight={700} fill={STAGE}>A</text>
                <text x={road(toNumber(b))} y={52} textAnchor="middle" fontSize={14} fontWeight={700} fill={SECOND}>B</text>
                <text x={320} y={160} textAnchor="middle" fontSize={16} fontWeight={700} fill={atMeeting(state) ? GREEN : INK}>{`${state.minutes} min`}</text>
            </Board>
        </ToolFrame>
    )
}

/* ---------- 4. Taps and a drain ---------- */

export function TapsTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<TapsState>(initialTapsState)
    const closed = l(say('itxita', 'cerrado', 'مغلق'))
    const controls = (
        <>
            <Stepper label={l(say('A txorrota (h)', 'Grifo A (h)', 'الصنبور أ (س)'))} value={state.taps[0]} min={1} max={TAP_HOURS_MAX} onChange={(hours) => setState((s) => setTaps(s, { tap: [0, hours] }))} language={props.language} />
            <Stepper label={l(say('B txorrota (h)', 'Grifo B (h)', 'الصنبور ب (س)'))} value={state.taps[1]} min={0} max={TAP_HOURS_MAX} format={(hours) => (hours === 0 ? closed : String(hours))} onChange={(hours) => setState((s) => setTaps(s, { tap: [1, hours] }))} language={props.language} />
            <Stepper label={l(say('Hustubidea (h)', 'Desagüe (h)', 'المصرف (س)'))} value={state.drain} min={0} max={TAP_HOURS_MAX} format={(hours) => (hours === 0 ? closed : String(hours))} onChange={(drain) => setState((s) => setTaps(s, { drain }))} language={props.language} />
        </>
    )
    const rate = fillRate(state)
    const hours = fillHours(state)
    const terms = [`\\frac{1}{${state.taps[0]}}`, ...(state.taps[1] > 0 ? [`+\\frac{1}{${state.taps[1]}}`] : []), ...(state.drain > 0 ? [`-\\frac{1}{${state.drain}}`] : [])].join('')
    const latex = `${terms}=${exactLatex(rate)}${hours ? `\\ \\to\\ ${exactLatex(hours)}\\ \\text{h}` : ''}`
    const note = hours
        ? l(say(`Biltegia ${hoursText(toNumber(hours))}-tan betetzen da.`, `El depósito se llena en ${hoursText(toNumber(hours))}.`, `يمتلئ الخزان في ${hoursText(toNumber(hours))}.`))
        : l(say('Hustubideak sartzen dena baino gehiago ateratzen du: ez da inoiz beteko.', 'El desagüe saca más de lo que entra: no se llenará nunca.', 'يُخرج المصرف أكثر مما يدخل: لن يمتلئ أبدًا.'))
    // The tank fills hour by hour: one band per hour, the last one partial
    const tankX = 380
    const tankY = 20
    const tankHeight = 180
    const share = Math.max(0, toNumber(rate))
    const bands = hours ? Math.ceil(toNumber(hours) - 1e-9) : 4
    const parts = [
        { width: 1 / state.taps[0], color: STAGE, label: 'A' },
        ...(state.taps[1] > 0 ? [{ width: 1 / state.taps[1], color: GREEN, label: 'B' }] : []),
        ...(state.drain > 0 ? [{ width: -1 / state.drain, color: SECOND, label: '−' }] : [])
    ]
    return (
        <ToolFrame {...props} controls={controls} readout={<Readout language={props.language} latex={latex} note={note} />} challenges={tapsChallenges} state={state}>
            <Board height={220} label={l(say('Ordu bateko zatiak eta biltegia', 'Las partes de una hora y el depósito', 'أجزاء الساعة والخزان'))}>
                <Label x={30} y={26} fontSize={14} fontWeight={700} fill={MUTED}>{l(say('Ordu batean', 'En una hora', 'في ساعة'))}</Label>
                {parts.map((part, index) => {
                    const y = 44 + index * 42
                    const width = Math.abs(part.width) * 300
                    return (
                        <g key={index}>
                            <rect x={50} y={y} width={300} height={28} fill={CARD} stroke={INK} strokeWidth={1.2} />
                            <rect x={50} y={y} width={width} height={28} fill={part.color} fillOpacity={0.4} stroke={INK} strokeWidth={1.2} />
                            <text x={38} y={y + 20} textAnchor="middle" fontSize={15} fontWeight={700} fill={part.color}>{part.label}</text>
                        </g>
                    )
                })}
                <rect x={tankX} y={tankY} width={200} height={tankHeight} fill={CARD} stroke={INK} strokeWidth={2.4} />
                {share > 0 && Array.from({ length: Math.min(bands, 12) }, (_, hour) => {
                    const filled = Math.min(1, share * (hour + 1)) - Math.min(1, share * hour)
                    const bottom = tankY + tankHeight - Math.min(1, share * hour) * tankHeight
                    return <rect key={hour} x={tankX} y={bottom - filled * tankHeight} width={200} height={filled * tankHeight} fill={hour % 2 ? STAGE : STAGE_TINT} fillOpacity={0.7} stroke={INK} strokeWidth={0.6} />
                })}
                <text x={tankX + 100} y={tankY + tankHeight + 16} textAnchor="middle" fontSize={14} fontWeight={700} fill={hours ? STAGE : SECOND}>{hours ? hoursText(toNumber(hours)) : '∞'}</text>
            </Board>
        </ToolFrame>
    )
}
