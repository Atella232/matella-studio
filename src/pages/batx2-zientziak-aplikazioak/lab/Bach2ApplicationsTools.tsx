import { useId, useState } from 'react'
import { Segmented, Stepper, ToolFrame } from '../../../features/unit-v2/lab/LabKit'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import { useLabText } from '../../../features/unit-v2/lab/useLabText'
import type { LocalizedText, UnitLanguage } from '../../../features/unit-v2/types'
import { localize, say } from '../../batx1-zientziak-funtzioak/text'
import { Board, Hidden, Predict, Readout } from '../../dbh3-segidak/lab/LabParts'
import { dec, GREEN, INK, MUTED, PAPER, SECOND, STAGE, texDec } from '../../dbh3-segidak/lab/labStyle'
import { setPrediction } from '../../dbh3-segidak/lab/prediction'
import { DISTANCE_CURVES, DISTANCE_SETUP, distanceChallenges, distanceExtra, distancePrediction, distanceReading, initialDistanceState, setDistance, squaredDistance, type DistanceCurve, type DistanceState } from './distance'
import { hopitalChallenges, hopitalExtra, hopitalPrediction, hopitalValues, initialHopitalState, QUOTIENT_SETUP, QUOTIENTS, setHopital, STEPS, type HopitalState, type QuotientId } from './hopitalLens'
import { initialMeanState, MEAN_FUNCTIONS, MEAN_SETUP, meanChallenges, meanExtra, meanPrediction, meanResult, setMean, type MeanFunction, type MeanState } from './meanValue'
import { initialRolleState, ROLLE_FUNCTIONS, ROLLE_SETUP, rolleChallenges, rolleExtra, rollePrediction, rolleResult, setRolle, type RolleFunction, type RolleState } from './rolle'

/* ==========================================================================
   Deribatuaren aplikazioak · Batxilergoa 2 · Zientziak — the four tools
   of this unit: Rolle looks for the point, the secant and its parallel
   tangent, L'Hôpital up close and the shortest distance to a curve. Each
   asks for a prediction before it shows the answer on the board. The
   boards carry numbers and formulas only (the svg is left to right); the
   words go in the readout. Logic in rolle.ts, meanValue.ts,
   hopitalLens.ts and distance.ts. curvePath, Grid and useClip are copies
   of those of Deribatuak 2.º (which does not export them).
   ========================================================================== */

const VIOLET = '#7a4fc9'

const minus = (value: number) => (value < 0 ? `−${-value}` : String(value))
/** A number for the board, with the language's decimal mark and a real minus sign */
const num = (value: number, language: UnitLanguage, digits = 3) => dec(value, language, digits).replace('-', '−')
/** Between the coordinates of a point: a semicolon where the decimal mark is a comma */
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

