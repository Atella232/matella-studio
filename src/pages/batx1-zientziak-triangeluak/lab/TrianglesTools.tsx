import { useState } from 'react'
import { Stepper, ToolFrame } from '../../../features/unit-v2/lab/LabKit'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import { useLabText } from '../../../features/unit-v2/lab/useLabText'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import { Board, Hidden, PlayButton, Predict, Readout } from '../../dbh3-segidak/lab/LabParts'
import { dec, GREEN, GREEN_TINT, INK, MUSTARD_TINT, MUTED, PAPER, SECOND, SECOND_TINT, STAGE, STAGE_TINT, texDec } from '../../dbh3-segidak/lab/labStyle'
import { setPrediction } from '../../dbh3-segidak/lab/prediction'
import { localize, say } from '../../dbh4-akademikoak-trigonometria/text'
import { usePlayback } from '../../dbh4-aplikatuak-proportzionaltasuna/lab/usePlayback'
import { circumcircleChallenges, circumcircleExtra, circumcirclePrediction, circumcircleTriangle, circumcircleVertices, CIRCUMCIRCLE_LIMITS, circumradius, initialCircumcircleState, setCircumcircle, type CircumcircleState } from './circumcircle'
import { compassAngles, compassChallenges, compassCuts, compassExtra, compassHeight, compassPrediction, compassSine, COMPASS_LIMITS, initialCompassState, setCompass, triangleCount, type CompassState } from './compass'
import { hingeChallenges, hingeCorrection, hingeExtra, hingePrediction, hingeSide, hingeSquare, HINGE_LIMITS, initialHingeState, setHinge, type HingeState } from './hinge'

/* ==========================================================================
   Triangeluen ebazpena · Batxilergoa 1 · Zientziak — the three tools of
   this unit: the compass of the ambiguous case (0, 1 or 2 cuts with the
   ray), the hinge of the cosine rule (a² against b² + c², with the
   correction −2bc · cos A as a bar that takes away or adds) and the
   circle of 2R (a / sen A is the diameter; A slides along its arc). Each
   asks for a prediction before it shows the result; the hinge and the
   circle move with ▶. Logic in compass.ts, hinge.ts and circumcircle.ts.
   ========================================================================== */

const D = Math.PI / 180
type Point = [number, number]
const points = (list: Point[]) => list.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ')
/** A formula with \sen and \tg in the language's names */
const tex = (language: UnitLanguage, latex: string) => localize(language, latex)
const degrees = (value: number, language: UnitLanguage) => `${texDec(value, language, 1)}°`

/** The arc of the angle at v between the directions to p and q (the inner one) */
function Arc({ v, p, q, r, color }: { v: Point; p: Point; q: Point; r: number; color: string }) {
    const angle = (to: Point) => Math.atan2(v[1] - to[1], to[0] - v[0])
    let from = angle(p)
    let to = angle(q)
    let sweep = (to - from + 2 * Math.PI) % (2 * Math.PI)
    if (sweep > Math.PI) {
        ;[from, to] = [to, from]
        sweep = 2 * Math.PI - sweep
    }
    const start: Point = [v[0] + r * Math.cos(from), v[1] - r * Math.sin(from)]
    const end: Point = [v[0] + r * Math.cos(from + sweep), v[1] - r * Math.sin(from + sweep)]
    return <path d={`M${start[0].toFixed(1)} ${start[1].toFixed(1)} A${r} ${r} 0 0 0 ${end[0].toFixed(1)} ${end[1].toFixed(1)}`} fill="none" stroke={color} strokeWidth={2} />
}

/* ---------- L1. The compass of the ambiguous case ---------- */

