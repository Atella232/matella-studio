import type { ReactElement } from 'react'
import { formatNatural } from './format'
import { pickText, type LocalizedText, type UnitLanguage } from '../../features/unit-v2/types'

/* ==========================================================================
   Zenbaki naturalak · lesson figures, drawn as SVG in the notebook style
   ========================================================================== */

const INK = 'var(--ink, #1d2733)'
const MUTED = 'var(--muted, #58616e)'
const STAGE = 'var(--stage, #2f6fdb)'
const STAGE_TINT = 'var(--stage-tint, #dde7f7)'
const SECOND = 'var(--second, #c4432a)'
const PAPER = '#fffcf6'
const RED = '#d9502e'
const YELLOW = '#e0a100'
const GREEN = '#267b53'

const pick = (language: UnitLanguage, text: LocalizedText) => pickText(language, text)

const placeNames: Record<UnitLanguage, string[]> = {
    eu: ['unitateak', 'hamarrekoak', 'ehunekoak', 'milakoak', 'hamar milakoak', 'ehun milakoak', 'milioiak'],
    es: ['unidades', 'decenas', 'centenas', 'unidades de millar', 'decenas de millar', 'centenas de millar', 'unidades de millón'],
    ar: ['آحاد', 'عشرات', 'مئات', 'آلاف', 'عشرات الآلاف', 'مئات الآلاف', 'ملايين']
}

/** Splits a label in two lines at the first space */
function twoLines(label: string): [string, string] {
    const index = label.indexOf(' ')
    return index < 0 ? [label, ''] : [label.slice(0, index), label.slice(index + 1)]
}

/** Place value table: every column is worth ten times the one on its right */
export function PlaceValueFigure({ language }: { language: UnitLanguage }) {
    const digits = '8706265'.split('')
    const highlight = 1
    const column = 92
    const left = 38
    const names = placeNames[language]
    const value = Number(digits[highlight]) * 10 ** (digits.length - 1 - highlight)
    return (
        <svg viewBox="0 0 720 250" role="img" aria-label={pick(language, { eu: 'Posizio-taula', es: 'Tabla de posiciones', ar: 'جدول المراتب' })} className="naturals-figure">
            {digits.map((digit, index) => {
                const x = left + index * column
                const [first, second] = twoLines(names[digits.length - 1 - index])
                const active = index === highlight
                return (
                    <g key={index}>
                        <rect x={x} y={34} width={column - 6} height={52} rx={8} fill={active ? STAGE_TINT : PAPER} stroke={INK} strokeWidth={1.4} />
                        <text x={x + (column - 6) / 2} y={56} textAnchor="middle" fontSize={14} fill={INK}>{first}</text>
                        <text x={x + (column - 6) / 2} y={73} textAnchor="middle" fontSize={14} fill={INK}>{second}</text>
                        <rect x={x} y={94} width={column - 6} height={70} rx={10} fill={active ? STAGE : PAPER} stroke={INK} strokeWidth={active ? 2.4 : 1.6} />
                        <text x={x + (column - 6) / 2} y={142} textAnchor="middle" fontSize={36} fontWeight={700} fill={active ? '#fff' : INK} fontFamily="Fraunces, serif">{digit}</text>
                        {index > 0 && <text x={x - 3} y={24} textAnchor="middle" fontSize={12} fontWeight={700} fill={MUTED}>·10</text>}
                    </g>
                )
            })}
            <path d={`M${left + highlight * column + (column - 6) / 2} 168 L${left + highlight * column + (column - 6) / 2} 190`} stroke={STAGE} strokeWidth={2.4} />
            <text x={left + highlight * column + (column - 6) / 2} y={212} textAnchor="middle" fontSize={20} fontWeight={700} fill={STAGE}>{formatNatural(value)}</text>
            <text x={360} y={242} textAnchor="middle" fontSize={15} fill={MUTED}>
                {pick(language, {
                    eu: `8.706.265 zenbakian, 7 zifrak ${formatNatural(value)} balio du`,
                    es: `En 8.706.265, la cifra 7 vale ${formatNatural(value)}`,
                    ar: `في العدد 8.706.265 قيمة الرقم 7 هي ${formatNatural(value)}`
                })}
            </text>
        </svg>
    )
}

