import { pickText, type LocalizedText, type UnitLanguage } from '../../features/unit-v2/types'
import { Figure } from '../dbh2-zatikiak-prototype/figures'
import { Label } from '../dbh2-funtzioak-v2/plane'

/* ==========================================================================
   Trigonometria · 4. DBH akademikoak — the lesson figures: the three ratios
   in the 3-4-5 triangle, nested similar triangles, the half square and the
   half equilateral triangle, the triangle of hypotenuse 1, building the
   triangle from one ratio, the calculator keys, solving right triangles,
   elevation and depression, the double observation, the altitude of an
   oblique triangle, the area ½ · b · c · sen A, the unit circle with the
   signs, the related angles and the radian. Spanish writes «sen» and «tg»,
   Basque «sin» and «tg», Arabic «sin» and «tan». Arabic captions carry words
   only and numbers are written with the point there.
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
/** The names of the ratios: sen / sin, tg / tan */
const sen = (language: UnitLanguage) => (language === 'es' ? 'sen' : 'sin')
const tg = (language: UnitLanguage) => (language === 'ar' ? 'tan' : 'tg')
/** A formula with «sen» and «tg» written in the language's names, and its decimal commas */
const trig = (language: UnitLanguage, text: string) => num(language, text.replace(/\bsen\b/g, sen(language)).replace(/\btg\b/g, tg(language)))
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
function RightMark({ v, u, w, s = 12, color = INK }: { v: Point; u: Point; w: Point; s?: number; color?: string }) {
    const p1: Point = [v[0] + s * u[0], v[1] + s * u[1]]
    const p3: Point = [v[0] + s * w[0], v[1] + s * w[1]]
    const p2: Point = [p1[0] + s * w[0], p1[1] + s * w[1]]
    return <polyline points={points([p1, p2, p3])} fill="none" stroke={color} strokeWidth={1.8} />
}

/** An arc marking the angle at v from screen angle `from` to `to` (degrees, counterclockwise) */
function AngleArc({ v, r, from, to, color = SECOND, fill = 'none' }: { v: Point; r: number; from: number; to: number; color?: string; fill?: string }) {
    const a = polar(v, r, from)
    const b = polar(v, r, to)
    const large = to - from > 180 ? 1 : 0
    const path = fill === 'none' ? `M${a[0]} ${a[1]} A${r} ${r} 0 ${large} 0 ${b[0]} ${b[1]}` : `M${v[0]} ${v[1]} L${a[0]} ${a[1]} A${r} ${r} 0 ${large} 0 ${b[0]} ${b[1]} Z`
    return <path d={path} fill={fill} fillOpacity={fill === 'none' ? undefined : 0.35} stroke={color} strokeWidth={2} />
}

/** The screen angle of the direction from p to q (0 = right, 90 = up) */
const direction = (p: Point, q: Point) => (Math.atan2(p[1] - q[1], q[0] - p[0]) * 180) / Math.PI

/* ---------- 1. The three ratios in the 3-4-5 triangle ---------- */

export function RatiosFigure({ language }: { language: UnitLanguage }) {
    const s = 56
    const A: Point = [70, 270]
    const C: Point = [70 + 4 * s, 270]
    const B: Point = [C[0], 270 - 3 * s]
    return (
        <Figure height={330} label={pick(language, say('3, 4 eta 5eko triangelu angeluzuzena: α-ren aurkako katetoa 3, ondokoa 4 eta hipotenusa 5', 'Triángulo rectángulo de lados 3, 4 y 5: el cateto opuesto a α mide 3, el contiguo 4 y la hipotenusa 5', 'مثلث قائم أضلاعه 3 و4 و5: الضلع المقابل لـ α طوله 3 والمجاور 4 والوتر 5'))}>
            <polygon points={points([A, C, B])} fill={STAGE_TINT} stroke={INK} strokeWidth={2.2} strokeLinejoin="round" />
            <line x1={A[0]} y1={A[1]} x2={B[0]} y2={B[1]} stroke={STAGE} strokeWidth={4} />
            <line x1={C[0]} y1={C[1]} x2={B[0]} y2={B[1]} stroke={SECOND} strokeWidth={4} />
            <line x1={A[0]} y1={A[1]} x2={C[0]} y2={C[1]} stroke={GREEN} strokeWidth={4} />
            <RightMark v={C} u={[-1, 0]} w={[0, -1]} />
            <AngleArc v={A} r={40} from={0} to={direction(A, B)} />
            <Formula x={A[0] + 54} y={A[1] - 10} color={SECOND} size={17}>α</Formula>
            <Formula x={(A[0] + B[0]) / 2 - 14} y={(A[1] + B[1]) / 2 - 10} anchor="end" color={STAGE}>5</Formula>
            <Formula x={C[0] + 14} y={(C[1] + B[1]) / 2 + 6} anchor="start" color={SECOND}>3</Formula>
            <Formula x={(A[0] + C[0]) / 2} y={A[1] + 26} color={GREEN}>4</Formula>
            <Caption x={(A[0] + C[0]) / 2} y={A[1] + 50} language={language} text={say('ondoko katetoa', 'cateto contiguo', 'الضلع المجاور')} color={GREEN} size={14} />
            <Caption x={C[0] + 72} y={(C[1] + B[1]) / 2 + 30} language={language} text={say('aurkako katetoa', 'cateto opuesto', 'الضلع المقابل')} color={SECOND} size={14} />
            <Caption x={140} y={150} language={language} text={say('hipotenusa', 'hipotenusa', 'الوتر')} color={STAGE} size={14} />

            <Formula x={560} y={92} color={SECOND} size={18}>{trig(language, 'sen α = 3 / 5 = 0,6')}</Formula>
            <Formula x={560} y={150} color={GREEN} size={18}>{trig(language, 'cos α = 4 / 5 = 0,8')}</Formula>
            <Formula x={560} y={208} color={INK} size={18}>{trig(language, 'tg α = 3 / 4 = 0,75')}</Formula>
            <Caption x={560} y={256} language={language} text={say('aurkakoa · ondokoa · hipotenusa', 'opuesto · contiguo · hipotenusa', 'المقابل · المجاور · الوتر')} size={13} />
        </Figure>
    )
}

/* ---------- 2. Similar triangles: the ratios do not depend on the size ---------- */

