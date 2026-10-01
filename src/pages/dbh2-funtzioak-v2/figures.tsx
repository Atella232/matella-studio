import type { ReactNode } from 'react'
import { pickText, type LocalizedText, type UnitLanguage } from '../../features/unit-v2/types'
import { Caption, Figure } from '../dbh2-zatikiak-prototype/figures'
import { localExtremes, storyGraphs, trendIntervals, type Point, type Trend } from './functions'
import { PlaneGrid, PlaneGuides, PlanePath, PlanePoint } from './plane'
import { planeMap, type PlaneBox } from './planeMap'

/* ==========================================================================
   Funtzioak · 2. DBH — lesson figures in the notebook style. The planes are
   drawn with the same PlaneGrid the laboratory uses, so what the student sees
   in a lesson looks like what they will manipulate afterwards.
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
const sample = (fn: (x: number) => number, from: number, to: number, step = 0.1): Point[] => {
    const points: Point[] = []
    for (let x = from; x <= to + 1e-9; x += step) points.push([Math.round(x * 1000) / 1000, fn(x)])
    return points
}

/** A plane drawn inside a figure: grid first, then whatever the caller adds */
function Frame({ box, cell, ox, oy, labelStep, xName, yName, children }: {
    box: PlaneBox
    cell: number
    ox: number
    oy: number
    labelStep?: number
    xName?: string
    yName?: string
    children?: (map: ReturnType<typeof planeMap>) => ReactNode
}) {
    const map = planeMap(box, cell, ox, oy)
    return (
        <g>
            <rect x={ox} y={oy} width={map.width} height={map.height} fill={CARD} />
            <PlaneGrid map={map} labelStep={labelStep} xName={xName} yName={yName} />
            {children?.(map)}
        </g>
    )
}

/* ---------- 1. Coordinates and quadrants ---------- */

export function CoordinateFigure({ language }: { language: UnitLanguage }) {
    const box: PlaneBox = { xMin: -4, xMax: 4, yMin: -3, yMax: 3 }
    const rows = [
        { quadrant: 'I', signs: '(+, +)', color: STAGE },
        { quadrant: 'II', signs: '(−, +)', color: SECOND },
        { quadrant: 'III', signs: '(−, −)', color: MUSTARD },
        { quadrant: 'IV', signs: '(+, −)', color: GREEN }
    ]
    return (
        <Figure height={318} label={pick(language, say('Ardatzak, koadranteak eta A(−2, 3) puntua', 'Ejes, cuadrantes y el punto A(−2, 3)', 'المحاور والأرباع والنقطة A(−2, 3)'))}>
            <Frame box={box} cell={38} ox={46} oy={36}>
                {(map) => (
                    <g>
                        {rows.map((row, index) => {
                            const [cx, cy] = [[2.6, 1.7], [-2.6, 1.7], [-2.6, -1.7], [2.6, -1.7]][index]
                            return <text key={row.quadrant} x={map.x(cx)} y={map.y(cy) + 6} textAnchor="middle" fontSize={20} fontWeight={700} fill={row.color} opacity={0.75}>{row.quadrant}</text>
                        })}
                        <PlaneGuides map={map} point={[-2, 3]} />
                        <PlanePoint map={map} point={[-2, 3]} name="A(−2, 3)" dx={10} dy={-4} />
                    </g>
                )}
            </Frame>
            <text x={420} y={64} fontSize={18} fontWeight={700} fill={INK}>{pick(language, say('Puntu bat = (x, y)', 'Un punto = (x, y)', 'النقطة = (x, y)'))}</text>
            <text x={420} y={92} fontSize={16} fill={MUTED}>{pick(language, say('lehen x (horizontala), gero y (bertikala)', 'primero x (horizontal), luego y (vertical)', 'أولًا x (أفقي) ثم y (رأسي)'))}</text>
            {rows.map((row, index) => (
                <g key={row.quadrant}>
                    <rect x={420} y={124 + index * 44} width={64} height={34} rx={8} fill={CARD} stroke={row.color} strokeWidth={2} />
                    <text x={452} y={147 + index * 44} textAnchor="middle" fontSize={16} fontWeight={700} fill={row.color}>{row.quadrant}</text>
                    <text x={504} y={147 + index * 44} fontSize={17} fill={INK}>{row.signs}</text>
                </g>
            ))}
            <Caption y={306}>{pick(language, say('Lehenengo X ardatzean, gero Y ardatzean', 'Primero se mide en el eje X y después en el Y', 'نقيس أولًا على محور X ثم على Y'))}</Caption>
        </Figure>
    )
}

/* ---------- 2. When a relation is a function ---------- */

