import type { ReactNode } from 'react'
import { pickText, type LocalizedText, type UnitLanguage } from '../../features/unit-v2/types'
import { AxisTitles, Label, PlaneGrid, PlaneLine, PlanePath, PlanePoint } from '../dbh2-funtzioak-v2/plane'
import { useBoxClip } from '../dbh2-funtzioak-v2/planeClip'
import { planeMap, type PlaneBox, type PlaneMap } from '../dbh2-funtzioak-v2/planeMap'
import { Figure } from '../dbh2-zatikiak-prototype/figures'
import { sampled } from '../dbh4-aplikatuak-grafikoa/functions'
import { decimalSeparatorFor } from '../../utils/numberFormat'

/* ==========================================================================
   Funtzio esponentzialak, logaritmikoak eta trigonometrikoak · 4. DBH
   akademikoak — the new lesson figures: y = 2ˣ moved right and up, a
   half-life, an exponential equation read on the graph, y = log₂ x as the
   mirror of y = 2ˣ, shifted logarithms, the sine and the cosine on an
   axis marked in radians, the amplitude A·sen x, the period of sen kx and
   the tangent with its asymptotes. y = aˣ, growth k·aˣ, the definition of
   a logarithm and the unit circle reuse the 4. DBH aplikatuak and
   akademikoak figures. Formulas sit in their own <text> (left to right in
   every language); words go through <Label>. Spanish writes «sen» and
   «tg», Basque «sin» and «tg», Arabic «sin» and «tan».
   ========================================================================== */

const INK = 'var(--ink, #1d2733)'
const MUTED = 'var(--muted, #58616e)'
const STAGE = 'var(--stage, #2f6fdb)'
const SECOND = 'var(--second, #c4432a)'
const GREEN = 'var(--success, #267b53)'
const MUSTARD = 'var(--mustard, #e0a100)'
const CARD = 'var(--card, #fffcf6)'
const GRID = 'var(--line, #d8d2c4)'
const PAPER = '#fffcf6'
const SERIF = 'Fraunces, serif'

type Point = [number, number]

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const useText = (language: UnitLanguage) => (text: LocalizedText) => pickText(language, text)
/** A number written with the comma, shown with the point in Arabic */
const num = (language: UnitLanguage, text: string) => (language === 'ar' ? text.replace(/,/g, '.') : text.replace(/,/g, decimalSeparatorFor(language)))
/** The names of the ratios: sen / sin, tg / tan */
const sen = (language: UnitLanguage) => (language === 'es' ? 'sen' : 'sin')
const tg = (language: UnitLanguage) => (language === 'ar' || language === 'en' ? 'tan' : 'tg')
const trig = (language: UnitLanguage, text: string) => text.replace(/\bsen\b/g, sen(language)).replace(/\btg\b/g, tg(language))

function Caption({ y, children, x = 360 }: { y: number; children: ReactNode; x?: number }) {
    return <Label x={x} y={y} textAnchor="middle" fontSize={15} fill={MUTED}>{children}</Label>
}

/** A formula written left to right whatever the language */
function F({ x, y, children, size = 19, color = INK, anchor = 'start', weight = 700 }: { x: number; y: number; children: ReactNode; size?: number; color?: string; anchor?: 'start' | 'middle' | 'end'; weight?: number }) {
    return <text x={x} y={y} textAnchor={anchor} fontSize={size} fontWeight={weight} fill={color} direction="ltr">{children}</text>
}

/** A raised exponent inside an F formula */
function Up({ children }: { children: ReactNode }) {
    return <tspan dy={-8} fontSize="72%">{children}</tspan>
}
/** Back to the base line after an Up */
function Down({ children }: { children: ReactNode }) {
    return <tspan dy={8}>{children}</tspan>
}

/** A short coloured stroke used as a legend key */
function Key({ x, y, color, dashed = false }: { x: number; y: number; color: string; dashed?: boolean }) {
    return <line x1={x} y1={y - 6} x2={x + 26} y2={y - 6} stroke={color} strokeWidth={4} strokeLinecap="round" strokeDasharray={dashed ? '6 5' : undefined} />
}

/** A small Cartesian plane placed at (ox, oy) inside a figure */
function Frame({ box, cell, ox, oy, labelStep = 1, xUnit, yUnit, children }: { box: PlaneBox; cell: number; ox: number; oy: number; labelStep?: number; xUnit?: number; yUnit?: number; children?: (map: PlaneMap, clip: string) => ReactNode }) {
    const map = planeMap(box, cell, ox, oy)
    const [clipPath, clip] = useBoxClip(map)
    return (
        <g>
            <defs>{clipPath}</defs>
            <rect x={ox} y={oy} width={map.width} height={map.height} fill={CARD} />
            <PlaneGrid map={map} labelStep={labelStep} xUnit={xUnit} yUnit={yUnit} />
            <AxisTitles map={map} />
            {children?.(map, clip)}
        </g>
    )
}

