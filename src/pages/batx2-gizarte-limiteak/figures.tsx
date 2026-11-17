import type { LocalizedText, UnitLanguage } from '../../features/unit-v2/types'
import { LimitPlot } from '../batx2-zientziak-limiteak/figures'

/* ==========================================================================
   Limiteak eta jarraitutasuna · Batxilergoa 2 · Gizarte Zientziak — the
   lesson figures. Every one is a LimitPlot, the plane of Límites of
   2.º Ciencias (imported, not copied): curves, holes, dashed asymptotes
   and a column of notes. Formulas sit in their own <text> (left to right
   in every language); words go through <Label>. Money is written 23 € in
   Basque, Spanish and Arabic and €23 in English.
   ========================================================================== */

const INK = 'var(--ink, #1d2733)'
const STAGE = 'var(--stage, #2f6fdb)'
const SECOND = 'var(--second, #c4432a)'
const GREEN = 'var(--success, #267b53)'
const PAPER = '#fffcf6'
const SERIF = 'Fraunces, serif'

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
/** An amount of euros in each language's order */
const euros = (amount: string): LocalizedText => ({ eu: `${amount} €`, es: `${amount} €`, en: `€${amount.replace(',', '.')}`, ar: `${amount.replace(',', '.')} €` })

type Props = { language: UnitLanguage }

/* ---------- 1. Branches read on the graph ---------- */

export function BranchesFigure({ language }: Props) {
    const f = (x: number) => (2 * x) / (x - 2)
    return (
        <LimitPlot
            language={language}
            height={300}
            label={say('y = 2x/(x − 2): y = 2 zuzenera hurbiltzen da bi aldeetan, eta x = 2 inguruan behera eta gora doa', 'y = 2x/(x − 2): se acerca a y = 2 por los dos lados y junto a x = 2 baja y sube sin fin', 'y = 2x/(x − 2): يقترب من y = 2 من الجهتين، وقرب x = 2 ينزل ويصعد بلا حد', 'y = 2x/(x − 2): it approaches y = 2 on both sides, and next to x = 2 it falls and rises without end')}
            box={{ xMin: -5, xMax: 7, yMin: -4, yMax: 7 }}
            cell={22}
            curves={[{ fn: f, from: -5.5, to: 1.97 }, { fn: f, from: 2.03, to: 7.5 }]}
            verticals={[2]}
            horizontals={[2]}
            notes={[
                { y: 72, formula: 'x → −∞ :  f → 2', color: STAGE },
                { y: 112, formula: 'x → +∞ :  f → 2', color: STAGE },
                { y: 168, formula: 'x → 2⁻ :  f → −∞', color: SECOND },
                { y: 208, formula: 'x → 2⁺ :  f → +∞', color: SECOND }
            ]}
            notesX={340}
        />
    )
}

/* ---------- 4. The highest degree wins ---------- */

export function DegreesFigure({ language }: Props) {
    return (
        <LimitPlot
            language={language}
            height={250}
            label={say('y = (4x² − 3x)/(2x² + 1) hurbiltzen da y = 2 zuzenera', 'y = (4x² − 3x)/(2x² + 1) se acerca a la recta y = 2', 'y = (4x² − 3x)/(2x² + 1) يقترب من المستقيم y = 2', 'y = (4x² − 3x)/(2x² + 1) approaches the line y = 2')}
            box={{ xMin: 0, xMax: 8, yMin: -1, yMax: 3 }}
            cell={40}
            units={[2, 1]}
            labelStep={2}
            curves={[{ fn: (x) => (4 * x * x - 3 * x) / (2 * x * x + 1), from: 0, to: 16.5 }]}
            horizontals={[2]}
            notes={[
                { y: 70, formula: '(4x² − 3x)/(2x² + 1)', color: STAGE, size: 17 },
                { y: 112, formula: '≈ 4x²/2x²', color: INK },
                { y: 154, formula: 'x → +∞ :  → 2', color: STAGE, size: 21 }
            ]}
            notesX={390}
        />
    )
}

/* ---------- 5. ∞ − ∞ with a root ---------- */

