import type { LocalizedText, UnitLanguage } from '../../features/unit-v2/types'
import { LimitPlot } from '../batx2-zientziak-limiteak/figures'

/* ==========================================================================
   Funtzioen adierazpena · Batxilergoa 2 · Zientziak — the lesson figures.
   Each one is a plane with the curve, its asymptotes as dashed lines and
   the points the steps found, plus a column of notes (LimitPlot of
   Limiteak 2.º, whose notes are large enough for a phone). Formulas are
   notes of their own (left to right in every language); words go through
   the localized notes. The green of the dots is not used in the green
   stage, nor the violet in the violet one. Exported for 2.º Sociales.
   ========================================================================== */

const INK = 'var(--ink, #1d2733)'
const STAGE = 'var(--stage, #2f6fdb)'
const SECOND = 'var(--second, #c4432a)'
const GREEN = 'var(--success, #267b53)'
const VIOLET = '#7a4fc9'
const PAPER = '#fffcf6'
const SERIF = 'Fraunces, serif'

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const line = (m: number, n: number) => (x: number) => m * x + n
/** sin in every language but Spanish, which writes sen */
const sine = (language: UnitLanguage) => (language === 'es' ? 'sen' : 'sin')

/* ---------- 1. The plan with x³ − 3x² ---------- */

export function SketchPlanFigure({ language }: { language: UnitLanguage }) {
    return (
        <LimitPlot
            language={language}
            height={322}
            label={say('y = x³ − 3x²: maximoa (0, 0) puntuan, minimoa (2, −4) puntuan, inflexioa (1, −2) puntuan, eta X ardatza ebakitzen du x = 3 puntuan', 'y = x³ − 3x²: máximo en (0, 0), mínimo en (2, −4), inflexión en (1, −2), y corta el eje X en x = 3', 'y = x³ − 3x²: قيمة عظمى عند (0, 0) وصغرى عند (2, −4) وانعطاف عند (1, −2)، وتقطع المحور X عند x = 3', 'y = x³ − 3x²: a maximum at (0, 0), a minimum at (2, −4), an inflection at (1, −2), and it cuts the X axis at x = 3')}
            box={{ xMin: -2, xMax: 4, yMin: -5, yMax: 2 }}
            cell={36}
            curves={[{ fn: (x) => x ** 3 - 3 * x * x, from: -1.2, to: 3.6 }]}
            dots={[{ at: [0, 0], color: GREEN }, { at: [2, -4], color: GREEN }, { at: [1, -2], color: VIOLET }, { at: [3, 0], color: INK }]}
            notes={[
                { y: 70, formula: 'f(x) = x³ − 3x²', color: STAGE },
                { y: 112, formula: 'f′ = 0 :  x = 0,  x = 2', color: GREEN },
                { y: 146, text: say('maximoa eta minimoa', 'máximo y mínimo', 'قيمة عظمى وقيمة صغرى', 'maximum and minimum'), color: GREEN, size: 18 },
                { y: 194, formula: 'f″ = 0 :  x = 1', color: VIOLET },
                { y: 228, text: say('inflexioa', 'inflexión', 'انعطاف', 'inflection'), color: VIOLET, size: 18 },
                { y: 276, formula: 'x → ±∞ :  f → ±∞', color: INK }
            ]}
            notesX={300}
        />
    )
}

/* ---------- 2. (2x² + 1)/(x − 1): a vertical and an oblique asymptote ---------- */

export function AsymptotesReviewFigure({ language }: { language: UnitLanguage }) {
    return (
        <LimitPlot
            language={language}
            height={322}
            label={say('y = (2x² + 1)/(x − 1): asintota bertikala x = 1 eta zeiharra y = 2x + 2', 'y = (2x² + 1)/(x − 1): asíntota vertical x = 1 y oblicua y = 2x + 2', 'y = (2x² + 1)/(x − 1): مقارب رأسي x = 1 ومائل y = 2x + 2', 'y = (2x² + 1)/(x − 1): vertical asymptote x = 1 and oblique y = 2x + 2')}
            box={{ xMin: -3, xMax: 5, yMin: -3, yMax: 5 }}
            cell={32}
            units={[1, 3]}
            verticals={[1]}
            curves={[
                { fn: line(2, 2), from: -3, to: 5, color: SECOND, width: 2.4, dashed: true },
                { fn: (x) => (2 * x * x + 1) / (x - 1), from: -3, to: 0.93 },
                { fn: (x) => (2 * x * x + 1) / (x - 1), from: 1.07, to: 5 }
            ]}
            notes={[
                { y: 76, formula: 'x = 1', color: INK, size: 21 },
                { y: 110, text: say('bertikala', 'vertical', 'رأسي', 'vertical'), size: 18 },
                { y: 162, formula: 'y = 2x + 2', color: SECOND, size: 21 },
                { y: 196, text: say('zeiharra', 'oblicua', 'مائل', 'oblique'), color: SECOND, size: 18 },
                { y: 248, formula: '3/(x − 1) → 0', color: STAGE }
            ]}
            notesX={332}
        />
    )
}

