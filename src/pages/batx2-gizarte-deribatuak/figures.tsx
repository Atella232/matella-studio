import type { LocalizedText, UnitLanguage } from '../../features/unit-v2/types'
import { LimitPlot } from '../batx2-zientziak-limiteak/figures'

/* ==========================================================================
   Deribatuak · Batxilergoa 2 · Gizarte Zientziak — the lesson figures,
   all drawn with LimitPlot of Límites 2.º Ciencias (imported): a curve,
   its secants and tangents as dashed lines, the points and a column of
   notes. Formulas sit in their own <text>; words go through <Label>.
   ========================================================================== */

const INK = 'var(--ink, #1d2733)'
const STAGE = 'var(--stage, #2f6fdb)'
const SECOND = 'var(--second, #c4432a)'
const GREEN = 'var(--success, #267b53)'
const MUSTARD = 'var(--mustard, #e0a100)'
const PAPER = '#fffcf6'
const SERIF = 'Fraunces, serif'

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
/** The line through (a, f(a)) with slope m */
const line = (a: number, fa: number, m: number) => (x: number) => fa + m * (x - a)

type Props = { language: UnitLanguage }

/* ---------- Rate of change ---------- */

export function RateFigure({ language }: Props) {
    const f = (x: number) => x * x - 2 * x
    return (
        <LimitPlot
            language={language}
            height={310}
            label={say('y = x² − 2x eta (1, −1) eta (4, 8) puntuak lotzen dituen ebakitzailea, malda 3', 'y = x² − 2x y la secante por (1, −1) y (4, 8), de pendiente 3', 'y = x² − 2x والقاطع المار بـ (1, −1) و(4, 8) بميل 3', 'y = x² − 2x and the secant through (1, −1) and (4, 8), slope 3')}
            box={{ xMin: -1, xMax: 5, yMin: -2, yMax: 9 }}
            cell={24}
            curves={[{ fn: f, from: -1.5, to: 5.5 }, { fn: line(1, -1, 3), from: -1, to: 5.5, color: SECOND, dashed: true, width: 2.4 }]}
            dots={[{ at: [1, -1], color: SECOND }, { at: [4, 8], color: SECOND }]}
            notes={[
                { y: 72, formula: 'f(1) = −1', color: INK },
                { y: 108, formula: 'f(4) = 8', color: INK },
                { y: 152, formula: '(8 + 1)/(4 − 1) = 3', color: SECOND },
                { y: 192, text: say('ebakitzailearen malda', 'pendiente de la secante', 'ميل القاطع', 'slope of the secant'), size: 16 }
            ]}
            notesX={240}
        />
    )
}

export function RateContextFigure({ language }: Props) {
    const v = (t: number) => 12 * t - t * t
    return (
        <LimitPlot
            language={language}
            height={290}
            label={say('V(t) = 12t − t² salmentak: 2. hilabetean 20 mila, 5.ean 35 mila; hilean 5 mila gehiago, batez beste', 'Ventas V(t) = 12t − t²: 20 mil en el mes 2 y 35 mil en el 5; 5 mil más al mes de media', 'المبيعات V(t) = 12t − t²: ‏20 ألفًا في الشهر 2 و35 ألفًا في الشهر 5؛ 5 آلاف إضافية شهريًا في المتوسط', 'Sales V(t) = 12t − t²: 20 thousand in month 2 and 35 thousand in month 5; 5 thousand more a month on average')}
            box={{ xMin: 0, xMax: 7, yMin: 0, yMax: 8 }}
            cell={28}
            units={[1, 5]}
            curves={[{ fn: v, from: 0, to: 7.5, color: GREEN }, { fn: line(2, 20, 5), from: 0, to: 7.5, color: SECOND, dashed: true, width: 2.4 }]}
            dots={[{ at: [2, 20], color: SECOND }, { at: [5, 35], color: SECOND }]}
            notes={[
                { y: 72, formula: 'V(2) = 20', color: INK },
                { y: 108, formula: 'V(5) = 35', color: INK },
                { y: 152, formula: '15/3 = 5', color: SECOND, size: 21 },
                { y: 192, text: say('milaka, hilean', 'miles al mes', 'آلاف في الشهر', 'thousands a month'), size: 16 }
            ]}
            notesX={270}
        />
    )
}

