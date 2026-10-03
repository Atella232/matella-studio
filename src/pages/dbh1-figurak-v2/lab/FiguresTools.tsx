import { useState, type ReactNode } from 'react'
import { MathText } from '../../../components/MathText'
import { Segmented, Stepper, ToolFrame } from '../../../features/unit-v2/lab/LabKit'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import { useLabText } from '../../../features/unit-v2/lab/useLabText'
import { toExactDecimal, toNumber, type FractionValue } from '../../../features/unit-v2/math/fraction'
import {
    ANGLE_STEP,
    angleKind,
    angleSum,
    APEX_H_MAX,
    APEX_X_MAX,
    APEX_X_MIN,
    apexKind,
    arcLength,
    BASE,
    centersChallenges,
    centralAngle,
    centrePoint,
    circlePosition,
    circlesChallenges,
    closure,
    compositeArea,
    compositeChallenges,
    compositePerimeter,
    compositePieces,
    diagonalCount,
    DIAGONAL_MAX,
    DIAGONAL_MIN,
    DISTANCE_MAX,
    HEIGHT_MAX,
    initialCentersState,
    initialCirclesState,
    initialCompositeState,
    initialPolygonState,
    initialQuadState,
    initialSectorState,
    initialTilingState,
    initialTriangleState,
    interiorAngle,
    placement,
    POLYGON_MAX,
    POLYGON_MIN,
    polygonChallenges,
    quadChallenges,
    quadName,
    RADIUS_MAX,
    ringArea,
    SECTOR_RADIUS_MAX,
    sectorArea,
    sectorChallenges,
    setCenters,
    setCircles,
    setComposite,
    setPolygon,
    setQuad,
    setSector,
    setTiling,
    setTriangle,
    SIDE_MAX,
    sideKind,
    symmetryAxes,
    TILE_COPIES_MAX,
    TILE_SIDES,
    tilingChallenges,
    tilingStatus,
    tilingTotal,
    triangleAngles,
    triangleChallenges,
    WIDTH_MAX,
    type CentersState,
    type CentrePoint,
    type CirclePosition,
    type CirclesState,
    type CompositeState,
    type PolygonMode,
    type PolygonState,
    type QuadName,
    type QuadState,
    type SectorState,
    type TileSides,
    type TilingState,
    type TriangleState
} from './labTools'

const INK = 'var(--ink, #1d2733)'
const MUTED = 'var(--muted, #58616e)'
const STAGE = 'var(--stage, #2f6fdb)'
const STAGE_TINT = 'var(--stage-tint, #dde7f7)'
const SECOND = 'var(--second, #c4432a)'
const GREEN = 'var(--success, #267b53)'
const CARD = 'var(--card, #fffcf6)'
const SOFT = '#fbebc0'

type Point = [number, number]
type Text = { eu: string; es: string; ar: string }

const say = (eu: string, es: string, ar: string): Text => ({ eu, es, ar })
/** {,} in LaTeX becomes the point in Arabic */
const localLatex = (language: string, latex: string) => (language === 'ar' ? latex.replace(/\{,\}/g, '.') : latex)
/** A measure in LaTeX: exact with up to two decimals, otherwise rounded to one with ≈ */
const measure = (value: FractionValue) => {
    const exact = toExactDecimal(value, ',')
    if (exact !== null && (exact.split(',')[1] ?? '').length <= 2) return `=${exact.replace(',', '{,}')}`
    return `\\approx ${(Math.round(toNumber(value) * 10) / 10).toString().replace('.', '{,}')}`
}
const rad = (degrees: number) => (degrees * Math.PI) / 180
const points = (list: Point[]) => list.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ')
const regular = (cx: number, cy: number, r: number, n: number): Point[] => Array.from({ length: n }, (_, index) => [cx + r * Math.cos(rad(-90 + (360 * index) / n)), cy + r * Math.sin(rad(-90 + (360 * index) / n))])

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

const polygonNames: Record<number, Text> = {
    3: say('Triangelua', 'Triángulo', 'مثلث'),
    4: say('Laukia', 'Cuadrilátero', 'رباعي'),
    5: say('Pentagonoa', 'Pentágono', 'مخمس'),
    6: say('Hexagonoa', 'Hexágono', 'مسدس'),
    7: say('Heptagonoa', 'Heptágono', 'مسبع'),
    8: say('Oktogonoa', 'Octógono', 'مثمن'),
    9: say('Eneagonoa', 'Eneágono', 'متسع'),
    10: say('Dekagonoa', 'Decágono', 'معشّر'),
    11: say('Hendekagonoa', 'Endecágono', 'مضلع بأحد عشر ضلعًا'),
    12: say('Dodekagonoa', 'Dodecágono', 'مضلع باثني عشر ضلعًا')
}

/* ---------- 1. The polygon inside ---------- */

