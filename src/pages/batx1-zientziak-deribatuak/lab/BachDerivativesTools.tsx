import { useId, useState } from 'react'
import { Segmented, Stepper, ToolFrame } from '../../../features/unit-v2/lab/LabKit'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import { useLabText } from '../../../features/unit-v2/lab/useLabText'
import type { LocalizedText, UnitLanguage } from '../../../features/unit-v2/types'
import { localize, say } from '../../batx1-zientziak-funtzioak/text'
import { Board, Hidden, PlayButton, Predict, Readout } from '../../dbh3-segidak/lab/LabParts'
import { dec, GREEN, INK, MUSTARD, MUTED, PAPER, SECOND, STAGE, texDec } from '../../dbh3-segidak/lab/labStyle'
import { setPrediction } from '../../dbh3-segidak/lab/prediction'
import { usePlayback } from '../../dbh4-aplikatuak-proportzionaltasuna/lab/usePlayback'
import { CHAIN_LIMITS, chainChallenges, chainExtra, chainPrediction, chainValues, initialChainState, INNER, INNER_MACHINES, OUTER, OUTER_MACHINES, setChain, type ChainState, type InnerMachine, type OuterMachine } from './chain'
import { initialSecantState, SECANT_FUNCTIONS, SECANT_H, SECANT_LIMITS, SECANT_SETUP, secantChallenges, secantExtra, secantPrediction, secantSlope, setSecant, tangentSlope, type SecantFunction, type SecantState } from './secant'
import { initialSlopeState, probeSlope, probeX, setSlope, SLOPE_FUNCTIONS, SLOPE_LIMITS, SLOPE_SETUP, slopeChallenges, slopeExtra, slopePrediction, type SlopeFunction, type SlopeState } from './slopeGraph'
import { initialSmoothState, lineLatex, pieceEnd, setSmooth, SMOOTH_JOIN, SMOOTH_LIMITS, SMOOTH_PIECES, SMOOTH_SETUP, smoothChallenges, smoothExtra, smoothKind, smoothLatex, smoothPrediction, type SmoothPiece, type SmoothState } from './smooth'

/* ==========================================================================
   Deribatuak · Batxilergoa 1 · Zientziak — the four tools of this unit:
   from the secant to the tangent, is it differentiable here?, the graph of
   f′ and the chain of machines. Each asks for a prediction before it shows
   the result, and each moves with ▶. The boards carry numbers and
   formulas only (the svg is left to right); the words go in the readout.
   Logic in secant.ts, smooth.ts, slopeGraph.ts and chain.ts.
   ========================================================================== */

const minus = (value: number) => (value < 0 ? `−${-value}` : String(value))
/** A formula kept left to right inside Arabic text (LRI … PDI) */
const ltr = (text: string) => `⁦${text}⁩`
/** A number for the board, with the language's decimal mark and a real minus sign */
const num = (value: number, language: UnitLanguage, digits = 3) => dec(value, language, digits).replace('-', '−')
/** sin is sen in Spanish */
const sine = (language: UnitLanguage) => (language === 'es' ? 'sen' : 'sin')

