import { useState, type ReactNode } from 'react'
import { MathText } from '../../../components/MathText'
import { Stepper, ToolFrame } from '../../../features/unit-v2/lab/LabKit'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import { useLabText } from '../../../features/unit-v2/lab/useLabText'
import type { FractionValue } from '../../../features/unit-v2/math/fraction'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import { AxisTitles, PlaneGrid, PlanePath, PlanePoint } from '../../dbh2-funtzioak-v2/plane'
import { useBoxClip } from '../../dbh2-funtzioak-v2/planeClip'
import { planeMap, type PlaneBox, type PlaneMap } from '../../dbh2-funtzioak-v2/planeMap'
import {
    ALIGN_A,
    ALIGN_B,
    alignChallenges,
    alignParameter,
    alignVector,
    bisectorChallenges,
    bisectorLine,
    CENTER_LIMIT,
    circleChallenges,
    combination,
    COMBINATION_LIMIT,
    COMBINATION_U,
    COMBINATION_V,
    combinationChallenges,
    continuousText,
    crossing,
    DIRECTION_LIMIT,
    explicitText,
    FIXED_LINE,
    formsChallenges,
    formsLine,
    fractionText,
    generalText,
    initialAlignState,
    initialBisectorState,
    initialCircleState,
    initialCombinationState,
    initialFormsState,
    initialParametricState,
    initialSegmentState,
    initialSlopeState,
    initialTwoLinesState,
    initialVectorState,
    INTERCEPT_LIMIT,
    isAligned,
    lineIntercept,
    lineSlope,
    midpoint,
    parametricChallenges,
    parametricLine,
    parametricPoint,
    parametricText,
    placeOf,
    POINT_LIMIT,
    positionOf,
    RADIUS_MAX,
    secondSlope,
    segmentChallenges,
    segmentSquare,
    setAlign,
    setBisector,
    setCircle,
    setCombination,
    setForms,
    setParametric,
    setSegment,
    setSlope,
    setTwoLines,
    setVector,
    slopeChallenges,
    slopeOf,
    SLOPES,
    squaredLength,
    T_LIMIT,
    twoLinesChallenges,
    vectorChallenges,
    vectorOf,
    type AlignState,
    type BisectorState,
    type CircleState,
    type CombinationState,
    type FormsState,
    type Line,
    type ParametricState,
    type Point,
    type SegmentState,
    type SlopeState,
    type TwoLinesState,
    type VectorState
} from './labTools'

/* ==========================================================================
   The ten tools of the Bektoreak eta zuzenak lab. Every tool draws on the
   same Cartesian plane, from −7 to 7, with the readings on its right.
   Formulas sit in their own <text> (left to right in every language);
   words go through <Label>.
   ========================================================================== */

type Text = { eu: string; es: string; en: string; ar: string }

const INK = 'var(--ink, #1d2733)'
const MUTED = 'var(--muted, #58616e)'
const STAGE = 'var(--stage, #2f6fdb)'
const SECOND = 'var(--second, #c4432a)'
const GREEN = 'var(--success, #267b53)'
const CARD = 'var(--card, #fffcf6)'
const TINT = 'rgba(47, 111, 219, 0.10)'

const say = (eu: string, es: string, ar: string, en: string): Text => ({ eu, es, en, ar })
const BOX: PlaneBox = { xMin: -7, xMax: 7, yMin: -7, yMax: 7 }
const BOARD_HEIGHT = 330

/** a/b in LaTeX */
const fracLatex = ({ numerator, denominator }: FractionValue) => (denominator === 1 ? String(numerator) : `${numerator < 0 ? '-' : ''}\\frac{${Math.abs(numerator)}}{${denominator}}`)
/** √n in LaTeX, as a whole number when it is a perfect square */
const rootLatex = (n: number) => (Number.isInteger(Math.sqrt(n)) ? String(Math.sqrt(n)) : `\\sqrt{${n}}`)
const rootText = (n: number) => (Number.isInteger(Math.sqrt(n)) ? String(Math.sqrt(n)) : `√${n}`)
/** A number with a real minus sign */
const num = (value: number) => (value < 0 ? `−${Math.abs(value)}` : String(value))
const pointText = ([x, y]: Point) => `(${num(x)}, ${num(y)})`
/** A negative number in brackets, for LaTeX */
const wrap = (value: number) => (value < 0 ? `(${value})` : String(value))

