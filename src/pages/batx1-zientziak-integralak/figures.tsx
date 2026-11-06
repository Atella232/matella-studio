import type { ReactNode } from 'react'
import { pickText, type LocalizedText, type UnitLanguage } from '../../features/unit-v2/types'
import { AxisTitles, Label, PlaneGrid, PlanePath, PlanePoint } from '../dbh2-funtzioak-v2/plane'
import { useBoxClip } from '../dbh2-funtzioak-v2/planeClip'
import { planeMap, type PlaneBox } from '../dbh2-funtzioak-v2/planeMap'
import { Figure } from '../dbh2-zatikiak-prototype/figures'
import { sampled } from '../dbh4-aplikatuak-funtzioak/functions'

/* ==========================================================================
   Integralak · Batxilergoa 1 · Zientziak — the lesson figures. The planes
   (AreaPlot) are Límites' PlotFigure with what this unit needs on top:
   areas filled between a curve and a base, and rectangles. Positive areas
   are blue and negative ones red, whatever the stage; a second curve is
   violet. The tables of basic integrals are rows «function → integral».
   Formulas sit in their own <text> (left to right in every language);
   words go through <Label>. Spanish writes sen, tg, arcsen and arctg, and
   Basque tg and arctg, as in the rest of Bachillerato.
   ========================================================================== */

const INK = 'var(--ink, #1d2733)'
const MUTED = 'var(--muted, #58616e)'
const STAGE = 'var(--stage, #2f6fdb)'
const STAGE_TINT = 'var(--stage-tint, #dde7f7)'
const CARD = 'var(--card, #fffcf6)'
/** Fixed colours, apart from the stage colour: area above (blue), below (red), a second curve (violet) */
const BLUE = '#2f6fdb'
const RED = '#c4432a'
const VIOLET = '#7b52c7'
const PAPER = '#fffcf6'
const SERIF = 'Fraunces, serif'

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
/** The decimal comma in Basque and Spanish, the point in English and Arabic */
const decimal = (language: UnitLanguage, text: string) => (language === 'en' || language === 'ar' ? text.replace(/(\d),(\d)/g, '$1.$2') : text)
const trig = (language: UnitLanguage) => ({
    sin: language === 'es' ? 'sen' : 'sin',
    tan: language === 'eu' || language === 'es' ? 'tg' : 'tan',
    arcsin: language === 'es' ? 'arcsen' : 'arcsin',
    arctan: language === 'eu' || language === 'es' ? 'arctg' : 'arctan'
})

/** A formula written left to right whatever the language */
function F({ x, y, children, size = 19, color = INK, anchor = 'start', weight = 700 }: { x: number; y: number; children: ReactNode; size?: number; color?: string; anchor?: 'start' | 'middle' | 'end'; weight?: number }) {
    return <text x={x} y={y} textAnchor={anchor} fontSize={size} fontWeight={weight} fill={color} direction="ltr">{children}</text>
}

const up = (text: string) => <tspan dy={-9} fontSize="66%">{text}</tspan>
const back = <tspan dy={9}> </tspan>

interface Curve {
    fn: (x: number) => number
    from: number
    to: number
    color?: string
    dashed?: boolean
    width?: number
}
interface Fill {
    fn: (x: number) => number
    /** The lower edge (the x-axis when left out) */
    base?: (x: number) => number
    from: number
    to: number
    color: string
}
interface Bar {
    x: number
    width: number
    height: number
    color?: string
}
interface Dot {
    at: [number, number]
    color?: string
    name?: string
}
interface Mark {
    at: [number, number]
    text: string
    color?: string
    size?: number
}
interface Note {
    y: number
    formula?: ReactNode
    text?: LocalizedText
    color?: string
    size?: number
}

/**
 * One plane with filled areas, rectangles, curves, dots, numbers inside the plane (marks) and a column of
 * notes. The box is in grid squares; `units` says what a square is worth on each axis, and everything else
 * is in real values.
 */
