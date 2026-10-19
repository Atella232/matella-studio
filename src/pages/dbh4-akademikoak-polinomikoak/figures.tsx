import type { ReactNode } from 'react'
import { pickText, type LocalizedText, type UnitLanguage } from '../../features/unit-v2/types'
import { AxisTitles, Label, PlaneGrid, PlaneLine, PlanePath, PlanePoint } from '../dbh2-funtzioak-v2/plane'
import { useBoxClip } from '../dbh2-funtzioak-v2/planeClip'
import { planeMap, type PlaneBox, type PlaneMap } from '../dbh2-funtzioak-v2/planeMap'
import { Figure } from '../dbh2-zatikiak-prototype/figures'
import { hyperbolaBranches, sampled } from '../dbh4-aplikatuak-grafikoa/functions'

/* ==========================================================================
   Funtzio polinomikoak eta arrazionalak · 4. DBH akademikoak — the new
   lesson figures: the three kinds of linear function, the number of
   intercepts of a parabola and its discriminant, a parabola found from its
   vertex and one point, a line cutting a parabola, |x − 2| folded up, |2x − 4|
   written in two pieces, |x² − 4| and y = (2x + 1)/(x − 1) turned into
   2 + 3/(x − 1). The slope, the point-slope equation, y = ax², the vertex,
   the translations and the hyperbolas reuse the 2. DBH and 4. DBH
   aplikatuak figures. Formulas sit in their own <text> (left to right in
   every language); words go through <Label>.
   ========================================================================== */

const INK = 'var(--ink, #1d2733)'
const MUTED = 'var(--muted, #58616e)'
const STAGE = 'var(--stage, #2f6fdb)'
const SECOND = 'var(--second, #c4432a)'
const GREEN = 'var(--success, #267b53)'
const MUSTARD = 'var(--mustard, #e0a100)'
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

/** A short coloured stroke used as a legend key */
function Key({ x, y, color, dashed = false }: { x: number; y: number; color: string; dashed?: boolean }) {
    return <line x1={x} y1={y - 6} x2={x + 26} y2={y - 6} stroke={color} strokeWidth={4} strokeLinecap="round" strokeDasharray={dashed ? '6 5' : undefined} />
}

/** A small Cartesian plane placed at (ox, oy) inside a figure */
function Frame({ box, cell, ox, oy, labelStep = 1, labels = true, children }: { box: PlaneBox; cell: number; ox: number; oy: number; labelStep?: number; labels?: boolean; children?: (map: PlaneMap, clip: string) => ReactNode }) {
    const map = planeMap(box, cell, ox, oy)
    const [clipPath, clip] = useBoxClip(map)
    return (
        <g>
            <defs>{clipPath}</defs>
            <rect x={ox} y={oy} width={map.width} height={map.height} fill={CARD} />
            <PlaneGrid map={map} labelStep={labelStep} labels={labels} />
            <AxisTitles map={map} />
            {children?.(map, clip)}
        </g>
    )
}

/** A dashed asymptote across the box: vertical (x = value) or horizontal (y = value) */
function Asymptote({ map, x, y }: { map: PlaneMap; x?: number; y?: number }) {
    const { box } = map
    return x !== undefined
        ? <line x1={map.x(x)} y1={map.y(box.yMin)} x2={map.x(x)} y2={map.y(box.yMax)} stroke={MUTED} strokeWidth={2} strokeDasharray="7 5" />
        : <line x1={map.x(box.xMin)} y1={map.y(y!)} x2={map.x(box.xMax)} y2={map.y(y!)} stroke={MUTED} strokeWidth={2} strokeDasharray="7 5" />
}

/* ---------- 1. Constant, proportional and affine ---------- */

