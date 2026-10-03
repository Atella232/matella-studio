import { useState, type ReactNode } from 'react'
import { MathText } from '../../../components/MathText'
import { Segmented, Stepper, ToolFrame } from '../../../features/unit-v2/lab/LabKit'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import { useLabText } from '../../../features/unit-v2/lab/useLabText'
import {
    baseSquare,
    BOX_MAX,
    boxChallenges,
    chordLength,
    CIRCLE_RADIUS_MAX,
    circleChallenges,
    circleSquare,
    classifyChallenges,
    exactRoot,
    figureBuilds,
    figureChallenges,
    figureParams,
    FIGURE_SHAPES,
    GRID_MAX,
    gridChallenges,
    gridSquare,
    gridSteps,
    hiddenTriangle,
    hypotenuseSquare,
    initialBoxState,
    initialCircleState,
    initialClassifyState,
    initialFigureState,
    initialGridState,
    initialSolveState,
    initialSquaresState,
    LEG_MAX,
    setBox,
    setCircle,
    setClassify,
    setFigure,
    setGrid,
    setSolve,
    setSquares,
    SIDE_MAX,
    SOLVE_MAX,
    solveChallenges,
    sortedSides,
    spaceSquare,
    squaresChallenges,
    TANGENT_MAX,
    triangleKind,
    unknownSquare,
    type BoxState,
    type CircleMode,
    type CircleState,
    type ClassifyState,
    type FigureShape,
    type FigureState,
    type GridState,
    type SolveState,
    type SquaresState,
    type TriangleKind,
    type Unknown
} from './labTools'

const INK = 'var(--ink, #1d2733)'
const MUTED = 'var(--muted, #58616e)'
const STAGE = 'var(--stage, #2f6fdb)'
const STAGE_TINT = 'var(--stage-tint, #dde7f7)'
const SECOND = 'var(--second, #c4432a)'
const GREEN = 'var(--success, #267b53)'
const CARD = 'var(--card, #fffcf6)'
const SOFT = '#fbebc0'
const ROSE = '#f6d9d2'
const MINT = '#d6eddf'

type Point = [number, number]
type Text = { eu: string; es: string; ar: string }

const say = (eu: string, es: string, ar: string): Text => ({ eu, es, ar })
/** {,} in LaTeX becomes the point in Arabic */
const localLatex = (language: string, latex: string) => (language === 'ar' ? latex.replace(/\{,\}/g, '.') : latex)
const points = (list: Point[]) => list.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ')
const midpoint = ([ax, ay]: Point, [bx, by]: Point): Point => [(ax + bx) / 2, (ay + by) / 2]
/** The root of a whole number in LaTeX: whole, or √n ≈ with two decimals */
const rootLatex = (square: number) => {
    const exact = exactRoot(square)
    if (exact !== null) return `\\sqrt{${square}}=${exact}`
    return `\\sqrt{${square}}\\approx ${(Math.round(Math.sqrt(square) * 100) / 100).toString().replace('.', '{,}')}`
}
/** A root written short for the board: 13 or √34 */
const rootShort = (square: number) => {
    const exact = exactRoot(square)
    return exact !== null ? String(exact) : `√${square}`
}

function Board({ height, label, children }: { height: number; label: string; children: ReactNode }) {
    return <svg viewBox={`0 0 640 ${height}`} direction="ltr" role="img" aria-label={label} style={{ width: '100%', height: 'auto', fontFamily: '"Atkinson Hyperlegible", "Noto Sans Arabic", system-ui, sans-serif' }}>{children}</svg>
}

function Readout({ language, latex, note }: { language: string; latex: string; note: string }) {
    return (
        <>
            <span className="fraction-v2-lab-readout-main"><MathText text={localLatex(language, `$${latex}$`)} /></span>
            <span className="fraction-v2-lab-readout-note">{note}</span>
        </>
    )
}

function RightMark({ v, a, b, size = 12, color = INK }: { v: Point; a: Point; b: Point; size?: number; color?: string }) {
    const unit = (p: Point): Point => {
        const length = Math.hypot(p[0] - v[0], p[1] - v[1]) || 1
        return [(p[0] - v[0]) / length, (p[1] - v[1]) / length]
    }
    const [ux, uy] = unit(a)
    const [wx, wy] = unit(b)
    const p1: Point = [v[0] + size * ux, v[1] + size * uy]
    const p3: Point = [v[0] + size * wx, v[1] + size * wy]
    const p2: Point = [p1[0] + size * wx, p1[1] + size * wy]
    return <polyline points={points([p1, p2, p3])} fill="none" stroke={color} strokeWidth={1.8} />
}

/** A label beside segment ab; positive `offset` goes to the left of a → b on screen */
function SideLabel({ a, b, text, color = INK, offset = 16, size = 17 }: { a: Point; b: Point; text: string; color?: string; offset?: number; size?: number }) {
    const [mx, my] = midpoint(a, b)
    const length = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1
    const nx = ((b[1] - a[1]) / length) * Math.sign(offset)
    const ny = (-(b[0] - a[0]) / length) * Math.sign(offset)
    const distance = Math.abs(offset)
    // Long labels grow away from the side instead of across it
    const anchor = nx > 0.6 ? 'start' : nx < -0.6 ? 'end' : 'middle'
    const shift = anchor === 'middle' ? distance : distance * 0.6
    return <text x={mx + nx * shift} y={my + ny * shift + size * 0.35} textAnchor={anchor} fontSize={size} fontWeight={700} fill={color}>{text}</text>
}