export function FunctionTestFigure({ language }: { language: UnitLanguage }) {
    const input = (x: number, y: number, label: string, color: string) => (
        <g>
            <circle cx={x} cy={y} r={15} fill={CARD} stroke={color} strokeWidth={2.4} />
            <text x={x} y={y + 6} textAnchor="middle" fontSize={17} fontWeight={700} fill={INK}>{label}</text>
        </g>
    )
    const arrow = (x1: number, y1: number, x2: number, y2: number, color: string) => <line x1={x1 + 16} y1={y1} x2={x2 - 18} y2={y2} stroke={color} strokeWidth={2.4} markerEnd="url(#functions-arrow)" />
    return (
        <Figure height={250} label={pick(language, say('Funtzioa den erlazio bat eta ez den bat', 'Una relación que es función y otra que no', 'علاقة هي دالة وأخرى ليست دالة'))}>
            <defs>
                <marker id="functions-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill={INK} /></marker>
            </defs>
            <rect x={36} y={30} width={300} height={170} rx={18} fill={STAGE_TINT} opacity={0.55} />
            <rect x={384} y={30} width={300} height={170} rx={18} fill={MUSTARD_TINT} opacity={0.7} />
            <text x={186} y={54} textAnchor="middle" fontSize={17} fontWeight={700} fill={STAGE}>{pick(language, say('Funtzioa da ✓', 'Es función ✓', 'دالة ✓'))}</text>
            <text x={534} y={54} textAnchor="middle" fontSize={17} fontWeight={700} fill={SECOND}>{pick(language, say('Ez da funtzioa ✗', 'No es función ✗', 'ليست دالة ✗'))}</text>
            {[1, 2, 3].map((x, index) => <g key={`a${index}`}>{input(90, 90 + index * 38, String(x), STAGE)}</g>)}
            {[2, 5].map((y, index) => <g key={`o${index}`}>{input(282, 110 + index * 56, String(y), STAGE)}</g>)}
            {arrow(90, 90, 282, 110, STAGE)}
            {arrow(90, 128, 282, 110, STAGE)}
            {arrow(90, 166, 282, 166, STAGE)}
            {[[1], [1]].map((_, index) => <g key={`b${index}`}>{input(438, 110 + index * 38, '1', SECOND)}</g>)}
            {[2, 4, 6].map((y, index) => <g key={`c${index}`}>{input(630, 90 + index * 38, String(y), SECOND)}</g>)}
            {arrow(438, 110, 630, 90, SECOND)}
            {arrow(438, 148, 630, 128, SECOND)}
            <text x={186} y={218} textAnchor="middle" fontSize={16} fill={INK}>{pick(language, say('x bakoitzak y bakar bat · y errepika daiteke', 'cada x tiene una sola y · una y puede repetirse', 'لكل x قيمة y واحدة · يمكن تكرار y'))}</text>
            <text x={534} y={218} textAnchor="middle" fontSize={16} fill={INK}>{pick(language, say('1 sarrerak bi irteera ditu', 'la entrada 1 tiene dos salidas', 'للمدخل 1 مخرجان'))}</text>
            <Caption y={242}>{pick(language, say('Sarrera bakoitzak irteera bakarra', 'Cada entrada, una única salida', 'لكل مدخل مخرج واحد'))}</Caption>
        </Figure>
    )
}

/* ---------- 3. Independent and dependent variables ---------- */

export function VariablesFigure({ language }: { language: UnitLanguage }) {
    return (
        <Figure height={230} label={pick(language, say('Aldagai askea sartzen da, menpekoa ateratzen da', 'Entra la variable independiente y sale la dependiente', 'يدخل المتغير المستقل ويخرج التابع'))}>
            <rect x={40} y={60} width={170} height={90} rx={18} fill={STAGE_TINT} stroke={INK} strokeWidth={2} />
            <text x={125} y={94} textAnchor="middle" fontSize={26} fontWeight={700} fontStyle="italic" fill={STAGE}>x</text>
            <text x={125} y={124} textAnchor="middle" fontSize={16} fontWeight={700} fill={INK}>{pick(language, say('aldagai askea', 'independiente', 'مستقل'))}</text>
            <rect x={275} y={50} width={170} height={110} rx={22} fill={CARD} stroke={INK} strokeWidth={2.4} />
            <text x={360} y={95} textAnchor="middle" fontSize={18} fontWeight={700} fill={INK}>{pick(language, say('arau bat', 'una regla', 'قاعدة'))}</text>
            <text x={360} y={126} textAnchor="middle" fontSize={20} fontWeight={700} fill={SECOND}>y = 3x</text>
            <rect x={510} y={60} width={170} height={90} rx={18} fill={MUSTARD_TINT} stroke={INK} strokeWidth={2} />
            <text x={595} y={94} textAnchor="middle" fontSize={26} fontWeight={700} fontStyle="italic" fill={SECOND}>y</text>
            <text x={595} y={124} textAnchor="middle" fontSize={16} fontWeight={700} fill={INK}>{pick(language, say('aldagai menpekoa', 'dependiente', 'تابع'))}</text>
            <path d="M212 105 H272 M447 105 H507" stroke={INK} strokeWidth={3} markerEnd="url(#functions-arrow2)" />
            <defs><marker id="functions-arrow2" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill={INK} /></marker></defs>
            <text x={125} y={182} textAnchor="middle" fontSize={16} fill={MUTED}>{pick(language, say('aukeratzen dugu: kiloak', 'lo elegimos: kilos', 'نختاره: الكيلوغرامات'))}</text>
            <text x={595} y={182} textAnchor="middle" fontSize={16} fill={MUTED}>{pick(language, say('x-ren araberakoa: prezioa', 'depende de x: el precio', 'يعتمد على x: السعر'))}</text>
            <Caption y={218}>{pick(language, say('Zer sartzen dugu? Zer ateratzen da?', '¿Qué introducimos? ¿Qué sale?', 'ماذا ندخل؟ وماذا يخرج؟'))}</Caption>
        </Figure>
    )
}

/* ---------- 4. A function in a table ---------- */