function Board({ label, children }: { label: string; children: (map: PlaneMap, clip: string) => ReactNode }) {
    const map = planeMap(BOX, 21, 20, 16)
    const [clipPath, clip] = useBoxClip(map)
    return (
        <svg viewBox={`0 0 ${map.width + 40} ${BOARD_HEIGHT}`} direction="ltr" role="img" aria-label={label} style={{ display: 'block', width: '100%', maxWidth: 420, height: 'auto', margin: '0 auto', fontFamily: '"Atkinson Hyperlegible", "Noto Sans Arabic", system-ui, sans-serif' }}>
            <defs>{clipPath}</defs>
            <rect x={20} y={16} width={map.width} height={map.height} fill={CARD} />
            <PlaneGrid map={map} labelStep={2} />
            <AxisTitles map={map} />
            {children(map, clip)}
        </svg>
    )
}

function Readout({ latex, note }: { latex: string; note: string }) {
    return (
        <>
            <span className="fraction-v2-lab-readout-main"><MathText text={latex.split(/\\q?quad/).map((part) => `$${part.trim()}$`).join(' ')} /></span>
            <span className="fraction-v2-lab-readout-note">{note}</span>
        </>
    )
}

/** An arrow from p to q in plane coordinates */
function Arrow({ map, from, to, color = STAGE, width = 3.2, dashed = false }: { map: PlaneMap; from: Point; to: Point; color?: string; width?: number; dashed?: boolean }) {
    const [x1, y1] = [map.x(from[0]), map.y(from[1])]
    const [x2, y2] = [map.x(to[0]), map.y(to[1])]
    const length = Math.hypot(x2 - x1, y2 - y1)
    if (length < 1) return null
    const [ux, uy] = [(x2 - x1) / length, (y2 - y1) / length]
    const head = Math.min(12, length * 0.6)
    const base = [x2 - ux * head, y2 - uy * head]
    const wing = head / 2
    return (
        <g>
            <line x1={x1} y1={y1} x2={base[0]} y2={base[1]} stroke={color} strokeWidth={width} strokeDasharray={dashed ? '6 5' : undefined} strokeLinecap="round" />
            <polygon points={`${x2},${y2} ${base[0] - uy * wing},${base[1] + ux * wing} ${base[0] + uy * wing},${base[1] - ux * wing}`} fill={color} />
        </g>
    )
}

/** The line Ax + By + C = 0 across the board */
function LineDraw({ map, line, clip, color = STAGE, width = 3, dashed = false }: { map: PlaneMap; line: Line; clip: string; color?: string; width?: number; dashed?: boolean }) {
    const { xMin, xMax } = BOX
    const points: Point[] = line.B === 0
        ? [[-line.C / line.A, BOX.yMin - 1], [-line.C / line.A, BOX.yMax + 1]]
        : [[xMin - 1, (-line.A * (xMin - 1) - line.C) / line.B], [xMax + 1, (-line.A * (xMax + 1) - line.C) / line.B]]
    return <PlanePath map={map} points={points} color={color} width={width} dashed={dashed} clip={clip} />
}

/** Two steppers for the coordinates of a point */
function PointSteppers({ name, point, limit = POINT_LIMIT, onChange, language }: { name: string; point: Point; limit?: number; onChange: (point: Point) => void; language: UnitLanguage }) {
    return (
        <>
            <Stepper label={`${name} · x`} value={point[0]} min={-limit} max={limit} format={num} onChange={(x) => onChange([x, point[1]])} language={language} />
            <Stepper label={`${name} · y`} value={point[1]} min={-limit} max={limit} format={num} onChange={(y) => onChange([point[0], y])} language={language} />
        </>
    )
}

/* ---------- 1. The vector from A to B ---------- */

