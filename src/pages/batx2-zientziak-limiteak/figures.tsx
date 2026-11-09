import type { ReactNode } from 'react'
import { pickText, type LocalizedText, type UnitLanguage } from '../../features/unit-v2/types'
import { AxisTitles, Label, PlaneGrid, PlaneLine, PlanePath, PlanePoint } from '../dbh2-funtzioak-v2/plane'
import { useBoxClip } from '../dbh2-funtzioak-v2/planeClip'
import { planeMap, type PlaneBox } from '../dbh2-funtzioak-v2/planeMap'
import { Figure } from '../dbh2-zatikiak-prototype/figures'
import { sampled } from '../dbh4-aplikatuak-funtzioak/functions'

/* ==========================================================================
   Limiteak eta jarraitutasuna · Batxilergoa 2 · Zientziak — the lesson
   figures. Every one is a plane (LimitPlot, the plane of Limiteak 1.º
   with two more layers: horizontal bands and vertical strips, for the
   ε band, the δ strip and the «from K on» of the definitions) with a
   column of notes. Formulas sit in their own <text> (left to right in
   every language); words go through <Label>. English and Arabic notes
   write the decimal point. Exported for 2.º Sociales, which has the
   same topic.
   ========================================================================== */

const INK = 'var(--ink, #1d2733)'
const MUTED = 'var(--muted, #58616e)'
const STAGE = 'var(--stage, #2f6fdb)'
const SECOND = 'var(--second, #c4432a)'
const GREEN = 'var(--success, #267b53)'
const MUSTARD = 'var(--mustard, #e0a100)'
const VIOLET = '#7a4fc9'
const CARD = 'var(--card, #fffcf6)'
const PAPER = '#fffcf6'
const SERIF = 'Fraunces, serif'
/** The notes are written a little larger than in Limiteak 1.º, so they can be read on a phone */
const NOTE_SCALE = 1.18

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })

/** The decimal mark of each language in a note: 0,3 in Basque and Spanish, 0.3 in English and Arabic */
const decimals = (language: UnitLanguage, text: string) => (language === 'en' || language === 'ar' ? text.replace(/(\d),(\d)/g, '$1.$2') : text)

/** sin in every language but Spanish, which writes sen */
const sine = (language: UnitLanguage) => (language === 'es' ? 'sen' : 'sin')

/** A formula written left to right whatever the language */
function F({ x, y, children, size = 19, color = INK, anchor = 'start', weight = 700 }: { x: number; y: number; children: ReactNode; size?: number; color?: string; anchor?: 'start' | 'middle' | 'end'; weight?: number }) {
    return <text x={x} y={y} textAnchor={anchor} fontSize={size} fontWeight={weight} fill={color} direction="ltr">{children}</text>
}

export interface PlotCurve {
    fn: (x: number) => number
    from: number
    to: number
    color?: string
    dashed?: boolean
    width?: number
}
export interface PlotDot {
    at: [number, number]
    color?: string
    hollow?: boolean
    name?: string
}
export interface PlotNote {
    y: number
    /** A formula, drawn left to right */
    formula?: string
    /** Words in each language */
    text?: LocalizedText
    color?: string
    size?: number
}
/** A shaded band between two heights or a strip between two abscissas (real values), with an optional colour */
export interface PlotRange {
    from: number
    to: number
    color: string
}

/** A curve sampled (in real values) and broken where it jumps or leaves the box (in grid squares) */
function pieces(fn: (x: number) => number, from: number, to: number, box: PlaneBox, [ux, uy]: [number, number]): Array<[number, number][]> {
    const out: Array<[number, number][]> = []
    let current: [number, number][] = []
    const margin = (box.yMax - box.yMin) * 2
    for (const [x, y] of sampled((value) => fn(value * ux) / uy, from / ux, to / ux, 0.01)) {
        if (!Number.isFinite(y) || y > box.yMax + margin || y < box.yMin - margin || (current.length > 0 && Math.abs(y - current[current.length - 1][1]) > margin)) {
            if (current.length > 1) out.push(current)
            current = []
            continue
        }
        current.push([x, y])
    }
    if (current.length > 1) out.push(current)
    return out
}