export function SimilarRatiosFigure({ language }: { language: UnitLanguage }) {
    const s = 22
    const A: Point = [50, 280]
    const sizes = [4, 8, 12]
    const fills = [SOFT, MINT, STAGE_TINT]
    return (
        <Figure height={330} label={pick(language, say('Angelu bera duten hiru triangelu: 3/5 = 6/10 = 9/15, sinua ez dago tamainaren mende', 'Tres triángulos con el mismo ángulo: 3/5 = 6/10 = 9/15, el seno no depende del tamaño', 'ثلاثة مثلثات لها الزاوية نفسها: 3/5 = 6/10 = 9/15، فالجيب لا يتوقف على الحجم'))}>
            {[...sizes].reverse().map((size, index) => {
                const C: Point = [A[0] + size * s, A[1]]
                const B: Point = [C[0], A[1] - 0.75 * size * s]
                return <polygon key={size} points={points([A, C, B])} fill={fills[2 - index]} stroke={INK} strokeWidth={2} strokeLinejoin="round" />
            })}
            {sizes.map((size) => {
                const C: Point = [A[0] + size * s, A[1]]
                const B: Point = [C[0], A[1] - 0.75 * size * s]
                return (
                    <g key={size}>
                        <RightMark v={C} u={[-1, 0]} w={[0, -1]} s={9} />
                        <Formula x={C[0] + 8} y={(C[1] + B[1]) / 2 + 6} anchor="start" size={14} color={SECOND}>{String(0.75 * size)}</Formula>
                        <Formula x={(A[0] + B[0]) / 2 - 6} y={(A[1] + B[1]) / 2 - 6} anchor="end" size={14} color={STAGE}>{String(1.25 * size)}</Formula>
                    </g>
                )
            })}
            <AngleArc v={A} r={36} from={0} to={direction(A, [A[0] + 4, A[1] - 3])} />
            <Formula x={A[0] + 48} y={A[1] - 8} color={SECOND}>α</Formula>
            <Formula x={A[0] + 12 * s} y={A[1] - 9 * s - 14} color={MUTED} size={14}>90° − α</Formula>
            <AngleArc v={[A[0] + 12 * s, A[1] - 9 * s]} r={30} from={-90} to={direction([A[0] + 12 * s, A[1] - 9 * s], A) - 360} color={MUTED} />

            <Formula x={555} y={104} color={SECOND} size={18}>{trig(language, 'sen α = 3/5 = 6/10 = 9/15')}</Formula>
            <Formula x={555} y={134} size={16} color={MUTED}>{num(language, '= 0,6')}</Formula>
            <Caption x={555} y={176} language={language} text={say('Osagarriak:', 'Complementarios:', 'المتتامّتان:')} size={14} />
            <Formula x={555} y={206} color={INK}>{trig(language, 'sen α = cos (90° − α)')}</Formula>
            <Formula x={555} y={236} color={INK}>{trig(language, 'cos α = sen (90° − α)')}</Formula>
            <Formula x={555} y={276} size={15} color={MUTED}>{trig(language, '0 < sen α < 1')}</Formula>
        </Figure>
    )
}

/* ---------- 3. 30°, 45° and 60°: half a square and half an equilateral triangle ---------- */

export function NotableAnglesFigure({ language }: { language: UnitLanguage }) {
    const s = 120
    const A: Point = [40, 200]
    const C: Point = [A[0] + s, 200]
    const B: Point = [C[0], 200 - s]
    const E: Point = [300, 200]
    const F: Point = [E[0] + s, 200]
    const G: Point = [E[0], 200 - s * Math.sqrt(3)]
    const rows: [string, string, string, string][] = [
        ['sen', '1/2', '√2/2', '√3/2'],
        ['cos', '√3/2', '√2/2', '1/2'],
        ['tg', '√3/3', '1', '√3']
    ]
    return (
        <Figure height={330} label={pick(language, say('Karratu-erdia (45°, aldeak 1 eta √2) eta triangelu aldeberdin-erdia (30° eta 60°, aldeak 1, √3 eta 2), balioen taularekin', 'Medio cuadrado (45°, lados 1 y √2) y medio triángulo equilátero (30° y 60°, lados 1, √3 y 2), con la tabla de valores', 'نصف مربع (45°، أضلاع 1 و√2) ونصف مثلث متساوي الأضلاع (30° و60°، أضلاع 1 و√3 و2) مع جدول القيم'))}>
            <polygon points={points([A, C, B])} fill={SOFT} stroke={INK} strokeWidth={2.2} strokeLinejoin="round" />
            <RightMark v={C} u={[-1, 0]} w={[0, -1]} />
            <AngleArc v={A} r={30} from={0} to={45} />
            <Formula x={A[0] + 44} y={A[1] - 8} size={14} color={SECOND}>45°</Formula>
            <Formula x={(A[0] + C[0]) / 2} y={A[1] + 24}>1</Formula>
            <Formula x={C[0] + 10} y={(C[1] + B[1]) / 2 + 6} anchor="start">1</Formula>
            <Formula x={(A[0] + B[0]) / 2 - 10} y={(A[1] + B[1]) / 2 - 6} anchor="end" color={STAGE}>√2</Formula>

            <polygon points={points([E, F, G])} fill={MINT} stroke={INK} strokeWidth={2.2} strokeLinejoin="round" />
            <polygon points={points([[E[0] - s, 200], E, G])} fill="none" stroke={MUTED} strokeWidth={1.4} strokeDasharray="6 5" />
            <RightMark v={E} u={[1, 0]} w={[0, -1]} />
            <AngleArc v={F} r={30} from={120} to={180} />
            <Formula x={F[0] - 46} y={F[1] - 8} size={14} color={SECOND}>60°</Formula>
            <AngleArc v={G} r={36} from={-90} to={direction(G, F) } />
            <Formula x={G[0] + 14} y={G[1] + 54} size={14} color={SECOND}>30°</Formula>
            <Formula x={(E[0] + F[0]) / 2} y={E[1] + 24}>1</Formula>
            <Formula x={(F[0] + G[0]) / 2 + 12} y={(F[1] + G[1]) / 2} anchor="start" color={STAGE}>2</Formula>
            <Formula x={E[0] - 10} y={(E[1] + G[1]) / 2 + 30} anchor="end">√3</Formula>

            <g transform="translate(470 70)">
                {['', '30°', '45°', '60°'].map((head, index) => <Formula key={index} x={30 + index * 58} y={0} size={15} color={MUTED}>{head}</Formula>)}
                {rows.map((row, r) => row.map((cell, c) => (
                    <Formula key={`${r}-${c}`} x={30 + c * 58} y={44 + r * 44} size={16} color={c === 0 ? SECOND : INK}>{c === 0 ? trig(language, cell) : cell}</Formula>
                )))}
                <line x1={0} y1={14} x2={230} y2={14} stroke={MUTED} strokeWidth={1.2} />
            </g>
            <Caption x={360} y={290} language={language} text={say('Pitagorasekin: √(1² + 1²) = √2 eta √(2² − 1²) = √3', 'Con Pitágoras: √(1² + 1²) = √2 y √(2² − 1²) = √3', 'بفيثاغورس نجد الضلعين √2 و√3')} size={14} />
        </Figure>
    )
}

