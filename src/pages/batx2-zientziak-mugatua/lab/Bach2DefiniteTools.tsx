import { useId, useState, type MouseEvent } from 'react'
import { Segmented, Stepper, ToolFrame } from '../../../features/unit-v2/lab/LabKit'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import { useLabText } from '../../../features/unit-v2/lab/useLabText'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import { say } from '../../batx1-zientziak-funtzioak/text'
import { numberLatex } from '../../batx1-zientziak-integralak/lab/numbers'
import { Board, Hidden, PlayButton, Predict, Readout } from '../../dbh3-segidak/lab/LabParts'
import { dec, GREEN, INK, MUTED, PAPER, STAGE, texDec } from '../../dbh3-segidak/lab/labStyle'
import { setPrediction } from '../../dbh3-segidak/lab/prediction'
import { usePlayback } from '../../dbh4-aplikatuak-proportzionaltasuna/lab/usePlayback'
import { initialMeanState, isMeanPoint, MEAN_FUNCTIONS, MEAN_SETUP, meanArea, meanC, meanChallenges, meanExtra, meanPrediction, meanSteps, rectangleArea, setMean, type MeanFunction, type MeanState } from './meanRect'
import { band, initialSqueezeState, lowerSum, pieces, setSqueeze, SQUEEZE_FUNCTIONS, SQUEEZE_LIMITS, SQUEEZE_SETUP, squeezeArea, squeezeChallenges, squeezeExtra, squeezePrediction, upperSum, type SqueezeFunction, type SqueezeState } from './squeeze'
import { AXIS, allRight, initialStripState, setStrips, STRIP_REGIONS, STRIP_SETUP, stripChallenges, stripExtra, stripPrediction, stripTotal, stripValues, type Strip, type StripRegion, type StripState } from './strips'

/* ==========================================================================
   Integral mugatua · Batxilergoa 2 · Zientziak — the three tools of this
   unit: trap the area between the lower and the upper sum, the rectangle
   of the mean value and the region split into strips. Each asks for a
   guess before it shows the result. The boards carry numbers and formulas
   only (the svg is left to right); the words go in the readout. The
   helpers (curvePath, regionPath, Grid, useClip) are copies of those of
   Integralak 1.º, which does not export them. Logic in squeeze.ts,
   meanRect.ts and strips.ts.
   ========================================================================== */

const BLUE = '#2f6fdb'
const RED = '#c4432a'
const VIOLET = '#7b52c7'
const OCHRE = '#a8781f'
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

/** A light grid with the axes and the numbers every `xStep` / `yStep` units */
function Grid({ xMin, xMax, yMin, yMax, X, Y, xStep = 1, yStep = 1 }: { xMin: number; xMax: number; yMin: number; yMax: number; X: (x: number) => number; Y: (y: number) => number; xStep?: number; yStep?: number }) {
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
            {xs.filter((x) => x !== 0 && x % xStep === 0).map((x) => <text key={`tx${x}`} x={X(x)} y={axisY + 14} textAnchor="middle" fontSize={12} fill={MUTED}>{minus(x)}</text>)}
            {ys.filter((y) => y !== 0 && y % yStep === 0).map((y) => <text key={`ty${y}`} x={axisX - 5} y={Y(y) + 4} textAnchor="end" fontSize={12} fill={MUTED}>{minus(y)}</text>)}
        </g>
    )
}

/** A clip path for a plotting area, so that curves and regions stop at its edges */
function useClip(x: number, y: number, width: number, height: number) {
    const id = useId().replace(/:/g, '')
    return { defs: <defs><clipPath id={id}><rect x={x} y={y} width={width} height={height} /></clipPath></defs>, url: `url(#${id})` }
}

/** A formula on the board, left to right, with a light halo so that it reads over the grid */
const BoardText = ({ x, y, children, color = INK, anchor = 'start', size = 14 }: { x: number; y: number; children: string; color?: string; anchor?: 'start' | 'middle' | 'end'; size?: number }) => (
    <text x={x} y={y} textAnchor={anchor} fontSize={size} fontWeight={700} fill={color} paintOrder="stroke" stroke={PAPER} strokeWidth={4} strokeLinejoin="round">{children}</text>
)

/** A formula on a button, kept left to right inside Arabic (HTML honours the isolates; √x would otherwise read x√) */
const ltr = (text: string) => `\u2066${text}\u2069`

