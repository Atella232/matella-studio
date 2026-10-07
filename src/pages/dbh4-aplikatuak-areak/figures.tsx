import { pickText, type LocalizedText, type UnitLanguage } from '../../features/unit-v2/types'
import { Figure } from '../dbh2-zatikiak-prototype/figures'
import { Label } from '../dbh2-funtzioak-v2/plane'

/* ==========================================================================
   Perimetroak, azalerak eta bolumenak · 4. DBH aplikatuak — the new lesson
   figures: the length of a circle and of an arc, the area formulas of the
   triangle, rhombus, trapezoid and regular polygon side by side, two
   shaded compound areas (square minus circle, window with a semicircle)
   and two compound solids seen from the front (ice cream cone and silo).
   The polygons, Pythagoras, sectors, solids and volumes reuse the 1. and
   2. DBH figures. π ≈ 3,14; Arabic captions carry words only and numbers
   are written with the point there.
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
/** Vertices of a regular polygon; `start` is the screen angle of the first vertex (−90 = top) */
const regular = (cx: number, cy: number, r: number, n: number, start = -90): Point[] =>
    Array.from({ length: n }, (_, index) => [cx + r * Math.cos(rad(start + (360 * index) / n)), cy + r * Math.sin(rad(start + (360 * index) / n))])

function Caption({ x = 360, y, language, text, color = MUTED, size = 15 }: { x?: number; y: number; language: UnitLanguage; text: LocalizedText; color?: string; size?: number }) {
    return <Label x={x} y={y} textAnchor="middle" fontSize={size} fontWeight={700} fill={color}>{pick(language, text)}</Label>
}

function Formula({ x, y, children, color = INK, size = 16 }: { x: number; y: number; children: string; color?: string; size?: number }) {
    return <text x={x} y={y} textAnchor="middle" fontSize={size} fontWeight={700} fill={color} direction="ltr">{children}</text>
}

function Tag({ x, y, children, color = INK, anchor = 'middle', size = 15 }: { x: number; y: number; children: string; color?: string; anchor?: 'start' | 'middle' | 'end'; size?: number }) {
    return <text x={x} y={y} textAnchor={anchor} fontSize={size} fontWeight={700} fill={color} direction="ltr">{children}</text>
}

/** A small right-angle mark at v, with legs along the unit directions u and w */
function RightMark({ v, u, w, s = 10, color = INK }: { v: Point; u: Point; w: Point; s?: number; color?: string }) {
    const p1: Point = [v[0] + s * u[0], v[1] + s * u[1]]
    const p3: Point = [v[0] + s * w[0], v[1] + s * w[1]]
    const p2: Point = [p1[0] + s * w[0], p1[1] + s * w[1]]
    return <polyline points={points([p1, p2, p3])} fill="none" stroke={color} strokeWidth={1.8} />
}

/* ---------- Perimeters: the circle and the arc ---------- */

export function PerimeterFigure({ language }: { language: UnitLanguage }) {
    const cx = 175
    const cy = 120
    const r = 78
    const arcEnd: Point = [545 + r * Math.cos(rad(-90)), cy + r * Math.sin(rad(-90))]
    return (
        <Figure height={300} label={pick(language, say('Zirkunferentziaren luzera eta 90°-ko arkuarena', 'La longitud de la circunferencia y la de un arco de 90°', 'طول الدائرة وطول قوس 90°'))}>
            <circle cx={cx} cy={cy} r={r} fill={STAGE_TINT} stroke={SECOND} strokeWidth={4.5} />
            <line x1={cx} y1={cy} x2={cx + r} y2={cy} stroke={INK} strokeWidth={2.2} />
            <circle cx={cx} cy={cy} r={4} fill={INK} />
            <Tag x={cx + r / 2} y={cy - 10}>r = 3</Tag>
            <Formula x={cx} y={234} color={SECOND}>{num(language, 'L = 2 · 3,14 · 3 = 18,84')}</Formula>
            <Caption x={cx} y={266} language={language} text={say('Zirkunferentzia: 2πr', 'Circunferencia: 2πr', 'محيط الدائرة: 2πr')} size={14} />

            <circle cx={545} cy={cy} r={r} fill={PAPER} stroke={MUTED} strokeWidth={1.6} strokeDasharray="6 5" />
            <path d={`M545 ${cy} L${545 + r} ${cy} A${r} ${r} 0 0 0 ${arcEnd[0]} ${arcEnd[1]} Z`} fill={SOFT} stroke={INK} strokeWidth={1.6} />
            <path d={`M${545 + r} ${cy} A${r} ${r} 0 0 0 ${arcEnd[0]} ${arcEnd[1]}`} fill="none" stroke={SECOND} strokeWidth={5} strokeLinecap="round" />
            <RightMark v={[545, cy]} u={[1, 0]} w={[0, -1]} s={14} />
            <Tag x={545 + r / 2} y={cy + 22}>r = 4</Tag>
            <Formula x={545} y={234} color={SECOND}>{num(language, '2 · 3,14 · 4 · 90 : 360 = 6,28')}</Formula>
            <Caption x={545} y={266} language={language} text={say('Arkua: zirkunferentziaren zatia', 'Arco: la parte de la circunferencia', 'القوس: جزء من محيط الدائرة')} size={14} />
        </Figure>
    )
}

