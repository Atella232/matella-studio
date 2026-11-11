import type { ReactNode } from 'react'
import { pickText, type LocalizedText, type UnitLanguage } from '../../features/unit-v2/types'
import { Label } from '../dbh2-funtzioak-v2/plane'
import { Figure } from '../dbh2-zatikiak-prototype/figures'
import { MatrixBlock } from '../batx2-zientziak-matrizeak/MatrixSvg'
import { DeterminantBlock } from './DeterminantSvg'

/* ==========================================================================
   Determinanteak · Batxilergoa 2 · Zientziak — the lesson figures: the
   parallelogram of two columns and its area, the six products of Sarrus,
   two arrows on one line (area 0), two rows swapped, a column stretched, a
   column sheared (same area), the areas multiplied by A and B, the
   chessboard of cofactor signs, a column with two zeros, the curve of a
   determinant that depends on a letter, a minor bordered, and the steps of
   the inverse with the adjugate. Numbers in their own <text> (left to
   right); words through <Label>.
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
const GRID = 'var(--line, #d6cfc2)'
const AREA = 'rgba(47, 111, 219, 0.18)'

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const useText = (language: UnitLanguage) => (text: LocalizedText) => pickText(language, text)

function Caption({ y, children }: { y: number; children: ReactNode }) {
    return <Label x={360} y={y} textAnchor="middle" fontSize={20} fill={MUTED}>{children}</Label>
}

function F({ x, y, children, size = 22, color = INK, anchor = 'start', weight = 700 }: { x: number; y: number; children: ReactNode; size?: number; color?: string; anchor?: 'start' | 'middle' | 'end'; weight?: number }) {
    return <text x={x} y={y} textAnchor={anchor} fontSize={size} fontWeight={weight} fill={color} direction="ltr">{children}</text>
}

function Arrow({ x1, y1, x2, y2, color = MUTED, width = 2.6 }: { x1: number; y1: number; x2: number; y2: number; color?: string; width?: number }) {
    const angle = Math.atan2(y2 - y1, x2 - x1)
    const back = (side: number) => `${x2 - 12 * Math.cos(angle) + side * Math.sin(angle)},${y2 - 12 * Math.sin(angle) - side * Math.cos(angle)}`
    return (
        <g>
            <line x1={x1} y1={y1} x2={x2 - 8 * Math.cos(angle)} y2={y2 - 8 * Math.sin(angle)} stroke={color} strokeWidth={width} />
            <polygon points={`${x2},${y2} ${back(6)} ${back(-6)}`} fill={color} />
        </g>
    )
}

/** A small grid with its origin at (ox, oy) and `unit` pixels per square */
function Squares({ ox, oy, unit, columns, rows }: { ox: number; oy: number; unit: number; columns: number; rows: number }) {
    return (
        <g>
            {Array.from({ length: columns + 1 }, (_, i) => <line key={`v${i}`} x1={ox + i * unit} x2={ox + i * unit} y1={oy - rows * unit} y2={oy} stroke={GRID} strokeWidth={1} />)}
            {Array.from({ length: rows + 1 }, (_, j) => <line key={`h${j}`} x1={ox} x2={ox + columns * unit} y1={oy - j * unit} y2={oy - j * unit} stroke={GRID} strokeWidth={1} />)}
            <line x1={ox} x2={ox + columns * unit} y1={oy} y2={oy} stroke={MUTED} strokeWidth={1.6} />
            <line x1={ox} x2={ox} y1={oy} y2={oy - rows * unit} stroke={MUTED} strokeWidth={1.6} />
        </g>
    )
}

/** The parallelogram of two columns u and v, drawn from (ox, oy) */
function Parallelogram({ ox, oy, unit, u, v, fill = AREA }: { ox: number; oy: number; unit: number; u: [number, number]; v: [number, number]; fill?: string }) {
    const p = (x: number, y: number) => `${ox + x * unit},${oy - y * unit}`
    return (
        <g>
            <polygon points={`${p(0, 0)} ${p(u[0], u[1])} ${p(u[0] + v[0], u[1] + v[1])} ${p(v[0], v[1])}`} fill={fill} stroke={STAGE} strokeWidth={1.4} strokeDasharray="5 4" />
            <Arrow x1={ox} y1={oy} x2={ox + u[0] * unit} y2={oy - u[1] * unit} color={STAGE} width={3} />
            <Arrow x1={ox} y1={oy} x2={ox + v[0] * unit} y2={oy - v[1] * unit} color={SECOND} width={3} />
        </g>
    )
}

