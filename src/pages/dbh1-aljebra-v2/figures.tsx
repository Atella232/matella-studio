import { pickText, type LocalizedText, type UnitLanguage } from '../../features/unit-v2/types'
import { Caption, Figure } from '../dbh2-zatikiak-prototype/figures'

/* ==========================================================================
   Aljebra · 1. DBH — lesson figures in the notebook style: the number
   machine, the rectangle's perimeter, the parts of a monomial, algebra
   tiles, the balance and the distributive rectangle.
   ========================================================================== */

const INK = 'var(--ink, #1d2733)'
const MUTED = 'var(--muted, #58616e)'
const STAGE = 'var(--stage, #2f6fdb)'
const STAGE_TINT = 'var(--stage-tint, #dde7f7)'
const SECOND = 'var(--second, #c4432a)'
const PAPER = '#fffcf6'

const pick = (language: UnitLanguage, text: LocalizedText) => pickText(language, text)

/** An x-tile (long bar) and a unit tile (small square) as used with algebra tiles */
function XTile({ x, y }: { x: number; y: number }) {
    return (
        <g>
            <rect x={x} y={y} width={26} height={70} rx={5} fill={STAGE_TINT} stroke={INK} strokeWidth={1.8} />
            <text x={x + 13} y={y + 42} textAnchor="middle" fontSize={16} fontWeight={700} fill={INK} fontStyle="italic">x</text>
        </g>
    )
}

function UnitTile({ x, y }: { x: number; y: number }) {
    return <rect x={x} y={y} width={26} height={26} rx={5} fill="var(--mustard-tint, #fbebc0)" stroke={INK} strokeWidth={1.8} />
}

/* ---------- Numerical value: the number machine 2x + 1 ---------- */

export function MachineFigure({ language }: { language: UnitLanguage }) {
    const rows = [0, 1, 2, 5]
    return (
        <Figure height={230} label={pick(language, { eu: '2x + 1 makina: x sartu, 2x + 1 atera', es: 'Máquina 2x + 1: entra x, sale 2x + 1', ar: 'آلة 2x + 1: يدخل x ويخرج 2x + 1' })}>
            <rect x={250} y={30} width={220} height={100} rx={18} fill={STAGE_TINT} stroke={INK} strokeWidth={2.4} />
            <text x={360} y={90} textAnchor="middle" fontSize={32} fontWeight={700} fill={INK} fontFamily="Fraunces, serif">2x + 1</text>
            <path d="M150 80 L240 80" stroke={INK} strokeWidth={2.4} markerEnd="url(#algebra-arrow)" />
            <path d="M480 80 L570 80" stroke={INK} strokeWidth={2.4} markerEnd="url(#algebra-arrow)" />
            <defs>
                <marker id="algebra-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto">
                    <path d="M0 0 L10 5 L0 10 z" fill={INK} />
                </marker>
            </defs>
            <text x={110} y={88} textAnchor="middle" fontSize={24} fontWeight={700} fill={STAGE} fontStyle="italic">x</text>
            {rows.map((x, index) => (
                <g key={x}>
                    <text x={180 + index * 120} y={170} textAnchor="middle" fontSize={17} fontWeight={700} fill={INK}>x = {x}</text>
                    <text x={180 + index * 120} y={196} textAnchor="middle" fontSize={17} fill={STAGE} fontWeight={700}>{2 * x + 1}</text>
                </g>
            ))}
            <text x={620} y={88} textAnchor="middle" fontSize={20} fontWeight={700} fill={INK}>?</text>
            <Caption y={224}>{pick(language, { eu: 'Zenbakizko balioa: ordeztu letra zenbakiaz eta egin eragiketak', es: 'Valor numérico: sustituye la letra por el número y opera', ar: 'القيمة العددية: عوّض الحرف بالعدد وأجرِ العمليات' })}</Caption>
        </Figure>
    )
}

/* ---------- Translating: the perimeter of a rectangle ---------- */