export function VectorTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<VectorState>(initialVectorState)
    const { a, b } = state
    const v = vectorOf(state)
    const square = squaredLength(v)
    const controls = (
        <>
            <PointSteppers name="A" point={a} onChange={(point) => setState((s) => setVector(s, { a: point }))} language={props.language} />
            <PointSteppers name="B" point={b} onChange={(point) => setState((s) => setVector(s, { b: point }))} language={props.language} />
        </>
    )
    const latex = `\\overrightarrow{AB}=(${b[0]}-${wrap(a[0])},${b[1]}-${wrap(a[1])})=(${v[0]},${v[1]})\\quad|\\overrightarrow{AB}|=\\sqrt{${square}}${Number.isInteger(Math.sqrt(square)) ? `=${Math.sqrt(square)}` : ''}`
    return (
        <ToolFrame {...props} controls={controls} readout={<Readout latex={latex} note={l(say('Muturra ken jatorria; modulua, Pitagorasekin.', 'Extremo menos origen; el módulo, con Pitágoras.', 'الطرف ناقص الأصل؛ والطول بفيثاغورس.', 'End point minus start point; the magnitude, using Pythagoras\' theorem.'))} />} challenges={vectorChallenges} state={state}>
            <Board label={l(say('A-tik B-rako bektorea, haren katetoekin', 'El vector de A a B, con sus catetos', 'المتجه من A إلى B مع ضلعيه', 'The vector from A to B, with its legs'))}>
                {(map) => (
                    <g>
                        <PlanePath map={map} points={[a, [b[0], a[1]]]} color={GREEN} width={2} dashed />
                        <PlanePath map={map} points={[[b[0], a[1]], b]} color={SECOND} width={2} dashed />
                        <Arrow map={map} from={a} to={b} />
                        <PlanePoint map={map} point={a} name="A" color={INK} />
                        <PlanePoint map={map} point={b} name="B" color={INK} />
                    </g>
                )}
            </Board>
            <Readings rows={[[`AB = ${pointText(v)}`, STAGE], [`|AB| = ${rootText(square)}`, INK]]} />
        </ToolFrame>
    )
}

/** The readings drawn in a strip under the board (kept out of the plane) */
function Readings({ rows }: { rows: Array<[string, string]> }) {
    return (
        <svg viewBox={`0 0 420 ${rows.length * 28 + 10}`} direction="ltr" style={{ display: 'block', width: '100%', maxWidth: 420, height: 'auto', margin: '0 auto' }} aria-hidden="true">
            {rows.map(([text, color], index) => <text key={index} x={210} y={24 + index * 28} textAnchor="middle" fontSize={18} fontWeight={700} fill={color}>{text}</text>)}
        </svg>
    )
}

/* ---------- 2. The combination a·u + b·v ---------- */

export function CombinationTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<CombinationState>(initialCombinationState)
    const { a, b } = state
    const au: Point = [a * COMBINATION_U[0], a * COMBINATION_U[1]]
    const result = combination(state)
    const controls = (
        <>
            <Stepper label="a" value={a} min={-COMBINATION_LIMIT} max={COMBINATION_LIMIT} format={num} onChange={(value) => setState((s) => setCombination(s, { a: value }))} language={props.language} />
            <Stepper label="b" value={b} min={-COMBINATION_LIMIT} max={COMBINATION_LIMIT} format={num} onChange={(value) => setState((s) => setCombination(s, { b: value }))} language={props.language} />
        </>
    )
    const latex = `${a}\\cdot(2,1)+(${b})\\cdot(-1,2)=(${result[0]},${result[1]})`
    return (
        <ToolFrame {...props} controls={controls} readout={<Readout latex={latex} note={l(say('u = (2, 1) eta v = (−1, 2): lehenik a · u, eta haren muturretik b · v.', 'u = (2, 1) y v = (−1, 2): primero a · u y, desde su extremo, b · v.', 'u = (2, 1) وv = (−1, 2): أولًا a · u ثم من طرفه b · v.', 'u = (2, 1) and v = (−1, 2): first a · u and then, from its end point, b · v.'))} />} challenges={combinationChallenges} state={state}>
            <Board label={l(say('a · u bektorea eta haren muturretik b · v; emaitza jatorritik', 'El vector a · u y desde su extremo b · v; el resultado desde el origen', 'المتجه a · u ومن طرفه b · v؛ والناتج من الأصل', 'The vector a · u and, from its end point, b · v; the result from the origin'))}>
                {(map) => (
                    <g>
                        <Arrow map={map} from={[0, 0]} to={COMBINATION_U} color={MUTED} width={2} dashed />
                        <Arrow map={map} from={[0, 0]} to={COMBINATION_V} color={MUTED} width={2} dashed />
                        <Arrow map={map} from={[0, 0]} to={au} color={SECOND} />
                        <Arrow map={map} from={au} to={result} color={GREEN} />
                        <Arrow map={map} from={[0, 0]} to={result} color={STAGE} width={4} />
                        <PlanePoint map={map} point={result} color={STAGE} />
                    </g>
                )}
            </Board>
            <Readings rows={[[`${num(a)}·u = ${pointText(au)}`, SECOND], [`${num(b)}·v = ${pointText([b * COMBINATION_V[0], b * COMBINATION_V[1]])}`, GREEN], [`a·u + b·v = ${pointText(result)}`, STAGE]]} />
        </ToolFrame>
    )
}

