import type { CSSProperties, ReactNode } from 'react'
import { pickText, type LocalizedText, type UnitLanguage } from '../../features/unit-v2/types'

/* ==========================================================================
   Zatikiak · lesson figures, drawn as SVG in the notebook style
   ========================================================================== */

const INK = 'var(--ink, #1d2733)'
const MUTED = 'var(--muted, #58616e)'
const STAGE = 'var(--stage, #2f6fdb)'
const STAGE_TINT = 'var(--stage-tint, #dde7f7)'
const SECOND = 'var(--second, #c4432a)'
const PAPER = '#fffcf6'

/** Figures keep left-to-right order in every language, like the formulas */
const svgStyle: CSSProperties = { fontFamily: '"Atkinson Hyperlegible", "Noto Sans Arabic", system-ui, sans-serif', direction: 'ltr' }

const pick = (language: UnitLanguage, text: LocalizedText) => pickText(language, text)

/** Decimal comma in Basque and Spanish, point in Arabic */
const decimal = (language: UnitLanguage, value: number, digits = 2) => {
    const text = Number.isInteger(value) ? String(value) : value.toFixed(digits).replace(/0+$/, '')
    return language === 'ar' ? text : text.replace('.', ',')
}

/** Euros always with two decimals */
const money = (language: UnitLanguage, value: number) => {
    const text = value === 0 ? '0' : value.toFixed(2)
    return language === 'ar' ? text : text.replace('.', ',')
}

/** Basque writes the sign first (%25); Spanish and Arabic after (25 %) */
const percent = (language: UnitLanguage, value: number) => {
    const number = decimal(language, value, 1)
    return language === 'eu' ? `%${number}` : `${number} %`
}

function Figure({ height, label, children }: { height: number; label: string; children: ReactNode }) {
    return (
        <svg viewBox={`0 0 720 ${height}`} role="img" aria-label={label} style={svgStyle}>
            {children}
        </svg>
    )
}

/** A stacked fraction centred on x; y is the fraction bar */
function Frac({ x, y, n, d, size = 20, color = INK, sign = '' }: { x: number; y: number; n: number | string; d: number | string; size?: number; color?: string; sign?: string }) {
    const half = Math.max(String(n).length, String(d).length) * size * 0.32 + 4
    return (
        <g>
            {sign && <text x={x - half - 4} y={y + size * 0.34} textAnchor="end" fontSize={size} fontWeight={700} fill={color}>{sign}</text>}
            <text x={x} y={y - 5} textAnchor="middle" fontSize={size} fontWeight={700} fill={color}>{n}</text>
            <line x1={x - half} x2={x + half} y1={y} y2={y} stroke={color} strokeWidth={2} />
            <text x={x} y={y + size + 1} textAnchor="middle" fontSize={size} fontWeight={700} fill={color}>{d}</text>
        </g>
    )
}

/** A bar split into equal parts; the first `filled` in the stage colour, the next `extra` in the second colour */
function Bar({ x, y, width, height = 40, parts, filled, extra = 0, labels }: { x: number; y: number; width: number; height?: number; parts: number; filled: number; extra?: number; labels?: string[] }) {
    const part = width / parts
    return (
        <g>
            {Array.from({ length: parts }, (_, index) => {
                const fill = index < filled ? STAGE_TINT : index < filled + extra ? SECOND : PAPER
                return (
                    <g key={index}>
                        <rect x={x + index * part} y={y} width={part} height={height} fill={fill} fillOpacity={index >= filled && index < filled + extra ? 0.28 : 1} stroke={INK} strokeWidth={1.8} />
                        {labels?.[index] && <text x={x + index * part + part / 2} y={y + height / 2 + 6} textAnchor="middle" fontSize={16} fontWeight={700} fill={INK}>{labels[index]}</text>}
                    </g>
                )
            })}
            <rect x={x} y={y} width={width} height={height} fill="none" stroke={INK} strokeWidth={2.4} rx={3} />
        </g>
    )
}

function Caption({ y, children }: { y: number; children: ReactNode }) {
    return <text x={360} y={y} textAnchor="middle" fontSize={15} fill={MUTED}>{children}</text>
}

