import type { ReactNode } from 'react'
import { pickText, type LocalizedText, type UnitLanguage } from '../../features/unit-v2/types'
import { Figure } from '../dbh2-zatikiak-prototype/figures'
import { Label } from '../dbh2-funtzioak-v2/plane'
import { Caption, Formula } from '../dbh2-estatistika-v2/figures'
import { COLORS, INK, LINE, MUTED, PAPER, SECOND, STAGE, STAGE_TINT } from '../dbh2-estatistika-v2/palette'

/* ==========================================================================
   Konbinatoria · 4. DBH akademikoak — lesson figures: a tree of menus,
   the product grid, factorials that cancel, slots with and without
   repetition, the podium, the decision chart, the six orders of ABC, a
   block glued together, places for repeated digits, handshakes among five
   people, a subset and its complement, the triangle of Tartaglia, the four
   models side by side, paths on a grid and a committee. Formulas are
   written left to right in every language; Arabic labels carry words only.
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const pick = (language: UnitLanguage, text: LocalizedText) => pickText(language, text)

/** A rounded box with a centred text */
function Chip({ x, y, width = 44, height = 40, fill = PAPER, stroke = INK, children, size = 18 }: { x: number; y: number; width?: number; height?: number; fill?: string; stroke?: string; children: ReactNode; size?: number }) {
    return (
        <g>
            <rect x={x - width / 2} y={y - height / 2} width={width} height={height} rx={8} fill={fill} stroke={stroke} strokeWidth={2} />
            <text x={x} y={y + size * 0.35} textAnchor="middle" fontSize={size} fontWeight={700} fill={INK} direction="ltr">{children}</text>
        </g>
    )
}

/* ---------- 1. A tree of menus ---------- */

export function MenuTreeFigure({ language }: { language: UnitLanguage }) {
    const firsts = [say('Entsalada', 'Ensalada', 'سلطة', 'Salad'), say('Zopa', 'Sopa', 'حساء', 'Soup'), say('Pasta', 'Pasta', 'معكرونة', 'Pasta')]
    const seconds = [say('Arraina', 'Pescado', 'سمك', 'Fish'), say('Haragia', 'Carne', 'لحم', 'Meat')]
    const rootY = 140
    return (
        <Figure height={300} label={pick(language, say('Menuen zuhaitz-diagrama', 'Diagrama de árbol de los menús', 'المخطط الشجري للوجبات', 'Tree diagram of the menus'))}>
            <circle cx={40} cy={rootY} r={7} fill={INK} />
            {firsts.map((first, i) => {
                const y = 50 + i * 90
                return (
                    <g key={i}>
                        <line x1={46} y1={rootY} x2={150} y2={y} stroke={INK} strokeWidth={1.8} />
                        <rect x={150} y={y - 17} width={130} height={34} rx={8} fill={STAGE_TINT} stroke={STAGE} strokeWidth={2} />
                        <Label x={215} y={y + 6} textAnchor="middle" fontSize={15} fontWeight={700} fill={INK}>{pick(language, first)}</Label>
                        {seconds.map((second, j) => {
                            const y2 = y - 20 + j * 40
                            return (
                                <g key={j}>
                                    <line x1={280} y1={y} x2={360} y2={y2} stroke={INK} strokeWidth={1.5} />
                                    <rect x={360} y={y2 - 15} width={120} height={30} rx={8} fill={PAPER} stroke={COLORS[j === 0 ? 0 : 1]} strokeWidth={2} />
                                    <Label x={420} y={y2 + 5} textAnchor="middle" fontSize={14} fontWeight={700} fill={INK}>{pick(language, second)}</Label>
                                    <text x={520} y={y2 + 5} fontSize={15} fontWeight={700} fill={MUTED} direction="ltr">{`${i + 1}${j === 0 ? 'a' : 'b'}`}</text>
                                </g>
                            )
                        })}
                    </g>
                )
            })}
            <Formula x={640} y={150} size={22} color={SECOND}>3 · 2 = 6</Formula>
            <Caption y={290} language={language} text={say('Adar bakoitzaren amaieran menu bat: zuhaitzak denak zenbatzen ditu', 'Al final de cada rama, un menú: el árbol los cuenta todos', 'في نهاية كل فرع وجبة: الشجرة تعدّها كلها', 'At the end of each branch, one menu: the tree counts them all')} size={14} />
        </Figure>
    )
}

