import { useId, type ReactNode } from 'react'
import { pickText, type LocalizedText, type UnitLanguage } from '../../features/unit-v2/types'
import { Figure, Frac } from '../dbh2-zatikiak-prototype/figures'
import { Label } from '../dbh2-funtzioak-v2/plane'
import { Caption, Formula } from '../dbh2-estatistika-v2/figures'
import { COLORS, INK, LINE, MUTED, PAPER, SECOND, STAGE, STAGE_TINT, num } from '../dbh2-estatistika-v2/palette'
import { Bar } from '../dbh4-akademikoak-probabilitatea/figures'
import { groupDigits } from '../../utils/numberFormat'

/* ==========================================================================
   Probabilitatea · Batxilergoa 2 · Zientziak — lesson figures. Each one
   draws the numbers of its «Let's solve»: the 12-sided die in a Venn
   diagram, the tree of two draws, choosing two of ten, a spinner cut into
   a partition, the four zones of a die, the Venn diagrams of the axioms
   and of the three data, the condition as the new total, three batteries
   in a row, the mosaic of two independent events, the gym table, the
   factory tree, prior and posterior bars, the tree of 10 000 people and a
   ball moved from one urn to another. Formulas are written left to right
   in every language; Arabic labels carry words only.
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const pick = (language: UnitLanguage, text: LocalizedText) => pickText(language, text)

const GOLD = '#e0a100'
const GREEN = '#267b53'

/** A ball: white ones are paper with an ink outline, black ones are ink */
function Ball({ x, y, r = 12, white }: { x: number; y: number; r?: number; white: boolean }) {
    return <circle cx={x} cy={y} r={r} fill={white ? PAPER : INK} stroke={INK} strokeWidth={1.6} />
}

/** A letter with a small subscript, then the rest of the line back on the baseline */
function Sub({ letter, index, rest = '' }: { letter: string; index: string; rest?: string }) {
    return (
        <>
            {letter}
            <tspan fontSize="0.7em" dy="0.3em">{index}</tspan>
            <tspan dy="-0.3em">{rest}</tspan>
        </>
    )
}

interface Circle { x: number; y: number; r: number }

/** The sample space as a box with two circles A and B; the common zone is tinted with the second colour */
function Venn({ box, a, b, children }: { box: [number, number, number, number]; a: Circle; b: Circle; children?: ReactNode }) {
    const clip = useId()
    const [x, y, width, height] = box
    return (
        <g>
            <defs>
                <clipPath id={clip}><circle cx={a.x} cy={a.y} r={a.r} /></clipPath>
            </defs>
            <rect x={x} y={y} width={width} height={height} rx={12} fill={PAPER} stroke={INK} strokeWidth={2} />
            <circle cx={a.x} cy={a.y} r={a.r} fill={STAGE_TINT} stroke={STAGE} strokeWidth={2.4} />
            <circle cx={b.x} cy={b.y} r={b.r} fill={STAGE_TINT} stroke={SECOND} strokeWidth={2.4} />
            <circle cx={b.x} cy={b.y} r={b.r} fill={SECOND} fillOpacity={0.3} clipPath={`url(#${clip})`} />
            <circle cx={a.x} cy={a.y} r={a.r} fill="none" stroke={STAGE} strokeWidth={2.4} />
            <text x={a.x - a.r * 0.78} y={a.y - a.r * 0.72} fontSize={20} fontWeight={700} fill={STAGE} textAnchor="middle">A</text>
            <text x={b.x + b.r * 0.78} y={b.y - b.r * 0.72} fontSize={20} fontWeight={700} fill={SECOND} textAnchor="middle">B</text>
            {children}
        </g>
    )
}

/** A number written in the middle of a zone */
function ZoneValue({ x, y, children, color = INK, size = 19 }: { x: number; y: number; children: ReactNode; color?: string; size?: number }) {
    return <text x={x} y={y} textAnchor="middle" fontSize={size} fontWeight={700} fill={color}>{children}</text>
}

/* ---------- 1. Events and Laplace: the 12-sided die ---------- */

export function TwelveVennFigure({ language }: { language: UnitLanguage }) {
    const spots: Array<[number, number, number]> = [
        [3, 108, 118], [6, 118, 176], [9, 220, 118], [12, 220, 176], [10, 326, 118], [11, 322, 176],
        [1, 48, 48], [2, 392, 48], [4, 48, 244], [5, 392, 244], [7, 134, 252], [8, 306, 252]
    ]
    return (
        <Figure height={300} label={pick(language, say('12 aurpegiko dadoa Venn diagrama batean', 'El dado de 12 caras en un diagrama de Venn', 'نرد بـ 12 وجهًا في مخطط فن', 'The 12-sided die in a Venn diagram'))}>
            <Venn box={[20, 20, 400, 248]} a={{ x: 162, y: 146, r: 92 }} b={{ x: 278, y: 146, r: 92 }}>
                <text x={404} y={150} fontSize={18} fontWeight={700} fill={MUTED} textAnchor="middle">E</text>
                {spots.map(([value, x, y]) => <ZoneValue key={value} x={x} y={y + 6}>{value}</ZoneValue>)}
            </Venn>
            <Formula x={572} y={60} size={16} color={STAGE}>A = {'{'}3, 6, 9, 12{'}'}</Formula>
            <Formula x={572} y={98} size={16} color={SECOND}>B = {'{'}9, 10, 11, 12{'}'}</Formula>
            <Formula x={572} y={146} size={15}>A ∪ B = {'{'}3, 6, 9, 10, 11, 12{'}'}</Formula>
            <Formula x={572} y={200} size={21} color={SECOND}>P(A ∪ B) = 6/12 = 1/2</Formula>
            <Caption y={292} language={language} text={say('Bildurak 9 eta 12 behin bakarrik zenbatzen ditu', 'La unión cuenta una sola vez el 9 y el 12', 'يحسب الاتحاد 9 و12 مرة واحدة فقط', 'The union counts 9 and 12 only once')} size={14} />
        </Figure>
    )
}

