import type { ReactNode } from 'react'
import { pickText, type LocalizedText, type UnitLanguage } from '../../features/unit-v2/types'
import { Figure, Frac } from '../dbh2-zatikiak-prototype/figures'
import { Label } from '../dbh2-funtzioak-v2/plane'
import { Caption } from '../dbh1-proportzionaltasuna-v2/figures'
import { decimalSeparatorFor, thousandsSeparatorFor } from '../../utils/numberFormat.ts'

/* ==========================================================================
   Proportzionaltasuna · 4. DBH aplikatuak — the new lesson figures: simple
   against compound interest year by year, the same capital with more
   capitalisation periods, a coffee mixture, two vehicles approaching or
   chasing each other and two taps filling a tank. The review, compound,
   share and percentage lessons reuse the 1. and 2. DBH figures. Numbers
   keep the decimal comma in Basque and Spanish and the point in Arabic;
   Arabic captions carry words only.
   ========================================================================== */

const INK = 'var(--ink, #1d2733)'
const MUTED = 'var(--muted, #58616e)'
const STAGE = 'var(--stage, #2f6fdb)'
const STAGE_TINT = 'var(--stage-tint, #dde7f7)'
const SECOND = 'var(--second, #c4432a)'
const GREEN = 'var(--success, #267b53)'
const PAPER = '#fffcf6'
const SOFT = '#fbebc0'

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const pick = (language: UnitLanguage, text: LocalizedText) => pickText(language, text)
/** A number written with the comma, shown with the point in Arabic */
/** The Spanish marks written in a figure (1,12 and 10 000) become the language's own: 1.12 and 10,000 in English; Arabic keeps its point */
const num = (language: UnitLanguage, text: string) => {
    if (language === 'ar') return text.replace(/,/g, '.')
    if (language !== 'en') return text
    return text.replace(/(\d),(\d)/g, `$1${decimalSeparatorFor(language)}$2`).replace(/(\d) (?=\d{3}(?!\d))/g, `$1${thousandsSeparatorFor(language)}`)
}

/* ---------- 11. Simple against compound interest ---------- */

export function CompoundInterestFigure({ language }: { language: UnitLanguage }) {
    const years = [0, 1, 2, 3]
    const simple = [1000, 1100, 1200, 1300]
    const compound = [1000, 1100, 1210, 1331]
    const base = 210
    const scale = 0.12
    return (
        <Figure height={300} label={pick(language, say('1000 € % 10ean: bakuna 1100, 1200, 1300; konposatua 1100, 1210, 1331', '1000 € al 10 %: simple 1100, 1200, 1300; compuesto 1100, 1210, 1331', '1000 € بفائدة 10٪: بسيطة 1100، 1200، 1300؛ مركّبة 1100، 1210، 1331', '€1000 at 10%: simple 1100, 1200, 1300; compound 1100, 1210, 1331'))}>
            <line x1={50} x2={560} y1={base} y2={base} stroke={INK} strokeWidth={2} />
            {years.map((year) => {
                const x = 70 + year * 125
                return (
                    <g key={year}>
                        <rect x={x} y={base - simple[year] * scale} width={44} height={simple[year] * scale} fill={STAGE} fillOpacity={0.3} stroke={INK} strokeWidth={1.6} />
                        <rect x={x + 50} y={base - compound[year] * scale} width={44} height={compound[year] * scale} fill={GREEN} fillOpacity={0.4} stroke={INK} strokeWidth={1.6} />
                        <text x={x + 22} y={base - simple[year] * scale - 8} textAnchor="middle" fontSize={14} fontWeight={700} fill={STAGE}>{simple[year]}</text>
                        <text x={x + 72} y={base - compound[year] * scale - 8} textAnchor="middle" fontSize={14} fontWeight={700} fill={GREEN}>{compound[year]}</text>
                        <text x={x + 47} y={base + 22} textAnchor="middle" fontSize={16} fontWeight={700} fill={MUTED}>{year}</text>
                    </g>
                )
            })}
            <rect x={580} y={40} width={18} height={18} fill={STAGE} fillOpacity={0.3} stroke={INK} />
            <Label x={606} y={55} fontSize={14} fontWeight={700} fill={STAGE}>{pick(language, say('bakuna', 'simple', 'بسيطة', 'simple'))}</Label>
            <rect x={580} y={70} width={18} height={18} fill={GREEN} fillOpacity={0.4} stroke={INK} />
            <Label x={606} y={85} fontSize={14} fontWeight={700} fill={GREEN}>{pick(language, say('konposatua', 'compuesto', 'مركّبة', 'compound'))}</Label>
            <text x={640} y={150} textAnchor="middle" fontSize={17} fontWeight={700} fill={STAGE}>+100</text>
            <text x={640} y={180} textAnchor="middle" fontSize={17} fontWeight={700} fill={GREEN}>{num(language, '· 1,1')}</text>
            <text x={360} y={256} textAnchor="middle" fontSize={20} fontWeight={700} fill={GREEN}>{num(language, '1000 · 1,1³ = 1331')}</text>
            <Caption y={288} language={language} text={say('Konposatuan interesak ere interesa sortzen du', 'En el compuesto, el interés también produce interés', 'في المركّبة تُنتج الفائدة نفسها فائدة', 'With compound interest, the interest also earns interest')} />
        </Figure>
    )
}