/**
 * One plane with shaded bands and strips, curves, dots, dashed asymptotes and a column of notes. The box is in grid
 * squares; `units` says what a square is worth on each axis, and everything else is in real values.
 */
export function LimitPlot({ language, height, label, box, cell, units = [1, 1], labelStep, ox = 36, oy = 32, bands = [], strips = [], curves, dots = [], verticals = [], horizontals = [], obliques = [], notes = [], notesX = 420, caption }: {
    language: UnitLanguage
    height: number
    label: LocalizedText
    box: PlaneBox
    cell: number
    units?: [number, number]
    /** Every how many squares a number on the axes (by default 2, or 4 on a wide box) */
    labelStep?: number
    ox?: number
    oy?: number
    bands?: PlotRange[]
    strips?: PlotRange[]
    curves: PlotCurve[]
    dots?: PlotDot[]
    verticals?: number[]
    horizontals?: number[]
    obliques?: Array<[number, number]>
    notes?: PlotNote[]
    notesX?: number
    caption?: LocalizedText
}) {
    const t = (text: LocalizedText) => pickText(language, text)
    const map = planeMap(box, cell, ox, oy)
    const [clipPath, clip] = useBoxClip(map)
    const [ux, uy] = units
    const dashed = (x1: number, y1: number, x2: number, y2: number, key: string, color = MUTED) => <line key={key} x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={2} strokeDasharray="7 5" />
    const top = map.y(box.yMax)
    const left = map.x(box.xMin)
    return (
        <Figure height={height} label={t(label)}>
            <g>
                <defs>{clipPath}</defs>
                <rect x={ox} y={oy} width={map.width} height={map.height} fill={CARD} />
                <g clipPath={clip}>
                    {bands.map((band, index) => <rect key={`b${index}`} x={left} y={map.y(Math.max(band.from, band.to) / uy)} width={map.width} height={Math.abs(band.to - band.from) / uy * cell} fill={band.color} opacity={0.22} />)}
                    {strips.map((strip, index) => <rect key={`s${index}`} x={map.x(Math.min(strip.from, strip.to) / ux)} y={top} width={Math.abs(strip.to - strip.from) / ux * cell} height={map.height} fill={strip.color} opacity={0.2} />)}
                </g>
                <PlaneGrid map={map} labelStep={labelStep ?? (box.xMax - box.xMin > 12 ? 4 : 2)} xUnit={ux} yUnit={uy} />
                <AxisTitles map={map} />
                {verticals.map((x) => dashed(map.x(x / ux), map.y(box.yMin), map.x(x / ux), map.y(box.yMax), `v${x}`))}
                {horizontals.map((y) => dashed(map.x(box.xMin), map.y(y / uy), map.x(box.xMax), map.y(y / uy), `h${y}`))}
                {obliques.map(([m, n]) => <PlaneLine key={`o${m}${n}`} map={map} m={m} n={n} color={MUTED} width={2} dashed clip={clip} />)}
                {curves.flatMap((curve, index) => pieces(curve.fn, curve.from, curve.to, box, units).map((points, part) => (
                    <PlanePath key={`${index}-${part}`} map={map} points={points} color={curve.color ?? STAGE} width={curve.width ?? 3.6} dashed={curve.dashed} clip={clip} />
                )))}
                {dots.map((dot, index) => <PlanePoint key={index} map={map} point={[dot.at[0] / ux, dot.at[1] / uy]} color={dot.color ?? STAGE} radius={6} hollow={dot.hollow} name={dot.name} />)}
            </g>
            {notes.map((note, index) => note.formula !== undefined
                ? <F key={index} x={notesX} y={note.y} color={note.color ?? INK} size={Math.round((note.size ?? 19) * NOTE_SCALE)}>{decimals(language, note.formula)}</F>
                : <Label key={index} x={notesX} y={note.y} fontSize={Math.round((note.size ?? 17) * NOTE_SCALE)} fill={note.color ?? INK}>{t(note.text!)}</Label>)}
            {caption && <Label x={360} y={height - 10} textAnchor="middle" fontSize={18} fill={MUTED}>{t(caption)}</Label>}
        </Figure>
    )
}