export function TableFigure({ language }: { language: UnitLanguage }) {
    const xs = [-1, 0, 1, 2, 3]
    const box: PlaneBox = { xMin: -2, xMax: 4, yMin: -2, yMax: 8 }
    return (
        <Figure height={290} label={pick(language, say('y = 2x + 1 funtzioaren balio-taula eta bere puntuak', 'Tabla de valores de y = 2x + 1 y sus puntos', 'جدول قيم y = 2x + 1 ونقاطه'))}>
            <text x={190} y={44} textAnchor="middle" fontSize={22} fontWeight={700} fill={STAGE}>y = 2x + 1</text>
            {['x', 'y'].map((name, row) => (
                <g key={name}>
                    <rect x={40} y={64 + row * 48} width={48} height={42} rx={6} fill={row === 0 ? STAGE_TINT : MUSTARD_TINT} stroke={INK} strokeWidth={1.6} />
                    <text x={64} y={92 + row * 48} textAnchor="middle" fontSize={20} fontWeight={700} fontStyle="italic" fill={INK}>{name}</text>
                    {xs.map((x, index) => (
                        <g key={index}>
                            <rect x={94 + index * 56} y={64 + row * 48} width={52} height={42} rx={6} fill={CARD} stroke={INK} strokeWidth={1.4} />
                            <text x={120 + index * 56} y={92 + row * 48} textAnchor="middle" fontSize={18} fill={INK}>{row === 0 ? (x < 0 ? `−${-x}` : x) : (2 * x + 1 < 0 ? `−${-(2 * x + 1)}` : 2 * x + 1)}</text>
                        </g>
                    ))}
                </g>
            ))}
            {xs.map((x, index) => <text key={index} x={120 + index * 56} y={178} textAnchor="middle" fontSize={16} fill={SECOND} fontWeight={700}>{`(${x < 0 ? '−' : ''}${Math.abs(x)}, ${2 * x + 1 < 0 ? '−' : ''}${Math.abs(2 * x + 1)})`}</text>)}
            <text x={190} y={222} textAnchor="middle" fontSize={16} fill={MUTED}>{pick(language, say('x bakoitzeko: 2 · x + 1', 'para cada x: 2 · x + 1', 'لكل x: 2 · x + 1'))}</text>
            <Frame box={box} cell={21} ox={440} oy={40} labelStep={2}>
                {(map) => (
                    <g>
                        <PlanePath map={map} points={[[-1, -1], [3, 7]]} color={SECOND} width={2.4} dashed />
                        {xs.map((x) => <PlanePoint key={x} map={map} point={[x, 2 * x + 1]} color={STAGE} radius={5} />)}
                    </g>
                )}
            </Frame>
            <Caption y={282}>{pick(language, say('Taulako bikote bakoitza planoko puntu bat da', 'Cada pareja de la tabla es un punto del plano', 'كل زوج في الجدول نقطة في المستوى'))}</Caption>
        </Figure>
    )
}

/* ---------- 5. Formula and f(x) ---------- */

export function FormulaFigure({ language }: { language: UnitLanguage }) {
    return (
        <Figure height={240} label={pick(language, say('f(x) = x² − 3 funtzioan, f(−2) = 1', 'En f(x) = x² − 3, f(−2) = 1', 'في f(x) = x² − 3 يكون f(−2) = 1'))}>
            <text x={360} y={42} textAnchor="middle" fontSize={24} fontWeight={700} fill={STAGE}>f(x) = x² − 3</text>
            {[
                { x: 40, title: say('Ordezkatu', 'Sustituye', 'عوّض'), body: 'f(−2) = (−2)² − 3', color: STAGE_TINT },
                { x: 255, title: say('Berretura', 'Potencia', 'القوة'), body: '= 4 − 3', color: MUSTARD_TINT },
                { x: 470, title: say('Emaitza', 'Resultado', 'النتيجة'), body: '= 1', color: STAGE_TINT }
            ].map((box, index) => (
                <g key={index}>
                    <rect x={box.x} y={70} width={200} height={90} rx={16} fill={box.color} stroke={INK} strokeWidth={2} />
                    <text x={box.x + 100} y={96} textAnchor="middle" fontSize={16} fontWeight={700} fill={MUTED}>{pick(language, box.title)}</text>
                    <text x={box.x + 100} y={136} textAnchor="middle" fontSize={21} fontWeight={700} fill={INK}>{box.body}</text>
                    {index < 2 && <path d={`M${box.x + 204} 115 h46`} stroke={INK} strokeWidth={3} markerEnd="url(#functions-arrow2)" />}
                </g>
            ))}
            <text x={360} y={192} textAnchor="middle" fontSize={16} fill={INK}>{pick(language, say('f(−2) = 1 esan nahi du: x = −2 denean, y = 1  →  (−2, 1) puntua', 'f(−2) = 1 significa: cuando x = −2, y = 1  →  el punto (−2, 1)', 'f(−2) = 1 تعني: عندما x = −2 تكون y = 1 ← النقطة (−2, 1)'))}</text>
            <Caption y={228}>{pick(language, say('Parentesiek zeinua zaintzen dute: (−2)² = 4', 'Los paréntesis cuidan el signo: (−2)² = 4', 'تحافظ الأقواس على الإشارة: (−2)² = 4'))}</Caption>
            <defs><marker id="functions-arrow2" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill={INK} /></marker></defs>
        </Figure>
    )
}

/* ---------- 6. Plotting a graph ---------- */