/* ---------- 3. x²/(x² − 1): three branches between x = ±1 and y = 1 ---------- */

export function RationalReviewFigure({ language }: { language: UnitLanguage }) {
    const fn = (x: number) => (x * x) / (x * x - 1)
    return (
        <LimitPlot
            language={language}
            height={306}
            label={say('y = x²/(x² − 1): asintota bertikalak x = ±1, horizontala y = 1, eta maximoa (0, 0) puntuan', 'y = x²/(x² − 1): asíntotas verticales x = ±1, horizontal y = 1, y máximo en (0, 0)', 'y = x²/(x² − 1): مقاربان رأسيان x = ±1 وأفقي y = 1، وقيمة عظمى عند (0, 0)', 'y = x²/(x² − 1): vertical asymptotes x = ±1, horizontal y = 1, and a maximum at (0, 0)')}
            box={{ xMin: -4, xMax: 4, yMin: -4, yMax: 4 }}
            cell={30}
            verticals={[-1, 1]}
            horizontals={[1]}
            curves={[
                { fn, from: -4, to: -1.04 },
                { fn, from: -0.97, to: 0.97 },
                { fn, from: 1.04, to: 4 }
            ]}
            dots={[{ at: [0, 0], color: GREEN }]}
            notes={[
                { y: 74, formula: 'x = ±1', color: INK, size: 21 },
                { y: 122, formula: 'y = 1', color: INK, size: 21 },
                { y: 170, formula: '(0, 0)', color: GREEN, size: 21 },
                { y: 204, text: say('maximoa', 'máximo', 'قيمة عظمى', 'maximum'), color: GREEN, size: 18 },
                { y: 252, formula: '−1 < x < 1 :  f ≤ 0', color: STAGE }
            ]}
            notesX={316}
        />
    )
}

/* ---------- 4. x³/(x² + 1) is odd: (2, 1,6) and (−2, −1,6) ---------- */

export function SymmetryFigure({ language }: { language: UnitLanguage }) {
    return (
        <LimitPlot
            language={language}
            height={274}
            label={say('y = x³/(x² + 1) bakoitia da: (2, 1,6) eta (−2, −1,6) puntuak jatorriarekiko simetrikoak dira', 'y = x³/(x² + 1) es impar: los puntos (2, 1,6) y (−2, −1,6) son simétricos respecto del origen', 'y = x³/(x² + 1) فردية: النقطتان (2, 1.6) و(−2, −1.6) متناظرتان بالنسبة إلى الأصل', 'y = x³/(x² + 1) is odd: the points (2, 1.6) and (−2, −1.6) are symmetric about the origin')}
            box={{ xMin: -4, xMax: 4, yMin: -3, yMax: 3 }}
            cell={32}
            curves={[
                { fn: line(0.8, 0), from: -2, to: 2, color: SECOND, width: 2.4, dashed: true },
                { fn: (x) => x ** 3 / (x * x + 1), from: -4, to: 4 }
            ]}
            dots={[{ at: [2, 1.6], color: GREEN }, { at: [-2, -1.6], color: GREEN }, { at: [0, 0], color: SECOND }]}
            notes={[
                { y: 76, formula: 'f(−x) = −f(x)', color: STAGE, size: 21 },
                { y: 112, text: say('bakoitia', 'impar', 'فردية', 'odd'), color: STAGE, size: 18 },
                { y: 160, formula: 'f(2) = 1,6', color: GREEN },
                { y: 198, formula: 'f(−2) = −1,6', color: GREEN },
                { y: 238, text: say('jatorriarekiko simetrikoa', 'simétrica respecto del origen', 'متناظرة بالنسبة إلى الأصل', 'symmetric about the origin'), color: SECOND, size: 18 }
            ]}
            notesX={332}
        />
    )
}