export function ConjugateFigure({ language }: Props) {
    return (
        <LimitPlot
            language={language}
            height={250}
            label={say('y = √(x² + 4x) − x hurbiltzen da y = 2 zuzenera', 'y = √(x² + 4x) − x se acerca a la recta y = 2', 'y = √(x² + 4x) − x يقترب من المستقيم y = 2', 'y = √(x² + 4x) − x approaches the line y = 2')}
            box={{ xMin: 0, xMax: 8, yMin: -1, yMax: 3 }}
            cell={40}
            units={[2, 1]}
            curves={[{ fn: (x) => Math.sqrt(x * x + 4 * x) - x, from: 0, to: 16.5 }]}
            horizontals={[2]}
            notes={[
                { y: 70, formula: '√(x² + 4x) − x', color: STAGE },
                { y: 112, formula: '∞ − ∞', color: SECOND },
                { y: 154, formula: 'x → +∞ :  → 2', color: STAGE, size: 21 },
                { y: 196, text: say('konjokatuarekin', 'con el conjugado', 'بالمرافق', 'with the conjugate'), size: 17 }
            ]}
            notesX={390}
        />
    )
}

/* ---------- 6. 1^∞ and the number e ---------- */

export function NumberEFigure({ language }: Props) {
    return (
        <LimitPlot
            language={language}
            height={270}
            label={say('y = (1 + 2/x)³ˣ hurbiltzen da y = e⁶ ≈ 403 zuzenera', 'y = (1 + 2/x)³ˣ se acerca a la recta y = e⁶ ≈ 403', 'y = (1 + 2/x)³ˣ يقترب من المستقيم y = e⁶ ≈ 403', 'y = (1 + 2/x)³ˣ approaches the line y = e⁶ ≈ 403')}
            box={{ xMin: 0, xMax: 8, yMin: 0, yMax: 5 }}
            cell={40}
            units={[2, 100]}
            curves={[{ fn: (x) => Math.pow(1 + 2 / x, 3 * x), from: 0.3, to: 16.5 }]}
            horizontals={[Math.exp(6)]}
            notes={[
                { y: 70, formula: '(1 + 2/x)³ˣ', color: STAGE },
                { y: 112, formula: '1^∞', color: SECOND },
                { y: 154, formula: 'e^(3x · 2/x) = e⁶', color: STAGE },
                { y: 196, formula: 'e⁶ ≈ 403', color: INK }
            ]}
            notesX={390}
        />
    )
}

/* ---------- 7. One-sided limits of a piecewise function ---------- */

export function OneSidedFigure({ language }: Props) {
    return (
        <LimitPlot
            language={language}
            height={300}
            label={say('Zatika: x² + 1 ezkerrean eta 8 − x eskuinean; x = 2 puntuan 5 eta 6 altueratara iristen dira', 'A trozos: x² + 1 a la izquierda y 8 − x a la derecha; en x = 2 llegan a 5 y a 6', 'دالة متعددة الأجزاء: x² + 1 يسارًا و8 − x يمينًا؛ عند x = 2 تصلان إلى 5 و6', 'Piecewise: x² + 1 on the left and 8 − x on the right; at x = 2 they reach 5 and 6')}
            box={{ xMin: -2, xMax: 6, yMin: -1, yMax: 8 }}
            cell={26}
            curves={[{ fn: (x) => x * x + 1, from: -2.5, to: 2, color: STAGE }, { fn: (x) => 8 - x, from: 2, to: 6.5, color: SECOND }]}
            dots={[{ at: [2, 5], color: STAGE, hollow: true }, { at: [2, 6], color: SECOND }]}
            notes={[
                { y: 76, formula: 'x → 2⁻ :  → 5', color: STAGE },
                { y: 116, formula: 'x → 2⁺ :  → 6', color: SECOND },
                { y: 168, formula: '5 ≠ 6', color: INK, size: 21 },
                { y: 204, text: say('ez dago limiterik', 'no existe el límite', 'لا توجد نهاية', 'there is no limit'), size: 17 }
            ]}
            notesX={330}
        />
    )
}

/* ---------- 8. k/0: an infinite limit ---------- */

export function KZeroFigure({ language }: Props) {
    const f = (x: number) => (x + 1) / (x - 3)
    return (
        <LimitPlot
            language={language}
            height={300}
            label={say('y = (x + 1)/(x − 3): x = 3 ezkerrean behera eta eskuinean gora', 'y = (x + 1)/(x − 3): a la izquierda de x = 3 baja y a la derecha sube', 'y = (x + 1)/(x − 3): ينزل يسار x = 3 ويصعد يمينه', 'y = (x + 1)/(x − 3): to the left of x = 3 it falls and to the right it rises')}
            box={{ xMin: -3, xMax: 9, yMin: -5, yMax: 6 }}
            cell={22}
            curves={[{ fn: f, from: -3.5, to: 2.97 }, { fn: f, from: 3.03, to: 9.5 }]}
            verticals={[3]}
            notes={[
                { y: 72, formula: 'x → 3 :  4/0', color: INK },
                { y: 122, formula: 'x → 3⁻ :  → −∞', color: SECOND },
                { y: 162, formula: 'x → 3⁺ :  → +∞', color: STAGE },
                { y: 214, text: say('asintota bertikala', 'asíntota vertical', 'مقارب رأسي', 'vertical asymptote'), size: 17 }
            ]}
            notesX={340}
        />
    )
}

