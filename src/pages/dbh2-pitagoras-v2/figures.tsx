import { pickText, type LocalizedText, type UnitLanguage } from '../../features/unit-v2/types'
import { Figure } from '../dbh2-zatikiak-prototype/figures'
import { Label } from '../dbh2-funtzioak-v2/plane'

/* ==========================================================================
   Pitagorasen teorema · 2. DBH — lesson figures in the notebook style: the
   squares on the sides, the hypotenuse and the legs, Pythagorean triples,
   classifying triangles, heights and diagonals of plane figures, apothems,
   chords and tangents, the diagonal of a box, distances on a grid and the
   ladder against the wall. Arabic captions carry words only; numbers and
   formulas go in their own left-to-right text.
   ========================================================================== */

const INK = 'var(--ink, #1d2733)'
const MUTED = 'var(--muted, #58616e)'
const STAGE = 'var(--stage, #2f6fdb)'
const STAGE_TINT = 'var(--stage-tint, #dde7f7)'
const SECOND = 'var(--second, #c4432a)'
const GREEN = 'var(--success, #267b53)'
const PAPER = '#fffcf6'
const SOFT = '#fbebc0'
const ROSE = '#f6d9d2'
const MINT = '#d6eddf'

type Point = [number, number]

const say = (eu: string, es: string, ar: string): LocalizedText => ({ eu, es, ar })
const pick = (language: UnitLanguage, text: LocalizedText) => pickText(language, text)
/** A number written with the comma, shown with the point in Arabic */
const num = (language: UnitLanguage, text: string) => (language === 'ar' ? text.replace(/,/g, '.') : text)
const points = (list: Point[]) => list.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ')
const midpoint = ([ax, ay]: Point, [bx, by]: Point): Point => [(ax + bx) / 2, (ay + by) / 2]
/** Triangle with base on the x axis from `left`, given the three side lengths (base = c) and a scale */
const fromSides = (left: Point, base: number, b: number, a: number, scale: number): Point[] => {
    // Third vertex: distance b from the left end and a from the right end
    const x = (base * base + b * b - a * a) / (2 * base)
    const y = Math.sqrt(Math.max(0, b * b - x * x))
    return [left, [left[0] + base * scale, left[1]], [left[0] + x * scale, left[1] - y * scale]]
}

function Caption({ x = 360, y, language, text, color = MUTED, size = 15 }: { x?: number; y: number; language: UnitLanguage; text: LocalizedText; color?: string; size?: number }) {
    return <Label x={x} y={y} textAnchor="middle" fontSize={size} fontWeight={700} fill={color}>{pick(language, text)}</Label>
}

function Formula({ x, y, children, color = INK, size = 17, anchor = 'middle' }: { x: number; y: number; children: string; color?: string; size?: number; anchor?: 'start' | 'middle' | 'end' }) {
    return <text x={x} y={y} textAnchor={anchor} fontSize={size} fontWeight={700} fill={color}>{children}</text>
}

/** The little square of a right angle at v, between the directions to a and b */
function RightMark({ v, a, b, size = 14, color = INK }: { v: Point; a: Point; b: Point; size?: number; color?: string }) {
    const unit = (p: Point): Point => {
        const length = Math.hypot(p[0] - v[0], p[1] - v[1])
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
function SideLabel({ a, b, text, color = INK, offset = 16, size = 16 }: { a: Point; b: Point; text: string; color?: string; offset?: number; size?: number }) {
    const [mx, my] = midpoint(a, b)
    const length = Math.hypot(b[0] - a[0], b[1] - a[1])
    const nx = (b[1] - a[1]) / length
    const ny = -(b[0] - a[0]) / length
    return <text x={mx + nx * offset} y={my + ny * offset + size * 0.35} textAnchor="middle" fontSize={size} fontWeight={700} fill={color}>{text}</text>
}

function Dot({ p, color = SECOND, r = 4.5 }: { p: Point; color?: string; r?: number }) {
    return <circle cx={p[0]} cy={p[1]} r={r} fill={color} />
}

/** A square of side ab drawn on the side away from the point `away`, with an n × n grid */
function SideSquare({ a, b, away, n, fill, label, sub }: { a: Point; b: Point; away: Point; n: number; fill: string; label: string; sub?: string }) {
    let dx = -(b[1] - a[1])
    let dy = b[0] - a[0]
    const [mx, my] = midpoint(a, b)
    if ((away[0] - mx) * dx + (away[1] - my) * dy > 0) {
        dx = -dx
        dy = -dy
    }
    const c: Point = [b[0] + dx, b[1] + dy]
    const d: Point = [a[0] + dx, a[1] + dy]
    const lines = Array.from({ length: n - 1 }, (_, index) => (index + 1) / n)
    const at = (p: Point, q: Point, t: number): Point => [p[0] + (q[0] - p[0]) * t, p[1] + (q[1] - p[1]) * t]
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
                        <line x1={p1[0]} y1={p1[1]} x2={p2[0]} y2={p2[1]} stroke={MUTED} strokeWidth={0.8} strokeOpacity={0.6} />
                        <line x1={q1[0]} y1={q1[1]} x2={q2[0]} y2={q2[1]} stroke={MUTED} strokeWidth={0.8} strokeOpacity={0.6} />
                    </g>
                )
            })}
            <circle cx={centre[0]} cy={centre[1]} r={17} fill={PAPER} stroke={INK} strokeWidth={1.4} />
            <text x={centre[0]} y={centre[1] + 6} textAnchor="middle" fontSize={16} fontWeight={800} fill={INK}>{label}</text>
            {sub && <text x={centre[0]} y={centre[1] + 36} textAnchor="middle" fontSize={15} fontWeight={700} fill={SECOND}>{sub}</text>}
        </g>
    )
}

/* ---------- 1. The squares on the sides ---------- */

