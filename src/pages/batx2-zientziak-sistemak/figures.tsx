import type { ReactNode } from 'react'
import { pickText, type LocalizedText, type UnitLanguage } from '../../features/unit-v2/types'
import { Label } from '../dbh2-funtzioak-v2/plane'
import { Figure } from '../dbh2-zatikiak-prototype/figures'
import { MatrixBlock } from '../batx2-zientziak-matrizeak/MatrixSvg'
import { DeterminantBlock } from '../batx2-zientziak-determinanteak/DeterminantSvg'

/* ==========================================================================
   Sistemak · Batxilergoa 2 · Zientziak — the lesson figures: a system and
   its matrices A, X, B and A*, the Rouché–Frobenius decision, three lines
   in the plane (one point, a triangle, two parallel), Cramer's column
   swapped in, and the map of a discussion along the values of a. Numbers
   in their own <text> (left to right); words through <Label>.
   ========================================================================== */

const INK = 'var(--ink, #1d2733)'
const MUTED = 'var(--muted, #58616e)'
const STAGE = 'var(--stage, #2f6fdb)'
const SECOND = 'var(--second, #c4432a)'
const GREEN = 'var(--success, #267b53)'
const GREEN_TINT = '#d6eddf'
const CORAL_TINT = '#f6dcd3'
const MUSTARD_TINT = '#fbebc0'
const VIOLET_TINT = '#e8e0f7'
const BLUE_TINT = '#dde7f7'
const PAPER = '#fffcf6'
const GRID = 'var(--line, #d6cfc2)'

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const useText = (language: UnitLanguage) => (text: LocalizedText) => pickText(language, text)

function Caption({ y, children }: { y: number; children: ReactNode }) {
    return <Label x={360} y={y} textAnchor="middle" fontSize={20} fill={MUTED}>{children}</Label>
}

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

/* ---------- AX = B and A* ---------- */

export function AugmentedFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    return (
        <Figure height={300} label={t(say('Sistema bat AX = B gisa: A koefizienteak, X ezezagunak, B gai askeak; eta A* = (A | B)', 'Un sistema como AX = B: A los coeficientes, X las incógnitas, B los términos independientes; y A* = (A | B)', 'نظام بصورة AX = B: A المعاملات و X المجاهيل و B الحدود الثابتة؛ و A* = (A | B)', 'A system as AX = B: A the coefficients, X the unknowns, B the constant terms; and A* = (A | B)'))}>
            <MatrixBlock x={20} y={60} cells={[['2', '1', '−1'], ['1', '−1', '2'], ['3', '0', '2']]} cell={46} rowGap={44} size={22} tint={() => BLUE_TINT} />
            <MatrixBlock x={210} y={60} cells={[['x'], ['y'], ['z']]} cell={40} rowGap={44} size={22} />
            <F x={296} y={136} size={26}>=</F>
            <MatrixBlock x={320} y={60} cells={[['3'], ['1'], ['4']]} cell={40} rowGap={44} size={22} tint={() => MUSTARD_TINT} />
            <F x={104} y={40} anchor="middle" size={24} color={STAGE}>A</F>
            <F x={244} y={40} anchor="middle" size={24}>X</F>
            <F x={354} y={40} anchor="middle" size={24} color={SECOND}>B</F>
            <MatrixBlock x={440} y={60} cells={[['2', '1', '−1', '3'], ['1', '−1', '2', '1'], ['3', '0', '2', '4']]} cell={58} rowGap={44} size={22} barBefore={3} tint={(_, c) => (c === 3 ? MUSTARD_TINT : BLUE_TINT)} bracket={12} />
            <F x={590} y={40} anchor="middle" size={24} color={GREEN}>A*</F>
            <Caption y={240}>{t(say('Ezezagun bat falta bada, 0 bat haren zutabean', 'Si falta una incógnita, un 0 en su columna', 'إذا غاب مجهول، 0 في عموده', 'If an unknown is missing, a 0 in its column'))}</Caption>
            <Caption y={276}>{t(say('A*: A gehi B zutabea', 'A*: A más la columna B', 'A*: A مع العمود B', 'A*: A plus the column B'))}</Caption>
        </Figure>
    )
}

/* ---------- The Rouché–Frobenius decision ---------- */

