import type { ReactNode } from 'react'
import { pickText, type LocalizedText, type UnitLanguage } from '../../features/unit-v2/types'
import { AxisTitles, Label, PlaneGrid, PlaneLine, PlanePath, PlanePoint } from '../dbh2-funtzioak-v2/plane'
import { useBoxClip } from '../dbh2-funtzioak-v2/planeClip'
import { planeMap, type PlaneBox, type PlaneMap } from '../dbh2-funtzioak-v2/planeMap'
import { Figure } from '../dbh2-zatikiak-prototype/figures'
import { region, type HalfPlane, type Point } from '../dbh4-akademikoak-sistemak/systems'

/* ==========================================================================
   Ekuazio-sistemak · Batxilergoa 1 · Zientziak — the new lesson figures:
   the three allowed operations, a staircase solved from the bottom up, the
   zeros Gauss makes under the diagonal, a system and its augmented matrix,
   the ticket problem, the three last rows, the family (3 − λ, 1, λ), the
   lines that turn parallel when a = 4, a cubic cut by a line, the two
   candidates of a logarithmic system, the change u = 2ˣ, v = 3ʸ, the right
   triangle 6–8–10, a triangular region and the closed, open and empty
   regions. The solutions of one equation and the kinds of 2 × 2 systems
   reuse the 4. DBH figures. Formulas sit in their own <text> (left to
   right in every language); words go through <Label>.
   ========================================================================== */

const INK = 'var(--ink, #1d2733)'
const MUTED = 'var(--muted, #58616e)'
const STAGE = 'var(--stage, #2f6fdb)'
const STAGE_TINT = 'var(--stage-tint, #dde7f7)'
const SECOND = 'var(--second, #c4432a)'
const GREEN = 'var(--success, #267b53)'
const GREEN_TINT = '#d6eddf'
const CORAL_TINT = '#f6dcd3'
const MUSTARD_TINT = '#fbebc0'
const CARD = 'var(--card, #fffcf6)'
const PAPER = '#fffcf6'
const REGION = 'rgba(38, 123, 83, 0.22)'

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const useText = (language: UnitLanguage) => (text: LocalizedText) => pickText(language, text)

function Caption({ y, children }: { y: number; children: ReactNode }) {
    return <Label x={360} y={y} textAnchor="middle" fontSize={20} fill={MUTED}>{children}</Label>
}

/** A formula written left to right whatever the language */
function F({ x, y, children, size = 22, color = INK, anchor = 'start', weight = 700 }: { x: number; y: number; children: ReactNode; size?: number; color?: string; anchor?: 'start' | 'middle' | 'end'; weight?: number }) {
    return <text x={x} y={y} textAnchor={anchor} fontSize={size} fontWeight={weight} fill={color} direction="ltr">{children}</text>
}

function Card({ x, y, width, height, tint, stroke = INK, dashed = false, children }: { x: number; y: number; width: number; height: number; tint: string; stroke?: string; dashed?: boolean; children?: ReactNode }) {
    return (
        <g>
            <rect x={x} y={y} width={width} height={height} rx={14} fill={tint} stroke={stroke} strokeWidth={1.8} strokeDasharray={dashed ? '7 5' : undefined} />
            {children}
        </g>
    )
}

function Arrow({ x1, y1, x2, y2, color = MUTED }: { x1: number; y1: number; x2: number; y2: number; color?: string }) {
    const angle = Math.atan2(y2 - y1, x2 - x1)
    const back = (dx: number, dy: number) => `${x2 - 12 * Math.cos(angle) + dx * Math.sin(angle)},${y2 - 12 * Math.sin(angle) - dx * Math.cos(angle) + dy}`
    return (
        <g>
            <line x1={x1} y1={y1} x2={x2 - 8 * Math.cos(angle)} y2={y2 - 8 * Math.sin(angle)} stroke={color} strokeWidth={2.6} />
            <polygon points={`${x2},${y2} ${back(6, 0)} ${back(-6, 0)}`} fill={color} />
        </g>
    )
}

/** Equations stacked behind a brace */
function Brace({ x, y, lines, size = 22, gap = 36 }: { x: number; y: number; lines: string[]; size?: number; gap?: number }) {
    const height = (lines.length - 1) * gap + size
    return (
        <g>
            <path d={`M${x + 12} ${y - size} q-10 0 -10 12 v${height / 2 - 18} q0 8 -8 8 q8 0 8 8 v${height / 2 - 18} q0 12 10 12`} fill="none" stroke={INK} strokeWidth={2} />
            {lines.map((line, index) => <F key={index} x={x + 22} y={y + index * gap} size={size}>{line}</F>)}
        </g>
    )
}

/** A small Cartesian plane placed at (ox, oy) inside a figure */
function Frame({ box, cell, ox, oy, labelStep = 1, labels = true, children }: { box: PlaneBox; cell: number; ox: number; oy: number; labelStep?: number; labels?: boolean; children?: (map: PlaneMap, clip: string) => ReactNode }) {
    const map = planeMap(box, cell, ox, oy)
    const [clipPath, clip] = useBoxClip(map)
    return (
        <g>
            <defs>{clipPath}</defs>
            <rect x={ox} y={oy} width={map.width} height={map.height} fill={CARD} />
            <PlaneGrid map={map} labelStep={labelStep} labels={labels} />
            <AxisTitles map={map} />
            {children?.(map, clip)}
        </g>
    )
}

