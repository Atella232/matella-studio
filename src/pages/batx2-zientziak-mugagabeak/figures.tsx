import type { ReactNode } from 'react'
import { pickText, type LocalizedText, type UnitLanguage } from '../../features/unit-v2/types'
import { Label } from '../dbh2-funtzioak-v2/plane'
import { Figure } from '../dbh2-zatikiak-prototype/figures'
import { BLUE, INK, MUTED, PAPER, RED, SERIF, STAGE, STAGE_TINT, VIOLET, say, trig } from './figureKit'
import { AreaPlot, ArrowHead, Back, F, TableFigure, Up } from './plot'

/* ==========================================================================
   Integral mugagabeak · Batxilergoa 2 · Zientziak — the lesson figures:
   tables of integrals, the u / dv cards of integration by parts and its
   table of derivatives and integrals, the identities of a division and of
   partial fractions, the steps of a substitution, the graph of sin² x
   around ½, a decision chart of methods and the family of antiderivatives
   fixed by a slope and a point. Spanish writes sen, tg, arcsen and arctg,
   and Basque tg and arctg, as in the rest of Bachillerato.
   ========================================================================== */

const pick = (language: UnitLanguage) => (text: LocalizedText) => pickText(language, text)

/* ---------- 1. The table of 1.º, in two columns ---------- */

export function ImmediateTableFigure({ language }: { language: UnitLanguage }) {
    const t = pick(language)
    const { sin, tan, arctan } = trig(language)
    const rows: Array<[ReactNode, ReactNode]> = [
        [<>x<Up>n</Up><Back /></>, <>x<Up>n+1</Up><Back />/ (n+1)</>],
        ['1 / x', 'ln |x|'],
        [<>e<Up>x</Up><Back /></>, <>e<Up>x</Up><Back /></>],
        [<>a<Up>x</Up><Back /></>, <>a<Up>x</Up><Back />/ ln a</>],
        ['cos x', `${sin} x`],
        [`${sin} x`, '−cos x'],
        ['1 / cos² x', `${tan} x`],
        ['1 / (1 + x²)', `${arctan} x`]
    ]
    return (
        <Figure height={368} label={t(say('Integral berehalakoen taula, bi zutabetan; guztiei + k gehitzen zaie', 'La tabla de integrales inmediatas en dos columnas; a todas se les suma + k', 'جدول التكاملات المباشرة في عمودين، ونضيف + k إلى كل منها', 'The table of basic integrals in two columns; + k is added to all of them'))}>
            {rows.map(([fn, integral], index) => {
                const x = index < 4 ? 26 : 374
                const y = 26 + (index % 4) * 72
                return (
                    <g key={index}>
                        <rect x={x} y={y} width={320} height={60} rx={14} fill={index === 5 ? STAGE_TINT : PAPER} stroke={STAGE} strokeWidth={2.2} />
                        <F x={x + 78} y={y + 38} anchor="middle" size={21}>{fn}</F>
                        <F x={x + 158} y={y + 38} anchor="middle" size={21} color={STAGE}>→</F>
                        <F x={x + 238} y={y + 38} anchor="middle" size={21} color={index === 5 ? RED : INK}>{integral}</F>
                    </g>
                )
            })}
            <Label x={360} y={350} textAnchor="middle" fontSize={17} fill={MUTED}>{t(say('Deribatuen taula alderantziz, eta + k', 'La tabla de derivadas al revés, y + k', 'جدول المشتقات بالعكس، و + k', 'The table of derivatives backwards, and + k'))}</Label>
        </Figure>
    )
}

/* ---------- 2. The same table with u ---------- */

export function ComposedTableFigure({ language }: { language: UnitLanguage }) {
    const { sin, tan } = trig(language)
    return (
        <TableFigure
            language={language}
            label={say('Integral konposatuen taula: u′ kanpoan eta u barruan', 'La tabla de integrales compuestas: u′ fuera y u dentro', 'جدول التكاملات المركّبة: u′ في الخارج و u في الداخل', 'The table of composite integrals: u′ outside and u inside')}
            rows={[
                { key: 'cos', fn: 'u′ · cos u', integral: `${sin} u` },
                { key: 'sin', fn: `u′ · ${sin} u`, integral: '−cos u', strong: true },
                { key: 'tan', fn: 'u′ / cos² u', integral: `${tan} u` },
                { key: 'exp', fn: <>u′ · e<Up>u</Up><Back /></>, integral: <>e<Up>u</Up></> }
            ]}
            caption={say('Barruan u eta kanpoan u′: taula bera', 'Dentro u y fuera u′: la misma tabla', 'u في الداخل و u′ في الخارج: الجدول نفسه', 'u inside and u′ outside: the same table')}
        />
    )
}

/* ---------- 3. Arctangent and arcsine with u, and a² taken out ---------- */