/* ---------- 9. 0/0: a hole ---------- */

export function ZeroZeroFigure({ language }: Props) {
    const f = (x: number) => (x + 3) / (x + 1)
    return (
        <LimitPlot
            language={language}
            height={290}
            label={say('y = (x + 3)/(x + 1): zuloa (1, 2) puntuan', 'y = (x + 3)/(x + 1): un agujero en (1, 2)', 'y = (x + 3)/(x + 1): ثقب عند (1, 2)', 'y = (x + 3)/(x + 1): a hole at (1, 2)')}
            box={{ xMin: -5, xMax: 5, yMin: -3, yMax: 6 }}
            cell={26}
            curves={[{ fn: f, from: -5.5, to: -1.04 }, { fn: f, from: -0.96, to: 5.5 }]}
            dots={[{ at: [1, 2], hollow: true }]}
            verticals={[-1]}
            notes={[
                { y: 76, formula: 'x → 1 :  0/0', color: SECOND },
                { y: 116, formula: '(x + 3)/(x + 1)', color: STAGE },
                { y: 156, formula: '→ 4/2 = 2', color: STAGE, size: 21 },
                { y: 200, text: say('zuloa', 'agujero', 'ثقب', 'hole'), color: STAGE, size: 17 }
            ]}
            notesX={360}
        />
    )
}

/* ---------- 10. The three conditions ---------- */

export function ContinuousFigure({ language }: Props) {
    return (
        <LimitPlot
            language={language}
            height={290}
            label={say('2x + 1 eta x² + 2 zatiak (1, 3) puntuan elkartzen dira: jarraitua', 'Los trozos 2x + 1 y x² + 2 se unen en (1, 3): continua', 'يلتقي الجزآن 2x + 1 وx² + 2 عند (1, 3): متصلة', 'The pieces 2x + 1 and x² + 2 meet at (1, 3): continuous')}
            box={{ xMin: -3, xMax: 4, yMin: -3, yMax: 7 }}
            cell={24}
            curves={[{ fn: (x) => 2 * x + 1, from: -3.5, to: 1, color: STAGE }, { fn: (x) => x * x + 2, from: 1, to: 4.5, color: SECOND }]}
            dots={[{ at: [1, 3], color: INK }]}
            notes={[
                { y: 72, formula: 'f(1) = 3', color: INK },
                { y: 112, formula: 'x → 1⁻ :  → 3', color: STAGE },
                { y: 152, formula: 'x → 1⁺ :  → 3', color: SECOND },
                { y: 200, text: say('jarraitua', 'continua', 'متصلة', 'continuous'), color: GREEN, size: 18 }
            ]}
            notesX={300}
        />
    )
}

/* ---------- 11. Kinds of discontinuity ---------- */

export function DiscontinuitiesFigure({ language }: Props) {
    const f = (x: number) => (x + 2) / x
    return (
        <LimitPlot
            language={language}
            height={300}
            label={say('y = (x + 2)/x: etenune saihesgarria x = 2 puntuan eta jauzi infinitua x = 0 puntuan', 'y = (x + 2)/x: discontinuidad evitable en x = 2 y salto infinito en x = 0', 'y = (x + 2)/x: انقطاع قابل للإزالة عند x = 2 وقفزة لانهائية عند x = 0', 'y = (x + 2)/x: a removable discontinuity at x = 2 and an infinite jump at x = 0')}
            box={{ xMin: -4, xMax: 5, yMin: -4, yMax: 6 }}
            cell={25}
            curves={[{ fn: f, from: -4.5, to: -0.05 }, { fn: f, from: 0.05, to: 5.5 }]}
            dots={[{ at: [2, 2], hollow: true }]}
            verticals={[0]}
            notes={[
                { y: 76, formula: 'x = 2', color: STAGE, size: 21 },
                { y: 108, text: say('saihesgarria: limitea 2', 'evitable: límite 2', 'قابل للإزالة: النهاية 2', 'removable: limit 2'), color: STAGE, size: 17 },
                { y: 170, formula: 'x = 0', color: SECOND, size: 21 },
                { y: 202, text: say('jauzi infinitua', 'salto infinito', 'قفزة لانهائية', 'infinite jump'), color: SECOND, size: 17 }
            ]}
            notesX={330}
        />
    )
}

