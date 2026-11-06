import { useId, useState } from 'react'
import { Segmented, Stepper, ToolFrame } from '../../../features/unit-v2/lab/LabKit'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import { useLabText } from '../../../features/unit-v2/lab/useLabText'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import { localize, say } from '../../batx1-zientziak-funtzioak/text'
import { Board, Hidden, PlayButton, Predict, Readout } from '../../dbh3-segidak/lab/LabParts'
import { dec, GREEN, GREEN_TINT, INK, MUSTARD, MUTED, PAPER, SECOND, SECOND_TINT, STAGE, STAGE_TINT, texDec } from '../../dbh3-segidak/lab/labStyle'
import { setPrediction } from '../../dbh3-segidak/lab/prediction'
import { usePlayback } from '../../dbh4-aplikatuak-proportzionaltasuna/lab/usePlayback'
import { bestCut, BOX_SIZES, boxChallenges, boxCut, boxExtra, boxLimits, boxPrediction, boxSide, initialBoxState, setBox, volume, volumeSlope, type BoxState } from './box'
import { CURVE_FUNCTIONS, CURVE_LIMITS, CURVE_NAMES, CURVE_SETUP, curveChallenges, curveExtra, curvePrediction, curveSide, curveX, initialCurveState, setCurve, type CurveFunction, type CurveState } from './curvature'
import { initialLayerState, LAYER_COUNT, LAYER_FUNCTIONS, LAYER_NAMES, LAYER_SETUP, LAYER_TITLES, layerChallenges, layerExtra, layerPrediction, setLayers, type LayerFunction, type LayerState } from './layers'
import { initialSignState, SIGN_FUNCTIONS, SIGN_LIMITS, SIGN_NAMES, SIGN_SETUP, signChallenges, signExtra, signPieces, signPrediction, signSlope, signX, setSign, type SignFunction, type SignState } from './sign'

/* ==========================================================================
   Deribatuaren aplikazioak · Batxilergoa 1 · Zientziak — the four tools
   of this unit: the traffic light of f′, the box without a lid, concavity
   with the tangent and build the graph. Each asks for a prediction before
   it shows the result, and each moves with ▶. The boards carry numbers
   and formulas only (the svg is left to right); the words go in the
   readout. Logic in sign.ts, box.ts, curvature.ts and layers.ts.
   ========================================================================== */

/** A colour of its own for the minima, apart from every stage colour */
const VIOLET = '#7b52c7'
const minus = (value: number) => (value < 0 ? `−${-value}` : String(value))
/** A number for the board, with the language's decimal mark and a real minus sign */
const num = (value: number, language: UnitLanguage, digits = 2) => dec(value, language, digits).replace('-', '−')
/** Plain names f₁ … f₅ for the buttons */
const SUB = ['₀', '₁', '₂', '₃', '₄', '₅', '₆']
const plainName = (name: string) => `f${SUB[Number(name.slice(2))]}`

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

/** A straight line through (x0, y0) with slope m, from x = from to x = to */
const lineThrough = (x0: number, y0: number, m: number, from: number, to: number, X: (x: number) => number, Y: (y: number) => number) => ({ x1: X(from), y1: Y(y0 + m * (from - x0)), x2: X(to), y2: Y(y0 + m * (to - x0)) })

/* ---------- L1. The traffic light of f′ ---------- */

const KIND_LABELS = {
    '<': say('Minimoa', 'Mínimo', 'قيمة صغرى', 'Minimum'),
    '=': say('Bat ere ez', 'Ninguno', 'لا هذه ولا تلك', 'Neither'),
    '>': say('Maximoa', 'Máximo', 'قيمة عظمى', 'Maximum')
}

