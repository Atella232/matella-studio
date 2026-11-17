import { useId, useState } from 'react'
import { Segmented, Stepper, ToolFrame } from '../../../features/unit-v2/lab/LabKit'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import { useLabText } from '../../../features/unit-v2/lab/useLabText'
import type { LocalizedText, UnitLanguage } from '../../../features/unit-v2/types'
import { decimalSeparatorFor } from '../../../utils/numberFormat'
import { say } from '../../batx1-zientziak-funtzioak/text'
import { Board, Hidden, PlayButton, Predict, Readout } from '../../dbh3-segidak/lab/LabParts'
import { GREEN, INK, MUSTARD, MUTED, PAPER, SECOND, STAGE } from '../../dbh3-segidak/lab/labStyle'
import { setPrediction } from '../../dbh3-segidak/lab/prediction'
import { usePlayback } from '../../dbh4-aplikatuak-proportzionaltasuna/lab/usePlayback'
import { averageRateOf, initialRateState, MODELS, RATE_MODELS, rateChallenges, rateExtra, ratePrediction, setRate, STEPS, T0, type RateModel, type RateState } from './instantRate'
import { COST_KINDS, COSTS, initialNextState, marginalOf, nextChallenges, nextCostOf, nextExtra, nextPrediction, setNext, UNITS, unitsOf, type CostKind, type NextState } from './nextUnit'
import { initialSmoothState, isSmooth, jointOf, noCorner, noJump, setSmooth, SMOOTH_LIMITS, SMOOTH_SETUP, SMOOTH_SETUPS, smoothChallenges, smoothExtra, smoothLatex, smoothPrediction, type SmoothSetup, type SmoothState } from './smoothTariff'

/* ==========================================================================
   Deribatuak · Batxilergoa 2 · Gizarte Zientziak — the three tools of this
   unit: the next unit, from the average to the instantaneous, and smooth
   the tariff. Each asks for a prediction before it shows the drawing; the
   first two move with ▶. The boards carry numbers and formulas only; the
   words go in the readout. Logic in nextUnit.ts, instantRate.ts and
   smoothTariff.ts.
   ========================================================================== */

const LEFT = 40
const TOP = 20
const WIDTH = 300
const HEIGHT = 200

/** A number with the language's decimal mark */
const dec = (value: number, language: UnitLanguage, digits = 2) => {
    const text = String(Math.round(value * 10 ** digits) / 10 ** digits)
    return (language === 'ar' ? text : text.replace('.', decimalSeparatorFor(language))).replace('-', '−')
}
/** The same inside a formula */
const tex = (value: number, language: UnitLanguage, digits = 2) => {
    const text = String(Math.round(value * 10 ** digits) / 10 ** digits)
    return language === 'ar' ? text : text.replace('.', '{,}')
}
const arabicPoint = (latex: string, language: UnitLanguage) => (language === 'ar' ? latex.replace(/\{,\}/g, '.') : latex)

function useClip() {
    const id = useId().replace(/:/g, '')
    return { defs: <defs><clipPath id={id}><rect x={LEFT} y={TOP} width={WIDTH} height={HEIGHT} /></clipPath></defs>, url: `url(#${id})` }
}

/** Real coordinates to the board */
function frame(view: { xMin: number; xMax: number; yMin: number; yMax: number }) {
    return {
        X: (x: number) => LEFT + ((x - view.xMin) / (view.xMax - view.xMin)) * WIDTH,
        Y: (y: number) => TOP + ((view.yMax - y) / (view.yMax - view.yMin)) * HEIGHT
    }
}

/** A sampled curve as an SVG path */
function path(fn: (x: number) => number, from: number, to: number, X: (x: number) => number, Y: (y: number) => number): string {
    const points: string[] = []
    for (let i = 0; i <= 120; i++) {
        const x = from + ((to - from) * i) / 120
        points.push(`${i ? 'L' : 'M'} ${X(x).toFixed(1)} ${Y(fn(x)).toFixed(1)}`)
    }
    return points.join(' ')
}

