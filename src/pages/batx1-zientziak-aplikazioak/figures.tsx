import type { LocalizedText, UnitLanguage } from '../../features/unit-v2/types'
import { PlotFigure } from '../batx1-zientziak-limiteak/figures'

/* ==========================================================================
   Deribatuaren aplikazioak · Batxilergoa 1 · Zientziak — the lesson
   figures: one plane each (PlotFigure from Límites) with the curve, its
   maxima, minima and inflections as dots, the tangents that matter as
   straight curves, and a column of notes. Formulas sit in their own
   <text> (left to right in every language); the words of a note go
   through <Label>, words only, so that Arabic is not mixed with formulas.
   Each stage paints --stage in its colour, so the second colours are
   chosen per stage: no --second on the coral stage, no green on the
   green stage.
   ========================================================================== */

const INK = 'var(--ink, #1d2733)'
const MUTED = 'var(--muted, #58616e)'
const SECOND = 'var(--second, #c4432a)'
const GREEN = 'var(--success, #267b53)'
/** A colour of its own for a second curve or point, apart from every stage colour */
const VIOLET = '#7b52c7'
const PAPER = '#fffcf6'
const SERIF = 'Fraunces, serif'

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const line = (m: number, n: number) => (x: number) => m * x + n

const words = {
    increases: say('gorakorra ↗', 'crece ↗', 'متزايدة ↗', 'increasing ↗'),
    decreases: say('beherakorra ↘', 'decrece ↘', 'متناقصة ↘', 'decreasing ↘'),
    maximum: say('maximoa', 'máximo', 'قيمة عظمى', 'maximum'),
    minimum: say('minimoa', 'mínimo', 'قيمة صغرى', 'minimum'),
    inflection: say('inflexioa', 'inflexión', 'انعطاف', 'inflection'),
    up: say('ahurra (∪)', 'cóncava (∪)', 'مقعّرة نحو الأعلى (∪)', 'concave up (∪)'),
    down: say('ganbila (∩)', 'convexa (∩)', 'مقعّرة نحو الأسفل (∩)', 'concave down (∩)')
}

/* ---------- 1. The sign of f′: x³ − 12x at x = 1 and x = 3 ---------- */

export function SignMonotonyFigure({ language }: { language: UnitLanguage }) {
    return (
        <PlotFigure
            language={language}
            height={350}
            label={say('y = x³ − 12x eta haren zuzen ukitzaileak x = 1 eta x = 3 puntuetan', 'y = x³ − 12x y sus tangentes en x = 1 y x = 3', 'y = x³ − 12x ومماساها عند x = 1 و x = 3', 'y = x³ − 12x and its tangents at x = 1 and x = 3')}
            box={{ xMin: -4, xMax: 4, yMin: -5, yMax: 5 }}
            cell={28}
            units={[1, 4]}
            curves={[
                { fn: (x) => x ** 3 - 12 * x, from: -4.3, to: 4.3 },
                { fn: line(-9, -2), from: 0.2, to: 1.8, color: SECOND, width: 3 },
                { fn: line(15, -54), from: 2.55, to: 3.45, color: GREEN, width: 3 }
            ]}
            dots={[{ at: [1, -11], color: SECOND }, { at: [3, -9], color: GREEN }]}
            notes={[
                { y: 70, formula: 'f′(x) = 3x² − 12', size: 19 },
                { y: 126, formula: 'f′(1) = −9 < 0', color: SECOND, size: 20 },
                { y: 158, text: words.decreases, color: SECOND, size: 17 },
                { y: 214, formula: 'f′(3) = 15 > 0', color: GREEN, size: 20 },
                { y: 246, text: words.increases, color: GREEN, size: 17 }
            ]}
            notesX={310}
        />
    )
}

/* ---------- 2. Intervals: the sign chart of 2x³ − 3x² − 12x ---------- */

