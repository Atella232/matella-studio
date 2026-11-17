import { useState } from 'react'
import { Segmented, Stepper, ToolFrame } from '../../../features/unit-v2/lab/LabKit'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import { useLabText } from '../../../features/unit-v2/lab/useLabText'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import { Label } from '../../dbh2-funtzioak-v2/plane'
import { Board, Hidden, PlayButton, Predict, Readout } from '../../dbh3-segidak/lab/LabParts'
import { dec, INK, MUTED, PAPER } from '../../dbh3-segidak/lab/labStyle'
import { setPrediction } from '../../dbh3-segidak/lab/prediction'
import { usePlayback } from '../../dbh4-aplikatuak-proportzionaltasuna/lab/usePlayback'
import { phiDensity } from '../../batx2-zientziak-banaketak/normal'
import { say } from '../../batx2-zientziak-probabilitatea/lab/probability'
import { decimalLatex } from '../../batx2-gizarte-banaketak/critical'
import { bellFits, centreOf, initialManyState, MANY_RUNS, MANY_SIZES, manyChallenges, manyExtra, manyPrediction, populationDeviation, setMany, shareWithinTwo, simulate, sizeOf, statisticDeviation, type ManyMode, type ManyState } from './many'
import { balls, deviationOfMeans, initialUrnState, meanOfMeans, meansDeviation, populationMean, populationVariance, sampleCount, setUrn, sums, URN_LIMITS, urnChallenges, urnExtra, URNS, urnPrediction, type UrnState } from './urn'

/* ==========================================================================
   Laginketa · Batxilergoa 2 · Gizarte Zientziak — the two tools of this
   unit: the urn of the means (every sample of size n and its mean) and
   many samples (500 samples of a population far from normal, and the
   bell that their means or proportions make). Logic in urn.ts and
   many.ts.
   ========================================================================== */

const inLanguage = (latex: string[], language: UnitLanguage) => (language === 'ar' ? latex.map((line) => line.replace(/\{,\}/g, '.')) : latex)
const BLUE = '#2f6fdb'
const BLUE_TINT = '#dde7f7'
const RED = '#c4432a'
const GOLD = '#e0a100'
const round = (value: number, digits: number) => Math.round(value * 10 ** digits) / 10 ** digits

/* ---------- M-L1. The urn of the means ---------- */

