import { useId, useState } from 'react'
import { Segmented, Stepper, ToolFrame } from '../../../features/unit-v2/lab/LabKit'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import { useLabText } from '../../../features/unit-v2/lab/useLabText'
import type { LocalizedText, UnitLanguage } from '../../../features/unit-v2/types'
import { localize, say } from '../../batx1-zientziak-funtzioak/text'
import { Board, Hidden, PlayButton, Predict, Readout } from '../../dbh3-segidak/lab/LabParts'
import { dec, GREEN, INK, MUTED, PAPER, STAGE, texDec } from '../../dbh3-segidak/lab/labStyle'
import { setPrediction } from '../../dbh3-segidak/lab/prediction'
import { usePlayback } from '../../dbh4-aplikatuak-proportzionaltasuna/lab/usePlayback'
import { ACCUMULATE_FUNCTIONS, ACCUMULATE_SETUP, accumulateChallenges, accumulateExtra, accumulatePrediction, accumulateX, areaAt, heightAt, initialAccumulateState, setAccumulate, type AccumulateFunction, type AccumulateState } from './accumulate'
import { BETWEEN_LIMITS, BETWEEN_PAIRS, BETWEEN_SETUP, betweenA, betweenArea, betweenB, betweenChallenges, betweenExtra, betweenIntegral, betweenPieces, betweenPrediction, initialBetweenState, setBetween, type BetweenPair, type BetweenState } from './between'
import { numberLatex } from './numbers'
import { bars, barPoint, initialRectState, RECT_FUNCTIONS, RECT_LIMITS, RECT_SETUP, RECT_SIDES, rectArea, rectChallenges, rectExtra, rectPrediction, rectSum, setRect, SIDE_WORDS, type RectFunction, type RectSide, type RectState } from './rectangles'
import { initialSignedState, SIGNED_FUNCTIONS, SIGNED_LIMITS, SIGNED_SETUP, signedA, signedArea, signedB, signedChallenges, signedExtra, signedIntegral, signedPrediction, setSigned, type SignedFunction, type SignedState } from './signed'

/* ==========================================================================
   Integralak · Batxilergoa 1 · Zientziak — the four tools of this unit:
   rectangles under the curve, signed area, the area between two curves
   and the area function. Each asks for a prediction before it shows the
   result, and each moves with ▶. The boards carry numbers and formulas
   only (the svg is left to right); the words go in the readout. Areas
   above the axis (or with f on top) are blue; below the axis red; with
   g on top violet. Logic in rectangles.ts, signed.ts, between.ts and
   accumulate.ts.
   ========================================================================== */

const BLUE = '#2f6fdb'
const RED = '#c4432a'
const VIOLET = '#7b52c7'
const GRID_LINE = '#e6dfd2'

/** A number for the board, with the language's decimal mark and a real minus sign */
const num = (value: number, language: UnitLanguage, digits = 2) => dec(value, language, digits).replace('-', '−')
const minus = (value: number) => (value < 0 ? `−${-value}` : String(value))

/** A curve as an SVG path, broken where it leaves the band */
function curvePath(fn: (x: number) => number, from: number, to: number, X: (x: number) => number, Y: (y: number) => number, yLimit: [number, number], step = 0.02): string {
    const [low, high] = yLimit
    const margin = (high - low) / 2
    let path = ''
    let open = false
    for (let x = from; x <= to + 1e-9; x += step) {
        const y = fn(x)
        if (!Number.isFinite(y) || y < low - margin || y > high + margin) {
            open = false
            continue
        }
        path += `${open ? 'L' : 'M'} ${X(x).toFixed(1)} ${Y(y).toFixed(1)} `
        open = true
    }
    return path
}

/** The region between a curve and a base (the x-axis when left out) from `from` to `to` */
function regionPath(top: (x: number) => number, from: number, to: number, X: (x: number) => number, Y: (y: number) => number, base: (x: number) => number = () => 0): string {
    const steps = 60
    const xs = Array.from({ length: steps + 1 }, (_, k) => from + ((to - from) * k) / steps)
    const upper = xs.map((x) => `${X(x).toFixed(1)},${Y(top(x)).toFixed(1)}`)
    const lower = [...xs].reverse().map((x) => `${X(x).toFixed(1)},${Y(base(x)).toFixed(1)}`)
    return `M${[...upper, ...lower].join(' L')} Z`
}

