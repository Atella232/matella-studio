import { useState } from 'react'
import { Segmented, Stepper, ToolFrame } from '../../../features/unit-v2/lab/LabKit'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import { useLabText } from '../../../features/unit-v2/lab/useLabText'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import { Board, Hidden, PlayButton, Predict, Readout } from '../../dbh3-segidak/lab/LabParts'
import { dec, INK, MUTED, PAPER, SECOND, SECOND_TINT, STAGE, STAGE_TINT } from '../../dbh3-segidak/lab/labStyle'
import { setPrediction } from '../../dbh3-segidak/lab/prediction'
import { usePlayback } from '../../dbh4-aplikatuak-proportzionaltasuna/lab/usePlayback'
import { hundredthsLatex, say, tenthsLatex } from '../../batx2-zientziak-probabilitatea/lab/probability'
import { binomialPmfDecimal } from '../binomial'
import { below, phiDensity, tableLatex, tableValue, zLatex } from '../normal'
import { APPROX_CASES, approxChallenges, approxCounts, approxExtra, approxOf, approxPrediction, approxWindow, edgesOf, exactOf, initialApproxState, modeLatex, setApprox, type ApproxMode, type ApproxState } from './approx'
import { areaOf, BELL_MEAN, BELL_SDS, bellChallenges, bellExtra, bellPrediction, bellRange, bellStep, initialBellState, setBell, zOf, type BellState } from './bell'
import { BUILD_VALUES, buildChallenges, buildExtra, buildPrediction, initialBuildState, isDistribution, meanTenths, setBar, totalOf, varianceHundredths, type BuildState } from './build'
import { initialLookupState, LOOKUP_ROWS, lookupChallenges, lookupExtra, lookupPrediction, lookupValue, setLookup, zOfLookup, type LookupSide, type LookupState } from './lookup'
import { barsOf, counts, initialMachineState, MACHINE_LIMITS, machineChallenges, machineExtra, machineMean, machinePrediction, machineVariance, paintedOf, setMachine, type MachineMode, type MachineState } from './machine'

/* ==========================================================================
   Banaketak · Batxilergoa 2 · Zientziak — the five tools of this unit:
   build a distribution, the binomial machine, under the bell, the normal
   table and the binomial under the bell. Each asks for a prediction
   before it shows the result; under the bell standardises with ▶. Logic
   in build.ts, machine.ts, bell.ts, lookup.ts and approx.ts; every normal
   value comes from the table of normal.ts.
   ========================================================================== */

/** The readout formulas in a language: Arabic writes the decimal point */
const inLanguage = (latex: string[], language: UnitLanguage) => (language === 'ar' ? latex.map((line) => line.replace(/\{,\}/g, '.')) : latex)
/** A decimal with four places for LaTeX, as the table writes it */
const fourLatex = (value: number) => tableLatex(Math.round(value * 10_000))
/** A decimal with its four places on the board: 0,3770, not 0,377 */
const four = (value: number, language: UnitLanguage) => (Math.round(value * 10_000) / 10_000).toFixed(4).replace('.', language === 'eu' || language === 'es' ? ',' : '.')

const lessGreater = (reference: string) => ({
    '<': say(`${reference} baino txikiagoa`, `Menor que ${reference}`, `أصغر من ${reference}`, `Less than ${reference}`),
    '=': say(`${reference} bezalakoa`, `Igual a ${reference}`, `يساوي ${reference}`, `Equal to ${reference}`),
    '>': say(`${reference} baino handiagoa`, `Mayor que ${reference}`, `أكبر من ${reference}`, `Greater than ${reference}`)
})

/** A bell curve between from and to (in x units) on a board, peak at top */
function bellPath(sx: (x: number) => number, baseline: number, height: number, mean: number, sd: number, from: number, to: number) {
    const peak = phiDensity(0)
    return Array.from({ length: 121 }, (_, index) => from + ((to - from) * index) / 120)
        .map((x, index) => `${index ? 'L' : 'M'}${sx(x).toFixed(1)} ${(baseline - (phiDensity((x - mean) / sd) / peak) * height).toFixed(1)}`)
        .join(' ')
}
/** The area under that curve between a and b, closed on the baseline */
function bellArea(sx: (x: number) => number, baseline: number, height: number, mean: number, sd: number, a: number, b: number) {
    return `${bellPath(sx, baseline, height, mean, sd, a, b)} L${sx(b).toFixed(1)} ${baseline} L${sx(a).toFixed(1)} ${baseline} Z`
}

/* ---------- L1. Build the distribution ---------- */

