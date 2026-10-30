import { useId, type ReactNode } from 'react'
import { pickText, type LocalizedText, type UnitLanguage } from '../../features/unit-v2/types'
import { Figure, Frac } from '../dbh2-zatikiak-prototype/figures'
import { Label } from '../dbh2-funtzioak-v2/plane'
import { Caption, Formula } from '../dbh2-estatistika-v2/figures'
import { COLORS, INK, LINE, MUTED, PAPER, SECOND, STAGE, STAGE_TINT } from '../dbh2-estatistika-v2/palette'
import { decimalSeparatorFor, thousandsSeparatorFor } from '../../utils/numberFormat'

/* ==========================================================================
   Probabilitatea · 4. DBH akademikoak — lesson figures: the tree of three
   coins, a Venn diagram of ten balls, the Spanish deck with aces, clubs
   and court cards, the relative frequency settling down, the table of two
   dice, a Venn diagram with probabilities, three cards drawn with
   replacement, an urn losing its white balls, the tree of two draws, two
   contingency tables, the tree of a die and two urns, three gold cards
   counted with combinations, the maximum of the dice and a fair game.
   Formulas are written left to right in every language; Arabic labels
   carry words only.
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const pick = (language: UnitLanguage, text: LocalizedText) => pickText(language, text)

/** A decimal for the screen: 0,5 in Spanish and Basque, 0.5 in English and Arabic */
const num = (language: UnitLanguage, value: number | string) => {
    const mark = language === 'ar' ? '.' : decimalSeparatorFor(language)
    return typeof value === 'number' ? String(Math.round(value * 1000) / 1000).replace('.', mark) : value.replace(/,/g, mark)
}

/** Thousands written with a space in the source: 9 880 is 9.880 in Spanish and Basque, 9,880 in English; Arabic keeps the space */
const grouped = (language: UnitLanguage, text: string) => text.replace(/(\d) (?=\d)/g, `$1${language === 'ar' ? ' ' : thousandsSeparatorFor(language)}`)

const RED = '#d9502e'
const GREEN = '#267b53'
const BLUE = '#2f6fdb'
const GOLD = '#e0a100'

/** A letter with a bar on top: the contrary event (the combining macron drifts in SVG fonts) */
export function Bar({ children }: { children: ReactNode }) {
    return <tspan style={{ textDecoration: 'overline' }}>{children}</tspan>
}

/** A letter with a small subscript, then the rest of the line back on the baseline */
function Sub({ letter, index, rest = '' }: { letter: string; index: string; rest?: string }) {
    return (
        <>
            {letter}
            <tspan fontSize="0.7em" dy="0.3em">{index}</tspan>
            <tspan dy="-0.3em">{rest}</tspan>
        </>
    )
}

/** A ball of a colour; white balls get an ink outline */
function Ball({ x, y, r = 13, color }: { x: number; y: number; r?: number; color: string }) {
    return <circle cx={x} cy={y} r={r} fill={color} stroke={INK} strokeWidth={1.6} />
}

