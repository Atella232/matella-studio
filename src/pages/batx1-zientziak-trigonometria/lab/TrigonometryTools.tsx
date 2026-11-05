import { useState } from 'react'
import { Segmented, Stepper, ToolFrame } from '../../../features/unit-v2/lab/LabKit'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import { useLabText } from '../../../features/unit-v2/lab/useLabText'
import type { LocalizedText, UnitLanguage } from '../../../features/unit-v2/types'
import { Board, Hidden, PlayButton, Predict, Readout } from '../../dbh3-segidak/lab/LabParts'
import { dec, GREEN, INK, MUSTARD, MUTED, PAPER, SECOND, STAGE, STAGE_TINT, texDec } from '../../dbh3-segidak/lab/labStyle'
import { setPrediction } from '../../dbh3-segidak/lab/prediction'
import { usePlayback } from '../../dbh4-aplikatuak-proportzionaltasuna/lab/usePlayback'
import { localize, say } from '../text'
import { combinedAngle, formulaValue, initialSumState, mistakeValue, ratioOf, setSum, SUM_LIMITS, sumChallenges, sumExtra, sumPrediction, type SumOperation, type SumRatio, type SumState } from './sum'
import { initialSpinState, setSpin, spinBase, spinChallenges, spinCount, spinExtra, SPIN_LIMITS, SPIN_VALUES, spinPlain, spinPrediction, spinSolutions, type SpinRatio, type SpinState } from './spin'
import { initialSixState, setSix, sixChallenges, sixExtra, SIX_LIMITS, sixPrediction, SIX_RATIOS, sixTex, sixValue, type SixRatio, type SixState } from './six'

/* ==========================================================================
   Formula eta funtzio trigonometrikoak · Batxilergoa 1 · Zientziak — the
   three tools of this unit: two angles that add up (the ratio of α ± β
   against the ratios of α and β added, as two bars), the solutions that
   go round (u = n·x turns n times while x goes from 0° to 360°, and the
   solutions fall on a ruler) and the six ratios on the circle (the
   tangent line x = 1 and the cotangent line y = 1). Each asks for a
   prediction before it shows the result, and each moves with ▶. Logic in
   sum.ts, spin.ts and six.ts.
   ========================================================================== */

const D = Math.PI / 180
type Point = [number, number]
/** A formula with \sen, \tg, \cosec and \cotg in the language's names */
const tex = (language: UnitLanguage, latex: string) => localize(language, latex)
/** The name of a ratio as plain text, for the boards and the buttons */
const NAMES: Record<UnitLanguage, Record<SixRatio, string>> = {
    es: { sin: 'sen', cos: 'cos', tan: 'tg', csc: 'cosec', sec: 'sec', cot: 'cotg' },
    eu: { sin: 'sin', cos: 'cos', tan: 'tg', csc: 'cosec', sec: 'sec', cot: 'cotg' },
    en: { sin: 'sin', cos: 'cos', tan: 'tan', csc: 'csc', sec: 'sec', cot: 'cot' },
    ar: { sin: 'sin', cos: 'cos', tan: 'tan', csc: 'csc', sec: 'sec', cot: 'cot' }
}
const polar = ([cx, cy]: Point, r: number, degrees: number): Point => [cx + r * Math.cos(degrees * D), cy - r * Math.sin(degrees * D)]
/** A number on a board, with two decimals at most and a true minus sign */
const num = (value: number, language: UnitLanguage) => dec(value, language, 2).replace(/^-/, '−')
/** A degree value for LaTeX: 112{,}5° */
const texDegrees = (value: number, language: UnitLanguage) => `${texDec(value, language, 1)}°`
/** = for a value with no decimals, ≈ otherwise */
const equalsOrNear = (value: number, language: UnitLanguage) => (Math.abs(value * 100 - Math.round(value * 100)) < 1e-9 ? `=${texDec(value, language, 2)}` : `\\approx ${texDec(value, language, 2)}`)

/** An arc at v from screen angle `from` to `to` (degrees, counterclockwise when to > from) */
function Arc({ v, r, from, to, color, width = 2.4 }: { v: Point; r: number; from: number; to: number; color: string; width?: number }) {
    if (Math.abs(to - from) < 0.5) return null
    const [a, b] = to > from ? [from, to] : [to, from]
    const start = polar(v, r, a)
    const end = polar(v, r, b)
    const large = b - a > 180 ? 1 : 0
    return <path d={`M${start[0].toFixed(1)} ${start[1].toFixed(1)} A${r} ${r} 0 ${large} 0 ${end[0].toFixed(1)} ${end[1].toFixed(1)}`} fill="none" stroke={color} strokeWidth={width} />
}

