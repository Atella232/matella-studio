import { useId, useState } from 'react'
import { Segmented, Stepper, ToolFrame } from '../../../features/unit-v2/lab/LabKit'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import { useLabText } from '../../../features/unit-v2/lab/useLabText'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import { localize, say } from '../../batx1-zientziak-funtzioak/text'
import { Board, Hidden, Predict, Readout } from '../../dbh3-segidak/lab/LabParts'
import { dec, GREEN, INK, MUTED, PAPER, SECOND, STAGE, texDec } from '../../dbh3-segidak/lab/labStyle'
import { setPrediction } from '../../dbh3-segidak/lab/prediction'
import { IMPLICIT_CURVES, IMPLICIT_SETUP, implicitChallenges, implicitExtra, implicitPoint, implicitPrediction, implicitSlope, initialImplicitState, setImplicit, slopeLatex, slopeValue, type ImplicitCurve, type ImplicitState } from './implicitTangent'
import { initialMirrorState, MIRROR_FUNCTIONS, MIRROR_SETUP, mirrorA, mirrorChallenges, mirrorExtra, mirrorPrediction, mirrorSlopes, setMirror, type MirrorFunction, type MirrorState } from './mirror'
import { initialNoCornerState, jointKind, jointReadings, NO_CORNER_LIMITS, NO_CORNER_SETUP, NO_CORNER_SETUPS, noCornerChallenges, noCornerExtra, noCornerLatex, noCornerPrediction, setNoCorner, type NoCornerSetup, type NoCornerState } from './noCorner'
import { chordSlopes, halfWidth, initialZoomState, setZoom, ZOOM_FUNCTIONS, ZOOM_LIMITS, ZOOM_SETUP, zoomChallenges, zoomExtra, zoomPrediction, ZOOMS, type ZoomFunction, type ZoomState } from './zoom'

/* ==========================================================================
   Deribatuak · Batxilergoa 2 · Zientziak — the four tools of this unit:
   the lens of differentiability, adjust a and b with no corner, the
   tangent to an implicit curve and the mirror of the inverse. Each asks
   for a prediction before it shows the answer on the board. The boards
   carry numbers and formulas only (the svg is left to right); the words
   go in the readout. Logic in zoom.ts, noCorner.ts, implicitTangent.ts
   and mirror.ts. curvePath, Grid and useClip are copies of those of
   Limiteak 2.º (which does not export them), and every board keeps the
   same scale on both axes so that slopes look as they are.
   ========================================================================== */

const VIOLET = '#7a4fc9'

const minus = (value: number) => (value < 0 ? `−${-value}` : String(value))
/** A number for the board, with the language's decimal mark and a real minus sign */
const num = (value: number, language: UnitLanguage, digits = 3) => dec(value, language, digits).replace('-', '−')
/** Between the coordinates of a point: a semicolon where the decimal mark is a comma */
const comma = (language: UnitLanguage) => (language === 'eu' || language === 'es' ? '; ' : ', ')
const texComma = (language: UnitLanguage) => (language === 'eu' || language === 'es' ? ';\\ ' : ',')

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

/** A path through a list of points */
const pointsPath = (points: Array<[number, number]>, X: (x: number) => number, Y: (y: number) => number) => points.map(([x, y], index) => `${index ? 'L' : 'M'} ${X(x).toFixed(1)} ${Y(y).toFixed(1)}`).join(' ')