/** A curve as an SVG path, broken where it does not exist, leaves the band or jumps */
function curvePath(fn: (x: number) => number, from: number, to: number, X: (x: number) => number, Y: (y: number) => number, yLimit: [number, number], step = 0.02): string {
    const [low, high] = yLimit
    const margin = (high - low) / 2
    let path = ''
    let open = false
    let previous: number | null = null
    for (let x = from; x <= to + 1e-9; x += step) {
        const y = fn(x)
        const outside = !Number.isFinite(y) || y < low - margin || y > high + margin
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

/** A light grid with the axes and the numbers every `step` units */
function Grid({ xMin, xMax, yMin, yMax, X, Y, xStep = 1, yStep = 1 }: { xMin: number; xMax: number; yMin: number; yMax: number; X: (x: number) => number; Y: (y: number) => number; xStep?: number; yStep?: number }) {
    const xs = Array.from({ length: xMax - xMin + 1 }, (_, i) => xMin + i)
    const ys = Array.from({ length: yMax - yMin + 1 }, (_, i) => yMin + i)
    const axisY = Y(Math.min(yMax, Math.max(yMin, 0)))
    const axisX = X(Math.min(xMax, Math.max(xMin, 0)))
    return (
        <g>
            <rect x={X(xMin)} y={Y(yMax)} width={X(xMax) - X(xMin)} height={Y(yMin) - Y(yMax)} fill={PAPER} />
            {xs.map((x) => <line key={`x${x}`} x1={X(x)} x2={X(x)} y1={Y(yMin)} y2={Y(yMax)} stroke="#e6dfd2" strokeWidth={1} />)}
            {ys.map((y) => <line key={`y${y}`} x1={X(xMin)} x2={X(xMax)} y1={Y(y)} y2={Y(y)} stroke="#e6dfd2" strokeWidth={1} />)}
            <line x1={X(xMin)} x2={X(xMax)} y1={axisY} y2={axisY} stroke={INK} strokeWidth={1.4} />
            <line x1={axisX} x2={axisX} y1={Y(yMin)} y2={Y(yMax)} stroke={INK} strokeWidth={1.4} />
            {xs.filter((x) => x !== 0 && x % xStep === 0).map((x) => <text key={`tx${x}`} x={X(x)} y={axisY + 14} textAnchor="middle" fontSize={12} fill={MUTED}>{minus(x)}</text>)}
            {ys.filter((y) => y !== 0 && y % yStep === 0).map((y) => <text key={`ty${y}`} x={axisX - 5} y={Y(y) + 4} textAnchor="end" fontSize={12} fill={MUTED}>{minus(y)}</text>)}
        </g>
    )
}

/** A clip path for a plotting area, so that curves stop at its edges */
function useClip(x: number, y: number, width: number, height: number) {
    const id = useId().replace(/:/g, '')
    return { defs: <defs><clipPath id={id}><rect x={x} y={y} width={width} height={height} /></clipPath></defs>, url: `url(#${id})` }
}

const Dot = ({ x, y, color, r = 5.5 }: { x: number; y: number; color: string; r?: number }) => <circle cx={x} cy={y} r={r} fill={color} stroke={PAPER} strokeWidth={1.4} />
const Open = ({ x, y, color }: { x: number; y: number; color: string }) => <circle cx={x} cy={y} r={5.5} fill={PAPER} stroke={color} strokeWidth={2.4} />

/** A straight line through (x0, y0) with slope m, from x = from to x = to */
const lineThrough = (x0: number, y0: number, m: number, from: number, to: number, X: (x: number) => number, Y: (y: number) => number) => ({ x1: X(from), y1: Y(y0 + m * (from - x0)), x2: X(to), y2: Y(y0 + m * (to - x0)) })

/* ---------- L1. From the secant to the tangent ---------- */

const SECANT_LABEL: Record<SecantFunction, (language: UnitLanguage) => string> = { square: () => 'x²', cube: () => 'x³', root: () => '√x', sine: (language) => `${sine(language)} x` }

export function SecantTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<SecantState>(initialSecantState)
    const shown = state.prediction !== null
    const setup = SECANT_SETUP[state.fn]
    const { xMin, xMax, yMin, yMax } = setup.view
    const sx = 300 / (xMax - xMin)
    const sy = 200 / (yMax - yMin)
    const X = (x: number) => 40 + (x - xMin) * sx
    const Y = (y: number) => 20 + (yMax - y) * sy
    const clip = useClip(X(xMin), Y(yMax), 300, 200)
    const playback = usePlayback(`${state.fn}-${state.a}-${state.k}`, 1800)
    const target = SECANT_H[state.k]
    const progress = !shown ? 0 : playback.progress === null ? 1 : playback.progress
    // From h = 1 down to the chosen h, evenly on a log scale
    const h = shown ? target ** progress : 1
    const a = state.a
    const fa = setup.fn(a)
    const slope = secantSlope(state.fn, a, h)
    const tangent = tangentSlope(state.fn, a)
    const t = (value: number, digits = 4) => texDec(value, props.language, digits)
    const controls = (
        <>
            <Segmented<SecantFunction> label={l(say('Funtzioa', 'Función', 'الدالة', 'Function'))} value={state.fn} options={SECANT_FUNCTIONS.map((fn) => ({ value: fn, label: SECANT_LABEL[fn](props.language) }))} onChange={(fn) => setState((s) => setSecant(s, { fn }))} />
            <Stepper label={l(say('P puntua: a', 'Punto P: a', 'النقطة P: a', 'Point P: a'))} value={state.a} min={setup.aMin} max={setup.aMax} onChange={(value) => setState((s) => setSecant(s, { a: value }))} language={props.language} />
            <Stepper label={l(say('Q puntuaren distantzia: h', 'Distancia de Q: h', 'بعد Q: h', 'Distance to Q: h'))} value={state.k} min={SECANT_LIMITS.k.min} max={SECANT_LIMITS.k.max} format={(k) => num(SECANT_H[k], props.language)} onChange={(k) => setState((s) => setSecant(s, { k }))} language={props.language} />
        </>
    )
    const formula = localize(props.language, setup.latex)
    const note = say(
        `$h$ txikiagotzean, ebakitzailea zuzen ukitzailera hurbiltzen da: haren malda $f'(${a})=${t(tangent)}$ baliora doa.`,
        `Al encoger $h$, la secante se acerca a la tangente: su pendiente tiende a $f'(${a})=${t(tangent)}$.`,
        `عندما تصغر $h$ يقترب القاطع من المماس: يؤول ميله إلى $f'(${a})=${t(tangent)}$.`,
        `As $h$ shrinks, the secant approaches the tangent: its slope tends to $f'(${a})=${t(tangent)}$.`
    )
    const readout = (
        <Predict
            language={props.language}
            question={say(`Ikusi aurretik: $${formula}$ funtzioan, $x=${a}$ puntuan, zuzen ukitzailea $h=1$ duen ebakitzailea baino maldatsu gutxiago, berdin ala gehiago izango da?`, `Antes de verlo: en $${formula}$, en $x=${a}$, ¿la tangente será menos empinada, igual o más que la secante con $h=1$?`, `قبل أن ترى: في $${formula}$ عند $x=${a}$، هل سيكون المماس أقل انحدارًا من القاطع مع $h=1$ أم مثله أم أكثر؟`, `Before you see it: in $${formula}$, at $x=${a}$, will the tangent be less steep than, as steep as or steeper than the secant with $h=1$?`)}
            labels={{ '<': say('Maldatsu gutxiago', 'Menos empinada', 'أقل انحدارًا', 'Less steep'), '=': say('Berdin', 'Igual', 'مثله', 'The same'), '>': say('Maldatsuago', 'Más empinada', 'أكثر انحدارًا', 'Steeper') }}
            actual={secantPrediction(state)}
            choice={state.prediction}
            tip={say('Kurba gorantz irekitzen bada, ebakitzailea zuzen ukitzailearen gainetik geratzen da eskuinean, eta maldatsuagoa da; beherantz irekitzen bada, alderantziz.', 'Si la curva se abre hacia arriba, la secante queda por encima de la tangente a la derecha y es más empinada; si se abre hacia abajo, al revés.', 'إذا انفتح المنحنى إلى الأعلى بقي القاطع فوق المماس إلى اليمين وكان أشد انحدارًا؛ وإذا انفتح إلى الأسفل فالعكس.', 'If the curve opens upwards, the secant lies above the tangent on the right and is steeper; if it opens downwards, the other way round.')}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout latex={[`\\frac{f(${t(a + target)})-f(${a})}{${t(target)}}=${t(secantSlope(state.fn, a, target))}`, `f'(${a})=${t(tangent)}`]} note={l(note)} />
        </Predict>
    )
    const qx = a + h
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={secantChallenges} extraChallenges={secantExtra} state={state}>
            <Board height={250} label={l(say(`${SECANT_LABEL[state.fn](props.language)} eta haren ebakitzailea P eta Q puntuetatik`, `${SECANT_LABEL[state.fn](props.language)} y su secante por P y Q`, `${SECANT_LABEL[state.fn](props.language)} وقاطعه المار بـ P و Q`, `${SECANT_LABEL[state.fn](props.language)} and its secant through P and Q`))}>
                {clip.defs}
                <Grid xMin={xMin} xMax={xMax} yMin={yMin} yMax={yMax} X={X} Y={Y} yStep={yMax - yMin > 7 ? 2 : 1} />
                <g clipPath={clip.url}>
                    <path d={curvePath(setup.fn, Math.max(xMin, state.fn === 'root' ? 0 : xMin), xMax, X, Y, [yMin, yMax])} fill="none" stroke={STAGE} strokeWidth={3.2} strokeLinejoin="round" />
                    <line {...lineThrough(a, fa, slope, xMin, xMax, X, Y)} stroke={SECOND} strokeWidth={2.4} />
                    {shown && <line {...lineThrough(a, fa, tangent, xMin, xMax, X, Y)} stroke={GREEN} strokeWidth={2} strokeDasharray="6 4" />}
                </g>
                <Dot x={X(a)} y={Y(fa)} color={INK} />
                <Dot x={X(qx)} y={Y(setup.fn(qx))} color={SECOND} />
                <text x={X(a) - 8} y={Y(fa) - 10} textAnchor="end" fontSize={14} fontWeight={700} fill={INK}>P</text>
                {h > 0.08 && <text x={X(qx) + 8} y={Y(setup.fn(qx)) + 18} fontSize={14} fontWeight={700} fill={SECOND}>Q</text>}
                {!shown && <Hidden x={300} y={60} />}
                <text x={340} y={244} textAnchor="end" fontSize={14} fontWeight={700} fill={SECOND}>{`h = ${num(h, props.language)}\u00a0\u00a0\u00a0m = ${num(slope, props.language)}`}</text>
            </Board>
            <PlayButton label={l(say('Hurbildu Q', 'Acerca Q', 'قرّب Q', 'Bring Q in'))} disabled={!shown} playing={playback.playing} onPlay={playback.play} />
        </ToolFrame>
    )
}