export function ArcsComposedFigure({ language }: { language: UnitLanguage }) {
    const { arcsin, arctan } = trig(language)
    return (
        <TableFigure
            language={language}
            label={say('u′/(1 + u²) eta u′/√(1 − u²); 1/(9 + x²) integralaren emaitza ⅓ arctg (x/3) da', 'u′/(1 + u²) y u′/√(1 − u²); la integral de 1/(9 + x²) es ⅓ arctg (x/3)', 'u′/(1 + u²) و u′/√(1 − u²)؛ وتكامل 1/(9 + x²) هو ⅓ arctan (x/3)', 'u′/(1 + u²) and u′/√(1 − u²); the integral of 1/(9 + x²) is ⅓ arctan (x/3)')}
            rows={[
                { key: 'atan', fn: 'u′ / (1 + u²)', integral: `${arctan} u` },
                { key: 'asin', fn: 'u′ / √(1 − u²)', integral: `${arcsin} u` },
                { key: 'nine', fn: '1 / (9 + x²)', integral: `⅓ ${arctan} (x/3)`, note: '9 + x² = 9 (1 + (x/3)²)', strong: true }
            ]}
            caption={say('Faktore komuna atera, 1 + u² izateko', 'Se saca factor común para tener 1 + u²', 'نخرج عاملًا مشتركًا لنحصل على 1 + u²', 'Take out a common factor to get 1 + u²')}
        />
    )
}

/* ---------- 4 and 6. The u / dv card of integration by parts ---------- */

function PartsCard({ language, label, u, du, dv, v, result, caption, id }: {
    language: UnitLanguage
    label: LocalizedText
    u: ReactNode
    du: ReactNode
    dv: ReactNode
    v: ReactNode
    result: ReactNode
    caption: LocalizedText
    id: string
}) {
    const t = pick(language)
    const box = (x: number, y: number, stroke: string, fill: string, content: ReactNode) => (
        <g>
            <rect x={x} y={y} width={260} height={62} rx={14} fill={fill} stroke={stroke} strokeWidth={2.4} />
            <F x={x + 130} y={y + 40} anchor="middle" size={23}>{content}</F>
        </g>
    )
    return (
        <Figure height={356} label={t(label)}>
            <defs>
                <ArrowHead id={`${id}-stage`} color={STAGE} />
                <ArrowHead id={`${id}-blue`} color={BLUE} />
            </defs>
            {box(70, 24, STAGE, STAGE_TINT, u)}
            {box(390, 24, BLUE, PAPER, dv)}
            <line x1={200} y1={92} x2={200} y2={134} stroke={STAGE} strokeWidth={2.4} markerEnd={`url(#${id}-stage)`} />
            <line x1={520} y1={92} x2={520} y2={134} stroke={BLUE} strokeWidth={2.4} markerEnd={`url(#${id}-blue)`} />
            <Label x={214} y={119} fontSize={15} fill={STAGE}>{t(say('deribatu', 'derivar', 'اشتقاق', 'differentiate'))}</Label>
            <Label x={534} y={119} fontSize={15} fill={BLUE}>{t(say('integratu', 'integrar', 'تكامل', 'integrate'))}</Label>
            {box(70, 142, STAGE, PAPER, du)}
            {box(390, 142, BLUE, STAGE_TINT, v)}
            <rect x={70} y={226} width={580} height={56} rx={14} fill={PAPER} stroke={INK} strokeWidth={2} />
            <F x={360} y={262} anchor="middle" size={23}>∫ u dv = <tspan fill={STAGE}>u</tspan> · <tspan fill={BLUE}>v</tspan> − ∫ <tspan fill={BLUE}>v</tspan> <tspan fill={STAGE}>du</tspan></F>
            <F x={360} y={316} anchor="middle" size={21}>{result}</F>
            <Label x={360} y={346} textAnchor="middle" fontSize={16} fill={MUTED}>{t(caption)}</Label>
        </Figure>
    )
}

export function PartsFigure({ language }: { language: UnitLanguage }) {
    return (
        <PartsCard
            id="parts-exp"
            language={language}
            label={say('∫ x eˣ dx zatika: u = x eta dv = eˣ dx; emaitza eˣ (x − 1) + k', '∫ x eˣ dx por partes: u = x y dv = eˣ dx; resultado eˣ (x − 1) + k', '∫ x eˣ dx بالتجزئة: u = x و dv = eˣ dx؛ والنتيجة eˣ (x − 1) + k', '∫ x eˣ dx by parts: u = x and dv = eˣ dx; result eˣ (x − 1) + k')}
            u="u = x"
            du="du = dx"
            dv={<>dv = e<Up>x</Up><Back />dx</>}
            v={<>v = e<Up>x</Up></>}
            result={<>x e<Up>x</Up><Back />− ∫ e<Up>x</Up><Back />dx = e<Up>x</Up><Back />(x − 1) + k</>}
            caption={say('u deribatzean sinplifikatzen da; dv integratzen dakigu', 'u se simplifica al derivar; dv sabemos integrarlo', 'u تبسط بالاشتقاق، و dv نعرف تكامله', 'u gets simpler when differentiated; dv we know how to integrate')}
        />
    )
}