/* ---------- 1. Meaning: part, quotient and number ---------- */

export function MeaningFigure({ language }: { language: UnitLanguage }) {
    const sector = (cx: number, cy: number, r: number) => `M${cx} ${cy} L${cx} ${cy - r} A${r} ${r} 0 0 1 ${cx + r} ${cy} Z`
    const lineX = (value: number) => 510 + value * 180
    return (
        <Figure height={200} label={pick(language, { eu: '3/4 zati, zatiketa eta zenbaki gisa', es: '3/4 como parte, cociente y número', ar: '3/4 جزءًا وقسمةً وعددًا' })}>
            {[
                { x: 120, text: { eu: 'Zatia', es: 'Parte', ar: 'جزء' } },
                { x: 360, text: { eu: 'Zatiketa', es: 'Cociente', ar: 'قسمة' } },
                { x: 600, text: { eu: 'Zenbakia', es: 'Número', ar: 'عدد' } }
            ].map((panel) => <text key={panel.x} x={panel.x} y={26} textAnchor="middle" fontSize={17} fontWeight={700} fill={STAGE}>{pick(language, panel.text)}</text>)}
            <Bar x={30} y={56} width={180} height={46} parts={4} filled={3} />
            <Frac x={120} y={150} n={3} d={4} />
            {[0, 1, 2].map((index) => {
                const cx = 300 + index * 60
                return (
                    <g key={index}>
                        <circle cx={cx} cy={80} r={24} fill={PAPER} stroke={INK} strokeWidth={2} />
                        <path d={sector(cx, 80, 24)} fill={STAGE_TINT} stroke={INK} strokeWidth={1.6} />
                        <line x1={cx - 24} x2={cx + 24} y1={80} y2={80} stroke={INK} strokeWidth={1.2} />
                        <line x1={cx} x2={cx} y1={56} y2={104} stroke={INK} strokeWidth={1.2} />
                    </g>
                )
            })}
            <text x={360} y={150} textAnchor="middle" fontSize={20} fontWeight={700} fill={INK}>3 : 4 = {decimal(language, 0.75)}</text>
            <line x1={lineX(0) - 10} x2={lineX(1) + 10} y1={80} y2={80} stroke={INK} strokeWidth={2.2} />
            {[0, 1, 2, 3, 4].map((quarter) => (
                <line key={quarter} x1={lineX(quarter / 4)} x2={lineX(quarter / 4)} y1={quarter % 4 === 0 ? 70 : 74} y2={quarter % 4 === 0 ? 90 : 86} stroke={INK} strokeWidth={quarter % 4 === 0 ? 2.2 : 1.4} />
            ))}
            <circle cx={lineX(0.75)} cy={80} r={8} fill={STAGE} stroke={INK} strokeWidth={2} />
            <text x={lineX(0)} y={114} textAnchor="middle" fontSize={16} fill={INK}>0</text>
            <text x={lineX(1)} y={114} textAnchor="middle" fontSize={16} fill={INK}>1</text>
            <Frac x={lineX(0.75)} y={150} n={3} d={4} color={STAGE} />
            <Caption y={194}>{pick(language, { eu: 'Hiru irakurketa, balio bera', es: 'Tres lecturas, un mismo valor', ar: 'ثلاث قراءات لقيمة واحدة' })}</Caption>
        </Figure>
    )
}

/* ---------- 2. Improper fraction as a mixed number ---------- */