/** A light grid with the axes and the numbers every `xStep` / `yStep` units, for any extent */
function Grid({ xMin, xMax, yMin, yMax, X, Y, xStep = 1, yStep = 1, labels = true }: { xMin: number; xMax: number; yMin: number; yMax: number; X: (x: number) => number; Y: (y: number) => number; xStep?: number; yStep?: number; labels?: boolean }) {
    const xs = Array.from({ length: Math.floor(xMax) - Math.ceil(xMin) + 1 }, (_, i) => Math.ceil(xMin) + i)
    const ys = Array.from({ length: Math.floor(yMax) - Math.ceil(yMin) + 1 }, (_, i) => Math.ceil(yMin) + i)
    const axisY = Y(Math.min(yMax, Math.max(yMin, 0)))
    const axisX = X(Math.min(xMax, Math.max(xMin, 0)))
    return (
        <g>
            <rect x={X(xMin)} y={Y(yMax)} width={X(xMax) - X(xMin)} height={Y(yMin) - Y(yMax)} fill={PAPER} />
            {xs.map((x) => <line key={`x${x}`} x1={X(x)} x2={X(x)} y1={Y(yMin)} y2={Y(yMax)} stroke={GRID_LINE} strokeWidth={1} />)}
            {ys.filter((y) => y % yStep === 0).map((y) => <line key={`y${y}`} x1={X(xMin)} x2={X(xMax)} y1={Y(y)} y2={Y(y)} stroke={GRID_LINE} strokeWidth={1} />)}
            <line x1={X(xMin)} x2={X(xMax)} y1={axisY} y2={axisY} stroke={INK} strokeWidth={1.4} />
            <line x1={axisX} x2={axisX} y1={Y(yMin)} y2={Y(yMax)} stroke={INK} strokeWidth={1.4} />
            {labels && xs.filter((x) => x !== 0 && x % xStep === 0).map((x) => <text key={`tx${x}`} x={X(x)} y={axisY + 14} textAnchor="middle" fontSize={12} fill={MUTED}>{minus(x)}</text>)}
            {labels && ys.filter((y) => y !== 0 && y % yStep === 0).map((y) => <text key={`ty${y}`} x={axisX - 5} y={Y(y) + 4} textAnchor="end" fontSize={12} fill={MUTED}>{minus(y)}</text>)}
        </g>
    )
}

/** A clip path for a plotting area, so that curves and regions stop at its edges */
function useClip(x: number, y: number, width: number, height: number) {
    const id = useId().replace(/:/g, '')
    return { defs: <defs><clipPath id={id}><rect x={x} y={y} width={width} height={height} /></clipPath></defs>, url: `url(#${id})` }
}

const Dot = ({ x, y, color, r = 5.5 }: { x: number; y: number; color: string; r?: number }) => <circle cx={x} cy={y} r={r} fill={color} stroke={PAPER} strokeWidth={1.4} />

/** A formula on the board, left to right, with a light halo so that it reads over the grid */
const BoardText = ({ x, y, children, color = INK, anchor = 'start', size = 14 }: { x: number; y: number; children: string; color?: string; anchor?: 'start' | 'middle' | 'end'; size?: number }) => (
    <text x={x} y={y} textAnchor={anchor} fontSize={size} fontWeight={700} fill={color} paintOrder="stroke" stroke={PAPER} strokeWidth={4} strokeLinejoin="round">{children}</text>
)

/** A limit on the board: a dashed vertical line with its name under the axis */
const Limit = ({ x, top, bottom, name }: { x: number; top: number; bottom: number; name: string }) => (
    <g>
        <line x1={x} x2={x} y1={top} y2={bottom} stroke={INK} strokeWidth={1.6} strokeDasharray="5 4" />
        <text x={x} y={bottom + 14} textAnchor="middle" fontSize={13} fontWeight={700} fill={INK} fontStyle="italic">{name}</text>
    </g>
)

const SIGN_LABELS = {
    '<': say('Negatiboa', 'Negativa', 'سالب', 'Negative'),
    '=': say('Zero', 'Cero', 'صفر', 'Zero'),
    '>': say('Positiboa', 'Positiva', 'موجب', 'Positive')
}

/* ---------- L2. Rectangles under the curve ---------- */

const RECT_NAMES: Record<RectFunction, string> = { square: 'x²', cap: '4 − x²', line: 'x + 1', root: '√x', exp: 'eˣ' }
const SIDE_NAMES: Record<RectSide, LocalizedText> = {
    left: say('Ezkerra', 'Izquierda', 'اليسار', 'Left'),
    middle: say('Erdia', 'Medio', 'الوسط', 'Middle'),
    right: say('Eskuina', 'Derecha', 'اليمين', 'Right')
}