export function LogPartsFigure({ language }: { language: UnitLanguage }) {
    return (
        <PartsCard
            id="parts-log"
            language={language}
            label={say('∫ ln x dx zatika: u = ln x eta dv = dx; emaitza x ln x − x + k', '∫ ln x dx por partes: u = ln x y dv = dx; resultado x ln x − x + k', '∫ ln x dx بالتجزئة: u = ln x و dv = dx؛ والنتيجة x ln x − x + k', '∫ ln x dx by parts: u = ln x and dv = dx; result x ln x − x + k')}
            u="u = ln x"
            du="du = dx / x"
            dv="dv = dx"
            v="v = x"
            result="x ln x − ∫ x · (1/x) dx = x ln x − x + k"
            caption={say('Beste faktorea 1 da: dv = dx', 'El otro factor es 1: dv = dx', 'العامل الآخر هو 1: dv = dx', 'The other factor is 1: dv = dx')}
        />
    )
}

/* ---------- 5. Twice by parts: differentiate x² down to 0, integrate eˣ ---------- */

export function PartsTableFigure({ language }: { language: UnitLanguage }) {
    const t = pick(language)
    const left = [<>x<Up>2</Up></>, '2x', '2', '0']
    const signs = ['+', '−', '+']
    const exp = <>e<Up>x</Up></>
    return (
        <Figure height={392} label={t(say('Taula: x² deribatu 0 lortu arte eta eˣ integratu; zeinuak txandakatuz, eˣ (x² − 2x + 2) + k', 'Tabla: se deriva x² hasta 0 y se integra eˣ; con signos alternos, eˣ (x² − 2x + 2) + k', 'جدول: نشتق x² حتى 0 ونكامل eˣ؛ وبإشارات متناوبة eˣ (x² − 2x + 2) + k', 'Table: differentiate x² down to 0 and integrate eˣ; with alternating signs, eˣ (x² − 2x + 2) + k'))}>
            <defs>
                <ArrowHead id="parts-table-blue" color={BLUE} />
                <ArrowHead id="parts-table-red" color={RED} />
            </defs>
            <Label x={210} y={40} textAnchor="middle" fontSize={18} fontWeight={700} fill={STAGE}>{t(say('Deribatu (u)', 'Derivar (u)', 'اشتقاق (u)', 'Differentiate (u)'))}</Label>
            <Label x={510} y={40} textAnchor="middle" fontSize={18} fontWeight={700} fill={BLUE}>{t(say('Integratu (dv)', 'Integrar (dv)', 'تكامل (dv)', 'Integrate (dv)'))}</Label>
            {left.map((item, index) => {
                const y = 58 + index * 64
                return (
                    <g key={index}>
                        <rect x={130} y={y} width={160} height={48} rx={12} fill={index === 3 ? STAGE_TINT : PAPER} stroke={STAGE} strokeWidth={2.2} />
                        <F x={210} y={y + 32} anchor="middle" size={22}>{item}</F>
                        <rect x={430} y={y} width={160} height={48} rx={12} fill={PAPER} stroke={BLUE} strokeWidth={2.2} />
                        <F x={510} y={y + 32} anchor="middle" size={22}>{exp}</F>
                    </g>
                )
            })}
            {signs.map((sign, index) => {
                const y = 82 + index * 64
                const color = sign === '+' ? BLUE : RED
                return (
                    <g key={sign + index}>
                        <line x1={294} y1={y} x2={424} y2={y + 56} stroke={color} strokeWidth={2.4} markerEnd={`url(#parts-table-${sign === '+' ? 'blue' : 'red'})`} />
                        <F x={346} y={y + 22} anchor="middle" size={24} color={color}>{sign}</F>
                    </g>
                )
            })}
            <rect x={60} y={318} width={600} height={50} rx={14} fill={STAGE_TINT} stroke={STAGE} strokeWidth={2.4} />
            <F x={360} y={350} anchor="middle" size={21}>x² e<Up>x</Up><Back />− 2x e<Up>x</Up><Back />+ 2 e<Up>x</Up><Back />= e<Up>x</Up><Back />(x² − 2x + 2) + k</F>
            <Label x={360} y={386} textAnchor="middle" fontSize={16} fill={MUTED}>{t(say('Maila 0 izan arte jaisten da; zeinuak txandakatzen dira', 'Se baja el grado hasta 0; los signos alternan', 'تنزل الدرجة حتى 0، وتتناوب الإشارات', 'The degree goes down to 0; the signs alternate'))}</Label>
        </Figure>
    )
}

/* ---------- 7. Dividend = divisor · quotient + remainder ---------- */