/** A square on segment ab, on the side away from `away`, with an n × n grid */
function GridSquare({ a, b, away, n, fill, label }: { a: Point; b: Point; away: Point; n: number; fill: string; label: string }) {
    let dx = -(b[1] - a[1])
    let dy = b[0] - a[0]
    const [mx, my] = midpoint(a, b)
    if ((away[0] - mx) * dx + (away[1] - my) * dy > 0) {
        dx = -dx
        dy = -dy
    }
    const c: Point = [b[0] + dx, b[1] + dy]
    const d: Point = [a[0] + dx, a[1] + dy]
    const at = (p: Point, q: Point, t: number): Point => [p[0] + (q[0] - p[0]) * t, p[1] + (q[1] - p[1]) * t]
    const lines = Number.isInteger(n) && n <= 20 ? Array.from({ length: n - 1 }, (_, index) => (index + 1) / n) : []
    const centre: Point = [(a[0] + c[0]) / 2, (a[1] + c[1]) / 2]
    return (
        <g>
            <polygon points={points([a, b, c, d])} fill={fill} stroke={INK} strokeWidth={2} strokeLinejoin="round" />
            {lines.map((t) => {
                const p1 = at(a, b, t)
                const p2 = at(d, c, t)
                const q1 = at(a, d, t)
                const q2 = at(b, c, t)
                return (
                    <g key={t}>
                        <line x1={p1[0]} y1={p1[1]} x2={p2[0]} y2={p2[1]} stroke={MUTED} strokeWidth={0.7} strokeOpacity={0.55} />
                        <line x1={q1[0]} y1={q1[1]} x2={q2[0]} y2={q2[1]} stroke={MUTED} strokeWidth={0.7} strokeOpacity={0.55} />
                    </g>
                )
            })}
            <rect x={centre[0] - 24} y={centre[1] - 14} width={48} height={26} rx={13} fill={CARD} stroke={INK} strokeWidth={1.4} />
            <text x={centre[0]} y={centre[1] + 5} textAnchor="middle" fontSize={16} fontWeight={800} fill={INK}>{label}</text>
        </g>
    )
}

/* ---------- 1. Squares on the sides ---------- */

export function SquaresTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<SquaresState>(initialSquaresState)
    const { b, c } = state
    const square = hypotenuseSquare(state)
    // Bounding box in units: x from −c to b + c, y from −b to b + c (y up)
    const u = Math.min(600 / (b + 2 * c), 330 / (2 * b + c))
    const left = 320 - ((b + 2 * c) * u) / 2 + c * u
    const top = 175 - ((2 * b + c) * u) / 2 + (b + c) * u
    const at = (x: number, y: number): Point => [left + x * u, top - y * u]
    const C = at(0, 0)
    const A = at(b, 0)
    const B = at(0, c)
    const exact = exactRoot(square)
    const controls = (
        <>
            <Stepper label={l(say('b katetoa', 'Cateto b', 'الضلع القائم b'))} value={b} min={1} max={LEG_MAX} onChange={(value) => setState((s) => setSquares(s, { b: value }))} language={props.language} />
            <Stepper label={l(say('c katetoa', 'Cateto c', 'الضلع القائم c'))} value={c} min={1} max={LEG_MAX} onChange={(value) => setState((s) => setSquares(s, { c: value }))} language={props.language} />
        </>
    )
    const note = exact !== null
        ? l(say(`Hipotenusa zehatza: ${b}, ${c}, ${exact} hirukote pitagorikoa da.`, `Hipotenusa exacta: ${b}, ${c}, ${exact} es una terna pitagórica.`, `وتر دقيق: ${b}، ${c}، ${exact} ثلاثية فيثاغورية.`))
        : l(say('Karratu handiaren azalera ez da karratu perfektua: hipotenusa ez da osoa.', 'El área del cuadrado grande no es un cuadrado perfecto: la hipotenusa no es entera.', 'مساحة المربع الكبير ليست مربعًا كاملًا: الوتر ليس عددًا صحيحًا.'))
    return (
        <ToolFrame {...props} controls={controls} readout={<Readout language={props.language} latex={`${b * b}+${c * c}=${square}\\qquad a=${rootLatex(square)}`} note={note} />} challenges={squaresChallenges} state={state}>
            <Board height={350} label={l(say('Katetoen eta hipotenusaren gaineko karratuak', 'Cuadrados sobre los catetos y la hipotenusa', 'المربعات على الضلعين القائمين والوتر'))}>
                <GridSquare a={C} b={A} away={B} n={b} fill={STAGE_TINT} label={String(b * b)} />
                <GridSquare a={B} b={C} away={A} n={c} fill={SOFT} label={String(c * c)} />
                <GridSquare a={A} b={B} away={C} n={exact ?? 0} fill={ROSE} label={String(square)} />
                <polygon points={points([A, B, C])} fill={CARD} stroke={INK} strokeWidth={2.6} strokeLinejoin="round" />
                <RightMark v={C} a={A} b={B} size={Math.min(12, u * 0.4)} />
            </Board>
        </ToolFrame>
    )
}

