import { useState } from 'react'
import { MathText } from '../../../components/MathText'
import { Segmented, Stepper, ToolFrame } from '../../../features/unit-v2/lab/LabKit'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import { useLabText } from '../../../features/unit-v2/lab/useLabText'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import { Label } from '../../dbh2-funtzioak-v2/plane'
import { Board, Hidden, Predict, Readout } from '../../dbh3-segidak/lab/LabParts'
import { dec, GREEN, INK, MUTED, PAPER, SECOND, SECOND_TINT, STAGE, STAGE_TINT } from '../../dbh3-segidak/lab/labStyle'
import { setPrediction } from '../../dbh3-segidak/lab/prediction'
import { say } from '../../batx2-zientziak-probabilitatea/lab/probability'
import { phiDensity } from '../../batx2-zientziak-banaketak/normal'
import { DENSITY_BASES, DENSITY_HEIGHT, DENSITY_SHAPES, densityChallenges, densityExtra, densityPrediction, initialDensityState, isDensity, setDensity, totalArea, windowArea, type DensityShape, type DensityState } from './density'
import { accepted, differencesOf, estimateOf, expectedOf, FIT_SD, fitNormalChallenges, fitNormalExtra, fitNormalPrediction, initialFitNormalState, meanOf, NORMAL_DATA, percentOf, sdOf, setFitNormal, totalOf, type FitNormalState } from './fitNormal'
import { addData, classesOf, emptyHistogram, HIST_FROM, HIST_MEAN, HIST_SD, HIST_TO, HIST_WIDTHS, histogramChallenges, histogramExtra, histogramPrediction, initialHistogramState, normalIn, setHistogram, shareIn, type HistogramState } from './histogram'

/* ==========================================================================
   Normala · Batxilergoa 1 · Gizarte Zientziak — the three tools of this
   unit: from the histogram to the bell, build a density and fit a normal.
   Each asks for a prediction before it shows the result. Logic in
   histogram.ts, density.ts and fitNormal.ts.
   ========================================================================== */

const inLanguage = (latex: string[], language: UnitLanguage) => (language === 'ar' ? latex.map((line) => line.replace(/\{,\}/g, '.')) : latex)
const texNumber = (value: number, digits: number) => String(Math.round(value * 10 ** digits) / 10 ** digits).replace('.', '{,}')

/* ---------- L1. From the histogram to the bell ---------- */

