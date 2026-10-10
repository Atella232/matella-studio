import type { ReactNode } from 'react'
import { pickText, type LocalizedText, type UnitLanguage } from '../../features/unit-v2/types'
import { Figure } from '../dbh2-zatikiak-prototype/figures'
import { Label } from '../dbh2-funtzioak-v2/plane'
import { bookSurvey, heightClasses, transportSurvey } from './data'
import { COLORS, INK, LINE, MUTED, num, PAPER, SECOND, STAGE, STAGE_TINT } from './palette'

/* ==========================================================================
   Estatistika eta probabilitatea · 2. DBH — lesson figures in the notebook
   style: representative and biased samples, cumulative frequencies, grouped
   data, histogram and polygon, pie chart from percentages, a misleading
   axis, mean and median from a table, symmetry, mean deviation, quartiles,
   box plot, complementary events, a tree of three coins and a double-entry
   table. Arabic captions carry words only; numbers go in their own text.
   ========================================================================== */

const say = (eu: string, es: string, ar: string): LocalizedText => ({ eu, es, ar })
const pick = (language: UnitLanguage, text: LocalizedText) => pickText(language, text)
export function Caption({ x = 360, y, language, text, color = MUTED, size = 15 }: { x?: number; y: number; language: UnitLanguage; text: LocalizedText; color?: string; size?: number }) {
    return <Label x={x} y={y} textAnchor="middle" fontSize={size} fontWeight={700} fill={color}>{pick(language, text)}</Label>
}

export function Formula({ x, y, children, color = INK, size = 17, anchor = 'middle' }: { x: number; y: number; children: ReactNode; color?: string; size?: number; anchor?: 'start' | 'middle' | 'end' }) {
    return <text x={x} y={y} textAnchor={anchor} fontSize={size} fontWeight={700} fill={color} direction="ltr">{children}</text>
}

/** A letter with a small subscript: F_i, x_i, Q_1 */
export function Sub({ letter, index }: { letter: string; index: string }) {
    return (
        <>
            {letter}
            <tspan fontSize="0.7em" dy="0.3em">{index}</tspan>
            <tspan dy="-0.3em">{' '}</tspan>
        </>
    )
}

/** x with a bar on top: the mean (the combining macron drifts in SVG fonts) */
export function XBar() {
    return <tspan style={{ textDecoration: 'overline' }}>x</tspan>
}

/** A table of numbers: headers on top, a row per entry, an optional highlighted column */
export function Table({ x0, y0, columns, headers, rows, highlight, rowHeight = 30, language }: {
    x0: number
    y0: number
    columns: number[]
    headers: ReactNode[]
    rows: Array<Array<number | string>>
    highlight?: number
    rowHeight?: number
    language: UnitLanguage
}) {
    const width = columns.reduce((sum, value) => sum + value, 0)
    const centres = columns.map((value, index) => x0 + columns.slice(0, index).reduce((sum, item) => sum + item, 0) + value / 2)
    return (
        <g>
            {highlight !== undefined && (
                <rect x={centres[highlight] - columns[highlight] / 2} y={y0 - 24} width={columns[highlight]} height={rowHeight * (rows.length + 1) + 8} fill={STAGE_TINT} rx={8} />
            )}
            {headers.map((header, index) => (
                <text key={index} x={centres[index]} y={y0} textAnchor="middle" fontSize={17} fontWeight={700} fill={STAGE}>{header}</text>
            ))}
            <line x1={x0} x2={x0 + width} y1={y0 + 10} y2={y0 + 10} stroke={INK} strokeWidth={2} />
            {rows.map((row, rowIndex) => row.map((cell, index) => (
                <text key={`${rowIndex}-${index}`} x={centres[index]} y={y0 + 10 + rowHeight * (rowIndex + 1) - 8} textAnchor="middle" fontSize={16} fontWeight={index === highlight ? 700 : 400} fill={INK} direction="ltr">
                    {typeof cell === 'number' ? num(language, cell) : cell}
                </text>
            )))}
        </g>
    )
}

/* ---------- Sample: representative or biased ---------- */

export function SampleFigure({ language }: { language: UnitLanguage }) {
    const groups = [say('1. DBH', '1.º', 'الأول'), say('2. DBH', '2.º', 'الثاني'), say('3. DBH', '3.º', 'الثالث')]
    const dot = (cx: number, cy: number, group: number, chosen: boolean, key: string) => (
        <circle key={key} cx={cx} cy={cy} r={8} fill={chosen ? COLORS[group] : PAPER} fillOpacity={chosen ? 0.85 : 1} stroke={COLORS[group]} strokeWidth={2} />
    )
    const panel = (x0: number, title: LocalizedText, chosen: (group: number, index: number) => boolean, color: string) => (
        <g>
            <rect x={x0} y={30} width={320} height={150} rx={18} fill="none" stroke={INK} strokeWidth={2} />
            {groups.map((group, g) => (
                <g key={g}>
                    <Label x={x0 + 20} y={64 + g * 44} fontSize={14} fontWeight={700} fill={COLORS[g]}>{pick(language, group)}</Label>
                    {Array.from({ length: 10 }, (_, index) => dot(x0 + 105 + index * 21, 59 + g * 44, g, chosen(g, index), `${g}-${index}`))}
                </g>
            ))}
            <Caption x={x0 + 160} y={206} language={language} text={title} color={color} />
        </g>
    )
    return (
        <Figure height={240} label={pick(language, say('Lagin adierazgarria eta lagin alboratua', 'Muestra representativa y muestra sesgada', 'عيّنة ممثِّلة وعيّنة متحيّزة'))}>
            {panel(30, say('Adierazgarria: talde guztietatik', 'Representativa: de todos los grupos', 'ممثِّلة: من كل الفئات'), (_, index) => index % 5 === 1, STAGE)}
            {panel(370, say('Alboratua: talde bakarretik', 'Sesgada: de un solo grupo', 'متحيّزة: من فئة واحدة'), (group, index) => group === 2 && index < 6, SECOND)}
            <Caption y={232} language={language} text={say('Bietan 6 ikasle, baina bakarrak ordezkatzen du ikastetxea', 'En las dos hay 6 alumnos, pero solo una representa al instituto', 'في الاثنتين 6 تلاميذ، لكن واحدة فقط تمثّل المدرسة')} size={14} />
        </Figure>
    )
}

