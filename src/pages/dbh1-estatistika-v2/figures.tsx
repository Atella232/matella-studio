import { pickText, type LocalizedText, type UnitLanguage } from '../../features/unit-v2/types'
import { Caption, Figure } from '../dbh2-zatikiak-prototype/figures'
import { sportSurvey } from './survey'

/* ==========================================================================
   Estatistika · 1. DBH — lesson figures in the notebook style: population
   and sample, a frequency table, bar chart, pie chart, frequency polygon,
   the mean as a balance point, median and mode, and a die's sample space.
   The class survey (favourite sport of 20 students) is used throughout.
   ========================================================================== */

const INK = 'var(--ink, #1d2733)'
const MUTED = 'var(--muted, #58616e)'
const STAGE = 'var(--stage, #2f6fdb)'
const STAGE_TINT = 'var(--stage-tint, #dde7f7)'
const SECOND = 'var(--second, #c4432a)'
const PAPER = '#fffcf6'

const pick = (language: UnitLanguage, text: LocalizedText) => pickText(language, text)


/* ---------- Population and sample ---------- */

export function PopulationFigure({ language }: { language: UnitLanguage }) {
    return (
        <Figure height={230} label={pick(language, { eu: 'Populazioa eta lagina', es: 'Población y muestra', ar: 'المجتمع والعيّنة' })}>
            <rect x={40} y={30} width={380} height={160} rx={20} fill={STAGE_TINT} fillOpacity={0.5} stroke={INK} strokeWidth={2} />
            {Array.from({ length: 40 }, (_, index) => {
                const x = 64 + (index % 10) * 36
                const y = 58 + Math.floor(index / 10) * 34
                const inSample = index % 10 < 3 && Math.floor(index / 10) < 2
                return <circle key={index} cx={x} cy={y} r={10} fill={inSample ? SECOND : PAPER} stroke={INK} strokeWidth={1.6} />
            })}
            <rect x={48} y={40} width={116} height={78} rx={12} fill="none" stroke={SECOND} strokeWidth={2.4} strokeDasharray="6 4" />
            <text x={470} y={80} fontSize={17} fontWeight={700} fill={INK}>{pick(language, { eu: 'Populazioa: denak (40)', es: 'Población: todos (40)', ar: 'المجتمع: الجميع (40)' })}</text>
            <text x={470} y={115} fontSize={17} fontWeight={700} fill={SECOND}>{pick(language, { eu: 'Lagina: zati bat (6)', es: 'Muestra: una parte (6)', ar: 'العيّنة: جزء (6)' })}</text>
            <text x={470} y={150} fontSize={17} fontWeight={700} fill={MUTED}>{pick(language, { eu: '● banakoa', es: '● individuo', ar: '● فرد' })}</text>
            <Caption y={220}>{pick(language, { eu: 'Laginak populazioa ondo ordezkatu behar du', es: 'La muestra tiene que representar bien a la población', ar: 'يجب أن تمثّل العيّنة المجتمع تمثيلًا جيدًا' })}</Caption>
        </Figure>
    )
}

/* ---------- Frequency table ---------- */

export function FrequencyTableFigure({ language }: { language: UnitLanguage }) {
    const total = sportSurvey.reduce((sum, row) => sum + row.count, 0)
    const decimal = (value: number) => (language === 'ar' ? String(value) : String(value).replace('.', ','))
    const columns = [140, 300, 420, 540]
    return (
        <Figure height={250} label={pick(language, { eu: 'Maiztasun-taula', es: 'Tabla de frecuencias', ar: 'جدول التكرارات' })}>
            {[pick(language, { eu: 'Kirola', es: 'Deporte', ar: 'الرياضة' }), 'fᵢ', 'hᵢ', '%'].map((title, index) => (
                <text key={title} x={columns[index]} y={30} textAnchor="middle" fontSize={17} fontWeight={700} fill={STAGE}>{title}</text>
            ))}
            <line x1={50} x2={620} y1={42} y2={42} stroke={INK} strokeWidth={2} />
            {sportSurvey.map((row, index) => (
                <g key={index}>
                    <text x={columns[0]} y={70 + index * 34} textAnchor="middle" fontSize={16} fill={INK}>{pick(language, row.name)}</text>
                    <text x={columns[1]} y={70 + index * 34} textAnchor="middle" fontSize={16} fontWeight={700} fill={INK}>{row.count}</text>
                    <text x={columns[2]} y={70 + index * 34} textAnchor="middle" fontSize={16} fill={INK}>{decimal(row.count / total)}</text>
                    <text x={columns[3]} y={70 + index * 34} textAnchor="middle" fontSize={16} fill={INK}>{(row.count / total) * 100}</text>
                </g>
            ))}
            <line x1={50} x2={620} y1={196} y2={196} stroke={INK} strokeWidth={1.6} />
            <text x={columns[0]} y={220} textAnchor="middle" fontSize={16} fontWeight={700} fill={INK}>{pick(language, { eu: 'Guztira', es: 'Total', ar: 'المجموع' })}</text>
            <text x={columns[1]} y={220} textAnchor="middle" fontSize={16} fontWeight={700} fill={INK}>N = {total}</text>
            <text x={columns[2]} y={220} textAnchor="middle" fontSize={16} fontWeight={700} fill={INK}>1</text>
            <text x={columns[3]} y={220} textAnchor="middle" fontSize={16} fontWeight={700} fill={INK}>100</text>
            <Caption y={244}>{pick(language, { eu: 'hᵢ = fᵢ : N · Ehunekoa = hᵢ · 100', es: 'hᵢ = fᵢ : N · Porcentaje = hᵢ · 100', ar: 'hᵢ = fᵢ : N · النسبة المئوية = hᵢ · 100' })}</Caption>
        </Figure>
    )
}

