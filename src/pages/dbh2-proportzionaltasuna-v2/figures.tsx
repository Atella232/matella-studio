import { pickText, type LocalizedText, type UnitLanguage } from '../../features/unit-v2/types'
import { Figure, Frac } from '../dbh2-zatikiak-prototype/figures'
import { Label } from '../dbh2-funtzioak-v2/plane'
import { Caption, Steps } from '../dbh1-proportzionaltasuna-v2/figures'

/* ==========================================================================
   Proportzionaltasuna eta ehunekoak · 2. DBH — lesson figures in the
   notebook style: compound tables with their direct/inverse arrows, the
   step-by-step reduction, shares drawn as bars of equal parts, percentages
   as decimals, the index of change, chained indices and the interest piling
   up year by year. The review stage reuses the first-year figures. Numbers
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

const say = (eu: string, es: string, ar: string): LocalizedText => ({ eu, es, ar })
const pick = (language: UnitLanguage, text: LocalizedText) => pickText(language, text)
/** A number written with the comma, shown with the point in Arabic */
const num = (language: UnitLanguage, text: string) => (language === 'ar' ? text.replace(/,/g, '.') : text)
/** A percentage as each language writes it */
const pct = (language: UnitLanguage, value: string) => (language === 'eu' ? `% ${num(language, value)}` : language === 'ar' ? `${num(language, value)}٪` : `${value} %`)

/* ---------- Compound tables ---------- */

interface Column {
    head: LocalizedText
    old: string
    next: string
    /** How this magnitude relates to the unknown; the unknown's own column has none */
    kind?: 'direct' | 'inverse'
}

/** Three columns, two rows; arrows under each known column say direct (same way) or inverse (opposite way) */
function CompoundTable({ language, columns }: { language: UnitLanguage; columns: Column[] }) {
    const x0 = 60
    const cell = 150
    return (
        <g>
            {columns.map((column, index) => {
                const x = x0 + index * (cell + 30)
                const unknown = !column.kind
                const color = column.kind === 'inverse' ? SECOND : STAGE
                return (
                    <g key={index}>
                        <rect x={x} y={20} width={cell} height={40} fill={unknown ? SOFT : STAGE_TINT} stroke={INK} strokeWidth={1.6} />
                        <Label x={x + cell / 2} y={46} textAnchor="middle" fontSize={15} fontWeight={700} fill={INK}>{pick(language, column.head)}</Label>
                        {[column.old, column.next].map((value, row) => (
                            <g key={row}>
                                <rect x={x} y={60 + row * 46} width={cell} height={46} fill={PAPER} stroke={INK} strokeWidth={1.6} />
                                <text x={x + cell / 2} y={91 + row * 46} textAnchor="middle" fontSize={21} fontWeight={700} fill={value === 'x' ? SECOND : INK}>{num(language, value)}</text>
                            </g>
                        ))}
                        {column.kind && (
                            <g>
                                <path d={column.kind === 'direct' ? `M${x + cell / 2 - 10} 162 l0 30 m-6 -8 l6 8 l6 -8` : `M${x + cell / 2 - 10} 192 l0 -30 m-6 8 l6 -8 l6 8`} fill="none" stroke={color} strokeWidth={2.4} />
                                <Label x={x + cell / 2 + 6} y={184} fontSize={14} fontWeight={700} fill={color}>{pick(language, column.kind === 'direct' ? say('zuzena', 'directa', 'طردي') : say('alderantzizkoa', 'inversa', 'عكسي'))}</Label>
                            </g>
                        )}
                        {unknown && <path d={`M${x + cell / 2 - 10} 162 l0 30 m-6 -8 l6 8 l6 -8`} fill="none" stroke={INK} strokeWidth={2.4} />}
                    </g>
                )
            })}
        </g>
    )
}

/* ---------- 4. Two direct relations ---------- */