const polygonPoints = (map: PlaneMap, points: Point[]) => points.map(([x, y]) => `${map.x(x)},${map.y(y)}`).join(' ')

/* ---------- The three operations that keep the solutions ---------- */

export function EquivalentFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const rows = [
        { math: 'E₁ ↔ E₂', text: say('bi ekuazio trukatu', 'intercambiar dos ecuaciones', 'مبادلة معادلتين', 'swap two equations'), ok: true },
        { math: 'k · E₁   (k ≠ 0)', text: say('0 ez den zenbaki batez biderkatu', 'multiplicar por un número distinto de 0', 'الضرب في عدد غير 0', 'multiply by a number other than 0'), ok: true },
        { math: 'E₂ + k · E₁', text: say('beste baten multiplo bat batu', 'sumar un múltiplo de otra', 'إضافة مضاعف معادلة أخرى', 'add a multiple of another'), ok: true },
        { math: '0 · E₁', text: say('ekuazioa galtzen da', 'se pierde la ecuación', 'تضيع المعادلة', 'the equation is lost'), ok: false }
    ]
    return (
        <Figure height={392} label={t(say('Soluzioak aldatzen ez dituzten hiru eragiketak, eta debekatutakoa: 0 zenbakiaz biderkatzea', 'Las tres operaciones que no cambian las soluciones, y la prohibida: multiplicar por 0', 'العمليات الثلاث التي لا تغيّر الحلول، والممنوعة: الضرب في 0', 'The three operations that do not change the solutions, and the forbidden one: multiplying by 0'))}>
            {rows.map((row, index) => {
                const y = 22 + index * 84
                return (
                    <Card key={row.math} x={40} y={y} width={640} height={72} tint={row.ok ? (index % 2 === 0 ? STAGE_TINT : PAPER) : CORAL_TINT} stroke={row.ok ? INK : SECOND} dashed={!row.ok}>
                        <F x={66} y={y + 32} size={24} color={row.ok ? INK : SECOND}>{row.math}</F>
                        <Label x={66} y={y + 60} fontSize={20} fill={row.ok ? MUTED : SECOND}>{t(row.text)}</Label>
                        <F x={640} y={y + 48} anchor="middle" size={32} color={row.ok ? GREEN : SECOND}>{row.ok ? '✓' : '✗'}</F>
                    </Card>
                )
            })}
            <Caption y={376}>{t(say('Lehen hirurekin, sistema berria baliokidea da', 'Con las tres primeras, el sistema nuevo es equivalente', 'بالعمليات الثلاث الأولى يكون النظام الجديد مكافئًا', 'With the first three, the new system is equivalent'))}</Caption>
        </Figure>
    )
}

/* ---------- A staircase solved from the bottom up ---------- */

export function StaircaseFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const steps = [
        { equation: 'x + y + z = 6', value: 'x = 1', indent: 0 },
        { equation: 'y − z = −1', value: 'y = 2', indent: 1 },
        { equation: '2z = 6', value: 'z = 3', indent: 2 }
    ]
    return (
        <Figure height={330} label={t(say('Sistema mailakatua: z = 3 behean, gero y = 2 eta goian x = 1', 'Sistema escalonado: z = 3 abajo, después y = 2 y arriba x = 1', 'نظام درجي: z = 3 في الأسفل، ثم y = 2، وفي الأعلى x = 1', 'Triangular system: z = 3 at the bottom, then y = 2 and x = 1 at the top'))}>
            {steps.map((step, index) => {
                const y = 30 + index * 86
                const x = 40 + step.indent * 70
                return (
                    <g key={step.equation}>
                        <Card x={x} y={y} width={420 - step.indent * 70} height={62} tint={index === 2 ? MUSTARD_TINT : STAGE_TINT}>
                            <F x={x + (420 - step.indent * 70) / 2} y={y + 41} anchor="middle" size={26}>{step.equation}</F>
                        </Card>
                        <Card x={520} y={y + 6} width={160} height={50} tint={GREEN_TINT} stroke={GREEN}>
                            <F x={600} y={y + 40} anchor="middle" size={24} color={GREEN}>{step.value}</F>
                        </Card>
                        {index > 0 && <Arrow x1={600} y1={y + 4} x2={600} y2={y - 22} color={GREEN} />}
                    </g>
                )
            })}
            <Caption y={308}>{t(say('Behetik gora: balio bakoitza goiko ekuazioan ordezten da', 'De abajo arriba: cada valor se sustituye en la ecuación de encima', 'من الأسفل إلى الأعلى: تُعوَّض كل قيمة في المعادلة التي فوقها', 'From the bottom up: each value is substituted into the equation above'))}</Caption>
        </Figure>
    )
}

/* ---------- The zeros Gauss makes under the diagonal ---------- */

