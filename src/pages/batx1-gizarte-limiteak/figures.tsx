import type { LocalizedText, UnitLanguage } from '../../features/unit-v2/types'
import { PlotFigure } from '../batx1-zientziak-limiteak/figures'

/* ==========================================================================
   Limiteak eta jarraitutasuna · Batxilergoa 1 · Gizarte Zientziak — the
   lesson figures. Each one is a plane drawn with the PlotFigure of the
   Ciencias twin (curves, holes, dashed asymptotes and a column of notes),
   with this unit's own functions. Formulas sit in their own <text> (left
   to right in every language); words go through <Label>. English and
   Arabic write the decimal point.
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

/** A decimal written with the comma in Basque and Spanish and with the point in English and Arabic */
const decimal = (language: UnitLanguage, text: string) => (language === 'en' || language === 'ar' ? text.replace(/(\d),(\d)/g, '$1.$2') : text)

/* ---------- 1. In the long run: U(t) = 8t/(t + 2) ---------- */

export function LongRunFigure({ language }: { language: UnitLanguage }) {
    const d = (text: string) => decimal(language, text)
    return (
        <PlotFigure
            language={language}
            height={318}
            label={say('U(t) = 8t/(t + 2) 8 baliora hurbiltzen da t handitzean', 'U(t) = 8t/(t + 2) se acerca a 8 al crecer t', 'U(t) = 8t/(t + 2) تقترب من 8 عندما يكبر t', 'U(t) = 8t/(t + 2) approaches 8 as t grows')}
            box={{ xMin: 0, xMax: 12, yMin: 0, yMax: 10 }}
            cell={25}
            units={[10, 1]}
            curves={[{ fn: (t) => (8 * t) / (t + 2), from: 0, to: 125 }]}
            horizontals={[8]}
            dots={[{ at: [10, 80 / 12] }, { at: [100, 800 / 102] }]}
            notes={[
                { y: 70, formula: d('U(10) ≈ 6,67'), color: MUTED, size: 18 },
                { y: 106, formula: d('U(100) ≈ 7,84'), color: MUTED, size: 18 },
                { y: 152, formula: 't → +∞ :  U(t) → 8', color: STAGE, size: 21 },
                { y: 200, text: say('Hurbildu bai, iritsi ez', 'Se acerca, sin llegar', 'تقترب دون أن تبلغ', 'It gets close, without arriving'), size: 16 }
            ]}
            notesX={380}
        />
    )
}

/* ---------- 2. A polynomial and an exponential: x³ − 6x² and 2ˣ ---------- */

export function PolyExpFigure({ language }: { language: UnitLanguage }) {
    return (
        <PlotFigure
            language={language}
            height={348}
            label={say('x³ − 6x² eta 2ˣ: biak +∞ aldera, baina esponentzialak irabazten du', 'x³ − 6x² y 2ˣ: las dos van a +∞, pero gana la exponencial', 'x³ − 6x² و2ˣ: كلتاهما إلى +∞ لكن الأسية تفوز', 'x³ − 6x² and 2ˣ: both go to +∞, but the exponential wins')}
            box={{ xMin: 0, xMax: 10, yMin: -2, yMax: 8 }}
            cell={27}
            units={[1, 100]}
            ox={58}
            oy={36}
            curves={[{ fn: (x) => x ** 3 - 6 * x * x, from: 0, to: 10.5, color: SECOND }, { fn: (x) => 2 ** x, from: 0, to: 10.5, color: GREEN }]}
            dots={[{ at: [4, -32], color: SECOND }, { at: [10, 400], color: SECOND }]}
            notes={[
                { y: 74, formula: 'f(x) = x³ − 6x²', color: SECOND },
                { y: 108, formula: 'f(4) = −32    f(10) = 400', color: SECOND, size: 17 },
                { y: 156, formula: 'g(x) = 2ˣ', color: GREEN },
                { y: 190, formula: 'g(10) = 1024', color: GREEN, size: 17 },
                { y: 240, text: say('Esponentzialak irabazten du', 'Gana la exponencial', 'الأسية تفوز', 'The exponential wins'), size: 16 }
            ]}
            notesX={370}
        />
    )
}