/* ---------- Cumulative frequencies ---------- */

export function CumulativeFigure({ language }: { language: UnitLanguage }) {
    const total = bookSurvey.reduce((sum, row) => sum + row.count, 0)
    const rows = bookSurvey.map((row, index) => {
        const cumulative = bookSurvey.slice(0, index + 1).reduce((sum, item) => sum + item.count, 0)
        return [row.value, row.count, cumulative, row.count / total, cumulative / total]
    })
    return (
        <Figure height={270} label={pick(language, say('Maiztasun metatuen taula', 'Tabla de frecuencias acumuladas', 'جدول التكرارات المتجمّعة'))}>
            <Table
                x0={70}
                y0={34}
                columns={[110, 110, 110, 110, 110]}
                headers={[<Sub key="x" letter="x" index="i" />, <Sub key="f" letter="f" index="i" />, <Sub key="F" letter="F" index="i" />, <Sub key="h" letter="h" index="i" />, <Sub key="H" letter="H" index="i" />]}
                rows={rows}
                highlight={2}
                language={language}
            />
            <line x1={70} x2={620} y1={200} y2={200} stroke={INK} strokeWidth={1.4} />
            <Formula x={345} y={224} color={STAGE}>N = {total} · 9 + 5 = 14</Formula>
            <Caption y={258} language={language} text={say('Aurreko metatua gehi errenkada honetako maiztasuna; azkena N da', 'La acumulada anterior más la frecuencia de esta fila; la última es N', 'المتجمّع السابق زائد تكرار هذا السطر؛ والأخير هو N')} />
        </Figure>
    )
}

/* ---------- Grouped data on a ruler ---------- */

export function GroupedFigure({ language }: { language: UnitLanguage }) {
    const x = (value: number) => 90 + (value - 140) * 13.5
    return (
        <Figure height={240} label={pick(language, say('Altuerak tartetan eta klase-markak', 'Alturas en intervalos y marcas de clase', 'الأطوال في فئات ومراكز الفئات'))}>
            <line x1={x(138)} x2={x(182)} y1={130} y2={130} stroke={INK} strokeWidth={2.4} />
            {[140, 150, 160, 170, 180].map((value) => (
                <g key={value}>
                    <line x1={x(value)} x2={x(value)} y1={122} y2={138} stroke={INK} strokeWidth={2} />
                    <text x={x(value)} y={160} textAnchor="middle" fontSize={15} fill={INK}>{value}</text>
                </g>
            ))}
            {heightClasses.map((row, index) => {
                const left = x(row.from)
                const right = x(row.to)
                return (
                    <g key={index}>
                        <rect x={left + 3} y={70} width={right - left - 6} height={40} rx={8} fill={COLORS[index]} fillOpacity={0.18} stroke={COLORS[index]} strokeWidth={2} />
                        <text x={(left + right) / 2} y={96} textAnchor="middle" fontSize={16} fontWeight={700} fill={INK} direction="ltr">[{row.from}, {row.to})</text>
                        <circle cx={(left + right) / 2} cy={130} r={7} fill={COLORS[index]} stroke={INK} strokeWidth={1.4} />
                        <text x={(left + right) / 2} y={188} textAnchor="middle" fontSize={15} fontWeight={700} fill={COLORS[index]}>{(row.from + row.to) / 2}</text>
                        <text x={(left + right) / 2} y={52} textAnchor="middle" fontSize={15} fontWeight={700} fill={MUTED}>f = {row.count}</text>
                    </g>
                )
            })}
            <text x={40} y={188} fontSize={15} fontWeight={700} fill={MUTED}><Sub letter="x" index="i" /></text>
            <Caption y={226} language={language} text={say('160 hurrengo tartean doa · ● klase-marka: tartearen erdia', 'El 160 va en el intervalo siguiente · ● marca de clase: el centro del intervalo', 'العدد 160 في الفئة التالية · ● مركز الفئة: منتصفها')} />
        </Figure>
    )
}

/* ---------- Histogram and frequency polygon ---------- */

