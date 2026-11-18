import type { LocalizedText, UnitLanguage } from '../../features/unit-v2/types'
import { PlotFigure } from '../batx1-zientziak-limiteak/figures'

/* ==========================================================================
   Deribatuak eta haien aplikazioak · Batxilergoa 1 · Gizarte Zientziak —
   the lesson figures, each one a plane drawn with the PlotFigure of the
   Ciencias limits unit (curves in real values, dots, dashed asymptotes and
   a column of notes). Lines such as secants and tangents are drawn as
   curves, so they follow the units of each axis. Formulas sit in their own
   <text>; words go through <Label>.
   ========================================================================== */

const INK = 'var(--ink, #1d2733)'
const MUTED = 'var(--muted, #58616e)'
const STAGE = 'var(--stage, #2f6fdb)'
const SECOND = 'var(--second, #c4432a)'
const GREEN = 'var(--success, #267b53)'
const MUSTARD = 'var(--mustard, #e0a100)'
const PAPER = '#fffcf6'
const SERIF = 'Fraunces, serif'

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })

/* ---------- 1. The average rate: a secant ---------- */

export function AverageRateFigure({ language }: { language: UnitLanguage }) {
    return (
        <PlotFigure
            language={language}
            height={330}
            label={say('I(x) = −x² + 20x eta (2, 36) eta (6, 84) puntuetatik pasatzen den ebakitzailea', 'I(x) = −x² + 20x y la secante por (2, 36) y (6, 84)', 'I(x) = −x² + 20x والقاطع المار بـ (2, 36) و(6, 84)', 'I(x) = −x² + 20x and the secant through (2, 36) and (6, 84)')}
            box={{ xMin: 0, xMax: 12, yMin: 0, yMax: 11 }}
            cell={24}
            units={[1, 10]}
            ox={52}
            oy={36}
            curves={[{ fn: (x) => -x * x + 20 * x, from: 0, to: 12.5 }, { fn: (x) => 12 * x + 12, from: 0, to: 8, color: MUSTARD, dashed: true, width: 2.6 }]}
            dots={[{ at: [2, 36], color: SECOND }, { at: [6, 84], color: SECOND }]}
            notes={[
                { y: 74, formula: 'I(2) = 36', color: SECOND },
                { y: 110, formula: 'I(6) = 84', color: SECOND },
                { y: 158, formula: '(84 − 36)/(6 − 2) = 12', color: MUSTARD, size: 18 },
                { y: 204, text: say('ebakitzailearen malda', 'pendiente de la secante', 'ميل القاطع', 'slope of the secant'), color: MUTED, size: 16 }
            ]}
            notesX={384}
        />
    )
}

/* ---------- 2. The derivative at a point: secants turn into the tangent ---------- */

export function DerivativePointFigure({ language }: { language: UnitLanguage }) {
    return (
        <PlotFigure
            language={language}
            height={318}
            label={say('f(x) = x² − 3x: ebakitzailea ukitzaile bihurtzen da x = 2 puntuan', 'f(x) = x² − 3x: la secante se convierte en tangente en x = 2', 'f(x) = x² − 3x: يتحول القاطع إلى مماس عند x = 2', 'f(x) = x² − 3x: the secant becomes the tangent at x = 2')}
            box={{ xMin: -1, xMax: 5, yMin: -4, yMax: 5 }}
            cell={28}
            curves={[{ fn: (x) => x * x - 3 * x, from: -1.5, to: 5.5 }, { fn: (x) => 3 * x - 8, from: 1, to: 5, color: MUTED, dashed: true, width: 2.2 }, { fn: (x) => x - 4, from: -1, to: 5.5, color: MUSTARD, width: 2.6 }]}
            dots={[{ at: [2, -2], color: SECOND }, { at: [4, 4], color: MUTED }]}
            notes={[
                { y: 74, formula: 'h = 2 :  3', color: MUTED },
                { y: 110, formula: 'h → 0 :  h + 1 → 1', color: MUSTARD },
                { y: 158, formula: 'f′(2) = 1', color: STAGE, size: 22 },
                { y: 204, text: say('ukitzailearen malda', 'pendiente de la tangente', 'ميل المماس', 'slope of the tangent'), color: MUTED, size: 16 }
            ]}
            notesX={300}
        />
    )
}

/* ---------- 3. Tangent and normal ---------- */