export function CompassTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<CompassState>(initialCompassState)
    const shown = state.prediction !== null
    const u = 18
    const baseY = 196
    const cosA = Math.cos(state.A * D)
    const A: Point = [24 + Math.max(0, -state.b * cosA) * u, baseY]
    const C: Point = [A[0] + state.b * cosA * u, baseY - state.b * Math.sin(state.A * D) * u]
    const h = compassHeight(state)
    const cuts = compassCuts(state)
    const vertices = cuts.map((cut): Point => [A[0] + cut * u, baseY])
    const angles = compassAngles(state)
    const count = triangleCount(state)
    const controls = (
        <>
            <Stepper label="A" value={state.A} min={COMPASS_LIMITS.A.min} max={COMPASS_LIMITS.A.max} step={COMPASS_LIMITS.A.step} format={(value) => `${value}°`} onChange={(next) => setState((s) => setCompass(s, { A: next }))} language={props.language} />
            <Stepper label="b" value={state.b} min={COMPASS_LIMITS.b.min} max={COMPASS_LIMITS.b.max} onChange={(b) => setState((s) => setCompass(s, { b }))} language={props.language} />
            <Stepper label={l(say('a (konpasa)', 'a (compás)', 'a (الفرجار)', 'a (compass)'))} value={state.a} min={COMPASS_LIMITS.a.min} max={COMPASS_LIMITS.a.max} onChange={(a) => setState((s) => setCompass(s, { a }))} language={props.language} />
        </>
    )
    const sine = compassSine(state)
    const lines = [`h=${state.b}\\cdot\\sen ${state.A}°\\approx ${texDec(h, props.language, 2)}`]
    if (state.A < 90 || cuts.length) lines.push(`\\sen B=\\frac{${state.b}\\cdot\\sen ${state.A}°}{${state.a}}\\approx ${texDec(sine, props.language, 3)}`)
    if (angles.length === 2) lines.push(`B_1\\approx ${degrees(angles[1], props.language)}\\qquad B_2\\approx ${degrees(angles[0], props.language)}`)
    else if (angles.length === 1) lines.push(`B\\approx ${degrees(angles[0], props.language)}`)
    const note = count === 0
        ? (sine > 1
            ? say('$\\sen B>1$: konpasa ez da zuzenera iristen, ez dago triangelurik.', '$\\sen B>1$: el compás no llega a la recta, no hay triángulo.', '$\\sen B>1$: لا يصل الفرجار إلى المستقيم، فلا مثلث.', '$\\sin B>1$: the compass does not reach the line, there is no triangle.')
            : say('Ebakidura A-ren atzean geratzen da: ez dago triangelurik.', 'El corte queda detrás de A: no hay triángulo.', 'يقع التقاطع خلف A: فلا مثلث.', 'The cut falls behind A: there is no triangle.'))
        : count === 2
            ? say('Bi ebakidura: B zorrotza eta B kamutsa, biek 180° osatzen dute.', 'Dos cortes: un B agudo y uno obtuso, que suman 180°.', 'تقاطعان: B حادة وB منفرجة مجموعهما 180°.', 'Two cuts: an acute B and an obtuse B, which add up to 180°.')
            : Math.abs(state.a - h) < 1e-9
                ? say('Konpasak zuzena ukitu besterik ez du egiten: triangelu angeluzuzena.', 'El compás solo toca la recta: un triángulo rectángulo.', 'يلمس الفرجار المستقيم فقط: مثلث قائم.', 'The compass only touches the line: a right-angled triangle.')
                : say('Ebakidura bakarra A-ren aurrean: triangelu bakarra.', 'Un solo corte delante de A: un solo triángulo.', 'تقاطع واحد أمام A: مثلث واحد.', 'A single cut in front of A: a single triangle.')
    const readout = (
        <Predict
            language={props.language}
            question={say('Ikusi aurretik: zenbat triangelu daude datu hauekin?', 'Antes de verlo: ¿cuántos triángulos hay con estos datos?', 'قبل أن ترى: كم مثلثًا توجد بهذه المعطيات؟', 'Before you see it: how many triangles are there with these data?')}
            labels={{ '<': say('Bat ere ez', 'Ninguno', 'لا شيء', 'None'), '=': say('Bat', 'Uno', 'واحد', 'One'), '>': say('Bi', 'Dos', 'اثنان', 'Two') }}
            actual={compassPrediction(state)}
            choice={state.prediction}
            tip={say('Konparatu $a$ altuerarekin, $h=b\\cdot\\sen A$: laburragoa bada, ez da iristen. $h$ eta $b$ artean badago, bi aldiz ebakitzen du.', 'Compara $a$ con la altura, $h=b\\cdot\\sen A$: si es más corto, no llega. Si está entre $h$ y $b$, corta dos veces.', 'قارن $a$ بالارتفاع $h=b\\cdot\\sen A$: إذا كان أقصر فلا يصل. وإذا كان بين $h$ و$b$ قطع مرتين.', 'Compare $a$ with the height, $h=b\\cdot\\sin A$: if it is shorter, it does not reach. If it is between $h$ and $b$, it cuts twice.')}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout latex={lines.map((line) => tex(props.language, line))} note={l(note)} />
        </Predict>
    )
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={compassChallenges} extraChallenges={compassExtra} state={state}>
            <Board height={236} label={l(say(`A = ${state.A}°, b = ${state.b} eta a = ${state.a}: konpasak zuzena ebakitzen du`, `A = ${state.A}°, b = ${state.b} y a = ${state.a}: el compás corta la recta`, `A = ${state.A}° وb = ${state.b} وa = ${state.a}: الفرجار يقطع المستقيم`, `A = ${state.A}°, b = ${state.b} and a = ${state.a}: the compass cuts the line`))}>
                <defs><clipPath id="triangles-compass-board"><rect x={0} y={0} width={360} height={226} /></clipPath></defs>
                <line x1={A[0]} y1={baseY} x2={352} y2={baseY} stroke={INK} strokeWidth={2} />
                {shown && vertices.map((B, index) => <polygon key={index} points={points([A, B, C])} fill={index === vertices.length - 1 ? STAGE_TINT : MUSTARD_TINT} opacity={0.75} />)}
                <line x1={C[0]} y1={C[1]} x2={C[0]} y2={baseY} stroke={MUTED} strokeWidth={1.4} strokeDasharray="4 4" />
                <line x1={A[0]} y1={A[1]} x2={C[0]} y2={C[1]} stroke={INK} strokeWidth={3} />
                <Arc v={A} p={[A[0] + 40, baseY]} q={C} r={24} color={SECOND} />
                {shown && <circle cx={C[0]} cy={C[1]} r={state.a * u} fill="none" stroke={MUTED} strokeWidth={1.6} strokeDasharray="6 5" clipPath="url(#triangles-compass-board)" />}
                {shown && vertices.map((B, index) => <line key={index} x1={C[0]} y1={C[1]} x2={B[0]} y2={B[1]} stroke={index === vertices.length - 1 ? STAGE : SECOND} strokeWidth={3} />)}
                {shown && vertices.map((B, index) => <circle key={index} cx={B[0]} cy={B[1]} r={5} fill={index === vertices.length - 1 ? STAGE : SECOND} stroke={INK} strokeWidth={1} />)}
                {shown && vertices.map((B, index) => <text key={index} x={B[0]} y={baseY + 20} textAnchor="middle" fontSize={13} fontWeight={700} fill={index === vertices.length - 1 ? STAGE : SECOND}>{vertices.length === 2 ? (index === 1 ? 'B₁' : 'B₂') : 'B'}</text>)}
                <circle cx={A[0]} cy={A[1]} r={4} fill={INK} />
                <circle cx={C[0]} cy={C[1]} r={4} fill={INK} />
                <text x={A[0] - 4} y={baseY + 20} textAnchor="middle" fontSize={13} fontWeight={700} fill={INK}>A</text>
                <text x={C[0]} y={C[1] - 9} textAnchor="middle" fontSize={13} fontWeight={700} fill={INK}>C</text>
                <text x={A[0] + 30} y={baseY - 8} fontSize={12} fontWeight={700} fill={SECOND}>{`${state.A}°`}</text>
                <text x={(A[0] + C[0]) / 2 - 8} y={(A[1] + C[1]) / 2} textAnchor="end" fontSize={13} fontWeight={700} fill={INK}>{`b = ${state.b}`}</text>
                <text x={C[0] + 6} y={(C[1] + baseY) / 2} fontSize={12} fontWeight={700} fill={MUTED}>{`h ≈ ${dec(h, props.language, 2)}`}</text>
                {/* The compass opening, as a ruler in a corner */}
                <line x1={352 - state.a * u} y1={14} x2={352} y2={14} stroke={SECOND} strokeWidth={5} strokeLinecap="round" />
                <text x={352} y={34} textAnchor="end" fontSize={13} fontWeight={700} fill={SECOND}>{`a = ${state.a}`}</text>
                {!shown && <Hidden x={Math.min(330, C[0] + 40)} y={baseY - 10} size={22} />}
            </Board>
        </ToolFrame>
    )
}

