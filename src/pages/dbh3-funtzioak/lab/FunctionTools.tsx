import { useState, type ReactNode } from 'react'
import { Stepper, ToolFrame } from '../../../features/unit-v2/lab/LabKit'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import { useLabText } from '../../../features/unit-v2/lab/useLabText'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import { usePlayback } from '../../dbh4-aplikatuak-proportzionaltasuna/lab/usePlayback'
import { Board, Hidden, PlayButton, Predict, Readout } from '../../dbh3-segidak/lab/LabParts'
import { dec, GREEN, INK, MUSTARD, MUTED, say, SECOND, STAGE, texDec } from '../../dbh3-segidak/lab/labStyle'
import { initialPlansState, PLAN_A, PLAN_LIMITS, planA, planB, plansChallenges, plansCrossing, plansExtra, plansPrediction, setPlans, type PlansState } from './plans'
import { setPrediction } from './prediction'
import { initialTaxiState, setTaxi, TAXI_LIMITS, taxiChallenges, taxiCost, taxiExtra, taxiPrediction, type TaxiState } from './taxi'
import { initialThrowState, setThrow, THROW_LIMITS, throwChallenges, throwExtra, throwHeight, throwLanding, throwPrediction, throwVertex, type ThrowState } from './throw'
import { initialWalkState, setWalkSpeed, WALK_FAR, WALK_HOURS, WALK_SPEED, walkChallenges, walkExtra, walkFarthest, walkPositions, walkPrediction, type WalkState } from './walk'

/* ==========================================================================
   Funtzioak · 3. DBH — the four tools of this unit: the walk (a
   distance–time graph built hour by hour), the taxi meter (y = mx + n),
   two plans (two lines and where they cross) and the throw (a parabola
   and its vertex). Each asks for a prediction before it shows the graph,
   and each moves with ▶. The board, the readout and the prediction come
   from Segidak 3. DBH.
   ========================================================================== */

interface Axis {
    min: number
    max: number
    /** Gap between labelled ticks */
    tick: number
    name: string
}

const LEFT = 46
const RIGHT = 340
const TOP = 18

/** A first-quadrant graph: axes, ticks and the two names; children draw with the maps it hands back */
function Graph({ height, label, x, y, children }: { height: number; label: string; x: Axis; y: Axis; children: (X: (value: number) => number, Y: (value: number) => number) => ReactNode }) {
    const bottom = height - 30
    const X = (value: number) => LEFT + ((value - x.min) / (x.max - x.min)) * (RIGHT - LEFT)
    const Y = (value: number) => bottom - ((value - y.min) / (y.max - y.min)) * (bottom - TOP)
    const ticks = (axis: Axis) => Array.from({ length: Math.floor((axis.max - axis.min) / axis.tick) + 1 }, (_, index) => axis.min + index * axis.tick)
    return (
        <Board height={height} label={label}>
            {ticks(x).map((value) => <line key={`gx${value}`} x1={X(value)} x2={X(value)} y1={TOP} y2={bottom} stroke="var(--line, #e6dfd1)" />)}
            {ticks(y).map((value) => <line key={`gy${value}`} y1={Y(value)} y2={Y(value)} x1={LEFT} x2={RIGHT} stroke="var(--line, #e6dfd1)" />)}
            <line x1={LEFT} x2={RIGHT} y1={bottom} y2={bottom} stroke={MUTED} strokeWidth={1.4} />
            <line x1={LEFT} x2={LEFT} y1={TOP} y2={bottom} stroke={MUTED} strokeWidth={1.4} />
            {ticks(x).map((value) => <text key={`tx${value}`} x={X(value)} y={bottom + 14} textAnchor="middle" fontSize={10} fill={MUTED}>{value}</text>)}
            {ticks(y).map((value) => <text key={`ty${value}`} x={LEFT - 5} y={Y(value) + 3.5} textAnchor="end" fontSize={10} fill={MUTED}>{value}</text>)}
            <text x={RIGHT} y={bottom + 26} textAnchor="end" fontSize={11} fontWeight={700} fill={INK}>{x.name}</text>
            <text x={LEFT + 6} y={TOP - 5} textAnchor="start" fontSize={11} fontWeight={700} fill={INK}>{y.name}</text>
            {children(X, Y)}
        </Board>
    )
}

const money = (value: number, language: UnitLanguage) => `${dec(value, language)} €`

/* ---------- L1. The walk ---------- */

