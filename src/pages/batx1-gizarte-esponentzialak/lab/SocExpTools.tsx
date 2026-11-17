import { useState } from 'react'
import { Segmented, Stepper, ToolFrame } from '../../../features/unit-v2/lab/LabKit'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import { useLabText } from '../../../features/unit-v2/lab/useLabText'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import { Board, Hidden, PlayButton, Predict, Readout } from '../../dbh3-segidak/lab/LabParts'
import { GREEN, INK, MUSTARD, MUTED, PAPER, SECOND, STAGE, texDec } from '../../dbh3-segidak/lab/labStyle'
import { setPrediction } from '../../dbh3-segidak/lab/prediction'
import { usePlayback } from '../../dbh4-aplikatuak-proportzionaltasuna/lab/usePlayback'
import { say } from '../text'
import { expValue, initialLineExpState, LINE_EXP_LIMITS, lineExpChallenges, lineExpExtra, lineExpPrediction, lineValue, ratioOf, setLineExp, type LineExpState } from './lineExp'
import { halfDay, initialLogisticState, LOGISTIC_LIMITS, LOGISTIC_RATES, logisticAt, logisticChallenges, logisticExtra, logisticPrediction, rateOf, setLogistic, startExpAt, type LogisticState } from './logistic'

/* ==========================================================================
   Funtzio esponentzialak eta logaritmikoak · Batxilergoa 1 · Gizarte
   Zientziak — the two tools of this unit: the line or the exponential
   through the same two data, and the logistic S curve. Each asks for a
   prediction before it shows the result, and each moves with ▶. Logic in
   lineExp.ts and logistic.ts. The drawings carry numbers and letters only.
   ========================================================================== */

const GRID = '#e6dfd2'
const tex = (value: number, language: UnitLanguage) => (Math.abs(value - Math.round(value)) < 1e-9 ? String(Math.round(value)) : texDec(value, language, 2))
const term = (value: number, language: UnitLanguage) => (value < 0 ? `-${tex(-value, language)}` : `+${tex(value, language)}`)

function curvePath(fn: (x: number) => number, from: number, to: number, X: (x: number) => number, Y: (y: number) => number, yMin: number, yMax: number, step = 0.05): string {
    let path = ''
    let open = false
    for (let x = from; x <= to + 1e-9; x += step) {
        const y = fn(x)
        if (!Number.isFinite(y) || y < yMin || y > yMax) {
            open = false
            continue
        }
        path += `${open ? 'L' : 'M'} ${X(x).toFixed(1)} ${Y(y).toFixed(1)} `
        open = true
    }
    return path
}

/** Five round marks for an axis from 0 to top */
function marks(top: number): number[] {
    const step = [1, 2, 5, 10, 20, 25, 50, 100, 200, 250, 500].find((size) => top / size <= 5) ?? 1000
    return Array.from({ length: Math.floor(top / step) }, (_, i) => (i + 1) * step)
}

/* ---------- L1. Line or exponential? ---------- */

