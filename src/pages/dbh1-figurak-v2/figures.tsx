import { pickText, type LocalizedText, type UnitLanguage } from '../../features/unit-v2/types'
import { Figure } from '../dbh2-zatikiak-prototype/figures'
import { Label } from '../dbh2-funtzioak-v2/plane'

/* ==========================================================================
   Irudi lauak · 1. DBH — lesson figures in the notebook style: diagonals
   and the triangles inside a polygon, tilings, building triangles, the
   circumcircle by kind of triangle, diagonals and angles of quadrilaterals,
   symmetry axes, lines and circles, central and inscribed angles, compound
   areas, sectors and rings, and the tiled room. Arabic captions carry words
   only; numbers and formulas go in their own left-to-right text.
   ========================================================================== */

const INK = 'var(--ink, #1d2733)'
const MUTED = 'var(--muted, #58616e)'
const STAGE = 'var(--stage, #2f6fdb)'
const STAGE_TINT = 'var(--stage-tint, #dde7f7)'
const SECOND = 'var(--second, #c4432a)'
const GREEN = 'var(--success, #267b53)'
const PAPER = '#fffcf6'
const SOFT = '#fbebc0'

type Point = [number, number]

const say = (eu: string, es: string, ar: string): LocalizedText => ({ eu, es, ar })
const pick = (language: UnitLanguage, text: LocalizedText) => pickText(language, text)
/** A number written with the comma, shown with the point in Arabic */
const num = (language: UnitLanguage, text: string) => (language === 'ar' ? text.replace(/,/g, '.') : text)
const rad = (degrees: number) => (degrees * Math.PI) / 180
const points = (list: Point[]) => list.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ')
/** Vertices of a regular polygon; `start` is the screen angle of the first vertex (−90 = top) */
const regular = (cx: number, cy: number, r: number, n: number, start = -90): Point[] =>
    Array.from({ length: n }, (_, index) => [cx + r * Math.cos(rad(start + (360 * index) / n)), cy + r * Math.sin(rad(start + (360 * index) / n))])
/** A regular polygon walked edge by edge from p, first edge at `heading` degrees (counter-clockwise on screen) */
const walk = ([x, y]: Point, heading: number, n: number, side: number): Point[] => {
    const list: Point[] = [[x, y]]
    for (let index = 1; index < n; index += 1) {
        const [px, py] = list[index - 1]
        const angle = rad(heading + ((index - 1) * 360) / n)
        list.push([px + side * Math.cos(angle), py - side * Math.sin(angle)])
    }
    return list
}
/** A point on a circle at a mathematical angle (counter-clockwise, y up) */
const onCircle = (cx: number, cy: number, r: number, degrees: number): Point => [cx + r * Math.cos(rad(degrees)), cy - r * Math.sin(rad(degrees))]
const midpoint = ([ax, ay]: Point, [bx, by]: Point): Point => [(ax + bx) / 2, (ay + by) / 2]

function Caption({ x = 360, y, language, text, color = MUTED, size = 15 }: { x?: number; y: number; language: UnitLanguage; text: LocalizedText; color?: string; size?: number }) {
    return <Label x={x} y={y} textAnchor="middle" fontSize={size} fontWeight={700} fill={color}>{pick(language, text)}</Label>
}

function Formula({ x, y, children, color = INK, size = 17 }: { x: number; y: number; children: string; color?: string; size?: number }) {
    return <text x={x} y={y} textAnchor="middle" fontSize={size} fontWeight={700} fill={color}>{children}</text>
}

/** The angle at vertex v between the rays to a and b, with an optional label */
function Corner({ v, a, b, r = 22, color = SECOND, label, labelR = r + 16, size = 14 }: { v: Point; a: Point; b: Point; r?: number; color?: string; label?: string; labelR?: number; size?: number }) {
    const from = Math.atan2(a[1] - v[1], a[0] - v[0])
    let turn = Math.atan2(b[1] - v[1], b[0] - v[0]) - from
    while (turn <= -Math.PI) turn += 2 * Math.PI
    while (turn > Math.PI) turn -= 2 * Math.PI
    const middle = from + turn / 2
    const text = label && <text x={v[0] + labelR * Math.cos(middle)} y={v[1] + labelR * Math.sin(middle) + 5} textAnchor="middle" fontSize={size} fontWeight={700} fill={color}>{label}</text>
    if (Math.abs(Math.abs(turn) - Math.PI / 2) < 0.01) {
        const s = r * 0.55
        const p1: Point = [v[0] + s * Math.cos(from), v[1] + s * Math.sin(from)]
        const p3: Point = [v[0] + s * Math.cos(from + turn), v[1] + s * Math.sin(from + turn)]
        const p2: Point = [p1[0] + p3[0] - v[0], p1[1] + p3[1] - v[1]]
        return <g><polyline points={points([p1, p2, p3])} fill="none" stroke={color} strokeWidth={2} />{text}</g>
    }
    const start: Point = [v[0] + r * Math.cos(from), v[1] + r * Math.sin(from)]
    const end: Point = [v[0] + r * Math.cos(from + turn), v[1] + r * Math.sin(from + turn)]
    return <g><path d={`M${start[0]} ${start[1]} A${r} ${r} 0 0 ${turn > 0 ? 1 : 0} ${end[0]} ${end[1]}`} fill="none" stroke={color} strokeWidth={2.2} />{text}</g>
}

/** Small ticks across the middle of a segment: equal marks */
function Ticks({ a, b, count = 1, color = INK }: { a: Point; b: Point; count?: number; color?: string }) {
    const [mx, my] = midpoint(a, b)
    const angle = Math.atan2(b[1] - a[1], b[0] - a[0])
    const nx = -Math.sin(angle) * 7
    const ny = Math.cos(angle) * 7
    return (
        <g>
            {Array.from({ length: count }, (_, index) => {
                const shift = (index - (count - 1) / 2) * 6
                const cx = mx + shift * Math.cos(angle)
                const cy = my + shift * Math.sin(angle)
                return <line key={index} x1={cx - nx} y1={cy - ny} x2={cx + nx} y2={cy + ny} stroke={color} strokeWidth={2} />
            })}
        </g>
    )
}

function Dot({ p, color = SECOND, r = 4.5 }: { p: Point; color?: string; r?: number }) {
    return <circle cx={p[0]} cy={p[1]} r={r} fill={color} />
}

/* ---------- 1. Diagonals ---------- */