/** The circle of radius 1 with its axes */
function UnitCircle({ o, r }: { o: Point; r: number }) {
    return (
        <g>
            <line x1={o[0] - r - 14} y1={o[1]} x2={o[0] + r + 14} y2={o[1]} stroke={MUTED} strokeWidth={1.2} />
            <line x1={o[0]} y1={o[1] - r - 14} x2={o[0]} y2={o[1] + r + 14} stroke={MUTED} strokeWidth={1.2} />
            <circle cx={o[0]} cy={o[1]} r={r} fill="none" stroke={INK} strokeWidth={2} />
        </g>
    )
}

/* ---------- L1. Two angles that add up ---------- */

export function SumTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<SumState>(initialSumState)
    const shown = state.prediction !== null
    const names = NAMES[props.language]
    const playback = usePlayback(`${state.alpha}-${state.beta}-${state.ratio}-${state.operation}`, 1600)
    const plus = state.operation === 'plus'
    const sign = plus ? 1 : -1
    // ▶ turns β from 0 to its value; the state does not change
    const beta = shown && playback.progress !== null ? state.beta * playback.progress : state.beta
    const end = state.alpha + sign * beta
    const O: Point = [112, 120]
    const R = 88
    const P = polar(O, R, end)
    const A = polar(O, R, state.alpha)
    const value = ratioOf(state.ratio, end)
    const truth = formulaValue(state)
    const mistake = mistakeValue(state)
    const op = plus ? '+' : '-'
    const name = state.ratio === 'sin' ? '\\sen' : '\\cos'
    const combined = combinedAngle(state)
    const generic = state.ratio === 'sin'
        ? `\\sen(\\alpha${op}\\beta)=\\sen\\alpha\\cos\\beta${op}\\cos\\alpha\\sen\\beta`
        : `\\cos(\\alpha${op}\\beta)=\\cos\\alpha\\cos\\beta${plus ? '-' : '+'}\\sen\\alpha\\sen\\beta`
    const lines = [
        generic,
        `${name}(${state.alpha}°${op}${state.beta}°)=${name}${combined < 0 ? `(${combined}°)` : ` ${combined}°`}${equalsOrNear(truth, props.language)}`,
        `${name} ${state.alpha}°${op}${name} ${state.beta}°${equalsOrNear(mistake, props.language)}`
    ].map((line) => tex(props.language, line))
    const ratioWord = state.ratio === 'sin' ? say('sinua', 'el seno', 'جيب', 'the sine') : say('kosinua', 'el coseno', 'جيب تمام', 'the cosine')
    const note = sumPrediction(state) === '='
        ? say('Hemen bat datoz, baina angeluetako bat 0° delako edo bira bat osatzen dutelako bakarrik.', 'Aquí coinciden, pero solo porque uno de los ángulos es 0° o porque suman una vuelta.', 'هنا يتطابقان، لكن فقط لأن إحدى الزاويتين 0° أو لأن مجموعهما دورة.', 'Here they agree, but only because one angle is 0° or because they make a full turn.')
        : plus
            ? say(`Ez datoz bat: batuketaren ${ratioWord.eu} ez da arrazoien batuketa; formulak sinuak eta kosinuak nahasten ditu.`, `No coinciden: ${ratioWord.es} de una suma no es la suma de las razones; la fórmula mezcla senos y cosenos.`, `لا يتطابقان: ${ratioWord.ar} المجموع ليس مجموع النسب؛ الصيغة تمزج الجيوب وجيوب التمام.`, `They do not agree: ${ratioWord.en} of a sum is not the sum of the ratios; the formula mixes sines and cosines.`)
            : say(`Ez datoz bat: kenketaren ${ratioWord.eu} ez da arrazoien kenketa; formulak sinuak eta kosinuak nahasten ditu.`, `No coinciden: ${ratioWord.es} de una resta no es la resta de las razones; la fórmula mezcla senos y cosenos.`, `لا يتطابقان: ${ratioWord.ar} الفرق ليس فرق النسب؛ الصيغة تمزج الجيوب وجيوب التمام.`, `They do not agree: ${ratioWord.en} of a difference is not the difference of the ratios; the formula mixes sines and cosines.`)
    const controls = (
        <>
            <Stepper label="α" value={state.alpha} min={SUM_LIMITS.min} max={SUM_LIMITS.max} step={SUM_LIMITS.step} format={(v) => `${v}°`} onChange={(alpha) => setState((s) => setSum(s, { alpha }))} language={props.language} />
            <Stepper label="β" value={state.beta} min={SUM_LIMITS.min} max={SUM_LIMITS.max} step={SUM_LIMITS.step} format={(v) => `${v}°`} onChange={(next) => setState((s) => setSum(s, { beta: next }))} language={props.language} />
            <Segmented<SumRatio> label={l(say('Arrazoia', 'Razón', 'النسبة', 'Ratio'))} value={state.ratio} options={[{ value: 'sin', label: names.sin }, { value: 'cos', label: names.cos }]} onChange={(ratio) => setState((s) => setSum(s, { ratio }))} />
            <Segmented<SumOperation> label={l(say('Eragiketa', 'Operación', 'العملية', 'Operation'))} value={state.operation} options={[{ value: 'plus', label: 'α + β' }, { value: 'minus', label: 'α − β' }]} onChange={(operation) => setState((s) => setSum(s, { operation }))} />
        </>
    )
    const question = `$${name}(\\alpha${op}\\beta)$`
    const against = `$${name}\\alpha${op}${name}\\beta$`
    const readout = (
        <Predict
            language={props.language}
            question={say(`Ikusi aurretik: ${question} txikiagoa, berdina ala handiagoa da ${against} baino?`, `Antes de verlo: ¿${question} es menor, igual o mayor que ${against}?`, `قبل أن ترى: هل ${question} أصغر من ${against} أم يساويه أم أكبر؟`, `Before you see it: is ${question} less than, equal to or greater than ${against}?`)}
            labels={{ '<': say('Txikiagoa', 'Menor', 'أصغر', 'Less'), '=': say('Berdina', 'Igual', 'يساوي', 'Equal'), '>': say('Handiagoa', 'Mayor', 'أكبر', 'Greater') }}
            actual={sumPrediction(state)}
            choice={state.prediction}
            tip={say('Pentsatu $30°+60°$ angeluan: 90° angeluaren sinua 1 da, eta sinuen batura 1 baino handiagoa.', 'Piensa en $30°+60°$: el seno de 90° es 1, y la suma de los senos pasa de 1.', 'فكّر في $30°+60°$: جيب 90° يساوي 1، ومجموع الجيبين أكبر من 1.', 'Think of $30°+60°$: the sine of 90° is 1, and the sum of the sines is more than 1.')}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout latex={lines} note={l(note)} />
        </Predict>
    )
    const k = 46
    const bar = (x: number, v: number, color: string, fill: string) => (
        <g>
            <rect x={x - 15} y={Math.min(O[1], O[1] - v * k)} width={30} height={Math.max(1, Math.abs(v) * k)} fill={fill} stroke={color} strokeWidth={1.6} />
            <text x={x} y={v >= 0 ? O[1] - v * k - 6 : O[1] - v * k + 15} textAnchor="middle" fontSize={12} fontWeight={700} fill={color}>{num(v, props.language)}</text>
        </g>
    )
    const foot: Point = [P[0], O[1]]
    const opText = plus ? '+' : '−'
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={sumChallenges} extraChallenges={sumExtra} state={state}>
            <Board height={262} label={l(say(`α = ${state.alpha}° eta β = ${state.beta}°: ${names[state.ratio]}(α ${opText} β) eta ${names[state.ratio]} α ${opText} ${names[state.ratio]} β konparatuta`, `α = ${state.alpha}° y β = ${state.beta}°: ${names[state.ratio]}(α ${opText} β) frente a ${names[state.ratio]} α ${opText} ${names[state.ratio]} β`, `α = ${state.alpha}° وβ = ${state.beta}°: مقارنة ${names[state.ratio]}(α ${opText} β) بـ ${names[state.ratio]} α ${opText} ${names[state.ratio]} β`, `α = ${state.alpha}° and β = ${state.beta}°: ${names[state.ratio]}(α ${opText} β) against ${names[state.ratio]} α ${opText} ${names[state.ratio]} β`))}>
                <UnitCircle o={O} r={R} />
                <Arc v={O} r={22} from={0} to={state.alpha} color={STAGE} />
                <Arc v={O} r={40} from={state.alpha} to={end} color={SECOND} />
                <line x1={O[0]} y1={O[1]} x2={A[0]} y2={A[1]} stroke={STAGE} strokeWidth={2.4} strokeDasharray="6 4" />
                {state.ratio === 'sin'
                    ? <line x1={P[0]} y1={P[1]} x2={foot[0]} y2={foot[1]} stroke={SECOND} strokeWidth={4} />
                    : <line x1={O[0]} y1={O[1]} x2={foot[0]} y2={foot[1]} stroke={GREEN} strokeWidth={4} />}
                <line x1={O[0]} y1={O[1]} x2={P[0]} y2={P[1]} stroke={INK} strokeWidth={3} />
                <circle cx={P[0]} cy={P[1]} r={5} fill={INK} />
                <circle cx={A[0]} cy={A[1]} r={4} fill={STAGE} />
                <text x={6} y={16} fontSize={13} fontWeight={700} fill={STAGE} direction="ltr">{`α = ${state.alpha}°`}</text>
                <text x={6} y={33} fontSize={13} fontWeight={700} fill={SECOND} direction="ltr">{`β = ${state.beta}°`}</text>
                <text x={P[0] + (P[0] >= O[0] ? 8 : -8)} y={P[1] + (P[1] <= O[1] ? -6 : 14)} textAnchor={P[0] >= O[0] ? 'start' : 'end'} fontSize={12} fontWeight={700} fill={INK}>{`${Math.round(end)}°`}</text>

                <line x1={236} y1={O[1]} x2={350} y2={O[1]} stroke={MUTED} strokeWidth={1.4} />
                {shown ? bar(262, truth, INK, STAGE_TINT) : <Hidden x={262} y={O[1] - 10} size={22} />}
                {shown ? bar(320, mistake, SECOND, PAPER) : <Hidden x={320} y={O[1] - 10} size={22} />}
                <text x={262} y={240} textAnchor="middle" fontSize={12} fontWeight={700} fill={INK} direction="ltr">{`${names[state.ratio]}(α ${opText} β)`}</text>
                <text x={320} y={240} textAnchor="middle" fontSize={12} fontWeight={700} fill={SECOND} direction="ltr">{`${names[state.ratio]} α`}</text>
                <text x={320} y={255} textAnchor="middle" fontSize={12} fontWeight={700} fill={SECOND} direction="ltr">{`${opText} ${names[state.ratio]} β`}</text>
                <text x={O[0]} y={240} textAnchor="middle" fontSize={12} fontWeight={700} fill={value === 0 ? MUTED : INK} direction="ltr">{`${names[state.ratio]} ${Math.round(end)}° ≈ ${num(value, props.language)}`}</text>
            </Board>
            <PlayButton label={l(say('Biratu β', 'Gira β', 'أدِر β', 'Turn β'))} disabled={!shown} playing={playback.playing} onPlay={playback.play} />
        </ToolFrame>
    )
}