/* ---------- 12. More capitalisation periods ---------- */

export function PeriodsFigure({ language }: { language: UnitLanguage }) {
    const rows: Array<{ k: string; name: LocalizedText; formula: string; total: string }> = [
        { k: '1', name: say('urtean behin', 'anual', 'سنوية', 'annual'), formula: '10 000 · 1,12', total: '11 200' },
        { k: '2', name: say('seihilekoa', 'semestral', 'نصف سنوية', 'half-yearly'), formula: '10 000 · 1,06²', total: '11 236' },
        { k: '4', name: say('hiruhilekoa', 'trimestral', 'ربع سنوية', 'quarterly'), formula: '10 000 · 1,03⁴', total: '11 255,09' },
        { k: '12', name: say('hilekoa', 'mensual', 'شهرية', 'monthly'), formula: '10 000 · 1,01¹²', total: '11 268,25' }
    ]
    return (
        <Figure height={310} label={pick(language, say('10 000 € % 12an urte batez, k = 1, 2, 4, 12', '10 000 € al 12 % un año, k = 1, 2, 4, 12', '10000 € بفائدة 12٪ سنة واحدة، k = 1، 2، 4، 12', '€10,000 at 12% for one year, k = 1, 2, 4, 12'))}>
            {['k', '', 'C · (1 + r/100k)ᵏ', '€'].map((head, index) => (
                <text key={index} x={[70, 190, 400, 610][index]} y={30} textAnchor="middle" fontSize={16} fontWeight={700} fill={MUTED}>{head}</text>
            ))}
            {rows.map((row, index) => {
                const y = 44 + index * 48
                return (
                    <g key={row.k}>
                        <rect x={40} y={y} width={640} height={42} rx={8} fill={index === 3 ? SOFT : index % 2 ? STAGE_TINT : PAPER} stroke={INK} strokeWidth={1.4} />
                        <text x={70} y={y + 28} textAnchor="middle" fontSize={20} fontWeight={700} fill={STAGE}>{row.k}</text>
                        <Label x={190} y={y + 27} textAnchor="middle" fontSize={15} fontWeight={700} fill={INK}>{pick(language, row.name)}</Label>
                        <text x={400} y={y + 28} textAnchor="middle" fontSize={19} fill={INK}>{num(language, row.formula)}</text>
                        <text x={610} y={y + 28} textAnchor="middle" fontSize={19} fontWeight={700} fill={index === 3 ? SECOND : GREEN}>{num(language, row.total)}</text>
                    </g>
                )
            })}
            <Caption y={262} language={language} text={say('Tasa zati k, eta urteak bider k', 'El tipo entre k, y los años por k', 'السعر مقسومًا على k والسنوات مضروبة في k', 'The rate divided by k, and the years multiplied by k')} />
            <Caption y={290} language={language} text={say('Zenbat eta maizago, orduan eta gehiago (baina gutxi)', 'Cuanto más a menudo, algo más (pero poco)', 'كلما تكرر أكثر زاد المبلغ قليلًا', 'The more often, the slightly more (but not by much)')} />
        </Figure>
    )
}

/* ---------- 13. A mixture ---------- */

