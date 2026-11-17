import { pickText, type LocalizedText, type UnitLanguage } from '../../features/unit-v2/types'
import { Label } from '../dbh2-funtzioak-v2/plane'
import { Figure } from '../dbh2-zatikiak-prototype/figures'
import { DeterminantBlock } from '../batx2-zientziak-determinanteak/DeterminantSvg'

/* ==========================================================================
   Determinanteak · Batxilergoa 2 · Gizarte Zientziak — the figure of the
   lesson of this unit: two pairs of bundles side by side. On the left the
   determinant is not zero and the prices come out; on the right the second
   bundle is twice the first, the determinant is zero and the prices
   cannot be found. Numbers in their own <text>; words through <Label>.
   ========================================================================== */

const INK = 'var(--ink, #1d2733)'
const MUTED = 'var(--muted, #58616e)'
const SECOND = 'var(--second, #c4432a)'
const GREEN = 'var(--success, #267b53)'
const GREEN_TINT = '#d6eddf'
const CORAL_TINT = '#f8dcd3'
const PAPER = '#fffcf6'

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })

function F({ x, y, children, size = 22, color = INK }: { x: number; y: number; children: string; size?: number; color?: string }) {
    return <text x={x} y={y} textAnchor="middle" fontSize={size} fontWeight={700} fill={color} direction="ltr">{children}</text>
}

/** One card: a pair of bundles, their determinant and what it says */
function Card({ x, cells, value, verdict, ok, language }: { x: number; cells: number[][]; value: string; verdict: LocalizedText; ok: boolean; language: UnitLanguage }) {
    const color = ok ? GREEN : SECOND
    return (
        <g>
            <rect x={x} y={30} width={320} height={270} rx={16} fill={PAPER} stroke={INK} strokeWidth={1.8} />
            <DeterminantBlock x={x + 100} y={58} cells={cells} cell={56} rowGap={50} size={24} tint={() => (ok ? GREEN_TINT : CORAL_TINT)} />
            <F x={x + 160} y={200} size={26} color={color}>{value}</F>
            <Label x={x + 160} y={250} textAnchor="middle" fontSize={20} fill={color}>{pickText(language, verdict)}</Label>
        </g>
    )
}

export function UniquePricesFigure({ language }: { language: UnitLanguage }) {
    return (
        <Figure height={350} label={pickText(language, say(
            'Ezkerrean, 2 eta 1 kilo eta 3 eta 2 kilo dituzten sortak: |A| = 1, eta prezioak bakarrak dira. Eskuinean, 2 eta 3 eta 4 eta 6: bigarrena lehenaren bikoitza da, |A| = 0, eta prezioak ezin dira ondorioztatu',
            'A la izquierda, lotes de 2 y 1 kilos y de 3 y 2 kilos: |A| = 1 y los precios son únicos. A la derecha, 2 y 3 y 4 y 6: el segundo es el doble del primero, |A| = 0 y los precios no se pueden deducir',
            'على اليسار مجموعتان من 2 و1 كيلوغرام ومن 3 و2 كيلوغرام: |A| = 1 والأسعار وحيدة. وعلى اليمين 2 و3 و4 و6: الثانية ضعف الأولى، |A| = 0، ولا يمكن استنتاج الأسعار',
            'On the left, bundles of 2 and 1 kilos and of 3 and 2 kilos: |A| = 1 and the prices are unique. On the right, 2 and 3 and 4 and 6: the second is twice the first, |A| = 0 and the prices cannot be found'
        ))}>
            <Card x={24} cells={[[2, 1], [3, 2]]} value="|A| = 1 ≠ 0" verdict={say('Prezio bakarrak', 'Precios únicos', 'أسعار وحيدة', 'Unique prices')} ok language={language} />
            <Card x={376} cells={[[2, 3], [4, 6]]} value="|A| = 0" verdict={say('Ez dira ondorioztatzen', 'No se deducen', 'لا تُستنتج', 'Cannot be found')} ok={false} language={language} />
            <Label x={360} y={334} textAnchor="middle" fontSize={18} fill={MUTED}>{pickText(language, say('Errenkada bat sorta bakoitzeko', 'Una fila por lote', 'صف لكل مجموعة', 'One row per bundle'))}</Label>
        </Figure>
    )
}
