import type { ReactNode } from 'react'
import { pickText, type LocalizedText, type UnitLanguage } from '../../features/unit-v2/types'
import { AxisTitles, Label, PlaneGrid, PlaneLine, PlanePath, PlanePoint } from '../dbh2-funtzioak-v2/plane'
import { useBoxClip } from '../dbh2-funtzioak-v2/planeClip'
import { planeMap, type PlaneBox, type PlaneMap } from '../dbh2-funtzioak-v2/planeMap'
import { Figure } from '../dbh2-zatikiak-prototype/figures'
import { latticePoints, region, type HalfPlane, type Point } from './systems'

/* ==========================================================================
   Sistemak · 4. DBH akademikoak — the new lesson figures: the coefficient
   test that classifies a system, a system with brackets and denominators
   brought to ax + by = c, a line against a circle, two squares reduced,
   the hyperbola xy = 6 against a line, a half-plane with its test point,
   the region of a system of inequalities, the rectangle with perimeter
   34 and diagonal 13, and the snacks you can buy with 12 €. The solutions
   of an equation in two unknowns, the kinds of systems, the three methods
   and the hens and rabbits reuse the 4. DBH aplikatuak figures. Formulas
   sit in their own <text> (left to right in every language); words go
   through <Label>.
   ========================================================================== */

const INK = 'var(--ink, #1d2733)'
const MUTED = 'var(--muted, #58616e)'
const STAGE = 'var(--stage, #2f6fdb)'
const STAGE_TINT = 'var(--stage-tint, #dde7f7)'
const SECOND = 'var(--second, #c4432a)'
const GREEN = 'var(--success, #267b53)'
const MUSTARD_TINT = 'var(--mustard-tint, #fbebc0)'
const GREEN_TINT = '#d6eddf'
const CORAL_TINT = '#f6dcd3'
const CARD = 'var(--card, #fffcf6)'
const PAPER = '#fffcf6'
const REGION = 'rgba(38, 123, 83, 0.22)'

const say = (eu: string, es: string, ar: string): LocalizedText => ({ eu, es, ar })
const useText = (language: UnitLanguage) => (text: LocalizedText) => pickText(language, text)

function Caption({ y, children }: { y: number; children: ReactNode }) {
    return <Label x={360} y={y} textAnchor="middle" fontSize={15} fill={MUTED}>{children}</Label>
}

/** A formula written left to right whatever the language */
function F({ x, y, children, size = 20, color = INK, anchor = 'start', weight = 700 }: { x: number; y: number; children: ReactNode; size?: number; color?: string; anchor?: 'start' | 'middle' | 'end'; weight?: number }) {
    return <text x={x} y={y} textAnchor={anchor} fontSize={size} fontWeight={weight} fill={color} direction="ltr">{children}</text>
}

function Card({ x, y, width, height, tint, children }: { x: number; y: number; width: number; height: number; tint: string; children?: ReactNode }) {
    return (
        <g>
            <rect x={x} y={y} width={width} height={height} rx={14} fill={tint} stroke={INK} strokeWidth={1.6} />
            {children}
        </g>
    )
}

/** Two equations with a brace in front */
function Brace({ x, y, lines, size = 20 }: { x: number; y: number; lines: string[]; size?: number }) {
    const gap = size * 1.6
    return (
        <g>
            <text x={x} y={y + (lines.length - 1) * gap / 2 + size * 0.75} fontSize={size * (1.2 + lines.length * 0.75)} fill={INK} fontWeight={300} direction="ltr">{'{'}</text>
            {lines.map((line, index) => <F key={index} x={x + size * (0.9 + lines.length * 0.35)} y={y + index * gap} size={size}>{line}</F>)}
        </g>
    )
}

/** A small Cartesian plane placed at (ox, oy) inside a figure */
function Frame({ box, cell, ox, oy, labelStep = 1, children }: { box: PlaneBox; cell: number; ox: number; oy: number; labelStep?: number; children?: (map: PlaneMap, clip: string) => ReactNode }) {
    const map = planeMap(box, cell, ox, oy)
    const [clipPath, clip] = useBoxClip(map)
    return (
        <g>
            <defs>{clipPath}</defs>
            <rect x={ox} y={oy} width={map.width} height={map.height} fill={CARD} />
            <PlaneGrid map={map} labelStep={labelStep} />
            <AxisTitles map={map} />
            {children?.(map, clip)}
        </g>
    )
}

