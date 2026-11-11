import { useId, useState } from 'react'
import { Segmented, Stepper, ToolFrame } from '../../../features/unit-v2/lab/LabKit'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import { useLabText } from '../../../features/unit-v2/lab/useLabText'
import type { LocalizedText, UnitLanguage } from '../../../features/unit-v2/types'
import { localize, say } from '../../batx1-zientziak-funtzioak/text'
import { Board, Hidden, Predict, Readout } from '../../dbh3-segidak/lab/LabParts'
import { dec, GREEN, INK, MUTED, PAPER, SECOND, STAGE, texDec } from '../../dbh3-segidak/lab/labStyle'
import { setPrediction } from '../../dbh3-segidak/lab/prediction'
import { ASYMPTOTE_CURVES, ASYMPTOTE_SETUP, asymptoteChallenges, asymptoteExtra, asymptoteLatex, asymptotePrediction, asymptoteReading, initialAsymptoteState, setAsymptote, type AsymptoteCurve, type AsymptoteState } from './asymptote'
import { C_LIMITS, DERIVATIVE_SETUP, derivativeChallenges, derivativeExtra, derivativePrediction, derivativeReading, DERIVATIVES, initialDerivativeState, setDerivative, type DerivativeId, type DerivativeState } from './fromDerivative'
import { initialMirrorState, MIRROR_FUNCTIONS, MIRROR_MODES, MIRROR_SETUP, MIRROR_XS, mirrorChallenges, mirrorCorners, mirrorExtra, mirrorLatex, mirrorPrediction, mirrorValue, setMirror, type MirrorFunction, type MirrorMode, type MirrorState } from './mirror'
import { copyLatex, copyMatches, copyValue, initialSymmetryState, setSymmetry, SHIFT_LIMITS, SYMMETRY_FUNCTIONS, SYMMETRY_MODES, SYMMETRY_SETUP, symmetryChallenges, symmetryExtra, symmetryPrediction, type SymmetryFunction, type SymmetryMode, type SymmetryState } from './symmetry'

/* ==========================================================================
   Funtzioen adierazpena · Batxilergoa 2 · Zientziak — the four tools of
   this unit: the curve and its asymptote, the mirror of the absolute
   value, from f′ to f, and symmetry and period. Each asks for a
   prediction before it shows the answer on the board. The boards carry
   numbers and formulas only (the svg is left to right); the words go in
   the readout. Logic in asymptote.ts, mirror.ts, fromDerivative.ts and
   symmetry.ts. curvePath, Grid (with a step for its lines) and useClip
   are copies of those of Aplikazioak 2.º, which does not export them.
   ========================================================================== */

const VIOLET = '#7a4fc9'

const minus = (value: number) => (value < 0 ? `−${-value}` : String(value))
/** A number for the board, with the language's decimal mark and a real minus sign */
const num = (value: number, language: UnitLanguage, digits = 3) => dec(value, language, digits).replace('-', '−')

interface View { xMin: number; xMax: number; yMin: number; yMax: number }

/** A curve as an SVG path, broken where it does not exist, leaves the band or jumps */
function curvePath(fn: (x: number) => number | null, from: number, to: number, X: (x: number) => number, Y: (y: number) => number, yLimit: [number, number], step = 0.02): string {
    const [low, high] = yLimit
    const margin = (high - low) / 2
    let path = ''
    let open = false
    let previous: number | null = null
    for (let x = from; x <= to + 1e-9; x += step) {
        const y = fn(x)
        const outside = y === null || !Number.isFinite(y) || y < low - margin || y > high + margin
        if (outside || (previous !== null && Math.abs(y - previous) > margin)) {
            open = false
            previous = outside ? null : y
            continue
        }
        path += `${open ? 'L' : 'M'} ${X(x).toFixed(1)} ${Y(y).toFixed(1)} `
        open = true
        previous = y
    }
    return path
}

