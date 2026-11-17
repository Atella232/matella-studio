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
import { initialLongRunState, LONG_RUN_LIMITS, LONG_RUN_T, longRunAt, longRunChallenges, longRunExtra, longRunPrediction, setLongRun, startOf, type LongRunState } from './longRun'
import { firstPrice, initialTariffState, jumpOf, leftAt, rightAt, secondPrice, setTariff, TARIFF_FIRST, TARIFF_LIMITS, TARIFF_SECOND, TARIFF_X, tariffAt, tariffChallenges, tariffExtra, tariffPrediction, type TariffState } from './tariff'

/* ==========================================================================
   Limiteak eta jarraitutasuna · Batxilergoa 1 · Gizarte Zientziak — the two
   tools of this unit: a model that settles in the long run and a tariff
   in two pieces that must not jump. Each asks for a prediction before it
   shows the result, and each moves with ▶. Logic in longRun.ts and
   tariff.ts. The drawings carry numbers and letters only.
   ========================================================================== */

const GRID = '#e6dfd2'
const tex = (value: number, language: UnitLanguage) => (Math.abs(value - Math.round(value)) < 1e-9 ? String(Math.round(value)) : texDec(value, language, 2))
const decimalLabel = (value: number, language: UnitLanguage) => String(value).replace('.', language === 'eu' || language === 'es' ? ',' : '.')