export function EliminationFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    // Which entries are zero after each stage: none, the first column, then the second
    const stages = [
        { title: say('Hasieran', 'Al principio', 'في البداية', 'At the start'), zeros: [] as Array<[number, number]>, op: '' },
        { title: say('x kenduta', 'Sin la x', 'بلا x', 'Without x'), zeros: [[1, 0], [2, 0]] as Array<[number, number]>, op: 'E₂ − 2E₁, E₃ − E₁' },
        { title: say('y kenduta', 'Sin la y', 'بلا y', 'Without y'), zeros: [[1, 0], [2, 0], [2, 1]] as Array<[number, number]>, op: '3E₃ + E₂' }
    ]
    return (
        <Figure height={318} label={t(say('Gaussen metodoa: lehenik lehen zutabeko bi zeroak, gero bigarren zutabekoa', 'El método de Gauss: primero los dos ceros de la primera columna, después el de la segunda', 'طريقة غاوس: أولًا صفرا العمود الأول، ثم صفر العمود الثاني', 'Gaussian elimination: first the two zeros of the first column, then the one in the second'))}>
            {stages.map((stage, index) => {
                const ox = 30 + index * 236
                return (
                    <g key={index}>
                        <Label x={ox + 96} y={36} textAnchor="middle" fontSize={20} fontWeight={700} fill={INK}>{t(stage.title)}</Label>
                        {[0, 1, 2].map((row) => [0, 1, 2].map((column) => {
                            const zero = stage.zeros.some(([r, c]) => r === row && c === column)
                            const fresh = zero && !stages[index - 1]?.zeros.some(([r, c]) => r === row && c === column)
                            return (
                                <g key={`${row}${column}`}>
                                    <rect x={ox + column * 64} y={56 + row * 64} width={56} height={56} rx={10} fill={zero ? (fresh ? GREEN_TINT : PAPER) : row === column ? MUSTARD_TINT : STAGE_TINT} stroke={fresh ? GREEN : INK} strokeWidth={fresh ? 2.6 : 1.4} />
                                    <F x={ox + column * 64 + 28} y={56 + row * 64 + 37} anchor="middle" size={24} color={zero ? GREEN : INK}>{zero ? '0' : ['x', 'y', 'z'][column]}</F>
                                </g>
                            )
                        }))}
                        {stage.op && <F x={ox + 96} y={274} anchor="middle" size={18} color={STAGE}>{stage.op}</F>}
                    </g>
                )
            })}
            <Caption y={308}>{t(say('Diagonalaren azpian zeroak: sistema mailakatuta geratzen da', 'Ceros bajo la diagonal: el sistema queda escalonado', 'أصفار تحت القطر: يصير النظام درجيًّا', 'Zeros below the diagonal: the system becomes triangular'))}</Caption>
        </Figure>
    )
}

/* ---------- A system and its augmented matrix ---------- */

export function AugmentedMatrixFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const rows = [['1', '−1', '2', '1'], ['2', '1', '1', '8'], ['−1', '2', '1', '5']]
    const left = 400
    return (
        <Figure height={320} label={t(say('x − y + 2z = 1, 2x + y + z = 8, −x + 2y + z = 5 sistema eta haren matrize zabaldua', 'El sistema x − y + 2z = 1, 2x + y + z = 8, −x + 2y + z = 5 y su matriz ampliada', 'النظام x − y + 2z = 1 و2x + y + z = 8 و−x + 2y + z = 5 ومصفوفته الموسعة', 'The system x − y + 2z = 1, 2x + y + z = 8, −x + 2y + z = 5 and its augmented matrix'))}>
            <Brace x={30} y={92} lines={['x − y + 2z = 1', '2x + y + z = 8', '−x + 2y + z = 5']} size={22} gap={48} />
            <Arrow x1={290} y1={140} x2={360} y2={140} />
            <path d={`M${left + 10} 56 q-16 0 -16 20 v132 q0 20 16 20`} fill="none" stroke={INK} strokeWidth={2.4} />
            <path d={`M${left + 270} 56 q16 0 16 20 v132 q0 20 -16 20`} fill="none" stroke={INK} strokeWidth={2.4} />
            <line x1={left + 196} y1={60} x2={left + 196} y2={224} stroke={INK} strokeWidth={2} />
            {rows.map((row, r) => row.map((value, c) => (
                <F key={`${r}${c}`} x={left + 40 + c * 62 + (c === 3 ? 18 : 0)} y={100 + r * 48} anchor="middle" size={24} color={c === 3 ? SECOND : INK}>{value}</F>
            )))}
            {['x', 'y', 'z'].map((name, c) => <F key={name} x={left + 40 + c * 62} y={46} anchor="middle" size={18} color={STAGE} weight={600}>{name}</F>)}
            <Label x={left + 100} y={256} textAnchor="middle" fontSize={18} fill={MUTED}>{t(say('koefizienteak', 'coeficientes', 'المعاملات', 'coefficients'))}</Label>
            <Label x={left + 236} y={256} textAnchor="middle" fontSize={18} fill={SECOND}>{t(say('gai askeak', 'términos indep.', 'الحدود الثابتة', 'constants'))}</Label>
            <Caption y={304}>{t(say('Errenkada bat ekuazio bakoitzeko; marraren ondoren, gai askeak', 'Una fila por ecuación; tras la barra, los términos independientes', 'صف لكل معادلة؛ وبعد الخط الحدود الثابتة', 'One row per equation; after the bar, the constant terms'))}</Caption>
        </Figure>
    )
}

/* ---------- The ticket problem ---------- */