export function MixtureFigure({ language }: { language: UnitLanguage }) {
    const rows: Array<[LocalizedText, string, string, string]> = [
        [say('A kafea', 'Café A', 'البن أ', 'Coffee A'), '12', '12,40', '148,80'],
        [say('B kafea', 'Café B', 'البن ب', 'Coffee B'), '8', '7,40', '59,20'],
        [say('Nahasketa', 'Mezcla', 'الخليط', 'Mixture'), '20', 'x', '208']
    ]
    const heads = [say('kg', 'kg', 'كغ', 'kg'), say('€/kg', '€/kg', '€/كغ', '€/kg'), say('€', '€', '€', '€')]
    const line = (value: number) => 120 + ((value - 7) / 6) * 480
    return (
        <Figure height={320} label={pick(language, say('12 kg 12,40-an eta 8 kg 7,40-an: 20 kg, 208 €, 10,40 €/kg', '12 kg a 12,40 y 8 kg a 7,40: 20 kg, 208 €, 10,40 €/kg', '12 كغ بـ12.40 و8 كغ بـ7.40: 20 كغ، 208 €، 10.40 €/كغ', '12 kg at €12.40 and 8 kg at €7.40: 20 kg, €208, €10.40/kg'))}>
            {heads.map((head, index) => <Label key={index} x={330 + index * 130} y={26} textAnchor="middle" fontSize={15} fontWeight={700} fill={MUTED}>{pick(language, head)}</Label>)}
            {rows.map(([name, kg, price, cost], index) => {
                const y = 36 + index * 42
                const total = index === 2
                return (
                    <g key={index}>
                        <rect x={110} y={y} width={500} height={38} rx={6} fill={total ? SOFT : PAPER} stroke={INK} strokeWidth={1.4} />
                        <Label x={185} y={y + 25} textAnchor="middle" fontSize={16} fontWeight={700} fill={INK}>{pick(language, name)}</Label>
                        {[kg, price, cost].map((value, column) => <text key={column} x={330 + column * 130} y={y + 26} textAnchor="middle" fontSize={19} fontWeight={700} fill={value === 'x' ? SECOND : total ? STAGE : INK}>{num(language, value)}</text>)}
                    </g>
                )
            })}
            <text x={360} y={190} textAnchor="middle" fontSize={21} fontWeight={700} fill={STAGE}>{num(language, 'x = 208 : 20 = 10,40 €/kg')}</text>
            <line x1={line(7)} x2={line(13)} y1={240} y2={240} stroke={INK} strokeWidth={2} />
            {[['7,40', 7.4, MUTED], ['10,40', 10.4, SECOND], ['12,40', 12.4, MUTED]].map(([label, value, color]) => (
                <g key={label as string}>
                    <circle cx={line(value as number)} cy={240} r={7} fill={color as string} />
                    <text x={line(value as number)} y={228} textAnchor="middle" fontSize={16} fontWeight={700} fill={color as string}>{num(language, label as string)}</text>
                </g>
            ))}
            <Caption y={268} language={language} text={say('Prezioa bien artean dago, kantitate handienaren aldetik hurbilago', 'El precio queda entre los dos, más cerca del que más cantidad tiene', 'يقع السعر بين الاثنين، أقرب إلى الأكثر كمية', 'The price lies between the two, closer to the one with more quantity')} />
            <Caption y={300} language={language} text={say('Prezio ertaina = kostu osoa : kantitate osoa', 'Precio medio = coste total : cantidad total', 'السعر المتوسط = الكلفة الكلية : الكمية الكلية', 'Mean price = total cost : total quantity')} />
        </Figure>
    )
}

/* ---------- 14. Two moving vehicles ---------- */

function Vehicle({ x, y, color, back = false }: { x: number; y: number; color: string; back?: boolean }) {
    const flip = back ? -1 : 1
    return (
        <g transform={`translate(${x} ${y}) scale(${flip} 1)`}>
            <rect x={-22} y={-14} width={44} height={18} rx={5} fill={color} stroke={INK} strokeWidth={1.4} />
            <rect x={-8} y={-24} width={22} height={12} rx={3} fill={color} fillOpacity={0.6} stroke={INK} strokeWidth={1.2} />
            <circle cx={-12} cy={6} r={5} fill={INK} />
            <circle cx={12} cy={6} r={5} fill={INK} />
        </g>
    )
}

/** A figure drawn 360 wide, so that it fits a phone without scrolling sideways (lesson figures are otherwise 720 wide with a 540 px minimum) */
function NarrowFigure({ height, label, children }: { height: number; label: string; children: ReactNode }) {
    return (
        <svg viewBox={`0 0 360 ${height}`} role="img" aria-label={label} style={{ minWidth: 0, maxWidth: 520, fontFamily: '"Atkinson Hyperlegible", "Noto Sans Arabic", system-ui, sans-serif', direction: 'ltr' }}>
            {children}
        </svg>
    )
}

