import type { ReactNode } from 'react'
import { pickText, type LocalizedText, type UnitLanguage } from '../../features/unit-v2/types'
import { AxisTitles, Label, PlaneGrid, PlaneLine, PlanePath, PlanePoint } from '../dbh2-funtzioak-v2/plane'
import { useBoxClip } from '../dbh2-funtzioak-v2/planeClip'
import { planeMap, type PlaneBox, type PlaneMap } from '../dbh2-funtzioak-v2/planeMap'
import { Figure } from '../dbh2-zatikiak-prototype/figures'

/* ==========================================================================
   Bektoreak eta zuzenak · 4. DBH akademikoak — the lesson figures: a
   vector with its coordinates and modulus, adding and scaling vectors,
   parallel and perpendicular vectors, the distance as Pythagoras, the
   midpoint, three aligned points, a line traced by its parameter, the
   chain of the equations of a line, the general equation with its
   intercepts, the slope as rise over run, a parallel and a perpendicular
   through a point, the three relative positions, the bisector of a
   segment, a circumference and a parallelogram. Formulas sit in their own
   <text> (left to right in every language); words go through <Label>.
   ========================================================================== */

type Point = [number, number]

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
const SERIF = 'Fraunces, serif'

const say = (eu: string, es: string, ar: string): LocalizedText => ({ eu, es, ar })
const useText = (language: UnitLanguage) => (text: LocalizedText) => pickText(language, text)

function Caption({ y, children, x = 360 }: { y: number; children: ReactNode; x?: number }) {
    return <Label x={x} y={y} textAnchor="middle" fontSize={15} fill={MUTED}>{children}</Label>
}

/** A formula written left to right whatever the language */
function F({ x, y, children, size = 19, color = INK, anchor = 'start', weight = 700 }: { x: number; y: number; children: ReactNode; size?: number; color?: string; anchor?: 'start' | 'middle' | 'end'; weight?: number }) {
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

/** An arrow from p to q in plane coordinates */
function Arrow({ map, from, to, color = STAGE, width = 3.2, dashed = false, name, dx = 6, dy = -8 }: { map: PlaneMap; from: Point; to: Point; color?: string; width?: number; dashed?: boolean; name?: string; dx?: number; dy?: number }) {
    const [x1, y1] = [map.x(from[0]), map.y(from[1])]
    const [x2, y2] = [map.x(to[0]), map.y(to[1])]
    const length = Math.hypot(x2 - x1, y2 - y1)
    const [ux, uy] = [(x2 - x1) / length, (y2 - y1) / length]
    const head = 13
    const base: Point = [x2 - ux * head, y2 - uy * head]
    const wing = 6
    const left: Point = [base[0] - uy * wing, base[1] + ux * wing]
    const right: Point = [base[0] + uy * wing, base[1] - ux * wing]
    return (
        <g>
            <line x1={x1} y1={y1} x2={base[0]} y2={base[1]} stroke={color} strokeWidth={width} strokeDasharray={dashed ? '7 5' : undefined} strokeLinecap="round" />
            <polygon points={`${x2},${y2} ${left[0]},${left[1]} ${right[0]},${right[1]}`} fill={color} />
            {name && <F x={(x1 + x2) / 2 + dx} y={(y1 + y2) / 2 + dy} size={16} color={color}>{name}</F>}
        </g>
    )
}

/** A dashed segment in plane coordinates */
function Dashed({ map, from, to, color = MUTED }: { map: PlaneMap; from: Point; to: Point; color?: string }) {
    return <line x1={map.x(from[0])} y1={map.y(from[1])} x2={map.x(to[0])} y2={map.y(to[1])} stroke={color} strokeWidth={1.8} strokeDasharray="5 4" />
}

/* ---------- 1. A vector, its coordinates and its modulus ---------- */

export function VectorFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const box: PlaneBox = { xMin: -4, xMax: 7, yMin: -2, yMax: 7 }
    return (
        <Figure height={330} label={t(say('A(1, 2) puntutik B(5, 5) puntura doan bektorea: koordenatuak (4, 3) eta modulua 5; bektore berdin bat beste puntu batetik', 'El vector de A(1, 2) a B(5, 5): coordenadas (4, 3) y módulo 5; un vector igual desde otro punto', 'المتجه من A(1, 2) إلى B(5, 5): مركّبتاه (4, 3) وطوله 5؛ ومتجه مساوٍ له من نقطة أخرى'))}>
            <Frame box={box} cell={26} ox={24} oy={20}>
                {(map) => (
                    <g>
                        <Dashed map={map} from={[1, 2]} to={[5, 2]} color={GREEN} />
                        <Dashed map={map} from={[5, 2]} to={[5, 5]} color={SECOND} />
                        <Arrow map={map} from={[1, 2]} to={[5, 5]} />
                        <Arrow map={map} from={[-3, -1]} to={[1, 2]} color={MUTED} width={2.4} />
                        <PlanePoint map={map} point={[1, 2]} name="A" color={INK} dx={-18} dy={-6} />
                        <PlanePoint map={map} point={[5, 5]} name="B" color={INK} />
                        <F x={map.x(3)} y={map.y(2) + 22} anchor="middle" size={15} color={GREEN}>4</F>
                        <F x={map.x(5) + 10} y={map.y(3.5) + 5} size={15} color={SECOND}>3</F>
                    </g>
                )}
            </Frame>
            <F x={350} y={70} size={20}>AB = (5 − 1, 5 − 2)</F>
            <F x={384} y={104} size={20} color={STAGE}>= (4, 3)</F>
            <F x={350} y={160} size={20}>|AB| = √(4² + 3²) = 5</F>
            <Label x={350} y={214} fontSize={15} fill={MUTED}>{t(say('Gris koloreko bektorea berdina da:', 'El vector gris es igual:', 'المتجه الرمادي مساوٍ له:'))}</Label>
            <Label x={350} y={238} fontSize={15} fill={MUTED}>{t(say('modulu, norabide eta noranzko bera', 'mismo módulo, dirección y sentido', 'الطول والاتجاه والمنحى نفسها'))}</Label>
            <Caption y={316}>{t(say('Koordenatuak: muturra ken jatorria', 'Coordenadas: extremo menos origen', 'المركّبتان: الطرف ناقص الأصل'))}</Caption>
        </Figure>
    )
}

