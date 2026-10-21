import { useState, type ReactNode } from 'react'
import { MathText } from '../../../components/MathText'
import { Segmented, Stepper, ToolFrame } from '../../../features/unit-v2/lab/LabKit'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import { useLabText } from '../../../features/unit-v2/lab/useLabText'
import { fraction, type FractionValue } from '../../../features/unit-v2/math/fraction'
import type { LocalizedText, UnitLanguage } from '../../../features/unit-v2/types'
import { INK, LINE, MUTED, PAPER, SECOND, STAGE, STAGE_TINT } from '../../dbh2-estatistika-v2/palette'
import { DieFace } from '../figures'
import {
    DRAW_K_MAX,
    DRAW_TOTAL_MAX,
    drawChallenges,
    drawDistribution,
    drawOf,
    fairChallenges,
    fairExpectation,
    initialDrawState,
    initialFairState,
    initialRepeatState,
    initialSimulateState,
    initialThreeDiceState,
    initialTotalState,
    LOSS_MAX,
    PRIZE_MAX,
    REPEAT_MAX,
    REPEAT_P,
    repeatChallenges,
    repeatProbabilities,
    setDraw,
    setFair,
    setRepeat,
    setSimulate,
    setThreeDice,
    setTotal,
    SIMULATION_P,
    simulateChallenges,
    simulationCount,
    simulationSuccesses,
    simulationThrows,
    statisticOf,
    statisticRange,
    THROW_COUNTS,
    threeDiceChallenges,
    threeDiceCount,
    totalChallenges,
    totalOf,
    URN_SIZE,
    type DiceStatistic,
    type DrawState,
    type FairState,
    type RepeatEventId,
    type RepeatState,
    type SimulateState,
    type SimulationId,
    type ThreeDiceState,
    type TotalState
} from './labTools'

const say = (eu: string, es: string, ar: string): LocalizedText => ({ eu, es, ar })
const RED = '#d9502e'
const BLUE = '#2f6fdb'
const GREEN = '#267b53'
const GOLD = '#e0a100'

/** A decimal rounded to `digits`, with the comma in LaTeX ({,}) or the point in Arabic */
const texDecimal = (value: number, language: UnitLanguage, digits = 3) => {
    const text = String(Math.round(value * 10 ** digits) / 10 ** digits)
    return language === 'ar' ? text : text.replace('.', '{,}')
}
/** The same for SVG text, with a true minus sign */
const plainDecimal = (value: number, language: UnitLanguage, digits = 3) => {
    const text = String(Math.round(value * 10 ** digits) / 10 ** digits).replace('-', '−')
    return language === 'ar' ? text : text.replace('.', ',')
}
/** A fraction in LaTeX: whole numbers plain, negatives with the sign in front */
const texFraction = (value: FractionValue) => (value.denominator === 1 ? String(value.numerator) : `${value.numerator < 0 ? '-' : ''}\\frac{${Math.abs(value.numerator)}}{${value.denominator}}`)
/** Thousands grouped with a thin space in LaTeX */
const big = (value: number) => String(value).replace(/\B(?=(\d{3})+(?!\d))/g, '\\,')

function Board({ height, label, children }: { height: number; label: string; children: ReactNode }) {
    return <svg viewBox={`0 0 640 ${height}`} direction="ltr" role="img" aria-label={label} style={{ width: '100%', height: 'auto', fontFamily: '"Atkinson Hyperlegible", "Noto Sans Arabic", system-ui, sans-serif' }}>{children}</svg>
}

function Readout({ latex, note }: { latex: string; note: string }) {
    return (
        <>
            {/* Each \quad part is its own formula, so a long readout wraps instead of scrolling */}
            <span className="fraction-v2-lab-readout-main"><MathText text={latex.split(/\\qquad|\\quad/).map((part) => `$${part.trim()}$`).join(' ')} /></span>
            <span className="fraction-v2-lab-readout-note">{note}</span>
        </>
    )
}

function Text({ x, y, children, color = INK, size = 22, anchor = 'middle', weight = 700 }: { x: number; y: number; children: ReactNode; color?: string; size?: number; anchor?: 'start' | 'middle' | 'end'; weight?: number }) {
    return <text x={x} y={y} textAnchor={anchor} fontSize={size} fontWeight={weight} fill={color}>{children}</text>
}

