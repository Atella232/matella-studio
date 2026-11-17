import { useState } from 'react'
import { Segmented, Stepper, ToolFrame } from '../../../features/unit-v2/lab/LabKit'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import { useLabText } from '../../../features/unit-v2/lab/useLabText'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import { Board, Hidden, PlayButton, Predict, Readout } from '../../dbh3-segidak/lab/LabParts'
import { GREEN, GREEN_TINT, INK, MUSTARD, MUSTARD_TINT, MUTED, PAPER, SECOND, SECOND_TINT, STAGE, texDec } from '../../dbh3-segidak/lab/labStyle'
import { setPrediction } from '../../dbh3-segidak/lab/prediction'
import { usePlayback } from '../../dbh4-aplikatuak-proportzionaltasuna/lab/usePlayback'
import { say } from '../text'
import { AVERAGE_LIMITS, averageAt, averageChallenges, averageExtra, averagePrediction, initialAverageState, setAverage, shareOf, type AverageState } from './average'
import { curvatureOf, dataEnd, ESTIMATE_LIMITS, estimateChallenges, estimateExtra, estimateOf, estimatePrediction, initialEstimateState, lineAt, parabolaAt, setEstimate, slopeOf, type EstimateMode, type EstimateState } from './estimate'
import { bestPrice, initialPriceState, PRICE_LIMITS, priceChallenges, priceExtra, priceLimit, pricePrediction, quantityAt, setPrice, valueAt, type PriceMode, type PriceState } from './price'

/* ==========================================================================
   Funtzio elementalak · Batxilergoa 1 · Gizarte Zientziak — the three
   tools of this unit: estimating between two or three data, the price
   that brings in most and the average cost. Each asks for a prediction
   before it shows the result, and each moves with ▶. Logic in
   estimate.ts, price.ts and average.ts. The drawings carry numbers and
   letters only; the words live in the controls and the readouts.
   ========================================================================== */

const GRID = '#e6dfd2'

/** A number for LaTeX, whole or with two decimals at most */
const tex = (value: number, language: UnitLanguage) => (Math.abs(value - Math.round(value)) < 1e-9 ? String(Math.round(value)) : texDec(value, language, 2))
/** A signed term for LaTeX: +3, −0,5 */
const term = (value: number, language: UnitLanguage) => (value < 0 ? `-${tex(-value, language)}` : `+${tex(value, language)}`)
/** A number written for the SVG, with the minus sign */
const minus = (value: number) => (value < 0 ? `−${-value}` : String(value))

/** A curve as an SVG path, broken where it leaves the board */
function curvePath(fn: (x: number) => number, from: number, to: number, X: (x: number) => number, Y: (y: number) => number, yMin: number, yMax: number, step = 0.05): string {
    let path = ''
    let open = false
    for (let x = from; x <= to + 1e-9; x += step) {
        const y = fn(x)
        if (!Number.isFinite(y) || y < yMin || y > yMax) {
            open = false
            continue
        }
        path += `${open ? 'L' : 'M'} ${X(x).toFixed(1)} ${Y(y).toFixed(1)} `
        open = true
    }
    return path
}

/* ---------- L1. Between two (or three) data ---------- */

