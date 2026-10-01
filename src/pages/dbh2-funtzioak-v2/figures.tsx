import { useId, type ReactNode } from 'react'
import { pickText, type LocalizedText, type UnitLanguage } from '../../features/unit-v2/types'
import { Figure } from '../dbh2-zatikiak-prototype/figures'
import { localExtremes, storyGraphs, trendIntervals, type Point, type Trend } from './functions'
import { AxisTitles, Label, PlaneGrid, PlaneGuides, PlanePath, PlanePoint } from './plane'
import { useBoxClip } from './planeClip'
import { planeMap, type PlaneBox, type PlaneMap } from './planeMap'

/* ==========================================================================
   Funtzioak · 2. DBH — lesson figures in the notebook style. The planes are
   drawn with the same PlaneGrid the laboratory uses, so what the student sees
   in a lesson looks like what they will manipulate afterwards. Lines are
   clipped to their plane and every label goes through <Label>, which reads
   right to left in Arabic.
   ========================================================================== */

const INK = 'var(--ink, #1d2733)'
const MUTED = 'var(--muted, #58616e)'
const STAGE = 'var(--stage, #2f6fdb)'
const STAGE_TINT = 'var(--stage-tint, #dde7f7)'
const SECOND = 'var(--second, #c4432a)'
const MUSTARD = 'var(--mustard, #e0a100)'
const MUSTARD_TINT = 'var(--mustard-tint, #fbebc0)'
const GREEN = 'var(--success, #267b53)'
const CARD = 'var(--card, #fffcf6)'

const pick = (language: UnitLanguage, text: LocalizedText) => pickText(language, text)
const say = (eu: string, es: string, ar: string): LocalizedText => ({ eu, es, ar })

const trendColor: Record<Trend, string> = { up: STAGE, down: SECOND, flat: MUSTARD }

/** A function sampled every `step` units, for smooth curves */
const sample = (fn: (x: number) => number, from: number, to: number, step = 0.05): Point[] => {
    const points: Point[] = []
    for (let x = from; x <= to + 1e-9; x += step) points.push([Math.round(x * 1000) / 1000, fn(x)])
    return points
}

function Caption({ y, children }: { y: number; children: ReactNode }) {
    return <Label x={360} y={y} textAnchor="middle" fontSize={15} fill={MUTED}>{children}</Label>
}

/** An arrowhead marker with an id of its own, for <path markerEnd> */
function useArrowHead(color = INK): [ReactNode, string] {
    const id = `functions-arrow-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`
    return [
        <marker key={id} id={id} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill={color} /></marker>,
        `url(#${id})`
    ]
}

/** A plane drawn inside a figure: grid first, then whatever the caller adds, clipped to the box */
function Frame({ box, cell, ox, oy, labelStep, xTitle, yTitle, children }: {
    box: PlaneBox
    cell: number
    ox: number
    oy: number
    labelStep?: number
    xTitle?: string
    yTitle?: string
    children?: (map: PlaneMap, clip: string) => ReactNode
}) {
    const map = planeMap(box, cell, ox, oy)
    const [clipPath, clip] = useBoxClip(map)
    return (
        <g>
            <defs>{clipPath}</defs>
            <rect x={ox} y={oy} width={map.width} height={map.height} fill={CARD} />
            <PlaneGrid map={map} labelStep={labelStep} />
            <AxisTitles map={map} xTitle={xTitle} yTitle={yTitle} />
            {children?.(map, clip)}
        </g>
    )
}

/* ---------- 1. Coordinates and quadrants ---------- */

export function CoordinateFigure({ language }: { language: UnitLanguage }) {
    const box: PlaneBox = { xMin: -4, xMax: 4, yMin: -3, yMax: 4 }
    const rows = [
        { quadrant: 'I', signs: '(+, +)', color: STAGE, at: [2.5, 2.5] },
        { quadrant: 'II', signs: '(−, +)', color: SECOND, at: [-3.2, 1.2] },
        { quadrant: 'III', signs: '(−, −)', color: MUSTARD, at: [-2.5, -1.9] },
        { quadrant: 'IV', signs: '(+, −)', color: GREEN, at: [2.5, -1.9] }
    ]
    return (
        <Figure height={340} label={pick(language, say('Ardatzak, koadranteak eta A(−2, 3) puntua', 'Ejes, cuadrantes y el punto A(−2, 3)', 'المحاور والأرباع والنقطة A(−2, 3)'))}>
            <Frame box={box} cell={36} ox={46} oy={34}>
                {(map) => (
                    <g>
                        {rows.map((row) => <text key={row.quadrant} x={map.x(row.at[0])} y={map.y(row.at[1]) + 7} textAnchor="middle" fontSize={21} fontWeight={700} fill={row.color} opacity={0.75}>{row.quadrant}</text>)}
                        <PlaneGuides map={map} point={[-2, 3]} />
                        <PlanePoint map={map} point={[-2, 3]} name="A(−2, 3)" dx={-9} dy={-10} anchor="end" />
                        <text x={map.x(-2)} y={map.y(0) + 40} textAnchor="middle" fontSize={14} fontWeight={700} fill={SECOND}>x = −2</text>
                        <text x={map.x(0) + 8} y={map.y(3) + 5} fontSize={14} fontWeight={700} fill={SECOND}>y = 3</text>
                    </g>
                )}
            </Frame>
            <Label x={420} y={64} fontSize={18} fontWeight={700} fill={INK}>{pick(language, say('Puntu bat = (x, y)', 'Un punto = (x, y)', 'النقطة = (x, y)'))}</Label>
            <Label x={420} y={92} fontSize={16} fill={MUTED}>{pick(language, say('lehen x (horizontala), gero y (bertikala)', 'primero x (horizontal), luego y (vertical)', 'أولًا x (أفقي) ثم y (رأسي)'))}</Label>
            {rows.map((row, index) => (
                <g key={row.quadrant}>
                    <rect x={420} y={124 + index * 44} width={64} height={34} rx={8} fill={CARD} stroke={row.color} strokeWidth={2} />
                    <text x={452} y={147 + index * 44} textAnchor="middle" fontSize={16} fontWeight={700} fill={row.color}>{row.quadrant}</text>
                    <text x={504} y={147 + index * 44} fontSize={17} fill={INK}>{row.signs}</text>
                </g>
            ))}
            <Caption y={330}>{pick(language, say('Lehenengo X ardatzean, gero Y ardatzean. Ardatzetako puntuak ez daude koadranteetan.', 'Primero se mide en el eje X y después en el Y. Los puntos de los ejes no están en ningún cuadrante.', 'نقيس أولًا على محور X ثم على Y. نقاط المحاور ليست في أي ربع.'))}</Caption>
        </Figure>
    )
}

/* ---------- 2. When a relation is a function ---------- */

