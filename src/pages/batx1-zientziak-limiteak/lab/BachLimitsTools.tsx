import { useId, useState } from 'react'
import { Segmented, Stepper, ToolFrame } from '../../../features/unit-v2/lab/LabKit'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import { useLabText } from '../../../features/unit-v2/lab/useLabText'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import { groupDigits, groupLatex } from '../../../utils/numberFormat'
import { say } from '../../batx1-zientziak-funtzioak/text'
import { Board, Hidden, PlayButton, Predict, Readout } from '../../dbh3-segidak/lab/LabParts'
import { dec, GREEN, INK, MUSTARD, MUSTARD_TINT, MUTED, PAPER, SECOND, STAGE, texDec } from '../../dbh3-segidak/lab/labStyle'
import { setPrediction } from '../../dbh3-segidak/lab/prediction'
import { usePlayback } from '../../dbh4-aplikatuak-proportzionaltasuna/lab/usePlayback'
import { BOLZANO_FUNCTIONS, BOLZANO_LATEX, BOLZANO_LIMITS, bolzanoChallenges, bolzanoExtra, bolzanoIntervals, bolzanoKind, bolzanoPrediction, bolzanoValue, initialBolzanoState, isContinuous, setBolzano, type BolzanoFunction, type BolzanoState } from './bolzano'
import { DEGREES_LIMITS, degreesChallenges, degreesExtra, degreesLatex, degreesLimit, degreesPrediction, degreesValue, denominatorValue, initialDegreesState, numeratorValue, ratioLatex, setDegrees, type DegreesState } from './degrees'
import { factorLatex, HOLE_LIMITS, holeChallenges, holeExtra, holeKind, holeLatex, holeLimit, holePrediction, holeSides, holeValue, initialHoleState, multiplicity, setHole, substituteLatex, type HoleState } from './hole'
import { initialLensState, LENS_FUNCTIONS, LENS_LIMITS, LENS_SETUP, lensChallenges, lensExtra, lensH, lensLimits, lensPrediction, lensValues, setLens, type LensFunction, type LensState } from './lens'

/* ==========================================================================
   Limiteak eta jarraitutasuna · Batxilergoa 1 · Zientziak — the four tools
   of this unit: the lens of the limit, the hole of 0/0, the highest degree
   wins and Bolzano traps the root. Each asks for a prediction before it
   shows the graph or the values, and each moves with ▶. The boards carry
   numbers and formulas only (the svg is left to right); the words go in
   the readout. Logic in lens.ts, hole.ts, degrees.ts and bolzano.ts.
   ========================================================================== */

const minus = (value: number) => (value < 0 ? `−${-value}` : String(value))
/** A formula kept left to right inside Arabic text (LRI … PDI) */
const ltr = (text: string) => `\u2066${text}\u2069`
/** A number for the board, with the language's decimal mark and a real minus sign */
const num = (value: number, language: UnitLanguage, digits = 3) => dec(value, language, digits).replace('-', '−')