export function TangentFigure({ language }: { language: UnitLanguage }) {
    return (
        <PlotFigure
            language={language}
            height={318}
            label={say('y = x² + 1, haren ukitzailea y = 2x eta normala x = 1 puntuan', 'y = x² + 1, su tangente y = 2x y la normal en x = 1', 'y = x² + 1 ومماسها y = 2x والعمودي عند x = 1', 'y = x² + 1, its tangent y = 2x and the normal at x = 1')}
            box={{ xMin: -2, xMax: 4, yMin: -1, yMax: 7 }}
            cell={30}
            curves={[{ fn: (x) => x * x + 1, from: -2.5, to: 4.5 }, { fn: (x) => 2 * x, from: -1, to: 4, color: MUSTARD, width: 2.6 }, { fn: (x) => -x / 2 + 2.5, from: -2, to: 4.5, color: GREEN, dashed: true, width: 2.4 }]}
            dots={[{ at: [1, 2], color: SECOND }]}
            notes={[
                { y: 74, formula: 'f(1) = 2', color: SECOND },
                { y: 110, formula: 'f′(1) = 2', color: SECOND },
                { y: 156, formula: 'y = 2x', color: MUSTARD, size: 21 },
                { y: 200, formula: 'y − 2 = −(x − 1)/2', color: GREEN, size: 18 }
            ]}
            notesX={300}
        />
    )
}

/* ---------- 4. f and its derivative ---------- */

export function DerivativeFunctionFigure({ language }: { language: UnitLanguage }) {
    return (
        <PlotFigure
            language={language}
            height={330}
            label={say('f(x) = x² eta haren deribatua f′(x) = 2x', 'f(x) = x² y su derivada f′(x) = 2x', 'f(x) = x² ومشتقتها f′(x) = 2x', 'f(x) = x² and its derivative f′(x) = 2x')}
            box={{ xMin: -3, xMax: 3, yMin: -6, yMax: 9 }}
            cell={18}
            oy={36}
            curves={[{ fn: (x) => x * x, from: -3.2, to: 3.2 }, { fn: (x) => 2 * x, from: -3.2, to: 3.2, color: SECOND }]}
            dots={[{ at: [1, 1] }, { at: [1, 2], color: SECOND }]}
            notes={[
                { y: 74, formula: 'f(x) = x²', color: STAGE },
                { y: 110, formula: 'f′(x) = 2x', color: SECOND },
                { y: 158, formula: 'f′(1) = 2', color: SECOND },
                { y: 204, text: say('x bakoitzean, malda', 'en cada x, la pendiente', 'عند كل x، الميل', 'at each x, the slope'), color: MUTED, size: 16 }
            ]}
            notesX={250}
        />
    )
}

/* ---------- 5. A quotient and its tangent ---------- */

export function QuotientFigure({ language }: { language: UnitLanguage }) {
    return (
        <PlotFigure
            language={language}
            height={330}
            label={say('g(x) = 2x/(x + 1) eta haren ukitzailea x = 1 puntuan, 1/2 maldarekin', 'g(x) = 2x/(x + 1) y su tangente en x = 1, de pendiente 1/2', 'g(x) = 2x/(x + 1) ومماسها عند x = 1 بميل 1/2', 'g(x) = 2x/(x + 1) and its tangent at x = 1, with slope 1/2')}
            box={{ xMin: -5, xMax: 5, yMin: -4, yMax: 7 }}
            cell={22}
            oy={36}
            curves={[{ fn: (x) => (2 * x) / (x + 1), from: -5.5, to: -1.05 }, { fn: (x) => (2 * x) / (x + 1), from: -0.95, to: 5.5 }, { fn: (x) => x / 2 + 0.5, from: -3, to: 5.5, color: MUSTARD, width: 2.6 }]}
            verticals={[-1]}
            dots={[{ at: [1, 1], color: SECOND }]}
            notes={[
                { y: 74, formula: 'g′(x) = 2/(x + 1)²', color: STAGE, size: 18 },
                { y: 116, formula: 'g′(1) = 2/4 = 1/2', color: MUSTARD, size: 18 },
                { y: 162, formula: 'x = −1', color: MUTED }
            ]}
            notesX={300}
        />
    )
}

/* ---------- 6. eˣ and ln x with their tangents ---------- */

