import type { LocalizedText, UnitLanguage } from '../../features/unit-v2/types'
import { LimitPlot } from '../batx2-zientziak-limiteak/figures'

/* ==========================================================================
   Deribatuaren aplikazioak · Batxilergoa 2 · Zientziak — the lesson
   figures. Each one is a plane with curves, tangents and chords as
   straight curves and a column of notes (LimitPlot of Limiteak 2.º, whose
   notes are written large enough to be read on a phone). Formulas are
   notes of their own (left to right in every language); words go through
   the localized notes. Exported for 2.º Sociales, which has the same
   topic.
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
const flat = (height: number) => () => height

/* ---------- 1. Review: x·e^(−x) rises to a maximum at x = 1 ---------- */

export function MonotonyReviewFigure({ language }: { language: UnitLanguage }) {
    const fn = (x: number) => x * Math.exp(-x)
    return (
        <LimitPlot
            language={language}
            height={312}
            label={say('y = x·e⁻ˣ gorakorra da x = 1 arte eta beherakorra gero: maximoa (1, 1/e) puntuan', 'y = x·e⁻ˣ crece hasta x = 1 y después decrece: máximo en (1, 1/e)', 'y = x·e⁻ˣ تتزايد حتى x = 1 ثم تتناقص: قيمة عظمى عند (1, 1/e)', 'y = x·e⁻ˣ increases up to x = 1 and then decreases: a maximum at (1, 1/e)')}
            box={{ xMin: -1, xMax: 5, yMin: -4, yMax: 2 }}
            cell={40}
            units={[1, 0.25]}
            curves={[
                { fn, from: -0.3, to: 5 },
                { fn: flat(Math.exp(-1)), from: 0.2, to: 1.8, color: SECOND, width: 2.6, dashed: true }
            ]}
            dots={[{ at: [1, Math.exp(-1)], color: SECOND }]}
            notes={[
                { y: 76, formula: 'f′(x) = e⁻ˣ(1 − x)', color: STAGE },
                { y: 124, formula: 'x < 1 :  f′ > 0  ↗', color: GREEN },
                { y: 166, formula: 'x > 1 :  f′ < 0  ↘', color: SECOND },
                { y: 218, formula: 'f(1) = 1/e', color: INK },
                { y: 252, text: say('maximoa', 'máximo', 'قيمة عظمى', 'maximum'), size: 17 }
            ]}
            notesX={320}
        />
    )
}

/* ---------- 2. Review: x⁴ − 6x² changes its concavity at ±1 ---------- */

export function CurvatureReviewFigure({ language }: { language: UnitLanguage }) {
    return (
        <LimitPlot
            language={language}
            height={330}
            label={say('y = x⁴ − 6x²: ahurra |x| > 1 denean, ganbila |x| < 1 denean; inflexioak (±1, −5) puntuetan', 'y = x⁴ − 6x²: cóncava si |x| > 1, convexa si |x| < 1; inflexiones en (±1, −5)', 'y = x⁴ − 6x²: مقعّرة نحو الأعلى إذا |x| > 1 ونحو الأسفل إذا |x| < 1؛ انعطاف عند (±1, −5)', 'y = x⁴ − 6x²: concave up if |x| > 1, concave down if |x| < 1; inflections at (±1, −5)')}
            box={{ xMin: -3, xMax: 3, yMin: -5, yMax: 3 }}
            cell={32}
            units={[1, 2]}
            strips={[{ from: -3, to: -1, color: GREEN }, { from: -1, to: 1, color: SECOND }, { from: 1, to: 3, color: GREEN }]}
            curves={[{ fn: (x) => x ** 4 - 6 * x * x, from: -2.8, to: 2.8 }]}
            dots={[{ at: [-1, -5], color: INK }, { at: [1, -5], color: INK }]}
            notes={[
                { y: 76, formula: 'f″(x) = 12(x² − 1)', color: STAGE },
                { y: 126, formula: '|x| > 1 :  ∪', color: GREEN, size: 21 },
                { y: 170, formula: '|x| < 1 :  ∩', color: SECOND, size: 21 },
                { y: 222, formula: '(±1, −5)', color: INK },
                { y: 256, text: say('inflexio-puntuak', 'puntos de inflexión', 'نقاط الانعطاف', 'points of inflection'), size: 17 }
            ]}
            notesX={290}
        />
    )
}

