import type { ReactNode } from 'react'
import { pickText, type LocalizedText, type UnitLanguage } from '../../features/unit-v2/types'
import { Label } from '../dbh2-funtzioak-v2/plane'
import { Figure } from '../dbh2-zatikiak-prototype/figures'

/* ==========================================================================
   Zenbaki konplexuak · Batxilergoa 1 · Zientziak — the lesson figures:
   the imaginary axis, the sets of numbers, the complex plane with a
   number, its opposite and its conjugate, the sum as a parallelogram,
   the division by the conjugate, the four powers of i, a parabola that
   does not cut the axis and its two conjugate roots, the modulus and the
   argument, the polar form with its two projections, the product that
   adds the angles, a turn of 90°, the spiral of the powers and the roots
   on a circle (a regular polygon). Formulas sit in their own
   <text> (left to right in every language); words go through <Label>, and
   the Arabic captions carry words only. The axes are called Re and Im in
   every language. Spanish writes «sen», the other languages «sin». Text
   is 21 px or more on a 720 px wide drawing, so it stays readable on a
   phone.
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
const GRID = '#e3ddd0'
const SERIF = 'Fraunces, serif'

type Point = [number, number]

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })

const NAMES: Record<UnitLanguage, { sin: string; tan: string }> = {
    es: { sin: 'sen', tan: 'tg' },
    eu: { sin: 'sin', tan: 'tg' },
    en: { sin: 'sin', tan: 'tan' },
    ar: { sin: 'sin', tan: 'tan' }
}
/** A formula with «sen» and «tg» in the language's names */
const trig = (language: UnitLanguage, text: string) => text.replace(/\bsen\b/g, NAMES[language].sin).replace(/\btg\b/g, NAMES[language].tan)
const rad = (degrees: number) => (degrees * Math.PI) / 180
/** The point at a screen angle (0 = right, 90 = up) and distance r from c */
const polar = ([cx, cy]: Point, r: number, degrees: number): Point => [cx + r * Math.cos(rad(degrees)), cy - r * Math.sin(rad(degrees))]

/** An arc marking the angle at v from screen angle `from` to `to` (degrees, counterclockwise) */
function AngleArc({ v, r, from, to, color = SECOND, width = 2.6 }: { v: Point; r: number; from: number; to: number; color?: string; width?: number }) {
    const a = polar(v, r, from)
    const b = polar(v, r, to)
    const large = to - from > 180 ? 1 : 0
    return <path d={`M${a[0]} ${a[1]} A${r} ${r} 0 ${large} 0 ${b[0]} ${b[1]}`} fill="none" stroke={color} strokeWidth={width} />
}

/** A card with a formula, on the right of a drawing */
function Card({ x, y, width, children, color = INK, tint = PAPER, size = 22 }: { x: number; y: number; width: number; children: ReactNode; color?: string; tint?: string; size?: number }) {
    return (
        <g>
            <rect x={x} y={y} width={width} height={52} rx={12} fill={tint} stroke={INK} strokeWidth={1.6} />
            <F x={x + width / 2} y={y + 34} size={size} color={color}>{children}</F>
        </g>
    )
}

/** An arrow from a to b */
function Arrow({ a, b, color = INK, width = 3, dashed = false }: { a: Point; b: Point; color?: string; width?: number; dashed?: boolean }) {
    const angle = Math.atan2(b[1] - a[1], b[0] - a[0])
    const head = (side: number): Point => [b[0] - 13 * Math.cos(angle + side * 0.42), b[1] - 13 * Math.sin(angle + side * 0.42)]
    const [l, r] = [head(1), head(-1)]
    return (
        <g>
            <line x1={a[0]} y1={a[1]} x2={b[0] - 8 * Math.cos(angle)} y2={b[1] - 8 * Math.sin(angle)} stroke={color} strokeWidth={width} strokeDasharray={dashed ? '8 6' : undefined} />
            <path d={`M${b[0]} ${b[1]} L${l[0]} ${l[1]} L${r[0]} ${r[1]} Z`} fill={color} />
        </g>
    )
}

/** A formula written left to right whatever the language */
function F({ x, y, children, size = 22, color = INK, anchor = 'middle' }: { x: number; y: number; children: ReactNode; size?: number; color?: string; anchor?: 'start' | 'middle' | 'end' }) {
    return <text x={x} y={y} textAnchor={anchor} fontSize={size} fontWeight={700} fill={color} direction="ltr">{children}</text>
}

/** Words in the reader's language (Arabic right to left) */
function W({ x, y, language, text, size = 21, color = MUTED, anchor = 'middle' }: { x: number; y: number; language: UnitLanguage; text: LocalizedText; size?: number; color?: string; anchor?: 'start' | 'middle' | 'end' }) {
    return <Label x={x} y={y} textAnchor={anchor} fontSize={size} fontWeight={700} fill={color}>{pickText(language, text)}</Label>
}

/** z with a bar on top, the conjugate */
const Bar = ({ children = 'z' }: { children?: ReactNode }) => <tspan textDecoration="overline">{children}</tspan>

function Dot({ p, color = INK, r = 7 }: { p: Point; color?: string; r?: number }) {
    return <circle cx={p[0]} cy={p[1]} r={r} fill={color} stroke={PAPER} strokeWidth={2} />
}