export function InstantFigure({ language }: Props) {
    const v = (t: number) => 12 * t - t * t
    return (
        <LimitPlot
            language={language}
            height={290}
            label={say('V(t) = 12t − t²: ebakitzaileak (h = 3 eta h = 1) zuzen ukitzailera hurbiltzen dira t = 2 puntuan, malda 8', 'V(t) = 12t − t²: las secantes (h = 3 y h = 1) se acercan a la tangente en t = 2, de pendiente 8', 'V(t) = 12t − t²: يقترب القاطعان (h = 3 وh = 1) من المماس عند t = 2 بميل 8', 'V(t) = 12t − t²: the secants (h = 3 and h = 1) approach the tangent at t = 2, slope 8')}
            box={{ xMin: 0, xMax: 7, yMin: 0, yMax: 8 }}
            cell={28}
            units={[1, 5]}
            curves={[
                { fn: v, from: 0, to: 7.5, color: GREEN },
                { fn: line(2, 20, 5), from: 0, to: 7.5, color: MUSTARD, dashed: true, width: 2 },
                { fn: line(2, 20, 7), from: 0, to: 7.5, color: SECOND, dashed: true, width: 2 },
                { fn: line(2, 20, 8), from: 0, to: 7.5, color: STAGE, width: 2.6 }
            ]}
            dots={[{ at: [2, 20], color: INK }]}
            notes={[
                { y: 72, formula: 'h = 3 :  5', color: MUSTARD },
                { y: 108, formula: 'h = 1 :  7', color: SECOND },
                { y: 144, formula: 'h → 0 :  8', color: STAGE, size: 21 },
                { y: 188, text: say('zuzen ukitzailea', 'la tangente', 'المماس', 'the tangent'), color: STAGE, size: 16 }
            ]}
            notesX={270}
        />
    )
}

/* ---------- The derivative at a point ---------- */

export function DefinitionFigure({ language }: Props) {
    const f = (x: number) => 3 * x * x + x
    return (
        <LimitPlot
            language={language}
            height={280}
            label={say('y = 3x² + x eta haren zuzen ukitzailea x = 1 puntuan, malda 7', 'y = 3x² + x y su tangente en x = 1, de pendiente 7', 'y = 3x² + x ومماسه عند x = 1 بميل 7', 'y = 3x² + x and its tangent at x = 1, slope 7')}
            box={{ xMin: -1, xMax: 3, yMin: -2, yMax: 7 }}
            cell={26}
            units={[0.5, 2]}
            labelStep={2}
            curves={[{ fn: f, from: -0.6, to: 1.6 }, { fn: line(1, 4, 7), from: -0.6, to: 1.6, color: SECOND, dashed: true, width: 2.4 }]}
            dots={[{ at: [1, 4], color: SECOND }]}
            notes={[
                { y: 72, formula: '(f(1 + h) − f(1))/h', color: INK, size: 17 },
                { y: 110, formula: '= 7 + 3h', color: INK },
                { y: 150, formula: "h → 0 :  f'(1) = 7", color: SECOND }
            ]}
            notesX={180}
        />
    )
}