/* ---------- 2. The product grid ---------- */

export function ProductGridFigure({ language }: { language: UnitLanguage }) {
    const rows = 4
    const columns = 6
    return (
        <Figure height={290} label={pick(language, say('Biderkaduraren erregela', 'El principio del producto', 'مبدأ الضرب', 'The multiplication principle'))}>
            {Array.from({ length: columns }, (_, c) => <Chip key={`c${c}`} x={190 + c * 62} y={34} width={44} height={36} fill={STAGE_TINT}>{c + 1}</Chip>)}
            {Array.from({ length: rows }, (_, r) => <Chip key={`r${r}`} x={110} y={86 + r * 46} width={44} height={36} fill="#fbebc0">{String.fromCharCode(65 + r)}</Chip>)}
            {Array.from({ length: rows }, (_, r) => Array.from({ length: columns }, (_, c) => (
                <g key={`${r}-${c}`}>
                    <rect x={170 + c * 62} y={70 + r * 46} width={40} height={32} rx={6} fill={r === 1 && c === 3 ? SECOND : PAPER} fillOpacity={r === 1 && c === 3 ? 0.25 : 1} stroke={LINE} strokeWidth={1.4} />
                    <text x={190 + c * 62} y={91 + r * 46} textAnchor="middle" fontSize={13} fontWeight={700} fill={MUTED} direction="ltr">{`${String.fromCharCode(65 + r)}${c + 1}`}</text>
                </g>
            )))}
            <Formula x={600} y={270} size={20} color={SECOND} anchor="end">4 · 6 = 24</Formula>
            <Caption x={290} y={276} language={language} text={say('Lehen aukera bakoitzarekin, bigarrenaren aukera guztiak', 'Con cada opción de la primera, todas las de la segunda', 'مع كل خيار من الأول، كل خيارات الثاني', 'With each option in the first, all the options in the second')} size={14} />
        </Figure>
    )
}

/* ---------- 3. Factorials that cancel ---------- */

export function FactorialFigure({ language }: { language: UnitLanguage }) {
    const top = [8, 7, 6, 5, 4, 3, 2, 1]
    const bottom = [5, 4, 3, 2, 1]
    const x = (index: number) => 170 + index * 58
    return (
        <Figure height={260} label={pick(language, say('Faktorialen zatiketa', 'Cociente de factoriales', 'قسمة المضاريب', 'Quotient of factorials'))}>
            <Formula x={80} y={78} size={26}>8!</Formula>
            <Formula x={80} y={168} size={26}>5!</Formula>
            <line x1={50} x2={640} y1={118} y2={118} stroke={INK} strokeWidth={2.4} />
            {top.map((value, index) => <Chip key={`t${index}`} x={x(index)} y={70} fill={index < 3 ? STAGE_TINT : PAPER}>{value}</Chip>)}
            {bottom.map((value, index) => <Chip key={`b${index}`} x={x(index + 3)} y={164}>{value}</Chip>)}
            {bottom.map((_, index) => (
                <g key={`x${index}`}>
                    <line x1={x(index + 3) - 22} x2={x(index + 3) + 22} y1={92} y2={48} stroke={SECOND} strokeWidth={2.4} />
                    <line x1={x(index + 3) - 22} x2={x(index + 3) + 22} y1={186} y2={142} stroke={SECOND} strokeWidth={2.4} />
                </g>
            ))}
            <Formula x={360} y={222} size={20} color={STAGE}>8! : 5! = 8 · 7 · 6 = 336</Formula>
            <Caption y={250} language={language} text={say('5 · 4 · 3 · 2 · 1 goian eta behean dago: sinplifikatu egiten da', '5 · 4 · 3 · 2 · 1 está arriba y abajo: se simplifica', '5 · 4 · 3 · 2 · 1 في البسط والمقام: يُختصر', '5 · 4 · 3 · 2 · 1 is on top and on the bottom: it cancels out')} size={14} />
        </Figure>
    )
}

/* ---------- 4. Slots with repetition ---------- */

