import { pickText, type LocalizedText, type UnitLanguage } from '../../features/unit-v2/types'
import { Figure } from '../dbh2-zatikiak-prototype/figures'
import { Label } from '../dbh2-funtzioak-v2/plane'

/* ==========================================================================
   Azalerak, bolumenak eta antzekotasuna · 4. DBH akademikoak — the new
   lesson figures: the circular segment (sector minus triangle) and the
   circular trapezoid, the altitude and leg theorems in the right triangle
   9-16 / 12 / 15-20-25, and the frustum of a cone as a big cone minus the
   small one cut off. The rest reuse the 1., 2. and 4. DBH aplikatuak
   figures. π ≈ 3,14; Arabic captions carry words only and numbers are
   written with the point there.
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
const SERIF = 'Fraunces, serif'

type Point = [number, number]

const say = (eu: string, es: string, ar: string): LocalizedText => ({ eu, es, ar })
const pick = (language: UnitLanguage, text: LocalizedText) => pickText(language, text)
/** A number written with the comma, shown with the point in Arabic */
const num = (language: UnitLanguage, text: string) => (language === 'ar' ? text.replace(/,/g, '.') : text)
const rad = (degrees: number) => (degrees * Math.PI) / 180
const points = (list: Point[]) => list.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ')
/** The point at a screen angle (0 = right, 90 = up) and distance r from c */
const polar = ([cx, cy]: Point, r: number, degrees: number): Point => [cx + r * Math.cos(rad(degrees)), cy - r * Math.sin(rad(degrees))]

function Caption({ x = 360, y, language, text, color = MUTED, size = 15 }: { x?: number; y: number; language: UnitLanguage; text: LocalizedText; color?: string; size?: number }) {
    return <Label x={x} y={y} textAnchor="middle" fontSize={size} fontWeight={700} fill={color}>{pick(language, text)}</Label>
}

function Formula({ x, y, children, color = INK, size = 16, anchor = 'middle' }: { x: number; y: number; children: string; color?: string; size?: number; anchor?: 'start' | 'middle' | 'end' }) {
    return <text x={x} y={y} textAnchor={anchor} fontSize={size} fontWeight={700} fill={color} direction="ltr">{children}</text>
}

/** A small right-angle mark at v, with legs along the unit directions u and w */
function RightMark({ v, u, w, s = 10, color = INK }: { v: Point; u: Point; w: Point; s?: number; color?: string }) {
    const p1: Point = [v[0] + s * u[0], v[1] + s * u[1]]
    const p3: Point = [v[0] + s * w[0], v[1] + s * w[1]]
    const p2: Point = [p1[0] + s * w[0], p1[1] + s * w[1]]
    return <polyline points={points([p1, p2, p3])} fill="none" stroke={color} strokeWidth={1.8} />
}

/* ---------- 3. The circular segment and the circular trapezoid ---------- */

export function SegmentFigure({ language }: { language: UnitLanguage }) {
    const O: Point = [150, 200]
    const r = 130
    const A = polar(O, r, 0)
    const B = polar(O, r, 90)
    const C: Point = [470, 210]
    const R = 190
    const small = 95
    const outer = [polar(C, R, 60), polar(C, R, 120)]
    const inner = [polar(C, small, 60), polar(C, small, 120)]
    return (
        <Figure height={340} label={pick(language, say('Zirkulu-segmentua: 90°-ko sektorea ken triangelua. Trapezio zirkularra: 60°-ko koroa-zatia', 'Segmento circular: el sector de 90° menos el triángulo. Trapecio circular: la parte de 60° de una corona', 'القطعة الدائرية: قطاع 90° ناقص المثلث. شبه المنحرف الدائري: جزء 60° من حلقة'))}>
            <path d={`M${O[0]} ${O[1]} L${A[0]} ${A[1]} A${r} ${r} 0 0 0 ${B[0]} ${B[1]} Z`} fill={PAPER} stroke={INK} strokeWidth={2} />
            <path d={`M${A[0]} ${A[1]} A${r} ${r} 0 0 0 ${B[0]} ${B[1]} Z`} fill={SECOND} fillOpacity={0.35} stroke={SECOND} strokeWidth={2.4} />
            <RightMark v={O} u={[1, 0]} w={[0, -1]} s={14} />
            <Formula x={O[0] + r / 2} y={O[1] + 22}>r = 4</Formula>
            <Formula x={150} y={258} size={15} color={MUTED}>{num(language, '3,14 · 4² : 4 = 12,56')}</Formula>
            <Formula x={150} y={282} size={15} color={MUTED}>4 · 4 : 2 = 8</Formula>
            <Formula x={150} y={308} color={SECOND}>{num(language, '12,56 − 8 = 4,56')}</Formula>
            <Caption x={150} y={334} language={language} text={say('Segmentua: sektorea − triangelua', 'Segmento: sector − triángulo', 'القطعة: القطاع − المثلث')} size={14} />

            <path d={`M${outer[0][0]} ${outer[0][1]} A${R} ${R} 0 0 0 ${outer[1][0]} ${outer[1][1]} L${inner[1][0]} ${inner[1][1]} A${small} ${small} 0 0 1 ${inner[0][0]} ${inner[0][1]} Z`} fill={STAGE_TINT} stroke={INK} strokeWidth={2.2} />
            <line x1={C[0]} y1={C[1]} x2={inner[0][0]} y2={inner[0][1]} stroke={MUTED} strokeWidth={1.4} strokeDasharray="5 4" />
            <line x1={C[0]} y1={C[1]} x2={inner[1][0]} y2={inner[1][1]} stroke={MUTED} strokeWidth={1.4} strokeDasharray="5 4" />
            <circle cx={C[0]} cy={C[1]} r={4} fill={INK} />
            <Formula x={C[0]} y={C[1] - 32} size={14}>60°</Formula>
            <Formula x={polar(C, 150, 60)[0] + 18} y={polar(C, 150, 60)[1]} anchor="start" color={STAGE}>R = 6</Formula>
            <Formula x={polar(C, 70, 60)[0] + 8} y={polar(C, 70, 60)[1] + 8} anchor="start" size={15}>r = 3</Formula>
            <Formula x={C[0]} y={258} size={15} color={MUTED}>{num(language, '3,14 · (6² − 3²) · 60 : 360')}</Formula>
            <Formula x={C[0]} y={308} color={STAGE}>{num(language, '= 14,13')}</Formula>
            <Caption x={C[0]} y={334} language={language} text={say('Trapezio zirkularra: koroaren zatia', 'Trapecio circular: parte de la corona', 'شبه المنحرف الدائري: جزء من الحلقة')} size={14} />
        </Figure>
    )
}