function AreaPlot({ language, height, label, box, cell, units = [1, 1], ox = 36, oy = 32, labelStep = 2, curves, fills = [], bars = [], dots = [], verticals = [], marks = [], notes = [], notesX = 420, caption }: {
    language: UnitLanguage
    height: number
    label: LocalizedText
    box: PlaneBox
    cell: number
    units?: [number, number]
    ox?: number
    oy?: number
    labelStep?: number
    curves: Curve[]
    fills?: Fill[]
    bars?: Bar[]
    dots?: Dot[]
    verticals?: number[]
    marks?: Mark[]
    notes?: Note[]
    notesX?: number
    caption?: LocalizedText
}) {
    const t = (text: LocalizedText) => pickText(language, text)
    const map = planeMap(box, cell, ox, oy)
    const [clipPath, clip] = useBoxClip(map)
    const [ux, uy] = units
    const px = (x: number) => map.x(x / ux)
    const py = (y: number) => map.y(y / uy)
    const area = (fill: Fill) => {
        const steps = 80
        const xs = Array.from({ length: steps + 1 }, (_, k) => fill.from + ((fill.to - fill.from) * k) / steps)
        const top = xs.map((x) => `${px(x)},${py(fill.fn(x))}`)
        const bottom = [...xs].reverse().map((x) => `${px(x)},${py(fill.base ? fill.base(x) : 0)}`)
        return `M${[...top, ...bottom].join(' L')} Z`
    }
    return (
        <Figure height={height} label={t(label)}>
            <g>
                <defs>{clipPath}</defs>
                <rect x={ox} y={oy} width={map.width} height={map.height} fill={CARD} />
                <PlaneGrid map={map} labelStep={labelStep} xUnit={ux} yUnit={uy} />
                <AxisTitles map={map} />
                {fills.map((fill, index) => <path key={`f${index}`} d={area(fill)} fill={fill.color} fillOpacity={0.26} stroke="none" clipPath={clip} />)}
                {bars.map((bar, index) => {
                    const left = px(bar.x)
                    const top = Math.min(py(0), py(bar.height))
                    return <rect key={`b${index}`} x={left} y={top} width={px(bar.x + bar.width) - left} height={Math.abs(py(bar.height) - py(0))} fill={bar.color ?? BLUE} fillOpacity={0.24} stroke={bar.color ?? BLUE} strokeWidth={2} clipPath={clip} />
                })}
                {verticals.map((x) => <line key={`v${x}`} x1={px(x)} y1={map.y(box.yMin)} x2={px(x)} y2={map.y(box.yMax)} stroke={MUTED} strokeWidth={2} strokeDasharray="7 5" />)}
                {curves.map((curve, index) => (
                    <PlanePath key={`c${index}`} map={map} points={sampled((x) => curve.fn(x * ux) / uy, curve.from / ux, curve.to / ux, 0.02)} color={curve.color ?? STAGE} width={curve.width ?? 3.6} dashed={curve.dashed} clip={clip} />
                ))}
                {dots.map((dot, index) => <PlanePoint key={`d${index}`} map={map} point={[dot.at[0] / ux, dot.at[1] / uy]} color={dot.color ?? STAGE} radius={6} name={dot.name} />)}
                {marks.map((mark, index) => (
                    <text key={`m${index}`} x={px(mark.at[0])} y={py(mark.at[1])} textAnchor="middle" fontSize={mark.size ?? 18} fontWeight={700} fill={mark.color ?? INK} direction="ltr" paintOrder="stroke" stroke={PAPER} strokeWidth={4} strokeLinejoin="round">{mark.text}</text>
                ))}
            </g>
            {notes.map((note, index) => note.formula !== undefined
                ? <F key={index} x={notesX} y={note.y} color={note.color ?? INK} size={note.size ?? 19}>{note.formula}</F>
                : <Label key={index} x={notesX} y={note.y} fontSize={note.size ?? 17} fill={note.color ?? INK}>{t(note.text!)}</Label>)}
            {caption && <Label x={360} y={height - 10} textAnchor="middle" fontSize={18} fill={MUTED}>{t(caption)}</Label>}
        </Figure>
    )
}

/** Rows «function → integral», with a heading over each column and an optional note under the integral */
function TableFigure({ language, label, rows, caption }: {
    language: UnitLanguage
    label: LocalizedText
    rows: Array<{ key: string; fn: ReactNode; integral: ReactNode; note?: string; strong?: boolean }>
    caption: LocalizedText
}) {
    const t = (text: LocalizedText) => pickText(language, text)
    const height = 92 + rows.length * 72
    return (
        <Figure height={height} label={t(label)}>
            <Label x={190} y={40} textAnchor="middle" fontSize={18} fontWeight={700} fill={MUTED}>{t(say('Funtzioa', 'Función', 'الدالة', 'Function'))}</Label>
            <Label x={530} y={40} textAnchor="middle" fontSize={18} fontWeight={700} fill={MUTED}>{t(say('Integrala', 'Integral', 'التكامل', 'Integral'))}</Label>
            {rows.map((row, index) => {
                const y = 56 + index * 72
                return (
                    <g key={row.key}>
                        <rect x={40} y={y} width={300} height={60} rx={14} fill={PAPER} stroke={INK} strokeWidth={2} />
                        <F x={190} y={y + 39} anchor="middle" size={24}>{row.fn}</F>
                        <F x={360} y={y + 41} anchor="middle" size={30} color={STAGE}>∫</F>
                        <rect x={380} y={y} width={300} height={60} rx={14} fill={row.strong ? STAGE_TINT : PAPER} stroke={STAGE} strokeWidth={2.4} />
                        <F x={530} y={y + (row.note ? 30 : 39)} anchor="middle" size={24} color={row.strong ? RED : INK}>{row.integral}</F>
                        {row.note && <F x={530} y={y + 52} anchor="middle" size={14} color={MUTED} weight={400}>{row.note}</F>}
                    </g>
                )
            })}
            <Label x={360} y={height - 12} textAnchor="middle" fontSize={17} fill={MUTED}>{t(caption)}</Label>
        </Figure>
    )
}

/* ---------- 1. A family of antiderivatives: x³ + 2x + k, the same slope at x = 1 ---------- */

