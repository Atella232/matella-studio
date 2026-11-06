import type { ReactNode } from 'react'
import { pickText, type LocalizedText, type UnitLanguage } from '../../features/unit-v2/types'
import { AxisTitles, Label, PlaneGrid, PlaneLine, PlanePath, PlanePoint } from '../dbh2-funtzioak-v2/plane'
import { useBoxClip } from '../dbh2-funtzioak-v2/planeClip'
import { planeMap, type PlaneBox } from '../dbh2-funtzioak-v2/planeMap'
import { Figure } from '../dbh2-zatikiak-prototype/figures'
import { sampled } from '../dbh4-aplikatuak-funtzioak/functions'

/* ==========================================================================
   Limiteak eta jarraitutasuna · Batxilergoa 1 · Zientziak — the new lesson
   figures. Most are one plane with curves, holes, asymptotes and a column
   of notes (PlotFigure); the operations with ∞ are two cards. The types
   of discontinuity reuse the 4. DBH aplikatuak figure. Formulas sit in
   their own <text> (left to right in every language); words go through
   <Label>, and the Arabic notes carry words only or formulas only.
   ========================================================================== */

const INK = 'var(--ink, #1d2733)'
const MUTED = 'var(--muted, #58616e)'
const STAGE = 'var(--stage, #2f6fdb)'
const STAGE_TINT = 'var(--stage-tint, #dde7f7)'
const SECOND = 'var(--second, #c4432a)'
const GREEN = 'var(--success, #267b53)'
const MUSTARD = 'var(--mustard, #e0a100)'
const CARD = 'var(--card, #fffcf6)'
const PAPER = '#fffcf6'
const SERIF = 'Fraunces, serif'

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })

/** A formula written left to right whatever the language */
function F({ x, y, children, size = 19, color = INK, anchor = 'start', weight = 700 }: { x: number; y: number; children: ReactNode; size?: number; color?: string; anchor?: 'start' | 'middle' | 'end'; weight?: number }) {
    return <text x={x} y={y} textAnchor={anchor} fontSize={size} fontWeight={weight} fill={color} direction="ltr">{children}</text>
}

interface Curve {
    fn: (x: number) => number
    from: number
    to: number
    color?: string
    dashed?: boolean
    width?: number
}
interface Dot {
    at: [number, number]
    color?: string
    hollow?: boolean
    name?: string
}
interface Note {
    y: number
    /** A formula, drawn left to right */
    formula?: string
    /** Words (with short formula runs) in each language */
    text?: LocalizedText
    color?: string
    size?: number
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
 * One plane with curves, dots, dashed asymptotes (x = a, y = b or y = mx + n) and a column of notes. The box is
 * in grid squares; `units` says what a square is worth on each axis, and everything else is in real values.
 */
export function PlotFigure({ language, height, label, box, cell, units = [1, 1], labels = true, ox = 36, oy = 32, curves, dots = [], verticals = [], horizontals = [], obliques = [], notes = [], notesX = 420, caption }: {
    language: UnitLanguage
    height: number
    label: LocalizedText
    box: PlaneBox
    cell: number
    units?: [number, number]
    /** Numbers on the axes */
    labels?: boolean
    ox?: number
    oy?: number
    curves: Curve[]
    dots?: Dot[]
    verticals?: number[]
    horizontals?: number[]
    obliques?: Array<[number, number]>
    notes?: Note[]
    notesX?: number
    caption?: LocalizedText
}) {
    const t = (text: LocalizedText) => pickText(language, text)
    const map = planeMap(box, cell, ox, oy)
    const [clipPath, clip] = useBoxClip(map)
    const [ux, uy] = units
    const dashed = (x1: number, y1: number, x2: number, y2: number, key: string) => <line key={key} x1={x1} y1={y1} x2={x2} y2={y2} stroke={MUTED} strokeWidth={2} strokeDasharray="7 5" />
    return (
        <Figure height={height} label={t(label)}>
            <g>
                <defs>{clipPath}</defs>
                <rect x={ox} y={oy} width={map.width} height={map.height} fill={CARD} />
                <PlaneGrid map={map} labelStep={box.xMax - box.xMin > 12 ? 4 : 2} xUnit={ux} yUnit={uy} labels={labels} />
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
                ? <F key={index} x={notesX} y={note.y} color={note.color ?? INK} size={note.size ?? 19}>{note.formula}</F>
                : <Label key={index} x={notesX} y={note.y} fontSize={note.size ?? 17} fill={note.color ?? INK}>{t(note.text!)}</Label>)}
            {caption && <Label x={360} y={height - 10} textAnchor="middle" fontSize={18} fill={MUTED}>{t(caption)}</Label>}
        </Figure>
    )
}