/* ---------- L2. The hinge of the cosine rule ---------- */

export function HingeTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<HingeState>(initialHingeState)
    const shown = state.prediction !== null
    const playback = usePlayback(`${state.b}-${state.c}-${state.A}`, 1600)
    // ▶ opens the hinge from 10° to the chosen angle; the state does not change
    const openAngle = shown && playback.progress !== null ? 10 + (state.A - 10) * playback.progress : state.A
    const view = { b: state.b, c: state.c, A: openAngle }
    const u = 20
    const baseY = 172
    const cosA = Math.cos(openAngle * D)
    const A: Point = [26 + Math.max(0, -state.b * cosA) * u, baseY]
    const B: Point = [A[0] + state.c * u, baseY]
    const C: Point = [A[0] + state.b * cosA * u, baseY - state.b * Math.sin(openAngle * D) * u]
    const square = hingeSquare(view)
    const correction = hingeCorrection(view)
    const sum = state.b * state.b + state.c * state.c
    // The bars: 280 px for the largest a² these sides can give, (b + c)²
    const k = 280 / ((state.b + state.c) * (state.b + state.c))
    const barX = 20
    const controls = (
        <>
            <Stepper label="b" value={state.b} min={HINGE_LIMITS.side.min} max={HINGE_LIMITS.side.max} onChange={(b) => setState((s) => setHinge(s, { b }))} language={props.language} />
            <Stepper label="c" value={state.c} min={HINGE_LIMITS.side.min} max={HINGE_LIMITS.side.max} onChange={(c) => setState((s) => setHinge(s, { c }))} language={props.language} />
            <Stepper label="A" value={state.A} min={HINGE_LIMITS.A.min} max={HINGE_LIMITS.A.max} step={HINGE_LIMITS.A.step} format={(value) => `${value}°`} onChange={(next) => setState((s) => setHinge(s, { A: next }))} language={props.language} />
        </>
    )
    const exact = hingeSquare(state)
    const side = hingeSide(state)
    const round = (value: number) => (Math.abs(value - Math.round(value)) < 1e-9 ? String(Math.round(value)) : texDec(value, props.language, 2))
    const lines = [
        'a^2=b^2+c^2-2bc\\cdot\\cos A',
        `a^2=${state.b * state.b}+${state.c * state.c}-${2 * state.b * state.c}\\cdot\\cos ${state.A}°`,
        `a^2${Math.abs(exact - Math.round(exact)) < 1e-9 ? '=' : '\\approx '}${round(exact)}`,
        `a${Math.abs(side - Math.round(side)) < 1e-9 ? '=' : '\\approx '}${round(side)}`
    ]
    const hingeNote = state.A === 90
        ? say('A = 90°: kosinua 0 da, eta Pitagoras geratzen da.', 'A = 90°: el coseno vale 0 y queda Pitágoras.', 'A = 90°: جيب التمام 0 ويبقى فيثاغورس.', 'A = 90°: the cosine is 0 and Pythagoras is left.')
        : state.A < 90
            ? say('A zorrotza: kosinua positiboa da, eta zuzenketak kendu egiten du.', 'A agudo: el coseno es positivo y la corrección resta.', 'A حادة: جيب التمام موجب والتصحيح يطرح.', 'A is acute: the cosine is positive and the correction takes away.')
            : say('A kamutsa: kosinua negatiboa da, eta zuzenketak batu egiten du.', 'A obtuso: el coseno es negativo y la corrección suma.', 'A منفرجة: جيب التمام سالب والتصحيح يضيف.', 'A is obtuse: the cosine is negative and the correction adds.')
    const readout = (
        <Predict
            language={props.language}
            question={say('Ikusi aurretik: $a^2$ txikiagoa, berdina ala handiagoa da $b^2+c^2$ baino?', 'Antes de verlo: ¿$a^2$ es menor, igual o mayor que $b^2+c^2$?', 'قبل أن ترى: هل $a^2$ أصغر من $b^2+c^2$ أم يساويه أم أكبر؟', 'Before you see it: is $a^2$ less than, equal to or greater than $b^2+c^2$?')}
            labels={{ '<': say('Txikiagoa', 'Menor', 'أصغر', 'Less'), '=': say('Berdina', 'Igual', 'يساوي', 'Equal'), '>': say('Handiagoa', 'Mayor', 'أكبر', 'Greater') }}
            actual={hingePrediction(state)}
            choice={state.prediction}
            tip={say('Begiratu A angeluari: zorrotza, zuzena ala kamutsa? Hark ematen du kosinuaren zeinua.', 'Mira el ángulo A: ¿agudo, recto u obtuso? Eso da el signo del coseno.', 'انظر إلى الزاوية A: حادة أم قائمة أم منفرجة؟ هذا يعطي إشارة جيب التمام.', 'Look at the angle A: acute, right or obtuse? That gives the sign of the cosine.')}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout latex={lines} note={l(hingeNote)} />
        </Predict>
    )
    const sumY = 206
    const squareY = 238
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={hingeChallenges} extraChallenges={hingeExtra} state={state}>
            <Board height={262} label={l(say(`b = ${state.b} eta c = ${state.c} aldeak, A = ${state.A}°: a² eta b² + c² konparatuta`, `Lados b = ${state.b} y c = ${state.c}, A = ${state.A}°: a² frente a b² + c²`, `الضلعان b = ${state.b} وc = ${state.c} وA = ${state.A}°: مقارنة a² بـ b² + c²`, `Sides b = ${state.b} and c = ${state.c}, A = ${state.A}°: a² against b² + c²`))}>
                <polygon points={points([A, B, C])} fill={PAPER} stroke="none" />
                <line x1={A[0]} y1={A[1]} x2={B[0]} y2={B[1]} stroke={GREEN} strokeWidth={4} />
                <line x1={A[0]} y1={A[1]} x2={C[0]} y2={C[1]} stroke={STAGE} strokeWidth={4} />
                <line x1={B[0]} y1={B[1]} x2={C[0]} y2={C[1]} stroke={shown ? SECOND : MUTED} strokeWidth={shown ? 4 : 2} strokeDasharray={shown ? undefined : '6 5'} />
                <Arc v={A} p={B} q={C} r={20} color={INK} />
                <circle cx={A[0]} cy={A[1]} r={5} fill={INK} />
                <text x={A[0] - 6} y={A[1] + 18} textAnchor="middle" fontSize={13} fontWeight={700} fill={INK}>A</text>
                <text x={A[0] + 24} y={A[1] - 6} fontSize={12} fontWeight={700} fill={INK}>{`${Math.round(openAngle)}°`}</text>
                <text x={(A[0] + B[0]) / 2} y={baseY + 18} textAnchor="middle" fontSize={13} fontWeight={700} fill={GREEN}>{`c = ${state.c}`}</text>
                <text x={(A[0] + C[0]) / 2 - 8} y={(A[1] + C[1]) / 2} textAnchor="end" fontSize={13} fontWeight={700} fill={STAGE}>{`b = ${state.b}`}</text>
                <text x={(B[0] + C[0]) / 2 + 8} y={(B[1] + C[1]) / 2} fontSize={13} fontWeight={700} fill={shown ? SECOND : MUTED}>{shown ? `a ≈ ${dec(Math.sqrt(square), props.language, 2)}` : 'a = ?'}</text>

                <rect x={barX} y={sumY - 9} width={state.b * state.b * k} height={18} fill={STAGE_TINT} stroke={STAGE} strokeWidth={1.4} />
                <rect x={barX + state.b * state.b * k} y={sumY - 9} width={state.c * state.c * k} height={18} fill={GREEN_TINT} stroke={GREEN} strokeWidth={1.4} />
                <text x={barX + sum * k + 6} y={sumY + 5} fontSize={12} fontWeight={700} fill={INK}>b² + c²</text>
                {shown
                    ? (
                        <g>
                            <rect x={barX} y={squareY - 9} width={Math.min(sum, square) * k} height={18} fill={SECOND_TINT} stroke={SECOND} strokeWidth={1.4} />
                            {correction > 0 && <rect x={barX + sum * k} y={squareY - 9} width={correction * k} height={18} fill={SECOND} opacity={0.8} />}
                            {correction < 0 && <rect x={barX + square * k} y={squareY - 9} width={-correction * k} height={18} fill="none" stroke={SECOND} strokeWidth={1.6} strokeDasharray="4 3" />}
                            <text x={barX + Math.max(sum, square) * k + 6} y={squareY + 5} fontSize={12} fontWeight={700} fill={SECOND}>a²</text>
                        </g>
                    )
                    : <Hidden x={barX + 40} y={squareY + 7} size={20} />}
            </Board>
            <PlayButton label={l(say('Ireki bisagra', 'Abrir la bisagra', 'افتح المفصل', 'Open the hinge'))} disabled={!shown} playing={playback.playing} onPlay={playback.play} />
        </ToolFrame>
    )
}