/** A grid of whole units around o, with the axes called Re and Im */
function Plane({ o, unit, x, y, numbers = [] }: { o: Point; unit: number; x: [number, number]; y: [number, number]; numbers?: Array<['x' | 'y', number]> }) {
    const xs = Array.from({ length: x[1] - x[0] + 1 }, (_, index) => x[0] + index)
    const ys = Array.from({ length: y[1] - y[0] + 1 }, (_, index) => y[0] + index)
    const left = o[0] + x[0] * unit
    const right = o[0] + x[1] * unit
    const top = o[1] - y[1] * unit
    const bottom = o[1] - y[0] * unit
    return (
        <g>
            {xs.map((value) => <line key={`x${value}`} x1={o[0] + value * unit} y1={top} x2={o[0] + value * unit} y2={bottom} stroke={GRID} strokeWidth={1.2} />)}
            {ys.map((value) => <line key={`y${value}`} x1={left} y1={o[1] - value * unit} x2={right} y2={o[1] - value * unit} stroke={GRID} strokeWidth={1.2} />)}
            <line x1={left - 12} y1={o[1]} x2={right + 14} y2={o[1]} stroke={MUTED} strokeWidth={1.8} />
            <line x1={o[0]} y1={bottom + 12} x2={o[0]} y2={top - 14} stroke={MUTED} strokeWidth={1.8} />
            <path d={`M${right + 14} ${o[1]} l-10 -5 v10 z`} fill={MUTED} />
            <path d={`M${o[0]} ${top - 14} l-5 10 h10 z`} fill={MUTED} />
            <F x={right + 10} y={o[1] + 28} size={21} color={MUTED} anchor="end">Re</F>
            <F x={o[0] + 12} y={top - 2} size={21} color={MUTED} anchor="start">Im</F>
            {numbers.map(([axis, value]) => axis === 'x'
                ? <F key={`n${axis}${value}`} x={o[0] + value * unit} y={o[1] + 26} size={21} color={MUTED}>{value < 0 ? `−${-value}` : value}</F>
                : <F key={`n${axis}${value}`} x={o[0] - 10} y={o[1] - value * unit + 8} size={21} color={MUTED} anchor="end">{value < 0 ? `−${-value}i` : `${value}i`}</F>)}
        </g>
    )
}

const at = (o: Point, unit: number, a: number, b: number): Point => [o[0] + a * unit, o[1] - b * unit]

/* ---------- 1. New numbers ---------- */

export function ImaginaryUnitFigure({ language }: { language: UnitLanguage }) {
    const O: Point = [190, 170]
    const u = 36
    const rows = ['i² = −1', '√−9 = 3i', '(3i)² = 9i² = −9', '(−3i)² = −9']
    return (
        <Figure height={340} label={pickText(language, say('Ardatz irudikaria: 3i eta −3i, x² = −9 ekuazioaren bi soluzioak', 'El eje imaginario: 3i y −3i, las dos soluciones de x² = −9', 'المحور التخيلي: 3i و−3i حلا المعادلة x² = −9', 'The imaginary axis: 3i and −3i, the two solutions of x² = −9'))}>
            <Plane o={O} unit={u} x={[-4, 4]} y={[-4, 4]} numbers={[['y', 1], ['y', 3], ['y', -3], ['x', 3], ['x', -3]]} />
            <Dot p={at(O, u, 0, 1)} color={MUTED} r={6} />
            <Dot p={at(O, u, 0, 3)} color={STAGE} />
            <Dot p={at(O, u, 0, -3)} color={SECOND} />
            <F x={O[0] + 16} y={at(O, u, 0, 3)[1] + 8} size={22} color={STAGE} anchor="start">3i</F>
            <F x={O[0] + 16} y={at(O, u, 0, -3)[1] + 8} size={22} color={SECOND} anchor="start">−3i</F>
            {rows.map((row, index) => (
                <g key={row}>
                    <rect x={400} y={44 + index * 66} width={300} height={52} rx={12} fill={index === 0 ? STAGE_TINT : PAPER} stroke={INK} strokeWidth={1.6} />
                    <F x={550} y={78 + index * 66} size={23} color={index === 0 ? STAGE : INK}>{row}</F>
                </g>
            ))}
            <W x={550} y={322} language={language} text={say('Bi erro, bata bestearen aurkakoa', 'Dos raíces, opuestas', 'جذران متعاكسان', 'Two roots, opposite to each other')} />
        </Figure>
    )
}