export function PolygonTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<PolygonState>(initialPolygonState)
    const n = state.sides
    const vertices = regular(320, 165, 135, n)
    const tints = [STAGE_TINT, SOFT, '#d6eddf', '#f6d9d2', '#e8e0f7']
    const controls = (
        <>
            <Stepper label={l(say('Alde kopurua', 'Número de lados', 'عدد الأضلاع'))} value={n} min={POLYGON_MIN} max={POLYGON_MAX} onChange={(sides) => setState((s) => setPolygon(s, { sides }))} language={props.language} />
            <Segmented label={l(say('Ikusi', 'Ver', 'اعرض'))} value={state.mode} options={[{ value: 'diagonals', label: l(say('Diagonalak', 'Diagonales', 'الأقطار')) }, { value: 'triangles', label: l(say('Triangeluak', 'Triángulos', 'المثلثات')) }, { value: 'angles', label: l(say('Angeluak', 'Ángulos', 'الزوايا')) }]} onChange={(mode) => setState((s) => setPolygon(s, { mode: mode as PolygonMode }))} />
        </>
    )
    const latex = state.mode === 'diagonals'
        ? `\\frac{${n}\\cdot ${n - 3}}{2}=${diagonalCount(n)}`
        : state.mode === 'triangles'
            ? `(${n}-2)\\cdot 180^{\\circ}=${angleSum(n)}^{\\circ}`
            : `\\frac{${angleSum(n)}^{\\circ}}{${n}}${measure(interiorAngle(n))}^{\\circ}\\qquad\\frac{360^{\\circ}}{${n}}${measure(centralAngle(n))}^{\\circ}`
    const note = state.mode === 'diagonals'
        ? l(say(`${l(polygonNames[n])}: erpin bakoitzetik ${n - 3} diagonal.`, `${l(polygonNames[n])}: de cada vértice salen ${n - 3} diagonales.`, `${l(polygonNames[n])}: من كل رأس ${n - 3} أقطار.`))
        : state.mode === 'triangles'
            ? l(say(`Erpin batetik ${n - 2} triangelu.`, `Desde un vértice, ${n - 2} triángulos.`, `من رأس واحد ${n - 2} مثلثات.`))
            : l(say('Erregularra: barne-angelua eta angelu zentrala.', 'Regular: ángulo interior y ángulo central.', 'المنتظم: الزاوية الداخلية والزاوية المركزية.'))
    return (
        <ToolFrame {...props} controls={controls} readout={<Readout language={props.language} latex={latex} note={note} />} challenges={polygonChallenges} state={state}>
            <Board height={330} label={l(polygonNames[n])}>
                {state.mode === 'triangles' && Array.from({ length: n - 2 }, (_, index) => <polygon key={index} points={points([vertices[0], vertices[index + 1], vertices[index + 2]])} fill={tints[index % tints.length]} stroke={STAGE} strokeWidth={1.6} />)}
                {state.mode !== 'triangles' && <polygon points={points(vertices)} fill={STAGE_TINT} />}
                {state.mode === 'diagonals' && vertices.flatMap((from, i) => vertices.map((to, j) => (j > i + 1 && !(i === 0 && j === n - 1) ? <line key={`${i}-${j}`} x1={from[0]} y1={from[1]} x2={to[0]} y2={to[1]} stroke={i === 0 ? SECOND : STAGE} strokeWidth={i === 0 ? 3 : 1.4} strokeOpacity={i === 0 ? 1 : 0.7} /> : null)))}
                {state.mode === 'angles' && (
                    <g>
                        <polygon points={points([[320, 165], vertices[0], vertices[1]])} fill={SECOND} fillOpacity={0.18} stroke={SECOND} strokeWidth={2} />
                        <circle cx={320} cy={165} r={4} fill={SECOND} />
                        <path d={`M${vertices[1][0] + (vertices[0][0] - vertices[1][0]) * 0.18} ${vertices[1][1] + (vertices[0][1] - vertices[1][1]) * 0.18} L${vertices[1][0]} ${vertices[1][1]} L${vertices[1][0] + (vertices[2][0] - vertices[1][0]) * 0.18} ${vertices[1][1] + (vertices[2][1] - vertices[1][1]) * 0.18}`} fill="none" stroke={STAGE} strokeWidth={4} strokeLinejoin="round" />
                    </g>
                )}
                <polygon points={points(vertices)} fill="none" stroke={INK} strokeWidth={2.6} strokeLinejoin="round" />
                {state.mode !== 'angles' && <circle cx={vertices[0][0]} cy={vertices[0][1]} r={5.5} fill={SECOND} />}
            </Board>
        </ToolFrame>
    )
}

/* ---------- 2. Tiles around a vertex ---------- */

/** A regular polygon walked from p, first edge at `heading` degrees counter-clockwise */
const walk = ([x, y]: Point, heading: number, n: number, side: number): Point[] => {
    const list: Point[] = [[x, y]]
    for (let index = 1; index < n; index += 1) {
        const [px, py] = list[index - 1]
        const angle = rad(heading + ((index - 1) * 360) / n)
        list.push([px + side * Math.cos(angle), py - side * Math.sin(angle)])
    }
    return list
}