const polygonPoints = (map: PlaneMap, points: Point[]) => points.map(([x, y]) => `${map.x(x)},${map.y(y)}`).join(' ')
/** Points of a curve in the plane, t from t0 to t1 */
const sample = (f: (t: number) => Point, t0: number, t1: number, steps = 120): Point[] => Array.from({ length: steps + 1 }, (_, k) => f(t0 + (k * (t1 - t0)) / steps))

/* ---------- Classifying with the coefficients ---------- */

export function CoefficientsFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const cases = [
        { tint: GREEN_TINT, lines: ['2x + y = 7', 'x − y = 2'], ratio: '2/1 ≠ 1/(−1)', title: say('Bateragarri determinatua', 'Compatible determinado', 'متوافق محدد'), text: say('ebazpen bat', 'una solución', 'حل واحد') },
        { tint: CORAL_TINT, lines: ['x + 2y = 3', '2x + 4y = 5'], ratio: '1/2 = 2/4 ≠ 3/5', title: say('Bateraezina', 'Incompatible', 'غير متوافق'), text: say('ebazpenik ez', 'ninguna solución', 'لا حل') },
        { tint: STAGE_TINT, lines: ['x + 2y = 3', '2x + 4y = 6'], ratio: '1/2 = 2/4 = 3/6', title: say('Bateragarri indeterminatua', 'Compatible indeterminado', 'متوافق غير محدد'), text: say('infinitu ebazpen', 'infinitas soluciones', 'حلول لا نهاية لها') }
    ]
    return (
        <Figure height={300} label={t(say('Sistema koefizienteekin sailkatzea: a/a′, b/b′ eta c/c′', 'Clasificar un sistema con los coeficientes: a/a′, b/b′ y c/c′', 'تصنيف النظام بالمعاملات: a/a′ وb/b′ وc/c′'))}>
            {cases.map((item, index) => {
                const x = 16 + index * 236
                return (
                    <Card key={index} x={x} y={16} width={220} height={224} tint={item.tint}>
                        <Brace x={x + 22} y={52} lines={item.lines} size={19} />
                        <line x1={x + 16} x2={x + 204} y1={112} y2={112} stroke={INK} strokeWidth={1} strokeDasharray="4 4" />
                        <F x={x + 110} y={146} anchor="middle" size={18} color={SECOND}>{item.ratio}</F>
                        <Label x={x + 110} y={190} textAnchor="middle" fontSize={15} fontWeight={700} fill={INK}>{t(item.title)}</Label>
                        <Label x={x + 110} y={216} textAnchor="middle" fontSize={14} fill={MUTED}>{t(item.text)}</Label>
                    </Card>
                )
            })}
            <Caption y={268}>{t(say('ax + by = c eta a′x + b′y = c′: alderatu koefizienteen arteko zatidurak', 'ax + by = c y a′x + b′y = c′: compara los cocientes de los coeficientes', 'ax + by = c وa′x + b′y = c′: قارن نسب المعاملات'))}</Caption>
            <Caption y={292}>{t(say('a/a′ ≠ b/b′ bada, zuzenak puntu batean ebakitzen dira', 'Si a/a′ ≠ b/b′, las rectas se cortan en un punto', 'إذا كان a/a′ ≠ b/b′ يتقاطع المستقيمان في نقطة'))}</Caption>
        </Figure>
    )
}

/* ---------- Brackets and denominators first ---------- */

