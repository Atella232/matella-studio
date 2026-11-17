import type { LocalizedText, UnitLanguage } from '../../features/unit-v2/types'
import { LimitPlot } from '../batx2-zientziak-limiteak/figures'

/* ==========================================================================
   Deribatuaren aplikazioak · Batxilergoa 2 · Gizarte Zientziak — the lesson
   figures, all drawn with LimitPlot of Límites 2.º Ciencias (imported):
   the curve, its tangents, the points that matter and a column of notes.
   Each plot's height is the box height plus a margin, so nothing is cut.
   ========================================================================== */

const INK = 'var(--ink, #1d2733)'
const SECOND = 'var(--second, #c4432a)'
const GREEN = 'var(--success, #267b53)'
const MUSTARD = 'var(--mustard, #e0a100)'
const PAPER = '#fffcf6'
const SERIF = 'Fraunces, serif'

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const line = (a: number, fa: number, m: number) => (x: number) => fa + m * (x - a)

type Props = { language: UnitLanguage }

/* ---------- The tangent line ---------- */

export function TangentLineFigure({ language }: Props) {
    return (
        <LimitPlot
            language={language}
            height={300}
            label={say('y = x³ − 3x + 2 eta zuzen ukitzailea y = 9x − 14, (2, 4) puntuan', 'y = x³ − 3x + 2 y la tangente y = 9x − 14 en (2, 4)', 'y = x³ − 3x + 2 والمماس y = 9x − 14 عند (2, 4)', 'y = x³ − 3x + 2 and the tangent y = 9x − 14 at (2, 4)')}
            box={{ xMin: -3, xMax: 3, yMin: -2, yMax: 8 }}
            cell={25}
            curves={[{ fn: (x) => x ** 3 - 3 * x + 2, from: -3.5, to: 3.5 }, { fn: (x) => 9 * x - 14, from: 0.5, to: 3.5, color: SECOND, width: 2.4 }]}
            dots={[{ at: [2, 4], color: SECOND }]}
            notes={[
                { y: 72, formula: 'f(2) = 4', color: INK },
                { y: 108, formula: "f'(2) = 9", color: INK },
                { y: 152, formula: 'y = 9x − 14', color: SECOND, size: 21 }
            ]}
            notesX={240}
        />
    )
}

export function ParallelTangentFigure({ language }: Props) {
    const f = (x: number) => x * x - 5 * x + 1
    return (
        <LimitPlot
            language={language}
            height={300}
            label={say('y = x² − 5x + 1 eta haren zuzen ukitzailea (4, −3) puntuan, y = 3x + 2 zuzenaren paraleloa', 'y = x² − 5x + 1 y su tangente en (4, −3), paralela a y = 3x + 2', 'y = x² − 5x + 1 ومماسه عند (4, −3) موازيًا لـ y = 3x + 2', 'y = x² − 5x + 1 and its tangent at (4, −3), parallel to y = 3x + 2')}
            box={{ xMin: -1, xMax: 6, yMin: -6, yMax: 4 }}
            cell={25}
            curves={[{ fn: f, from: -1.5, to: 6.5 }, { fn: line(4, -3, 3), from: 1.5, to: 6.5, color: SECOND, width: 2.4 }, { fn: (x) => 3 * x + 2, from: -1.5, to: 0.7, color: MUSTARD, dashed: true, width: 2 }]}
            dots={[{ at: [4, -3], color: SECOND }]}
            notes={[
                { y: 72, formula: "f'(x) = 2x − 5 = 3", color: INK, size: 17 },
                { y: 112, formula: 'x = 4', color: SECOND, size: 21 },
                { y: 152, formula: '(4, −3)', color: SECOND }
            ]}
            notesX={250}
        />
    )
}

