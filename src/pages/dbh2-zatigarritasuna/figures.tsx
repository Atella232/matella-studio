import { pickText, type LocalizedText, type UnitLanguage } from '../../features/unit-v2/types'

/* ==========================================================================
   Zatigarritasuna · lesson figures, drawn as SVG in the notebook style
   ========================================================================== */

const INK = 'var(--ink, #1d2733)'
const MUTED = 'var(--muted, #58616e)'
const STAGE = 'var(--stage, #2f6fdb)'
const STAGE_TINT = 'var(--stage-tint, #dde7f7)'
const SECOND = 'var(--second, #c4432a)'
const PAPER = '#fffcf6'

const pick = (language: UnitLanguage, text: LocalizedText) => pickText(language, text)

/** Jumps of the same size from 0: the landing points are the multiples */
export function MultiplesFigure({ step = 3, max = 24, language }: { step?: number; max?: number; language: UnitLanguage }) {
    const width = 720
    const margin = 30
    const unit = (width - margin * 2) / max
    const x = (value: number) => margin + value * unit
    const lineY = 110
    const jumps = Array.from({ length: Math.floor(max / step) }, (_, index) => index * step)
    return (
        <svg viewBox={`0 0 ${width} 170`} role="img" aria-label={pick(language, { eu: `${step}ren multiploak zuzenean`, es: `Múltiplos de ${step} en la recta`, ar: `مضاعفات ${step} على خط الأعداد` })} className="divisibility-figure">
            <defs>
                <marker id="divisibility-jump" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
                    <path d="M0 0 L10 5 L0 10 z" fill={STAGE} />
                </marker>
            </defs>
            {jumps.map((from) => (
                <path key={from} d={`M${x(from)} ${lineY - 6} C ${x(from)} ${lineY - 50}, ${x(from + step)} ${lineY - 50}, ${x(from + step)} ${lineY - 6}`} fill="none" stroke={STAGE} strokeWidth={2.6} markerEnd="url(#divisibility-jump)" />
            ))}
            {jumps.map((from) => <text key={`label-${from}`} x={(x(from) + x(from + step)) / 2} y={lineY - 46} textAnchor="middle" fontSize={14} fontWeight={700} fill={STAGE}>+{step}</text>)}
            <line x1={margin - 12} x2={width - margin + 12} y1={lineY} y2={lineY} stroke={INK} strokeWidth={2.4} />
            {Array.from({ length: max + 1 }, (_, value) => {
                const isMultiple = value % step === 0
                return (
                    <g key={value}>
                        <line x1={x(value)} x2={x(value)} y1={lineY - (isMultiple ? 9 : 6)} y2={lineY + (isMultiple ? 9 : 6)} stroke={INK} strokeWidth={isMultiple ? 2.4 : 1.4} />
                        {isMultiple && value > 0 && <circle cx={x(value)} cy={lineY} r={7} fill={STAGE} stroke={INK} strokeWidth={2} />}
                        <text x={x(value)} y={lineY + 30} textAnchor="middle" fontSize={isMultiple ? 16 : 12} fontWeight={isMultiple ? 700 : 400} fill={isMultiple ? INK : MUTED}>{value}</text>
                    </g>
                )
            })}
            <text x={width / 2} y={164} textAnchor="middle" fontSize={15} fill={MUTED}>
                {pick(language, { eu: `M(${step}) = {${step}, ${step * 2}, ${step * 3}, …}: ez dute amaierarik`, es: `Múltiplos de ${step}: {${step}, ${step * 2}, ${step * 3}, …}, no se acaban nunca`, ar: `مضاعفات ${step}: {${step}، ${step * 2}، ${step * 3}، …} لا نهاية لها` })}
            </text>
        </svg>
    )
}

