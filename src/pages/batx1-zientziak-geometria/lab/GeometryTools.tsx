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
import { GREEN, INK, MUTED, PAPER, say, SECOND, STAGE, texDec } from '../../dbh3-segidak/lab/labStyle'
import { setPrediction } from '../../dbh3-segidak/lab/prediction'
import { fractionText } from '../../dbh4-akademikoak-bektoreak/lab/labTools'
import { usePlayback } from '../../dbh4-aplikatuak-proportzionaltasuna/lab/usePlayback'
import { crossOf, dotOf, hasLines, initialLineAngleState, lineAngleChallenges, lineAngleExtra, lineAngleOf, lineAnglePrediction, setLineAngle, squareOf, throughOriginLatex, ANGLE_LIMIT, type LineAngleState } from './lineAngle'
import { aboveBy, explicitLatex, heightAt, initialPencilState, pencilChallenges, pencilExtra, pencilPrediction, pencilSlope, pointSlopeLatex, PENCIL_LIMITS, PENCIL_SLOPES, setPencil, type Pair, type PencilState } from './pencil'
import { distanceOf, footOf, generalLatex, initialShortestState, isFoot, lineOf, normalSquare, pointQ, pqSquare, setShortest, SHORT_LINES, SHORT_POINT_LIMIT, shortestChallenges, shortestExtra, shortestPrediction, stepRange, valueAt, type ShortestState } from './shortest'

/* ==========================================================================
   Geometria analitikoa · Batxilergoa 1 · Zientziak — the three tools of
   this unit: the pencil of lines, the angle of two lines and the shortest
   distance from a point to a line. Each asks for a prediction before it
   shows the result; Q slides to the foot of the perpendicular with ▶.
   Logic in pencil.ts, lineAngle.ts and shortest.ts. Formulas sit in their
   own <text> (left to right in every language).
   ========================================================================== */

const minus = (value: number) => (value < 0 ? `−${-value}` : String(value))
/** √n in LaTeX, as a whole number when it is a perfect square */
const rootLatex = (n: number) => (Number.isInteger(Math.sqrt(n)) ? String(Math.sqrt(n)) : `\\sqrt{${n}}`)
/** A number for LaTeX: whole, or rounded to two decimals */
const exactOrRounded = (value: number, language: UnitLanguage) => (Math.abs(value - Math.round(value)) < 1e-9 ? String(Math.round(value)) : texDec(value, language, 2))
const approx = (value: number) => (Math.abs(value - Math.round(value)) < 1e-9 ? '=' : '\\approx ')

/** An arrow between two points in pixels */
function Arrow({ from, to, color = STAGE, width = 3 }: { from: Pair; to: Pair; color?: string; width?: number }) {
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
            <line x1={x1} y1={y1} x2={base[0]} y2={base[1]} stroke={color} strokeWidth={width} strokeLinecap="round" />
            <polygon points={`${x2},${y2} ${base[0] - uy * wing},${base[1] + ux * wing} ${base[0] + uy * wing},${base[1] - ux * wing}`} fill={color} />
        </g>
    )
}

/** A Cartesian board: the grid, its axes and what is drawn on it */
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

/** A dot with its name */
function Dot({ map, point, name, color, dx = 8, dy = -8 }: { map: PlaneMap; point: [number, number]; name: string; color: string; dx?: number; dy?: number }) {
    const [x, y] = at(map, point)
    return (
        <g>
            <circle cx={x} cy={y} r={5.5} fill={color} stroke={INK} strokeWidth={1.2} />
            <text x={x + dx} y={y + dy} textAnchor={dx < 0 ? 'end' : 'start'} fontSize={15} fontWeight={700} fill={color}>{name}</text>
        </g>
    )
}

/** Two steppers for a point or a vector */
function PairSteppers({ name, value, limit, onChange, language }: { name: string; value: Pair; limit: number; onChange: (value: Pair) => void; language: UnitLanguage }) {
    return (
        <>
            <Stepper label={`${name}₁`} value={value[0]} min={-limit} max={limit} format={minus} onChange={(x) => onChange([x, value[1]])} language={language} />
            <Stepper label={`${name}₂`} value={value[1]} min={-limit} max={limit} format={minus} onChange={(y) => onChange([value[0], y])} language={language} />
        </>
    )
}

/* ---------- L2. The pencil of lines ---------- */

const PLANE_BOX: PlaneBox = { xMin: -6, xMax: 6, yMin: -6, yMax: 6 }