export function SquaresFigure({ language }: { language: UnitLanguage }) {
    const u = 26
    const c: Point = [190, 200]
    const a: Point = [190 + 4 * u, 200]
    const b: Point = [190, 200 - 3 * u]
    return (
        <Figure height={340} label={pick(language, say('3, 4 eta 5 aldeko triangeluaren aldeetako karratuak: 9 + 16 = 25', 'Los cuadrados sobre los lados del triángulo de lados 3, 4 y 5: 9 + 16 = 25', 'المربعات على أضلاع المثلث 3 و4 و5: 9 + 16 = 25'))}>
            <SideSquare a={c} b={a} away={b} n={4} fill={STAGE_TINT} label="16" sub="4²" />
            <SideSquare a={b} b={c} away={a} n={3} fill={SOFT} label="9" sub="3²" />
            <SideSquare a={a} b={b} away={c} n={5} fill={ROSE} label="25" sub="5²" />
            <polygon points={points([a, b, c])} fill={PAPER} stroke={INK} strokeWidth={2.6} strokeLinejoin="round" />
            <RightMark v={c} a={a} b={b} />

            <Formula x={560} y={120} size={24} color={STAGE}>9 + 16 = 25</Formula>
            <Formula x={560} y={162} size={24} color={SECOND}>3² + 4² = 5²</Formula>
            <Caption x={560} y={210} language={language} text={say('Karratu handia =', 'Cuadrado grande =', 'المربع الكبير =')} color={INK} size={15} />
            <Caption x={560} y={234} language={language} text={say('beste bien batura', 'suma de los otros dos', 'مجموع المربعين الآخرين')} color={INK} size={15} />
        </Figure>
    )
}

/* ---------- 2. Hypotenuse and legs ---------- */

export function FormulaFigure({ language }: { language: UnitLanguage }) {
    const c: Point = [90, 230]
    const a: Point = [370, 230]
    const b: Point = [90, 50]
    return (
        <Figure height={290} label={pick(language, say('Triangelu angeluzuzena: a hipotenusa, b eta c katetoak', 'Triángulo rectángulo: a es la hipotenusa, b y c los catetos', 'مثلث قائم: a الوتر، وb وc الضلعان القائمان'))}>
            <polygon points={points([a, b, c])} fill={STAGE_TINT} stroke={INK} strokeWidth={2.4} strokeLinejoin="round" />
            <line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={SECOND} strokeWidth={5} strokeLinecap="round" />
            <RightMark v={c} a={a} b={b} size={18} />
            <SideLabel a={c} b={a} text="b" offset={-18} size={20} />
            <SideLabel a={b} b={c} text="c" offset={-16} size={20} />
            <SideLabel a={a} b={b} text="a" offset={-18} size={22} color={SECOND} />
            <Caption x={230} y={272} language={language} text={say('Hipotenusa: angelu zuzenaren aurrean', 'Hipotenusa: frente al ángulo recto', 'الوتر: يقابل الزاوية القائمة')} color={SECOND} size={14} />

            <Formula x={560} y={92} size={24} color={SECOND}>a² = b² + c²</Formula>
            <Formula x={560} y={150} size={21} color={STAGE}>b² = a² − c²</Formula>
            <Formula x={560} y={196} size={21} color={STAGE}>c² = a² − b²</Formula>
            <Caption x={560} y={242} language={language} text={say('Hipotenusa: batu. Katetoa: kendu.', 'Hipotenusa: suma. Cateto: resta.', 'الوتر: اجمع. الضلع القائم: اطرح.')} color={INK} size={14} />
        </Figure>
    )
}

/* ---------- 3. Pythagorean triples ---------- */

export function TriplesFigure({ language }: { language: UnitLanguage }) {
    const u = 18
    const shapes: Array<{ x: number; legs: [number, number]; hyp: number; check: string; fill: string }> = [
        { x: 40, legs: [4, 3], hyp: 5, check: '9 + 16 = 25', fill: SOFT },
        { x: 190, legs: [8, 6], hyp: 10, check: '36 + 64 = 100', fill: STAGE_TINT },
        { x: 430, legs: [12, 5], hyp: 13, check: '25 + 144 = 169', fill: MINT }
    ]
    const base = 165
    return (
        <Figure height={252} label={pick(language, say('Hirukote pitagorikoak: 3-4-5, haren bikoitza 6-8-10, eta 5-12-13', 'Ternas pitagóricas: 3-4-5, su doble 6-8-10 y 5-12-13', 'الثلاثيات الفيثاغورية: 3-4-5 وضعفها 6-8-10 و5-12-13'))}>
            {shapes.map((shape) => {
                const c: Point = [shape.x, base]
                const a: Point = [shape.x + shape.legs[0] * u, base]
                const b: Point = [shape.x, base - shape.legs[1] * u]
                const centre = shape.x + (shape.legs[0] * u) / 2
                return (
                    <g key={shape.hyp}>
                        <polygon points={points([a, b, c])} fill={shape.fill} stroke={INK} strokeWidth={2.2} strokeLinejoin="round" />
                        <RightMark v={c} a={a} b={b} size={11} />
                        <SideLabel a={c} b={a} text={String(shape.legs[0])} offset={-14} size={15} />
                        <SideLabel a={b} b={c} text={String(shape.legs[1])} offset={-12} size={15} />
                        <SideLabel a={a} b={b} text={String(shape.hyp)} offset={-14} size={15} color={SECOND} />
                        <Formula x={centre} y={base + 44} size={15} color={STAGE}>{shape.check}</Formula>
                    </g>
                )
            })}
            <Formula x={150} y={100} size={22} color={MUTED}>· 2 →</Formula>
            <Caption y={240} language={language} text={say('Hirukote bat bider edozein zenbaki: beste hirukote bat', 'Una terna por cualquier número: otra terna', 'ثلاثية مضروبة في أي عدد: ثلاثية أخرى')} size={14} />
        </Figure>
    )
}

/* ---------- 4. Finding the hypotenuse ---------- */