/** A dashed line across the box: vertical (x = value) or horizontal (y = value) */
function Dashed({ map, x, y, color = MUTED }: { map: PlaneMap; x?: number; y?: number; color?: string }) {
    const { box } = map
    return x !== undefined
        ? <line x1={map.x(x)} y1={map.y(box.yMin)} x2={map.x(x)} y2={map.y(box.yMax)} stroke={color} strokeWidth={2} strokeDasharray="7 5" />
        : <line x1={map.x(box.xMin)} y1={map.y(y!)} x2={map.x(box.xMax)} y2={map.y(y!)} stroke={color} strokeWidth={2} strokeDasharray="7 5" />
}

/* ---------- A plane for trigonometric graphs: x in radians ---------- */

const HALF_PI = Math.PI / 2
const piLabel = (quarters: number) => ({ [-1]: '−π/2', 0: '0', 1: 'π/2', 2: 'π', 3: '3π/2', 4: '2π', 5: '5π/2' } as Record<number, string>)[quarters] ?? ''

/**
 * x from −π/2 to 5π/2 (or the given half-π steps), y from −yMax to yMax.
 * The draw callback gets the mapping functions.
 */
function TrigPlane({ ox, oy, width, height, yMax = 2, fromQuarter = -1, toQuarter = 5, yLabels = [-1, 1], children }: {
    ox: number
    oy: number
    width: number
    height: number
    yMax?: number
    fromQuarter?: number
    toQuarter?: number
    yLabels?: number[]
    children: (x: (value: number) => number, y: (value: number) => number, clip: string) => ReactNode
}) {
    const xMin = fromQuarter * HALF_PI
    const xMax = toQuarter * HALF_PI
    const x = (value: number) => ox + ((value - xMin) / (xMax - xMin)) * width
    const y = (value: number) => oy + height / 2 - (value / yMax) * (height / 2)
    const clipId = `trig-clip-${ox}-${oy}-${width}`
    const quarters = Array.from({ length: toQuarter - fromQuarter + 1 }, (_, index) => fromQuarter + index)
    return (
        <g>
            <defs><clipPath id={clipId}><rect x={ox} y={oy} width={width} height={height} /></clipPath></defs>
            <rect x={ox} y={oy} width={width} height={height} fill={CARD} />
            {quarters.map((quarter) => <line key={quarter} x1={x(quarter * HALF_PI)} y1={oy} x2={x(quarter * HALF_PI)} y2={oy + height} stroke={GRID} strokeWidth={1} />)}
            {Array.from({ length: 2 * yMax + 1 }, (_, index) => index - yMax).map((value) => <line key={value} x1={ox} y1={y(value)} x2={ox + width} y2={y(value)} stroke={GRID} strokeWidth={1} />)}
            <line x1={ox} y1={y(0)} x2={ox + width + 10} y2={y(0)} stroke={INK} strokeWidth={2} />
            <line x1={x(0)} y1={oy + height} x2={x(0)} y2={oy - 8} stroke={INK} strokeWidth={2} />
            {quarters.filter((quarter) => quarter !== 0).map((quarter) => <F key={quarter} x={x(quarter * HALF_PI)} y={y(0) + 20} size={13} anchor="middle" color={MUTED} weight={400}>{piLabel(quarter)}</F>)}
            {yLabels.map((value) => <F key={value} x={x(0) - 7} y={y(value) + 5} size={13} anchor="end" color={MUTED} weight={400}>{value < 0 ? `−${-value}` : value}</F>)}
            <F x={ox + width + 14} y={y(0) + 5} size={15} weight={700} color={INK}>x</F>
            <F x={x(0) + 6} y={oy - 8} size={15} weight={700} color={INK}>y</F>
            {children(x, y, `url(#${clipId})`)}
        </g>
    )
}

/** A curve y = f(x) drawn in a TrigPlane */
function TrigCurve({ f, x, y, from, to, color, clip, width = 3.4, dashed = false }: { f: (value: number) => number; x: (value: number) => number; y: (value: number) => number; from: number; to: number; color: string; clip: string; width?: number; dashed?: boolean }) {
    const points = sampled(f, from, to, 0.02)
    return <polyline points={points.map(([px, py]) => `${x(px)},${y(py)}`).join(' ')} fill="none" stroke={color} strokeWidth={width} strokeLinejoin="round" strokeLinecap="round" strokeDasharray={dashed ? '7 6' : undefined} clipPath={clip} />
}

/* ---------- 1. y = 2ˣ moved ---------- */