/** A stacked fraction centred on x; y is the bar */
function Frac({ x, y, n, d, size = 20, color = INK }: { x: number; y: number; n: number | string; d: number | string; size?: number; color?: string }) {
    const half = Math.max(String(n).length, String(d).length) * size * 0.32 + 4
    return (
        <g>
            <Text x={x} y={y - 5} size={size} color={color}>{n}</Text>
            <line x1={x - half} x2={x + half} y1={y} y2={y} stroke={color} strokeWidth={2} />
            <Text x={x} y={y + size + 1} size={size} color={color}>{d}</Text>
        </g>
    )
}

function Ball({ x, y, r = 10, color }: { x: number; y: number; r?: number; color: string }) {
    return <circle cx={x} cy={y} r={r} fill={color} stroke={INK} strokeWidth={1.4} />
}

/* ---------- 1. Thousands of throws ---------- */

const simulationNames: Record<SimulationId, LocalizedText> = { coin: say('Txanpona', 'Moneda', 'قطعة نقود'), die: say('Dadoa', 'Dado', 'نرد'), pin: say('Txintxeta', 'Chincheta', 'دبوس') }
const simulationEvents: Record<SimulationId, LocalizedText> = { coin: say('aurpegia', 'cara', 'الوجه'), die: say('6a', 'el 6', 'العدد 6'), pin: say('punta gora', 'punta arriba', 'الرأس إلى الأعلى') }
const simulationTex: Record<SimulationId, string> = { coin: '\\frac{1}{2}', die: '\\frac{1}{6}', pin: '' }

export function SimulateTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<SimulateState>(initialSimulateState)
    const throws = simulationThrows(state)
    const count = simulationCount(state)
    const frequencies = simulationSuccesses[state.experiment].map((successes, index) => successes / THROW_COUNTS[index])
    const x = (index: number) => 90 + index * 64
    const y = (value: number) => 246 - value * 206
    const known = state.experiment !== 'pin'
    const p = SIMULATION_P[state.experiment]
    const controls = (
        <>
            <Segmented label={l(say('Esperimentua', 'Experimento', 'التجربة'))} value={state.experiment} options={(['coin', 'die', 'pin'] as SimulationId[]).map((value) => ({ value, label: l(simulationNames[value]) }))} onChange={(experiment) => setState((s) => setSimulate(s, { experiment }))} />
            <Stepper label={l(say('Jaurtiketak', 'Lanzamientos', 'الرميات'))} value={state.step} min={0} max={THROW_COUNTS.length - 1} format={(index) => String(THROW_COUNTS[index])} onChange={(step) => setState((s) => setSimulate(s, { step }))} language={props.language} />
        </>
    )
    const frequency = texDecimal(count / throws, props.language)
    const latex = known
        ? `f=\\frac{${count}}{${big(throws)}}=${frequency}\\quad P=${simulationTex[state.experiment]}\\approx ${texDecimal(p, props.language)}`
        : `f=\\frac{${count}}{${big(throws)}}=${frequency}\\quad P\\approx ${frequency}`
    const event = l(simulationEvents[state.experiment])
    const note = known
        ? l(say(`${throws} jaurtiketatan, ${count} aldiz ${event}.`, `En ${throws} lanzamientos, ${count} veces ${event}.`, `في ${throws} رمية ظهر ${event} ${count} مرة.`))
        : l(say(`${throws} jaurtiketatan, ${count} aldiz ${event}: maiztasunak probabilitatea estimatzen du.`, `En ${throws} lanzamientos, ${count} veces ${event}: la frecuencia estima la probabilidad.`, `في ${throws} رمية سقط ${count} مرة و${event}: التكرار يقدّر الاحتمال.`))
    return (
        <ToolFrame {...props} controls={controls} readout={<Readout latex={latex} note={note} />} challenges={simulateChallenges} state={state}>
            <Board height={300} label={l(say('Maiztasun erlatiboa jaurtiketen arabera', 'Frecuencia relativa según los lanzamientos', 'التكرار النسبي بحسب الرميات'))}>
                {[0, 0.5, 1].map((value) => (
                    <g key={value}>
                        <line x1={90} x2={620} y1={y(value)} y2={y(value)} stroke={LINE} strokeWidth={1.4} />
                        <Text x={78} y={y(value) + 7} anchor="end" size={20} color={MUTED}>{plainDecimal(value, props.language)}</Text>
                    </g>
                ))}
                {THROW_COUNTS.map((value, index) => <Text key={value} x={x(index)} y={284} size={20} color={index === state.step ? INK : MUTED} weight={index === state.step ? 700 : 400}>{value}</Text>)}
                {known && (
                    <g>
                        <line x1={90} x2={620} y1={y(p)} y2={y(p)} stroke={SECOND} strokeWidth={2.4} strokeDasharray="8 6" />
                        <Text x={620} y={y(p) - 10} anchor="end" size={22} color={SECOND}>{`P = ${state.experiment === 'coin' ? '1/2' : '1/6'}`}</Text>
                    </g>
                )}
                <polyline points={frequencies.slice(0, state.step + 1).map((value, index) => `${x(index)},${y(value)}`).join(' ')} fill="none" stroke={STAGE} strokeWidth={3.4} strokeLinejoin="round" />
                {frequencies.slice(0, state.step + 1).map((value, index) => <circle key={index} cx={x(index)} cy={y(value)} r={index === state.step ? 9 : 5} fill={index === state.step ? SECOND : STAGE} stroke={PAPER} strokeWidth={2} />)}
            </Board>
        </ToolFrame>
    )
}