export function SignTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<SignState>(initialSignState)
    const shown = state.prediction !== null
    const setup = SIGN_SETUP[state.fn]
    const [xMin, xMax] = [-3, 3]
    const [yMin, yMax] = setup.view
    const X = (x: number) => 40 + (x - xMin) * 50
    const Y = (y: number) => 14 + (yMax - y) * (180 / (yMax - yMin))
    const clip = useClip(X(xMin), Y(yMax), 300, 180)
    const playback = usePlayback(`${state.fn}-${state.t}`, 2600)
    const x = shown && playback.progress !== null ? xMin + playback.progress * (xMax - xMin) : signX(state)
    const slope = signSlope(state.fn, x)
    const fx = setup.fn(x)
    const stripY = 214
    const controls = (
        <>
            <Segmented<SignFunction> label={l(say('Funtzioa', 'Función', 'الدالة', 'Function'))} value={state.fn} options={SIGN_FUNCTIONS.map((fn) => ({ value: fn, label: plainName(SIGN_NAMES[fn]) }))} onChange={(fn) => setState((s) => setSign(s, { fn }))} />
            <Stepper label={l(say('Zunda: x', 'Sonda: x', 'المسبار: x', 'Probe: x'))} value={state.t} min={SIGN_LIMITS.t.min} max={SIGN_LIMITS.t.max} format={(t) => num(t / 2, props.language, 1)} onChange={(t) => setState((s) => setSign(s, { t }))} language={props.language} />
        </>
    )
    const formula = localize(props.language, setup.latex)
    const t = (value: number) => texDec(value, props.language, 3)
    const probe = signX(state)
    const probeSlope = signSlope(state.fn, probe)
    const light = probeSlope === null
        ? say('$f$ ez da existitzen hemen: semaforoak hutsune bat du.', '$f$ no existe aquí: el semáforo tiene un hueco.', '$f$ غير موجودة هنا: في الإشارة فراغ.', '$f$ does not exist here: the light has a gap.')
        : probeSlope > 0
            ? say('Berdea: $f\'>0$, eta $f$ gorakorra da ↗.', 'Verde: $f\'>0$, y $f$ crece ↗.', 'أخضر: $f\'>0$، و$f$ متزايدة ↗.', 'Green: $f\'>0$, and $f$ increases ↗.')
            : probeSlope < 0
                ? say('Gorria: $f\'<0$, eta $f$ beherakorra da ↘.', 'Rojo: $f\'<0$, y $f$ decrece ↘.', 'أحمر: $f\'<0$، و$f$ متناقصة ↘.', 'Red: $f\'<0$, and $f$ decreases ↘.')
                : say('Horia: $f\'=0$. Begiratu kolorea aldatzen den bi aldeetan.', 'Ámbar: $f\'=0$. Mira si el color cambia a los dos lados.', 'برتقالي: $f\'=0$. انظر هل يتغير اللون على الجانبين.', 'Amber: $f\'=0$. See whether the colour changes on both sides.')
    const readout = (
        <Predict
            language={props.language}
            question={say(`Ikusi aurretik: $${formula}$ funtzioan, $x=${setup.p}$ puntuan $f'=0$ da. Maximoa, minimoa ala bat ere ez?`, `Antes de verlo: en $${formula}$, en $x=${setup.p}$ es $f'=0$. ¿Máximo, mínimo o ninguno?`, `قبل أن ترى: في $${formula}$ يكون $f'=0$ عند $x=${setup.p}$. عظمى أم صغرى أم لا هذه ولا تلك؟`, `Before you see it: in $${formula}$, $f'=0$ at $x=${setup.p}$. A maximum, a minimum or neither?`)}
            labels={KIND_LABELS}
            actual={signPrediction(state)}
            choice={state.prediction}
            tip={say(`Begiratu $${localize(props.language, setup.derivativeLatex)}$ deribatuaren zeinuari $x=${setup.p}$ puntuaren bi aldeetan.`, `Mira el signo de $${localize(props.language, setup.derivativeLatex)}$ a los dos lados de $x=${setup.p}$.`, `انظر إلى إشارة $${localize(props.language, setup.derivativeLatex)}$ على جانبي $x=${setup.p}$.`, `Look at the sign of $${localize(props.language, setup.derivativeLatex)}$ on both sides of $x=${setup.p}$.`)}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout latex={[formula, localize(props.language, setup.derivativeLatex), probeSlope === null ? `x=${t(probe)}\\notin D` : `f'(${t(probe)})=${t(probeSlope)}`]} note={l(light)} />
        </Predict>
    )
    // The strip is painted from the left end up to the probe
    const painted = signPieces(state.fn).map((piece) => ({ ...piece, to: Math.min(piece.to, x) })).filter((piece) => piece.to > piece.from)
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={signChallenges} extraChallenges={signExtra} state={state}>
            <Board height={250} label={l(say(`${plainName(SIGN_NAMES[state.fn])} funtzioa eta haren deribatuaren zeinuaren semaforoa`, `${plainName(SIGN_NAMES[state.fn])} y el semáforo del signo de su derivada`, `${plainName(SIGN_NAMES[state.fn])} وإشارة مشتقتها`, `${plainName(SIGN_NAMES[state.fn])} and the traffic light of the sign of its derivative`))}>
                {clip.defs}
                <Grid xMin={xMin} xMax={xMax} yMin={yMin} yMax={yMax} X={X} Y={Y} yStep={yMax - yMin > 5 ? 2 : 1} />
                <g clipPath={clip.url}>
                    <path d={curvePath(setup.fn, xMin, xMax, X, Y, [yMin, yMax])} fill="none" stroke={STAGE} strokeWidth={3} strokeLinejoin="round" />
                    {shown && slope !== null && <line {...lineThrough(x, fx, slope, x - 0.9, x + 0.9, X, Y)} stroke={INK} strokeWidth={2.2} />}
                </g>
                {setup.holes.map((hole) => <line key={hole} x1={X(hole)} x2={X(hole)} y1={Y(yMax)} y2={Y(yMin)} stroke={MUTED} strokeWidth={1.6} strokeDasharray="6 4" />)}
                <text x={30} y={stripY + 16} textAnchor="end" fontSize={14} fontWeight={700} fill={INK}>f′</text>
                <rect x={X(xMin)} y={stripY} width={300} height={22} rx={6} fill={PAPER} stroke="#e6dfd2" />
                {shown && painted.map((piece) => (
                    <g key={piece.from}>
                        <rect x={X(piece.from) + 1} y={stripY + 2} width={Math.max(0, X(piece.to) - X(piece.from) - 2)} height={18} rx={4} fill={piece.sign > 0 ? GREEN : SECOND} opacity={0.85} />
                        {X(piece.to) - X(piece.from) > 26 && <text x={(X(piece.from) + X(piece.to)) / 2} y={stripY + 16} textAnchor="middle" fontSize={14} fontWeight={700} fill={PAPER}>{piece.sign > 0 ? '+ ↗' : '− ↘'}</text>}
                    </g>
                ))}
                {shown && setup.zeros.filter((zero) => zero <= x + 1e-9).map((zero) => <circle key={zero} cx={X(zero)} cy={stripY + 11} r={6} fill={MUSTARD} stroke={INK} strokeWidth={1.2} />)}
                {!shown && <Hidden x={190} y={stripY + 19} size={20} />}
                {!shown && <Dot x={X(setup.p)} y={Y(setup.fn(setup.p))} color={INK} />}
                {shown && slope !== null && <Dot x={X(x)} y={Y(fx)} color={INK} r={6} />}
                {shown && <line x1={X(x)} x2={X(x)} y1={Y(yMin)} y2={stripY} stroke={MUTED} strokeWidth={1} strokeDasharray="3 3" />}
            </Board>
            <PlayButton label={l(say('Ibili kurban zehar', 'Recorre la curva', 'تجوّل على المنحنى', 'Walk along the curve'))} disabled={!shown} playing={playback.playing} onPlay={playback.play} />
        </ToolFrame>
    )
}