export function ExpLogFigure({ language }: { language: UnitLanguage }) {
    return (
        <PlotFigure
            language={language}
            height={318}
            label={say('eˣ eta ln x, haien ukitzaileekin x = 0 eta x = 1 puntuetan', 'eˣ y ln x con sus tangentes en x = 0 y x = 1', 'eˣ وln x مع مماسيهما عند x = 0 وx = 1', 'eˣ and ln x with their tangents at x = 0 and x = 1')}
            box={{ xMin: -3, xMax: 5, yMin: -3, yMax: 5 }}
            cell={28}
            curves={[{ fn: (x) => Math.exp(x), from: -3.2, to: 1.8 }, { fn: (x) => Math.log(x), from: 0.03, to: 5.5, color: GREEN }, { fn: (x) => x + 1, from: -3, to: 4, color: MUSTARD, dashed: true, width: 2.2 }, { fn: (x) => x - 1, from: -2, to: 5.5, color: MUSTARD, dashed: true, width: 2.2 }]}
            dots={[{ at: [0, 1] }, { at: [1, 0], color: GREEN }]}
            notes={[
                { y: 74, formula: '(eˣ)′ = eˣ', color: STAGE, size: 21 },
                { y: 116, formula: '(ln x)′ = 1/x', color: GREEN, size: 21 },
                { y: 164, formula: 'y = x + 1    y = x − 1', color: MUSTARD, size: 17 }
            ]}
            notesX={300}
        />
    )
}

/* ---------- 7. The sign of f′ ---------- */

export function SignFigure({ language }: { language: UnitLanguage }) {
    return (
        <PlotFigure
            language={language}
            height={318}
            label={say('f(x) = x³ − 12x: gorakorra, beherakorra eta berriz gorakorra', 'f(x) = x³ − 12x: crece, decrece y vuelve a crecer', 'f(x) = x³ − 12x: تتزايد ثم تتناقص ثم تتزايد', 'f(x) = x³ − 12x: rises, falls and rises again')}
            box={{ xMin: -5, xMax: 5, yMin: -5, yMax: 5 }}
            cell={26}
            units={[1, 4]}
            ox={48}
            curves={[{ fn: (x) => x ** 3 - 12 * x, from: -5.2, to: -2, color: GREEN }, { fn: (x) => x ** 3 - 12 * x, from: -2, to: 2, color: SECOND }, { fn: (x) => x ** 3 - 12 * x, from: 2, to: 5.2, color: GREEN }]}
            dots={[{ at: [-2, 16] }, { at: [2, -16] }]}
            notes={[
                { y: 74, formula: 'f′(x) = 3x² − 12', color: STAGE, size: 18 },
                { y: 116, formula: 'x < −2 :  f′ > 0', color: GREEN, size: 18 },
                { y: 152, formula: '−2 < x < 2 :  f′ < 0', color: SECOND, size: 18 },
                { y: 188, formula: 'x > 2 :  f′ > 0', color: GREEN, size: 18 }
            ]}
            notesX={340}
        />
    )
}

/* ---------- 8. A maximum and a minimum ---------- */

export function ExtremaFigure({ language }: { language: UnitLanguage }) {
    return (
        <PlotFigure
            language={language}
            height={318}
            label={say('2x³ − 3x² − 12x + 5: maximoa (−1, 12) puntuan eta minimoa (2, −15) puntuan', '2x³ − 3x² − 12x + 5: máximo en (−1, 12) y mínimo en (2, −15)', '2x³ − 3x² − 12x + 5: قيمة عظمى عند (−1, 12) وصغرى عند (2, −15)', '2x³ − 3x² − 12x + 5: maximum at (−1, 12) and minimum at (2, −15)')}
            box={{ xMin: -3, xMax: 4, yMin: -4, yMax: 4 }}
            cell={28}
            units={[1, 5]}
            ox={48}
            curves={[{ fn: (x) => 2 * x ** 3 - 3 * x * x - 12 * x + 5, from: -3.2, to: 4.2 }, { fn: () => 12, from: -2.2, to: 0.2, color: MUSTARD, dashed: true, width: 2 }, { fn: () => -15, from: 0.8, to: 3.2, color: MUSTARD, dashed: true, width: 2 }]}
            dots={[{ at: [-1, 12], color: SECOND }, { at: [2, -15], color: GREEN }]}
            notes={[
                { y: 74, formula: 'f′(−1) = 0 :  + → −', color: SECOND, size: 18 },
                { y: 110, formula: 'f(−1) = 12', color: SECOND },
                { y: 158, formula: 'f′(2) = 0 :  − → +', color: GREEN, size: 18 },
                { y: 194, formula: 'f(2) = −15', color: GREEN }
            ]}
            notesX={300}
        />
    )
}