export function SignChartFigure({ language }: { language: UnitLanguage }) {
    return (
        <PlotFigure
            language={language}
            height={300}
            label={say('y = 2x³ − 3x² − 12x: gorakorra −1 baino lehen eta 2 ondoren, beherakorra bien artean', 'y = 2x³ − 3x² − 12x: crece antes de −1 y después de 2, decrece entre los dos', 'y = 2x³ − 3x² − 12x: تتزايد قبل −1 وبعد 2 وتتناقص بينهما', 'y = 2x³ − 3x² − 12x: increasing before −1 and after 2, decreasing in between')}
            box={{ xMin: -3, xMax: 4, yMin: -5, yMax: 3 }}
            cell={30}
            units={[1, 5]}
            curves={[{ fn: (x) => 2 * x ** 3 - 3 * x * x - 12 * x, from: -3.3, to: 4.3 }]}
            dots={[{ at: [-1, 7], color: SECOND }, { at: [2, -20], color: SECOND }]}
            notes={[
                { y: 70, formula: 'f′ = 6(x + 1)(x − 2)', size: 19 },
                { y: 124, formula: '(−∞, −1):  +  ↗', color: GREEN, size: 19 },
                { y: 164, formula: '(−1, 2):  −  ↘', color: SECOND, size: 19 },
                { y: 204, formula: '(2, +∞):  +  ↗', color: GREEN, size: 19 }
            ]}
            notesX={300}
        />
    )
}

/* ---------- 3. Always increasing: x³ − 3x² + 3x (a = 3) against a = 0 ---------- */

export function AlwaysIncreasingFigure({ language }: { language: UnitLanguage }) {
    return (
        <PlotFigure
            language={language}
            height={330}
            label={say('a = 3 denean, y = x³ − 3x² + 3x beti da gorakorra; a = 0 denean, igo eta jaisten da', 'Con a = 3, y = x³ − 3x² + 3x crece siempre; con a = 0, sube y baja', 'مع a = 3 تتزايد y = x³ − 3x² + 3x دائمًا، ومع a = 0 تصعد وتنزل', 'With a = 3, y = x³ − 3x² + 3x always increases; with a = 0, it goes up and down')}
            box={{ xMin: -1, xMax: 4, yMin: -5, yMax: 3 }}
            cell={34}
            curves={[
                { fn: (x) => x ** 3 - 3 * x * x, from: -1.3, to: 3.4, color: MUTED, width: 2.4, dashed: true },
                { fn: (x) => x ** 3 - 3 * x * x + 3 * x, from: -1.3, to: 2.4 },
                { fn: line(0, 1), from: 0.3, to: 1.7, color: SECOND, width: 2.6 }
            ]}
            dots={[{ at: [1, 1], color: SECOND }]}
            notes={[
                { y: 70, formula: 'a = 3', size: 21 },
                { y: 104, formula: 'f′ = 3(x − 1)² ≥ 0', size: 19 },
                { y: 136, text: say('beti gorakorra', 'crece siempre', 'متزايدة دائمًا', 'always increasing'), size: 17 },
                { y: 196, formula: 'a = 0', color: MUTED, size: 21 },
                { y: 228, text: say('igo eta jaisten da', 'sube y baja', 'تصعد وتنزل', 'goes up and down'), color: MUTED, size: 17 }
            ]}
            notesX={290}
        />
    )
}

/* ---------- 4. Stationary points: x³ − 3x + 2 ---------- */

export function SingularFigure({ language }: { language: UnitLanguage }) {
    return (
        <PlotFigure
            language={language}
            height={350}
            label={say('y = x³ − 3x + 2: maximoa (−1, 4) puntuan eta minimoa (1, 0) puntuan, zuzen ukitzaile horizontalekin', 'y = x³ − 3x + 2: máximo en (−1, 4) y mínimo en (1, 0), con tangentes horizontales', 'y = x³ − 3x + 2: قيمة عظمى عند (−1, 4) وصغرى عند (1, 0) بمماسين أفقيين', 'y = x³ − 3x + 2: maximum at (−1, 4) and minimum at (1, 0), with horizontal tangents')}
            box={{ xMin: -3, xMax: 3, yMin: -2, yMax: 6 }}
            cell={36}
            curves={[
                { fn: (x) => x ** 3 - 3 * x + 2, from: -3.2, to: 3.2 },
                { fn: line(0, 4), from: -1.8, to: -0.2, color: SECOND, width: 2.6 },
                { fn: line(0, 0), from: 0.2, to: 1.8, color: GREEN, width: 2.6 }
            ]}
            dots={[{ at: [-1, 4], color: SECOND }, { at: [1, 0], color: GREEN }]}
            notes={[
                { y: 74, formula: 'f′ = 3x² − 3', size: 19 },
                { y: 124, formula: '+   −   +', size: 22 },
                { y: 176, formula: '(−1, 4)', color: SECOND, size: 20 },
                { y: 206, text: words.maximum, color: SECOND, size: 17 },
                { y: 256, formula: '(1, 0)', color: GREEN, size: 20 },
                { y: 286, text: words.minimum, color: GREEN, size: 17 }
            ]}
            notesX={300}
        />
    )
}