export function WalkTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<WalkState>(initialWalkState)
    const shown = state.prediction !== null
    const playback = usePlayback(state.speeds.join(','), 2400)
    const positions = walkPositions(state.speeds)
    const time = playback.playing ? (playback.progress ?? 0) * WALK_HOURS : WALK_HOURS
    const hour = Math.min(WALK_HOURS - 1, Math.floor(time))
    const now = positions[hour] + state.speeds[hour] * (time - hour)
    const trend = (speed: number) => (speed > 0 ? '↗' : speed < 0 ? '↘' : '→')
    const controls = (
        <>
            {state.speeds.map((speed, index) => (
                <Stepper key={index} label={l(say(`${index + 1}. ordua (km/h)`, `Hora ${index + 1} (km/h)`, `الساعة ${index + 1} (كم/س)`, `Hour ${index + 1} (km/h)`))} value={speed} min={WALK_SPEED.min} max={WALK_SPEED.max} onChange={(value) => setState((s) => setWalkSpeed(s, index, value))} language={props.language} />
            ))}
        </>
    )
    const readout = (
        <Predict
            language={props.language}
            question={say('Ikusi aurretik: etxetik 4 km baino gutxiagora, 4 km-ra ala urrunago iritsiko da?', 'Antes de verlo: ¿llegará a menos de 4 km de casa, a 4 km o más lejos?', 'قبل رؤيته: هل يبلغ أقل من 4 كم من البيت أم 4 كم أم أبعد؟', 'Before you see it: will the walker get less than 4 km from home, exactly 4 km or farther?')}
            labels={{ '<': say('Gutxiagora', 'A menos', 'أقل', 'Less'), '=': say('Justu 4 km', 'Justo 4 km', '4 كم تمامًا', 'Exactly 4 km'), '>': say('Urrunago', 'Más lejos', 'أبعد', 'Farther') }}
            actual={walkPrediction(state)}
            choice={state.prediction}
            tip={say('Batu abiadurak orduz ordu: distantzia ez da beti azkena.', 'Suma las velocidades hora a hora: la distancia mayor no siempre es la última.', 'اجمع السرعات ساعة بساعة: أبعد مسافة ليست دائمًا الأخيرة.', 'Add the speeds hour by hour: the farthest point is not always the last one.')}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout
                latex={[`d:\\ ${positions.join('\\to ')}\\ \\mathrm{km}`, `\\max=${walkFarthest(state)}\\ \\mathrm{km}`]}
                note={l(say(`Zatiak: ${state.speeds.map(trend).join(' ')}. Gora: urruntzen da. Horizontala: geldirik. Behera: etxera hurbiltzen da.`, `Tramos: ${state.speeds.map(trend).join(' ')}. Sube: se aleja. Horizontal: está parado. Baja: se acerca a casa.`, `الأجزاء: ${state.speeds.map(trend).join(' ')}. صعود: يبتعد. أفقي: متوقف. نزول: يقترب من البيت.`, `Stretches: ${state.speeds.map(trend).join(' ')}. Up: moving away. Flat: standing still. Down: coming home.`))}
            />
        </Predict>
    )
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={walkChallenges} extraChallenges={walkExtra} state={state}>
            <Graph height={300} label={l(say('Distantzia–denbora grafikoa', 'Gráfica distancia–tiempo', 'تمثيل المسافة والزمن', 'Distance–time graph'))} x={{ min: 0, max: WALK_HOURS, tick: 1, name: 't (h)' }} y={{ min: 0, max: WALK_FAR, tick: 2, name: 'd (km)' }}>
                {(X, Y) => (
                    <>
                        <line x1={X(0)} x2={X(WALK_HOURS)} y1={Y(4)} y2={Y(4)} stroke={MUSTARD} strokeWidth={1.6} strokeDasharray="5 4" />
                        {shown
                            ? (
                                <>
                                    <polyline points={positions.map((d, t) => `${X(t)},${Y(d)}`).join(' ')} fill="none" stroke={STAGE} strokeWidth={3} strokeLinejoin="round" opacity={playback.playing ? 0.3 : 1} />
                                    {positions.map((d, t) => <circle key={t} cx={X(t)} cy={Y(d)} r={3.5} fill={STAGE} />)}
                                    <circle cx={X(time)} cy={Y(now)} r={7} fill={SECOND} stroke="#fff" strokeWidth={2} />
                                </>
                            )
                            : <Hidden x={X(2)} y={Y(6)} />}
                    </>
                )}
            </Graph>
            <PlayButton label={l(say('Ibili', 'Camina', 'امشِ', 'Walk'))} disabled={!shown} playing={playback.playing} onPlay={playback.play} />
        </ToolFrame>
    )
}