/* ---------- 2. Trees and tables: two draws without replacement ---------- */

export function TwoColourTreeFigure({ language }: { language: UnitLanguage }) {
    const firsts = [{ y: 82, white: true, n: 4 }, { y: 222, white: false, n: 2 }]
    const leaves = [
        { y: 40, parent: 0, white: true, n: 3, text: '4/6 · 3/5 = 12/30', same: true },
        { y: 124, parent: 0, white: false, n: 2, text: '4/6 · 2/5 = 8/30', same: false },
        { y: 180, parent: 1, white: true, n: 4, text: '2/6 · 4/5 = 8/30', same: false },
        { y: 264, parent: 1, white: false, n: 1, text: '2/6 · 1/5 = 2/30', same: true }
    ]
    return (
        <Figure height={330} label={pick(language, say('Bi atera itzuli gabe: zuhaitza', 'Dos extracciones sin devolver: el árbol', 'سحبتان دون إرجاع: الشجرة', 'Two draws without replacement: the tree'))}>
            <circle cx={44} cy={152} r={6} fill={INK} />
            {firsts.map((first, index) => (
                <g key={index}>
                    <line x1={50} y1={152} x2={190} y2={first.y} stroke={INK} strokeWidth={1.8} />
                    <Frac x={112} y={(152 + first.y) / 2 + (index === 0 ? -22 : 24)} n={first.n} d={6} size={15} />
                    <Ball x={206} y={first.y} r={14} white={first.white} />
                </g>
            ))}
            {leaves.map((leaf, index) => {
                const parent = firsts[leaf.parent]
                return (
                    <g key={index}>
                        <line x1={222} y1={parent.y} x2={368} y2={leaf.y} stroke={leaf.same ? SECOND : INK} strokeWidth={leaf.same ? 2.8 : 1.6} />
                        <Frac x={292} y={(parent.y + leaf.y) / 2 + (leaf.y < parent.y ? -24 : 26)} n={leaf.n} d={5} size={14} />
                        <Ball x={384} y={leaf.y} r={14} white={leaf.white} />
                        <Formula x={540} y={leaf.y + 6} size={17} color={leaf.same ? SECOND : MUTED}>{leaf.text}</Formula>
                    </g>
                )
            })}
            <Caption y={318} language={language} text={say('Kolore bera: 12/30 + 2/30 = 14/30 = 7/15', 'Mismo color: 12/30 + 2/30 = 14/30 = 7/15', 'اللون نفسه: 12/30 + 2/30 = 14/30 = 7/15', 'Same colour: 12/30 + 2/30 = 14/30 = 7/15')} size={15} color={SECOND} />
        </Figure>
    )
}

/* ---------- 3. Counting with combinations: two of ten ---------- */

export function ChooseTwoFigure({ language }: { language: UnitLanguage }) {
    const start = 108
    return (
        <Figure height={290} label={pick(language, say('10 pertsonatik 2 aukeratzea', 'Elegir 2 de 10 personas', 'اختيار 2 من 10 أشخاص', 'Choosing 2 of 10 people'))}>
            {Array.from({ length: 10 }, (_, index) => {
                const x = start + index * 56
                const girl = index < 6
                const picked = index === 1 || index === 4
                return (
                    <g key={index}>
                        <circle cx={x} cy={46} r={11} fill={girl ? STAGE_TINT : '#f6dcd3'} stroke={girl ? STAGE : SECOND} strokeWidth={2} />
                        <path d={`M ${x - 17} 86 Q ${x - 17} 62 ${x} 62 Q ${x + 17} 62 ${x + 17} 86 Z`} fill={girl ? STAGE_TINT : '#f6dcd3'} stroke={girl ? STAGE : SECOND} strokeWidth={2} />
                        {picked && <circle cx={x} cy={62} r={30} fill="none" stroke={INK} strokeWidth={2.6} strokeDasharray="5 4" />}
                    </g>
                )
            })}
            <Label x={start + 2.5 * 56} y={122} textAnchor="middle" fontSize={16} fontWeight={700} fill={STAGE}>{pick(language, say('6 neska', '6 chicas', '6 فتيات', '6 girls'))}</Label>
            <Label x={start + 7.5 * 56} y={122} textAnchor="middle" fontSize={16} fontWeight={700} fill={SECOND}>{pick(language, say('4 mutil', '4 chicos', '4 فتيان', '4 boys'))}</Label>
            <Label x={150} y={168} textAnchor="middle" fontSize={15} fontWeight={700} fill={MUTED}>{pick(language, say('Posibleak', 'Posibles', 'الممكنة', 'Possible'))}</Label>
            <Formula x={150} y={204} size={20}><Sub letter="C" index="10,2" rest=" = 45" /></Formula>
            <Label x={360} y={168} textAnchor="middle" fontSize={15} fontWeight={700} fill={MUTED}>{pick(language, say('Aldekoak', 'Favorables', 'الملائمة', 'Favourable'))}</Label>
            <Formula x={360} y={204} size={20} color={STAGE}><Sub letter="C" index="6,2" rest=" = 15" /></Formula>
            <Label x={570} y={168} textAnchor="middle" fontSize={15} fontWeight={700} fill={MUTED}>Laplace</Label>
            <Formula x={570} y={204} size={21} color={SECOND}>P = 15/45 = 1/3</Formula>
            <Caption y={262} language={language} text={say('Urratsez urrats, gauza bera: 6/10 · 5/9 = 30/90 = 1/3', 'Paso a paso, lo mismo: 6/10 · 5/9 = 30/90 = 1/3', 'خطوة خطوة النتيجة نفسها: 6/10 · 5/9 = 30/90 = 1/3', 'Step by step, the same: 6/10 · 5/9 = 30/90 = 1/3')} size={14} />
        </Figure>
    )
}

/* ---------- 4. The space of events: a spinner cut into a partition ---------- */

