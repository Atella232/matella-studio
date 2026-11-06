import type { ReactNode } from 'react'
import { pickText, type LocalizedText, type UnitLanguage } from '../../features/unit-v2/types'
import { decimalSeparatorFor } from '../../utils/numberFormat'
import { Label } from '../dbh2-funtzioak-v2/plane'
import { Figure } from '../dbh2-zatikiak-prototype/figures'

/* ==========================================================================
   Estatistika unidimentsionala · Batxilergoa 1 · Zientziak — the new lesson
   figures: a population pyramid, the goals as a dot plot with the mean as
   the balance point, the table with two missing frequencies, the ages
   histogram with its class marks, the box with its fences, the three
   shapes of a distribution, the variance table, the band x̄ ± 3σ, two
   rulers measured in standard deviations and the data stretched and moved
   by F = 1,8C + 32. Each one draws the numbers of its lesson's «Let's
   solve». Formulas sit in their own <text> (left to right in every
   language); words go through <Label>.
   ========================================================================== */

const INK = 'var(--ink, #1d2733)'
const MUTED = 'var(--muted, #58616e)'
const STAGE = 'var(--stage, #2f6fdb)'
const STAGE_TINT = 'var(--stage-tint, #dde7f7)'
const SECOND = 'var(--second, #c4432a)'
const GREEN = 'var(--success, #267b53)'
const GREEN_TINT = '#d6eddf'
const CORAL_TINT = '#f6dcd3'
const PAPER = '#fffcf6'

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const useText = (language: UnitLanguage) => (text: LocalizedText) => pickText(language, text)
/** A number for the screen: 0,5 in Basque and Spanish, 0.5 in English and Arabic */
const num = (language: UnitLanguage, value: number) => String(Math.round(value * 1000) / 1000).replace('.', language === 'ar' ? '.' : decimalSeparatorFor(language))

function Caption({ y, children }: { y: number; children: ReactNode }) {
    return <Label x={360} y={y} textAnchor="middle" fontSize={19} fill={MUTED}>{children}</Label>
}

/** A formula written left to right whatever the language */
function F({ x, y, children, size = 20, color = INK, anchor = 'middle', weight = 700 }: { x: number; y: number; children: ReactNode; size?: number; color?: string; anchor?: 'start' | 'middle' | 'end'; weight?: number }) {
    return <text x={x} y={y} textAnchor={anchor} fontSize={size} fontWeight={weight} fill={color} direction="ltr">{children}</text>
}

/** A letter with its index below (and a power above), for the table headers */
function Sub({ parts }: { parts: Array<[string, string, string?]> }) {
    return (
        <>
            {parts.map(([letter, index, power], position) => (
                <tspan key={position}>
                    <tspan>{letter}</tspan>
                    <tspan fontSize="70%" dy={5}>{index}</tspan>
                    {power ? <tspan fontSize="70%" dy={-14}>{power}</tspan> : null}
                    <tspan dy={power ? 9 : -5}>{'​'}</tspan>
                </tspan>
            ))}
        </>
    )
}

function Axis({ y, from, to, ticks, x, size = 18 }: { y: number; from: number; to: number; ticks: Array<[number, string]>; x: (value: number) => number; size?: number }) {
    return (
        <g>
            <line x1={x(from)} x2={x(to)} y1={y} y2={y} stroke={INK} strokeWidth={2} />
            {ticks.map(([value, text]) => (
                <g key={value}>
                    <line x1={x(value)} x2={x(value)} y1={y - 6} y2={y + 6} stroke={INK} strokeWidth={1.6} />
                    <F x={x(value)} y={y + 26} size={size} weight={400}>{text}</F>
                </g>
            ))}
        </g>
    )
}

/* ---------- A population pyramid ---------- */

const PYRAMID = { groups: ['0–19', '20–39', '40–59', '60–79', '80+'], men: [11, 13, 14, 8, 3], women: [10, 13, 14, 10, 5] }

