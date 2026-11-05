import type { ReactNode } from 'react'
import { pickText, type LocalizedText, type UnitLanguage } from '../../features/unit-v2/types'
import { decimalSeparatorFor } from '../../utils/numberFormat'
import { Label } from '../dbh2-funtzioak-v2/plane'
import { Figure } from '../dbh2-zatikiak-prototype/figures'

/* ==========================================================================
   Zenbaki errealak · Batxilergoa 1 · Zientziak — the new lesson figures:
   two sets in a Venn diagram, √2, √5 and the golden ratio built with a
   compass, the distance between two points, a neighbourhood, the band of
   the rounding error, the same error on two sizes, the logarithmic scale
   (lengths add, numbers multiply) and the square of a binomial next to
   Tartaglia. Irrationals, intervals, scientific notation, radicals,
   logarithms and Tartaglia reuse the 4. DBH figures. Formulas sit in their
   own <text> (left to right in every language); words go through <Label>.
   ========================================================================== */

const INK = 'var(--ink, #1d2733)'
const MUTED = 'var(--muted, #58616e)'
const STAGE = 'var(--stage, #2f6fdb)'
const STAGE_TINT = 'var(--stage-tint, #dde7f7)'
const SECOND = 'var(--second, #c4432a)'
const MUSTARD_TINT = 'var(--mustard-tint, #fbebc0)'
const GREEN_TINT = '#d6eddf'
const PAPER = '#fffcf6'

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })

/** Picks the text; the decimal commas of the numbers become the point in Arabic and English */
const useText = (language: UnitLanguage) => {
    const mark = language === 'ar' ? '.' : decimalSeparatorFor(language)
    const d = (text: string) => text.replace(/(\d),(\d)/g, `$1${mark}$2`)
    return { d, t: (text: LocalizedText) => (language === 'ar' ? d(pickText(language, text)) : pickText(language, text)) }
}

function Caption({ y, children }: { y: number; children: ReactNode }) {
    return <Label x={360} y={y} textAnchor="middle" fontSize={20} fill={MUTED}>{children}</Label>
}

/** A formula written left to right whatever the language */
function F({ x, y, children, size = 20, color = INK, anchor = 'start', weight = 700 }: { x: number; y: number; children: ReactNode; size?: number; color?: string; anchor?: 'start' | 'middle' | 'end'; weight?: number }) {
    return <text x={x} y={y} textAnchor={anchor} fontSize={size} fontWeight={weight} fill={color} direction="ltr">{children}</text>
}

/** A number line from x1 to x2 at height y, with an arrowhead on the right */
function Line({ x1, x2, y }: { x1: number; x2: number; y: number }) {
    return (
        <g>
            <line x1={x1} x2={x2 - 8} y1={y} y2={y} stroke={INK} strokeWidth={2} />
            <polygon points={`${x2},${y} ${x2 - 12},${y - 6} ${x2 - 12},${y + 6}`} fill={INK} />
        </g>
    )
}

function Tick({ x, y, label, color = INK }: { x: number; y: number; label: string; color?: string }) {
    return (
        <g>
            <line x1={x} x2={x} y1={y - 7} y2={y + 7} stroke={color} strokeWidth={2} />
            <F x={x} y={y + 32} anchor="middle" size={21} color={color} weight={600}>{label}</F>
        </g>
    )
}

/* ---------- Two sets ---------- */

export function SetsFigure({ language }: { language: UnitLanguage }) {
    const { t } = useText(language)
    const only = (x: number, values: string[]) => values.map((value, index) => <F key={value} x={x} y={112 + index * 40} anchor="middle" size={28}>{value}</F>)
    return (
        <Figure height={300} label={t(say('A eta B multzoak: 2 eta 4 bietan daude', 'Los conjuntos A y B: el 2 y el 4 están en los dos', 'المجموعتان A وB: العددان 2 و4 في الاثنتين', 'The sets A and B: 2 and 4 are in both'))}>
            <circle cx={290} cy={140} r={110} fill={STAGE_TINT} fillOpacity={0.7} stroke={INK} strokeWidth={2} />
            <circle cx={430} cy={140} r={110} fill={MUSTARD_TINT} fillOpacity={0.7} stroke={INK} strokeWidth={2} />
            <path d="M 360 55 A 110 110 0 0 1 360 225 A 110 110 0 0 1 360 55 Z" fill={GREEN_TINT} stroke={INK} strokeWidth={2} />
            <F x={200} y={44} anchor="middle" size={30} color={STAGE}>A</F>
            <F x={520} y={44} anchor="middle" size={30} color={SECOND}>B</F>
            {only(240, ['1', '3', '6'])}
            {only(360, ['2', '4'])}
            {only(480, ['8'])}
            <F x={360} y={282} anchor="middle" size={22}>A ∩ B = {'{'}2, 4{'}'}    A − B = {'{'}1, 3, 6{'}'}</F>
        </Figure>
    )
}

