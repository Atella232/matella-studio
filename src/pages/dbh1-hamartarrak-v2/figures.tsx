import type { ReactNode } from 'react'
import { pickText, type LocalizedText, type UnitLanguage } from '../../features/unit-v2/types'
import { Figure, Frac } from '../dbh2-zatikiak-prototype/figures'
import { Label } from '../dbh2-funtzioak-v2/plane'

/* ==========================================================================
   Zenbaki hamartarrak · 1. DBH — lesson figures in the notebook style.
   Numbers keep the decimal comma in Basque and Spanish and the point in
   Arabic. Arabic captions carry words only: formulas go in their own
   <text>, because Chrome ignores direction isolates inside SVG text.
   ========================================================================== */

const INK = 'var(--ink, #1d2733)'
const MUTED = 'var(--muted, #58616e)'
const STAGE = 'var(--stage, #2f6fdb)'
const STAGE_TINT = 'var(--stage-tint, #dde7f7)'
const SECOND = 'var(--second, #c4432a)'
const PAPER = '#fffcf6'

const say = (eu: string, es: string, ar: string): LocalizedText => ({ eu, es, ar })
const pick = (language: UnitLanguage, text: LocalizedText) => pickText(language, text)
/** A number written with the comma, shown with the point in Arabic */
const num = (language: UnitLanguage, text: string) => (language === 'ar' ? text.replace(/,/g, '.') : text)

function Caption({ y, language, text }: { y: number; language: UnitLanguage; text: LocalizedText }) {
    return <Label x={360} y={y} textAnchor="middle" fontSize={15} fill={MUTED}>{pick(language, text)}</Label>
}

/* ---------- Digits in columns: the comma takes half a column ---------- */

const COLUMN = 22

/** Width of a written number, with the comma at half a column */
const widthOf = (text: string) => [...text].reduce((total, char) => total + (char === ',' ? COLUMN / 2 : COLUMN), 0)

/** A number right-aligned at `right`, one digit per column; `colors` paints single characters */
function Digits({ right, y, text, language, size = 22, color = INK, colors = {} }: { right: number; y: number; text: string; language: UnitLanguage; size?: number; color?: string; colors?: Record<number, string> }) {
    const chars = [...text]
    let x = right - widthOf(text)
    return (
        <g>
            {chars.map((char, index) => {
                const width = char === ',' ? COLUMN / 2 : COLUMN
                const cx = x + width / 2
                x += width
                return <text key={index} x={cx} y={y} textAnchor="middle" fontSize={size} fontWeight={700} fill={colors[index] ?? color}>{char === ',' ? num(language, ',') : char}</text>
            })}
        </g>
    )
}

/** A long division laid out as in class: dividend | divisor, quotient under the divisor, remainders under the dividend */
function LongDivision({ x, y, dividend, divisor, quotient, rows, language, highlight = [] }: {
    x: number
    y: number
    dividend: string
    divisor: string
    quotient: string
    /** Each remainder with how many columns it ends to the right of the dividend */
    rows: Array<{ text: string; shift: number }>
    language: UnitLanguage
    /** Rows drawn in the second colour */
    highlight?: number[]
}) {
    const right = x + widthOf(dividend)
    // The brought-down zeros go right of the dividend: the divisor's box starts after the last one
    const bar = right + 14 + Math.max(0, ...rows.map((row) => row.shift)) * COLUMN
    return (
        <g>
            <Digits right={right} y={y} text={dividend} language={language} />
            <line x1={bar} x2={bar} y1={y - 24} y2={y + 8} stroke={INK} strokeWidth={2} />
            <line x1={bar} x2={bar + Math.max(widthOf(divisor), widthOf(quotient)) + 24} y1={y + 8} y2={y + 8} stroke={INK} strokeWidth={2} />
            <Digits right={bar + 12 + widthOf(divisor)} y={y} text={divisor} language={language} />
            <Digits right={bar + 12 + widthOf(quotient)} y={y + 34} text={quotient} language={language} color={STAGE} />
            {rows.map((row, index) => (
                <Digits key={index} right={right + row.shift * COLUMN} y={y + 34 * (index + 1)} text={row.text} language={language} color={highlight.includes(index) ? SECOND : MUTED} />
            ))}
        </g>
    )
}

/** A number line with ticks every `step`, labels on the multiples of `labelEvery` steps */
function TickLine({ left, width, y, from, to, step, labelEvery, language, decimals, size = 15 }: {
    left: number
    width: number
    y: number
    from: number
    to: number
    step: number
    labelEvery: number
    language: UnitLanguage
    decimals: number
    size?: number
}) {
    const count = Math.round((to - from) / step)
    const x = (value: number) => left + ((value - from) / (to - from)) * width
    return (
        <g>
            <line x1={left - 12} x2={left + width + 12} y1={y} y2={y} stroke={INK} strokeWidth={2.4} />
            {Array.from({ length: count + 1 }, (_, index) => {
                const value = from + index * step
                const major = index % labelEvery === 0
                return (
                    <g key={index}>
                        <line x1={x(value)} x2={x(value)} y1={y - (major ? 11 : 6)} y2={y + (major ? 11 : 6)} stroke={INK} strokeWidth={major ? 2.2 : 1.3} />
                        {major && <text x={x(value)} y={y + 30} textAnchor="middle" fontSize={size} fontWeight={700} fill={INK}>{num(language, value.toFixed(decimals).replace('.', ','))}</text>}
                    </g>
                )
            })}
        </g>
    )
}