/** Paper, light grid lines every step and the two axes where they fall inside */
function Grid({ view, X, Y, xStep, yStep, language }: { view: { xMin: number; xMax: number; yMin: number; yMax: number }; X: (x: number) => number; Y: (y: number) => number; xStep: number; yStep: number; language: UnitLanguage }) {
    const xs: number[] = []
    for (let x = Math.ceil(view.xMin / xStep) * xStep; x <= view.xMax + 1e-9; x += xStep) xs.push(x)
    const ys: number[] = []
    for (let y = Math.ceil(view.yMin / yStep) * yStep; y <= view.yMax + 1e-9; y += yStep) ys.push(y)
    const axisY = Y(Math.min(view.yMax, Math.max(view.yMin, 0)))
    const axisX = X(Math.min(view.xMax, Math.max(view.xMin, 0)))
    return (
        <g>
            <rect x={LEFT} y={TOP} width={WIDTH} height={HEIGHT} fill={PAPER} />
            {xs.map((x) => <line key={`x${x}`} x1={X(x)} x2={X(x)} y1={TOP} y2={TOP + HEIGHT} stroke="#e6dfd2" strokeWidth={1} />)}
            {ys.map((y) => <line key={`y${y}`} x1={LEFT} x2={LEFT + WIDTH} y1={Y(y)} y2={Y(y)} stroke="#e6dfd2" strokeWidth={1} />)}
            <line x1={LEFT} x2={LEFT + WIDTH} y1={axisY} y2={axisY} stroke={INK} strokeWidth={1.4} />
            <line x1={axisX} x2={axisX} y1={TOP} y2={TOP + HEIGHT} stroke={INK} strokeWidth={1.4} />
            {xs.filter((x) => Math.abs(x) > 1e-9).map((x) => <text key={`tx${x}`} x={X(x)} y={TOP + HEIGHT + 16} textAnchor="middle" fontSize={11} fill={MUTED}>{dec(x, language)}</text>)}
            {ys.filter((y) => Math.abs(y) > 1e-9).map((y) => <text key={`ty${y}`} x={LEFT - 5} y={Y(y) + 4} textAnchor="end" fontSize={11} fill={MUTED}>{dec(y, language)}</text>)}
        </g>
    )
}

/* ---------- L1. The next unit ---------- */

const COST_NAMES: Record<CostKind, LocalizedText> = {
    line: say('Lineala', 'Lineal', 'خطية', 'Linear'),
    crowded: say('Beteta', 'Llena', 'مزدحمة', 'Crowded'),
    scale: say('Eskala', 'Escala', 'الحجم', 'Scale')
}