/* ---------- 3. A segment: length and midpoint ---------- */

export function SegmentTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<SegmentState>(initialSegmentState)
    const { a, b } = state
    const [mx, my] = midpoint(state)
    const square = segmentSquare(state)
    const controls = (
        <>
            <PointSteppers name="A" point={a} onChange={(point) => setState((s) => setSegment(s, { a: point }))} language={props.language} />
            <PointSteppers name="B" point={b} onChange={(point) => setState((s) => setSegment(s, { b: point }))} language={props.language} />
        </>
    )
    const latex = `M=\\left(${fracLatex(mx)},${fracLatex(my)}\\right)\\quad d(A,B)=\\sqrt{${square}}${Number.isInteger(Math.sqrt(square)) ? `=${Math.sqrt(square)}` : ''}`
    return (
        <ToolFrame {...props} controls={controls} readout={<Readout latex={latex} note={l(say('Erdiko puntua: batu eta zatitu 2. Luzera: kendurak karratura.', 'Punto medio: suma y divide entre 2. Longitud: diferencias al cuadrado.', 'المنتصف: اجمع واقسم على 2. الطول: ربّع الفرقين.', 'Midpoint: add and divide by 2. Length: squared differences.'))} />} challenges={segmentChallenges} state={state}>
            <Board label={l(say('AB zuzenkia eta haren erdiko puntua', 'El segmento AB y su punto medio', 'القطعة AB ومنتصفها', 'The segment AB and its midpoint'))}>
                {(map) => (
                    <g>
                        <PlanePath map={map} points={[a, b]} color={STAGE} width={3.4} />
                        <PlanePoint map={map} point={a} name="A" color={INK} />
                        <PlanePoint map={map} point={b} name="B" color={INK} />
                        <PlanePoint map={map} point={[mx.numerator / mx.denominator, my.numerator / my.denominator]} name="M" color={SECOND} radius={6} />
                    </g>
                )}
            </Board>
            <Readings rows={[[`M = (${fractionText(mx)}, ${fractionText(my)})`, SECOND], [`d(A, B) = ${rootText(square)}`, STAGE]]} />
        </ToolFrame>
    )
}

/* ---------- 4. The third point ---------- */