export function HistogramTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<HistogramState>(initialHistogramState)
    const shown = state.prediction !== null
    const classes = classesOf(state)
    const count = state.data.length
    const controls = (
        <>
            <Segmented label={l(say('Klasearen zabalera (cm)', 'Anchura de clase (cm)', 'عرض الفئة (سم)', 'Class width (cm)'))} value={String(state.width)} options={HIST_WIDTHS.map((width) => ({ value: String(width), label: dec(width, props.language, 1) }))} onChange={(value) => setState((s) => setHistogram(s, { width: Number(value) }))} />
            <Stepper label={l(say('Klasea', 'Clase', 'الفئة', 'Class'))} value={state.selected} min={HIST_FROM} max={HIST_TO - state.width} step={state.width} format={(a) => `${dec(a, props.language, 1)}–${dec(a + state.width, props.language, 1)}`} onChange={(selected) => setState((s) => setHistogram(s, { selected }))} language={props.language} />
            <div className="fraction-v2-lab-quick-actions">
                <button type="button" onClick={() => setState((s) => addData(s, 100))}>+100</button>
                <button type="button" onClick={() => setState((s) => addData(s, 1000))}>+1000</button>
                <button type="button" onClick={() => setState((s) => emptyHistogram(s))} disabled={count === 0}>{l(say('Hustu', 'Vaciar', 'إفراغ', 'Empty'))}</button>
            </div>
        </>
    )
    const share = shareIn(state, state.selected)
    const normal = normalIn(state, state.selected) / 10_000
    const latex = [`P(${texNumber(state.selected, 1)}\\le X\\le ${texNumber(state.selected + state.width, 1)})=${normal.toFixed(4).replace('.', '{,}')}`]
    const note = count
        ? say(`${count} datu: % ${dec(100 * share, 'eu', 1)} klase horretan.`, `${count} datos: el ${dec(100 * share, 'es', 1)} % en esa clase.`, `${count} معطى: ${dec(100 * share, 'ar', 1)}٪ في هذه الفئة.`, `${count} data: ${dec(100 * share, 'en', 1)}% in that class.`)
        : say('Gehitu datuak eta alderatu barrak kanpaiarekin.', 'Añade datos y compara las barras con la campana.', 'أضف بيانات وقارن الأعمدة بالجرس.', 'Add data and compare the bars with the bell.')
    const readout = (
        <Predict
            language={props.language}
            question={say('Ikusi aurretik: 160 eta 180 artean datuen zer zati egongo da?', 'Antes de verlo: ¿qué parte de los datos caerá entre 160 y 180?', 'قبل أن ترى: ما جزء البيانات بين 160 و180؟', 'Before you see it: what share of the data will fall between 160 and 180?')}
            labels={{ '<': say('Bi heren baino gutxiago', 'Menos de dos tercios', 'أقل من الثلثين', 'Less than two thirds'), '=': say('Bi heren inguru', 'Unos dos tercios', 'نحو الثلثين', 'About two thirds'), '>': say('Bi heren baino gehiago', 'Más de dos tercios', 'أكثر من الثلثين', 'More than two thirds') }}
            actual={histogramPrediction()}
            choice={state.prediction}
            tip={say('160 eta 180 $\\mu\\pm\\sigma$ dira: % 68,26.', '160 y 180 son $\\mu\\pm\\sigma$: el 68,26 %.', '160 و180 هما $\\mu\\pm\\sigma$: أي 68.26٪.', '160 and 180 are $\\mu\\pm\\sigma$: 68.26%.')}
            onChoose={(choice) => setState((s) => setPrediction(s, choice))}
        >
            <Readout latex={inLanguage(latex, props.language)} note={l(note)} />
        </Predict>
    )
    const left = 20
    const right = 340
    const baseline = 190
    const sx = (x: number) => left + ((x - HIST_FROM) / (HIST_TO - HIST_FROM)) * (right - left)
    const peak = phiDensity(0) / HIST_SD
    const sy = (density: number) => baseline - (density / peak) * 150
    const curve = Array.from({ length: 161 }, (_, index) => HIST_FROM + index * 0.5).map((x, index) => `${index ? 'L' : 'M'}${sx(x).toFixed(1)} ${sy(phiDensity((x - HIST_MEAN) / HIST_SD) / HIST_SD).toFixed(1)}`).join(' ')
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={histogramChallenges} extraChallenges={histogramExtra} state={state}>
            <Board height={232} label={l(say('Altueren histograma, dentsitate gisa, eta kanpaia', 'El histograma de las estaturas como densidad, y la campana', 'المدرج التكراري للأطوال ككثافة، والجرس', 'The histogram of the heights as a density, and the bell'))}>
                {classes.map((a) => {
                    const density = shareIn(state, a) / state.width
                    const on = a === state.selected
                    return (
                        <g key={a} style={{ cursor: 'pointer' }} onClick={() => setState((s) => setHistogram(s, { selected: a }))}>
                            <rect x={sx(a)} y={20} width={sx(a + state.width) - sx(a)} height={baseline - 20} fill="transparent" />
                            <rect x={sx(a)} y={sy(density)} width={sx(a + state.width) - sx(a)} height={baseline - sy(density)} fill={on ? SECOND_TINT : STAGE_TINT} stroke={on ? SECOND : STAGE} strokeWidth={1} />
                        </g>
                    )
                })}
                {shown && <path d={curve} fill="none" stroke={INK} strokeWidth={2.2} />}
                <line x1={left} x2={right} y1={baseline} y2={baseline} stroke={INK} strokeWidth={2} />
                {[140, 160, 170, 180, 200].map((x) => <text key={x} x={sx(x)} y={baseline + 18} textAnchor="middle" fontSize={12} fontWeight={700} fill={MUTED}>{x}</text>)}
                {!shown && <Hidden x={300} y={60} size={20} />}
                <Label x={180} y={226} textAnchor="middle" fontSize={11} fontWeight={700} fill={MUTED}>{l(say(`${count} datu`, `${count} datos`, `${count} معطى`, `${count} data`))}</Label>
            </Board>
        </ToolFrame>
    )
}