export function PyramidFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const unit = 13
    const rowY = (index: number) => 250 - index * 46
    return (
        <Figure height={320} label={t(say('Biztanleria-piramide bat: gizonak ezkerrean eta emakumeak eskuinean', 'Una pirámide de población: hombres a la izquierda y mujeres a la derecha', 'هرم سكاني: الرجال في اليسار والنساء في اليمين', 'A population pyramid: men on the left and women on the right'))}>
            <Label x={210} y={34} textAnchor="middle" fontSize={21} fontWeight={700} fill={STAGE}>{t(say('Gizonak', 'Hombres', 'الرجال', 'Men'))}</Label>
            <Label x={510} y={34} textAnchor="middle" fontSize={21} fontWeight={700} fill={SECOND}>{t(say('Emakumeak', 'Mujeres', 'النساء', 'Women'))}</Label>
            {PYRAMID.groups.map((group, index) => {
                const y = rowY(index)
                const men = PYRAMID.men[index] * unit
                const women = PYRAMID.women[index] * unit
                return (
                    <g key={group}>
                        <rect x={318 - men} y={y - 36} width={men} height={36} fill={STAGE_TINT} stroke={STAGE} strokeWidth={1.8} />
                        <rect x={402} y={y - 36} width={women} height={36} fill={CORAL_TINT} stroke={SECOND} strokeWidth={1.8} />
                        <F x={360} y={y - 11} size={17}>{group}</F>
                    </g>
                )
            })}
            <Caption y={300}>{t(say('Adinak behetik gora; zenbat eta barra luzeagoa, orduan eta pertsona gehiago', 'Edades de abajo arriba; cuanto más larga la barra, más personas', 'الأعمار من الأسفل إلى الأعلى؛ كلما طال العمود زاد عدد الأشخاص', 'Ages from the bottom up; the longer the bar, the more people'))}</Caption>
        </Figure>
    )
}

/* ---------- The goals as a dot plot: the mean is the balance point ---------- */

export function CentreDotsFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const counts = [4, 7, 5, 3, 1]
    const x = (value: number) => 120 + value * 120
    return (
        <Figure height={320} label={t(say('20 partidatako golak puntuz puntu: moda, mediana eta batez bestekoa', 'Los goles de 20 partidos punto a punto: moda, mediana y media', 'أهداف 20 مباراة نقطة نقطة: المنوال والوسيط والمتوسط', 'The goals of 20 matches dot by dot: mode, median and mean'))}>
            {counts.map((count, value) => Array.from({ length: count }, (_, level) => (
                <circle key={`${value}-${level}`} cx={x(value)} cy={196 - level * 24} r={10} fill={value === 1 ? CORAL_TINT : STAGE_TINT} stroke={value === 1 ? SECOND : STAGE} strokeWidth={1.8} />
            )))}
            <F x={x(1)} y={30} size={19} color={SECOND}>Mo = Me = 1</F>
            <Axis y={220} from={-0.6} to={4.6} x={x} ticks={[0, 1, 2, 3, 4].map((value) => [value, String(value)])} />
            <polygon points={`${x(1.5)},${224} ${x(1.5) - 14},${250} ${x(1.5) + 14},${250}`} fill={GREEN} />
            <F x={x(1.5)} y={276} size={19} color={GREEN}>x̄ = {num(language, 1.5)}</F>
            <Caption y={308}>{t(say('Batez bestekoan orekatzen dira datuak, balantza batean bezala', 'En la media se equilibran los datos, como en una balanza', 'عند المتوسط تتوازن البيانات كما في الميزان', 'The data balance at the mean, as on a pair of scales'))}</Caption>
        </Figure>
    )
}

/* ---------- Two missing frequencies, two equations ---------- */