/** A light grid with the axes and the numbers every `step` units */
function Grid({ xMin, xMax, yMin, yMax, X, Y, xStep = 1, yStep = 1, gridStep = 1 }: { xMin: number; xMax: number; yMin: number; yMax: number; X: (x: number) => number; Y: (y: number) => number; xStep?: number; yStep?: number; gridStep?: number }) {
    const xs = Array.from({ length: Math.floor((xMax - xMin) / gridStep) + 1 }, (_, i) => Math.ceil(xMin / gridStep) * gridStep + i * gridStep).filter((x) => x <= xMax)
    const ys = Array.from({ length: Math.floor((yMax - yMin) / gridStep) + 1 }, (_, i) => Math.ceil(yMin / gridStep) * gridStep + i * gridStep).filter((y) => y <= yMax)
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

/** A clip path for the plotting area, so that curves stop at its edges */
function useClip(x: number, y: number, width: number, height: number) {
    const id = useId().replace(/:/g, '')
    return { defs: <defs><clipPath id={id}><rect x={x} y={y} width={width} height={height} /></clipPath></defs>, url: `url(#${id})` }
}

const Open = ({ x, y, color }: { x: number; y: number; color: string }) => <circle cx={x} cy={y} r={5.5} fill={PAPER} stroke={color} strokeWidth={2.4} />
const Full = ({ x, y, color }: { x: number; y: number; color: string }) => <circle cx={x} cy={y} r={5.5} fill={color} stroke={PAPER} strokeWidth={1.2} />

/** A plot area 300 × 200 inside a 360-wide board */
function frame(view: { xMin: number; xMax: number; yMin: number; yMax: number }) {
    const X = (x: number) => 40 + ((x - view.xMin) * 300) / (view.xMax - view.xMin)
    const Y = (y: number) => 20 + ((view.yMax - y) * 200) / (view.yMax - view.yMin)
    return { X, Y }
}

/** The line through (x0, y0) with slope m, between two abscissas */
const segment = (x0: number, y0: number, m: number, from: number, to: number, X: (x: number) => number, Y: (y: number) => number) => ({ x1: X(from), y1: Y(y0 + m * (from - x0)), x2: X(to), y2: Y(y0 + m * (to - x0)) })

/* ---------- L1. The lens of differentiability ---------- */

const ZOOM_NAMES: Record<ZoomFunction, string> = { square: 'f₁', corner: 'f₂', kink: 'f₃', flat: 'f₄', cusp: 'f₅', sine: 'f₆' }

export function ZoomTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<ZoomState>(initialZoomState)
    const shown = state.prediction !== null
    const setup = ZOOM_SETUP[state.fn]
    const w = halfWidth(state)
    const fa = setup.f(setup.a)
    // The same scale on both axes: the window is 3 : 2 like the plot area
    const view = { xMin: setup.a - w, xMax: setup.a + w, yMin: fa - (2 * w) / 3, yMax: fa + (2 * w) / 3 }
    const { X, Y } = frame(view)
    const clip = useClip(40, 20, 300, 200)
    const [left, right] = chordSlopes(state)
    const controls = (
        <>
            <Segmented<ZoomFunction> label={l(say('Funtzioa', 'Función', 'الدالة', 'Function'))} value={state.fn} options={ZOOM_FUNCTIONS.map((fn) => ({ value: fn, label: ZOOM_NAMES[fn] }))} onChange={(fn) => setState((s) => setZoom(s, { fn }))} />
            <Stepper label={l(say('Lupa', 'Lupa', 'العدسة', 'Lens'))} value={state.z} min={ZOOM_LIMITS.z.min} max={ZOOM_LIMITS.z.max} format={(z) => `×${ZOOMS[z]}`} onChange={(z) => setState((s) => setZoom(s, { z }))} language={props.language} />
        </>
    )
    const t = (value: number) => texDec(value, props.language, 3)
    const local = (latex: string) => localize(props.language, latex)
    const look = setup.look
    const note = look === '='
        ? say(`Hurbiletik zuzen bat da: bi maldak $${setup.right}$ baliora hurbiltzen dira. Deribagarria da.`, `De cerca es una recta: las dos pendientes se acercan a $${setup.right}$. Es derivable.`, `من قريب هو مستقيم: يقترب الميلان من $${setup.right}$. إنها قابلة للاشتقاق.`, `Close up it is a line: both slopes approach $${setup.right}$. It is differentiable.`)
        : look === '<'
            ? say(`Hurbildu arren, punta bera dago: maldak $${setup.left}$ eta $${setup.right}$ baliora doaz, desberdinak. Ez da deribagarria.`, `Por mucho que te acerques, el pico sigue: las pendientes van a $${setup.left}$ y $${setup.right}$, distintas. No es derivable.`, `مهما اقتربت تبقى الزاوية: يتجه الميلان إلى $${setup.left}$ و$${setup.right}$، وهما مختلفان. ليست قابلة للاشتقاق.`, `However close you get, the corner stays: the slopes tend to $${setup.left}$ and $${setup.right}$, different. It is not differentiable.`)
            : say('Bertikal jartzen da: maldak gero eta handiagoak dira, mugarik gabe. Ez da deribagarria.', 'Se pone vertical: las pendientes crecen sin parar. No es derivable.', 'تصير عمودية: يكبر الميلان بلا حد. ليست قابلة للاشتقاق.', 'It turns vertical: the slopes grow without bound. It is not differentiable.')
    const readout = (
        <Predict
            language={props.language}
            question={say(`Ikusi aurretik: $f(x)=${setup.latex}$ funtzioan, $x=${setup.a}$ puntura asko hurbiltzean, nolakoa izango da kurba?`, `Antes de verlo: en $f(x)=${setup.latex}$, al acercarte mucho a $x=${setup.a}$, ¿cómo se verá la curva?`, `قبل أن ترى: في $f(x)=${setup.latex}$، عند الاقتراب كثيرًا من $x=${setup.a}$، كيف سيبدو المنحنى؟`, `Before you see it: in $f(x)=${setup.latex}$, zooming in a lot at $x=${setup.a}$, what will the curve look like?`)}
            labels={{ '<': say('Punta batekin', 'Con un pico', 'بزاوية', 'With a corner'), '=': say('Zuzen bat bezala', 'Como una recta', 'مثل مستقيم', 'Like a line'), '>': say('Bertikal', 'Vertical', 'عمودية', 'Vertical') }}
            actual={zoomPrediction(state)}
            choice={state.prediction}
            tip={say('Kalkulatu alboko deribatuak: berdinak badira, zuzen bat ikusiko duzu.', 'Calcula las derivadas laterales: si coinciden, verás una recta.', 'احسب المشتقتين الجانبيتين: إذا تساوتا سترى مستقيمًا.', 'Work out the one-sided derivatives: if they are equal, you will see a line.')}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout latex={[local(`f(x)=${setup.latex}`), `w=${t(w)}`, `m^{-}=${t(left)}\\qquad m^{+}=${t(right)}`]} note={l(note)} />
        </Predict>
    )
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={zoomChallenges} extraChallenges={zoomExtra} state={state}>
            <Board height={250} label={l(say(`${ZOOM_NAMES[state.fn]}: lupa ×${ZOOMS[state.z]} puntuaren inguruan`, `${ZOOM_NAMES[state.fn]}: lupa ×${ZOOMS[state.z]} alrededor del punto`, `${ZOOM_NAMES[state.fn]}: العدسة ×${ZOOMS[state.z]} حول النقطة`, `${ZOOM_NAMES[state.fn]}: lens ×${ZOOMS[state.z]} around the point`))}>
                {clip.defs}
                <rect x={40} y={20} width={300} height={200} fill={PAPER} stroke={MUTED} strokeWidth={1.4} />
                {[1, 2, 3, 4, 5].map((i) => <line key={`v${i}`} x1={40 + i * 50} x2={40 + i * 50} y1={20} y2={220} stroke="#e6dfd2" strokeWidth={1} />)}
                {[1, 2, 3].map((i) => <line key={`h${i}`} x1={40} x2={340} y1={20 + i * 50} y2={20 + i * 50} stroke="#e6dfd2" strokeWidth={1} />)}
                {shown ? (
                    <g>
                        <g clipPath={clip.url}>
                            <path d={curvePath(setup.f, view.xMin, view.xMax, X, Y, [view.yMin, view.yMax], (2 * w) / 300)} fill="none" stroke={STAGE} strokeWidth={3.4} strokeLinejoin="round" />
                            <line x1={X(setup.a - w)} y1={Y(setup.f(setup.a - w))} x2={X(setup.a)} y2={Y(fa)} stroke={VIOLET} strokeWidth={2} strokeDasharray="6 4" />
                            <line x1={X(setup.a)} y1={Y(fa)} x2={X(setup.a + w)} y2={Y(setup.f(setup.a + w))} stroke={SECOND} strokeWidth={2} strokeDasharray="6 4" />
                        </g>
                        <Full x={X(setup.a)} y={Y(fa)} color={INK} />
                    </g>
                ) : <Hidden x={190} y={130} />}
                <text x={46} y={240} fontSize={13} fontWeight={700} fill={MUTED}>{`×${ZOOMS[state.z]}`}</text>
                <text x={334} y={240} textAnchor="end" fontSize={13} fontWeight={700} fill={MUTED}>{`x = ${setup.a}`}</text>
            </Board>
        </ToolFrame>
    )
}