export function TilingTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<TilingState>(initialTilingState)
    const interior = toNumber(interiorAngle(state.sides))
    const status = tilingStatus(state)
    const side = { 3: 125, 4: 105, 5: 88, 6: 72, 8: 56 }[state.sides]
    const color = status === 'closed' ? GREEN : status === 'gap' ? STAGE : SECOND
    const controls = (
        <>
            <Segmented label={l(say('Lauza', 'Baldosa', 'البلاطة'))} value={String(state.sides)} options={TILE_SIDES.map((sides) => ({ value: String(sides), label: l(polygonNames[sides]) }))} onChange={(sides) => setState((s) => setTiling(s, { sides: Number(sides) as TileSides }))} />
            <Stepper label={l(say('Lauza kopurua', 'Número de baldosas', 'عدد البلاطات'))} value={state.copies} min={1} max={TILE_COPIES_MAX} onChange={(copies) => setState((s) => setTiling(s, { copies }))} language={props.language} />
        </>
    )
    const note = status === 'closed'
        ? l(say('Zehazki 360°: erpina hutsunerik gabe ixten da.', 'Justo 360°: el vértice se cierra sin huecos.', '360° تمامًا: يُغلق الرأس دون فراغات.'))
        : status === 'gap'
            ? l(say('360° baino gutxiago: hutsune bat geratzen da.', 'Menos de 360°: queda un hueco.', 'أقل من 360°: تبقى فجوة.'))
            : l(say('360° baino gehiago: lauzak gainjartzen dira.', 'Más de 360°: las baldosas se solapan.', 'أكثر من 360°: تتراكب البلاطات.'))
    return (
        <ToolFrame {...props} controls={controls} readout={<Readout language={props.language} latex={`${state.copies}\\cdot ${interior}^{\\circ}=${toNumber(tilingTotal(state))}^{\\circ}`} note={note} />} challenges={tilingChallenges} state={state}>
            <Board height={330} label={l(say('Lauzak erpin baten inguruan', 'Baldosas alrededor de un vértice', 'بلاطات حول رأس'))}>
                {Array.from({ length: state.copies }, (_, index) => (
                    <polygon key={index} points={points(walk([320, 165], index * interior, state.sides, side))} fill={index % 2 ? SOFT : STAGE_TINT} fillOpacity={0.75} stroke={INK} strokeWidth={2} strokeLinejoin="round" />
                ))}
                <circle cx={320} cy={165} r={7} fill={color} />
                <text x={320} y={318} textAnchor="middle" fontSize={20} fontWeight={700} fill={color}>{toNumber(tilingTotal(state))}° / 360°</text>
            </Board>
        </ToolFrame>
    )
}

/* ---------- 3. Building a triangle ---------- */

export function TriangleTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<TriangleState>(initialTriangleState)
    const { a, b, c } = state
    // As large as the board allows: the base fits the width and the tallest side the height
    const unit = Math.min(44, 560 / c, 250 / Math.max(a, b))
    const A: Point = [320 - (c * unit) / 2, 290]
    const B: Point = [320 + (c * unit) / 2, 290]
    const shape = closure(state)
    const apexX = (b * b - a * a + c * c) / (2 * c)
    const C: Point = [A[0] + apexX * unit, 290 - Math.sqrt(Math.max(0, b * b - apexX * apexX)) * unit]
    const loose = (from: Point, length: number, angle: number): Point => [from[0] + length * unit * Math.cos(rad(angle)), from[1] - length * unit * Math.sin(rad(angle))]
    const kinds = {
        equilateral: say('aldeberdina', 'equilátero', 'متساوي الأضلاع'),
        isosceles: say('isoszelea', 'isósceles', 'متساوي الساقين'),
        scalene: say('eskalenoa', 'escaleno', 'مختلف الأضلاع'),
        acute: say('angelu-zorrotza', 'acutángulo', 'حاد الزوايا'),
        right: say('angeluzuzena', 'rectángulo', 'قائم الزاوية'),
        obtuse: say('angelu-kamutsa', 'obtusángulo', 'منفرج الزاوية')
    }
    const [large, rest] = (() => {
        const list = [a, b, c].sort((x, y) => y - x)
        return [list[0], [list[1], list[2]]] as const
    })()
    const controls = (
        <>
            <Stepper label="a" value={a} min={1} max={SIDE_MAX} onChange={(value) => setState((s) => setTriangle(s, { a: value }))} language={props.language} />
            <Stepper label="b" value={b} min={1} max={SIDE_MAX} onChange={(value) => setState((s) => setTriangle(s, { b: value }))} language={props.language} />
            <Stepper label={l(say('c (oinarria)', 'c (base)', 'c (القاعدة)'))} value={c} min={1} max={SIDE_MAX} onChange={(value) => setState((s) => setTriangle(s, { c: value }))} language={props.language} />
        </>
    )
    const sign = shape === 'closes' ? '<' : shape === 'flat' ? '=' : '>'
    const angles = shape === 'closes' ? triangleAngles(state) : null
    const note = shape === 'closes'
        ? `${l(say('Triangelu', 'Triángulo', 'مثلث'))} ${l(kinds[sideKind(state)])}, ${l(kinds[angleKind(state)])}: ${angles!.map((value) => `${value}°`).join(' · ')}`
        : shape === 'flat'
            ? l(say('Aldeak zuzen baten gainean geratzen dira: ez dago triangelurik.', 'Los lados quedan aplastados sobre una recta: no hay triángulo.', 'تنطبق الأضلاع على مستقيم: لا يوجد مثلث.'))
            : l(say('Bi alde txikiek ez dute elkar ukitzen: ez dago triangelurik.', 'Los dos lados pequeños no llegan a tocarse: no hay triángulo.', 'لا يلتقي الضلعان الصغيران: لا يوجد مثلث.'))
    const latex = shape === 'closes' ? `${large}${sign}${rest[0]}+${rest[1]}\\qquad ${large}^{2}=${large * large}\\ ${angleKind(state) === 'right' ? '=' : angleKind(state) === 'acute' ? '<' : '>'}\\ ${rest[0] * rest[0] + rest[1] * rest[1]}` : `${large}${sign}${rest[0]}+${rest[1]}`
    return (
        <ToolFrame {...props} controls={controls} readout={<Readout language={props.language} latex={latex} note={note} />} challenges={triangleChallenges} state={state}>
            <Board height={320} label={l(say('Hiru aldeko triangelua', 'El triángulo de tres lados', 'المثلث ذو الأضلاع الثلاثة'))}>
                {shape === 'closes' ? (
                    <g>
                        <polygon points={points([A, B, C])} fill={STAGE_TINT} stroke={INK} strokeWidth={2.6} strokeLinejoin="round" />
                        <text x={(B[0] + C[0]) / 2 + 14} y={(B[1] + C[1]) / 2} fontSize={18} fontWeight={700} fill={STAGE}>a = {a}</text>
                        <text x={(A[0] + C[0]) / 2 - 14} y={(A[1] + C[1]) / 2} textAnchor="end" fontSize={18} fontWeight={700} fill={STAGE}>b = {b}</text>
                    </g>
                ) : (
                    <g>
                        <line x1={A[0]} y1={A[1]} x2={B[0]} y2={B[1]} stroke={INK} strokeWidth={2.6} />
                        <path d={`M${A[0] + b * unit} ${A[1]} A${b * unit} ${b * unit} 0 0 0 ${A[0]} ${A[1] - b * unit}`} fill="none" stroke={MUTED} strokeWidth={1.4} strokeDasharray="5 5" />
                        <path d={`M${B[0] - a * unit} ${B[1]} A${a * unit} ${a * unit} 0 0 1 ${B[0]} ${B[1] - a * unit}`} fill="none" stroke={MUTED} strokeWidth={1.4} strokeDasharray="5 5" />
                        {[[A, b, 60, 'b'] as const, [B, a, 120, 'a'] as const].map(([from, length, angle, name]) => {
                            const end = loose(from, length, angle)
                            return (
                                <g key={name}>
                                    <line x1={from[0]} y1={from[1]} x2={end[0]} y2={end[1]} stroke={SECOND} strokeWidth={3.4} strokeLinecap="round" />
                                    <text x={end[0]} y={end[1] - 10} textAnchor="middle" fontSize={18} fontWeight={700} fill={SECOND}>{name} = {length}</text>
                                </g>
                            )
                        })}
                    </g>
                )}
                <text x={320} y={314} textAnchor="middle" fontSize={18} fontWeight={700} fill={INK}>c = {c}</text>
            </Board>
        </ToolFrame>
    )
}

