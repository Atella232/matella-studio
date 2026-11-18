import { pickText, type LocalizedText, type UnitLanguage } from '../../features/unit-v2/types'
import { Label } from '../dbh2-funtzioak-v2/plane'
import { Figure } from '../dbh2-zatikiak-prototype/figures'

/* ==========================================================================
   Sistemak · Batxilergoa 2 · Gizarte Zientziak — the figures of the two
   lessons of this unit: three bundles and what the ranks say about the
   prices (none, one, infinitely many), and three sentences of a problem
   turned into three equations. Numbers and formulas in their own <text>
   (left to right); words through <Label>.
   ========================================================================== */

const INK = 'var(--ink, #1d2733)'
const MUTED = 'var(--muted, #58616e)'
const STAGE = 'var(--stage, #2f6fdb)'
const SECOND = 'var(--second, #c4432a)'
const GREEN = 'var(--success, #267b53)'
const GREEN_TINT = '#d6eddf'
const CORAL_TINT = '#f8dcd3'
const MUSTARD_TINT = '#fbebc0'
const PAPER = '#fffcf6'

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })

function F({ x, y, children, size = 22, color = INK }: { x: number; y: number; children: string; size?: number; color?: string }) {
    return <text x={x} y={y} textAnchor="middle" fontSize={size} fontWeight={700} fill={color} direction="ltr">{children}</text>
}

/* ---------- None, one or infinitely many prices ---------- */

export function PricesCountFigure({ language }: { language: UnitLanguage }) {
    const t = (text: LocalizedText) => pickText(language, text)
    const cards = [
        { ranks: ['rg A = 2', '≠ rg A* = 3'], verdict: say('Ez dago preziorik', 'No hay precios', 'لا أسعار', 'No prices'), color: SECOND, tint: CORAL_TINT },
        { ranks: ['rg A = rg A*', '= 2'], verdict: say('Prezio bakarrak', 'Precios únicos', 'أسعار وحيدة', 'Unique prices'), color: GREEN, tint: GREEN_TINT },
        { ranks: ['rg A = rg A*', '= 1'], verdict: say('Infinitu prezio', 'Infinitos precios', 'أسعار لا نهائية', 'Infinitely many'), color: STAGE, tint: MUSTARD_TINT }
    ]
    return (
        <Figure height={330} label={t(say(
            'Bi produktuko hiru sorta: heinak desberdinak badira, ez dago preziorik; biak 2 badira, prezio bakarrak; biak 1 badira, infinitu',
            'Tres lotes de dos productos: si los rangos son distintos, no hay precios; si los dos valen 2, precios únicos; si los dos valen 1, infinitos',
            'ثلاث مجموعات من منتجين: إذا اختلفت الرتبتان فلا أسعار؛ وإذا كانتا 2 فأسعار وحيدة؛ وإذا كانتا 1 فلا نهائية',
            'Three bundles of two products: if the ranks differ, there are no prices; if both are 2, unique prices; if both are 1, infinitely many'
        ))}>
            {cards.map((card, index) => (
                <g key={index}>
                    <rect x={14 + index * 236} y={34} width={220} height={220} rx={16} fill={card.tint} stroke={INK} strokeWidth={1.8} />
                    <F x={124 + index * 236} y={112} size={24} color={INK}>{card.ranks[0]}</F>
                    <F x={124 + index * 236} y={150} size={24} color={INK}>{card.ranks[1]}</F>
                    <Label x={124 + index * 236} y={218} textAnchor="middle" fontSize={24} fill={card.color}>{t(card.verdict)}</Label>
                </g>
            ))}
            <Label x={360} y={306} textAnchor="middle" fontSize={22} fill={MUTED}>{t(say('Errenkada bat sorta bakoitzeko; B zutabean, haren prezioa', 'Una fila por lote; en la columna B, lo que cuesta', 'صف لكل مجموعة؛ وفي العمود B ثمنها', 'One row per bundle; in the column B, what it costs'))}</Label>
        </Figure>
    )
}

/* ---------- From the sentences to the system ---------- */

export function StatementFigure({ language }: { language: UnitLanguage }) {
    const t = (text: LocalizedText) => pickText(language, text)
    const rows = [
        { sentence: say('Guztira 30', 'En total, 30', 'المجموع 30', 'In total, 30'), equation: 'x + y + z = 30' },
        { sentence: say('B, A-ren bikoitza', 'B, el doble que A', 'B ضعف A', 'B, twice A'), equation: 'y = 2x' },
        { sentence: say('C, A baino 6 gehiago', 'C, 6 más que A', 'C أكثر من A بـ 6', 'C, 6 more than A'), equation: 'z = x + 6' }
    ]
    return (
        <Figure height={320} label={t(say(
            'Hiru esaldi, hiru ekuazio: guztira 30 da x + y + z = 30; B A-ren bikoitza da y = 2x; C A baino 6 gehiago da z = x + 6',
            'Tres frases, tres ecuaciones: en total 30 es x + y + z = 30; B el doble que A es y = 2x; C 6 más que A es z = x + 6',
            'ثلاث جمل وثلاث معادلات: المجموع 30 هو x + y + z = 30؛ وB ضعف A هو y = 2x؛ وC أكثر من A بـ 6 هو z = x + 6',
            'Three sentences, three equations: in total 30 is x + y + z = 30; B twice A is y = 2x; C 6 more than A is z = x + 6'
        ))}>
            {rows.map((row, index) => (
                <g key={row.equation}>
                    <rect x={20} y={28 + index * 84} width={300} height={62} rx={12} fill={PAPER} stroke={INK} strokeWidth={1.6} />
                    <Label x={170} y={67 + index * 84} textAnchor="middle" fontSize={23} fill={INK}>{t(row.sentence)}</Label>
                    <line x1={330} x2={392} y1={59 + index * 84} y2={59 + index * 84} stroke={MUTED} strokeWidth={2.4} />
                    <polygon points={`402,${59 + index * 84} 390,${53 + index * 84} 390,${65 + index * 84}`} fill={MUTED} />
                    <rect x={410} y={28 + index * 84} width={290} height={62} rx={12} fill={GREEN_TINT} stroke={INK} strokeWidth={1.6} />
                    <F x={555} y={68 + index * 84} size={25} color={GREEN}>{row.equation}</F>
                </g>
            ))}
            <Label x={360} y={300} textAnchor="middle" fontSize={21} fill={MUTED}>{t(say('x, y, z: A, B eta C fondoetako milaka euro', 'x, y, z: miles de euros en los fondos A, B y C', 'x وy وz: آلاف اليوروهات في الصناديق A وB وC', 'x, y, z: thousands of euros in funds A, B and C'))}</Label>
        </Figure>
    )
}