/* ---------- L3. The box without a lid ---------- */

export function BoxTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<BoxState>(initialBoxState)
    const shown = state.prediction !== null
    const side = boxSide(state)
    const playback = usePlayback(`${state.size}-${state.k}`, 2600)
    const limits = boxLimits(state.size)
    const x = shown && playback.progress !== null ? 0.25 + playback.progress * (side / 2 - 0.5) : boxCut(state)
    const v = volume(side, x)
    const best = volume(side, bestCut(side))
    const top = best * 1.15
    // The sheet, 140 wide whatever its side
    const s = 140 / side
    const [sx, sy] = [16, 46]
    // The graph of V(x), x from 0 to L/2
    const GX = (value: number) => 196 + (value / (side / 2)) * 150
    const GY = (value: number) => 214 - (value / top) * 170
    const controls = (
        <>
            <Segmented<string> label={l(say('Txapa', 'Chapa', 'الصفيحة', 'Sheet'))} value={String(side)} options={BOX_SIZES.map((size) => ({ value: String(size), label: `${size} cm` }))} onChange={(value) => setState((current) => setBox(current, { size: BOX_SIZES.indexOf(Number(value) as (typeof BOX_SIZES)[number]) }))} />
            <Stepper label={l(say('Ebakia: x (cm)', 'Corte: x (cm)', 'القطع: x (سم)', 'Cut: x (cm)'))} value={state.k} min={limits.min} max={limits.max} format={(k) => num(k / 2, props.language, 1)} onChange={(k) => setState((current) => setBox(current, { k }))} language={props.language} />
        </>
    )
    const t = (value: number, digits = 2) => texDec(value, props.language, digits)
    const cut = boxCut(state)
    const slope = volumeSlope(side, cut)
    const note = slope > 1e-9
        ? say('$V\'>0$: gehiago moztuz gero, bolumena handitu egiten da.', '$V\'>0$: si cortas más, el volumen crece.', '$V\'>0$: إذا قطعت أكثر زاد الحجم.', '$V\'>0$: if you cut more, the volume grows.')
        : slope < -1e-9
            ? say('$V\'<0$: gehiegi moztu duzu; gutxiago moztuz gero, bolumena handitzen da.', '$V\'<0$: has cortado de más; si cortas menos, el volumen crece.', '$V\'<0$: قطعت أكثر من اللازم؛ إذا قطعت أقل زاد الحجم.', '$V\'<0$: you have cut too much; if you cut less, the volume grows.')
            : say('$V\'=0$: hau da bolumen maximoa.', '$V\'=0$: este es el volumen máximo.', '$V\'=0$: هذا أكبر حجم.', '$V\'=0$: this is the greatest volume.')
    const readout = (
        <Predict
            language={props.language}
            question={say(`Ikusi aurretik: ${side} cm aldeko txaparekin, bolumen maximoa ematen duen ebakia 3 cm baino txikiagoa, 3 cm ala handiagoa izango da?`, `Antes de verlo: con la chapa de ${side} cm, ¿el corte que da el volumen máximo será menor que 3 cm, de 3 cm o mayor?`, `قبل أن ترى: بالصفيحة التي طول ضلعها ${side} سم، هل سيكون القطع الذي يعطي أكبر حجم أقل من 3 سم أو 3 سم أو أكثر؟`, `Before you see it: with the ${side} cm sheet, will the cut that gives the greatest volume be less than 3 cm, exactly 3 cm or more?`)}
            labels={{ '<': say('3 cm baino gutxiago', 'Menos de 3 cm', 'أقل من 3 سم', 'Less than 3 cm'), '=': say('3 cm', '3 cm', '3 سم', '3 cm'), '>': say('3 cm baino gehiago', 'Más de 3 cm', 'أكثر من 3 سم', 'More than 3 cm') }}
            actual={boxPrediction(state)}
            choice={state.prediction}
            tip={say('Gutxi moztuz gero, kutxa laua da; asko moztuz gero, oinarria txikia. Onena tartean dago.', 'Si cortas poco, la caja es plana; si cortas mucho, la base es pequeña. Lo mejor está en medio.', 'إذا قطعت قليلًا كانت العلبة مسطحة، وإذا قطعت كثيرًا صغرت القاعدة. الأفضل في الوسط.', 'If you cut little, the box is flat; if you cut a lot, the base is small. The best is in between.')}
            onChoose={(prediction) => setState((current) => setPrediction(current, prediction))}
        >
            <Readout latex={[`V(x)=x(${side}-2x)^2`, `V(${t(cut, 1)})=${t(volume(side, cut), 1)}`, `V'(${t(cut, 1)})=${t(slope, 1)}`]} note={l(note)} />
        </Predict>
    )
    const corner = x * s
    const inner = side * s - 2 * corner
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={boxChallenges} extraChallenges={boxExtra} state={state}>
            <Board height={250} label={l(say(`${side} cm aldeko txapa, izkinetan x aldeko karratuak moztuta, eta V(x) bolumenaren grafikoa`, `Chapa de ${side} cm con cuadrados de lado x cortados en las esquinas, y la gráfica del volumen V(x)`, `صفيحة طول ضلعها ${side} سم مقطوع من أركانها مربعات ضلعها x، ورسم الحجم V(x)`, `A ${side} cm sheet with squares of side x cut from the corners, and the graph of the volume V(x)`))}>
                <text x={sx + 70} y={30} textAnchor="middle" fontSize={14} fontWeight={700} fill={INK}>{`L = ${side}`}</text>
                <rect x={sx} y={sy} width={140} height={140} fill={STAGE_TINT} stroke={INK} strokeWidth={1.6} />
                {[[0, 0], [1, 0], [0, 1], [1, 1]].map(([i, j]) => (
                    <rect key={`${i}${j}`} x={sx + i * (140 - corner)} y={sy + j * (140 - corner)} width={corner} height={corner} fill={PAPER} stroke={SECOND} strokeWidth={1.4} strokeDasharray="4 3" />
                ))}
                <rect x={sx + corner} y={sy + corner} width={Math.max(0, inner)} height={Math.max(0, inner)} fill="none" stroke={STAGE} strokeWidth={1.4} strokeDasharray="5 4" />
                <text x={sx + corner / 2} y={sy + corner / 2 + 5} textAnchor="middle" fontSize={13} fontWeight={700} fill={SECOND}>{corner > 16 ? 'x' : ''}</text>
                <text x={sx + 70} y={sy + 76} textAnchor="middle" fontSize={13} fontWeight={700} fill={INK}>{inner > 60 ? `${num(side - 2 * x, props.language, 1)}` : ''}</text>
                <text x={sx + 70} y={sy + 166} textAnchor="middle" fontSize={13} fill={MUTED}>{`x = ${num(x, props.language, 1)}`}</text>
                {/* V(x) */}
                <line x1={GX(0)} x2={GX(side / 2) + 6} y1={GY(0)} y2={GY(0)} stroke={INK} strokeWidth={1.4} />
                <line x1={GX(0)} x2={GX(0)} y1={GY(0)} y2={GY(top) - 6} stroke={INK} strokeWidth={1.4} />
                <text x={GX(0) - 4} y={GY(top) - 8} textAnchor="end" fontSize={12} fontWeight={700} fill={INK}>V</text>
                <text x={GX(side / 2) + 8} y={GY(0) + 4} fontSize={12} fontWeight={700} fill={INK}>x</text>
                {[side / 6, side / 2].map((tick) => <text key={tick} x={GX(tick)} y={GY(0) + 15} textAnchor="middle" fontSize={11} fill={MUTED}>{num(tick, props.language, 1)}</text>)}
                {shown && (
                    <g>
                        <line x1={GX(0)} x2={GX(side / 2)} y1={GY(best)} y2={GY(best)} stroke={MUTED} strokeWidth={1} strokeDasharray="3 3" />
                        <text x={GX(0) - 4} y={GY(best) + 4} textAnchor="end" fontSize={11} fill={MUTED}>{num(best, props.language, 0)}</text>
                        <path d={curvePath((value) => volume(side, value), 0, side / 2, GX, GY, [0, top], side / 300)} fill="none" stroke={STAGE} strokeWidth={2.6} />
                        <line x1={GX(x)} x2={GX(x)} y1={GY(0)} y2={GY(v)} stroke={SECOND} strokeWidth={1.2} strokeDasharray="3 3" />
                        <Dot x={GX(x)} y={GY(v)} color={SECOND} r={6} />
                    </g>
                )}
                {!shown && <Hidden x={GX(side / 4)} y={GY(best / 2)} />}
            </Board>
            <PlayButton label={l(say('Moztu gero eta gehiago', 'Corta cada vez más', 'اقطع أكثر فأكثر', 'Cut more and more'))} disabled={!shown} playing={playback.playing} onPlay={playback.play} />
        </ToolFrame>
    )
}

