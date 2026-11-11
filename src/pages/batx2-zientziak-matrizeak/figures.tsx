import type { ReactNode } from 'react'
import { pickText, type LocalizedText, type UnitLanguage } from '../../features/unit-v2/types'
import { Label } from '../dbh2-funtzioak-v2/plane'
import { Figure } from '../dbh2-zatikiak-prototype/figures'
import { MatrixBlock } from './MatrixSvg'

/* ==========================================================================
   Matrizeak · Batxilergoa 2 · Zientziak — the lesson figures: a matrix
   with its rows and columns, the kinds of square matrices, the transpose
   as a mirror, adding entry by entry, row by column, AB and BA, a graph
   and its matrix, a row that is a combination of two others, the
   staircase that gives the rank, the rank as m moves, A and its inverse,
   Gauss–Jordan, a quarter turn repeated four times, A⁻¹ on the left of
   both sides, a system of two matrix equations and AX = XA. Numbers and
   formulas go in their own <text> (left to right); words go through <Label>.
   ========================================================================== */

const INK = 'var(--ink, #1d2733)'
const MUTED = 'var(--muted, #58616e)'
const STAGE = 'var(--stage, #2f6fdb)'
const STAGE_TINT = 'var(--stage-tint, #dde7f7)'
const SECOND = 'var(--second, #c4432a)'
const GREEN = 'var(--success, #267b53)'
const GREEN_TINT = '#d6eddf'
const CORAL_TINT = '#f6dcd3'
const MUSTARD_TINT = '#fbebc0'
const VIOLET_TINT = '#e8e0f7'
const PAPER = '#fffcf6'

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const useText = (language: UnitLanguage) => (text: LocalizedText) => pickText(language, text)

function Caption({ y, children }: { y: number; children: ReactNode }) {
    return <Label x={360} y={y} textAnchor="middle" fontSize={20} fill={MUTED}>{children}</Label>
}

/** A formula written left to right whatever the language */
function F({ x, y, children, size = 22, color = INK, anchor = 'start', weight = 700 }: { x: number; y: number; children: ReactNode; size?: number; color?: string; anchor?: 'start' | 'middle' | 'end'; weight?: number }) {
    return <text x={x} y={y} textAnchor={anchor} fontSize={size} fontWeight={weight} fill={color} direction="ltr">{children}</text>
}

function Arrow({ x1, y1, x2, y2, color = MUTED }: { x1: number; y1: number; x2: number; y2: number; color?: string }) {
    const angle = Math.atan2(y2 - y1, x2 - x1)
    const back = (side: number) => `${x2 - 12 * Math.cos(angle) + side * Math.sin(angle)},${y2 - 12 * Math.sin(angle) - side * Math.cos(angle)}`
    return (
        <g>
            <line x1={x1} y1={y1} x2={x2 - 8 * Math.cos(angle)} y2={y2 - 8 * Math.sin(angle)} stroke={color} strokeWidth={2.6} />
            <polygon points={`${x2},${y2} ${back(6)} ${back(-6)}`} fill={color} />
        </g>
    )
}

/* ---------- A matrix: rows, columns and one entry ---------- */

export function MatrixAnatomyFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const cells = [['2', '−1', '0'], ['5', '3', '7']]
    const x = 250
    const y = 80
    const cell = 64
    return (
        <Figure height={330} label={t(say('2 × 3 matrize bat: bigarren errenkada eta hirugarren zutabea nabarmenduta; haien elementua a₂₃ = 7 da', 'Una matriz 2 × 3 con la segunda fila y la tercera columna resaltadas; su elemento es a₂₃ = 7', 'مصفوفة 2 × 3 مع إبراز الصف الثاني والعمود الثالث؛ عنصرهما a₂₃ = 7', 'A 2 × 3 matrix with the second row and the third column highlighted; their entry is a₂₃ = 7'))}>
            <rect x={x + 14 + 2 * cell + 4} y={y - 6} width={cell - 8} height={2 * 55 + 12} rx={10} fill={MUSTARD_TINT} />
            <MatrixBlock x={x} y={y} cells={cells} cell={cell} rowGap={55} size={26} tint={(r) => (r === 1 ? STAGE_TINT : undefined)} color={(r, c) => (r === 1 && c === 2 ? SECOND : undefined)} />
            <Label x={x - 26} y={y + 90} textAnchor="end" fontSize={19} fill={STAGE}>{t(say('2. errenkada', 'fila 2', 'الصف 2', 'row 2'))}</Label>
            <Arrow x1={x - 20} y1={y + 84} x2={x + 2} y2={y + 84} color={STAGE} />
            <Label x={x + 14 + 2.5 * cell} y={y - 26} textAnchor="middle" fontSize={19} fill={MUTED}>{t(say('3. zutabea', 'columna 3', 'العمود 3', 'column 3'))}</Label>
            <F x={x + 14 + 3 * cell + 46} y={y + 92} size={26} color={SECOND}>a₂₃ = 7</F>
            <F x={360} y={258} anchor="middle" size={24}>2 × 3</F>
            <Caption y={300}>{t(say('Lehenik errenkada, gero zutabea: 2 errenkada eta 3 zutabe', 'Primero la fila y después la columna: 2 filas y 3 columnas', 'الصف أولًا ثم العمود: صفّان و3 أعمدة', 'Row first, then column: 2 rows and 3 columns'))}</Caption>
        </Figure>
    )
}