export function HistogramFigure({ language }: { language: UnitLanguage }) {
    const x = (value: number) => 80 + (value - 130) * 8
    const y = (count: number) => 200 - count * 13
    const polygon = [[135, 0], ...heightClasses.map((row) => [(row.from + row.to) / 2, row.count]), [185, 0]]
    return (
        <Figure height={260} label={pick(language, say('Histograma eta maiztasun-poligonoa', 'Histograma y polígono de frecuencias', 'المدرّج والمضلّع التكراري'))}>
            <line x1={x(130)} x2={x(130)} y1={24} y2={200} stroke={INK} strokeWidth={2} />
            <line x1={x(130)} x2={x(192)} y1={200} y2={200} stroke={INK} strokeWidth={2} />
            {[0, 3, 6, 9, 12].map((value) => (
                <g key={value}>
                    {value > 0 && <line x1={x(130)} x2={x(190)} y1={y(value)} y2={y(value)} stroke={LINE} strokeWidth={1} />}
                    <text x={x(130) - 10} y={y(value) + 5} textAnchor="end" fontSize={14} fill={MUTED}>{value}</text>
                </g>
            ))}
            {heightClasses.map((row, index) => (
                <rect key={index} x={x(row.from)} y={y(row.count)} width={x(row.to) - x(row.from)} height={row.count * 13} fill={STAGE} fillOpacity={0.3} stroke={INK} strokeWidth={2} />
            ))}
            {[140, 150, 160, 170, 180].map((value) => <text key={value} x={x(value)} y={222} textAnchor="middle" fontSize={14} fill={INK}>{value}</text>)}
            <polyline points={polygon.map(([value, count]) => `${x(value)},${y(count)}`).join(' ')} fill="none" stroke={SECOND} strokeWidth={3} />
            {polygon.map(([value, count], index) => <circle key={index} cx={x(value)} cy={y(count)} r={5} fill={SECOND} stroke={INK} strokeWidth={1.2} />)}
            <rect x={x(196) - 4} y={46} width={16} height={16} fill={STAGE} fillOpacity={0.3} stroke={INK} strokeWidth={1.4} />
            <Label x={x(196) + 20} y={60} fontSize={15} fontWeight={700} fill={INK}>{pick(language, say('Histograma', 'Histograma', 'المدرّج'))}</Label>
            <line x1={x(196) - 4} x2={x(196) + 12} y1={92} y2={92} stroke={SECOND} strokeWidth={3} />
            <Label x={x(196) + 20} y={97} fontSize={15} fontWeight={700} fill={SECOND}>{pick(language, say('Poligonoa', 'Polígono', 'المضلّع'))}</Label>
            <Label x={x(196) + 20} y={140} fontSize={14} fill={MUTED}>{pick(language, say('Altuera (cm)', 'Altura (cm)', 'الطول (سم)'))}</Label>
            <Caption y={250} language={language} text={say('Laukizuzenak itsatsita; poligonoa klase-marken gainetik doa', 'Rectángulos pegados; el polígono pasa sobre las marcas de clase', 'مستطيلات متلاصقة؛ والمضلّع يمرّ فوق مراكز الفئات')} />
        </Figure>
    )
}

/* ---------- Pie chart from percentages ---------- */

export function PieFigure({ language }: { language: UnitLanguage }) {
    const cx = 170
    const cy = 120
    const r = 95
    const point = (degrees: number, radius = r) => [cx + radius * Math.cos((degrees * Math.PI) / 180), cy + radius * Math.sin((degrees * Math.PI) / 180)]
    const starts = transportSurvey.map((_, index) => -90 + transportSurvey.slice(0, index).reduce((sum, row) => sum + row.percent * 3.6, 0))
    return (
        <Figure height={250} label={pick(language, say('Sektore-diagrama ehunekoetatik', 'Diagrama de sectores a partir de porcentajes', 'مخطط دائري من النسب المئوية'))}>
            {transportSurvey.map((row, index) => {
                const angle = row.percent * 3.6
                const start = starts[index]
                const [x1, y1] = point(start)
                const [x2, y2] = point(start + angle)
                const [lx, ly] = point(start + angle / 2, r * 0.64)
                const path = `M${cx} ${cy} L${x1} ${y1} A${r} ${r} 0 ${angle > 180 ? 1 : 0} 1 ${x2} ${y2} Z`
                return (
                    <g key={index}>
                        <path d={path} fill={COLORS[index]} fillOpacity={0.72} stroke={INK} strokeWidth={2} />
                        <text x={lx} y={ly + 5} textAnchor="middle" fontSize={14} fontWeight={700} fill={INK}>{Math.round(angle)}°</text>
                    </g>
                )
            })}
            {transportSurvey.map((row, index) => (
                <g key={`legend${index}`}>
                    <rect x={320} y={40 + index * 38} width={18} height={18} fill={COLORS[index]} fillOpacity={0.72} stroke={INK} strokeWidth={1.4} />
                    <Label x={348} y={55 + index * 38} fontSize={15} fontWeight={700} fill={INK}>{pick(language, row.name)}</Label>
                    <Formula x={690} y={55 + index * 38} anchor="end" size={15}>{row.percent} % · {num(language, '3,6')}° = {Math.round(row.percent * 3.6)}°</Formula>
                </g>
            ))}
            <Caption y={240} language={language} text={say('Ehuneko bakoitza bider 3,6°; guztira 360°', 'Cada porcentaje por 3,6°; en total, 360°', 'كل نسبة في 3.6°؛ والمجموع 360°')} />
        </Figure>
    )
}

/* ---------- A misleading axis ---------- */