export function RouletteFigure({ language }: { language: UnitLanguage }) {
    const cx = 172
    const cy = 150
    const r = 116
    const fills = [STAGE_TINT, STAGE_TINT, '#f6dcd3', '#f6dcd3', '#fbebc0']
    const strokes = [STAGE, STAGE, SECOND, SECOND, GOLD]
    const point = (angle: number, radius: number) => [cx + radius * Math.cos(angle), cy + radius * Math.sin(angle)]
    return (
        <Figure height={310} label={pick(language, say('5 sektoreko erruleta, hiru zatitan banatuta', 'Una ruleta de 5 sectores repartida en tres trozos', 'عجلة بخمسة قطاعات مقسّمة إلى ثلاث قطع', 'A 5-sector spinner split into three pieces'))}>
            {fills.map((fill, index) => {
                const a0 = -Math.PI / 2 + (index * 2 * Math.PI) / 5
                const a1 = a0 + (2 * Math.PI) / 5
                const [x0, y0] = point(a0, r)
                const [x1, y1] = point(a1, r)
                const [tx, ty] = point((a0 + a1) / 2, r * 0.62)
                return (
                    <g key={index}>
                        <path d={`M ${cx} ${cy} L ${x0} ${y0} A ${r} ${r} 0 0 1 ${x1} ${y1} Z`} fill={fill} stroke={strokes[index]} strokeWidth={2.4} />
                        <text x={tx} y={ty + 8} textAnchor="middle" fontSize={24} fontWeight={700} fill={INK}>{index + 1}</text>
                    </g>
                )
            })}
            <circle cx={cx} cy={cy} r={7} fill={INK} />
            <Formula x={500} y={56} size={18} color={STAGE}>A = {'{'}1, 2{'}'}</Formula>
            <Formula x={500} y={92} size={18} color={SECOND}>B = {'{'}3, 4{'}'}</Formula>
            <Formula x={500} y={128} size={18} color={GOLD}>C = {'{'}5{'}'}</Formula>
            <Formula x={500} y={174} size={17}>A ∪ B ∪ C = E</Formula>
            <Formula x={500} y={230} size={24} color={SECOND}>2⁵ = 32</Formula>
            <Caption y={298} language={language} text={say('Elkar zapaltzen ez duten eta erruleta osoa estaltzen duten hiru zati', 'Tres trozos que no se pisan y cubren toda la ruleta', 'ثلاث قطع لا تتداخل وتغطي العجلة كلها', 'Three pieces that do not overlap and cover the whole spinner')} size={14} />
        </Figure>
    )
}

/* ---------- 5. Difference and De Morgan: the four zones of a die ---------- */

export function FourZonesFigure({ language }: { language: UnitLanguage }) {
    return (
        <Figure height={310} label={pick(language, say('Dado baten lau zonak', 'Las cuatro zonas de un dado', 'المناطق الأربع لنرد', 'The four zones of a die'))}>
            <Venn box={[20, 20, 400, 248]} a={{ x: 162, y: 146, r: 94 }} b={{ x: 278, y: 146, r: 94 }}>
                <ZoneValue x={106} y={148}>2</ZoneValue>
                <ZoneValue x={220} y={140}>4</ZoneValue>
                <ZoneValue x={220} y={186}>6</ZoneValue>
                <ZoneValue x={334} y={148}>5</ZoneValue>
                <ZoneValue x={50} y={244}>1</ZoneValue>
                <ZoneValue x={392} y={244}>3</ZoneValue>
                <Formula x={106} y={182} size={14} color={STAGE}>A ∩ <Bar>B</Bar></Formula>
                <Formula x={220} y={106} size={13} color={SECOND}>A ∩ B</Formula>
                <Formula x={334} y={182} size={14} color={SECOND}><Bar>A</Bar> ∩ B</Formula>
                <Formula x={220} y={258} size={14} color={MUTED}><Bar>A</Bar> ∩ <Bar>B</Bar></Formula>
            </Venn>
            <Formula x={572} y={64} size={17} color={STAGE}>A − B = {'{'}2{'}'}</Formula>
            <Formula x={572} y={108} size={17}>A ∪ B = {'{'}2, 4, 5, 6{'}'}</Formula>
            <Formula x={572} y={152} size={18} color={SECOND}><Bar>A ∪ B</Bar> = {'{'}1, 3{'}'}</Formula>
            <Formula x={572} y={196} size={18} color={SECOND}><Bar>A</Bar> ∩ <Bar>B</Bar> = {'{'}1, 3{'}'}</Formula>
            <Caption y={298} language={language} text={say('De Morgan: bi zirkuluetatik kanpo = A gertaeratik kanpo eta B gertaeratik kanpo', 'De Morgan: fuera de los dos círculos = fuera de A y fuera de B', 'دي مورغان: خارج الدائرتين = خارج A وخارج B', 'De Morgan: outside both circles = outside A and outside B')} size={14} />
        </Figure>
    )
}

/* ---------- 6. The axioms: a Venn diagram with probabilities ---------- */

export function AxiomsVennFigure({ language }: { language: UnitLanguage }) {
    return (
        <Figure height={300} label={pick(language, say('Probabilitateak Venn diagrama batean', 'Probabilidades en un diagrama de Venn', 'احتمالات في مخطط فن', 'Probabilities in a Venn diagram'))}>
            <Venn box={[20, 20, 400, 244]} a={{ x: 158, y: 142, r: 96 }} b={{ x: 280, y: 142, r: 80 }}>
                <ZoneValue x={108} y={148}>{num(language, '0,45')}</ZoneValue>
                <ZoneValue x={226} y={148}>{num(language, '0,15')}</ZoneValue>
                <ZoneValue x={318} y={148}>{num(language, '0,2')}</ZoneValue>
                <ZoneValue x={384} y={246} color={MUTED}>{num(language, '0,2')}</ZoneValue>
            </Venn>
            <Formula x={572} y={64} size={15}>P(A ∪ B) = {num(language, '0,6')} + {num(language, '0,35')} − {num(language, '0,15')} = {num(language, '0,8')}</Formula>
            <Formula x={572} y={112} size={17} color={STAGE}>P(A − B) = {num(language, '0,6')} − {num(language, '0,15')} = {num(language, '0,45')}</Formula>
            <Formula x={572} y={160} size={17}>P(<Bar>A</Bar>) = 1 − {num(language, '0,6')} = {num(language, '0,4')}</Formula>
            <Formula x={572} y={214} size={15} color={MUTED}>{num(language, '0,45')} + {num(language, '0,15')} + {num(language, '0,2')} + {num(language, '0,2')} = 1</Formula>
            <Caption y={290} language={language} text={say('Lau zonek 1 batzen dute: hori da P(E) = 1 axioma', 'Las cuatro zonas suman 1: es el axioma P(E) = 1', 'مجموع المناطق الأربع 1: إنها البديهية P(E) = 1', 'The four zones add up to 1: that is the axiom P(E) = 1')} size={14} />
        </Figure>
    )
}

