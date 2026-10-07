import { pickText, type LocalizedText, type UnitLanguage } from '../../features/unit-v2/types'
import { Figure } from '../dbh2-zatikiak-prototype/figures'
import { Label } from '../dbh2-funtzioak-v2/plane'
import { Caption } from '../dbh1-proportzionaltasuna-v2/figures'

/* ==========================================================================
   Polinomioak · 4. DBH aplikatuak — the new lesson figures: long division
   with its dividend = divisor · quotient + remainder check, the Ruffini
   table, the remainder theorem, the roots of a cubic on its graph, a
   factorisation by repeated Ruffini steps, an algebraic fraction that
   simplifies, an expression simplified before an equation and a rectangle
   whose sides add up to a fixed amount. The monomial, product, identity
   and common-factor lessons reuse the 2. DBH figures. Formulas are the same
   in every language; Arabic captions carry words only.
   ========================================================================== */

const INK = 'var(--ink, #1d2733)'
const MUTED = 'var(--muted, #58616e)'
const STAGE = 'var(--stage, #2f6fdb)'
const STAGE_TINT = 'var(--stage-tint, #dde7f7)'
const SECOND = 'var(--second, #c4432a)'
const GREEN = 'var(--success, #267b53)'
const PAPER = '#fffcf6'
const SOFT = '#fbebc0'
const SERIF = 'Fraunces, serif'

const say = (eu: string, es: string, ar: string): LocalizedText => ({ eu, es, ar })
const pick = (language: UnitLanguage, text: LocalizedText) => pickText(language, text)

/* ---------- Long division ---------- */

export function LongDivisionFigure({ language }: { language: UnitLanguage }) {
    // (3x² − 11x + 5) : (x + 6) = 3x − 29, remainder 179
    const rows: Array<{ text: string; x: number; y: number; color?: string; line?: boolean }> = [
        { text: '3x² − 11x + 5', x: 60, y: 50 },
        { text: '−3x² − 18x', x: 60, y: 84, color: MUTED, line: true },
        { text: '− 29x + 5', x: 112, y: 120 },
        { text: '+ 29x + 174', x: 112, y: 154, color: MUTED, line: true },
        { text: '179', x: 236, y: 190, color: SECOND }
    ]
    return (
        <Figure height={290} label={pick(language, say('(3x² − 11x + 5) : (x + 6): zatidura 3x − 29, hondarra 179', '(3x² − 11x + 5) : (x + 6): cociente 3x − 29, resto 179', '(3x² − 11x + 5) : (x + 6): خارج القسمة 3x − 29 والباقي 179'))}>
            {rows.map((row, index) => (
                <g key={index}>
                    <text x={row.x} y={row.y} fontSize={22} fontWeight={700} fill={row.color ?? INK} fontFamily={SERIF}>{row.text}</text>
                    {row.line && <line x1={row.x} x2={row.x + 190} y1={row.y + 10} y2={row.y + 10} stroke={INK} strokeWidth={1.6} />}
                </g>
            ))}
            <line x1={330} x2={330} y1={24} y2={110} stroke={INK} strokeWidth={2} />
            <line x1={330} x2={520} y1={60} y2={60} stroke={INK} strokeWidth={2} />
            <text x={350} y={50} fontSize={22} fontWeight={700} fill={STAGE} fontFamily={SERIF}>x + 6</text>
            <text x={350} y={92} fontSize={22} fontWeight={700} fill={GREEN} fontFamily={SERIF}>3x − 29</text>
            <Label x={560} y={50} fontSize={14} fill={MUTED}>{pick(language, say('zatitzailea', 'divisor', 'المقسوم عليه'))}</Label>
            <Label x={560} y={92} fontSize={14} fill={MUTED}>{pick(language, say('zatidura', 'cociente', 'خارج القسمة'))}</Label>
            <Label x={290} y={190} fontSize={14} fill={MUTED}>{pick(language, say('hondarra', 'resto', 'الباقي'))}</Label>
            <text x={360} y={240} textAnchor="middle" fontSize={19} fontWeight={700} fill={STAGE}>3x² − 11x + 5 = (x + 6)(3x − 29) + 179</text>
            <Caption y={276} language={language} text={say('Zatikizuna = zatitzailea · zatidura + hondarra', 'Dividendo = divisor · cociente + resto', 'المقسوم = المقسوم عليه · خارج القسمة + الباقي')} />
        </Figure>
    )
}

