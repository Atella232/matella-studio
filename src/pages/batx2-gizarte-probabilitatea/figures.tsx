import { useId, type ReactNode } from 'react'
import { pickText, type LocalizedText, type UnitLanguage } from '../../features/unit-v2/types'
import { Figure, Frac } from '../dbh2-zatikiak-prototype/figures'
import { Label } from '../dbh2-funtzioak-v2/plane'
import { Caption, Formula } from '../dbh2-estatistika-v2/figures'
import { INK, LINE, MUTED, PAPER, SECOND, STAGE, STAGE_TINT, num } from '../dbh2-estatistika-v2/palette'

/* ==========================================================================
   Probabilitatea · Batxilergoa 2 · Gizarte Zientziak — lesson figures.
   Each one draws the numbers of its «Let's solve»: the three posts of an
   association, five speeches in a row, six lists that are one committee,
   the committee drawn by lot, the ten turns in a Venn diagram, the poll
   as a 100 % bar, the dogs and cats, the cinema and the theatre, the
   transport table, the referendum table, the square of two independent
   features, the office tree, the warehouses tree, the prior and posterior
   bars and the 10 000 people of a screening. Formulas are written left to
   right in every language; Arabic words go through Label.
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const pick = (language: UnitLanguage, text: LocalizedText) => pickText(language, text)

const GOLD = '#e0a100'
const GREEN = '#267b53'

/** A word or short phrase in the language of the page, centred */
function Word({ x, y, language, text, size = 15, color = INK, anchor = 'middle' }: { x: number; y: number; language: UnitLanguage; text: LocalizedText; size?: number; color?: string; anchor?: 'start' | 'middle' | 'end' }) {
    return <Label x={x} y={y} textAnchor={anchor} fontSize={size} fontWeight={700} fill={color}>{pick(language, text)}</Label>
}

/** A person: a head and shoulders, filled with a colour */
function Person({ x, y, color, scale = 1 }: { x: number; y: number; color: string; scale?: number }) {
    return (
        <g transform={`translate(${x} ${y}) scale(${scale})`}>
            <circle cx={0} cy={-14} r={8} fill={color} stroke={INK} strokeWidth={1.4} />
            <path d="M -13 12 Q -13 -4 0 -4 Q 13 -4 13 12 Z" fill={color} stroke={INK} strokeWidth={1.4} />
        </g>
    )
}

interface Circle { x: number; y: number; r: number }

/** The whole population as a box with two circles A and B; the common zone is tinted with the second colour */
function Venn({ box, a, b, children }: { box: [number, number, number, number]; a: Circle; b: Circle; children?: ReactNode }) {
    const clip = useId()
    const [x, y, width, height] = box
    return (
        <g>
            <defs>
                <clipPath id={clip}><circle cx={a.x} cy={a.y} r={a.r} /></clipPath>
            </defs>
            <rect x={x} y={y} width={width} height={height} rx={12} fill={PAPER} stroke={INK} strokeWidth={2} />
            <circle cx={a.x} cy={a.y} r={a.r} fill={STAGE_TINT} stroke={STAGE} strokeWidth={2.4} />
            <circle cx={b.x} cy={b.y} r={b.r} fill={STAGE_TINT} stroke={SECOND} strokeWidth={2.4} />
            <circle cx={b.x} cy={b.y} r={b.r} fill={SECOND} fillOpacity={0.3} clipPath={`url(#${clip})`} />
            <circle cx={a.x} cy={a.y} r={a.r} fill="none" stroke={STAGE} strokeWidth={2.4} />
            <text x={a.x - a.r * 0.78} y={a.y - a.r * 0.72} fontSize={20} fontWeight={700} fill={STAGE} textAnchor="middle">A</text>
            <text x={b.x + b.r * 0.78} y={b.y - b.r * 0.72} fontSize={20} fontWeight={700} fill={SECOND} textAnchor="middle">B</text>
            {children}
        </g>
    )
}

/** The standard Venn of these figures: four values, one per zone */
function FourZones({ language, onlyA, both, onlyB, none }: { language: UnitLanguage; onlyA: string; both: string; onlyB: string; none: string }) {
    return (
        <Venn box={[20, 20, 400, 250]} a={{ x: 165, y: 148, r: 96 }} b={{ x: 275, y: 148, r: 96 }}>
            <text x={115} y={156} textAnchor="middle" fontSize={20} fontWeight={700} fill={INK}>{num(language, onlyA)}</text>
            <text x={220} y={156} textAnchor="middle" fontSize={20} fontWeight={700} fill={SECOND}>{num(language, both)}</text>
            <text x={325} y={156} textAnchor="middle" fontSize={20} fontWeight={700} fill={INK}>{num(language, onlyB)}</text>
            <text x={384} y={252} textAnchor="middle" fontSize={18} fontWeight={700} fill={MUTED}>{num(language, none)}</text>
        </Venn>
    )
}