export function LineExpTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const t = (value: number) => tex(value, props.language)
    const [state, setState] = useState<LineExpState>(initialLineExpState)
    const shown = state.prediction !== null
    const playback = usePlayback(`${state.a}-${state.b}-${state.target}`, 1200)
    const progress = !shown ? 0 : playback.progress === null ? 1 : playback.progress
    const top = Math.max(10, Math.ceil(Math.max(expValue(state, state.target), lineValue(state, state.target), state.a, state.b) / 10) * 10)
    const X = (x: number) => 46 + x * 46
    const Y = (y: number) => 262 - (y / top) * 228
    const reach = 6 * progress
    const controls = (
        <>
            <Stepper label="A (x = 0)" value={state.a} min={LINE_EXP_LIMITS.y.min} max={LINE_EXP_LIMITS.y.max} onChange={(a) => setState((s) => setLineExp(s, { a }))} language={props.language} />
            <Stepper label="B (x = 1)" value={state.b} min={LINE_EXP_LIMITS.y.min} max={LINE_EXP_LIMITS.y.max} onChange={(b) => setState((s) => setLineExp(s, { b }))} language={props.language} />
            <Stepper label={l(say('Helburua x', 'Objetivo x', 'الهدف x', 'Target x'))} value={state.target} min={LINE_EXP_LIMITS.target.min} max={LINE_EXP_LIMITS.target.max} onChange={(target) => setState((s) => setLineExp(s, { target }))} language={props.language} />
        </>
    )
    const slope = state.b - state.a
    const lines = [
        `y=${state.a}${term(slope, props.language)}x\\ \\to\\ ${t(lineValue(state, state.target))}`,
        `y=${state.a}\\cdot ${t(ratioOf(state))}^x\\ \\to\\ ${t(expValue(state, state.target))}`
    ]
    const readout = (
        <Predict
            language={props.language}
            question={say(`Ikusi aurretik: $x=${state.target}$ denean, zeinek ematen du gehiago?`, `Antes de verlo: en $x=${state.target}$, ¿cuál da más?`, `قبل أن ترى: عند $x=${state.target}$ أيهما يعطي أكثر؟`, `Before you see it: at $x=${state.target}$, which gives more?`)}
            labels={{ '<': say('Zuzenak', 'La recta', 'المستقيم', 'The line'), '=': say('Berdin', 'Igual', 'متساويان', 'The same'), '>': say('Esponentzialak', 'La exponencial', 'الأسية', 'The exponential') }}
            actual={lineExpPrediction(state)}
            choice={state.prediction}
            tip={say('Datuetan berdinak dira. Haien artean zuzena gorago doa, eta kanpoan esponentziala, beti.', 'En los datos son iguales. Entre ellos la recta va por encima, y fuera, la exponencial, siempre.', 'عند البيانات يتساويان. وبينها يكون المستقيم أعلى، وخارجها الأسية دائمًا.', 'At the data they are equal. Between them the line is above, and outside, the exponential, always.')}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout latex={lines} note={l(say('Zuzena: kendura konstantea. Esponentziala: zatidura konstantea.', 'La recta: diferencia constante. La exponencial: cociente constante.', 'المستقيم: فرق ثابت. الأسية: خارج قسمة ثابت.', 'The line: constant difference. The exponential: constant quotient.'))} />
        </Predict>
    )
    const yMarks = marks(top)
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={lineExpChallenges} extraChallenges={lineExpExtra} state={state}>
            <Board height={292} label={l(say('Zuzena eta esponentziala, datu berekin', 'La recta y la exponencial con los mismos datos', 'المستقيم والأسية بالبيانات نفسها', 'The line and the exponential with the same data'))}>
                <rect x={X(0)} y={Y(top)} width={X(6) - X(0)} height={Y(0) - Y(top)} fill={PAPER} />
                {[1, 2, 3, 4, 5, 6].map((x) => <line key={`gx${x}`} x1={X(x)} x2={X(x)} y1={Y(0)} y2={Y(top)} stroke={GRID} strokeWidth={1} />)}
                {yMarks.map((y) => <line key={`gy${y}`} x1={X(0)} x2={X(6)} y1={Y(y)} y2={Y(y)} stroke={GRID} strokeWidth={1} />)}
                <line x1={X(0)} x2={X(6.2)} y1={Y(0)} y2={Y(0)} stroke={INK} strokeWidth={1.5} />
                <line x1={X(0)} x2={X(0)} y1={Y(0)} y2={Y(top)} stroke={INK} strokeWidth={1.5} />
                {[0, 1, 2, 3, 4, 5, 6].map((x) => <text key={`tx${x}`} x={X(x)} y={Y(0) + 15} textAnchor="middle" fontSize={12} fill={MUTED}>{x}</text>)}
                {yMarks.map((y) => <text key={`ty${y}`} x={X(0) - 5} y={Y(y) + 4} textAnchor="end" fontSize={11} fill={MUTED}>{y}</text>)}
                <line x1={X(state.target)} x2={X(state.target)} y1={Y(0)} y2={Y(top)} stroke={INK} strokeWidth={1.4} strokeDasharray="4 3" />
                {shown && <path d={curvePath((x) => lineValue(state, x), 0, reach, X, Y, 0, top)} fill="none" stroke={MUTED} strokeWidth={2.6} strokeDasharray="7 5" />}
                {shown && <path d={curvePath((x) => expValue(state, x), 0, reach, X, Y, 0, top)} fill="none" stroke={STAGE} strokeWidth={3.4} />}
                <circle cx={X(0)} cy={Y(state.a)} r={6.5} fill={INK} stroke={PAPER} strokeWidth={1.5} />
                <circle cx={X(1)} cy={Y(state.b)} r={6.5} fill={INK} stroke={PAPER} strokeWidth={1.5} />
                <text x={X(0) + 9} y={Y(state.a) - 9} fontSize={13} fontWeight={700} fill={INK}>A</text>
                <text x={X(1) + 9} y={Y(state.b) - 9} fontSize={13} fontWeight={700} fill={INK}>B</text>
                {shown && progress >= 1 && expValue(state, state.target) <= top && <circle cx={X(state.target)} cy={Y(expValue(state, state.target))} r={7} fill={STAGE} stroke={PAPER} strokeWidth={1.5} />}
                {shown && progress >= 1 && lineValue(state, state.target) >= 0 && lineValue(state, state.target) <= top && <circle cx={X(state.target)} cy={Y(lineValue(state, state.target))} r={6} fill={MUTED} stroke={PAPER} strokeWidth={1.5} />}
                {!shown && <Hidden x={X(state.target) + (state.target > 4 ? -18 : 18)} y={Y(top / 2)} size={22} />}
            </Board>
            <PlayButton label={l(say('Marraztu biak', 'Dibuja las dos', 'ارسم الاثنين', 'Draw both'))} disabled={!shown} playing={playback.playing} onPlay={playback.play} />
        </ToolFrame>
    )
}