export function FunctionTestFigure({ language }: { language: UnitLanguage }) {
    const [blueHead, blueArrow] = useArrowHead(STAGE)
    const [redHead, redArrow] = useArrowHead(SECOND)
    const node = (x: number, y: number, label: string, color: string) => (
        <g key={`${x}-${y}`}>
            <circle cx={x} cy={y} r={15} fill={CARD} stroke={color} strokeWidth={2.4} />
            <text x={x} y={y + 6} textAnchor="middle" fontSize={17} fontWeight={700} fill={INK}>{label}</text>
        </g>
    )
    const arrow = (x1: number, y1: number, x2: number, y2: number, color: string, marker: string) => (
        <line key={`${x1}-${y1}-${y2}`} x1={x1 + 17} y1={y1} x2={x2 - 19} y2={y2} stroke={color} strokeWidth={2.4} markerEnd={marker} />
    )
    const panel = (x: number, tint: string) => <rect x={x} y={30} width={220} height={176} rx={18} fill={tint} opacity={0.6} />
    const test = planeMap({ xMin: -1, xMax: 4, yMin: -2, yMax: 2 }, 26, 529, 86)
    const sideways = sample((y) => y * y, -2, 2).map(([y, x]) => [x, y] as Point)
    return (
        <Figure height={268} label={pick(language, say('Funtzioa den erlazio bat, ez den bat eta zuzen bertikalaren froga', 'Una relación que es función, otra que no lo es y la prueba de la vertical', 'علاقة هي دالة وأخرى ليست دالة واختبار الخط الرأسي'))}>
            <defs>{blueHead}{redHead}</defs>
            {panel(16, STAGE_TINT)}
            {panel(250, MUSTARD_TINT)}
            {panel(484, MUSTARD_TINT)}
            <Label x={126} y={54} textAnchor="middle" fontSize={16} fontWeight={700} fill={STAGE}>{pick(language, say('Funtzioa da ✓', 'Es función ✓', 'دالة ✓'))}</Label>
            <Label x={360} y={54} textAnchor="middle" fontSize={16} fontWeight={700} fill={SECOND}>{pick(language, say('Ez da funtzioa ✗', 'No es función ✗', 'ليست دالة ✗'))}</Label>
            <Label x={594} y={54} textAnchor="middle" fontSize={16} fontWeight={700} fill={SECOND}>{pick(language, say('Zuzen bertikalaren froga', 'Prueba de la vertical', 'اختبار الخط الرأسي'))}</Label>
            {/* A: every input has one output; the output 2 may repeat */}
            {[node(66, 90, '1', STAGE), node(66, 132, '2', STAGE), node(66, 174, '3', STAGE), node(186, 108, '2', STAGE), node(186, 166, '5', STAGE)]}
            {[arrow(66, 90, 186, 108, STAGE, blueArrow), arrow(66, 132, 186, 108, STAGE, blueArrow), arrow(66, 174, 186, 166, STAGE, blueArrow)]}
            {/* B: the same input 1 has two outputs */}
            {[node(300, 110, '1', SECOND), node(300, 166, '3', SECOND), node(420, 84, '2', SECOND), node(420, 126, '4', SECOND), node(420, 168, '6', SECOND)]}
            {[arrow(300, 110, 420, 84, SECOND, redArrow), arrow(300, 110, 420, 126, SECOND, redArrow), arrow(300, 166, 420, 168, SECOND, redArrow)]}
            {/* C: a vertical line meets the curve twice */}
            <rect x={test.x(-1)} y={test.y(2)} width={test.width} height={test.height} fill={CARD} />
            <PlaneGrid map={test} labels={false} />
            <PlanePath map={test} points={sideways} color={STAGE} width={3.2} />
            <PlanePath map={test} points={[[1, -2.3], [1, 2.3]]} color={SECOND} width={2.6} dashed />
            <PlanePoint map={test} point={[1, 1]} color={SECOND} radius={6} />
            <PlanePoint map={test} point={[1, -1]} color={SECOND} radius={6} />
            <Label x={126} y={228} textAnchor="middle" fontSize={15} fill={INK}>{pick(language, say('x bakoitzak y bakarra', 'cada x, una sola y', 'لكل x قيمة y واحدة'))}</Label>
            <Label x={360} y={228} textAnchor="middle" fontSize={15} fill={INK}>{pick(language, say('1 sarrerak bi irteera ditu', 'la entrada 1 tiene dos salidas', 'للمدخل 1 مخرجان'))}</Label>
            <Label x={594} y={228} textAnchor="middle" fontSize={15} fill={INK}>{pick(language, say('x = 1 zuzenak bi puntu ebakitzen ditu', 'x = 1 corta en dos puntos', 'الخط x = 1 يقطع نقطتين'))}</Label>
            <Caption y={256}>{pick(language, say('Sarrera bakoitzak irteera bakarra; irteera bat errepika daiteke', 'Cada entrada, una única salida; una salida sí puede repetirse', 'لكل مدخل مخرج واحد؛ ويمكن أن يتكرر المخرج'))}</Caption>
        </Figure>
    )
}

/* ---------- 3. Independent and dependent variables ---------- */

export function VariablesFigure({ language }: { language: UnitLanguage }) {
    const [head, arrow] = useArrowHead()
    return (
        <Figure height={236} label={pick(language, say('Aldagai askea sartzen da, menpekoa ateratzen da', 'Entra la variable independiente y sale la dependiente', 'يدخل المتغير المستقل ويخرج التابع'))}>
            <defs>{head}</defs>
            <rect x={40} y={60} width={170} height={90} rx={18} fill={STAGE_TINT} stroke={INK} strokeWidth={2} />
            <text x={125} y={94} textAnchor="middle" fontSize={26} fontWeight={700} fontStyle="italic" fill={STAGE}>x</text>
            <Label x={125} y={126} textAnchor="middle" fontSize={16} fontWeight={700} fill={INK}>{pick(language, say('aldagai askea', 'independiente', 'مستقل'))}</Label>
            <rect x={275} y={50} width={170} height={110} rx={22} fill={CARD} stroke={INK} strokeWidth={2.4} />
            <Label x={360} y={95} textAnchor="middle" fontSize={18} fontWeight={700} fill={INK}>{pick(language, say('araua', 'la regla', 'القاعدة'))}</Label>
            <text x={360} y={128} textAnchor="middle" fontSize={20} fontWeight={700} fill={SECOND}>{pick(language, say('y = 1,5 · x', 'y = 1,5 · x', 'y = 1.5 · x'))}</text>
            <rect x={510} y={60} width={170} height={90} rx={18} fill={MUSTARD_TINT} stroke={INK} strokeWidth={2} />
            <text x={595} y={94} textAnchor="middle" fontSize={26} fontWeight={700} fontStyle="italic" fill={SECOND}>y</text>
            <Label x={595} y={126} textAnchor="middle" fontSize={16} fontWeight={700} fill={INK}>{pick(language, say('aldagai menpekoa', 'dependiente', 'تابع'))}</Label>
            <path d="M212 105 H268" stroke={INK} strokeWidth={3} markerEnd={arrow} />
            <path d="M447 105 H503" stroke={INK} strokeWidth={3} markerEnd={arrow} />
            <Label x={125} y={184} textAnchor="middle" fontSize={16} fill={MUTED}>{pick(language, say('aukeratzen duguna: kiloak', 'lo que elegimos: los kilos', 'ما نختاره: الكيلوغرامات'))}</Label>
            <Label x={595} y={184} textAnchor="middle" fontSize={16} fill={MUTED}>{pick(language, say('x-ren araberakoa: prezioa (€)', 'depende de x: el precio (€)', 'يعتمد على x: السعر (€)'))}</Label>
            <Caption y={222}>{pick(language, say('Zer aukeratzen dugu? Zer ateratzen da horren ondorioz?', '¿Qué elegimos? ¿Qué resulta de ello?', 'ماذا نختار؟ وماذا ينتج عن ذلك؟'))}</Caption>
        </Figure>
    )
}