export function MisleadingFigure({ language }: { language: UnitLanguage }) {
    const values = [3000, 3200]
    const years = ['2015', '2016']
    const chart = (x0: number, from: number, title: LocalizedText, color: string) => {
        const y = (value: number) => 190 - ((value - from) / (3200 - from)) * 140
        return (
            <g>
                <line x1={x0} x2={x0} y1={40} y2={190} stroke={INK} strokeWidth={2} />
                <line x1={x0} x2={x0 + 240} y1={190} y2={190} stroke={INK} strokeWidth={2} />
                {[from, 3200].map((value) => <text key={value} x={x0 - 8} y={y(value) + 5} textAnchor="end" fontSize={13} fill={MUTED}>{value}</text>)}
                {values.map((value, index) => (
                    <g key={index}>
                        <rect x={x0 + 40 + index * 100} y={y(value)} width={60} height={190 - y(value)} fill={color} fillOpacity={0.6} stroke={INK} strokeWidth={2} />
                        <text x={x0 + 70 + index * 100} y={210} textAnchor="middle" fontSize={14} fill={INK}>{years[index]}</text>
                    </g>
                ))}
                <Caption x={x0 + 120} y={26} language={language} text={title} color={color} />
            </g>
        )
    }
    return (
        <Figure height={250} label={pick(language, say('Ardatz moztua: grafiko engainagarria', 'Eje cortado: un gráfico engañoso', 'محور مقطوع: تمثيل مضلِّل'))}>
            {chart(80, 2900, say('Ardatza 2900etik: hirukoitza dirudi', 'Eje desde 2900: parece el triple', 'المحور من 2900: يبدو ثلاثة أضعاف'), SECOND)}
            {chart(440, 0, say('Ardatza 0tik: benetako aldaketa', 'Eje desde 0: el cambio real', 'المحور من 0: التغيّر الحقيقي'), STAGE)}
            <Caption y={240} language={language} text={say('Datu berak: 3000 → 3200, % 7 inguru gehiago', 'Los mismos datos: 3000 → 3200, alrededor de un 7 % más', 'البيانات نفسها: 3000 ← 3200، زيادة نحو 7 %')} />
        </Figure>
    )
}

/* ---------- Mean from a table ---------- */

export function MeanTableFigure({ language }: { language: UnitLanguage }) {
    const rows = bookSurvey.map((row) => [row.value, row.count, row.value * row.count])
    return (
        <Figure height={270} label={pick(language, say('Batez bestekoa taula batetik', 'La media desde una tabla', 'المتوسط من جدول'))}>
            <Table
                x0={60}
                y0={34}
                columns={[110, 110, 130]}
                headers={[<Sub key="x" letter="x" index="i" />, <Sub key="f" letter="f" index="i" />, <tspan key="xf">x<tspan fontSize="0.7em" dy="0.3em">i</tspan><tspan dy="-0.3em"> · f</tspan><tspan fontSize="0.7em" dy="0.3em">i</tspan></tspan>]}
                rows={rows}
                highlight={2}
                language={language}
            />
            <line x1={60} x2={410} y1={200} y2={200} stroke={INK} strokeWidth={1.4} />
            <Formula x={225} y={224}>20</Formula>
            <Formula x={345} y={224} color={STAGE}>36</Formula>
            <rect x={450} y={80} width={230} height={100} rx={16} fill={PAPER} stroke={INK} strokeWidth={2} />
            <Formula x={565} y={118} size={19}><XBar /> = 36 : 20</Formula>
            <Formula x={565} y={156} size={22} color={SECOND}><XBar /> = {num(language, '1,8')}</Formula>
            <Caption y={258} language={language} text={say('Biderkatu balio bakoitza bere maiztasunaz, batu eta zatitu N-z', 'Multiplica cada valor por su frecuencia, suma y divide entre N', 'اضرب كل قيمة في تكرارها واجمع واقسم على N')} />
        </Figure>
    )
}

/* ---------- Median from a table: the data in a row ---------- */

export function MedianTableFigure({ language }: { language: UnitLanguage }) {
    const counts = [2, 5, 8, 6, 3]
    const data = counts.flatMap((count, value) => Array.from({ length: count }, () => value))
    const size = 25
    const x0 = 60
    return (
        <Figure height={230} label={pick(language, say('Mediana maiztasun metatuekin', 'La mediana con las frecuencias acumuladas', 'الوسيط بالتكرارات المتجمّعة'))}>
            {data.map((value, index) => {
                const central = index === 11 || index === 12
                return (
                    <g key={index}>
                        <rect x={x0 + index * size} y={80} width={size - 3} height={size + 6} rx={5} fill={central ? SECOND : COLORS[value]} fillOpacity={central ? 0.85 : 0.25} stroke={COLORS[value]} strokeWidth={1.6} />
                        <text x={x0 + index * size + (size - 3) / 2} y={101} textAnchor="middle" fontSize={14} fontWeight={700} fill={central ? PAPER : INK}>{value}</text>
                    </g>
                )
            })}
            {counts.map((_, value) => {
                const cumulative = counts.slice(0, value + 1).reduce((sum, item) => sum + item, 0)
                const end = x0 + cumulative * size - 2
                return (
                    <g key={value}>
                        <line x1={end} x2={end} y1={70} y2={124} stroke={INK} strokeWidth={1.4} strokeDasharray="3 3" />
                        <text x={end} y={142} textAnchor="middle" fontSize={13} fontWeight={700} fill={MUTED}>F = {cumulative}</text>
                    </g>
                )
            })}
            <text x={x0 + 12 * size} y={62} textAnchor="middle" fontSize={15} fontWeight={700} fill={SECOND}>{pick(language, say('12. · 13.', '12.º · 13.º', '12 · 13'))}</text>
            <Formula x={360} y={180} color={SECOND}>N = 24 → Me = (2 + 2) : 2 = 2 · Mo = 2</Formula>
            <Caption y={216} language={language} text={say('12. eta 13. datuak 2ren blokean daude: F 7tik 15era doa', 'Los datos 12.º y 13.º están en el bloque del 2: F va de 7 a 15', 'البيانان 12 و13 في كتلة العدد 2: يمتد F من 7 إلى 15')} />
        </Figure>
    )
}

