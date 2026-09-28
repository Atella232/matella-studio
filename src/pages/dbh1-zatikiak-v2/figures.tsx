import { pickText, type LocalizedText, type UnitLanguage } from '../../features/unit-v2/types'
import { Bar, Caption, Figure, Frac } from '../dbh2-zatikiak-prototype/figures'

/* ==========================================================================
   Zatikiak · 1. DBH — figures of their own (the three readings of 3/4, the
   mixed number, equivalents, the sum with common denominator, the area of
   a product and the fraction of a quantity are shared with 2. DBH)
   ========================================================================== */

const INK = 'var(--ink, #1d2733)'
const MUTED = 'var(--muted, #58616e)'
const STAGE = 'var(--stage, #2f6fdb)'
const STAGE_TINT = 'var(--stage-tint, #dde7f7)'
const SECOND = 'var(--second, #c4432a)'
const PAPER = '#fffcf6'

const pick = (language: UnitLanguage, text: LocalizedText) => pickText(language, text)

/** A circle cut into `parts` equal sectors, the first `filled` coloured */
function Pie({ cx, cy, r, parts, filled, color = STAGE_TINT }: { cx: number; cy: number; r: number; parts: number; filled: number; color?: string }) {
    const point = (index: number) => {
        const angle = -Math.PI / 2 + (index / parts) * 2 * Math.PI
        return [cx + r * Math.cos(angle), cy + r * Math.sin(angle)]
    }
    return (
        <g>
            <circle cx={cx} cy={cy} r={r} fill={PAPER} stroke={INK} strokeWidth={2.2} />
            {Array.from({ length: parts }, (_, index) => {
                const [x1, y1] = point(index)
                const [x2, y2] = point(index + 1)
                return <path key={index} d={`M${cx} ${cy} L${x1} ${y1} A${r} ${r} 0 0 1 ${x2} ${y2} Z`} fill={index < filled ? color : PAPER} stroke={INK} strokeWidth={1.6} />
            })}
        </g>
    )
}

/** A number line from 0 to `max` with every unit split into `parts`; returns the x of a value */
function SplitLine({ left, width, y, max, parts }: { left: number; width: number; y: number; max: number; parts: number }) {
    const x = (value: number) => left + (value / max) * width
    return (
        <g>
            <line x1={left - 10} x2={left + width + 16} y1={y} y2={y} stroke={INK} strokeWidth={2.4} />
            {Array.from({ length: max * parts + 1 }, (_, index) => {
                const whole = index % parts === 0
                return <line key={index} x1={x(index / parts)} x2={x(index / parts)} y1={y - (whole ? 11 : 7)} y2={y + (whole ? 11 : 7)} stroke={INK} strokeWidth={whole ? 2.4 : 1.4} />
            })}
            {Array.from({ length: max + 1 }, (_, unit) => (
                <text key={unit} x={x(unit)} y={y + 32} textAnchor="middle" fontSize={17} fontWeight={700} fill={INK}>{unit}</text>
            ))}
        </g>
    )
}

/* ---------- The cheese box (Santillana): 3 of 8 portions ---------- */

export function CheeseFigure({ language }: { language: UnitLanguage }) {
    return (
        <Figure height={230} label={pick(language, { eu: '8 zatiko gazta-kutxa: 3 jan dira', es: 'Caja de quesitos de 8 porciones: se han comido 3', ar: 'علبة جبن من 8 قطع: أُكلت 3' })}>
            <Pie cx={150} cy={110} r={86} parts={8} filled={3} />
            <Frac x={420} y={104} n={3} d={8} size={46} color={STAGE} />
            <line x1={470} x2={520} y1={80} y2={62} stroke={INK} strokeWidth={1.6} />
            <text x={528} y={60} fontSize={16} fontWeight={700} fill={INK}>{pick(language, { eu: 'zenbakitzailea', es: 'numerador', ar: 'البسط' })}</text>
            <text x={528} y={80} fontSize={14} fill={MUTED}>{pick(language, { eu: 'hartzen diren zatiak', es: 'partes que se toman', ar: 'الأجزاء المأخوذة' })}</text>
            <line x1={470} x2={520} y1={104} y2={104} stroke={INK} strokeWidth={1.6} />
            <text x={528} y={110} fontSize={16} fontWeight={700} fill={INK}>{pick(language, { eu: 'zatiki-marra', es: 'raya de fracción', ar: 'خط الكسر' })}</text>
            <line x1={470} x2={520} y1={128} y2={146} stroke={INK} strokeWidth={1.6} />
            <text x={528} y={150} fontSize={16} fontWeight={700} fill={INK}>{pick(language, { eu: 'izendatzailea', es: 'denominador', ar: 'المقام' })}</text>
            <text x={528} y={170} fontSize={14} fill={MUTED}>{pick(language, { eu: 'zati berdinak guztira', es: 'partes iguales en total', ar: 'مجموع الأجزاء المتساوية' })}</text>
            <Caption y={222}>{pick(language, { eu: '«Hiru zortziren»: 8 zati berdinetatik 3', es: '«Tres octavos»: 3 de 8 partes iguales', ar: '«ثلاثة أثمان»: 3 من 8 أجزاء متساوية' })}</Caption>
        </Figure>
    )
}

