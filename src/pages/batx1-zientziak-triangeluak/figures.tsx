import type { ReactNode } from 'react'
import { pickText, type LocalizedText, type UnitLanguage } from '../../features/unit-v2/types'
import { Label } from '../dbh2-funtzioak-v2/plane'
import { Figure, Frac } from '../dbh2-zatikiak-prototype/figures'
import { decimalSeparatorFor } from '../../utils/numberFormat'

/* ==========================================================================
   Triangeluen ebazpena · Batxilergoa 1 · Zientziak — the lesson figures:
   the signs of the four quadrants, the turns of a big angle, the quarter
   turn that swaps sine and cosine, two angles with the same sine, a right
   triangle solved, the height inside and outside, the sine rule with its
   pairs, the compass of the ambiguous case, the circumscribed circle with
   the diameter, the height behind the cosine rule, acute, right and obtuse
   triangles, the four cases, Heron's half perimeter, triangulation and the
   parallelogram of forces. Formulas sit in their own <text> (left to right
   in every language); words go through <Label>, and the Arabic captions
   carry words only. Spanish writes «sen» and «tg», Basque «sin» and «tg»,
   English and Arabic «sin» and «tan». Text is 20–24 px on a 720 px wide
   drawing, so it stays readable on a phone.
   ========================================================================== */

const INK = 'var(--ink, #1d2733)'
const MUTED = 'var(--muted, #58616e)'
const STAGE = 'var(--stage, #2f6fdb)'
const STAGE_TINT = 'var(--stage-tint, #dde7f7)'
const SECOND = 'var(--second, #c4432a)'
const GREEN = 'var(--success, #267b53)'
const GREEN_TINT = 'var(--success-tint, #d9efe2)'
const PAPER = '#fffcf6'
const SOFT = '#fbebc0'
const ROSE = '#f6d9d2'
const SERIF = 'Fraunces, serif'

type Point = [number, number]

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
/** A number written with the comma, shown with the point in Arabic and English */
const num = (language: UnitLanguage, text: string) => text.replace(/(\d),(\d)/g, `$1${language === 'ar' ? '.' : decimalSeparatorFor(language)}$2`)
/** A formula with «sen» and «tg» written in the language's names, and its decimal commas */
const trig = (language: UnitLanguage, text: string) => num(language, text
    .replace(/\bsen\b/g, language === 'es' ? 'sen' : 'sin')
    .replace(/\btg\b/g, language === 'ar' || language === 'en' ? 'tan' : 'tg'))
const rad = (degrees: number) => (degrees * Math.PI) / 180
const points = (list: Point[]) => list.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ')
/** The point at a screen angle (0 = right, 90 = up) and distance r from c */
const polar = ([cx, cy]: Point, r: number, degrees: number): Point => [cx + r * Math.cos(rad(degrees)), cy - r * Math.sin(rad(degrees))]
/** The screen angle of the direction from p to q (0 = right, 90 = up) */
const direction = (p: Point, q: Point) => (Math.atan2(p[1] - q[1], q[0] - p[0]) * 180) / Math.PI
const mid = (p: Point, q: Point): Point => [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2]

/** A formula written left to right whatever the language */
function F({ x, y, children, size = 22, color = INK, anchor = 'middle' }: { x: number; y: number; children: ReactNode; size?: number; color?: string; anchor?: 'start' | 'middle' | 'end' }) {
    return <text x={x} y={y} textAnchor={anchor} fontSize={size} fontWeight={700} fill={color} direction="ltr">{children}</text>
}

/** Words in the reader's language (Arabic right to left) */
function W({ x, y, language, text, size = 21, color = MUTED, anchor = 'middle' }: { x: number; y: number; language: UnitLanguage; text: LocalizedText; size?: number; color?: string; anchor?: 'start' | 'middle' | 'end' }) {
    return <Label x={x} y={y} textAnchor={anchor} fontSize={size} fontWeight={700} fill={color}>{pickText(language, text)}</Label>
}

/** A small right-angle mark at v, with legs along the unit directions u and w */
function RightMark({ v, u, w, s = 14, color = INK }: { v: Point; u: Point; w: Point; s?: number; color?: string }) {
    const p1: Point = [v[0] + s * u[0], v[1] + s * u[1]]
    const p3: Point = [v[0] + s * w[0], v[1] + s * w[1]]
    const p2: Point = [p1[0] + s * w[0], p1[1] + s * w[1]]
    return <polyline points={points([p1, p2, p3])} fill="none" stroke={color} strokeWidth={2} />
}

/** The unit vector from p towards q */
const unit = (p: Point, q: Point): Point => {
    const length = Math.hypot(q[0] - p[0], q[1] - p[1])
    return [(q[0] - p[0]) / length, (q[1] - p[1]) / length]
}

/** An arc marking the angle at v from screen angle `from` to `to` (degrees, counterclockwise) */
function AngleArc({ v, r, from, to, color = SECOND, fill = 'none', width = 2.4 }: { v: Point; r: number; from: number; to: number; color?: string; fill?: string; width?: number }) {
    const a = polar(v, r, from)
    const b = polar(v, r, to)
    const large = to - from > 180 ? 1 : 0
    const path = fill === 'none' ? `M${a[0]} ${a[1]} A${r} ${r} 0 ${large} 0 ${b[0]} ${b[1]}` : `M${v[0]} ${v[1]} L${a[0]} ${a[1]} A${r} ${r} 0 ${large} 0 ${b[0]} ${b[1]} Z`
    return <path d={path} fill={fill} fillOpacity={fill === 'none' ? undefined : 0.35} stroke={color} strokeWidth={width} />
}

/** The arc of the inner angle at v of a triangle whose other two vertices are p and q */
function InnerArc({ v, p, q, r = 34, color = SECOND }: { v: Point; p: Point; q: Point; r?: number; color?: string }) {
    let from = direction(v, p)
    let to = direction(v, q)
    let sweep = (to - from + 360) % 360
    if (sweep > 180) {
        ;[from, to] = [to, from]
        sweep = 360 - sweep
    }
    return <AngleArc v={v} r={r} from={from} to={from + sweep} color={color} />
}

function Dot({ p, color = INK, r = 5 }: { p: Point; color?: string; r?: number }) {
    return <circle cx={p[0]} cy={p[1]} r={r} fill={color} />
}

/** Axes and the circle of radius r around o */
function Circle({ o, r }: { o: Point; r: number }) {
    return (
        <g>
            <line x1={o[0] - r - 26} y1={o[1]} x2={o[0] + r + 26} y2={o[1]} stroke={MUTED} strokeWidth={1.6} />
            <line x1={o[0]} y1={o[1] - r - 22} x2={o[0]} y2={o[1] + r + 22} stroke={MUTED} strokeWidth={1.6} />
            <circle cx={o[0]} cy={o[1]} r={r} fill="none" stroke={INK} strokeWidth={2.2} />
        </g>
    )
}

