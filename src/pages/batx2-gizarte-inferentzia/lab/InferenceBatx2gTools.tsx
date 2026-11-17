import { useState } from 'react'
import { Segmented, Stepper, ToolFrame } from '../../../features/unit-v2/lab/LabKit'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import { useLabText } from '../../../features/unit-v2/lab/useLabText'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import { Label } from '../../dbh2-funtzioak-v2/plane'
import { Board, Hidden, PlayButton, Predict, Readout } from '../../dbh3-segidak/lab/LabParts'
import { dec, INK, MUTED } from '../../dbh3-segidak/lab/labStyle'
import { setPrediction } from '../../dbh3-segidak/lab/prediction'
import { usePlayback } from '../../dbh4-aplikatuak-proportzionaltasuna/lab/usePlayback'
import { say } from '../../batx2-zientziak-probabilitatea/lab/probability'
import { criticalZ, decimalLatex } from '../../batx2-gizarte-banaketak/critical'
import { errorOf as hundredError, hits, HUNDRED_BATCHES, HUNDRED_LEVELS, HUNDRED_MEAN, HUNDRED_RUNS, HUNDRED_SIZES, hundredChallenges, hundredExtra, hundredPrediction, initialHundredState, levelOf as hundredLevel, means, setHundred, sizeOf as hundredSize, zOf, type HundredState } from './hundred'
import { centreOf, deviationOf, errorOf as marginError, initialMarginState, levelOf as marginLevel, MARGIN_LEVELS, MARGIN_LIMITS, MARGIN_SIZES, marginChallenges, marginExtra, marginPrediction, setMargin, sizeOf as marginSize, type MarginMode, type MarginState } from './margin'

/* ==========================================================================
   Inferentzia · Batxilergoa 2 · Gizarte Zientziak — the two tools of this
   unit: a hundred intervals (how many catch μ) and the margin of error
   (three levers and an interval). Logic in hundred.ts and margin.ts.
   ========================================================================== */

const inLanguage = (latex: string[], language: UnitLanguage) => (language === 'ar' ? latex.map((line) => line.replace(/\{,\}/g, '.')) : latex)
const BLUE = '#2f6fdb'
const BLUE_TINT = '#dde7f7'
const RED = '#c4432a'
const round = (value: number, digits: number) => Math.round(value * 10 ** digits) / 10 ** digits
const percent = (value: number, language: UnitLanguage) => (language === 'eu' ? `%\u00a0${value}` : language === 'en' ? `${value}%` : language === 'ar' ? `${value}٪` : `${value}\u00a0%`)

/* ---------- I-L1. A hundred intervals ---------- */