export function NextUnitTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const lang = props.language
    const [state, setState] = useState<NextState>(initialNextState)
    const shown = state.prediction !== null
    const { c, latex } = COSTS[state.kind]
    const x = unitsOf(state)
    const marginal = marginalOf(state)
    const next = nextCostOf(state)
    // A window of six units around x, tall enough for the tangent and the step
    const view = { xMin: x - 1, xMax: x + 3, yMin: c(x) - 1.6 * Math.abs(marginal) - 2, yMax: c(x) + 3 * Math.abs(marginal) + 2 }
    const { X, Y } = frame(view)
    const clip = useClip()
    const controls = (
        <>
            <Segmented<CostKind> label={l(say('Kostua', 'Coste', 'التكلفة', 'Cost'))} value={state.kind} options={COST_KINDS.map((kind) => ({ value: kind, label: l(COST_NAMES[kind]) }))} onChange={(kind) => setState((s) => setNext(s, { kind }))} />
            <Stepper label={l(say('Unitateak, x', 'Unidades, x', 'الوحدات، x', 'Units, x'))} value={state.step} min={0} max={UNITS.length - 1} format={(index) => String(UNITS[index])} onChange={(step) => setState((s) => setNext(s, { step }))} language={lang} />
        </>
    )
    const note = state.kind === 'line'
        ? say("Zuzen batean, hurrengo unitateak zehazki $C'(x)$ kostatzen du.", "En una recta, la unidad siguiente cuesta justo $C'(x)$.", "في المستقيم تكلّف الوحدة التالية $C'(x)$ تمامًا.", "On a line, the next unit costs exactly $C'(x)$.")
        : state.kind === 'crowded'
            ? say("Kurba gorantz okertzen da: hurrengo unitateak $C'(x)$ baino apur bat gehiago kostatzen du.", "La curva se dobla hacia arriba: la unidad siguiente cuesta un poco más que $C'(x)$.", "ينحني المنحنى إلى الأعلى: تكلّف الوحدة التالية أكثر قليلًا من $C'(x)$.", "The curve bends upwards: the next unit costs a little more than $C'(x)$.")
            : say("Kurba beherantz okertzen da: hurrengo unitateak $C'(x)$ baino apur bat gutxiago kostatzen du.", "La curva se dobla hacia abajo: la unidad siguiente cuesta un poco menos que $C'(x)$.", "ينحني المنحنى إلى الأسفل: تكلّف الوحدة التالية أقل قليلًا من $C'(x)$.", "The curve bends downwards: the next unit costs a little less than $C'(x)$.")
    const readout = (
        <Predict
            language={lang}
            question={say(`Ikusi aurretik: $${latex}$ bada, hurrengo unitateak $C'(x)$ baino gutxiago, berdin ala gehiago kostatzen du?`, `Antes de verlo: con $${latex}$, ¿la unidad siguiente cuesta menos, lo mismo o más que $C'(x)$?`, `قبل أن ترى: مع $${latex}$، هل تكلّف الوحدة التالية أقل من $C'(x)$ أم مثلها أم أكثر؟`, `Before you see it: with $${latex}$, does the next unit cost less than, the same as or more than $C'(x)$?`)}
            labels={{ '<': say('Gutxiago', 'Menos', 'أقل', 'Less'), '=': say('Berdin', 'Lo mismo', 'مثلها', 'The same'), '>': say('Gehiago', 'Más', 'أكثر', 'More') }}
            actual={nextPrediction(state)}
            choice={state.prediction}
            tip={say('Begiratu kurba zuzena den, gorantz okertzen den ala beherantz.', 'Mira si la curva es recta, se dobla hacia arriba o hacia abajo.', 'انظر هل المنحنى مستقيم أم ينحني إلى الأعلى أم إلى الأسفل.', 'Look whether the curve is straight, bends up or bends down.')}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout latex={[arabicPoint(latex, lang), `C'(${x})=${tex(marginal, lang, 3)}`, `C(${x + 1})-C(${x})=${tex(next, lang, 3)}`]} note={l(note)} />
        </Predict>
    )
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={nextChallenges} extraChallenges={nextExtra} state={state}>
            <Board height={264} label={l(say(`Kostua ${x} unitatearen inguruan`, `El coste cerca de ${x} unidades`, `التكلفة قرب ${x} وحدة`, `The cost near ${x} units`))}>
                {clip.defs}
                <rect x={LEFT} y={TOP} width={WIDTH} height={HEIGHT} fill={PAPER} />
                {[x - 1, x, x + 1, x + 2, x + 3].map((tick) => <line key={tick} x1={X(tick)} x2={X(tick)} y1={TOP} y2={TOP + HEIGHT} stroke="#e6dfd2" strokeWidth={1} />)}
                {[x, x + 1].map((tick) => <text key={tick} x={X(tick)} y={TOP + HEIGHT + 16} textAnchor="middle" fontSize={11} fill={MUTED}>{tick}</text>)}
                <text x={LEFT + WIDTH} y={TOP + HEIGHT + 32} textAnchor="end" fontSize={12} fontWeight={700} fill={MUTED}>x</text>
                {shown ? (
                    <g>
                        <g clipPath={clip.url}>
                            <path d={path(c, x - 1, x + 3, X, Y)} fill="none" stroke={STAGE} strokeWidth={3.2} />
                            <path d={path((t) => c(x) + marginal * (t - x), x - 1, x + 3, X, Y)} fill="none" stroke={SECOND} strokeWidth={2} strokeDasharray="7 5" />
                        </g>
                        <line x1={X(x + 1)} x2={X(x + 1)} y1={Y(c(x))} y2={Y(c(x + 1))} stroke={GREEN} strokeWidth={3} />
                        <line x1={X(x)} x2={X(x + 1)} y1={Y(c(x))} y2={Y(c(x))} stroke={GREEN} strokeWidth={1.6} strokeDasharray="4 3" />
                        <circle cx={X(x)} cy={Y(c(x))} r={5.5} fill={INK} />
                        <circle cx={X(x + 1)} cy={Y(c(x + 1))} r={5.5} fill={GREEN} />
                        <text x={LEFT + 6} y={TOP + 16} fontSize={13} fontWeight={700} fill={SECOND} direction="ltr">{`C'(${x}) = ${dec(marginal, lang, 3)}`}</text>
                        <text x={LEFT + 6} y={TOP + 34} fontSize={13} fontWeight={700} fill={GREEN} direction="ltr">{`ΔC = ${dec(next, lang, 3)}`}</text>
                    </g>
                ) : <Hidden x={190} y={120} />}
            </Board>
        </ToolFrame>
    )
}