/* ---------- 1. The signs of the four quadrants ---------- */

export function QuadrantSignsFigure({ language }: { language: UnitLanguage }) {
    const O: Point = [190, 175]
    const r = 125
    const P = polar(O, r, 180 - 36.87)
    const foot: Point = [P[0], O[1]]
    const s = trig(language, 'sen')
    const cells = [
        { x: 470, y: 90, name: 'II', sin: '+', cos: '−' },
        { x: 610, y: 90, name: 'I', sin: '+', cos: '+' },
        { x: 470, y: 215, name: 'III', sin: '−', cos: '−' },
        { x: 610, y: 215, name: 'IV', sin: '−', cos: '+' }
    ]
    return (
        <Figure height={350} label={pickText(language, say('Bigarren koadranteko puntua: kosinua −4/5 da eta sinua 3/5; ondoan, koadrante bakoitzeko zeinuak', 'Un punto del segundo cuadrante: el coseno es −4/5 y el seno 3/5; al lado, los signos de cada cuadrante', 'نقطة في الربع الثاني: جيب التمام −4/5 والجيب 3/5، وبجانبها إشارات كل ربع', 'A point in the second quadrant: the cosine is −4/5 and the sine 3/5; next to it, the signs in each quadrant'))}>
            <rect x={O[0] - r} y={O[1] - r} width={r} height={r} fill={STAGE_TINT} opacity={0.6} />
            <Circle o={O} r={r} />
            <line x1={O[0]} y1={O[1]} x2={P[0]} y2={P[1]} stroke={INK} strokeWidth={3} />
            <line x1={P[0]} y1={P[1]} x2={foot[0]} y2={foot[1]} stroke={SECOND} strokeWidth={4} />
            <line x1={O[0]} y1={O[1]} x2={foot[0]} y2={foot[1]} stroke={GREEN} strokeWidth={5} />
            <AngleArc v={O} r={30} from={0} to={180 - 36.87} color={STAGE} />
            <F x={O[0] + 26} y={O[1] - 34} size={22} color={STAGE} anchor="start">α</F>
            <Dot p={P} />
            <F x={P[0] - 10} y={(P[1] + foot[1]) / 2 + 8} anchor="end" color={SECOND} size={22}>3/5</F>
            <F x={(O[0] + foot[0]) / 2} y={O[1] + 30} color={GREEN} size={22}>−4/5</F>
            {cells.map((cell) => (
                <g key={cell.name}>
                    <rect x={cell.x - 64} y={cell.y - 44} width={128} height={108} rx={12} fill={cell.name === 'II' ? STAGE_TINT : PAPER} stroke={INK} strokeWidth={1.8} />
                    <F x={cell.x} y={cell.y - 14} size={21} color={MUTED}>{cell.name}</F>
                    <F x={cell.x} y={cell.y + 16} size={21} color={SECOND}>{`${s} ${cell.sin}`}</F>
                    <F x={cell.x} y={cell.y + 46} size={21} color={GREEN}>{`cos ${cell.cos}`}</F>
                </g>
            ))}
            <W x={540} y={330} language={language} text={say('Koadranteak zeinua ematen du', 'El cuadrante da el signo', 'الربع يعطي الإشارة', 'The quadrant gives the sign')} />
        </Figure>
    )
}

/* ---------- 2. The turns of a big angle ---------- */

export function TurnsFigure({ language }: { language: UnitLanguage }) {
    const O: Point = [190, 170]
    const total = 750
    const path = Array.from({ length: 151 }, (_, index) => {
        const angle = (total * index) / 150
        return polar(O, 26 + (84 * index) / 150, angle)
    })
    const end = path[path.length - 1]
    const before = path[path.length - 4]
    const tip = unit(before, end)
    const normal: Point = [-tip[1], tip[0]]
    const head = [end, [end[0] - 14 * tip[0] + 7 * normal[0], end[1] - 14 * tip[1] + 7 * normal[1]], [end[0] - 14 * tip[0] - 7 * normal[0], end[1] - 14 * tip[1] - 7 * normal[1]]] as Point[]
    const final = polar(O, 128, 30)
    const negative = polar(O, 128, -60)
    return (
        <Figure height={340} label={pickText(language, say('750°-ko angeluak bi bira eta 30° egiten ditu; −60° angelua 300° angeluaren lekuan amaitzen da', 'El ángulo de 750° da dos vueltas y 30° más; el de −60° acaba donde 300°', 'تدور الزاوية 750° دورتين و30°؛ وتنتهي ⁦−60°⁩ حيث تنتهي 300°', 'The 750° angle makes two turns and 30° more; −60° ends where 300° does'))}>
            <Circle o={O} r={128} />
            <polyline points={points(path)} fill="none" stroke={STAGE} strokeWidth={3} />
            <polygon points={points(head)} fill={STAGE} />
            <line x1={O[0]} y1={O[1]} x2={final[0]} y2={final[1]} stroke={INK} strokeWidth={3} />
            <Dot p={final} />
            <line x1={O[0]} y1={O[1]} x2={negative[0]} y2={negative[1]} stroke={SECOND} strokeWidth={3} strokeDasharray="8 6" />
            <AngleArc v={O} r={118} from={-60} to={0} color={SECOND} />
            <Dot p={negative} color={SECOND} />
            <F x={final[0] + 10} y={final[1] - 8} anchor="start" size={22}>30°</F>
            <F x={negative[0] + 10} y={negative[1] + 22} anchor="start" size={22} color={SECOND}>−60°</F>

            <F x={540} y={100} size={24} color={STAGE}>750° = 2 · 360° + 30°</F>
            <F x={540} y={150} size={24}>{trig(language, 'sen 750° = sen 30°')}</F>
            <F x={540} y={225} size={24} color={SECOND}>−60° + 360° = 300°</F>
            <W x={540} y={290} language={language} text={say('Bira osoek ez dute ezer aldatzen', 'Las vueltas no cambian nada', 'الدورات الكاملة لا تغيّر شيئًا', 'Whole turns change nothing')} />
        </Figure>
    )
}

/* ---------- 3. The quarter turn: 90° + α swaps the legs ---------- */