/* ---------- Symmetric and skewed ---------- */

export function SymmetryFigure({ language }: { language: UnitLanguage }) {
    const strip = (y0: number, values: number[], from: number, to: number, mean: number, median: number, ticks: number[], label: LocalizedText) => {
        const x = (value: number) => 150 + ((value - from) / (to - from)) * 500
        const stacks = new Map<number, number>()
        return (
            <g>
                <Label x={20} y={y0 - 4} fontSize={14} fontWeight={700} fill={INK}>{pick(language, label)}</Label>
                <line x1={x(from)} x2={x(to)} y1={y0} y2={y0} stroke={INK} strokeWidth={2} />
                {ticks.map((value) => <text key={value} x={x(value)} y={y0 + 18} textAnchor="middle" fontSize={12} fill={MUTED}>{value}</text>)}
                {values.map((value, index) => {
                    const level = stacks.get(value) ?? 0
                    stacks.set(value, level + 1)
                    return <circle key={index} cx={x(value)} cy={y0 - 9 - level * 16} r={7} fill={STAGE} fillOpacity={0.55} stroke={INK} strokeWidth={1.2} />
                })}
                {[{ at: x(median) - (mean === median ? 9 : 0), color: STAGE }, { at: x(mean) + (mean === median ? 9 : 0), color: SECOND }].map(({ at, color }) => (
                    <polygon key={color} points={`${at},${y0 + 22} ${at - 7},${y0 + 34} ${at + 7},${y0 + 34}`} fill={color} />
                ))}
            </g>
        )
    }
    return (
        <Figure height={280} label={pick(language, say('Banaketa simetrikoa eta asimetrikoa', 'Distribución simétrica y asimétrica', 'توزيع متماثل وغير متماثل'))}>
            {strip(80, [3, 4, 4, 5, 5, 5, 6, 6, 7], 2, 8, 5, 5, [2, 3, 4, 5, 6, 7, 8], say('Simetrikoa', 'Simétrica', 'متماثل'))}
            {strip(204, [1200, 1200, 1200, 1200, 6000], 1000, 6200, 2160, 1200, [1200, 2160, 6000], say('Asimetrikoa (€)', 'Asimétrica (€)', 'غير متماثل (€)'))}
            <polygon points="470,256 463,268 477,268" fill={STAGE} />
            <Label x={486} y={267} fontSize={14} fontWeight={700} fill={STAGE}>{pick(language, say('mediana', 'mediana', 'الوسيط'))}</Label>
            <polygon points="590,256 583,268 597,268" fill={SECOND} />
            <Label x={606} y={267} fontSize={14} fontWeight={700} fill={SECOND}>{pick(language, say('batez bestekoa', 'media', 'المتوسط'))}</Label>
            <Caption x={230} y={267} language={language} text={say('6000ak batez bestekoa eskuinera eramaten du', 'El 6000 arrastra la media a la derecha', 'العدد 6000 يسحب المتوسط إلى اليمين')} size={14} />
        </Figure>
    )
}

/* ---------- Mean deviation: distances to the mean ---------- */

export function DeviationFigure({ language }: { language: UnitLanguage }) {
    const marks = [4, 6, 7, 8, 10]
    const x = (value: number) => 110 + (value - 3) * 70
    return (
        <Figure height={240} label={pick(language, say('Batez bestekoarekiko distantziak', 'Distancias a la media', 'المسافات عن المتوسط'))}>
            <line x1={x(3)} x2={x(11)} y1={150} y2={150} stroke={INK} strokeWidth={2.4} />
            {[3, 4, 5, 6, 7, 8, 9, 10, 11].map((value) => (
                <g key={value}>
                    <line x1={x(value)} x2={x(value)} y1={144} y2={156} stroke={INK} strokeWidth={1.6} />
                    <text x={x(value)} y={176} textAnchor="middle" fontSize={14} fill={INK}>{value}</text>
                </g>
            ))}
            <line x1={x(7)} x2={x(7)} y1={40} y2={160} stroke={SECOND} strokeWidth={2} strokeDasharray="5 4" />
            <text x={x(7)} y={32} textAnchor="middle" fontSize={16} fontWeight={700} fill={SECOND}><XBar /> = 7</text>
            {marks.map((value, index) => {
                const distance = Math.abs(value - 7)
                const level = 60 + index * 16
                return (
                    <g key={index}>
                        {distance > 0 && <line x1={x(value)} x2={x(7)} y1={level} y2={level} stroke={STAGE} strokeWidth={2.4} />}
                        {distance > 0 && <text x={(x(value) + x(7)) / 2} y={level - 4} textAnchor="middle" fontSize={13} fontWeight={700} fill={STAGE}>{distance}</text>}
                        <line x1={x(value)} x2={x(value)} y1={level} y2={140} stroke={LINE} strokeWidth={1} />
                        <circle cx={x(value)} cy={140} r={8} fill={STAGE} fillOpacity={0.7} stroke={INK} strokeWidth={1.4} />
                    </g>
                )
            })}
            <Formula x={360} y={206} color={STAGE}>DM = (3 + 1 + 0 + 1 + 3) : 5 = {num(language, '1,6')}</Formula>
            <Caption y={232} language={language} text={say('Ibiltartea 10 − 4 = 6 · DM: distantzien batez bestekoa', 'Recorrido 10 − 4 = 6 · DM: media de las distancias', 'المدى 10 − 4 = 6 · DM: متوسط المسافات')} />
        </Figure>
    )
}