const SUBSCRIPTS = ['₀', '₁', '₂', '₃', '₄', '₅', '₆', '₇', '₈', '₉']
const subscript = (value: number) => String(value).split('').map((digit) => SUBSCRIPTS[Number(digit)]).join('')

/* ---------- L1. Trap the area between s and S ---------- */

const SQUEEZE_NAMES: Record<SqueezeFunction, string> = { cap: '4 − x²', valley: '(x − 1)² + 1', line: 'x/2 + 1', root: '√x' }
/** ▶ doubles n: 1, 2, 4, 8, 16, 32 */
const DOUBLINGS = [1, 2, 4, 8, 16, 32]

export function SqueezeTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<SqueezeState>(initialSqueezeState)
    const shown = state.prediction !== null
    const setup = SQUEEZE_SETUP[state.fn]
    const playback = usePlayback(`${state.fn}-${state.n}`, 3600)
    const n = shown && playback.progress !== null ? DOUBLINGS[Math.min(DOUBLINGS.length - 1, Math.floor(playback.progress * DOUBLINGS.length))] : state.n
    const pad = (setup.b - setup.a) * 0.08
    const [xMin, xMax] = [setup.a - pad, setup.b + pad]
    const [yMin, yMax] = [setup.view[0] - (setup.view[1] - setup.view[0]) * 0.08, setup.view[1] * 1.08]
    const X = (x: number) => 40 + ((x - xMin) / (xMax - xMin)) * 300
    const Y = (y: number) => 32 + ((yMax - y) / (yMax - yMin)) * 190
    const clip = useClip(X(xMin), Y(yMax), 300, Y(yMin) - Y(yMax))
    const s = lowerSum(state.fn, n)
    const S = upperSum(state.fn, n)
    const area = squeezeArea(state.fn)
    const t = (value: number) => texDec(value, props.language, 3)
    const controls = (
        <>
            <Segmented<SqueezeFunction> label={l(say('Funtzioa', 'Función', 'الدالة', 'Function'))} value={state.fn} options={SQUEEZE_FUNCTIONS.map((fn) => ({ value: fn, label: ltr(SQUEEZE_NAMES[fn]) }))} onChange={(fn) => setState((current) => setSqueeze(current, { fn }))} />
            <Stepper label={l(say('Zatiak: n', 'Tramos: n', 'الأجزاء: n', 'Pieces: n'))} value={state.n} min={SQUEEZE_LIMITS.n.min} max={SQUEEZE_LIMITS.n.max} onChange={(value) => setState((current) => setSqueeze(current, { n: value }))} language={props.language} />
        </>
    )
    const stateBand = band(state.fn, state.n)
    const where = squeezePrediction(state)
    const note = where === '='
        ? say('Zuzen batean, azalera $s$ eta $S$ zenbakien erdian dago: soberan dagoena eta falta dena berdinak dira.', 'En una recta, el área está justo en medio de $s$ y $S$: lo que sobra y lo que falta son iguales.', 'في المستقيم تقع المساحة تمامًا في منتصف $s$ و$S$: الزائد يساوي الناقص.', 'On a straight line, the area is exactly halfway between $s$ and $S$: what is left over equals what is missing.')
        : where === '>'
            ? say('Kurba behera okertzen da: gaineko laukizuzenek gutxi gainditzen dute, eta azalera $S$ zenbakitik hurbilago dago. $n$ handitzean, $S-s$ banda estutu egiten da.', 'La curva se dobla hacia abajo: los rectángulos de arriba sobran poco y el área está más cerca de $S$. Al aumentar $n$, la banda $S-s$ se estrecha.', 'المنحنى ينحني إلى الأسفل: تزيد المستطيلات العلوية قليلًا والمساحة أقرب إلى $S$. وعند زيادة $n$ يضيق الشريط $S-s$.', 'The curve bends down: the rectangles above stick out a little and the area is nearer to $S$. As $n$ grows, the band $S-s$ narrows.')
            : say('Kurba gora okertzen da: azpiko laukizuzenei gutxi falta zaie, eta azalera $s$ zenbakitik hurbilago dago. $n$ handitzean, $S-s$ banda estutu egiten da.', 'La curva se dobla hacia arriba: a los rectángulos de abajo les falta poco y el área está más cerca de $s$. Al aumentar $n$, la banda $S-s$ se estrecha.', 'المنحنى ينحني إلى الأعلى: ينقص المستطيلات السفلية قليل والمساحة أقرب إلى $s$. وعند زيادة $n$ يضيق الشريط $S-s$.', 'The curve bends up: the rectangles below are only a little short and the area is nearer to $s$. As $n$ grows, the band $S-s$ narrows.')
    const readout = (
        <Predict
            language={props.language}
            question={say(
                `Ikusi aurretik: $${setup.latex}$ funtzioarekin, azalera $s$ zenbakitik hurbilago, erdian ala $S$ zenbakitik hurbilago egongo da?`,
                `Antes de verlo: con $${setup.latex}$, ¿el área estará más cerca de $s$, en el medio o más cerca de $S$?`,
                `قبل أن ترى: مع $${setup.latex}$ هل ستكون المساحة أقرب إلى $s$ أم في المنتصف أم أقرب إلى $S$؟`,
                `Before you see it: with $${setup.latex}$, will the area be nearer to $s$, halfway or nearer to $S$?`
            )}
            labels={{ '<': say('s zenbakitik hurbilago', 'Más cerca de s', 'أقرب إلى s', 'Nearer to s'), '=': say('Erdian', 'En el medio', 'في المنتصف', 'Halfway'), '>': say('S zenbakitik hurbilago', 'Más cerca de S', 'أقرب إلى S', 'Nearer to S') }}
            actual={where}
            choice={state.prediction}
            tip={say('Begiratu kurba nola okertzen den: gaineko laukizuzenetatik soberan dagoena eta azpikoei falta zaiena alderatu.', 'Mira cómo se dobla la curva: compara lo que sobra de los rectángulos de arriba con lo que les falta a los de abajo.', 'انظر كيف ينحني المنحنى: قارن ما يزيد من المستطيلات العلوية بما ينقص السفلية.', 'Look at how the curve bends: compare what the rectangles above leave over with what the ones below are missing.')}
            onChoose={(prediction) => setState((current) => setPrediction(current, prediction))}
        >
            <Readout latex={[setup.latex, `s_{${state.n}}=${t(lowerSum(state.fn, state.n))}\\qquad S_{${state.n}}=${t(upperSum(state.fn, state.n))}`, `S-s=${t(stateBand)}`, `A=${setup.areaLatex}\\approx ${t(area)}`]} note={l(note)} />
        </Predict>
    )
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={squeezeChallenges} extraChallenges={squeezeExtra} state={state}>
            <Board height={250} label={l(say(`${SQUEEZE_NAMES[state.fn]} kurba ${n} zatitan: laukizuzen urdinak minimoarekin, gorriak maximoarekin`, `${SQUEEZE_NAMES[state.fn]} en ${n} tramos: rectángulos azules con el mínimo, rojos con el máximo`, `${SQUEEZE_NAMES[state.fn]} في ${n} أجزاء: المستطيلات الزرقاء بأصغر قيمة والحمراء بأكبرها`, `${SQUEEZE_NAMES[state.fn]} in ${n} pieces: blue rectangles with the minimum, red ones with the maximum`))}>
                {clip.defs}
                <Grid xMin={xMin} xMax={xMax} yMin={yMin} yMax={yMax} X={X} Y={Y} />
                <g clipPath={clip.url}>
                    {shown && <path d={regionPath(setup.fn, setup.a, setup.b, X, Y)} fill={GREEN} fillOpacity={0.22} />}
                    {pieces(state.fn, n).map((piece) => (
                        <g key={piece.x}>
                            <rect x={X(piece.x)} y={Y(piece.high)} width={X(piece.x + piece.width) - X(piece.x)} height={Y(piece.low) - Y(piece.high)} fill={RED} fillOpacity={0.16} stroke={RED} strokeWidth={n > 16 ? 0.6 : 1.2} />
                            <rect x={X(piece.x)} y={Y(piece.low)} width={X(piece.x + piece.width) - X(piece.x)} height={Y(0) - Y(piece.low)} fill={BLUE} fillOpacity={0.24} stroke={BLUE} strokeWidth={n > 16 ? 0.6 : 1.2} />
                        </g>
                    ))}
                    <path d={curvePath(setup.fn, xMin, xMax, X, Y, [yMin, yMax])} fill="none" stroke={STAGE} strokeWidth={3} strokeLinejoin="round" />
                </g>
                <BoardText x={44} y={20} color={BLUE}>{`s${subscript(n)} = ${num(s, props.language)}`}</BoardText>
                <BoardText x={340} y={20} anchor="end" color={RED}>{`S${subscript(n)} = ${num(S, props.language)}`}</BoardText>
                {shown ? <BoardText x={190} y={20} anchor="middle" color={GREEN}>{`A = ${num(area, props.language)}`}</BoardText> : <Hidden x={190} y={24} size={22} />}
            </Board>
            <PlayButton label={l(say('Bikoiztu n', 'Duplica n', 'ضاعف n', 'Double n'))} disabled={!shown} playing={playback.playing} onPlay={playback.play} />
        </ToolFrame>
    )
}