/* ---------- 9. Coefficients from a minimum ---------- */

export function CoefficientsFigure({ language }: { language: UnitLanguage }) {
    return (
        <PlotFigure
            language={language}
            height={318}
            label={say('x² − 6x + 7 parabolak minimoa du (3, −2) puntuan', 'La parábola x² − 6x + 7 tiene su mínimo en (3, −2)', 'للقطع المكافئ x² − 6x + 7 قيمة صغرى عند (3, −2)', 'The parabola x² − 6x + 7 has its minimum at (3, −2)')}
            box={{ xMin: -1, xMax: 7, yMin: -3, yMax: 8 }}
            cell={24}
            curves={[{ fn: (x) => x * x - 6 * x + 7, from: -1.2, to: 7.2 }, { fn: () => -2, from: 1.5, to: 4.5, color: MUSTARD, dashed: true, width: 2 }]}
            dots={[{ at: [3, -2], color: SECOND }]}
            notes={[
                { y: 74, formula: 'f′(3) = 6 + a = 0', color: SECOND, size: 18 },
                { y: 110, formula: 'a = −6', color: SECOND },
                { y: 158, formula: 'f(3) = 9 − 18 + b = −2', color: GREEN, size: 18 },
                { y: 194, formula: 'b = 7', color: GREEN }
            ]}
            notesX={270}
        />
    )
}

/* ---------- 10. The greatest profit ---------- */

export function ProfitFigure({ language }: { language: UnitLanguage }) {
    return (
        <PlotFigure
            language={language}
            height={330}
            label={say('Diru-sarrerak 60x, kostua x² + 20x + 100 eta mozkina, maximoa x = 20 denean', 'Ingreso 60x, coste x² + 20x + 100 y beneficio, máximo en x = 20', 'الإيراد 60x والتكلفة x² + 20x + 100 والربح الأعظم عند x = 20', 'Revenue 60x, cost x² + 20x + 100 and profit, greatest at x = 20')}
            box={{ xMin: 0, xMax: 10, yMin: -1, yMax: 10 }}
            cell={26}
            units={[4, 250]}
            ox={58}
            oy={36}
            curves={[{ fn: (x) => 60 * x, from: 0, to: 40 }, { fn: (x) => x * x + 20 * x + 100, from: 0, to: 40, color: SECOND }, { fn: (x) => -x * x + 40 * x - 100, from: 0, to: 40, color: GREEN, width: 3.8 }]}
            dots={[{ at: [20, 300], color: GREEN }]}
            notes={[
                { y: 74, formula: 'I(x) = 60x', color: STAGE, size: 18 },
                { y: 108, formula: 'C(x) = x² + 20x + 100', color: SECOND, size: 17 },
                { y: 150, formula: 'B′(x) = −2x + 40 = 0', color: GREEN, size: 17 },
                { y: 186, formula: 'x = 20 :  B = 300', color: GREEN, size: 18 },
                { y: 228, formula: 'I′(20) = C′(20) = 60', color: MUSTARD, size: 17 }
            ]}
            notesX={346}
        />
    )
}

/* ---------- 11. The rectangle with the greatest area ---------- */

export function AreaFigure({ language }: { language: UnitLanguage }) {
    return (
        <PlotFigure
            language={language}
            height={334}
            label={say('A(x) = x(20 − x) azalera: maximoa x = 10 denean', 'El área A(x) = x(20 − x): máxima en x = 10', 'المساحة A(x) = x(20 − x): أعظمية عند x = 10', 'The area A(x) = x(20 − x): greatest at x = 10')}
            box={{ xMin: 0, xMax: 10, yMin: 0, yMax: 11 }}
            cell={24}
            units={[2, 10]}
            ox={52}
            oy={36}
            curves={[{ fn: (x) => x * (20 - x), from: 0, to: 20 }]}
            dots={[{ at: [10, 100], color: SECOND }]}
            notes={[
                { y: 74, formula: 'y = 20 − x', color: MUTED },
                { y: 110, formula: 'A(x) = 20x − x²', color: STAGE },
                { y: 158, formula: 'A′(x) = 20 − 2x = 0', color: SECOND, size: 18 },
                { y: 194, formula: 'x = 10 :  A = 100', color: SECOND }
            ]}
            notesX={330}
        />
    )
}