export function MixedFigure({ language }: { language: UnitLanguage }) {
    const lineX = (value: number) => 60 + value * 150
    return (
        <Figure height={250} label={pick(language, { eu: '17/5 = 3 eta 2/5', es: '17/5 = 3 y 2/5', ar: '17/5 = 3 و2/5' })}>
            {[0, 1, 2, 3].map((unit) => (
                <g key={unit}>
                    <Bar x={30 + unit * 170} y={20} width={150} height={40} parts={5} filled={unit < 3 ? 5 : 2} />
                    {unit < 3
                        ? <text x={105 + unit * 170} y={90} textAnchor="middle" fontSize={20} fontWeight={700} fill={INK}>1</text>
                        : <Frac x={105 + unit * 170} y={90} n={2} d={5} color={STAGE} />}
                </g>
            ))}
            <line x1={lineX(0) - 10} x2={lineX(4) + 10} y1={160} y2={160} stroke={INK} strokeWidth={2.2} />
            {Array.from({ length: 21 }, (_, index) => (
                <line key={index} x1={lineX(index / 5)} x2={lineX(index / 5)} y1={index % 5 === 0 ? 150 : 154} y2={index % 5 === 0 ? 170 : 166} stroke={INK} strokeWidth={index % 5 === 0 ? 2.2 : 1.2} />
            ))}
            {[0, 1, 2, 3, 4].map((value) => <text key={value} x={lineX(value)} y={194} textAnchor="middle" fontSize={16} fill={INK}>{value}</text>)}
            <circle cx={lineX(3.4)} cy={160} r={8} fill={STAGE} stroke={INK} strokeWidth={2} />
            <text x={lineX(3.4)} y={138} textAnchor="middle" fontSize={16} fontWeight={700} fill={STAGE}>{decimal(language, 3.4)}</text>
            <Caption y={236}>{pick(language, {
                eu: '17 bosten = 3 unitate oso eta beste 2 bosten',
                es: '17 quintos = 3 unidades completas y 2 quintos más',
                ar: '17 خُمسًا = 3 وحدات كاملة وخُمسان'
            })}</Caption>
        </Figure>
    )
}

/* ---------- 3. Equivalent fractions ---------- */

export function EquivalenceFigure({ language }: { language: UnitLanguage }) {
    const rows = [[3, 4], [6, 8], [9, 12]] as const
    const x = 140
    const width = 520
    return (
        <Figure height={244} label={pick(language, { eu: '3/4, 6/8 eta 9/12 zatiki baliokideak', es: 'Fracciones equivalentes 3/4, 6/8 y 9/12', ar: 'الكسور المتكافئة 3/4 و6/8 و9/12' })}>
            {rows.map(([n, d], index) => (
                <g key={d}>
                    <Frac x={70} y={48 + index * 64} n={n} d={d} />
                    <Bar x={x} y={26 + index * 64} width={width} height={42} parts={d} filled={n} />
                </g>
            ))}
            <line x1={x + width * 0.75} x2={x + width * 0.75} y1={14} y2={206} stroke={SECOND} strokeWidth={2.6} strokeDasharray="7 6" />
            <Caption y={236}>{pick(language, {
                eu: 'Zati gehiago eta txikiagoak, baina luzera bera',
                es: 'Más trozos y más pequeños, pero la misma longitud',
                ar: 'أجزاء أكثر وأصغر، لكن الطول نفسه'
            })}</Caption>
        </Figure>
    )
}

/* ---------- 4. Simplifying step by step or with the GCD ---------- */

export function SimplifyFigure({ language }: { language: UnitLanguage }) {
    const chain = [[84, 126], [42, 63], [14, 21], [2, 3]] as const
    const divisors = [2, 3, 7]
    const xs = [90, 270, 450, 630]
    return (
        <Figure height={220} label={pick(language, { eu: '84/126 sinplifikatzen', es: 'Simplificando 84/126', ar: 'تبسيط 84/126' })}>
            {chain.map(([n, d], index) => <Frac key={n} x={xs[index]} y={84} n={n} d={d} size={24} color={index === chain.length - 1 ? STAGE : INK} />)}
            {divisors.map((divisor, index) => {
                const from = xs[index] + 42
                const to = xs[index + 1] - 42
                return (
                    <g key={divisor}>
                        <line x1={from} x2={to - 8} y1={78} y2={78} stroke={INK} strokeWidth={2} />
                        <path d={`M${to - 10} 72 L${to} 78 L${to - 10} 84 z`} fill={INK} />
                        <text x={(from + to) / 2} y={66} textAnchor="middle" fontSize={16} fontWeight={700} fill={MUTED}>: {divisor}</text>
                    </g>
                )
            })}
            <path d={`M${xs[0]} 136 C ${xs[0]} 190, ${xs[3]} 190, ${xs[3]} 140`} fill="none" stroke={STAGE} strokeWidth={2.6} />
            <path d={`M${xs[3] - 7} 146 L${xs[3]} 134 L${xs[3] + 7} 146 z`} fill={STAGE} />
            <text x={360} y={196} textAnchor="middle" fontSize={17} fontWeight={700} fill={STAGE}>
                {pick(language, { eu: ': 42 = ZKH(84, 126), urrats bakarrean', es: ': 42 = m.c.d.(84, 126), en un solo paso', ar: ': 42 = ZKH(84، 126)، في خطوة واحدة' })}
            </text>
        </Figure>
    )
}