export function MissingDatumFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const cells = ['3', 'x', 'y', '4']
    const column = (index: number) => 110 + index * 66
    return (
        <Figure height={300} label={t(say('Bi maiztasun falta dira: bi ekuazio, datu kopurutik eta batez bestekotik', 'Faltan dos frecuencias: dos ecuaciones, del número de datos y de la media', 'ينقص تكراران: معادلتان من عدد البيانات ومن المتوسط', 'Two frequencies are missing: two equations, from the number of data and from the mean'))}>
            <rect x={30} y={30} width={344} height={92} rx={12} fill={PAPER} stroke={INK} strokeWidth={1.8} />
            <line x1={30} x2={374} y1={76} y2={76} stroke={INK} strokeWidth={1.4} />
            <line x1={77} x2={77} y1={30} y2={122} stroke={INK} strokeWidth={1.4} />
            <F x={54} y={62} size={20}><Sub parts={[['x', 'i']]} /></F>
            <F x={54} y={108} size={20}><Sub parts={[['f', 'i']]} /></F>
            {cells.map((cell, index) => {
                const missing = cell === 'x' || cell === 'y'
                return (
                    <g key={index}>
                        <F x={column(index)} y={62} size={20}>{index + 1}</F>
                        {missing && <rect x={column(index) - 22} y={84} width={44} height={32} rx={8} fill={CORAL_TINT} stroke={SECOND} strokeWidth={1.6} />}
                        <F x={column(index)} y={108} size={21} color={missing ? SECOND : INK}>{cell}</F>
                    </g>
                )
            })}
            <F x={202} y={166} size={18} color={MUTED} weight={400}>Σ f = N</F>
            <F x={202} y={196} size={18} color={MUTED} weight={400}>Σ f · x = N · x̄</F>
            <rect x={404} y={26} width={296} height={82} rx={14} fill={STAGE_TINT} stroke={INK} strokeWidth={1.8} />
            <F x={552} y={58} size={18} color={MUTED}>3 + x + y + 4 = 20</F>
            <F x={552} y={92} size={23}>x + y = 13</F>
            <rect x={404} y={122} width={296} height={82} rx={14} fill={STAGE_TINT} stroke={INK} strokeWidth={1.8} />
            <F x={552} y={154} size={18} color={MUTED}>3 + 2x + 3y + 16 = 20 · {num(language, 2.6)}</F>
            <F x={552} y={188} size={23}>2x + 3y = 33</F>
            <rect x={240} y={222} width={240} height={46} rx={14} fill={GREEN_TINT} stroke={GREEN} strokeWidth={2} />
            <F x={360} y={254} size={23} color={GREEN}>x = 6    y = 7</F>
            <Caption y={292}>{t(say('Bi ekuazio, bi ezezagun: sistema bat', 'Dos ecuaciones, dos incógnitas: un sistema', 'معادلتان ومجهولان: نظام', 'Two equations, two unknowns: a system'))}</Caption>
        </Figure>
    )
}

/* ---------- The ages in intervals ---------- */

export function GroupedAgesFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const counts = [8, 14, 12, 6]
    const x = (value: number) => 120 + (value - 20) * 12
    const base = 220
    return (
        <Figure height={300} label={t(say('Adinen histograma, klase-markekin eta tarte mediana gorriz', 'El histograma de las edades, con las marcas de clase y el intervalo mediano en rojo', 'مدرّج الأعمار مع مراكز الفئات والفئة الوسيطية بالأحمر', 'The histogram of the ages, with the class marks and the median interval in red'))}>
            {counts.map((count, index) => {
                const left = x(20 + index * 10)
                const height = count * 12
                const median = index === 1
                return (
                    <g key={index}>
                        <rect x={left} y={base - height} width={120} height={height} fill={median ? CORAL_TINT : STAGE_TINT} stroke={median ? SECOND : STAGE} strokeWidth={1.8} />
                        <F x={left + 60} y={base - height - 8} size={18} color={median ? SECOND : INK}>{count}</F>
                        <circle cx={left + 60} cy={base - 18} r={4} fill={MUTED} />
                        <F x={left + 60} y={base - 28} size={16} color={MUTED} weight={400}>{25 + index * 10}</F>
                    </g>
                )
            })}
            <line x1={x(39)} x2={x(39)} y1={38} y2={base} stroke={GREEN} strokeWidth={2.4} strokeDasharray="6 4" />
            <F x={x(39) + 8} y={30} size={19} color={GREEN} anchor="start">x̄ = 39</F>
            <Axis y={base} from={20} to={60} x={x} ticks={[20, 30, 40, 50, 60].map((value) => [value, String(value)])} />
            <Caption y={286}>{t(say('Gorriz, tarte modala eta mediana; bertan dago 20. datua', 'En rojo, el intervalo modal y mediano, donde cae el dato 20.º', 'بالأحمر الفئة المنوالية والوسيطية، وفيها البيان العشرون', 'In red, the modal and median interval, where the 20th datum falls'))}</Caption>
        </Figure>
    )
}