export function TangentFigure({ language }: Props) {
    const f = (x: number) => x * x - 4 * x + 5
    return (
        <LimitPlot
            language={language}
            height={300}
            label={say('y = x² − 4x + 5 eta zuzen ukitzailea y = 2x − 4, (3, 2) puntuan', 'y = x² − 4x + 5 y la tangente y = 2x − 4 en (3, 2)', 'y = x² − 4x + 5 والمماس y = 2x − 4 عند (3, 2)', 'y = x² − 4x + 5 and the tangent y = 2x − 4 at (3, 2)')}
            box={{ xMin: -1, xMax: 6, yMin: -2, yMax: 8 }}
            cell={25}
            curves={[{ fn: f, from: -1.5, to: 6.5 }, { fn: (x) => 2 * x - 4, from: -1.5, to: 6.5, color: SECOND, width: 2.4 }]}
            dots={[{ at: [3, 2], color: SECOND }]}
            notes={[
                { y: 72, formula: 'f(3) = 2', color: INK },
                { y: 108, formula: "f'(3) = 2", color: INK },
                { y: 152, formula: 'y = 2x − 4', color: SECOND, size: 21 }
            ]}
            notesX={250}
        />
    )
}

export function CornerFigure({ language }: Props) {
    return (
        <LimitPlot
            language={language}
            height={280}
            label={say('x² eta 3x − 2 zatiak (1, 1) puntuan elkartzen dira, baina malda 2 eta 3 dira: punta', 'Los trozos x² y 3x − 2 se unen en (1, 1), pero con pendientes 2 y 3: un pico', 'يلتقي الجزآن x² و3x − 2 عند (1, 1) بميلين 2 و3: زاوية', 'The pieces x² and 3x − 2 meet at (1, 1), but with slopes 2 and 3: a corner')}
            box={{ xMin: -2, xMax: 3, yMin: -1, yMax: 6 }}
            cell={30}
            curves={[{ fn: (x) => x * x, from: -2.5, to: 1, color: STAGE }, { fn: (x) => 3 * x - 2, from: 1, to: 3.5, color: SECOND }]}
            dots={[{ at: [1, 1], color: INK }]}
            notes={[
                { y: 72, formula: "f'(1⁻) = 2", color: STAGE },
                { y: 108, formula: "f'(1⁺) = 3", color: SECOND },
                { y: 152, text: say('jarraitua, punta', 'continua, con pico', 'متصلة، بزاوية', 'continuous, with a corner'), size: 16 }
            ]}
            notesX={240}
        />
    )
}

/* ---------- Rules ---------- */

export function PowersFigure({ language }: Props) {
    return (
        <LimitPlot
            language={language}
            height={250}
            label={say('y = x³ eta haren deribatua y = 3x²', 'y = x³ y su derivada y = 3x²', 'y = x³ ومشتقتها y = 3x²', 'y = x³ and its derivative y = 3x²')}
            box={{ xMin: -2, xMax: 2, yMin: -3, yMax: 4 }}
            cell={28}
            curves={[{ fn: (x) => x ** 3, from: -2.5, to: 2.5 }, { fn: (x) => 3 * x * x, from: -2.5, to: 2.5, color: SECOND }]}
            notes={[
                { y: 72, formula: 'f = x³', color: STAGE, size: 21 },
                { y: 112, formula: "f' = 3x²", color: SECOND, size: 21 },
                { y: 160, formula: "(xⁿ)' = n xⁿ⁻¹", color: INK }
            ]}
            notesX={190}
        />
    )
}

export function ProductFigure({ language }: Props) {
    const m = (x: number) => (2 * x + 50) / (x + 1)
    return (
        <LimitPlot
            language={language}
            height={270}
            label={say('Batez besteko kostua M(x) = (2x + 50)/(x + 1) beti jaisten da eta 2 eurora hurbiltzen da', 'El coste medio M(x) = (2x + 50)/(x + 1) siempre baja y se acerca a 2 €', 'متوسط التكلفة M(x) = (2x + 50)/(x + 1) يتناقص دائمًا ويقترب من 2 €', 'The average cost M(x) = (2x + 50)/(x + 1) always falls and approaches €2')}
            box={{ xMin: 0, xMax: 8, yMin: 0, yMax: 6 }}
            cell={30}
            units={[2, 10]}
            curves={[{ fn: m, from: 0, to: 16.5, color: GREEN }]}
            horizontals={[2]}
            notes={[
                { y: 72, formula: "M'(x) = −48/(x + 1)²", color: SECOND, size: 17 },
                { y: 112, formula: "M' < 0", color: SECOND, size: 21 },
                { y: 156, text: say('beti jaisten da', 'siempre baja', 'يتناقص دائمًا', 'always falls'), size: 16 }
            ]}
            notesX={300}
        />
    )
}