/* ---------- L2. The S curve ---------- */

export function LogisticTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const t = (value: number) => tex(value, props.language)
    const [state, setState] = useState<LogisticState>(initialLogisticState)
    const shown = state.prediction !== null
    const playback = usePlayback(`${state.M}-${state.b}-${state.rate}-${state.x}`, 1400)
    const progress = !shown ? 0 : playback.progress === null ? 1 : playback.progress
    const X = (x: number) => 46 + x * 23
    const Y = (y: number) => 262 - (y / state.M) * 220
    const walker = state.x * progress
    const value = logisticAt(state, state.x)
    const a = rateOf(state)
    const controls = (
        <>
            <Stepper label={l(say('M (sabaia)', 'M (techo)', 'M (السقف)', 'M (ceiling)'))} value={state.M} min={LOGISTIC_LIMITS.M.min} max={LOGISTIC_LIMITS.M.max} step={LOGISTIC_LIMITS.M.step} onChange={(M) => setState((s) => setLogistic(s, { M }))} language={props.language} />
            <Stepper label="b" value={state.b} min={LOGISTIC_LIMITS.b.min} max={LOGISTIC_LIMITS.b.max} onChange={(b) => setState((s) => setLogistic(s, { b }))} language={props.language} />
            <Segmented<string> label={l(say('a (erritmoa)', 'a (ritmo)', 'a (الإيقاع)', 'a (rhythm)'))} value={String(state.rate)} options={LOGISTIC_RATES.map((rate, index) => ({ value: String(index), label: String(rate).replace('.', props.language === 'eu' || props.language === 'es' ? ',' : '.') }))} onChange={(rate) => setState((s) => setLogistic(s, { rate: Number(rate) }))} />
            <Stepper label={l(say('Eguna x', 'Día x', 'اليوم x', 'Day x'))} value={state.x} min={LOGISTIC_LIMITS.x.min} max={LOGISTIC_LIMITS.x.max} onChange={(x) => setState((s) => setLogistic(s, { x }))} language={props.language} />
        </>
    )
    const formula = `f(x)=\\frac{${state.M}}{1+${state.b}\\cdot ${t(a)}^{-x}}`
    const readout = (
        <Predict
            language={props.language}
            question={say(`Ikusi aurretik: ${state.x}. egunean, sabaiaren erdira (${state.M / 2}) iritsi al da?`, `Antes de verlo: el día ${state.x}, ¿se ha llegado a la mitad del techo (${state.M / 2})?`, `قبل أن ترى: في اليوم ${state.x}، هل بُلغ نصف السقف (${state.M / 2})؟`, `Before you see it: on day ${state.x}, has half the ceiling (${state.M / 2}) been reached?`)}
            labels={{ '<': say('Oraindik ez', 'Todavía no', 'ليس بعد', 'Not yet'), '=': say('Zehazki erdia', 'Justo la mitad', 'النصف تمامًا', 'Exactly half'), '>': say('Gaindituta', 'Ya la ha pasado', 'تجاوزته', 'Already past') }}
            actual={logisticPrediction(state)}
            choice={state.prediction}
            tip={say('Erdia lortzen da izendatzailea 2 denean, hau da, $a^x=b$ denean. Alderatu $a^x$ eta $b$.', 'Se llega a la mitad cuando el denominador vale 2, es decir, cuando $a^x=b$. Compara $a^x$ con $b$.', 'نبلغ النصف عندما يساوي المقام 2، أي عندما $a^x=b$. قارن $a^x$ بـ $b$.', 'Half is reached when the denominator is 2, that is, when $a^x=b$. Compare $a^x$ with $b$.')}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout latex={[formula, `f(${state.x})\\approx ${t(Math.round(value * 100) / 100)}`, `x_{\\frac{M}{2}}=\\frac{\\log ${state.b}}{\\log ${t(a)}}\\approx ${t(Math.round(halfDay(state) * 100) / 100)}`]} note={l(say('Marratua: hasiera bereko esponentziala.', 'Discontinua: la exponencial con el mismo comienzo.', 'المتقطع: الأسية التي لها البداية نفسها.', 'Dashed: the exponential with the same start.'))} />
        </Predict>
    )
    const yMarks = marks(state.M)
    const dayMarks = [0, 2, 4, 6, 8, 10, 12]
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={logisticChallenges} extraChallenges={logisticExtra} state={state}>
            <Board height={292} label={l(say('Kurba logistikoa, haren sabaia eta erdia', 'La curva logística, su techo y su mitad', 'المنحنى اللوجستي وسقفه ونصفه', 'The logistic curve, its ceiling and its half'))}>
                <rect x={X(0)} y={Y(state.M * 1.1)} width={X(12) - X(0)} height={Y(0) - Y(state.M * 1.1)} fill={PAPER} />
                {dayMarks.map((x) => <line key={`gx${x}`} x1={X(x)} x2={X(x)} y1={Y(0)} y2={Y(state.M * 1.1)} stroke={GRID} strokeWidth={1} />)}
                {yMarks.map((y) => <line key={`gy${y}`} x1={X(0)} x2={X(12)} y1={Y(y)} y2={Y(y)} stroke={GRID} strokeWidth={1} />)}
                <line x1={X(0)} x2={X(12.3)} y1={Y(0)} y2={Y(0)} stroke={INK} strokeWidth={1.5} />
                <line x1={X(0)} x2={X(0)} y1={Y(0)} y2={Y(state.M * 1.1)} stroke={INK} strokeWidth={1.5} />
                {dayMarks.map((x) => <text key={`tx${x}`} x={X(x)} y={Y(0) + 15} textAnchor="middle" fontSize={12} fill={MUTED}>{x}</text>)}
                {yMarks.map((y) => <text key={`ty${y}`} x={X(0) - 5} y={Y(y) + 4} textAnchor="end" fontSize={11} fill={MUTED}>{y}</text>)}
                <line x1={X(0)} x2={X(12)} y1={Y(state.M)} y2={Y(state.M)} stroke={SECOND} strokeWidth={2} strokeDasharray="7 5" />
                <text x={X(12)} y={Y(state.M) - 6} textAnchor="end" fontSize={13} fontWeight={700} fill={SECOND}>M</text>
                {shown && <line x1={X(0)} x2={X(12)} y1={Y(state.M / 2)} y2={Y(state.M / 2)} stroke={MUSTARD} strokeWidth={1.6} strokeDasharray="4 4" />}
                <line x1={X(state.x)} x2={X(state.x)} y1={Y(0)} y2={Y(state.M * 1.1)} stroke={INK} strokeWidth={1.4} strokeDasharray="4 3" />
                <path d={curvePath((x) => startExpAt(state, x), 0, 12, X, Y, 0, state.M * 1.1)} fill="none" stroke={MUTED} strokeWidth={2.2} strokeDasharray="6 5" />
                {shown && <path d={curvePath((x) => logisticAt(state, x), 0, 12, X, Y, 0, state.M * 1.1)} fill="none" stroke={STAGE} strokeWidth={3.4} />}
                {shown && <circle cx={X(walker)} cy={Y(logisticAt(state, walker))} r={7} fill={progress >= 1 ? GREEN : SECOND} stroke={PAPER} strokeWidth={1.6} />}
                {!shown && <Hidden x={X(state.x) + (state.x > 9 ? -18 : 18)} y={Y(state.M * 0.75)} size={22} />}
            </Board>
            <PlayButton label={l(say('Egunak aurrera', 'Avanza los días', 'تقدّم الأيام', 'Run the days'))} disabled={!shown} playing={playback.playing} onPlay={playback.play} />
        </ToolFrame>
    )
}