/* ---------- 2. At least once ---------- */

const repeatNames: Record<RepeatEventId, LocalizedText> = { six: say('6a', 'Un 6', 'العدد 6'), heads: say('Aurpegia', 'Cara', 'وجه'), 'double-six': say('Sei bikoitza', 'Doble 6', 'ستّتان'), ace: say('Batekoa', 'As', 'آس') }

export function RepeatTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<RepeatState>(initialRepeatState)
    const { never, atLeastOnce } = repeatProbabilities(state)
    const p = REPEAT_P[state.event]
    const x = (times: number) => 74 + (times - 1) * 18.4
    const y = (value: number) => 240 - value * 200
    const controls = (
        <>
            <Segmented label={l(say('Gertaera', 'Suceso', 'الحدث'))} value={state.event} options={(['six', 'heads', 'double-six', 'ace'] as RepeatEventId[]).map((value) => ({ value, label: l(repeatNames[value]) }))} onChange={(event) => setState((s) => setRepeat(s, { event }))} />
            <Stepper label={l(say('Errepikapenak', 'Repeticiones', 'التكرارات'))} value={state.times} min={1} max={REPEAT_MAX} onChange={(times) => setState((s) => setRepeat(s, { times }))} language={props.language} />
        </>
    )
    const q = `\\left(\\frac{${p.denominator - p.numerator}}{${p.denominator}}\\right)^{${state.times}}`
    const latex = `1-${q}\\approx ${texDecimal(atLeastOnce, props.language)}\\quad ${q}\\approx ${texDecimal(never, props.language)}`
    const passes = atLeastOnce > 0.5
    const note = l(say(
        `${state.times} aldiz: «gutxienez behin» ${passes ? '1/2 baino handiagoa da' : 'ez da 1/2 baino handiagoa'}.`,
        `${state.times === 1 ? '1 vez' : `${state.times} veces`}: «al menos una» ${passes ? 'pasa de 1/2' : 'no pasa de 1/2'}.`,
        `${state.times} مرة: احتمال «مرة على الأقل» ${passes ? 'أكبر من 1/2' : 'ليس أكبر من 1/2'}.`
    ))
    return (
        <ToolFrame {...props} controls={controls} readout={<Readout latex={latex} note={note} />} challenges={repeatChallenges} state={state}>
            <Board height={300} label={l(say('Gutxienez behin gertatzeko probabilitatea', 'Probabilidad de que ocurra al menos una vez', 'احتمال الوقوع مرة على الأقل'))}>
                {[0, 0.5, 1].map((value) => (
                    <g key={value}>
                        <line x1={64} x2={630} y1={y(value)} y2={y(value)} stroke={value === 0.5 ? SECOND : LINE} strokeWidth={value === 0.5 ? 2.2 : 1.4} strokeDasharray={value === 0.5 ? '8 6' : undefined} />
                        <Text x={54} y={y(value) + 7} anchor="end" size={20} color={value === 0.5 ? SECOND : MUTED}>{plainDecimal(value, props.language)}</Text>
                    </g>
                ))}
                {Array.from({ length: REPEAT_MAX }, (_, index) => {
                    const times = index + 1
                    const value = repeatProbabilities({ ...state, times }).atLeastOnce
                    const fill = times === state.times ? SECOND : times < state.times ? STAGE : LINE
                    return <rect key={times} x={x(times) - 7} y={y(value)} width={14} height={Math.max(0, y(0) - y(value))} rx={3} fill={fill} fillOpacity={times > state.times ? 0.7 : 1} />
                })}
                {[1, 10, 20, 30].map((times) => <Text key={times} x={x(times)} y={270} size={20} color={MUTED} weight={400}>{times}</Text>)}
                <Text x={x(state.times)} y={Math.max(30, y(atLeastOnce) - 12)} size={22} color={SECOND}>{plainDecimal(atLeastOnce, props.language, 2)}</Text>
                <Text x={634} y={270} anchor="end" size={20} color={MUTED} weight={400}>n</Text>
            </Board>
        </ToolFrame>
    )
}