/* ---------- L2. The solutions go round ---------- */

export function SpinTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<SpinState>(initialSpinState)
    const shown = state.prediction !== null
    const names = NAMES[props.language]
    const playback = usePlayback(`${state.ratio}-${state.n}-${state.k}`, 2400)
    const progress = shown && playback.progress !== null ? playback.progress : null
    const O: Point = [86, 104]
    const R = 70
    const value = SPIN_VALUES[state.k].value
    const base = spinBase(state)
    const solutions = spinSolutions(state)
    const count = spinCount(state)
    const name = state.ratio === 'sin' ? '\\sen' : '\\cos'
    const angle = state.n === 1 ? 'x' : `${state.n}x`
    const equation = `${name} ${angle}=${SPIN_VALUES[state.k].latex}`
    const solutionRows: string[] = []
    for (let start = 0; start < solutions.length; start += 3) solutionRows.push(solutions.slice(start, start + 3).map((x) => texDegrees(x, props.language)).join(',\\ '))
    const lines = [
        equation,
        ...base.map((u) => `${angle}=${u}°+k\\cdot 360°`),
        ...solutionRows.map((row, index) => (index === 0 ? `x=${row}` : row))
    ].map((line) => tex(props.language, line))
    const per = base.length
    const note = count === 0
        ? say('Ez dago 1 baino handiagoa edo $-1$ baino txikiagoa den sinu edo kosinurik: ez dago soluziorik.', 'Ningún seno ni coseno vale más de 1 ni menos de $-1$: no hay solución.', 'لا يوجد جيب ولا جيب تمام أكبر من 1 أو أصغر من $-1$: لا حل.', 'No sine or cosine is greater than 1 or less than $-1$: there is no solution.')
        : say(`$u=${angle}$ angeluaren bira bakoitzak ${per} ematen du: $${state.n}\\cdot ${per}=${count}$ soluzio.`, `Cada vuelta de $u=${angle}$ da ${per}: $${state.n}\\cdot ${per}=${count}$ soluciones.`, `كل دورة للزاوية $u=${angle}$ تعطي ${per}: $${state.n}\\cdot ${per}=${count}$ حلول.`, `Each turn of $u=${angle}$ gives ${per}: $${state.n}\\cdot ${per}=${count}$ solutions.`)
    const controls = (
        <>
            <Segmented<SpinRatio> label={l(say('Arrazoia', 'Razón', 'النسبة', 'Ratio'))} value={state.ratio} options={[{ value: 'sin', label: names.sin }, { value: 'cos', label: names.cos }]} onChange={(ratio) => setState((s) => setSpin(s, { ratio }))} />
            <Stepper label="n" value={state.n} min={SPIN_LIMITS.n.min} max={SPIN_LIMITS.n.max} onChange={(n) => setState((s) => setSpin(s, { n }))} language={props.language} />
            <Stepper label="k" value={state.k} min={SPIN_LIMITS.k.min} max={SPIN_LIMITS.k.max} format={spinPlain} onChange={(k) => setState((s) => setSpin(s, { k }))} language={props.language} />
        </>
    )
    const readout = (
        <Predict
            language={props.language}
            question={say(`Ikusi aurretik: zenbat soluzio ditu $${equation}$ ekuazioak 0°-tik 360°-ra?`, `Antes de verlo: ¿cuántas soluciones tiene $${equation}$ entre 0° y 360°?`, `قبل أن ترى: كم حلًّا للمعادلة $${equation}$ بين 0° و360°؟`, `Before you see it: how many solutions does $${equation}$ have between 0° and 360°?`)}
            labels={{ '<': say('2 baino gutxiago', 'Menos de 2', 'أقل من 2', 'Fewer than 2'), '=': say('2', '2', '2', '2'), '>': say('2 baino gehiago', 'Más de 2', 'أكثر من 2', 'More than 2') }}
            actual={spinPrediction(state)}
            choice={state.prediction}
            tip={say('$u=nx$ angeluak $n$ bira ematen ditu $x$ 0°-tik 360°-ra doan bitartean, eta bira bakoitzak 0, 1 edo 2 soluzio ematen ditu.', 'El ángulo $u=nx$ da $n$ vueltas mientras $x$ va de 0° a 360°, y cada vuelta da 0, 1 o 2 soluciones.', 'تدور الزاوية $u=nx$ عدد $n$ من الدورات بينما يتغير $x$ من 0° إلى 360°، وكل دورة تعطي 0 أو 1 أو 2 من الحلول.', 'The angle $u=nx$ makes $n$ turns while $x$ goes from 0° to 360°, and each turn gives 0, 1 or 2 solutions.')}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout latex={lines} note={l(note)} />
        </Predict>
    )
    // The line of the equation: y = k for the sine, x = k for the cosine (±3/2 drawn just outside the circle)
    const reach = Math.abs(value) > 1 ? Math.sign(value) * (R + 10) : value * R
    const rulerX = (x: number) => 20 + (x / 360) * 320
    const rulerY = 216
    const now = progress === null ? null : 360 * progress
    const u = now === null ? null : state.n * now
    const moving = u === null ? null : polar(O, R, u)
    const visible = solutions.filter((x) => now === null || x <= now + 1e-9)
    const turns = state.n === 1
        ? say('u = x: bira bat', 'u = x: una vuelta', 'u = x: دورة واحدة', 'u = x: one turn')
        : say(`u = ${state.n}x: ${state.n} bira`, `u = ${state.n}x: ${state.n} vueltas`, `u = ${state.n}x: ${state.n} دورات`, `u = ${state.n}x: ${state.n} turns`)
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={spinChallenges} extraChallenges={spinExtra} state={state}>
            <Board height={262} label={l(say(`${names[state.ratio]} ${angle} = ${spinPlain(state.k)}: soluzioak 0°-tik 360°-ra`, `${names[state.ratio]} ${angle} = ${spinPlain(state.k)}: las soluciones entre 0° y 360°`, `${names[state.ratio]} ${angle} = ${spinPlain(state.k)}: الحلول بين 0° و360°`, `${names[state.ratio]} ${angle} = ${spinPlain(state.k)}: the solutions between 0° and 360°`))}>
                <UnitCircle o={O} r={R} />
                {state.ratio === 'sin'
                    ? <line x1={O[0] - R - 12} y1={O[1] - reach} x2={O[0] + R + 12} y2={O[1] - reach} stroke={SECOND} strokeWidth={2.2} strokeDasharray="7 5" />
                    : <line x1={O[0] + reach} y1={O[1] - R - 12} x2={O[0] + reach} y2={O[1] + R + 12} stroke={SECOND} strokeWidth={2.2} strokeDasharray="7 5" />}
                {base.map((angleU) => {
                    const p = polar(O, R, angleU)
                    return <circle key={angleU} cx={p[0]} cy={p[1]} r={5} fill={SECOND} stroke={INK} strokeWidth={1} />
                })}
                {moving && <line x1={O[0]} y1={O[1]} x2={moving[0]} y2={moving[1]} stroke={INK} strokeWidth={2.4} />}
                {moving && <circle cx={moving[0]} cy={moving[1]} r={5} fill={INK} />}
                <text x={262} y={44} textAnchor="middle" fontSize={15} fontWeight={700} fill={SECOND} direction="ltr">{`${names[state.ratio]} ${angle} = ${spinPlain(state.k)}`}</text>
                <text x={262} y={72} textAnchor="middle" fontSize={13} fontWeight={700} fill={MUTED}>{l(turns)}</text>
                {u !== null && <text x={262} y={100} textAnchor="middle" fontSize={13} fontWeight={700} fill={INK} direction="ltr">{`u = ${Math.round(u)}°`}</text>}

                <line x1={rulerX(0)} y1={rulerY} x2={rulerX(360)} y2={rulerY} stroke={INK} strokeWidth={2} />
                {[0, 90, 180, 270, 360].map((x) => (
                    <g key={x}>
                        <line x1={rulerX(x)} y1={rulerY - 5} x2={rulerX(x)} y2={rulerY + 5} stroke={INK} strokeWidth={1.6} />
                        <text x={rulerX(x)} y={rulerY + 20} textAnchor="middle" fontSize={12} fontWeight={700} fill={MUTED}>{`${x}°`}</text>
                    </g>
                ))}
                <circle cx={rulerX(360)} cy={rulerY} r={4} fill={PAPER} stroke={INK} strokeWidth={1.6} />
                {shown
                    ? visible.map((x, index) => (
                        <g key={x}>
                            <circle cx={rulerX(x)} cy={rulerY} r={5.5} fill={SECOND} stroke={INK} strokeWidth={1} />
                            <text x={rulerX(x)} y={rulerY - (index % 2 === 0 ? 12 : 26)} textAnchor="middle" fontSize={11} fontWeight={700} fill={SECOND} direction="ltr">{`${dec(x, props.language, 1)}°`}</text>
                        </g>
                    ))
                    : <Hidden x={180} y={rulerY - 10} size={22} />}
                {now !== null && <line x1={rulerX(now)} y1={rulerY - 10} x2={rulerX(now)} y2={rulerY + 10} stroke={INK} strokeWidth={2.4} />}
                {shown && <text x={180} y={256} textAnchor="middle" fontSize={13} fontWeight={700} fill={INK}>{l(say(`${visible.length} soluzio`, `${visible.length} soluciones`, `${visible.length} حلول`, `${visible.length} solutions`))}</text>}
            </Board>
            <PlayButton label={l(say('Eman birak', 'Da las vueltas', 'أدِر الدورات', 'Go round'))} disabled={!shown} playing={playback.playing} onPlay={playback.play} />
        </ToolFrame>
    )
}