/* ---------- 1. The unit, a tenth and a hundredth ---------- */

export function DecimalUnitsFigure({ language }: { language: UnitLanguage }) {
    const size = 150
    const squares = [
        { x: 40, cells: 1, label: '1', name: say('unitatea', 'unidad', 'وحدة') },
        { x: 285, cells: 10, label: '0,1', name: say('hamarrena', 'décima', 'عُشر') },
        { x: 530, cells: 100, label: '0,01', name: say('ehunena', 'centésima', 'جزء من مئة') }
    ]
    return (
        <Figure height={270} label={pick(language, say('Unitatea, hamarren bat eta ehunen bat', 'La unidad, una décima y una centésima', 'الوحدة والعُشر والجزء من مئة'))}>
            {squares.map((square) => {
                const side = square.cells === 100 ? 10 : 1
                const strips = square.cells === 10 ? 10 : side
                return (
                    <g key={square.x}>
                        <rect x={square.x} y={20} width={size} height={size} fill={square.cells === 1 ? STAGE_TINT : PAPER} stroke={INK} strokeWidth={2.4} />
                        {square.cells === 10 && Array.from({ length: strips }, (_, index) => (
                            <rect key={index} x={square.x + index * (size / 10)} y={20} width={size / 10} height={size} fill={index === 0 ? STAGE : PAPER} fillOpacity={index === 0 ? 0.45 : 1} stroke={INK} strokeWidth={1.2} />
                        ))}
                        {square.cells === 100 && Array.from({ length: 100 }, (_, index) => (
                            <rect key={index} x={square.x + (index % 10) * (size / 10)} y={20 + Math.floor(index / 10) * (size / 10)} width={size / 10} height={size / 10} fill={index === 0 ? STAGE : PAPER} fillOpacity={index === 0 ? 0.45 : 1} stroke={INK} strokeWidth={0.8} />
                        ))}
                        <rect x={square.x} y={20} width={size} height={size} fill="none" stroke={INK} strokeWidth={2.4} />
                        <text x={square.x + size / 2} y={200} textAnchor="middle" fontSize={24} fontWeight={700} fill={STAGE}>{num(language, square.label)}</text>
                        <Label x={square.x + size / 2} y={224} textAnchor="middle" fontSize={15} fontWeight={700} fill={INK}>{pick(language, square.name)}</Label>
                    </g>
                )
            })}
            <text x={235} y={100} textAnchor="middle" fontSize={22} fontWeight={700} fill={MUTED}>: 10</text>
            <text x={480} y={100} textAnchor="middle" fontSize={22} fontWeight={700} fill={MUTED}>: 10</text>
            <Caption y={258} language={language} text={say('Unitatea 10 zatitan: hamarrenak; hamarren bat 10 zatitan: ehunenak', 'La unidad en 10 partes: décimas; una décima en 10 partes: centésimas', 'الوحدة في عشرة أجزاء: أعشار؛ والعُشر في عشرة أجزاء: أجزاء من مئة')} />
        </Figure>
    )
}

/* ---------- 2. The place-value table: 430,581 ---------- */

export function PlaceTableFigure({ language }: { language: UnitLanguage }) {
    const heads = {
        eu: ['E', 'H', 'U', 'h', 'e', 'm'],
        es: ['C', 'D', 'U', 'd', 'c', 'm'],
        ar: ['مئات', 'عشرات', 'آحاد', 'أعشار', 'ج. من مئة', 'ج. من ألف']
    }[language]
    const digits = ['4', '3', '0', '5', '8', '1']
    const values = ['400', '30', '0', '0,5', '0,08', '0,001']
    const cell = 76
    const left = 132
    const x = (index: number) => left + index * cell + (index >= 3 ? 24 : 0)
    return (
        <Figure height={260} label={pick(language, say('430,581 posizio-taulan', '430,581 en la tabla de posiciones', '430.581 في جدول المنازل'))}>
            <Label x={left + cell * 1.5} y={22} textAnchor="middle" fontSize={15} fontWeight={700} fill={INK}>{pick(language, say('zati osoa', 'parte entera', 'الجزء الصحيح'))}</Label>
            <Label x={x(3) + cell * 1.5} y={22} textAnchor="middle" fontSize={15} fontWeight={700} fill={STAGE}>{pick(language, say('zati hamartarra', 'parte decimal', 'الجزء العشري'))}</Label>
            {digits.map((digit, index) => (
                <g key={index}>
                    <rect x={x(index)} y={34} width={cell} height={40} fill={index >= 3 ? STAGE_TINT : PAPER} stroke={INK} strokeWidth={1.8} />
                    <Label x={x(index) + cell / 2} y={60} textAnchor="middle" fontSize={language === 'ar' ? 13 : 17} fontWeight={700} fill={index >= 3 ? STAGE : INK}>{heads[index]}</Label>
                    <rect x={x(index)} y={74} width={cell} height={56} fill={PAPER} stroke={INK} strokeWidth={1.8} />
                    <text x={x(index) + cell / 2} y={112} textAnchor="middle" fontSize={30} fontWeight={700} fill={INK}>{digit}</text>
                    <text x={x(index) + cell / 2} y={166} textAnchor="middle" fontSize={17} fontWeight={700} fill={index >= 3 ? STAGE : INK}>{num(language, values[index])}</text>
                    {index < 5 && <text x={x(index) + cell + (index === 2 ? 12 : 0)} y={166} textAnchor="middle" fontSize={17} fill={MUTED}>+</text>}
                </g>
            ))}
            <text x={x(3) - 12} y={116} textAnchor="middle" fontSize={34} fontWeight={700} fill={SECOND}>{num(language, ',')}</text>
            <text x={360} y={206} textAnchor="middle" fontSize={20} fontWeight={700} fill={INK}>{num(language, '430,581 = 400 + 30 + 0,5 + 0,08 + 0,001')}</text>
            <Caption y={244} language={language} text={say('Zifra bakoitzak bere tokiaren arabera balio du', 'Cada cifra vale según el lugar que ocupa', 'كل رقم يساوي بحسب منزلته')} />
        </Figure>
    )
}