/** A two-way table: header row, two body rows and a total row; the highlighted cells are drawn in the second colour */
function Table({ language, columns, rows, highlight = [], highlightRow }: { language: UnitLanguage; columns: LocalizedText[]; rows: Array<{ name: LocalizedText; values: number[] }>; highlight?: Array<[number, number]>; highlightRow?: number }) {
    const x0 = 40
    const first = 190
    const width = 150
    const top = 30
    const height = 50
    const isHot = (row: number, column: number) => highlight.some(([r, c]) => r === row && c === column)
    return (
        <g>
            {columns.map((column, index) => (
                <Word key={index} x={x0 + first + width * index + width / 2} y={top + 32} language={language} text={column} color={MUTED} />
            ))}
            {rows.map((row, r) => {
                const y = top + height * (r + 1)
                const total = r === rows.length - 1
                return (
                    <g key={r}>
                        {highlightRow === r && <rect x={x0} y={y} width={first + width * row.values.length} height={height} fill={SECOND} fillOpacity={0.12} />}
                        <Word x={x0 + 10} y={y + 32} language={language} text={row.name} anchor="start" color={total ? MUTED : INK} />
                        {row.values.map((value, c) => (
                            <g key={c}>
                                <rect x={x0 + first + width * c} y={y} width={width} height={height} fill={isHot(r, c) ? SECOND : 'none'} fillOpacity={isHot(r, c) ? 0.28 : 0} stroke={LINE} strokeWidth={1.4} />
                                <text x={x0 + first + width * c + width / 2} y={y + 32} textAnchor="middle" fontSize={20} fontWeight={700} fill={total || c === row.values.length - 1 ? MUTED : INK}>{value}</text>
                            </g>
                        ))}
                    </g>
                )
            })}
            <rect x={x0 + first} y={top + height} width={width * columns.length} height={height * rows.length} fill="none" stroke={INK} strokeWidth={2} />
        </g>
    )
}

/** A node of a tree with its name in a rounded box */
function Node({ x, y, children, color = INK }: { x: number; y: number; children: ReactNode; color?: string }) {
    return (
        <g>
            <rect x={x - 22} y={y - 17} width={44} height={34} rx={10} fill={PAPER} stroke={color} strokeWidth={2} />
            <text x={x} y={y + 7} textAnchor="middle" fontSize={18} fontWeight={700} fill={color}>{children}</text>
        </g>
    )
}

/* ---------- 1. Arrangements: three posts among 12 ---------- */

export function PodiumFigure({ language }: { language: UnitLanguage }) {
    const posts = [
        { text: say('Lehendakaria', 'Presidente', 'الرئيس', 'President'), options: 12, height: 120 },
        { text: say('Idazkaria', 'Secretario', 'أمين السر', 'Secretary'), options: 11, height: 90 },
        { text: say('Diruzaina', 'Tesorero', 'أمين الصندوق', 'Treasurer'), options: 10, height: 70 }
    ]
    return (
        <Figure height={290} label={pick(language, say('Hiru kargu 12 bazkideren artean', 'Tres cargos entre 12 socios', 'ثلاثة مناصب بين 12 عضوًا', 'Three posts among 12 members'))}>
            {posts.map((post, index) => {
                const x = 90 + index * 200
                const base = 220
                return (
                    <g key={index}>
                        <rect x={x} y={base - post.height} width={150} height={post.height} rx={8} fill={index === 0 ? GOLD : STAGE_TINT} fillOpacity={index === 0 ? 0.35 : 1} stroke={INK} strokeWidth={2} />
                        <text x={x + 75} y={base - post.height / 2 + 12} textAnchor="middle" fontSize={34} fontWeight={700} fill={STAGE}>{post.options}</text>
                        <Word x={x + 75} y={base + 24} language={language} text={post.text} size={15} />
                        {index < 2 && <text x={x + 175} y={base - 50} textAnchor="middle" fontSize={26} fontWeight={700} fill={MUTED}>·</text>}
                    </g>
                )
            })}
            <Formula x={360} y={278} size={20} color={SECOND}>12 · 11 · 10 = 1320</Formula>
        </Figure>
    )
}

/* ---------- 2. Permutations: five speeches in a row ---------- */