/* ---------- 3. Quotients at infinity: the degrees ---------- */

export function DegreesFigure({ language }: { language: UnitLanguage }) {
    return (
        <PlotFigure
            language={language}
            height={300}
            label={say('(2x² + 1)/(x² + 3) 2 baliora doa, eta 5x/(x² + 1) 0 baliora', '(2x² + 1)/(x² + 3) va a 2 y 5x/(x² + 1) va a 0', '(2x² + 1)/(x² + 3) تتجه إلى 2 و5x/(x² + 1) إلى 0', '(2x² + 1)/(x² + 3) goes to 2 and 5x/(x² + 1) goes to 0')}
            box={{ xMin: 0, xMax: 12, yMin: -1, yMax: 6 }}
            cell={27}
            units={[1, 0.5]}
            oy={36}
            curves={[{ fn: (x) => (2 * x * x + 1) / (x * x + 3), from: 0, to: 12.5 }, { fn: (x) => (5 * x) / (x * x + 1), from: 0, to: 12.5, color: SECOND }]}
            horizontals={[2]}
            notes={[
                { y: 74, formula: '(2x² + 1)/(x² + 3) → 2', color: STAGE, size: 18 },
                { y: 110, text: say('maila bera: 2/1', 'mismo grado: 2/1', 'الدرجة نفسها: 2/1', 'same degree: 2/1'), color: STAGE, size: 16 },
                { y: 160, formula: '5x/(x² + 1) → 0', color: SECOND, size: 18 },
                { y: 196, text: say('behean maila handiagoa', 'más grado abajo', 'درجة المقام أكبر', 'higher degree below'), color: SECOND, size: 16 }
            ]}
            notesX={392}
        />
    )
}

/* ---------- 4. Towards −∞: 2ˣ and 3x²/(x² + 1) ---------- */

export function MinusInfinityFigure({ language }: { language: UnitLanguage }) {
    return (
        <PlotFigure
            language={language}
            height={300}
            label={say('Ezkerrean, 2ˣ 0 baliora hurbiltzen da, eta 3x²/(x² + 1) 3 baliora', 'A la izquierda, 2ˣ se acerca a 0 y 3x²/(x² + 1), a 3', 'إلى اليسار تقترب 2ˣ من 0 و3x²/(x² + 1) من 3', 'On the left, 2ˣ approaches 0 and 3x²/(x² + 1) approaches 3')}
            box={{ xMin: -10, xMax: 2, yMin: -1, yMax: 5 }}
            cell={27}
            oy={36}
            curves={[{ fn: (x) => 2 ** x, from: -10.5, to: 2.2, color: GREEN }, { fn: (x) => (3 * x * x) / (x * x + 1), from: -10.5, to: 2.5 }]}
            horizontals={[3]}
            notes={[
                { y: 74, formula: 'x → −∞', color: INK, size: 21 },
                { y: 120, formula: '2ˣ → 0', color: GREEN },
                { y: 160, formula: '3x²/(x² + 1) → 3', color: STAGE, size: 18 },
                { y: 210, text: say('Aldatu x, −x jarrita', 'Cambia x por −x', 'استبدل x بـ −x', 'Swap x for −x'), size: 16 }
            ]}
            notesX={392}
        />
    )
}

/* ---------- 5. Roots at infinity ---------- */