/* ---------- 3. 0,3 = 0,30: three strips are thirty squares ---------- */

export function SameValueFigure({ language }: { language: UnitLanguage }) {
    const size = 150
    return (
        <Figure height={240} label={pick(language, say('0,3 = 0,30', '0,3 = 0,30', '0.3 = 0.30'))}>
            {Array.from({ length: 10 }, (_, index) => (
                <rect key={index} x={130 + index * (size / 10)} y={20} width={size / 10} height={size} fill={index < 3 ? STAGE : PAPER} fillOpacity={index < 3 ? 0.4 : 1} stroke={INK} strokeWidth={1.2} />
            ))}
            <rect x={130} y={20} width={size} height={size} fill="none" stroke={INK} strokeWidth={2.4} />
            {Array.from({ length: 100 }, (_, index) => (
                <rect key={index} x={440 + Math.floor(index / 10) * (size / 10)} y={20 + (index % 10) * (size / 10)} width={size / 10} height={size / 10} fill={index < 30 ? STAGE : PAPER} fillOpacity={index < 30 ? 0.4 : 1} stroke={INK} strokeWidth={0.8} />
            ))}
            <rect x={440} y={20} width={size} height={size} fill="none" stroke={INK} strokeWidth={2.4} />
            <text x={360} y={104} textAnchor="middle" fontSize={34} fontWeight={700} fill={INK}>=</text>
            <text x={205} y={202} textAnchor="middle" fontSize={24} fontWeight={700} fill={STAGE}>{num(language, '0,3')}</text>
            <text x={515} y={202} textAnchor="middle" fontSize={24} fontWeight={700} fill={STAGE}>{num(language, '0,30')}</text>
            <Caption y={232} language={language} text={say('3 hamarren = 30 ehunen: eskuineko zeroak ez du balioa aldatzen', '3 décimas = 30 centésimas: el cero a la derecha no cambia el valor', 'ثلاثة أعشار تساوي ثلاثين جزءًا من مئة: الصفر على اليمين لا يغيّر القيمة')} />
        </Figure>
    )
}

/* ---------- 4. Comparing 2,95, 3,16 and 3,17 digit by digit ---------- */

export function CompareDigitsFigure({ language }: { language: UnitLanguage }) {
    const rows = [
        { name: 'Alberto', text: '2,95', colors: { 0: SECOND } as Record<number, string> },
        { name: 'Ana', text: '3,16', colors: { 3: SECOND } },
        { name: 'Elena', text: '3,17', colors: { 3: STAGE } }
    ]
    const right = 330
    return (
        <Figure height={250} label={pick(language, say('3,17 > 3,16 > 2,95', '3,17 > 3,16 > 2,95', '3.17 > 3.16 > 2.95'))}>
            <rect x={right - widthOf('3,17') - 4} y={30} width={COLUMN + 8} height={150} rx={8} fill={STAGE_TINT} opacity={0.7} />
            <rect x={right - COLUMN - 4} y={30} width={COLUMN + 8} height={150} rx={8} fill={STAGE_TINT} opacity={0.7} />
            {rows.map((row, index) => (
                <g key={row.name}>
                    <text x={120} y={70 + index * 50} textAnchor="middle" fontSize={18} fontWeight={700} fill={INK}>{row.name}</text>
                    <Digits right={right} y={70 + index * 50} text={row.text} language={language} size={28} colors={row.colors} />
                    <text x={right + 20} y={70 + index * 50} fontSize={18} fill={MUTED}>m</text>
                </g>
            ))}
            <text x={540} y={80} textAnchor="middle" fontSize={20} fontWeight={700} fill={INK}>2 &lt; 3</text>
            <text x={540} y={150} textAnchor="middle" fontSize={20} fontWeight={700} fill={INK}>6 &lt; 7</text>
            <text x={540} y={202} textAnchor="middle" fontSize={22} fontWeight={700} fill={STAGE}>{num(language, '3,17 > 3,16 > 2,95')}</text>
            <Caption y={240} language={language} text={say('Lehenik zati osoa; berdinak badira, hamarrenak, gero ehunenak…', 'Primero la parte entera; si son iguales, las décimas, después las centésimas…', 'أولًا الجزء الصحيح؛ وإذا تساوى فالأعشار ثم الأجزاء من مئة…')} />
        </Figure>
    )
}

/* ---------- 5. Zooming into the line: 2,35 ---------- */