/* ---------- L4. Concavity with the tangent ---------- */

const SIDE_LABELS = {
    '<': say('Azpian (∩)', 'Por debajo (∩)', 'تحته (∩)', 'Below (∩)'),
    '=': say('Zeharkatzen du', 'La atraviesa', 'يخترقه', 'It crosses'),
    '>': say('Gainean (∪)', 'Por encima (∪)', 'فوقه (∪)', 'Above (∪)')
}

export function CurveTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<CurveState>(initialCurveState)
    const shown = state.prediction !== null
    const setup = CURVE_SETUP[state.fn]
    const [xMin, xMax] = [-3, 3]
    const [yMin, yMax] = setup.view
    const X = (x: number) => 40 + (x - xMin) * 50
    const Y = (y: number) => 14 + (yMax - y) * (220 / (yMax - yMin))
    const clip = useClip(X(xMin), Y(yMax), 300, 220)
    const playback = usePlayback(`${state.fn}-${state.t}`, 2800)
    const raw = shown && playback.progress !== null ? xMin + playback.progress * (xMax - xMin) : curveX(state)
    // While playing, the tangent skips the points where f does not exist
    const x = setup.holes.some((hole) => Math.abs(hole - raw) < 0.08) ? raw + 0.16 : raw
    const exists = !setup.holes.some((hole) => Math.abs(hole - x) < 1e-9)
    const fx = setup.fn(x)
    const m = setup.derivative(x)
    const controls = (
        <>
            <Segmented<CurveFunction> label={l(say('Funtzioa', 'Función', 'الدالة', 'Function'))} value={state.fn} options={CURVE_FUNCTIONS.map((fn) => ({ value: fn, label: plainName(CURVE_NAMES[fn]) }))} onChange={(fn) => setState((s) => setCurve(s, { fn }))} />
            <Stepper label={l(say('Zuzen ukitzailea: x', 'Tangente: x', 'المماس: x', 'Tangent: x'))} value={state.t} min={CURVE_LIMITS.t.min} max={CURVE_LIMITS.t.max} format={(t) => num(t / 2, props.language, 1)} onChange={(t) => setState((s) => setCurve(s, { t }))} language={props.language} />
        </>
    )
    const formula = localize(props.language, setup.latex)
    const t = (value: number) => texDec(value, props.language, 3)
    const probe = curveX(state)
    const side = curveSide(state.fn, probe)
    const note = side === null
        ? say('$f$ ez da existitzen hemen.', '$f$ no existe aquí.', '$f$ غير موجودة هنا.', '$f$ does not exist here.')
        : side === 'above'
            ? say('Kurba zuzen ukitzailearen gainean dago: ahurra (∪), $f\'\'>0$.', 'La curva queda por encima de la tangente: cóncava (∪), $f\'\'>0$.', 'المنحنى فوق المماس: مقعّر نحو الأعلى (∪)، $f\'\'>0$.', 'The curve lies above the tangent: concave up (∪), $f\'\'>0$.')
            : side === 'below'
                ? say('Kurba zuzen ukitzailearen azpian dago: ganbila (∩), $f\'\'<0$.', 'La curva queda por debajo de la tangente: convexa (∩), $f\'\'<0$.', 'المنحنى تحت المماس: مقعّر نحو الأسفل (∩)، $f\'\'<0$.', 'The curve lies below the tangent: concave down (∩), $f\'\'<0$.')
                : say('Zuzen ukitzaileak kurba zeharkatzen du: inflexio-puntua.', 'La tangente atraviesa la curva: punto de inflexión.', 'يخترق المماس المنحنى: نقطة انعطاف.', 'The tangent crosses the curve: a point of inflection.')
    const readout = (
        <Predict
            language={props.language}
            question={say(`Ikusi aurretik: $${formula}$ funtzioan, $x=${setup.p}$ puntuan, kurba zuzen ukitzailearen gainean geratuko da, zeharkatu egingo du ala azpian geratuko da?`, `Antes de verlo: en $${formula}$, en $x=${setup.p}$, ¿la curva quedará por encima de la tangente, la atravesará o quedará por debajo?`, `قبل أن ترى: في $${formula}$ عند $x=${setup.p}$، هل سيبقى المنحنى فوق المماس أم يخترقه أم يبقى تحته؟`, `Before you see it: in $${formula}$, at $x=${setup.p}$, will the curve stay above the tangent, cross it or stay below it?`)}
            labels={SIDE_LABELS}
            actual={curvePrediction(state)}
            choice={state.prediction}
            tip={say(`Begiratu $${localize(props.language, setup.secondLatex)}$ deribatuaren zeinuari $x=${setup.p}$ puntuaren bi aldeetan.`, `Mira el signo de $${localize(props.language, setup.secondLatex)}$ a los dos lados de $x=${setup.p}$.`, `انظر إلى إشارة $${localize(props.language, setup.secondLatex)}$ على جانبي $x=${setup.p}$.`, `Look at the sign of $${localize(props.language, setup.secondLatex)}$ on both sides of $x=${setup.p}$.`)}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout latex={[formula, localize(props.language, setup.secondLatex), side === null ? `x=${t(probe)}\\notin D` : `f''(${t(probe)})=${t(setup.second(probe))}`]} note={l(note)} />
        </Predict>
    )
    // The gap between the curve and the tangent, on each side of the point: green above, red below
    const gap = (from: number, to: number) => {
        const points: string[] = []
        const steps = 24
        for (let i = 0; i <= steps; i += 1) {
            const value = from + ((to - from) * i) / steps
            points.push(`${X(value).toFixed(1)},${Y(setup.fn(value)).toFixed(1)}`)
        }
        for (let i = steps; i >= 0; i -= 1) {
            const value = from + ((to - from) * i) / steps
            points.push(`${X(value).toFixed(1)},${Y(fx + m * (value - x)).toFixed(1)}`)
        }
        const middle = (from + to) / 2
        const above = setup.fn(middle) - (fx + m * (middle - x)) > 0
        return <polygon key={from} points={points.join(' ')} fill={above ? GREEN_TINT : SECOND_TINT} stroke="none" opacity={0.9} />
    }
    const reach = 1.1
    const left = setup.holes.some((hole) => hole < x && hole > x - reach) ? Math.max(...setup.holes.filter((hole) => hole < x)) + 0.05 : x - reach
    const right = setup.holes.some((hole) => hole > x && hole < x + reach) ? Math.min(...setup.holes.filter((hole) => hole > x)) - 0.05 : x + reach
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={curveChallenges} extraChallenges={curveExtra} state={state}>
            <Board height={260} label={l(say(`${plainName(CURVE_NAMES[state.fn])} eta haren zuzen ukitzailea; berdea, kurba gainean; gorria, azpian`, `${plainName(CURVE_NAMES[state.fn])} y su tangente; verde, la curva por encima; rojo, por debajo`, `${plainName(CURVE_NAMES[state.fn])} ومماسها؛ الأخضر حين يكون المنحنى فوقه والأحمر حين يكون تحته`, `${plainName(CURVE_NAMES[state.fn])} and its tangent; green, the curve above it; red, below it`))}>
                {clip.defs}
                <Grid xMin={xMin} xMax={xMax} yMin={yMin} yMax={yMax} X={X} Y={Y} yStep={yMax - yMin > 5 ? 2 : 1} />
                <g clipPath={clip.url}>
                    {shown && exists && [gap(left, x), gap(x, right)]}
                    <path d={curvePath(setup.fn, xMin, xMax, X, Y, [yMin, yMax])} fill="none" stroke={STAGE} strokeWidth={3} strokeLinejoin="round" />
                    {shown && exists && <line {...lineThrough(x, fx, m, left - 0.3, right + 0.3, X, Y)} stroke={INK} strokeWidth={2.2} />}
                </g>
                {setup.holes.map((hole) => <line key={hole} x1={X(hole)} x2={X(hole)} y1={Y(yMax)} y2={Y(yMin)} stroke={MUTED} strokeWidth={1.6} strokeDasharray="6 4" />)}
                {!shown && <Dot x={X(setup.p)} y={Y(setup.fn(setup.p))} color={INK} />}
                {!shown && <Hidden x={X(setup.p) + 30} y={Y(setup.fn(setup.p)) - 14} size={22} />}
                {shown && exists && <Dot x={X(x)} y={Y(fx)} color={INK} r={6} />}
            </Board>
            <PlayButton label={l(say('Eraman zuzen ukitzailea kurban zehar', 'Pasea la tangente por la curva', 'مرّر المماس على المنحنى', 'Ride the tangent along the curve'))} disabled={!shown} playing={playback.playing} onPlay={playback.play} />
        </ToolFrame>
    )
}