/* ---------- L2. From the average to the instantaneous ---------- */

const MODEL_NAMES: Record<RateModel, LocalizedText> = {
    sales: say('Salmentak', 'Ventas', 'المبيعات', 'Sales'),
    users: say('Erabiltzaileak', 'Usuarios', 'المستخدمون', 'Users'),
    line: say('Lineala', 'Lineal', 'خطي', 'Linear')
}

export function InstantRateTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const lang = props.language
    const [state, setState] = useState<RateState>(initialRateState)
    const shown = state.prediction !== null
    const playback = usePlayback(`${state.model}-${state.step}`, 2400)
    const step = shown && playback.progress !== null ? Math.round(playback.progress * (STEPS.length - 1)) : state.step
    const model = MODELS[state.model]
    const h = STEPS[step]
    const rate = averageRateOf({ model: state.model, step })
    const view = { xMin: 0, xMax: 7, yMin: 0, yMax: model.yMax }
    const { X, Y } = frame(view)
    const clip = useClip()
    const controls = (
        <>
            <Segmented<RateModel> label={l(say('Eredua', 'Modelo', 'النموذج', 'Model'))} value={state.model} options={RATE_MODELS.map((value) => ({ value, label: l(MODEL_NAMES[value]) }))} onChange={(value) => setState((s) => setRate(s, { model: value }))} />
            <Stepper label={l(say('Tartea, h', 'Intervalo, h', 'الفترة، h', 'Interval, h'))} value={state.step} min={0} max={STEPS.length - 1} format={(index) => dec(STEPS[index], lang)} onChange={(value) => setState((s) => setRate(s, { step: value }))} language={lang} />
        </>
    )
    const fa = model.f(T0)
    const readout = (
        <Predict
            language={lang}
            question={say(`Ikusi aurretik: $${model.latex}$ ereduan, $h$ txikitzean, $[2,2+h]$ tarteko T.V.M. jaitsi, berdin geratu ala igo egiten da?`, `Antes de verlo: en $${model.latex}$, al encoger $h$, la T.V.M. en $[2,2+h]$ ¿baja, se queda igual o sube?`, `قبل أن ترى: في $${model.latex}$، عند تصغير $h$، هل ينخفض معدل التغير المتوسط في $[2,2+h]$ أم يبقى أم يرتفع؟`, `Before you see it: in $${model.latex}$, as $h$ shrinks, does the average rate on $[2,2+h]$ go down, stay or go up?`)}
            labels={{ '<': say('Jaitsi', 'Baja', 'ينخفض', 'Goes down'), '=': say('Berdin', 'Igual', 'يبقى', 'Stays'), '>': say('Igo', 'Sube', 'يرتفع', 'Goes up') }}
            actual={ratePrediction(state)}
            choice={state.prediction}
            tip={say('Begiratu kurba nola okertzen den $t=2$ puntutik eskuinera.', 'Mira cómo se dobla la curva a la derecha de $t=2$.', 'انظر كيف ينحني المنحنى يمين $t=2$.', 'Look at how the curve bends to the right of $t=2$.')}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout latex={[model.latex, `h=${tex(h, lang)}`, `\\frac{f(2+h)-f(2)}{h}=${tex(rate, lang, 3)}`]} note={l(say(`Tartea txikitzean, T.V.M. ${model.instant} baliora hurbiltzen da: hori da tasa unekoa $t=2$ puntuan.`, `Al encoger el intervalo, la T.V.M. se acerca a ${model.instant}: la tasa instantánea en $t=2$.`, `عند تصغير الفترة يقترب معدل التغير المتوسط من ${model.instant}: المعدل اللحظي عند $t=2$.`, `As the interval shrinks, the average rate approaches ${model.instant}: the instantaneous rate at $t=2$.`))} />
        </Predict>
    )
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={rateChallenges} extraChallenges={rateExtra} state={state}>
            <Board height={264} label={l(say(`${l(MODEL_NAMES[state.model])}: ebakitzailea $[2,2+h]$ tartean`, `${l(MODEL_NAMES[state.model])}: la secante en $[2,2+h]$`, `${l(MODEL_NAMES[state.model])}: القاطع في $[2,2+h]$`, `${l(MODEL_NAMES[state.model])}: the secant on $[2,2+h]$`)).replace(/\$/g, '')}>
                {clip.defs}
                <Grid view={view} X={X} Y={Y} xStep={1} yStep={10} language={lang} />
                <text x={LEFT + WIDTH} y={TOP + HEIGHT + 32} textAnchor="end" fontSize={12} fontWeight={700} fill={MUTED}>t</text>
                {shown ? (
                    <g>
                        <g clipPath={clip.url}>
                            <path d={path(model.f, 0, 7, X, Y)} fill="none" stroke={STAGE} strokeWidth={3.2} />
                            <path d={path((t) => fa + model.instant * (t - T0), 0, 7, X, Y)} fill="none" stroke={MUSTARD} strokeWidth={1.6} strokeDasharray="4 4" />
                            <path d={path((t) => fa + rate * (t - T0), 0, 7, X, Y)} fill="none" stroke={SECOND} strokeWidth={2.4} />
                        </g>
                        <circle cx={X(T0)} cy={Y(fa)} r={5.5} fill={INK} />
                        <circle cx={X(T0 + h)} cy={Y(model.f(T0 + h))} r={5.5} fill={SECOND} />
                        <text x={LEFT + 6} y={TOP + 16} fontSize={13} fontWeight={700} fill={SECOND} direction="ltr">{`T.V.M. = ${dec(rate, lang, 3)}`}</text>
                    </g>
                ) : <Hidden x={190} y={120} />}
            </Board>
            <PlayButton label={l(say('Txikitu tartea', 'Encoge el intervalo', 'صغّر الفترة', 'Shrink the interval'))} disabled={!shown} playing={playback.playing} onPlay={playback.play} />
        </ToolFrame>
    )
}