export function RectanglesTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<RectState>(initialRectState)
    const shown = state.prediction !== null
    const setup = RECT_SETUP[state.fn]
    const playback = usePlayback(`${state.fn}-${state.side}-${state.n}`, 3200)
    const n = shown && playback.progress !== null ? 1 + Math.round(playback.progress * (RECT_LIMITS.n.max - 1)) : state.n
    const pad = (setup.b - setup.a) * 0.12
    const [xMin, xMax] = [setup.a - pad, setup.b + pad]
    const [yMin, yMax] = [setup.view[0] - (setup.view[1] - setup.view[0]) * 0.08, setup.view[1] * 1.04]
    const X = (x: number) => 40 + ((x - xMin) / (xMax - xMin)) * 300
    const Y = (y: number) => 30 + ((yMax - y) / (yMax - yMin)) * 190
    const clip = useClip(X(xMin), Y(yMax), 300, Y(yMin) - Y(yMax))
    const sum = rectSum(state.fn, state.side, n)
    const area = rectArea(state.fn)
    const t = (value: number) => texDec(value, props.language, 3)
    const controls = (
        <>
            <Segmented<RectFunction> label={l(say('Funtzioa', 'Función', 'الدالة', 'Function'))} value={state.fn} options={RECT_FUNCTIONS.map((fn) => ({ value: fn, label: RECT_NAMES[fn] }))} onChange={(fn) => setState((s) => setRect(s, { fn }))} />
            <Segmented<RectSide> label={l(say('Altuera', 'Altura', 'الارتفاع', 'Height'))} value={state.side} options={RECT_SIDES.map((side) => ({ value: side, label: l(SIDE_NAMES[side]) }))} onChange={(side) => setState((s) => setRect(s, { side }))} />
            <Stepper label={l(say('Laukizuzenak: n', 'Rectángulos: n', 'المستطيلات: n', 'Rectangles: n'))} value={state.n} min={RECT_LIMITS.n.min} max={RECT_LIMITS.n.max} onChange={(value) => setState((s) => setRect(s, { n: value }))} language={props.language} />
        </>
    )
    const stateSum = rectSum(state.fn, state.side, state.n)
    const note = Math.abs(stateSum - area) < 1e-9
        ? say('Batura eta azalera berdinak dira: soberan dagoena eta falta dena berdinak dira.', 'La suma y el área coinciden: lo que sobra y lo que falta son iguales.', 'المجموع يساوي المساحة: الزائد يساوي الناقص.', 'The sum and the area match: what is left over equals what is missing.')
        : stateSum > area
            ? say('Batura azalera baino handiagoa da: laukizuzenak kurbatik gora ateratzen dira. Gehitu laukizuzenak eta hurbildu egingo da.', 'La suma es mayor que el área: los rectángulos asoman por encima de la curva. Pon más y se acercará.', 'المجموع أكبر من المساحة: تبرز المستطيلات فوق المنحنى. زدها فيقترب.', 'The sum is greater than the area: the rectangles stick out above the curve. Add more and it gets closer.')
            : say('Batura azalera baino txikiagoa da: laukizuzenek ez dute kurbaren azpiko guztia betetzen. Gehitu laukizuzenak eta hurbildu egingo da.', 'La suma es menor que el área: los rectángulos no llenan todo lo que hay bajo la curva. Pon más y se acercará.', 'المجموع أصغر من المساحة: لا تملأ المستطيلات كل ما تحت المنحنى. زدها فيقترب.', 'The sum is less than the area: the rectangles do not fill everything under the curve. Add more and it gets closer.')
    const formula = setup.latex
    const readout = (
        <Predict
            language={props.language}
            question={say(
                `Ikusi aurretik: $${formula}$ funtzioarekin eta altuera ${SIDE_WORDS[state.side].eu} hartuta, batura azalera baino txikiagoa, berdina ala handiagoa izango da?`,
                `Antes de verlo: con $${formula}$ y la altura ${SIDE_WORDS[state.side].es}, ¿la suma será menor que el área, igual o mayor?`,
                `قبل أن ترى: مع $${formula}$ والارتفاع ${SIDE_WORDS[state.side].ar}، هل سيكون المجموع أصغر من المساحة أو مساويًا لها أو أكبر؟`,
                `Before you see it: with $${formula}$ and the height ${SIDE_WORDS[state.side].en}, will the sum be less than the area, equal to it or greater?`
            )}
            labels={{ '<': say('Txikiagoa', 'Menor', 'أصغر', 'Less'), '=': say('Berdina', 'Igual', 'مساوٍ', 'Equal'), '>': say('Handiagoa', 'Mayor', 'أكبر', 'Greater') }}
            actual={rectPrediction(state)}
            choice={state.prediction}
            tip={say('Begiratu funtzioa gorakorra ala beherakorra den, eta laukizuzenaren goiko izkina kurbaren gainetik ala azpitik geratzen den.', 'Mira si la función crece o decrece, y si la esquina de arriba del rectángulo queda por encima o por debajo de la curva.', 'انظر هل الدالة متزايدة أم متناقصة، وهل يبقى الركن العلوي للمستطيل فوق المنحنى أم تحته.', 'See whether the function increases or decreases, and whether the top corner of each rectangle ends up above or below the curve.')}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout latex={[formula, `S_{${state.n}}=${t(stateSum)}`, `A=${setup.areaLatex}\\approx ${t(area)}`]} note={l(note)} />
        </Predict>
    )
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={rectChallenges} extraChallenges={rectExtra} state={state}>
            <Board height={250} label={l(say(`${RECT_NAMES[state.fn]} kurbaren azpian ${n} laukizuzen`, `${n} rectángulos bajo ${RECT_NAMES[state.fn]}`, `${n} مستطيلات تحت ${RECT_NAMES[state.fn]}`, `${n} rectangles under ${RECT_NAMES[state.fn]}`))}>
                {clip.defs}
                <Grid xMin={xMin} xMax={xMax} yMin={yMin} yMax={yMax} X={X} Y={Y} yStep={setup.view[1] > 5 ? 2 : 1} />
                <g clipPath={clip.url}>
                    {shown && <path d={regionPath(setup.fn, setup.a, setup.b, X, Y)} fill={GREEN} fillOpacity={0.28} />}
                    {bars(state.fn, state.side, n).map((bar) => (
                        <rect key={bar.x} x={X(bar.x)} y={Y(bar.height)} width={X(bar.x + bar.width) - X(bar.x)} height={Y(0) - Y(bar.height)} fill={BLUE} fillOpacity={0.22} stroke={BLUE} strokeWidth={n > 12 ? 0.8 : 1.4} />
                    ))}
                    <path d={curvePath(setup.fn, xMin, xMax, X, Y, [yMin, yMax])} fill="none" stroke={STAGE} strokeWidth={3} strokeLinejoin="round" />
                    {n <= 12 && Array.from({ length: n }, (_, i) => barPoint(state.fn, state.side, n, i)).map((x) => <circle key={x} cx={X(x)} cy={Y(setup.fn(x))} r={3.2} fill={INK} />)}
                </g>
                <BoardText x={44} y={20} color={BLUE}>{`S${subscript(n)} = ${num(sum, props.language)}`}</BoardText>
                {shown ? <BoardText x={340} y={20} anchor="end" color={GREEN}>{`A = ${num(area, props.language)}`}</BoardText> : <Hidden x={318} y={24} size={22} />}
            </Board>
            <PlayButton label={l(say('Estutu laukizuzenak', 'Estrecha los rectángulos', 'ضيّق المستطيلات', 'Narrow the rectangles'))} disabled={!shown} playing={playback.playing} onPlay={playback.play} />
        </ToolFrame>
    )
}