/* ---------- 4. The triangle of hypotenuse 1 ---------- */

export function FundamentalFigure({ language }: { language: UnitLanguage }) {
    const s = 210
    const angle = 34
    const A: Point = [60, 260]
    const C: Point = [A[0] + s * Math.cos(rad(angle)), 260]
    const B: Point = [C[0], 260 - s * Math.sin(rad(angle))]
    return (
        <Figure height={320} label={pick(language, say('Hipotenusa 1 duen triangeluan katetoak cos α eta sin α dira; Pitagorasekin sin² α + cos² α = 1', 'En el triángulo de hipotenusa 1 los catetos son cos α y sen α; con Pitágoras sen² α + cos² α = 1', 'في المثلث الذي وتره 1 يكون الضلعان القائمان cos α وsin α؛ وبفيثاغورس sin² α + cos² α = 1'))}>
            <polygon points={points([A, C, B])} fill={STAGE_TINT} stroke={INK} strokeWidth={2.2} strokeLinejoin="round" />
            <line x1={A[0]} y1={A[1]} x2={C[0]} y2={C[1]} stroke={GREEN} strokeWidth={4} />
            <line x1={C[0]} y1={C[1]} x2={B[0]} y2={B[1]} stroke={SECOND} strokeWidth={4} />
            <RightMark v={C} u={[-1, 0]} w={[0, -1]} />
            <AngleArc v={A} r={40} from={0} to={angle} />
            <Formula x={A[0] + 54} y={A[1] - 10} color={SECOND}>α</Formula>
            <Formula x={(A[0] + B[0]) / 2 - 12} y={(A[1] + B[1]) / 2 - 10} anchor="end" color={STAGE} size={18}>1</Formula>
            <Formula x={C[0] + 12} y={(C[1] + B[1]) / 2 + 6} anchor="start" color={SECOND}>{trig(language, 'sen α')}</Formula>
            <Formula x={(A[0] + C[0]) / 2} y={A[1] + 26} color={GREEN}>cos α</Formula>

            <Formula x={530} y={96} size={18}>{trig(language, 'sen² α + cos² α = 1')}</Formula>
            <Formula x={530} y={160} size={18}>{trig(language, 'tg α = sen α / cos α')}</Formula>
            <Formula x={530} y={224} size={16} color={MUTED}>{trig(language, '1 + tg² α = 1 / cos² α')}</Formula>
            <Caption x={530} y={270} language={language} text={say('Pitagoras, hipotenusa 1 denean', 'Pitágoras con hipotenusa 1', 'فيثاغورس عندما يكون الوتر 1')} size={14} />
        </Figure>
    )
}

/* ---------- 5. From one ratio to the others: tg α = 12/5 ---------- */

export function OneRatioFigure({ language }: { language: UnitLanguage }) {
    const s = 16
    const A: Point = [80, 270]
    const C: Point = [A[0] + 5 * s, 270]
    const B: Point = [C[0], 270 - 12 * s]
    return (
        <Figure height={320} label={pick(language, say('tg α = 12/5: katetoak 5 eta 12, hipotenusa 13; beraz cos α = 5/13 eta sin α = 12/13', 'tg α = 12/5: catetos 5 y 12, hipotenusa 13; así cos α = 5/13 y sen α = 12/13', 'tan α = 12/5: الضلعان القائمان 5 و12 والوتر 13؛ إذن cos α = 5/13 وsin α = 12/13'))}>
            <polygon points={points([A, C, B])} fill={SOFT} stroke={INK} strokeWidth={2.2} strokeLinejoin="round" />
            <line x1={A[0]} y1={A[1]} x2={B[0]} y2={B[1]} stroke={STAGE} strokeWidth={3} strokeDasharray="8 5" />
            <RightMark v={C} u={[-1, 0]} w={[0, -1]} />
            <AngleArc v={A} r={30} from={0} to={direction(A, B)} />
            <Formula x={A[0] + 30} y={A[1] - 30} color={SECOND} size={15}>α</Formula>
            <Formula x={(A[0] + C[0]) / 2} y={A[1] + 26} color={GREEN}>5</Formula>
            <Formula x={C[0] + 12} y={(C[1] + B[1]) / 2 + 6} anchor="start" color={SECOND}>12</Formula>
            <Formula x={(A[0] + B[0]) / 2 - 12} y={(A[1] + B[1]) / 2} anchor="end" color={STAGE}>13</Formula>

            <Formula x={480} y={70} size={17} color={SECOND}>{trig(language, 'tg α = 12 / 5')}</Formula>
            <Formula x={480} y={122} size={16} color={STAGE}>√(5² + 12²) = √169 = 13</Formula>
            <Formula x={480} y={178} size={17} color={GREEN}>cos α = 5 / 13</Formula>
            <Formula x={480} y={224} size={17} color={SECOND}>{trig(language, 'sen α = 12 / 13')}</Formula>
            <Caption x={480} y={274} language={language} text={say('Marraztu triangelua eta osatu Pitagorasekin', 'Dibuja el triángulo y complétalo con Pitágoras', 'ارسم المثلث وأكمله بفيثاغورس')} size={14} />
        </Figure>
    )
}

/* ---------- 6. The calculator: from the angle to the ratio and back ---------- */

