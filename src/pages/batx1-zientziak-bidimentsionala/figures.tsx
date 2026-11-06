import type { ReactNode } from 'react'
import { pickText, type LocalizedText, type UnitLanguage } from '../../features/unit-v2/types'
import { decimalSeparatorFor } from '../../utils/numberFormat'
import { Label } from '../dbh2-funtzioak-v2/plane'
import { Figure } from '../dbh2-zatikiak-prototype/figures'
import { sunPairs } from '../dbh4-aplikatuak-estatistika/data'
import { deviationProducts, pairStats, type Pair } from './bivariate'
import { FAMILY_PAIRS, FAMILY_TABLE, GROUPED_TABLE, INDEPENDENT_TABLE, PETS_TABLE, QUADRANT_PAIRS, STUDY_PAIRS, UNITS_PAIRS, WORKING_PAIRS, XY_PAIRS, YX_PAIRS } from './data'

/* ==========================================================================
   Estatistika bidimentsionala · Batxilergoa 1 · Zientziak — the new lesson
   figures: ten pairs counted in a double-entry table, the margins of a
   table, two conditional distributions as bars, a table completed for
   independence, three kinds of dependence, the quadrants around the centre
   of gravity, the working of a covariance, a cloud that keeps its r when
   the units change, the line of y on x (vertical distances) and of x on y
   (horizontal ones), an estimate inside and outside the data, the two
   lines crossing at (x̄, ȳ), a table with intervals and the working table
   with its five sums. Each one draws the numbers of its lesson's «Let's
   solve». Formulas sit in their own <text> (left to right in every
   language); words go through <Label>, always centred so that Arabic
   stays inside the drawing.
   ========================================================================== */

const INK = 'var(--ink, #1d2733)'
const MUTED = 'var(--muted, #58616e)'
const STAGE = 'var(--stage, #2f6fdb)'
const STAGE_TINT = 'var(--stage-tint, #dde7f7)'
const SECOND = 'var(--second, #c4432a)'
const GREEN = 'var(--success, #267b53)'
const GREEN_TINT = '#d6eddf'
const CORAL_TINT = '#f6dcd3'
const LINE = '#d9d3c7'
const PAPER = '#fffcf6'

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const useText = (language: UnitLanguage) => (text: LocalizedText) => pickText(language, text)
/** A number for the screen: 0,5 in Basque and Spanish, 0.5 in English and Arabic; the minus sign is − */
const num = (language: UnitLanguage, value: number) => String(Math.round(value * 1000) / 1000).replace('.', language === 'ar' ? '.' : decimalSeparatorFor(language)).replace('-', '−')

const TOTAL = say('Guztira', 'Total', 'المجموع', 'Total')

function Caption({ y, children, size = 19 }: { y: number; children: ReactNode; size?: number }) {
    return <Label x={360} y={y} textAnchor="middle" fontSize={size} fill={MUTED}>{children}</Label>
}

/** A formula written left to right whatever the language */
function F({ x, y, children, size = 20, color = INK, anchor = 'middle', weight = 700 }: { x: number; y: number; children: ReactNode; size?: number; color?: string; anchor?: 'start' | 'middle' | 'end'; weight?: number }) {
    return <text x={x} y={y} textAnchor={anchor} fontSize={size} fontWeight={weight} fill={color} direction="ltr">{children}</text>
}

/** σ with an index below: σxy, σx… */
function Sigma({ index, power }: { index: string; power?: string }) {
    return (
        <>
            <tspan>σ</tspan>
            <tspan fontSize="70%" dy={5}>{index}</tspan>
            {power ? <tspan fontSize="70%" dy={-14}>{power}</tspan> : null}
            <tspan dy={power ? 9 : -5}>{'​'}</tspan>
        </>
    )
}

/**
 * A double-entry table: a header row with the values of Y, a header column with the values of X, the cells,
 * and if given the totals of the rows and of the columns. Tinted cells are highlighted.
 */
function TableGrid({ x, y, head, cell, rh, corner, rows, columns, cells, rowTotals, columnTotals, total, highlight = [], rowTint, columnTint, language, size = 24 }: {
    x: number
    y: number
    head: number
    cell: number
    rh: number
    corner: ReactNode
    rows: ReactNode[]
    columns: ReactNode[]
    cells: Array<Array<number | string>>
    rowTotals?: number[]
    columnTotals?: number[]
    total?: number
    highlight?: Array<[number, number]>
    rowTint?: string
    columnTint?: string
    language: UnitLanguage
    size?: number
}) {
    const t = useText(language)
    const cx = (column: number) => x + head + cell * (column + 0.5)
    const cy = (row: number) => y + rh * (row + 1) + size * 0.35
    const width = head + cell * (columns.length + (rowTotals ? 1 : 0))
    const height = rh * (rows.length + 1 + (columnTotals ? 1 : 0))
    const show = (value: number | string) => (typeof value === 'number' ? num(language, value) : value)
    return (
        <g>
            {rowTint && rowTotals ? <rect x={x + head + cell * columns.length} y={y + rh / 2} width={cell} height={rh * rows.length} fill={rowTint} /> : null}
            {columnTint && columnTotals ? <rect x={x + head} y={y + rh * (rows.length + 0.5)} width={cell * columns.length} height={rh} fill={columnTint} /> : null}
            {highlight.map(([row, column]) => <rect key={`${row}-${column}`} x={x + head + cell * column + 4} y={y + rh * (row + 0.5) + 4} width={cell - 8} height={rh - 8} rx={8} fill={SECOND} fillOpacity={0.2} stroke={SECOND} strokeWidth={2} />)}
            <F x={x + head / 2} y={y + size * 0.35} size={size - 2} color={MUTED}>{corner}</F>
            {columns.map((column, index) => <F key={index} x={cx(index)} y={y + size * 0.35} size={size} color={STAGE}>{column}</F>)}
            {rowTotals ? <Label x={cx(columns.length)} y={y + size * 0.35} textAnchor="middle" fontSize={size - 3} fontWeight={700} fill={MUTED}>{t(TOTAL)}</Label> : null}
            {rows.map((row, index) => <F key={index} x={x + head / 2} y={cy(index)} size={size} color={STAGE}>{row}</F>)}
            {columnTotals ? <Label x={x + head / 2} y={cy(rows.length)} textAnchor="middle" fontSize={size - 3} fontWeight={700} fill={MUTED}>{t(TOTAL)}</Label> : null}
            {cells.map((row, i) => row.map((value, j) => <F key={`${i}-${j}`} x={cx(j)} y={cy(i)} size={size} weight={highlight.some(([a, b]) => a === i && b === j) ? 700 : 400}>{show(value)}</F>))}
            {rowTotals?.map((value, i) => <F key={`r${i}`} x={cx(columns.length)} y={cy(i)} size={size}>{show(value)}</F>)}
            {columnTotals?.map((value, j) => <F key={`c${j}`} x={cx(j)} y={cy(rows.length)} size={size}>{show(value)}</F>)}
            {total !== undefined ? <F x={cx(columns.length)} y={cy(rows.length)} size={size} color={SECOND}>{show(total)}</F> : null}
            <line x1={x} x2={x + width} y1={y + rh / 2} y2={y + rh / 2} stroke={INK} strokeWidth={2} />
            <line x1={x + head} x2={x + head} y1={y - rh / 2} y2={y - rh / 2 + height} stroke={INK} strokeWidth={2} />
            {rowTotals ? <line x1={x + head + cell * columns.length} x2={x + head + cell * columns.length} y1={y - rh / 2} y2={y - rh / 2 + height} stroke={INK} strokeWidth={1.2} /> : null}
            {columnTotals ? <line x1={x} x2={x + width} y1={y + rh * (rows.length + 0.5)} y2={y + rh * (rows.length + 0.5)} stroke={INK} strokeWidth={1.2} /> : null}
        </g>
    )
}

