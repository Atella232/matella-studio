import { useState } from 'react'
import { Segmented, Stepper, ToolFrame } from '../../../features/unit-v2/lab/LabKit'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import { useLabText } from '../../../features/unit-v2/lab/useLabText'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import { Board, Hidden, PlayButton, Predict, Readout } from '../../dbh3-segidak/lab/LabParts'
import { GREEN, INK, MUSTARD, MUTED, PAPER, SECOND, STAGE, texDec } from '../../dbh3-segidak/lab/labStyle'
import { setPrediction } from '../../dbh3-segidak/lab/prediction'
import { usePlayback } from '../../dbh4-aplikatuak-proportzionaltasuna/lab/usePlayback'
import { say } from '../text'
import { costAt, curveOf, initialMarginalState, MARGINAL_CURVES, MARGINAL_LIMITS, marginalAt, marginalChallenges, marginalExtra, marginalPrediction, nextUnit, setMarginal, type MarginalState } from './marginal'
import { bestX, costAt as profitCostAt, curveOf as profitCurveOf, initialProfitState, PROFIT_CURVES, PROFIT_LIMITS, PROFIT_X, profitAt, profitChallenges, profitExtra, profitPrediction, profitSlope, revenueAt, setProfit, type ProfitState } from './profit'

/* ==========================================================================
   Deribatuak eta haien aplikazioak · Batxilergoa 1 · Gizarte Zientziak —
   the two tools of this unit: the cost of the next unit against the
   marginal cost, and the production with the greatest profit. Each asks
   for a prediction before it shows the result, and each moves with ▶.
   Logic in marginal.ts and profit.ts. The drawings carry numbers and
   letters only.
   ========================================================================== */

const GRID = '#e6dfd2'
const tex = (value: number, language: UnitLanguage) => (Math.abs(value - Math.round(value)) < 1e-9 ? String(Math.round(value)) : texDec(value, language, 2))
const decimalLabel = (value: number, language: UnitLanguage) => String(value).replace('.', language === 'eu' || language === 'es' ? ',' : '.').replace('-', '−')

