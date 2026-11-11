import { useId, useState } from 'react'
import { Segmented, Stepper, ToolFrame } from '../../../features/unit-v2/lab/LabKit'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import { useLabText } from '../../../features/unit-v2/lab/useLabText'
import type { LocalizedText, UnitLanguage } from '../../../features/unit-v2/types'
import { groupDigits, groupLatex } from '../../../utils/numberFormat'
import { say } from '../../batx1-zientziak-funtzioak/text'
import { Board, Hidden, PlayButton, Predict, Readout } from '../../dbh3-segidak/lab/LabParts'
import { dec, GREEN, INK, MUSTARD, MUSTARD_TINT, MUTED, PAPER, SECOND, STAGE, texDec } from '../../dbh3-segidak/lab/labStyle'
import { setPrediction } from '../../dbh3-segidak/lab/prediction'
import { usePlayback } from '../../dbh4-aplikatuak-proportzionaltasuna/lab/usePlayback'
import { DELTAS, deltaOf, deltaWorks, EPSILON_FUNCTIONS, EPSILON_LIMITS, EPSILON_SETUP, epsilonChallenges, epsilonExtra, epsilonOf, epsilonPrediction, EPSILONS, initialEpsilonState, setEpsilon, worstDistance, type EpsilonFunction, type EpsilonState } from './epsilon'
import { digits, GROWTH_LATEX, GROWTH_TEXT, GROWTHS, initialRaceState, quotientDigits, RACE_LIMITS, raceChallenges, raceExtra, racePrediction, setRace, type Growth, type RaceState } from './infinities'
import { initialJointsState, JOINTS_LIMITS, JOINTS_SETUP, JOINTS_SETUPS, jointClosed, jointsChallenges, jointsExtra, jointsLatex, jointsPrediction, jointValues, setJoints, type JointsSetup, type JointsState } from './joints'
import { continuousOn, extremes, initialTheoremState, rootsIn, setTheorem, THEOREM_FUNCTIONS, THEOREM_LAYERS, THEOREM_LIMITS, THEOREM_SETUP, theoremChallenges, theoremExtra, theoremPrediction, theoremValue, type TheoremFunction, type TheoremLayer, type TheoremState } from './theorems'

/* ==========================================================================
   Limiteak eta jarraitutasuna · Batxilergoa 2 · Zientziak — the four tools
   of this unit: epsilon and delta, the race of infinities, adjust a and
   b, and the right theorem. Each asks for a prediction before it shows
   the drawing; epsilon and delta, the race and the intermediate values
   move with ▶. The boards carry numbers and formulas only (the svg is
   left to right); the words go in the readout. Logic in epsilon.ts,
   infinities.ts, joints.ts and theorems.ts. curvePath, Grid and useClip
   are copies of those of Limiteak 1.º, which does not export them.
   ========================================================================== */

const VIOLET = '#7a4fc9'
const VIOLET_TINT = '#e4dbf5'