export function PrimitiveFamilyFigure({ language }: { language: UnitLanguage }) {
    const F0 = (k: number) => (x: number) => x ** 3 + 2 * x + k
    const tangent = (k: number) => (x: number) => 5 * (x - 1) + 3 + k
    return (
        <AreaPlot
            language={language}
            height={344}
            label={say('y = x³ + 2x + k, k = 4, 0 eta −4 baliotarako; malda bera x = 1 puntuan', 'y = x³ + 2x + k con k = 4, 0 y −4; la misma pendiente en x = 1', 'y = x³ + 2x + k مع k = 4 و 0 و −4؛ الميل نفسه عند x = 1', 'y = x³ + 2x + k with k = 4, 0 and −4; the same slope at x = 1')}
            box={{ xMin: -4, xMax: 4, yMin: -5, yMax: 5 }}
            cell={28}
            units={[0.5, 2]}
            curves={[
                { fn: F0(4), from: -2.2, to: 2.2, color: MUTED, dashed: true, width: 3 },
                { fn: F0(-4), from: -2.2, to: 2.2, color: MUTED, dashed: true, width: 3 },
                { fn: F0(0), from: -2.2, to: 2.2 },
                ...[4, 0, -4].map((k) => ({ fn: tangent(k), from: 0.55, to: 1.45, color: RED, width: 3 }))
            ]}
            dots={[4, 0, -4].map((k) => ({ at: [1, 3 + k] as [number, number], color: RED }))}
            notes={[
                { y: 76, formula: 'F(x) = x³ + 2x + k', size: 20 },
                { y: 112, formula: 'k = 4,  0,  −4', color: MUTED, size: 18 },
                { y: 168, formula: 'F′(x) = 3x² + 2', color: STAGE, size: 20 },
                { y: 204, text: say('Guztiek malda bera dute', 'Todas tienen la misma pendiente', 'لها كلها الميل نفسه', 'They all have the same slope'), size: 17 },
                { y: 260, formula: 'F′(1) = 5', color: RED, size: 20 }
            ]}
            notesX={330}
        />
    )
}

/* ---------- 2. The power rule, also with roots and fractions ---------- */

export function PowerRuleFigure({ language }: { language: UnitLanguage }) {
    return (
        <TableFigure
            language={language}
            label={say('Berreturaren erregela integratzeko, erroekin eta zatikiekin', 'La regla de la potencia para integrar, con raíces y fracciones', 'قاعدة القوة في التكامل مع الجذور والكسور', 'The power rule for integrating, with roots and fractions')}
            rows={[
                { key: 'power', fn: <>x{up('3')}</>, integral: <>x{up('4')}{back}/ 4</>, note: '3 + 1 = 4' },
                { key: 'root', fn: <>√x = x{up('1/2')}</>, integral: <>(2/3) x{up('3/2')}</>, note: '1/2 + 1 = 3/2' },
                { key: 'fraction', fn: <>1/x² = x{up('−2')}</>, integral: <>−x{up('−1')}{back}= −1/x</>, note: '−2 + 1 = −1' }
            ]}
            caption={say('Berretzaileari 1 gehitu, eta berriaz zatitu', 'Se suma 1 al exponente y se divide entre el nuevo', 'نضيف 1 إلى الأس ونقسم على الأس الجديد', 'Add 1 to the exponent and divide by the new one')}
        />
    )
}

/* ---------- 3. The antiderivative through (1, 6) ---------- */

export function ThroughPointFigure({ language }: { language: UnitLanguage }) {
    const F0 = (k: number) => (x: number) => x * x + 3 * x + k
    return (
        <AreaPlot
            language={language}
            height={334}
            label={say('y = x² + 3x + k familia: k = 6, 2 eta −2; k = 2 kurba bakarrik pasatzen da (1, 6) puntutik', 'La familia y = x² + 3x + k con k = 6, 2 y −2; solo la curva k = 2 pasa por (1, 6)', 'العائلة y = x² + 3x + k مع k = 6 و 2 و −2؛ المنحنى k = 2 وحده يمر بالنقطة (1, 6)', 'The family y = x² + 3x + k with k = 6, 2 and −2; only the curve k = 2 goes through (1, 6)')}
            box={{ xMin: -5, xMax: 3, yMin: -3, yMax: 6 }}
            cell={30}
            units={[1, 2]}
            curves={[
                { fn: F0(6), from: -5.5, to: 3.5, color: MUTED, dashed: true, width: 3 },
                { fn: F0(-2), from: -5.5, to: 3.5, color: MUTED, dashed: true, width: 3 },
                { fn: F0(2), from: -5.5, to: 3.5 }
            ]}
            dots={[{ at: [1, 6], color: RED, name: '(1, 6)' }]}
            notes={[
                { y: 76, formula: 'F(x) = x² + 3x + k', size: 20 },
                { y: 110, formula: 'k = 6,  2,  −2', color: MUTED, size: 18 },
                { y: 150, formula: 'F(1) = 4 + k = 6', color: RED, size: 20 },
                { y: 192, formula: 'k = 2', color: STAGE, size: 24 },
                { y: 240, text: say('Familiako kurba bakarra', 'Una sola curva de la familia', 'منحنى واحد من العائلة', 'Only one curve of the family'), size: 17 },
                { y: 266, text: say('pasatzen da puntutik', 'pasa por el punto', 'يمر بالنقطة', 'goes through the point'), size: 17 }
            ]}
            notesX={330}
        />
    )
}