/* ---------- 5. x + 1/x: above y = x on the right, below it on the left ---------- */

export function PositionFigure({ language }: { language: UnitLanguage }) {
    const fn = (x: number) => x + 1 / x
    return (
        <LimitPlot
            language={language}
            height={306}
            label={say('y = x + 1/x: y = x zuzenaren gainetik doa eskuinean eta azpitik ezkerrean; x = 0 asintota bertikala da', 'y = x + 1/x: va por encima de y = x a la derecha y por debajo a la izquierda; x = 0 es asíntota vertical', 'y = x + 1/x: يسير فوق y = x في اليمين وتحته في اليسار؛ وx = 0 مقارب رأسي', 'y = x + 1/x: it runs above y = x on the right and below it on the left; x = 0 is a vertical asymptote')}
            box={{ xMin: -4, xMax: 4, yMin: -4, yMax: 4 }}
            cell={30}
            strips={[{ from: 0, to: 4, color: GREEN }, { from: -4, to: 0, color: SECOND }]}
            curves={[
                { fn: line(1, 0), from: -4, to: 4, color: INK, width: 2.4, dashed: true },
                { fn, from: -4, to: -0.27 },
                { fn, from: 0.27, to: 4 }
            ]}
            notes={[
                { y: 74, formula: 'f(x) − x = 1/x', color: STAGE, size: 21 },
                { y: 126, formula: 'x > 0 :  1/x > 0', color: GREEN },
                { y: 160, text: say('gainetik', 'por encima', 'فوقه', 'above'), color: GREEN, size: 18 },
                { y: 208, formula: 'x < 0 :  1/x < 0', color: SECOND },
                { y: 242, text: say('azpitik', 'por debajo', 'تحته', 'below'), color: SECOND, size: 18 }
            ]}
            notesX={316}
        />
    )
}

/* ---------- 6. √(9 − x²): half a circle that ends at ±3 ---------- */

export function DomainEdgesFigure({ language }: { language: UnitLanguage }) {
    return (
        <LimitPlot
            language={language}
            height={262}
            label={say('y = √(9 − x²) zirkunferentzia erdi bat da: −3 eta 3 artean bakarrik dago, eta zuzen ukitzailea bertikala da ertzetan', 'y = √(9 − x²) es media circunferencia: solo existe entre −3 y 3, y la tangente es vertical en los bordes', 'y = √(9 − x²) نصف دائرة: موجودة فقط بين −3 و3، والمماس رأسي عند الحافتين', 'y = √(9 − x²) is half a circle: it only exists between −3 and 3, and the tangent is vertical at the edges')}
            box={{ xMin: -4, xMax: 4, yMin: -1, yMax: 4 }}
            cell={34}
            strips={[{ from: -3, to: 3, color: STAGE }]}
            curves={[{ fn: (x) => Math.sqrt(Math.max(0, 9 - x * x)), from: -3, to: 3 }]}
            dots={[{ at: [-3, 0], color: SECOND }, { at: [3, 0], color: SECOND }, { at: [0, 3], color: GREEN }]}
            notes={[
                { y: 72, formula: '−3 ≤ x ≤ 3', color: STAGE, size: 21 },
                { y: 120, formula: '(0, 3)', color: GREEN },
                { y: 152, text: say('maximoa', 'máximo', 'قيمة عظمى', 'maximum'), color: GREEN, size: 18 },
                { y: 198, formula: '(±3, 0)', color: SECOND },
                { y: 230, text: say('zuzen ukitzaile bertikala', 'tangente vertical', 'مماس رأسي', 'vertical tangent'), color: SECOND, size: 18 }
            ]}
            notesX={348}
        />
    )
}

/* ---------- 7. x²·e^(−x): minimum at 0, maximum at 2, y = 0 on the right ---------- */