export function CalculatorFigure({ language }: { language: UnitLanguage }) {
    const keys = [['SHIFT', 'DEG', '° ′ ″'], ['sin', 'cos', 'tan'], ['7', '8', '9'], ['4', '5', '6']]
    return (
        <Figure height={340} label={pick(language, say('Kalkulagailua DEG moduan: sin, cos, tan teklak angelutik arrazoira; SHIFT eta tekla bera arrazoitik angelura; ° ′ ″ tekla gradu, minutu eta segundoetara', 'La calculadora en modo DEG: sin, cos, tan del ángulo a la razón; SHIFT y la misma tecla de la razón al ángulo; la tecla ° ′ ″ a grados, minutos y segundos', 'الآلة الحاسبة بوضع DEG: مفاتيح sin وcos وtan من الزاوية إلى النسبة؛ وSHIFT مع المفتاح نفسه من النسبة إلى الزاوية؛ ومفتاح ° ′ ″ للدرجات والدقائق والثواني'))}>
            <rect x={50} y={20} width={230} height={300} rx={22} fill="#2b3442" />
            <rect x={70} y={40} width={190} height={62} rx={8} fill={MINT} />
            <text x={248} y={66} textAnchor="end" fontSize={15} fill={INK} direction="ltr" fontFamily="monospace">tan 22</text>
            <text x={248} y={92} textAnchor="end" fontSize={18} fontWeight={700} fill={INK} direction="ltr" fontFamily="monospace">0.404026</text>
            {keys.map((row, r) => row.map((key, c) => {
                const highlight = key === 'SHIFT' || key === 'tan' || key === '° ′ ″'
                return (
                    <g key={key}>
                        <rect x={70 + c * 66} y={122 + r * 48} width={56} height={36} rx={8} fill={highlight ? SOFT : '#e8e2d6'} />
                        <text x={98 + c * 66} y={146 + r * 48} textAnchor="middle" fontSize={key.length > 3 ? 13 : 16} fontWeight={700} fill={INK} direction="ltr">{key}</text>
                    </g>
                )
            }))}

            <Caption x={510} y={50} language={language} text={say('Angelutik arrazoira', 'Del ángulo a la razón', 'من الزاوية إلى النسبة')} color={STAGE} size={15} />
            <Formula x={510} y={82} size={16}>{trig(language, 'tg 22° ≈ 0,404')}</Formula>
            <Caption x={510} y={134} language={language} text={say('Arrazoitik angelura: SHIFT', 'De la razón al ángulo: SHIFT', 'من النسبة إلى الزاوية: SHIFT')} color={SECOND} size={15} />
            <Formula x={510} y={166} size={16}>{num(language, 'cos α = 0,42 → α ≈ 65,17°')}</Formula>
            <Caption x={510} y={218} language={language} text={say('Gradu, minutu eta segundo', 'Grados, minutos y segundos', 'درجات ودقائق وثوانٍ')} color={GREEN} size={15} />
            <Formula x={510} y={250} size={16}>{num(language, '65,17° ≈ 65° 9′ 55″')}</Formula>
            <Formula x={460} y={290} size={14} color={MUTED}>1° = 60′</Formula>
            <Formula x={560} y={290} size={14} color={MUTED}>1′ = 60″</Formula>
        </Figure>
    )
}

/* ---------- 7–8. Solving a right triangle ---------- */

export function SolveRightFigure({ language, given }: { language: UnitLanguage; given: 'two-sides' | 'side-angle' }) {
    const twoSides = given === 'two-sides'
    const s = twoSides ? 22 : 1.8
    const [adjacent, opposite] = twoSides ? [12, 5] : [115.45, 87]
    const A: Point = [60, 250]
    const C: Point = [A[0] + adjacent * s, 250]
    const B: Point = [C[0], 250 - opposite * s]
    const known = (text: string) => ({ text, color: INK })
    const unknown = (text: string) => ({ text, color: SECOND })
    const labels = twoSides
        ? { hyp: unknown('a = ?'), opp: known('5'), adj: known('12'), alpha: unknown('α = ?'), beta: unknown('β = ?') }
        : { hyp: unknown('a = ?'), opp: known('87'), adj: unknown('c = ?'), alpha: known('37°'), beta: unknown('β = ?') }
    const lines = twoSides
        ? ['a = √(5² + 12²) = 13', 'tg α = 5 / 12 → α ≈ 22,6°', 'β = 90° − α ≈ 67,4°']
        : ['β = 90° − 37° = 53°', 'sen 37° = 87 / a → a ≈ 144,56', 'tg 37° = 87 / c → c ≈ 115,45']
    return (
        <Figure height={320} label={pick(language, twoSides
            ? say('Katetoak 5 eta 12: hipotenusa Pitagorasekin eta angeluak tangentearekin', 'Catetos 5 y 12: la hipotenusa con Pitágoras y los ángulos con la tangente', 'الضلعان القائمان 5 و12: الوتر بفيثاغورس والزاويتان بالظل')
            : say('37°-ko angelua eta 87ko aurkako katetoa: hipotenusa sinuarekin eta beste katetoa tangentearekin', 'Ángulo de 37° y cateto opuesto 87: la hipotenusa con el seno y el otro cateto con la tangente', 'زاوية 37° وضلع مقابل 87: الوتر بالجيب والضلع الآخر بالظل'))}>
            <polygon points={points([A, C, B])} fill={twoSides ? MINT : STAGE_TINT} stroke={INK} strokeWidth={2.2} strokeLinejoin="round" />
            <RightMark v={C} u={[-1, 0]} w={[0, -1]} />
            <AngleArc v={A} r={44} from={0} to={direction(A, B)} />
            <AngleArc v={B} r={30} from={-90} to={direction(B, A) - 360} color={MUTED} />
            <Formula x={A[0] + 60} y={A[1] - 6} anchor="start" color={labels.alpha.color} size={15}>{labels.alpha.text}</Formula>
            <Formula x={B[0] - 14} y={B[1] + 50} anchor="end" color={labels.beta.color} size={15}>{labels.beta.text}</Formula>
            <Formula x={(A[0] + B[0]) / 2 - 14} y={(A[1] + B[1]) / 2 - 10} anchor="end" color={labels.hyp.color}>{labels.hyp.text}</Formula>
            <Formula x={C[0] + 12} y={(C[1] + B[1]) / 2 + 6} anchor="start" color={labels.opp.color}>{labels.opp.text}</Formula>
            <Formula x={(A[0] + C[0]) / 2} y={A[1] + 28} color={labels.adj.color}>{labels.adj.text}</Formula>

            {lines.map((line, index) => <Formula key={line} x={545} y={90 + index * 60} size={16} color={index === 0 ? STAGE : INK}>{trig(language, line)}</Formula>)}
            <Caption x={545} y={286} language={language} text={twoSides ? say('Bi alde → Pitagoras eta tangentea', 'Dos lados → Pitágoras y la tangente', 'ضلعان ← فيثاغورس والظل') : say('Alde bat eta angelu bat → arrazoiak', 'Un lado y un ángulo → las razones', 'ضلع وزاوية ← النسب')} size={14} />
        </Figure>
    )
}