/* ---------- 4. A function in a table ---------- */

export function TableFigure({ language }: { language: UnitLanguage }) {
    const xs = [-1, 0, 1, 2, 3]
    const box: PlaneBox = { xMin: -2, xMax: 4, yMin: -2, yMax: 8 }
    const sign = (value: number) => (value < 0 ? `−${-value}` : String(value))
    return (
        <Figure height={330} label={pick(language, say('y = 2x + 1 funtzioaren balio-taula eta bere puntuak', 'Tabla de valores de y = 2x + 1 y sus puntos', 'جدول قيم y = 2x + 1 ونقاطه'))}>
            <text x={190} y={50} textAnchor="middle" fontSize={22} fontWeight={700} fill={STAGE}>y = 2x + 1</text>
            {['x', 'y'].map((name, row) => (
                <g key={name}>
                    <rect x={40} y={74 + row * 48} width={48} height={42} rx={6} fill={row === 0 ? STAGE_TINT : MUSTARD_TINT} stroke={INK} strokeWidth={1.6} />
                    <text x={64} y={102 + row * 48} textAnchor="middle" fontSize={20} fontWeight={700} fontStyle="italic" fill={INK}>{name}</text>
                    {xs.map((x, index) => (
                        <g key={index}>
                            <rect x={94 + index * 56} y={74 + row * 48} width={52} height={42} rx={6} fill={CARD} stroke={INK} strokeWidth={1.4} />
                            <text x={120 + index * 56} y={102 + row * 48} textAnchor="middle" fontSize={18} fill={INK}>{sign(row === 0 ? x : 2 * x + 1)}</text>
                        </g>
                    ))}
                </g>
            ))}
            {xs.map((x, index) => <text key={index} x={120 + index * 56} y={192} textAnchor="middle" fontSize={15} fill={SECOND} fontWeight={700}>{`(${sign(x)}, ${sign(2 * x + 1)})`}</text>)}
            <Label x={190} y={236} textAnchor="middle" fontSize={16} fill={MUTED}>{pick(language, say('x bakoitzeko: 2 · x + 1', 'para cada x: 2 · x + 1', 'لكل x: 2 · x + 1'))}</Label>
            <Frame box={box} cell={26} ox={480} oy={30} labelStep={2}>
                {(map, clip) => (
                    <g>
                        <PlanePath map={map} points={[[-1.6, -2.2], [3.6, 8.2]]} color={SECOND} width={2.4} dashed clip={clip} />
                        {xs.map((x) => <PlanePoint key={x} map={map} point={[x, 2 * x + 1]} color={STAGE} radius={5.5} />)}
                    </g>
                )}
            </Frame>
            <Caption y={320}>{pick(language, say('Taulako bikote bakoitza planoko puntu bat da', 'Cada pareja de la tabla es un punto del plano', 'كل زوج في الجدول نقطة في المستوى'))}</Caption>
        </Figure>
    )
}

/* ---------- 5. Formula and f(x) ---------- */

export function FormulaFigure({ language }: { language: UnitLanguage }) {
    const [head, arrow] = useArrowHead()
    return (
        <Figure height={244} label={pick(language, say('f(x) = x² − 3 funtzioan, f(−2) = 1', 'En f(x) = x² − 3, f(−2) = 1', 'في f(x) = x² − 3 يكون f(−2) = 1'))}>
            <defs>{head}</defs>
            <text x={360} y={42} textAnchor="middle" fontSize={24} fontWeight={700} fill={STAGE}>f(x) = x² − 3</text>
            {[
                { x: 30, title: say('Ordeztu', 'Sustituye', 'عوّض'), body: 'f(−2) = (−2)² − 3', color: STAGE_TINT },
                { x: 265, title: say('Berretura lehenik', 'Primero la potencia', 'القوة أولًا'), body: '= 4 − 3', color: MUSTARD_TINT },
                { x: 500, title: say('Emaitza', 'Resultado', 'النتيجة'), body: '= 1', color: STAGE_TINT }
            ].map((item, index) => (
                <g key={index}>
                    <rect x={item.x} y={70} width={190} height={90} rx={16} fill={item.color} stroke={INK} strokeWidth={2} />
                    <Label x={item.x + 95} y={96} textAnchor="middle" fontSize={16} fontWeight={700} fill={MUTED}>{pick(language, item.title)}</Label>
                    <text x={item.x + 95} y={136} textAnchor="middle" fontSize={20} fontWeight={700} fill={INK}>{item.body}</text>
                    {index < 2 && <path d={`M${item.x + 194} 115 H${item.x + 231}`} stroke={INK} strokeWidth={3} markerEnd={arrow} />}
                </g>
            ))}
            <Label x={360} y={194} textAnchor="middle" fontSize={16} fill={INK}>{pick(language, say('f(−2) = 1: x = −2 denean, y = 1  →  (−2, 1) puntua grafikoan dago', 'f(−2) = 1: cuando x = −2, y = 1  →  el punto (−2, 1) está en la gráfica', 'f(−2) = 1: عندما x = −2 تكون y = 1  ←  النقطة (−2, 1) على الرسم'))}</Label>
            <Caption y={230}>{pick(language, say('Parentesiek zeinua zaintzen dute: (−2)² = 4', 'Los paréntesis cuidan el signo: (−2)² = 4', 'تحافظ الأقواس على الإشارة: (−2)² = 4'))}</Caption>
        </Figure>
    )
}

/* ---------- 6. Plotting a graph ---------- */