export function LineKindsFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const lines = [
        { m: 2, n: 0, color: STAGE, formula: 'y = 2x', name: say('Proportzionaltasun zuzena', 'Proporcionalidad directa', 'تناسب طردي'), condition: 'n = 0' },
        { m: -1, n: 3, color: SECOND, formula: 'y = −x + 3', name: say('Lineala', 'Lineal', 'خطية'), condition: 'm ≠ 0,  n ≠ 0' },
        { m: 0, n: -2, color: MUSTARD, formula: 'y = −2', name: say('Konstantea', 'Constante', 'ثابتة'), condition: 'm = 0' }
    ]
    return (
        <Figure height={318} label={t(say('Hiru funtzio lineal mota', 'Tres tipos de función lineal', 'ثلاثة أنواع من الدوال الخطية'))}>
            <Frame box={{ xMin: -4, xMax: 4, yMin: -4, yMax: 5 }} cell={28} ox={40} oy={30}>
                {(map, clip) => (
                    <g>
                        {lines.map((line) => <PlaneLine key={line.formula} map={map} m={line.m} n={line.n} color={line.color} clip={clip} />)}
                        <PlanePoint map={map} point={[0, 0]} color={STAGE} radius={5} />
                        <PlanePoint map={map} point={[0, 3]} color={SECOND} radius={5} />
                        <PlanePoint map={map} point={[0, -2]} color={MUSTARD} radius={5} />
                    </g>
                )}
            </Frame>
            <F x={300} y={62} size={22}>y = mx + n</F>
            {lines.map((line, index) => (
                <g key={line.formula}>
                    <Key x={300} y={108 + index * 62} color={line.color} />
                    <F x={336} y={108 + index * 62} color={line.color}>{line.formula}</F>
                    <F x={480} y={108 + index * 62} size={16} color={MUTED} weight={400}>{line.condition}</F>
                    <Label x={300} y={134 + index * 62} fontSize={15} fill={INK}>{t(line.name)}</Label>
                </g>
            ))}
            <Caption y={306}>{t(say('m: malda · n: jatorriko ordenatua, (0, n) puntua', 'm: pendiente · n: ordenada en el origen, el punto (0, n)', 'm: الميل · n: الجزء المقطوع، النقطة (0, n)'))}</Caption>
        </Figure>
    )
}

/* ---------- 2. How many times a parabola cuts the X axis ---------- */

export function ParabolaCutsFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const panels = [
        { f: (x: number) => x * x - 4, formula: 'y = x² − 4', delta: 'Δ = 16 > 0', roots: [-2, 2], name: say('Bi ebaki-puntu', 'Dos cortes', 'نقطتا تقاطع'), color: STAGE },
        { f: (x: number) => x * x - 2 * x + 1, formula: 'y = x² − 2x + 1', delta: 'Δ = 0', roots: [1], name: say('Bat: erpina ardatzean', 'Uno: el vértice en el eje', 'واحدة: الرأس على المحور'), color: SECOND },
        { f: (x: number) => x * x + 2, formula: 'y = x² + 2', delta: 'Δ = −8 < 0', roots: [], name: say('Batere ez', 'Ninguno', 'لا شيء'), color: GREEN }
    ]
    return (
        <Figure height={326} label={t(say('Parabola baten ebaki-puntuak X ardatzarekin', 'Los cortes de una parábola con el eje X', 'تقاطعات القطع المكافئ مع محور X'))}>
            {panels.map((panel, index) => (
                <g key={panel.formula}>
                    <Frame box={{ xMin: -3, xMax: 3, yMin: -5, yMax: 5 }} cell={19} ox={68 + index * 220} oy={32} labels={false}>
                        {(map, clip) => (
                            <g>
                                <PlanePath map={map} points={sampled(panel.f, -3.5, 3.5)} color={panel.color} width={3.2} clip={clip} />
                                {panel.roots.map((root) => <PlanePoint key={root} map={map} point={[root, 0]} color={INK} radius={5} />)}
                            </g>
                        )}
                    </Frame>
                    <F x={125 + index * 220} y={246} size={16} anchor="middle" color={panel.color}>{panel.formula}</F>
                    <F x={125 + index * 220} y={272} size={16} anchor="middle">{panel.delta}</F>
                    <Label x={125 + index * 220} y={296} textAnchor="middle" fontSize={15} fill={INK}>{t(panel.name)}</Label>
                </g>
            ))}
            <F x={360} y={320} size={15} anchor="middle" color={MUTED} weight={400}>Δ = b² − 4ac</F>
        </Figure>
    )
}

/* ---------- 3. A parabola from its vertex and one point ---------- */

