import type { ReactNode } from 'react'
import { pickText, type LocalizedText, type UnitLanguage } from '../../features/unit-v2/types'
import { Figure, Frac } from '../dbh2-zatikiak-prototype/figures'
import { Label } from '../dbh2-funtzioak-v2/plane'

/* ==========================================================================
   Proportzionaltasuna · 1. DBH — lesson figures in the notebook style.
   Tables of proportionality with their ×/: arrows, the rule of three, the
   hundred-square grid and the percentage bars. Numbers keep the decimal
   comma in Basque and Spanish and the point in Arabic; Arabic captions
   carry words only (Chrome ignores direction isolates inside SVG text).
   ========================================================================== */

const INK = 'var(--ink, #1d2733)'
const MUTED = 'var(--muted, #58616e)'
const STAGE = 'var(--stage, #2f6fdb)'
const STAGE_TINT = 'var(--stage-tint, #dde7f7)'
const SECOND = 'var(--second, #c4432a)'
const GREEN = 'var(--success, #267b53)'
const PAPER = '#fffcf6'

const say = (eu: string, es: string, ar: string): LocalizedText => ({ eu, es, ar })
const pick = (language: UnitLanguage, text: LocalizedText) => pickText(language, text)
/** A number written with the comma, shown with the point in Arabic */
const num = (language: UnitLanguage, text: string) => (language === 'ar' ? text.replace(/,/g, '.') : text)
/** A percentage as each language writes it */
const pct = (language: UnitLanguage, value: string) => (language === 'eu' ? `% ${num(language, value)}` : language === 'ar' ? `${num(language, value)}٪` : `${value} %`)

function Caption({ y, language, text }: { y: number; language: UnitLanguage; text: LocalizedText }) {
    return <Label x={360} y={y} textAnchor="middle" fontSize={15} fill={MUTED}>{pick(language, text)}</Label>
}

/** An arc arrow over (or under) two cells with its label */
function Hop({ x1, x2, y, label, color = STAGE, below = false, rise = 26 }: { x1: number; x2: number; y: number; label: string; color?: string; below?: boolean; rise?: number }) {
    const tip = below ? y + rise : y - rise
    return (
        <g>
            <path d={`M${x1} ${y} Q ${(x1 + x2) / 2} ${tip} ${x2} ${y}`} fill="none" stroke={color} strokeWidth={2} />
            <path d={`M${x2} ${y} l${x2 > x1 ? -9 : 9} ${below ? 2 : -2} l${x2 > x1 ? 1 : -1} ${below ? 8 : -8} z`} fill={color} />
            <text x={(x1 + x2) / 2} y={below ? tip + 14 : tip - 4} textAnchor="middle" fontSize={15} fontWeight={700} fill={color}>{label}</text>
        </g>
    )
}

/** A two-row table: a heading cell and the values; returns nothing but the drawing */
function ValueTable({ x, y, cell = 64, heads, rows, language, highlight = [] }: { x: number; y: number; cell?: number; heads: LocalizedText[]; rows: string[][]; language: UnitLanguage; highlight?: number[] }) {
    const head = 150
    return (
        <g>
            {rows.map((row, r) => (
                <g key={r}>
                    <rect x={x} y={y + r * 44} width={head} height={44} fill={STAGE_TINT} stroke={INK} strokeWidth={1.6} />
                    <Label x={x + head / 2} y={y + r * 44 + 27} textAnchor="middle" fontSize={14} fontWeight={700} fill={INK}>{pick(language, heads[r])}</Label>
                    {row.map((value, c) => (
                        <g key={c}>
                            <rect x={x + head + c * cell} y={y + r * 44} width={cell} height={44} fill={highlight.includes(c) ? '#fbebc0' : PAPER} stroke={INK} strokeWidth={1.6} />
                            <text x={x + head + c * cell + cell / 2} y={y + r * 44 + 29} textAnchor="middle" fontSize={19} fontWeight={700} fill={value === 'x' ? SECOND : INK}>{num(language, value)}</text>
                        </g>
                    ))}
                </g>
            ))}
        </g>
    )
}

/** Centre of column `c` in a ValueTable at x */
const columnX = (x: number, c: number, cell = 64) => x + 150 + c * cell + cell / 2

/* ---------- 1. What can be measured ---------- */