export function RootsInfinityFigure({ language }: { language: UnitLanguage }) {
    return (
        <PlotFigure
            language={language}
            height={300}
            label={say('√(9x² + 4)/(x + 1) 3 baliora hurbiltzen da, eta √x/(x + 5) 0 baliora', '√(9x² + 4)/(x + 1) se acerca a 3 y √x/(x + 5), a 0', '√(9x² + 4)/(x + 1) تقترب من 3 و√x/(x + 5) من 0', '√(9x² + 4)/(x + 1) approaches 3 and √x/(x + 5) approaches 0')}
            box={{ xMin: 0, xMax: 12, yMin: -1, yMax: 5 }}
            cell={27}
            units={[2, 1]}
            oy={36}
            curves={[{ fn: (x) => Math.sqrt(9 * x * x + 4) / (x + 1), from: 0, to: 25 }, { fn: (x) => Math.sqrt(x) / (x + 5), from: 0, to: 25, color: SECOND }]}
            horizontals={[3]}
            notes={[
                { y: 74, formula: '√(9x² + 4) ≈ 3x', color: MUSTARD, size: 18 },
                { y: 112, formula: '3x/x → 3', color: STAGE },
                { y: 164, formula: '√x/(x + 5) → 0', color: SECOND, size: 18 },
                { y: 200, text: say('√x: maila 1/2', '√x: grado 1/2', '√x: الدرجة 1/2', '√x: degree 1/2'), color: SECOND, size: 16 }
            ]}
            notesX={392}
        />
    )
}

/* ---------- 6. A fish farm that levels off ---------- */

export function FishFarmFigure({ language }: { language: UnitLanguage }) {
    return (
        <PlotFigure
            language={language}
            height={300}
            label={say('P(t) = (3000t + 500)/(t + 1): 500 arrainetik 3000 arrainera hurbiltzen da', 'P(t) = (3000t + 500)/(t + 1): de 500 peces se acerca a 3000', 'P(t) = (3000t + 500)/(t + 1): من 500 سمكة تقترب من 3000', 'P(t) = (3000t + 500)/(t + 1): from 500 fish it approaches 3000')}
            box={{ xMin: 0, xMax: 12, yMin: 0, yMax: 7 }}
            cell={27}
            units={[2, 500]}
            ox={52}
            oy={36}
            curves={[{ fn: (t) => (3000 * t + 500) / (t + 1), from: 0, to: 25, color: GREEN }]}
            horizontals={[3000]}
            dots={[{ at: [0, 500], color: GREEN }, { at: [9, 2750], color: GREEN }]}
            notes={[
                { y: 74, formula: 'P(0) = 500', color: GREEN },
                { y: 112, formula: 'P(9) = 2750', color: GREEN },
                { y: 160, formula: 't → +∞ :  P → 3000', color: STAGE, size: 18 },
                { y: 206, text: say('Biztanleria egonkortzen da', 'La población se estabiliza', 'يستقر عدد الأسماك', 'The population levels off'), size: 16 }
            ]}
            notesX={408}
        />
    )
}

/* ---------- 7. One-sided limits: a jump at x = 2 ---------- */

export function JumpFigure({ language }: { language: UnitLanguage }) {
    return (
        <PlotFigure
            language={language}
            height={318}
            label={say('Ezkerretik 3 baliora eta eskuinetik 5 baliora: jauzia x = 2 puntuan', 'Por la izquierda a 3 y por la derecha a 5: salto en x = 2', 'من اليسار إلى 3 ومن اليمين إلى 5: قفزة عند x = 2', 'From the left to 3 and from the right to 5: a jump at x = 2')}
            box={{ xMin: -2, xMax: 5, yMin: -2, yMax: 8 }}
            cell={26}
            curves={[{ fn: (x) => x * x - 1, from: -2.3, to: 2, color: SECOND }, { fn: (x) => x + 3, from: 2, to: 5.5, color: GREEN }]}
            dots={[{ at: [2, 3], color: SECOND, hollow: true }, { at: [2, 5], color: GREEN }]}
            notes={[
                { y: 80, formula: 'x → 2⁻ :  x² − 1 → 3', color: SECOND },
                { y: 124, formula: 'x → 2⁺ :  x + 3 → 5', color: GREEN },
                { y: 180, text: say('Ez datoz bat:', 'No coinciden:', 'لا تتساويان:', 'They do not match:'), size: 17 },
                { y: 210, text: say('ez dago limiterik', 'no hay límite', 'لا توجد نهاية', 'there is no limit'), size: 17 }
            ]}
            notesX={300}
        />
    )
}

/* ---------- 8. An infinite limit: 2/(x + 1) ---------- */