export function HundredTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<HundredState>(initialHundredState)
    const shown = state.prediction !== null
    const playback = usePlayback(`${state.level}-${state.size}-${state.batch}`, 2400)
    const grow = !shown ? 0 : playback.progress ?? 0
    const visible = Math.round(grow * HUNDRED_RUNS)
    const error = hundredError(state)
    const sampleMeans = means(state)
    const caught = hits(state)
    const left = 20
    const right = 340
    const sx = (value: number) => left + ((value - 35) / 30) * (right - left)
    const level = hundredLevel(state)
    const controls = (
        <>
            <Segmented<string> label={l(say('Maila', 'Nivel', 'المستوى', 'Level'))} value={String(state.level)} options={HUNDRED_LEVELS.map((value, index) => ({ value: String(index), label: percent(value, props.language) }))} onChange={(value) => setState((s) => setHundred(s, { level: Number(value) }))} />
            <Stepper label="n" value={state.size} min={0} max={HUNDRED_SIZES.length - 1} format={(index) => String(HUNDRED_SIZES[index])} onChange={(size) => setState((s) => setHundred(s, { size }))} language={props.language} />
            <Stepper label={l(say('Sorta', 'Tanda', 'الدفعة', 'Batch'))} value={state.batch} min={1} max={HUNDRED_BATCHES} onChange={(batch) => setState((s) => setHundred(s, { batch }))} language={props.language} />
        </>
    )
    const latex = [`{z}_{\\alpha/2}=${decimalLatex(zOf(state))}`, `E=${decimalLatex(zOf(state))}\\cdot\\frac{10}{\\sqrt{${hundredSize(state)}}}=${decimalLatex(round(error, 3))}`, `${caught}\\ /\\ ${HUNDRED_RUNS}`]
    const readout = (
        <Predict
            language={props.language}
            question={say('Ikusi aurretik: 100 tartetatik zenbatek harrapatuko dute $\\mu$?', 'Antes de verlo: de los 100 intervalos, ¿cuántos atraparán $\\mu$?', 'قبل أن ترى: من الفترات المئة، كم فترة ستلتقط $\\mu$؟', 'Before you see it: of the 100 intervals, how many will catch $\\mu$?')}
            labels={{ '<': say('Maila baino askoz gutxiago', 'Bastantes menos que el nivel', 'أقل بكثير من المستوى', 'Well below the level'), '=': say('Mailaren inguruan', 'Cerca del nivel', 'قرب المستوى', 'Near the level'), '>': say('Gehiago, edo denak', 'Más, o todos', 'أكثر، أو كلها', 'More, or all of them') }}
            actual={hundredPrediction(state)}
            choice={state.prediction}
            tip={say('% 95 mailan, 100 tartetik 95 inguruk harrapatzen dute $\\mu$, ez beti zehazki 95.', 'Al 95 %, unos 95 de cada 100 atrapan $\\mu$, no siempre exactamente 95.', 'عند 95 % تلتقط نحو 95 من كل 100 فترة $\\mu$، لا دائمًا 95 تمامًا.', 'At 95%, about 95 in every 100 catch $\\mu$, not always exactly 95.')}
            onChoose={(choice) => setState((s) => setPrediction(s, choice))}
        >
            <Readout latex={inLanguage(latex, props.language)} note={l(say('Tarte gorriek ez dute $\\mu$ harrapatzen. Aldatu sorta: kopurua maila inguruan dabil.', 'Los intervalos rojos no atrapan $\\mu$. Cambia de tanda: el número ronda el nivel.', 'الفترات الحمراء لا تلتقط $\\mu$. غيّر الدفعة: يتأرجح العدد حول المستوى.', 'The red intervals miss $\\mu$. Change the batch: the count hovers around the level.'))} />
        </Predict>
    )
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={hundredChallenges} extraChallenges={hundredExtra} state={state}>
            <Board height={330} label={l(say('Ehun konfiantza-tarte', 'Cien intervalos de confianza', 'مئة فترة ثقة', 'A hundred confidence intervals'))}>
                <line x1={sx(HUNDRED_MEAN)} x2={sx(HUNDRED_MEAN)} y1={12} y2={300} stroke={INK} strokeWidth={2.2} />
                <text x={sx(HUNDRED_MEAN)} y={320} textAnchor="middle" fontSize={13} fontWeight={700} fill={INK} direction="ltr">μ = 50</text>
                {sampleMeans.slice(0, visible).map((mean, index) => {
                    const miss = Math.abs(mean - HUNDRED_MEAN) > error
                    const y = 16 + index * 2.8
                    return <line key={index} x1={sx(Math.max(35, mean - error))} x2={sx(Math.min(65, mean + error))} y1={y} y2={y} stroke={miss ? RED : BLUE} strokeWidth={miss ? 2.4 : 1.6} />
                })}
                {!shown && <Hidden x={180} y={160} />}
                {shown && grow === 1 && <Label x={right} y={320} textAnchor="end" fontSize={13} fontWeight={700} fill={caught < level - 3 ? RED : BLUE}>{l(say(`${caught} / 100 harrapatuta`, `${caught} / 100 atrapan`, `${caught} / 100 تلتقط`, `${caught} / 100 catch it`))}</Label>}
            </Board>
            <PlayButton label={l(say('Atera 100 lagin', 'Saca 100 muestras', 'اسحب 100 عيّنة', 'Draw 100 samples'))} disabled={!shown} playing={playback.playing} onPlay={playback.play} />
        </ToolFrame>
    )
}

/* ---------- I-L2. The margin of error ---------- */