export function HypotenuseFigure({ language }: { language: UnitLanguage }) {
    const u = 26
    const c: Point = [50, 240]
    const a: Point = [50 + 8 * u, 240]
    const b: Point = [50, 240 - 6 * u]
    const c2: Point = [440, 240]
    const a2: Point = [440 + 5 * 36, 240]
    const b2: Point = [440, 240 - 3 * 36]
    return (
        <Figure height={320} label={pick(language, say('Hipotenusa: katetoen karratuak batu eta erro karratua atera', 'La hipotenusa: suma los cuadrados de los catetos y saca la raíz', 'الوتر: اجمع مربعي الضلعين القائمين ثم خذ الجذر'))}>
            <polygon points={points([a, b, c])} fill={STAGE_TINT} stroke={INK} strokeWidth={2.4} strokeLinejoin="round" />
            <RightMark v={c} a={a} b={b} />
            <SideLabel a={c} b={a} text="8" offset={-16} />
            <SideLabel a={b} b={c} text="6" offset={-14} />
            <SideLabel a={a} b={b} text="?" offset={-16} color={SECOND} size={20} />
            <Formula x={285} y={80} anchor="start" color={STAGE}>6² + 8² = 100</Formula>
            <Formula x={285} y={110} anchor="start" color={SECOND}>√100 = 10</Formula>

            <polygon points={points([a2, b2, c2])} fill={SOFT} stroke={INK} strokeWidth={2.4} strokeLinejoin="round" />
            <RightMark v={c2} a={a2} b={b2} />
            <SideLabel a={c2} b={a2} text="5" offset={-16} />
            <SideLabel a={b2} b={c2} text="3" offset={-14} />
            <SideLabel a={a2} b={b2} text="?" offset={-16} color={SECOND} size={20} />
            <Formula x={530} y={80} color={STAGE}>3² + 5² = 34</Formula>
            <Formula x={530} y={110} color={SECOND}>{num(language, '√34 ≈ 5,83')}</Formula>

            <Caption x={154} y={300} language={language} text={say('Zehatza', 'Exacta', 'دقيقة')} color={INK} size={14} />
            <Caption x={530} y={300} language={language} text={say('Hurbildua', 'Aproximada', 'تقريبية')} color={INK} size={14} />
        </Figure>
    )
}

/* ---------- 5. Finding a leg ---------- */

export function LegFigure({ language }: { language: UnitLanguage }) {
    const u = 21
    const c: Point = [50, 220]
    const a: Point = [50 + 12 * u, 220]
    const b: Point = [50, 220 - 5 * u]
    return (
        <Figure height={290} label={pick(language, say('Katetoa: hipotenusaren karratuari beste katetoarena kendu', 'Un cateto: al cuadrado de la hipotenusa réstale el del otro cateto', 'الضلع القائم: اطرح مربع الضلع الآخر من مربع الوتر'))}>
            <polygon points={points([a, b, c])} fill={MINT} stroke={INK} strokeWidth={2.4} strokeLinejoin="round" />
            <RightMark v={c} a={a} b={b} />
            <SideLabel a={c} b={a} text="?" offset={-18} color={SECOND} size={20} />
            <SideLabel a={b} b={c} text="5" offset={-14} />
            <SideLabel a={a} b={b} text="13" offset={-16} color={STAGE} />

            <Formula x={520} y={78} size={21} color={STAGE}>13² − 5² = 169 − 25 = 144</Formula>
            <Formula x={520} y={118} size={21} color={GREEN}>√144 = 12  ✓</Formula>
            <Formula x={520} y={182} size={18} color={SECOND}>13² + 5² = 194  ✗</Formula>
            <Caption x={520} y={214} language={language} text={say('Katetoa hipotenusa baino txikiagoa da', 'El cateto es menor que la hipotenusa', 'الضلع القائم أصغر من الوتر')} color={SECOND} size={14} />
            <Caption x={176} y={274} language={language} text={say('Ezaguna: hipotenusa eta katetoa', 'Conocidos: hipotenusa y un cateto', 'المعلوم: الوتر وضلع قائم')} size={14} />
        </Figure>
    )
}

/* ---------- 6. Acute, right or obtuse ---------- */

export function ClassifyFigure({ language }: { language: UnitLanguage }) {
    const kinds = [
        { x: 15, sides: [7, 5, 6], check: '49 < 25 + 36', name: say('Angelu-zorrotza', 'Acutángulo', 'حاد الزوايا'), color: STAGE, fill: STAGE_TINT },
        { x: 225, sides: [10, 6, 8], check: '100 = 36 + 64', name: say('Angeluzuzena', 'Rectángulo', 'قائم الزاوية'), color: GREEN, fill: MINT },
        { x: 495, sides: [8, 4, 5], check: '64 > 16 + 25', name: say('Angelu-kamutsa', 'Obtusángulo', 'منفرج الزاوية'), color: SECOND, fill: ROSE }
    ]
    return (
        <Figure height={290} label={pick(language, say('Alde handienaren karratua beste bien karratuen baturarekin konparatu', 'Compara el cuadrado del lado mayor con la suma de los cuadrados de los otros dos', 'قارن مربع الضلع الأكبر بمجموع مربعي الضلعين الآخرين'))}>
            {kinds.map((kind) => {
                const [big, b, a] = kind.sides
                const [p, q, r] = fromSides([kind.x + 10, 190], big, b, a, 24)
                return (
                    <g key={big}>
                        <polygon points={points([p, q, r])} fill={kind.fill} stroke={INK} strokeWidth={2.2} strokeLinejoin="round" />
                        <line x1={p[0]} y1={p[1]} x2={q[0]} y2={q[1]} stroke={kind.color} strokeWidth={4.5} strokeLinecap="round" />
                        {big === 10 && <RightMark v={r} a={p} b={q} size={12} />}
                        <SideLabel a={p} b={q} text={String(big)} offset={-16} color={kind.color} />
                        <SideLabel a={r} b={p} text={String(b)} offset={-13} size={14} />
                        <SideLabel a={q} b={r} text={String(a)} offset={-13} size={14} />
                        <Formula x={kind.x + 10 + (big * 24) / 2} y={240} size={16} color={kind.color}>{kind.check}</Formula>
                        <Caption x={kind.x + 10 + (big * 24) / 2} y={270} language={language} text={kind.name} color={kind.color} size={15} />
                    </g>
                )
            })}
        </Figure>
    )
}