export function VertexPointFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    return (
        <Figure height={320} label={t(say('Erpina (1, −4) eta (3, 0) puntua dituen parabola', 'La parábola de vértice (1, −4) que pasa por (3, 0)', 'القطع المكافئ ذو الرأس (1, −4) المار بـ (3, 0)'))}>
            <Frame box={{ xMin: -3, xMax: 5, yMin: -5, yMax: 4 }} cell={28} ox={40} oy={30}>
                {(map, clip) => (
                    <g>
                        <Asymptote map={map} x={1} />
                        <PlanePath map={map} points={sampled((x) => (x - 1) ** 2 - 4, -3.5, 5.5)} color={STAGE} width={3.4} clip={clip} />
                        <PlanePoint map={map} point={[1, -4]} color={SECOND} radius={6} name="V" dx={10} dy={4} />
                        <PlanePoint map={map} point={[3, 0]} color={GREEN} radius={6} name="P" dx={8} dy={-8} />
                        <PlanePoint map={map} point={[-1, 0]} color={GREEN} radius={4.5} />
                    </g>
                )}
            </Frame>
            <F x={312} y={60} size={20}>y = a(x − p)² + q</F>
            <Label x={312} y={96} fontSize={16} fill={SECOND}>{t(say('1. Erpina ordeztu:', '1. Pon el vértice:', '1. ضع الرأس:'))}</Label>
            <F x={330} y={124} color={SECOND}>y = a(x − 1)² − 4</F>
            <Label x={312} y={160} fontSize={16} fill={GREEN}>{t(say('2. P(3, 0) puntua ordeztu:', '2. Sustituye el punto P(3, 0):', '2. عوّض النقطة P(3, 0):'))}</Label>
            <F x={330} y={188} color={GREEN}>0 = 4a − 4  →  a = 1</F>
            <Label x={312} y={224} fontSize={16} fill={STAGE}>{t(say('3. Garatu:', '3. Desarrolla:', '3. انشر:'))}</Label>
            <F x={330} y={252} color={STAGE}>y = x² − 2x − 3</F>
            <Caption y={306}>{t(say('Simetria: (3, 0) puntuaren bikia (−1, 0) da', 'Por simetría, la pareja de (3, 0) es (−1, 0)', 'بالتماثل، نظيرة (3, 0) هي (−1, 0)'))}</Caption>
        </Figure>
    )
}

/* ---------- 4. A line and a parabola ---------- */

export function LineParabolaFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    return (
        <Figure height={322} label={t(say('y = x² − 1 parabola eta y = x + 1 zuzena', 'La parábola y = x² − 1 y la recta y = x + 1', 'القطع المكافئ y = x² − 1 والمستقيم y = x + 1'))}>
            <Frame box={{ xMin: -3, xMax: 4, yMin: -2, yMax: 6 }} cell={30} ox={40} oy={30}>
                {(map, clip) => (
                    <g>
                        <PlanePath map={map} points={sampled((x) => x * x - 1, -3.5, 4.5)} color={STAGE} width={3.4} clip={clip} />
                        <PlaneLine map={map} m={1} n={1} color={SECOND} clip={clip} />
                        <PlanePoint map={map} point={[2, 3]} color={INK} radius={6} name="(2, 3)" dx={10} dy={14} />
                        <PlanePoint map={map} point={[-1, 0]} color={INK} radius={6} name="(−1, 0)" dx={-8} dy={-12} anchor="end" />
                    </g>
                )}
            </Frame>
            <Key x={300} y={62} color={STAGE} />
            <F x={336} y={62} color={STAGE}>y = x² − 1</F>
            <Key x={300} y={94} color={SECOND} />
            <F x={336} y={94} color={SECOND}>y = x + 1</F>
            <Label x={300} y={136} fontSize={16} fill={INK}>{t(say('Berdindu bi adierazpenak:', 'Iguala las dos expresiones:', 'ساوِ بين العبارتين:'))}</Label>
            <F x={316} y={166}>x² − 1 = x + 1</F>
            <F x={316} y={196}>x² − x − 2 = 0</F>
            <F x={316} y={226}>x = 2,  x = −1</F>
            <Label x={300} y={262} fontSize={16} fill={INK}>{t(say('y zuzenean kalkulatu', 'Calcula la y en la recta', 'احسب y على المستقيم'))}</Label>
            <Caption y={310}>{t(say('Bigarren mailako ekuazioa: 2, 1 edo 0 ebaki-puntu', 'Una ecuación de segundo grado: 2, 1 o 0 puntos de corte', 'معادلة من الدرجة الثانية: 2 أو 1 أو 0 نقطة تقاطع'))}</Caption>
        </Figure>
    )
}