/* ---------- 5. The second derivative test: x³ − 6x² + 9x ---------- */

export function SecondDerivativeFigure({ language }: { language: UnitLanguage }) {
    return (
        <PlotFigure
            language={language}
            height={350}
            label={say('y = x³ − 6x² + 9x: f″(1) < 0 maximoan eta f″(3) > 0 minimoan', 'y = x³ − 6x² + 9x: f″(1) < 0 en el máximo y f″(3) > 0 en el mínimo', 'y = x³ − 6x² + 9x: f″(1) < 0 عند العظمى و f″(3) > 0 عند الصغرى', 'y = x³ − 6x² + 9x: f″(1) < 0 at the maximum and f″(3) > 0 at the minimum')}
            box={{ xMin: -1, xMax: 5, yMin: -2, yMax: 6 }}
            cell={36}
            curves={[{ fn: (x) => x ** 3 - 6 * x * x + 9 * x, from: -0.4, to: 4.6 }]}
            dots={[{ at: [1, 4], color: SECOND }, { at: [3, 0], color: GREEN }]}
            notes={[
                { y: 74, formula: 'f″(x) = 6x − 12', size: 19 },
                { y: 132, formula: 'f″(1) = −6 < 0', color: SECOND, size: 20 },
                { y: 164, text: words.maximum, color: SECOND, size: 17 },
                { y: 222, formula: 'f″(3) = 6 > 0', color: GREEN, size: 20 },
                { y: 254, text: words.minimum, color: GREEN, size: 17 }
            ]}
            notesX={300}
        />
    )
}

/* ---------- 6. Coefficients from the extrema: x³ − 3x² + 3 ---------- */

export function ExtremeCoefficientsFigure({ language }: { language: UnitLanguage }) {
    return (
        <PlotFigure
            language={language}
            height={300}
            label={say('y = x³ − 3x² + 3 eta haren minimoa (2, −1) puntuan', 'y = x³ − 3x² + 3 y su mínimo en (2, −1)', 'y = x³ − 3x² + 3 وقيمتها الصغرى عند (2, −1)', 'y = x³ − 3x² + 3 and its minimum at (2, −1)')}
            box={{ xMin: -1, xMax: 4, yMin: -2, yMax: 4 }}
            cell={38}
            curves={[
                { fn: (x) => x ** 3 - 3 * x * x + 3, from: -1.2, to: 3.4 },
                { fn: line(0, -1), from: 1.2, to: 2.8, color: SECOND, width: 2.6 }
            ]}
            dots={[{ at: [2, -1], color: SECOND }]}
            notes={[
                { y: 74, formula: 'f′(2) = 12 + 4a = 0', size: 19 },
                { y: 108, formula: 'a = −3', color: SECOND, size: 21 },
                { y: 164, formula: 'f(2) = 8 − 12 + b = −1', size: 19 },
                { y: 198, formula: 'b = 3', color: SECOND, size: 21 }
            ]}
            notesX={290}
        />
    )
}

/* ---------- 7. Concavity: x³ − 3x², ∩ at −1 and ∪ at 2 ---------- */