export function MotionFigure({ language }: { language: UnitLanguage }) {
    return (
        <NarrowFigure height={326} label={pick(language, say('Elkarrengana: 240 km, 70 + 110 = 180 km/h. Atzetik: 75 km, 120 − 90 = 30 km/h', 'Al encuentro: 240 km, 70 + 110 = 180 km/h. Persecución: 75 km, 120 − 90 = 30 km/h', 'تلاقٍ: 240 كم، 70 + 110 = 180 كم/س. مطاردة: 75 كم، 120 − 90 = 30 كم/س', 'Towards each other: 240 km, 70 + 110 = 180 km/h. Chase: 75 km, 120 − 90 = 30 km/h'))}>
            <Label x={14} y={22} fontSize={15} fontWeight={700} fill={MUTED}>{pick(language, say('Elkarrengana', 'Al encuentro', 'تلاقٍ', 'Towards each other'))}</Label>
            <line x1={14} x2={346} y1={72} y2={72} stroke={INK} strokeWidth={2} />
            <Vehicle x={40} y={62} color={STAGE} />
            <Vehicle x={320} y={62} color={SECOND} back />
            <text x={66} y={46} fontSize={17} fontWeight={700} fill={STAGE}>70 →</text>
            <text x={294} y={46} textAnchor="end" fontSize={17} fontWeight={700} fill={SECOND}>← 110</text>
            <text x={180} y={94} textAnchor="middle" fontSize={16} fontWeight={700} fill={INK}>240 km</text>
            <text x={180} y={122} textAnchor="middle" fontSize={17} fontWeight={700} fill={STAGE}>{num(language, '240 : 180 = 4/3 h = 1 h 20 min')}</text>
            <Label x={14} y={164} fontSize={15} fontWeight={700} fill={MUTED}>{pick(language, say('Atzetik', 'Persecución', 'مطاردة', 'Chase'))}</Label>
            <line x1={14} x2={346} y1={214} y2={214} stroke={INK} strokeWidth={2} />
            <Vehicle x={40} y={204} color={STAGE} />
            <Vehicle x={200} y={204} color={SECOND} />
            <text x={66} y={188} fontSize={17} fontWeight={700} fill={STAGE}>120 →</text>
            <text x={226} y={188} fontSize={17} fontWeight={700} fill={SECOND}>90 →</text>
            <text x={120} y={236} textAnchor="middle" fontSize={16} fontWeight={700} fill={INK}>75 km</text>
            <text x={180} y={264} textAnchor="middle" fontSize={17} fontWeight={700} fill={STAGE}>{num(language, '75 : (120 − 90) = 75 : 30 = 2,5 h')}</text>
            <Label x={180} y={296} textAnchor="middle" fontSize={15} fill={MUTED}>{pick(language, say('Elkarrengana: batu abiadurak.', 'Al encuentro: suma las velocidades.', 'في التلاقي: اجمع السرعتين.', 'Towards each other: add the speeds.'))}</Label>
            <Label x={180} y={316} textAnchor="middle" fontSize={15} fill={MUTED}>{pick(language, say('Atzetik: kendu.', 'Persecución: réstalas.', 'في المطاردة: اطرحهما.', 'Chase: subtract them.'))}</Label>
        </NarrowFigure>
    )
}

/* ---------- 15. Two taps ---------- */