/* ---------- √2, √5 and the golden ratio on the line ---------- */

export function ExactLineFigure({ language }: { language: UnitLanguage }) {
    const { t, d } = useText(language)
    const unit = 150
    const x0 = 70
    const y = 220
    const at = (value: number) => x0 + value * unit
    const r5 = Math.sqrt(5) * unit
    const r2 = Math.sqrt(2) * unit
    return (
        <Figure height={310} label={t(say('√2 karratuaren diagonala da; √5, 2 eta 1 katetoen hipotenusa; konpasak zuzenera eramaten ditu', '√2 es la diagonal del cuadrado; √5, la hipotenusa de catetos 2 y 1; el compás los lleva a la recta', '√2 قطر المربع، و√5 وتر الضلعين 2 و1، والفرجار ينقلهما إلى المستقيم', '√2 is the diagonal of the square; √5, the hypotenuse with legs 2 and 1; the compass carries them to the line'))}>
            <rect x={at(0)} y={y - unit} width={unit} height={unit} fill={STAGE_TINT} stroke={INK} strokeWidth={1.6} />
            <line x1={at(0)} y1={y} x2={at(1)} y2={y - unit} stroke={STAGE} strokeWidth={3} />
            <path d={`M ${at(1)} ${y - unit} A ${r2} ${r2} 0 0 1 ${at(Math.SQRT2)} ${y}`} fill="none" stroke={STAGE} strokeWidth={2} strokeDasharray="6 5" />
            <line x1={at(2)} y1={y} x2={at(2)} y2={y - unit} stroke={INK} strokeWidth={2} />
            <line x1={at(0)} y1={y} x2={at(2)} y2={y - unit} stroke={SECOND} strokeWidth={3} />
            <path d={`M ${at(2)} ${y - unit} A ${r5} ${r5} 0 0 1 ${at(Math.sqrt(5))} ${y}`} fill="none" stroke={SECOND} strokeWidth={2} strokeDasharray="6 5" />
            <F x={at(1.55)} y={y - unit - 10} anchor="middle" size={26} color={SECOND}>√5</F>
            <F x={at(0.42)} y={y - unit / 2 - 6} anchor="middle" size={26} color={STAGE}>√2</F>
            <F x={at(2) + 14} y={y - unit / 2} size={21} color={MUTED}>1</F>
            <Line x1={40} x2={690} y={y} />
            {[0, 1, 2, 3].map((value) => <Tick key={value} x={at(value)} y={y} label={String(value)} />)}
            <circle cx={at(Math.SQRT2)} cy={y} r={6} fill={STAGE} />
            <circle cx={at(Math.sqrt(5))} cy={y} r={6} fill={SECOND} />
            <circle cx={at((1 + Math.sqrt(5)) / 2)} cy={y} r={6} fill={INK} />
            <F x={at((1 + Math.sqrt(5)) / 2)} y={y + 62} anchor="middle" size={22}>φ = (1 + √5)/2</F>
            <Caption y={300}>{d(t(say('φ ≈ 1,618: 1 gehi √5, bitan zatituta', 'φ ≈ 1,618: 1 más √5, partido entre 2', 'φ ≈ 1,618: مجموع 1 و√5 مقسومًا على 2', 'φ ≈ 1,618: 1 plus √5, divided by 2')))}</Caption>
        </Figure>
    )
}

/* ---------- Distance on the line ---------- */

export function DistanceFigure({ language }: { language: UnitLanguage }) {
    const { t } = useText(language)
    const at = (value: number) => 90 + (value + 4) * 56
    const y = 150
    return (
        <Figure height={230} label={t(say('−2 eta 5 arteko distantzia 7 da', 'La distancia entre −2 y 5 es 7', 'المسافة بين ⁦−2⁩ و5 تساوي 7', 'The distance between −2 and 5 is 7'))}>
            <Line x1={50} x2={690} y={y} />
            {[-4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6].map((value) => <Tick key={value} x={at(value)} y={y} label={value < 0 ? `−${-value}` : String(value)} color={value === 0 ? INK : MUTED} />)}
            <line x1={at(-2)} x2={at(5)} y1={y - 40} y2={y - 40} stroke={SECOND} strokeWidth={3} />
            <line x1={at(-2)} x2={at(-2)} y1={y - 50} y2={y - 30} stroke={SECOND} strokeWidth={3} />
            <line x1={at(5)} x2={at(5)} y1={y - 50} y2={y - 30} stroke={SECOND} strokeWidth={3} />
            <F x={(at(-2) + at(5)) / 2} y={y - 56} anchor="middle" size={27} color={SECOND}>|5 − (−2)| = 7</F>
            <circle cx={at(-2)} cy={y} r={7} fill={SECOND} />
            <circle cx={at(5)} cy={y} r={7} fill={SECOND} />
            <Caption y={218}>{t(say('Distantzia ez da negatiboa: |−2 − 5| = 7 ere bai', 'La distancia no es negativa: también |−2 − 5| = 7', 'المسافة ليست سالبة: |−2 − 5| = 7 أيضًا', 'Distance is not negative: |−2 − 5| = 7 as well'))}</Caption>
        </Figure>
    )
}