/* ---------- L3. The six ratios on the circle ---------- */

const SIX_NOTES: Record<SixRatio, LocalizedText> = {
    sin: say('Sinua puntuaren ordenatua da.', 'El seno es la ordenada del punto.', 'الجيب هو الإحداثي الصادي للنقطة.', 'The sine is the y-coordinate of the point.'),
    cos: say('Kosinua puntuaren abzisa da.', 'El coseno es la abscisa del punto.', 'جيب التمام هو الإحداثي السيني للنقطة.', 'The cosine is the x-coordinate of the point.'),
    tan: say('Tangentea $x=1$ zuzeneko altuera da: positiboa sinuak eta kosinuak zeinu bera dutenean.', 'La tangente es la altura en la recta $x=1$: positiva cuando seno y coseno tienen el mismo signo.', 'الظل هو الارتفاع على المستقيم $x=1$: موجب عندما يكون للجيب وجيب التمام الإشارة نفسها.', 'The tangent is the height on the line $x=1$: positive when the sine and the cosine have the same sign.'),
    sec: say('Sekanteak kosinuaren zeinu bera du: zentrotik $x=1$ zuzenerainoko distantzia da.', 'La secante tiene el signo del coseno: es la distancia del centro a la recta $x=1$.', 'للقاطع إشارة جيب التمام: إنه المسافة من المركز إلى المستقيم $x=1$.', 'The secant has the sign of the cosine: it is the distance from the centre to the line $x=1$.'),
    csc: say('Kosekanteak sinuaren zeinu bera du: zentrotik $y=1$ zuzenerainoko distantzia da.', 'La cosecante tiene el signo del seno: es la distancia del centro a la recta $y=1$.', 'لقاطع التمام إشارة الجيب: إنه المسافة من المركز إلى المستقيم $y=1$.', 'The cosecant has the sign of the sine: it is the distance from the centre to the line $y=1$.'),
    cot: say('Kotangentea $y=1$ zuzeneko abzisa da, eta tangentearen zeinu bera du.', 'La cotangente es la abscisa en la recta $y=1$, con el signo de la tangente.', 'ظل التمام هو الإحداثي السيني على المستقيم $y=1$، بإشارة الظل.', 'The cotangent is the x-coordinate on the line $y=1$, with the sign of the tangent.')
}