/* ---------- The kinds of square matrices ---------- */

export function MatrixTypesFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const kinds = [
        { cells: [['2', '5', '1'], ['0', '3', '4'], ['0', '0', '6']], name: say('goi-triangeluarra', 'triangular superior', 'مثلثية عليا', 'upper triangular'), zero: (r: number, c: number) => r > c },
        { cells: [['2', '0', '0'], ['0', '3', '0'], ['0', '0', '6']], name: say('diagonala', 'diagonal', 'قطرية', 'diagonal'), zero: (r: number, c: number) => r !== c },
        { cells: [['4', '0', '0'], ['0', '4', '0'], ['0', '0', '4']], name: say('eskalarra', 'escalar', 'سلمية', 'scalar'), zero: (r: number, c: number) => r !== c },
        { cells: [['1', '0', '0'], ['0', '1', '0'], ['0', '0', '1']], name: say('identitatea, I', 'identidad, I', 'المحايدة، I', 'identity, I'), zero: (r: number, c: number) => r !== c }
    ]
    const cell = 40
    return (
        <Figure height={330} label={t(say('Lau matrize karratu: goi-triangeluarra, diagonala, eskalarra eta identitatea; zeroak itzalpean', 'Cuatro matrices cuadradas: triangular superior, diagonal, escalar e identidad; los ceros sombreados', 'أربع مصفوفات مربعة: مثلثية عليا وقطرية وسلمية ومحايدة؛ الأصفار مظللة', 'Four square matrices: upper triangular, diagonal, scalar and identity; the zeros shaded'))}>
            {kinds.map((kind, index) => {
                const x = 14 + index * 176
                return (
                    <g key={index}>
                        <MatrixBlock x={x} y={60} cells={kind.cells} cell={cell} rowGap={40} size={20} tint={(r, c) => (kind.zero(r, c) ? CORAL_TINT : r === c ? STAGE_TINT : undefined)} />
                        <Label x={x + 74} y={212} textAnchor="middle" fontSize={18} fill={INK}>{t(kind.name)}</Label>
                    </g>
                )
            })}
            <Caption y={290}>{t(say('Diagonal nagusiaren inguruko zeroek ematen diote izena', 'Los ceros alrededor de la diagonal principal le dan nombre', 'الأصفار حول القطر الرئيسي تعطيها اسمها', 'The zeros around the main diagonal give it its name'))}</Caption>
        </Figure>
    )
}

/* ---------- The transpose: rows become columns ---------- */

export function TransposeFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const a = [['1', '4', '0'], ['−2', '3', '5']]
    const at = [['1', '−2'], ['4', '3'], ['0', '5']]
    const rowTint = [STAGE_TINT, MUSTARD_TINT]
    return (
        <Figure height={330} label={t(say('2 × 3 matrize bat eta haren iraulia, 3 × 2: lehen errenkada lehen zutabe bihurtzen da, eta bigarrena bigarren zutabe', 'Una matriz 2 × 3 y su traspuesta 3 × 2: la primera fila pasa a ser la primera columna y la segunda, la segunda', 'مصفوفة 2 × 3 ومنقولها 3 × 2: يصير الصف الأول العمود الأول والثاني العمود الثاني', 'A 2 × 3 matrix and its 3 × 2 transpose: the first row becomes the first column and the second, the second'))}>
            <F x={60} y={124} size={26}>A =</F>
            <MatrixBlock x={110} y={78} cells={a} cell={56} rowGap={52} size={24} tint={(r) => rowTint[r]} />
            <Arrow x1={330} y1={128} x2={400} y2={128} />
            <F x={420} y={136} size={26}>Aᵗ =</F>
            <MatrixBlock x={486} y={50} cells={at} cell={56} rowGap={52} size={24} tint={(_, c) => rowTint[c]} />
            <Caption y={258}>{t(say('Errenkadak zutabe bihurtzen dira: 2 × 3 → 3 × 2', 'Las filas pasan a ser columnas: 2 × 3 → 3 × 2', 'تصير الصفوف أعمدة: 2 × 3 → 3 × 2', 'The rows become columns: 2 × 3 → 3 × 2'))}</Caption>
            <Caption y={294}>{t(say('Simetrikoa: Aᵗ = A', 'Simétrica: Aᵗ = A', 'متماثلة: Aᵗ = A', 'Symmetric: Aᵗ = A'))}</Caption>
        </Figure>
    )
}

/* ---------- Adding entry by entry ---------- */

