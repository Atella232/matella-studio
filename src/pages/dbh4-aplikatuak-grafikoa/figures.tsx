import type { ReactNode } from 'react'
import { pickText, type LocalizedText, type UnitLanguage } from '../../features/unit-v2/types'
import { Figure } from '../dbh2-zatikiak-prototype/figures'
import { AxisTitles, Label, PlaneGrid, PlaneLine, PlanePath, PlanePoint } from '../dbh2-funtzioak-v2/plane'
import { useBoxClip } from '../dbh2-funtzioak-v2/planeClip'
import { planeMap, type PlaneBox, type PlaneMap } from '../dbh2-funtzioak-v2/planeMap'
import { exponentialCurve, hyperbolaBranches, rootCurve, sampled } from './functions'

/* ==========================================================================
   Funtzio baten grafikoa · 4. DBH aplikatuak — the new lesson figures: a
   spring as a linear model, parallel lines, the parabolas y = ax², the
   vertex and intercepts of y = x² − 4x + 3, shifted parabolas, the
   hyperbola y = 4/x and a shifted one with its asymptotes, square-root
   graphs, y = 2ˣ and y = (1/2)ˣ, growth y = k·aˣ and the four models side
   by side. y = mx, y = mx + n, the slope and the line through two points
   reuse the 2. DBH figures. Formulas sit in their own <text> lines (left to
   right in every language); Arabic labels carry words only.
   ========================================================================== */

const INK = 'var(--ink, #1d2733)'
const MUTED = 'var(--muted, #58616e)'
const STAGE = 'var(--stage, #2f6fdb)'
const SECOND = 'var(--second, #c4432a)'
const MUSTARD = 'var(--mustard, #e0a100)'
const GREEN = 'var(--success, #267b53)'
const CARD = 'var(--card, #fffcf6)'
const PAPER = '#fffcf6'
const SERIF = 'Fraunces, serif'

const say = (eu: string, es: string, ar: string): LocalizedText => ({ eu, es, ar })
const pick = (language: UnitLanguage, text: LocalizedText) => pickText(language, text)
/** A decimal written with a comma, or with a point in Arabic */
const dec = (language: UnitLanguage, value: string) => (language === 'ar' ? value.replace(/,/g, '.') : value)

function Caption({ y, language, text }: { y: number; language: UnitLanguage; text: LocalizedText }) {
    return <Label x={360} y={y} textAnchor="middle" fontSize={15} fill={MUTED}>{pick(language, text)}</Label>
}

/** A formula written left to right whatever the language */
function Formula({ x, y, children, size = 18, color = INK, anchor = 'start', weight = 700 }: { x: number; y: number; children: ReactNode; size?: number; color?: string; anchor?: 'start' | 'middle' | 'end'; weight?: number }) {
    return <text x={x} y={y} fontSize={size} fontWeight={weight} fill={color} textAnchor={anchor} direction="ltr">{children}</text>
}

/** A short coloured stroke used as a legend key */
function Key({ x, y, color, dashed = false }: { x: number; y: number; color: string; dashed?: boolean }) {
    return <line x1={x} y1={y - 6} x2={x + 26} y2={y - 6} stroke={color} strokeWidth={4} strokeLinecap="round" strokeDasharray={dashed ? '6 5' : undefined} />
}

