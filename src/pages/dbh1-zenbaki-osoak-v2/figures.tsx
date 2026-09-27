import { pickText, type LocalizedText, type UnitLanguage } from '../../features/unit-v2/types'
import { signed } from '../dbh2-zenbaki-osoak/format'

/* ==========================================================================
   Zenbaki osoak · 1. DBH — figures of their own (the number line, the
   situations and the sign rule are shared with the 2. DBH unit)
   ========================================================================== */

const INK = 'var(--ink, #1d2733)'
const MUTED = 'var(--muted, #58616e)'
const STAGE = 'var(--stage, #2f6fdb)'
const SECOND = 'var(--second, #c4432a)'
const PAPER = '#fffcf6'

const pick = (language: UnitLanguage, text: LocalizedText) => pickText(language, text)

/** Lift buttons of a building with 7 floors, the ground floor and 4 car parks (Santillana) */
export function ElevatorFigure({ language }: { language: UnitLanguage }) {
    const floors = [7, 6, 5, 4, 3, 2, 1, 0, -1, -2, -3, -4]
    const row = 22
    return (
        <svg viewBox="0 0 720 320" role="img" aria-label={pick(language, { eu: 'Igogailuaren botoiak', es: 'Botones del ascensor', ar: 'أزرار المصعد' })} className="integers-number-line">
            {/* Building section */}
            <g transform="translate(70 20)">
                {floors.map((floor, index) => (
                    <g key={floor}>
                        <rect x={0} y={index * row} width={170} height={row} fill={floor < 0 ? '#efe7d6' : floor === 0 ? 'var(--stage-tint, #dde7f7)' : PAPER} stroke={INK} strokeWidth={1.4} />
                        <text x={85} y={index * row + 16} textAnchor="middle" fontSize={13} fill={floor < 0 ? SECOND : INK}>
                            {floor === 0 ? pick(language, { eu: 'Beheko solairua', es: 'Planta baja', ar: 'الطابق الأرضي' }) : floor < 0 ? pick(language, { eu: `${-floor}. sotoa`, es: `Sótano ${-floor}`, ar: `القبو ${-floor}` }) : pick(language, { eu: `${floor}. solairua`, es: `Planta ${floor}`, ar: `الطابق ${floor}` })}
                        </text>
                    </g>
                ))}
                <line x1={-20} x2={190} y1={8 * row} y2={8 * row} stroke={INK} strokeWidth={3} />
                <text x={-26} y={8 * row + 5} textAnchor="end" fontSize={13} fill={MUTED}>{pick(language, { eu: 'kalea', es: 'calle', ar: 'الشارع' })}</text>
            </g>
            {/* Lift panel */}
            <g transform="translate(360 20)">
                <rect x={0} y={0} width={220} height={280} rx={18} fill={PAPER} stroke={INK} strokeWidth={2.2} />
                {floors.map((floor, index) => {
                    const column = index % 3
                    const line = Math.floor(index / 3)
                    const cx = 45 + column * 65
                    const cy = 45 + line * 62
                    return (
                        <g key={floor}>
                            <circle cx={cx} cy={cy} r={24} fill={floor < 0 ? '#f6d9cf' : floor === 0 ? 'var(--stage-tint, #dde7f7)' : PAPER} stroke={INK} strokeWidth={2} />
                            <text x={cx} y={cy + 7} textAnchor="middle" fontSize={20} fontWeight={700} fill={floor < 0 ? SECOND : INK}>{signed(floor)}</text>
                        </g>
                    )
                })}
            </g>
            <text x={660} y={60} textAnchor="middle" fontSize={15} fontWeight={700} fill={STAGE}>+</text>
            <text x={660} y={80} textAnchor="middle" fontSize={12} fill={MUTED}>{pick(language, { eu: 'gora', es: 'arriba', ar: 'أعلى' })}</text>
            <text x={660} y={270} textAnchor="middle" fontSize={15} fontWeight={700} fill={SECOND}>−</text>
            <text x={660} y={290} textAnchor="middle" fontSize={12} fill={MUTED}>{pick(language, { eu: 'behera', es: 'abajo', ar: 'أسفل' })}</text>
        </svg>
    )
}