export function RepetitionSlotsFigure({ language }: { language: UnitLanguage }) {
    const digits = ['1', '3', '5', '7', '9']
    return (
        <Figure height={270} label={pick(language, say('Errepikapenezko aldakuntzak', 'Variaciones con repetición', 'التراتيب مع التكرار', 'Arrangements with repetition'))}>
            {[0, 1, 2, 3].map((slot) => (
                <g key={slot}>
                    <rect x={90 + slot * 140} y={30} width={110} height={150} rx={14} fill={PAPER} stroke={INK} strokeWidth={2} />
                    {digits.map((digit, index) => (
                        <text key={digit} x={145 + slot * 140} y={58 + index * 27} textAnchor="middle" fontSize={18} fontWeight={700} fill={index === [2, 1, 0, 2][slot] ? SECOND : MUTED}>{digit}</text>
                    ))}
                    <Formula x={145 + slot * 140} y={206} size={22} color={STAGE}>5</Formula>
                    {slot < 3 && <Formula x={215 + slot * 140} y={206} size={22}>·</Formula>}
                </g>
            ))}
            <Formula x={620} y={206} size={22} color={SECOND} anchor="start">= 625</Formula>
            <Caption y={252} language={language} text={say('Lauki bakoitzean 5 zifra bakoitiak, errepika daitezke: 5315 zenbakia, adibidez', 'En cada casilla las 5 cifras impares, que pueden repetirse: por ejemplo, el 5315', 'في كل خانة الأرقام الفردية الخمسة، ويمكن تكرارها: مثلًا العدد 5315', 'In each slot, the 5 odd digits, which can be repeated: for example, 5315')} size={14} />
        </Figure>
    )
}

/* ---------- 5. The podium: variations without repetition ---------- */

export function PodiumFigure({ language }: { language: UnitLanguage }) {
    const steps = [
        { place: say('Urrea', 'Oro', 'ذهب', 'Gold'), x: 250, height: 120, color: '#e0a100', count: 10 },
        { place: say('Zilarra', 'Plata', 'فضة', 'Silver'), x: 400, height: 90, color: '#8a94a3', count: 9 },
        { place: say('Brontzea', 'Bronce', 'برونز', 'Bronze'), x: 550, height: 64, color: '#b5651d', count: 8 }
    ]
    return (
        <Figure height={290} label={pick(language, say('Hiru sari, hamar liburu', 'Tres premios, diez libros', 'ثلاث جوائز وعشرة كتب', 'Three prizes, ten books'))}>
            {steps.map((step) => (
                <g key={step.x}>
                    <rect x={step.x - 62} y={200 - step.height} width={124} height={step.height} rx={6} fill={step.color} fillOpacity={0.3} stroke={step.color} strokeWidth={2.4} />
                    <Label x={step.x} y={226} textAnchor="middle" fontSize={15} fontWeight={700} fill={INK}>{pick(language, step.place)}</Label>
                    <text x={step.x} y={200 - step.height / 2 + 12} textAnchor="middle" fontSize={34} fontWeight={700} fill={INK}>{step.count}</text>
                </g>
            ))}
            {Array.from({ length: 10 }, (_, index) => <rect key={index} x={72} y={186 - index * 13} width={56} height={10} rx={3} fill={COLORS[index % COLORS.length]} fillOpacity={0.45} stroke={INK} strokeWidth={1} />)}
            <Label x={100} y={226} textAnchor="middle" fontSize={15} fontWeight={700} fill={MUTED}>{pick(language, say('10 liburu', '10 libros', '10 كتب', '10 books'))}</Label>
            <Formula x={400} y={262} size={20} color={SECOND}>10 · 9 · 8 = 720</Formula>
            <Caption y={284} language={language} text={say('Liburu batek ezin ditu bi sari jaso: aukera bat gutxiago urrats bakoitzean', 'Un libro no puede llevar dos premios: una opción menos en cada paso', 'لا يأخذ الكتاب جائزتين: خيار أقل في كل خطوة', 'A book cannot win two prizes: one option fewer at each step')} size={14} />
        </Figure>
    )
}

/* ---------- 6. The decision chart ---------- */