/* ---------- 3. Review: on [−1, 2] both extremes of 2x³ − 3x² are at the ends ---------- */

export function AbsoluteReviewFigure({ language }: { language: UnitLanguage }) {
    return (
        <LimitPlot
            language={language}
            height={312}
            label={say('y = 2x³ − 3x² [−1, 2] tartean: maximoa 4 da x = 2 muturrean, eta minimoa −5 x = −1 muturrean', 'y = 2x³ − 3x² en [−1, 2]: el máximo 4 está en el borde x = 2 y el mínimo −5 en el borde x = −1', 'y = 2x³ − 3x² على [−1, 2]: القيمة العظمى 4 عند الطرف x = 2 والصغرى −5 عند الطرف x = −1', 'y = 2x³ − 3x² on [−1, 2]: the maximum 4 is at the end x = 2 and the minimum −5 at the end x = −1')}
            box={{ xMin: -2, xMax: 3, yMin: -3, yMax: 3 }}
            cell={40}
            units={[1, 2]}
            strips={[{ from: -1, to: 2, color: STAGE }]}
            curves={[{ fn: (x) => 2 * x ** 3 - 3 * x * x, from: -1, to: 2 }]}
            dots={[{ at: [-1, -5], color: SECOND }, { at: [0, 0], color: INK }, { at: [1, -1], color: INK }, { at: [2, 4], color: GREEN }]}
            notes={[
                { y: 70, formula: 'f(2) = 4', color: GREEN, size: 21 },
                { y: 110, formula: 'f(0) = 0', color: INK },
                { y: 146, formula: 'f(1) = −1', color: INK },
                { y: 186, formula: 'f(−1) = −5', color: SECOND, size: 21 },
                { y: 236, text: say('biak muturretan', 'los dos en los bordes', 'كلاهما عند الطرفين', 'both at the ends'), size: 17 }
            ]}
            notesX={290}
        />
    )
}

/* ---------- 4. Rolle: equal heights at 0 and 4, a horizontal tangent at c = 2 ---------- */

export function RolleFigure({ language }: { language: UnitLanguage }) {
    return (
        <LimitPlot
            language={language}
            height={304}
            label={say('y = x² − 4x + 1: f(0) = f(4) = 1, eta zuzen ukitzailea horizontala da c = 2 puntuan', 'y = x² − 4x + 1: f(0) = f(4) = 1, y la tangente es horizontal en c = 2', 'y = x² − 4x + 1: f(0) = f(4) = 1، والمماس أفقي عند c = 2', 'y = x² − 4x + 1: f(0) = f(4) = 1, and the tangent is horizontal at c = 2')}
            box={{ xMin: -1, xMax: 5, yMin: -4, yMax: 3 }}
            cell={34}
            curves={[
                { fn: (x) => x * x - 4 * x + 1, from: -0.6, to: 4.6 },
                { fn: flat(1), from: 0, to: 4, color: VIOLET, width: 2.6, dashed: true },
                { fn: flat(-3), from: 0.8, to: 3.2, color: SECOND, width: 3 }
            ]}
            dots={[{ at: [0, 1], color: VIOLET }, { at: [4, 1], color: VIOLET }, { at: [2, -3], color: SECOND }]}
            notes={[
                { y: 76, formula: 'f(0) = f(4) = 1', color: VIOLET },
                { y: 128, formula: 'f′(c) = 2c − 4 = 0', color: SECOND },
                { y: 168, formula: 'c = 2', color: SECOND, size: 21 },
                { y: 216, text: say('zuzen ukitzaile', 'tangente', 'مماس', 'horizontal'), color: SECOND, size: 17 },
                { y: 244, text: say('horizontala', 'horizontal', 'أفقي', 'tangent'), color: SECOND, size: 17 }
            ]}
            notesX={290}
        />
    )
}

/* ---------- 5. Bolzano gives a root of x³ + 3x − 1, Rolle forbids a second ---------- */