/* ---------- The Ruffini table ---------- */

/** A Ruffini table: coefficients, the root on the left, the products and the bottom row */
function RuffiniTable({ x, y, root, top, middle, bottom, cell = 64 }: { x: number; y: number; root: string; top: string[]; middle: string[]; bottom: string[]; cell?: number }) {
    const width = top.length * cell
    return (
        <g>
            {top.map((value, index) => <text key={`t${index}`} x={x + 30 + index * cell + cell / 2} y={y} textAnchor="middle" fontSize={21} fontWeight={700} fill={INK}>{value}</text>)}
            <text x={x + 12} y={y + 40} textAnchor="middle" fontSize={21} fontWeight={700} fill={STAGE}>{root}</text>
            {middle.map((value, index) => value && <text key={`m${index}`} x={x + 30 + index * cell + cell / 2} y={y + 40} textAnchor="middle" fontSize={19} fill={STAGE}>{value}</text>)}
            <line x1={x + 30} x2={x + 30} y1={y - 26} y2={y + 84} stroke={INK} strokeWidth={2} />
            <line x1={x - 4} x2={x + 36 + width} y1={y + 54} y2={y + 54} stroke={INK} strokeWidth={2} />
            {bottom.map((value, index) => <text key={`b${index}`} x={x + 30 + index * cell + cell / 2} y={y + 80} textAnchor="middle" fontSize={21} fontWeight={700} fill={index === bottom.length - 1 ? SECOND : GREEN}>{value}</text>)}
        </g>
    )
}

export function RuffiniFigure({ language }: { language: UnitLanguage }) {
    // (x³ − 7x² + 9x − 3) : (x − 5)
    return (
        <Figure height={290} label={pick(language, say('Ruffini: (x³ − 7x² + 9x − 3) : (x − 5), zatidura x² − 2x − 1, hondarra −8', 'Ruffini: (x³ − 7x² + 9x − 3) : (x − 5), cociente x² − 2x − 1, resto −8', 'روفيني: (x³ − 7x² + 9x − 3) : (x − 5)، خارج القسمة x² − 2x − 1 والباقي −8'))}>
            <RuffiniTable x={150} y={56} root="5" top={['1', '−7', '9', '−3']} middle={['', '5', '−10', '−5']} bottom={['1', '−2', '−1', '−8']} />
            <path d="M212 140 q 30 -30 50 -50" fill="none" stroke={MUTED} strokeWidth={1.6} strokeDasharray="4 4" />
            <Label x={470} y={70} fontSize={14} fill={MUTED}>{pick(language, say('koefizienteak', 'coeficientes', 'المعاملات'))}</Label>
            <Label x={470} y={110} fontSize={14} fill={STAGE}>{pick(language, say('bider 5', 'por 5', 'في 5'))}</Label>
            <Label x={470} y={140} fontSize={14} fill={GREEN}>{pick(language, say('batu', 'suma', 'اجمع'))}</Label>
            <text x={360} y={200} textAnchor="middle" fontSize={20} fontWeight={700} fill={GREEN}>C(x) = x² − 2x − 1</text>
            <text x={360} y={232} textAnchor="middle" fontSize={20} fontWeight={700} fill={SECOND}>R = −8</text>
            <Caption y={276} language={language} text={say('Jaitsi lehena; gero bider a eta batu, behin eta berriz', 'Baja el primero; luego multiplica por a y suma, una y otra vez', 'أنزل الأول، ثم اضرب في a واجمع، مرة بعد مرة')} />
        </Figure>
    )
}

/* ---------- The remainder theorem ---------- */