export function CompoundDirectFigure({ language }: { language: UnitLanguage }) {
    return (
        <Figure height={300} label={pick(language, say('Igeltseroak: egunean 10 h, 18 egun, 600 m²; egunean 8 h, 15 egun, x', 'Albañiles: 10 h/día, 18 días, 600 m²; 8 h/día, 15 días, x', 'البنّاؤون: 10 س يوميًا، 18 يومًا، 600 م²؛ 8 س يوميًا، 15 يومًا، x'))}>
            <CompoundTable language={language} columns={[
                { head: say('h/egun', 'h/día', 'س/يوم'), old: '10', next: '8', kind: 'direct' },
                { head: say('Egunak', 'Días', 'الأيام'), old: '18', next: '15', kind: 'direct' },
                { head: say('m²', 'm²', 'م²'), old: '600', next: 'x' }
            ]} />
            <text x={360} y={238} textAnchor="middle" fontSize={22} fontWeight={700} fill={STAGE}>x = 600 · 8/10 · 15/18 = 400</text>
            <Caption y={284} language={language} text={say('Bi geziak ezezagunaren norabide berean: biak zuzenak', 'Las dos flechas van como la de la incógnita: las dos directas', 'السهمان في اتجاه سهم المجهول: كلاهما طردي')} />
        </Figure>
    )
}

/* ---------- 5. Direct and inverse ---------- */

export function CompoundMixedFigure({ language }: { language: UnitLanguage }) {
    return (
        <Figure height={300} label={pick(language, say('Pentsua 294 kg, 15 behi, 7 egun; 840 kg, 10 behi, x egun', 'Pienso 294 kg, 15 vacas, 7 días; 840 kg, 10 vacas, x días', 'العلف 294 كغ، 15 بقرة، 7 أيام؛ 840 كغ، 10 أبقار، x يوم'))}>
            <CompoundTable language={language} columns={[
                { head: say('Pentsua (kg)', 'Pienso (kg)', 'العلف (كغ)'), old: '294', next: '840', kind: 'direct' },
                { head: say('Behiak', 'Vacas', 'الأبقار'), old: '15', next: '10', kind: 'inverse' },
                { head: say('Egunak', 'Días', 'الأيام'), old: '7', next: 'x' }
            ]} />
            <text x={360} y={238} textAnchor="middle" fontSize={22} fontWeight={700} fill={STAGE}>x = 7 · 840/294 · 15/10 = 30</text>
            <Caption y={284} language={language} text={say('Alderantzizkoaren zatikia buruz behera: zaharra/berria', 'La fracción de la inversa, al revés: viejo/nuevo', 'كسر العلاقة العكسية مقلوب: القديم/الجديد')} />
        </Figure>
    )
}

/* ---------- 6. One magnitude at a time ---------- */

export function CompoundUnitFigure({ language }: { language: UnitLanguage }) {
    return (
        <Figure height={302} label={pick(language, say('6 lagun 4 egun 72 €; 1 lagun 4 egun 12 €; 1 lagun 1 egun 3 €; 9 lagun 5 egun 135 €', '6 amigos 4 días 72 €; 1 amigo 4 días 12 €; 1 amigo 1 día 3 €; 9 amigos 5 días 135 €', '6 أصدقاء 4 أيام 72 €؛ صديق 4 أيام 12 €؛ صديق يوم 3 €؛ 9 أصدقاء 5 أيام 135 €'))}>
            <Label x={240} y={18} textAnchor="middle" fontSize={14} fontWeight={700} fill={MUTED}>{pick(language, say('lagunak · egunak', 'amigos · días', 'الأصدقاء · الأيام'))}</Label>
            <text x={480} y={18} textAnchor="middle" fontSize={14} fontWeight={700} fill={MUTED}>€</text>
            <g transform="translate(0 16) scale(1 0.92)">
                <Steps language={language} rows={[['6 · 4', '72 €'], ['1 · 4', '12 €'], ['1 · 1', '3 €'], ['9 · 5', '135 €']]} operations={[': 6', ': 4', '· 45']} colors={[STAGE, STAGE, SECOND]} />
            </g>
            <Caption y={290} language={language} text={say('Magnitude bat aldi berean: lehenik lagun bat, gero egun bat, gero eskatutakoa', 'Una magnitud cada vez: primero un amigo, luego un día, luego lo pedido', 'مقدار واحد في كل مرة: صديق واحد ثم يوم واحد ثم المطلوب')} />
        </Figure>
    )
}

/* ---------- Share bars ---------- */