/** Every rectangle that can be built with n squares gives a pair of divisors */
export function DivisorRectanglesFigure({ n = 12, language }: { n?: number; language: UnitLanguage }) {
    const pairs: Array<[number, number]> = []
    for (let rows = 1; rows * rows <= n; rows += 1) if (n % rows === 0) pairs.push([rows, n / rows])
    const cell = 22
    let offset = 20
    const blocks = pairs.map(([rows, columns]) => {
        const block = { rows, columns, x: offset }
        offset += columns * cell + 36
        return block
    })
    const width = Math.max(offset, 480)
    const labelY = 30 + Math.max(...pairs.map(([rows]) => rows)) * cell + 26
    return (
        <svg viewBox={`0 0 ${width} 200`} role="img" aria-label={pick(language, { eu: `${n} karratuekin egin daitezkeen laukizuzenak`, es: `Rectángulos que se pueden formar con ${n} cuadrados`, ar: `المستطيلات التي يمكن تكوينها من ${n} مربعًا` })} className="divisibility-figure">
            {blocks.map(({ rows, columns, x }) => (
                <g key={`${rows}x${columns}`}>
                    {Array.from({ length: rows * columns }, (_, index) => (
                        <rect key={index} x={x + (index % columns) * cell} y={30 + Math.floor(index / columns) * cell} width={cell - 3} height={cell - 3} rx={4} fill={STAGE_TINT} stroke={INK} strokeWidth={1.6} />
                    ))}
                    <text x={x + (columns * cell) / 2} y={labelY} textAnchor="middle" fontSize={17} fontWeight={700} fill={INK}>{rows} · {columns}</text>
                </g>
            ))}
            <text x={width / 2} y={190} textAnchor="middle" fontSize={15} fill={MUTED}>
                {pick(language, { eu: `Zat(${n}) = {${[...pairs.map(([a]) => a), ...pairs.map(([, b]) => b).reverse()].filter((value, index, list) => list.indexOf(value) === index).join(', ')}}`, es: `Div(${n}) = {${[...pairs.map(([a]) => a), ...pairs.map(([, b]) => b).reverse()].filter((value, index, list) => list.indexOf(value) === index).join(', ')}}`, ar: `قواسم ${n} = {${[...pairs.map(([a]) => a), ...pairs.map(([, b]) => b).reverse()].filter((value, index, list) => list.indexOf(value) === index).join('، ')}}` })}
            </text>
        </svg>
    )
}

const isPrime = (value: number) => {
    if (value < 2) return false
    for (let divisor = 2; divisor * divisor <= value; divisor += 1) if (value % divisor === 0) return false
    return true
}

/** Sieve of Eratosthenes from 1 to 50: primes stay, their multiples are crossed out */
export function SieveFigure({ language }: { language: UnitLanguage }) {
    const cell = 58
    return (
        <svg viewBox="0 0 600 340" role="img" aria-label={pick(language, { eu: 'Eratostenesen bahea 50 arte', es: 'Criba de Eratóstenes hasta 50', ar: 'غربال إراتوستينس حتى 50' })} className="divisibility-figure">
            {Array.from({ length: 50 }, (_, index) => {
                const value = index + 1
                const x = 10 + (index % 10) * cell
                const y = 10 + Math.floor(index / 10) * cell
                const prime = isPrime(value)
                return (
                    <g key={value}>
                        <rect x={x} y={y} width={cell - 6} height={cell - 6} rx={8} fill={prime ? STAGE_TINT : PAPER} stroke={prime ? INK : MUTED} strokeWidth={prime ? 2.2 : 1.2} />
                        <text x={x + (cell - 6) / 2} y={y + 34} textAnchor="middle" fontSize={20} fontWeight={prime ? 700 : 400} fill={prime ? INK : MUTED}>{value}</text>
                        {!prime && value > 1 && <line x1={x + 10} y1={y + cell - 16} x2={x + cell - 16} y2={y + 10} stroke={SECOND} strokeWidth={2} opacity={0.7} />}
                    </g>
                )
            })}
            <text x={300} y={332} textAnchor="middle" fontSize={15} fill={MUTED}>
                {pick(language, { eu: 'Koloreztatuak: zenbaki lehenak. Ratatuak: konposatuak. 1 ez da ez lehena ez konposatua.', es: 'En color: primos. Tachados: compuestos. El 1 no es ni primo ni compuesto.', ar: 'الملوّنة: أعداد أولية. المشطوبة: مؤلفة. العدد 1 ليس أوليًا ولا مؤلفًا.' })}
            </text>
        </svg>
    )
}