export function SumFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const twoA = [['2', '6'], ['0', '−4']]
    const b = [['4', '1'], ['−3', '5']]
    const result = [['−2', '5'], ['3', '−9']]
    const tint = (r: number, c: number) => (r === 0 && c === 1 ? MUSTARD_TINT : undefined)
    return (
        <Figure height={300} label={t(say('2A − B elementuz elementu: 2A matrizea ken B matrizea; goiko eskuineko elementuak 6 − 1 = 5 ematen du', '2A − B elemento a elemento: arriba a la derecha, 6 − 1 = 5', '2A − B عنصرًا عنصرًا: في أعلى اليمين 6 − 1 = 5', '2A − B entry by entry: top right, 6 − 1 = 5'))}>
            <MatrixBlock x={40} y={70} cells={twoA} cell={56} rowGap={52} size={24} tint={tint} />
            <F x={202} y={130} size={30}>−</F>
            <MatrixBlock x={230} y={70} cells={b} cell={56} rowGap={52} size={24} tint={tint} />
            <F x={392} y={130} size={30}>=</F>
            <MatrixBlock x={424} y={70} cells={result} cell={62} rowGap={52} size={24} tint={tint} color={(r, c) => (r === 0 && c === 1 ? SECOND : undefined)} />
            <F x={640} y={130} size={22} color={SECOND}>6 − 1</F>
            <Caption y={232}>{t(say('Leku bakoitzak bere kontua egiten du', 'Cada sitio hace su propia cuenta', 'كل موضع يجري حسابه الخاص', 'Each place does its own sum'))}</Caption>
            <Caption y={270}>{t(say('Dimentsio bera behar da', 'Hace falta la misma dimensión', 'يلزم أن تكون الأبعاد نفسها', 'The same size is needed'))}</Caption>
        </Figure>
    )
}

/* ---------- Row by column ---------- */

export function RowColumnFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const a = [['1', '2', '0'], ['3', '−1', '4']]
    const b = [['2', '1'], ['0', '3'], ['1', '−2']]
    const ab = [['2', '7'], ['10', '−8']]
    return (
        <Figure height={360} label={t(say('A matrizearen bigarren errenkada bider B matrizearen lehen zutabea: 3 · 2 + (−1) · 0 + 4 · 1 = 10, AB matrizearen c₂₁ elementua', 'La segunda fila de A por la primera columna de B: 3 · 2 + (−1) · 0 + 4 · 1 = 10, el elemento c₂₁ de AB', 'الصف الثاني من A في العمود الأول من B: 3 · 2 + (−1) · 0 + 4 · 1 = 10، وهو العنصر c₂₁ من AB', 'The second row of A times the first column of B: 3 · 2 + (−1) · 0 + 4 · 1 = 10, the entry c₂₁ of AB'))}>
            <MatrixBlock x={20} y={80} cells={a} cell={50} rowGap={50} size={22} tint={(r) => (r === 1 ? STAGE_TINT : undefined)} />
            <MatrixBlock x={210} y={56} cells={b} cell={50} rowGap={50} size={22} tint={(_, c) => (c === 0 ? MUSTARD_TINT : undefined)} />
            <F x={354} y={140} size={30}>=</F>
            <MatrixBlock x={390} y={80} cells={ab} cell={58} rowGap={50} size={22} tint={(r, c) => (r === 1 && c === 0 ? GREEN_TINT : undefined)} color={(r, c) => (r === 1 && c === 0 ? GREEN : undefined)} />
            <F x={360} y={262} anchor="middle" size={22} color={GREEN}>c₂₁ = 3 · 2 + (−1) · 0 + 4 · 1 = 10</F>
            <F x={600} y={140} size={20} color={MUTED}>2 × 2</F>
            <Caption y={318}>{t(say('(2 × 3)(3 × 2): erdiko zenbakiak berdinak; emaitza 2 × 2', '(2 × 3)(3 × 2): los del medio coinciden; resultado 2 × 2', '(2 × 3)(3 × 2): العددان في الوسط متساويان؛ والناتج 2 × 2', '(2 × 3)(3 × 2): the middle numbers match; the result is 2 × 2'))}</Caption>
        </Figure>
    )
}

/* ---------- AB and BA ---------- */

export function OrderFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    return (
        <Figure height={300} label={t(say('AB eta BA desberdinak dira: AB matrizeak 3 3 / 1 3 ematen du, eta BA matrizeak 2 2 / 1 4', 'AB y BA son distintas: AB da 3 3 / 1 3 y BA da 2 2 / 1 4', 'AB وBA مختلفتان: AB تعطي 3 3 / 1 3 وBA تعطي 2 2 / 1 4', 'AB and BA are different: AB gives 3 3 / 1 3 and BA gives 2 2 / 1 4'))}>
            <rect x={30} y={40} width={310} height={170} rx={16} fill={STAGE_TINT} stroke={INK} strokeWidth={1.8} />
            <F x={70} y={136} size={28}>AB =</F>
            <MatrixBlock x={150} y={84} cells={[['3', '3'], ['1', '3']]} cell={60} rowGap={50} size={26} />
            <rect x={380} y={40} width={310} height={170} rx={16} fill={MUSTARD_TINT} stroke={INK} strokeWidth={1.8} />
            <F x={420} y={136} size={28}>BA =</F>
            <MatrixBlock x={500} y={84} cells={[['2', '2'], ['1', '4']]} cell={60} rowGap={50} size={26} />
            <F x={360} y={136} anchor="middle" size={30} color={SECOND}>≠</F>
            <Caption y={258}>{t(say('Ordenak garrantzia du', 'El orden importa', 'الترتيب مهم', 'The order matters'))}</Caption>
        </Figure>
    )
}