export function MagnitudesFigure({ language }: { language: UnitLanguage }) {
    const yes = [
        { name: say('Luzera', 'Longitud', 'الطول'), unit: 'm' },
        { name: say('Masa', 'Masa', 'الكتلة'), unit: 'kg' },
        { name: say('Edukiera', 'Capacidad', 'السعة'), unit: 'l' },
        { name: say('Prezioa', 'Precio', 'السعر'), unit: '€' },
        { name: say('Abiadura', 'Velocidad', 'السرعة'), unit: 'km/h' }
    ]
    const no = [say('Maitasuna', 'El cariño', 'المحبة'), say('Edertasuna', 'La belleza', 'الجمال'), say('Barrea', 'La risa', 'الضحك')]
    return (
        <Figure height={260} label={pick(language, say('Magnitudeak eta ez-magnitudeak', 'Magnitudes y no magnitudes', 'مقادير وغير مقادير'))}>
            <rect x={30} y={14} width={400} height={210} rx={14} fill={STAGE_TINT} stroke={INK} strokeWidth={1.8} />
            <Label x={230} y={42} textAnchor="middle" fontSize={17} fontWeight={700} fill={STAGE}>{pick(language, say('Neur daitezke: magnitudeak', 'Se pueden medir: magnitudes', 'يمكن قياسها: مقادير'))}</Label>
            {yes.map((item, index) => (
                <g key={index}>
                    <Label x={170} y={78 + index * 32} textAnchor="middle" fontSize={16} fontWeight={700} fill={INK}>{pick(language, item.name)}</Label>
                    <text x={330} y={78 + index * 32} textAnchor="middle" fontSize={16} fill={MUTED}>{item.unit}</text>
                </g>
            ))}
            <rect x={460} y={14} width={230} height={210} rx={14} fill={PAPER} stroke={MUTED} strokeWidth={1.8} strokeDasharray="6 5" />
            <Label x={575} y={42} textAnchor="middle" fontSize={17} fontWeight={700} fill={SECOND}>{pick(language, say('Ezin dira neurtu', 'No se pueden medir', 'لا يمكن قياسها'))}</Label>
            {no.map((item, index) => <Label key={index} x={575} y={90 + index * 40} textAnchor="middle" fontSize={16} fontWeight={700} fill={MUTED}>{pick(language, item)}</Label>)}
            <Caption y={250} language={language} text={say('Magnitude bakoitza bere unitateetan neurtzen da', 'Cada magnitud se mide en sus unidades', 'يُقاس كل مقدار بوحداته')} />
        </Figure>
    )
}

/* ---------- 2. Pupils and croquettes: ratios ---------- */

export function RatioFigure({ language }: { language: UnitLanguage }) {
    const x = 40
    return (
        <Figure height={250} label={pick(language, say('Ikasleak eta kroketak: arrazoia 0,5', 'Alumnos y croquetas: razón 0,5', 'التلاميذ والكروكيت: النسبة 0.5'))}>
            <ValueTable x={x} y={20} heads={[say('Ikasleak', 'Alumnos', 'التلاميذ'), say('Kroketak', 'Croquetas', 'الكروكيت')]} rows={[['1', '2', '3', '4', '5', '…'], ['2', '4', '6', '8', '10', '…']]} language={language} />
            {[0, 1, 2, 3, 4].map((c) => <Frac key={c} x={columnX(x, c)} y={160} n={c + 1} d={2 * (c + 1)} size={18} color={STAGE} />)}
            {[0, 1, 2, 3].map((c) => <text key={c} x={columnX(x, c) + 32} y={166} textAnchor="middle" fontSize={18} fontWeight={700} fill={INK}>=</text>)}
            <text x={columnX(x, 4) + 50} y={166} fontSize={20} fontWeight={700} fill={SECOND}>{`= ${num(language, '0,5')}`}</text>
            <Caption y={234} language={language} text={say('Arrazoi guztiek balio bera dute: arrazoi berdinen seriea', 'Todas las razones valen lo mismo: una serie de razones iguales', 'كل النسب تساوي القيمة نفسها: سلسلة نسب متساوية')} />
        </Figure>
    )
}

/* ---------- 3. Extremes and means ---------- */