/** A curve as an SVG path, broken where it does not exist, leaves the band or jumps */
function curvePath(fn: (x: number) => number | null, from: number, to: number, X: (x: number) => number, Y: (y: number) => number, yLimit: [number, number], step = 0.02): string {
    const [low, high] = yLimit
    const margin = (high - low) / 2
    let path = ''
    let open = false
    let previous: number | null = null
    for (let x = from; x <= to + 1e-9; x += step) {
        const y = fn(x)
        const outside = y === null || y < low - margin || y > high + margin
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

/** A clip path for the plotting area, so that curves stop at its edges */
function useClip(x: number, y: number, width: number, height: number) {
    const id = useId().replace(/:/g, '')
    return { defs: <defs><clipPath id={id}><rect x={x} y={y} width={width} height={height} /></clipPath></defs>, url: `url(#${id})` }
}

const Open = ({ x, y, color }: { x: number; y: number; color: string }) => <circle cx={x} cy={y} r={5.5} fill={PAPER} stroke={color} strokeWidth={2.4} />
const Full = ({ x, y, color }: { x: number; y: number; color: string }) => <circle cx={x} cy={y} r={5.5} fill={color} stroke={PAPER} strokeWidth={1.2} />
const Probe = ({ x, y, color }: { x: number; y: number; color: string }) => <circle cx={x} cy={y} r={6.5} fill={color} stroke={PAPER} strokeWidth={1.6} />

/* ---------- L1. The lens of the limit ---------- */

const LENS_NAMES: Record<LensFunction, string> = { hole: 'f₁', jump: 'f₂', moved: 'f₃', sign: 'f₄', drop: 'f₅' }

export function LensTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<LensState>(initialLensState)
    const shown = state.prediction !== null
    const setup = LENS_SETUP[state.fn]
    const { xMin, xMax, yMin, yMax } = setup.view
    const sx = 300 / (xMax - xMin)
    const sy = 200 / (yMax - yMin)
    const X = (x: number) => 40 + (x - xMin) * sx
    const Y = (y: number) => 20 + (yMax - y) * sy
    const clip = useClip(X(xMin), Y(yMax), 300, 200)
    const playback = usePlayback(`${state.fn}-${state.k}`, 1600)
    const progress = !shown ? 0 : playback.progress === null ? 1 : playback.progress
    const h = 10 ** (-state.k * progress)
    const a = setup.a
    const [leftLimit, rightLimit] = lensLimits(state.fn)
    const [leftValue, rightValue] = lensValues(state)
    const hText = (k: number) => num(lensH(k), props.language)
    const controls = (
        <>
            <Segmented<LensFunction> label={l(say('Funtzioa', 'Función', 'الدالة', 'Function'))} value={state.fn} options={LENS_FUNCTIONS.map((fn) => ({ value: fn, label: LENS_NAMES[fn] }))} onChange={(fn) => setState((s) => setLens(s, { fn }))} />
            <Stepper label={l(say('Lupa: h distantzia', 'Lupa: distancia h', 'العدسة: المسافة h', 'Lens: distance h'))} value={state.k} min={LENS_LIMITS.k.min} max={LENS_LIMITS.k.max} format={hText} onChange={(k) => setState((s) => setLens(s, { k }))} language={props.language} />
        </>
    )
    const t = (value: number) => texDec(value, props.language, 3)
    const limit = `$\\lim_{x\\to ${a}}f(x)=${t(leftLimit)}$`
    const fa = setup.at === null
        ? say(` $f(${a})$ ez dago.`, ` $f(${a})$ no existe.`, ` و$f(${a})$ غير موجودة.`, ` $f(${a})$ does not exist.`)
        : setup.at !== leftLimit
            ? say(` Baina $f(${a})=${setup.at}$: limiteak ez du hori begiratzen.`, ` Pero $f(${a})=${setup.at}$: el límite no lo mira.`, ` لكن $f(${a})=${setup.at}$: النهاية لا تنظر إليها.`, ` But $f(${a})=${setup.at}$: the limit does not look at it.`)
            : say(` Eta $f(${a})=${setup.at}$.`, ` Y $f(${a})=${setup.at}$.`, ` و$f(${a})=${setup.at}$.`, ` And $f(${a})=${setup.at}$.`)
    const note = leftLimit === rightLimit
        ? say(`Bi aldeetatik balio berera: ${limit}.${fa.eu}`, `Por los dos lados al mismo valor: ${limit}.${fa.es}`, `من الجانبين إلى القيمة نفسها: ${limit}.${fa.ar}`, `From both sides to the same value: ${limit}.${fa.en}`)
        : say(`Ezkerretik $${t(leftLimit)}$ eta eskuinetik $${t(rightLimit)}$: jauzia, ez dago limiterik.`, `Por la izquierda $${t(leftLimit)}$ y por la derecha $${t(rightLimit)}$: un salto, no hay límite.`, `من اليسار $${t(leftLimit)}$ ومن اليمين $${t(rightLimit)}$: قفزة، ولا توجد نهاية.`, `From the left $${t(leftLimit)}$ and from the right $${t(rightLimit)}$: a jump, no limit.`)
    const readout = (
        <Predict
            language={props.language}
            question={say(`Ikusi aurretik: $${setup.latex}$ funtzioan, $x=${a}$ puntuan, ezkerreko limitea eskuinekoa baino txikiagoa, berdina ala handiagoa da?`, `Antes de verlo: en $${setup.latex}$, en $x=${a}$, ¿el límite por la izquierda es menor, igual o mayor que por la derecha?`, `قبل أن ترى: في $${setup.latex}$ عند $x=${a}$، هل النهاية من اليسار أصغر من النهاية من اليمين أم تساويها أم أكبر منها؟`, `Before you see it: in $${setup.latex}$, at $x=${a}$, is the left limit smaller than, equal to or greater than the right limit?`)}
            labels={{ '<': say('Ezkerrekoa txikiagoa', 'Menor por la izquierda', 'من اليسار أصغر', 'Smaller on the left'), '=': say('Berdinak: limitea badago', 'Iguales: hay límite', 'متساويتان: النهاية موجودة', 'Equal: there is a limit'), '>': say('Ezkerrekoa handiagoa', 'Mayor por la izquierda', 'من اليسار أكبر', 'Greater on the left') }}
            actual={lensPrediction(state)}
            choice={state.prediction}
            tip={say(`Ordezkatu $x=${a}$ zati bakoitzean: ezkerreko zatiak ezkerreko limitea ematen du, eta eskuinekoak eskuinekoa. $f(${a})$ balioak ez du ezer esaten.`, `Sustituye $x=${a}$ en cada trozo: el de la izquierda da el límite por la izquierda y el de la derecha, el de la derecha. $f(${a})$ no dice nada.`, `عوّض $x=${a}$ في كل جزء: الجزء الأيسر يعطي النهاية من اليسار والأيمن يعطي النهاية من اليمين. و$f(${a})$ لا تقول شيئًا.`, `Substitute $x=${a}$ in each piece: the left one gives the left limit and the right one, the right limit. $f(${a})$ says nothing.`)}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout latex={[`f(${t(a - lensH(state.k))})=${t(leftValue)}`, `f(${t(a + lensH(state.k))})=${t(rightValue)}`]} note={l(note)} />
        </Predict>
    )
    const ends: Array<[number, number]> = leftLimit === rightLimit ? [[a, leftLimit]] : [[a, leftLimit], [a, rightLimit]]
    const left = setup.left(a - h)
    const right = setup.right(a + h)
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={lensChallenges} extraChallenges={lensExtra} state={state}>
            <Board height={250} label={l(say(`${LENS_NAMES[state.fn]} funtzioa ${a} puntuaren inguruan`, `${LENS_NAMES[state.fn]} alrededor de ${a}`, `${LENS_NAMES[state.fn]} حول ${a}`, `${LENS_NAMES[state.fn]} around ${a}`))}>
                {clip.defs}
                <Grid xMin={xMin} xMax={xMax} yMin={yMin} yMax={yMax} X={X} Y={Y} yStep={yMax - yMin > 7 ? 2 : 1} />
                <line x1={X(a)} x2={X(a)} y1={Y(yMin)} y2={Y(yMax)} stroke={MUTED} strokeWidth={1.4} strokeDasharray="5 4" />
                {shown && (
                    <g>
                        <rect x={X(a - h)} y={Y(yMax)} width={Math.max(0, X(a + h) - X(a - h))} height={200} fill={MUSTARD_TINT} opacity={0.7} />
                        <g clipPath={clip.url}>
                            <path d={curvePath(setup.left, xMin - 1, a - 0.001, X, Y, [yMin, yMax])} fill="none" stroke={STAGE} strokeWidth={3.2} strokeLinejoin="round" />
                            <path d={curvePath(setup.right, a + 0.001, xMax + 1, X, Y, [yMin, yMax])} fill="none" stroke={STAGE} strokeWidth={3.2} strokeLinejoin="round" />
                        </g>
                        {ends.map(([x, y]) => <Open key={`${x}-${y}`} x={X(x)} y={Y(y)} color={STAGE} />)}
                        {setup.at !== null && <Full x={X(a)} y={Y(setup.at)} color={STAGE} />}
                        <line x1={X(xMin)} x2={X(a - h)} y1={Y(left)} y2={Y(left)} stroke={SECOND} strokeWidth={1.3} strokeDasharray="4 3" />
                        <line x1={X(a + h)} x2={X(xMax)} y1={Y(right)} y2={Y(right)} stroke={GREEN} strokeWidth={1.3} strokeDasharray="4 3" />
                        <Probe x={X(a - h)} y={Y(left)} color={SECOND} />
                        <Probe x={X(a + h)} y={Y(right)} color={GREEN} />
                        <text x={340} y={242} textAnchor="end" fontSize={14} fontWeight={700} fill={INK}>{`h = ${num(h, props.language)}`}</text>
                    </g>
                )}
                {!shown && <Hidden x={X(a) + 30} y={Y(yMax) + 40} />}
                <text x={X(a)} y={244} textAnchor="middle" fontSize={14} fontWeight={700} fill={MUTED}>{`a = ${minus(a)}`}</text>
            </Board>
            <PlayButton label={l(say('Hurbildu', 'Acércate', 'اقترب', 'Close in'))} disabled={!shown} playing={playback.playing} onPlay={playback.play} />
        </ToolFrame>
    )
}