export function DerivativeGraphFigure({ language }: Props) {
    return (
        <LimitPlot
            language={language}
            height={330}
            label={say('B(x) = −x² + 8x − 7 irabazia eta B′(x) = −2x + 8; B′ zero da x = 4 puntuan, B maximoa den tokian', 'El beneficio B(x) = −x² + 8x − 7 y B′(x) = −2x + 8; B′ se anula en x = 4, donde B es máximo', 'الربح B(x) = −x² + 8x − 7 وB′(x) = −2x + 8؛ تنعدم B′ عند x = 4 حيث B أعظمية', 'The profit B(x) = −x² + 8x − 7 and B′(x) = −2x + 8; B′ is 0 at x = 4, where B is highest')}
            box={{ xMin: 0, xMax: 8, yMin: -4, yMax: 9 }}
            cell={22}
            curves={[{ fn: (x) => -x * x + 8 * x - 7, from: 0, to: 8.5, color: GREEN }, { fn: (x) => -2 * x + 8, from: 0, to: 8.5, color: SECOND }]}
            dots={[{ at: [4, 9], color: GREEN }, { at: [4, 0], color: SECOND }]}
            notes={[
                { y: 72, formula: 'B', color: GREEN, size: 21 },
                { y: 108, formula: "B' = −2x + 8", color: SECOND },
                { y: 152, formula: "x < 4 :  B' > 0", color: INK, size: 17 },
                { y: 186, formula: "x > 4 :  B' < 0", color: INK, size: 17 }
            ]}
            notesX={240}
        />
    )
}

/* ---------- The chain rule ---------- */

export function ChainPowerFigure({ language }: Props) {
    return (
        <LimitPlot
            language={language}
            height={250}
            label={say('y = √(2x + 5) eta haren zuzen ukitzailea x = 2 puntuan, malda 1/3', 'y = √(2x + 5) y su tangente en x = 2, de pendiente 1/3', 'y = √(2x + 5) ومماسه عند x = 2 بميل 1/3', 'y = √(2x + 5) and its tangent at x = 2, slope 1/3')}
            box={{ xMin: -3, xMax: 6, yMin: -1, yMax: 5 }}
            cell={26}
            curves={[{ fn: (x) => Math.sqrt(2 * x + 5), from: -2.5, to: 6.5 }, { fn: line(2, 3, 1 / 3), from: -3.5, to: 6.5, color: SECOND, dashed: true, width: 2.4 }]}
            dots={[{ at: [2, 3], color: SECOND }]}
            notes={[
                { y: 72, formula: "g' = 1/√(2x + 5)", color: SECOND },
                { y: 112, formula: "g'(2) = 1/3", color: SECOND, size: 21 }
            ]}
            notesX={290}
        />
    )
}

export function ChainExpFigure({ language }: Props) {
    return (
        <LimitPlot
            language={language}
            height={270}
            label={say('P(t) = 200e^(0,03t) biztanleria: gero eta azkarrago hazten da', 'La población P(t) = 200e^(0,03t) crece cada vez más deprisa', 'السكان P(t) = 200e^(0.03t) ينمون بسرعة متزايدة', 'The population P(t) = 200e^(0.03t) grows faster and faster')}
            box={{ xMin: 0, xMax: 8, yMin: 0, yMax: 6 }}
            cell={30}
            units={[10, 100]}
            curves={[{ fn: (t) => 200 * Math.exp(0.03 * t), from: 0, to: 82, color: GREEN }, { fn: line(0, 200, 6), from: 0, to: 40, color: SECOND, dashed: true, width: 2.2 }]}
            dots={[{ at: [0, 200], color: SECOND }]}
            notes={[
                { y: 72, formula: "P'(t) = 6e^(0,03t)", color: SECOND },
                { y: 112, formula: "P'(0) = 6", color: SECOND, size: 21 }
            ]}
            notesX={300}
        />
    )
}