/* ---------- L5. Build the graph ---------- */

const X_RANGE: Record<LayerFunction, [number, number]> = { cubic: [-3, 3], quartic: [-2, 2], rational: [-3, 5], exp: [-4, 2] }

/** What each layer adds, written as formulas (the same in every language) */
const LAYER_FACTS: Record<LayerFunction, string[]> = {
    cubic: ['D=\\mathbb{R}', '(0,\\,0)\\quad (\\pm\\sqrt{3},\\,0)', '\\text{—}', '\\min\\ (-1,\\,-2)\\quad \\max\\ (1,\\,2)', '(0,\\,0)', 'f(x)=-x^3+3x'],
    quartic: ['D=\\mathbb{R}', '(0,\\,0)\\quad (\\pm\\sqrt{2},\\,0)', '\\text{—}', '\\max\\ (0,\\,0)\\quad \\min\\ \\left(\\pm 1,\\,-\\frac{1}{2}\\right)', 'x=\\pm\\frac{1}{\\sqrt{3}}', 'f(x)=\\frac{x^4}{2}-x^2'],
    rational: ['D=\\mathbb{R}-\\{1\\}', '(0,\\,0)', 'x=1\\quad y=x+1', '\\max\\ (0,\\,0)\\quad \\min\\ (2,\\,4)', '\\text{—}', 'f(x)=\\frac{x^2}{x-1}'],
    exp: ['D=\\mathbb{R}', '(0,\\,0)', 'y=0\\ (x\\to-\\infty)', '\\min\\ \\left(-1,\\,-\\frac{1}{e}\\right)', 'x=-2', 'f(x)=x\\,e^x']
}