export function InfiniteFigure({ language }: { language: UnitLanguage }) {
    return (
        <PlotFigure
            language={language}
            height={344}
            label={say('y = 2/(x + 1) eta asintota bertikala x = −1', 'y = 2/(x + 1) y la asíntota vertical x = −1', 'y = 2/(x + 1) والمقارب الرأسي x = −1', 'y = 2/(x + 1) and the vertical asymptote x = −1')}
            box={{ xMin: -5, xMax: 3, yMin: -6, yMax: 6 }}
            cell={24}
            oy={36}
            curves={[{ fn: (x) => 2 / (x + 1), from: -5.5, to: -1.02 }, { fn: (x) => 2 / (x + 1), from: -0.98, to: 3.5 }]}
            verticals={[-1]}
            notes={[
                { y: 80, formula: 'x → −1⁺ :  +∞', color: STAGE },
                { y: 124, formula: 'x → −1⁻ :  −∞', color: SECOND },
                { y: 180, formula: 'x = −1', color: MUTED, size: 22 },
                { y: 212, text: say('asintota bertikala', 'asíntota vertical', 'مقارب رأسي', 'vertical asymptote'), color: MUTED, size: 17 }
            ]}
            notesX={300}
        />
    )
}

/* ---------- 9. The hole of 0/0 ---------- */

export function ZeroHoleFigure({ language }: { language: UnitLanguage }) {
    return (
        <PlotFigure
            language={language}
            height={318}
            label={say('(x² + x − 6)/(x − 2) = x + 3, zuloa (2, 5) puntuan', '(x² + x − 6)/(x − 2) = x + 3, con un agujero en (2, 5)', '(x² + x − 6)/(x − 2) = x + 3 مع ثقب عند (2, 5)', '(x² + x − 6)/(x − 2) = x + 3, with a hole at (2, 5)')}
            box={{ xMin: -1, xMax: 5, yMin: -1, yMax: 8 }}
            cell={28}
            curves={[{ fn: (x) => x + 3, from: -1.5, to: 5.5 }]}
            dots={[{ at: [2, 5], hollow: true }]}
            notes={[
                { y: 70, formula: 'x = 2 :  0/0', color: SECOND },
                { y: 116, formula: '(x − 2)(x + 3)/(x − 2)', size: 18 },
                { y: 150, formula: '= x + 3 → 5', color: STAGE, size: 18 },
                { y: 200, text: say('Zuloa (2, 5) puntuan', 'Agujero en (2, 5)', 'ثقب عند (2, 5)', 'Hole at (2, 5)'), color: MUTED, size: 17 }
            ]}
            notesX={300}
        />
    )
}

/* ---------- 10. Continuity: the pieces join at (1, 2) ---------- */

export function JoinFigure({ language }: { language: UnitLanguage }) {
    return (
        <PlotFigure
            language={language}
            height={318}
            label={say('x² + 1 eta 3x − 1 zatiak (1, 2) puntuan lotzen dira', 'Los trozos x² + 1 y 3x − 1 se unen en (1, 2)', 'الجزآن x² + 1 و3x − 1 يلتقيان عند (1, 2)', 'The pieces x² + 1 and 3x − 1 join at (1, 2)')}
            box={{ xMin: -2, xMax: 4, yMin: -1, yMax: 9 }}
            cell={26}
            curves={[{ fn: (x) => x * x + 1, from: -2.3, to: 1, color: SECOND }, { fn: (x) => 3 * x - 1, from: 1, to: 4.5, color: GREEN }]}
            dots={[{ at: [1, 2], color: INK }]}
            notes={[
                { y: 70, formula: 'f(1) = 1² + 1 = 2', color: SECOND },
                { y: 112, formula: 'x → 1⁺ :  3x − 1 → 2', color: GREEN },
                { y: 164, text: say('Jauzirik eta zulorik gabe', 'Sin saltos ni agujeros', 'دون قفزات ولا ثقوب', 'No jumps or holes'), color: INK, size: 17 }
            ]}
            notesX={300}
        />
    )
}

/* ---------- 11. A tariff that does not jump ---------- */