/* ---------- L4. Is it differentiable here? ---------- */

const PIECE_LABEL: Record<SmoothPiece, string> = { square: 'x²', cubic: 'x³', cap: '4 − x²', flat: 'x³ − 3x' }
const KIND_TEXT: Record<'jump' | 'corner' | 'smooth', LocalizedText> = {
    jump: say('Jauzia: zuzena ez da zatiaren amaieratik abiatzen. Ez da jarraitua, ez deribagarria.', 'Salto: la recta no sale del final del trozo. Ni continua ni derivable.', 'قفزة: لا ينطلق المستقيم من نهاية الجزء. ليست متصلة ولا قابلة للاشتقاق.', 'A jump: the line does not start at the end of the piece. Neither continuous nor differentiable.'),
    corner: say('Punta: zatiak elkartzen dira, baina beste malda batekin. Jarraitua da, baina ez deribagarria.', 'Pico: los trozos se unen, pero con otra pendiente. Continua, pero no derivable.', 'زاوية: يلتقي الجزآن لكن بميل آخر. متصلة لكنها غير قابلة للاشتقاق.', 'A corner: the pieces meet, but with another slope. Continuous, but not differentiable.'),
    smooth: say('Leuna: balio bera eta malda bera. Deribagarria da 1 puntuan.', 'Suave: el mismo valor y la misma pendiente. Derivable en 1.', 'أملس: القيمة نفسها والميل نفسه. قابلة للاشتقاق عند 1.', 'Smooth: the same value and the same slope. Differentiable at 1.')
}