/* ---------- |A| as an area ---------- */

export function ParallelogramFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    return (
        <Figure height={340} label={t(say('(3, 2) eta (5, 4) zutabeek osatzen duten paralelogramoa; haren azalera 2 da, determinantea bezala', 'El paralelogramo de las columnas (3, 2) y (5, 4); su área es 2, como el determinante', 'متوازي الأضلاع للعمودين (3, 2) و(5, 4)؛ مساحته 2 مثل المحدد', 'The parallelogram of the columns (3, 2) and (5, 4); its area is 2, like the determinant'))}>
            <Squares ox={40} oy={300} unit={34} columns={9} rows={7} />
            <Parallelogram ox={40} oy={300} unit={34} u={[3, 2]} v={[5, 4]} />
            <F x={40 + 3 * 34 + 8} y={300 - 2 * 34 + 22} size={18} color={STAGE}>(3, 2)</F>
            <F x={40 + 5 * 34 - 12} y={300 - 4 * 34 - 10} size={18} color={SECOND} anchor="end">(5, 4)</F>
            <DeterminantBlock x={430} y={70} cells={[['3', '5'], ['2', '4']]} cell={54} rowGap={48} size={24} tint={(_, c) => (c === 0 ? STAGE_TINT : MUSTARD_TINT)} />
            <F x={560} y={128} size={24}>= 12 − 10 = 2</F>
            <Caption y={226}>{t(say('Zutabeak geziak dira', 'Las columnas son flechas', 'العمودان سهمان', 'The columns are arrows'))}</Caption>
            <Caption y={262}>{t(say('|A| = azalera, zeinuarekin', '|A| = área, con signo', '|A| = المساحة بإشارتها', '|A| = area, with a sign'))}</Caption>
        </Figure>
    )
}

/* ---------- Sarrus ---------- */

export function SarrusFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const cells = [['1', '2', '0'], ['3', '1', '2'], ['1', '0', '4']]
    const cell = 52
    const at = (r: number, c: number): [number, number] => [70 + 8 + c * cell + cell / 2, 50 + r * 46 + 23]
    const plus = [[[0, 0], [1, 1], [2, 2]], [[0, 1], [1, 2], [2, 0]], [[0, 2], [1, 0], [2, 1]]]
    const minus = [[[0, 2], [1, 1], [2, 0]], [[0, 0], [1, 2], [2, 1]], [[0, 1], [1, 0], [2, 2]]]
    const path = (points: number[][]) => points.map(([r, c], index) => `${index ? 'L' : 'M'}${at(r, c)[0]} ${at(r, c)[1]}`).join(' ')
    return (
        <Figure height={340} label={t(say('Sarrusen sei biderkadurak: hiru batzen (berdeak) eta hiru kentzen (gorriak)', 'Los seis productos de Sarrus: tres suman (verdes) y tres restan (rojos)', 'حواصل ساروس الستة: ثلاثة تُجمع (خضراء) وثلاثة تُطرح (حمراء)', 'The six products of Sarrus: three add (green) and three subtract (red)'))}>
            <DeterminantBlock x={70} y={50} cells={cells} cell={cell} rowGap={46} size={22} />
            {plus.map((points, index) => <path key={`p${index}`} d={path(points)} fill="none" stroke={GREEN} strokeWidth={2.4} opacity={0.75} strokeDasharray={index ? '6 4' : undefined} />)}
            <DeterminantBlock x={300} y={50} cells={cells} cell={cell} rowGap={46} size={22} />
            {minus.map((points, index) => <path key={`m${index}`} d={path(points).replace(/M(\d+)/, (_, x) => `M${Number(x) + 230}`).replace(/L(\d+)/g, (_, x) => `L${Number(x) + 230}`)} fill="none" stroke={SECOND} strokeWidth={2.4} opacity={0.75} strokeDasharray={index ? '6 4' : undefined} />)}
            <F x={162} y={222} anchor="middle" size={20} color={GREEN}>4 + 4 + 0 = 8</F>
            <F x={392} y={222} anchor="middle" size={20} color={SECOND}>0 + 24 + 0 = 24</F>
            <F x={600} y={130} anchor="middle" size={26}>8 − 24</F>
            <F x={600} y={168} anchor="middle" size={26} color={STAGE}>= −16</F>
            <Caption y={290}>{t(say('Diagonal nagusia eta haren triangeluak batzen dira; bestea kentzen da', 'La diagonal principal y sus triángulos suman; la otra resta', 'القطر الرئيسي ومثلثاه يُجمعان؛ والآخر يُطرح', 'The main diagonal and its triangles add; the other subtracts'))}</Caption>
        </Figure>
    )
}