/* ---------- L2. The taxi meter ---------- */

export function TaxiTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<TaxiState>(initialTaxiState)
    const shown = state.prediction !== null
    const playback = usePlayback(`${state.start}-${state.perKm}-${state.km}`, 1800)
    const km = playback.playing ? (playback.progress ?? 0) * state.km : state.km
    const cost = taxiCost(state)
    const euros = (value: number) => texDec(value, props.language)
    const controls = (
        <>
            <Stepper label={l(say('Hasteko: n (€)', 'Bajada: n (€)', 'الانطلاق: n (يورو)', 'Start: n (€)'))} value={state.start} min={TAXI_LIMITS.start.min} max={TAXI_LIMITS.start.max} step={TAXI_LIMITS.start.step} format={(value) => dec(value, props.language, 1)} onChange={(start) => setState((s) => setTaxi(s, { start }))} language={props.language} />
            <Stepper label={l(say('Km-ko: m (€)', 'Por km: m (€)', 'لكل كم: m (يورو)', 'Per km: m (€)'))} value={state.perKm} min={TAXI_LIMITS.perKm.min} max={TAXI_LIMITS.perKm.max} step={TAXI_LIMITS.perKm.step} format={(value) => dec(value, props.language, 1)} onChange={(perKm) => setState((s) => setTaxi(s, { perKm }))} language={props.language} />
            <Stepper label={l(say('Bidaia: x (km)', 'Viaje: x (km)', 'الرحلة: x (كم)', 'Ride: x (km)'))} value={state.km} min={TAXI_LIMITS.km.min} max={TAXI_LIMITS.km.max} onChange={(value) => setState((s) => setTaxi(s, { km: value }))} language={props.language} />
        </>
    )
    const readout = (
        <Predict
            language={props.language}
            question={say('Ikusi aurretik: bidaiak 20 € baino gutxiago, 20 € ala gehiago balio du?', 'Antes de verlo: ¿el viaje cuesta menos de 20 €, 20 € o más?', 'قبل رؤيته: هل ثمن الرحلة أقل من 20 يورو أم 20 أم أكثر؟', 'Before you see it: does the ride cost less than 20 €, 20 € or more?')}
            labels={{ '<': say('Gutxiago', 'Menos', 'أقل', 'Less'), '=': say('Justu 20 €', 'Justo 20 €', '20 يورو تمامًا', 'Exactly 20 €'), '>': say('Gehiago', 'Más', 'أكثر', 'More') }}
            actual={taxiPrediction(state)}
            choice={state.prediction}
            tip={say('Prezioa km-ko bider km, gehi hasierakoa.', 'El precio por km por los km, más la bajada.', 'سعر الكيلومتر في عدد الكيلومترات زائد الانطلاق.', 'The price per km times the km, plus the start fee.')}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout
                latex={[`y=${euros(state.perKm)}x+${euros(state.start)}`, `y=${euros(state.perKm)}\\cdot ${state.km}+${euros(state.start)}=${euros(cost)}`]}
                note={l(say('$m$ malda da: km bakoitzak zenbat igotzen duen. $n$ hasierako prezioa da: zuzenak Y ardatza mozten duen puntua.', '$m$ es la pendiente: lo que sube cada km. $n$ es la bajada: el punto donde la recta corta al eje Y.', '$m$ هو الميل: ما يزيده كل كيلومتر. و$n$ هو الانطلاق: النقطة التي يقطع فيها المستقيم محور Y.', '$m$ is the slope: what each km adds. $n$ is the start fee: where the line meets the Y axis.'))}
            />
        </Predict>
    )
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={taxiChallenges} extraChallenges={taxiExtra} state={state}>
            <Graph height={300} label={l(say(`Tarifa: ${money(cost, props.language)}`, `Tarifa: ${money(cost, props.language)}`, `التعريفة: ${money(cost, props.language)}`, `Fare: ${money(cost, props.language)}`))} x={{ min: 0, max: 12, tick: 2, name: 'x (km)' }} y={{ min: 0, max: 45, tick: 5, name: 'y (€)' }}>
                {(X, Y) => (
                    <>
                        <line x1={X(0)} x2={X(12)} y1={Y(20)} y2={Y(20)} stroke={MUSTARD} strokeWidth={1.6} strokeDasharray="5 4" />
                        <text x={X(12)} y={Y(20) - 4} textAnchor="end" fontSize={10} fontWeight={700} fill={MUSTARD}>20 €</text>
                        {shown
                            ? (
                                <>
                                    <line x1={X(0)} y1={Y(taxiCost(state, 0))} x2={X(12)} y2={Y(taxiCost(state, 12))} stroke={STAGE} strokeWidth={3} />
                                    <circle cx={X(0)} cy={Y(state.start)} r={4.5} fill={GREEN} />
                                    <line x1={X(km)} x2={X(km)} y1={Y(0)} y2={Y(taxiCost(state, km))} stroke={SECOND} strokeWidth={1.6} strokeDasharray="4 3" />
                                    <circle cx={X(km)} cy={Y(taxiCost(state, km))} r={7} fill={SECOND} stroke="#fff" strokeWidth={2} />
                                    <text x={X(km)} y={Y(0) - 6} textAnchor="middle" fontSize={16}>🚕</text>
                                </>
                            )
                            : <Hidden x={X(6)} y={Y(32)} />}
                    </>
                )}
            </Graph>
            <PlayButton label={l(say('Abiatu', 'Arranca', 'انطلق', 'Drive'))} disabled={!shown} playing={playback.playing} onPlay={playback.play} />
        </ToolFrame>
    )
}

