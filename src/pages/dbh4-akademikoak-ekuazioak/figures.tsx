import type { ReactNode } from 'react'
import { pickText, type LocalizedText, type UnitLanguage } from '../../features/unit-v2/types'
import { Label } from '../dbh2-funtzioak-v2/plane'
import { Figure } from '../dbh2-zatikiak-prototype/figures'

/* ==========================================================================
   Ekuazioak eta inekuazioak · 4. DBH akademikoak — the new lesson figures:
   the sum and product of the roots, the right triangle whose sides are
   three apart, the change t = x² in a biquadratic, a rational equation
   with a value that must be thrown away, exponential and logarithmic
   equations, intervals on the number line, the sign that flips when
   multiplying by a negative, the sign of a parabola, a parabola against a
   line, and the intersection of two intervals. The quadratic formula,
   factored and radical equations and the steps of a problem reuse the
   2. DBH and 4. DBH aplikatuak figures. Formulas sit in their own <text>
   (left to right in every language); words go through <Label>.
   ========================================================================== */

const INK = 'var(--ink, #1d2733)'
const MUTED = 'var(--muted, #58616e)'
const STAGE = 'var(--stage, #2f6fdb)'
const STAGE_TINT = 'var(--stage-tint, #dde7f7)'
const SECOND = 'var(--second, #c4432a)'
const GREEN = 'var(--success, #267b53)'
const MUSTARD_TINT = 'var(--mustard-tint, #fbebc0)'
const GREEN_TINT = '#d6eddf'
const CORAL_TINT = '#f6dcd3'
const PAPER = '#fffcf6'

const say = (eu: string, es: string, ar: string): LocalizedText => ({ eu, es, ar })
const useText = (language: UnitLanguage) => (text: LocalizedText) => pickText(language, text)

function Caption({ y, children }: { y: number; children: ReactNode }) {
    return <Label x={360} y={y} textAnchor="middle" fontSize={15} fill={MUTED}>{children}</Label>
}

/** A formula written left to right whatever the language */
function F({ x, y, children, size = 20, color = INK, anchor = 'start', weight = 700 }: { x: number; y: number; children: ReactNode; size?: number; color?: string; anchor?: 'start' | 'middle' | 'end'; weight?: number }) {
    return <text x={x} y={y} textAnchor={anchor} fontSize={size} fontWeight={weight} fill={color} direction="ltr">{children}</text>
}

function Card({ x, y, width, height, tint, children }: { x: number; y: number; width: number; height: number; tint: string; children?: ReactNode }) {
    return (
        <g>
            <rect x={x} y={y} width={width} height={height} rx={16} fill={tint} stroke={INK} strokeWidth={1.8} />
            {children}
        </g>
    )
}

/** A raised exponent inside a <text> */
const Up = ({ children }: { children: ReactNode }) => (
    <>
        <tspan dy={-10} fontSize="0.62em">{children}</tspan>
        <tspan dy={10}>{' '}</tspan>
    </>
)

/** A number line from `from` to `to`, `unit` pixels apart, centred on x = 360 at value `centre` */
function NumberLine({ y, from, to, unit, centre = 0, labels = true }: { y: number; from: number; to: number; unit: number; centre?: number; labels?: boolean }) {
    const at = (value: number) => 360 + (value - centre) * unit
    return (
        <g>
            <line x1={at(from) - 20} x2={at(to) + 20} y1={y} y2={y} stroke={INK} strokeWidth={1.8} />
            {Array.from({ length: to - from + 1 }, (_, k) => from + k).map((value) => (
                <g key={value}>
                    <line x1={at(value)} x2={at(value)} y1={y - 6} y2={y + 6} stroke={INK} strokeWidth={1.2} />
                    {labels && <F x={at(value)} y={y + 24} anchor="middle" size={13} color={MUTED} weight={400}>{value < 0 ? `−${-value}` : value}</F>}
                </g>
            ))}
        </g>
    )
}