/* ---------- The box, its fences and the outlier ---------- */

export function WhiskerFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const x = (value: number) => 60 + value * 38
    const mid = 112
    return (
        <Figure height={300} label={t(say('Kutxa-diagrama: mugak 0,5 eta 12,5 dira, eta 15 atipikoa da', 'Diagrama de caja: los límites son 0,5 y 12,5, y el 15 es atípico', 'مخطط الصندوق: الحدان 0.5 و12.5، والعدد 15 شاذ', 'Box plot: the limits are 0.5 and 12.5, and 15 is an outlier'))}>
            {[0.5, 12.5].map((value) => (
                <g key={value}>
                    <line x1={x(value)} x2={x(value)} y1={46} y2={176} stroke={MUTED} strokeWidth={1.6} strokeDasharray="5 4" />
                    <F x={x(value)} y={36} size={17} color={MUTED}>{num(language, value)}</F>
                </g>
            ))}
            <line x1={x(2)} x2={x(5)} y1={mid} y2={mid} stroke={INK} strokeWidth={2.4} />
            <line x1={x(8)} x2={x(11)} y1={mid} y2={mid} stroke={INK} strokeWidth={2.4} />
            {[2, 11].map((value) => <line key={value} x1={x(value)} x2={x(value)} y1={mid - 14} y2={mid + 14} stroke={INK} strokeWidth={2.4} />)}
            <rect x={x(5)} y={mid - 28} width={x(8) - x(5)} height={56} fill={STAGE} fillOpacity={0.24} stroke={INK} strokeWidth={2.4} />
            <line x1={x(7)} x2={x(7)} y1={mid - 28} y2={mid + 28} stroke={SECOND} strokeWidth={3.4} />
            <F x={x(15)} y={mid + 10} size={30} color={SECOND}>*</F>
            {([[5, 'Q₁'], [7, 'Me'], [8, 'Q₃']] as const).map(([value, name]) => (
                <F key={name} x={x(value) + (name === 'Q₁' ? -8 : name === 'Q₃' ? 10 : 0)} y={mid - 38} size={17} color={name === 'Me' ? SECOND : INK}>{name}</F>
            ))}
            <Axis y={196} from={0} to={16} x={x} ticks={[0, 5, 10, 15].map((value) => [value, String(value)])} />
            <F x={360} y={252} size={19} color={STAGE}>8 − 5 = 3 → {num(language, 1.5)} · 3 = {num(language, 4.5)}</F>
            <Caption y={286}>{t(say('Bibotea 11 daturaino; 15 datuak 12,5 gainditzen du: atipikoa (*)', 'Bigote hasta el 11; el 15 pasa de 12,5: atípico (*)', 'الشارب حتى 11؛ والعدد 15 يتجاوز 12.5: شاذ (*)', 'Whisker up to 11; 15 is above 12.5: outlier (*)'))}</Caption>
        </Figure>
    )
}

/* ---------- Three shapes: tail on the left, symmetric, tail on the right ---------- */