export function PlotFigure({ language }: { language: UnitLanguage }) {
    const box: PlaneBox = { xMin: -3, xMax: 3, yMin: -3, yMax: 3 }
    const pts: Point[] = [[-2, 2], [-1, -1], [0, -2], [1, -1], [2, 2]]
    return (
        <Figure height={270} label={pick(language, say('y = x² − 2 funtzioaren puntuak eta kurba', 'Puntos y curva de y = x² − 2', 'نقاط ومنحنى y = x² − 2'))}>
            <Frame box={box} cell={34} ox={50} oy={34}>
                {(map) => (
                    <g>
                        <PlanePath map={map} points={sample((x) => x * x - 2, -2.3, 2.3)} color={SECOND} width={3} />
                        {pts.map((point) => <PlanePoint key={point[0]} map={map} point={point} color={STAGE} radius={5.5} />)}
                    </g>
                )}
            </Frame>
            <text x={360} y={52} fontSize={20} fontWeight={700} fill={STAGE}>y = x² − 2</text>
            {[
                say('1. Taula osatu', '1. Completa la tabla', '1. أكمل الجدول'),
                say('2. Puntuak kokatu', '2. Sitúa los puntos', '2. ضع النقاط'),
                say('3. Puntuak batu, pausoz pauso', '3. Une los puntos con trazo continuo', '3. صِل النقاط بخط متصل')
            ].map((text, index) => <text key={index} x={360} y={92 + index * 32} fontSize={16} fill={INK}>{pick(language, text)}</text>)}
            <text x={360} y={206} fontSize={16} fill={MUTED}>x = −2, −1, 0, 1, 2  →  y = 2, −1, −2, −1, 2</text>
            <Caption y={260}>{pick(language, say('Puntu gehiago, kurba zehatzagoa', 'Cuantos más puntos, más precisa es la curva', 'كلما زادت النقاط كان المنحنى أدق'))}</Caption>
        </Figure>
    )
}

/* ---------- 7. Continuous and discontinuous graphs ---------- */

export function ContinuityFigure({ language }: { language: UnitLanguage }) {
    const box: PlaneBox = { xMin: 0, xMax: 6, yMin: 0, yMax: 5 }
    const curve = sample((x) => 1.2 + 2.2 * Math.sin(x / 1.6) + 0.2 * x, 0, 6, 0.1).map(([x, y]) => [x, Math.max(0.2, Math.min(4.8, y))] as Point)
    return (
        <Figure height={290} label={pick(language, say('Grafiko jarraitua eta grafiko etena', 'Una gráfica continua y otra discontinua', 'رسم متصل وآخر منفصل'))}>
            <Frame box={box} cell={40} ox={34} oy={34} labelStep={1}>
                {(map) => <PlanePath map={map} points={curve} color={STAGE} width={3.6} />}
            </Frame>
            <Frame box={box} cell={40} ox={394} oy={34} labelStep={1}>
                {(map) => (
                    <g>
                        {([[1, 1], [2, 3], [3, 2], [4, 4], [5, 2]] as Point[]).map((point) => <PlanePoint key={point[0]} map={map} point={point} color={SECOND} radius={6} />)}
                    </g>
                )}
            </Frame>
            <text x={154} y={278} textAnchor="middle" fontSize={17} fontWeight={700} fill={STAGE}>{pick(language, say('jarraitua', 'continua', 'متصلة'))}</text>
            <text x={514} y={278} textAnchor="middle" fontSize={17} fontWeight={700} fill={SECOND}>{pick(language, say('etena', 'discontinua', 'منفصلة'))}</text>
            <text x={154} y={20} textAnchor="middle" fontSize={16} fill={MUTED}>{pick(language, say('tenperatura eta ordua', 'temperatura y hora', 'الحرارة والساعة'))}</text>
            <text x={514} y={20} textAnchor="middle" fontSize={16} fill={MUTED}>{pick(language, say('eguneko salmentak', 'ventas de cada día', 'مبيعات كل يوم'))}</text>
        </Figure>
    )
}

/* ---------- 8. Reading a value ---------- */

export function ReadFigure({ language }: { language: UnitLanguage }) {
    const graph = storyGraphs[0]
    const box: PlaneBox = { xMin: 0, xMax: 8, yMin: 0, yMax: 13 }
    return (
        <Figure height={366} label={pick(language, say('Tenperatura-grafikoa: x = 4 denean y = 8', 'Gráfica de la temperatura: cuando x = 4, y = 8', 'رسم الحرارة: عندما x = 4 تكون y = 8'))}>
            <Frame box={box} cell={21} ox={60} oy={40} labelStep={2}>
                {(map) => (
                    <g>
                        <PlanePath map={map} points={graph.points} color={STAGE} width={3.6} />
                        <PlaneGuides map={map} point={[4, 8]} />
                        <PlanePoint map={map} point={[4, 8]} name="(4, 8)" dx={10} dy={-6} />
                    </g>
                )}
            </Frame>
            <text x={60} y={22} fontSize={16} fill={MUTED}>{pick(language, graph.yLabel)}</text>
            <text x={240} y={358} fontSize={16} fill={MUTED}>{pick(language, graph.xLabel)}</text>
            {[
                say('1. Bilatu x = 4 ardatz horizontalean', '1. Busca x = 4 en el eje horizontal', '1. ابحث عن x = 4 على المحور الأفقي'),
                say('2. Igo kurbaraino', '2. Sube hasta la curva', '2. اصعد حتى المنحنى'),
                say('3. Irakurri y ardatzean: 8', '3. Lee en el eje vertical: 8', '3. اقرأ على المحور الرأسي: 8')
            ].map((text, index) => <text key={index} x={430} y={90 + index * 36} fontSize={16} fill={INK}>{pick(language, text)}</text>)}
            <text x={430} y={214} fontSize={19} fontWeight={700} fill={SECOND}>f(4) = 8 °C</text>
        </Figure>
    )
}

/* ---------- 9. Intercepts with the axes ---------- */