/* ---------- 12. A parameter closes the joint ---------- */

export function ParameterFigure({ language }: Props) {
    return (
        <LimitPlot
            language={language}
            height={290}
            label={say('a = 1 denean, x² + 1 eta 3x − 1 zatiak (2, 5) puntuan elkartzen dira', 'Con a = 1, los trozos x² + 1 y 3x − 1 se unen en (2, 5)', 'مع a = 1 يلتقي الجزآن x² + 1 و3x − 1 عند (2, 5)', 'With a = 1, the pieces x² + 1 and 3x − 1 meet at (2, 5)')}
            box={{ xMin: -2, xMax: 5, yMin: -1, yMax: 9 }}
            cell={24}
            curves={[{ fn: (x) => x * x + 1, from: -2.5, to: 2, color: STAGE }, { fn: (x) => 3 * x - 1, from: 2, to: 5.5, color: SECOND }]}
            dots={[{ at: [2, 5], color: INK }]}
            notes={[
                { y: 72, formula: '4 + a = 5', color: INK },
                { y: 112, formula: 'a = 1', color: STAGE, size: 22 },
                { y: 160, text: say('bi zatiak 5 altueran', 'los dos trozos, a la altura 5', 'الجزآن على الارتفاع 5', 'both pieces at height 5'), size: 17 }
            ]}
            notesX={300}
        />
    )
}

/* ---------- 13. In the long run: a population that levels off ---------- */

export function LongRunFigure({ language }: Props) {
    return (
        <LimitPlot
            language={language}
            height={290}
            label={say('P(t) = (20t + 6)/(t + 2) milaka biztanle: 3 milarekin hasten da eta 20 milara hurbiltzen da', 'P(t) = (20t + 6)/(t + 2) miles de habitantes: empieza en 3 mil y se acerca a 20 mil', 'P(t) = (20t + 6)/(t + 2) آلاف السكان: يبدأ من 3 آلاف ويقترب من 20 ألفًا', 'P(t) = (20t + 6)/(t + 2) thousand inhabitants: it starts at 3 thousand and approaches 20 thousand')}
            box={{ xMin: 0, xMax: 8, yMin: 0, yMax: 6 }}
            cell={36}
            units={[5, 5]}
            labelStep={2}
            curves={[{ fn: (t) => (20 * t + 6) / (t + 2), from: 0, to: 41, color: GREEN }]}
            dots={[{ at: [0, 3], color: INK }]}
            horizontals={[20]}
            notes={[
                { y: 72, formula: 'P(0) = 3', color: INK },
                { y: 112, formula: 't → +∞ :  P → 20', color: GREEN },
                { y: 160, text: say('milaka biztanle', 'miles de habitantes', 'آلاف السكان', 'thousand inhabitants'), size: 16 },
                { y: 196, text: say('t: urteak', 't: años', 't: السنوات', 't: years'), size: 16 }
            ]}
            notesX={350}
        />
    )
}

/* ---------- 14. A water tariff with a jump ---------- */

export function BracketsFigure({ language }: Props) {
    return (
        <LimitPlot
            language={language}
            height={300}
            label={say('Ur-tarifa: 10 m³ arte 2x, eta gero 1,5x + 8; 10 puntuan 20 eurotik 23 eurora jauzi egiten du', 'Tarifa de agua: hasta 10 m³, 2x, y después 1,5x + 8; en 10 salta de 20 € a 23 €', 'تعرفة الماء: حتى 10 m³ ‏2x ثم 1.5x + 8؛ عند 10 تقفز من 20 € إلى 23 €', 'Water tariff: up to 10 m³, 2x, and then 1.5x + 8; at 10 it jumps from €20 to €23')}
            box={{ xMin: 0, xMax: 8, yMin: 0, yMax: 8 }}
            cell={28}
            units={[2.5, 5]}
            labelStep={2}
            curves={[{ fn: (x) => 2 * x, from: 0, to: 10, color: STAGE }, { fn: (x) => 1.5 * x + 8, from: 10, to: 20.5, color: SECOND }]}
            dots={[{ at: [10, 20], color: STAGE }, { at: [10, 23], color: SECOND, hollow: true }]}
            notes={[
                { y: 72, formula: 'x = 10 m³', color: INK },
                { y: 112, text: euros('20'), color: STAGE, size: 19 },
                { y: 152, text: euros('23'), color: SECOND, size: 19 },
                { y: 200, text: say('jauzia: 3 €', 'salto: 3 €', 'قفزة: 3 €', 'jump: €3'), size: 17 }
            ]}
            notesX={320}
        />
    )
}