/* ---------- One fraction, several drawings: 2/6 of a sponge cake ---------- */

export function ShapesFigure({ language }: { language: UnitLanguage }) {
    return (
        <Figure height={220} label={pick(language, { eu: '2/6 hiru irudi desberdinetan', es: '2/6 en tres dibujos distintos', ar: '2/6 في ثلاثة رسوم مختلفة' })}>
            <Pie cx={120} cy={92} r={70} parts={6} filled={2} />
            <Bar x={240} y={70} width={210} height={46} parts={6} filled={2} />
            {Array.from({ length: 6 }, (_, index) => (
                <rect key={index} x={520 + (index % 3) * 52} y={40 + Math.floor(index / 3) * 52} width={52} height={52} fill={index < 2 ? STAGE_TINT : PAPER} stroke={INK} strokeWidth={1.8} />
            ))}
            <rect x={520} y={40} width={156} height={104} fill="none" stroke={INK} strokeWidth={2.4} />
            {[120, 345, 598].map((x) => <Frac key={x} x={x} y={188} n={2} d={6} size={20} color={STAGE} />)}
            <Caption y={214}>{pick(language, { eu: 'Zatitu irudia izendatzaileak adina zati berdinetan eta koloreztatu zenbakitzaileak adina', es: 'Divide la figura en tantas partes iguales como el denominador y colorea tantas como el numerador', ar: 'قسّم الشكل إلى أجزاء متساوية بعدد المقام ولوّن منها بعدد البسط' })}</Caption>
        </Figure>
    )
}

/* ---------- Proper, equal to one and improper, on the line ---------- */

export function TypesLineFigure({ language }: { language: UnitLanguage }) {
    const left = 60
    const width = 600
    const x = (value: number) => left + (value / 2) * width
    const marks = [
        { value: 3 / 8, n: 3, label: { eu: 'propioa < 1', es: 'propia < 1', ar: 'حقيقي < 1' }, color: STAGE },
        { value: 1, n: 8, label: { eu: '= 1', es: '= 1', ar: '= 1' }, color: INK },
        { value: 11 / 8, n: 11, label: { eu: 'inpropioa > 1', es: 'impropia > 1', ar: 'غير حقيقي > 1' }, color: SECOND }
    ]
    return (
        <Figure height={210} label={pick(language, { eu: '3/8, 8/8 eta 11/8 zenbaki-zuzenean', es: '3/8, 8/8 y 11/8 en la recta', ar: '3/8 و8/8 و11/8 على خط الأعداد' })}>
            <SplitLine left={left} width={width} y={120} max={2} parts={8} />
            {marks.map((mark) => (
                <g key={mark.n}>
                    <circle cx={x(mark.value)} cy={120} r={8} fill={mark.color} stroke={INK} strokeWidth={2} />
                    <Frac x={x(mark.value)} y={62} n={mark.n} d={8} size={20} color={mark.color} />
                    <text x={x(mark.value)} y={24} textAnchor="middle" fontSize={15} fontWeight={700} fill={mark.color}>{pick(language, mark.label)}</text>
                </g>
            ))}
            <Caption y={200}>{pick(language, { eu: 'Zenbakitzailea < izendatzailea → 1 baino txikiagoa; berdinak → 1; handiagoa → 1 baino handiagoa', es: 'Numerador < denominador → menor que 1; iguales → 1; mayor → mayor que 1', ar: 'البسط < المقام ← أصغر من 1؛ متساويان ← 1؛ أكبر ← أكبر من 1' })}</Caption>
        </Figure>
    )
}

/* ---------- Placing 5/3 on the line, step by step ---------- */