/* ---------- 9. Angles of elevation and depression ---------- */

export function ElevationFigure({ language }: { language: UnitLanguage }) {
    const ground = 270
    const eye: Point = [50, ground]
    const tree: Point = [290, ground]
    const top: Point = [290, ground - 240 * Math.tan(rad(40))]
    const tower: Point = [440, ground - 120]
    const boat: Point = [440 + 120 / Math.tan(rad(30)), ground]
    return (
        <Figure height={334} label={pick(language, say('Goratze-angelua (40°) zuhaitzaren goialdera eta beheratze-angelua (30°) itsasargitik txalupara', 'Ángulo de elevación (40°) hacia la copa del árbol y ángulo de depresión (30°) desde el faro hacia la barca', 'زاوية الارتفاع (40°) نحو قمة الشجرة وزاوية الانخفاض (30°) من المنارة نحو القارب'))}>
            <line x1={20} y1={ground} x2={700} y2={ground} stroke={INK} strokeWidth={2} />
            <line x1={tree[0]} y1={ground} x2={top[0]} y2={top[1]} stroke={GREEN} strokeWidth={6} />
            <circle cx={top[0]} cy={top[1] + 18} r={26} fill={MINT} stroke={GREEN} strokeWidth={2} />
            <line x1={eye[0]} y1={eye[1]} x2={top[0]} y2={top[1]} stroke={SECOND} strokeWidth={2} strokeDasharray="7 5" />
            <AngleArc v={eye} r={52} from={0} to={40} />
            <Formula x={eye[0] + 66} y={eye[1] - 12} anchor="start" size={15} color={SECOND}>40°</Formula>
            <Formula x={(eye[0] + tree[0]) / 2} y={ground + 26}>20 m</Formula>
            <Formula x={tree[0] + 34} y={(ground + top[1]) / 2 + 30} anchor="start" color={GREEN}>h</Formula>
            <Formula x={170} y={40} size={16} color={GREEN}>{trig(language, 'h = 20 · tg 40° ≈ 16,78')}</Formula>
            <Caption x={170} y={318} language={language} text={say('Goratze-angelua', 'Ángulo de elevación', 'زاوية الارتفاع')} color={SECOND} size={14} />

            <rect x={tower[0] - 14} y={tower[1]} width={28} height={ground - tower[1]} fill={ROSE} stroke={INK} strokeWidth={2} />
            <line x1={tower[0]} y1={tower[1]} x2={tower[0] + 200} y2={tower[1]} stroke={MUTED} strokeWidth={1.4} strokeDasharray="5 4" />
            <line x1={tower[0]} y1={tower[1]} x2={boat[0]} y2={boat[1]} stroke={STAGE} strokeWidth={2} strokeDasharray="7 5" />
            <AngleArc v={tower} r={60} from={-30} to={0} color={STAGE} />
            <Formula x={tower[0] + 72} y={tower[1] + 22} anchor="start" size={15} color={STAGE}>30°</Formula>
            <path d={`M${boat[0] - 22} ${ground - 12} L${boat[0] + 22} ${ground - 12} L${boat[0] + 14} ${ground} L${boat[0] - 14} ${ground} Z`} fill={SOFT} stroke={INK} strokeWidth={1.6} />
            <Formula x={tower[0] - 22} y={(tower[1] + ground) / 2} anchor="end">50 m</Formula>
            <Formula x={590} y={92} size={16} color={STAGE}>{trig(language, 'tg 30° = 50 / d')}</Formula>
            <Formula x={(tower[0] + boat[0]) / 2} y={ground + 26} color={STAGE}>d</Formula>
            <Caption x={560} y={318} language={language} text={say('Beheratze-angelua', 'Ángulo de depresión', 'زاوية الانخفاض')} color={STAGE} size={14} />
        </Figure>
    )
}

/* ---------- 10. The double observation ---------- */

export function DoubleObservationFigure({ language }: { language: UnitLanguage }) {
    const ground = 260
    const unit = 22
    const x = 6.43
    const y = 7.66
    const tree: Point = [600, ground]
    const top: Point = [600, ground - y * unit]
    const near: Point = [tree[0] - x * unit, ground]
    const far: Point = [near[0] - 10 * unit, ground]
    return (
        <Figure height={320} label={pick(language, say('Bi neurketa: 25° urrunetik eta 50° 10 m aurrerago; ezezagunak x eta y', 'Dos mediciones: 25° desde lejos y 50° diez metros más cerca; incógnitas x e y', 'قياسان: 25° من بعيد و50° بعد التقدم 10 م؛ والمجهولان x وy'))}>
            <line x1={20} y1={ground} x2={700} y2={ground} stroke={INK} strokeWidth={2} />
            <polygon points={points([far, tree, top])} fill={STAGE_TINT} stroke="none" />
            <line x1={tree[0]} y1={ground} x2={top[0]} y2={top[1]} stroke={GREEN} strokeWidth={6} />
            <circle cx={top[0]} cy={top[1] + 16} r={22} fill={MINT} stroke={GREEN} strokeWidth={2} />
            <line x1={far[0]} y1={far[1]} x2={top[0]} y2={top[1]} stroke={SECOND} strokeWidth={2} strokeDasharray="7 5" />
            <line x1={near[0]} y1={near[1]} x2={top[0]} y2={top[1]} stroke={STAGE} strokeWidth={2} strokeDasharray="7 5" />
            <AngleArc v={far} r={70} from={0} to={25} />
            <Formula x={far[0] + 82} y={far[1] - 10} anchor="start" size={15} color={SECOND}>25°</Formula>
            <AngleArc v={near} r={40} from={0} to={50} color={STAGE} />
            <Formula x={near[0] + 44} y={near[1] - 34} anchor="start" size={15} color={STAGE}>50°</Formula>
            <circle cx={far[0]} cy={far[1]} r={4} fill={INK} />
            <circle cx={near[0]} cy={near[1]} r={4} fill={INK} />
            <Formula x={(far[0] + near[0]) / 2} y={ground + 28}>10 m</Formula>
            <Formula x={(near[0] + tree[0]) / 2} y={ground + 28} color={SECOND}>x</Formula>
            <Formula x={tree[0] + 34} y={(ground + top[1]) / 2 + 30} anchor="start" color={GREEN}>y</Formula>

            <Formula x={250} y={52} size={16}>{trig(language, 'y = x · tg 50°')}</Formula>
            <Formula x={250} y={82} size={16}>{trig(language, 'y = (x + 10) · tg 25°')}</Formula>
            <Formula x={190} y={122} size={16} color={SECOND}>{num(language, 'x ≈ 6,43 m')}</Formula>
            <Formula x={310} y={122} size={16} color={SECOND}>{num(language, 'y ≈ 7,66 m')}</Formula>
        </Figure>
    )
}

