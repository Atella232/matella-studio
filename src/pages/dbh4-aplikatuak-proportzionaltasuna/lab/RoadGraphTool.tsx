import { useId, useState } from 'react'
import { ResultAnswer, Segmented, Stepper, ToolFrame } from '../../../features/unit-v2/lab/LabKit'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import { useLabText } from '../../../features/unit-v2/lab/useLabText'
import { fraction, toExactDecimal, toNumber, type FractionValue } from '../../../features/unit-v2/math/fraction'
import { readMoneyAnswer } from '../answers'
import type { MotionMode } from './labTools'
import { roundedAnswer } from './percentBar'
import {
    departures,
    expectedGraphAnswer,
    GRAPH_DELAYS,
    GRAPH_DISTANCES,
    GRAPH_SPEED_MAX,
    GRAPH_SPEED_MIN,
    GRAPH_SPEED_STEP,
    graphAnswered,
    graphMeeting,
    initialRoadGraphState,
    positionsAt,
    roadGraphChallenges,
    roadGraphExtra,
    setRoadGraph,
    type LateVehicle,
    type RoadGraphState
} from './roadGraph'

const INK = 'var(--ink, #1d2733)'
const MUTED = 'var(--muted, #58616e)'
const LINE = 'var(--line, #d8d2c6)'
const GREEN = 'var(--success, #267b53)'
const BLUE = '#2f6fdb'
const RED = '#c4432a'

type Text = { eu: string; es: string; ar: string }
const say = (eu: string, es: string, ar: string): Text => ({ eu, es, ar })

/** A number for a label: whole, or with the comma (point in Arabic) and ≈ when rounded */
function numberText(language: string, value: FractionValue) {
    const { value: shown, rounded } = roundedAnswer(value)
    return `${rounded ? '≈ ' : ''}${toExactDecimal(shown, language === 'ar' ? '.' : ',')}`
}
/** Hours and minutes for a sentence: «1 h 54 min» («1 س 54 د» in Arabic) */
function clockText(language: string, minutes: number) {
    const whole = Math.round(minutes)
    const hours = Math.floor(whole / 60)
    const rest = whole % 60
    const [h, min] = language === 'ar' ? ['س', 'د'] : ['h', 'min']
    return hours === 0 ? `${rest} ${min}` : rest === 0 ? `${hours} ${h}` : `${hours} ${h} ${rest} ${min}`
}
/** A round end for an axis: the first of these steps that leaves at most six ticks */
function niceAxis(top: number, steps: number[]) {
    const step = steps.find((candidate) => top / candidate <= 6) ?? steps[steps.length - 1]
    return { step, end: Math.max(step, Math.ceil(top / step - 1e-9) * step) }
}