export function ExpShiftFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    return (
        <Figure height={322} label={t(say('y = 2ˣ eta y = 2ˣ⁻² + 1', 'y = 2ˣ e y = 2ˣ⁻² + 1', 'y = 2ˣ وy = 2ˣ⁻² + 1', 'y = 2ˣ and y = 2ˣ⁻² + 1'))}>
            <Frame box={{ xMin: -3, xMax: 5, yMin: -1, yMax: 8 }} cell={28} ox={40} oy={30}>
                {(map, clip) => (
                    <g>
                        <Dashed map={map} y={1} />
                        <PlanePath map={map} points={sampled((x) => 2 ** x, -3.5, 3.2)} color={MUTED} width={2.6} clip={clip} />
                        <PlanePath map={map} points={sampled((x) => 2 ** (x - 2) + 1, -3.5, 5.2)} color={STAGE} width={3.6} clip={clip} />
                        <PlanePoint map={map} point={[0, 1]} color={MUTED} radius={5} />
                        <PlanePoint map={map} point={[2, 2]} color={SECOND} radius={6} />
                    </g>
                )}
            </Frame>
            <Key x={300} y={60} color={MUTED} />
            <F x={336} y={60} color={MUTED}>y = 2<Up>x</Up></F>
            <Key x={300} y={96} color={STAGE} />
            <F x={336} y={96} color={STAGE}>y = 2<Up>x − 2</Up><Down> + 1</Down></F>
            <Label x={300} y={140} fontSize={16} fill={INK}>{t(say('Berretzailean −2: 2 eskuinera', 'En el exponente −2: 2 a la derecha', 'في الأس −2: وحدتان إلى اليمين', 'In the exponent −2: 2 to the right'))}</Label>
            <Label x={300} y={170} fontSize={16} fill={INK}>{t(say('Kanpoan +1: 1 gora', 'Fuera +1: 1 hacia arriba', 'في الخارج +1: وحدة إلى الأعلى', 'Outside +1: 1 up'))}</Label>
            <F x={300} y={212} color={SECOND}>(0, 1)  →  (2, 2)</F>
            <Label x={300} y={250} fontSize={16} fill={MUTED}>{t(say('Asintota ere igotzen da:', 'La asíntota también sube:', 'يصعد المقارب أيضًا:', 'The asymptote also moves up:'))}</Label>
            <F x={300} y={278} color={MUTED}>y = 0  →  y = 1</F>
            <Caption y={312}>{t(say('Forma bera; puntu guztiak batera mugitzen dira', 'La misma forma; todos los puntos se mueven a la vez', 'الشكل نفسه؛ تتحرك كل النقاط معًا', 'The same shape; all the points move at once'))}</Caption>
        </Figure>
    )
}

/* ---------- 2. Half-life ---------- */

export function DecayFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const values: Point[] = [[0, 80], [5, 40], [10, 20], [15, 10], [20, 5]]
    // One square: 5 years across, 10 g up
    return (
        <Figure height={322} label={t(say('Erdibizitza: m = 80 · (1/2)^(t/5)', 'Periodo de semidesintegración: m = 80 · (1/2)^(t/5)', 'عمر النصف: m = 80 · (1/2)^(t/5)', 'Half-life: m = 80 · (1/2)^(t/5)'))}>
            <Frame box={{ xMin: 0, xMax: 5, yMin: 0, yMax: 8 }} cell={30} ox={60} oy={30} xUnit={5} yUnit={10} labelStep={2}>
                {(map, clip) => (
                    <g>
                        <PlanePath map={map} points={sampled((x) => 8 * 0.5 ** x, 0, 5.2)} color={STAGE} width={3.6} clip={clip} />
                        {values.map(([years, grams], index) => <PlanePoint key={years} map={map} point={[index, grams / 10]} color={index === 0 ? SECOND : STAGE} radius={5} />)}
                    </g>
                )}
            </Frame>
            <F x={250} y={64} size={20}>m = 80 · (1/2)<Up>t/5</Up></F>
            <Label x={250} y={102} fontSize={16} fill={SECOND}>{t(say('80 g hasieran (t = 0)', '80 g al principio (t = 0)', '80 غ في البداية (t = 0)', '80 g at the start (t = 0)'))}</Label>
            <Label x={250} y={136} fontSize={16} fill={INK}>{t(say('5 urtero, erdia geratzen da:', 'Cada 5 años queda la mitad:', 'كل 5 سنوات يبقى النصف:', 'Every 5 years, half is left:'))}</Label>
            <F x={262} y={168} color={STAGE}>80 → 40 → 20 → 10 → 5</F>
            <Label x={250} y={206} fontSize={16} fill={INK}>{t(say('Urte bakoitzeko faktorea:', 'El factor de cada año:', 'معامل كل سنة:', 'The factor for each year:'))}</Label>
            <F x={262} y={238} color={MUTED}>(1/2)<Up>1/5</Up><Down>{num(language, ' ≈ 0,87')}</Down></F>
            <Caption y={306}>{t(say('Beherakorra, baina inoiz ez da 0 izaten', 'Decreciente, pero nunca llega a 0', 'متناقصة لكنها لا تبلغ 0 أبدًا', 'Decreasing, but it never reaches 0'))}</Caption>
        </Figure>
    )
}