export function TicketsFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const english = language === 'en'
    const kinds = [
        { price: english ? '€4' : '4 €', count: 30, name: 'x', tint: STAGE_TINT },
        { price: english ? '€6' : '6 €', count: 20, name: 'y', tint: MUSTARD_TINT },
        { price: english ? '€8' : '8 €', count: 50, name: 'z', tint: GREEN_TINT }
    ]
    const unit = 5.6
    return (
        <Figure height={330} label={t(say('Zinemako sarrerak: 30 4 euroan, 20 6 euroan eta 50 8 euroan; guztira 100 sarrera eta 640 €', 'Entradas del cine: 30 de 4 €, 20 de 6 € y 50 de 8 €; en total 100 entradas y 640 €', 'تذاكر السينما: 30 بسعر 4 € و20 بسعر 6 € و50 بسعر 8 €؛ أي 100 تذكرة و640 €', 'Cinema tickets: 30 at €4, 20 at €6 and 50 at €8; 100 tickets and €640 in all'))}>
            {kinds.map((kind, index) => {
                const y = 30 + index * 76
                return (
                    <g key={kind.name}>
                        <Card x={30} y={y} width={120} height={56} tint={kind.tint}>
                            <F x={90} y={y + 37} anchor="middle" size={24}>{kind.price}</F>
                        </Card>
                        <rect x={170} y={y + 8} width={kind.count * unit} height={40} rx={8} fill={kind.tint} stroke={INK} strokeWidth={1.4} />
                        <F x={180 + kind.count * unit} y={y + 36} size={24} color={STAGE}>{`${kind.name} = ${kind.count}`}</F>
                    </g>
                )
            })}
            <F x={360} y={274} anchor="middle" size={22} color={GREEN}>x + y + z = 100     z = x + y</F>
            <Caption y={314}>{t(say('Datu bakoitzak ekuazio bat ematen du', 'Cada dato da una ecuación', 'كل معطى يعطي معادلة', 'Each piece of data gives an equation'))}</Caption>
        </Figure>
    )
}

/* ---------- The three last rows ---------- */

export function LastRowFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const rows = [
        { cells: ['0', '0', '3', '6'], title: say('Bateragarri determinatua', 'Compatible determinado', 'متوافق محدد', 'Consistent, independent'), text: say('soluzio bat: z = 2', 'una solución: z = 2', 'حل واحد: z = 2', 'one solution: z = 2'), tint: GREEN_TINT, color: GREEN },
        { cells: ['0', '0', '0', '0'], title: say('Bateragarri indeterminatua', 'Compatible indeterminado', 'متوافق غير محدد', 'Consistent, dependent'), text: say('errenkada soberan: infinitu', 'la fila sobra: infinitas', 'صف زائد: ما لا نهاية', 'spare row: infinitely many'), tint: MUSTARD_TINT, color: INK },
        { cells: ['0', '0', '0', '5'], title: say('Bateraezina', 'Incompatible', 'غير متوافق', 'Inconsistent'), text: say('0z = 5 ezinezkoa: bat ere ez', '0z = 5 es imposible: ninguna', '0z = 5 مستحيلة: لا حل', '0z = 5 is impossible: none'), tint: CORAL_TINT, color: SECOND }
    ]
    return (
        <Figure height={330} label={t(say('Azken errenkada: 0 0 3 | 6 soluzio bat, 0 0 0 | 0 infinitu, 0 0 0 | 5 bat ere ez', 'La última fila: 0 0 3 | 6 una solución, 0 0 0 | 0 infinitas, 0 0 0 | 5 ninguna', 'الصف الأخير: 0 0 3 | 6 حل واحد، 0 0 0 | 0 ما لا نهاية، 0 0 0 | 5 لا حل', 'The last row: 0 0 3 | 6 one solution, 0 0 0 | 0 infinitely many, 0 0 0 | 5 none'))}>
            {rows.map((row, index) => {
                const y = 24 + index * 94
                return (
                    <g key={index}>
                        <Card x={30} y={y} width={250} height={70} tint={row.tint} stroke={row.color}>
                            {row.cells.map((cell, c) => <F key={c} x={66 + c * 52 + (c === 3 ? 14 : 0)} y={y + 46} anchor="middle" size={26} color={c === 3 ? SECOND : INK}>{cell}</F>)}
                            <line x1={208} y1={y + 14} x2={208} y2={y + 56} stroke={INK} strokeWidth={2} />
                        </Card>
                        <Arrow x1={292} y1={y + 35} x2={340} y2={y + 35} color={row.color} />
                        <Label x={352} y={y + 30} fontSize={20} fontWeight={700} fill={row.color}>{t(row.title)}</Label>
                        <Label x={352} y={y + 58} fontSize={18} fill={MUTED}>{t(row.text)}</Label>
                    </g>
                )
            })}
        </Figure>
    )
}

/* ---------- The family (3 − λ, 1, λ) ---------- */

