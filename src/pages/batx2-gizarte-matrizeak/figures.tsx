import type { ReactNode } from 'react'
import { pickText, type LocalizedText, type UnitLanguage } from '../../features/unit-v2/types'
import { Label } from '../dbh2-funtzioak-v2/plane'
import { Figure } from '../dbh2-zatikiak-prototype/figures'
import { MatrixBlock } from '../batx2-zientziak-matrizeak/MatrixSvg'

/* ==========================================================================
   Matrizeak · Batxilergoa 2 · Gizarte Zientziak — the figures of the four
   lessons of this unit: a table that becomes a matrix, quantities times a
   column of profits, a two-step production chain and a system written as
   AX = B. Numbers and formulas go in their own <text> (left to right);
   words go through <Label>.
   ========================================================================== */

const INK = 'var(--ink, #1d2733)'
const MUTED = 'var(--muted, #58616e)'
const STAGE = 'var(--stage, #2f6fdb)'
const STAGE_TINT = 'var(--stage-tint, #dde7f7)'
const SECOND = 'var(--second, #c4432a)'
const GREEN = 'var(--success, #267b53)'
const GREEN_TINT = '#d6eddf'
const MUSTARD_TINT = '#fbebc0'
const PAPER = '#fffcf6'

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const useText = (language: UnitLanguage) => (text: LocalizedText) => pickText(language, text)

function Caption({ y, children }: { y: number; children: ReactNode }) {
    return <Label x={360} y={y} textAnchor="middle" fontSize={20} fill={MUTED}>{children}</Label>
}

/** A formula written left to right whatever the language */
function F({ x, y, children, size = 22, color = INK, anchor = 'start' }: { x: number; y: number; children: ReactNode; size?: number; color?: string; anchor?: 'start' | 'middle' | 'end' }) {
    return <text x={x} y={y} textAnchor={anchor} fontSize={size} fontWeight={700} fill={color} direction="ltr">{children}</text>
}

function Arrow({ x1, y1, x2, y2, color = MUTED }: { x1: number; y1: number; x2: number; y2: number; color?: string }) {
    const angle = Math.atan2(y2 - y1, x2 - x1)
    const head = (turn: number) => `${x2 - 12 * Math.cos(angle + turn)},${y2 - 12 * Math.sin(angle + turn)}`
    return (
        <g>
            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={2.4} />
            <polygon points={`${x2},${y2} ${head(0.45)} ${head(-0.45)}`} fill={color} />
        </g>
    )
}

/* ---------- A table that becomes a matrix ---------- */