export function RoucheFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const box = (x: number, y: number, width: number, tint: string, title: string, words: LocalizedText) => (
        <g>
            <rect x={x} y={y} width={width} height={86} rx={14} fill={tint} stroke={INK} strokeWidth={1.6} />
            <F x={x + width / 2} y={y + 34} anchor="middle" size={20}>{title}</F>
            <Label x={x + width / 2} y={y + 66} textAnchor="middle" fontSize={17} fill={INK}>{t(words)}</Label>
        </g>
    )
    return (
        <Figure height={330} label={t(say('Rouché-Frobenius: rg(A) eta rg(A*) desberdinak badira, bateraezina; berdinak eta n badira, determinatua; berdinak eta n baino txikiagoak, indeterminatua', 'Rouché-Frobenius: si rg(A) y rg(A*) son distintos, incompatible; si son iguales a n, determinado; si son iguales y menores que n, indeterminado', 'روشيه-فروبينيوس: إذا اختلفت rg(A) و rg(A*) فغير متوافق؛ وإذا تساوتا مع n فمحدد؛ وإذا تساوتا وكانتا أصغر من n فغير محدد', 'Rouché–Frobenius: if rg(A) and rg(A*) differ, inconsistent; if equal to n, independent; if equal and less than n, dependent'))}>
            <rect x={230} y={14} width={260} height={56} rx={14} fill={PAPER} stroke={INK} strokeWidth={1.6} />
            <F x={360} y={50} anchor="middle" size={22}>rg(A) ? rg(A*)</F>
            <Arrow x1={300} y1={72} x2={150} y2={120} color={SECOND} />
            <Arrow x1={420} y1={72} x2={540} y2={120} color={GREEN} />
            <F x={190} y={96} anchor="middle" size={22} color={SECOND}>≠</F>
            <F x={530} y={96} anchor="middle" size={22} color={GREEN}>=</F>
            {box(30, 124, 240, CORAL_TINT, 'rg(A) ≠ rg(A*)', say('Bateraezina', 'Incompatible', 'غير متوافق', 'Inconsistent'))}
            {box(320, 124, 180, GREEN_TINT, 'r = n', say('Determinatua', 'Determinado', 'محدد', 'Independent'))}
            {box(520, 124, 180, VIOLET_TINT, 'r < n', say('Indeterminatua', 'Indeterminado', 'غير محدد', 'Dependent'))}
            <Caption y={260}>{t(say('n: ezezagun kopurua · r: bi heinak', 'n: número de incógnitas · r: los dos rangos', 'n: عدد المجاهيل · r: الرتبتان', 'n: number of unknowns · r: both ranks'))}</Caption>
            <Caption y={300}>{t(say('Parametroak: n − r', 'Parámetros: n − r', 'الوسائط: n − r', 'Parameters: n − r'))}</Caption>
        </Figure>
    )
}

/* ---------- Three lines in the plane ---------- */

/** Draws the line ax + by = c inside a small square of the plane */
function PlaneLine({ ox, oy, unit, a, b, c, color }: { ox: number; oy: number; unit: number; a: number; b: number; c: number; color: string }) {
    const span = 3.6
    const points = b !== 0 ? [[-span, (c + a * span) / b], [span, (c - a * span) / b]] : [[c / a, -span], [c / a, span]]
    const [[x1, y1], [x2, y2]] = points
    return <line x1={ox + x1 * unit} y1={oy - y1 * unit} x2={ox + x2 * unit} y2={oy - y2 * unit} stroke={color} strokeWidth={3} strokeLinecap="round" />
}