/* ---------- 4. Exponentials and 1/x ---------- */

export function ExpLogFigure({ language }: { language: UnitLanguage }) {
    return (
        <TableFigure
            language={language}
            label={say('Integral berehalakoak: eˣ, aˣ eta 1/x', 'Integrales inmediatas: eˣ, aˣ y 1/x', 'تكاملات مباشرة: eˣ و aˣ و 1/x', 'Basic integrals: eˣ, aˣ and 1/x')}
            rows={[
                { key: 'e', fn: <>e{up('x')}</>, integral: <>e{up('x')}</> },
                { key: 'a', fn: <>a{up('x')}</>, integral: <>a{up('x')}{back}/ ln a</>, note: 'a > 0,  a ≠ 1' },
                { key: 'inverse', fn: '1 / x', integral: 'ln |x|', note: 'x ≠ 0', strong: true }
            ]}
            caption={say('Deribatuen taula, alderantziz irakurrita', 'La tabla de derivadas, leída al revés', 'جدول المشتقات مقروءًا بالعكس', 'The table of derivatives, read backwards')}
        />
    )
}

/* ---------- 5. Sine, cosine and 1 + tan² ---------- */

export function TrigFigure({ language }: { language: UnitLanguage }) {
    const { sin, tan } = trig(language)
    return (
        <TableFigure
            language={language}
            label={say('Integral trigonometrikoak: kosinua, sinua eta 1 + tg² x', 'Integrales trigonométricas: coseno, seno y 1 + tg² x', 'التكاملات المثلثية: جيب التمام والجيب و 1 + tan² x', 'Trigonometric integrals: cosine, sine and 1 + tan² x')}
            rows={[
                { key: 'cos', fn: 'cos x', integral: `${sin} x` },
                { key: 'sin', fn: `${sin} x`, integral: '−cos x', strong: true },
                { key: 'tan', fn: <>1 + {tan}² x</>, integral: `${tan} x` }
            ]}
            caption={say('Minus zeinua sinuaren integralean dago', 'El signo menos está en la integral del seno', 'إشارة السالب في تكامل الجيب', 'The minus sign is in the integral of sine')}
        />
    )
}

/* ---------- 6. Arctangent and arcsine, and completing the square ---------- */

export function ArcsFigure({ language }: { language: UnitLanguage }) {
    const { arcsin, arctan } = trig(language)
    return (
        <TableFigure
            language={language}
            label={say('Arku tangentea eta arku sinua; karratua osatuta, arctg (x − 2)', 'Arcotangente y arcoseno; completando el cuadrado, arctg (x − 2)', 'قوس الظل وقوس الجيب؛ وبإكمال المربع arctan (x − 2)', 'Arctangent and arcsine; completing the square, arctan (x − 2)')}
            rows={[
                { key: 'atan', fn: '1 / (1 + x²)', integral: `${arctan} x` },
                { key: 'asin', fn: '1 / √(1 − x²)', integral: `${arcsin} x` },
                { key: 'square', fn: '1 / ((x − 2)² + 1)', integral: `${arctan} (x − 2)`, note: 'x² − 4x + 5 = (x − 2)² + 1', strong: true }
            ]}
            caption={say('Karratua osatzean, arku tangente bat agertzen da', 'Al completar el cuadrado aparece una arcotangente', 'عند إكمال المربع يظهر قوس ظل', 'Completing the square, an arctangent appears')}
        />
    )
}

/* ---------- 7. The chain rule backwards ---------- */