export function InflectionTangentFigure({ language }: Props) {
    const f = (x: number) => x ** 3 - 6 * x * x + 10 * x
    return (
        <LimitPlot
            language={language}
            height={300}
            label={say('y = x³ − 6x² + 10x eta zuzen ukitzailea y = −2x + 8 inflexio-puntuan (2, 4): kurbak zeharkatu egiten du', 'y = x³ − 6x² + 10x y la tangente y = −2x + 8 en la inflexión (2, 4): la curva la atraviesa', 'y = x³ − 6x² + 10x والمماس y = −2x + 8 عند الانعطاف (2, 4): يعبره المنحنى', 'y = x³ − 6x² + 10x and the tangent y = −2x + 8 at the inflection (2, 4): the curve crosses it')}
            box={{ xMin: -1, xMax: 5, yMin: -2, yMax: 8 }}
            cell={25}
            curves={[{ fn: f, from: -0.6, to: 4.6 }, { fn: (x) => -2 * x + 8, from: -1, to: 5.5, color: SECOND, width: 2.4 }]}
            dots={[{ at: [2, 4], color: SECOND }]}
            notes={[
                { y: 72, formula: "f''(2) = 0", color: INK },
                { y: 108, formula: "f'(2) = −2", color: INK },
                { y: 152, formula: 'y = −2x + 8', color: SECOND, size: 21 }
            ]}
            notesX={230}
        />
    )
}

/* ---------- Increase and decrease ---------- */

export function SignFigure({ language }: Props) {
    const f = (x: number) => x ** 3 - 12 * x
    return (
        <LimitPlot
            language={language}
            height={320}
            label={say("y = x³ − 12x: x = 1 puntuan jaisten da (f'(1) = −9) eta x = 3 puntuan igotzen da (f'(3) = 15)", "y = x³ − 12x: en x = 1 baja (f'(1) = −9) y en x = 3 sube (f'(3) = 15)", "y = x³ − 12x: تنزل عند x = 1 ‏(f'(1) = −9) وتصعد عند x = 3 ‏(f'(3) = 15)", "y = x³ − 12x: at x = 1 it falls (f'(1) = −9) and at x = 3 it rises (f'(3) = 15)")}
            box={{ xMin: -4, xMax: 4, yMin: -5, yMax: 5 }}
            cell={26}
            units={[1, 4]}
            curves={[{ fn: f, from: -4.5, to: 4.5 }, { fn: line(1, -11, -9), from: 0.2, to: 1.8, color: SECOND, width: 2.6 }, { fn: line(3, -9, 15), from: 2.6, to: 3.6, color: GREEN, width: 2.6 }]}
            dots={[{ at: [1, -11], color: SECOND }, { at: [3, -9], color: GREEN }]}
            notes={[
                { y: 72, formula: "f'(1) = −9 < 0", color: SECOND },
                { y: 108, text: say('beherakorra', 'decrece', 'تتناقص', 'decreasing'), color: SECOND, size: 16 },
                { y: 160, formula: "f'(3) = 15 > 0", color: GREEN },
                { y: 196, text: say('gorakorra', 'crece', 'تتزايد', 'increasing'), color: GREEN, size: 16 }
            ]}
            notesX={270}
        />
    )
}

export function IntervalsFigure({ language }: Props) {
    return (
        <LimitPlot
            language={language}
            height={300}
            label={say('y = x³ − 3x²: gorakorra x < 0 eta x > 2 denean, beherakorra 0 eta 2 artean', 'y = x³ − 3x²: crece si x < 0 y si x > 2, decrece entre 0 y 2', 'y = x³ − 3x²: تتزايد إذا x < 0 وإذا x > 2، وتتناقص بين 0 و2', 'y = x³ − 3x²: increasing if x < 0 and if x > 2, decreasing between 0 and 2')}
            box={{ xMin: -2, xMax: 4, yMin: -6, yMax: 4 }}
            cell={25}
            curves={[{ fn: (x) => x ** 3 - 3 * x * x, from: -1.5, to: 0, color: GREEN }, { fn: (x) => x ** 3 - 3 * x * x, from: 0, to: 2, color: SECOND }, { fn: (x) => x ** 3 - 3 * x * x, from: 2, to: 3.6, color: GREEN }]}
            dots={[{ at: [0, 0], color: INK }, { at: [2, -4], color: INK }]}
            notes={[
                { y: 72, formula: "f' = 3x(x − 2)", color: INK },
                { y: 112, formula: '+   0   −   0   +', color: INK, size: 18 },
                { y: 146, formula: '      0        2', color: INK, size: 16 }
            ]}
            notesX={220}
        />
    )
}

