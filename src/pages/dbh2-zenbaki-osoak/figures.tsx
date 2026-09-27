import { pickText, type LocalizedText, type UnitLanguage } from '../../features/unit-v2/types'
import { signed } from './format'

/* ==========================================================================
   Zenbaki osoak · lesson figures, drawn as SVG in the notebook style
   ========================================================================== */

const INK = 'var(--ink, #1d2733)'
const MUTED = 'var(--muted, #58616e)'

type Tone = 'stage' | 'second' | 'ink'

const toneColor: Record<Tone, string> = {
    stage: 'var(--stage, #2f6fdb)',
    second: 'var(--second, #c4432a)',
    ink: INK
}

interface Point { value: number; tone?: Tone; label?: string }
interface Span { from: number; to: number; tone?: Tone; label?: string; row?: number }
interface Jump { from: number; to: number; tone?: Tone; label?: string; row?: number }

/**
 * A horizontal number line from `min` to `max` with optional points, distance
 * bars (spans, drawn above the line) and movements (jumps, drawn as arcs).
 */
export function NumberLine({
    min,
    max,
    points = [],
    spans = [],
    jumps = [],
    plusLabels = true,
    caption,
    braces = false,
    language
}: {
    min: number
    max: number
    points?: Point[]
    spans?: Span[]
    jumps?: Jump[]
    plusLabels?: boolean
    caption?: string
    /** Brace the negative and positive halves, as in the textbook */
    braces?: boolean
    language?: UnitLanguage
}) {
    const width = 720
    const margin = 36
    const rows = Math.max(0, ...spans.map((span) => (span.row ?? 0) + 1), ...jumps.map((jump) => (jump.row ?? 0) + 1))
    const top = 24 + rows * 34
    const lineY = top + 20
    const height = lineY + (braces ? 86 : 48) + (caption ? 26 : 0)
    const step = (width - margin * 2) / (max - min)
    const x = (value: number) => margin + (value - min) * step
    const ticks = Array.from({ length: max - min + 1 }, (_, index) => min + index)
    const l = (text: LocalizedText) => (language ? pickText(language, text) : text.es)

    return (
        <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label={caption ?? `${signed(min)} … ${signed(max)}`} className="integers-number-line">
            <defs>
                {(['stage', 'second', 'ink'] as Tone[]).map((tone) => (
                    <marker id={`integers-arrow-${tone}`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse" key={tone}>
                        <path d="M0 0 L10 5 L0 10 z" fill={toneColor[tone]} />
                    </marker>
                ))}
            </defs>

            {spans.map((span, index) => {
                const y = 22 + (span.row ?? 0) * 34
                const left = Math.min(x(span.from), x(span.to))
                return (
                    <g key={`span-${index}`}>
                        <rect x={left} y={y} width={Math.abs(x(span.to) - x(span.from))} height={12} rx={4} fill={toneColor[span.tone ?? 'stage']} opacity={0.28} stroke={toneColor[span.tone ?? 'stage']} strokeWidth={1.5} />
                        {span.label && <text x={(x(span.from) + x(span.to)) / 2} y={y - 5} textAnchor="middle" fontSize={16} fontWeight={700} fill={toneColor[span.tone ?? 'stage']}>{span.label}</text>}
                    </g>
                )
            })}

            {jumps.map((jump, index) => {
                const row = jump.row ?? 0
                const y = lineY - 6
                const lift = 30 + row * 30
                const x1 = x(jump.from)
                const x2 = x(jump.to)
                const tone = jump.tone ?? 'stage'
                return (
                    <g key={`jump-${index}`}>
                        <path d={`M${x1} ${y} C ${x1} ${y - lift}, ${x2} ${y - lift}, ${x2} ${y}`} fill="none" stroke={toneColor[tone]} strokeWidth={2.6} markerEnd={`url(#integers-arrow-${tone})`} />
                        {jump.label && <text x={(x1 + x2) / 2} y={y - lift * 0.78 - 4} textAnchor="middle" fontSize={16} fontWeight={700} fill={toneColor[tone]}>{jump.label}</text>}
                    </g>
                )
            })}

            <line x1={margin - 22} x2={width - margin + 22} y1={lineY} y2={lineY} stroke={INK} strokeWidth={2.4} markerStart="url(#integers-arrow-ink)" markerEnd="url(#integers-arrow-ink)" />
            {ticks.map((value) => (
                <g key={value}>
                    <line x1={x(value)} x2={x(value)} y1={lineY - (value === 0 ? 10 : 7)} y2={lineY + (value === 0 ? 10 : 7)} stroke={INK} strokeWidth={value === 0 ? 2.6 : 1.8} />
                    <text x={x(value)} y={lineY + 30} textAnchor="middle" fontSize={17} fontWeight={value === 0 ? 700 : 400} fill={INK}>{signed(value, plusLabels)}</text>
                </g>
            ))}

            {points.map((point, index) => (
                <g key={`point-${index}`}>
                    <circle cx={x(point.value)} cy={lineY} r={8} fill={toneColor[point.tone ?? 'stage']} stroke={INK} strokeWidth={2} />
                    {point.label && <text x={x(point.value)} y={lineY - 16} textAnchor="middle" fontSize={16} fontWeight={700} fill={toneColor[point.tone ?? 'stage']}>{point.label}</text>}
                </g>
            ))}

            {braces && min < 0 && max > 0 && (
                <g fontSize={15} fill={MUTED} textAnchor="middle">
                    <path d={`M${x(min)} ${lineY + 44} q0 10 10 10 H${x(-1) - 10} q10 0 10 10`} fill="none" stroke={MUTED} strokeWidth={1.5} />
                    <text x={(x(min) + x(-1)) / 2} y={lineY + 82}>{l({ eu: 'Zenbaki oso negatiboak', es: 'Enteros negativos', ar: 'الأعداد الصحيحة السالبة' })}</text>
                    <path d={`M${x(1)} ${lineY + 64} q0 -10 10 -10 H${x(max) - 10} q10 0 10 -10`} fill="none" stroke={MUTED} strokeWidth={1.5} />
                    <text x={(x(1) + x(max)) / 2} y={lineY + 82}>{l({ eu: 'Zenbaki oso positiboak', es: 'Enteros positivos', ar: 'الأعداد الصحيحة الموجبة' })}</text>
                </g>
            )}

            {caption && <text x={width / 2} y={height - 6} textAnchor="middle" fontSize={16} fill={MUTED}>{caption}</text>}
        </svg>
    )
}

/** Everyday negative numbers: a thermometer, a building with basements and sea level */
export function SituationsFigure({ language }: { language: UnitLanguage }) {
    const l = (text: LocalizedText) => pickText(language, text)
    const thermoY = (value: number) => 150 - value * 10
    return (
        <svg viewBox="0 0 720 300" role="img" aria-label={l({ eu: 'Termometroa, eraikina eta itsas maila', es: 'Termómetro, edificio y nivel del mar', ar: 'ميزان حرارة ومبنى ومستوى سطح البحر' })} className="integers-number-line">
            {/* Thermometer */}
            <g>
                <rect x={60} y={30} width={28} height={240} rx={14} fill="#fffcf6" stroke={INK} strokeWidth={2.2} />
                <rect x={66} y={thermoY(-8)} width={16} height={270 - thermoY(-8) - 12} rx={8} fill="var(--second, #c4432a)" />
                {[10, 5, 0, -5, -10].map((value) => (
                    <g key={value}>
                        <line x1={88} x2={100} y1={thermoY(value)} y2={thermoY(value)} stroke={INK} strokeWidth={value === 0 ? 2.4 : 1.6} />
                        <text x={106} y={thermoY(value) + 5} fontSize={15} fill={INK}>{signed(value)} °C</text>
                    </g>
                ))}
                <text x={74} y={thermoY(-8) + 5} textAnchor="end" dx={-18} fontSize={16} fontWeight={700} fill="var(--second, #c4432a)">−8</text>
                <text x={74} y={294} textAnchor="middle" fontSize={15} fill={MUTED}>{l({ eu: 'Zero azpitik', es: 'Bajo cero', ar: 'تحت الصفر' })}</text>
            </g>

            {/* Building */}
            <g transform="translate(250 0)">
                <line x1={-30} x2={210} y1={170} y2={170} stroke={INK} strokeWidth={2.4} />
                {[3, 2, 1, 0, -1, -2].map((floor) => {
                    const y = 170 - (floor + 1) * 34
                    const underground = floor < 0
                    return (
                        <g key={floor}>
                            <rect x={20} y={y} width={120} height={34} fill={underground ? '#efe7d6' : '#fffcf6'} stroke={INK} strokeWidth={1.8} />
                            <text x={80} y={y + 23} textAnchor="middle" fontSize={16} fontWeight={700} fill={floor === -2 ? 'var(--second, #c4432a)' : INK}>{signed(floor)}</text>
                        </g>
                    )
                })}
                <text x={146} y={192} fontSize={14} fill={MUTED}>{l({ eu: 'Beheko solairua', es: 'Planta baja', ar: 'الطابق الأرضي' })}</text>
                <text x={80} y={294} textAnchor="middle" fontSize={15} fill={MUTED}>{l({ eu: 'Sotoak', es: 'Sótanos', ar: 'الطوابق السفلية' })}</text>
            </g>

            {/* Sea level */}
            <g transform="translate(530 0)">
                <path d="M0 150 q20 -10 40 0 t40 0 t40 0 t40 0" fill="none" stroke="var(--stage, #2f6fdb)" strokeWidth={2.4} />
                <rect x={0} y={150} width={160} height={120} fill="var(--stage, #2f6fdb)" opacity={0.12} />
                <path d="M40 150 l20 -60 l20 60 z" fill="#fffcf6" stroke={INK} strokeWidth={2} />
                <text x={86} y={100} fontSize={15} fill={INK}>+12 m</text>
                <ellipse cx={60} cy={230} rx={30} ry={12} fill="#fffcf6" stroke={INK} strokeWidth={2} />
                <text x={96} y={236} fontSize={15} fontWeight={700} fill="var(--second, #c4432a)">−100 m</text>
                <text x={80} y={294} textAnchor="middle" fontSize={15} fill={MUTED}>{l({ eu: 'Itsas maila: 0', es: 'Nivel del mar: 0', ar: 'مستوى سطح البحر: 0' })}</text>
            </g>
        </svg>
    )
}

/** The rule of signs for products and quotients */
export function SignRuleFigure({ language }: { language: UnitLanguage }) {
    const l = (text: LocalizedText) => pickText(language, text)
    const rows: Array<[string, string, string]> = [['+', '+', '+'], ['−', '−', '+'], ['+', '−', '−'], ['−', '+', '−']]
    return (
        <svg viewBox="0 0 720 230" role="img" aria-label={l({ eu: 'Zeinuen araua', es: 'Regla de los signos', ar: 'قاعدة الإشارات' })} className="integers-number-line">
            {[{ op: '·', x: 70 }, { op: ':', x: 390 }].map((column) => (
                <g key={column.op}>
                    <text x={column.x + 130} y={26} textAnchor="middle" fontSize={17} fontWeight={700} fill={MUTED}>
                        {column.op === '·' ? l({ eu: 'Biderketa', es: 'Multiplicación', ar: 'الضرب' }) : l({ eu: 'Zatiketa', es: 'División', ar: 'القسمة' })}
                    </text>
                    {rows.map(([a, b, result], index) => {
                        const same = result === '+'
                        return (
                            <g key={index} transform={`translate(${column.x} ${44 + index * 44})`}>
                                <rect width={260} height={36} rx={10} fill={same ? 'var(--stage-tint, #dde7f7)' : 'var(--second-tint, #f8dcd0)'} stroke={INK} strokeWidth={1.6} />
                                <text x={130} y={25} textAnchor="middle" fontSize={21} fontWeight={700} fill={INK}>{`(${a})  ${column.op}  (${b})  =  (${result})`}</text>
                            </g>
                        )
                    })}
                </g>
            ))}
        </svg>
    )
}

/** Hero illustration of the unit: a thermometer, a number line with a movement and |−7| */
export function IntegersHeroArt() {
    const lineX = (value: number) => 60 + (value + 5) * 40
    return (
        <div className="fraction-v2-collage" aria-hidden="true">
            <svg className="integers-hero-art" viewBox="0 0 520 400">
                <defs>
                    <marker id="integers-hero-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                        <path d="M0 0 L10 5 L0 10 z" fill="#c4432a" />
                    </marker>
                </defs>
                {/* Number line card */}
                <g transform="translate(0 70)">
                    <rect x={30} y={130} width={460} height={110} rx={16} fill="#fffcf6" stroke={INK} strokeWidth={2} />
                    <line x1={50} x2={470} y1={196} y2={196} stroke={INK} strokeWidth={2.4} />
                    {Array.from({ length: 11 }, (_, index) => index - 5).map((value) => (
                        <g key={value}>
                            <line x1={lineX(value)} x2={lineX(value)} y1={value === 0 ? 186 : 190} y2={value === 0 ? 206 : 202} stroke={INK} strokeWidth={value === 0 ? 2.6 : 1.6} />
                            <text x={lineX(value)} y={226} textAnchor="middle" fontSize={14} fill={INK}>{signed(value)}</text>
                        </g>
                    ))}
                    <path d={`M${lineX(2)} 188 C ${lineX(2)} 146, ${lineX(-3)} 146, ${lineX(-3)} 188`} fill="none" stroke="#c4432a" strokeWidth={3} markerEnd="url(#integers-hero-arrow)" />
                    <text x={lineX(-0.5)} y={150} textAnchor="middle" fontSize={16} fontWeight={700} fill="#c4432a">−5</text>
                    <circle cx={lineX(-3)} cy={196} r={8} fill="#2f6fdb" stroke={INK} strokeWidth={2} />
                </g>
                {/* Thermometer sticker */}
                <g transform="translate(60 34) rotate(-5)">
                    <rect width={170} height={150} rx={16} fill="#fbebc0" stroke={INK} strokeWidth={2} />
                    <rect x={28} y={16} width={20} height={100} rx={10} fill="#fffcf6" stroke={INK} strokeWidth={2} />
                    <rect x={33} y={80} width={10} height={34} rx={5} fill="#c4432a" />
                    <circle cx={38} cy={122} r={14} fill="#c4432a" stroke={INK} strokeWidth={2} />
                    <line x1={48} x2={58} y1={60} y2={60} stroke={INK} strokeWidth={2} />
                    <text x={64} y={66} fontSize={13} fill={INK}>0 °C</text>
                    <text x={112} y={112} textAnchor="middle" fontSize={30} fontWeight={700} fill={INK} fontFamily="Fraunces, serif">−8°</text>
                </g>
                {/* Absolute value sticker */}
                <g transform="translate(300 40) rotate(4)">
                    <rect width={170} height={96} rx={16} fill="#e8e0f7" stroke={INK} strokeWidth={2} />
                    <text x={85} y={62} textAnchor="middle" fontSize={34} fontWeight={700} fill={INK} fontFamily="Fraunces, serif">|−7| = 7</text>
                </g>
                {/* Sign rule sticker */}
                <g transform="translate(330 330) rotate(-3)">
                    <rect width={170} height={56} rx={14} fill="#d6eddf" stroke={INK} strokeWidth={2} />
                    <text x={85} y={37} textAnchor="middle" fontSize={24} fontWeight={700} fill={INK} fontFamily="Fraunces, serif">(−)·(−) = +</text>
                </g>
            </svg>
        </div>
    )
}