/* ---------- 2. Three sides: what triangle? ---------- */

const kindName: Record<TriangleKind, Text> = {
    impossible: say('Ez da ixten', 'No se cierra', 'لا ينغلق'),
    acute: say('Angelu-zorrotza', 'Acutángulo', 'حاد الزوايا'),
    right: say('Angeluzuzena', 'Rectángulo', 'قائم الزاوية'),
    obtuse: say('Angelu-kamutsa', 'Obtusángulo', 'منفرج الزاوية')
}
const kindColor: Record<TriangleKind, string> = { impossible: MUTED, acute: STAGE, right: GREEN, obtuse: SECOND }

export function ClassifyTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<ClassifyState>(initialClassifyState)
    const kind = triangleKind(state)
    const [big, middle, small] = sortedSides(state)
    const color = kindColor[kind]
    // Third vertex: distance `middle` from the left end and `small` from the right end
    const x = (big * big + middle * middle - small * small) / (2 * big)
    const y = Math.sqrt(Math.max(0, middle * middle - x * x))
    const scale = Math.min(520 / big, 210 / (kind === 'impossible' ? middle : Math.max(y, 1)), 22)
    const left: Point = [320 - (big * scale) / 2, 250]
    const right: Point = [left[0] + big * scale, 250]
    const apex: Point = [left[0] + x * scale, 250 - y * scale]
    const sum = middle * middle + small * small
    const sign = big * big === sum ? '=' : big * big < sum ? '<' : '>'
    const controls = (
        <>
            {(['a', 'b', 'c'] as const).map((key) => (
                <Stepper key={key} label={l(say(`${key} aldea`, `Lado ${key}`, `الضلع ${key}`))} value={state[key]} min={1} max={SIDE_MAX} onChange={(value) => setState((s) => setClassify(s, { [key]: value }))} language={props.language} />
            ))}
        </>
    )
    const latex = kind === 'impossible'
        ? `${big}\\geq ${middle}+${small}`
        : `${big}^{2}=${big * big}\\quad ${sign}\\quad ${middle}^{2}+${small}^{2}=${sum}`
    const note = kind === 'impossible'
        ? l(say('Alde handiena ez da beste bien batura baino txikiagoa: aldeak ez dira elkartzen.', 'El lado mayor no es menor que la suma de los otros dos: los lados no se juntan.', 'الضلع الأكبر ليس أصغر من مجموع الآخرين: لا يلتقي الضلعان.'))
        : l(kindName[kind])
    return (
        <ToolFrame {...props} controls={controls} readout={<Readout language={props.language} latex={latex} note={note} />} challenges={classifyChallenges} state={state}>
            <Board height={300} label={l(kindName[kind])}>
                <line x1={left[0]} y1={250} x2={right[0]} y2={250} stroke={color} strokeWidth={5} strokeLinecap="round" />
                {kind === 'impossible' ? (
                    <g>
                        <line x1={left[0]} y1={250} x2={left[0] + middle * scale * 0.6} y2={250 - middle * scale * 0.8} stroke={INK} strokeWidth={2.4} />
                        <line x1={right[0]} y1={250} x2={right[0] - small * scale * 0.6} y2={250 - small * scale * 0.8} stroke={INK} strokeWidth={2.4} />
                        <path d={`M${left[0] + middle * scale} 250 A${middle * scale} ${middle * scale} 0 0 0 ${left[0]} ${250 - middle * scale}`} fill="none" stroke={MUTED} strokeWidth={1.2} strokeDasharray="5 5" />
                        <path d={`M${right[0] - small * scale} 250 A${small * scale} ${small * scale} 0 0 1 ${right[0]} ${250 - small * scale}`} fill="none" stroke={MUTED} strokeWidth={1.2} strokeDasharray="5 5" />
                    </g>
                ) : (
                    <g>
                        <polygon points={points([left, right, apex])} fill={kind === 'right' ? MINT : kind === 'acute' ? STAGE_TINT : ROSE} stroke={INK} strokeWidth={2.4} strokeLinejoin="round" />
                        <line x1={left[0]} y1={250} x2={right[0]} y2={250} stroke={color} strokeWidth={5} strokeLinecap="round" />
                        {kind === 'right' && <RightMark v={apex} a={left} b={right} />}
                        <SideLabel a={apex} b={left} text={String(middle)} offset={16} />
                        <SideLabel a={right} b={apex} text={String(small)} offset={16} />
                    </g>
                )}
                <text x={320} y={282} textAnchor="middle" fontSize={18} fontWeight={800} fill={color}>{big}</text>
            </Board>
        </ToolFrame>
    )
}

/* ---------- 3. Hypotenuse or leg ---------- */