export function ConcavityFigure({ language }: { language: UnitLanguage }) {
    return (
        <PlotFigure
            language={language}
            height={350}
            label={say('y = x³ − 3x²: x = −1 puntuan zuzen ukitzailea kurbaren gainean dago (∩), eta x = 2 puntuan azpian (∪)', 'y = x³ − 3x²: en x = −1 la tangente queda por encima de la curva (∩), y en x = 2 por debajo (∪)', 'y = x³ − 3x²: عند x = −1 يقع المماس فوق المنحنى (∩) وعند x = 2 تحته (∪)', 'y = x³ − 3x²: at x = −1 the tangent lies above the curve (∩), and at x = 2 below it (∪)')}
            box={{ xMin: -2, xMax: 4, yMin: -6, yMax: 2 }}
            cell={36}
            curves={[
                { fn: (x) => x ** 3 - 3 * x * x, from: -2.2, to: 3.6 },
                { fn: line(9, 5), from: -1.45, to: -0.55, color: SECOND, width: 2.6 },
                { fn: line(0, -4), from: 1.1, to: 2.9, color: GREEN, width: 2.6 }
            ]}
            dots={[{ at: [-1, -4], color: SECOND }, { at: [2, -4], color: GREEN }]}
            notes={[
                { y: 74, formula: 'f″(x) = 6x − 6', size: 19 },
                { y: 130, formula: 'f″(−1) = −12 < 0', color: SECOND, size: 19 },
                { y: 162, text: words.down, color: SECOND, size: 17 },
                { y: 218, formula: 'f″(2) = 6 > 0', color: GREEN, size: 19 },
                { y: 250, text: words.up, color: GREEN, size: 17 }
            ]}
            notesX={300}
        />
    )
}

/* ---------- 8. A point of inflection: x³ − 6x² + 4 at (2, −12) ---------- */

export function InflectionFigure({ language }: { language: UnitLanguage }) {
    return (
        <PlotFigure
            language={language}
            height={330}
            label={say('y = x³ − 6x² + 4: ganbila 2 baino lehen, ahurra 2 ondoren, eta inflexioa (2, −12) puntuan', 'y = x³ − 6x² + 4: convexa antes de 2, cóncava después, e inflexión en (2, −12)', 'y = x³ − 6x² + 4: مقعّرة نحو الأسفل قبل 2 ونحو الأعلى بعده، وانعطاف عند (2, −12)', 'y = x³ − 6x² + 4: concave down before 2, concave up after it, and an inflection at (2, −12)')}
            box={{ xMin: -1, xMax: 6, yMin: -8, yMax: 2 }}
            cell={28}
            units={[1, 4]}
            curves={[
                { fn: (x) => x ** 3 - 6 * x * x + 4, from: -1.2, to: 6.1 },
                { fn: line(-12, 12), from: 0.9, to: 3.1, color: VIOLET, width: 2.6 }
            ]}
            dots={[{ at: [2, -12], color: VIOLET }]}
            notes={[
                { y: 70, formula: 'f″(x) = 6x − 12', size: 19 },
                { y: 120, formula: 'x < 2', color: SECOND, size: 19 },
                { y: 150, text: words.down, color: SECOND, size: 17 },
                { y: 200, formula: 'x > 2', color: GREEN, size: 19 },
                { y: 230, text: words.up, color: GREEN, size: 17 },
                { y: 280, formula: '(2, −12)', color: VIOLET, size: 20 }
            ]}
            notesX={290}
        />
    )
}

/* ---------- 9. Coefficients from an inflection: −x³ + 3x² + 3 at (1, 5) ---------- */

export function InflectionCoefficientsFigure({ language }: { language: UnitLanguage }) {
    return (
        <PlotFigure
            language={language}
            height={330}
            label={say('y = −x³ + 3x² + 3 eta haren inflexio-puntua (1, 5), zuzen ukitzaileak kurba zeharkatzen duela', 'y = −x³ + 3x² + 3 y su punto de inflexión (1, 5), donde la tangente atraviesa la curva', 'y = −x³ + 3x² + 3 ونقطة انعطافها (1, 5) حيث يخترق المماس المنحنى', 'y = −x³ + 3x² + 3 and its point of inflection (1, 5), where the tangent crosses the curve')}
            box={{ xMin: -1, xMax: 3, yMin: -1, yMax: 8 }}
            cell={30}
            curves={[
                { fn: (x) => -(x ** 3) + 3 * x * x + 3, from: -1.2, to: 3.3 },
                { fn: line(3, 2), from: -0.2, to: 2.1, color: VIOLET, width: 2.6 }
            ]}
            dots={[{ at: [1, 5], color: VIOLET }]}
            notes={[
                { y: 74, formula: 'f″(x) = 6ax + 6', size: 19 },
                { y: 108, formula: 'f″(1) = 0  →  a = −1', size: 19 },
                { y: 164, formula: 'f(1) = 5  →  b = 3', size: 19 },
                { y: 220, text: words.inflection, color: VIOLET, size: 17 },
                { y: 252, formula: '(1, 5)', color: VIOLET, size: 20 }
            ]}
            notesX={250}
        />
    )
}