/* ---------- 5. |x − 2|: the negative part folds up ---------- */

export function AbsLinearFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    return (
        <Figure height={318} label={t(say('y = |x − 2| funtzioaren grafikoa', 'La gráfica de y = |x − 2|', 'رسم y = |x − 2|'))}>
            <Frame box={{ xMin: -2, xMax: 6, yMin: -4, yMax: 5 }} cell={28} ox={40} oy={30}>
                {(map, clip) => (
                    <g>
                        <PlaneLine map={map} m={1} n={-2} color={MUTED} width={2.6} dashed clip={clip} />
                        <PlanePath map={map} points={[[-3, 5], [2, 0], [7, 5]]} color={STAGE} width={3.6} clip={clip} />
                        <PlanePoint map={map} point={[2, 0]} color={SECOND} radius={6} />
                        <PlanePoint map={map} point={[0, 2]} color={MUSTARD} radius={5} />
                        <PlanePoint map={map} point={[0, -2]} color={MUTED} radius={4} />
                    </g>
                )}
            </Frame>
            <Key x={300} y={62} color={MUTED} dashed />
            <F x={336} y={62} color={MUTED}>y = x − 2</F>
            <Key x={300} y={96} color={STAGE} />
            <F x={336} y={96} color={STAGE}>y = |x − 2|</F>
            <Label x={300} y={140} fontSize={16} fill={INK}>{t(say('X ardatzaren azpiko zatia', 'El trozo por debajo del eje X', 'الجزء الواقع تحت محور X'))}</Label>
            <Label x={300} y={166} fontSize={16} fill={INK}>{t(say('gora islatzen da, ispilu batean bezala', 'se refleja hacia arriba, como en un espejo', 'ينعكس إلى الأعلى كما في مرآة'))}</Label>
            <F x={300} y={206} color={MUSTARD}>(0, −2)  →  (0, 2)</F>
            <Label x={300} y={244} fontSize={16} fontWeight={700} fill={SECOND}>{t(say('Erpina: x − 2 = 0 → x = 2', 'El pico: x − 2 = 0 → x = 2', 'الرأس: x − 2 = 0 → x = 2'))}</Label>
            <Caption y={306}>{t(say('|y| ≥ 0 beti: grafikoa ez da inoiz X ardatzaren azpitik joaten', '|y| ≥ 0 siempre: la gráfica nunca baja del eje X', 'القيمة المطلقة لا تكون سالبة: لا ينزل الرسم تحت محور X'))}</Caption>
        </Figure>
    )
}

/* ---------- 6. |2x − 4| in two pieces ---------- */

export function AbsPiecesFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    return (
        <Figure height={318} label={t(say('y = |2x − 4| zatika idatzita', 'y = |2x − 4| escrita a trozos', 'y = |2x − 4| مكتوبة على أجزاء'))}>
            <Frame box={{ xMin: -2, xMax: 5, yMin: -1, yMax: 8 }} cell={28} ox={40} oy={30}>
                {(map, clip) => (
                    <g>
                        <PlanePath map={map} points={[[-3, 10], [2, 0]]} color={SECOND} width={3.6} clip={clip} />
                        <PlanePath map={map} points={[[2, 0], [6, 8]]} color={STAGE} width={3.6} clip={clip} />
                        <PlanePoint map={map} point={[2, 0]} color={INK} radius={6} />
                        <PlanePoint map={map} point={[0, 4]} color={SECOND} radius={4.5} />
                        <PlanePoint map={map} point={[4, 4]} color={STAGE} radius={4.5} />
                    </g>
                )}
            </Frame>
            <F x={290} y={60} size={20}>y = |2x − 4|</F>
            <Label x={290} y={98} fontSize={16} fill={INK}>{t(say('Barrukoa 0 da hemen:', 'Lo de dentro es 0 en:', 'ما بالداخل يساوي 0 عند:'))}</Label>
            <F x={306} y={126}>2x − 4 = 0  →  x = 2</F>
            <Label x={290} y={164} fontSize={16} fill={SECOND}>{t(say('Ezkerrean negatiboa: aldatu zeinua', 'A la izquierda es negativo: cambia el signo', 'إلى اليسار سالب: غيّر الإشارة'))}</Label>
            <F x={306} y={192} color={SECOND}>−2x + 4</F>
            <F x={420} y={192} color={SECOND} weight={400}>x &lt; 2</F>
            <Label x={290} y={226} fontSize={16} fill={STAGE}>{t(say('Eskuinean positiboa: utzi den bezala', 'A la derecha es positivo: déjalo igual', 'إلى اليمين موجب: اتركه كما هو'))}</Label>
            <F x={306} y={254} color={STAGE}>2x − 4</F>
            <F x={420} y={254} color={STAGE} weight={400}>x ≥ 2</F>
            <Caption y={306}>{t(say('Bi zuzen-zati, erpina (2, 0) puntuan', 'Dos trozos de recta con el pico en (2, 0)', 'قطعتان مستقيمتان رأسهما في (2, 0)'))}</Caption>
        </Figure>
    )
}