/** A stretch of the line, with an open or closed dot at each finite end */
function Stretch({ y, x1, x2, open1, open2, color = STAGE, ray1 = false, ray2 = false }: { y: number; x1: number; x2: number; open1?: boolean; open2?: boolean; color?: string; ray1?: boolean; ray2?: boolean }) {
    return (
        <g>
            <line x1={x1} x2={x2} y1={y} y2={y} stroke={color} strokeWidth={6} strokeLinecap="round" opacity={0.8} />
            {!ray1 && <circle cx={x1} cy={y} r={7} fill={open1 ? PAPER : color} stroke={color} strokeWidth={3} />}
            {!ray2 && <circle cx={x2} cy={y} r={7} fill={open2 ? PAPER : color} stroke={color} strokeWidth={3} />}
            {ray1 && <polygon points={`${x1 - 4},${y} ${x1 + 8},${y - 7} ${x1 + 8},${y + 7}`} fill={color} />}
            {ray2 && <polygon points={`${x2 + 4},${y} ${x2 - 8},${y - 7} ${x2 - 8},${y + 7}`} fill={color} />}
        </g>
    )
}

/** Points of y = f(x) for a drawing, x from x0 to x1 */
const curve = (f: (x: number) => number, x0: number, x1: number, toX: (x: number) => number, toY: (y: number) => number) =>
    Array.from({ length: 81 }, (_, k) => x0 + (k * (x1 - x0)) / 80).map((x) => `${toX(x)},${toY(f(x))}`).join(' ')

/* ---------- Sum and product of the roots ---------- */

export function SumProductFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    return (
        <Figure height={290} label={t(say('x² − 7x + 10 = 0: erroen batura 7 eta biderkadura 10', 'x² − 7x + 10 = 0: las raíces suman 7 y su producto es 10', 'x² − 7x + 10 = 0: مجموع الجذرين 7 وجداؤهما 10'))}>
            <F x={360} y={40} anchor="middle" size={24}>x² − 7x + 10 = 0   →   x = 2,  x = 5</F>
            <Card x={40} y={66} width={300} height={110} tint={STAGE_TINT}>
                <Label x={190} y={94} textAnchor="middle" fontSize={15} fontWeight={700} fill={STAGE}>{t(say('Batura', 'Suma', 'المجموع'))}</Label>
                <F x={190} y={128} anchor="middle" size={21}>x₁ + x₂ = −b/a</F>
                <F x={190} y={160} anchor="middle" size={19} color={SECOND}>2 + 5 = 7</F>
            </Card>
            <Card x={380} y={66} width={300} height={110} tint={MUSTARD_TINT}>
                <Label x={530} y={94} textAnchor="middle" fontSize={15} fontWeight={700} fill={STAGE}>{t(say('Biderkadura', 'Producto', 'الجداء'))}</Label>
                <F x={530} y={128} anchor="middle" size={21}>x₁ · x₂ = c/a</F>
                <F x={530} y={160} anchor="middle" size={19} color={SECOND}>2 · 5 = 10</F>
            </Card>
            <Card x={110} y={196} width={500} height={50} tint={GREEN_TINT}>
                <F x={360} y={228} anchor="middle" size={20}>x² − Sx + P = 0</F>
            </Card>
            <Caption y={276}>{t(say('S batura eta P biderkadura jakinda, ekuazioa idatz daiteke', 'Conociendo la suma S y el producto P, se escribe la ecuación', 'بمعرفة المجموع S والجداء P نكتب المعادلة'))}</Caption>
        </Figure>
    )
}

/* ---------- The right triangle with sides three apart ---------- */

export function TriangleProblemFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    return (
        <Figure height={300} label={t(say('Triangelu angeluzuzena: x, x + 3 eta x + 6; x = 9', 'Triángulo rectángulo de lados x, x + 3 y x + 6; x = 9', 'مثلث قائم أضلاعه x وx + 3 وx + 6؛ x = 9'))}>
            <polygon points="60,230 300,230 60,50" fill={STAGE_TINT} stroke={INK} strokeWidth={2.4} />
            <rect x={60} y={212} width={18} height={18} fill="none" stroke={INK} strokeWidth={1.6} />
            <F x={180} y={258} anchor="middle" size={20} color={STAGE}>x + 3</F>
            <F x={44} y={146} anchor="end" size={20} color={STAGE}>x</F>
            <F x={196} y={128} size={20} color={SECOND}>x + 6</F>
            <F x={350} y={70} size={20}>(x + 6)² = x² + (x + 3)²</F>
            <F x={350} y={112} size={20}>x² − 6x − 27 = 0</F>
            <F x={350} y={154} size={20}>x = 9,   x = −3</F>
            <Card x={340} y={176} width={340} height={56} tint={GREEN_TINT}>
                <F x={510} y={212} anchor="middle" size={20} color={GREEN}>9 cm, 12 cm, 15 cm</F>
            </Card>
            <Caption y={286}>{t(say('−3 ez da baliozkoa: luzera bat ezin da negatiboa izan', '−3 no vale: una longitud no puede ser negativa', '−3 لا يصلح: لا يمكن أن يكون الطول سالبًا'))}</Caption>
        </Figure>
    )
}

