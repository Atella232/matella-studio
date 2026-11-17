import type { LocalizedText, UnitLanguage } from '../../features/unit-v2/types'
import { LimitPlot } from '../batx2-zientziak-limiteak/figures'

/* ==========================================================================
   Funtzioen adierazpen grafikoa · Batxilergoa 2 · Gizarte Zientziak — the
   lesson figures, all drawn with LimitPlot of Límites 2.º Ciencias
   (imported): the curve, its asymptotes, the points that matter and a
   column of notes. Each plot's height is the box height plus a margin,
   so nothing is cut; curves are split at their vertical asymptotes.
   ========================================================================== */

const INK = 'var(--ink, #1d2733)'
const SECOND = 'var(--second, #c4432a)'
const GREEN = 'var(--success, #267b53)'
const MUSTARD = 'var(--mustard, #e0a100)'
const PAPER = '#fffcf6'
const SERIF = 'Fraunces, serif'

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
/** A curve on both sides of a vertical asymptote at a */
const split = (fn: (x: number) => number, a: number, from: number, to: number, color?: string) => [
    { fn, from, to: a - 0.02, color },
    { fn, from: a + 0.02, to, color }
]

type Props = { language: UnitLanguage }

/* ---------- 1. At first sight ---------- */

export function DomainFigure({ language }: Props) {
    const f = (x: number) => (x + 1) / (x * x - 4)
    return (
        <LimitPlot
            language={language}
            height={240}
            label={say('y = (x + 1)/(x² − 4): ez dago x = −2 eta x = 2 puntuetan', 'y = (x + 1)/(x² − 4): no existe en x = −2 ni en x = 2', 'y = (x + 1)/(x² − 4): غير موجودة عند x = −2 وx = 2', 'y = (x + 1)/(x² − 4): it does not exist at x = −2 or x = 2')}
            box={{ xMin: -4, xMax: 4, yMin: -4, yMax: 4 }}
            cell={25}
            curves={[{ fn: f, from: -4.5, to: -2.02 }, { fn: f, from: -1.98, to: 1.98 }, { fn: f, from: 2.02, to: 4.5 }]}
            verticals={[-2, 2]}
            notes={[
                { y: 72, formula: 'x ≠ −2', color: SECOND },
                { y: 112, formula: 'x ≠ 2', color: SECOND },
                { y: 160, formula: 'D = ℝ − {±2}', color: INK, size: 17 }
            ]}
            notesX={262}
        />
    )
}

export function SymmetryFigure({ language }: Props) {
    return (
        <LimitPlot
            language={language}
            height={240}
            label={say('y = x³ − 4x, jatorriarekiko simetrikoa: (−1, 3) eta (1, −3)', 'y = x³ − 4x, simétrica respecto al origen: (−1, 3) y (1, −3)', 'y = x³ − 4x متناظرة بالنسبة إلى المبدأ: (−1, 3) و(1, −3)', 'y = x³ − 4x, symmetric about the origin: (−1, 3) and (1, −3)')}
            box={{ xMin: -3, xMax: 3, yMin: -4, yMax: 4 }}
            cell={25}
            curves={[{ fn: (x) => x ** 3 - 4 * x, from: -3.5, to: 3.5 }]}
            dots={[{ at: [-1, 3], color: SECOND }, { at: [1, -3], color: SECOND }, { at: [0, 0], color: INK }]}
            notes={[
                { y: 72, formula: 'f(−x) = −f(x)', color: INK, size: 17 },
                { y: 116, formula: 'f(−1) = 3', color: SECOND },
                { y: 152, formula: 'f(1) = −3', color: SECOND }
            ]}
            notesX={212}
        />
    )
}

export function InterceptsFigure({ language }: Props) {
    const f = (x: number) => (x - 2) / (x + 1)
    return (
        <LimitPlot
            language={language}
            height={240}
            label={say('y = (x − 2)/(x + 1): ardatzak (0, −2) eta (2, 0) puntuetan mozten ditu', 'y = (x − 2)/(x + 1): corta a los ejes en (0, −2) y (2, 0)', 'y = (x − 2)/(x + 1): تقطع المحورين عند (0, −2) و(2, 0)', 'y = (x − 2)/(x + 1): it cuts the axes at (0, −2) and (2, 0)')}
            box={{ xMin: -4, xMax: 4, yMin: -4, yMax: 4 }}
            cell={25}
            curves={split(f, -1, -4.5, 4.5)}
            dots={[{ at: [0, -2], color: SECOND }, { at: [2, 0], color: SECOND }]}
            verticals={[-1]}
            horizontals={[1]}
            notes={[
                { y: 72, formula: '(0, −2)', color: SECOND },
                { y: 112, formula: '(2, 0)', color: SECOND },
                { y: 160, formula: '+   −   +', color: INK }
            ]}
            notesX={262}
        />
    )
}