export function PencilTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<PencilState>(initialPencilState)
    const { p, q } = state
    const shown = state.prediction !== null
    const m = pencilSlope(state)
    const mValue = m.numerator / m.denominator
    const height = heightAt(state, q[0])
    const actual = pencilPrediction(state)
    const controls = (
        <>
            <PairSteppers name="P" value={p} limit={PENCIL_LIMITS.centre} onChange={(value) => setState((s) => setPencil(s, { p: value }))} language={props.language} />
            <Stepper label="m" value={state.slope} min={0} max={PENCIL_SLOPES.length - 1} format={(index) => fractionText(PENCIL_SLOPES[index])} onChange={(slope) => setState((s) => setPencil(s, { slope }))} language={props.language} />
            <PairSteppers name="Q" value={q} limit={PENCIL_LIMITS.point} onChange={(value) => setState((s) => setPencil(s, { q: value }))} language={props.language} />
        </>
    )
    const comparison = actual === '=' ? '=' : actual === '>' ? '>' : '<'
    const note = actual === '='
        ? say('$Q$ zuzenaren gainean dago: sortako zuzen hau $Q$ puntutik pasatzen da.', '$Q$ está sobre la recta: esta recta del haz pasa por $Q$.', '$Q$ على المستقيم: مستقيم الحزمة هذا يمر بـ $Q$.', '$Q$ is on the line: this line of the pencil passes through $Q$.')
        : actual === '>'
            ? say('$Q$ zuzenaren gainetik dago.', '$Q$ está por encima de la recta.', '$Q$ فوق المستقيم.', '$Q$ is above the line.')
            : say('$Q$ zuzenaren azpitik dago.', '$Q$ está por debajo de la recta.', '$Q$ تحت المستقيم.', '$Q$ is below the line.')
    const readout = (
        <Predict
            language={props.language}
            question={say('Ikusi aurretik: $Q$ zuzenaren azpitik, gainean ala gainetik dago?', 'Antes de verlo: ¿$Q$ está por debajo, sobre o por encima de la recta?', 'قبل أن ترى: هل $Q$ تحت المستقيم أم عليه أم فوقه؟', 'Before you see it: is $Q$ below, on or above the line?')}
            labels={{ '<': say('Azpitik', 'Por debajo', 'تحته', 'Below'), '=': say('Gainean', 'Sobre ella', 'عليه', 'On it'), '>': say('Gainetik', 'Por encima', 'فوقه', 'Above') }}
            actual={actual}
            choice={state.prediction}
            tip={say('Kalkulatu zuzenaren altuera $Q$ puntuaren $x$ balioan: $y_0+m(x-x_0)$.', 'Calcula la altura de la recta en la $x$ de $Q$: $y_0+m(x-x_0)$.', 'احسب ارتفاع المستقيم عند $x$ للنقطة $Q$: $y_0+m(x-x_0)$.', 'Work out the height of the line at the $x$ of $Q$: $y_0+m(x-x_0)$.')}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout latex={[pointSlopeLatex(state), explicitLatex(state), `x=${q[0]}\\ \\to\\ y=${toLatex(height)}\\qquad ${q[1]}${comparison}${toLatex(height)}`]} note={l(note)} />
        </Predict>
    )
    const lineEnds = (slope: number): [Pair, Pair] => [[-20, p[1] + slope * (-20 - p[0])], [20, p[1] + slope * (20 - p[0])]]
    const [a, b] = lineEnds(mValue)
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={pencilChallenges} extraChallenges={pencilExtra} state={state}>
            <PlaneBoard box={PLANE_BOX} cell={24} height={344} label={l(say(`P(${p[0]}, ${p[1]}) zentroko zuzen-sorta, ${fractionText(m)} maldako zuzena eta Q(${q[0]}, ${q[1]}) puntua`, `El haz de centro P(${p[0]}, ${p[1]}), la recta de pendiente ${fractionText(m)} y el punto Q(${q[0]}, ${q[1]})`, `حزمة المستقيمات التي مركزها P(${p[0]}, ${p[1]}) والمستقيم الذي ميله ${fractionText(m)} والنقطة Q(${q[0]}, ${q[1]})`, `The pencil with centre P(${p[0]}, ${p[1]}), the line with slope ${fractionText(m)} and the point Q(${q[0]}, ${q[1]})`))}>
                {(map, clip) => (
                    <g>
                        <g clipPath={clip}>
                            {PENCIL_SLOPES.map((slope, index) => {
                                const [from, to] = lineEnds(slope.numerator / slope.denominator)
                                return <line key={index} x1={map.x(from[0])} y1={map.y(from[1])} x2={map.x(to[0])} y2={map.y(to[1])} stroke="#c9c0de" strokeWidth={1.1} />
                            })}
                            <line x1={map.x(p[0])} y1={map.y(-20)} x2={map.x(p[0])} y2={map.y(20)} stroke="#c9c0de" strokeWidth={1.1} strokeDasharray="4 4" />
                            <line x1={map.x(a[0])} y1={map.y(a[1])} x2={map.x(b[0])} y2={map.y(b[1])} stroke={STAGE} strokeWidth={3.4} />
                            {shown && aboveBy(state, q) !== 0 && <line x1={map.x(q[0])} y1={map.y(q[1])} x2={map.x(q[0])} y2={map.y(height.numerator / height.denominator)} stroke={actual === '>' ? GREEN : SECOND} strokeWidth={2} strokeDasharray="5 4" />}
                            {shown && <circle cx={map.x(q[0])} cy={map.y(height.numerator / height.denominator)} r={4} fill={STAGE} />}
                        </g>
                        <Dot map={map} point={p} name="P" color={INK} dx={-10} dy={-8} />
                        {shown ? <Dot map={map} point={q} name="Q" color={SECOND} /> : <Hidden x={map.x(q[0])} y={map.y(q[1]) + 8} size={22} />}
                    </g>
                )}
            </PlaneBoard>
        </ToolFrame>
    )
}