/* ---------- A graph and its matrix ---------- */

export function GraphFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const points: Record<number, [number, number]> = { 1: [90, 80], 2: [290, 80], 3: [190, 240] }
    const arrows: Array<[number, number]> = [[1, 2], [2, 3], [3, 1], [1, 3]]
    const shift = (from: [number, number], to: [number, number], amount: number): [number, number] => {
        const dx = to[0] - from[0]
        const dy = to[1] - from[1]
        const length = Math.hypot(dx, dy)
        return [from[0] + (dx / length) * amount, from[1] + (dy / length) * amount]
    }
    return (
        <Figure height={340} label={t(say('Hiru erpineko grafo bat (geziak: 1→2, 2→3, 3→1 eta 1→3) eta haren matrizea', 'Un grafo de tres vértices (flechas 1→2, 2→3, 3→1 y 1→3) y su matriz', 'بيان بثلاثة رؤوس (الأسهم 1→2 و2→3 و3→1 و1→3) ومصفوفته', 'A graph with three vertices (arrows 1→2, 2→3, 3→1 and 1→3) and its matrix'))}>
            {arrows.map(([from, to]) => {
                const offset = from === 3 && to === 1 ? 10 : from === 1 && to === 3 ? -10 : 0
                const a = points[from]
                const b = points[to]
                const normal = [-(b[1] - a[1]), b[0] - a[0]]
                const length = Math.hypot(normal[0], normal[1])
                const ox = (normal[0] / length) * offset
                const oy = (normal[1] / length) * offset
                const start = shift([a[0] + ox, a[1] + oy], [b[0] + ox, b[1] + oy], 30)
                const end = shift([b[0] + ox, b[1] + oy], [a[0] + ox, a[1] + oy], 30)
                return <Arrow key={`${from}${to}`} x1={start[0]} y1={start[1]} x2={end[0]} y2={end[1]} color={STAGE} />
            })}
            {Object.entries(points).map(([name, [x, y]]) => (
                <g key={name}>
                    <circle cx={x} cy={y} r={24} fill={PAPER} stroke={INK} strokeWidth={2.2} />
                    <F x={x} y={y + 8} anchor="middle" size={22}>{name}</F>
                </g>
            ))}
            <MatrixBlock x={430} y={66} cells={[['0', '1', '1'], ['0', '0', '1'], ['1', '0', '0']]} cell={52} rowGap={48} size={24} tint={(r, c) => (r === 0 && c === 2 ? MUSTARD_TINT : undefined)} />
            {['1', '2', '3'].map((name, index) => <F key={name} x={430 + 14 + 26 + index * 52} y={52} anchor="middle" size={18} color={MUTED} weight={600}>{name}</F>)}
            {['1', '2', '3'].map((name, index) => <F key={name} x={418} y={66 + 30 + index * 48} anchor="end" size={18} color={MUTED} weight={600}>{name}</F>)}
            <Caption y={302}>{t(say('a₁₃ = 1: gezi bat doa 1 erpinetik 3 erpinera', 'a₁₃ = 1: hay una flecha del vértice 1 al 3', 'a₁₃ = 1: يوجد سهم من الرأس 1 إلى الرأس 3', 'a₁₃ = 1: there is an arrow from vertex 1 to vertex 3'))}</Caption>
        </Figure>
    )
}

/* ---------- A row that is a combination of two others ---------- */