export function QuarterTurnFigure({ language }: { language: UnitLanguage }) {
    const O: Point = [200, 190]
    const r = 140
    const alpha = 30
    const P = polar(O, r, alpha)
    const Q = polar(O, r, 90 + alpha)
    const footP: Point = [P[0], O[1]]
    const footQ: Point = [Q[0], O[1]]
    return (
        <Figure height={360} label={pickText(language, say('α eta 90° + α: triangeluak bira-laurden bat egiten du eta katetoak trukatzen dira', 'α y 90° + α: el triángulo gira un cuarto de vuelta y los catetos se cambian', 'α و90° + α: يدور المثلث ربع دورة ويتبادل الضلعان القائمان', 'α and 90° + α: the triangle turns a quarter of a turn and the legs swap'))}>
            <Circle o={O} r={r} />
            <polygon points={points([O, footP, P])} fill={STAGE_TINT} stroke={INK} strokeWidth={1.6} />
            <polygon points={points([O, footQ, Q])} fill={SOFT} stroke={INK} strokeWidth={1.6} />
            <line x1={footP[0]} y1={footP[1]} x2={P[0]} y2={P[1]} stroke={SECOND} strokeWidth={5} />
            <line x1={O[0]} y1={O[1]} x2={footP[0]} y2={footP[1]} stroke={GREEN} strokeWidth={5} />
            <line x1={O[0]} y1={O[1]} x2={footQ[0]} y2={footQ[1]} stroke={SECOND} strokeWidth={5} />
            <line x1={footQ[0]} y1={footQ[1]} x2={Q[0]} y2={Q[1]} stroke={GREEN} strokeWidth={5} />
            <AngleArc v={O} r={36} from={0} to={alpha} color={STAGE} />
            <AngleArc v={O} r={56} from={0} to={90 + alpha} color={MUTED} width={1.8} />
            <Dot p={P} />
            <Dot p={Q} />
            <F x={O[0] + 44} y={O[1] - 6} anchor="start" size={21} color={STAGE}>α</F>
            <F x={P[0] + 10} y={P[1] - 6} anchor="start" size={21}>α</F>
            <F x={Q[0] - 10} y={Q[1] - 8} anchor="end" size={21}>90° + α</F>

            <F x={545} y={110} size={23} color={SECOND}>{trig(language, 'sen(90° + α) = cos α')}</F>
            <F x={545} y={170} size={23} color={GREEN}>{trig(language, 'cos(90° + α) = −sen α')}</F>
            <W x={545} y={250} language={language} text={say('Kateto gorria etzan egiten da,', 'El cateto rojo se tumba', 'يستلقي الضلع الأحمر', 'The red leg lies down')} />
            <W x={545} y={282} language={language} text={say('eta berdea zutik jartzen da', 'y el verde se pone de pie', 'ويقف الضلع الأخضر', 'and the green one stands up')} />
        </Figure>
    )
}

/* ---------- 4. Two angles with the same sine ---------- */

export function TwinAnglesFigure({ language }: { language: UnitLanguage }) {
    const O: Point = [200, 190]
    const r = 140
    const first = 36.87
    const P1 = polar(O, r, first)
    const P2 = polar(O, r, 180 - first)
    return (
        <Figure height={360} label={pickText(language, say('Sinua 0,6 duten bi puntuak altuera berean daude: 36,9° eta 143,1°', 'Los dos puntos con seno 0,6 están a la misma altura: 36,9° y 143,1°', 'النقطتان اللتان جيبهما 0.6 على الارتفاع نفسه: 36.9° و143.1°', 'The two points with sine 0.6 are at the same height: 36.9° and 143.1°'))}>
            <Circle o={O} r={r} />
            <line x1={O[0] - r - 20} y1={P1[1]} x2={O[0] + r + 20} y2={P1[1]} stroke={SECOND} strokeWidth={2.4} strokeDasharray="10 7" />
            <line x1={O[0]} y1={O[1]} x2={P1[0]} y2={P1[1]} stroke={STAGE} strokeWidth={3} />
            <line x1={O[0]} y1={O[1]} x2={P2[0]} y2={P2[1]} stroke={GREEN} strokeWidth={3} />
            <AngleArc v={O} r={34} from={0} to={first} color={STAGE} />
            <AngleArc v={O} r={54} from={0} to={180 - first} color={GREEN} width={2} />
            <Dot p={P1} color={STAGE} r={6} />
            <Dot p={P2} color={GREEN} r={6} />
            <F x={P1[0] + 12} y={P1[1] - 10} anchor="start" size={21} color={STAGE}>{num(language, '36,9°')}</F>
            <F x={P2[0] - 12} y={P2[1] - 10} anchor="end" size={21} color={GREEN}>{num(language, '143,1°')}</F>
            <F x={O[0] + r + 26} y={P1[1] + 8} anchor="start" size={21} color={SECOND}>{num(language, 'y = 0,6')}</F>

            <F x={555} y={110} size={23} color={SECOND}>{num(language, trig(language, 'sen α = 0,6'))}</F>
            <F x={555} y={165} size={23} color={STAGE}>{num(language, 'α₁ ≈ 36,9°')}</F>
            <F x={555} y={220} size={23} color={GREEN}>{num(language, 'α₂ = 180° − α₁')}</F>
            <W x={555} y={290} language={language} text={say('Altuera bera, sinu bera', 'Misma altura, mismo seno', 'الارتفاع نفسه، الجيب نفسه', 'Same height, same sine')} />
        </Figure>
    )
}

/* ---------- 5. A right triangle solved ---------- */

export function RightReviewFigure({ language }: { language: UnitLanguage }) {
    const s = 11
    const A: Point = [70, 300]
    const B: Point = [A[0] + 21 * s, 300]
    const C: Point = [A[0], 300 - 20 * s]
    return (
        <Figure height={350} label={pickText(language, say('A-n angeluzuzena den triangelua: katetoak 20 eta 21, hipotenusa 29, B 43,6° eta C 46,4°', 'Triángulo rectángulo en A: catetos 20 y 21, hipotenusa 29, B de 43,6° y C de 46,4°', 'مثلث قائم في A: الضلعان القائمان 20 و21 والوتر 29، وB تساوي 43.6° وC تساوي 46.4°', 'Triangle with a right angle at A: legs 20 and 21, hypotenuse 29, B is 43.6° and C is 46.4°'))}>
            <polygon points={points([A, B, C])} fill={GREEN_TINT} stroke={INK} strokeWidth={2.4} strokeLinejoin="round" />
            <RightMark v={A} u={[1, 0]} w={[0, -1]} />
            <InnerArc v={B} p={A} q={C} r={40} color={STAGE} />
            <InnerArc v={C} p={A} q={B} r={36} color={SECOND} />
            <F x={A[0] - 14} y={A[1] + 8} anchor="end">A</F>
            <F x={B[0] + 12} y={B[1] + 8} anchor="start">B</F>
            <F x={C[0] - 14} y={C[1] + 8} anchor="end">C</F>
            <F x={A[0] - 14} y={(A[1] + C[1]) / 2 + 8} anchor="end">20</F>
            <F x={(A[0] + B[0]) / 2} y={A[1] + 30}>21</F>
            <F x={mid(B, C)[0] + 16} y={mid(B, C)[1] - 8} anchor="start" color={GREEN}>29</F>
            <F x={B[0] - 52} y={B[1] - 14} anchor="end" size={21} color={STAGE}>{num(language, '43,6°')}</F>
            <F x={C[0] + 14} y={C[1] + 62} anchor="start" size={21} color={SECOND}>{num(language, '46,4°')}</F>

            <F x={560} y={110} size={22}>a² = 20² + 21²</F>
            <F x={560} y={165} size={22} color={STAGE}>{trig(language, 'tg B = 20 / 21')}</F>
            <F x={560} y={220} size={22} color={SECOND}>C = 90° − B</F>
        </Figure>
    )
}