/* ---------- Biquadratic equations ---------- */

export function BiquadraticFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    return (
        <Figure height={300} label={t(say('x⁴ − 10x² + 9 = 0, t = x² aldaketarekin: x = ±3, x = ±1', 'x⁴ − 10x² + 9 = 0 con el cambio t = x²: x = ±3, x = ±1', 'x⁴ − 10x² + 9 = 0 بالتعويض t = x²: x = ±3، x = ±1'))}>
            <F x={360} y={40} anchor="middle" size={24}>x⁴ − 10x² + 9 = 0</F>
            <Label x={360} y={76} textAnchor="middle" fontSize={15} fill={STAGE}>{t(say('aldaketa: t = x²', 'cambio: t = x²', 'التعويض: t = x²'))}</Label>
            <Card x={190} y={92} width={340} height={56} tint={MUSTARD_TINT}>
                <F x={360} y={128} anchor="middle" size={22}>t² − 10t + 9 = 0</F>
            </Card>
            <line x1={300} x2={190} y1={150} y2={186} stroke={MUTED} strokeWidth={1.6} />
            <line x1={420} x2={530} y1={150} y2={186} stroke={MUTED} strokeWidth={1.6} />
            <Card x={60} y={186} width={260} height={64} tint={STAGE_TINT}>
                <F x={190} y={226} anchor="middle" size={21}>t = 9 → x = ±3</F>
            </Card>
            <Card x={400} y={186} width={260} height={64} tint={STAGE_TINT}>
                <F x={530} y={226} anchor="middle" size={21}>t = 1 → x = ±1</F>
            </Card>
            <Caption y={284}>{t(say('t negatiboa bada, ez dago x errealik: x² ezin da negatiboa izan', 'Si t es negativo, no hay x real: x² no puede ser negativo', 'إذا كان t سالبًا فلا يوجد x حقيقي: لا يمكن أن يكون x² سالبًا'))}</Caption>
        </Figure>
    )
}

/* ---------- A rational equation ---------- */

export function RationalEquationFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    return (
        <Figure height={300} label={t(say('x/(x − 2) + 2/x = 4/(x(x − 2)): x = −4; x = 2 baztertzen da', 'x/(x − 2) + 2/x = 4/(x(x − 2)): x = −4; x = 2 se descarta', 'x/(x − 2) + 2/x = 4/(x(x − 2)): x = −4؛ ويُستبعد x = 2'))}>
            <F x={360} y={40} anchor="middle" size={22}>x/(x − 2) + 2/x = 4/(x(x − 2))</F>
            <Label x={360} y={76} textAnchor="middle" fontSize={15} fill={STAGE}>{t(say('bider m.k.t. = x(x − 2)', 'por el m.c.m. = x(x − 2)', 'في م.م.أ = x(x − 2)'))}</Label>
            <F x={360} y={114} anchor="middle" size={21}>x² + 2(x − 2) = 4   →   x² + 2x − 8 = 0</F>
            <Card x={70} y={140} width={260} height={64} tint={CORAL_TINT}>
                <F x={200} y={180} anchor="middle" size={22} color={SECOND}>x = 2  ✗</F>
            </Card>
            <Card x={390} y={140} width={260} height={64} tint={GREEN_TINT}>
                <F x={520} y={180} anchor="middle" size={22} color={GREEN}>x = −4  ✓</F>
            </Card>
            <Caption y={240}>{t(say('x = 2 denean izendatzailea 0 da: ez da ebazpena', 'Para x = 2 el denominador es 0: no es solución', 'عندما x = 2 يكون المقام 0: ليس حلًا'))}</Caption>
            <Caption y={264}>{t(say('Beti egiaztatu ebazpenak hasierako ekuazioan', 'Comprueba siempre las soluciones en la ecuación inicial', 'تحقّق دائمًا من الحلول في المعادلة الأصلية'))}</Caption>
        </Figure>
    )
}

/* ---------- Exponential equations ---------- */

