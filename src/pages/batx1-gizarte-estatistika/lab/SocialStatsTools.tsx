import { useRef, useState, type PointerEvent } from 'react'
import { Segmented, Stepper, ToolFrame } from '../../../features/unit-v2/lab/LabKit'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import { useLabText } from '../../../features/unit-v2/lab/useLabText'
import { Label } from '../../dbh2-funtzioak-v2/plane'
import { Board, Hidden, PlayButton, Predict, Readout } from '../../dbh3-segidak/lab/LabParts'
import { dec, GREEN, GREEN_TINT, INK, MUTED, PAPER, say, SECOND, SECOND_TINT, STAGE, STAGE_TINT, texDec } from '../../dbh3-segidak/lab/labStyle'
import { setPrediction } from '../../dbh3-segidak/lab/prediction'
import { usePlayback } from '../../dbh4-aplikatuak-proportzionaltasuna/lab/usePlayback'
import { betweenChallenges, betweenExtra, betweenPrediction, betweenTable, initialBetweenState, insideCount, pieces, setBetween, tableHigh, tableLow, tableTotal, type BetweenState } from './between'
import { highOf, initialOgiveState, lowOf, ogiveChallenges, ogiveExtra, ogivePrediction, percentileOf, percentOfValue, polygonOf, setOgive, stepOf, tableOf, type OgiveMode, type OgiveState } from './ogive'
import { barsOf, heightLatex, HOURS, HOURS_END, initialWidthsState, setCut, widthsChallenges, widthsExtra, widthsPrediction, type WidthsState } from './widths'

/* ==========================================================================
   Estatistika unidimentsionala · Batxilergoa 1 · Gizarte Zientziak — the
   three tools of this unit: the cumulative percentage polygon (a line
   dragged to k % or to a value, with the triangles of the interpolation),
   «how many fit?» (two cuts on a histogram, the intervals at the ends
   split in proportion) and different widths (bars drawn with height f,
   then with height f / a). Each asks for a prediction before the result;
   the last two move with ▶. Logic in ogive.ts, between.ts and widths.ts.
   ========================================================================== */

/** Where a pointer is on the 360-wide board */
const boardPoint = (event: PointerEvent<HTMLDivElement>, height: number) => {
    const box = event.currentTarget.getBoundingClientRect()
    return { x: ((event.clientX - box.left) / box.width) * 360, y: ((event.clientY - box.top) / box.height) * height }
}

function useDrag(onMove: (event: PointerEvent<HTMLDivElement>, start: boolean) => void) {
    const dragging = useRef(false)
    return {
        style: { touchAction: 'none' as const, cursor: 'pointer' },
        onPointerDown: (event: PointerEvent<HTMLDivElement>) => { dragging.current = true; event.currentTarget.setPointerCapture(event.pointerId); onMove(event, true) },
        onPointerMove: (event: PointerEvent<HTMLDivElement>) => { if (dragging.current) onMove(event, false) },
        onPointerUp: () => { dragging.current = false },
        onPointerCancel: () => { dragging.current = false }
    }
}

const SHORT_OGIVE = [say('Adina', 'Edad', 'العمر', 'Age'), say('Minutuak', 'Minutos', 'الدقائق', 'Minutes'), say('Gastua', 'Gasto', 'الإنفاق', 'Spending')]
const SHORT_BETWEEN = [say('Piezak', 'Piezas', 'القطع', 'Parts'), say('Itxaronaldia', 'Espera', 'الانتظار', 'Wait')]

/* ---------- L1. The cumulative percentage polygon ---------- */

const OGIVE_HEIGHT = 244
const OG = { left: 44, right: 340, top: 22, bottom: 182 }