export function TableMatrixFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const rows = [t(say('A taldea', 'Grupo A', 'المجموعة A', 'Group A')), t(say('B taldea', 'Grupo B', 'المجموعة B', 'Group B'))]
    const columns = [t(say('ingel.', 'ingl.', 'إنجل.', 'Eng.')), t(say('fran.', 'fran.', 'فرن.', 'Fr.')), t(say('alem.', 'alem.', 'ألم.', 'Ger.'))]
    const values = [['15', '9', '6'], ['18', '8', '13']]
    const left = 130
    const top = 70
    const width = 58
    const height = 48
    return (
        <Figure height={340} label={t(say('Ikasle-taula bat (errenkadetan taldeak, zutabeetan hizkuntzak) eta haren 2 × 3 matrizea; a₂₃ = 13 B taldeko alemaneko ikasleak dira', 'Una tabla de alumnos (grupos en filas, idiomas en columnas) y su matriz 2 × 3; a₂₃ = 13 son los alumnos de alemán del grupo B', 'جدول طلاب (المجموعات في الصفوف واللغات في الأعمدة) ومصفوفته 2 × 3؛ a₂₃ = 13 هم طلاب الألمانية في المجموعة B', 'A table of students (groups in rows, languages in columns) and its 2 × 3 matrix; a₂₃ = 13 are the German students of group B'))}>
            {columns.map((name, c) => (
                <Label key={name} x={left + c * width + width / 2} y={top - 12} textAnchor="middle" fontSize={17} fill={MUTED}>{name}</Label>
            ))}
            {rows.map((name, r) => (
                <Label key={name} x={left - 10} y={top + r * height + 31} textAnchor="end" fontSize={17} fill={STAGE}>{name}</Label>
            ))}
            {values.map((row, r) => row.map((value, c) => (
                <g key={`${r}-${c}`}>
                    <rect x={left + c * width} y={top + r * height} width={width} height={height} fill={r === 1 && c === 2 ? MUSTARD_TINT : PAPER} stroke={INK} strokeWidth={1.4} />
                    <F x={left + c * width + width / 2} y={top + r * height + 32} anchor="middle" size={21}>{value}</F>
                </g>
            )))}
            <Arrow x1={325} y1={118} x2={395} y2={118} />
            <MatrixBlock x={410} y={72} cells={values} cell={56} rowGap={46} size={22} tint={(r, c) => (r === 1 && c === 2 ? MUSTARD_TINT : r === 1 ? STAGE_TINT : undefined)} color={(r, c) => (r === 1 && c === 2 ? SECOND : undefined)} />
            <F x={360} y={226} anchor="middle" size={24} color={SECOND}>2 × 3     a₂₃ = 13</F>
            <Caption y={290}>{t(say('Errenkada bat talde bakoitzeko, zutabe bat hizkuntza bakoitzeko', 'Una fila por grupo y una columna por idioma', 'صف لكل مجموعة وعمود لكل لغة', 'One row per group and one column per language'))}</Caption>
        </Figure>
    )
}

/* ---------- Quantities times the column of profits ---------- */

export function ProfitFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    return (
        <Figure height={340} label={t(say('Q kopuruen matrizea bider irabazien zutabea (15 eta 30) berdin 900 eta 750: hilabete bakoitzeko irabazia', 'La matriz de cantidades Q por la columna de beneficios (15 y 30) da 900 y 750: el beneficio de cada mes', 'مصفوفة الكميات Q في عمود الأرباح (15 و30) تساوي 900 و750: ربح كل شهر', 'The matrix of quantities Q times the column of profits (15 and 30) gives 900 and 750: the profit of each month'))}>
            <F x={40} y={128} size={26}>Q</F>
            <MatrixBlock x={70} y={78} cells={[['40', '10'], ['20', '15']]} cell={60} rowGap={50} size={23} tint={(r) => (r === 0 ? STAGE_TINT : undefined)} />
            <MatrixBlock x={250} y={78} cells={[['15'], ['30']]} cell={60} rowGap={50} size={23} tint={() => MUSTARD_TINT} />
            <F x={346} y={136} size={30}>=</F>
            <MatrixBlock x={380} y={78} cells={[['900'], ['750']]} cell={84} rowGap={50} size={23} tint={(r) => (r === 0 ? GREEN_TINT : undefined)} color={(r) => (r === 0 ? GREEN : undefined)} />
            <Label x={250 + 44} y={60} textAnchor="middle" fontSize={16} fill={MUTED}>V − C</Label>
            <F x={360} y={238} anchor="middle" size={21} color={GREEN}>40 · 15 + 10 · 30 = 900</F>
            <Caption y={292}>{t(say('Hilabete bakoitzeko errenkada bider unitateko irabazia', 'La fila de cada mes por el beneficio por unidad', 'صف كل شهر في الربح للوحدة', 'Each month\'s row times the profit per unit'))}</Caption>
        </Figure>
    )
}

/* ---------- A two-step production chain ---------- */