export function SmoothTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<SmoothState>(initialSmoothState)
    const shown = state.prediction !== null
    const [xMin, xMax, yMin, yMax] = [-2, 4, -4, 6]
    const sx = 300 / (xMax - xMin)
    const sy = 200 / (yMax - yMin)
    const X = (x: number) => 40 + (x - xMin) * sx
    const Y = (y: number) => 20 + (yMax - y) * sy
    const clip = useClip(X(xMin), Y(yMax), 300, 200)
    const playback = usePlayback(`${state.piece}-${state.m}-${state.n}`, 2400)
    const piece = SMOOTH_SETUP[state.piece]
    const end = pieceEnd(state.piece)
    const kind = smoothKind(state)
    const lineAt = (x: number) => state.m * x + state.n
    // ▶ walks a tangent from x = −1,5 along the piece and on along the line to x = 3
    const walker = shown && playback.progress !== null ? -1.5 + playback.progress * 4.5 : null
    const walkerPoint = walker === null ? null : walker < SMOOTH_JOIN ? { x: walker, y: piece.fn(walker), m: piece.derivative(walker) } : { x: walker, y: lineAt(walker), m: state.m }
    const controls = (
        <>
            <Segmented<SmoothPiece> label={l(say('Zatia, x < 1 denean', 'Trozo para x < 1', 'الجزء عندما x < 1', 'Piece for x < 1'))} value={state.piece} options={SMOOTH_PIECES.map((value) => ({ value, label: ltr(PIECE_LABEL[value]) }))} onChange={(value) => setState((s) => setSmooth(s, { piece: value }))} />
            <Stepper label={l(say('Zuzenaren malda: m', 'Pendiente de la recta: m', 'ميل المستقيم: m', 'Slope of the line: m'))} value={state.m} min={SMOOTH_LIMITS.m.min} max={SMOOTH_LIMITS.m.max} onChange={(m) => setState((s) => setSmooth(s, { m }))} language={props.language} />
            <Stepper label={l(say('Ordenatua jatorrian: n', 'Ordenada en el origen: n', 'المقطع الصادي: n', 'y-intercept: n'))} value={state.n} min={SMOOTH_LIMITS.n.min} max={SMOOTH_LIMITS.n.max} onChange={(n) => setState((s) => setSmooth(s, { n }))} language={props.language} />
        </>
    )
    const readout = (
        <Predict
            language={props.language}
            question={say(`Ikusi aurretik: $${piece.latex}$ zatia leun jarraitzeko, zuzenak beherantz egin behar du, horizontala izan ala gorantz egin?`, `Antes de verlo: para seguir sin pico al trozo $${piece.latex}$, ¿la recta tiene que bajar, ser horizontal o subir?`, `قبل أن ترى: لكي يتابع المستقيم الجزء $${piece.latex}$ دون زاوية، هل يجب أن ينزل أم يكون أفقيًّا أم يصعد؟`, `Before you see it: to carry on from the piece $${piece.latex}$ with no corner, must the line go down, be horizontal or go up?`)}
            labels={{ '<': say('Jaitsi', 'Bajar', 'ينزل', 'Go down'), '=': say('Horizontala', 'Horizontal', 'أفقي', 'Horizontal'), '>': say('Igo', 'Subir', 'يصعد', 'Go up') }}
            actual={smoothPrediction(state)}
            choice={state.prediction}
            tip={say('Zuzenak zatiaren malda bera izan behar du 1 puntuan: deribatu zatia eta ordezkatu $x=1$.', 'La recta tiene que llevar la pendiente del trozo en 1: deriva el trozo y sustituye $x=1$.', 'يجب أن يحمل المستقيم ميل الجزء عند 1: اشتق الجزء وعوّض $x=1$.', 'The line has to carry the slope of the piece at 1: differentiate the piece and substitute $x=1$.')}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout latex={[smoothLatex(state), `f(1^-)=${end.value}\\qquad f(1^+)=${state.m + state.n}`, `f'(1^-)=${end.slope}\\qquad f'(1^+)=${state.m}`]} note={l(KIND_TEXT[kind])} />
        </Predict>
    )
    const color = kind === 'smooth' ? GREEN : SECOND
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={smoothChallenges} extraChallenges={smoothExtra} state={state}>
            <Board height={250} label={l(say(`${PIECE_LABEL[state.piece]} zatia eta y = ${state.m}x + ${state.n} zuzena x = 1 puntuan`, `El trozo ${PIECE_LABEL[state.piece]} y la recta y = ${state.m}x + ${state.n} en x = 1`, `الجزء ${PIECE_LABEL[state.piece]} والمستقيم y = ${state.m}x + ${state.n} عند x = 1`, `The piece ${PIECE_LABEL[state.piece]} and the line y = ${state.m}x + ${state.n} at x = 1`))}>
                {clip.defs}
                <Grid xMin={xMin} xMax={xMax} yMin={yMin} yMax={yMax} X={X} Y={Y} yStep={2} />
                <line x1={X(SMOOTH_JOIN)} x2={X(SMOOTH_JOIN)} y1={Y(yMin)} y2={Y(yMax)} stroke={MUTED} strokeWidth={1.2} strokeDasharray="5 4" />
                <g clipPath={clip.url}>
                    <path d={curvePath(piece.fn, xMin, SMOOTH_JOIN, X, Y, [yMin, yMax])} fill="none" stroke={STAGE} strokeWidth={3.2} strokeLinejoin="round" />
                    {shown && <line x1={X(SMOOTH_JOIN)} y1={Y(lineAt(SMOOTH_JOIN))} x2={X(xMax)} y2={Y(lineAt(xMax))} stroke={color} strokeWidth={3.2} />}
                    {walkerPoint && <line {...lineThrough(walkerPoint.x, walkerPoint.y, walkerPoint.m, walkerPoint.x - 1.2, walkerPoint.x + 1.2, X, Y)} stroke={MUSTARD} strokeWidth={2.4} />}
                </g>
                {kind === 'jump' || !shown ? <Open x={X(SMOOTH_JOIN)} y={Y(end.value)} color={STAGE} /> : null}
                {shown && <Dot x={X(SMOOTH_JOIN)} y={Y(lineAt(SMOOTH_JOIN))} color={color} />}
                {walkerPoint && <Dot x={X(walkerPoint.x)} y={Y(walkerPoint.y)} color={MUSTARD} r={6} />}
                {!shown && <Hidden x={X(2.6)} y={Y(3)} />}
                <text x={340} y={244} textAnchor="end" fontSize={14} fontWeight={700} fill={shown ? color : MUTED}>{shown ? `y = ${lineLatex(state.m, state.n).replace(/-/g, '−')}` : `x = 1`}</text>
            </Board>
            <PlayButton label={l(say('Ibili zuzen ukitzailearekin', 'Recorre con la tangente', 'تجوّل بالمماس', 'Walk with the tangent'))} disabled={!shown} playing={playback.playing} onPlay={playback.play} />
        </ToolFrame>
    )
}