/* ---------- A neighbourhood ---------- */

export function NeighbourhoodFigure({ language }: { language: UnitLanguage }) {
    const { t } = useText(language)
    const y = 150
    const [left, centre, right] = [200, 360, 520]
    return (
        <Figure height={250} label={t(say('E(a, r) ingurunea: a erdigunea, r erradioa, muturrak kanpoan', 'El entorno E(a, r): centro a, radio r, extremos fuera', 'الجوار E(a, r): المركز a ونصف القطر r والطرفان خارجه', 'The neighbourhood E(a, r): centre a, radius r, endpoints left out'))}>
            <Line x1={60} x2={680} y={y} />
            <rect x={left} y={y - 10} width={right - left} height={20} fill={STAGE_TINT} />
            <line x1={left} x2={right} y1={y} y2={y} stroke={STAGE} strokeWidth={5} />
            <circle cx={left} cy={y} r={8} fill={PAPER} stroke={STAGE} strokeWidth={3} />
            <circle cx={right} cy={y} r={8} fill={PAPER} stroke={STAGE} strokeWidth={3} />
            <circle cx={centre} cy={y} r={6} fill={INK} />
            <F x={left} y={y + 40} anchor="middle" size={25}>a − r</F>
            <F x={centre} y={y + 40} anchor="middle" size={25}>a</F>
            <F x={right} y={y + 40} anchor="middle" size={25}>a + r</F>
            {[[left, centre], [centre, right]].map(([from, to]) => (
                <g key={from}>
                    <line x1={from + 10} x2={to - 10} y1={y - 40} y2={y - 40} stroke={SECOND} strokeWidth={2} />
                    <F x={(from + to) / 2} y={y - 50} anchor="middle" size={25} color={SECOND}>r</F>
                </g>
            ))}
            <F x={360} y={56} anchor="middle" size={26}>|x − a| &lt; r  ⟺  a − r &lt; x &lt; a + r</F>
            <Caption y={236}>{t(say('E(a, r) = (a − r, a + r): a zenbakitik r baino gutxiagora', 'E(a, r) = (a − r, a + r): a menos de r de a', 'E(a, r) = (a − r, a + r): على بعد أقل من r عن a', 'E(a, r) = (a − r, a + r): less than r away from a'))}</Caption>
        </Figure>
    )
}

/* ---------- The rounding error ---------- */

export function ErrorBoundFigure({ language }: { language: UnitLanguage }) {
    const { t, d } = useText(language)
    const y = 140
    const at = (value: number) => 360 + (value - 2.72) * 24000
    return (
        <Figure height={250} label={d(t(say('2,7183 zenbakia 2,72 da biribilduta; errorea 0,005 baino txikiagoa da', '2,7183 redondeado es 2,72; el error es menor que 0,005', 'العدد 2,7183 بعد التدوير 2,72، والخطأ أقل من 0,005', '2,7183 rounded is 2,72; the error is less than 0,005')))}>
            <rect x={at(2.715)} y={y - 26} width={at(2.725) - at(2.715)} height={52} fill={MUSTARD_TINT} stroke={INK} strokeWidth={1.4} strokeDasharray="5 4" />
            <Line x1={50} x2={690} y={y} />
            {[2.71, 2.72, 2.73].map((value) => <Tick key={value} x={at(value)} y={y} label={d(value.toFixed(2).replace('.', ','))} />)}
            {[2.715, 2.725].map((value) => <line key={value} x1={at(value)} x2={at(value)} y1={y - 4} y2={y + 4} stroke={MUTED} strokeWidth={1.6} />)}
            <circle cx={at(2.7183)} cy={y} r={7} fill={SECOND} />
            <F x={at(2.7183)} y={y - 40} anchor="middle" size={24} color={SECOND}>{d('2,7183…')}</F>
            <F x={360} y={y + 68} anchor="middle" size={22}>{d('2,715 ≤ x < 2,725')}</F>
            <Caption y={238}>{d(t(say('Biribiltzean, errorea < 0,005: azken zifraren unitate erdia', 'Al redondear, error < 0,005: media unidad de la última cifra', 'عند التدوير الخطأ < 0,005: نصف وحدة الرقم الأخير', 'When rounding, error < 0,005: half a unit of the last figure')))}</Caption>
        </Figure>
    )
}