/* ---------- 3. The die chooses the urn ---------- */

export function TotalTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<TotalState>(initialTotalState)
    const { pathI, pathII, red, fromI } = totalOf(state)
    const urns = [
        { name: 'I', y: 80, faces: state.faces, red: state.redI, path: pathI },
        { name: 'II', y: 242, faces: 6 - state.faces, red: state.redII, path: pathII }
    ]
    const controls = (
        <>
            <Stepper label={l(say('I kutxarako aurpegiak', 'Caras para la urna I', 'أوجه الجرّة I'))} value={state.faces} min={1} max={5} onChange={(faces) => setState((s) => setTotal(s, { faces }))} language={props.language} />
            <Stepper label={l(say('Gorriak I kutxan', 'Rojas en la urna I', 'الحمراء في الجرّة I'))} value={state.redI} min={0} max={URN_SIZE} onChange={(redI) => setState((s) => setTotal(s, { redI }))} language={props.language} />
            <Stepper label={l(say('Gorriak II kutxan', 'Rojas en la urna II', 'الحمراء في الجرّة II'))} value={state.redII} min={0} max={URN_SIZE} onChange={(redII) => setState((s) => setTotal(s, { redII }))} language={props.language} />
        </>
    )
    const latex = `\\frac{${pathI}}{30}+\\frac{${pathII}}{30}=${texFraction(red)}${fromI ? `\\quad \\frac{${pathI}}{${pathI + pathII}}=${texFraction(fromI)}` : ''}`
    const note = fromI
        ? l(say('Gorria: bi bideen batura. Gorria atera bada, I kutxatik: haren bidea zati batura.', 'Roja: la suma de los dos caminos. Si ha salido roja, de la urna I: su camino entre la suma.', 'الحمراء: مجموع المسارين. وإذا خرجت حمراء فمن الجرّة I: مسارها على المجموع.'))
        : l(say('Ez dago bola gorririk: probabilitatea 0 da.', 'No hay bolas rojas: la probabilidad es 0.', 'لا توجد كرات حمراء: الاحتمال 0.'))
    return (
        <ToolFrame {...props} controls={controls} readout={<Readout latex={latex} note={note} />} challenges={totalChallenges} state={state}>
            <Board height={330} label={l(say('Dado bat eta bi kutxa', 'Un dado y dos urnas', 'نرد وجرّتان'))}>
                <DieFace x={40} y={161} value={state.faces} size={50} />
                {urns.map((urn, index) => (
                    <g key={urn.name}>
                        <line x1={66} y1={161} x2={150} y2={urn.y} stroke={INK} strokeWidth={2} />
                        <Frac x={96} y={index === 0 ? 98 : 242} n={urn.faces} d={6} size={20} />
                        <rect x={150} y={urn.y - 26} width={140} height={52} rx={12} fill={STAGE_TINT} stroke={INK} strokeWidth={2} />
                        <Text x={166} y={urn.y - 32} size={20} color={MUTED} anchor="start">{urn.name}</Text>
                        {Array.from({ length: URN_SIZE }, (_, ball) => <Ball key={ball} x={170 + ball * 25} y={urn.y} r={10} color={ball < urn.red ? RED : BLUE} />)}
                        {[{ color: RED, n: urn.red, dy: -34 }, { color: BLUE, n: URN_SIZE - urn.red, dy: 34 }].map((branch) => {
                            const leafY = urn.y + branch.dy
                            const isRed = branch.color === RED
                            return (
                                <g key={branch.color}>
                                    <line x1={290} y1={urn.y} x2={392} y2={leafY} stroke={isRed ? SECOND : INK} strokeWidth={isRed ? 3 : 1.8} />
                                    <Frac x={350} y={leafY + (branch.dy < 0 ? -8 : 12)} n={branch.n} d={URN_SIZE} size={18} />
                                    <Ball x={406} y={leafY} r={12} color={branch.color} />
                                    {isRed && <Text x={430} y={leafY + 8} anchor="start" size={22} color={SECOND}>{`${urn.path}/30`}</Text>}
                                </g>
                            )
                        })}
                    </g>
                ))}
                <Text x={630} y={170} anchor="end" size={26} color={SECOND}>{`${pathI + pathII}/30`}</Text>
            </Board>
        </ToolFrame>
    )
}