/* ---------- 2. Asymptotes ---------- */

export function VerticalFigure({ language }: Props) {
    const f = (x: number) => (x + 3) / (x - 1)
    return (
        <LimitPlot
            language={language}
            height={310}
            label={say('y = (x + 3)/(x − 1): asintota bertikala x = 1; ezkerretik behera eta eskuinetik gora', 'y = (x + 3)/(x − 1): asíntota vertical x = 1; por la izquierda baja y por la derecha sube', 'y = (x + 3)/(x − 1): مقارب عمودي x = 1؛ ينزل من اليسار ويصعد من اليمين', 'y = (x + 3)/(x − 1): vertical asymptote x = 1; it goes down on the left and up on the right')}
            box={{ xMin: -3, xMax: 5, yMin: -5, yMax: 6 }}
            cell={25}
            curves={split(f, 1, -3.5, 5.5)}
            verticals={[1]}
            horizontals={[1]}
            notes={[
                { y: 72, formula: 'x = 1', color: SECOND, size: 21 },
                { y: 116, formula: '1⁻ :  −∞', color: INK },
                { y: 152, formula: '1⁺ :  +∞', color: INK }
            ]}
            notesX={262}
        />
    )
}

export function HorizontalFigure({ language }: Props) {
    const f = (x: number) => (2 * x + 1) / (x - 3)
    return (
        <LimitPlot
            language={language}
            height={290}
            label={say('y = (2x + 1)/(x − 3): asintota horizontala y = 2 eta bertikala x = 3', 'y = (2x + 1)/(x − 3): asíntota horizontal y = 2 y vertical x = 3', 'y = (2x + 1)/(x − 3): مقارب أفقي y = 2 وعمودي x = 3', 'y = (2x + 1)/(x − 3): horizontal asymptote y = 2 and vertical x = 3')}
            box={{ xMin: -2, xMax: 8, yMin: -3, yMax: 7 }}
            cell={25}
            curves={split(f, 3, -2.5, 8.5)}
            verticals={[3]}
            horizontals={[2]}
            notes={[
                { y: 72, formula: 'y = 2', color: SECOND, size: 21 },
                { y: 116, formula: '2 / 1', color: INK },
                { y: 152, formula: 'x = 3', color: INK }
            ]}
            notesX={308}
        />
    )
}

export function ObliqueFigure({ language }: Props) {
    const f = (x: number) => (x * x + 1) / (x - 1)
    return (
        <LimitPlot
            language={language}
            height={334}
            label={say('y = (x² + 1)/(x − 1): asintota zeiharra y = x + 1 eta bertikala x = 1', 'y = (x² + 1)/(x − 1): asíntota oblicua y = x + 1 y vertical x = 1', 'y = (x² + 1)/(x − 1): مقارب مائل y = x + 1 وعمودي x = 1', 'y = (x² + 1)/(x − 1): oblique asymptote y = x + 1 and vertical x = 1')}
            box={{ xMin: -3, xMax: 5, yMin: -4, yMax: 8 }}
            cell={25}
            curves={split(f, 1, -3.5, 5.5)}
            verticals={[1]}
            obliques={[[1, 1]]}
            notes={[
                { y: 72, formula: 'y = x + 1', color: SECOND, size: 21 },
                { y: 116, formula: '+ 2/(x − 1)', color: INK, size: 17 },
                { y: 160, formula: 'x = 1', color: INK }
            ]}
            notesX={262}
        />
    )
}

/* ---------- 3. With derivatives ---------- */