export function ChainBackFigure({ language }: { language: UnitLanguage }) {
    const t = (text: LocalizedText) => pickText(language, text)
    const box = (x: number, stroke: string, fill: string, name: LocalizedText, formula: ReactNode) => (
        <g>
            <rect x={x} y={56} width={250} height={104} rx={16} fill={fill} stroke={stroke} strokeWidth={2.4} />
            <Label x={x + 125} y={86} textAnchor="middle" fontSize={15} fill={MUTED}>{t(name)}</Label>
            <F x={x + 125} y={130} anchor="middle" size={24}>{formula}</F>
        </g>
    )
    return (
        <Figure height={296} label={t(say('(x² + 1)⁴/4 deribatzean 2x · (x² + 1)³ ateratzen da; integratzean, alderantziz', 'Al derivar (x² + 1)⁴/4 sale 2x · (x² + 1)³; al integrar, al revés', 'اشتقاق (x² + 1)⁴/4 يعطي 2x · (x² + 1)³، والتكامل بالعكس', 'Differentiating (x² + 1)⁴/4 gives 2x · (x² + 1)³; integrating goes back'))}>
            {box(50, STAGE, STAGE_TINT, say('Jatorrizkoa', 'Primitiva', 'الدالة الأصلية', 'Antiderivative'), <>(x² + 1){up('4')}{back}/ 4</>)}
            {box(420, INK, PAPER, say('Funtzioa', 'Función', 'الدالة', 'Function'), <><tspan fill={BLUE}>2x</tspan> · (x² + 1){up('3')}</>)}
            <line x1={312} y1={86} x2={404} y2={86} stroke={INK} strokeWidth={2.4} markerEnd="url(#integral-arrow)" />
            <line x1={408} y1={134} x2={316} y2={134} stroke={STAGE} strokeWidth={2.4} markerEnd="url(#integral-arrow-stage)" />
            <defs>
                <marker id="integral-arrow" markerWidth={10} markerHeight={10} refX={8} refY={5} orient="auto"><path d="M0,0 L10,5 L0,10 Z" fill={INK} /></marker>
                <marker id="integral-arrow-stage" markerWidth={10} markerHeight={10} refX={8} refY={5} orient="auto"><path d="M0,0 L10,5 L0,10 Z" fill={STAGE} /></marker>
            </defs>
            <Label x={360} y={74} textAnchor="middle" fontSize={15} fill={INK}>{t(say('deribatu', 'derivar', 'اشتقاق', 'differentiate'))}</Label>
            <Label x={360} y={158} textAnchor="middle" fontSize={15} fill={STAGE}>{t(say('integratu', 'integrar', 'تكامل', 'integrate'))}</Label>
            <rect x={160} y={200} width={400} height={56} rx={14} fill={PAPER} stroke={BLUE} strokeWidth={2.4} />
            <F x={360} y={236} anchor="middle" size={22} color={BLUE}>u = x² + 1,   u′ = 2x</F>
            <Label x={360} y={286} textAnchor="middle" fontSize={17} fill={MUTED}>{t(say('Kanpoan barrukoaren deribatua dago', 'Fuera está la derivada de lo de dentro', 'في الخارج مشتقة الداخل', 'The derivative of the inside is outside'))}</Label>
        </Figure>
    )
}

/* ---------- 8. The numerator is the derivative of the denominator ---------- */

export function LogPatternFigure({ language }: { language: UnitLanguage }) {
    const t = (text: LocalizedText) => pickText(language, text)
    return (
        <Figure height={300} label={t(say('(2x + 3)/(x² + 3x): zenbakitzailea izendatzailearen deribatua da, eta integrala ln |x² + 3x| da', '(2x + 3)/(x² + 3x): el numerador es la derivada del denominador, y la integral es ln |x² + 3x|', '(2x + 3)/(x² + 3x): البسط مشتقة المقام، والتكامل ln |x² + 3x|', '(2x + 3)/(x² + 3x): the numerator is the derivative of the denominator, and the integral is ln |x² + 3x|'))}>
            <rect x={30} y={30} width={330} height={170} rx={16} fill={PAPER} stroke={INK} strokeWidth={2} />
            <F x={170} y={92} anchor="middle" size={28} color={BLUE}>2x + 3</F>
            <line x1={90} y1={112} x2={250} y2={112} stroke={INK} strokeWidth={2.4} />
            <F x={170} y={152} anchor="middle" size={28}>x² + 3x</F>
            <path d="M256 146 C 300 140, 300 90, 256 84" fill="none" stroke={BLUE} strokeWidth={2.4} markerEnd="url(#integral-log-arrow)" />
            <defs>
                <marker id="integral-log-arrow" markerWidth={10} markerHeight={10} refX={8} refY={5} orient="auto"><path d="M0,0 L10,5 L0,10 Z" fill={BLUE} /></marker>
            </defs>
            <F x={304} y={122} size={18} color={BLUE}>( )′</F>
            <rect x={380} y={30} width={300} height={74} rx={14} fill={STAGE_TINT} stroke={STAGE} strokeWidth={2.4} />
            <F x={530} y={76} anchor="middle" size={22}>u′ / u  →  ln |u|</F>
            <rect x={380} y={126} width={300} height={74} rx={14} fill={PAPER} stroke={STAGE} strokeWidth={2.4} />
            <F x={530} y={172} anchor="middle" size={22}>u′ · e{up('u')}{back}→  e{up('u')}</F>
            <F x={360} y={248} anchor="middle" size={24} color={BLUE}>ln |x² + 3x| + k</F>
            <Label x={360} y={286} textAnchor="middle" fontSize={17} fill={MUTED}>{t(say('Goian beheko adierazpenaren deribatua dago', 'Arriba está la derivada de lo de abajo', 'في الأعلى مشتقة ما في الأسفل', 'The top is the derivative of the bottom'))}</Label>
        </Figure>
    )
}

/* ---------- 9. Multiply inside and divide outside ---------- */