export function AlignTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<AlignState>(initialAlignState)
    const { c } = state
    const ac = alignVector(state)
    const aligned = isAligned(state)
    const t = alignParameter(state)
    const controls = <PointSteppers name="C" point={c} onChange={(point) => setState((s) => setAlign(s, { c: point }))} language={props.language} />
    const latex = `\\overrightarrow{AB}=(4,2)\\quad\\overrightarrow{AC}=(${ac[0]},${ac[1]})\\quad 4\\cdot ${ac[1] < 0 ? `(${ac[1]})` : ac[1]}-2\\cdot ${ac[0] < 0 ? `(${ac[0]})` : ac[0]}=${4 * ac[1] - 2 * ac[0]}`
    const status = aligned
        ? (t > 1 ? say('Lerrokatuta, B-tik harago', 'Alineado, más allá de B', 'على الاستقامة نفسها بعد B', 'Collinear, beyond B') : t < 0 ? say('Lerrokatuta, A-ren atzean', 'Alineado, detrás de A', 'على الاستقامة نفسها خلف A', 'Collinear, behind A') : say('Lerrokatuta, A eta B artean', 'Alineado, entre A y B', 'على الاستقامة نفسها بين A وB', 'Collinear, between A and B'))
        : 4 * ac[0] + 2 * ac[1] === 0 ? say('Angelu zuzena A-n', 'Ángulo recto en A', 'زاوية قائمة في A', 'Right angle at A') : say('Ez dago lerrokatuta', 'No está alineado', 'ليست على الاستقامة نفسها', 'Not collinear')
    return (
        <ToolFrame {...props} controls={controls} readout={<Readout latex={latex} note={l(say('Biderkadura gurutzatua 0 bada, lerrokatuta.', 'Si el producto cruzado es 0, están alineados.', 'إذا كان الضرب التبادلي 0 فهي على استقامة واحدة.', 'If the cross product is 0, they are collinear.'))} />} challenges={alignChallenges} state={state}>
            <Board label={l(say('A eta B finkoak eta C puntua, AB zuzenarekin', 'A y B fijos y el punto C, con la recta AB', 'A وB ثابتتان والنقطة C مع المستقيم AB', 'A and B fixed, and point C, with the straight line AB'))}>
                {(map, clip) => (
                    <g>
                        <LineDraw map={map} line={{ A: 1, B: -2, C: 1 }} clip={clip} color={MUTED} width={1.6} dashed />
                        <polygon points={[ALIGN_A, ALIGN_B, c].map(([x, y]) => `${map.x(x)},${map.y(y)}`).join(' ')} fill={TINT} stroke="none" />
                        <Arrow map={map} from={ALIGN_A} to={ALIGN_B} />
                        <Arrow map={map} from={ALIGN_A} to={c} color={aligned ? GREEN : SECOND} width={2.6} />
                        <PlanePoint map={map} point={ALIGN_A} name="A" color={INK} dx={-18} />
                        <PlanePoint map={map} point={ALIGN_B} name="B" color={INK} />
                        <PlanePoint map={map} point={c} name="C" color={aligned ? GREEN : SECOND} />
                    </g>
                )}
            </Board>
            <Readings rows={[[`AC = ${pointText(ac)}`, aligned ? GREEN : SECOND]]} />
            <p className="fraction-v2-lab-readout-note" style={{ textAlign: 'center', margin: 0 }}>{l(status)}</p>
        </ToolFrame>
    )
}

/* ---------- 5. A point, a direction and t ---------- */

export function ParametricTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<ParametricState>(initialParametricState)
    const { p, d, t } = state
    const point = parametricPoint(state)
    const controls = (
        <>
            <PointSteppers name="P" point={p} onChange={(next) => setState((s) => setParametric(s, { p: next }))} language={props.language} />
            <PointSteppers name="d" point={d} limit={DIRECTION_LIMIT} onChange={(next) => setState((s) => setParametric(s, { d: next }))} language={props.language} />
            <Stepper label="t" value={t} min={-T_LIMIT} max={T_LIMIT} format={num} onChange={(value) => setState((s) => setParametric(s, { t: value }))} language={props.language} />
        </>
    )
    const latex = `(x,y)=(${p[0]},${p[1]})+${t < 0 ? `(${t})` : t}\\cdot(${d[0]},${d[1]})=(${point[0]},${point[1]})`
    return (
        <ToolFrame {...props} controls={controls} readout={<Readout latex={latex} note={parametricText(p, d)} />} challenges={parametricChallenges} state={state}>
            <Board label={l(say('P puntutik d norabidean doan zuzena eta t-k ematen duen puntua', 'La recta que sale de P en la dirección d y el punto que da t', 'المستقيم الخارج من P في اتجاه d والنقطة التي يعطيها t', 'The straight line from P in direction d, and the point given by t'))}>
                {(map, clip) => (
                    <g>
                        <LineDraw map={map} line={parametricLine(state)} clip={clip} color={STAGE} width={2.4} />
                        {[-3, -2, -1, 1, 2, 3].map((k) => <circle key={k} cx={map.x(p[0] + k * d[0])} cy={map.y(p[1] + k * d[1])} r={3} fill={MUTED} clipPath={clip} />)}
                        <Arrow map={map} from={p} to={[p[0] + d[0], p[1] + d[1]]} color={SECOND} />
                        <PlanePoint map={map} point={p} name="P" color={INK} />
                        {t !== 0 && <PlanePoint map={map} point={point} name={`t = ${num(t)}`} color={GREEN} radius={6} />}
                    </g>
                )}
            </Board>
        </ToolFrame>
    )
}

/* ---------- 6. The same line in every form ---------- */