export function LayersTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<LayerState>(initialLayerState)
    const shown = state.prediction !== null
    const setup = LAYER_SETUP[state.fn]
    const [xMin, xMax] = X_RANGE[state.fn]
    const [yMin, yMax] = setup.view
    const scale = 300 / (xMax - xMin)
    const X = (x: number) => 40 + (x - xMin) * scale
    const Y = (y: number) => 14 + (yMax - y) * (210 / (yMax - yMin))
    const clip = useClip(X(xMin), Y(yMax), 300, 210)
    const playback = usePlayback(`${state.fn}-${state.layers}`, 3000)
    const layers = shown && playback.progress !== null ? Math.min(LAYER_COUNT, Math.floor(playback.progress * (LAYER_COUNT + 0.999))) : shown ? state.layers : 0
    const controls = (
        <>
            <Segmented<LayerFunction> label={l(say('Funtzioa', 'Función', 'الدالة', 'Function'))} value={state.fn} options={LAYER_FUNCTIONS.map((fn) => ({ value: fn, label: plainName(LAYER_NAMES[fn]) }))} onChange={(fn) => setState((s) => setLayers(s, { fn }))} />
            <Stepper label={l(say('Geruzak', 'Capas', 'الطبقات', 'Layers'))} value={state.layers} min={0} max={LAYER_COUNT} onChange={(value) => setState((s) => setLayers(s, { layers: value }))} language={props.language} />
        </>
    )
    const formula = localize(props.language, setup.latex)
    // The sixth fact is the formula itself, already on the first line
    const facts = LAYER_FACTS[state.fn].slice(0, Math.min(state.layers, LAYER_COUNT - 1))
    const current = state.layers > 0 ? LAYER_TITLES[state.layers - 1] : null
    const note = current
        ? say(`${state.layers}. geruza, ${LAYER_COUNT} guztira: ${current.eu}.`, `Capa ${state.layers} de ${LAYER_COUNT}: ${current.es}.`, `الطبقة ${state.layers} من ${LAYER_COUNT}: ${current.ar}.`, `Layer ${state.layers} of ${LAYER_COUNT}: ${current.en}.`)
        : say('Gehitu geruzak, banan-banan.', 'Añade las capas, una a una.', 'أضف الطبقات واحدة تلو الأخرى.', 'Add the layers, one by one.')
    const readout = (
        <Predict
            language={props.language}
            question={say(`Ikusi aurretik: $${formula}$ funtzioak zenbat mutur erlatibo ditu, 2 baino gutxiago, 2 ala gehiago?`, `Antes de verlo: ¿cuántos extremos relativos tiene $${formula}$: menos de 2, 2 o más?`, `قبل أن ترى: كم قيمة قصوى محلية للدالة $${formula}$: أقل من 2 أم 2 أم أكثر؟`, `Before you see it: how many local extrema does $${formula}$ have: fewer than 2, 2 or more?`)}
            labels={{ '<': say('2 baino gutxiago', 'Menos de 2', 'أقل من 2', 'Fewer than 2'), '=': say('2', '2', '2', '2'), '>': say('2 baino gehiago', 'Más de 2', 'أكثر من 2', 'More than 2') }}
            actual={layerPrediction(state)}
            choice={state.prediction}
            tip={say('Begiratu $f\'$ deribatuaren zeroei eta haien zeinu-aldaketei.', 'Mira los ceros de $f\'$ y si cambia de signo en ellos.', 'انظر إلى أصفار $f\'$ وهل تتغير إشارتها عندها.', 'Look at the zeros of $f\'$ and whether it changes sign at them.')}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout latex={[formula, ...facts]} note={l(note)} />
        </Predict>
    )
    const growth = (() => {
        const cuts = [xMin, ...[...setup.maxima, ...setup.minima].map((mark) => mark.x), ...setup.holes, xMax].sort((p, q) => p - q)
        return cuts.slice(0, -1).map((from, index) => ({ from, to: cuts[index + 1], up: setup.derivative((from + cuts[index + 1]) / 2) > 0 }))
    })()
    const bends = (() => {
        const cuts = [xMin, ...setup.inflections.map((mark) => mark.x), ...setup.holes, xMax].sort((p, q) => p - q)
        return cuts.slice(0, -1).map((from, index) => ({ from, to: cuts[index + 1], up: setup.second((from + cuts[index + 1]) / 2) > 0 }))
    })()
    // An arrow on the y-axis would hide its numbers
    const clearOfAxis = (at: number) => (Math.abs(at - X(0)) < 14 ? X(0) + 16 : at)
    const line = (m: number, n: number, from: number, to: number) => ({ x1: X(from), y1: Y(m * from + n), x2: X(to), y2: Y(m * to + n) })
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={layerChallenges} extraChallenges={layerExtra} state={state}>
            <Board height={250} label={l(say(`${plainName(LAYER_NAMES[state.fn])} funtzioaren grafikoa, geruzaka`, `La gráfica de ${plainName(LAYER_NAMES[state.fn])}, por capas`, `رسم ${plainName(LAYER_NAMES[state.fn])} طبقةً طبقة`, `The graph of ${plainName(LAYER_NAMES[state.fn])}, layer by layer`))}>
                {clip.defs}
                <Grid xMin={xMin} xMax={xMax} yMin={yMin} yMax={yMax} X={X} Y={Y} yStep={yMax - yMin > 6 ? 2 : 1} />
                <g clipPath={clip.url}>
                    {/* 1. Domain: a band along the x-axis, with a gap where f does not exist */}
                    {layers >= 1 && <line x1={X(xMin)} x2={X(xMax)} y1={Y(0)} y2={Y(0)} stroke={STAGE} strokeWidth={7} opacity={0.35} />}
                    {layers >= 1 && setup.holes.map((hole) => <circle key={`h${hole}`} cx={X(hole)} cy={Y(0)} r={6} fill={PAPER} stroke={STAGE} strokeWidth={2} />)}
                    {/* 3. Asymptotes */}
                    {layers >= 3 && setup.holes.map((hole) => <line key={`v${hole}`} x1={X(hole)} x2={X(hole)} y1={Y(yMax)} y2={Y(yMin)} stroke={MUTED} strokeWidth={1.8} strokeDasharray="6 4" />)}
                    {layers >= 3 && setup.lines.map((asymptote) => <line key={`a${asymptote.m}${asymptote.n}`} {...line(asymptote.m, asymptote.n, asymptote.side > 0 ? 0 : xMin, asymptote.side < 0 ? 0 : xMax)} stroke={MUTED} strokeWidth={1.8} strokeDasharray="6 4" />)}
                    {/* 4. Increase and decrease: arrows along the bottom */}
                    {layers >= 4 && growth.filter((piece) => X(piece.to) - X(piece.from) > 20).map((piece) => <text key={`g${piece.from}`} x={clearOfAxis((X(piece.from) + X(piece.to)) / 2)} y={Y(yMin) - 8} textAnchor="middle" fontSize={18} fontWeight={700} fill={piece.up ? GREEN : SECOND}>{piece.up ? '↗' : '↘'}</text>)}
                    {/* 5. Concavity: ∪ and ∩ along the top */}
                    {layers >= 5 && bends.filter((piece) => X(piece.to) - X(piece.from) > 20).map((piece) => <text key={`c${piece.from}`} x={(X(piece.from) + X(piece.to)) / 2} y={Y(yMax) + 20} textAnchor="middle" fontSize={18} fontWeight={700} fill={MUSTARD}>{piece.up ? '∪' : '∩'}</text>)}
                    {/* 6. The curve */}
                    {layers >= 6 && <path d={curvePath(setup.fn, xMin, xMax, X, Y, [yMin, yMax])} fill="none" stroke={STAGE} strokeWidth={3} strokeLinejoin="round" />}
                </g>
                {/* 2. Intercepts */}
                {layers >= 2 && setup.cuts.map((mark) => <Dot key={`k${mark.x}`} x={X(mark.x)} y={Y(mark.y)} color={INK} r={4.5} />)}
                {layers >= 4 && setup.maxima.map((mark) => <Dot key={`M${mark.x}`} x={X(mark.x)} y={Y(mark.y)} color={SECOND} />)}
                {layers >= 4 && setup.minima.map((mark) => <Dot key={`m${mark.x}`} x={X(mark.x)} y={Y(mark.y)} color={VIOLET} />)}
                {layers >= 5 && setup.inflections.map((mark) => <Dot key={`i${mark.x}`} x={X(mark.x)} y={Y(mark.y)} color={MUSTARD} />)}
                {!shown && <Hidden x={300} y={56} />}
            </Board>
            <PlayButton label={l(say('Muntatu geruzaka', 'Monta capa a capa', 'ابنِ طبقةً طبقة', 'Build it layer by layer'))} disabled={!shown} playing={playback.playing} onPlay={playback.play} />
        </ToolFrame>
    )
}

