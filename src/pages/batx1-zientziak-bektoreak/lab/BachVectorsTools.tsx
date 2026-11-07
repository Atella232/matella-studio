import { useState, type ReactNode } from 'react'
import { Stepper, ToolFrame } from '../../../features/unit-v2/lab/LabKit'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import { useLabText } from '../../../features/unit-v2/lab/useLabText'
import { toLatex } from '../../../features/unit-v2/math/fraction'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import { PlaneGrid } from '../../dbh2-funtzioak-v2/plane'
import { useBoxClip } from '../../dbh2-funtzioak-v2/planeClip'
import { planeMap, type PlaneBox, type PlaneMap } from '../../dbh2-funtzioak-v2/planeMap'
import { Board, Hidden, PlayButton, Predict, Readout } from '../../dbh3-segidak/lab/LabParts'
import { dec, GREEN, INK, MUTED, PAPER, say, SECOND, STAGE, texDec } from '../../dbh3-segidak/lab/labStyle'
import { setPrediction } from '../../dbh3-segidak/lab/prediction'
import { usePlayback } from '../../dbh4-aplikatuak-proportzionaltasuna/lab/usePlayback'
import { crossingTime, initialRiverState, landing, realVelocity, RIVER_LIMITS, RIVER_WIDTH, riverChallenges, riverExtra, riverPrediction, setRiver, type RiverState } from './river'
import { angleOf, dotOf, initialShadowState, setShadow, SHADOW_LIMIT, shadowChallenges, shadowExtra, shadowFoot, shadowLength, shadowPrediction, squareOf, type ShadowState } from './shadow'
import { coordinatesLatex, crossOf, initialSkewState, isBasis, pairLatex, setSkew, SKEW_LIMITS, skewChallenges, skewCoordinates, skewExtra, skewPrediction, type Pair, type SkewState } from './skewGrid'

/* ==========================================================================
   Bektoreak · Batxilergoa 1 · Zientziak — the three tools of this unit:
   the skew grid of a basis, the shadow of one vector on another and the
   boat crossing a river. Each asks for a prediction before it shows the
   result; the boat crosses with ▶. Logic in skewGrid.ts, shadow.ts and
   river.ts. Formulas sit in their own <text> (left to right in every
   language).
   ========================================================================== */

const minus = (value: number) => (value < 0 ? `−${-value}` : String(value))
/** A negative number in brackets, for LaTeX */
const wrap = (value: number) => (value < 0 ? `(${value})` : String(value))
/** √n in LaTeX, as a whole number when it is a perfect square */
const rootLatex = (n: number) => (Number.isInteger(Math.sqrt(n)) ? String(Math.sqrt(n)) : `\\sqrt{${n}}`)
/** A number for LaTeX: whole, or rounded to two decimals */
const exactOrRounded = (value: number, language: UnitLanguage) => (Math.abs(value - Math.round(value)) < 1e-9 ? String(Math.round(value)) : texDec(value, language, 2))
const approx = (value: number) => (Math.abs(value - Math.round(value)) < 1e-9 ? '=' : '\\approx ')

/** An arrow between two points in pixels */
function Arrow({ from, to, color = STAGE, width = 3, dashed = false }: { from: Pair; to: Pair; color?: string; width?: number; dashed?: boolean }) {
    const [x1, y1] = from
    const [x2, y2] = to
    const length = Math.hypot(x2 - x1, y2 - y1)
    if (length < 1) return null
    const [ux, uy] = [(x2 - x1) / length, (y2 - y1) / length]
    const head = Math.min(11, length * 0.6)
    const base: Pair = [x2 - ux * head, y2 - uy * head]
    const wing = head / 2
    return (
        <g>
            <line x1={x1} y1={y1} x2={base[0]} y2={base[1]} stroke={color} strokeWidth={width} strokeDasharray={dashed ? '6 4' : undefined} strokeLinecap="round" />
            <polygon points={`${x2},${y2} ${base[0] - uy * wing},${base[1] + ux * wing} ${base[0] + uy * wing},${base[1] - ux * wing}`} fill={color} />
        </g>
    )
}