/* ---------- Areas of polygons ---------- */

export function PolygonAreasFigure({ language }: { language: UnitLanguage }) {
    const base = 150
    const hexagon = regular(630, 92, 58, 6, 0)
    const apothemFoot: Point = [(hexagon[1][0] + hexagon[2][0]) / 2, (hexagon[1][1] + hexagon[2][1]) / 2]
    return (
        <Figure height={290} label={pick(language, say('Triangelua, erronboa, trapezioa eta poligono erregularra: azaleren formulak', 'Triángulo, rombo, trapecio y polígono regular: las fórmulas de las áreas', 'المثلث والمعيّن وشبه المنحرف والمضلع المنتظم: صيغ المساحات'))}>
            {/* Triangle */}
            <polygon points={points([[20, base], [150, base], [105, 40]])} fill={STAGE_TINT} stroke={INK} strokeWidth={2.2} strokeLinejoin="round" />
            <line x1={105} y1={40} x2={105} y2={base} stroke={SECOND} strokeWidth={2.2} strokeDasharray="6 4" />
            <RightMark v={[105, base]} u={[-1, 0]} w={[0, -1]} />
            <Tag x={85} y={base + 22}>b</Tag>
            <Tag x={118} y={104} color={SECOND}>h</Tag>
            <Formula x={85} y={214} color={STAGE}>A = b · h / 2</Formula>

            {/* Rhombus */}
            <polygon points={points([[260, 40], [320, 95], [260, base], [200, 95]])} fill={SOFT} stroke={INK} strokeWidth={2.2} strokeLinejoin="round" />
            <line x1={260} y1={40} x2={260} y2={base} stroke={SECOND} strokeWidth={2.2} />
            <line x1={200} y1={95} x2={320} y2={95} stroke={GREEN} strokeWidth={2.2} />
            <Tag x={272} y={68} color={SECOND} anchor="start">D</Tag>
            <Tag x={228} y={88} color={GREEN}>d</Tag>
            <Formula x={260} y={214} color={STAGE}>A = D · d / 2</Formula>

            {/* Trapezoid */}
            <polygon points={points([[365, base], [515, base], [480, 55], [400, 55]])} fill={MINT} stroke={INK} strokeWidth={2.2} strokeLinejoin="round" />
            <line x1={480} y1={55} x2={480} y2={base} stroke={SECOND} strokeWidth={2.2} strokeDasharray="6 4" />
            <RightMark v={[480, base]} u={[-1, 0]} w={[0, -1]} />
            <Tag x={440} y={45}>b</Tag>
            <Tag x={440} y={base + 22}>B</Tag>
            <Tag x={492} y={108} color={SECOND} anchor="start">h</Tag>
            <Formula x={440} y={214} color={STAGE}>A = (B + b) · h / 2</Formula>

            {/* Regular hexagon */}
            <polygon points={points(hexagon)} fill={ROSE} stroke={INK} strokeWidth={2.2} strokeLinejoin="round" />
            {hexagon.map((vertex, index) => <line key={index} x1={630} y1={92} x2={vertex[0]} y2={vertex[1]} stroke={MUTED} strokeWidth={1} />)}
            <line x1={630} y1={92} x2={apothemFoot[0]} y2={apothemFoot[1]} stroke={SECOND} strokeWidth={2.6} />
            <Tag x={612} y={128} color={SECOND}>a</Tag>
            <Tag x={630} y={base + 22}>l</Tag>
            <Formula x={630} y={214} color={STAGE}>A = P · a / 2</Formula>

            <Caption y={262} language={language} text={say('Poligono erregularra: n triangelu berdin, altuera apotema dutenak', 'Polígono regular: n triángulos iguales cuya altura es la apotema', 'المضلع المنتظم: n مثلثات متطابقة ارتفاعها العامد')} size={14} />
        </Figure>
    )
}