export function UrnTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<UrnState>(initialUrnState)
    const shown = state.prediction !== null
    const playback = usePlayback(`${state.urn}-${state.n}`, 1600)
    const grow = !shown ? 0 : playback.progress ?? 0
    const values = balls(state)
    const low = Math.min(...values)
    const high = Math.max(...values)
    const left = 34
    const right = 326
    const baseline = 250
    const sx = (value: number) => left + ((value - low) / (high - low)) * (right - left)
    const table = sums(state)
    const total = sampleCount(state)
    const tallest = Math.max(...table.map(([, count]) => count / total))
    const scale = 150 / Math.max(tallest, 1 / values.length + 0.05)
    const barWidth = Math.max(3, Math.min(26, ((right - left) / ((high - low) * state.n + 1)) * 0.8))
    const mean = populationMean(state)
    const controls = (
        <>
            <Segmented<string> label={l(say('Kutxa', 'Urna', 'الصندوق', 'Urn'))} value={String(state.urn)} options={URNS.map((urn, index) => ({ value: String(index), label: `⁦{${urn.join(', ')}}⁩` }))} onChange={(value) => setState((s) => setUrn(s, { urn: Number(value) }))} />
            <Stepper label="n" value={state.n} min={URN_LIMITS.n.min} max={URN_LIMITS.n.max} onChange={(n) => setState((s) => setUrn(s, { n }))} language={props.language} />
        </>
    )
    const latex = [
        `\\mu=${decimalLatex(round(mean, 2))}\\qquad\\sigma=${decimalLatex(round(Math.sqrt(populationVariance(state)), 2))}`,
        `${values.length}^{${state.n}}=${total}`,
        `\\bar{\\bar{x}}=${decimalLatex(round(meanOfMeans(state), 2))}\\qquad\\sigma_{\\bar{x}}=${decimalLatex(round(deviationOfMeans(state), 2))}`,
        `\\frac{\\sigma}{\\sqrt{n}}=${decimalLatex(round(meansDeviation(state), 2))}`
    ]
    const readout = (
        <Predict
            language={props.language}
            question={say('Ikusi aurretik: laginen batez bestekoak bolak baino sakabanatuago, berdin ala gutxiago daude?', 'Antes de verlo: ¿las medias de las muestras están más, igual o menos dispersas que las bolas?', 'قبل أن ترى: هل متوسطات العيّنات أكثر تشتتًا من الكرات أم مثلها أم أقل؟', 'Before you see it: are the sample means more spread than the balls, equally spread or less?')}
            labels={{ '<': say('Gutxiago', 'Menos', 'أقل', 'Less'), '=': say('Berdin', 'Igual', 'مثلها', 'Equally'), '>': say('Gehiago', 'Más', 'أكثر', 'More') }}
            actual={urnPrediction(state)}
            choice={state.prediction}
            tip={say('Batez bestekoan, bola handiak eta txikiak orekatu egiten dira.', 'Al hacer la media, las bolas grandes y las pequeñas se compensan.', 'عند حساب المتوسط تتعادل الكرات الكبيرة والصغيرة.', 'Taking the mean, big and small balls balance each other out.')}
            onChoose={(choice) => setState((s) => setPrediction(s, choice))}
        >
            <Readout latex={inLanguage(latex, props.language)} note={l(say('Batez bestekoen batez bestekoa beti da $\\mu$, eta haien desbideratzea $\\frac{\\sigma}{\\sqrt{n}}$.', 'La media de las medias siempre es $\\mu$, y su desviación es $\\frac{\\sigma}{\\sqrt{n}}$.', 'متوسط المتوسطات دائمًا $\\mu$، وانحرافها $\\frac{\\sigma}{\\sqrt{n}}$.', 'The mean of the means is always $\\mu$, and their deviation is $\\frac{\\sigma}{\\sqrt{n}}$.'))} />
        </Predict>
    )
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={urnChallenges} extraChallenges={urnExtra} state={state}>
            <Board height={290} label={l(say('Kutxa eta lagin guztien batez bestekoak', 'La urna y las medias de todas las muestras', 'الصندوق ومتوسطات كل العيّنات', 'The urn and the means of all the samples'))}>
                {values.map((value, index) => {
                    const cx = 180 + (index - (values.length - 1) / 2) * 34
                    return (
                        <g key={index}>
                            <circle cx={cx} cy={34} r={14} fill={PAPER} stroke={INK} strokeWidth={2} />
                            <text x={cx} y={39} textAnchor="middle" fontSize={14} fontWeight={700} fill={INK}>{value}</text>
                        </g>
                    )
                })}
                {table.map(([sum, count]) => {
                    const h = (count / total) * scale * grow
                    return <rect key={sum} x={sx(sum / state.n) - barWidth / 2} y={baseline - h} width={barWidth} height={h} fill={BLUE} fillOpacity={0.6} />
                })}
                {shown && grow === 1 && <line x1={sx(mean)} x2={sx(mean)} y1={70} y2={baseline} stroke={RED} strokeWidth={2.2} strokeDasharray="5 4" />}
                {shown && grow === 1 && <text x={sx(mean)} y={66} textAnchor="middle" fontSize={13} fontWeight={700} fill={RED}>μ</text>}
                <line x1={left - 10} x2={right + 10} y1={baseline} y2={baseline} stroke={INK} strokeWidth={2} />
                {[...new Set(values)].map((value) => <text key={value} x={sx(value)} y={baseline + 18} textAnchor="middle" fontSize={12} fontWeight={700} fill={MUTED}>{value}</text>)}
                {!shown && <Hidden x={180} y={170} />}
                <Label x={180} y={baseline + 34} textAnchor="middle" fontSize={12} fontWeight={700} fill={INK}>{l(say(`${total} lagin, bakoitza bere batez bestekoan`, `${total} muestras, cada una en su media`, `${total} عيّنة، كل منها عند متوسطها`, `${total} samples, each at its mean`))}</Label>
            </Board>
            <PlayButton label={l(say('Atera lagin guztiak', 'Saca todas las muestras', 'أخرج كل العيّنات', 'Draw every sample'))} disabled={!shown} playing={playback.playing} onPlay={playback.play} />
        </ToolFrame>
    )
}