export function ExponentialFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    return (
        <Figure height={300} label={t(say('Ekuazio esponentzialak: oinarri bera, eta faktore komuna', 'Ecuaciones exponenciales: misma base, y factor común', 'المعادلات الأسية: الأساس نفسه، والعامل المشترك'))}>
            <Card x={20} y={20} width={330} height={210} tint={STAGE_TINT}>
                <Label x={185} y={48} textAnchor="middle" fontSize={15} fontWeight={700} fill={STAGE}>{t(say('Oinarri bera', 'Misma base', 'الأساس نفسه'))}</Label>
                <F x={185} y={92} anchor="middle" size={21}>3<Up>x² − 5</Up> = 81</F>
                <F x={185} y={132} anchor="middle" size={21}>3<Up>x² − 5</Up> = 3<Up>4</Up></F>
                <F x={185} y={172} anchor="middle" size={21}>x² − 5 = 4</F>
                <F x={185} y={212} anchor="middle" size={21} color={SECOND}>x = ±3</F>
            </Card>
            <Card x={370} y={20} width={330} height={210} tint={MUSTARD_TINT}>
                <Label x={535} y={48} textAnchor="middle" fontSize={15} fontWeight={700} fill={STAGE}>{t(say('Faktore komuna', 'Factor común', 'العامل المشترك'))}</Label>
                <F x={535} y={92} anchor="middle" size={21}>2<Up>x</Up> + 2<Up>x + 3</Up> = 36</F>
                <F x={535} y={132} anchor="middle" size={21}>2<Up>x</Up>(1 + 8) = 36</F>
                <F x={535} y={172} anchor="middle" size={21}>2<Up>x</Up> = 4 = 2<Up>2</Up></F>
                <F x={535} y={212} anchor="middle" size={21} color={SECOND}>x = 2</F>
            </Card>
            <Caption y={262}>{t(say('Bi aldeak oinarri bereko berretura gisa idatzi, eta berretzaileak berdindu', 'Escribe los dos miembros como potencias de la misma base e iguala los exponentes', 'اكتب الطرفين قوتين للأساس نفسه وساوِ الأسس'))}</Caption>
            <Caption y={286}>{t(say('Ezin bada, logaritmoak: 5ˣ = 193 → x = log 193 : log 5', 'Si no se puede, logaritmos: 5ˣ = 193 → x = log 193 : log 5', 'إن لم يمكن فاللوغاريتمات: 5ˣ = 193 ← x = log 193 : log 5'))}</Caption>
        </Figure>
    )
}

/* ---------- Logarithmic equations ---------- */

export function LogEquationFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    return (
        <Figure height={300} label={t(say('Ekuazio logaritmikoak: definizioa eta propietateak', 'Ecuaciones logarítmicas: definición y propiedades', 'المعادلات اللوغاريتمية: التعريف والخصائص'))}>
            <Card x={20} y={20} width={330} height={210} tint={STAGE_TINT}>
                <Label x={185} y={48} textAnchor="middle" fontSize={15} fontWeight={700} fill={STAGE}>{t(say('Definizioa', 'Definición', 'التعريف'))}</Label>
                <F x={185} y={92} anchor="middle" size={21}>log₂ (2x − 1) = 3</F>
                <F x={185} y={132} anchor="middle" size={21}>2x − 1 = 2³ = 8</F>
                <F x={185} y={186} anchor="middle" size={22} color={SECOND}>x = 9/2</F>
            </Card>
            <Card x={370} y={20} width={330} height={210} tint={MUSTARD_TINT}>
                <Label x={535} y={48} textAnchor="middle" fontSize={15} fontWeight={700} fill={STAGE}>{t(say('Propietateak', 'Propiedades', 'الخصائص'))}</Label>
                <F x={535} y={92} anchor="middle" size={20}>log x + log (x − 3) = 1</F>
                <F x={535} y={132} anchor="middle" size={20}>x(x − 3) = 10</F>
                <F x={535} y={172} anchor="middle" size={20}>x = 5,  x = −2</F>
                <F x={535} y={212} anchor="middle" size={20} color={SECOND}>x = 5  (−2 ✗)</F>
            </Card>
            <Caption y={262}>{t(say('Logaritmoak zenbaki positiboenak bakarrik dira', 'Solo hay logaritmos de números positivos', 'لا لوغاريتم إلا للأعداد الموجبة'))}</Caption>
            <Caption y={286}>{t(say('Horregatik, ebazpen bakoitza hasierako ekuazioan egiaztatu', 'Por eso, cada solución se comprueba en la ecuación inicial', 'لذلك نتحقق من كل حل في المعادلة الأصلية'))}</Caption>
        </Figure>
    )
}