/* ---------- 7. Probabilities from three data ---------- */

export function DataVennFigure({ language }: { language: UnitLanguage }) {
    const step = (n: number, x: number, y: number) => (
        <g>
            <circle cx={x} cy={y - 6} r={13} fill={SECOND} />
            <text x={x} y={y} textAnchor="middle" fontSize={15} fontWeight={700} fill={PAPER}>{n}</text>
        </g>
    )
    return (
        <Figure height={300} label={pick(language, say('Hiru datu, Venn diagramaren lau zonak', 'Tres datos, las cuatro zonas del Venn', 'ثلاث معطيات والمناطق الأربع لمخطط فن', 'Three data, the four zones of the Venn diagram'))}>
            <Venn box={[20, 20, 400, 244]} a={{ x: 146, y: 142, r: 78 }} b={{ x: 262, y: 142, r: 102 }}>
                <ZoneValue x={112} y={148}>{num(language, '0,2')}</ZoneValue>
                <ZoneValue x={196} y={148}>{num(language, '0,1')}</ZoneValue>
                <ZoneValue x={300} y={148}>{num(language, '0,5')}</ZoneValue>
                <ZoneValue x={384} y={246} color={MUTED}>{num(language, '0,2')}</ZoneValue>
            </Venn>
            {step(1, 456, 66)}
            <Formula x={480} y={66} size={16} anchor="start">P(A ∩ B) = 1 − {num(language, '0,9')} = {num(language, '0,1')}</Formula>
            {step(2, 456, 120)}
            <Formula x={480} y={120} size={16} anchor="start">{num(language, '0,3')} − {num(language, '0,1')} = {num(language, '0,2')}</Formula>
            <Formula x={480} y={150} size={16} anchor="start">{num(language, '0,6')} − {num(language, '0,1')} = {num(language, '0,5')}</Formula>
            {step(3, 456, 204)}
            <Formula x={480} y={204} size={16} anchor="start" color={SECOND}>1 − {num(language, '0,8')} = {num(language, '0,2')}</Formula>
            <Caption y={290} language={language} text={say('Lehenik ebakidura; 1 arte falta dena kanpoko zona da', 'Primero la intersección; lo que falta hasta 1 es la zona de fuera', 'أولًا التقاطع، وما ينقص حتى 1 هو المنطقة الخارجية', 'First the intersection; what is missing up to 1 is the outer zone')} size={14} />
        </Figure>
    )
}

/* ---------- 8. Conditional probability: the condition is the new total ---------- */

export function ConditionalZoomFigure({ language }: { language: UnitLanguage }) {
    const barX = 430
    const barW = 260
    return (
        <Figure height={300} label={pick(language, say('Baldintza osoko berria da', 'La condición es el nuevo total', 'الشرط هو الكل الجديد', 'The condition is the new total'))}>
            <Venn box={[20, 30, 330, 226]} a={{ x: 140, y: 142, r: 84 }} b={{ x: 226, y: 142, r: 58 }}>
                <ZoneValue x={104} y={148} size={17}>{num(language, '0,28')}</ZoneValue>
                <ZoneValue x={196} y={148} size={17}>{num(language, '0,12')}</ZoneValue>
                <ZoneValue x={256} y={148} size={17}>{num(language, '0,08')}</ZoneValue>
                <ZoneValue x={310} y={240} size={16} color={MUTED}>{num(language, '0,52')}</ZoneValue>
            </Venn>
            <path d="M 362 142 L 410 142" stroke={INK} strokeWidth={2.4} markerEnd="none" />
            <path d="M 402 134 L 414 142 L 402 150" fill="none" stroke={INK} strokeWidth={2.4} />
            <text x={barX + barW / 2} y={78} textAnchor="middle" fontSize={20} fontWeight={700} fill={STAGE}>A = {num(language, '0,4')}</text>
            <rect x={barX} y={96} width={barW} height={60} rx={8} fill={STAGE_TINT} stroke={STAGE} strokeWidth={2.4} />
            <rect x={barX} y={96} width={barW * 0.3} height={60} rx={8} fill={SECOND} fillOpacity={0.35} stroke={SECOND} strokeWidth={2.4} />
            <text x={barX + barW * 0.15} y={132} textAnchor="middle" fontSize={17} fontWeight={700} fill={INK}>{num(language, '0,12')}</text>
            <text x={barX + barW * 0.65} y={132} textAnchor="middle" fontSize={17} fontWeight={700} fill={INK}>{num(language, '0,28')}</text>
            <Formula x={barX + barW / 2} y={204} size={19} color={SECOND}>P(B / A) = {num(language, '0,12')} / {num(language, '0,4')} = {num(language, '0,3')}</Formula>
            <Caption y={290} language={language} text={say('A jakinda, A da osoko berria: zati komuna 0,4 zenbakiaz zatitzen da', 'Sabiendo A, A es el nuevo total: la parte común se divide entre 0,4', 'مع العلم بـ A يصير A الكل الجديد: يُقسم الجزء المشترك على 0.4', 'Given A, A is the new total: the common part is divided by 0.4')} size={14} />
        </Figure>
    )
}