export function ProportionFigure({ language }: { language: UnitLanguage }) {
    // Extremes in the stage colour, means in the second colour
    const term = (x: number, y: number, value: string, color: string) => (
        <g>
            <circle cx={x} cy={y - 14} r={30} fill={color} fillOpacity={0.15} stroke={color} strokeWidth={2} />
            <text x={x} y={y} textAnchor="middle" fontSize={40} fontWeight={700} fill={color}>{value}</text>
        </g>
    )
    return (
        <Figure height={250} label={pick(language, say('1/2 = 2/4: 1 · 4 = 2 · 2', '1/2 = 2/4: 1 · 4 = 2 · 2', '1/2 = 2/4: 1 · 4 = 2 · 2'))}>
            {term(250, 70, '1', STAGE)}
            <line x1={215} x2={285} y1={92} y2={92} stroke={INK} strokeWidth={3} />
            {term(250, 146, '2', SECOND)}
            <text x={360} y={104} textAnchor="middle" fontSize={44} fontWeight={700} fill={INK}>=</text>
            {term(470, 70, '2', SECOND)}
            <line x1={435} x2={505} y1={92} y2={92} stroke={INK} strokeWidth={3} />
            {term(470, 146, '4', STAGE)}
            <Label x={110} y={64} textAnchor="middle" fontSize={15} fontWeight={700} fill={STAGE}>{pick(language, say('muturrak', 'extremos', 'الطرفان'))}</Label>
            <Label x={110} y={140} textAnchor="middle" fontSize={15} fontWeight={700} fill={SECOND}>{pick(language, say('erdikoak', 'medios', 'الوسطان'))}</Label>
            <text x={250} y={210} textAnchor="middle" fontSize={22} fontWeight={700} fill={STAGE}>1 · 4 = 4</text>
            <text x={470} y={210} textAnchor="middle" fontSize={22} fontWeight={700} fill={SECOND}>2 · 2 = 4</text>
            <Caption y={242} language={language} text={say('Muturren biderkadura = erdikoen biderkadura', 'Producto de extremos = producto de medios', 'حاصل ضرب الطرفين = حاصل ضرب الوسطين')} />
        </Figure>
    )
}

/* ---------- 4. Fodder and cows: a direct table ---------- */

export function DirectTableFigure({ language }: { language: UnitLanguage }) {
    const x = 70
    const cell = 80
    return (
        <Figure height={300} label={pick(language, say('Pentsua eta behiak: zuzenki proportzionalak', 'Pienso y vacas: directamente proporcionales', 'العلف والأبقار: متناسبان طرديًا'))}>
            <Hop x1={columnX(x, 0, cell)} x2={columnX(x, 1, cell)} y={82} label="· 2" rise={22} />
            <Hop x1={columnX(x, 0, cell)} x2={columnX(x, 2, cell)} y={82} label="· 3" color={SECOND} rise={48} />
            <ValueTable x={x} y={84} cell={cell} heads={[say('Pentsua (kg)', 'Pienso (kg)', 'العلف (كغ)'), say('Behiak', 'Vacas', 'الأبقار')]} rows={[['6', '12', '18', '24', '30'], ['10', '20', '30', '40', '50']]} language={language} />
            <Hop x1={columnX(x, 0, cell)} x2={columnX(x, 1, cell)} y={174} label="· 2" below rise={22} />
            <Hop x1={columnX(x, 0, cell)} x2={columnX(x, 2, cell)} y={174} label="· 3" color={SECOND} below rise={48} />
            <text x={560} y={252} textAnchor="middle" fontSize={18} fontWeight={700} fill={STAGE}>{num(language, '6 : 10 = 12 : 20 = 0,6')}</text>
            <Caption y={290} language={language} text={say('Bat bikoiztean bestea ere bikoizten da; arrazoia beti bera', 'Al doblar una se dobla la otra; la razón siempre igual', 'إذا تضاعف أحدهما تضاعف الآخر؛ والنسبة ثابتة')} />
        </Figure>
    )
}

/* ---------- 5. Reduction to the unit ---------- */

function Steps({ language, rows, operations, colors }: { language: UnitLanguage; rows: Array<[string, string]>; operations: string[]; colors: string[] }) {
    const x = 160
    return (
        <g>
            {rows.map(([left, right], index) => (
                <g key={index}>
                    <rect x={x} y={20 + index * 66} width={160} height={46} rx={10} fill={index === 1 ? '#fbebc0' : PAPER} stroke={INK} strokeWidth={1.6} />
                    <text x={x + 80} y={50 + index * 66} textAnchor="middle" fontSize={20} fontWeight={700} fill={INK}>{num(language, left)}</text>
                    <rect x={x + 240} y={20 + index * 66} width={160} height={46} rx={10} fill={index === 1 ? '#fbebc0' : PAPER} stroke={INK} strokeWidth={1.6} />
                    <text x={x + 320} y={50 + index * 66} textAnchor="middle" fontSize={20} fontWeight={700} fill={index === rows.length - 1 ? SECOND : INK}>{num(language, right)}</text>
                    <text x={x + 200} y={50 + index * 66} textAnchor="middle" fontSize={20} fill={MUTED}>→</text>
                </g>
            ))}
            {operations.map((operation, index) => (
                <g key={index}>
                    <path d={`M${x + 410} ${46 + index * 66} q 34 33 0 66`} fill="none" stroke={colors[index]} strokeWidth={2.2} />
                    <text x={x + 452} y={84 + index * 66} fontSize={17} fontWeight={700} fill={colors[index]}>{num(language, operation)}</text>
                </g>
            ))}
        </g>
    )
}