/* ---------- 4. Drawing k at once ---------- */

export function DrawTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<DrawState>(initialDrawState)
    const { favourable, possible, probability } = drawOf(state)
    const distribution = drawDistribution(state)
    const highest = Math.max(...distribution.map((value) => value.numerator / value.denominator))
    const barWidth = Math.min(60, 250 / (state.k + 1) - 10)
    const barX = (j: number) => 380 + (j + 0.5) * (240 / (state.k + 1))
    /** Under the last row of balls */
    const labelY = 50 + (Math.ceil(state.total / 10) - 1) * 34 + 52
    const controls = (
        <>
            <Stepper label={l(say('Guztira (N)', 'En total (N)', 'المجموع (N)'))} value={state.total} min={2} max={DRAW_TOTAL_MAX} onChange={(total) => setState((s) => setDraw(s, { total }))} language={props.language} />
            <Stepper label={l(say('Onak (g)', 'Buenas (g)', 'الجيدة (g)'))} value={state.good} min={0} max={state.total} onChange={(good) => setState((s) => setDraw(s, { good }))} language={props.language} />
            <Stepper label={l(say('Ateratakoak (k)', 'Sacadas (k)', 'المسحوبة (k)'))} value={state.k} min={1} max={Math.min(DRAW_K_MAX, state.total)} onChange={(k) => setState((s) => setDraw(s, { k }))} language={props.language} />
            <Stepper label={l(say('Onak ateratakoen artean (j)', 'Buenas entre las sacadas (j)', 'الجيدة بين المسحوبة (j)'))} value={state.j} min={0} max={state.k} onChange={(j) => setState((s) => setDraw(s, { j }))} language={props.language} />
        </>
    )
    const latex = `\\frac{\\text{C}_{${state.good},${state.j}}\\cdot\\text{C}_{${state.total - state.good},${state.k - state.j}}}{\\text{C}_{${state.total},${state.k}}}\\quad =\\frac{${big(favourable)}}{${big(possible)}}${favourable === 0 ? '' : `=${texFraction(probability)}`}`
    const note = l(say(
        `${state.total}tik ${state.k} batera; justu ${state.j} on (${state.good} on daude).`,
        `${state.k} de ${state.total} a la vez; exactamente ${state.j} buenas (hay ${state.good}).`,
        `${state.k} من ${state.total} معًا؛ ${state.j} جيدة بالضبط (يوجد ${state.good}).`
    ))
    return (
        <ToolFrame {...props} controls={controls} readout={<Readout latex={latex} note={note} />} challenges={drawChallenges} state={state}>
            <Board height={300} label={l(say('Bolak eta j bakoitzaren probabilitatea', 'Las bolas y la probabilidad de cada j', 'الكرات واحتمال كل j'))}>
                {Array.from({ length: state.total }, (_, index) => <Ball key={index} x={40 + (index % 10) * 30} y={50 + Math.floor(index / 10) * 34} r={12} color={index < state.good ? GOLD : PAPER} />)}
                <Text x={175} y={labelY} size={22} color={GOLD}>{`g = ${state.good}`}</Text>
                <Text x={175} y={labelY + 32} size={22} color={MUTED}>{`N = ${state.total}`}</Text>
                <line x1={360} x2={630} y1={250} y2={250} stroke={INK} strokeWidth={2} />
                {distribution.map((value, j) => {
                    const share = highest === 0 ? 0 : value.numerator / value.denominator / highest
                    return (
                        <g key={j}>
                            <rect x={barX(j) - barWidth / 2} y={250 - share * 200} width={barWidth} height={share * 200} rx={4} fill={j === state.j ? SECOND : STAGE} fillOpacity={j === state.j ? 1 : 0.55} />
                            <Text x={barX(j)} y={278} size={20} color={j === state.j ? SECOND : MUTED}>{j}</Text>
                        </g>
                    )
                })}
                <Text x={638} y={278} anchor="end" size={20} color={MUTED} weight={400}>j</Text>
            </Board>
        </ToolFrame>
    )
}