/* ---------- 1. Review: a hole and an asymptote ---------- */

export function ReviewPointFigure({ language }: { language: UnitLanguage }) {
    return (
        <LimitPlot
            language={language}
            height={300}
            label={say('y = (x + 1)/(x + 2): zuloa (2, 3/4) puntuan eta asintota x = −2 zuzenean', 'y = (x + 1)/(x + 2): agujero en (2, 3/4) y asíntota en x = −2', 'y = (x + 1)/(x + 2): ثقب عند (2, 3/4) ومقارب عند x = −2', 'y = (x + 1)/(x + 2): a hole at (2, 3/4) and an asymptote at x = −2')}
            box={{ xMin: -6, xMax: 4, yMin: -3, yMax: 4 }}
            cell={28}
            curves={[{ fn: (x) => (x + 1) / (x + 2), from: -6.5, to: -2.03 }, { fn: (x) => (x + 1) / (x + 2), from: -1.97, to: 4.5 }]}
            dots={[{ at: [2, 0.75], hollow: true }]}
            verticals={[-2]}
            notes={[
                { y: 76, formula: 'x → 2 :  0/0', color: STAGE },
                { y: 110, formula: '→ 3/4', color: STAGE },
                { y: 150, text: say('zuloa', 'agujero', 'ثقب', 'hole'), color: STAGE, size: 17 },
                { y: 200, formula: 'x → −2 :  −1/0', color: SECOND },
                { y: 236, text: say('asintota bertikala', 'asíntota vertical', 'مقارب رأسي', 'vertical asymptote'), color: SECOND, size: 17 }
            ]}
            notesX={380}
        />
    )
}

/* ---------- 2. Review: √(x² + 6x) − x tends to 3 ---------- */

export function ReviewInfinityFigure({ language }: { language: UnitLanguage }) {
    return (
        <LimitPlot
            language={language}
            height={260}
            label={say('y = √(x² + 6x) − x hurbiltzen da y = 3 zuzenera', 'y = √(x² + 6x) − x se acerca a la recta y = 3', 'y = √(x² + 6x) − x يقترب من المستقيم y = 3', 'y = √(x² + 6x) − x approaches the line y = 3')}
            box={{ xMin: 0, xMax: 8, yMin: -1, yMax: 4 }}
            cell={34}
            units={[2, 1]}
            curves={[{ fn: (x) => Math.sqrt(x * x + 6 * x) - x, from: 0, to: 16.5 }]}
            horizontals={[3]}
            notes={[
                { y: 70, formula: '√(x² + 6x) − x', color: STAGE },
                { y: 112, formula: '∞ − ∞', color: SECOND },
                { y: 154, formula: 'x → +∞ :  → 3', color: STAGE, size: 21 },
                { y: 196, text: say('konjokatuarekin', 'con el conjugado', 'بالمرافق', 'with the conjugate'), size: 17 }
            ]}
            notesX={390}
        />
    )
}

/* ---------- 3. Review: a removable discontinuity and an infinite jump ---------- */

export function ReviewContinuityFigure({ language }: { language: UnitLanguage }) {
    return (
        <LimitPlot
            language={language}
            height={316}
            label={say('y = (x + 1)/x: etenune saihesgarria x = 1 puntuan eta jauzi infinitua x = 0 puntuan', 'y = (x + 1)/x: discontinuidad evitable en x = 1 y salto infinito en x = 0', 'y = (x + 1)/x: انقطاع قابل للإزالة عند x = 1 وقفزة لانهائية عند x = 0', 'y = (x + 1)/x: a removable discontinuity at x = 1 and an infinite jump at x = 0')}
            box={{ xMin: -4, xMax: 4, yMin: -4, yMax: 5 }}
            cell={28}
            curves={[{ fn: (x) => (x + 1) / x, from: -4.5, to: -0.04 }, { fn: (x) => (x + 1) / x, from: 0.04, to: 4.5 }]}
            dots={[{ at: [1, 2], hollow: true }]}
            verticals={[0]}
            notes={[
                { y: 76, formula: 'x = 1', color: STAGE, size: 21 },
                { y: 108, text: say('saihesgarria: limitea 2', 'evitable: límite 2', 'قابل للإزالة: النهاية 2', 'removable: limit 2'), color: STAGE, size: 17 },
                { y: 170, formula: 'x = 0', color: SECOND, size: 21 },
                { y: 202, text: say('jauzi infinitua', 'salto infinito', 'قفزة لانهائية', 'infinite jump'), color: SECOND, size: 17 }
            ]}
            notesX={330}
        />
    )
}