/* ---------- L3. The graph of f′ ---------- */

const SLOPE_NAMES: Record<SlopeFunction, string> = { parabola: 'f₁', cubic: 'f₂', hill: 'f₃', sine: 'f₄', exp: 'f₅' }

export function SlopeGraphTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<SlopeState>(initialSlopeState)
    const shown = state.prediction !== null
    const setup = SLOPE_SETUP[state.fn]
    const [xMin, xMax] = [-3, 3]
    const X = (x: number) => 40 + (x - xMin) * 50
    const [topMin, topMax] = setup.top
    const [bottomMin, bottomMax] = setup.bottom
    const Yt = (y: number) => 14 + (topMax - y) * (140 / (topMax - topMin))
    const Yb = (y: number) => 186 + (bottomMax - y) * (130 / (bottomMax - bottomMin))
    const topClip = useClip(X(xMin), Yt(topMax), 300, 140)
    const bottomClip = useClip(X(xMin), Yb(bottomMax), 300, 130)
    const playback = usePlayback(`${state.fn}-${state.t}`, 2600)
    const x = shown && playback.progress !== null ? xMin + playback.progress * (xMax - xMin) : probeX(state)
    const fx = setup.fn(x)
    const slope = setup.derivative(x)
    const controls = (
        <>
            <Segmented<SlopeFunction> label={l(say('Funtzioa', 'Función', 'الدالة', 'Function'))} value={state.fn} options={SLOPE_FUNCTIONS.map((fn) => ({ value: fn, label: SLOPE_NAMES[fn] }))} onChange={(fn) => setState((s) => setSlope(s, { fn }))} />
            <Stepper label={l(say('Zunda: x', 'Sonda: x', 'المسبار: x', 'Probe: x'))} value={state.t} min={SLOPE_LIMITS.t.min} max={SLOPE_LIMITS.t.max} format={(t) => num(t / 2, props.language, 1)} onChange={(t) => setState((s) => setSlope(s, { t }))} language={props.language} />
        </>
    )
    const t = (value: number) => texDec(value, props.language, 3)
    const formula = localize(props.language, setup.latex)
    const readout = (
        <Predict
            language={props.language}
            question={say(`Ikusi aurretik: $${formula}$ funtzioan, $x=${setup.p}$ puntuan, zuzen ukitzaileak beherantz egiten du, horizontala da ala gorantz egiten du?`, `Antes de verlo: en $${formula}$, en $x=${setup.p}$, ¿la tangente baja, es horizontal o sube?`, `قبل أن ترى: في $${formula}$ عند $x=${setup.p}$، هل ينزل المماس أم هو أفقي أم يصعد؟`, `Before you see it: in $${formula}$, at $x=${setup.p}$, does the tangent go down, is it horizontal or does it go up?`)}
            labels={{ '<': say('Jaisten da', 'Baja', 'ينزل', 'Goes down'), '=': say('Horizontala', 'Horizontal', 'أفقي', 'Horizontal'), '>': say('Igotzen da', 'Sube', 'يصعد', 'Goes up') }}
            actual={slopePrediction(state)}
            choice={state.prediction}
            tip={say(`Begiratu $f$ funtzioari $x=${setup.p}$ puntuaren inguruan: ezkerretik eskuinera igotzen bada, malda positiboa da.`, `Mira $f$ alrededor de $x=${setup.p}$: si sube de izquierda a derecha, la pendiente es positiva.`, `انظر إلى $f$ حول $x=${setup.p}$: إذا صعدت من اليسار إلى اليمين فالميل موجب.`, `Look at $f$ around $x=${setup.p}$: if it goes up from left to right, the slope is positive.`)}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout latex={[formula, localize(props.language, setup.derivativeLatex), `f'(${t(probeX(state))})=${t(probeSlope(state))}`]} note={l(say('Beheko planoan, puntu bakoitzaren altuera goiko kurbaren malda da puntu horretan.', 'En el plano de abajo, la altura de cada punto es la pendiente de la curva de arriba en ese punto.', 'في المستوى السفلي ارتفاع كل نقطة هو ميل المنحنى العلوي عند تلك النقطة.', 'On the lower plane, the height of each point is the slope of the upper curve at that point.'))} />
        </Predict>
    )
    const label = (y: number, text: string, color: string) => <text x={46} y={y} fontSize={15} fontWeight={700} fill={color}>{text}</text>
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={slopeChallenges} extraChallenges={slopeExtra} state={state}>
            <Board height={330} label={l(say(`${SLOPE_NAMES[state.fn]} goian eta haren deribatua behean`, `${SLOPE_NAMES[state.fn]} arriba y su derivada abajo`, `${SLOPE_NAMES[state.fn]} في الأعلى ومشتقتها في الأسفل`, `${SLOPE_NAMES[state.fn]} above and its derivative below`))}>
                {topClip.defs}
                {bottomClip.defs}
                <Grid xMin={xMin} xMax={xMax} yMin={topMin} yMax={topMax} X={X} Y={Yt} yStep={topMax - topMin > 5 ? 2 : 1} />
                <Grid xMin={xMin} xMax={xMax} yMin={bottomMin} yMax={bottomMax} X={X} Y={Yb} yStep={bottomMax - bottomMin > 5 ? 2 : 1} />
                {label(30, 'f', STAGE)}
                {label(202, 'f′', SECOND)}
                <g clipPath={topClip.url}>
                    <path d={curvePath(setup.fn, xMin, xMax, X, Yt, [topMin, topMax])} fill="none" stroke={STAGE} strokeWidth={3} strokeLinejoin="round" />
                    {shown && <line {...lineThrough(x, fx, slope, x - 1.2, x + 1.2, X, Yt)} stroke={MUSTARD} strokeWidth={2.6} />}
                </g>
                {!shown && <Dot x={X(setup.p)} y={Yt(setup.fn(setup.p))} color={INK} />}
                {shown && <Dot x={X(x)} y={Yt(fx)} color={MUSTARD} r={6} />}
                {shown && (
                    <g clipPath={bottomClip.url}>
                        <path d={curvePath(setup.derivative, xMin, xMax, X, Yb, [bottomMin, bottomMax])} fill="none" stroke={SECOND} strokeWidth={1.4} strokeDasharray="4 4" opacity={0.55} />
                        <path d={curvePath(setup.derivative, xMin, x, X, Yb, [bottomMin, bottomMax])} fill="none" stroke={SECOND} strokeWidth={3} strokeLinejoin="round" />
                    </g>
                )}
                {shown && slope >= bottomMin && slope <= bottomMax && <Dot x={X(x)} y={Yb(slope)} color={SECOND} r={6} />}
                {shown && <line x1={X(x)} x2={X(x)} y1={Yt(topMin)} y2={Yb(bottomMax)} stroke={MUTED} strokeWidth={1} strokeDasharray="3 3" />}
                {!shown && <Hidden x={X(1.5)} y={Yb((bottomMin + bottomMax) / 2) + 8} />}
            </Board>
            <PlayButton label={l(say('Ibili kurban zehar', 'Recorre la curva', 'تجوّل على المنحنى', 'Walk along the curve'))} disabled={!shown} playing={playback.playing} onPlay={playback.play} />
        </ToolFrame>
    )
}