export function GrowthContextFigure({ language }: Props) {
    return (
        <LimitPlot
            language={language}
            height={300}
            label={say('B(t) = t³ − 9t² + 24t irabaziak: 2. urtera arte hazten dira, 4. urtera arte jaisten dira eta gero hazten dira', 'Beneficios B(t) = t³ − 9t² + 24t: crecen hasta el año 2, bajan hasta el 4 y después crecen', 'الأرباح B(t) = t³ − 9t² + 24t: تنمو حتى السنة 2 وتنخفض حتى 4 ثم تنمو', 'Profits B(t) = t³ − 9t² + 24t: they grow until year 2, fall until year 4 and then grow')}
            box={{ xMin: 0, xMax: 6, yMin: 0, yMax: 8 }}
            cell={28}
            units={[1, 5]}
            curves={[{ fn: (t) => t ** 3 - 9 * t * t + 24 * t, from: 0, to: 6, color: GREEN }]}
            dots={[{ at: [2, 20], color: INK }, { at: [4, 16], color: INK }]}
            notes={[
                { y: 72, formula: "B' = 3(t − 2)(t − 4)", color: INK, size: 17 },
                { y: 116, formula: '0 → 2 :  ↗', color: GREEN },
                { y: 152, formula: '2 → 4 :  ↘', color: SECOND },
                { y: 188, formula: '4 → 6 :  ↗', color: GREEN }
            ]}
            notesX={240}
        />
    )
}

/* ---------- Maxima and minima ---------- */

export function ExtremaFigure({ language }: Props) {
    return (
        <LimitPlot
            language={language}
            height={320}
            label={say('y = 2x³ − 3x² − 12x: maximoa (−1, 7) eta minimoa (2, −20)', 'y = 2x³ − 3x² − 12x: máximo en (−1, 7) y mínimo en (2, −20)', 'y = 2x³ − 3x² − 12x: عظمى عند (−1, 7) وصغرى عند (2, −20)', 'y = 2x³ − 3x² − 12x: a maximum at (−1, 7) and a minimum at (2, −20)')}
            box={{ xMin: -3, xMax: 4, yMin: -6, yMax: 4 }}
            cell={26}
            units={[1, 5]}
            curves={[{ fn: (x) => 2 * x ** 3 - 3 * x * x - 12 * x, from: -3.5, to: 4.5 }]}
            dots={[{ at: [-1, 7], color: GREEN }, { at: [2, -20], color: SECOND }]}
            notes={[
                { y: 72, formula: 'max (−1, 7)', color: GREEN },
                { y: 112, formula: 'min (2, −20)', color: SECOND },
                { y: 160, formula: "f''(−1) < 0 ,  f''(2) > 0", color: INK, size: 16 }
            ]}
            notesX={240}
        />
    )
}

export function AbsoluteFigure({ language }: Props) {
    return (
        <LimitPlot
            language={language}
            height={300}
            label={say('B(t) = t³ − 9t² + 24t [0, 6] tartean: maximo erlatiboa (2, 20), baina absolutua (6, 36)', 'B(t) = t³ − 9t² + 24t en [0, 6]: máximo relativo en (2, 20), pero el absoluto en (6, 36)', 'B(t) = t³ − 9t² + 24t على [0, 6]: عظمى محلية عند (2, 20) لكن المطلقة عند (6, 36)', 'B(t) = t³ − 9t² + 24t on [0, 6]: a relative maximum at (2, 20), but the absolute one at (6, 36)')}
            box={{ xMin: 0, xMax: 6, yMin: 0, yMax: 8 }}
            cell={28}
            units={[1, 5]}
            curves={[{ fn: (t) => t ** 3 - 9 * t * t + 24 * t, from: 0, to: 6, color: GREEN }]}
            dots={[{ at: [2, 20], color: MUSTARD }, { at: [6, 36], color: SECOND }, { at: [0, 0], color: INK }]}
            notes={[
                { y: 72, formula: 'B(2) = 20', color: MUSTARD },
                { y: 108, formula: 'B(6) = 36', color: SECOND, size: 21 },
                { y: 152, text: say('absolutua muturrean', 'el absoluto, en el extremo', 'المطلقة عند الطرف', 'the absolute one, at the end'), size: 16 }
            ]}
            notesX={240}
        />
    )
}