export function ExpProductsFigure({ language }: { language: UnitLanguage }) {
    return (
        <LimitPlot
            language={language}
            height={284}
            label={say('y = x²·e⁻ˣ: minimoa (0, 0) puntuan, maximoa x = 2 puntuan, eta X ardatza asintota da eskuinean', 'y = x²·e⁻ˣ: mínimo en (0, 0), máximo en x = 2, y el eje X es asíntota por la derecha', 'y = x²·e⁻ˣ: قيمة صغرى عند (0, 0) وعظمى عند x = 2، والمحور X مقارب من اليمين', 'y = x²·e⁻ˣ: a minimum at (0, 0), a maximum at x = 2, and the X axis is an asymptote on the right')}
            box={{ xMin: -2, xMax: 7, yMin: -1, yMax: 5 }}
            cell={30}
            units={[1, 0.25]}
            curves={[{ fn: (x) => x * x * Math.exp(-x), from: -0.9, to: 7 }]}
            dots={[{ at: [0, 0], color: INK }, { at: [2, 4 * Math.exp(-2)], color: GREEN }]}
            notes={[
                { y: 72, formula: 'f′ = e⁻ˣ(2x − x²)', color: STAGE },
                { y: 118, formula: 'f(2) = 4/e² ≈ 0,54', color: GREEN },
                { y: 150, text: say('maximoa', 'máximo', 'قيمة عظمى', 'maximum'), color: GREEN, size: 18 },
                { y: 198, formula: 'x → +∞ :  f → 0', color: SECOND },
                { y: 232, text: say('asintota horizontala', 'asíntota horizontal', 'مقارب أفقي', 'horizontal asymptote'), color: SECOND, size: 18 }
            ]}
            notesX={346}
        />
    )
}

/* ---------- 8. The bell e^(−x²) ---------- */

export function BellFigure({ language }: { language: UnitLanguage }) {
    const fn = (x: number) => Math.exp(-x * x)
    const p = 1 / Math.SQRT2
    return (
        <LimitPlot
            language={language}
            height={272}
            label={say('y = e^(−x²) kanpaia: maximoa (0, 1) puntuan, inflexioak x = ±1/√2 puntuetan, eta y = 0 asintota', 'La campana y = e^(−x²): máximo en (0, 1), inflexiones en x = ±1/√2 y asíntota y = 0', 'الجرس y = e^(−x²): قيمة عظمى عند (0, 1) وانعطاف عند x = ±1/√2 ومقارب y = 0', 'The bell y = e^(−x²): a maximum at (0, 1), inflections at x = ±1/√2 and asymptote y = 0')}
            box={{ xMin: -3, xMax: 3, yMin: -1, yMax: 5 }}
            cell={34}
            units={[1, 0.25]}
            curves={[{ fn, from: -3, to: 3 }]}
            dots={[{ at: [0, 1], color: GREEN }, { at: [-p, fn(p)], color: VIOLET }, { at: [p, fn(p)], color: VIOLET }]}
            notes={[
                { y: 72, formula: 'f(x) = e^(−x²)', color: STAGE },
                { y: 118, formula: '(0, 1)', color: GREEN, size: 21 },
                { y: 150, text: say('maximoa', 'máximo', 'قيمة عظمى', 'maximum'), color: GREEN, size: 18 },
                { y: 198, formula: 'x = ±1/√2', color: VIOLET, size: 21 },
                { y: 230, text: say('inflexioak', 'inflexiones', 'نقطتا انعطاف', 'inflections'), color: VIOLET, size: 18 }
            ]}
            notesX={290}
        />
    )
}

/* ---------- 9. ln x / x: maximum at x = e ---------- */