/** Large numbers are read in groups of three digits */
export function PeriodsFigure({ language }: { language: UnitLanguage }) {
    const groups = ['15', '350', '000', '000', '000']
    const labels: Record<UnitLanguage, string[]> = {
        eu: ['bilioiak', 'mila milioiak', 'milioiak', 'milakoak', 'unitateak'],
        es: ['billones', 'miles de millones', 'millones', 'millares', 'unidades'],
        ar: ['تريليونات', 'مليارات', 'ملايين', 'آلاف', 'آحاد']
    }
    const width = 128
    return (
        <svg viewBox="0 0 720 200" role="img" aria-label={pick(language, { eu: 'Hiruko taldeak', es: 'Grupos de tres cifras', ar: 'مجموعات من ثلاثة أرقام' })} className="naturals-figure">
            {groups.map((group, index) => {
                const x = 30 + index * (width + 4)
                return (
                    <g key={index}>
                        <rect x={x} y={30} width={width} height={74} rx={12} fill={index % 2 === 0 ? STAGE_TINT : PAPER} stroke={INK} strokeWidth={1.8} />
                        <text x={x + width / 2} y={80} textAnchor="middle" fontSize={34} fontWeight={700} fill={INK} fontFamily="Fraunces, serif">{group}</text>
                        <text x={x + width / 2} y={130} textAnchor="middle" fontSize={14} fontWeight={700} fill={STAGE}>{labels[language][index]}</text>
                    </g>
                )
            })}
            <text x={360} y={180} textAnchor="middle" fontSize={15} fill={MUTED}>
                {pick(language, {
                    eu: '15 bilioi 350.000 milioi: hamabost bilioi hirurehun eta berrogeita hamar mila milioi',
                    es: '15 billones 350.000 millones: quince billones trescientos cincuenta mil millones',
                    ar: '15 تريليونًا و350 مليارًا'
                })}
            </text>
        </svg>
    )
}

/** Unknown marks between two known numbers: distance divided by the number of jumps */
export function NumberLineJumpsFigure({ language }: { language: UnitLanguage }) {
    const start = 430
    const step = 100
    const jumps = 4
    const left = 70
    const unit = 145
    const lineY = 120
    const x = (index: number) => left + index * unit
    return (
        <svg viewBox="0 0 720 200" role="img" aria-label={pick(language, { eu: '430etik 830era lau salto', es: 'Cuatro saltos de 430 a 830', ar: 'أربع قفزات من 430 إلى 830' })} className="naturals-figure">
            <defs>
                <marker id="naturals-jump" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
                    <path d="M0 0 L10 5 L0 10 z" fill={STAGE} />
                </marker>
            </defs>
            {Array.from({ length: jumps }, (_, index) => (
                <g key={index}>
                    <path d={`M${x(index)} ${lineY - 8} C ${x(index)} ${lineY - 62}, ${x(index + 1)} ${lineY - 62}, ${x(index + 1)} ${lineY - 8}`} fill="none" stroke={STAGE} strokeWidth={2.6} markerEnd="url(#naturals-jump)" />
                    <text x={(x(index) + x(index + 1)) / 2} y={lineY - 56} textAnchor="middle" fontSize={16} fontWeight={700} fill={STAGE}>+{step}</text>
                </g>
            ))}
            <line x1={left - 30} x2={x(jumps) + 30} y1={lineY} y2={lineY} stroke={INK} strokeWidth={2.4} />
            {Array.from({ length: jumps + 1 }, (_, index) => {
                const known = index === 0 || index === jumps
                return (
                    <g key={index}>
                        <line x1={x(index)} x2={x(index)} y1={lineY - 10} y2={lineY + 10} stroke={INK} strokeWidth={2.4} />
                        <text x={x(index)} y={lineY + 36} textAnchor="middle" fontSize={20} fontWeight={700} fill={known ? INK : STAGE}>{start + index * step}</text>
                    </g>
                )
            })}
            <text x={360} y={190} textAnchor="middle" fontSize={15} fill={MUTED}>
                {pick(language, { eu: '(830 − 430) : 4 = 100 → salto bakoitza 100 da', es: '(830 − 430) : 4 = 100 → cada salto vale 100', ar: '(830 − 430) : 4 = 100 ← كل قفزة تساوي 100' })}
            </text>
        </svg>
    )
}