/** Having and owing: +1 counters and −1 counters cancel in pairs */
export function CountersFigure({ language, have = 5, owe = 3 }: { language: UnitLanguage; have?: number; owe?: number }) {
    const pairs = Math.min(have, owe)
    const result = have - owe
    const counter = (x: number, y: number, positive: boolean, crossed: boolean, key: string) => (
        <g key={key}>
            <circle cx={x} cy={y} r={20} fill={positive ? 'var(--stage-tint, #dde7f7)' : '#f6d9cf'} stroke={positive ? STAGE : SECOND} strokeWidth={2.4} opacity={crossed ? 0.45 : 1} />
            <text x={x} y={y + 7} textAnchor="middle" fontSize={20} fontWeight={700} fill={positive ? STAGE : SECOND} opacity={crossed ? 0.45 : 1}>{positive ? '+' : '−'}</text>
            {crossed && <line x1={x - 22} y1={y + 22} x2={x + 22} y2={y - 22} stroke={INK} strokeWidth={2} />}
        </g>
    )
    return (
        <svg viewBox="0 0 720 260" role="img" aria-label={`(${signed(have)}) + (${signed(-owe)}) = ${signed(result)}`} className="integers-number-line">
            <text x={60} y={36} fontSize={16} fontWeight={700} fill={STAGE}>{pick(language, { eu: `Daukat: ${have} €`, es: `Tengo: ${have} €`, ar: `لديّ: ${have} €` })}</text>
            {Array.from({ length: have }, (_, index) => counter(80 + index * 56, 76, true, index < pairs, `p${index}`))}
            <text x={60} y={136} fontSize={16} fontWeight={700} fill={SECOND}>{pick(language, { eu: `Zor dut: ${owe} €`, es: `Debo: ${owe} €`, ar: `عليّ: ${owe} €` })}</text>
            {Array.from({ length: owe }, (_, index) => counter(80 + index * 56, 176, false, index < pairs, `n${index}`))}
            {Array.from({ length: pairs }, (_, index) => (
                <line key={index} x1={80 + index * 56} x2={80 + index * 56} y1={98} y2={154} stroke={MUTED} strokeWidth={1.6} strokeDasharray="4 4" />
            ))}
            <text x={360} y={242} textAnchor="middle" fontSize={17} fill={INK}>
                {pick(language, {
                    eu: `(${signed(have)}) + (${signed(-owe)}) = ${signed(result)}: bikote bakoitza (+1 eta −1) zero da.`,
                    es: `(${signed(have)}) + (${signed(-owe)}) = ${signed(result)}: cada pareja (+1 y −1) vale cero.`,
                    ar: `(${signed(have)}) + (${signed(-owe)}) = ${signed(result)}: كل زوج (+1 و−1) يساوي صفرًا.`
                })}
            </text>
        </svg>
    )
}