/* ---------- 10. Absolute extrema: x³ − 3x on [0, 3] ---------- */

export function AbsoluteFigure({ language }: { language: UnitLanguage }) {
    return (
        <PlotFigure
            language={language}
            height={310}
            label={say('y = x³ − 3x [0, 3] tartean: minimo absolutua x = 1 puntuan eta maximo absolutua x = 3 ertzean', 'y = x³ − 3x en [0, 3]: mínimo absoluto en x = 1 y máximo absoluto en el borde x = 3', 'y = x³ − 3x في [0, 3]: صغرى مطلقة عند x = 1 وعظمى مطلقة عند الطرف x = 3', 'y = x³ − 3x on [0, 3]: absolute minimum at x = 1 and absolute maximum at the edge x = 3')}
            box={{ xMin: -1, xMax: 4, yMin: -1, yMax: 5 }}
            cell={38}
            units={[1, 4]}
            curves={[
                { fn: (x) => x ** 3 - 3 * x, from: -1.2, to: 0, color: MUTED, width: 2, dashed: true },
                { fn: (x) => x ** 3 - 3 * x, from: 3, to: 3.25, color: MUTED, width: 2, dashed: true },
                { fn: (x) => x ** 3 - 3 * x, from: 0, to: 3 }
            ]}
            dots={[{ at: [0, 0], color: MUTED }, { at: [1, -2], color: VIOLET }, { at: [3, 18], color: GREEN }]}
            verticals={[0, 3]}
            notes={[
                { y: 78, formula: 'f(0) = 0', color: MUTED, size: 20 },
                { y: 116, formula: 'f(1) = −2', color: VIOLET, size: 20 },
                { y: 154, formula: 'f(3) = 18', color: GREEN, size: 20 },
                { y: 210, text: say('maximoa ertz batean', 'el máximo, en un borde', 'العظمى عند طرف', 'the maximum, at an edge'), color: GREEN, size: 17 }
            ]}
            notesX={300}
        />
    )
}

/* ---------- 11. A geometric problem: the area of a rectangle of perimeter 20 ---------- */

export function RectangleFigure({ language }: { language: UnitLanguage }) {
    return (
        <PlotFigure
            language={language}
            height={320}
            label={say('A(x) = x(10 − x): azalera maximoa 25 da, x = 5 denean (karratua)', 'A(x) = x(10 − x): el área máxima es 25, con x = 5 (el cuadrado)', 'A(x) = x(10 − x): أكبر مساحة 25 عند x = 5 (المربع)', 'A(x) = x(10 − x): the greatest area is 25, at x = 5 (the square)')}
            box={{ xMin: 0, xMax: 6, yMin: -1, yMax: 6 }}
            cell={36}
            units={[2, 5]}
            curves={[{ fn: (x) => 10 * x - x * x, from: 0, to: 10 }]}
            dots={[{ at: [2, 16], color: MUTED }, { at: [8, 16], color: MUTED }, { at: [5, 25], color: GREEN }]}
            notes={[
                { y: 78, formula: 'x = 2:  A = 16', color: MUTED, size: 19 },
                { y: 116, formula: 'x = 8:  A = 16', color: MUTED, size: 19 },
                { y: 164, formula: 'x = 5:  A = 25', color: GREEN, size: 21 },
                { y: 200, text: say('karratua da onena', 'el cuadrado gana', 'المربع هو الأفضل', 'the square wins'), color: GREEN, size: 17 }
            ]}
            notesX={300}
        />
    )
}

/* ---------- 12. Profit: B(x) = 40x − x² ---------- */