/* ---------- 3. An exponential equation on the graph ---------- */

export function ExpEquationFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    return (
        <Figure height={322} label={t(say('2ˣ = 8 ekuazioa grafikoan', 'La ecuación 2ˣ = 8 en la gráfica', 'المعادلة 2ˣ = 8 على الرسم', 'The equation 2ˣ = 8 on the graph'))}>
            <Frame box={{ xMin: -2, xMax: 4, yMin: -1, yMax: 9 }} cell={25} ox={50} oy={30}>
                {(map, clip) => (
                    <g>
                        <PlaneLine map={map} m={0} n={8} color={SECOND} clip={clip} />
                        <PlanePath map={map} points={sampled((x) => 2 ** x, -2.5, 3.3)} color={STAGE} width={3.6} clip={clip} />
                        <Dashed map={map} x={3} color={GREEN} />
                        <PlanePoint map={map} point={[3, 8]} color={GREEN} radius={6.5} />
                    </g>
                )}
            </Frame>
            <F x={290} y={62} size={22}>2<Up>x</Up><Down> = 8</Down></F>
            <Label x={290} y={102} fontSize={16} fill={INK}>{t(say('Idatzi bi aldeak oinarri berarekin:', 'Escribe los dos lados con la misma base:', 'اكتب الطرفين بالأساس نفسه:', 'Write both sides with the same base:'))}</Label>
            <F x={306} y={136}>2<Up>x</Up><Down> = 2</Down><Up>3</Up></F>
            <Label x={290} y={176} fontSize={16} fill={INK}>{t(say('Oinarri berdinak, berretzaile berdinak:', 'Bases iguales, exponentes iguales:', 'أساسان متساويان، أسّان متساويان:', 'Equal bases, equal exponents:'))}</Label>
            <F x={306} y={208} color={GREEN}>x = 3</F>
            <Label x={290} y={246} fontSize={16} fill={MUTED}>{t(say('Ez badago oinarri bera, logaritmoak:', 'Si no hay la misma base, logaritmos:', 'إن لم يكن الأساس نفسه فاللوغاريتمات:', 'If the bases are not the same, use logarithms:'))}</Label>
            <F x={306} y={276} color={MUTED}>2<Up>x</Up><Down>{num(language, ' = 10  →  x = log 10 / log 2 ≈ 3,32')}</Down></F>
            <Caption y={312}>{t(say('Ebazpena: kurbaren eta zuzen horizontalaren ebaki-puntua', 'La solución: el corte de la curva con la recta horizontal', 'الحل: تقاطع المنحنى مع المستقيم الأفقي', 'The solution: where the curve crosses the horizontal line'))}</Caption>
        </Figure>
    )
}

/* ---------- 4. y = log₂ x, the mirror of y = 2ˣ ---------- */

export function LogGraphFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    return (
        <Figure height={322} label={t(say('y = log₂ x eta y = 2ˣ, y = x zuzenarekiko simetrikoak', 'y = log₂ x e y = 2ˣ, simétricas respecto a y = x', 'y = log₂ x وy = 2ˣ متماثلتان بالنسبة إلى y = x', 'y = log₂ x and y = 2ˣ, symmetrical about y = x'))}>
            <Frame box={{ xMin: -3, xMax: 5, yMin: -3, yMax: 5 }} cell={30} ox={40} oy={30}>
                {(map, clip) => (
                    <g>
                        <PlaneLine map={map} m={1} n={0} color={MUTED} width={2} dashed clip={clip} />
                        <PlanePath map={map} points={sampled((x) => 2 ** x, -3.5, 2.4)} color={MUSTARD} width={3} clip={clip} />
                        <PlanePath map={map} points={sampled((x) => Math.log2(x), 0.11, 5.5, 0.01)} color={STAGE} width={3.6} clip={clip} />
                        <PlanePoint map={map} point={[1, 0]} color={STAGE} radius={5.5} />
                        <PlanePoint map={map} point={[2, 1]} color={STAGE} radius={5} />
                        <PlanePoint map={map} point={[4, 2]} color={STAGE} radius={5} />
                        <PlanePoint map={map} point={[0, 1]} color={MUSTARD} radius={5} />
                    </g>
                )}
            </Frame>
            <Key x={316} y={60} color={STAGE} />
            <F x={352} y={60} color={STAGE}>y = log<tspan dy={5} fontSize="70%">2</tspan><tspan dy={-5}> x</tspan></F>
            <Key x={316} y={94} color={MUSTARD} />
            <F x={352} y={94} color={MUSTARD}>y = 2<Up>x</Up></F>
            <Label x={316} y={136} fontSize={16} fill={INK}>{t(say('(1, 0) puntutik pasatzen da beti', 'Pasa siempre por (1, 0)', 'يمر دائمًا بالنقطة (1, 0)', 'Always passes through (1, 0)'))}</Label>
            <Label x={316} y={166} fontSize={16} fill={INK}>{t(say('Izate-eremua:', 'Dominio:', 'المجال:', 'Domain:'))}</Label>
            <F x={430} y={166} color={SECOND}>(0, +∞)</F>
            <Label x={316} y={196} fontSize={16} fill={INK}>{t(say('Asintota bertikala:', 'Asíntota vertical:', 'المقارب الرأسي:', 'Vertical asymptote:'))}</Label>
            <F x={480} y={196} color={SECOND}>x = 0</F>
            <F x={316} y={238} color={STAGE} size={17}>1 → 0 · 2 → 1 · 4 → 2 · 8 → 3</F>
            <Caption y={312}>{t(say('Alderantzizkoak dira: x eta y trukatzen dira', 'Son inversas: se intercambian x e y', 'دالتان عكسيتان: يتبادل x وy', 'They are inverses: x and y swap places'))}</Caption>
        </Figure>
    )
}