export function PerimeterFigure({ language }: { language: UnitLanguage }) {
    return (
        <Figure height={230} label={pick(language, { eu: 'Laukizuzenaren perimetroa: P = 2a + 2b', es: 'Perímetro del rectángulo: P = 2a + 2b', ar: 'محيط المستطيل: P = 2a + 2b' })}>
            <rect x={90} y={40} width={260} height={130} fill={STAGE_TINT} stroke={INK} strokeWidth={2.4} />
            <text x={220} y={30} textAnchor="middle" fontSize={20} fontWeight={700} fill={INK} fontStyle="italic">a</text>
            <text x={220} y={196} textAnchor="middle" fontSize={20} fontWeight={700} fill={INK} fontStyle="italic">a</text>
            <text x={72} y={112} textAnchor="middle" fontSize={20} fontWeight={700} fill={INK} fontStyle="italic">b</text>
            <text x={368} y={112} textAnchor="middle" fontSize={20} fontWeight={700} fill={INK} fontStyle="italic">b</text>
            <text x={420} y={80} fontSize={22} fontWeight={700} fill={INK}>P = a + b + a + b</text>
            <text x={420} y={120} fontSize={22} fontWeight={700} fill={STAGE}>P = 2a + 2b</text>
            <text x={420} y={160} fontSize={22} fontWeight={700} fill={INK}>A = a · b</text>
            <Caption y={222}>{pick(language, { eu: 'Letrek edozein neurri adierazten dute: formula batek laukizuzen guztiak balio ditu', es: 'Las letras representan cualquier medida: una fórmula sirve para todos los rectángulos', ar: 'الحروف تمثّل أي قياس: صيغة واحدة تصلح لكل المستطيلات' })}</Caption>
        </Figure>
    )
}

/* ---------- Parts of a monomial ---------- */

export function MonomialFigure({ language }: { language: UnitLanguage }) {
    return (
        <Figure height={230} label={pick(language, { eu: '−4x²y monomioaren atalak', es: 'Partes del monomio −4x²y', ar: 'أجزاء وحيد الحد −4x²y' })}>
            <text x={290} y={112} textAnchor="end" fontSize={56} fontWeight={700} fill={SECOND} fontFamily="Fraunces, serif">−4</text>
            <text x={300} y={112} fontSize={56} fontWeight={700} fill={STAGE} fontFamily="Fraunces, serif" fontStyle="italic">x</text>
            <text x={334} y={80} fontSize={30} fontWeight={700} fill={STAGE} fontFamily="Fraunces, serif">2</text>
            <text x={356} y={112} fontSize={56} fontWeight={700} fill={STAGE} fontFamily="Fraunces, serif" fontStyle="italic">y</text>
            <line x1={250} x2={200} y1={124} y2={160} stroke={SECOND} strokeWidth={1.8} />
            <text x={200} y={180} textAnchor="middle" fontSize={17} fontWeight={700} fill={SECOND}>{pick(language, { eu: 'koefizientea: −4', es: 'coeficiente: −4', ar: 'المعامل: −4' })}</text>
            <line x1={340} x2={420} y1={124} y2={160} stroke={STAGE} strokeWidth={1.8} />
            <text x={440} y={180} textAnchor="middle" fontSize={17} fontWeight={700} fill={STAGE}>{pick(language, { eu: 'zati literala: x²y', es: 'parte literal: x²y', ar: 'الجزء الحرفي: x²y' })}</text>
            <text x={560} y={70} textAnchor="middle" fontSize={17} fontWeight={700} fill={INK}>{pick(language, { eu: 'maila', es: 'grado', ar: 'الدرجة' })}</text>
            <text x={560} y={100} textAnchor="middle" fontSize={20} fontWeight={700} fill={INK}>2 + 1 = 3</text>
            <Caption y={222}>{pick(language, { eu: 'Maila: letren berretzaileen batura (y-k 1 du)', es: 'Grado: suma de los exponentes de las letras (y tiene 1)', ar: 'الدرجة: مجموع أسس الحروف (أس y يساوي 1)' })}</Caption>
        </Figure>
    )
}

/* ---------- Algebra tiles: 3x + 2 + 2x + 1 = 5x + 3 ---------- */