/* ---------- 12. Extremes on a closed interval ---------- */

export function IntervalFigure({ language }: { language: UnitLanguage }) {
    return (
        <PlotFigure
            language={language}
            height={340}
            label={say('x² − 4x + 1 [0, 5] tartean: minimoa x = 2 puntuan eta maximoa x = 5 ertzean', 'x² − 4x + 1 en [0, 5]: mínimo en x = 2 y máximo en el borde x = 5', 'x² − 4x + 1 في [0, 5]: صغرى عند x = 2 وعظمى عند الطرف x = 5', 'x² − 4x + 1 on [0, 5]: minimum at x = 2 and maximum at the border x = 5')}
            box={{ xMin: -1, xMax: 6, yMin: -4, yMax: 7 }}
            cell={26}
            curves={[{ fn: (x) => x * x - 4 * x + 1, from: -1.2, to: 6.2, color: MUTED, dashed: true, width: 2 }, { fn: (x) => x * x - 4 * x + 1, from: 0, to: 5 }]}
            verticals={[0, 5]}
            dots={[{ at: [0, 1] }, { at: [2, -3], color: GREEN }, { at: [5, 6], color: SECOND }]}
            notes={[
                { y: 74, formula: 'f(0) = 1', color: STAGE },
                { y: 110, formula: 'f(2) = −3', color: GREEN },
                { y: 146, formula: 'f(5) = 6', color: SECOND },
                { y: 196, text: say('Ertzak ere hautagaiak dira', 'Los bordes también cuentan', 'الطرفان مرشحان أيضًا', 'The borders count too'), color: MUTED, size: 16 }
            ]}
            notesX={270}
        />
    )
}

/* ---------- 13. A polynomial ---------- */

export function PolynomialFigure({ language }: { language: UnitLanguage }) {
    return (
        <PlotFigure
            language={language}
            height={318}
            label={say('x³ − 3x²: maximoa (0, 0) puntuan, minimoa (2, −4) puntuan eta ebaki-puntua x = 3', 'x³ − 3x²: máximo en (0, 0), mínimo en (2, −4) y corte en x = 3', 'x³ − 3x²: عظمى عند (0, 0) وصغرى عند (2, −4) وتقاطع عند x = 3', 'x³ − 3x²: maximum at (0, 0), minimum at (2, −4) and intercept at x = 3')}
            box={{ xMin: -2, xMax: 4, yMin: -6, yMax: 4 }}
            cell={26}
            curves={[{ fn: (x) => x ** 3 - 3 * x * x, from: -2.2, to: 4.2 }]}
            dots={[{ at: [0, 0], color: SECOND }, { at: [2, -4], color: GREEN }, { at: [3, 0], color: MUSTARD }]}
            notes={[
                { y: 74, formula: 'f′(x) = 3x² − 6x', color: STAGE, size: 18 },
                { y: 112, formula: 'max (0, 0)', color: SECOND },
                { y: 148, formula: 'min (2, −4)', color: GREEN },
                { y: 184, formula: 'x → ±∞ :  ±∞', color: MUTED, size: 18 }
            ]}
            notesX={270}
        />
    )
}

/* ---------- 14. A rational function ---------- */