/* ---------- 7. Heights of isosceles and equilateral triangles ---------- */

export function IsoscelesHeightFigure({ language }: { language: UnitLanguage }) {
    const s = 12
    const left: Point = [60, 220]
    const right: Point = [60 + 10 * s, 220]
    const top: Point = [60 + 5 * s, 220 - 12 * s]
    const foot: Point = [60 + 5 * s, 220]
    const e = 3.6
    const eLeft: Point = [420, 220]
    const eRight: Point = [420 + 40 * e, 220]
    const eTop: Point = [420 + 20 * e, 220 - 34.64 * e]
    const eFoot: Point = [420 + 20 * e, 220]
    return (
        <Figure height={300} label={pick(language, say('Altuerak oinarria erdibitzen du eta bi triangelu angeluzuzen sortzen ditu', 'La altura parte la base por la mitad y forma dos triángulos rectángulos', 'الارتفاع ينصّف القاعدة ويكوّن مثلثين قائمين'))}>
            <polygon points={points([left, right, top])} fill={STAGE_TINT} stroke={INK} strokeWidth={2.4} strokeLinejoin="round" />
            <polygon points={points([foot, right, top])} fill={SOFT} stroke="none" />
            <polygon points={points([left, right, top])} fill="none" stroke={INK} strokeWidth={2.4} strokeLinejoin="round" />
            <line x1={top[0]} y1={top[1]} x2={foot[0]} y2={foot[1]} stroke={SECOND} strokeWidth={3} strokeDasharray="7 4" />
            <RightMark v={foot} a={right} b={top} size={11} />
            <SideLabel a={left} b={top} text="13" offset={16} />
            <SideLabel a={top} b={right} text="13" offset={16} />
            <SideLabel a={foot} b={right} text="5" offset={-16} size={15} />
            <text x={foot[0] - 14} y={150} textAnchor="middle" fontSize={17} fontWeight={700} fill={SECOND}>h</text>
            <Formula x={240} y={120} anchor="start" color={SECOND}>13² − 5² = 144</Formula>
            <Formula x={240} y={150} anchor="start" color={SECOND}>h = 12</Formula>

            <polygon points={points([eLeft, eRight, eTop])} fill={MINT} stroke={INK} strokeWidth={2.4} strokeLinejoin="round" />
            <line x1={eTop[0]} y1={eTop[1]} x2={eFoot[0]} y2={eFoot[1]} stroke={SECOND} strokeWidth={3} strokeDasharray="7 4" />
            <RightMark v={eFoot} a={eRight} b={eTop} size={11} />
            <SideLabel a={eTop} b={eRight} text="40" offset={16} />
            <SideLabel a={eFoot} b={eRight} text="20" offset={-16} size={15} />
            <text x={eFoot[0] - 14} y={150} textAnchor="middle" fontSize={17} fontWeight={700} fill={SECOND}>h</text>
            <Formula x={620} y={120} anchor="start" size={15} color={SECOND}>40² − 20²</Formula>
            <Formula x={620} y={146} anchor="start" size={15} color={SECOND}>{num(language, 'h ≈ 34,64')}</Formula>

            <Caption x={120} y={272} language={language} text={say('Isoszelea', 'Isósceles', 'متساوي الساقين')} color={INK} size={14} />
            <Caption x={492} y={272} language={language} text={say('Aldeberdina', 'Equilátero', 'متساوي الأضلاع')} color={INK} size={14} />
        </Figure>
    )
}

/* ---------- 8. Rectangle diagonal and rhombus side ---------- */

export function RectangleRhombusFigure({ language }: { language: UnitLanguage }) {
    const s = 16
    const x = 50
    const y = 80
    const k = 10.5
    const rc: Point = [540, 140]
    const top: Point = [rc[0], 140 - 5 * k]
    const bottom: Point = [rc[0], 140 + 5 * k]
    const leftTip: Point = [rc[0] - 12 * k, 140]
    const rightTip: Point = [rc[0] + 12 * k, 140]
    return (
        <Figure height={300} label={pick(language, say('Laukizuzenaren diagonala eta erronboaren aldea, biak 5-12-13 triangeluarekin', 'La diagonal del rectángulo y el lado del rombo, los dos con el triángulo 5-12-13', 'قطر المستطيل وضلع المعيّن، كلاهما بالمثلث 5-12-13'))}>
            <rect x={x} y={y} width={12 * s} height={5 * s} fill={STAGE_TINT} stroke={INK} strokeWidth={2.4} />
            <polygon points={points([[x, y + 5 * s], [x + 12 * s, y + 5 * s], [x + 12 * s, y]])} fill={SOFT} />
            <rect x={x} y={y} width={12 * s} height={5 * s} fill="none" stroke={INK} strokeWidth={2.4} />
            <line x1={x} y1={y + 5 * s} x2={x + 12 * s} y2={y} stroke={SECOND} strokeWidth={3.5} />
            <RightMark v={[x + 12 * s, y + 5 * s]} a={[x, y + 5 * s]} b={[x + 12 * s, y]} size={11} />
            <text x={x + 6 * s} y={y + 5 * s + 24} textAnchor="middle" fontSize={16} fontWeight={700} fill={INK}>12</text>
            <text x={x + 12 * s + 16} y={y + 2.5 * s + 6} textAnchor="middle" fontSize={16} fontWeight={700} fill={INK}>5</text>
            <text x={x + 6 * s - 12} y={y + 2.5 * s - 8} textAnchor="middle" fontSize={17} fontWeight={700} fill={SECOND}>d</text>
            <Formula x={x + 6 * s} y={228} color={SECOND}>d = √(12² + 5²) = 13</Formula>
            <Caption x={x + 6 * s} y={272} language={language} text={say('Laukizuzenaren diagonala', 'Diagonal del rectángulo', 'قطر المستطيل')} color={INK} size={14} />

            <polygon points={points([leftTip, top, rightTip, bottom])} fill={MINT} stroke={INK} strokeWidth={2.4} strokeLinejoin="round" />
            <polygon points={points([rc, rightTip, top])} fill={SOFT} />
            <polygon points={points([leftTip, top, rightTip, bottom])} fill="none" stroke={INK} strokeWidth={2.4} strokeLinejoin="round" />
            <line x1={leftTip[0]} y1={140} x2={rightTip[0]} y2={140} stroke={STAGE} strokeWidth={1.8} strokeDasharray="6 4" />
            <line x1={rc[0]} y1={top[1]} x2={rc[0]} y2={bottom[1]} stroke={STAGE} strokeWidth={1.8} strokeDasharray="6 4" />
            <line x1={top[0]} y1={top[1]} x2={rightTip[0]} y2={rightTip[1]} stroke={SECOND} strokeWidth={3.5} />
            <RightMark v={rc} a={rightTip} b={top} size={10} />
            <text x={rc[0] + 6 * k} y={158} textAnchor="middle" fontSize={15} fontWeight={700} fill={INK}>12</text>
            <text x={rc[0] - 10} y={122} textAnchor="middle" fontSize={15} fontWeight={700} fill={INK}>5</text>
            <SideLabel a={top} b={rightTip} text="l" offset={16} color={SECOND} size={17} />
            <Formula x={rc[0]} y={238} color={SECOND}>l = √(12² + 5²) = 13</Formula>
            <Caption x={rc[0]} y={272} language={language} text={say('Diagonal-erdiak: 12 eta 5', 'Semidiagonales: 12 y 5', 'نصفا القطرين: 12 و5')} color={INK} size={14} />
        </Figure>
    )
}