/* ---------- 2. Adding and scaling ---------- */

export function OperationsFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const box: PlaneBox = { xMin: -3, xMax: 5, yMin: -2, yMax: 5 }
    return (
        <Figure height={300} label={t(say('u = (3, −1) eta v = (−2, 4) bektoreen batura paralelogramoaren diagonala da: (1, 3)', 'La suma de u = (3, −1) y v = (−2, 4) es la diagonal del paralelogramo: (1, 3)', 'مجموع u = (3, −1) وv = (−2, 4) هو قطر متوازي الأضلاع: (1, 3)'))}>
            <Frame box={box} cell={30} ox={24} oy={18}>
                {(map) => (
                    <g>
                        <polygon points={[[0, 0], [3, -1], [1, 3], [-2, 4]].map(([x, y]) => `${map.x(x)},${map.y(y)}`).join(' ')} fill={STAGE_TINT} opacity={0.6} />
                        <Arrow map={map} from={[3, -1]} to={[1, 3]} color={GREEN} width={2} dashed />
                        <Arrow map={map} from={[-2, 4]} to={[1, 3]} color={SECOND} width={2} dashed />
                        <Arrow map={map} from={[0, 0]} to={[3, -1]} color={SECOND} name="u" dx={0} dy={20} />
                        <Arrow map={map} from={[0, 0]} to={[-2, 4]} color={GREEN} name="v" dx={-22} dy={0} />
                        <Arrow map={map} from={[0, 0]} to={[1, 3]} color={STAGE} width={3.6} name="u + v" dx={8} dy={-4} />
                    </g>
                )}
            </Frame>
            <F x={330} y={70} size={20}>(3, −1) + (−2, 4) = (1, 3)</F>
            <F x={330} y={124} size={20}>3 · (2, −1) = (6, −3)</F>
            <F x={330} y={178} size={20}>2u − v = (8, −6)</F>
            <Caption y={240} x={510}>{t(say('Koordenatuz koordenatu', 'Coordenada a coordenada', 'مركّبةً مركّبة'))}</Caption>
            <Caption y={288}>{t(say('Grafikoki: bata bestearen muturrean, edo paralelogramoaren diagonala', 'Gráficamente: uno a continuación del otro, o la diagonal del paralelogramo', 'بيانيًا: أحدهما بعد الآخر، أو قطر متوازي الأضلاع'))}</Caption>
        </Figure>
    )
}

/* ---------- 3. Parallel and perpendicular vectors ---------- */

export function ParallelFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const box: PlaneBox = { xMin: -4, xMax: 5, yMin: -1, yMax: 7 }
    return (
        <Figure height={300} label={t(say('(2, 3) eta (4, 6) paraleloak dira; (−3, 2) perpendikularra da', '(2, 3) y (4, 6) son paralelos; (−3, 2) es perpendicular', '(2, 3) و(4, 6) متوازيان؛ و(−3, 2) عمودي عليهما'))}>
            <Frame box={box} cell={30} ox={24} oy={18}>
                {(map) => (
                    <g>
                        <Arrow map={map} from={[0, 0]} to={[4, 6]} color={GREEN} width={2.4} dashed name="(4, 6)" dx={18} dy={6} />
                        <Arrow map={map} from={[0, 0]} to={[2, 3]} color={STAGE} width={3.6} name="(2, 3)" dx={10} dy={14} />
                        <Arrow map={map} from={[0, 0]} to={[-3, 2]} color={SECOND} name="(−3, 2)" dx={-74} dy={-22} />
                        <polyline points={`${map.x(0) - 9},${map.y(0) - 6} ${map.x(0) - 3},${map.y(0) - 15} ${map.x(0) + 6},${map.y(0) - 9}`} fill="none" stroke={INK} strokeWidth={1.6} />
                    </g>
                )}
            </Frame>
            <Label x={340} y={64} fontSize={16} fontWeight={700} fill={GREEN}>{t(say('Paraleloak', 'Paralelos', 'متوازيان'))}</Label>
            <F x={340} y={96} size={19}>4 / 2 = 6 / 3 = 2</F>
            <F x={340} y={128} size={19}>2 · 6 = 3 · 4</F>
            <Label x={340} y={180} fontSize={16} fontWeight={700} fill={SECOND}>{t(say('Perpendikularra', 'Perpendicular', 'عمودي'))}</Label>
            <F x={340} y={212} size={19}>(a, b)  →  (−b, a)</F>
            <F x={340} y={244} size={19}>(2, 3)  →  (−3, 2)</F>
            <Caption y={290}>{t(say('Proportzionalak: norabide bera. Trukatu eta aldatu zeinu bat: perpendikularra', 'Proporcionales: misma dirección. Intercambia y cambia un signo: perpendicular', 'متناسبان: الاتجاه نفسه. بدّل وغيّر إشارة: عمودي'))}</Caption>
        </Figure>
    )
}