/** A light grid with the axes, a line every `lineStep` units and the numbers every `xStep` and `yStep` */
function Grid({ xMin, xMax, yMin, yMax, X, Y, lineStep = 1, xStep = 1, yStep = 1 }: View & { X: (x: number) => number; Y: (y: number) => number; lineStep?: number; xStep?: number; yStep?: number }) {
    const multiples = (from: number, to: number, step: number) => {
        const out: number[] = []
        for (let value = Math.ceil(from / step) * step; value <= to + 1e-9; value += step) out.push(Math.round(value * 1000) / 1000)
        return out
    }
    const axisY = Y(Math.min(yMax, Math.max(yMin, 0)))
    const axisX = X(Math.min(xMax, Math.max(xMin, 0)))
    return (
        <g>
            <rect x={X(xMin)} y={Y(yMax)} width={X(xMax) - X(xMin)} height={Y(yMin) - Y(yMax)} fill={PAPER} />
            {multiples(xMin, xMax, lineStep).map((x) => <line key={`x${x}`} x1={X(x)} x2={X(x)} y1={Y(yMin)} y2={Y(yMax)} stroke="#e6dfd2" strokeWidth={1} />)}
            {multiples(yMin, yMax, lineStep).map((y) => <line key={`y${y}`} x1={X(xMin)} x2={X(xMax)} y1={Y(y)} y2={Y(y)} stroke="#e6dfd2" strokeWidth={1} />)}
            <line x1={X(xMin)} x2={X(xMax)} y1={axisY} y2={axisY} stroke={INK} strokeWidth={1.4} />
            <line x1={axisX} x2={axisX} y1={Y(yMin)} y2={Y(yMax)} stroke={INK} strokeWidth={1.4} />
            {multiples(xMin, xMax, xStep).filter((x) => x !== 0 && x > xMin && x < xMax).map((x) => <text key={`tx${x}`} x={X(x)} y={axisY + 14} textAnchor="middle" fontSize={12} fill={MUTED}>{minus(x)}</text>)}
            {multiples(yMin, yMax, yStep).filter((y) => y !== 0 && y > yMin && y < yMax).map((y) => <text key={`ty${y}`} x={axisX - 5} y={Y(y) + 4} textAnchor="end" fontSize={12} fill={MUTED}>{minus(y)}</text>)}
        </g>
    )
}

/** A clip path for the plotting area, so that curves stop at its edges */
function useClip(x: number, y: number, width: number, height: number) {
    const id = useId().replace(/:/g, '')
    return { defs: <defs><clipPath id={id}><rect x={x} y={y} width={width} height={height} /></clipPath></defs>, url: `url(#${id})` }
}

const Open = ({ x, y, color }: { x: number; y: number; color: string }) => <circle cx={x} cy={y} r={5.5} fill={PAPER} stroke={color} strokeWidth={2.4} />
const Full = ({ x, y, color }: { x: number; y: number; color: string }) => <circle cx={x} cy={y} r={5.5} fill={color} stroke={PAPER} strokeWidth={1.2} />

/** A plot area 300 wide and `height` high inside a 360-wide board, starting at `top` */
function frame(view: View, top = 20, height = 200) {
    const X = (x: number) => 40 + ((x - view.xMin) * 300) / (view.xMax - view.xMin)
    const Y = (y: number) => top + ((view.yMax - y) * height) / (view.yMax - view.yMin)
    return { X, Y }
}

const FUNCTION = say('Funtzioa', 'Función', 'الدالة', 'Function')

/* ---------- L1. The curve and its asymptote ---------- */

const ASYMPTOTE_NAMES: Record<AsymptoteCurve, string> = { g1: 'g₁', g2: 'g₂', g3: 'g₃', g4: 'g₄', g5: 'g₅' }

/** The view follows x₀: it zooms out as x₀ moves away from the origin */
function asymptoteView(curve: AsymptoteCurve, x0: number): View & { step: number; yStep: number } {
    const H = Math.max(6, 1.2 * Math.abs(x0))
    const step = H <= 6 ? 2 : H <= 12 ? 4 : 10
    const setup = ASYMPTOTE_SETUP[curve]
    if (setup.right[0] === 0) return { xMin: -H, xMax: H, yMin: setup.right[1] - 3, yMax: setup.right[1] + 3, step, yStep: 1 }
    return { xMin: -H, xMax: H, yMin: -1.05 * H, yMax: 1.05 * H, step, yStep: step }
}