/* ---------- L2. The hole of 0/0 ---------- */

/** The factors left after cancelling, for LaTeX */
function simplifiedLatex(state: HoleState): string {
    const m = multiplicity(state)
    const top = [state.r, state.s]
    // Cancel the factors x − d that are in the numerator, as many as the denominator has
    let cancel = Math.min(m, state.power)
    const kept = top.filter((root) => {
        if (root === state.d && cancel > 0) {
            cancel -= 1
            return false
        }
        return true
    })
    const order = state.power - Math.min(m, state.power)
    const numerator = kept.length === 0 ? '1' : kept.length === 1 ? factorLatex(kept[0]) : `(${factorLatex(kept[0])})(${factorLatex(kept[1])})`
    if (order === 0) return numerator
    const denominator = order === 1 ? factorLatex(state.d) : `(${factorLatex(state.d)})^2`
    return `\\frac{${numerator}}{${denominator}}`
}

function factoredLatex(state: HoleState): string {
    const denominator = state.power === 1 ? factorLatex(state.d) : `(${factorLatex(state.d)})^2`
    return `\\frac{(${factorLatex(state.r)})(${factorLatex(state.s)})}{${denominator}}`
}

const infinityLatex = (sign: number) => (sign > 0 ? '+\\infty' : '-\\infty')