export function CombinationFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const strip = (x: number, y: number, values: string[], tint: string) => (
        <g>
            <rect x={x} y={y} width={values.length * 58 + 16} height={46} rx={10} fill={tint} stroke={INK} strokeWidth={1.6} />
            {values.map((value, index) => <F key={index} x={x + 37 + index * 58} y={y + 31} anchor="middle" size={22}>{value}</F>)}
        </g>
    )
    return (
        <Figure height={330} label={t(say('Hirugarren errenkada beste bien konbinazio lineala da: 2 · (1, 2, −1) + (3, 0, 2) = (5, 4, 0)', 'La tercera fila es combinación lineal de las otras dos: 2 · (1, 2, −1) + (3, 0, 2) = (5, 4, 0)', 'الصف الثالث تركيب خطي من الصفين الآخرين: 2 · (1, 2, −1) + (3, 0, 2) = (5, 4, 0)', 'The third row is a linear combination of the other two: 2 · (1, 2, −1) + (3, 0, 2) = (5, 4, 0)'))}>
            <F x={130} y={70} anchor="end" size={24} color={STAGE}>2 · E₁</F>
            {strip(150, 40, ['2', '4', '−2'], STAGE_TINT)}
            <F x={130} y={140} anchor="end" size={24} color={STAGE}>+ E₂</F>
            {strip(150, 110, ['3', '0', '2'], MUSTARD_TINT)}
            <line x1={150} x2={340} y1={176} y2={176} stroke={INK} strokeWidth={2.4} />
            <F x={130} y={220} anchor="end" size={24} color={SECOND}>E₃</F>
            {strip(150, 190, ['5', '4', '0'], GREEN_TINT)}
            <F x={420} y={140} size={22}>E₃ = 2E₁ + E₂</F>
            <Caption y={290}>{t(say('E₃ menpekoa da: ez du ezer berririk ematen', 'E₃ es dependiente: no aporta nada nuevo', 'E₃ مرتبط خطيًا: لا يضيف جديدًا', 'E₃ is dependent: it adds nothing new'))}</Caption>
        </Figure>
    )
}

/* ---------- The staircase that gives the rank ---------- */

export function RankStairsFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const cells = [['1', '2', '1'], ['0', '−1', '2'], ['0', '0', '0']]
    const x = 200
    const y = 50
    const cell = 64
    const gap = 54
    return (
        <Figure height={330} label={t(say('Matrize mailakatua: bi errenkadak pibota dute, eta hirugarrena zeroz beteta dago; heina 2 da', 'Matriz escalonada: dos filas con pivote y la tercera de ceros; el rango es 2', 'مصفوفة درجية: صفّان لهما محور والثالث أصفار؛ الرتبة 2', 'Echelon form: two rows with a pivot and the third all zeros; the rank is 2'))}>
            <MatrixBlock x={x} y={y} cells={cells} cell={cell} rowGap={gap} size={26} tint={(r, c) => (r === 2 ? CORAL_TINT : r === c ? STAGE_TINT : undefined)} />
            <path d={`M${x + 14} ${y + gap} h${cell} v${gap} h${cell} v${gap} h${cell}`} fill="none" stroke={STAGE} strokeWidth={2.4} strokeDasharray="6 5" />
            <line x1={x + 20} x2={x + 14 + 3 * cell - 6} y1={y + 2.5 * gap} y2={y + 2.5 * gap} stroke={SECOND} strokeWidth={2.4} />
            <F x={x + 3 * cell + 60} y={y + 2.5 * gap + 8} size={22} color={SECOND}>0 0 0</F>
            <F x={360} y={248} anchor="middle" size={26} color={STAGE}>rg = 2</F>
            <Caption y={294}>{t(say('Zenbatu zeroz osatuta ez dauden errenkadak', 'Cuenta las filas que no son de ceros', 'عُدّ الصفوف التي ليست أصفارًا', 'Count the rows that are not all zeros'))}</Caption>
        </Figure>
    )
}

/* ---------- The rank as m moves ---------- */

export function RankLineFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const x0 = 80
    const unit = 70
    const at = (m: number) => x0 + m * unit
    return (
        <Figure height={300} label={t(say('Zenbaki-zuzena m parametroarentzat: heina 3 da beti, m = 3 puntuan izan ezik, non 2 den', 'Recta de los valores de m: el rango es 3 siempre, salvo en m = 3, donde es 2', 'مستقيم قيم m: الرتبة 3 دائمًا إلا عند m = 3 حيث تساوي 2', 'Number line for m: the rank is always 3, except at m = 3, where it is 2'))}>
            <F x={360} y={60} anchor="middle" size={22}>(0  0  m − 3)</F>
            <line x1={40} x2={680} y1={150} y2={150} stroke={STAGE} strokeWidth={6} strokeLinecap="round" />
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((m) => (
                <g key={m}>
                    <line x1={at(m)} x2={at(m)} y1={140} y2={160} stroke={INK} strokeWidth={1.6} />
                    <F x={at(m)} y={188} anchor="middle" size={18} color={MUTED} weight={600}>{m - 2 < 0 ? `−${2 - m}` : String(m - 2)}</F>
                </g>
            ))}
            <circle cx={at(5)} cy={150} r={11} fill={PAPER} stroke={SECOND} strokeWidth={3} />
            <F x={at(5)} y={118} anchor="middle" size={22} color={SECOND}>rg = 2</F>
            <F x={at(1.5)} y={118} anchor="middle" size={22} color={STAGE}>rg = 3</F>
            <F x={at(7)} y={118} anchor="middle" size={22} color={STAGE}>rg = 3</F>
            <Caption y={250}>{t(say('m = 3 denean, azken errenkada zero bihurtzen da', 'Con m = 3 la última fila se anula', 'مع m = 3 ينعدم الصف الأخير', 'With m = 3 the last row vanishes'))}</Caption>
        </Figure>
    )
}