/* ---------- 5. Three dice ---------- */

const statisticNames: Record<DiceStatistic, LocalizedText> = { max: say('Handiena', 'Mayor', 'الأكبر'), min: say('Txikiena', 'Menor', 'الأصغر'), median: say('Erdikoa', 'Mediana', 'الوسيط'), sum: say('Batura', 'Suma', 'المجموع') }

export function ThreeDiceTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<ThreeDiceState>(initialThreeDiceState)
    const count = threeDiceCount(state)
    const [min, max] = statisticRange(state.statistic)
    const cell = 14
    const controls = (
        <>
            <Segmented label={l(say('Zer begiratu', 'Qué mirar', 'ماذا ننظر'))} value={state.statistic} options={(['max', 'min', 'median', 'sum'] as DiceStatistic[]).map((value) => ({ value, label: l(statisticNames[value]) }))} onChange={(statistic) => setState((s) => setThreeDice(s, { statistic }))} />
            <Stepper label={l(say('Balioa', 'Valor', 'القيمة'))} value={state.value} min={min} max={max} onChange={(value) => setState((s) => setThreeDice(s, { value }))} language={props.language} />
        </>
    )
    const reduced = fraction(count, 216)
    const latex = `P=\\frac{${count}}{216}${count === 0 ? '=0' : reduced.denominator === 216 ? '' : `=${texFraction(reduced)}`}${count === 0 ? '' : `\\quad \\approx ${texDecimal(count / 216, props.language)}`}`
    const note = l(say(`${l(statisticNames[state.statistic])} = ${state.value}: 216tik ${count} kasu.`, `${l(statisticNames[state.statistic])} = ${state.value}: ${count} casos de 216.`, `${l(statisticNames[state.statistic])} = ${state.value}: ${count} حالة من 216.`))
    return (
        <ToolFrame {...props} controls={controls} readout={<Readout latex={latex} note={note} />} challenges={threeDiceChallenges} state={state}>
            <Board height={300} label={l(say('Hiru daduren 216 kasuak', 'Los 216 casos de tres dados', 'الحالات الـ216 لثلاثة نرود'))}>
                {[1, 2, 3, 4, 5, 6].map((third) => {
                    const gx = 64 + ((third - 1) % 3) * 160
                    const gy = 32 + Math.floor((third - 1) / 3) * 136
                    return (
                        <g key={third}>
                            <DieFace x={gx - 30} y={gy + 22} value={third} size={30} />
                            {[1, 2, 3, 4, 5, 6].flatMap((a) => [1, 2, 3, 4, 5, 6].map((b) => {
                                const on = statisticOf(state.statistic, [a, b, third]) === state.value
                                return <rect key={`${a}-${b}`} x={gx + (b - 1) * (cell + 2)} y={gy + (a - 1) * (cell + 2)} width={cell} height={cell} rx={2} fill={on ? SECOND : PAPER} stroke={on ? SECOND : LINE} strokeWidth={1.2} />
                            }))}
                        </g>
                    )
                })}
                <Text x={600} y={130} size={40} color={SECOND}>{count}</Text>
                <line x1={556} x2={644} y1={146} y2={146} stroke={INK} strokeWidth={2} />
                <Text x={600} y={184} size={30} color={INK}>216</Text>
            </Board>
        </ToolFrame>
    )
}