/* ---------- Intervals ---------- */

export function IntervalsFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const at = (value: number) => 400 + value * 44
    const rows = [
        { y: 60, text: 'x ≥ −2', interval: '[−2, +∞)', x1: at(-2), x2: at(6), open1: false, ray2: true },
        { y: 140, text: 'x < 4', interval: '(−∞, 4)', x1: at(-6), x2: at(4), open2: true, ray1: true },
        { y: 220, text: '−1 ≤ x < 3', interval: '[−1, 3)', x1: at(-1), x2: at(3), open2: true }
    ]
    return (
        <Figure height={310} label={t(say('Tarteak zenbaki-zuzenean', 'Intervalos en la recta numérica', 'المجالات على مستقيم الأعداد'))}>
            {rows.map((row) => (
                <g key={row.text}>
                    <F x={20} y={row.y - 14} size={18}>{row.text}</F>
                    <F x={20} y={row.y + 14} size={18} color={SECOND}>{row.interval}</F>
                    <line x1={at(-6) - 10} x2={at(6) + 10} y1={row.y} y2={row.y} stroke={INK} strokeWidth={1.6} />
                    {[-6, -4, -2, 0, 2, 4, 6].map((value) => <F key={value} x={at(value)} y={row.y + 24} anchor="middle" size={12} color={MUTED} weight={400}>{value < 0 ? `−${-value}` : value}</F>)}
                    <Stretch y={row.y} x1={row.x1} x2={row.x2} open1={row.open1} open2={row.open2} ray1={row.ray1} ray2={row.ray2} />
                </g>
            ))}
            <Caption y={272}>{t(say('Puntu betea: muturra sartzen da [ ]. Puntu hutsa: ez da sartzen ( )', 'Punto lleno: el extremo entra [ ]. Punto hueco: no entra ( )', 'النقطة الممتلئة: الطرف داخل [ ]. النقطة الفارغة: الطرف خارج ( )'))}</Caption>
            <Caption y={296}>{t(say('∞ inoiz ez da sartzen: beti parentesia', '∞ nunca entra: siempre paréntesis', '∞ لا يدخل أبدًا: دائمًا قوس'))}</Caption>
        </Figure>
    )
}

/* ---------- The sign flips ---------- */

export function FlipSignFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const at = (value: number) => 360 + value * 50
    return (
        <Figure height={290} label={t(say('Negatibo batez biderkatzean edo zatitzean, desberdintzaren zentzua aldatzen da', 'Al multiplicar o dividir por un negativo, cambia el sentido de la desigualdad', 'عند الضرب أو القسمة على عدد سالب ينقلب اتجاه المتباينة'))}>
            <NumberLine y={70} from={-6} to={6} unit={50} />
            {[[3, STAGE], [5, STAGE], [-3, SECOND], [-5, SECOND]].map(([value, color]) => <circle key={value} cx={at(value as number)} cy={70} r={8} fill={color as string} />)}
            <F x={at(4)} y={42} anchor="middle" size={18} color={STAGE}>3 &lt; 5</F>
            <F x={at(-4)} y={42} anchor="middle" size={18} color={SECOND}>−3 &gt; −5</F>
            <Label x={360} y={130} textAnchor="middle" fontSize={15} fill={MUTED}>{t(say('bider (−1): ispiluan bezala', 'por (−1): como en un espejo', 'في (−1): كما في المرآة'))}</Label>
            <Card x={140} y={150} width={440} height={86} tint={MUSTARD_TINT}>
                <F x={360} y={184} anchor="middle" size={22}>−2x &gt; 6</F>
                <F x={360} y={220} anchor="middle" size={22} color={SECOND}>x &lt; 6 : (−2) = −3</F>
            </Card>
            <Caption y={272}>{t(say('Batzean edo positibo batez biderkatzean, zentzua berdin geratzen da', 'Al sumar o multiplicar por un positivo, el sentido no cambia', 'عند الجمع أو الضرب في عدد موجب لا يتغير الاتجاه'))}</Caption>
        </Figure>
    )
}

/* ---------- The sign of a parabola ---------- */