export function InterceptsFigure({ language }: { language: UnitLanguage }) {
    const graph = storyGraphs[4]
    const box: PlaneBox = { xMin: -4, xMax: 5, yMin: -3, yMax: 4 }
    return (
        <Figure height={300} label={pick(language, say('Funtzio baten ebakidurak ardatzekin', 'Puntos de corte de una función con los ejes', 'نقاط تقاطع دالة مع المحاور'))}>
            <Frame box={box} cell={32} ox={50} oy={32}>
                {(map) => (
                    <g>
                        <PlanePath map={map} points={graph.points} color={STAGE} width={3.4} />
                        {([[-3, 0], [1, 0], [5, 0]] as Point[]).map((point) => <PlanePoint key={point[0]} map={map} point={point} color={SECOND} radius={6} />)}
                        <PlanePoint map={map} point={[0, 2]} color={MUSTARD} radius={6.5} name="(0, 2)" dx={10} dy={-4} />
                    </g>
                )}
            </Frame>
            <rect x={400} y={50} width={270} height={64} rx={14} fill={MUSTARD_TINT} stroke={INK} strokeWidth={1.8} />
            <text x={420} y={77} fontSize={16} fontWeight={700} fill={INK}>{pick(language, say('Y ardatzarekin: x = 0', 'Con el eje Y: x = 0', 'مع محور Y: x = 0'))}</text>
            <text x={420} y={102} fontSize={16} fill={INK}>{pick(language, say('bat gehienez → (0, 2)', 'como mucho uno → (0, 2)', 'نقطة على الأكثر ← (0, 2)'))}</text>
            <rect x={400} y={132} width={270} height={64} rx={14} fill={STAGE_TINT} stroke={INK} strokeWidth={1.8} />
            <text x={420} y={159} fontSize={16} fontWeight={700} fill={INK}>{pick(language, say('X ardatzarekin: y = 0', 'Con el eje X: y = 0', 'مع محور X: y = 0'))}</text>
            <text x={420} y={184} fontSize={16} fill={INK}>(−3, 0), (1, 0), (5, 0)</text>
            <Caption y={290}>{pick(language, say('Ebakidura bat: koordenatuetako bat 0 da', 'En un punto de corte, una coordenada vale 0', 'في نقطة التقاطع تساوي إحدى الإحداثيات صفرًا'))}</Caption>
        </Figure>
    )
}

/* ---------- 10. Increasing, decreasing, constant ---------- */

export function VariationFigure({ language }: { language: UnitLanguage }) {
    const graph = storyGraphs[1]
    const box: PlaneBox = { xMin: 0, xMax: 8, yMin: 0, yMax: 7 }
    const intervals = trendIntervals(graph.points)
    return (
        <Figure height={312} label={pick(language, say('Hegazkinaren altuera: gorakorra, konstantea eta beherakorra', 'Altura de la avioneta: creciente, constante y decreciente', 'ارتفاع الطائرة: متزايد وثابت ومتناقص'))}>
            <Frame box={box} cell={32} ox={46} oy={30} labelStep={1}>
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
                    <rect x={348} y={56 + index * 52} width={26} height={26} rx={7} fill={trendColor[row.trend]} />
                    <text x={386} y={75 + index * 52} fontSize={16} fill={INK}>{pick(language, row.text)}</text>
                </g>
            ))}
            <text x={348} y={226} fontSize={16} fill={MUTED}>{pick(language, say('Tarteak: (0, 2) gorakorra · (2, 4) konstantea', 'Tramos: (0, 2) creciente · (2, 4) constante', 'الفترات: (0، 2) متزايدة · (2، 4) ثابتة'))}</text>
            <text x={348} y={246} fontSize={16} fill={MUTED}>{pick(language, say('(4, 5) gorakorra · (5, 8) beherakorra', '(4, 5) creciente · (5, 8) decreciente', '(4، 5) متزايدة · (5، 8) متناقصة'))}</text>
            <Caption y={304}>{pick(language, say('Irakurri ezkerretik eskuinera: x-ren tarteak', 'Lee de izquierda a derecha: intervalos de x', 'اقرأ من اليسار إلى اليمين: فترات x'))}</Caption>
        </Figure>
    )
}

/* ---------- 11. Maxima and minima ---------- */

export function ExtremesFigure({ language }: { language: UnitLanguage }) {
    const graph = storyGraphs[2]
    const box: PlaneBox = { xMin: 0, xMax: 8, yMin: 0, yMax: 9 }
    const { maxima, minima } = localExtremes(graph.points)
    return (
        <Figure height={324} label={pick(language, say('Abiaduraren maximoak eta minimoa', 'Máximos y mínimo de la velocidad', 'القيم العظمى والصغرى للسرعة'))}>
            <Frame box={box} cell={26} ox={46} oy={34} labelStep={1}>
                {(map) => (
                    <g>
                        <PlanePath map={map} points={graph.points} color={STAGE} width={3.8} />
                        {maxima.map((point) => <PlanePoint key={`M${point[0]}`} map={map} point={point} color={SECOND} radius={6.5} name={`(${point[0]}, ${point[1]})`} dx={0} dy={-12} anchor="middle" />)}
                        {minima.map((point) => <PlanePoint key={`m${point[0]}`} map={map} point={point} color={GREEN} radius={6.5} name={`(${point[0]}, ${point[1]})`} dx={0} dy={22} anchor="middle" />)}
                    </g>
                )}
            </Frame>
            <circle cx={366} cy={78} r={8} fill={SECOND} />
            <text x={382} y={83} fontSize={16} fill={INK}>{pick(language, say('maximoak: (3, 8) eta (7, 7)', 'máximos: (3, 8) y (7, 7)', 'قيم عظمى: (3، 8) و(7، 7)'))}</text>
            <circle cx={366} cy={116} r={8} fill={GREEN} />
            <text x={382} y={121} fontSize={16} fill={INK}>{pick(language, say('minimoa: (5, 2)', 'mínimo: (5, 2)', 'قيمة صغرى: (5، 2)'))}</text>
            <text x={366} y={168} fontSize={16} fill={MUTED}>{pick(language, say('Maximoa: gorakorra → beherakorra', 'Máximo: de creciente a decreciente', 'العظمى: من تزايد إلى تناقص'))}</text>
            <text x={366} y={192} fontSize={16} fill={MUTED}>{pick(language, say('Minimoa: beherakorra → gorakorra', 'Mínimo: de decreciente a creciente', 'الصغرى: من تناقص إلى تزايد'))}</text>
            <text x={366} y={222} fontSize={16} fontWeight={700} fill={INK}>{pick(language, say('Maximo absolutua: (3, 8)', 'Máximo absoluto: (3, 8)', 'العظمى المطلقة: (3، 8)'))}</text>
            <Caption y={316}>{pick(language, say('Muturrak aldaketa-puntuetan daude', 'Los extremos están donde cambia la tendencia', 'تقع القيم القصوى حيث يتغير الاتجاه'))}</Caption>
        </Figure>
    )
}