export function SimplifyFirstFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const rows = [
        { from: 'x/5 − y/4 = 4', step: '· 20', to: '4x − 5y = 80' },
        { from: '−2(x + y) = 1 − x/2', step: '· 2', to: '−3x − 4y = 2' }
    ]
    return (
        <Figure height={290} label={t(say('Parentesiak eta izendatzaileak kendu, sistema ax + by = c moduan idazteko', 'Quitar paréntesis y denominadores para escribir el sistema como ax + by = c', 'إزالة الأقواس والمقامات لكتابة النظام على الصورة ax + by = c'))}>
            {rows.map((row, index) => (
                <g key={index}>
                    <Card x={20} y={20 + index * 84} width={290} height={64} tint={MUSTARD_TINT}>
                        <F x={165} y={60 + index * 84} anchor="middle" size={21}>{row.from}</F>
                    </Card>
                    <path d={`M324 ${52 + index * 84} h66 l-10 -8 m10 8 l-10 8`} fill="none" stroke={MUTED} strokeWidth={2.2} />
                    <F x={357} y={40 + index * 84} anchor="middle" size={15} color={STAGE}>{row.step}</F>
                    <Card x={404} y={20 + index * 84} width={296} height={64} tint={STAGE_TINT}>
                        <F x={552} y={60 + index * 84} anchor="middle" size={21}>{row.to}</F>
                    </Card>
                </g>
            ))}
            <Card x={210} y={196} width={300} height={50} tint={GREEN_TINT}>
                <F x={360} y={229} anchor="middle" size={21} color={GREEN}>x = 10,  y = −8</F>
            </Card>
            <Caption y={276}>{t(say('Lehenik, ekuazio bakoitza ax + by = c moduan; gero, metodo bat', 'Primero, cada ecuación en la forma ax + by = c; después, un método', 'أولًا كل معادلة على الصورة ax + by = c؛ ثم طريقة من الطرق'))}</Caption>
        </Figure>
    )
}

/* ---------- A line against a circle ---------- */

export function LineCircleFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const box: PlaneBox = { xMin: -6, xMax: 7, yMin: -6, yMax: 7 }
    return (
        <Figure height={340} label={t(say('x² + y² = 25 zirkunferentzia eta x + y = 7 zuzena (3, 4) eta (4, 3) puntuetan ebakitzen dira', 'La circunferencia x² + y² = 25 y la recta x + y = 7 se cortan en (3, 4) y (4, 3)', 'تتقاطع الدائرة x² + y² = 25 والمستقيم x + y = 7 في (3, 4) و(4, 3)'))}>
            <Frame box={box} cell={20} ox={30} oy={34} labelStep={2}>
                {(map, clip) => (
                    <g>
                        <circle cx={map.x(0)} cy={map.y(0)} r={5 * map.cell} fill="none" stroke={STAGE} strokeWidth={3} />
                        <PlaneLine map={map} m={-1} n={7} color={SECOND} clip={clip} width={3} />
                        <PlanePoint map={map} point={[3, 4]} color={GREEN} radius={6} />
                        <PlanePoint map={map} point={[4, 3]} color={GREEN} radius={6} />
                    </g>
                )}
            </Frame>
            <Brace x={340} y={50} lines={['x² + y² = 25', 'x + y = 7']} />
            <F x={360} y={136} size={18}>y = 7 − x</F>
            <F x={360} y={170} size={18}>x² + (7 − x)² = 25</F>
            <F x={360} y={204} size={18}>x² − 7x + 12 = 0</F>
            <F x={360} y={244} size={19} color={GREEN}>(3, 4)   (4, 3)</F>
            <Caption y={312}>{t(say('Askatu lehen mailakoan eta ordeztu bigarren mailakoan', 'Despeja en la de primer grado y sustituye en la de segundo', 'اعزل في معادلة الدرجة الأولى وعوّض في الثانية'))}</Caption>
            <Caption y={334}>{t(say('Ebazpenak zirkunferentziaren eta zuzenaren ebaki-puntuak dira', 'Las soluciones son los puntos de corte de la circunferencia y la recta', 'الحلول هي نقاط تقاطع الدائرة والمستقيم'))}</Caption>
        </Figure>
    )
}

/* ---------- Two squares reduced ---------- */

