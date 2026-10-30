import { useState, type ReactNode } from 'react'
import { MathText } from '../../../components/MathText'
import { ResultAnswer, Segmented, ToolFrame } from '../../../features/unit-v2/lab/LabKit'
import { NumberField } from '../../../features/unit-v2/lab/NumberField'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import { useLabText } from '../../../features/unit-v2/lab/useLabText'
import { divide, fraction, toNumber, type FractionValue } from '../../../features/unit-v2/math/fraction'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import { Label } from '../../dbh2-funtzioak-v2/plane'
import { readMoneyAnswer } from '../answers'
import { moneyText } from '../games/numbers'
import {
    CALENDAR_CAPITAL_MAX,
    CALENDAR_INTEREST_MAX,
    CALENDAR_RATE_MAX,
    CALENDAR_TIME_MAX,
    calendarAnswered,
    calendarChallenges,
    calendarExtra,
    calendarLatex,
    calendarValid,
    calendarValues,
    expectedCalendarAnswer,
    INTEREST_UNKNOWNS,
    initialCalendarState,
    PER_YEAR,
    setCalendar,
    setUnit,
    setUnknown,
    TIME_UNITS,
    timeText,
    typeCalendarAnswer,
    yearlyInterest,
    type CalendarState,
    type InterestUnknown,
    type TimeUnit
} from './calendar'
import { decimalFieldText } from './decimalInput'
import { DecimalField } from './DecimalField'
import { roundedAnswer } from './percentBar'
import './Calendar.css'

const INK = 'var(--ink, #1d2733)'
const MUTED = 'var(--muted, #58616e)'
const GREEN = 'var(--success, #267b53)'
const CARD = '#fffcf6'

type Text = { eu: string; es: string; en: string; ar: string }
const say = (eu: string, es: string, ar: string, en: string): Text => ({ eu, es, en, ar })

const UNKNOWN_NAMES: Record<InterestUnknown, Text> = {
    interest: say('Interesa', 'Interés', 'الفائدة', 'Interest'),
    capital: say('Kapitala', 'Capital', 'رأس المال', 'Principal'),
    rate: say('Tasa', 'Tipo', 'السعر', 'Rate'),
    time: say('Denbora', 'Tiempo', 'المدة', 'Time')
}

const UNIT_NAMES: Record<TimeUnit, Text> = {
    years: say('Urteak', 'Años', 'السنوات', 'Years'),
    months: say('Hilabeteak', 'Meses', 'الأشهر', 'Months'),
    days: say('Egunak', 'Días', 'الأيام', 'Days')
}

/** What to write in the answer field */
const ASKS: Record<Exclude<InterestUnknown, 'time'>, Text> = {
    interest: say('Idatzi interesa, eurotan.', 'Escribe el interés, en euros.', 'اكتب الفائدة باليورو.', 'Write the interest, in euros.'),
    capital: say('Idatzi kapitala, eurotan.', 'Escribe el capital, en euros.', 'اكتب رأس المال باليورو.', 'Write the principal, in euros.'),
    rate: say('Idatzi urteko interes-tasa (%).', 'Escribe el tipo de interés anual (%).', 'اكتب سعر الفائدة السنوي (٪).', 'Write the annual interest rate (%).')
}

/** The time, in the unit of the tool */
const ASK_TIME: Record<TimeUnit, Text> = {
    years: say('Idatzi denbora, urtetan.', 'Escribe el tiempo, en años.', 'اكتب المدة بالسنوات.', 'Write the time, in years.'),
    months: say('Idatzi denbora, hilabetetan.', 'Escribe el tiempo, en meses.', 'اكتب المدة بالأشهر.', 'Write the time, in months.'),
    days: say('Idatzi denbora, egunetan.', 'Escribe el tiempo, en días.', 'اكتب المدة بالأيام.', 'Write the time, in days.')
}

/** Euros on the drawing: 120 €, €120 in English, «≈ 3,33 €» when rounded; Arabic keeps them left to right */
function euros(language: UnitLanguage, value: FractionValue | null): string {
    const rounded = value ? roundedAnswer(value) : null
    const amount = rounded ? moneyText(toNumber(rounded.value), language) : '?'
    const text = language === 'en' ? `€${amount}` : `${amount} €`
    return `\u2066${rounded?.rounded ? '≈ ' : ''}${text}\u2069`
}

