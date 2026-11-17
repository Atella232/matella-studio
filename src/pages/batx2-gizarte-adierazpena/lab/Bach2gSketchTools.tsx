import { useId, useState } from 'react'
import { Segmented, Stepper, ToolFrame } from '../../../features/unit-v2/lab/LabKit'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import { useLabText } from '../../../features/unit-v2/lab/useLabText'
import { say } from '../../batx1-zientziak-funtzioak/text'
import { Board, Hidden, Predict, Readout } from '../../dbh3-segidak/lab/LabParts'
import { GREEN, INK, MUTED, PAPER, SECOND, STAGE } from '../../dbh3-segidak/lab/labStyle'
import { setPrediction } from '../../dbh3-segidak/lab/prediction'
import { DATA_CARDS, DATA_LIMITS, DATA_SETUP, dataChallenges, dataExtra, dataPrediction, fits, initialDataState, modelOf, setData, type DataCard, type DataState } from './fromData'
import { asymptoteAt, gapLatex, initialObliqueState, OBLIQUE_CURVES, OBLIQUE_SETUP, obliqueChallenges, obliqueExtra, obliqueF, obliquePrediction, setOblique, X0S, type ObliqueCurve, type ObliqueState } from './oblique'

/* ==========================================================================
   Funtzioen adierazpen grafikoa · Batxilergoa 2 · Gizarte Zientziak — the
   two tools of this unit: the division gives the oblique, and draw from
   the data. Each asks for a prediction before it shows the curve. The
   boards carry numbers and letters only; the words go in the readout.
   Logic in oblique.ts and fromData.ts.
   ========================================================================== */

const LEFT = 40
const TOP = 20
const WIDTH = 300
const HEIGHT = 200

type View = { xMin: number; xMax: number; yMin: number; yMax: number }

function useClip() {
    const id = useId().replace(/:/g, '')
    return { defs: <defs><clipPath id={id}><rect x={LEFT} y={TOP} width={WIDTH} height={HEIGHT} /></clipPath></defs>, url: `url(#${id})` }
}

function frame(view: View) {
    return {
        X: (x: number) => LEFT + ((x - view.xMin) / (view.xMax - view.xMin)) * WIDTH,
        Y: (y: number) => TOP + ((view.yMax - y) / (view.yMax - view.yMin)) * HEIGHT
    }
}

/** A sampled curve as an SVG path, broken where it jumps (an asymptote) */
function path(fn: (x: number) => number, from: number, to: number, X: (x: number) => number, Y: (y: number) => number, breakAt?: number): string {
    const points: string[] = []
    let pen = false
    for (let i = 0; i <= 240; i++) {
        const x = from + ((to - from) * i) / 240
        if (breakAt !== undefined && Math.abs(x - breakAt) < 0.03) { pen = false; continue }
        const y = Math.max(-1e4, Math.min(1e4, fn(x)))
        points.push(`${pen ? 'L' : 'M'} ${X(x).toFixed(1)} ${Y(y).toFixed(1)}`)
        pen = true
    }
    return points.join(' ')
}

function Grid({ view, X, Y }: { view: View; X: (x: number) => number; Y: (y: number) => number }) {
    const xs: number[] = []
    for (let x = Math.ceil(view.xMin); x <= view.xMax; x += 1) xs.push(x)
    const ys: number[] = []
    for (let y = Math.ceil(view.yMin); y <= view.yMax; y += 1) ys.push(y)
    const label = (value: number) => String(value).replace('-', '−')
    return (
        <g>
            <rect x={LEFT} y={TOP} width={WIDTH} height={HEIGHT} fill={PAPER} />
            {xs.map((x) => <line key={`x${x}`} x1={X(x)} x2={X(x)} y1={TOP} y2={TOP + HEIGHT} stroke="#e6dfd2" strokeWidth={1} />)}
            {ys.map((y) => <line key={`y${y}`} x1={LEFT} x2={LEFT + WIDTH} y1={Y(y)} y2={Y(y)} stroke="#e6dfd2" strokeWidth={1} />)}
            <line x1={LEFT} x2={LEFT + WIDTH} y1={Y(0)} y2={Y(0)} stroke={INK} strokeWidth={1.4} />
            <line x1={X(0)} x2={X(0)} y1={TOP} y2={TOP + HEIGHT} stroke={INK} strokeWidth={1.4} />
            {xs.filter((x) => x !== 0 && x % 2 === 0).map((x) => <text key={`tx${x}`} x={X(x)} y={TOP + HEIGHT + 16} textAnchor="middle" fontSize={11} fill={MUTED}>{label(x)}</text>)}
            {ys.filter((y) => y !== 0 && y % 2 === 0).map((y) => <text key={`ty${y}`} x={LEFT - 5} y={Y(y) + 4} textAnchor="end" fontSize={11} fill={MUTED}>{label(y)}</text>)}
        </g>
    )
}