/* ---------- 4. Notable points ---------- */

const centreNames: Record<CentrePoint, Text> = {
    circum: say('Zirkunzentroa', 'Circuncentro', 'مركز الدائرة المحيطة'),
    in: say('Inzentroa', 'Incentro', 'مركز الدائرة الداخلية'),
    centroid: say('Barizentroa', 'Baricentro', 'مركز الثقل'),
    ortho: say('Ortozentroa', 'Ortocentro', 'ملتقى الارتفاعات')
}

export function CentersTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<CentersState>(initialCentersState)
    const unit = 30
    const toScreen = ([x, y]: [number, number]): Point => [170 + x * unit, 290 - y * unit]
    const A = toScreen([0, 0])
    const B = toScreen([BASE, 0])
    const C = toScreen([state.x, state.h])
    const P = toScreen(centrePoint(state))
    const { kind } = apexKind(state)
    const where = placement(state)
    const middle = (p: Point, q: Point): Point => [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2]
    const foot = (v: Point, p: Point, q: Point): Point => {
        const dx = q[0] - p[0]
        const dy = q[1] - p[1]
        const t = ((v[0] - p[0]) * dx + (v[1] - p[1]) * dy) / (dx * dx + dy * dy)
        return [p[0] + t * dx, p[1] + t * dy]
    }
    const sides: Array<[Point, Point, Point]> = [[A, B, C], [B, C, A], [C, A, B]]
    const a = Math.hypot(B[0] - C[0], B[1] - C[1])
    const b = Math.hypot(A[0] - C[0], A[1] - C[1])
    const c = Math.hypot(A[0] - B[0], A[1] - B[1])
    const s = (a + b + c) / 2
    const inRadius = Math.sqrt(Math.max(0, (s - a) * (s - b) * (s - c) / s))
    const kinds = { acute: say('angelu-zorrotza', 'acutángulo', 'حاد الزوايا'), right: say('angeluzuzena', 'rectángulo', 'قائم الزاوية'), obtuse: say('angelu-kamutsa', 'obtusángulo', 'منفرج الزاوية') }
    const places = { inside: say('barruan', 'dentro', 'داخله'), side: say('alde baten gainean (hipotenusaren erdian)', 'sobre un lado (mitad de la hipotenusa)', 'على ضلع (منتصف الوتر)'), vertex: say('erpin batean (angelu zuzenekoan)', 'en un vértice (el del ángulo recto)', 'عند رأس (رأس الزاوية القائمة)'), outside: say('kanpoan', 'fuera', 'خارجه') }
    const controls = (
        <>
            <Segmented label={l(say('Puntua', 'Punto', 'النقطة'))} value={state.point} options={(Object.keys(centreNames) as CentrePoint[]).map((point) => ({ value: point, label: l(centreNames[point]) }))} onChange={(point) => setState((st) => setCenters(st, { point: point as CentrePoint }))} />
            <Stepper label={l(say('C ezker-eskuin', 'C izquierda-derecha', 'C يسارًا ويمينًا'))} value={state.x} min={APEX_X_MIN} max={APEX_X_MAX} onChange={(x) => setState((st) => setCenters(st, { x }))} language={props.language} />
            <Stepper label={l(say('C-ren altuera', 'Altura de C', 'ارتفاع C'))} value={state.h} min={1} max={APEX_H_MAX} onChange={(h) => setState((st) => setCenters(st, { h }))} language={props.language} />
        </>
    )
    const note = `${l(say('Triangelu', 'Triángulo', 'مثلث'))} ${l(kinds[kind])}. ${l(centreNames[state.point])}: ${l(places[where])}.`
    const lines: ReactNode[] = []
    if (state.point === 'circum') sides.forEach(([p, q], index) => lines.push(<line key={index} x1={middle(p, q)[0]} y1={middle(p, q)[1]} x2={P[0]} y2={P[1]} stroke={SECOND} strokeWidth={1.6} strokeDasharray="6 4" />))
    if (state.point === 'in') sides.forEach(([, , v], index) => lines.push(<line key={index} x1={v[0]} y1={v[1]} x2={P[0]} y2={P[1]} stroke={SECOND} strokeWidth={1.6} strokeDasharray="6 4" />))
    if (state.point === 'centroid') sides.forEach(([p, q, v], index) => lines.push(<line key={index} x1={v[0]} y1={v[1]} x2={middle(p, q)[0]} y2={middle(p, q)[1]} stroke={SECOND} strokeWidth={1.6} />))
    if (state.point === 'ortho') sides.forEach(([p, q, v], index) => {
        const f = foot(v, p, q)
        lines.push(<g key={index}><line x1={v[0]} y1={v[1]} x2={f[0]} y2={f[1]} stroke={SECOND} strokeWidth={1.6} /><line x1={f[0]} y1={f[1]} x2={P[0]} y2={P[1]} stroke={SECOND} strokeWidth={1.2} strokeDasharray="4 4" /><line x1={p[0]} y1={p[1]} x2={f[0]} y2={f[1]} stroke={MUTED} strokeWidth={1} strokeDasharray="3 4" /></g>)
    })
    return (
        <ToolFrame {...props} controls={controls} readout={<Readout language={props.language} latex={`C=(${state.x},\\ ${state.h})`} note={note} />} challenges={centersChallenges} state={state}>
            <Board height={330} label={l(centreNames[state.point])}>
                {state.point === 'circum' && <circle cx={P[0]} cy={P[1]} r={Math.hypot(A[0] - P[0], A[1] - P[1])} fill="none" stroke={MUTED} strokeWidth={1.6} strokeDasharray="6 5" />}
                {state.point === 'in' && <circle cx={P[0]} cy={P[1]} r={inRadius} fill="none" stroke={MUTED} strokeWidth={1.6} strokeDasharray="6 5" />}
                <polygon points={points([A, B, C])} fill={STAGE_TINT} fillOpacity={0.85} stroke={INK} strokeWidth={2.6} strokeLinejoin="round" />
                {lines}
                <circle cx={P[0]} cy={P[1]} r={7} fill={where === 'outside' ? SECOND : where === 'inside' ? GREEN : STAGE} stroke={CARD} strokeWidth={2} />
                {([[A, 'A'], [B, 'B'], [C, 'C']] as const).map(([v, name]) => <text key={name} x={v[0]} y={name === 'C' ? v[1] - 12 : v[1] + 24} textAnchor="middle" fontSize={17} fontWeight={700} fill={INK}>{name}</text>)}
            </Board>
        </ToolFrame>
    )
}