/* ---------- 7. |x² − 4| ---------- */

export function AbsQuadraticFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    return (
        <Figure height={318} label={t(say('y = |x² − 4| funtzioaren grafikoa', 'La gráfica de y = |x² − 4|', 'رسم y = |x² − 4|'))}>
            <Frame box={{ xMin: -4, xMax: 4, yMin: -5, yMax: 6 }} cell={22} ox={40} oy={32} labelStep={2}>
                {(map, clip) => (
                    <g>
                        <PlanePath map={map} points={sampled((x) => x * x - 4, -4.5, 4.5)} color={MUTED} width={2.6} dashed clip={clip} />
                        <PlanePath map={map} points={sampled((x) => Math.abs(x * x - 4), -4.5, 4.5)} color={STAGE} width={3.6} clip={clip} />
                        <PlanePoint map={map} point={[-2, 0]} color={SECOND} radius={5.5} />
                        <PlanePoint map={map} point={[2, 0]} color={SECOND} radius={5.5} />
                        <PlanePoint map={map} point={[0, 4]} color={GREEN} radius={5.5} />
                    </g>
                )}
            </Frame>
            <Key x={290} y={56} color={MUTED} dashed />
            <F x={326} y={56} color={MUTED}>y = x² − 4</F>
            <Key x={290} y={88} color={STAGE} />
            <F x={326} y={88} color={STAGE}>y = |x² − 4|</F>
            <Label x={290} y={130} fontSize={16} fill={SECOND}>{t(say('Ebaki-puntuak X ardatzarekin:', 'Cortes con el eje X:', 'التقاطع مع محور X:'))}</Label>
            <F x={306} y={158} color={SECOND}>x = −2,  x = 2</F>
            <Label x={290} y={196} fontSize={16} fill={GREEN}>{t(say('Tartean, erpina gora islatzen da:', 'Entre ellos, el vértice sube:', 'بينهما يصعد الرأس:'))}</Label>
            <F x={306} y={224} color={GREEN}>(0, −4)  →  (0, 4)</F>
            <Label x={290} y={262} fontSize={16} fill={INK}>{t(say('Bi minimo eta maximo bat', 'Dos mínimos y un máximo', 'قيمتان صغريان وقيمة عظمى'))}</Label>
            <Caption y={306}>{t(say('Lehenik marraztu barrukoa, gero islatu negatiboa', 'Primero dibuja lo de dentro, luego refleja lo negativo', 'ارسم ما بالداخل أولًا ثم اعكس الجزء السالب'))}</Caption>
        </Figure>
    )
}

/* ---------- 8. (2x + 1)/(x − 1) = 2 + 3/(x − 1) ---------- */