/* ---------- L3. Two plans ---------- */

export function PlansTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<PlansState>(initialPlansState)
    const shown = state.prediction !== null
    const playback = usePlayback(`${state.m}-${state.n}-${state.month}`, 2000)
    const month = playback.playing ? (playback.progress ?? 0) * state.month : state.month
    const crossing = plansCrossing(state)
    const controls = (
        <>
            <Stepper label={l(say('B: m (€/hil.)', 'B: m (€/mes)', 'B: m (يورو/شهر)', 'B: m (€/month)'))} value={state.m} min={PLAN_LIMITS.m.min} max={PLAN_LIMITS.m.max} onChange={(m) => setState((s) => setPlans(s, { m }))} language={props.language} />
            <Stepper label={l(say('B: n (€)', 'B: n (€)', 'B: n (يورو)', 'B: n (€)'))} value={state.n} min={PLAN_LIMITS.n.min} max={PLAN_LIMITS.n.max} step={PLAN_LIMITS.n.step} onChange={(n) => setState((s) => setPlans(s, { n }))} language={props.language} />
            <Stepper label={l(say('Hilabetea: x', 'Mes: x', 'الشهر: x', 'Month: x'))} value={state.month} min={PLAN_LIMITS.month.min} max={PLAN_LIMITS.month.max} onChange={(value) => setState((s) => setPlans(s, { month: value }))} language={props.language} />
        </>
    )
    const where = crossing === null
        ? say(state.n === PLAN_A.n ? 'Zuzen bera dira: beti berdin balio dute.' : 'Malda bera: zuzen paraleloak dira eta ez dira inoiz ebakitzen.', state.n === PLAN_A.n ? 'Son la misma recta: siempre cuestan lo mismo.' : 'La misma pendiente: son rectas paralelas y nunca se cortan.', state.n === PLAN_A.n ? 'إنهما المستقيم نفسه: تتساويان دائمًا.' : 'الميل نفسه: مستقيمان متوازيان لا يتقاطعان أبدًا.', state.n === PLAN_A.n ? 'They are the same line: they always cost the same.' : 'The same slope: the lines are parallel and never cross.')
        : say(`Ebakidura $x=${texDec(crossing, props.language)}$ hilabetean: han berdin balio dute.`, `Se cortan en el mes $x=${texDec(crossing, props.language)}$: ahí cuestan lo mismo.`, `يتقاطعان عند الشهر $x=${texDec(crossing, props.language)}$: هناك تتساويان.`, `They cross at month $x=${texDec(crossing, props.language)}$: there they cost the same.`)
    const readout = (
        <Predict
            language={props.language}
            question={say('Ikusi aurretik: hilabete honetan, B merkeagoa, berdina ala garestiagoa da A baino?', 'Antes de verlo: en este mes, ¿B es más barata, igual o más cara que A?', 'قبل رؤيته: في هذا الشهر، هل B أرخص من A أم مثلها أم أغلى؟', 'Before you see it: in this month, is B cheaper than A, the same or dearer?')}
            labels={{ '<': say('Merkeagoa', 'Más barata', 'أرخص', 'Cheaper'), '=': say('Berdina', 'Igual', 'مثلها', 'The same'), '>': say('Garestiagoa', 'Más cara', 'أغلى', 'Dearer') }}
            actual={plansPrediction(state)}
            choice={state.prediction}
            tip={say('Kalkulatu bi tarifak hilabete horretan, edo begiratu non ebakitzen diren.', 'Calcula las dos tarifas en ese mes, o mira dónde se cortan.', 'احسب التعريفتين في ذلك الشهر، أو انظر أين تتقاطعان.', 'Work out both plans in that month, or look at where they cross.')}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout
                latex={[`A:\\ 5\\cdot ${state.month}+20=${planA(state.month)}`, `B:\\ ${state.m}\\cdot ${state.month}+${state.n}=${planB(state, state.month)}`]}
                note={l(where)}
            />
        </Predict>
    )
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={plansChallenges} extraChallenges={plansExtra} state={state}>
            <Graph height={320} label={l(say('Bi tarifa', 'Dos tarifas', 'تعريفتان', 'Two plans'))} x={{ min: 0, max: 12, tick: 2, name: 'x' }} y={{ min: 0, max: 180, tick: 30, name: 'y (€)' }}>
                {(X, Y) => (
                    <>
                        <line x1={X(0)} y1={Y(planA(0))} x2={X(12)} y2={Y(planA(12))} stroke={STAGE} strokeWidth={3} />
                        <text x={X(12) - 2} y={Y(planA(12)) - 6} textAnchor="end" fontSize={12} fontWeight={700} fill={STAGE}>A</text>
                        <line x1={X(month)} x2={X(month)} y1={Y(0)} y2={Y(180)} stroke={MUTED} strokeWidth={1.4} strokeDasharray="4 3" />
                        {shown
                            ? (
                                <>
                                    <line x1={X(0)} y1={Y(planB(state, 0))} x2={X(12)} y2={Y(planB(state, 12))} stroke={SECOND} strokeWidth={3} strokeDasharray={crossing === null && state.n === PLAN_A.n ? '8 6' : undefined} />
                                    <text x={X(12) - 2} y={Y(Math.min(176, planB(state, 12))) + 16} textAnchor="end" fontSize={12} fontWeight={700} fill={SECOND}>B</text>
                                    {crossing !== null && crossing >= 0 && crossing <= 12 && <circle cx={X(crossing)} cy={Y(planA(crossing))} r={6} fill="none" stroke={GREEN} strokeWidth={2.6} />}
                                    <circle cx={X(month)} cy={Y(planA(month))} r={6} fill={STAGE} stroke="#fff" strokeWidth={2} />
                                    {planB(state, month) <= 180 && <circle cx={X(month)} cy={Y(planB(state, month))} r={6} fill={SECOND} stroke="#fff" strokeWidth={2} />}
                                </>
                            )
                            : <Hidden x={X(8)} y={Y(140)} />}
                    </>
                )}
            </Graph>
            <PlayButton label={l(say('Hilabeteak', 'Los meses', 'الأشهر', 'Months'))} disabled={!shown} playing={playback.playing} onPlay={playback.play} />
        </ToolFrame>
    )
}