/* ---------- 4. The ε band and the δ strip ---------- */

export function EpsilonDeltaFigure({ language }: { language: UnitLanguage }) {
    return (
        <LimitPlot
            language={language}
            height={300}
            label={say('y = 3x − 1: ε = 0,3 banda 2 baliaren inguruan eta δ = 0,1 zerrenda 1 baliaren inguruan', 'y = 3x − 1: la banda ε = 0,3 alrededor de 2 y la franja δ = 0,1 alrededor de 1', 'y = 3x − 1: الشريط ε = 0.3 حول 2 والشريحة δ = 0.1 حول 1', 'y = 3x − 1: the band ε = 0.3 around 2 and the strip δ = 0.1 around 1')}
            box={{ xMin: 0, xMax: 8, yMin: 0, yMax: 8 }}
            cell={28}
            units={[0.25, 0.5]}
            labelStep={4}
            bands={[{ from: 1.7, to: 2.3, color: MUSTARD }]}
            strips={[{ from: 0.9, to: 1.1, color: VIOLET }]}
            curves={[{ fn: (x) => 3 * x - 1, from: 0, to: 2 }]}
            dots={[{ at: [1, 2], color: INK }]}
            notes={[
                { y: 70, formula: 'ε = 0,3', color: MUSTARD, size: 21 },
                { y: 108, formula: 'δ = 0,1', color: VIOLET, size: 21 },
                { y: 158, formula: '0 < |x − 1| < δ', color: INK, size: 18 },
                { y: 188, formula: '⇒ |f(x) − 2| < ε', color: INK, size: 18 },
                { y: 236, text: say('Zerrendako kurba bandaren barruan', 'La curva de la franja, dentro de la banda', 'منحنى الشريحة داخل الشريط', 'The curve over the strip stays in the band'), size: 16 }
            ]}
            notesX={330}
        />
    )
}

/* ---------- 5. At infinity: from K on, inside the band ---------- */

export function InfinityBandFigure({ language }: { language: UnitLanguage }) {
    return (
        <LimitPlot
            language={language}
            height={270}
            label={say('y = (2x + 1)/x: x = 4 baliotik aurrera kurba 2 ± 0,25 bandaren barruan dago', 'y = (2x + 1)/x: a partir de x = 4 la curva está dentro de la banda 2 ± 0,25', 'y = (2x + 1)/x: ابتداءً من x = 4 يكون المنحنى داخل الشريط 2 ± 0.25', 'y = (2x + 1)/x: from x = 4 on the curve is inside the band 2 ± 0.25')}
            box={{ xMin: 0, xMax: 12, yMin: 0, yMax: 8 }}
            cell={22}
            units={[1, 0.5]}
            labelStep={4}
            bands={[{ from: 1.75, to: 2.25, color: MUSTARD }]}
            strips={[{ from: 4, to: 12, color: GREEN }]}
            curves={[{ fn: (x) => (2 * x + 1) / x, from: 0.3, to: 12.4 }]}
            verticals={[4]}
            notes={[
                { y: 70, formula: 'ε = 0,25', color: MUSTARD, size: 21 },
                { y: 108, formula: 'K = 4', color: GREEN, size: 21 },
                { y: 156, formula: 'x > K  ⇒', color: INK, size: 18 },
                { y: 186, formula: '|f(x) − 2| < ε', color: INK, size: 18 }
            ]}
            notesX={360}
        />
    )
}

/* ---------- 6. Two horizontal asymptotes ---------- */