export function ZoomLineFigure({ language }: { language: UnitLanguage }) {
    const left = 60
    const width = 600
    const top = (value: number) => left + (value - 2) * width
    const bottom = (value: number) => left + ((value - 2.3) / 0.1) * width
    return (
        <Figure height={270} label={pick(language, say('2,35 zenbaki-zuzenean', '2,35 en la recta', '2.35 على خط الأعداد'))}>
            <rect x={top(2.3)} y={38} width={top(2.4) - top(2.3)} height={24} fill={STAGE} opacity={0.25} />
            <TickLine left={left} width={width} y={50} from={2} to={3} step={0.1} labelEvery={1} language={language} decimals={1} size={14} />
            <line x1={top(2.3)} x2={bottom(2.3)} y1={86} y2={150} stroke={STAGE} strokeWidth={1.6} strokeDasharray="5 5" />
            <line x1={top(2.4)} x2={bottom(2.4)} y1={86} y2={150} stroke={STAGE} strokeWidth={1.6} strokeDasharray="5 5" />
            <TickLine left={left} width={width} y={170} from={2.3} to={2.4} step={0.01} labelEvery={5} language={language} decimals={2} />
            <circle cx={bottom(2.35)} cy={170} r={9} fill={SECOND} stroke={INK} strokeWidth={2} />
            <text x={bottom(2.35)} y={146} textAnchor="middle" fontSize={20} fontWeight={700} fill={SECOND}>{num(language, '2,35')}</text>
            <Caption y={258} language={language} text={say('Goian hamarrenak; behean, tarte bat handituta, ehunenak', 'Arriba, décimas; abajo, un tramo ampliado, centésimas', 'في الأعلى أعشار؛ وفي الأسفل قطعة مكبّرة بأجزاء من مئة')} />
        </Figure>
    )
}

/* ---------- 6. Three numbers between 2,7 and 2,8 ---------- */

export function BetweenFigure({ language }: { language: UnitLanguage }) {
    const left = 80
    const width = 560
    const x = (value: number) => left + ((value - 2.7) / 0.1) * width
    const marks = ['2,725', '2,75', '2,775']
    return (
        <Figure height={220} label={pick(language, say('2,725; 2,75 eta 2,775 2,7 eta 2,8 artean', '2,725; 2,75 y 2,775 entre 2,7 y 2,8', '2.725 و2.75 و2.775 بين 2.7 و2.8'))}>
            <line x1={left - 14} x2={left + width + 14} y1={110} y2={110} stroke={INK} strokeWidth={2.4} />
            {[2.7, 2.8].map((value) => (
                <g key={value}>
                    <line x1={x(value)} x2={x(value)} y1={98} y2={122} stroke={INK} strokeWidth={2.4} />
                    <text x={x(value)} y={150} textAnchor="middle" fontSize={20} fontWeight={700} fill={INK}>{num(language, value === 2.7 ? '2,7' : '2,8')}</text>
                </g>
            ))}
            {marks.map((mark, index) => {
                const value = 2.7 + (index + 1) * 0.025
                return (
                    <g key={mark}>
                        <circle cx={x(value)} cy={110} r={8} fill={index === 1 ? SECOND : STAGE} stroke={INK} strokeWidth={2} />
                        <text x={x(value)} y={150} textAnchor="middle" fontSize={18} fontWeight={700} fill={index === 1 ? SECOND : STAGE}>{num(language, mark)}</text>
                    </g>
                )
            })}
            {Array.from({ length: 4 }, (_, index) => {
                const from = x(2.7 + index * 0.025)
                const to = x(2.7 + (index + 1) * 0.025)
                return (
                    <g key={index}>
                        <path d={`M${from + 4} 96 Q ${(from + to) / 2} 58 ${to - 4} 96`} fill="none" stroke={MUTED} strokeWidth={1.6} />
                        <text x={(from + to) / 2} y={60} textAnchor="middle" fontSize={14} fontWeight={700} fill={MUTED}>{num(language, '0,025')}</text>
                    </g>
                )
            })}
            <Caption y={200} language={language} text={say('Lau tarte berdin; erdikoa, 2,75, bi muturren erdia da', 'Cuatro tramos iguales; el del medio, 2,75, es la mitad de los extremos', 'أربع قطع متساوية؛ والعدد الأوسط منتصف الطرفين')} />
        </Figure>
    )
}

/* ---------- 7. 0,45 = 45/100 and the rule of the zeros ---------- */

export function DecimalFractionFigure({ language }: { language: UnitLanguage }) {
    const size = 160
    return (
        <Figure height={250} label={pick(language, say('0,45 = 45/100', '0,45 = 45/100', '0.45 = 45/100'))}>
            {Array.from({ length: 100 }, (_, index) => (
                <rect key={index} x={50 + Math.floor(index / 10) * (size / 10)} y={20 + (index % 10) * (size / 10)} width={size / 10} height={size / 10} fill={index < 45 ? STAGE : PAPER} fillOpacity={index < 45 ? 0.4 : 1} stroke={INK} strokeWidth={0.8} />
            ))}
            <rect x={50} y={20} width={size} height={size} fill="none" stroke={INK} strokeWidth={2.4} />
            <text x={130} y={210} textAnchor="middle" fontSize={22} fontWeight={700} fill={STAGE}>{num(language, '0,45')}</text>
            <text x={250} y={110} fontSize={26} fontWeight={700} fill={INK}>=</text>
            <Frac x={310} y={100} n={45} d={100} size={26} color={STAGE} />
            <line x1={386} x2={386} y1={30} y2={190} stroke={MUTED} strokeWidth={1.2} strokeDasharray="4 6" />
            <Digits right={500} y={70} text="45,78" language={language} size={26} colors={{ 3: SECOND, 4: SECOND }} />
            <text x={530} y={70} fontSize={24} fontWeight={700} fill={INK}>=</text>
            <Frac x={610} y={60} n={4578} d={100} size={24} />
            <Label x={555} y={140} textAnchor="middle" fontSize={15} fontWeight={700} fill={SECOND}>{pick(language, say('2 zifra hamartar', '2 cifras decimales', 'رقمان عشريان'))}</Label>
            <Label x={555} y={162} textAnchor="middle" fontSize={15} fontWeight={700} fill={SECOND}>{pick(language, say('→ 2 zero', '→ 2 ceros', 'صفران'))}</Label>
            <Caption y={240} language={language} text={say('Ehun lauki, 45 koloreztatuta; zifra hamartar bakoitzeko, zero bat izendatzailean', 'Cien cuadros, 45 coloreados; por cada cifra decimal, un cero en el denominador', 'مئة مربع ملوّن منها خمسة وأربعون؛ ولكل رقم عشري صفر في المقام')} />
        </Figure>
    )
}