export function SpeechesFigure({ language }: { language: UnitLanguage }) {
    const choices = [5, 4, 3, 2, 1]
    return (
        <Figure height={250} label={pick(language, say('Bost hitzaldi, bata bestearen atzetik', 'Cinco mítines, uno detrás de otro', 'خمسة خطابات واحدًا بعد الآخر', 'Five speeches, one after the other'))}>
            {choices.map((choice, index) => {
                const x = 60 + index * 125
                return (
                    <g key={index}>
                        <rect x={x} y={50} width={100} height={90} rx={10} fill={STAGE_TINT} stroke={INK} strokeWidth={2} />
                        <text x={x + 50} y={108} textAnchor="middle" fontSize={34} fontWeight={700} fill={STAGE}>{choice}</text>
                        <text x={x + 50} y={38} textAnchor="middle" fontSize={15} fontWeight={700} fill={MUTED}>{index + 1}.</text>
                        {index < 4 && <text x={x + 112} y={104} textAnchor="middle" fontSize={24} fontWeight={700} fill={MUTED}>·</text>}
                    </g>
                )
            })}
            <Caption y={180} language={language} text={say('Txanda bakoitzean, hautagai bat gutxiago', 'En cada turno, un candidato menos', 'في كل دور مرشح أقل', 'One candidate fewer at each turn')} />
            <Formula x={360} y={228} size={21} color={SECOND}>P₅ = 5! = 120</Formula>
        </Figure>
    )
}

/* ---------- 3. Combinations: six lists, one committee ---------- */

export function CommitteeFigure({ language }: { language: UnitLanguage }) {
    const lists = ['ABC', 'ACB', 'BAC', 'BCA', 'CAB', 'CBA']
    return (
        <Figure height={280} label={pick(language, say('Sei zerrenda, batzorde bakarra', 'Seis listas, una sola comisión', 'ست قوائم ولجنة واحدة', 'Six lists, one committee'))}>
            {lists.map((list, index) => {
                const y = 34 + index * 36
                return (
                    <g key={list}>
                        <rect x={60} y={y - 22} width={120} height={30} rx={6} fill={STAGE_TINT} stroke={LINE} strokeWidth={1.4} />
                        <text x={120} y={y} textAnchor="middle" fontSize={18} fontWeight={700} fill={STAGE} letterSpacing={6}>{list}</text>
                        <line x1={184} y1={y - 7} x2={330} y2={128} stroke={MUTED} strokeWidth={1.2} />
                    </g>
                )
            })}
            <circle cx={390} cy={128} r={56} fill={PAPER} stroke={SECOND} strokeWidth={2.6} />
            <text x={390} y={136} textAnchor="middle" fontSize={22} fontWeight={700} fill={SECOND}>{'{A, B, C}'}</text>
            <Formula x={590} y={100} size={18}>V₁₀,₃ = 720</Formula>
            <Formula x={590} y={140} size={18}>3! = 6</Formula>
            <Formula x={590} y={190} size={21} color={SECOND}>720 ÷ 6 = 120</Formula>
            <Caption y={268} language={language} text={say('Batzorde bakoitza 6 zerrendatan agertzen da', 'Cada comisión aparece en 6 listas', 'تظهر كل لجنة في 6 قوائم', 'Each committee appears in 6 lists')} />
        </Figure>
    )
}

/* ---------- 4. Laplace with counting: the committee drawn by lot ---------- */

export function CountingLaplaceFigure({ language }: { language: UnitLanguage }) {
    return (
        <Figure height={300} label={pick(language, say('7 emakume eta 5 gizon: hiru zozketatzen dira', '7 mujeres y 5 hombres: se sortean tres', '7 نساء و5 رجال: قرعة لثلاثة', '7 women and 5 men: three are drawn'))}>
            {Array.from({ length: 12 }, (_, index) => {
                const woman = index < 7
                const x = 70 + index * 52
                return <Person key={index} x={x} y={70} color={woman ? SECOND : STAGE_TINT} />
            })}
            <Word x={250} y={118} language={language} text={say('7 emakume', '7 mujeres', '7 نساء', '7 women')} color={SECOND} />
            <Word x={560} y={118} language={language} text={say('5 gizon', '5 hombres', '5 رجال', '5 men')} color={STAGE} />
            <Word x={180} y={170} language={language} text={say('Aldekoak', 'Favorables', 'الملائمة', 'Favourable')} color={MUTED} />
            <Formula x={180} y={205} size={19}>C₇,₃ = 35</Formula>
            <Word x={540} y={170} language={language} text={say('Posibleak', 'Posibles', 'الممكنة', 'Possible')} color={MUTED} />
            <Formula x={540} y={205} size={19}>C₁₂,₃ = 220</Formula>
            <Formula x={360} y={270} size={22} color={SECOND}>P = 35/220 = 7/44</Formula>
        </Figure>
    )
}