export function ThreeLinesFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const unit = 28
    const panel = (ox: number, lines: Array<[number, number, number]>, title: LocalizedText, ranks: string, dot?: [number, number]) => (
        <g>
            <clipPath id={`three-lines-${ox}`}><rect x={ox - 100} y={40} width={200} height={190} /></clipPath>
            <rect x={ox - 100} y={40} width={200} height={190} rx={12} fill={PAPER} stroke={GRID} strokeWidth={1.4} />
            <line x1={ox - 100} x2={ox + 100} y1={135} y2={135} stroke={GRID} strokeWidth={1.2} />
            <line x1={ox} x2={ox} y1={40} y2={230} stroke={GRID} strokeWidth={1.2} />
            <g clipPath={`url(#three-lines-${ox})`}>
                {lines.map(([a, b, c], index) => <PlaneLine key={index} ox={ox} oy={135} unit={unit} a={a} b={b} c={c} color={[STAGE, SECOND, GREEN][index]} />)}
            </g>
            {dot && <circle cx={ox + dot[0] * unit} cy={135 - dot[1] * unit} r={7} fill={INK} />}
            <Label x={ox} y={262} textAnchor="middle" fontSize={19} fill={INK} fontWeight={700}>{t(title)}</Label>
            <F x={ox} y={292} anchor="middle" size={17} color={MUTED}>{ranks}</F>
        </g>
    )
    return (
        <Figure height={310} label={t(say('Hiru zuzen: puntu batean ebakitzen dira, triangelu bat osatzen dute, edo bi paraleloak dira', 'Tres rectas: se cortan en un punto, forman un triángulo o dos son paralelas', 'ثلاثة مستقيمات: تتقاطع في نقطة، أو تشكّل مثلثًا، أو يكون اثنان متوازيين', 'Three lines: they meet at one point, make a triangle, or two are parallel'))}>
            {panel(120, [[1, 1, 3], [1, -1, 1], [2, 1, 5]], say('Puntu bat', 'Un punto', 'نقطة', 'One point'), 'rg = 2, rg* = 2', [2, 1])}
            {panel(360, [[1, 1, 2], [1, -1, 0], [0, 1, -1]], say('Triangelua', 'Triángulo', 'مثلث', 'Triangle'), 'rg = 2, rg* = 3')}
            {panel(600, [[1, 1, 1], [1, 1, -1], [1, -1, 0]], say('Bi paralelo', 'Dos paralelas', 'متوازيان', 'Two parallel'), 'rg = 2, rg* = 3')}
        </Figure>
    )
}

/* ---------- Cramer: the column of B goes in ---------- */

export function CramerFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    return (
        <Figure height={300} label={t(say('Cramer: x kalkulatzeko, B zutabea x ezezagunaren zutabearen lekuan jartzen da, eta |A| zenbakiaz zatitzen da', 'Cramer: para x, la columna B ocupa el lugar de la columna de x y se divide entre |A|', 'كرامر: لحساب x يحل العمود B محل عمود x ثم نقسم على |A|', 'Cramer: for x, the column B takes the place of the column of x and you divide by |A|'))}>
            <F x={30} y={150} size={30}>x =</F>
            <DeterminantBlock x={110} y={44} cells={[['6', '1', '1'], ['3', '−1', '1'], ['2', '2', '−1']]} cell={52} rowGap={38} size={22} tint={(_, c) => (c === 0 ? MUSTARD_TINT : undefined)} color={(_, c) => (c === 0 ? SECOND : undefined)} />
            <line x1={100} x2={300} y1={168} y2={168} stroke={INK} strokeWidth={2.6} />
            <DeterminantBlock x={110} y={180} cells={[['1', '1', '1'], ['2', '−1', '1'], ['1', '2', '−1']]} cell={52} rowGap={34} size={20} tint={(_, c) => (c === 0 ? BLUE_TINT : undefined)} />
            <F x={330} y={176} size={28}>=</F>
            <F x={380} y={152} anchor="middle" size={26}>7</F>
            <line x1={362} x2={398} y1={166} y2={166} stroke={INK} strokeWidth={2.4} />
            <F x={380} y={196} anchor="middle" size={26}>7</F>
            <F x={420} y={176} size={28} color={GREEN}>= 1</F>
            <Label x={590} y={90} textAnchor="middle" fontSize={19} fill={SECOND}>{t(say('B, x zutabearen ordez', 'B en lugar de la columna de x', 'B مكان عمود x', 'B instead of the column of x'))}</Label>
            <Label x={590} y={240} textAnchor="middle" fontSize={19} fill={STAGE}>{t(say('Behean, beti |A|', 'Abajo, siempre |A|', 'في المقام دائمًا |A|', 'Below, always |A|'))}</Label>
        </Figure>
    )
}

/* ---------- The map of a discussion ---------- */