const minus = (value: number) => (value < 0 ? `−${-value}` : String(value))
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
function Grid({ xMin, xMax, yMin, yMax, X, Y, xStep = 1, yStep = 1, gridStep = 1 }: { xMin: number; xMax: number; yMin: number; yMax: number; X: (x: number) => number; Y: (y: number) => number; xStep?: number; yStep?: number; gridStep?: number }) {
    const xs = Array.from({ length: xMax - xMin + 1 }, (_, i) => xMin + i)
    const ys = Array.from({ length: Math.floor((yMax - yMin) / gridStep) + 1 }, (_, i) => yMin + i * gridStep)
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

/* ---------- L1. Epsilon and delta ---------- */

const EPSILON_NAMES: Record<EpsilonFunction, string> = { steep: 'f₁', gentle: 'f₂', hole: 'f₃', square: 'f₄' }

export function EpsilonTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<EpsilonState>(initialEpsilonState)
    const shown = state.prediction !== null
    const setup = EPSILON_SETUP[state.fn]
    const view = setup.view
    const { X, Y } = frame(view)
    const clip = useClip(X(view.xMin), Y(view.yMax), 300, 200)
    const playback = usePlayback(`${state.fn}-${state.e}-${state.d}`, 1400)
    const progress = !shown ? 0 : playback.progress === null ? 1 : playback.progress
    const epsilon = epsilonOf(state)
    const delta = deltaOf(state) * progress
    const works = deltaWorks(state)
    const { a, limit } = setup
    const t = (value: number) => texDec(value, props.language, 3)
    const controls = (
        <>
            <Segmented<EpsilonFunction> label={l(say('Funtzioa', 'Función', 'الدالة', 'Function'))} value={state.fn} options={EPSILON_FUNCTIONS.map((fn) => ({ value: fn, label: EPSILON_NAMES[fn] }))} onChange={(fn) => setState((s) => setEpsilon(s, { fn }))} />
            <Stepper label={l(say('ε banda', 'Banda ε', 'الشريط ε', 'Band ε'))} value={EPSILON_LIMITS.e.max - state.e} min={0} max={EPSILON_LIMITS.e.max} format={(value) => num(EPSILONS[EPSILON_LIMITS.e.max - value], props.language)} onChange={(value) => setState((s) => setEpsilon(s, { e: EPSILON_LIMITS.e.max - value }))} language={props.language} />
            <Stepper label={l(say('δ zerrenda', 'Franja δ', 'الشريحة δ', 'Strip δ'))} value={EPSILON_LIMITS.d.max - state.d} min={0} max={EPSILON_LIMITS.d.max} format={(value) => num(DELTAS[EPSILON_LIMITS.d.max - value], props.language)} onChange={(value) => setState((s) => setEpsilon(s, { d: EPSILON_LIMITS.d.max - value }))} language={props.language} />
        </>
    )
    const worst = worstDistance(state)
    const verdict = works
        ? say(`Zerrendan, $f(x)$ funtzioa $${t(worst)}$ baino gutxiagora geratzen da ${limit} baliotik: $\\delta$ honek balio du.`, `En la franja, $f(x)$ queda a menos de $${t(worst)}$ de ${limit}: este $\\delta$ sirve.`, `في الشريحة تبقى $f(x)$ على بعد أقل من $${t(worst)}$ من ${limit}: هذه $\\delta$ تصلح.`, `Over the strip, $f(x)$ stays less than $${t(worst)}$ away from ${limit}: this $\\delta$ works.`)
        : say(`Zerrendan, $f(x)$ funtzioa $${t(worst)}$ arte urruntzen da ${limit} baliotik: bandatik ateratzen da, estutu $\\delta$.`, `En la franja, $f(x)$ se aleja de ${limit} hasta $${t(worst)}$: se sale de la banda, estrecha $\\delta$.`, `في الشريحة تبتعد $f(x)$ عن ${limit} حتى $${t(worst)}$: تخرج من الشريط، فضيّق $\\delta$.`, `Over the strip, $f(x)$ gets up to $${t(worst)}$ away from ${limit}: it leaves the band, narrow $\\delta$.`)
    const readout = (
        <Predict
            language={props.language}
            question={say(`Ikusi aurretik: $${setup.latex}$ funtzioan, balio duen $\\delta$ handiena $\\varepsilon$ baino txikiagoa, berdina ala handiagoa da?`, `Antes de verlo: en $${setup.latex}$, el mayor $\\delta$ que sirve, ¿es menor, igual o mayor que $\\varepsilon$?`, `قبل أن ترى: في $${setup.latex}$، هل أكبر $\\delta$ تصلح أصغر من $\\varepsilon$ أم تساويها أم أكبر منها؟`, `Before you see it: in $${setup.latex}$, is the largest $\\delta$ that works smaller than, equal to or larger than $\\varepsilon$?`)}
            labels={{ '<': say('ε baino txikiagoa', 'Menor que ε', 'أصغر من ε', 'Smaller than ε'), '=': say('ε bezalakoa', 'Igual que ε', 'تساوي ε', 'Equal to ε'), '>': say('ε baino handiagoa', 'Mayor que ε', 'أكبر من ε', 'Larger than ε') }}
            actual={epsilonPrediction(state)}
            choice={state.prediction}
            tip={say(`Begiratu malda $x=${a}$ inguruan: $\\delta$ zenbakia $\\varepsilon$ zati malda da gutxi gorabehera. Malda 1 baino handiagoa bada, $\\delta$ txikiagoa.`, `Mira la pendiente cerca de $x=${a}$: $\\delta$ es más o menos $\\varepsilon$ entre la pendiente. Si la pendiente pasa de 1, $\\delta$ es menor.`, `انظر إلى الميل قرب $x=${a}$: تساوي $\\delta$ تقريبًا $\\varepsilon$ مقسومة على الميل. وإذا تجاوز الميل 1 كانت $\\delta$ أصغر.`, `Look at the slope near $x=${a}$: $\\delta$ is roughly $\\varepsilon$ divided by the slope. If the slope is above 1, $\\delta$ is smaller.`)}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout latex={[`\\varepsilon=${t(epsilon)}\\qquad\\delta=${t(deltaOf(state))}`]} note={l(verdict)} />
        </Predict>
    )
    const color = works ? GREEN : SECOND
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={epsilonChallenges} extraChallenges={epsilonExtra} state={state}>
            <Board height={250} label={l(say(`${EPSILON_NAMES[state.fn]}: ε banda eta δ zerrenda`, `${EPSILON_NAMES[state.fn]}: banda ε y franja δ`, `${EPSILON_NAMES[state.fn]}: الشريط ε والشريحة δ`, `${EPSILON_NAMES[state.fn]}: band ε and strip δ`))}>
                {clip.defs}
                <Grid {...view} X={X} Y={Y} />
                <g clipPath={clip.url}>
                    <rect x={X(view.xMin)} y={Y(limit + epsilon)} width={300} height={Math.max(0, Y(limit - epsilon) - Y(limit + epsilon))} fill={MUSTARD_TINT} opacity={0.8} />
                    <line x1={X(view.xMin)} x2={X(view.xMax)} y1={Y(limit + epsilon)} y2={Y(limit + epsilon)} stroke={MUSTARD} strokeWidth={1.4} strokeDasharray="5 4" />
                    <line x1={X(view.xMin)} x2={X(view.xMax)} y1={Y(limit - epsilon)} y2={Y(limit - epsilon)} stroke={MUSTARD} strokeWidth={1.4} strokeDasharray="5 4" />
                    {shown && <rect x={X(a - delta)} y={Y(view.yMax)} width={Math.max(0, X(a + delta) - X(a - delta))} height={200} fill={VIOLET_TINT} opacity={0.75} />}
                    {shown && <path d={curvePath(setup.f, view.xMin - 1, view.xMax + 1, X, Y, [view.yMin, view.yMax])} fill="none" stroke={STAGE} strokeWidth={2.6} strokeLinejoin="round" opacity={0.55} />}
                    {shown && delta > 0 && <path d={curvePath(setup.f, a - delta, a + delta, X, Y, [view.yMin, view.yMax], delta / 60)} fill="none" stroke={color} strokeWidth={4.2} strokeLinecap="round" />}
                </g>
                {shown && (setup.hole ? <Open x={X(a)} y={Y(limit)} color={INK} /> : <Full x={X(a)} y={Y(limit)} color={INK} />)}
                {!shown && <Hidden x={X(a) + 40} y={Y(limit) - 30} />}
                <text x={346} y={Y(limit + epsilon) - 4} textAnchor="end" fontSize={14} fontWeight={700} fill={MUSTARD}>ε</text>
                {shown && <text x={X(a)} y={244} textAnchor="middle" fontSize={14} fontWeight={700} fill={VIOLET}>δ</text>}
            </Board>
            <PlayButton label={l(say('Ireki zerrenda', 'Abre la franja', 'افتح الشريحة', 'Open the strip'))} disabled={!shown} playing={playback.playing} onPlay={playback.play} />
        </ToolFrame>
    )
}