/* ---------- 5. Ordering on the number line ---------- */

export function OrderFigure({ language }: { language: UnitLanguage }) {
    const x = (value: number) => 360 + value * 300
    const points = [
        { value: -3 / 4, n: 3, d: 4, sign: '−', tone: SECOND, up: false },
        { value: -2 / 3, n: 2, d: 3, sign: '−', tone: SECOND, up: true },
        { value: 1 / 4, n: 1, d: 4, sign: '', tone: STAGE, up: true },
        { value: 5 / 6, n: 5, d: 6, sign: '', tone: STAGE, up: true }
    ]
    return (
        <Figure height={200} label={pick(language, { eu: '−3/4, −2/3, 1/4 eta 5/6 zenbaki-zuzenean', es: '−3/4, −2/3, 1/4 y 5/6 en la recta', ar: '−3/4 و−2/3 و1/4 و5/6 على خط الأعداد' })}>
            <line x1={x(-1) - 14} x2={x(1) + 14} y1={100} y2={100} stroke={INK} strokeWidth={2.4} />
            {Array.from({ length: 25 }, (_, index) => {
                const value = -1 + index / 12
                const whole = index % 12 === 0
                return <line key={index} x1={x(value)} x2={x(value)} y1={whole ? 88 : 94} y2={whole ? 112 : 106} stroke={INK} strokeWidth={whole ? 2.4 : 1.1} />
            })}
            {[-1, 0, 1].map((value) => <text key={value} x={x(value)} y={138} textAnchor="middle" fontSize={17} fontWeight={700} fill={INK}>{value < 0 ? '−1' : value}</text>)}
            {points.map((point) => (
                <g key={point.value}>
                    <circle cx={x(point.value)} cy={100} r={8} fill={point.tone} stroke={INK} strokeWidth={2} />
                    <Frac x={x(point.value) + (point.sign ? 6 : 0)} y={point.up ? 50 : 150} n={point.n} d={point.d} size={17} color={point.tone} sign={point.sign} />
                </g>
            ))}
            <Caption y={194}>{pick(language, { eu: 'Eskuinerago, handiago', es: 'Más a la derecha, mayor', ar: 'كلما اتجهنا يمينًا كان العدد أكبر' })}</Caption>
        </Figure>
    )
}

/* ---------- 6. Adding with a common denominator ---------- */

export function AddFigure({ language }: { language: UnitLanguage }) {
    return (
        <Figure height={330} label={pick(language, { eu: '1/2 + 1/3 = 3/6 + 2/6 = 5/6', es: '1/2 + 1/3 = 3/6 + 2/6 = 5/6', ar: '1/2 + 1/3 = 3/6 + 2/6 = 5/6' })}>
            <Bar x={60} y={20} width={240} parts={2} filled={1} />
            <text x={360} y={48} textAnchor="middle" fontSize={26} fontWeight={700} fill={INK}>+</text>
            <Bar x={420} y={20} width={240} parts={3} filled={0} extra={1} />
            <Frac x={180} y={92} n={1} d={2} size={17} />
            <Frac x={540} y={92} n={1} d={3} size={17} />
            <Bar x={60} y={130} width={240} parts={6} filled={3} />
            <text x={360} y={158} textAnchor="middle" fontSize={26} fontWeight={700} fill={INK}>+</text>
            <Bar x={420} y={130} width={240} parts={6} filled={0} extra={2} />
            <Frac x={180} y={202} n={3} d={6} size={17} />
            <Frac x={540} y={202} n={2} d={6} size={17} />
            <text x={150} y={272} textAnchor="middle" fontSize={26} fontWeight={700} fill={INK}>=</text>
            <Bar x={200} y={244} width={320} parts={6} filled={3} extra={2} />
            <Frac x={580} y={268} n={5} d={6} size={20} color={STAGE} />
            <Caption y={322}>{pick(language, { eu: 'Erdiak eta herenak ezin dira batu; seirenak bai', es: 'Medios y tercios no se pueden sumar; sextos, sí', ar: 'لا نجمع الأنصاف مع الأثلاث، لكن نجمع الأسداس' })}</Caption>
        </Figure>
    )
}