export function ParametricFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const values = [0, 1, 2, 3]
    return (
        <Figure height={334} label={t(say('(3 − λ, 1, λ) soluzio orokorra: λ = 0, 1, 2, 3 balioekin (3, 1, 0), (2, 1, 1), (1, 1, 2) eta (0, 1, 3)', 'La solución general (3 − λ, 1, λ): con λ = 0, 1, 2, 3 salen (3, 1, 0), (2, 1, 1), (1, 1, 2) y (0, 1, 3)', 'الحل العام (3 − λ, 1, λ): مع λ = 0, 1, 2, 3 نحصل على (3, 1, 0) و(2, 1, 1) و(1, 1, 2) و(0, 1, 3)', 'The general solution (3 − λ, 1, λ): λ = 0, 1, 2, 3 give (3, 1, 0), (2, 1, 1), (1, 1, 2) and (0, 1, 3)'))}>
            <F x={360} y={44} anchor="middle" size={28} color={STAGE}>(3 − λ, 1, λ)</F>
            {values.map((lambda, index) => {
                const x = 30 + index * 168
                return (
                    <g key={lambda}>
                        <Card x={x} y={76} width={152} height={56} tint={MUSTARD_TINT}>
                            <F x={x + 76} y={112} anchor="middle" size={24}>{`λ = ${lambda}`}</F>
                        </Card>
                        <Arrow x1={x + 76} y1={140} x2={x + 76} y2={176} />
                        <Card x={x} y={184} width={152} height={56} tint={GREEN_TINT} stroke={GREEN}>
                            <F x={x + 76} y={220} anchor="middle" size={24} color={GREEN}>{`(${3 - lambda}, 1, ${lambda})`}</F>
                        </Card>
                    </g>
                )
            })}
            <Caption y={284}>{t(say('λ balio bakoitzak soluzio partikular bat ematen du', 'Cada valor de λ da una solución particular', 'كل قيمة لـ λ تعطي حلًّا خاصًّا', 'Each value of λ gives a particular solution'))}</Caption>
            <Caption y={314}>{t(say('Hirurek betetzen dute x + y + z = 4', 'Todas cumplen x + y + z = 4', 'كلها تحقق x + y + z = 4', 'They all satisfy x + y + z = 4'))}</Caption>
        </Figure>
    )
}

/* ---------- The lines that turn parallel when a = 4 ---------- */

export function ParameterFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const box: PlaneBox = { xMin: -1, xMax: 5, yMin: -2, yMax: 3 }
    const panels = [
        { a: 2, ox: 50, title: 'a = 2', text: say('ebakitzen dira: soluzio bat', 'se cortan: una solución', 'يتقاطعان: حل واحد', 'they cross: one solution'), point: [2, 0.5] as Point },
        { a: 4, ox: 400, title: 'a = 4', text: say('paraleloak: soluziorik ez', 'paralelas: sin solución', 'متوازيان: لا حل', 'parallel: no solution'), point: null }
    ]
    return (
        <Figure height={300} label={t(say('x + 2y = 3 eta 2x + ay = 5: a = 2 denean zuzenak ebakitzen dira; a = 4 denean, paraleloak dira', 'x + 2y = 3 y 2x + ay = 5: con a = 2 las rectas se cortan; con a = 4 son paralelas', 'x + 2y = 3 و2x + ay = 5: مع a = 2 يتقاطع المستقيمان، ومع a = 4 يتوازيان', 'x + 2y = 3 and 2x + ay = 5: with a = 2 the lines cross; with a = 4 they are parallel'))}>
            {panels.map((panel) => (
                <g key={panel.a}>
                    <F x={panel.ox + 135} y={28} anchor="middle" size={24} color={STAGE}>{panel.title}</F>
                    <Frame box={box} cell={45} ox={panel.ox} oy={44} labels={false}>
                        {(map, clip) => (
                            <g>
                                <PlaneLine map={map} m={-0.5} n={1.5} clip={clip} width={3.2} />
                                <PlaneLine map={map} m={-2 / panel.a} n={5 / panel.a} color={SECOND} clip={clip} width={3.2} dashed />
                                {panel.point && <PlanePoint map={map} point={panel.point} color={GREEN} radius={7} />}
                            </g>
                        )}
                    </Frame>
                    <Label x={panel.ox + 135} y={288} textAnchor="middle" fontSize={19} fill={panel.point ? GREEN : SECOND}>{t(panel.text)}</Label>
                </g>
            ))}
        </Figure>
    )
}

/* ---------- A cubic cut by a line ---------- */