/* ---------- Compound areas ---------- */

export function CompositeAreasFigure({ language }: { language: UnitLanguage }) {
    const side = 150
    const x = 100
    const y = 60
    const half = side / 2
    return (
        <Figure height={320} label={pick(language, say('Karratua ken zirkulua, eta leihoa: laukizuzena gehi zirkulu-erdia', 'Cuadrado menos círculo, y la ventana: rectángulo más semicírculo', 'المربع ناقص الدائرة، والنافذة: مستطيل زائد نصف دائرة'))}>
            <rect x={x} y={y} width={side} height={side} fill={SECOND} fillOpacity={0.35} stroke={INK} strokeWidth={2.2} />
            <circle cx={x + half} cy={y + half} r={half} fill={PAPER} stroke={INK} strokeWidth={2.2} />
            <line x1={x + half} y1={y + half} x2={x + side} y2={y + half} stroke={INK} strokeWidth={1.8} />
            <Tag x={x + half + 36} y={y + half - 8}>2</Tag>
            <Tag x={x + half} y={y - 10}>4</Tag>
            <Formula x={x + half} y={272} color={SECOND}>{num(language, '4² − 3,14 · 2² = 3,44')}</Formula>
            <Caption x={x + half} y={302} language={language} text={say('Itzaleztatua: kendu', 'Sombreado: resta', 'المظلّل: اطرح')} size={14} />

            <path d="M450 220 L450 100 A80 80 0 0 1 610 100 L610 220 Z" fill={STAGE_TINT} stroke={INK} strokeWidth={2.2} strokeLinejoin="round" />
            <line x1={450} y1={100} x2={610} y2={100} stroke={STAGE} strokeWidth={1.8} strokeDasharray="6 4" />
            <Tag x={530} y={242}>4</Tag>
            <Tag x={438} y={165} anchor="end">3</Tag>
            <Formula x={530} y={272} color={STAGE}>{num(language, '4 · 3 + 3,14 · 2² : 2 = 18,28')}</Formula>
            <Caption x={530} y={302} language={language} text={say('Leihoa: batu zatiak', 'Ventana: suma las partes', 'النافذة: اجمع الأجزاء')} size={14} />
        </Figure>
    )
}

/* ---------- Compound solids ---------- */