/* ---------- 7. Product as an area ---------- */

export function AreaFigure({ language }: { language: UnitLanguage }) {
    const size = 240
    const left = 90
    const top = 62
    const cell = { w: size / 3, h: size / 4 }
    return (
        <Figure height={330} label={pick(language, { eu: '2/3 · 3/4 azalera gisa', es: '2/3 · 3/4 como área', ar: '2/3 · 3/4 على شكل مساحة' })}>
            {Array.from({ length: 12 }, (_, index) => {
                const column = index % 3
                const row = Math.floor(index / 3)
                const inColumn = column < 2
                const inRow = row < 3
                return (
                    <rect key={index} x={left + column * cell.w} y={top + row * cell.h} width={cell.w} height={cell.h}
                        fill={inColumn && inRow ? STAGE : inColumn ? STAGE_TINT : inRow ? SECOND : PAPER}
                        fillOpacity={inColumn && inRow ? 0.7 : inRow && !inColumn ? 0.22 : 1}
                        stroke={INK} strokeWidth={1.6} />
                )
            })}
            <rect x={left} y={top} width={size} height={size} fill="none" stroke={INK} strokeWidth={2.6} />
            <Frac x={left + cell.w} y={34} n={2} d={3} size={15} color={STAGE} />
            <Frac x={left - 30} y={top + cell.h * 1.5 + 4} n={3} d={4} size={15} color={SECOND} />
            <text x={400} y={120} fontSize={22} fontWeight={700} fill={INK}>
                <tspan>2</tspan><tspan dx={4}>·</tspan><tspan dx={4}>3</tspan><tspan dx={10}>=</tspan><tspan dx={10}>6</tspan>
            </text>
            <text x={400} y={150} fontSize={22} fontWeight={700} fill={INK}>
                <tspan>3</tspan><tspan dx={4}>·</tspan><tspan dx={4}>4</tspan><tspan dx={10}>=</tspan><tspan dx={6}>12</tspan>
            </text>
            <line x1={398} x2={476} y1={130} y2={130} stroke={INK} strokeWidth={2} />
            <text x={400} y={206} fontSize={16} fill={MUTED}>{pick(language, { eu: '12 laukitxotatik 6 kolore bietan:', es: '6 de las 12 casillas tienen los dos colores:', ar: '6 خانات من 12 ملوّنة باللونين:' })}</text>
            <text x={400} y={236} fontSize={20} fontWeight={700} fill={STAGE}>6/12 = 1/2</text>
        </Figure>
    )
}

/* ---------- 9. The square of a proper fraction ---------- */