/* ---------- 1. The idea of a limit: near 2, not at 2 ---------- */

export function ApproachFigure({ language }: { language: UnitLanguage }) {
    return (
        <PlotFigure
            language={language}
            height={318}
            label={say('y = x + 1 funtzioak zuloa du (2, 3) puntuan, eta f(2) = 5', 'y = x + 1 con un agujero en (2, 3) y f(2) = 5', 'y = x + 1 مع ثقب عند (2, 3) و f(2) = 5', 'y = x + 1 with a hole at (2, 3) and f(2) = 5')}
            box={{ xMin: -1, xMax: 5, yMin: -1, yMax: 6 }}
            cell={38}
            curves={[{ fn: (x) => x + 1, from: -1.5, to: 5.5 }]}
            dots={[{ at: [2, 3], hollow: true }, { at: [2, 5], color: SECOND, name: 'f(2)' }]}
            notes={[
                { y: 70, formula: 'f(1,9) = 2,9', color: MUTED, size: 18 },
                { y: 104, formula: 'f(2,1) = 3,1', color: MUTED, size: 18 },
                { y: 150, formula: 'x → 2 :  f(x) → 3', color: STAGE, size: 22 },
                { y: 194, formula: 'f(2) = 5', color: SECOND, size: 22 },
                { y: 240, text: say('Limitea zuloaren altuera da', 'El límite es la altura del agujero', 'النهاية هي ارتفاع الثقب', 'The limit is the height of the hole'), size: 16 }
            ].map((note) => (language === 'en' || language === 'ar') && note.formula ? { ...note, formula: note.formula.replace(/,/g, '.') } : note)}
            caption={say('Ondoan begiratzen da, ez puntuan bertan', 'Se mira cerca, no en el punto', 'ننظر قرب النقطة لا عندها', 'You look near the point, not at it')}
        />
    )
}

/* ---------- 2. One-sided limits: a jump at x = 1 ---------- */

export function OneSidedFigure({ language }: { language: UnitLanguage }) {
    return (
        <PlotFigure
            language={language}
            height={318}
            label={say('Ezkerretik 1 baliora eta eskuinetik 2 baliora: jauzia x = 1 puntuan', 'Por la izquierda a 1 y por la derecha a 2: salto en x = 1', 'من اليسار إلى 1 ومن اليمين إلى 2: قفزة عند x = 1', 'From the left to 1 and from the right to 2: a jump at x = 1')}
            box={{ xMin: -2, xMax: 4, yMin: -1, yMax: 5 }}
            cell={40}
            curves={[{ fn: (x) => x * x, from: -2.3, to: 1, color: SECOND }, { fn: (x) => 3 - x, from: 1, to: 4.5, color: GREEN }]}
            dots={[{ at: [1, 1], color: SECOND, hollow: true }, { at: [1, 2], color: GREEN }]}
            notes={[
                { y: 80, formula: 'x → 1⁻ :  x² → 1', color: SECOND },
                { y: 124, formula: 'x → 1⁺ :  3 − x → 2', color: GREEN },
                { y: 180, text: say('Ez datoz bat:', 'No coinciden:', 'لا تتساويان:', 'They do not match:'), size: 17 },
                { y: 210, text: say('ez dago limiterik', 'no hay límite', 'لا توجد نهاية', 'there is no limit'), size: 17 }
            ]}
        />
    )
}

/* ---------- 3. Infinite limits: 3/(x − 2) ---------- */