/* ---------- L3. The circle of 2R ---------- */

export function CircumcircleTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<CircumcircleState>(initialCircumcircleState)
    const shown = state.prediction !== null
    const playback = usePlayback(`${state.a}-${state.A}`, 2400)
    // ▶ slides A along its arc from next to C to next to B; the state does not change
    const position = shown && playback.progress !== null ? 0.5 + 9 * playback.progress : state.position
    const view = { a: state.a, A: state.A, position }
    const O: Point = [180, 132]
    const { A: a0, B: b0, C: c0, R } = circumcircleVertices(view)
    // 16 px a unit, so the circle grows with R, until it would not fit (R over 6.5)
    const u = Math.min(16, 105 / R)
    const at = ([x, y]: Point): Point => [O[0] + x * u, O[1] - y * u]
    const A = at(a0)
    const B = at(b0)
    const C = at(c0)
    const triangle = circumcircleTriangle(view)
    const controls = (
        <>
            <Stepper label="a" value={state.a} min={CIRCUMCIRCLE_LIMITS.a.min} max={CIRCUMCIRCLE_LIMITS.a.max} onChange={(a) => setState((s) => setCircumcircle(s, { a }))} language={props.language} />
            <Stepper label="A" value={state.A} min={CIRCUMCIRCLE_LIMITS.A.min} max={CIRCUMCIRCLE_LIMITS.A.max} step={CIRCUMCIRCLE_LIMITS.A.step} format={(value) => `${value}°`} onChange={(next) => setState((s) => setCircumcircle(s, { A: next }))} language={props.language} />
            <Stepper label={l(say('A arkuan', 'A en el arco', 'A على القوس', 'A on the arc'))} value={state.position} min={CIRCUMCIRCLE_LIMITS.position.min} max={CIRCUMCIRCLE_LIMITS.position.max} onChange={(next) => setState((s) => setCircumcircle(s, { position: next }))} language={props.language} />
        </>
    )
    const r = circumradius(state)
    const exact = Math.abs(r - Math.round(r)) < 1e-9
    const rounded = (value: number) => texDec(value, props.language, 2)
    const fixed = circumcircleTriangle(state)
    const lines = [
        `2R=\\frac{${state.a}}{\\sen ${state.A}°}${exact ? '=' : '\\approx '}${exact ? 2 * Math.round(r) : rounded(2 * r)}`,
        `R${exact ? '=' : '\\approx '}${exact ? Math.round(r) : rounded(r)}`,
        `\\frac{b}{\\sen B}=\\frac{${rounded(fixed.sides.b)}}{\\sen ${degrees(fixed.angles.B, props.language)}}\\approx ${rounded(2 * r)}`,
        `\\frac{c}{\\sen C}=\\frac{${rounded(fixed.sides.c)}}{\\sen ${degrees(fixed.angles.C, props.language)}}\\approx ${rounded(2 * r)}`
    ]
    const relation = circumcirclePrediction(state)
    const note = relation === '='
        ? say('$\\sen A=\\frac{1}{2}$: erradioa eta $a$ berdinak dira.', '$\\sen A=\\frac{1}{2}$: el radio y $a$ son iguales.', '$\\sen A=\\frac{1}{2}$: نصف القطر و$a$ متساويان.', '$\\sin A=\\frac{1}{2}$: the radius and $a$ are equal.')
        : relation === '<'
            ? say('$\\sen A>\\frac{1}{2}$: erradioa $a$ baino txikiagoa da.', '$\\sen A>\\frac{1}{2}$: el radio es menor que $a$.', '$\\sen A>\\frac{1}{2}$: نصف القطر أصغر من $a$.', '$\\sin A>\\frac{1}{2}$: the radius is less than $a$.')
            : say('$\\sen A<\\frac{1}{2}$: erradioa $a$ baino handiagoa da.', '$\\sen A<\\frac{1}{2}$: el radio es mayor que $a$.', '$\\sen A<\\frac{1}{2}$: نصف القطر أكبر من $a$.', '$\\sin A<\\frac{1}{2}$: the radius is greater than $a$.')
    const readout = (
        <Predict
            language={props.language}
            question={say('Ikusi aurretik: $R$ erradioa $a$ baino txikiagoa, berdina ala handiagoa da?', 'Antes de verlo: ¿el radio $R$ es menor, igual o mayor que $a$?', 'قبل أن ترى: هل نصف القطر $R$ أصغر من $a$ أم يساويه أم أكبر؟', 'Before you see it: is the radius $R$ less than, equal to or greater than $a$?')}
            labels={{ '<': say('Txikiagoa', 'Menor', 'أصغر', 'Less'), '=': say('Berdina', 'Igual', 'يساوي', 'Equal'), '>': say('Handiagoa', 'Mayor', 'أكبر', 'Greater') }}
            actual={relation}
            choice={state.prediction}
            tip={say('$R=\\frac{a}{2\\cdot\\sen A}$: konparatu $\\sen A$ eta $\\frac{1}{2}$.', '$R=\\frac{a}{2\\cdot\\sen A}$: compara $\\sen A$ con $\\frac{1}{2}$.', '$R=\\frac{a}{2\\cdot\\sen A}$: قارن $\\sen A$ بـ $\\frac{1}{2}$.', '$R=\\frac{a}{2\\cdot\\sin A}$: compare $\\sin A$ with $\\frac{1}{2}$.')}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout latex={lines.map((line) => tex(props.language, line))} note={l(note)} />
        </Predict>
    )
    const label = (p: Point, text: string, color = INK) => {
        const dx = p[0] - O[0]
        const dy = p[1] - O[1]
        const length = Math.hypot(dx, dy) || 1
        return <text x={p[0] + (dx / length) * 14} y={p[1] + (dy / length) * 14 + 5} textAnchor="middle" fontSize={13} fontWeight={700} fill={color}>{text}</text>
    }
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={circumcircleChallenges} extraChallenges={circumcircleExtra} state={state}>
            <Board height={270} label={l(say(`a = ${state.a} eta A = ${state.A}° dituen triangelua bere zirkunferentzian`, `El triángulo con a = ${state.a} y A = ${state.A}° en su circunferencia`, `المثلث الذي فيه a = ${state.a} وA = ${state.A}° في دائرته`, `The triangle with a = ${state.a} and A = ${state.A}° in its circle`))}>
                {shown && <circle cx={O[0]} cy={O[1]} r={R * u} fill={GREEN_TINT} fillOpacity={0.35} stroke={GREEN} strokeWidth={2} />}
                <polygon points={points([A, B, C])} fill={STAGE_TINT} fillOpacity={0.6} stroke={INK} strokeWidth={2} strokeLinejoin="round" />
                <line x1={B[0]} y1={B[1]} x2={C[0]} y2={C[1]} stroke={SECOND} strokeWidth={4} />
                <Arc v={A} p={B} q={C} r={18} color={SECOND} />
                {shown && (
                    <g>
                        <line x1={2 * O[0] - B[0]} y1={2 * O[1] - B[1]} x2={B[0]} y2={B[1]} stroke={GREEN} strokeWidth={2} strokeDasharray="6 4" />
                        <circle cx={O[0]} cy={O[1]} r={4} fill={GREEN} />
                        <text x={O[0] + 8} y={O[1] - 6} fontSize={12} fontWeight={700} fill={GREEN}>O</text>
                        <text x={352} y={262} textAnchor="end" fontSize={13} fontWeight={700} fill={GREEN}>{`2R ≈ ${dec(2 * R, props.language, 2)}`}</text>
                    </g>
                )}
                {label(A, 'A')}
                {label(B, 'B')}
                {label(C, 'C')}
                <text x={8} y={262} fontSize={13} fontWeight={700} fill={SECOND}>{`a = ${state.a} · A = ${state.A}°`}</text>
                <text x={8} y={18} fontSize={12} fontWeight={700} fill={MUTED}>{`B ≈ ${dec(triangle.angles.B, props.language, 1)}° · C ≈ ${dec(triangle.angles.C, props.language, 1)}°`}</text>
                {!shown && <Hidden x={O[0]} y={O[1] + 8} size={24} />}
            </Board>
            <PlayButton label={l(say('Mugitu A arkuan', 'Mover A por el arco', 'حرّك A على القوس', 'Move A along the arc'))} disabled={!shown} playing={playback.playing} onPlay={playback.play} />
        </ToolFrame>
    )
}