/* ---------- 9. The multiplication rule: three batteries in a row ---------- */

export function BatteriesFigure({ language }: { language: UnitLanguage }) {
    const ordinal = [say('1.a', '1.ª', 'الأولى', '1st'), say('2.a', '2.ª', 'الثانية', '2nd'), say('3.a', '3.ª', 'الثالثة', '3rd')]
    const draws = [{ n: 7, d: 10 }, { n: 6, d: 9 }, { n: 5, d: 8 }]
    return (
        <Figure height={300} label={pick(language, say('Hiru pila jarraian, itzuli gabe', 'Tres pilas seguidas, sin devolver', 'ثلاث بطاريات متتالية دون إرجاع', 'Three batteries in a row, without replacement'))}>
            {Array.from({ length: 10 }, (_, index) => {
                const x = 82 + index * 58
                const good = index < 7
                return (
                    <g key={index}>
                        <rect x={x} y={30} width={34} height={58} rx={6} fill={good ? '#d6eddf' : LINE} stroke={good ? GREEN : MUTED} strokeWidth={2} />
                        <rect x={x + 11} y={24} width={12} height={7} rx={2} fill={good ? GREEN : MUTED} />
                        {good && <text x={x + 17} y={66} textAnchor="middle" fontSize={20} fontWeight={700} fill={GREEN}>+</text>}
                    </g>
                )
            })}
            {draws.map((draw, index) => {
                const x = 150 + index * 210
                return (
                    <g key={index}>
                        <Label x={x} y={136} textAnchor="middle" fontSize={15} fontWeight={700} fill={MUTED}>{pick(language, ordinal[index])}</Label>
                        <rect x={x - 52} y={148} width={104} height={76} rx={12} fill={PAPER} stroke={INK} strokeWidth={2} />
                        <Frac x={x} y={186} n={draw.n} d={draw.d} size={20} color={GREEN} />
                        {index < 2 && <text x={x + 105} y={194} textAnchor="middle" fontSize={26} fontWeight={700} fill={INK}>·</text>}
                    </g>
                )
            })}
            <Formula x={360} y={262} size={20} color={SECOND}>7/10 · 6/9 · 5/8 = 210/720 = 7/24</Formula>
            <Caption y={292} language={language} text={say('Urrats bakoitza aurrekoak jakinda: pila on bat gutxiago geratzen da', 'Cada paso sabiendo los anteriores: queda una pila buena menos', 'كل خطوة مع العلم بما سبقها: تبقى بطارية جيدة أقل', 'Each step knowing the earlier ones: there is one good battery fewer')} size={14} />
        </Figure>
    )
}

/* ---------- 10. Independence: the cuts at the same height ---------- */

export function IndependenceMosaicFigure({ language }: { language: UnitLanguage }) {
    const x0 = 60
    const y0 = 40
    const side = 250
    const cut = y0 + side * (1 - 0.3)
    const split = x0 + side * 0.5
    return (
        <Figure height={340} label={pick(language, say('Bi gertaera independenteren laukia', 'El cuadrado de dos sucesos independientes', 'مربع حدثين مستقلين', 'The square of two independent events'))}>
            <rect x={x0} y={y0} width={side} height={side} fill={PAPER} stroke={INK} strokeWidth={2} />
            <rect x={x0} y={y0} width={side * 0.5} height={side} fill={STAGE_TINT} />
            <rect x={x0} y={cut} width={side} height={y0 + side - cut} fill={SECOND} fillOpacity={0.3} />
            <line x1={split} y1={y0} x2={split} y2={y0 + side} stroke={INK} strokeWidth={2.4} />
            <line x1={x0} y1={cut} x2={x0 + side} y2={cut} stroke={SECOND} strokeWidth={2.6} strokeDasharray="7 5" />
            <rect x={x0} y={y0} width={side} height={side} fill="none" stroke={INK} strokeWidth={2.4} />
            <text x={x0 + side * 0.25} y={y0 - 12} textAnchor="middle" fontSize={18} fontWeight={700} fill={STAGE}>P(A) = {num(language, '0,5')}</text>
            <text x={x0 + side * 0.75} y={y0 - 12} textAnchor="middle" fontSize={18} fontWeight={700} fill={MUTED}>P(<Bar>A</Bar>) = {num(language, '0,5')}</text>
            <text x={x0 + side * 0.25} y={cut + 42} textAnchor="middle" fontSize={18} fontWeight={700} fill={INK}>{num(language, '0,15')}</text>
            <text x={x0 + side * 0.75} y={cut + 42} textAnchor="middle" fontSize={18} fontWeight={700} fill={INK}>{num(language, '0,15')}</text>
            <text x={x0 + side + 14} y={cut + 42} fontSize={18} fontWeight={700} fill={SECOND}>B</text>
            <Formula x={546} y={86} size={18}>P(B / A) = {num(language, '0,3')}</Formula>
            <Formula x={546} y={128} size={18}>P(B / <Bar>A</Bar>) = {num(language, '0,3')}</Formula>
            <Formula x={546} y={186} size={18} color={SECOND}>P(A ∩ B) = {num(language, '0,5')} · {num(language, '0,3')} = {num(language, '0,15')}</Formula>
            <Caption y={328} language={language} text={say('B mozketa altuera berean dago bi zerrendetan: A jakiteak ez du B aldatzen', 'El corte de B está a la misma altura en las dos franjas: saber A no cambia B', 'خط B على الارتفاع نفسه في الشريطين: معرفة A لا تغيّر B', 'The cut for B is at the same height in both strips: knowing A does not change B')} size={14} />
        </Figure>
    )
}

/* ---------- 11. Tables from percentages: the gym ---------- */