export function AsymptoteTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<AsymptoteState>(initialAsymptoteState)
    const shown = state.prediction !== null
    const setup = ASYMPTOTE_SETUP[state.curve]
    const reading = asymptoteReading(state)
    const view = asymptoteView(state.curve, reading.x)
    const { X, Y } = frame(view)
    const clip = useClip(40, 20, 300, 200)
    const t = (value: number) => texDec(value, props.language, 3)
    const controls = (
        <>
            <Segmented<AsymptoteCurve> label={l(FUNCTION)} value={state.curve} options={ASYMPTOTE_CURVES.map((curve) => ({ value: curve, label: ASYMPTOTE_NAMES[curve] }))} onChange={(curve) => setState((s) => setAsymptote(s, { curve }))} />
            <Stepper label="x₀" value={state.x} min={0} max={setup.xs.length - 1} format={(k) => num(setup.xs[k], props.language)} onChange={(x) => setState((s) => setAsymptote(s, { x }))} language={props.language} />
        </>
    )
    const asymptote = asymptoteLatex(reading.asymptote)
    const d = reading.difference
    const note: LocalizedText = Math.abs(d) < 1e-9
        ? say('Puntu honetan kurbak bere asintota ebakitzen du.', 'En este punto la curva corta a su asíntota.', 'في هذه النقطة يقطع المنحنى مقاربه.', 'At this point the curve crosses its asymptote.')
        : d > 0
            ? say('Kendura positiboa da: kurba asintotaren gainetik doa. Urrundu ahala, kendura zerora hurbiltzen da.', 'La diferencia es positiva: la curva va por encima de la asíntota. Al alejarte, la diferencia se acerca a cero.', 'الفرق موجب: يسير المنحنى فوق المقارب. وكلما ابتعدت اقترب الفرق من الصفر.', 'The difference is positive: the curve runs above the asymptote. As you move away, the difference gets close to zero.')
            : say('Kendura negatiboa da: kurba asintotaren azpitik doa. Urrundu ahala, kendura zerora hurbiltzen da.', 'La diferencia es negativa: la curva va por debajo de la asíntota. Al alejarte, la diferencia se acerca a cero.', 'الفرق سالب: يسير المنحنى تحت المقارب. وكلما ابتعدت اقترب الفرق من الصفر.', 'The difference is negative: the curve runs below the asymptote. As you move away, the difference gets close to zero.')
    const readout = (
        <Predict
            language={props.language}
            question={say(`Ikusi aurretik: $f(x)=${setup.latex}$ funtzioan, $x>0$ denean, nola doa kurba bere asintotarekiko?`, `Antes de verlo: en $f(x)=${setup.latex}$, para $x>0$, ¿cómo va la curva respecto de su asíntota?`, `قبل أن ترى: في $f(x)=${setup.latex}$ من أجل $x>0$، كيف يسير المنحنى بالنسبة إلى مقاربه؟`, `Before you see it: in $f(x)=${setup.latex}$, for $x>0$, how does the curve run relative to its asymptote?`)}
            labels={{ '<': say('Beti azpitik', 'Siempre por debajo', 'تحته دائمًا', 'Always below'), '=': say('Ebaki egiten du', 'La corta', 'يقطعه', 'It crosses it'), '>': say('Beti gainetik', 'Siempre por encima', 'فوقه دائمًا', 'Always above') }}
            actual={asymptotePrediction(state)}
            choice={state.prediction}
            tip={say('Begiratu $f(x)-(mx+n)$ kenduraren zeinuari.', 'Mira el signo de la diferencia $f(x)-(mx+n)$.', 'انظر إلى إشارة الفرق $f(x)-(mx+n)$.', 'Look at the sign of the difference $f(x)-(mx+n)$.')}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout latex={[`f(x)=${setup.latex}\\qquad ${asymptote}`, `x_0=${t(reading.x)}`, `f(x_0)-(mx_0+n)=${t(d)}`]} note={l(note)} />
        </Predict>
    )
    const asymptoteValue = (x: number) => { const [m, n] = x < 0 ? setup.left : setup.right; return m * x + n }
    // The gap between the curve and the asymptote, in runs of the same sign
    const runs: Array<{ above: boolean; points: Array<[number, number, number]> }> = []
    const steps = 360
    for (let i = 0; i <= steps; i++) {
        const x = view.xMin + ((view.xMax - view.xMin) * i) / steps
        const y = setup.f(x)
        const a = asymptoteValue(x)
        const bad = !Number.isFinite(y) || ((state.curve === 'g1' || state.curve === 'g2') && Math.abs(x) < (0.04 * (view.xMax - view.xMin)) / 12)
        const above = y > a
        const last = runs[runs.length - 1]
        if (bad) { runs.push({ above, points: [] }); continue }
        if (!last || last.above !== above || !last.points.length) runs.push({ above, points: [[x, y, a]] })
        else last.points.push([x, y, a])
    }
    const clampY = (y: number) => Math.min(view.yMax + 50, Math.max(view.yMin - 50, y))
    const polygon = (points: Array<[number, number, number]>) => [...points.map(([x, y]) => `${X(x).toFixed(1)},${Y(clampY(y)).toFixed(1)}`), ...[...points].reverse().map(([x, , a]) => `${X(x).toFixed(1)},${Y(clampY(a)).toFixed(1)}`)].join(' ')
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={asymptoteChallenges} extraChallenges={asymptoteExtra} state={state}>
            <Board height={244} label={l(say(`${ASYMPTOTE_NAMES[state.curve]} kurba, haren asintota eta x₀ puntua`, `La curva ${ASYMPTOTE_NAMES[state.curve]}, su asíntota y el punto x₀`, `المنحنى ${ASYMPTOTE_NAMES[state.curve]} ومقاربه والنقطة x₀`, `The curve ${ASYMPTOTE_NAMES[state.curve]}, its asymptote and the point x₀`))}>
                {clip.defs}
                <Grid {...view} X={X} Y={Y} lineStep={view.step / 2} xStep={view.step} yStep={view.yStep} />
                <g clipPath={clip.url}>
                    {shown && runs.filter((run) => run.points.length > 1).map((run, index) => <polygon key={index} points={polygon(run.points)} fill={run.above ? GREEN : SECOND} opacity={0.28} />)}
                    {setup.left[0] === setup.right[0] && setup.left[1] === setup.right[1]
                        ? <line x1={X(view.xMin)} y1={Y(asymptoteValue(view.xMin))} x2={X(view.xMax)} y2={Y(asymptoteValue(view.xMax))} stroke={INK} strokeWidth={2} strokeDasharray="7 5" />
                        : <>
                            <line x1={X(0)} y1={Y(asymptoteValue(0))} x2={X(view.xMax)} y2={Y(asymptoteValue(view.xMax))} stroke={INK} strokeWidth={2} strokeDasharray="7 5" />
                            <line x1={X(view.xMin)} y1={Y(asymptoteValue(view.xMin))} x2={X(-1e-9)} y2={Y(asymptoteValue(-1e-9))} stroke={INK} strokeWidth={2} strokeDasharray="7 5" />
                        </>}
                    <path d={curvePath(setup.f, view.xMin, view.xMax, X, Y, [view.yMin, view.yMax], (view.xMax - view.xMin) / 600)} fill="none" stroke={STAGE} strokeWidth={3} />
                    <line x1={X(reading.x)} y1={Y(reading.y)} x2={X(reading.x)} y2={Y(asymptoteValue(reading.x))} stroke={INK} strokeWidth={2.4} />
                </g>
                <Full x={X(reading.x)} y={Y(Math.min(view.yMax, Math.max(view.yMin, reading.y)))} color={INK} />
                <text x={X(reading.x)} y={236} textAnchor="middle" fontSize={13} fontWeight={700} fill={INK}>x₀</text>
                {!shown && <Hidden x={X(view.xMax) - 26} y={56} />}
            </Board>
        </ToolFrame>
    )
}