/* ---------- The same error on two sizes ---------- */

export function RelativeErrorFigure({ language }: { language: UnitLanguage }) {
    const { t, d } = useText(language)
    return (
        <Figure height={270} label={t(say('1 mm-ko errorea: % 10 zentimetro batean, % 0,1 metro batean', 'Un error de 1 mm: el 10 % en un centímetro, el 0,1 % en un metro', 'خطأ 1 مم: ‏10 % في سنتيمتر و0,1 % في متر', 'An error of 1 mm: 10% on a centimetre, 0.1% on a metre'))}>
            <Label x={40} y={46} fontSize={21} fontWeight={700} fill={INK}>{t(say('Akats bera: 1 mm', 'El mismo error: 1 mm', 'الخطأ نفسه: 1 مم', 'The same error: 1 mm'))}</Label>
            <rect x={40} y={70} width={60} height={34} fill={STAGE_TINT} stroke={INK} strokeWidth={1.6} />
            <rect x={94} y={70} width={6} height={34} fill={SECOND} />
            <F x={120} y={96} size={23}>1 cm</F>
            <F x={680} y={94} anchor="end" size={24} color={SECOND}>{d('0,1/1 = 10 %')}</F>
            <rect x={40} y={140} width={600} height={34} fill={STAGE_TINT} stroke={INK} strokeWidth={1.6} />
            <rect x={638} y={140} width={2} height={34} fill={SECOND} />
            <F x={340} y={166} anchor="middle" size={23}>1 m = 100 cm</F>
            <F x={680} y={214} anchor="end" size={24} color={SECOND}>{d('0,1/100 = 0,1 %')}</F>
            <Caption y={258}>{t(say('Errore erlatiboa = errorea : neurria', 'Error relativo = error ÷ medida', 'الخطأ النسبي = الخطأ ÷ القياس', 'Relative error = error ÷ measurement'))}</Caption>
        </Figure>
    )
}

/* ---------- The logarithmic scale ---------- */

export function LogScaleFigure({ language }: { language: UnitLanguage }) {
    const { t } = useText(language)
    const y = 130
    const at = (value: number) => 60 + 600 * Math.log10(value)
    return (
        <Figure height={250} label={t(say('Eskala logaritmikoa: log 2 eta log 3 luzerak batuta log 6 lortzen da', 'Escala logarítmica: las longitudes log 2 y log 3 sumadas dan log 6', 'سلّم لوغاريتمي: مجموع الطولين log 2 وlog 3 يعطي log 6', 'Logarithmic scale: the lengths log 2 and log 3 added give log 6'))}>
            <line x1={at(1)} x2={at(10)} y1={y} y2={y} stroke={INK} strokeWidth={2} />
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => <Tick key={value} x={at(value)} y={y} label={String(value)} color={value === 6 ? SECOND : INK} />)}
            <line x1={at(1)} x2={at(2)} y1={y - 34} y2={y - 34} stroke={STAGE} strokeWidth={6} />
            <line x1={at(2)} x2={at(6)} y1={y - 34} y2={y - 34} stroke={SECOND} strokeWidth={6} />
            <F x={(at(1) + at(2)) / 2} y={y - 48} anchor="middle" size={22} color={STAGE}>log 2</F>
            <F x={(at(2) + at(6)) / 2} y={y - 48} anchor="middle" size={22} color={SECOND}>log 3</F>
            <F x={360} y={208} anchor="middle" size={26}>log 2 + log 3 = log 6</F>
            <Caption y={238}>{t(say('Luzerak batzen dira; zenbakiak biderkatzen', 'Las longitudes se suman; los números se multiplican', 'الأطوال تُجمع والأعداد تُضرب', 'The lengths add; the numbers multiply'))}</Caption>
        </Figure>
    )
}

/* ---------- (a + b)² and Tartaglia ---------- */