/** A light grid with the axes and the numbers every `step` units */
function Grid({ xMin, xMax, yMin, yMax, X, Y, xStep = 1, yStep = 1 }: { xMin: number; xMax: number; yMin: number; yMax: number; X: (x: number) => number; Y: (y: number) => number; xStep?: number; yStep?: number }) {
    const xs = Array.from({ length: Math.floor(xMax - xMin) + 1 }, (_, i) => Math.ceil(xMin) + i).filter((x) => x <= xMax)
    const ys = Array.from({ length: Math.floor(yMax - yMin) + 1 }, (_, i) => Math.ceil(yMin) + i).filter((y) => y <= yMax)
    const axisY = Y(Math.min(yMax, Math.max(yMin, 0)))
    const axisX = X(Math.min(xMax, Math.max(xMin, 0)))
    return (
        <g>
            <rect x={X(xMin)} y={Y(yMax)} width={X(xMax) - X(xMin)} height={Y(yMin) - Y(yMax)} fill={PAPER} />
            {xs.map((x) => <line key={`x${x}`} x1={X(x)} x2={X(x)} y1={Y(yMin)} y2={Y(yMax)} stroke="#e6dfd2" strokeWidth={1} />)}
            {ys.filter((y) => y % yStep === 0).map((y) => <line key={`y${y}`} x1={X(xMin)} x2={X(xMax)} y1={Y(y)} y2={Y(y)} stroke="#e6dfd2" strokeWidth={1} />)}
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

/* ---------- L1. Rolle looks for the point ---------- */

const ROLLE_NAMES: Record<RolleFunction, string> = { parabola: 'f₁', cubic: 'f₂', abs: 'f₃', jump: 'f₄', wave: 'f₅' }
/** The values of a and b as plain text for the steppers */
const plainPoint = (label: string) => label.replace('-\\sqrt{3}', '−√3').replace('\\sqrt{3}', '√3').replace('\\frac{\\pi}{2}', 'π/2').replace('\\frac{3\\pi}{2}', '3π/2').replace('2\\pi', '2π').replace('\\pi', 'π').replace('-', '−')

export function RolleTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<RolleState>(initialRolleState)
    const shown = state.prediction !== null
    const setup = ROLLE_SETUP[state.fn]
    const { X, Y } = frame(setup.view)
    const clip = useClip(40, 20, 300, 200)
    const result = rolleResult(state)
    const t = (value: number) => texDec(value, props.language, 3)
    const label = (value: number) => setup.labels[setup.points.findIndex((point) => Math.abs(point - value) < 1e-9)] ?? t(value)
    const last = setup.points.length - 1
    const controls = (
        <>
            <Segmented<RolleFunction> label={l(say('Funtzioa', 'Función', 'الدالة', 'Function'))} value={state.fn} options={ROLLE_FUNCTIONS.map((fn) => ({ value: fn, label: ROLLE_NAMES[fn] }))} onChange={(fn) => setState((s) => setRolle(s, { fn }))} />
            <Stepper label="a" value={state.a} min={0} max={last} format={(k) => plainPoint(setup.labels[k])} onChange={(a) => setState((s) => setRolle(s, { a }))} language={props.language} />
            <Stepper label="b" value={state.b} min={0} max={last} format={(k) => plainPoint(setup.labels[k])} onChange={(b) => setState((s) => setRolle(s, { b }))} language={props.language} />
        </>
    )
    const [startA, startB] = setup.start.map((k) => setup.labels[k])
    const count = result.cs.length
    const notes: Record<NonNullable<typeof result.failure>, LocalizedText> = {
        order: say('Aukeratu $a<b$.', 'Elige $a<b$.', 'اختر $a<b$.', 'Choose $a<b$.'),
        jump: say('$f$ funtzioak jauzi egiten du $x=1$ puntuan: ez da jarraitua $[a,b]$ tartean, eta Rollek ez du $c$ punturik ziurtatzen.', '$f$ salta en $x=1$: no es continua en $[a,b]$, y Rolle no asegura ningún $c$.', 'تقفز $f$ عند $x=1$: فهي غير متصلة على $[a,b]$، ولا تضمن مبرهنة رول أي $c$.', '$f$ jumps at $x=1$: it is not continuous on $[a,b]$, and Rolle guarantees no $c$.'),
        corner: say('$f$ funtzioak punta bat du $x=0$ puntuan: ez da deribagarria $(a,b)$ tartean, eta Rollek ez du $c$ punturik ziurtatzen.', '$f$ tiene un pico en $x=0$: no es derivable en $(a,b)$, y Rolle no asegura ningún $c$.', 'للدالة $f$ زاوية عند $x=0$: فهي غير قابلة للاشتقاق على $(a,b)$، ولا تضمن مبرهنة رول أي $c$.', '$f$ has a corner at $x=0$: it is not differentiable on $(a,b)$, and Rolle guarantees no $c$.'),
        heights: say('$f(a)\\neq f(b)$: Rolle ez da aplikatzen.', '$f(a)\\neq f(b)$: Rolle no se aplica.', '$f(a)\\neq f(b)$: لا تنطبق مبرهنة رول.', '$f(a)\\neq f(b)$: Rolle does not apply.')
    }
    const note = result.failure
        ? notes[result.failure]
        : count === 1
            ? say(`Hiru hipotesiak betetzen dira: $c=${label(result.cs[0])}$ puntuan zuzen ukitzailea horizontala da.`, `Se cumplen las tres hipótesis: en $c=${label(result.cs[0])}$ la tangente es horizontal.`, `تتحقق الفرضيات الثلاث: عند $c=${label(result.cs[0])}$ يكون المماس أفقيًّا.`, `The three hypotheses hold: at $c=${label(result.cs[0])}$ the tangent is horizontal.`)
            : say(`Hiru hipotesiak betetzen dira, eta ${count} $c$ puntu daude: Rollek gutxienez bat ziurtatzen du.`, `Se cumplen las tres hipótesis y hay ${count} puntos $c$: Rolle asegura al menos uno.`, `تتحقق الفرضيات الثلاث وتوجد ${count} نقاط $c$: تضمن مبرهنة رول واحدة على الأقل.`, `The three hypotheses hold and there are ${count} points $c$: Rolle guarantees at least one.`)
    const cs = result.cs.map((c) => label(c)).join(',\\ ')
    const readout = (
        <Predict
            language={props.language}
            question={say(`Ikusi aurretik: $f(x)=${setup.latex}$ funtzioan, $[${startA},\\,${startB}]$ tartean, zenbat $c$ puntu egongo dira zuzen ukitzaile horizontalarekin?`, `Antes de verlo: en $f(x)=${setup.latex}$, en $[${startA},\\,${startB}]$, ¿cuántos puntos $c$ con tangente horizontal habrá?`, `قبل أن ترى: في $f(x)=${setup.latex}$ على $[${startA},\\,${startB}]$، كم نقطة $c$ بمماس أفقي ستوجد؟`, `Before you see it: in $f(x)=${setup.latex}$, on $[${startA},\\,${startB}]$, how many points $c$ with a horizontal tangent will there be?`)}
            labels={{ '<': say('Bat ere ez', 'Ninguno', 'لا شيء', 'None'), '=': say('Bat', 'Uno', 'واحدة', 'One'), '>': say('Bat baino gehiago', 'Más de uno', 'أكثر من واحدة', 'More than one') }}
            actual={rollePrediction(state)}
            choice={state.prediction}
            tip={say('Rollek hiru hipotesiak behar ditu, eta $c$ bat baino gehiago egon daiteke.', 'Rolle necesita las tres hipótesis, y puede haber más de un $c$.', 'تحتاج مبرهنة رول إلى الفرضيات الثلاث، وقد توجد أكثر من $c$ واحدة.', 'Rolle needs the three hypotheses, and there can be more than one $c$.')}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout latex={[localize(props.language, `f(x)=${setup.latex}`), `f(a)=${t(result.fa)}\\qquad f(b)=${t(result.fb)}`, ...(result.failure ? [] : [`c=${cs}`])]} note={l(note)} />
        </Predict>
    )
    const { xMin, xMax } = setup.view
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={rolleChallenges} extraChallenges={rolleExtra} state={state}>
            <Board height={250} label={l(say(`${ROLLE_NAMES[state.fn]} funtzioa eta haren ebakitzailea a eta b artean`, `La función ${ROLLE_NAMES[state.fn]} y su secante entre a y b`, `الدالة ${ROLLE_NAMES[state.fn]} وقاطعها بين a وb`, `The function ${ROLLE_NAMES[state.fn]} and its secant between a and b`))}>
                {clip.defs}
                <Grid {...setup.view} X={X} Y={Y} />
                <g clipPath={clip.url}>
                    <path d={curvePath(setup.f, xMin, xMax, X, Y, [setup.view.yMin, setup.view.yMax], 0.01)} fill="none" stroke={STAGE} strokeWidth={3} />
                    {result.a < result.b && <line x1={X(result.a)} y1={Y(result.fa)} x2={X(result.b)} y2={Y(result.fb)} stroke={INK} strokeWidth={2} strokeDasharray="6 5" />}
                    {shown && result.cs.map((c) => <line key={c} x1={X(c - 0.8)} x2={X(c + 0.8)} y1={Y(setup.f(c))} y2={Y(setup.f(c))} stroke={SECOND} strokeWidth={2.8} />)}
                </g>
                {setup.jumps.map((j) => <g key={j}><Open x={X(j)} y={Y(j)} color={STAGE} /><Full x={X(j)} y={Y(setup.f(j))} color={STAGE} /></g>)}
                <Full x={X(result.a)} y={Y(result.fa)} color={INK} />
                <Full x={X(result.b)} y={Y(result.fb)} color={INK} />
                <text x={X(result.a)} y={Y(result.fa) - 10} textAnchor="middle" fontSize={13} fontWeight={700} fill={INK}>A</text>
                <text x={X(result.b)} y={Y(result.fb) - 10} textAnchor="middle" fontSize={13} fontWeight={700} fill={INK}>B</text>
                {shown && result.cs.map((c) => <g key={`c${c}`}><Full x={X(c)} y={Y(setup.f(c))} color={SECOND} /><text x={X(c)} y={Y(setup.f(c)) + (setup.f(c) > (setup.view.yMin + setup.view.yMax) / 2 ? 22 : -12)} textAnchor="middle" fontSize={13} fontWeight={700} fill={SECOND}>c</text></g>)}
                {!shown && <Hidden x={322} y={52} />}
            </Board>
        </ToolFrame>
    )
}