export function DivisionFigure({ language }: { language: UnitLanguage }) {
    const t = pick(language)
    const parts: Array<{ x: number; text: string; color: string; name?: LocalizedText }> = [
        { x: 110, text: 'x² + 3', color: INK, name: say('zatikizuna', 'dividendo', 'المقسوم', 'dividend') },
        { x: 196, text: '=', color: INK },
        { x: 290, text: '(x − 1)', color: INK, name: say('zatitzailea', 'divisor', 'المقسوم عليه', 'divisor') },
        { x: 345, text: '·', color: INK },
        { x: 400, text: '(x + 1)', color: STAGE, name: say('zatidura', 'cociente', 'خارج القسمة', 'quotient') },
        { x: 506, text: '+', color: INK },
        { x: 590, text: '4', color: RED, name: say('hondarra', 'resto', 'الباقي', 'remainder') }
    ]
    return (
        <Figure height={322} label={t(say('x² + 3 = (x − 1)(x + 1) + 4; beraz (x² + 3)/(x − 1) = x + 1 + 4/(x − 1)', 'x² + 3 = (x − 1)(x + 1) + 4; así (x² + 3)/(x − 1) = x + 1 + 4/(x − 1)', 'x² + 3 = (x − 1)(x + 1) + 4؛ إذن (x² + 3)/(x − 1) = x + 1 + 4/(x − 1)', 'x² + 3 = (x − 1)(x + 1) + 4; so (x² + 3)/(x − 1) = x + 1 + 4/(x − 1)'))}>
            {parts.map((part) => (
                <g key={part.x}>
                    <F x={part.x} y={70} anchor="middle" size={26} color={part.color}>{part.text}</F>
                    {part.name && <Label x={part.x} y={106} textAnchor="middle" fontSize={15} fill={part.color === INK ? MUTED : part.color}>{t(part.name)}</Label>}
                </g>
            ))}
            <rect x={60} y={134} width={600} height={60} rx={14} fill={STAGE_TINT} stroke={STAGE} strokeWidth={2.4} />
            <F x={360} y={172} anchor="middle" size={23}>(x² + 3) / (x − 1) = <tspan fill={STAGE}>x + 1</tspan> + <tspan fill={RED}>4</tspan> / (x − 1)</F>
            <F x={360} y={240} anchor="middle" size={22}>∫ … dx = x²/2 + x + 4 ln |x − 1| + k</F>
            <Label x={360} y={296} textAnchor="middle" fontSize={17} fill={MUTED}>{t(say('Zatidura polinomio bat da; hondarrak logaritmo bat ematen du', 'El cociente es un polinomio; el resto da un logaritmo', 'خارج القسمة كثير حدود، والباقي يعطي لوغاريتمًا', 'The quotient is a polynomial; the remainder gives a logarithm'))}</Label>
        </Figure>
    )
}

/* ---------- 8. Each root cancels a term ---------- */

export function SimpleRootsFigure({ language }: { language: UnitLanguage }) {
    const t = pick(language)
    const card = (x: number, color: string, lines: string[]) => (
        <g>
            <rect x={x} y={92} width={300} height={150} rx={16} fill={PAPER} stroke={color} strokeWidth={2.4} />
            {lines.map((line, index) => <F key={line} x={x + 150} y={130 + index * 40} anchor="middle" size={22} color={index === 2 ? color : INK}>{line}</F>)}
        </g>
    )
    return (
        <Figure height={334} label={t(say('x + 5 = A(x + 2) + B(x − 1): x = 1 bada A = 2, eta x = −2 bada B = −1', 'x + 5 = A(x + 2) + B(x − 1): con x = 1 sale A = 2 y con x = −2, B = −1', 'x + 5 = A(x + 2) + B(x − 1): مع x = 1 يخرج A = 2 ومع x = −2 يخرج B = −1', 'x + 5 = A(x + 2) + B(x − 1): x = 1 gives A = 2 and x = −2 gives B = −1'))}>
            <F x={360} y={56} anchor="middle" size={24}>x + 5 = <tspan fill={BLUE}>A</tspan>(x + 2) + <tspan fill={VIOLET}>B</tspan>(x − 1)</F>
            {card(40, BLUE, ['x = 1', '6 = 3A + 0', 'A = 2'])}
            {card(380, VIOLET, ['x = −2', '3 = 0 − 3B', 'B = −1'])}
            <F x={360} y={286} anchor="middle" size={23}><tspan fill={BLUE}>2</tspan> ln |x − 1| <tspan fill={VIOLET}>−</tspan> ln |x + 2| + k</F>
            <Label x={360} y={322} textAnchor="middle" fontSize={17} fill={MUTED}>{t(say('Erro bakoitzak batugai bat anulatzen du', 'Cada raíz anula un sumando', 'كل جذر يعدم حدًّا', 'Each root cancels one term'))}</Label>
        </Figure>
    )
}