/** Axes of a cloud: grid, the two axes, their numbers and their letters */
function CloudAxes({ x, y, xs, ys, language, xName = 'x', yName = 'y', size = 15 }: { x: (value: number) => number; y: (value: number) => number; xs: number[]; ys: number[]; language: UnitLanguage; xName?: string; yName?: string; size?: number }) {
    const [x0, x1] = [x(xs[0]), x(xs[xs.length - 1])]
    const [y0, y1] = [y(ys[0]), y(ys[ys.length - 1])]
    return (
        <g>
            {xs.map((value) => <line key={`gx${value}`} x1={x(value)} x2={x(value)} y1={y0} y2={y1} stroke={LINE} strokeWidth={1} />)}
            {ys.map((value) => <line key={`gy${value}`} x1={x0} x2={x1} y1={y(value)} y2={y(value)} stroke={LINE} strokeWidth={1} />)}
            <line x1={x0} x2={x1 + 12} y1={y0} y2={y0} stroke={INK} strokeWidth={2} />
            <line x1={x0} x2={x0} y1={y0} y2={y1 - 12} stroke={INK} strokeWidth={2} />
            {xs.map((value) => <F key={`nx${value}`} x={x(value)} y={y0 + 22} size={size} weight={400} color={MUTED}>{num(language, value)}</F>)}
            {ys.map((value) => <F key={`ny${value}`} x={x0 - 10} y={y(value) + 5} size={size} weight={400} color={MUTED} anchor="end">{num(language, value)}</F>)}
            <F x={x1 + 22} y={y0 + 6} size={18} color={INK}>{xName}</F>
            <F x={x0} y={y1 - 20} size={18} color={INK}>{yName}</F>
        </g>
    )
}

/* ---------- Ten pairs in a double-entry table ---------- */


export function DoubleTableFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    return (
        <Figure height={310} label={t(say('Hamar bikote sarrera bikoitzeko taula batean; (2, 1) bikotea 3 aldiz agertzen da', 'Diez pares en una tabla de doble entrada; el par (2, 1) sale 3 veces', 'عشرة أزواج في جدول مزدوج المدخل؛ يتكرّر الزوج (2, 1) ثلاث مرات', 'Ten pairs in a two-way table; the pair (2, 1) appears 3 times'))}>
            {FAMILY_PAIRS.map(([a, b], index) => {
                const chosen = a === 2 && b === 1
                return (
                    <g key={index}>
                        <rect x={18 + index * 69} y={18} width={63} height={34} rx={9} fill={chosen ? CORAL_TINT : PAPER} stroke={chosen ? SECOND : INK} strokeWidth={chosen ? 2.2 : 1.4} />
                        <F x={49.5 + index * 69} y={42} size={18} weight={chosen ? 700 : 400} color={chosen ? SECOND : INK}>({a}, {b})</F>
                    </g>
                )
            })}
            <TableGrid x={120} y={100} head={110} cell={110} rh={46} corner="X \ Y" rows={['1', '2', '3']} columns={['0', '1', '2']} cells={FAMILY_TABLE} highlight={[[1, 1]]} language={language} />
            <F x={600} y={190} size={26} color={SECOND}>N = 10</F>
            <Caption y={298}>{t(say('Errenkadetan X, zutabeetan Y; gelaxka bakoitza bikote baten maiztasuna da', 'X en las filas, Y en las columnas; cada casilla es la frecuencia de un par', 'X في الأسطر وY في الأعمدة؛ وكل خانة تكرار زوج', 'X in the rows, Y in the columns; each cell is the frequency of a pair'))}</Caption>
        </Figure>
    )
}

/* ---------- The margins of a table ---------- */