export function DiagonalsFigure({ language }: { language: UnitLanguage }) {
    const shapes = [
        { n: 4, start: -135, name: say('Laukia', 'Cuadrilátero', 'رباعي'), formula: '4 · 1 : 2 = 2' },
        { n: 5, start: -90, name: say('Pentagonoa', 'Pentágono', 'مخمس'), formula: '5 · 2 : 2 = 5' },
        { n: 6, start: -90, name: say('Hexagonoa', 'Hexágono', 'مسدس'), formula: '6 · 3 : 2 = 9' }
    ]
    return (
        <Figure height={300} label={pick(language, say('Laukiaren, pentagonoaren eta hexagonoaren diagonalak', 'Diagonales del cuadrilátero, el pentágono y el hexágono', 'أقطار الرباعي والمخمس والمسدس'))}>
            {shapes.map((shape, index) => {
                const cx = 120 + index * 240
                const vertices = regular(cx, 130, 85, shape.n, shape.start)
                const diagonals: Array<[number, number]> = []
                for (let i = 0; i < shape.n; i += 1) for (let j = i + 2; j < shape.n; j += 1) if (!(i === 0 && j === shape.n - 1)) diagonals.push([i, j])
                return (
                    <g key={shape.n}>
                        <polygon points={points(vertices)} fill={STAGE_TINT} stroke={INK} strokeWidth={2.4} strokeLinejoin="round" />
                        {diagonals.map(([i, j]) => (
                            <line key={`${i}-${j}`} x1={vertices[i][0]} y1={vertices[i][1]} x2={vertices[j][0]} y2={vertices[j][1]} stroke={i === 0 ? SECOND : STAGE} strokeWidth={i === 0 ? 3 : 1.8} />
                        ))}
                        <Dot p={vertices[0]} />
                        <Caption x={cx} y={250} language={language} text={shape.name} color={INK} />
                        <Formula x={cx} y={282}>{shape.formula}</Formula>
                    </g>
                )
            })}
        </Figure>
    )
}

/* ---------- 2. The triangles inside a polygon ---------- */

export function AngleSumFigure({ language }: { language: UnitLanguage }) {
    const shapes = [
        { n: 5, cx: 190, formula: '3 · 180° = 540°' },
        { n: 6, cx: 530, formula: '4 · 180° = 720°' }
    ]
    const tints = [STAGE_TINT, SOFT, '#d6eddf', '#f6d9d2']
    return (
        <Figure height={322} label={pick(language, say('Pentagonoa 3 triangelutan eta hexagonoa 4 triangelutan', 'El pentágono en 3 triángulos y el hexágono en 4', 'المخمس في 3 مثلثات والمسدس في 4'))}>
            {shapes.map((shape) => {
                const vertices = regular(shape.cx, 142, 118, shape.n)
                return (
                    <g key={shape.n}>
                        {Array.from({ length: shape.n - 2 }, (_, index) => {
                            const triangle: Point[] = [vertices[0], vertices[index + 1], vertices[index + 2]]
                            const centre: Point = [(triangle[0][0] + triangle[1][0] + triangle[2][0]) / 3, (triangle[0][1] + triangle[1][1] + triangle[2][1]) / 3]
                            return (
                                <g key={index}>
                                    <polygon points={points(triangle)} fill={tints[index]} stroke={STAGE} strokeWidth={1.8} />
                                    <text x={centre[0]} y={centre[1] + (shape.n === 6 && index % 3 === 0 ? 14 : 8)} textAnchor="middle" fontSize={13} fontWeight={700} fill={INK}>180°</text>
                                </g>
                            )
                        })}
                        <polygon points={points(vertices)} fill="none" stroke={INK} strokeWidth={2.4} strokeLinejoin="round" />
                        <Dot p={vertices[0]} />
                        <Formula x={shape.cx} y={288} size={19} color={STAGE}>{shape.formula}</Formula>
                    </g>
                )
            })}
            <Caption y={312} language={language} text={say('Erpin batetik: n − 2 triangelu', 'Desde un vértice: n − 2 triángulos', 'من رأس واحد: n − 2 مثلثات')} size={13} />
        </Figure>
    )
}

/* ---------- 3. Regular polygons: angles and tilings ---------- */

export function RegularAnglesFigure({ language }: { language: UnitLanguage }) {
    const hexagon = regular(120, 135, 85, 6)
    const centre: Point = [120, 135]
    const hexTiles = [0, 120, 240].map((heading) => walk([360, 135], heading, 6, 50))
    const pentTiles = [0, 108, 216].map((heading) => walk([600, 140], heading, 5, 58))
    return (
        <Figure height={300} label={pick(language, say('Hexagono erregularraren angeluak; hexagonoek lauzatzen dute, pentagonoek ez', 'Ángulos del hexágono regular; los hexágonos embaldosan y los pentágonos no', 'زوايا المسدس المنتظم؛ المسدسات تُبلِّط والمخمسات لا'))}>
            <polygon points={points(hexagon)} fill={STAGE_TINT} stroke={INK} strokeWidth={2.4} strokeLinejoin="round" />
            <line x1={120} y1={135} x2={hexagon[0][0]} y2={hexagon[0][1]} stroke={STAGE} strokeWidth={2} />
            <line x1={120} y1={135} x2={hexagon[1][0]} y2={hexagon[1][1]} stroke={STAGE} strokeWidth={2} />
            <Corner v={centre} a={hexagon[0]} b={hexagon[1]} r={20} color={STAGE} label="60°" labelR={36} />
            <Corner v={hexagon[3]} a={hexagon[2]} b={hexagon[4]} r={20} label="120°" labelR={40} />
            <Dot p={centre} color={STAGE} r={3.5} />
            <Caption x={120} y={262} language={language} text={say('Zentrala eta barnekoa', 'Central e interior', 'المركزية والداخلية')} color={INK} />

            {hexTiles.map((tile, index) => <polygon key={index} points={points(tile)} fill={index === 1 ? SOFT : STAGE_TINT} stroke={INK} strokeWidth={2} strokeLinejoin="round" />)}
            <Dot p={[360, 135]} />
            <Formula x={360} y={262} color={GREEN}>3 · 120° = 360°</Formula>
            <Caption x={360} y={288} language={language} text={say('Lauzatzen du', 'Embaldosa', 'يُبلِّط')} color={GREEN} />

            {pentTiles.map((tile, index) => <polygon key={index} points={points(tile)} fill={index === 1 ? SOFT : STAGE_TINT} stroke={INK} strokeWidth={2} strokeLinejoin="round" />)}
            <path d={`M600 140 L${600 + 46 * Math.cos(rad(324))} ${140 - 46 * Math.sin(rad(324))} A46 46 0 0 0 646 140 Z`} fill={SECOND} fillOpacity={0.35} />
            <Dot p={[600, 140]} />
            <Formula x={600} y={262} color={SECOND}>3 · 108° = 324°</Formula>
            <Caption x={600} y={288} language={language} text={say('Hutsunea geratzen da', 'Queda un hueco', 'تبقى فجوة')} color={SECOND} />
        </Figure>
    )
}