/** A Cartesian board for the vector tools: the grid, its axes and what is drawn on it */
function PlaneBoard({ box, cell, height, label, children }: { box: PlaneBox; cell: number; height: number; label: string; children: (map: PlaneMap, clip: string) => ReactNode }) {
    const width = (box.xMax - box.xMin) * cell
    const map = planeMap(box, cell, (360 - width) / 2, 34)
    const [clipPath, clip] = useBoxClip(map)
    return (
        <Board height={height} label={label}>
            <defs>{clipPath}</defs>
            <rect x={map.x(box.xMin)} y={map.y(box.yMax)} width={map.width} height={map.height} fill={PAPER} />
            <PlaneGrid map={map} labelStep={2} />
            {children(map, clip)}
        </Board>
    )
}

const at = (map: PlaneMap, [x, y]: [number, number]): Pair => [map.x(x), map.y(y)]

/** Two steppers for a vector's coordinates */
function PairSteppers({ name, value, limit, onChange, language }: { name: string; value: Pair; limit: number; onChange: (value: Pair) => void; language: UnitLanguage }) {
    return (
        <>
            <Stepper label={`${name}₁`} value={value[0]} min={-limit} max={limit} format={minus} onChange={(x) => onChange([x, value[1]])} language={language} />
            <Stepper label={`${name}₂`} value={value[1]} min={-limit} max={limit} format={minus} onChange={(y) => onChange([value[0], y])} language={language} />
        </>
    )
}

/* ---------- L1. The skew grid ---------- */

const SKEW_BOX: PlaneBox = { xMin: -6, xMax: 6, yMin: -6, yMax: 6 }