/* ---------- 12. Direct proportionality ---------- */

export function ProportionalFigure({ language }: { language: UnitLanguage }) {
    const box: PlaneBox = { xMin: -1, xMax: 5, yMin: -1, yMax: 9 }
    const rows = [[1, 2], [2, 4], [3, 6], [4, 8]]
    return (
        <Figure height={308} label={pick(language, say('y = 2x zuzena jatorritik pasatzen da', 'La recta y = 2x pasa por el origen', 'الخط y = 2x يمر بنقطة الأصل'))}>
            <Frame box={box} cell={24} ox={44} oy={30} labelStep={1}>
                {(map) => (
                    <g>
                        <PlanePath map={map} points={[[-0.5, -1], [4.5, 9]]} color={STAGE} width={3.6} />
                        {rows.map(([x, y]) => <PlanePoint key={x} map={map} point={[x, y]} color={SECOND} radius={5} />)}
                        <PlanePoint map={map} point={[0, 0]} color={MUSTARD} radius={6.5} name="(0, 0)" dx={10} dy={20} />
                    </g>
                )}
            </Frame>
            <text x={360} y={52} fontSize={24} fontWeight={700} fill={STAGE}>y = 2x</text>
            {['x', 'y'].map((name, row) => (
                <g key={name}>
                    <rect x={360} y={74 + row * 40} width={40} height={34} rx={6} fill={row === 0 ? STAGE_TINT : MUSTARD_TINT} stroke={INK} strokeWidth={1.4} />
                    <text x={380} y={97 + row * 40} textAnchor="middle" fontSize={17} fontWeight={700} fontStyle="italic" fill={INK}>{name}</text>
                    {rows.map((pair, index) => (
                        <g key={index}>
                            <rect x={406 + index * 46} y={74 + row * 40} width={42} height={34} rx={6} fill={CARD} stroke={INK} strokeWidth={1.2} />
                            <text x={427 + index * 46} y={97 + row * 40} textAnchor="middle" fontSize={16} fill={INK}>{pair[row]}</text>
                        </g>
                    ))}
                </g>
            ))}
            <text x={360} y={176} fontSize={16} fill={INK}>{pick(language, say('y ÷ x = 2 beti  →  m = 2', 'y ÷ x = 2 siempre  →  m = 2', 'y ÷ x = 2 دائمًا ← m = 2'))}</text>
            <text x={360} y={204} fontSize={16} fill={INK}>{pick(language, say('x = 0 → y = 0: jatorritik pasatzen da', 'x = 0 → y = 0: pasa por el origen', 'x = 0 ← y = 0: يمر بنقطة الأصل'))}</text>
            <Caption y={298}>{pick(language, say('Proportzionaltasun zuzena: y = m · x', 'Proporcionalidad directa: y = m · x', 'التناسب الطردي: y = m · x'))}</Caption>
        </Figure>
    )
}

/* ---------- 13. Slope between two points ---------- */

export function SlopeFigure({ language }: { language: UnitLanguage }) {
    const box: PlaneBox = { xMin: 0, xMax: 6, yMin: 0, yMax: 9 }
    return (
        <Figure height={300} label={pick(language, say('A(1, 2) eta B(4, 8) puntuen arteko malda', 'Pendiente entre A(1, 2) y B(4, 8)', 'الميل بين A(1, 2) وB(4, 8)'))}>
            <Frame box={box} cell={24} ox={40} oy={28} labelStep={1}>
                {(map) => (
                    <g>
                        <PlanePath map={map} points={[[0.3, 0.2], [4.4, 8.4]]} color={STAGE} width={3.6} />
                        <PlanePath map={map} points={[[1, 2], [4, 2], [4, 8]]} color={SECOND} width={2.6} dashed />
                        <text x={map.x(2.5)} y={map.y(2) + 20} textAnchor="middle" fontSize={16} fontWeight={700} fill={SECOND}>Δx = 3</text>
                        <text x={map.x(4) + 8} y={map.y(5)} fontSize={16} fontWeight={700} fill={SECOND}>Δy = 6</text>
                        <PlanePoint map={map} point={[1, 2]} color={INK} radius={5.5} name="A(1, 2)" dx={-8} dy={-10} anchor="end" />
                        <PlanePoint map={map} point={[4, 8]} color={INK} radius={5.5} name="B(4, 8)" dx={-10} dy={-6} anchor="end" />
                    </g>
                )}
            </Frame>
            <text x={360} y={64} fontSize={17} fontWeight={700} fill={INK}>{pick(language, say('Malda = y-ren aldaketa / x-ren aldaketa', 'Pendiente = cambio de y / cambio de x', 'الميل = تغير y ÷ تغير x'))}</text>
            <text x={360} y={104} fontSize={22} fontWeight={700} fill={STAGE}>m = (y₂ − y₁) / (x₂ − x₁)</text>
            <text x={360} y={146} fontSize={20} fill={INK}>m = (8 − 2) / (4 − 1)</text>
            <text x={360} y={184} fontSize={22} fontWeight={700} fill={SECOND}>m = 6 / 3 = 2</text>
            <text x={360} y={216} fontSize={16} fill={MUTED}>{pick(language, say('x 1 unitate eskuinera → y 2 unitate gora', 'una unidad a la derecha → dos hacia arriba', 'وحدة إلى اليمين ← وحدتان إلى أعلى'))}</text>
            <Caption y={292}>{pick(language, say('Malda: zuzenaren aldapa', 'La pendiente mide la inclinación de la recta', 'الميل يقيس انحدار الخط'))}</Caption>
        </Figure>
    )
}