export function PlaceOnLineFigure({ language }: { language: UnitLanguage }) {
    const left = 60
    const width = 600
    const x = (value: number) => left + (value / 3) * width
    return (
        <Figure height={210} label={pick(language, { eu: '5/3 zenbaki-zuzenean', es: '5/3 en la recta', ar: '5/3 على خط الأعداد' })}>
            <SplitLine left={left} width={width} y={110} max={3} parts={3} />
            {Array.from({ length: 5 }, (_, index) => (
                <path key={index} d={`M${x(index / 3)} ${102} Q ${(x(index / 3) + x((index + 1) / 3)) / 2} ${62} ${x((index + 1) / 3)} ${102}`} fill="none" stroke={STAGE} strokeWidth={2.4} />
            ))}
            {Array.from({ length: 5 }, (_, index) => (
                <text key={index} x={(x(index / 3) + x((index + 1) / 3)) / 2} y={60} textAnchor="middle" fontSize={14} fontWeight={700} fill={STAGE}>{index + 1}</text>
            ))}
            <circle cx={x(5 / 3)} cy={110} r={9} fill={STAGE} stroke={INK} strokeWidth={2} />
            <Frac x={x(5 / 3)} y={26} n={5} d={3} size={16} color={STAGE} />
            <Caption y={200}>{pick(language, { eu: 'Unitate bakoitza 3 zatitan (izendatzailea); 5 zati aurrera (zenbakitzailea): 5/3 = 1 eta 2/3', es: 'Cada unidad en 3 partes (denominador); avanza 5 partes (numerador): 5/3 = 1 y 2/3', ar: 'كل وحدة 3 أجزاء (المقام)؛ تقدّم 5 أجزاء (البسط): 5/3 = 1 و2/3' })}</Caption>
        </Figure>
    )
}

/* ---------- Simplifying 6/15 into 2/5: the same amount ---------- */

export function SimplifyBarsFigure({ language }: { language: UnitLanguage }) {
    return (
        <Figure height={230} label={pick(language, { eu: '6/15 = 2/5', es: '6/15 = 2/5', ar: '6/15 = 2/5' })}>
            <Bar x={140} y={30} width={450} height={44} parts={15} filled={6} />
            <Frac x={80} y={50} n={6} d={15} size={20} />
            <Bar x={140} y={120} width={450} height={44} parts={5} filled={2} />
            <Frac x={80} y={140} n={2} d={5} size={20} color={STAGE} />
            <line x1={320} x2={320} y1={22} y2={172} stroke={SECOND} strokeWidth={2.4} strokeDasharray="6 5" />
            <text x={640} y={112} textAnchor="middle" fontSize={18} fontWeight={700} fill={INK}>: 3</text>
            <Caption y={214}>{pick(language, { eu: 'Zenbakitzailea eta izendatzailea 3z zatituta: zati gutxiago eta handiagoak, kopuru bera', es: 'Numerador y denominador divididos entre 3: menos partes, más grandes, la misma cantidad', ar: 'البسط والمقام مقسومان على 3: أجزاء أقل وأكبر، والكمية نفسها' })}</Caption>
        </Figure>
    )
}

/* ---------- Santillana's stickers: 2/3, 1/2 and 3/4 as twelfths ---------- */

export function StickersFigure({ language }: { language: UnitLanguage }) {
    const rows = [
        { name: 'Jorge', n: 2, d: 3, twelfths: 8 },
        { name: 'Araceli', n: 1, d: 2, twelfths: 6 },
        { name: 'Lucas', n: 3, d: 4, twelfths: 9 }
    ]
    return (
        <Figure height={250} label={pick(language, { eu: '2/3 = 8/12, 1/2 = 6/12, 3/4 = 9/12', es: '2/3 = 8/12, 1/2 = 6/12, 3/4 = 9/12', ar: '2/3 = 8/12، 1/2 = 6/12، 3/4 = 9/12' })}>
            {rows.map((row, index) => (
                <g key={row.name}>
                    <text x={30} y={52 + index * 64} fontSize={16} fontWeight={700} fill={INK}>{row.name}</text>
                    <Frac x={140} y={46 + index * 64} n={row.n} d={row.d} size={18} />
                    <text x={178} y={52 + index * 64} fontSize={18} fontWeight={700} fill={INK}>=</text>
                    <Frac x={222} y={46 + index * 64} n={row.twelfths} d={12} size={18} color={STAGE} />
                    <Bar x={270} y={26 + index * 64} width={420} height={38} parts={12} filled={row.twelfths} />
                </g>
            ))}
            <Caption y={238}>{pick(language, { eu: 'Izendatzaile bera → zenbakitzaile handiena duena da handiena: 9/12 > 8/12 > 6/12', es: 'Mismo denominador → es mayor la de mayor numerador: 9/12 > 8/12 > 6/12', ar: 'المقام نفسه ← الأكبر صاحب البسط الأكبر: 9/12 > 8/12 > 6/12' })}</Caption>
        </Figure>
    )
}