export function UnitReductionFigure({ language }: { language: UnitLanguage }) {
    return (
        <Figure height={250} label={pick(language, say('3 txokolatina 90 g, 1 30 g, 2 60 g', '3 chocolatinas 90 g, 1 30 g, 2 60 g', '3 قطع 90 غ، قطعة 30 غ، قطعتان 60 غ'))}>
            <Steps language={language} rows={[['3', '90 g'], ['1', '30 g'], ['2', '60 g']]} operations={[': 3', '· 2']} colors={[STAGE, SECOND]} />
            <Caption y={238} language={language} text={say('Lehenik bat (zatitu), gero nahi direnak (biderkatu)', 'Primero una (divide), luego las que quieras (multiplica)', 'أولًا الواحدة (اقسم) ثم ما تريد (اضرب)')} />
        </Figure>
    )
}

/* ---------- 6. The direct rule of three ---------- */

export function RuleOfThreeFigure({ language }: { language: UnitLanguage }) {
    return (
        <Figure height={260} label={pick(language, say('3 errotulagailu 6 €; 7 errotulagailu x €', '3 rotuladores 6 €; 7 rotuladores x €', '3 أقلام 6 €؛ 7 أقلام x €'))}>
            <Label x={200} y={32} textAnchor="middle" fontSize={16} fontWeight={700} fill={STAGE}>{pick(language, say('Errotulagailuak', 'Rotuladores', 'الأقلام'))}</Label>
            <Label x={360} y={32} textAnchor="middle" fontSize={16} fontWeight={700} fill={STAGE}>€</Label>
            <text x={200} y={82} textAnchor="middle" fontSize={30} fontWeight={700} fill={INK}>3</text>
            <text x={360} y={82} textAnchor="middle" fontSize={30} fontWeight={700} fill={INK}>6</text>
            <text x={200} y={146} textAnchor="middle" fontSize={30} fontWeight={700} fill={INK}>7</text>
            <text x={360} y={146} textAnchor="middle" fontSize={30} fontWeight={700} fill={SECOND}>x</text>
            <path d="M230 72 L330 136" stroke={STAGE} strokeWidth={2.4} strokeDasharray="6 5" />
            <path d="M230 136 L330 72" stroke={STAGE} strokeWidth={2.4} strokeDasharray="6 5" />
            <text x={560} y={76} textAnchor="middle" fontSize={22} fontWeight={700} fill={INK}>3 · x = 7 · 6</text>
            <text x={560} y={120} textAnchor="middle" fontSize={22} fontWeight={700} fill={INK}>3 · x = 42</text>
            <text x={560} y={164} textAnchor="middle" fontSize={24} fontWeight={700} fill={SECOND}>x = 42 : 3 = 14</text>
            <Label x={280} y={200} textAnchor="middle" fontSize={15} fontWeight={700} fill={GREEN}>{pick(language, say('gehiago → gehiago: zuzena', 'más → más: directa', 'أكثر ← أكثر: طردي'))}</Label>
            <Caption y={246} language={language} text={say('Arrazoiak berdinak: gurutzeko biderkadurak berdindu', 'Razones iguales: se igualan los productos cruzados', 'نسبتان متساويتان: نساوي حاصلي الضرب التبادلي')} />
        </Figure>
    )
}

/* ---------- 7. The tap and the barrel: an inverse table ---------- */

export function InverseTableFigure({ language }: { language: UnitLanguage }) {
    const x = 90
    const cell = 90
    return (
        <Figure height={300} label={pick(language, say('Emaria eta denbora: alderantziz proportzionalak', 'Caudal y tiempo: inversamente proporcionales', 'التدفق والزمن: متناسبان عكسيًا'))}>
            <Hop x1={columnX(x, 0, cell)} x2={columnX(x, 1, cell)} y={82} label="· 2" rise={22} />
            <Hop x1={columnX(x, 0, cell)} x2={columnX(x, 2, cell)} y={82} label="· 3" rise={48} />
            <ValueTable x={x} y={84} cell={cell} heads={[say('Emaria (l/min)', 'Caudal (l/min)', 'التدفق (ل/د)'), say('Denbora (min)', 'Tiempo (min)', 'الزمن (د)')]} rows={[['3', '6', '9', '12'], ['15', '7,5', '5', '3,75']]} language={language} />
            <Hop x1={columnX(x, 0, cell)} x2={columnX(x, 1, cell)} y={174} label=": 2" color={SECOND} below rise={22} />
            <Hop x1={columnX(x, 0, cell)} x2={columnX(x, 2, cell)} y={174} label=": 3" color={SECOND} below rise={48} />
            <text x={560} y={252} textAnchor="middle" fontSize={18} fontWeight={700} fill={STAGE}>{num(language, '3 · 15 = 6 · 7,5 = 9 · 5 = 45')}</text>
            <Caption y={290} language={language} text={say('Bat bikoiztean bestea erdia egiten da; biderkadura beti bera', 'Al doblar una la otra se hace la mitad; el producto siempre igual', 'إذا تضاعف أحدهما صار الآخر النصف؛ وحاصل الضرب ثابت')} />
        </Figure>
    )
}