/* ---------- 8. 7 : 2 is exact, 7 : 3 never ends ---------- */

export function DivisionKindsFigure({ language }: { language: UnitLanguage }) {
    return (
        <Figure height={270} label={pick(language, say('7 : 2 = 3,5 eta 7 : 3 = 2,333…', '7 : 2 = 3,5 y 7 : 3 = 2,333…', '7 : 2 = 3.5 و7 : 3 = 2.333…'))}>
            <Label x={170} y={24} textAnchor="middle" fontSize={17} fontWeight={700} fill={STAGE}>{pick(language, say('Zehatza', 'Exacto', 'منتهٍ'))}</Label>
            <LongDivision x={110} y={70} dividend="7" divisor="2" quotient="3,5" rows={[{ text: '10', shift: 1 }, { text: '0', shift: 1 }]} language={language} highlight={[1]} />
            <Label x={500} y={24} textAnchor="middle" fontSize={17} fontWeight={700} fill={SECOND}>{pick(language, say('Periodikoa', 'Periódico', 'دوري'))}</Label>
            <LongDivision x={400} y={70} dividend="7" divisor="3" quotient="2,333…" rows={[{ text: '10', shift: 1 }, { text: '10', shift: 2 }, { text: '10', shift: 3 }, { text: '1', shift: 3 }]} language={language} highlight={[0, 1, 2, 3]} />
            <line x1={360} x2={360} y1={30} y2={220} stroke={MUTED} strokeWidth={1.2} strokeDasharray="4 6" />
            <Caption y={258} language={language} text={say('Hondarra 0 → zehatza. Hondarra errepikatzen da → zifrak ere bai: periodikoa', 'Resto 0 → exacto. El resto se repite → las cifras también: periódico', 'الباقي صفر ← منتهٍ. يتكرّر الباقي ← تتكرّر الأرقام: دوري')} />
        </Figure>
    )
}

/* ---------- 9. Rounding 6,27 to the tenths ---------- */

export function RoundingFigure({ language }: { language: UnitLanguage }) {
    const left = 80
    const width = 560
    const x = (value: number) => left + ((value - 6.2) / 0.1) * width
    return (
        <Figure height={252} label={pick(language, say('6,27 ≈ 6,3', '6,27 ≈ 6,3', '6.27 ≈ 6.3'))}>
            <TickLine left={left} width={width} y={110} from={6.2} to={6.3} step={0.01} labelEvery={10} language={language} decimals={1} size={20} />
            <line x1={x(6.25)} x2={x(6.25)} y1={70} y2={130} stroke={MUTED} strokeWidth={1.6} strokeDasharray="5 5" />
            <text x={x(6.25)} y={62} textAnchor="middle" fontSize={15} fontWeight={700} fill={MUTED}>{num(language, '6,25')}</text>
            <circle cx={x(6.27)} cy={110} r={9} fill={SECOND} stroke={INK} strokeWidth={2} />
            <text x={x(6.27)} y={150} textAnchor="middle" fontSize={20} fontWeight={700} fill={SECOND}>{num(language, '6,27')}</text>
            <path d={`M${x(6.27)} 96 Q ${(x(6.27) + x(6.3)) / 2} 70 ${x(6.3) - 4} 96`} fill="none" stroke={STAGE} strokeWidth={2.4} />
            <text x={(x(6.27) + x(6.3)) / 2} y={66} textAnchor="middle" fontSize={15} fontWeight={700} fill={STAGE}>{num(language, '0,03')}</text>
            <path d={`M${x(6.2)} 162 Q ${(x(6.2) + x(6.27)) / 2} 196 ${x(6.27)} 162`} fill="none" stroke={MUTED} strokeWidth={1.6} />
            <text x={(x(6.2) + x(6.27)) / 2} y={206} textAnchor="middle" fontSize={15} fontWeight={700} fill={MUTED}>{num(language, '0,07')}</text>
            <Caption y={240} language={language} text={say('6,27 hurbilago dago 6,3tik: ehunena 7 da, 5 edo handiagoa', '6,27 está más cerca de 6,3: la centésima es 7, 5 o más', 'العدد أقرب إلى الطرف الأيمن: رقم الأجزاء من مئة خمسة أو أكثر')} />
        </Figure>
    )
}

/* ---------- 10. Adding in a column: the commas one under another ---------- */