export function RootsFigure({ language }: { language: UnitLanguage }) {
    return (
        <LimitPlot
            language={language}
            height={330}
            label={say('y = x³ + 3x − 1 beti da gorakorra eta X ardatza behin ebakitzen du, 0 eta 1 artean', 'y = x³ + 3x − 1 siempre crece y corta el eje X una sola vez, entre 0 y 1', 'y = x³ + 3x − 1 متزايدة دائمًا وتقطع المحور X مرة واحدة بين 0 و1', 'y = x³ + 3x − 1 always increases and crosses the X axis only once, between 0 and 1')}
            box={{ xMin: -2, xMax: 2, yMin: -3, yMax: 3 }}
            cell={44}
            units={[1, 2]}
            strips={[{ from: 0, to: 1, color: STAGE }]}
            curves={[{ fn: (x) => x ** 3 + 3 * x - 1, from: -1.6, to: 1.4 }]}
            dots={[{ at: [0, -1], color: SECOND }, { at: [1, 3], color: GREEN }, { at: [0.3222, 0], color: INK }]}
            notes={[
                { y: 76, formula: 'f(0) = −1 < 0', color: SECOND },
                { y: 118, formula: 'f(1) = 3 > 0', color: GREEN },
                { y: 168, formula: 'f′(x) = 3x² + 3 > 0', color: STAGE },
                { y: 222, text: say('erro bakarra', 'una sola raíz', 'جذر واحد فقط', 'just one root'), size: 17 }
            ]}
            notesX={270}
        />
    )
}

/* ---------- 6. Mean value: the tangent at √3 is parallel to the secant of x³ ---------- */

export function MeanValueFigure({ language }: { language: UnitLanguage }) {
    const c = Math.sqrt(3)
    return (
        <LimitPlot
            language={language}
            height={312}
            label={say('y = x³ [0, 3] tartean: ebakitzaileak 9 malda du, eta c = √3 puntuko zuzen ukitzailea haren paraleloa da', 'y = x³ en [0, 3]: la secante tiene pendiente 9 y la tangente en c = √3 es paralela a ella', 'y = x³ على [0, 3]: ميل القاطع 9، والمماس عند c = √3 موازٍ له', 'y = x³ on [0, 3]: the secant has slope 9 and the tangent at c = √3 is parallel to it')}
            box={{ xMin: -1, xMax: 4, yMin: -1, yMax: 5 }}
            cell={40}
            units={[1, 6]}
            curves={[
                { fn: (x) => x ** 3, from: -1, to: 3.2 },
                { fn: line(9, 0), from: -0.3, to: 3.3, color: VIOLET, width: 2.6, dashed: true },
                { fn: line(9, -6 * c), from: 0.7, to: 2.9, color: SECOND, width: 3 }
            ]}
            dots={[{ at: [0, 0], color: VIOLET }, { at: [3, 27], color: VIOLET }, { at: [c, 3 * c], color: SECOND }]}
            notes={[
                { y: 76, formula: 'm = 27/3 = 9', color: VIOLET },
                { y: 124, formula: 'f′(c) = 3c² = 9', color: SECOND },
                { y: 166, formula: 'c = √3 ≈ 1,73', color: SECOND },
                { y: 222, text: say('paraleloak', 'paralelas', 'متوازيان', 'parallel'), size: 17 }
            ]}
            notesX={290}
        />
    )
}

/* ---------- 7. L'Hôpital: f/g and f′/g′ go to the same 1/2 ---------- */