export function EstimateTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const t = (value: number) => tex(value, props.language)
    const [state, setState] = useState<EstimateState>(initialEstimateState)
    const shown = state.prediction !== null
    const parabolic = state.mode === 'parabolic'
    const X = (x: number) => 40 + x * 24
    const Y = (y: number) => 268 - y * 17
    const end = dataEnd(state)
    const estimate = estimateOf(state)
    const playback = usePlayback(`${state.mode}-${state.a}-${state.b}-${state.c}-${state.target}`, 1200)
    const progress = !shown ? 0 : playback.progress === null ? 1 : playback.progress
    const reach = 12 * progress
    const model = (x: number) => (parabolic ? parabolaAt(state, x) : lineAt(state, x))
    const data: Array<[string, number, number]> = [['A', 0, state.a], ['B', 4, state.b], ...(parabolic ? [['C', 8, state.c] as [string, number, number]] : [])]
    const controls = (
        <>
            <Segmented<EstimateMode> label={l(say('Datuak', 'Datos', 'البيانات', 'Data'))} value={state.mode} options={[{ value: 'linear', label: l(say('Bi: zuzena', 'Dos: recta', 'اثنتان: مستقيم', 'Two: line')) }, { value: 'parabolic', label: l(say('Hiru: parabola', 'Tres: parábola', 'ثلاث: قطع مكافئ', 'Three: parabola')) }]} onChange={(mode) => setState((s) => setEstimate(s, { mode }))} />
            <Stepper label="A (x = 0)" value={state.a} min={ESTIMATE_LIMITS.y.min} max={ESTIMATE_LIMITS.y.max} onChange={(a) => setState((s) => setEstimate(s, { a }))} language={props.language} />
            <Stepper label="B (x = 4)" value={state.b} min={ESTIMATE_LIMITS.y.min} max={ESTIMATE_LIMITS.y.max} onChange={(b) => setState((s) => setEstimate(s, { b }))} language={props.language} />
            {parabolic && <Stepper label="C (x = 8)" value={state.c} min={ESTIMATE_LIMITS.y.min} max={ESTIMATE_LIMITS.y.max} onChange={(c) => setState((s) => setEstimate(s, { c }))} language={props.language} />}
            <Stepper label={l(say('Helburua x', 'Objetivo x', 'الهدف x', 'Target x'))} value={state.target} min={ESTIMATE_LIMITS.target.min} max={ESTIMATE_LIMITS.target.max} onChange={(target) => setState((s) => setEstimate(s, { target }))} language={props.language} />
        </>
    )
    const m = slopeOf(state)
    const lines = parabolic
        ? [`y=${state.a}${term(m, props.language)}x${term(curvatureOf(state), props.language)}x(x-4)`, `x=${state.target}\\ \\to\\ y=${t(estimate)}`]
        : [`m=\\frac{${state.b}-${state.a}}{4}=${t(m)}`, `${state.a}${term(m, props.language)}\\cdot ${state.target}=${t(estimate)}`]
    const kind = state.target <= end
        ? say('Datuen barruan: interpolazioa, fidagarria.', 'Dentro de los datos: interpolación, fiable.', 'داخل البيانات: استيفاء موثوق.', 'Inside the data: interpolation, reliable.')
        : say('Datuetatik kanpo: estrapolazioa. Zenbat eta urrunago, orduan eta fidagarritasun txikiagoa.', 'Fuera de los datos: extrapolación. Cuanto más lejos, menos fiable.', 'خارج البيانات: استقراء خارجي. كلما ابتعدنا قلّت الثقة.', 'Outside the data: extrapolation. The further away, the less reliable.')
    const compare = parabolic
        ? say(` Zuzenak (A eta B) $${t(lineAt(state, state.target))}$ emango luke.`, ` La recta (A y B) daría $${t(lineAt(state, state.target))}$.`, ` كان المستقيم (A وB) سيعطي $${t(lineAt(state, state.target))}$.`, ` The line (A and B) would give $${t(lineAt(state, state.target))}$.`)
        : say('', '', '', '')
    const readout = (
        <Predict
            language={props.language}
            question={say(`Ikusi aurretik: zer da $x=${state.target}$ puntuan estimatzea?`, `Antes de verlo: estimar en $x=${state.target}$, ¿qué es?`, `قبل أن ترى: ما التقدير عند $x=${state.target}$؟`, `Before you see it: what is estimating at $x=${state.target}$?`)}
            labels={{ '<': say('Interpolatzea (barruan)', 'Interpolar (dentro)', 'استيفاء', 'Interpolating (inside)'), '=': say('Datu bat da', 'Es un dato', 'إنها بيانة', 'It is a datum'), '>': say('Estrapolatzea (kanpoan)', 'Extrapolar (fuera)', 'استقراء خارجي', 'Extrapolating (outside)') }}
            actual={estimatePrediction(state)}
            choice={state.prediction}
            tip={say('Datuak $x=0$ puntutik azken daturaino doaz: bi daturekin $x=4$ arte, eta hirurekin $x=8$ arte. Tarte horretan, interpolatzea; kanpoan, estrapolatzea.', 'Los datos van de $x=0$ al último dato: hasta $x=4$ con dos y hasta $x=8$ con tres. Dentro de ese tramo, interpolar; fuera, extrapolar.', 'تمتد البيانات من $x=0$ إلى آخر بيانة: حتى $x=4$ مع اثنتين وحتى $x=8$ مع ثلاث. داخل هذا المجال استيفاء، وخارجه استقراء خارجي.', 'The data run from $x=0$ to the last datum: up to $x=4$ with two and up to $x=8$ with three. Inside that stretch, interpolating; outside, extrapolating.')}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout latex={lines} note={`${l(kind)}${l(compare)}`} />
        </Predict>
    )
    const ticks = [0, 2, 4, 6, 8, 10, 12]
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={estimateChallenges} extraChallenges={estimateExtra} state={state}>
            <Board height={300} label={l(say('Datuak eta estimazioa', 'Los datos y la estimación', 'البيانات والتقدير', 'The data and the estimate'))}>
                <rect x={X(0)} y={Y(13)} width={X(end) - X(0)} height={Y(0) - Y(13)} fill={GREEN_TINT} />
                <rect x={X(end)} y={Y(13)} width={X(12.5) - X(end)} height={Y(0) - Y(13)} fill={SECOND_TINT} opacity={0.45} />
                {ticks.map((x) => <line key={`gx${x}`} x1={X(x)} x2={X(x)} y1={Y(0)} y2={Y(13)} stroke={GRID} strokeWidth={1} />)}
                {ticks.map((y) => <line key={`gy${y}`} x1={X(0)} x2={X(12.5)} y1={Y(y)} y2={Y(y)} stroke={GRID} strokeWidth={1} />)}
                <line x1={X(0)} x2={X(12.5)} y1={Y(0)} y2={Y(0)} stroke={INK} strokeWidth={1.6} />
                <line x1={X(0)} x2={X(0)} y1={Y(0)} y2={Y(13)} stroke={INK} strokeWidth={1.6} />
                {ticks.map((x) => <text key={`tx${x}`} x={X(x)} y={Y(0) + 16} textAnchor="middle" fontSize={12} fill={MUTED}>{x}</text>)}
                {ticks.filter((y) => y > 0).map((y) => <text key={`ty${y}`} x={X(0) - 6} y={Y(y) + 4} textAnchor="end" fontSize={12} fill={MUTED}>{y}</text>)}
                <line x1={X(state.target)} x2={X(state.target)} y1={Y(0)} y2={Y(13)} stroke={INK} strokeWidth={1.6} strokeDasharray="4 3" />
                {shown && parabolic && <path d={curvePath((x) => lineAt(state, x), 0, reach, X, Y, -0.4, 13.2)} fill="none" stroke={MUTED} strokeWidth={2.2} strokeDasharray="6 5" />}
                {shown && <path d={curvePath(model, 0, reach, X, Y, -0.4, 13.2)} fill="none" stroke={STAGE} strokeWidth={3.4} strokeLinejoin="round" />}
                {data.map(([name, x, y]) => (
                    <g key={name}>
                        <circle cx={X(x)} cy={Y(y)} r={6.5} fill={INK} stroke={PAPER} strokeWidth={1.6} />
                        <text x={X(x) + 9} y={Y(y) - 9} fontSize={14} fontWeight={700} fill={INK}>{name}</text>
                    </g>
                ))}
                {shown && progress >= 1 && estimate >= -0.4 && estimate <= 13.2 && (
                    <g>
                        <circle cx={X(state.target)} cy={Y(estimate)} r={7.5} fill={state.target <= end ? GREEN : SECOND} stroke={PAPER} strokeWidth={1.6} />
                        <text x={X(state.target) + (state.target > 9 ? -10 : 10)} y={Y(estimate) + (estimate > 11 ? 20 : -10)} textAnchor={state.target > 9 ? 'end' : 'start'} fontSize={15} fontWeight={700} fill={state.target <= end ? GREEN : SECOND} direction="ltr">{minus(Math.round(estimate * 100) / 100).replace('.', props.language === 'eu' || props.language === 'es' ? ',' : '.')}</text>
                    </g>
                )}
                {!shown && <Hidden x={X(state.target) + (state.target > 9 ? -18 : 18)} y={Y(6)} size={22} />}
            </Board>
            <PlayButton label={l(say('Marraztu eta estimatu', 'Dibuja y estima', 'ارسم وقدّر', 'Draw and estimate'))} disabled={!shown} playing={playback.playing} onPlay={playback.play} />
        </ToolFrame>
    )
}

