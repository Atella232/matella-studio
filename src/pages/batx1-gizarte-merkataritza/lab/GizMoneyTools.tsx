import { useState } from 'react'
import { Segmented, Stepper, ToolFrame } from '../../../features/unit-v2/lab/LabKit'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import { useLabText } from '../../../features/unit-v2/lab/useLabText'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import { decimalSeparatorFor, groupDigits } from '../../../utils/numberFormat'
import { Label } from '../../dbh2-funtzioak-v2/plane'
import { Board, Hidden, Predict, Readout } from '../../dbh3-segidak/lab/LabParts'
import { GREEN, INK, MUSTARD_TINT, MUTED, say, SECOND, SECOND_TINT, STAGE, STAGE_TINT } from '../../dbh3-segidak/lab/labStyle'
import { setPrediction } from '../../dbh3-segidak/lab/prediction'
import { DOUBLE_GOALS, DOUBLE_RATES, DOUBLE_REFERENCE, doubleChallenges, doubleExtra, doublePrediction, exactYears, initialDoubleState, setDouble, yearsNeeded, type DoubleGoal, type DoubleState } from './double'
import { annuityOf, finalDebt, initialTableState, loanLabel, PAYMENT_STEP, paymentLimits, setTable, TABLE_LOANS, tableChallenges, tableExtra, tablePrediction, tableRows, type TableState } from './table'
import { initialTaeState, periodWords, setTae, stateTae, TAE_GAP, TAE_PERIODS, TAE_RATES, taeChallenges, taeExtra, taeOf, taePrediction, type TaePeriods, type TaeState } from './tae'

/* ==========================================================================
   Merkataritza-aritmetika · Batxilergoa 1 · Gizarte Zientziak — the three
   tools of this unit: when does it double (a staircase of yearly
   capitals), the repayment table (the debt year by year for a chosen
   payment) and the APR grows (the gap over the nominal interest for each
   frequency). Each asks for a prediction before it shows the result. Logic
   in double.ts, table.ts and tae.ts; words in the drawings go through
   <Label>, so the Arabic reads right to left also in Safari.
   ========================================================================== */

/** A number as each language writes it: comma or point, and the thousands grouped */
function written(value: number, decimals: number, language: UnitLanguage): string {
    const negative = value < 0
    const [whole, part] = Math.abs(value).toFixed(decimals).split('.')
    const grouped = groupDigits(whole, language)
    return `${negative ? '−' : ''}${part ? `${grouped}${language === 'ar' ? '.' : decimalSeparatorFor(language)}${part}` : grouped}`
}
/** The same number for LaTeX: thousands with \, and the comma as {,} (the point in Arabic) */
function tex(value: number, decimals: number, language: UnitLanguage): string {
    const [whole, part] = Math.abs(value).toFixed(decimals).split('.')
    const grouped = whole.length >= 5 ? whole.replace(/\B(?=(\d{3})+(?!\d))/g, '\\,') : whole
    return `${value < 0 ? '-' : ''}${part ? `${grouped}${language === 'ar' ? '.' : '{,}'}${part}` : grouped}`
}

/* ---------- L1. When does it double? ---------- */