export function MinusInfinityFigure({ language }: { language: UnitLanguage }) {
    return (
        <LimitPlot
            language={language}
            height={268}
            label={say('y = √(x² + 1)/(2x): asintota horizontalak y = 1/2 (+∞ aldean) eta y = −1/2 (−∞ aldean)', 'y = √(x² + 1)/(2x): asíntotas horizontales y = 1/2 (en +∞) e y = −1/2 (en −∞)', 'y = √(x² + 1)/(2x): المقاربان الأفقيان y = 1/2 (عند +∞) وy = −1/2 (عند −∞)', 'y = √(x² + 1)/(2x): horizontal asymptotes y = 1/2 (at +∞) and y = −1/2 (at −∞)')}
            box={{ xMin: -8, xMax: 8, yMin: -6, yMax: 6 }}
            cell={16}
            units={[1, 0.25]}
            labelStep={4}
            curves={[{ fn: (x) => Math.sqrt(x * x + 1) / (2 * x), from: -8.5, to: -0.05 }, { fn: (x) => Math.sqrt(x * x + 1) / (2 * x), from: 0.05, to: 8.5 }]}
            horizontals={[0.5, -0.5]}
            notes={[
                { y: 80, formula: 'x → +∞ :  1/2', color: STAGE },
                { y: 124, formula: 'x → −∞ :  −1/2', color: SECOND },
                { y: 176, formula: '√(x²) = |x|', color: INK, size: 18 }
            ]}
            notesX={360}
        />
    )
}

/* ---------- 7. ln x, x² and 2ˣ: the exponential overtakes ---------- */

export function OrdersFigure({ language }: { language: UnitLanguage }) {
    return (
        <LimitPlot
            language={language}
            height={300}
            label={say('ln x, x² eta 2ˣ: x = 4 baliotik aurrera 2ˣ esponentzialak irabazten du', 'ln x, x² y 2ˣ: desde x = 4 gana la exponencial 2ˣ', 'ln x وx² و2ˣ: ابتداءً من x = 4 تتفوق الأسية 2ˣ', 'ln x, x² and 2ˣ: from x = 4 on the exponential 2ˣ wins')}
            box={{ xMin: 0, xMax: 7, yMin: 0, yMax: 8 }}
            cell={28}
            units={[1, 5]}
            curves={[
                { fn: (x) => Math.log(x), from: 0.05, to: 7.2, color: VIOLET },
                { fn: (x) => x * x, from: 0, to: 7.2, color: STAGE },
                { fn: (x) => 2 ** x, from: 0, to: 7.2, color: SECOND }
            ]}
            dots={[{ at: [4, 16], color: INK }]}
            notes={[
                { y: 70, formula: '2ˣ', color: SECOND, size: 22 },
                { y: 108, formula: 'x²', color: STAGE, size: 22 },
                { y: 146, formula: 'ln x', color: VIOLET, size: 22 },
                { y: 200, formula: 'ln x  ≪  x²  ≪  2ˣ', color: INK, size: 20 }
            ]}
            notesX={330}
        />
    )
}

/* ---------- 8. (1 + x)^(1/x) tends to e ---------- */

export function OneInfinityFigure({ language }: { language: UnitLanguage }) {
    return (
        <LimitPlot
            language={language}
            height={260}
            label={say('y = (1 + x)^(1/x): x = 0 puntuan zuloa, e altueran', 'y = (1 + x)^(1/x): agujero en x = 0, a la altura e', 'y = (1 + x)^(1/x): ثقب عند x = 0 على الارتفاع e', 'y = (1 + x)^(1/x): a hole at x = 0, at height e')}
            box={{ xMin: -1, xMax: 4, yMin: 0, yMax: 5 }}
            cell={36}
            curves={[{ fn: (x) => (Math.abs(x) < 1e-9 ? Number.NaN : (1 + x) ** (1 / x)), from: -0.6, to: 4.3 }]}
            dots={[{ at: [0, Math.E], hollow: true }]}
            horizontals={[Math.E]}
            notes={[
                { y: 70, formula: '(1 + x)^(1/x)', color: STAGE },
                { y: 110, formula: 'x → 0 :  → e', color: STAGE, size: 21 },
                { y: 150, formula: 'e ≈ 2,72', color: MUTED },
                { y: 196, formula: 'f → 1,   g → ∞', color: INK, size: 18 }
            ]}
            notesX={300}
        />
    )
}