/* ---------- 4. The distance as Pythagoras ---------- */

export function DistanceFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const box: PlaneBox = { xMin: 0, xMax: 6, yMin: 0, yMax: 6 }
    return (
        <Figure height={290} label={t(say('A(1, 1) eta B(4, 5) puntuen arteko distantzia: 3 eta 4 katetoak dituen triangeluaren hipotenusa, 5', 'La distancia entre A(1, 1) y B(4, 5): la hipotenusa del triángulo de catetos 3 y 4, que mide 5', 'المسافة بين A(1, 1) وB(4, 5): وتر المثلث الذي ضلعاه 3 و4، وطوله 5'))}>
            <Frame box={box} cell={38} ox={24} oy={18}>
                {(map) => (
                    <g>
                        <polygon points={[[1, 1], [4, 1], [4, 5]].map(([x, y]) => `${map.x(x)},${map.y(y)}`).join(' ')} fill={MUSTARD_TINT} stroke="none" />
                        <PlanePath map={map} points={[[1, 1], [4, 1]]} color={GREEN} width={3} />
                        <PlanePath map={map} points={[[4, 1], [4, 5]]} color={SECOND} width={3} />
                        <PlanePath map={map} points={[[1, 1], [4, 5]]} color={STAGE} width={4} />
                        <PlanePoint map={map} point={[1, 1]} name="A" color={INK} dx={-16} />
                        <PlanePoint map={map} point={[4, 5]} name="B" color={INK} />
                        <F x={map.x(2.5)} y={map.y(1) + 22} anchor="middle" size={16} color={GREEN}>4 − 1 = 3</F>
                        <F x={map.x(4) + 10} y={map.y(3)} size={16} color={SECOND}>5 − 1 = 4</F>
                    </g>
                )}
            </Frame>
            <F x={330} y={92} size={20}>d(A, B) = √(3² + 4²)</F>
            <F x={386} y={128} size={20} color={STAGE}>= √25 = 5</F>
            <F x={330} y={196} size={17} color={MUTED}>√((x₂ − x₁)² + (y₂ − y₁)²)</F>
            <Caption y={280}>{t(say('Pitagoras: abzisen kendura eta ordenatuen kendura dira katetoak', 'Pitágoras: los catetos son la diferencia de abscisas y la de ordenadas', 'فيثاغورس: الضلعان القائمان هما فرق السينات وفرق الصادات'))}</Caption>
        </Figure>
    )
}

/* ---------- 5. The midpoint ---------- */

export function MidpointFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const box: PlaneBox = { xMin: 0, xMax: 8, yMin: -4, yMax: 6 }
    return (
        <Figure height={340} label={t(say('A(2, −3) eta B(6, 5) muturreko zuzenkiaren erdiko puntua M(4, 1) da', 'El punto medio del segmento de extremos A(2, −3) y B(6, 5) es M(4, 1)', 'منتصف القطعة التي طرفاها A(2, −3) وB(6, 5) هو M(4, 1)'))}>
            <Frame box={box} cell={27} ox={24} oy={20}>
                {(map) => (
                    <g>
                        <PlanePath map={map} points={[[2, -3], [6, 5]]} color={STAGE} width={3.4} />
                        <Dashed map={map} from={[4, 1]} to={[4, -4]} color={GREEN} />
                        <Dashed map={map} from={[4, 1]} to={[0, 1]} color={GREEN} />
                        <PlanePoint map={map} point={[2, -3]} name="A" color={INK} dx={-18} />
                        <PlanePoint map={map} point={[6, 5]} name="B" color={INK} />
                        <PlanePoint map={map} point={[4, 1]} name="M" color={SECOND} radius={7} />
                    </g>
                )}
            </Frame>
            <F x={300} y={80} size={20}>M = ((2 + 6) / 2, (−3 + 5) / 2)</F>
            <F x={348} y={116} size={20} color={SECOND}>= (4, 1)</F>
            <Label x={300} y={178} fontSize={16} fontWeight={700} fill={INK}>{t(say('Simetrikoa P-rekiko', 'Simétrico respecto de P', 'النظيرة بالنسبة إلى P'))}</Label>
            <F x={300} y={210} size={20}>A′ = 2P − A</F>
            <Caption y={332}>{t(say('Erdiko puntua: muturren koordenatuen batez bestekoa', 'Punto medio: la media de las coordenadas de los extremos', 'المنتصف: متوسط إحداثيات الطرفين'))}</Caption>
        </Figure>
    )
}