/** The seven Roman symbols and their values */
export function RomanFigure({ language }: { language: UnitLanguage }) {
    const symbols: Array<[string, number]> = [['I', 1], ['V', 5], ['X', 10], ['L', 50], ['C', 100], ['D', 500], ['M', 1000]]
    const width = 86
    return (
        <svg viewBox="0 0 720 200" role="img" aria-label={pick(language, { eu: 'Erromatar ikurrak', es: 'Símbolos romanos', ar: 'الرموز الرومانية' })} className="naturals-figure">
            {symbols.map(([symbol, value], index) => {
                const x = 40 + index * (width + 8)
                return (
                    <g key={symbol} transform={`rotate(${index % 2 === 0 ? -2 : 2} ${x + width / 2} 80)`}>
                        <rect x={x} y={30} width={width} height={104} rx={12} fill={index % 2 === 0 ? STAGE_TINT : PAPER} stroke={INK} strokeWidth={1.8} />
                        <text x={x + width / 2} y={86} textAnchor="middle" fontSize={40} fontWeight={700} fill={INK} fontFamily="Fraunces, serif">{symbol}</text>
                        <text x={x + width / 2} y={120} textAnchor="middle" fontSize={17} fontWeight={700} fill={STAGE}>{formatNatural(value)}</text>
                    </g>
                )
            })}
            <text x={360} y={180} textAnchor="middle" fontSize={16} fill={MUTED}>
                {pick(language, { eu: 'MMXXVI = 2.026     XC = 90     XIV = 14', es: 'MMXXVI = 2.026     XC = 90     XIV = 14', ar: 'MMXXVI = 2.026     XC = 90     XIV = 14' })}
            </text>
        </svg>
    )
}

/** 14.823 is closer to 15.000 than to 14.000: the midpoint decides */
export function RoundingFigure({ language }: { language: UnitLanguage }) {
    const from = 14000
    const to = 15000
    const value = 14823
    const left = 60
    const right = 660
    const x = (number: number) => left + ((number - from) / (to - from)) * (right - left)
    const lineY = 110
    return (
        <svg viewBox="0 0 720 210" role="img" aria-label={pick(language, { eu: '14.823 milakoetara biribiltzea', es: 'Redondear 14.823 a los millares', ar: 'تقريب 14.823 إلى الآلاف' })} className="naturals-figure">
            <rect x={x(14500)} y={lineY - 34} width={right - x(14500)} height={68} rx={10} fill={STAGE_TINT} />
            <line x1={left - 20} x2={right + 20} y1={lineY} y2={lineY} stroke={INK} strokeWidth={2.4} />
            {Array.from({ length: 11 }, (_, index) => {
                const number = from + index * 100
                const main = index === 0 || index === 10
                const middle = index === 5
                return (
                    <g key={number}>
                        <line x1={x(number)} x2={x(number)} y1={lineY - (main ? 12 : middle ? 10 : 6)} y2={lineY + (main ? 12 : middle ? 10 : 6)} stroke={INK} strokeWidth={main ? 2.6 : 1.4} strokeDasharray={middle ? '3 3' : undefined} />
                        {(main || middle) && <text x={x(number)} y={lineY + 38} textAnchor="middle" fontSize={main ? 19 : 15} fontWeight={main ? 700 : 400} fill={main ? INK : MUTED}>{formatNatural(number)}</text>}
                    </g>
                )
            })}
            <circle cx={x(value)} cy={lineY} r={9} fill={STAGE} stroke={INK} strokeWidth={2} />
            <text x={x(value)} y={lineY - 44} textAnchor="middle" fontSize={20} fontWeight={700} fill={STAGE}>{formatNatural(value)}</text>
            <path d={`M${x(value) + 12} ${lineY - 18} Q ${(x(value) + x(to)) / 2} ${lineY - 40} ${x(to) - 6} ${lineY - 16}`} fill="none" stroke={STAGE} strokeWidth={2.2} markerEnd="url(#naturals-round)" />
            <defs>
                <marker id="naturals-round" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
                    <path d="M0 0 L10 5 L0 10 z" fill={STAGE} />
                </marker>
            </defs>
            <text x={360} y={200} textAnchor="middle" fontSize={15} fill={MUTED}>
                {pick(language, { eu: '14.500 baino gehiago da: 15.000ra biribiltzen da', es: 'Pasa de 14.500: se redondea a 15.000', ar: 'يتجاوز 14.500: نقرّبه إلى 15.000' })}
            </text>
        </svg>
    )
}