/* ---------- L3. The angle of two lines ---------- */

const ANGLE_BOX: PlaneBox = { xMin: -5, xMax: 5, yMin: -5, yMax: 5 }

export function LineAngleTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<LineAngleState>(initialLineAngleState)
    const { r, s } = state
    const shown = state.prediction !== null
    const angle = lineAngleOf(state)
    const actual = lineAnglePrediction(state)
    const controls = (
        <>
            <PairSteppers name="r" value={r} limit={ANGLE_LIMIT} onChange={(value) => setState((x) => setLineAngle(x, { r: value }))} language={props.language} />
            <PairSteppers name="s" value={s} limit={ANGLE_LIMIT} onChange={(value) => setState((x) => setLineAngle(x, { s: value }))} language={props.language} />
        </>
    )
    const dot = dotOf(r, s)
    const readout = actual === null || angle === null
        ? <Readout latex={[`\\vec{d}_r=(${r[0]},${r[1]})\\qquad \\vec{d}_s=(${s[0]},${s[1]})`]} note={l(say('Norabide-bektore bat nulua da: zuzen hori ez dago.', 'Un vector director es nulo: esa recta no existe.', 'أحد متجهي التوجيه معدوم: ذلك المستقيم غير موجود.', 'A direction vector is zero: that line does not exist.'))} />
        : (
            <Predict
                language={props.language}
                question={say('Ikusi aurretik: zuzenen angelua $45^\\circ$ baino txikiagoa, berdina ala handiagoa da?', 'Antes de verlo: ¿el ángulo de las rectas es menor, igual o mayor que $45^\\circ$?', 'قبل أن ترى: هل زاوية المستقيمين أصغر من $45^\\circ$ أم تساويها أم أكبر؟', 'Before you see it: is the angle of the lines less than, equal to or more than $45^\\circ$?')}
                labels={{ '<': say('Txikiagoa', 'Menor', 'أصغر', 'Less'), '=': say('Berdina', 'Igual', 'تساويها', 'Equal'), '>': say('Handiagoa', 'Mayor', 'أكبر', 'More') }}
                actual={actual}
                choice={state.prediction}
                tip={say('Konparatu kosinua eta $\\frac{\\sqrt{2}}{2}$: $2(\\vec{d}_r\\cdot\\vec{d}_s)^2$ eta $|\\vec{d}_r|^2|\\vec{d}_s|^2$.', 'Compara el coseno con $\\frac{\\sqrt{2}}{2}$: $2(\\vec{d}_r\\cdot\\vec{d}_s)^2$ frente a $|\\vec{d}_r|^2|\\vec{d}_s|^2$.', 'قارن جيب التمام بـ $\\frac{\\sqrt{2}}{2}$: ‏$2(\\vec{d}_r\\cdot\\vec{d}_s)^2$ مقابل $|\\vec{d}_r|^2|\\vec{d}_s|^2$.', 'Compare the cosine with $\\frac{\\sqrt{2}}{2}$: $2(\\vec{d}_r\\cdot\\vec{d}_s)^2$ against $|\\vec{d}_r|^2|\\vec{d}_s|^2$.')}
                onChoose={(prediction) => setState((x) => setPrediction(x, prediction))}
            >
                <Readout
                    latex={[
                        `r\\colon ${throughOriginLatex(r)}\\qquad s\\colon ${throughOriginLatex(s)}`,
                        `\\cos\\alpha=\\frac{|${dot}|}{${rootLatex(squareOf(r))}\\cdot ${rootLatex(squareOf(s))}}`,
                        `\\alpha${approx(angle)}${exactOrRounded(angle, props.language)}^\\circ`
                    ]}
                    note={l(crossOf(r, s) === 0
                        ? say('Bektoreak paraleloak dira: zuzenak bat datoz, eta angelua $0^\\circ$ da.', 'Los vectores son paralelos: las rectas coinciden y el ángulo es $0^\\circ$.', 'المتجهان متوازيان: المستقيمان منطبقان والزاوية $0^\\circ$.', 'The vectors are parallel: the lines coincide and the angle is $0^\\circ$.')
                        : dot < 0
                            ? say('Biderkadura negatiboa da, baina balio absolutuak angelu zorrotza ematen du.', 'El producto es negativo, pero el valor absoluto da el ángulo agudo.', 'الجداء سالب، لكن القيمة المطلقة تعطي الزاوية الحادة.', 'The product is negative, but the absolute value gives the acute angle.')
                            : say('Bi zuzenen angelua beti da zorrotza edo zuzena.', 'El ángulo de dos rectas siempre es agudo o recto.', 'زاوية مستقيمين حادة أو قائمة دائمًا.', 'The angle of two lines is always acute or right.'))}
                />
            </Predict>
        )
    /* The arc of the acute angle, in pixels: from r to s or to −s, whichever makes a non-obtuse angle */
    const arc = (map: PlaneMap) => {
        if (!hasLines(state) || crossOf(r, s) === 0) return null
        const other: Pair = dot < 0 ? [-s[0], -s[1]] : s
        const [ox, oy] = at(map, [0, 0])
        const radius = 34
        const unit = ([x, y]: Pair): Pair => [x / Math.hypot(x, y), -y / Math.hypot(x, y)]
        const u = unit(r)
        const v = unit(other)
        const sweep = u[0] * v[1] - u[1] * v[0] > 0 ? 1 : 0
        const middle = unit([r[0] / Math.hypot(...r) + other[0] / Math.hypot(...other), r[1] / Math.hypot(...r) + other[1] / Math.hypot(...other)])
        return (
            <g>
                <path d={`M ${ox + radius * u[0]} ${oy + radius * u[1]} A ${radius} ${radius} 0 0 ${sweep} ${ox + radius * v[0]} ${oy + radius * v[1]}`} fill="none" stroke={GREEN} strokeWidth={3} />
                <text x={ox + 52 * middle[0]} y={oy + 52 * middle[1] + 5} textAnchor="middle" fontSize={16} fontWeight={700} fill={GREEN}>α</text>
            </g>
        )
    }
    const long = (d: Pair, k: number): [number, number] => [k * d[0], k * d[1]]
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={lineAngleChallenges} extraChallenges={lineAngleExtra} state={state}>
            <PlaneBoard box={ANGLE_BOX} cell={28} height={334} label={l(say(`Jatorritik pasatzen diren bi zuzen: r, (${r[0]}, ${r[1]}) norabidean, eta s, (${s[0]}, ${s[1]}) norabidean`, `Dos rectas por el origen: r, con dirección (${r[0]}, ${r[1]}), y s, con dirección (${s[0]}, ${s[1]})`, `مستقيمان يمران بالأصل: r باتجاه (${r[0]}, ${r[1]}) وs باتجاه (${s[0]}, ${s[1]})`, `Two lines through the origin: r, with direction (${r[0]}, ${r[1]}), and s, with direction (${s[0]}, ${s[1]})`))}>
                {(map, clip) => (
                    <g>
                        <g clipPath={clip}>
                            {(r[0] !== 0 || r[1] !== 0) && <line x1={map.x(long(r, -20)[0])} y1={map.y(long(r, -20)[1])} x2={map.x(long(r, 20)[0])} y2={map.y(long(r, 20)[1])} stroke={STAGE} strokeWidth={2.4} />}
                            {(s[0] !== 0 || s[1] !== 0) && <line x1={map.x(long(s, -20)[0])} y1={map.y(long(s, -20)[1])} x2={map.x(long(s, 20)[0])} y2={map.y(long(s, 20)[1])} stroke={SECOND} strokeWidth={2.4} strokeDasharray={crossOf(r, s) === 0 ? '8 6' : undefined} />}
                            {shown && arc(map)}
                        </g>
                        <Arrow from={at(map, [0, 0])} to={at(map, r)} color={STAGE} width={3.8} />
                        <Arrow from={at(map, [0, 0])} to={at(map, s)} color={SECOND} width={3.8} />
                        {(r[0] !== 0 || r[1] !== 0) && <text x={map.x(r[0]) + 6} y={map.y(r[1]) - 6} fontSize={15} fontWeight={700} fill={STAGE}>r</text>}
                        {(s[0] !== 0 || s[1] !== 0) && <text x={map.x(s[0]) + 6} y={map.y(s[1]) + 16} fontSize={15} fontWeight={700} fill={SECOND}>s</text>}
                        {!shown && hasLines(state) && <Hidden x={map.x(0) + 30} y={map.y(0) - 18} size={20} />}
                    </g>
                )}
            </PlaneBoard>
        </ToolFrame>
    )
}