/* ---------- 9. A double root: a logarithm and a power ---------- */

export function DoubleRootFigure({ language }: { language: UnitLanguage }) {
    const t = pick(language)
    const card = (x: number, color: string, fraction: string, integral: string, name: LocalizedText) => (
        <g>
            <rect x={x} y={104} width={300} height={130} rx={16} fill={PAPER} stroke={color} strokeWidth={2.4} />
            <F x={x + 150} y={142} anchor="middle" size={23}>{fraction}</F>
            <F x={x + 150} y={184} anchor="middle" size={23} color={color}>→ {integral}</F>
            <Label x={x + 150} y={220} textAnchor="middle" fontSize={16} fill={MUTED}>{t(name)}</Label>
        </g>
    )
    return (
        <Figure height={330} label={t(say('(2x + 1)/(x − 1)² = A/(x − 1) + B/(x − 1)²: lehenengoak logaritmo bat ematen du, eta bigarrena berretura bat da', '(2x + 1)/(x − 1)² = A/(x − 1) + B/(x − 1)²: la primera da un logaritmo y la segunda es una potencia', '(2x + 1)/(x − 1)² = A/(x − 1) + B/(x − 1)²: الأول يعطي لوغاريتمًا والثاني قوة', '(2x + 1)/(x − 1)² = A/(x − 1) + B/(x − 1)²: the first gives a logarithm and the second is a power'))}>
            <F x={360} y={60} anchor="middle" size={24}>(2x + 1) / (x − 1)²  =  <tspan fill={BLUE}>A / (x − 1)</tspan> + <tspan fill={VIOLET}>B / (x − 1)²</tspan></F>
            {card(40, BLUE, 'A / (x − 1)', 'A ln |x − 1|', say('logaritmoa', 'logaritmo', 'لوغاريتم', 'logarithm'))}
            {card(380, VIOLET, 'B / (x − 1)²', '−B / (x − 1)', say('berretura', 'potencia', 'قوة', 'power'))}
            <F x={360} y={278} anchor="middle" size={22}>A = 2,  B = 3  →  2 ln |x − 1| − 3/(x − 1) + k</F>
            <Label x={360} y={318} textAnchor="middle" fontSize={17} fill={MUTED}>{t(say('Erro bikoitza: bi zatiki', 'Raíz doble: dos fracciones', 'جذر مضاعف: كسران', 'Double root: two fractions'))}</Label>
        </Figure>
    )
}

/* ---------- 10. No real roots: a logarithm and an arctangent ---------- */

export function ComplexRootsFigure({ language }: { language: UnitLanguage }) {
    const t = pick(language)
    const { arctan } = trig(language)
    const card = (x: number, color: string, fraction: string, integral: string, name: LocalizedText) => (
        <g>
            <rect x={x} y={104} width={316} height={130} rx={16} fill={PAPER} stroke={color} strokeWidth={2.4} />
            <F x={x + 158} y={142} anchor="middle" size={20}>{fraction}</F>
            <F x={x + 158} y={184} anchor="middle" size={20} color={color}>{integral}</F>
            <Label x={x + 158} y={220} textAnchor="middle" fontSize={16} fill={MUTED}>{t(name)}</Label>
        </g>
    )
    return (
        <Figure height={300} label={t(say('2x + 5 = (2x + 2) + 3: lehen zatiak logaritmo bat ematen du, eta bigarrenak arku tangente bat', '2x + 5 = (2x + 2) + 3: la primera parte da un logaritmo y la segunda una arcotangente', '2x + 5 = (2x + 2) + 3: الجزء الأول يعطي لوغاريتمًا والثاني قوس ظل', '2x + 5 = (2x + 2) + 3: the first part gives a logarithm and the second an arctangent'))}>
            <F x={360} y={60} anchor="middle" size={25}>2x + 5 = <tspan fill={BLUE}>(2x + 2)</tspan> + <tspan fill={VIOLET}>3</tspan></F>
            {card(28, BLUE, '(2x + 2) / (x² + 2x + 5)', 'ln (x² + 2x + 5)', say('u′/u: logaritmoa', 'u′/u: logaritmo', 'u′/u: لوغاريتم', 'u′/u: logarithm'))}
            {card(376, VIOLET, '3 / ((x + 1)² + 4)', `(3/2) ${arctan} ((x + 1)/2)`, say('karratua osatuta', 'completando el cuadrado', 'بإكمال المربع', 'completing the square'))}
            <Label x={360} y={284} textAnchor="middle" fontSize={17} fill={MUTED}>{t(say('Goian, behekoaren deribatua gehi zenbaki bat', 'Arriba, la derivada de abajo más un número', 'في الأعلى مشتقة الأسفل زائد عدد', 'On top, the derivative of the bottom plus a number'))}</Label>
        </Figure>
    )
}

/* ---------- 11. A substitution in three steps ---------- */