/** 6 · (8 + 2) as a rectangle of 6 rows split into 8 and 2 columns */
export function DistributiveFigure({ language }: { language: UnitLanguage }) {
    const rows = 6
    const first = 8
    const second = 2
    const cell = 30
    const left = 150
    const top = 40
    return (
        <svg viewBox="0 0 720 300" role="img" aria-label={pick(language, { eu: 'Banatze-propietatea laukizuzen batean', es: 'Propiedad distributiva en un rectángulo', ar: 'خاصية التوزيع في مستطيل' })} className="naturals-figure">
            {Array.from({ length: rows * (first + second) }, (_, index) => {
                const column = index % (first + second)
                const row = Math.floor(index / (first + second))
                const inSecond = column >= first
                return <rect key={index} x={left + column * cell + (inSecond ? 12 : 0)} y={top + row * cell} width={cell - 4} height={cell - 4} rx={5} fill={inSecond ? '#f6d9cf' : STAGE_TINT} stroke={INK} strokeWidth={1.3} />
            })}
            <text x={left + (first * cell) / 2} y={top - 12} textAnchor="middle" fontSize={20} fontWeight={700} fill={STAGE}>8</text>
            <text x={left + first * cell + 12 + (second * cell) / 2} y={top - 12} textAnchor="middle" fontSize={20} fontWeight={700} fill={SECOND}>2</text>
            <text x={left - 20} y={top + (rows * cell) / 2 + 6} textAnchor="middle" fontSize={20} fontWeight={700} fill={INK}>6</text>
            <text x={left + (first * cell) / 2} y={top + rows * cell + 30} textAnchor="middle" fontSize={18} fontWeight={700} fill={STAGE}>6 · 8 = 48</text>
            <text x={left + first * cell + 12 + (second * cell) / 2} y={top + rows * cell + 30} textAnchor="middle" fontSize={18} fontWeight={700} fill={SECOND}>6 · 2 = 12</text>
            <text x={360} y={288} textAnchor="middle" fontSize={16} fill={MUTED}>
                {pick(language, { eu: '6 · (8 + 2) = 6 · 8 + 6 · 2 = 48 + 12 = 60 karratu', es: '6 · (8 + 2) = 6 · 8 + 6 · 2 = 48 + 12 = 60 cuadrados', ar: '6 · (8 + 2) = 6 · 8 + 6 · 2 = 48 + 12 = 60 مربعًا' })}
            </text>
        </svg>
    )
}

/** 17 counters shared in groups of 5: quotient 3, remainder 2 */
export function DivisionFigure({ language }: { language: UnitLanguage }) {
    const divisor = 5
    const quotient = 3
    const remainder = 2
    const groupWidth = 150
    return (
        <svg viewBox="0 0 720 220" role="img" aria-label={pick(language, { eu: '17 fitxa 5eko taldetan', es: '17 fichas en grupos de 5', ar: '17 قطعة في مجموعات من 5' })} className="naturals-figure">
            {Array.from({ length: quotient }, (_, group) => {
                const x = 40 + group * (groupWidth + 20)
                return (
                    <g key={group}>
                        <rect x={x} y={40} width={groupWidth} height={90} rx={16} fill={STAGE_TINT} stroke={INK} strokeWidth={1.8} />
                        {Array.from({ length: divisor }, (_, index) => (
                            <circle key={index} cx={index < 3 ? x + 27 + index * 48 : x + 51 + (index - 3) * 48} cy={index < 3 ? 70 : 104} r={14} fill={STAGE} stroke={INK} strokeWidth={1.6} />
                        ))}
                    </g>
                )
            })}
            {Array.from({ length: remainder }, (_, index) => (
                <circle key={index} cx={590 + index * 44} cy={85} r={14} fill={SECOND} stroke={INK} strokeWidth={1.6} />
            ))}
            <text x={40 + (quotient * (groupWidth + 20) - 20) / 2} y={160} textAnchor="middle" fontSize={17} fontWeight={700} fill={STAGE}>
                {pick(language, { eu: '3 talde (zatidura)', es: '3 grupos (cociente)', ar: '3 مجموعات (خارج القسمة)' })}
            </text>
            <text x={612} y={160} textAnchor="middle" fontSize={17} fontWeight={700} fill={SECOND}>
                {pick(language, { eu: '2 (hondarra)', es: '2 (resto)', ar: '2 (الباقي)' })}
            </text>
            <text x={360} y={204} textAnchor="middle" fontSize={17} fill={MUTED}>17 = 5 · 3 + 2     (2 &lt; 5)</text>
        </svg>
    )
}