export function VerticalAsymptoteFigure({ language }: { language: UnitLanguage }) {
    return (
        <PlotFigure
            language={language}
            height={344}
            label={say('y = 3/(x − 2) eta asintota bertikala x = 2', 'y = 3/(x − 2) y la asíntota vertical x = 2', 'y = 3/(x − 2) والمقارب الرأسي x = 2', 'y = 3/(x − 2) and the vertical asymptote x = 2')}
            box={{ xMin: -2, xMax: 6, yMin: -6, yMax: 6 }}
            cell={24}
            oy={36}
            curves={[{ fn: (x) => 3 / (x - 2), from: -2.5, to: 1.97 }, { fn: (x) => 3 / (x - 2), from: 2.03, to: 6.5 }]}
            verticals={[2]}
            notes={[
                { y: 80, formula: 'x → 2⁺ :  +∞', color: STAGE },
                { y: 124, formula: 'x → 2⁻ :  −∞', color: SECOND },
                { y: 180, formula: 'x = 2', color: MUTED, size: 22 },
                { y: 212, text: say('asintota bertikala', 'asíntota vertical', 'مقارب رأسي', 'vertical asymptote'), color: MUTED, size: 17 }
            ]}
            notesX={300}
        />
    )
}

/* ---------- 4. What is known and what is not ---------- */

export function FormsFigure({ language }: { language: UnitLanguage }) {
    const t = (text: LocalizedText) => pickText(language, text)
    const known = ['k + ∞ = ∞', 'k · ∞ = ±∞', 'k / ∞ = 0', 'k / 0 = ±∞', '∞ + ∞ = ∞']
    const unknown = ['0 / 0', '∞ / ∞', '∞ − ∞', '0 · ∞', '1^∞']
    return (
        <Figure height={318} label={t(say('Infinituekin dakiguna eta indeterminazioak', 'Lo que se sabe con infinitos y las indeterminaciones', 'ما نعرفه مع اللانهاية وحالات عدم التعيين', 'What is known with infinities and the indeterminate forms'))}>
            <rect x={30} y={20} width={320} height={270} rx={16} fill={STAGE_TINT} stroke={INK} strokeWidth={2} />
            <Label x={190} y={56} textAnchor="middle" fontSize={20} fontWeight={700} fill={STAGE}>{t(say('Dakiguna', 'Se sabe', 'معلوم', 'Known'))}</Label>
            {known.map((item, index) => <F key={item} x={190} y={102 + index * 40} anchor="middle" size={22}>{item}</F>)}
            <rect x={370} y={20} width={320} height={270} rx={16} fill={PAPER} stroke={SECOND} strokeWidth={2.4} strokeDasharray="8 5" />
            <Label x={530} y={56} textAnchor="middle" fontSize={20} fontWeight={700} fill={SECOND}>{t(say('Indeterminazioak', 'Indeterminaciones', 'عدم التعيين', 'Indeterminate'))}</Label>
            {unknown.map((item, index) => <F key={item} x={530} y={102 + index * 40} anchor="middle" size={22} color={SECOND}>{item === '1^∞' ? <>1<tspan dy={-9} fontSize="70%">∞</tspan></> : item}</F>)}
            <Label x={360} y={312} textAnchor="middle" fontSize={17} fill={MUTED}>{t(say('k: 0 ez den zenbaki bat', 'k: un número distinto de 0', 'k: عدد غير الصفر', 'k: a number other than 0'))}</Label>
        </Figure>
    )
}

/* ---------- 5. The hole of 0/0 ---------- */