/* ---------- 8. Painters: reduction to the unit, inverse ---------- */

export function InverseUnitFigure({ language }: { language: UnitLanguage }) {
    return (
        <Figure height={250} label={pick(language, say('2 margolari 9 h, 1 18 h, 3 6 h', '2 pintores 9 h, 1 18 h, 3 6 h', 'رسّامان 9 س، واحد 18 س، ثلاثة 6 س'))}>
            <Steps language={language} rows={[['2', '9 h'], ['1', '18 h'], ['3', '6 h']]} operations={['· 2', ': 3']} colors={[SECOND, STAGE]} />
            <Caption y={238} language={language} text={say('Margolari bakarrak denbora gehiago behar du (biderkatu), hiruk gutxiago (zatitu)', 'Un solo pintor tarda más (multiplica); tres, menos (divide)', 'الرسّام الواحد يحتاج وقتًا أطول (اضرب)، والثلاثة أقل (اقسم)')} />
        </Figure>
    )
}

/* ---------- 9. The inverse rule of three ---------- */

export function InverseRuleFigure({ language }: { language: UnitLanguage }) {
    return (
        <Figure height={260} label={pick(language, say('10 igeltsero 45 egun; x igeltsero 15 egun', '10 albañiles 45 días; x albañiles 15 días', '10 بنّائين 45 يومًا؛ x بنّاءً 15 يومًا'))}>
            <Label x={200} y={32} textAnchor="middle" fontSize={16} fontWeight={700} fill={STAGE}>{pick(language, say('Igeltseroak', 'Albañiles', 'البنّاؤون'))}</Label>
            <Label x={360} y={32} textAnchor="middle" fontSize={16} fontWeight={700} fill={STAGE}>{pick(language, say('Egunak', 'Días', 'الأيام'))}</Label>
            <text x={200} y={82} textAnchor="middle" fontSize={30} fontWeight={700} fill={INK}>10</text>
            <text x={360} y={82} textAnchor="middle" fontSize={30} fontWeight={700} fill={INK}>45</text>
            <text x={200} y={146} textAnchor="middle" fontSize={30} fontWeight={700} fill={SECOND}>x</text>
            <text x={360} y={146} textAnchor="middle" fontSize={30} fontWeight={700} fill={INK}>15</text>
            <path d="M226 72 L334 72" stroke={STAGE} strokeWidth={2.4} strokeDasharray="6 5" />
            <path d="M226 136 L334 136" stroke={STAGE} strokeWidth={2.4} strokeDasharray="6 5" />
            <text x={560} y={76} textAnchor="middle" fontSize={22} fontWeight={700} fill={INK}>10 · 45 = x · 15</text>
            <text x={560} y={120} textAnchor="middle" fontSize={22} fontWeight={700} fill={INK}>450 = 15 · x</text>
            <text x={560} y={164} textAnchor="middle" fontSize={24} fontWeight={700} fill={SECOND}>x = 450 : 15 = 30</text>
            <Label x={280} y={200} textAnchor="middle" fontSize={15} fontWeight={700} fill={GREEN}>{pick(language, say('egun gutxiago → igeltsero gehiago: alderantzizkoa', 'menos días → más albañiles: inversa', 'أيام أقل ← بنّاؤون أكثر: عكسي'))}</Label>
            <Caption y={246} language={language} text={say('Biderkadurak berdinak: lerro bakoitzekoa', 'Productos iguales: los de cada fila', 'حاصلا الضرب متساويان: حاصل كل سطر')} />
        </Figure>
    )
}

/* ---------- 10. 85 of every 100 ---------- */