export function QuadraticSignFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const toX = (x: number) => 360 + x * 60
    const toY = (y: number) => 130 - y * 18
    return (
        <Figure height={310} label={t(say('x² − 2x − 3 ≤ 0: −1 ≤ x ≤ 3', 'x² − 2x − 3 ≤ 0: −1 ≤ x ≤ 3', 'x² − 2x − 3 ≤ 0: −1 ≤ x ≤ 3'))}>
            <defs><clipPath id="quadratic-sign-clip"><rect x={0} y={10} width={720} height={196} /></clipPath></defs>
            <line x1={toX(-4)} x2={toX(5)} y1={toY(0)} y2={toY(0)} stroke={INK} strokeWidth={1.6} />
            {[-3, -2, -1, 0, 1, 2, 3, 4].map((x) => <F key={x} x={toX(x)} y={toY(0) + 22} anchor="middle" size={12} color={MUTED} weight={400}>{x < 0 ? `−${-x}` : x}</F>)}
            <polyline points={curve((x) => x * x - 2 * x - 3, -2.2, 4.2, toX, toY)} fill="none" stroke={STAGE} strokeWidth={3} clipPath="url(#quadratic-sign-clip)" />
            <line x1={toX(-1)} x2={toX(3)} y1={toY(0)} y2={toY(0)} stroke={GREEN} strokeWidth={7} strokeLinecap="round" opacity={0.85} />
            {[-1, 3].map((x) => <circle key={x} cx={toX(x)} cy={toY(0)} r={7} fill={GREEN} />)}
            <F x={toX(-2.6)} y={toY(3)} anchor="middle" size={24} color={SECOND}>+</F>
            <F x={toX(0.4)} y={toY(-2.8)} anchor="middle" size={24} color={GREEN}>−</F>
            <F x={toX(4.4)} y={toY(3)} anchor="middle" size={24} color={SECOND}>+</F>
            <F x={40} y={40} size={18}>y = x² − 2x − 3</F>
            <F x={360} y={244} anchor="middle" size={21}>x² − 2x − 3 ≤ 0   →   [−1, 3]</F>
            <Caption y={286}>{t(say('Erroek zuzena hiru zatitan banatzen dute: zati bakoitzean zeinua ez da aldatzen', 'Las raíces parten la recta en tres trozos: en cada uno el signo no cambia', 'تقسم الجذور المستقيم إلى ثلاثة أجزاء: في كل جزء لا تتغير الإشارة'))}</Caption>
        </Figure>
    )
}

/* ---------- A parabola against a line ---------- */

export function GraphicInequalityFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const toX = (x: number) => 200 + x * 52
    const toY = (y: number) => 220 - y * 18
    return (
        <Figure height={310} label={t(say('x² − 5x + 4 < x − 1: 1 < x < 5', 'x² − 5x + 4 < x − 1: 1 < x < 5', 'x² − 5x + 4 < x − 1: 1 < x < 5'))}>
            <defs><clipPath id="graphic-inequality-clip"><rect x={0} y={10} width={720} height={240} /></clipPath></defs>
            <rect x={toX(1)} y={20} width={toX(5) - toX(1)} height={toY(-2) - 20} fill={GREEN_TINT} />
            <line x1={toX(-1)} x2={toX(7)} y1={toY(0)} y2={toY(0)} stroke={INK} strokeWidth={1.6} />
            <line x1={toX(0)} x2={toX(0)} y1={16} y2={toY(-2)} stroke={INK} strokeWidth={1.2} />
            {[1, 2, 3, 4, 5, 6].map((x) => <F key={x} x={toX(x)} y={toY(0) + 20} anchor="middle" size={12} color={MUTED} weight={400}>{x}</F>)}
            <polyline points={curve((x) => x * x - 5 * x + 4, -0.6, 6.4, toX, toY)} fill="none" stroke={STAGE} strokeWidth={3} clipPath="url(#graphic-inequality-clip)" />
            <polyline points={curve((x) => x - 1, -0.8, 7, toX, toY)} fill="none" stroke={SECOND} strokeWidth={3} clipPath="url(#graphic-inequality-clip)" />
            {[1, 5].map((x) => <circle key={x} cx={toX(x)} cy={toY(x - 1)} r={7} fill={PAPER} stroke={INK} strokeWidth={2.4} />)}
            <F x={toX(6.2)} y={50} size={17} color={STAGE}>y = x² − 5x + 4</F>
            <F x={toX(6.2)} y={toY(5.4)} size={17} color={SECOND}>y = x − 1</F>
            <F x={toX(6.2)} y={toY(1.6)} size={18} color={GREEN}>1 &lt; x &lt; 5</F>
            <Caption y={272}>{t(say('Parabola zuzenaren azpian dago bi ebaki-puntuen artean', 'La parábola queda por debajo de la recta entre los dos puntos de corte', 'يقع القطع المكافئ تحت المستقيم بين نقطتي التقاطع'))}</Caption>
            <Caption y={296}>{t(say('Ebaki-puntuak: x² − 5x + 4 = x − 1 ekuazioaren ebazpenak', 'Puntos de corte: las soluciones de x² − 5x + 4 = x − 1', 'نقاط التقاطع: حلول x² − 5x + 4 = x − 1'))}</Caption>
        </Figure>
    )
}

