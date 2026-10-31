import type { ReactNode } from 'react'
import { pickText, type LocalizedText, type UnitLanguage } from '../../features/unit-v2/types'
import { Label } from '../dbh2-funtzioak-v2/plane'

/* ==========================================================================
   Segidak · 3. DBH — lesson figures. There is no earlier sequences unit,
   so every figure is new: a row of squares made of sticks (a pattern and
   its general term), a recursive chain, the jumps of an arithmetic
   progression on the number line, Gauss's pairs as a rectangle, a ball
   that bounces back to half its height, and a square cut in halves again
   and again. Drawn 360 wide so that they can be read on a phone; Arabic
   captions carry words only.
   ========================================================================== */

const INK = 'var(--ink, #1d2733)'
const MUTED = 'var(--muted, #58616e)'
const STAGE = 'var(--stage, #2f6fdb)'
const STAGE_TINT = 'var(--stage-tint, #dde7f7)'
const SECOND = 'var(--second, #c4432a)'
const SECOND_TINT = '#f6d5cc'
const MUSTARD = 'var(--mustard, #e0a100)'

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })

/** Drawn 360 wide to fit a phone, so the 540 px minimum of lesson figures does not apply */
export function Board({ height, label, children }: { height: number; label: string; children: ReactNode }) {
    return (
        <svg viewBox={`0 0 360 ${height}`} direction="ltr" role="img" aria-label={label} style={{ display: 'block', width: '100%', minWidth: 0, maxWidth: 520, height: 'auto', margin: '0 auto', fontFamily: '"Atkinson Hyperlegible", "Noto Sans Arabic", system-ui, sans-serif' }}>
            {children}
        </svg>
    )
}

const Caption = ({ y, language, text }: { y: number; language: UnitLanguage; text: LocalizedText }) => (
    <Label x={180} y={y} textAnchor="middle" fontSize={14} fill={MUTED}>{pickText(language, text)}</Label>
)

/** A row of `n` squares made of sticks, `side` pixels each, from (x, y) */
export function StickSquares({ x, y, n, side, color = STAGE }: { x: number; y: number; n: number; side: number; color?: string }) {
    const sticks: ReactNode[] = []
    for (let i = 0; i <= n; i += 1) sticks.push(<line key={`v${i}`} x1={x + i * side} x2={x + i * side} y1={y} y2={y + side} stroke={color} strokeWidth={4} strokeLinecap="round" />)
    for (let i = 0; i < n; i += 1) {
        sticks.push(<line key={`t${i}`} x1={x + i * side + 3} x2={x + (i + 1) * side - 3} y1={y} y2={y} stroke={color} strokeWidth={4} strokeLinecap="round" />)
        sticks.push(<line key={`b${i}`} x1={x + i * side + 3} x2={x + (i + 1) * side - 3} y1={y + side} y2={y + side} stroke={color} strokeWidth={4} strokeLinecap="round" />)
    }
    return <g>{sticks}</g>
}

/* ---------- Sequences: squares of sticks ---------- */

export function SticksFigure({ language }: { language: UnitLanguage }) {
    return (
        <Board height={190} label={pickText(language, say('Makilen karratuak: 4, 7, 10 makila; aₙ = 3n + 1', 'Cuadrados de palillos: 4, 7, 10 palillos; aₙ = 3n + 1', 'مربعات من العيدان: 4 و7 و10 عيدان؛ aₙ = 3n + 1', 'Squares of sticks: 4, 7, 10 sticks; aₙ = 3n + 1'))}>
            {[1, 2, 3].map((n, index) => {
                const x = [18, 84, 186][index]
                return (
                    <g key={n}>
                        <StickSquares x={x} y={30} n={n} side={30} />
                        <text x={x + (n * 30) / 2} y={22} textAnchor="middle" fontSize={14} fontWeight={700} fill={MUTED}>{`n = ${n}`}</text>
                        <text x={x + (n * 30) / 2} y={88} textAnchor="middle" fontSize={18} fontWeight={700} fill={SECOND}>{3 * n + 1}</text>
                    </g>
                )
            })}
            <text x={316} y={52} textAnchor="middle" fontSize={22} fontWeight={700} fill={MUTED}>…</text>
            <text x={180} y={130} textAnchor="middle" fontSize={20} fontWeight={700} fill={INK}>4, 7, 10, 13, …</text>
            <text x={180} y={158} textAnchor="middle" fontSize={18} fontWeight={700} fill={STAGE}>aₙ = 3n + 1</text>
            <Caption y={182} language={language} text={say('Karratu bakoitzak 3 makila gehiago behar ditu', 'Cada cuadrado necesita 3 palillos más', 'كل مربع يحتاج 3 عيدان إضافية', 'Each square needs 3 more sticks')} />
        </Board>
    )
}