export function SolveTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<SolveState>(initialSolveState)
    const square = unknownSquare(state)
    const legs: [number, number] = state.unknown === 'hypotenuse' ? [state.first, state.second] : [Math.sqrt(square), state.first]
    const scale = Math.min(440 / legs[0], 230 / legs[1])
    const C: Point = [100, 270]
    const A: Point = [100 + legs[0] * scale, 270]
    const B: Point = [100, 270 - legs[1] * scale]
    const unknownText = rootShort(square)
    const controls = (
        <>
            <Segmented label={l(say('Zer bilatu', 'Qué buscar', 'ماذا نبحث'))} value={state.unknown} options={[{ value: 'hypotenuse', label: l(say('Hipotenusa', 'Hipotenusa', 'الوتر')) }, { value: 'leg', label: l(say('Katetoa', 'Cateto', 'الضلع القائم')) }]} onChange={(unknown) => setState((s) => setSolve(s, { unknown: unknown as Unknown }))} />
            <Stepper label={l(say('Kateto ezaguna', 'Cateto conocido', 'الضلع القائم المعلوم'))} value={state.first} min={1} max={state.unknown === 'leg' ? SOLVE_MAX - 1 : SOLVE_MAX} onChange={(first) => setState((s) => setSolve(s, { first }))} language={props.language} />
            <Stepper label={state.unknown === 'hypotenuse' ? l(say('Beste katetoa', 'El otro cateto', 'الضلع القائم الآخر')) : l(say('Hipotenusa', 'Hipotenusa', 'الوتر'))} value={state.second} min={state.unknown === 'leg' ? 2 : 1} max={SOLVE_MAX} onChange={(second) => setState((s) => setSolve(s, { second }))} language={props.language} />
        </>
    )
    const latex = state.unknown === 'hypotenuse'
        ? `a=\\sqrt{${state.first}^{2}+${state.second}^{2}}=${rootLatex(square)}`
        : `b=\\sqrt{${state.second}^{2}-${state.first}^{2}}=${rootLatex(square)}`
    const note = state.unknown === 'hypotenuse'
        ? l(say('Hipotenusa: karratuak batu eta erroa.', 'Hipotenusa: suma los cuadrados y saca la raíz.', 'الوتر: اجمع المربعين وخذ الجذر.'))
        : l(say('Katetoa: hipotenusaren karratuari beste katetoarena kendu.', 'Cateto: al cuadrado de la hipotenusa réstale el del otro cateto.', 'الضلع القائم: اطرح مربع الضلع الآخر من مربع الوتر.'))
    return (
        <ToolFrame {...props} controls={controls} readout={<Readout language={props.language} latex={latex} note={note} />} challenges={solveChallenges} state={state}>
            <Board height={310} label={l(say('Triangelu angeluzuzena', 'Triángulo rectángulo', 'مثلث قائم'))}>
                <polygon points={points([A, B, C])} fill={state.unknown === 'hypotenuse' ? STAGE_TINT : MINT} stroke={INK} strokeWidth={2.6} strokeLinejoin="round" />
                <line x1={state.unknown === 'hypotenuse' ? A[0] : C[0]} y1={state.unknown === 'hypotenuse' ? A[1] : C[1]} x2={state.unknown === 'hypotenuse' ? B[0] : A[0]} y2={state.unknown === 'hypotenuse' ? B[1] : A[1]} stroke={SECOND} strokeWidth={5} strokeLinecap="round" />
                <RightMark v={C} a={A} b={B} />
                <SideLabel a={C} b={A} text={state.unknown === 'hypotenuse' ? String(state.first) : `? = ${unknownText}`} offset={-20} color={state.unknown === 'hypotenuse' ? INK : SECOND} />
                <SideLabel a={B} b={C} text={state.unknown === 'hypotenuse' ? String(state.second) : String(state.first)} offset={-18} />
                <SideLabel a={A} b={B} text={state.unknown === 'hypotenuse' ? `? = ${unknownText}` : String(state.second)} offset={-20} color={state.unknown === 'hypotenuse' ? SECOND : INK} />
            </Board>
        </ToolFrame>
    )
}

/* ---------- 4. The hidden right triangle ---------- */

const shapeNames: Record<FigureShape, Text> = {
    isosceles: say('Isoszelea', 'Isósceles', 'متساوي الساقين'),
    rectangle: say('Laukizuzena', 'Rectángulo', 'مستطيل'),
    rhombus: say('Erronboa', 'Rombo', 'معيّن'),
    trapezoid: say('Trapezioa', 'Trapecio', 'شبه منحرف'),
    hexagon: say('Hexagonoa', 'Hexágono', 'مسدس')
}

const paramNames: Record<FigureShape, Text[]> = {
    isosceles: [say('Oinarria', 'Base', 'القاعدة'), say('Alde berdina', 'Lado igual', 'الساق')],
    rectangle: [say('Oinarria', 'Base', 'القاعدة'), say('Altuera', 'Altura', 'الارتفاع')],
    rhombus: [say('Diagonal handia', 'Diagonal mayor', 'القطر الأكبر'), say('Diagonal txikia', 'Diagonal menor', 'القطر الأصغر')],
    trapezoid: [say('Oinarri handia', 'Base mayor', 'القاعدة الكبرى'), say('Oinarri txikia', 'Base menor', 'القاعدة الصغرى'), say('Alde zeiharra', 'Lado oblicuo', 'الضلع المائل')],
    hexagon: [say('Aldea', 'Lado', 'الضلع')]
}