export function HoleTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<HoleState>(initialHoleState)
    const shown = state.prediction !== null
    const X = (x: number) => 30 + (x + 5) * 30
    const Y = (y: number) => 16 + (6 - y) * 17
    const clip = useClip(X(-5), Y(6), 300, 204)
    const playback = usePlayback(`${state.r}-${state.s}-${state.d}-${state.power}`, 1500)
    const progress = !shown ? 0 : playback.progress === null ? 1 : playback.progress
    const kind = holeKind(state)
    const limit = holeLimit(state)
    const sides = holeSides(state)
    const offset = 2 - 1.94 * progress
    const probes = [state.d - offset, state.d + offset].map((x) => [x, holeValue(state, x)] as const)
    const controls = (
        <>
            <Stepper label={l(say('Zenbakitzailearen 1. erroa', '1.ª raíz del numerador', 'الجذر الأول للبسط', 'First root of the numerator'))} value={state.r} min={HOLE_LIMITS.root.min} max={HOLE_LIMITS.root.max} format={minus} onChange={(r) => setState((s) => setHole(s, { r }))} language={props.language} />
            <Stepper label={l(say('Zenbakitzailearen 2. erroa', '2.ª raíz del numerador', 'الجذر الثاني للبسط', 'Second root of the numerator'))} value={state.s} min={HOLE_LIMITS.root.min} max={HOLE_LIMITS.root.max} format={minus} onChange={(s) => setState((current) => setHole(current, { s }))} language={props.language} />
            <Stepper label={l(say('Izendatzailearen erroa d', 'Raíz del denominador d', 'جذر المقام d', 'Root of the denominator d'))} value={state.d} min={HOLE_LIMITS.root.min} max={HOLE_LIMITS.root.max} format={minus} onChange={(d) => setState((s) => setHole(s, { d }))} language={props.language} />
            <Segmented<string> label={l(say('Izendatzailea', 'Denominador', 'المقام', 'Denominator'))} value={String(state.power)} options={[{ value: '1', label: ltr('x − d') }, { value: '2', label: ltr('(x − d)²') }]} onChange={(power) => setState((s) => setHole(s, { power: power === '2' ? 2 : 1 }))} />
        </>
    )
    const d = state.d
    const sidesNote = sides
        ? say(` Ezkerretik $${infinityLatex(sides[0])}$ eta eskuinetik $${infinityLatex(sides[1])}$.`, ` Por la izquierda $${infinityLatex(sides[0])}$ y por la derecha $${infinityLatex(sides[1])}$.`, ` من اليسار $${infinityLatex(sides[0])}$ ومن اليمين $${infinityLatex(sides[1])}$.`, ` From the left $${infinityLatex(sides[0])}$ and from the right $${infinityLatex(sides[1])}$.`)
        : say('', '', '', '')
    const note = kind === '<'
        ? say(`$\\frac{k}{0}$ zuzenean: $x=${d}$ asintota bertikala.${sidesNote.eu}`, `$\\frac{k}{0}$ directamente: $x=${d}$ es una asíntota vertical.${sidesNote.es}`, `$\\frac{k}{0}$ مباشرة: $x=${d}$ مقارب رأسي.${sidesNote.ar}`, `$\\frac{k}{0}$ straight away: $x=${d}$ is a vertical asymptote.${sidesNote.en}`)
        : kind === '='
            ? say(`$\\frac{0}{0}$: faktorea sinplifikatu, eta zuloa geratzen da $(${d},${limit})$ puntuan.`, `$\\frac{0}{0}$: se simplifica el factor y queda un agujero en $(${d},${limit})$.`, `$\\frac{0}{0}$: نختصر العامل فيبقى ثقب عند $(${d},${limit})$.`, `$\\frac{0}{0}$: the factor cancels and a hole is left at $(${d},${limit})$.`)
            : say(`$\\frac{0}{0}$, baina sinplifikatu ondoren $\\frac{k}{0}$: $x=${d}$ asintota bertikala.${sidesNote.eu}`, `$\\frac{0}{0}$, pero al simplificar sale $\\frac{k}{0}$: $x=${d}$ es una asíntota vertical.${sidesNote.es}`, `$\\frac{0}{0}$، لكن بعد الاختزال يظهر $\\frac{k}{0}$: $x=${d}$ مقارب رأسي.${sidesNote.ar}`, `$\\frac{0}{0}$, but after simplifying you get $\\frac{k}{0}$: $x=${d}$ is a vertical asymptote.${sidesNote.en}`)
    const lines = [holeLatex(state), substituteLatex(state)]
    if (kind !== '<') lines.push(`${factoredLatex(state)}=${simplifiedLatex(state)}`)
    const readout = (
        <Predict
            language={props.language}
            question={say(`Ikusi aurretik: $${holeLatex(state)}$ funtzioan, zer gertatzen da $x=${d}$ puntuan?`, `Antes de verlo: en $${holeLatex(state)}$, ¿qué pasa en $x=${d}$?`, `قبل أن ترى: في $${holeLatex(state)}$، ماذا يحدث عند $x=${d}$؟`, `Before you see it: in $${holeLatex(state)}$, what happens at $x=${d}$?`)}
            labels={{ '<': say('k/0: asintota', 'k/0: asíntota', 'k/0: مقارب', 'k/0: asymptote'), '=': say('0/0: zuloa', '0/0: agujero', '0/0: ثقب', '0/0: hole'), '>': say('0/0, baina asintota', '0/0, pero asíntota', '0/0 لكن مقارب', '0/0, but an asymptote') }}
            actual={holePrediction(state)}
            choice={state.prediction}
            tip={say(`Ordezkatu $x=${d}$ goian: 0 bada, $x-${d}$ faktorea dago eta sinplifikatu daiteke. Gero begiratu behean $x-${d}$ faktorerik geratzen den.`, `Sustituye $x=${d}$ arriba: si sale 0, el factor $x-${d}$ está y se puede simplificar. Después mira si abajo queda algún $x-${d}$.`, `عوّض $x=${d}$ في البسط: إذا ظهر 0 فالعامل $x-${d}$ موجود ويمكن اختزاله. ثم انظر هل يبقى $x-${d}$ في المقام.`, `Substitute $x=${d}$ on top: if you get 0, the factor $x-${d}$ is there and can be cancelled. Then see whether some $x-${d}$ is left below.`)}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout latex={lines} note={l(note)} />
        </Predict>
    )
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={holeChallenges} extraChallenges={holeExtra} state={state}>
            <Board height={244} label={l(say(`${holeLatex(state)} funtzioaren grafikoa`, `La gráfica de ${holeLatex(state)}`, `رسم ${holeLatex(state)}`, `The graph of ${holeLatex(state)}`))}>
                {clip.defs}
                <Grid xMin={-5} xMax={5} yMin={-6} yMax={6} X={X} Y={Y} yStep={2} />
                <line x1={X(d)} x2={X(d)} y1={Y(0) - 7} y2={Y(0) + 7} stroke={SECOND} strokeWidth={3} />
                {shown && (
                    <g>
                        {kind !== '=' && <line x1={X(d)} x2={X(d)} y1={Y(-6)} y2={Y(6)} stroke={MUTED} strokeWidth={2} strokeDasharray="7 5" />}
                        <g clipPath={clip.url}>
                            <path d={curvePath((x) => holeValue(state, x), -5, d - 0.01, X, Y, [-6, 6], 0.01)} fill="none" stroke={STAGE} strokeWidth={3.2} strokeLinejoin="round" />
                            <path d={curvePath((x) => holeValue(state, x), d + 0.01, 5, X, Y, [-6, 6], 0.01)} fill="none" stroke={STAGE} strokeWidth={3.2} strokeLinejoin="round" />
                        </g>
                        {limit !== null && Math.abs(limit) <= 6 && <Open x={X(d)} y={Y(limit)} color={STAGE} />}
                        {probes.map(([x, y], index) => y !== null && Math.abs(y) <= 6 && <Probe key={index} x={X(x)} y={Y(y)} color={index === 0 ? SECOND : GREEN} />)}
                    </g>
                )}
                {!shown && <Hidden x={X(d) + 26} y={Y(4)} />}
                <text x={X(d)} y={240} textAnchor="middle" fontSize={14} fontWeight={700} fill={SECOND}>{`d = ${minus(d)}`}</text>
            </Board>
            <PlayButton label={l(say('Hurbildu d puntura', 'Acércate a d', 'اقترب من d', 'Close in on d'))} disabled={!shown} playing={playback.playing} onPlay={playback.play} />
        </ToolFrame>
    )
}