/* ---------- 11. An oblique triangle split by its altitude ---------- */

export function ObliqueFigure({ language }: { language: UnitLanguage }) {
    const s = 7
    const A: Point = [70, 260]
    const C: Point = [A[0] + 50 * s, 260]
    const B: Point = polar(A, 37 * s, 32)
    const H: Point = [B[0], 260]
    return (
        <Figure height={320} label={pick(language, say('ABC triangelua: AB = 37, AC = 50 eta A = 32°; altuerak bi triangelu angeluzuzen sortzen ditu', 'Triángulo ABC: AB = 37, AC = 50 y A = 32°; la altura lo divide en dos triángulos rectángulos', 'المثلث ABC: AB = 37 وAC = 50 وA = 32°؛ يقسمه الارتفاع إلى مثلثين قائمين'))}>
            <polygon points={points([A, H, B])} fill={SOFT} stroke="none" />
            <polygon points={points([H, C, B])} fill={MINT} stroke="none" />
            <polygon points={points([A, C, B])} fill="none" stroke={INK} strokeWidth={2.2} strokeLinejoin="round" />
            <line x1={B[0]} y1={B[1]} x2={H[0]} y2={H[1]} stroke={SECOND} strokeWidth={2.4} strokeDasharray="7 5" />
            <RightMark v={H} u={[1, 0]} w={[0, -1]} />
            <AngleArc v={A} r={46} from={0} to={32} />
            <Formula x={A[0] + 58} y={A[1] - 10} anchor="start" size={15} color={SECOND}>32°</Formula>
            <Formula x={A[0] - 10} y={A[1] + 6} anchor="end">A</Formula>
            <Formula x={C[0] + 10} y={C[1] + 6} anchor="start">C</Formula>
            <Formula x={B[0]} y={B[1] - 12}>B</Formula>
            <Formula x={(A[0] + B[0]) / 2 - 12} y={(A[1] + B[1]) / 2 - 8} anchor="end">37</Formula>
            <Formula x={B[0] + 10} y={(B[1] + H[1]) / 2 + 6} anchor="start" color={SECOND}>h</Formula>
            <Formula x={(A[0] + H[0]) / 2} y={A[1] + 26} color={GREEN}>x</Formula>
            <Formula x={(H[0] + C[0]) / 2} y={A[1] + 26} color={GREEN}>50 − x</Formula>
            <Formula x={(B[0] + C[0]) / 2 + 14} y={(B[1] + C[1]) / 2 - 8} anchor="start" color={STAGE}>?</Formula>

            <Formula x={580} y={72} size={15}>{trig(language, 'h = 37 · sen 32° ≈ 19,61')}</Formula>
            <Formula x={580} y={112} size={15}>{num(language, 'x = 37 · cos 32° ≈ 31,38')}</Formula>
            <Formula x={580} y={152} size={15}>{num(language, '50 − x ≈ 18,62')}</Formula>
            <Formula x={580} y={200} size={16} color={STAGE}>{num(language, 'BC = √(h² + 18,62²)')}</Formula>
            <Formula x={580} y={230} size={16} color={STAGE}>{num(language, '≈ 27,04')}</Formula>
        </Figure>
    )
}

/* ---------- 12. The area of a triangle with two sides and the angle between them ---------- */

export function TrigAreaFigure({ language }: { language: UnitLanguage }) {
    const s = 26
    const A: Point = [70, 260]
    const C: Point = [A[0] + 9 * s, 260]
    const B: Point = polar(A, 6 * s, 50)
    const H: Point = [B[0], 260]
    return (
        <Figure height={320} label={pick(language, say('6 eta 9ko aldeak eta 50°-ko angelua: altuera 6 · sin 50° da eta azalera ½ · 9 · 6 · sin 50°', 'Lados 6 y 9 con un ángulo de 50°: la altura es 6 · sen 50° y el área ½ · 9 · 6 · sen 50°', 'ضلعان 6 و9 وزاوية 50°: الارتفاع 6 · sin 50° والمساحة ½ · 9 · 6 · sin 50°'))}>
            <polygon points={points([A, C, B])} fill={STAGE_TINT} stroke={INK} strokeWidth={2.2} strokeLinejoin="round" />
            <line x1={B[0]} y1={B[1]} x2={H[0]} y2={H[1]} stroke={SECOND} strokeWidth={2.4} strokeDasharray="7 5" />
            <RightMark v={H} u={[1, 0]} w={[0, -1]} />
            <AngleArc v={A} r={40} from={0} to={50} />
            <Formula x={A[0] + 48} y={A[1] - 12} anchor="start" size={15} color={SECOND}>50°</Formula>
            <Formula x={(A[0] + B[0]) / 2 - 12} y={(A[1] + B[1]) / 2} anchor="end">6</Formula>
            <Formula x={(A[0] + C[0]) / 2} y={A[1] + 28}>9</Formula>
            <Formula x={B[0] + 10} y={(B[1] + H[1]) / 2 + 6} anchor="start" color={SECOND}>h</Formula>

            <Formula x={530} y={80} size={16} color={SECOND}>{trig(language, 'h = 6 · sen 50°')}</Formula>
            <Formula x={530} y={136} size={17}>{trig(language, 'A = ½ · 9 · 6 · sen 50°')}</Formula>
            <Formula x={530} y={176} size={16} color={STAGE}>{num(language, '≈ 20,68')}</Formula>
            <Formula x={530} y={236} size={16} color={MUTED}>{trig(language, 'A = ½ · b · c · sen A')}</Formula>
        </Figure>
    )
}