/* ---------- Recursive rules: each term from the ones before ---------- */

export function RecursiveFigure({ language }: { language: UnitLanguage }) {
    const terms = [1, 1, 2, 3, 5, 8, 13]
    const x = (index: number) => 30 + index * 50
    return (
        <Board height={150} label={pickText(language, say('Fibonacci: gai bakoitza aurreko bien batura', 'Fibonacci: cada término es la suma de los dos anteriores', 'فيبوناتشي: كل حد مجموع الحدين السابقين', 'Fibonacci: each term is the sum of the two before'))}>
            {terms.map((term, index) => (
                <g key={index}>
                    <rect x={x(index) - 18} y={60} width={36} height={36} rx={8} fill={index >= 2 ? STAGE_TINT : '#fbebc0'} stroke={INK} strokeWidth={1.6} />
                    <text x={x(index)} y={84} textAnchor="middle" fontSize={17} fontWeight={700} fill={INK}>{term}</text>
                </g>
            ))}
            {[2, 3, 4].map((index) => (
                <g key={index}>
                    <path d={`M${x(index - 2)} 58 Q ${x(index - 1)} ${22 - (index - 2) * 4} ${x(index)} 58`} fill="none" stroke={SECOND} strokeWidth={1.8} />
                    <path d={`M${x(index - 1)} 58 Q ${(x(index - 1) + x(index)) / 2} 40 ${x(index)} 58`} fill="none" stroke={SECOND} strokeWidth={1.8} />
                </g>
            ))}
            <text x={x(4)} y={120} textAnchor="middle" fontSize={15} fontWeight={700} fill={SECOND}>2 + 3 = 5</text>
            <Caption y={144} language={language} text={say('Lehen bi gaiak eta araua emanda, segida osoa dago', 'Con los dos primeros términos y la regla, está toda la sucesión', 'بالحدين الأولين والقاعدة تتحدد المتتالية كلها', 'With the first two terms and the rule, the whole sequence is fixed')} />
        </Board>
    )
}

/* ---------- Arithmetic progressions: equal jumps on the number line ---------- */

export function JumpsFigure({ language }: { language: UnitLanguage }) {
    const value = (index: number) => 3 + 4 * index
    const x = (v: number) => 24 + v * 14.5
    return (
        <Board height={170} label={pickText(language, say('3, 7, 11, 15, 19: 4ko jauziak', '3, 7, 11, 15, 19: saltos de 4', '3، 7، 11، 15، 19: قفزات بمقدار 4', '3, 7, 11, 15, 19: jumps of 4'))}>
            <line x1={18} x2={346} y1={110} y2={110} stroke={INK} strokeWidth={2} />
            {Array.from({ length: 23 }, (_, v) => <line key={v} x1={x(v)} x2={x(v)} y1={105} y2={115} stroke={INK} strokeWidth={1} />)}
            {[0, 5, 10, 15, 20].map((v) => <text key={v} x={x(v)} y={134} textAnchor="middle" fontSize={13} fill={MUTED}>{v}</text>)}
            {[0, 1, 2, 3, 4].map((index) => (
                <g key={index}>
                    <circle cx={x(value(index))} cy={110} r={6} fill={SECOND} stroke={INK} strokeWidth={1.2} />
                    <text x={x(value(index))} y={96} textAnchor="middle" fontSize={13} fontWeight={700} fill={SECOND}>{`a${'₁₂₃₄₅'[index]}`}</text>
                    {index < 4 && (
                        <g>
                            <path d={`M${x(value(index))} 100 Q ${x(value(index) + 2)} 52 ${x(value(index + 1))} 100`} fill="none" stroke={STAGE} strokeWidth={2} />
                            <text x={x(value(index) + 2)} y={66} textAnchor="middle" fontSize={14} fontWeight={700} fill={STAGE}>+4</text>
                        </g>
                    )}
                </g>
            ))}
            <text x={180} y={30} textAnchor="middle" fontSize={17} fontWeight={700} fill={INK}>aₙ = 3 + (n − 1) · 4</text>
            <Caption y={160} language={language} text={say('a₁ gaitik a₅ gaira, 4 jauzi', 'De a₁ a a₅, 4 saltos', 'من a₁ إلى a₅ أربع قفزات', 'From a₁ to a₅, 4 jumps')} />
        </Board>
    )
}