const SHAPES = [
    { heights: [1, 2, 3, 5, 8, 6], tail: [0, 1], order: 'x̄ < Me < Mo', name: say('Isatsa ezkerrean', 'Cola a la izquierda', 'الذيل في اليسار', 'Tail on the left') },
    { heights: [1, 3, 6, 6, 3, 1], tail: [], order: 'x̄ = Me = Mo', name: say('Simetrikoa', 'Simétrica', 'متماثل', 'Symmetric') },
    { heights: [6, 8, 5, 3, 2, 1], tail: [4, 5], order: 'Mo < Me < x̄', name: say('Isatsa eskuinean', 'Cola a la derecha', 'الذيل في اليمين', 'Tail on the right') }
]

export function SkewnessFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const base = 196
    return (
        <Figure height={290} label={t(say('Banaketa baten hiru itxura: ezkerretik asimetrikoa, simetrikoa eta eskuinetik asimetrikoa', 'Tres formas de una distribución: asimétrica por la izquierda, simétrica y asimétrica por la derecha', 'ثلاثة أشكال للتوزيع: ملتوٍ إلى اليسار، ومتماثل، وملتوٍ إلى اليمين', 'Three shapes of a distribution: skewed to the left, symmetric and skewed to the right'))}>
            {SHAPES.map((shape, panel) => {
                const left = 30 + panel * 230
                return (
                    <g key={panel}>
                        {shape.heights.map((height, index) => {
                            const tail = (shape.tail as number[]).includes(index)
                            return <rect key={index} x={left + index * 32} y={base - height * 18} width={32} height={height * 18} fill={tail ? CORAL_TINT : STAGE_TINT} stroke={tail ? SECOND : STAGE} strokeWidth={1.6} />
                        })}
                        <line x1={left - 6} x2={left + 198} y1={base} y2={base} stroke={INK} strokeWidth={2} />
                        <F x={left + 96} y={base + 34} size={18}>{shape.order}</F>
                        <Label x={left + 96} y={base + 66} textAnchor="middle" fontSize={18} fill={shape.tail.length ? SECOND : MUTED}>{t(shape.name)}</Label>
                    </g>
                )
            })}
        </Figure>
    )
}

/* ---------- The variance from a table ---------- */

export function VarianceTableFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const rows = [[1, 3], [2, 4], [3, 2], [4, 1]].map(([value, count]) => [value, count, value * count, count * value * value])
    const columns = [70, 150, 240, 340]
    return (
        <Figure height={300} label={t(say('Bariantza taula batetik: fx eta fx² zutabeak', 'La varianza desde una tabla: las columnas fx y fx²', 'التباين من جدول: العمودان fx وfx²', 'The variance from a table: the fx and fx² columns'))}>
            <rect x={30} y={22} width={366} height={214} rx={12} fill={PAPER} stroke={INK} strokeWidth={1.8} />
            <line x1={30} x2={396} y1={60} y2={60} stroke={INK} strokeWidth={1.4} />
            <line x1={30} x2={396} y1={200} y2={200} stroke={INK} strokeWidth={1.4} />
            <F x={columns[0]} y={48} size={19}><Sub parts={[['x', 'i']]} /></F>
            <F x={columns[1]} y={48} size={19}><Sub parts={[['f', 'i']]} /></F>
            <F x={columns[2]} y={48} size={19}><Sub parts={[['f', 'i'], ['x', 'i']]} /></F>
            <F x={columns[3]} y={48} size={19} color={STAGE}><Sub parts={[['f', 'i'], ['x', 'i', '2']]} /></F>
            {rows.map((row, index) => row.map((cell, column) => (
                <F key={`${index}-${column}`} x={columns[column]} y={88 + index * 32} size={19} weight={column === 3 ? 700 : 400} color={column === 3 ? STAGE : INK}>{cell}</F>
            )))}
            <F x={columns[1]} y={226} size={19}>10</F>
            <F x={columns[2]} y={226} size={19}>21</F>
            <F x={columns[3]} y={226} size={19} color={STAGE}>53</F>
            <rect x={420} y={30} width={280} height={200} rx={16} fill={PAPER} stroke={INK} strokeWidth={2} />
            <F x={560} y={72} size={19}>x̄ = 21 : 10 = {num(language, 2.1)}</F>
            <F x={560} y={114} size={18}>σ² = 53 : 10 − {num(language, 2.1)}²</F>
            <F x={560} y={154} size={19} color={STAGE}>σ² = {num(language, 5.3)} − {num(language, 4.41)} = {num(language, 0.89)}</F>
            <F x={560} y={200} size={21} color={SECOND}>σ ≈ {num(language, 0.94)}</F>
            <Caption y={278}>{t(say('Karratuen batez bestekoa ken batez bestekoaren karratua, eta gero erroa', 'Media de los cuadrados menos el cuadrado de la media, y después la raíz', 'متوسط المربعات ناقص مربع المتوسط، ثم الجذر', 'Mean of the squares minus the square of the mean, and then the root'))}</Caption>
        </Figure>
    )
}