/* ---------- 4. When a triangle closes ---------- */

export function TriangleExistsFigure({ language }: { language: UnitLanguage }) {
    const scale = 30
    const a: Point = [60, 200]
    const b: Point = [60 + 7 * scale, 200]
    const apexX = (49 + 9 - 25) / 14
    const c: Point = [60 + apexX * scale, 200 - Math.sqrt(9 - apexX * apexX) * scale]
    const left: Point = [420, 200]
    const right: Point = [660, 200]
    const leftEnd = onCircle(420, 200, 3 * scale, 55)
    const rightEnd = onCircle(660, 200, 4 * scale, 125)
    return (
        <Figure height={290} label={pick(language, say('3, 5 eta 7: triangelua ixten da. 3, 4 eta 8: ez da ixten', '3, 5 y 7: el triángulo se cierra. 3, 4 y 8: no se cierra', '3 و5 و7: يُغلق المثلث. 3 و4 و8: لا يُغلق'))}>
            <polygon points={points([a, b, c])} fill={STAGE_TINT} stroke={INK} strokeWidth={2.4} strokeLinejoin="round" />
            <text x={(a[0] + b[0]) / 2} y={226} textAnchor="middle" fontSize={17} fontWeight={700} fill={INK}>7</text>
            <text x={(a[0] + c[0]) / 2 - 14} y={(a[1] + c[1]) / 2} textAnchor="middle" fontSize={17} fontWeight={700} fill={STAGE}>3</text>
            <text x={(b[0] + c[0]) / 2 + 14} y={(b[1] + c[1]) / 2} textAnchor="middle" fontSize={17} fontWeight={700} fill={STAGE}>5</text>
            <Formula x={165} y={258} color={GREEN} size={19}>7 &lt; 3 + 5</Formula>
            <Caption x={165} y={284} language={language} text={say('Ixten da', 'Se cierra', 'يُغلق')} color={GREEN} />

            <line x1={left[0]} y1={200} x2={right[0]} y2={200} stroke={INK} strokeWidth={2.4} />
            <path d={`M${420 + 3 * scale} 200 A${3 * scale} ${3 * scale} 0 0 0 420 ${200 - 3 * scale}`} fill="none" stroke={STAGE} strokeWidth={1.5} strokeDasharray="5 5" />
            <path d={`M${660 - 4 * scale} 200 A${4 * scale} ${4 * scale} 0 0 1 660 ${200 - 4 * scale}`} fill="none" stroke={STAGE} strokeWidth={1.5} strokeDasharray="5 5" />
            <line x1={420} y1={200} x2={leftEnd[0]} y2={leftEnd[1]} stroke={STAGE} strokeWidth={3} strokeLinecap="round" />
            <line x1={660} y1={200} x2={rightEnd[0]} y2={rightEnd[1]} stroke={STAGE} strokeWidth={3} strokeLinecap="round" />
            <text x={540} y={226} textAnchor="middle" fontSize={17} fontWeight={700} fill={INK}>8</text>
            <text x={(420 + leftEnd[0]) / 2 - 14} y={(200 + leftEnd[1]) / 2} textAnchor="middle" fontSize={17} fontWeight={700} fill={STAGE}>3</text>
            <text x={(660 + rightEnd[0]) / 2 + 16} y={(200 + rightEnd[1]) / 2} textAnchor="middle" fontSize={17} fontWeight={700} fill={STAGE}>4</text>
            <Formula x={540} y={258} color={SECOND} size={19}>8 &gt; 3 + 4</Formula>
            <Caption x={540} y={284} language={language} text={say('Ez da ixten', 'No se cierra', 'لا يُغلق')} color={SECOND} />
        </Figure>
    )
}

/* ---------- 5. Sides and angles ---------- */

export function SideAngleFigure({ language }: { language: UnitLanguage }) {
    const A: Point = [50, 215]
    const B: Point = [300, 215]
    const C: Point = [115, 80]
    const height = 150
    const half = height * Math.tan(rad(20))
    const apex: Point = [540, 60]
    const baseLeft: Point = [540 - half, 60 + height]
    const baseRight: Point = [540 + half, 60 + height]
    return (
        <Figure height={290} label={pick(language, say('Alde handienaren aurrean angelu handiena; isoszelearen oinarriko angeluak berdinak', 'Frente al lado mayor, el ángulo mayor; los ángulos de la base del isósceles son iguales', 'الزاوية الكبرى تقابل الضلع الأكبر؛ وزاويتا قاعدة متساوي الساقين متساويتان'))}>
            <polygon points={points([A, B, C])} fill={STAGE_TINT} stroke={INK} strokeWidth={2.2} strokeLinejoin="round" />
            <line x1={A[0]} y1={A[1]} x2={B[0]} y2={B[1]} stroke={SECOND} strokeWidth={4} />
            <Corner v={C} a={A} b={B} r={24} label="" />
            <line x1={A[0]} y1={A[1]} x2={C[0]} y2={C[1]} stroke={STAGE} strokeWidth={4} />
            <Corner v={B} a={A} b={C} r={34} color={STAGE} />
            <Caption x={175} y={244} language={language} text={say('alde handiena', 'lado mayor', 'الضلع الأكبر')} color={SECOND} size={14} />
            <Caption x={190} y={64} language={language} text={say('angelu handiena', 'ángulo mayor', 'الزاوية الكبرى')} color={SECOND} size={14} />
            <Caption x={175} y={280} language={language} text={say('Alde txikiena ↔ angelu txikiena', 'Lado menor ↔ ángulo menor', 'الضلع الأصغر ↔ الزاوية الصغرى')} color={STAGE} size={14} />

            <polygon points={points([apex, baseLeft, baseRight])} fill={SOFT} stroke={INK} strokeWidth={2.2} strokeLinejoin="round" />
            <Ticks a={apex} b={baseLeft} />
            <Ticks a={apex} b={baseRight} />
            <Corner v={apex} a={baseLeft} b={baseRight} r={30} color={INK} label="40°" labelR={48} />
            <Corner v={baseLeft} a={baseRight} b={apex} r={24} label="70°" labelR={44} />
            <Corner v={baseRight} a={apex} b={baseLeft} r={24} label="70°" labelR={44} />
            <Formula x={540} y={250} size={16}>(180° − 40°) : 2 = 70°</Formula>
            <Caption x={540} y={280} language={language} text={say('Isoszelea', 'Isósceles', 'متساوي الساقين')} color={INK} size={14} />
        </Figure>
    )
}