/* ---------- 9. sin x / x tends to 1 ---------- */

export function SineLimitFigure({ language }: { language: UnitLanguage }) {
    return (
        <LimitPlot
            language={language}
            height={250}
            label={say('y = sin x / x: x = 0 puntuan zuloa, 1 altueran', 'y = sen x / x: agujero en x = 0, a la altura 1', 'y = sin x / x: ثقب عند x = 0 على الارتفاع 1', 'y = sin x / x: a hole at x = 0, at height 1')}
            box={{ xMin: -5, xMax: 5, yMin: -2, yMax: 5 }}
            cell={24}
            units={[2, 0.25]}
            labelStep={4}
            curves={[{ fn: (x) => (Math.abs(x) < 1e-9 ? Number.NaN : Math.sin(x) / x), from: -10.3, to: 10.3 }]}
            dots={[{ at: [0, 1], hollow: true }]}
            notes={[
                { y: 70, formula: `${sine(language)} x / x`, color: STAGE },
                { y: 110, formula: 'x → 0 :  → 1', color: STAGE, size: 21 },
                { y: 160, text: say('x radianetan', 'x en radianes', 'x بالراديان', 'x in radians'), size: 17 }
            ]}
            notesX={340}
        />
    )
}

/* ---------- 10. Continuous on [−3, 3], one-sided at the ends ---------- */

export function IntervalFigure({ language }: { language: UnitLanguage }) {
    return (
        <LimitPlot
            language={language}
            height={240}
            label={say('y = √(9 − x²) zirkunferentzia-erdia, [−3, 3] tartean jarraitua', 'y = √(9 − x²), una semicircunferencia continua en [−3, 3]', 'y = √(9 − x²) نصف دائرة متصلة على [−3, 3]', 'y = √(9 − x²), a semicircle continuous on [−3, 3]')}
            box={{ xMin: -4, xMax: 4, yMin: -1, yMax: 4 }}
            cell={30}
            curves={[{ fn: (x) => Math.sqrt(Math.max(0, 9 - x * x)), from: -3, to: 3 }]}
            dots={[{ at: [-3, 0], color: SECOND }, { at: [3, 0], color: SECOND }]}
            notes={[
                { y: 70, formula: 'x → −3⁺ :  0 = f(−3)', color: SECOND, size: 18 },
                { y: 108, formula: 'x → 3⁻ :  0 = f(3)', color: SECOND, size: 18 },
                { y: 156, text: say('muturretan, alde bakarra', 'en los extremos, un solo lado', 'عند الطرفين جانب واحد', 'at the ends, one side only'), size: 17 }
            ]}
            notesX={320}
        />
    )
}

/* ---------- 11. One parameter: e²ˣ + 2 and sin 3x / x meet at 3 ---------- */

export function ParameterFigure({ language }: { language: UnitLanguage }) {
    return (
        <LimitPlot
            language={language}
            height={250}
            label={say('a = 2 denean, e²ˣ + 2 eta sin 3x / x 3 altueran elkartzen dira x = 0 puntuan', 'Con a = 2, e²ˣ + 2 y sen 3x / x se unen a la altura 3 en x = 0', 'مع a = 2 يلتقي e²ˣ + 2 وsin 3x / x على الارتفاع 3 عند x = 0', 'With a = 2, e²ˣ + 2 and sin 3x / x meet at height 3 at x = 0')}
            box={{ xMin: -3, xMax: 4, yMin: -1, yMax: 4 }}
            cell={30}
            curves={[
                { fn: (x) => Math.exp(2 * x) + 2, from: -3.3, to: 0, color: SECOND },
                { fn: (x) => Math.sin(3 * x) / x, from: 0.005, to: 4.3, color: GREEN }
            ]}
            dots={[{ at: [0, 3], color: INK }]}
            notes={[
                { y: 70, formula: 'a = 2', color: INK, size: 21 },
                { y: 110, formula: 'e²ˣ + 2 → 3', color: SECOND },
                { y: 150, formula: `${sine(language)} 3x / x → 3`, color: GREEN }
            ]}
            notesX={320}
        />
    )
}