export function ChangeFigure({ language }: { language: UnitLanguage }) {
    const t = pick(language)
    const box = (x: number, color: string, fill: string, name: LocalizedText, formula: ReactNode) => (
        <g>
            <rect x={x} y={70} width={206} height={110} rx={16} fill={fill} stroke={color} strokeWidth={2.4} />
            <Label x={x + 103} y={100} textAnchor="middle" fontSize={15} fill={MUTED}>{t(name)}</Label>
            <F x={x + 103} y={146} anchor="middle" size={20}>{formula}</F>
        </g>
    )
    return (
        <Figure height={270} label={t(say('∫ (ln x)³/x dx: t = ln x, dt = dx/x; ∫ t³ dt = t⁴/4; emaitza (ln x)⁴/4 + k', '∫ (ln x)³/x dx: t = ln x, dt = dx/x; ∫ t³ dt = t⁴/4; resultado (ln x)⁴/4 + k', '∫ (ln x)³/x dx: t = ln x و dt = dx/x؛ ∫ t³ dt = t⁴/4؛ والنتيجة (ln x)⁴/4 + k', '∫ (ln x)³/x dx: t = ln x, dt = dx/x; ∫ t³ dt = t⁴/4; result (ln x)⁴/4 + k'))}>
            <defs><ArrowHead id="change-arrow" color={STAGE} /></defs>
            {box(14, INK, PAPER, say('x aldagaiaz', 'en x', 'بدلالة x', 'in x'), '∫ (ln x)³ / x dx')}
            {box(257, STAGE, STAGE_TINT, say('t letraz', 'en t', 'بدلالة t', 'in t'), <>∫ t³ dt = t<Up>4</Up><Back />/ 4</>)}
            {box(500, INK, PAPER, say('berriro x aldagaiaz', 'otra vez en x', 'بدلالة x من جديد', 'back in x'), <>(ln x)<Up>4</Up><Back />/ 4 + k</>)}
            <line x1={222} y1={125} x2={250} y2={125} stroke={STAGE} strokeWidth={2.4} markerEnd="url(#change-arrow)" />
            <line x1={465} y1={125} x2={493} y2={125} stroke={STAGE} strokeWidth={2.4} markerEnd="url(#change-arrow)" />
            <F x={236} y={52} anchor="middle" size={18} color={STAGE}>t = ln x</F>
            <F x={236} y={212} anchor="middle" size={18} color={STAGE}>dt = dx / x</F>
            <F x={479} y={52} anchor="middle" size={18} color={STAGE}>t → ln x</F>
            <Label x={360} y={256} textAnchor="middle" fontSize={17} fill={MUTED}>{t(say('dx ere aldatzen da, eta amaieran aldaketa desegiten da', 'También cambia dx, y al final se deshace el cambio', 'يتغير dx أيضًا، وفي النهاية نتراجع عن التعويض', 'dx changes too, and at the end the change is undone'))}</Label>
        </Figure>
    )
}

/* ---------- 12. Removing a root or an exponential ---------- */

export function RootsChangeFigure({ language }: { language: UnitLanguage }) {
    const t = pick(language)
    const row = (y: number, color: string, chip: ReactNode, formula: ReactNode, note: LocalizedText) => (
        <g>
            <rect x={30} y={y} width={130} height={64} rx={16} fill={STAGE_TINT} stroke={color} strokeWidth={2.4} />
            <F x={95} y={y + 42} anchor="middle" size={26}>{chip}</F>
            <F x={190} y={y + 30} size={22}>{formula}</F>
            <Label x={190} y={y + 58} fontSize={16} fill={MUTED}>{t(note)}</Label>
        </g>
    )
    return (
        <Figure height={250} label={t(say('√x bada: t = √x, x = t², dx = 2t dt. eˣ bada: t = eˣ, dx = dt/t. Bi kasuetan arrazional bat geratzen da', 'Con √x: t = √x, x = t², dx = 2t dt. Con eˣ: t = eˣ, dx = dt/t. En los dos queda una racional', 'مع √x: t = √x و x = t² و dx = 2t dt. ومع eˣ: t = eˣ و dx = dt/t. وفي الحالتين يبقى تكامل كسري', 'With √x: t = √x, x = t², dx = 2t dt. With eˣ: t = eˣ, dx = dt/t. Both leave a rational one'))}>
            {row(24, STAGE, '√x', <>t = √x,   x = t²,   dx = 2t dt</>, say('Erroa desagertu egiten da', 'La raíz desaparece', 'يختفي الجذر', 'The root disappears'))}
            {row(116, BLUE, <>e<Up>x</Up></>, <>t = e<Up>x</Up><Back />,  dx = dt / t</>, say('Esponentziala desagertu egiten da', 'La exponencial desaparece', 'تختفي الدالة الأسية', 'The exponential disappears'))}
            <Label x={360} y={232} textAnchor="middle" fontSize={17} fill={MUTED}>{t(say('Gero: integral arrazional bat', 'Después: una integral racional', 'ثم: تكامل كسري', 'Then: a rational integral'))}</Label>
        </Figure>
    )
}