export function OgiveTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<OgiveState>(initialOgiveState)
    const shown = state.prediction !== null
    const table = tableOf(state)
    const low = lowOf(table)
    const high = highOf(table)
    const toX = (value: number) => OG.left + ((value - low) / (high - low)) * (OG.right - OG.left)
    const toY = (percent: number) => OG.bottom - (percent / 100) * (OG.bottom - OG.top)
    const points = polygonOf(table)
    const percentile = state.mode === 'percentile'
    const found = percentile ? percentileOf(table, state.k) : percentOfValue(table, state.x)
    const x = percentile ? found.value : state.x
    const k = percentile ? state.k : found.value
    const { bar, before } = found
    const mark = (bar.from + bar.to) / 2
    const drag = useDrag((event) => {
        const point = boardPoint(event, OGIVE_HEIGHT)
        if (state.mode === 'percentile') setState((s) => setOgive(s, { k: ((OG.bottom - point.y) / (OG.bottom - OG.top)) * 100 }))
        else setState((s) => setOgive(s, { x: low + ((point.x - OG.left) / (OG.right - OG.left)) * (high - low) }))
    })
    const step = stepOf(table)
    const controls = (
        <>
            <Segmented<string> label={l(say('Taula', 'Tabla', 'الجدول', 'Table'))} value={String(state.table)} options={SHORT_OGIVE.map((name, index) => ({ value: String(index), label: l(name) }))} onChange={(value) => setState((s) => setOgive(s, { table: Number(value) }))} />
            <Segmented<OgiveMode> label={l(say('Bilatu', 'Buscar', 'ابحث عن', 'Find'))} value={state.mode} options={[{ value: 'percentile', label: l(say('Pertzentila', 'Percentil', 'المئين', 'Percentile')) }, { value: 'value', label: l(say('Balioaren %', '% de un valor', 'نسبة قيمة', '% of a value')) }]} onChange={(mode) => setState((s) => setOgive(s, { mode }))} />
            {percentile
                ? <Stepper label="k %" value={state.k} min={1} max={99} onChange={(value) => setState((s) => setOgive(s, { k: value }))} language={props.language} />
                : <Stepper label="x" value={state.x} min={low + step} max={high - step} step={step} format={(value) => dec(value, props.language, 1)} onChange={(value) => setState((s) => setOgive(s, { x: value }))} language={props.language} />}
        </>
    )
    const H = before
    const h = bar.percent
    const a = bar.to - bar.from
    const latex = percentile
        ? [`P_{${state.k}}=${bar.from}+\\frac{${state.k}-${H}}{${h}}\\cdot ${a}`, `P_{${state.k}}=${texDec(x, props.language, 2)}`]
        : [`k=${H}+\\frac{${texDec(state.x, props.language, 1)}-${bar.from}}{${a}}\\cdot ${h}`, `k=${texDec(k, props.language, 2)}`]
    const prediction = ogivePrediction(state)
    const note = percentile
        ? prediction === '=' ? say('$P_k$ klase-markan bertan dago: kasu honetan bi metodoek gauza bera ematen dute.', '$P_k$ cae justo en la marca de clase: aquí los dos métodos dan lo mismo.', 'يقع $P_k$ تمامًا عند المركز: هنا تعطي الطريقتان الشيء نفسه.', '$P_k$ falls right on the class mark: here both methods give the same.')
            : prediction === '<' ? say('$P_k$ klase-marka baino lehen dago: tartearen lehen erdian.', '$P_k$ queda antes de la marca de clase: en la primera mitad del intervalo.', 'يقع $P_k$ قبل المركز: في النصف الأول من الفئة.', '$P_k$ is before the class mark: in the first half of the interval.')
                : say('$P_k$ klase-marka ondoren dago: tartearen bigarren erdian.', '$P_k$ queda después de la marca de clase: en la segunda mitad del intervalo.', 'يقع $P_k$ بعد المركز: في النصف الثاني من الفئة.', '$P_k$ is after the class mark: in the second half of the interval.')
        : prediction === '=' ? say('Balio hori mediana da: % 50 azpian.', 'Ese valor es la mediana: el 50 % por debajo.', 'تلك القيمة هي الوسيط: 50٪ تحتها.', 'That value is the median: 50% below it.')
            : prediction === '<' ? say('Datuen erdia baino gutxiago dago azpian.', 'Por debajo queda menos de la mitad de los datos.', 'تحتها أقل من نصف البيانات.', 'Less than half of the data lies below it.')
                : say('Datuen erdia baino gehiago dago azpian.', 'Por debajo queda más de la mitad de los datos.', 'تحتها أكثر من نصف البيانات.', 'More than half of the data lies below it.')
    const readout = (
        <Predict
            language={props.language}
            question={percentile
                ? say('Ikusi aurretik: $P_k$ non geratuko da bere tartearen klase-markarekiko?', 'Antes de verlo: ¿dónde quedará $P_k$ respecto a la marca de clase de su intervalo?', 'قبل أن ترى: أين سيقع $P_k$ بالنسبة إلى مركز فئته؟', 'Before you see it: where will $P_k$ be compared with the class mark of its interval?')
                : say('Ikusi aurretik: balio honen azpian datuen erdia baino gutxiago, erdia ala gehiago geratuko da?', 'Antes de verlo: ¿por debajo de este valor quedará menos de la mitad de los datos, la mitad o más?', 'قبل أن ترى: هل سيقع تحت هذه القيمة أقل من نصف البيانات أم النصف أم أكثر؟', 'Before you see it: will less than half of the data, half or more lie below this value?')}
            labels={percentile
                ? { '<': say('Lehenago', 'Antes', 'قبله', 'Before'), '=': say('Markan bertan', 'Justo en la marca', 'عنده تمامًا', 'Right on it'), '>': say('Geroago', 'Después', 'بعده', 'After') }
                : { '<': say('Erdia baino gutxiago', 'Menos de la mitad', 'أقل من النصف', 'Less than half'), '=': say('Erdia', 'La mitad', 'النصف', 'Half'), '>': say('Erdia baino gehiago', 'Más de la mitad', 'أكثر من النصف', 'More than half') }}
            actual={prediction}
            choice={state.prediction}
            tip={say('Poligonoa malkartsuagoa den lekuan, datu gehiago daude: han ehunekoak azkar igotzen dira.', 'Donde el polígono es más empinado hay más datos: allí el porcentaje sube deprisa.', 'حيث يكون المضلّع أشدّ انحدارًا توجد بيانات أكثر: هناك تصعد النسبة بسرعة.', 'Where the polygon is steeper there are more data: the percentage rises fast there.')}
            onChoose={(choice) => setState((s) => setPrediction(s, choice))}
        >
            <Readout latex={latex} note={l(note)} />
        </Predict>
    )
    const corner = { x: toX(bar.from), y: toY(H) }
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={ogiveChallenges} extraChallenges={ogiveExtra} state={state}>
            <div {...drag}>
                <Board height={OGIVE_HEIGHT} label={l(say('Ehuneko metatuen poligonoa', 'Polígono de porcentajes acumulados', 'مضلّع النسب المتجمّعة', 'Cumulative percentage polygon'))}>
                    <rect x={toX(bar.from)} y={OG.top} width={toX(bar.to) - toX(bar.from)} height={OG.bottom - OG.top} fill={STAGE_TINT} opacity={0.45} />
                    {[0, 25, 50, 75, 100].map((percent) => (
                        <g key={percent}>
                            <line x1={OG.left} x2={OG.right} y1={toY(percent)} y2={toY(percent)} stroke={MUTED} strokeWidth={0.6} strokeDasharray="3 4" />
                            <text x={OG.left - 6} y={toY(percent) + 4} textAnchor="end" fontSize={11} fill={MUTED}>{percent}</text>
                        </g>
                    ))}
                    <text x={OG.left - 6} y={12} textAnchor="end" fontSize={11} fontWeight={700} fill={MUTED}>%</text>
                    <line x1={OG.left} x2={OG.left} y1={OG.top - 6} y2={OG.bottom} stroke={INK} strokeWidth={1.6} />
                    <line x1={OG.left} x2={OG.right} y1={OG.bottom} y2={OG.bottom} stroke={INK} strokeWidth={1.6} />
                    {points.map(([value]) => (
                        <g key={value}>
                            <line x1={toX(value)} x2={toX(value)} y1={OG.bottom - 4} y2={OG.bottom + 4} stroke={INK} strokeWidth={1.2} />
                            <text x={toX(value)} y={OG.bottom + 17} textAnchor="middle" fontSize={11} fill={MUTED}>{value}</text>
                        </g>
                    ))}
                    {percentile && <text x={toX(mark)} y={OG.bottom + 32} textAnchor="middle" fontSize={10} fontWeight={700} fill={SECOND}>▲ {dec(mark, props.language, 1)}</text>}
                    <polyline points={points.map(([value, percent]) => `${toX(value)},${toY(percent)}`).join(' ')} fill="none" stroke={STAGE} strokeWidth={2.6} />
                    {points.map(([value, percent]) => <circle key={value} cx={toX(value)} cy={toY(percent)} r={4} fill={PAPER} stroke={STAGE} strokeWidth={2} />)}
                    {shown && (
                        <g>
                            <polygon points={`${corner.x},${corner.y} ${toX(x)},${corner.y} ${toX(x)},${toY(k)}`} fill={GREEN_TINT} stroke={GREEN} strokeWidth={1.4} />
                            <polygon points={`${toX(x)},${corner.y} ${toX(bar.to)},${corner.y} ${toX(bar.to)},${toY(H + h)} ${toX(x)},${toY(k)}`} fill="none" stroke={GREEN} strokeWidth={1} strokeDasharray="3 3" />
                        </g>
                    )}
                    {percentile
                        ? <line x1={OG.left} x2={shown ? toX(x) : OG.right} y1={toY(k)} y2={toY(k)} stroke={SECOND} strokeWidth={2} strokeDasharray="6 4" />
                        : <line x1={toX(x)} x2={toX(x)} y1={OG.bottom} y2={shown ? toY(k) : OG.top} stroke={SECOND} strokeWidth={2} strokeDasharray="6 4" />}
                    {percentile
                        ? <text x={OG.left + 4} y={toY(k) - 5} fontSize={12} fontWeight={700} fill={SECOND}>{state.k}</text>
                        : <text x={toX(x) + 5} y={OG.bottom - 6} fontSize={12} fontWeight={700} fill={SECOND}>{dec(x, props.language, 1)}</text>}
                    {shown && percentile && (
                        <g>
                            <line x1={toX(x)} x2={toX(x)} y1={toY(k)} y2={OG.bottom} stroke={SECOND} strokeWidth={2} strokeDasharray="6 4" />
                            <circle cx={toX(x)} cy={toY(k)} r={5} fill={SECOND} />
                            <text x={toX(x)} y={OG.bottom + 46} textAnchor="middle" fontSize={13} fontWeight={700} fill={SECOND}>{dec(x, props.language, 2)}</text>
                        </g>
                    )}
                    {shown && !percentile && (
                        <g>
                            <line x1={OG.left} x2={toX(x)} y1={toY(k)} y2={toY(k)} stroke={SECOND} strokeWidth={2} strokeDasharray="6 4" />
                            <circle cx={toX(x)} cy={toY(k)} r={5} fill={SECOND} />
                            <text x={OG.left + 4} y={toY(k) - 5} fontSize={13} fontWeight={700} fill={SECOND}>{dec(k, props.language, 2)}</text>
                        </g>
                    )}
                    {!shown && <Hidden x={percentile ? 200 : 90} y={percentile ? OG.bottom + 46 : 60} size={26} />}
                </Board>
            </div>
            <p className="fraction-v2-lab-readout-note" style={{ textAlign: 'center', margin: '4px 0 0', color: MUTED }}>{l(percentile
                ? say('Arrastatu marra gora eta behera. ▲ klase-marka da.', 'Arrastra la raya arriba y abajo. ▲ es la marca de clase.', 'اسحب الخط إلى الأعلى والأسفل. ▲ هو مركز الفئة.', 'Drag the line up and down. ▲ is the class mark.')
                : say('Arrastatu marra ezkerrera eta eskuinera.', 'Arrastra la raya a izquierda y derecha.', 'اسحب الخط يمينًا ويسارًا.', 'Drag the line left and right.'))}</p>
        </ToolFrame>
    )
}