export function RoadGraphTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const clip = useId()
    const [state, setState] = useState<RoadGraphState>(initialRoadGraphState)
    const set = (patch: Parameters<typeof setRoadGraph>[1]) => setState((current) => setRoadGraph(current, patch))
    const controls = (
        <>
            <Segmented label={l(say('Nola', 'Cómo', 'كيف'))} value={state.mode} options={[{ value: 'meet', label: l(say('Elkarrengana', 'Al encuentro', 'تلاقٍ')) }, { value: 'chase', label: l(say('Atzetik', 'Persecución', 'مطاردة')) }]} onChange={(mode) => set({ mode: mode as MotionMode })} />
            <Segmented label={l(say('B-ren hasiera (km)', 'Salida de B (km)', 'انطلاق B (كم)'))} value={String(state.distance)} options={GRAPH_DISTANCES.filter((distance) => state.mode === 'chase' || distance > 0).map((distance) => ({ value: String(distance), label: String(distance) }))} onChange={(distance) => set({ distance: Number(distance) })} />
            <Stepper label="A · km/h" value={state.speeds[0]} min={GRAPH_SPEED_MIN} max={GRAPH_SPEED_MAX} step={GRAPH_SPEED_STEP} onChange={(speed) => set({ speed: [0, speed] })} language={props.language} />
            <Stepper label="B · km/h" value={state.speeds[1]} min={GRAPH_SPEED_MIN} max={GRAPH_SPEED_MAX} step={GRAPH_SPEED_STEP} onChange={(speed) => set({ speed: [1, speed] })} language={props.language} />
            <Segmented label={l(say('Nor abiatzen da geroago?', '¿Quién sale más tarde?', 'من ينطلق لاحقًا؟'))} value={state.late} options={[{ value: 'none', label: l(say('Inor ez', 'Nadie', 'لا أحد')) }, { value: 'A', label: 'A' }, { value: 'B', label: 'B' }]} onChange={(late) => set({ late: late as LateVehicle })} />
            {state.late !== 'none' && <Segmented label={l(say('Zenbat geroago (min)', 'Cuánto más tarde (min)', 'كم لاحقًا (د)'))} value={String(state.delay)} options={GRAPH_DELAYS.map((delay) => ({ value: String(delay), label: String(delay) }))} onChange={(delay) => set({ delay: Number(delay) })} />}
        </>
    )

    const meeting = graphMeeting(state)
    const expected = expectedGraphAnswer(state)
    const solved = graphAnswered(state)
    const shown = meeting !== null && (solved || state.revealed)
    const readout = meeting === null || expected === null
        ? <span className="fraction-v2-lab-readout-note">{l(say('Zuzenak ez dira ebakitzen: ez dira inoiz elkartzen.', 'Las rectas no se cortan: no se encuentran nunca.', 'لا يتقاطع المستقيمان: لن يلتقيا أبدًا.'))}</span>
        : (
            <>
                <span className="fraction-v2-lab-readout-note">{l(say('Lehen irteeratik zenbat minutura elkartzen dira?', '¿A los cuántos minutos de la primera salida se encuentran?', 'بعد كم دقيقة من أول انطلاق يلتقيان؟'))}</span>
                <ResultAnswer
                    language={props.language}
                    state={state}
                    expected={expected}
                    placeholder={say('Adib.: 80', 'Ej.: 80', '⁦80⁩')}
                    unreadable={say('Idatzi minutuak, adibidez 80.', 'Escribe los minutos, por ejemplo 80.', 'اكتب الدقائق، مثل 80.')}
                    normalizeInput={readMoneyAnswer}
                    onChange={(patch) => setState((current) => ({ ...current, ...patch }))}
                />
                {roundedAnswer(meeting.minutes).rounded && !shown && <span className="fraction-v2-lab-readout-note">{l(say('Biribildu ehunenetara.', 'Redondea a las centésimas.', 'قرّب إلى أجزاء المئة.'))}</span>}
                {shown && (
                    <span className="fraction-v2-lab-readout-note">
                        {l(say(
                            `${clockText('eu', toNumber(meeting.minutes))} igarotzean elkartzen dira, A-ren irteeratik ${numberText('eu', meeting.km)} km-ra. Zuzenen ebakidura da topaketa; zenbat eta zuzen inklinatuagoa, orduan eta azkarrago.`,
                            `Se encuentran al cabo de ${clockText('es', toNumber(meeting.minutes))}, a ${numberText('es', meeting.km)} km de la salida de A. El cruce de las rectas es el encuentro; cuanto más inclinada la recta, más rápido va.`,
                            `يلتقيان بعد ${clockText('ar', toNumber(meeting.minutes))} على بعد ${numberText('ar', meeting.km)} كم من انطلاق A. تقاطع المستقيمين هو اللقاء، وكلما كان المستقيم أشدّ ميلًا كانت السرعة أكبر.`
                        ))}
                    </span>
                )}
            </>
        )

    // The plot: minutes across, km from A's start up
    const [startA, startB] = departures(state)
    const { step: timeStep, end: timeEnd } = niceAxis(meeting ? toNumber(meeting.minutes) * 1.25 : Math.max(startA, startB) + 240, [15, 30, 60, 120, 180])
    const ends = positionsAt(state, fraction(timeEnd)).map(toNumber)
    const { step: kmStep, end: kmEnd } = niceAxis(state.mode === 'meet' ? state.distance : Math.max(state.distance, ...ends, 10), [10, 20, 25, 50, 60, 100, 150, 200, 300, 500])
    const left = 50
    const right = 344
    const top = 34
    const bottom = 212
    const x = (minutes: number) => left + (minutes / timeEnd) * (right - left)
    const y = (km: number) => bottom - (km / kmEnd) * (bottom - top)
    const path = (points: Array<[number, number]>) => points.map(([minutes, km], index) => `${index === 0 ? 'M' : 'L'}${x(minutes)} ${y(km)}`).join(' ')
    const lineA = path([[0, 0], [startA, 0], [timeEnd, ends[0]]])
    const lineB = path([[0, state.distance], [startB, state.distance], [timeEnd, ends[1]]])
    const labelY = (km: number) => Math.min(bottom - 6, Math.max(top + 12, y(km)))
    const timeTicks = Array.from({ length: Math.round(timeEnd / timeStep) + 1 }, (_, index) => index * timeStep)
    const kmTicks = Array.from({ length: Math.round(kmEnd / kmStep) + 1 }, (_, index) => index * kmStep)
    const meetX = meeting ? x(toNumber(meeting.minutes)) : 0
    const meetY = meeting ? y(toNumber(meeting.km)) : 0
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={roadGraphChallenges} extraChallenges={roadGraphExtra} state={state}>
            <svg viewBox="0 0 360 250" direction="ltr" role="img" aria-label={l(say('Bi ibilgailuen distantzia-denbora grafikoa', 'La gráfica distancia–tiempo de los dos vehículos', 'منحنى المسافة والزمن للمركبتين'))} style={{ display: 'block', width: '100%', maxWidth: 520, height: 'auto', margin: '0 auto', fontFamily: '"Atkinson Hyperlegible", "Noto Sans Arabic", system-ui, sans-serif' }}>
                <defs>
                    <clipPath id={clip}><rect x={left} y={top - 4} width={right - left} height={bottom - top + 4} /></clipPath>
                </defs>
                <text x={left} y={16} fontSize={14} fontWeight={700} fill={BLUE}>{`A · ${state.speeds[0]} km/h`}</text>
                <text x={left + 130} y={16} fontSize={14} fontWeight={700} fill={RED}>{`B · ${state.speeds[1]} km/h`}</text>
                {kmTicks.map((km) => (
                    <g key={`km-${km}`}>
                        <line x1={left} x2={right} y1={y(km)} y2={y(km)} stroke={LINE} strokeWidth={1} />
                        <text x={left - 6} y={y(km) + 4} textAnchor="end" fontSize={12} fill={MUTED}>{km}</text>
                    </g>
                ))}
                {timeTicks.map((minutes) => (
                    <g key={`t-${minutes}`}>
                        <line x1={x(minutes)} x2={x(minutes)} y1={top} y2={bottom} stroke={LINE} strokeWidth={1} />
                        <text x={x(minutes)} y={bottom + 16} textAnchor="middle" fontSize={12} fill={MUTED}>{minutes}</text>
                    </g>
                ))}
                <line x1={left} x2={right} y1={bottom} y2={bottom} stroke={INK} strokeWidth={1.8} />
                <line x1={left} x2={left} y1={top - 4} y2={bottom} stroke={INK} strokeWidth={1.8} />
                <text x={right} y={bottom + 32} textAnchor="end" fontSize={13} fontWeight={700} fill={MUTED}>min</text>
                <text x={8} y={top - 8} fontSize={13} fontWeight={700} fill={MUTED}>km</text>
                <g clipPath={`url(#${clip})`}>
                    <path d={lineA} fill="none" stroke={BLUE} strokeWidth={3} strokeLinejoin="round" />
                    <path d={lineB} fill="none" stroke={RED} strokeWidth={3} strokeLinejoin="round" />
                </g>
                <text x={right - 4} y={labelY(ends[0]) - 6} textAnchor="end" fontSize={15} fontWeight={700} fill={BLUE}>A</text>
                <text x={right - 4} y={labelY(ends[1]) - 6} textAnchor="end" fontSize={15} fontWeight={700} fill={RED}>B</text>
                {shown && meeting && (
                    <g>
                        <line x1={meetX} x2={meetX} y1={meetY} y2={bottom} stroke={GREEN} strokeWidth={1.6} strokeDasharray="4 3" />
                        <line x1={left} x2={meetX} y1={meetY} y2={meetY} stroke={GREEN} strokeWidth={1.6} strokeDasharray="4 3" />
                        <circle cx={meetX} cy={meetY} r={6} fill={GREEN} stroke={INK} strokeWidth={1.4} />
                        <text x={meetX + (meetX > 220 ? -10 : 10)} y={Math.max(top + 12, meetY - 10)} textAnchor={meetX > 220 ? 'end' : 'start'} fontSize={14} fontWeight={700} fill={GREEN}>{`${numberText(props.language, meeting.minutes)} min · ${numberText(props.language, meeting.km)} km`}</text>
                    </g>
                )}
            </svg>
        </ToolFrame>
    )
}