/* ---------- 5. Events: the ten turns ---------- */

export function TurnsVennFigure({ language }: { language: UnitLanguage }) {
    const spots: Array<[number, number, number]> = [
        [2, 100, 112], [4, 128, 166], [6, 104, 214], [8, 220, 128], [10, 220, 190],
        [7, 330, 124], [9, 328, 190], [1, 48, 46], [3, 392, 46], [5, 48, 252]
    ]
    return (
        <Figure height={310} label={pick(language, say('10 txandak Venn diagrama batean', 'Los 10 turnos en un diagrama de Venn', 'الأدوار العشرة في مخطط فن', 'The 10 turns in a Venn diagram'))}>
            <Venn box={[20, 20, 400, 250]} a={{ x: 165, y: 148, r: 96 }} b={{ x: 275, y: 148, r: 96 }}>
                {spots.map(([value, x, y]) => <text key={value} x={x} y={y + 6} textAnchor="middle" fontSize={19} fontWeight={700} fill={INK}>{value}</text>)}
            </Venn>
            <Formula x={575} y={70} size={16} color={STAGE}>A = {'{'}2, 4, 6, 8, 10{'}'}</Formula>
            <Formula x={575} y={108} size={16} color={SECOND}>B = {'{'}7, 8, 9, 10{'}'}</Formula>
            <Formula x={575} y={158} size={18} color={SECOND}>A ∩ B = {'{'}8, 10{'}'}</Formula>
            <Formula x={575} y={206} size={16}>Ā = {'{'}1, 3, 5, 7, 9{'}'}</Formula>
            <Caption y={298} language={language} text={say('Erdiko zona: biak betetzen dituzten txandak', 'Zona del medio: los turnos que cumplen los dos', 'المنطقة الوسطى: الأدوار التي تحقق الاثنين', 'Middle zone: the turns that meet both')} />
        </Figure>
    )
}

/* ---------- 6. Frequency: the poll as a 100 % bar ---------- */

export function PollBarFigure({ language }: { language: UnitLanguage }) {
    const left = 60
    const width = 600
    const yes = width * 0.65
    return (
        <Figure height={250} label={pick(language, say('400 erantzun: 260 alde eta 140 kontra', '400 respuestas: 260 a favor y 140 en contra', '400 إجابة: 260 مع و140 ضد', '400 answers: 260 for and 140 against'))}>
            <rect x={left} y={60} width={yes} height={70} fill={STAGE} fillOpacity={0.85} stroke={INK} strokeWidth={2} />
            <rect x={left + yes} y={60} width={width - yes} height={70} fill={STAGE_TINT} stroke={INK} strokeWidth={2} />
            <text x={left + yes / 2} y={104} textAnchor="middle" fontSize={24} fontWeight={700} fill={PAPER}>260</text>
            <text x={left + yes + (width - yes) / 2} y={104} textAnchor="middle" fontSize={24} fontWeight={700} fill={INK}>140</text>
            <Word x={left + yes / 2} y={40} language={language} text={say('Alde', 'A favor', 'مع', 'For')} color={STAGE} />
            <Word x={left + yes + (width - yes) / 2} y={40} language={language} text={say('Kontra', 'En contra', 'ضد', 'Against')} color={MUTED} />
            <Formula x={left + yes / 2} y={170} size={20} color={STAGE}>260/400 = {num(language, '0,65')}</Formula>
            <Formula x={left + yes + (width - yes) / 2} y={170} size={20}>{num(language, '0,35')}</Formula>
            <Caption y={228} language={language} text={say('Maiztasun erlatiboa probabilitatearen estimazioa da', 'La frecuencia relativa es una estimación de la probabilidad', 'التكرار النسبي تقدير للاحتمال', 'The relative frequency is an estimate of the probability')} />
        </Figure>
    )
}

/* ---------- 7. The union: dogs and cats ---------- */

export function PetsVennFigure({ language }: { language: UnitLanguage }) {
    return (
        <Figure height={300} label={pick(language, say('Txakurrak eta katuak Venn diagrama batean', 'Perros y gatos en un diagrama de Venn', 'الكلاب والقطط في مخطط فن', 'Dogs and cats in a Venn diagram'))}>
            <FourZones language={language} onlyA="0,33" both="0,12" onlyB="0,18" none="0,37" />
            <Formula x={575} y={80} size={16}>{num(language, '0,45 + 0,3 − 0,12')}</Formula>
            <Formula x={575} y={118} size={20} color={SECOND}>P(A ∪ B) = {num(language, '0,63')}</Formula>
            <Formula x={575} y={190} size={18}>{num(language, '1 − 0,63 = 0,37')}</Formula>
            <Caption y={290} language={language} text={say('Kanpoko zona: ez txakurrik ez katurik', 'Zona de fuera: ni perro ni gato', 'المنطقة الخارجية: لا كلب ولا قطة', 'Outside zone: neither dog nor cat')} />
        </Figure>
    )
}