/* ---------- L2. Adjust a and b: no corner ---------- */

const NO_CORNER_NAMES: Record<NoCornerSetup, string> = { g1: 'g₁', g2: 'g₂', g3: 'g₃', g4: 'g₄' }

export function NoCornerTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<NoCornerState>(initialNoCornerState)
    const shown = state.prediction !== null
    const setup = NO_CORNER_SETUP[state.setup]
    const view = setup.view
    const { X, Y } = frame(view)
    const clip = useClip(X(view.xMin), Y(view.yMax), 300, 200)
    const p = setup.joint
    const controls = (
        <>
            <Segmented<NoCornerSetup> label={l(say('Funtzioa', 'Función', 'الدالة', 'Function'))} value={state.setup} options={NO_CORNER_SETUPS.map((id) => ({ value: id, label: NO_CORNER_NAMES[id] }))} onChange={(id) => setState((s) => setNoCorner(s, { setup: id }))} />
            <Stepper label="a" value={state.a} min={NO_CORNER_LIMITS.a.min} max={NO_CORNER_LIMITS.a.max} format={minus} onChange={(a) => setState((s) => setNoCorner(s, { a }))} language={props.language} />
            <Stepper label="b" value={state.b} min={NO_CORNER_LIMITS.b.min} max={NO_CORNER_LIMITS.b.max} format={minus} onChange={(b) => setState((s) => setNoCorner(s, { b }))} language={props.language} />
        </>
    )
    const { leftValue, rightValue, leftSlope, rightSlope } = jointReadings(state)
    const kind = jointKind(state)
    const note = kind === 'jump'
        ? say('Jauzi bat dago: lehenik berdindu bi zatien altuerak.', 'Hay un salto: primero iguala las alturas de los dos trozos.', 'توجد قفزة: ساوِ أولًا ارتفاعي الجزأين.', 'There is a jump: first make the heights of the two pieces equal.')
        : kind === 'corner'
            ? say(`Jarraitua, baina punta batekin: maldak $${leftSlope}$ eta $${rightSlope}$ dira. Orain berdindu maldak.`, `Continua, pero con un pico: las pendientes son $${leftSlope}$ y $${rightSlope}$. Ahora iguala las pendientes.`, `متصلة لكن بزاوية: الميلان $${leftSlope}$ و$${rightSlope}$. ساوِ الآن الميلين.`, `Continuous, but with a corner: the slopes are $${leftSlope}$ and $${rightSlope}$. Now make the slopes equal.`)
            : say(`Jauzirik eta puntarik gabe: $f$ deribagarria da $x=${p}$ puntuan, eta $f'(${p})=${rightSlope}$.`, `Sin salto y sin pico: $f$ es derivable en $x=${p}$, con $f'(${p})=${rightSlope}$.`, `دون قفزة ودون زاوية: $f$ قابلة للاشتقاق عند $x=${p}$، و$f'(${p})=${rightSlope}$.`, `No jump and no corner: $f$ is differentiable at $x=${p}$, with $f'(${p})=${rightSlope}$.`)
    const latex = localize(props.language, noCornerLatex(state.setup))
    const readout = (
        <Predict
            language={props.language}
            question={say(`Ikusi aurretik: $${latex}$ funtzioan, puntarik ez dagoenean, lotuneko zuzen ukitzailea jaitsi egingo da, horizontala izango da ala igo egingo da?`, `Antes de verlo: en $${latex}$, cuando no haya pico, la tangente en la unión, ¿bajará, será horizontal o subirá?`, `قبل أن ترى: في $${latex}$، عندما لا تبقى زاوية، هل سينزل المماس عند نقطة الالتقاء أم يكون أفقيًّا أم يصعد؟`, `Before you see it: in $${latex}$, once there is no corner, will the tangent at the joint go down, be horizontal or go up?`)}
            labels={{ '<': say('Jaitsi', 'Bajará', 'ينزل', 'Go down'), '=': say('Horizontala', 'Horizontal', 'أفقي', 'Horizontal'), '>': say('Igo', 'Subirá', 'يصعد', 'Go up') }}
            actual={noCornerPrediction(state)}
            choice={state.prediction}
            tip={say('Begiratu parametrorik gabeko zatia lotunean, edo ebatzi bi ekuazioen sistema.', 'Mira el trozo sin parámetros en la unión, o resuelve el sistema de las dos ecuaciones.', 'انظر إلى الجزء الذي لا وسيط فيه عند نقطة الالتقاء، أو حلّ نظام المعادلتين.', 'Look at the piece without parameters at the joint, or solve the system of the two equations.')}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout latex={[latex, `f(${p}^-)=${leftValue}\\qquad f(${p}^+)=${rightValue}`, `f'(${p}^-)=${leftSlope}\\qquad f'(${p}^+)=${rightSlope}`]} note={l(note)} />
        </Predict>
    )
    const left = (x: number) => setup.left.f(x, state.a, state.b)
    const right = (x: number) => (x <= 0 && state.setup === 'g1' ? null : setup.right.f(x, state.a, state.b))
    const span = (view.xMax - view.xMin) / 5
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={noCornerChallenges} extraChallenges={noCornerExtra} state={state}>
            <Board height={250} label={l(say(`${NO_CORNER_NAMES[state.setup]} funtzioaren bi zatiak eta lotuneko zuzen ukitzaileak`, `Los dos trozos de ${NO_CORNER_NAMES[state.setup]} y las tangentes en la unión`, `جزآ ${NO_CORNER_NAMES[state.setup]} والمماسان عند نقطة الالتقاء`, `The two pieces of ${NO_CORNER_NAMES[state.setup]} and the tangents at the joint`))}>
                {clip.defs}
                <Grid {...view} X={X} Y={Y} yStep={view.yStep} />
                {shown ? (
                    <g>
                        <g clipPath={clip.url}>
                            <path d={curvePath(left, view.xMin - 1, p, X, Y, [view.yMin, view.yMax])} fill="none" stroke={STAGE} strokeWidth={3.2} />
                            <path d={curvePath(right, p, view.xMax + 1, X, Y, [view.yMin, view.yMax])} fill="none" stroke={VIOLET} strokeWidth={3.2} />
                            {kind !== 'jump' && <line {...segment(p, leftValue, leftSlope, p - span, p + span, X, Y)} stroke={STAGE} strokeWidth={2} strokeDasharray="6 4" />}
                            {kind !== 'jump' && <line {...segment(p, rightValue, rightSlope, p - span, p + span, X, Y)} stroke={VIOLET} strokeWidth={2} strokeDasharray="6 4" />}
                        </g>
                        {kind === 'jump'
                            ? (
                                <g>
                                    <line x1={X(p)} x2={X(p)} y1={Y(leftValue)} y2={Y(rightValue)} stroke={SECOND} strokeWidth={1.6} strokeDasharray="4 3" />
                                    <Full x={X(p)} y={Y(leftValue)} color={SECOND} />
                                    <Open x={X(p)} y={Y(rightValue)} color={SECOND} />
                                </g>
                            )
                            : <Full x={X(p)} y={Y(leftValue)} color={kind === 'smooth' ? GREEN : SECOND} />}
                    </g>
                ) : <Hidden x={200} y={120} />}
                <text x={X(p)} y={244} textAnchor="middle" fontSize={13} fontWeight={700} fill={MUTED}>{`x = ${minus(p)}`}</text>
            </Board>
        </ToolFrame>
    )
}