export function BuildTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<BuildState>(initialBuildState)
    const [selected, setSelected] = useState(0)
    const shown = state.prediction !== null
    const valid = isDistribution(state)
    const mean = meanTenths(state)
    const variance = varianceHundredths(state)
    const format = (tenths: number) => dec(tenths / 10, props.language, 1)
    const controls = (
        <>
            <Segmented label={l(say('Balioa', 'Valor', 'القيمة', 'Value'))} value={String(selected)} options={BUILD_VALUES.map((x) => ({ value: String(x), label: String(x) }))} onChange={(value) => setSelected(Number(value))} />
            <Stepper label={`P(X = ${selected})`} value={state.bars[selected]} min={0} max={10} format={format} onChange={(value) => setState((s) => setBar(s, selected, value))} language={props.language} />
        </>
    )
    const latex = valid ? [`\\mu=${tenthsLatex(mean)}`, `\\sigma^2=${hundredthsLatex(variance)}`] : [`\\sum p_i=${tenthsLatex(totalOf(state))}`]
    const note = valid
        ? say('Barrak orekan daude batez bestekoan, eta bariantzak esaten du pisua zenbat zabaltzen den.', 'Las barras se equilibran en la media, y la varianza dice cuánto se abre el peso.', 'تتوازن الأعمدة عند المتوسط، ويقول التباين كم ينفتح الوزن.', 'The bars balance at the mean, and the variance says how far the weight spreads.')
        : say('Oraindik ez da probabilitate-funtzioa: barrek 1 egin behar dute batuta.', 'Todavía no es una función de probabilidad: las barras tienen que sumar 1.', 'ليست دالة احتمال بعد: يجب أن يكون مجموع الأعمدة 1.', 'It is not a probability function yet: the bars have to add up to 1.')
    const readout = (
        <Predict
            language={props.language}
            question={say('Ikusi aurretik: $\\mu$ 2 baino txikiagoa, berdina ala handiagoa da?', 'Antes de verlo: ¿$\\mu$ es menor, igual o mayor que 2?', 'قبل أن ترى: هل $\\mu$ أصغر من 2 أم يساويه أم أكبر؟', 'Before you see it: is $\\mu$ less than, equal to or greater than 2?')}
            labels={lessGreater('2')}
            actual={buildPrediction(state)}
            choice={state.prediction}
            tip={say('Begiratu non dagoen pisu gehiena: 2 zenbakiaren ezkerrean ala eskuinean?', 'Mira dónde está la mayor parte del peso: ¿a la izquierda o a la derecha del 2?', 'انظر أين يقع معظم الوزن: يسار 2 أم يمينه؟', 'Look where most of the weight is: to the left or to the right of 2?')}
            onChoose={(choice) => setState((s) => setPrediction(s, choice))}
        >
            <Readout latex={inLanguage(latex, props.language)} note={l(note)} />
        </Predict>
    )
    const left = 40
    const step = 64
    const baseline = 196
    const at = (x: number) => left + 24 + x * step
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={buildChallenges} extraChallenges={buildExtra} state={state}>
            <Board height={262} label={l(say('Probabilitate-funtzioaren barrak eta haien oreka-puntua', 'Las barras de la función de probabilidad y su punto de equilibrio', 'أعمدة دالة الاحتمال ونقطة توازنها', 'The bars of the probability function and their balance point'))}>
                {state.bars.map((bar, x) => (
                    <g key={x} style={{ cursor: 'pointer' }} onClick={() => setSelected(x)}>
                        <rect x={at(x) - 20} y={baseline - bar * 15} width={40} height={bar * 15} fill={x === selected ? SECOND_TINT : STAGE_TINT} stroke={x === selected ? SECOND : STAGE} strokeWidth={x === selected ? 2.4 : 1.6} />
                        <text x={at(x)} y={baseline - bar * 15 - 6} textAnchor="middle" fontSize={13} fontWeight={700} fill={INK}>{format(bar)}</text>
                        <text x={at(x)} y={baseline + 20} textAnchor="middle" fontSize={15} fontWeight={700} fill={INK}>{x}</text>
                    </g>
                ))}
                <line x1={left} x2={left + 4 * step + 48} y1={baseline} y2={baseline} stroke={INK} strokeWidth={3} />
                {shown && valid && (
                    <g>
                        <polygon points={`${at(mean / 10)},${baseline + 26} ${at(mean / 10) - 11},${baseline + 46} ${at(mean / 10) + 11},${baseline + 46}`} fill={SECOND} />
                        <text x={at(mean / 10)} y={baseline + 62} textAnchor="middle" fontSize={14} fontWeight={700} fill={SECOND}>μ = {format(mean)}</text>
                    </g>
                )}
                {shown && !valid && <text x={180} y={baseline + 50} textAnchor="middle" fontSize={14} fontWeight={700} fill={SECOND}>Σ = {format(totalOf(state))}</text>}
                {!shown && <Hidden x={at(2)} y={baseline + 50} size={22} />}
            </Board>
        </ToolFrame>
    )
}

/* ---------- L2. The binomial machine ---------- */