/* ---------- L2. The race of infinities ---------- */

/** A power of ten for the board: 10 and the exponent raised (the svg is left to right) */
function TenTo({ x, y, power, color, anchor = 'start' }: { x: number; y: number; power: string; color: string; anchor?: 'start' | 'end' }) {
    return (
        <text x={x} y={y} textAnchor={anchor} fontSize={14} fontWeight={700} fill={color}>
            {'≈ 10'}
            <tspan dy={-6} fontSize={11}>{power}</tspan>
        </text>
    )
}

export function InfinityRaceTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<RaceState>(initialRaceState)
    const shown = state.prediction !== null
    const playback = usePlayback(`${state.top}-${state.bottom}-${state.coef}-${state.k}`, 1800)
    const progress = !shown ? 0 : playback.progress === null ? 1 : playback.progress
    // ▶ lets x grow from 10 up to the chosen 10^k
    const k = 1 + (state.k - 1) * progress
    const topDigits = Math.log10(state.coef) + digits(state.top, k)
    const bottomDigits = digits(state.bottom, k)
    const longest = Math.max(1, topDigits, bottomDigits)
    const bar = (value: number) => Math.max(4, (Math.max(0, value) / longest) * 240)
    const xText = (value: number) => groupDigits(10 ** value, props.language)
    const controls = (
        <>
            <Segmented<Growth> label={l(say('Goian, f', 'Arriba, f', 'في البسط، f', 'On top, f'))} value={state.top} options={GROWTHS.map((growth) => ({ value: growth, label: GROWTH_TEXT[growth].replace(',', props.language === 'en' || props.language === 'ar' ? '.' : ',') }))} onChange={(top) => setState((s) => setRace(s, { top }))} />
            <Segmented<Growth> label={l(say('Behean, g', 'Abajo, g', 'في المقام، g', 'Below, g'))} value={state.bottom} options={GROWTHS.map((growth) => ({ value: growth, label: GROWTH_TEXT[growth].replace(',', props.language === 'en' || props.language === 'ar' ? '.' : ',') }))} onChange={(bottom) => setState((s) => setRace(s, { bottom }))} />
            <Stepper label={l(say('Koefizientea c', 'Coeficiente c', 'المعامل c', 'Coefficient c'))} value={state.coef} min={RACE_LIMITS.coef.min} max={RACE_LIMITS.coef.max} onChange={(coef) => setState((s) => setRace(s, { coef }))} language={props.language} />
            <Stepper label="x" value={state.k} min={RACE_LIMITS.k.min} max={RACE_LIMITS.k.max} format={xText} onChange={(value) => setState((s) => setRace(s, { k: value }))} language={props.language} />
        </>
    )
    const quotient = quotientDigits({ ...state, k: state.k })
    const top = state.coef === 1 ? GROWTH_LATEX[state.top] : `${state.coef}\\cdot ${GROWTH_LATEX[state.top]}`
    const fraction = `\\frac{${top}}{${GROWTH_LATEX[state.bottom]}}`
    const local = (latex: string) => (props.language === 'ar' ? latex.replace(/\{,\}/g, '.') : latex)
    const power = Math.round(quotient)
    const valueLatex = Math.abs(quotient) < 3 ? texDec(10 ** quotient, props.language, 3) : `10^{${power < 0 ? '-' : ''}${groupLatex(Math.abs(power))}}`
    const goes = racePrediction(state)
    const end = goes === '<' ? '0' : goes === '=' ? String(state.coef) : '+\\infty'
    const note = goes === '<'
        ? say(`Beheko infinitua ordena handiagokoa da: zatidura 0 baliora doa.`, `El infinito de abajo es de mayor orden: el cociente va a 0.`, `لانهاية المقام من رتبة أكبر: يؤول خارج القسمة إلى 0.`, `The infinity below is of higher order: the quotient goes to 0.`)
        : goes === '='
            ? say(`Ordena bera: zatidura $c=${state.coef}$ baliora doa.`, `El mismo orden: el cociente va a $c=${state.coef}$.`, `الرتبة نفسها: يؤول خارج القسمة إلى $c=${state.coef}$.`, `The same order: the quotient goes to $c=${state.coef}$.`)
            : say(`Goiko infinitua ordena handiagokoa da: zatidura $+\\infty$ aldera doa.`, `El infinito de arriba es de mayor orden: el cociente va a $+\\infty$.`, `لانهاية البسط من رتبة أكبر: يؤول خارج القسمة إلى $+\\infty$.`, `The infinity on top is of higher order: the quotient goes to $+\\infty$.`)
    const readout = (
        <Predict
            language={props.language}
            question={say(`Ikusi aurretik: $${local(fraction)}$ zatidura, $x\\to+\\infty$ denean, 0 baliora, zenbaki batera ala $\\infty$ aldera doa?`, `Antes de verlo: cuando $x\\to+\\infty$, ¿el cociente $${local(fraction)}$ va a 0, a un número o a $\\infty$?`, `قبل أن ترى: عندما $x\\to+\\infty$ هل يؤول خارج القسمة $${local(fraction)}$ إلى 0 أم إلى عدد أم إلى $\\infty$؟`, `Before you see it: as $x\\to+\\infty$, does the quotient $${local(fraction)}$ go to 0, to a number or to $\\infty$?`)}
            labels={{ '<': say('0 baliora', 'A 0', 'إلى 0', 'To 0'), '=': say('Zenbaki batera', 'A un número', 'إلى عدد', 'To a number'), '>': say('∞ aldera', 'A ∞', 'إلى ∞', 'To ∞') }}
            actual={goes}
            choice={state.prediction}
            tip={say('Ordena: logaritmoa < berreketa < esponentziala. Bi berreketatan, berretzaile handienak irabazten du; bi esponentzialetan, oinarri handienak.', 'El orden: logaritmo < potencia < exponencial. Entre dos potencias gana el exponente mayor; entre dos exponenciales, la base mayor.', 'الترتيب: اللوغاريتم < القوة < الأسية. وبين قوتين يفوز الأس الأكبر، وبين أسيتين يفوز الأساس الأكبر.', 'The order: logarithm < power < exponential. Between two powers the larger exponent wins; between two exponentials, the larger base.')}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout latex={[`x=${groupLatex(10 ** state.k)}\\qquad ${local(fraction)}\\approx ${valueLatex}`, `${local(fraction)}\\to ${end}`]} note={l(note)} />
        </Predict>
    )
    const label = (growth: Growth) => GROWTH_TEXT[growth].replace(',', props.language === 'en' || props.language === 'ar' ? '.' : ',')
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={raceChallenges} extraChallenges={raceExtra} state={state}>
            <Board height={200} label={l(say('Bi infinituen lasterketa: zifra kopurua', 'La carrera de dos infinitos: número de cifras', 'سباق لانهايتين: عدد الأرقام', 'The race of two infinities: number of digits'))}>
                <rect x={10} y={10} width={340} height={180} rx={12} fill={PAPER} stroke="#e6dfd2" />
                <text x={24} y={44} fontSize={15} fontWeight={700} fill={STAGE}>{`${state.coef === 1 ? '' : `${state.coef}·`}${label(state.top)}`}</text>
                <text x={24} y={110} fontSize={15} fontWeight={700} fill={SECOND}>{label(state.bottom)}</text>
                {shown ? (
                    <g>
                        <rect x={90} y={30} width={bar(topDigits)} height={22} rx={6} fill={STAGE} />
                        <rect x={90} y={96} width={bar(bottomDigits)} height={22} rx={6} fill={SECOND} />
                        <TenTo x={90} y={72} power={groupDigits(Math.round(topDigits), props.language)} color={STAGE} />
                        <TenTo x={90} y={138} power={groupDigits(Math.round(bottomDigits), props.language)} color={SECOND} />
                    </g>
                ) : <Hidden x={210} y={88} />}
                <text x={180} y={178} textAnchor="middle" fontSize={14} fontWeight={700} fill={MUTED}>{`x = ${groupDigits(Math.round(10 ** k), props.language)}`}</text>
            </Board>
            <PlayButton label={l(say('Hasi lasterketa', 'Empieza la carrera', 'ابدأ السباق', 'Start the race'))} disabled={!shown} playing={playback.playing} onPlay={playback.play} />
        </ToolFrame>
    )
}