export function CompoundSolidFigure({ language }: { language: UnitLanguage }) {
    const cx = 175
    const top = 84
    const r = 40
    const tip = 244
    const sx = 530
    const sr = 56
    const sTop = 76
    const sBottom = 188
    return (
        <Figure height={330} label={pick(language, say('Izozki-konoa (konoa gehi esfera-erdia) eta siloa (zilindroa gehi bi esfera-erdi)', 'El cucurucho (cono más semiesfera) y el silo (cilindro más dos semiesferas)', 'المثلّجة (مخروط زائد نصف كرة) والصومعة (أسطوانة زائد نصفي كرة)'))}>
            <polygon points={points([[cx - r, top], [cx + r, top], [cx, tip]])} fill={SOFT} stroke={INK} strokeWidth={2.2} strokeLinejoin="round" />
            <path d={`M${cx - r} ${top} A${r} ${r} 0 0 1 ${cx + r} ${top} Z`} fill={ROSE} stroke={INK} strokeWidth={2.2} />
            <ellipse cx={cx} cy={top} rx={r} ry={9} fill="none" stroke={INK} strokeWidth={1.4} strokeDasharray="5 4" />
            <line x1={cx} y1={top} x2={cx + r} y2={top} stroke={SECOND} strokeWidth={2} />
            <line x1={cx} y1={top} x2={cx} y2={tip} stroke={STAGE} strokeWidth={2} strokeDasharray="6 4" />
            <Tag x={cx + r / 2} y={top + 22} color={SECOND}>3</Tag>
            <Tag x={cx + 10} y={180} color={STAGE} anchor="start">12</Tag>
            <Formula x={cx} y={284} size={15}>{num(language, '113,04 + 56,52 = 169,56')}</Formula>
            <Caption x={cx} y={312} language={language} text={say('Konoa + esfera-erdia', 'Cono + semiesfera', 'مخروط + نصف كرة')} size={14} />

            <path d={`M${sx - sr} ${sTop} A${sr} ${sr} 0 0 1 ${sx + sr} ${sTop} L${sx + sr} ${sBottom} A${sr} ${sr} 0 0 1 ${sx - sr} ${sBottom} Z`} fill={MINT} stroke={INK} strokeWidth={2.2} />
            <ellipse cx={sx} cy={sTop} rx={sr} ry={10} fill="none" stroke={INK} strokeWidth={1.4} strokeDasharray="5 4" />
            <ellipse cx={sx} cy={sBottom} rx={sr} ry={10} fill="none" stroke={INK} strokeWidth={1.4} strokeDasharray="5 4" />
            <line x1={sx} y1={sBottom} x2={sx + sr} y2={sBottom} stroke={SECOND} strokeWidth={2} />
            <line x1={sx - sr - 14} y1={sTop} x2={sx - sr - 14} y2={sBottom} stroke={STAGE} strokeWidth={2} />
            <Tag x={sx + sr / 2} y={sBottom - 8} color={SECOND}>5</Tag>
            <Tag x={sx - sr - 22} y={(sTop + sBottom) / 2 + 5} color={STAGE} anchor="end">10</Tag>
            <Formula x={sx} y={284} size={15}>{num(language, '785 + 523,33 ≈ 1308,33')}</Formula>
            <Caption x={sx} y={312} language={language} text={say('Zilindroa + esfera osoa', 'Cilindro + esfera entera', 'أسطوانة + كرة كاملة')} size={14} />
        </Figure>
    )
}

/* ---------- Hero art: a regular hexagon, a cylinder and the formulas ---------- */

export function AreasVolumesHeroArt() {
    const hexagon = regular(140, 130, 78, 6, 0)
    return (
        <div className="fraction-v2-collage" aria-hidden="true">
            <svg viewBox="0 0 520 400" direction="ltr" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                <g transform="translate(10 0) rotate(-4 140 130)">
                    <polygon points={points(hexagon)} fill="#fbebc0" stroke={INK} strokeWidth={2.2} strokeLinejoin="round" />
                    {hexagon.map((vertex, index) => <line key={index} x1={140} y1={130} x2={vertex[0]} y2={vertex[1]} stroke={INK} strokeWidth={1} strokeOpacity={0.5} />)}
                    <line x1={140} y1={130} x2={140} y2={130 + 78 * Math.cos(rad(30))} stroke="#c4432a" strokeWidth={3} />
                </g>
                <g transform="translate(330 40) rotate(4)">
                    <path d="M0 40 L0 200 A70 18 0 0 0 140 200 L140 40" fill="#dde7f7" stroke={INK} strokeWidth={2.2} />
                    <ellipse cx={70} cy={40} rx={70} ry={18} fill={PAPER} stroke={INK} strokeWidth={2.2} />
                    <line x1={70} y1={40} x2={140} y2={40} stroke="#c4432a" strokeWidth={2.4} />
                </g>
                <g transform="translate(40 270) rotate(2)">
                    <rect width={420} height={86} rx={16} fill="#d6eddf" stroke={INK} strokeWidth={2} />
                    <text x={210} y={55} textAnchor="middle" fontSize={28} fontWeight={700} fill={INK} fontFamily={SERIF}>A = πr²    V = πr²h</text>
                </g>
            </svg>
        </div>
    )
}