export function BinomialFigure({ language }: { language: UnitLanguage }) {
    const { t } = useText(language)
    const [a, b] = [130, 70]
    const x = 50
    const y = 40
    const rows = [['1'], ['1', '1'], ['1', '2', '1'], ['1', '3', '3', '1'], ['1', '4', '6', '4', '1']]
    return (
        <Figure height={320} label={t(say('(a + b)² karratua: a², bi ab eta b²; Tartagliaren errenkadak koefizienteak dira', 'El cuadrado (a + b)²: a², dos ab y b²; las filas de Tartaglia son los coeficientes', 'المربع (a + b)²: ‏a² واثنان ab وb²، وصفوف تارتاليا هي المعاملات', 'The square (a + b)²: a², two ab and b²; the rows of Tartaglia are the coefficients'))}>
            <rect x={x} y={y} width={a} height={a} fill={STAGE_TINT} stroke={INK} strokeWidth={2} />
            <rect x={x + a} y={y} width={b} height={a} fill={MUSTARD_TINT} stroke={INK} strokeWidth={2} />
            <rect x={x} y={y + a} width={a} height={b} fill={MUSTARD_TINT} stroke={INK} strokeWidth={2} />
            <rect x={x + a} y={y + a} width={b} height={b} fill={GREEN_TINT} stroke={INK} strokeWidth={2} />
            <F x={x + a / 2} y={y + a / 2 + 9} anchor="middle" size={28}>a²</F>
            <F x={x + a + b / 2} y={y + a / 2 + 8} anchor="middle" size={24}>ab</F>
            <F x={x + a / 2} y={y + a + b / 2 + 8} anchor="middle" size={24}>ab</F>
            <F x={x + a + b / 2} y={y + a + b / 2 + 8} anchor="middle" size={24}>b²</F>
            <F x={x + (a + b) / 2} y={y + a + b + 36} anchor="middle" size={22} color={SECOND}>(a + b)² = a² + 2ab + b²</F>
            {rows.map((row, n) => (
                <g key={n}>
                    <F x={400} y={62 + n * 50} anchor="end" size={21} color={MUTED}>{`n = ${n}`}</F>
                    {row.map((value, k) => <F key={k} x={555 + (k - n / 2) * 52} y={62 + n * 50} anchor="middle" size={26} color={n === 2 ? SECOND : INK}>{value}</F>)}
                </g>
            ))}
            <Caption y={310}>{t(say('n errenkada: (a + b)ⁿ garapenaren koefizienteak', 'Fila n: los coeficientes de (a + b)ⁿ', 'الصف n يعطي معاملات النشر', 'Row n: the coefficients of (a + b)ⁿ'))}</Caption>
        </Figure>
    )
}

/* ---------- Hero ---------- */

export function BachRealsHeroArt() {
    return (
        <div className="fraction-v2-collage" aria-hidden="true">
            <svg viewBox="0 0 520 400" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                <g transform="translate(36 44) rotate(-4)">
                    <rect width={220} height={140} rx={16} fill={PAPER} stroke={INK} strokeWidth={2} />
                    <text x={110} y={64} textAnchor="middle" fontSize={32} fontWeight={700} fill={INK} fontFamily="Fraunces, serif" direction="ltr">√2 ∉ ℚ</text>
                    <text x={110} y={110} textAnchor="middle" fontSize={24} fontWeight={700} fill="#2f6fdb" fontFamily="Fraunces, serif" direction="ltr">ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ</text>
                </g>
                <g transform="translate(284 40) rotate(4)">
                    <rect width={200} height={116} rx={16} fill="#fbebc0" stroke={INK} strokeWidth={2} />
                    <text x={100} y={70} textAnchor="middle" fontSize={28} fontWeight={700} fill={INK} fontFamily="Fraunces, serif" direction="ltr">|x − 3| &lt; 2</text>
                </g>
                <g transform="translate(286 186) rotate(-3)">
                    <rect width={200} height={100} rx={16} fill="#e8e0f7" stroke={INK} strokeWidth={2} />
                    <text x={100} y={62} textAnchor="middle" fontSize={24} fontWeight={700} fill={INK} fontFamily="Fraunces, serif" direction="ltr">log 2 + log 3</text>
                </g>
                <g transform="translate(40 226)">
                    <rect width={230} height={132} rx={16} fill="#d6eddf" stroke={INK} strokeWidth={2} />
                    <text x={115} y={58} textAnchor="middle" fontSize={26} fontWeight={700} fill={INK} fontFamily="Fraunces, serif" direction="ltr">1  3  3  1</text>
                    <text x={115} y={102} textAnchor="middle" fontSize={22} fontWeight={700} fill="#c4432a" fontFamily="Fraunces, serif" direction="ltr">(a + b)³</text>
                </g>
            </svg>
        </div>
    )
}