/* ---------- 9. Heights of trapezoids ---------- */

export function TrapezoidFigure({ language }: { language: UnitLanguage }) {
    const s = 12
    const base = 200
    const a: Point = [50, base]
    const b: Point = [50 + 19 * s, base]
    const c: Point = [50 + 13 * s, base - 8 * s]
    const d: Point = [50, base - 8 * s]
    const foot: Point = [c[0], base]
    const k = 10
    const p: Point = [400, base]
    const q: Point = [400 + 22 * k, base]
    const r: Point = [400 + 16 * k, base - 8 * k]
    const t: Point = [400 + 6 * k, base - 8 * k]
    const qFoot: Point = [r[0], base]
    return (
        <Figure height={290} label={pick(language, say('Trapezioaren altuera: oinarrien kendura eta alde zeiharra', 'La altura del trapecio: la diferencia de las bases y el lado oblicuo', 'ارتفاع شبه المنحرف: فرق القاعدتين والضلع المائل'))}>
            <polygon points={points([a, b, c, d])} fill={STAGE_TINT} stroke={INK} strokeWidth={2.4} strokeLinejoin="round" />
            <polygon points={points([foot, b, c])} fill={SOFT} />
            <polygon points={points([a, b, c, d])} fill="none" stroke={INK} strokeWidth={2.4} strokeLinejoin="round" />
            <line x1={c[0]} y1={c[1]} x2={foot[0]} y2={foot[1]} stroke={SECOND} strokeWidth={3} strokeDasharray="7 4" />
            <RightMark v={foot} a={b} b={c} size={10} />
            <SideLabel a={d} b={c} text="13" offset={14} />
            <SideLabel a={a} b={b} text="19" offset={-30} />
            <SideLabel a={foot} b={b} text="6" offset={-16} size={14} color={STAGE} />
            <SideLabel a={c} b={b} text="10" offset={14} />
            <text x={foot[0] - 12} y={base - 4 * s + 6} textAnchor="middle" fontSize={17} fontWeight={700} fill={SECOND}>h</text>
            <Formula x={50 + 9.5 * s} y={258} color={SECOND}>h = √(10² − 6²) = 8</Formula>

            <polygon points={points([p, q, r, t])} fill={MINT} stroke={INK} strokeWidth={2.4} strokeLinejoin="round" />
            <polygon points={points([qFoot, q, r])} fill={SOFT} />
            <polygon points={points([p, q, r, t])} fill="none" stroke={INK} strokeWidth={2.4} strokeLinejoin="round" />
            <line x1={r[0]} y1={r[1]} x2={qFoot[0]} y2={qFoot[1]} stroke={SECOND} strokeWidth={3} strokeDasharray="7 4" />
            <RightMark v={qFoot} a={q} b={r} size={10} />
            <SideLabel a={t} b={r} text="10" offset={14} />
            <SideLabel a={p} b={q} text="22" offset={-30} />
            <SideLabel a={qFoot} b={q} text="6" offset={-16} size={14} color={STAGE} />
            <SideLabel a={r} b={q} text="10" offset={14} />
            <text x={qFoot[0] - 12} y={base - 4 * k + 6} textAnchor="middle" fontSize={17} fontWeight={700} fill={SECOND}>h</text>
            <Formula x={510} y={258} color={STAGE}>(22 − 10) : 2 = 6</Formula>
            <Caption x={510} y={284} language={language} text={say('Isoszelea: kendura zati bi', 'Isósceles: la diferencia entre dos', 'متساوي الساقين: الفرق على اثنين')} size={13} />
            <Caption x={50 + 9.5 * s} y={284} language={language} text={say('Angeluzuzena: oinarrien kendura', 'Rectángulo: la diferencia de las bases', 'القائم: فرق القاعدتين')} size={13} />
        </Figure>
    )
}

/* ---------- 10. The apothem of a regular polygon ---------- */