/* ---------- 6. Where the circumcentre falls ---------- */

const circumcentre = ([ax, ay]: Point, [bx, by]: Point, [cx, cy]: Point): Point => {
    const d = 2 * (ax * (by - cy) + bx * (cy - ay) + cx * (ay - by))
    const a2 = ax * ax + ay * ay
    const b2 = bx * bx + by * by
    const c2 = cx * cx + cy * cy
    return [(a2 * (by - cy) + b2 * (cy - ay) + c2 * (ay - by)) / d, (a2 * (cx - bx) + b2 * (ax - cx) + c2 * (bx - ax)) / d]
}

export function CentersFigure({ language }: { language: UnitLanguage }) {
    const cases = [
        { triangle: [[50, 200], [190, 200], [110, 90]] as Point[], name: say('Angelu-zorrotza: barruan', 'Acutángulo: dentro', 'حاد الزوايا: داخله'), color: GREEN },
        { triangle: [[60, 210], [190, 210], [60, 120]] as Point[], name: say('Angeluzuzena: hipotenusan', 'Rectángulo: en la hipotenusa', 'قائم: على الوتر'), color: STAGE },
        { triangle: [[40, 135], [200, 135], [90, 95]] as Point[], name: say('Angelu-kamutsa: kanpoan', 'Obtusángulo: fuera', 'منفرج: خارجه'), color: SECOND }
    ]
    return (
        <Figure height={310} label={pick(language, say('Zirkunferentzia zirkunskribatua eta zirkunzentroa triangelu motaren arabera', 'Circunferencia circunscrita y circuncentro según el tipo de triángulo', 'الدائرة المحيطة ومركزها حسب نوع المثلث'))}>
            {cases.map((item, index) => {
                const shift = index * 240
                const triangle = item.triangle.map(([x, y]) => [x + shift, y] as Point)
                const centre = circumcentre(triangle[0], triangle[1], triangle[2])
                const radius = Math.hypot(triangle[0][0] - centre[0], triangle[0][1] - centre[1])
                return (
                    <g key={index}>
                        <circle cx={centre[0]} cy={centre[1]} r={radius} fill="none" stroke={MUTED} strokeWidth={1.6} strokeDasharray="6 5" />
                        <polygon points={points(triangle)} fill={STAGE_TINT} fillOpacity={0.8} stroke={INK} strokeWidth={2.2} strokeLinejoin="round" />
                        {triangle.map((vertex, v) => <line key={v} x1={centre[0]} y1={centre[1]} x2={vertex[0]} y2={vertex[1]} stroke={item.color} strokeWidth={1.4} strokeOpacity={0.7} />)}
                        <Dot p={centre} color={item.color} r={5.5} />
                        <Caption x={120 + shift} y={300} language={language} text={item.name} color={item.color} size={14} />
                    </g>
                )
            })}
        </Figure>
    )
}

/* ---------- 7. Diagonals of quadrilaterals ---------- */

export function QuadDiagonalsFigure({ language }: { language: UnitLanguage }) {
    const shapes = [
        { name: say('Laukizuzena', 'Rectángulo', 'مستطيل'), note: say('berdinak', 'iguales', 'متساويان'), vertices: [[30, 70], [150, 70], [150, 150], [30, 150]] as Point[], equal: true, right: false },
        { name: say('Erronboa', 'Rombo', 'معيّن'), note: say('perpendikularrak', 'perpendiculares', 'متعامدان'), vertices: [[90, 50], [150, 110], [90, 170], [30, 110]] as Point[], equal: false, right: true },
        { name: say('Karratua', 'Cuadrado', 'مربع'), note: say('biak', 'las dos cosas', 'الأمران معًا'), vertices: [[45, 65], [135, 65], [135, 155], [45, 155]] as Point[], equal: true, right: true },
        { name: say('Kometa', 'Cometa', 'طائرة ورقية'), note: say('perpendikularrak', 'perpendiculares', 'متعامدان'), vertices: [[90, 45], [135, 90], [90, 180], [45, 90]] as Point[], equal: false, right: true }
    ]
    return (
        <Figure height={270} label={pick(language, say('Laukizuzenaren, erronboaren, karratuaren eta kometaren diagonalak', 'Diagonales del rectángulo, el rombo, el cuadrado y la cometa', 'أقطار المستطيل والمعيّن والمربع والطائرة الورقية'))}>
            {shapes.map((shape, index) => {
                const shift = index * 180
                const [p0, p1, p2, p3] = shape.vertices.map(([x, y]) => [x + shift, y] as Point)
                // The diagonals cross where p0p2 meets p1p3
                const denominator = (p0[0] - p2[0]) * (p1[1] - p3[1]) - (p0[1] - p2[1]) * (p1[0] - p3[0])
                const t = ((p0[0] - p1[0]) * (p1[1] - p3[1]) - (p0[1] - p1[1]) * (p1[0] - p3[0])) / denominator
                const cross: Point = [p0[0] + t * (p2[0] - p0[0]), p0[1] + t * (p2[1] - p0[1])]
                return (
                    <g key={index}>
                        <polygon points={points([p0, p1, p2, p3])} fill={STAGE_TINT} stroke={INK} strokeWidth={2.2} strokeLinejoin="round" />
                        <line x1={p0[0]} y1={p0[1]} x2={p2[0]} y2={p2[1]} stroke={SECOND} strokeWidth={2.4} />
                        <line x1={p1[0]} y1={p1[1]} x2={p3[0]} y2={p3[1]} stroke={STAGE} strokeWidth={2.4} />
                        <Ticks a={p0} b={cross} color={SECOND} />
                        <Ticks a={cross} b={p2} color={SECOND} count={index === 3 ? 2 : 1} />
                        <Ticks a={p1} b={cross} color={STAGE} count={shape.equal ? 1 : 3} />
                        <Ticks a={cross} b={p3} color={STAGE} count={shape.equal ? 1 : 3} />
                        {shape.right && <Corner v={cross} a={p0} b={p1} r={16} color={INK} />}
                        <Caption x={90 + shift} y={222} language={language} text={shape.name} color={INK} />
                        <Caption x={90 + shift} y={248} language={language} text={shape.note} size={13} />
                    </g>
                )
            })}
        </Figure>
    )
}