export function PercentGridFigure({ language }: { language: UnitLanguage }) {
    const size = 170
    return (
        <Figure height={250} label={pick(language, say('% 85 = 85/100 = 0,85', '85 % = 85/100 = 0,85', '85٪ = 85/100 = 0.85'))}>
            {Array.from({ length: 100 }, (_, index) => (
                <rect key={index} x={70 + (index % 10) * (size / 10)} y={20 + Math.floor(index / 10) * (size / 10)} width={size / 10} height={size / 10} fill={index < 85 ? STAGE : PAPER} fillOpacity={index < 85 ? 0.42 : 1} stroke={INK} strokeWidth={0.8} />
            ))}
            <rect x={70} y={20} width={size} height={size} fill="none" stroke={INK} strokeWidth={2.4} />
            <text x={430} y={64} textAnchor="middle" fontSize={34} fontWeight={700} fill={STAGE}>{pct(language, '85')}</text>
            <Frac x={430} y={124} n={85} d={100} size={28} />
            <text x={430} y={196} textAnchor="middle" fontSize={30} fontWeight={700} fill={INK}>{num(language, '0,85')}</text>
            <Caption y={238} language={language} text={say('Ehun lauki, 85 koloreztatuta: 100etik 85', 'Cien cuadros, 85 coloreados: 85 de cada 100', 'مئة مربع ملوّن منها خمسة وثمانون')} />
        </Figure>
    )
}

/* ---------- Percentage bars ---------- */

/** A bar for the whole (100 %) with a coloured share, marks and labels */
function PercentBar({ y, share, color = STAGE, left, right, whole = 100 }: { y: number; share: number; color?: string; left: ReactNode; right?: ReactNode; whole?: number }) {
    const x = 90
    const width = 540 * (whole / 100)
    return (
        <g>
            <rect x={x} y={y} width={width} height={44} fill={PAPER} stroke={INK} strokeWidth={2} rx={4} />
            <rect x={x} y={y} width={width * (share / whole)} height={44} fill={color} fillOpacity={0.35} stroke={INK} strokeWidth={2} rx={4} />
            <g>{left}</g>
            {right}
        </g>
    )
}

/* ---------- 11. 15 % of 60 ---------- */

export function PercentOfFigure({ language }: { language: UnitLanguage }) {
    return (
        <Figure height={240} label={pick(language, say('60ren % 15 = 9', '15 % de 60 = 9', '15٪ من 60 = 9'))}>
            <PercentBar y={50} share={15} left={<text x={90 + 540 * 0.075} y={78} textAnchor="middle" fontSize={18} fontWeight={700} fill={INK}>9 €</text>} right={<text x={90 + 540 * 0.575} y={78} textAnchor="middle" fontSize={18} fontWeight={700} fill={MUTED}>51 €</text>} />
            <text x={90} y={36} textAnchor="middle" fontSize={15} fontWeight={700} fill={MUTED}>0</text>
            <text x={630} y={36} textAnchor="middle" fontSize={15} fontWeight={700} fill={INK}>60 €</text>
            <text x={90 + 540 * 0.15} y={122} textAnchor="middle" fontSize={16} fontWeight={700} fill={STAGE}>{pct(language, '15')}</text>
            <text x={630} y={122} textAnchor="middle" fontSize={16} fontWeight={700} fill={INK}>{pct(language, '100')}</text>
            <text x={200} y={176} textAnchor="middle" fontSize={21} fontWeight={700} fill={STAGE}>{num(language, '60 · 15 : 100 = 9')}</text>
            <text x={510} y={176} textAnchor="middle" fontSize={21} fontWeight={700} fill={STAGE}>{num(language, '60 : 100 · 15 = 0,6 · 15 = 9')}</text>
            <Caption y={226} language={language} text={say('Kantitatea bider ehunekoa, zati 100', 'La cantidad por el tanto, entre 100', 'الكمية في النسبة، على مئة')} />
        </Figure>
    )
}

/* ---------- 12. 120 of 480 is 25 % ---------- */

export function WhichPercentFigure({ language }: { language: UnitLanguage }) {
    return (
        <Figure height={250} label={pick(language, say('480tik 120 = % 25', '120 de 480 = 25 %', '120 من 480 = 25٪'))}>
            {Array.from({ length: 4 }, (_, index) => (
                <g key={index}>
                    <rect x={90 + index * 135} y={50} width={135} height={44} fill={index === 0 ? STAGE : PAPER} fillOpacity={index === 0 ? 0.35 : 1} stroke={INK} strokeWidth={2} />
                    <text x={157 + index * 135} y={78} textAnchor="middle" fontSize={18} fontWeight={700} fill={INK}>120</text>
                    <text x={157 + index * 135} y={122} textAnchor="middle" fontSize={16} fontWeight={700} fill={index === 0 ? STAGE : MUTED}>{pct(language, '25')}</text>
                </g>
            ))}
            <text x={630} y={36} textAnchor="middle" fontSize={15} fontWeight={700} fill={INK}>480</text>
            <text x={360} y={172} textAnchor="middle" fontSize={22} fontWeight={700} fill={STAGE}>{num(language, '120 : 480 = 0,25 → 0,25 · 100 = 25')}</text>
            <Caption y={226} language={language} text={say('Zatia zati osoa, bider 100: 480 ardietatik 120 laurdena dira', 'La parte entre el total, por 100: 120 de 480 ovejas son la cuarta parte', 'الجزء على الكل في مئة: مئة وعشرون من أربعمئة وثمانين هي الربع')} />
        </Figure>
    )
}