/* ---------- L4. The shortest distance ---------- */

export function ShortestTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<ShortestState>(initialShortestState)
    const { p } = state
    const line = lineOf(state)
    const q = pointQ(state)
    const foot = footOf(state)
    const atFoot = isFoot(state)
    const shown = state.prediction !== null
    const playback = usePlayback(`${state.line}-${p[0]}-${p[1]}-${state.t}`, 1600)
    const progress = shown && playback.progress !== null ? playback.progress : 0
    const moving: [number, number] = [q[0] + (foot[0] - q[0]) * progress, q[1] + (foot[1] - q[1]) * progress]
    const range = stepRange(state.line)
    const controls = (
        <>
            <Stepper label="r" value={state.line + 1} min={1} max={SHORT_LINES.length} onChange={(value) => setState((s) => setShortest(s, { line: value - 1 }))} language={props.language} />
            <PairSteppers name="P" value={p} limit={SHORT_POINT_LIMIT} onChange={(value) => setState((s) => setShortest(s, { p: value }))} language={props.language} />
            <Stepper label="Q" value={state.t} min={range.min} max={range.max} format={minus} onChange={(t) => setState((s) => setShortest(s, { t }))} language={props.language} />
        </>
    )
    const value = valueAt(state)
    const n = normalSquare(state)
    const distance = distanceOf(state)
    const pq = Math.sqrt(pqSquare(state))
    const readout = (
        <Predict
            language={props.language}
            question={say('Ikusi aurretik: $P$ puntutik $r$ zuzenerako distantzia $|PQ|$ baino txikiagoa, berdina ala handiagoa da?', 'Antes de verlo: la distancia de $P$ a $r$, ¿es menor, igual o mayor que $|PQ|$?', 'قبل أن ترى: هل المسافة من $P$ إلى $r$ أصغر من $|PQ|$ أم تساويه أم أكبر؟', 'Before you see it: is the distance from $P$ to $r$ less than, equal to or more than $|PQ|$?')}
            labels={{ '<': say('Txikiagoa', 'Menor', 'أصغر', 'Less'), '=': say('Berdina', 'Igual', 'تساويه', 'Equal'), '>': say('Handiagoa', 'Mayor', 'أكبر', 'More') }}
            actual={shortestPrediction(state)}
            choice={state.prediction}
            tip={say('Distantzia zuzeneko puntu guztietarako biderik laburrena da.', 'La distancia es el camino más corto a todos los puntos de la recta.', 'المسافة هي أقصر طريق إلى كل نقاط المستقيم.', 'The distance is the shortest way to all the points of the line.')}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout
                latex={[
                    `r\\colon ${generalLatex(line)}`,
                    `|PQ|=${rootLatex(pqSquare(state))}${pqSquare(state) === 0 || Number.isInteger(pq) ? '' : `\\approx ${exactOrRounded(pq, props.language)}`}`,
                    `d(P,r)=\\frac{|${value}|}{${rootLatex(n)}}${approx(distance)}${exactOrRounded(distance, props.language)}`
                ]}
                note={l(atFoot
                    ? say('$Q$ perpendikularraren oinean dago: $|PQ|$ distantzia da.', '$Q$ está en el pie de la perpendicular: $|PQ|$ es la distancia.', '$Q$ عند موقع العمود: $|PQ|$ هو المسافة.', '$Q$ is at the foot of the perpendicular: $|PQ|$ is the distance.')
                    : say('$Q$ ez da hurbilena: sakatu ▶ eta ikusi non dagoen oina.', '$Q$ no es el más cercano: pulsa ▶ y mira dónde está el pie.', '$Q$ ليست الأقرب: اضغط ▶ وانظر أين موقع العمود.', '$Q$ is not the closest one: press ▶ and see where the foot is.'))}
            />
        </Predict>
    )
    const { A, B, C } = line
    /* Two far points of the line Ax + By + C = 0 */
    const ends: [Pair, Pair] = B === 0 ? [[-C / A, -20], [-C / A, 20]] : [[-20, (-C + 20 * A) / B], [20, (-C - 20 * A) / B]]
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={shortestChallenges} extraChallenges={shortestExtra} state={state}>
            <PlaneBoard box={PLANE_BOX} cell={24} height={344} label={l(say(`r zuzena, P(${p[0]}, ${p[1]}) puntua eta zuzeneko Q(${q[0]}, ${q[1]}) puntua`, `La recta r, el punto P(${p[0]}, ${p[1]}) y el punto Q(${q[0]}, ${q[1]}) de la recta`, `المستقيم r والنقطة P(${p[0]}, ${p[1]}) والنقطة Q(${q[0]}, ${q[1]}) من المستقيم`, `The line r, the point P(${p[0]}, ${p[1]}) and the point Q(${q[0]}, ${q[1]}) of the line`))}>
                {(map, clip) => {
                    const [px, py] = at(map, p)
                    const [fx, fy] = at(map, foot)
                    const along = Math.hypot(B, A)
                    const [ux, uy] = [-B / along, -A / along]
                    const [nx, ny] = value === 0 ? [0, 0] : [(px - fx) / Math.hypot(px - fx, py - fy), (py - fy) / Math.hypot(px - fx, py - fy)]
                    const mark = 9
                    return (
                        <g>
                            <g clipPath={clip}>
                                <line x1={map.x(ends[0][0])} y1={map.y(ends[0][1])} x2={map.x(ends[1][0])} y2={map.y(ends[1][1])} stroke={STAGE} strokeWidth={3} />
                                {[-6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6].filter((t) => t >= range.min && t <= range.max).map((t) => {
                                    const point = pointQ({ line: state.line, t })
                                    return <circle key={t} cx={map.x(point[0])} cy={map.y(point[1])} r={2.6} fill={STAGE} />
                                })}
                                <line x1={px} y1={py} x2={map.x(q[0])} y2={map.y(q[1])} stroke={SECOND} strokeWidth={2} strokeDasharray="6 4" />
                                {shown && progress > 0 && <line x1={px} y1={py} x2={map.x(moving[0])} y2={map.y(moving[1])} stroke={MUTED} strokeWidth={1.6} />}
                                {shown && progress >= 1 && value !== 0 && (
                                    <g>
                                        <line x1={px} y1={py} x2={fx} y2={fy} stroke={GREEN} strokeWidth={3} />
                                        <path d={`M ${fx + mark * ux} ${fy + mark * uy} L ${fx + mark * ux + mark * nx} ${fy + mark * uy + mark * ny} L ${fx + mark * nx} ${fy + mark * ny}`} fill="none" stroke={GREEN} strokeWidth={1.6} />
                                    </g>
                                )}
                                {shown && progress > 0 && progress < 1 && <circle cx={map.x(moving[0])} cy={map.y(moving[1])} r={5} fill={MUTED} />}
                            </g>
                            <Dot map={map} point={p} name="P" color={INK} />
                            <Dot map={map} point={q} name="Q" color={SECOND} dx={8} dy={18} />
                            {shown && progress >= 1 && !atFoot && <Dot map={map} point={foot} name="H" color={GREEN} dx={-18 * nx - (nx < 0 ? -4 : 4)} dy={-18 * ny + 5} />}
                            {!shown && <Hidden x={(px + map.x(q[0])) / 2 + 14} y={(py + map.y(q[1])) / 2} size={20} />}
                        </g>
                    )
                }}
            </PlaneBoard>
            <PlayButton label={l(say('Bilatu txikiena', 'Buscar el mínimo', 'ابحث عن الأصغر', 'Find the minimum'))} disabled={!shown || atFoot} playing={playback.playing} onPlay={playback.play} />
        </ToolFrame>
    )
}