/* ---------- L3. The highest degree wins ---------- */

const SUPERSCRIPT: Record<string, string> = { '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹', '-': '⁻' }

/** About how big a number is, for the board: 3·10⁸, 250, 0,04 */
function sizeText(value: number, language: UnitLanguage): string {
    const size = Math.abs(value)
    if (size < 10_000) return num(size, language, 2)
    const exponent = Math.floor(Math.log10(size))
    const mantissa = Math.round(size / 10 ** exponent)
    return `${mantissa === 10 ? '1' : mantissa}·10${String(mantissa === 10 ? exponent + 1 : exponent).split('').map((digit) => SUPERSCRIPT[digit]).join('')}`
}

/** A value for LaTeX: 4 decimals at most, or a power of ten when it is very big or very small */
function valueLatex(value: number, language: UnitLanguage): string {
    const size = Math.abs(value)
    if (size !== 0 && (size >= 10_000 || size < 0.001)) {
        const exponent = Math.floor(Math.log10(size))
        const mantissa = value / 10 ** exponent
        return `${texDec(mantissa, language, 2)}\\cdot 10^{${exponent}}`
    }
    return texDec(value, language, 4)
}

const leadText = (coefficient: number, degree: number) => `${coefficient === 1 ? '' : coefficient === -1 ? '−' : minus(coefficient)}x${degree === 1 ? '' : SUPERSCRIPT[String(degree)]}`