export function TapsFigure({ language }: { language: UnitLanguage }) {
    const x = 70
    const width = 560
    const cell = width / 35
    const bar = (y: number, a: number, b: number) => (
        <g>
            <rect x={x} y={y} width={width} height={34} fill={PAPER} stroke={INK} strokeWidth={2} />
            <rect x={x} y={y} width={a * cell} height={34} fill={STAGE} fillOpacity={0.4} stroke={INK} strokeWidth={1.4} />
            {b > 0 && <rect x={x + a * cell} y={y} width={b * cell} height={34} fill={GREEN} fillOpacity={0.45} stroke={INK} strokeWidth={1.4} />}
        </g>
    )
    return (
        <Figure height={320} label={pick(language, say('A 5 h-tan, B 7 h-tan: orduko 1/5 + 1/7 = 12/35; biak batera 35/12 h = 2 h 55 min', 'A en 5 h, B en 7 h: por hora 1/5 + 1/7 = 12/35; juntos 35/12 h = 2 h 55 min', 'أ في 5 س، ب في 7 س: في الساعة 1/5 + 1/7 = 12/35؛ معًا 35/12 س = 2 س 55 د', 'A in 5 h, B in 7 h: per hour 1/5 + 1/7 = 12/35; together 35/12 h = 2 h 55 min'))}>
            {bar(30, 7, 0)}
            <text x={x + width + 12} y={54} fontSize={17} fontWeight={700} fill={STAGE}>A</text>
            <Frac x={x + 7 * cell + 40} y={46} n="1" d="5" size={15} color={STAGE} />
            {bar(90, 0, 5)}
            <rect x={x} y={90} width={5 * cell} height={34} fill={GREEN} fillOpacity={0.45} stroke={INK} strokeWidth={1.4} />
            <text x={x + width + 12} y={114} fontSize={17} fontWeight={700} fill={GREEN}>B</text>
            <Frac x={x + 5 * cell + 40} y={106} n="1" d="7" size={15} color={GREEN} />
            {bar(150, 7, 5)}
            <text x={x + width + 12} y={174} fontSize={17} fontWeight={700} fill={INK}>A + B</text>
            <Frac x={x + 12 * cell + 44} y={166} n="12" d="35" size={15} color={INK} />
            <Label x={360} y={214} textAnchor="middle" fontSize={15} fontWeight={700} fill={MUTED}>{pick(language, say('Ordu batean betetzen den zatia', 'Parte que se llena en una hora', 'الجزء الذي يمتلئ في ساعة', 'Fraction filled in one hour'))}</Label>
            <text x={360} y={252} textAnchor="middle" fontSize={20} fontWeight={700} fill={STAGE}>{num(language, '1/5 + 1/7 = 12/35  →  35/12 h = 2 h 55 min')}</text>
            <Caption y={300} language={language} text={say('Ordu bateko zatiak batzen dira, ez orduak', 'Se suman las partes de cada hora, no las horas', 'نجمع أجزاء الساعة لا الساعات', 'Add the parts filled each hour, not the hours')} />
        </Figure>
    )
}

/* ---------- Hero art: the compound interest formula, a mixture and two cars ---------- */

export function ProportionDbh4ApHeroArt() {
    return (
        <div className="fraction-v2-collage" aria-hidden="true">
            <svg viewBox="0 0 520 400" direction="ltr" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                <g transform="translate(30 36) rotate(-4)">
                    <rect width={260} height={110} rx={16} fill={PAPER} stroke={INK} strokeWidth={2} />
                    <text x={130} y={68} textAnchor="middle" fontSize={28} fontWeight={700} fill={INK} fontFamily="Fraunces, serif">C·(1 + r/100)ᵗ</text>
                </g>
                <g transform="translate(316 50) rotate(5)">
                    <rect width={170} height={120} rx={16} fill="#d6eddf" stroke={INK} strokeWidth={2} />
                    {[0, 1, 2, 3].map((year) => <rect key={year} x={22 + year * 34} y={96 - [30, 40, 52, 66][year]} width={26} height={[30, 40, 52, 66][year]} fill="#267b53" fillOpacity={0.45} stroke={INK} strokeWidth={1.6} />)}
                </g>
                <g transform="translate(40 200) rotate(2)">
                    <rect width={200} height={120} rx={16} fill="#fbebc0" stroke={INK} strokeWidth={2} />
                    <path d="M40 30 h50 l-8 70 h-34 z" fill="#8a5a33" fillOpacity={0.55} stroke={INK} strokeWidth={2} />
                    <path d="M110 30 h50 l-8 70 h-34 z" fill="#c4a27a" fillOpacity={0.6} stroke={INK} strokeWidth={2} />
                </g>
                <g transform="translate(270 240) rotate(-3)">
                    <rect width={220} height={110} rx={16} fill="#e8e0f7" stroke={INK} strokeWidth={2} />
                    <line x1={20} x2={200} y1={74} y2={74} stroke={INK} strokeWidth={2} />
                    <g transform="translate(50 64)"><rect x={-22} y={-14} width={44} height={18} rx={5} fill="#2f6fdb" stroke={INK} strokeWidth={1.4} /><circle cx={-12} cy={6} r={5} fill={INK} /><circle cx={12} cy={6} r={5} fill={INK} /></g>
                    <g transform="translate(170 64) scale(-1 1)"><rect x={-22} y={-14} width={44} height={18} rx={5} fill="#c4432a" stroke={INK} strokeWidth={1.4} /><circle cx={-12} cy={6} r={5} fill={INK} /><circle cx={12} cy={6} r={5} fill={INK} /></g>
                    <text x={110} y={36} textAnchor="middle" fontSize={20} fontWeight={700} fill={INK}>→ ←</text>
                </g>
            </svg>
        </div>
    )
}