/* ---------- 12. Two parameters: three pieces joined ---------- */

export function TwoParametersFigure({ language }: { language: UnitLanguage }) {
    return (
        <LimitPlot
            language={language}
            height={268}
            label={say('a = 5 eta b = 6 direnean, hiru zatiak x = 1 eta x = 3 puntuetan lotzen dira', 'Con a = 5 y b = 6, los tres trozos se unen en x = 1 y en x = 3', 'مع a = 5 وb = 6 تلتقي الأجزاء الثلاثة عند x = 1 وx = 3', 'With a = 5 and b = 6, the three pieces join at x = 1 and at x = 3')}
            box={{ xMin: -1, xMax: 4, yMin: -1, yMax: 5 }}
            cell={32}
            units={[1, 4]}
            curves={[
                { fn: (x) => 5 * x + 2, from: -1.2, to: 1, color: SECOND },
                { fn: (x) => x * x + 6, from: 1, to: 3, color: STAGE },
                { fn: (x) => 5 * x, from: 3, to: 4.3, color: GREEN }
            ]}
            dots={[{ at: [1, 7], color: INK }, { at: [3, 15], color: INK }]}
            notes={[
                { y: 70, formula: 'a = 5,   b = 6', color: INK, size: 21 },
                { y: 116, formula: 'x = 1 :  7 = 7', color: SECOND },
                { y: 156, formula: 'x = 3 :  15 = 15', color: GREEN }
            ]}
            notesX={300}
        />
    )
}

/* ---------- 13. Bolzano: eˣ and 3 − x cross between 0 and 1 ---------- */

export function BolzanoEquationFigure({ language }: { language: UnitLanguage }) {
    return (
        <LimitPlot
            language={language}
            height={260}
            label={say('y = eˣ eta y = 3 − x ebakitzen dira 0 eta 1 artean', 'y = eˣ e y = 3 − x se cortan entre 0 y 1', 'y = eˣ وy = 3 − x يتقاطعان بين 0 و1', 'y = eˣ and y = 3 − x cross between 0 and 1')}
            box={{ xMin: -1, xMax: 3, yMin: -1, yMax: 4 }}
            cell={38}
            curves={[
                { fn: (x) => Math.exp(x), from: -1.2, to: 1.45, color: STAGE },
                { fn: (x) => 3 - x, from: -1.2, to: 3.2, color: SECOND }
            ]}
            dots={[{ at: [0.792, 2.208], color: MUSTARD }]}
            notes={[
                { y: 70, formula: 'h(x) = eˣ + x − 3', color: INK, size: 18 },
                { y: 110, formula: 'h(0) = −2 < 0', color: SECOND, size: 18 },
                { y: 146, formula: 'h(1) = e − 2 > 0', color: STAGE, size: 18 },
                { y: 192, formula: 'c ∈ (0, 1)', color: MUSTARD, size: 21 }
            ]}
            notesX={330}
        />
    )
}

/* ---------- 14. Intermediate values: y = 5 is crossed ---------- */

export function IntermediateFigure({ language }: { language: UnitLanguage }) {
    return (
        <LimitPlot
            language={language}
            height={290}
            label={say('y = x³ + x 0 baliotik 10 baliora doa [0, 2] tartean eta y = 5 zuzena mozten du', 'y = x³ + x va de 0 a 10 en [0, 2] y corta la recta y = 5', 'y = x³ + x تنتقل من 0 إلى 10 على [0, 2] وتقطع المستقيم y = 5', 'y = x³ + x goes from 0 to 10 on [0, 2] and cuts the line y = 5')}
            box={{ xMin: -1, xMax: 5, yMin: -1, yMax: 6 }}
            cell={30}
            units={[0.5, 2]}
            curves={[{ fn: (x) => x ** 3 + x, from: 0, to: 2 }]}
            dots={[{ at: [0, 0], color: SECOND }, { at: [2, 10], color: SECOND }, { at: [1.516, 5], color: MUSTARD }]}
            horizontals={[5]}
            notes={[
                { y: 70, formula: 'f(0) = 0', color: SECOND },
                { y: 106, formula: 'f(2) = 10', color: SECOND },
                { y: 150, formula: 'y = 5', color: MUTED },
                { y: 196, formula: 'c ∈ (0, 2),  f(c) = 5', color: MUSTARD, size: 18 }
            ]}
            notesX={300}
        />
    )
}

