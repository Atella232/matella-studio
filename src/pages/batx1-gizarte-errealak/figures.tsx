import type { ReactNode } from 'react'
import { pickText, type LocalizedText, type UnitLanguage } from '../../features/unit-v2/types'
import { Label } from '../dbh2-funtzioak-v2/plane'
import { Figure } from '../dbh2-zatikiak-prototype/figures'

/* ==========================================================================
   Zenbaki errealak · Batxilergoa 1 · Gizarte Zientziak — the figure of its
   own (the powers of 10 around a number: the whole-number part of its
   logarithm) and the hero. The other lessons reuse the drawings of
   1.º Ciencias and 4. DBH. Formulas sit in their own <text> (left to right
   in every language); words go through <Label>.
   ========================================================================== */

const INK = 'var(--ink, #1d2733)'
const MUTED = 'var(--muted, #58616e)'
const STAGE = 'var(--stage, #2f6fdb)'
const STAGE_TINT = 'var(--stage-tint, #dde7f7)'
const SECOND = 'var(--second, #c4432a)'
const PAPER = '#fffcf6'
const SUPERSCRIPTS = '⁰¹²³⁴⁵⁶⁷⁸⁹'

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })

function Caption({ y, children }: { y: number; children: ReactNode }) {
    return <Label x={360} y={y} textAnchor="middle" fontSize={24} fill={MUTED}>{children}</Label>
}

/** A formula written left to right whatever the language */
function F({ x, y, children, size = 20, color = INK, anchor = 'start', weight = 700 }: { x: number; y: number; children: ReactNode; size?: number; color?: string; anchor?: 'start' | 'middle' | 'end'; weight?: number }) {
    return <text x={x} y={y} textAnchor={anchor} fontSize={size} fontWeight={weight} fill={color} direction="ltr">{children}</text>
}

/* ---------- The powers of 10 around 345 000 ---------- */

export function DigitsLogFigure({ language }: { language: UnitLanguage }) {
    const t = (text: LocalizedText) => pickText(language, text)
    const y = 110
    const left = 70
    const step = 145
    const at = (exponent: number) => left + step * (exponent - 3)
    const point = at(Math.log10(345000))
    const mark = language === 'en' ? '345,000' : '345 000'
    return (
        <Figure height={300} label={t(say('10 zenbakiaren berreturak: 345 000 zenbakia 10⁵ eta 10⁶ artean dago, beraz bere logaritmoa 5 eta 6 artean', 'Las potencias de 10: 345 000 está entre 10⁵ y 10⁶, así que su logaritmo está entre 5 y 6', 'قوى 10: العدد 345 000 بين 10⁵ و10⁶، إذن لوغاريتمه بين 5 و6', 'The powers of 10: 345,000 is between 10⁵ and 10⁶, so its logarithm is between 5 and 6'))}>
            <rect x={at(5)} y={y - 18} width={step} height={36} fill={STAGE_TINT} />
            <line x1={at(3) - 20} x2={at(7) + 20} y1={y} y2={y} stroke={INK} strokeWidth={2} />
            {[3, 4, 5, 6, 7].map((exponent) => (
                <g key={exponent}>
                    <line x1={at(exponent)} x2={at(exponent)} y1={y - 9} y2={y + 9} stroke={INK} strokeWidth={2} />
                    <F x={at(exponent)} y={y - 30} anchor="middle" size={32} color={exponent === 5 || exponent === 6 ? STAGE : INK}>{`10${SUPERSCRIPTS[exponent]}`}</F>
                    <F x={at(exponent)} y={y + 42} anchor="middle" size={28} color={MUTED} weight={600}>{String(exponent)}</F>
                </g>
            ))}
            <circle cx={point} cy={y} r={8} fill={SECOND} />
            <F x={point} y={y + 80} anchor="middle" size={30} color={SECOND}>{mark}</F>
            <F x={360} y={y + 128} anchor="middle" size={32}>{`5 < log ${mark} < 6`}</F>
            <Caption y={290}>{t(say('Goian zenbakia; behean, bere logaritmoa', 'Arriba el número; abajo, su logaritmo', 'في الأعلى العدد، وفي الأسفل لوغاريتمه', 'Above, the number; below, its logarithm'))}</Caption>
        </Figure>
    )
}

/* ---------- Hero ---------- */

export function GizRealsHeroArt() {
    return (
        <div className="fraction-v2-collage" aria-hidden="true">
            <svg viewBox="0 0 520 400" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                <g transform="translate(36 44) rotate(-4)">
                    <rect width={220} height={140} rx={16} fill={PAPER} stroke={INK} strokeWidth={2} />
                    <text x={110} y={64} textAnchor="middle" fontSize={30} fontWeight={700} fill={INK} fontFamily="Fraunces, serif" direction="ltr">√−4 ∉ ℝ</text>
                    <text x={110} y={110} textAnchor="middle" fontSize={24} fontWeight={700} fill={STAGE} fontFamily="Fraunces, serif" direction="ltr">ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ</text>
                </g>
                <g transform="translate(284 40) rotate(4)">
                    <rect width={200} height={116} rx={16} fill="#fbebc0" stroke={INK} strokeWidth={2} />
                    <text x={100} y={70} textAnchor="middle" fontSize={28} fontWeight={700} fill={INK} fontFamily="Fraunces, serif" direction="ltr">2,5 · 10¹⁰ €</text>
                </g>
                <g transform="translate(286 186) rotate(-3)">
                    <rect width={200} height={100} rx={16} fill="#e8e0f7" stroke={INK} strokeWidth={2} />
                    <text x={100} y={62} textAnchor="middle" fontSize={24} fontWeight={700} fill={INK} fontFamily="Fraunces, serif" direction="ltr">log 345 000 = 5,…</text>
                </g>
                <g transform="translate(40 226)">
                    <rect width={230} height={132} rx={16} fill="#d6eddf" stroke={INK} strokeWidth={2} />
                    <text x={115} y={58} textAnchor="middle" fontSize={26} fontWeight={700} fill={INK} fontFamily="Fraunces, serif" direction="ltr">∛x² = x^(2/3)</text>
                    <text x={115} y={102} textAnchor="middle" fontSize={22} fontWeight={700} fill={SECOND} fontFamily="Fraunces, serif" direction="ltr">|x − 3| &lt; 2</text>
                </g>
            </svg>
        </div>
    )
}