export function CubicLineFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const box: PlaneBox = { xMin: -3, xMax: 3, yMin: -3, yMax: 3 }
    const curve = Array.from({ length: 121 }, (_, k) => {
        const x = -2.6 + (5.2 * k) / 120
        return [x, x ** 3 - 3 * x] as Point
    })
    return (
        <Figure height={330} label={t(say('y = x³ − 3x kurba eta y = x zuzena (0, 0), (2, 2) eta (−2, −2) puntuetan ebakitzen dira', 'La curva y = x³ − 3x y la recta y = x se cortan en (0, 0), (2, 2) y (−2, −2)', 'يتقاطع المنحنى y = x³ − 3x والمستقيم y = x في (0, 0) و(2, 2) و(−2, −2)', 'The curve y = x³ − 3x and the line y = x meet at (0, 0), (2, 2) and (−2, −2)'))}>
            <Frame box={box} cell={42} ox={30} oy={30}>
                {(map, clip) => (
                    <g>
                        <PlanePath map={map} points={curve} clip={clip} width={3.2} />
                        <PlaneLine map={map} m={1} n={0} color={SECOND} clip={clip} width={3} />
                        {([[0, 0], [2, 2], [-2, -2]] as Point[]).map((point) => <PlanePoint key={point.join()} map={map} point={point} color={GREEN} radius={7} />)}
                    </g>
                )}
            </Frame>
            <F x={330} y={70} size={22} color={STAGE}>y = x³ − 3x</F>
            <F x={330} y={104} size={22} color={SECOND}>y = x</F>
            <F x={330} y={150} size={21}>x³ − 4x = 0</F>
            <F x={330} y={186} size={21}>x(x − 2)(x + 2) = 0</F>
            <F x={330} y={230} size={21} color={GREEN}>(0, 0)  (2, 2)  (−2, −2)</F>
            <Caption y={310}>{t(say('Ekuazioaren soluzio bakoitza ebaki-puntu bat da', 'Cada solución de la ecuación es un punto de corte', 'كل حل للمعادلة نقطة تقاطع', 'Each solution of the equation is a crossing point'))}</Caption>
        </Figure>
    )
}

/* ---------- The two candidates of a logarithmic system ---------- */

export function CandidatesFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    return (
        <Figure height={318} label={t(say('log x + log y = 2 eta x − y = 15: (20, 5) hautagaiak balio du; (−5, −20) hautagaiak log(−5) ematen du, eta ez du balio', 'log x + log y = 2 y x − y = 15: la candidata (20, 5) vale; (−5, −20) da log(−5) y no vale', 'log x + log y = 2 وx − y = 15: المرشح (20, 5) صالح؛ أما (−5, −20) فيعطي log(−5) ولا يصلح', 'log x + log y = 2 and x − y = 15: the candidate (20, 5) works; (−5, −20) gives log(−5) and does not'))}>
            <Brace x={200} y={50} lines={['log x + log y = 2', 'x − y = 15']} size={22} />
            <Card x={40} y={128} width={300} height={124} tint={GREEN_TINT} stroke={GREEN}>
                <F x={190} y={170} anchor="middle" size={26} color={GREEN}>(20, 5)  ✓</F>
                <F x={190} y={214} anchor="middle" size={20}>log 20 + log 5 = 2</F>
            </Card>
            <Card x={380} y={128} width={300} height={124} tint={CORAL_TINT} stroke={SECOND} dashed>
                <F x={530} y={170} anchor="middle" size={26} color={SECOND}>(−5, −20)  ✗</F>
                <F x={530} y={214} anchor="middle" size={20} color={SECOND}>log(−5)</F>
            </Card>
            <Caption y={290}>{t(say('Egiaztatu hautagai bakoitza hasierako sisteman', 'Comprueba cada candidata en el sistema de partida', 'تحقق من كل مرشح في النظام الأصلي', 'Check each candidate in the starting system'))}</Caption>
        </Figure>
    )
}

/* ---------- The change u = 2ˣ, v = 3ʸ ---------- */

export function ExponentialChangeFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    return (
        <Figure height={330} label={t(say('u = 2ˣ eta v = 3ʸ aldaketak sistema lineal bihurtzen du: u = 8 eta v = 3, beraz x = 3 eta y = 1', 'El cambio u = 2ˣ, v = 3ʸ lo convierte en un sistema lineal: u = 8 y v = 3, así que x = 3 e y = 1', 'التغيير u = 2ˣ وv = 3ʸ يحوّله إلى نظام خطي: u = 8 وv = 3، إذن x = 3 وy = 1', 'The change u = 2ˣ, v = 3ʸ turns it into a linear system: u = 8 and v = 3, so x = 3 and y = 1'))}>
            <Card x={30} y={34} width={200} height={110} tint={STAGE_TINT}>
                <F x={130} y={80} anchor="middle" size={22}>2ˣ + 3ʸ = 11</F>
                <F x={130} y={118} anchor="middle" size={22}>2ˣ − 3ʸ = 5</F>
            </Card>
            <Arrow x1={240} y1={89} x2={290} y2={89} />
            <F x={265} y={70} anchor="middle" size={16} color={STAGE}>u, v</F>
            <Card x={300} y={34} width={180} height={110} tint={MUSTARD_TINT}>
                <F x={390} y={80} anchor="middle" size={22}>u + v = 11</F>
                <F x={390} y={118} anchor="middle" size={22}>u − v = 5</F>
            </Card>
            <Arrow x1={490} y1={89} x2={540} y2={89} />
            <Card x={550} y={34} width={140} height={110} tint={GREEN_TINT} stroke={GREEN}>
                <F x={620} y={80} anchor="middle" size={22} color={GREEN}>u = 8</F>
                <F x={620} y={118} anchor="middle" size={22} color={GREEN}>v = 3</F>
            </Card>
            <Arrow x1={620} y1={154} x2={620} y2={196} color={GREEN} />
            <Card x={300} y={204} width={390} height={64} tint={GREEN_TINT} stroke={GREEN}>
                <F x={495} y={244} anchor="middle" size={22} color={GREEN}>2ˣ = 8 → x = 3     3ʸ = 3 → y = 1</F>
            </Card>
            <Caption y={308}>{t(say('Ebatzi sistema lineala, eta gero desegin aldaketa', 'Resuelve el sistema lineal y después deshaz el cambio', 'حُلّ النظام الخطي ثم اعكس التغيير', 'Solve the linear system and then undo the change'))}</Caption>
        </Figure>
    )
}