export function PlotFigure({ language }: { language: UnitLanguage }) {
    const box: PlaneBox = { xMin: -3, xMax: 3, yMin: -3, yMax: 3 }
    const xs = [-2, -1, 0, 1, 2]
    const sign = (value: number) => (value < 0 ? `−${-value}` : String(value))
    return (
        <Figure height={318} label={pick(language, say('y = x² − 2 funtzioaren taula, puntuak eta kurba', 'Tabla, puntos y curva de y = x² − 2', 'جدول ونقاط ومنحنى y = x² − 2'))}>
            <Frame box={box} cell={38} ox={46} oy={34}>
                {(map, clip) => (
                    <g>
                        <PlanePath map={map} points={sample((x) => x * x - 2, -2.4, 2.4)} color={SECOND} width={3} clip={clip} />
                        {xs.map((x) => <PlanePoint key={x} map={map} point={[x, x * x - 2]} color={STAGE} radius={6} />)}
                    </g>
                )}
            </Frame>
            <text x={390} y={52} fontSize={21} fontWeight={700} fill={STAGE}>y = x² − 2</text>
            {['x', 'y'].map((name, row) => (
                <g key={name}>
                    <rect x={390} y={70 + row * 40} width={40} height={34} rx={6} fill={row === 0 ? STAGE_TINT : MUSTARD_TINT} stroke={INK} strokeWidth={1.4} />
                    <text x={410} y={93 + row * 40} textAnchor="middle" fontSize={17} fontWeight={700} fontStyle="italic" fill={INK}>{name}</text>
                    {xs.map((x, index) => (
                        <g key={x}>
                            <rect x={436 + index * 50} y={70 + row * 40} width={46} height={34} rx={6} fill={CARD} stroke={INK} strokeWidth={1.2} />
                            <text x={459 + index * 50} y={93 + row * 40} textAnchor="middle" fontSize={16} fill={INK}>{sign(row === 0 ? x : x * x - 2)}</text>
                        </g>
                    ))}
                </g>
            ))}
            {[
                say('1. Taula osatu', '1. Completa la tabla', '1. أكمل الجدول'),
                say('2. Puntuak planoan kokatu', '2. Sitúa los puntos en el plano', '2. ضع النقاط في المستوى'),
                say('3. Marra leun batez elkartu', '3. Únelos con una línea suave', '3. صِلها بخط ناعم')
            ].map((text, index) => <Label key={index} x={390} y={178 + index * 30} fontSize={16} fill={INK}>{pick(language, text)}</Label>)}
            <Caption y={306}>{pick(language, say('Zenbat eta puntu gehiago, orduan eta kurba zehatzagoa', 'Cuantos más puntos, más precisa es la curva', 'كلما زادت النقاط كان المنحنى أدق'))}</Caption>
        </Figure>
    )
}

/* ---------- 7. Continuous and discontinuous graphs ---------- */

export function ContinuityFigure({ language }: { language: UnitLanguage }) {
    const box: PlaneBox = { xMin: 0, xMax: 6, yMin: 0, yMax: 5 }
    const curve = sample((x) => 1.2 + 2.2 * Math.sin(x / 1.6) + 0.2 * x, 0, 6, 0.1)
    return (
        <Figure height={318} label={pick(language, say('Grafiko jarraitua eta grafiko etena', 'Una gráfica continua y otra discontinua', 'رسم متصل وآخر منفصل'))}>
            <Frame box={box} cell={40} ox={40} oy={40} xTitle={pick(language, say('ordua', 'hora', 'الساعة'))} yTitle={pick(language, say('tenperatura', 'temperatura', 'الحرارة'))}>
                {(map, clip) => <PlanePath map={map} points={curve} color={STAGE} width={3.6} clip={clip} />}
            </Frame>
            <Frame box={box} cell={40} ox={400} oy={40} xTitle={pick(language, say('eguna', 'día', 'اليوم'))} yTitle={pick(language, say('saldutako liburuak', 'libros vendidos', 'الكتب المبيعة'))}>
                {(map) => (
                    <g>
                        {([[1, 1], [2, 3], [3, 2], [4, 4], [5, 2]] as Point[]).map((point) => <PlanePoint key={point[0]} map={map} point={point} color={SECOND} radius={6} />)}
                    </g>
                )}
            </Frame>
            <Label x={160} y={308} textAnchor="middle" fontSize={17} fontWeight={700} fill={STAGE}>{pick(language, say('jarraitua: arkatza altxatu gabe', 'continua: sin levantar el lápiz', 'متصل: دون رفع القلم'))}</Label>
            <Label x={520} y={308} textAnchor="middle" fontSize={17} fontWeight={700} fill={SECOND}>{pick(language, say('etena: puntu bakanak', 'discontinua: puntos sueltos', 'منفصل: نقاط متفرقة'))}</Label>
        </Figure>
    )
}

/* ---------- 8. Reading a value ---------- */

export function ReadFigure({ language }: { language: UnitLanguage }) {
    const graph = storyGraphs[0]
    const box: PlaneBox = { xMin: 0, xMax: 8, yMin: 0, yMax: 13 }
    return (
        <Figure height={404} label={pick(language, say('Tenperatura-grafikoa: f(4) = 8 eta f(x) = 4 denean x = 3', 'Gráfica de la temperatura: f(4) = 8 y f(x) = 4 cuando x = 3', 'رسم الحرارة: f(4) = 8 و f(x) = 4 عندما x = 3'))}>
            <Frame box={box} cell={24} ox={56} oy={40} labelStep={2} xTitle={pick(language, graph.xLabel)} yTitle={pick(language, graph.yLabel)}>
                {(map) => (
                    <g>
                        <PlanePath map={map} points={graph.points} color={STAGE} width={3.6} />
                        <PlaneGuides map={map} point={[4, 8]} />
                        <PlaneGuides map={map} point={[3, 4]} color={GREEN} />
                        <PlanePoint map={map} point={[4, 8]} name="(4, 8)" dx={-9} dy={-8} anchor="end" />
                        <PlanePoint map={map} point={[3, 4]} color={GREEN} name="(3, 4)" dx={-9} dy={-8} anchor="end" />
                    </g>
                )}
            </Frame>
            <Label x={330} y={78} fontSize={17} fontWeight={700} fill={SECOND}>{pick(language, say('f(4) zenbat da?', '¿Cuánto vale f(4)?', 'كم تساوي f(4)؟'))}</Label>
            {[
                say('x = 4 bilatu ardatz horizontalean', 'Busca x = 4 en el eje horizontal', 'ابحث عن x = 4 على المحور الأفقي'),
                say('igo kurbaraino eta irakurri: 8 °C', 'sube hasta la curva y lee: 8 °C', 'اصعد حتى المنحنى واقرأ: 8 °م')
            ].map((text, index) => <Label key={index} x={330} y={108 + index * 28} fontSize={16} fill={INK}>{pick(language, text)}</Label>)}
            <Label x={330} y={202} fontSize={17} fontWeight={700} fill={GREEN}>{pick(language, say('Noiz da f(x) = 4?', '¿Cuándo es f(x) = 4?', 'متى تكون f(x) = 4؟'))}</Label>
            {[
                say('4 bilatu ardatz bertikalean', 'Busca 4 en el eje vertical', 'ابحث عن 4 على المحور الرأسي'),
                say('joan kurbaraino eta jaitsi: x = 3', 've hasta la curva y baja: x = 3', 'اذهب إلى المنحنى وانزل: x = 3')
            ].map((text, index) => <Label key={index} x={330} y={232 + index * 28} fontSize={16} fill={INK}>{pick(language, text)}</Label>)}
            <Label x={330} y={320} fontSize={15} fill={MUTED}>{pick(language, say('Lauki bertikal bakoitza: 1 °C', 'Cada cuadro vertical: 1 °C', 'كل مربع رأسي: 1 °م'))}</Label>
        </Figure>
    )
}