/* ---------- 12. The altitude and leg theorems ---------- */

export function RightTheoremsFigure({ language }: { language: UnitLanguage }) {
    const s = 15
    const left: Point = [60, 220]
    const foot: Point = [60 + 9 * s, 220]
    const right: Point = [60 + 25 * s, 220]
    const top: Point = [foot[0], 220 - 12 * s]
    return (
        <Figure height={320} label={pick(language, say('Hipotenusarekiko altuerak 9 eta 16ko proiekzioak sortzen ditu: h² = 9 · 16 eta b² = 25 · 16', 'La altura sobre la hipotenusa forma las proyecciones 9 y 16: h² = 9 · 16 y b² = 25 · 16', 'الارتفاع على الوتر يكوّن المسقطين 9 و16: h² = 9 · 16 وb² = 25 · 16'))}>
            <polygon points={points([left, right, top])} fill={STAGE_TINT} stroke={INK} strokeWidth={2.2} strokeLinejoin="round" />
            <polygon points={points([left, foot, top])} fill={SOFT} stroke="none" />
            <polygon points={points([left, right, top])} fill="none" stroke={INK} strokeWidth={2.2} strokeLinejoin="round" />
            <line x1={top[0]} y1={top[1]} x2={foot[0]} y2={foot[1]} stroke={SECOND} strokeWidth={2.6} strokeDasharray="7 5" />
            <RightMark v={foot} u={[1, 0]} w={[0, -1]} />
            <RightMark v={top} u={[(left[0] - top[0]) / (15 * s), (left[1] - top[1]) / (15 * s)]} w={[(right[0] - top[0]) / (20 * s), (right[1] - top[1]) / (20 * s)]} s={12} />
            <Formula x={(left[0] + foot[0]) / 2} y={246} color={GREEN}>m = 9</Formula>
            <Formula x={(foot[0] + right[0]) / 2} y={246} color={GREEN}>n = 16</Formula>
            <Formula x={foot[0] + 8} y={150} anchor="start" color={SECOND}>h</Formula>
            <Formula x={(left[0] + top[0]) / 2 - 12} y={(left[1] + top[1]) / 2} anchor="end">c = 15</Formula>
            <Formula x={(right[0] + top[0]) / 2 + 12} y={(right[1] + top[1]) / 2 - 4} anchor="start">b = 20</Formula>
            <line x1={left[0]} y1={276} x2={right[0]} y2={276} stroke={MUTED} strokeWidth={1.4} />
            <Formula x={(left[0] + right[0]) / 2} y={300} size={15} color={MUTED}>a = 25</Formula>

            <Caption x={590} y={70} language={language} text={say('Altueraren teorema', 'Teorema de la altura', 'مبرهنة الارتفاع')} color={SECOND} size={15} />
            <Formula x={590} y={98} color={SECOND}>h² = m · n</Formula>
            <Formula x={590} y={124} size={15}>h² = 9 · 16 = 144</Formula>
            <Caption x={590} y={176} language={language} text={say('Katetoaren teorema', 'Teorema del cateto', 'مبرهنة الضلع القائم')} color={STAGE} size={15} />
            <Formula x={590} y={204} color={STAGE}>b² = a · n</Formula>
            <Formula x={590} y={230} size={15}>b² = 25 · 16 = 400</Formula>
        </Figure>
    )
}