export function GymTableFigure({ language }: { language: UnitLanguage }) {
    const columns = [say('Igeri ($N$)', 'Nada ($N$)', 'يسبح ($N$)', 'Swims ($N$)'), say('Ez du igeri', 'No nada', 'لا يسبح', 'Does not swim'), say('Guztira', 'Total', 'المجموع', 'Total')]
    const rows = [
        { name: say('Goiza ($M$)', 'Mañana ($M$)', 'صباحًا ($M$)', 'Morning ($M$)'), values: [18, 42, 60] },
        { name: say('Arratsaldea', 'Tarde', 'مساءً', 'Afternoon'), values: [20, 20, 40] },
        { name: say('Guztira', 'Total', 'المجموع', 'Total'), values: [38, 62, 100] }
    ]
    const colX = [380, 500, 626]
    const rowY = (row: number) => 96 + row * 44
    const plain = (text: string) => text.replace(/\$/g, '')
    return (
        <Figure height={310} label={pick(language, say('100 bazkideren taula', 'La tabla de 100 socios', 'جدول 100 عضو', 'The table of 100 members'))}>
            <rect x={colX[0] - 54} y={30} width={108} height={170} rx={8} fill={STAGE_TINT} />
            <rect x={colX[0] - 46} y={rowY(0) - 27} width={92} height={38} rx={8} fill={SECOND} fillOpacity={0.22} stroke={SECOND} strokeWidth={2} />
            <rect x={colX[0] - 46} y={rowY(2) - 27} width={92} height={38} rx={8} fill="none" stroke={STAGE} strokeWidth={2.4} />
            {columns.map((column, index) => (
                <Label key={index} x={colX[index]} y={56} textAnchor="middle" fontSize={15} fontWeight={700} fill={STAGE}>{plain(pick(language, column))}</Label>
            ))}
            <line x1={40} x2={690} y1={68} y2={68} stroke={INK} strokeWidth={2} />
            <line x1={300} x2={300} y1={30} y2={200} stroke={INK} strokeWidth={2} />
            <line x1={40} x2={690} y1={156} y2={156} stroke={INK} strokeWidth={1.4} />
            <line x1={564} x2={564} y1={30} y2={200} stroke={INK} strokeWidth={1.4} />
            {rows.map((row, rowIndex) => (
                <g key={rowIndex}>
                    <Label x={56} y={rowY(rowIndex)} fontSize={16} fontWeight={700} fill={INK}>{plain(pick(language, row.name))}</Label>
                    {row.values.map((value, index) => (
                        <text key={index} x={colX[index]} y={rowY(rowIndex)} textAnchor="middle" fontSize={18} fontWeight={rowIndex === 2 || index === 2 ? 700 : 400} fill={INK}>{value}</text>
                    ))}
                </g>
            ))}
            <Formula x={360} y={246} size={20} color={SECOND}>P(M / N) = 18/38 = 9/19</Formula>
            <Caption y={294} language={language} text={say('60 bazkideen % 30 = 18 eta 40 bazkideen % 50 = 20', '30 % de 60 = 18 y 50 % de 40 = 20', '30٪ من 60 = 18 و50٪ من 40 = 20', '30% of 60 = 18 and 50% of 40 = 20')} size={14} />
        </Figure>
    )
}

/* ---------- 12. Total probability: the factory tree ---------- */

export function MachinesTreeFigure({ language }: { language: UnitLanguage }) {
    const machines = [
        { y: 62, share: '0,5', fault: '0,02', ok: '0,98', product: '0,01' },
        { y: 168, share: '0,3', fault: '0,03', ok: '0,97', product: '0,009' },
        { y: 274, share: '0,2', fault: '0,05', ok: '0,95', product: '0,01' }
    ]
    return (
        <Figure height={360} label={pick(language, say('Hiru makinen zuhaitza', 'El árbol de las tres máquinas', 'شجرة الآلات الثلاث', 'The tree of the three machines'))}>
            <circle cx={40} cy={168} r={6} fill={INK} />
            {machines.map((machine, index) => (
                <g key={index}>
                    <line x1={46} y1={168} x2={176} y2={machine.y} stroke={INK} strokeWidth={1.8} />
                    <text x={104} y={(168 + machine.y) / 2 + (index === 0 ? -14 : index === 2 ? 26 : -10)} textAnchor="middle" fontSize={15} fontWeight={700} fill={INK}>{num(language, machine.share)}</text>
                    <rect x={178} y={machine.y - 19} width={52} height={38} rx={9} fill={STAGE_TINT} stroke={INK} strokeWidth={1.8} />
                    <text x={204} y={machine.y + 7} textAnchor="middle" fontSize={18} fontWeight={700} fill={INK}><Sub letter="A" index={String(index + 1)} /></text>
                    <line x1={230} y1={machine.y} x2={350} y2={machine.y - 30} stroke={SECOND} strokeWidth={2.6} />
                    <line x1={230} y1={machine.y} x2={350} y2={machine.y + 30} stroke={INK} strokeWidth={1.4} />
                    <text x={290} y={machine.y - 26} textAnchor="middle" fontSize={14} fontWeight={700} fill={SECOND}>{num(language, machine.fault)}</text>
                    <text x={290} y={machine.y + 40} textAnchor="middle" fontSize={14} fontWeight={700} fill={MUTED}>{num(language, machine.ok)}</text>
                    <text x={366} y={machine.y - 24} textAnchor="middle" fontSize={18} fontWeight={700} fill={SECOND}>D</text>
                    <text x={366} y={machine.y + 36} textAnchor="middle" fontSize={18} fontWeight={700} fill={MUTED}><Bar>D</Bar></text>
                    <Formula x={530} y={machine.y - 24} size={17} color={SECOND}>{num(language, machine.share)} · {num(language, machine.fault)} = {num(language, machine.product)}</Formula>
                </g>
            ))}
            <Formula x={360} y={346} size={19} color={SECOND}>P(D) = {num(language, '0,01')} + {num(language, '0,009')} + {num(language, '0,01')} = {num(language, '0,029')}</Formula>
        </Figure>
    )
}

/* ---------- 13. Bayes: prior and posterior ---------- */