/* ---------- The band of three standard deviations ---------- */

const TIMES = [14, 17, 18, 19, 20, 20, 21, 22, 23, 26]

export function OutlierBandFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const x = (value: number) => 40 + value * 16
    const seen = new Map<number, number>()
    return (
        <Figure height={290} label={t(say('Batez bestekotik hiru desbideratzeko banda, 8 eta 32 artean; 33 kanpoan dago', 'La banda de tres desviaciones alrededor de la media: de 8 a 32; el 33 queda fuera', 'نطاق الانحرافات الثلاثة حول المتوسط: من 8 إلى 32؛ والعدد 33 خارجه', 'The band of three deviations around the mean: from 8 to 32; 33 lies outside'))}>
            <rect x={x(8)} y={56} width={x(32) - x(8)} height={120} fill={GREEN_TINT} stroke={GREEN} strokeWidth={1.8} />
            <line x1={x(20)} x2={x(20)} y1={56} y2={176} stroke={GREEN} strokeWidth={2} strokeDasharray="6 4" />
            <F x={x(8)} y={44} size={18} color={GREEN}>x̄ − 3σ</F>
            <F x={x(20)} y={44} size={18} color={GREEN}>x̄</F>
            <F x={x(32)} y={44} size={18} color={GREEN}>x̄ + 3σ</F>
            {TIMES.map((value, index) => {
                const level = seen.get(value) ?? 0
                seen.set(value, level + 1)
                return <circle key={index} cx={x(value)} cy={150 - level * 20} r={8} fill={STAGE_TINT} stroke={STAGE} strokeWidth={1.8} />
            })}
            <circle cx={x(33)} cy={150} r={9} fill={CORAL_TINT} stroke={SECOND} strokeWidth={2.4} />
            <F x={x(33) + 14} y={120} size={18} color={SECOND} anchor="start">33</F>
            <Axis y={188} from={0} to={40} x={x} ticks={[0, 8, 20, 32, 40].map((value) => [value, String(value)])} />
            <F x={360} y={244} size={20} color={SECOND}>20 + 3 · 4 = 32 &lt; 33</F>
            <Caption y={278}>{t(say('Ia datu guztiak bandaren barruan daude; 33 kanpoan geratzen da', 'Casi todos los datos caen dentro de la banda; el 33 queda fuera', 'تقع كل البيانات تقريبًا داخل النطاق؛ والعدد 33 خارجه', 'Almost all the data fall inside the band; 33 lies outside'))}</Caption>
        </Figure>
    )
}

/* ---------- Two rulers measured in standard deviations ---------- */