function curvePath(fn: (x: number) => number, from: number, to: number, X: (x: number) => number, Y: (y: number) => number, yMin: number, yMax: number, step = 0.1): string {
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

function marks(top: number): number[] {
    const step = [1, 2, 5, 10, 20, 25, 50, 100, 200, 250, 500].find((size) => top / size <= 5) ?? 1000
    return Array.from({ length: Math.floor(top / step) }, (_, i) => (i + 1) * step)
}

/* ---------- L1. The marginal cost ---------- */

export function MarginalTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const t = (value: number) => tex(value, props.language)
    const [state, setState] = useState<MarginalState>(initialMarginalState)
    const shown = state.prediction !== null
    const playback = usePlayback(`${state.curve}-${state.b}-${state.F}-${state.x}`, 1600)
    const progress = !shown ? 0 : playback.progress === null ? 1 : playback.progress
    const a = curveOf(state)
    const top = Math.max(50, Math.ceil(Math.max(costAt(state, 20), costAt(state, 0), costAt(state, 10)) / 50) * 50)
    const X = (x: number) => 46 + x * 15
    const Y = (y: number) => 262 - (y / top) * 226
    // ▶ shrinks the step from one unit to almost nothing
    const h = 1 - 0.95 * progress
    const slopeSecant = (costAt(state, state.x + h) - costAt(state, state.x)) / h
    const m = marginalAt(state, state.x)
    const line = (slope: number) => (x: number) => costAt(state, state.x) + slope * (x - state.x)
    const controls = (
        <>
            <Segmented<string> label="a" value={String(state.curve)} options={MARGINAL_CURVES.map((value, index) => ({ value: String(index), label: decimalLabel(value, props.language) }))} onChange={(curve) => setState((s) => setMarginal(s, { curve: Number(curve) }))} />
            <Stepper label="b" value={state.b} min={MARGINAL_LIMITS.b.min} max={MARGINAL_LIMITS.b.max} onChange={(b) => setState((s) => setMarginal(s, { b }))} language={props.language} />
            <Stepper label="F" value={state.F} min={MARGINAL_LIMITS.F.min} max={MARGINAL_LIMITS.F.max} step={MARGINAL_LIMITS.F.step} onChange={(F) => setState((s) => setMarginal(s, { F }))} language={props.language} />
            <Stepper label="x" value={state.x} min={MARGINAL_LIMITS.x.min} max={MARGINAL_LIMITS.x.max} onChange={(x) => setState((s) => setMarginal(s, { x }))} language={props.language} />
        </>
    )
    const formula = `C(x)=${a === 0 ? '' : `${a === 1 ? '' : t(a)}x^2+`}${state.b}x+${state.F}`
    const readout = (
        <Predict
            language={props.language}
            question={say(`Ikusi aurretik: ${state.x}. unitatearen ondorengoak kostu marjinala baino gutxiago, berdin ala gehiago balio du?`, `Antes de verlo: la unidad que sigue a la ${state.x}, ¿cuesta menos, igual o más que el coste marginal?`, `قبل أن ترى: هل تكلّف الوحدة التالية للوحدة ${state.x} أقل من التكلفة الحدية أم مثلها أم أكثر؟`, `Before you see it: does the unit after number ${state.x} cost less than, the same as or more than the marginal cost?`)}
            labels={{ '<': say('Gutxiago', 'Menos', 'أقل', 'Less'), '=': say('Berdin', 'Igual', 'مثلها', 'The same'), '>': say('Gehiago', 'Más', 'أكثر', 'More') }}
            actual={marginalPrediction(state)}
            choice={state.prediction}
            tip={say('Kendura $C(x+1)-C(x)-C\'(x)$ hain zuzen $a$ da: kostu marjinala hazten bada, hurrengo unitatea garestiagoa da.', 'La diferencia $C(x+1)-C(x)-C\'(x)$ es justo $a$: si el coste marginal crece, la unidad siguiente sale más cara.', 'الفرق $C(x+1)-C(x)-C\'(x)$ يساوي $a$ تمامًا: إذا ازدادت التكلفة الحدية كانت الوحدة التالية أغلى.', 'The difference $C(x+1)-C(x)-C\'(x)$ is exactly $a$: if the marginal cost grows, the next unit costs more.')}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout latex={[formula, `C(${state.x + 1})-C(${state.x})=${t(nextUnit(state))}`, `C'(${state.x})=${t(m)}`]} note={l(say('Marratua: hurrengo unitatearen ebakitzailea. Horia: ukitzailea, kostu marjinala.', 'Discontinua: la secante de la unidad siguiente. Amarilla: la tangente, el coste marginal.', 'المتقطع: قاطع الوحدة التالية. والأصفر: المماس، أي التكلفة الحدية.', 'Dashed: the secant of the next unit. Yellow: the tangent, the marginal cost.'))} />
        </Predict>
    )
    const yMarks = marks(top)
    const xMarks = [0, 4, 8, 12, 16, 20]
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={marginalChallenges} extraChallenges={marginalExtra} state={state}>
            <Board height={292} label={l(say('Kostua, hurrengo unitatearen ebakitzailea eta ukitzailea', 'El coste, la secante de la unidad siguiente y la tangente', 'التكلفة وقاطع الوحدة التالية والمماس', 'The cost, the secant of the next unit and the tangent'))}>
                <rect x={X(0)} y={Y(top)} width={X(20) - X(0)} height={Y(0) - Y(top)} fill={PAPER} />
                {xMarks.map((x) => <line key={`gx${x}`} x1={X(x)} x2={X(x)} y1={Y(0)} y2={Y(top)} stroke={GRID} strokeWidth={1} />)}
                {yMarks.map((y) => <line key={`gy${y}`} x1={X(0)} x2={X(20)} y1={Y(y)} y2={Y(y)} stroke={GRID} strokeWidth={1} />)}
                <line x1={X(0)} x2={X(20.5)} y1={Y(0)} y2={Y(0)} stroke={INK} strokeWidth={1.5} />
                <line x1={X(0)} x2={X(0)} y1={Y(0)} y2={Y(top)} stroke={INK} strokeWidth={1.5} />
                {xMarks.map((x) => <text key={`tx${x}`} x={X(x)} y={Y(0) + 15} textAnchor="middle" fontSize={12} fill={MUTED}>{x}</text>)}
                {yMarks.map((y) => <text key={`ty${y}`} x={X(0) - 5} y={Y(y) + 4} textAnchor="end" fontSize={11} fill={MUTED}>{y}</text>)}
                <path d={curvePath((x) => costAt(state, x), 0, 20, X, Y, 0, top)} fill="none" stroke={STAGE} strokeWidth={3.4} />
                {shown && <path d={curvePath(line(m), Math.max(0, state.x - 4), Math.min(20, state.x + 4), X, Y, 0, top)} fill="none" stroke={MUSTARD} strokeWidth={2.6} />}
                {shown && <path d={curvePath(line(slopeSecant), Math.max(0, state.x - 4), Math.min(20, state.x + 4), X, Y, 0, top)} fill="none" stroke={SECOND} strokeWidth={2.2} strokeDasharray="6 5" />}
                <circle cx={X(state.x)} cy={Y(costAt(state, state.x))} r={6.5} fill={INK} stroke={PAPER} strokeWidth={1.5} />
                {shown && <circle cx={X(state.x + h)} cy={Y(costAt(state, state.x + h))} r={5.5} fill={progress >= 1 ? GREEN : SECOND} stroke={PAPER} strokeWidth={1.5} />}
                {!shown && <Hidden x={X(Math.min(17, state.x + 3))} y={Y(top * 0.6)} size={26} />}
            </Board>
            <PlayButton label={l(say('Txikitu urratsa', 'Encoge el paso', 'صغّر الخطوة', 'Shrink the step'))} disabled={!shown} playing={playback.playing} onPlay={playback.play} />
        </ToolFrame>
    )
}