/** A bar of `total` equal cells, grouped by owner; each group shows its amount */
function ShareBar({ y, counts, unit, colors, labels, language }: { y: number; counts: number[]; unit: string; colors: string[]; labels: string[]; language: UnitLanguage }) {
    const total = counts.reduce((sum, count) => sum + count, 0)
    const width = 600 / total
    // Cells before each group
    const starts = counts.map((_, group) => counts.slice(0, group).reduce((sum, count) => sum + count, 0))
    return (
        <g>
            {counts.map((count, group) => {
                const x = 60 + starts[group] * width
                return (
                    <g key={group}>
                        {Array.from({ length: count }, (_, index) => <rect key={index} x={x + index * width} y={y} width={width} height={40} fill={colors[group]} fillOpacity={0.35} stroke={INK} strokeWidth={1} />)}
                        <rect x={x} y={y} width={count * width} height={40} fill="none" stroke={INK} strokeWidth={2.4} />
                        <text x={x + (count * width) / 2} y={y + 64} textAnchor="middle" fontSize={18} fontWeight={700} fill={INK}>{num(language, labels[group])}</text>
                    </g>
                )
            })}
            <text x={660} y={y - 8} textAnchor="end" fontSize={14} fontWeight={700} fill={MUTED}>{num(language, unit)}</text>
        </g>
    )
}

/* ---------- 7. A direct share ---------- */

export function DirectShareFigure({ language }: { language: UnitLanguage }) {
    return (
        <Figure height={250} label={pick(language, say('180 banatuta 2, 5 eta 8rekiko: 24, 60 eta 96', '180 repartido en proporción a 2, 5 y 8: 24, 60 y 96', 'توزيع 180 طرديًا على 2 و5 و8: 24 و60 و96'))}>
            {[[2, 60 + 40 * 1], [5, 60 + 40 * 4.5], [8, 60 + 40 * 11]].map(([count, x]) => <text key={count} x={x} y={36} textAnchor="middle" fontSize={17} fontWeight={700} fill={STAGE}>{count}</text>)}
            <ShareBar y={50} counts={[2, 5, 8]} unit="15 · 12 = 180" colors={['#2f6fdb', '#c4432a', '#267b53']} labels={['24', '60', '96']} language={language} />
            <text x={360} y={176} textAnchor="middle" fontSize={21} fontWeight={700} fill={STAGE}>{num(language, '180 : (2 + 5 + 8) = 180 : 15 = 12')}</text>
            <Caption y={226} language={language} text={say('Zati bakoitzak 12 balio du; bakoitzak bere zati kopurua hartzen du', 'Cada parte vale 12; cada uno se lleva su número de partes', 'كل جزء يساوي 12؛ يأخذ كلٌّ عدد أجزائه')} />
        </Figure>
    )
}

/* ---------- 8. Shares by days ---------- */

export function ShareDaysFigure({ language }: { language: UnitLanguage }) {
    return (
        <Figure height={250} label={pick(language, say('Apartamentua 20 egun 1200 €: 7, 6 eta 7 egun → 420, 360 eta 420 €', 'Apartamento 20 días 1200 €: 7, 6 y 7 días → 420, 360 y 420 €', 'شقة 20 يومًا 1200 €: 7 و6 و7 أيام ← 420 و360 و420 €'))}>
            <ShareBar y={50} counts={[7, 6, 7]} unit="20 · 60 € = 1200 €" colors={['#2f6fdb', '#c4432a', '#267b53']} labels={['420 €', '360 €', '420 €']} language={language} />
            <text x={360} y={176} textAnchor="middle" fontSize={21} fontWeight={700} fill={STAGE}>{num(language, '1200 : 20 = 60 €')}</text>
            <Caption y={226} language={language} text={say('Lauki bakoitza egun bat da: egun bakoitzak 60 €', 'Cada cuadro es un día: cada día, 60 €', 'كل مربع يوم: كل يوم 60 €')} />
        </Figure>
    )
}

/* ---------- 9. An inverse share ---------- */