/* ---------- A and its inverse ---------- */

export function InverseFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    return (
        <Figure height={320} label={t(say('A matrizea eta haren alderantzizkoa biderkatuta, identitatea ateratzen da: A · A⁻¹ = I', 'A por su inversa da la identidad: A · A⁻¹ = I', 'A في معكوسها تعطي المحايدة: A · A⁻¹ = I', 'A times its inverse gives the identity: A · A⁻¹ = I'))}>
            <MatrixBlock x={20} y={80} cells={[['2', '1'], ['5', '3']]} cell={54} rowGap={50} size={24} tint={() => STAGE_TINT} />
            <F x={160} y={140} size={28}>·</F>
            <MatrixBlock x={180} y={80} cells={[['3', '−1'], ['−5', '2']]} cell={62} rowGap={50} size={24} tint={() => MUSTARD_TINT} />
            <F x={346} y={140} size={28}>=</F>
            <MatrixBlock x={376} y={80} cells={[['1', '0'], ['0', '1']]} cell={54} rowGap={50} size={24} tint={(r, c) => (r === c ? GREEN_TINT : undefined)} />
            <F x={92} y={62} anchor="middle" size={22} color={STAGE}>A</F>
            <F x={270} y={62} anchor="middle" size={22} color={SECOND}>A⁻¹</F>
            <F x={448} y={62} anchor="middle" size={22} color={GREEN}>I</F>
            <F x={540} y={124} size={20} color={MUTED}>2 · 3 + 1 · (−5) = 1</F>
            <F x={540} y={160} size={20} color={MUTED}>2 · (−1) + 1 · 2 = 0</F>
            <Caption y={262}>{t(say('A⁻¹ matrizeak desegiten du A matrizeak egiten duena', 'A⁻¹ deshace lo que hace A', 'A⁻¹ تلغي ما تفعله A', 'A⁻¹ undoes what A does'))}</Caption>
        </Figure>
    )
}

/* ---------- Gauss–Jordan ---------- */

export function GaussJordanFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const start = [['1', '2', '1', '0'], ['3', '7', '0', '1']]
    const end = [['1', '0', '7', '−2'], ['0', '1', '−3', '1']]
    const cell = 50
    return (
        <Figure height={320} label={t(say('(A | I) matrizetik (I | A⁻¹) matrizera errenkada-eragiketekin: E₂ − 3E₁ eta E₁ − 2E₂', 'De (A | I) a (I | A⁻¹) con operaciones de fila: E₂ − 3E₁ y E₁ − 2E₂', 'من (A | I) إلى (I | A⁻¹) بعمليات على الصفوف: E₂ − 3E₁ ثم E₁ − 2E₂', 'From (A | I) to (I | A⁻¹) with row operations: E₂ − 3E₁ and E₁ − 2E₂'))}>
            <MatrixBlock x={20} y={90} cells={start} cell={cell} rowGap={50} size={22} barBefore={2} tint={(_, c) => (c < 2 ? STAGE_TINT : GREEN_TINT)} />
            <F x={140} y={70} anchor="middle" size={22} color={STAGE}>A</F>
            <F x={240} y={70} anchor="middle" size={22} color={GREEN}>I</F>
            <Arrow x1={270} y1={140} x2={420} y2={140} color={STAGE} />
            <F x={345} y={124} anchor="middle" size={18} color={STAGE}>E₂ − 3E₁</F>
            <F x={345} y={172} anchor="middle" size={18} color={STAGE}>E₁ − 2E₂</F>
            <MatrixBlock x={436} y={90} cells={end} cell={cell + 8} rowGap={50} size={22} barBefore={2} tint={(_, c) => (c < 2 ? GREEN_TINT : MUSTARD_TINT)} />
            <F x={436 + 14 + cell + 8} y={70} anchor="middle" size={22} color={GREEN}>I</F>
            <F x={436 + 14 + 3 * (cell + 8)} y={70} anchor="middle" size={22} color={SECOND}>A⁻¹</F>
            <Caption y={262}>{t(say('Eragiketa bakoitza errenkada osoan egiten da', 'Cada operación se hace en la fila entera', 'تُجرى كل عملية على الصف كله', 'Each operation is done on the whole row'))}</Caption>
        </Figure>
    )
}

/* ---------- A quarter turn repeated: B⁴ = I ---------- */

function Flag({ cx, cy, turn }: { cx: number; cy: number; turn: number }) {
    return (
        <g transform={`translate(${cx} ${cy}) rotate(${-90 * turn})`}>
            <line x1={0} y1={0} x2={0} y2={-46} stroke={INK} strokeWidth={3} />
            <polygon points="0,-46 32,-36 0,-26" fill={SECOND} stroke={INK} strokeWidth={1.4} />
            <circle cx={0} cy={0} r={4} fill={INK} />
        </g>
    )
}