const SIX_DEFINITIONS: Record<SixRatio, string> = {
    sin: '\\sen\\alpha=y',
    cos: '\\cos\\alpha=x',
    tan: '\\tg\\alpha=\\frac{\\sen\\alpha}{\\cos\\alpha}',
    sec: '\\sec\\alpha=\\frac{1}{\\cos\\alpha}',
    csc: '\\cosec\\alpha=\\frac{1}{\\sen\\alpha}',
    cot: '\\cotg\\alpha=\\frac{\\cos\\alpha}{\\sen\\alpha}'
}

export function SixTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<SixState>(initialSixState)
    const shown = state.prediction !== null
    const names = NAMES[props.language]
    const playback = usePlayback(`${state.angle}-${state.ratio}`, 3200)
    // ▶ takes the point round the circle; the state does not change
    const angle = shown && playback.progress !== null ? 360 * playback.progress : state.angle
    const O: Point = [150, 160]
    const R = 78
    const P = polar(O, R, angle)
    const s = Math.sin(angle * D)
    const c = Math.cos(angle * D)
    const ratio = state.ratio
    const value = sixValue(state.angle, ratio)
    const live = (r: SixRatio) => (Math.abs(r === 'tan' || r === 'sec' ? c : s) < 1e-9 ? null : r === 'tan' ? s / c : r === 'cot' ? c / s : r === 'sec' ? 1 / c : r === 'csc' ? 1 / s : r === 'sin' ? s : c)
    const T: Point | null = Math.abs(c) < 1e-9 ? null : [O[0] + R, O[1] - R * (s / c)]
    const K: Point | null = Math.abs(s) < 1e-9 ? null : [O[0] + R * (c / s), O[1] - R]
    const lineValue = live(ratio)
    const lines = [SIX_DEFINITIONS[ratio], value === null ? `${sixTex(ratio)} ${state.angle}°` : `${sixTex(ratio)} ${state.angle}°${equalsOrNear(value, props.language)}`].map((line) => tex(props.language, line))
    const note = value === null
        ? say(`Ez da existitzen: 0 zati egin beharko litzateke ${state.angle}° angeluan.`, `No existe: en ${state.angle}° habría que dividir entre 0.`, `غير موجود: عند ${state.angle}° سنقسم على 0.`, `It does not exist: at ${state.angle}° you would divide by 0.`)
        : SIX_NOTES[ratio]
    const controls = (
        <>
            <Stepper label="α" value={state.angle} min={SIX_LIMITS.min} max={SIX_LIMITS.max} step={SIX_LIMITS.step} format={(v) => `${v}°`} onChange={(next) => setState((current) => setSix(current, { angle: next }))} language={props.language} />
            <Segmented<SixRatio> label={l(say('Arrazoia', 'Razón', 'النسبة', 'Ratio'))} value={ratio} options={SIX_RATIOS.map((r) => ({ value: r, label: names[r] }))} onChange={(next) => setState((current) => setSix(current, { ratio: next }))} />
        </>
    )
    const asked = `$${sixTex(ratio)} ${state.angle}°$`
    const readout = (
        <Predict
            language={props.language}
            question={say(`Ikusi aurretik: zer zeinu du ${asked} arrazoiak?`, `Antes de verlo: ¿qué signo tiene ${asked}?`, `قبل أن ترى: ما إشارة ${asked}؟`, `Before you see it: what sign does ${asked} have?`)}
            labels={{ '<': say('Negatiboa', 'Negativo', 'سالبة', 'Negative'), '=': say('0 edo ez dago', '0 o no existe', '0 أو غير موجودة', '0 or none'), '>': say('Positiboa', 'Positivo', 'موجبة', 'Positive') }}
            actual={sixPrediction(state)}
            choice={state.prediction}
            tip={say('Sekanteak kosinuaren zeinua du, kosekanteak sinuarena eta kotangenteak tangentearena.', 'La secante lleva el signo del coseno, la cosecante el del seno y la cotangente el de la tangente.', 'للقاطع إشارة جيب التمام، ولقاطع التمام إشارة الجيب، ولظل التمام إشارة الظل.', 'The secant has the sign of the cosine, the cosecant that of the sine and the cotangent that of the tangent.')}
            onChoose={(prediction) => setState((current) => setPrediction(current, prediction))}
        >
            <Readout latex={lines} note={l(note)} />
        </Predict>
    )
    const strong = (r: SixRatio) => (r === ratio ? 4.4 : 2)
    const show = (r: SixRatio) => shown && (r === ratio || r === 'sin' || r === 'cos')
    const label = lineValue === null ? `${names[ratio]} ∄` : `${names[ratio]} ≈ ${num(lineValue, props.language)}`
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={sixChallenges} extraChallenges={sixExtra} state={state}>
            <Board height={300} label={l(say(`α = ${state.angle}°: sei arrazoiak zirkunferentzian`, `α = ${state.angle}°: las seis razones en la circunferencia`, `α = ${state.angle}°: النسب الست على الدائرة`, `α = ${state.angle}°: the six ratios on the circle`))}>
                <defs><clipPath id="trigonometry-six-board"><rect x={0} y={0} width={360} height={290} /></clipPath></defs>
                <UnitCircle o={O} r={R} />
                <line x1={O[0] + R} y1={0} x2={O[0] + R} y2={290} stroke={MUTED} strokeWidth={1.2} strokeDasharray="4 4" />
                <line x1={0} y1={O[1] - R} x2={360} y2={O[1] - R} stroke={MUTED} strokeWidth={1.2} strokeDasharray="4 4" />
                <text x={O[0] + R + 4} y={14} fontSize={12} fontWeight={700} fill={MUTED} direction="ltr">x = 1</text>
                <text x={354} y={O[1] - R - 6} textAnchor="end" fontSize={12} fontWeight={700} fill={MUTED} direction="ltr">y = 1</text>
                <Arc v={O} r={20} from={0} to={angle} color={STAGE} />
                <g clipPath="url(#trigonometry-six-board)">
                    {shown && (ratio === 'tan' || ratio === 'sec') && T && <line x1={O[0]} y1={O[1]} x2={T[0]} y2={T[1]} stroke={ratio === 'sec' ? MUSTARD : MUTED} strokeWidth={ratio === 'sec' ? 4.4 : 1.4} strokeDasharray={ratio === 'sec' ? undefined : '5 4'} />}
                    {shown && ratio === 'tan' && T && <line x1={O[0] + R} y1={O[1]} x2={T[0]} y2={T[1]} stroke={STAGE} strokeWidth={4.4} />}
                    {shown && (ratio === 'cot' || ratio === 'csc') && K && <line x1={O[0]} y1={O[1]} x2={K[0]} y2={K[1]} stroke={ratio === 'csc' ? MUSTARD : MUTED} strokeWidth={ratio === 'csc' ? 4.4 : 1.4} strokeDasharray={ratio === 'csc' ? undefined : '5 4'} />}
                    {shown && ratio === 'cot' && K && <line x1={O[0]} y1={O[1] - R} x2={K[0]} y2={K[1]} stroke={STAGE} strokeWidth={4.4} />}
                </g>
                {(show('cos') || !shown) && <line x1={O[0]} y1={O[1]} x2={P[0]} y2={O[1]} stroke={GREEN} strokeWidth={strong('cos')} opacity={ratio === 'cos' || !shown ? 1 : 0.55} />}
                {(show('sin') || !shown) && <line x1={P[0]} y1={P[1]} x2={P[0]} y2={O[1]} stroke={SECOND} strokeWidth={strong('sin')} opacity={ratio === 'sin' || !shown ? 1 : 0.55} />}
                <line x1={O[0]} y1={O[1]} x2={P[0]} y2={P[1]} stroke={INK} strokeWidth={2.4} />
                <circle cx={P[0]} cy={P[1]} r={5} fill={INK} />
                <text x={O[0] + 24} y={O[1] - 8} fontSize={12} fontWeight={700} fill={STAGE} direction="ltr">{`${Math.round(angle)}°`}</text>
                {shown
                    ? <text x={10} y={22} fontSize={15} fontWeight={700} fill={ratio === 'sin' ? SECOND : ratio === 'cos' ? GREEN : ratio === 'tan' || ratio === 'cot' ? STAGE : MUSTARD} direction="ltr">{label}</text>
                    : <Hidden x={300} y={O[1] + 10} size={24} />}
            </Board>
            <PlayButton label={l(say('Eman bira bat', 'Da una vuelta', 'أدِر دورة', 'Go round once'))} disabled={!shown} playing={playback.playing} onPlay={playback.play} />
        </ToolFrame>
    )
}
