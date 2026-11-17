import type { ReactNode } from 'react'
import { pickText, type LocalizedText, type UnitLanguage } from '../../features/unit-v2/types'
import { Label } from '../dbh2-funtzioak-v2/plane'
import { Figure } from '../dbh2-zatikiak-prototype/figures'

/* ==========================================================================
   Aljebra · Batxilergoa 1 · Gizarte Zientziak — the figures of its own: the
   income and cost lines that cross at the break-even point, the supply and
   demand lines that cross at the equilibrium price, and the budget region
   of chairs and tables; and the hero. Formulas sit in their own <text>
   (left to right in every language); words go through <Label>.
   ========================================================================== */

const INK = 'var(--ink, #1d2733)'
const MUTED = 'var(--muted, #58616e)'
const STAGE = 'var(--stage, #2f6fdb)'
const STAGE_TINT = 'var(--stage-tint, #dde7f7)'
const SECOND = 'var(--second, #c4432a)'
const GREEN = '#2f8a57'
const GREEN_TINT = '#d6eddf'
const PAPER = '#fffcf6'

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })

function Caption({ y, children }: { y: number; children: ReactNode }) {
    return <Label x={360} y={y} textAnchor="middle" fontSize={22} fill={MUTED}>{children}</Label>
}

function F({ x, y, children, size = 22, color = INK, anchor = 'middle' }: { x: number; y: number; children: ReactNode; size?: number; color?: string; anchor?: 'start' | 'middle' | 'end' }) {
    return <text x={x} y={y} textAnchor={anchor} fontSize={size} fontWeight={700} fill={color} direction="ltr">{children}</text>
}

function Axes({ x0, y0, x1, y1 }: { x0: number; y0: number; x1: number; y1: number }) {
    return (
        <g stroke={INK} strokeWidth={2}>
            <line x1={x0} x2={x1} y1={y0} y2={y0} />
            <line x1={x0} x2={x0} y1={y0} y2={y1} />
        </g>
    )
}

/* ---------- Break-even: I(x) = 9x and C(x) = 1200 + 5x cross at 300 ---------- */

export function BreakEvenFigure({ language }: { language: UnitLanguage }) {
    const t = (text: LocalizedText) => pickText(language, text)
    const px = (x: number) => 80 + x
    const py = (y: number) => 270 - y * 0.045
    const profit = language === 'en' ? 'P' : 'B'
    return (
        <Figure height={340} label={t(say('Diru-sarreren eta kostuen zuzenak 300 unitatean ebakitzen dira', 'Las rectas de ingresos y costes se cortan en 300 unidades', 'يتقاطع مستقيما الإيرادات والتكاليف عند 300 وحدة', 'The income and cost lines cross at 300 units'))}>
            <polygon points={`${px(0)},${py(0)} ${px(0)},${py(1200)} ${px(300)},${py(2700)}`} fill="#f6d5cc" opacity={0.7} />
            <polygon points={`${px(300)},${py(2700)} ${px(600)},${py(5400)} ${px(600)},${py(4200)}`} fill={GREEN_TINT} opacity={0.9} />
            <Axes x0={80} y0={270} x1={680} y1={20} />
            <line x1={px(0)} y1={py(0)} x2={px(600)} y2={py(5400)} stroke={STAGE} strokeWidth={3} />
            <line x1={px(0)} y1={py(1200)} x2={px(600)} y2={py(4200)} stroke={SECOND} strokeWidth={3} />
            <line x1={px(300)} x2={px(300)} y1={py(2700)} y2={270} stroke={INK} strokeWidth={1.5} strokeDasharray="6 5" />
            <circle cx={px(300)} cy={py(2700)} r={7} fill={INK} />
            <F x={px(300)} y={296} size={20}>300</F>
            <F x={px(400)} y={76} size={20} color={STAGE} anchor="end">I(x) = 9x</F>
            <F x={px(600)} y={170} size={20} color={SECOND} anchor="end">C(x) = 1200 + 5x</F>
            <F x={px(80)} y={224} size={20} color={SECOND}>{`${profit} < 0`}</F>
            <F x={px(560)} y={76} size={20} color={GREEN}>{`${profit} > 0`}</F>
            <Caption y={328}>{t(say('Ezkerrean dirua galtzen da; eskuinean, irabazi', 'A la izquierda se pierde dinero; a la derecha, se gana', 'إلى اليسار نخسر المال، وإلى اليمين نربح', 'To the left you lose money; to the right, you earn'))}</Caption>
        </Figure>
    )
}

/* ---------- Supply and demand: D(p) = 200 − 4p and O(p) = 6p − 50 meet at p = 25 ---------- */