export function ColumnAddFigure({ language }: { language: UnitLanguage }) {
    const right = 300
    const rows = ['3,80', '4,17', '10,23', '5,10']
    const comma = right - widthOf(',10')
    return (
        <Figure height={290} label={pick(language, say('3,8 + 4,17 + 10,23 + 5,1 = 23,3', '3,8 + 4,17 + 10,23 + 5,1 = 23,3', '3.8 + 4.17 + 10.23 + 5.1 = 23.3'))}>
            <rect x={comma} y={18} width={COLUMN / 2} height={210} rx={4} fill={SECOND} opacity={0.15} />
            {rows.map((row, index) => (
                <Digits key={row} right={right} y={44 + index * 38} text={row} language={language} size={26} colors={index === 0 || index === 3 ? { [row.length - 1]: SECOND } : {}} />
            ))}
            <text x={right - widthOf('10,23') - 24} y={44 + 3 * 38} textAnchor="middle" fontSize={26} fontWeight={700} fill={INK}>+</text>
            <line x1={right - widthOf('10,23') - 30} x2={right + 6} y1={182} y2={182} stroke={INK} strokeWidth={2.4} />
            <Digits right={right} y={216} text="23,30" language={language} size={26} color={STAGE} />
            <text x={right + 22} y={216} fontSize={20} fill={MUTED}>m</text>
            <Label x={540} y={70} textAnchor="middle" fontSize={16} fontWeight={700} fill={SECOND}>{pick(language, say('Komak zutabe berean', 'Comas en la misma columna', 'الفواصل في العمود نفسه'))}</Label>
            <Label x={540} y={130} textAnchor="middle" fontSize={16} fontWeight={700} fill={SECOND}>{pick(language, say('Zeroak gehitu', 'Se añaden ceros', 'نضيف أصفارًا'))}</Label>
            <Label x={540} y={190} textAnchor="middle" fontSize={16} fontWeight={700} fill={STAGE}>{pick(language, say('Koma toki berean', 'La coma en su lugar', 'الفاصلة في مكانها'))}</Label>
            <Caption y={272} language={language} text={say('Unitateak unitateen azpian, hamarrenak hamarrenen azpian, ehunenak ehunenen azpian', 'Unidades bajo unidades, décimas bajo décimas, centésimas bajo centésimas', 'الآحاد تحت الآحاد والأعشار تحت الأعشار والأجزاء من مئة تحتها')} />
        </Figure>
    )
}

/* ---------- 11. 2,75 · 1,3: count the decimals ---------- */

export function MultiplyFigure({ language }: { language: UnitLanguage }) {
    const right = 260
    return (
        <Figure height={300} label={pick(language, say('2,75 · 1,3 = 3,575', '2,75 · 1,3 = 3,575', '2.75 · 1.3 = 3.575'))}>
            <Digits right={right} y={44} text="2,75" language={language} size={26} colors={{ 2: SECOND, 3: SECOND }} />
            <Digits right={right} y={82} text="1,3" language={language} size={26} colors={{ 2: SECOND }} />
            <text x={right - 100} y={82} textAnchor="middle" fontSize={24} fontWeight={700} fill={INK}>×</text>
            <line x1={right - 116} x2={right + 6} y1={96} y2={96} stroke={INK} strokeWidth={2.2} />
            <Digits right={right} y={128} text="825" language={language} size={24} color={MUTED} />
            <Digits right={right - COLUMN} y={162} text="275" language={language} size={24} color={MUTED} />
            <line x1={right - 116} x2={right + 6} y1={176} y2={176} stroke={INK} strokeWidth={2.2} />
            <Digits right={right} y={212} text="3,575" language={language} size={28} color={STAGE} colors={{ 2: SECOND, 3: SECOND, 4: SECOND }} />
            <text x={right + 20} y={212} fontSize={22} fontWeight={700} fill={STAGE}>€</text>
            <Label x={530} y={60} textAnchor="middle" fontSize={17} fontWeight={700} fill={SECOND}>{pick(language, say('2 zifra hamartar', '2 cifras decimales', 'رقمان عشريان'))}</Label>
            <Label x={530} y={92} textAnchor="middle" fontSize={17} fontWeight={700} fill={SECOND}>{pick(language, say('+ 1 zifra hamartar', '+ 1 cifra decimal', 'ورقم عشري واحد'))}</Label>
            <Label x={530} y={212} textAnchor="middle" fontSize={17} fontWeight={700} fill={STAGE}>{pick(language, say('= 3 zifra hamartar', '= 3 cifras decimales', 'ثلاثة أرقام عشرية'))}</Label>
            <Caption y={284} language={language} text={say('Biderkatu komarik gabe, 275 · 13 = 3575, eta jarri koma eskuinetik 3 toki zenbatuta', 'Multiplica sin coma, 275 · 13 = 3575, y pon la coma contando 3 lugares desde la derecha', 'اضرب بلا فاصلة ثم ضع الفاصلة بعدّ ثلاث منازل من اليمين')} />
        </Figure>
    )
}

/* ---------- 12. Moving the comma: · 1000 and : 100 ---------- */

function ShiftRow({ y, before, after, operation, places, toRight, language }: { y: number; before: string; after: string; operation: string; places: number; toRight: boolean; language: UnitLanguage }) {
    const right = 240
    const comma = right - widthOf(before.slice(before.indexOf(',')))
    const hop = COLUMN * places
    return (
        <g>
            <Digits right={right} y={y} text={before} language={language} size={28} colors={{ [before.indexOf(',')]: SECOND }} />
            <path d={`M${comma + COLUMN / 4} ${y - 30} Q ${comma + COLUMN / 4 + (toRight ? hop / 2 : -hop / 2)} ${y - 62} ${comma + COLUMN / 4 + (toRight ? hop : -hop)} ${y - 30}`} fill="none" stroke={SECOND} strokeWidth={2.2} markerEnd="url(#hamartar-arrow)" />
            <text x={330} y={y} textAnchor="middle" fontSize={22} fontWeight={700} fill={INK}>{operation}</text>
            <text x={420} y={y} textAnchor="middle" fontSize={24} fontWeight={700} fill={INK}>=</text>
            <Digits right={600} y={y} text={after} language={language} size={28} color={STAGE} />
        </g>
    )
}