export function InverseShareFigure({ language }: { language: UnitLanguage }) {
    const places = [
        { place: '1.', share: 6, amount: '12 000 €', color: '#c9a227' },
        { place: '2.', share: 3, amount: '6000 €', color: '#9aa3ad' },
        { place: '3.', share: 2, amount: '4000 €', color: '#b5713b' }
    ]
    return (
        <Figure height={280} label={pick(language, say('22 000 € postuarekiko alderantziz: 12 000, 6000 eta 4000 €', '22 000 € inversamente al puesto: 12 000, 6000 y 4000 €', '22000 € عكسيًا مع الترتيب: 12000 و6000 و4000 €'))}>
            {places.map((item, index) => {
                const x = 90 + index * 150
                const height = item.share * 26
                return (
                    <g key={item.place}>
                        <rect x={x} y={190 - height} width={110} height={height} fill={item.color} fillOpacity={0.45} stroke={INK} strokeWidth={2} />
                        {Array.from({ length: item.share - 1 }, (_, line) => <line key={line} x1={x} x2={x + 110} y1={190 - (line + 1) * 26} y2={190 - (line + 1) * 26} stroke={INK} strokeWidth={0.8} />)}
                        <text x={x + 55} y={182 - height} textAnchor="middle" fontSize={16} fontWeight={700} fill={INK}>{item.amount}</text>
                        <text x={x + 55} y={214} textAnchor="middle" fontSize={18} fontWeight={700} fill={INK}>{item.place}</text>
                        <text x={x + 55} y={238} textAnchor="middle" fontSize={15} fontWeight={700} fill={STAGE}>{index === 0 ? '1/1 = 6/6' : index === 1 ? '1/2 = 3/6' : '1/3 = 2/6'}</text>
                    </g>
                )
            })}
            <text x={600} y={100} textAnchor="middle" fontSize={18} fontWeight={700} fill={STAGE}>6 + 3 + 2 = 11</text>
            <text x={600} y={130} textAnchor="middle" fontSize={18} fontWeight={700} fill={STAGE}>22 000 : 11 = 2000</text>
            <Caption y={270} language={language} text={say('Postu handiagoa, zati txikiagoa: alderantzizkoekiko zuzenki', 'Puesto mayor, parte menor: directamente a los inversos', 'ترتيب أكبر، جزء أصغر: طرديًا على المقلوبات')} />
        </Figure>
    )
}

/* ---------- 10. Percentages as decimals ---------- */

export function PercentFormsFigure({ language }: { language: UnitLanguage }) {
    const pairs: Array<[string, string]> = [['35', '0,35'], ['8', '0,08'], ['2,5', '0,025'], ['100', '1'], ['120', '1,2'], ['150', '1,5']]
    return (
        <Figure height={260} label={pick(language, say('Ehunekoak hamartar gisa', 'Porcentajes como decimales', 'النسب المئوية أعدادًا عشرية'))}>
            {pairs.map(([percent, decimal], index) => {
                const x = 40 + index * 108
                const over = index >= 4
                return (
                    <g key={percent}>
                        <rect x={x} y={30} width={96} height={50} rx={8} fill={over ? SOFT : STAGE_TINT} stroke={INK} strokeWidth={1.6} />
                        <text x={x + 48} y={62} textAnchor="middle" fontSize={19} fontWeight={700} fill={INK}>{pct(language, percent)}</text>
                        <text x={x + 48} y={108} textAnchor="middle" fontSize={20} fill={MUTED}>↓</text>
                        <rect x={x} y={120} width={96} height={50} rx={8} fill={PAPER} stroke={INK} strokeWidth={1.6} />
                        <text x={x + 48} y={152} textAnchor="middle" fontSize={20} fontWeight={700} fill={over ? SECOND : STAGE}>{num(language, decimal)}</text>
                    </g>
                )
            })}
            <text x={220} y={208} textAnchor="middle" fontSize={20} fontWeight={700} fill={STAGE}>{num(language, '750 · 0,12 = 90')}</text>
            <text x={500} y={208} textAnchor="middle" fontSize={20} fontWeight={700} fill={SECOND}>{num(language, '40 · 1,5 = 60')}</text>
            <Caption y={246} language={language} text={say('Zatitu 100ez; % 100etik gora, 1 baino handiagoa', 'Divide entre 100; por encima del 100 %, mayor que 1', 'اقسم على مئة؛ وفوق المئة بالمئة يكون أكبر من واحد')} />
        </Figure>
    )
}