export function MarginalFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    return (
        <Figure height={330} label={t(say('Taula baten marjinak: errenkaden guztizkoak 6, 8 eta 6; zutabeenak 8 eta 12', 'Los márgenes de una tabla: totales de las filas 6, 8 y 6; de las columnas 8 y 12', 'هوامش جدول: مجاميع الأسطر 6 و8 و6، ومجموعا العمودين 8 و12', 'The margins of a table: row totals 6, 8 and 6; column totals 8 and 12'))}>
            <TableGrid x={60} y={36} head={110} cell={110} rh={48} corner="X \ Y" rows={['0', '1', '2']} columns={['0', '1']} cells={PETS_TABLE} rowTotals={[6, 8, 6]} columnTotals={[8, 12]} total={20} rowTint={STAGE_TINT} columnTint={CORAL_TINT} language={language} />
            <F x={600} y={110} size={24} color={STAGE}>x̄ = 1</F>
            <F x={600} y={160} size={24} color={SECOND}>ȳ = {num(language, 0.6)}</F>
            <Caption y={312}>{t(say('Errenkaden guztizkoak: X-ren banaketa · zutabeenak: Y-rena', 'Totales de las filas: la distribución de X · de las columnas: la de Y', 'مجاميع الأسطر: توزيع X · مجاميع الأعمدة: توزيع Y', 'Row totals: the distribution of X · column totals: that of Y'))}</Caption>
        </Figure>
    )
}

/* ---------- Two conditional distributions ---------- */

export function ConditionalFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const left = 130
    const width = 460
    const bars = [
        { y: 62, name: say('Kirola egiten dute (30)', 'Hacen deporte (30)', 'يمارسون الرياضة (30)', 'Do sport (30)'), parts: [[24, 30], [6, 30]] },
        { y: 168, name: say('Ez dute kirolik egiten (20)', 'No hacen deporte (20)', 'لا يمارسون الرياضة (20)', 'Do no sport (20)'), parts: [[10, 20], [10, 20]] }
    ]
    return (
        <Figure height={320} label={t(say('Bi banaketa baldintzatu: kirola egiten dutenen % 80 gainditzen dute; besteen % 50', 'Dos distribuciones condicionadas: aprueba el 80 % de los que hacen deporte y el 50 % de los demás', 'توزيعان شرطيان: ينجح 80٪ ممن يمارسون الرياضة و50٪ من الآخرين', 'Two conditional distributions: 80% of those who do sport pass, and 50% of the others'))}>
            {bars.map((bar) => {
                const first = (bar.parts[0][0] / bar.parts[0][1]) * width
                return (
                    <g key={bar.y}>
                        <Label x={left + width / 2} y={bar.y - 14} textAnchor="middle" fontSize={19} fontWeight={700} fill={INK}>{t(bar.name)}</Label>
                        <rect x={left} y={bar.y} width={first} height={52} fill={GREEN_TINT} stroke={INK} strokeWidth={2} />
                        <rect x={left + first} y={bar.y} width={width - first} height={52} fill={CORAL_TINT} stroke={INK} strokeWidth={2} />
                        <F x={left + first / 2} y={bar.y + 33} size={19} color={GREEN}>{bar.parts[0][0]}/{bar.parts[0][1]} = {num(language, bar.parts[0][0] / bar.parts[0][1])}</F>
                        <F x={left + first + (width - first) / 2} y={bar.y + 33} size={19} color={SECOND}>{num(language, bar.parts[1][0] / bar.parts[1][1])}</F>
                    </g>
                )
            })}
            <rect x={210} y={250} width={22} height={22} fill={GREEN_TINT} stroke={INK} strokeWidth={1.6} />
            <Label x={290} y={267} textAnchor="middle" fontSize={18} fill={INK}>{t(say('Gainditu', 'Aprueban', 'ينجحون', 'Pass'))}</Label>
            <rect x={410} y={250} width={22} height={22} fill={CORAL_TINT} stroke={INK} strokeWidth={1.6} />
            <Label x={490} y={267} textAnchor="middle" fontSize={18} fill={INK}>{t(say('Ez gainditu', 'Suspenden', 'يرسبون', 'Fail'))}</Label>
            <Caption y={306} size={17}>{t(say('Errenkada bakoitza bere guztizkoaz zatitzen da, ez N zenbakiaz', 'Cada fila se divide entre su total, no entre N', 'يُقسم كل سطر على مجموعه، لا على N', 'Each row is divided by its own total, not by N'))}</Caption>
        </Figure>
    )
}

/* ---------- A table completed for independence ---------- */


export function IndependenceFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const left = 410
    const width = 270
    const rows = [
        { y: 64, name: say('1. errenkada', 'Fila 1', 'السطر 1', 'Row 1'), parts: [12, 30] },
        { y: 168, name: say('2. errenkada', 'Fila 2', 'السطر 2', 'Row 2'), parts: [8, 20] }
    ]
    return (
        <Figure height={300} label={t(say('Independentziarako osatutako taula: bi errenkadek % 40 eta % 60 dute', 'Tabla completada para que haya independencia: las dos filas tienen el 40 % y el 60 %', 'جدول مكتمل ليتحقق الاستقلال: في السطرين 40٪ و60٪', 'A table completed for independence: both rows have 40% and 60%'))}>
            <TableGrid x={20} y={52} head={80} cell={84} rh={50} corner="X \ Y" rows={['1', '2']} columns={['1', '2']} cells={INDEPENDENT_TABLE} rowTotals={[30, 20]} columnTotals={[20, 30]} total={50} highlight={[[0, 0]]} language={language} />
            {rows.map((row) => {
                const first = (row.parts[0] / row.parts[1]) * width
                return (
                    <g key={row.y}>
                        <Label x={left + width / 2} y={row.y - 12} textAnchor="middle" fontSize={18} fontWeight={700} fill={INK}>{t(row.name)}</Label>
                        <rect x={left} y={row.y} width={first} height={46} fill={STAGE_TINT} stroke={INK} strokeWidth={2} />
                        <rect x={left + first} y={row.y} width={width - first} height={46} fill={PAPER} stroke={INK} strokeWidth={2} />
                        <F x={left + first / 2} y={row.y + 30} size={18} color={STAGE}>{row.parts[0]}/{row.parts[1]}</F>
                        <F x={left + first + (width - first) / 2} y={row.y + 30} size={18} color={MUTED}>{row.parts[1] - row.parts[0]}/{row.parts[1]}</F>
                    </g>
                )
            })}
            <line x1={left + width * 0.4} x2={left + width * 0.4} y1={44} y2={232} stroke={SECOND} strokeWidth={2.4} strokeDasharray="6 5" />
            <F x={left + width * 0.4} y={256} size={19} color={SECOND}>{num(language, 0.4)}</F>
            <Caption y={290} size={17}>{t(say('Errenkadak proportzionalak: banaketa baldintzatu bera, (1, 1) = 30 · 20 / 50', 'Filas proporcionales: la misma condicionada, (1, 1) = 30 · 20 / 50', 'الأسطر متناسبة: التوزيع الشرطي نفسه، (1, 1) = 30 · 20 / 50', 'Proportional rows: the same conditional, (1, 1) = 30 · 20 / 50'))}</Caption>
        </Figure>
    )
}