/* ---------- Quartiles: fifteen data in four parts ---------- */

export function QuartilesFigure({ language }: { language: UnitLanguage }) {
    const data = [8, 9, 12, 12, 12, 13, 13, 13, 14, 14, 15, 15, 17, 18, 19]
    const size = 40
    const x0 = 62
    const marks: Record<number, string> = { 3: 'Q₁', 7: 'Me', 11: 'Q₃' }
    return (
        <Figure height={220} label={pick(language, say('Kuartilak: datuak lau zatitan', 'Cuartiles: los datos en cuatro partes', 'الربيعيات: البيانات في أربعة أجزاء'))}>
            {data.map((value, index) => {
                const mark = marks[index]
                return (
                    <g key={index}>
                        <rect x={x0 + index * size} y={70} width={size - 4} height={40} rx={8} fill={mark ? SECOND : STAGE_TINT} fillOpacity={mark ? 0.85 : 1} stroke={INK} strokeWidth={1.6} />
                        <text x={x0 + index * size + (size - 4) / 2} y={96} textAnchor="middle" fontSize={16} fontWeight={700} fill={mark ? PAPER : INK}>{value}</text>
                        <text x={x0 + index * size + (size - 4) / 2} y={128} textAnchor="middle" fontSize={11} fill={MUTED}>{index + 1}</text>
                        {mark && <text x={x0 + index * size + (size - 4) / 2} y={56} textAnchor="middle" fontSize={17} fontWeight={700} fill={SECOND}>{mark}</text>}
                    </g>
                )
            })}
            {[[0, 3], [3, 7], [7, 11], [11, 15]].map(([from, to], index) => {
                const left = x0 + from * size + (from ? (size - 4) / 2 : 0)
                const right = x0 + (to === 15 ? 15 * size - 4 : to * size + (size - 4) / 2)
                return (
                    <g key={index}>
                        <path d={`M${left + 3} 140 v8 H${right - 3} v-8`} fill="none" stroke={COLORS[index]} strokeWidth={2} />
                        <text x={(left + right) / 2} y={168} textAnchor="middle" fontSize={14} fontWeight={700} fill={COLORS[index]}>25 %</text>
                    </g>
                )
            })}
            <Caption y={204} language={language} text={say('Me: 8. datua · Q₁ eta Q₃: beheko eta goiko erdien erdikoak', 'Me: el dato 8.º · Q₁ y Q₃: los centrales de la mitad de abajo y la de arriba', 'Me: البيان الثامن · Q₁ وQ₃: أوسطا النصف الأدنى والنصف الأعلى')} />
        </Figure>
    )
}

/* ---------- Box plot ---------- */

export function BoxPlotFigure({ language }: { language: UnitLanguage }) {
    const x = (value: number) => 90 + value * 55
    const summary = [1, 3.5, 5, 6, 9]
    return (
        <Figure height={240} label={pick(language, say('Kutxa-diagrama', 'Diagrama de caja y bigotes', 'مخطط الصندوق'))}>
            <line x1={x(0)} x2={x(10)} y1={170} y2={170} stroke={INK} strokeWidth={2} />
            {Array.from({ length: 11 }, (_, value) => (
                <g key={value}>
                    <line x1={x(value)} x2={x(value)} y1={164} y2={176} stroke={INK} strokeWidth={1.6} />
                    <text x={x(value)} y={196} textAnchor="middle" fontSize={14} fill={INK}>{value}</text>
                </g>
            ))}
            <line x1={x(1)} x2={x(3.5)} y1={110} y2={110} stroke={INK} strokeWidth={2.4} />
            <line x1={x(6)} x2={x(9)} y1={110} y2={110} stroke={INK} strokeWidth={2.4} />
            <line x1={x(1)} x2={x(1)} y1={96} y2={124} stroke={INK} strokeWidth={2.4} />
            <line x1={x(9)} x2={x(9)} y1={96} y2={124} stroke={INK} strokeWidth={2.4} />
            <rect x={x(3.5)} y={84} width={x(6) - x(3.5)} height={52} fill={STAGE} fillOpacity={0.28} stroke={INK} strokeWidth={2.4} />
            <line x1={x(5)} x2={x(5)} y1={84} y2={136} stroke={SECOND} strokeWidth={3.4} />
            {summary.map((value, index) => (
                <text key={index} x={x(value)} y={74} textAnchor="middle" fontSize={14} fontWeight={700} fill={index === 2 ? SECOND : INK}>{['min', 'Q₁', 'Me', 'Q₃', 'max'][index]}</text>
            ))}
            {[[1, 3.5], [3.5, 5], [5, 6], [6, 9]].map(([from, to], index) => (
                <text key={index} x={(x(from) + x(to)) / 2} y={154} textAnchor="middle" fontSize={13} fontWeight={700} fill={COLORS[index]}>25 %</text>
            ))}
            <Caption y={228} language={language} text={say('Zati bakoitzean datuen % 25; zati laburra = datuak bilduta', 'En cada parte, el 25 % de los datos; parte corta = datos agrupados', 'في كل جزء 25 % من البيانات؛ الجزء القصير = بيانات متجمّعة')} />
        </Figure>
    )
}