/* ---------- L5. The chain of machines ---------- */

const INNER_LABEL: Record<InnerMachine, string> = { double: '2x', shift: 'x + 1', square: 'x²', half: 'x/2' }
const OUTER_LABEL: Record<OuterMachine, string> = { square: 'u²', cube: 'u³', triple: '3u', half: 'u/2' }

/** A bar of the stretched piece: from the middle, to the right if positive, to the left if negative */
function PieceBar({ y, factor, color, unit = 36 }: { y: number; factor: number; color: string; unit?: number }) {
    const length = factor * unit
    const capped = Math.max(-120, Math.min(120, length))
    const from = 180
    const to = from + capped
    return (
        <g>
            <line x1={from} x2={to} y1={y} y2={y} stroke={color} strokeWidth={10} strokeLinecap="butt" />
            <line x1={from} x2={from} y1={y - 10} y2={y + 10} stroke={INK} strokeWidth={1.6} />
            {factor !== 0 && <line x1={to} x2={to} y1={y - 10} y2={y + 10} stroke={INK} strokeWidth={1.6} />}
            {capped !== length && <text x={to + (length > 0 ? 6 : -6)} y={y + 5} textAnchor={length > 0 ? 'start' : 'end'} fontSize={15} fontWeight={700} fill={color}>…</text>}
            {factor === 0 && <circle cx={from} cy={y} r={5} fill={color} />}
        </g>
    )
}