export function ParametersFigure({ language }: Props) {
    return (
        <LimitPlot
            language={language}
            height={300}
            label={say('y = x² − 6x + 10: minimoa (3, 1) puntuan', 'y = x² − 6x + 10: mínimo en (3, 1)', 'y = x² − 6x + 10: صغرى عند (3, 1)', 'y = x² − 6x + 10: a minimum at (3, 1)')}
            box={{ xMin: -1, xMax: 6, yMin: -1, yMax: 9 }}
            cell={25}
            curves={[{ fn: (x) => x * x - 6 * x + 10, from: -0.5, to: 6.5 }, { fn: () => 1, from: 1.5, to: 4.5, color: SECOND, dashed: true, width: 2 }]}
            dots={[{ at: [3, 1], color: SECOND }]}
            notes={[
                { y: 72, formula: "f'(3) = 0 :  a = −6", color: INK, size: 17 },
                { y: 108, formula: 'f(3) = 1 :  b = 10', color: INK, size: 17 }
            ]}
            notesX={240}
        />
    )
}

/* ---------- Curvature ---------- */

export function SecondSignFigure({ language }: Props) {
    return (
        <LimitPlot
            language={language}
            height={300}
            label={say('y = x³ − 6x²: ganbila (∩) x < 2 denean eta ahurra (∪) x > 2 denean', 'y = x³ − 6x²: convexa (∩) si x < 2 y cóncava (∪) si x > 2', 'y = x³ − 6x²: مقعّرة نحو الأسفل (∩) إذا x < 2 ونحو الأعلى (∪) إذا x > 2', 'y = x³ − 6x²: concave down (∩) if x < 2 and concave up (∪) if x > 2')}
            box={{ xMin: -2, xMax: 6, yMin: -9, yMax: 1 }}
            cell={25}
            units={[1, 4]}
            curves={[{ fn: (x) => x ** 3 - 6 * x * x, from: -1.6, to: 2, color: SECOND }, { fn: (x) => x ** 3 - 6 * x * x, from: 2, to: 6.4, color: GREEN }]}
            dots={[{ at: [2, -16], color: INK }]}
            notes={[
                { y: 72, formula: "f'' = 6x − 12", color: INK },
                { y: 112, formula: 'x < 2 :  ∩', color: SECOND, size: 21 },
                { y: 150, formula: 'x > 2 :  ∪', color: GREEN, size: 21 }
            ]}
            notesX={260}
        />
    )
}

export function InflectionFigure({ language }: Props) {
    return (
        <LimitPlot
            language={language}
            height={300}
            label={say('V(t) = −t³ + 9t² salmentak: inflexio-puntua t = 3 denean, azkarren hazten diren unea', 'Ventas V(t) = −t³ + 9t²: inflexión en t = 3, cuando crecen más deprisa', 'المبيعات V(t) = −t³ + 9t²: انعطاف عند t = 3 حين تنمو بأسرع ما يمكن', 'Sales V(t) = −t³ + 9t²: inflection at t = 3, when they grow fastest')}
            box={{ xMin: 0, xMax: 7, yMin: 0, yMax: 8 }}
            cell={28}
            units={[1, 15]}
            curves={[{ fn: (t) => -(t ** 3) + 9 * t * t, from: 0, to: 6.5, color: GREEN }, { fn: line(3, 54, 27), from: 1.6, to: 4.4, color: SECOND, dashed: true, width: 2.2 }]}
            dots={[{ at: [3, 54], color: SECOND }]}
            notes={[
                { y: 72, formula: "V''(3) = 0", color: INK },
                { y: 112, formula: "V'(3) = 27", color: SECOND, size: 21 },
                { y: 156, text: say('azkarren hazten da', 'crece más deprisa', 'أسرع نمو', 'fastest growth'), size: 16 }
            ]}
            notesX={270}
        />
    )
}