export function FormsTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<FormsState>(initialFormsState)
    const { p, d } = state
    const line = formsLine(state)
    const m = lineSlope(line)
    const n = lineIntercept(line)
    const continuous = continuousText(p, d)
    const controls = (
        <>
            <PointSteppers name="P" point={p} onChange={(next) => setState((s) => setForms(s, { p: next }))} language={props.language} />
            <PointSteppers name="d" point={d} limit={DIRECTION_LIMIT} onChange={(next) => setState((s) => setForms(s, { d: next }))} language={props.language} />
        </>
    )
    const latex = m === null ? `x=${fracLatex({ numerator: -line.C, denominator: line.A })}` : `m=${fracLatex(m)}\\quad n=${fracLatex(n!)}`
    return (
        <ToolFrame {...props} controls={controls} readout={<Readout latex={latex} note={m === null ? l(say('Zuzen bertikala: ez du maldarik.', 'Recta vertical: no tiene pendiente.', 'مستقيم رأسي: لا ميل له.', 'Vertical straight line: it has no slope.')) : l(say('Malda eta jatorriko ordenatua.', 'Pendiente y ordenada en el origen.', 'الميل والمقطع الصادي.', 'Slope and y-intercept.'))} />} challenges={formsChallenges} state={state}>
            <Board label={l(say('P puntutik d norabidean doan zuzena', 'La recta por P con dirección d', 'المستقيم المار بـ P في اتجاه d', 'The straight line through P with direction d'))}>
                {(map, clip) => (
                    <g>
                        <LineDraw map={map} line={line} clip={clip} />
                        <Arrow map={map} from={p} to={[p[0] + d[0], p[1] + d[1]]} color={SECOND} />
                        <PlanePoint map={map} point={p} name="P" color={INK} />
                    </g>
                )}
            </Board>
            <Readings rows={[
                [parametricText(p, d), MUTED],
                [continuous ?? '—', MUTED],
                [generalText(line), STAGE],
                [explicitText(line), GREEN]
            ]} />
        </ToolFrame>
    )
}

/* ---------- 7. The slope between two points ---------- */

export function SlopeTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<SlopeState>(initialSlopeState)
    const { a, b } = state
    const m = slopeOf(state)
    const controls = (
        <>
            <PointSteppers name="A" point={a} onChange={(point) => setState((s) => setSlope(s, { a: point }))} language={props.language} />
            <PointSteppers name="B" point={b} onChange={(point) => setState((s) => setSlope(s, { b: point }))} language={props.language} />
        </>
    )
    const rise = b[1] - a[1]
    const run = b[0] - a[0]
    const latex = m === null ? `m=\\frac{${rise}}{0}\\ \\nexists` : `m=\\frac{${rise}}{${run}}=${fracLatex(m)}`
    const kind = m === null ? say('Bertikala', 'Vertical', 'رأسي', 'Vertical') : m.numerator === 0 ? say('Horizontala', 'Horizontal', 'أفقي', 'Horizontal') : m.numerator > 0 ? say('Gorakorra', 'Creciente', 'متزايد', 'Increasing') : say('Beherakorra', 'Decreciente', 'متناقص', 'Decreasing')
    return (
        <ToolFrame {...props} controls={controls} readout={<Readout latex={latex} note={l(kind)} />} challenges={slopeChallenges} state={state}>
            <Board label={l(say('A eta B puntuetatik pasatzen den zuzena, aurrerapena eta igoera', 'La recta por A y B, con lo que avanza y lo que sube', 'المستقيم المار بـ A وB مع التقدّم والصعود', 'The straight line through A and B, with its run and rise'))}>
                {(map, clip) => (
                    <g>
                        {!(a[0] === b[0] && a[1] === b[1]) && <LineDraw map={map} line={{ A: rise, B: -run, C: run * a[1] - rise * a[0] }} clip={clip} />}
                        <PlanePath map={map} points={[a, [b[0], a[1]]]} color={GREEN} width={2.4} dashed />
                        <PlanePath map={map} points={[[b[0], a[1]], b]} color={SECOND} width={2.4} dashed />
                        <PlanePoint map={map} point={a} name="A" color={INK} />
                        <PlanePoint map={map} point={b} name="B" color={INK} />
                    </g>
                )}
            </Board>
            <Readings rows={[[`${l(say('aurrerapena', 'avance', 'التقدّم', 'run'))} ${num(run)}   ·   ${l(say('igoera', 'subida', 'الصعود', 'rise'))} ${num(rise)}`, MUTED]]} />
        </ToolFrame>
    )
}