export function DecisionFigure({ language }: { language: UnitLanguage }) {
    const box = (x: number, y: number, text: LocalizedText, color: string) => (
        <g>
            <rect x={x - 85} y={y - 22} width={170} height={44} rx={22} fill={color} fillOpacity={0.15} stroke={color} strokeWidth={2} />
            <Label x={x} y={y + 6} textAnchor="middle" fontSize={15} fontWeight={700} fill={INK}>{pick(language, text)}</Label>
        </g>
    )
    const yes = say('bai', 'sí', 'نعم', 'yes')
    const no = say('ez', 'no', 'لا', 'no')
    return (
        <Figure height={300} label={pick(language, say('Zein eredu?', '¿Qué modelo?', 'أي نموذج؟', 'Which model?'))}>
            {box(360, 34, say('Ordenak axola du?', '¿Importa el orden?', 'هل يهم الترتيب؟', 'Does order matter?'), STAGE)}
            <line x1={300} y1={56} x2={190} y2={110} stroke={INK} strokeWidth={1.8} />
            <line x1={420} y1={56} x2={560} y2={110} stroke={INK} strokeWidth={1.8} />
            <Label x={230} y={78} textAnchor="middle" fontSize={14} fontWeight={700} fill={STAGE}>{pick(language, yes)}</Label>
            <Label x={500} y={78} textAnchor="middle" fontSize={14} fontWeight={700} fill={SECOND}>{pick(language, no)}</Label>
            {box(190, 132, say('Errepika daiteke?', '¿Se repite?', 'هل يتكرر؟', 'Is repetition allowed?'), STAGE)}
            <Chip x={560} y={132} width={110} height={44} fill={STAGE_TINT}>{'C'}</Chip>
            <line x1={150} y1={154} x2={100} y2={210} stroke={INK} strokeWidth={1.8} />
            <line x1={230} y1={154} x2={290} y2={210} stroke={INK} strokeWidth={1.8} />
            <Label x={110} y={182} textAnchor="middle" fontSize={14} fontWeight={700} fill={STAGE}>{pick(language, yes)}</Label>
            <Label x={280} y={182} textAnchor="middle" fontSize={14} fontWeight={700} fill={SECOND}>{pick(language, no)}</Label>
            <Chip x={100} y={232} width={90} height={44} fill={STAGE_TINT}>VR</Chip>
            <Chip x={290} y={232} width={150} height={44} fill={STAGE_TINT}>{'V  ·  P (k = n)'}</Chip>
            <Formula x={560} y={196} size={15} color={MUTED}>C = V : k!</Formula>
            <Caption y={290} language={language} text={say('Bi galdera, eta eredua aukeratuta dago', 'Dos preguntas, y el modelo está elegido', 'سؤالان، ويُختار النموذج', 'Two questions, and the model is chosen')} size={14} />
        </Figure>
    )
}

/* ---------- 6b. Digits with conditions ---------- */

export function ConditionsFigure({ language }: { language: UnitLanguage }) {
    const slots = [
        { count: 9, note: say('0 ez', 'sin el 0', 'دون 0', 'without the 0'), digits: '1 2 3 4 5 6 7 8 9' },
        { count: 9, note: say('lehena ez', 'sin la 1.ª', 'دون الأول', 'without the 1st'), digits: '0 1 2 … 9' },
        { count: 8, note: say('bi horiek ez', 'sin esas dos', 'دون الاثنين', 'without those two'), digits: '0 1 2 … 9' }
    ]
    return (
        <Figure height={270} label={pick(language, say('Hiru zifrako zenbakiak, errepikatu gabe', 'Números de tres cifras sin repetir', 'أعداد من ثلاثة أرقام دون تكرار', 'Three-digit numbers with no repeated digits'))}>
            {slots.map((slot, index) => (
                <g key={index}>
                    <rect x={70 + index * 200} y={30} width={160} height={110} rx={16} fill={index === 0 ? '#fbebc0' : PAPER} stroke={INK} strokeWidth={2} />
                    <text x={150 + index * 200} y={78} textAnchor="middle" fontSize={40} fontWeight={700} fill={STAGE}>{slot.count}</text>
                    <text x={150 + index * 200} y={118} textAnchor="middle" fontSize={13} fill={MUTED} direction="ltr">{slot.digits}</text>
                    <Label x={150 + index * 200} y={166} textAnchor="middle" fontSize={15} fontWeight={700} fill={index === 0 ? SECOND : INK}>{pick(language, slot.note)}</Label>
                </g>
            ))}
            <Formula x={360} y={214} size={22} color={SECOND}>9 · 9 · 8 = 648</Formula>
            <Caption y={256} language={language} text={say('Hasi baldintza duen laukitik: lehen zifra ezin da 0 izan', 'Empieza por la casilla con condición: la primera cifra no puede ser 0', 'ابدأ بالخانة ذات الشرط: الرقم الأول لا يكون 0', 'Start with the slot that has a condition: the first digit cannot be 0')} size={14} />
        </Figure>
    )
}