export function RemainderFigure({ language }: { language: UnitLanguage }) {
    // M(x) = x⁴ − 8x³ + 15x² + 7x + 8 at x = 4
    return (
        <Figure height={300} label={pick(language, say('M(4) = 20 eta M(x) : (x − 4) zatiketaren hondarra 20', 'M(4) = 20 y el resto de M(x) : (x − 4) es 20', 'M(4) = 20 وباقي M(x) : (x − 4) هو 20'))}>
            <text x={360} y={34} textAnchor="middle" fontSize={20} fontWeight={700} fill={INK}>M(x) = x⁴ − 8x³ + 15x² + 7x + 8</text>
            <RuffiniTable x={30} y={86} root="4" top={['1', '−8', '15', '7', '8']} middle={['', '4', '−16', '−4', '12']} bottom={['1', '−4', '−1', '3', '20']} cell={52} />
            <text x={530} y={110} textAnchor="middle" fontSize={18} fill={INK}>M(4) = 256 − 512</text>
            <text x={530} y={138} textAnchor="middle" fontSize={18} fill={INK}>+ 240 + 28 + 8</text>
            <text x={530} y={172} textAnchor="middle" fontSize={22} fontWeight={700} fill={SECOND}>M(4) = 20</text>
            <rect x={262} y={146} width={52} height={34} rx={8} fill="none" stroke={SECOND} strokeWidth={2.4} />
            <path d="M318 163 h120" fill="none" stroke={SECOND} strokeWidth={2} strokeDasharray="6 5" />
            <text x={360} y={238} textAnchor="middle" fontSize={21} fontWeight={700} fill={STAGE}>R = P(a)</text>
            <Caption y={282} language={language} text={say('P(x) : (x − a) zatiketaren hondarra P(a) da', 'El resto de P(x) : (x − a) es el valor P(a)', 'باقي قسمة P(x) على (x − a) هو القيمة P(a)')} />
        </Figure>
    )
}

/* ---------- Roots on the graph ---------- */

export function RootsFigure({ language }: { language: UnitLanguage }) {
    const ox = 140
    const oy = 150
    const ux = 110
    const uy = 16
    const p = (t: number) => (t - 1) * (t - 2) * (t - 3)
    const points = Array.from({ length: 81 }, (_, index) => -0.1 + (index * 4.05) / 80).map((t) => `${ox + t * ux},${oy - p(t) * uy}`).join(' ')
    return (
        <Figure height={300} label={pick(language, say('P(x) = x³ − 6x² + 11x − 6 grafikoa: erroak 1, 2 eta 3', 'Gráfica de P(x) = x³ − 6x² + 11x − 6: raíces 1, 2 y 3', 'منحنى P(x) = x³ − 6x² + 11x − 6: الجذور 1 و2 و3'))}>
            <line x1={ox - 30} x2={ox + 4.4 * ux} y1={oy} y2={oy} stroke={INK} strokeWidth={1.6} />
            <line x1={ox} x2={ox} y1={oy + 7 * uy} y2={oy - 7.5 * uy} stroke={INK} strokeWidth={1.6} />
            {[1, 2, 3, 4].map((t) => <text key={t} x={ox + t * ux} y={oy + 22} textAnchor="middle" fontSize={14} fill={MUTED}>{t}</text>)}
            <polyline points={points} fill="none" stroke={STAGE} strokeWidth={3} />
            {[1, 2, 3].map((t) => <circle key={t} cx={ox + t * ux} cy={oy} r={7} fill={SECOND} stroke={INK} strokeWidth={1.4} />)}
            <text x={ox + 4.1 * ux} y={40} textAnchor="end" fontSize={19} fontWeight={700} fill={STAGE}>P(x) = (x − 1)(x − 2)(x − 3)</text>
            <text x={ox - 10} y={oy + 6 * uy} textAnchor="end" fontSize={14} fill={MUTED}>−6</text>
            <Caption y={268} language={language} text={say('Erroak: P(a) = 0, grafikoak ardatza mozten duen tokia', 'Raíces: P(a) = 0, donde la gráfica corta el eje', 'الجذور: P(a) = 0، حيث يقطع المنحنى المحور')} />
            <Caption y={290} language={language} text={say('Erro osoak gai askearen (−6) zatitzaileen artean daude', 'Las raíces enteras están entre los divisores del término independiente (−6)', 'الجذور الصحيحة بين قواسم الحد الثابت (−6)')} />
        </Figure>
    )
}

/* ---------- Factorising with Ruffini ---------- */