const PIPS: Record<number, Array<[number, number]>> = {
    1: [[0, 0]],
    2: [[-1, -1], [1, 1]],
    3: [[-1, -1], [0, 0], [1, 1]],
    4: [[-1, -1], [1, -1], [-1, 1], [1, 1]],
    5: [[-1, -1], [1, -1], [0, 0], [-1, 1], [1, 1]],
    6: [[-1, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [1, 1]]
}

/** A die face with its pips, centred on (x, y) */
export function DieFace({ x, y, value, size = 52, fill = PAPER }: { x: number; y: number; value: number; size?: number; fill?: string }) {
    const step = size * 0.27
    return (
        <g>
            <rect x={x - size / 2} y={y - size / 2} width={size} height={size} rx={size * 0.18} fill={fill} stroke={INK} strokeWidth={2} />
            {PIPS[value].map(([dx, dy], index) => <circle key={index} cx={x + dx * step} cy={y + dy * step} r={size * 0.08} fill={INK} />)}
        </g>
    )
}

/* ---------- 1. Three coins: the sample space as a tree ---------- */

export function CoinsTreeFigure({ language }: { language: UnitLanguage }) {
    const leaves = ['CCC', 'CC+', 'C+C', 'C++', '+CC', '+C+', '++C', '+++']
    const levelX = [150, 270, 390]
    const yAt = (level: number, index: number) => {
        const count = 2 ** (level + 1)
        const gap = 256 / count
        return 20 + gap / 2 + index * gap
    }
    const node = (x: number, y: number, side: string) => (
        <g>
            <circle cx={x} cy={y} r={12} fill={side === 'C' ? STAGE_TINT : PAPER} stroke={INK} strokeWidth={1.6} />
            <text x={x} y={y + 5} textAnchor="middle" fontSize={14} fontWeight={700} fill={INK}>{side}</text>
        </g>
    )
    return (
        <Figure height={310} label={pick(language, say('Hiru txanponen zuhaitz-diagrama', 'Diagrama de árbol de tres monedas', 'المخطط الشجري لثلاث قطع نقدية', 'Tree diagram for three coins'))}>
            <circle cx={40} cy={148} r={6} fill={INK} />
            {[0, 1, 2].map((level) => Array.from({ length: 2 ** (level + 1) }, (_, index) => {
                const x = levelX[level]
                const y = yAt(level, index)
                const parentX = level === 0 ? 46 : levelX[level - 1] + 12
                const parentY = level === 0 ? 148 : yAt(level - 1, Math.floor(index / 2))
                return (
                    <g key={`${level}-${index}`}>
                        <line x1={parentX} y1={parentY} x2={x - 12} y2={y} stroke={INK} strokeWidth={1.4} />
                        {node(x, y, index % 2 === 0 ? 'C' : '+')}
                    </g>
                )
            }))}
            {leaves.map((leaf, index) => {
                const y = yAt(2, index)
                const many = leaf.split('').filter((side) => side === 'C').length >= 2
                return (
                    <g key={leaf}>
                        <rect x={420} y={y - 13} width={70} height={26} rx={6} fill={many ? SECOND : PAPER} fillOpacity={many ? 0.2 : 1} stroke={many ? SECOND : LINE} strokeWidth={1.6} />
                        <text x={455} y={y + 6} textAnchor="middle" fontSize={16} fontWeight={700} fill={INK} direction="ltr" letterSpacing={2}>{leaf}</text>
                    </g>
                )
            })}
            <Formula x={610} y={110} size={22} color={STAGE}>2 · 2 · 2 = 8</Formula>
            <Formula x={610} y={160} size={20} color={SECOND}>4 / 8</Formula>
            <Caption y={298} language={language} text={say('Gutxienez bi C: lagin-espazioko 8 emaitzetatik 4', 'Al menos dos caras: 4 de los 8 resultados del espacio muestral', 'وجهان على الأقل: 4 من النتائج الثماني في فضاء العيّنة', 'At least two heads: 4 of the 8 outcomes in the sample space')} size={14} />
        </Figure>
    )
}

/* ---------- 2. Ten balls: union, intersection and contrary ---------- */

export function VennNumbersFigure({ language }: { language: UnitLanguage }) {
    const clip = useId()
    const spots: Array<[number, number, number]> = [
        [2, 110, 100], [5, 96, 160], [7, 150, 206], [3, 220, 138], [6, 300, 104], [9, 312, 176],
        [1, 52, 46], [4, 388, 46], [8, 52, 236], [10, 384, 236]
    ]
    return (
        <Figure height={300} label={pick(language, say('Gertaeren bildura, ebakidura eta aurkakoa', 'Unión, intersección y contrario de sucesos', 'اتحاد الأحداث وتقاطعها والحدث المعاكس', 'Union, intersection and complementary events'))}>
            <defs>
                <clipPath id={clip}><circle cx={160} cy={140} r={92} /></clipPath>
            </defs>
            <rect x={24} y={18} width={392} height={244} rx={12} fill={PAPER} stroke={INK} strokeWidth={2} />
            <circle cx={160} cy={140} r={92} fill={STAGE_TINT} stroke={STAGE} strokeWidth={2.4} />
            <circle cx={274} cy={140} r={82} fill={STAGE_TINT} stroke={SECOND} strokeWidth={2.4} />
            <circle cx={274} cy={140} r={82} fill={SECOND} fillOpacity={0.3} clipPath={`url(#${clip})`} />
            <circle cx={160} cy={140} r={92} fill="none" stroke={STAGE} strokeWidth={2.4} />
            <text x={84} y={62} fontSize={20} fontWeight={700} fill={STAGE}>A</text>
            <text x={330} y={70} fontSize={20} fontWeight={700} fill={SECOND}>B</text>
            <text x={396} y={140} fontSize={18} fontWeight={700} fill={MUTED} textAnchor="middle">E</text>
            {spots.map(([value, x, y]) => <text key={value} x={x} y={y} textAnchor="middle" fontSize={20} fontWeight={700} fill={INK}>{value}</text>)}
            <Formula x={440} y={56} size={16} anchor="start" color={STAGE}>A = {'{'}2, 3, 5, 7{'}'}</Formula>
            <Formula x={440} y={90} size={16} anchor="start" color={SECOND}>B = {'{'}3, 6, 9{'}'}</Formula>
            <Formula x={440} y={136} size={16} anchor="start">A ∪ B = {'{'}2, 3, 5, 6, 7, 9{'}'}</Formula>
            <Formula x={440} y={170} size={16} anchor="start">A ∩ B = {'{'}3{'}'}</Formula>
            <Formula x={440} y={204} size={16} anchor="start"><Bar>A</Bar> = {'{'}1, 4, 6, 8, 9, 10{'}'}</Formula>
            <Caption y={290} language={language} text={say('Bildura: A-n edo B-n. Ebakidura: bietan. Aurkakoa: A-tik kanpo', 'Unión: en A o en B. Intersección: en los dos. Contrario: fuera de A', 'الاتحاد: في A أو في B. التقاطع: في كليهما. المعاكس: خارج A', 'Union: in A or in B. Intersection: in both. Complementary event: outside A')} size={14} />
        </Figure>
    )
}

/* ---------- 3. The Spanish deck: compatible and incompatible ---------- */

export function DeckEventsFigure({ language }: { language: UnitLanguage }) {
    const suits = [say('Urreak', 'Oros', 'الذهب', 'Coins'), say('Kopak', 'Copas', 'الكؤوس', 'Cups'), say('Ezpatak', 'Espadas', 'السيوف', 'Swords'), say('Bastoiak', 'Bastos', 'العصي', 'Clubs')]
    const values = [1, 2, 3, 4, 5, 6, 7, 10, 11, 12]
    const x = (column: number) => 168 + column * 44
    const y = (row: number) => 44 + row * 38
    return (
        <Figure height={310} label={pick(language, say('Karta-sorta espainiarra', 'La baraja española', 'ورق اللعب الإسباني', 'The Spanish deck'))}>
            {values.map((value, column) => <text key={value} x={x(column) + 19} y={30} textAnchor="middle" fontSize={15} fontWeight={700} fill={column >= 7 ? GOLD : MUTED}>{value}</text>)}
            {suits.map((suit, row) => (
                <g key={row}>
                    <Label x={156} y={y(row) + 21} textAnchor="end" fontSize={15} fontWeight={700} fill={row === 3 ? SECOND : INK}>{pick(language, suit)}</Label>
                    {values.map((value, column) => {
                        const ace = column === 0
                        const club = row === 3
                        const court = column >= 7
                        const fill = ace && club ? '#7a4cc2' : ace ? STAGE : club ? SECOND : court ? GOLD : PAPER
                        return <rect key={value} x={x(column)} y={y(row)} width={38} height={32} rx={5} fill={fill} fillOpacity={fill === PAPER ? 1 : ace && club ? 0.55 : 0.28} stroke={court ? GOLD : LINE} strokeWidth={court ? 2 : 1.4} />
                    })}
                </g>
            ))}
            <rect x={x(0) - 4} y={y(0) - 4} width={46} height={4 * 38 + 2} rx={8} fill="none" stroke={STAGE} strokeWidth={2.6} />
            <rect x={x(0) - 4} y={y(3) - 4} width={10 * 44 + 2} height={40} rx={8} fill="none" stroke={SECOND} strokeWidth={2.6} />
            <Label x={360} y={226} textAnchor="middle" fontSize={15} fontWeight={700} fill={INK}>{pick(language, say('A = batekoa, B = bastoiak: bateragarriak (bastoien batekoa)', 'A = as, B = bastos: compatibles (el as de bastos)', 'A = الآس، B = العصي: متوافقان (آس العصي)', 'A = ace, B = clubs: compatible (the ace of clubs)'))}</Label>
            <Label x={360} y={256} textAnchor="middle" fontSize={15} fontWeight={700} fill={INK}>{pick(language, say('A = batekoa, C = irudia: bateraezinak (ez dago biak den kartarik)', 'A = as, C = figura: incompatibles (ninguna carta es las dos cosas)', 'A = الآس، C = صورة: متنافيان (لا توجد ورقة تجمعهما)', 'A = ace, C = face card: incompatible (no card is both)'))}</Label>
            <Caption y={292} language={language} text={say('40 karta: 4 palo, 10 karta bakoitzean; irudiak 10, 11 eta 12 dira', '40 cartas: 4 palos de 10 cartas; las figuras son el 10, el 11 y el 12', '40 ورقة: 4 أنواع في كل منها 10 أوراق؛ والصور هي 10 و11 و12', '40 cards: 4 suits of 10 cards; the face cards are the 10, 11 and 12')} size={14} />
        </Figure>
    )
}

/* ---------- 4. The relative frequency settles down ---------- */

/** Relative frequency of «point up» after N throws of a drawing pin */
const pinFrequencies: Array<[number, number]> = [[10, 0.6], [20, 0.45], [50, 0.32], [100, 0.41], [200, 0.355], [300, 0.39], [500, 0.372], [700, 0.384], [1000, 0.38]]

export function FrequencyFigure({ language }: { language: UnitLanguage }) {
    const x = (n: number) => 90 + ((Math.log10(n) - 1) / 2) * 540
    const y = (f: number) => 236 - f * 260
    return (
        <Figure height={300} label={pick(language, say('Maiztasun erlatiboa egonkortzen da', 'La frecuencia relativa se estabiliza', 'التكرار النسبي يستقر', 'The relative frequency stabilises'))}>
            {[0, 0.2, 0.4, 0.6, 0.8].map((f) => (
                <g key={f}>
                    <line x1={90} x2={640} y1={y(f)} y2={y(f)} stroke={LINE} strokeWidth={1} />
                    <text x={80} y={y(f) + 5} textAnchor="end" fontSize={14} fill={MUTED}>{num(language, f)}</text>
                </g>
            ))}
            {[10, 100, 1000].map((n) => <text key={n} x={x(n)} y={258} textAnchor="middle" fontSize={14} fill={MUTED}>{n}</text>)}
            <line x1={90} x2={650} y1={236} y2={236} stroke={INK} strokeWidth={2} />
            <line x1={90} x2={90} y1={236} y2={20} stroke={INK} strokeWidth={2} />
            <text x={664} y={241} fontSize={16} fontWeight={700} fill={INK}>N</text>
            <line x1={90} x2={640} y1={y(0.38)} y2={y(0.38)} stroke={SECOND} strokeWidth={2} strokeDasharray="7 5" />
            <Formula x={642} y={y(0.38) - 10} size={16} color={SECOND} anchor="end">P ≈ {num(language, 0.38)}</Formula>
            <polyline points={pinFrequencies.map(([n, f]) => `${x(n)},${y(f)}`).join(' ')} fill="none" stroke={STAGE} strokeWidth={3} strokeLinejoin="round" />
            {pinFrequencies.map(([n, f]) => <circle key={n} cx={x(n)} cy={y(f)} r={4.5} fill={STAGE} />)}
            <Caption y={290} language={language} text={say('Txintxeta: zenbat eta jaurtiketa gehiago, orduan eta egonkorragoa da maiztasun erlatiboa', 'Chincheta: cuantos más lanzamientos, más estable es la frecuencia relativa', 'الدبوس: كلما زادت الرميات استقرّ التكرار النسبي أكثر', 'Drawing pin: the more tosses, the more stable the relative frequency is')} size={14} />
        </Figure>
    )
}

/* ---------- 5. Two dice: 36 equally likely cells ---------- */

export function TwoDiceFigure({ language }: { language: UnitLanguage }) {
    const x = (column: number) => 96 + column * 46
    const y = (row: number) => 46 + row * 36
    return (
        <Figure height={310} label={pick(language, say('Bi daduren 36 emaitzak', 'Los 36 resultados de dos dados', 'النتائج الـ36 لنردين', 'The 36 outcomes of two dice'))}>
            {[1, 2, 3, 4, 5, 6].map((value) => (
                <g key={value}>
                    <text x={x(value - 1) + 21} y={34} textAnchor="middle" fontSize={15} fontWeight={700} fill={MUTED}>{value}</text>
                    <text x={84} y={y(value - 1) + 23} textAnchor="end" fontSize={15} fontWeight={700} fill={MUTED}>{value}</text>
                </g>
            ))}
            {[1, 2, 3, 4, 5, 6].map((a) => [1, 2, 3, 4, 5, 6].map((b) => {
                const total = a + b
                const fill = total === 7 ? SECOND : total === 11 ? STAGE : PAPER
                return (
                    <g key={`${a}-${b}`}>
                        <rect x={x(a - 1)} y={y(b - 1)} width={42} height={32} rx={5} fill={fill} fillOpacity={fill === PAPER ? 1 : 0.25} stroke={fill === PAPER ? LINE : fill} strokeWidth={1.6} />
                        <text x={x(a - 1) + 21} y={y(b - 1) + 22} textAnchor="middle" fontSize={15} fontWeight={700} fill={INK}>{total}</text>
                    </g>
                )
            }))}
            <Label x={530} y={84} textAnchor="middle" fontSize={16} fontWeight={700} fill={SECOND}>{pick(language, say('7 batura', 'Suma 7', 'المجموع 7', 'Sum 7'))}</Label>
            <Formula x={530} y={114} size={19} color={SECOND}>6/36 = 1/6</Formula>
            <Label x={530} y={164} textAnchor="middle" fontSize={16} fontWeight={700} fill={STAGE}>{pick(language, say('11 batura', 'Suma 11', 'المجموع 11', 'Sum 11'))}</Label>
            <Formula x={530} y={194} size={19} color={STAGE}>2/36 = 1/18</Formula>
            <Caption y={296} language={language} text={say('36 laukiak aukera berekoak dira; 2tik 12rako baturak, ez', 'Las 36 casillas son equiprobables; las sumas del 2 al 12, no', 'الخانات الـ36 متساوية الاحتمال، أما المجاميع من 2 إلى 12 فلا', 'The 36 cells are equally likely; the sums from 2 to 12 are not')} size={14} />
        </Figure>
    )
}

/* ---------- 6. A Venn diagram with probabilities ---------- */

export function ProbabilityVennFigure({ language }: { language: UnitLanguage }) {
    const clip = useId()
    return (
        <Figure height={300} label={pick(language, say('Probabilitateak Venn diagrama batean', 'Probabilidades en un diagrama de Venn', 'احتمالات في مخطط فن', 'Probabilities in a Venn diagram'))}>
            <defs>
                <clipPath id={clip}><circle cx={130} cy={136} r={84} /></clipPath>
            </defs>
            <rect x={20} y={20} width={320} height={236} rx={12} fill={PAPER} stroke={INK} strokeWidth={2} />
            <circle cx={130} cy={136} r={84} fill={STAGE_TINT} stroke={STAGE} strokeWidth={2.4} />
            <circle cx={232} cy={136} r={84} fill={STAGE_TINT} stroke={SECOND} strokeWidth={2.4} />
            <circle cx={232} cy={136} r={84} fill={SECOND} fillOpacity={0.3} clipPath={`url(#${clip})`} />
            <circle cx={130} cy={136} r={84} fill="none" stroke={STAGE} strokeWidth={2.4} />
            <text x={62} y={70} fontSize={20} fontWeight={700} fill={STAGE}>A</text>
            <text x={290} y={70} fontSize={20} fontWeight={700} fill={SECOND}>B</text>
            <text x={98} y={142} textAnchor="middle" fontSize={18} fontWeight={700} fill={INK}>{num(language, 0.14)}</text>
            <text x={181} y={142} textAnchor="middle" fontSize={18} fontWeight={700} fill={INK}>{num(language, 0.12)}</text>
            <text x={266} y={142} textAnchor="middle" fontSize={18} fontWeight={700} fill={INK}>{num(language, 0.44)}</text>
            <text x={300} y={242} textAnchor="middle" fontSize={18} fontWeight={700} fill={MUTED}>{num(language, 0.3)}</text>
            <Formula x={530} y={54} size={16}>P(A) = 1 − {num(language, 0.74)} = {num(language, 0.26)}</Formula>
            <Formula x={530} y={96} size={15}>P(A ∪ B) = P(A) + P(B) − P(A ∩ B)</Formula>
            <Formula x={530} y={138} size={16}>{num(language, 0.7)} = {num(language, 0.26)} + P(B) − {num(language, 0.12)}</Formula>
            <Formula x={530} y={184} size={20} color={SECOND}>P(B) = {num(language, 0.56)}</Formula>
            <Formula x={530} y={232} size={15} color={MUTED}>{num(language, 0.14)} + {num(language, 0.12)} + {num(language, 0.44)} + {num(language, 0.3)} = 1</Formula>
            <Caption y={288} language={language} text={say('Ebakidura bitan zenbatzen da: behin kendu behar da', 'La intersección se cuenta dos veces: hay que restarla una vez', 'التقاطع يُحسب مرتين: يجب طرحه مرة', 'The intersection is counted twice: it must be subtracted once')} size={14} />
        </Figure>
    )
}

/* ---------- 7. Three cards with replacement ---------- */

export function ReplacementFigure({ language }: { language: UnitLanguage }) {
    const cards = [
        { x: 130, name: say('batekoa', 'as', 'آس', 'ace'), n: 4, color: STAGE },
        { x: 360, name: say('irudia', 'figura', 'صورة', 'face card'), n: 12, color: GOLD },
        { x: 590, name: say('irudia', 'figura', 'صورة', 'face card'), n: 12, color: GOLD }
    ]
    return (
        <Figure height={300} label={pick(language, say('Hiru karta, itzulita', 'Tres cartas con devolución', 'ثلاث أوراق مع الإرجاع', 'Three cards with replacement'))}>
            {cards.map((card, index) => (
                <g key={index}>
                    <rect x={card.x - 46} y={24} width={92} height={124} rx={10} fill={card.color} fillOpacity={0.18} stroke={card.color} strokeWidth={2.4} />
                    <text x={card.x} y={60} textAnchor="middle" fontSize={16} fontWeight={700} fill={MUTED}>{index + 1}.</text>
                    <Label x={card.x} y={98} textAnchor="middle" fontSize={17} fontWeight={700} fill={INK}>{pick(language, card.name)}</Label>
                    <Frac x={card.x} y={192} n={card.n} d={40} size={20} color={card.color} />
                    {index < 2 && (
                        <g>
                            <path d={`M ${card.x + 56} 70 q 59 -44 118 0`} fill="none" stroke={MUTED} strokeWidth={2} />
                            <path d={`M ${card.x + 166} 62 l 8 8 l -11 3`} fill="none" stroke={MUTED} strokeWidth={2} />
                            <Formula x={card.x + 115} y={110} size={16} color={MUTED}>40</Formula>
                            <Formula x={card.x + 115} y={196} size={22}>·</Formula>
                        </g>
                    )}
                </g>
            ))}
            <Formula x={360} y={258} size={20} color={SECOND}>4/40 · 12/40 · 12/40 = 9/1000</Formula>
            <Caption y={290} language={language} text={say('Karta itzultzean, sortak berriro 40 karta ditu: probabilitateak ez dira aldatzen', 'Al devolver la carta, la baraja vuelve a tener 40: las probabilidades no cambian', 'عند إرجاع الورقة تعود المجموعة إلى 40 ورقة: لا تتغيّر الاحتمالات', 'When the card is put back, the deck has 40 cards again: the probabilities do not change')} size={14} />
        </Figure>
    )
}

/* ---------- 8. An urn losing its white balls ---------- */

export function UrnDrawsFigure({ language }: { language: UnitLanguage }) {
    const steps = [{ white: 3, n: 3, d: 8 }, { white: 2, n: 2, d: 7 }, { white: 1, n: 1, d: 6 }]
    return (
        <Figure height={300} label={pick(language, say('Hiru atera, itzuli gabe', 'Tres extracciones sin devolver', 'ثلاث سحبات دون إرجاع', 'Three draws without replacement'))}>
            {steps.map((step, index) => {
                const cx = 130 + index * 230
                const balls = [...Array.from({ length: 5 }, () => INK), ...Array.from({ length: step.white }, () => PAPER)]
                return (
                    <g key={index}>
                        <path d={`M ${cx - 70} 30 L ${cx - 70} 140 Q ${cx - 70} 160 ${cx - 50} 160 L ${cx + 50} 160 Q ${cx + 70} 160 ${cx + 70} 140 L ${cx + 70} 30`} fill={STAGE_TINT} stroke={INK} strokeWidth={2} />
                        {balls.map((color, ball) => <Ball key={ball} x={cx - 45 + (ball % 4) * 30} y={140 - Math.floor(ball / 4) * 30} color={color} />)}
                        <Frac x={cx} y={204} n={step.n} d={step.d} size={22} color={SECOND} />
                        {index < 2 && <Formula x={cx + 115} y={212} size={24}>·</Formula>}
                    </g>
                )
            })}
            <Formula x={360} y={262} size={20} color={SECOND}>3/8 · 2/7 · 1/6 = 6/336 = 1/56</Formula>
            <Caption y={290} language={language} text={say('Bola zuri bat atera eta ez da itzultzen: hurrengo ateratzean bola bat gutxiago dago', 'Sale una bola blanca y no se devuelve: en la siguiente hay una bola menos', 'تُسحب كرة بيضاء ولا تُعاد: في السحبة التالية كرة أقل', 'A white ball is drawn and not put back: there is one ball fewer for the next draw')} size={14} />
        </Figure>
    )
}

/* ---------- 9. The tree of two draws ---------- */

export function TwoDrawTreeFigure({ language }: { language: UnitLanguage }) {
    const firsts = [{ y: 80, color: RED, n: 3 }, { y: 210, color: GREEN, n: 2 }]
    const leaves = [
        { y: 40, parent: 0, color: RED, n: 2, product: '6/20', tone: STAGE },
        { y: 120, parent: 0, color: GREEN, n: 2, product: '6/20', tone: SECOND },
        { y: 170, parent: 1, color: RED, n: 3, product: '6/20', tone: SECOND },
        { y: 250, parent: 1, color: GREEN, n: 1, product: '2/20', tone: MUTED }
    ]
    return (
        <Figure height={310} label={pick(language, say('Bi atera itzuli gabe: zuhaitza', 'Dos extracciones sin devolver: el árbol', 'سحبتان دون إرجاع: الشجرة', 'Two draws without replacement: the tree diagram'))}>
            <circle cx={50} cy={145} r={6} fill={INK} />
            {firsts.map((first, index) => (
                <g key={index}>
                    <line x1={56} y1={145} x2={196} y2={first.y} stroke={INK} strokeWidth={1.8} />
                    <Frac x={118} y={(145 + first.y) / 2 + (index === 0 ? -22 : 24)} n={first.n} d={5} size={15} />
                    <Ball x={212} y={first.y} r={15} color={first.color} />
                </g>
            ))}
            {leaves.map((leaf, index) => {
                const parent = firsts[leaf.parent]
                return (
                    <g key={index}>
                        <line x1={228} y1={parent.y} x2={376} y2={leaf.y} stroke={leaf.tone === MUTED ? INK : leaf.tone} strokeWidth={leaf.tone === MUTED ? 1.6 : 2.6} />
                        <Frac x={300} y={(parent.y + leaf.y) / 2 + (leaf.y < parent.y ? -24 : 24)} n={leaf.n} d={4} size={15} />
                        <Ball x={392} y={leaf.y} r={15} color={leaf.color} />
                        <Formula x={520} y={leaf.y + 6} size={17} color={leaf.tone}>{`${firsts[leaf.parent].n}/5 · ${leaf.n}/4 = ${leaf.product}`}</Formula>
                    </g>
                )
            })}
            <Caption y={298} language={language} text={say('Bide batean biderkatu; kolore bana: bi bideak batu, 6/20 + 6/20 = 12/20', 'En un camino, multiplica; una de cada color: suma los dos caminos, 6/20 + 6/20 = 12/20', 'في المسار اضرب؛ واحدة من كل لون: اجمع المسارين، 6/20 + 6/20 = 12/20', 'On one path, multiply; one of each colour: add the two paths, 6/20 + 6/20 = 12/20')} size={14} />
        </Figure>
    )
}

/* ---------- 10 and 11. Contingency tables ---------- */

interface TableSpec {
    columns: LocalizedText[]
    rows: Array<{ name: LocalizedText; values: number[] }>
    /** Cells to tint, as [row, column] */
    marks: Array<{ row: number; column: number; color: string }>
    /** A whole column to tint */
    band?: number
}

function TwoWayTable({ language, spec }: { language: UnitLanguage; spec: TableSpec }) {
    const colX = [370, 490, 620]
    const rowY = (row: number) => 92 + row * 42
    return (
        <g>
            {spec.band !== undefined && <rect x={colX[spec.band] - 52} y={30} width={104} height={160} rx={8} fill={STAGE_TINT} />}
            {spec.marks.map((mark, index) => <rect key={index} x={colX[mark.column] - 46} y={rowY(mark.row) - 26} width={92} height={36} rx={8} fill={mark.color} fillOpacity={0.22} stroke={mark.color} strokeWidth={2} />)}
            {spec.columns.map((column, index) => (
                <Label key={index} x={colX[index]} y={52} textAnchor="middle" fontSize={16} fontWeight={700} fill={STAGE}>{pick(language, column)}</Label>
            ))}
            <line x1={40} x2={690} y1={64} y2={64} stroke={INK} strokeWidth={2} />
            <line x1={300} x2={300} y1={30} y2={190} stroke={INK} strokeWidth={2} />
            <line x1={40} x2={690} y1={148} y2={148} stroke={INK} strokeWidth={1.4} />
            <line x1={556} x2={556} y1={30} y2={190} stroke={INK} strokeWidth={1.4} />
            {spec.rows.map((row, rowIndex) => (
                <g key={rowIndex}>
                    <Label x={56} y={rowY(rowIndex)} fontSize={16} fontWeight={700} fill={INK}>{pick(language, row.name)}</Label>
                    {row.values.map((value, index) => (
                        <text key={index} x={colX[index]} y={rowY(rowIndex)} textAnchor="middle" fontSize={17} fontWeight={rowIndex === 2 || index === 2 ? 700 : 400} fill={INK}>{value}</text>
                    ))}
                </g>
            ))}
        </g>
    )
}

export function ContingencyTableFigure({ language }: { language: UnitLanguage }) {
    const spec: TableSpec = {
        columns: [say('DBH', 'ESO', 'الإعدادي', 'ESO'), say('Batxilergoa', 'Bachillerato', 'البكالوريا', 'Bachillerato'), say('Guztira', 'Total', 'المجموع', 'Total')],
        rows: [
            { name: say('Jantokia', 'Comedor', 'المطعم', 'Canteen'), values: [240, 100, 340] },
            { name: say('Jantokirik ez', 'Sin comedor', 'دون المطعم', 'No canteen'), values: [360, 300, 660] },
            { name: say('Guztira', 'Total', 'المجموع', 'Total'), values: [600, 400, 1000] }
        ],
        marks: [{ row: 0, column: 2, color: STAGE }, { row: 1, column: 0, color: SECOND }]
    }
    return (
        <Figure height={300} label={pick(language, say('Kontingentzia-taula', 'Tabla de contingencia', 'جدول التوافق', 'Contingency table'))}>
            <TwoWayTable language={language} spec={spec} />
            <Label x={200} y={226} textAnchor="middle" fontSize={16} fontWeight={700} fill={STAGE}>{pick(language, say('Jantokia', 'Comedor', 'المطعم', 'Canteen'))}</Label>
            <Formula x={200} y={256} size={18} color={STAGE}>340/1000 = {num(language, 0.34)}</Formula>
            <Label x={520} y={226} textAnchor="middle" fontSize={16} fontWeight={700} fill={SECOND}>{pick(language, say('DBH eta jantokirik ez', 'ESO y sin comedor', 'الإعدادي ودون المطعم', 'ESO and no canteen'))}</Label>
            <Formula x={520} y={256} size={18} color={SECOND}>360/1000 = {num(language, 0.36)}</Formula>
            <Caption y={290} language={language} text={say('Guztizkoak lehenik: errenkada eta zutabe bakoitzaren batura', 'Primero los totales: la suma de cada fila y de cada columna', 'المجاميع أولًا: مجموع كل سطر وكل عمود', 'First the totals: the sum of each row and each column')} size={14} />
        </Figure>
    )
}

export function ConditionalFigure({ language }: { language: UnitLanguage }) {
    const spec: TableSpec = {
        columns: [say('Gizonak', 'Hombres', 'الرجال', 'Men'), say('Emakumeak', 'Mujeres', 'النساء', 'Women'), say('Guztira', 'Total', 'المجموع', 'Total')],
        rows: [
            { name: say('Maskotarekin', 'Con mascota', 'مع حيوان أليف', 'With a pet'), values: [40, 25, 65] },
            { name: say('Maskotarik gabe', 'Sin mascota', 'دون حيوان أليف', 'Without a pet'), values: [20, 15, 35] },
            { name: say('Guztira', 'Total', 'المجموع', 'Total'), values: [60, 40, 100] }
        ],
        marks: [{ row: 0, column: 1, color: SECOND }, { row: 2, column: 1, color: STAGE }],
        band: 1
    }
    return (
        <Figure height={300} label={pick(language, say('Probabilitate baldintzatua taula batean', 'Probabilidad condicionada en una tabla', 'الاحتمال المشروط في جدول', 'Conditional probability in a table'))}>
            <TwoWayTable language={language} spec={spec} />
            <Formula x={360} y={230} size={19} color={SECOND}>P(A / M) = 25/40 = {num(language, 0.625)}</Formula>
            <Formula x={360} y={262} size={16} color={MUTED}>P(A) = 65/100 = {num(language, 0.65)}</Formula>
            <Caption y={292} language={language} text={say('M = emakumea, A = maskota. M dakigunean, 40 emakumeak dira kasu posible berriak', 'M = mujer, A = mascota. Si se sabe M, las 40 mujeres son los nuevos casos posibles', 'M = امرأة، A = حيوان أليف. إذا عُلم M فالنساء الأربعون هنّ الحالات الممكنة الجديدة', 'M = woman, A = pet. If M is known, the 40 women are the new possible outcomes')} size={14} />
        </Figure>
    )
}

/* ---------- 12. A die and two urns: total probability ---------- */

export function TotalTreeFigure({ language }: { language: UnitLanguage }) {
    const urns = [{ y: 80, name: 'I', n: 2, red: 2, blue: 3 }, { y: 214, name: 'II', n: 4, red: 4, blue: 1 }]
    return (
        <Figure height={310} label={pick(language, say('Dado bat eta bi kutxa', 'Un dado y dos urnas', 'نرد وجرّتان', 'A die and two urns'))}>
            <DieFace x={48} y={147} value={5} size={44} />
            {urns.map((urn, index) => (
                <g key={urn.name}>
                    <line x1={72} y1={147} x2={192} y2={urn.y} stroke={INK} strokeWidth={1.8} />
                    <Frac x={128} y={(147 + urn.y) / 2 + (index === 0 ? -24 : 26)} n={urn.n} d={6} size={15} />
                    <rect x={194} y={urn.y - 20} width={56} height={40} rx={10} fill={STAGE_TINT} stroke={INK} strokeWidth={1.8} />
                    <text x={222} y={urn.y + 7} textAnchor="middle" fontSize={18} fontWeight={700} fill={INK}>{urn.name}</text>
                    {[{ color: RED, n: urn.red, dy: -36 }, { color: BLUE, n: urn.blue, dy: 36 }].map((branch) => {
                        const y = urn.y + branch.dy
                        const red = branch.color === RED
                        return (
                            <g key={branch.color}>
                                <line x1={250} y1={urn.y} x2={372} y2={y} stroke={red ? SECOND : INK} strokeWidth={red ? 2.8 : 1.6} />
                                <Frac x={306} y={(urn.y + y) / 2 + (branch.dy < 0 ? -26 : 28)} n={branch.n} d={5} size={14} />
                                <Ball x={388} y={y} r={13} color={branch.color} />
                                <Formula x={418} y={y + 6} size={16} anchor="start" color={red ? SECOND : MUTED}>{`${urn.n}/6 · ${branch.n}/5 = ${urn.n * branch.n}/30`}</Formula>
                            </g>
                        )
                    })}
                </g>
            ))}
            <Formula x={600} y={152} size={18} color={SECOND}>4/30 + 16/30 = 2/3</Formula>
            <Caption y={298} language={language} text={say('1 edo 2: I kutxa; bestela, II. Bola gorrira iristen diren bi bideak batu', '1 o 2: urna I; si no, la II. Suma los dos caminos que acaban en roja', '1 أو 2: الجرّة I، وإلا فالجرّة II. اجمع المسارين المنتهيين بكرة حمراء', '1 or 2: urn I; otherwise, urn II. Add the two paths that end in red')} size={14} />
        </Figure>
    )
}

/* ---------- 13. Three gold cards counted with combinations ---------- */

export function CombinationsDeckFigure({ language }: { language: UnitLanguage }) {
    return (
        <Figure height={300} label={pick(language, say('Hiru urre, konbinazioekin', 'Tres oros con combinaciones', 'ثلاث أوراق ذهب بالتوافيق', 'Three cards of coins, using combinations'))}>
            {Array.from({ length: 4 }, (_, row) => Array.from({ length: 10 }, (_, column) => {
                const gold = row === 0
                const picked = gold && [1, 4, 8].includes(column)
                return <rect key={`${row}-${column}`} x={40 + column * 30} y={30 + row * 40} width={24} height={34} rx={4} fill={picked ? SECOND : gold ? GOLD : PAPER} fillOpacity={picked ? 0.6 : gold ? 0.35 : 1} stroke={gold ? GOLD : LINE} strokeWidth={1.6} />
            }))}
            <Label x={190} y={214} textAnchor="middle" fontSize={15} fontWeight={700} fill={GOLD}>{pick(language, say('10 urre, 40 karta', '10 oros, 40 cartas', '10 أوراق ذهب من 40', '10 cards of coins, out of 40'))}</Label>
            <Formula x={530} y={58} size={19} color={GOLD}><Sub letter="C" index="10,3" rest=" = 120" /></Formula>
            <Formula x={530} y={102} size={19}><Sub letter="C" index="40,3" rest={` = ${grouped(language, '9 880')}`} /></Formula>
            <Formula x={530} y={150} size={20} color={SECOND}>P = 120/{grouped(language, '9 880')} = 3/247</Formula>
            <Formula x={530} y={196} size={15} color={MUTED}>10/40 · 9/39 · 8/38 = 3/247</Formula>
            <Caption y={262} language={language} text={say('Aldeko kasuak: 10 urreetatik 3 aukeratzea. Kasu posibleak: 40 kartatik 3', 'Casos favorables: elegir 3 de los 10 oros. Casos posibles: 3 de las 40 cartas', 'الحالات الملائمة: اختيار 3 من 10 أوراق ذهب. والممكنة: 3 من 40 ورقة', 'Favourable cases: choose 3 of the 10 cards of coins. Possible cases: 3 of the 40 cards')} size={14} />
            <Caption y={288} language={language} text={say('Biderkadurarekin emaitza bera ateratzen da', 'Con el producto sale lo mismo', 'وبالضرب نحصل على النتيجة نفسها', 'Using the product gives the same result')} size={14} />
        </Figure>
    )
}

/* ---------- 14. The maximum of the dice ---------- */

export function MaxDiceFigure({ language }: { language: UnitLanguage }) {
    const x = (column: number) => 70 + column * 40
    const y = (row: number) => 30 + row * 36
    return (
        <Figure height={310} label={pick(language, say('Daduen balio handiena', 'La mayor puntuación de los dados', 'أكبر نتيجة للنرد', 'The highest score on the dice'))}>
            {[1, 2, 3, 4, 5, 6].map((a) => [1, 2, 3, 4, 5, 6].map((b) => {
                const top = Math.max(a, b)
                const fill = top <= 3 ? STAGE_TINT : top === 4 ? SECOND : PAPER
                return (
                    <g key={`${a}-${b}`}>
                        <rect x={x(a - 1)} y={y(6 - b)} width={36} height={32} rx={5} fill={fill} fillOpacity={top === 4 ? 0.35 : 1} stroke={top === 4 ? SECOND : LINE} strokeWidth={1.6} />
                        <text x={x(a - 1) + 18} y={y(6 - b) + 21} textAnchor="middle" fontSize={14} fontWeight={700} fill={top <= 4 ? INK : MUTED}>{top}</text>
                    </g>
                )
            }))}
            <Label x={490} y={52} textAnchor="middle" fontSize={16} fontWeight={700} fill={INK}>{pick(language, say('Bi dado', 'Dos dados', 'نردان', 'Two dice'))}</Label>
            <Formula x={490} y={84} size={18}>4² − 3² = 16 − 9 = 7</Formula>
            <Label x={490} y={136} textAnchor="middle" fontSize={16} fontWeight={700} fill={INK}>{pick(language, say('Hiru dado', 'Tres dados', 'ثلاثة نرود', 'Three dice'))}</Label>
            <Formula x={490} y={168} size={18}>4³ − 3³ = 64 − 27 = 37</Formula>
            <Formula x={490} y={216} size={21} color={SECOND}>P = 37/216</Formula>
            <Caption y={262} language={language} text={say('Handiena 4 ≤ dutenak ken handiena 3 ≤ dutenak: handiena justu 4', 'Las de máximo ≤ 4 menos las de máximo ≤ 3: máximo exactamente 4', 'ما أكبره ≤ 4 ناقص ما أكبره ≤ 3: الأكبر 4 تمامًا', 'Those with maximum ≤ 4 minus those with maximum ≤ 3: maximum exactly 4')} size={14} />
            <Caption y={290} language={language} text={say('Hiru daduk 6³ = 216 emaitza ditu, denak aukera berekoak', 'Tres dados tienen 6³ = 216 resultados, todos equiprobables', 'لثلاثة نرود 6³ = 216 نتيجة كلها متساوية الاحتمال', 'Three dice have 6³ = 216 outcomes, all equally likely')} size={14} />
        </Figure>
    )
}

/* ---------- 15. A fair game ---------- */

export function FairGameFigure({ language }: { language: UnitLanguage }) {
    return (
        <Figure height={300} label={pick(language, say('Joko bidezko bat', 'Un juego equitativo', 'لعبة عادلة', 'A fair game'))}>
            {[1, 2, 3, 4, 5, 6].map((value) => {
                const win = value <= 2
                const cx = 90 + (value - 1) * 108
                return (
                    <g key={value}>
                        <DieFace x={cx} y={70} value={value} size={58} fill={win ? '#d6eddf' : '#f6d5cc'} />
                        <Formula x={cx} y={136} size={19} color={win ? GREEN : SECOND}>{win ? '+6 €' : '−3 €'}</Formula>
                    </g>
                )
            })}
            <Formula x={360} y={192} size={20}>6 · 2/6 − 3 · 4/6 = 2 − 2 = 0</Formula>
            <Label x={360} y={236} textAnchor="middle" fontSize={16} fontWeight={700} fill={STAGE}>{pick(language, say('Itxaropena 0 da: jokoa bidezkoa da', 'La esperanza es 0: el juego es equitativo', 'الأمل الرياضي 0: اللعبة عادلة', 'The expected value is 0: the game is fair'))}</Label>
            <Caption y={284} language={language} text={say('Epe luzera, sei jokaldiko: 2 aldiz +6 € eta 4 aldiz −3 €', 'A la larga, de cada seis jugadas: 2 veces +6 € y 4 veces −3 €', 'على المدى الطويل، من كل ست جولات: مرتان +6 € وأربع مرات −3 €', 'In the long run, out of every six plays: 2 times +€6 and 4 times −€3')} size={14} />
        </Figure>
    )
}

/* ---------- Hero art ---------- */

function Card({ x, y, rotate, width, height, fill, children }: { x: number; y: number; rotate: number; width: number; height: number; fill: string; children: ReactNode }) {
    return (
        <g transform={`translate(${x} ${y}) rotate(${rotate} ${width / 2} ${height / 2})`}>
            <rect width={width} height={height} rx={18} fill={fill} stroke={INK} strokeWidth={2.4} />
            {children}
        </g>
    )
}

export function ProbabilityAkHeroArt() {
    return (
        <div className="fraction-v2-collage" aria-hidden="true">
            <svg viewBox="0 0 520 400" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                <Card x={30} y={40} rotate={-4} width={230} height={170} fill={PAPER}>
                    <circle cx={24} cy={85} r={6} fill={INK} />
                    {[0, 1].map((i) => (
                        <g key={i}>
                            <line x1={30} y1={85} x2={96} y2={40 + i * 90} stroke={INK} strokeWidth={2} />
                            <circle cx={106} cy={40 + i * 90} r={11} fill={i === 0 ? RED : GREEN} stroke={INK} strokeWidth={1.6} />
                            {[0, 1].map((j) => (
                                <g key={j}>
                                    <line x1={117} y1={40 + i * 90} x2={180} y2={20 + i * 90 + j * 40} stroke={INK} strokeWidth={1.6} />
                                    <circle cx={190} cy={20 + i * 90 + j * 40} r={9} fill={j === 0 ? RED : GREEN} stroke={INK} strokeWidth={1.4} />
                                </g>
                            ))}
                        </g>
                    ))}
                </Card>
                <Card x={290} y={36} rotate={4} width={200} height={120} fill="#fbebc0">
                    <DieFace x={64} y={60} value={5} size={62} />
                    <DieFace x={142} y={60} value={2} size={62} />
                </Card>
                <Card x={296} y={182} rotate={-3} width={190} height={110} fill="#e8e0f7">
                    <text x={95} y={68} textAnchor="middle" fontSize={32} fontWeight={700} fill={INK} fontFamily="Fraunces, serif">P(A / B)</text>
                </Card>
                <Card x={40} y={238} rotate={2} width={240} height={140} fill="#d6eddf">
                    <circle cx={96} cy={70} r={46} fill={COLORS[0]} fillOpacity={0.25} stroke={INK} strokeWidth={2} />
                    <circle cx={150} cy={70} r={46} fill={COLORS[1]} fillOpacity={0.25} stroke={INK} strokeWidth={2} />
                    <text x={70} y={76} fontSize={20} fontWeight={700} fill={INK}>A</text>
                    <text x={164} y={76} fontSize={20} fontWeight={700} fill={INK}>B</text>
                </Card>
                <Card x={316} y={316} rotate={3} width={170} height={62} fill={PAPER}>
                    <text x={85} y={42} textAnchor="middle" fontSize={24} fontWeight={700} fill={INK} fontFamily="Fraunces, serif">0 ≤ P ≤ 1</text>
                </Card>
            </svg>
        </div>
    )
}