/* ---------- 6. The height: inside or outside ---------- */

export function HeightStrategyFigure({ language }: { language: UnitLanguage }) {
    // Left: A = 30°, B = 45° on a base of 10 (the height falls inside)
    const s = 22
    const A: Point = [40, 250]
    const B: Point = [A[0] + 10 * s, 250]
    const h = 10 / (Math.sqrt(3) + 1)
    const H: Point = [A[0] + h * Math.sqrt(3) * s, 250]
    const C: Point = [H[0], 250 - h * s]
    // Right: B obtuse, the height from C falls beyond B
    const A2: Point = [370, 250]
    const B2: Point = [510, 250]
    const C2: Point = [676, 104]
    const H2: Point = [C2[0], 250]
    return (
        <Figure height={330} label={pickText(language, say('Altuera barruan erortzen da angelu zorrotzekin, eta kanpoan oinarriko angelu bat kamutsa denean', 'La altura cae dentro con ángulos agudos, y fuera cuando un ángulo de la base es obtuso', 'يقع الارتفاع داخل المثلث مع الزوايا الحادة، وخارجه عندما تكون زاوية من القاعدة منفرجة', 'The height falls inside with acute angles, and outside when an angle on the base is obtuse'))}>
            <polygon points={points([A, B, C])} fill={STAGE_TINT} stroke={INK} strokeWidth={2.4} strokeLinejoin="round" />
            <line x1={C[0]} y1={C[1]} x2={H[0]} y2={H[1]} stroke={SECOND} strokeWidth={3.4} strokeDasharray="9 6" />
            <RightMark v={H} u={[1, 0]} w={[0, -1]} />
            <InnerArc v={A} p={B} q={C} r={44} />
            <InnerArc v={B} p={A} q={C} r={34} />
            <F x={A[0] + 54} y={A[1] - 8} anchor="start" size={21} color={SECOND}>30°</F>
            <F x={B[0] - 44} y={B[1] - 10} anchor="end" size={21} color={SECOND}>45°</F>
            <F x={H[0] + 10} y={(H[1] + C[1]) / 2 + 8} anchor="start" color={SECOND}>h</F>
            <F x={A[0] - 4} y={A[1] + 30}>A</F>
            <F x={B[0] + 4} y={B[1] + 30}>B</F>
            <F x={C[0]} y={C[1] - 14}>C</F>
            <F x={H[0]} y={H[1] + 30} color={MUTED}>H</F>
            <W x={150} y={310} language={language} text={say('Barruan', 'Dentro', 'في الداخل', 'Inside')} color={INK} />

            <line x1={B2[0]} y1={B2[1]} x2={H2[0] + 18} y2={H2[1]} stroke={MUTED} strokeWidth={2} strokeDasharray="6 6" />
            <polygon points={points([A2, B2, C2])} fill={SOFT} stroke={INK} strokeWidth={2.4} strokeLinejoin="round" />
            <line x1={C2[0]} y1={C2[1]} x2={H2[0]} y2={H2[1]} stroke={SECOND} strokeWidth={3.4} strokeDasharray="9 6" />
            <RightMark v={H2} u={[-1, 0]} w={[0, -1]} />
            <AngleArc v={B2} r={32} from={0} to={direction(B2, C2)} color={STAGE} />
            <F x={B2[0] + 40} y={B2[1] - 12} anchor="start" size={21} color={STAGE}>180° − B</F>
            <F x={H2[0] + 10} y={(H2[1] + C2[1]) / 2 + 8} anchor="start" color={SECOND}>h</F>
            <F x={A2[0] - 4} y={A2[1] + 30}>A</F>
            <F x={B2[0]} y={B2[1] + 30}>B</F>
            <F x={C2[0]} y={C2[1] - 14}>C</F>
            <F x={H2[0] + 8} y={H2[1] + 30} color={MUTED}>H</F>
            <W x={530} y={310} language={language} text={say('Kanpoan', 'Fuera', 'في الخارج', 'Outside')} color={INK} />
        </Figure>
    )
}

/* ---------- 7. The sine rule: each side with its opposite angle ---------- */

export function SineRuleFigure({ language }: { language: UnitLanguage }) {
    const A: Point = [50, 280]
    const B: Point = [330, 280]
    const C: Point = [230, 70]
    const s = trig(language, 'sen')
    return (
        <Figure height={330} label={pickText(language, say('Alde bakoitza eta haren aurkako angelua kolore berean: a eta A, b eta B, c eta C', 'Cada lado y su ángulo opuesto, del mismo color: a y A, b y B, c y C', 'كل ضلع والزاوية المقابلة له باللون نفسه: a وA، وb وB، وc وC', 'Each side and its opposite angle in the same colour: a and A, b and B, c and C'))}>
            <polygon points={points([A, B, C])} fill={PAPER} stroke={INK} strokeWidth={1.6} strokeLinejoin="round" />
            <line x1={B[0]} y1={B[1]} x2={C[0]} y2={C[1]} stroke={SECOND} strokeWidth={5} />
            <line x1={A[0]} y1={A[1]} x2={C[0]} y2={C[1]} stroke={STAGE} strokeWidth={5} />
            <line x1={A[0]} y1={A[1]} x2={B[0]} y2={B[1]} stroke={GREEN} strokeWidth={5} />
            <InnerArc v={A} p={B} q={C} r={42} color={SECOND} />
            <InnerArc v={B} p={A} q={C} r={36} color={STAGE} />
            <InnerArc v={C} p={A} q={B} r={34} color={GREEN} />
            <F x={A[0] - 10} y={A[1] + 26} anchor="end" color={SECOND}>A</F>
            <F x={B[0] + 10} y={B[1] + 26} anchor="start" color={STAGE}>B</F>
            <F x={C[0]} y={C[1] - 16} color={GREEN}>C</F>
            <F x={mid(B, C)[0] + 16} y={mid(B, C)[1]} anchor="start" color={SECOND}>a</F>
            <F x={mid(A, C)[0] - 16} y={mid(A, C)[1]} anchor="end" color={STAGE}>b</F>
            <F x={mid(A, B)[0]} y={A[1] + 30} color={GREEN}>c</F>

            <Frac x={420} y={160} n="a" d={`${s} A`} size={24} color={SECOND} />
            <F x={478} y={170} size={26}>=</F>
            <Frac x={536} y={160} n="b" d={`${s} B`} size={24} color={STAGE} />
            <F x={594} y={170} size={26}>=</F>
            <Frac x={652} y={160} n="c" d={`${s} C`} size={24} color={GREEN} />
            <W x={536} y={270} language={language} text={say('Zenbaki bera hiru aldiz', 'El mismo número tres veces', 'العدد نفسه ثلاث مرات', 'The same number three times')} />
        </Figure>
    )
}