export function LogFigure({ language }: { language: UnitLanguage }) {
    return (
        <LimitPlot
            language={language}
            height={306}
            label={say('y = ln x / x: x > 0 denean bakarrik; X ardatza (1, 0) puntuan ebakitzen du, maximoa du x = e puntuan, eta bi ardatzak asintotak dira', 'y = ln x / x: solo para x > 0; corta el eje X en (1, 0), tiene un máximo en x = e y los dos ejes son asíntotas', 'y = ln x / x: فقط من أجل x > 0؛ تقطع المحور X عند (1, 0)، ولها قيمة عظمى عند x = e، والمحوران مقاربان', 'y = ln x / x: only for x > 0; it cuts the X axis at (1, 0), has a maximum at x = e, and both axes are asymptotes')}
            box={{ xMin: -1, xMax: 8, yMin: -6, yMax: 2 }}
            cell={30}
            units={[1, 0.25]}
            curves={[{ fn: (x) => Math.log(x) / x, from: 0.42, to: 8 }]}
            dots={[{ at: [1, 0], color: INK }, { at: [Math.E, 1 / Math.E], color: GREEN }]}
            notes={[
                { y: 72, formula: 'f′ = (1 − ln x)/x²', color: STAGE },
                { y: 118, formula: '(e, 1/e)', color: GREEN, size: 21 },
                { y: 150, text: say('maximoa', 'máximo', 'قيمة عظمى', 'maximum'), color: GREEN, size: 18 },
                { y: 198, formula: 'x → 0⁺ :  f → −∞', color: SECOND },
                { y: 240, formula: 'x → +∞ :  f → 0', color: SECOND }
            ]}
            notesX={346}
        />
    )
}

/* ---------- 10. √(x² − 4): a gap and one oblique asymptote on each side ---------- */

export function RootFigure({ language }: { language: UnitLanguage }) {
    const fn = (x: number) => Math.sqrt(Math.max(0, x * x - 4))
    return (
        <LimitPlot
            language={language}
            height={250}
            label={say('y = √(x² − 4): ez dago −2 eta 2 artean; asintota zeiharrak y = x eskuinean eta y = −x ezkerrean', 'y = √(x² − 4): no existe entre −2 y 2; asíntotas oblicuas y = x por la derecha e y = −x por la izquierda', 'y = √(x² − 4): غير موجودة بين −2 و2؛ مقاربان مائلان y = x من اليمين وy = −x من اليسار', 'y = √(x² − 4): it does not exist between −2 and 2; oblique asymptotes y = x on the right and y = −x on the left')}
            box={{ xMin: -5, xMax: 5, yMin: -1, yMax: 5 }}
            cell={26}
            strips={[{ from: -2, to: 2, color: INK }]}
            curves={[
                { fn: line(1, 0), from: 0, to: 5, color: SECOND, width: 2.4, dashed: true },
                { fn: line(-1, 0), from: -5, to: 0, color: SECOND, width: 2.4, dashed: true },
                { fn, from: -5, to: -2 },
                { fn, from: 2, to: 5 }
            ]}
            dots={[{ at: [-2, 0], color: INK }, { at: [2, 0], color: INK }]}
            notes={[
                { y: 70, formula: '|x| ≥ 2', color: STAGE, size: 21 },
                { y: 116, formula: 'x → +∞ :  y = x', color: SECOND },
                { y: 152, formula: 'x → −∞ :  y = −x', color: SECOND },
                { y: 196, text: say('zeihar bat alde bakoitzean', 'una oblicua a cada lado', 'مقارب مائل في كل جهة', 'one oblique on each side'), color: SECOND, size: 18 }
            ]}
            notesX={334}
        />
    )
}

/* ---------- 11. sin x + cos x on one period ---------- */

export function TrigFigure({ language }: { language: UnitLanguage }) {
    const sin = sine(language)
    const fn = (x: number) => Math.sin(x) + Math.cos(x)
    return (
        <LimitPlot
            language={language}
            height={262}
            label={say(`y = ${sin} x + cos x [0, 2π] tartean: maximoa √2 x = π/4 puntuan eta minimoa −√2 x = 5π/4 puntuan`, `y = ${sin} x + cos x en [0, 2π]: máximo √2 en x = π/4 y mínimo −√2 en x = 5π/4`, `y = ${sin} x + cos x على [0, 2π]: قيمة عظمى √2 عند x = π/4 وصغرى −√2 عند x = 5π/4`, `y = ${sin} x + cos x on [0, 2π]: maximum √2 at x = π/4 and minimum −√2 at x = 5π/4`)}
            box={{ xMin: -1, xMax: 7, yMin: -3, yMax: 3 }}
            cell={30}
            units={[1, 0.5]}
            strips={[{ from: 0, to: 2 * Math.PI, color: STAGE }]}
            curves={[{ fn, from: 0, to: 2 * Math.PI }]}
            dots={[{ at: [Math.PI / 4, Math.SQRT2], color: GREEN }, { at: [(5 * Math.PI) / 4, -Math.SQRT2], color: VIOLET }, { at: [(3 * Math.PI) / 4, 0], color: INK }, { at: [(7 * Math.PI) / 4, 0], color: INK }]}
            notes={[
                { y: 70, formula: `f′ = cos x − ${sin} x`, color: STAGE },
                { y: 116, formula: 'x = π/4 :  √2', color: GREEN },
                { y: 150, formula: 'x = 5π/4 :  −√2', color: VIOLET },
                { y: 196, text: say('periodo bat', 'un periodo', 'دور واحد', 'one period'), color: STAGE, size: 18 }
            ]}
            notesX={316}
        />
    )
}

