import { Fragment, useState, type ReactNode } from 'react'
import { MathText } from '../../../components/MathText'
import { Segmented, Stepper, ToolFrame } from '../../../features/unit-v2/lab/LabKit'
import { NumberField } from '../../../features/unit-v2/lab/NumberField'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import { useLabText } from '../../../features/unit-v2/lab/useLabText'
import { fraction, toExactDecimal, toNumber, type FractionValue } from '../../../features/unit-v2/math/fraction'
import { Label } from '../../dbh2-funtzioak-v2/plane'
import { PredictionStep } from '../../dbh2-zatikiak-prototype/lab/PredictionStep'
import {
    atMeeting,
    cents,
    CLOCK_MAX,
    closingSpeed,
    compoundAfter,
    fastestTap,
    fillHours,
    fillRate,
    GROWTH_CAPITALS,
    GROWTH_PERIODS,
    GROWTH_RATE_MAX,
    GROWTH_YEARS_MAX,
    growthChallenges,
    growthExtra,
    growthPrediction,
    initialGrowthState,
    initialMixtureState,
    initialMotionState,
    initialTapsState,
    meetingMinutes,
    MIXTURE_KILOS_MAX,
    MIXTURE_PRICES,
    mixtureChallenges,
    mixtureCost,
    mixtureExtra,
    mixturePrediction,
    mixturePrice,
    MOTION_DISTANCES,
    motionChallenges,
    motionExtra,
    motionPrediction,
    positions,
    setGrowth,
    setMixture,
    setMotion,
    setPrediction,
    setTaps,
    simpleAfter,
    SPEED_MAX,
    SPEED_MIN,
    SPEED_STEP,
    TAP_HOURS_MAX,
    tapsChallenges,
    tapsExtra,
    tapsPrediction,
    type GrowthState,
    type MixtureState,
    type MotionMode,
    type MotionState,
    type Prediction,
    type TapsState
} from './labTools'

const INK = 'var(--ink, #1d2733)'
const MUTED = 'var(--muted, #58616e)'
const STAGE = 'var(--stage, #2f6fdb)'
const STAGE_TINT = 'var(--stage-tint, #dde7f7)'
const SECOND = 'var(--second, #c4432a)'
const GREEN = 'var(--success, #267b53)'
/** Simple interest stays blue, apart from the green compound bars, whatever the stage colour */
const BLUE = '#2f6fdb'
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
/** Hours as «2 h 55 min» («2 س 55 د» in Arabic sentences), rounded to the minute */
const hoursText = (hours: number, language = 'eu') => {
    const minutes = Math.round(hours * 60)
    const whole = Math.floor(minutes / 60)
    const rest = minutes % 60
    const [h, min] = language === 'ar' ? ['س', 'د'] : ['h', 'min']
    return whole === 0 ? `${rest} ${min}` : rest === 0 ? `${whole} ${h}` : `${whole} ${h} ${rest} ${min}`
}

/** The model: drawn narrow, so that its labels can be read on a phone, and no wider than 520 px on a computer */
function Board({ height, label, children }: { height: number; label: string; children: ReactNode }) {
    return (
        <svg viewBox={`0 0 360 ${height}`} direction="ltr" role="img" aria-label={label} style={{ display: 'block', width: '100%', maxWidth: 520, height: 'auto', margin: '0 auto', fontFamily: '"Atkinson Hyperlegible", "Noto Sans Arabic", system-ui, sans-serif' }}>
            {children}
        </svg>
    )
}

function Readout({ language, latex, note }: { language: string; latex: string; note: string }) {
    return (
        <>
            <span className="fraction-v2-lab-readout-main"><MathText text={localLatex(language, `$${latex}$`)} /></span>
            <span className="fraction-v2-lab-readout-note">{note}</span>
        </>
    )
}

const seeAfter = say('Iragarri lehenik; gero ikusiko duzu emaitza.', 'Primero predice; después verás el resultado.', 'توقّع أولًا، ثم سترى النتيجة.')

/** The result waits behind a prediction, as in the Zatikiak tools */
function Predict({ language, question, labels, actual, choice, tip, onChoose, children }: {
    language: LabToolProps['language']
    question: Text
    labels: Record<Prediction, Text>
    actual: Prediction
    choice: Prediction | null
    tip: Text
    onChoose: (prediction: Prediction) => void
    children: ReactNode
}) {
    return <PredictionStep language={language} question={question} labels={labels} actual={actual} choice={choice} tip={tip} wait={seeAfter} onChoose={onChoose}>{children}</PredictionStep>
}