/* ---------- L3. The tangent to an implicit curve ---------- */

const IMPLICIT_NAMES: Record<ImplicitCurve, string> = { circle: 'C₁', ellipse: 'C₂', hyperbola: 'C₃', parabola: 'C₄' }

/** Equal scales: each view is 3 : 2 like the plot area */
const IMPLICIT_VIEWS: Record<ImplicitCurve, { xMin: number; xMax: number; yMin: number; yMax: number; step: number }> = {
    circle: { xMin: -9, xMax: 9, yMin: -6, yMax: 6, step: 3 },
    ellipse: { xMin: -4.5, xMax: 4.5, yMin: -3, yMax: 3, step: 1 },
    hyperbola: { xMin: -9, xMax: 9, yMin: -6, yMax: 6, step: 3 },
    parabola: { xMin: -2, xMax: 13, yMin: -5, yMax: 5, step: 2 }
}

export function ImplicitTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<ImplicitState>(initialImplicitState)
    const shown = state.prediction !== null
    const setup = IMPLICIT_SETUP[state.curve]
    const view = IMPLICIT_VIEWS[state.curve]
    const { X, Y } = frame(view)
    const clip = useClip(40, 20, 300, 200)
    const [x0, y0] = implicitPoint(state)
    const slope = implicitSlope(state)
    const point = (x: number, y: number) => `(${num(x, props.language)}${comma(props.language)}${num(y, props.language)})`
    const pointLatex = (x: number, y: number) => `(${texDec(x, props.language, 3)}${texComma(props.language)}${texDec(y, props.language, 3)})`
    const start = setup.points[setup.start]
    const controls = (
        <>
            <Segmented<ImplicitCurve> label={l(say('Kurba', 'Curva', 'المنحنى', 'Curve'))} value={state.curve} options={IMPLICIT_CURVES.map((curve) => ({ value: curve, label: IMPLICIT_NAMES[curve] }))} onChange={(curve) => setState((s) => setImplicit(s, { curve }))} />
            <Stepper label={l(say('Puntua', 'Punto', 'النقطة', 'Point'))} value={state.k} min={0} max={setup.points.length - 1} format={(k) => point(...setup.points[k])} onChange={(k) => setState((s) => setImplicit(s, { k }))} language={props.language} />
        </>
    )
    const vertical = slope.q === 0
    const note = vertical
        ? say(`$${pointLatex(x0, y0)}$ puntuan $y'$ deribatuaren izendatzailea 0 da: zuzen ukitzailea bertikala da, eta $y'$ ez da existitzen.`, `En $${pointLatex(x0, y0)}$ el denominador de $y'$ es 0: la tangente es vertical y $y'$ no existe.`, `عند $${pointLatex(x0, y0)}$ مقام $y'$ يساوي 0: المماس عمودي و$y'$ غير موجودة.`, `At $${pointLatex(x0, y0)}$ the denominator of $y'$ is 0: the tangent is vertical and $y'$ does not exist.`)
        : say(`$${pointLatex(x0, y0)}$ puntuan, zuzen ukitzailearen malda $${slopeLatex(slope)}$ da.`, `En $${pointLatex(x0, y0)}$, la tangente tiene pendiente $${slopeLatex(slope)}$.`, `عند $${pointLatex(x0, y0)}$ ميل المماس $${slopeLatex(slope)}$.`, `At $${pointLatex(x0, y0)}$, the tangent has slope $${slopeLatex(slope)}$.`)
    const readout = (
        <Predict
            language={props.language}
            question={say(`Ikusi aurretik: $${setup.latex}$ kurbaren $P${pointLatex(...start)}$ puntuan, zuzen ukitzailearen malda negatiboa, zero ala positiboa da?`, `Antes de verlo: en el punto $P${pointLatex(...start)}$ de $${setup.latex}$, ¿la pendiente de la tangente es negativa, cero o positiva?`, `قبل أن ترى: عند النقطة $P${pointLatex(...start)}$ من $${setup.latex}$، هل ميل المماس سالب أم صفر أم موجب؟`, `Before you see it: at the point $P${pointLatex(...start)}$ of $${setup.latex}$, is the slope of the tangent negative, zero or positive?`)}
            labels={{ '<': say('Negatiboa', 'Negativa', 'سالب', 'Negative'), '=': say('Zero', 'Cero', 'صفر', 'Zero'), '>': say('Positiboa', 'Positiva', 'موجب', 'Positive') }}
            actual={implicitPrediction(state)}
            choice={state.prediction}
            tip={say('Deribatu $x$ aldagaiarekiko, askatu $y\'$ eta ordezkatu puntua.', 'Deriva respecto a $x$, despeja $y\'$ y sustituye el punto.', 'اشتق بالنسبة إلى $x$، واستخرج $y\'$، ثم عوّض النقطة.', 'Differentiate with respect to $x$, solve for $y\'$ and substitute the point.')}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout latex={[setup.latex, setup.derived, vertical ? setup.formula : `${setup.formula}=${slopeLatex(slope)}`]} note={l(note)} />
        </Predict>
    )
    const m = slopeValue(slope)
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={implicitChallenges} extraChallenges={implicitExtra} state={state}>
            <Board height={250} label={l(say(`${IMPLICIT_NAMES[state.curve]} kurba eta haren zuzen ukitzailea puntuan`, `La curva ${IMPLICIT_NAMES[state.curve]} y su tangente en el punto`, `المنحنى ${IMPLICIT_NAMES[state.curve]} ومماسه عند النقطة`, `The curve ${IMPLICIT_NAMES[state.curve]} and its tangent at the point`))}>
                {clip.defs}
                <Grid {...view} X={X} Y={Y} xStep={view.step} yStep={view.step} gridStep={view.step} />
                <g clipPath={clip.url}>
                    {setup.branches().map((branch, index) => <path key={index} d={pointsPath(branch, X, Y)} fill="none" stroke={STAGE} strokeWidth={3} strokeLinejoin="round" />)}
                    {shown && (vertical
                        ? <line x1={X(x0)} x2={X(x0)} y1={Y(view.yMin)} y2={Y(view.yMax)} stroke={SECOND} strokeWidth={2.6} />
                        : <line {...segment(x0, y0, m, view.xMin, view.xMax, X, Y)} stroke={SECOND} strokeWidth={2.6} />)}
                </g>
                <Full x={X(x0)} y={Y(y0)} color={INK} />
                {!shown && <Hidden x={X(x0) + (x0 > 0 ? -34 : 34)} y={Y(y0) + (Y(y0) < 60 ? 38 : -18)} />}
                <text x={334} y={242} textAnchor="end" fontSize={13} fontWeight={700} fill={MUTED}>{point(x0, y0)}</text>
            </Board>
        </ToolFrame>
    )
}