/** The class "semaforoa": red brackets, yellow · and :, green + and − */
export function SemaphoreFigure({ language }: { language: UnitLanguage }) {
    const tokens: Array<{ text: string; width: number; color?: string }> = [
        { text: '20', width: 46 },
        { text: '−', width: 34, color: GREEN },
        { text: '(3 + 5)', width: 104, color: RED },
        { text: '·', width: 30, color: YELLOW },
        { text: '2', width: 30 },
        { text: '+', width: 34, color: GREEN },
        { text: '12', width: 46 },
        { text: ':', width: 30, color: YELLOW },
        { text: '4', width: 30 }
    ]
    const total = tokens.reduce((sum, token) => sum + token.width, 0)
    let cursor = 360 - total / 2
    const placed = tokens.map((token) => {
        const center = cursor + token.width / 2
        cursor += token.width
        return { ...token, center }
    })
    const lines: Array<{ color: string; text: string }> = [
        { color: RED, text: '20 − 8 · 2 + 12 : 4' },
        { color: YELLOW, text: '20 − 16 + 3' },
        { color: GREEN, text: '4 + 3 = 7' }
    ]
    const legend: Array<{ color: string; label: LocalizedText }> = [
        { color: RED, label: { eu: 'parentesiak', es: 'paréntesis', ar: 'الأقواس' } },
        { color: YELLOW, label: { eu: '· eta :', es: '· y :', ar: '· و :' } },
        { color: GREEN, label: { eu: '+ eta −', es: '+ y −', ar: '+ و −' } }
    ]
    return (
        <svg viewBox="0 0 720 300" role="img" aria-label={pick(language, { eu: 'Semaforoa eragiketa konbinatuetan', es: 'El semáforo en las operaciones combinadas', ar: 'إشارة المرور في العمليات المركبة' })} className="naturals-figure">
            {placed.map((token, index) => (
                <g key={index}>
                    <text x={token.center} y={60} textAnchor="middle" fontSize={32} fontWeight={700} fill={INK} fontFamily="Fraunces, serif">{token.text}</text>
                    {token.color && <rect x={token.center - token.width / 2 + 4} y={70} width={token.width - 8} height={7} rx={3.5} fill={token.color} />}
                </g>
            ))}
            {lines.map((line, index) => (
                <g key={index}>
                    <circle cx={200} cy={122 + index * 44} r={12} fill={line.color} stroke={INK} strokeWidth={1.6} />
                    <text x={226} y={130 + index * 44} fontSize={24} fill={INK}>= {line.text}</text>
                </g>
            ))}
            {legend.map((item, index) => (
                <g key={index}>
                    <circle cx={150 + index * 170} cy={274} r={8} fill={item.color} />
                    <text x={164 + index * 170} y={280} fontSize={15} fill={MUTED}>{pick(language, item.label)}</text>
                </g>
            ))}
        </svg>
    )
}