/* ---------- 6. Aligned points ---------- */

export function CollinearFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const box: PlaneBox = { xMin: 0, xMax: 6, yMin: 0, yMax: 11 }
    return (
        <Figure height={345} label={t(say('A(1, 2), B(3, 6) eta C(5, 10) lerrokatuta daude: AB = (2, 4) eta AC = (4, 8) proportzionalak dira', 'A(1, 2), B(3, 6) y C(5, 10) están alineados: AB = (2, 4) y AC = (4, 8) son proporcionales', 'النقاط A(1, 2) وB(3, 6) وC(5, 10) على استقامة واحدة: AB = (2, 4) وAC = (4, 8) متناسبان'))}>
            <Frame box={box} cell={24} ox={60} oy={20} labelStep={2}>
                {(map, clip) => (
                    <g>
                        <PlaneLine map={map} m={2} n={0} color={MUTED} width={1.6} dashed clip={clip} />
                        <Arrow map={map} from={[1, 2]} to={[5, 10]} color={GREEN} width={2.4} />
                        <Arrow map={map} from={[1, 2]} to={[3, 6]} color={STAGE} width={4} />
                        <PlanePoint map={map} point={[1, 2]} name="A" color={INK} dx={10} dy={12} />
                        <PlanePoint map={map} point={[3, 6]} name="B" color={INK} dx={10} dy={10} />
                        <PlanePoint map={map} point={[5, 10]} name="C" color={INK} dx={10} dy={10} />
                    </g>
                )}
            </Frame>
            <F x={320} y={84} size={20} color={STAGE}>AB = (2, 4)</F>
            <F x={320} y={120} size={20} color={GREEN}>AC = (4, 8)</F>
            <F x={320} y={176} size={20}>4 / 2 = 8 / 4</F>
            <Label x={320} y={212} fontSize={16} fill={MUTED}>{t(say('proportzionalak: lerrokatuta', 'proporcionales: alineados', 'متناسبان: على استقامة واحدة'))}</Label>
            <Caption y={335}>{t(say('Lerrokatuta: A-tik ateratako bi bektoreek norabide bera dute', 'Alineados: los dos vectores que salen de A tienen la misma dirección', 'على استقامة واحدة: للمتجهين الخارجين من A الاتجاه نفسه'))}</Caption>
        </Figure>
    )
}

/* ---------- 7. A line traced by its parameter ---------- */

export function ParametricFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const box: PlaneBox = { xMin: -3, xMax: 6, yMin: -5, yMax: 9 }
    const marks: Array<[number, Point]> = [[-1, [-2, 8]], [0, [1, 2]], [1, [4, -4]]]
    return (
        <Figure height={330} label={t(say('x = 1 + 3t, y = 2 − 6t zuzena: t = −1, 0 eta 1 balioek (−2, 8), (1, 2) eta (4, −4) puntuak ematen dituzte', 'La recta x = 1 + 3t, y = 2 − 6t: t = −1, 0 y 1 dan los puntos (−2, 8), (1, 2) y (4, −4)', 'المستقيم x = 1 + 3t وy = 2 − 6t: القيم t = −1 و0 و1 تعطي النقاط (−2, 8) و(1, 2) و(4, −4)'))}>
            <Frame box={box} cell={20} ox={30} oy={20} labelStep={2}>
                {(map, clip) => (
                    <g>
                        <PlaneLine map={map} m={-2} n={4} color={STAGE} width={2.6} clip={clip} />
                        <Arrow map={map} from={[1, 2]} to={[4, -4]} color={SECOND} width={3.4} name="d" dx={10} dy={0} />
                        {marks.map(([value, point]) => <PlanePoint key={value} map={map} point={point} name={`t = ${value}`} color={value === 0 ? INK : GREEN} dx={10} dy={value === -1 ? 18 : 4} />)}
                    </g>
                )}
            </Frame>
            <F x={290} y={76} size={20}>(x, y) = (1, 2) + t · (3, −6)</F>
            <F x={290} y={128} size={20}>x = 1 + 3t</F>
            <F x={290} y={160} size={20}>y = 2 − 6t</F>
            <F x={290} y={220} size={18} color={GREEN}>t = −1  →  (−2, 8)</F>
            <Caption y={318}>{t(say('t-ren balio bakoitzak zuzenaren puntu bat ematen du', 'Cada valor de t da un punto de la recta', 'كل قيمة لـ t تعطي نقطة من المستقيم'))}</Caption>
        </Figure>
    )
}

/* ---------- 8. The chain of equations ---------- */