/* ---------- Bar chart ---------- */

export function BarChartFigure({ language }: { language: UnitLanguage }) {
    const unit = 18
    return (
        <Figure height={250} label={pick(language, { eu: 'Barra-diagrama', es: 'Diagrama de barras', ar: 'مخطط الأعمدة' })}>
            <line x1={80} x2={80} y1={20} y2={200} stroke={INK} strokeWidth={2} />
            <line x1={80} x2={620} y1={200} y2={200} stroke={INK} strokeWidth={2} />
            {[0, 2, 4, 6, 8].map((value) => (
                <g key={value}>
                    <line x1={74} x2={620} y1={200 - value * unit} y2={200 - value * unit} stroke="var(--line, #d6cfc2)" strokeWidth={value === 0 ? 0 : 1} />
                    <text x={66} y={205 - value * unit} textAnchor="end" fontSize={14} fill={MUTED}>{value}</text>
                </g>
            ))}
            {sportSurvey.map((row, index) => (
                <g key={index}>
                    <rect x={120 + index * 125} y={200 - row.count * unit} width={70} height={row.count * unit} fill={row.color} fillOpacity={0.75} stroke={INK} strokeWidth={2} />
                    <text x={155 + index * 125} y={192 - row.count * unit} textAnchor="middle" fontSize={15} fontWeight={700} fill={INK}>{row.count}</text>
                    <text x={155 + index * 125} y={222} textAnchor="middle" fontSize={14} fontWeight={700} fill={INK}>{pick(language, row.name)}</text>
                </g>
            ))}
            <Caption y={246}>{pick(language, { eu: 'Barra bakoitzaren altuera bere maiztasun absolutua da', es: 'La altura de cada barra es su frecuencia absoluta', ar: 'ارتفاع كل عمود هو تكراره المطلق' })}</Caption>
        </Figure>
    )
}

/* ---------- Pie chart ---------- */

export function PieChartFigure({ language }: { language: UnitLanguage }) {
    const total = sportSurvey.reduce((sum, row) => sum + row.count, 0)
    const cx = 170
    const cy = 120
    const r = 95
    const starts = sportSurvey.map((_, index) => -90 + sportSurvey.slice(0, index).reduce((sum, row) => sum + (row.count / total) * 360, 0))
    return (
        <Figure height={250} label={pick(language, { eu: 'Sektore-diagrama', es: 'Diagrama de sectores', ar: 'المخطط الدائري' })}>
            {sportSurvey.map((row, index) => {
                const start = starts[index]
                const angle = (row.count / total) * 360
                const end = start + angle
                const point = (degrees: number) => [cx + r * Math.cos((degrees * Math.PI) / 180), cy + r * Math.sin((degrees * Math.PI) / 180)]
                const [x1, y1] = point(start)
                const [x2, y2] = point(end)
                const path = `M${cx} ${cy} L${x1} ${y1} A${r} ${r} 0 ${angle > 180 ? 1 : 0} 1 ${x2} ${y2} Z`
                const middle = start + angle / 2
                const [lx, ly] = [cx + r * 0.62 * Math.cos((middle * Math.PI) / 180), cy + r * 0.62 * Math.sin((middle * Math.PI) / 180)]
                return (
                    <g key={index}>
                        <path d={path} fill={row.color} fillOpacity={0.75} stroke={INK} strokeWidth={2} />
                        <text x={lx} y={ly + 5} textAnchor="middle" fontSize={14} fontWeight={700} fill={INK}>{angle}°</text>
                    </g>
                )
            })}
            {sportSurvey.map((row, index) => (
                <g key={`legend${index}`}>
                    <rect x={330} y={42 + index * 36} width={18} height={18} fill={row.color} fillOpacity={0.75} stroke={INK} strokeWidth={1.4} />
                    <text x={358} y={57 + index * 36} fontSize={15} fill={INK}>{pick(language, row.name)}: {row.count} → {row.count} · 18° = {(row.count / total) * 360}°</text>
                </g>
            ))}
            <Caption y={242}>{pick(language, { eu: 'Sektore bakoitzaren angelua: hᵢ · 360° (hemen, pertsona bakoitzeko 18°)', es: 'El ángulo de cada sector: hᵢ · 360° (aquí, 18° por persona)', ar: 'زاوية كل قطاع: hᵢ · 360° (هنا 18° لكل شخص)' })}</Caption>
        </Figure>
    )
}