export function SquaresReductionFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const box: PlaneBox = { xMin: -7, xMax: 7, yMin: -7, yMax: 7 }
    const branch = (sign: number) => sample((y) => [sign * Math.sqrt(9 + y * y), y], -7.5, 7.5)
    const points: Point[] = [[5, 4], [5, -4], [-5, 4], [-5, -4]]
    return (
        <Figure height={340} label={t(say('x² + y² = 41 eta x² − y² = 9: lau ebazpen, (±5, ±4)', 'x² + y² = 41 y x² − y² = 9: cuatro soluciones, (±5, ±4)', 'x² + y² = 41 وx² − y² = 9: أربعة حلول (±5, ±4)'))}>
            <Frame box={box} cell={18} ox={30} oy={34} labelStep={2}>
                {(map, clip) => (
                    <g>
                        <circle cx={map.x(0)} cy={map.y(0)} r={Math.sqrt(41) * map.cell} fill="none" stroke={STAGE} strokeWidth={3} />
                        <PlanePath map={map} points={branch(1)} color={SECOND} width={3} clip={clip} />
                        <PlanePath map={map} points={branch(-1)} color={SECOND} width={3} clip={clip} />
                        {points.map((point) => <PlanePoint key={point.join()} map={map} point={point} color={GREEN} radius={6} />)}
                    </g>
                )}
            </Frame>
            <Brace x={340} y={50} lines={['x² + y² = 41', 'x² − y² = 9']} />
            <F x={360} y={136} size={18}>2x² = 50  →  x = ±5</F>
            <F x={360} y={170} size={18}>25 + y² = 41  →  y = ±4</F>
            <F x={360} y={214} size={19} color={GREEN}>(5, 4)  (5, −4)</F>
            <F x={360} y={244} size={19} color={GREEN}>(−5, 4)  (−5, −4)</F>
            <Caption y={312}>{t(say('x² eta y² ezezagun berriak balira bezala: batu eta y² desagertzen da', 'Como si x² e y² fueran incógnitas nuevas: se suman y desaparece y²', 'كأن x² وy² مجهولان جديدان: نجمع فيختفي y²'))}</Caption>
            <Caption y={334}>{t(say('Erro bakoitzak bi zeinu ditu: lau ebazpen', 'Cada raíz tiene dos signos: cuatro soluciones', 'لكل جذر إشارتان: أربعة حلول'))}</Caption>
        </Figure>
    )
}

/* ---------- The hyperbola xy = 6 against a line ---------- */

export function HyperbolaFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const box: PlaneBox = { xMin: -6, xMax: 6, yMin: -6, yMax: 6 }
    return (
        <Figure height={346} label={t(say('xy = 6 hiperbola eta y = x − 1 zuzena (3, 2) eta (−2, −3) puntuetan ebakitzen dira', 'La hipérbola xy = 6 y la recta y = x − 1 se cortan en (3, 2) y (−2, −3)', 'يتقاطع القطع الزائد xy = 6 والمستقيم y = x − 1 في (3, 2) و(−2, −3)'))}>
            <Frame box={box} cell={21} ox={30} oy={34} labelStep={2}>
                {(map, clip) => (
                    <g>
                        <PlanePath map={map} points={sample((x) => [x, 6 / x], 0.9, 6.5)} color={STAGE} width={3} clip={clip} />
                        <PlanePath map={map} points={sample((x) => [x, 6 / x], -6.5, -0.9)} color={STAGE} width={3} clip={clip} />
                        <PlaneLine map={map} m={1} n={-1} color={SECOND} clip={clip} width={3} />
                        <PlanePoint map={map} point={[3, 2]} color={GREEN} radius={6} />
                        <PlanePoint map={map} point={[-2, -3]} color={GREEN} radius={6} />
                    </g>
                )}
            </Frame>
            <Brace x={340} y={50} lines={['xy = 6', 'x − y = 1']} />
            <F x={360} y={136} size={18}>x(x − 1) = 6</F>
            <F x={360} y={170} size={18}>x² − x − 6 = 0</F>
            <F x={360} y={204} size={18}>x = 3  →  y = 2</F>
            <F x={360} y={238} size={18}>x = −2  →  y = −3</F>
            <Caption y={318}>{t(say('Zatikiak edo erroak badaude, egiaztatu ebazpen bakoitza hasierako sisteman', 'Si hay fracciones o raíces, comprueba cada solución en el sistema inicial', 'إذا وُجدت كسور أو جذور فتحقّق من كل حل في النظام الأصلي'))}</Caption>
            <Caption y={340}>{t(say('Ebazpen bakoitza bikote bat da: x eta bere y', 'Cada solución es una pareja: x y su y', 'كل حل زوج: x وقيمة y المقابلة'))}</Caption>
        </Figure>
    )
}

/* ---------- A half-plane and its test point ---------- */

const HALF: HalfPlane = { a: 2, b: 1, c: 4, sense: '≤' }