/* ---------- 8. Angles of quadrilaterals ---------- */

export function QuadAnglesFigure({ language }: { language: UnitLanguage }) {
    const side = 130
    const bl: Point = [50, 210]
    const br: Point = [250, 210]
    const tr: Point = [250 + side * Math.cos(rad(70)), 210 - side * Math.sin(rad(70))]
    const tl: Point = [50 + side * Math.cos(rad(70)), 210 - side * Math.sin(rad(70))]
    const leg = 120
    const a: Point = [420, 210]
    const b: Point = [660, 210]
    const c: Point = [660 - leg * Math.cos(rad(65)), 210 - leg * Math.sin(rad(65))]
    const d: Point = [420 + leg * Math.cos(rad(65)), 210 - leg * Math.sin(rad(65))]
    return (
        <Figure height={290} label={pick(language, say('Paralelogramo baten eta trapezio isoszele baten angeluak', 'Ángulos de un paralelogramo y de un trapecio isósceles', 'زوايا متوازي أضلاع وشبه منحرف متساوي الساقين'))}>
            <polygon points={points([bl, br, tr, tl])} fill={STAGE_TINT} stroke={INK} strokeWidth={2.4} strokeLinejoin="round" />
            <Corner v={bl} a={br} b={tl} label="70°" labelR={42} />
            <Corner v={br} a={tr} b={bl} color={STAGE} label="110°" labelR={42} />
            <Corner v={tr} a={tl} b={br} label="70°" labelR={42} />
            <Corner v={tl} a={bl} b={tr} color={STAGE} label="110°" labelR={42} />
            <Formula x={190} y={250}>70° + 110° = 180°</Formula>
            <Caption x={190} y={280} language={language} text={say('Aurkakoak berdinak', 'Opuestos iguales', 'المتقابلة متساوية')} size={14} />

            <polygon points={points([a, b, c, d])} fill={SOFT} stroke={INK} strokeWidth={2.4} strokeLinejoin="round" />
            <Ticks a={a} b={d} />
            <Ticks a={b} b={c} />
            <Corner v={a} a={b} b={d} label="65°" labelR={42} />
            <Corner v={b} a={c} b={a} label="65°" labelR={42} />
            <Corner v={c} a={d} b={b} color={STAGE} label="115°" labelR={42} />
            <Corner v={d} a={a} b={c} color={STAGE} label="115°" labelR={42} />
            <Formula x={540} y={250}>65° + 115° = 180°</Formula>
            <Caption x={540} y={280} language={language} text={say('Trapezio isoszelea', 'Trapecio isósceles', 'شبه منحرف متساوي الساقين')} size={14} />
        </Figure>
    )
}

/* ---------- 9. Symmetry axes ---------- */

function Axis({ a, b }: { a: Point; b: Point }) {
    return <line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={SECOND} strokeWidth={1.8} strokeDasharray="6 4" />
}

export function SymmetryFigure({ language }: { language: UnitLanguage }) {
    const cy = 110
    const pentagon = regular(504, cy, 55, 5)
    return (
        <Figure height={260} label={pick(language, say('Karratuaren, laukizuzenaren, trapezio isoszelearen, pentagonoaren eta zirkuluaren simetria-ardatzak', 'Ejes de simetría del cuadrado, el rectángulo, el trapecio isósceles, el pentágono y el círculo', 'محاور تناظر المربع والمستطيل وشبه المنحرف المتساوي الساقين والمخمس والدائرة'))}>
            <rect x={32} y={cy - 45} width={90} height={90} fill={STAGE_TINT} stroke={INK} strokeWidth={2.2} />
            <Axis a={[77, cy - 62]} b={[77, cy + 62]} />
            <Axis a={[15, cy]} b={[139, cy]} />
            <Axis a={[20, cy - 57]} b={[134, cy + 57]} />
            <Axis a={[20, cy + 57]} b={[134, cy - 57]} />

            <rect x={164} y={cy - 35} width={120} height={70} fill={STAGE_TINT} stroke={INK} strokeWidth={2.2} />
            <Axis a={[224, cy - 55]} b={[224, cy + 55]} />
            <Axis a={[150, cy]} b={[298, cy]} />

            <polygon points={points([[312, cy + 38], [428, cy + 38], [398, cy - 38], [342, cy - 38]])} fill={STAGE_TINT} stroke={INK} strokeWidth={2.2} strokeLinejoin="round" />
            <Axis a={[370, cy - 58]} b={[370, cy + 58]} />

            <polygon points={points(pentagon)} fill={STAGE_TINT} stroke={INK} strokeWidth={2.2} strokeLinejoin="round" />
            {pentagon.map((vertex, index) => {
                const [mx, my] = midpoint(pentagon[(index + 2) % 5], pentagon[(index + 3) % 5])
                const dx = mx - vertex[0]
                const dy = my - vertex[1]
                return <Axis key={index} a={[vertex[0] - dx * 0.15, vertex[1] - dy * 0.15]} b={[mx + dx * 0.15, my + dy * 0.15]} />
            })}

            <circle cx={636} cy={cy} r={52} fill={STAGE_TINT} stroke={INK} strokeWidth={2.2} />
            {[0, 30, 60, 90, 120, 150].map((angle) => <Axis key={angle} a={onCircle(636, cy, 66, angle)} b={onCircle(636, cy, 66, angle + 180)} />)}

            {['4', '2', '1', '5', '∞'].map((count, index) => (
                <text key={index} x={[77, 224, 370, 504, 636][index]} y={212} textAnchor="middle" fontSize={26} fontWeight={700} fill={SECOND}>{count}</text>
            ))}
            <Caption y={248} language={language} text={say('Simetria-ardatz kopurua', 'Número de ejes de simetría', 'عدد محاور التناظر')} size={14} />
        </Figure>
    )
}

/* ---------- 10. Line and circle ---------- */