export function MonotonyFigure({ language }: Props) {
    return (
        <LimitPlot
            language={language}
            height={232}
            label={say('y = x/(x² + 1): minimoa (−1, −1/2), maximoa (1, 1/2) eta asintota y = 0', 'y = x/(x² + 1): mínimo (−1, −1/2), máximo (1, 1/2) y asíntota y = 0', 'y = x/(x² + 1): صغرى (−1, −1/2) وعظمى (1, 1/2) ومقارب y = 0', 'y = x/(x² + 1): minimum (−1, −1/2), maximum (1, 1/2) and asymptote y = 0')}
            box={{ xMin: -4, xMax: 4, yMin: -4, yMax: 4 }}
            cell={25}
            units={[1, 0.25]}
            curves={[{ fn: (x) => x / (x * x + 1), from: -4.5, to: 4.5 }]}
            dots={[{ at: [-1, -0.5], color: SECOND }, { at: [1, 0.5], color: SECOND }]}
            notes={[
                { y: 72, formula: 'max (1, 1/2)', color: SECOND, size: 17 },
                { y: 112, formula: 'min (−1, −1/2)', color: SECOND, size: 17 },
                { y: 160, formula: '−   +   −', color: INK }
            ]}
            notesX={262}
        />
    )
}

export function ConcavityFigure({ language }: Props) {
    return (
        <LimitPlot
            language={language}
            height={282}
            label={say('y = x⁴ − 6x²: inflexio-puntuak (−1, −5) eta (1, −5)', 'y = x⁴ − 6x²: puntos de inflexión (−1, −5) y (1, −5)', 'y = x⁴ − 6x²: نقطتا انعطاف (−1, −5) و(1, −5)', 'y = x⁴ − 6x²: points of inflection (−1, −5) and (1, −5)')}
            box={{ xMin: -3, xMax: 3, yMin: -10, yMax: 2 }}
            cell={20}
            curves={[{ fn: (x) => x ** 4 - 6 * x * x, from: -3.2, to: 3.2 }]}
            dots={[{ at: [-1, -5], color: SECOND }, { at: [1, -5], color: SECOND }]}
            notes={[
                { y: 72, formula: "f'' = 12x² − 12", color: INK, size: 17 },
                { y: 116, formula: '∪   ∩   ∪', color: SECOND, size: 21 },
                { y: 160, formula: '(±1, −5)', color: SECOND }
            ]}
            notesX={212}
        />
    )
}

export function SummaryFigure({ language }: Props) {
    return (
        <LimitPlot
            language={language}
            height={240}
            label={say('y = x³ − 3x: maximoa (−1, 2), minimoa (1, −2) eta inflexioa (0, 0)', 'y = x³ − 3x: máximo (−1, 2), mínimo (1, −2) e inflexión (0, 0)', 'y = x³ − 3x: عظمى (−1, 2) وصغرى (1, −2) وانعطاف (0, 0)', 'y = x³ − 3x: maximum (−1, 2), minimum (1, −2) and inflection (0, 0)')}
            box={{ xMin: -3, xMax: 3, yMin: -4, yMax: 4 }}
            cell={25}
            curves={[{ fn: (x) => x ** 3 - 3 * x, from: -3.5, to: 3.5 }]}
            dots={[{ at: [-1, 2], color: SECOND }, { at: [1, -2], color: SECOND }, { at: [0, 0], color: MUSTARD }]}
            notes={[
                { y: 72, formula: 'max (−1, 2)', color: SECOND, size: 17 },
                { y: 108, formula: 'min (1, −2)', color: SECOND, size: 17 },
                { y: 152, formula: '(0, 0)', color: INK }
            ]}
            notesX={212}
        />
    )
}

/* ---------- 4. Complete graphs ---------- */

export function PolynomialFigure({ language }: Props) {
    return (
        <LimitPlot
            language={language}
            height={240}
            label={say('y = x³ − 6x² + 9x: maximoa (1, 4), minimoa (3, 0) eta inflexioa (2, 2)', 'y = x³ − 6x² + 9x: máximo (1, 4), mínimo (3, 0) e inflexión (2, 2)', 'y = x³ − 6x² + 9x: عظمى (1, 4) وصغرى (3, 0) وانعطاف (2, 2)', 'y = x³ − 6x² + 9x: maximum (1, 4), minimum (3, 0) and inflection (2, 2)')}
            box={{ xMin: -1, xMax: 5, yMin: -2, yMax: 6 }}
            cell={25}
            curves={[{ fn: (x) => x ** 3 - 6 * x * x + 9 * x, from: -1.5, to: 5.5 }]}
            dots={[{ at: [1, 4], color: SECOND }, { at: [3, 0], color: SECOND }, { at: [2, 2], color: MUSTARD }]}
            notes={[
                { y: 72, formula: 'max (1, 4)', color: SECOND },
                { y: 112, formula: 'min (3, 0)', color: SECOND },
                { y: 152, formula: '(2, 2)', color: INK }
            ]}
            notesX={212}
        />
    )
}