/* ---------- 8. A second line against y = 2x − 1 ---------- */

const positionNames = {
    secant: say('Ebakitzaileak', 'Secantes', 'متقاطعان', 'Intersecting'),
    parallel: say('Paraleloak', 'Paralelas', 'متوازيان', 'Parallel'),
    coincident: say('Bat datozenak', 'Coincidentes', 'منطبقان', 'Coincident')
}

export function TwoLinesTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<TwoLinesState>(initialTwoLinesState)
    const m = secondSlope(state)
    const position = positionOf(state)
    const point = crossing(state)
    const perpendicular = Math.abs((m.numerator / m.denominator) * 2 + 1) < 1e-9
    const controls = (
        <>
            <Stepper label={l(say('s-ren malda', 'Pendiente de s', 'ميل s', 'Slope of s'))} value={state.slope} min={0} max={SLOPES.length - 1} format={(index) => fractionText(SLOPES[index])} onChange={(value) => setState((s) => setTwoLines(s, { slope: value }))} language={props.language} />
            <Stepper label="n" value={state.n} min={-INTERCEPT_LIMIT} max={INTERCEPT_LIMIT} format={num} onChange={(value) => setState((s) => setTwoLines(s, { n: value }))} language={props.language} />
        </>
    )
    const sLine: Line = { A: -m.numerator, B: m.denominator, C: -state.n * m.denominator }
    const latex = `r\\colon y=2x-1\\quad s\\colon y=${m.numerator === 0 ? '' : `${m.denominator === 1 && Math.abs(m.numerator) === 1 ? (m.numerator < 0 ? '-' : '') : fracLatex(m)}x`}${state.n === 0 && m.numerator !== 0 ? '' : state.n < 0 || m.numerator === 0 ? state.n : `+${state.n}`}`
    const note = `${l(positionNames[position])}${perpendicular ? ` · ${l(say('perpendikularrak', 'perpendiculares', 'متعامدان', 'perpendicular'))}` : ''}${point ? ` · (${fractionText(fractionOf(point[0]))}, ${fractionText(fractionOf(point[1]))})` : ''}`
    return (
        <ToolFrame {...props} controls={controls} readout={<Readout latex={latex} note={note} />} challenges={twoLinesChallenges} state={state}>
            <Board label={l(say('r zuzen finkoa eta s zuzena', 'La recta fija r y la recta s', 'المستقيم الثابت r والمستقيم s', 'The fixed straight line r and the straight line s'))}>
                {(map, clip) => (
                    <g>
                        <LineDraw map={map} line={{ A: 2, B: -1, C: -1 }} clip={clip} color={STAGE} width={3.4} />
                        <LineDraw map={map} line={sLine} clip={clip} color={SECOND} width={2.6} dashed={position === 'coincident'} />
                        {point && Math.abs(point[0]) <= 7 && Math.abs(point[1]) <= 7 && <PlanePoint map={map} point={point} color={GREEN} radius={6} />}
                    </g>
                )}
            </Board>
            <Readings rows={[[`r: y = 2x − 1   (m = ${fractionText(FIXED_LINE.m)})`, STAGE], [`s: m′ = ${fractionText(m)},  n = ${num(state.n)}`, SECOND]]} />
        </ToolFrame>
    )
}

/** A crossing coordinate as a fraction (they come from small whole numbers) */
function fractionOf(value: number): FractionValue {
    for (let denominator = 1; denominator <= 24; denominator += 1) {
        const numerator = Math.round(value * denominator)
        if (Math.abs(numerator / denominator - value) < 1e-9) {
            const common = gcdOf(Math.abs(numerator), denominator)
            return { numerator: numerator / common, denominator: denominator / common }
        }
    }
    return { numerator: Math.round(value * 100), denominator: 100 }
}
const gcdOf = (a: number, b: number): number => (b === 0 ? a || 1 : gcdOf(b, a % b))

/* ---------- 9. The bisector of a segment ---------- */