/* ---------- 9. Intercepts with the axes ---------- */

export function InterceptsFigure({ language }: { language: UnitLanguage }) {
    const graph = storyGraphs[4]
    const box: PlaneBox = { xMin: -4, xMax: 6, yMin: -3, yMax: 4 }
    return (
        <Figure height={308} label={pick(language, say('Funtzio baten ebakidurak ardatzekin', 'Puntos de corte de una función con los ejes', 'نقاط تقاطع دالة مع المحاور'))}>
            <Frame box={box} cell={31} ox={40} oy={32} labelStep={2}>
                {(map) => (
                    <g>
                        <PlanePath map={map} points={graph.points} color={STAGE} width={3.4} />
                        {([[-3, 0], [1, 0], [5, 0]] as Point[]).map((point) => <PlanePoint key={point[0]} map={map} point={point} color={SECOND} radius={6.5} />)}
                        <PlanePoint map={map} point={[0, 2]} color={MUSTARD} radius={7} name="(0, 2)" dx={10} dy={-6} />
                    </g>
                )}
            </Frame>
            <rect x={410} y={44} width={290} height={70} rx={14} fill={MUSTARD_TINT} stroke={INK} strokeWidth={1.8} />
            <Label x={428} y={72} fontSize={16} fontWeight={700} fill={INK}>{pick(language, say('Y ardatzarekin: x = 0', 'Con el eje Y: x = 0', 'مع محور Y: x = 0'))}</Label>
            <Label x={428} y={98} fontSize={16} fill={INK}>{pick(language, say('gehienez bat: (0, 2)', 'como mucho uno: (0, 2)', 'نقطة واحدة على الأكثر: (0, 2)'))}</Label>
            <rect x={410} y={130} width={290} height={70} rx={14} fill={STAGE_TINT} stroke={INK} strokeWidth={1.8} />
            <Label x={428} y={158} fontSize={16} fontWeight={700} fill={INK}>{pick(language, say('X ardatzarekin: y = 0', 'Con el eje X: y = 0', 'مع محور X: y = 0'))}</Label>
            <text x={428} y={184} fontSize={16} fill={SECOND} fontWeight={700}>(−3, 0) · (1, 0) · (5, 0)</text>
            <Caption y={298}>{pick(language, say('Ebakidura-puntu batean, koordenatuetako bat 0 da', 'En un punto de corte, una de las coordenadas vale 0', 'في نقطة التقاطع تساوي إحدى الإحداثيات صفرًا'))}</Caption>
        </Figure>
    )
}

/* ---------- 10. Increasing, decreasing, constant ---------- */

export function VariationFigure({ language }: { language: UnitLanguage }) {
    const graph = storyGraphs[1]
    const box: PlaneBox = { xMin: 0, xMax: 8, yMin: 0, yMax: 7 }
    const intervals = trendIntervals(graph.points)
    return (
        <Figure height={344} label={pick(language, say('Hegazkinaren altuera: gorakorra, konstantea eta beherakorra', 'Altura de la avioneta: creciente, constante y decreciente', 'ارتفاع الطائرة: متزايد وثابت ومتناقص'))}>
            <Frame box={box} cell={32} ox={46} oy={34} labelStep={1} xTitle={pick(language, graph.xLabel)} yTitle={pick(language, graph.yLabel)}>
                {(map) => (
                    <g>
                        {intervals.map((interval) => (
                            <rect key={interval.from} x={map.x(interval.from)} y={map.y(7)} width={map.x(interval.to) - map.x(interval.from)} height={map.y(0) - map.y(7)} fill={trendColor[interval.trend]} opacity={0.12} />
                        ))}
                        {intervals.map((interval) => (
                            <PlanePath key={`p${interval.from}`} map={map} points={graph.points.filter((point) => point[0] >= interval.from && point[0] <= interval.to)} color={trendColor[interval.trend]} width={4} />
                        ))}
                    </g>
                )}
            </Frame>
            {[
                { trend: 'up' as const, text: say('Gorakorra: x handitzean y handitzen da', 'Creciente: al crecer x, crece y', 'متزايدة: بزيادة x تزيد y') },
                { trend: 'flat' as const, text: say('Konstantea: y ez da aldatzen', 'Constante: y no cambia', 'ثابتة: y لا تتغير') },
                { trend: 'down' as const, text: say('Beherakorra: x handitzean y txikitzen da', 'Decreciente: al crecer x, y disminuye', 'متناقصة: بزيادة x تنقص y') }
            ].map((row, index) => (
                <g key={row.trend}>
                    <rect x={352} y={56 + index * 50} width={26} height={26} rx={7} fill={trendColor[row.trend]} />
                    <Label x={388} y={75 + index * 50} fontSize={16} fill={INK}>{pick(language, row.text)}</Label>
                </g>
            ))}
            <Label x={352} y={226} fontSize={16} fontWeight={700} fill={INK}>{pick(language, say('Tarteak (x-ren balioak):', 'Intervalos (valores de x):', 'الفترات (قيم x):'))}</Label>
            <text x={352} y={252} fontSize={16} fill={STAGE} fontWeight={700}>(0, 2) · (4, 5) ↗</text>
            <text x={352} y={276} fontSize={16} fill={MUSTARD} fontWeight={700}>(2, 4) →</text>
            <text x={472} y={276} fontSize={16} fill={SECOND} fontWeight={700}>(5, 8) ↘</text>
            <Caption y={336}>{pick(language, say('Irakurri ezkerretik eskuinera', 'Lee de izquierda a derecha', 'اقرأ من اليسار إلى اليمين'))}</Caption>
        </Figure>
    )
}

/* ---------- 11. Maxima and minima ---------- */