export function ChainLogFigure({ language }: Props) {
    const f = (x: number) => Math.log(x * x + 4 * x)
    return (
        <LimitPlot
            language={language}
            height={250}
            label={say('y = ln(x² + 4x) eta haren zuzen ukitzailea x = 1 puntuan, malda 6/5', 'y = ln(x² + 4x) y su tangente en x = 1, de pendiente 6/5', 'y = ln(x² + 4x) ومماسه عند x = 1 بميل 6/5', 'y = ln(x² + 4x) and its tangent at x = 1, slope 6/5')}
            box={{ xMin: 0, xMax: 5, yMin: -1, yMax: 4 }}
            cell={32}
            curves={[{ fn: f, from: 0.1, to: 5.5 }, { fn: line(1, Math.log(5), 1.2), from: 0, to: 3, color: SECOND, dashed: true, width: 2.4 }]}
            dots={[{ at: [1, Math.log(5)], color: SECOND }]}
            notes={[
                { y: 72, formula: "f' = (2x + 4)/(x² + 4x)", color: SECOND, size: 17 },
                { y: 112, formula: "f'(1) = 6/5", color: SECOND, size: 21 }
            ]}
            notesX={240}
        />
    )
}

/* ---------- In economy ---------- */

export function HigherFigure({ language }: Props) {
    return (
        <LimitPlot
            language={language}
            height={290}
            label={say("V(t) = t³ − 6t² + 20t salmentak: t = 2 arte gero eta motelago hazten dira (V'' < 0), eta gero bizkorrago", "Ventas V(t) = t³ − 6t² + 20t: hasta t = 2 crecen cada vez más despacio (V'' < 0) y después más deprisa", "المبيعات V(t) = t³ − 6t² + 20t: حتى t = 2 تنمو أبطأ فأبطأ (V'' < 0) ثم أسرع", "Sales V(t) = t³ − 6t² + 20t: up to t = 2 they grow more and more slowly (V'' < 0), then faster")}
            box={{ xMin: 0, xMax: 5, yMin: 0, yMax: 8 }}
            cell={28}
            units={[1, 10]}
            curves={[{ fn: (t) => t ** 3 - 6 * t * t + 20 * t, from: 0, to: 5.5, color: GREEN }]}
            dots={[{ at: [2, 24], color: SECOND }]}
            verticals={[2]}
            notes={[
                { y: 72, formula: "V'' = 6t − 12", color: SECOND },
                { y: 112, formula: "t < 2 :  V'' < 0", color: INK, size: 17 },
                { y: 146, formula: "t > 2 :  V'' > 0", color: INK, size: 17 }
            ]}
            notesX={220}
        />
    )
}

export function SmoothJoinFigure({ language }: Props) {
    return (
        <LimitPlot
            language={language}
            height={310}
            label={say('a = 4 eta b = −3 direnean, x² + 1 eta 4x − 3 zatiak (2, 5) puntuan elkartzen dira malda berarekin', 'Con a = 4 y b = −3, los trozos x² + 1 y 4x − 3 se unen en (2, 5) con la misma pendiente', 'مع a = 4 وb = −3 يلتقي الجزآن x² + 1 و4x − 3 عند (2, 5) بالميل نفسه', 'With a = 4 and b = −3, the pieces x² + 1 and 4x − 3 meet at (2, 5) with the same slope')}
            box={{ xMin: -1, xMax: 4, yMin: -1, yMax: 10 }}
            cell={24}
            curves={[{ fn: (x) => x * x + 1, from: -1.5, to: 2, color: STAGE }, { fn: (x) => 4 * x - 3, from: 2, to: 4.5, color: GREEN }]}
            dots={[{ at: [2, 5], color: INK }]}
            notes={[
                { y: 72, formula: '5 = 2a + b', color: INK },
                { y: 108, formula: '4 = a', color: INK },
                { y: 152, formula: 'a = 4,  b = −3', color: GREEN, size: 20 }
            ]}
            notesX={200}
        />
    )
}