/* ---------- L2. The greatest profit ---------- */

export function ProfitTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const t = (value: number) => tex(value, props.language)
    const [state, setState] = useState<ProfitState>(initialProfitState)
    const shown = state.prediction !== null
    const playback = usePlayback(`${state.p}-${state.v}-${state.curve}-${state.F}-${state.x}`, 1800)
    const progress = !shown ? 0 : playback.progress === null ? 1 : playback.progress
    const c = profitCurveOf(state)
    const best = bestX(state)
    const values = [0, 10, 20, 30].map((x) => profitAt(state, x)).concat(best >= 0 && best <= PROFIT_X ? [profitAt(state, best)] : [])
    // A window around the top of the profit: as far below 0 as above it (further if the top itself is a loss), so the hill is always seen
    const top = Math.max(50, Math.ceil((Math.max(...values) * 1.25) / 50) * 50)
    const lowest = profitAt(state, Math.min(PROFIT_X, Math.max(0, best)))
    const bottom = Math.min(-top, Math.floor((1.25 * lowest) / 50) * 50)
    const X = (x: number) => 46 + x * 10
    const Y = (y: number) => 262 - ((y - bottom) / (top - bottom)) * 226
    const walker = PROFIT_X * progress
    const controls = (
        <>
            <Stepper label="p" value={state.p} min={PROFIT_LIMITS.p.min} max={PROFIT_LIMITS.p.max} step={PROFIT_LIMITS.p.step} onChange={(p) => setState((s) => setProfit(s, { p }))} language={props.language} />
            <Stepper label="v" value={state.v} min={PROFIT_LIMITS.v.min} max={PROFIT_LIMITS.v.max} step={PROFIT_LIMITS.v.step} onChange={(v) => setState((s) => setProfit(s, { v }))} language={props.language} />
            <Segmented<string> label="c" value={String(state.curve)} options={PROFIT_CURVES.map((value, index) => ({ value: String(index), label: decimalLabel(value, props.language) }))} onChange={(curve) => setState((s) => setProfit(s, { curve: Number(curve) }))} />
            <Stepper label="F" value={state.F} min={PROFIT_LIMITS.F.min} max={PROFIT_LIMITS.F.max} step={PROFIT_LIMITS.F.step} onChange={(F) => setState((s) => setProfit(s, { F }))} language={props.language} />
            <Stepper label="x" value={state.x} min={PROFIT_LIMITS.x.min} max={PROFIT_LIMITS.x.max} onChange={(x) => setState((s) => setProfit(s, { x }))} language={props.language} />
        </>
    )
    const readout = (
        <Predict
            language={props.language}
            question={say(`Ikusi aurretik: ${state.x} unitate ekoiztuta, beste bat egiteak mozkina igo, berdin utzi ala jaitsi egiten du?`, `Antes de verlo: con ${state.x} unidades, ¿fabricar una más sube, deja igual o baja el beneficio?`, `قبل أن ترى: مع ${state.x} وحدة، هل صنع وحدة إضافية يرفع الربح أم يبقيه أم يخفضه؟`, `Before you see it: with ${state.x} units, does making one more raise, keep or lower the profit?`)}
            labels={{ '<': say('Jaitsi', 'Baja', 'يخفضه', 'Lowers it'), '=': say('Berdin: maximoa', 'Igual: es el máximo', 'يبقيه: القيمة العظمى', 'Keeps it: the maximum'), '>': say('Igo', 'Sube', 'يرفعه', 'Raises it') }}
            actual={profitPrediction(state)}
            choice={state.prediction}
            tip={say('Alderatu unitate baten diru-sarrera, $p$, haren kostu marjinalarekin, $v+2c\\cdot x$.', 'Compara el ingreso de una unidad, $p$, con su coste marginal, $v+2c\\cdot x$.', 'قارن إيراد الوحدة $p$ بتكلفتها الحدية $v+2c\\cdot x$.', 'Compare the revenue of a unit, $p$, with its marginal cost, $v+2c\\cdot x$.')}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout
                latex={[`B(x)=${state.p}x-(${c === 1 ? '' : t(c)}x^2+${state.v}x+${state.F})`, `B'(${state.x})=${t(profitSlope(state, state.x))}`, best >= 0 ? `x=\\frac{p-v}{2c}=${t(best)}` : `p-v=${state.p - state.v}<0`]}
                note={l(say('Urdina: diru-sarrera. Gorria: kostua. Berdea: mozkina.', 'Azul: ingreso. Rojo: coste. Verde: beneficio.', 'الأزرق: الإيراد. والأحمر: التكلفة. والأخضر: الربح.', 'Blue: revenue. Red: cost. Green: profit.'))}
            />
        </Predict>
    )
    const yMarks = marks(top).flatMap((y) => [y, -y])
    const xMarks = [0, 5, 10, 15, 20, 25, 30]
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={profitChallenges} extraChallenges={profitExtra} state={state}>
            <Board height={292} label={l(say('Diru-sarrera, kostua eta mozkina', 'Ingreso, coste y beneficio', 'الإيراد والتكلفة والربح', 'Revenue, cost and profit'))}>
                <rect x={X(0)} y={Y(top)} width={X(PROFIT_X) - X(0)} height={Y(bottom) - Y(top)} fill={PAPER} />
                {xMarks.map((x) => <line key={`gx${x}`} x1={X(x)} x2={X(x)} y1={Y(bottom)} y2={Y(top)} stroke={GRID} strokeWidth={1} />)}
                {yMarks.map((y) => <line key={`gy${y}`} x1={X(0)} x2={X(PROFIT_X)} y1={Y(y)} y2={Y(y)} stroke={GRID} strokeWidth={1} />)}
                <line x1={X(0)} x2={X(PROFIT_X + 1)} y1={Y(0)} y2={Y(0)} stroke={INK} strokeWidth={1.5} />
                <line x1={X(0)} x2={X(0)} y1={Y(bottom)} y2={Y(top)} stroke={INK} strokeWidth={1.5} />
                {xMarks.map((x) => <text key={`tx${x}`} x={X(x)} y={Y(0) + 15} textAnchor="middle" fontSize={12} fill={MUTED}>{x}</text>)}
                {yMarks.map((y) => <text key={`ty${y}`} x={X(0) - 5} y={Y(y) + 4} textAnchor="end" fontSize={11} fill={MUTED}>{y}</text>)}
                <path d={curvePath((x) => revenueAt(state, x), 0, PROFIT_X, X, Y, bottom, top)} fill="none" stroke={STAGE} strokeWidth={2.4} />
                <path d={curvePath((x) => profitCostAt(state, x), 0, PROFIT_X, X, Y, bottom, top)} fill="none" stroke={SECOND} strokeWidth={2.4} />
                <line x1={X(state.x)} x2={X(state.x)} y1={Y(bottom)} y2={Y(top)} stroke={INK} strokeWidth={1.3} strokeDasharray="4 3" />
                {shown && <path d={curvePath((x) => profitAt(state, x), 0, PROFIT_X, X, Y, bottom, top)} fill="none" stroke={GREEN} strokeWidth={3.6} />}
                {shown && best >= 0 && best <= PROFIT_X && <circle cx={X(best)} cy={Y(profitAt(state, best))} r={6} fill={MUSTARD} stroke={PAPER} strokeWidth={1.5} />}
                {shown && profitAt(state, walker) >= bottom && profitAt(state, walker) <= top && <circle cx={X(walker)} cy={Y(profitAt(state, walker))} r={7} fill={progress >= 1 ? GREEN : MUSTARD} stroke={PAPER} strokeWidth={1.6} />}
                {!shown && <Hidden x={X(state.x > 22 ? state.x - 5 : state.x + 5)} y={Y((top + bottom) / 2)} size={26} />}
            </Board>
            <PlayButton label={l(say('Ekoizpena aurrera', 'Avanza la producción', 'تقدّم الإنتاج', 'Run the production'))} disabled={!shown} playing={playback.playing} onPlay={playback.play} />
        </ToolFrame>
    )
}