export function ExtremesFigure({ language }: { language: UnitLanguage }) {
    const graph = storyGraphs[2]
    const box: PlaneBox = { xMin: 0, xMax: 8, yMin: 0, yMax: 10 }
    const { maxima, minima } = localExtremes(graph.points)
    return (
        <Figure height={366} label={pick(language, say('Abiaduraren maximoak eta minimoa', 'Máximos y mínimo de la velocidad', 'القيم العظمى والصغرى للسرعة'))}>
            <Frame box={box} cell={26} ox={46} oy={36} labelStep={2} xTitle={pick(language, graph.xLabel)} yTitle={pick(language, graph.yLabel)}>
                {(map) => (
                    <g>
                        <PlanePath map={map} points={graph.points} color={STAGE} width={3.8} />
                        {maxima.map((point) => <PlanePoint key={`M${point[0]}`} map={map} point={point} color={SECOND} radius={7} name={`(${point[0]}, ${point[1]})`} dx={0} dy={-13} anchor="middle" />)}
                        {minima.map((point) => <PlanePoint key={`m${point[0]}`} map={map} point={point} color={GREEN} radius={7} name={`(${point[0]}, ${point[1]})`} dx={0} dy={24} anchor="middle" />)}
                    </g>
                )}
            </Frame>
            <circle cx={366} cy={74} r={8} fill={SECOND} />
            <Label x={382} y={79} fontSize={16} fill={INK}>{pick(language, say('maximoak: (3, 8) eta (7, 7)', 'máximos: (3, 8) y (7, 7)', 'قيم عظمى: (3، 8) و(7، 7)'))}</Label>
            <circle cx={366} cy={110} r={8} fill={GREEN} />
            <Label x={382} y={115} fontSize={16} fill={INK}>{pick(language, say('minimoa: (5, 2)', 'mínimo: (5, 2)', 'قيمة صغرى: (5، 2)'))}</Label>
            <Label x={366} y={162} fontSize={16} fill={MUTED}>{pick(language, say('Maximoa: gorakorra → beherakorra', 'Máximo: de creciente a decreciente', 'العظمى: من تزايد إلى تناقص'))}</Label>
            <Label x={366} y={188} fontSize={16} fill={MUTED}>{pick(language, say('Minimoa: beherakorra → gorakorra', 'Mínimo: de decreciente a creciente', 'الصغرى: من تناقص إلى تزايد'))}</Label>
            <Label x={366} y={226} fontSize={16} fontWeight={700} fill={INK}>{pick(language, say('Maximo absolutua: (3, 8), punturik altuena', 'Máximo absoluto: (3, 8), el punto más alto', 'العظمى المطلقة: (3، 8)، أعلى نقطة'))}</Label>
            <Caption y={358}>{pick(language, say('Muturrak joera aldatzen den lekuan daude', 'Los extremos están donde cambia la tendencia', 'تقع القيم القصوى حيث يتغير الاتجاه'))}</Caption>
        </Figure>
    )
}

/* ---------- 12. Direct proportionality ---------- */

export function ProportionalFigure({ language }: { language: UnitLanguage }) {
    const box: PlaneBox = { xMin: 0, xMax: 5, yMin: 0, yMax: 9 }
    const rows = [[1, 2], [2, 4], [3, 6], [4, 8]]
    return (
        <Figure height={332} label={pick(language, say('y = 2x zuzena jatorritik pasatzen da', 'La recta y = 2x pasa por el origen', 'الخط y = 2x يمر بنقطة الأصل'))}>
            <Frame box={box} cell={28} ox={50} oy={30}>
                {(map, clip) => (
                    <g>
                        <PlanePath map={map} points={[[0, 0], [5, 10]]} color={STAGE} width={3.6} clip={clip} />
                        {rows.map(([x, y]) => <PlanePoint key={x} map={map} point={[x, y]} color={SECOND} radius={5.5} />)}
                        <PlanePoint map={map} point={[0, 0]} color={MUSTARD} radius={7} name="(0, 0)" dx={12} dy={-7} />
                    </g>
                )}
            </Frame>
            <text x={330} y={56} fontSize={24} fontWeight={700} fill={STAGE}>y = 2x</text>
            {['x', 'y'].map((name, row) => (
                <g key={name}>
                    <rect x={330} y={76 + row * 40} width={40} height={34} rx={6} fill={row === 0 ? STAGE_TINT : MUSTARD_TINT} stroke={INK} strokeWidth={1.4} />
                    <text x={350} y={99 + row * 40} textAnchor="middle" fontSize={17} fontWeight={700} fontStyle="italic" fill={INK}>{name}</text>
                    {rows.map((pair, index) => (
                        <g key={index}>
                            <rect x={376 + index * 46} y={76 + row * 40} width={42} height={34} rx={6} fill={CARD} stroke={INK} strokeWidth={1.2} />
                            <text x={397 + index * 46} y={99 + row * 40} textAnchor="middle" fontSize={16} fill={INK}>{pair[row]}</text>
                        </g>
                    ))}
                </g>
            ))}
            <Label x={330} y={184} fontSize={16} fill={INK}>{pick(language, say('y : x = 2 beti  →  m = 2', 'y : x = 2 siempre  →  m = 2', 'y : x = 2 دائمًا  ←  m = 2'))}</Label>
            <Label x={330} y={212} fontSize={16} fill={INK}>{pick(language, say('x bikoiztean, y ere bikoizten da', 'al duplicar x, también se duplica y', 'عند مضاعفة x تتضاعف y أيضًا'))}</Label>
            <Label x={330} y={240} fontSize={16} fill={INK}>{pick(language, say('x = 0 → y = 0: jatorritik pasatzen da', 'x = 0 → y = 0: pasa por el origen', 'x = 0 ← y = 0: يمر بنقطة الأصل'))}</Label>
            <Caption y={324}>{pick(language, say('Proportzionaltasun zuzena: y = m · x', 'Proporcionalidad directa: y = m · x', 'التناسب الطردي: y = m · x'))}</Caption>
        </Figure>
    )
}

/* ---------- 13. Slope between two points ---------- */

export function SlopeFigure({ language }: { language: UnitLanguage }) {
    const box: PlaneBox = { xMin: 0, xMax: 6, yMin: 0, yMax: 9 }
    return (
        <Figure height={322} label={pick(language, say('A(1, 2) eta B(4, 8) puntuen arteko malda', 'Pendiente entre A(1, 2) y B(4, 8)', 'الميل بين A(1, 2) وB(4, 8)'))}>
            <Frame box={box} cell={28} ox={44} oy={30}>
                {(map, clip) => (
                    <g>
                        <PlanePath map={map} points={[[0, 0], [4.5, 9]]} color={STAGE} width={3.6} clip={clip} />
                        <PlanePath map={map} points={[[1, 2], [4, 2], [4, 8]]} color={SECOND} width={2.6} dashed />
                        <text x={map.x(2.5)} y={map.y(2) + 21} textAnchor="middle" fontSize={16} fontWeight={700} fill={SECOND}>Δx = 3</text>
                        <text x={map.x(4) + 9} y={map.y(5) + 5} fontSize={16} fontWeight={700} fill={SECOND}>Δy = 6</text>
                        <PlanePoint map={map} point={[1, 2]} color={INK} radius={6} name="A" dx={-10} dy={-6} anchor="end" />
                        <PlanePoint map={map} point={[4, 8]} color={INK} radius={6} name="B" dx={-10} dy={-6} anchor="end" />
                    </g>
                )}
            </Frame>
            <text x={300} y={58} fontSize={17} fontWeight={700} fill={INK}>A(1, 2) · B(4, 8)</text>
            <Label x={300} y={96} fontSize={17} fill={INK}>{pick(language, say('Malda = y-ren aldaketa : x-ren aldaketa', 'Pendiente = cambio de y : cambio de x', 'الميل = تغير y : تغير x'))}</Label>
            <text x={300} y={136} fontSize={21} fontWeight={700} fill={STAGE}>m = (y₂ − y₁) : (x₂ − x₁)</text>
            <text x={300} y={174} fontSize={20} fill={INK}>m = (8 − 2) : (4 − 1)</text>
            <text x={300} y={212} fontSize={22} fontWeight={700} fill={SECOND}>m = 6 : 3 = 2</text>
            <Label x={300} y={248} fontSize={16} fill={MUTED}>{pick(language, say('eskuinera 1 unitate → gora 2 unitate', 'una unidad a la derecha → dos hacia arriba', 'وحدة إلى اليمين ← وحدتان إلى أعلى'))}</Label>
            <Caption y={312}>{pick(language, say('Malda: zuzenaren aldapa', 'La pendiente mide la inclinación de la recta', 'الميل يقيس انحدار الخط'))}</Caption>
        </Figure>
    )
}