export function HoleFigure({ language, kind }: { language: UnitLanguage; kind: 'factor' | 'root' }) {
    if (kind === 'factor') {
        return (
            <PlotFigure
                language={language}
                height={318}
                label={say('(x² − 9)/(x² − 3x) = (x + 3)/x, zuloa (3, 2) puntuan', '(x² − 9)/(x² − 3x) = (x + 3)/x, con un agujero en (3, 2)', '(x² − 9)/(x² − 3x) = (x + 3)/x مع ثقب عند (3, 2)', '(x² − 9)/(x² − 3x) = (x + 3)/x, with a hole at (3, 2)')}
                box={{ xMin: -1, xMax: 7, yMin: -1, yMax: 6 }}
                cell={34}
                curves={[{ fn: (x) => (x + 3) / x, from: 0.45, to: 7.5 }, { fn: (x) => (x + 3) / x, from: -1.5, to: -0.4 }]}
                verticals={[0]}
                dots={[{ at: [3, 2], hollow: true }]}
                notes={[
                    { y: 70, formula: 'x = 3 :  0/0', color: SECOND },
                    { y: 116, formula: '(x² − 9)/(x² − 3x)', size: 18 },
                    { y: 150, formula: '= (x + 3)/x', size: 18 },
                    { y: 196, formula: '(x + 3)/x → 6/3 = 2', color: STAGE },
                    { y: 244, text: say('Zuloa (3, 2) puntuan', 'Agujero en (3, 2)', 'ثقب عند (3, 2)', 'Hole at (3, 2)'), color: MUTED, size: 17 }
                ]}
                notesX={370}
            />
        )
    }
    return (
        <PlotFigure
            language={language}
            height={318}
            label={say('(√x − 2)/(x − 4) = 1/(√x + 2), zuloa x = 4 puntuan', '(√x − 2)/(x − 4) = 1/(√x + 2), con un agujero en x = 4', '(√x − 2)/(x − 4) = 1/(√x + 2) مع ثقب عند x = 4', '(√x − 2)/(x − 4) = 1/(√x + 2), with a hole at x = 4')}
            box={{ xMin: 0, xMax: 8, yMin: 0, yMax: 6 }}
            cell={34}
            units={[1, 0.1]}
            labels={false}
            oy={40}
            curves={[{ fn: (x) => 1 / (Math.sqrt(x) + 2), from: 0, to: 8 }]}
            dots={[{ at: [4, 0.25], hollow: true, name: '(4, 1/4)' }]}
            notes={[
                { y: 70, formula: 'x = 4 :  0/0', color: SECOND },
                { y: 118, formula: '(√x − 2)(√x + 2) = x − 4', color: MUSTARD, size: 18 },
                { y: 166, formula: '1/(√x + 2) → 1/4', color: STAGE }
            ]}
            notesX={370}
        />
    )
}

/* ---------- 6. A function that settles at a height far away ---------- */

export function TendsFigure({ language, kind }: { language: UnitLanguage; kind: 'degrees' | 'conjugate' | 'e' }) {
    const decimal = language === 'eu' || language === 'es' ? '20,09' : '20.09'
    const setup = {
        degrees: { fn: (x: number) => (3 * x * x - x) / (x * x + 5), L: 3, units: [2, 1] as [number, number], box: { xMin: 0, xMax: 10, yMin: -1, yMax: 5 }, formula: 'y = (3x² − x)/(x² + 5)', limit: 'y = 3' },
        conjugate: { fn: (x: number) => Math.sqrt(x * x + 6 * x) - x, L: 3, units: [2, 1] as [number, number], box: { xMin: 0, xMax: 10, yMin: -1, yMax: 5 }, formula: 'y = √(x² + 6x) − x', limit: 'y = 3' },
        e: { fn: (x: number) => (1 + 3 / x) ** x, L: Math.exp(3), units: [2, 5] as [number, number], box: { xMin: 0, xMax: 10, yMin: 0, yMax: 5 }, formula: 'y = (1 + 3/x)ˣ', limit: `y = e³ ≈ ${decimal}` }
    }[kind]
    return (
        <PlotFigure
            language={language}
            height={318}
            label={say(`${setup.formula}, ${setup.limit} zuzenera hurbiltzen da`, `${setup.formula} se acerca a ${setup.limit}`, `${setup.formula} تقترب من ${setup.limit}`, `${setup.formula} approaches ${setup.limit}`)}
            box={setup.box}
            cell={32}
            units={setup.units}
            oy={40}
            curves={[{ fn: setup.fn, from: 0.05, to: 21 }]}
            horizontals={[setup.L]}
            notes={[
                { y: 80, formula: setup.formula, color: STAGE },
                { y: 126, formula: setup.limit, color: MUTED },
                { y: 172, formula: 'x → +∞', color: INK }
            ]}
            notesX={400}
        />
    )
}