/* ---------- L2. The secant and its parallel tangent ---------- */

const MEAN_NAMES: Record<MeanFunction, string> = { square: 'x²', cube: 'x³', root: '√x', exp: 'eˣ' }

export function MeanValueTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<MeanState>(initialMeanState)
    const shown = state.prediction !== null
    const setup = MEAN_SETUP[state.fn]
    const { X, Y } = frame(setup.view)
    const clip = useClip(40, 20, 300, 200)
    const result = meanResult(state)
    const t = (value: number) => texDec(value, props.language, 3)
    const last = setup.points.length - 1
    const controls = (
        <>
            <Segmented<MeanFunction> label={l(say('Funtzioa', 'Función', 'الدالة', 'Function'))} value={state.fn} options={MEAN_FUNCTIONS.map((fn) => ({ value: fn, label: MEAN_NAMES[fn] }))} onChange={(fn) => setState((s) => setMean(s, { fn }))} />
            <Stepper label="a" value={state.a} min={0} max={last} format={(k) => num(setup.points[k], props.language)} onChange={(a) => setState((s) => setMean(s, { a }))} language={props.language} />
            <Stepper label="b" value={state.b} min={0} max={last} format={(k) => num(setup.points[k], props.language)} onChange={(b) => setState((s) => setMean(s, { b }))} language={props.language} />
        </>
    )
    const [startA, startB] = setup.start.map((k) => t(setup.points[k]))
    const mid = (result.a + result.b) / 2
    const valid = result.a < result.b
    const note: LocalizedText = !valid
        ? say('Aukeratu $a<b$.', 'Elige $a<b$.', 'اختر $a<b$.', 'Choose $a<b$.')
        : result.cs.length === 2
            ? say('Bi $c$ puntu daude: bietan zuzen ukitzailea ebakitzailearen paraleloa da. Teoremak bat gutxienez ziurtatzen du.', 'Hay dos puntos $c$: en los dos la tangente es paralela a la secante. El teorema asegura al menos uno.', 'توجد نقطتان $c$: في كلتيهما يوازي المماس القاطع. وتضمن المبرهنة واحدة على الأقل.', 'There are two points $c$: at both the tangent is parallel to the secant. The theorem guarantees at least one.')
            : Math.abs(result.cs[0] - mid) < 1e-9
                ? say('$c$ puntua erdian dago: parabolan beti gertatzen da.', '$c$ está en el punto medio: en la parábola pasa siempre.', 'تقع $c$ في المنتصف: وهذا يحدث دائمًا في القطع المكافئ.', '$c$ is at the midpoint: with the parabola it always is.')
                : result.cs[0] > mid
                    ? say('$c$ puntua $b$ muturretik hurbilago dago: kurba $\\cup$ da tarte horretan.', '$c$ queda más cerca de $b$: la curva es $\\cup$ en ese intervalo.', 'تقع $c$ أقرب إلى $b$: المنحنى $\\cup$ على تلك الفترة.', '$c$ is nearer $b$: the curve is $\\cup$ on that interval.')
                    : say('$c$ puntua $a$ muturretik hurbilago dago: kurba $\\cap$ da tarte horretan.', '$c$ queda más cerca de $a$: la curva es $\\cap$ en ese intervalo.', 'تقع $c$ أقرب إلى $a$: المنحنى $\\cap$ على تلك الفترة.', '$c$ is nearer $a$: the curve is $\\cap$ on that interval.')
    const readout = (
        <Predict
            language={props.language}
            question={say(`Ikusi aurretik: $f(x)=${setup.latex}$ funtzioan, $[${startA},\\,${startB}]$ tartean, non egongo da $c$?`, `Antes de verlo: en $f(x)=${setup.latex}$, en $[${startA},\\,${startB}]$, ¿dónde estará $c$?`, `قبل أن ترى: في $f(x)=${setup.latex}$ على $[${startA},\\,${startB}]$، أين ستكون $c$؟`, `Before you see it: in $f(x)=${setup.latex}$, on $[${startA},\\,${startB}]$, where will $c$ be?`)}
            labels={{ '<': say('a muturretik hurbilago', 'Más cerca de a', 'أقرب إلى a', 'Nearer a'), '=': say('Erdiko puntuan', 'En el punto medio', 'في المنتصف', 'At the midpoint'), '>': say('b muturretik hurbilago', 'Más cerca de b', 'أقرب إلى b', 'Nearer b') }}
            actual={meanPrediction(state)}
            choice={state.prediction}
            tip={say('Kurba $\\cup$ bada, $c$ puntua $b$ muturretik hurbilago dago; $\\cap$ bada, $a$ muturretik.', 'Si la curva es $\\cup$, $c$ queda más cerca de $b$; si es $\\cap$, de $a$.', 'إذا كان المنحنى $\\cup$ كانت $c$ أقرب إلى $b$، وإذا كان $\\cap$ فأقرب إلى $a$.', 'If the curve is $\\cup$, $c$ is nearer $b$; if it is $\\cap$, nearer $a$.')}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout latex={valid ? [`m=\\frac{f(b)-f(a)}{b-a}=${t(result.m)}`, `c=${result.cs.map(t).join(',\\ ')}`, `\\frac{a+b}{2}=${t(mid)}`] : [`f(x)=${setup.latex}`]} note={l(note)} />
        </Predict>
    )
    const { xMin, xMax } = setup.view
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={meanChallenges} extraChallenges={meanExtra} state={state}>
            <Board height={250} label={l(say(`${MEAN_NAMES[state.fn]} funtzioaren ebakitzailea a eta b artean, eta haren zuzen ukitzaile paraleloa`, `La secante de ${MEAN_NAMES[state.fn]} entre a y b y su tangente paralela`, `قاطع ${MEAN_NAMES[state.fn]} بين a وb ومماسه الموازي`, `The secant of ${MEAN_NAMES[state.fn]} between a and b and its parallel tangent`))}>
                {clip.defs}
                <Grid {...setup.view} X={X} Y={Y} yStep={setup.view.yMax > 8 ? 4 : setup.view.yMax > 5 ? 2 : 1} />
                <g clipPath={clip.url}>
                    <path d={curvePath(setup.f, Math.max(xMin, state.fn === 'root' ? 0 : xMin), xMax, X, Y, [setup.view.yMin, setup.view.yMax], 0.01)} fill="none" stroke={STAGE} strokeWidth={3} />
                    {valid && <line {...segment(result.a, result.fa, result.m, xMin, xMax, X, Y)} stroke={INK} strokeWidth={2} strokeDasharray="6 5" />}
                    {valid && shown && result.cs.map((c) => <line key={c} {...segment(c, setup.f(c), result.m, c - 1.2, c + 1.2, X, Y)} stroke={SECOND} strokeWidth={2.8} />)}
                </g>
                {valid && <path d={`M ${X(mid) - 6} ${Y(0) + 9} L ${X(mid) + 6} ${Y(0) + 9} L ${X(mid)} ${Y(0) + 1} Z`} fill={MUTED} />}
                <Full x={X(result.a)} y={Y(result.fa)} color={INK} />
                <Full x={X(result.b)} y={Y(result.fb)} color={INK} />
                <text x={X(result.a) - 10} y={Y(result.fa) - 8} textAnchor="middle" fontSize={13} fontWeight={700} fill={INK}>A</text>
                <text x={X(result.b) + 10} y={Y(result.fb) + (Y(result.fb) < 40 ? 18 : -8)} textAnchor="middle" fontSize={13} fontWeight={700} fill={INK}>B</text>
                {valid && shown && result.cs.map((c) => <g key={`c${c}`}><Full x={X(c)} y={Y(setup.f(c))} color={SECOND} /><text x={X(c) + 12} y={Y(setup.f(c)) + 18} textAnchor="middle" fontSize={13} fontWeight={700} fill={SECOND}>c</text></g>)}
                {!shown && <Hidden x={110} y={56} />}
            </Board>
        </ToolFrame>
    )
}