/* ---------- Area 0: the arrows on one line ---------- */

export function FlatFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    return (
        <Figure height={320} label={t(say('(1, 2) eta (2, 4) zutabeak zuzen berean daude: paralelogramoa zapalduta dago, eta azalera 0 da', 'Las columnas (1, 2) y (2, 4) están en la misma recta: el paralelogramo se aplasta y el área es 0', 'العمودان (1, 2) و(2, 4) على المستقيم نفسه: ينسحق متوازي الأضلاع والمساحة 0', 'The columns (1, 2) and (2, 4) are on the same line: the parallelogram is flattened and the area is 0'))}>
            <Squares ox={60} oy={280} unit={44} columns={5} rows={5} />
            <Arrow x1={60} y1={280} x2={60 + 2 * 44} y2={280 - 4 * 44} color={SECOND} width={3} />
            <Arrow x1={60} y1={280} x2={60 + 44} y2={280 - 2 * 44} color={STAGE} width={4} />
            <F x={60 + 44 + 10} y={280 - 2 * 44 + 6} size={18} color={STAGE}>(1, 2)</F>
            <F x={60 + 2 * 44 + 10} y={280 - 4 * 44 + 6} size={18} color={SECOND}>(2, 4)</F>
            <DeterminantBlock x={400} y={80} cells={[['1', '2'], ['2', '4']]} cell={54} rowGap={48} size={24} tint={(_, c) => (c === 0 ? STAGE_TINT : CORAL_TINT)} />
            <F x={530} y={138} size={24}>= 4 − 4 = 0</F>
            <Caption y={240}>{t(say('Zutabe proportzionalak: azalerarik ez', 'Columnas proporcionales: no hay área', 'عمودان متناسبان: لا مساحة', 'Proportional columns: no area'))}</Caption>
        </Figure>
    )
}

/* ---------- Two rows swapped ---------- */

export function SwapFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    return (
        <Figure height={300} label={t(say('Bi errenkada trukatzean, determinantea 4 izatetik −4 izatera pasatzen da', 'Al cambiar dos filas, el determinante pasa de 4 a −4', 'عند تبديل صفين يصير المحدد −4 بدل 4', 'Swapping two rows turns the determinant from 4 into −4'))}>
            <DeterminantBlock x={70} y={70} cells={[['2', '1'], ['2', '3']]} cell={56} rowGap={52} size={26} tint={(r) => (r === 0 ? STAGE_TINT : MUSTARD_TINT)} />
            <F x={206} y={132} size={26}>= 4</F>
            <Arrow x1={290} y1={124} x2={370} y2={124} color={SECOND} />
            <F x={330} y={104} anchor="middle" size={18} color={SECOND}>E₁ ↔ E₂</F>
            <DeterminantBlock x={400} y={70} cells={[['2', '3'], ['2', '1']]} cell={56} rowGap={52} size={26} tint={(r) => (r === 0 ? MUSTARD_TINT : STAGE_TINT)} />
            <F x={536} y={132} size={26} color={SECOND}>= −4</F>
            <Caption y={240}>{t(say('Truke bakoitzak zeinua aldatzen du', 'Cada cambio de filas cambia el signo', 'كل تبديل للصفوف يغيّر الإشارة', 'Each swap of rows changes the sign'))}</Caption>
        </Figure>
    )
}

/* ---------- A column multiplied by 2 ---------- */