/* ---------- 14. Sign and size of the slope ---------- */

export function SlopeSignsFigure({ language }: { language: UnitLanguage }) {
    const box: PlaneBox = { xMin: -2, xMax: 2, yMin: -2, yMax: 2 }
    const cases: Array<{ x: number; m: number; color: string; text: LocalizedText }> = [
        { x: 18, m: 1, color: STAGE, text: say('m > 0: gorakorra', 'm > 0: creciente', 'm > 0: متزايد') },
        { x: 192, m: -1, color: SECOND, text: say('m < 0: beherakorra', 'm < 0: decreciente', 'm < 0: متناقص') },
        { x: 366, m: 0, color: MUSTARD, text: say('m = 0: horizontala', 'm = 0: horizontal', 'm = 0: أفقي') },
        { x: 540, m: 3, color: GREEN, text: say('m = 3: aldapatsua', 'm = 3: muy inclinada', 'm = 3: شديد الانحدار') }
    ]
    return (
        <Figure height={264} label={pick(language, say('Maldaren zeinua eta tamaina', 'El signo y el tamaño de la pendiente', 'إشارة الميل وحجمه'))}>
            {cases.map((item) => (
                <g key={item.x}>
                    <Frame box={box} cell={30} ox={item.x + 22} oy={28} labelStep={4}>
                        {(map, clip) => <PlanePath map={map} points={[[-3, item.m === 0 ? 1 : -3 * item.m], [3, item.m === 0 ? 1 : 3 * item.m]]} color={item.color} width={4} clip={clip} />}
                    </Frame>
                    <Label x={item.x + 82} y={206} textAnchor="middle" fontSize={15} fontWeight={700} fill={item.color}>{pick(language, item.text)}</Label>
                </g>
            ))}
            <Caption y={246}>{pick(language, say('Zeinuak norabidea esaten du; |m| zenbat eta handiagoa, orduan eta aldapatsuagoa', 'El signo da la dirección; cuanto mayor es |m|, más inclinada', 'الإشارة تحدد الاتجاه؛ وكلما كبر |m| زاد الانحدار'))}</Caption>
        </Figure>
    )
}

/* ---------- 15. The linear function y = mx + n ---------- */

export function AffineFigure({ language }: { language: UnitLanguage }) {
    const box: PlaneBox = { xMin: -3, xMax: 4, yMin: -4, yMax: 6 }
    return (
        <Figure height={322} label={pick(language, say('y = 2x − 1 eta y = 2x zuzenak', 'Las rectas y = 2x − 1 e y = 2x', 'الخطان y = 2x − 1 وy = 2x'))}>
            <Frame box={box} cell={26} ox={44} oy={30} labelStep={2}>
                {(map, clip) => (
                    <g>
                        <PlanePath map={map} points={[[-3, -6], [4, 8]]} color={MUSTARD} width={3} dashed clip={clip} />
                        <PlanePath map={map} points={[[-3, -7], [4, 7]]} color={STAGE} width={3.8} clip={clip} />
                        <path d={`M${map.x(0)} ${map.y(-1)} H${map.x(1)} V${map.y(1)}`} stroke={SECOND} strokeWidth={2.4} strokeDasharray="4 4" fill="none" />
                        <PlanePoint map={map} point={[0, -1]} color={SECOND} radius={6.5} name="(0, −1)" dx={10} dy={20} />
                        <PlanePoint map={map} point={[1, 1]} color={SECOND} radius={5.5} name="(1, 1)" dx={10} dy={6} />
                    </g>
                )}
            </Frame>
            <text x={300} y={58} fontSize={24} fontWeight={700} fill={STAGE}>y = mx + n</text>
            <Label x={300} y={94} fontSize={17} fill={INK}>{pick(language, say('m = malda (aldapa)', 'm = pendiente (inclinación)', 'm = الميل (الانحدار)'))}</Label>
            <Label x={300} y={122} fontSize={17} fill={INK}>{pick(language, say('n = Y ardatzeko ebakidura: (0, n)', 'n = ordenada en el origen: (0, n)', 'n = التقاطع مع محور Y: (0, n)'))}</Label>
            <text x={300} y={168} fontSize={20} fontWeight={700} fill={SECOND}>y = 2x − 1  →  m = 2, n = −1</text>
            <Label x={300} y={200} fontSize={16} fill={MUTED}>{pick(language, say('Hasi (0, −1) puntuan: eskuinera 1, gora 2', 'Empieza en (0, −1): 1 a la derecha, 2 arriba', 'ابدأ من (0, −1): وحدة يمينًا ووحدتان إلى أعلى'))}</Label>
            <Label x={300} y={236} fontSize={16} fill={MUSTARD} fontWeight={700}>{pick(language, say('Marra etena: y = 2x (n = 0, jatorritik)', 'Trazo discontinuo: y = 2x (n = 0, por el origen)', 'الخط المتقطع: y = 2x (n = 0 يمر بالأصل)'))}</Label>
            <Label x={300} y={260} fontSize={16} fill={MUTED}>{pick(language, say('Malda bera → zuzen paraleloak', 'Misma pendiente → rectas paralelas', 'الميل نفسه ← خطان متوازيان'))}</Label>
            <Caption y={312}>{pick(language, say('m-k aldapa finkatzen du, n-k hasierako altuera', 'm fija la inclinación y n la altura inicial', 'يحدد m الانحدار ويحدد n الارتفاع الابتدائي'))}</Caption>
        </Figure>
    )
}

/* ---------- 16. Constant functions ---------- */