/* ---------- 14. Sign and size of the slope ---------- */

export function SlopeSignsFigure({ language }: { language: UnitLanguage }) {
    const box: PlaneBox = { xMin: -2, xMax: 2, yMin: -2, yMax: 2 }
    const cases: Array<{ x: number; m: number; line: Array<[number, number]>; color: string; text: LocalizedText }> = [
        { x: 24, m: 1, line: [[-1.8, -1.8], [1.8, 1.8]], color: STAGE, text: say('m > 0: gorakorra', 'm > 0: creciente', 'm > 0: متزايدة') },
        { x: 196, m: -1, line: [[-1.8, 1.8], [1.8, -1.8]], color: SECOND, text: say('m < 0: beherakorra', 'm < 0: decreciente', 'm < 0: متناقصة') },
        { x: 368, m: 0, line: [[-2, 1], [2, 1]], color: MUSTARD, text: say('m = 0: horizontala', 'm = 0: horizontal', 'm = 0: أفقي') },
        { x: 540, m: 3, line: [[-0.7, -2], [0.7, 2]], color: GREEN, text: say('|m| handia: aldapatsua', '|m| grande: muy inclinada', '|m| كبير: شديد الانحدار') }
    ]
    return (
        <Figure height={250} label={pick(language, say('Maldaren zeinua eta tamaina', 'El signo y el tamaño de la pendiente', 'إشارة الميل وحجمه'))}>
            {cases.map((item) => (
                <g key={item.x}>
                    <Frame box={box} cell={30} ox={item.x + 20} oy={26} labelStep={4}>
                        {(map) => <PlanePath map={map} points={item.line} color={item.color} width={4} />}
                    </Frame>
                    <text x={item.x + 80} y={222} textAnchor="middle" fontSize={16} fontWeight={700} fill={item.color}>{pick(language, item.text)}</text>
                </g>
            ))}
            <Caption y={244}>{pick(language, say('Zenbat eta |m| handiagoa, orduan eta aldapatsuagoa', 'Cuanto mayor es |m|, más inclinada es la recta', 'كلما كبر |m| زاد انحدار الخط'))}</Caption>
        </Figure>
    )
}

/* ---------- 15. The affine function y = mx + n ---------- */

export function AffineFigure({ language }: { language: UnitLanguage }) {
    const box: PlaneBox = { xMin: -3, xMax: 4, yMin: -4, yMax: 6 }
    return (
        <Figure height={290} label={pick(language, say('y = 2x − 1 eta y = 2x zuzenak', 'Las rectas y = 2x − 1 e y = 2x', 'الخطان y = 2x − 1 وy = 2x'))}>
            <Frame box={box} cell={24} ox={42} oy={26} labelStep={1}>
                {(map) => (
                    <g>
                        <PlanePath map={map} points={[[-2.5, -5], [3.5, 7]]} color={MUSTARD} width={3} dashed />
                        <PlanePath map={map} points={[[-1.7, -4.4], [3.4, 5.8]]} color={STAGE} width={3.8} />
                        <PlanePoint map={map} point={[0, -1]} color={SECOND} radius={6.5} name="(0, −1)" dx={10} dy={20} />
                        <PlanePoint map={map} point={[1, 1]} color={SECOND} radius={5.5} name="(1, 1)" dx={10} dy={4} />
                        <path d={`M${map.x(1)} ${map.y(-1)} H${map.x(1)} V${map.y(1)} M${map.x(0)} ${map.y(-1)} H${map.x(1)}`} stroke={SECOND} strokeWidth={2} strokeDasharray="4 4" fill="none" />
                    </g>
                )}
            </Frame>
            <text x={366} y={56} fontSize={24} fontWeight={700} fill={STAGE}>y = mx + n</text>
            <text x={366} y={92} fontSize={17} fill={INK}>{pick(language, say('m = malda (aldapa)', 'm = pendiente', 'm = الميل'))}</text>
            <text x={366} y={120} fontSize={17} fill={INK}>{pick(language, say('n = Y ardatzeko ebakidura: (0, n)', 'n = ordenada en el origen: (0, n)', 'n = تقاطع محور Y: (0, n)'))}</text>
            <text x={366} y={166} fontSize={20} fontWeight={700} fill={SECOND}>y = 2x − 1  →  m = 2, n = −1</text>
            <text x={366} y={196} fontSize={16} fill={MUTED}>{pick(language, say('Hasi (0, −1)-n: eskuinera 1, gora 2', 'Empieza en (0, −1): 1 a la derecha, 2 arriba', 'ابدأ من (0, −1): وحدة يمينًا ووحدتان إلى أعلى'))}</text>
            <text x={366} y={222} fontSize={16} fill={MUSTARD} fontWeight={700}>{pick(language, say('Marra etena: y = 2x (n = 0, jatorritik)', 'Trazo discontinuo: y = 2x (n = 0, por el origen)', 'الخط المتقطع: y = 2x (n = 0 يمر بالأصل)'))}</text>
            <Caption y={282}>{pick(language, say('m-k aldapa finkatzen du, n-k hasierako altuera', 'm fija la inclinación y n la altura inicial', 'يحدد m الانحدار ويحدد n الارتفاع الابتدائي'))}</Caption>
        </Figure>
    )
}