export function TilesFigure({ language }: { language: UnitLanguage }) {
    return (
        <Figure height={240} label={pick(language, { eu: '3x + 2 + 2x + 1 = 5x + 3 fitxekin', es: '3x + 2 + 2x + 1 = 5x + 3 con fichas', ar: '3x + 2 + 2x + 1 = 5x + 3 بالبطاقات' })}>
            {[0, 1, 2].map((index) => <XTile key={`a${index}`} x={40 + index * 34} y={30} />)}
            {[0, 1].map((index) => <UnitTile key={`b${index}`} x={150 + index * 34} y={74} />)}
            <text x={232} y={80} textAnchor="middle" fontSize={26} fontWeight={700} fill={INK}>+</text>
            {[0, 1].map((index) => <XTile key={`c${index}`} x={256 + index * 34} y={30} />)}
            <UnitTile x={330} y={74} />
            <text x={390} y={80} textAnchor="middle" fontSize={26} fontWeight={700} fill={INK}>=</text>
            {[0, 1, 2, 3, 4].map((index) => <XTile key={`d${index}`} x={420 + index * 34} y={30} />)}
            {[0, 1, 2].map((index) => <UnitTile key={`e${index}`} x={594 + index * 34} y={74} />)}
            <text x={120} y={140} textAnchor="middle" fontSize={20} fontWeight={700} fill={INK}>3x + 2</text>
            <text x={306} y={140} textAnchor="middle" fontSize={20} fontWeight={700} fill={INK}>2x + 1</text>
            <text x={560} y={140} textAnchor="middle" fontSize={20} fontWeight={700} fill={STAGE}>5x + 3</text>
            <Caption y={200}>{pick(language, { eu: 'x-ak x-ekin eta zenbakiak zenbakiekin: antzekoak bakarrik batzen dira', es: 'Las x con las x y los números con los números: solo se suman los semejantes', ar: 'الـ x مع الـ x والأعداد مع الأعداد: نجمع المتشابهة فقط' })}</Caption>
        </Figure>
    )
}

/* ---------- The balance: x + 2 = 8 ---------- */

export function BalanceFigure({ language }: { language: UnitLanguage }) {
    return (
        <Figure height={260} label={pick(language, { eu: 'Balantza orekatua: x + 2 = 8', es: 'Balanza en equilibrio: x + 2 = 8', ar: 'ميزان متوازن: x + 2 = 8' })}>
            <polygon points="360,200 330,240 390,240" fill={PAPER} stroke={INK} strokeWidth={2.2} />
            <line x1={360} x2={360} y1={90} y2={200} stroke={INK} strokeWidth={3} />
            <line x1={130} x2={590} y1={90} y2={90} stroke={INK} strokeWidth={4} />
            <path d="M100 150 L220 150 L200 170 L120 170 Z" fill={STAGE_TINT} stroke={INK} strokeWidth={2} />
            <path d="M500 150 L620 150 L600 170 L520 170 Z" fill={STAGE_TINT} stroke={INK} strokeWidth={2} />
            <line x1={160} x2={160} y1={90} y2={150} stroke={MUTED} strokeWidth={1.6} />
            <line x1={560} x2={560} y1={90} y2={150} stroke={MUTED} strokeWidth={1.6} />
            <rect x={112} y={104} width={44} height={44} rx={6} fill={STAGE} fillOpacity={0.35} stroke={INK} strokeWidth={2} />
            <text x={134} y={134} textAnchor="middle" fontSize={22} fontWeight={700} fill={INK} fontStyle="italic">x</text>
            {[0, 1].map((index) => <circle key={index} cx={176 + index * 22} cy={138} r={10} fill="var(--mustard-tint, #fbebc0)" stroke={INK} strokeWidth={1.8} />)}
            {Array.from({ length: 8 }, (_, index) => <circle key={index} cx={516 + (index % 4) * 22} cy={138 - Math.floor(index / 4) * 22} r={10} fill="var(--mustard-tint, #fbebc0)" stroke={INK} strokeWidth={1.8} />)}
            <text x={160} y={200} textAnchor="middle" fontSize={20} fontWeight={700} fill={INK}>x + 2</text>
            <text x={560} y={200} textAnchor="middle" fontSize={20} fontWeight={700} fill={INK}>8</text>
            <text x={360} y={50} textAnchor="middle" fontSize={20} fontWeight={700} fill={STAGE}>x = 6</text>
            <Caption y={254}>{pick(language, { eu: 'Bi aldeetatik 2 kendu: balantza orekatuta jarraitzen du', es: 'Quita 2 de los dos platos: la balanza sigue en equilibrio', ar: 'أزل 2 من الكفتين: يبقى الميزان متوازنًا' })}</Caption>
        </Figure>
    )
}

/* ---------- Removing brackets: 2(x + 3) = 2x + 6 as an area ---------- */