const MACHINE_MODES: Array<{ value: MachineMode; label: string }> = [
    { value: 'eq', label: 'X = k' },
    { value: 'atLeast', label: 'X ≥ k' },
    { value: 'atMost', label: 'X ≤ k' }
]
const machineRelation = (mode: MachineMode, k: number) => (mode === 'eq' ? `P(X=${k})` : mode === 'atLeast' ? `P(X\\ge ${k})` : `P(X\\le ${k})`)

export function MachineTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<MachineState>(initialMachineState)
    const shown = state.prediction !== null
    const bars = barsOf(state)
    const painted = paintedOf(state)
    const controls = (
        <>
            <Stepper label="n" value={state.n} min={MACHINE_LIMITS.n.min} max={MACHINE_LIMITS.n.max} onChange={(n) => setState((s) => setMachine(s, { n }))} language={props.language} />
            <Stepper label="p" value={state.p} min={MACHINE_LIMITS.p.min} max={MACHINE_LIMITS.p.max} format={(tenths) => dec(tenths / 10, props.language, 1)} onChange={(p) => setState((s) => setMachine(s, { p }))} language={props.language} />
            <Stepper label="k" value={state.k} min={0} max={state.n} onChange={(k) => setState((s) => setMachine(s, { k }))} language={props.language} />
            <Segmented label={l(say('Zer zenbatzen da', 'Qué se cuenta', 'ماذا نعدّ', 'What counts'))} value={state.mode} options={MACHINE_MODES} onChange={(mode) => setState((s) => setMachine(s, { mode }))} />
        </>
    )
    const latex = [`${machineRelation(state.mode, state.k)}\\approx ${fourLatex(painted)}`, `\\mu=np=${tenthsLatex(machineMean(state))}`, `\\sigma^2=npq=${hundredthsLatex(machineVariance(state))}`]
    const readout = (
        <Predict
            language={props.language}
            question={say('Ikusi aurretik: margotutako probabilitatea 0,5 baino txikiagoa, berdina ala handiagoa da?', 'Antes de verlo: ¿la probabilidad pintada es menor, igual o mayor que 0,5?', 'قبل أن ترى: هل الاحتمال الملوّن أصغر من 0.5 أم يساويه أم أكبر؟', 'Before you see it: is the painted probability less than, equal to or greater than 0.5?')}
            labels={lessGreater(dec(0.5, props.language, 1))}
            actual={machinePrediction(state)}
            choice={state.prediction}
            tip={say('Konparatu $k$ eta $np$: barra handienak $np$ inguruan daude.', 'Compara $k$ con $np$: las barras más altas están cerca de $np$.', 'قارن $k$ بـ $np$: أعلى الأعمدة قرب $np$.', 'Compare $k$ with $np$: the tallest bars are near $np$.')}
            onChoose={(choice) => setState((s) => setPrediction(s, choice))}
        >
            <Readout latex={inLanguage(latex, props.language)} note={l(say('Barra bakoitza $\\binom{n}{k}p^k q^{n-k}$ da; margotutakoak batu egiten dira.', 'Cada barra es $\\binom{n}{k}p^k q^{n-k}$; las pintadas se suman.', 'كل عمود هو $\\binom{n}{k}p^k q^{n-k}$؛ وتُجمع الأعمدة الملوّنة.', 'Each bar is $\\binom{n}{k}p^k q^{n-k}$; the painted ones are added.'))} />
        </Predict>
    )
    const left = 22
    const width = 316
    const baseline = 200
    const tallest = Math.max(...bars)
    const slot = width / (state.n + 1)
    const at = (j: number) => left + slot * (j + 0.5)
    const labelEvery = state.n > 12 ? 2 : 1
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={machineChallenges} extraChallenges={machineExtra} state={state}>
            <Board height={246} label={l(say('B(n; p) banaketaren barrak', 'Las barras de B(n; p)', 'أعمدة B(n; p)', 'The bars of B(n; p)'))}>
                {bars.map((value, j) => {
                    const height = (value / tallest) * 160
                    const on = counts(state, j)
                    return (
                        <g key={j}>
                            <rect x={at(j) - slot * 0.4} y={baseline - height} width={slot * 0.8} height={height} fill={on ? SECOND_TINT : STAGE_TINT} stroke={on ? SECOND : STAGE} strokeWidth={1.4} />
                            {j % labelEvery === 0 && <text x={at(j)} y={baseline + 18} textAnchor="middle" fontSize={12} fontWeight={700} fill={j === state.k ? SECOND : MUTED}>{j}</text>}
                        </g>
                    )
                })}
                <line x1={left} x2={left + width} y1={baseline} y2={baseline} stroke={INK} strokeWidth={2} />
                {shown && (
                    <g>
                        <line x1={left + slot * (machineMean(state) / 10 + 0.5)} x2={left + slot * (machineMean(state) / 10 + 0.5)} y1={30} y2={baseline} stroke={INK} strokeWidth={1.6} strokeDasharray="5 4" />
                        <text x={left + slot * (machineMean(state) / 10 + 0.5)} y={24} textAnchor="middle" fontSize={13} fontWeight={700} fill={INK}>μ = {dec(machineMean(state) / 10, props.language, 1)}</text>
                    </g>
                )}
                {!shown && <Hidden x={180} y={232} size={20} />}
                {shown && <text x={180} y={236} textAnchor="middle" fontSize={14} fontWeight={700} fill={SECOND}>{four(painted, props.language)}</text>}
            </Board>
        </ToolFrame>
    )
}