/* ---------- 5. Shifted logarithms ---------- */

export function LogShiftFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    return (
        <Figure height={322} label={t(say('y = log₂ x eta y = log₂(x + 2)', 'y = log₂ x e y = log₂(x + 2)', 'y = log₂ x وy = log₂(x + 2)', 'y = log₂ x and y = log₂(x + 2)'))}>
            <Frame box={{ xMin: -3, xMax: 6, yMin: -3, yMax: 4 }} cell={28} ox={40} oy={36}>
                {(map, clip) => (
                    <g>
                        <Dashed map={map} x={-2} color={SECOND} />
                        <PlanePath map={map} points={sampled((x) => Math.log2(x), 0.1, 6.5, 0.01)} color={MUTED} width={2.6} clip={clip} />
                        <PlanePath map={map} points={sampled((x) => Math.log2(x + 2), -1.92, 6.5, 0.01)} color={STAGE} width={3.6} clip={clip} />
                        <PlanePoint map={map} point={[-1, 0]} color={SECOND} radius={6} />
                        <PlanePoint map={map} point={[0, 1]} color={STAGE} radius={5} />
                    </g>
                )}
            </Frame>
            <Key x={316} y={60} color={MUTED} />
            <F x={352} y={60} color={MUTED}>y = log<tspan dy={5} fontSize="70%">2</tspan><tspan dy={-5}> x</tspan></F>
            <Key x={316} y={94} color={STAGE} />
            <F x={352} y={94} color={STAGE}>y = log<tspan dy={5} fontSize="70%">2</tspan><tspan dy={-5}>(x + 2)</tspan></F>
            <Label x={316} y={136} fontSize={16} fill={INK}>{t(say('2 ezkerrera mugitzen da', 'Se mueve 2 a la izquierda', 'ينتقل وحدتين إلى اليسار', 'It moves 2 to the left'))}</Label>
            <Label x={316} y={168} fontSize={16} fill={INK}>{t(say('Barrukoa positiboa izan behar da:', 'Lo de dentro tiene que ser positivo:', 'يجب أن يكون ما بالداخل موجبًا:', 'What is inside must be positive:'))}</Label>
            <F x={330} y={198} color={SECOND}>x + 2 &gt; 0  →  x &gt; −2</F>
            <F x={330} y={232} color={SECOND}>Dom = (−2, +∞)</F>
            <F x={330} y={266} color={STAGE}>(1, 0)  →  (−1, 0)</F>
            <Caption y={312}>{t(say('Asintota ere mugitzen da: x = −2', 'La asíntota también se mueve: x = −2', 'يتحرك المقارب أيضًا: x = −2', 'The asymptote also moves: x = −2'))}</Caption>
        </Figure>
    )
}

/* ---------- 6. The sine ---------- */

