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
import { binomialPmfDecimal } from '../../batx2-zientziak-banaketak/binomial'
import { phiDensity } from '../../batx2-zientziak-banaketak/normal'
import { say } from '../../batx2-zientziak-probabilitatea/lab/probability'
import { decimalLatex } from '../critical'
import { BAND_LEVELS, BAND_LIMITS, bandChallenges, bandExtra, bandPrediction, initialBandState, intervalLatex, intervalOf, radiusOf, setBand, zOf, type BandState } from './band'
import { approximable, initialSurveysState, meanOf, setSurveys, simulate, SURVEYS_LIMITS, SURVEYS_RUNS, surveysChallenges, surveysExtra, surveysPrediction, varianceOf, withinOneSd, type SurveysState } from './surveys'

/* ==========================================================================
   Banaketak · Batxilergoa 2 · Gizarte Zientziak — the two tools of this
   unit: a thousand polls (the binomial built by repeating a poll, with the
   bell when it fits) and the band of k % (the characteristic interval).
   Logic in surveys.ts and band.ts.
   ========================================================================== */

const inLanguage = (latex: string[], language: UnitLanguage) => (language === 'ar' ? latex.map((line) => line.replace(/\{,\}/g, '.')) : latex)
const BLUE = '#2f6fdb'
const BLUE_TINT = '#dde7f7'
const RED = '#c4432a'

/* ---------- B-L1. A thousand polls ---------- */

export function SurveysTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<SurveysState>(initialSurveysState)
    const shown = state.prediction !== null
    const playback = usePlayback(`${state.n}-${state.p}`, 2200)
    const grow = !shown ? 0 : playback.progress ?? 0
    const counts = simulate(state)
    const left = 24
    const right = 340
    const baseline = 250
    const step = (right - left) / (state.n + 1)
    const exact = Array.from({ length: state.n + 1 }, (_, k) => binomialPmfDecimal(state.n, state.p / 10, k))
    const top = Math.max(...exact, ...counts.map((count) => count / SURVEYS_RUNS))
    const scale = 200 / top
    const mean = meanOf(state)
    const sd = Math.sqrt(varianceOf(state))
    const x = (k: number) => left + step * (k + 0.5)
    const curve = Array.from({ length: 121 }, (_, index) => -0.5 + ((state.n + 1) * index) / 120).map((k, index) => `${index ? 'L' : 'M'}${x(k).toFixed(1)} ${(baseline - (phiDensity((k - mean) / sd) / sd) * scale).toFixed(1)}`).join(' ')
    const controls = (
        <>
            <Stepper label="n" value={state.n} min={SURVEYS_LIMITS.n.min} max={SURVEYS_LIMITS.n.max} onChange={(n) => setState((s) => setSurveys(s, { n }))} language={props.language} />
            <Stepper label="p" value={state.p} min={SURVEYS_LIMITS.p.min} max={SURVEYS_LIMITS.p.max} format={(value) => dec(value / 10, props.language, 1)} onChange={(p) => setState((s) => setSurveys(s, { p }))} language={props.language} />
        </>
    )
    const latex = [`\\mu=np=${decimalLatex(mean)}`, `\\sigma=\\sqrt{npq}=${decimalLatex(Math.round(sd * 100) / 100)}`, `P(\\mu-\\sigma\\le X\\le\\mu+\\sigma)\\approx ${decimalLatex(Math.round(withinOneSd(state) * 100) / 100)}`]
    const note = approximable(state)
        ? say('$np\\ge 5$ eta $nq\\ge 5$: barrek kanpai itxura dute, eta normalak ondo hurbiltzen ditu.', '$np\\ge 5$ y $nq\\ge 5$: las barras tienen forma de campana y la normal las aproxima bien.', '$np\\ge 5$ و$nq\\ge 5$: للأعمدة شكل الجرس ويقرّبها الطبيعي جيدًا.', '$np\\ge 5$ and $nq\\ge 5$: the bars are bell-shaped and the normal approximates them well.')
        : say('$np$ edo $nq$ 5 baino txikiagoa da: barrak alde batera makurtzen dira, eta normalak ez ditu ondo hurbiltzen.', '$np$ o $nq$ es menor que 5: las barras se tuercen a un lado y la normal no las aproxima bien.', '$np$ أو $nq$ أصغر من 5: تميل الأعمدة إلى جهة ولا يقرّبها الطبيعي جيدًا.', '$np$ or $nq$ is below 5: the bars lean to one side and the normal does not approximate them well.')
    const readout = (
        <Predict
            language={props.language}
            question={say('Ikusi aurretik: inkesten zer zati geratuko da $\\mu\\pm\\sigma$ tartean?', 'Antes de verlo: ¿qué parte de las encuestas caerá en $\\mu\\pm\\sigma$?', 'قبل أن ترى: أي جزء من الاستطلاعات سيقع في $\\mu\\pm\\sigma$؟', 'Before you see it: what share of the polls will fall within $\\mu\\pm\\sigma$?')}
            labels={{ '<': say('Erdia baino gutxiago', 'Menos de la mitad', 'أقل من النصف', 'Less than half'), '=': say('Bi heren inguru', 'Unos dos tercios', 'نحو الثلثين', 'About two thirds'), '>': say('Ia denak', 'Casi todas', 'كلها تقريبًا', 'Almost all') }}
            actual={surveysPrediction(state)}
            choice={state.prediction}
            tip={say('Kanpai batean, % 68 inguru dago $\\mu\\pm\\sigma$ tartean.', 'En una campana, cerca del 68 % está en $\\mu\\pm\\sigma$.', 'في الجرس يقع نحو 68 % في $\\mu\\pm\\sigma$.', 'In a bell, about 68% lies within $\\mu\\pm\\sigma$.')}
            onChoose={(choice) => setState((s) => setPrediction(s, choice))}
        >
            <Readout latex={inLanguage(latex, props.language)} note={l(note)} />
        </Predict>
    )
    const labelEvery = Math.ceil((state.n + 1) / 10)
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={surveysChallenges} extraChallenges={surveysExtra} state={state}>
            <Board height={300} label={l(say('Mila inkesta', 'Mil encuestas', 'ألف استطلاع', 'A thousand polls'))}>
                {shown && <rect x={x(mean - sd) } y={30} width={Math.max(0, x(mean + sd) - x(mean - sd))} height={baseline - 30} fill={BLUE_TINT} opacity={0.5} />}
                {exact.map((value, k) => <rect key={`e${k}`} x={x(k) - step * 0.4} y={baseline - value * scale} width={step * 0.8} height={value * scale} fill="none" stroke={MUTED} strokeWidth={1} strokeDasharray="3 2" />)}
                {counts.map((count, k) => {
                    const h = (count / SURVEYS_RUNS) * scale * grow
                    return <rect key={`c${k}`} x={x(k) - step * 0.35} y={baseline - h} width={step * 0.7} height={h} fill={BLUE} fillOpacity={0.55} />
                })}
                {shown && grow === 1 && approximable(state) && <path d={curve} fill="none" stroke={RED} strokeWidth={2.4} />}
                <line x1={left} x2={right} y1={baseline} y2={baseline} stroke={INK} strokeWidth={2} />
                {Array.from({ length: state.n + 1 }, (_, k) => k).filter((k) => k % labelEvery === 0).map((k) => <text key={k} x={x(k)} y={baseline + 18} textAnchor="middle" fontSize={11} fontWeight={700} fill={MUTED}>{k}</text>)}
                {!shown && <Hidden x={180} y={140} />}
                <rect x={8} y={8} width={14} height={10} fill={BLUE} fillOpacity={0.55} />
                <Label x={28} y={17} textAnchor="start" fontSize={12} fontWeight={700} fill={INK}>{l(say(`${SURVEYS_RUNS} inkesta`, `${SURVEYS_RUNS} encuestas`, `${SURVEYS_RUNS} استطلاع`, `${SURVEYS_RUNS} polls`))}</Label>
                <rect x={180} y={8} width={14} height={10} fill={PAPER} stroke={MUTED} strokeDasharray="3 2" />
                <text x={200} y={17} fontSize={12} fontWeight={700} fill={INK} direction="ltr">B(n; p)</text>
            </Board>
            <PlayButton label={l(say('Egin 1000 inkesta', 'Haz 1000 encuestas', 'أجرِ 1000 استطلاع', 'Run 1000 polls'))} disabled={!shown} playing={playback.playing} onPlay={playback.play} />
        </ToolFrame>
    )
}