/* ---------- Gauss: the progression and its reverse make a rectangle ---------- */

export function GaussFigure({ language }: { language: UnitLanguage }) {
    const terms = [2, 4, 6, 8, 10, 12]
    const unit = 9
    const width = 40
    return (
        <Board height={200} label={pickText(language, say('2+4+…+12 bi aldiz: 6 zutabe, bakoitza 14', '2+4+…+12 dos veces: 6 columnas de 14', '2+4+…+12 مرتين: 6 أعمدة كل منها 14', '2+4+…+12 twice: 6 columns of 14'))}>
            {terms.map((term, index) => {
                const x = 40 + index * (width + 6)
                const bottom = 150
                const up = term * unit
                const down = (14 - term) * unit
                return (
                    <g key={index}>
                        <rect x={x} y={bottom - up} width={width} height={up} fill={STAGE_TINT} stroke={STAGE} strokeWidth={1.6} />
                        <rect x={x} y={bottom - up - down} width={width} height={down} fill={SECOND_TINT} stroke={SECOND} strokeWidth={1.6} />
                        <text x={x + width / 2} y={bottom - 6} textAnchor="middle" fontSize={13} fontWeight={700} fill={STAGE}>{term}</text>
                        <text x={x + width / 2} y={bottom - up - down + 15} textAnchor="middle" fontSize={13} fontWeight={700} fill={SECOND}>{14 - term}</text>
                    </g>
                )
            })}
            <text x={330} y={92} textAnchor="middle" fontSize={15} fontWeight={700} fill={MUSTARD}>14</text>
            <text x={180} y={174} textAnchor="middle" fontSize={16} fontWeight={700} fill={INK}>S = 6 · 14 : 2 = 42</text>
            <Caption y={194} language={language} text={say('Progresioa eta alderantzizkoa: zutabe guztiak berdinak', 'La progresión y su reverso: todas las columnas iguales', 'المتتالية ومعكوسها: كل الأعمدة متساوية', 'The progression and its reverse: all the columns are equal')} />
        </Board>
    )
}

/* ---------- Geometric progressions: a ball that bounces back to half ---------- */

export function BounceFigure({ language }: { language: UnitLanguage }) {
    const heights = [160, 80, 40, 20, 10]
    const floor = 180
    const scale = 0.85
    let x = 26
    const arcs: ReactNode[] = []
    heights.forEach((height, index) => {
        const width = 26 + height * 0.5
        const top = floor - height * scale
        if (index > 0) arcs.push(<path key={index} d={`M${x} ${floor} Q ${x + width / 2} ${floor - height * scale * 2} ${x + width} ${floor}`} fill="none" stroke={STAGE} strokeWidth={2} strokeDasharray="4 4" />)
        arcs.push(
            <g key={`h${index}`}>
                <line x1={x + (index > 0 ? width / 2 : 0)} x2={x + (index > 0 ? width / 2 : 0)} y1={floor} y2={top} stroke={SECOND} strokeWidth={1.4} />
                <circle cx={x + (index > 0 ? width / 2 : 0)} cy={top - 8} r={7} fill={SECOND_TINT} stroke={SECOND} strokeWidth={1.6} />
                <text x={x + (index > 0 ? width / 2 : 0) + 12} y={top - 4} fontSize={13} fontWeight={700} fill={SECOND}>{height}</text>
            </g>
        )
        if (index > 0) x += width
    })
    return (
        <Board height={226} label={pickText(language, say('Pilota: 160, 80, 40, 20, 10 cm; r = 1/2', 'Pelota: 160, 80, 40, 20, 10 cm; r = 1/2', 'كرة: 160، 80، 40، 20، 10 سم؛ r = 1/2', 'Ball: 160, 80, 40, 20, 10 cm; r = 1/2'))}>
            <line x1={10} x2={350} y1={floor} y2={floor} stroke={INK} strokeWidth={2.5} />
            {arcs}
            <text x={260} y={40} textAnchor="middle" fontSize={17} fontWeight={700} fill={INK}>aₙ = 160 · (1/2)ⁿ⁻¹</text>
            <Caption y={210} language={language} text={say('Errebote bakoitzean, aurreko altueraren erdia (cm)', 'En cada bote, la mitad de la altura anterior (cm)', 'في كل ارتداد نصف الارتفاع السابق (سم)', 'At each bounce, half the previous height (cm)')} />
        </Board>
    )
}