/* ---------- 13. A 15 % discount ---------- */

export function DiscountFigure({ language }: { language: UnitLanguage }) {
    return (
        <Figure height={250} label={pick(language, say('60 € − % 15 = 51 €', '60 € − 15 % = 51 €', '60 € − 15٪ = 51 €'))}>
            <PercentBar y={50} share={85} color={GREEN} left={<text x={90 + 540 * 0.425} y={78} textAnchor="middle" fontSize={18} fontWeight={700} fill={INK}>{`51 € · ${pct(language, '85')}`}</text>} right={<g><rect x={90 + 540 * 0.85} y={50} width={540 * 0.15} height={44} fill={SECOND} fillOpacity={0.3} stroke={INK} strokeWidth={2} /><text x={90 + 540 * 0.925} y={78} textAnchor="middle" fontSize={17} fontWeight={700} fill={SECOND}>− 9 €</text></g>} />
            <text x={630} y={36} textAnchor="middle" fontSize={15} fontWeight={700} fill={INK}>60 €</text>
            <text x={90 + 540 * 0.925} y={122} textAnchor="middle" fontSize={16} fontWeight={700} fill={SECOND}>{pct(language, '15')}</text>
            <text x={200} y={172} textAnchor="middle" fontSize={21} fontWeight={700} fill={STAGE}>{num(language, '60 − 9 = 51')}</text>
            <text x={510} y={172} textAnchor="middle" fontSize={21} fontWeight={700} fill={STAGE}>{num(language, '60 · 0,85 = 51')}</text>
            <Caption y={226} language={language} text={say('% 15 deskontatzen badute, % 85 ordaintzen da', 'Si descuentan el 15 %, se paga el 85 %', 'إذا خُصم خمسة عشر بالمئة دفعتَ خمسة وثمانين بالمئة')} />
        </Figure>
    )
}

/* ---------- 14. A 15 % surcharge ---------- */

export function IncreaseFigure({ language }: { language: UnitLanguage }) {
    const scale = 540 / 115
    return (
        <Figure height={250} label={pick(language, say('75 € + % 15 = 86,25 €', '75 € + 15 % = 86,25 €', '75 € + 15٪ = 86.25 €'))}>
            <rect x={90} y={50} width={100 * scale} height={44} fill={STAGE} fillOpacity={0.3} stroke={INK} strokeWidth={2} />
            <text x={90 + 50 * scale} y={78} textAnchor="middle" fontSize={18} fontWeight={700} fill={INK}>{`75 € · ${pct(language, '100')}`}</text>
            <rect x={90 + 100 * scale} y={50} width={15 * scale} height={44} fill={SECOND} fillOpacity={0.35} stroke={INK} strokeWidth={2} />
            <text x={90 + 107.5 * scale} y={78} textAnchor="middle" fontSize={15} fontWeight={700} fill={SECOND}>{num(language, '+11,25')}</text>
            <text x={90 + 107.5 * scale} y={122} textAnchor="middle" fontSize={16} fontWeight={700} fill={SECOND}>{pct(language, '15')}</text>
            <text x={630} y={36} textAnchor="middle" fontSize={15} fontWeight={700} fill={INK}>{num(language, '86,25 €')}</text>
            <text x={200} y={172} textAnchor="middle" fontSize={21} fontWeight={700} fill={STAGE}>{num(language, '75 + 11,25 = 86,25')}</text>
            <text x={510} y={172} textAnchor="middle" fontSize={21} fontWeight={700} fill={STAGE}>{num(language, '75 · 1,15 = 86,25')}</text>
            <Caption y={226} language={language} text={say('% 15 igotzean % 115 ordaintzen da', 'Al subir un 15 % se paga el 115 %', 'عند الزيادة خمسة عشر بالمئة تدفع مئة وخمسة عشر بالمئة')} />
        </Figure>
    )
}

/* ---------- 15. Which method? ---------- */