/* ---------- 7. The six orders of A, B, C ---------- */

export function OrdersFigure({ language }: { language: UnitLanguage }) {
    const orders = ['ABC', 'ACB', 'BAC', 'BCA', 'CAB', 'CBA']
    const colors: Record<string, string> = { A: COLORS[0], B: COLORS[1], C: COLORS[3] }
    return (
        <Figure height={260} label={pick(language, say('Hiru letren ordenak', 'Los órdenes de tres letras', 'ترتيبات ثلاثة أحرف', 'The orderings of three letters'))}>
            {orders.map((order, index) => (
                <g key={order}>
                    {order.split('').map((letter, position) => (
                        <g key={position}>
                            <rect x={60 + (index % 3) * 220 + position * 46} y={34 + Math.floor(index / 3) * 80} width={40} height={44} rx={8} fill={colors[letter]} fillOpacity={0.2} stroke={colors[letter]} strokeWidth={2} />
                            <text x={80 + (index % 3) * 220 + position * 46} y={63 + Math.floor(index / 3) * 80} textAnchor="middle" fontSize={20} fontWeight={700} fill={INK}>{letter}</text>
                        </g>
                    ))}
                </g>
            ))}
            <Formula x={360} y={214} size={22} color={SECOND}>P₃ = 3! = 3 · 2 · 1 = 6</Formula>
            <Caption y={248} language={language} text={say('Elementu guztiak, ordena desberdinetan, errepikatu gabe', 'Todos los elementos, en distinto orden, sin repetir', 'كل العناصر بترتيبات مختلفة دون تكرار', 'All the elements, in a different order, with no repetition')} size={14} />
        </Figure>
    )
}

/* ---------- 8. A block glued together ---------- */

export function BlockFigure({ language }: { language: UnitLanguage }) {
    const people = ['A', 'B', 'C', 'D', 'E']
    return (
        <Figure height={260} label={pick(language, say('Bi lagun elkarrekin', 'Dos amigos juntos', 'صديقان معًا', 'Two friends together'))}>
            <rect x={96} y={36} width={124} height={64} rx={14} fill="none" stroke={SECOND} strokeWidth={3} strokeDasharray="7 5" />
            {people.map((person, index) => (
                <g key={person}>
                    <circle cx={128 + index * 60 + (index >= 2 ? 40 : 0)} cy={68} r={24} fill={index < 2 ? SECOND : STAGE} fillOpacity={0.2} stroke={index < 2 ? SECOND : STAGE} strokeWidth={2} />
                    <text x={128 + index * 60 + (index >= 2 ? 40 : 0)} y={75} textAnchor="middle" fontSize={20} fontWeight={700} fill={INK}>{person}</text>
                </g>
            ))}
            <Formula x={158} y={130} size={16} color={SECOND}>AB · BA</Formula>
            <Formula x={360} y={130} size={16} color={STAGE}>[AB], C, D, E → 4!</Formula>
            <Formula x={360} y={190} size={22} color={SECOND}>2 · 4! = 2 · 24 = 48</Formula>
            <Caption y={246} language={language} text={say('Bikotea elementu bakar bat bezala ordenatu, eta gero barrutik ordenatu', 'Ordena la pareja como un solo elemento y después por dentro', 'رتّب الزوج كعنصر واحد ثم رتّبه من الداخل', 'Arrange the pair as a single element, then the two inside it')} size={14} />
        </Figure>
    )
}

/* ---------- 9. Places for repeated digits ---------- */

export function RepeatedDigitsFigure({ language }: { language: UnitLanguage }) {
    const rows = ['5555333', '5553533', '3335555']
    return (
        <Figure height={270} label={pick(language, say('Zifra errepikatuak', 'Cifras repetidas', 'أرقام مكررة', 'Repeated digits'))}>
            {rows.map((row, r) => (
                <g key={row}>
                    {row.split('').map((digit, index) => (
                        <Chip key={index} x={120 + index * 52} y={38 + r * 54} width={44} height={42} fill={digit === '5' ? STAGE_TINT : '#fbebc0'}>{digit}</Chip>
                    ))}
                </g>
            ))}
            <Formula x={530} y={92} size={26} color={MUTED} anchor="start">⋮</Formula>
            <Formula x={360} y={212} size={20} color={SECOND}>7! : (4! · 3!) = 35</Formula>
            <Caption y={252} language={language} text={say('Nahikoa da lau bostak non dauden aukeratzea: 7tik 4 leku', 'Basta elegir dónde van los cuatro cincos: 4 lugares de 7', 'يكفي اختيار أماكن الخمسات الأربع: 4 أماكن من 7', 'Just choose where the four 5s go: 4 places out of 7')} size={14} />
        </Figure>
    )
}