export function HalfPlaneFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const box: PlaneBox = { xMin: -3, xMax: 5, yMin: -3, yMax: 6 }
    return (
        <Figure height={330} label={t(say('2x + y ≤ 4: (0, 0) puntua duen erdiplanoa', '2x + y ≤ 4: el semiplano que contiene el punto (0, 0)', '2x + y ≤ 4: نصف المستوى الذي يحوي النقطة (0, 0)'))}>
            <Frame box={box} cell={26} ox={30} oy={34}>
                {(map, clip) => (
                    <g>
                        <polygon points={polygonPoints(map, region(box, [HALF]))} fill={REGION} />
                        <PlaneLine map={map} m={-2} n={4} color={SECOND} clip={clip} width={3} />
                        <PlanePoint map={map} point={[0, 4]} color={SECOND} radius={5} />
                        <PlanePoint map={map} point={[2, 0]} color={SECOND} radius={5} />
                        <PlanePoint map={map} point={[0, 0]} color={GREEN} radius={7} />
                    </g>
                )}
            </Frame>
            <F x={300} y={50} size={24}>2x + y ≤ 4</F>
            <Card x={300} y={72} width={400} height={56} tint={CORAL_TINT}>
                <Label x={500} y={92} textAnchor="middle" fontSize={13} fill={MUTED}>{t(say('1. Muga-zuzena: bi puntu', '1. La recta frontera: dos puntos', '1. المستقيم الحدّي: نقطتان'))}</Label>
                <F x={500} y={118} anchor="middle" size={18}>2x + y = 4:  (0, 4),  (2, 0)</F>
            </Card>
            <Card x={300} y={138} width={400} height={56} tint={PAPER}>
                <Label x={500} y={158} textAnchor="middle" fontSize={13} fill={MUTED}>{t(say('2. Proba-puntua', '2. Un punto de prueba', '2. نقطة اختبار'))}</Label>
                <F x={500} y={184} anchor="middle" size={18}>(0, 0):  0 ≤ 4  ✓</F>
            </Card>
            <Card x={300} y={204} width={400} height={56} tint={GREEN_TINT}>
                <Label x={500} y={238} textAnchor="middle" fontSize={15} fontWeight={700} fill={GREEN}>{t(say('3. (0, 0) duen erdiplanoa', '3. El semiplano que contiene (0, 0)', '3. نصف المستوى الذي يحوي (0, 0)'))}</Label>
            </Card>
            <Caption y={300}>{t(say('≤ edo ≥ bada, zuzena ebazpenean dago; < edo > bada, ez (marra etena)', 'Con ≤ o ≥ la recta es parte de la solución; con < o >, no (línea discontinua)', 'مع ≤ أو ≥ يكون المستقيم من الحل؛ ومع < أو > لا (خط متقطع)'))}</Caption>
            <Caption y={322}>{t(say('Proba-puntuak betetzen ez badu, beste erdiplanoa da', 'Si el punto de prueba no la cumple, es el otro semiplano', 'إذا لم تحققها نقطة الاختبار فالحل نصف المستوى الآخر'))}</Caption>
        </Figure>
    )
}

/* ---------- The region of a system of inequalities ---------- */

const TRIANGLE: HalfPlane[] = [
    { a: 0, b: 1, c: 1, sense: '≥' },
    { a: 1, b: 0, c: 4, sense: '≤' },
    { a: -1, b: 1, c: 0, sense: '≤' }
]