/* ---------- L4. The throw ---------- */

export function ThrowTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<ThrowState>(initialThrowState)
    const shown = state.prediction !== null
    const playback = usePlayback(`${state.v}-${state.h0}-${state.t}`, 2000)
    const t = playback.playing ? (playback.progress ?? 0) * state.t : state.t
    const vertex = throwVertex(state)
    const landing = throwLanding(state)
    const curve = Array.from({ length: 61 }, (_, index) => (landing * index) / 60)
    const n = (value: number) => texDec(value, props.language)
    const controls = (
        <>
            <Stepper label={l(say('Abiadura: v (m/s)', 'Velocidad: v (m/s)', 'السرعة: v (م/ث)', 'Speed: v (m/s)'))} value={state.v} min={THROW_LIMITS.v.min} max={THROW_LIMITS.v.max} step={THROW_LIMITS.v.step} onChange={(v) => setState((s) => setThrow(s, { v }))} language={props.language} />
            <Stepper label={l(say('Hasierako altuera (m)', 'Altura inicial (m)', 'الارتفاع الابتدائي (م)', 'Starting height (m)'))} value={state.h0} min={THROW_LIMITS.h0.min} max={THROW_LIMITS.h0.max} step={THROW_LIMITS.h0.step} onChange={(h0) => setState((s) => setThrow(s, { h0 }))} language={props.language} />
            <Stepper label={l(say('Unea: t (s)', 'Momento: t (s)', 'اللحظة: t (ث)', 'Time: t (s)'))} value={state.t} min={THROW_LIMITS.t.min} max={THROW_LIMITS.t.max} step={THROW_LIMITS.t.step} format={(value) => dec(value, props.language, 1)} onChange={(value) => setState((s) => setThrow(s, { t: value }))} language={props.language} />
        </>
    )
    const readout = (
        <Predict
            language={props.language}
            question={say('Ikusi aurretik: pilota 2 s baino lehen, 2 s-tan ala geroago egongo da goien?', 'Antes de verlo: ¿la pelota estará lo más alto antes de 2 s, a los 2 s o después?', 'قبل رؤيتها: هل تكون الكرة في أعلى نقطة قبل 2 ث أم عند 2 ث أم بعدها؟', 'Before you see it: will the ball be highest before 2 s, at 2 s or later?')}
            labels={{ '<': say('Lehenago', 'Antes', 'قبلها', 'Before'), '=': say('Justu 2 s', 'Justo 2 s', '2 ث تمامًا', 'At 2 s'), '>': say('Geroago', 'Después', 'بعدها', 'Later') }}
            actual={throwPrediction(state)}
            choice={state.prediction}
            tip={say('Erpina: $t=\\frac{-b}{2a}=\\frac{v}{10}$.', 'El vértice: $t=\\frac{-b}{2a}=\\frac{v}{10}$.', 'الرأس: $t=\\frac{-b}{2a}=\\frac{v}{10}$.', 'The vertex: $t=\\frac{-b}{2a}=\\frac{v}{10}$.')}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout
                latex={[`h=${state.h0 === 0 ? '' : `${state.h0}+`}${state.v}t-5t^{2}`, `t_{v}=\\frac{${state.v}}{10}=${n(vertex.t)}\\quad h_{max}=${n(vertex.h)}`, `h(${n(state.t)})=${n(throwHeight(state, state.t))}`]}
                note={l(say(`Parabola behera irekitzen da ($a=-5$). Lurrera ${dec(landing, props.language, 1)} s-tan iristen da.`, `La parábola se abre hacia abajo ($a=-5$). Llega al suelo a los ${dec(landing, props.language, 1)} s.`, `ينفتح القطع إلى الأسفل ($a=-5$). تصل إلى الأرض بعد ${dec(landing, props.language, 1)} ث.`, `The parabola opens downwards ($a=-5$). It reaches the ground after ${dec(landing, props.language, 1)} s.`))}
            />
        </Predict>
    )
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={throwChallenges} extraChallenges={throwExtra} state={state}>
            <Graph height={320} label={l(say('Altuera–denbora parabola', 'Parábola altura–tiempo', 'قطع الارتفاع والزمن', 'Height–time parabola'))} x={{ min: 0, max: 7, tick: 1, name: 't (s)' }} y={{ min: 0, max: 70, tick: 10, name: 'h (m)' }}>
                {(X, Y) => (
                    <>
                        <line x1={X(2)} x2={X(2)} y1={Y(0)} y2={Y(70)} stroke={MUSTARD} strokeWidth={1.6} strokeDasharray="5 4" />
                        <line x1={X(t)} x2={X(t)} y1={Y(0)} y2={Y(70)} stroke={MUTED} strokeWidth={1.2} strokeDasharray="3 3" />
                        {shown
                            ? (
                                <>
                                    <polyline points={curve.map((time) => `${X(time)},${Y(throwHeight(state, time))}`).join(' ')} fill="none" stroke={STAGE} strokeWidth={3} opacity={playback.playing ? 0.3 : 1} />
                                    <line x1={X(vertex.t)} x2={X(vertex.t)} y1={Y(0)} y2={Y(vertex.h)} stroke={GREEN} strokeWidth={1.6} strokeDasharray="4 3" />
                                    <circle cx={X(vertex.t)} cy={Y(vertex.h)} r={4.5} fill={GREEN} />
                                    <circle cx={X(t)} cy={Y(throwHeight(state, t))} r={7} fill={SECOND} stroke="#fff" strokeWidth={2} />
                                </>
                            )
                            : <Hidden x={X(3.5)} y={Y(40)} />}
                    </>
                )}
            </Graph>
            <PlayButton label={l(say('Jaurti', 'Lanza', 'ارمِ', 'Throw'))} disabled={!shown} playing={playback.playing} onPlay={playback.play} />
        </ToolFrame>
    )
}