export function BinomialSetsFigure({ language }: { language: UnitLanguage }) {
    return (
        <Figure height={330} label={pickText(language, say('Zenbaki konplexuen multzoa: barruan errealak eta irudikari hutsak; gainerakoak, a + bi, a eta b zero ez direla', 'El conjunto de los complejos: dentro, los reales y los imaginarios puros; el resto, a + bi con a y b distintos de cero', 'مجموعة الأعداد المركبة: في داخلها الأعداد الحقيقية والتخيلية الصرفة، والباقي a + bi حيث a وb غير معدومين', 'The set of complex numbers: inside, the reals and the purely imaginary numbers; the rest, a + bi with a and b not zero'))}>
            <rect x={20} y={20} width={680} height={290} rx={22} fill={PAPER} stroke={INK} strokeWidth={2.2} />
            <F x={52} y={62} size={30} color={INK} anchor="start">ℂ</F>
            <rect x={60} y={86} width={250} height={150} rx={18} fill={STAGE_TINT} stroke={STAGE} strokeWidth={2} />
            <W x={185} y={120} language={language} color={STAGE} text={say('Errealak', 'Reales', 'الحقيقية', 'Reals')} />
            <F x={135} y={166} size={24}>5</F>
            <F x={235} y={166} size={24}>−3/4</F>
            <F x={135} y={212} size={24}>√2</F>
            <F x={235} y={212} size={24}>π</F>
            <rect x={340} y={86} width={250} height={150} rx={18} fill={ROSE} stroke={SECOND} strokeWidth={2} />
            <W x={465} y={120} language={language} color={SECOND} text={say('Irudikari hutsak', 'Imaginarios puros', 'تخيلية صرفة', 'Purely imaginary')} />
            <F x={415} y={166} size={24}>−3i</F>
            <F x={515} y={166} size={24}>4i</F>
            <F x={465} y={212} size={24}>i√2</F>
            <F x={190} y={282} size={25} color={INK}>2 + 7i</F>
            <F x={360} y={282} size={25} color={INK}>−1 − i</F>
            <F x={530} y={282} size={25} color={INK}>4 − 5i</F>
        </Figure>
    )
}

export function ComplexPlaneFigure({ language }: { language: UnitLanguage }) {
    const O: Point = [240, 170]
    const u = 40
    const z = at(O, u, 3, 2)
    const minus = at(O, u, -3, -2)
    const bar = at(O, u, 3, -2)
    return (
        <Figure height={340} label={pickText(language, say('z = 3 + 2i lehen koadrantean, −z jatorriarekiko simetrikoa eta konjokatua ardatz errealarekiko simetrikoa', 'z = 3 + 2i en el primer cuadrante, −z simétrico respecto al origen y el conjugado simétrico respecto al eje real', 'z = 3 + 2i في الربع الأول، و−z مناظره بالنسبة إلى الأصل، والمرافق مناظره بالنسبة إلى المحور الحقيقي', 'z = 3 + 2i in the first quadrant, −z its mirror image through the origin and the conjugate its mirror image in the real axis'))}>
            <Plane o={O} unit={u} x={[-5, 5]} y={[-3, 3]} numbers={[['x', 3], ['x', -3], ['y', 2], ['y', -2]]} />
            <line x1={minus[0]} y1={minus[1]} x2={z[0]} y2={z[1]} stroke={SECOND} strokeWidth={2.4} strokeDasharray="8 6" />
            <line x1={z[0]} y1={z[1]} x2={bar[0]} y2={bar[1]} stroke={GREEN} strokeWidth={2.4} strokeDasharray="8 6" />
            <line x1={O[0]} y1={O[1]} x2={z[0]} y2={z[1]} stroke={STAGE} strokeWidth={3.4} />
            <Dot p={z} color={STAGE} />
            <Dot p={minus} color={SECOND} />
            <Dot p={bar} color={GREEN} />
            <F x={z[0] + 14} y={z[1] - 10} size={23} color={STAGE} anchor="start">z = 3 + 2i</F>
            <F x={minus[0] - 14} y={minus[1] + 44} size={23} color={SECOND} anchor="start">−z = −3 − 2i</F>
            <F x={bar[0] + 14} y={bar[1] + 30} size={23} color={GREEN} anchor="start"><Bar /> = 3 − 2i</F>
        </Figure>
    )
}

/* ---------- 2. Operations ---------- */

export function SumFigure({ language }: { language: UnitLanguage }) {
    const O: Point = [84, 196]
    const u = 42
    const z1 = at(O, u, 2, 3)
    const z2 = at(O, u, 4, -1)
    const total = at(O, u, 6, 2)
    return (
        <Figure height={334} label={pickText(language, say('Batuketa paralelogramoaren erregelarekin: 2 + 3i gehi 4 − i, 6 + 2i', 'La suma con la regla del paralelogramo: 2 + 3i más 4 − i da 6 + 2i', 'الجمع بقاعدة متوازي الأضلاع: 2 + 3i زائد 4 − i يساوي 6 + 2i', 'The sum with the parallelogram rule: 2 + 3i plus 4 − i is 6 + 2i'))}>
            <Plane o={O} unit={u} x={[-1, 7]} y={[-2, 4]} numbers={[['x', 2], ['x', 4], ['x', 6]]} />
            <line x1={z1[0]} y1={z1[1]} x2={total[0]} y2={total[1]} stroke={MUTED} strokeWidth={2} strokeDasharray="7 6" />
            <line x1={z2[0]} y1={z2[1]} x2={total[0]} y2={total[1]} stroke={MUTED} strokeWidth={2} strokeDasharray="7 6" />
            <Arrow a={O} b={z1} color={STAGE} />
            <Arrow a={O} b={z2} color={GREEN} />
            <Arrow a={O} b={total} color={SECOND} width={3.6} />
            <Dot p={z1} color={STAGE} />
            <Dot p={z2} color={GREEN} />
            <Dot p={total} color={SECOND} />
            <Card x={430} y={40} width={270} color={STAGE}>2 + 3i</Card>
            <Card x={430} y={110} width={270} color={GREEN}>4 − i</Card>
            <Card x={430} y={180} width={270} color={SECOND} tint={ROSE}>6 + 2i</Card>
            <W x={360} y={318} language={language} text={say('Zati errealak eta irudikariak, bakoitza bere aldetik', 'Reales con reales, imaginarias con imaginarias', 'الحقيقي مع الحقيقي، والتخيلي مع التخيلي', 'Real with real, imaginary with imaginary')} />
        </Figure>
    )
}