/* ---------- Three kinds of relation ---------- */

const CLOUD_A: Pair[] = [1, 2, 3, 4, 5, 6, 7, 8, 9].map((x) => [x, 0.11 * x * x + 0.5])
const CLOUD_B: Pair[] = [[1, 8.6], [2, 7.2], [2.6, 7.4], [3.4, 6.1], [4, 5.6], [5, 5.1], [5.6, 4], [6.4, 3.6], [7, 2.4], [8, 2.2], [8.8, 1.1]]
const CLOUD_C: Pair[] = [[1, 4], [1.8, 7.6], [2.4, 2.2], [3, 6], [3.8, 8.4], [4.6, 3.6], [5.2, 6.6], [6, 1.6], [6.8, 5], [7.6, 8], [8.4, 3], [9, 6.2]]

export function DependenceFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const panels = [
        { name: say('A: funtzionala', 'A: funcional', 'A: دالية', 'A: functional'), cloud: CLOUD_A, color: STAGE, curve: true },
        { name: say('B: sendoa eta negatiboa', 'B: fuerte y negativa', 'B: قوية وسالبة', 'B: strong and negative'), cloud: CLOUD_B, color: SECOND, curve: false },
        { name: say('C: mendekotasunik gabe', 'C: sin dependencia', 'C: بلا ارتباط', 'C: no dependence'), cloud: CLOUD_C, color: GREEN, curve: false }
    ]
    return (
        <Figure height={268} label={t(say('Hiru puntu-hodei: funtzionala, sendoa eta negatiboa, eta mendekotasunik gabea', 'Tres nubes de puntos: funcional, fuerte y negativa, y sin dependencia', 'ثلاث سحب نقاط: دالية، وقوية سالبة، وبلا ارتباط', 'Three scatter plots: functional, strong and negative, and with no dependence'))}>
            {panels.map((panel, index) => {
                const x0 = 16 + index * 236
                const px = (value: number) => x0 + 16 + value * 19
                const py = (value: number) => 196 - value * 17
                return (
                    <g key={index}>
                        <rect x={x0} y={18} width={216} height={196} rx={14} fill={PAPER} stroke={INK} strokeWidth={1.6} />
                        <line x1={px(0)} x2={px(10)} y1={py(0)} y2={py(0)} stroke={MUTED} strokeWidth={1.4} />
                        <line x1={px(0)} x2={px(0)} y1={py(0)} y2={py(10)} stroke={MUTED} strokeWidth={1.4} />
                        {panel.curve ? <polyline points={Array.from({ length: 45 }, (_, k) => 0.5 + k * 0.2).map((x) => `${px(x)},${py(0.11 * x * x + 0.5)}`).join(' ')} fill="none" stroke={panel.color} strokeWidth={1.6} strokeOpacity={0.5} /> : null}
                        {panel.cloud.map(([a, b], point) => <circle key={point} cx={px(a)} cy={py(b)} r={5.5} fill={panel.color} fillOpacity={0.8} stroke={INK} strokeWidth={1} />)}
                        <Label x={x0 + 108} y={246} textAnchor="middle" fontSize={18} fontWeight={700} fill={panel.color}>{t(panel.name)}</Label>
                    </g>
                )
            })}
        </Figure>
    )
}

/* ---------- The quadrants around the centre of gravity ---------- */


export function QuadrantsFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const x = (value: number) => 90 + value * 86
    const y = (value: number) => 282 - value * 30
    const { mx, my } = pairStats(QUADRANT_PAIRS)
    const products = deviationProducts(QUADRANT_PAIRS)
    return (
        <Figure height={350} label={t(say('Grabitate-zentroa (3, 4) eta lau koadranteak; biderkadurak 4, 1, 0, 1 eta 6 dira', 'El centro de gravedad (3, 4) y los cuatro cuadrantes; los productos son 4, 1, 0, 1 y 6', 'مركز الثقل (3, 4) والأرباع الأربعة؛ والجداءات 4 و1 و0 و1 و6', 'The centre of gravity (3, 4) and the four quadrants; the products are 4, 1, 0, 1 and 6'))}>
            <CloudAxes x={x} y={y} xs={[0, 1, 2, 3, 4, 5, 6]} ys={[0, 1, 2, 3, 4, 5, 6, 7, 8]} language={language} />
            {QUADRANT_PAIRS.map(([a, b], index) => {
                const positive = products[index] > 0
                return <rect key={index} x={Math.min(x(a), x(mx))} y={Math.min(y(b), y(my))} width={Math.abs(x(a) - x(mx))} height={Math.abs(y(b) - y(my))} fill={positive ? GREEN_TINT : CORAL_TINT} fillOpacity={0.85} stroke={positive ? GREEN : SECOND} strokeWidth={1.6} />
            })}
            <line x1={x(mx)} x2={x(mx)} y1={y(0)} y2={y(8)} stroke={SECOND} strokeWidth={2} strokeDasharray="6 5" />
            <line x1={x(0)} x2={x(6)} y1={y(my)} y2={y(my)} stroke={SECOND} strokeWidth={2} strokeDasharray="6 5" />
            {QUADRANT_PAIRS.map(([a, b], index) => (
                <g key={index}>
                    <circle cx={x(a)} cy={y(b)} r={7} fill={STAGE} stroke={INK} strokeWidth={1.4} />
                    <F x={x(a) + (a < mx ? -16 : 16)} y={y(b) + (b < my ? 22 : -12)} size={17} color={products[index] > 0 ? GREEN : MUTED} anchor={a < mx ? 'end' : 'start'}>{products[index] > 0 ? '+' : ''}{num(language, products[index])}</F>
                </g>
            ))}
            <circle cx={x(mx)} cy={y(my)} r={8} fill={SECOND} stroke={INK} strokeWidth={1.6} />
            <F x={x(mx) + 14} y={y(my) - 10} size={18} color={SECOND} anchor="start">(x̄, ȳ) = (3, 4)</F>
            {([['I', 5.6, 7.6], ['II', 0.6, 7.6], ['III', 0.6, 0.5], ['IV', 5.6, 0.5]] as const).map(([name, a, b]) => <F key={name} x={x(a)} y={y(b)} size={22} color={MUTED}>{name}</F>)}
            <F x={360} y={338} size={20} color={GREEN}>4 + 1 + 0 + 1 + 6 = 12 &gt; 0</F>
        </Figure>
    )
}