/* ---------- 12. A parabola and a logarithm that meet with a corner at 0 ---------- */

export function PiecewiseFigure({ language }: { language: UnitLanguage }) {
    return (
        <LimitPlot
            language={language}
            height={274}
            label={say('Ezkerrean y = x² + 2x, minimoa (−1, −1) puntuan; eskuinean y = ln(x + 1); 0 puntuan lotzen dira, punta batekin, 2 eta 1 maldekin', 'A la izquierda y = x² + 2x, con mínimo en (−1, −1); a la derecha y = ln(x + 1); se unen en 0 con un pico, de pendientes 2 y 1', 'في اليسار y = x² + 2x بقيمة صغرى عند (−1, −1)، وفي اليمين y = ln(x + 1)؛ تلتقيان عند 0 بزاوية ميلاها 2 و1', 'On the left y = x² + 2x, with a minimum at (−1, −1); on the right y = ln(x + 1); they meet at 0 with a corner, slopes 2 and 1')}
            box={{ xMin: -4, xMax: 4, yMin: -2, yMax: 4 }}
            cell={30}
            curves={[
                { fn: line(2, 0), from: -0.9, to: 0.9, color: SECOND, width: 2.2, dashed: true },
                { fn: line(1, 0), from: -1.4, to: 1.4, color: VIOLET, width: 2.2, dashed: true },
                { fn: (x) => x * x + 2 * x, from: -3.2, to: 0 },
                { fn: (x) => Math.log(x + 1), from: 0, to: 4 }
            ]}
            dots={[{ at: [0, 0], color: INK }, { at: [-1, -1], color: GREEN }]}
            notes={[
                { y: 72, formula: 'f′(0⁻) = 2', color: SECOND, size: 21 },
                { y: 112, formula: 'f′(0⁺) = 1', color: VIOLET, size: 21 },
                { y: 146, text: say('punta', 'pico', 'زاوية', 'corner'), color: INK, size: 18 },
                { y: 196, formula: '(−1, −1)', color: GREEN, size: 21 },
                { y: 228, text: say('minimoa', 'mínimo', 'قيمة صغرى', 'minimum'), color: GREEN, size: 18 }
            ]}
            notesX={316}
        />
    )
}

/* ---------- 13. |f(x)| and f(|x|) for x² − 2x − 3, one plane each ---------- */