export function ChainFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const steps = [
        { x: 120, text: t(say('etxeak', 'casas', 'البيوت', 'houses')) },
        { x: 360, text: t(say('leihoak', 'ventanas', 'النوافذ', 'windows')) },
        { x: 600, text: t(say('piezak', 'piezas', 'القطع', 'parts')) }
    ]
    return (
        <Figure height={360} label={t(say('Katea: etxeak → leihoak (A matrizea) → piezak (B matrizea); AB matrizeak etxeak eta piezak lotzen ditu', 'La cadena: casas → ventanas (matriz A) → piezas (matriz B); AB une las casas con las piezas', 'السلسلة: البيوت ← النوافذ (المصفوفة A) ← القطع (المصفوفة B)؛ وAB تربط البيوت بالقطع', 'The chain: houses → windows (matrix A) → parts (matrix B); AB links the houses with the parts'))}>
            {steps.map((step, index) => (
                <g key={step.text}>
                    <rect x={step.x - 80} y={40} width={160} height={56} rx={14} fill={index === 1 ? MUSTARD_TINT : STAGE_TINT} stroke={INK} strokeWidth={1.8} />
                    <Label x={step.x} y={76} textAnchor="middle" fontSize={20} fill={INK}>{step.text}</Label>
                </g>
            ))}
            <Arrow x1={204} y1={68} x2={276} y2={68} color={STAGE} />
            <Arrow x1={444} y1={68} x2={516} y2={68} color={STAGE} />
            <F x={240} y={130} anchor="middle" size={24} color={STAGE}>A</F>
            <F x={480} y={130} anchor="middle" size={24} color={STAGE}>B</F>
            <path d="M 120 100 Q 360 210 600 100" fill="none" stroke={GREEN} strokeWidth={2.4} strokeDasharray="7 6" />
            <F x={360} y={186} anchor="middle" size={24} color={GREEN}>AB</F>
            <MatrixBlock x={250} y={216} cells={[['14', '26'], ['21', '37']]} cell={72} rowGap={44} size={22} tint={(r) => (r === 1 ? GREEN_TINT : undefined)} />
            <Caption y={340}>{t(say('Katearen ordena: lehen urratsa ezkerrean', 'El orden de la cadena: el primer paso, a la izquierda', 'ترتيب السلسلة: الخطوة الأولى على اليسار', 'The order of the chain: the first step on the left'))}</Caption>
        </Figure>
    )
}

/* ---------- A system written as AX = B ---------- */

export function MatrixFormFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    return (
        <Figure height={330} label={t(say('2x + 3y = 31 eta x + 2y = 18 sistema AX = B gisa: A koefizienteak, X ezezagunak eta B gai askeak', 'El sistema 2x + 3y = 31, x + 2y = 18 como AX = B: A los coeficientes, X las incógnitas y B los términos independientes', 'النظام 2x + 3y = 31 وx + 2y = 18 على الشكل AX = B: A المعاملات وX المجاهيل وB الحدود الثابتة', 'The system 2x + 3y = 31, x + 2y = 18 as AX = B: A the coefficients, X the unknowns and B the constant terms'))}>
            <F x={360} y={52} anchor="middle" size={23}>2x + 3y = 31     x + 2y = 18</F>
            <MatrixBlock x={110} y={96} cells={[['2', '3'], ['1', '2']]} cell={58} rowGap={48} size={23} tint={() => STAGE_TINT} />
            <MatrixBlock x={270} y={96} cells={[['x'], ['y']]} cell={58} rowGap={48} size={23} tint={() => MUSTARD_TINT} />
            <F x={374} y={152} size={30}>=</F>
            <MatrixBlock x={410} y={96} cells={[['31'], ['18']]} cell={66} rowGap={48} size={23} tint={() => GREEN_TINT} />
            <F x={182} y={226} anchor="middle" size={24} color={STAGE}>A</F>
            <F x={313} y={226} anchor="middle" size={24} color={STAGE}>X</F>
            <F x={457} y={226} anchor="middle" size={24} color={STAGE}>B</F>
            <F x={600} y={152} anchor="middle" size={22} color={SECOND}>X = A⁻¹B</F>
            <Caption y={286}>{t(say('Errenkada bat ekuazio bakoitzeko', 'Una fila por ecuación', 'صف لكل معادلة', 'One row per equation'))}</Caption>
        </Figure>
    )
}