/* ---------- The working of a covariance ---------- */


export function CovarianceTableFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const columns = [90, 190, 300]
    const rowY = (index: number) => 72 + index * 38
    return (
        <Figure height={320} label={t(say('Kobariantzaren kalkulua: x · y zutabearen batura 69 da', 'El cálculo de la covarianza: la columna x · y suma 69', 'حساب التغاير: مجموع العمود x · y يساوي 69', 'Working out the covariance: the column x · y adds up to 69'))}>
            {['x', 'y', 'x · y'].map((name, index) => <F key={name} x={columns[index]} y={44} size={21} color={STAGE}>{name}</F>)}
            <line x1={40} x2={360} y1={54} y2={54} stroke={INK} strokeWidth={2} />
            {STUDY_PAIRS.map(([a, b], index) => (
                <g key={index}>
                    <F x={columns[0]} y={rowY(index) + 6} size={20} weight={400}>{a}</F>
                    <F x={columns[1]} y={rowY(index) + 6} size={20} weight={400}>{b}</F>
                    <F x={columns[2]} y={rowY(index) + 6} size={20} weight={400}>{a * b}</F>
                </g>
            ))}
            <line x1={40} x2={360} y1={252} y2={252} stroke={INK} strokeWidth={1.4} />
            <F x={50} y={282} size={21} color={SECOND} anchor="start">Σ</F>
            {[15, 20, 69].map((value, index) => <F key={index} x={columns[index]} y={282} size={21} color={SECOND}>{value}</F>)}
            <F x={545} y={96} size={21} color={STAGE}>x̄ = 15 / 5 = 3</F>
            <F x={545} y={136} size={21} color={STAGE}>ȳ = 20 / 5 = 4</F>
            <F x={545} y={186} size={21}>69 / 5 = {num(language, 13.8)}</F>
            <F x={545} y={238} size={22} color={SECOND}><Sigma index="xy" /> = {num(language, 13.8)} − 3 · 4 = {num(language, 1.8)}</F>
            <Caption y={306} size={17}>{t(say('Biderkaduren batez bestekoa ken batez bestekoen biderkadura', 'La media de los productos menos el producto de las medias', 'متوسط الجداءات ناقص جداء المتوسطين', 'The mean of the products minus the product of the means'))}</Caption>
        </Figure>
    )
}

/* ---------- r does not change with the units ---------- */


export function UnitsFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const panels = [
        { x0: 24, ticks: [1.6, 1.7, 1.8], unit: 'm', scale: 1 },
        { x0: 372, ticks: [160, 170, 180], unit: 'cm', scale: 100 }
    ]
    const r = pairStats(UNITS_PAIRS).r
    return (
        <Figure height={300} label={t(say('Hodei bera metrotan eta zentimetrotan: bietan r = 0,6', 'La misma nube en metros y en centímetros: en las dos, r = 0,6', 'السحابة نفسها بالأمتار وبالسنتيمترات: في الحالتين r = 0.6', 'The same cloud in metres and in centimetres: in both, r = 0.6'))}>
            {panels.map((panel) => {
                const px = (value: number) => panel.x0 + 50 + ((value / panel.scale - 1.55) / 0.3) * 250
                const py = (value: number) => 206 - ((value - 58) / 24) * 170
                return (
                    <g key={panel.unit}>
                        <rect x={panel.x0} y={14} width={324} height={232} rx={14} fill={PAPER} stroke={INK} strokeWidth={1.6} />
                        <line x1={panel.x0 + 40} x2={panel.x0 + 310} y1={206} y2={206} stroke={MUTED} strokeWidth={1.6} />
                        {panel.ticks.map((value) => (
                            <g key={value}>
                                <line x1={px(value)} x2={px(value)} y1={200} y2={212} stroke={MUTED} strokeWidth={1.4} />
                                <F x={px(value)} y={234} size={16} weight={400} color={MUTED}>{num(language, value)}</F>
                            </g>
                        ))}
                        <F x={panel.x0 + 300} y={190} size={17} color={MUTED} anchor="end">x ({panel.unit})</F>
                        {UNITS_PAIRS.map(([a, b], index) => <circle key={index} cx={px(a * panel.scale)} cy={py(b)} r={6.5} fill={STAGE} fillOpacity={0.8} stroke={INK} strokeWidth={1.2} />)}
                        <F x={panel.x0 + 86} y={52} size={22} color={SECOND}>r = {num(language, Math.round(r * 100) / 100)}</F>
                    </g>
                )
            })}
            <F x={360} y={146} size={26} color={SECOND}>→</F>
            <F x={360} y={104} size={16} color={SECOND}>· 100</F>
            <Caption y={282} size={17}>{t(say('100 bider: σx eta σxy ere 100 bider; r berdin', '×100: σx y σxy también ×100; r igual', '×100: σx وσxy أيضًا ×100؛ وr كما هو', '×100: σx and σxy also ×100; r the same'))}</Caption>
        </Figure>
    )
}

/* ---------- The two regression lines: vertical or horizontal distances ---------- */