export function RationalFormFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    return (
        <Figure height={322} label={t(say('y = (2x + 1)/(x − 1) eta bere asintotak', 'y = (2x + 1)/(x − 1) y sus asíntotas', 'y = (2x + 1)/(x − 1) ومقارباه'))}>
            <Frame box={{ xMin: -4, xMax: 6, yMin: -3, yMax: 7 }} cell={24} ox={40} oy={30}>
                {(map, clip) => (
                    <g>
                        <Asymptote map={map} x={1} />
                        <Asymptote map={map} y={2} />
                        {hyperbolaBranches(3, 1, 2, -4.5, 6.5, -3, 7).map((points, index) => <PlanePath key={index} map={map} points={points} color={STAGE} width={3.4} clip={clip} />)}
                        <PlanePoint map={map} point={[0, -1]} color={SECOND} radius={5} />
                        <PlanePoint map={map} point={[-0.5, 0]} color={SECOND} radius={5} />
                        <PlanePoint map={map} point={[2, 5]} color={GREEN} radius={5} />
                        <PlanePoint map={map} point={[4, 3]} color={GREEN} radius={5} />
                    </g>
                )}
            </Frame>
            <F x={312} y={60} size={20}>y = (2x + 1) / (x − 1)</F>
            <Label x={312} y={96} fontSize={16} fill={INK}>{t(say('Zatitu: zatidura 2, hondarra 3', 'Divide: cociente 2, resto 3', 'اقسم: الناتج 2 والباقي 3'))}</Label>
            <F x={330} y={126} color={STAGE}>y = 2 + 3 / (x − 1)</F>
            <Label x={312} y={164} fontSize={16} fill={MUTED}>{t(say('Asintota bertikala:', 'Asíntota vertical:', 'المقارب الرأسي:'))}</Label>
            <F x={330} y={190} color={MUTED}>x − 1 = 0  →  x = 1</F>
            <Label x={312} y={226} fontSize={16} fill={MUTED}>{t(say('Asintota horizontala:', 'Asíntota horizontal:', 'المقارب الأفقي:'))}</Label>
            <F x={330} y={252} color={MUTED}>y = 2 / 1 = 2</F>
            <Caption y={310}>{t(say('y = 3/x hiperbola, 1 eskuinera eta 2 gora', 'La hipérbola y = 3/x, 1 a la derecha y 2 hacia arriba', 'القطع الزائد y = 3/x، 1 يمينًا و2 إلى الأعلى'))}</Caption>
        </Figure>
    )
}

/* ---------- Hero art ---------- */

export function PolynomialAkHeroArt() {
    const parabola = sampled((x) => 0.9 * (x - 4) ** 2, 0.6, 7.4, 0.1)
    const hyperbola = sampled((x) => 40 / x, 0.4, 5, 0.05)
    return (
        <div className="fraction-v2-collage" aria-hidden="true">
            <svg viewBox="0 0 520 400" direction="ltr" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                <g transform="translate(30 34) rotate(-4)">
                    <rect width={250} height={190} rx={16} fill={PAPER} stroke={INK} strokeWidth={2} />
                    <line x1={20} y1={165} x2={235} y2={165} stroke={INK} strokeWidth={2} />
                    <line x1={125} y1={175} x2={125} y2={15} stroke={INK} strokeWidth={2} />
                    <polyline points={parabola.map(([x, y]) => `${x * 30 + 5},${150 - y * 11}`).join(' ')} fill="none" stroke="#2f6fdb" strokeWidth={4} strokeLinecap="round" />
                    <circle cx={125} cy={150} r={7} fill="#c4432a" />
                </g>
                <g transform="translate(310 40) rotate(5)">
                    <rect width={180} height={150} rx={16} fill="#d6eddf" stroke={INK} strokeWidth={2} />
                    <line x1={20} y1={130} x2={165} y2={130} stroke={INK} strokeWidth={2} />
                    <line x1={20} y1={135} x2={20} y2={15} stroke={INK} strokeWidth={2} />
                    <polyline points={hyperbola.map(([x, y]) => `${20 + x * 28},${130 - Math.min(y, 110)}`).join(' ')} fill="none" stroke="#267b53" strokeWidth={4} strokeLinecap="round" />
                </g>
                <g transform="translate(330 214) rotate(-3)">
                    <rect width={150} height={110} rx={16} fill="#f6dcd3" stroke={INK} strokeWidth={2} />
                    <polyline points="20,22 75,88 130,22" fill="none" stroke="#c4432a" strokeWidth={4} strokeLinejoin="round" strokeLinecap="round" />
                    <line x1={14} y1={88} x2={136} y2={88} stroke={INK} strokeWidth={2} />
                </g>
                <g transform="translate(40 270) rotate(2)">
                    <rect width={270} height={86} rx={16} fill="#fbebc0" stroke={INK} strokeWidth={2} />
                    <text x={135} y={56} textAnchor="middle" fontSize={26} fontWeight={700} fill={INK} fontFamily={SERIF}>y = a(x − p)² + q</text>
                </g>
            </svg>
        </div>
    )
}