/* ---------- L2. The mirror of the absolute value ---------- */

const MIRROR_NAMES: Record<MirrorFunction, string> = { f1: 'f₁', f2: 'f₂', f3: 'f₃', f4: 'f₄', f5: 'f₅' }
const MODE_NAMES: Record<MirrorMode, string> = { f: 'f(x)', abs: '|f(x)|', even: 'f(|x|)' }

export function MirrorTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<MirrorState>(initialMirrorState)
    const shown = state.prediction !== null
    const setup = MIRROR_SETUP[state.fn]
    const view = { xMin: -4.5, xMax: 4.5, ...setup.view }
    const { X, Y } = frame(view)
    const clip = useClip(40, 20, 300, 200)
    const t = (value: number) => texDec(value, props.language, 3)
    const x0 = MIRROR_XS[state.x]
    const y0 = mirrorValue(state.fn, state.mode, x0)
    const corners = mirrorCorners(state.fn, state.mode)
    const onCorner = corners.some((c) => Math.abs(c - x0) < 1e-9)
    const visible = state.mode === 'f' || shown
    const controls = (
        <>
            <Segmented<MirrorFunction> label={l(FUNCTION)} value={state.fn} options={MIRROR_FUNCTIONS.map((fn) => ({ value: fn, label: MIRROR_NAMES[fn] }))} onChange={(fn) => setState((s) => setMirror(s, { fn }))} />
            <Segmented<MirrorMode> label={l(say('Ikusi', 'Ver', 'اعرض', 'Show'))} value={state.mode} options={MIRROR_MODES.map((mode) => ({ value: mode, label: MODE_NAMES[mode] }))} onChange={(mode) => setState((s) => setMirror(s, { mode }))} />
            <Stepper label="x₀" value={state.x} min={0} max={MIRROR_XS.length - 1} format={(k) => num(MIRROR_XS[k], props.language)} onChange={(x) => setState((s) => setMirror(s, { x }))} language={props.language} />
        </>
    )
    const count = String(corners.length)
    const note: LocalizedText = state.mode === 'f'
        ? say('Aukeratu $|f(x)|$ edo $f(|x|)$ ispilua ikusteko.', 'Elige $|f(x)|$ o $f(|x|)$ para ver el espejo.', 'اختر $|f(x)|$ أو $f(|x|)$ لترى المرآة.', 'Choose $|f(x)|$ or $f(|x|)$ to see the mirror.')
        : onCorner
            ? say(`Puntua punta batean dago: han grafikoa ez da deribagarria. Punta kopurua: ${count}.`, `El punto está en un pico: ahí la gráfica no es derivable. Picos: ${count}.`, `النقطة على زاوية: هناك لا يكون الرسم قابلًا للاشتقاق. عدد الزوايا: ${count}.`, `The point is on a corner: there the graph is not differentiable. Corners: ${count}.`)
            : state.mode === 'abs'
                ? say(`$|f(x)|$ funtzioak $X$ ardatzaren azpikoa gora islatzen du. Punta kopurua: ${count}.`, `$|f(x)|$ refleja hacia arriba lo que está bajo el eje $X$. Picos: ${count}.`, `تعكس $|f(x)|$ ما تحت المحور $X$ إلى الأعلى. عدد الزوايا: ${count}.`, `$|f(x)|$ reflects upwards what is below the $X$ axis. Corners: ${count}.`)
                : say(`$f(|x|)$ funtzioak $x\\ge 0$ duen zatia ezkerrera kopiatzen du. Punta kopurua: ${count}.`, `$f(|x|)$ copia a la izquierda la parte con $x\\ge 0$. Picos: ${count}.`, `تنسخ $f(|x|)$ الجزء الذي فيه $x\\ge 0$ إلى اليسار. عدد الزوايا: ${count}.`, `$f(|x|)$ copies the part with $x\\ge 0$ to the left. Corners: ${count}.`)
    const readout = (
        <Predict
            language={props.language}
            question={say(`Ikusi aurretik: $f(x)=${setup.latex}$ bada, zenbat punta izango ditu $|f(x)|$ funtzioak?`, `Antes de verlo: si $f(x)=${setup.latex}$, ¿cuántos picos tendrá $|f(x)|$?`, `قبل أن ترى: إذا كانت $f(x)=${setup.latex}$ فكم زاوية سيكون في $|f(x)|$؟`, `Before you see it: if $f(x)=${setup.latex}$, how many corners will $|f(x)|$ have?`)}
            labels={{ '<': say('Bi baino gutxiago', 'Menos de dos', 'أقل من اثنتين', 'Fewer than two'), '=': say('Bi', 'Dos', 'اثنتان', 'Two'), '>': say('Bi baino gehiago', 'Más de dos', 'أكثر من اثنتين', 'More than two') }}
            actual={mirrorPrediction(state)}
            choice={state.prediction}
            tip={say('Punta bat dago $f$ funtzioak zeinua aldatzen duen zero bakoitzean.', 'Hay un pico en cada cero donde $f$ cambia de signo.', 'توجد زاوية عند كل صفر تغيّر فيه $f$ إشارتها.', 'There is a corner at each zero where $f$ changes sign.')}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout latex={[mirrorLatex(state.fn, state.mode), `x_0=${t(x0)}\\qquad y=${t(y0)}`, ...(corners.length ? [corners.map((c) => `x=${t(c)}`).join(',\\ ')] : [])]} note={l(note)} />
        </Predict>
    )
    const band: [number, number] = [view.yMin, view.yMax]
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={mirrorChallenges} extraChallenges={mirrorExtra} state={state}>
            <Board height={244} label={l(say(`${MIRROR_NAMES[state.fn]} funtzioa eta ${MODE_NAMES[state.mode]} ikuspegia`, `La función ${MIRROR_NAMES[state.fn]} y la vista ${MODE_NAMES[state.mode]}`, `الدالة ${MIRROR_NAMES[state.fn]} والعرض ${MODE_NAMES[state.mode]}`, `The function ${MIRROR_NAMES[state.fn]} and the view ${MODE_NAMES[state.mode]}`))}>
                {clip.defs}
                <Grid {...view} X={X} Y={Y} xStep={2} yStep={2} />
                <g clipPath={clip.url}>
                    {state.mode !== 'f' && <path d={curvePath(setup.f, view.xMin, view.xMax, X, Y, band)} fill="none" stroke={INK} strokeWidth={2} strokeDasharray="6 5" opacity={0.7} />}
                    {visible && <path d={curvePath((x) => mirrorValue(state.fn, state.mode, x), view.xMin, view.xMax, X, Y, band, 0.01)} fill="none" stroke={STAGE} strokeWidth={3.2} />}
                </g>
                {visible && corners.map((c) => <Full key={c} x={X(c)} y={Y(mirrorValue(state.fn, state.mode, c))} color={SECOND} />)}
                {visible && y0 >= view.yMin && y0 <= view.yMax && <Full x={X(x0)} y={Y(y0)} color={VIOLET} />}
                {visible && <text x={X(x0)} y={236} textAnchor="middle" fontSize={13} fontWeight={700} fill={VIOLET}>x₀</text>}
                {!visible && <Hidden x={300} y={56} />}
            </Board>
        </ToolFrame>
    )
}