/* ---------- The intersection of two intervals ---------- */

export function IntervalIntersectionFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const at = (value: number) => 360 + (value - 3) * 48
    return (
        <Figure height={300} label={t(say('3x − 1 > 5 eta x + 4 ≤ 10: (2, 6]', '3x − 1 > 5 y x + 4 ≤ 10: (2, 6]', '3x − 1 > 5 وx + 4 ≤ 10: (2, 6]'))}>
            <F x={20} y={46} size={18}>3x − 1 &gt; 5  →  x &gt; 2</F>
            <F x={20} y={116} size={18}>x + 4 ≤ 10  →  x ≤ 6</F>
            {[58, 128, 210].map((y) => <line key={y} x1={at(-3)} x2={at(9) + 10} y1={y} y2={y} stroke={INK} strokeWidth={1.4} />)}
            {[-2, 0, 2, 4, 6, 8].map((value) => <F key={value} x={at(value)} y={234} anchor="middle" size={12} color={MUTED} weight={400}>{value < 0 ? `−${-value}` : value}</F>)}
            <Stretch y={58} x1={at(2)} x2={at(9)} open1 ray2 color={STAGE} />
            <Stretch y={128} x1={at(-3)} x2={at(6)} ray1 color={SECOND} />
            <Stretch y={210} x1={at(2)} x2={at(6)} open1 color={GREEN} />
            <F x={at(4)} y={196} anchor="middle" size={20} color={GREEN}>(2, 6]</F>
            <Caption y={266}>{t(say('Sistemaren ebazpena: bi ebazpen-multzoen ebakidura', 'La solución del sistema es la intersección de las dos soluciones', 'حل النظام هو تقاطع مجموعتي الحلول'))}</Caption>
            <Caption y={290}>{t(say('Ez badute zati komunik, sistemak ez du ebazpenik', 'Si no tienen parte común, el sistema no tiene solución', 'إذا لم يكن بينهما جزء مشترك فلا حل للنظام'))}</Caption>
        </Figure>
    )
}

/* ---------- Hero art ---------- */

export function EquationsInequalitiesHeroArt() {
    return (
        <div className="fraction-v2-collage" aria-hidden="true">
            <svg viewBox="0 0 520 400" direction="ltr" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                <g transform="translate(30 34) rotate(-4)">
                    <rect width={250} height={150} rx={16} fill={PAPER} stroke={INK} strokeWidth={2} />
                    <text x={125} y={60} textAnchor="middle" fontSize={24} fontWeight={700} fill={INK}>x⁴ − 10x² + 9 = 0</text>
                    <text x={125} y={110} textAnchor="middle" fontSize={22} fontWeight={700} fill="#c4432a">x = ±1, ±3</text>
                </g>
                <g transform="translate(300 60) rotate(5)">
                    <rect width={190} height={140} rx={16} fill="#d6eddf" stroke={INK} strokeWidth={2} />
                    <line x1={14} x2={176} y1={90} y2={90} stroke={INK} strokeWidth={1.6} />
                    <path d="M24 20 Q 95 170, 166 20" fill="none" stroke="#2f6fdb" strokeWidth={3} />
                    <line x1={50} x2={140} y1={90} y2={90} stroke="#267b53" strokeWidth={6} />
                </g>
                <g transform="translate(40 250) rotate(2)">
                    <rect width={440} height={84} rx={16} fill="#fbebc0" stroke={INK} strokeWidth={2} />
                    <text x={220} y={54} textAnchor="middle" fontSize={26} fontWeight={700} fill={INK}>2ˣ + 2ˣ⁺³ = 36</text>
                </g>
            </svg>
        </div>
    )
}