/** A big question mark where the result will be drawn */
const Hidden = ({ x, y, size = 34 }: { x: number; y: number; size?: number }) => <text x={x} y={y} textAnchor="middle" fontSize={size} fontWeight={700} fill={MUTED} opacity={0.6}>?</text>

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
    const shown = state.prediction !== null
    const years = Array.from({ length: state.years + 1 }, (_, year) => year)
    const finalCompound = compoundAfter(state, state.years)
    const finalSimple = toNumber(simpleAfter(state, state.years))
    // Yearly: C · 1,1^t. With k periods: C · (1 + r/100k)^(k·t)
    const equalsSign = Math.abs(finalCompound - cents(finalCompound)) < 1e-6 ? '=' : '\\approx '
    const latex = state.periods === 1
        ? `${state.capital}\\cdot ${exactLatex(fraction(100 + state.rate, 100))}^{${state.years}}${equalsSign}${moneyLatex(finalCompound)}`
        : `${state.capital}\\cdot\\left(1+\\frac{${state.rate}}{${100 * state.periods}}\\right)^{${state.periods}\\cdot ${state.years}}${equalsSign}${moneyLatex(finalCompound)}`
    const note = l(say(
        `Bakuna: ${money('eu', finalSimple)} €. Konposatua: ${money('eu', finalCompound)} € (${money('eu', finalCompound - finalSimple)} € gehiago).`,
        `Simple: ${money('es', finalSimple)} €. Compuesto: ${money('es', finalCompound)} € (${money('es', finalCompound - finalSimple)} € más).`,
        `البسيطة: ${money('ar', finalSimple)} €. المركّبة: ${money('ar', finalCompound)} €، أي بزيادة ${money('ar', finalCompound - finalSimple)} €.`
    ))
    const rule = Math.round((72 / state.rate) * 10) / 10
    const ruleLatex = `72\\mathbin{:}${state.rate}\\approx ${String(rule).replace('.', props.language === 'ar' ? '.' : '{,}')}`
    const readout = (
        <Predict
            language={props.language}
            question={say('Emaitza ikusi aurretik: amaieran, konposatua kapitalaren bikoitzera iritsiko da?', 'Antes de ver el resultado: al final, ¿el compuesto llegará al doble del capital?', 'قبل رؤية النتيجة: في النهاية، هل تبلغ المركّبة ضعف رأس المال؟')}
            labels={{ '<': say('Ez da iristen', 'No llega', 'لا تبلغه'), '=': say('Justu bikoitza', 'Justo el doble', 'الضعف تمامًا'), '>': say('Gainditzen du', 'Lo pasa', 'تتجاوزه') }}
            actual={growthPrediction(state)}
            choice={state.prediction}
            tip={say(
                `Arau erabilgarria: interes-tasa % ${state.rate} bada, dirua $${ruleLatex}$ urtetan bikoizten da, gutxi gorabehera. Hemen: ${state.years} urte.`,
                `Una regla útil: al ${state.rate} %, el dinero se dobla en unos $${ruleLatex}$ años. Aquí son ${state.years}.`,
                `قاعدة مفيدة: بفائدة ${state.rate}٪ يتضاعف المال في نحو $${ruleLatex}$ سنة. وهنا عدد السنوات ${state.years}.`
            )}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout language={props.language} latex={latex} note={note} />
        </Predict>
    )
    const top = Math.max(finalCompound, finalSimple)
    const base = 196
    const scale = 150 / top
    const slot = 324 / years.length
    const bar = Math.min(16, slot / 2 - 2)
    const lastX = 28 + state.years * slot + slot / 2 + bar / 2
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={growthChallenges} extraChallenges={growthExtra} state={state}>
            <Board height={232} label={l(say('Bakuna eta konposatua urtez urte', 'Simple y compuesto año a año', 'البسيطة والمركّبة سنة بعد سنة'))}>
                <rect x={10} y={6} width={13} height={13} fill={BLUE} fillOpacity={0.35} stroke={INK} />
                <Label x={28} y={17} fontSize={14} fontWeight={700} fill={BLUE}>{l(say('bakuna', 'simple', 'بسيطة'))}</Label>
                <rect x={120} y={6} width={13} height={13} fill={GREEN} fillOpacity={0.6} stroke={INK} />
                <Label x={138} y={17} fontSize={14} fontWeight={700} fill={GREEN}>{l(say('konposatua', 'compuesto', 'مركّبة'))}</Label>
                <line x1={20} x2={354} y1={base} y2={base} stroke={INK} strokeWidth={2} />
                {years.map((year) => {
                    const x = 28 + year * slot + slot / 2
                    const simple = toNumber(simpleAfter(state, year))
                    const compound = compoundAfter(state, year)
                    return (
                        <g key={year}>
                            {(shown || year === 0) && (
                                <>
                                    <rect x={x - bar - 1} y={base - simple * scale} width={bar} height={simple * scale} fill={BLUE} fillOpacity={0.35} stroke={INK} strokeWidth={1.2} />
                                    <rect x={x + 1} y={base - compound * scale} width={bar} height={compound * scale} fill={GREEN} fillOpacity={0.6} stroke={INK} strokeWidth={1.2} />
                                </>
                            )}
                            <text x={x} y={base + 17} textAnchor="middle" fontSize={14} fontWeight={700} fill={MUTED}>{year}</text>
                        </g>
                    )
                })}
                {shown
                    ? <text x={Math.min(lastX, 352)} y={base - finalCompound * scale - 7} textAnchor={lastX > 330 ? 'end' : 'middle'} fontSize={15} fontWeight={700} fill={GREEN}>{money(props.language, finalCompound)}</text>
                    : <Hidden x={200} y={120} />}
                <Label x={352} y={229} textAnchor="end" fontSize={13} fill={MUTED}>{l(say('urteak', 'años', 'السنوات'))}</Label>
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
    const shown = state.prediction !== null
    const cost = mixtureCost(state)
    const mean = mixturePrice(state)
    const [ka, kb] = state.kilos
    const [pa, pb] = state.prices.map((price) => moneyLatex(price / 100))
    const latex = `\\frac{${ka}\\cdot ${pa}+${kb}\\cdot ${pb}}{${ka + kb}}=\\frac{${exactLatex(cost)}}{${ka + kb}}${shortDecimal(mean) ? '=' : '\\approx '}${moneyLatex(toNumber(mean))}`
    const note = l(say(
        `${ka + kb} kg: ${money('eu', toNumber(cost))} €. Kiloa: ${money('eu', toNumber(mean))} €.`,
        `${ka + kb} kg cuestan ${money('es', toNumber(cost))} €: ${money('es', toNumber(mean))} €/kg.`,
        `${ka + kb} كغ تكلّف ${money('ar', toNumber(cost))} €، أي ${money('ar', toNumber(mean))} € للكيلوغرام.`
    ))
    const readout = (
        <Predict
            language={props.language}
            question={say('Emaitza ikusi aurretik: non geratuko da prezio ertaina?', 'Antes de ver el resultado: ¿dónde quedará el precio medio?', 'قبل رؤية النتيجة: أين سيقع السعر المتوسط؟')}
            labels={{ '<': say('Merkeenetik hurbilago', 'Más cerca del barato', 'أقرب إلى الرخيص'), '=': say('Justu erdian', 'Justo en medio', 'في المنتصف تمامًا'), '>': say('Garestienetik hurbilago', 'Más cerca del caro', 'أقرب إلى الغالي') }}
            actual={mixturePrediction(state)}
            choice={state.prediction}
            tip={say('Prezio ertaina kilo gehien dituen produktura hurbiltzen da; kilo berdinekin, justu erdian geratzen da.', 'El precio medio se acerca al producto del que hay más kilos; con los mismos kilos, queda justo en medio.', 'يقترب السعر المتوسط من المنتج الذي كمّيته أكبر؛ وبكميتين متساويتين يقع في المنتصف تمامًا.')}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout language={props.language} latex={latex} note={note} />
        </Predict>
    )
    // A price line from 5 € to 15 €
    const line = (euros: number) => 30 + (euros - 5) * 30
    const meanX = line(toNumber(mean))
    // Sacks sit above their price; two close prices push their sacks apart and a dashed line points to the price
    const ticks = state.prices.map((price) => line(price / 100))
    const centre = (ticks[0] + ticks[1]) / 2
    const apart = Math.abs(ticks[0] - ticks[1]) < 52
    const sackX = apart ? ticks.map((tick, index) => centre + (tick < ticks[1 - index] || (tick === ticks[1 - index] && index === 0) ? -26 : 26)) : ticks
    const sackXs = sackX.map((x) => Math.min(334, Math.max(26, x)))
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={mixtureChallenges} extraChallenges={mixtureExtra} state={state}>
            <Board height={190} label={l(say('Bi prezio eta prezio ertaina', 'Dos precios y el precio medio', 'سعران والسعر المتوسط'))}>
                {[0, 1].map((index) => {
                    const x = sackXs[index]
                    const height = 22 + state.kilos[index] * 2
                    return (
                        <g key={index}>
                            {Math.abs(x - ticks[index]) > 1 && <line x1={x} x2={ticks[index]} y1={118} y2={130} stroke={MUTED} strokeWidth={1.4} strokeDasharray="3 3" />}
                            <path d={`M${x - 22} ${118 - height} h44 l-5 ${height} h-34 z`} fill={index === 0 ? '#8a5a33' : '#c4a27a'} fillOpacity={0.55} stroke={INK} strokeWidth={1.6} />
                            <text x={x} y={118 - height / 2 + 5} textAnchor="middle" fontSize={14} fontWeight={700} fill={INK}>{`${state.kilos[index]} kg`}</text>
                            <text x={x} y={112 - height} textAnchor="middle" fontSize={14} fontWeight={700} fill={MUTED}>{money(props.language, state.prices[index] / 100)}</text>
                        </g>
                    )
                })}
                <line x1={line(5)} x2={line(15)} y1={130} y2={130} stroke={INK} strokeWidth={2} />
                {[5, 10, 15].map((euros) => (
                    <g key={euros}>
                        <line x1={line(euros)} x2={line(euros)} y1={125} y2={135} stroke={INK} strokeWidth={1.6} />
                        <text x={line(euros)} y={150} textAnchor="middle" fontSize={13} fill={MUTED}>{`${euros} €`}</text>
                    </g>
                ))}
                {shown
                    ? (
                        <>
                            <path d={`M${meanX} 133 l-8 14 h16 z`} fill={SECOND} />
                            <text x={Math.min(300, Math.max(60, meanX))} y={178} textAnchor="middle" fontSize={16} fontWeight={700} fill={SECOND}>{`${money(props.language, toNumber(mean))} €/kg`}</text>
                        </>
                    )
                    : <Hidden x={180} y={182} size={26} />}
            </Board>
        </ToolFrame>
    )
}