/* ---------- L3. Under the bell ---------- */

export function BellTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<BellState>(initialBellState)
    const shown = state.prediction !== null
    const key = `${state.mean}-${state.sd}-${state.a}-${state.b}`
    const playback = usePlayback(key, 1600)
    const turn = !shown ? 0 : playback.progress ?? 0
    const range = bellRange(state)
    const area = areaOf(state)
    const za = zOf(state, state.a)
    const zb = zOf(state, state.b)
    const step = bellStep(state.sd)
    const controls = (
        <>
            <Stepper label="μ" value={state.mean} min={BELL_MEAN.min} max={BELL_MEAN.max} step={BELL_MEAN.step} onChange={(mean) => setState((s) => setBell(s, { mean }))} language={props.language} />
            <Segmented label="σ" value={String(state.sd)} options={BELL_SDS.map((sd) => ({ value: String(sd), label: String(sd) }))} onChange={(sd) => setState((s) => setBell(s, { sd: Number(sd) }))} />
            <Stepper label="a" value={state.a} min={range.min} max={state.b} step={step} onChange={(a) => setState((s) => setBell(s, { a }))} language={props.language} />
            <Stepper label="b" value={state.b} min={state.a} max={range.max} step={step} onChange={(b) => setState((s) => setBell(s, { b }))} language={props.language} />
        </>
    )
    const latex = [`z_a=${zLatex(za)}\\qquad z_b=${zLatex(zb)}`, `P(${state.a}\\le X\\le ${state.b})=${tableLatex(area)}`]
    const readout = (
        <Predict
            language={props.language}
            question={say('Ikusi aurretik: itzaleztatutako azalera 0,5 baino txikiagoa, berdina ala handiagoa da?', 'Antes de verlo: ¿el área sombreada es menor, igual o mayor que 0,5?', 'قبل أن ترى: هل المساحة المظللة أصغر من 0.5 أم تساويها أم أكبر؟', 'Before you see it: is the shaded area less than, equal to or greater than 0.5?')}
            labels={lessGreater(dec(0.5, props.language, 1))}
            actual={bellPrediction(state)}
            choice={state.prediction}
            tip={say('Kanpaiaren erdia batez bestekoaren alde bakoitzean dago.', 'La mitad de la campana está a cada lado de la media.', 'نصف الجرس في كل جانب من المتوسط.', 'Half the bell lies on each side of the mean.')}
            onChoose={(choice) => setState((s) => setPrediction(s, choice))}
        >
            <Readout latex={inLanguage(latex, props.language)} note={l(say(`$P(Z\\le z_b)-P(Z\\le z_a)=${tableLatex(below(zb))}-${tableLatex(below(za))}$. Sakatu ▶ tipifikatzeko.`, `$P(Z\\le z_b)-P(Z\\le z_a)=${tableLatex(below(zb))}-${tableLatex(below(za))}$. Pulsa ▶ para tipificar.`, `$P(Z\\le z_b)-P(Z\\le z_a)=${tableLatex(below(zb))}-${tableLatex(below(za))}$. اضغط ▶ للتوحيد المعياري.`, `$P(Z\\le z_b)-P(Z\\le z_a)=${tableLatex(below(zb))}-${tableLatex(below(za))}$. Press ▶ to standardise.`))} />
        </Predict>
    )
    const from = state.mean - 4 * state.sd
    const to = state.mean + 4 * state.sd
    const left = 16
    const right = 344
    const sx = (x: number) => left + ((x - from) / (to - from)) * (right - left)
    const baseline = 170
    const ticks = [-3, -2, -1, 0, 1, 2, 3]
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={bellChallenges} extraChallenges={bellExtra} state={state}>
            <Board height={250} label={l(say('Normal baten kanpaia eta a eta b arteko azalera', 'La campana de una normal y el área entre a y b', 'جرس توزيع طبيعي والمساحة بين a وb', 'The bell of a normal and the area between a and b'))}>
                <path d={bellArea(sx, baseline, 130, state.mean, state.sd, state.a, state.b)} fill={SECOND_TINT} />
                <path d={bellPath(sx, baseline, 130, state.mean, state.sd, from, to)} fill="none" stroke={INK} strokeWidth={2.4} />
                <line x1={sx(state.a)} x2={sx(state.a)} y1={baseline - 140} y2={baseline} stroke={SECOND} strokeWidth={1.6} />
                <line x1={sx(state.b)} x2={sx(state.b)} y1={baseline - 140} y2={baseline} stroke={SECOND} strokeWidth={1.6} />
                <text x={sx(state.a)} y={baseline - 146} textAnchor="middle" fontSize={13} fontWeight={700} fill={SECOND}>a</text>
                <text x={sx(state.b)} y={baseline - 146} textAnchor="middle" fontSize={13} fontWeight={700} fill={SECOND}>b</text>
                <line x1={left} x2={right} y1={baseline} y2={baseline} stroke={INK} strokeWidth={2} />
                {ticks.map((t) => (
                    <g key={t}>
                        <line x1={sx(state.mean + t * state.sd)} x2={sx(state.mean + t * state.sd)} y1={baseline} y2={baseline + 6} stroke={INK} strokeWidth={1.4} />
                        <text x={sx(state.mean + t * state.sd)} y={baseline + 22} textAnchor="middle" fontSize={13} fontWeight={700} fill={MUTED} opacity={1 - turn}>{state.mean + t * state.sd}</text>
                        <text x={sx(state.mean + t * state.sd)} y={baseline + 22} textAnchor="middle" fontSize={13} fontWeight={700} fill={STAGE} opacity={turn}>{t === 0 ? '0' : `${t < 0 ? '−' : ''}${Math.abs(t)}`}</text>
                    </g>
                ))}
                <text x={left} y={baseline + 44} fontSize={13} fontWeight={700} fill={turn > 0.5 ? STAGE : MUTED}>{turn > 0.5 ? 'z' : 'x'}</text>
                {shown ? <text x={180} y={baseline + 50} textAnchor="middle" fontSize={15} fontWeight={700} fill={SECOND}>{four(area / 10_000, props.language)}</text> : <Hidden x={180} y={baseline + 54} size={22} />}
                {turn > 0 && <text x={344} y={baseline + 50} textAnchor="end" fontSize={12} fontWeight={700} fill={STAGE} opacity={turn}>z = (x − μ) / σ</text>}
            </Board>
            <PlayButton label={l(say('Tipifikatu', 'Tipifica', 'وحّد معياريًّا', 'Standardise'))} disabled={!shown} playing={playback.playing} onPlay={playback.play} />
        </ToolFrame>
    )
}