/* ---------- 6. A fair game ---------- */

export function FairTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<FairState>(initialFairState)
    const expectation = fairExpectation(state)
    const value = expectation.numerator / expectation.denominator
    const x = (gain: number) => 320 + Math.max(-6, Math.min(6, gain)) * 42
    const controls = (
        <>
            <Stepper label={l(say('Aurpegi irabazleak', 'Caras ganadoras', 'الأوجه الرابحة'))} value={state.winning} min={1} max={5} onChange={(winning) => setState((s) => setFair(s, { winning }))} language={props.language} />
            <Stepper label={l(say('Saria (€)', 'Premio (€)', 'الجائزة (€)'))} value={state.prize} min={1} max={PRIZE_MAX} onChange={(prize) => setState((s) => setFair(s, { prize }))} language={props.language} />
            <Stepper label={l(say('Galera (€)', 'Pérdida (€)', 'الخسارة (€)'))} value={state.loss} min={1} max={LOSS_MAX} onChange={(loss) => setState((s) => setFair(s, { loss }))} language={props.language} />
        </>
    )
    const latex = `E=${state.prize}\\cdot\\frac{${state.winning}}{6}-${state.loss}\\cdot\\frac{${6 - state.winning}}{6}\\quad =${texFraction(expectation)}`
    const note = value === 0
        ? l(say('Itxaropena 0: jokoa bidezkoa da.', 'Esperanza 0: el juego es equitativo.', 'الأمل 0: اللعبة عادلة.'))
        : value > 0
            ? l(say('Itxaropen positiboa: jokalariaren alde.', 'Esperanza positiva: a favor del jugador.', 'أمل موجب: لصالح اللاعب.'))
            : l(say('Itxaropen negatiboa: jokalariaren kontra.', 'Esperanza negativa: en contra del jugador.', 'أمل سالب: ضد اللاعب.'))
    return (
        <ToolFrame {...props} controls={controls} readout={<Readout latex={latex} note={note} />} challenges={fairChallenges} state={state}>
            <Board height={300} label={l(say('Dadoaren jokoa eta itxaropena', 'El juego del dado y la esperanza', 'لعبة النرد والأمل الرياضي'))}>
                {[1, 2, 3, 4, 5, 6].map((face) => {
                    const win = face <= state.winning
                    const cx = 60 + (face - 1) * 104
                    return (
                        <g key={face}>
                            <DieFace x={cx} y={60} value={face} size={66} fill={win ? '#d6eddf' : '#f6d5cc'} />
                            <Text x={cx} y={130} size={24} color={win ? GREEN : SECOND}>{win ? `+${state.prize} €` : `−${state.loss} €`}</Text>
                        </g>
                    )
                })}
                <line x1={x(-6)} x2={x(6)} y1={220} y2={220} stroke={INK} strokeWidth={2.4} />
                {[-6, -3, 0, 3, 6].map((tick) => (
                    <g key={tick}>
                        <line x1={x(tick)} x2={x(tick)} y1={212} y2={228} stroke={INK} strokeWidth={2} />
                        <Text x={x(tick)} y={256} size={20} color={tick === 0 ? INK : MUTED} weight={tick === 0 ? 700 : 400}>{tick > 0 ? `+${tick}` : tick < 0 ? `−${-tick}` : '0'}</Text>
                    </g>
                ))}
                <path d={`M ${x(value)} 212 l -12 -22 l 24 0 z`} fill={value === 0 ? GREEN : value > 0 ? STAGE : SECOND} />
                <Text x={x(value)} y={180} size={22} color={value === 0 ? GREEN : value > 0 ? STAGE : SECOND}>{`E = ${plainDecimal(value, props.language, 2)} €`}</Text>
            </Board>
        </ToolFrame>
    )
}