/* ---------- 8. The compass of the ambiguous case ---------- */

export function AmbiguousFigure({ language }: { language: UnitLanguage }) {
    const s = 30
    const A: Point = [50, 270]
    const C = polar(A, 8 * s, 40)
    const height = A[1] - C[1]
    const reach = Math.sqrt((6 * s) ** 2 - height ** 2)
    const near: Point = [C[0] - reach, A[1]]
    const far: Point = [C[0] + reach, A[1]]
    // The compass arc goes counterclockwise from the near crossing, through the bottom, to the far one
    const towardsNear = direction(C, near)
    const towardsFar = direction(C, far)
    return (
        <Figure height={330} label={pickText(language, say('C-tik a = 6 erradioarekin egindako arkuak zuzena bi puntutan ebakitzen du: bi triangelu, B 59,0° eta 121,0°-rekin', 'El arco de radio a = 6 desde C corta la recta en dos puntos: dos triángulos, con B de 59,0° y de 121,0°', 'القوس الذي نصف قطره a = 6 من C يقطع المستقيم في نقطتين: مثلثان، B فيهما 59.0° و121.0°', 'The arc of radius a = 6 from C cuts the line at two points: two triangles, with B of 59.0° and 121.0°'))}>
            <line x1={A[0]} y1={A[1]} x2={470} y2={A[1]} stroke={INK} strokeWidth={2.2} />
            <polygon points={points([A, far, C])} fill={STAGE_TINT} stroke="none" />
            <polygon points={points([A, near, C])} fill={SOFT} stroke="none" />
            <line x1={A[0]} y1={A[1]} x2={C[0]} y2={C[1]} stroke={INK} strokeWidth={3} />
            <AngleArc v={C} r={6 * s} from={towardsNear - 8} to={towardsFar + 8} color={MUTED} width={2} />
            <line x1={C[0]} y1={C[1]} x2={far[0]} y2={far[1]} stroke={STAGE} strokeWidth={3.4} />
            <line x1={C[0]} y1={C[1]} x2={near[0]} y2={near[1]} stroke={SECOND} strokeWidth={3.4} strokeDasharray="10 6" />
            <AngleArc v={A} r={46} from={0} to={40} color={INK} width={2} />
            <Dot p={A} />
            <Dot p={C} />
            <Dot p={near} color={SECOND} r={6} />
            <Dot p={far} color={STAGE} r={6} />
            <F x={A[0] - 4} y={A[1] + 32}>A</F>
            <F x={C[0]} y={C[1] - 14}>C</F>
            <F x={near[0]} y={near[1] + 32} color={SECOND}>B₂</F>
            <F x={far[0]} y={far[1] + 32} color={STAGE}>B₁</F>
            <F x={A[0] + 56} y={A[1] - 10} anchor="start" size={21}>40°</F>
            <F x={mid(A, C)[0] - 14} y={mid(A, C)[1] - 4} anchor="end">b = 8</F>
            <F x={far[0] + 4} y={mid(C, far)[1]} anchor="start" color={STAGE}>a = 6</F>

            <F x={600} y={110} size={22} color={STAGE}>{num(language, 'B₁ ≈ 59,0°')}</F>
            <F x={600} y={160} size={22} color={SECOND}>{num(language, 'B₂ ≈ 121,0°')}</F>
            <W x={600} y={230} language={language} text={say('Bi ebaki,', 'Dos cortes,', 'نقطتا تقاطع،', 'Two crossings,')} color={INK} />
            <W x={600} y={262} language={language} text={say('bi triangelu', 'dos triángulos', 'مثلثان', 'two triangles')} color={INK} />
        </Figure>
    )
}

/* ---------- 9. The circumscribed circle and the diameter ---------- */

export function CircumcircleFigure({ language }: { language: UnitLanguage }) {
    const O: Point = [210, 175]
    const r = 135
    const A = polar(O, r, 100)
    const B = polar(O, r, 205)
    const C = polar(O, r, 330)
    const D = polar(O, r, 25)
    const s = trig(language, 'sen')
    return (
        <Figure height={350} label={pickText(language, say('Triangelua bere zirkunferentzian; B-tiko BD diametroak C-n angelu zuzena duen triangelua ematen du, eta D angeluak A-k beste neurtzen du', 'El triángulo en su circunferencia; el diámetro BD desde B da un triángulo rectángulo en C, y el ángulo D mide lo mismo que A', 'المثلث في دائرته؛ القطر BD من B يعطي مثلثًا قائمًا في C، والزاوية D تساوي A', 'The triangle in its circle; the diameter BD from B gives a triangle with a right angle at C, and angle D equals A'))}>
            <circle cx={O[0]} cy={O[1]} r={r} fill="none" stroke={INK} strokeWidth={2.2} />
            <polygon points={points([A, B, C])} fill={STAGE_TINT} stroke={INK} strokeWidth={2.4} strokeLinejoin="round" />
            <polyline points={points([B, D, C])} fill="none" stroke={GREEN} strokeWidth={2.4} strokeDasharray="9 6" />
            <line x1={B[0]} y1={B[1]} x2={D[0]} y2={D[1]} stroke={GREEN} strokeWidth={3.4} />
            <line x1={B[0]} y1={B[1]} x2={C[0]} y2={C[1]} stroke={SECOND} strokeWidth={4} />
            <RightMark v={C} u={unit(C, B)} w={unit(C, D)} color={GREEN} />
            <InnerArc v={A} p={B} q={C} r={34} color={SECOND} />
            <InnerArc v={D} p={B} q={C} r={34} color={SECOND} />
            <Dot p={O} color={GREEN} />
            <F x={A[0]} y={A[1] - 14}>A</F>
            <F x={B[0] - 12} y={B[1] + 8} anchor="end">B</F>
            <F x={C[0] + 8} y={C[1] + 26} anchor="start">C</F>
            <F x={D[0] + 12} y={D[1]} anchor="start" color={GREEN}>D</F>
            <F x={mid(B, C)[0]} y={mid(B, C)[1] + 30} color={SECOND}>a</F>
            <F x={O[0] - 6} y={O[1] - 14} anchor="end" color={GREEN} size={21}>2R</F>

            <Frac x={500} y={130} n="a" d={`${s} A`} size={26} color={SECOND} />
            <F x={566} y={141} size={28}>= 2R</F>
            <W x={540} y={245} language={language} text={say('BD diametroa da', 'BD es un diámetro', 'BD قطر', 'BD is a diameter')} color={GREEN} />
            <W x={540} y={280} language={language} text={say('eta D = A', 'y D = A', 'وD = A', 'and D = A')} />
        </Figure>
    )
}