export function ReadGraphFigure({ language }: Props) {
    return (
        <LimitPlot
            language={language}
            height={290}
            label={say("f'(x) = x² − 4 deribatuaren grafikoa: x = −2 eta x = 2 puntuetan ardatza zeharkatzen du, eta minimoa du x = 0 puntuan", "La gráfica de la derivada f'(x) = x² − 4: cruza el eje en x = −2 y x = 2 y tiene su mínimo en x = 0", "تمثيل المشتقة f'(x) = x² − 4: تقطع المحور عند x = −2 وx = 2 وصغراها عند x = 0", "The graph of the derivative f'(x) = x² − 4: it crosses the axis at x = −2 and x = 2 and has its minimum at x = 0")}
            box={{ xMin: -4, xMax: 4, yMin: -5, yMax: 5 }}
            cell={24}
            curves={[{ fn: (x) => x * x - 4, from: -4.5, to: 4.5, color: MUSTARD }]}
            dots={[{ at: [-2, 0], color: GREEN }, { at: [2, 0], color: SECOND }, { at: [0, -4], color: INK }]}
            notes={[
                { y: 72, formula: "f'", color: MUSTARD, size: 21 },
                { y: 110, formula: 'x = −2 :  max', color: GREEN },
                { y: 146, formula: 'x = 2 :  min', color: SECOND },
                { y: 182, formula: 'x = 0 :  inflex.', color: INK }
            ]}
            notesX={250}
        />
    )
}

/* ---------- Optimisation ---------- */

export function ProfitMaxFigure({ language }: Props) {
    return (
        <LimitPlot
            language={language}
            height={290}
            label={say('B(x) = −x² + 40x − 100 irabazia: maximoa x = 20 denean, 300 euro', 'Beneficio B(x) = −x² + 40x − 100: máximo en x = 20, 300 €', 'الربح B(x) = −x² + 40x − 100: أعظمي عند x = 20 ويساوي 300 €', 'Profit B(x) = −x² + 40x − 100: highest at x = 20, €300')}
            box={{ xMin: 0, xMax: 8, yMin: -1, yMax: 7 }}
            cell={28}
            units={[5, 50]}
            ox={50}
            curves={[{ fn: (x) => -x * x + 40 * x - 100, from: 0, to: 40, color: GREEN }]}
            dots={[{ at: [20, 300], color: SECOND }]}
            notes={[
                { y: 72, formula: "B' = −2x + 40", color: INK },
                { y: 112, formula: 'x = 20', color: SECOND, size: 21 },
                { y: 152, formula: 'B(20) = 300', color: SECOND }
            ]}
            notesX={300}
        />
    )
}

export function AverageMinFigure({ language }: Props) {
    return (
        <LimitPlot
            language={language}
            height={290}
            label={say("M(x) = x + 12 + 400/x batez besteko kostua eta C'(x) = 2x + 12: x = 20 denean elkartzen dira, minimoan (52)", "El coste medio M(x) = x + 12 + 400/x y C'(x) = 2x + 12: se cortan en x = 20, en el mínimo (52)", "متوسط التكلفة M(x) = x + 12 + 400/x و‏C'(x) = 2x + 12: يتقاطعان عند x = 20 في الصغرى (52)", "The average cost M(x) = x + 12 + 400/x and C'(x) = 2x + 12: they meet at x = 20, at the minimum (52)")}
            box={{ xMin: 0, xMax: 8, yMin: 0, yMax: 8 }}
            cell={28}
            units={[5, 20]}
            ox={50}
            curves={[{ fn: (x) => x + 12 + 400 / x, from: 3, to: 41, color: GREEN }, { fn: (x) => 2 * x + 12, from: 0, to: 41, color: SECOND, dashed: true, width: 2.2 }]}
            dots={[{ at: [20, 52], color: INK }]}
            notes={[
                { y: 72, formula: 'M = C/x', color: GREEN },
                { y: 108, formula: "C' = 2x + 12", color: SECOND },
                { y: 152, formula: 'x = 20 :  52', color: INK, size: 21 }
            ]}
            notesX={300}
        />
    )
}