/* ---------- 8. Two events with data: cinema and theatre ---------- */

export function MoviesVennFigure({ language }: { language: UnitLanguage }) {
    return (
        <Figure height={300} label={pick(language, say('Zinema eta antzokia: lau zonak', 'Cine y teatro: las cuatro zonas', 'السينما والمسرح: المناطق الأربع', 'Cinema and theatre: the four zones'))}>
            <FourZones language={language} onlyA="0,3" both="0,3" onlyB="0,2" none="0,2" />
            <Formula x={575} y={70} size={16}>P(A ∩ B) = {num(language, '0,3')}</Formula>
            <Formula x={575} y={110} size={16}>P(A ∩ B̄) = {num(language, '0,3')}</Formula>
            <Formula x={575} y={150} size={16}>P(Ā ∩ B) = {num(language, '0,2')}</Formula>
            <Formula x={575} y={200} size={19} color={SECOND}>{num(language, '0,3 + 0,2 = 0,5')}</Formula>
            <Caption y={290} language={language} text={say('Bat bakarrik: alboko bi zonak', 'Solo uno: las dos zonas laterales', 'واحد فقط: المنطقتان الجانبيتان', 'Only one: the two side zones')} />
        </Figure>
    )
}

/* ---------- 9. Contingency tables: the transport poll ---------- */

export function SurveyTableFigure({ language }: { language: UnitLanguage }) {
    return (
        <Figure height={300} label={pick(language, say('Garraioaren inkestaren taula', 'La tabla de la encuesta de transporte', 'جدول استطلاع النقل', 'The table of the transport poll'))}>
            <Table
                language={language}
                columns={[say('Autobusa', 'Autobús', 'الحافلة', 'Bus'), say('Autoa', 'Coche', 'السيارة', 'Car'), say('Guztira', 'Total', 'المجموع', 'Total')]}
                rows={[
                    { name: say('Gazteak', 'Jóvenes', 'الشباب', 'Young'), values: [70, 50, 120] },
                    { name: say('Helduak', 'Adultos', 'البالغون', 'Adults'), values: [20, 60, 80] },
                    { name: say('Guztira', 'Total', 'المجموع', 'Total'), values: [90, 110, 200] }
                ]}
                highlight={[[1, 1]]}
            />
            <Formula x={360} y={286} size={20} color={SECOND}>60/200 = {num(language, '0,3')}</Formula>
        </Figure>
    )
}

/* ---------- 10. Conditional probability: the referendum ---------- */

export function ConditionTableFigure({ language }: { language: UnitLanguage }) {
    return (
        <Figure height={300} label={pick(language, say('Erreferendumaren taula: emakumeen errenkada', 'La tabla del referéndum: la fila de las mujeres', 'جدول الاستفتاء: صف النساء', 'The referendum table: the women\'s row'))}>
            <Table
                language={language}
                columns={[say('Bai', 'Sí', 'نعم', 'Yes'), say('Ez', 'No', 'لا', 'No'), say('Guztira', 'Total', 'المجموع', 'Total')]}
                rows={[
                    { name: say('Emakumeak', 'Mujeres', 'النساء', 'Women'), values: [180, 120, 300] },
                    { name: say('Gizonak', 'Hombres', 'الرجال', 'Men'), values: [80, 120, 200] },
                    { name: say('Guztira', 'Total', 'المجموع', 'Total'), values: [260, 240, 500] }
                ]}
                highlight={[[0, 0]]}
                highlightRow={0}
            />
            <Formula x={360} y={286} size={20} color={SECOND}>P(S/M) = 180/300 = {num(language, '0,6')}</Formula>
        </Figure>
    )
}

/* ---------- 11. Independence: the square of two features ---------- */