/* ---------- 10. The cosine rule from the height ---------- */

export function CosineRuleFigure({ language }: { language: UnitLanguage }) {
    const A: Point = [40, 270]
    const B: Point = [400, 270]
    const C = polar(A, 230, 52)
    const H: Point = [C[0], A[1]]
    return (
        <Figure height={330} label={pickText(language, say('C-tiko altuerak c aldea b · cos A eta c − b · cos A zatitan banatzen du; altuera b · sin A da', 'La altura desde C parte c en b · cos A y c − b · cos A; la altura mide b · sen A', 'يقسم الارتفاع من C الضلع c إلى b · cos A وc − b · cos A، وطول الارتفاع b · sin A', 'The height from C splits c into b · cos A and c − b · cos A; the height is b · sin A'))}>
            <polygon points={points([A, B, C])} fill={SOFT} stroke={INK} strokeWidth={2.4} strokeLinejoin="round" />
            <line x1={C[0]} y1={C[1]} x2={H[0]} y2={H[1]} stroke={SECOND} strokeWidth={3.4} strokeDasharray="9 6" />
            <RightMark v={H} u={[1, 0]} w={[0, -1]} />
            <line x1={A[0]} y1={A[1] + 2} x2={H[0]} y2={H[1] + 2} stroke={STAGE} strokeWidth={5} />
            <line x1={H[0]} y1={H[1] + 2} x2={B[0]} y2={B[1] + 2} stroke={GREEN} strokeWidth={5} />
            <InnerArc v={A} p={B} q={C} r={42} />
            <F x={A[0] - 4} y={A[1] + 32}>A</F>
            <F x={B[0] + 4} y={B[1] + 32}>B</F>
            <F x={C[0]} y={C[1] - 14}>C</F>
            <F x={A[0] + 50} y={A[1] - 12} anchor="start" size={21} color={SECOND}>A</F>
            <F x={mid(A, C)[0] - 14} y={mid(A, C)[1]} anchor="end">b</F>
            <F x={mid(B, C)[0] + 14} y={mid(B, C)[1]} anchor="start">a</F>
            <F x={H[0] + 10} y={(H[1] + C[1]) / 2 + 30} anchor="start" size={21} color={SECOND}>{trig(language, 'b · sen A')}</F>
            <F x={(A[0] + H[0]) / 2} y={A[1] + 32} size={21} color={STAGE}>b · cos A</F>
            <F x={(H[0] + B[0]) / 2 + 10} y={A[1] + 32} size={21} color={GREEN}>c − b · cos A</F>

            <F x={580} y={120} size={23}>a² = b² + c²</F>
            <F x={580} y={165} size={23} color={SECOND}>− 2bc · cos A</F>
            <W x={580} y={240} language={language} text={say('Pitagoras,', 'Pitágoras', 'فيثاغورس', 'Pythagoras')} />
            <W x={580} y={272} language={language} text={say('zuzenketa batekin', 'con una corrección', 'مع تصحيح', 'with a correction')} />
        </Figure>
    )
}

/* ---------- 11. Acute, right and obtuse ---------- */

export function TriangleKindsFigure({ language }: { language: UnitLanguage }) {
    const kinds = [
        { x: 120, apex: 70, word: say('angeluzorrotza', 'acutángulo', 'حاد الزوايا', 'acute'), sign: '<', tint: STAGE_TINT },
        { x: 360, apex: 90, word: say('angeluzuzena', 'rectángulo', 'قائم', 'right-angled'), sign: '=', tint: GREEN_TINT },
        { x: 600, apex: 125, word: say('angelukamutsa', 'obtusángulo', 'منفرج', 'obtuse'), sign: '>', tint: ROSE }
    ]
    return (
        <Figure height={320} label={pickText(language, say('Hiru triangelu: angelu handiena zorrotza, zuzena eta kamutsa; a² txikiagoa, berdina edo handiagoa da b² + c² baino', 'Tres triángulos: el ángulo mayor agudo, recto y obtuso; a² es menor, igual o mayor que b² + c²', 'ثلاثة مثلثات: أكبر زاوية حادة وقائمة ومنفرجة، وa² أصغر من b² + c² أو يساويه أو أكبر منه', 'Three triangles: the largest angle acute, right and obtuse; a² is less than, equal to or greater than b² + c²'))}>
            {kinds.map((kind) => {
                const half = 92
                const Ap: Point = [kind.x, 200 - half / Math.tan(rad(kind.apex / 2))]
                const L: Point = [kind.x - half, 200]
                const R: Point = [kind.x + half, 200]
                return (
                    <g key={kind.sign}>
                        <polygon points={points([L, R, Ap])} fill={kind.tint} stroke={INK} strokeWidth={2.2} strokeLinejoin="round" />
                        <line x1={L[0]} y1={L[1]} x2={R[0]} y2={R[1]} stroke={SECOND} strokeWidth={4.5} />
                        {kind.sign === '=' ? <RightMark v={Ap} u={unit(Ap, L)} w={unit(Ap, R)} /> : <InnerArc v={Ap} p={L} q={R} r={24} color={SECOND} />}
                        <F x={kind.x} y={226} size={21} color={SECOND}>a</F>
                        <F x={kind.x} y={262} size={21}>{`a² ${kind.sign} b² + c²`}</F>
                        <W x={kind.x} y={298} language={language} text={kind.word} color={INK} size={21} />
                    </g>
                )
            })}
        </Figure>
    )
}

/* ---------- 12. The four cases ---------- */