/* ---------- L2. The price that brings in most ---------- */

export function PriceTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const t = (value: number) => tex(value, props.language)
    const [state, setState] = useState<PriceState>(initialPriceState)
    const shown = state.prediction !== null
    const profit = state.mode === 'profit'
    const { Q, k, p, v } = state
    const q = quantityAt(state, p)
    const value = valueAt(state, p)
    const limit = priceLimit(state)
    const best = bestPrice(state)
    const playback = usePlayback(`${state.mode}-${Q}-${k}-${p}-${v}`, 1400)
    // Top panel: the demand q = Q − k·p, units 0–120 and the price up to the last one that sells
    const axis = Math.max(10, Math.ceil(Q / k / 5) * 5)
    const X = (price: number) => 44 + price * (284 / axis)
    const Yd = (units: number) => 152 - units
    // Bottom panel: the revenue or profit curve, scaled to its own range
    const samples = Array.from({ length: limit + 1 }, (_, price) => valueAt(state, price))
    const top = Math.max(1, valueAt(state, best), ...samples)
    const bottom = Math.min(0, ...samples)
    const Yv = (amount: number) => 318 - ((amount - bottom) / (top - bottom)) * 118
    // The walker only moves with ▶: before that, the vertex stays for the learner to find
    const walker = playback.progress === null ? null : p + (best - p) * playback.progress
    const controls = (
        <>
            <Segmented<PriceMode> label={l(say('Zer begiratu', 'Qué mirar', 'ماذا ننظر', 'What to look at'))} value={state.mode} options={[{ value: 'revenue', label: l(say('Diru-sarrerak', 'Ingresos', 'الإيرادات', 'Revenue')) }, { value: 'profit', label: l(say('Mozkina', 'Beneficio', 'الربح', 'Profit')) }]} onChange={(mode) => setState((s) => setPrice(s, { mode }))} />
            <Stepper label={l(say('Q (p = 0 denean)', 'Q (con p = 0)', 'Q (عندما p = 0)', 'Q (at p = 0)'))} value={Q} min={PRICE_LIMITS.Q.min} max={PRICE_LIMITS.Q.max} step={PRICE_LIMITS.Q.step} onChange={(next) => setState((s) => setPrice(s, { Q: next }))} language={props.language} />
            <Stepper label={l(say('k (euro bakoitzeko galtzen diren unitateak)', 'k (unidades que se pierden por euro)', 'k (الوحدات المفقودة لكل يورو)', 'k (units lost per euro)'))} value={k} min={PRICE_LIMITS.k.min} max={PRICE_LIMITS.k.max} onChange={(next) => setState((s) => setPrice(s, { k: next }))} language={props.language} />
            {profit && <Stepper label={l(say('v (unitateko kostua, €)', 'v (coste por unidad, €)', 'v (تكلفة الوحدة، €)', 'v (cost per unit, €)'))} value={v} min={PRICE_LIMITS.v.min} max={PRICE_LIMITS.v.max} step={PRICE_LIMITS.v.step} onChange={(next) => setState((s) => setPrice(s, { v: next }))} language={props.language} />}
            <Stepper label={l(say('Prezioa p (€)', 'Precio p (€)', 'السعر p (€)', 'Price p (€)'))} value={p} min={PRICE_LIMITS.p.min} max={limit} onChange={(next) => setState((s) => setPrice(s, { p: next }))} language={props.language} />
        </>
    )
    const name = profit ? 'B' : 'I'
    const lines = [`q=${Q}-${k}\\cdot ${p}=${q}`, profit ? `B=(${p}-${v})\\cdot ${q}=${value}` : `I=${p}\\cdot ${q}=${value}`]
    const readout = (
        <Predict
            language={props.language}
            question={profit
                ? say('Ikusi aurretik: prezioa euro bat igotzen baduzu, mozkina igo, berdin geratu ala jaitsi egiten da?', 'Antes de verlo: si subes el precio 1 €, ¿el beneficio sube, se queda igual o baja?', 'قبل أن ترى: إذا رفعت السعر 1 €، هل يزيد الربح أم يبقى أم ينقص؟', 'Before you see it: if you raise the price by €1, does the profit go up, stay the same or go down?')
                : say('Ikusi aurretik: prezioa euro bat igotzen baduzu, diru-sarrerak igo, berdin geratu ala jaitsi egiten dira?', 'Antes de verlo: si subes el precio 1 €, ¿los ingresos suben, se quedan igual o bajan?', 'قبل أن ترى: إذا رفعت السعر 1 €، هل تزيد الإيرادات أم تبقى أم تنقص؟', 'Before you see it: if you raise the price by €1, does the revenue go up, stay the same or go down?')}
            labels={{ '<': say('Jaitsi', 'Bajan', 'تنقص', 'Down'), '=': say('Berdin', 'Igual', 'تبقى', 'Same'), '>': say('Igo', 'Suben', 'تزيد', 'Up') }}
            actual={pricePrediction(state)}
            choice={state.prediction}
            tip={say('Erpinaren ezkerrean, prezioa igotzeak diru gehiago ematen du; eskuinean, gutxiago. Erpina $p=\\frac{Q}{2k}$ puntuan dago (mozkinarekin, $\\frac{Q/k+v}{2}$ puntuan).', 'A la izquierda del vértice, subir el precio da más dinero; a la derecha, menos. El vértice está en $p=\\frac{Q}{2k}$ (con beneficio, en $\\frac{Q/k+v}{2}$).', 'على يسار الرأس تعطي زيادة السعر مالًا أكثر، وعلى يمينه أقل. ويقع الرأس عند $p=\\frac{Q}{2k}$ (ومع الربح عند $\\frac{Q/k+v}{2}$).', 'Left of the vertex, raising the price brings in more money; right of it, less. The vertex is at $p=\\frac{Q}{2k}$ (with profit, at $\\frac{Q/k+v}{2}$).')}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout latex={lines} note={l(say(`Erpina: $p=${t(best)}$ €.`, `Vértice: $p=${t(best)}$ €.`, `الرأس: $p=${t(best)}$ €.`, `Vertex: $p=${t(best)}$ euros.`))} />
        </Predict>
    )
    const priceTicks = Array.from({ length: axis / (axis <= 20 ? 5 : 10) + 1 }, (_, i) => i * (axis <= 20 ? 5 : 10))
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={priceChallenges} extraChallenges={priceExtra} state={state}>
            <Board height={338} label={l(say('Eskaria, laukizuzena eta parabola', 'La demanda, el rectángulo y la parábola', 'الطلب والمستطيل والقطع المكافئ', 'The demand, the rectangle and the parabola'))}>
                {/* Top panel: demand and the rectangle p × q */}
                <rect x={X(0)} y={Yd(120)} width={X(axis) - X(0)} height={120} fill={PAPER} />
                {profit ? (
                    <g>
                        <rect x={X(0)} y={Yd(q)} width={X(Math.min(v, p)) - X(0)} height={q} fill={SECOND_TINT} stroke={SECOND} strokeWidth={1.4} />
                        {p > v && <rect x={X(v)} y={Yd(q)} width={X(p) - X(v)} height={q} fill={GREEN_TINT} stroke={GREEN} strokeWidth={1.4} />}
                    </g>
                ) : <rect x={X(0)} y={Yd(q)} width={X(p) - X(0)} height={q} fill={MUSTARD_TINT} stroke={MUSTARD} strokeWidth={1.6} />}
                <line x1={X(0)} y1={Yd(Q)} x2={X(Q / k)} y2={Yd(0)} stroke={STAGE} strokeWidth={3} />
                <line x1={X(0)} x2={X(axis) + 4} y1={Yd(0)} y2={Yd(0)} stroke={INK} strokeWidth={1.4} />
                <line x1={X(0)} x2={X(0)} y1={Yd(0)} y2={Yd(122)} stroke={INK} strokeWidth={1.4} />
                {[40, 80, 120].map((units) => <text key={units} x={X(0) - 5} y={Yd(units) + 4} textAnchor="end" fontSize={11} fill={MUTED}>{units}</text>)}
                {priceTicks.map((price) => <text key={price} x={X(price)} y={Yd(0) + 13} textAnchor="middle" fontSize={11} fill={MUTED}>{price}</text>)}
                <circle cx={X(p)} cy={Yd(q)} r={5.5} fill={INK} stroke={PAPER} strokeWidth={1.4} />
                <text x={X(0) + 6} y={Yd(120) + 14} fontSize={13} fontWeight={700} fill={STAGE} fontStyle="italic">q</text>
                <text x={X(axis) - 2} y={Yd(0) - 6} textAnchor="end" fontSize={13} fontWeight={700} fill={INK} fontStyle="italic">p</text>
                {/* Bottom panel: revenue or profit */}
                <rect x={X(0)} y={Yv(top) - 2} width={X(axis) - X(0)} height={Yv(bottom) - Yv(top) + 4} fill={PAPER} />
                <line x1={X(0)} x2={X(axis) + 4} y1={Yv(0)} y2={Yv(0)} stroke={INK} strokeWidth={1.4} />
                <line x1={X(0)} x2={X(0)} y1={Yv(bottom)} y2={Yv(top) - 4} stroke={INK} strokeWidth={1.4} />
                <text x={X(0) + 6} y={Yv(top) + 10} fontSize={13} fontWeight={700} fill={profit ? GREEN : MUSTARD} fontStyle="italic">{name}</text>
                {shown && (
                    <g>
                        <line x1={X(best)} x2={X(best)} y1={Yv(bottom)} y2={Yv(top)} stroke={MUTED} strokeWidth={1.4} strokeDasharray="5 4" />
                        <path d={curvePath((price) => valueAt(state, price), 0, limit, X, Yv, bottom - 1, top + 1, 0.25)} fill="none" stroke={profit ? GREEN : MUSTARD} strokeWidth={3.2} />
                        <circle cx={X(p)} cy={Yv(value)} r={6} fill={INK} stroke={PAPER} strokeWidth={1.4} />
                        {walker !== null && <circle cx={X(walker)} cy={Yv(valueAt(state, walker))} r={7} fill={SECOND} stroke={PAPER} strokeWidth={1.6} />}
                    </g>
                )}
                {!shown && <Hidden x={X(p)} y={Yv((top + bottom) / 2) + 8} size={24} />}
            </Board>
            <PlayButton label={l(say('Eraman erpinera', 'Lleva al vértice', 'انقل إلى الرأس', 'Go to the vertex'))} disabled={!shown} playing={playback.playing} onPlay={playback.play} />
        </ToolFrame>
    )
}