export function LineCircleFigure({ language }: { language: UnitLanguage }) {
    const cases = [
        { d: 40, name: say('Ebakitzailea', 'Secante', 'قاطع'), formula: 'd < r', color: STAGE },
        { d: 70, name: say('Ukitzailea', 'Tangente', 'مماس'), formula: 'd = r', color: GREEN },
        { d: 98, name: say('Kanpokoa', 'Exterior', 'خارجي'), formula: 'd > r', color: SECOND }
    ]
    return (
        <Figure height={290} label={pick(language, say('Zuzen ebakitzailea, ukitzailea eta kanpokoa', 'Recta secante, tangente y exterior', 'مستقيم قاطع ومماس وخارجي'))}>
            {cases.map((item, index) => {
                const cx = 110 + index * 240
                const x = cx + item.d
                const chord = item.d < 70 ? Math.sqrt(70 * 70 - item.d * item.d) : 0
                return (
                    <g key={index}>
                        <circle cx={cx} cy={120} r={70} fill={STAGE_TINT} stroke={INK} strokeWidth={2.2} />
                        <line x1={cx} y1={120} x2={cx - 49.5} y2={120 - 49.5} stroke={MUTED} strokeWidth={1.6} />
                        <text x={cx - 34} y={100} textAnchor="middle" fontSize={15} fontWeight={700} fill={MUTED}>r</text>
                        <line x1={x} y1={28} x2={x} y2={212} stroke={item.color} strokeWidth={2.6} />
                        <line x1={cx} y1={120} x2={x} y2={120} stroke={INK} strokeWidth={1.6} strokeDasharray="5 4" />
                        <text x={cx + item.d / 2} y={140} textAnchor="middle" fontSize={15} fontWeight={700} fill={INK}>d</text>
                        <Dot p={[cx, 120]} color={INK} r={3.5} />
                        {chord > 0 && <><Dot p={[x, 120 - chord]} color={item.color} /><Dot p={[x, 120 + chord]} color={item.color} /></>}
                        {chord === 0 && item.d === 70 && <Dot p={[x, 120]} color={item.color} />}
                        <Caption x={cx + 10} y={246} language={language} text={item.name} color={item.color} />
                        <Formula x={cx + 10} y={276} color={item.color}>{item.formula}</Formula>
                    </g>
                )
            })}
        </Figure>
    )
}

/* ---------- 11. Two circles ---------- */

export function TwoCirclesFigure({ language }: { language: UnitLanguage }) {
    const big = 40
    const small = 24
    const cases = [
        { d: 84, name: say('Kanpokoak', 'Exteriores', 'متباعدتان'), formula: 'd > r₁ + r₂' },
        { d: 64, name: say('Kanpotik ukitzaileak', 'Tangentes exteriores', 'متماستان من الخارج'), formula: 'd = r₁ + r₂' },
        { d: 38, name: say('Ebakitzaileak', 'Secantes', 'متقاطعتان'), formula: 'r₁ − r₂ < d < r₁ + r₂' },
        { d: 16, name: say('Barrutik ukitzaileak', 'Tangentes interiores', 'متماستان من الداخل'), formula: 'd = r₁ − r₂' },
        { d: 7, name: say('Barnekoak', 'Interiores', 'متداخلتان'), formula: 'd < r₁ − r₂' },
        { d: 0, name: say('Zentrokideak', 'Concéntricas', 'متحدتا المركز'), formula: 'd = 0' }
    ]
    return (
        <Figure height={350} label={pick(language, say('Bi zirkunferentziaren sei posizioak', 'Las seis posiciones de dos circunferencias', 'الأوضاع الستة لدائرتين'))}>
            {cases.map((item, index) => {
                const column = index % 3
                const row = Math.floor(index / 3)
                const x = 120 + column * 240
                const y = 60 + row * 172
                const first = x - item.d / 2 - (item.d > 60 ? 8 : 0)
                const second = first + item.d
                return (
                    <g key={index}>
                        <circle cx={first} cy={y} r={big} fill={STAGE_TINT} fillOpacity={0.7} stroke={STAGE} strokeWidth={2.2} />
                        <circle cx={second} cy={y} r={small} fill={SOFT} fillOpacity={0.7} stroke={SECOND} strokeWidth={2.2} />
                        <Dot p={[first, y]} color={STAGE} r={3} />
                        <Dot p={[second, y]} color={SECOND} r={3} />
                        <Caption x={x} y={y + 70} language={language} text={item.name} color={INK} size={14} />
                        <Formula x={x} y={y + 94} size={14} color={MUTED}>{item.formula}</Formula>
                    </g>
                )
            })}
        </Figure>
    )
}

/* ---------- 12. Central and inscribed angles; circular figures ---------- */