export function SkewGridTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<SkewState>(initialSkewState)
    const { u, v, w } = state
    const basis = isBasis(state)
    const coordinates = skewCoordinates(state)
    const shown = state.prediction !== null && coordinates !== null
    const controls = (
        <>
            <PairSteppers name="u" value={u} limit={SKEW_LIMITS.vector} onChange={(value) => setState((s) => setSkew(s, { u: value }))} language={props.language} />
            <PairSteppers name="v" value={v} limit={SKEW_LIMITS.vector} onChange={(value) => setState((s) => setSkew(s, { v: value }))} language={props.language} />
            <PairSteppers name="w" value={w} limit={SKEW_LIMITS.target} onChange={(value) => setState((s) => setSkew(s, { w: value }))} language={props.language} />
        </>
    )
    const actual = skewPrediction(state)
    const readout = coordinates === null || actual === null
        ? <Readout latex={[`\\vec{u}=${pairLatex(u)}\\qquad \\vec{v}=${pairLatex(v)}`]} note={l(say('$\\vec{u}$ eta $\\vec{v}$ paraleloak dira (edo bat nulua da): ez dute oinarririk osatzen, eta sarea zuzen batean zapaltzen da.', '$\\vec{u}$ y $\\vec{v}$ son paralelos (o uno es nulo): no forman base, y la red se aplasta en una recta.', '$\\vec{u}$ و$\\vec{v}$ متوازيان (أو أحدهما معدوم): لا يكوّنان أساسًا، وتنضغط الشبكة في مستقيم.', '$\\vec{u}$ and $\\vec{v}$ are parallel (or one is zero): they do not form a basis, and the grid flattens onto a line.'))} />
        : (
            <Predict
                language={props.language}
                question={say('Ikusi aurretik: $\\vec{w}$ bektorearen lehen koordenatua $B$ oinarrian, $a$, negatiboa, 0 ala positiboa da?', 'Antes de verlo: la primera coordenada de $\\vec{w}$ en la base $B$, $a$, ¿es negativa, 0 o positiva?', 'قبل أن ترى: هل المركّبة الأولى لـ $\\vec{w}$ في الأساس $B$، أي $a$، سالبة أم 0 أم موجبة؟', 'Before you see it: is the first coordinate of $\\vec{w}$ in the basis $B$, $a$, negative, 0 or positive?')}
                labels={{ '<': say('Negatiboa', 'Negativa', 'سالبة', 'Negative'), '=': say('0', '0', '0', '0'), '>': say('Positiboa', 'Positiva', 'موجبة', 'Positive') }}
                actual={actual}
                choice={state.prediction}
                tip={say('Jarraitu sareko marrei: zenbat urrats $\\vec{u}$ norabidean, aurrera ala atzera?', 'Sigue las líneas de la red: ¿cuántos pasos de $\\vec{u}$, hacia delante o hacia atrás?', 'تتبّع خطوط الشبكة: كم خطوة من $\\vec{u}$، إلى الأمام أم إلى الخلف؟', 'Follow the lines of the grid: how many steps of $\\vec{u}$, forwards or backwards?')}
                onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
            >
                <Readout latex={[`${pairLatex(w)}=${toLatex(coordinates[0])}\\cdot${pairLatex(u)}${coordinates[1].numerator < 0 ? '' : '+'}${toLatex(coordinates[1])}\\cdot${pairLatex(v)}`, `\\vec{w}=${coordinatesLatex(coordinates)}`]} note={l(say('Bektore bera, beste koordenatu batzuk: oinarriaren araberakoak dira.', 'El mismo vector, otras coordenadas: dependen de la base.', 'المتجه نفسه بمركّبات أخرى: إنها تتوقف على الأساس.', 'The same vector, other coordinates: they depend on the basis.'))} />
            </Predict>
        )
    const a = coordinates ? coordinates[0].numerator / coordinates[0].denominator : 0
    const au: [number, number] = [a * u[0], a * u[1]]
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={skewChallenges} extraChallenges={skewExtra} state={state}>
            <PlaneBoard box={SKEW_BOX} cell={24} height={330} label={l(say(`u = (${u[0]}, ${u[1]}) eta v = (${v[0]}, ${v[1]}) bektoreen sarea eta w = (${w[0]}, ${w[1]})`, `La red de u = (${u[0]}, ${u[1]}) y v = (${v[0]}, ${v[1]}) y el vector w = (${w[0]}, ${w[1]})`, `شبكة u = (${u[0]}, ${u[1]}) وv = (${v[0]}, ${v[1]}) والمتجه w = (${w[0]}, ${w[1]})`, `The grid of u = (${u[0]}, ${u[1]}) and v = (${v[0]}, ${v[1]}) and the vector w = (${w[0]}, ${w[1]})`))}>
                {(map, clip) => (
                    <g>
                        <g clipPath={clip}>
                            {basis && Array.from({ length: 25 }, (_, index) => index - 12).flatMap((k) => [
                                <line key={`a${k}`} x1={map.x(k * v[0] - 20 * u[0])} y1={map.y(k * v[1] - 20 * u[1])} x2={map.x(k * v[0] + 20 * u[0])} y2={map.y(k * v[1] + 20 * u[1])} stroke="#b9c7e3" strokeWidth={1.3} />,
                                <line key={`b${k}`} x1={map.x(k * u[0] - 20 * v[0])} y1={map.y(k * u[1] - 20 * v[1])} x2={map.x(k * u[0] + 20 * v[0])} y2={map.y(k * u[1] + 20 * v[1])} stroke="#b9c7e3" strokeWidth={1.3} />
                            ])}
                            {!basis && crossOf(u, v) === 0 && (u[0] !== 0 || u[1] !== 0 || v[0] !== 0 || v[1] !== 0) && (() => {
                                const d = u[0] !== 0 || u[1] !== 0 ? u : v
                                return <line x1={map.x(-20 * d[0])} y1={map.y(-20 * d[1])} x2={map.x(20 * d[0])} y2={map.y(20 * d[1])} stroke={SECOND} strokeWidth={2} strokeDasharray="6 4" />
                            })()}
                            {shown && <Arrow from={at(map, [0, 0])} to={at(map, au)} color={SECOND} width={2.4} dashed />}
                            {shown && <Arrow from={at(map, au)} to={at(map, w)} color={GREEN} width={2.4} dashed />}
                        </g>
                        <Arrow from={at(map, [0, 0])} to={at(map, u)} color={SECOND} width={3.6} />
                        <Arrow from={at(map, [0, 0])} to={at(map, v)} color={GREEN} width={3.6} />
                        <text x={map.x(u[0]) + 6} y={map.y(u[1]) - 6} fontSize={15} fontWeight={700} fill={SECOND}>u</text>
                        <text x={map.x(v[0]) + 6} y={map.y(v[1]) - 6} fontSize={15} fontWeight={700} fill={GREEN}>v</text>
                        <circle cx={map.x(w[0])} cy={map.y(w[1])} r={6} fill={STAGE} stroke={INK} strokeWidth={1.2} />
                        <text x={map.x(w[0]) + 8} y={map.y(w[1]) + 18} fontSize={15} fontWeight={700} fill={STAGE}>w</text>
                        {!shown && basis && <Hidden x={map.x(w[0]) + (w[0] > 3 ? -18 : 18)} y={map.y(w[1]) - 8} size={18} />}
                    </g>
                )}
            </PlaneBoard>
        </ToolFrame>
    )
}