export function HopitalFigure({ language }: { language: UnitLanguage }) {
    const quotient = (x: number) => (Math.exp(x) - 1 - x) / (x * x)
    const derivatives = (x: number) => (Math.exp(x) - 1) / (2 * x)
    return (
        <LimitPlot
            language={language}
            height={304}
            label={say('(eˣ − 1 − x)/x² eta (eˣ − 1)/(2x) biak 1/2 baliora hurbiltzen dira x → 0 doanean', '(eˣ − 1 − x)/x² y (eˣ − 1)/(2x) se acercan las dos a 1/2 cuando x → 0', '(eˣ − 1 − x)/x² و(eˣ − 1)/(2x) تقتربان كلتاهما من 1/2 عندما x → 0', '(eˣ − 1 − x)/x² and (eˣ − 1)/(2x) both approach 1/2 as x → 0')}
            box={{ xMin: -4, xMax: 4, yMin: -1, yMax: 6 }}
            cell={34}
            units={[0.5, 0.25]}
            curves={[
                { fn: quotient, from: -2, to: -0.02 },
                { fn: quotient, from: 0.02, to: 2 },
                { fn: derivatives, from: -2, to: -0.02, color: VIOLET, width: 2.8, dashed: true },
                { fn: derivatives, from: 0.02, to: 2, color: VIOLET, width: 2.8, dashed: true }
            ]}
            dots={[{ at: [0, 0.5], hollow: true, color: INK }]}
            notes={[
                { y: 76, formula: 'f/g = (eˣ − 1 − x)/x²', color: STAGE },
                { y: 118, formula: 'f′/g′ = (eˣ − 1)/(2x)', color: VIOLET },
                { y: 168, formula: 'x → 0 :  → 1/2', color: INK, size: 21 },
                { y: 216, text: say('limite bera', 'el mismo límite', 'النهاية نفسها', 'the same limit'), size: 17 }
            ]}
            notesX={336}
        />
    )
}

/* ---------- 8. 0·∞: x·ln x tends to 0 as x → 0⁺ ---------- */

export function ProductsFigure({ language }: { language: UnitLanguage }) {
    return (
        <LimitPlot
            language={language}
            height={320}
            label={say('y = x·ln x 0 baliora hurbiltzen da x → 0⁺ doanean, nahiz eta ln x → −∞', 'y = x·ln x se acerca a 0 cuando x → 0⁺, aunque ln x → −∞', 'y = x·ln x تقترب من 0 عندما x → 0⁺ مع أن ln x → −∞', 'y = x·ln x approaches 0 as x → 0⁺, although ln x → −∞')}
            box={{ xMin: -1, xMax: 5, yMin: -2, yMax: 6 }}
            cell={32}
            units={[0.5, 0.25]}
            curves={[
                { fn: (x) => x * Math.log(x), from: 0.002, to: 2.4 },
                { fn: (x) => Math.log(x), from: 0.12, to: 2.4, color: SECOND, width: 2.4, dashed: true }
            ]}
            dots={[{ at: [0, 0], hollow: true, color: INK }]}
            notes={[
                { y: 76, formula: 'x · ln x', color: STAGE, size: 21 },
                { y: 118, formula: 'ln x → −∞', color: SECOND },
                { y: 166, formula: 'ln x / (1/x)', color: STAGE },
                { y: 210, formula: 'x → 0⁺ :  → 0', color: INK, size: 21 }
            ]}
            notesX={270}
        />
    )
}

/* ---------- 9. 1^∞: (1 + 2x)^(1/x) tends to e² ---------- */

export function PowersFigure({ language }: { language: UnitLanguage }) {
    const fn = (x: number) => (1 + 2 * x) ** (1 / x)
    return (
        <LimitPlot
            language={language}
            height={312}
            label={say('y = (1 + 2x)^(1/x) e² ≈ 7,39 baliora hurbiltzen da x → 0 doanean', 'y = (1 + 2x)^(1/x) se acerca a e² ≈ 7,39 cuando x → 0', 'y = (1 + 2x)^(1/x) تقترب من e² ≈ 7.39 عندما x → 0', 'y = (1 + 2x)^(1/x) approaches e² ≈ 7.39 as x → 0')}
            box={{ xMin: -1, xMax: 4, yMin: 0, yMax: 6 }}
            cell={40}
            units={[0.5, 2]}
            curves={[{ fn, from: -0.22, to: -0.004 }, { fn, from: 0.004, to: 2 }]}
            horizontals={[Math.exp(2)]}
            dots={[{ at: [0, Math.exp(2)], hollow: true, color: SECOND }]}
            notes={[
                { y: 76, formula: '1^∞', color: STAGE, size: 21 },
                { y: 120, formula: 'ln L = 2', color: STAGE },
                { y: 162, formula: 'L = e² ≈ 7,39', color: SECOND },
                { y: 214, text: say('logaritmoekin', 'con logaritmos', 'باللوغاريتمات', 'with logarithms'), size: 17 }
            ]}
            notesX={290}
        />
    )
}