export function FormsFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const rows: Array<{ name: LocalizedText; formula: string; tint: string }> = [
        { name: say('Bektoriala', 'Vectorial', 'المتجهية'), formula: '(x, y) = (2, −1) + t · (4, 6)', tint: STAGE_TINT },
        { name: say('Parametrikoak', 'Paramétricas', 'الوسيطيتان'), formula: 'x = 2 + 4t,  y = −1 + 6t', tint: STAGE_TINT },
        { name: say('Jarraitua', 'Continua', 'المتصلة'), formula: '(x − 2) / 4 = (y + 1) / 6', tint: MUSTARD_TINT },
        { name: say('Puntu-malda', 'Punto-pendiente', 'النقطة والميل'), formula: 'y + 1 = 3/2 · (x − 2)', tint: MUSTARD_TINT },
        { name: say('Orokorra', 'General', 'العامة'), formula: '3x − 2y − 8 = 0', tint: GREEN_TINT },
        { name: say('Esplizitua', 'Explícita', 'الصريحة'), formula: 'y = 3/2 · x − 4', tint: GREEN_TINT }
    ]
    return (
        <Figure height={330} label={t(say('P(2, −1) eta d = (4, 6) zuzenaren sei ekuazioak, bata bestearen ondoren', 'Las seis ecuaciones de la recta de P(2, −1) y d = (4, 6), una tras otra', 'المعادلات الست للمستقيم المار بـ P(2, −1) ومتجه توجيهه d = (4, 6)، واحدة تلو الأخرى'))}>
            {rows.map((row, index) => {
                const y = 14 + index * 48
                return (
                    <Card key={index} x={20} y={y} width={680} height={40} tint={row.tint}>
                        <Label x={40} y={y + 26} fontSize={15} fontWeight={700} fill={INK}>{t(row.name)}</Label>
                        <F x={250} y={y + 27} size={19}>{row.formula}</F>
                    </Card>
                )
            })}
            <Caption y={318}>{t(say('Zuzen bera: puntu bat eta norabide bat, sei eratara idatzita', 'La misma recta: un punto y una dirección, escrita de seis formas', 'المستقيم نفسه: نقطة واتجاه، مكتوبًا بست صيغ'))}</Caption>
        </Figure>
    )
}

/* ---------- 9. The general equation and its intercepts ---------- */

export function GeneralFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const box: PlaneBox = { xMin: -5, xMax: 4, yMin: -2, yMax: 5 }
    return (
        <Figure height={290} label={t(say('2x − 3y + 6 = 0 zuzenak X ardatza (−3, 0) puntuan eta Y ardatza (0, 2) puntuan ebakitzen ditu', 'La recta 2x − 3y + 6 = 0 corta al eje X en (−3, 0) y al eje Y en (0, 2)', 'يقطع المستقيم 2x − 3y + 6 = 0 محور X في (−3, 0) ومحور Y في (0, 2)'))}>
            <Frame box={box} cell={30} ox={24} oy={18}>
                {(map, clip) => (
                    <g>
                        <PlaneLine map={map} m={2 / 3} n={2} color={STAGE} width={3.2} clip={clip} />
                        <PlanePoint map={map} point={[-3, 0]} name="(−3, 0)" color={SECOND} dx={-30} dy={22} />
                        <PlanePoint map={map} point={[0, 2]} name="(0, 2)" color={GREEN} dx={8} dy={-10} />
                    </g>
                )}
            </Frame>
            <F x={320} y={70} size={20}>2x − 3y + 6 = 0</F>
            <F x={320} y={110} size={20}>y = 2/3 · x + 2</F>
            <F x={320} y={160} size={18} color={STAGE}>m = 2/3,   n = 2</F>
            <F x={320} y={196} size={18} color={MUTED}>d = (−B, A) = (3, 2)</F>
            <Caption y={278}>{t(say('x = 0: Y ardatzarekiko ebakidura. y = 0: X ardatzarekikoa', 'x = 0: corte con el eje Y. y = 0: corte con el eje X', 'x = 0: التقاطع مع محور Y. y = 0: التقاطع مع محور X'))}</Caption>
        </Figure>
    )
}

/* ---------- 10. The slope ---------- */