const SUBSCRIPTS = ['₀', '₁', '₂', '₃', '₄', '₅', '₆', '₇', '₈', '₉']
const subscript = (value: number) => String(value).split('').map((digit) => SUBSCRIPTS[Number(digit)]).join('')

/* ---------- L3. Signed area ---------- */

const SIGNED_NAMES: Record<SignedFunction, string> = { dip: 'x² − 2x', line: 'x − 1', cubic: 'x³ − 4x', well: 'x² − 4' }

export function SignedTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<SignedState>(initialSignedState)
    const shown = state.prediction !== null
    const setup = SIGNED_SETUP[state.fn]
    const [xMin, xMax] = [-3, 3]
    const [yMin, yMax] = setup.view
    const X = (x: number) => 40 + (x - xMin) * 50
    const Y = (y: number) => 14 + (yMax - y) * (196 / (yMax - yMin))
    const clip = useClip(X(xMin), Y(yMax), 300, 196)
    const playback = usePlayback(`${state.fn}-${state.ta}-${state.tb}`, 2600)
    const a = signedA(state)
    const b = shown && playback.progress !== null ? a + playback.progress * (xMax - a) : signedB(state)
    const [low, high] = [Math.min(a, b), Math.max(a, b)]
    const cuts = [low, ...setup.roots.filter((root) => root > low && root < high), high]
    const integral = signedIntegral(state.fn, a, b)
    const area = signedArea(state.fn, a, b)
    const [pa, pb] = setup.preset.map((t) => t / 2)
    const controls = (
        <>
            <Segmented<SignedFunction> label={l(say('Funtzioa', 'Función', 'الدالة', 'Function'))} value={state.fn} options={SIGNED_FUNCTIONS.map((fn) => ({ value: fn, label: SIGNED_NAMES[fn] }))} onChange={(fn) => setState((s) => setSigned(s, { fn }))} />
            <Stepper label={l(say('Beheko muga: a', 'Límite inferior: a', 'الحد الأدنى: a', 'Lower limit: a'))} value={state.ta} min={SIGNED_LIMITS.t.min} max={SIGNED_LIMITS.t.max} format={(value) => num(value / 2, props.language, 1)} onChange={(value) => setState((s) => setSigned(s, { ta: value }))} language={props.language} />
            <Stepper label={l(say('Goiko muga: b', 'Límite superior: b', 'الحد الأعلى: b', 'Upper limit: b'))} value={state.tb} min={SIGNED_LIMITS.t.min} max={SIGNED_LIMITS.t.max} format={(value) => num(value / 2, props.language, 1)} onChange={(value) => setState((s) => setSigned(s, { tb: value }))} language={props.language} />
        </>
    )
    const stateIntegral = signedIntegral(state.fn, signedA(state), signedB(state))
    const stateArea = signedArea(state.fn, signedA(state), signedB(state))
    const note = Math.abs(stateIntegral - stateArea) < 1e-9
        ? say('Zati guztiak ardatzaren gainean daude, eta mugak ordenan: integrala eta azalera berdinak dira.', 'Todas las partes están sobre el eje y los límites en orden: la integral y el área coinciden.', 'كل الأجزاء فوق المحور والحدّان مرتّبان: التكامل يساوي المساحة.', 'All the parts are above the axis and the limits are in order: the integral and the area match.')
        : say('Ardatzaren azpiko zatiek (gorriak) integrala txikitu egiten dute; azalerak, ordea, positibo gisa batzen ditu. Mugak alderantzikatzean, integralak zeinua aldatzen du.', 'Las partes de debajo del eje (rojas) restan en la integral; el área, en cambio, las suma en positivo. Al invertir los límites, la integral cambia de signo.', 'الأجزاء تحت المحور (الحمراء) تُطرح في التكامل، أما المساحة فتجمعها موجبة. وعند قلب الحدّين يغيّر التكامل إشارته.', 'The parts below the axis (red) subtract in the integral; the area, instead, adds them as positive. Swapping the limits changes the sign of the integral.')
    const readout = (
        <Predict
            language={props.language}
            question={say(`Ikusi aurretik: $\\int_{${numberLatex(pa)}}^{${numberLatex(pb)}}(${setup.latex.slice(5)})\\,dx$ negatiboa, zero ala positiboa izango da?`, `Antes de verlo: ¿$\\int_{${numberLatex(pa)}}^{${numberLatex(pb)}}(${setup.latex.slice(5)})\\,dx$ será negativa, cero o positiva?`, `قبل أن ترى: هل سيكون $\\int_{${numberLatex(pa)}}^{${numberLatex(pb)}}(${setup.latex.slice(5)})\\,dx$ سالبًا أو صفرًا أو موجبًا؟`, `Before you see it: will $\\int_{${numberLatex(pa)}}^{${numberLatex(pb)}}(${setup.latex.slice(5)})\\,dx$ be negative, zero or positive?`)}
            labels={SIGN_LABELS}
            actual={signedPrediction(state)}
            choice={state.prediction}
            tip={say('Konparatu ardatzaren gaineko zatia eta azpikoa: zein da handiagoa?', 'Compara la parte de encima del eje con la de debajo: ¿cuál es mayor?', 'قارن الجزء فوق المحور بالجزء تحته: أيهما أكبر؟', 'Compare the part above the axis with the part below: which is bigger?')}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout latex={[setup.latex, `\\int_{${numberLatex(signedA(state))}}^{${numberLatex(signedB(state))}}f(x)\\,dx=${numberLatex(stateIntegral)}`, `A=${numberLatex(stateArea)}`]} note={l(note)} />
        </Predict>
    )
    const [top, bottom] = [Y(yMax), Y(yMin)]
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={signedChallenges} extraChallenges={signedExtra} state={state}>
            <Board height={250} label={l(say(`${SIGNED_NAMES[state.fn]} kurba eta ardatzaren arteko eremua, a eta b artean`, `La región entre ${SIGNED_NAMES[state.fn]} y el eje, entre a y b`, `المنطقة بين ${SIGNED_NAMES[state.fn]} والمحور بين a و b`, `The region between ${SIGNED_NAMES[state.fn]} and the axis, between a and b`))}>
                {clip.defs}
                <Grid xMin={xMin} xMax={xMax} yMin={yMin} yMax={yMax} X={X} Y={Y} yStep={yMax - yMin > 7 ? 2 : 1} />
                <g clipPath={clip.url}>
                    {shown && cuts.slice(0, -1).map((from, i) => {
                        const to = cuts[i + 1]
                        const positive = setup.fn((from + to) / 2) > 0
                        return <path key={from} d={regionPath(setup.fn, from, to, X, Y)} fill={positive ? BLUE : RED} fillOpacity={0.3} />
                    })}
                    <path d={curvePath(setup.fn, xMin, xMax, X, Y, [yMin, yMax])} fill="none" stroke={STAGE} strokeWidth={3} strokeLinejoin="round" />
                </g>
                <Limit x={X(a)} top={top} bottom={bottom} name="a" />
                <Limit x={X(b)} top={top} bottom={bottom} name="b" />
                {shown
                    ? <BoardText x={44} y={top + 16} color={integral < 0 ? RED : BLUE}>{`∫ = ${num(integral, props.language)}`}</BoardText>
                    : <Hidden x={X((a + b) / 2)} y={top + 30} size={22} />}
                {shown && <BoardText x={336} y={top + 16} anchor="end" color={INK}>{`A = ${num(area, props.language)}`}</BoardText>}
            </Board>
            <PlayButton label={l(say('Mugitu b eskuinera', 'Mueve b hacia la derecha', 'حرّك b نحو اليمين', 'Move b to the right'))} disabled={!shown} playing={playback.playing} onPlay={playback.play} />
        </ToolFrame>
    )
}