/* ---------- 10. Coefficients: −2x³ + 3x² has its maximum at (1, 1) ---------- */

export function ExtremeConditionFigure({ language }: { language: UnitLanguage }) {
    return (
        <LimitPlot
            language={language}
            height={290}
            label={say('y = −2x³ + 3x²: maximoa (1, 1) puntuan, zuzen ukitzaile horizontalarekin', 'y = −2x³ + 3x²: máximo en (1, 1), con tangente horizontal', 'y = −2x³ + 3x²: قيمة عظمى عند (1, 1) بمماس أفقي', 'y = −2x³ + 3x²: a maximum at (1, 1), with a horizontal tangent')}
            box={{ xMin: -2, xMax: 4, yMin: -2, yMax: 3 }}
            cell={40}
            units={[0.5, 1]}
            curves={[
                { fn: (x) => -2 * x ** 3 + 3 * x * x, from: -0.75, to: 1.75 },
                { fn: flat(1), from: 0.4, to: 1.6, color: SECOND, width: 2.6, dashed: true }
            ]}
            dots={[{ at: [1, 1], color: SECOND }, { at: [0, 0], color: INK }]}
            notes={[
                { y: 76, formula: 'f(1) = a + b = 1', color: STAGE },
                { y: 118, formula: 'f′(1) = 3a + 2b = 0', color: STAGE },
                { y: 166, formula: 'a = −2,  b = 3', color: SECOND, size: 21 },
                { y: 214, text: say('maximoa', 'máximo', 'قيمة عظمى', 'maximum'), color: SECOND, size: 17 }
            ]}
            notesX={320}
        />
    )
}

/* ---------- 11. Coefficients: x³ − 6x² + 6x bends at (2, −4) ---------- */

export function InflectionConditionFigure({ language }: { language: UnitLanguage }) {
    return (
        <LimitPlot
            language={language}
            height={304}
            label={say('y = x³ − 6x² + 6x: inflexioa (2, −4) puntuan; han zuzen ukitzaileak kurba zeharkatzen du', 'y = x³ − 6x² + 6x: inflexión en (2, −4); allí la tangente atraviesa la curva', 'y = x³ − 6x² + 6x: انعطاف عند (2, −4)؛ وهناك يخترق المماس المنحنى', 'y = x³ − 6x² + 6x: an inflection at (2, −4); there the tangent crosses the curve')}
            box={{ xMin: -1, xMax: 5, yMin: -5, yMax: 2 }}
            cell={34}
            units={[1, 2]}
            curves={[
                { fn: (x) => x ** 3 - 6 * x * x + 6 * x, from: -0.6, to: 4.6 },
                { fn: line(-6, 8), from: 0.7, to: 3.3, color: VIOLET, width: 2.6, dashed: true }
            ]}
            dots={[{ at: [2, -4], color: SECOND }]}
            notes={[
                { y: 76, formula: 'f″(2) = 12 + 2a = 0', color: STAGE },
                { y: 118, formula: 'a = −6', color: STAGE },
                { y: 160, formula: 'f(2) = −4  →  b = 6', color: SECOND },
                { y: 210, text: say('zuzen ukitzaileak', 'la tangente', 'المماس يخترق', 'the tangent'), color: VIOLET, size: 17 },
                { y: 238, text: say('kurba zeharkatzen du', 'atraviesa la curva', 'المنحنى', 'crosses the curve'), color: VIOLET, size: 17 }
            ]}
            notesX={290}
        />
    )
}

/* ---------- 12. Extremum and tangent: x³ − 3x + 2 ---------- */