export function SupplyDemandFigure({ language }: { language: UnitLanguage }) {
    const t = (text: LocalizedText) => pickText(language, text)
    const px = (p: number) => 80 + p * 12
    const py = (q: number) => 270 - q * 0.9
    const supply = language === 'en' ? 'S' : 'O'
    return (
        <Figure height={340} label={t(say('Eskariaren eta eskaintzaren zuzenak 25 euroan ebakitzen dira', 'Las rectas de demanda y oferta se cortan en 25 euros', 'يتقاطع مستقيما الطلب والعرض عند 25 يورو', 'The demand and supply lines cross at 25 euros'))}>
            <line x1={px(35)} x2={px(35)} y1={py(60)} y2={py(160)} stroke={GREEN} strokeWidth={8} opacity={0.55} />
            <Axes x0={80} y0={270} x1={680} y1={20} />
            <line x1={px(0)} y1={py(200)} x2={px(50)} y2={py(0)} stroke={STAGE} strokeWidth={3} />
            <line x1={px(50 / 6)} y1={py(0)} x2={px(50)} y2={py(250)} stroke={SECOND} strokeWidth={3} />
            <line x1={px(25)} x2={px(25)} y1={py(100)} y2={270} stroke={INK} strokeWidth={1.5} strokeDasharray="6 5" />
            <circle cx={px(25)} cy={py(100)} r={7} fill={INK} />
            <F x={px(25)} y={296} size={20}>25</F>
            <F x={px(3)} y={80} size={20} color={STAGE} anchor="start">D(p)</F>
            <F x={520} y={100} size={20} color={SECOND} anchor="end">{`${supply}(p)`}</F>
            <F x={px(37)} y={py(110)} size={20} color={GREEN} anchor="start">{`${supply} > D`}</F>
            <Caption y={328}>{t(say('25 euroaren gainetik produktua soberan dago', 'Por encima de 25 euros sobra producto', 'فوق 25 يورو يفيض المنتج', 'Above 25 euros there is product left over'))}</Caption>
        </Figure>
    )
}

/* ---------- Budget region: 20x + 50y ≤ 1000, 2x + 4y ≤ 90 and the plan (20, 10) ---------- */

export function BudgetRegionFigure({ language }: { language: UnitLanguage }) {
    const t = (text: LocalizedText) => pickText(language, text)
    const px = (x: number) => 80 + x * 11
    const py = (y: number) => 270 - y * 10
    const region = [[0, 0], [45, 0], [25, 10], [0, 20]].map(([x, y]) => `${px(x)},${py(y)}`).join(' ')
    return (
        <Figure height={340} label={t(say('Aulki eta mahai kopuruen eskualdea, eta barruan dagoen (20, 10) puntua', 'La región de sillas y mesas, y el punto (20, 10) dentro de ella', 'منطقة الكراسي والطاولات والنقطة (20, 10) داخلها', 'The region of chairs and tables, and the point (20, 10) inside it'))}>
            <polygon points={region} fill={STAGE_TINT} stroke={STAGE} strokeWidth={2} />
            <Axes x0={80} y0={270} x1={680} y1={20} />
            <line x1={px(0)} y1={py(20)} x2={px(50)} y2={py(0)} stroke={SECOND} strokeWidth={2.5} />
            <line x1={px(0)} y1={py(22.5)} x2={px(45)} y2={py(0)} stroke={GREEN} strokeWidth={2.5} />
            <circle cx={px(20)} cy={py(10)} r={7} fill={INK} />
            <F x={px(20)} y={py(10) - 14} size={20}>(20, 10)</F>
            <F x={px(52)} y={py(2)} size={18} color={SECOND} anchor="start">€</F>
            <F x={px(4)} y={py(23.5)} size={18} color={GREEN} anchor="start">h</F>
            <F x={px(50)} y={296} size={18} color={MUTED}>50</F>
            <F x={px(45)} y={296} size={18} color={MUTED}>45</F>
            <F x={66} y={py(20) + 6} size={18} color={MUTED} anchor="end">20</F>
            <Caption y={328}>{t(say('Gorria: dirua · berdea: orduak · urdina: posible diren planak', 'Rojo: dinero · verde: horas · azul: los planes posibles', 'الأحمر: المال · الأخضر: الساعات · الأزرق: الخطط الممكنة', 'Red: money · green: hours · blue: the possible plans'))}</Caption>
        </Figure>
    )
}

/* ---------- Hero ---------- */

export function GizAlgebraHeroArt() {
    return (
        <div className="fraction-v2-collage" aria-hidden="true">
            <svg viewBox="0 0 520 400" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                <g transform="translate(36 44) rotate(-4)">
                    <rect width={220} height={140} rx={16} fill={PAPER} stroke={INK} strokeWidth={2} />
                    <text x={110} y={64} textAnchor="middle" fontSize={30} fontWeight={700} fill={INK} fontFamily="Fraunces, serif" direction="ltr">I(x) = C(x)</text>
                    <text x={110} y={110} textAnchor="middle" fontSize={24} fontWeight={700} fill={STAGE} fontFamily="Fraunces, serif" direction="ltr">x⁴ − 5x² + 4</text>
                </g>
                <g transform="translate(284 40) rotate(4)">
                    <rect width={200} height={116} rx={16} fill="#fbebc0" stroke={INK} strokeWidth={2} />
                    <text x={100} y={50} textAnchor="middle" fontSize={22} fontWeight={700} fill={INK} fontFamily="Fraunces, serif" direction="ltr">x + y + z = 300</text>
                    <text x={100} y={86} textAnchor="middle" fontSize={22} fontWeight={700} fill={INK} fontFamily="Fraunces, serif" direction="ltr">x = 2z</text>
                </g>
                <g transform="translate(286 186) rotate(-3)">
                    <rect width={200} height={100} rx={16} fill="#e8e0f7" stroke={INK} strokeWidth={2} />
                    <text x={100} y={62} textAnchor="middle" fontSize={26} fontWeight={700} fill={INK} fontFamily="Fraunces, serif" direction="ltr">2x + 4y ≤ 90</text>
                </g>
                <g transform="translate(40 226)">
                    <rect width={230} height={132} rx={16} fill={GREEN_TINT} stroke={INK} strokeWidth={2} />
                    <line x1={24} y1={112} x2={206} y2={24} stroke={STAGE} strokeWidth={4} />
                    <line x1={24} y1={60} x2={206} y2={100} stroke={SECOND} strokeWidth={4} />
                    <circle cx={127} cy={73} r={7} fill={INK} />
                </g>
            </svg>
        </div>
    )
}
