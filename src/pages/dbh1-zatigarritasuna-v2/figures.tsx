import { pickText, type LocalizedText, type UnitLanguage } from '../../features/unit-v2/types'
import { divisors, factorize } from '../dbh2-zatigarritasuna/math'

/* ==========================================================================
   Zatigarritasuna · 1. DBH — figures of their own (multiples on the line,
   divisor rectangles, the sieve, the factor ladder, the Venn diagram and
   the buses are shared with the 2. DBH unit)
   ========================================================================== */

const INK = 'var(--ink, #1d2733)'
const MUTED = 'var(--muted, #58616e)'
const STAGE = 'var(--stage, #2f6fdb)'
const STAGE_TINT = 'var(--stage-tint, #dde7f7)'
const SECOND = 'var(--second, #c4432a)'
const PAPER = '#fffcf6'

const pick = (language: UnitLanguage, text: LocalizedText) => pickText(language, text)

function Pencil({ x, y, color = STAGE }: { x: number; y: number; color?: string }) {
    return (
        <g transform={`translate(${x} ${y})`}>
            <rect x={0} y={8} width={10} height={30} rx={2} fill={color} stroke={INK} strokeWidth={1.4} />
            <path d="M0 8 L5 0 L10 8 z" fill="#f3d9a4" stroke={INK} strokeWidth={1.4} />
        </g>
    )
}

/**
 * 18 pencils in bags (Santillana): 3 bags of 6 leave nothing over, so 3 is a
 * divisor of 18; 4 bags of 4 leave 2 pencils over, so 4 is not.
 */
export function BagsFigure({ language }: { language: UnitLanguage }) {
    const bag = (x: number, width: number, count: number, perRow: number) => (
        <g key={x}>
            <rect x={x} y={40} width={width} height={96} rx={14} fill={STAGE_TINT} stroke={INK} strokeWidth={2} />
            {Array.from({ length: count }, (_, index) => (
                <Pencil key={index} x={x + 12 + (index % perRow) * 16} y={48 + Math.floor(index / perRow) * 42} />
            ))}
        </g>
    )
    return (
        <svg viewBox="0 0 630 220" role="img" aria-label={pick(language, { eu: '18 arkatz poltsetan: 3 poltsatan ez da ezer soberan geratzen; 4 poltsatan 2 geratzen dira', es: '18 lápices en bolsas: en 3 bolsas no sobra nada; en 4 bolsas sobran 2', ar: '18 قلمًا في أكياس: في 3 أكياس لا يبقى شيء، وفي 4 أكياس يبقى قلمان' })} className="divisibility-figure">
            <text x={145} y={24} textAnchor="middle" fontSize={16} fontWeight={700} fill={INK}>{pick(language, { eu: '3 poltsa', es: '3 bolsas', ar: '3 أكياس' })}</text>
            {[20, 110, 200].map((x) => bag(x, 70, 6, 3))}
            <text x={145} y={168} textAnchor="middle" fontSize={20} fontWeight={700} fill={INK}>18 : 3 = 6</text>
            <text x={145} y={194} textAnchor="middle" fontSize={15} fill={STAGE} fontWeight={700}>{pick(language, { eu: 'hondarra 0 ✓', es: 'resto 0 ✓', ar: 'الباقي 0 ✓' })}</text>

            <line x1={296} x2={296} y1={20} y2={200} stroke={MUTED} strokeWidth={1.4} strokeDasharray="5 6" />

            <text x={462} y={24} textAnchor="middle" fontSize={16} fontWeight={700} fill={INK}>{pick(language, { eu: '4 poltsa', es: '4 bolsas', ar: '4 أكياس' })}</text>
            {[320, 384, 448, 512].map((x) => bag(x, 56, 4, 2))}
            <Pencil x={582} y={56} color={SECOND} />
            <Pencil x={600} y={56} color={SECOND} />
            <text x={462} y={168} textAnchor="middle" fontSize={20} fontWeight={700} fill={INK}>18 : 4 = 4</text>
            <text x={462} y={194} textAnchor="middle" fontSize={15} fill={SECOND} fontWeight={700}>{pick(language, { eu: 'hondarra 2 ✗', es: 'resto 2 ✗', ar: 'الباقي 2 ✗' })}</text>
        </svg>
    )
}