export function ScaleFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    return (
        <Figure height={320} label={t(say('Zutabe bat bikoiztean, paralelogramoaren azalera bikoizten da', 'Al doblar una columna, el área del paralelogramo se dobla', 'عند مضاعفة عمود تتضاعف مساحة متوازي الأضلاع', 'Doubling a column doubles the area of the parallelogram'))}>
            <Squares ox={40} oy={280} unit={34} columns={7} rows={6} />
            <Parallelogram ox={40} oy={280} unit={34} u={[2, 0]} v={[1, 2]} />
            <F x={140} y={300} size={18} color={STAGE}>2</F>
            <Squares ox={380} oy={280} unit={34} columns={7} rows={6} />
            <Parallelogram ox={380} oy={280} unit={34} u={[4, 0]} v={[1, 2]} fill="rgba(38, 123, 83, 0.2)" />
            <F x={530} y={300} size={18} color={STAGE}>2 · 2</F>
            <F x={200} y={60} anchor="middle" size={22}>|A| = 4</F>
            <F x={540} y={60} anchor="middle" size={22} color={GREEN}>2 · 4 = 8</F>
        </Figure>
    )
}

/* ---------- A shear: the same area ---------- */

export function ShearFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    return (
        <Figure height={320} label={t(say('Zutabe bati bestearen multiplo bat batzean, paralelogramoa okertzen da, baina azalera bera du', 'Al sumar a una columna un múltiplo de la otra, el paralelogramo se tuerce pero tiene la misma área', 'عند إضافة مضاعف عمود إلى الآخر يميل متوازي الأضلاع لكن مساحته لا تتغير', 'Adding a multiple of one column to the other slants the parallelogram but keeps its area'))}>
            <Squares ox={40} oy={260} unit={34} columns={8} rows={5} />
            <Parallelogram ox={40} oy={260} unit={34} u={[3, 0]} v={[0, 2]} />
            <Squares ox={380} oy={260} unit={34} columns={9} rows={5} />
            <Parallelogram ox={380} oy={260} unit={34} u={[3, 0]} v={[3, 2]} fill="rgba(38, 123, 83, 0.2)" />
            <F x={170} y={50} anchor="middle" size={22}>|A| = 6</F>
            <F x={540} y={50} anchor="middle" size={22} color={GREEN}>(3, 2): 6</F>
            <Caption y={302}>{t(say('Oinarri bera eta altuera bera: azalera bera', 'Misma base y misma altura: misma área', 'القاعدة نفسها والارتفاع نفسه: المساحة نفسها', 'Same base and same height: same area'))}</Caption>
        </Figure>
    )
}

/* ---------- |AB| = |A|·|B| ---------- */

export function ChainFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const card = (x: number, title: string, text: string, tint: string) => (
        <g>
            <rect x={x} y={70} width={170} height={110} rx={16} fill={tint} stroke={INK} strokeWidth={1.8} />
            <F x={x + 85} y={112} anchor="middle" size={24}>{title}</F>
            <F x={x + 85} y={152} anchor="middle" size={22} color={STAGE}>{text}</F>
        </g>
    )
    return (
        <Figure height={290} label={t(say('A matrizeak azalerak 3 zenbakiaz biderkatzen ditu, eta B matrizeak −2 zenbakiaz; AB biderkadurak −6 zenbakiaz', 'A multiplica las áreas por 3 y B por −2; AB, por −6', 'تضرب A المساحات في 3 وB في −2؛ وAB في −6', 'A multiplies areas by 3 and B by −2; AB by −6'))}>
            {card(30, '|A| = 3', '× 3', STAGE_TINT)}
            <F x={222} y={136} anchor="middle" size={28}>·</F>
            {card(250, '|B| = −2', '× (−2)', MUSTARD_TINT)}
            <F x={442} y={136} anchor="middle" size={28}>=</F>
            {card(470, '|AB| = −6', '× (−6)', GREEN_TINT)}
            <Caption y={240}>{t(say('Biderkatu matrizeak: determinanteak biderkatzen dira', 'Multiplicar matrices multiplica los determinantes', 'ضرب المصفوفات يضرب المحددات', 'Multiplying matrices multiplies the determinants'))}</Caption>
        </Figure>
    )
}