export function ExtremeTangentFigure({ language }: { language: UnitLanguage }) {
    return (
        <LimitPlot
            language={language}
            height={312}
            label={say('y = x³ − 3x + 2: zuzen ukitzailea y = −3x + 2 da x = 0 puntuan, eta minimoa x = 1 puntuan dago', 'y = x³ − 3x + 2: la tangente en x = 0 es y = −3x + 2, y el mínimo está en x = 1', 'y = x³ − 3x + 2: المماس عند x = 0 هو y = −3x + 2، والقيمة الصغرى عند x = 1', 'y = x³ − 3x + 2: the tangent at x = 0 is y = −3x + 2, and the minimum is at x = 1')}
            box={{ xMin: -3, xMax: 3, yMin: -2, yMax: 6 }}
            cell={30}
            curves={[
                { fn: (x) => x ** 3 - 3 * x + 2, from: -2.4, to: 2.2 },
                { fn: line(-3, 2), from: -1.1, to: 1.6, color: VIOLET, width: 2.6, dashed: true }
            ]}
            dots={[{ at: [0, 2], color: VIOLET }, { at: [1, 0], color: SECOND }]}
            notes={[
                { y: 76, formula: 'y = −3x + 2', color: VIOLET },
                { y: 118, formula: 'c = 2,  b = −3', color: VIOLET },
                { y: 166, formula: 'f′(1) = 0  →  a = 1', color: SECOND },
                { y: 214, formula: 'f(x) = x³ − 3x + 2', color: STAGE }
            ]}
            notesX={260}
        />
    )
}

/* ---------- 13. Optimisation: the surface of the tank, smallest at x = 4 ---------- */

export function AreasFigure({ language }: { language: UnitLanguage }) {
    return (
        <LimitPlot
            language={language}
            height={296}
            label={say('S(x) = x² + 128/x azalera minimoa da x = 4 denean: 48 m²', 'La superficie S(x) = x² + 128/x es mínima en x = 4: 48 m²', 'المساحة S(x) = x² + 128/x صغرى عند x = 4: 48 m²', 'The surface S(x) = x² + 128/x is smallest at x = 4: 48 m²')}
            box={{ xMin: 0, xMax: 8, yMin: 0, yMax: 8 }}
            cell={28}
            units={[1, 20]}
            curves={[{ fn: (x) => x * x + 128 / x, from: 0.9, to: 8 }]}
            verticals={[4]}
            dots={[{ at: [4, 48], color: SECOND }]}
            notes={[
                { y: 76, formula: 'S(x) = x² + 128/x', color: STAGE },
                { y: 120, formula: 'S′(4) = 0', color: SECOND },
                { y: 162, formula: 'x = 4 m,  h = 2 m', color: SECOND },
                { y: 206, formula: 'S = 48 m²', color: INK, size: 21 }
            ]}
            notesX={290}
        />
    )
}

/* ---------- 14. Distance: from P(9/2, 0) to y = √x, along the normal ---------- */

export function DistanceFigure({ language }: { language: UnitLanguage }) {
    return (
        <LimitPlot
            language={language}
            height={262}
            label={say('y = √x kurbaren puntu hurbilena P(9/2, 0) puntutik Q(4, 2) da; PQ zuzen ukitzailearekiko perpendikularra da', 'El punto de y = √x más cercano a P(9/2, 0) es Q(4, 2); PQ es perpendicular a la tangente', 'أقرب نقطة من y = √x إلى P(9/2, 0) هي Q(4, 2)؛ والقطعة PQ عمودية على المماس', 'The point of y = √x closest to P(9/2, 0) is Q(4, 2); PQ is perpendicular to the tangent')}
            box={{ xMin: 0, xMax: 7, yMin: -1, yMax: 4 }}
            cell={36}
            curves={[
                { fn: (x) => Math.sqrt(x), from: 0, to: 7 },
                { fn: line(0.25, 1), from: 1.8, to: 6.8, color: VIOLET, width: 2.6, dashed: true },
                { fn: line(-4, 18), from: 4, to: 4.5, color: SECOND, width: 3.2 }
            ]}
            dots={[{ at: [4.5, 0], color: SECOND, name: 'P' }, { at: [4, 2], color: SECOND, name: 'Q' }]}
            notes={[
                { y: 70, formula: 'D(x) = x² − 8x + 81/4', color: STAGE },
                { y: 112, formula: 'Q(4, 2)', color: SECOND, size: 21 },
                { y: 154, formula: 'm(PQ) = −4', color: SECOND },
                { y: 190, formula: 'm(t) = 1/4', color: VIOLET },
                { y: 230, text: say('perpendikularrak', 'perpendiculares', 'متعامدان', 'perpendicular'), size: 17 }
            ]}
            notesX={310}
        />
    )
}