export function PowerFigure({ language }: { language: UnitLanguage }) {
    const size = 240
    const left = 90
    const top = 62
    const cell = size / 3
    return (
        <Figure height={330} label={pick(language, { eu: '(2/3)² = 4/9 karratu baten azalera gisa', es: '(2/3)² = 4/9 como área de un cuadrado', ar: '(2/3)² = 4/9 على شكل مساحة مربع' })}>
            {Array.from({ length: 9 }, (_, index) => {
                const column = index % 3
                const row = Math.floor(index / 3)
                const inside = column < 2 && row < 2
                return <rect key={index} x={left + column * cell} y={top + row * cell} width={cell} height={cell} fill={inside ? STAGE_TINT : PAPER} stroke={INK} strokeWidth={1.6} />
            })}
            <rect x={left} y={top} width={cell * 2} height={cell * 2} fill="none" stroke={STAGE} strokeWidth={3.4} />
            <rect x={left} y={top} width={size} height={size} fill="none" stroke={INK} strokeWidth={2.6} />
            <Frac x={left + cell} y={34} n={2} d={3} size={15} color={STAGE} />
            <Frac x={left - 30} y={top + cell + 4} n={2} d={3} size={15} color={STAGE} />
            <text x={400} y={112} fontSize={16} fill={MUTED}>{pick(language, { eu: 'Aldea 2/3 duen karratua:', es: 'Cuadrado de lado 2/3:', ar: 'مربع طول ضلعه 2/3:' })}</text>
            <text x={400} y={146} fontSize={22} fontWeight={700} fill={STAGE}>(2/3)² = 4/9</text>
            <text x={400} y={196} fontSize={16} fill={MUTED}>{pick(language, { eu: 'Unitatearen 9 laukitxotatik 4:', es: '4 de las 9 casillas de la unidad:', ar: '4 من خانات الوحدة التسع:' })}</text>
            <text x={400} y={228} fontSize={20} fontWeight={700} fill={INK}>4/9 &lt; 2/3</text>
        </Figure>
    )
}

/* ---------- 10. Fraction of a quantity ---------- */

export function FractionOfFigure({ language }: { language: UnitLanguage }) {
    const left = 40
    const width = 640
    const part = width / 8
    const brace = (x1: number, x2: number, y: number, up: boolean) => {
        const tip = up ? y - 12 : y + 12
        const mid = (x1 + x2) / 2
        return `M${x1} ${y} Q ${x1} ${tip} ${x1 + 14} ${tip} L ${mid - 10} ${tip} Q ${mid} ${tip} ${mid} ${up ? tip - 10 : tip + 10} Q ${mid} ${tip} ${mid + 10} ${tip} L ${x2 - 14} ${tip} Q ${x2} ${tip} ${x2} ${y}`
    }
    return (
        <Figure height={220} label={pick(language, { eu: '120ren 3/8 = 45', es: '3/8 de 120 = 45', ar: '3/8 من 120 = 45' })}>
            <path d={brace(left, left + width, 52, true)} fill="none" stroke={INK} strokeWidth={2} />
            <text x={360} y={22} textAnchor="middle" fontSize={20} fontWeight={700} fill={INK}>120</text>
            <Bar x={left} y={62} width={width} height={50} parts={8} filled={3} labels={Array(8).fill('15')} />
            <path d={brace(left, left + part * 3, 122, false)} fill="none" stroke={STAGE} strokeWidth={2.4} />
            <text x={left + part * 1.5} y={168} textAnchor="middle" fontSize={20} fontWeight={700} fill={STAGE}>3 · 15 = 45</text>
            <Caption y={210}>{pick(language, { eu: '120 : 8 = 15 zati bakoitzean; 3 zati hartzen dira', es: '120 : 8 = 15 en cada parte; se toman 3 partes', ar: '120 : 8 = 15 في كل جزء، ونأخذ 3 أجزاء' })}</Caption>
        </Figure>
    )
}

/* ---------- 11. Fractions, decimals and percentages on one line ---------- */