export function SineFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    return (
        <Figure height={300} label={t(say('y = sin x funtzioa', 'La función y = sen x', 'الدالة y = sin x', 'The function y = sin x'))}>
            <TrigPlane ox={36} oy={40} width={470} height={170} yMax={2} fromQuarter={-1} toQuarter={5}>
                {(x, y, clip) => (
                    <g>
                        <TrigCurve f={Math.sin} x={x} y={y} from={-HALF_PI} to={5 * HALF_PI} color={STAGE} clip={clip} />
                        <circle cx={x(HALF_PI)} cy={y(1)} r={6} fill={SECOND} stroke={CARD} strokeWidth={2} />
                        <circle cx={x(3 * HALF_PI)} cy={y(-1)} r={6} fill={GREEN} stroke={CARD} strokeWidth={2} />
                        {[0, 2, 4].map((quarter) => <circle key={quarter} cx={x(quarter * HALF_PI)} cy={y(0)} r={5} fill={INK} stroke={CARD} strokeWidth={2} />)}
                    </g>
                )}
            </TrigPlane>
            <F x={540} y={70} size={21} color={STAGE}>{trig(language, 'y = sen x')}</F>
            <Label x={540} y={106} fontSize={15} fill={SECOND}>{t(say('Maximoa:', 'Máximo:', 'العظمى:', 'Maximum:'))}</Label>
            <F x={540} y={128} size={16} color={SECOND}>(π/2, 1)</F>
            <Label x={540} y={160} fontSize={15} fill={GREEN}>{t(say('Minimoa:', 'Mínimo:', 'الصغرى:', 'Minimum:'))}</Label>
            <F x={540} y={182} size={16} color={GREEN}>(3π/2, −1)</F>
            <Label x={540} y={214} fontSize={15} fill={INK}>{t(say('Periodoa:', 'Periodo:', 'الدور:', 'Period:'))}</Label>
            <F x={540} y={236} size={16}>T = 2π</F>
            <F x={270} y={256} size={16} anchor="middle">Dom = ℝ · {t(say('Rec', 'Rec', 'Rec', 'Range'))} = [−1, 1]</F>
            <Caption y={288}>{t(say('Zirkunferentzia unitarioko puntuaren altuera, angeluaren arabera', 'La altura del punto de la circunferencia unidad según el ángulo', 'ارتفاع نقطة دائرة الوحدة بحسب الزاوية', 'The height of the point on the unit circle, depending on the angle'))}</Caption>
        </Figure>
    )
}

/* ---------- 7. The cosine ---------- */

export function CosineFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    return (
        <Figure height={300} label={t(say('y = cos x eta y = sin x', 'y = cos x e y = sen x', 'y = cos x وy = sin x', 'y = cos x and y = sin x'))}>
            <TrigPlane ox={36} oy={40} width={470} height={170} yMax={2} fromQuarter={-1} toQuarter={5}>
                {(x, y, clip) => (
                    <g>
                        <TrigCurve f={Math.sin} x={x} y={y} from={-HALF_PI} to={5 * HALF_PI} color={MUTED} clip={clip} width={2.4} dashed />
                        <TrigCurve f={Math.cos} x={x} y={y} from={-HALF_PI} to={5 * HALF_PI} color={STAGE} clip={clip} />
                        <circle cx={x(0)} cy={y(1)} r={6} fill={SECOND} stroke={CARD} strokeWidth={2} />
                        <circle cx={x(2 * HALF_PI)} cy={y(-1)} r={6} fill={GREEN} stroke={CARD} strokeWidth={2} />
                        {[1, 3].map((quarter) => <circle key={quarter} cx={x(quarter * HALF_PI)} cy={y(0)} r={5} fill={INK} stroke={CARD} strokeWidth={2} />)}
                    </g>
                )}
            </TrigPlane>
            <Key x={540} y={64} color={STAGE} />
            <F x={574} y={64} size={19} color={STAGE}>y = cos x</F>
            <Key x={540} y={96} color={MUTED} dashed />
            <F x={574} y={96} size={19} color={MUTED}>{trig(language, 'y = sen x')}</F>
            <Label x={540} y={134} fontSize={15} fill={SECOND}>{t(say('Maximoa:', 'Máximo:', 'العظمى:', 'Maximum:'))}</Label>
            <F x={540} y={156} size={16} color={SECOND}>(0, 1)</F>
            <Label x={540} y={188} fontSize={15} fill={INK}>{t(say('Zeroak:', 'Ceros:', 'الأصفار:', 'Zeros:'))}</Label>
            <F x={540} y={210} size={16}>π/2, 3π/2</F>
            <F x={270} y={256} size={16} anchor="middle">{trig(language, 'cos x = sen (x + π/2)')}</F>
            <Caption y={288}>{t(say('Kosinua sinua bera da, π/2 ezkerrera', 'El coseno es el mismo seno, π/2 a la izquierda', 'جيب التمام هو الجيب نفسه منسحبًا π/2 إلى اليسار', 'Cosine is the same as sine, π/2 to the left'))}</Caption>
        </Figure>
    )
}

/* ---------- 8. The amplitude A · sen x ---------- */