export function ShiftFigure({ language }: { language: UnitLanguage }) {
    return (
        <Figure height={260} label={pick(language, say('4,739 · 1000 = 4739 eta 834,7 : 100 = 8,347', '4,739 · 1000 = 4739 y 834,7 : 100 = 8,347', '4.739 · 1000 = 4739 و834.7 : 100 = 8.347'))}>
            <defs>
                <marker id="hamartar-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                    <path d="M0 0 L10 5 L0 10 Z" fill={SECOND} />
                </marker>
            </defs>
            <ShiftRow y={90} before="4,739" after="4739" operation="· 1000" places={3} toRight language={language} />
            <ShiftRow y={190} before="834,7" after="8,347" operation=": 100" places={2} toRight={false} language={language} />
            <Caption y={244} language={language} text={say('Bider: koma eskuinera; zati: ezkerrera; zero bakoitzeko, toki bat', 'Por: la coma a la derecha; entre: a la izquierda; un lugar por cada cero', 'الضرب: الفاصلة يمينًا؛ القسمة: يسارًا؛ منزلة لكل صفر')} />
        </Figure>
    )
}

/* ---------- 13. 125 : 20 = 6,25 ---------- */

export function DivideNaturalFigure({ language }: { language: UnitLanguage }) {
    return (
        <Figure height={250} label={pick(language, say('125 : 20 = 6,25', '125 : 20 = 6,25', '125 : 20 = 6.25'))}>
            <LongDivision x={150} y={50} dividend="125" divisor="20" quotient="6,25" rows={[{ text: '50', shift: 1 }, { text: '100', shift: 2 }, { text: '0', shift: 2 }]} language={language} highlight={[2]} />
            <Label x={530} y={60} textAnchor="middle" fontSize={16} fontWeight={700} fill={INK}>{pick(language, say('Hondarra 5: koma eta zero bat', 'Resto 5: coma y un cero', 'الباقي 5: فاصلة وصفر'))}</Label>
            <Label x={530} y={100} textAnchor="middle" fontSize={16} fontWeight={700} fill={INK}>{pick(language, say('50 : 20 = 2, hondarra 10', '50 : 20 = 2, resto 10', 'ثم الباقي 10'))}</Label>
            <Label x={530} y={140} textAnchor="middle" fontSize={16} fontWeight={700} fill={INK}>{pick(language, say('100 : 20 = 5, hondarra 0', '100 : 20 = 5, resto 0', 'ثم الباقي صفر'))}</Label>
            <Caption y={234} language={language} text={say('Zatiketa ez da zehatza? Jarri koma zatiduran eta jaitsi zero bat hondarrera', '¿La división no es exacta? Pon la coma en el cociente y baja un cero al resto', 'القسمة غير تامة؟ ضع الفاصلة في الناتج وأنزل صفرًا إلى الباقي')} />
        </Figure>
    )
}

/* ---------- 14. 1,28 : 0,2 = 12,8 : 2 ---------- */

export function DivideDecimalFigure({ language }: { language: UnitLanguage }) {
    return (
        <Figure height={240} label={pick(language, say('1,28 : 0,2 = 12,8 : 2 = 6,4', '1,28 : 0,2 = 12,8 : 2 = 6,4', '1.28 : 0.2 = 12.8 : 2 = 6.4'))}>
            <Digits right={190} y={70} text="1,28" language={language} size={30} colors={{ 1: SECOND }} />
            <text x={222} y={70} textAnchor="middle" fontSize={28} fontWeight={700} fill={INK}>:</text>
            <Digits right={300} y={70} text="0,2" language={language} size={30} colors={{ 1: SECOND }} />
            <text x={196} y={124} textAnchor="middle" fontSize={18} fontWeight={700} fill={SECOND}>· 10</text>
            <text x={321} y={124} textAnchor="middle" fontSize={18} fontWeight={700} fill={SECOND}>· 10</text>
            <Digits right={190} y={176} text="12,8" language={language} size={30} color={STAGE} />
            <text x={222} y={176} textAnchor="middle" fontSize={28} fontWeight={700} fill={INK}>:</text>
            <Digits right={300} y={176} text="2" language={language} size={30} color={STAGE} />
            <text x={370} y={176} textAnchor="middle" fontSize={28} fontWeight={700} fill={INK}>=</text>
            <Digits right={470} y={176} text="6,4" language={language} size={30} color={STAGE} />
            <path d="M160 90 L160 146" stroke={SECOND} strokeWidth={2} strokeDasharray="4 4" />
            <path d="M285 90 L285 146" stroke={SECOND} strokeWidth={2} strokeDasharray="4 4" />
            <Label x={590} y={80} textAnchor="middle" fontSize={16} fontWeight={700} fill={SECOND}>{pick(language, say('Zatitzaileak zifra', 'El divisor tiene', 'للمقسوم عليه'))}</Label>
            <Label x={590} y={102} textAnchor="middle" fontSize={16} fontWeight={700} fill={SECOND}>{pick(language, say('hamartar bat du', 'una cifra decimal', 'رقم عشري واحد'))}</Label>
            <Caption y={226} language={language} text={say('Biak 10ez biderkatuta zatidura ez da aldatzen, eta zatitzaileak ez du komarik', 'Multiplicando los dos por 10 el cociente no cambia y el divisor ya no tiene coma', 'بضرب الاثنين في عشرة لا يتغيّر الناتج وتختفي فاصلة المقسوم عليه')} />
        </Figure>
    )
}