export function BisectorTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<BisectorState>(initialBisectorState)
    const { a, b } = state
    const line = bisectorLine(state)
    const [mx, my] = midpoint(state)
    const controls = (
        <>
            <PointSteppers name="A" point={a} onChange={(point) => setState((s) => setBisector(s, { a: point }))} language={props.language} />
            <PointSteppers name="B" point={b} onChange={(point) => setState((s) => setBisector(s, { b: point }))} language={props.language} />
        </>
    )
    const latex = line ? `M=\\left(${fracLatex(mx)},${fracLatex(my)}\\right)\\quad ${generalText(line).replace(/−/g, '-')}` : 'A=B'
    return (
        <ToolFrame {...props} controls={controls} readout={<Readout latex={latex} note={line ? explicitText(line) : l(say('A eta B desberdinak izan behar dira.', 'A y B tienen que ser distintos.', 'يجب أن تختلف A وB.', 'A and B must be different.'))} />} challenges={bisectorChallenges} state={state}>
            <Board label={l(say('AB zuzenkia, haren erdiko puntua eta erdibitzailea', 'El segmento AB, su punto medio y su mediatriz', 'القطعة AB ومنتصفها ومحورها', 'The segment AB, its midpoint and its perpendicular bisector'))}>
                {(map, clip) => (
                    <g>
                        {line && <LineDraw map={map} line={line} clip={clip} color={SECOND} />}
                        <PlanePath map={map} points={[a, b]} color={STAGE} width={3.2} />
                        <PlanePoint map={map} point={a} name="A" color={INK} />
                        <PlanePoint map={map} point={b} name="B" color={INK} />
                        <PlanePoint map={map} point={[mx.numerator / mx.denominator, my.numerator / my.denominator]} name="M" color={SECOND} />
                    </g>
                )}
            </Board>
        </ToolFrame>
    )
}

/* ---------- 10. A circumference and a point ---------- */

const placeNames = {
    inside: say('P barruan dago', 'P está dentro', 'P داخل الدائرة', 'P is inside'),
    on: say('P zirkunferentzian dago', 'P está sobre la circunferencia', 'P على الدائرة', 'P is on the circumference'),
    outside: say('P kanpoan dago', 'P está fuera', 'P خارج الدائرة', 'P is outside')
}

export function CircleTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<CircleState>(initialCircleState)
    const { center, r, p } = state
    const place = placeOf(state)
    const square = squaredLength([p[0] - center[0], p[1] - center[1]])
    const controls = (
        <>
            <PointSteppers name="C" point={center} limit={CENTER_LIMIT} onChange={(point) => setState((s) => setCircle(s, { center: point }))} language={props.language} />
            <Stepper label="r" value={r} min={1} max={RADIUS_MAX} onChange={(value) => setState((s) => setCircle(s, { r: value }))} language={props.language} />
            <PointSteppers name="P" point={p} limit={POINT_LIMIT + 1} onChange={(point) => setState((s) => setCircle(s, { p: point }))} language={props.language} />
        </>
    )
    const part = (letter: string, k: number) => (k === 0 ? `${letter}^{2}` : `(${letter}${k > 0 ? '-' : '+'}${Math.abs(k)})^{2}`)
    const latex = `${part('x', center[0])}+${part('y', center[1])}=${r * r}\\quad d(P,C)=${rootLatex(square)}`
    return (
        <ToolFrame {...props} controls={controls} readout={<Readout latex={latex} note={l(placeNames[place])} />} challenges={circleChallenges} state={state}>
            <Board label={l(say('C zentroko eta r erradioko zirkunferentzia eta P puntua', 'La circunferencia de centro C y radio r, y el punto P', 'الدائرة التي مركزها C ونصف قطرها r، والنقطة P', 'The circumference with centre C and radius r, and the point P'))}>
                {(map, clip) => (
                    <g>
                        <circle cx={map.x(center[0])} cy={map.y(center[1])} r={r * map.cell} fill={TINT} stroke={STAGE} strokeWidth={3} clipPath={clip} />
                        <PlanePath map={map} points={[center, p]} color={place === 'on' ? GREEN : SECOND} width={2.2} dashed />
                        <PlanePoint map={map} point={center} name="C" color={INK} />
                        <PlanePoint map={map} point={p} name="P" color={place === 'on' ? GREEN : SECOND} />
                    </g>
                )}
            </Board>
        </ToolFrame>
    )
}