/* ---------- 13. The unit circle and the signs ---------- */

export function UnitCircleFigure({ language }: { language: UnitLanguage }) {
    const O: Point = [210, 165]
    const r = 120
    const angle = 143.13
    const P = polar(O, r, angle)
    const quadrant = (x: number, y: number, signs: [string, string, string]) => (
        <g>
            <Formula x={x} y={y} size={13} color={signs[0] === '+' ? GREEN : SECOND}>{`${sen(language)} ${signs[0]}`}</Formula>
            <Formula x={x} y={y + 18} size={13} color={signs[1] === '+' ? GREEN : SECOND}>{`cos ${signs[1]}`}</Formula>
            <Formula x={x} y={y + 36} size={13} color={signs[2] === '+' ? GREEN : SECOND}>{`${tg(language)} ${signs[2]}`}</Formula>
        </g>
    )
    return (
        <Figure height={330} label={pick(language, say('Zirkunferentzia goniometrikoa: P puntuaren abzisa kosinua da eta ordenatua sinua; koadrante bakoitzeko zeinuak', 'Circunferencia goniométrica: la abscisa del punto P es el coseno y la ordenada el seno; los signos en cada cuadrante', 'الدائرة المثلثية: إحداثي النقطة P السيني هو جيب التمام والصادي هو الجيب؛ والإشارات في كل ربع'))}>
            <line x1={O[0] - r - 30} y1={O[1]} x2={O[0] + r + 30} y2={O[1]} stroke={MUTED} strokeWidth={1.4} />
            <line x1={O[0]} y1={O[1] - r - 20} x2={O[0]} y2={O[1] + r + 20} stroke={MUTED} strokeWidth={1.4} />
            <circle cx={O[0]} cy={O[1]} r={r} fill="none" stroke={INK} strokeWidth={2} />
            <AngleArc v={O} r={30} from={0} to={angle} />
            <Formula x={O[0] + 20} y={O[1] - 36} size={15} color={SECOND}>α</Formula>
            <line x1={O[0]} y1={O[1]} x2={P[0]} y2={P[1]} stroke={INK} strokeWidth={2} />
            <line x1={P[0]} y1={P[1]} x2={P[0]} y2={O[1]} stroke={SECOND} strokeWidth={4} />
            <line x1={O[0]} y1={O[1]} x2={P[0]} y2={O[1]} stroke={GREEN} strokeWidth={4} />
            <circle cx={P[0]} cy={P[1]} r={5} fill={INK} />
            <Formula x={P[0] - 10} y={P[1] - 10} anchor="end">P</Formula>
            <Formula x={P[0] + 8} y={(P[1] + O[1]) / 2 + 14} anchor="start" size={14} color={SECOND}>{num(language, '0,6')}</Formula>
            <Formula x={(P[0] + O[0]) / 2} y={O[1] + 22} size={14} color={GREEN}>{num(language, '−0,8')}</Formula>
            <Formula x={O[0] + r + 8} y={O[1] - 8} anchor="start" size={13} color={MUTED}>1</Formula>
            {quadrant(O[0] + 168, O[1] - 104, ['+', '+', '+'])}
            {quadrant(O[0] - 150, O[1] - 104, ['+', '−', '−'])}
            {quadrant(O[0] - 150, O[1] + 64, ['−', '−', '+'])}
            {quadrant(O[0] + 168, O[1] + 64, ['−', '+', '−'])}

            <Formula x={555} y={82} size={16} color={GREEN}>cos α = x</Formula>
            <Formula x={555} y={114} size={16} color={SECOND}>{trig(language, 'sen α = y')}</Formula>
            <Formula x={555} y={146} size={16}>{trig(language, 'tg α = y / x')}</Formula>
            <Formula x={555} y={208} size={15} color={MUTED}>{trig(language, 'sen α = 0,6 → cos α = −0,8')}</Formula>
            <Caption x={555} y={240} language={language} text={say('II. koadrantean', 'en el II cuadrante', 'في الربع الثاني')} size={14} />
        </Figure>
    )
}

/* ---------- 14. Related angles: 180° − α, 180° + α, 360° − α ---------- */

export function RelatedAnglesFigure({ language }: { language: UnitLanguage }) {
    const O: Point = [210, 165]
    const r = 125
    const angles = [30, 150, 210, 330]
    const names = ['α = 30°', '180° − α', '180° + α', '360° − α']
    const colors = [INK, STAGE, SECOND, GREEN]
    const tips = angles.map((angle) => polar(O, r, angle))
    return (
        <Figure height={330} label={pick(language, say('30°, 150°, 210° eta 330° simetrikoak dira: sinuek eta kosinuek balio absolutu bera dute', '30°, 150°, 210° y 330° son simétricos: sus senos y cosenos tienen el mismo valor absoluto', '30° و150° و210° و330° متناظرة: لجيوبها وجيوب تمامها القيمة المطلقة نفسها'))}>
            <line x1={O[0] - r - 30} y1={O[1]} x2={O[0] + r + 30} y2={O[1]} stroke={MUTED} strokeWidth={1.4} />
            <line x1={O[0]} y1={O[1] - r - 20} x2={O[0]} y2={O[1] + r + 20} stroke={MUTED} strokeWidth={1.4} />
            <circle cx={O[0]} cy={O[1]} r={r} fill="none" stroke={INK} strokeWidth={2} />
            <polygon points={points(tips)} fill={STAGE_TINT} fillOpacity={0.5} stroke={MUTED} strokeWidth={1.4} strokeDasharray="6 5" />
            {tips.map((tip, index) => (
                <g key={angles[index]}>
                    <line x1={O[0]} y1={O[1]} x2={tip[0]} y2={tip[1]} stroke={colors[index]} strokeWidth={2.4} />
                    <circle cx={tip[0]} cy={tip[1]} r={5} fill={colors[index]} />
                    <Formula x={tip[0] + (tip[0] > O[0] ? 10 : -10)} y={tip[1] + (tip[1] < O[1] ? -10 : 22)} anchor={tip[0] > O[0] ? 'start' : 'end'} size={14} color={colors[index]}>{names[index]}</Formula>
                </g>
            ))}

            <Formula x={555} y={70} size={15} color={STAGE}>{trig(language, 'sen 150° = sen 30° = 1/2')}</Formula>
            <Formula x={555} y={100} size={15} color={STAGE}>cos 150° = −cos 30°</Formula>
            <Formula x={555} y={150} size={15} color={SECOND}>{trig(language, 'sen 210° = −sen 30° = −1/2')}</Formula>
            <Formula x={555} y={180} size={15} color={SECOND}>{trig(language, 'tg 210° = tg 30°')}</Formula>
            <Formula x={555} y={230} size={15} color={GREEN}>cos 330° = cos 30°</Formula>
            <Formula x={555} y={260} size={15} color={GREEN}>{trig(language, 'sen 330° = −sen 30°')}</Formula>
            <Formula x={555} y={306} size={14} color={MUTED}>1837° = 5 · 360° + 37°</Formula>
        </Figure>
    )
}