export function MosaicSocialFigure({ language }: { language: UnitLanguage }) {
    const x = 120
    const y = 30
    const size = 220
    const a = size * 0.4
    const cut = size * 0.75
    return (
        <Figure height={300} label={pick(language, say('Probabilitatearen karratua: ebakiak altuera berean', 'El cuadrado de probabilidad: cortes a la misma altura', 'مربع الاحتمال: القطع على الارتفاع نفسه', 'The probability square: cuts at the same height'))}>
            <rect x={x} y={y} width={a} height={size - cut} fill={SECOND} fillOpacity={0.55} stroke={INK} strokeWidth={1.6} />
            <rect x={x + a} y={y} width={size - a} height={size - cut} fill={SECOND} fillOpacity={0.25} stroke={INK} strokeWidth={1.6} />
            <rect x={x} y={y + size - cut} width={a} height={cut} fill={STAGE} fillOpacity={0.35} stroke={INK} strokeWidth={1.6} />
            <rect x={x + a} y={y + size - cut} width={size - a} height={cut} fill={STAGE_TINT} stroke={INK} strokeWidth={1.6} />
            <line x1={x} y1={y + size - cut} x2={x + size} y2={y + size - cut} stroke={SECOND} strokeWidth={3} strokeDasharray="8 5" />
            <text x={x + a / 2} y={y + size + 26} textAnchor="middle" fontSize={17} fontWeight={700} fill={STAGE}>A: {num(language, '0,4')}</text>
            <text x={x + a + (size - a) / 2} y={y + size + 26} textAnchor="middle" fontSize={17} fontWeight={700} fill={MUTED}>Ā: {num(language, '0,6')}</text>
            <text x={x - 12} y={y + (size - cut) / 2 + 6} textAnchor="end" fontSize={17} fontWeight={700} fill={SECOND}>B: {num(language, '0,25')}</text>
            <text x={x + a / 2} y={y + (size - cut) / 2 + 6} textAnchor="middle" fontSize={15} fontWeight={700} fill={INK}>{num(language, '0,1')}</text>
            <Formula x={560} y={90} size={17}>{num(language, '0,4 · 0,25 = 0,1')}</Formula>
            <Formula x={560} y={130} size={17} color={SECOND}>P(A ∩ B) = {num(language, '0,1')}</Formula>
            <Caption x={560} y={190} language={language} text={say('B-ren zatia berdina da bi zutabeetan', 'La parte de B es igual en las dos columnas', 'جزء B متساوٍ في العمودين', 'The share of B is the same in both columns')} size={14} />
        </Figure>
    )
}

/* ---------- 12. Trees: the office ---------- */

export function OfficeTreeFigure({ language }: { language: UnitLanguage }) {
    const firsts = [{ y: 80, letter: 'M', n: 6 }, { y: 220, letter: 'H', n: 4 }]
    const leaves = [
        { y: 36, parent: 0, letter: 'M', n: 5, text: '6/10 · 5/9', mixed: false },
        { y: 124, parent: 0, letter: 'H', n: 4, text: '6/10 · 4/9 = 24/90', mixed: true },
        { y: 176, parent: 1, letter: 'M', n: 6, text: '4/10 · 6/9 = 24/90', mixed: true },
        { y: 264, parent: 1, letter: 'H', n: 3, text: '4/10 · 3/9', mixed: false }
    ]
    return (
        <Figure height={330} label={pick(language, say('Bulegoaren zuhaitza: bi aukeratu itzuli gabe', 'El árbol de la oficina: elegir dos sin devolver', 'شجرة المكتب: اختيار اثنين دون إرجاع', 'The office tree: choosing two without replacement'))}>
            <circle cx={40} cy={150} r={6} fill={INK} />
            {firsts.map((first, index) => (
                <g key={index}>
                    <line x1={46} y1={150} x2={176} y2={first.y} stroke={INK} strokeWidth={1.8} />
                    <Frac x={104} y={(150 + first.y) / 2 + (index === 0 ? -22 : 24)} n={first.n} d={10} size={15} />
                    <Node x={200} y={first.y} color={first.letter === 'M' ? SECOND : STAGE}>{first.letter}</Node>
                </g>
            ))}
            {leaves.map((leaf, index) => {
                const parent = firsts[leaf.parent]
                return (
                    <g key={index}>
                        <line x1={222} y1={parent.y} x2={350} y2={leaf.y} stroke={leaf.mixed ? SECOND : INK} strokeWidth={leaf.mixed ? 2.8 : 1.6} />
                        <Frac x={284} y={(parent.y + leaf.y) / 2 + (leaf.y < parent.y ? -22 : 24)} n={leaf.n} d={9} size={14} />
                        <Node x={374} y={leaf.y} color={leaf.letter === 'M' ? SECOND : STAGE}>{leaf.letter}</Node>
                        <Formula x={410} y={leaf.y + 6} size={16} anchor="start" color={leaf.mixed ? SECOND : MUTED}>{leaf.text}</Formula>
                    </g>
                )
            })}
            <Formula x={360} y={318} size={18} color={SECOND}>24/90 + 24/90 = 48/90 = 8/15</Formula>
        </Figure>
    )
}