/* ---------- The right triangle 6–8–10 ---------- */

export function RightTriangleFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const x0 = 60
    const y0 = 250
    const scale = 24
    return (
        <Figure height={330} label={t(say('Triangelu zuzena: hipotenusa 10 cm, azalera 24 cm²; katetoak 6 eta 8 cm', 'Triángulo rectángulo de hipotenusa 10 cm y área 24 cm²: los catetos miden 6 y 8 cm', 'مثلث قائم وتره 10 سم ومساحته 24 سم²: ضلعا القائمة 6 و8 سم', 'Right-angled triangle with a hypotenuse of 10 cm and an area of 24 cm²: the legs are 6 cm and 8 cm'))}>
            <polygon points={`${x0},${y0} ${x0 + 8 * scale},${y0} ${x0},${y0 - 6 * scale}`} fill={STAGE_TINT} stroke={INK} strokeWidth={2.4} />
            <rect x={x0} y={y0 - 18} width={18} height={18} fill="none" stroke={INK} strokeWidth={1.6} />
            <F x={x0 + 4 * scale} y={y0 + 30} anchor="middle" size={22} color={STAGE}>x</F>
            <F x={x0 - 16} y={y0 - 3 * scale + 8} anchor="end" size={22} color={STAGE}>y</F>
            <F x={x0 + 4 * scale + 18} y={y0 - 3 * scale - 10} size={22} color={SECOND}>10</F>
            <Brace x={330} y={70} lines={['x² + y² = 100', 'xy = 48']} size={22} />
            <F x={350} y={160} size={21}>(x + y)² = 100 + 96</F>
            <F x={350} y={196} size={21}>x + y = 14</F>
            <F x={350} y={240} size={22} color={GREEN}>x = 6,  y = 8</F>
            <Caption y={310}>{t(say('Pitagorasek eta azalerak bigarren mailako bi ekuazio ematen dituzte', 'Pitágoras y el área dan dos ecuaciones de segundo grado', 'يعطي فيثاغورس والمساحة معادلتين من الدرجة الثانية', 'Pythagoras\' theorem and the area give two quadratic equations'))}</Caption>
        </Figure>
    )
}

/* ---------- A triangular region ---------- */

const TRIANGLE: HalfPlane[] = [
    { a: 1, b: 1, c: 5, sense: '≤' },
    { a: 1, b: 0, c: 1, sense: '≥' },
    { a: 0, b: 1, c: 0, sense: '≥' }
]

export function TriangleRegionFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const box: PlaneBox = { xMin: -1, xMax: 6, yMin: -1, yMax: 6 }
    return (
        <Figure height={320} label={t(say('x + y ≤ 5, x ≥ 1 eta y ≥ 0: erpinak (1, 0), (5, 0) eta (1, 4) dituen triangelua', 'x + y ≤ 5, x ≥ 1 e y ≥ 0: el triángulo de vértices (1, 0), (5, 0) y (1, 4)', 'x + y ≤ 5 وx ≥ 1 وy ≥ 0: المثلث ذو الرؤوس (1, 0) و(5, 0) و(1, 4)', 'x + y ≤ 5, x ≥ 1 and y ≥ 0: the triangle with vertices (1, 0), (5, 0) and (1, 4)'))}>
            <Frame box={box} cell={34} ox={30} oy={30}>
                {(map, clip) => (
                    <g>
                        <polygon points={polygonPoints(map, region(box, TRIANGLE))} fill={REGION} stroke={GREEN} strokeWidth={2} />
                        <PlaneLine map={map} m={-1} n={5} color={SECOND} clip={clip} width={2.8} />
                        <PlanePath map={map} points={[[1, -2], [1, 8]]} color={STAGE} width={2.8} clip={clip} />
                        <PlanePoint map={map} point={[0, 0]} color={INK} radius={6} name="O" dx={-20} dy={20} />
                        {([[1, 0], [5, 0], [1, 4]] as Point[]).map((point) => <PlanePoint key={point.join()} map={map} point={point} color={GREEN} radius={6} />)}
                    </g>
                )}
            </Frame>
            <Brace x={330} y={70} lines={['x + y ≤ 5', 'x ≥ 1', 'y ≥ 0']} size={22} />
            <F x={350} y={200} size={20} color={MUTED}>O: 0 + 0 ≤ 5  ✓</F>
            <F x={350} y={240} size={20} color={GREEN}>(1, 0)  (5, 0)  (1, 4)</F>
            <Caption y={304}>{t(say('Soluzioa hiru erdiplanoen zati komuna da', 'La solución es la parte común de los tres semiplanos', 'الحل هو الجزء المشترك بين أنصاف المستويات الثلاثة', 'The solution is the part common to the three half-planes'))}</Caption>
        </Figure>
    )
}

/* ---------- Closed, open and empty regions ---------- */