/* ---------- 11. From the part to the whole ---------- */

export function PercentTotalFigure({ language }: { language: UnitLanguage }) {
    const x = 70
    const width = 560
    return (
        <Figure height={250} label={pick(language, say('% 12 = 42 → % 100 = 350', '12 % = 42 → 100 % = 350', '12٪ = 42 ← 100٪ = 350'))}>
            <rect x={x} y={50} width={width} height={44} fill={PAPER} stroke={INK} strokeWidth={2} />
            <rect x={x} y={50} width={width * 0.12} height={44} fill={STAGE} fillOpacity={0.4} stroke={INK} strokeWidth={2} />
            <text x={x + width * 0.06} y={78} textAnchor="middle" fontSize={18} fontWeight={700} fill={INK}>42</text>
            <text x={x + width * 0.56} y={78} textAnchor="middle" fontSize={20} fontWeight={700} fill={SECOND}>x = ?</text>
            <text x={x + width * 0.12} y={122} textAnchor="middle" fontSize={16} fontWeight={700} fill={STAGE}>{pct(language, '12')}</text>
            <text x={x + width} y={122} textAnchor="middle" fontSize={16} fontWeight={700} fill={INK}>{pct(language, '100')}</text>
            <text x={360} y={172} textAnchor="middle" fontSize={22} fontWeight={700} fill={STAGE}>{num(language, 'x · 0,12 = 42  →  x = 42 : 0,12 = 350')}</text>
            <Caption y={226} language={language} text={say('Zatia zati hamartarra: osoa', 'La parte entre el decimal: el total', 'الجزء على العدد العشري: الكل')} />
        </Figure>
    )
}

/* ---------- 12. The percentage of change ---------- */

export function PercentWhichFigure({ language }: { language: UnitLanguage }) {
    const scale = 560 / 2800
    return (
        <Figure height={260} label={pick(language, say('2500 → 2800: % 112, % 12 igo da', '2500 → 2800: el 112 %, sube un 12 %', '2500 ← 2800: 112٪، ارتفع 12٪'))}>
            <rect x={70} y={40} width={2500 * scale} height={38} fill={STAGE} fillOpacity={0.3} stroke={INK} strokeWidth={2} />
            <text x={70 + 1250 * scale} y={66} textAnchor="middle" fontSize={18} fontWeight={700} fill={INK}>{`2500 · ${pct(language, '100')}`}</text>
            <rect x={70} y={100} width={2500 * scale} height={38} fill={STAGE} fillOpacity={0.3} stroke={INK} strokeWidth={2} />
            <rect x={70 + 2500 * scale} y={100} width={300 * scale} height={38} fill={SECOND} fillOpacity={0.4} stroke={INK} strokeWidth={2} />
            <text x={70 + 1250 * scale} y={126} textAnchor="middle" fontSize={18} fontWeight={700} fill={INK}>2800</text>
            <text x={70 + 2650 * scale} y={160} textAnchor="middle" fontSize={16} fontWeight={700} fill={SECOND}>+300</text>
            <text x={200} y={200} textAnchor="middle" fontSize={20} fontWeight={700} fill={STAGE}>2800 : 2500 · 100 = 112</text>
            <text x={530} y={200} textAnchor="middle" fontSize={20} fontWeight={700} fill={SECOND}>300 : 2500 · 100 = 12</text>
            <Caption y={244} language={language} text={say('Aldaketa hasierako kantitatearekiko neurtzen da', 'El cambio se mide respecto de la cantidad inicial', 'يُقاس التغيّر بالنسبة إلى الكمية الأصلية')} />
        </Figure>
    )
}

/* ---------- 13. The index of change ---------- */

function Arrow({ x1, x2, y, label, color, back = false }: { x1: number; x2: number; y: number; label: string; color: string; back?: boolean }) {
    const [from, to] = back ? [x2, x1] : [x1, x2]
    const direction = to > from ? 1 : -1
    return (
        <g>
            <line x1={from} y1={y} x2={to - direction * 8} y2={y} stroke={color} strokeWidth={2.4} />
            <path d={`M${to} ${y} l${-direction * 10} -6 l0 12 z`} fill={color} />
            <text x={(x1 + x2) / 2} y={y - 10} textAnchor="middle" fontSize={17} fontWeight={700} fill={color}>{label}</text>
        </g>
    )
}