/* ---------- 10. Handshakes among five people ---------- */

export function HandshakeFigure({ language }: { language: UnitLanguage }) {
    const points = Array.from({ length: 5 }, (_, index) => {
        const angle = -Math.PI / 2 + (index * 2 * Math.PI) / 5
        return [200 + 100 * Math.cos(angle), 132 + 100 * Math.sin(angle)]
    })
    const segments: Array<[number, number]> = []
    for (let i = 0; i < 5; i += 1) for (let j = i + 1; j < 5; j += 1) segments.push([i, j])
    return (
        <Figure height={290} label={pick(language, say('Bost lagunen eskuemateak', 'Los apretones de manos de cinco personas', 'مصافحات خمسة أشخاص', 'The handshakes of five people'))}>
            {segments.map(([i, j], index) => <line key={index} x1={points[i][0]} y1={points[i][1]} x2={points[j][0]} y2={points[j][1]} stroke={index === 0 ? SECOND : STAGE} strokeWidth={index === 0 ? 3.4 : 2} strokeOpacity={index === 0 ? 1 : 0.6} />)}
            {points.map(([cx, cy], index) => (
                <g key={index}>
                    <circle cx={cx} cy={cy} r={18} fill={PAPER} stroke={INK} strokeWidth={2} />
                    <text x={cx} y={cy + 6} textAnchor="middle" fontSize={17} fontWeight={700} fill={INK}>{String.fromCharCode(65 + index)}</text>
                </g>
            ))}
            <Formula x={530} y={90} size={20}>5 · 4 = 20</Formula>
            <Formula x={530} y={130} size={16} color={MUTED}>AB = BA</Formula>
            <Formula x={530} y={176} size={22} color={SECOND}>20 : 2 = 10</Formula>
            <Caption y={280} language={language} text={say('Lerro bakoitza bikote bat da: ordenak ez du axola', 'Cada segmento es una pareja: el orden no importa', 'كل قطعة زوج: الترتيب لا يهم', 'Each segment is a pair: order does not matter')} size={14} />
        </Figure>
    )
}

/* ---------- 11. A subset and its complement ---------- */

export function ComplementFigure({ language }: { language: UnitLanguage }) {
    const items = ['A', 'B', 'C', 'D', 'E']
    const chosen = [0, 3]
    return (
        <Figure height={260} label={pick(language, say('Aukeratu 2 = utzi 3', 'Elegir 2 = dejar 3', 'اختيار 2 = ترك 3', 'Choosing 2 = leaving 3'))}>
            <rect x={70} y={30} width={580} height={86} rx={20} fill="none" stroke={INK} strokeWidth={2} />
            {items.map((item, index) => {
                const on = chosen.includes(index)
                return <Chip key={item} x={140 + index * 110} y={73} width={60} height={52} fill={on ? STAGE_TINT : '#fbebc0'} stroke={on ? STAGE : COLORS[2]}>{item}</Chip>
            })}
            <Label x={210} y={150} textAnchor="middle" fontSize={15} fontWeight={700} fill={STAGE}>{pick(language, say('aukeratuak: 2', 'elegidos: 2', 'المختارة: 2', 'chosen: 2'))}</Label>
            <Label x={500} y={150} textAnchor="middle" fontSize={15} fontWeight={700} fill={COLORS[2]}>{pick(language, say('utziak: 3', 'dejados: 3', 'المتروكة: 3', 'left out: 3'))}</Label>
            <Formula x={360} y={204} size={22} color={SECOND}>C<tspan fontSize="0.7em" dy="0.3em">5,2</tspan><tspan dy="-0.3em"> = C</tspan><tspan fontSize="0.7em" dy="0.3em">5,3</tspan><tspan dy="-0.3em"> = 10</tspan></Formula>
            <Caption y={248} language={language} text={say('2 aukeratzean, beste 3ak uzten dira: aukera kopuru bera', 'Al elegir 2 se dejan los otros 3: el mismo número de formas', 'عند اختيار 2 نترك الثلاثة الأخرى: العدد نفسه من الطرق', 'When you choose 2, the other 3 are left: the same number of ways')} size={14} />
        </Figure>
    )
}