export function IncomeMaxFigure({ language }: Props) {
    return (
        <LimitPlot
            language={language}
            height={290}
            label={say('I(x) = (20 + x)(600 − 20x) diru-sarrera: maximoa x = 5 denean, sarrera 25 eurotan', 'Ingreso I(x) = (20 + x)(600 − 20x): máximo en x = 5, entrada a 25 €', 'الإيراد I(x) = (20 + x)(600 − 20x): أعظمي عند x = 5 والتذكرة بـ 25 €', 'Income I(x) = (20 + x)(600 − 20x): highest at x = 5, tickets at €25')}
            box={{ xMin: 0, xMax: 8, yMin: 0, yMax: 7 }}
            cell={28}
            units={[2.5, 2000]}
            ox={58}
            curves={[{ fn: (x) => (20 + x) * (600 - 20 * x), from: 0, to: 20, color: GREEN }]}
            dots={[{ at: [5, 12500], color: SECOND }]}
            notes={[
                { y: 72, formula: "I' = 200 − 40x", color: INK },
                { y: 112, formula: 'x = 5', color: SECOND, size: 21 },
                { y: 152, formula: '25 · 500', color: SECOND }
            ]}
            notesX={310}
        />
    )
}

/* ---------- The cover ---------- */

export function Bach2gApplicationsHeroArt() {
    return (
        <div className="fraction-v2-collage" aria-hidden="true">
            <svg viewBox="0 0 520 400" direction="ltr" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                <g transform="translate(22 26) rotate(-4)">
                    <rect width={272} height={214} rx={16} fill={PAPER} stroke={INK} strokeWidth={2} />
                    <line x1={20} y1={180} x2={256} y2={180} stroke={INK} strokeWidth={2} />
                    <line x1={40} y1={198} x2={40} y2={16} stroke={INK} strokeWidth={2} />
                    <path d="M42 176 C 90 20, 190 20, 250 176" fill="none" stroke="#267b53" strokeWidth={4} strokeLinecap="round" />
                    <line x1={90} y1={58} x2={200} y2={58} stroke="#c4432a" strokeWidth={3} strokeDasharray="8 6" />
                    <circle cx={146} cy={58} r={7} fill={INK} />
                    <text x={150} y={40} fontSize={20} fontWeight={700} fill={INK} fontFamily={SERIF}>B′ = 0</text>
                </g>
                <g transform="translate(318 44) rotate(5)">
                    <rect width={180} height={124} rx={16} fill="#f3d98b" stroke={INK} strokeWidth={2} />
                    <text x={90} y={58} textAnchor="middle" fontSize={24} fontWeight={700} fill={INK} fontFamily={SERIF}>I′ = C′</text>
                    <text x={90} y={98} textAnchor="middle" fontSize={18} fontWeight={700} fill={INK} fontFamily={SERIF}>max B</text>
                </g>
                <g transform="translate(56 274) rotate(2)">
                    <rect width={408} height={90} rx={16} fill="#d8c9f1" stroke={INK} strokeWidth={2} />
                    <text x={204} y={58} textAnchor="middle" fontSize={26} fontWeight={700} fill={INK} fontFamily={SERIF}>f′ : +  0  −   ∩   ∪</text>
                </g>
            </svg>
        </div>
    )
}