/** The time on the drawing: 8, or 42,86 days to the hundredth */
const timeNumber = (language: UnitLanguage, value: FractionValue) => decimalFieldText(Math.round(toNumber(value) * 100) / 100, language)

/** Formulas in an Arabic sentence stay left to right */
const isolate = (language: UnitLanguage, text: string) => (language === 'ar' ? text.replace(/\$[^$]+\$/g, (formula) => `\u2066${formula.replace(/\{,\}/g, '.')}\u2069`) : text)

/** Why the divisor is 100, 1200 or 36 000, and, for the interest, what taking months or days as years would give */
function explanation(state: CalendarState, language: UnitLanguage): string {
    const why = {
        years: say('Denbora urtetan dagoenean, zatitzailea 100 da.', 'Con el tiempo en años se divide entre 100.', 'إذا كانت المدة بالسنوات نقسم على 100.', 'With the time in years, divide by 100.'),
        months: say(
            'Hilabete bat urtearen $\\frac{1}{12}$ da: horregatik, 100 ordez $100\\cdot 12=1200$.',
            'Un mes es $\\frac{1}{12}$ de año: por eso el 100 pasa a ser $100\\cdot 12=1200$.',
            'الشهر $\\frac{1}{12}$ من السنة: لذلك يصبح 100 هو $100\\cdot 12=1200$.',
            'A month is $\\frac{1}{12}$ of a year: that is why 100 becomes $100\\cdot 12=1200$.'
        ),
        days: say(
            'Egun bat urte komertzialaren $\\frac{1}{360}$ da: $100\\cdot 360=36\\,000$.',
            'Un día es $\\frac{1}{360}$ del año comercial: $100\\cdot 360=36\\,000$.',
            'اليوم $\\frac{1}{360}$ من السنة التجارية: $100\\cdot 360=36\\,000$.',
            'A day is $\\frac{1}{360}$ of a commercial year: $100\\cdot 360=36\\,000$.'
        )
    }[state.unit][language]
    if (state.unknown !== 'interest' || state.unit === 'years') return isolate(language, why)
    // The typical mistake: the months or days taken as years
    const wrong = moneyText((state.capital * state.rate * state.time) / 100, language)
    const amount = language === 'en' ? `€${wrong}` : language === 'ar' ? `\u2066${wrong} €\u2069` : `${wrong}\u00a0€`
    const times = PER_YEAR[state.unit]
    const time = timeText(state.time, state.unit, language)
    const mistake = say(
        ` ${time} urtetzat hartuz gero, ${amount} aterako litzateke: ${times} aldiz gehiago.`,
        ` Si tomaras ${time} como años, saldrían ${amount}: ${times} veces más.`,
        ` لو حسبت ${time} على أنها سنوات لحصلت على ${amount}، أي ${times} ضعفًا.`,
        ` If you took ${time} as years, you would get ${amount}: ${times} times as much.`
    )[language]
    return isolate(language, `${why}${mistake}`)
}