export function StandardScoreFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const X = (z: number) => 360 + z * 92
    const zs = [-3, -2, -1, 0, 1, 2, 3]
    const rows = [
        { y: 84, name: say('Matematika', 'Matemáticas', 'الرياضيات', 'Maths'), mean: 7, sd: 2, datum: 8 },
        { y: 184, name: say('Hizkuntza', 'Lengua', 'اللغة', 'Language'), mean: 6, sd: 0.5, datum: 7 }
    ]
    return (
        <Figure height={330} label={t(say('Bi erregela, desbideratze tipikotan: 8 batek 0,5 balio du Matematikan, eta 7 batek 2 Hizkuntzan', 'Dos reglas medidas en desviaciones típicas: el 8 vale 0,5 en Matemáticas y el 7 vale 2 en Lengua', 'مسطرتان بالانحرافات المعيارية: العلامة 8 تساوي 0.5 في الرياضيات، والعلامة 7 تساوي 2 في اللغة', 'Two rulers measured in standard deviations: the 8 is worth 0.5 in Maths and the 7 is worth 2 in Language'))}>
            {rows.map((row) => {
                const z = (row.datum - row.mean) / row.sd
                return (
                    <g key={row.y}>
                        <Label x={360} y={row.y - 36} textAnchor="middle" fontSize={19} fontWeight={700} fill={INK}>{t(row.name)}</Label>
                        <line x1={X(-3)} x2={X(3)} y1={row.y} y2={row.y} stroke={INK} strokeWidth={2} />
                        {zs.map((step) => (
                            <g key={step}>
                                <line x1={X(step)} x2={X(step)} y1={row.y - 6} y2={row.y + 6} stroke={INK} strokeWidth={1.6} />
                                <F x={X(step)} y={row.y + 26} size={16} weight={400} color={step === 0 ? GREEN : INK}>{num(language, row.mean + step * row.sd)}</F>
                            </g>
                        ))}
                        <line x1={X(z)} x2={X(z)} y1={row.y} y2={266} stroke={SECOND} strokeWidth={1.6} strokeDasharray="5 4" />
                        <circle cx={X(z)} cy={row.y} r={10} fill={CORAL_TINT} stroke={SECOND} strokeWidth={2.4} />
                    </g>
                )
            })}
            <line x1={X(-3)} x2={X(3)} y1={266} y2={266} stroke={GREEN} strokeWidth={2.4} />
            {zs.map((step) => (
                <g key={step}>
                    <line x1={X(step)} x2={X(step)} y1={260} y2={272} stroke={GREEN} strokeWidth={1.8} />
                    <F x={X(step)} y={294} size={17} color={GREEN}>{String(step).replace('-', '−')}</F>
                </g>
            ))}
            <F x={X(-3) - 26} y={272} size={20} color={GREEN} anchor="end">z</F>
            <Caption y={322}>{t(say('Bi notak eskala berean: zenbat desbideratze dauden batez bestekotik', 'Las dos notas en la misma escala: cuántas desviaciones hay hasta la media', 'العلامتان على المقياس نفسه: كم انحرافًا تبعدان عن المتوسط', 'Both marks on the same scale: how many deviations from the mean'))}</Caption>
        </Figure>
    )
}

/* ---------- Multiply stretches, add moves ---------- */