export function RegionFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const box: PlaneBox = { xMin: -1, xMax: 6, yMin: -1, yMax: 6 }
    return (
        <Figure height={310} label={t(say('y ≥ 1, x ≤ 4 eta y ≤ x: erpinak (1, 1), (4, 1) eta (4, 4) dituen triangelua', 'y ≥ 1, x ≤ 4 e y ≤ x: el triángulo de vértices (1, 1), (4, 1) y (4, 4)', 'y ≥ 1 وx ≤ 4 وy ≤ x: المثلث ذو الرؤوس (1, 1) و(4, 1) و(4, 4)'))}>
            <Frame box={box} cell={30} ox={30} oy={34}>
                {(map, clip) => (
                    <g>
                        <polygon points={polygonPoints(map, region(box, TRIANGLE))} fill={REGION} stroke={GREEN} strokeWidth={2} />
                        <PlaneLine map={map} m={0} n={1} color={STAGE} clip={clip} width={2.6} />
                        <PlanePath map={map} points={[[4, -2], [4, 8]]} color={SECOND} width={2.6} clip={clip} />
                        <PlaneLine map={map} m={1} n={0} color={INK} clip={clip} width={2.6} />
                        {[[1, 1], [4, 1], [4, 4]].map((point) => <PlanePoint key={point.join()} map={map} point={point as Point} color={GREEN} radius={5.5} />)}
                    </g>
                )}
            </Frame>
            <Brace x={330} y={56} lines={['y ≥ 1', 'x ≤ 4', 'y ≤ x']} size={21} />
            <Card x={330} y={170} width={360} height={70} tint={GREEN_TINT}>
                <Label x={510} y={196} textAnchor="middle" fontSize={14} fill={MUTED}>{t(say('Erpinak', 'Vértices', 'الرؤوس'))}</Label>
                <F x={510} y={226} anchor="middle" size={19}>(1, 1)   (4, 1)   (4, 4)</F>
            </Card>
            <Caption y={276}>{t(say('Ebazpena hiru erdiplanoen zati komuna da', 'La solución es la parte común de los tres semiplanos', 'الحل هو الجزء المشترك بين أنصاف المستويات الثلاثة'))}</Caption>
            <Caption y={298}>{t(say('Erpinak bi muga-zuzenen ebaki-puntuak dira', 'Los vértices son los cortes de dos rectas frontera', 'الرؤوس هي نقاط تقاطع مستقيمين حدّيين'))}</Caption>
        </Figure>
    )
}

/* ---------- Perimeter 34 and diagonal 13 ---------- */

export function NonlinearProblemFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const x0 = 40
    const y0 = 50
    const width = 288
    const height = 120
    return (
        <Figure height={280} label={t(say('Laukizuzena: perimetroa 34 cm eta diagonala 13 cm; aldeak 12 eta 5 cm', 'Rectángulo de perímetro 34 cm y diagonal 13 cm: los lados miden 12 y 5 cm', 'مستطيل محيطه 34 سم وقطره 13 سم: ضلعاه 12 و5 سم'))}>
            <rect x={x0} y={y0} width={width} height={height} fill={STAGE_TINT} stroke={INK} strokeWidth={2} />
            <line x1={x0} y1={y0 + height} x2={x0 + width} y2={y0} stroke={SECOND} strokeWidth={3} />
            <F x={x0 + width / 2} y={y0 + height + 26} anchor="middle" size={20} color={STAGE}>x</F>
            <F x={x0 + width + 14} y={y0 + height / 2 + 7} size={20} color={STAGE}>y</F>
            <F x={x0 + width / 2 + 10} y={y0 + height / 2 - 8} size={20} color={SECOND}>13</F>
            <Brace x={390} y={70} lines={['x + y = 17', 'x² + y² = 169']} />
            <F x={410} y={160} size={18}>x² + (17 − x)² = 169</F>
            <F x={410} y={194} size={18}>x² − 17x + 60 = 0</F>
            <F x={410} y={230} size={19} color={GREEN}>x = 12,  y = 5</F>
            <Caption y={266}>{t(say('Perimetroak lehen mailako ekuazioa ematen du, eta Pitagorasek bigarren mailakoa', 'El perímetro da una ecuación de primer grado y Pitágoras una de segundo', 'يعطي المحيط معادلة من الدرجة الأولى ويعطي فيثاغورس معادلة من الدرجة الثانية'))}</Caption>
        </Figure>
    )
}

/* ---------- What you can buy with 12 € ---------- */

const SNACKS: HalfPlane[] = [
    { a: 3, b: 2, c: 12, sense: '≤' },
    { a: 1, b: 0, c: 0, sense: '≥' },
    { a: 0, b: 1, c: 0, sense: '≥' }
]