export function RationalFigure({ language }: Props) {
    const f = (x: number) => (x * x) / (x - 1)
    return (
        <LimitPlot
            language={language}
            height={334}
            label={say('y = x²/(x − 1): asintotak x = 1 eta y = x + 1, maximoa (0, 0) eta minimoa (2, 4)', 'y = x²/(x − 1): asíntotas x = 1 e y = x + 1, máximo (0, 0) y mínimo (2, 4)', 'y = x²/(x − 1): المقاربان x = 1 وy = x + 1، عظمى (0, 0) وصغرى (2, 4)', 'y = x²/(x − 1): asymptotes x = 1 and y = x + 1, maximum (0, 0) and minimum (2, 4)')}
            box={{ xMin: -3, xMax: 5, yMin: -4, yMax: 8 }}
            cell={25}
            curves={split(f, 1, -3.5, 5.5)}
            dots={[{ at: [0, 0], color: SECOND }, { at: [2, 4], color: SECOND }]}
            verticals={[1]}
            obliques={[[1, 1]]}
            notes={[
                { y: 72, formula: 'y = x + 1', color: INK },
                { y: 112, formula: 'max (0, 0)', color: SECOND },
                { y: 152, formula: 'min (2, 4)', color: SECOND }
            ]}
            notesX={262}
        />
    )
}

export function ExpLogFigure({ language }: Props) {
    return (
        <LimitPlot
            language={language}
            height={262}
            label={say('V(t) = 10t·e^(−t) salmentak: maximoa t = 1 unean (3,7 mila) eta gero zerorantz', 'Ventas V(t) = 10t·e^(−t): máximo en t = 1 (3,7 miles) y después hacia cero', 'المبيعات V(t) = 10t·e^(−t): عظمى عند t = 1 (3.7 ألف) ثم نحو الصفر', 'Sales V(t) = 10t·e^(−t): maximum at t = 1 (3.7 thousand) and then towards zero')}
            box={{ xMin: 0, xMax: 8, yMin: -1, yMax: 8 }}
            cell={25}
            units={[1, 0.5]}
            curves={[{ fn: (t) => 10 * t * Math.exp(-t), from: 0, to: 8.5, color: GREEN }]}
            dots={[{ at: [1, 10 / Math.E], color: SECOND }]}
            notes={[
                { y: 72, formula: 't = 1', color: SECOND, size: 21 },
                { y: 112, formula: '10/e ≈ 3,7', color: SECOND },
                { y: 160, formula: 'y = 0', color: INK }
            ]}
            notesX={262}
        />
    )
}

/* ---------- 5. Read and draw ---------- */

export function AbsoluteValueFigure({ language }: Props) {
    return (
        <LimitPlot
            language={language}
            height={240}
            label={say('y = |x² − 4|: azpiko zatia gora isladatuta; puntak (−2, 0) eta (2, 0) puntuetan', 'y = |x² − 4|: la parte de abajo reflejada hacia arriba; picos en (−2, 0) y (2, 0)', 'y = |x² − 4|: الجزء السفلي منعكس إلى الأعلى؛ زاويتان عند (−2, 0) و(2, 0)', 'y = |x² − 4|: the lower part reflected upwards; corners at (−2, 0) and (2, 0)')}
            box={{ xMin: -4, xMax: 4, yMin: -2, yMax: 6 }}
            cell={25}
            curves={[{ fn: (x) => x * x - 4, from: -2, to: 2, color: MUSTARD, dashed: true, width: 2 }, { fn: (x) => Math.abs(x * x - 4), from: -4.5, to: 4.5 }]}
            dots={[{ at: [-2, 0], color: SECOND }, { at: [2, 0], color: SECOND }, { at: [0, 4], color: INK }]}
            notes={[
                { y: 72, formula: '|x² − 4|', color: INK },
                { y: 112, formula: '(±2, 0)', color: SECOND },
                { y: 152, formula: 'max (0, 4)', color: INK }
            ]}
            notesX={262}
        />
    )
}