export function CircleAnglesFigure({ language }: { language: UnitLanguage }) {
    const cx = 160
    const cy = 135
    const r = 100
    const a = onCircle(cx, cy, r, 220)
    const b = onCircle(cx, cy, r, 320)
    const p = onCircle(cx, cy, r, 95)
    const centre: Point = [cx, cy]
    const minis = [
        { name: say('Sektorea', 'Sector', 'قطاع'), x: 420, y: 70 },
        { name: say('Segmentua', 'Segmento', 'قطعة'), x: 600, y: 70 },
        { name: say('Koroa', 'Corona', 'حلقة'), x: 420, y: 190 },
        { name: say('Trapezio zirkularra', 'Trapecio circular', 'شبه منحرف دائري'), x: 600, y: 190 }
    ]
    const R = 42
    const arc = (x: number, y: number, radius: number, from: number, to: number) => {
        const [sx, sy] = onCircle(x, y, radius, from)
        const [ex, ey] = onCircle(x, y, radius, to)
        return { sx, sy, ex, ey }
    }
    return (
        <Figure height={290} label={pick(language, say('Angelu zentrala eta inskribatua; sektorea, segmentua, koroa eta trapezio zirkularra', 'Ángulo central e inscrito; sector, segmento, corona y trapecio circular', 'الزاوية المركزية والمحيطية؛ القطاع والقطعة والحلقة وشبه المنحرف الدائري'))}>
            <circle cx={cx} cy={cy} r={r} fill={PAPER} stroke={INK} strokeWidth={2.2} />
            <path d={`M${a[0]} ${a[1]} A${r} ${r} 0 0 0 ${b[0]} ${b[1]}`} fill="none" stroke={SECOND} strokeWidth={5} strokeLinecap="round" />
            <polyline points={points([a, centre, b])} fill="none" stroke={STAGE} strokeWidth={2.4} />
            <polyline points={points([a, p, b])} fill="none" stroke={GREEN} strokeWidth={2.4} />
            <Corner v={centre} a={a} b={b} r={24} color={STAGE} label="100°" labelR={44} />
            <Corner v={p} a={a} b={b} r={30} color={GREEN} label="50°" labelR={48} />
            <Dot p={centre} color={STAGE} />
            <Dot p={p} color={GREEN} />
            <Caption x={cx} y={262} language={language} text={say('Inskribatua = zentrala : 2', 'Inscrito = central : 2', 'المحيطية = المركزية : 2')} color={INK} size={14} />

            {minis.map((mini, index) => {
                const { x, y } = mini
                let shape
                if (index === 0) {
                    const { sx, sy, ex, ey } = arc(x, y, R, 20, 110)
                    shape = <><circle cx={x} cy={y} r={R} fill="none" stroke={MUTED} strokeWidth={1.4} /><path d={`M${x} ${y} L${sx} ${sy} A${R} ${R} 0 0 0 ${ex} ${ey} Z`} fill={STAGE_TINT} stroke={STAGE} strokeWidth={2.2} /></>
                } else if (index === 1) {
                    const { sx, sy, ex, ey } = arc(x, y, R, 20, 160)
                    shape = <><circle cx={x} cy={y} r={R} fill="none" stroke={MUTED} strokeWidth={1.4} /><path d={`M${sx} ${sy} A${R} ${R} 0 0 0 ${ex} ${ey} Z`} fill={STAGE_TINT} stroke={STAGE} strokeWidth={2.2} /></>
                } else if (index === 2) {
                    shape = <><circle cx={x} cy={y} r={R} fill={STAGE_TINT} stroke={STAGE} strokeWidth={2.2} /><circle cx={x} cy={y} r={R * 0.55} fill={PAPER} stroke={STAGE} strokeWidth={2.2} /></>
                } else {
                    const outer = arc(x, y, R, 30, 120)
                    const inner = arc(x, y, R * 0.55, 30, 120)
                    shape = (
                        <>
                            <circle cx={x} cy={y} r={R} fill="none" stroke={MUTED} strokeWidth={1.4} />
                            <circle cx={x} cy={y} r={R * 0.55} fill="none" stroke={MUTED} strokeWidth={1.4} />
                            <path d={`M${outer.sx} ${outer.sy} A${R} ${R} 0 0 0 ${outer.ex} ${outer.ey} L${inner.ex} ${inner.ey} A${R * 0.55} ${R * 0.55} 0 0 1 ${inner.sx} ${inner.sy} Z`} fill={STAGE_TINT} stroke={STAGE} strokeWidth={2.2} />
                        </>
                    )
                }
                return (
                    <g key={index}>
                        {shape}
                        <Caption x={x} y={y + 64} language={language} text={mini.name} color={INK} size={14} />
                    </g>
                )
            })}
        </Figure>
    )
}

/* ---------- 13. Compound figures ---------- */

function LShape({ x, language, split }: { x: number; language: UnitLanguage; split: boolean }) {
    const u = 24
    const top = 40
    const outline: Point[] = [[x, top], [x + 6 * u, top], [x + 6 * u, top + 3 * u], [x + 10 * u, top + 3 * u], [x + 10 * u, top + 6 * u], [x, top + 6 * u]]
    return (
        <g>
            {split ? (
                <>
                    <rect x={x} y={top} width={6 * u} height={6 * u} fill={STAGE_TINT} />
                    <rect x={x + 6 * u} y={top + 3 * u} width={4 * u} height={3 * u} fill={SOFT} />
                    <line x1={x + 6 * u} y1={top + 3 * u} x2={x + 6 * u} y2={top + 6 * u} stroke={STAGE} strokeWidth={2} strokeDasharray="6 4" />
                </>
            ) : (
                <>
                    <polygon points={points(outline)} fill={STAGE_TINT} />
                    <rect x={x + 6 * u} y={top} width={4 * u} height={3 * u} fill={SECOND} fillOpacity={0.12} stroke={SECOND} strokeWidth={2} strokeDasharray="6 4" />
                </>
            )}
            <polygon points={points(outline)} fill="none" stroke={INK} strokeWidth={2.4} strokeLinejoin="round" />
            <text x={x + 5 * u} y={top + 6 * u + 22} textAnchor="middle" fontSize={15} fontWeight={700} fill={INK}>10</text>
            <text x={x - 14} y={top + 3 * u + 5} textAnchor="middle" fontSize={15} fontWeight={700} fill={INK}>6</text>
            <text x={x + 8 * u} y={(split ? top + 3 * u : top) - 8} textAnchor="middle" fontSize={15} fontWeight={700} fill={SECOND}>4</text>
            <text x={x + 10 * u + 14} y={top + (split ? 4.5 : 1.5) * u + 5} textAnchor="middle" fontSize={15} fontWeight={700} fill={SECOND}>3</text>
            <Caption x={x + 5 * u} y={262} language={language} text={split ? say('Zatitu eta batu', 'Divide y suma', 'قسّم واجمع') : say('Osatu eta kendu', 'Completa y resta', 'أكمل واطرح')} color={INK} size={14} />
        </g>
    )
}

export function CompositeFigure({ language }: { language: UnitLanguage }) {
    return (
        <Figure height={280} label={pick(language, say('L formako irudiaren azalera bi eratara', 'El área de la figura en L de dos maneras', 'مساحة الشكل L بطريقتين'))}>
            <LShape x={50} language={language} split={false} />
            <Formula x={170} y={232} color={SECOND}>10 · 6 − 4 · 3 = 48</Formula>
            <LShape x={410} language={language} split />
            <Formula x={530} y={232} color={STAGE}>6 · 6 + 4 · 3 = 48</Formula>
        </Figure>
    )
}

/* ---------- 14. Sector, arc and ring ---------- */