/* ---------- 14. The frustum of a cone ---------- */

export function FrustumFigure({ language }: { language: UnitLanguage }) {
    const s = 22
    const cx = 190
    const base = 250
    const apex: Point = [cx, base - 8 * s]
    const cut = base - 4 * s
    const R = 6 * s
    const r = 3 * s
    return (
        <Figure height={320} label={pick(language, say('Kono-enborra: kono handia ken moztutako kono txikia; x antzekotasunez', 'Tronco de cono: el cono grande menos el pequeño cortado; x por semejanza', 'جذع المخروط: المخروط الكبير ناقص الصغير المقطوع؛ x بالتشابه'))}>
            <polygon points={points([[cx - r, cut], apex, [cx + r, cut]])} fill={PAPER} stroke={MUTED} strokeWidth={1.6} strokeDasharray="6 5" />
            <path d={`M${cx - R} ${base} L${cx - r} ${cut} L${cx + r} ${cut} L${cx + R} ${base} A${R} ${R * 0.18} 0 0 1 ${cx - R} ${base} Z`} fill={STAGE_TINT} stroke={INK} strokeWidth={2.2} strokeLinejoin="round" />
            <ellipse cx={cx} cy={cut} rx={r} ry={r * 0.18} fill={SOFT} stroke={INK} strokeWidth={1.8} />
            <ellipse cx={cx} cy={base} rx={R} ry={R * 0.18} fill="none" stroke={INK} strokeWidth={1.2} strokeDasharray="5 4" />
            <line x1={cx} y1={apex[1]} x2={cx} y2={base} stroke={SECOND} strokeWidth={2} strokeDasharray="6 4" />
            <line x1={cx} y1={base} x2={cx + R} y2={base} stroke={GREEN} strokeWidth={2.2} />
            <line x1={cx} y1={cut} x2={cx + r} y2={cut} stroke={GREEN} strokeWidth={2.2} />
            <Formula x={cx + R + 10} y={base + 6} anchor="start" color={GREEN}>R = 6</Formula>
            <Formula x={cx + r + 10} y={cut + 6} anchor="start" color={GREEN} size={15}>r = 3</Formula>
            <Formula x={cx - 10} y={(cut + base) / 2 + 6} anchor="end" color={SECOND}>4</Formula>
            <Formula x={cx - 10} y={(apex[1] + cut) / 2 + 6} anchor="end" color={MUTED}>x</Formula>

            <Formula x={540} y={74} color={SECOND}>{'x / 3 = (x + 4) / 6 → x = 4'}</Formula>
            <Formula x={540} y={118} size={15}>V = π · 6² · 8 : 3 − π · 3² · 4 : 3</Formula>
            <Formula x={540} y={146} size={15}>= 96π − 12π = 84π</Formula>
            <Formula x={540} y={186} color={STAGE}>{num(language, '84 · 3,14 = 263,76')}</Formula>
            <Caption x={540} y={240} language={language} text={say('Enborra = kono handia − kono txikia', 'Tronco = cono grande − cono pequeño', 'الجذع = المخروط الكبير − المخروط الصغير')} size={14} />
        </Figure>
    )
}

/* ---------- Hero art: a frustum, two similar triangles and k, k², k³ ---------- */

export function AreasSimilarityHeroArt() {
    return (
        <div className="fraction-v2-collage" aria-hidden="true">
            <svg viewBox="0 0 520 400" direction="ltr" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                <g transform="translate(20 20) rotate(-4)">
                    <rect width={240} height={200} rx={16} fill={PAPER} stroke={INK} strokeWidth={2} />
                    <path d="M40 160 L85 70 L155 70 L200 160 A80 14 0 0 1 40 160 Z" fill="#dde7f7" stroke={INK} strokeWidth={2.2} strokeLinejoin="round" />
                    <ellipse cx={120} cy={70} rx={35} ry={7} fill="#fbebc0" stroke={INK} strokeWidth={1.8} />
                    <polyline points="85,70 120,0 155,70" fill="none" stroke="#c4432a" strokeWidth={2} strokeDasharray="6 5" />
                </g>
                <g transform="translate(290 50) rotate(5)">
                    <rect width={200} height={150} rx={16} fill={MINT} stroke={INK} strokeWidth={2} />
                    <polygon points="20,125 70,125 70,90" fill={SOFT} stroke={INK} strokeWidth={2} />
                    <polygon points="80,125 180,125 180,55" fill={ROSE} stroke={INK} strokeWidth={2} />
                </g>
                <g transform="translate(50 270) rotate(2)">
                    <rect width={420} height={90} rx={16} fill="#f6d9d2" stroke={INK} strokeWidth={2} />
                    <text x={210} y={58} textAnchor="middle" fontSize={30} fontWeight={700} fill={INK} fontFamily={SERIF}>k    k²    k³</text>
                </g>
            </svg>
        </div>
    )
}