export function PercentFigure({ language }: { language: UnitLanguage }) {
    const x = (value: number) => 200 + value * 480
    const marks = [
        { value: 0, n: 0, d: 1 },
        { value: 0.25, n: 1, d: 4 },
        { value: 0.375, n: 3, d: 8, highlight: true },
        { value: 0.5, n: 1, d: 2 },
        { value: 0.75, n: 3, d: 4 },
        { value: 1, n: 1, d: 1 }
    ]
    const rows = [
        { y: 46, label: { eu: 'Zatikia', es: 'Fracción', ar: 'كسر' } },
        { y: 136, label: { eu: 'Hamartarra', es: 'Decimal', ar: 'عدد عشري' } },
        { y: 172, label: { eu: 'Ehunekoa', es: 'Porcentaje', ar: 'نسبة مئوية' } }
    ]
    return (
        <Figure height={200} label={pick(language, { eu: 'Zatikiak, hamartarrak eta ehunekoak zuzen berean', es: 'Fracciones, decimales y porcentajes en la misma recta', ar: 'الكسور والأعداد العشرية والنسب المئوية على الخط نفسه' })}>
            {rows.map((row) => <text key={row.y} x={20} y={row.y + 6} fontSize={15} fontWeight={700} fill={MUTED}>{pick(language, row.label)}</text>)}
            <line x1={x(0) - 10} x2={x(1) + 10} y1={96} y2={96} stroke={INK} strokeWidth={2.4} />
            {marks.map((mark) => {
                const color = mark.highlight ? STAGE : INK
                return (
                    <g key={mark.value}>
                        <line x1={x(mark.value)} x2={x(mark.value)} y1={86} y2={106} stroke={color} strokeWidth={mark.highlight ? 3 : 2} />
                        {mark.highlight && <circle cx={x(mark.value)} cy={96} r={7} fill={STAGE} stroke={INK} strokeWidth={2} />}
                        {mark.d === 1
                            ? <text x={x(mark.value)} y={58} textAnchor="middle" fontSize={18} fontWeight={700} fill={color}>{mark.n}</text>
                            : <Frac x={x(mark.value)} y={52} n={mark.n} d={mark.d} size={16} color={color} />}
                        <text x={x(mark.value)} y={142} textAnchor="middle" fontSize={15} fontWeight={mark.highlight ? 700 : 400} fill={color}>{decimal(language, mark.value, 3)}</text>
                        <text x={x(mark.value)} y={178} textAnchor="middle" fontSize={15} fontWeight={mark.highlight ? 700 : 400} fill={color}>{percent(language, mark.value * 100)}</text>
                    </g>
                )
            })}
        </Figure>
    )
}

/* ---------- 12. Direct proportion on a double number line ---------- */

export function ProportionFigure({ language }: { language: UnitLanguage }) {
    const x = (count: number) => 180 + count * 96
    const topY = 60
    const bottomY = 140
    const highlighted = [1, 3, 5]
    return (
        <Figure height={220} label={pick(language, { eu: '3 koaderno 7,50 €; 5 koaderno 12,50 €', es: '3 cuadernos 7,50 €; 5 cuadernos 12,50 €', ar: '3 دفاتر بـ 7.50€ و5 دفاتر بـ 12.50€' })}>
            <text x={20} y={topY + 6} fontSize={15} fontWeight={700} fill={MUTED}>{pick(language, { eu: 'Koadernoak', es: 'Cuadernos', ar: 'دفاتر' })}</text>
            <text x={20} y={bottomY + 6} fontSize={15} fontWeight={700} fill={MUTED}>€</text>
            {[topY, bottomY].map((y) => <line key={y} x1={x(0) - 10} x2={x(5) + 20} y1={y} y2={y} stroke={INK} strokeWidth={2.4} />)}
            {[0, 1, 2, 3, 4, 5].map((count) => {
                const on = highlighted.includes(count)
                const color = on ? STAGE : INK
                return (
                    <g key={count}>
                        <line x1={x(count)} x2={x(count)} y1={topY - 9} y2={topY + 9} stroke={INK} strokeWidth={2} />
                        <line x1={x(count)} x2={x(count)} y1={bottomY - 9} y2={bottomY + 9} stroke={INK} strokeWidth={2} />
                        {on && <line x1={x(count)} x2={x(count)} y1={topY + 12} y2={bottomY - 12} stroke={STAGE} strokeWidth={2} strokeDasharray="5 5" />}
                        <text x={x(count)} y={topY - 16} textAnchor="middle" fontSize={17} fontWeight={on ? 700 : 400} fill={color}>{count}</text>
                        <text x={x(count)} y={bottomY + 30} textAnchor="middle" fontSize={16} fontWeight={on ? 700 : 400} fill={color}>{money(language, count * 2.5)}</text>
                    </g>
                )
            })}
            <Caption y={210}>{pick(language, {
                eu: '7,50 : 3 = 2,50 koaderno bakoitzeko; 5 · 2,50 = 12,50',
                es: '7,50 : 3 = 2,50 por cuaderno; 5 · 2,50 = 12,50',
                ar: '7.50 : 3 = 2.50 للدفتر الواحد؛ 5 · 2.50 = 12.50'
            })}</Caption>
        </Figure>
    )
}