export function FourCasesFigure({ language }: { language: UnitLanguage }) {
    const panels = [
        { x: 0, y: 0, sides: [2], angles: [0, 1], rule: say('sinuak', 'senos', 'الجيوب', 'sines') },
        { x: 360, y: 0, sides: [1, 2], angles: [0], rule: say('kosinua', 'coseno', 'جيب التمام', 'cosine') },
        { x: 0, y: 190, sides: [0, 1, 2], angles: [], rule: say('kosinua', 'coseno', 'جيب التمام', 'cosine') },
        { x: 360, y: 190, sides: [0, 1], angles: [0], rule: say('sinuak: 0, 1 edo 2', 'senos: 0, 1 o 2', 'الجيوب: 0 أو 1 أو 2', 'sines: 0, 1 or 2') }
    ]
    return (
        <Figure height={380} label={pickText(language, say('Lau kasuak: bi angelu eta alde bat, bi alde eta haien arteko angelua, hiru alde, eta bi alde eta aurkako angelu bat', 'Los cuatro casos: dos ángulos y un lado, dos lados y el ángulo que forman, tres lados, y dos lados y un ángulo opuesto', 'الحالات الأربع: زاويتان وضلع، وضلعان والزاوية بينهما، وثلاثة أضلاع، وضلعان وزاوية مقابلة', 'The four cases: two angles and a side, two sides and the angle between them, three sides, and two sides and an opposite angle'))}>
            {panels.map((panel, index) => {
                const A: Point = [panel.x + 70, panel.y + 136]
                const B: Point = [panel.x + 290, panel.y + 136]
                const C: Point = [panel.x + 210, panel.y + 26]
                const vertices = [A, B, C]
                // side i is opposite vertex i: a = BC, b = CA, c = AB
                const sides: [Point, Point][] = [[B, C], [C, A], [A, B]]
                return (
                    <g key={index}>
                        <rect x={panel.x + 12} y={panel.y + 4} width={336} height={182} rx={14} fill={index % 3 === 0 ? PAPER : '#f7f3ea'} stroke={MUTED} strokeWidth={1.2} />
                        <polygon points={points(vertices)} fill="none" stroke={MUTED} strokeWidth={2} strokeLinejoin="round" />
                        {panel.sides.map((side) => <line key={side} x1={sides[side][0][0]} y1={sides[side][0][1]} x2={sides[side][1][0]} y2={sides[side][1][1]} stroke={STAGE} strokeWidth={5} />)}
                        {panel.angles.map((angle) => <InnerArc key={angle} v={vertices[angle]} p={vertices[(angle + 1) % 3]} q={vertices[(angle + 2) % 3]} r={28} />)}
                        <W x={panel.x + 180} y={panel.y + 174} language={language} text={panel.rule} color={INK} size={21} />
                    </g>
                )
            })}
        </Figure>
    )
}

/* ---------- 13. Heron: the semi-perimeter ---------- */

export function HeronFigure({ language }: { language: UnitLanguage }) {
    const A: Point = [60, 200]
    const B: Point = [330, 200]
    const C: Point = [150, 50]
    const y = 262
    const lengths = [5, 6, 7]
    const scale = 600 / 18
    let start = 60
    const bars = lengths.map((length, index) => {
        const bar = { from: start, to: start + length * scale, name: ['a', 'b', 'c'][index], color: [SECOND, STAGE, GREEN][index] }
        start = bar.to
        return bar
    })
    const half = 60 + 300
    return (
        <Figure height={350} label={pickText(language, say('Triangelu baten hiru aldeak lerro batean: perimetroa; erdian, s perimetro-erdia', 'Los tres lados de un triángulo en fila: el perímetro; en medio, el semiperímetro s', 'أضلاع المثلث الثلاثة في صف: المحيط، وفي الوسط نصف المحيط s', 'The three sides of a triangle in a row: the perimeter; in the middle, the semi-perimeter s'))}>
            <polygon points={points([A, B, C])} fill={PAPER} stroke={INK} strokeWidth={1.4} strokeLinejoin="round" />
            <line x1={B[0]} y1={B[1]} x2={C[0]} y2={C[1]} stroke={SECOND} strokeWidth={5} />
            <line x1={A[0]} y1={A[1]} x2={C[0]} y2={C[1]} stroke={STAGE} strokeWidth={5} />
            <line x1={A[0]} y1={A[1]} x2={B[0]} y2={B[1]} stroke={GREEN} strokeWidth={5} />
            <F x={mid(B, C)[0] + 14} y={mid(B, C)[1]} anchor="start" color={SECOND}>a</F>
            <F x={mid(A, C)[0] - 14} y={mid(A, C)[1]} anchor="end" color={STAGE}>b</F>
            <F x={mid(A, B)[0]} y={A[1] + 28} color={GREEN}>c</F>
            <F x={540} y={110} size={23}>S = √(s(s − a)(s − b)(s − c))</F>
            <F x={540} y={160} size={23} color={MUTED}>s = (a + b + c) / 2</F>

            {bars.map((bar) => <line key={bar.name} x1={bar.from} y1={y} x2={bar.to} y2={y} stroke={bar.color} strokeWidth={10} />)}
            {bars.map((bar) => <F key={`${bar.name}-label`} x={(bar.from + bar.to) / 2} y={y - 16} size={21} color={bar.color}>{bar.name}</F>)}
            <line x1={half} y1={y - 34} x2={half} y2={y + 18} stroke={INK} strokeWidth={2.4} />
            <line x1={60} y1={y + 30} x2={half} y2={y + 30} stroke={INK} strokeWidth={2} />
            <F x={(60 + half) / 2} y={y + 56} size={22}>s</F>
            <W x={555} y={y + 56} language={language} text={say('perimetroaren erdia', 'la mitad del perímetro', 'نصف المحيط', 'half the perimeter')} size={21} />
        </Figure>
    )
}

/* ---------- 14. Triangulation ---------- */