/* ---------- M-L2. Many samples ---------- */

export function ManyTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<ManyState>(initialManyState)
    const shown = state.prediction !== null
    const playback = usePlayback(`${state.mode}-${state.size}`, 2200)
    const grow = !shown ? 0 : playback.progress ?? 0
    const n = sizeOf(state)
    const isMean = state.mode === 'mean'
    const from = 0
    const to = isMean ? 80 : 1
    const bins = 40
    const width = (to - from) / bins
    const left = 24
    const right = 336
    const baseline = 240
    const sx = (value: number) => left + ((value - from) / (to - from)) * (right - left)
    const values = simulate(state)
    const counts = Array.from({ length: bins }, () => 0)
    for (const value of values) counts[Math.min(bins - 1, Math.floor((value - from) / width + 1e-9))] += 1
    const centre = centreOf(state)
    const deviation = statisticDeviation(state)
    const density = (x: number) => (MANY_RUNS * width * phiDensity((x - centre) / deviation)) / deviation
    const top = Math.max(...counts, density(centre))
    const scale = 180 / top
    const curve = Array.from({ length: 201 }, (_, index) => from + ((to - from) * index) / 200).map((x, index) => `${index ? 'L' : 'M'}${sx(x).toFixed(1)} ${(baseline - density(x) * scale).toFixed(1)}`).join(' ')
    const share = shareWithinTwo(state)
    const modeLabel = (mode: ManyMode) => (mode === 'mean' ? l(say('Gastua (batez bestekoa)', 'Gasto (media)', 'الإنفاق (المتوسط)', 'Spending (mean)')) : l(say('Bai/ez (proportzioa)', 'Sí/no (proporción)', 'نعم/لا (النسبة)', 'Yes/no (proportion)')))
    const controls = (
        <>
            <Segmented<ManyMode> label={l(say('Populazioa', 'Población', 'المجتمع', 'Population'))} value={state.mode} options={(['mean', 'proportion'] as const).map((mode) => ({ value: mode, label: modeLabel(mode) }))} onChange={(mode) => setState((s) => setMany(s, { mode }))} />
            <Stepper label="n" value={state.size} min={0} max={MANY_SIZES.length - 1} format={(index) => String(MANY_SIZES[index])} onChange={(size) => setState((s) => setMany(s, { size }))} language={props.language} />
        </>
    )
    const statistic = isMean ? '\\bar{X}' : '\\hat{p}'
    const latex = [
        isMean ? `\\mu=20\\qquad\\sigma=${decimalLatex(round(populationDeviation(state), 2))}` : `p=0{,}3\\qquad\\sqrt{pq}=${decimalLatex(round(populationDeviation(state), 3))}`,
        `${statistic}\\approx N(${isMean ? '20' : '0{,}3'};\\,${decimalLatex(round(deviation, isMean ? 2 : 3))})`,
        `P(\\mu-2\\sigma_{${statistic}}\\le ${statistic}\\le\\mu+2\\sigma_{${statistic}})\\approx ${decimalLatex(round(share, 2))}`
    ]
    const note = !isMean && !bellFits(state)
        ? say('$np$ 5 baino txikiagoa da: barrak ez dira kanpai bat oraindik.', '$np$ es menor que 5: las barras aún no son una campana.', '$np$ أصغر من 5: الأعمدة ليست جرسًا بعد.', '$np$ is below 5: the bars are not a bell yet.')
        : isMean && n < 25
            ? say('Populazioa ez da normala: $n$ txikiarekin, barrak alde batera makurtzen dira. $n$ handitzean, kanpaia agertzen da.', 'La población no es normal: con $n$ pequeña las barras se tuercen a un lado. Al crecer $n$ aparece la campana.', 'المجتمع ليس طبيعيًّا: مع $n$ صغير تميل الأعمدة إلى جهة. وحين يكبر $n$ يظهر الجرس.', 'The population is not normal: with a small $n$ the bars lean to one side. As $n$ grows the bell appears.')
            : say('Laginak handiak dira: kanpaiak ondo hurbiltzen ditu barrak, eta % 95 inguru dago $\\mu\\pm 2\\sigma$ tartean.', 'Las muestras son grandes: la campana se ajusta a las barras y cerca del 95 % cae en $\\mu\\pm 2\\sigma$.', 'العيّنات كبيرة: يطابق الجرس الأعمدة ويقع نحو 95 % في $\\mu\\pm 2\\sigma$.', 'The samples are large: the bell fits the bars and about 95% falls within $\\mu\\pm 2\\sigma$.')
    const readout = (
        <Predict
            language={props.language}
            question={say('Ikusi aurretik: 500 laginetatik zenbat geratuko dira $\\mu\\pm 2\\sigma$ tartean?', 'Antes de verlo: de las 500 muestras, ¿cuántas caerán en $\\mu\\pm 2\\sigma$?', 'قبل أن ترى: من العيّنات الـ 500، كم ستقع في $\\mu\\pm 2\\sigma$؟', 'Before you see it: of the 500 samples, how many will fall within $\\mu\\pm 2\\sigma$?')}
            labels={{ '<': say('% 90 baino gutxiago', 'Menos del 90 %', 'أقل من 90 %', 'Under 90%'), '=': say('% 95 inguru', 'Cerca del 95 %', 'نحو 95 %', 'About 95%'), '>': say('% 99 baino gehiago', 'Más del 99 %', 'أكثر من 99 %', 'Over 99%') }}
            actual={manyPrediction(state)}
            choice={state.prediction}
            tip={say('Kanpai batean, % 95 inguru dago $\\mu\\pm 2\\sigma$ tartean.', 'En una campana, cerca del 95 % está en $\\mu\\pm 2\\sigma$.', 'في الجرس يقع نحو 95 % في $\\mu\\pm 2\\sigma$.', 'In a bell, about 95% lies within $\\mu\\pm 2\\sigma$.')}
            onChoose={(choice) => setState((s) => setPrediction(s, choice))}
        >
            <Readout latex={inLanguage(latex, props.language)} note={l(note)} />
        </Predict>
    )
    const ticks = isMean ? [0, 20, 40, 60, 80] : [0, 0.3, 0.5, 1]
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={manyChallenges} extraChallenges={manyExtra} state={state}>
            <Board height={290} label={l(say('500 laginen batez bestekoak edo proportzioak', 'Las medias o proporciones de 500 muestras', 'متوسطات أو نسب 500 عيّنة', 'The means or proportions of 500 samples'))}>
                {shown && grow === 1 && <rect x={sx(Math.max(from, centre - 2 * deviation))} y={40} width={Math.max(0, sx(Math.min(to, centre + 2 * deviation)) - sx(Math.max(from, centre - 2 * deviation)))} height={baseline - 40} fill={BLUE_TINT} opacity={0.6} />}
                {counts.map((count, index) => {
                    const h = count * scale * grow
                    return <rect key={index} x={sx(from + index * width) + 0.5} y={baseline - h} width={Math.max(1, sx(width) - sx(0) - 1)} height={h} fill={BLUE} fillOpacity={0.6} />
                })}
                {shown && grow === 1 && bellFits(state) && <path d={curve} fill="none" stroke={RED} strokeWidth={2.2} />}
                <line x1={left} x2={right} y1={baseline} y2={baseline} stroke={INK} strokeWidth={2} />
                <line x1={sx(centre)} x2={sx(centre)} y1={baseline} y2={baseline + 6} stroke={GOLD} strokeWidth={3} />
                {ticks.map((tick) => <text key={tick} x={sx(tick)} y={baseline + 20} textAnchor="middle" fontSize={11} fontWeight={700} fill={MUTED}>{dec(tick, props.language, 1)}</text>)}
                {!shown && <Hidden x={180} y={150} />}
                <Label x={180} y={22} textAnchor="middle" fontSize={12} fontWeight={700} fill={INK}>{l(say(`500 lagin, bakoitzak ${n} pertsona`, `500 muestras de ${n} personas`, `500 عيّنة من ${n} شخصًا`, `500 samples of ${n} people`))}</Label>
            </Board>
            <PlayButton label={l(say('Atera 500 lagin', 'Saca 500 muestras', 'اسحب 500 عيّنة', 'Draw 500 samples'))} disabled={!shown} playing={playback.playing} onPlay={playback.play} />
        </ToolFrame>
    )
}