/* ---------- 5. The quadrilateral from its diagonals ---------- */

const quadNames: Record<QuadName, Text> = {
    square: say('Karratua', 'Cuadrado', 'مربع'),
    rectangle: say('Laukizuzena', 'Rectángulo', 'مستطيل'),
    rhombus: say('Erronboa', 'Rombo', 'معيّن'),
    romboid: say('Erronboidea', 'Romboide', 'متوازي أضلاع'),
    kite: say('Kometa', 'Cometa', 'طائرة ورقية'),
    trapezoid: say('Trapezoidea', 'Trapezoide', 'رباعي عام')
}

export function QuadTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<QuadState>(initialQuadState)
    const unit = 30
    // With only one diagonal halved, the long part goes up: the crossing moves down to keep it on the board
    const cross: Point = [320, state.cut === 'both' ? 170 : 245]
    const half = (state.first * unit) / 2
    const direction: Point = [Math.cos(rad(state.angle)), -Math.sin(rad(state.angle))]
    const [near, far] = state.cut === 'both' ? [state.second / 2, state.second / 2] : [state.second / 4, (3 * state.second) / 4]
    const p0: Point = [cross[0] - half, cross[1]]
    const p2: Point = [cross[0] + half, cross[1]]
    const p1: Point = [cross[0] - near * unit * direction[0], cross[1] - near * unit * direction[1]]
    const p3: Point = [cross[0] + far * unit * direction[0], cross[1] + far * unit * direction[1]]
    const name = quadName(state)
    const controls = (
        <>
            <Stepper label={l(say('1. diagonala', '1.ª diagonal', 'القطر الأول'))} value={state.first} min={DIAGONAL_MIN} max={DIAGONAL_MAX} onChange={(first) => setState((s) => setQuad(s, { first }))} language={props.language} />
            <Stepper label={l(say('2. diagonala', '2.ª diagonal', 'القطر الثاني'))} value={state.second} min={DIAGONAL_MIN} max={DIAGONAL_MAX} onChange={(second) => setState((s) => setQuad(s, { second }))} language={props.language} />
            <Segmented label={l(say('Angelua', 'Ángulo', 'الزاوية'))} value={String(state.angle)} options={[{ value: '90', label: '90°' }, { value: '60', label: '60°' }]} onChange={(angle) => setState((s) => setQuad(s, { angle: Number(angle) as 90 | 60 }))} />
            <Segmented label={l(say('Erdian ebakitzen dira', 'Se cortan por la mitad', 'التنصيف'))} value={state.cut} options={[{ value: 'both', label: l(say('Biak', 'Las dos', 'كلاهما')) }, { value: 'one', label: l(say('Bat bakarrik', 'Solo una', 'واحد فقط')) }]} onChange={(cut) => setState((s) => setQuad(s, { cut: cut as QuadState['cut'] }))} />
        </>
    )
    const axes = symmetryAxes[name]
    const note = l(say(`${axes} simetria-ardatz.`, `${axes} ejes de simetría.`, `محاور التناظر: ${axes}.`))
    return (
        <ToolFrame {...props} controls={controls} readout={(
            <>
                <span className="fraction-v2-lab-readout-main">{l(quadNames[name])}</span>
                <span className="fraction-v2-lab-readout-note">{note}</span>
            </>
        )} challenges={quadChallenges} state={state}>
            <Board height={330} label={l(quadNames[name])}>
                <polygon points={points([p0, p1, p2, p3])} fill={STAGE_TINT} stroke={INK} strokeWidth={2.6} strokeLinejoin="round" />
                <line x1={p0[0]} y1={p0[1]} x2={p2[0]} y2={p2[1]} stroke={SECOND} strokeWidth={3} />
                <line x1={p1[0]} y1={p1[1]} x2={p3[0]} y2={p3[1]} stroke={STAGE} strokeWidth={3} />
                <circle cx={cross[0]} cy={cross[1]} r={5} fill={INK} />
                {state.angle === 90 && <polyline points={points([[cross[0] - 14, cross[1]], [cross[0] - 14, cross[1] - 14], [cross[0], cross[1] - 14]])} fill="none" stroke={INK} strokeWidth={2} />}
                <text x={(p0[0] + cross[0]) / 2} y={cross[1] + 24} textAnchor="middle" fontSize={15} fontWeight={700} fill={SECOND}>{state.first / 2}</text>
                <text x={(p2[0] + cross[0]) / 2} y={cross[1] + 24} textAnchor="middle" fontSize={15} fontWeight={700} fill={SECOND}>{state.first / 2}</text>
                <text x={(p1[0] + cross[0]) / 2 - 16} y={(p1[1] + cross[1]) / 2} textAnchor="end" fontSize={15} fontWeight={700} fill={STAGE}>{String(near).replace('.', props.language === 'ar' ? '.' : ',')}</text>
                <text x={(p3[0] + cross[0]) / 2 + 16} y={(p3[1] + cross[1]) / 2} fontSize={15} fontWeight={700} fill={STAGE}>{String(far).replace('.', props.language === 'ar' ? '.' : ',')}</text>
            </Board>
        </ToolFrame>
    )
}