export function PosteriorFigure({ language }: { language: UnitLanguage }) {
    const x0 = 160
    const width = 520
    const prior = [0.5, 0.3, 0.2]
    const posterior = [10 / 29, 9 / 29, 10 / 29]
    const posteriorText = ['10/29', '9/29', '10/29']
    const fills = [COLORS[0], COLORS[1], GOLD]
    const row = (shares: number[], y: number, texts: string[]) => {
        let x = x0
        return shares.map((share, index) => {
            const w = share * width
            const cell = (
                <g key={index}>
                    <rect x={x} y={y} width={w} height={48} fill={fills[index]} fillOpacity={index === 2 ? 0.45 : 0.28} stroke={INK} strokeWidth={1.8} />
                    <text x={x + w / 2} y={y + 31} textAnchor="middle" fontSize={17} fontWeight={700} fill={INK} direction="ltr">{texts[index]}</text>
                </g>
            )
            x += w
            return cell
        })
    }
    return (
        <Figure height={310} label={pick(language, say('A priori eta a posteriori probabilitateak', 'Probabilidades a priori y a posteriori', 'الاحتمالات القبلية والبعدية', 'Prior and posterior probabilities'))}>
            {[0, 1, 2].map((index) => {
                const start = x0 + prior.slice(0, index).reduce((sum, value) => sum + value, 0) * width
                return <text key={index} x={start + (prior[index] * width) / 2} y={40} textAnchor="middle" fontSize={17} fontWeight={700} fill={INK}><Sub letter="A" index={String(index + 1)} /></text>
            })}
            <Label x={146} y={88} textAnchor="end" fontSize={15} fontWeight={700} fill={MUTED}>{pick(language, say('A priori', 'A priori', 'قبليًّا', 'Prior'))}</Label>
            {row(prior, 56, prior.map((value) => num(language, String(value).replace('.', ','))))}
            <Label x={146} y={178} textAnchor="end" fontSize={15} fontWeight={700} fill={SECOND}>{pick(language, say('D jakinda', 'Sabiendo D', 'مع العلم بـ D', 'Given D'))}</Label>
            {row(posterior, 146, posteriorText)}
            <Formula x={420} y={246} size={18} color={SECOND}>P(<Sub letter="A" index="3" /> / D) = {num(language, '0,01')} / {num(language, '0,029')} = 10/29 ≈ {num(language, '0,34')}</Formula>
            <Caption y={294} language={language} text={say('A₃ makinak pieza gutxi egiten ditu, baina huts gehiago egiten du: D jakinda, haren zatia hazi egiten da', 'A₃ hace pocas piezas pero falla más: sabiendo D, su parte crece', 'تصنع A₃ قطعًا قليلة لكنها تخطئ أكثر: مع العلم بـ D تكبر حصتها', 'A₃ makes few parts but fails more often: given D, its share grows')} size={14} />
        </Figure>
    )
}

/* ---------- 14. Diagnostic tests: the tree of 10 000 people ---------- */

export function FrequencyTreeFigure({ language }: { language: UnitLanguage }) {
    const g = (value: number) => groupDigits(value, language)
    const box = (x: number, y: number, text: string, color: string, sign?: ReactNode) => (
        <g>
            <rect x={x - 50} y={y - 20} width={100} height={40} rx={10} fill={PAPER} stroke={color} strokeWidth={2.2} />
            <text x={x} y={y + 7} textAnchor="middle" fontSize={17} fontWeight={700} fill={color} direction="ltr">{text}{sign}</text>
        </g>
    )
    const edge = (x1: number, y1: number, x2: number, y2: number, label: string, above: boolean, color = INK) => (
        <g>
            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={color === INK ? 1.6 : 2.6} />
            <text x={(x1 + x2) / 2} y={(y1 + y2) / 2 + (above ? -10 : 22)} textAnchor="middle" fontSize={14} fontWeight={700} fill={MUTED}>{num(language, label)}</text>
        </g>
    )
    return (
        <Figure height={320} label={pick(language, say('10 000 pertsonaren zuhaitza', 'El árbol de 10 000 personas', 'شجرة 10 000 شخص', 'The tree of 10,000 people'))}>
            {edge(110, 150, 216, 72, '0,01', true)}
            {edge(110, 150, 216, 230, '0,99', false)}
            {edge(316, 72, 416, 36, '0,99', true, SECOND)}
            {edge(316, 72, 416, 108, '0,01', false)}
            {edge(316, 230, 416, 194, '0,01', true, SECOND)}
            {edge(316, 230, 416, 266, '0,99', false)}
            {box(62, 150, g(10000), INK)}
            {box(266, 72, `${g(100)} `, STAGE, 'E')}
            {box(266, 230, `${g(9900)} `, MUTED, <Bar>E</Bar>)}
            {box(466, 36, `${g(99)} +`, SECOND)}
            {box(466, 108, `${g(1)} −`, MUTED)}
            {box(466, 194, `${g(99)} +`, SECOND)}
            {box(466, 266, `${g(9801)} −`, MUTED)}
            <Formula x={628} y={124} size={18} color={SECOND}>99 + 99 = 198</Formula>
            <Formula x={628} y={170} size={18} color={SECOND}>P(E / +) = 99/198</Formula>
            <Formula x={628} y={210} size={22} color={SECOND}>= 1/2</Formula>
            <Caption y={308} language={language} text={say('Benetako positiboak adina positibo faltsu', 'Tantos falsos positivos como positivos de verdad', 'إيجابيات كاذبة بعدد الإيجابيات الحقيقية', 'As many false positives as true positives')} size={14} />
        </Figure>
    )
}

/* ---------- 15. Two-stage experiments: a ball moved from urn I to urn II ---------- */