export function DoubleTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<DoubleState>(initialDoubleState)
    const shown = state.prediction !== null
    const goal = DOUBLE_GOALS[state.goal]
    const years = yearsNeeded(state)
    const span = Math.max(years, DOUBLE_REFERENCE + 2)
    const left = 34
    const width = 312
    const base = 168
    const top = 28
    const step = width / (span + 1)
    const Y = (capital: number) => base - ((capital - 1000) / (goal * 1000 * 1.08 - 1000)) * (base - top)
    const controls = (
        <>
            <Stepper label={l(say('Urteko interesa', 'Interés anual', 'الفائدة السنوية', 'Yearly interest'))} value={state.rate} min={DOUBLE_RATES.min} max={DOUBLE_RATES.max} format={(value) => `${value} %`} onChange={(rate) => setState((s) => setDouble(s, { rate }))} language={props.language} />
            <Segmented<DoubleGoal>
                label={l(say('Helburua', 'Objetivo', 'الهدف', 'Goal'))}
                value={state.goal}
                options={[{ value: 'half', label: `× ${props.language === 'en' || props.language === 'ar' ? '1.5' : '1,5'}` }, { value: 'double', label: '× 2' }, { value: 'triple', label: '× 3' }]}
                onChange={(value) => setState((s) => setDouble(s, { goal: value }))}
            />
        </>
    )
    const mark = props.language === 'ar' ? '.' : '{,}'
    const goalLatex = state.goal === 'half' ? `1${mark}5` : String(goal)
    const rateLatex = `1${mark}${String(state.rate).padStart(2, '0')}`
    const readout = (
        <Predict
            language={props.language}
            question={say(`Ikusi aurretik: 10 urte baino gutxiago, 10 urte ala gehiago beharko dira?`, `Antes de verlo: ¿harán falta menos de 10 años, justo 10 o más?`, `قبل أن تراه: هل يلزم أقل من 10 سنوات أم 10 بالضبط أم أكثر؟`, `Before you see it: will it take fewer than 10 years, exactly 10 or more?`)}
            labels={{ '<': say('Gutxiago', 'Menos', 'أقل', 'Fewer'), '=': say('Hamar', 'Justo 10', '10 بالضبط', 'Exactly 10'), '>': say('Gehiago', 'Más', 'أكثر', 'More') }}
            actual={doublePrediction(state)}
            choice={state.prediction}
            tip={say('Hirurogeita hamabiren araua: 72 zati interesa, gutxi gorabehera bikoizteko urteak.', 'Regla del 72: 72 entre el interés son, más o menos, los años para duplicar.', 'قاعدة الـ72: قسمة 72 على الفائدة تعطي تقريبًا سنوات المضاعفة.', 'The rule of 72: 72 divided by the interest is roughly the years to double.')}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout
                latex={[`n=\\frac{\\log ${goalLatex}}{\\log ${rateLatex}}\\approx ${tex(exactYears(state), 2, props.language)}\\ \\to\\ ${years}`]}
                note={l(say(`${years} urte: bankuak urte osoak ordaintzen ditu.`, `${years} años: el banco paga años completos.`, `${years} سنة: المصرف يدفع عن سنوات كاملة.`, `${years} years: the bank pays for whole years.`))}
            />
        </Predict>
    )
    const bars = Array.from({ length: span + 1 }, (_, year) => 1000 * (1 + state.rate / 100) ** year)
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={doubleChallenges} extraChallenges={doubleExtra} state={state}>
            <Board height={210} label={l(say('1000 euroko kapitala urtez urte, helburuaren lerroarekin', 'El capital de 1000 euros año a año, con la línea del objetivo', 'رأس مال 1000 يورو سنة بعد سنة مع خط الهدف', 'The 1000 euro capital year by year, with the goal line'))}>
                <line x1={left} x2={left + width} y1={base} y2={base} stroke={INK} strokeWidth={1.6} />
                <line x1={left} x2={left + width} y1={Y(goal * 1000)} y2={Y(goal * 1000)} stroke={SECOND} strokeWidth={2} strokeDasharray="6 4" />
                <text x={left + width} y={Y(goal * 1000) - 6} textAnchor="end" fontSize={13} fontWeight={700} fill={SECOND} direction="ltr">{`${written(goal * 1000, 0, props.language)} €`}</text>
                <line x1={left + (DOUBLE_REFERENCE + 0.5) * step} x2={left + (DOUBLE_REFERENCE + 0.5) * step} y1={top - 8} y2={base} stroke={MUTED} strokeWidth={1.2} strokeDasharray="3 3" />
                <text x={left + (DOUBLE_REFERENCE + 0.5) * step} y={top - 12} textAnchor="middle" fontSize={12} fill={MUTED} direction="ltr">10</text>
                {shown
                    ? bars.map((capital, year) => (
                        <rect key={year} x={left + year * step + 1} y={Math.max(top - 10, Y(Math.min(capital, goal * 1080)))} width={Math.max(1, step - 2)} height={base - Math.max(top - 10, Y(Math.min(capital, goal * 1080)))} fill={year === years ? MUSTARD_TINT : STAGE_TINT} stroke={year === years ? INK : STAGE} strokeWidth={year === years ? 1.6 : 0.8} />
                    ))
                    : <Hidden x={180} y={110} />}
                <text x={left} y={base + 18} fontSize={12} fill={MUTED} direction="ltr">0</text>
                <text x={left + span * step} y={base + 18} textAnchor="middle" fontSize={12} fill={MUTED} direction="ltr">{String(span)}</text>
                <Label x={180} y={204} textAnchor="middle" fontSize={12} fill={MUTED}>{l(say('Barra bakoitza urte bat da; marra gorria, helburua', 'Cada barra es un año; la línea roja, el objetivo', 'كل عمود سنة، والخط الأحمر هو الهدف', 'Each bar is a year; the red line, the goal'))}</Label>
            </Board>
        </ToolFrame>
    )
}