export function ChooseMethodFigure({ language }: { language: UnitLanguage }) {
    const boxes = [
        { x: 30, color: STAGE, title: say('Zuzena', 'Directa', 'طردي'), rule: say('gehiago → gehiago', 'más → más', 'أكثر ← أكثر'), how: say('zatitu, gero biderkatu', 'divide y multiplica', 'اقسم ثم اضرب'), formula: 'a/b = c/x' },
        { x: 260, color: SECOND, title: say('Alderantzizkoa', 'Inversa', 'عكسي'), rule: say('gehiago → gutxiago', 'más → menos', 'أكثر ← أقل'), how: say('biderkatu, gero zatitu', 'multiplica y divide', 'اضرب ثم اقسم'), formula: 'a · b = c · x' },
        { x: 490, color: GREEN, title: say('Ehunekoa', 'Porcentaje', 'نسبة مئوية'), rule: say('100etik zenbat', 'de cada 100', 'من كل مئة'), how: say('zatia, osoa ala aldaketa', 'parte, total o cambio', 'الجزء أو الكل أو التغيّر'), formula: 'Q · p : 100' }
    ]
    return (
        <Figure height={250} label={pick(language, say('Zuzena, alderantzizkoa ala ehunekoa', 'Directa, inversa o porcentaje', 'طردي أم عكسي أم نسبة مئوية'))}>
            {boxes.map((box) => (
                <g key={box.x}>
                    <rect x={box.x} y={20} width={200} height={180} rx={14} fill={PAPER} stroke={box.color} strokeWidth={2.4} />
                    <Label x={box.x + 100} y={52} textAnchor="middle" fontSize={19} fontWeight={700} fill={box.color}>{pick(language, box.title)}</Label>
                    <Label x={box.x + 100} y={92} textAnchor="middle" fontSize={16} fontWeight={700} fill={INK}>{pick(language, box.rule)}</Label>
                    <Label x={box.x + 100} y={128} textAnchor="middle" fontSize={14} fill={MUTED}>{pick(language, box.how)}</Label>
                    <text x={box.x + 100} y={172} textAnchor="middle" fontSize={18} fontWeight={700} fill={box.color}>{box.formula}</text>
                </g>
            ))}
            <Caption y={234} language={language} text={say('Lehenik galdetu: bat handitzean, bestea handitu ala txikitu egiten da?', 'Primero pregúntate: al crecer una, ¿la otra crece o decrece?', 'اسأل أولًا: حين يزيد أحدهما، هل يزيد الآخر أم ينقص؟')} />
        </Figure>
    )
}

/* ---------- Hero ---------- */

/** Same art in every language: no decimal commas (Arabic writes the point) */
export function ProportionHeroArt() {
    return (
        <div className="fraction-v2-collage" aria-hidden="true">
            <svg viewBox="0 0 520 400" direction="ltr" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                <g transform="translate(40 40) rotate(-4)">
                    <rect width={200} height={190} rx={16} fill={PAPER} stroke={INK} strokeWidth={2} />
                    {Array.from({ length: 100 }, (_, index) => (
                        <rect key={index} x={25 + (index % 10) * 15} y={20 + Math.floor(index / 10) * 15} width={15} height={15} fill={index < 25 ? '#2f6fdb' : PAPER} fillOpacity={index < 25 ? 0.35 : 1} stroke={INK} strokeWidth={0.6} />
                    ))}
                </g>
                <g transform="translate(280 50) rotate(4)">
                    <rect width={190} height={100} rx={16} fill="#e8e0f7" stroke={INK} strokeWidth={2} />
                    <text x={95} y={64} textAnchor="middle" fontSize={40} fontWeight={700} fill={INK} fontFamily="Fraunces, serif">%</text>
                </g>
                <g transform="translate(290 185) rotate(-3)">
                    <rect width={180} height={80} rx={16} fill="#fbebc0" stroke={INK} strokeWidth={2} />
                    <text x={90} y={52} textAnchor="middle" fontSize={26} fontWeight={700} fill={INK} fontFamily="Fraunces, serif">3/6 = 7/x</text>
                </g>
                <g transform="translate(40 290)">
                    <rect width={440} height={80} rx={16} fill="#d6eddf" stroke={INK} strokeWidth={2} />
                    {['2', '4', '6', '8'].map((value, index) => (
                        <g key={value}>
                            <rect x={30 + index * 96} y={18} width={84} height={44} rx={8} fill={PAPER} stroke={INK} strokeWidth={2} />
                            <text x={72 + index * 96} y={48} textAnchor="middle" fontSize={22} fontWeight={700} fill={INK}>{value}</text>
                        </g>
                    ))}
                </g>
            </svg>
        </div>
    )
}