/* ---------- Adding with the same denominator ---------- */

export function SameDenominatorFigure({ language }: { language: UnitLanguage }) {
    return (
        <Figure height={200} label={pick(language, { eu: '2/7 + 3/7 = 5/7', es: '2/7 + 3/7 = 5/7', ar: '2/7 + 3/7 = 5/7' })}>
            <Bar x={80} y={40} width={560} height={50} parts={7} filled={2} extra={3} />
            <Frac x={80 + 80} y={130} n={2} d={7} size={20} color={STAGE} />
            <text x={260} y={138} textAnchor="middle" fontSize={22} fontWeight={700} fill={INK}>+</text>
            <Frac x={80 + 80 * 3.5} y={130} n={3} d={7} size={20} color={SECOND} />
            <text x={440} y={138} textAnchor="middle" fontSize={22} fontWeight={700} fill={INK}>=</text>
            <Frac x={520} y={130} n={5} d={7} size={24} />
            <Caption y={190}>{pick(language, { eu: 'Zazpiren batzen dira: zenbakitzaileak batu, izendatzailea bera', es: 'Se suman séptimos: se suman los numeradores, el denominador no cambia', ar: 'نجمع أسباعًا: نجمع البسوط ويبقى المقام' })}</Caption>
        </Figure>
    )
}

/* ---------- How many eighths fit in 3/4? ---------- */

export function DivideFigure({ language }: { language: UnitLanguage }) {
    return (
        <Figure height={220} label={pick(language, { eu: '3/4 : 1/8 = 6', es: '3/4 : 1/8 = 6', ar: '3/4 : 1/8 = 6' })}>
            <Bar x={80} y={30} width={560} height={44} parts={4} filled={3} />
            <Bar x={80} y={96} width={560} height={44} parts={8} filled={6} labels={['1', '2', '3', '4', '5', '6']} />
            <text x={50} y={58} textAnchor="middle" fontSize={16} fontWeight={700} fill={INK}>3/4</text>
            <text x={50} y={124} textAnchor="middle" fontSize={16} fontWeight={700} fill={STAGE}>1/8</text>
            <text x={360} y={176} textAnchor="middle" fontSize={20} fontWeight={700} fill={INK}>3/4 : 1/8 = (3 · 8)/(4 · 1) = 24/4 = 6</text>
            <Caption y={210}>{pick(language, { eu: '3/4-n sei zortziren sartzen dira', es: 'En 3/4 caben seis octavos', ar: 'في 3/4 ستة أثمان' })}</Caption>
        </Figure>
    )
}

/* ---------- Hero ---------- */

export function FractionsIntroHeroArt() {
    return (
        <div className="fraction-v2-collage" aria-hidden="true">
            <svg className="divisibility-hero-art" viewBox="0 0 520 400" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                <g transform="translate(40 40) rotate(-4)">
                    <rect width={200} height={200} rx={16} fill={PAPER} stroke={INK} strokeWidth={2} />
                    <Pie cx={100} cy={100} r={72} parts={8} filled={3} color="#dde7f7" />
                </g>
                <g transform="translate(290 50) rotate(4)">
                    <rect width={170} height={110} rx={16} fill="#e8e0f7" stroke={INK} strokeWidth={2} />
                    <text x={85} y={50} textAnchor="middle" fontSize={34} fontWeight={700} fill={INK} fontFamily="Fraunces, serif">3</text>
                    <line x1={60} x2={110} y1={62} y2={62} stroke={INK} strokeWidth={3} />
                    <text x={85} y={98} textAnchor="middle" fontSize={34} fontWeight={700} fill={INK} fontFamily="Fraunces, serif">8</text>
                </g>
                <g transform="translate(290 190) rotate(-3)">
                    <rect width={180} height={80} rx={16} fill="#fbebc0" stroke={INK} strokeWidth={2} />
                    <text x={90} y={52} textAnchor="middle" fontSize={26} fontWeight={700} fill={INK} fontFamily="Fraunces, serif">2/6 = 1/3</text>
                </g>
                <g transform="translate(40 300)">
                    <rect width={440} height={70} rx={16} fill="#d6eddf" stroke={INK} strokeWidth={2} />
                    {Array.from({ length: 5 }, (_, index) => (
                        <rect key={index} x={30 + index * 76} y={18} width={76} height={34} fill={index < 2 ? '#2f6fdb' : PAPER} fillOpacity={index < 2 ? 0.35 : 1} stroke={INK} strokeWidth={2} />
                    ))}
                </g>
            </svg>
        </div>
    )
}