/* ---------- 6. Positions of circles ---------- */

const positionNames: Record<CirclePosition, Text> = {
    secant: say('Ebakitzailea', 'Secante', 'قاطع'),
    tangent: say('Ukitzailea', 'Tangente', 'مماس'),
    exterior: say('Kanpokoa(k)', 'Exterior(es)', 'خارجي'),
    'tangent-exterior': say('Kanpotik ukitzaileak', 'Tangentes exteriores', 'متماستان من الخارج'),
    'tangent-interior': say('Barrutik ukitzaileak', 'Tangentes interiores', 'متماستان من الداخل'),
    interior: say('Barnekoak', 'Interiores', 'متداخلتان'),
    concentric: say('Zentrokideak', 'Concéntricas', 'متحدتا المركز'),
    coincident: say('Bat datoz', 'Coinciden', 'منطبقتان')
}

export function CirclesTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<CirclesState>(initialCirclesState)
    const unit = 14
    const cx = 170
    const cy = 170
    const position = circlePosition(state)
    const line = state.mode === 'line'
    const controls = (
        <>
            <Segmented label={l(say('Zer mugitu', 'Qué mover', 'ماذا نحرّك'))} value={state.mode} options={[{ value: 'line', label: l(say('Zuzen bat', 'Una recta', 'مستقيم')) }, { value: 'two', label: l(say('Beste zirkunferentzia', 'Otra circunferencia', 'دائرة أخرى')) }]} onChange={(mode) => setState((s) => setCircles(s, { mode: mode as CirclesState['mode'] }))} />
            <Stepper label={line ? 'r' : 'r₁'} value={state.first} min={1} max={RADIUS_MAX} onChange={(first) => setState((s) => setCircles(s, { first }))} language={props.language} />
            {!line && <Stepper label="r₂" value={state.second} min={1} max={RADIUS_MAX} onChange={(second) => setState((s) => setCircles(s, { second }))} language={props.language} />}
            <Stepper label="d" value={state.distance} min={0} max={DISTANCE_MAX} onChange={(distance) => setState((s) => setCircles(s, { distance }))} language={props.language} />
        </>
    )
    const latex = line ? `d=${state.distance}\\qquad r=${state.first}` : `d=${state.distance}\\qquad r_1+r_2=${state.first + state.second}\\qquad |r_1-r_2|=${Math.abs(state.first - state.second)}`
    const x = cx + state.distance * unit
    return (
        <ToolFrame {...props} controls={controls} readout={<Readout language={props.language} latex={latex} note={l(positionNames[position])} />} challenges={circlesChallenges} state={state}>
            <Board height={340} label={l(positionNames[position])}>
                <circle cx={cx} cy={cy} r={state.first * unit} fill={STAGE_TINT} fillOpacity={0.7} stroke={STAGE} strokeWidth={2.4} />
                <circle cx={cx} cy={cy} r={4} fill={STAGE} />
                {line
                    ? <line x1={x} y1={12} x2={x} y2={328} stroke={SECOND} strokeWidth={3} />
                    : (
                        <g>
                            <circle cx={x} cy={cy} r={state.second * unit} fill={SOFT} fillOpacity={0.6} stroke={SECOND} strokeWidth={2.4} />
                            <circle cx={x} cy={cy} r={4} fill={SECOND} />
                        </g>
                    )}
                {state.distance > 0 && <line x1={cx} y1={cy} x2={x} y2={cy} stroke={INK} strokeWidth={1.6} strokeDasharray="5 4" />}
                {state.distance > 0 && <text x={(cx + x) / 2} y={cy - 8} textAnchor="middle" fontSize={16} fontWeight={700} fill={INK}>d</text>}
            </Board>
        </ToolFrame>
    )
}