/* ---------- L2. Build a density ---------- */

const SHAPE_NAMES: Record<DensityShape, ReturnType<typeof say>> = {
    rectangle: say('Laukizuzena', 'Rectángulo', 'مستطيل', 'Rectangle'),
    up: say('Igotzen', 'Sube', 'صاعدة', 'Rising'),
    down: say('Jaisten', 'Baja', 'هابطة', 'Falling')
}

export function DensityTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<DensityState>(initialDensityState)
    const shown = state.prediction !== null
    const valid = isDensity(state)
    const h = state.height / 100
    const controls = (
        <>
            <Segmented label={l(say('Forma', 'Forma', 'الشكل', 'Shape'))} value={state.shape} options={DENSITY_SHAPES.map((shape) => ({ value: shape, label: l(SHAPE_NAMES[shape]) }))} onChange={(shape) => setState((s) => setDensity(s, { shape }))} />
            <Segmented label={l(say('Oinarria', 'Base', 'القاعدة', 'Base'))} value={String(state.base)} options={DENSITY_BASES.map((base) => ({ value: String(base), label: String(base) }))} onChange={(value) => setState((s) => setDensity(s, { base: Number(value) }))} />
            <Stepper label={l(say('Altuera', 'Altura', 'الارتفاع', 'Height'))} value={state.height} min={DENSITY_HEIGHT.min} max={DENSITY_HEIGHT.max} step={DENSITY_HEIGHT.step} format={(value) => dec(value / 100, props.language, 2)} onChange={(height) => setState((s) => setDensity(s, { height }))} language={props.language} />
            <Stepper label="a" value={state.from} min={0} max={state.base - 1} onChange={(from) => setState((s) => setDensity(s, { from }))} language={props.language} />
            <Stepper label="b" value={state.to} min={state.from + 1} max={state.base} onChange={(to) => setState((s) => setDensity(s, { to }))} language={props.language} />
        </>
    )
    const total = totalArea(state) / 10_000
    const area = windowArea(state) / 10_000
    const totalLatex = state.shape === 'rectangle' ? `${state.base}\\cdot ${texNumber(h, 2)}=${texNumber(total, 4)}` : `\\frac{${state.base}\\cdot ${texNumber(h, 2)}}{2}=${texNumber(total, 4)}`
    const latex = valid ? [totalLatex, `P(${state.from}\\le X\\le ${state.to})=${texNumber(area, 4)}`] : [totalLatex]
    const note = valid
        ? say('Dentsitate bat da: azalera osoa 1. Margotutako azalera probabilitatea da.', 'Es una densidad: área total 1. El área pintada es la probabilidad.', 'إنها كثافة: المساحة الكلية 1. والمساحة الملوّنة هي الاحتمال.', 'It is a density: total area 1. The painted area is the probability.')
        : say('Oraindik ez da dentsitate bat: azalera osoak 1 izan behar du.', 'Todavía no es una densidad: el área total tiene que ser 1.', 'ليست كثافة بعد: يجب أن تكون المساحة الكلية 1.', 'It is not a density yet: the total area must be 1.')
    const readout = (
        <Predict
            language={props.language}
            question={say('Kalkulatu aurretik: azalera osoa 1 baino txikiagoa, berdina ala handiagoa da?', 'Antes de calcular: ¿el área total es menor, igual o mayor que 1?', 'قبل الحساب: هل المساحة الكلية أصغر من 1 أم تساويه أم أكبر؟', 'Before working it out: is the total area less than, equal to or more than 1?')}
            labels={{ '<': say('1 baino txikiagoa', 'Menor que 1', 'أصغر من 1', 'Less than 1'), '=': say('1 justu', 'Justo 1', '1 بالضبط', 'Exactly 1'), '>': say('1 baino handiagoa', 'Mayor que 1', 'أكبر من 1', 'More than 1') }}
            actual={densityPrediction(state)}
            choice={state.prediction}
            tip={say('Laukizuzena: oinarria bider altuera. Triangelua: horren erdia.', 'Rectángulo: base por altura. Triángulo: la mitad.', 'المستطيل: القاعدة في الارتفاع. والمثلث: نصف ذلك.', 'Rectangle: base times height. Triangle: half of that.')}
            onChoose={(choice) => setState((s) => setPrediction(s, choice))}
        >
            <Readout latex={inLanguage(latex, props.language)} note={l(note)} />
        </Predict>
    )
    const left = 30
    const right = 330
    const baseline = 200
    const sx = (x: number) => left + (x / state.base) * (right - left)
    const sy = (value: number) => baseline - value * 150
    const f = (x: number) => (state.shape === 'rectangle' ? h : state.shape === 'up' ? (h * x) / state.base : (h * (state.base - x)) / state.base)
    const outline = `M${sx(0)} ${baseline} L${sx(0)} ${sy(f(0))} L${sx(state.base)} ${sy(f(state.base))} L${sx(state.base)} ${baseline} Z`
    const window = `M${sx(state.from)} ${baseline} L${sx(state.from)} ${sy(f(state.from))} L${sx(state.to)} ${sy(f(state.to))} L${sx(state.to)} ${baseline} Z`
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={densityChallenges} extraChallenges={densityExtra} state={state}>
            <Board height={236} label={l(say('Zati zuzeneko dentsitatea eta margotutako tartea', 'La densidad de trozos rectos y el intervalo pintado', 'الكثافة من قطع مستقيمة والمجال الملوّن', 'The straight-piece density and the painted interval'))}>
                <path d={outline} fill={STAGE_TINT} stroke={STAGE} strokeWidth={2.4} />
                {shown && <path d={window} fill={SECOND_TINT} stroke={SECOND} strokeWidth={1.6} />}
                <line x1={left - 6} x2={right + 6} y1={baseline} y2={baseline} stroke={INK} strokeWidth={2} />
                {Array.from({ length: state.base + 1 }, (_, x) => <text key={x} x={sx(x)} y={baseline + 18} textAnchor="middle" fontSize={12} fontWeight={700} fill={x === state.from || x === state.to ? SECOND : MUTED}>{x}</text>)}
                <text x={left + 4} y={sy(h) - 6} fontSize={12} fontWeight={700} fill={STAGE}>{dec(h, props.language, 2)}</text>
                {shown && <text x={340} y={28} textAnchor="end" fontSize={13} fontWeight={700} fill={valid ? GREEN : SECOND}>{dec(total, props.language, 2)}</text>}
                {!shown && <Hidden x={320} y={30} size={20} />}
            </Board>
        </ToolFrame>
    )
}