/* ---------- The chessboard of cofactor signs ---------- */

export function CheckerboardFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    return (
        <Figure height={330} label={t(say('Adjuntuen zeinuak xake-taula bat bezala, eta a₁₂ elementuaren menorea: 1. errenkada eta 2. zutabea kenduta', 'Los signos de los adjuntos como un tablero de ajedrez, y el menor de a₁₂: sin la fila 1 ni la columna 2', 'إشارات المتممات الجبرية مثل رقعة الشطرنج، والمحدد الأصغر لـ a₁₂: دون الصف 1 والعمود 2', 'The signs of the cofactors like a chessboard, and the minor of a₁₂: without row 1 and column 2'))}>
            {[0, 1, 2].map((r) => [0, 1, 2].map((c) => (
                <g key={`${r}${c}`}>
                    <rect x={50 + c * 62} y={50 + r * 62} width={62} height={62} fill={(r + c) % 2 === 0 ? STAGE_TINT : CORAL_TINT} stroke={INK} strokeWidth={1.2} />
                    <F x={81 + c * 62} y={92 + r * 62} anchor="middle" size={30} color={(r + c) % 2 === 0 ? STAGE : SECOND}>{(r + c) % 2 === 0 ? '+' : '−'}</F>
                </g>
            )))}
            <DeterminantBlock x={340} y={50} cells={[['2', '1', '3'], ['0', '4', '1'], ['5', '2', '1']]} cell={54} rowGap={52} size={24} strike={{ row: 0, column: 1 }} tint={(r, c) => (r !== 0 && c !== 1 ? GREEN_TINT : undefined)} />
            <F x={560} y={250} anchor="middle" size={22} color={GREEN}>A₁₂ = −(0 − 5) = 5</F>
            <Caption y={300}>{t(say('Ezabatu errenkada eta zutabea; gero, zeinua', 'Tacha la fila y la columna; después, el signo', 'احذف الصف والعمود؛ ثم الإشارة', 'Strike out the row and the column; then the sign'))}</Caption>
        </Figure>
    )
}

/* ---------- A column with two zeros ---------- */

export function ExpansionFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    return (
        <Figure height={320} label={t(say('2. zutabeak bi zero ditu: haren arabera garatzean, a₃₂ = 5 elementuak bakarrik balio du', 'La columna 2 tiene dos ceros: al desarrollar por ella solo cuenta a₃₂ = 5', 'العمود 2 فيه صفران: عند النشر حسبه لا يُحسب إلا a₃₂ = 5', 'Column 2 has two zeros: expanding along it, only a₃₂ = 5 counts'))}>
            <DeterminantBlock x={60} y={50} cells={[['3', '0', '1'], ['2', '0', '4'], ['1', '5', '2']]} cell={58} rowGap={54} size={26} signs tint={(r, c) => (c === 1 ? (r === 2 ? GREEN_TINT : MUSTARD_TINT) : undefined)} />
            <Arrow x1={270} y1={140} x2={340} y2={140} />
            <F x={360} y={110} size={22}>5 · A₃₂</F>
            <F x={360} y={150} size={22}>A₃₂ = −(12 − 2) = −10</F>
            <F x={360} y={190} size={24} color={STAGE}>|A| = −50</F>
            <Caption y={290}>{t(say('Zero bakoitzak determinante bat aurrezten du', 'Cada cero ahorra un determinante', 'كل صفر يوفّر محددًا', 'Each zero saves a determinant'))}</Caption>
        </Figure>
    )
}

/* ---------- A determinant that depends on a letter ---------- */