/** A label beside segment ab, on the side away from the point `away` */
function OutsideLabel({ a, b, away, text, color = INK, offset = 16, size = 17 }: { a: Point; b: Point; away: Point; text: string; color?: string; offset?: number; size?: number }) {
    const [mx, my] = midpoint(a, b)
    const length = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1
    let nx = (b[1] - a[1]) / length
    let ny = -(b[0] - a[0]) / length
    if ((away[0] - mx) * nx + (away[1] - my) * ny > 0) {
        nx = -nx
        ny = -ny
    }
    const anchor = nx > 0.6 ? 'start' : nx < -0.6 ? 'end' : 'middle'
    const shift = anchor === 'middle' ? offset : offset * 0.6
    return <text x={mx + nx * shift} y={my + ny * shift + size * 0.35} textAnchor={anchor} fontSize={size} fontWeight={700} fill={color}>{text}</text>
}

/**
 * The figure drawn in units (y up) and its hidden right triangle: the right
 * angle at triangle[0], legs 0–1 and 0–2, hypotenuse 1–2. `unknown` says
 * which of the three sides is being calculated.
 */
function figureGeometry(state: FigureState, unknown: number): { outline: Point[]; triangle: [Point, Point, Point]; unknown: 0 | 1 | 2 } {
    const { p, q } = state
    switch (state.shape) {
        case 'isosceles':
            return { outline: [[0, 0], [p, 0], [p / 2, unknown]], triangle: [[p / 2, 0], [p, 0], [p / 2, unknown]], unknown: 1 }
        case 'rectangle':
            return { outline: [[0, 0], [p, 0], [p, q], [0, q]], triangle: [[p, 0], [0, 0], [p, q]], unknown: 2 }
        case 'rhombus':
            return { outline: [[0, q / 2], [p / 2, 0], [p, q / 2], [p / 2, q]], triangle: [[p / 2, q / 2], [p, q / 2], [p / 2, q]], unknown: 2 }
        case 'trapezoid': {
            const shift = (p - q) / 2
            return { outline: [[0, 0], [p, 0], [p - shift, unknown], [shift, unknown]], triangle: [[p - shift, 0], [p, 0], [p - shift, unknown]], unknown: 1 }
        }
        case 'hexagon':
            return {
                outline: Array.from({ length: 6 }, (_, index) => [p + p * Math.cos((index * Math.PI) / 3), unknown + p * Math.sin((index * Math.PI) / 3)] as Point),
                triangle: [[p, 0], [p + p / 2, 0], [p, unknown]],
                unknown: 1
            }
    }
}

export function FigureTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<FigureState>(initialFigureState)
    const hidden = hiddenTriangle(state)
    const builds = figureBuilds(state)
    // A figure that cannot be built is drawn flat
    const unknown = builds ? Math.sqrt(hidden.unknownSquare) : 0.001
    const geometry = figureGeometry(state, unknown)
    const xs = geometry.outline.map(([x]) => x)
    const ys = geometry.outline.map(([, y]) => y)
    const width = Math.max(...xs) - Math.min(...xs)
    const height = Math.max(...ys) - Math.min(...ys)
    const scale = Math.min(440 / Math.max(width, 1), 220 / Math.max(height, 1))
    const originX = 320 - (width * scale) / 2 - Math.min(...xs) * scale
    const originY = 265 + Math.min(...ys) * scale
    const at = ([x, y]: Point): Point => [originX + x * scale, originY - y * scale]
    const outline = geometry.outline.map(at)
    const triangle = geometry.triangle.map(at) as [Point, Point, Point]
    const unknownText = builds ? rootShort(hidden.unknownSquare) : '?'
    // Sides 0–1, 0–2 and 1–2 with what is known about them
    const known = [hidden.legs[0], hidden.legs[1], hidden.hypotenuse]
    const sides: Array<[number, number, number]> = [[0, 1, 2], [0, 2, 1], [1, 2, 0]]
    const knownLatex = hidden.hypotenuse === null
        ? `${hidden.legs[0]}^{2}+${hidden.legs[1]}^{2}`
        : `${hidden.hypotenuse}^{2}-${hidden.legs[0]}^{2}`
    const unknownName = { isosceles: 'h', rectangle: 'd', rhombus: 'l', trapezoid: 'h', hexagon: 'ap' }[state.shape]
    const latex = builds ? `${unknownName}=\\sqrt{${knownLatex}}=${rootLatex(hidden.unknownSquare)}` : `${knownLatex}\\leq 0`
    const note = !builds
        ? l(say('Irudi hau ezin da eraiki: alde zeiharra laburregia da.', 'Esta figura no se puede construir: el lado inclinado es demasiado corto.', 'لا يمكن إنشاء هذا الشكل: الضلع المائل أقصر من اللازم.'))
        : hidden.hypotenuse === null
            ? l(say('Bi katetoak ezagunak dira: batu karratuak.', 'Se conocen los dos catetos: suma los cuadrados.', 'الضلعان القائمان معلومان: اجمع المربعين.'))
            : l(say('Hipotenusa eta kateto bat ezagunak dira: kendu karratuak.', 'Se conocen la hipotenusa y un cateto: resta los cuadrados.', 'الوتر وضلع قائم معلومان: اطرح المربعين.'))
    const params = figureParams[state.shape]
    const controls = (
        <>
            <Segmented label={l(say('Irudia', 'Figura', 'الشكل'))} value={state.shape} options={FIGURE_SHAPES.map((shape) => ({ value: shape, label: l(shapeNames[shape]) }))} onChange={(shape) => setState((s) => setFigure(s, { shape: shape as FigureShape }))} />
            {params.map((param, index) => (
                <Stepper key={`${state.shape}-${param.key}`} label={l(paramNames[state.shape][index])} value={state[param.key]} min={param.min} max={param.max} step={param.step} onChange={(value) => setState((s) => setFigure(s, { [param.key]: value }))} language={props.language} />
            ))}
        </>
    )
    return (
        <ToolFrame {...props} controls={controls} readout={<Readout language={props.language} latex={latex} note={note} />} challenges={figureChallenges} state={state}>
            <Board height={300} label={l(shapeNames[state.shape])}>
                <polygon points={points(outline)} fill={STAGE_TINT} stroke="none" />
                {builds && <polygon points={points(triangle)} fill={SOFT} stroke={STAGE} strokeWidth={1.6} />}
                <polygon points={points(outline)} fill="none" stroke={INK} strokeWidth={2.6} strokeLinejoin="round" />
                {builds && (
                    <g>
                        {sides.map(([from, to, away], index) => {
                            const isUnknown = index === geometry.unknown
                            return (
                                <g key={index}>
                                    {isUnknown && <line x1={triangle[from][0]} y1={triangle[from][1]} x2={triangle[to][0]} y2={triangle[to][1]} stroke={SECOND} strokeWidth={4.5} strokeLinecap="round" />}
                                    <OutsideLabel a={triangle[from]} b={triangle[to]} away={triangle[away]} text={isUnknown ? unknownText : String(known[index])} color={isUnknown ? SECOND : STAGE} offset={isUnknown ? 20 : 15} size={isUnknown ? 18 : 15} />
                                </g>
                            )
                        })}
                        <RightMark v={triangle[0]} a={triangle[1]} b={triangle[2]} size={10} />
                    </g>
                )}
            </Board>
        </ToolFrame>
    )
}