/* ---------- L3. Fit a normal ---------- */

const FIT_NAMES = [say('Altuerak', 'Estaturas', 'الأطوال', 'Heights'), say('Itxaronaldiak', 'Esperas', 'الانتظار', 'Waits'), say('Notak', 'Notas', 'العلامات', 'Marks')]

export function FitNormalTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<FitNormalState>(initialFitNormalState)
    const shown = state.prediction !== null
    const data = NORMAL_DATA[state.data]
    const expected = expectedOf(data, state.mean, state.sd)
    const differences = differencesOf(data, state.mean, state.sd)
    const largest = Math.max(...differences)
    const percent = percentOf(data, state.mean, state.sd)
    const ok = accepted(data, state.mean, state.sd)
    const low = data.edges[0] * 10
    const high = data.edges[data.edges.length - 1] * 10
    const controls = (
        <>
            <Segmented label={l(say('Datuak', 'Datos', 'البيانات', 'Data'))} value={String(state.data)} options={FIT_NAMES.map((name, index) => ({ value: String(index), label: l(name) }))} onChange={(value) => setState((s) => setFitNormal(s, { data: Number(value), ...estimateOf(NORMAL_DATA[Number(value)]), mean: NORMAL_DATA[Number(value)].edges[1] * 10 }))} />
            <Stepper label="μ" value={state.mean} min={low} max={high} step={5} format={(value) => dec(value / 10, props.language, 1)} onChange={(mean) => setState((s) => setFitNormal(s, { mean }))} language={props.language} />
            <Stepper label="σ" value={state.sd} min={FIT_SD.min} max={FIT_SD.max} step={FIT_SD.step} format={(value) => dec(value / 10, props.language, 1)} onChange={(sd) => setState((s) => setFitNormal(s, { sd }))} language={props.language} />
            <div className="fraction-v2-lab-quick-actions">
                <button type="button" onClick={() => setState((s) => setFitNormal(s, estimateOf(NORMAL_DATA[s.data])))}><MathText text={'$\\bar{x}$, $s$'} /></button>
            </div>
        </>
    )
    const latex = [`\\bar{x}=${texNumber(meanOf(data), 2)}\\qquad s=${texNumber(sdOf(data), 2)}`, `d_{\\max}\\approx ${texNumber(largest, 2)}`, `\\frac{${texNumber(largest, 2)}}{${totalOf(data)}}\\approx ${texNumber(percent / 100, 4)}`]
    const note = ok
        ? say(`% ${dec(percent, 'eu', 2)} da, % 5 edo gutxiago: doikuntza onartzen da.`, `El ${dec(percent, 'es', 2)} %: no pasa del 5 %, el ajuste se acepta.`, `${dec(percent, 'ar', 2)}٪: لا يتجاوز 5٪، تُقبل المطابقة.`, `${dec(percent, 'en', 2)}%: no more than 5%, the fit is accepted.`)
        : say(`% ${dec(percent, 'eu', 2)} da, % 5 baino gehiago: doikuntza baztertzen da.`, `El ${dec(percent, 'es', 2)} %: pasa del 5 %, el ajuste se rechaza.`, `${dec(percent, 'ar', 2)}٪: يتجاوز 5٪، تُرفض المطابقة.`, `${dec(percent, 'en', 2)}%: more than 5%, the fit is rejected.`)
    const readout = (
        <Predict
            language={props.language}
            question={say('$\\bar{x}$ eta $s$ jarrita, diferentziarik handiena guztizkoaren % 5 baino txikiagoa, berdina ala handiagoa izango da?', 'Con $\\bar{x}$ y $s$, ¿la mayor diferencia será menor, igual o mayor que el 5 % del total?', 'مع $\\bar{x}$ و$s$، هل سيكون أكبر فرق أصغر من 5٪ من الكل أم يساويها أم أكبر؟', 'With $\\bar{x}$ and $s$, will the largest difference be less than, equal to or more than 5% of the total?')}
            labels={{ '<': say('% 5 baino txikiagoa', 'Menor que el 5 %', 'أصغر من 5٪', 'Less than 5%'), '=': say('% 5 justu', 'Justo el 5 %', '5٪ بالضبط', 'Exactly 5%'), '>': say('% 5 baino handiagoa', 'Mayor que el 5 %', 'أكبر من 5٪', 'More than 5%') }}
            actual={fitNormalPrediction(state)}
            choice={state.prediction}
            tip={say('Begiratu barrak: kanpai simetriko baten itxura dute?', 'Mira las barras: ¿parecen una campana simétrica?', 'انظر إلى الأعمدة: هل تشبه جرسًا متماثلًا؟', 'Look at the bars: do they look like a symmetric bell?')}
            onChoose={(choice) => setState((s) => setPrediction(s, choice))}
        >
            <Readout latex={inLanguage(latex, props.language)} note={l(note)} />
        </Predict>
    )
    const left = 30
    const right = 340
    const baseline = 190
    const slot = (right - left) / data.observed.length
    const at = (k: number) => left + slot * (k + 0.5)
    const tallest = Math.max(...data.observed, ...expected)
    const hgt = (value: number) => (value / tallest) * 140
    const bar = Math.min(28, slot * 0.36)
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={fitNormalChallenges} extraChallenges={fitNormalExtra} state={state}>
            <p className="fraction-v2-lab-readout-note" style={{ textAlign: 'center', margin: '0 0 6px' }}>{l(data.title)}</p>
            <Board height={252} label={l(say('Klase bakoitzeko behatuak eta itxaronak', 'Observados y esperados de cada clase', 'المشاهَدة والمتوقعة لكل فئة', 'Observed and expected in each class'))}>
                {data.observed.map((value, k) => {
                    const biggest = shown && Math.abs(differences[k] - largest) < 1e-9
                    return (
                        <g key={k}>
                            <rect x={at(k) - bar - 1} y={baseline - hgt(value)} width={bar} height={hgt(value)} fill={STAGE_TINT} stroke={STAGE} strokeWidth={1.6} />
                            <text x={at(k) - bar / 2 - 1} y={baseline - hgt(value) - 5} textAnchor="middle" fontSize={12} fontWeight={700} fill={STAGE}>{value}</text>
                            {shown && <rect x={at(k) + 1} y={baseline - hgt(expected[k])} width={bar} height={hgt(expected[k])} fill={PAPER} stroke={SECOND} strokeWidth={1.6} strokeDasharray="4 3" />}
                            {shown && <text x={at(k) + bar / 2 + 1} y={baseline - hgt(expected[k]) - 5} textAnchor="middle" fontSize={11} fontWeight={700} fill={SECOND}>{dec(expected[k], props.language, 1)}</text>}
                            {shown && <text x={at(k)} y={baseline + 38} textAnchor="middle" fontSize={12} fontWeight={700} fill={biggest ? (ok ? GREEN : SECOND) : MUTED}>{dec(differences[k], props.language, 1)}</text>}
                        </g>
                    )
                })}
                {data.edges.map((edge, index) => <text key={edge} x={left + slot * index} y={baseline + 18} textAnchor="middle" fontSize={12} fontWeight={700} fill={INK}>{edge}</text>)}
                <line x1={left} x2={right} y1={baseline} y2={baseline} stroke={INK} strokeWidth={2} />
                {!shown && <Hidden x={180} y={baseline + 44} size={20} />}
                {shown && <Label x={180} y={16} textAnchor="middle" fontSize={11} fontWeight={700} fill={MUTED}>{l(say('Beteak: datuak · Etenak: itxaronak · Behean: |dif.|', 'Llenas: datos · Discontinuas: esperados · Abajo: |dif.|', 'الممتلئة: البيانات · المتقطعة: المتوقعة · تحت: |الفرق|', 'Filled: data · Dashed: expected · Below: |diff.|'))}</Label>}
            </Board>
            <p className="fraction-v2-lab-readout-note" style={{ textAlign: 'center' }}>{l(say('Lehen eta azken klaseak irekita: normalak muturrak ere betetzen ditu.', 'La primera y la última clase, abiertas: la normal también llena los extremos.', 'الفئتان الأولى والأخيرة مفتوحتان: يملأ التوزيع الطبيعي الأطراف أيضًا.', 'The first and last classes are open: the normal also fills the ends.'))}</p>
        </ToolFrame>
    )
}