/* ---------- 7. Sector and ring ---------- */

export function SectorTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<SectorState>(initialSectorState)
    const unit = 15
    const cx = 320
    const cy = 170
    const ring = state.mode === 'ring'
    const r = state.radius * unit
    const end: Point = [cx + r * Math.cos(rad(state.angle)), cy - r * Math.sin(rad(state.angle))]
    const controls = (
        <>
            <Segmented label={l(say('Irudia', 'Figura', 'الشكل'))} value={state.mode} options={[{ value: 'sector', label: l(say('Sektorea', 'Sector', 'قطاع')) }, { value: 'ring', label: l(say('Koroa', 'Corona', 'حلقة')) }]} onChange={(mode) => setState((s) => setSector(s, { mode: mode as SectorState['mode'] }))} />
            {ring ? (
                <>
                    <Stepper label="R" value={state.outer} min={2} max={SECTOR_RADIUS_MAX} onChange={(outer) => setState((s) => setSector(s, { outer }))} language={props.language} />
                    <Stepper label="r" value={state.inner} min={1} max={state.outer - 1} onChange={(inner) => setState((s) => setSector(s, { inner }))} language={props.language} />
                </>
            ) : (
                <>
                    <Stepper label="r" value={state.radius} min={1} max={SECTOR_RADIUS_MAX} onChange={(radius) => setState((s) => setSector(s, { radius }))} language={props.language} />
                    <Stepper label={l(say('Angelua', 'Ángulo', 'الزاوية'))} value={state.angle} min={ANGLE_STEP} max={360} step={ANGLE_STEP} format={(value) => `${value}°`} onChange={(angle) => setState((s) => setSector(s, { angle }))} language={props.language} />
                </>
            )}
        </>
    )
    const latex = ring
        ? `A=3{,}14\\cdot(${state.outer}^{2}-${state.inner}^{2})${measure(ringArea(state))}`
        : `A=\\frac{3{,}14\\cdot ${state.radius}^{2}\\cdot ${state.angle}}{360}${measure(sectorArea(state))}\\qquad L=\\frac{2\\cdot 3{,}14\\cdot ${state.radius}\\cdot ${state.angle}}{360}${measure(arcLength(state))}`
    const note = ring ? l(say('Zirkulu handia ken txikia (cm²).', 'El círculo grande menos el pequeño (cm²).', 'القرص الكبير ناقص الصغير (سم²).')) : l(say('Azalera (cm²) eta arkuaren luzera (cm).', 'Área (cm²) y longitud del arco (cm).', 'المساحة (سم²) وطول القوس (سم).'))
    return (
        <ToolFrame {...props} controls={controls} readout={<Readout language={props.language} latex={latex} note={note} />} challenges={sectorChallenges} state={state}>
            <Board height={340} label={ring ? l(say('Koroa zirkularra', 'Corona circular', 'حلقة دائرية')) : l(say('Sektore zirkularra', 'Sector circular', 'قطاع دائري'))}>
                {ring ? (
                    <g>
                        <circle cx={cx} cy={cy} r={state.outer * unit} fill={STAGE_TINT} stroke={STAGE} strokeWidth={2.4} />
                        <circle cx={cx} cy={cy} r={state.inner * unit} fill={CARD} stroke={STAGE} strokeWidth={2.4} />
                        <line x1={cx} y1={cy} x2={cx + state.outer * unit} y2={cy} stroke={SECOND} strokeWidth={2} />
                        <line x1={cx} y1={cy} x2={cx - state.inner * unit * 0.7071} y2={cy - state.inner * unit * 0.7071} stroke={INK} strokeWidth={2} />
                    </g>
                ) : (
                    <g>
                        <circle cx={cx} cy={cy} r={r} fill="none" stroke={MUTED} strokeWidth={1.4} strokeDasharray="6 5" />
                        {state.angle === 360
                            ? <circle cx={cx} cy={cy} r={r} fill={STAGE_TINT} stroke={SECOND} strokeWidth={4} />
                            : (
                                <g>
                                    <path d={`M${cx} ${cy} L${cx + r} ${cy} A${r} ${r} 0 ${state.angle > 180 ? 1 : 0} 0 ${end[0]} ${end[1]} Z`} fill={STAGE_TINT} stroke={STAGE} strokeWidth={2.4} />
                                    <path d={`M${cx + r} ${cy} A${r} ${r} 0 ${state.angle > 180 ? 1 : 0} 0 ${end[0]} ${end[1]}`} fill="none" stroke={SECOND} strokeWidth={4.5} strokeLinecap="round" />
                                </g>
                            )}
                        <circle cx={cx} cy={cy} r={4} fill={INK} />
                    </g>
                )}
            </Board>
        </ToolFrame>
    )
}