export function ProfitFigure({ language }: { language: UnitLanguage }) {
    return (
        <PlotFigure
            language={language}
            height={290}
            label={say('B(x) = 40x − x²: x = 20 unitaterekin, mozkinik handiena 400 € da', 'B(x) = 40x − x²: con x = 20 unidades, el beneficio máximo es 400 €', 'B(x) = 40x − x²: مع x = 20 وحدة يكون الربح الأكبر 400 €', 'B(x) = 40x − x²: with x = 20 units, the greatest profit is €400')}
            box={{ xMin: 0, xMax: 9, yMin: -1, yMax: 5 }}
            cell={32}
            units={[5, 100]}
            curves={[{ fn: (x) => 40 * x - x * x, from: 0, to: 42 }, { fn: line(0, 400), from: 0, to: 20, color: MUTED, width: 1.6, dashed: true }]}
            dots={[{ at: [20, 400], color: GREEN }]}
            notes={[
                { y: 74, formula: 'B′(x) = 40 − 2x', size: 19 },
                { y: 112, formula: 'x = 20', size: 20 },
                { y: 160, formula: 'B(20) = 400', color: GREEN, size: 22 },
                { y: 196, text: say('hori da erantzuna', 'esa es la respuesta', 'هذا هو الجواب', 'that is the answer'), color: GREEN, size: 17 }
            ]}
            notesX={360}
        />
    )
}

/* ---------- 13. A polynomial: −x³ + 3x ---------- */

export function PolynomialGraphFigure({ language }: { language: UnitLanguage }) {
    return (
        <PlotFigure
            language={language}
            height={350}
            label={say('y = −x³ + 3x: minimoa (−1, −2), maximoa (1, 2) eta inflexioa (0, 0)', 'y = −x³ + 3x: mínimo (−1, −2), máximo (1, 2) e inflexión (0, 0)', 'y = −x³ + 3x: صغرى (−1, −2) وعظمى (1, 2) وانعطاف (0, 0)', 'y = −x³ + 3x: minimum (−1, −2), maximum (1, 2) and inflection (0, 0)')}
            box={{ xMin: -3, xMax: 3, yMin: -4, yMax: 4 }}
            cell={36}
            curves={[{ fn: (x) => -(x ** 3) + 3 * x, from: -2.6, to: 2.6 }]}
            dots={[{ at: [-1, -2], color: VIOLET }, { at: [1, 2], color: SECOND }, { at: [0, 0], color: MUTED }, { at: [-Math.sqrt(3), 0], color: INK }, { at: [Math.sqrt(3), 0], color: INK }]}
            notes={[
                { y: 74, formula: '(1, 2)', color: SECOND, size: 20 },
                { y: 104, text: words.maximum, color: SECOND, size: 17 },
                { y: 152, formula: '(−1, −2)', color: VIOLET, size: 20 },
                { y: 182, text: words.minimum, color: VIOLET, size: 17 },
                { y: 230, formula: '(0, 0)', color: MUTED, size: 20 },
                { y: 260, text: words.inflection, color: MUTED, size: 17 }
            ]}
            notesX={300}
        />
    )
}

/* ---------- 14. A rational function: x²/(x − 1) ---------- */

export function RationalGraphFigure({ language }: { language: UnitLanguage }) {
    return (
        <PlotFigure
            language={language}
            height={290}
            label={say('y = x²/(x − 1): x = 1 asintota bertikala, y = x + 1 zeiharra, maximoa (0, 0) eta minimoa (2, 4)', 'y = x²/(x − 1): asíntota vertical x = 1, oblicua y = x + 1, máximo (0, 0) y mínimo (2, 4)', 'y = x²/(x − 1): مقارب رأسي x = 1 ومائل y = x + 1 وعظمى (0, 0) وصغرى (2, 4)', 'y = x²/(x − 1): vertical asymptote x = 1, oblique y = x + 1, maximum (0, 0) and minimum (2, 4)')}
            box={{ xMin: -3, xMax: 5, yMin: -3, yMax: 4 }}
            cell={30}
            units={[1, 2]}
            curves={[
                { fn: (x) => x + 1, from: -3.3, to: 5.3, color: MUTED, width: 2, dashed: true },
                { fn: (x) => (x * x) / (x - 1), from: -3.3, to: 0.97 },
                { fn: (x) => (x * x) / (x - 1), from: 1.03, to: 5.3 }
            ]}
            verticals={[1]}
            dots={[{ at: [0, 0], color: SECOND }, { at: [2, 4], color: VIOLET }]}
            notes={[
                { y: 70, formula: 'x = 1', color: MUTED, size: 19 },
                { y: 102, formula: 'y = x + 1', color: MUTED, size: 19 },
                { y: 154, formula: '(0, 0)', color: SECOND, size: 20 },
                { y: 184, text: words.maximum, color: SECOND, size: 17 },
                { y: 230, formula: '(2, 4)', color: VIOLET, size: 20 },
                { y: 260, text: words.minimum, color: VIOLET, size: 17 }
            ]}
            notesX={320}
        />
    )
}