export function RationalFigure({ language }: { language: UnitLanguage }) {
    return (
        <PlotFigure
            language={language}
            height={348}
            label={say('x²/(x − 1): asintotak x = 1 eta y = x + 1, maximoa (0, 0) eta minimoa (2, 4)', 'x²/(x − 1): asíntotas x = 1 e y = x + 1, máximo (0, 0) y mínimo (2, 4)', 'x²/(x − 1): المقاربان x = 1 وy = x + 1، عظمى (0, 0) وصغرى (2, 4)', 'x²/(x − 1): asymptotes x = 1 and y = x + 1, maximum (0, 0) and minimum (2, 4)')}
            box={{ xMin: -4, xMax: 6, yMin: -6, yMax: 10 }}
            cell={18}
            oy={36}
            curves={[{ fn: (x) => (x * x) / (x - 1), from: -4.5, to: 0.97 }, { fn: (x) => (x * x) / (x - 1), from: 1.03, to: 6.5 }]}
            verticals={[1]}
            obliques={[[1, 1]]}
            dots={[{ at: [0, 0], color: SECOND }, { at: [2, 4], color: GREEN }]}
            notes={[
                { y: 74, formula: 'f′(x) = (x² − 2x)/(x − 1)²', color: STAGE, size: 17 },
                { y: 116, formula: 'max (0, 0)', color: SECOND },
                { y: 152, formula: 'min (2, 4)', color: GREEN },
                { y: 196, formula: 'x = 1    y = x + 1', color: MUTED, size: 18 }
            ]}
            notesX={250}
        />
    )
}

/* ---------- 15. The graph of f′ ---------- */

export function DerivativeGraphFigure({ language }: { language: UnitLanguage }) {
    return (
        <PlotFigure
            language={language}
            height={364}
            label={say('f eta f′: f funtzioaren muturretan, f′ deribatuak ardatza ebakitzen du', 'f y f′: en los extremos de f, f′ corta el eje', 'f وf′: عند القيم القصوى لـ f تقطع f′ المحور', 'f and f′: at the extremes of f, f′ cuts the axis')}
            box={{ xMin: -3, xMax: 5, yMin: -10, yMax: 8 }}
            cell={17}
            oy={36}
            curves={[{ fn: (x) => x ** 3 / 3 - x * x - 3 * x, from: -3.2, to: 5.2 }, { fn: (x) => x * x - 2 * x - 3, from: -3.2, to: 5.2, color: SECOND }]}
            dots={[{ at: [-1, 5 / 3] }, { at: [3, -9] }, { at: [-1, 0], color: SECOND }, { at: [3, 0], color: SECOND }]}
            notes={[
                { y: 74, formula: 'f(x) = x³/3 − x² − 3x', color: STAGE, size: 17 },
                { y: 112, formula: 'f′(x) = (x + 1)(x − 3)', color: SECOND, size: 17 },
                { y: 160, text: say('f igo: f′ > 0', 'f sube: f′ > 0', 'f تصعد: f′ > 0', 'f rises: f′ > 0'), color: INK, size: 16 },
                { y: 192, text: say('f jaitsi: f′ < 0', 'f baja: f′ < 0', 'f تنزل: f′ < 0', 'f falls: f′ < 0'), color: INK, size: 16 }
            ]}
            notesX={250}
        />
    )
}

/* ---------- Hero ---------- */

export function SocDerivHeroArt() {
    return (
        <div className="fraction-v2-collage" aria-hidden="true">
            <svg viewBox="0 0 520 400" direction="ltr" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                <g transform="translate(24 30) rotate(-4)">
                    <rect width={280} height={210} rx={16} fill={PAPER} stroke={INK} strokeWidth={2} />
                    <line x1={20} y1={185} x2={265} y2={185} stroke={INK} strokeWidth={2} />
                    <line x1={30} y1={195} x2={30} y2={16} stroke={INK} strokeWidth={2} />
                    <path d="M30 180 Q 140 -20 250 180" fill="none" stroke="#2f6fdb" strokeWidth={4} strokeLinecap="round" />
                    <line x1={70} y1={80} x2={210} y2={80} stroke="#e0a100" strokeWidth={3} strokeDasharray="8 6" />
                    <circle cx={140} cy={80} r={7} fill="#c4432a" />
                </g>
                <g transform="translate(320 50) rotate(5)">
                    <rect width={178} height={120} rx={16} fill="#d9efe2" stroke={INK} strokeWidth={2} />
                    <text x={89} y={74} textAnchor="middle" fontSize={30} fontWeight={700} fill={INK} fontFamily={SERIF}>f′(x) = 0</text>
                </g>
                <g transform="translate(60 272) rotate(2)">
                    <rect width={400} height={88} rx={16} fill="#fbeec2" stroke={INK} strokeWidth={2} />
                    <text x={200} y={58} textAnchor="middle" fontSize={30} fontWeight={700} fill={INK} fontFamily={SERIF}>B′(x) = I′(x) − C′(x)</text>
                </g>
            </svg>
        </div>
    )
}