/* ---------- L4. The normal table ---------- */

const LOOKUP_SIDES: Array<{ value: LookupSide; label: string }> = [
    { value: 'below', label: 'P(Z ≤ z)' },
    { value: 'above', label: 'P(Z > z)' }
]

export function LookupTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<LookupState>(initialLookupState)
    const shown = state.prediction !== null
    const z = zOfLookup(state)
    const value = lookupValue(state)
    const size = Math.abs(z)
    const controls = (
        <>
            <Segmented label={l(say('Zeinua', 'Signo', 'الإشارة', 'Sign'))} value={state.negative ? '-' : '+'} options={[{ value: '+', label: '+' }, { value: '-', label: '−' }]} onChange={(sign) => setState((s) => setLookup(s, { negative: sign === '-' }))} />
            <Stepper label={l(say('Errenkada', 'Fila', 'الصف', 'Row'))} value={state.row} min={LOOKUP_ROWS.min} max={LOOKUP_ROWS.max} format={(row) => dec(row / 10, props.language, 1)} onChange={(row) => setState((s) => setLookup(s, { row }))} language={props.language} />
            <Stepper label={l(say('Zutabea', 'Columna', 'العمود', 'Column'))} value={state.column} min={0} max={9} format={(column) => dec(column / 100, props.language, 2)} onChange={(column) => setState((s) => setLookup(s, { column }))} language={props.language} />
            <Segmented label={l(say('Aldea', 'Lado', 'الجهة', 'Side'))} value={state.side} options={LOOKUP_SIDES} onChange={(side) => setState((s) => setLookup(s, { side }))} />
        </>
    )
    const relation = state.side === 'below' ? '\\le' : '>'
    const read = tableLatex(tableValue(size))
    const latex = z < 0 || state.side === 'above'
        ? [`P(Z\\le ${zLatex(size)})=${read}`, `P(Z${relation} ${zLatex(z)})=${tableLatex(value)}`]
        : [`P(Z\\le ${zLatex(z)})=${tableLatex(value)}`]
    const note = z < 0
        ? say('Taulak ez ditu negatiboak: balio absolutuaren errenkada irakurri eta simetria erabiltzen da.', 'La tabla no trae negativos: se lee la fila del valor absoluto y se usa la simetría.', 'لا يضم الجدول القيم السالبة: نقرأ صف القيمة المطلقة ونستعمل التماثل.', 'The table has no negatives: read the row of the absolute value and use symmetry.')
        : state.side === 'above'
            ? say('Gainetik dagoena aurkakoa da: 1 ken taula.', 'Lo de encima es el contrario: 1 menos la tabla.', 'ما فوق هو المعاكس: 1 ناقص الجدول.', 'What lies above is the complement: 1 minus the table.')
            : say('Taulak zuzenean ematen du: azpitik dagoena.', 'La tabla lo da directamente: lo de debajo.', 'يعطيه الجدول مباشرة: ما تحت.', 'The table gives it directly: what lies below.')
    const readout = (
        <Predict
            language={props.language}
            question={say('Ikusi aurretik: itzaleztatutako zona 0,5 baino txikiagoa, berdina ala handiagoa da?', 'Antes de verlo: ¿la zona sombreada es menor, igual o mayor que 0,5?', 'قبل أن ترى: هل المنطقة المظللة أصغر من 0.5 أم تساويها أم أكبر؟', 'Before you see it: is the shaded zone less than, equal to or greater than 0.5?')}
            labels={lessGreater(dec(0.5, props.language, 1))}
            actual={lookupPrediction(state)}
            choice={state.prediction}
            tip={say('Begiratu $z$ balioaren zeinuari eta aldeari: erdia 0 zenbakiaren alde bakoitzean dago.', 'Mira el signo de $z$ y el lado: la mitad está a cada lado del 0.', 'انظر إلى إشارة $z$ وإلى الجهة: النصف في كل جانب من 0.', 'Look at the sign of $z$ and the side: half lies on each side of 0.')}
            onChoose={(choice) => setState((s) => setPrediction(s, choice))}
        >
            <Readout latex={inLanguage(latex, props.language)} note={l(note)} />
        </Predict>
    )
    // A corner of the table around the row and the column of |z|
    const firstRow = Math.min(Math.max(state.row - 1, 0), LOOKUP_ROWS.max - 2)
    const firstColumn = Math.min(Math.max(state.column - 1, 0), 7)
    const rows = [firstRow, firstRow + 1, firstRow + 2]
    const columns = [firstColumn, firstColumn + 1, firstColumn + 2]
    const cell = (row: number, column: number) => four(tableValue((row * 10 + column) / 100) / 10_000, props.language)
    const sx = (x: number) => 30 + ((x + 3.2) / 6.4) * 300
    const baseline = 236
    const shadeFrom = state.side === 'below' ? -3.2 : z
    const shadeTo = state.side === 'below' ? z : 3.2
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={lookupChallenges} extraChallenges={lookupExtra} state={state}>
            <Board height={270} label={l(say('Normal estandarraren taularen zati bat eta haren kanpaia', 'Un trozo de la tabla de la normal estándar y su campana', 'جزء من جدول التوزيع الطبيعي المعياري وجرسه', 'A piece of the standard normal table and its bell'))}>
                <rect x={14} y={8} width={332} height={34 + rows.length * 28} rx={10} fill={PAPER} stroke={INK} strokeWidth={1.6} />
                <text x={44} y={30} textAnchor="middle" fontSize={13} fontWeight={700} fill={MUTED}>z</text>
                {columns.map((column, index) => <text key={column} x={128 + index * 92} y={30} textAnchor="middle" fontSize={13} fontWeight={700} fill={column === state.column ? SECOND : MUTED}>{dec(column / 100, props.language, 2)}</text>)}
                <line x1={14} x2={346} y1={40} y2={40} stroke={INK} strokeWidth={1.2} />
                {rows.map((row, r) => (
                    <g key={row}>
                        <text x={44} y={60 + r * 28} textAnchor="middle" fontSize={13} fontWeight={700} fill={row === state.row ? SECOND : MUTED}>{dec(row / 10, props.language, 1)}</text>
                        {columns.map((column, index) => {
                            const hit = row === state.row && column === state.column
                            return (
                                <g key={column}>
                                    {hit && <rect x={92 + index * 92} y={45 + r * 28} width={72} height={22} rx={5} fill={SECOND_TINT} stroke={SECOND} strokeWidth={1.8} />}
                                    <text x={128 + index * 92} y={60 + r * 28} textAnchor="middle" fontSize={13} fontWeight={hit ? 700 : 500} fill={hit ? SECOND : INK}>{cell(row, column)}</text>
                                </g>
                            )
                        })}
                    </g>
                ))}
                <path d={bellArea(sx, baseline, 110, 0, 1, Math.max(-3.2, shadeFrom), Math.min(3.2, shadeTo))} fill={shown ? SECOND_TINT : STAGE_TINT} />
                {z < 0 && <path d={bellArea(sx, baseline, 110, 0, 1, size, 3.2)} fill="none" stroke={STAGE} strokeWidth={1.6} strokeDasharray="4 3" />}
                <path d={bellPath(sx, baseline, 110, 0, 1, -3.2, 3.2)} fill="none" stroke={INK} strokeWidth={2.2} />
                <line x1={30} x2={330} y1={baseline} y2={baseline} stroke={INK} strokeWidth={1.8} />
                <line x1={sx(z)} x2={sx(z)} y1={baseline - 116} y2={baseline + 4} stroke={SECOND} strokeWidth={1.6} />
                <text x={sx(0)} y={baseline + 18} textAnchor="middle" fontSize={12} fontWeight={700} fill={MUTED}>0</text>
                <text x={sx(z)} y={baseline + 30} textAnchor="middle" fontSize={13} fontWeight={700} fill={SECOND}>{dec(z, props.language, 2).replace('-', '−')}</text>
                {shown ? <text x={sx(state.side === 'below' ? Math.max(-2.4, z - 1) : Math.min(2.4, z + 1))} y={baseline - 30} textAnchor="middle" fontSize={14} fontWeight={700} fill={SECOND}>{four(value / 10_000, props.language)}</text> : <Hidden x={300} y={baseline - 60} size={20} />}
            </Board>
        </ToolFrame>
    )
}