/** A − in front of a bracket changes every sign inside it; a + keeps them */
export function BracketsFigure({ language }: { language: UnitLanguage }) {
    const rowText = (y: number, sign: '+' | '−', inside: string[], outside: string[], tone: string) => (
        <g>
            <text x={40} y={y} fontSize={30} fontWeight={700} fill={tone} fontFamily="Fraunces, serif">{sign}</text>
            <text x={70} y={y} fontSize={30} fontWeight={700} fill={INK} fontFamily="Fraunces, serif">( {inside.join(' ')} )</text>
            <text x={330} y={y} fontSize={30} fontWeight={700} fill={MUTED}>→</text>
            <text x={390} y={y} fontSize={30} fontWeight={700} fill={tone} fontFamily="Fraunces, serif">{outside.join(' ')}</text>
        </g>
    )
    return (
        <svg viewBox="0 0 720 220" role="img" aria-label={pick(language, { eu: 'Parentesiak kentzea', es: 'Quitar paréntesis', ar: 'حذف الأقواس' })} className="integers-number-line">
            {rowText(70, '+', ['−5', '+3', '−2'], ['−5', '+3', '−2'], STAGE)}
            {rowText(150, '−', ['−5', '+3', '−2'], ['+5', '−3', '+2'], SECOND)}
            <text x={360} y={206} textAnchor="middle" fontSize={15} fill={MUTED}>
                {pick(language, { eu: '+ aurretik: zeinuak berdin. − aurretik: zeinu guztiak aldatzen dira.', es: 'Delante un +: los signos se mantienen. Delante un −: cambian todos los signos.', ar: 'إذا سبقه +: تبقى الإشارات. إذا سبقه −: تتغير كل الإشارات.' })}
            </text>
        </svg>
    )
}

export function IntegersIntroHeroArt() {
    return (
        <div className="fraction-v2-collage" aria-hidden="true">
            <svg className="integers-dbh1-hero-art" viewBox="0 0 520 400">
                {/* Thermometer card */}
                <g transform="translate(40 36) rotate(-4)">
                    <rect width={150} height={230} rx={16} fill={PAPER} stroke={INK} strokeWidth={2} />
                    <rect x={62} y={24} width={26} height={180} rx={13} fill="#fffcf6" stroke={INK} strokeWidth={2} />
                    <rect x={68} y={140} width={14} height={58} rx={7} fill="#c4432a" />
                    {[['+10', 44], ['0', 114], ['−5', 149]].map(([label, y]) => (
                        <text key={label} x={96} y={Number(y) + 5} fontSize={16} fontWeight={700} fill={INK}>{label}</text>
                    ))}
                    <line x1={52} x2={98} y1={114} y2={114} stroke={INK} strokeWidth={2} />
                </g>
                {/* Lift buttons sticker */}
                <g transform="translate(250 40) rotate(4)">
                    <rect width={220} height={110} rx={16} fill="#e8e0f7" stroke={INK} strokeWidth={2} />
                    {['+2', '+1', '0', '−1', '−2'].map((label, index) => (
                        <g key={label}>
                            <circle cx={30 + index * 40} cy={55} r={17} fill={label.startsWith('−') ? '#f6d9cf' : PAPER} stroke={INK} strokeWidth={2} />
                            <text x={30 + index * 40} y={61} textAnchor="middle" fontSize={15} fontWeight={700} fill={INK}>{label}</text>
                        </g>
                    ))}
                </g>
                {/* Sign rule sticker */}
                <g transform="translate(270 190) rotate(-3)">
                    <rect width={200} height={90} rx={16} fill="#fbebc0" stroke={INK} strokeWidth={2} />
                    <text x={100} y={58} textAnchor="middle" fontSize={28} fontWeight={700} fill={INK} fontFamily="Fraunces, serif">(−) · (−) = +</text>
                </g>
                {/* Number line strip */}
                <g transform="translate(40 300)">
                    <rect width={440} height={70} rx={16} fill="#d6eddf" stroke={INK} strokeWidth={2} />
                    <line x1={30} x2={410} y1={35} y2={35} stroke={INK} strokeWidth={2.4} />
                    {[-3, -2, -1, 0, 1, 2, 3].map((value, index) => (
                        <g key={value}>
                            <line x1={50 + index * 57} x2={50 + index * 57} y1={27} y2={43} stroke={INK} strokeWidth={2} />
                            <text x={50 + index * 57} y={62} textAnchor="middle" fontSize={14} fontWeight={700} fill={value < 0 ? '#c4432a' : INK}>{signed(value)}</text>
                        </g>
                    ))}
                </g>
            </svg>
        </div>
    )
}