export function ApothemFigure({ language }: { language: UnitLanguage }) {
    const cx = 170
    const cy = 145
    const r = 110
    const hexagon: Point[] = Array.from({ length: 6 }, (_, index) => [cx + r * Math.cos(((index * 60) * Math.PI) / 180), cy + r * Math.sin(((index * 60) * Math.PI) / 180)])
    const v0 = hexagon[1]
    const v1 = hexagon[2]
    const foot = midpoint(v0, v1)
    const centre: Point = [cx, cy]
    return (
        <Figure height={300} label={pick(language, say('Hexagono erregularraren apotema: erradioa hipotenusa, alde-erdia katetoa', 'La apotema del hexágono regular: el radio es la hipotenusa y medio lado un cateto', 'عامد المسدس المنتظم: نصف القطر وتر ونصف الضلع ضلع قائم'))}>
            <polygon points={points(hexagon)} fill={STAGE_TINT} stroke={INK} strokeWidth={2.4} strokeLinejoin="round" />
            <polygon points={points([centre, foot, v1])} fill={SOFT} stroke={INK} strokeWidth={1.6} />
            <line x1={cx} y1={cy} x2={v1[0]} y2={v1[1]} stroke={STAGE} strokeWidth={3} />
            <line x1={cx} y1={cy} x2={foot[0]} y2={foot[1]} stroke={SECOND} strokeWidth={3.5} />
            <RightMark v={foot} a={centre} b={v1} size={10} />
            <Dot p={centre} color={INK} r={3.5} />
            <SideLabel a={centre} b={v1} text="10" offset={-16} color={STAGE} />
            <SideLabel a={foot} b={v1} text="5" offset={-14} size={15} />
            <text x={cx + 14} y={cy + 60} textAnchor="middle" fontSize={17} fontWeight={700} fill={SECOND}>ap</text>
            <SideLabel a={hexagon[4]} b={hexagon[5]} text="10" offset={16} />

            <Formula x={530} y={86} size={20} color={SECOND}>{num(language, 'ap = √(10² − 5²) ≈ 8,66')}</Formula>
            <Formula x={530} y={136} size={18} color={STAGE}>{num(language, 'A = 60 · 8,66 : 2 = 259,8')}</Formula>
            <Caption x={530} y={186} language={language} text={say('Hexagonoan, aldea = erradioa', 'En el hexágono, lado = radio', 'في المسدس: الضلع = نصف القطر')} color={INK} size={14} />
            <Caption x={530} y={212} language={language} text={say('Azalera = perimetroa · apotema : 2', 'Área = perímetro · apotema : 2', 'المساحة = المحيط · العامد : 2')} size={14} />
        </Figure>
    )
}

/* ---------- 11. Chords ---------- */

export function ChordFigure({ language }: { language: UnitLanguage }) {
    const cx = 190
    const cy = 135
    const s = 11
    const r = 10 * s
    const lineY = cy + 6 * s
    const left: Point = [cx - 8 * s, lineY]
    const right: Point = [cx + 8 * s, lineY]
    const foot: Point = [cx, lineY]
    return (
        <Figure height={290} label={pick(language, say('Korda: erradioa hipotenusa, zentrorako distantzia eta korda-erdia katetoak', 'Cuerda: el radio es la hipotenusa; la distancia al centro y media cuerda, los catetos', 'الوتر في الدائرة: نصف القطر وتر المثلث، والبعد عن المركز ونصف الوتر ضلعاه'))}>
            <circle cx={cx} cy={cy} r={r} fill={PAPER} stroke={INK} strokeWidth={2.4} />
            <line x1={cx - 140} y1={lineY} x2={cx + 140} y2={lineY} stroke={MUTED} strokeWidth={1.6} />
            <polygon points={points([[cx, cy], foot, right])} fill={SOFT} stroke="none" />
            <line x1={left[0]} y1={lineY} x2={right[0]} y2={lineY} stroke={STAGE} strokeWidth={4.5} strokeLinecap="round" />
            <line x1={cx} y1={cy} x2={right[0]} y2={right[1]} stroke={SECOND} strokeWidth={3} />
            <line x1={cx} y1={cy} x2={foot[0]} y2={foot[1]} stroke={INK} strokeWidth={2} strokeDasharray="6 4" />
            <RightMark v={foot} a={right} b={[cx, cy]} size={10} />
            <Dot p={[cx, cy]} color={INK} r={3.5} />
            <SideLabel a={[cx, cy]} b={right} text="10" offset={16} color={SECOND} />
            <text x={cx - 14} y={cy + 3 * s + 6} textAnchor="middle" fontSize={16} fontWeight={700} fill={INK}>6</text>
            <SideLabel a={foot} b={right} text="8" offset={-16} size={15} color={STAGE} />

            <Formula x={530} y={96} size={20} color={STAGE}>√(10² − 6²) = 8</Formula>
            <Formula x={530} y={140} size={20} color={STAGE}>2 · 8 = 16</Formula>
            <Caption x={530} y={190} language={language} text={say('Zentrotik kordarako perpendikularrak', 'La perpendicular desde el centro', 'العمود النازل من المركز')} color={INK} size={14} />
            <Caption x={530} y={214} language={language} text={say('korda erdibitzen du', 'parte la cuerda por la mitad', 'ينصّف الوتر')} color={INK} size={14} />
        </Figure>
    )
}

/* ---------- 12. Tangent segments ---------- */