export function RootsCurveFigure({ language, kind }: { language: UnitLanguage; kind: 'cubic' | 'square' | 'parabola' }) {
    const t = useText(language)
    const settings = {
        cubic: { f: (x: number) => x ** 3 - 3 * x + 2, roots: [-2, 1], label: '|A| = (x − 1)²(x + 2)', name: 'x', min: -3, max: 2.4, top: 6, bottom: -6 },
        square: { f: (x: number) => (x - 1) ** 2, roots: [1], label: '|A| = (a − 1)²', name: 'a', min: -1.5, max: 3.5, top: 6, bottom: -1 },
        parabola: { f: (x: number) => x * x - 1, roots: [-1, 1], label: '|A| = m² − 1', name: 'm', min: -2.5, max: 2.5, top: 5, bottom: -2 }
    }[kind]
    const ox = 360
    const unit = 120 / (settings.max - settings.min) * 4.4
    const x = (value: number) => ox + (value - (settings.min + settings.max) / 2) * unit
    const yScale = 200 / (settings.top - settings.bottom)
    const y = (value: number) => 40 + (settings.top - value) * yScale
    const points = Array.from({ length: 161 }, (_, i) => settings.min + ((settings.max - settings.min) * i) / 160).map((value) => `${x(value)},${y(Math.max(settings.bottom, Math.min(settings.top, settings.f(value))))}`).join(' ')
    return (
        <Figure height={320} label={t(say(`${settings.label} kurba; zero egiten den lekuetan ez dago alderantzizkorik eta heina jaitsi egiten da`, `La curva ${settings.label}; donde se anula no hay inversa y el rango baja`, `منحنى ${settings.label}؛ حيث ينعدم لا يوجد معكوس وتنقص الرتبة`, `The curve ${settings.label}; where it is zero there is no inverse and the rank goes down`))}>
            <line x1={x(settings.min)} x2={x(settings.max)} y1={y(0)} y2={y(0)} stroke={MUTED} strokeWidth={1.6} />
            <F x={x(settings.max) + 6} y={y(0) + 6} size={18} color={MUTED} weight={600}>{settings.name}</F>
            <polyline points={points} fill="none" stroke={STAGE} strokeWidth={3} />
            {settings.roots.map((root) => (
                <g key={root}>
                    <circle cx={x(root)} cy={y(0)} r={8} fill={PAPER} stroke={SECOND} strokeWidth={3} />
                    <F x={x(root)} y={y(0) + 30} anchor="middle" size={18} color={SECOND}>{root < 0 ? `−${-root}` : String(root)}</F>
                </g>
            ))}
            <F x={360} y={286} anchor="middle" size={22}>{settings.label}</F>
            <Label x={360} y={312} textAnchor="middle" fontSize={17} fill={MUTED}>{t(say('Zero den lekuetan: |A| = 0', 'Donde se anula: |A| = 0', 'حيث ينعدم: |A| = 0', 'Where it vanishes: |A| = 0'))}</Label>
        </Figure>
    )
}

/* ---------- A minor bordered ---------- */

export function BorderFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    return (
        <Figure height={330} label={t(say('0 ez den 2. ordenako menore bat, eta hura orlatzen duen 3. ordenako menorea, 0 dena: heina 2 da', 'Un menor de orden 2 distinto de 0 y el menor de orden 3 que lo orla, que vale 0: el rango es 2', 'محدد أصغر من الرتبة 2 غير صفري والمحدد من الرتبة 3 الذي يطوّقه وقيمته 0: الرتبة 2', 'A minor of order 2 that is not 0 and the minor of order 3 that borders it, which is 0: the rank is 2'))}>
            <MatrixBlock x={60} y={60} cells={[['1', '2', '3'], ['2', '4', '1'], ['3', '6', '4']]} cell={58} rowGap={54} size={26} tint={(r, c) => (r < 2 && c > 0 ? GREEN_TINT : VIOLET_TINT)} />
            <rect x={60 + 14 + 58 + 2} y={62} width={2 * 58 - 4} height={2 * 54 - 4} rx={10} fill="none" stroke={GREEN} strokeWidth={2.6} />
            <F x={330} y={100} size={22} color={GREEN}>2 − 12 = −10 ≠ 0</F>
            <F x={330} y={150} size={22}>|A| = 0</F>
            <F x={330} y={200} size={24} color={STAGE}>rg(A) = 2</F>
            <Caption y={290}>{t(say('Orlatu: gehitu falta diren errenkada eta zutabea', 'Orlar: añadir la fila y la columna que faltan', 'التطويق: إضافة الصف والعمود الناقصين', 'Bordering: add the missing row and column'))}</Caption>
        </Figure>
    )
}

/* ---------- The inverse with the adjugate ---------- */