/* ---------- L4. The area between two curves ---------- */

const TOP_LABELS = {
    '<': say('g goian', 'g arriba', 'g في الأعلى', 'g on top'),
    '=': say('Gurutzatzen dira', 'Se cruzan', 'يتقاطعان', 'They cross'),
    '>': say('f goian', 'f arriba', 'f في الأعلى', 'f on top')
}

export function BetweenTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<BetweenState>(initialBetweenState)
    const shown = state.prediction !== null
    const setup = BETWEEN_SETUP[state.pair]
    const [xMin, xMax] = [-3, 3]
    const [yMin, yMax] = setup.view
    const X = (x: number) => 40 + (x - xMin) * 50
    const Y = (y: number) => 14 + (yMax - y) * (196 / (yMax - yMin))
    const clip = useClip(X(xMin), Y(yMax), 300, 196)
    const playback = usePlayback(`${state.pair}-${state.ta}-${state.tb}`, 2600)
    const a = betweenA(state)
    const b = shown && playback.progress !== null ? a + playback.progress * (xMax - a) : betweenB(state)
    const pieces = betweenPieces(state.pair, a, b)
    const area = betweenArea(state.pair, a, b)
    const [pa, pb] = setup.preset.map((t) => t / 2)
    const controls = (
        <>
            <Segmented<BetweenPair> label={l(say('Bikotea', 'Pareja', 'الزوج', 'Pair'))} value={state.pair} options={BETWEEN_PAIRS.map((pair, index) => ({ value: pair, label: String(index + 1) }))} onChange={(pair) => setState((s) => setBetween(s, { pair }))} />
            <Stepper label={l(say('Beheko muga: a', 'Límite inferior: a', 'الحد الأدنى: a', 'Lower limit: a'))} value={state.ta} min={BETWEEN_LIMITS.t.min} max={BETWEEN_LIMITS.t.max} format={(value) => num(value / 2, props.language, 1)} onChange={(value) => setState((s) => setBetween(s, { ta: value }))} language={props.language} />
            <Stepper label={l(say('Goiko muga: b', 'Límite superior: b', 'الحد الأعلى: b', 'Upper limit: b'))} value={state.tb} min={BETWEEN_LIMITS.t.min} max={BETWEEN_LIMITS.t.max} format={(value) => num(value / 2, props.language, 1)} onChange={(value) => setState((s) => setBetween(s, { tb: value }))} language={props.language} />
        </>
    )
    const stateIntegral = betweenIntegral(state.pair, betweenA(state), betweenB(state))
    const stateArea = betweenArea(state.pair, betweenA(state), betweenB(state))
    const note = Math.abs(Math.abs(stateIntegral) - stateArea) < 1e-9
        ? say('Tarte osoan kurba bera dago goian: azalera integralaren balio absolutua da.', 'En todo el tramo va arriba la misma curva: el área es el valor absoluto de la integral.', 'المنحنى نفسه في الأعلى على طول الجزء: المساحة هي القيمة المطلقة للتكامل.', 'The same curve is on top along the whole stretch: the area is the absolute value of the integral.')
        : say('Kurbak tartearen barruan gurutzatzen dira: integralean zatiak kendu egiten dira, eta azalerarako ebaki-puntuetan zatitu behar da.', 'Las curvas se cruzan dentro del tramo: en la integral las partes se restan, y para el área hay que partir en los cortes.', 'يتقاطع المنحنيان داخل الجزء: في التكامل تُطرح الأجزاء، وللمساحة يجب التقسيم عند نقاط التقاطع.', 'The curves cross inside the stretch: in the integral the parts cancel, and for the area you must split at the crossings.')
    const readout = (
        <Predict
            language={props.language}
            question={say(`Ikusi aurretik: $[${numberLatex(pa)},\\,${numberLatex(pb)}]$ tartean, zein kurba dago goian?`, `Antes de verlo: en $[${numberLatex(pa)},\\,${numberLatex(pb)}]$, ¿qué curva va arriba?`, `قبل أن ترى: في $[${numberLatex(pa)},\\,${numberLatex(pb)}]$ أي منحنى في الأعلى؟`, `Before you see it: on $[${numberLatex(pa)},\\,${numberLatex(pb)}]$, which curve is on top?`)}
            labels={TOP_LABELS}
            actual={betweenPrediction(state)}
            choice={state.prediction}
            tip={say('Kalkulatu $f$ eta $g$ tartearen erdiko puntu batean, eta begiratu ebaki-puntuak barruan dauden.', 'Calcula $f$ y $g$ en un punto del medio del tramo, y mira si hay cortes dentro.', 'احسب $f$ و$g$ عند نقطة في وسط الجزء، وانظر هل توجد نقاط تقاطع داخله.', 'Work out $f$ and $g$ at a point in the middle of the stretch, and see whether there are crossings inside.')}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout latex={[`f(x)=${setup.fLatex}`, `g(x)=${setup.gLatex}`, `\\int_{${numberLatex(betweenA(state))}}^{${numberLatex(betweenB(state))}}(f-g)\\,dx=${numberLatex(stateIntegral)}`, `A=${numberLatex(stateArea)}`]} note={l(note)} />
        </Predict>
    )
    const [top, bottom] = [Y(yMax), Y(yMin)]
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={betweenChallenges} extraChallenges={betweenExtra} state={state}>
            <Board height={250} label={l(say(`f(x) = ${setup.fLatex} eta g(x) = ${setup.gLatex} kurbak, a eta b artean`, `Las curvas f(x) = ${setup.fLatex} y g(x) = ${setup.gLatex}, entre a y b`, `المنحنيان f(x) = ${setup.fLatex} و g(x) = ${setup.gLatex} بين a و b`, `The curves f(x) = ${setup.fLatex} and g(x) = ${setup.gLatex}, between a and b`))}>
                {clip.defs}
                <Grid xMin={xMin} xMax={xMax} yMin={yMin} yMax={yMax} X={X} Y={Y} yStep={yMax - yMin > 7 ? 2 : 1} />
                <g clipPath={clip.url}>
                    {shown && pieces.slice(0, -1).map((from, i) => {
                        const to = pieces[i + 1]
                        const middle = (from + to) / 2
                        const fTop = setup.f(middle) > setup.g(middle)
                        return <path key={from} d={regionPath(setup.f, from, to, X, Y, setup.g)} fill={fTop ? BLUE : VIOLET} fillOpacity={0.3} />
                    })}
                    <path d={curvePath(setup.f, xMin, xMax, X, Y, [yMin, yMax])} fill="none" stroke={STAGE} strokeWidth={3} strokeLinejoin="round" />
                    <path d={curvePath(setup.g, xMin, xMax, X, Y, [yMin, yMax])} fill="none" stroke={VIOLET} strokeWidth={3} strokeLinejoin="round" />
                </g>
                <Limit x={X(a)} top={top} bottom={bottom} name="a" />
                <Limit x={X(b)} top={top} bottom={bottom} name="b" />
                <BoardText x={44} y={top + 16} color={STAGE}>f</BoardText>
                <BoardText x={60} y={top + 16} color={VIOLET}>g</BoardText>
                {shown
                    ? <BoardText x={336} y={top + 16} anchor="end" color={INK}>{`A = ${num(area, props.language)}`}</BoardText>
                    : <Hidden x={X((a + b) / 2)} y={top + 30} size={22} />}
            </Board>
            <PlayButton label={l(say('Mugitu b eskuinera', 'Mueve b hacia la derecha', 'حرّك b نحو اليمين', 'Move b to the right'))} disabled={!shown} playing={playback.playing} onPlay={playback.play} />
        </ToolFrame>
    )
}