/* ---------- L2. The repayment table ---------- */

export function TableTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<TableState>(initialTableState)
    const shown = state.prediction !== null
    const loan = TABLE_LOANS[state.loan]
    const rows = tableRows(state)
    const left = finalDebt(state)
    const { min, max } = paymentLimits(loan)
    const controls = (
        <>
            <Segmented<string>
                label={l(say('Mailegua', 'Préstamo', 'القرض', 'Loan'))}
                value={String(state.loan)}
                options={TABLE_LOANS.map((item, index) => ({ value: String(index), label: l(loanLabel(item)) }))}
                onChange={(value) => setState((s) => setTable(s, { loan: Number(value) }))}
            />
            <Stepper label={l(say('Urtekoa', 'Anualidad', 'الدفعة السنوية', 'Yearly payment'))} value={state.payment} min={min} max={max} step={PAYMENT_STEP} format={(value) => `${written(value, 0, props.language)} €`} onChange={(payment) => setState((s) => setTable(s, { payment }))} language={props.language} />
        </>
    )
    const note = tablePrediction(state) === '='
        ? say('Zorra ia zero geratzen da: hori da urtekoa, ehunetara.', 'La deuda queda casi a cero: esa es la anualidad, a las centenas.', 'يكاد الدين يصبح صفرًا: هذه هي الدفعة السنوية بالمئات.', 'The debt ends almost at zero: that is the yearly payment, to the hundred.')
        : tablePrediction(state) === '>'
            ? say('Zorra geratzen da: urtekoa txikiegia da.', 'Queda deuda: la anualidad es demasiado pequeña.', 'يبقى دين: الدفعة السنوية صغيرة جدًا.', 'Debt is left: the payment is too small.')
            : say('Gehiegi ordaindu da: urtekoa handiegia da.', 'Se ha pagado de más: la anualidad es demasiado grande.', 'دُفع أكثر من اللازم: الدفعة السنوية كبيرة جدًا.', 'Too much has been paid: the payment is too big.')
    const readout = (
        <Predict
            language={props.language}
            question={say('Taula ikusi aurretik: amaieran zorra zero geratuko da, zorra geratuko da, ala gehiegi ordainduko duzu?', 'Antes de ver la tabla: al final, ¿la deuda quedará a cero, quedará deuda o habrás pagado de más?', 'قبل رؤية الجدول: في النهاية، هل يصبح الدين صفرًا أم يبقى دين أم تكون قد دفعت أكثر؟', 'Before you see the table: at the end, will the debt be zero, will debt be left, or will you have paid too much?')}
            labels={{ '<': say('Gehiegi', 'De más', 'أكثر', 'Too much'), '=': say('Zero', 'A cero', 'صفر', 'Zero'), '>': say('Zorra geratzen da', 'Queda deuda', 'يبقى دين', 'Debt left') }}
            actual={tablePrediction(state)}
            choice={state.prediction}
            tip={say('Konparatu urtekoarekin: $a=C\\cdot\\frac{(1+i)^{n}\\cdot i}{(1+i)^{n}-1}$.', 'Compara con la anualidad: $a=C\\cdot\\frac{(1+i)^{n}\\cdot i}{(1+i)^{n}-1}$.', 'قارن بالدفعة السنوية: $a=C\\cdot\\frac{(1+i)^{n}\\cdot i}{(1+i)^{n}-1}$.', 'Compare with the annuity: $a=C\\cdot\\frac{(1+i)^{n}\\cdot i}{(1+i)^{n}-1}$.')}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout
                latex={[...rows.map((row) => `${row.year}:\\ I=${tex(row.interest, 2, props.language)}\\quad A=${tex(row.repaid, 2, props.language)}`), `a\\approx ${tex(annuityOf(loan), 2, props.language)}`]}
                note={l(note)}
            />
        </Predict>
    )
    const baseY = 150
    const scale = 110 / loan.capital
    const columns = loan.years + 1
    const column = 300 / columns
    const debts = [loan.capital, ...rows.map((row) => row.left)]
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={tableChallenges} extraChallenges={tableExtra} state={state}>
            <Board height={200} label={l(say('Zorra urte bakoitzaren hasieran eta amaieran', 'La deuda al principio de cada año y al final', 'الدين في بداية كل سنة وفي النهاية', 'The debt at the start of each year and at the end'))}>
                <line x1={30} x2={340} y1={baseY} y2={baseY} stroke={INK} strokeWidth={1.6} />
                {debts.map((debt, index) => {
                    const x = 34 + index * column
                    const visible = index === 0 || shown
                    if (!visible) return null
                    const height = Math.abs(debt) * scale
                    const negative = debt < 0
                    return (
                        <g key={index}>
                            <rect x={x + 4} y={negative ? baseY : baseY - height} width={column - 8} height={Math.max(1, height)} fill={negative ? 'var(--success-tint, #d9efe2)' : index === debts.length - 1 ? SECOND_TINT : STAGE_TINT} stroke={negative ? GREEN : index === debts.length - 1 ? SECOND : STAGE} strokeWidth={1.4} />
                            <text x={x + column / 2} y={baseY + (negative ? height + 14 : 14)} textAnchor="middle" fontSize={11} fill={MUTED} direction="ltr">{String(index)}</text>
                        </g>
                    )
                })}
                {shown
                    ? <text x={334} y={26} textAnchor="end" fontSize={14} fontWeight={700} fill={left < 0 ? GREEN : SECOND} direction="ltr">{`${written(left, 2, props.language)} €`}</text>
                    : <Hidden x={220} y={90} />}
                <Label x={180} y={194} textAnchor="middle" fontSize={12} fill={MUTED}>{l(say('Zorra urtez urte; azken barra, amaieran geratzen dena', 'La deuda año a año; la última barra, lo que queda al final', 'الدين سنة بعد سنة، والعمود الأخير ما يبقى في النهاية', 'The debt year by year; the last bar, what is left at the end'))}</Label>
            </Board>
        </ToolFrame>
    )
}