/** Data, procedure, answer: the three cards of a well-solved problem */
export function DpeFigure({ language }: { language: UnitLanguage }) {
    const cards: Array<{ letter: string; title: string; lines: string[]; color: string }> = {
        eu: [
            { letter: 'D', title: 'Datuak', lines: ['27 solairu', '12 bizileku solairuko', '7 leiho bizilekuko'], color: '#2f6fdb' },
            { letter: 'P', title: 'Prozedura', lines: ['27 · 12 · 7 = 2.268'], color: '#e0a100' },
            { letter: 'E', title: 'Erantzuna', lines: ['Eraikinak 2.268', 'leiho ditu guztira.'], color: '#267b53' }
        ],
        es: [
            { letter: 'D', title: 'Datos', lines: ['27 plantas', '12 viviendas por planta', '7 ventanas por vivienda'], color: '#2f6fdb' },
            { letter: 'P', title: 'Procedimiento', lines: ['27 · 12 · 7 = 2.268'], color: '#e0a100' },
            { letter: 'R', title: 'Respuesta', lines: ['El edificio tiene', '2.268 ventanas en total.'], color: '#267b53' }
        ],
        ar: [
            { letter: '١', title: 'المعطيات', lines: ['27 طابقًا', '12 شقة في كل طابق', '7 نوافذ في كل شقة'], color: '#2f6fdb' },
            { letter: '٢', title: 'الطريقة', lines: ['27 · 12 · 7 = 2.268'], color: '#e0a100' },
            { letter: '٣', title: 'الجواب', lines: ['في المبنى 2.268', 'نافذة في المجموع.'], color: '#267b53' }
        ]
    }[language]
    const width = 206
    return (
        <svg viewBox="0 0 720 230" role="img" aria-label={pick(language, { eu: 'Datuak, prozedura eta erantzuna', es: 'Datos, procedimiento y respuesta', ar: 'المعطيات والطريقة والجواب' })} className="naturals-figure">
            {cards.map((card, index) => {
                const x = 30 + index * (width + 21)
                return (
                    <g key={index} transform={`rotate(${index === 1 ? 1.5 : -1.5} ${x + width / 2} 115)`}>
                        <rect x={x} y={24} width={width} height={180} rx={16} fill={PAPER} stroke={INK} strokeWidth={2} />
                        <circle cx={x + 34} cy={58} r={22} fill={card.color} stroke={INK} strokeWidth={1.8} />
                        <text x={x + 34} y={67} textAnchor="middle" fontSize={24} fontWeight={700} fill="#fff" fontFamily="Fraunces, serif">{card.letter}</text>
                        <text x={x + 66} y={65} fontSize={18} fontWeight={700} fill={INK}>{card.title}</text>
                        {card.lines.map((line, lineIndex) => (
                            <text key={lineIndex} x={x + width / 2} y={118 + lineIndex * 26} textAnchor="middle" fontSize={15} fill={INK}>{line}</text>
                        ))}
                    </g>
                )
            })}
        </svg>
    )
}