export function DescribeFigure({ language }: Props) {
    return (
        <LimitPlot
            language={language}
            height={240}
            label={say('J(t) = 40t/(t² + 4) jokalariak: t = 2 arte gora, maximoa 10 mila, gero zerorantz', 'Jugadores J(t) = 40t/(t² + 4): suben hasta t = 2, máximo 10 mil, después hacia cero', 'اللاعبون J(t) = 40t/(t² + 4): يزدادون حتى t = 2، والعظمى 10 آلاف، ثم نحو الصفر', 'Players J(t) = 40t/(t² + 4): they rise up to t = 2, peak at 10 thousand, then towards zero')}
            box={{ xMin: 0, xMax: 8, yMin: -1, yMax: 7 }}
            cell={25}
            units={[1, 2]}
            curves={[{ fn: (t) => (40 * t) / (t * t + 4), from: 0, to: 16.5, color: GREEN }]}
            dots={[{ at: [2, 10], color: SECOND }]}
            notes={[
                { y: 72, formula: 't = 2', color: SECOND, size: 21 },
                { y: 112, formula: 'J(2) = 10', color: SECOND },
                { y: 160, formula: 't → ∞ :  0', color: INK }
            ]}
            notesX={262}
        />
    )
}

export function FromDataFigure({ language }: Props) {
    const f = (x: number) => 3 - 2 / (x + 1)
    return (
        <LimitPlot
            language={language}
            height={290}
            label={say('y = 3 − 2/(x + 1): asintotak x = −1 eta y = 3, eta (0, 1) puntutik igarotzen da', 'y = 3 − 2/(x + 1): asíntotas x = −1 e y = 3, y pasa por (0, 1)', 'y = 3 − 2/(x + 1): المقاربان x = −1 وy = 3، ويمر بـ (0, 1)', 'y = 3 − 2/(x + 1): asymptotes x = −1 and y = 3, and it passes through (0, 1)')}
            box={{ xMin: -5, xMax: 3, yMin: -3, yMax: 7 }}
            cell={25}
            curves={split(f, -1, -5.5, 3.5)}
            dots={[{ at: [0, 1], color: SECOND }]}
            verticals={[-1]}
            horizontals={[3]}
            notes={[
                { y: 72, formula: 'x = −1', color: INK },
                { y: 108, formula: 'y = 3', color: INK },
                { y: 152, formula: 'k = −2', color: SECOND, size: 21 }
            ]}
            notesX={262}
        />
    )
}

/* ---------- The cover ---------- */

export function Bach2gSketchHeroArt() {
    return (
        <div className="fraction-v2-collage" aria-hidden="true">
            <svg viewBox="0 0 520 400" direction="ltr" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                <g transform="translate(22 26) rotate(-4)">
                    <rect width={272} height={214} rx={16} fill={PAPER} stroke={INK} strokeWidth={2} />
                    <line x1={20} y1={150} x2={256} y2={150} stroke={INK} strokeWidth={2} />
                    <line x1={120} y1={198} x2={120} y2={16} stroke={INK} strokeWidth={2} />
                    <line x1={150} y1={16} x2={150} y2={198} stroke="#c4432a" strokeWidth={2.4} strokeDasharray="8 6" />
                    <line x1={20} y1={100} x2={256} y2={100} stroke="#c4432a" strokeWidth={2.4} strokeDasharray="8 6" />
                    <path d="M24 108 C 90 112, 132 130, 144 196" fill="none" stroke="#2f6fdb" strokeWidth={4} strokeLinecap="round" />
                    <path d="M156 20 C 166 80, 200 94, 252 96" fill="none" stroke="#2f6fdb" strokeWidth={4} strokeLinecap="round" />
                </g>
                <g transform="translate(318 44) rotate(5)">
                    <rect width={180} height={124} rx={16} fill="#f3d98b" stroke={INK} strokeWidth={2} />
                    <text x={90} y={58} textAnchor="middle" fontSize={24} fontWeight={700} fill={INK} fontFamily={SERIF}>x = a</text>
                    <text x={90} y={98} textAnchor="middle" fontSize={22} fontWeight={700} fill={INK} fontFamily={SERIF}>y = mx + n</text>
                </g>
                <g transform="translate(56 274) rotate(2)">
                    <rect width={408} height={90} rx={16} fill="#d8c9f1" stroke={INK} strokeWidth={2} />
                    <text x={204} y={58} textAnchor="middle" fontSize={26} fontWeight={700} fill={INK} fontFamily={SERIF}>D · ∩ · ↗ max ↘ · ∪</text>
                </g>
            </svg>
        </div>
    )
}