export function TariffFigure({ language }: { language: UnitLanguage }) {
    const d = (text: string) => decimal(language, text)
    return (
        <PlotFigure
            language={language}
            height={318}
            label={say('2x eta 1,5x + 5 zatiak (10, 20) puntuan lotzen dira: prezioak ez du jauzirik egiten', 'Los trozos 2x y 1,5x + 5 se unen en (10, 20): el precio no salta', 'الجزآن 2x و1.5x + 5 يلتقيان عند (10, 20): السعر لا يقفز', 'The pieces 2x and 1.5x + 5 join at (10, 20): the price does not jump')}
            box={{ xMin: 0, xMax: 10, yMin: 0, yMax: 8 }}
            cell={28}
            units={[2, 5]}
            curves={[{ fn: (x) => 2 * x, from: 0, to: 10, color: SECOND }, { fn: (x) => 1.5 * x + 5, from: 10, to: 21, color: GREEN }, { fn: (x) => 1.5 * x, from: 10, to: 21, color: MUTED, dashed: true, width: 2.4 }]}
            dots={[{ at: [10, 20], color: INK }]}
            notes={[
                { y: 70, formula: 'x → 10⁻ :  2x → 20', color: SECOND, size: 18 },
                { y: 108, formula: d('x → 10⁺ :  1,5x + k → 15 + k'), color: GREEN, size: 18 },
                { y: 154, formula: '15 + k = 20  →  k = 5', color: STAGE, size: 19 },
                { y: 204, text: say('k = 0 bada, jauzia', 'Con k = 0, salto', 'مع k = 0 قفزة', 'With k = 0, a jump'), color: MUTED, size: 16 }
            ]}
            notesX={340}
        />
    )
}

/* ---------- 12. Vertical and horizontal asymptotes, and the position ---------- */

export function HorizontalFigure({ language }: { language: UnitLanguage }) {
    return (
        <PlotFigure
            language={language}
            height={330}
            label={say('y = (3x − 2)/(x + 1): asintotak x = −1 eta y = 3', 'y = (3x − 2)/(x + 1): asíntotas x = −1 e y = 3', 'y = (3x − 2)/(x + 1): المقاربان x = −1 وy = 3', 'y = (3x − 2)/(x + 1): asymptotes x = −1 and y = 3')}
            box={{ xMin: -8, xMax: 6, yMin: -4, yMax: 10 }}
            cell={20}
            oy={36}
            curves={[{ fn: (x) => (3 * x - 2) / (x + 1), from: -8.5, to: -1.02 }, { fn: (x) => (3 * x - 2) / (x + 1), from: -0.98, to: 6.5 }]}
            verticals={[-1]}
            horizontals={[3]}
            notes={[
                { y: 74, formula: 'x = −1', color: MUTED },
                { y: 108, formula: 'y = 3', color: MUTED },
                { y: 154, formula: 'f(x) − 3 = −5/(x + 1)', color: STAGE, size: 18 },
                { y: 196, text: say('x > −1: azpitik', 'x > −1: por debajo', 'x > −1: تحت', 'x > −1: below'), color: SECOND },
                { y: 228, text: say('x < −1: gainetik', 'x < −1: por encima', 'x < −1: فوق', 'x < −1: above'), color: GREEN }
            ]}
        />
    )
}

/* ---------- 13. The oblique asymptote ---------- */

export function SlantFigure({ language }: { language: UnitLanguage }) {
    return (
        <PlotFigure
            language={language}
            height={330}
            label={say('y = (x² + x − 1)/(x − 1) eta haren asintota zeiharra y = x + 2', 'y = (x² + x − 1)/(x − 1) y su asíntota oblicua y = x + 2', 'y = (x² + x − 1)/(x − 1) ومقاربها المائل y = x + 2', 'y = (x² + x − 1)/(x − 1) and its oblique asymptote y = x + 2')}
            box={{ xMin: -5, xMax: 7, yMin: -5, yMax: 11 }}
            cell={18}
            oy={36}
            curves={[{ fn: (x) => (x * x + x - 1) / (x - 1), from: -5.5, to: 0.97 }, { fn: (x) => (x * x + x - 1) / (x - 1), from: 1.03, to: 7.5 }]}
            verticals={[1]}
            obliques={[[1, 2]]}
            notes={[
                { y: 74, formula: '(x² + x − 1)/(x − 1)', color: STAGE },
                { y: 112, formula: '= x + 2 + 1/(x − 1)', color: STAGE, size: 18 },
                { y: 160, formula: 'y = x + 2', color: MUTED, size: 22 },
                { y: 200, formula: 'x = 1', color: MUTED, size: 22 }
            ]}
            notesX={300}
        />
    )
}