/* ---------- L2. The shadow ---------- */

const SHADOW_BOX: PlaneBox = { xMin: -5, xMax: 5, yMin: -5, yMax: 5 }

export function ShadowTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<ShadowState>(initialShadowState)
    const { u, v } = state
    const shown = state.prediction !== null
    const dot = dotOf(u, v)
    const foot = shadowFoot(state)
    const length = shadowLength(state)
    const angle = angleOf(state)
    const controls = (
        <>
            <PairSteppers name="u" value={u} limit={SHADOW_LIMIT} onChange={(value) => setState((s) => setShadow(s, { u: value }))} language={props.language} />
            <PairSteppers name="v" value={v} limit={SHADOW_LIMIT} onChange={(value) => setState((s) => setShadow(s, { v: value }))} language={props.language} />
        </>
    )
    const lines = [`\\vec{u}\\cdot\\vec{v}=${u[0]}\\cdot ${wrap(v[0])}+${wrap(u[1])}\\cdot ${wrap(v[1])}=${dot}`]
    if (length !== null) lines.push(`\\frac{\\vec{u}\\cdot\\vec{v}}{|\\vec{u}|}=\\frac{${dot}}{${rootLatex(squareOf(u))}}${approx(length)}${exactOrRounded(length, props.language)}`)
    if (angle !== null) lines.push(`\\alpha${approx(angle)}${exactOrRounded(angle, props.language)}^\\circ`)
    const note = dot === 0
        ? say('Itzalik ez: $\\vec{u}$ eta $\\vec{v}$ perpendikularrak dira.', 'Sin sombra: $\\vec{u}$ y $\\vec{v}$ son perpendiculares.', 'لا ظل: $\\vec{u}$ و$\\vec{v}$ متعامدان.', 'No shadow: $\\vec{u}$ and $\\vec{v}$ are perpendicular.')
        : dot > 0
            ? say('Itzala aurrera erortzen da: angelu zorrotza.', 'La sombra cae hacia delante: ángulo agudo.', 'يقع الظل إلى الأمام: زاوية حادة.', 'The shadow falls forwards: acute angle.')
            : say('Itzala atzera erortzen da: angelu kamutsa.', 'La sombra cae hacia atrás: ángulo obtuso.', 'يقع الظل إلى الخلف: زاوية منفرجة.', 'The shadow falls backwards: obtuse angle.')
    const readout = (
        <Predict
            language={props.language}
            question={say('Ikusi aurretik: $\\vec{u}\\cdot\\vec{v}$ negatiboa, 0 ala positiboa da?', 'Antes de verlo: ¿$\\vec{u}\\cdot\\vec{v}$ es negativo, 0 o positivo?', 'قبل أن ترى: هل $\\vec{u}\\cdot\\vec{v}$ سالب أم 0 أم موجب؟', 'Before you see it: is $\\vec{u}\\cdot\\vec{v}$ negative, 0 or positive?')}
            labels={{ '<': say('Negatiboa', 'Negativo', 'سالب', 'Negative'), '=': say('0', '0', '0', '0'), '>': say('Positiboa', 'Positivo', 'موجب', 'Positive') }}
            actual={shadowPrediction(state)}
            choice={state.prediction}
            tip={say('Begiratu angeluari: zorrotza, zuzena ala kamutsa? Edo kalkulatu $u_1v_1+u_2v_2$.', 'Mira el ángulo: ¿agudo, recto u obtuso? O calcula $u_1v_1+u_2v_2$.', 'انظر إلى الزاوية: حادة أم قائمة أم منفرجة؟ أو احسب $u_1v_1+u_2v_2$.', 'Look at the angle: acute, right or obtuse? Or work out $u_1v_1+u_2v_2$.')}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout latex={lines} note={l(note)} />
        </Predict>
    )
    const origin: [number, number] = [0, 0]
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={shadowChallenges} extraChallenges={shadowExtra} state={state}>
            <PlaneBoard box={SHADOW_BOX} cell={28} height={324} label={l(say(`u = (${u[0]}, ${u[1]}) eta v = (${v[0]}, ${v[1]}) bektoreak, eta v bektorearen itzala u bektorearen zuzenean`, `Los vectores u = (${u[0]}, ${u[1]}) y v = (${v[0]}, ${v[1]}), y la sombra de v sobre la recta de u`, `المتجهان u = (${u[0]}, ${u[1]}) وv = (${v[0]}, ${v[1]}) وظل v على مستقيم u`, `The vectors u = (${u[0]}, ${u[1]}) and v = (${v[0]}, ${v[1]}), and the shadow of v on the line of u`))}>
                {(map, clip) => (
                    <g>
                        <g clipPath={clip}>
                            {(u[0] !== 0 || u[1] !== 0) && <line x1={map.x(-20 * u[0])} y1={map.y(-20 * u[1])} x2={map.x(20 * u[0])} y2={map.y(20 * u[1])} stroke={MUTED} strokeWidth={1.4} strokeDasharray="5 5" />}
                            {shown && foot && (
                                <g>
                                    <line x1={map.x(0)} y1={map.y(0)} x2={map.x(foot[0])} y2={map.y(foot[1])} stroke={dot >= 0 ? GREEN : SECOND} strokeWidth={9} strokeLinecap="round" opacity={0.45} />
                                    <line x1={map.x(v[0])} y1={map.y(v[1])} x2={map.x(foot[0])} y2={map.y(foot[1])} stroke={INK} strokeWidth={1.4} strokeDasharray="4 4" />
                                </g>
                            )}
                        </g>
                        <Arrow from={at(map, origin)} to={at(map, u)} color={SECOND} width={3.6} />
                        <Arrow from={at(map, origin)} to={at(map, v)} color={STAGE} width={3.6} />
                        <text x={map.x(u[0]) + 6} y={map.y(u[1]) + 16} fontSize={15} fontWeight={700} fill={SECOND}>u</text>
                        <text x={map.x(v[0]) + 6} y={map.y(v[1]) - 6} fontSize={15} fontWeight={700} fill={STAGE}>v</text>
                        {!shown && <Hidden x={map.x(0) + 26} y={map.y(0) + 30} size={18} />}
                    </g>
                )}
            </PlaneBoard>
        </ToolFrame>
    )
}