/* ---------- 5. Chords and tangents ---------- */

export function CircleTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<CircleState>(initialCircleState)
    const square = circleSquare(state)
    const isChord = state.mode === 'chord'
    const reach = isChord ? state.r : Math.sqrt(square)
    const scale = isChord ? 130 / state.r : Math.min(130 / state.r, 440 / (reach + state.r))
    const O: Point = isChord ? [320, 150] : [110 + state.r * scale, 165]
    const radius = state.r * scale
    const half = Math.sqrt(Math.max(square, 0)) * scale
    const lineY = O[1] + state.d * scale
    const P: Point = [O[0] + reach * scale, O[1]]
    // Tangent point: cos = r / OP
    const cos = state.r / reach
    const sin = Math.sqrt(Math.max(0, 1 - cos * cos))
    const T: Point = [O[0] + radius * cos, O[1] - radius * sin]
    const chord = chordLength(state)
    const controls = (
        <>
            <Segmented label={l(say('Zer', 'Qué', 'ماذا'))} value={state.mode} options={[{ value: 'chord', label: l(say('Korda', 'Cuerda', 'وتر')) }, { value: 'tangent', label: l(say('Ukitzailea', 'Tangente', 'مماس')) }]} onChange={(mode) => setState((s) => setCircle(s, { mode: mode as CircleMode }))} />
            <Stepper label={l(say('Erradioa', 'Radio', 'نصف القطر'))} value={state.r} min={1} max={CIRCLE_RADIUS_MAX} onChange={(r) => setState((s) => setCircle(s, { r }))} language={props.language} />
            <Stepper label={isChord ? l(say('Zentrorako distantzia', 'Distancia al centro', 'البعد عن المركز')) : l(say('PT ukitzailea', 'Tangente PT', 'المماس PT'))} value={state.d} min={isChord ? 0 : 1} max={isChord ? state.r - 1 : TANGENT_MAX} onChange={(d) => setState((s) => setCircle(s, { d }))} language={props.language} />
        </>
    )
    const latex = isChord
        ? `\\frac{k}{2}=\\sqrt{${state.r}^{2}-${state.d}^{2}}=${rootLatex(square)}${chord !== null ? `\\qquad k=${chord}` : ''}`
        : `OP=\\sqrt{${state.r}^{2}+${state.d}^{2}}=${rootLatex(square)}`
    const note = isChord
        ? l(say('Erradioa hipotenusa da; distantzia eta korda-erdia, katetoak.', 'El radio es la hipotenusa; la distancia y media cuerda, los catetos.', 'نصف القطر هو الوتر؛ والبعد ونصف الوتر هما الضلعان القائمان.'))
        : l(say('Angelu zuzena T puntuan dago; OP hipotenusa da.', 'El ángulo recto está en T; OP es la hipotenusa.', 'الزاوية القائمة عند T؛ وOP هو الوتر.'))
    return (
        <ToolFrame {...props} controls={controls} readout={<Readout language={props.language} latex={latex} note={note} />} challenges={circleChallenges} state={state}>
            <Board height={310} label={isChord ? l(say('Korda', 'Cuerda', 'وتر')) : l(say('Ukitzailea', 'Tangente', 'مماس'))}>
                <circle cx={O[0]} cy={O[1]} r={radius} fill={STAGE_TINT} stroke={INK} strokeWidth={2.4} />
                {isChord ? (
                    <g>
                        <line x1={O[0] - 200} y1={lineY} x2={O[0] + 200} y2={lineY} stroke={MUTED} strokeWidth={1.4} />
                        <polygon points={points([O, [O[0], lineY], [O[0] + half, lineY]])} fill={SOFT} />
                        <line x1={O[0] - half} y1={lineY} x2={O[0] + half} y2={lineY} stroke={STAGE} strokeWidth={5} strokeLinecap="round" />
                        <line x1={O[0]} y1={O[1]} x2={O[0] + half} y2={lineY} stroke={SECOND} strokeWidth={3} />
                        {state.d > 0 && <line x1={O[0]} y1={O[1]} x2={O[0]} y2={lineY} stroke={INK} strokeWidth={2} strokeDasharray="6 4" />}
                        {state.d > 0 && <RightMark v={[O[0], lineY]} a={[O[0] + half, lineY]} b={O} size={10} />}
                        <SideLabel a={O} b={[O[0] + half, lineY]} text={String(state.r)} offset={14} color={SECOND} />
                        {state.d > 0 && <text x={O[0] - 10} y={(O[1] + lineY) / 2 + 6} textAnchor="end" fontSize={16} fontWeight={700} fill={INK}>{state.d}</text>}
                        <text x={O[0] + half / 2} y={lineY + 24} textAnchor="middle" fontSize={16} fontWeight={700} fill={STAGE}>{rootShort(square)}</text>
                    </g>
                ) : (
                    <g>
                        <polygon points={points([O, T, P])} fill={SOFT} fillOpacity={0.85} />
                        <line x1={O[0]} y1={O[1]} x2={T[0]} y2={T[1]} stroke={STAGE} strokeWidth={3} />
                        <line x1={T[0]} y1={T[1]} x2={P[0]} y2={P[1]} stroke={SECOND} strokeWidth={3.5} />
                        <line x1={O[0]} y1={O[1]} x2={P[0]} y2={P[1]} stroke={INK} strokeWidth={2.2} />
                        <RightMark v={T} a={O} b={P} size={10} />
                        <circle cx={P[0]} cy={P[1]} r={5} fill={SECOND} />
                        <text x={P[0] + 10} y={P[1] + 6} fontSize={16} fontWeight={700} fill={SECOND}>P</text>
                        <text x={T[0] - 4} y={T[1] - 10} textAnchor="middle" fontSize={16} fontWeight={700} fill={STAGE}>T</text>
                        <SideLabel a={O} b={T} text={String(state.r)} offset={14} color={STAGE} />
                        <SideLabel a={T} b={P} text={String(state.d)} offset={14} color={SECOND} />
                        <SideLabel a={O} b={P} text={rootShort(square)} offset={-18} />
                    </g>
                )}
                <circle cx={O[0]} cy={O[1]} r={4} fill={INK} />
                <text x={O[0] - 10} y={O[1] - 8} textAnchor="end" fontSize={15} fontWeight={700} fill={INK}>O</text>
            </Board>
        </ToolFrame>
    )
}