/* ---------- L3. Smooth the tariff ---------- */

const SMOOTH_NAMES: Record<SmoothSetup, string> = { s1: 'f₁', s2: 'f₂', s3: 'f₃' }

export function SmoothTariffTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const lang = props.language
    const [state, setState] = useState<SmoothState>(initialSmoothState)
    const shown = state.prediction !== null
    const setup = SMOOTH_SETUP[state.setup]
    const { X, Y } = frame(setup.view)
    const clip = useClip()
    const [leftValue, rightValue, leftSlope, rightSlope] = jointOf(state)
    const minus = (value: number) => (value < 0 ? `−${-value}` : String(value))
    const p = setup.p
    const controls = (
        <>
            <Segmented<SmoothSetup> label={l(say('Funtzioa', 'Función', 'الدالة', 'Function'))} value={state.setup} options={SMOOTH_SETUPS.map((value) => ({ value, label: SMOOTH_NAMES[value] }))} onChange={(value) => setState((s) => setSmooth(s, { setup: value }))} />
            <Stepper label="a" value={state.a} min={SMOOTH_LIMITS.a.min} max={SMOOTH_LIMITS.a.max} format={minus} onChange={(a) => setState((s) => setSmooth(s, { a }))} language={lang} />
            <Stepper label="b" value={state.b} min={SMOOTH_LIMITS.b.min} max={SMOOTH_LIMITS.b.max} format={minus} onChange={(b) => setState((s) => setSmooth(s, { b }))} language={lang} />
        </>
    )
    const note = isSmooth(state)
        ? say('Ez jauzirik ez puntarik: lotura leuna, deribagarria.', 'Ni salto ni pico: unión suave, derivable.', 'لا قفزة ولا زاوية: التقاء أملس قابل للاشتقاق.', 'No jump and no corner: a smooth, differentiable joint.')
        : noJump(state)
            ? say('Jauzirik ez, baina punta bat: jarraitua, ez deribagarria.', 'Sin salto, pero con pico: continua, no derivable.', 'بلا قفزة لكن بزاوية: متصلة وغير قابلة للاشتقاق.', 'No jump, but a corner: continuous, not differentiable.')
            : noCorner(state)
                ? say('Malda bera, baina jauzi bat: ez da jarraitua.', 'La misma pendiente, pero con salto: no es continua.', 'الميل نفسه لكن بقفزة: ليست متصلة.', 'The same slope, but a jump: not continuous.')
                : say('Jauzia eta punta: aldatu $a$ eta $b$.', 'Salto y pico: cambia $a$ y $b$.', 'قفزة وزاوية: غيّر $a$ و$b$.', 'A jump and a corner: change $a$ and $b$.')
    const readout = (
        <Predict
            language={lang}
            question={say(`Ikusi aurretik: $${smoothLatex(state)}$ funtzioan, zenbat baldintza behar dira jauzirik eta puntarik ez egoteko?`, `Antes de verlo: en $${smoothLatex(state)}$, ¿cuántas condiciones hacen falta para que no haya ni salto ni pico?`, `قبل أن ترى: في $${smoothLatex(state)}$، كم شرطًا يلزم كي لا توجد قفزة ولا زاوية؟`, `Before you see it: in $${smoothLatex(state)}$, how many conditions are needed for no jump and no corner?`)}
            labels={{ '<': say('Bat', 'Una', 'شرط واحد', 'One'), '=': say('Bi', 'Dos', 'شرطان', 'Two'), '>': say('Hiru', 'Tres', 'ثلاثة شروط', 'Three') }}
            actual={smoothPrediction()}
            choice={state.prediction}
            tip={say('Jauzirik ez: balio bera. Puntarik ez: malda bera.', 'Sin salto: el mismo valor. Sin pico: la misma pendiente.', 'بلا قفزة: القيمة نفسها. بلا زاوية: الميل نفسه.', 'No jump: the same value. No corner: the same slope.')}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout latex={[smoothLatex(state), `f(${p})=${leftValue}\\qquad ${p}a+b=${rightValue}`, `f'(${p}^-)=${leftSlope}\\qquad a=${rightSlope}`]} note={l(note)} />
        </Predict>
    )
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={smoothChallenges} extraChallenges={smoothExtra} state={state}>
            <Board height={264} label={l(say(`${SMOOTH_NAMES[state.setup]} funtzioaren bi zatiak`, `Los dos trozos de ${SMOOTH_NAMES[state.setup]}`, `جزآ الدالة ${SMOOTH_NAMES[state.setup]}`, `The two pieces of ${SMOOTH_NAMES[state.setup]}`))}>
                {clip.defs}
                <Grid view={setup.view} X={X} Y={Y} xStep={1} yStep={setup.view.yMax > 12 ? 4 : 2} language={lang} />
                {shown ? (
                    <g>
                        <g clipPath={clip.url}>
                            <path d={path(setup.f, setup.view.xMin, p, X, Y)} fill="none" stroke={STAGE} strokeWidth={3.2} />
                            <path d={path((x) => state.a * x + state.b, p, setup.view.xMax, X, Y)} fill="none" stroke={isSmooth(state) ? GREEN : SECOND} strokeWidth={3.2} />
                        </g>
                        {!noJump(state) && <line x1={X(p)} x2={X(p)} y1={Y(leftValue)} y2={Y(rightValue)} stroke={SECOND} strokeWidth={1.6} strokeDasharray="4 3" />}
                        <circle cx={X(p)} cy={Y(leftValue)} r={5.5} fill={isSmooth(state) ? GREEN : STAGE} />
                        {!noJump(state) && <circle cx={X(p)} cy={Y(rightValue)} r={5.5} fill={PAPER} stroke={SECOND} strokeWidth={2.4} />}
                    </g>
                ) : <Hidden x={190} y={120} />}
            </Board>
        </ToolFrame>
    )
}