/**
 * Divisors from the factorization, as in Santillana: the first row holds 1
 * and the powers of the first prime; each next row multiplies it by the next
 * power of the second prime. Works for numbers with one or two primes.
 */
export function DivisorTableFigure({ n = 36, language }: { n?: number; language: UnitLanguage }) {
    const factors = factorize(n)
    const [firstPrime, firstExponent] = factors[0]
    const [secondPrime, secondExponent] = factors[1] ?? [1, 0]
    const firstRow = Array.from({ length: firstExponent + 1 }, (_, power) => firstPrime ** power)
    const rows = Array.from({ length: secondExponent + 1 }, (_, power) => ({ factor: secondPrime ** power, values: firstRow.map((value) => value * secondPrime ** power) }))
    const cell = 64
    const left = 150
    const top = 20
    const width = Math.max(left + firstRow.length * cell + 40, 520)
    const height = top + rows.length * cell + 60
    const all = divisors(n)
    const caption = (name: string, separator: string) => `${name}(${n}) = {${all.join(separator)}}`
    return (
        <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label={pick(language, { eu: `${n}ren zatitzaileen taula`, es: `Tabla de los divisores de ${n}`, ar: `جدول قواسم ${n}` })} className="divisibility-figure">
            {rows.map((row, rowIndex) => (
                <g key={row.factor}>
                    <text x={left - 18} y={top + rowIndex * cell + 40} textAnchor="end" fontSize={17} fontWeight={700} fill={rowIndex === 0 ? MUTED : SECOND}>{rowIndex === 0 ? '' : `· ${row.factor}`}</text>
                    {row.values.map((value, columnIndex) => (
                        <g key={value}>
                            <rect x={left + columnIndex * cell} y={top + rowIndex * cell} width={cell - 8} height={cell - 8} rx={10} fill={rowIndex === 0 ? STAGE_TINT : PAPER} stroke={INK} strokeWidth={rowIndex === 0 ? 2 : 1.6} />
                            <text x={left + columnIndex * cell + (cell - 8) / 2} y={top + rowIndex * cell + 36} textAnchor="middle" fontSize={21} fontWeight={700} fill={INK}>{value}</text>
                        </g>
                    ))}
                </g>
            ))}
            <text x={left - 18} y={top + 40} textAnchor="end" fontSize={15} fill={STAGE} fontWeight={700}>
                {firstExponent > 1 ? `1, ${firstPrime}…${firstPrime}${firstExponent === 2 ? '²' : firstExponent === 3 ? '³' : ''}` : `1, ${firstPrime}`}
            </text>
            <text x={width / 2} y={height - 16} textAnchor="middle" fontSize={16} fontWeight={700} fill={INK}>
                {pick(language, { eu: caption('Zat', ', '), es: caption('Div', ', '), ar: caption('Zat', '، ') })}
            </text>
        </svg>
    )
}

/**
 * Santillana's swimming pool: Ana goes every 2 days and Eva every 3. The days
 * both go are the common multiples; the first one is the lcm.
 */