/* ---------- 16. Constant functions ---------- */

export function ConstantFigure({ language }: { language: UnitLanguage }) {
    const box: PlaneBox = { xMin: -4, xMax: 4, yMin: -2, yMax: 5 }
    return (
        <Figure height={284} label={pick(language, say('y = 3, y = 0 eta x = 2 zuzenak', 'Las rectas y = 3, y = 0 y x = 2', 'الخطوط y = 3 وy = 0 وx = 2'))}>
            <Frame box={box} cell={32} ox={44} oy={32} labelStep={1}>
                {(map) => (
                    <g>
                        <PlanePath map={map} points={[[-4, 3], [4, 3]]} color={STAGE} width={4} />
                        <PlanePath map={map} points={[[-4, 0], [4, 0]]} color={SECOND} width={4} />
                        <PlanePath map={map} points={[[2, -2], [2, 5]]} color={MUTED} width={3} dashed />
                        <text x={map.x(-3.8)} y={map.y(3) - 8} fontSize={16} fontWeight={700} fill={STAGE}>y = 3</text>
                        <text x={map.x(-3.8)} y={map.y(0) - 8} fontSize={16} fontWeight={700} fill={SECOND}>y = 0</text>
                        <text x={map.x(2) + 8} y={map.y(4.4)} fontSize={16} fontWeight={700} fill={MUTED}>x = 2</text>
                    </g>
                )}
            </Frame>
            <text x={390} y={62} fontSize={17} fontWeight={700} fill={STAGE}>{pick(language, say('y = k: funtzio konstantea', 'y = k: función constante', 'y = k: دالة ثابتة'))}</text>
            <text x={390} y={90} fontSize={16} fill={INK}>{pick(language, say('x edozein dela, y beti k', 'sea cual sea x, y siempre vale k', 'مهما كانت x تبقى y تساوي k'))}</text>
            <text x={390} y={128} fontSize={16} fill={INK}>{pick(language, say('Horizontala: m = 0', 'Es horizontal: m = 0', 'أفقي: m = 0'))}</text>
            <text x={390} y={156} fontSize={16} fill={INK}>{pick(language, say('y = 0 → X ardatza bera', 'y = 0 → el propio eje X', 'y = 0 ← محور X نفسه'))}</text>
            <text x={390} y={196} fontSize={16} fontWeight={700} fill={MUTED}>{pick(language, say('x = 2 (bertikala) ez da funtzioa:', 'x = 2 (vertical) no es función:', 'x = 2 (رأسي) ليس دالة:'))}</text>
            <text x={390} y={220} fontSize={16} fill={MUTED}>{pick(language, say('x berak y asko ditu', 'una misma x tiene infinitas y', 'x واحدة لها عدد لا نهائي من y'))}</text>
            <Caption y={276}>{pick(language, say('Zuzen horizontala funtzioa da; bertikala ez', 'La recta horizontal es función; la vertical, no', 'الخط الأفقي دالة والرأسي ليس دالة'))}</Caption>
        </Figure>
    )
}

/* ---------- 17. Finding the equation of a line ---------- */

export function LineEquationFigure({ language }: { language: UnitLanguage }) {
    const box: PlaneBox = { xMin: -1, xMax: 5, yMin: -2, yMax: 8 }
    return (
        <Figure height={290} label={pick(language, say('(0, 1) eta (3, 7) puntuetatik pasatzen den zuzena', 'La recta que pasa por (0, 1) y (3, 7)', 'الخط المار بالنقطتين (0, 1) و(3, 7)'))}>
            <Frame box={box} cell={24} ox={42} oy={28} labelStep={1}>
                {(map) => (
                    <g>
                        <PlanePath map={map} points={[[-0.8, -0.6], [3.6, 8.2]]} color={STAGE} width={3.6} />
                        <PlanePoint map={map} point={[0, 1]} color={SECOND} radius={6} name="(0, 1)" dx={10} dy={20} />
                        <PlanePoint map={map} point={[3, 7]} color={SECOND} radius={6} name="(3, 7)" dx={10} dy={-4} />
                    </g>
                )}
            </Frame>
            {[
                { y: 56, text: say('1. n: x = 0 denean y = 1  →  n = 1', '1. n: cuando x = 0, y = 1  →  n = 1', '1. n: عندما x = 0 تكون y = 1 ← n = 1') },
                { y: 98, text: say('2. m: (7 − 1) / (3 − 0) = 6 / 3  →  m = 2', '2. m: (7 − 1) / (3 − 0) = 6 / 3  →  m = 2', '2. m: (7 − 1) / (3 − 0) = 6 / 3 ← m = 2') },
                { y: 140, text: say('3. Ordezkatu y = mx + n-n', '3. Sustituye en y = mx + n', '3. عوّض في y = mx + n') }
            ].map((row) => <text key={row.y} x={360} y={row.y} fontSize={16} fill={INK}>{pick(language, row.text)}</text>)}
            <text x={360} y={186} fontSize={24} fontWeight={700} fill={SECOND}>y = 2x + 1</text>
            <text x={360} y={216} fontSize={16} fill={MUTED}>{pick(language, say('Egiaztatu: x = 3 → y = 2 · 3 + 1 = 7 ✓', 'Comprueba: x = 3 → y = 2 · 3 + 1 = 7 ✓', 'تحقق: x = 3 ← y = 2 · 3 + 1 = 7 ✓'))}</text>
            <Caption y={282}>{pick(language, say('Bi puntu nahikoak dira zuzen bat zehazteko', 'Dos puntos bastan para determinar una recta', 'نقطتان تكفيان لتحديد خط'))}</Caption>
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