export function CalendarTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const ar = props.language === 'ar'
    const [state, setState] = useState<CalendarState>(initialCalendarState)
    const set = (patch: Parameters<typeof setCalendar>[1]) => setState((current) => setCalendar(current, patch))
    const unitName = l(UNIT_NAMES[state.unit]).toLowerCase()
    const controls = (
        <>
            <Segmented label={l(say('Ezezaguna', 'Incógnita', 'المجهول', 'Unknown'))} value={state.unknown} options={INTEREST_UNKNOWNS.map((unknown) => ({ value: unknown, label: l(UNKNOWN_NAMES[unknown]) }))} onChange={(unknown) => setState((current) => setUnknown(current, unknown as InterestUnknown))} />
            <Segmented label={l(say('Denbora-unitatea', 'Tiempo en', 'وحدة المدة', 'Time in'))} value={state.unit} options={TIME_UNITS.map((unit) => ({ value: unit, label: l(UNIT_NAMES[unit]) }))} onChange={(unit) => setState((current) => setUnit(current, unit as TimeUnit))} />
            {state.unknown !== 'capital' && <DecimalField label={l(say('Kapitala (€)', 'Capital (€)', 'رأس المال (€)', 'Principal (€)'))} value={state.capital} min={1} max={CALENDAR_CAPITAL_MAX} money onChange={(capital) => set({ capital })} language={props.language} />}
            {state.unknown !== 'rate' && <DecimalField label={l(say('Urteko interes-tasa (%)', 'Tipo de interés anual (%)', 'سعر الفائدة السنوي (٪)', 'Annual interest rate (%)'))} value={state.rate} min={0.01} max={CALENDAR_RATE_MAX} onChange={(rate) => set({ rate })} language={props.language} />}
            {state.unknown !== 'time' && <NumberField label={`${l(UNKNOWN_NAMES.time)} (${unitName})`} value={state.time} min={1} max={CALENDAR_TIME_MAX[state.unit]} onChange={(time) => set({ time })} language={props.language} />}
            {state.unknown !== 'interest' && <DecimalField label={l(say('Interesa (€)', 'Interés (€)', 'الفائدة (€)', 'Interest (€)'))} value={state.interest} min={0.01} max={CALENDAR_INTEREST_MAX} money onChange={(interest) => set({ interest })} language={props.language} />}
        </>
    )

    const valid = calendarValid(state)
    const shown = valid && (calendarAnswered(state) || state.revealed)
    const values = calendarValues(state)

    let readout: ReactNode
    if (!valid) {
        readout = (
            <span className="fraction-v2-lab-readout-note">
                {l(say('Datu hauekin, ezezaguna tresnaren mugetatik kanpo geratzen da: aldatu daturen bat.', 'Con estos datos, la incógnita se sale de lo que admite la herramienta: cambia algún dato.', 'بهذه المعطيات يخرج المجهول عن حدود الأداة: غيّر أحد المعطيات.', 'With these data, the unknown falls outside what the tool can show: change one of them.'))}
            </span>
        )
    } else {
        const rounded = roundedAnswer(values[state.unknown]).rounded
        // Two lines, so that it fits a phone: the formula with letters, then with the data and the result
        const [letter, letters, ...data] = calendarLatex(state).replace(/\{,\}/g, ar ? '.' : '{,}').split('=')
        const lines = [`${letter}=${letters}`, `${letter}=${data.join('=')}`]
        readout = (
            <>
                <span className="fraction-v2-lab-readout-note">{l(state.unknown === 'time' ? ASK_TIME[state.unit] : ASKS[state.unknown])}</span>
                <ResultAnswer
                    language={props.language}
                    state={state}
                    expected={expectedCalendarAnswer(state)}
                    placeholder={state.unknown === 'rate' ? say('Adib.: 3,5', 'Ej.: 3,5', '\u20663.5\u2069', 'e.g. 3.5') : say('Adib.: 120', 'Ej.: 120', '\u2066120\u2069', 'e.g. 120')}
                    unreadable={say('Idatzi zenbaki bat, adibidez 120.', 'Escribe un número, por ejemplo 120.', 'اكتب عددًا، مثل 120.', 'Write a number, for example 120.')}
                    normalizeInput={readMoneyAnswer}
                    onChange={(patch) => setState((current) => typeCalendarAnswer(current, patch, props.language))}
                />
                {rounded && !shown && (
                    <span className="fraction-v2-lab-readout-note">
                        {l(state.unknown === 'interest' || state.unknown === 'capital'
                            ? say('Biribildu zentimoetara.', 'Redondea a los céntimos.', 'قرّب إلى السنتات.', 'Round to the nearest cent.')
                            : say('Biribildu ehunenetara.', 'Redondea a las centésimas.', 'قرّب إلى جزء من مئة.', 'Round to two decimal places.'))}
                    </span>
                )}
                {shown && (
                    <>
                        {lines.map((line) => <span key={line} className="fraction-v2-lab-readout-main"><MathText text={`$${line}$`} /></span>)}
                        <span className="fraction-v2-lab-readout-note"><MathText text={explanation(state, props.language)} /></span>
                    </>
                )}
            </>
        )
    }

    // One row is one year: 12 months, or 12 squares of 30 days; in years, each square is a year
    const years = state.unit === 'years'
    const perRow = years ? 10 : 12
    const gridX = 34
    const cellWidth = 272 / perRow
    const cellHeight = 24
    const rowStep = cellHeight + 8
    const knownTime = state.unknown !== 'time' || shown
    const squares = toNumber(values.time) / (state.unit === 'days' ? 30 : 1)
    const rows = years || !knownTime ? 1 : Math.max(1, Math.ceil(squares / 12 - 1e-9))
    const knownYearly = state.unknown === 'interest' || state.unknown === 'time' || shown
    const yearly = yearlyInterest(state)
    const gridTop = years ? 48 : 74
    const totalY = gridTop + rows * rowStep + 22
    const height = totalY + 14
    const caption = {
        years: say('Lauki bakoitza urte bat da.', 'Cada casilla es un año.', 'كل مربع سنة واحدة.', 'Each square is one year.'),
        months: say('Errenkada bakoitza urte bat da: 12 hilabete.', 'Cada fila es un año: 12 meses.', 'كل صف سنة: 12 شهرًا.', 'Each row is one year: 12 months.'),
        days: say('Errenkada bakoitza urte komertzial bat da: 360 egun, 30 egun lauki bakoitzean.', 'Cada fila es un año comercial: 360 días, 30 en cada casilla.', 'كل صف سنة تجارية: 360 يومًا، 30 يومًا في كل مربع.', 'Each row is a commercial year: 360 days, 30 in each square.')
    }[state.unit]
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={calendarChallenges} extraChallenges={calendarExtra} state={state}>
            <div className="calendar-board">
                <svg viewBox={`0 0 320 ${height}`} direction="ltr" role="img" aria-label={l(say('Interesa urtean, hilabetean eta egunean', 'El interés en un año, un mes y un día', 'الفائدة في السنة والشهر واليوم', 'The interest in a year, a month and a day'))} style={{ display: 'block', width: '100%', maxWidth: 460, height: 'auto', margin: '0 auto', fontFamily: '"Atkinson Hyperlegible", "Noto Sans Arabic", system-ui, sans-serif' }}>
                    <Label x={14} y={28} fontSize={15} fill={INK}>{l(say('Urtebetean', 'En un año', 'في سنة واحدة', 'In one year'))}</Label>
                    <text x={306} y={28} textAnchor="end" fontSize={16} fontWeight={700} fill={knownYearly ? INK : MUTED}>{euros(props.language, knownYearly ? yearly : null)}</text>
                    {!years && (
                        <g>
                            <Label x={14} y={54} fontSize={15} fill={INK}>{l(state.unit === 'months' ? say('Hilabete bakoitzean', 'Cada mes', 'كل شهر', 'Each month') : say('Egun bakoitzean', 'Cada día', 'كل يوم', 'Each day'))}</Label>
                            <text x={306} y={54} textAnchor="end" fontSize={16} fontWeight={700} fill={knownYearly ? INK : MUTED}>{euros(props.language, knownYearly ? divide(yearly, fraction(PER_YEAR[state.unit])) : null)}</text>
                        </g>
                    )}
                    {Array.from({ length: rows }, (_, row) => (
                        <g key={row}>
                            {!years && <text x={gridX - 8} y={gridTop + row * rowStep + 17} textAnchor="end" fontSize={12} fontWeight={700} fill={MUTED}>{row + 1}</text>}
                            {Array.from({ length: perRow }, (_, column) => {
                                const x = gridX + column * cellWidth
                                const y = gridTop + row * rowStep
                                const part = knownTime ? Math.min(1, Math.max(0, squares - row * perRow - column)) : 0
                                return (
                                    <g key={column}>
                                        <rect x={x} y={y} width={cellWidth} height={cellHeight} fill={CARD} stroke={INK} strokeWidth={1} />
                                        {part > 0 && <rect x={x} y={y} width={cellWidth * part} height={cellHeight} fill={GREEN} fillOpacity={0.45} />}
                                    </g>
                                )
                            })}
                        </g>
                    ))}
                    <Label x={14} y={totalY} fontSize={16} fontWeight={700} fill={INK}>{`${l(UNIT_NAMES[state.unit])}: ${knownTime ? timeNumber(props.language, values.time) : '?'}`}</Label>
                    <text x={306} y={totalY} textAnchor="end" fontSize={18} fontWeight={700} fill={state.unknown === 'interest' && !shown ? MUTED : GREEN}>{euros(props.language, state.unknown === 'interest' && !shown ? null : values.interest)}</text>
                </svg>
                <p className="calendar-caption">{l(caption)}</p>
            </div>
        </ToolFrame>
    )
}