export function FactorizeFigure({ language }: { language: UnitLanguage }) {
    return (
        <Figure height={316} label={pick(language, say('x³ − 6x² + 11x − 6 = (x − 1)(x − 2)(x − 3)', 'x³ − 6x² + 11x − 6 = (x − 1)(x − 2)(x − 3)', 'x³ − 6x² + 11x − 6 = (x − 1)(x − 2)(x − 3)'))}>
            <RuffiniTable x={70} y={40} root="1" top={['1', '−6', '11', '−6']} middle={['', '1', '−5', '6']} bottom={['1', '−5', '6', '0']} cell={56} />
            <RuffiniTable x={70} y={146} root="2" top={['', '', '', '']} middle={['', '2', '−6', '']} bottom={['1', '−3', '0', '']} cell={56} />
            <text x={430} y={60} fontSize={18} fontWeight={700} fill={GREEN}>x − 1</text>
            <text x={430} y={166} fontSize={18} fontWeight={700} fill={GREEN}>x − 2</text>
            <text x={430} y={226} fontSize={18} fontWeight={700} fill={GREEN}>x − 3</text>
            <rect x={60} y={246} width={600} height={30} rx={8} fill={SOFT} stroke={INK} strokeWidth={1.4} />
            <text x={360} y={268} textAnchor="middle" fontSize={19} fontWeight={700} fill={INK}>x³ − 6x² + 11x − 6 = (x − 1)(x − 2)(x − 3)</text>
            <Caption y={302} language={language} text={say('Hondarra 0 den bakoitzean, faktore bat; jarraitu zatiduraren gainean', 'Cada resto 0 da un factor; se sigue con el cociente', 'كل باقٍ يساوي صفرًا يعطي عاملًا؛ ونتابع مع خارج القسمة')} />
        </Figure>
    )
}

/* ---------- An algebraic fraction ---------- */

export function AlgebraicFractionFigure({ language }: { language: UnitLanguage }) {
    const fractionAt = (x: number, top: string, bottom: string, color = INK) => (
        <g>
            <text x={x} y={86} textAnchor="middle" fontSize={22} fontWeight={700} fill={color} fontFamily={SERIF}>{top}</text>
            <line x1={x - 110} x2={x + 110} y1={98} y2={98} stroke={INK} strokeWidth={2} />
            <text x={x} y={128} textAnchor="middle" fontSize={22} fontWeight={700} fill={color} fontFamily={SERIF}>{bottom}</text>
        </g>
    )
    return (
        <Figure height={250} label={pick(language, say('(x³ + 5x²) / (x² + 5x) = x', '(x³ + 5x²) / (x² + 5x) = x', '(x³ + 5x²) / (x² + 5x) = x'))}>
            {fractionAt(130, 'x³ + 5x²', 'x² + 5x')}
            <text x={262} y={106} textAnchor="middle" fontSize={24} fill={MUTED}>=</text>
            {fractionAt(400, 'x² · (x + 5)', 'x · (x + 5)')}
            <line x1={430} x2={500} y1={92} y2={66} stroke={SECOND} strokeWidth={2.4} />
            <line x1={410} x2={480} y1={136} y2={110} stroke={SECOND} strokeWidth={2.4} />
            <text x={540} y={106} textAnchor="middle" fontSize={24} fill={MUTED}>=</text>
            <text x={600} y={108} textAnchor="middle" fontSize={28} fontWeight={700} fill={GREEN} fontFamily={SERIF}>x</text>
            <Caption y={196} language={language} text={say('Lehenik faktorizatu goian eta behean; gero faktore komunak sinplifikatu', 'Primero factoriza arriba y abajo; después simplifica los factores comunes', 'حلّل البسط والمقام أولًا، ثم اختصر العوامل المشتركة')} />
            <Caption y={226} language={language} text={say('Gaiak ez dira inoiz sinplifikatzen, faktoreak bakarrik', 'Nunca se simplifican sumandos, solo factores', 'لا نختصر الحدود المجموعة أبدًا، بل العوامل فقط')} />
        </Figure>
    )
}

/* ---------- Simplifying before an equation ---------- */

export function SimplifyFigure({ language }: { language: UnitLanguage }) {
    const lines = [
        { text: '(x − 1)(x + 1) + (x − 2)² − 3', color: INK },
        { text: '= x² − 1 + x² − 4x + 4 − 3', color: STAGE },
        { text: '= 2x² − 4x', color: GREEN }
    ]
    return (
        <Figure height={240} label={pick(language, say('(x − 1)(x + 1) + (x − 2)² − 3 = 2x² − 4x', '(x − 1)(x + 1) + (x − 2)² − 3 = 2x² − 4x', '(x − 1)(x + 1) + (x − 2)² − 3 = 2x² − 4x'))}>
            {lines.map((line, index) => <text key={index} x={120} y={52 + index * 46} fontSize={24} fontWeight={700} fill={line.color} fontFamily={SERIF}>{line.text}</text>)}
            <Label x={560} y={98} fontSize={14} fill={STAGE}>{pick(language, say('identitateak', 'identidades', 'المتطابقات'))}</Label>
            <Label x={560} y={144} fontSize={14} fill={GREEN}>{pick(language, say('antzekoak batu', 'agrupa semejantes', 'اجمع المتشابهة'))}</Label>
            <Caption y={204} language={language} text={say('Parentesiak kendu, identitateak garatu eta antzeko gaiak batu', 'Quita paréntesis, desarrolla las identidades y agrupa términos semejantes', 'أزل الأقواس وانشر المتطابقات واجمع الحدود المتشابهة')} />
        </Figure>
    )
}