/* ---------- L3. The APR grows ---------- */

export function TaeTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<TaeState>(initialTaeState)
    const shown = state.prediction !== null
    const tae = stateTae(state)
    const controls = (
        <>
            <Stepper label={l(say('Interes nominala', 'Interés nominal', 'الفائدة الاسمية', 'Nominal interest'))} value={state.rate} min={TAE_RATES.min} max={TAE_RATES.max} format={(value) => `${value} %`} onChange={(rate) => setState((s) => setTae(s, { rate }))} language={props.language} />
            <Segmented<string>
                label={l(say('Ordainketa', 'Pago', 'الدفع', 'Payment'))}
                value={String(state.periods)}
                options={TAE_PERIODS.map((periods) => ({ value: String(periods), label: l(periodWords[periods]) }))}
                onChange={(value) => setState((s) => setTae(s, { periods: Number(value) as TaePeriods }))}
            />
        </>
    )
    const rateLatex = tex(state.rate / 100, 2, props.language)
    const readout = (
        <Predict
            language={props.language}
            question={say('Ikusi aurretik: urteko tasa baliokidea interes nominala baino puntu laurden bat gehiago izango da, gutxiago ala justu hori?', 'Antes de verlo: ¿la TAE pasará al interés nominal en más o en menos de un cuarto de punto?', 'قبل أن تراه: هل يزيد المعدل السنوي المكافئ على الفائدة الاسمية بأكثر من ربع نقطة أم بأقل؟', 'Before you see it: will the APR beat the nominal interest by more or less than a quarter of a point?')}
            labels={{ '<': say('Gutxiago', 'Menos', 'أقل', 'Less'), '=': say('Justu', 'Justo', 'بالضبط', 'Exactly'), '>': say('Gehiago', 'Más', 'أكثر', 'More') }}
            actual={taePrediction(state)}
            choice={state.prediction}
            tip={say('Aldi gehiago eta interes handiagoa: alde handiagoa.', 'Más periodos e interés más alto: más diferencia.', 'فترات أكثر وفائدة أعلى: فرق أكبر.', 'More periods and a higher interest: a bigger gap.')}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout
                latex={[`\\left(1+\\frac{${rateLatex}}{${state.periods}}\\right)^{${state.periods}}-1\\approx ${tex(tae, 4, props.language)}`]}
                note={l(say(`Urteko tasa baliokidea: % ${written(tae * 100, 2, props.language)}; nominala baino ${written(tae * 100 - state.rate, 2, props.language)} puntu gehiago.`, `TAE: ${written(tae * 100, 2, props.language)} %; ${written(tae * 100 - state.rate, 2, props.language)} puntos más que el nominal.`, `المعدل السنوي المكافئ ${written(tae * 100, 2, props.language)} %، أي أكثر من الاسمي بـ${written(tae * 100 - state.rate, 2, props.language)} نقطة.`, `APR: ${written(tae * 100, 2, props.language)}%; ${written(tae * 100 - state.rate, 2, props.language)} points above the nominal.`))}
            />
        </Predict>
    )
    // The bars are the gap over the nominal interest, in points: up to 0,8 points for 12 % paid daily
    const baseY = 150
    const scale = 120 / 0.8
    const gapY = baseY - TAE_GAP * scale
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={taeChallenges} extraChallenges={taeExtra} state={state}>
            <Board height={200} label={l(say('Urteko tasa baliokidea interes nominalaren gainetik, ordainketa bakoitzerako', 'Lo que la TAE pasa al interés nominal, para cada forma de pago', 'مقدار زيادة المعدل السنوي المكافئ على الفائدة الاسمية لكل طريقة دفع', 'How far the APR is above the nominal interest, for each way of paying'))}>
                <line x1={30} x2={340} y1={baseY} y2={baseY} stroke={INK} strokeWidth={1.6} />
                <line x1={30} x2={340} y1={gapY} y2={gapY} stroke={SECOND} strokeWidth={1.4} strokeDasharray="5 4" />
                <text x={338} y={gapY - 5} textAnchor="end" fontSize={11} fill={SECOND} direction="ltr">{`+${written(TAE_GAP, 2, props.language)}`}</text>
                {TAE_PERIODS.map((periods, index) => {
                    const gap = (taeOf(state.rate, periods) * 100 - state.rate)
                    const x = 40 + index * 60
                    const current = periods === state.periods
                    return (
                        <g key={periods}>
                            {shown && <rect x={x} y={baseY - Math.max(1, gap * scale)} width={44} height={Math.max(1, gap * scale)} fill={current ? MUSTARD_TINT : STAGE_TINT} stroke={current ? INK : STAGE} strokeWidth={current ? 1.8 : 1} />}
                            <text x={x + 22} y={baseY + 16} textAnchor="middle" fontSize={12} fontWeight={current ? 700 : 400} fill={current ? INK : MUTED} direction="ltr">{String(periods)}</text>
                        </g>
                    )
                })}
                {!shown && <Hidden x={180} y={100} />}
                <Label x={180} y={190} textAnchor="middle" fontSize={12} fill={MUTED}>{l(say('Ordainketak urtean; barra: nominalaren gaineko puntuak', 'Pagos al año; barra: puntos por encima del nominal', 'عدد الدفعات في السنة؛ العمود: النقاط فوق الاسمية', 'Payments a year; bar: points above the nominal'))}</Label>
            </Board>
        </ToolFrame>
    )
}