/* ---------- L3. From f′ to f ---------- */

const DERIVATIVE_NAMES: Record<DerivativeId, string> = { d1: 'f′₁', d2: 'f′₂', d3: 'f′₃', d4: 'f′₄', d5: 'f′₅' }

/** f(x) = F(x) + C written out */
const withC = (latex: string, C: number) => (C === 0 ? latex : `${latex}${C > 0 ? '+' : '-'}${Math.abs(C)}`)

export function DerivativeTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<DerivativeState>(initialDerivativeState)
    const shown = state.prediction !== null
    const setup = DERIVATIVE_SETUP[state.fn]
    const xMin = setup.xs[0]
    const xMax = setup.xs[setup.xs.length - 1]
    const top: View = { xMin, xMax, yMin: -5, yMax: 5 }
    const bottom: View = { xMin, xMax, yMin: -6, yMax: 6 }
    const up = frame(top, 20, 130)
    const down = frame(bottom, 196, 130)
    const clipTop = useClip(40, 20, 300, 130)
    const clipBottom = useClip(40, 196, 300, 130)
    const reading = derivativeReading(state)
    const t = (value: number) => texDec(value, props.language, 3)
    const f = (x: number) => setup.F(x) + state.C
    const controls = (
        <>
            <Segmented<DerivativeId> label={l(say('Deribatua', 'Derivada', 'المشتقة', 'Derivative'))} value={state.fn} options={DERIVATIVES.map((fn) => ({ value: fn, label: DERIVATIVE_NAMES[fn] }))} onChange={(fn) => setState((s) => setDerivative(s, { fn }))} />
            <Stepper label="x₀" value={state.x} min={0} max={setup.xs.length - 1} format={(k) => num(setup.xs[k], props.language)} onChange={(x) => setState((s) => setDerivative(s, { x }))} language={props.language} />
            <Stepper label="C = f(0)" value={state.C} min={C_LIMITS.min} max={C_LIMITS.max} format={minus} onChange={(C) => setState((s) => setDerivative(s, { C }))} language={props.language} />
        </>
    )
    const notes: Record<typeof reading.kind, LocalizedText> = {
        rises: say('$f\'>0$: $f$ gorakorra da puntu honetan.', '$f\'>0$: $f$ crece en este punto.', '$f\'>0$: تتزايد $f$ عند هذه النقطة.', '$f\'>0$: $f$ increases at this point.'),
        falls: say('$f\'<0$: $f$ beherakorra da puntu honetan.', '$f\'<0$: $f$ decrece en este punto.', '$f\'<0$: تتناقص $f$ عند هذه النقطة.', '$f\'<0$: $f$ decreases at this point.'),
        max: say('$f\'$ deribatua $+$ zeinutik $-$ zeinura pasatzen da: $f$ funtzioak maximo bat du.', '$f\'$ pasa de $+$ a $-$: $f$ tiene un máximo.', 'تنتقل $f\'$ من $+$ إلى $-$: لـ $f$ قيمة عظمى.', '$f\'$ goes from $+$ to $-$: $f$ has a maximum.'),
        min: say('$f\'$ deribatua $-$ zeinutik $+$ zeinura pasatzen da: $f$ funtzioak minimo bat du.', '$f\'$ pasa de $-$ a $+$: $f$ tiene un mínimo.', 'تنتقل $f\'$ من $-$ إلى $+$: لـ $f$ قيمة صغرى.', '$f\'$ goes from $-$ to $+$: $f$ has a minimum.')
    }
    const readout = (
        <Predict
            language={props.language}
            question={say(`Ikusi aurretik: $f'(x)=${setup.fpLatex}$ bada, non izango du $f$ funtzioak maximoa?`, `Antes de verlo: si $f'(x)=${setup.fpLatex}$, ¿dónde tendrá $f$ su máximo?`, `قبل أن ترى: إذا كانت $f'(x)=${setup.fpLatex}$ فأين ستكون القيمة العظمى لـ $f$؟`, `Before you see it: if $f'(x)=${setup.fpLatex}$, where will $f$ have its maximum?`)}
            labels={{ '<': say('x negatibo batean', 'En un x negativo', 'عند ⁦x⁩ سالبة', 'At a negative x'), '=': say('x = 0 puntuan', 'En x = 0', 'عند ⁦x = 0⁩', 'At x = 0'), '>': say('x positibo batean', 'En un x positivo', 'عند ⁦x⁩ موجبة', 'At a positive x') }}
            actual={derivativePrediction(state)}
            choice={state.prediction}
            tip={say('Maximoan $f\'$ deribatuak ardatza ebakitzen du, $+$ zeinutik $-$ zeinura.', 'En el máximo $f\'$ corta el eje pasando de $+$ a $-$.', 'عند القيمة العظمى تقطع $f\'$ المحور منتقلة من $+$ إلى $-$.', 'At the maximum $f\'$ crosses the axis going from $+$ to $-$.')}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout latex={[`f'(x)=${setup.fpLatex}`, `f(x)=${withC(setup.FLatex, state.C)}`, `x_0=${t(reading.x)}`, `f'(x_0)=${texDec(reading.slope, props.language, 2)}\\quad f(x_0)=${texDec(reading.y, props.language, 2)}`]} note={l(notes[reading.kind])} />
        </Predict>
    )
    const passed = (list: number[]) => list.filter((x) => x <= reading.x + 1e-9)
    const inBand = (y: number) => y >= bottom.yMin && y <= bottom.yMax
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={derivativeChallenges} extraChallenges={derivativeExtra} state={state}>
            <Board height={346} label={l(say(`Goian ${DERIVATIVE_NAMES[state.fn]} deribatua; behean f, x₀ puntura arte marraztuta`, `Arriba la derivada ${DERIVATIVE_NAMES[state.fn]}; abajo f, dibujada hasta x₀`, `في الأعلى المشتقة ${DERIVATIVE_NAMES[state.fn]}؛ وفي الأسفل f مرسومة حتى x₀`, `Above, the derivative ${DERIVATIVE_NAMES[state.fn]}; below, f, drawn up to x₀`))}>
                {clipTop.defs}
                {clipBottom.defs}
                <Grid {...top} X={up.X} Y={up.Y} xStep={1} yStep={2} />
                <g clipPath={clipTop.url}>
                    <path d={curvePath(setup.fp, xMin, xMax, up.X, up.Y, [top.yMin, top.yMax])} fill="none" stroke={INK} strokeWidth={3} />
                </g>
                <text x={46} y={36} fontSize={14} fontWeight={700} fill={INK}>f′</text>
                <line x1={up.X(reading.x)} x2={up.X(reading.x)} y1={20} y2={326} stroke={SECOND} strokeWidth={1.6} strokeDasharray="5 4" />
                {reading.slope >= top.yMin && reading.slope <= top.yMax && <Full x={up.X(reading.x)} y={up.Y(reading.slope)} color={SECOND} />}
                <Grid {...bottom} X={down.X} Y={down.Y} xStep={1} yStep={2} />
                <text x={46} y={212} fontSize={14} fontWeight={700} fill={STAGE}>f</text>
                {shown
                    ? <>
                        <g clipPath={clipBottom.url}>
                            <path d={curvePath(f, xMin, xMax, down.X, down.Y, [bottom.yMin, bottom.yMax])} fill="none" stroke={STAGE} strokeWidth={1.6} strokeDasharray="4 6" opacity={0.45} />
                            <path d={curvePath(f, xMin, reading.x, down.X, down.Y, [bottom.yMin, bottom.yMax], 0.01)} fill="none" stroke={STAGE} strokeWidth={3.4} />
                        </g>
                        {[...passed(setup.maxima), ...passed(setup.minima)].filter((x) => inBand(f(x))).map((x) => <Full key={`e${x}`} x={down.X(x)} y={down.Y(f(x))} color={VIOLET} />)}
                        {passed(setup.inflections).filter((x) => inBand(f(x))).map((x) => <Open key={`i${x}`} x={down.X(x)} y={down.Y(f(x))} color={VIOLET} />)}
                        {inBand(reading.y) && <Full x={down.X(reading.x)} y={down.Y(reading.y)} color={SECOND} />}
                    </>
                    : <Hidden x={190} y={270} />}
                <text x={up.X(reading.x)} y={342} textAnchor="middle" fontSize={13} fontWeight={700} fill={SECOND}>x₀</text>
            </Board>
        </ToolFrame>
    )
}