export function MarginalFigure({ language }: Props) {
    const c = (x: number) => 0.5 * x * x + 10 * x + 200
    return (
        <LimitPlot
            language={language}
            height={290}
            label={say("C(x) = 0,5x² + 10x + 200 kostua eta haren zuzen ukitzailea x = 20 puntuan: C'(20) = 30 ≈ C(21) − C(20) = 30,5", "El coste C(x) = 0,5x² + 10x + 200 y su tangente en x = 20: C'(20) = 30 ≈ C(21) − C(20) = 30,5", "التكلفة C(x) = 0.5x² + 10x + 200 ومماسها عند x = 20: ‏C'(20) = 30 ≈ C(21) − C(20) = 30.5", "The cost C(x) = 0.5x² + 10x + 200 and its tangent at x = 20: C'(20) = 30 ≈ C(21) − C(20) = 30.5")}
            box={{ xMin: 0, xMax: 8, yMin: 0, yMax: 8 }}
            cell={28}
            units={[5, 200]}
            ox={54}
            curves={[{ fn: c, from: 0, to: 41, color: STAGE }, { fn: line(20, 600, 30), from: 0, to: 41, color: SECOND, dashed: true, width: 2.4 }]}
            dots={[{ at: [20, 600], color: SECOND }]}
            notes={[
                { y: 72, formula: "C'(20) = 30", color: SECOND, size: 21 },
                { y: 112, formula: 'C(21) − C(20) = 30,5', color: INK, size: 17 },
                { y: 156, text: say('hurrengo unitatea', 'la unidad siguiente', 'الوحدة التالية', 'the next unit'), size: 16 }
            ]}
            notesX={310}
        />
    )
}

/* ---------- The cover ---------- */

export function Bach2gDerivativesHeroArt() {
    return (
        <div className="fraction-v2-collage" aria-hidden="true">
            <svg viewBox="0 0 520 400" direction="ltr" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                <g transform="translate(22 26) rotate(-4)">
                    <rect width={272} height={214} rx={16} fill={PAPER} stroke={INK} strokeWidth={2} />
                    <line x1={20} y1={180} x2={256} y2={180} stroke={INK} strokeWidth={2} />
                    <line x1={40} y1={198} x2={40} y2={16} stroke={INK} strokeWidth={2} />
                    <path d="M42 176 C 90 170, 170 120, 250 26" fill="none" stroke="#2f6fdb" strokeWidth={4} strokeLinecap="round" />
                    <line x1={90} y1={190} x2={250} y2={70} stroke="#c4432a" strokeWidth={3} strokeDasharray="8 6" />
                    <circle cx={170} cy={130} r={7} fill={INK} />
                </g>
                <g transform="translate(318 44) rotate(5)">
                    <rect width={180} height={124} rx={16} fill="#f3d98b" stroke={INK} strokeWidth={2} />
                    <text x={90} y={58} textAnchor="middle" fontSize={26} fontWeight={700} fill={INK} fontFamily={SERIF}>C′(x)</text>
                    <text x={90} y={98} textAnchor="middle" fontSize={18} fontWeight={700} fill={INK} fontFamily={SERIF}>≈ C(x+1) − C(x)</text>
                </g>
                <g transform="translate(56 274) rotate(2)">
                    <rect width={408} height={90} rx={16} fill="#d9efe2" stroke={INK} strokeWidth={2} />
                    <text x={204} y={58} textAnchor="middle" fontSize={26} fontWeight={700} fill={INK} fontFamily={SERIF}>(uⁿ)′ = n uⁿ⁻¹ · u′</text>
                </g>
            </svg>
        </div>
    )
}