export function PoolCalendarFigure({ language }: { language: UnitLanguage }) {
    const days = 20
    const cell = 32
    const left = 90
    const rows = [
        { every: 2, y: 40, fill: STAGE_TINT, dot: STAGE, name: 'Ana' },
        { every: 3, y: 100, fill: 'var(--second-tint, #f8dcd0)', dot: SECOND, name: 'Eva' }
    ]
    const x = (day: number) => left + (day - 1) * cell
    return (
        <svg viewBox="0 0 740 230" role="img" aria-label={pick(language, { eu: 'Ana 2 egunean behin eta Eva 3 egunean behin: 6., 12. eta 18. egunetan bat egiten dute', es: 'Ana va cada 2 días y Eva cada 3: coinciden los días 6, 12 y 18', ar: 'آنا تذهب كل يومين وإيفا كل 3 أيام: تلتقيان في الأيام 6 و12 و18' })} className="divisibility-figure">
            {[6, 12, 18].map((day) => (
                <rect key={day} x={x(day) - 4} y={30} width={cell} height={112} rx={10} fill="var(--mustard-tint, #fbebc0)" stroke={INK} strokeWidth={1.6} />
            ))}
            {rows.map((row) => (
                <g key={row.name}>
                    <text x={left - 14} y={row.y + 22} textAnchor="end" fontSize={17} fontWeight={700} fill={row.dot}>{row.name}</text>
                    {Array.from({ length: days }, (_, index) => index + 1).map((day) => {
                        const goes = day % row.every === 0
                        return (
                            <g key={day}>
                                <rect x={x(day)} y={row.y} width={cell - 8} height={32} rx={6} fill={goes ? row.fill : PAPER} stroke={goes ? INK : MUTED} strokeWidth={goes ? 1.8 : 1} />
                                {goes && <circle cx={x(day) + (cell - 8) / 2} cy={row.y + 16} r={6} fill={row.dot} stroke={INK} strokeWidth={1.4} />}
                            </g>
                        )
                    })}
                </g>
            ))}
            {Array.from({ length: days }, (_, index) => index + 1).map((day) => (
                <text key={day} x={x(day) + (cell - 8) / 2} y={166} textAnchor="middle" fontSize={13} fontWeight={day % 6 === 0 ? 700 : 400} fill={day % 6 === 0 ? INK : MUTED}>{day}</text>
            ))}
            <text x={370} y={204} textAnchor="middle" fontSize={16} fontWeight={700} fill={INK}>
                {pick(language, { eu: '6, 12, 18… 2ren eta 3ren multiplo komunak → MKT(2, 3) = 6', es: '6, 12, 18… múltiplos comunes de 2 y 3 → m.c.m.(2, 3) = 6', ar: '6، 12، 18… مضاعفات مشتركة لـ 2 و3 ← م.م.أ(2، 3) = 6' })}
            </text>
        </svg>
    )
}

/** Hero illustration: pencils in bags, the divisor table of 36 and a few multiples */
export function DivisibilityIntroHeroArt() {
    return (
        <div className="fraction-v2-collage" aria-hidden="true">
            <svg className="divisibility-hero-art" viewBox="0 0 520 400">
                {/* Bags card */}
                <g transform="translate(36 40) rotate(-4)">
                    <rect width={210} height={200} rx={16} fill={PAPER} stroke={INK} strokeWidth={2} />
                    {[18, 80, 142].map((x) => (
                        <g key={x}>
                            <rect x={x} y={30} width={52} height={96} rx={12} fill="#dde7f7" stroke={INK} strokeWidth={2} />
                            {Array.from({ length: 6 }, (_, index) => (
                                <rect key={index} x={x + 8 + (index % 3) * 13} y={40 + Math.floor(index / 3) * 40} width={9} height={30} rx={2} fill="#2f6fdb" stroke={INK} strokeWidth={1.2} />
                            ))}
                        </g>
                    ))}
                    <text x={105} y={172} textAnchor="middle" fontSize={26} fontWeight={700} fill={INK} fontFamily="Fraunces, serif">18 : 3 = 6</text>
                </g>
                {/* Factorization sticker (same in every language) */}
                <g transform="translate(284 52) rotate(4)">
                    <rect width={196} height={92} rx={16} fill="#e8e0f7" stroke={INK} strokeWidth={2} />
                    <text x={98} y={58} textAnchor="middle" fontSize={28} fontWeight={700} fill={INK} fontFamily="Fraunces, serif">36 = 2²·3²</text>
                </g>
                {/* Prime sticker */}
                <g transform="translate(300 176) rotate(-3)">
                    <rect width={176} height={88} rx={16} fill="#fbebc0" stroke={INK} strokeWidth={2} />
                    <text x={88} y={56} textAnchor="middle" fontSize={26} fontWeight={700} fill={INK} fontFamily="Fraunces, serif">2, 3, 5, 7, 11</text>
                </g>
                {/* Multiples strip */}
                <g transform="translate(40 300)">
                    <rect width={440} height={70} rx={16} fill="#d6eddf" stroke={INK} strokeWidth={2} />
                    {[2, 4, 6, 8, 10, 12].map((value, index) => (
                        <g key={value}>
                            <circle cx={40 + index * 72} cy={35} r={22} fill={value % 3 === 0 ? '#fbebc0' : PAPER} stroke={INK} strokeWidth={2} />
                            <text x={40 + index * 72} y={43} textAnchor="middle" fontSize={20} fontWeight={700} fill={INK}>{value}</text>
                        </g>
                    ))}
                </g>
            </svg>
        </div>
    )
}