export function DistributiveFigure({ language }: { language: UnitLanguage }) {
    return (
        <Figure height={230} label={pick(language, { eu: '2(x + 3) = 2x + 6 azalera gisa', es: '2(x + 3) = 2x + 6 como área', ar: '2(x + 3) = 2x + 6 على شكل مساحة' })}>
            <rect x={120} y={50} width={240} height={100} fill={STAGE_TINT} stroke={INK} strokeWidth={2.2} />
            <rect x={360} y={50} width={150} height={100} fill="var(--mustard-tint, #fbebc0)" stroke={INK} strokeWidth={2.2} />
            <text x={240} y={40} textAnchor="middle" fontSize={20} fontWeight={700} fill={INK} fontStyle="italic">x</text>
            <text x={435} y={40} textAnchor="middle" fontSize={20} fontWeight={700} fill={INK}>3</text>
            <text x={100} y={108} textAnchor="middle" fontSize={20} fontWeight={700} fill={INK}>2</text>
            <text x={240} y={108} textAnchor="middle" fontSize={22} fontWeight={700} fill={INK}>2x</text>
            <text x={435} y={108} textAnchor="middle" fontSize={22} fontWeight={700} fill={INK}>6</text>
            <text x={600} y={100} textAnchor="middle" fontSize={20} fontWeight={700} fill={STAGE}>2(x + 3)</text>
            <text x={600} y={128} textAnchor="middle" fontSize={20} fontWeight={700} fill={STAGE}>= 2x + 6</text>
            <Caption y={200}>{pick(language, { eu: 'Parentesiaren aurreko zenbakiak barruko gai guztiak biderkatzen ditu', es: 'El número de delante del paréntesis multiplica a todos los términos de dentro', ar: 'العدد الذي أمام القوس يضرب كل الحدود داخله' })}</Caption>
        </Figure>
    )
}

/* ---------- Hero ---------- */

export function AlgebraIntroHeroArt() {
    return (
        <div className="fraction-v2-collage" aria-hidden="true">
            <svg viewBox="0 0 520 400" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                <g transform="translate(40 50) rotate(-4)">
                    <rect width={210} height={190} rx={16} fill={PAPER} stroke={INK} strokeWidth={2} />
                    <line x1={30} x2={180} y1={70} y2={70} stroke={INK} strokeWidth={4} />
                    <line x1={105} x2={105} y1={70} y2={150} stroke={INK} strokeWidth={3} />
                    <polygon points="105,150 85,176 125,176" fill={PAPER} stroke={INK} strokeWidth={2} />
                    <rect x={36} y={84} width={34} height={34} rx={5} fill="#dde7f7" stroke={INK} strokeWidth={2} />
                    <text x={53} y={108} textAnchor="middle" fontSize={20} fontWeight={700} fill={INK} fontStyle="italic">x</text>
                    {[0, 1, 2].map((index) => <circle key={index} cx={146 + (index % 2) * 18} cy={104 - Math.floor(index / 2) * 18} r={8} fill="#fbebc0" stroke={INK} strokeWidth={1.6} />)}
                </g>
                <g transform="translate(290 50) rotate(4)">
                    <rect width={180} height={96} rx={16} fill="#e8e0f7" stroke={INK} strokeWidth={2} />
                    <text x={90} y={62} textAnchor="middle" fontSize={30} fontWeight={700} fill={INK} fontFamily="Fraunces, serif">x + 2 = 5</text>
                </g>
                <g transform="translate(300 180) rotate(-3)">
                    <rect width={170} height={88} rx={16} fill="#fbebc0" stroke={INK} strokeWidth={2} />
                    <text x={85} y={56} textAnchor="middle" fontSize={28} fontWeight={700} fill={INK} fontFamily="Fraunces, serif">3x + 2x = 5x</text>
                </g>
                <g transform="translate(40 300)">
                    <rect width={440} height={70} rx={16} fill="#d6eddf" stroke={INK} strokeWidth={2} />
                    {['x', '2x', '3x', 'x²', '2x + 1'].map((label, index) => (
                        <text key={label} x={50 + index * 86} y={44} textAnchor="middle" fontSize={22} fontWeight={700} fill={INK} fontFamily="Fraunces, serif" fontStyle="italic">{label}</text>
                    ))}
                </g>
            </svg>
        </div>
    )
}