/** Dividing by primes, as in class: the number on the left, the prime on the right */
export function FactorLadderFigure({ n = 360, language }: { n?: number; language: UnitLanguage }) {
    const steps: Array<[number, number]> = []
    let rest = n
    for (let prime = 2; rest > 1;) {
        if (rest % prime === 0) {
            steps.push([rest, prime])
            rest /= prime
        } else {
            prime += 1
        }
    }
    const rowHeight = 32
    const height = (steps.length + 1) * rowHeight + 60
    const counts = steps.reduce<Record<number, number>>((all, [, prime]) => ({ ...all, [prime]: (all[prime] ?? 0) + 1 }), {})
    const result = Object.entries(counts).map(([prime, count]) => (count > 1 ? `${prime}^${count}` : prime))
    return (
        <svg viewBox={`0 0 520 ${height}`} role="img" aria-label={pick(language, { eu: `${n} biderkagai lehenetan deskonposatzea`, es: `Descomposición de ${n} en factores primos`, ar: `تحليل ${n} إلى عوامل أولية` })} className="divisibility-figure">
            <line x1={150} x2={150} y1={10} y2={10 + (steps.length + 1) * rowHeight - 8} stroke={INK} strokeWidth={2.4} />
            {[...steps, [1, 0] as [number, number]].map(([value, prime], index) => (
                <g key={index}>
                    <text x={136} y={34 + index * rowHeight} textAnchor="end" fontSize={20} fontWeight={700} fill={INK}>{value}</text>
                    {prime > 0 && <text x={166} y={34 + index * rowHeight} fontSize={20} fontWeight={700} fill={STAGE}>{prime}</text>}
                </g>
            ))}
            <g transform={`translate(230 ${height / 2 - 40})`}>
                <rect width={270} height={70} rx={14} fill={STAGE_TINT} stroke={INK} strokeWidth={2} />
                <text x={135} y={44} textAnchor="middle" fontSize={24} fontWeight={700} fill={INK}>
                    {n} = {result.map((factor, index) => {
                        const [base, exponent] = factor.split('^')
                        return (
                            <tspan key={factor}>
                                {index > 0 ? ' · ' : ''}{base}{exponent && <tspan dy={-10} fontSize={15}>{exponent}</tspan>}{exponent && <tspan dy={10}> </tspan>}
                            </tspan>
                        )
                    })}
                </text>
            </g>
            <text x={260} y={height - 12} textAnchor="middle" fontSize={15} fill={MUTED}>
                {pick(language, { eu: 'Zatitu zenbaki lehenez, txikienetik hasita, 1 lortu arte.', es: 'Divide entre primos, empezando por el menor, hasta llegar a 1.', ar: 'اقسم على أعداد أولية بدءًا بالأصغر حتى تصل إلى 1.' })}
            </text>
        </svg>
    )
}

/**
 * Two factorizations in a Venn diagram: the shared factors give the ZKH (gcd),
 * all the factors together give the MKT (lcm).
 */
export function VennFigure({ language }: { language: UnitLanguage }) {
    // 12 = 2 · 2 · 3 and 18 = 2 · 3 · 3
    return (
        <svg viewBox="0 0 640 300" role="img" aria-label={pick(language, { eu: '12 eta 18ren biderkagai lehenak Venn diagraman', es: 'Factores primos de 12 y 18 en un diagrama de Venn', ar: 'العوامل الأولية للعددين 12 و18 في مخطط فن' })} className="divisibility-figure">
            <circle cx={250} cy={140} r={115} fill={STAGE_TINT} fillOpacity={0.65} stroke={INK} strokeWidth={2.2} />
            <circle cx={390} cy={140} r={115} fill="var(--second-tint, #f8dcd0)" fillOpacity={0.65} stroke={INK} strokeWidth={2.2} />
            <text x={190} y={28} textAnchor="middle" fontSize={20} fontWeight={700} fill={INK}>12 = 2² · 3</text>
            <text x={450} y={28} textAnchor="middle" fontSize={20} fontWeight={700} fill={INK}>18 = 2 · 3²</text>
            <text x={195} y={150} textAnchor="middle" fontSize={30} fontWeight={700} fill={INK}>2</text>
            <text x={320} y={125} textAnchor="middle" fontSize={30} fontWeight={700} fill={INK}>2</text>
            <text x={320} y={170} textAnchor="middle" fontSize={30} fontWeight={700} fill={INK}>3</text>
            <text x={445} y={150} textAnchor="middle" fontSize={30} fontWeight={700} fill={INK}>3</text>
            <text x={320} y={278} textAnchor="middle" fontSize={17} fontWeight={700} fill={INK}>
                {pick(language, { eu: 'Erdian: ZKH = 2 · 3 = 6   ·   Denak: MKT = 2 · 2 · 3 · 3 = 36', es: 'En el centro: m.c.d. = 2 · 3 = 6   ·   Todos: m.c.m. = 2 · 2 · 3 · 3 = 36', ar: 'في الوسط: ق.م.أ = 2 · 3 = 6   ·   الكل: م.م.أ = 2 · 2 · 3 · 3 = 36' })}
            </text>
        </svg>
    )
}