export function TransferFigure({ language }: { language: UnitLanguage }) {
    const urn = (x: number, y: number, name: string, balls: boolean[], extra?: boolean) => (
        <g>
            <rect x={x} y={y} width={120} height={58} rx={12} fill={STAGE_TINT} stroke={INK} strokeWidth={1.8} />
            <text x={x + 14} y={y - 8} fontSize={16} fontWeight={700} fill={INK}>{name}</text>
            {balls.map((white, index) => <Ball key={index} x={x + 20 + index * 20} y={y + 29} r={8} white={white} />)}
            {extra !== undefined && <circle cx={x + 20 + balls.length * 20} cy={y + 29} r={9} fill={extra ? PAPER : INK} stroke={SECOND} strokeWidth={2.6} />}
        </g>
    )
    return (
        <Figure height={320} label={pick(language, say('Bola bat I kutxatik II kutxara', 'Una bola de la urna I a la urna II', 'كرة من الجرّة I إلى الجرّة II', 'A ball from urn I to urn II'))}>
            {urn(26, 56, 'I', [true, true, true, false])}
            {urn(26, 196, 'II', [true, true, false, false])}
            <path d="M 86 120 L 86 184" stroke={SECOND} strokeWidth={2.6} />
            <path d="M 78 174 L 86 186 L 94 174" fill="none" stroke={SECOND} strokeWidth={2.6} />
            <circle cx={218} cy={160} r={6} fill={INK} />
            <line x1={224} y1={160} x2={312} y2={82} stroke={INK} strokeWidth={1.8} />
            <line x1={224} y1={160} x2={312} y2={238} stroke={INK} strokeWidth={1.8} />
            <Frac x={256} y={104} n={3} d={4} size={15} />
            <Frac x={256} y={222} n={1} d={4} size={15} />
            {urn(318, 54, 'II', [true, true, false, false], true)}
            {urn(318, 210, 'II', [true, true, false, false], false)}
            <line x1={440} y1={82} x2={500} y2={82} stroke={SECOND} strokeWidth={2.6} />
            <line x1={440} y1={238} x2={500} y2={238} stroke={SECOND} strokeWidth={2.6} />
            <Ball x={512} y={82} r={11} white />
            <Ball x={512} y={238} r={11} white />
            <Frac x={470} y={66} n={3} d={5} size={14} />
            <Frac x={470} y={222} n={2} d={5} size={14} />
            <Formula x={630} y={88} size={17}>3/4 · 3/5 = 9/20</Formula>
            <Formula x={630} y={244} size={17}>1/4 · 2/5 = 2/20</Formula>
            <Formula x={630} y={160} size={18} color={SECOND}>9/20 + 2/20 = 11/20</Formula>
            <Caption y={306} language={language} text={say('Pasatutako bolaren arabera, II kutxak 5 bolatik 3 edo 2 zuri ditu', 'Según la bola pasada, la urna II tiene 3 o 2 blancas de 5', 'بحسب الكرة المنقولة، في الجرّة II ثلاث أو اثنتان بيضاء من 5', 'Depending on the ball moved, urn II has 3 or 2 white out of 5')} size={14} />
        </Figure>
    )
}

/* ---------- Hero art ---------- */

export function ProbabilityBatx2HeroArt() {
    return (
        <div className="fraction-v2-collage" aria-hidden="true">
            <svg viewBox="0 0 520 400" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                <g transform="translate(30 40) rotate(-4)">
                    <rect width={230} height={160} rx={16} fill={PAPER} stroke={INK} strokeWidth={2} />
                    <circle cx={92} cy={80} r={50} fill="#dde7f7" stroke="#2f6fdb" strokeWidth={2.4} />
                    <circle cx={142} cy={80} r={50} fill="rgba(196, 67, 42, 0.22)" stroke="#c4432a" strokeWidth={2.4} />
                    <text x={66} y={86} fontSize={20} fontWeight={700} fill={INK}>A</text>
                    <text x={156} y={86} fontSize={20} fontWeight={700} fill={INK}>B</text>
                </g>
                <g transform="translate(290 36) rotate(4)">
                    <rect width={200} height={130} rx={16} fill="#fbebc0" stroke={INK} strokeWidth={2} />
                    <rect x={36} y={22} width={128} height={88} fill={PAPER} stroke={INK} strokeWidth={2} />
                    <rect x={36} y={22} width={64} height={88} fill="#dde7f7" />
                    <rect x={36} y={84} width={128} height={26} fill="rgba(196, 67, 42, 0.3)" />
                    <line x1={100} y1={22} x2={100} y2={110} stroke={INK} strokeWidth={2} />
                    <rect x={36} y={22} width={128} height={88} fill="none" stroke={INK} strokeWidth={2} />
                </g>
                <g transform="translate(296 196) rotate(-3)">
                    <rect width={196} height={110} rx={16} fill="#e8e0f7" stroke={INK} strokeWidth={2} />
                    <text x={98} y={66} textAnchor="middle" fontSize={24} fontWeight={700} fill="#c4432a" fontFamily="Fraunces, serif" direction="ltr">P(A / B)</text>
                </g>
                <g transform="translate(40 236) rotate(2)">
                    <rect width={230} height={130} rx={16} fill="#d6eddf" stroke={INK} strokeWidth={2} />
                    <circle cx={30} cy={65} r={6} fill={INK} />
                    {[30, 65, 100].map((y, index) => (
                        <g key={index}>
                            <line x1={36} y1={65} x2={110} y2={y} stroke={INK} strokeWidth={2} />
                            <rect x={110} y={y - 12} width={34} height={24} rx={6} fill={PAPER} stroke={INK} strokeWidth={1.6} />
                            <line x1={144} y1={y} x2={196} y2={y} stroke="#c4432a" strokeWidth={2.4} />
                        </g>
                    ))}
                </g>
                <g transform="translate(316 324) rotate(3)">
                    <rect width={170} height={58} rx={16} fill={PAPER} stroke={INK} strokeWidth={2} />
                    <text x={85} y={39} textAnchor="middle" fontSize={22} fontWeight={700} fill={INK} fontFamily="Fraunces, serif">Bayes</text>
                </g>
            </svg>
        </div>
    )
}