function curvePath(fn: (x: number) => number, from: number, to: number, X: (x: number) => number, Y: (y: number) => number, yMin: number, yMax: number, step = 0.1): string {
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

/** Round marks for an axis from 0 to top */
function marks(top: number): number[] {
    const step = [1, 2, 5, 10, 20, 25, 50].find((size) => top / size <= 5) ?? 100
    return Array.from({ length: Math.floor(top / step) }, (_, i) => (i + 1) * step)
}

/* ---------- L1. In the long run ---------- */

export function LongRunTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const t = (value: number) => tex(value, props.language)
    const [state, setState] = useState<LongRunState>(initialLongRunState)
    const shown = state.prediction !== null
    const playback = usePlayback(`${state.A}-${state.B}-${state.C}`, 1600)
    const progress = !shown ? 0 : playback.progress === null ? 1 : playback.progress
    const start = startOf(state)
    const top = Math.max(4, Math.ceil(Math.max(state.A, start) * 1.15))
    const X = (x: number) => 46 + x * 7
    const Y = (y: number) => 262 - (y / top) * 226
    const walker = LONG_RUN_T * progress
    const controls = (
        <>
            <Stepper label="A" value={state.A} min={LONG_RUN_LIMITS.A.min} max={LONG_RUN_LIMITS.A.max} onChange={(A) => setState((s) => setLongRun(s, { A }))} language={props.language} />
            <Stepper label="B" value={state.B} min={LONG_RUN_LIMITS.B.min} max={LONG_RUN_LIMITS.B.max} onChange={(B) => setState((s) => setLongRun(s, { B }))} language={props.language} />
            <Stepper label="C" value={state.C} min={LONG_RUN_LIMITS.C.min} max={LONG_RUN_LIMITS.C.max} onChange={(C) => setState((s) => setLongRun(s, { C }))} language={props.language} />
        </>
    )
    const formula = `f(t)=\\frac{${state.A === 1 ? '' : state.A === 0 ? '0' : state.A}${state.A === 0 ? '' : 't'}+${state.B}}{t+${state.C}}`
    const row = (list: number[]) => list.map((value) => `f(${value})\\approx ${t(Math.round(longRunAt(state, value) * 100) / 100)}`).join('\\quad ')
    const exact = (value: number) => Math.abs(value * 100 - Math.round(value * 100)) < 1e-9
    const startLatex = `f(0)=\\frac{${state.B}}{${state.C}}${exact(start) ? '=' : '\\approx '}${t(Math.round(start * 100) / 100)}`
    const readout = (
        <Predict
            language={props.language}
            question={say('Ikusi aurretik: epe luzeko balioa hasierakoa baino txikiagoa, berdina ala handiagoa da?', 'Antes de verlo: el valor a largo plazo, ¿es menor, igual o mayor que el del principio?', 'قبل أن ترى: هل القيمة على المدى البعيد أصغر من قيمة البداية أم تساويها أم أكبر منها؟', 'Before you see it: is the long-run value smaller than, equal to or bigger than the start?')}
            labels={{ '<': say('Txikiagoa: jaitsi', 'Menor: baja', 'أصغر: تنزل', 'Smaller: it falls'), '=': say('Berdina', 'Igual', 'تساويها', 'The same'), '>': say('Handiagoa: igo', 'Mayor: sube', 'أكبر: تصعد', 'Bigger: it rises') }}
            actual={longRunPrediction(state)}
            choice={state.prediction}
            tip={say('Hasieran $\\frac{B}{C}$; epe luzera, maila bera dutenez, $\\frac{A}{1}=A$. Alderatu biak.', 'Al principio, $\\frac{B}{C}$; a la larga, con el mismo grado, $\\frac{A}{1}=A$. Compara los dos.', 'في البداية $\\frac{B}{C}$، وعلى المدى البعيد مع الدرجة نفسها $\\frac{A}{1}=A$. قارن بينهما.', 'At the start, $\\frac{B}{C}$; in the long run, with the same degree, $\\frac{A}{1}=A$. Compare the two.')}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout latex={[formula, startLatex, row([1, 10]), row([100, 1000]), `\\lim_{t\\to+\\infty}f(t)=${state.A}`]} note={l(say('Taulak gero eta hurbilago ematen du epe luzeko balioa.', 'La tabla da cada vez más cerca el valor a largo plazo.', 'يقترب الجدول أكثر فأكثر من القيمة على المدى البعيد.', 'The table gets closer and closer to the long-run value.'))} />
        </Predict>
    )
    const yMarks = marks(top)
    const tMarks = [0, 10, 20, 30, 40]
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={longRunChallenges} extraChallenges={longRunExtra} state={state}>
            <Board height={292} label={l(say('Eredu bat hasieratik epe luzera', 'Un modelo del principio al largo plazo', 'نموذج من البداية إلى المدى البعيد', 'A model from the start to the long run'))}>
                <rect x={X(0)} y={Y(top)} width={X(LONG_RUN_T) - X(0)} height={Y(0) - Y(top)} fill={PAPER} />
                {tMarks.map((x) => <line key={`gx${x}`} x1={X(x)} x2={X(x)} y1={Y(0)} y2={Y(top)} stroke={GRID} strokeWidth={1} />)}
                {yMarks.map((y) => <line key={`gy${y}`} x1={X(0)} x2={X(LONG_RUN_T)} y1={Y(y)} y2={Y(y)} stroke={GRID} strokeWidth={1} />)}
                <line x1={X(0)} x2={X(LONG_RUN_T + 1.5)} y1={Y(0)} y2={Y(0)} stroke={INK} strokeWidth={1.5} />
                <line x1={X(0)} x2={X(0)} y1={Y(0)} y2={Y(top)} stroke={INK} strokeWidth={1.5} />
                {tMarks.map((x) => <text key={`tx${x}`} x={X(x)} y={Y(0) + 15} textAnchor="middle" fontSize={12} fill={MUTED}>{x}</text>)}
                {yMarks.map((y) => <text key={`ty${y}`} x={X(0) - 5} y={Y(y) + 4} textAnchor="end" fontSize={11} fill={MUTED}>{y}</text>)}
                <text x={X(LONG_RUN_T + 1.5)} y={Y(0) - 6} textAnchor="end" fontSize={13} fontWeight={700} fill={INK}>t</text>
                <circle cx={X(0)} cy={Y(start)} r={6.5} fill={INK} stroke={PAPER} strokeWidth={1.5} />
                {shown && <line x1={X(0)} x2={X(LONG_RUN_T)} y1={Y(state.A)} y2={Y(state.A)} stroke={SECOND} strokeWidth={2} strokeDasharray="7 5" />}
                {shown && <text x={X(LONG_RUN_T)} y={Y(state.A) - 6} textAnchor="end" fontSize={13} fontWeight={700} fill={SECOND}>y = {state.A}</text>}
                {shown && <path d={curvePath((x) => longRunAt(state, x), 0, walker, X, Y, 0, top)} fill="none" stroke={STAGE} strokeWidth={3.4} />}
                {shown && <circle cx={X(walker)} cy={Y(longRunAt(state, walker))} r={7} fill={progress >= 1 ? GREEN : MUSTARD} stroke={PAPER} strokeWidth={1.6} />}
                {!shown && <Hidden x={X(LONG_RUN_T * 0.6)} y={Y(top * 0.6)} size={26} />}
            </Board>
            <PlayButton label={l(say('Denbora aurrera', 'Avanza el tiempo', 'تقدّم الزمن', 'Run the time'))} disabled={!shown} playing={playback.playing} onPlay={playback.play} />
        </ToolFrame>
    )
}