/* ---------- L4. Adjust a and b ---------- */

const JOINTS_NAMES: Record<JointsSetup, string> = { s1: 'f₁', s2: 'f₂', s3: 'f₃' }
const JOINTS_LATEX: Record<JointsSetup, string> = { s1: 'f_1', s2: 'f_2', s3: 'f_3' }

export function JointsTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<JointsState>(initialJointsState)
    const shown = state.prediction !== null
    const setup = JOINTS_SETUP[state.setup]
    const view = setup.view
    const { X, Y } = frame(view)
    const clip = useClip(X(view.xMin), Y(view.yMax), 300, 200)
    const controls = (
        <>
            <Segmented<JointsSetup> label={l(say('Funtzioa', 'Función', 'الدالة', 'Function'))} value={state.setup} options={JOINTS_SETUPS.map((setupId) => ({ value: setupId, label: JOINTS_NAMES[setupId] }))} onChange={(setupId) => setState((s) => setJoints(s, { setup: setupId }))} />
            <Stepper label="a" value={state.a} min={JOINTS_LIMITS.a.min} max={JOINTS_LIMITS.a.max} format={minus} onChange={(a) => setState((s) => setJoints(s, { a }))} language={props.language} />
            <Stepper label="b" value={state.b} min={JOINTS_LIMITS.b.min} max={JOINTS_LIMITS.b.max} format={minus} onChange={(b) => setState((s) => setJoints(s, { b }))} language={props.language} />
        </>
    )
    const [p, q] = setup.joints
    const piece = (index: 0 | 1 | 2) => (x: number) => setup.pieces[index].f(x, state.a, state.b)
    const closed = [jointClosed(state, 0), jointClosed(state, 1)]
    const lines = ([0, 1] as const).map((j) => {
        const [left, right] = jointValues(state, j)
        const x = setup.joints[j]
        return `f(${x}^-)=${left}\\qquad f(${x})=${right}`
    })
    const note = closed[0] && closed[1]
        ? say('Bi lotuneak itxita: $f$ jarraitua da $\\mathbb{R}$ osoan.', 'Las dos uniones cerradas: $f$ es continua en $\\mathbb{R}$.', 'نقطتا الالتقاء مغلقتان: $f$ متصلة على $\\mathbb{R}$.', 'Both joints closed: $f$ is continuous on $\\mathbb{R}$.')
        : say(`Itxita: ${[closed[0] ? `$x=${p}$` : '', closed[1] ? `$x=${q}$` : ''].filter(Boolean).join(', ') || '—'}. Lotune bakoitzean, ezkerreko limiteak $f$ puntuko balioa izan behar du.`, `Cerradas: ${[closed[0] ? `$x=${p}$` : '', closed[1] ? `$x=${q}$` : ''].filter(Boolean).join(', ') || '—'}. En cada unión, el límite por la izquierda tiene que valer lo que $f$ en el punto.`, `المغلقة: ${[closed[0] ? `$x=${p}$` : '', closed[1] ? `$x=${q}$` : ''].filter(Boolean).join('، ') || '—'}. عند كل نقطة التقاء يجب أن تساوي النهاية من اليسار قيمة $f$ عند النقطة.`, `Closed: ${[closed[0] ? `$x=${p}$` : '', closed[1] ? `$x=${q}$` : ''].filter(Boolean).join(', ') || '—'}. At each joint, the limit from the left must equal the value of $f$ at the point.`)
    const readout = (
        <Predict
            language={props.language}
            question={say(`Ikusi aurretik: $${JOINTS_LATEX[state.setup]}$ funtzioan, lehen lotunea itxita mantentzeko, $a$ igotzen bada, $b$ jaitsi, berdin geratu ala igo behar da?`, `Antes de verlo: en $${JOINTS_LATEX[state.setup]}$, para mantener cerrada la primera unión, si $a$ sube, ¿$b$ tiene que bajar, quedarse igual o subir?`, `قبل أن ترى: في $${JOINTS_LATEX[state.setup]}$، لإبقاء نقطة الالتقاء الأولى مغلقة، إذا زادت $a$ فهل يجب أن تنقص $b$ أم تبقى أم تزيد؟`, `Before you see it: in $${JOINTS_LATEX[state.setup]}$, to keep the first joint closed, if $a$ goes up, must $b$ go down, stay or go up?`)}
            labels={{ '<': say('Jaitsi', 'Bajar', 'تنقص', 'Go down'), '=': say('Berdin geratu', 'Quedarse igual', 'تبقى كما هي', 'Stay'), '>': say('Igo', 'Subir', 'تزيد', 'Go up') }}
            actual={jointsPrediction(state)}
            choice={state.prediction}
            tip={say(`Idatzi lehen lotuneko ekuazioa ($x=${p}$) eta askatu $b$.`, `Escribe la ecuación de la primera unión ($x=${p}$) y despeja $b$.`, `اكتب معادلة نقطة الالتقاء الأولى ($x=${p}$) واستخرج $b$.`, `Write the equation of the first joint ($x=${p}$) and solve for $b$.`)}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout latex={[jointsLatex(state.setup), ...lines]} note={l(note)} />
        </Predict>
    )
    const ends = ([0, 1] as const).map((j) => {
        const [left, right] = jointValues(state, j)
        const x = setup.joints[j]
        return closed[j]
            ? <Full key={j} x={X(x)} y={Y(right)} color={GREEN} />
            : (
                <g key={j}>
                    <line x1={X(x)} x2={X(x)} y1={Y(left)} y2={Y(right)} stroke={SECOND} strokeWidth={1.6} strokeDasharray="4 3" />
                    <Open x={X(x)} y={Y(left)} color={SECOND} />
                    <Full x={X(x)} y={Y(right)} color={SECOND} />
                </g>
            )
    })
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={jointsChallenges} extraChallenges={jointsExtra} state={state}>
            <Board height={250} label={l(say(`${JOINTS_NAMES[state.setup]} funtzioaren hiru zatiak`, `Los tres trozos de ${JOINTS_NAMES[state.setup]}`, `الأجزاء الثلاثة للدالة ${JOINTS_NAMES[state.setup]}`, `The three pieces of ${JOINTS_NAMES[state.setup]}`))}>
                {clip.defs}
                <Grid {...view} X={X} Y={Y} yStep={view.yStep} gridStep={view.yStep} />
                {shown ? (
                    <g>
                        <g clipPath={clip.url}>
                            <path d={curvePath(piece(0), view.xMin - 1, p, X, Y, [view.yMin, view.yMax])} fill="none" stroke={STAGE} strokeWidth={3.2} />
                            <path d={curvePath(piece(1), p, q, X, Y, [view.yMin, view.yMax])} fill="none" stroke={VIOLET} strokeWidth={3.2} />
                            <path d={curvePath(piece(2), q, view.xMax + 1, X, Y, [view.yMin, view.yMax])} fill="none" stroke={MUSTARD} strokeWidth={3.2} />
                        </g>
                        {ends}
                    </g>
                ) : <Hidden x={200} y={120} />}
                {setup.joints.map((x) => <text key={x} x={X(x)} y={244} textAnchor="middle" fontSize={13} fontWeight={700} fill={MUTED}>{`x = ${minus(x)}`}</text>)}
            </Board>
        </ToolFrame>
    )
}