/* ---------- 15. Rosa and Javier's shopping (Anaya) ---------- */

export function ShoppingFigure({ language }: { language: UnitLanguage }) {
    const rows: Array<{ name: LocalizedText; work: string; total: string }> = [
        { name: say('Esnea', 'Leche', 'حليب'), work: '5 · 1,05', total: '5,25' },
        { name: say('Bakailaoa', 'Bacalao', 'سمك القد'), work: '0,92 · 13,25', total: '12,19' },
        { name: say('Gailetak', 'Galletas', 'بسكويت'), work: '', total: '2,85' },
        { name: say('Urdaiazpikoa', 'Jamón', 'لحم مقدّد'), work: '38,40 : 4', total: '9,60' }
    ]
    return (
        <Figure height={300} label={pick(language, say('Erosketa: 29,89 €', 'La compra: 29,89 €', 'المشتريات: 29.89 €'))}>
            <rect x={150} y={14} width={420} height={250} rx={10} fill={PAPER} stroke={INK} strokeWidth={2} />
            {rows.map((row, index) => (
                <g key={index}>
                    <Label x={240} y={56 + index * 42} textAnchor="middle" fontSize={17} fontWeight={700} fill={INK}>{pick(language, row.name)}</Label>
                    <text x={390} y={56 + index * 42} textAnchor="middle" fontSize={16} fill={MUTED}>{num(language, row.work)}</text>
                    <text x={540} y={56 + index * 42} textAnchor="end" fontSize={18} fontWeight={700} fill={INK}>{num(language, row.total)}</text>
                </g>
            ))}
            <line x1={170} x2={550} y1={214} y2={214} stroke={INK} strokeWidth={1.6} strokeDasharray="6 4" />
            <Label x={240} y={244} textAnchor="middle" fontSize={18} fontWeight={700} fill={STAGE}>{pick(language, say('Guztira', 'Total', 'المجموع'))}</Label>
            <text x={540} y={244} textAnchor="end" fontSize={22} fontWeight={700} fill={STAGE}>{num(language, '29,89 €')}</text>
            <Caption y={290} language={language} text={say('Prezioa bider kopurua; laurden kilo: zati 4', 'Precio por cantidad; un cuarto de kilo: entre 4', 'السعر في الكمية؛ ربع كيلو: القسمة على أربعة')} />
        </Figure>
    )
}

/* ---------- Hero ---------- */

function HeroCard({ x, y, rotate, children }: { x: number; y: number; rotate: number; children: ReactNode }) {
    return <g transform={`translate(${x} ${y}) rotate(${rotate})`}>{children}</g>
}

export function DecimalsHeroArt() {
    return (
        <div className="fraction-v2-collage" aria-hidden="true">
            <svg viewBox="0 0 520 400" direction="ltr" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                <HeroCard x={40} y={40} rotate={-4}>
                    <rect width={190} height={190} rx={16} fill={PAPER} stroke={INK} strokeWidth={2} />
                    {Array.from({ length: 100 }, (_, index) => (
                        <rect key={index} x={20 + Math.floor(index / 10) * 15} y={20 + (index % 10) * 15} width={15} height={15} fill={index < 45 ? '#2f6fdb' : PAPER} fillOpacity={index < 45 ? 0.35 : 1} stroke={INK} strokeWidth={0.6} />
                    ))}
                </HeroCard>
                <HeroCard x={280} y={50} rotate={4}>
                    <rect width={190} height={100} rx={16} fill="#e8e0f7" stroke={INK} strokeWidth={2} />
                    <text x={95} y={64} textAnchor="middle" fontSize={40} fontWeight={700} fill={INK} fontFamily="Fraunces, serif">0,45</text>
                </HeroCard>
                <HeroCard x={290} y={185} rotate={-3}>
                    <rect width={180} height={80} rx={16} fill="#fbebc0" stroke={INK} strokeWidth={2} />
                    <text x={90} y={52} textAnchor="middle" fontSize={26} fontWeight={700} fill={INK} fontFamily="Fraunces, serif">1,30 €/m</text>
                </HeroCard>
                <HeroCard x={40} y={290} rotate={0}>
                    <rect width={440} height={80} rx={16} fill="#d6eddf" stroke={INK} strokeWidth={2} />
                    <line x1={30} x2={410} y1={44} y2={44} stroke={INK} strokeWidth={2.4} />
                    {Array.from({ length: 11 }, (_, index) => (
                        <line key={index} x1={30 + index * 38} x2={30 + index * 38} y1={index % 5 === 0 ? 30 : 36} y2={index % 5 === 0 ? 58 : 52} stroke={INK} strokeWidth={index % 5 === 0 ? 2.4 : 1.4} />
                    ))}
                    <circle cx={30 + 3.5 * 38} cy={44} r={8} fill="#c4432a" stroke={INK} strokeWidth={2} />
                </HeroCard>
            </svg>
        </div>
    )
}