/** A fraction centred on x, its bar at y */
function Fraction({ x, y, top, bottom, color = INK, size = 24 }: { x: number; y: number; top: string; bottom: string; color?: string; size?: number }) {
    const half = Math.max(top.length, bottom.length) * size * 0.3 + 8
    return (
        <g>
            <F x={x} y={y - 12} size={size} color={color}>{top}</F>
            <line x1={x - half} y1={y} x2={x + half} y2={y} stroke={color} strokeWidth={2.2} />
            <F x={x} y={y + 30} size={size} color={color}>{bottom}</F>
        </g>
    )
}

export function DivisionFigure({ language }: { language: UnitLanguage }) {
    return (
        <Figure height={250} label={pickText(language, say('(5 + 5i)/(2 + i): goian eta behean bider 2 − i; behean 5 geratzen da, eta emaitza 3 + i da', '(5 + 5i)/(2 + i): arriba y abajo por 2 − i; abajo queda 5 y el resultado es 3 + i', '(5 + 5i)/(2 + i): نضرب البسط والمقام في 2 − i؛ فيبقى 5 في المقام والنتيجة 3 + i', '(5 + 5i)/(2 + i): top and bottom times 2 − i; 5 is left at the bottom and the result is 3 + i'))}>
            <Fraction x={110} y={100} top="5 + 5i" bottom="2 + i" />
            <F x={230} y={80} size={22} color={SECOND}>· (2 − i)</F>
            <F x={230} y={142} size={22} color={SECOND}>· (2 − i)</F>
            <F x={318} y={110} size={26}>=</F>
            <Fraction x={420} y={100} top="15 + 5i" bottom="5" color={STAGE} />
            <F x={526} y={110} size={26}>=</F>
            <rect x={556} y={74} width={146} height={56} rx={12} fill={ROSE} stroke={INK} strokeWidth={1.6} />
            <F x={629} y={111} size={26} color={SECOND}>3 + i</F>
            <F x={360} y={196} size={22} color={MUTED}>(2 + i)(2 − i) = 4 + 1 = 5</F>
            <W x={360} y={234} language={language} text={say('Behean zenbaki erreal bat geratzen da', 'Abajo queda un número real', 'يبقى في المقام عدد حقيقي', 'A real number is left at the bottom')} />
        </Figure>
    )
}

export function PowersOfIFigure({ language }: { language: UnitLanguage }) {
    const O: Point = [230, 170]
    const r = 100
    const labels: Array<{ angle: number; text: string; dx: number; dy: number; anchor: 'start' | 'middle' | 'end' }> = [
        { angle: 0, text: 'i⁰ = 1', dx: 16, dy: 8, anchor: 'start' },
        { angle: 90, text: 'i¹ = i', dx: 0, dy: -18, anchor: 'middle' },
        { angle: 180, text: 'i² = −1', dx: -16, dy: 8, anchor: 'end' },
        { angle: 270, text: 'i³ = −i', dx: 0, dy: 36, anchor: 'middle' }
    ]
    return (
        <Figure height={340} label={pickText(language, say('i zenbakiaren lau berreturak zirkunferentzian: 1, i, −1 eta −i; i zenbakiaz biderkatzean, 90° biratzen da', 'Las cuatro potencias de i en la circunferencia: 1, i, −1 y −i; al multiplicar por i se gira 90°', 'قوى i الأربع على الدائرة: 1 وi و−1 و−i؛ والضرب في i دوران بزاوية 90°', 'The four powers of i on the circle: 1, i, −1 and −i; multiplying by i turns 90°'))}>
            <line x1={O[0] - r - 30} y1={O[1]} x2={O[0] + r + 30} y2={O[1]} stroke={MUTED} strokeWidth={1.6} />
            <line x1={O[0]} y1={O[1] - r - 22} x2={O[0]} y2={O[1] + r + 22} stroke={MUTED} strokeWidth={1.6} />
            <circle cx={O[0]} cy={O[1]} r={r} fill="none" stroke={INK} strokeWidth={2} />
            {[0, 90, 180, 270].map((from) => <AngleArc key={from} v={O} r={r - 22} from={from + 12} to={from + 78} color={SECOND} width={3} />)}
            {labels.map((label, index) => {
                const p = polar(O, r, label.angle)
                return (
                    <g key={label.text}>
                        <Dot p={p} color={index === 0 ? GREEN : STAGE} />
                        <F x={p[0] + label.dx} y={p[1] + label.dy} size={23} color={index === 0 ? GREEN : STAGE} anchor={label.anchor}>{label.text}</F>
                    </g>
                )
            })}
            <F x={O[0] + 44} y={O[1] - 44} size={21} color={SECOND}>· i</F>
            <Card x={450} y={40} width={250} color={GREEN} tint={STAGE_TINT}>i⁴ = 1</Card>
            <Card x={450} y={108} width={250}>i⁵ = i</Card>
            <Card x={450} y={176} width={250}>i⁶ = −1</Card>
            <Card x={450} y={244} width={250}>i⁷ = −i</Card>
            <W x={575} y={326} language={language} text={say('Lauka errepikatzen dira', 'Se repiten cada cuatro', 'تتكرر كل أربع', 'They repeat every four')} />
        </Figure>
    )
}