export function AbsoluteGraphsFigure({ language }: { language: UnitLanguage }) {
    const f = (x: number) => x * x - 2 * x - 3
    return (
        <>
            <LimitPlot
                language={language}
                height={240}
                label={say('y = |x² − 2x − 3|: −1 eta 3 arteko zatia gora islatzen da; puntak x = −1 eta x = 3 puntuetan', 'y = |x² − 2x − 3|: el trozo entre −1 y 3 se refleja hacia arriba; picos en x = −1 y x = 3', 'y = |x² − 2x − 3|: ينعكس الجزء بين −1 و3 إلى الأعلى؛ زاويتان عند x = −1 وx = 3', 'y = |x² − 2x − 3|: the piece between −1 and 3 is reflected upwards; corners at x = −1 and x = 3')}
                box={{ xMin: -3, xMax: 5, yMin: -3, yMax: 3 }}
                cell={30}
                units={[1, 2]}
                curves={[
                    { fn: f, from: -2.4, to: 4.4, color: INK, width: 2, dashed: true },
                    { fn: (x) => Math.abs(f(x)), from: -2.4, to: 4.4 }
                ]}
                dots={[{ at: [-1, 0], color: SECOND }, { at: [3, 0], color: SECOND }, { at: [1, 4], color: VIOLET }]}
                notes={[
                    { y: 70, formula: 'y = |f(x)|', color: STAGE, size: 21 },
                    { y: 114, formula: '|f(1)| = 4', color: VIOLET },
                    { y: 158, formula: 'x = −1,  x = 3', color: SECOND },
                    { y: 190, text: say('puntak', 'picos', 'زاويتان', 'corners'), color: SECOND, size: 18 }
                ]}
                notesX={316}
            />
            <LimitPlot
                language={language}
                height={240}
                label={say('y = x² − 2|x| − 3: x ≥ 0 duen zatia ezkerrera kopiatzen da; punta (0, −3) puntuan eta minimoak (±1, −4) puntuetan', 'y = x² − 2|x| − 3: la parte con x ≥ 0 se copia a la izquierda; pico en (0, −3) y mínimos en (±1, −4)', 'y = x² − 2|x| − 3: يُنسخ الجزء الذي فيه x ≥ 0 إلى اليسار؛ زاوية عند (0, −3) وقيمتان صغريان عند (±1, −4)', 'y = x² − 2|x| − 3: the part with x ≥ 0 is copied to the left; a corner at (0, −3) and minima at (±1, −4)')}
                box={{ xMin: -4, xMax: 4, yMin: -3, yMax: 3 }}
                cell={30}
                units={[1, 2]}
                curves={[
                    { fn: f, from: -2.4, to: 0, color: INK, width: 2, dashed: true },
                    { fn: (x) => f(Math.abs(x)), from: -4, to: 4 }
                ]}
                dots={[{ at: [0, -3], color: SECOND }, { at: [-1, -4], color: VIOLET }, { at: [1, -4], color: VIOLET }]}
                notes={[
                    { y: 70, formula: 'y = f(|x|)', color: STAGE, size: 21 },
                    { y: 114, formula: '(±1, −4)', color: VIOLET },
                    { y: 146, text: say('minimoak', 'mínimos', 'قيمتان صغريان', 'minima'), color: VIOLET, size: 18 },
                    { y: 192, formula: '(0, −3)', color: SECOND },
                    { y: 224, text: say('punta', 'pico', 'زاوية', 'corner'), color: SECOND, size: 18 }
                ]}
                notesX={316}
            />
        </>
    )
}

/* ---------- 14. The parabola f′ = x² − 1 and one f with it as derivative ---------- */

export function DerivativeGraphFigure({ language }: { language: UnitLanguage }) {
    return (
        <LimitPlot
            language={language}
            height={300}
            label={say('Marra etena: f′(x) = x² − 1. Marra osoa: f(x) = x³/3 − x, maximoa x = −1 puntuan, minimoa x = 1 puntuan eta inflexioa x = 0 puntuan', 'Línea discontinua: f′(x) = x² − 1. Línea continua: f(x) = x³/3 − x, con máximo en x = −1, mínimo en x = 1 e inflexión en x = 0', 'الخط المتقطع: f′(x) = x² − 1. الخط المتصل: f(x) = x³/3 − x بقيمة عظمى عند x = −1 وصغرى عند x = 1 وانعطاف عند x = 0', 'Dashed line: f′(x) = x² − 1. Solid line: f(x) = x³/3 − x, with a maximum at x = −1, a minimum at x = 1 and an inflection at x = 0')}
            box={{ xMin: -3, xMax: 3, yMin: -2, yMax: 4 }}
            cell={36}
            strips={[{ from: -1, to: 1, color: SECOND }]}
            curves={[
                { fn: (x) => x * x - 1, from: -2.3, to: 2.3, color: SECOND, width: 2.6, dashed: true },
                { fn: (x) => x ** 3 / 3 - x, from: -2.6, to: 2.6 }
            ]}
            dots={[{ at: [-1, 2 / 3], color: VIOLET }, { at: [1, -2 / 3], color: VIOLET }, { at: [0, 0], color: INK }]}
            notes={[
                { y: 70, formula: 'f′ = x² − 1', color: SECOND, size: 21 },
                { y: 102, text: say('marra etena', 'línea discontinua', 'الخط المتقطع', 'dashed line'), color: SECOND, size: 18 },
                { y: 150, formula: 'x = ±1', color: VIOLET, size: 21 },
                { y: 182, text: say('maximoa eta minimoa', 'máximo y mínimo', 'قيمة عظمى وقيمة صغرى', 'maximum and minimum'), color: VIOLET, size: 18 },
                { y: 230, formula: 'x = 0', color: INK, size: 21 },
                { y: 262, text: say('inflexioa', 'inflexión', 'انعطاف', 'inflection'), color: INK, size: 18 }
            ]}
            notesX={290}
        />
    )
}