/** 3² as a square of 9 tiles and 3³ as a cube of 27 blocks */
export function PowerFigure({ language }: { language: UnitLanguage }) {
    const cell = 36
    const depth = cell * 0.5
    const squareLeft = 90
    const cubeLeft = 420
    const top = 70
    const faces: ReactElement[] = []
    for (let row = 0; row < 3; row += 1) {
        for (let column = 0; column < 3; column += 1) {
            faces.push(<rect key={`f${row}${column}`} x={cubeLeft + column * cell} y={top + row * cell} width={cell} height={cell} fill={STAGE_TINT} stroke={INK} strokeWidth={1.4} />)
        }
    }
    for (let column = 0; column < 3; column += 1) {
        for (let layer = 0; layer < 3; layer += 1) {
            const x = cubeLeft + column * cell + layer * depth
            const y = top - layer * depth
            faces.push(<polygon key={`t${column}${layer}`} points={`${x},${y} ${x + cell},${y} ${x + cell + depth},${y - depth} ${x + depth},${y - depth}`} fill="#eaf1fb" stroke={INK} strokeWidth={1.4} />)
        }
    }
    for (let layer = 0; layer < 3; layer += 1) {
        for (let row = 0; row < 3; row += 1) {
            const x = cubeLeft + 3 * cell + layer * depth
            const y = top + row * cell - layer * depth
            faces.push(<polygon key={`s${layer}${row}`} points={`${x},${y} ${x + depth},${y - depth} ${x + depth},${y + cell - depth} ${x},${y + cell}`} fill="#c3d5f1" stroke={INK} strokeWidth={1.4} />)
        }
    }
    return (
        <svg viewBox="0 0 720 260" role="img" aria-label={pick(language, { eu: '3 karratura eta 3 kubora', es: '3 al cuadrado y 3 al cubo', ar: 'مربع 3 ومكعب 3' })} className="naturals-figure">
            {Array.from({ length: 9 }, (_, index) => (
                <rect key={index} x={squareLeft + (index % 3) * cell} y={top + Math.floor(index / 3) * cell} width={cell} height={cell} fill={STAGE_TINT} stroke={INK} strokeWidth={1.4} />
            ))}
            {faces}
            <text x={squareLeft + 1.5 * cell} y={top + 3 * cell + 44} textAnchor="middle" fontSize={24} fontWeight={700} fill={INK} fontFamily="Fraunces, serif">3² = 3 · 3 = 9</text>
            <text x={cubeLeft + 1.5 * cell + depth / 2} y={top + 3 * cell + 44} textAnchor="middle" fontSize={24} fontWeight={700} fill={INK} fontFamily="Fraunces, serif">3³ = 3 · 3 · 3 = 27</text>
            <text x={360} y={250} textAnchor="middle" fontSize={15} fill={MUTED}>
                {pick(language, { eu: 'Karratua: azalera. Kuboa: bolumena.', es: 'Cuadrado: área. Cubo: volumen.', ar: 'المربع: مساحة. المكعب: حجم.' })}
            </text>
        </svg>
    )
}

export function NaturalsHeroArt() {
    return (
        <div className="fraction-v2-collage" aria-hidden="true">
            <svg className="naturals-hero-art" viewBox="0 0 520 400">
                {/* Place value card */}
                <g transform="translate(36 44) rotate(-4)">
                    <rect width={230} height={150} rx={16} fill={PAPER} stroke={INK} strokeWidth={2} />
                    {['8', '7', '0', '6'].map((digit, index) => (
                        <g key={index}>
                            <rect x={18 + index * 50} y={40} width={44} height={66} rx={8} fill={index === 1 ? '#2f6fdb' : '#fffcf6'} stroke={INK} strokeWidth={1.8} />
                            <text x={40 + index * 50} y={86} textAnchor="middle" fontSize={32} fontWeight={700} fill={index === 1 ? '#fff' : INK} fontFamily="Fraunces, serif">{digit}</text>
                        </g>
                    ))}
                    <text x={115} y={134} textAnchor="middle" fontSize={17} fontWeight={700} fill="#2f6fdb">700.000</text>
                </g>
                {/* Power sticker */}
                <g transform="translate(300 52) rotate(4)">
                    <rect width={180} height={92} rx={16} fill="#d6eddf" stroke={INK} strokeWidth={2} />
                    <text x={90} y={60} textAnchor="middle" fontSize={32} fontWeight={700} fill={INK} fontFamily="Fraunces, serif">2³ = 8</text>
                </g>
                {/* Roman numerals sticker */}
                <g transform="translate(290 180) rotate(-3)">
                    <rect width={200} height={90} rx={16} fill="#e8e0f7" stroke={INK} strokeWidth={2} />
                    <text x={100} y={58} textAnchor="middle" fontSize={30} fontWeight={700} fill={INK} fontFamily="Fraunces, serif">MMXXVI</text>
                </g>
                {/* Semaphore strip */}
                <g transform="translate(40 300)">
                    <rect width={440} height={70} rx={16} fill="#fbebc0" stroke={INK} strokeWidth={2} />
                    {[RED, YELLOW, GREEN].map((color, index) => (
                        <circle key={color} cx={44 + index * 50} cy={35} r={17} fill={color} stroke={INK} strokeWidth={2} />
                    ))}
                    <text x={318} y={46} textAnchor="middle" fontSize={28} fontWeight={700} fill={INK} fontFamily="Fraunces, serif">( ) → · : → + −</text>
                </g>
            </svg>
        </div>
    )
}