export function QuadraticRootsFigure({ language }: { language: UnitLanguage }) {
    const G: Point = [70, 286]
    const gx = 40
    const gy = 11.5
    const curve = Array.from({ length: 61 }, (_, index) => {
        const x = -1 + index * 0.1
        return [G[0] + (x + 1) * gx, G[1] - (x * x - 4 * x + 13) * gy] as Point
    }).filter(([, y]) => y >= 40)
    const O: Point = [540, 170]
    const u = 34
    const up = at(O, u, 2, 3)
    const down = at(O, u, 2, -3)
    return (
        <Figure height={340} label={pickText(language, say('y = x² − 4x + 13 parabolak ez du ardatza mozten; plano konplexuan, bi soluzioak 2 + 3i eta 2 − 3i dira, konjokatuak', 'La parábola y = x² − 4x + 13 no corta el eje; en el plano complejo, sus dos soluciones son 2 + 3i y 2 − 3i, conjugadas', 'القطع المكافئ y = x² − 4x + 13 لا يقطع المحور؛ وفي المستوى المركب حلاه 2 + 3i و2 − 3i، وهما مترافقان', 'The parabola y = x² − 4x + 13 does not cut the axis; in the complex plane, its two solutions are 2 + 3i and 2 − 3i, conjugate'))}>
            <line x1={G[0] - 10} y1={G[1]} x2={G[0] + 7 * gx} y2={G[1]} stroke={MUTED} strokeWidth={1.8} />
            <line x1={G[0] + gx} y1={G[1] + 10} x2={G[0] + gx} y2={30} stroke={MUTED} strokeWidth={1.8} />
            <F x={G[0] + 7 * gx} y={G[1] + 28} size={21} color={MUTED} anchor="end">x</F>
            <polyline points={curve.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ')} fill="none" stroke={STAGE} strokeWidth={3.4} />
            <Dot p={[G[0] + 3 * gx, G[1] - 9 * gy]} color={STAGE} r={6} />
            <F x={G[0] + 3 * gx + 14} y={G[1] - 9 * gy + 30} size={21} color={STAGE} anchor="start">(2, 9)</F>
            <W x={190} y={326} language={language} text={say('Ez du ardatza mozten', 'No corta el eje', 'لا يقطع المحور', 'It does not cut the axis')} />
            <Plane o={O} unit={u} x={[-1, 4]} y={[-4, 4]} numbers={[['x', 2], ['y', 3], ['y', -3]]} />
            <line x1={up[0]} y1={up[1]} x2={down[0]} y2={down[1]} stroke={MUTED} strokeWidth={2} strokeDasharray="7 6" />
            <Dot p={up} color={SECOND} />
            <Dot p={down} color={SECOND} />
            <F x={up[0] + 14} y={up[1] + 8} size={23} color={SECOND} anchor="start">2 + 3i</F>
            <F x={down[0] + 14} y={down[1] + 8} size={23} color={SECOND} anchor="start">2 − 3i</F>
        </Figure>
    )
}

/* ---------- 3. Polar form ---------- */

export function ModulusArgumentFigure({ language }: { language: UnitLanguage }) {
    const O: Point = [300, 236]
    const u = 66
    const z = at(O, u, -1, Math.sqrt(3))
    return (
        <Figure height={330} label={pickText(language, say('−1 + √3 i bigarren koadrantean: modulua 2, argumentua 120°', '−1 + √3 i en el segundo cuadrante: módulo 2 y argumento 120°', '−1 + √3 i في الربع الثاني: الطويلة 2 والعمدة 120°', '−1 + √3 i in the second quadrant: modulus 2 and argument 120°'))}>
            <Plane o={O} unit={u} x={[-3, 2]} y={[-1, 3]} numbers={[['x', -1]]} />
            <line x1={z[0]} y1={z[1]} x2={z[0]} y2={O[1]} stroke={MUTED} strokeWidth={2} strokeDasharray="7 6" />
            <line x1={z[0]} y1={z[1]} x2={O[0]} y2={z[1]} stroke={MUTED} strokeWidth={2} strokeDasharray="7 6" />
            <AngleArc v={O} r={40} from={0} to={120} color={SECOND} width={3} />
            <F x={O[0] + 40} y={O[1] - 44} size={22} color={SECOND} anchor="start">120°</F>
            <line x1={O[0]} y1={O[1]} x2={z[0]} y2={z[1]} stroke={STAGE} strokeWidth={3.6} />
            <Dot p={z} color={STAGE} />
            <F x={(O[0] + z[0]) / 2 - 16} y={(O[1] + z[1]) / 2 + 4} size={23} color={STAGE} anchor="end">2</F>
            <F x={O[0] + 12} y={z[1] + 8} size={21} color={MUTED} anchor="start">√3</F>
            <Card x={450} y={40} width={250} color={STAGE}>|z| = 2</Card>
            <Card x={450} y={110} width={250}>{trig(language, 'tg α = −√3')}</Card>
            <Card x={450} y={180} width={250} color={SECOND} tint={ROSE}>α = 120°</Card>
            <W x={575} y={312} language={language} text={say('Ez −60°: bigarren koadrantea', 'No −60°: segundo cuadrante', 'لا −60°: الربع الثاني', 'Not −60°: second quadrant')} />
        </Figure>
    )
}

export function PolarFigure({ language }: { language: UnitLanguage }) {
    const O: Point = [330, 230]
    const u = 50
    const z = at(O, u, -2 * Math.sqrt(3), 2)
    return (
        <Figure height={330} label={pickText(language, say('Modulua 4 eta argumentua 150°: zati erreala 4 cos 150° = −2√3 eta irudikaria 4 sin 150° = 2', 'Módulo 4 y argumento 150°: parte real 4 cos 150° = −2√3 y parte imaginaria 4 sen 150° = 2', 'الطويلة 4 والعمدة 150°: الجزء الحقيقي 4 cos 150° = −2√3 والتخيلي 4 sin 150° = 2', 'Modulus 4 and argument 150°: real part 4 cos 150° = −2√3 and imaginary part 4 sin 150° = 2'))}>
            <Plane o={O} unit={u} x={[-4, 1]} y={[-1, 3]} numbers={[['y', 2]]} />
            <line x1={z[0]} y1={z[1]} x2={z[0]} y2={O[1]} stroke={GREEN} strokeWidth={3} strokeDasharray="8 6" />
            <line x1={z[0]} y1={z[1]} x2={O[0]} y2={z[1]} stroke={SECOND} strokeWidth={3} strokeDasharray="8 6" />
            <AngleArc v={O} r={36} from={0} to={150} color={STAGE} width={3} />
            <F x={O[0] + 34} y={O[1] - 40} size={22} color={STAGE} anchor="start">150°</F>
            <line x1={O[0]} y1={O[1]} x2={z[0]} y2={z[1]} stroke={STAGE} strokeWidth={3.6} />
            <Dot p={z} color={STAGE} />
            <F x={(O[0] + z[0]) / 2 + 4} y={(O[1] + z[1]) / 2 + 30} size={23} color={STAGE}>r = 4</F>
            <F x={z[0]} y={O[1] + 30} size={22} color={GREEN}>−2√3</F>
            <Card x={410} y={40} width={300} color={GREEN}>{trig(language, 'a = 4 cos 150° = −2√3')}</Card>
            <Card x={410} y={110} width={300} color={SECOND}>{trig(language, 'b = 4 sen 150° = 2')}</Card>
            <Card x={410} y={180} width={300} tint={STAGE_TINT}>−2√3 + 2i</Card>
        </Figure>
    )
}

/* ---------- 4. Turns and powers ---------- */

export function ProductFigure({ language }: { language: UnitLanguage }) {
    const O: Point = [90, 290]
    const u = 50
    const z = polar(O, 2 * u, 20)
    const w = polar(O, 2 * u, 50)
    const product = polar(O, 4 * u, 70)
    return (
        <Figure height={320} label={pickText(language, say('2 modulua eta 20° bider 2 modulua eta 50°: 4 modulua eta 70°; moduluak biderkatu eta angeluak batu egiten dira', 'Módulo 2 y 20° por módulo 2 y 50°: módulo 4 y 70°; los módulos se multiplican y los ángulos se suman', 'طويلة 2 و20° في طويلة 2 و50°: طويلة 4 و70°؛ تُضرب الطويلات وتُجمع الزوايا', 'Modulus 2 and 20° times modulus 2 and 50°: modulus 4 and 70°; the moduli multiply and the angles add'))}>
            <line x1={O[0] - 20} y1={O[1]} x2={O[0] + 260} y2={O[1]} stroke={MUTED} strokeWidth={1.8} />
            <line x1={O[0]} y1={O[1] + 16} x2={O[0]} y2={30} stroke={MUTED} strokeWidth={1.8} />
            <AngleArc v={O} r={44} from={0} to={20} color={STAGE} width={3} />
            <AngleArc v={O} r={62} from={20} to={70} color={GREEN} width={3} />
            <Arrow a={O} b={z} color={STAGE} />
            <Arrow a={O} b={w} color={GREEN} />
            <Arrow a={O} b={product} color={SECOND} width={3.6} />
            <F x={z[0] + 12} y={z[1] + 8} size={23} color={STAGE} anchor="start">z</F>
            <F x={w[0] + 12} y={w[1] + 4} size={23} color={GREEN} anchor="start">w</F>
            <F x={product[0] + 14} y={product[1] + 8} size={23} color={SECOND} anchor="start">z · w</F>
            <Card x={400} y={40} width={300} color={SECOND}>|z · w| = 2 · 2 = 4</Card>
            <Card x={400} y={110} width={300} color={SECOND}>20° + 50° = 70°</Card>
            <W x={550} y={206} language={language} text={say('Moduluak biderkatu egiten dira', 'Los módulos se multiplican', 'تُضرب الطويلات', 'The moduli multiply')} />
            <W x={550} y={240} language={language} text={say('eta argumentuak batu', 'y los argumentos se suman', 'وتُجمع العُمَد', 'and the arguments add')} />
        </Figure>
    )
}

export function RotationFigure({ language }: { language: UnitLanguage }) {
    const O: Point = [250, 250]
    const u = 40
    const from = at(O, u, 4, 2)
    const to = at(O, u, -2, 4)
    const start = (Math.atan2(2, 4) * 180) / Math.PI
    return (
        <Figure height={320} label={pickText(language, say('(4, 2) puntua 90° biratuta (−2, 4) puntua da: i zenbakiaz biderkatzea', 'El punto (4, 2) girado 90° es (−2, 4): multiplicar por i', 'النقطة (4, 2) بعد تدويرها 90° هي (−2, 4): الضرب في i', 'The point (4, 2) turned 90° is (−2, 4): multiplying by i'))}>
            <Plane o={O} unit={u} x={[-3, 5]} y={[-1, 5]} numbers={[['x', 4], ['x', -2]]} />
            <AngleArc v={O} r={62} from={start} to={start + 90} color={SECOND} width={3.2} />
            <F x={polar(O, 86, start + 45)[0]} y={polar(O, 86, start + 45)[1] + 8} size={22} color={SECOND}>90°</F>
            <Arrow a={O} b={from} color={STAGE} />
            <Arrow a={O} b={to} color={SECOND} />
            <Dot p={from} color={STAGE} />
            <Dot p={to} color={SECOND} />
            <F x={from[0] + 12} y={from[1] - 12} size={23} color={STAGE} anchor="start">4 + 2i</F>
            <F x={to[0] - 12} y={to[1] - 12} size={23} color={SECOND} anchor="end">−2 + 4i</F>
            <Card x={480} y={40} width={220} color={SECOND} tint={ROSE}>· i → 90°</Card>
            <Card x={480} y={110} width={220}>· (−1) → 180°</Card>
            <W x={590} y={206} language={language} text={say('Modulua ez da aldatzen', 'El módulo no cambia', 'لا تتغير الطويلة', 'The modulus does not change')} />
        </Figure>
    )
}

export function PowerSpiralFigure({ language }: { language: UnitLanguage }) {
    const O: Point = [310, 200]
    const u = 58
    const powers = [1, 2, 3, 4, 5].map((n) => polar(O, u * 1.25 ** n, 40 * n))
    const names = ['z', 'z²', 'z³', 'z⁴', 'z⁵']
    const spiral = Array.from({ length: 81 }, (_, index) => polar(O, u * 1.25 ** (index / 16), 40 * (index / 16)))
    return (
        <Figure height={340} label={pickText(language, say('z zenbakiaren berreturak espiral batean: berretura bakoitzean modulua bider r eta argumentua gehi α', 'Las potencias de z en una espiral: en cada potencia el módulo se multiplica por r y al argumento se le suma α', 'قوى z على حلزون: في كل قوة تُضرب الطويلة في r ويُضاف α إلى العمدة', 'The powers of z on a spiral: at each power the modulus is multiplied by r and α is added to the argument'))}>
            <Plane o={O} unit={u} x={[-3, 2]} y={[-2, 2]} />
            <polyline points={spiral.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ')} fill="none" stroke={MUTED} strokeWidth={2} strokeDasharray="6 6" />
            {powers.map((p, index) => (
                <g key={names[index]}>
                    <line x1={O[0]} y1={O[1]} x2={p[0]} y2={p[1]} stroke={index === 0 ? STAGE : SECOND} strokeWidth={index === 0 ? 3.4 : 2.4} />
                    <Dot p={p} color={index === 0 ? STAGE : SECOND} />
                </g>
            ))}
            <F x={powers[0][0] + 12} y={powers[0][1] + 6} size={23} color={STAGE} anchor="start">{names[0]}</F>
            <F x={powers[1][0] + 14} y={powers[1][1] + 22} size={23} color={SECOND} anchor="start">{names[1]}</F>
            <F x={powers[2][0] - 10} y={powers[2][1] - 12} size={23} color={SECOND} anchor="end">{names[2]}</F>
            <F x={powers[3][0] - 12} y={powers[3][1] - 8} size={23} color={SECOND} anchor="end">{names[3]}</F>
            <F x={powers[4][0] - 12} y={powers[4][1] + 24} size={23} color={SECOND} anchor="end">{names[4]}</F>
            <Card x={480} y={40} width={220} color={SECOND}>|zⁿ| = rⁿ</Card>
            <Card x={480} y={110} width={220} color={SECOND}>arg zⁿ = n · α</Card>
        </Figure>
    )
}

/* ---------- 5. Roots ---------- */

const ROOTS = {
    cube: { angles: [30, 150, 270], labels: ['k = 0', 'k = 1', 'k = 2'], cards: ['∛8 = 2', '30° + 120° · k'] },
    triangle: { angles: [90, 210, 330], labels: ['2i', '−√3 − i', '√3 − i'], cards: ['360°/3 = 120°', '90° + 120° · k'] },
    equation: { angles: [60, 180, 300], labels: ['1 + √3 i', '−2', '1 − √3 i'], cards: ['z³ = −8', '60° + 120° · k'] }
}

export function RootsFigure({ language, kind }: { language: UnitLanguage; kind: keyof typeof ROOTS }) {
    const O: Point = [240, 176]
    const r = 120
    const { angles, labels, cards } = ROOTS[kind]
    const points = angles.map((angle) => polar(O, r, angle))
    const caption = {
        cube: say('8i zenbakiaren hiru erro kubikoak: 2 modulua eta 30°, 150° eta 270°', 'Las tres raíces cúbicas de 8i: módulo 2 y 30°, 150° y 270°', 'الجذور التكعيبية الثلاثة لـ 8i: الطويلة 2 و30° و150° و270°', 'The three cube roots of 8i: modulus 2 and 30°, 150° and 270°'),
        triangle: say('Triangelu aldeberdina: erpinak 2i, −√3 − i eta √3 − i, 120° banatuta', 'El triángulo equilátero: vértices 2i, −√3 − i y √3 − i, separados 120°', 'المثلث متساوي الأضلاع: رؤوسه 2i و−√3 − i و√3 − i، تفصل بينها 120°', 'The equilateral triangle: vertices 2i, −√3 − i and √3 − i, 120° apart'),
        equation: say('z³ = −8 ekuazioaren hiru soluzioak: 1 + √3 i, −2 eta 1 − √3 i', 'Las tres soluciones de z³ = −8: 1 + √3 i, −2 y 1 − √3 i', 'حلول z³ = −8 الثلاثة: 1 + √3 i و−2 و1 − √3 i', 'The three solutions of z³ = −8: 1 + √3 i, −2 and 1 − √3 i')
    }[kind]
    return (
        <Figure height={352} label={pickText(language, caption)}>
            <line x1={O[0] - r - 40} y1={O[1]} x2={O[0] + r + 40} y2={O[1]} stroke={MUTED} strokeWidth={1.6} />
            <line x1={O[0]} y1={O[1] - r - 26} x2={O[0]} y2={O[1] + r + 26} stroke={MUTED} strokeWidth={1.6} />
            <F x={O[0] + r + 40} y={O[1] + 28} size={21} color={MUTED} anchor="end">Re</F>
            <F x={O[0] + 12} y={O[1] - r - 10} size={21} color={MUTED} anchor="start">Im</F>
            <circle cx={O[0]} cy={O[1]} r={r} fill="none" stroke={INK} strokeWidth={2} />
            <polygon points={points.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ')} fill={STAGE_TINT} fillOpacity={0.6} stroke={STAGE} strokeWidth={2.6} />
            {points.map((p, index) => {
                const angle = angles[index]
                const c = Math.cos(rad(angle))
                const anchor = c > 0.3 ? 'start' : c < -0.3 ? 'end' : 'middle'
                const label = polar(O, r + 22, angle)
                return (
                    <g key={labels[index]}>
                        <line x1={O[0]} y1={O[1]} x2={p[0]} y2={p[1]} stroke={MUTED} strokeWidth={1.8} strokeDasharray="6 5" />
                        <Dot p={p} color={SECOND} />
                        <F x={label[0]} y={label[1] + (Math.sin(rad(angle)) > 0.5 ? -4 : Math.sin(rad(angle)) < -0.5 ? 20 : 8)} size={23} color={SECOND} anchor={anchor}>{labels[index]}</F>
                    </g>
                )
            })}
            <Card x={470} y={60} width={230} color={STAGE}>{cards[0]}</Card>
            <Card x={470} y={130} width={230}>{cards[1]}</Card>
            <W x={585} y={230} language={language} text={say('Poligono erregular bat', 'Un polígono regular', 'مضلع منتظم', 'A regular polygon')} />
        </Figure>
    )
}

/* ---------- Hero art ---------- */

export function ComplexHeroArt() {
    const hexagon = Array.from({ length: 6 }, (_, index) => {
        const angle = ((30 + index * 60) * Math.PI) / 180
        return [105 + 66 * Math.cos(angle), 100 - 66 * Math.sin(angle)]
    })
    return (
        <div className="fraction-v2-collage" aria-hidden="true">
            <svg viewBox="0 0 520 400" direction="ltr" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                <g transform="translate(24 30) rotate(-4)">
                    <rect width={230} height={210} rx={16} fill={PAPER} stroke={INK} strokeWidth={2} />
                    {[40, 75, 110, 145, 180].map((value) => <line key={`v${value}`} x1={value} y1={20} x2={value} y2={190} stroke={GRID} strokeWidth={1.2} />)}
                    {[35, 70, 105, 140, 175].map((value) => <line key={`h${value}`} x1={20} y1={value} x2={210} y2={value} stroke={GRID} strokeWidth={1.2} />)}
                    <line x1={20} y1={105} x2={210} y2={105} stroke="#58616e" strokeWidth={1.8} />
                    <line x1={110} y1={20} x2={110} y2={190} stroke="#58616e" strokeWidth={1.8} />
                    <line x1={110} y1={105} x2={180} y2={52} stroke="#2f6fdb" strokeWidth={3.4} />
                    <circle cx={180} cy={52} r={7} fill="#2f6fdb" />
                    <circle cx={180} cy={158} r={7} fill="#267b53" />
                    <line x1={180} y1={52} x2={180} y2={158} stroke="#267b53" strokeWidth={2.4} strokeDasharray="7 5" />
                </g>
                <g transform="translate(282 48) rotate(5)">
                    <rect width={210} height={200} rx={16} fill={SOFT} stroke={INK} strokeWidth={2} />
                    <circle cx={105} cy={100} r={66} fill="none" stroke={INK} strokeWidth={2} />
                    <polygon points={hexagon.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ')} fill="none" stroke="#c4432a" strokeWidth={2.6} />
                    {hexagon.map(([x, y]) => <circle key={`${x}`} cx={x} cy={y} r={6} fill="#c4432a" />)}
                </g>
                <g transform="translate(46 284) rotate(2)">
                    <rect width={430} height={86} rx={16} fill={ROSE} stroke={INK} strokeWidth={2} />
                    <text x={215} y={56} textAnchor="middle" fontSize={30} fontWeight={700} fill={INK} fontFamily={SERIF}>i² = −1</text>
                </g>
            </svg>
        </div>
    )
}