/* ---------- 8. The L shape ---------- */

export function CompositeTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<CompositeState>(initialCompositeState)
    const unit = 26
    const x0 = 160
    const y0 = 30
    const { width: W, height: H, cutWidth: w, cutHeight: h } = state
    const split = state.method === 'split'
    const outline: Point[] = [[x0, y0], [x0 + (W - w) * unit, y0], [x0 + (W - w) * unit, y0 + h * unit], [x0 + W * unit, y0 + h * unit], [x0 + W * unit, y0 + H * unit], [x0, y0 + H * unit]]
    const [tall, short] = compositePieces(state)
    const controls = (
        <>
            <Segmented label={l(say('Bidea', 'Camino', 'الطريقة'))} value={state.method} options={[{ value: 'subtract', label: l(say('Osatu eta kendu', 'Completar y restar', 'أكمل واطرح')) }, { value: 'split', label: l(say('Zatitu eta batu', 'Dividir y sumar', 'قسّم واجمع')) }]} onChange={(method) => setState((s) => setComposite(s, { method: method as CompositeState['method'] }))} />
            <Stepper label={l(say('Zabalera', 'Ancho', 'العرض'))} value={W} min={3} max={WIDTH_MAX} onChange={(width) => setState((s) => setComposite(s, { width }))} language={props.language} />
            <Stepper label={l(say('Altuera', 'Alto', 'الارتفاع'))} value={H} min={2} max={HEIGHT_MAX} onChange={(height) => setState((s) => setComposite(s, { height }))} language={props.language} />
            <Stepper label={l(say('Izkinaren zabalera', 'Ancho de la esquina', 'عرض الركن'))} value={w} min={1} max={W - 1} onChange={(cutWidth) => setState((s) => setComposite(s, { cutWidth }))} language={props.language} />
            <Stepper label={l(say('Izkinaren altuera', 'Alto de la esquina', 'ارتفاع الركن'))} value={h} min={1} max={H - 1} onChange={(cutHeight) => setState((s) => setComposite(s, { cutHeight }))} language={props.language} />
        </>
    )
    const latex = split ? `${W - w}\\cdot ${H}+${w}\\cdot ${H - h}=${tall}+${short}=${compositeArea(state)}` : `${W}\\cdot ${H}-${w}\\cdot ${h}=${W * H}-${w * h}=${compositeArea(state)}`
    const note = l(say(`Azalera ${compositeArea(state)} cm². Perimetroa ${compositePerimeter(state)} cm, laukizuzenarena bera.`, `Área: ${compositeArea(state)} cm². Perímetro: ${compositePerimeter(state)} cm, el mismo que el del rectángulo.`, `المساحة ${compositeArea(state)} سم². المحيط ${compositePerimeter(state)} سم، مثل محيط المستطيل.`))
    return (
        <ToolFrame {...props} controls={controls} readout={<Readout language={props.language} latex={latex} note={note} />} challenges={compositeChallenges} state={state}>
            <Board height={330} label={l(say('L formako irudia', 'La figura en L', 'الشكل L'))}>
                {Array.from({ length: W * H }, (_, index) => {
                    const column = index % W
                    const row = Math.floor(index / W)
                    const cut = column >= W - w && row < h
                    const fill = cut ? (split ? 'none' : SECOND) : split && column >= W - w ? SOFT : STAGE_TINT
                    return <rect key={index} x={x0 + column * unit} y={y0 + row * unit} width={unit} height={unit} fill={fill} fillOpacity={cut ? 0.12 : 1} stroke={MUTED} strokeWidth={0.6} strokeOpacity={cut && split ? 0 : 1} />
                })}
                {!split && <rect x={x0 + (W - w) * unit} y={y0} width={w * unit} height={h * unit} fill="none" stroke={SECOND} strokeWidth={2.4} strokeDasharray="7 5" />}
                {split && <line x1={x0 + (W - w) * unit} y1={y0 + h * unit} x2={x0 + (W - w) * unit} y2={y0 + H * unit} stroke={STAGE} strokeWidth={2.4} strokeDasharray="7 5" />}
                <polygon points={points(outline)} fill="none" stroke={INK} strokeWidth={2.8} strokeLinejoin="round" />
                <text x={x0 + (W * unit) / 2} y={y0 + H * unit + 24} textAnchor="middle" fontSize={16} fontWeight={700} fill={INK}>{W}</text>
                <text x={x0 - 12} y={y0 + (H * unit) / 2 + 5} textAnchor="end" fontSize={16} fontWeight={700} fill={INK}>{H}</text>
            </Board>
        </ToolFrame>
    )
}