/* ---------- 3. Two vehicles on a road ---------- */

function Car({ x, y, color, back = false }: { x: number; y: number; color: string; back?: boolean }) {
    return (
        <g transform={`translate(${x} ${y}) scale(${back ? -0.9 : 0.9} 0.9)`}>
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
            {/* The minutes are typed: a meeting after 225 minutes would take 45 taps of five */}
            <NumberField label={l(say('Erlojua (min)', 'Reloj (min)', 'الساعة (د)'))} value={state.minutes} min={0} max={CLOCK_MAX} onChange={(minutes) => setState((s) => setMotion(s, { minutes }))} language={props.language} />
        </>
    )
    const meeting = meetingMinutes(state)
    const speed = closingSpeed(state)
    const [v1, v2] = state.speeds
    const sign = state.mode === 'meet' ? '+' : '-'
    const latex = meeting
        ? `${state.distance}\\mathbin{:}(${v1}${sign}${v2})=${exactLatex(fraction(meeting.numerator, meeting.denominator * 60))}\\ \\text{h}`
        : `${v1}-${v2}=${speed}\\le 0`
    const [a, b] = positions(state)
    const gap = Math.abs(toNumber(b) - toNumber(a))
    const when = meeting === null ? '' : hoursText(toNumber(meeting) / 60, props.language)
    const note = meeting === null
        ? l(say('Ez dira inoiz elkartzen: aurrekoa ez da motelagoa.', 'No se encuentran nunca: el de delante no es más lento.', 'لن يلتقيا أبدًا: الأمامي ليس أبطأ.'))
        : atMeeting(state)
            ? l(say(`Elkartu dira! ${when} igaro dira.`, `¡Se encuentran! Al cabo de ${when}.`, `التقيا! بعد ${when}.`))
            : l(say(
                `${state.minutes} min: ${money('eu', gap)} km falta dira. Elkartzeko: ${when}.`,
                `${state.minutes} min: faltan ${money('es', gap)} km. Se encuentran al cabo de ${when}.`,
                `بعد ${state.minutes} د: بقي ${money('ar', gap)} كم. يلتقيان بعد ${when}.`
            ))
    const actual = motionPrediction(state)
    const result = <Readout language={props.language} latex={latex} note={note} />
    const readout = actual === null
        ? result
        : (
            <Predict
                language={props.language}
                question={say('Emaitza ikusi aurretik: noiz elkartuko dira?', 'Antes de ver el resultado: ¿cuándo se encontrarán?', 'قبل رؤية النتيجة: متى سيلتقيان؟')}
                labels={{ '<': say('Ordubete baino lehen', 'Antes de 1 h', 'قبل ساعة'), '=': say('Justu ordubetean', 'Justo en 1 h', 'بعد ساعة تمامًا'), '>': say('Ordubete baino geroago', 'Después de 1 h', 'بعد أكثر من ساعة') }}
                actual={actual}
                choice={state.prediction}
                tip={state.mode === 'meet'
                    ? say(`Ordubetean $${v1}+${v2}=${speed}$ km hurbiltzen dira, eta ${state.distance} km daude artean.`, `En una hora se acercan $${v1}+${v2}=${speed}$ km, y los separan ${state.distance} km.`, `في ساعة يقتربان $${v1}+${v2}=${speed}$ كم، والمسافة بينهما ${state.distance} كم.`)
                    : say(`Ordubetean A-k $${v1}-${v2}=${speed}$ km murrizten ditu, eta B ${state.distance} km aurrerago doa.`, `En una hora A recorta $${v1}-${v2}=${speed}$ km, y B va ${state.distance} km por delante.`, `في ساعة يقلّص أ المسافة $${v1}-${v2}=${speed}$ كم، وب أمامه بمسافة ${state.distance} كم.`)}
                onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
            >
                {result}
            </Predict>
        )
    // The road shows from A's start to a bit beyond the furthest point
    const far = Math.max(state.distance, toNumber(a), toNumber(b)) * 1.05
    const road = (km: number) => 20 + (Math.max(0, Math.min(km, far)) / far) * 316
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={motionChallenges} extraChallenges={motionExtra} state={state}>
            <Board height={150} label={l(say('Errepidea eta bi ibilgailuak', 'La carretera y los dos vehículos', 'الطريق والمركبتان'))}>
                <line x1={12} x2={348} y1={88} y2={88} stroke={INK} strokeWidth={3} />
                <line x1={12} x2={348} y1={88} y2={88} stroke={CARD} strokeWidth={1} strokeDasharray="10 10" />
                <line x1={road(0)} x2={road(0)} y1={80} y2={98} stroke={STAGE} strokeWidth={2} />
                <line x1={road(state.distance)} x2={road(state.distance)} y1={80} y2={98} stroke={SECOND} strokeWidth={2} />
                <text x={road(0)} y={114} textAnchor="middle" fontSize={14} fontWeight={700} fill={STAGE}>0</text>
                <text x={road(state.distance)} y={114} textAnchor="middle" fontSize={14} fontWeight={700} fill={SECOND}>{`${state.distance} km`}</text>
                <Car x={road(toNumber(a))} y={75} color="#2f6fdb" />
                <Car x={road(toNumber(b))} y={75} color="#c4432a" back={state.mode === 'meet'} />
                <text x={road(toNumber(a))} y={42} textAnchor="middle" fontSize={16} fontWeight={700} fill={STAGE}>A</text>
                {/* Side by side, B's letter goes higher so that A's stays visible */}
                <text x={road(toNumber(b))} y={Math.abs(road(toNumber(b)) - road(toNumber(a))) < 22 ? 22 : 42} textAnchor="middle" fontSize={16} fontWeight={700} fill={SECOND}>B</text>
                <text x={180} y={142} textAnchor="middle" fontSize={17} fontWeight={700} fill={atMeeting(state) ? GREEN : INK}>{`${state.minutes} min`}</text>
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
    const shown = state.prediction !== null
    const rate = fillRate(state)
    const hours = fillHours(state)
    const terms = [`\\frac{1}{${state.taps[0]}}`, ...(state.taps[1] > 0 ? [`+\\frac{1}{${state.taps[1]}}`] : []), ...(state.drain > 0 ? [`-\\frac{1}{${state.drain}}`] : [])].join('')
    const latex = `${terms}=${exactLatex(rate)}${hours ? `\\ \\to\\ ${exactLatex(hours)}\\ \\text{h}` : ''}`
    const note = hours
        ? l(say(`Biltegia ${hoursText(toNumber(hours))} igarotzean betetzen da.`, `El depósito se llena en ${hoursText(toNumber(hours))}.`, `يمتلئ الخزان في ${hoursText(toNumber(hours), 'ar')}.`))
        : l(say('Hustubideak sartzen dena baino gehiago ateratzen du: ez da inoiz beteko.', 'El desagüe saca más de lo que entra: no se llenará nunca.', 'يُخرج المصرف أكثر مما يدخل: لن يمتلئ أبدًا.'))
    const readout = (
        <Predict
            language={props.language}
            question={say(
                `Emaitza ikusi aurretik: txorrota azkarrenak bakarrik ${fastestTap(state)} h behar ditu. Biltegia lehenago beteko da?`,
                `Antes de ver el resultado: el grifo más rápido solo tarda ${fastestTap(state)} h. ¿Se llenará antes?`,
                `قبل رؤية النتيجة: الصنبور الأسرع وحده يحتاج إلى ${fastestTap(state)} س. هل يمتلئ الخزان أسرع؟`
            )}
            labels={{ '<': say('Lehenago', 'Antes', 'أسرع'), '=': say('Berdin', 'Igual', 'بالقدر نفسه'), '>': say('Geroago, edo inoiz ez', 'Después, o nunca', 'أبطأ، أو لا يمتلئ') }}
            actual={tapsPrediction(state)}
            choice={state.prediction}
            tip={say(
                'Irekitako txorrota bakoitzak bere zatia gehitzen du ordu bakoitzean: biek batera azkarrena bakarrik baino lehenago betetzen dute. Hustubideak kendu egiten du, eta geroago bete daiteke, edo inoiz ez.',
                'Cada grifo abierto suma su parte de cada hora: juntos llenan antes que el más rápido solo. El desagüe resta, y puede hacer que tarde más, o que no se llene nunca.',
                'كل صنبور مفتوح يضيف جزءه في كل ساعة: معًا يملآن أسرع من الأسرع وحده. أما المصرف فيطرح، وقد يجعل الملء أبطأ أو مستحيلًا.'
            )}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout language={props.language} latex={latex} note={note} />
        </Predict>
    )
    // The tank fills hour by hour: one band per hour, the last one partial
    const tankX = 216
    const tankY = 12
    const tankHeight = 176
    const share = Math.max(0, toNumber(rate))
    const bands = hours ? Math.ceil(toNumber(hours) - 1e-9) : 4
    const parts = [
        { width: 1 / state.taps[0], color: STAGE, label: 'A' },
        ...(state.taps[1] > 0 ? [{ width: 1 / state.taps[1], color: GREEN, label: 'B' }] : []),
        ...(state.drain > 0 ? [{ width: -1 / state.drain, color: SECOND, label: '−' }] : [])
    ]
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={tapsChallenges} extraChallenges={tapsExtra} state={state}>
            <Board height={216} label={l(say('Ordu bateko zatiak eta biltegia', 'Las partes de una hora y el depósito', 'أجزاء الساعة والخزان'))}>
                <Label x={12} y={20} fontSize={14} fontWeight={700} fill={MUTED}>{l(say('Ordu batean', 'En una hora', 'في ساعة'))}</Label>
                {parts.map((part, index) => {
                    const y = 34 + index * 40
                    const width = Math.abs(part.width) * 160
                    return (
                        <g key={index}>
                            <rect x={34} y={y} width={160} height={28} fill={CARD} stroke={INK} strokeWidth={1.2} />
                            <rect x={34} y={y} width={width} height={28} fill={part.color} fillOpacity={0.45} stroke={INK} strokeWidth={1.2} />
                            <text x={20} y={y + 20} textAnchor="middle" fontSize={16} fontWeight={700} fill={part.color}>{part.label}</text>
                        </g>
                    )
                })}
                <rect x={tankX} y={tankY} width={132} height={tankHeight} fill={CARD} stroke={INK} strokeWidth={2.4} />
                {shown && share > 0 && Array.from({ length: Math.min(bands, 12) }, (_, hour) => {
                    const filled = Math.min(1, share * (hour + 1)) - Math.min(1, share * hour)
                    const bottom = tankY + tankHeight - Math.min(1, share * hour) * tankHeight
                    return <rect key={hour} x={tankX} y={bottom - filled * tankHeight} width={132} height={filled * tankHeight} fill={hour % 2 ? STAGE : STAGE_TINT} fillOpacity={0.7} stroke={INK} strokeWidth={0.6} />
                })}
                {shown
                    ? <text x={tankX + 66} y={tankY + tankHeight + 20} textAnchor="middle" fontSize={15} fontWeight={700} fill={hours ? STAGE : SECOND}>{hours ? hoursText(toNumber(hours)) : '∞'}</text>
                    : <Hidden x={tankX + 66} y={tankY + tankHeight / 2 + 12} />}
            </Board>
        </ToolFrame>
    )
}