/* ---------- 13. sin² x waves around ½ ---------- */

export function TrigPowersFigure({ language }: { language: UnitLanguage }) {
    const { sin } = trig(language)
    const square = (x: number) => Math.sin(x) ** 2
    return (
        <AreaPlot
            language={language}
            height={240}
            label={say('y = sin² x kurba ½ zuzenaren inguruan dabil: horregatik agertzen da x/2 integralean', 'La curva y = sen² x oscila alrededor de ½: por eso aparece x/2 en la integral', 'المنحنى y = sin² x يتأرجح حول ½: لذلك يظهر x/2 في التكامل', 'The curve y = sin² x waves around ½: that is why x/2 appears in the integral')}
            box={{ xMin: -1, xMax: 7, yMin: -1, yMax: 3 }}
            cell={36}
            units={[1, 0.5]}
            curves={[{ fn: () => 0.5, from: -1, to: 7, color: MUTED, dashed: true, width: 2.6 }, { fn: square, from: -0.9, to: 7 }]}
            marks={[{ at: [6.6, 0.68], text: '½', color: MUTED, size: 20 }]}
            notes={[
                { y: 72, formula: `${sin}² x = (1 − cos 2x) / 2`, size: 19 },
                { y: 110, formula: '= ½ − (cos 2x) / 2', size: 19 },
                { y: 164, text: say('Batez beste ½:', 'En promedio ½:', 'في المتوسط ½:', 'On average ½:'), size: 17 },
                { y: 202, formula: `∫ ${sin}² x dx = x/2 − (${sin} 2x)/4 + k`, color: STAGE, size: 18 }
            ]}
            notesX={344}
        />
    )
}

/* ---------- 14. Which method: four questions in order ---------- */

export function ChooseMethodFigure({ language }: { language: UnitLanguage }) {
    const t = pick(language)
    const { sin } = trig(language)
    const rows: Array<[LocalizedText, LocalizedText, string]> = [
        [say('Taulan dago, edo u′ kanpoan?', '¿Está en la tabla, o u′ fuera?', 'هل هو في الجدول أو u′ في الخارج؟', 'In the table, or u′ outside?'), say('Berehalakoa / konposatua', 'Inmediata / compuesta', 'مباشر / مركّب', 'Basic / composite'), BLUE],
        [say(`Polinomioa bider eˣ, ${sin}, cos, ln?`, `¿Polinomio por eˣ, ${sin}, cos, ln?`, `كثير حدود في eˣ أو ${sin} أو cos أو ln؟`, `Polynomial times eˣ, ${sin}, cos, ln?`), say('Zatika', 'Por partes', 'بالتجزئة', 'By parts'), VIOLET],
        [say('Polinomioen zatidura?', '¿Cociente de polinomios?', 'خارج قسمة كثيرَي حدود؟', 'Quotient of polynomials?'), say('Arrazionala', 'Racional', 'كسري', 'Rational'), '#a8781f'],
        [say('Erroak, edo eˣ baturetan?', '¿Raíces, o eˣ en sumas?', 'جذور، أو eˣ في مجاميع؟', 'Roots, or eˣ in sums?'), say('Aldagai-aldaketa', 'Cambio de variable', 'تغيير المتغير', 'Substitution'), RED]
    ]
    const yes = say('bai', 'sí', 'نعم', 'yes')
    const no = say('ez', 'no', 'لا', 'no')
    return (
        <Figure height={392} label={t(say('Lau galdera ordenan: taula edo konposatua, zatika, arrazionala, aldagai-aldaketa', 'Cuatro preguntas en orden: tabla o compuesta, partes, racional, cambio de variable', 'أربعة أسئلة بالترتيب: الجدول أو المركّب، التجزئة، الكسري، تغيير المتغير', 'Four questions in order: table or composite, parts, rational, substitution'))}>
            <defs>
                <ArrowHead id="choose-ink" color={INK} />
                <ArrowHead id="choose-muted" color={MUTED} />
            </defs>
            {rows.map(([question, method, color], index) => {
                const y = 20 + index * 88
                return (
                    <g key={index}>
                        <rect x={14} y={y} width={400} height={60} rx={14} fill={PAPER} stroke={INK} strokeWidth={2} />
                        <Label x={214} y={y + 37} textAnchor="middle" fontSize={17} fill={INK}>{t(question)}</Label>
                        <line x1={418} y1={y + 30} x2={452} y2={y + 30} stroke={INK} strokeWidth={2.2} markerEnd="url(#choose-ink)" />
                        <Label x={434} y={y + 20} textAnchor="middle" fontSize={14} fill={MUTED}>{t(yes)}</Label>
                        <rect x={458} y={y + 4} width={250} height={52} rx={26} fill={STAGE_TINT} stroke={color} strokeWidth={2.6} />
                        <Label x={583} y={y + 36} textAnchor="middle" fontSize={15} fontWeight={700} fill={color}>{t(method)}</Label>
                        {index < rows.length - 1 && (
                            <g>
                                <line x1={214} y1={y + 62} x2={214} y2={y + 84} stroke={MUTED} strokeWidth={2.2} markerEnd="url(#choose-muted)" />
                                <Label x={228} y={y + 78} fontSize={14} fill={MUTED}>{t(no)}</Label>
                            </g>
                        )}
                    </g>
                )
            })}
            <Label x={360} y={380} textAnchor="middle" fontSize={16} fill={MUTED}>{t(say('Galdetu goitik behera', 'Pregunta de arriba abajo', 'اسأل من الأعلى إلى الأسفل', 'Ask from top to bottom'))}</Label>
        </Figure>
    )
}