/* ---------- Infinite sum: a square cut in halves again and again ---------- */

export function HalvesFigure({ language }: { language: UnitLanguage }) {
    const pieces: Array<{ x: number; y: number; w: number; h: number; label: string }> = []
    let x = 0
    let y = 0
    let w = 160
    let h = 160
    const labels = ['1/2', '1/4', '1/8', '1/16', '1/32', '']
    for (let i = 0; i < 6; i += 1) {
        if (i % 2 === 0) {
            pieces.push({ x, y, w: w / 2, h, label: labels[i] })
            x += w / 2
            w /= 2
        } else {
            pieces.push({ x, y, w, h: h / 2, label: labels[i] })
            y += h / 2
            h /= 2
        }
    }
    const colours = [STAGE_TINT, '#fbebc0', SECOND_TINT, '#d9efe2', STAGE_TINT, '#fbebc0']
    return (
        <Board height={214} label={pickText(language, say('1/2 + 1/4 + 1/8 + … = 1', '1/2 + 1/4 + 1/8 + … = 1', '1/2 + 1/4 + 1/8 + … = 1', '1/2 + 1/4 + 1/8 + … = 1'))}>
            <g transform="translate(20 16)">
                {pieces.map((piece, index) => (
                    <g key={index}>
                        <rect x={piece.x} y={piece.y} width={piece.w} height={piece.h} fill={colours[index]} stroke={INK} strokeWidth={1.4} />
                        {piece.label && piece.w > 18 && <text x={piece.x + piece.w / 2} y={piece.y + piece.h / 2 + 5} textAnchor="middle" fontSize={index < 2 ? 16 : 12} fontWeight={700} fill={INK}>{piece.label}</text>}
                    </g>
                ))}
            </g>
            <text x={272} y={80} textAnchor="middle" fontSize={16} fontWeight={700} fill={INK}>1/2 + 1/4 + …</text>
            <text x={272} y={110} textAnchor="middle" fontSize={22} fontWeight={700} fill={SECOND}>= 1</text>
            <text x={272} y={140} textAnchor="middle" fontSize={14} fill={MUTED}>a₁ : (1 − r)</text>
            <Caption y={204} language={language} text={say('Zatiek karratua betetzen dute, baina ez dute gainditzen', 'Los trozos llenan el cuadrado, pero no lo pasan', 'تملأ القطع المربع لكنها لا تتجاوزه', 'The pieces fill the square, but never go past it')} />
        </Board>
    )
}

/** The unit's picture: squares of sticks growing step by step, with no words (it has no language) */
export function SequencesHeroArt() {
    return (
        <svg viewBox="0 0 360 150" role="img" aria-hidden="true" style={{ display: 'block', width: '100%', height: 'auto' }}>
            <StickSquares x={14} y={40} n={1} side={34} />
            <StickSquares x={70} y={40} n={2} side={34} color={SECOND} />
            <StickSquares x={160} y={40} n={3} side={34} color={MUSTARD} />
            <text x={320} y={64} textAnchor="middle" fontSize={26} fontWeight={700} fill={MUTED}>…</text>
            <text x={180} y={126} textAnchor="middle" fontSize={20} fontWeight={700} fill={INK}>4, 7, 10, 13, …</text>
        </svg>
    )
}