/* ---------- L2. The tariff that does not jump ---------- */

export function TariffTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const t = (value: number) => tex(value, props.language)
    const [state, setState] = useState<TariffState>(initialTariffState)
    const shown = state.prediction !== null
    const playback = usePlayback(`${state.first}-${state.second}-${state.L}-${state.k}`, 1600)
    const progress = !shown ? 0 : playback.progress === null ? 1 : playback.progress
    const values = [leftAt(state), rightAt(state), tariffAt(state, TARIFF_X), 0]
    const top = Math.max(10, Math.ceil(Math.max(...values) / 10) * 10)
    const bottom = Math.min(0, Math.floor(Math.min(...values) / 10) * 10)
    const X = (x: number) => 46 + x * 14
    const Y = (y: number) => 262 - ((y - bottom) / (top - bottom)) * 226
    const walker = TARIFF_X * progress
    const p1 = firstPrice(state)
    const p2 = secondPrice(state)
    const jump = jumpOf(state)
    const controls = (
        <>
            <Segmented<string> label="p₁" value={String(state.first)} options={TARIFF_FIRST.map((price, index) => ({ value: String(index), label: decimalLabel(price, props.language) }))} onChange={(first) => setState((s) => setTariff(s, { first: Number(first) }))} />
            <Segmented<string> label="p₂" value={String(state.second)} options={TARIFF_SECOND.map((price, index) => ({ value: String(index), label: decimalLabel(price, props.language) }))} onChange={(second) => setState((s) => setTariff(s, { second: Number(second) }))} />
            <Stepper label="L" value={state.L} min={TARIFF_LIMITS.L.min} max={TARIFF_LIMITS.L.max} step={TARIFF_LIMITS.L.step} onChange={(L) => setState((s) => setTariff(s, { L }))} language={props.language} />
            <Stepper label="k" value={state.k} min={TARIFF_LIMITS.k.min} max={TARIFF_LIMITS.k.max} onChange={(k) => setState((s) => setTariff(s, { k }))} language={props.language} />
        </>
    )
    const coefficient = (value: number) => (value === 1 ? '' : t(value))
    const formula = `C(x)=\\begin{cases}${coefficient(p1)}x & x\\le ${state.L}\\\\ ${coefficient(p2)}x${state.k < 0 ? '-' : '+'}${Math.abs(state.k)} & x>${state.L}\\end{cases}`
    const readout = (
        <Predict
            language={props.language}
            question={say(`Ikusi aurretik: $x=${state.L}$ puntuan, bigarren zatia lehena amaitzen den baino beherago, leku berean ala gorago hasten da?`, `Antes de verlo: en $x=${state.L}$, ¿el segundo trozo empieza más abajo, en el mismo sitio o más arriba de donde acaba el primero?`, `قبل أن ترى: عند $x=${state.L}$، هل يبدأ الجزء الثاني أسفل نهاية الأول أم عندها أم أعلى منها؟`, `Before you see it: at $x=${state.L}$, does the second piece start lower than, at or higher than where the first one ends?`)}
            labels={{ '<': say('Beherago: jaitsi', 'Más abajo: baja', 'أسفل: تنزل', 'Lower: it drops'), '=': say('Leku berean', 'En el mismo sitio', 'عندها', 'At the same place'), '>': say('Gorago: igo', 'Más arriba: sube', 'أعلى: تصعد', 'Higher: it rises') }}
            actual={tariffPrediction(state)}
            choice={state.prediction}
            tip={say('Ezkerretik $p_1\\cdot L$; eskuinetik $p_2\\cdot L+k$. Alderatu bi zenbakiak.', 'Por la izquierda, $p_1\\cdot L$; por la derecha, $p_2\\cdot L+k$. Compara los dos números.', 'من اليسار $p_1\\cdot L$، ومن اليمين $p_2\\cdot L+k$. قارن بين العددين.', 'From the left, $p_1\\cdot L$; from the right, $p_2\\cdot L+k$. Compare the two numbers.')}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout
                latex={[formula, `\\lim_{x\\to ${state.L}^-}C(x)=${t(leftAt(state))}`, `\\lim_{x\\to ${state.L}^+}C(x)=${t(rightAt(state))}`, `${t(rightAt(state))}-${t(leftAt(state))}=${t(jump)}`]}
                note={l(jump === 0
                    ? say('Bi limiteak berdinak: tarifa jarraitua da.', 'Los dos límites coinciden: la tarifa es continua.', 'النهايتان متساويتان: التعرفة متصلة.', 'Both limits match: the tariff is continuous.')
                    : say('Bi limiteak desberdinak: jauzi finitua.', 'Los dos límites son distintos: salto finito.', 'النهايتان مختلفتان: قفزة منتهية.', 'The two limits differ: a finite jump.'))}
            />
        </Predict>
    )
    const yMarks = marks(top).filter((y) => y > bottom)
    const xMarks = [0, 4, 8, 12, 16, 20]
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={tariffChallenges} extraChallenges={tariffExtra} state={state}>
            <Board height={292} label={l(say('Bi zatiko tarifa eta haien lotura', 'Una tarifa de dos trozos y su unión', 'تعرفة من جزأين ونقطة وصلهما', 'A two-piece tariff and its join'))}>
                <rect x={X(0)} y={Y(top)} width={X(TARIFF_X) - X(0)} height={Y(bottom) - Y(top)} fill={PAPER} />
                {xMarks.map((x) => <line key={`gx${x}`} x1={X(x)} x2={X(x)} y1={Y(bottom)} y2={Y(top)} stroke={GRID} strokeWidth={1} />)}
                {yMarks.map((y) => <line key={`gy${y}`} x1={X(0)} x2={X(TARIFF_X)} y1={Y(y)} y2={Y(y)} stroke={GRID} strokeWidth={1} />)}
                <line x1={X(0)} x2={X(TARIFF_X + 0.8)} y1={Y(0)} y2={Y(0)} stroke={INK} strokeWidth={1.5} />
                <line x1={X(0)} x2={X(0)} y1={Y(bottom)} y2={Y(top)} stroke={INK} strokeWidth={1.5} />
                {xMarks.map((x) => <text key={`tx${x}`} x={X(x)} y={Y(0) + 15} textAnchor="middle" fontSize={12} fill={MUTED}>{x}</text>)}
                {yMarks.map((y) => <text key={`ty${y}`} x={X(0) - 5} y={Y(y) + 4} textAnchor="end" fontSize={11} fill={MUTED}>{y}</text>)}
                <line x1={X(state.L)} x2={X(state.L)} y1={Y(bottom)} y2={Y(top)} stroke={INK} strokeWidth={1.4} strokeDasharray="4 3" />
                <text x={X(state.L)} y={Y(top) + 14} textAnchor="middle" fontSize={13} fontWeight={700} fill={INK}>L</text>
                <path d={`M ${X(0)} ${Y(0)} L ${X(state.L)} ${Y(leftAt(state))}`} fill="none" stroke={SECOND} strokeWidth={3.4} />
                <circle cx={X(state.L)} cy={Y(leftAt(state))} r={6} fill={SECOND} stroke={PAPER} strokeWidth={1.5} />
                {shown && <path d={`M ${X(state.L)} ${Y(rightAt(state))} L ${X(TARIFF_X)} ${Y(tariffAt(state, TARIFF_X))}`} fill="none" stroke={GREEN} strokeWidth={3.4} />}
                {shown && jump !== 0 && <circle cx={X(state.L)} cy={Y(rightAt(state))} r={6} fill={PAPER} stroke={GREEN} strokeWidth={2.4} />}
                {shown && jump !== 0 && <line x1={X(state.L) + 12} x2={X(state.L) + 12} y1={Y(leftAt(state))} y2={Y(rightAt(state))} stroke={MUSTARD} strokeWidth={3} />}
                {shown && <circle cx={X(walker)} cy={Y(tariffAt(state, walker))} r={7} fill={progress >= 1 ? GREEN : MUSTARD} stroke={PAPER} strokeWidth={1.6} />}
                {!shown && <Hidden x={X((state.L + TARIFF_X) / 2)} y={Y((top + bottom) / 2)} size={26} />}
            </Board>
            <PlayButton label={l(say('Bezero bat aurrera', 'Avanza un cliente', 'تقدّم زبون', 'Run a customer'))} disabled={!shown} playing={playback.playing} onPlay={playback.play} />
        </ToolFrame>
    )
}