/* ---------- L5. The area function ---------- */

const ACCUMULATE_NAMES: Record<AccumulateFunction, string> = { line: '2 − x', parabola: 'x² − 1', twoCuts: 'x² − 4x + 3', cosine: 'cos x' }

const GROWTH_LABELS = {
    '<': say('Beherakorra ↘', 'Decrece ↘', 'متناقصة ↘', 'Decreases ↘'),
    '=': say('Geldi →', 'Quieta →', 'ثابتة →', 'Flat →'),
    '>': say('Gorakorra ↗', 'Crece ↗', 'متزايدة ↗', 'Increases ↗')
}

/** Where f changes sign between 0 and the end, found on a fine grid */
function signChanges(f: (x: number) => number, to: number): number[] {
    const out: number[] = []
    for (let x = 0; x < to; x += 0.01) {
        if (Math.sign(f(x)) !== Math.sign(f(x + 0.01)) && f(x + 0.01) !== 0) out.push(Math.round((x + 0.01) * 1000) / 1000)
    }
    return out
}

export function AreaFunctionTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<AccumulateState>(initialAccumulateState)
    const shown = state.prediction !== null
    const setup = ACCUMULATE_SETUP[state.fn]
    const end = setup.tMax / 2
    const X = (x: number) => 40 + (x / end) * 296
    const [fLow, fHigh] = [setup.fView[0] - 0.4, setup.fView[1] + 0.4]
    const [aLow, aHigh] = [setup.aView[0] - 0.4, setup.aView[1] + 0.4]
    const F = (y: number) => 12 + ((fHigh - y) / (fHigh - fLow)) * 118
    const G = (y: number) => 160 + ((aHigh - y) / (aHigh - aLow)) * 118
    const topClip = useClip(X(0), F(fHigh), X(end) - X(0), F(fLow) - F(fHigh))
    const bottomClip = useClip(X(0), G(aHigh), X(end) - X(0), G(aLow) - G(aHigh))
    const playback = usePlayback(`${state.fn}-${state.t}`, 3000)
    const x = shown && playback.progress !== null ? playback.progress * end : accumulateX(state)
    const changes = signChanges(setup.f, end).filter((c) => c < x)
    const pieces = [0, ...changes, x]
    const value = areaAt(state.fn, x)
    const name = ACCUMULATE_NAMES[state.fn]
    const controls = (
        <>
            <Segmented<AccumulateFunction> label={l(say('Funtzioa', 'Función', 'الدالة', 'Function'))} value={state.fn} options={ACCUMULATE_FUNCTIONS.map((fn) => ({ value: fn, label: ACCUMULATE_NAMES[fn] }))} onChange={(fn) => setState((s) => setAccumulate(s, { fn }))} />
            <Stepper label="x" value={state.t} min={0} max={setup.tMax} format={(value) => num(value / 2, props.language, 1)} onChange={(value) => setState((s) => setAccumulate(s, { t: value }))} language={props.language} />
        </>
    )
    const t = (value: number) => texDec(value, props.language, 3)
    const here = accumulateX(state)
    const height = heightAt(state.fn, here)
    const note = height > 0
        ? say('Hemen $f>0$ da: $A$ hazten ari da, eremu urdina handitzen delako.', 'Aquí $f>0$: $A$ está creciendo, porque la región azul aumenta.', 'هنا $f>0$: تتزايد $A$ لأن المنطقة الزرقاء تكبر.', 'Here $f>0$: $A$ is growing, because the blue region gets bigger.')
        : height < 0
            ? say('Hemen $f<0$ da: $A$ jaisten ari da, zati gorriak kendu egiten duelako.', 'Aquí $f<0$: $A$ está bajando, porque la parte roja resta.', 'هنا $f<0$: تتناقص $A$ لأن الجزء الأحمر يُطرح.', 'Here $f<0$: $A$ is going down, because the red part subtracts.')
            : say('Hemen $f=0$ da: $A$ geldi dago une batez. $A\'=f$.', 'Aquí $f=0$: $A$ se queda quieta un instante. $A\'=f$.', 'هنا $f=0$: تثبت $A$ لحظة. $A\'=f$.', 'Here $f=0$: $A$ stays still for a moment. $A\'=f$.')
    const readout = (
        <Predict
            language={props.language}
            question={say(`Ikusi aurretik: $${localize(props.language, setup.latex)}$ funtzioarekin, $x=${setup.p}$ puntuan $A(x)$ gorakorra, geldi ala beherakorra da?`, `Antes de verlo: con $${localize(props.language, setup.latex)}$, en $x=${setup.p}$, ¿$A(x)$ crece, se queda quieta o decrece?`, `قبل أن ترى: مع $${localize(props.language, setup.latex)}$، عند $x=${setup.p}$ هل $A(x)$ متزايدة أم ثابتة أم متناقصة؟`, `Before you see it: with $${localize(props.language, setup.latex)}$, at $x=${setup.p}$, does $A(x)$ increase, stay flat or decrease?`)}
            labels={GROWTH_LABELS}
            actual={accumulatePrediction(state)}
            choice={state.prediction}
            tip={say(`$x$ pixka bat aurreratzean, $A$ funtzioari $f(x)$ altuerako zerrenda mehe bat gehitzen zaio: begiratu $f(${setup.p})$ balioaren zeinuari.`, `Al avanzar $x$ un poco, a $A$ se le suma una tira fina de altura $f(x)$: mira el signo de $f(${setup.p})$.`, `عندما تتقدم $x$ قليلًا تُضاف إلى $A$ شريحة رفيعة ارتفاعها $f(x)$: انظر إلى إشارة $f(${setup.p})$.`, `When $x$ moves on a little, a thin strip of height $f(x)$ is added to $A$: look at the sign of $f(${setup.p})$.`)}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout latex={[localize(props.language, setup.latex), localize(props.language, setup.areaLatex), `A(${t(here)})=${t(areaAt(state.fn, here))}`, `A'(${t(here)})=f(${t(here)})=${t(height)}`]} note={l(note)} />
        </Predict>
    )
    const pX = X(setup.p)
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={accumulateChallenges} extraChallenges={accumulateExtra} state={state}>
            <Board height={300} label={l(say(`Goian ${name} eta 0 eta x arteko eremua; behean A(x) azalera-funtzioa`, `Arriba ${name} y la región de 0 a x; abajo la función área A(x)`, `في الأعلى ${name} والمنطقة من 0 إلى x؛ وفي الأسفل دالة المساحة A(x)`, `Above, ${name} and the region from 0 to x; below, the area function A(x)`))}>
                {topClip.defs}
                {bottomClip.defs}
                <Grid xMin={0} xMax={end} yMin={fLow} yMax={fHigh} X={X} Y={F} yStep={fHigh - fLow > 5 ? 2 : 1} />
                <Grid xMin={0} xMax={end} yMin={aLow} yMax={aHigh} X={X} Y={G} yStep={aHigh - aLow > 5 ? 2 : 1} labels={false} />
                <g clipPath={topClip.url}>
                    {pieces.slice(0, -1).map((from, i) => {
                        const to = pieces[i + 1]
                        if (to - from < 1e-6) return null
                        const positive = setup.f((from + to) / 2) > 0
                        return <path key={from} d={regionPath(setup.f, from, to, X, F)} fill={positive ? BLUE : RED} fillOpacity={0.3} />
                    })}
                    <path d={curvePath(setup.f, 0, end, X, F, [fLow, fHigh])} fill="none" stroke={STAGE} strokeWidth={3} strokeLinejoin="round" />
                </g>
                <BoardText x={44} y={26} color={STAGE}>f</BoardText>
                <BoardText x={44} y={174} color={INK}>A</BoardText>
                <line x1={pX} x2={pX} y1={F(fHigh)} y2={G(aLow)} stroke={MUTED} strokeWidth={1} strokeDasharray="3 4" />
                <text x={pX} y={G(aLow) + 14} textAnchor="middle" fontSize={12} fontWeight={700} fill={MUTED}>{num(setup.p, props.language, 1)}</text>
                <Dot x={pX} y={F(setup.f(setup.p))} color={INK} r={4.5} />
                <line x1={X(x)} x2={X(x)} y1={F(fHigh)} y2={G(aLow)} stroke={INK} strokeWidth={1.4} />
                <g clipPath={bottomClip.url}>
                    {shown && <path d={curvePath(setup.A, 0, Math.max(x, 1e-3), X, G, [aLow, aHigh], 0.01)} fill="none" stroke={INK} strokeWidth={3} strokeLinejoin="round" />}
                </g>
                {shown && <Dot x={X(x)} y={G(value)} color={INK} r={5.5} />}
                {!shown && <Hidden x={X(end / 2)} y={G((aLow + aHigh) / 2) + 8} size={24} />}
            </Board>
            <PlayButton label={l(say('Bete eremua 0 puntutik', 'Llena la región desde 0', 'املأ المنطقة من 0', 'Fill the region from 0'))} disabled={!shown} playing={playback.playing} onPlay={playback.play} />
        </ToolFrame>
    )
}