export function RegressionLineFigure({ language, mode }: { language: UnitLanguage; mode: 'yx' | 'xy' }) {
    const t = useText(language)
    const yx = mode === 'yx'
    const pairs = yx ? YX_PAIRS : XY_PAIRS
    const stats = pairStats(pairs)
    const x = yx ? (value: number) => 90 + value * 68 : (value: number) => 90 + value * 52
    const y = yx ? (value: number) => 270 - value * 14 : (value: number) => 270 - value * 16
    const xs = yx ? [0, 1, 2, 3, 4, 5, 6, 7, 8] : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const ys = yx ? [0, 2, 4, 6, 8, 10, 12, 14, 16] : [0, 2, 4, 6, 8, 10, 12, 14]
    // y on x: y = 2x + 2 · x on y: x = 0,75y − 1
    const onLine = (value: number) => (yx ? stats.myx * value + (stats.my - stats.myx * stats.mx) : stats.mxy * value + (stats.mx - stats.mxy * stats.my))
    const ends: [Pair, Pair] = yx ? [[0.5, onLine(0.5)], [7.5, onLine(7.5)]] : [[onLine(2), 2], [onLine(13.6), 13.6]]
    return (
        <Figure height={330} label={t(yx
            ? say('Y-ren X-rekiko erregresio-zuzena, y = 2x + 2: distantzia bertikalak', 'Recta de regresión de Y sobre X, y = 2x + 2: distancias verticales', 'مستقيم انحدار y على x، y = 2x + 2: المسافات الرأسية', 'Regression line of y on x, y = 2x + 2: vertical distances')
            : say('X-ren Y-rekiko erregresio-zuzena, x = 0,75y − 1: distantzia horizontalak', 'Recta de regresión de X sobre Y, x = 0,75y − 1: distancias horizontales', 'مستقيم انحدار x على y، x = 0.75y − 1: المسافات الأفقية', 'Regression line of x on y, x = 0.75y − 1: horizontal distances'))}>
            <CloudAxes x={x} y={y} xs={xs} ys={ys} language={language} />
            <line x1={x(ends[0][0])} y1={y(ends[0][1])} x2={x(ends[1][0])} y2={y(ends[1][1])} stroke={yx ? STAGE : SECOND} strokeWidth={3} />
            {pairs.map(([a, b], index) => (yx
                ? <line key={index} x1={x(a)} x2={x(a)} y1={y(b)} y2={y(onLine(a))} stroke={MUTED} strokeWidth={2} strokeDasharray="4 4" />
                : <line key={index} x1={x(a)} x2={x(onLine(b))} y1={y(b)} y2={y(b)} stroke={MUTED} strokeWidth={2} strokeDasharray="4 4" />))}
            {pairs.map(([a, b], index) => <circle key={`p${index}`} cx={x(a)} cy={y(b)} r={7} fill={STAGE_TINT} stroke={INK} strokeWidth={1.6} />)}
            <circle cx={x(stats.mx)} cy={y(stats.my)} r={8} fill={SECOND} stroke={INK} strokeWidth={1.6} />
            <F x={x(stats.mx) + (yx ? 14 : -14)} y={y(stats.my) + (yx ? 24 : -12)} size={18} color={SECOND} anchor={yx ? 'start' : 'end'}>({num(language, stats.mx)}, {num(language, stats.my)})</F>
            {yx
                ? <F x={x(6.2)} y={y(16.2)} size={21} color={STAGE}>y = 2x + 2</F>
                : (
                    <g>
                        <line x1={x(0)} x2={x(8)} y1={y(12)} y2={y(12)} stroke={GREEN} strokeWidth={2} strokeDasharray="6 5" />
                        <line x1={x(8)} x2={x(8)} y1={y(12)} y2={y(0)} stroke={GREEN} strokeWidth={2} strokeDasharray="6 5" />
                        <circle cx={x(8)} cy={y(12)} r={7} fill={GREEN} stroke={INK} strokeWidth={1.4} />
                        <F x={x(8) + 14} y={y(12) + 6} size={18} color={GREEN} anchor="start">(8, 12)</F>
                        <F x={x(1.6)} y={y(13.4)} size={21} color={SECOND} anchor="start">x = {num(language, 0.75)}y − 1</F>
                    </g>
                )}
            <Caption y={318} size={17}>{t(yx
                ? say('Zuzenak puntuen distantzia bertikalak (y-ren erroreak) txikitzen ditu', 'La recta hace pequeñas las distancias verticales: los errores en y', 'يجعل المستقيم المسافات الرأسية صغيرة: أخطاء y', 'The line makes the vertical distances small: the errors in y')
                : say('Orain distantzia horizontalak (x-ren erroreak) txikitzen dira', 'Ahora se hacen pequeñas las distancias horizontales: los errores en x', 'الآن تُصغَّر المسافات الأفقية: أخطاء x', 'Now the horizontal distances are made small: the errors in x'))}</Caption>
        </Figure>
    )
}

/* ---------- An estimate inside and outside the data ---------- */