/* ---------- L2. The mean value rectangle ---------- */

const MEAN_NAMES: Record<MeanFunction, string> = { square: 'x²', root: '√x', line: 'x + 1', cap: '4 − x²', exp: 'eˣ' }

export function MeanRectTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<MeanState>(initialMeanState)
    const shown = state.prediction !== null
    const setup = MEAN_SETUP[state.fn]
    const pad = (setup.b - setup.a) * 0.08
    const [xMin, xMax] = [setup.a - pad, setup.b + pad]
    const [yMin, yMax] = [setup.view[0] - (setup.view[1] - setup.view[0]) * 0.08, setup.view[1] * 1.08]
    const X = (x: number) => 40 + ((x - xMin) / (xMax - xMin)) * 300
    const Y = (y: number) => 32 + ((yMax - y) / (yMax - yMin)) * 190
    const clip = useClip(X(xMin), Y(yMax), 300, Y(yMin) - Y(yMax))
    const c = meanC(state)
    const height = setup.fn(c)
    const rectangle = rectangleArea(state)
    const area = meanArea(state.fn)
    const t = (value: number) => texDec(value, props.language, 3)
    const length = setup.b - setup.a
    // A tap on the board moves c to the nearest tenth under the finger
    const tap = (event: MouseEvent<SVGRectElement>) => {
        const svg = event.currentTarget.ownerSVGElement
        const matrix = svg?.getScreenCTM()
        if (!svg || !matrix) return
        const point = svg.createSVGPoint()
        point.x = event.clientX
        point.y = event.clientY
        const x = xMin + ((point.matrixTransform(matrix.inverse()).x - 40) / 300) * (xMax - xMin)
        setState((current) => setMean(current, { tenths: Math.round((x - setup.a) * 10) }))
    }
    const controls = (
        <>
            <Segmented<MeanFunction> label={l(say('Funtzioa', 'Función', 'الدالة', 'Function'))} value={state.fn} options={MEAN_FUNCTIONS.map((fn) => ({ value: fn, label: ltr(MEAN_NAMES[fn]) }))} onChange={(fn) => setState((current) => setMean(current, { fn }))} />
            <Stepper label="c" value={state.tenths} min={0} max={meanSteps(state.fn)} format={(value) => num(setup.a + value / 10, props.language, 1)} onChange={(value) => setState((current) => setMean(current, { tenths: value }))} language={props.language} />
        </>
    )
    const note = isMeanPoint(state)
            ? say('Laukizuzenak eskualdearen azalera bera du (hamarrenetara): $f(c)$ funtzioaren batez besteko balioa da.', 'El rectángulo tiene la misma área que la región (a la décima): $f(c)$ es el valor medio de la función.', 'للمستطيل مساحة المنطقة نفسها (إلى أقرب عُشر): $f(c)$ هي القيمة المتوسطة للدالة.', 'The rectangle has the same area as the region (to the nearest tenth): $f(c)$ is the mean value of the function.')
            : rectangle > area
                ? say('Laukizuzena handiegia da: mugitu $c$ kurba baxuago dagoen aldera.', 'El rectángulo se pasa: mueve $c$ hacia donde la curva está más baja.', 'المستطيل أكبر من اللازم: حرّك $c$ نحو الجهة التي يكون فيها المنحنى أخفض.', 'The rectangle is too big: move $c$ to where the curve is lower.')
                : say('Laukizuzena txikiegia da: mugitu $c$ kurba gorago dagoen aldera.', 'Al rectángulo le falta: mueve $c$ hacia donde la curva está más alta.', 'المستطيل أصغر من اللازم: حرّك $c$ نحو الجهة التي يكون فيها المنحنى أعلى.', 'The rectangle falls short: move $c$ to where the curve is higher.')
    const readout = (
        <Predict
            language={props.language}
            question={say(
                `Ikusi aurretik: $${setup.latex}$ funtzioarekin, teoremaren $c$ puntua tartearen erdiaren ezkerrean, erdian ala eskuinean egongo da?`,
                `Antes de verlo: con $${setup.latex}$, ¿el $c$ del teorema estará a la izquierda del centro del intervalo, en el centro o a la derecha?`,
                `قبل أن ترى: مع $${setup.latex}$ هل ستكون نقطة $c$ في المبرهنة يسار منتصف الفترة أم في المنتصف أم يمينه؟`,
                `Before you see it: with $${setup.latex}$, will the $c$ of the theorem be left of the middle of the interval, at the middle or to the right?`
            )}
            labels={{ '<': say('Ezkerrean', 'A la izquierda', 'إلى اليسار', 'To the left'), '=': say('Erdian', 'En el centro', 'في المنتصف', 'At the middle'), '>': say('Eskuinean', 'A la derecha', 'إلى اليمين', 'To the right') }}
            actual={meanPrediction(state)}
            choice={state.prediction}
            tip={say('Alderatu kurba muturrak lotzen dituen zuzenarekin: kurba azpitik badoa, $c$ alde garaira doa; gainetik badoa, alde baxura.', 'Compara la curva con la recta que une sus extremos: si la curva va por debajo, $c$ se va hacia el lado alto; si va por encima, hacia el lado bajo.', 'قارن المنحنى بالمستقيم الذي يصل طرفيه: إذا كان المنحنى تحته اتجه $c$ نحو الجهة العالية، وإذا كان فوقه فنحو الجهة المنخفضة.', 'Compare the curve with the line joining its ends: if the curve runs below it, $c$ moves to the high side; if it runs above, to the low side.')}
            onChoose={(prediction) => setState((current) => setPrediction(current, prediction))}
        >
            <Readout latex={[setup.latex, `c=${t(c)}\\qquad f(c)=${t(height)}`, `f(c)\\cdot ${length}=${t(rectangle)}`, `A=${setup.areaLatex}\\approx ${t(area)}`]} note={l(note)} />
        </Predict>
    )
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={meanChallenges} extraChallenges={meanExtra} state={state}>
            <Board height={250} label={l(say(`${MEAN_NAMES[state.fn]} kurbaren azpiko eskualdea eta f(c) altuerako laukizuzena; ukitu taula c mugitzeko`, `La región bajo ${MEAN_NAMES[state.fn]} y el rectángulo de altura f(c); toca el tablero para mover c`, `المنطقة تحت ${MEAN_NAMES[state.fn]} والمستطيل الذي ارتفاعه f(c)؛ المس اللوحة لتحريك c`, `The region under ${MEAN_NAMES[state.fn]} and the rectangle of height f(c); tap the board to move c`))}>
                {clip.defs}
                <Grid xMin={xMin} xMax={xMax} yMin={yMin} yMax={yMax} X={X} Y={Y} yStep={setup.view[1] > 5 ? 2 : 1} />
                <g clipPath={clip.url}>
                    <path d={regionPath(setup.fn, setup.a, setup.b, X, Y)} fill={BLUE} fillOpacity={0.24} />
                    <rect x={X(setup.a)} y={Y(height)} width={X(setup.b) - X(setup.a)} height={Y(0) - Y(height)} fill={VIOLET} fillOpacity={0.16} stroke={VIOLET} strokeWidth={2} />
                    <path d={curvePath(setup.fn, xMin, xMax, X, Y, [yMin, yMax])} fill="none" stroke={STAGE} strokeWidth={3} strokeLinejoin="round" />
                    <line x1={X(c)} x2={X(c)} y1={Y(0)} y2={Y(height)} stroke={INK} strokeWidth={1.4} strokeDasharray="4 4" />
                    <circle cx={X(c)} cy={Y(height)} r={5.5} fill={VIOLET} stroke={PAPER} strokeWidth={1.4} />
                </g>
                <text x={X(c)} y={Y(0) + 26} textAnchor="middle" fontSize={13} fontWeight={700} fontStyle="italic" fill={VIOLET}>c</text>
                <BoardText x={44} y={20} color={VIOLET}>{`R = ${num(rectangle, props.language)}`}</BoardText>
                {shown ? <BoardText x={340} y={20} anchor="end" color={BLUE}>{`A = ${num(area, props.language)}`}</BoardText> : <Hidden x={318} y={24} size={22} />}
                <rect x={40} y={32} width={300} height={190} fill="transparent" style={{ cursor: 'pointer' }} onClick={tap} />
            </Board>
        </ToolFrame>
    )
}