/* ---------- L2. The division gives the oblique ---------- */

export function ObliqueTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const lang = props.language
    const [state, setState] = useState<ObliqueState>(initialObliqueState)
    const shown = state.prediction !== null
    const setup = OBLIQUE_SETUP[state.curve]
    const x0 = X0S[state.step]
    const view = { xMin: -4, xMax: 8, yMin: -4, yMax: 10 }
    const { X, Y } = frame(view)
    const clip = useClip()
    const curveNames: Record<ObliqueCurve, string> = { o1: 'f₁', o2: 'f₂', o3: 'f₃' }
    const controls = (
        <>
            <Segmented<ObliqueCurve> label={l(say('Kurba', 'Curva', 'المنحنى', 'Curve'))} value={state.curve} options={OBLIQUE_CURVES.map((value) => ({ value, label: curveNames[value] }))} onChange={(value) => setState((s) => setOblique(s, { curve: value }))} />
            <Stepper label={l(say('Puntua, x₀', 'Punto, x₀', 'النقطة، x₀', 'Point, x₀'))} value={state.step} min={0} max={X0S.length - 1} format={(index) => String(X0S[index])} onChange={(value) => setState((s) => setOblique(s, { step: value }))} language={lang} />
        </>
    )
    const r = setup.r
    const note = r > 0
        ? say('Hondarra positiboa da: kurba asintotaren gainean doa, eta tartea txikitzen da $x_0$ handitzean.', 'El resto es positivo: la curva va por encima de la asíntota, y la distancia se encoge al crecer $x_0$.', 'الباقي موجب: يمر المنحنى فوق المقارب، وتصغر المسافة عندما يكبر $x_0$.', 'The remainder is positive: the curve runs above the asymptote, and the gap shrinks as $x_0$ grows.')
        : r < 0
            ? say('Hondarra negatiboa da: kurba asintotaren azpian doa, eta tartea txikitzen da $x_0$ handitzean.', 'El resto es negativo: la curva va por debajo de la asíntota, y la distancia se encoge al crecer $x_0$.', 'الباقي سالب: يمر المنحنى تحت المقارب، وتصغر المسافة عندما يكبر $x_0$.', 'The remainder is negative: the curve runs below the asymptote, and the gap shrinks as $x_0$ grows.')
            : say('Hondarra zero da: kurba zuzena bera da, zulo batekin $x=2$ puntuan.', 'El resto es cero: la curva es la propia recta, con un agujero en $x=2$.', 'الباقي صفر: المنحنى هو المستقيم نفسه مع ثغرة عند $x=2$.', 'The remainder is zero: the curve is the line itself, with a hole at $x=2$.')
    const readout = (
        <Predict
            language={lang}
            question={say(`Ikusi aurretik: $${setup.latex}$ bada, $x$ handia denean kurba asintota zeiharraren azpian, gainean ala haren gainean bertan doa?`, `Antes de verlo: con $${setup.latex}$, para $x$ grande, ¿la curva va por debajo de la asíntota oblicua, sobre ella o por encima?`, `قبل أن ترى: مع $${setup.latex}$ ومن أجل $x$ كبير، هل يمر المنحنى تحت المقارب المائل أم عليه أم فوقه؟`, `Before you see it: with $${setup.latex}$, for large $x$, does the curve run below the oblique asymptote, on it or above it?`)}
            labels={{ '<': say('Azpian', 'Debajo', 'تحته', 'Below'), '=': say('Gainean bertan', 'Sobre ella', 'عليه', 'On it'), '>': say('Gainean', 'Encima', 'فوقه', 'Above') }}
            actual={obliquePrediction(state)}
            choice={state.prediction}
            tip={say('Egin zatiketa eta begiratu hondarraren zeinua.', 'Haz la división y mira el signo del resto.', 'أجرِ القسمة وانظر إلى إشارة الباقي.', 'Do the division and look at the sign of the remainder.')}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout latex={[setup.latex, `f(x)=${setup.division}`, `y=${setup.n === 0 ? 'x' : `x${setup.n < 0 ? '-' : '+'}${Math.abs(setup.n)}`}`, `f(${x0})-(${x0}${setup.n === 0 ? '' : setup.n < 0 ? `-${-setup.n}` : `+${setup.n}`})=${gapLatex(state)}`]} note={l(note)} />
        </Predict>
    )
    const fy = obliqueF(state.curve, x0)
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={obliqueChallenges} extraChallenges={obliqueExtra} state={state}>
            <Board height={250} label={l(say('Kurba eta haren asintota zeiharra', 'La curva y su asíntota oblicua', 'المنحنى ومقاربه المائل', 'The curve and its oblique asymptote'))}>
                {clip.defs}
                <Grid view={view} X={X} Y={Y} />
                {shown ? (
                    <g>
                        <g clipPath={clip.url}>
                            <path d={path((x) => asymptoteAt(state.curve, x), view.xMin, view.xMax, X, Y)} fill="none" stroke={SECOND} strokeWidth={2} strokeDasharray="7 5" />
                            {setup.r !== 0 && <line x1={X(setup.a)} x2={X(setup.a)} y1={TOP} y2={TOP + HEIGHT} stroke={MUTED} strokeWidth={1.6} strokeDasharray="5 4" />}
                            <path d={path((x) => obliqueF(state.curve, x), view.xMin, view.xMax, X, Y, setup.a)} fill="none" stroke={STAGE} strokeWidth={3.2} />
                        </g>
                        {setup.r === 0 && <circle cx={X(2)} cy={Y(4)} r={5} fill={PAPER} stroke={STAGE} strokeWidth={2.4} />}
                        <line x1={X(x0)} x2={X(x0)} y1={Y(asymptoteAt(state.curve, x0))} y2={Y(fy)} stroke={GREEN} strokeWidth={4} />
                        <circle cx={X(x0)} cy={Y(fy)} r={5.5} fill={INK} />
                        <text x={LEFT + 6} y={TOP + 16} fontSize={13} fontWeight={700} fill={GREEN} direction="ltr">{`x₀ = ${x0}`}</text>
                    </g>
                ) : <Hidden x={190} y={120} />}
            </Board>
        </ToolFrame>
    )
}