/* ---------- 13. Total probability: the three warehouses ---------- */

export function ShopsTreeFigure({ language }: { language: UnitLanguage }) {
    const shops = [
        { letter: 'A', y: 60, share: '0,45', rate: '0,04', path: '0,018' },
        { letter: 'B', y: 150, share: '0,35', rate: '0,02', path: '0,007' },
        { letter: 'C', y: 240, share: '0,2', rate: '0,1', path: '0,02' }
    ]
    return (
        <Figure height={320} label={pick(language, say('Hiru biltegien zuhaitza', 'El árbol de los tres almacenes', 'شجرة المستودعات الثلاثة', 'The tree of the three warehouses'))}>
            <circle cx={40} cy={150} r={6} fill={INK} />
            {shops.map((shop) => (
                <g key={shop.letter}>
                    <line x1={46} y1={150} x2={196} y2={shop.y} stroke={INK} strokeWidth={1.8} />
                    <text x={118} y={(150 + shop.y) / 2 - 8} textAnchor="middle" fontSize={15} fontWeight={700} fill={INK}>{num(language, shop.share)}</text>
                    <Node x={220} y={shop.y} color={STAGE}>{shop.letter}</Node>
                    <line x1={242} y1={shop.y} x2={360} y2={shop.y} stroke={SECOND} strokeWidth={2.6} />
                    <text x={300} y={shop.y - 8} textAnchor="middle" fontSize={15} fontWeight={700} fill={SECOND}>{num(language, shop.rate)}</text>
                    <Node x={384} y={shop.y} color={SECOND}>D</Node>
                    <Formula x={570} y={shop.y + 6} size={16} color={SECOND}>{num(language, `${shop.share} · ${shop.rate} = ${shop.path}`)}</Formula>
                </g>
            ))}
            <Formula x={360} y={306} size={20} color={SECOND}>P(D) = {num(language, '0,018 + 0,007 + 0,02 = 0,045')}</Formula>
        </Figure>
    )
}

/* ---------- 14. Bayes: prior and posterior ---------- */

export function PosteriorBarsFigure({ language }: { language: UnitLanguage }) {
    const shops = [
        { letter: 'A', prior: 0.45, posterior: 0.4, text: '0,4' },
        { letter: 'B', prior: 0.35, posterior: 7 / 45, text: '7/45' },
        { letter: 'C', prior: 0.2, posterior: 4 / 9, text: '4/9' }
    ]
    const base = 230
    const scale = 340
    return (
        <Figure height={300} label={pick(language, say('A priori eta a posteriori probabilitateak', 'Probabilidades a priori y a posteriori', 'الاحتمالات القبلية والبعدية', 'Prior and posterior probabilities'))}>
            {shops.map((shop, index) => {
                const x = 110 + index * 200
                return (
                    <g key={shop.letter}>
                        <rect x={x} y={base - shop.prior * scale} width={50} height={shop.prior * scale} fill={STAGE_TINT} stroke={INK} strokeWidth={1.6} />
                        <rect x={x + 60} y={base - shop.posterior * scale} width={50} height={shop.posterior * scale} fill={SECOND} fillOpacity={0.6} stroke={INK} strokeWidth={1.6} />
                        <text x={x + 25} y={base - shop.prior * scale - 8} textAnchor="middle" fontSize={14} fontWeight={700} fill={MUTED}>{num(language, String(shop.prior).replace('.', ','))}</text>
                        <text x={x + 85} y={base - shop.posterior * scale - 8} textAnchor="middle" fontSize={14} fontWeight={700} fill={SECOND}>{num(language, shop.text)}</text>
                        <text x={x + 55} y={base + 26} textAnchor="middle" fontSize={19} fontWeight={700} fill={INK}>{shop.letter}</text>
                    </g>
                )
            })}
            <line x1={80} y1={base} x2={680} y2={base} stroke={INK} strokeWidth={2} />
            <rect x={150} y={270} width={18} height={18} fill={STAGE_TINT} stroke={INK} />
            <Word x={176} y={285} language={language} text={say('A priori', 'A priori', 'قبلي', 'Prior')} anchor="start" size={14} color={MUTED} />
            <rect x={420} y={270} width={18} height={18} fill={SECOND} fillOpacity={0.6} stroke={INK} />
            <Word x={446} y={285} language={language} text={say('Itzulita jakinda', 'Sabiendo que se devolvió', 'مع العلم بإعادته', 'Knowing it was returned')} anchor="start" size={14} color={SECOND} />
        </Figure>
    )
}