export function PowerCycleFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const names = ['B', 'B²', 'B³', 'B⁴ = I']
    return (
        <Figure height={320} label={t(say('Laurden-bira bat lau aldiz: B, B², B³ eta B⁴ = I; laugarrenean bandera hasierara itzultzen da', 'Un cuarto de vuelta cuatro veces: B, B², B³ y B⁴ = I; a la cuarta la bandera vuelve al principio', 'ربع دورة أربع مرات: B وB² وB³ وB⁴ = I؛ في الرابعة يعود العلم إلى البداية', 'A quarter turn four times: B, B², B³ and B⁴ = I; on the fourth the flag is back at the start'))}>
            <F x={360} y={44} anchor="middle" size={22}>B = (0 −1 / 1 0)</F>
            {names.map((name, index) => {
                const cx = 110 + index * 166
                return (
                    <g key={name}>
                        <rect x={cx - 66} y={70} width={132} height={132} rx={14} fill={index === 3 ? GREEN_TINT : VIOLET_TINT} stroke={INK} strokeWidth={1.6} />
                        <line x1={cx - 54} x2={cx + 54} y1={136} y2={136} stroke={MUTED} strokeWidth={1} />
                        <line x1={cx} x2={cx} y1={82} y2={190} stroke={MUTED} strokeWidth={1} />
                        <Flag cx={cx} cy={136} turn={index + 1} />
                        <F x={cx} y={234} anchor="middle" size={22} color={index === 3 ? GREEN : INK}>{name}</F>
                    </g>
                )
            })}
            <Caption y={286}>{t(say('B⁴ = I: berreturak lau urratsean errepikatzen dira', 'B⁴ = I: las potencias se repiten cada cuatro', 'B⁴ = I: تتكرر القوى كل أربع', 'B⁴ = I: the powers repeat every four'))}</Caption>
        </Figure>
    )
}

/* ---------- A⁻¹ on the left of both sides ---------- */

export function SidesFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const box = (x: number, y: number, text: string, tint: string, color = INK) => (
        <g>
            <rect x={x} y={y} width={64} height={52} rx={10} fill={tint} stroke={INK} strokeWidth={1.6} />
            <F x={x + 32} y={y + 35} anchor="middle" size={24} color={color}>{text}</F>
        </g>
    )
    return (
        <Figure height={320} label={t(say('AX = B ekuazioan, A⁻¹ ezkerretik jartzen da bi aldeetan: A⁻¹AX = A⁻¹B, eta X = A⁻¹B geratzen da', 'En AX = B se pone A⁻¹ a la izquierda en los dos miembros: A⁻¹AX = A⁻¹B, y queda X = A⁻¹B', 'في AX = B نضع A⁻¹ على اليسار في الطرفين: A⁻¹AX = A⁻¹B فيبقى X = A⁻¹B', 'In AX = B, A⁻¹ goes on the left of both sides: A⁻¹AX = A⁻¹B, which leaves X = A⁻¹B'))}>
            {box(110, 50, 'A', STAGE_TINT)}
            {box(180, 50, 'X', PAPER)}
            <F x={290} y={86} anchor="middle" size={28}>=</F>
            {box(330, 50, 'B', MUSTARD_TINT)}
            {box(40, 140, 'A⁻¹', CORAL_TINT, SECOND)}
            {box(110, 140, 'A', STAGE_TINT)}
            {box(180, 140, 'X', PAPER)}
            <F x={290} y={176} anchor="middle" size={28}>=</F>
            {box(330, 140, 'A⁻¹', CORAL_TINT, SECOND)}
            {box(400, 140, 'B', MUSTARD_TINT)}
            <F x={520} y={176} size={26} color={GREEN}>X = A⁻¹B</F>
            <Caption y={262}>{t(say('Alde berean bi aldeetan: hemen, ezkerrean', 'Por el mismo lado en los dos miembros: aquí, a la izquierda', 'من الجهة نفسها في الطرفين: هنا من اليسار', 'On the same side in both members: here, on the left'))}</Caption>
        </Figure>
    )
}

/* ---------- Two matrix equations ---------- */

export function MatrixSystemFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    return (
        <Figure height={330} label={t(say('X + Y eta X − Y batuta, 2X ateratzen da; Y desagertzen da', 'Al sumar X + Y y X − Y sale 2X: Y desaparece', 'بجمع X + Y وX − Y نحصل على 2X: يختفي Y', 'Adding X + Y and X − Y gives 2X: Y disappears'))}>
            <F x={150} y={74} anchor="end" size={24}>X + Y =</F>
            <MatrixBlock x={160} y={40} cells={[['3', '1'], ['2', '5']]} cell={48} rowGap={36} size={22} tint={() => STAGE_TINT} />
            <F x={150} y={160} anchor="end" size={24}>X − Y =</F>
            <MatrixBlock x={160} y={126} cells={[['1', '−1'], ['0', '3']]} cell={48} rowGap={36} size={22} tint={() => MUSTARD_TINT} />
            <line x1={40} x2={290} y1={214} y2={214} stroke={INK} strokeWidth={2.4} />
            <F x={150} y={262} anchor="end" size={24} color={GREEN}>2X =</F>
            <MatrixBlock x={160} y={228} cells={[['4', '0'], ['2', '8']]} cell={48} rowGap={36} size={22} tint={() => GREEN_TINT} />
            <F x={360} y={150} size={22} color={MUTED}>+</F>
            <F x={420} y={262} size={24} color={GREEN}>X = (2 0 / 1 4)</F>
            <Label x={540} y={90} textAnchor="middle" fontSize={19} fill={MUTED}>{t(say('Y desagertzen da', 'Y desaparece', 'يختفي Y', 'Y disappears'))}</Label>
        </Figure>
    )
}