/* ---------- 7. Vertical and horizontal asymptotes, and the position ---------- */

export function AsymptotesFigure({ language }: { language: UnitLanguage }) {
    return (
        <PlotFigure
            language={language}
            height={330}
            label={say('y = (2x + 1)/(x − 3): asintotak x = 3 eta y = 2', 'y = (2x + 1)/(x − 3): asíntotas x = 3 e y = 2', 'y = (2x + 1)/(x − 3): المقاربان x = 3 وy = 2', 'y = (2x + 1)/(x − 3): asymptotes x = 3 and y = 2')}
            box={{ xMin: -4, xMax: 10, yMin: -4, yMax: 8 }}
            cell={22}
            oy={36}
            curves={[{ fn: (x) => (2 * x + 1) / (x - 3), from: -4.5, to: 2.98 }, { fn: (x) => (2 * x + 1) / (x - 3), from: 3.02, to: 10.5 }]}
            verticals={[3]}
            horizontals={[2]}
            notes={[
                { y: 74, formula: 'x = 3', color: MUTED },
                { y: 108, formula: 'y = 2', color: MUTED },
                { y: 154, formula: 'f(x) − 2 = 7/(x − 3)', color: STAGE, size: 18 },
                { y: 196, text: say('x > 3: gainetik', 'x > 3: por encima', 'x > 3: فوق', 'x > 3: above'), color: GREEN },
                { y: 228, text: say('x < 3: azpitik', 'x < 3: por debajo', 'x < 3: تحت', 'x < 3: below'), color: SECOND }
            ]}
        />
    )
}

/* ---------- 8. The oblique asymptote ---------- */

export function ObliqueFigure({ language }: { language: UnitLanguage }) {
    return (
        <PlotFigure
            language={language}
            height={330}
            label={say('y = (x² + 1)/(x − 1) eta haren asintota zeiharra y = x + 1', 'y = (x² + 1)/(x − 1) y su asíntota oblicua y = x + 1', 'y = (x² + 1)/(x − 1) ومقاربها المائل y = x + 1', 'y = (x² + 1)/(x − 1) and its oblique asymptote y = x + 1')}
            box={{ xMin: -5, xMax: 7, yMin: -6, yMax: 9 }}
            cell={19}
            oy={36}
            curves={[{ fn: (x) => (x * x + 1) / (x - 1), from: -5.5, to: 0.97 }, { fn: (x) => (x * x + 1) / (x - 1), from: 1.03, to: 7.5 }]}
            verticals={[1]}
            obliques={[[1, 1]]}
            notes={[
                { y: 74, formula: '(x² + 1)/(x − 1)', color: STAGE },
                { y: 112, formula: '= x + 1 + 2/(x − 1)', color: STAGE, size: 18 },
                { y: 160, formula: 'y = x + 1', color: MUTED, size: 22 },
                { y: 200, formula: 'x = 1', color: MUTED, size: 22 }
            ]}
            notesX={300}
        />
    )
}

/* ---------- 9. Continuity: joining the pieces ---------- */

export function ContinuousJoinFigure({ language }: { language: UnitLanguage }) {
    return (
        <PlotFigure
            language={language}
            height={318}
            label={say('x² + 1 eta 3x − 1 zatiak (2, 5) puntuan elkartzen dira', 'Los trozos x² + 1 y 3x − 1 se unen en (2, 5)', 'الجزآن x² + 1 و3x − 1 يلتقيان عند (2, 5)', 'The pieces x² + 1 and 3x − 1 join at (2, 5)')}
            box={{ xMin: -2, xMax: 4, yMin: -1, yMax: 9 }}
            cell={26}
            curves={[{ fn: (x) => x * x + 1, from: -2.3, to: 2, color: SECOND }, { fn: (x) => 3 * x - 1, from: 2, to: 4.5, color: GREEN }]}
            dots={[{ at: [2, 5], color: INK }]}
            notes={[
                { y: 70, formula: 'k = 1', color: STAGE, size: 22 },
                { y: 116, formula: '2² + 1 = 5', color: SECOND },
                { y: 156, formula: '3 · 2 − 1 = 5', color: GREEN },
                { y: 204, text: say('Jauzirik gabe', 'Sin salto', 'دون قفزة', 'No jump'), color: INK, size: 18 }
            ]}
            notesX={300}
        />
    )
}