/** Two buses leave together every 4 and 6 minutes: they meet again at the lcm */
export function CoincidenceFigure({ language }: { language: UnitLanguage }) {
    const max = 24
    const x = (value: number) => 40 + value * 26
    const rows = [
        { every: 4, y: 70, color: STAGE, label: { eu: 'A autobusa: 4 min', es: 'Autobús A: cada 4 min', ar: 'الحافلة أ: كل 4 دقائق' } },
        { every: 6, y: 150, color: SECOND, label: { eu: 'B autobusa: 6 min', es: 'Autobús B: cada 6 min', ar: 'الحافلة ب: كل 6 دقائق' } }
    ]
    return (
        <svg viewBox="0 0 720 250" role="img" aria-label={pick(language, { eu: 'Bi autobus 12 eta 24 minututan batera irteten dira', es: 'Dos autobuses coinciden a los 12 y 24 minutos', ar: 'حافلتان تلتقيان بعد 12 و24 دقيقة' })} className="divisibility-figure">
            {[12, 24].map((meet) => (
                <g key={meet}>
                    <rect x={x(meet) - 16} y={34} width={32} height={150} rx={10} fill="var(--mustard-tint, #fbebc0)" stroke={INK} strokeWidth={1.6} />
                </g>
            ))}
            {rows.map((row) => (
                <g key={row.every}>
                    <text x={40} y={row.y - 22} fontSize={15} fontWeight={700} fill={row.color}>{pick(language, row.label)}</text>
                    <line x1={x(0)} x2={x(max)} y1={row.y} y2={row.y} stroke={INK} strokeWidth={2} />
                    {Array.from({ length: max / row.every + 1 }, (_, index) => index * row.every).map((minute) => (
                        <circle key={minute} cx={x(minute)} cy={row.y} r={8} fill={row.color} stroke={INK} strokeWidth={2} />
                    ))}
                </g>
            ))}
            {Array.from({ length: max + 1 }, (_, minute) => minute).filter((minute) => minute % 2 === 0).map((minute) => (
                <text key={minute} x={x(minute)} y={206} textAnchor="middle" fontSize={14} fill={minute % 12 === 0 ? INK : MUTED} fontWeight={minute % 12 === 0 ? 700 : 400}>{minute}</text>
            ))}
            <text x={360} y={238} textAnchor="middle" fontSize={16} fontWeight={700} fill={INK}>
                {pick(language, { eu: 'Berriz batera: 12 minututan → MKT(4, 6) = 12', es: 'Vuelven a coincidir a los 12 minutos → m.c.m.(4, 6) = 12', ar: 'تلتقيان مجددًا بعد 12 دقيقة ← م.م.أ(4، 6) = 12' })}
            </text>
        </svg>
    )
}

/** Hero illustration: a factor ladder, the ZKH sticker and a few multiples */
export function DivisibilityHeroArt() {
    return (
        <div className="fraction-v2-collage" aria-hidden="true">
            <svg className="divisibility-hero-art" viewBox="0 0 520 400">
                {/* Factor ladder card */}
                <g transform="translate(40 40) rotate(-4)">
                    <rect width={190} height={210} rx={16} fill={PAPER} stroke={INK} strokeWidth={2} />
                    <line x1={100} x2={100} y1={24} y2={190} stroke={INK} strokeWidth={2.4} />
                    {[['60', '2'], ['30', '2'], ['15', '3'], ['5', '5'], ['1', '']].map(([value, prime], index) => (
                        <g key={value}>
                            <text x={86} y={52 + index * 34} textAnchor="end" fontSize={22} fontWeight={700} fill={INK}>{value}</text>
                            <text x={114} y={52 + index * 34} fontSize={22} fontWeight={700} fill="#2f6fdb">{prime}</text>
                        </g>
                    ))}
                </g>
                {/* Factorization sticker (same in every language) */}
                <g transform="translate(280 50) rotate(4)">
                    <rect width={200} height={96} rx={16} fill="#e8e0f7" stroke={INK} strokeWidth={2} />
                    <text x={100} y={60} textAnchor="middle" fontSize={28} fontWeight={700} fill={INK} fontFamily="Fraunces, serif">60 = 2²·3·5</text>
                </g>
                {/* Divisors sticker */}
                <g transform="translate(300 175) rotate(-3)">
                    <rect width={180} height={90} rx={16} fill="#fbebc0" stroke={INK} strokeWidth={2} />
                    <text x={90} y={57} textAnchor="middle" fontSize={28} fontWeight={700} fill={INK} fontFamily="Fraunces, serif">24 : 6 = 4</text>
                </g>
                {/* Multiples strip */}
                <g transform="translate(40 300)">
                    <rect width={440} height={70} rx={16} fill="#d6eddf" stroke={INK} strokeWidth={2} />
                    {[3, 6, 9, 12, 15, 18].map((value, index) => (
                        <g key={value}>
                            <circle cx={40 + index * 72} cy={35} r={22} fill={PAPER} stroke={INK} strokeWidth={2} />
                            <text x={40 + index * 72} y={43} textAnchor="middle" fontSize={20} fontWeight={700} fill={INK}>{value}</text>
                        </g>
                    ))}
                </g>
            </svg>
        </div>
    )
}