export function AdjustFigure({ language }: { language: UnitLanguage }) {
    const t = (text: LocalizedText) => pickText(language, text)
    const { sin } = trig(language)
    return (
        <Figure height={300} label={t(say('∫ x cos(x²) dx = ½ ∫ 2x cos(x²) dx: 2 zenbakiaz barruan biderkatu eta kanpoan zatitu', '∫ x cos(x²) dx = ½ ∫ 2x cos(x²) dx: se multiplica por 2 dentro y se divide fuera', '∫ x cos(x²) dx = ½ ∫ 2x cos(x²) dx: نضرب في 2 في الداخل ونقسم في الخارج', '∫ x cos(x²) dx = ½ ∫ 2x cos(x²) dx: multiply by 2 inside and divide outside'))}>
            <rect x={110} y={24} width={500} height={64} rx={14} fill={PAPER} stroke={INK} strokeWidth={2} />
            <F x={360} y={66} anchor="middle" size={26}>∫ x · cos(x²) dx</F>
            <rect x={110} y={116} width={500} height={64} rx={14} fill={STAGE_TINT} stroke={STAGE} strokeWidth={2.4} />
            <F x={360} y={158} anchor="middle" size={26}><tspan fill={RED}>½</tspan> ∫ <tspan fill={BLUE}>2</tspan>x · cos(x²) dx</F>
            <rect x={28} y={124} width={66} height={48} rx={12} fill={PAPER} stroke={RED} strokeWidth={2.4} />
            <F x={61} y={156} anchor="middle" size={22} color={RED}>· ½</F>
            <rect x={626} y={124} width={66} height={48} rx={12} fill={PAPER} stroke={BLUE} strokeWidth={2.4} />
            <F x={659} y={156} anchor="middle" size={22} color={BLUE}>· 2</F>
            <Label x={61} y={200} textAnchor="middle" fontSize={14} fill={RED}>{t(say('kanpoan', 'fuera', 'خارجًا', 'outside'))}</Label>
            <Label x={659} y={200} textAnchor="middle" fontSize={14} fill={BLUE}>{t(say('barruan', 'dentro', 'داخلًا', 'inside'))}</Label>
            <F x={360} y={238} anchor="middle" size={24}>= ½ {sin}(x²) + k</F>
            <Label x={360} y={284} textAnchor="middle" fontSize={17} fill={MUTED}>{t(say('½ · 2 = 1: balioa ez da aldatzen', '½ · 2 = 1: el valor no cambia', '½ · 2 = 1: لا تتغير القيمة', '½ · 2 = 1: the value does not change'))}</Label>
        </Figure>
    )
}

/* ---------- 10. Four rectangles under x² on [0, 2] ---------- */

export function RectanglesFigure({ language }: { language: UnitLanguage }) {
    const square = (x: number) => x * x
    return (
        <AreaPlot
            language={language}
            height={318}
            label={say('y = x² eta 0,5 oinarriko lau laukizuzen, 0 eta 2 artean, altuera eskuinean', 'y = x² y cuatro rectángulos de base 0,5 entre 0 y 2, con la altura a la derecha', 'y = x² وأربعة مستطيلات قاعدتها 0.5 بين 0 و 2، والارتفاع عند اليمين', 'y = x² and four rectangles of base 0.5 between 0 and 2, height on the right')}
            box={{ xMin: -1, xMax: 5, yMin: -1, yMax: 5 }}
            cell={40}
            units={[0.5, 1]}
            curves={[{ fn: square, from: -0.5, to: 2.4 }]}
            bars={[0, 0.5, 1, 1.5].map((x) => ({ x, width: 0.5, height: square(x + 0.5) }))}
            notes={[
                { y: 76, formula: decimal(language, '0,5 · (0,25 + 1 + 2,25 + 4)'), size: 18 },
                { y: 112, formula: decimal(language, '= 3,75'), color: BLUE, size: 22 },
                { y: 172, formula: decimal(language, 'n → ∞ :  8/3 ≈ 2,67'), color: STAGE, size: 20 },
                { y: 226, text: say('Laukizuzen estuagoak:', 'Rectángulos más estrechos:', 'مستطيلات أضيق:', 'Narrower rectangles:'), size: 17 },
                { y: 254, text: say('hurbilketa hobea', 'mejor aproximación', 'تقريب أفضل', 'a better approximation'), size: 17 }
            ]}
            notesX={320}
        />
    )
}

/* ---------- 11. Barrow: the area under x² on [0, 2] is 8/3 ---------- */

export function BarrowFigure({ language }: { language: UnitLanguage }) {
    const square = (x: number) => x * x
    return (
        <AreaPlot
            language={language}
            height={318}
            label={say('y = x² kurbaren azpiko azalera, 0 eta 2 artean: 8/3', 'El área bajo y = x² entre 0 y 2: 8/3', 'المساحة تحت y = x² بين 0 و 2: 8/3', 'The area under y = x² between 0 and 2: 8/3')}
            box={{ xMin: -1, xMax: 5, yMin: -1, yMax: 5 }}
            cell={40}
            units={[0.5, 1]}
            fills={[{ fn: square, from: 0, to: 2, color: BLUE }]}
            curves={[{ fn: square, from: -0.5, to: 2.4 }]}
            marks={[{ at: [1.45, 0.8], text: '8/3', color: BLUE, size: 20 }]}
            notes={[
                { y: 76, formula: 'F(x) = x³/3', size: 20 },
                { y: 128, formula: 'F(2) − F(0)', size: 20 },
                { y: 164, formula: '= 8/3 − 0 = 8/3', color: BLUE, size: 22 },
                { y: 222, text: say('Laukizuzenak hurbiltzen', 'El número al que se', 'العدد الذي كانت', 'The number the rectangles'), size: 17 },
                { y: 250, text: say('ziren zenbakia', 'acercaban los rectángulos', 'المستطيلات تقترب منه', 'were approaching'), size: 17 }
            ]}
            notesX={320}
        />
    )
}