/* ---------- L4. The mirror of the inverse ---------- */

const MIRROR_NAMES: Record<MirrorFunction, string> = { exp: 'eˣ', cube: 'x³', square: 'x²', cubic: 'x³ + x' }
const MIRROR_VIEW = { xMin: -6, xMax: 6, yMin: -4, yMax: 4 }

export function MirrorTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<MirrorState>(initialMirrorState)
    const shown = state.prediction !== null
    const setup = MIRROR_SETUP[state.fn]
    const view = MIRROR_VIEW
    const { X, Y } = frame(view)
    const clip = useClip(40, 20, 300, 200)
    const a = mirrorA(state)
    const fa = setup.f(a)
    const { m, inverse } = mirrorSlopes(state)
    const controls = (
        <>
            <Segmented<MirrorFunction> label={l(say('Funtzioa', 'Función', 'الدالة', 'Function'))} value={state.fn} options={MIRROR_FUNCTIONS.map((fn) => ({ value: fn, label: MIRROR_NAMES[fn] }))} onChange={(fn) => setState((s) => setMirror(s, { fn }))} />
            <Stepper label="a" value={state.k} min={0} max={setup.points.length - 1} format={(k) => num(setup.points[k], props.language)} onChange={(k) => setState((s) => setMirror(s, { k }))} language={props.language} />
        </>
    )
    const t = (value: number) => texDec(value, props.language, 3)
    const vertical = !Number.isFinite(inverse)
    const startA = setup.points[setup.start]
    const startM = setup.derivative(startA)
    const note = vertical
        ? say('$f\'(a)=0$: $f$ funtzioaren zuzen ukitzailea horizontala da, eta ispiluan bertikal bihurtzen da. Alderantzizkoa ez da deribagarria han.', '$f\'(a)=0$: la tangente de $f$ es horizontal y en el espejo se vuelve vertical. La inversa no es derivable allí.', '$f\'(a)=0$: مماس $f$ أفقي، وفي المرآة يصير عموديًّا. فالدالة العكسية غير قابلة للاشتقاق هناك.', '$f\'(a)=0$: the tangent of $f$ is horizontal and in the mirror it turns vertical. The inverse is not differentiable there.')
        : say(`Ispiluak $x$ eta $y$ trukatzen ditu: $m_P=${t(m)}$ bada, $m_Q=\\frac{1}{m_P}=${t(inverse)}$.`, `El espejo cambia $x$ por $y$: si $m_P=${t(m)}$, $m_Q=\\frac{1}{m_P}=${t(inverse)}$.`, `تبدّل المرآة $x$ و$y$: إذا كان $m_P=${t(m)}$ فإن $m_Q=\\frac{1}{m_P}=${t(inverse)}$.`, `The mirror swaps $x$ and $y$: if $m_P=${t(m)}$, $m_Q=\\frac{1}{m_P}=${t(inverse)}$.`)
    const readout = (
        <Predict
            language={props.language}
            question={say(`Ikusi aurretik: $f(x)=${setup.latex}$ funtzioan, $a=${t(startA)}$ puntuan, $f$ funtzioaren malda $m=${t(startM)}$ da. Alderantzizkoarena $Q$ puntuan $m$ baino txikiagoa, berdina ala handiagoa izango da?`, `Antes de verlo: en $f(x)=${setup.latex}$, con $a=${t(startA)}$, la pendiente de $f$ es $m=${t(startM)}$. La de la inversa en $Q$, ¿será menor, igual o mayor que $m$?`, `قبل أن ترى: في $f(x)=${setup.latex}$ مع $a=${t(startA)}$ ميل $f$ هو $m=${t(startM)}$. هل يكون ميل الدالة العكسية عند $Q$ أصغر من $m$ أم يساويه أم أكبر منه؟`, `Before you see it: in $f(x)=${setup.latex}$, with $a=${t(startA)}$, the slope of $f$ is $m=${t(startM)}$. Will that of the inverse at $Q$ be smaller than, equal to or larger than $m$?`)}
            labels={{ '<': say('m baino txikiagoa', 'Menor que m', 'أصغر من m', 'Smaller than m'), '=': say('m bezalakoa', 'Igual que m', 'تساوي m', 'Equal to m'), '>': say('m baino handiagoa', 'Mayor que m', 'أكبر من m', 'Larger than m') }}
            actual={mirrorPrediction(state)}
            choice={state.prediction}
            tip={say('Alderantzizkoaren malda $\\frac{1}{m}$ da: $m>1$ bada, txikiagoa da.', 'La pendiente de la inversa es $\\frac{1}{m}$: si $m>1$, es menor.', 'ميل الدالة العكسية $\\frac{1}{m}$: إذا كان $m>1$ فهو أصغر.', 'The slope of the inverse is $\\frac{1}{m}$: if $m>1$, it is smaller.')}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout latex={[`f(x)=${setup.latex}`, `f^{-1}(x)=${setup.inverseLatex}`, `P=(${t(a)}${texComma(props.language)}${t(fa)})`, `Q=(${t(fa)}${texComma(props.language)}${t(a)})`, vertical ? `m_P=0` : `m_P=${t(m)}\\qquad m_Q=${t(inverse)}`]} note={l(note)} />
        </Predict>
    )
    const [from, to] = setup.domain
    const mirrored = Array.from({ length: 241 }, (_, i) => { const x = from + ((to - from) * i) / 240; return [setup.f(x), x] as [number, number] }).filter(([x, y]) => Number.isFinite(x) && Math.abs(x) < 40 && Math.abs(y) < 40)
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={mirrorChallenges} extraChallenges={mirrorExtra} state={state}>
            <Board height={250} label={l(say(`${MIRROR_NAMES[state.fn]} eta haren alderantzizkoa, y = x zuzenean islatuta`, `${MIRROR_NAMES[state.fn]} y su inversa, reflejadas en y = x`, `${MIRROR_NAMES[state.fn]} ودالتها العكسية منعكستين في y = x`, `${MIRROR_NAMES[state.fn]} and its inverse, reflected in y = x`))}>
                {clip.defs}
                <Grid {...view} X={X} Y={Y} xStep={2} yStep={2} />
                <g clipPath={clip.url}>
                    <line x1={X(-4)} y1={Y(-4)} x2={X(4)} y2={Y(4)} stroke={MUTED} strokeWidth={1.6} strokeDasharray="6 5" />
                    <path d={curvePath(setup.f, from, to, X, Y, [view.yMin, view.yMax], 0.01)} fill="none" stroke={STAGE} strokeWidth={3} />
                    <path d={pointsPath(mirrored, X, Y)} fill="none" stroke={VIOLET} strokeWidth={3} />
                    {shown && <line {...segment(a, fa, m, a - 1.6, a + 1.6, X, Y)} stroke={SECOND} strokeWidth={2.4} />}
                    {shown && (vertical
                        ? <line x1={X(fa)} x2={X(fa)} y1={Y(a - 1.6)} y2={Y(a + 1.6)} stroke={SECOND} strokeWidth={2.4} strokeDasharray="6 4" />
                        : <line {...segment(fa, a, inverse, fa - 1.6, fa + 1.6, X, Y)} stroke={SECOND} strokeWidth={2.4} strokeDasharray="6 4" />)}
                </g>
                <Full x={X(a)} y={Y(fa)} color={STAGE} />
                <Full x={X(fa)} y={Y(a)} color={VIOLET} />
                <text x={X(a) + 8} y={Y(fa) - 8} fontSize={13} fontWeight={700} fill={STAGE}>P</text>
                <text x={X(fa) + 8} y={Y(a) + 16} fontSize={13} fontWeight={700} fill={VIOLET}>Q</text>
                {!shown && <Hidden x={300} y={60} />}
                <text x={334} y={242} textAnchor="end" fontSize={13} fontWeight={700} fill={MUTED}>y = x</text>
            </Board>
        </ToolFrame>
    )
}