/* ---------- L3. Draw from the data ---------- */

const CARD_NAMES: Record<DataCard, string> = { d1: '1', d2: '2', d3: '3' }

export function DataTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const lang = props.language
    const [state, setState] = useState<DataState>(initialDataState)
    const shown = state.prediction !== null
    const card = DATA_SETUP[state.card]
    const view = { xMin: -6, xMax: 6, yMin: -6, yMax: 6 }
    const { X, Y } = frame(view)
    const clip = useClip()
    const ok = fits(state)
    const controls = (
        <>
            <Segmented<DataCard> label={l(say('Fitxa', 'Ficha', 'البطاقة', 'Card'))} value={state.card} options={DATA_CARDS.map((value) => ({ value, label: CARD_NAMES[value] }))} onChange={(value) => setState((s) => setData(s, { card: value }))} />
            <Stepper label="a" value={state.a} min={DATA_LIMITS.a.min} max={DATA_LIMITS.a.max} onChange={(value) => setState((s) => setData(s, { a: value }))} language={lang} />
            <Stepper label="b" value={state.b} min={DATA_LIMITS.b.min} max={DATA_LIMITS.b.max} onChange={(value) => setState((s) => setData(s, { b: value }))} language={lang} />
            <Stepper label="k" value={state.k} min={DATA_LIMITS.k.min} max={DATA_LIMITS.k.max} onChange={(value) => setState((s) => setData(s, { k: value }))} language={lang} />
        </>
    )
    const [px, py] = card.point
    const data = `x=${card.a}\\qquad y=${card.b}\\qquad (${px},${py})`
    const model = `f(x)=${state.b === 0 ? (state.k < 0 ? '-' : '') : `${state.b}${state.k < 0 ? '-' : '+'}`}\\frac{${Math.abs(state.k)}}{x${state.a === 0 ? '' : state.a < 0 ? `+${-state.a}` : `-${state.a}`}}`
    const readout = (
        <Predict
            language={lang}
            question={say(`Ikusi aurretik: $${data}$ datuak betetzen dituen kurbak $Y$ ardatza 0 baino beherago, 0 puntuan ala gorago mozten du?`, `Antes de verlo: la curva que cumple los datos $${data}$, ¿corta al eje $Y$ por debajo de 0, en 0 o por encima?`, `قبل أن ترى: المنحنى الذي يحقق المعطيات $${data}$ هل يقطع محور $Y$ تحت 0 أم عند 0 أم فوقه؟`, `Before you see it: does the curve that meets the data $${data}$ cut the $Y$ axis below 0, at 0 or above?`)}
            labels={{ '<': say('Beherago', 'Por debajo', 'تحته', 'Below'), '=': say('0 puntuan', 'En 0', 'عند 0', 'At 0'), '>': say('Gorago', 'Por encima', 'فوقه', 'Above') }}
            actual={dataPrediction(state)}
            choice={state.prediction}
            tip={say('Kokatu asintotak eta puntua; gero pentsatu adarra non dagoen $x=0$ puntuan.', 'Coloca las asíntotas y el punto; después piensa dónde está la rama en $x=0$.', 'ضع المقاربين والنقطة؛ ثم فكّر أين يكون الفرع عند $x=0$.', 'Place the asymptotes and the point; then think where the branch is at $x=0$.')}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout latex={[data, model]} note={l(ok
                ? say('Eredua datuekin bat dator: asintota berak eta puntutik igarotzen da.', 'El modelo cumple los datos: las mismas asíntotas y pasa por el punto.', 'النموذج يحقق المعطيات: المقاربان نفساهما ويمر بالنقطة.', 'The model meets the data: the same asymptotes and it passes through the point.')
                : say('Mugitu $a$, $b$ eta $k$, kurbak datuak bete arte.', 'Mueve $a$, $b$ y $k$ hasta que la curva cumpla los datos.', 'حرّك $a$ و$b$ و$k$ حتى يحقق المنحنى المعطيات.', 'Move $a$, $b$ and $k$ until the curve meets the data.'))} />
        </Predict>
    )
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={dataChallenges} extraChallenges={dataExtra} state={state}>
            <Board height={250} label={l(say('Datuak eta eredua', 'Los datos y el modelo', 'المعطيات والنموذج', 'The data and the model'))}>
                {clip.defs}
                <Grid view={view} X={X} Y={Y} />
                <g clipPath={clip.url}>
                    <line x1={X(card.a)} x2={X(card.a)} y1={TOP} y2={TOP + HEIGHT} stroke={SECOND} strokeWidth={2} strokeDasharray="7 5" />
                    <line x1={LEFT} x2={LEFT + WIDTH} y1={Y(card.b)} y2={Y(card.b)} stroke={SECOND} strokeWidth={2} strokeDasharray="7 5" />
                </g>
                <circle cx={X(px)} cy={Y(py)} r={6} fill={SECOND} />
                {shown ? (
                    <g clipPath={clip.url}>
                        <path d={path(modelOf(state), view.xMin, view.xMax, X, Y, state.a)} fill="none" stroke={ok ? GREEN : STAGE} strokeWidth={3.2} />
                    </g>
                ) : <Hidden x={190} y={120} />}
            </Board>
        </ToolFrame>
    )
}