/* ---------- 14. Parabolic branches ---------- */

export function BranchesFigure({ language }: { language: UnitLanguage }) {
    return (
        <PlotFigure
            language={language}
            height={350}
            label={say('y = (x³ + 1)/x: asintota bertikala x = 0, eta y = x² parabolaren antzeko bi adar', 'y = (x³ + 1)/x: asíntota vertical x = 0 y dos ramas que se parecen a y = x²', 'y = (x³ + 1)/x: مقارب رأسي x = 0 وفرعان يشبهان y = x²', 'y = (x³ + 1)/x: vertical asymptote x = 0 and two branches like y = x²')}
            box={{ xMin: -4, xMax: 4, yMin: -6, yMax: 10 }}
            cell={18}
            oy={36}
            curves={[{ fn: (x) => x * x, from: -4.5, to: 4.5, color: MUTED, dashed: true, width: 2.4 }, { fn: (x) => (x ** 3 + 1) / x, from: -4.5, to: -0.05 }, { fn: (x) => (x ** 3 + 1) / x, from: 0.05, to: 4.5 }]}
            verticals={[0]}
            notes={[
                { y: 74, formula: '(x³ + 1)/x = x² + 1/x', color: STAGE, size: 18 },
                { y: 120, formula: 'x → ±∞ :  f(x) → +∞', color: STAGE, size: 18 },
                { y: 168, text: say('Ez horizontala, ez zeiharra:', 'Ni horizontal ni oblicua:', 'لا أفقي ولا مائل:', 'Neither horizontal nor oblique:'), size: 16 },
                { y: 198, text: say('adar parabolikoak', 'ramas parabólicas', 'فرعان مكافئان', 'parabolic branches'), color: MUTED, size: 16 }
            ]}
            notesX={250}
        />
    )
}

/* ---------- Hero ---------- */

export function SocLimitsHeroArt() {
    return (
        <div className="fraction-v2-collage" aria-hidden="true">
            <svg viewBox="0 0 520 400" direction="ltr" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                <g transform="translate(24 30) rotate(-4)">
                    <rect width={280} height={210} rx={16} fill={PAPER} stroke={INK} strokeWidth={2} />
                    <line x1={20} y1={180} x2={265} y2={180} stroke={INK} strokeWidth={2} />
                    <line x1={30} y1={195} x2={30} y2={16} stroke={INK} strokeWidth={2} />
                    <line x1={30} y1={60} x2={265} y2={60} stroke="#58616e" strokeWidth={2} strokeDasharray="7 6" />
                    <path d="M30 170 Q 70 80 140 70 T 262 63" fill="none" stroke="#267b53" strokeWidth={4} strokeLinecap="round" />
                </g>
                <g transform="translate(320 50) rotate(5)">
                    <rect width={178} height={120} rx={16} fill="#fbeec2" stroke={INK} strokeWidth={2} />
                    <text x={89} y={74} textAnchor="middle" fontSize={28} fontWeight={700} fill={INK} fontFamily={SERIF}>t → +∞</text>
                </g>
                <g transform="translate(60 272) rotate(2)">
                    <rect width={400} height={88} rx={16} fill="#dde7f7" stroke={INK} strokeWidth={2} />
                    <text x={200} y={58} textAnchor="middle" fontSize={30} fontWeight={700} fill={INK} fontFamily={SERIF}>lim f(x) = f(a)</text>
                </g>
            </svg>
        </div>
    )
}