/* ---------- A rectangle with a fixed perimeter ---------- */

export function RectangleProblemFigure({ language }: { language: UnitLanguage }) {
    return (
        <Figure height={270} label={pick(language, say('Perimetroa 200 m: aldeak x eta 100 − x, azalera x(100 − x)', 'Perímetro 200 m: lados x y 100 − x, área x(100 − x)', 'المحيط 200 م: الضلعان x و100 − x، والمساحة x(100 − x)'))}>
            <rect x={160} y={40} width={300} height={130} fill={STAGE_TINT} stroke={INK} strokeWidth={2.4} />
            <text x={310} y={30} textAnchor="middle" fontSize={20} fontWeight={700} fill={STAGE} fontStyle="italic">x</text>
            <text x={474} y={112} fontSize={20} fontWeight={700} fill={SECOND}>100 − x</text>
            <text x={310} y={114} textAnchor="middle" fontSize={22} fontWeight={700} fill={INK} fontFamily={SERIF}>x(100 − x)</text>
            <text x={360} y={208} textAnchor="middle" fontSize={20} fontWeight={700} fill={GREEN}>A = 100x − x²</text>
            <Caption y={248} language={language} text={say('Perimetroa 200 m bada, bi alde jarraiak 100 m dira guztira', 'Si el perímetro es 200 m, dos lados contiguos suman 100 m', 'إذا كان المحيط 200 م فمجموع ضلعين متجاورين 100 م')} />
        </Figure>
    )
}

/* ---------- Hero art: a Ruffini table, a factorisation and a graph ---------- */

export function PolynomialsHeroArt() {
    return (
        <div className="fraction-v2-collage" aria-hidden="true">
            <svg viewBox="0 0 520 400" direction="ltr" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                <g transform="translate(30 36) rotate(-4)">
                    <rect width={250} height={140} rx={16} fill={PAPER} stroke={INK} strokeWidth={2} />
                    {['1', '−6', '11', '−6'].map((value, index) => <text key={index} x={70 + index * 46} y={40} textAnchor="middle" fontSize={18} fontWeight={700} fill={INK}>{value}</text>)}
                    {['1', '−5', '6'].map((value, index) => <text key={index} x={116 + index * 46} y={76} textAnchor="middle" fontSize={16} fill="#2f6fdb">{value}</text>)}
                    {['1', '−5', '6', '0'].map((value, index) => <text key={index} x={70 + index * 46} y={116} textAnchor="middle" fontSize={18} fontWeight={700} fill={index === 3 ? '#c4432a' : '#267b53'}>{value}</text>)}
                    <text x={26} y={76} textAnchor="middle" fontSize={18} fontWeight={700} fill="#2f6fdb">1</text>
                    <line x1={44} x2={44} y1={18} y2={126} stroke={INK} strokeWidth={2} />
                    <line x1={14} x2={232} y1={90} y2={90} stroke={INK} strokeWidth={2} />
                </g>
                <g transform="translate(300 60) rotate(5)">
                    <rect width={190} height={130} rx={16} fill="#d6eddf" stroke={INK} strokeWidth={2} />
                    <line x1={14} x2={176} y1={70} y2={70} stroke={INK} strokeWidth={1.6} />
                    <path d="M20 120 C 60 -10, 80 40, 95 70 S 130 110, 170 10" fill="none" stroke="#2f6fdb" strokeWidth={3} />
                    {[58, 95, 136].map((x) => <circle key={x} cx={x} cy={70} r={6} fill="#c4432a" stroke={INK} strokeWidth={1.2} />)}
                </g>
                <g transform="translate(40 240) rotate(2)">
                    <rect width={440} height={80} rx={16} fill="#fbebc0" stroke={INK} strokeWidth={2} />
                    <text x={220} y={50} textAnchor="middle" fontSize={24} fontWeight={700} fill={INK} fontFamily={SERIF}>(x − 1)(x − 2)(x − 3)</text>
                </g>
            </svg>
        </div>
    )
}