/* ---------- L3. The boat and the river ---------- */

export function RiverTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<RiverState>(initialRiverState)
    const shown = state.prediction !== null
    const playback = usePlayback(`${state.current}-${state.bx}-${state.by}`, 1800)
    const progress = !shown ? 0 : playback.progress === null ? 0 : playback.progress
    const metre = 12
    const far = 44
    const near = far + RIVER_WIDTH * metre
    const startX = 180
    const real = realVelocity(state)
    const drift = landing(state)
    const driftValue = drift.numerator / drift.denominator
    const X = (m: number) => startX + m * metre
    const boat: Pair = [X(driftValue * progress), near - RIVER_WIDTH * metre * progress]
    const controls = (
        <>
            <Stepper label={l(say('Korrontea', 'Corriente', 'التيار', 'Current'))} value={state.current} min={RIVER_LIMITS.current.min} max={RIVER_LIMITS.current.max} onChange={(current) => setState((s) => setRiver(s, { current }))} language={props.language} />
            <Stepper label="b₁" value={state.bx} min={RIVER_LIMITS.bx.min} max={RIVER_LIMITS.bx.max} format={minus} onChange={(bx) => setState((s) => setRiver(s, { bx }))} language={props.language} />
            <Stepper label="b₂" value={state.by} min={RIVER_LIMITS.by.min} max={RIVER_LIMITS.by.max} onChange={(by) => setState((s) => setRiver(s, { by }))} language={props.language} />
        </>
    )
    const time = crossingTime(state)
    const note = driftValue === 0
        ? say('Justu parean iristen da: barkuaren $b_1$ bektoreak korrontea ezeztatzen du.', 'Llega justo enfrente: la $b_1$ de la barca anula la corriente.', 'يصل إلى النقطة المقابلة تمامًا: ‏$b_1$ القارب يلغي التيار.', 'It lands straight across: the boat\'s $b_1$ cancels the current.')
        : driftValue > 0
            ? say(`Ibaian behera iristen da, $${exactOrRounded(driftValue, props.language)}$ m.`, `Llega aguas abajo, a $${exactOrRounded(driftValue, props.language)}$ m.`, `يصل مع التيار على بعد $${exactOrRounded(driftValue, props.language)}$ m.`, `It lands downstream, $${exactOrRounded(driftValue, props.language)}$ m away.`)
            : say(`Ibaian gora iristen da, $${exactOrRounded(-driftValue, props.language)}$ m.`, `Llega aguas arriba, a $${exactOrRounded(-driftValue, props.language)}$ m.`, `يصل عكس التيار على بعد $${exactOrRounded(-driftValue, props.language)}$ m.`, `It lands upstream, $${exactOrRounded(-driftValue, props.language)}$ m away.`)
    const readout = (
        <Predict
            language={props.language}
            question={say('Ikusi aurretik: non iritsiko da txalupa beste ertzera? Gorago, justu parean ala beherago?', 'Antes de verlo: ¿dónde llegará la barca a la otra orilla? ¿Aguas arriba, justo enfrente o aguas abajo?', 'قبل أن ترى: أين سيصل القارب إلى الضفة الأخرى؟ عكس التيار أم في المقابل تمامًا أم مع التيار؟', 'Before you see it: where will the boat reach the other bank? Upstream, straight across or downstream?')}
            labels={{ '<': say('Gorago', 'Aguas arriba', 'عكس التيار', 'Upstream'), '=': say('Justu parean', 'Justo enfrente', 'في المقابل تمامًا', 'Straight across'), '>': say('Beherago', 'Aguas abajo', 'مع التيار', 'Downstream') }}
            actual={riverPrediction(state)}
            choice={state.prediction}
            tip={say('Batu bi abiadurak: benetako abiaduraren lehen koordenatua $b_1$ gehi korrontea da.', 'Suma las dos velocidades: la primera coordenada de la velocidad real es $b_1$ más la corriente.', 'اجمع السرعتين: المركّبة الأولى للسرعة الحقيقية هي $b_1$ زائد التيار.', 'Add the two velocities: the first coordinate of the real velocity is $b_1$ plus the current.')}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout latex={[`\\vec{v}=(${state.bx},${state.by})+(${state.current},0)=(${real[0]},${real[1]})`, `t=\\frac{12}{${state.by}}=${toLatex(time)}\\qquad x=${wrap(real[0])}\\cdot t=${toLatex(drift)}`]} note={l(note)} />
        </Predict>
    )
    const scale = 18
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={riverChallenges} extraChallenges={riverExtra} state={state}>
            <Board height={near + 34} label={l(say(`Ibaia: korrontea ${state.current} m/s, txalupa (${state.bx}, ${state.by})`, `El río: corriente ${state.current} m/s, barca (${state.bx}, ${state.by})`, `النهر: التيار ${state.current} m/s، والقارب (${state.bx}, ${state.by})`, `The river: current ${state.current} m/s, boat (${state.bx}, ${state.by})`))}>
                <defs><clipPath id="bach-vectors-river"><rect x={10} y={far - 30} width={340} height={near - far + 60} /></clipPath></defs>
                <rect x={10} y={far} width={340} height={near - far} fill="#cfe2f3" />
                <line x1={10} x2={350} y1={far} y2={far} stroke={INK} strokeWidth={2} />
                <line x1={10} x2={350} y1={near} y2={near} stroke={INK} strokeWidth={2} />
                {state.current > 0 && [40, 140, 240].map((x) => <Arrow key={x} from={[x, far + 22]} to={[x + 12 * state.current, far + 22]} color="#8fb3d9" width={2} />)}
                <line x1={startX} x2={startX} y1={far} y2={near} stroke={MUTED} strokeWidth={1.2} strokeDasharray="3 4" />
                <text x={348} y={near + 20} textAnchor="end" fontSize={12} fill={MUTED}>12 m</text>
                {[-12, -6, 6, 12].map((m) => <text key={m} x={X(m)} y={far - 8} textAnchor="middle" fontSize={11} fill={MUTED}>{minus(m)}</text>)}
                <g clipPath="url(#bach-vectors-river)">
                    {shown && <line x1={startX} y1={near} x2={X(driftValue)} y2={far} stroke={STAGE} strokeWidth={1.6} strokeDasharray="5 4" />}
                    {shown && <circle cx={X(driftValue)} cy={far} r={6} fill={GREEN} stroke={INK} strokeWidth={1.2} />}
                </g>
                {shown && Math.abs(driftValue) > 14 && <text x={driftValue > 0 ? 346 : 14} y={far - 20} textAnchor={driftValue > 0 ? 'end' : 'start'} fontSize={12} fontWeight={700} fill={GREEN}>{`${driftValue > 0 ? '→' : '←'} ${dec(Math.abs(driftValue), props.language)} m`}</text>}
                <Arrow from={[startX, near]} to={[startX + state.bx * scale, near - state.by * scale]} color={GREEN} width={3.2} />
                <Arrow from={[startX, near]} to={[startX + state.current * scale, near]} color={SECOND} width={3.2} />
                {shown && <Arrow from={[startX, near]} to={[startX + real[0] * scale, near - real[1] * scale]} color={STAGE} width={3.6} />}
                {!shown && <Hidden x={startX + 40} y={far + 50} size={20} />}
                {shown && progress > 0 && <ellipse cx={boat[0]} cy={boat[1]} rx={9} ry={5} fill={INK} transform={`rotate(${(Math.atan2(-real[1], real[0]) * 180) / Math.PI} ${boat[0]} ${boat[1]})`} />}
            </Board>
            <PlayButton label={l(say('Zeharkatu', 'Cruzar', 'اعبر', 'Cross'))} disabled={!shown} playing={playback.playing} onPlay={playback.play} />
        </ToolFrame>
    )
}