/* ---------- L5. The right theorem ---------- */

const THEOREM_NAMES: Record<TheoremFunction, string> = { cubic: 'g₁', jump: 'g₂', pole: 'g₃', parabola: 'g₄' }
const LAYER_NAMES: Record<TheoremLayer, LocalizedText> = {
    bolzano: say('Bolzano', 'Bolzano', 'بولتسانو', 'Bolzano'),
    darboux: say('Tarteko balioak', 'Valores intermedios', 'القيم الوسيطة', 'Intermediate values'),
    weierstrass: say('Weierstrass', 'Weierstrass', 'فايرشتراس', 'Weierstrass')
}
/** The theorem as the subject of a sentence */
const THEOREM_PHRASES: Record<TheoremLayer, LocalizedText> = {
    bolzano: say('Bolzanoren teoremak', 'el teorema de Bolzano', 'مبرهنة بولتسانو', 'Bolzano\'s theorem'),
    darboux: say('tarteko balioen teoremak', 'el teorema de los valores intermedios', 'مبرهنة القيم الوسيطة', 'the intermediate value theorem'),
    weierstrass: say('Weierstrassen teoremak', 'el teorema de Weierstrass', 'مبرهنة فايرشتراس', 'the Weierstrass theorem')
}
const THEOREM_VIEW = { xMin: -3, xMax: 3, yMin: -4, yMax: 4 }