export function TriangulationFigure({ language }: { language: UnitLanguage }) {
    const A: Point = [80, 270]
    const B: Point = [380, 270]
    // A = 62°, B = 48°: E where the two sight lines cross
    const tanA = Math.tan(rad(62))
    const tanB = Math.tan(rad(48))
    const x = (B[0] - A[0]) * tanB / (tanA + tanB)
    const E: Point = [A[0] + x, A[1] - x * tanA]
    const s = trig(language, 'sen')
    return (
        <Figure height={330} label={pickText(language, say('Lehorreko AB oinarria eta itsasoko E buia; A eta B erpinetako angeluak neurtzen dira', 'La base AB en tierra y la boya E en el mar; se miden los ángulos en A y en B', 'القاعدة AB على اليابسة والعوامة E في البحر؛ تُقاس الزاويتان عند A وB', 'The base AB on land and the buoy E at sea; the angles at A and B are measured'))}>
            <rect x={20} y={20} width={440} height={240} fill={STAGE_TINT} opacity={0.55} />
            <rect x={20} y={260} width={440} height={50} fill={SOFT} />
            <polygon points={points([A, B, E])} fill="none" stroke={INK} strokeWidth={2.4} strokeLinejoin="round" />
            <line x1={A[0]} y1={A[1]} x2={B[0]} y2={B[1]} stroke={SECOND} strokeWidth={5} />
            <InnerArc v={A} p={B} q={E} r={42} />
            <InnerArc v={B} p={A} q={E} r={42} />
            <circle cx={E[0]} cy={E[1]} r={11} fill={SECOND} stroke={INK} strokeWidth={2} />
            <F x={A[0] - 6} y={A[1] + 30}>A</F>
            <F x={B[0] + 6} y={B[1] + 30}>B</F>
            <F x={E[0] + 18} y={E[1] - 8} anchor="start">E</F>
            <W x={(A[0] + B[0]) / 2} y={A[1] + 32} language={language} text={say('oinarria', 'base', 'القاعدة', 'base')} color={SECOND} size={21} />

            <F x={600} y={110} size={22}>E = 180° − A − B</F>
            <Frac x={555} y={190} n="AE" d={`${s} B`} size={24} color={STAGE} />
            <F x={612} y={200} size={26}>=</F>
            <Frac x={668} y={190} n="AB" d={`${s} E`} size={24} color={SECOND} />
        </Figure>
    )
}

/* ---------- 15. The parallelogram of forces ---------- */

export function ForcesFigure({ language }: { language: UnitLanguage }) {
    const O: Point = [60, 270]
    const theta = 60
    const F1: Point = [O[0] + 220, O[1]]
    const F2 = polar(O, 165, theta)
    const R: Point = [F1[0] + F2[0] - O[0], F1[1] + F2[1] - O[1]]
    const arrow = (from: Point, to: Point, color: string, width = 4) => {
        const u = unit(from, to)
        const n: Point = [-u[1], u[0]]
        const head = [to, [to[0] - 16 * u[0] + 8 * n[0], to[1] - 16 * u[1] + 8 * n[1]], [to[0] - 16 * u[0] - 8 * n[0], to[1] - 16 * u[1] - 8 * n[1]]] as Point[]
        return (
            <g>
                <line x1={from[0]} y1={from[1]} x2={to[0] - 12 * u[0]} y2={to[1] - 12 * u[1]} stroke={color} strokeWidth={width} />
                <polygon points={points(head)} fill={color} />
            </g>
        )
    }
    return (
        <Figure height={330} label={pickText(language, say('Bi indarrek θ angelua osatzen dute; erresultantea paralelogramoaren diagonala da, eta haren triangeluan 180° − θ angelua dago', 'Dos fuerzas forman un ángulo θ; la resultante es la diagonal del paralelogramo, y en su triángulo está el ángulo 180° − θ', 'قوتان بينهما الزاوية θ؛ المحصلة قطر متوازي الأضلاع، وفي مثلثها الزاوية 180° − θ', 'Two forces make an angle θ; the resultant is the diagonal of the parallelogram, and its triangle has the angle 180° − θ'))}>
            <polygon points={points([O, F1, R, F2])} fill={GREEN_TINT} stroke={MUTED} strokeWidth={1.6} strokeDasharray="8 6" />
            {arrow(O, F1, STAGE)}
            {arrow(O, F2, SECOND)}
            {arrow(O, R, INK, 5)}
            <AngleArc v={O} r={40} from={0} to={theta} color={MUTED} />
            <AngleArc v={F1} r={22} from={theta} to={180} color={INK} />
            <F x={O[0] + 46} y={O[1] - 10} anchor="start" size={21} color={MUTED}>θ</F>
            <F x={F1[0] - 28} y={F1[1] - 10} anchor="end" size={21}>180° − θ</F>
            <F x={mid(O, F1)[0]} y={O[1] + 30} color={STAGE}>F₁</F>
            <F x={mid(O, F2)[0] - 12} y={mid(O, F2)[1]} anchor="end" color={SECOND}>F₂</F>
            <F x={R[0] - 6} y={R[1] - 12} anchor="end">R</F>

            <F x={570} y={120} size={23}>R² = F₁² + F₂²</F>
            <F x={570} y={165} size={23} color={SECOND}>+ 2F₁F₂ · cos θ</F>
            <W x={570} y={250} language={language} text={say('Diagonala erresultantea da', 'La diagonal es la resultante', 'القطر هو المحصلة', 'The diagonal is the resultant')} />
        </Figure>
    )
}

/* ---------- The art of the unit's home page ---------- */

export function TrianglesHeroArt() {
    return (
        <div className="fraction-v2-collage" aria-hidden="true">
            <svg viewBox="0 0 520 400" direction="ltr" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                <g transform="translate(24 30) rotate(-4)">
                    <rect width={250} height={210} rx={16} fill={PAPER} stroke={INK} strokeWidth={2} />
                    <circle cx={125} cy={108} r={80} fill="none" stroke={INK} strokeWidth={2} />
                    <polygon points="62,155 196,150 104,32" fill="#dde7f7" stroke={INK} strokeWidth={2.2} strokeLinejoin="round" />
                    <line x1={196} y1={150} x2={104} y2={32} stroke="#c4432a" strokeWidth={4} />
                </g>
                <g transform="translate(300 44) rotate(5)">
                    <rect width={190} height={170} rx={16} fill={SOFT} stroke={INK} strokeWidth={2} />
                    <line x1={20} y1={140} x2={175} y2={140} stroke={INK} strokeWidth={2} />
                    <line x1={20} y1={140} x2={110} y2={50} stroke={INK} strokeWidth={2.4} />
                    <path d="M58 140 A82 82 0 0 1 170 112" fill="none" stroke="#58616e" strokeWidth={2} strokeDasharray="6 5" />
                    <circle cx={74} cy={140} r={6} fill="#c4432a" />
                    <circle cx={160} cy={140} r={6} fill="#2f6fdb" />
                </g>
                <g transform="translate(46 274) rotate(2)">
                    <rect width={430} height={92} rx={16} fill={ROSE} stroke={INK} strokeWidth={2} />
                    <text x={215} y={60} textAnchor="middle" fontSize={28} fontWeight={700} fill={INK} fontFamily={SERIF}>a² = b² + c² − 2bc · cos A</text>
                </g>
            </svg>
        </div>
    )
}