/* ---------- 15. Medical tests: 10 000 people ---------- */

export function ScreeningFigure({ language }: { language: UnitLanguage }) {
    const total = language === 'en' ? '10,000' : '10 000'
    return (
        <Figure height={320} label={pick(language, say('10 000 pertsona proba batean', '10 000 personas en una prueba', '⁦10 000⁩ شخص في فحص', '10,000 people in a test'))}>
            <rect x={300} y={20} width={120} height={40} rx={10} fill={PAPER} stroke={INK} strokeWidth={2} />
            <text x={360} y={47} textAnchor="middle" fontSize={19} fontWeight={700} fill={INK}>{total}</text>
            <line x1={330} y1={60} x2={180} y2={110} stroke={INK} strokeWidth={1.8} />
            <line x1={390} y1={60} x2={540} y2={110} stroke={INK} strokeWidth={1.8} />
            <rect x={120} y={110} width={120} height={40} rx={10} fill={SECOND} fillOpacity={0.2} stroke={SECOND} strokeWidth={2} />
            <text x={180} y={137} textAnchor="middle" fontSize={19} fontWeight={700} fill={SECOND}>200</text>
            <Word x={180} y={100} language={language} text={say('gaixo', 'enfermos', 'مرضى', 'ill')} size={14} color={SECOND} />
            <rect x={480} y={110} width={120} height={40} rx={10} fill={STAGE_TINT} stroke={STAGE} strokeWidth={2} />
            <text x={540} y={137} textAnchor="middle" fontSize={19} fontWeight={700} fill={STAGE}>9800</text>
            <Word x={540} y={100} language={language} text={say('osasuntsu', 'sanos', 'أصحاء', 'healthy')} size={14} color={STAGE} />
            {[
                { x: 110, from: 160, value: '190', plus: true },
                { x: 250, from: 200, value: '10', plus: false },
                { x: 470, from: 520, value: '490', plus: true },
                { x: 610, from: 560, value: '9310', plus: false }
            ].map((leaf) => (
                <g key={leaf.x}>
                    <line x1={leaf.from} y1={150} x2={leaf.x} y2={200} stroke={leaf.plus ? SECOND : LINE} strokeWidth={leaf.plus ? 2.6 : 1.6} />
                    <rect x={leaf.x - 45} y={200} width={90} height={36} rx={8} fill={leaf.plus ? SECOND : PAPER} fillOpacity={leaf.plus ? 0.25 : 1} stroke={leaf.plus ? SECOND : LINE} strokeWidth={1.8} />
                    <text x={leaf.x} y={225} textAnchor="middle" fontSize={17} fontWeight={700} fill={leaf.plus ? SECOND : MUTED}>{leaf.value} {leaf.plus ? '+' : '−'}</text>
                </g>
            ))}
            <Formula x={360} y={280} size={20} color={SECOND}>P(E/+) = 190/(190 + 490) = 19/68</Formula>
            <Caption y={310} language={language} text={say('Positibo gehienak osasuntsuak dira', 'La mayoría de los positivos están sanos', 'معظم الإيجابيين أصحاء', 'Most of the positives are healthy')} />
        </Figure>
    )
}

/* ---------- Hero art: a poll table and a tree ---------- */

export function ProbabilityBatx2gHeroArt() {
    return (
        <svg viewBox="0 0 240 160" role="img" aria-hidden="true" style={{ width: '100%', height: 'auto', display: 'block' }}>
            <rect x={12} y={20} width={110} height={110} rx={8} fill={PAPER} stroke={INK} strokeWidth={2.4} />
            <rect x={12} y={20} width={44} height={60} fill={SECOND} fillOpacity={0.55} />
            <rect x={56} y={20} width={66} height={60} fill={SECOND} fillOpacity={0.25} />
            <rect x={12} y={80} width={44} height={50} fill={STAGE} fillOpacity={0.4} />
            <line x1={56} y1={20} x2={56} y2={130} stroke={INK} strokeWidth={2} />
            <line x1={12} y1={80} x2={122} y2={80} stroke={INK} strokeWidth={2} />
            <circle cx={148} cy={80} r={5} fill={INK} />
            <line x1={152} y1={78} x2={200} y2={40} stroke={INK} strokeWidth={2.4} />
            <line x1={152} y1={82} x2={200} y2={120} stroke={SECOND} strokeWidth={3} />
            <circle cx={210} cy={36} r={12} fill={STAGE_TINT} stroke={INK} strokeWidth={2} />
            <circle cx={210} cy={124} r={12} fill={GREEN} fillOpacity={0.5} stroke={INK} strokeWidth={2} />
        </svg>
    )
}