/** A small Cartesian plane placed at (ox, oy) inside a figure */
function Frame({ box, cell, ox, oy, labelStep, labels = true, xUnit, yUnit, xTitle, yTitle, children }: {
    box: PlaneBox
    cell: number
    ox: number
    oy: number
    labelStep?: number
    labels?: boolean
    xUnit?: number
    yUnit?: number
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
            <PlaneGrid map={map} labelStep={labelStep} labels={labels} xUnit={xUnit} yUnit={yUnit} />
            <AxisTitles map={map} xTitle={xTitle} yTitle={yTitle} />
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

/* ---------- Linear models: a spring ---------- */

export function LinearModelsFigure({ language }: { language: UnitLanguage }) {
    // One square = 20 cm on the y axis
    const length = (kg: number) => (30 + 15 * kg) / 20
    return (
        <Figure height={330} label={pick(language, say('Malguki baten luzera: y = 30 + 15x', 'La longitud de un muelle: y = 30 + 15x', 'طول نابض: y = 30 + 15x'))}>
            <Frame box={{ xMin: 0, xMax: 5, yMin: 0, yMax: 6 }} cell={36} ox={70} oy={44} yUnit={20} xTitle={pick(language, say('pisua (kg)', 'peso (kg)', 'الوزن (كغ)'))} yTitle={pick(language, say('luzera (cm)', 'longitud (cm)', 'الطول (سم)'))}>
                {(map, clip) => (
                    <g>
                        <PlanePath map={map} points={[[0, length(0)], [5, length(5)]]} color={STAGE} width={3.4} clip={clip} />
                        {[0, 2, 4].map((kg) => <PlanePoint key={kg} map={map} point={[kg, length(kg)]} color={SECOND} radius={5} />)}
                    </g>
                )}
            </Frame>
            <Formula x={340} y={74} size={26} color={STAGE}>y = 30 + 15x</Formula>
            <Label x={340} y={118} fontSize={16} fontWeight={700} fill={SECOND}>{pick(language, say('n = 30: hasierako luzera', 'n = 30: la longitud inicial', 'n = 30: الطول الابتدائي'))}</Label>
            <Label x={340} y={150} fontSize={16} fontWeight={700} fill={SECOND}>{pick(language, say('m = 15: cm kilo bakoitzeko', 'm = 15: cm por cada kilo', 'm = 15: سم لكل كيلوغرام'))}</Label>
            <Formula x={340} y={196} size={17}>x = 4  →  y = 30 + 60 = 90</Formula>
            <Label x={340} y={232} fontSize={15} fill={MUTED}>{pick(language, say('Aldaketa berdinak, gehikuntza berdinak:', 'A aumentos iguales, aumentos iguales:', 'زيادات متساوية تعطي زيادات متساوية:'))}</Label>
            <Label x={340} y={256} fontSize={15} fill={MUTED}>{pick(language, say('grafikoa zuzen bat da', 'la gráfica es una recta', 'الرسم خط مستقيم'))}</Label>
            <Caption y={318} language={language} text={say('Funtzio lineal bat: y = mx + n', 'Una función lineal: y = mx + n', 'دالة خطية: y = mx + n')} />
        </Figure>
    )
}

/* ---------- Parallel lines ---------- */

export function ParallelFigure({ language }: { language: UnitLanguage }) {
    return (
        <Figure height={322} label={pick(language, say('Zuzen paraleloak: malda bera', 'Rectas paralelas: la misma pendiente', 'مستقيمات متوازية: الميل نفسه'))}>
            <Frame box={{ xMin: -4, xMax: 4, yMin: -4, yMax: 5 }} cell={28} ox={40} oy={30}>
                {(map, clip) => (
                    <g>
                        <PlaneLine map={map} m={2} n={1} color={STAGE} clip={clip} />
                        <PlaneLine map={map} m={2} n={-3} color={SECOND} clip={clip} />
                        <PlaneLine map={map} m={-1} n={2} color={MUSTARD} dashed clip={clip} />
                        <PlanePoint map={map} point={[0, 1]} color={STAGE} radius={5} />
                        <PlanePoint map={map} point={[0, -3]} color={SECOND} radius={5} />
                    </g>
                )}
            </Frame>
            <Key x={320} y={66} color={STAGE} />
            <Formula x={356} y={66} color={STAGE}>y = 2x + 1</Formula>
            <Key x={320} y={100} color={SECOND} />
            <Formula x={356} y={100} color={SECOND}>y = 2x − 3</Formula>
            <Label x={320} y={140} fontSize={16} fontWeight={700} fill={INK}>{pick(language, say('Malda bera, m = 2: paraleloak', 'Misma pendiente, m = 2: paralelas', 'الميل نفسه m = 2: متوازيان'))}</Label>
            <Key x={320} y={188} color={MUSTARD} dashed />
            <Formula x={356} y={188} color={MUSTARD}>y = −x + 2</Formula>
            <Label x={320} y={226} fontSize={16} fill={INK}>{pick(language, say('Beste malda bat: ebakitzen dira', 'Otra pendiente: se cortan', 'ميل آخر: يتقاطعان'))}</Label>
            <Caption y={310} language={language} text={say('Paraleloak: m bera eta n desberdina', 'Paralelas: la misma m y distinta n', 'المتوازيان: m نفسها وn مختلفة')} />
        </Figure>
    )
}

/* ---------- Parabolas y = ax² ---------- */

export function ParabolaShapesFigure({ language }: { language: UnitLanguage }) {
    const curves: Array<{ a: number; color: string; text: string }> = [
        { a: 2, color: SECOND, text: 'y = 2x²' },
        { a: 1, color: STAGE, text: 'y = x²' },
        { a: 0.5, color: GREEN, text: 'y = ½x²' },
        { a: -1, color: MUSTARD, text: 'y = −x²' }
    ]
    return (
        <Figure height={330} label={pick(language, say('y = ax² parabolak a-ren arabera', 'Las parábolas y = ax² según a', 'القطوع المكافئة y = ax² بحسب a'))}>
            <Frame box={{ xMin: -3, xMax: 3, yMin: -4, yMax: 5 }} cell={28} ox={56} oy={30}>
                {(map, clip) => (
                    <g>
                        {curves.map((curve) => <PlanePath key={curve.text} map={map} points={sampled((x) => curve.a * x * x, -3.5, 3.5)} color={curve.color} width={3.2} clip={clip} />)}
                        <PlanePoint map={map} point={[0, 0]} color={INK} radius={5} />
                    </g>
                )}
            </Frame>
            {curves.map((curve, index) => (
                <g key={curve.text}>
                    <Key x={290} y={60 + index * 32} color={curve.color} />
                    <Formula x={326} y={60 + index * 32} color={curve.color}>{curve.text}</Formula>
                </g>
            ))}
            <Label x={290} y={206} fontSize={16} fill={INK}>{pick(language, say('a > 0: adarrak gora, minimoa', 'a > 0: ramas hacia arriba, mínimo', 'a > 0: الفرعان إلى الأعلى، قيمة صغرى'))}</Label>
            <Label x={290} y={236} fontSize={16} fill={INK}>{pick(language, say('a < 0: adarrak behera, maximoa', 'a < 0: ramas hacia abajo, máximo', 'a < 0: الفرعان إلى الأسفل، قيمة عظمى'))}</Label>
            <Label x={290} y={266} fontSize={16} fill={INK}>{pick(language, say('|a| handiagoa: itxiagoa', '|a| mayor: más cerrada', '|a| أكبر: أضيق'))}</Label>
            <Caption y={318} language={language} text={say('Guztiek dute erpina (0, 0) puntuan', 'Todas tienen el vértice en (0, 0)', 'كلها رأسها في (0, 0)')} />
        </Figure>
    )
}

/* ---------- Vertex and intercepts ---------- */

export function VertexFigure({ language }: { language: UnitLanguage }) {
    return (
        <Figure height={312} label={pick(language, say('y = x² − 4x + 3 parabolaren erpina eta ebakidurak', 'Vértice y cortes de y = x² − 4x + 3', 'رأس y = x² − 4x + 3 وتقاطعاته'))}>
            <Frame box={{ xMin: -1, xMax: 5, yMin: -2, yMax: 5 }} cell={32} ox={44} oy={34}>
                {(map, clip) => (
                    <g>
                        <Asymptote map={map} x={2} />
                        <PlanePath map={map} points={sampled((x) => x * x - 4 * x + 3, -1, 5)} color={STAGE} width={3.4} clip={clip} />
                        <PlanePoint map={map} point={[2, -1]} color={SECOND} radius={6} name="V" dx={10} dy={16} />
                        <PlanePoint map={map} point={[1, 0]} color={GREEN} radius={5} />
                        <PlanePoint map={map} point={[3, 0]} color={GREEN} radius={5} />
                        <PlanePoint map={map} point={[0, 3]} color={MUSTARD} radius={5} />
                    </g>
                )}
            </Frame>
            <Formula x={300} y={60} size={22} color={STAGE}>y = x² − 4x + 3</Formula>
            <Formula x={300} y={100} color={SECOND}>x = −b / 2a = 4 / 2 = 2</Formula>
            <Formula x={300} y={132} color={SECOND}>y = 4 − 8 + 3 = −1</Formula>
            <Label x={300} y={166} fontSize={16} fontWeight={700} fill={SECOND}>{pick(language, say('V(2, −1): minimoa', 'V(2, −1): mínimo', 'V(2, −1): قيمة صغرى'))}</Label>
            <Label x={300} y={200} fontSize={16} fill={MUTED}>{pick(language, say('Simetria-ardatza: x = 2', 'Eje de simetría: x = 2', 'محور التماثل: x = 2'))}</Label>
            <Label x={300} y={232} fontSize={16} fill={GREEN}>{pick(language, say('X ardatza: (1, 0) eta (3, 0)', 'Eje X: (1, 0) y (3, 0)', 'محور X: (1, 0) و(3, 0)'))}</Label>
            <Label x={300} y={262} fontSize={16} fill={MUSTARD}>{pick(language, say('Y ardatza: (0, 3)', 'Eje Y: (0, 3)', 'محور Y: (0, 3)'))}</Label>
            <Caption y={300} language={language} text={say('Lehenik erpina, gero ebakidurak eta inguruko puntu batzuk', 'Primero el vértice, luego los cortes y algunos puntos cercanos', 'الرأس أولًا، ثم التقاطعات وبعض النقاط القريبة')} />
        </Figure>
    )
}

/* ---------- Shifted parabolas ---------- */

export function ShiftFigure({ language }: { language: UnitLanguage }) {
    return (
        <Figure height={322} label={pick(language, say('y = x² parabolaren lekualdaketak', 'Traslaciones de la parábola y = x²', 'انسحابات القطع المكافئ y = x²'))}>
            <Frame box={{ xMin: -3, xMax: 6, yMin: -4, yMax: 6 }} cell={25} ox={40} oy={30}>
                {(map, clip) => (
                    <g>
                        <PlanePath map={map} points={sampled((x) => x * x, -3.5, 3.5)} color={MUTED} width={2.6} dashed clip={clip} />
                        <PlanePath map={map} points={sampled((x) => (x - 3) ** 2, -0.5, 6.5)} color={STAGE} width={3.4} clip={clip} />
                        <PlanePath map={map} points={sampled((x) => x * x - 3, -3.5, 3.5)} color={SECOND} width={3.4} clip={clip} />
                        <PlanePoint map={map} point={[3, 0]} color={STAGE} radius={5} />
                        <PlanePoint map={map} point={[0, -3]} color={SECOND} radius={5} />
                    </g>
                )}
            </Frame>
            <Formula x={300} y={62} size={22} color={INK}>y = (x − p)² + q</Formula>
            <Label x={300} y={94} fontSize={16} fill={INK}>{pick(language, say('Erpina: (p, q)', 'Vértice: (p, q)', 'الرأس: (p, q)'))}</Label>
            <Key x={300} y={142} color={STAGE} />
            <Formula x={336} y={142} color={STAGE}>y = (x − 3)²</Formula>
            <Label x={300} y={170} fontSize={15} fill={STAGE}>{pick(language, say('3 unitate eskuinera', '3 unidades a la derecha', '3 وحدات إلى اليمين'))}</Label>
            <Key x={300} y={214} color={SECOND} />
            <Formula x={336} y={214} color={SECOND}>y = x² − 3</Formula>
            <Label x={300} y={242} fontSize={15} fill={SECOND}>{pick(language, say('3 unitate behera', '3 unidades hacia abajo', '3 وحدات إلى الأسفل'))}</Label>
            <Caption y={310} language={language} text={say('Forma bera; erpina bakarrik mugitzen da', 'La misma forma; solo se mueve el vértice', 'الشكل نفسه؛ يتحرك الرأس فقط')} />
        </Figure>
    )
}

/* ---------- Inverse proportion y = k/x ---------- */

export function HyperbolaFigure({ language }: { language: UnitLanguage }) {
    const named = [1, 2, 4, -1, -2, -4]
    return (
        <Figure height={312} label={pick(language, say('y = 4/x hiperbola', 'La hipérbola y = 4/x', 'القطع الزائد y = 4/x'))}>
            <Frame box={{ xMin: -6, xMax: 6, yMin: -6, yMax: 6 }} cell={21} ox={40} oy={30} labelStep={2}>
                {(map, clip) => (
                    <g>
                        {hyperbolaBranches(4, 0, 0, -6.5, 6.5, -6, 6).map((points, index) => <PlanePath key={index} map={map} points={points} color={STAGE} width={3.4} clip={clip} />)}
                        {named.map((x) => <PlanePoint key={x} map={map} point={[x, 4 / x]} color={SECOND} radius={4.5} />)}
                    </g>
                )}
            </Frame>
            <Formula x={330} y={62} size={24} color={STAGE}>y = 4 / x</Formula>
            {['x', 'y'].map((name, row) => (
                <g key={name}>
                    <text x={344} y={106 + row * 32} textAnchor="middle" fontSize={17} fontWeight={700} fontStyle="italic" fill={INK}>{name}</text>
                    {[1, 2, 4, 8].map((x, index) => <text key={x} x={384 + index * 46} y={106 + row * 32} textAnchor="middle" fontSize={17} fill={INK}>{row === 0 ? x : String(4 / x).replace('.', language === 'ar' ? '.' : ',')}</text>)}
                </g>
            ))}
            <Label x={330} y={180} fontSize={16} fill={INK}>{pick(language, say('x · y = 4 beti: alderantzizkoa', 'x · y = 4 siempre: inversa', 'x · y = 4 دائمًا: عكسي'))}</Label>
            <Label x={330} y={212} fontSize={16} fill={INK}>{pick(language, say('k > 0: I. eta III. koadranteak', 'k > 0: cuadrantes I y III', 'k > 0: الربعان الأول والثالث'))}</Label>
            <Label x={330} y={244} fontSize={16} fill={MUTED}>{pick(language, say('Asintotak: x = 0 eta y = 0', 'Asíntotas: x = 0 e y = 0', 'المقاربان: x = 0 وy = 0'))}</Label>
            <Caption y={300} language={language} text={say('Ez du ardatzik ebakitzen: Dom f = ℝ − {0}', 'No corta a los ejes: Dom f = ℝ − {0}', 'لا يقطع المحورين: Dom f = ℝ − {0}')} />
        </Figure>
    )
}

/* ---------- Shifted hyperbola ---------- */

export function ShiftedHyperbolaFigure({ language }: { language: UnitLanguage }) {
    return (
        <Figure height={300} label={pick(language, say('y = 1/(x − 2) + 1 eta bere asintotak', 'y = 1/(x − 2) + 1 y sus asíntotas', 'y = 1/(x − 2) + 1 ومقارباه'))}>
            <Frame box={{ xMin: -3, xMax: 7, yMin: -3, yMax: 6 }} cell={24} ox={40} oy={30}>
                {(map, clip) => (
                    <g>
                        <Asymptote map={map} x={2} />
                        <Asymptote map={map} y={1} />
                        {hyperbolaBranches(1, 2, 1, -3.5, 7.5, -3, 6).map((points, index) => <PlanePath key={index} map={map} points={points} color={STAGE} width={3.4} clip={clip} />)}
                        <PlanePoint map={map} point={[3, 2]} color={SECOND} radius={5} />
                        <PlanePoint map={map} point={[1, 0]} color={SECOND} radius={5} />
                    </g>
                )}
            </Frame>
            <Formula x={320} y={62} size={22} color={INK}>y = k / (x − a) + b</Formula>
            <Label x={320} y={100} fontSize={16} fill={INK}>{pick(language, say('Asintota bertikala: x = a', 'Asíntota vertical: x = a', 'المقارب الرأسي: x = a'))}</Label>
            <Label x={320} y={130} fontSize={16} fill={INK}>{pick(language, say('Asintota horizontala: y = b', 'Asíntota horizontal: y = b', 'المقارب الأفقي: y = b'))}</Label>
            <Formula x={320} y={178} size={20} color={STAGE}>y = 1 / (x − 2) + 1</Formula>
            <Label x={320} y={212} fontSize={16} fill={MUTED}>{pick(language, say('x = 2 eta y = 1', 'x = 2 e y = 1', 'x = 2 وy = 1'))}</Label>
            <Formula x={320} y={244} size={17} color={MUTED}>Dom f = ℝ − {'{2}'}</Formula>
            <Caption y={288} language={language} text={say('y = 1/x bera, 2 eskuinera eta 1 gora', 'La misma y = 1/x, 2 a la derecha y 1 hacia arriba', 'الدالة y = 1/x نفسها، 2 يمينًا و1 إلى الأعلى')} />
        </Figure>
    )
}

/* ---------- Square roots ---------- */

export function RootGraphFigure({ language }: { language: UnitLanguage }) {
    return (
        <Figure height={290} label={pick(language, say('Erro karratuen grafikoak', 'Gráficas de raíces cuadradas', 'رسوم الجذور التربيعية'))}>
            <Frame box={{ xMin: -4, xMax: 9, yMin: -3, yMax: 4 }} cell={21} ox={30} oy={34}>
                {(map, clip) => (
                    <g>
                        <PlanePath map={map} points={rootCurve(1, 0, 0, 9.5)} color={STAGE} width={3.4} clip={clip} />
                        <PlanePath map={map} points={rootCurve(1, -3, 0, 9.5)} color={SECOND} width={3.4} clip={clip} />
                        <PlanePath map={map} points={rootCurve(-1, 0, 0, 9.5)} color={MUSTARD} width={3.4} clip={clip} />
                        <PlanePoint map={map} point={[0, 0]} color={INK} radius={5} />
                        <PlanePoint map={map} point={[-3, 0]} color={SECOND} radius={5} />
                        {[1, 4, 9].map((x) => <PlanePoint key={x} map={map} point={[x, Math.sqrt(x)]} color={STAGE} radius={4} />)}
                    </g>
                )}
            </Frame>
            <Key x={330} y={62} color={STAGE} />
            <Formula x={366} y={62} color={STAGE}>y = √x</Formula>
            <Key x={330} y={94} color={SECOND} />
            <Formula x={366} y={94} color={SECOND}>y = √(x + 3)</Formula>
            <Key x={330} y={126} color={MUSTARD} />
            <Formula x={366} y={126} color={MUSTARD}>y = −√x</Formula>
            <Label x={330} y={168} fontSize={16} fill={INK}>{pick(language, say('Errokizuna ezin da negatiboa izan:', 'Lo de dentro no puede ser negativo:', 'لا يكون ما تحت الجذر سالبًا:'))}</Label>
            <Formula x={330} y={198} color={SECOND}>x + 3 ≥ 0  →  x ≥ −3</Formula>
            <Formula x={330} y={230} color={SECOND}>Dom = [−3, +∞)</Formula>
            <Caption y={278} language={language} text={say('Lagungarri: 0, 1, 4, 9 → 0, 1, 2, 3', 'Ayuda: 0, 1, 4, 9 → 0, 1, 2, 3', 'مساعدة: 0، 1، 4، 9 ← 0، 1، 2، 3')} />
        </Figure>
    )
}

/* ---------- Exponentials y = aˣ ---------- */

export function ExponentialFigure({ language }: { language: UnitLanguage }) {
    return (
        <Figure height={312} label={pick(language, say('y = 2ˣ eta y = (1/2)ˣ', 'y = 2ˣ e y = (1/2)ˣ', 'y = 2ˣ وy = (1/2)ˣ'))}>
            <Frame box={{ xMin: -4, xMax: 4, yMin: -1, yMax: 8 }} cell={27} ox={40} oy={30}>
                {(map, clip) => (
                    <g>
                        <PlanePath map={map} points={exponentialCurve(1, 2, -4.5, 3.2)} color={STAGE} width={3.4} clip={clip} />
                        <PlanePath map={map} points={exponentialCurve(1, 0.5, -3.2, 4.5)} color={SECOND} width={3.4} clip={clip} />
                        <PlanePoint map={map} point={[0, 1]} color={INK} radius={5.5} />
                        {[1, 2].map((x) => <PlanePoint key={x} map={map} point={[x, 2 ** x]} color={STAGE} radius={4} />)}
                        {[-1, -2].map((x) => <PlanePoint key={x} map={map} point={[x, 0.5 ** x]} color={SECOND} radius={4} />)}
                    </g>
                )}
            </Frame>
            <Key x={316} y={62} color={STAGE} />
            <Formula x={352} y={62} color={STAGE}>y = 2ˣ</Formula>
            <Label x={460} y={62} fontSize={16} fill={STAGE}>{pick(language, say('gorakorra', 'creciente', 'متزايدة'))}</Label>
            <Key x={316} y={96} color={SECOND} />
            <Formula x={352} y={96} color={SECOND}>y = (1/2)ˣ</Formula>
            <Label x={460} y={96} fontSize={16} fill={SECOND}>{pick(language, say('beherakorra', 'decreciente', 'متناقصة'))}</Label>
            <Label x={316} y={140} fontSize={16} fill={INK}>{pick(language, say('a > 1: gorakorra', 'a > 1: creciente', 'a > 1: متزايدة'))}</Label>
            <Label x={316} y={170} fontSize={16} fill={INK}>{pick(language, say('0 < a < 1: beherakorra', '0 < a < 1: decreciente', '0 < a < 1: متناقصة'))}</Label>
            <Label x={316} y={206} fontSize={16} fontWeight={700} fill={INK}>{pick(language, say('Beti (0, 1) puntutik', 'Siempre por (0, 1)', 'دائمًا عبر (0, 1)'))}</Label>
            <Label x={316} y={238} fontSize={16} fill={MUTED}>{pick(language, say('Asintota: y = 0', 'Asíntota: y = 0', 'المقارب: y = 0'))}</Label>
            <Caption y={300} language={language} text={say('Simetrikoak dira Y ardatzarekiko', 'Son simétricas respecto al eje Y', 'متماثلتان بالنسبة لمحور Y')} />
        </Figure>
    )
}

/* ---------- Growth y = k·aˣ ---------- */

export function GrowthFigure({ language }: { language: UnitLanguage }) {
    const values = [0, 1, 2, 3, 4].map((x) => 3 * 1.2 ** x)
    return (
        <Figure height={312} label={pick(language, say('y = 3 · 1,2ˣ hazkuntza', 'El crecimiento y = 3 · 1,2ˣ', 'النمو y = 3 · 1.2ˣ'))}>
            <Frame box={{ xMin: -2, xMax: 5, yMin: 0, yMax: 8 }} cell={28} ox={40} oy={30}>
                {(map, clip) => (
                    <g>
                        <PlanePath map={map} points={exponentialCurve(3, 1.2, -2, 5)} color={STAGE} width={3.4} clip={clip} />
                        {values.map((y, x) => <PlanePoint key={x} map={map} point={[x, y]} color={x === 0 ? SECOND : STAGE} radius={x === 0 ? 6 : 4.5} />)}
                    </g>
                )}
            </Frame>
            <Formula x={300} y={62} size={24} color={STAGE}>{`y = k · aˣ`}</Formula>
            <Label x={300} y={102} fontSize={16} fontWeight={700} fill={SECOND}>{pick(language, say('k = 3: hasierako balioa (x = 0)', 'k = 3: valor inicial (x = 0)', 'k = 3: القيمة الابتدائية (x = 0)'))}</Label>
            <Formula x={300} y={140} color={STAGE}>{`a = ${dec(language, '3,6')} / 3 = ${dec(language, '1,2')}`}</Formula>
            <Label x={300} y={176} fontSize={16} fill={INK}>{pick(language, say('Urrats bakoitzean % 20 gehiago', 'Cada paso, un 20 % más', 'كل خطوة تزيد 20 %'))}</Label>
            <Formula x={300} y={214} color={MUTED}>{`3 → ${dec(language, '3,6')} → ${dec(language, '4,32')} → ${dec(language, '5,18')}`}</Formula>
            <Label x={300} y={250} fontSize={16} fill={INK}>{pick(language, say('% 20 jaistean: a = 0,8', 'Si baja un 20 %: a = 0,8', 'إذا نقص 20 %: a = 0.8'))}</Label>
            <Caption y={300} language={language} text={say('Ehuneko berdina urrats bakoitzean: funtzio esponentziala', 'El mismo porcentaje en cada paso: función exponencial', 'النسبة نفسها في كل خطوة: دالة أسية')} />
        </Figure>
    )
}

/* ---------- The four models ---------- */

export function ModelsFigure({ language }: { language: UnitLanguage }) {
    const box = { xMin: -3, xMax: 3, yMin: -3, yMax: 3 }
    const panels: Array<{ name: LocalizedText; formula: string; draw: (map: PlaneMap, clip: string) => ReactNode }> = [
        { name: say('Lineala', 'Lineal', 'خطية'), formula: 'y = mx + n', draw: (map, clip) => <PlaneLine map={map} m={0.5} n={1} color={STAGE} clip={clip} /> },
        { name: say('Koadratikoa', 'Cuadrática', 'تربيعية'), formula: 'y = ax² + bx + c', draw: (map, clip) => <PlanePath map={map} points={sampled((x) => x * x - 2, -3.5, 3.5)} color={SECOND} width={3.2} clip={clip} /> },
        { name: say('Alderantzizkoa', 'Inversa', 'عكسية'), formula: 'y = k / x', draw: (map, clip) => hyperbolaBranches(2, 0, 0, -3.5, 3.5, -3, 3).map((points, index) => <PlanePath key={index} map={map} points={points} color={GREEN} width={3.2} clip={clip} />) },
        { name: say('Esponentziala', 'Exponencial', 'أسية'), formula: 'y = aˣ', draw: (map, clip) => <PlanePath map={map} points={exponentialCurve(1, 2, -3.5, 2)} color={MUSTARD} width={3.2} clip={clip} /> }
    ]
    return (
        <Figure height={296} label={pick(language, say('Lau funtzio-mota', 'Cuatro tipos de función', 'أربعة أنواع من الدوال'))}>
            {panels.map((panel, index) => (
                <g key={index}>
                    <Frame box={box} cell={24} ox={20 + index * 174} oy={40} labels={false}>
                        {(map, clip) => panel.draw(map, clip)}
                    </Frame>
                    <Label x={92 + index * 174} y={214} textAnchor="middle" fontSize={16} fontWeight={700} fill={INK}>{pick(language, panel.name)}</Label>
                    <Formula x={92 + index * 174} y={242} size={15} anchor="middle" color={MUTED}>{panel.formula}</Formula>
                </g>
            ))}
            <Caption y={282} language={language} text={say('Grafikoaren formak esaten du zein eredu aukeratu', 'La forma de la gráfica dice qué modelo elegir', 'شكل الرسم يحدد النموذج المناسب')} />
        </Figure>
    )
}

/* ---------- Hero art ---------- */

export function GraphsHeroArt() {
    const parabola = sampled((x) => 0.9 * (x - 4) ** 2, 0.6, 7.4, 0.1)
    const hyperbola = sampled((x) => 40 / x, 0.4, 5, 0.05)
    return (
        <div className="fraction-v2-collage" aria-hidden="true">
            <svg viewBox="0 0 520 400" direction="ltr" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                <g transform="translate(30 30) rotate(-4)">
                    <rect width={260} height={190} rx={16} fill={PAPER} stroke={INK} strokeWidth={2} />
                    <line x1={20} y1={165} x2={245} y2={165} stroke={INK} strokeWidth={2} />
                    <line x1={130} y1={175} x2={130} y2={15} stroke={INK} strokeWidth={2} />
                    <polyline points={parabola.map(([x, y]) => `${x * 30 + 10},${150 - y * 11}`).join(' ')} fill="none" stroke="#2f6fdb" strokeWidth={4} strokeLinecap="round" />
                    <circle cx={130} cy={150} r={7} fill="#c4432a" />
                </g>
                <g transform="translate(320 50) rotate(5)">
                    <rect width={170} height={150} rx={16} fill="#d6eddf" stroke={INK} strokeWidth={2} />
                    <line x1={20} y1={130} x2={155} y2={130} stroke={INK} strokeWidth={2} />
                    <line x1={20} y1={135} x2={20} y2={15} stroke={INK} strokeWidth={2} />
                    <polyline points={hyperbola.map(([x, y]) => `${20 + x * 26},${130 - Math.min(y, 110)}`).join(' ')} fill="none" stroke="#267b53" strokeWidth={4} strokeLinecap="round" />
                </g>
                <g transform="translate(50 260) rotate(2)">
                    <rect width={420} height={90} rx={16} fill="#fbebc0" stroke={INK} strokeWidth={2} />
                    <text x={210} y={58} textAnchor="middle" fontSize={28} fontWeight={700} fill={INK} fontFamily={SERIF}>y = mx + n · y = ax² · y = k/x</text>
                </g>
            </svg>
        </div>
    )
}