/** A curve drawn on both sides of the point where it breaks, never across it */
function brokenPath(fn: (x: number) => number | null, breakAt: number | null, from: number, to: number, X: (x: number) => number, Y: (y: number) => number, yLimit: [number, number]): string {
    if (breakAt === null || breakAt <= from || breakAt >= to) return curvePath(fn, from, to, X, Y, yLimit, 0.01)
    return `${curvePath(fn, from, breakAt - 0.002, X, Y, yLimit, 0.01)} ${curvePath(fn, breakAt + 0.002, to, X, Y, yLimit, 0.01)}`
}

/** Where f crosses the line y = k inside (a, b) */
function crossings(state: Pick<TheoremState, 'fn' | 'a' | 'b'>, k: number): number[] {
    const { f, breakAt } = THEOREM_SETUP[state.fn]
    const out: number[] = []
    const step = 1 / 256
    for (let x = state.a; x < state.b - 1e-12; x += step) {
        const y = x + step
        if (breakAt !== null && x < breakAt && y >= breakAt) continue
        const fx = f(x) - k
        const fy = f(y) - k
        if (fx * fy < 0 || (fx === 0 && x > state.a)) out.push(fx === 0 ? x : x - (fx * step) / (fy - fx))
    }
    return out
}

export function TheoremTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<TheoremState>(initialTheoremState)
    const shown = state.prediction !== null
    const { X, Y } = frame(THEOREM_VIEW)
    const clip = useClip(X(THEOREM_VIEW.xMin), Y(THEOREM_VIEW.yMax), 300, 200)
    const playback = usePlayback(`${state.fn}-${state.layer}-${state.a}-${state.b}-${state.k}`, 2000)
    const setup = THEOREM_SETUP[state.fn]
    const fa = theoremValue(state.fn, state.a)
    const fb = theoremValue(state.fn, state.b)
    const continuous = continuousOn(state)
    const verdict = theoremPrediction(state)
    const controls = (
        <>
            <Segmented<TheoremLayer> label={l(say('Teorema', 'Teorema', 'المبرهنة', 'Theorem'))} value={state.layer} options={THEOREM_LAYERS.map((layer) => ({ value: layer, label: l(LAYER_NAMES[layer]) }))} onChange={(layer) => setState((s) => setTheorem(s, { layer }))} />
            <Segmented<TheoremFunction> label={l(say('Funtzioa', 'Función', 'الدالة', 'Function'))} value={state.fn} options={THEOREM_FUNCTIONS.map((fn) => ({ value: fn, label: THEOREM_NAMES[fn] }))} onChange={(fn) => setState((s) => setTheorem(s, { fn }))} />
            <Stepper label="a" value={state.a} min={THEOREM_LIMITS.end.min} max={THEOREM_LIMITS.end.max - 1} format={minus} onChange={(a) => setState((s) => setTheorem(s, { a }))} language={props.language} />
            <Stepper label="b" value={state.b} min={THEOREM_LIMITS.end.min + 1} max={THEOREM_LIMITS.end.max} format={minus} onChange={(b) => setState((s) => setTheorem(s, { b }))} language={props.language} />
            {state.layer === 'darboux' && <Stepper label="k" value={state.k} min={THEOREM_LIMITS.k.min} max={THEOREM_LIMITS.k.max} format={minus} onChange={(k) => setState((s) => setTheorem(s, { k }))} language={props.language} />}
            {state.layer === 'weierstrass' && <Segmented<'closed' | 'open'> label={l(say('Tartea', 'Intervalo', 'الفترة', 'Interval'))} value={state.open ? 'open' : 'closed'} options={[{ value: 'closed', label: `[${minus(state.a)}, ${minus(state.b)}]` }, { value: 'open', label: `(${minus(state.a)}, ${minus(state.b)})` }]} onChange={(value) => setState((s) => setTheorem(s, { open: value === 'open' }))} />}
        </>
    )
    const value = (y: number) => (Number.isFinite(y) ? texDec(y, props.language, 3) : '\\text{—}')
    const interval = state.layer === 'weierstrass' && state.open ? `(${state.a},${state.b})` : `[${state.a},${state.b}]`
    const roots = rootsIn(state)
    const levelCrossings = crossings(state, state.k)
    const { max, min } = extremes(state)
    const notes: Record<TheoremLayer, Record<'<' | '=' | '>', LocalizedText>> = {
        bolzano: {
            '<': say('Ez da jarraitua tarte osoan: Bolzanok ez du ezer ziurtatzen.', 'No es continua en todo el intervalo: Bolzano no asegura nada.', 'ليست متصلة على الفترة كلها: بولتسانو لا تضمن شيئًا.', 'It is not continuous on the whole interval: Bolzano ensures nothing.'),
            '=': say(`$f(a)$ eta $f(b)$ zeinu berekoak dira: Bolzanok ez du ezer ziurtatzen (${roots.length} erro daude hala ere).`, `$f(a)$ y $f(b)$ tienen el mismo signo: Bolzano no asegura nada (aun así hay ${roots.length} raíces).`, `لـ $f(a)$ و$f(b)$ الإشارة نفسها: بولتسانو لا تضمن شيئًا (ومع ذلك توجد ${roots.length} جذور).`, `$f(a)$ and $f(b)$ have the same sign: Bolzano ensures nothing (there are still ${roots.length} roots).`),
            '>': say(`Jarraitua eta zeinu-aldaketa: erro bat gutxienez dago (hemen ${roots.length}).`, `Continua y con cambio de signo: hay al menos una raíz (aquí, ${roots.length}).`, `متصلة ومع تغيّر في الإشارة: يوجد جذر واحد على الأقل (هنا ${roots.length}).`, `Continuous with a change of sign: there is at least one root (here, ${roots.length}).`)
        },
        darboux: {
            '<': say('Ez da jarraitua tarte osoan: $k$ balioa salta dezake.', 'No es continua en todo el intervalo: puede saltarse el valor $k$.', 'ليست متصلة على الفترة كلها: قد تقفز فوق القيمة $k$.', 'It is not continuous on the whole interval: it may skip the value $k$.'),
            '=': say('$k$ ez dago $f(a)$ eta $f(b)$ artean: teoremak ez du ezer ziurtatzen.', '$k$ no está entre $f(a)$ y $f(b)$: el teorema no asegura nada.', '$k$ ليست بين $f(a)$ و$f(b)$: المبرهنة لا تضمن شيئًا.', '$k$ is not between $f(a)$ and $f(b)$: the theorem ensures nothing.'),
            '>': say(`$k$ dago $f(a)$ eta $f(b)$ artean: $f(c)=k$ duen $c$ bat dago gutxienez (hemen ${levelCrossings.length}).`, `$k$ está entre $f(a)$ y $f(b)$: hay al menos un $c$ con $f(c)=k$ (aquí, ${levelCrossings.length}).`, `$k$ بين $f(a)$ و$f(b)$: يوجد $c$ واحد على الأقل بحيث $f(c)=k$ (هنا ${levelCrossings.length}).`, `$k$ is between $f(a)$ and $f(b)$: there is at least one $c$ with $f(c)=k$ (here, ${levelCrossings.length}).`)
        },
        weierstrass: {
            '<': say('Ez da jarraitua tarte osoan: baliteke maximorik edo minimorik ez izatea.', 'No es continua en todo el intervalo: puede no tener máximo o mínimo.', 'ليست متصلة على الفترة كلها: قد لا تكون لها قيمة عظمى أو صغرى.', 'It is not continuous on the whole interval: it may have no maximum or minimum.'),
            '=': say('Tartea irekia da: muturrean dagoen balio altuena edo baxuena ez da hartzen.', 'El intervalo es abierto: el valor más alto o más bajo que esté en un extremo no se alcanza.', 'الفترة مفتوحة: القيمة العليا أو الدنيا الواقعة عند طرف لا تُبلغ.', 'The interval is open: a highest or lowest value at an end is not reached.'),
            '>': say(`Jarraitua tarte itxian: maximoa $${value(max[1])}$ eta minimoa $${value(min[1])}$.`, `Continua en un intervalo cerrado: máximo $${value(max[1])}$ y mínimo $${value(min[1])}$.`, `متصلة على فترة مغلقة: القيمة العظمى $${value(max[1])}$ والصغرى $${value(min[1])}$.`, `Continuous on a closed interval: maximum $${value(max[1])}$ and minimum $${value(min[1])}$.`)
        }
    }
    const labels: Record<TheoremLayer, Record<'<' | '=' | '>', LocalizedText>> = {
        bolzano: { '<': say('Ez: ez da jarraitua', 'No: no es continua', 'لا: ليست متصلة', 'No: not continuous'), '=': say('Ez: zeinu bera', 'No: mismo signo', 'لا: الإشارة نفسها', 'No: same sign'), '>': say('Bai, erro bat', 'Sí, una raíz', 'نعم، جذر', 'Yes, a root') },
        darboux: { '<': say('Ez: ez da jarraitua', 'No: no es continua', 'لا: ليست متصلة', 'No: not continuous'), '=': say('Ez: k kanpoan', 'No: k fuera', 'لا: k خارجها', 'No: k outside'), '>': say('Bai, f(c) = k', 'Sí, f(c) = k', 'نعم، f(c) = k', 'Yes, f(c) = k') },
        weierstrass: { '<': say('Ez: ez da jarraitua', 'No: no es continua', 'لا: ليست متصلة', 'No: not continuous'), '=': say('Ez: tarte irekia', 'No: intervalo abierto', 'لا: فترة مفتوحة', 'No: open interval'), '>': say('Bai, maximoa eta minimoa', 'Sí, máximo y mínimo', 'نعم، عظمى وصغرى', 'Yes, max and min') }
    }
    const phrase = THEOREM_PHRASES[state.layer]
    const question = say(
        `Ikusi aurretik: $${setup.latex}$ funtzioan, $${interval}$ tartean, ${phrase.eu} ziurtatzen al du zerbait?`,
        `Antes de verlo: en $${setup.latex}$, en $${interval}$, ¿asegura algo ${phrase.es}?`,
        `قبل أن ترى: في $${setup.latex}$ على $${interval}$، هل تضمن ${phrase.ar} شيئًا؟`,
        `Before you see it: in $${setup.latex}$, on $${interval}$, does ${phrase.en} ensure anything?`
    )
    const readout = (
        <Predict
            language={props.language}
            question={question}
            labels={labels[state.layer]}
            actual={verdict}
            choice={state.prediction}
            tip={say('Lehenik, jarraitua al da $[a,b]$ tarte osoan? Gero, teorema bakoitzaren beste baldintza: zeinu-aldaketa, $k$ tartean edo tarte itxia.', 'Primero, ¿es continua en todo $[a,b]$? Después, la otra condición de cada teorema: cambio de signo, $k$ entre medias o intervalo cerrado.', 'أولًا: هل هي متصلة على $[a,b]$ كلها؟ ثم الشرط الآخر لكل مبرهنة: تغيّر الإشارة، أو $k$ بينهما، أو فترة مغلقة.', 'First, is it continuous on the whole of $[a,b]$? Then the other condition of each theorem: a change of sign, $k$ in between, or a closed interval.')}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout latex={[`f(${state.a})=${value(fa)}\\qquad f(${state.b})=${value(fb)}`]} note={l(notes[state.layer][verdict])} />
        </Predict>
    )
    // ▶ sweeps the line y = k from f(a) to f(b); at rest it is at the chosen k
    const sweeping = playback.progress !== null && playback.progress < 1 && Number.isFinite(fa) && Number.isFinite(fb)
    const level = sweeping ? fa + (fb - fa) * playback.progress! : state.k
    const levelPoints = sweeping ? crossings(state, level) : levelCrossings
    const endOpen = state.layer === 'weierstrass' && state.open
    const view = THEOREM_VIEW
    const inside = (x: number) => (setup.breakAt !== null && Math.abs(x - setup.breakAt) < 1e-9 ? null : setup.f(x))
    const endDot = (x: number, y: number) => (Number.isFinite(y) && y > view.yMin - 1 && y < view.yMax + 1
        ? (endOpen ? <Open key={`e${x}`} x={X(x)} y={Y(y)} color={STAGE} /> : <Full key={`e${x}`} x={X(x)} y={Y(y)} color={state.layer === 'bolzano' && shown ? (y > 0 ? GREEN : SECOND) : STAGE} />)
        : null)
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={theoremChallenges} extraChallenges={theoremExtra} state={state}>
            <Board height={250} label={l(say(`${THEOREM_NAMES[state.fn]} funtzioa tartean`, `${THEOREM_NAMES[state.fn]} en el intervalo`, `${THEOREM_NAMES[state.fn]} على الفترة`, `${THEOREM_NAMES[state.fn]} on the interval`))}>
                {clip.defs}
                <Grid {...view} X={X} Y={Y} yStep={2} />
                <rect x={X(state.a)} y={Y(view.yMax)} width={X(state.b) - X(state.a)} height={200} fill={MUSTARD_TINT} opacity={0.45} />
                <g clipPath={clip.url}>
                    <path d={brokenPath(inside, setup.breakAt, view.xMin, view.xMax, X, Y, [view.yMin, view.yMax])} fill="none" stroke={MUTED} strokeWidth={1.6} opacity={0.5} />
                    <path d={brokenPath(inside, setup.breakAt, state.a, state.b, X, Y, [view.yMin, view.yMax])} fill="none" stroke={STAGE} strokeWidth={3.4} strokeLinejoin="round" />
                    {state.fn === 'pole' && <line x1={X(1)} x2={X(1)} y1={Y(view.yMax)} y2={Y(view.yMin)} stroke={MUTED} strokeWidth={1.4} strokeDasharray="5 4" />}
                    {shown && state.layer === 'darboux' && <line x1={X(view.xMin)} x2={X(view.xMax)} y1={Y(level)} y2={Y(level)} stroke={MUSTARD} strokeWidth={2} strokeDasharray="6 4" />}
                </g>
                {state.fn === 'jump' && state.a <= 1 && state.b >= 1 && <><Open x={X(1)} y={Y(2)} color={STAGE} /><Full x={X(1)} y={Y(-2)} color={STAGE} /></>}
                {endDot(state.a, fa)}
                {endDot(state.b, fb)}
                {shown && state.layer === 'bolzano' && roots.map((x) => <Full key={`r${x}`} x={X(x)} y={Y(0)} color={MUSTARD} />)}
                {shown && state.layer === 'darboux' && levelPoints.map((x) => <Full key={`c${x}`} x={X(x)} y={Y(level)} color={MUSTARD} />)}
                {shown && state.layer === 'weierstrass' && continuous && (
                    <g>
                        {[max, min].map(([x, y], index) => {
                            const lost = state.open && (Math.abs(x - state.a) < 1e-9 || Math.abs(x - state.b) < 1e-9)
                            const color = index === 0 ? GREEN : SECOND
                            return lost ? <Open key={index} x={X(x)} y={Y(y)} color={color} /> : <Full key={index} x={X(x)} y={Y(y)} color={color} />
                        })}
                    </g>
                )}
                {!shown && <Hidden x={X((state.a + state.b) / 2)} y={Y(view.yMax) + 34} />}
                <text x={X(state.a)} y={244} textAnchor="middle" fontSize={13} fontWeight={700} fill={MUTED}>a</text>
                <text x={X(state.b)} y={244} textAnchor="middle" fontSize={13} fontWeight={700} fill={MUTED}>b</text>
                {shown && state.layer === 'darboux' && <text x={346} y={Y(level) - 5} textAnchor="end" fontSize={13} fontWeight={700} fill={MUSTARD}>{`y = ${num(level, props.language, 2)}`}</text>}
            </Board>
            {state.layer === 'darboux' && <PlayButton label={l(say('Mugitu zuzena', 'Mueve la recta', 'حرّك المستقيم', 'Move the line'))} disabled={!shown || !continuous} playing={playback.playing} onPlay={playback.play} />}
        </ToolFrame>
    )
}