export function SlopeFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const box: PlaneBox = { xMin: -2, xMax: 4, yMin: -6, yMax: 4 }
    return (
        <Figure height={340} label={t(say('A(−1, 3) eta B(3, −5) puntuetatik pasatzen den zuzena: 4 aurreratu eta 8 jaisten da, malda −2', 'La recta por A(−1, 3) y B(3, −5): avanza 4 y baja 8, pendiente −2', 'المستقيم المار بـ A(−1, 3) وB(3, −5): يتقدم 4 وينزل 8، الميل −2'))}>
            <Frame box={box} cell={27} ox={30} oy={20}>
                {(map, clip) => (
                    <g>
                        <PlaneLine map={map} m={-2} n={1} color={STAGE} width={3} clip={clip} />
                        <Dashed map={map} from={[-1, 3]} to={[3, 3]} color={GREEN} />
                        <Dashed map={map} from={[3, 3]} to={[3, -5]} color={SECOND} />
                        <PlanePoint map={map} point={[-1, 3]} name="A" color={INK} dx={-16} />
                        <PlanePoint map={map} point={[3, -5]} name="B" color={INK} />
                        <F x={map.x(1)} y={map.y(3) - 8} anchor="middle" size={15} color={GREEN}>+4</F>
                        <F x={map.x(3) + 8} y={map.y(-1)} size={15} color={SECOND}>−8</F>
                    </g>
                )}
            </Frame>
            <F x={250} y={80} size={20}>m = (−5 − 3) / (3 − (−1))</F>
            <F x={298} y={116} size={20} color={STAGE}>= −8 / 4 = −2</F>
            <F x={250} y={176} size={20}>y = −2x + 1</F>
            <Label x={250} y={226} fontSize={15} fill={MUTED}>{t(say('m < 0: zuzena beherakorra da', 'm < 0: la recta es decreciente', 'm < 0: المستقيم متناقص'))}</Label>
            <Caption y={332}>{t(say('Malda: zenbat igotzen edo jaisten den, zati zenbat aurreratzen den', 'Pendiente: lo que sube o baja entre lo que avanza', 'الميل: مقدار الصعود أو النزول على مقدار التقدّم'))}</Caption>
        </Figure>
    )
}

/* ---------- 11. A parallel and a perpendicular through a point ---------- */

export function ParallelLinesFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const box: PlaneBox = { xMin: -1, xMax: 5, yMin: -3, yMax: 5 }
    return (
        <Figure height={300} label={t(say('y = 3x − 4 zuzena, haren paraleloa y = 3x − 5 eta haren perpendikularra P(2, 1) puntutik', 'La recta y = 3x − 4, su paralela y = 3x − 5 y su perpendicular por P(2, 1)', 'المستقيم y = 3x − 4 وموازيه y = 3x − 5 والعمودي عليه مرورًا بـ P(2, 1)'))}>
            <Frame box={box} cell={32} ox={24} oy={20}>
                {(map, clip) => (
                    <g>
                        <PlaneLine map={map} m={3} n={-4} color={STAGE} width={3} clip={clip} />
                        <PlaneLine map={map} m={3} n={-5} color={GREEN} width={2.6} dashed clip={clip} />
                        <PlaneLine map={map} m={-1 / 3} n={5 / 3} color={SECOND} width={3} clip={clip} />
                        <PlanePoint map={map} point={[2, 1]} name="P" color={INK} dx={-18} dy={-8} />
                    </g>
                )}
            </Frame>
            <F x={250} y={72} size={19} color={STAGE}>r: y = 3x − 4</F>
            <F x={250} y={112} size={19} color={GREEN}>y = 3x − 5   (m′ = 3)</F>
            <F x={250} y={152} size={19} color={SECOND}>y = −1/3 · x + 5/3</F>
            <F x={250} y={204} size={19}>m · m′ = 3 · (−1/3) = −1</F>
            <Caption y={288}>{t(say('Paraleloak: malda bera. Perpendikularrak: malden biderkadura −1', 'Paralelas: la misma pendiente. Perpendiculares: el producto de pendientes es −1', 'متوازيان: الميل نفسه. متعامدان: جداء الميلين −1'))}</Caption>
        </Figure>
    )
}

/* ---------- 12. The three relative positions ---------- */

export function PositionsFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const cases: Array<{ tint: string; title: LocalizedText; text: LocalizedText; lines: Array<[number, number, number, number, string, boolean]> }> = [
        { tint: GREEN_TINT, title: say('Ebakitzaileak', 'Secantes', 'متقاطعان'), text: say('malda desberdinak', 'pendientes distintas', 'ميلان مختلفان'), lines: [[20, 150, 200, 40, STAGE, false], [20, 50, 200, 160, SECOND, false]] },
        { tint: CORAL_TINT, title: say('Paraleloak', 'Paralelas', 'متوازيان'), text: say('malda bera, n desberdina', 'misma pendiente, distinta n', 'الميل نفسه وn مختلف'), lines: [[20, 120, 200, 40, STAGE, false], [20, 170, 200, 90, SECOND, false]] },
        { tint: STAGE_TINT, title: say('Bat datozenak', 'Coincidentes', 'منطبقان'), text: say('dena berdina', 'todo igual', 'كل شيء متساوٍ'), lines: [[20, 150, 200, 60, STAGE, false], [20, 150, 200, 60, SECOND, true]] }
    ]
    return (
        <Figure height={320} label={t(say('Bi zuzenen hiru posizio erlatiboak: ebakitzaileak, paraleloak eta bat datozenak', 'Las tres posiciones relativas de dos rectas: secantes, paralelas y coincidentes', 'الأوضاع النسبية الثلاثة لمستقيمين: متقاطعان ومتوازيان ومنطبقان'))}>
            {cases.map((item, index) => {
                const x = 16 + index * 236
                return (
                    <Card key={index} x={x} y={16} width={220} height={250} tint={item.tint}>
                        {item.lines.map(([x1, y1, x2, y2, color, dashed], line) => (
                            <line key={line} x1={x + x1} y1={16 + y1} x2={x + x2} y2={16 + y2} stroke={color} strokeWidth={dashed ? 2.4 : 3.4} strokeDasharray={dashed ? '9 7' : undefined} />
                        ))}
                        {index === 0 && <circle cx={x + 110} cy={16 + 98} r={6} fill={INK} />}
                        <Label x={x + 110} y={222} textAnchor="middle" fontSize={16} fontWeight={700} fill={INK}>{t(item.title)}</Label>
                        <Label x={x + 110} y={248} textAnchor="middle" fontSize={14} fill={MUTED}>{t(item.text)}</Label>
                    </Card>
                )
            })}
            <Caption y={292}>{t(say('Ebakitzaileen ebaki-puntua: bi ekuazioen sistemaren ebazpena', 'El punto de corte de dos secantes: la solución del sistema de sus ecuaciones', 'نقطة تقاطع المتقاطعين: حل نظام معادلتيهما'))}</Caption>
            <F x={360} y={316} anchor="middle" size={16} color={MUTED}>x + 2y = 5,  3x − y = 1  →  (1, 2)</F>
        </Figure>
    )
}