/* ---------- 15. Weierstrass: x² on [−1, 2] ---------- */

export function WeierstrassFigure({ language }: { language: UnitLanguage }) {
    return (
        <LimitPlot
            language={language}
            height={268}
            label={say('y = x² [−1, 2] tartean: maximoa (2, 4) puntuan eta minimoa (0, 0) puntuan', 'y = x² en [−1, 2]: máximo en (2, 4) y mínimo en (0, 0)', 'y = x² على [−1, 2]: القيمة العظمى عند (2, 4) والصغرى عند (0, 0)', 'y = x² on [−1, 2]: maximum at (2, 4) and minimum at (0, 0)')}
            box={{ xMin: -2, xMax: 3, yMin: -1, yMax: 5 }}
            cell={32}
            curves={[{ fn: (x) => x * x, from: -1, to: 2 }]}
            dots={[{ at: [-1, 1], color: STAGE }, { at: [2, 4], color: GREEN }, { at: [0, 0], color: SECOND }]}
            notes={[
                { y: 70, formula: 'f(2) = 4', color: GREEN, size: 21 },
                { y: 100, text: say('maximo absolutua', 'máximo absoluto', 'القيمة العظمى المطلقة', 'absolute maximum'), color: GREEN, size: 17 },
                { y: 150, formula: 'f(0) = 0', color: SECOND, size: 21 },
                { y: 180, text: say('minimo absolutua', 'mínimo absoluto', 'القيمة الصغرى المطلقة', 'absolute minimum'), color: SECOND, size: 17 }
            ]}
            notesX={300}
        />
    )
}

/* ---------- Hero ---------- */

export function Bach2LimitsHeroArt() {
    return (
        <div className="fraction-v2-collage" aria-hidden="true">
            <svg viewBox="0 0 520 400" direction="ltr" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                <g transform="translate(22 26) rotate(-4)">
                    <rect width={272} height={214} rx={16} fill={PAPER} stroke={INK} strokeWidth={2} />
                    <rect x={20} y={82} width={236} height={40} fill="#f3d98b" opacity={0.7} />
                    <rect x={118} y={18} width={40} height={180} fill="#d8c9f1" opacity={0.8} />
                    <line x1={20} y1={180} x2={256} y2={180} stroke={INK} strokeWidth={2} />
                    <line x1={40} y1={198} x2={40} y2={16} stroke={INK} strokeWidth={2} />
                    <path d="M36 192 L 248 22" fill="none" stroke="#2f6fdb" strokeWidth={4} strokeLinecap="round" />
                    <circle cx={138} cy={102} r={7} fill={INK} />
                    <text x={232} y={112} fontSize={22} fontWeight={700} fill={INK} fontFamily={SERIF}>ε</text>
                    <text x={150} y={40} fontSize={22} fontWeight={700} fill={INK} fontFamily={SERIF}>δ</text>
                </g>
                <g transform="translate(318 44) rotate(5)">
                    <rect width={180} height={124} rx={16} fill="#d9efe2" stroke={INK} strokeWidth={2} />
                    <text x={90} y={58} textAnchor="middle" fontSize={26} fontWeight={700} fill={INK} fontFamily={SERIF}>ln x ≪ eˣ</text>
                    <text x={90} y={98} textAnchor="middle" fontSize={20} fontWeight={700} fill={INK} fontFamily={SERIF}>x → +∞</text>
                </g>
                <g transform="translate(56 274) rotate(2)">
                    <rect width={408} height={90} rx={16} fill="#f6d8cf" stroke={INK} strokeWidth={2} />
                    <text x={204} y={58} textAnchor="middle" fontSize={28} fontWeight={700} fill={INK} fontFamily={SERIF}>f(a) · f(b) &lt; 0 ⇒ f(c) = 0</text>
                </g>
            </svg>
        </div>
    )
}