/* ---------- 10. Bolzano ---------- */

export function BolzanoFigure({ language }: { language: UnitLanguage }) {
    return (
        <PlotFigure
            language={language}
            height={318}
            label={say('x³ + x − 3 negatiboa da 1 puntuan eta positiboa 2 puntuan: tartean ardatza mozten du', 'x³ + x − 3 es negativa en 1 y positiva en 2: corta el eje entre medias', 'x³ + x − 3 سالبة عند 1 وموجبة عند 2: تقطع المحور بينهما', 'x³ + x − 3 is negative at 1 and positive at 2: it cuts the axis in between')}
            box={{ xMin: -1, xMax: 3, yMin: -4, yMax: 8 }}
            cell={22}
            ox={60}
            curves={[{ fn: (x) => x ** 3 + x - 3, from: -1.2, to: 2.3 }]}
            dots={[{ at: [1, -1], color: SECOND }, { at: [2, 7], color: GREEN }, { at: [1.213, 0], color: MUSTARD, hollow: true }]}
            notes={[
                { y: 70, formula: 'f(1) = −1 < 0', color: SECOND },
                { y: 110, formula: 'f(2) = 7 > 0', color: GREEN },
                { y: 160, text: say('Jarraitua eta zeinu aldaketa:', 'Continua y cambia de signo:', 'متصلة وتتغير إشارتها:', 'Continuous and changes sign:'), size: 17 },
                { y: 196, formula: 'c ∈ (1, 2),  f(c) = 0', color: MUSTARD }
            ]}
            notesX={300}
        />
    )
}

/* ---------- Hero ---------- */

export function BachLimitsHeroArt() {
    return (
        <div className="fraction-v2-collage" aria-hidden="true">
            <svg viewBox="0 0 520 400" direction="ltr" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                <g transform="translate(24 28) rotate(-4)">
                    <rect width={270} height={210} rx={16} fill={PAPER} stroke={INK} strokeWidth={2} />
                    <line x1={20} y1={150} x2={255} y2={150} stroke={INK} strokeWidth={2} />
                    <line x1={60} y1={195} x2={60} y2={16} stroke={INK} strokeWidth={2} />
                    <line x1={150} y1={20} x2={150} y2={195} stroke="#58616e" strokeWidth={2} strokeDasharray="7 6" />
                    <line x1={20} y1={80} x2={255} y2={80} stroke="#58616e" strokeWidth={2} strokeDasharray="7 6" />
                    <path d="M24 92 Q 120 100 142 190" fill="none" stroke="#2f6fdb" strokeWidth={4} strokeLinecap="round" />
                    <path d="M158 22 Q 170 70 252 76" fill="none" stroke="#2f6fdb" strokeWidth={4} strokeLinecap="round" />
                </g>
                <g transform="translate(316 52) rotate(5)">
                    <rect width={180} height={120} rx={16} fill="#d9efe2" stroke={INK} strokeWidth={2} />
                    <text x={90} y={74} textAnchor="middle" fontSize={30} fontWeight={700} fill={INK} fontFamily={SERIF}>0/0 ?</text>
                </g>
                <g transform="translate(60 272) rotate(2)">
                    <rect width={400} height={88} rx={16} fill="#f6d8cf" stroke={INK} strokeWidth={2} />
                    <text x={200} y={58} textAnchor="middle" fontSize={30} fontWeight={700} fill={INK} fontFamily={SERIF}>lim f(x) ≠ f(a)</text>
                </g>
            </svg>
        </div>
    )
}