/* ---------- 12. The triangle of Tartaglia ---------- */

function binomial(n: number, k: number) {
    let value = 1
    for (let i = 1; i <= k; i += 1) value = (value * (n - k + i)) / i
    return Math.round(value)
}

export function PascalFigure({ language }: { language: UnitLanguage }) {
    const rows = 7
    return (
        <Figure height={320} label={pick(language, say('Tartagliaren triangelua', 'El triángulo de Tartaglia', 'مثلث تارتاليا', 'Tartaglia\'s triangle'))}>
            {Array.from({ length: rows }, (_, n) => Array.from({ length: n + 1 }, (_, k) => {
                const x = 300 + (k - n / 2) * 60
                const y = 30 + n * 38
                const highlight = n === 5 && (k === 2 || k === 3)
                const sum = n === 6 && k === 3
                return <Chip key={`${n}-${k}`} x={x} y={y} width={46} height={30} size={15} fill={sum ? '#f6d5cc' : highlight ? STAGE_TINT : PAPER} stroke={sum ? SECOND : highlight ? STAGE : LINE}>{binomial(n, k)}</Chip>
            }))}
            {Array.from({ length: rows }, (_, n) => <Formula key={n} x={640} y={36 + n * 38} size={14} color={MUTED} anchor="end">{`Σ = ${2 ** n}`}</Formula>)}
            <Formula x={300} y={300} size={17} color={SECOND}>10 + 10 = 20</Formula>
            <Caption x={540} y={304} language={language} text={say('Bakoitza, gaineko bien batura', 'Cada uno, la suma de los dos de encima', 'كل عدد مجموع العددين فوقه', 'Each number is the sum of the two above it')} size={13} />
        </Figure>
    )
}

/* ---------- 14. Paths on a grid ---------- */

export function GridPathFigure({ language }: { language: UnitLanguage }) {
    const columns = 5
    const rows = 3
    const step = 64
    const x = (c: number) => 120 + c * step
    const y = (r: number) => 210 - r * step
    const path: Array<[number, number]> = [[0, 0], [1, 0], [1, 1], [2, 1], [3, 1], [3, 2], [4, 2], [5, 2], [5, 3]]
    return (
        <Figure height={290} label={pick(language, say('Sareko bideak', 'Caminos en una cuadrícula', 'مسارات في شبكة', 'Paths on a grid'))}>
            {Array.from({ length: columns + 1 }, (_, c) => <line key={`v${c}`} x1={x(c)} x2={x(c)} y1={y(0)} y2={y(rows)} stroke={LINE} strokeWidth={2} />)}
            {Array.from({ length: rows + 1 }, (_, r) => <line key={`h${r}`} x1={x(0)} x2={x(columns)} y1={y(r)} y2={y(r)} stroke={LINE} strokeWidth={2} />)}
            <polyline points={path.map(([c, r]) => `${x(c)},${y(r)}`).join(' ')} fill="none" stroke={SECOND} strokeWidth={4} strokeLinejoin="round" />
            <circle cx={x(0)} cy={y(0)} r={9} fill={STAGE} />
            <circle cx={x(columns)} cy={y(rows)} r={9} fill={SECOND} />
            <Formula x={x(0)} y={y(0) + 30} size={16} color={STAGE}>A</Formula>
            <Formula x={x(columns)} y={y(rows) - 16} size={16} color={SECOND}>B</Formula>
            <Formula x={585} y={110} size={16}>→ ↑ → → ↑ → → ↑</Formula>
            <Formula x={585} y={160} size={20} color={SECOND}>C<tspan fontSize="0.7em" dy="0.3em">8,3</tspan><tspan dy="-0.3em"> = 56</tspan></Formula>
            <Caption y={278} language={language} text={say('Bide bakoitza 8 urrats dira: 3 gora eta 5 eskuinera. Aukeratu noiz igo', 'Cada camino son 8 pasos: 3 hacia arriba y 5 a la derecha. Elige cuándo subir', 'كل مسار 8 خطوات: 3 إلى الأعلى و5 إلى اليمين. اختر متى تصعد', 'Each path is 8 steps: 3 up and 5 to the right. Choose when to go up')} size={14} />
        </Figure>
    )
}

/* ---------- 15. A committee ---------- */