export function DegreesTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<DegreesState>(initialDegreesState)
    const shown = state.prediction !== null
    const playback = usePlayback(`${state.m}-${state.n}-${state.a}-${state.b}-${state.k}`, 1800)
    const progress = !shown ? 0 : playback.progress === null ? 1 : playback.progress
    const x = 10 ** (1 + (state.k - 1) * progress)
    const top = numeratorValue(state, x)
    const bottom = denominatorValue(state, x)
    const value = top / bottom
    const bar = (size: number) => (190 * Math.log10(1 + Math.abs(size))) / 13
    const xs = (k: number) => groupDigits(10 ** k, props.language)
    const L = degreesLimit(state)
    const line = (y: number) => 30 + (Math.max(-6.4, Math.min(6.4, y)) + 6) * 25
    const controls = (
        <>
            <Stepper label={l(say('Goiko maila m', 'Grado de arriba m', 'درجة البسط m', 'Degree on top m'))} value={state.m} min={DEGREES_LIMITS.degree.min} max={DEGREES_LIMITS.degree.max} onChange={(m) => setState((s) => setDegrees(s, { m }))} language={props.language} />
            <Stepper label={l(say('Goiko koefizientea a', 'Coeficiente de arriba a', 'معامل البسط a', 'Coefficient on top a'))} value={state.a} min={DEGREES_LIMITS.coefficient.min} max={DEGREES_LIMITS.coefficient.max} format={minus} onChange={(a) => setState((s) => setDegrees(s, { a }))} language={props.language} />
            <Stepper label={l(say('Beheko maila n', 'Grado de abajo n', 'درجة المقام n', 'Degree below n'))} value={state.n} min={DEGREES_LIMITS.degree.min} max={DEGREES_LIMITS.degree.max} onChange={(n) => setState((s) => setDegrees(s, { n }))} language={props.language} />
            <Stepper label={l(say('Beheko koefizientea b', 'Coeficiente de abajo b', 'معامل المقام b', 'Coefficient below b'))} value={state.b} min={DEGREES_LIMITS.coefficient.min} max={DEGREES_LIMITS.coefficient.max} format={minus} onChange={(b) => setState((s) => setDegrees(s, { b }))} language={props.language} />
            <Stepper label={l(say('x balioa', 'Valor de x', 'قيمة x', 'Value of x'))} value={state.k} min={DEGREES_LIMITS.k.min} max={DEGREES_LIMITS.k.max} format={xs} onChange={(k) => setState((s) => setDegrees(s, { k }))} language={props.language} />
        </>
    )
    const limitLatex = Number.isFinite(L) ? (L === 0 ? '0' : ratioLatex(state.a, state.b)) : infinityLatex(L)
    const winner = state.m > state.n
        ? say('Goikoak irabazten du: zatidura infinitura doa.', 'Gana el de arriba: el cociente va a infinito.', 'يفوز البسط: يتجه خارج القسمة إلى اللانهاية.', 'The top wins: the quotient goes to infinity.')
        : state.m < state.n
            ? say('Behekoak irabazten du: zatidura 0 baliora doa.', 'Gana el de abajo: el cociente va a 0.', 'يفوز المقام: يتجه خارج القسمة إلى 0.', 'The bottom wins: the quotient goes to 0.')
            : say('Berdinketa: koefiziente nagusien zatidura geratzen da.', 'Empate: queda el cociente de los coeficientes principales.', 'تعادل: يبقى خارج قسمة المعاملين الرئيسيين.', 'A draw: the quotient of the leading coefficients is left.')
    const readout = (
        <Predict
            language={props.language}
            question={say(`Ikusi aurretik: $${degreesLatex(state)}$ funtzioan, $x$ oso handia denean, nora doa?`, `Antes de verlo: en $${degreesLatex(state)}$, cuando $x$ es muy grande, ¿adónde va?`, `قبل أن ترى: في $${degreesLatex(state)}$، إلى أين تتجه عندما يكون $x$ كبيرًا جدًّا؟`, `Before you see it: in $${degreesLatex(state)}$, where does it go when $x$ is very large?`)}
            labels={{ '<': say('0 baliora', 'A 0', 'إلى 0', 'To 0'), '=': say('Koefizienteen zatidurara', 'Al cociente de coeficientes', 'إلى خارج قسمة المعاملين', 'To the quotient of coefficients'), '>': say('Infinitura', 'A infinito', 'إلى اللانهاية', 'To infinity') }}
            actual={degreesPrediction(state)}
            choice={state.prediction}
            tip={say('Konparatu goiko eta beheko mailak: gai nagusiak bakarrik du garrantzia, eta beste gaiak ahaztu egiten dira $x$ handitzean.', 'Compara los grados de arriba y de abajo: solo importa el término principal, y los demás se olvidan al crecer $x$.', 'قارن درجتي البسط والمقام: لا يهم إلا الحد الرئيسي، وتُهمل بقية الحدود عندما يكبر $x$.', 'Compare the degrees on top and below: only the leading term matters, and the others are forgotten as $x$ grows.')}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout latex={[`f(${groupLatex(10 ** state.k)})\\approx ${valueLatex(degreesValue(state, 10 ** state.k), props.language)}`, `\\lim_{x\\to+\\infty}f(x)=${limitLatex}`]} note={l(winner)} />
        </Predict>
    )
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={degreesChallenges} extraChallenges={degreesExtra} state={state}>
            <Board height={250} label={l(say('Goiko eta beheko gaien lasterketa', 'La carrera de los términos de arriba y de abajo', 'سباق حدّي البسط والمقام', 'The race of the terms on top and below'))}>
                <text x={180} y={24} textAnchor="middle" fontSize={16} fontWeight={700} fill={INK}>{`x = ${groupDigits(Math.round(x), props.language)}`}</text>
                <text x={16} y={70} fontSize={15} fontWeight={700} fill={STAGE}>{leadText(state.a, state.m)}</text>
                <text x={16} y={118} fontSize={15} fontWeight={700} fill={SECOND}>{leadText(state.b, state.n)}</text>
                <rect x={80} y={52} width={190} height={24} rx={5} fill="#efe9dd" />
                <rect x={80} y={100} width={190} height={24} rx={5} fill="#efe9dd" />
                {shown ? (
                    <g>
                        <rect x={80} y={52} width={bar(top)} height={24} rx={5} fill={STAGE} />
                        <rect x={80} y={100} width={bar(bottom)} height={24} rx={5} fill={SECOND} />
                        <text x={350} y={70} textAnchor="end" fontSize={13} fill={INK}>{sizeText(top, props.language)}</text>
                        <text x={350} y={118} textAnchor="end" fontSize={13} fill={INK}>{sizeText(bottom, props.language)}</text>
                    </g>
                ) : <Hidden x={175} y={98} />}
                <line x1={30} x2={330} y1={190} y2={190} stroke={INK} strokeWidth={1.4} />
                {Array.from({ length: 13 }, (_, i) => i - 6).map((tick) => (
                    <g key={tick}>
                        <line x1={line(tick)} x2={line(tick)} y1={185} y2={195} stroke={INK} strokeWidth={1} />
                        {tick % 2 === 0 && <text x={line(tick)} y={210} textAnchor="middle" fontSize={12} fill={MUTED}>{minus(tick)}</text>}
                    </g>
                ))}
                {shown && Number.isFinite(L) && Math.abs(L) <= 6 && <line x1={line(L)} x2={line(L)} y1={160} y2={198} stroke={GREEN} strokeWidth={2} strokeDasharray="5 4" />}
                {shown && (
                    <g>
                        <circle cx={line(value)} cy={190} r={8} fill={STAGE} stroke={PAPER} strokeWidth={1.6} />
                        {Math.abs(value) > 6 && <text x={value > 0 ? 344 : 16} y={182} textAnchor="middle" fontSize={16} fontWeight={700} fill={STAGE}>{value > 0 ? '→' : '←'}</text>}
                        <text x={180} y={238} textAnchor="middle" fontSize={15} fontWeight={700} fill={STAGE}>{`f(x) ≈ ${Math.abs(value) >= 10_000 ? `${value < 0 ? '−' : ''}${sizeText(value, props.language)}` : num(value, props.language, 4)}`}</text>
                    </g>
                )}
            </Board>
            <PlayButton label={l(say('Handitu x', 'Haz crecer x', 'كبّر x', 'Make x grow'))} disabled={!shown} playing={playback.playing} onPlay={playback.play} />
        </ToolFrame>
    )
}