/* ---------- L5. The binomial under the bell ---------- */

const APPROX_MODES: Array<{ value: ApproxMode; label: string }> = [
    { value: 'atMost', label: 'X ≤ k' },
    { value: 'atLeast', label: 'X ≥ k' },
    { value: 'eq', label: 'X = k' }
]

export function ApproxTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<ApproxState>(initialApproxState)
    const shown = state.prediction !== null
    const chosen = APPROX_CASES[state.caseIndex]
    const range = approxWindow(state.caseIndex)
    const exact = exactOf(state)
    const approx = approxOf(state)
    const edges = edgesOf(state)
    const caseOptions = APPROX_CASES.map((item, index) => ({ value: String(index), label: `B(${item.n}; ${dec(item.p, props.language, 1)})` }))
    const controls = (
        <>
            <Segmented label={l(say('Binomiala', 'Binomial', 'التوزيع الثنائي', 'Binomial'))} value={String(state.caseIndex)} options={caseOptions} onChange={(value) => setState((s) => setApprox(s, { caseIndex: Number(value) }))} />
            <Stepper label="k" value={state.k} min={range.min} max={range.max} onChange={(k) => setState((s) => setApprox(s, { k }))} language={props.language} />
            <Segmented label={l(say('Zer zenbatzen da', 'Qué se cuenta', 'ماذا نعدّ', 'What counts'))} value={state.mode} options={APPROX_MODES} onChange={(mode) => setState((s) => setApprox(s, { mode }))} />
            <Segmented label={l(say('Zuzenketa', 'Corrección', 'التصحيح', 'Correction'))} value={state.corrected ? 'on' : 'off'} options={[{ value: 'off', label: l(say('Gabe', 'Sin', 'دون', 'Off')) }, { value: 'on', label: '± 0,5'.replace(',', props.language === 'ar' || props.language === 'en' ? '.' : ',') }]} onChange={(value) => setState((s) => setApprox(s, { corrected: value === 'on' }))} />
        </>
    )
    const half = (x: number) => (Number.isInteger(x) ? String(x) : `${Math.floor(x)}{,}5`)
    const normalLatex = edges.from !== null && edges.to !== null
        ? (edges.from === edges.to ? `P(Y=${half(edges.from)})` : `P(${half(edges.from)}\\le Y\\le ${half(edges.to)})`)
        : edges.to !== null ? `P(Y\\le ${half(edges.to)})` : `P(Y\\ge ${half(edges.from!)})`
    const latex = [`${modeLatex(state.mode, state.k)}\\approx ${fourLatex(exact)}`, `${normalLatex}=${tableLatex(approx)}`]
    const difference = dec(Math.abs(approx / 10_000 - Math.round(exact * 10_000) / 10_000), props.language, 4)
    const readout = (
        <Predict
            language={props.language}
            question={say('Ikusi aurretik: normalak binomial zehatzak baino gutxiago, berdin ala gehiago ematen du?', 'Antes de verlo: ¿la normal da menos, lo mismo o más que la binomial exacta?', 'قبل أن ترى: هل يعطي الطبيعي أقل من الثنائي الدقيق أم مثله أم أكثر؟', 'Before you see it: does the normal give less than, the same as or more than the exact binomial?')}
            labels={{ '<': say('Gutxiago', 'Menos', 'أقل', 'Less'), '=': say('Berdin', 'Lo mismo', 'مثله', 'The same'), '>': say('Gehiago', 'Más', 'أكثر', 'More') }}
            actual={approxPrediction(state)}
            choice={state.prediction}
            tip={say('Begiratu mutur-barrari: kanpaiak haren zati bat bakarrik hartzen du?', 'Mira la barra del extremo: ¿la campana se queda solo con parte de ella?', 'انظر إلى عمود الطرف: هل يأخذ الجرس جزءًا منه فقط؟', 'Look at the end bar: does the bell take only part of it?')}
            onChoose={(choice) => setState((s) => setPrediction(s, choice))}
        >
            <Readout latex={inLanguage(latex, props.language)} note={l(say(`Barrak binomial zehatza dira, eta kanpaiaren azalera, normala, $N(${chosen.mean};\\,${chosen.sd})$. Aldea: ${difference}.`, `Las barras son la binomial exacta, y el área de la campana, la normal $N(${chosen.mean};\\,${chosen.sd})$. Diferencia: ${difference}.`, `الأعمدة هي الثنائي الدقيق، ومساحة الجرس هي الطبيعي $N(${chosen.mean};\\,${chosen.sd})$. الفرق: ${difference}.`, `The bars are the exact binomial, and the area of the bell, the normal $N(${chosen.mean};\\,${chosen.sd})$. Difference: ${difference}.`))} />
        </Predict>
    )
    const from = range.min - 0.5
    const to = range.max + 0.5
    const left = 14
    const right = 346
    const sx = (x: number) => left + ((x - from) / (to - from)) * (right - left)
    const baseline = 196
    const unit = (right - left) / (to - from)
    const peak = binomialPmfDecimal(chosen.n, chosen.p, Math.round(chosen.mean))
    const scale = 150 / Math.max(peak, phiDensity(0) / chosen.sd)
    const ks = Array.from({ length: range.max - range.min + 1 }, (_, index) => range.min + index)
    const curveTop = (x: number) => baseline - (phiDensity((x - chosen.mean) / chosen.sd) / chosen.sd) * scale
    const curve = Array.from({ length: 161 }, (_, index) => from + ((to - from) * index) / 160).map((x, index) => `${index ? 'L' : 'M'}${sx(x).toFixed(1)} ${curveTop(x).toFixed(1)}`).join(' ')
    const shadeFrom = Math.max(from, edges.from ?? from)
    const shadeTo = Math.min(to, edges.to ?? to)
    const shade = shadeTo > shadeFrom
        ? `${Array.from({ length: 81 }, (_, index) => shadeFrom + ((shadeTo - shadeFrom) * index) / 80).map((x, index) => `${index ? 'L' : 'M'}${sx(x).toFixed(1)} ${curveTop(x).toFixed(1)}`).join(' ')} L${sx(shadeTo).toFixed(1)} ${baseline} L${sx(shadeFrom).toFixed(1)} ${baseline} Z`
        : ''
    const labelEvery = ks.length > 30 ? 10 : ks.length > 16 ? 5 : 2
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={approxChallenges} extraChallenges={approxExtra} state={state}>
            <Board height={244} label={l(say('Binomialaren barrak eta normalaren kanpaia', 'Las barras de la binomial y la campana de la normal', 'أعمدة الثنائي وجرس الطبيعي', 'The bars of the binomial and the bell of the normal'))}>
                {shade && <path d={shade} fill={SECOND_TINT} />}
                {ks.map((k) => {
                    const value = binomialPmfDecimal(chosen.n, chosen.p, k)
                    const on = approxCounts(state, k)
                    return <rect key={k} x={sx(k - 0.5)} y={baseline - value * scale} width={unit} height={value * scale} fill={on ? 'rgba(196, 67, 42, 0.12)' : 'rgba(221, 231, 247, 0.55)'} stroke={on ? SECOND : STAGE} strokeWidth={ks.length > 30 ? 0.8 : 1.3} />
                })}
                <path d={curve} fill="none" stroke={INK} strokeWidth={2.2} />
                {edges.from !== null && <line x1={sx(Math.max(from, edges.from))} x2={sx(Math.max(from, edges.from))} y1={34} y2={baseline} stroke={SECOND} strokeWidth={1.8} strokeDasharray="5 4" />}
                {edges.to !== null && <line x1={sx(Math.min(to, edges.to))} x2={sx(Math.min(to, edges.to))} y1={34} y2={baseline} stroke={SECOND} strokeWidth={1.8} strokeDasharray="5 4" />}
                <line x1={left} x2={right} y1={baseline} y2={baseline} stroke={INK} strokeWidth={2} />
                {ks.filter((k) => k % labelEvery === 0).map((k) => <text key={k} x={sx(k)} y={baseline + 18} textAnchor="middle" fontSize={12} fontWeight={700} fill={k === state.k ? SECOND : MUTED}>{k}</text>)}
                <text x={sx(state.k)} y={28} textAnchor="middle" fontSize={13} fontWeight={700} fill={SECOND}>k = {state.k}</text>
                {shown
                    ? <text x={180} y={baseline + 40} textAnchor="middle" fontSize={14} fontWeight={700} fill={INK}>{four(exact, props.language)} · {four(approx / 10_000, props.language)}</text>
                    : <Hidden x={180} y={baseline + 42} size={20} />}
            </Board>
        </ToolFrame>
    )
}