/* ---------- 12. Splitting at a point and swapping the limits ---------- */

/** A falling curve with ∫₀³ f ≈ 5 and ∫₃⁷ f ≈ 2 */
const falling = (x: number) => 2.705 * Math.exp(-0.3539 * x)

export function PropertiesFigure({ language }: { language: UnitLanguage }) {
    return (
        <AreaPlot
            language={language}
            height={292}
            label={say('f funtzioaren azpiko azalera 3 puntuan zatituta: 5 eta 2; guztira 7', 'El área bajo f partida en 3: 5 y 2; en total 7', 'المساحة تحت f مقسومة عند 3: 5 و 2؛ والمجموع 7', 'The area under f split at 3: 5 and 2; 7 in all')}
            box={{ xMin: -1, xMax: 8, yMin: -1, yMax: 4 }}
            cell={32}
            labelStep={1}
            fills={[{ fn: falling, from: 0, to: 3, color: BLUE }, { fn: falling, from: 3, to: 7, color: VIOLET }]}
            curves={[{ fn: falling, from: -0.5, to: 8 }]}
            verticals={[3, 7]}
            marks={[{ at: [1.4, 0.75], text: '5', color: BLUE, size: 22 }, { at: [5.4, 0.95], text: '2', color: VIOLET, size: 20 }]}
            notes={[
                { y: 70, formula: '∫₀³ f = 5', color: BLUE, size: 20 },
                { y: 108, formula: '∫₃⁷ f = 2', color: VIOLET, size: 20 },
                { y: 160, formula: '∫₀⁷ f = 5 + 2 = 7', size: 20 },
                { y: 212, formula: '∫₇³ f = −2', size: 20 },
                { y: 244, text: say('Mugak alderantziz: zeinua aldatzen da', 'Límites al revés: cambia el signo', 'الحدّان بالعكس: تتغير الإشارة', 'Limits swapped: the sign changes'), color: MUTED, size: 16 }
            ]}
            notesX={360}
        />
    )
}

/* ---------- 13. The area under 4 − x² ---------- */

export function AreaAxisFigure({ language }: { language: UnitLanguage }) {
    const cap = (x: number) => 4 - x * x
    return (
        <AreaPlot
            language={language}
            height={318}
            label={say('y = 4 − x² kurbaren eta X ardatzaren arteko azalera, −2 eta 2 artean: 32/3', 'El área entre y = 4 − x² y el eje X, entre −2 y 2: 32/3', 'المساحة بين y = 4 − x² ومحور X بين −2 و 2: 32/3', 'The area between y = 4 − x² and the x-axis, between −2 and 2: 32/3')}
            box={{ xMin: -3, xMax: 3, yMin: -1, yMax: 5 }}
            cell={38}
            fills={[{ fn: cap, from: -2, to: 2, color: BLUE }]}
            curves={[{ fn: cap, from: -2.6, to: 2.6 }]}
            dots={[{ at: [-2, 0] }, { at: [2, 0] }]}
            marks={[{ at: [-1.1, 1.2], text: '32/3', color: BLUE, size: 20 }]}
            notes={[
                { y: 76, formula: '4 − x² = 0 :  x = ±2', size: 20 },
                { y: 128, formula: <>[4x − x³/3]<tspan dy={8} fontSize="66%">−2</tspan><tspan dy={-18} fontSize="66%">2</tspan></>, size: 20 },
                { y: 176, formula: '= 16/3 + 16/3 = 32/3', color: BLUE, size: 20 },
                { y: 232, text: say('Azalera: 32/3 u²', 'Área: 32/3 u²', 'المساحة: 32/3 وحدة مربعة', 'Area: 32/3 square units'), size: 18 }
            ]}
            notesX={320}
        />
    )
}

/* ---------- 14. x² − 2x on [0, 3]: below, then above the axis ---------- */

export function AreaSignFigure({ language }: { language: UnitLanguage }) {
    const dip = (x: number) => x * x - 2 * x
    return (
        <AreaPlot
            language={language}
            height={318}
            label={say('y = x² − 2x: ardatzaren azpian 0 eta 2 artean (−4/3), gainean 2 eta 3 artean (4/3)', 'y = x² − 2x: bajo el eje entre 0 y 2 (−4/3), encima entre 2 y 3 (4/3)', 'y = x² − 2x: تحت المحور بين 0 و 2 (−4/3) وفوقه بين 2 و 3 (4/3)', 'y = x² − 2x: below the axis between 0 and 2 (−4/3), above between 2 and 3 (4/3)')}
            box={{ xMin: -1, xMax: 4, yMin: -2, yMax: 4 }}
            cell={38}
            labelStep={1}
            fills={[{ fn: dip, from: 0, to: 2, color: RED }, { fn: dip, from: 2, to: 3, color: BLUE }]}
            curves={[{ fn: dip, from: -0.8, to: 3.4 }]}
            dots={[{ at: [0, 0] }, { at: [2, 0] }]}
            marks={[{ at: [1, -1.55], text: '−4/3', color: RED, size: 18 }, { at: [3.55, 1.1], text: '4/3', color: BLUE, size: 18 }]}
            notes={[
                { y: 76, formula: '∫₀² = −4/3', color: RED, size: 20 },
                { y: 116, formula: '∫₂³ = 4/3', color: BLUE, size: 20 },
                { y: 168, formula: '∫₀³ = 0', color: MUTED, size: 20 },
                { y: 222, text: say('Azalera:', 'Área:', 'المساحة:', 'Area:'), size: 18 },
                { y: 256, formula: '4/3 + 4/3 = 8/3', size: 20 }
            ]}
            notesX={300}
        />
    )
}