/* ---------- 15. A curve that meets the data: x/(x − 2) ---------- */

export function DataCurveFigure({ language }: { language: UnitLanguage }) {
    const fn = (x: number) => x / (x - 2)
    return (
        <LimitPlot
            language={language}
            height={290}
            label={say('y = x/(x − 2): asintota bertikala x = 2 eta horizontala y = 1, (0, 0) puntutik igarotzen da eta beti beherakorra da', 'y = x/(x − 2): asíntota vertical x = 2 y horizontal y = 1, pasa por (0, 0) y siempre decrece', 'y = x/(x − 2): مقارب رأسي x = 2 وأفقي y = 1، تمر بالنقطة (0, 0) وتتناقص دائمًا', 'y = x/(x − 2): vertical asymptote x = 2 and horizontal y = 1, it passes through (0, 0) and always decreases')}
            box={{ xMin: -4, xMax: 6, yMin: -4, yMax: 5 }}
            cell={26}
            verticals={[2]}
            horizontals={[1]}
            curves={[
                { fn, from: -4, to: 1.86 },
                { fn, from: 2.15, to: 6 }
            ]}
            dots={[{ at: [0, 0], color: VIOLET }]}
            notes={[
                { y: 70, formula: 'x = 2', color: INK, size: 21 },
                { y: 110, formula: 'y = 1', color: INK, size: 21 },
                { y: 150, formula: 'f(0) = 0', color: VIOLET },
                { y: 194, formula: 'f′ < 0  ↘', color: SECOND, size: 21 },
                { y: 226, text: say('beti beherakorra', 'siempre decrece', 'تتناقص دائمًا', 'always decreasing'), color: SECOND, size: 18 }
            ]}
            notesX={334}
        />
    )
}

/* ---------- The hero art of the unit page ---------- */

export function Bach2SketchHeroArt() {
    return (
        <div className="fraction-v2-collage" aria-hidden="true">
            <svg viewBox="0 0 520 400" direction="ltr" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                <g transform="translate(22 24) rotate(-4)">
                    <rect width={280} height={220} rx={16} fill={PAPER} stroke={INK} strokeWidth={2} />
                    <line x1={20} y1={130} x2={262} y2={130} stroke={INK} strokeWidth={2} />
                    <line x1={60} y1={204} x2={60} y2={16} stroke={INK} strokeWidth={2} />
                    <line x1={150} y1={16} x2={150} y2={204} stroke="#58616e" strokeWidth={2} strokeDasharray="7 5" />
                    <line x1={24} y1={196} x2={260} y2={28} stroke="#c4432a" strokeWidth={2.6} strokeDasharray="7 5" />
                    <path d="M28 170 C 80 150, 120 140, 138 200" fill="none" stroke="#2f6fdb" strokeWidth={4} strokeLinecap="round" />
                    <path d="M160 20 C 168 90, 200 80, 256 40" fill="none" stroke="#2f6fdb" strokeWidth={4} strokeLinecap="round" />
                </g>
                <g transform="translate(320 46) rotate(5)">
                    <rect width={180} height={124} rx={16} fill="#e8e0f7" stroke={INK} strokeWidth={2} />
                    <text x={90} y={56} textAnchor="middle" fontSize={22} fontWeight={700} fill={INK} fontFamily={SERIF}>f(−x) = −f(x)</text>
                    <text x={90} y={98} textAnchor="middle" fontSize={22} fontWeight={700} fill={INK} fontFamily={SERIF}>f(x + T) = f(x)</text>
                </g>
                <g transform="translate(60 276) rotate(2)">
                    <rect width={400} height={88} rx={16} fill="#d9efe2" stroke={INK} strokeWidth={2} />
                    <text x={200} y={56} textAnchor="middle" fontSize={28} fontWeight={700} fill={INK} fontFamily={SERIF}>|f(x)|   f(|x|)   f′ → f</text>
                </g>
            </svg>
        </div>
    )
}