export function RegionProblemFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const box: PlaneBox = { xMin: 0, xMax: 5, yMin: 0, yMax: 7 }
    const points = latticePoints(box, SNACKS)
    return (
        <Figure height={310} label={t(say('3x + 2y ≤ 12, x ≥ 0, y ≥ 0: 12 €-rekin eros daitezkeen ogitarteko eta freskagarriak', '3x + 2y ≤ 12, x ≥ 0, y ≥ 0: los bocadillos y refrescos que se pueden comprar con 12 €', '3x + 2y ≤ 12 وx ≥ 0 وy ≥ 0: الشطائر والمشروبات التي يمكن شراؤها بـ12 €'))}>
            <Frame box={box} cell={30} ox={40} oy={36}>
                {(map, clip) => (
                    <g>
                        <polygon points={polygonPoints(map, region(box, SNACKS))} fill={REGION} />
                        <PlaneLine map={map} m={-1.5} n={6} color={SECOND} clip={clip} width={3} />
                        {points.map((point) => <circle key={point.join()} cx={map.x(point[0])} cy={map.y(point[1])} r={4.5} fill={GREEN} stroke={CARD} strokeWidth={1.5} />)}
                    </g>
                )}
            </Frame>
            <Label x={300} y={50} fontSize={15} fill={MUTED}>{t(say('x ogitarteko (3 €), y freskagarri (2 €)', 'x bocadillos (3 €), y refrescos (2 €)', 'x شطيرة (3 €) وy مشروب (2 €)'))}</Label>
            <Brace x={300} y={94} lines={['3x + 2y ≤ 12', 'x ≥ 0', 'y ≥ 0']} size={20} />
            <Card x={300} y={196} width={400} height={50} tint={GREEN_TINT}>
                <Label x={500} y={227} textAnchor="middle" fontSize={15} fontWeight={700} fill={GREEN}>{t(say('Puntu berde bakoitza erosketa posible bat da', 'Cada punto verde es una compra posible', 'كل نقطة خضراء شراء ممكن'))}</Label>
            </Card>
            <Caption y={290}>{t(say('Zenbaki osoko problemetan, eskualdeko puntu osoak bakarrik balio dute', 'En los problemas de cantidades enteras, solo valen los puntos enteros de la región', 'في مسائل الكميات الصحيحة لا تصلح إلا النقاط الصحيحة من المنطقة'))}</Caption>
        </Figure>
    )
}

/* ---------- Hero art: a system, a circle cut by a line and a region ---------- */

export function SystemsHeroArt() {
    return (
        <div className="fraction-v2-collage" aria-hidden="true">
            <svg viewBox="0 0 520 400" direction="ltr" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                <g transform="translate(26 36) rotate(-4)">
                    <rect width={250} height={130} rx={16} fill={PAPER} stroke={INK} strokeWidth={2} />
                    <text x={20} y={94} fontSize={84} fill={INK} fontWeight={300}>{'{'}</text>
                    <text x={64} y={58} fontSize={24} fontWeight={700} fill={INK}>x² + y² = 25</text>
                    <text x={64} y={100} fontSize={24} fontWeight={700} fill={INK}>x + y = 7</text>
                </g>
                <g transform="translate(300 40) rotate(5)">
                    <rect width={180} height={170} rx={16} fill={GREEN_TINT} stroke={INK} strokeWidth={2} />
                    <line x1={16} x2={164} y1={90} y2={90} stroke={INK} strokeWidth={1.4} />
                    <line x1={90} x2={90} y1={16} y2={156} stroke={INK} strokeWidth={1.4} />
                    <circle cx={90} cy={90} r={55} fill="none" stroke="#2f6fdb" strokeWidth={3.4} />
                    <line x1={60} x2={170} y1={10} y2={120} stroke="#c4432a" strokeWidth={3.4} />
                    <circle cx={123} cy={46} r={6} fill="#267b53" stroke={INK} strokeWidth={1.2} />
                    <circle cx={134} cy={57} r={6} fill="#267b53" stroke={INK} strokeWidth={1.2} />
                </g>
                <g transform="translate(60 230) rotate(2)">
                    <rect width={400} height={120} rx={16} fill="#fbebc0" stroke={INK} strokeWidth={2} />
                    <polygon points="40,96 160,96 160,24" fill="rgba(38, 123, 83, 0.3)" stroke="#267b53" strokeWidth={2.4} />
                    <text x={200} y={56} fontSize={22} fontWeight={700} fill={INK}>y ≥ 1,  x ≤ 4</text>
                    <text x={200} y={92} fontSize={22} fontWeight={700} fill={INK}>y ≤ x</text>
                </g>
            </svg>
        </div>
    )
}