export function TangentFigure({ language }: { language: UnitLanguage }) {
    const s = 17
    const o: Point = [120, 150]
    const r = 5 * s
    const p: Point = [120 + 13 * s, 150]
    // Tangent point: angle at O with cos = r / OP = 5/13
    const cos = 5 / 13
    const sin = 12 / 13
    const t: Point = [o[0] + r * cos, o[1] - r * sin]
    return (
        <Figure height={290} label={pick(language, say('Ukitzailea erradioarekiko perpendikularra da: OP hipotenusa da', 'La tangente es perpendicular al radio: OP es la hipotenusa', 'المماس عمودي على نصف القطر: OP هو الوتر'))}>
            <circle cx={o[0]} cy={o[1]} r={r} fill={STAGE_TINT} stroke={INK} strokeWidth={2.4} />
            <polygon points={points([o, t, p])} fill={SOFT} fillOpacity={0.85} stroke="none" />
            <line x1={o[0]} y1={o[1]} x2={t[0]} y2={t[1]} stroke={STAGE} strokeWidth={3} />
            <line x1={t[0]} y1={t[1]} x2={p[0]} y2={p[1]} stroke={SECOND} strokeWidth={3.5} />
            <line x1={o[0]} y1={o[1]} x2={p[0]} y2={p[1]} stroke={INK} strokeWidth={2.2} />
            <RightMark v={t} a={o} b={p} size={11} />
            <Dot p={o} color={INK} r={3.5} />
            <Dot p={p} color={SECOND} />
            <Dot p={t} color={STAGE} r={4} />
            <text x={o[0] - 14} y={o[1] + 6} textAnchor="middle" fontSize={16} fontWeight={700} fill={INK}>O</text>
            <text x={p[0] + 14} y={p[1] + 6} textAnchor="middle" fontSize={16} fontWeight={700} fill={SECOND}>P</text>
            <text x={t[0] - 4} y={t[1] - 12} textAnchor="middle" fontSize={16} fontWeight={700} fill={STAGE}>T</text>
            <SideLabel a={o} b={t} text="5" offset={14} color={STAGE} />
            <SideLabel a={t} b={p} text="12" offset={14} color={SECOND} />
            <SideLabel a={o} b={p} text="13" offset={-18} />

            <Formula x={570} y={96} size={20} color={INK}>OP² = r² + PT²</Formula>
            <Formula x={570} y={140} size={20} color={STAGE}>√(5² + 12²) = 13</Formula>
            <Caption x={570} y={190} language={language} text={say('Angelu zuzena T puntuan', 'Ángulo recto en T', 'زاوية قائمة عند T')} color={INK} size={14} />
        </Figure>
    )
}

/* ---------- 13. The diagonal of a box ---------- */

export function BoxDiagonalFigure({ language }: { language: UnitLanguage }) {
    // Oblique projection: depth goes up-right at half scale
    const s = 21
    const origin: Point = [40, 250]
    const project = (x: number, y: number, z: number): Point => [origin[0] + x * s + z * s * 0.7, origin[1] - y * s - z * s * 0.6]
    const length = 12
    const width = 4
    const height = 3
    const corners = {
        a: project(0, 0, 0),
        b: project(length, 0, 0),
        c: project(length, 0, width),
        d: project(0, 0, width),
        e: project(0, height, 0),
        f: project(length, height, 0),
        g: project(length, height, width),
        h: project(0, height, width)
    }
    const { a, b, c, d, e, f, g, h } = corners
    return (
        <Figure height={300} label={pick(language, say('Ortoedroaren diagonala: lehenik oinarriaren diagonala, gero diagonal handia', 'La diagonal del ortoedro: primero la diagonal de la base y luego la del espacio', 'قطر متوازي المستطيلات: أولًا قطر القاعدة ثم القطر الفراغي'))}>
            <polygon points={points([a, b, c, d])} fill={STAGE_TINT} stroke="none" />
            <line x1={d[0]} y1={d[1]} x2={a[0]} y2={a[1]} stroke={MUTED} strokeWidth={1.6} strokeDasharray="5 4" />
            <line x1={d[0]} y1={d[1]} x2={c[0]} y2={c[1]} stroke={MUTED} strokeWidth={1.6} strokeDasharray="5 4" />
            <line x1={d[0]} y1={d[1]} x2={h[0]} y2={h[1]} stroke={MUTED} strokeWidth={1.6} strokeDasharray="5 4" />
            <polygon points={points([a, b, f, e])} fill={PAPER} fillOpacity={0.4} stroke={INK} strokeWidth={2.2} strokeLinejoin="round" />
            <polygon points={points([b, c, g, f])} fill={SOFT} fillOpacity={0.5} stroke={INK} strokeWidth={2.2} strokeLinejoin="round" />
            <polygon points={points([e, f, g, h])} fill={MINT} fillOpacity={0.6} stroke={INK} strokeWidth={2.2} strokeLinejoin="round" />
            <line x1={a[0]} y1={a[1]} x2={c[0]} y2={c[1]} stroke={STAGE} strokeWidth={3} />
            <line x1={a[0]} y1={a[1]} x2={g[0]} y2={g[1]} stroke={SECOND} strokeWidth={3.5} />
            <SideLabel a={a} b={b} text="12" offset={-18} />
            <SideLabel a={b} b={c} text="4" offset={-14} size={15} />
            <SideLabel a={c} b={g} text="3" offset={-14} size={15} />
            <text x={(a[0] + c[0]) / 2 + 20} y={(a[1] + c[1]) / 2 + 22} textAnchor="middle" fontSize={16} fontWeight={700} fill={STAGE}>d</text>
            <text x={(a[0] + g[0]) / 2 - 8} y={(a[1] + g[1]) / 2 - 12} textAnchor="middle" fontSize={17} fontWeight={700} fill={SECOND}>D</text>

            <Formula x={560} y={96} size={19} color={STAGE}>{num(language, 'd = √(12² + 4²) = √160')}</Formula>
            <Formula x={560} y={140} size={19} color={SECOND}>D = √(160 + 3²) = 13</Formula>
            <Formula x={560} y={196} size={17} color={INK}>D = √(12² + 4² + 3²)</Formula>
            <Caption x={560} y={236} language={language} text={say('Bi aldiz Pitagoras', 'Dos veces Pitágoras', 'فيثاغورس مرتين')} size={14} />
        </Figure>
    )
}

/* ---------- 14. Distances on a grid ---------- */