/* ---------- An event and its complement ---------- */

export function EventsFigure({ language }: { language: UnitLanguage }) {
    const inA = (value: number) => value % 3 === 0
    return (
        <Figure height={230} label={pick(language, say('Gertaera bat eta haren aurkakoa', 'Un suceso y su contrario', 'حدث ومعاكسه'))}>
            <rect x={40} y={30} width={640} height={120} rx={20} fill="none" stroke={INK} strokeWidth={2} />
            <text x={60} y={56} fontSize={17} fontWeight={700} fill={INK}>E</text>
            {Array.from({ length: 10 }, (_, index) => {
                const value = index + 1
                const cx = 100 + index * 60
                return (
                    <g key={value}>
                        <circle cx={cx} cy={96} r={22} fill={inA(value) ? SECOND : STAGE_TINT} fillOpacity={inA(value) ? 0.85 : 1} stroke={INK} strokeWidth={1.8} />
                        <text x={cx} y={102} textAnchor="middle" fontSize={17} fontWeight={700} fill={inA(value) ? PAPER : INK}>{value}</text>
                    </g>
                )
            })}
            <Formula x={200} y={186} color={SECOND}>A = {'{3, 6, 9}'} → P(A) = 3/10</Formula>
            <Formula x={520} y={186} color={STAGE}>P(Ā) = 1 − 3/10 = 7/10</Formula>
            <Caption y={218} language={language} text={say('A eta bere aurkakoa elkarrekin: lagin-espazio osoa', 'A y su contrario juntos: todo el espacio muestral', 'A ومعاكسه معًا: فضاء العيّنة كله')} />
        </Figure>
    )
}

/* ---------- Tree of three coins ---------- */

export function TreeFigure({ language }: { language: UnitLanguage }) {
    const [heads, tails] = language === 'eu' ? ['A', 'X'] : ['C', '+']
    const levelX = [60, 220, 380, 540]
    const leafY = (index: number) => 22 + index * 28
    const yAt = (level: number, index: number) => {
        const span = 8 / 2 ** level
        return (leafY(index * span) + leafY(index * span + span - 1)) / 2
    }
    const lines: ReactNode[] = []
    const labels: ReactNode[] = []
    for (let level = 1; level <= 3; level += 1) {
        for (let index = 0; index < 2 ** level; index += 1) {
            const parentY = level === 1 ? yAt(0, 0) : yAt(level - 1, Math.floor(index / 2))
            const y = yAt(level, index)
            const side = index % 2 === 0 ? heads : tails
            lines.push(<line key={`l${level}-${index}`} x1={levelX[level - 1] + 14} y1={parentY} x2={levelX[level] - 16} y2={y} stroke={INK} strokeWidth={1.6} />)
            labels.push(
                <g key={`n${level}-${index}`}>
                    <circle cx={levelX[level]} cy={y} r={11} fill={side === heads ? STAGE_TINT : PAPER} stroke={INK} strokeWidth={1.4} />
                    <text x={levelX[level]} y={y + 5} textAnchor="middle" fontSize={13} fontWeight={700} fill={INK}>{side}</text>
                </g>
            )
        }
    }
    const outcomes = Array.from({ length: 8 }, (_, index) => [0, 1, 2].map((bit) => ((index >> (2 - bit)) & 1 ? tails : heads)).join(''))
    return (
        <Figure height={280} label={pick(language, say('Hiru txanponen zuhaitz-diagrama', 'Diagrama de árbol de tres monedas', 'المخطط الشجري لثلاث قطع نقود'))}>
            <circle cx={levelX[0]} cy={yAt(0, 0)} r={6} fill={INK} />
            {lines}
            {labels}
            {outcomes.map((outcome, index) => {
                const one = outcome.split('').filter((side) => side === heads).length === 1
                return (
                    <text key={outcome} x={590} y={leafY(index) + 5} fontSize={15} fontWeight={700} fill={one ? SECOND : INK} direction="ltr">{outcome}</text>
                )
            })}
            <Formula x={650} y={262} color={SECOND} size={15} anchor="end">P = 3/8</Formula>
            <Caption x={300} y={266} language={language} text={say('2 · 2 · 2 = 8 emaitza; gorriz, aurpegi bakarrekoak', '2 · 2 · 2 = 8 resultados; en rojo, los de una sola cara', '2 · 2 · 2 = 8 نتائج؛ بالأحمر ذات الوجه الواحد')} />
        </Figure>
    )
}

/* ---------- Double-entry table ---------- */