/* ---------- B-L2. The band of k % ---------- */

export function BandTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<BandState>(initialBandState)
    const shown = state.prediction !== null
    const z = zOf(state)
    const [low, high] = intervalOf(state)
    // The axis always shows μ ± 3,2σ, so the bell keeps its shape and the band its width in σ
    const left = 20
    const right = 340
    const baseline = 220
    const from = state.mean - 3.2 * state.sd
    const to = state.mean + 3.2 * state.sd
    const sx = (value: number) => left + ((value - from) / (to - from)) * (right - left)
    const sy = (value: number) => baseline - (phiDensity((value - state.mean) / state.sd) / phiDensity(0)) * 170
    const trace = (a: number, b: number, steps = 80) => Array.from({ length: steps + 1 }, (_, index) => a + ((b - a) * index) / steps).map((value, index) => `${index ? 'L' : 'M'}${sx(value).toFixed(1)} ${sy(value).toFixed(1)}`).join(' ')
    const area = (a: number, b: number) => `${trace(a, b)} L${sx(b).toFixed(1)} ${baseline} L${sx(a).toFixed(1)} ${baseline} Z`
    const levelLabel = (value: number) => (props.language === 'eu' ? `%\u00a0${value}` : props.language === 'en' ? `${value}%` : props.language === 'ar' ? `${value}٪` : `${value}\u00a0%`)
    const controls = (
        <>
            <Stepper label="μ" value={state.mean} min={BAND_LIMITS.mean.min} max={BAND_LIMITS.mean.max} step={BAND_LIMITS.mean.step} onChange={(mean) => setState((s) => setBand(s, { mean }))} language={props.language} />
            <Stepper label="σ" value={state.sd} min={BAND_LIMITS.sd.min} max={BAND_LIMITS.sd.max} step={BAND_LIMITS.sd.step} onChange={(sd) => setState((s) => setBand(s, { sd }))} language={props.language} />
            <Segmented<string> label={l(say('Maila', 'Nivel', 'المستوى', 'Level'))} value={String(state.level)} options={BAND_LEVELS.map((value, index) => ({ value: String(index), label: levelLabel(value) }))} onChange={(value) => setState((s) => setBand(s, { level: Number(value) }))} />
        </>
    )
    const latex = [`z_{\\alpha/2}=${decimalLatex(z)}`, `${decimalLatex(z)}\\cdot ${state.sd}=${decimalLatex(radiusOf(state))}`, `${intervalLatex(state)}`]
    const readout = (
        <Predict
            language={props.language}
            question={say('Ikusi aurretik: zerrenda $\\mu\\pm 2\\sigma$ baino estuagoa, berdina ala zabalagoa da?', 'Antes de verlo: ¿la franja es más estrecha, igual o más ancha que $\\mu\\pm 2\\sigma$?', 'قبل أن ترى: هل الشريط أضيق من $\\mu\\pm 2\\sigma$ أم يساويه أم أعرض؟', 'Before you see it: is the band narrower than, about equal to or wider than $\\mu\\pm 2\\sigma$?')}
            labels={{ '<': say('Estuagoa', 'Más estrecha', 'أضيق', 'Narrower'), '=': say('Berdina, gutxi gorabehera', 'Casi igual', 'تقريبًا مثله', 'About equal'), '>': say('Zabalagoa', 'Más ancha', 'أعرض', 'Wider') }}
            actual={bandPrediction(state)}
            choice={state.prediction}
            tip={say('% 95 probabilitatea $\\mu\\pm 2\\sigma$ ingurukoa da.', 'El 95 % es más o menos $\\mu\\pm 2\\sigma$.', '95 % هي تقريبًا $\\mu\\pm 2\\sigma$.', '95% is roughly $\\mu\\pm 2\\sigma$.')}
            onChoose={(choice) => setState((s) => setPrediction(s, choice))}
        >
            <Readout latex={inLanguage(latex, props.language)} note={l(say('Maila handiagoa, zerrenda zabalagoa; $\\sigma$ bikoiztean, erradioa ere bikoizten da.', 'A más nivel, franja más ancha; al duplicar $\\sigma$, el radio también se duplica.', 'كلما ارتفع المستوى اتسع الشريط؛ وعند مضاعفة $\\sigma$ يتضاعف نصف القطر.', 'The higher the level, the wider the band; doubling $\\sigma$ doubles the radius too.'))} />
        </Predict>
    )
    const fmt = (value: number) => dec(value, props.language, 3)
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={bandChallenges} extraChallenges={bandExtra} state={state}>
            <Board height={280} label={l(say('Kanpaia eta haren zerrenda', 'La campana y su franja', 'الجرس وشريطه', 'The bell and its band'))}>
                {shown && <path d={area(low, high)} fill={BLUE_TINT} />}
                <path d={trace(from, to, 140)} fill="none" stroke={INK} strokeWidth={2.4} />
                <line x1={left} x2={right} y1={baseline} y2={baseline} stroke={INK} strokeWidth={2} />
                {[-2, 2].map((k) => <line key={k} x1={sx(state.mean + k * state.sd)} x2={sx(state.mean + k * state.sd)} y1={baseline - 6} y2={baseline + 6} stroke={MUTED} strokeWidth={1.6} />)}
                <text x={sx(state.mean - 2 * state.sd)} y={baseline + 22} textAnchor="middle" fontSize={11} fontWeight={700} fill={MUTED} direction="ltr">μ−2σ</text>
                <text x={sx(state.mean + 2 * state.sd)} y={baseline + 22} textAnchor="middle" fontSize={11} fontWeight={700} fill={MUTED} direction="ltr">μ+2σ</text>
                <text x={sx(state.mean)} y={baseline + 22} textAnchor="middle" fontSize={12} fontWeight={700} fill={INK}>{state.mean}</text>
                {shown && (
                    <>
                        <line x1={sx(low)} x2={sx(low)} y1={50} y2={baseline} stroke={RED} strokeWidth={2.2} />
                        <line x1={sx(high)} x2={sx(high)} y1={50} y2={baseline} stroke={RED} strokeWidth={2.2} />
                        <text x={sx(low)} y={44} textAnchor="middle" fontSize={12} fontWeight={700} fill={RED} direction="ltr">{fmt(low)}</text>
                        <text x={sx(high)} y={44} textAnchor="middle" fontSize={12} fontWeight={700} fill={RED} direction="ltr">{fmt(high)}</text>
                        <text x={sx(state.mean)} y={150} textAnchor="middle" fontSize={16} fontWeight={700} fill={BLUE}>{levelLabel(BAND_LEVELS[state.level])}</text>
                    </>
                )}
                {!shown && <Hidden x={sx(state.mean)} y={140} />}
            </Board>
        </ToolFrame>
    )
}