export function AmplitudeFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    return (
        <Figure height={300} label={t(say('y = 2 sin x eta y = sin x + 1', 'y = 2 sen x e y = sen x + 1', 'y = 2 sin x وy = sin x + 1', 'y = 2 sin x and y = sin x + 1'))}>
            <TrigPlane ox={36} oy={30} width={470} height={200} yMax={3} fromQuarter={-1} toQuarter={5} yLabels={[-2, -1, 1, 2]}>
                {(x, y, clip) => (
                    <g>
                        <TrigCurve f={Math.sin} x={x} y={y} from={-HALF_PI} to={5 * HALF_PI} color={MUTED} clip={clip} width={2.2} dashed />
                        <TrigCurve f={(value) => 2 * Math.sin(value)} x={x} y={y} from={-HALF_PI} to={5 * HALF_PI} color={STAGE} clip={clip} />
                        <TrigCurve f={(value) => Math.sin(value) + 1} x={x} y={y} from={-HALF_PI} to={5 * HALF_PI} color={SECOND} clip={clip} />
                    </g>
                )}
            </TrigPlane>
            <Key x={540} y={58} color={STAGE} />
            <F x={574} y={58} size={18} color={STAGE}>{trig(language, 'y = 2 sen x')}</F>
            <F x={540} y={86} size={15} color={STAGE} weight={400}>[−2, 2]</F>
            <Key x={540} y={124} color={SECOND} />
            <F x={574} y={124} size={18} color={SECOND}>{trig(language, 'y = sen x + 1')}</F>
            <F x={540} y={152} size={15} color={SECOND} weight={400}>[0, 2]</F>
            <Key x={540} y={190} color={MUTED} dashed />
            <F x={574} y={190} size={18} color={MUTED}>{trig(language, 'y = sen x')}</F>
            <Label x={270} y={258} textAnchor="middle" fontSize={15} fill={INK}>{t(say('Biderkatzaileak gailurrak luzatzen ditu; batugaiak kurba osoa igotzen du', 'El factor estira las crestas; el sumando sube toda la curva', 'المعامل يمدّ القمم؛ والحد المضاف يرفع المنحنى كله', 'The factor stretches the peaks; the added number raises the whole curve'))}</Label>
            <Caption y={288}>{t(say('Periodoa ez da aldatzen: 2π', 'El periodo no cambia: 2π', 'الدور لا يتغير: 2π', 'The period does not change: 2π'))}</Caption>
        </Figure>
    )
}

/* ---------- 9. The period of sen kx ---------- */

export function PeriodFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    return (
        <Figure height={300} label={t(say('y = sin 2x funtzioaren periodoa', 'El periodo de y = sen 2x', 'دور y = sin 2x', 'The period of y = sin 2x'))}>
            <TrigPlane ox={36} oy={40} width={470} height={170} yMax={2} fromQuarter={-1} toQuarter={5}>
                {(x, y, clip) => (
                    <g>
                        <TrigCurve f={Math.sin} x={x} y={y} from={-HALF_PI} to={5 * HALF_PI} color={MUTED} clip={clip} width={2.2} dashed />
                        <TrigCurve f={(value) => Math.sin(2 * value)} x={x} y={y} from={-HALF_PI} to={5 * HALF_PI} color={STAGE} clip={clip} />
                        <line x1={x(0)} y1={y(-1.6)} x2={x(Math.PI)} y2={y(-1.6)} stroke={SECOND} strokeWidth={3} />
                        <line x1={x(0)} y1={y(-1.4)} x2={x(0)} y2={y(-1.8)} stroke={SECOND} strokeWidth={3} />
                        <line x1={x(Math.PI)} y1={y(-1.4)} x2={x(Math.PI)} y2={y(-1.8)} stroke={SECOND} strokeWidth={3} />
                    </g>
                )}
            </TrigPlane>
            <F x={540} y={70} size={20} color={STAGE}>{trig(language, 'y = sen 2x')}</F>
            <Label x={540} y={108} fontSize={15} fill={INK}>{t(say('Bi aldiz azkarrago:', 'El doble de rápida:', 'أسرع مرتين:', 'Twice as fast:'))}</Label>
            <F x={540} y={140} size={18} color={SECOND}>T = 2π / 2 = π</F>
            <Label x={540} y={180} fontSize={15} fill={INK}>{t(say('Orokorrean:', 'En general:', 'عمومًا:', 'In general:'))}</Label>
            <F x={540} y={210} size={18}>T = 2π / k</F>
            <F x={270} y={256} size={16} anchor="middle">{trig(language, 'sen (2(x + π)) = sen (2x + 2π) = sen 2x')}</F>
            <Caption y={288}>{t(say('k handiagoa: uhin estuagoak; altuera ez da aldatzen', 'k mayor: ondas más apretadas; la altura no cambia', 'k أكبر: موجات أضيق؛ والارتفاع لا يتغير', 'Larger k: waves closer together; the height does not change'))}</Caption>
        </Figure>
    )
}

/* ---------- 10. The tangent ---------- */