export function ConstantFigure({ language }: { language: UnitLanguage }) {
    const box: PlaneBox = { xMin: -4, xMax: 4, yMin: -2, yMax: 5 }
    return (
        <Figure height={300} label={pick(language, say('y = 3, y = 0 eta x = 2 zuzenak', 'Las rectas y = 3, y = 0 y x = 2', 'الخطوط y = 3 وy = 0 وx = 2'))}>
            <Frame box={box} cell={32} ox={44} oy={34}>
                {(map) => (
                    <g>
                        <PlanePath map={map} points={[[-4, 3], [4, 3]]} color={STAGE} width={4} />
                        <PlanePath map={map} points={[[-4, 0], [4, 0]]} color={SECOND} width={4} />
                        <PlanePath map={map} points={[[2, -2], [2, 5]]} color={MUTED} width={3} dashed />
                        <text x={map.x(-3.9)} y={map.y(3) - 9} fontSize={16} fontWeight={700} fill={STAGE} paintOrder="stroke" stroke={CARD} strokeWidth={4}>y = 3</text>
                        <text x={map.x(-3.9)} y={map.y(0) - 9} fontSize={16} fontWeight={700} fill={SECOND} paintOrder="stroke" stroke={CARD} strokeWidth={4}>y = 0</text>
                        <text x={map.x(2) + 8} y={map.y(4.4)} fontSize={16} fontWeight={700} fill={MUTED} paintOrder="stroke" stroke={CARD} strokeWidth={4}>x = 2</text>
                    </g>
                )}
            </Frame>
            <Label x={390} y={62} fontSize={17} fontWeight={700} fill={STAGE}>{pick(language, say('y = k: funtzio konstantea', 'y = k: función constante', 'y = k: دالة ثابتة'))}</Label>
            <Label x={390} y={90} fontSize={16} fill={INK}>{pick(language, say('x edozein dela, y beti k da', 'sea cual sea x, y siempre vale k', 'مهما كانت x تبقى y تساوي k'))}</Label>
            <Label x={390} y={124} fontSize={16} fill={INK}>{pick(language, say('Horizontala: m = 0', 'Es horizontal: m = 0', 'أفقي: m = 0'))}</Label>
            <Label x={390} y={152} fontSize={16} fill={INK}>{pick(language, say('y = 0 → X ardatza bera', 'y = 0 → el propio eje X', 'y = 0 ← محور X نفسه'))}</Label>
            <Label x={390} y={196} fontSize={16} fontWeight={700} fill={MUTED}>{pick(language, say('x = 2 (bertikala) ez da funtzioa:', 'x = 2 (vertical) no es función:', 'x = 2 (رأسي) ليس دالة:'))}</Label>
            <Label x={390} y={220} fontSize={16} fill={MUTED}>{pick(language, say('x berak infinitu y ditu', 'una misma x tiene infinitas y', 'x واحدة لها عدد لا نهائي من y'))}</Label>
            <Caption y={290}>{pick(language, say('Zuzen horizontala funtzioa da; bertikala ez', 'La recta horizontal es función; la vertical, no', 'الخط الأفقي دالة والرأسي ليس دالة'))}</Caption>
        </Figure>
    )
}

/* ---------- 17. Finding the equation of a line ---------- */

export function LineEquationFigure({ language }: { language: UnitLanguage }) {
    const box: PlaneBox = { xMin: 0, xMax: 4, yMin: 0, yMax: 9 }
    return (
        <Figure height={322} label={pick(language, say('(0, 1) eta (3, 7) puntuetatik pasatzen den zuzena', 'La recta que pasa por (0, 1) y (3, 7)', 'الخط المار بالنقطتين (0, 1) و(3, 7)'))}>
            <Frame box={box} cell={28} ox={50} oy={30}>
                {(map, clip) => (
                    <g>
                        <PlanePath map={map} points={[[0, 1], [4, 9]]} color={STAGE} width={3.6} clip={clip} />
                        <PlanePath map={map} points={[[0, 1], [3, 1], [3, 7]]} color={SECOND} width={2.2} dashed />
                        <PlanePoint map={map} point={[0, 1]} color={SECOND} radius={6.5} name="(0, 1)" dx={12} dy={-8} />
                        <PlanePoint map={map} point={[3, 7]} color={SECOND} radius={6.5} name="(3, 7)" dx={-10} dy={-6} anchor="end" />
                    </g>
                )}
            </Frame>
            {[
                { y: 62, text: say('1. n: x = 0 denean y = 1  →  n = 1', '1. n: cuando x = 0, y = 1  →  n = 1', '1. n: عندما x = 0 تكون y = 1  ←  n = 1') },
                { y: 102, text: say('2. m: (7 − 1) : (3 − 0) = 6 : 3  →  m = 2', '2. m: (7 − 1) : (3 − 0) = 6 : 3  →  m = 2', '2. m: (7 − 1) : (3 − 0) = 6 : 3  ←  m = 2') },
                { y: 142, text: say('3. Idatzi y = mx + n', '3. Escribe y = mx + n', '3. اكتب y = mx + n') }
            ].map((row) => <Label key={row.y} x={250} y={row.y} fontSize={16} fill={INK}>{pick(language, row.text)}</Label>)}
            <text x={250} y={190} fontSize={26} fontWeight={700} fill={SECOND}>y = 2x + 1</text>
            <Label x={250} y={226} fontSize={16} fill={MUTED}>{pick(language, say('Egiaztatu: x = 3 → 2 · 3 + 1 = 7 ✓', 'Comprueba: x = 3 → 2 · 3 + 1 = 7 ✓', 'تحقق: x = 3 ← 2 · 3 + 1 = 7 ✓'))}</Label>
            <Caption y={312}>{pick(language, say('Bi puntu nahikoak dira zuzen bat zehazteko', 'Dos puntos bastan para determinar una recta', 'نقطتان تكفيان لتحديد خط'))}</Caption>
        </Figure>
    )
}

/* ---------- Hero ---------- */

export function FunctionsHeroArt() {
    return (
        <div className="functions-v2-hero-art" aria-hidden="true">
            <svg viewBox="0 0 420 270" role="presentation">
                <rect x="16" y="18" width="388" height="228" rx="26" fill="var(--card, #fffcf6)" stroke="var(--ink, #1d2733)" strokeWidth="2.4" />
                <g stroke="var(--line, #d6cfc2)" strokeWidth="1.2">
                    {[0, 1, 2, 3, 4, 5, 6].map((n) => <line key={`v${n}`} x1={72 + n * 46} y1="40" x2={72 + n * 46} y2="226" />)}
                    {[0, 1, 2, 3, 4].map((n) => <line key={`h${n}`} x1="50" y1={52 + n * 40} x2="372" y2={52 + n * 40} />)}
                </g>
                <line x1="50" y1="172" x2="380" y2="172" stroke="var(--ink, #1d2733)" strokeWidth="3" />
                <line x1="118" y1="232" x2="118" y2="34" stroke="var(--ink, #1d2733)" strokeWidth="3" />
                <path d="M118 172 L164 126 L210 80 L256 34" fill="none" stroke="var(--blue, #2f6fdb)" strokeWidth="5" strokeLinecap="round" />
                <path d="M70 212 L118 172 L164 192 L210 150 L256 128 L302 70 L348 92" fill="none" stroke="var(--coral, #c4432a)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                {[[210, 150], [302, 70]].map(([cx, cy]) => <circle key={cx} cx={cx} cy={cy} r="8" fill="var(--mustard, #e0a100)" stroke="var(--card, #fffcf6)" strokeWidth="3" />)}
                <rect x="244" y="190" width="132" height="42" rx="12" fill="var(--paper-deep, #f1ead9)" stroke="var(--ink, #1d2733)" strokeWidth="2" />
                <text x="310" y="218" textAnchor="middle" fontSize="22" fontWeight="700" fill="var(--ink, #1d2733)" fontStyle="italic">y = mx + n</text>
            </svg>
        </div>
    )
}