export function GridFigure({ language }: { language: UnitLanguage }) {
    const cell = 24
    const x0 = 60
    const y0 = 260
    const at = (x: number, y: number): Point => [x0 + x * cell, y0 - y * cell]
    const a = at(1, 1)
    const b = at(7, 9)
    const corner = at(7, 1)
    return (
        <Figure height={300} label={pick(language, say('Bi punturen arteko distantzia sarean: 6 eskuinera eta 8 gora, 10', 'Distancia entre dos puntos en la cuadrícula: 6 a la derecha y 8 arriba, 10', 'المسافة بين نقطتين على الشبكة: 6 يمينًا و8 أعلى، 10'))}>
            {Array.from({ length: 11 }, (_, index) => (
                <g key={index}>
                    <line x1={x0 + index * cell} y1={y0} x2={x0 + index * cell} y2={y0 - 10 * cell} stroke={MUTED} strokeWidth={0.7} strokeOpacity={0.5} />
                    <line x1={x0} y1={y0 - index * cell} x2={x0 + 10 * cell} y2={y0 - index * cell} stroke={MUTED} strokeWidth={0.7} strokeOpacity={0.5} />
                </g>
            ))}
            <polygon points={points([a, corner, b])} fill={SOFT} fillOpacity={0.7} />
            <line x1={a[0]} y1={a[1]} x2={corner[0]} y2={corner[1]} stroke={STAGE} strokeWidth={3} />
            <line x1={corner[0]} y1={corner[1]} x2={b[0]} y2={b[1]} stroke={STAGE} strokeWidth={3} />
            <line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={SECOND} strokeWidth={3.5} />
            <RightMark v={corner} a={a} b={b} size={10} />
            <Dot p={a} />
            <Dot p={b} />
            <text x={a[0] - 12} y={a[1] - 8} textAnchor="middle" fontSize={16} fontWeight={700} fill={SECOND}>A</text>
            <text x={b[0] - 12} y={b[1] - 6} textAnchor="middle" fontSize={16} fontWeight={700} fill={SECOND}>B</text>
            <SideLabel a={a} b={corner} text="6" offset={-16} color={STAGE} />
            <SideLabel a={corner} b={b} text="8" offset={-14} color={STAGE} />

            <Formula x={560} y={110} size={21} color={SECOND}>√(6² + 8²) = √100 = 10</Formula>
            <Caption x={560} y={160} language={language} text={say('Zenbatu laukiak:', 'Cuenta los cuadros:', 'عُدّ المربعات:')} color={INK} size={14} />
            <Caption x={560} y={184} language={language} text={say('horizontalean eta bertikalean', 'en horizontal y en vertical', 'أفقيًا وعموديًا')} color={INK} size={14} />
        </Figure>
    )
}

/* ---------- 15. The ladder against the wall ---------- */

export function LadderFigure({ language }: { language: UnitLanguage }) {
    const s = 30
    const ground = 250
    const wallX = 120
    const foot: Point = [wallX + 2.5 * s, ground]
    const topPoint: Point = [wallX, ground - 6 * s]
    return (
        <Figure height={300} label={pick(language, say('6,5 m-ko eskailera bat horman 6 m-ko altueran', 'Una escalera de 6,5 m apoyada en la pared a 6 m de altura', 'سلّم طوله 6.5 م مسنود إلى الجدار على ارتفاع 6 م'))}>
            <rect x={wallX - 40} y={40} width={40} height={ground - 40} fill={ROSE} stroke={INK} strokeWidth={2} />
            <line x1={40} y1={ground} x2={330} y2={ground} stroke={INK} strokeWidth={2.4} />
            <line x1={foot[0]} y1={foot[1]} x2={topPoint[0]} y2={topPoint[1]} stroke={SECOND} strokeWidth={6} strokeLinecap="round" />
            <line x1={foot[0] + 10} y1={foot[1]} x2={topPoint[0] + 10} y2={topPoint[1]} stroke={SECOND} strokeWidth={3} strokeLinecap="round" opacity={0.6} />
            <line x1={wallX} y1={ground} x2={foot[0]} y2={ground} stroke={STAGE} strokeWidth={4} />
            <line x1={wallX} y1={ground} x2={topPoint[0]} y2={topPoint[1]} stroke={STAGE} strokeWidth={2} strokeDasharray="6 4" />
            <RightMark v={[wallX, ground]} a={foot} b={topPoint} size={12} />
            <SideLabel a={foot} b={topPoint} text={num(language, '6,5')} offset={-26} color={SECOND} />
            <text x={wallX + 16} y={ground - 3 * s + 6} textAnchor="start" fontSize={16} fontWeight={700} fill={STAGE}>6</text>
            <text x={wallX + 1.25 * s} y={ground + 24} textAnchor="middle" fontSize={16} fontWeight={700} fill={STAGE}>x</text>

            <Formula x={530} y={96} size={20} color={STAGE}>{num(language, 'x = √(6,5² − 6²)')}</Formula>
            <Formula x={530} y={136} size={20} color={STAGE}>{num(language, '√(42,25 − 36) = √6,25 = 2,5')}</Formula>
            <Caption x={530} y={186} language={language} text={say('Eskailera: hipotenusa', 'La escalera: la hipotenusa', 'السلّم: الوتر')} color={SECOND} size={14} />
            <Caption x={530} y={212} language={language} text={say('Horma eta lurra: katetoak', 'La pared y el suelo: los catetos', 'الجدار والأرض: الضلعان القائمان')} color={STAGE} size={14} />
        </Figure>
    )
}

/* ---------- Hero art: squares on a right triangle and a ladder ---------- */

export function PythagorasHeroArt() {
    const u = 30
    const c: Point = [120, 250]
    const a: Point = [120 + 4 * u, 250]
    const b: Point = [120, 250 - 3 * u]
    return (
        <div className="fraction-v2-collage" aria-hidden="true">
            <svg viewBox="0 0 520 400" direction="ltr" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                <SideSquare a={c} b={a} away={b} n={4} fill="#dde7f7" label="16" />
                <SideSquare a={b} b={c} away={a} n={3} fill={SOFT} label="9" />
                <SideSquare a={a} b={b} away={c} n={5} fill={ROSE} label="25" />
                <polygon points={points([a, b, c])} fill={PAPER} stroke={INK} strokeWidth={2.6} strokeLinejoin="round" />
                <g transform="translate(360 70) rotate(6)">
                    <rect width={120} height={250} rx={10} fill={PAPER} stroke={INK} strokeWidth={2} />
                    <line x1={30} y1={220} x2={95} y2={40} stroke="#c4432a" strokeWidth={6} strokeLinecap="round" />
                    <line x1={20} y1={220} x2={110} y2={220} stroke={INK} strokeWidth={2} />
                    <line x1={95} y1={40} x2={95} y2={220} stroke="#2f6fdb" strokeWidth={2} strokeDasharray="6 4" />
                </g>
            </svg>
        </div>
    )
}