export function DoubleTableFigure({ language }: { language: UnitLanguage }) {
    const columns = [say('Katua', 'Gato', 'قط'), say('Txakurra', 'Perro', 'كلب'), say('Guztira', 'Total', 'المجموع')]
    const rows = [
        { name: say('Osasuntsua', 'Sano', 'سليم'), values: [12, 17, 29] },
        { name: say('Gaixorik', 'Enfermo', 'مريض'), values: [4, 7, 11] },
        { name: say('Guztira', 'Total', 'المجموع'), values: [16, 24, 40] }
    ]
    const colX = [330, 450, 570]
    return (
        <Figure height={240} label={pick(language, say('Sarrera bikoitzeko taula', 'Tabla de doble entrada', 'جدول ذو مدخلين'))}>
            <rect x={110} y={104} width={520} height={38} rx={8} fill={STAGE_TINT} />
            <rect x={300} y={104} width={60} height={38} rx={8} fill={SECOND} fillOpacity={0.25} stroke={SECOND} strokeWidth={2} />
            {columns.map((column, index) => (
                <Label key={index} x={colX[index]} y={46} textAnchor="middle" fontSize={16} fontWeight={700} fill={STAGE}>{pick(language, column)}</Label>
            ))}
            <line x1={110} x2={630} y1={60} y2={60} stroke={INK} strokeWidth={2} />
            <line x1={270} x2={270} y1={24} y2={190} stroke={INK} strokeWidth={2} />
            <line x1={110} x2={630} y1={150} y2={150} stroke={INK} strokeWidth={1.4} />
            <line x1={515} x2={515} y1={24} y2={190} stroke={INK} strokeWidth={1.4} />
            {rows.map((row, rowIndex) => (
                <g key={rowIndex}>
                    <Label x={130} y={90 + rowIndex * 42} fontSize={16} fontWeight={700} fill={INK}>{pick(language, row.name)}</Label>
                    {row.values.map((value, index) => (
                        <text key={index} x={colX[index]} y={90 + rowIndex * 42} textAnchor="middle" fontSize={17} fontWeight={rowIndex === 2 || index === 2 ? 700 : 400} fill={INK}>{value}</text>
                    ))}
                </g>
            ))}
            <Formula x={360} y={216} color={SECOND}>P = 4/11</Formula>
            <Caption y={234} language={language} text={say('Gaixorik dagoela jakinda: kasu posibleak 11 gaixoak bakarrik', 'Sabiendo que está enfermo: los casos posibles son solo los 11 enfermos', 'علمًا أنه مريض: الحالات الممكنة هي المرضى الأحد عشر فقط')} size={14} />
        </Figure>
    )
}

/* ---------- Hero ---------- */

export function StatisticsHeroArt() {
    return (
        <div className="fraction-v2-collage" aria-hidden="true">
            <svg viewBox="0 0 520 400" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                <g transform="translate(36 44) rotate(-4)">
                    <rect width={230} height={190} rx={16} fill={PAPER} stroke={INK} strokeWidth={2} />
                    {[3, 9, 12, 6].map((value, index) => <rect key={index} x={30 + index * 44} y={160 - value * 10} width={44} height={value * 10} fill="#2f6fdb" fillOpacity={0.35} stroke={INK} strokeWidth={1.6} />)}
                    <polyline points="30,160 52,130 96,70 140,40 184,100 206,160" fill="none" stroke="#d9502e" strokeWidth={3} />
                    <line x1={20} x2={214} y1={160} y2={160} stroke={INK} strokeWidth={2} />
                </g>
                <g transform="translate(296 40) rotate(4)">
                    <rect width={190} height={110} rx={16} fill="#fbebc0" stroke={INK} strokeWidth={2} />
                    <line x1={22} x2={168} y1={56} y2={56} stroke={INK} strokeWidth={2.4} />
                    <line x1={22} x2={22} y1={44} y2={68} stroke={INK} strokeWidth={2.4} />
                    <line x1={168} x2={168} y1={44} y2={68} stroke={INK} strokeWidth={2.4} />
                    <rect x={62} y={36} width={64} height={40} fill="#dde7f7" stroke={INK} strokeWidth={2.2} />
                    <line x1={90} x2={90} y1={36} y2={76} stroke="#d9502e" strokeWidth={3} />
                </g>
                <g transform="translate(300 180) rotate(-3)">
                    <rect width={180} height={92} rx={16} fill="#e8e0f7" stroke={INK} strokeWidth={2} />
                    <text x={90} y={58} textAnchor="middle" fontSize={26} fontWeight={700} fill={INK} fontFamily="Fraunces, serif">Q₁ · Me · Q₃</text>
                </g>
                <g transform="translate(40 290)">
                    <rect width={440} height={84} rx={16} fill="#d6eddf" stroke={INK} strokeWidth={2} />
                    <circle cx={40} cy={42} r={6} fill={INK} />
                    {[-1, 1].map((side) => (
                        <g key={side}>
                            <line x1={46} y1={42} x2={120} y2={42 + side * 22} stroke={INK} strokeWidth={2} />
                            <circle cx={132} cy={42 + side * 22} r={12} fill={PAPER} stroke={INK} strokeWidth={1.6} />
                            {[-1, 1].map((leaf) => (
                                <g key={leaf}>
                                    <line x1={144} y1={42 + side * 22} x2={214} y2={42 + side * 22 + leaf * 10} stroke={INK} strokeWidth={1.6} />
                                    <circle cx={224} cy={42 + side * 22 + leaf * 10} r={8} fill="#dde7f7" stroke={INK} strokeWidth={1.4} />
                                </g>
                            ))}
                        </g>
                    ))}
                    <text x={330} y={54} textAnchor="middle" fontSize={30} fontWeight={700} fill={INK} fontFamily="Fraunces, serif">P = 3/8</text>
                </g>
            </svg>
        </div>
    )
}