/* ---------- 15. The slope and the point fix k₁ and k₂ ---------- */

export function ConditionsFigure({ language }: { language: UnitLanguage }) {
    const family = (k: number) => (x: number) => x ** 3 - x ** 2 + 2 * x + k
    return (
        <AreaPlot
            language={language}
            height={330}
            label={say('y = x³ − x² + 2x + k₂ familia; k₂ = 3 kurbak bakarrik pasatzen du (1, 5) puntutik, 3 maldarekin', 'La familia y = x³ − x² + 2x + k₂; solo k₂ = 3 pasa por (1, 5), con pendiente 3', 'العائلة y = x³ − x² + 2x + k₂؛ وحده k₂ = 3 يمر بالنقطة (1, 5) بميل 3', 'The family y = x³ − x² + 2x + k₂; only k₂ = 3 goes through (1, 5), with slope 3')}
            box={{ xMin: -2, xMax: 3, yMin: -1, yMax: 6 }}
            cell={36}
            units={[1, 2]}
            labelStep={1}
            curves={[
                { fn: family(0), from: -1.8, to: 2.4, color: MUTED, dashed: true, width: 2.8 },
                { fn: family(6), from: -1.8, to: 2.4, color: MUTED, dashed: true, width: 2.8 },
                { fn: family(3), from: -1.8, to: 2.4 },
                { fn: (x) => 3 * x + 2, from: 0.2, to: 1.8, color: RED, width: 3 }
            ]}
            dots={[{ at: [1, 5], color: RED, name: '(1, 5)' }]}
            notes={[
                { y: 70, formula: 'f′(x) = 3x² − 2x + k₁', size: 19 },
                { y: 106, formula: 'f′(1) = 3  →  k₁ = 2', color: RED, size: 19 },
                { y: 156, formula: 'f(x) = x³ − x² + 2x + k₂', size: 19 },
                { y: 192, formula: 'f(1) = 5  →  k₂ = 3', color: STAGE, size: 19 },
                { y: 246, text: say('Malda batek eta puntu batek', 'Una pendiente y un punto', 'ميل ونقطة', 'A slope and a point'), size: 17 },
                { y: 272, text: say('kurba bakarra aukeratzen dute', 'eligen una sola curva', 'يختاران منحنى واحدًا', 'pick a single curve'), size: 17 }
            ]}
            notesX={300}
        />
    )
}

/* ---------- The cover ---------- */

export function Bach2IndefiniteHeroArt() {
    return (
        <div className="fraction-v2-collage" aria-hidden="true">
            <svg viewBox="0 0 520 400" direction="ltr" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                <g transform="translate(26 36) rotate(-4)">
                    <rect width={300} height={120} rx={16} fill="#e6dcf6" stroke={INK} strokeWidth={2} />
                    <text x={150} y={72} textAnchor="middle" fontSize={26} fontWeight={700} fill={INK} fontFamily={SERIF}>∫ u dv = uv − ∫ v du</text>
                </g>
                <g transform="translate(300 160) rotate(5)">
                    <rect width={196} height={112} rx={16} fill="#f6d8cf" stroke={INK} strokeWidth={2} />
                    <text x={98} y={50} textAnchor="middle" fontSize={24} fontWeight={700} fill={INK} fontFamily={SERIF}>t = g(x)</text>
                    <text x={98} y={86} textAnchor="middle" fontSize={22} fontWeight={700} fill={INK} fontFamily={SERIF}>dt = g′(x) dx</text>
                </g>
                <g transform="translate(40 254) rotate(2)">
                    <rect width={330} height={104} rx={16} fill="#f3e3b5" stroke={INK} strokeWidth={2} />
                    <text x={165} y={64} textAnchor="middle" fontSize={26} fontWeight={700} fill={INK} fontFamily={SERIF}>A/(x − a) + B/(x − b)</text>
                </g>
            </svg>
        </div>
    )
}