/* ---------- L2. How many fit? ---------- */

const BETWEEN_HEIGHT = 220
const BT = { left: 24, right: 336, base: 170, top: 30 }

export function BetweenTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<BetweenState>(initialBetweenState)
    const shown = state.prediction !== null
    const table = betweenTable(state)
    const min = tableLow(table)
    const max = tableHigh(table)
    const total = tableTotal(table)
    const playback = usePlayback(`${state.table}-${state.low}-${state.high}`, 3000)
    // While ▶ runs, the cuts open from the middle of the table to its ends
    const centre = (min + max) / 2
    const progress = playback.playing && playback.progress !== null ? playback.progress : null
    const low = progress === null ? state.low : centre - (centre - min) * progress
    const high = progress === null ? state.high : centre + (max - centre) * progress
    const toX = (value: number) => BT.left + ((value - min) / (max - min)) * (BT.right - BT.left)
    const densities = table.bars.map((bar) => bar.count / (bar.to - bar.from))
    const unit = (BT.base - BT.top) / Math.max(...densities)
    const parts = pieces(table, low, high)
    const inside = insideCount(table, low, high)
    const drag = useDrag((event) => {
        const point = boardPoint(event, BETWEEN_HEIGHT)
        const value = min + ((point.x - BT.left) / (BT.right - BT.left)) * (max - min)
        setState((s) => (Math.abs(value - s.low) <= Math.abs(value - s.high) ? setBetween(s, { low: value }) : setBetween(s, { high: value })))
    })
    const controls = (
        <>
            <Segmented<string> label={l(say('Taula', 'Tabla', 'الجدول', 'Table'))} value={String(state.table)} options={SHORT_BETWEEN.map((name, index) => ({ value: String(index), label: l(name) }))} onChange={(value) => setState((s) => setBetween(s, { table: Number(value) }))} />
            <Stepper label={l(say('Beheko ebakia', 'Corte inferior', 'القطع الأدنى', 'Lower cut'))} value={state.low} min={min} max={max - 1} onChange={(value) => setState((s) => setBetween(s, { low: value }))} language={props.language} />
            <Stepper label={l(say('Goiko ebakia', 'Corte superior', 'القطع الأعلى', 'Upper cut'))} value={state.high} min={min + 1} max={max} onChange={(value) => setState((s) => setBetween(s, { high: value }))} language={props.language} />
        </>
    )
    const counted = parts.filter((part) => part.count > 0)
    const sum = counted.map((part) => texDec(part.count, props.language, 1)).join('+')
    const latex = [`${sum}${counted.length > 1 ? `=${texDec(inside, props.language, 1)}` : ''}`, `\\frac{${texDec(inside, props.language, 1)}}{${total}}\\cdot 100\\approx ${texDec((inside / total) * 100, props.language, 1)}`]
    const readout = (
        <Predict
            language={props.language}
            question={say('Ikusi aurretik: ebakien artean datuen erdia baino gutxiago, erdia ala gehiago geratuko da?', 'Antes de verlo: ¿entre los cortes quedará menos de la mitad de los datos, la mitad o más?', 'قبل أن ترى: هل سيبقى بين القطعين أقل من نصف البيانات أم النصف أم أكثر؟', 'Before you see it: will less than half of the data, half or more lie between the cuts?')}
            labels={{ '<': say('Erdia baino gutxiago', 'Menos de la mitad', 'أقل من النصف', 'Less than half'), '=': say('Erdia', 'La mitad', 'النصف', 'Half'), '>': say('Erdia baino gehiago', 'Más de la mitad', 'أكثر من النصف', 'More than half') }}
            actual={betweenPrediction(state)}
            choice={state.prediction}
            tip={say('Begiratu barren azalerari, ez haien altuerari bakarrik: azalera da datu kopurua.', 'Mira el área de las barras, no solo su altura: el área es el número de datos.', 'انظر إلى مساحة الأعمدة لا ارتفاعها فقط: المساحة هي عدد البيانات.', 'Look at the area of the bars, not only their height: the area is the number of data.')}
            onChoose={(choice) => setState((s) => setPrediction(s, choice))}
        >
            <Readout latex={latex} note={l(say(`Barruan: ${dec(inside, props.language, 1)} datu, ${total} datutik.`, `Dentro: ${dec(inside, props.language, 1)} de ${total} datos.`, `في الداخل: ${dec(inside, props.language, 1)} من ${total} بيانًا.`, `Inside: ${dec(inside, props.language, 1)} of ${total} data.`))} />
        </Predict>
    )
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={betweenChallenges} extraChallenges={betweenExtra} state={state}>
            <div {...drag}>
                <Board height={BETWEEN_HEIGHT} label={l(table.name)}>
                    {table.bars.map((bar, index) => (
                        <g key={bar.from}>
                            <rect x={toX(bar.from)} y={BT.base - densities[index] * unit} width={toX(bar.to) - toX(bar.from)} height={densities[index] * unit} fill={SECOND_TINT} stroke={SECOND} strokeWidth={1.2} />
                            <text x={(toX(bar.from) + toX(bar.to)) / 2} y={BT.base - densities[index] * unit - 4} textAnchor="middle" fontSize={11} fill={MUTED}>{bar.count}</text>
                        </g>
                    ))}
                    {shown && parts.map((part, index) => part.count > 0 && (
                        <g key={`in-${part.bar.from}`}>
                            <rect x={toX(part.from)} y={BT.base - densities[index] * unit} width={toX(part.to) - toX(part.from)} height={densities[index] * unit} fill={GREEN_TINT} stroke={GREEN} strokeWidth={1.6} />
                            <text x={(toX(part.from) + toX(part.to)) / 2} y={BT.base - 8} textAnchor="middle" fontSize={11} fontWeight={700} fill={GREEN}>{dec(part.count, props.language, 1)}</text>
                        </g>
                    ))}
                    <line x1={BT.left} x2={BT.right} y1={BT.base} y2={BT.base} stroke={INK} strokeWidth={1.6} />
                    {table.bars.map((bar) => bar.from).concat(max).map((value) => (
                        <g key={value}>
                            <line x1={toX(value)} x2={toX(value)} y1={BT.base - 4} y2={BT.base + 4} stroke={INK} strokeWidth={1.2} />
                            <text x={toX(value)} y={BT.base + 16} textAnchor="middle" fontSize={11} fill={MUTED}>{value}</text>
                        </g>
                    ))}
                    {table.mean !== undefined && table.sd !== undefined && <text x={BT.right} y={16} textAnchor="end" fontSize={12} fontWeight={700} fill={INK}>{`x̄ = ${table.mean}   σ = ${table.sd}`}</text>}
                    {[low, high].map((value, index) => (
                        <g key={index}>
                            <line x1={toX(value)} x2={toX(value)} y1={BT.top - 8} y2={BT.base + 22} stroke={GREEN} strokeWidth={2.4} />
                            <circle cx={toX(value)} cy={BT.base + 30} r={9} fill={PAPER} stroke={GREEN} strokeWidth={2} />
                            <text x={toX(value)} y={BT.base + 34} textAnchor="middle" fontSize={10} fontWeight={700} fill={GREEN}>{dec(value, props.language, 0)}</text>
                        </g>
                    ))}
                    {!shown && <Hidden x={(toX(low) + toX(high)) / 2} y={BT.top + 20} size={26} />}
                </Board>
            </div>
            <PlayButton label={l(say('Zabaldu ebakiak erditik', 'Abre los cortes desde el centro', 'افتح القطعين من الوسط', 'Open the cuts from the middle'))} disabled={!shown} playing={playback.playing} onPlay={playback.play} />
            <p className="fraction-v2-lab-readout-note" style={{ textAlign: 'center', margin: '4px 0 0', color: MUTED }}>{l(say('Arrastatu ebaki berdeak ardatzean zehar.', 'Arrastra los cortes verdes por el eje.', 'اسحب القطعين الأخضرين على المحور.', 'Drag the green cuts along the axis.'))}</p>
        </ToolFrame>
    )
}