export function AdjugateFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const step = (x: number, title: string, text: string, tint: string) => (
        <g>
            <rect x={x} y={60} width={150} height={92} rx={14} fill={tint} stroke={INK} strokeWidth={1.6} />
            <F x={x + 75} y={98} anchor="middle" size={22}>{title}</F>
            <F x={x + 75} y={132} anchor="middle" size={17} color={MUTED} weight={600}>{text}</F>
        </g>
    )
    return (
        <Figure height={280} label={t(say('Alderantzizkoa adjuntuekin, lau urratsetan: |A|, adjuntuak, iraulia eta |A| zenbakiaz zatitzea', 'La inversa con adjuntos en cuatro pasos: |A|, adjuntos, traspuesta y dividir entre |A|', 'المعكوس بالمتممات الجبرية في أربع خطوات: |A| والمتممات والنقل والقسمة على |A|', 'The inverse with cofactors in four steps: |A|, cofactors, transpose and divide by |A|'))}>
            {step(14, '|A| ≠ 0', '1', STAGE_TINT)}
            {step(190, 'Adj A', '2', MUSTARD_TINT)}
            {step(366, '(Adj A)ᵗ', '3', VIOLET_TINT)}
            {step(542, '÷ |A|', '4', GREEN_TINT)}
            {[164, 340, 516].map((x) => <Arrow key={x} x1={x + 2} y1={106} x2={x + 24} y2={106} />)}
            <F x={360} y={204} anchor="middle" size={24} color={GREEN}>A⁻¹ = (1/|A|) · (Adj A)ᵗ</F>
            <Caption y={250}>{t(say('|A| = 0 bada, ez dago alderantzizkorik', 'Si |A| = 0, no hay inversa', 'إذا كان |A| = 0 فلا معكوس', 'If |A| = 0, there is no inverse'))}</Caption>
        </Figure>
    )
}

/* ---------- Home page art ---------- */

export function DeterminantsHeroArt() {
    const font = 'Fraunces, serif'
    return (
        <div className="fraction-v2-collage" aria-hidden="true">
            <svg viewBox="0 0 520 400" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                <g transform="translate(34 40) rotate(-4)">
                    <rect width={230} height={150} rx={16} fill={PAPER} stroke={INK} strokeWidth={2} />
                    <line x1={64} x2={64} y1={34} y2={116} stroke={INK} strokeWidth={2.6} />
                    <line x1={166} x2={166} y1={34} y2={116} stroke={INK} strokeWidth={2.6} />
                    <text x={92} y={66} textAnchor="middle" fontSize={24} fontWeight={700} fill={INK} fontFamily={font} direction="ltr">3</text>
                    <text x={138} y={66} textAnchor="middle" fontSize={24} fontWeight={700} fill={INK} fontFamily={font} direction="ltr">5</text>
                    <text x={92} y={106} textAnchor="middle" fontSize={24} fontWeight={700} fill={INK} fontFamily={font} direction="ltr">2</text>
                    <text x={138} y={106} textAnchor="middle" fontSize={24} fontWeight={700} fill="#2f6fdb" fontFamily={font} direction="ltr">4</text>
                </g>
                <g transform="translate(290 36) rotate(4)">
                    <rect width={196} height={110} rx={16} fill="#fbebc0" stroke={INK} strokeWidth={2} />
                    <text x={98} y={66} textAnchor="middle" fontSize={26} fontWeight={700} fill="#c4432a" fontFamily={font} direction="ltr">|AB| = |A||B|</text>
                </g>
                <g transform="translate(290 190) rotate(-3)">
                    <rect width={196} height={110} rx={16} fill="#e8e0f7" stroke={INK} strokeWidth={2} />
                    <text x={98} y={66} textAnchor="middle" fontSize={30} fontWeight={700} fill={INK} fontFamily={font} direction="ltr">+ − +</text>
                </g>
                <g transform="translate(40 230)">
                    <rect width={226} height={130} rx={16} fill="#d6eddf" stroke={INK} strokeWidth={2} />
                    <polygon points="40,104 120,74 190,30 110,60" fill="rgba(47, 111, 219, 0.25)" stroke="#2f6fdb" strokeWidth={2.4} />
                </g>
            </svg>
        </div>
    )
}