export function RegionCasesFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const box: PlaneBox = { xMin: -1, xMax: 5, yMin: -1, yMax: 5 }
    const panels: Array<{ ox: number; halves: HalfPlane[]; lines: Array<{ m: number; n: number } | { x: number }>; title: LocalizedText; color: string }> = [
        { ox: 22, halves: [{ a: 1, b: 0, c: 0, sense: '≥' }, { a: 0, b: 1, c: 0, sense: '≥' }, { a: 1, b: 1, c: 4, sense: '≤' }], lines: [{ m: -1, n: 4 }], title: say('Itxia', 'Cerrada', 'مغلقة', 'Closed'), color: GREEN },
        { ox: 256, halves: [{ a: 1, b: 0, c: 0, sense: '≥' }, { a: 0, b: 1, c: 0, sense: '≥' }, { a: 1, b: 2, c: 4, sense: '≥' }], lines: [{ m: -0.5, n: 2 }], title: say('Irekia', 'Abierta', 'مفتوحة', 'Open'), color: STAGE },
        { ox: 490, halves: [], lines: [{ x: 2 }, { m: 0, n: 3 }, { m: -1, n: 6 }], title: say('Hutsa', 'Vacía', 'خالية', 'Empty'), color: SECOND }
    ]
    return (
        <Figure height={300} label={t(say('Hiru eskualde: triangelu itxi bat, eskualde ireki bat eta eskualde huts bat', 'Tres regiones: un triángulo cerrado, una región abierta y una región vacía', 'ثلاث مناطق: مثلث مغلق ومنطقة مفتوحة ومنطقة خالية', 'Three regions: a closed triangle, an open region and an empty region'))}>
            {panels.map((panel, index) => (
                <g key={index}>
                    <Frame box={box} cell={34} ox={panel.ox} oy={28} labels={false}>
                        {(map, clip) => (
                            <g>
                                {panel.halves.length > 0 && <polygon points={polygonPoints(map, region(box, panel.halves))} fill={REGION} />}
                                {panel.lines.map((line, k) => ('x' in line
                                    ? <PlanePath key={k} map={map} points={[[line.x, -2], [line.x, 8]]} color={panel.color} width={2.8} clip={clip} />
                                    : <PlaneLine key={k} map={map} m={line.m} n={line.n} color={panel.color} width={2.8} clip={clip} />))}
                            </g>
                        )}
                    </Frame>
                    <Label x={panel.ox + 102} y={286} textAnchor="middle" fontSize={21} fontWeight={700} fill={panel.color}>{t(panel.title)}</Label>
                </g>
            ))}
            <F x={124} y={258} anchor="middle" size={16} color={GREEN}>x + y ≤ 4</F>
            <F x={358} y={258} anchor="middle" size={16} color={STAGE}>x + 2y ≥ 4</F>
            <F x={592} y={258} anchor="middle" size={16} color={SECOND}>x ≤ 2, y ≤ 3, x + y ≥ 6</F>
        </Figure>
    )
}

/* ---------- Hero ---------- */

export function BachSystemsHeroArt() {
    return (
        <div className="fraction-v2-collage" aria-hidden="true">
            <svg viewBox="0 0 520 400" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                <g transform="translate(34 40) rotate(-4)">
                    <rect width={230} height={150} rx={16} fill={PAPER} stroke={INK} strokeWidth={2} />
                    <text x={115} y={50} textAnchor="middle" fontSize={22} fontWeight={700} fill={INK} fontFamily="Fraunces, serif" direction="ltr">x + y + z = 6</text>
                    <text x={135} y={88} textAnchor="middle" fontSize={22} fontWeight={700} fill={INK} fontFamily="Fraunces, serif" direction="ltr">y − z = −1</text>
                    <text x={160} y={126} textAnchor="middle" fontSize={22} fontWeight={700} fill="#2f6fdb" fontFamily="Fraunces, serif" direction="ltr">2z = 6</text>
                </g>
                <g transform="translate(290 36) rotate(4)">
                    <rect width={196} height={124} rx={16} fill="#fbebc0" stroke={INK} strokeWidth={2} />
                    <text x={98} y={52} textAnchor="middle" fontSize={22} fontWeight={700} fill={INK} fontFamily="Fraunces, serif" direction="ltr">1  −1   2 | 1</text>
                    <text x={98} y={90} textAnchor="middle" fontSize={22} fontWeight={700} fill={INK} fontFamily="Fraunces, serif" direction="ltr">0   3  −3 | 6</text>
                </g>
                <g transform="translate(290 196) rotate(-3)">
                    <rect width={196} height={110} rx={16} fill="#e8e0f7" stroke={INK} strokeWidth={2} />
                    <text x={98} y={66} textAnchor="middle" fontSize={24} fontWeight={700} fill="#c4432a" fontFamily="Fraunces, serif" direction="ltr">(3 − λ, 1, λ)</text>
                </g>
                <g transform="translate(40 230)">
                    <rect width={226} height={130} rx={16} fill="#d6eddf" stroke={INK} strokeWidth={2} />
                    <polygon points="40,104 170,104 40,26" fill="rgba(38, 123, 83, 0.3)" stroke="#267b53" strokeWidth={2.4} />
                    <text x={150} y={52} textAnchor="middle" fontSize={20} fontWeight={700} fill={INK} fontFamily="Fraunces, serif" direction="ltr">x + y ≤ 5</text>
                </g>
            </svg>
        </div>
    )
}