/* ---------- 15. Profit on [0, 6]: the maximum is inside, at x = 5 ---------- */

export function ContextsFigure({ language }: { language: UnitLanguage }) {
    return (
        <LimitPlot
            language={language}
            height={296}
            label={say('B(x) = −x³ + 9x² − 15x [0, 6] tartean: minimoa x = 1 puntuan, eta maximoa 25 x = 5 puntuan', 'B(x) = −x³ + 9x² − 15x en [0, 6]: mínimo en x = 1 y máximo 25 en x = 5', 'B(x) = −x³ + 9x² − 15x على [0, 6]: قيمة صغرى عند x = 1 وعظمى 25 عند x = 5', 'B(x) = −x³ + 9x² − 15x on [0, 6]: a minimum at x = 1 and a maximum of 25 at x = 5')}
            box={{ xMin: -1, xMax: 7, yMin: -2, yMax: 6 }}
            cell={28}
            units={[1, 5]}
            strips={[{ from: 0, to: 6, color: STAGE }]}
            curves={[{ fn: (x) => -(x ** 3) + 9 * x * x - 15 * x, from: 0, to: 6 }]}
            dots={[{ at: [0, 0], color: INK }, { at: [1, -7], color: INK }, { at: [5, 25], color: GREEN }, { at: [6, 18], color: VIOLET }]}
            notes={[
                { y: 70, formula: 'B(0) = 0', color: INK },
                { y: 108, formula: 'B(1) = −7', color: INK },
                { y: 150, formula: 'B(5) = 25', color: GREEN, size: 21 },
                { y: 192, formula: 'B(6) = 18', color: VIOLET },
                { y: 236, text: say('maximoa barruan', 'el máximo, dentro', 'العظمى في الداخل', 'the maximum, inside'), color: GREEN, size: 17 }
            ]}
            notesX={290}
        />
    )
}

/* ---------- The hero art of the unit page ---------- */

export function Bach2ApplicationsHeroArt() {
    return (
        <div className="fraction-v2-collage" aria-hidden="true">
            <svg viewBox="0 0 520 400" direction="ltr" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                <g transform="translate(22 26) rotate(-4)">
                    <rect width={272} height={214} rx={16} fill={PAPER} stroke={INK} strokeWidth={2} />
                    <line x1={20} y1={180} x2={256} y2={180} stroke={INK} strokeWidth={2} />
                    <line x1={40} y1={198} x2={40} y2={16} stroke={INK} strokeWidth={2} />
                    <path d="M56 70 C 96 168, 196 168, 236 70" fill="none" stroke="#2f6fdb" strokeWidth={4} strokeLinecap="round" />
                    <line x1={56} y1={70} x2={236} y2={70} stroke="#7a4fc9" strokeWidth={3} strokeDasharray="7 5" />
                    <line x1={98} y1={143} x2={194} y2={143} stroke="#c4432a" strokeWidth={3.4} />
                    <circle cx={146} cy={143} r={7} fill="#c4432a" />
                </g>
                <g transform="translate(318 44) rotate(5)">
                    <rect width={184} height={124} rx={16} fill="#d9efe2" stroke={INK} strokeWidth={2} />
                    <text x={92} y={56} textAnchor="middle" fontSize={22} fontWeight={700} fill={INK} fontFamily={SERIF}>0/0  ∞/∞</text>
                    <text x={92} y={98} textAnchor="middle" fontSize={24} fontWeight={700} fill={INK} fontFamily={SERIF}>f/g → f′/g′</text>
                </g>
                <g transform="translate(56 274) rotate(2)">
                    <rect width={408} height={90} rx={16} fill="#f6d8cf" stroke={INK} strokeWidth={2} />
                    <text x={204} y={58} textAnchor="middle" fontSize={28} fontWeight={700} fill={INK} fontFamily={SERIF}>f′(c) = (f(b) − f(a)) / (b − a)</text>
                </g>
            </svg>
        </div>
    )
}
