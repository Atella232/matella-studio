import type { ReactNode } from 'react'
import { pickText, type LocalizedText, type UnitLanguage } from '../../features/unit-v2/types'
import { Label } from '../dbh2-funtzioak-v2/plane'
import { Figure } from '../dbh2-zatikiak-prototype/figures'

/* ==========================================================================
   Merkataritza-aritmetika · Batxilergoa 1 · Gizarte Zientziak — the figures
   of its own: the deposits of a pension plan, each growing for its own
   years, and the payments of a loan split into interest and repayment, and
   the hero. Formulas sit in their own <text> (left to right in every
   language); words go through <Label>.
   ========================================================================== */

const INK = 'var(--ink, #1d2733)'
const MUTED = 'var(--muted, #58616e)'
const STAGE = 'var(--stage, #2f6fdb)'
const STAGE_TINT = 'var(--stage-tint, #dde7f7)'
const SECOND = 'var(--second, #c4432a)'
const SECOND_TINT = '#f6d5cc'
const PAPER = '#fffcf6'

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })

function Caption({ y, children }: { y: number; children: ReactNode }) {
    return <Label x={360} y={y} textAnchor="middle" fontSize={22} fill={MUTED}>{children}</Label>
}

function F({ x, y, children, size = 22, color = INK, anchor = 'middle' }: { x: number; y: number; children: ReactNode; size?: number; color?: string; anchor?: 'start' | 'middle' | 'end' }) {
    return <text x={x} y={y} textAnchor={anchor} fontSize={size} fontWeight={700} fill={color} direction="ltr">{children}</text>
}

/* ---------- A pension plan: five deposits of 1000 at 4 % ---------- */

export function PensionFigure({ language }: { language: UnitLanguage }) {
    const t = (text: LocalizedText) => pickText(language, text)
    const base = 250
    const scale = 0.14
    const deposits = [5, 4, 3, 2, 1].map((years) => 1000 * 1.04 ** years)
    return (
        <Figure height={330} label={t(say('Bost diru-sarrera: lehenengoak bost urte hazten du, azkenak urte bat', 'Cinco ingresos: el primero crece cinco años y el último, uno', 'خمسة إيداعات: الأول ينمو خمس سنوات والأخير سنة واحدة', 'Five deposits: the first grows for five years and the last for one'))}>
            <line x1={60} x2={680} y1={base} y2={base} stroke={INK} strokeWidth={2} />
            {deposits.map((value, index) => {
                const x = 90 + index * 120
                const own = 1000 * scale
                const grown = value * scale
                return (
                    <g key={index}>
                        <rect x={x} y={base - own} width={70} height={own} fill={STAGE_TINT} stroke={INK} strokeWidth={1.6} />
                        <rect x={x} y={base - grown} width={70} height={grown - own} fill={SECOND_TINT} stroke={SECOND} strokeWidth={1.6} />
                        <F x={x + 35} y={base - grown - 10} size={20}>{`${language === 'en' || language === 'ar' ? '1.04' : '1,04'}${['⁵', '⁴', '³', '²', ''][index]}`}</F>
                        <F x={x + 35} y={base + 30} size={20} color={MUTED}>{String(index + 1)}</F>
                    </g>
                )
            })}
            <Caption y={316}>{t(say('Urdina: sartutakoa · gorria: interesak', 'Azul: lo ingresado · rojo: los intereses', 'الأزرق: المودَع · الأحمر: الفوائد', 'Blue: paid in · red: the interest'))}</Caption>
        </Figure>
    )
}

/* ---------- A loan of 10 000 at 8 % in five payments ---------- */

export function AmortizationFigure({ language }: { language: UnitLanguage }) {
    const t = (text: LocalizedText) => pickText(language, text)
    const rate = 0.08
    const years = 5
    const payment = (10000 * rate * (1 + rate) ** years) / ((1 + rate) ** years - 1)
    const rows: Array<{ interest: number; repaid: number }> = []
    let debt = 10000
    for (let year = 0; year < years; year++) {
        const interest = debt * rate
        rows.push({ interest, repaid: payment - interest })
        debt -= payment - interest
    }
    const base = 250
    const scale = 0.075
    return (
        <Figure height={330} label={t(say('Ordainketa bera urtero: interesen zatia txikitzen da eta amortizazioarena handitzen', 'El mismo pago cada año: la parte de intereses baja y la de amortización sube', 'الدفعة نفسها كل سنة: جزء الفوائد ينقص وجزء الإطفاء يزيد', 'The same payment every year: the interest part shrinks and the repayment part grows'))}>
            <line x1={60} x2={680} y1={base} y2={base} stroke={INK} strokeWidth={2} />
            {rows.map(({ interest, repaid }, index) => {
                const x = 90 + index * 120
                return (
                    <g key={index}>
                        <rect x={x} y={base - repaid * scale} width={70} height={repaid * scale} fill={STAGE_TINT} stroke={INK} strokeWidth={1.6} />
                        <rect x={x} y={base - (repaid + interest) * scale} width={70} height={interest * scale} fill={SECOND_TINT} stroke={SECOND} strokeWidth={1.6} />
                        <F x={x + 35} y={base + 30} size={20} color={MUTED}>{String(index + 1)}</F>
                    </g>
                )
            })}
            <F x={380} y={42} size={24}>{`a ≈ ${language === 'en' || language === 'ar' ? '2504.56' : '2504,56'} €`}</F>
            <Caption y={316}>{t(say('Urdina: amortizazioa · gorria: interesak', 'Azul: amortización · rojo: intereses', 'الأزرق: الإطفاء · الأحمر: الفوائد', 'Blue: repayment · red: interest'))}</Caption>
        </Figure>
    )
}

/* ---------- Hero ---------- */

export function GizMoneyHeroArt() {
    return (
        <div className="fraction-v2-collage" aria-hidden="true">
            <svg viewBox="0 0 520 400" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                <g transform="translate(36 44) rotate(-4)">
                    <rect width={220} height={140} rx={16} fill={PAPER} stroke={INK} strokeWidth={2} />
                    <text x={110} y={64} textAnchor="middle" fontSize={30} fontWeight={700} fill={INK} fontFamily="Fraunces, serif" direction="ltr">C · 1,05ⁿ</text>
                    <text x={110} y={110} textAnchor="middle" fontSize={24} fontWeight={700} fill={STAGE} fontFamily="Fraunces, serif" direction="ltr">+20 % · −20 %</text>
                </g>
                <g transform="translate(284 40) rotate(4)">
                    <rect width={200} height={116} rx={16} fill="#fbebc0" stroke={INK} strokeWidth={2} />
                    <text x={100} y={70} textAnchor="middle" fontSize={30} fontWeight={700} fill={INK} fontFamily="Fraunces, serif" direction="ltr">1,005¹²</text>
                </g>
                <g transform="translate(286 186) rotate(-3)">
                    <rect width={200} height={100} rx={16} fill="#e8e0f7" stroke={INK} strokeWidth={2} />
                    <text x={100} y={62} textAnchor="middle" fontSize={26} fontWeight={700} fill={INK} fontFamily="Fraunces, serif" direction="ltr">a · n &gt; C</text>
                </g>
                <g transform="translate(40 226)">
                    <rect width={230} height={132} rx={16} fill="#d6eddf" stroke={INK} strokeWidth={2} />
                    {[0, 1, 2, 3].map((i) => <rect key={i} x={30 + i * 46} y={110 - (i + 1) * 20} width={34} height={(i + 1) * 20} fill={SECOND_TINT} stroke={INK} strokeWidth={1.5} />)}
                </g>
            </svg>
        </div>
    )
}