/* ---------- L3. The average cost ---------- */

export function AverageTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const t = (value: number) => tex(value, props.language)
    const [state, setState] = useState<AverageState>(initialAverageState)
    const shown = state.prediction !== null
    const { F, v, x } = state
    const average = averageAt(state, x)
    const share = shareOf(state, x)
    const playback = usePlayback(`${F}-${v}-${x}`, 1800)
    const progress = !shown ? 0 : playback.progress === null ? 1 : playback.progress
    // The board shows from 0 to 200 units and from 0 euros to the average cost at 20 units
    const yMax = Math.max(10, Math.ceil(averageAt(state, 20) / 5) * 5)
    const X = (units: number) => 44 + units * 1.42
    const Y = (euros: number) => 268 - (euros / yMax) * 232
    const walker = 10 + 190 * progress
    const controls = (
        <>
            <Stepper label={l(say('F (kostu finkoa, €)', 'F (coste fijo, €)', 'F (التكلفة الثابتة، €)', 'F (fixed cost, €)'))} value={F} min={AVERAGE_LIMITS.F.min} max={AVERAGE_LIMITS.F.max} step={AVERAGE_LIMITS.F.step} onChange={(next) => setState((s) => setAverage(s, { F: next }))} language={props.language} />
            <Stepper label={l(say('v (unitateko kostua, €)', 'v (coste por unidad, €)', 'v (تكلفة الوحدة، €)', 'v (cost per unit, €)'))} value={v} min={AVERAGE_LIMITS.v.min} max={AVERAGE_LIMITS.v.max} onChange={(next) => setState((s) => setAverage(s, { v: next }))} language={props.language} />
            <Stepper label={l(say('x (unitateak)', 'x (unidades)', 'x (الوحدات)', 'x (units)'))} value={x} min={AVERAGE_LIMITS.x.min} max={AVERAGE_LIMITS.x.max} step={AVERAGE_LIMITS.x.step} onChange={(next) => setState((s) => setAverage(s, { x: next }))} language={props.language} />
        </>
    )
    const readout = (
        <Predict
            language={props.language}
            question={say(`Ikusi aurretik: ${x} unitaterekin, batez besteko kostua $v$ balioaren bikoitza (${2 * v} €) baino handiagoa, berdina ala txikiagoa da?`, `Antes de verlo: con ${x} unidades, ¿el coste medio es mayor, igual o menor que el doble de $v$ (${2 * v} €)?`, `قبل أن ترى: مع ${x} وحدة، هل التكلفة المتوسطة أكبر من ضعف $v$ (${2 * v} €) أم تساويه أم أصغر منه؟`, `Before you see it: with ${x} units, is the average cost more than, equal to or less than twice $v$ (€${2 * v})?`)}
            labels={{ '<': say('Bikoitza baino txikiagoa', 'Menos del doble', 'أقل من الضعف', 'Less than twice'), '=': say('Bikoitza, zehazki', 'Justo el doble', 'الضعف تمامًا', 'Exactly twice'), '>': say('Bikoitza baino handiagoa', 'Más del doble', 'أكثر من الضعف', 'More than twice') }}
            actual={averagePrediction(state)}
            choice={state.prediction}
            tip={say('Batez besteko kostua $v+\\frac{F}{x}$ da: bikoitza da kostu finkoaren zatia, $\\frac{F}{x}$, $v$ bezainbeste denean.', 'El coste medio es $v+\\frac{F}{x}$: es el doble cuando la parte del coste fijo, $\\frac{F}{x}$, vale lo mismo que $v$.', 'التكلفة المتوسطة $v+\\frac{F}{x}$: تكون الضعف عندما يساوي نصيب التكلفة الثابتة $\\frac{F}{x}$ قيمة $v$.', 'The average cost is $v+\\frac{F}{x}$: it is twice $v$ when the share of the fixed cost, $\\frac{F}{x}$, equals $v$.')}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout latex={[`M=${v}+\\frac{${F}}{${x}}=${v}+${t(share)}=${t(average)}`]} note={l(say(`Asintota: $y=${v}$. Batez besteko kostua hara jaisten da, iritsi gabe.`, `Asíntota: $y=${v}$. El coste medio baja hacia ahí sin llegar.`, `الخط المقارب: $y=${v}$. تنخفض التكلفة المتوسطة نحوه دون أن تبلغه.`, `Asymptote: $y=${v}$. The average cost falls towards it without reaching it.`))} />
        </Predict>
    )
    const unitTicks = [0, 50, 100, 150, 200]
    const euroTicks = Array.from({ length: 4 }, (_, i) => (yMax / 4) * (i + 1))
    const from = F / (yMax - v)
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={averageChallenges} extraChallenges={averageExtra} state={state}>
            <Board height={298} label={l(say('Batez besteko kostuaren hiperbola eta haren asintota', 'La hipérbola del coste medio y su asíntota', 'قطع التكلفة المتوسطة الزائد وخطه المقارب', 'The average-cost hyperbola and its asymptote'))}>
                <rect x={X(0)} y={Y(yMax)} width={X(200) - X(0)} height={Y(0) - Y(yMax)} fill={PAPER} />
                {unitTicks.map((units) => <line key={`gx${units}`} x1={X(units)} x2={X(units)} y1={Y(0)} y2={Y(yMax)} stroke={GRID} strokeWidth={1} />)}
                {euroTicks.map((euros) => <line key={`gy${euros}`} x1={X(0)} x2={X(200)} y1={Y(euros)} y2={Y(euros)} stroke={GRID} strokeWidth={1} />)}
                <line x1={X(0)} x2={X(205)} y1={Y(0)} y2={Y(0)} stroke={INK} strokeWidth={1.5} />
                <line x1={X(0)} x2={X(0)} y1={Y(0)} y2={Y(yMax)} stroke={INK} strokeWidth={1.5} />
                {unitTicks.map((units) => <text key={`tx${units}`} x={X(units)} y={Y(0) + 15} textAnchor="middle" fontSize={11} fill={MUTED}>{units}</text>)}
                {euroTicks.map((euros) => <text key={`ty${euros}`} x={X(0) - 5} y={Y(euros) + 4} textAnchor="end" fontSize={11} fill={MUTED}>{Math.round(euros * 10) / 10}</text>)}
                <line x1={X(0)} x2={X(200)} y1={Y(v)} y2={Y(v)} stroke={SECOND} strokeWidth={2} strokeDasharray="7 5" />
                <text x={X(200)} y={Y(v) - 6} textAnchor="end" fontSize={13} fontWeight={700} fill={SECOND} direction="ltr">{`y = ${v}`}</text>
                <path d={curvePath((units) => averageAt(state, units), Math.max(10, from), 200, X, Y, 0, yMax, 1)} fill="none" stroke={STAGE} strokeWidth={3.2} />
                {shown && (
                    <g>
                        <line x1={X(0)} x2={X(200)} y1={Y(2 * v)} y2={Y(2 * v)} stroke={MUTED} strokeWidth={1.4} strokeDasharray="3 4" />
                        <rect x={X(x) - 7} y={Y(Math.min(v, yMax))} width={14} height={Y(0) - Y(Math.min(v, yMax))} fill={STAGE} opacity={0.75} />
                        {average <= yMax && <rect x={X(x) - 7} y={Y(average)} width={14} height={Y(v) - Y(average)} fill={MUSTARD} />}
                        {average <= yMax && <circle cx={X(x)} cy={Y(average)} r={6.5} fill={INK} stroke={PAPER} strokeWidth={1.5} />}
                        {progress > 0 && progress < 1 && averageAt(state, walker) <= yMax && <circle cx={X(walker)} cy={Y(averageAt(state, walker))} r={7} fill={SECOND} stroke={PAPER} strokeWidth={1.6} />}
                    </g>
                )}
                {!shown && <Hidden x={X(x) + (x > 150 ? -18 : 18)} y={Y(yMax / 2)} size={22} />}
            </Board>
            <PlayButton label={l(say('Ekoitzi gehiago', 'Produce más', 'أنتج أكثر', 'Produce more'))} disabled={!shown} playing={playback.playing} onPlay={playback.play} />
        </ToolFrame>
    )
}