/* ---------- L5. Bolzano traps the root ---------- */

const BOLZANO_NAMES: Record<BolzanoFunction, string> = { cubic: 'x³ − 3x + 1', square: 'x² − 2', cubic2: 'x³ + x − 3', odd: 'x³ − x', jump: '1/(x − 1)' }

/** f(p) for LaTeX: a whole number, or a fraction for 1/(x − 1) */
function endLatex(fn: BolzanoFunction, x: number): string | null {
    const value = bolzanoValue(fn, x)
    if (value === null) return null
    if (fn !== 'jump' || Number.isInteger(value)) return String(value)
    const bottom = x - 1
    return `${bottom < 0 ? '-' : ''}\\frac{1}{${Math.abs(bottom)}}`
}

export function BolzanoTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<BolzanoState>(initialBolzanoState)
    const shown = state.prediction !== null
    const X = (x: number) => 28 + (x + 4) * 38
    const Y = (y: number) => 16 + (6 - y) * 16
    const clip = useClip(X(-4), Y(6), 304, 192)
    const intervals = bolzanoIntervals(state)
    const playback = usePlayback(`${state.fn}-${state.p}-${state.q}-${state.halvings}`, 600 * Math.max(1, intervals.length - 1))
    const progress = !shown ? 0 : playback.progress === null ? 1 : playback.progress
    const visible = intervals.slice(0, 1 + Math.floor(progress * (intervals.length - 1) + 1e-9))
    const kind = bolzanoKind(state)
    const color = (value: number | null) => (value === null ? MUTED : value > 0 ? GREEN : value < 0 ? SECOND : MUSTARD)
    const t = (value: number) => texDec(value, props.language, 3)
    const controls = (
        <>
            <Segmented<BolzanoFunction> label={l(say('Funtzioa', 'Función', 'الدالة', 'Function'))} value={state.fn} options={BOLZANO_FUNCTIONS.map((fn) => ({ value: fn, label: ltr(BOLZANO_NAMES[fn]) }))} onChange={(fn) => setState((s) => setBolzano(s, { fn }))} />
            <Stepper label={l(say('Ezkerreko muturra p', 'Extremo izquierdo p', 'الطرف الأيسر p', 'Left end p'))} value={state.p} min={BOLZANO_LIMITS.p.min} max={BOLZANO_LIMITS.p.max} format={minus} onChange={(p) => setState((s) => setBolzano(s, { p }))} language={props.language} />
            <Stepper label={l(say('Eskuineko muturra q', 'Extremo derecho q', 'الطرف الأيمن q', 'Right end q'))} value={state.q} min={BOLZANO_LIMITS.q.min} max={BOLZANO_LIMITS.q.max} format={minus} onChange={(q) => setState((s) => setBolzano(s, { q }))} language={props.language} />
            <Stepper label={l(say('Erdibitzeak', 'Mitades', 'التنصيفات', 'Halvings'))} value={state.halvings} min={BOLZANO_LIMITS.halvings.min} max={BOLZANO_LIMITS.halvings.max} onChange={(halvings) => setState((s) => setBolzano(s, { halvings }))} language={props.language} />
        </>
    )
    const fp = endLatex(state.fn, state.p)
    const fq = endLatex(state.fn, state.q)
    const value = (x: number, latex: string | null) => (latex === null ? say(`$f(${x})$ ez dago`, `$f(${x})$ no existe`, `$f(${x})$ غير موجودة`, `$f(${x})$ does not exist`) : say(`$f(${x})=${latex}$`, `$f(${x})=${latex}$`, `$f(${x})=${latex}$`, `$f(${x})=${latex}$`))
    const values = say(`${value(state.p, fp).eu} eta ${value(state.q, fq).eu}.`, `${value(state.p, fp).es} y ${value(state.q, fq).es}.`, `${value(state.p, fp).ar} و${value(state.q, fq).ar}.`, `${value(state.p, fp).en} and ${value(state.q, fq).en}.`)
    const [lo, hi] = intervals[intervals.length - 1]
    const verdict = !isContinuous(state)
        ? say('Ez da jarraitua $x=1$ puntuan: zeinua alda daiteke errorik gabe, eta Bolzano ezin da aplikatu.', 'No es continua en $x=1$: el signo puede cambiar sin raíz, y Bolzano no se puede aplicar.', 'ليست متصلة عند $x=1$: قد تتغير الإشارة دون جذر، ولا يمكن تطبيق بولتسانو.', 'It is not continuous at $x=1$: the sign can change with no root, and Bolzano cannot be applied.')
        : kind === '='
            ? say('Mutur bat dagoeneko erroa da.', 'Un extremo ya es una raíz.', 'أحد الطرفين جذر بالفعل.', 'One end is already a root.')
            : kind === '>'
                ? say('Zeinu bera muturretan: Bolzanok ez du ezer ziurtatzen.', 'El mismo signo en los extremos: Bolzano no asegura nada.', 'الإشارة نفسها في الطرفين: بولتسانو لا يضمن شيئًا.', 'The same sign at both ends: Bolzano guarantees nothing.')
                : lo === hi
                    ? say(`Erdiko puntua erroa da: $x=${t(lo)}$.`, `El punto medio es una raíz: $x=${t(lo)}$.`, `نقطة المنتصف جذر: $x=${t(lo)}$.`, `The midpoint is a root: $x=${t(lo)}$.`)
                    : say(`Jarraitua eta zeinu-aldaketa: erro bat dago $(${t(lo)};${t(hi)})$ tartean.`, `Continua y con cambio de signo: hay una raíz en $(${t(lo)};${t(hi)})$.`, `متصلة مع تغيّر في الإشارة: يوجد جذر في $(${t(lo)},${t(hi)})$.`, `Continuous with a change of sign: there is a root in $(${t(lo)},${t(hi)})$.`)
    const readout = (
        <Predict
            language={props.language}
            question={say(`Ikusi aurretik: $${BOLZANO_LATEX[state.fn]}$ funtzioan, zer ziurtatzen du Bolzanok $[${state.p},${state.q}]$ tartean?`, `Antes de verlo: en $${BOLZANO_LATEX[state.fn]}$, ¿qué asegura Bolzano en $[${state.p},${state.q}]$?`, `قبل أن ترى: في $${BOLZANO_LATEX[state.fn]}$، ماذا يضمن بولتسانو في $[${state.p},${state.q}]$؟`, `Before you see it: in $${BOLZANO_LATEX[state.fn]}$, what does Bolzano guarantee on $[${state.p},${state.q}]$?`)}
            labels={{ '<': say('Erro bat barruan', 'Una raíz dentro', 'جذرًا في الداخل', 'A root inside'), '=': say('Mutur bat erroa da', 'Un extremo es raíz', 'أحد الطرفين جذر', 'One end is a root'), '>': say('Ez du ezer ziurtatzen', 'No asegura nada', 'لا يضمن شيئًا', 'Nothing') }}
            actual={bolzanoPrediction(state)}
            choice={state.prediction}
            tip={say('Kalkulatu $f(p)$ eta $f(q)$. Zeinuak desberdinak badira eta funtzioa tarte osoan jarraitua bada, barruan erro bat dago.', 'Calcula $f(p)$ y $f(q)$. Si los signos son distintos y la función es continua en todo el intervalo, hay una raíz dentro.', 'احسب $f(p)$ و$f(q)$. إذا اختلفت الإشارتان وكانت الدالة متصلة على المجال كله فهناك جذر في الداخل.', 'Work out $f(p)$ and $f(q)$. If the signs are different and the function is continuous on the whole interval, there is a root inside.')}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout latex={[BOLZANO_LATEX[state.fn]]} note={l(say(`${values.eu} ${verdict.eu}`, `${values.es} ${verdict.es}`, `${values.ar} ${verdict.ar}`, `${values.en} ${verdict.en}`))} />
        </Predict>
    )
    const ends = [state.p, state.q].map((x) => [x, bolzanoValue(state.fn, x)] as const)
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={bolzanoChallenges} extraChallenges={bolzanoExtra} state={state}>
            <Board height={268} label={l(say(`${BOLZANO_NAMES[state.fn]} eta [${state.p}, ${state.q}] tartea`, `${BOLZANO_NAMES[state.fn]} y el intervalo [${state.p}, ${state.q}]`, `${BOLZANO_NAMES[state.fn]} والمجال [${state.p}, ${state.q}]`, `${BOLZANO_NAMES[state.fn]} and the interval [${state.p}, ${state.q}]`))}>
                {clip.defs}
                <Grid xMin={-4} xMax={4} yMin={-6} yMax={6} X={X} Y={Y} yStep={2} />
                <rect x={X(state.p)} y={Y(0) - 4} width={X(state.q) - X(state.p)} height={8} rx={3} fill={MUSTARD} opacity={0.55} />
                {shown && (
                    <g>
                        <g clipPath={clip.url}>
                            <path d={curvePath((x) => bolzanoValue(state.fn, x), -4.5, 4.5, X, Y, [-6, 6], 0.01)} fill="none" stroke={STAGE} strokeWidth={3} strokeLinejoin="round" />
                        </g>
                        {state.fn === 'jump' && <line x1={X(1)} x2={X(1)} y1={Y(-6)} y2={Y(6)} stroke={MUTED} strokeWidth={1.6} strokeDasharray="6 5" />}
                        {ends.map(([x, y]) => y !== null && (
                            <g key={x}>
                                <line x1={X(x)} x2={X(x)} y1={Y(0)} y2={Y(Math.max(-6, Math.min(6, y)))} stroke={color(y)} strokeWidth={2} strokeDasharray="4 3" />
                                {Math.abs(y) <= 6 && <Full x={X(x)} y={Y(y)} color={color(y)} />}
                            </g>
                        ))}
                        {visible.map(([a, b], index) => (
                            <g key={index}>
                                <line x1={X(a)} x2={X(b)} y1={226 + index * 10} y2={226 + index * 10} stroke={index === visible.length - 1 ? MUSTARD : MUTED} strokeWidth={index === visible.length - 1 ? 6 : 3} strokeLinecap="round" />
                            </g>
                        ))}
                    </g>
                )}
                {!shown && <Hidden x={X((state.p + state.q) / 2)} y={Y(3)} />}
                <text x={X(state.p)} y={Y(0) + 30} textAnchor="middle" fontSize={13} fontWeight={700} fill={INK}>p</text>
                <text x={X(state.q)} y={Y(0) + 30} textAnchor="middle" fontSize={13} fontWeight={700} fill={INK}>q</text>
            </Board>
            <PlayButton label={l(say('Erdibitu', 'Divide por la mitad', 'نصِّف', 'Halve'))} disabled={!shown || kind !== '<' || state.halvings === 0} playing={playback.playing} onPlay={playback.play} />
        </ToolFrame>
    )
}