/* ---------- L3. L'Hôpital up close ---------- */

const QUOTIENT_NAMES: Record<QuotientId, string> = { sine: 'q₁', exp: 'q₂', cos: 'q₃', poly: 'q₄', log: 'q₅', none: 'q₆' }

export function HopitalTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<HopitalState>(initialHopitalState)
    const shown = state.prediction !== null
    const setup = QUOTIENT_SETUP[state.q]
    const view = { xMin: setup.a - 1, xMax: setup.a + 1, ...setup.view }
    const { X, Y } = frame(view)
    const clip = useClip(40, 20, 300, 200)
    const values = hopitalValues(state)
    const t = (value: number) => texDec(value, props.language, 4)
    const controls = (
        <>
            <Segmented<QuotientId> label={l(say('Zatidura', 'Cociente', 'خارج القسمة', 'Quotient'))} value={state.q} options={QUOTIENTS.map((q) => ({ value: q, label: QUOTIENT_NAMES[q] }))} onChange={(q) => setState((s) => setHopital(s, { q }))} />
            <Stepper label="h" value={state.k} min={0} max={STEPS.length - 1} format={(k) => num(STEPS[k], props.language)} onChange={(k) => setState((s) => setHopital(s, { k }))} language={props.language} />
        </>
    )
    const note: LocalizedText = setup.indeterminate
        ? say(`$\\frac{0}{0}$ da: bi zatidurak $${setup.limitLatex}$ baliora hurbiltzen dira, eta L'Hôpitalek balio du.`, `Es $\\frac{0}{0}$: los dos cocientes se acercan a $${setup.limitLatex}$, y L'Hôpital vale.`, `إنها $\\frac{0}{0}$: يقترب خارجا القسمة من $${setup.limitLatex}$، وتصح قاعدة لوبيتال.`, `It is $\\frac{0}{0}$: both quotients approach $${setup.limitLatex}$, and L'Hôpital works.`)
        : say(`Ez da $\\frac{0}{0}$: $\\frac{f}{g}$ zatidura $${setup.limitLatex}$ baliora doa, baina $\\frac{f'}{g'}=1$. L'Hôpitalek ez du balio hemen.`, `No es $\\frac{0}{0}$: $\\frac{f}{g}$ va a $${setup.limitLatex}$, pero $\\frac{f'}{g'}=1$. L'Hôpital no vale aquí.`, `ليست $\\frac{0}{0}$: يؤول $\\frac{f}{g}$ إلى $${setup.limitLatex}$، لكن $\\frac{f'}{g'}=1$. لا تصح قاعدة لوبيتال هنا.`, `It is not $\\frac{0}{0}$: $\\frac{f}{g}$ tends to $${setup.limitLatex}$, but $\\frac{f'}{g'}=1$. L'Hôpital does not work here.`)
    const local = (latex: string) => localize(props.language, latex)
    const readout = (
        <Predict
            language={props.language}
            question={say(`Ikusi aurretik: $\\lim_{x\\to ${setup.a}}${setup.latex}$ limitea 1 baino txikiagoa, 1 ala 1 baino handiagoa izango da?`, `Antes de verlo: ¿el límite $\\lim_{x\\to ${setup.a}}${setup.latex}$ será menor que 1, igual a 1 o mayor que 1?`, `قبل أن ترى: هل تكون النهاية $\\lim_{x\\to ${setup.a}}${setup.latex}$ أصغر من 1 أم تساوي 1 أم أكبر من 1؟`, `Before you see it: will the limit $\\lim_{x\\to ${setup.a}}${setup.latex}$ be smaller than 1, equal to 1 or larger than 1?`)}
            labels={{ '<': say('1 baino txikiagoa', 'Menor que 1', 'أصغر من 1', 'Smaller than 1'), '=': say('1', 'Igual a 1', 'تساوي 1', 'Equal to 1'), '>': say('1 baino handiagoa', 'Mayor que 1', 'أكبر من 1', 'Larger than 1') }}
            actual={hopitalPrediction(state)}
            choice={state.prediction}
            tip={say('Ordezkatu lehenik: $\\frac{0}{0}$ bada, deribatu goikoa eta behekoa.', 'Sustituye primero: si es $\\frac{0}{0}$, deriva arriba y abajo.', 'عوّض أولًا: إذا كانت $\\frac{0}{0}$ فاشتق البسط والمقام.', 'Substitute first: if it is $\\frac{0}{0}$, differentiate the top and the bottom.')}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout latex={[local(`\\frac{f}{g}=${setup.latex}=${t(values.quotient)}`), local(`\\frac{f'}{g'}=${setup.derivativeLatex}=${t(values.derivatives)}`), `x=${t(values.x)}`]} note={l(note)} />
        </Predict>
    )
    const quotient = (x: number) => (Math.abs(x - setup.a) < 1e-6 ? null : setup.f(x) / setup.g(x))
    const derivatives = (x: number) => (Math.abs(x - setup.a) < 1e-6 && state.q === 'cos' ? null : setup.df(x) / setup.dg(x))
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={hopitalChallenges} extraChallenges={hopitalExtra} state={state}>
            <Board height={250} label={l(say(`${QUOTIENT_NAMES[state.q]} zatidura eta haren deribatuen zatidura a puntutik hurbil`, `El cociente ${QUOTIENT_NAMES[state.q]} y el de sus derivadas cerca de a`, `خارج القسمة ${QUOTIENT_NAMES[state.q]} وخارج قسمة مشتقتيه قرب a`, `The quotient ${QUOTIENT_NAMES[state.q]} and that of its derivatives near a`))}>
                {clip.defs}
                <Grid {...view} X={X} Y={Y} />
                <line x1={X(values.x)} x2={X(values.x)} y1={Y(view.yMin)} y2={Y(view.yMax)} stroke={MUTED} strokeWidth={1.6} strokeDasharray="5 4" />
                {shown && (
                    <g clipPath={clip.url}>
                        <path d={curvePath(quotient, view.xMin, view.xMax, X, Y, [view.yMin, view.yMax], 0.005)} fill="none" stroke={STAGE} strokeWidth={3} />
                        <path d={curvePath(derivatives, view.xMin, view.xMax, X, Y, [view.yMin, view.yMax], 0.005)} fill="none" stroke={VIOLET} strokeWidth={2.6} strokeDasharray="7 5" />
                        <line x1={X(view.xMin)} x2={X(view.xMax)} y1={Y(setup.limit)} y2={Y(setup.limit)} stroke={GREEN} strokeWidth={1.4} strokeDasharray="3 4" />
                    </g>
                )}
                {shown && <Open x={X(setup.a)} y={Y(setup.limit)} color={GREEN} />}
                {shown && values.quotient >= view.yMin && values.quotient <= view.yMax && <Full x={X(values.x)} y={Y(values.quotient)} color={STAGE} />}
                {shown && values.derivatives >= view.yMin && values.derivatives <= view.yMax && <Full x={X(values.x)} y={Y(values.derivatives)} color={VIOLET} />}
                <text x={X(setup.a)} y={234} textAnchor="middle" fontSize={13} fontWeight={700} fill={INK}>a</text>
                {!shown && <Hidden x={X(setup.a) + 60} y={80} />}
            </Board>
        </ToolFrame>
    )
}