/* ---------- Frequency polygon: temperatures of a week ---------- */

export function LineChartFigure({ language }: { language: UnitLanguage }) {
    const temperatures = [14, 16, 15, 18, 21, 20, 17]
    const days = { eu: ['Al', 'Ar', 'Az', 'Og', 'Or', 'La', 'Ig'], es: ['L', 'M', 'X', 'J', 'V', 'S', 'D'], ar: ['1', '2', '3', '4', '5', '6', '7'] }[language]
    const x = (index: number) => 110 + index * 75
    const y = (value: number) => 200 - (value - 10) * 14
    return (
        <Figure height={250} label={pick(language, { eu: 'Aste bateko tenperaturak lerro-diagraman', es: 'Temperaturas de una semana en un diagrama de líneas', ar: 'درجات حرارة أسبوع في مخطط خطي' })}>
            <line x1={80} x2={80} y1={20} y2={200} stroke={INK} strokeWidth={2} />
            <line x1={80} x2={640} y1={200} y2={200} stroke={INK} strokeWidth={2} />
            {[10, 15, 20].map((value) => <text key={value} x={70} y={y(value) + 5} textAnchor="end" fontSize={14} fill={MUTED}>{value}°</text>)}
            <polyline points={temperatures.map((value, index) => `${x(index)},${y(value)}`).join(' ')} fill="none" stroke={STAGE} strokeWidth={3} />
            {temperatures.map((value, index) => (
                <g key={index}>
                    <circle cx={x(index)} cy={y(value)} r={6} fill={STAGE} stroke={INK} strokeWidth={1.6} />
                    <text x={x(index)} y={y(value) - 12} textAnchor="middle" fontSize={14} fontWeight={700} fill={INK}>{value}</text>
                    <text x={x(index)} y={222} textAnchor="middle" fontSize={14} fill={INK}>{days[index]}</text>
                </g>
            ))}
            <Caption y={246}>{pick(language, { eu: 'Lerroak denboran zehar nola aldatzen den erakusten du', es: 'La línea muestra cómo cambia a lo largo del tiempo', ar: 'يُظهر الخط كيف تتغيّر القيمة مع الزمن' })}</Caption>
        </Figure>
    )
}

/* ---------- The mean as the balance point ---------- */

export function MeanFigure({ language }: { language: UnitLanguage }) {
    const marks = [5, 7, 7, 8, 9, 6]
    const x = (value: number) => 100 + (value - 4) * 90
    const stacks = new Map<number, number>()
    return (
        <Figure height={240} label={pick(language, { eu: 'Batez bestekoa oreka-puntua da', es: 'La media es el punto de equilibrio', ar: 'المتوسط هو نقطة التوازن' })}>
            <line x1={70} x2={650} y1={150} y2={150} stroke={INK} strokeWidth={3} />
            {[4, 5, 6, 7, 8, 9, 10].map((value) => (
                <g key={value}>
                    <line x1={x(value)} x2={x(value)} y1={144} y2={156} stroke={INK} strokeWidth={2} />
                    <text x={x(value)} y={198} textAnchor="middle" fontSize={15} fill={INK}>{value}</text>
                </g>
            ))}
            {marks.map((value, index) => {
                const level = stacks.get(value) ?? 0
                stacks.set(value, level + 1)
                return <circle key={index} cx={x(value)} cy={132 - level * 24} r={10} fill={STAGE} fillOpacity={0.7} stroke={INK} strokeWidth={1.6} />
            })}
            <polygon points={`${x(7)},153 ${x(7) - 12},178 ${x(7) + 12},178`} fill={SECOND} stroke={INK} strokeWidth={1.6} />
            <text x={360} y={34} textAnchor="middle" fontSize={17} fontWeight={700} fill={INK}>{pick(language, { eu: 'Notak: 5, 7, 7, 8, 9, 6', es: 'Notas: 5, 7, 7, 8, 9, 6', ar: 'العلامات: 5، 7، 7، 8، 9، 6' })}</text>
            <text x={360} y={225} textAnchor="middle" fontSize={17} fontWeight={700} fill={SECOND}>x̄ = (5 + 7 + 7 + 8 + 9 + 6) : 6 = 42 : 6 = 7</text>
        </Figure>
    )
}