export function SectorRingFigure({ language }: { language: UnitLanguage }) {
    const cx = 170
    const cy = 135
    const r = 100
    const start = onCircle(cx, cy, r, 0)
    const end = onCircle(cx, cy, r, 90)
    return (
        <Figure height={300} label={pick(language, say('90°-ko sektorea eta koroa zirkularra', 'Sector de 90° y corona circular', 'قطاع 90° وحلقة دائرية'))}>
            <circle cx={cx} cy={cy} r={r} fill={PAPER} stroke={MUTED} strokeWidth={1.6} strokeDasharray="6 5" />
            <path d={`M${cx} ${cy} L${start[0]} ${start[1]} A${r} ${r} 0 0 0 ${end[0]} ${end[1]} Z`} fill={STAGE_TINT} stroke={STAGE} strokeWidth={2.4} />
            <path d={`M${start[0]} ${start[1]} A${r} ${r} 0 0 0 ${end[0]} ${end[1]}`} fill="none" stroke={SECOND} strokeWidth={5} strokeLinecap="round" />
            <Corner v={[cx, cy]} a={start} b={end} r={20} color={INK} label="90°" labelR={-22} />
            <text x={cx + 50} y={cy + 20} textAnchor="middle" fontSize={15} fontWeight={700} fill={INK}>r = 10</text>
            <Formula x={cx} y={262} size={16} color={STAGE}>{num(language, '314 · 90 : 360 = 78,5')}</Formula>
            <Caption x={cx} y={290} language={language} text={say('Sektorea: zirkuluaren laurdena', 'Sector: un cuarto del círculo', 'القطاع: ربع القرص')} size={14} />

            <circle cx={530} cy={cy} r={100} fill={STAGE_TINT} stroke={STAGE} strokeWidth={2.4} />
            <circle cx={530} cy={cy} r={60} fill={PAPER} stroke={STAGE} strokeWidth={2.4} />
            <line x1={530} y1={cy} x2={630} y2={cy} stroke={SECOND} strokeWidth={2} />
            <line x1={530} y1={cy} x2={530 - 42.4} y2={cy - 42.4} stroke={INK} strokeWidth={2} />
            <text x={590} y={cy - 8} textAnchor="middle" fontSize={15} fontWeight={700} fill={SECOND}>R = 5</text>
            <text x={498} y={cy + 4} textAnchor="middle" fontSize={15} fontWeight={700} fill={INK}>r = 3</text>
            <Formula x={530} y={262} size={16} color={STAGE}>{num(language, '3,14 · (25 − 9) = 50,24')}</Formula>
            <Caption x={530} y={290} language={language} text={say('Koroa: handia ken txikia', 'Corona: el grande menos el pequeño', 'الحلقة: الكبير ناقص الصغير')} size={14} />
        </Figure>
    )
}

/* ---------- 15. The tiled room ---------- */

export function AreaProblemsFigure({ language }: { language: UnitLanguage }) {
    const tile = 22
    const x = 60
    const y = 40
    return (
        <Figure height={290} label={pick(language, say('5 m × 4 m-ko gela, 50 cm-ko lauzekin: 80 lauza', 'Habitación de 5 m × 4 m con baldosas de 50 cm: 80 baldosas', 'غرفة 5 م × 4 م ببلاطات 50 سم: 80 بلاطة'))}>
            {Array.from({ length: 80 }, (_, index) => (
                <rect key={index} x={x + (index % 10) * tile} y={y + Math.floor(index / 10) * tile} width={tile} height={tile} fill={(index + Math.floor(index / 10)) % 2 ? STAGE_TINT : PAPER} stroke={MUTED} strokeWidth={0.8} />
            ))}
            <rect x={x} y={y} width={10 * tile} height={8 * tile} fill="none" stroke={INK} strokeWidth={2.6} />
            <text x={x + 5 * tile} y={y - 10} textAnchor="middle" fontSize={16} fontWeight={700} fill={INK}>5 m</text>
            <text x={x - 10} y={y + 4 * tile + 5} textAnchor="end" fontSize={16} fontWeight={700} fill={INK}>4 m</text>
            <Formula x={x + 5 * tile} y={y + 8 * tile + 30} color={STAGE}>10 · 8 = 80</Formula>
            <Caption x={x + 5 * tile} y={y + 8 * tile + 58} language={language} text={say('Estali: azalera', 'Cubrir: área', 'التغطية: المساحة')} color={STAGE} size={14} />

            <rect x={440} y={70} width={200} height={130} rx={4} fill="#d6eddf" stroke={SECOND} strokeWidth={4} strokeDasharray="10 6" />
            <text x={540} y={58} textAnchor="middle" fontSize={16} fontWeight={700} fill={INK}>20 m</text>
            <text x={655} y={140} textAnchor="start" fontSize={16} fontWeight={700} fill={INK}>15 m</text>
            <Formula x={540} y={236} color={SECOND}>2 · 20 + 2 · 15 = 70</Formula>
            <Caption x={540} y={264} language={language} text={say('Inguratu: perimetroa', 'Rodear: perímetro', 'الإحاطة: المحيط')} color={SECOND} size={14} />
        </Figure>
    )
}

/* ---------- Hero art: polygons, a circle and a tiling ---------- */

export function FiguresHeroArt() {
    const hexes = [0, 120, 240].map((heading) => walk([130, 300], heading, 6, 46))
    const pentagon = regular(390, 110, 70, 5)
    return (
        <div className="fraction-v2-collage" aria-hidden="true">
            <svg viewBox="0 0 520 400" direction="ltr" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                <g transform="translate(40 30) rotate(-5)">
                    <rect width={200} height={170} rx={16} fill={PAPER} stroke={INK} strokeWidth={2} />
                    <circle cx={100} cy={85} r={60} fill="#dde7f7" stroke={INK} strokeWidth={2} />
                    <path d={`M100 85 L160 85 A60 60 0 0 0 100 25 Z`} fill="#2f6fdb" fillOpacity={0.4} stroke={INK} strokeWidth={2} />
                </g>
                <polygon points={points(pentagon)} fill="#fbebc0" stroke={INK} strokeWidth={2.2} strokeLinejoin="round" />
                {[2, 3].map((index) => <line key={index} x1={pentagon[0][0]} y1={pentagon[0][1]} x2={pentagon[index][0]} y2={pentagon[index][1]} stroke="#c4432a" strokeWidth={2.4} />)}
                {hexes.map((hex, index) => <polygon key={index} points={points(hex)} fill={['#d6eddf', '#e8e0f7', '#f6d9d2'][index]} stroke={INK} strokeWidth={2} strokeLinejoin="round" />)}
                <g transform="translate(300 240) rotate(4)">
                    <polygon points="0,120 180,120 60,0" fill={PAPER} stroke={INK} strokeWidth={2.2} strokeLinejoin="round" />
                    <path d="M150 120 A30 30 0 0 0 155.2 106.3" fill="none" stroke="#c4432a" strokeWidth={2.2} />
                </g>
            </svg>
        </div>
    )
}