/* ---------- L4. Symmetry and period ---------- */

const SYMMETRY_NAMES: Record<SymmetryFunction, string> = { s1: 's₁', s2: 's₂', s3: 's₃', s4: 's₄', s5: 's₅', s6: 's₆' }
const COPY_NAMES: Record<SymmetryMode, string> = { mirror: 'f(−x)', origin: '−f(−x)', shift: 'f(x + T)' }
const SHIFT_PLAIN = ['π/2', 'π', '3π/2', '2π']

export function SymmetryTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<SymmetryState>(initialSymmetryState)
    const shown = state.prediction !== null
    const setup = SYMMETRY_SETUP[state.fn]
    const view: View = { xMin: -6.5, xMax: 6.5, yMin: -3, yMax: 3 }
    const { X, Y } = frame(view)
    const clip = useClip(40, 20, 300, 200)
    const matches = copyMatches(state)
    const latex = localize(props.language, setup.latex)
    const controls = (
        <>
            <Segmented<SymmetryFunction> label={l(FUNCTION)} value={state.fn} options={SYMMETRY_FUNCTIONS.map((fn) => ({ value: fn, label: SYMMETRY_NAMES[fn] }))} onChange={(fn) => setState((s) => setSymmetry(s, { fn }))} />
            <Segmented<SymmetryMode> label={l(say('Kopia', 'Copia', 'النسخة', 'Copy'))} value={state.mode} options={SYMMETRY_MODES.map((mode) => ({ value: mode, label: COPY_NAMES[mode] }))} onChange={(mode) => setState((s) => setSymmetry(s, { mode }))} />
            {state.mode === 'shift' && <Stepper label="T" value={state.k} min={SHIFT_LIMITS.min} max={SHIFT_LIMITS.max} format={(k) => SHIFT_PLAIN[k - 1]} onChange={(k) => setState((s) => setSymmetry(s, { k }))} language={props.language} />}
        </>
    )
    const yes: Record<SymmetryMode, LocalizedText> = {
        mirror: say('Kopia kurbaren gainean erortzen da: $f(-x)=f(x)$, eta $f$ bikoitia da.', 'La copia cae sobre la curva: $f(-x)=f(x)$, y $f$ es par.', 'تقع النسخة على المنحنى: $f(-x)=f(x)$، و$f$ زوجية.', 'The copy falls on the curve: $f(-x)=f(x)$, and $f$ is even.'),
        origin: say('Kopia kurbaren gainean erortzen da: $-f(-x)=f(x)$, eta $f$ bakoitia da.', 'La copia cae sobre la curva: $-f(-x)=f(x)$, y $f$ es impar.', 'تقع النسخة على المنحنى: $-f(-x)=f(x)$، و$f$ فردية.', 'The copy falls on the curve: $-f(-x)=f(x)$, and $f$ is odd.'),
        shift: say('Kopia kurbaren gainean erortzen da: $T$ funtzioaren periodo bat da.', 'La copia cae sobre la curva: $T$ es un periodo de $f$.', 'تقع النسخة على المنحنى: $T$ دور للدالة $f$.', 'The copy falls on the curve: $T$ is a period of $f$.')
    }
    const no = say('Kopia ez da kurbaren gainean erortzen.', 'La copia no cae sobre la curva.', 'لا تقع النسخة على المنحنى.', 'The copy does not fall on the curve.')
    const readout = (
        <Predict
            language={props.language}
            question={say(`Ikusi aurretik: $f(x)=${setup.latex}$ bikoitia da, bakoitia ala ez bata ez bestea?`, `Antes de verlo: $f(x)=${setup.latex}$, ¿es par, impar o ninguna de las dos?`, `قبل أن ترى: هل $f(x)=${setup.latex}$ زوجية أم فردية أم لا هذه ولا تلك؟`, `Before you see it: is $f(x)=${setup.latex}$ even, odd or neither?`)}
            labels={{ '<': say('Bakoitia', 'Impar', 'فردية', 'Odd'), '=': say('Ez bata ez bestea', 'Ninguna', 'لا هذه ولا تلك', 'Neither'), '>': say('Bikoitia', 'Par', 'زوجية', 'Even') }}
            actual={symmetryPrediction(state)}
            choice={state.prediction}
            tip={say('Kalkulatu $f(-x)$ eta alderatu $f(x)$ eta $-f(x)$ funtzioekin.', 'Calcula $f(-x)$ y compárala con $f(x)$ y con $-f(x)$.', 'احسب $f(-x)$ وقارنها بـ $f(x)$ و$-f(x)$.', 'Work out $f(-x)$ and compare it with $f(x)$ and with $-f(x)$.')}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout latex={[`f(x)=${latex}`, copyLatex(state)]} note={l(matches ? yes[state.mode] : no)} />
        </Predict>
    )
    const band: [number, number] = [view.yMin, view.yMax]
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={symmetryChallenges} extraChallenges={symmetryExtra} state={state}>
            <Board height={244} label={l(say(`${SYMMETRY_NAMES[state.fn]} funtzioa eta haren ${COPY_NAMES[state.mode]} kopia`, `La función ${SYMMETRY_NAMES[state.fn]} y su copia ${COPY_NAMES[state.mode]}`, `الدالة ${SYMMETRY_NAMES[state.fn]} ونسختها ${COPY_NAMES[state.mode]}`, `The function ${SYMMETRY_NAMES[state.fn]} and its copy ${COPY_NAMES[state.mode]}`))}>
                {clip.defs}
                <Grid {...view} X={X} Y={Y} xStep={2} yStep={1} />
                <g clipPath={clip.url}>
                    <path d={curvePath(setup.f, view.xMin, view.xMax, X, Y, band, 0.01)} fill="none" stroke={STAGE} strokeWidth={3.4} />
                    {shown && <path d={curvePath((x) => copyValue(state, x), view.xMin, view.xMax, X, Y, band, 0.01)} fill="none" stroke={matches ? GREEN : SECOND} strokeWidth={2.6} strokeDasharray="7 5" />}
                </g>
                {[-2, -1, 1, 2].map((k) => <text key={k} x={X(k * Math.PI)} y={Y(0) - 8} textAnchor="middle" fontSize={11} fill={MUTED}>{k < 0 ? '−' : ''}{Math.abs(k) === 2 ? '2π' : 'π'}</text>)}
                {!shown && <Hidden x={300} y={56} />}
                {state.mode === 'shift' && shown && <text x={52} y={38} fontSize={13} fontWeight={700} fill={SECOND}>T = {SHIFT_PLAIN[state.k - 1]}</text>}
            </Board>
        </ToolFrame>
    )
}