export function CommitteeFigure({ language }: { language: UnitLanguage }) {
    return (
        <Figure height={270} label={pick(language, say('Batzorde bat', 'Una comisión', 'لجنة', 'A committee'))}>
            {Array.from({ length: 5 }, (_, index) => (
                <g key={`b${index}`}>
                    <circle cx={100 + index * 52} cy={70} r={20} fill={index < 2 ? STAGE : PAPER} fillOpacity={index < 2 ? 0.35 : 1} stroke={STAGE} strokeWidth={2} />
                </g>
            ))}
            {Array.from({ length: 4 }, (_, index) => (
                <g key={`g${index}`}>
                    <circle cx={430 + index * 52} cy={70} r={20} fill={index < 3 ? SECOND : PAPER} fillOpacity={index < 3 ? 0.35 : 1} stroke={SECOND} strokeWidth={2} />
                </g>
            ))}
            <Formula x={204} y={130} size={20} color={STAGE}>C<tspan fontSize="0.7em" dy="0.3em">5,2</tspan><tspan dy="-0.3em"> = 10</tspan></Formula>
            <Formula x={508} y={130} size={20} color={SECOND}>C<tspan fontSize="0.7em" dy="0.3em">4,3</tspan><tspan dy="-0.3em"> = 4</tspan></Formula>
            <Formula x={360} y={130} size={22}>·</Formula>
            <Formula x={360} y={196} size={24} color={INK}>10 · 4 = 40</Formula>
            <Caption y={252} language={language} text={say('5 mutiletatik 2 eta 4 neskatatik 3: aukeraketa bakoitza bestearekin konbinatu', '2 de 5 chicos y 3 de 4 chicas: cada elección se combina con la otra', '2 من 5 أولاد و3 من 4 بنات: كل اختيار يُقرن بالآخر', '2 of 5 boys and 3 of 4 girls: each choice is combined with the other')} size={14} />
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

export function CombinatoricsAkHeroArt() {
    return (
        <div className="fraction-v2-collage" aria-hidden="true">
            <svg viewBox="0 0 520 400" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                <Card x={30} y={40} rotate={-4} width={230} height={170} fill={PAPER}>
                    <circle cx={24} cy={85} r={6} fill={INK} />
                    {[0, 1, 2].map((i) => (
                        <g key={i}>
                            <line x1={30} y1={85} x2={100} y2={30 + i * 55} stroke={INK} strokeWidth={2} />
                            <circle cx={108} cy={30 + i * 55} r={9} fill="#dde7f7" stroke={INK} strokeWidth={1.6} />
                            {[0, 1].map((j) => (
                                <g key={j}>
                                    <line x1={116} y1={30 + i * 55} x2={180} y2={18 + i * 55 + j * 24} stroke={INK} strokeWidth={1.6} />
                                    <circle cx={188} cy={18 + i * 55 + j * 24} r={7} fill={j === 0 ? '#fbebc0' : '#f6d5cc'} stroke={INK} strokeWidth={1.4} />
                                </g>
                            ))}
                        </g>
                    ))}
                </Card>
                <Card x={290} y={40} rotate={4} width={200} height={110} fill="#fbebc0">
                    <text x={100} y={70} textAnchor="middle" fontSize={44} fontWeight={700} fill={INK} fontFamily="Fraunces, serif">n!</text>
                </Card>
                <Card x={296} y={176} rotate={-3} width={190} height={110} fill="#e8e0f7">
                    <text x={95} y={68} textAnchor="middle" fontSize={34} fontWeight={700} fill={INK} fontFamily="Fraunces, serif">V · P · C</text>
                </Card>
                <Card x={40} y={238} rotate={2} width={240} height={140} fill="#d6eddf">
                    {[[1], [1, 1], [1, 2, 1], [1, 3, 3, 1]].map((row, n) => row.map((value, k) => (
                        <text key={`${n}-${k}`} x={120 + (k - n / 2) * 40} y={32 + n * 30} textAnchor="middle" fontSize={20} fontWeight={700} fill={INK}>{value}</text>
                    )))}
                </Card>
                <Card x={316} y={308} rotate={3} width={170} height={66} fill={PAPER}>
                    <text x={85} y={44} textAnchor="middle" fontSize={24} fontWeight={700} fill={INK} fontFamily="Fraunces, serif">AB ≠ BA</text>
                </Card>
            </svg>
        </div>
    )
}