export function EstimationFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const x = (value: number) => 80 + value * 26
    const y = (value: number) => 262 - (value - 6) * 14
    const line = (value: number) => 0.5 * value + 8
    return (
        <Figure height={330} label={t(say('y = 0,5x + 8 zuzenarekin estimazioak: 7 orduz fidagarria, 20 orduz ez', 'Estimaciones con la recta y = 0,5x + 8: con 7 h es fiable, con 20 h no', 'تقديرات بالمستقيم y = 0.5x + 8: موثوق عند 7 ساعات، وغير موثوق عند 20', 'Estimates with the line y = 0.5x + 8: reliable at 7 h, not at 20 h'))}>
            <rect x={x(2)} y={y(20)} width={x(10) - x(2)} height={y(6) - y(20)} fill={GREEN_TINT} fillOpacity={0.6} />
            <rect x={x(10)} y={y(20)} width={x(22) - x(10)} height={y(6) - y(20)} fill={CORAL_TINT} fillOpacity={0.45} />
            <Label x={x(6)} y={y(19)} textAnchor="middle" fontSize={16} fontWeight={700} fill={GREEN}>{t(say('datuak', 'datos', 'البيانات', 'data'))}</Label>
            <Label x={x(16)} y={y(19)} textAnchor="middle" fontSize={16} fontWeight={700} fill={SECOND}>{t(say('datuetatik urrun', 'lejos de los datos', 'بعيدًا عن البيانات', 'far from the data'))}</Label>
            <CloudAxes x={x} y={y} xs={[0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22]} ys={[6, 8, 10, 12, 14, 16, 18, 20]} language={language} size={14} />
            <line x1={x(0)} y1={y(line(0))} x2={x(10)} y2={y(line(10))} stroke={STAGE} strokeWidth={3} />
            <line x1={x(10)} y1={y(line(10))} x2={x(22)} y2={y(line(22))} stroke={STAGE} strokeWidth={3} strokeDasharray="8 6" />
            {sunPairs.map(([a, b], index) => <circle key={index} cx={x(a)} cy={y(b)} r={6} fill={STAGE_TINT} stroke={INK} strokeWidth={1.4} />)}
            {([[7, GREEN], [20, SECOND]] as const).map(([value, color]) => (
                <g key={value}>
                    <line x1={x(value)} x2={x(value)} y1={y(6)} y2={y(line(value))} stroke={color} strokeWidth={2} strokeDasharray="5 4" />
                    <circle cx={x(value)} cy={y(line(value))} r={7} fill={color} stroke={INK} strokeWidth={1.4} />
                    <F x={x(value) + (value === 7 ? -10 : 10)} y={y(line(value)) - 14} size={18} color={color} anchor={value === 7 ? 'end' : 'start'}>{num(language, line(value))}{value === 20 ? ' ?' : ''}</F>
                </g>
            ))}
            <F x={x(0.6)} y={y(16.4)} size={20} color={STAGE} anchor="start">y = {num(language, 0.5)}x + 8</F>
            <Caption y={318} size={17}>{t(say('Datuen tartean estimazioa fidagarria da; urrun, ez', 'Dentro de los datos la estimación es fiable; lejos de ellos, no', 'داخل البيانات التقدير موثوق؛ وبعيدًا عنها لا', 'Within the data the estimate is reliable; far from them, it is not'))}</Caption>
        </Figure>
    )
}

/* ---------- The two lines cross at the centre of gravity ---------- */

export function TwoLinesFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const x = (value: number) => 90 + value * 52
    const y = (value: number) => 280 - value * 11.5
    // y = 0,9x + 5,5 (y on x) and x = 0,4y + 1, that is y = 2,5x − 2,5 (x on y)
    const first = (value: number) => 0.9 * value + 5.5
    const second = (value: number) => 2.5 * value - 2.5
    const angleA = Math.atan(0.9 * 11.5 / 52)
    const angleB = Math.atan(2.5 * 11.5 / 52)
    const radius = 56
    const arc = `M ${x(5) + radius * Math.cos(angleA)} ${y(10) - radius * Math.sin(angleA)} A ${radius} ${radius} 0 0 0 ${x(5) + radius * Math.cos(angleB)} ${y(10) - radius * Math.sin(angleB)}`
    return (
        <Figure height={340} label={t(say('Bi erregresio-zuzenak (5, 10) puntuan ebakitzen dira; r² = 0,36', 'Las dos rectas de regresión se cortan en (5, 10); r² = 0,36', 'يتقاطع مستقيما الانحدار في (5, 10)؛ r² = 0.36', 'The two regression lines cross at (5, 10); r² = 0.36'))}>
            <CloudAxes x={x} y={y} xs={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]} ys={[0, 4, 8, 12, 16, 20]} language={language} />
            <line x1={x(0)} y1={y(first(0))} x2={x(10)} y2={y(first(10))} stroke={STAGE} strokeWidth={3} />
            <line x1={x(1)} y1={y(second(1))} x2={x(9)} y2={y(second(9))} stroke={SECOND} strokeWidth={3} />
            <path d={arc} fill="none" stroke={MUTED} strokeWidth={2} />
            <circle cx={x(5)} cy={y(10)} r={8} fill={INK} />
            <F x={x(5) + 16} y={y(10) + 26} size={19} anchor="start">(5, 10)</F>
            <F x={x(10)} y={y(first(10)) + 30} size={20} color={STAGE} anchor="end">y = {num(language, 0.9)}x + {num(language, 5.5)}</F>
            <F x={x(9) - 12} y={y(second(9)) + 4} size={20} color={SECOND} anchor="end">x = {num(language, 0.4)}y + 1</F>
            <F x={110} y={86} size={20} color={INK} anchor="start">r² = {num(language, 0.9)} · {num(language, 0.4)} = {num(language, 0.36)}</F>
            <Caption y={330} size={17}>{t(say('Korrelazioa zenbat eta sendoagoa, orduan eta itxiago guraizeak', 'Cuanto más fuerte la correlación, más cerradas las tijeras', 'كلما قوي الارتباط انغلق المقصّ أكثر', 'The stronger the correlation, the more closed the scissors'))}</Caption>
        </Figure>
    )
}

/* ---------- A table with intervals in both variables ---------- */


export function GroupedPairsFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    return (
        <Figure height={300} label={t(say('Bi aldagaiak tarteetan: klase-markak x = 10, 20 eta y = 1, 3', 'Las dos variables en intervalos: marcas de clase x = 10, 20 e y = 1, 3', 'المتغيران في فئات: مراكز الفئات x = 10, 20 وy = 1, 3', 'Both variables in intervals: class marks x = 10, 20 and y = 1, 3'))}>
            <TableGrid x={90} y={58} head={150} cell={120} rh={54} corner="X \ Y" rows={['[5, 15)', '[15, 25)']} columns={['[0, 2)', '[2, 4)']} cells={GROUPED_TABLE} rowTotals={[8, 12]} columnTotals={[8, 12]} total={20} language={language} />
            {(['y = 1', 'y = 3'] as const).map((mark, index) => <F key={mark} x={90 + 150 + 120 * (index + 0.5)} y={30} size={17} color={SECOND}>{mark}</F>)}
            {(['x = 10', 'x = 20'] as const).map((mark, index) => <F key={mark} x={52} y={124 + index * 54} size={17} color={SECOND}>{mark}</F>)}
            <Caption y={284} size={17}>{t(say('Tarte bakoitzaren ordez, bere klase-marka; gelaxka bakoitzak bere maiztasuna', 'Cada intervalo, por su marca de clase; cada casilla, con su frecuencia', 'كل فئة بمركزها، وكل خانة بتكرارها', 'Each interval by its class mark; each cell with its frequency'))}</Caption>
        </Figure>
    )
}