function Box({ x, y, text, color = INK, fill = PAPER }: { x: number; y: number; text: string; color?: string; fill?: string }) {
    return (
        <g>
            <rect x={x - 70} y={y - 26} width={140} height={46} rx={10} fill={fill} stroke={INK} strokeWidth={1.8} />
            <text x={x} y={y + 5} textAnchor="middle" fontSize={20} fontWeight={700} fill={color}>{text}</text>
        </g>
    )
}

export function IndexFigure({ language }: { language: UnitLanguage }) {
    return (
        <Figure height={270} label={pick(language, say('Igoera: · 1,12; beherapena: · 0,85; atzera: zatitu', 'Subida: · 1,12; rebaja: · 0,85; hacia atrás: divide', 'زيادة: · 1.12؛ تخفيض: · 0.85؛ للرجوع: اقسم'))}>
            <Box x={110} y={60} text="2500" fill={STAGE_TINT} />
            <Box x={560} y={60} text="2800" />
            <Arrow x1={190} x2={480} y={48} label={`· ${num(language, '1,12')}  (+${pct(language, '12')})`} color={GREEN} />
            <Arrow x1={190} x2={480} y={92} label={`: ${num(language, '1,12')}`} color={MUTED} back />
            <Box x={110} y={170} text="43 €" fill={STAGE_TINT} />
            <Box x={560} y={170} text={num(language, '36,55 €')} />
            <Arrow x1={190} x2={480} y={158} label={`· ${num(language, '0,85')}  (−${pct(language, '15')})`} color={SECOND} />
            <Arrow x1={190} x2={480} y={202} label={`: ${num(language, '0,85')}`} color={MUTED} back />
            <Caption y={258} language={language} text={say('Aurrera biderkatu indizeaz; atzera, zatitu', 'Hacia delante, multiplica por el índice; hacia atrás, divide', 'إلى الأمام اضرب في المؤشر؛ وإلى الخلف اقسم')} />
        </Figure>
    )
}

/* ---------- 14. Chained percentages ---------- */

export function ChainedFigure({ language }: { language: UnitLanguage }) {
    return (
        <Figure height={270} label={pick(language, say('100 → % 10 igo → 110 → % 10 jaitsi → 99', '100 → sube 10 % → 110 → baja 10 % → 99', '100 ← زيادة 10٪ ← 110 ← تخفيض 10٪ ← 99'))}>
            <Box x={90} y={70} text="100" fill={STAGE_TINT} />
            <Arrow x1={165} x2={285} y={58} label={`· ${num(language, '1,1')}`} color={GREEN} />
            <Box x={360} y={70} text="110" />
            <Arrow x1={435} x2={555} y={58} label={`· ${num(language, '0,9')}`} color={SECOND} />
            <Box x={630} y={70} text="99" fill={SOFT} color={SECOND} />
            <path d="M90 104 q 270 70 540 0" fill="none" stroke={STAGE} strokeWidth={2.2} strokeDasharray="7 5" />
            <text x={360} y={162} textAnchor="middle" fontSize={20} fontWeight={700} fill={STAGE}>{`· ${num(language, '0,99')}`}</text>
            <text x={360} y={212} textAnchor="middle" fontSize={21} fontWeight={700} fill={INK}>{num(language, '1,1 · 0,9 = 0,99')}</text>
            <Caption y={256} language={language} text={say('Ez da hasierara itzultzen: % 1 galtzen da', 'No se vuelve al principio: se pierde un 1 %', 'لا نعود إلى البداية: نخسر واحدًا بالمئة')} />
        </Figure>
    )
}

/* ---------- 15. Simple interest ---------- */

