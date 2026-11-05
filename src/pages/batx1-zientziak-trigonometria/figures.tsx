import type { ReactNode } from 'react'
import { pickText, type LocalizedText, type UnitLanguage } from '../../features/unit-v2/types'
import { Label } from '../dbh2-funtzioak-v2/plane'
import { Figure, Frac } from '../dbh2-zatikiak-prototype/figures'
import { decimalSeparatorFor } from '../../utils/numberFormat'

/* ==========================================================================
   Formula eta funtzio trigonometrikoak · Batxilergoa 1 · Zientziak — the
   lesson figures: the six ratios on the circle, the unit right triangle of
   the identities, two angles that add up, the signs of the difference,
   the 3-4-5 and 5-12-13 triangles, the double and the half angle on the
   circle, the half-sum and half-difference on a ruler of angles, the lines
   that cut the circle in the equations, the crossings of a wave with a
   line, a wave with amplitude, period and phase shift, and a Ferris wheel
   with its height. Formulas sit in their own <text> (left to right in
   every language); words go through <Label>, and the Arabic captions carry
   words only. Spanish writes «sen», «tg», «cosec» and «cotg», Basque «sin»,
   «tg», «cosec» and «cotg», English and Arabic «sin», «tan», «csc» and
   «cot». Text is 21 px or more on a 720 px wide drawing, so it stays
   readable on a phone.
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
/** A number written with the comma, shown with the point in Arabic and English */
const num = (language: UnitLanguage, text: string) => text.replace(/(\d),(\d)/g, `$1${language === 'ar' ? '.' : decimalSeparatorFor(language)}$2`)

const NAMES: Record<UnitLanguage, { sin: string; tan: string; csc: string; cot: string }> = {
    es: { sin: 'sen', tan: 'tg', csc: 'cosec', cot: 'cotg' },
    eu: { sin: 'sin', tan: 'tg', csc: 'cosec', cot: 'cotg' },
    en: { sin: 'sin', tan: 'tan', csc: 'csc', cot: 'cot' },
    ar: { sin: 'sin', tan: 'tan', csc: 'csc', cot: 'cot' }
}

/** A formula with «sen», «tg», «cosec» and «cotg» written in the language's names, and its decimal commas */
const trig = (language: UnitLanguage, text: string) => {
    const names = NAMES[language]
    return num(language, text
        .replace(/\bcosec\b/g, names.csc)
        .replace(/\bcotg\b/g, names.cot)
        .replace(/\bsen\b/g, names.sin)
        .replace(/\btg\b/g, names.tan))
}
const rad = (degrees: number) => (degrees * Math.PI) / 180
const points = (list: Point[]) => list.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ')
/** The point at a screen angle (0 = right, 90 = up) and distance r from c */
const polar = ([cx, cy]: Point, r: number, degrees: number): Point => [cx + r * Math.cos(rad(degrees)), cy - r * Math.sin(rad(degrees))]

/** A formula written left to right whatever the language */
function F({ x, y, children, size = 22, color = INK, anchor = 'middle' }: { x: number; y: number; children: ReactNode; size?: number; color?: string; anchor?: 'start' | 'middle' | 'end' }) {
    return <text x={x} y={y} textAnchor={anchor} fontSize={size} fontWeight={700} fill={color} direction="ltr">{children}</text>
}

/** Words in the reader's language (Arabic right to left) */
function W({ x, y, language, text, size = 21, color = MUTED, anchor = 'middle' }: { x: number; y: number; language: UnitLanguage; text: LocalizedText; size?: number; color?: string; anchor?: 'start' | 'middle' | 'end' }) {
    return <Label x={x} y={y} textAnchor={anchor} fontSize={size} fontWeight={700} fill={color}>{pickText(language, text)}</Label>
}

/** An arc marking the angle at v from screen angle `from` to `to` (degrees, counterclockwise) */
function AngleArc({ v, r, from, to, color = SECOND, width = 2.6 }: { v: Point; r: number; from: number; to: number; color?: string; width?: number }) {
    const a = polar(v, r, from)
    const b = polar(v, r, to)
    const large = to - from > 180 ? 1 : 0
    return <path d={`M${a[0]} ${a[1]} A${r} ${r} 0 ${large} 0 ${b[0]} ${b[1]}`} fill="none" stroke={color} strokeWidth={width} />
}