/* ---------- 15. An exponential: x·eˣ ---------- */

export function ExpGraphFigure({ language }: { language: UnitLanguage }) {
    return (
        <PlotFigure
            language={language}
            height={330}
            label={say('y = x·eˣ: y = 0 asintota ezkerrean, minimoa x = −1 puntuan eta inflexioa x = −2 puntuan', 'y = x·eˣ: asíntota y = 0 por la izquierda, mínimo en x = −1 e inflexión en x = −2', 'y = x·eˣ: مقارب y = 0 يسارًا وصغرى عند x = −1 وانعطاف عند x = −2', 'y = x·eˣ: asymptote y = 0 on the left, minimum at x = −1 and inflection at x = −2')}
            box={{ xMin: -5, xMax: 2, yMin: -2, yMax: 6 }}
            cell={32}
            units={[1, 0.5]}
            curves={[{ fn: (x) => x * Math.exp(x), from: -5.3, to: 1.3 }]}
            dots={[{ at: [-1, -1 / Math.E], color: SECOND }, { at: [-2, -2 / Math.E ** 2], color: VIOLET }]}
            notes={[
                { y: 74, formula: 'f′(x) = (1 + x)eˣ', size: 19 },
                { y: 124, formula: 'x = −1', color: SECOND, size: 20 },
                { y: 154, text: words.minimum, color: SECOND, size: 17 },
                { y: 204, formula: 'x = −2', color: VIOLET, size: 20 },
                { y: 234, text: words.inflection, color: VIOLET, size: 17 },
                { y: 284, formula: 'x → −∞:  y → 0', color: MUTED, size: 18 }
            ]}
            notesX={300}
        />
    )
}

/* ---------- The unit's cover ---------- */

export function BachApplicationsHeroArt() {
    return (
        <div className="fraction-v2-collage" aria-hidden="true">
            <svg viewBox="0 0 520 400" direction="ltr" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                <g transform="translate(24 28) rotate(-4)">
                    <rect width={270} height={210} rx={16} fill={PAPER} stroke={INK} strokeWidth={2} />
                    <line x1={20} y1={150} x2={255} y2={150} stroke={INK} strokeWidth={2} />
                    <path d="M30 190 C 60 40, 110 40, 135 110 S 210 200, 250 30" fill="none" stroke="#2f6fdb" strokeWidth={4} strokeLinecap="round" />
                    <line x1={58} y1={73} x2={118} y2={73} stroke="#c4432a" strokeWidth={3.4} strokeLinecap="round" />
                    <circle cx={88} cy={73} r={7} fill="#c4432a" />
                    <line x1={160} y1={153} x2={220} y2={153} stroke="#267b53" strokeWidth={3.4} strokeLinecap="round" />
                    <circle cx={190} cy={153} r={7} fill="#267b53" />
                </g>
                <g transform="translate(316 52) rotate(5)">
                    <rect width={180} height={120} rx={16} fill="#d9efe2" stroke={INK} strokeWidth={2} />
                    <text x={90} y={74} textAnchor="middle" fontSize={34} fontWeight={700} fill={INK} fontFamily={SERIF}>f′(a) = 0</text>
                </g>
                <g transform="translate(60 272) rotate(2)">
                    <rect width={400} height={88} rx={16} fill="#f6d8cf" stroke={INK} strokeWidth={2} />
                    <text x={200} y={58} textAnchor="middle" fontSize={28} fontWeight={700} fill={INK} fontFamily={SERIF}>f″ &gt; 0  ∪      f″ &lt; 0  ∩</text>
                </g>
            </svg>
        </div>
    )
}