export function ChainTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<ChainState>(initialChainState)
    const shown = state.prediction !== null
    const playback = usePlayback(`${state.inner}-${state.outer}-${state.x}`, 1800)
    const progress = !shown ? 0 : playback.progress === null ? 1 : playback.progress
    const values = chainValues(state.inner, state.outer, state.x)
    const t = (value: number) => texDec(value, props.language, 3)
    const n = (value: number) => num(value, props.language, 3)
    const controls = (
        <>
            <Segmented<InnerMachine> label={l(say('Barruko makina: u', 'Máquina de dentro: u', 'الآلة الداخلية: u', 'Inside machine: u'))} value={state.inner} options={INNER_MACHINES.map((value) => ({ value, label: ltr(INNER_LABEL[value]) }))} onChange={(value) => setState((s) => setChain(s, { inner: value }))} />
            <Segmented<OuterMachine> label={l(say('Kanpoko makina: y', 'Máquina de fuera: y', 'الآلة الخارجية: y', 'Outside machine: y'))} value={state.outer} options={OUTER_MACHINES.map((value) => ({ value, label: ltr(OUTER_LABEL[value]) }))} onChange={(value) => setState((s) => setChain(s, { outer: value }))} />
            <Stepper label="x" value={state.x} min={CHAIN_LIMITS.x.min} max={CHAIN_LIMITS.x.max} onChange={(x) => setState((s) => setChain(s, { x }))} language={props.language} />
        </>
    )
    const readout = (
        <Predict
            language={props.language}
            question={say(`Ikusi aurretik: $${INNER[state.inner].latex}$ eta $${OUTER[state.outer].latex}$ makinekin, $x=1$ denean, azken zatia hasierakoa baino laburragoa, berdina ala luzeagoa izango da?`, `Antes de verlo: con $${INNER[state.inner].latex}$ e $${OUTER[state.outer].latex}$, en $x=1$, ¿el trozo final será más corto, igual o más largo que el inicial?`, `قبل أن ترى: مع $${INNER[state.inner].latex}$ و$${OUTER[state.outer].latex}$ عند $x=1$، هل ستكون القطعة الأخيرة أقصر من الأولى أم مثلها أم أطول؟`, `Before you see it: with $${INNER[state.inner].latex}$ and $${OUTER[state.outer].latex}$, at $x=1$, will the final piece be shorter than, as long as or longer than the first one?`)}
            labels={{ '<': say('Laburragoa', 'Más corto', 'أقصر', 'Shorter'), '=': say('Berdina', 'Igual', 'مثلها', 'The same'), '>': say('Luzeagoa', 'Más largo', 'أطول', 'Longer') }}
            actual={chainPrediction(state)}
            choice={state.prediction}
            tip={say('Kalkulatu bi maldak $x=1$ puntuan eta biderkatu: 1 baino handiagoa bada, zatia luzatu egiten da.', 'Calcula las dos pendientes en $x=1$ y multiplícalas: si el producto pasa de 1, el trozo se estira.', 'احسب الميلين عند $x=1$ واضربهما: إذا تجاوز الجداء 1 تمددت القطعة.', 'Work out the two slopes at $x=1$ and multiply them: if the product is more than 1, the piece stretches.')}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout latex={[`u=${t(values.u)}\\qquad y=${t(values.y)}`, `y'=${t(values.outerSlope)}\\cdot ${t(values.innerSlope)}=${t(values.total)}`]} note={l(say(`Barruko makinak zatia ${n(values.innerSlope)} aldiz luzatzen du, eta kanpokoak ${n(values.outerSlope)} aldiz: guztira, ${n(values.total)} aldiz.`, `La máquina de dentro estira el trozo ${n(values.innerSlope)} veces y la de fuera, ${n(values.outerSlope)} veces: en total, ${n(values.total)} veces.`, `تمدّد الآلة الداخلية القطعة ${ltr(n(values.innerSlope))} مرة والخارجية ${ltr(n(values.outerSlope))} مرة: أي ${ltr(n(values.total))} مرة في المجموع.`, `The inside machine stretches the piece ${n(values.innerSlope)} times and the outside one ${n(values.outerSlope)} times: ${n(values.total)} times in all.`))} />
        </Predict>
    )
    // ▶: the piece goes through the first machine, then through the second
    const first = Math.min(1, progress * 2)
    const second = Math.max(0, progress * 2 - 1)
    const innerShown = 1 + (values.innerSlope - 1) * first
    const totalShown = values.innerSlope * (1 + (values.outerSlope - 1) * second)
    const row = (y: number, name: string, value: string, color: string) => (
        <g>
            <text x={14} y={y + 2} fontSize={16} fontWeight={700} fill={color}>{name}</text>
            <text x={14} y={y + 20} fontSize={12} fill={MUTED}>{value}</text>
        </g>
    )
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={chainChallenges} extraChallenges={chainExtra} state={state}>
            <Board height={250} label={l(say('Zati txiki bat bi makinatan zehar luzatzen da', 'Un trozo pequeño se estira al pasar por las dos máquinas', 'قطعة صغيرة تتمدد عند مرورها بالآلتين', 'A small piece stretches as it goes through the two machines'))}>
                {row(40, 'Δx', `x = ${minus(state.x)}`, INK)}
                <PieceBar y={40} factor={1} color={INK} />
                <text x={180} y={88} textAnchor="middle" fontSize={14} fontWeight={700} fill={GREEN}>{`↓  × ${n(values.innerSlope)}   (u = ${INNER_LABEL[state.inner]})`}</text>
                {row(126, 'Δu', `u = ${n(values.u)}`, GREEN)}
                {shown ? <PieceBar y={126} factor={innerShown} color={GREEN} /> : <Hidden x={180} y={134} />}
                <text x={180} y={174} textAnchor="middle" fontSize={14} fontWeight={700} fill={STAGE}>{`↓  × ${shown ? n(values.outerSlope) : '?'}   (y = ${OUTER_LABEL[state.outer]})`}</text>
                {row(212, 'Δy', `y = ${shown ? n(values.y) : '?'}`, STAGE)}
                {shown ? <PieceBar y={212} factor={totalShown} color={STAGE} /> : <Hidden x={180} y={220} />}
            </Board>
            <PlayButton label={l(say('Pasatu zatia', 'Pasa el trozo', 'مرّر القطعة', 'Push the piece through'))} disabled={!shown} playing={playback.playing} onPlay={playback.play} />
        </ToolFrame>
    )
}