/* ---------- 6. The diagonal of a box ---------- */

export function BoxTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<BoxState>(initialBoxState)
    const { a, b, c } = state
    const s = Math.min(380 / (a + b * 0.7), 230 / (c + b * 0.6))
    const left = 320 - ((a + b * 0.7) * s) / 2
    const project = (x: number, y: number, z: number): Point => [left + x * s + z * s * 0.7, 280 - y * s - z * s * 0.6]
    const A = project(0, 0, 0)
    const B = project(a, 0, 0)
    const C = project(a, 0, b)
    const D = project(0, 0, b)
    const E = project(0, c, 0)
    const F = project(a, c, 0)
    const G = project(a, c, b)
    const H = project(0, c, b)
    const base = baseSquare(state)
    const space = spaceSquare(state)
    const controls = (
        <>
            <Stepper label={l(say('Luzera', 'Largo', 'الطول'))} value={a} min={1} max={BOX_MAX} onChange={(value) => setState((st) => setBox(st, { a: value }))} language={props.language} />
            <Stepper label={l(say('Zabalera', 'Ancho', 'العرض'))} value={b} min={1} max={BOX_MAX} onChange={(value) => setState((st) => setBox(st, { b: value }))} language={props.language} />
            <Stepper label={l(say('Altuera', 'Alto', 'الارتفاع'))} value={c} min={1} max={BOX_MAX} onChange={(value) => setState((st) => setBox(st, { c: value }))} language={props.language} />
        </>
    )
    const latex = `d^{2}=${a}^{2}+${b}^{2}=${base}\\qquad D=\\sqrt{${base}+${c}^{2}}=${rootLatex(space)}`
    const note = l(say('Oinarriaren diagonala eta altuera dira diagonal handiaren katetoak.', 'La diagonal de la base y la altura son los catetos de la diagonal grande.', 'قطر القاعدة والارتفاع هما الضلعان القائمان للقطر الكبير.'))
    return (
        <ToolFrame {...props} controls={controls} readout={<Readout language={props.language} latex={latex} note={note} />} challenges={boxChallenges} state={state}>
            <Board height={310} label={l(say('Ortoedroa eta haren diagonala', 'El ortoedro y su diagonal', 'متوازي المستطيلات وقطره'))}>
                <polygon points={points([A, B, C, D])} fill={STAGE_TINT} />
                <line x1={D[0]} y1={D[1]} x2={A[0]} y2={A[1]} stroke={MUTED} strokeWidth={1.4} strokeDasharray="5 4" />
                <line x1={D[0]} y1={D[1]} x2={C[0]} y2={C[1]} stroke={MUTED} strokeWidth={1.4} strokeDasharray="5 4" />
                <line x1={D[0]} y1={D[1]} x2={H[0]} y2={H[1]} stroke={MUTED} strokeWidth={1.4} strokeDasharray="5 4" />
                <polygon points={points([A, C, G])} fill={SOFT} fillOpacity={0.7} />
                <polygon points={points([A, B, F, E])} fill="none" stroke={INK} strokeWidth={2.2} strokeLinejoin="round" />
                <polygon points={points([B, C, G, F])} fill="none" stroke={INK} strokeWidth={2.2} strokeLinejoin="round" />
                <polygon points={points([E, F, G, H])} fill="none" stroke={INK} strokeWidth={2.2} strokeLinejoin="round" />
                <line x1={A[0]} y1={A[1]} x2={C[0]} y2={C[1]} stroke={STAGE} strokeWidth={3} />
                <line x1={A[0]} y1={A[1]} x2={G[0]} y2={G[1]} stroke={SECOND} strokeWidth={3.5} />
                <SideLabel a={A} b={B} text={String(a)} offset={-18} />
                <SideLabel a={B} b={C} text={String(b)} offset={-16} />
                <SideLabel a={C} b={G} text={String(c)} offset={-16} />
                <text x={(A[0] + G[0]) / 2 - 10} y={(A[1] + G[1]) / 2 - 10} textAnchor="end" fontSize={17} fontWeight={800} fill={SECOND}>{rootShort(space)}</text>
            </Board>
        </ToolFrame>
    )
}