/* ---------- 13. The bisector of a segment ---------- */

export function BisectorFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const box: PlaneBox = { xMin: 0, xMax: 6, yMin: 0, yMax: 8 }
    return (
        <Figure height={340} label={t(say('A(1, 1) eta B(5, 3) muturreko zuzenkiaren erdibitzailea: M(3, 2) puntutik pasatzen den y = −2x + 8 zuzen perpendikularra', 'La mediatriz del segmento de extremos A(1, 1) y B(5, 3): la perpendicular y = −2x + 8 por M(3, 2)', 'محور القطعة التي طرفاها A(1, 1) وB(5, 3): العمودي y = −2x + 8 المار بـ M(3, 2)'))}>
            <Frame box={box} cell={33} ox={24} oy={20}>
                {(map, clip) => (
                    <g>
                        <PlaneLine map={map} m={-2} n={8} color={SECOND} width={3} clip={clip} />
                        <PlanePath map={map} points={[[1, 1], [5, 3]]} color={STAGE} width={3.4} />
                        <Dashed map={map} from={[1, 1]} to={[2, 4]} color={GREEN} />
                        <Dashed map={map} from={[5, 3]} to={[2, 4]} color={GREEN} />
                        <PlanePoint map={map} point={[1, 1]} name="A" color={INK} dx={-16} dy={4} />
                        <PlanePoint map={map} point={[5, 3]} name="B" color={INK} />
                        <PlanePoint map={map} point={[3, 2]} name="M" color={SECOND} dx={10} dy={16} />
                        <PlanePoint map={map} point={[2, 4]} name="X" color={GREEN} dx={-20} />
                    </g>
                )}
            </Frame>
            <F x={270} y={72} size={19}>M = (3, 2)</F>
            <F x={270} y={108} size={19}>m(AB) = 2/4 = 1/2   →   m′ = −2</F>
            <F x={270} y={150} size={20} color={SECOND}>y = −2x + 8</F>
            <F x={270} y={204} size={18} color={GREEN}>d(X, A) = d(X, B) = √10</F>
            <Caption y={330}>{t(say('Erdibitzailearen puntu guztiak A-tik eta B-tik distantzia berera daude', 'Todos los puntos de la mediatriz están a la misma distancia de A y de B', 'كل نقاط المحور على المسافة نفسها من A ومن B'))}</Caption>
        </Figure>
    )
}

/* ---------- 14. A circumference ---------- */

export function CircleFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const box: PlaneBox = { xMin: -4, xMax: 8, yMin: -7, yMax: 5 }
    return (
        <Figure height={300} label={t(say('C(2, −1) zentroko eta P(5, 3) puntutik pasatzen den zirkunferentzia: erradioa 5', 'La circunferencia de centro C(2, −1) que pasa por P(5, 3): radio 5', 'الدائرة التي مركزها C(2, −1) وتمر بـ P(5, 3): نصف القطر 5'))}>
            <Frame box={box} cell={21} ox={24} oy={16} labelStep={2}>
                {(map) => (
                    <g>
                        <circle cx={map.x(2)} cy={map.y(-1)} r={5 * map.cell} fill="rgba(47, 111, 219, 0.08)" stroke={STAGE} strokeWidth={3} />
                        <PlanePath map={map} points={[[2, -1], [5, 3]]} color={SECOND} width={2.6} />
                        <PlanePoint map={map} point={[2, -1]} name="C" color={INK} dx={-18} dy={16} />
                        <PlanePoint map={map} point={[5, 3]} name="P" color={SECOND} />
                    </g>
                )}
            </Frame>
            <F x={310} y={70} size={19}>r = √((5 − 2)² + (3 + 1)²) = 5</F>
            <F x={310} y={122} size={20} color={STAGE}>(x − 2)² + (y + 1)² = 25</F>
            <Label x={310} y={180} fontSize={15} fill={MUTED}>{t(say('d(Q, C) < r: barruan;  = r: gainean;  > r: kanpoan', 'd(Q, C) < r: dentro;  = r: sobre ella;  > r: fuera', 'd(Q, C) < r: داخلها؛ = r: عليها؛ > r: خارجها'))}</Label>
            <Caption y={290}>{t(say('Zentrotik r distantziara dauden puntuak', 'Los puntos que están a distancia r del centro', 'النقاط التي تبعد مسافة r عن المركز'))}</Caption>
        </Figure>
    )
}