/* ---------- L3. Split the region into strips ---------- */

const REGION_NAMES: Record<StripRegion, string> = { parabolaLine: 'x², 2 − x', rootLine: '√x, 2 − x', twoParabolas: 'x², x²/4, 4', chord: 'x², 2x', cubicAxis: 'x³ − 3x² + 2x' }
const CURVE_COLORS = [BLUE, VIOLET, OCHRE]

/** The integral of a strip with the chosen curve on top: ∫ₐᵇ (top − bottom) dx */
function stripLatex(strip: Strip, top: 0 | 1): string {
    const upper = strip.curves[top]
    const lower = strip.curves[top === 0 ? 1 : 0]
    return `\\int_{${strip.from}}^{${strip.to}}\\left(${upper.term}-${lower.term}\\right)dx`
}

/** a + b − c for the readout, with the signs of the values */
const sumLatex = (values: number[]) => values.map((value, i) => (i > 0 && value >= 0 ? `+${numberLatex(value)}` : numberLatex(value))).join('')

export function StripsTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<StripState>(initialStripState)
    const shown = state.prediction !== null
    const setup = STRIP_SETUP[state.region]
    const [xMin, xMax] = setup.view.x
    const [yMin, yMax] = setup.view.y
    const X = (x: number) => 40 + ((x - xMin) / (xMax - xMin)) * 300
    const Y = (y: number) => 30 + ((yMax - y) / (yMax - yMin)) * 200
    const clip = useClip(X(xMin), Y(yMax), 300, Y(yMin) - Y(yMax))
    const values = stripValues(state)
    const total = stripTotal(state)
    const right = allRight(state)
    const controls = (
        <>
            <Segmented<StripRegion> label={l(say('Barrutia', 'Recinto', 'المنطقة', 'Region'))} value={state.region} options={STRIP_REGIONS.map((region) => ({ value: region, label: ltr(REGION_NAMES[region]) }))} onChange={(region) => setState((current) => setStrips(current, { region }))} />
            {shown && setup.strips.map((strip, i) => (
                <Segmented<'0' | '1'>
                    key={`${state.region}-${i}`}
                    label={l(say(`${i + 1}. zerrenda, goian:`, `Tira ${i + 1}, arriba:`, `الشريحة ${i + 1}، في الأعلى:`, `Strip ${i + 1}, on top:`))}
                    value={state.tops[i] === 1 ? '1' : '0'}
                    options={[{ value: '0', label: ltr(strip.curves[0].name) }, { value: '1', label: ltr(strip.curves[1].name) }]}
                    onChange={(value) => setState((current) => setStrips(current, { strip: i, top: value === '1' ? 1 : 0 }))}
                />
            ))}
        </>
    )
    const cubic = setup.curves.find((item) => item.term === 'f')
    const note = right
        ? say('Zerrenda guztiak positiboak dira: batura barrutiaren azalera da.', 'Todas las tiras son positivas: la suma es el área del recinto.', 'كل الشرائح موجبة: المجموع هو مساحة المنطقة.', 'Every strip is positive: the sum is the area of the region.')
        : values.some((value) => value < 0)
            ? say('Zerrenda batek zenbaki negatiboa ematen du: haren goiko kurba behean dago. Aldatu.', 'Una tira da un número negativo: su curva de arriba está en realidad abajo. Cámbiala.', 'شريحة تعطي عددًا سالبًا: منحناها الأعلى في الحقيقة في الأسفل. غيّره.', 'A strip gives a negative number: its top curve is really at the bottom. Change it.')
            : say('Aukeratu goiko kurba zerrenda bakoitzean.', 'Elige la curva de arriba en cada tira.', 'اختر المنحنى الأعلى في كل شريحة.', 'Choose the top curve in each strip.')
    const readout = (
        <Predict
            language={props.language}
            question={say(
                'Ikusi aurretik: zenbat zerrendatan zatitu behar da barruti hau integratzeko?',
                'Antes de verlo: ¿en cuántas tiras hay que partir este recinto para integrarlo?',
                'قبل أن ترى: إلى كم شريحة يجب تقسيم هذه المنطقة لنكاملها؟',
                'Before you see it: into how many strips must this region be split to integrate it?'
            )}
            labels={{ '<': say('Bat', 'Una', 'واحدة', 'One'), '=': say('Bi', 'Dos', 'اثنتان', 'Two'), '>': say('Hiru', 'Tres', 'ثلاث', 'Three') }}
            actual={stripPrediction(state)}
            choice={state.prediction}
            tip={say('Bilatu non mozten diren kurbak binaka: goiko edo beheko kurba aldatzen den ebaki bakoitzean zerrenda berri bat hasten da.', 'Busca dónde se cortan las curvas dos a dos: en cada corte en el que cambia la curva de arriba o la de abajo empieza una tira.', 'ابحث أين تتقاطع المنحنيات مثنى مثنى: عند كل تقاطع يتغير فيه المنحنى الأعلى أو الأدنى تبدأ شريحة جديدة.', 'Look for where the curves cross two by two: at each crossing where the top or the bottom curve changes, a new strip starts.')}
            onChoose={(prediction) => setState((current) => setPrediction(current, prediction))}
        >
            <Readout
                latex={[
                    ...(cubic ? [`f(x)=${cubic.latex.replace('y=', '')}`] : []),
                    ...setup.strips.map((strip, i) => `${stripLatex(strip, state.tops[i] ?? 0)}=${numberLatex(values[i])}`),
                    `${values.length > 1 ? `${sumLatex(values)}=` : ''}${numberLatex(total)}${right ? '=A' : ''}`
                ]}
                note={l(note)}
            />
        </Predict>
    )
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={stripChallenges} extraChallenges={stripExtra} state={state}>
            <Board height={260} label={l(say(`${REGION_NAMES[state.region]} kurbek mugatutako barrutia`, `El recinto limitado por ${REGION_NAMES[state.region]}`, `المنطقة التي يحدّها ${REGION_NAMES[state.region]}`, `The region bounded by ${REGION_NAMES[state.region]}`))}>
                {clip.defs}
                <Grid xMin={xMin} xMax={xMax} yMin={yMin} yMax={yMax} X={X} Y={Y} />
                <g clipPath={clip.url}>
                    {setup.strips.map((strip, i) => {
                        const top = shown ? state.tops[i] ?? 0 : strip.top
                        const upper = strip.curves[top]
                        const lower = strip.curves[top === 0 ? 1 : 0]
                        const color = !shown ? MUTED : values[i] < 0 ? RED : BLUE
                        return <path key={i} d={regionPath(upper.fn, strip.from, strip.to, X, Y, lower.fn)} fill={color} fillOpacity={shown ? 0.28 : 0.18} />
                    })}
                    {setup.curves.filter((item) => item !== AXIS).map((item) => (
                        <path key={item.name} d={curvePath(item.fn, xMin, xMax, X, Y, [yMin, yMax])} fill="none" stroke={CURVE_COLORS[setup.curves.indexOf(item)]} strokeWidth={3} strokeLinejoin="round" />
                    ))}
                    {shown && setup.strips.slice(1).map((strip) => <line key={strip.from} x1={X(strip.from)} x2={X(strip.from)} y1={Y(yMin)} y2={Y(yMax)} stroke={INK} strokeWidth={1.6} strokeDasharray="5 4" />)}
                </g>
                {setup.curves.map((item, i) => {
                    const at = setup.labels[i]
                    return at ? <BoardText key={item.name} x={X(at[0])} y={Y(at[1])} anchor="middle" color={CURVE_COLORS[i]}>{item.name}</BoardText> : null
                })}
                {shown ? <BoardText x={340} y={20} anchor="end" color={right ? GREEN : INK}>{`Σ = ${num(total, props.language)}`}</BoardText> : <Hidden x={318} y={24} size={22} />}
            </Board>
        </ToolFrame>
    )
}