/* ---------- 15. The radian ---------- */

export function RadianFigure({ language }: { language: UnitLanguage }) {
    const O: Point = [190, 175]
    const r = 120
    const one = (180 / Math.PI)
    const P = polar(O, r, one)
    const rows: [string, string][] = [['180°', 'π'], ['90°', 'π/2'], ['60°', 'π/3'], ['45°', 'π/4'], ['360°', '2π']]
    return (
        <Figure height={330} label={pick(language, say('Radian bat: arkuaren luzera erradioaren berdina denean (≈ 57,3°); 180° = π rad', 'Un radián: el arco mide lo mismo que el radio (≈ 57,3°); 180° = π rad', 'الراديان: طول القوس يساوي نصف القطر (≈ 57.3°)؛ 180° = π rad'))}>
            <circle cx={O[0]} cy={O[1]} r={r} fill="none" stroke={MUTED} strokeWidth={1.6} />
            <AngleArc v={O} r={r} from={0} to={one} color={STAGE} fill={STAGE_TINT} />
            <path d={`M${O[0] + r} ${O[1]} A${r} ${r} 0 0 0 ${P[0]} ${P[1]}`} fill="none" stroke={SECOND} strokeWidth={5} />
            <line x1={O[0]} y1={O[1]} x2={O[0] + r} y2={O[1]} stroke={INK} strokeWidth={2.4} />
            <line x1={O[0]} y1={O[1]} x2={P[0]} y2={P[1]} stroke={INK} strokeWidth={2.4} />
            <Formula x={O[0] + r / 2} y={O[1] + 24}>r</Formula>
            <Formula x={O[0] + r * Math.cos(rad(one / 2)) + 26} y={O[1] - r * Math.sin(rad(one / 2))} anchor="start" color={SECOND}>r</Formula>
            <Formula x={O[0] + 56} y={O[1] - 20} anchor="start" size={15} color={STAGE}>1 rad</Formula>
            <Formula x={O[0]} y={O[1] + r + 34} size={15} color={MUTED}>{num(language, '1 rad ≈ 57,3°')}</Formula>

            <g transform="translate(470 56)">
                {rows.map(([degrees, radians], index) => (
                    <g key={degrees}>
                        <Formula x={40} y={index * 46} size={17}>{degrees}</Formula>
                        <Formula x={110} y={index * 46} size={17} color={MUTED}>=</Formula>
                        <Formula x={190} y={index * 46} size={17} color={STAGE}>{`${radians} rad`}</Formula>
                    </g>
                ))}
            </g>
            <Caption x={580} y={300} language={language} text={say('Biderkatu π/180 bider', 'Multiplica por π/180', 'اضرب في π/180')} size={14} />
        </Figure>
    )
}

/* ---------- Hero art: a right triangle with its ratios, the unit circle and a radian ---------- */

export function TrigonometryHeroArt() {
    return (
        <div className="fraction-v2-collage" aria-hidden="true">
            <svg viewBox="0 0 520 400" direction="ltr" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                <g transform="translate(20 24) rotate(-4)">
                    <rect width={250} height={200} rx={16} fill={PAPER} stroke={INK} strokeWidth={2} />
                    <polygon points="30,170 210,170 210,50" fill="#dde7f7" stroke={INK} strokeWidth={2.2} strokeLinejoin="round" />
                    <path d="M70 170 A40 40 0 0 0 63.3 148" fill="none" stroke="#c4432a" strokeWidth={2.4} />
                    <polyline points="198,170 198,158 210,158" fill="none" stroke={INK} strokeWidth={1.8} />
                </g>
                <g transform="translate(300 40) rotate(5)">
                    <rect width={190} height={190} rx={16} fill={MINT} stroke={INK} strokeWidth={2} />
                    <circle cx={95} cy={95} r={66} fill="none" stroke={INK} strokeWidth={2} />
                    <line x1={20} y1={95} x2={170} y2={95} stroke={INK} strokeWidth={1.4} />
                    <line x1={95} y1={20} x2={95} y2={170} stroke={INK} strokeWidth={1.4} />
                    <line x1={95} y1={95} x2={142} y2={48} stroke="#c4432a" strokeWidth={2.4} />
                    <line x1={142} y1={48} x2={142} y2={95} stroke="#c4432a" strokeWidth={2.4} strokeDasharray="5 4" />
                </g>
                <g transform="translate(50 270) rotate(2)">
                    <rect width={420} height={90} rx={16} fill={ROSE} stroke={INK} strokeWidth={2} />
                    <text x={210} y={58} textAnchor="middle" fontSize={30} fontWeight={700} fill={INK} fontFamily={SERIF}>sin   cos   tg</text>
                </g>
                <circle cx={470} cy={260} r={18} fill={SOFT} stroke={INK} strokeWidth={2} />
            </svg>
        </div>
    )
}