/* ---------- L4. The shortest distance to a curve ---------- */

const DISTANCE_NAMES: Record<DistanceCurve, string> = { parabola: 'C₁', root: 'C₂', hyperbola: 'C₃', line: 'C₄', valley: 'C₅' }

export function DistanceTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<DistanceState>(initialDistanceState)
    const shown = state.prediction !== null
    const setup = DISTANCE_SETUP[state.curve]
    const { X, Y } = frame(setup.view)
    const clip = useClip(40, 20, 300, 200)
    const reading = distanceReading(state)
    const t = (value: number) => texDec(value, props.language, 3)
    const controls = (
        <>
            <Segmented<DistanceCurve> label={l(say('Kurba', 'Curva', 'المنحنى', 'Curve'))} value={state.curve} options={DISTANCE_CURVES.map((curve) => ({ value: curve, label: DISTANCE_NAMES[curve] }))} onChange={(curve) => setState((s) => setDistance(s, { curve }))} />
            <Stepper label={l(say('Q puntuaren x', 'x de Q', 'x للنقطة Q', 'x of Q'))} value={state.k} min={0} max={setup.xs.length - 1} format={(k) => num(setup.xs[k], props.language)} onChange={(k) => setState((s) => setDistance(s, { k }))} language={props.language} />
        </>
    )
    const note: LocalizedText = reading.closest
        ? say('Hau da puntu hurbilena: $d(x)$ grafikoa baxuen dago, eta $PQ$ zuzen ukitzailearekiko perpendikularra da (normala).', 'Este es el punto más cercano: $d(x)$ está en su punto más bajo y $PQ$ es perpendicular a la tangente (la normal).', 'هذه أقرب نقطة: يكون $d(x)$ في أدنى نقطة، و$PQ$ عمودية على المماس (المستقيم العمودي).', 'This is the closest point: $d(x)$ is at its lowest and $PQ$ is perpendicular to the tangent (the normal).')
        : say('Mugitu $Q$: $d(x)$ jaisten den aldera, puntua hurbiltzen da.', 'Mueve $Q$: hacia donde baja $d(x)$, el punto se acerca.', 'حرّك $Q$: في الاتجاه الذي ينخفض فيه $d(x)$ تقترب النقطة.', 'Move $Q$: in the direction in which $d(x)$ goes down, the point gets closer.')
    const readout = (
        <Predict
            language={props.language}
            question={say(`Ikusi aurretik: $${setup.latex}$ kurban, non egongo da $${setup.pLatex}$ puntutik hurbilen dagoen puntua?`, `Antes de verlo: en la curva $${setup.latex}$, ¿dónde estará el punto más cercano a $${setup.pLatex}$?`, `قبل أن ترى: على المنحنى $${setup.latex}$، أين ستكون أقرب نقطة إلى $${setup.pLatexAr}$؟`, `Before you see it: on the curve $${setup.latex}$, where will the point closest to $${setup.pLatex}$ be?`)}
            labels={{ '<': say('P puntuaren ezkerrean', 'A la izquierda de P', 'على يسار P', 'To the left of P'), '=': say('P puntuaren bertikalean', 'En la vertical de P', 'على الخط الرأسي لـ P', 'Straight above or below P'), '>': say('P puntuaren eskuinean', 'A la derecha de P', 'على يمين P', 'To the right of P') }}
            actual={distancePrediction(state)}
            choice={state.prediction}
            tip={say('Puntu hurbilenean $PQ$ normalaren gainean dago.', 'En el punto más cercano, $PQ$ va por la normal.', 'عند أقرب نقطة تقع $PQ$ على المستقيم العمودي.', 'At the closest point, $PQ$ lies along the normal.')}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout latex={[`Q=(${t(reading.x)}${texComma(props.language)}${t(reading.y)})`, `D=d^2=${t(reading.D)}`, `d=${t(reading.d)}`]} note={l(note)} />
        </Predict>
    )
    const [px, py] = setup.P
    const { xMin, xMax, yMin, yMax } = setup.view
    // The graph of d(x) under the plane, over the abscissas Q can take
    const ds = setup.xs.map((x) => Math.sqrt(squaredDistance(state.curve, x)))
    const dMax = Math.max(...ds)
    const dMin = Math.min(...ds)
    const GX = (x: number) => 40 + ((x - setup.xs[0]) * 300) / (setup.xs[setup.xs.length - 1] - setup.xs[0])
    const GY = (d: number) => 318 - ((d - dMin) * 64) / Math.max(1e-9, dMax - dMin)
    const slope = setup.derivative(reading.x)
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={distanceChallenges} extraChallenges={distanceExtra} state={state}>
            <Board height={330} label={l(say(`${DISTANCE_NAMES[state.curve]} kurba, P puntua eta Q puntu mugikorra; behean, d(x) distantzia`, `La curva ${DISTANCE_NAMES[state.curve]}, el punto P y el punto móvil Q; debajo, la distancia d(x)`, `المنحنى ${DISTANCE_NAMES[state.curve]} والنقطة P والنقطة المتحركة Q؛ وتحتها المسافة d(x)`, `The curve ${DISTANCE_NAMES[state.curve]}, the point P and the moving point Q; below, the distance d(x)`))}>
                {clip.defs}
                <Grid {...setup.view} X={X} Y={Y} />
                <g clipPath={clip.url}>
                    <path d={curvePath(setup.f, Math.max(xMin, state.curve === 'root' ? 0 : state.curve === 'hyperbola' ? 0.05 : xMin), xMax, X, Y, [yMin, yMax], 0.01)} fill="none" stroke={STAGE} strokeWidth={3} />
                    {shown && <line {...segment(reading.x, reading.y, slope, reading.x - 1.2, reading.x + 1.2, X, Y)} stroke={VIOLET} strokeWidth={2.2} strokeDasharray="6 5" />}
                    {shown && <line x1={X(px)} y1={Y(py)} x2={X(reading.x)} y2={Y(reading.y)} stroke={SECOND} strokeWidth={reading.closest ? 3.6 : 2.6} />}
                </g>
                <Full x={X(px)} y={Y(py)} color={SECOND} />
                <text x={X(px) + 9} y={Y(py) - 10} fontSize={13} fontWeight={700} fill={SECOND}>{state.curve === 'hyperbola' ? 'O' : 'P'}</text>
                <Full x={X(reading.x)} y={Y(reading.y)} color={STAGE} />
                <text x={X(reading.x) - 12} y={Y(reading.y) - 8} fontSize={13} fontWeight={700} fill={STAGE}>Q</text>
                <line x1={40} x2={340} y1={236} y2={236} stroke="#e6dfd2" strokeWidth={1} />
                <text x={40} y={252} fontSize={13} fontWeight={700} fill={MUTED}>d(x)</text>
                {shown
                    ? <>
                        <polyline points={setup.xs.map((x, i) => `${GX(x).toFixed(1)},${GY(ds[i]).toFixed(1)}`).join(' ')} fill="none" stroke={INK} strokeWidth={2.2} />
                        <Full x={GX(reading.x)} y={GY(reading.d)} color={SECOND} />
                    </>
                    : <Hidden x={190} y={300} />}
            </Board>
        </ToolFrame>
    )
}