/* ---------- 15. A parallelogram ---------- */

export function ParallelogramFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const box: PlaneBox = { xMin: 0, xMax: 7, yMin: 0, yMax: 7 }
    const corners: Array<[string, Point]> = [['A', [1, 1]], ['B', [5, 2]], ['C', [6, 6]], ['D', [2, 5]]]
    return (
        <Figure height={325} label={t(say('ABCD paralelogramoa: A(1, 1), B(5, 2), C(6, 6) eta D(2, 5); diagonalak (3,5; 3,5) puntuan ebakitzen dira', 'El paralelogramo ABCD: A(1, 1), B(5, 2), C(6, 6) y D(2, 5); las diagonales se cortan en (3,5; 3,5)', 'متوازي الأضلاع ABCD: A(1, 1) وB(5, 2) وC(6, 6) وD(2, 5)؛ يتقاطع القطران في (3.5; 3.5)'))}>
            <Frame box={box} cell={36} ox={24} oy={16}>
                {(map) => (
                    <g>
                        <polygon points={corners.map(([, [x, y]]) => `${map.x(x)},${map.y(y)}`).join(' ')} fill={GREEN_TINT} stroke={INK} strokeWidth={2.4} strokeLinejoin="round" />
                        <Dashed map={map} from={[1, 1]} to={[6, 6]} color={STAGE} />
                        <Dashed map={map} from={[5, 2]} to={[2, 5]} color={STAGE} />
                        <PlanePoint map={map} point={[3.5, 3.5]} color={SECOND} radius={6} />
                        {corners.map(([name, point]) => <PlanePoint key={name} map={map} point={point} name={name} color={INK} dx={name === 'A' || name === 'D' ? -18 : 8} />)}
                    </g>
                )}
            </Frame>
            <F x={320} y={72} size={20}>D = A + C − B</F>
            <F x={320} y={108} size={20} color={GREEN}>= (1 + 6 − 5, 1 + 6 − 2) = (2, 5)</F>
            <F x={320} y={170} size={19} color={SECOND}>{`M(AC) = M(BD) = ${language === 'ar' ? '(3.5; 3.5)' : '(3,5; 3,5)'}`}</F>
            <Caption y={316}>{t(say('Paralelogramoan AB = DC, eta diagonalak elkar erdibitzen dira', 'En el paralelogramo AB = DC, y las diagonales se cortan en su punto medio', 'في متوازي الأضلاع AB = DC، والقطران متناصفان'))}</Caption>
        </Figure>
    )
}

/* ---------- Hero art: vectors on a grid, a line and a circumference ---------- */

export function VectorsHeroArt() {
    return (
        <div className="fraction-v2-collage" aria-hidden="true">
            <svg viewBox="0 0 520 400" direction="ltr" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                <g transform="translate(20 24) rotate(-4)">
                    <rect width={250} height={210} rx={16} fill={PAPER} stroke={INK} strokeWidth={2} />
                    {[40, 80, 120, 160, 200].map((x) => <line key={`v${x}`} x1={x} y1={14} x2={x} y2={196} stroke="#e6dfd2" strokeWidth={1} />)}
                    {[40, 80, 120, 160].map((y) => <line key={`h${y}`} x1={14} y1={y} x2={236} y2={y} stroke="#e6dfd2" strokeWidth={1} />)}
                    <line x1={40} y1={170} x2={170} y2={60} stroke="#2f6fdb" strokeWidth={4} strokeLinecap="round" />
                    <polygon points="186,46 160,56 174,72" fill="#2f6fdb" />
                    <line x1={40} y1={170} x2={200} y2={170} stroke="#267b53" strokeWidth={3} strokeDasharray="7 5" />
                    <line x1={200} y1={170} x2={200} y2={52} stroke="#c4432a" strokeWidth={3} strokeDasharray="7 5" />
                </g>
                <g transform="translate(300 40) rotate(5)">
                    <rect width={190} height={190} rx={16} fill={GREEN_TINT} stroke={INK} strokeWidth={2} />
                    <circle cx={95} cy={95} r={62} fill="none" stroke={INK} strokeWidth={2.4} />
                    <line x1={10} y1={170} x2={180} y2={30} stroke="#c4432a" strokeWidth={3} />
                    <circle cx={95} cy={95} r={5} fill={INK} />
                </g>
                <g transform="translate(50 276) rotate(2)">
                    <rect width={420} height={86} rx={16} fill={MUSTARD_TINT} stroke={INK} strokeWidth={2} />
                    <text x={210} y={56} textAnchor="middle" fontSize={30} fontWeight={700} fill={INK} fontFamily={SERIF}>y = mx + n</text>
                </g>
            </svg>
        </div>
    )
}