/* ---------- 15. Between y = 2x and y = x² ---------- */

export function BetweenCurvesFigure({ language }: { language: UnitLanguage }) {
    const square = (x: number) => x * x
    const double = (x: number) => 2 * x
    return (
        <AreaPlot
            language={language}
            height={318}
            label={say('y = 2x eta y = x² kurben arteko azalera, 0 eta 2 artean: 4/3', 'El área entre y = 2x e y = x², entre 0 y 2: 4/3', 'المساحة بين y = 2x و y = x² بين 0 و 2: 4/3', 'The area between y = 2x and y = x², between 0 and 2: 4/3')}
            box={{ xMin: -2, xMax: 6, yMin: -1, yMax: 5 }}
            cell={36}
            units={[0.5, 1]}
            fills={[{ fn: double, base: square, from: 0, to: 2, color: BLUE }]}
            curves={[{ fn: square, from: -0.9, to: 2.3 }, { fn: double, from: -0.6, to: 2.6, color: VIOLET }]}
            dots={[{ at: [0, 0], color: INK }, { at: [2, 4], color: INK, name: '(2, 4)' }]}
            notes={[
                { y: 76, formula: 'x² = 2x :  x = 0,  x = 2', size: 20 },
                { y: 126, formula: 'y = 2x', color: VIOLET, size: 20 },
                { y: 158, formula: 'y = x²', color: STAGE, size: 20 },
                { y: 214, formula: '∫₀² (2x − x²) dx = 4/3', color: BLUE, size: 20 },
                { y: 254, text: say('Goikoa ken behekoa', 'La de arriba menos la de abajo', 'الأعلى ناقص الأدنى', 'The top one minus the bottom one'), size: 17 }
            ]}
            notesX={360}
        />
    )
}

/* ---------- The cover ---------- */

export function BachIntegralsHeroArt() {
    // The curve in the card's own pixels: a gentle wave over the axis (y = 160)
    const curve = (x: number) => 104 - 42 * Math.sin((x - 20) / 62)
    const along = (from: number, to: number) => Array.from({ length: 41 }, (_, k) => from + ((to - from) * k) / 40)
    const path = along(28, 252).map((x, k) => `${k === 0 ? 'M' : 'L'}${x.toFixed(1)} ${curve(x).toFixed(1)}`).join(' ')
    const area = `${along(70, 230).map((x, k) => `${k === 0 ? 'M' : 'L'}${x.toFixed(1)} ${curve(x).toFixed(1)}`).join(' ')} L230 160 L70 160 Z`
    return (
        <div className="fraction-v2-collage" aria-hidden="true">
            <svg viewBox="0 0 520 400" direction="ltr" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                <g transform="translate(24 28) rotate(-4)">
                    <rect width={270} height={210} rx={16} fill={PAPER} stroke={INK} strokeWidth={2} />
                    <line x1={20} y1={160} x2={255} y2={160} stroke={INK} strokeWidth={2} />
                    <path d={area} fill={BLUE} fillOpacity={0.26} />
                    {[70, 110, 150, 190].map((x) => {
                        const top = curve(x + 40)
                        return <rect key={x} x={x} y={top} width={40} height={160 - top} fill="none" stroke={BLUE} strokeWidth={2} />
                    })}
                    <path d={path} fill="none" stroke="#2f6fdb" strokeWidth={4} strokeLinecap="round" />
                    <text x={70} y={184} textAnchor="middle" fontSize={18} fontWeight={700} fill={INK} fontFamily={SERIF}>a</text>
                    <text x={230} y={184} textAnchor="middle" fontSize={18} fontWeight={700} fill={INK} fontFamily={SERIF}>b</text>
                </g>
                <g transform="translate(316 52) rotate(5)">
                    <rect width={180} height={120} rx={16} fill="#d9efe2" stroke={INK} strokeWidth={2} />
                    <text x={90} y={74} textAnchor="middle" fontSize={30} fontWeight={700} fill={INK} fontFamily={SERIF}>F′ = f</text>
                </g>
                <g transform="translate(60 272) rotate(2)">
                    <rect width={400} height={88} rx={16} fill="#f6d8cf" stroke={INK} strokeWidth={2} />
                    <text x={200} y={58} textAnchor="middle" fontSize={30} fontWeight={700} fill={INK} fontFamily={SERIF}>∫ₐᵇ f(x) dx = F(b) − F(a)</text>
                </g>
            </svg>
        </div>
    )
}