/* ---------- 15. The tariff with no jump ---------- */

export function FairTariffFigure({ language }: Props) {
    return (
        <LimitPlot
            language={language}
            height={300}
            label={say('b = 5 denean, 2x eta 1,5x + 5 zatiak (10, 20) puntuan elkartzen dira: ez dago jauzirik', 'Con b = 5, los trozos 2x y 1,5x + 5 se unen en (10, 20): no hay salto', 'مع b = 5 يلتقي الجزآن 2x و1.5x + 5 عند (10, 20): لا قفزة', 'With b = 5, the pieces 2x and 1.5x + 5 meet at (10, 20): no jump')}
            box={{ xMin: 0, xMax: 8, yMin: 0, yMax: 8 }}
            cell={28}
            units={[2.5, 5]}
            labelStep={2}
            curves={[{ fn: (x) => 2 * x, from: 0, to: 10, color: STAGE }, { fn: (x) => 1.5 * x + 5, from: 10, to: 20.5, color: GREEN }]}
            dots={[{ at: [10, 20], color: INK }]}
            notes={[
                { y: 72, formula: '2 · 10 = 1,5 · 10 + b', color: INK, size: 17 },
                { y: 112, formula: 'b = 5', color: GREEN, size: 22 },
                { y: 160, text: say('ez dago jauzirik', 'no hay salto', 'لا توجد قفزة', 'no jump'), color: GREEN, size: 17 }
            ]}
            notesX={320}
        />
    )
}

/* ---------- The cover ---------- */

export function Bach2gLimitsHeroArt() {
    return (
        <div className="fraction-v2-collage" aria-hidden="true">
            <svg viewBox="0 0 520 400" direction="ltr" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                <g transform="translate(22 26) rotate(-4)">
                    <rect width={272} height={214} rx={16} fill={PAPER} stroke={INK} strokeWidth={2} />
                    <line x1={20} y1={180} x2={256} y2={180} stroke={INK} strokeWidth={2} />
                    <line x1={40} y1={198} x2={40} y2={16} stroke={INK} strokeWidth={2} />
                    <line x1={40} y1={62} x2={256} y2={62} stroke={INK} strokeWidth={2} strokeDasharray="7 5" />
                    <path d="M42 176 C 70 90, 120 72, 250 66" fill="none" stroke="#267b53" strokeWidth={4} strokeLinecap="round" />
                    <text x={200} y={50} fontSize={20} fontWeight={700} fill={INK} fontFamily={SERIF}>P → 20</text>
                </g>
                <g transform="translate(318 44) rotate(5)">
                    <rect width={180} height={124} rx={16} fill="#f3d98b" stroke={INK} strokeWidth={2} />
                    <text x={90} y={58} textAnchor="middle" fontSize={26} fontWeight={700} fill={INK} fontFamily={SERIF}>C(x)/x</text>
                    <text x={90} y={98} textAnchor="middle" fontSize={20} fontWeight={700} fill={INK} fontFamily={SERIF}>x → +∞</text>
                </g>
                <g transform="translate(56 274) rotate(2)">
                    <rect width={408} height={90} rx={16} fill="#f6d8cf" stroke={INK} strokeWidth={2} />
                    <path d="M28 70 L 150 34" stroke="#2f6fdb" strokeWidth={4} strokeLinecap="round" />
                    <circle cx={150} cy={34} r={6} fill="#2f6fdb" />
                    <circle cx={150} cy={22} r={6} fill={PAPER} stroke="#c4432a" strokeWidth={3} />
                    <path d="M156 21 L 260 6" stroke="#c4432a" strokeWidth={4} strokeLinecap="round" />
                    <text x={330} y={58} textAnchor="middle" fontSize={26} fontWeight={700} fill={INK} fontFamily={SERIF}>a ⇒ ✓</text>
                </g>
            </svg>
        </div>
    )
}