/* ---------- The working table with its five sums ---------- */


export function CalcTableFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const columnX = (index: number) => 104 + index * 128
    const rowY = (index: number) => 82 + index * 40
    const rows = WORKING_PAIRS.map(([a, b]) => [a, b, a * a, b * b, a * b])
    const sums = [0, 1, 2, 3, 4].map((index) => rows.reduce((total, row) => total + row[index], 0))
    const heads: ReactNode[] = ['x', 'y', <>x<tspan fontSize="70%" dy={-8}>2</tspan></>, <>y<tspan fontSize="70%" dy={-8}>2</tspan></>, 'x · y']
    return (
        <Figure height={300} label={t(say('Kalkulu-taula: x, y, x², y² eta x · y zutabeak; baturak 12, 16, 46, 74 eta 56', 'La tabla de cálculo: columnas x, y, x², y² y x · y; sumas 12, 16, 46, 74 y 56', 'جدول الحساب: الأعمدة x وy وx² وy² وx · y؛ والمجاميع 12 و16 و46 و74 و56', 'The working table: columns x, y, x², y² and x · y; sums 12, 16, 46, 74 and 56'))}>
            {heads.map((head, index) => <F key={index} x={columnX(index)} y={46} size={21} color={STAGE}>{head}</F>)}
            <line x1={40} x2={680} y1={58} y2={58} stroke={INK} strokeWidth={2} />
            {rows.map((row, i) => row.map((value, j) => <F key={`${i}-${j}`} x={columnX(j)} y={rowY(i) + 6} size={20} weight={400}>{value}</F>))}
            <line x1={40} x2={680} y1={226} y2={226} stroke={INK} strokeWidth={1.4} />
            <F x={48} y={258} size={21} color={SECOND} anchor="start">Σ</F>
            {sums.map((value, index) => <F key={index} x={columnX(index)} y={258} size={21} color={SECOND}>{value}</F>)}
            <Caption y={290} size={17}>{t(say('Bost baturekin dena ateratzen da: batez bestekoak, bariantzak, σxy eta r', 'Con las cinco sumas sale todo: medias, varianzas, σxy y r', 'من المجاميع الخمسة يخرج كل شيء: المتوسطان والتباينان وσxy وr', 'From the five sums you get everything: means, variances, σxy and r'))}</Caption>
        </Figure>
    )
}

/* ---------- Hero art ---------- */

export function BivariateHeroArt() {
    const cloud: Pair[] = [[18, 120], [36, 112], [50, 96], [66, 92], [80, 76], [96, 70], [112, 56], [128, 50], [146, 36]]
    return (
        <div className="fraction-v2-collage" aria-hidden="true">
            <svg viewBox="0 0 520 400" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                <g transform="translate(30 36) rotate(-4)">
                    <rect width={236} height={170} rx={16} fill={PAPER} stroke={INK} strokeWidth={2} />
                    <line x1={20} x2={216} y1={150} y2={150} stroke={INK} strokeWidth={2} />
                    <line x1={20} x2={20} y1={150} y2={18} stroke={INK} strokeWidth={2} />
                    <line x1={24} y1={132} x2={210} y2={30} stroke="#2f6fdb" strokeWidth={3} />
                    <line x1={46} y1={146} x2={186} y2={20} stroke="#c4432a" strokeWidth={3} />
                    {cloud.map(([cx, cy], index) => <circle key={index} cx={cx + 26} cy={cy + 6} r={6} fill="#2f6fdb" fillOpacity={0.7} stroke={INK} strokeWidth={1.2} />)}
                </g>
                <g transform="translate(290 34) rotate(4)">
                    <rect width={200} height={132} rx={16} fill="#fbebc0" stroke={INK} strokeWidth={2} />
                    <line x1={18} x2={182} y1={44} y2={44} stroke={INK} strokeWidth={2} />
                    <line x1={64} x2={64} y1={14} y2={118} stroke={INK} strokeWidth={2} />
                    {[[12, 18], [8, 12]].map((row, i) => row.map((value, j) => <text key={`${i}-${j}`} x={100 + j * 56} y={78 + i * 34} textAnchor="middle" fontSize={22} fontWeight={700} fill={INK}>{value}</text>))}
                    <text x={40} y={34} textAnchor="middle" fontSize={16} fill={INK}>X\Y</text>
                </g>
                <g transform="translate(286 200) rotate(-3)">
                    <rect width={204} height={112} rx={16} fill="#e8e0f7" stroke={INK} strokeWidth={2} />
                    <text x={102} y={52} textAnchor="middle" fontSize={22} fontWeight={700} fill="#c4432a" fontFamily="Fraunces, serif" direction="ltr">σxy = Σxy/N − x̄ȳ</text>
                    <text x={102} y={88} textAnchor="middle" fontSize={22} fontWeight={700} fill={INK} fontFamily="Fraunces, serif" direction="ltr">r = σxy / σxσy</text>
                </g>
                <g transform="translate(44 236)">
                    <rect width={220} height={124} rx={16} fill="#d6eddf" stroke={INK} strokeWidth={2} />
                    <text x={110} y={56} textAnchor="middle" fontSize={24} fontWeight={700} fill={INK} fontFamily="Fraunces, serif" direction="ltr">(x̄, ȳ)</text>
                    <text x={110} y={96} textAnchor="middle" fontSize={22} fontWeight={700} fill="#267b53" fontFamily="Fraunces, serif" direction="ltr">r² = m · m′</text>
                </g>
            </svg>
        </div>
    )
}