/* ---------- AX = XA, entry by entry ---------- */

export function CommuteFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const ax = [['a + c', 'b + d'], ['c', 'd']]
    const xa = [['a', 'a + b'], ['c', 'c + d']]
    const tint = (r: number, c: number) => (r === 1 && c === 0 ? undefined : MUSTARD_TINT)
    return (
        <Figure height={320} label={t(say('AX eta XA elementuz elementu berdinduta: a + c = a, b + d = a + b eta d = c + d; beraz, c = 0 eta d = a', 'AX y XA igualadas casilla a casilla: a + c = a, b + d = a + b y d = c + d; así, c = 0 y d = a', 'AX وXA متساويتان عنصرًا عنصرًا: a + c = a وb + d = a + b وd = c + d؛ إذن c = 0 وd = a', 'AX and XA matched entry by entry: a + c = a, b + d = a + b and d = c + d; so c = 0 and d = a'))}>
            <F x={60} y={104} size={24}>AX =</F>
            <MatrixBlock x={130} y={60} cells={ax} cell={84} rowGap={44} size={22} tint={tint} />
            <F x={400} y={104} size={24}>XA =</F>
            <MatrixBlock x={470} y={60} cells={xa} cell={84} rowGap={44} size={22} tint={tint} />
            <F x={360} y={204} anchor="middle" size={22} color={STAGE}>c = 0      d = a</F>
            <F x={360} y={248} anchor="middle" size={24} color={GREEN}>X = (a b / 0 a)</F>
            <Caption y={292}>{t(say('Elementuz elementu: ekuazio-sistema bat', 'Casilla a casilla: un sistema de ecuaciones', 'عنصرًا عنصرًا: نظام معادلات', 'Entry by entry: a system of equations'))}</Caption>
        </Figure>
    )
}

/* ---------- Home page art ---------- */

export function MatricesHeroArt() {
    const font = 'Fraunces, serif'
    return (
        <div className="fraction-v2-collage" aria-hidden="true">
            <svg viewBox="0 0 520 400" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                <g transform="translate(34 40) rotate(-4)">
                    <rect width={230} height={150} rx={16} fill={PAPER} stroke={INK} strokeWidth={2} />
                    <path d="M58 30 q-14 45 0 90" fill="none" stroke={INK} strokeWidth={2.4} />
                    <path d="M172 30 q14 45 0 90" fill="none" stroke={INK} strokeWidth={2.4} />
                    <text x={90} y={66} textAnchor="middle" fontSize={24} fontWeight={700} fill={INK} fontFamily={font} direction="ltr">2</text>
                    <text x={140} y={66} textAnchor="middle" fontSize={24} fontWeight={700} fill={INK} fontFamily={font} direction="ltr">1</text>
                    <text x={90} y={106} textAnchor="middle" fontSize={24} fontWeight={700} fill={INK} fontFamily={font} direction="ltr">5</text>
                    <text x={140} y={106} textAnchor="middle" fontSize={24} fontWeight={700} fill="#2f6fdb" fontFamily={font} direction="ltr">3</text>
                </g>
                <g transform="translate(290 36) rotate(4)">
                    <rect width={196} height={110} rx={16} fill="#fbebc0" stroke={INK} strokeWidth={2} />
                    <text x={98} y={66} textAnchor="middle" fontSize={28} fontWeight={700} fill="#c4432a" fontFamily={font} direction="ltr">AB ≠ BA</text>
                </g>
                <g transform="translate(290 190) rotate(-3)">
                    <rect width={196} height={110} rx={16} fill="#e8e0f7" stroke={INK} strokeWidth={2} />
                    <text x={98} y={66} textAnchor="middle" fontSize={28} fontWeight={700} fill={INK} fontFamily={font} direction="ltr">A · A⁻¹ = I</text>
                </g>
                <g transform="translate(40 230)">
                    <rect width={226} height={130} rx={16} fill="#d6eddf" stroke={INK} strokeWidth={2} />
                    <path d="M40 40 h48 v32 h48 v32 h48" fill="none" stroke="#267b53" strokeWidth={3} strokeDasharray="7 5" />
                    <text x={170} y={52} textAnchor="middle" fontSize={22} fontWeight={700} fill={INK} fontFamily={font} direction="ltr">rg = 2</text>
                </g>
            </svg>
        </div>
    )
}