export function TangentFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    return (
        <Figure height={300} label={t(say('y = tg x funtzioa eta haren asintotak', 'La función y = tg x y sus asíntotas', 'الدالة y = tan x ومقارباتها', 'The function y = tan x and its asymptotes'))}>
            <TrigPlane ox={36} oy={30} width={470} height={200} yMax={3} fromQuarter={-1} toQuarter={5} yLabels={[-2, -1, 1, 2]}>
                {(x, y, clip) => (
                    <g>
                        {[-1, 1, 3, 5].map((quarter) => <line key={quarter} x1={x(quarter * HALF_PI)} y1={y(3)} x2={x(quarter * HALF_PI)} y2={y(-3)} stroke={SECOND} strokeWidth={2} strokeDasharray="7 5" />)}
                        {[0, 2, 4].map((center) => (
                            <TrigCurve key={center} f={Math.tan} x={x} y={y} from={center * HALF_PI - 1.25} to={Math.min(center * HALF_PI + 1.25, 5 * HALF_PI)} color={STAGE} clip={clip} />
                        ))}
                        {[0, 2, 4].map((quarter) => <circle key={quarter} cx={x(quarter * HALF_PI)} cy={y(0)} r={5} fill={INK} stroke={CARD} strokeWidth={2} />)}
                    </g>
                )}
            </TrigPlane>
            <F x={540} y={66} size={20} color={STAGE}>{trig(language, 'y = tg x')}</F>
            <F x={540} y={98} size={16}>{trig(language, 'tg x = sen x / cos x')}</F>
            <Label x={540} y={136} fontSize={15} fill={SECOND}>{t(say('Asintotak:', 'Asíntotas:', 'المقاربات:', 'Asymptotes:'))}</Label>
            <F x={540} y={162} size={16} color={SECOND}>x = π/2, 3π/2…</F>
            <Label x={540} y={198} fontSize={15} fill={INK}>{t(say('Periodoa:', 'Periodo:', 'الدور:', 'Period:'))}</Label>
            <F x={540} y={222} size={16}>T = π</F>
            <Label x={270} y={258} textAnchor="middle" fontSize={15} fill={INK}>{t(say('Adar bakoitzean gorakorra da', 'Es creciente en cada rama', 'متزايدة في كل فرع', 'It is increasing on each branch'))}</Label>
            <Caption y={288}>{t(say('Izate-eremutik kanpo geratzen dira cos x = 0 egiten duten puntuak', 'Quedan fuera del dominio los puntos donde cos x = 0', 'تخرج من المجال النقاط التي يكون فيها cos x = 0', 'Points where cos x = 0 are outside the domain'))}</Caption>
        </Figure>
    )
}

/* ---------- Hero art ---------- */

export function ExponentialAkHeroArt() {
    const growth = sampled((x) => 2 ** x, -3, 2.8, 0.05)
    const logarithm = sampled((x) => Math.log2(x), 0.15, 7, 0.05)
    const wave = sampled((x) => Math.sin(x), 0, 4 * Math.PI, 0.05)
    return (
        <div className="fraction-v2-collage" aria-hidden="true">
            <svg viewBox="0 0 520 400" direction="ltr" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                <g transform="translate(30 30) rotate(-4)">
                    <rect width={230} height={190} rx={16} fill={PAPER} stroke={INK} strokeWidth={2} />
                    <line x1={15} y1={165} x2={215} y2={165} stroke={INK} strokeWidth={2} />
                    <line x1={110} y1={175} x2={110} y2={15} stroke={INK} strokeWidth={2} />
                    <polyline points={growth.map(([x, y]) => `${110 + x * 32},${165 - y * 20}`).join(' ')} fill="none" stroke="#2f6fdb" strokeWidth={4} strokeLinecap="round" />
                    <circle cx={110} cy={145} r={6} fill="#c4432a" />
                </g>
                <g transform="translate(290 40) rotate(5)">
                    <rect width={200} height={150} rx={16} fill="#d6eddf" stroke={INK} strokeWidth={2} />
                    <line x1={20} y1={90} x2={190} y2={90} stroke={INK} strokeWidth={2} />
                    <line x1={30} y1={140} x2={30} y2={12} stroke={INK} strokeWidth={2} />
                    <polyline points={logarithm.map(([x, y]) => `${30 + x * 22},${90 - y * 22}`).join(' ')} fill="none" stroke="#267b53" strokeWidth={4} strokeLinecap="round" />
                </g>
                <g transform="translate(40 250) rotate(2)">
                    <rect width={440} height={110} rx={16} fill="#fbebc0" stroke={INK} strokeWidth={2} />
                    <line x1={20} y1={55} x2={420} y2={55} stroke={INK} strokeWidth={2} />
                    <polyline points={wave.map(([x, y]) => `${20 + x * 31.5},${55 - y * 36}`).join(' ')} fill="none" stroke="#c4432a" strokeWidth={4} strokeLinecap="round" />
                    <text x={410} y={100} textAnchor="end" fontSize={18} fontWeight={700} fill={INK} fontFamily={SERIF}>T = 2π</text>
                </g>
            </svg>
        </div>
    )
}