export function InterestFigure({ language }: { language: UnitLanguage }) {
    const capitalWidth = 400
    const yearWidth = capitalWidth * 0.05
    return (
        <Figure height={270} label={pick(language, say('8000 € % 5ean 3 urtez: urtero 400 €, guztira 1200 €', '8000 € al 5 % durante 3 años: 400 € cada año, 1200 € en total', '8000 € بفائدة 5٪ مدة 3 سنوات: 400 € كل سنة، 1200 € إجمالًا'))}>
            {[0, 1, 2, 3].map((year) => (
                <g key={year}>
                    <text x={56} y={58 + year * 44} textAnchor="end" fontSize={15} fontWeight={700} fill={MUTED}>{year}</text>
                    <rect x={66} y={36 + year * 44} width={capitalWidth} height={32} fill={STAGE} fillOpacity={0.25} stroke={INK} strokeWidth={1.4} />
                    {year === 0 && <text x={66 + capitalWidth / 2} y={58} textAnchor="middle" fontSize={16} fontWeight={700} fill={INK}>8000 €</text>}
                    {Array.from({ length: year }, (_, block) => <rect key={block} x={66 + capitalWidth + block * yearWidth} y={36 + year * 44} width={yearWidth} height={32} fill={GREEN} fillOpacity={0.45} stroke={INK} strokeWidth={1.4} />)}
                    {year > 0 && <text x={78 + capitalWidth + year * yearWidth} y={58 + year * 44} fontSize={15} fontWeight={700} fill={GREEN}>{`+${400 * year} €`}</text>}
                </g>
            ))}
            <Frac x={470} y={226} n="8000 · 5 · 3" d="100" size={18} />
            <text x={570} y={232} fontSize={20} fontWeight={700} fill={STAGE}>= 1200 €</text>
            <Label x={220} y={232} textAnchor="middle" fontSize={15} fontWeight={700} fill={MUTED}>{pick(language, say('Urtero interes bera', 'Cada año, el mismo interés', 'كل سنة الفائدة نفسها'))}</Label>
        </Figure>
    )
}

/* ---------- Hero art: a compound table, a share bar and a chained index ---------- */

export function ProportionDbh2HeroArt() {
    return (
        <div className="fraction-v2-collage" aria-hidden="true">
            <svg viewBox="0 0 520 400" direction="ltr" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                <g transform="translate(36 34) rotate(-4)">
                    <rect width={220} height={150} rx={16} fill={PAPER} stroke={INK} strokeWidth={2} />
                    {['10', '18', '600', '8', '15', 'x'].map((value, index) => (
                        <g key={index}>
                            <rect x={20 + (index % 3) * 62} y={30 + Math.floor(index / 3) * 50} width={58} height={42} fill={index === 5 ? '#fbebc0' : '#dde7f7'} stroke={INK} strokeWidth={1.4} />
                            <text x={49 + (index % 3) * 62} y={58 + Math.floor(index / 3) * 50} textAnchor="middle" fontSize={18} fontWeight={700} fill={INK}>{value}</text>
                        </g>
                    ))}
                </g>
                <g transform="translate(290 60) rotate(4)">
                    <rect width={190} height={100} rx={16} fill="#e8e0f7" stroke={INK} strokeWidth={2} />
                    <text x={95} y={62} textAnchor="middle" fontSize={26} fontWeight={700} fill={INK} fontFamily="Fraunces, serif">I = C·r·t/100</text>
                </g>
                <g transform="translate(40 230)">
                    <rect width={440} height={70} rx={14} fill="#d6eddf" stroke={INK} strokeWidth={2} />
                    {[2, 5, 8].reduce<Array<{ x: number; count: number }>>((list, count) => [...list, { x: list.length ? list[list.length - 1].x + list[list.length - 1].count * 26 : 25, count }], []).map((group, index) => (
                        <rect key={index} x={group.x} y={16} width={group.count * 26} height={38} fill={['#2f6fdb', '#c4432a', '#267b53'][index]} fillOpacity={0.4} stroke={INK} strokeWidth={2} />
                    ))}
                </g>
                <g transform="translate(300 320) rotate(-3)">
                    <rect width={180} height={56} rx={14} fill="#fbebc0" stroke={INK} strokeWidth={2} />
                    <text x={90} y={37} textAnchor="middle" fontSize={22} fontWeight={700} fill={INK}>×11/10 ×9/10</text>
                </g>
            </svg>
        </div>
    )
}