/* ---------- Sample space of a die ---------- */

export function DiceFigure({ language }: { language: UnitLanguage }) {
    const pips: Record<number, Array<[number, number]>> = {
        1: [[0, 0]], 2: [[-1, -1], [1, 1]], 3: [[-1, -1], [0, 0], [1, 1]], 4: [[-1, -1], [1, -1], [-1, 1], [1, 1]],
        5: [[-1, -1], [1, -1], [0, 0], [-1, 1], [1, 1]], 6: [[-1, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [1, 1]]
    }
    return (
        <Figure height={230} label={pick(language, { eu: 'Dado baten lagin-espazioa', es: 'Espacio muestral de un dado', ar: 'فضاء العيّنة لنرد' })}>
            {[1, 2, 3, 4, 5, 6].map((face, index) => {
                const cx = 80 + index * 110
                const even = face % 2 === 0
                return (
                    <g key={face}>
                        <rect x={cx - 36} y={40} width={72} height={72} rx={14} fill={even ? STAGE_TINT : PAPER} stroke={INK} strokeWidth={2.2} />
                        {pips[face].map(([dx, dy], pip) => <circle key={pip} cx={cx + dx * 20} cy={76 + dy * 20} r={6} fill={INK} />)}
                    </g>
                )
            })}
            <text x={360} y={150} textAnchor="middle" fontSize={18} fontWeight={700} fill={INK}>E = {'{1, 2, 3, 4, 5, 6}'}</text>
            <text x={360} y={185} textAnchor="middle" fontSize={17} fontWeight={700} fill={STAGE}>{pick(language, { eu: 'Bikoitia atera: 3 aldeko kasu → P = 3/6 = 1/2', es: 'Sacar par: 3 casos favorables → P = 3/6 = 1/2', ar: 'الحصول على عدد زوجي: 3 حالات ملائمة ← P = 3/6 = 1/2' })}</text>
            <Caption y={220}>{pick(language, { eu: 'Laplaceren erregela: aldeko kasuak : kasu posibleak', es: 'Regla de Laplace: casos favorables : casos posibles', ar: 'قاعدة لابلاس: الحالات الملائمة : الحالات الممكنة' })}</Caption>
        </Figure>
    )
}

/* ---------- Hero ---------- */

export function StatisticsIntroHeroArt() {
    return (
        <div className="fraction-v2-collage" aria-hidden="true">
            <svg viewBox="0 0 520 400" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                <g transform="translate(40 50) rotate(-4)">
                    <rect width={210} height={190} rx={16} fill={PAPER} stroke={INK} strokeWidth={2} />
                    {[8, 5, 4, 3].map((value, index) => <rect key={index} x={28 + index * 44} y={160 - value * 16} width={32} height={value * 16} fill={['#2f6fdb', '#d9502e', '#e0a100', '#267b53'][index]} fillOpacity={0.75} stroke={INK} strokeWidth={1.6} />)}
                    <line x1={20} x2={196} y1={160} y2={160} stroke={INK} strokeWidth={2} />
                </g>
                <g transform="translate(300 40) rotate(4)">
                    <rect width={170} height={120} rx={16} fill="#e8e0f7" stroke={INK} strokeWidth={2} />
                    <circle cx={85} cy={60} r={42} fill="#dde7f7" stroke={INK} strokeWidth={2} />
                    <path d="M85 60 L85 18 A42 42 0 0 1 125 73 Z" fill="#d9502e" fillOpacity={0.7} stroke={INK} strokeWidth={1.6} />
                </g>
                <g transform="translate(300 190) rotate(-3)">
                    <rect width={170} height={88} rx={16} fill="#fbebc0" stroke={INK} strokeWidth={2} />
                    <text x={85} y={56} textAnchor="middle" fontSize={28} fontWeight={700} fill={INK} fontFamily="Fraunces, serif">x̄ = 7</text>
                </g>
                <g transform="translate(40 300)">
                    <rect width={440} height={70} rx={16} fill="#d6eddf" stroke={INK} strokeWidth={2} />
                    {[1, 2, 3, 4, 5, 6].map((face, index) => (
                        <g key={face}>
                            <rect x={26 + index * 68} y={14} width={42} height={42} rx={8} fill={PAPER} stroke={INK} strokeWidth={2} />
                            <text x={47 + index * 68} y={42} textAnchor="middle" fontSize={20} fontWeight={700} fill={INK}>{face}</text>
                        </g>
                    ))}
                </g>
            </svg>
        </div>
    )
}