/* ---------- L3. Different widths ---------- */

const WIDTHS_HEIGHT = 220
const WD = { left: 24, right: 336, base: 176, top: 26 }

export function WidthsTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<WidthsState>(initialWidthsState)
    const shown = state.prediction !== null
    const bars = barsOf(state.cuts)
    const playback = usePlayback(`${state.cuts.join('-')}`, 1800)
    // Before predicting the bars are drawn with height f; afterwards (and while ▶ runs) with height f / a
    const blend = !shown ? 0 : playback.playing && playback.progress !== null ? playback.progress : 1
    const toX = (value: number) => WD.left + (value / HOURS_END) * (WD.right - WD.left)
    const room = WD.base - WD.top
    const wrongUnit = room / Math.max(...bars.map((bar) => bar.count))
    const rightUnit = room / Math.max(...bars.map((bar) => bar.height.numerator / bar.height.denominator))
    const heightOf = (index: number) => {
        const bar = bars[index]
        return bar.count * wrongUnit * (1 - blend) + (bar.height.numerator / bar.height.denominator) * rightUnit * blend
    }
    const drag = useDrag((event) => {
        const point = boardPoint(event, WIDTHS_HEIGHT)
        const value = ((point.x - WD.left) / (WD.right - WD.left)) * HOURS_END
        setState((s) => setCut(s, Math.abs(value - s.cuts[0]) <= Math.abs(value - s.cuts[1]) ? 0 : 1, value))
    })
    const controls = (
        <>
            <Stepper label={l(say('1. muga', '1.er límite', 'الحد 1', '1st limit'))} value={state.cuts[0]} min={1} max={HOURS_END - 2} onChange={(value) => setState((s) => setCut(s, 0, value))} language={props.language} />
            <Stepper label={l(say('2. muga', '2.º límite', 'الحد 2', '2nd limit'))} value={state.cuts[1]} min={2} max={HOURS_END - 1} onChange={(value) => setState((s) => setCut(s, 1, value))} language={props.language} />
        </>
    )
    const latex = bars.map((bar) => `\\frac{${bar.count}}{${bar.width}}${bar.height.denominator === 1 || Number.isInteger((bar.height.numerator / bar.height.denominator) * 100) ? '=' : '\\approx '}${bar.height.denominator === 1 || Number.isInteger((bar.height.numerator / bar.height.denominator) * 100) ? heightLatex(bar.height) : texDec(bar.height.numerator / bar.height.denominator, props.language, 2)}`)
    const prediction = widthsPrediction(state)
    const readout = (
        <Predict
            language={props.language}
            question={say('Ikusi aurretik: ondo marraztuta, altuera $\\frac{f_i}{a_i}$ izanik, hirugarren barra lehena baino baxuagoa, berdina ala altuagoa izango da?', 'Antes de verlo: bien dibujada, con altura $\\frac{f_i}{a_i}$, ¿la tercera barra será más baja, igual o más alta que la primera?', 'قبل أن ترى: إذا رُسم صحيحًا بارتفاع $\\frac{f_i}{a_i}$، فهل يكون العمود الثالث أقصر من الأول أم مساويًا له أم أعلى؟', 'Before you see it: drawn properly, with height $\\frac{f_i}{a_i}$, will the third bar be lower than, as tall as or taller than the first?')}
            labels={{ '<': say('Baxuagoa', 'Más baja', 'أقصر', 'Lower'), '=': say('Berdina', 'Igual', 'مساوٍ', 'The same'), '>': say('Altuagoa', 'Más alta', 'أعلى', 'Taller') }}
            actual={prediction}
            choice={state.prediction}
            tip={say('Barra zabal batek datu asko izan ditzake, baina orduko gutxi.', 'Una barra ancha puede tener muchos datos pero pocos por hora.', 'قد يحوي العمود العريض بيانات كثيرة لكن قليلة لكل ساعة.', 'A wide bar can hold many data but few per hour.')}
            onChoose={(choice) => setState((s) => setPrediction(s, choice))}
        >
            <Readout latex={latex} note={l(prediction === '<'
                ? say('Hirugarren barra lehena baino baxuagoa da: orduko pertsona gutxiago.', 'La tercera barra es más baja que la primera: menos personas por hora.', 'العمود الثالث أقصر من الأول: أشخاص أقل لكل ساعة.', 'The third bar is lower than the first: fewer people per hour.')
                : prediction === '='
                    ? say('Hirugarren eta lehen barrek orduko pertsona kopuru bera dute.', 'La tercera y la primera barra tienen las mismas personas por hora.', 'للعمودين الثالث والأول عدد الأشخاص نفسه لكل ساعة.', 'The third and first bars have the same people per hour.')
                    : say('Hirugarren barra lehena baino altuagoa da: orduko pertsona gehiago.', 'La tercera barra es más alta que la primera: más personas por hora.', 'العمود الثالث أعلى من الأول: أشخاص أكثر لكل ساعة.', 'The third bar is taller than the first: more people per hour.'))} />
        </Predict>
    )
    const hourUnit = rightUnit
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={widthsChallenges} extraChallenges={widthsExtra} state={state}>
            <div {...drag}>
                <Board height={WIDTHS_HEIGHT} label={l(say('50 pertsonaren telebista-orduak', 'Horas de televisión de 50 personas', 'ساعات مشاهدة التلفاز لـ 50 شخصًا', 'Hours of television of 50 people'))}>
                    <Label x={WD.left} y={14} textAnchor="start" fontSize={12} fontWeight={700} fill={blend === 1 ? GREEN : SECOND}>{blend === 1 ? l(say('Altuera = f / a', 'Altura = f / a', 'الارتفاع = f / a', 'Height = f / a')) : l(say('Altuera = f (gaizki)', 'Altura = f (mal)', 'الارتفاع = f (خطأ)', 'Height = f (wrong)'))}</Label>
                    {blend === 1 && HOURS.map((count, hour) => <rect key={hour} x={toX(hour)} y={WD.base - count * hourUnit} width={toX(hour + 1) - toX(hour)} height={count * hourUnit} fill="none" stroke={MUTED} strokeWidth={0.8} strokeDasharray="2 3" />)}
                    {bars.map((bar, index) => (
                        <g key={index}>
                            <rect x={toX(bar.from)} y={WD.base - heightOf(index)} width={toX(bar.to) - toX(bar.from)} height={heightOf(index)} fill={index === 2 ? SECOND_TINT : STAGE_TINT} fillOpacity={0.85} stroke={index === 2 ? SECOND : STAGE} strokeWidth={1.8} />
                            <text x={(toX(bar.from) + toX(bar.to)) / 2} y={WD.base - heightOf(index) - 5} textAnchor="middle" fontSize={12} fontWeight={700} fill={INK}>{`f = ${bar.count}`}</text>
                        </g>
                    ))}
                    <line x1={WD.left} x2={WD.right} y1={WD.base} y2={WD.base} stroke={INK} strokeWidth={1.6} />
                    {[0, ...state.cuts, HOURS_END].map((value) => (
                        <g key={value}>
                            <line x1={toX(value)} x2={toX(value)} y1={WD.base - 4} y2={WD.base + 4} stroke={INK} strokeWidth={1.2} />
                            <text x={toX(value)} y={WD.base + 17} textAnchor="middle" fontSize={12} fontWeight={state.cuts.includes(value) ? 700 : 400} fill={state.cuts.includes(value) ? INK : MUTED}>{value}</text>
                        </g>
                    ))}
                    {state.cuts.map((value) => <polygon key={value} points={`${toX(value)},${WD.base + 22} ${toX(value) - 7},${WD.base + 34} ${toX(value) + 7},${WD.base + 34}`} fill={INK} />)}
                    {!shown && <Hidden x={180} y={WD.base + 40} size={22} />}
                </Board>
            </div>
            <PlayButton label={l(say('Pasatu altuera f / a izatera', 'Pasa a altura f / a', 'انتقل إلى الارتفاع f / a', 'Switch to height f / a'))} disabled={!shown} playing={playback.playing} onPlay={playback.play} />
            <p className="fraction-v2-lab-readout-note" style={{ textAlign: 'center', margin: '4px 0 0', color: MUTED }}>{l(say('Arrastatu ▲ mugak. Marra etenak: orduko pertsonak.', 'Arrastra los límites ▲. La línea de puntos: personas por hora.', 'اسحب الحدّين ▲. الخط المتقطع: الأشخاص لكل ساعة.', 'Drag the ▲ limits. The dotted line: people per hour.'))}</p>
        </ToolFrame>
    )
}