export function ParameterMapFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const x = (a: number) => 360 + a * 110
    return (
        <Figure height={260} label={t(say('Eztabaidaren mapa: a = −2 denean bateraezina, a = 1 denean indeterminatua, eta beste balio guztietan determinatua', 'El mapa de la discusión: con a = −2 incompatible, con a = 1 indeterminado y con cualquier otro valor determinado', 'خريطة المناقشة: مع a = −2 غير متوافق، ومع a = 1 غير محدد، ومع أي قيمة أخرى محدد', 'The map of the discussion: with a = −2 inconsistent, with a = 1 dependent, and with any other value independent'))}>
            <rect x={30} y={90} width={660} height={34} rx={17} fill={GREEN_TINT} stroke={GREEN} strokeWidth={1.6} />
            <line x1={30} x2={690} y1={107} y2={107} stroke={GREEN} strokeWidth={1} opacity={0.5} />
            {[-3, -2, -1, 0, 1, 2].map((a) => <F key={a} x={x(a)} y={160} anchor="middle" size={18} color={MUTED} weight={500}>{a < 0 ? `−${-a}` : String(a)}</F>)}
            <circle cx={x(-2)} cy={107} r={13} fill={CORAL_TINT} stroke={SECOND} strokeWidth={3} />
            <circle cx={x(1)} cy={107} r={13} fill={VIOLET_TINT} stroke={INK} strokeWidth={3} />
            <F x={x(-2)} y={64} anchor="middle" size={18} color={SECOND}>a = −2</F>
            <F x={x(1)} y={64} anchor="middle" size={18}>a = 1</F>
            <Label x={x(-2)} y={200} textAnchor="middle" fontSize={18} fill={SECOND}>{t(say('Bateraezina', 'Incompatible', 'غير متوافق', 'Inconsistent'))}</Label>
            <Label x={x(1)} y={200} textAnchor="middle" fontSize={18} fill={INK}>{t(say('Indeterminatua', 'Indeterminado', 'غير محدد', 'Dependent'))}</Label>
            <Caption y={240}>{t(say('Gainerako balioak, berdez: determinatua', 'El resto de valores, en verde: determinado', 'باقي القيم بالأخضر: محدد', 'Every other value, in green: independent'))}</Caption>
        </Figure>
    )
}

/* ---------- Home page art ---------- */

export function SystemsHeroArt() {
    const font = 'Fraunces, serif'
    return (
        <div className="fraction-v2-collage" aria-hidden="true">
            <svg viewBox="0 0 520 400" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                <g transform="translate(30 40) rotate(-4)">
                    <rect width={240} height={150} rx={16} fill={PAPER} stroke={INK} strokeWidth={2} />
                    <text x={120} y={58} textAnchor="middle" fontSize={22} fontWeight={700} fill={INK} fontFamily={font} direction="ltr">x + y + z = 6</text>
                    <text x={120} y={90} textAnchor="middle" fontSize={22} fontWeight={700} fill={INK} fontFamily={font} direction="ltr">2x − y + z = 3</text>
                    <text x={120} y={122} textAnchor="middle" fontSize={22} fontWeight={700} fill={INK} fontFamily={font} direction="ltr">x + 2y − z = 2</text>
                </g>
                <g transform="translate(296 36) rotate(4)">
                    <rect width={190} height={110} rx={16} fill="#fbebc0" stroke={INK} strokeWidth={2} />
                    <text x={95} y={66} textAnchor="middle" fontSize={26} fontWeight={700} fill="#c4432a" fontFamily={font} direction="ltr">rg A = rg A*</text>
                </g>
                <g transform="translate(296 190) rotate(-3)">
                    <rect width={190} height={110} rx={16} fill="#e8e0f7" stroke={INK} strokeWidth={2} />
                    <text x={95} y={68} textAnchor="middle" fontSize={30} fontWeight={700} fill={INK} fontFamily={font} direction="ltr">x = |Aₓ|/|A|</text>
                </g>
                <g transform="translate(40 230)">
                    <rect width={226} height={130} rx={16} fill="#d6eddf" stroke={INK} strokeWidth={2} />
                    <line x1={20} y1={110} x2={200} y2={20} stroke="#2f6fdb" strokeWidth={3} />
                    <line x1={20} y1={30} x2={210} y2={100} stroke="#c4432a" strokeWidth={3} />
                    <line x1={30} y1={66} x2={210} y2={62} stroke="#267b53" strokeWidth={3} />
                    <circle cx={113} cy={64} r={7} fill={INK} />
                </g>
            </svg>
        </div>
    )
}