export function TransformFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const x = (value: number) => 50 + value * 6.8
    const rows = [
        { y: 66, data: [15, 25], mean: 20, sd: 5, step: '°C' },
        { y: 158, data: [27, 45], mean: 36, sd: 9, step: `× ${num(language, 1.8)}` },
        { y: 250, data: [59, 77], mean: 68, sd: 9, step: '+ 32' }
    ]
    return (
        <Figure height={370} label={t(say('Datuak 1,8 bider egin eta 32 batu: biderkatzeak luzatzen ditu, batzeak lekuz aldatzen ditu', 'Los datos por 1,8 y más 32: multiplicar los estira, sumar los desplaza', 'البيانات مضروبة في 1.8 مضافًا إليها 32: الضرب يمدّها والجمع ينقلها', 'The data times 1.8 plus 32: multiplying stretches them, adding moves them'))}>
            {rows.map((row) => (
                <g key={row.y}>
                    <F x={50} y={row.y - 26} size={19} color={SECOND} anchor="start">{row.step}</F>
                    <line x1={x(0)} x2={x(90)} y1={row.y} y2={row.y} stroke={MUTED} strokeWidth={1.4} />
                    {row.data.map((value) => [-1, 1].map((side) => (
                        <circle key={`${value}${side}`} cx={x(value)} cy={row.y + side * 9} r={8} fill={STAGE_TINT} stroke={STAGE} strokeWidth={1.8} />
                    )))}
                    <line x1={x(row.mean)} x2={x(row.mean)} y1={row.y - 20} y2={row.y + 20} stroke={GREEN} strokeWidth={2.6} />
                    <F x={x(row.mean)} y={row.y + 44} size={18} weight={400}>x̄ = {row.mean} · σ = {row.sd}</F>
                </g>
            ))}
            <Axis y={316} from={0} to={90} x={x} ticks={[0, 30, 60, 90].map((value) => [value, String(value)])} size={16} />
            <Caption y={364}>{t(say('Biderkatzeak datuak luzatzen ditu; batzeak lekuz aldatu bakarrik', 'Multiplicar estira los datos; sumar solo los desplaza', 'الضرب يمدّ البيانات، والجمع ينقلها فقط', 'Multiplying stretches the data; adding only moves them'))}</Caption>
        </Figure>
    )
}

/* ---------- Hero art ---------- */

export function BachStatsHeroArt() {
    return (
        <div className="fraction-v2-collage" aria-hidden="true">
            <svg viewBox="0 0 520 400" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                <g transform="translate(34 40) rotate(-4)">
                    <rect width={230} height={150} rx={16} fill={PAPER} stroke={INK} strokeWidth={2} />
                    {[2, 4, 7, 5, 3, 1].map((height, index) => (
                        <rect key={index} x={28 + index * 30} y={126 - height * 14} width={30} height={height * 14} fill="#dde7f7" stroke="#2f6fdb" strokeWidth={1.6} />
                    ))}
                    <line x1={20} x2={212} y1={126} y2={126} stroke={INK} strokeWidth={2} />
                </g>
                <g transform="translate(290 36) rotate(4)">
                    <rect width={196} height={124} rx={16} fill="#fbebc0" stroke={INK} strokeWidth={2} />
                    <line x1={24} x2={60} y1={62} y2={62} stroke={INK} strokeWidth={2.4} />
                    <rect x={60} y={40} width={70} height={44} fill="rgba(47, 111, 219, 0.24)" stroke={INK} strokeWidth={2.4} />
                    <line x1={96} x2={96} y1={40} y2={84} stroke="#c4432a" strokeWidth={3} />
                    <line x1={130} x2={156} y1={62} y2={62} stroke={INK} strokeWidth={2.4} />
                    <text x={176} y={72} textAnchor="middle" fontSize={26} fontWeight={700} fill="#c4432a">*</text>
                </g>
                <g transform="translate(290 196) rotate(-3)">
                    <rect width={196} height={110} rx={16} fill="#e8e0f7" stroke={INK} strokeWidth={2} />
                    <text x={98} y={66} textAnchor="middle" fontSize={24} fontWeight={700} fill="#c4432a" fontFamily="Fraunces, serif" direction="ltr">z = (x − x̄) / σ</text>
                </g>
                <g transform="translate(40 230)">
                    <rect width={226} height={130} rx={16} fill="#d6eddf" stroke={INK} strokeWidth={2} />
                    <text x={113} y={58} textAnchor="middle" fontSize={24} fontWeight={700} fill={INK} fontFamily="Fraunces, serif" direction="ltr">x̄ ± 3σ</text>
                    <text x={113} y={98} textAnchor="middle" fontSize={22} fontWeight={700} fill="#267b53" fontFamily="Fraunces, serif" direction="ltr">σ² = Σfx²/N − x̄²</text>
                </g>
            </svg>
        </div>
    )
}