export function MarginTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<MarginState>(initialMarginState)
    const shown = state.prediction !== null
    const isMean = state.mode === 'mean'
    const error = marginError(state)
    const reference = criticalZ(95) * deviationOf(state)
    const centre = centreOf(state)
    const span = isMean ? 30 : 0.3
    const left = 20
    const right = 340
    const sx = (value: number) => left + ((value - (centre - span)) / (2 * span)) * (right - left)
    const clip = (value: number) => Math.min(right, Math.max(left, value))
    const modeLabel = (mode: MarginMode) => (mode === 'mean' ? l(say('Batez bestekoa', 'Media', 'المتوسط', 'Mean')) : l(say('Proportzioa', 'Proporción', 'النسبة', 'Proportion')))
    const controls = (
        <>
            <Segmented<MarginMode> label={l(say('Zer estimatzen da?', '¿Qué se estima?', 'ماذا نقدّر؟', 'What is estimated?'))} value={state.mode} options={(['mean', 'proportion'] as const).map((mode) => ({ value: mode, label: modeLabel(mode) }))} onChange={(mode) => setState((s) => setMargin(s, { mode }))} />
            <Segmented<string> label={l(say('Maila', 'Nivel', 'المستوى', 'Level'))} value={String(state.level)} options={MARGIN_LEVELS.map((value, index) => ({ value: String(index), label: percent(value, props.language) }))} onChange={(value) => setState((s) => setMargin(s, { level: Number(value) }))} />
            {isMean
                ? <Stepper label="σ" value={state.sd} min={MARGIN_LIMITS.sd.min} max={MARGIN_LIMITS.sd.max} step={MARGIN_LIMITS.sd.step} onChange={(sd) => setState((s) => setMargin(s, { sd }))} language={props.language} />
                : <Stepper label="p̂" value={state.p} min={MARGIN_LIMITS.p.min} max={MARGIN_LIMITS.p.max} format={(value) => dec(value / 10, props.language, 1)} onChange={(p) => setState((s) => setMargin(s, { p }))} language={props.language} />}
            <Stepper label="n" value={state.size} min={0} max={MARGIN_SIZES.length - 1} format={(index) => String(MARGIN_SIZES[index])} onChange={(size) => setState((s) => setMargin(s, { size }))} language={props.language} />
        </>
    )
    const deviation = isMean ? `\\frac{${state.sd}}{\\sqrt{${marginSize(state)}}}` : `\\sqrt{\\frac{${decimalLatex(state.p / 10)}\\cdot ${decimalLatex(1 - state.p / 10)}}{${marginSize(state)}}}`
    const latex = [`E=${decimalLatex(criticalZ(marginLevel(state)))}\\cdot ${deviation}`, `E=${decimalLatex(round(error, isMean ? 3 : 4))}`]
    const readout = (
        <Predict
            language={props.language}
            question={say('Ikusi aurretik: tarte hau % 95 mailakoa baino estuagoa, berdina ala zabalagoa da?', 'Antes de verlo: ¿este intervalo es más estrecho, igual o más ancho que el del 95 %?', 'قبل أن ترى: هل هذه الفترة أضيق من فترة 95 % أم مثلها أم أعرض؟', 'Before you see it: is this interval narrower than, equal to or wider than the 95% one?')}
            labels={{ '<': say('Estuagoa', 'Más estrecho', 'أضيق', 'Narrower'), '=': say('Berdina', 'Igual', 'مثلها', 'Equal'), '>': say('Zabalagoa', 'Más ancho', 'أعرض', 'Wider') }}
            actual={marginPrediction(state)}
            choice={state.prediction}
            tip={say('Konfiantza gehiago, balio kritiko handiagoa: tarte zabalagoa.', 'Más confianza, valor crítico mayor: intervalo más ancho.', 'ثقة أكبر، قيمة حرجة أكبر: فترة أعرض.', 'More confidence, a bigger critical value: a wider interval.')}
            onChoose={(choice) => setState((s) => setPrediction(s, choice))}
        >
            <Readout latex={inLanguage(latex, props.language)} note={l(say('$n$ lau aldiz handiagoa: errorea erdia. Maila igo: errorea handiago.', '$n$ cuatro veces mayor: la mitad de error. Sube el nivel: más error.', '$n$ أكبر بأربع مرات: نصف الخطأ. ارفع المستوى: خطأ أكبر.', '$n$ four times bigger: half the error. Raise the level: more error.'))} />
        </Predict>
    )
    const fmt = (value: number) => dec(value, props.language, isMean ? 2 : 3)
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={marginChallenges} extraChallenges={marginExtra} state={state}>
            <Board height={220} label={l(say('Tartea eta % 95 mailakoa', 'El intervalo y el del 95 %', 'الفترة وفترة 95 %', 'The interval and the 95% one'))}>
                <line x1={left} x2={right} y1={150} y2={150} stroke={INK} strokeWidth={2} />
                <rect x={clip(sx(centre - reference))} y={112} width={clip(sx(centre + reference)) - clip(sx(centre - reference))} height={22} rx={6} fill="none" stroke={MUTED} strokeWidth={1.6} strokeDasharray="5 4" />
                <text x={clip(sx(centre + reference)) - 4} y={106} textAnchor="end" fontSize={11} fontWeight={700} fill={MUTED} direction="ltr">{props.language === 'en' ? '95%' : '95 %'}</text>
                {shown && <rect x={clip(sx(centre - error))} y={60} width={clip(sx(centre + error)) - clip(sx(centre - error))} height={30} rx={8} fill={BLUE_TINT} stroke={BLUE} strokeWidth={2.4} />}
                {shown && <text x={clip(sx(centre - error))} y={52} textAnchor="middle" fontSize={12} fontWeight={700} fill={BLUE} direction="ltr">{fmt(centre - error)}</text>}
                {shown && <text x={clip(sx(centre + error))} y={52} textAnchor="middle" fontSize={12} fontWeight={700} fill={BLUE} direction="ltr">{fmt(centre + error)}</text>}
                <circle cx={sx(centre)} cy={150} r={6} fill={RED} />
                <text x={sx(centre)} y={176} textAnchor="middle" fontSize={13} fontWeight={700} fill={INK} direction="ltr">{isMean ? 'x̄ = 50' : `p̂ = ${dec(state.p / 10, props.language, 1)}`}</text>
                {!shown && <Hidden x={180} y={80} />}
            </Board>
        </ToolFrame>
    )
}