/* ---------- 7. Distances on a grid ---------- */

export function GridTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<GridState>(initialGridState)
    const cell = 22
    const x0 = 180
    const y0 = 290
    const at = (x: number, y: number): Point => [x0 + x * cell, y0 - y * cell]
    const A = at(state.x1, state.y1)
    const B = at(state.x2, state.y2)
    const corner = at(state.x2, state.y1)
    const { dx, dy } = gridSteps(state)
    const square = gridSquare(state)
    const controls = (
        <>
            {(['x1', 'y1', 'x2', 'y2'] as const).map((key) => (
                <Stepper key={key} label={`${key.startsWith('x') ? 'x' : 'y'} ${key.endsWith('1') ? 'A' : 'B'}`} value={state[key]} min={0} max={GRID_MAX} onChange={(value) => setState((s) => setGrid(s, { [key]: value }))} language={props.language} />
            ))}
        </>
    )
    const latex = `AB=\\sqrt{${dx}^{2}+${dy}^{2}}=${rootLatex(square)}`
    const note = l(say(`${dx} lauki horizontalean eta ${dy} bertikalean.`, `${dx} cuadros en horizontal y ${dy} en vertical.`, `${dx} مربعات أفقيًا و${dy} عموديًا.`))
    return (
        <ToolFrame {...props} controls={controls} readout={<Readout language={props.language} latex={latex} note={note} />} challenges={gridChallenges} state={state}>
            <Board height={310} label={l(say('Bi puntu sarean', 'Dos puntos en la cuadrícula', 'نقطتان على الشبكة'))}>
                {Array.from({ length: GRID_MAX + 1 }, (_, index) => (
                    <g key={index}>
                        <line x1={x0 + index * cell} y1={y0} x2={x0 + index * cell} y2={y0 - GRID_MAX * cell} stroke={MUTED} strokeWidth={0.7} strokeOpacity={0.5} />
                        <line x1={x0} y1={y0 - index * cell} x2={x0 + GRID_MAX * cell} y2={y0 - index * cell} stroke={MUTED} strokeWidth={0.7} strokeOpacity={0.5} />
                    </g>
                ))}
                {dx > 0 && dy > 0 && <polygon points={points([A, corner, B])} fill={SOFT} fillOpacity={0.75} />}
                {dx > 0 && <line x1={A[0]} y1={A[1]} x2={corner[0]} y2={corner[1]} stroke={STAGE} strokeWidth={3} />}
                {dy > 0 && <line x1={corner[0]} y1={corner[1]} x2={B[0]} y2={B[1]} stroke={STAGE} strokeWidth={3} />}
                <line x1={A[0]} y1={A[1]} x2={B[0]} y2={B[1]} stroke={SECOND} strokeWidth={3.5} />
                {dx > 0 && dy > 0 && <RightMark v={corner} a={A} b={B} size={9} />}
                <circle cx={A[0]} cy={A[1]} r={5.5} fill={SECOND} />
                <circle cx={B[0]} cy={B[1]} r={5.5} fill={SECOND} />
                <text x={A[0] - 10} y={A[1] - 8} textAnchor="end" fontSize={16} fontWeight={700} fill={SECOND}>A</text>
                <text x={B[0] - 10} y={B[1] - 8} textAnchor="end" fontSize={16} fontWeight={700} fill={SECOND}>B</text>
                <text x={x0 + GRID_MAX * cell + 24} y={150} fontSize={20} fontWeight={800} fill={SECOND}>{rootShort(square)}</text>
            </Board>
        </ToolFrame>
    )
}