function Dot({ p, color = INK, r = 6 }: { p: Point; color?: string; r?: number }) {
    return <circle cx={p[0]} cy={p[1]} r={r} fill={color} stroke={PAPER} strokeWidth={2} />
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

/** A ray from o to the circle at a screen angle, with its point */
function Ray({ o, r, angle, color = INK, dashed = false }: { o: Point; r: number; angle: number; color?: string; dashed?: boolean }) {
    const p = polar(o, r, angle)
    return (
        <g>
            <line x1={o[0]} y1={o[1]} x2={p[0]} y2={p[1]} stroke={color} strokeWidth={3} strokeDasharray={dashed ? '8 6' : undefined} />
            <Dot p={p} color={color} />
        </g>
    )
}

/* ---------- 0. The radian ---------- */

export function RadiansFigure({ language }: { language: UnitLanguage }) {
    const O: Point = [170, 175]
    const r = 120
    const one = 180 / Math.PI
    const P = polar(O, r, one)
    const half = polar(O, r + 22, one / 2)
    const rows: Array<[string, string]> = [['180°', 'π'], ['90°', 'π/2'], ['60°', 'π/3'], ['45°', 'π/4'], ['30°', 'π/6']]
    return (
        <Figure height={350} label={pickText(language, say('Radian bat: arkuak erradioak beste neurtzen du (≈ 57,3°); 180° = π rad', 'Un radián: el arco mide lo mismo que el radio (≈ 57,3°); 180° = π rad', 'الراديان: طول القوس يساوي نصف القطر (≈ 57.3°)؛ 180° = π rad', 'One radian: the arc is as long as the radius (≈ 57.3°); 180° = π rad'))}>
            <circle cx={O[0]} cy={O[1]} r={r} fill="none" stroke={MUTED} strokeWidth={1.8} />
            <path d={`M${O[0]} ${O[1]} L${O[0] + r} ${O[1]} A${r} ${r} 0 0 0 ${P[0]} ${P[1]} Z`} fill={STAGE_TINT} stroke="none" />
            <path d={`M${O[0] + r} ${O[1]} A${r} ${r} 0 0 0 ${P[0]} ${P[1]}`} fill="none" stroke={SECOND} strokeWidth={5} />
            <line x1={O[0]} y1={O[1]} x2={O[0] + r} y2={O[1]} stroke={INK} strokeWidth={3} />
            <line x1={O[0]} y1={O[1]} x2={P[0]} y2={P[1]} stroke={INK} strokeWidth={3} />
            <F x={O[0] + r / 2} y={O[1] + 30} size={22}>r</F>
            <F x={half[0] + 6} y={half[1] + 8} size={22} color={SECOND} anchor="start">r</F>
            <F x={O[0] + 34} y={O[1] - 22} size={22} color={STAGE} anchor="start">1 rad</F>
            <F x={O[0]} y={O[1] + r + 44} size={22} color={MUTED}>{num(language, '1 rad ≈ 57,3°')}</F>
            {rows.map(([degrees, radians], index) => (
                <g key={degrees}>
                    <F x={470} y={70 + index * 50} size={24} anchor="end">{degrees}</F>
                    <F x={500} y={70 + index * 50} size={24} color={MUTED}>=</F>
                    <F x={530} y={70 + index * 50} size={24} color={STAGE} anchor="start">{`${radians} rad`}</F>
                </g>
            ))}
        </Figure>
    )
}

/* ---------- 1. The six ratios ---------- */

export function SixRatiosFigure({ language }: { language: UnitLanguage }) {
    const O: Point = [170, 160]
    const r = 120
    const P: Point = [O[0] + 0.6 * r, O[1] + 0.8 * r]
    const foot: Point = [P[0], O[1]]
    const rows = [
        { left: 'sen α = −4/5', right: 'cosec α = −5/4', color: SECOND },
        { left: 'cos α = 3/5', right: 'sec α = 5/3', color: GREEN },
        { left: 'tg α = −4/3', right: 'cotg α = −3/4', color: STAGE }
    ]
    return (
        <Figure height={344} label={pickText(language, say('Laugarren koadranteko puntua: kosinua 3/5 eta sinua −4/5; ondoan, arrazoi bakoitza eta haren alderantzizkoa', 'Un punto del cuarto cuadrante: coseno 3/5 y seno −4/5; al lado, cada razón y su inversa', 'نقطة في الربع الرابع: جيب التمام 3/5 والجيب −4/5، وبجانبها كل نسبة ومقلوبها', 'A point in the fourth quadrant: cosine 3/5 and sine −4/5; next to it, each ratio and its reciprocal'))}>
            <Circle o={O} r={r} />
            <line x1={O[0]} y1={O[1]} x2={P[0]} y2={P[1]} stroke={INK} strokeWidth={3} />
            <line x1={O[0]} y1={O[1]} x2={foot[0]} y2={foot[1]} stroke={GREEN} strokeWidth={5} />
            <line x1={foot[0]} y1={foot[1]} x2={P[0]} y2={P[1]} stroke={SECOND} strokeWidth={4} />
            <AngleArc v={O} r={24} from={0} to={306.87} color={STAGE} />
            <F x={O[0] - 30} y={O[1] - 26} size={22} color={STAGE}>α</F>
            <Dot p={P} />
            <F x={(O[0] + foot[0]) / 2 + 12} y={O[1] - 12} size={22} color={GREEN}>3/5</F>
            <F x={P[0] + 18} y={(P[1] + foot[1]) / 2 + 8} size={22} color={SECOND} anchor="start">−4/5</F>
            {rows.map((row, index) => {
                const y = 70 + index * 78
                return (
                    <g key={row.left}>
                        <rect x={342} y={y - 32} width={368} height={56} rx={12} fill={index === 1 ? STAGE_TINT : PAPER} stroke={INK} strokeWidth={1.6} />
                        <line x1={526} y1={y - 26} x2={526} y2={y + 18} stroke={MUTED} strokeWidth={1.4} />
                        <F x={434} y={y + 6} size={22} color={row.color}>{trig(language, row.left)}</F>
                        <F x={618} y={y + 6} size={22} color={row.color}>{trig(language, row.right)}</F>
                    </g>
                )
            })}
            <W x={360} y={330} language={language} text={say('Arrazoi bakoitzak eta haren alderantzizkoak zeinu bera dute', 'Cada razón y su inversa tienen el mismo signo', 'لكل نسبة ومقلوبها الإشارة نفسها', 'Each ratio and its reciprocal have the same sign')} />
        </Figure>
    )
}

/* ---------- 2. The right triangle of radius 1 behind the identities ---------- */

export function IdentityFigure({ language }: { language: UnitLanguage }) {
    const A: Point = [60, 250]
    const B: Point = [300, 250]
    const C: Point = [300, 90]
    return (
        <Figure height={330} label={pickText(language, say('1 hipotenusako triangelu angeluzuzena: katetoak kosinua eta sinua dira, eta haien karratuen batura 1 da', 'Un triángulo rectángulo de hipotenusa 1: los catetos son el coseno y el seno, y sus cuadrados suman 1', 'مثلث قائم وتره 1: الضلعان القائمان هما جيب التمام والجيب، ومجموع مربعيهما 1', 'A right triangle with hypotenuse 1: the legs are the cosine and the sine, and their squares add up to 1'))}>
            <polygon points={points([A, B, C])} fill={STAGE_TINT} stroke={INK} strokeWidth={2.4} strokeLinejoin="round" />
            <polyline points={points([[B[0] - 18, B[1]], [B[0] - 18, B[1] - 18], [B[0], B[1] - 18]])} fill="none" stroke={INK} strokeWidth={2} />
            <AngleArc v={A} r={46} from={0} to={33.7} color={SECOND} />
            <F x={A[0] + 60} y={A[1] - 10} size={22} color={SECOND} anchor="start">α</F>
            <F x={164} y={150} size={24}>1</F>
            <F x={180} y={284} size={22} color={GREEN}>{trig(language, 'cos α')}</F>
            <F x={314} y={178} size={22} color={SECOND} anchor="start">{trig(language, 'sen α')}</F>
            <F x={560} y={96} size={28} color={STAGE}>{trig(language, 'sen²α + cos²α = 1')}</F>
            <F x={520} y={186} size={22} anchor="end">{trig(language, 'tg α =')}</F>
            <Frac x={580} y={178} n={trig(language, 'sen α')} d="cos α" size={22} />
            <F x={520} y={276} size={22} anchor="end">{trig(language, 'cotg α =')}</F>
            <Frac x={580} y={268} n="cos α" d={trig(language, 'sen α')} size={22} />
        </Figure>
    )
}

/* ---------- 3. Two angles that add up ---------- */

export function SumAnglesFigure({ language }: { language: UnitLanguage }) {
    const O: Point = [160, 200]
    const r = 140
    const P = polar(O, r, 75)
    const foot: Point = [P[0], O[1]]
    const a = polar(O, 62, 20)
    const b = polar(O, 122, 57)
    return (
        <Figure height={330} label={pickText(language, say('75° angelua 45° eta 30° angeluen batura da; haren sinua puntuaren altuera da', 'El ángulo de 75° es la suma de 45° y 30°; su seno es la altura del punto', 'الزاوية 75° مجموع 45° و30°، وجيبها ارتفاع النقطة', 'The 75° angle is the sum of 45° and 30°; its sine is the height of the point'))}>
            <Circle o={O} r={r} />
            <Ray o={O} r={r} angle={45} color={MUTED} dashed />
            <line x1={foot[0]} y1={foot[1]} x2={P[0]} y2={P[1]} stroke={SECOND} strokeWidth={4} />
            <Ray o={O} r={r} angle={75} />
            <AngleArc v={O} r={44} from={0} to={45} color={STAGE} />
            <AngleArc v={O} r={100} from={45} to={75} color={SECOND} />
            <F x={a[0]} y={a[1] + 8} size={22} color={STAGE}>α</F>
            <F x={b[0]} y={b[1] + 8} size={22} color={SECOND}>β</F>
            <F x={P[0] - 20} y={P[1] - 18} size={21} color={SECOND} anchor="start">{trig(language, 'sen 75°')}</F>
            <F x={520} y={86} size={26}>75° = 45° + 30°</F>
            <F x={455} y={140} size={22} color={STAGE}>α = 45°</F>
            <F x={585} y={140} size={22} color={SECOND}>β = 30°</F>
            <F x={520} y={214} size={23}>{trig(language, 'sen(α + β) =')}</F>
            <F x={520} y={256} size={23} color={SECOND}>{trig(language, 'sen α cos β + cos α sen β')}</F>
        </Figure>
    )
}

/* ---------- 4. The signs of the difference ---------- */

export function FormulaSignsFigure({ language }: { language: UnitLanguage }) {
    const t = (text: string) => trig(language, text)
    const sign = (text: string) => <tspan fill={SECOND}>{text}</tspan>
    return (
        <Figure height={320} label={pickText(language, say('Kenketaren formulak: sinuak eta tangenteak − daramate, kosinuak eta izendatzaileak +', 'Las fórmulas de la resta: el seno y la tangente llevan −, el coseno y el denominador +', 'صيغ الفرق: الجيب والظل بإشارة − وجيب التمام والمقام بإشارة +', 'The difference formulas: the sine and the tangent carry −, the cosine and the denominator +'))}>
            <W x={360} y={40} language={language} text={say('Kenketan zeinuak aldatzen dira', 'En la resta cambian los signos', 'في الفرق تتغير الإشارات', 'In the difference the signs change')} size={22} />
            <rect x={60} y={66} width={600} height={56} rx={12} fill={PAPER} stroke={INK} strokeWidth={1.6} />
            <F x={360} y={102} size={23}>{t('sen(α ')}{sign('−')}{t(' β) = sen α cos β ')}{sign('−')}{t(' cos α sen β')}</F>
            <rect x={60} y={134} width={600} height={56} rx={12} fill={PAPER} stroke={INK} strokeWidth={1.6} />
            <F x={360} y={170} size={23}>cos(α {sign('−')} β) = cos α cos β {sign('+')}{t(' sen α sen β')}</F>
            <rect x={60} y={202} width={600} height={100} rx={12} fill={STAGE_TINT} stroke={INK} strokeWidth={1.6} />
            <F x={300} y={260} size={23} anchor="end">{t('tg(α ')}{sign('−')}{' β) ='}</F>
            <Frac x={420} y={252} n={t('tg α − tg β')} d={t('1 + tg α · tg β')} size={23} color={STAGE} />
        </Figure>
    )
}

/* ---------- 5. The 3-4-5 and 5-12-13 triangles ---------- */

export function KnownRatiosFigure({ language }: { language: UnitLanguage }) {
    const A: Point = [50, 250]
    const B: Point = [210, 250]
    const C: Point = [210, 130]
    const D: Point = [370, 250]
    const E: Point = [440, 250]
    const G: Point = [440, 82]
    const right = (v: Point) => <polyline points={points([[v[0] - 16, v[1]], [v[0] - 16, v[1] - 16], [v[0], v[1] - 16]])} fill="none" stroke={INK} strokeWidth={2} />
    return (
        <Figure height={330} label={pickText(language, say('3, 4 eta 5 aldeak dituen triangeluan α angelua, eta 5, 12 eta 13 aldeak dituenean β angelua', 'El ángulo α en el triángulo de lados 3, 4 y 5, y el ángulo β en el de lados 5, 12 y 13', 'الزاوية α في المثلث الذي أضلاعه 3 و4 و5، والزاوية β في الذي أضلاعه 5 و12 و13', 'The angle α in the triangle with sides 3, 4 and 5, and the angle β in the one with sides 5, 12 and 13'))}>
            <polygon points={points([A, B, C])} fill={STAGE_TINT} stroke={INK} strokeWidth={2.2} strokeLinejoin="round" />
            {right(B)}
            <AngleArc v={A} r={40} from={0} to={36.87} color={STAGE} />
            <F x={A[0] + 50} y={A[1] - 8} size={22} color={STAGE} anchor="start">α</F>
            <F x={130} y={282} size={22}>4</F>
            <F x={222} y={198} size={22} anchor="start">3</F>
            <F x={118} y={176} size={22}>5</F>
            <polygon points={points([D, E, G])} fill={ROSE} stroke={INK} strokeWidth={2.2} strokeLinejoin="round" />
            {right(E)}
            <AngleArc v={D} r={34} from={0} to={67.38} color={SECOND} />
            <F x={D[0] + 32} y={D[1] - 30} size={22} color={SECOND} anchor="start">β</F>
            <F x={405} y={282} size={22}>5</F>
            <F x={452} y={174} size={22} anchor="start">12</F>
            <F x={386} y={160} size={22} anchor="end">13</F>
            <F x={608} y={100} size={22} color={STAGE}>{trig(language, 'sen α = 3/5')}</F>
            <F x={608} y={138} size={22} color={STAGE}>cos α = 4/5</F>
            <F x={608} y={200} size={22} color={SECOND}>cos β = 5/13</F>
            <F x={608} y={238} size={22} color={SECOND}>{trig(language, 'sen β = 12/13')}</F>
            <W x={360} y={318} language={language} text={say('Bi angeluak zorrotzak dira: arrazoi guztiak positiboak', 'Los dos ángulos son agudos: todas las razones, positivas', 'الزاويتان حادتان: كل النسب موجبة', 'Both angles are acute: every ratio is positive')} />
        </Figure>
    )
}

/* ---------- 6. The double angle on the circle ---------- */

export function DoubleAngleFigure({ language }: { language: UnitLanguage }) {
    const O: Point = [180, 170]
    const r = 125
    const alpha = 180 - 36.87
    const a = polar(O, 50, 70)
    const b = polar(O, 84, 205)
    return (
        <Figure height={340} label={pickText(language, say('Bigarren koadranteko α angelua eta laugarren koadrantean amaitzen den 2α angelua', 'El ángulo α del segundo cuadrante y el ángulo 2α, que acaba en el cuarto', 'الزاوية α في الربع الثاني والزاوية 2α التي تنتهي في الربع الرابع', 'The angle α in the second quadrant and the angle 2α, which ends in the fourth'))}>
            <Circle o={O} r={r} />
            <AngleArc v={O} r={36} from={0} to={alpha} color={STAGE} />
            <AngleArc v={O} r={64} from={0} to={2 * alpha} color={SECOND} />
            <Ray o={O} r={r} angle={alpha} color={STAGE} />
            <Ray o={O} r={r} angle={2 * alpha} color={SECOND} />
            <F x={a[0]} y={a[1] + 8} size={22} color={STAGE}>α</F>
            <F x={b[0]} y={b[1] + 8} size={22} color={SECOND}>2α</F>
            <F x={430} y={96} size={24} color={STAGE} anchor="start">α</F>
            <W x={590} y={96} language={language} text={say('bigarren koadrantea', 'segundo cuadrante', 'الربع الثاني', 'second quadrant')} />
            <F x={430} y={146} size={24} color={SECOND} anchor="start">2α</F>
            <W x={590} y={146} language={language} text={say('laugarren koadrantea', 'cuarto cuadrante', 'الربع الرابع', 'fourth quadrant')} />
            <F x={560} y={226} size={22}>{trig(language, 'sen 2α = 2 sen α cos α')}</F>
            <F x={560} y={270} size={22}>{trig(language, 'cos 2α = cos²α − sen²α')}</F>
        </Figure>
    )
}

/* ---------- 7. The half angle on the circle ---------- */

export function HalfAngleFigure({ language }: { language: UnitLanguage }) {
    const O: Point = [180, 175]
    const r = 125
    const alpha = 106.26
    const a = polar(O, 48, 128)
    const b = polar(O, 86, 26)
    return (
        <Figure height={330} label={pickText(language, say('α angelua bigarren koadrantean dago, eta haren erdia, lehenengoan', 'El ángulo α está en el segundo cuadrante y su mitad, en el primero', 'الزاوية α في الربع الثاني ونصفها في الربع الأول', 'The angle α is in the second quadrant and its half in the first'))}>
            <rect x={O[0]} y={O[1] - r} width={r} height={r} fill={STAGE_TINT} opacity={0.6} />
            <Circle o={O} r={r} />
            <AngleArc v={O} r={36} from={0} to={alpha} color={STAGE} />
            <AngleArc v={O} r={70} from={0} to={alpha / 2} color={SECOND} />
            <Ray o={O} r={r} angle={alpha} color={STAGE} />
            <Ray o={O} r={r} angle={alpha / 2} color={SECOND} />
            <F x={a[0]} y={a[1] + 8} size={22} color={STAGE}>α</F>
            <F x={b[0]} y={b[1] + 8} size={22} color={SECOND}>α/2</F>
            <F x={540} y={90} size={24} color={STAGE}>90° &lt; α &lt; 180°</F>
            <F x={540} y={132} size={24} color={MUTED}>↓</F>
            <F x={540} y={176} size={24} color={SECOND}>45° &lt; α/2 &lt; 90°</F>
            <W x={540} y={234} language={language} text={say('lehen koadrantea:', 'primer cuadrante:', 'الربع الأول:', 'first quadrant:')} />
            <W x={540} y={266} language={language} text={say('sinua eta kosinua, positiboak', 'seno y coseno, positivos', 'الجيب وجيب التمام موجبان', 'sine and cosine, positive')} />
        </Figure>
    )
}

/* ---------- 8. The half-sum and the half-difference ---------- */

export function SumToProductFigure({ language }: { language: UnitLanguage }) {
    const x = (degrees: number) => 60 + (degrees * 600) / 90
    const axis = 150
    const brace = (x1: number, x2: number, y: number) => `M${x1} ${y} Q ${x1} ${y - 14} ${x1 + 14} ${y - 14} L ${(x1 + x2) / 2 - 10} ${y - 14} Q ${(x1 + x2) / 2} ${y - 14} ${(x1 + x2) / 2} ${y - 26} Q ${(x1 + x2) / 2} ${y - 14} ${(x1 + x2) / 2 + 10} ${y - 14} L ${x2 - 14} ${y - 14} Q ${x2} ${y - 14} ${x2} ${y}`
    return (
        <Figure height={320} label={pickText(language, say('15° eta 75° angeluen batura-erdia 45° da, eta kendura-erdia 30°', 'La semisuma de 15° y 75° es 45° y la semidiferencia, 30°', 'نصف مجموع 15° و75° هو 45° ونصف فرقهما 30°', 'The half-sum of 15° and 75° is 45° and the half-difference 30°'))}>
            <line x1={x(0)} y1={axis} x2={x(90)} y2={axis} stroke={INK} strokeWidth={2.4} />
            {[0, 15, 45, 75, 90].map((degrees) => <line key={degrees} x1={x(degrees)} y1={axis - 8} x2={x(degrees)} y2={axis + 8} stroke={INK} strokeWidth={2} />)}
            {[0, 90].map((degrees) => <F key={degrees} x={x(degrees)} y={axis + 36} size={21} color={MUTED}>{`${degrees}°`}</F>)}
            <path d={brace(x(15), x(45), axis - 18)} fill="none" stroke={MUTED} strokeWidth={2} />
            <path d={brace(x(45), x(75), axis - 18)} fill="none" stroke={SECOND} strokeWidth={2.4} />
            <F x={(x(15) + x(45)) / 2} y={axis - 52} size={22} color={MUTED}>30°</F>
            <F x={(x(45) + x(75)) / 2} y={axis - 52} size={22} color={SECOND}>30°</F>
            <W x={(x(45) + x(75)) / 2} y={axis - 86} language={language} text={say('kendura-erdia', 'semidiferencia', 'نصف الفرق', 'half-difference')} color={SECOND} />
            <Dot p={[x(15), axis]} color={STAGE} r={8} />
            <Dot p={[x(75), axis]} color={STAGE} r={8} />
            <Dot p={[x(45), axis]} color={GREEN} r={9} />
            <F x={x(15)} y={axis + 36} size={22} color={STAGE}>B = 15°</F>
            <F x={x(75)} y={axis + 36} size={22} color={STAGE}>A = 75°</F>
            <F x={x(45)} y={axis + 36} size={22} color={GREEN}>45°</F>
            <W x={x(45)} y={axis + 68} language={language} text={say('batura-erdia', 'semisuma', 'نصف المجموع', 'half-sum')} color={GREEN} />
            <F x={360} y={296} size={22}>{trig(language, 'sen A + sen B = 2 sen 45° · cos 30°')}</F>
        </Figure>
    )
}

/* ---------- 9. The lines that cut the circle ---------- */

type EquationKind = 'basic' | 'quadratic' | 'factored'

export function EquationCircleFigure({ language, kind }: { language: UnitLanguage; kind: EquationKind }) {
    const O: Point = [190, 180]
    const r = 125
    const t = (text: string) => trig(language, text)
    /** The chord where the line cuts the circle, a little longer on each side (a tangent line, a short dash) */
    const reach = (value: number) => Math.max(r * Math.sqrt(1 - value * value), 30) + 8
    const horizontal = (sine: number, color: string) => <line x1={O[0] - reach(sine)} y1={O[1] - sine * r} x2={O[0] + reach(sine)} y2={O[1] - sine * r} stroke={color} strokeWidth={2.6} strokeDasharray="9 6" />
    const vertical = (cosine: number, color: string) => <line x1={O[0] + cosine * r} y1={O[1] - reach(cosine)} x2={O[0] + cosine * r} y2={O[1] + reach(cosine)} stroke={color} strokeWidth={2.6} strokeDasharray="9 6" />
    const mark = (angle: number, color: string) => {
        const p = polar(O, r, angle)
        const spot = polar(O, r + 34, angle)
        const onAxis = angle === 90 || angle === 270
        return (
            <g key={angle}>
                <Dot p={p} color={color} r={7} />
                <F x={onAxis ? spot[0] + 34 : spot[0]} y={spot[1] + 8} size={21} color={color}>{`${angle}°`}</F>
            </g>
        )
    }
    const sets: Record<EquationKind, { lines: ReactNode; marks: Array<[number, string]>; legend: Array<[string, string, string]>; label: LocalizedText }> = {
        basic: {
            lines: vertical(-0.5, SECOND),
            marks: [[120, SECOND], [240, SECOND]],
            legend: [[t('cos x = −1/2'), '120°, 240°', SECOND]],
            label: say('x = −1/2 zuzenak zirkunferentzia 120° eta 240° angeluetan ebakitzen du', 'La recta x = −1/2 corta la circunferencia en 120° y 240°', 'يقطع المستقيم x = −1/2 الدائرة عند 120° و240°', 'The line x = −1/2 cuts the circle at 120° and 240°')
        },
        quadratic: {
            lines: <g>{horizontal(1, STAGE)}{horizontal(-0.5, SECOND)}</g>,
            marks: [[90, STAGE], [210, SECOND], [330, SECOND]],
            legend: [[t('sen x = 1'), '90°', STAGE], [t('sen x = −1/2'), '210°, 330°', SECOND]],
            label: say('y = 1 zuzenak zirkunferentzia 90° angeluan ukitzen du, eta y = −1/2 zuzenak 210° eta 330° angeluetan ebakitzen du', 'La recta y = 1 toca la circunferencia en 90° y la recta y = −1/2 la corta en 210° y 330°', 'المستقيم y = 1 يمس الدائرة عند 90° والمستقيم y = −1/2 يقطعها عند 210° و330°', 'The line y = 1 touches the circle at 90° and the line y = −1/2 cuts it at 210° and 330°')
        },
        factored: {
            lines: <g>{vertical(0, STAGE)}{horizontal(0.5, SECOND)}</g>,
            marks: [[90, STAGE], [270, STAGE], [30, SECOND], [150, SECOND]],
            legend: [['cos x = 0', '90°, 270°', STAGE], [t('sen x = 1/2'), '30°, 150°', SECOND]],
            label: say('x = 0 zuzenak 90° eta 270° ematen ditu, eta y = 1/2 zuzenak 30° eta 150°', 'La recta x = 0 da 90° y 270°, y la recta y = 1/2, 30° y 150°', 'المستقيم x = 0 يعطي 90° و270°، والمستقيم y = 1/2 يعطي 30° و150°', 'The line x = 0 gives 90° and 270°, and the line y = 1/2 gives 30° and 150°')
        }
    }
    const set = sets[kind]
    return (
        <Figure height={360} label={pickText(language, set.label)}>
            <Circle o={O} r={r} />
            {set.lines}
            {set.marks.map(([angle, color]) => mark(angle, color))}
            {set.legend.map(([equation, angles, color], index) => (
                <g key={equation}>
                    <rect x={430} y={70 + index * 120} width={260} height={96} rx={12} fill={PAPER} stroke={color} strokeWidth={2} />
                    <F x={560} y={108 + index * 120} size={23} color={color}>{equation}</F>
                    <F x={560} y={146 + index * 120} size={22}>{angles}</F>
                </g>
            ))}
            <F x={560} y={kind === 'basic' ? 220 : 340} size={22} color={MUTED}>+ k · 360°</F>
        </Figure>
    )
}

/* ---------- 10. A wave and a line ---------- */

/** Points of y = f(x) between two values, for a polyline */
const sample = (f: (x: number) => number, from: number, to: number, toScreen: (x: number, y: number) => Point) =>
    points(Array.from({ length: 241 }, (_, index) => {
        const x = from + ((to - from) * index) / 240
        return toScreen(x, f(x))
    }))

export function CrossingsFigure({ language }: { language: UnitLanguage }) {
    const sx = (x: number) => 60 + (x * 600) / (4 * Math.PI)
    const sy = (y: number) => 150 - y * 90
    const at = (x: number, y: number): Point => [sx(x), sy(y)]
    const cuts = [Math.PI / 6, (5 * Math.PI) / 6, (13 * Math.PI) / 6, (17 * Math.PI) / 6]
    return (
        <Figure height={350} label={pickText(language, say('y = sin x uhinak y = 1/2 zuzena lau aldiz ebakitzen du 0 eta 4π artean', 'La onda y = sen x corta la recta y = 1/2 cuatro veces entre 0 y 4π', 'تقطع الموجة y = sin x المستقيم y = 1/2 أربع مرات بين 0 و4π', 'The wave y = sin x crosses the line y = 1/2 four times between 0 and 4π'))}>
            <rect x={sx(0)} y={sy(1.4)} width={600} height={252} fill={PAPER} />
            {[1, 2, 3, 4].map((k) => <line key={k} x1={sx(k * Math.PI)} y1={sy(1.4)} x2={sx(k * Math.PI)} y2={sy(-1.4)} stroke={GRID} strokeWidth={1.4} />)}
            {[1, -1].map((y) => <line key={y} x1={sx(0)} y1={sy(y)} x2={sx(4 * Math.PI)} y2={sy(y)} stroke={GRID} strokeWidth={1.4} />)}
            <line x1={sx(0)} y1={sy(0)} x2={sx(4 * Math.PI) + 12} y2={sy(0)} stroke={INK} strokeWidth={2} />
            <line x1={sx(0)} y1={sy(-1.4)} x2={sx(0)} y2={sy(1.4) - 8} stroke={INK} strokeWidth={2} />
            <line x1={sx(0)} y1={sy(0.5)} x2={sx(4 * Math.PI)} y2={sy(0.5)} stroke={SECOND} strokeWidth={2.6} strokeDasharray="9 6" />
            <polyline points={sample(Math.sin, 0, 4 * Math.PI, at)} fill="none" stroke={STAGE} strokeWidth={3.6} strokeLinejoin="round" />
            {cuts.map((x) => <Dot key={x} p={at(x, 0.5)} color={SECOND} r={7} />)}
            {[1, 2, 3, 4].map((k) => <F key={k} x={sx(k * Math.PI)} y={sy(-1.4) + 26} size={21} color={MUTED}>{k === 1 ? 'π' : `${k}π`}</F>)}
            <F x={sx(0) - 10} y={sy(1) + 8} size={21} color={MUTED} anchor="end">1</F>
            <F x={sx(0) - 10} y={sy(0.5) + 8} size={21} color={SECOND} anchor="end">1/2</F>
            <F x={sx(0) - 10} y={sy(-1) + 8} size={21} color={MUTED} anchor="end">−1</F>
            <F x={600} y={42} size={22} color={STAGE}>{trig(language, 'y = sen x')}</F>
            <W x={360} y={338} language={language} text={say('Bi ebakidura periodo bakoitzean: 4 guztira', 'Dos cortes en cada periodo: 4 en total', 'تقاطعان في كل دور: 4 في المجموع', 'Two crossings in each period: 4 in all')} />
        </Figure>
    )
}

/* ---------- 11. Amplitude, period and phase shift ---------- */

export function PhaseFigure({ language }: { language: UnitLanguage }) {
    const sx = (x: number) => 50 + (x * 620) / (2 * Math.PI)
    const sy = (y: number) => 175 - y * 34
    const at = (x: number, y: number): Point => [sx(x), sy(y)]
    const start = Math.PI / 6
    const top = (5 * Math.PI) / 12
    return (
        <Figure height={390} label={pickText(language, say('y = 3 sin(2x − π/3) uhina: anplitudea 3, periodoa π eta π/6 puntuan hasten da', 'La onda y = 3 sen(2x − π/3): amplitud 3, periodo π y empieza en π/6', 'الموجة y = 3 sin(2x − π/3): السعة 3 والدور π وتبدأ عند π/6', 'The wave y = 3 sin(2x − π/3): amplitude 3, period π and it starts at π/6'))}>
            <rect x={sx(0)} y={sy(3.5)} width={620} height={238} fill={PAPER} />
            {[-3, 3].map((y) => <line key={y} x1={sx(0)} y1={sy(y)} x2={sx(2 * Math.PI)} y2={sy(y)} stroke={GRID} strokeWidth={1.4} />)}
            <line x1={sx(0)} y1={sy(0)} x2={sx(2 * Math.PI) + 10} y2={sy(0)} stroke={INK} strokeWidth={2} />
            <line x1={sx(0)} y1={sy(-3.5)} x2={sx(0)} y2={sy(3.5)} stroke={INK} strokeWidth={2} />
            <polyline points={sample((x) => Math.sin(2 * x), 0, 2 * Math.PI, at)} fill="none" stroke={MUTED} strokeWidth={2.4} strokeDasharray="7 6" />
            <polyline points={sample((x) => 3 * Math.sin(2 * x - Math.PI / 3), 0, 2 * Math.PI, at)} fill="none" stroke={STAGE} strokeWidth={3.6} strokeLinejoin="round" />
            <line x1={sx(top)} y1={sy(0)} x2={sx(top)} y2={sy(3) + 6} stroke={SECOND} strokeWidth={3} />
            <polygon points={points([[sx(top), sy(3)], [sx(top) - 7, sy(3) + 13], [sx(top) + 7, sy(3) + 13]])} fill={SECOND} />
            <path d={`M${sx(start)} ${sy(3.5) - 4} L ${sx(start)} ${sy(3.5) - 16} L ${sx(start + Math.PI)} ${sy(3.5) - 16} L ${sx(start + Math.PI)} ${sy(3.5) - 4}`} fill="none" stroke={STAGE} strokeWidth={2.4} />
            <F x={(sx(start) + sx(start + Math.PI)) / 2} y={sy(3.5) - 26} size={22} color={STAGE}>T = π</F>
            <Dot p={at(start, 0)} color={GREEN} r={7} />
            <F x={sx(start) + 10} y={sy(0) + 28} size={21} color={GREEN} anchor="start">π/6</F>
            <F x={250} y={330} size={22} color={STAGE}>{trig(language, 'y = 3 sen(2x − π/3)')}</F>
            <F x={570} y={330} size={22} color={MUTED}>{trig(language, 'y = sen 2x')}</F>
            <F x={250} y={370} size={22} color={SECOND}>A = 3</F>
            <F x={570} y={370} size={22} color={GREEN}>x = π/6</F>
        </Figure>
    )
}

/* ---------- 12. A Ferris wheel and its height ---------- */

export function FerrisFigure({ language }: { language: UnitLanguage }) {
    const C: Point = [190, 150]
    const R = 100
    const ground = 270
    const cabin = polar(C, R, -30)
    const ruler = 50
    const gx = (t: number) => 380 + t * 10.5
    const gy = (h: number) => ground - h * 10
    const curve = points(Array.from({ length: 121 }, (_, index) => {
        const t = (30 * index) / 120
        return [gx(t), gy(12 - 10 * Math.cos(rad(12 * t)))] as Point
    }))
    return (
        <Figure height={330} label={pickText(language, say('Noria: zentroa 12 m-ra eta erradioa 10 m; 5 s-ren buruan kabina 7 m-ra dago', 'Una noria con el centro a 12 m y radio 10 m; a los 5 s la cabina está a 7 m', 'دولاب مركزه على ارتفاع 12 م ونصف قطره 10 م؛ بعد 5 ث تكون العربة على ارتفاع 7 م', 'A Ferris wheel with its centre at 12 m and radius 10 m; after 5 s the cabin is at 7 m'))}>
            <line x1={20} y1={ground} x2={340} y2={ground} stroke={INK} strokeWidth={2.4} />
            <line x1={C[0]} y1={C[1]} x2={C[0] - 56} y2={ground} stroke={MUTED} strokeWidth={4} />
            <line x1={C[0]} y1={C[1]} x2={C[0] + 56} y2={ground} stroke={MUTED} strokeWidth={4} />
            <circle cx={C[0]} cy={C[1]} r={R} fill="none" stroke={INK} strokeWidth={3} />
            {[0, 60, 120, 180, 240, 300].map((angle) => {
                const p = polar(C, R, angle - 90)
                return <line key={angle} x1={C[0]} y1={C[1]} x2={p[0]} y2={p[1]} stroke={GRID} strokeWidth={2} />
            })}
            <line x1={C[0]} y1={C[1]} x2={cabin[0]} y2={cabin[1]} stroke={INK} strokeWidth={3} />
            <AngleArc v={C} r={34} from={-90} to={-30} color={SECOND} />
            <F x={C[0] + 8} y={C[1] + 80} size={21} color={SECOND} anchor="start">60°</F>
            <line x1={ruler} y1={cabin[1]} x2={cabin[0]} y2={cabin[1]} stroke={SECOND} strokeWidth={2} strokeDasharray="7 5" />
            <line x1={ruler} y1={gy(0)} x2={ruler} y2={gy(22)} stroke={INK} strokeWidth={2} />
            {[[2, MUTED], [7, SECOND], [12, MUTED], [22, MUTED]].map(([h, color]) => (
                <g key={h}>
                    <line x1={ruler - 6} y1={gy(h as number)} x2={ruler + 6} y2={gy(h as number)} stroke={INK} strokeWidth={2} />
                    <F x={ruler - 10} y={gy(h as number) + 8} size={21} color={color as string} anchor="end">{h}</F>
                </g>
            ))}
            <Dot p={C} color={INK} r={6} />
            <rect x={cabin[0] - 12} y={cabin[1] - 12} width={24} height={24} rx={5} fill={SECOND} stroke={INK} strokeWidth={2} />

            <rect x={gx(0)} y={gy(24)} width={gx(30) - gx(0)} height={240} fill={PAPER} />
            {[2, 12, 22].map((h) => <line key={h} x1={gx(0)} y1={gy(h)} x2={gx(30)} y2={gy(h)} stroke={GRID} strokeWidth={1.4} />)}
            <line x1={gx(0)} y1={gy(0)} x2={gx(30) + 10} y2={gy(0)} stroke={INK} strokeWidth={2} />
            <line x1={gx(0)} y1={gy(0)} x2={gx(0)} y2={gy(24)} stroke={INK} strokeWidth={2} />
            <polyline points={curve} fill="none" stroke={STAGE} strokeWidth={3.4} strokeLinejoin="round" />
            <line x1={gx(5)} y1={gy(0)} x2={gx(5)} y2={gy(7)} stroke={SECOND} strokeWidth={2} strokeDasharray="6 5" />
            <Dot p={[gx(5), gy(7)]} color={SECOND} r={7} />
            {[5, 15, 30].map((t) => <F key={t} x={gx(t)} y={gy(0) + 26} size={21} color={t === 5 ? SECOND : MUTED}>{t}</F>)}
            <F x={gx(30) + 6} y={gy(0) - 10} size={21} color={MUTED} anchor="end">t</F>
            <F x={gx(0) + 10} y={gy(24) + 20} size={21} color={MUTED} anchor="start">h</F>
            <F x={gx(5) + 12} y={gy(7) + 30} size={21} color={SECOND} anchor="start">(5, 7)</F>
        </Figure>
    )
}

/* ---------- The picture of the unit page ---------- */

export function TrigonometryHeroArt() {
    return (
        <div className="fraction-v2-collage" aria-hidden="true">
            <svg viewBox="0 0 520 400" direction="ltr" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                <g transform="translate(24 30) rotate(-4)">
                    <rect width={230} height={210} rx={16} fill={PAPER} stroke={INK} strokeWidth={2} />
                    <line x1={20} y1={105} x2={210} y2={105} stroke="#58616e" strokeWidth={1.6} />
                    <line x1={115} y1={20} x2={115} y2={190} stroke="#58616e" strokeWidth={1.6} />
                    <circle cx={115} cy={105} r={72} fill="none" stroke={INK} strokeWidth={2.2} />
                    <line x1={115} y1={105} x2={166} y2={54} stroke={INK} strokeWidth={3} />
                    <line x1={115} y1={105} x2={134} y2={35} stroke="#c4432a" strokeWidth={3} />
                    <path d="M141 105 A26 26 0 0 0 133 86" fill="none" stroke="#2f6fdb" strokeWidth={3} />
                    <path d="M159 105 A44 44 0 0 0 126 63" fill="none" stroke="#c4432a" strokeWidth={2.4} />
                </g>
                <g transform="translate(282 48) rotate(5)">
                    <rect width={210} height={160} rx={16} fill={SOFT} stroke={INK} strokeWidth={2} />
                    <line x1={16} y1={80} x2={196} y2={80} stroke={INK} strokeWidth={2} />
                    <polyline points={Array.from({ length: 61 }, (_, index) => `${16 + index * 3},${80 - 46 * Math.sin((index / 60) * 4 * Math.PI)}`).join(' ')} fill="none" stroke="#2f6fdb" strokeWidth={3.4} />
                    <line x1={16} y1={57} x2={196} y2={57} stroke="#c4432a" strokeWidth={2} strokeDasharray="6 5" />
                </g>
                <g transform="translate(46 274) rotate(2)">
                    <rect width={430} height={92} rx={16} fill={ROSE} stroke={INK} strokeWidth={2} />
                    <text x={215} y={60} textAnchor="middle" fontSize={28} fontWeight={700} fill={INK} fontFamily={SERIF}>sin 2α = 2 sin α cos α</text>
                </g>
            </svg>
        </div>
    )
}
