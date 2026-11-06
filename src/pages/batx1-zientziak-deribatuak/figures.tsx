import type { ReactNode } from 'react'
import { pickText, type LocalizedText, type UnitLanguage } from '../../features/unit-v2/types'
import { Label } from '../dbh2-funtzioak-v2/plane'
import { Figure } from '../dbh2-zatikiak-prototype/figures'
import { PlotFigure } from '../batx1-zientziak-limiteak/figures'

/* ==========================================================================
   Deribatuak · Batxilergoa 1 · Zientziak — the lesson figures. Most are
   one plane with a curve, its secants and tangents and a column of notes
   (PlotFigure from Límites: a tangent is a straight curve); the power
   rules, the product rectangle and the chain of machines are drawings of
   their own. Formulas sit in their own <text> (left to right in every
   language); words go through <Label>, and the Arabic notes carry words
   only or formulas only. Spanish writes sen where the others write sin.
   ========================================================================== */

const INK = 'var(--ink, #1d2733)'
const MUTED = 'var(--muted, #58616e)'
const STAGE = 'var(--stage, #2f6fdb)'
const STAGE_TINT = 'var(--stage-tint, #dde7f7)'
const SECOND = 'var(--second, #c4432a)'
const GREEN = 'var(--success, #267b53)'
/** A colour of its own for a second curve, apart from every stage colour */
const VIOLET = '#7b52c7'
const PAPER = '#fffcf6'
const SERIF = 'Fraunces, serif'

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const line = (m: number, n: number) => (x: number) => m * x + n
/** sin in every language but Spanish, which writes sen */
const sine = (language: UnitLanguage) => (language === 'es' ? 'sen' : 'sin')

/** A formula written left to right whatever the language */
function F({ x, y, children, size = 19, color = INK, anchor = 'start', weight = 700 }: { x: number; y: number; children: ReactNode; size?: number; color?: string; anchor?: 'start' | 'middle' | 'end'; weight?: number }) {
    return <text x={x} y={y} textAnchor={anchor} fontSize={size} fontWeight={weight} fill={color} direction="ltr">{children}</text>
}

/* ---------- 1. The average rate: the secant of d(t) = 5t² ---------- */

export function SecantFigure({ language }: { language: UnitLanguage }) {
    return (
        <PlotFigure
            language={language}
            height={330}
            label={say('d(t) = 5t² eta (1, 5) eta (3, 45) puntuetatik pasatzen den ebakitzailea', 'd(t) = 5t² y la secante por (1, 5) y (3, 45)', 'd(t) = 5t² والقاطع المار بالنقطتين (1, 5) و(3, 45)', 'd(t) = 5t² and the secant through (1, 5) and (3, 45)')}
            box={{ xMin: -1, xMax: 4, yMin: -1, yMax: 5 }}
            cell={46}
            units={[1, 10]}
            curves={[{ fn: (t) => 5 * t * t, from: -0.6, to: 3.2 }, { fn: line(20, -15), from: 0.45, to: 3.4, color: SECOND, width: 2.6 }]}
            dots={[{ at: [1, 5], color: SECOND }, { at: [3, 45], color: SECOND }]}
            notes={[
                { y: 76, formula: 'd(1) = 5', color: MUTED, size: 18 },
                { y: 108, formula: 'd(3) = 45', color: MUTED, size: 18 },
                { y: 158, formula: '(45 − 5) / (3 − 1) = 20', color: SECOND, size: 20 },
                { y: 204, text: say('ebakitzailearen malda', 'pendiente de la secante', 'ميل القاطع', 'slope of the secant'), size: 17 },
                { y: 236, text: say('batez besteko abiadura', 'velocidad media', 'السرعة المتوسطة', 'average speed'), color: MUTED, size: 17 }
            ]}
            notesX={320}
        />
    )
}

/* ---------- 2. The derivative at a point: the secants turn into the tangent ---------- */

export function SecantsToTangentFigure({ language }: { language: UnitLanguage }) {
    return (
        <PlotFigure
            language={language}
            height={330}
            label={say('y = x² funtzioa: (1, 1) puntutik doazen ebakitzaileak zuzen ukitzailera hurbiltzen dira', 'y = x²: las secantes desde (1, 1) se acercan a la tangente', 'y = x²: القواطع من (1, 1) تقترب من المماس', 'y = x²: the secants from (1, 1) approach the tangent')}
            box={{ xMin: -1, xMax: 4, yMin: -1, yMax: 5 }}
            cell={46}
            units={[1, 2]}
            curves={[
                { fn: (x) => x * x, from: -1.2, to: 3.2 },
                { fn: line(4, -3), from: 0.2, to: 3.4, color: MUTED, width: 2, dashed: true },
                { fn: line(3, -2), from: 0, to: 3.4, color: MUTED, width: 2, dashed: true },
                { fn: line(2, -1), from: -0.5, to: 3.6, color: SECOND, width: 3 }
            ]}
            dots={[{ at: [1, 1], color: SECOND, name: 'P' }, { at: [3, 9], color: MUTED }, { at: [2, 4], color: MUTED }]}
            notes={[
                { y: 76, formula: 'h = 2  →  m = 4', color: MUTED, size: 18 },
                { y: 110, formula: 'h = 1  →  m = 3', color: MUTED, size: 18 },
                { y: 158, formula: 'h → 0  →  m = 2', color: SECOND, size: 21 },
                { y: 204, text: say('ebakitzailea biratu eta', 'la secante gira hasta', 'يدور القاطع حتى', 'the secant turns until'), size: 17 },
                { y: 232, text: say('zuzen ukitzaile bihurtzen da', 'convertirse en tangente', 'يصير مماسًّا', 'it becomes the tangent'), size: 17 },
                { y: 280, formula: 'f′(1) = 2', color: SECOND, size: 22 }
            ]}
            notesX={320}
        />
    )
}

/* ---------- 3. Tangent and normal to x² at x = 1 ---------- */

export function TangentNormalFigure({ language }: { language: UnitLanguage }) {
    return (
        <PlotFigure
            language={language}
            height={300}
            label={say('y = x² funtzioaren zuzen ukitzailea eta normala (1, 1) puntuan', 'Tangente y normal a y = x² en (1, 1)', 'المماس والعمودي على y = x² عند (1, 1)', 'Tangent and normal to y = x² at (1, 1)')}
            box={{ xMin: -2, xMax: 4, yMin: -1, yMax: 5 }}
            cell={40}
            curves={[
                { fn: (x) => x * x, from: -2.3, to: 2.3 },
                { fn: line(2, -1), from: -0.5, to: 3.1, color: SECOND, width: 3 },
                { fn: line(-0.5, 1.5), from: -2.5, to: 4.5, color: GREEN, width: 3 }
            ]}
            dots={[{ at: [1, 1], color: INK }]}
            notes={[
                { y: 74, text: say('Zuzen ukitzailea', 'Tangente', 'المماس', 'Tangent'), color: SECOND, size: 17 },
                { y: 106, formula: 'y = 2x − 1', color: SECOND, size: 21 },
                { y: 158, text: say('Normala', 'Normal', 'العمودي', 'Normal'), color: GREEN, size: 17 },
                { y: 190, formula: 'y = −x/2 + 3/2', color: GREEN, size: 21 },
                { y: 244, formula: '2 · (−1/2) = −1', color: MUTED, size: 18 }
            ]}
            notesX={320}
        />
    )
}

/* ---------- 4. One-sided derivatives: the corner of |x − 2| ---------- */

export function CornerFigure({ language }: { language: UnitLanguage }) {
    return (
        <PlotFigure
            language={language}
            height={262}
            label={say('y = |x − 2|: ezkerretik −1 malda eta eskuinetik 1, punta bat x = 2 puntuan', 'y = |x − 2|: pendiente −1 por la izquierda y 1 por la derecha, pico en x = 2', 'y = |x − 2|: الميل −1 من اليسار و1 من اليمين، زاوية عند x = 2', 'y = |x − 2|: slope −1 from the left and 1 from the right, a corner at x = 2')}
            box={{ xMin: -1, xMax: 5, yMin: -1, yMax: 4 }}
            cell={40}
            curves={[{ fn: (x) => 2 - x, from: -1.3, to: 2, color: SECOND }, { fn: (x) => x - 2, from: 2, to: 5.3, color: GREEN }]}
            dots={[{ at: [2, 0], color: INK }]}
            notes={[
                { y: 74, formula: 'f′(2⁻) = −1', color: SECOND, size: 21 },
                { y: 118, formula: 'f′(2⁺) = 1', color: GREEN, size: 21 },
                { y: 172, text: say('Desberdinak: punta bat,', 'Distintas: hay un pico', 'مختلفتان: توجد زاوية', 'Different: a corner,'), size: 17 },
                { y: 202, text: say('ez da deribagarria', 'y no es derivable', 'وليست قابلة للاشتقاق', 'not differentiable'), size: 17 }
            ]}
            notesX={330}
        />
    )
}

/* ---------- 5. Same slopes, but a jump: no derivative ---------- */

export function JumpSlopesFigure({ language }: { language: UnitLanguage }) {
    return (
        <PlotFigure
            language={language}
            height={330}
            label={say('x + 1 eta x + 3 zatiak: malda bera, baina jauzi bat x = 1 puntuan', 'Los trozos x + 1 y x + 3: misma pendiente, pero un salto en x = 1', 'الجزآن x + 1 و x + 3: الميل نفسه لكن توجد قفزة عند x = 1', 'The pieces x + 1 and x + 3: the same slope, but a jump at x = 1')}
            box={{ xMin: -2, xMax: 4, yMin: -1, yMax: 7 }}
            cell={34}
            curves={[{ fn: (x) => x + 1, from: -2.3, to: 1, color: SECOND }, { fn: (x) => x + 3, from: 1, to: 4.3, color: GREEN }]}
            dots={[{ at: [1, 2], color: SECOND, hollow: true }, { at: [1, 4], color: GREEN }]}
            notes={[
                { y: 80, text: say('Malda bera bi zatietan,', 'La misma pendiente,', 'الميل نفسه في الجزأين', 'The same slope on both,'), size: 17 },
                { y: 110, text: say('baina jauzi egiten du', 'pero da un salto', 'لكنها تقفز', 'but it jumps'), size: 17 },
                { y: 170, formula: '2 ≠ 4', color: SECOND, size: 22 },
                { y: 226, text: say('Jarraitutasunik gabe,', 'Sin continuidad,', 'دون اتصال', 'Without continuity,'), color: MUTED, size: 17 },
                { y: 256, text: say('ez dago deribaturik', 'no hay derivada', 'لا توجد مشتقة', 'there is no derivative'), color: MUTED, size: 17 }
            ]}
            notesX={300}
        />
    )
}

/* ---------- 6. A smooth join: x² + 1 and 2x at x = 1 ---------- */

export function SmoothJoinFigure({ language }: { language: UnitLanguage }) {
    return (
        <PlotFigure
            language={language}
            height={330}
            label={say('x² + 1 eta 2x zatiak (1, 2) puntuan elkartzen dira, malda berarekin', 'Los trozos x² + 1 y 2x se unen en (1, 2) con la misma pendiente', 'الجزآن x² + 1 و 2x يلتقيان عند (1, 2) بالميل نفسه', 'The pieces x² + 1 and 2x meet at (1, 2) with the same slope')}
            box={{ xMin: -2, xMax: 3, yMin: -1, yMax: 6 }}
            cell={38}
            curves={[{ fn: (x) => x * x + 1, from: -2.3, to: 1 }, { fn: (x) => 2 * x, from: 1, to: 3.3, color: GREEN }]}
            dots={[{ at: [1, 2], color: INK }]}
            notes={[
                { y: 80, text: say('Elkartzen dira:', 'Se unen:', 'يلتقيان:', 'They meet:'), size: 17 },
                { y: 112, formula: '1 + a = b', size: 21 },
                { y: 166, text: say('Malda bera:', 'Misma pendiente:', 'الميل نفسه:', 'Same slope:'), size: 17 },
                { y: 198, formula: '2 · 1 = b', size: 21 },
                { y: 256, formula: 'a = 1\u00a0\u00a0\u00a0\u00a0b = 2', color: GREEN, size: 22 }
            ]}
            notesX={300}
        />
    )
}

/* ---------- 7. The derivative function: f and f′ on the same plane ---------- */

export function DerivativeGraphFigure({ language }: { language: UnitLanguage }) {
    return (
        <PlotFigure
            language={language}
            height={330}
            label={say('f(x) = x² + 3x eta haren deribatua f′(x) = 2x + 3', 'f(x) = x² + 3x y su derivada f′(x) = 2x + 3', 'f(x) = x² + 3x ومشتقتها f′(x) = 2x + 3', 'f(x) = x² + 3x and its derivative f′(x) = 2x + 3')}
            box={{ xMin: -5, xMax: 2, yMin: -4, yMax: 5 }}
            cell={30}
            curves={[{ fn: (x) => x * x + 3 * x, from: -5.3, to: 2.3 }, { fn: (x) => 2 * x + 3, from: -5.3, to: 2.3, color: SECOND, dashed: true }]}
            dots={[{ at: [-1.5, -2.25], color: STAGE }, { at: [-1.5, 0], color: SECOND }]}
            notes={[
                { y: 76, formula: 'f(x) = x² + 3x', color: STAGE, size: 20 },
                { y: 112, formula: 'f′(x) = 2x + 3', color: SECOND, size: 20 },
                { y: 170, text: say('f′ funtzioak f funtzioaren', 'f′ da la pendiente de f', 'تعطي f′ ميل f', 'f′ gives the slope of f'), size: 17 },
                { y: 198, text: say('malda ematen du x bakoitzean', 'en cada x', 'عند كل x', 'at each x'), size: 17 },
                { y: 252, formula: 'f′(−1,5) = 0', color: SECOND, size: 20 }
            ].map((note) => (language === 'en' || language === 'ar') && note.formula ? { ...note, formula: note.formula.replace(/,/g, '.') } : note)}
            notesX={290}
        />
    )
}

/* ---------- 8. The power rule and its cases ---------- */

export function PowerRulesFigure({ language }: { language: UnitLanguage }) {
    const t = (text: LocalizedText) => pickText(language, text)
    const up = (text: string) => <tspan dy={-10} fontSize="66%">{text}</tspan>
    const down = <tspan dy={10}> </tspan>
    const rows: Array<[string, ReactNode, ReactNode, string]> = [
        ['power', <>x{up('n')}</>, <>n · x{up('n − 1')}</>, ''],
        ['root', <>√x = x{up('1/2')}{down}</>, '1 / (2√x)', '1/2 − 1 = −1/2'],
        ['inverse', <>1/x = x{up('−1')}{down}</>, '−1 / x²', '−1 − 1 = −2']
    ]
    return (
        <Figure height={300} label={t(say('Berreturaren erregela erroekin eta zatikiekin', 'La regla de la potencia con raíces y fracciones', 'قاعدة القوة مع الجذور والكسور', 'The power rule with roots and fractions'))}>
            <Label x={190} y={40} textAnchor="middle" fontSize={18} fontWeight={700} fill={MUTED}>{t(say('Funtzioa', 'Función', 'الدالة', 'Function'))}</Label>
            <Label x={530} y={40} textAnchor="middle" fontSize={18} fontWeight={700} fill={MUTED}>{t(say('Deribatua', 'Derivada', 'المشتقة', 'Derivative'))}</Label>
            {rows.map(([key, fn, derivative, note], index) => {
                const y = 56 + index * 72
                return (
                    <g key={key}>
                        <rect x={40} y={y} width={300} height={60} rx={14} fill={index === 0 ? STAGE_TINT : PAPER} stroke={INK} strokeWidth={2} />
                        <F x={190} y={y + 39} anchor="middle" size={24}>{fn}</F>
                        <text x={360} y={y + 39} textAnchor="middle" fontSize={26} fill={SECOND}>→</text>
                        <rect x={380} y={y} width={300} height={60} rx={14} fill={index === 0 ? STAGE_TINT : PAPER} stroke={SECOND} strokeWidth={2} />
                        <F x={530} y={y + (note ? 30 : 39)} anchor="middle" size={24} color={SECOND}>{derivative}</F>
                        {note && <F x={530} y={y + 52} anchor="middle" size={14} color={MUTED} weight={400}>{note}</F>}
                    </g>
                )
            })}
            <Label x={360} y={288} textAnchor="middle" fontSize={17} fill={MUTED}>{t(say('Berretzailea jaisten da, eta bat kentzen zaio', 'El exponente baja y se le resta uno', 'ينزل الأس ويُطرح منه واحد', 'The exponent comes down and loses one'))}</Label>
        </Figure>
    )
}

/* ---------- 9. A constant moves the graph but not its slope ---------- */

export function SameSlopeFigure({ language }: { language: UnitLanguage }) {
    return (
        <PlotFigure
            language={language}
            height={312}
            label={say('y = x²/2 eta y = x²/2 + 2: zuzen ukitzaile paraleloak x = 1 puntuan', 'y = x²/2 e y = x²/2 + 2: tangentes paralelas en x = 1', 'y = x²/2 و y = x²/2 + 2: مماسان متوازيان عند x = 1', 'y = x²/2 and y = x²/2 + 2: parallel tangents at x = 1')}
            box={{ xMin: -3, xMax: 3, yMin: -1, yMax: 6 }}
            cell={36}
            curves={[
                { fn: (x) => (x * x) / 2, from: -3.3, to: 3.3 },
                { fn: (x) => (x * x) / 2 + 2, from: -3.3, to: 3.3, color: GREEN },
                { fn: line(1, -0.5), from: -0.6, to: 2.6, color: SECOND, width: 2.4 },
                { fn: line(1, 1.5), from: -0.6, to: 2.6, color: SECOND, width: 2.4 }
            ]}
            dots={[{ at: [1, 0.5], color: SECOND }, { at: [1, 2.5], color: SECOND }]}
            notes={[
                { y: 80, formula: 'f(x) = x²/2', color: STAGE, size: 20 },
                { y: 114, formula: 'g(x) = x²/2 + 2', color: GREEN, size: 20 },
                { y: 170, text: say('Malda bera x bakoitzean', 'La misma pendiente en cada x', 'الميل نفسه عند كل x', 'The same slope at each x'), size: 17 },
                { y: 226, formula: 'f′(x) = g′(x) = x', color: SECOND, size: 21 }
            ]}
            notesX={300}
        />
    )
}

/* ---------- 10. The product rule: the rectangle f × g grows two strips ---------- */

export function ProductAreaFigure({ language }: { language: UnitLanguage }) {
    const t = (text: LocalizedText) => pickText(language, text)
    return (
        <Figure height={300} label={t(say('f eta g aldeetako laukizuzena: hazten denean, bi zerrenda eta izkina txiki bat irabazten ditu', 'Rectángulo de lados f y g: al crecer gana dos tiras y una esquina pequeña', 'مستطيل ضلعاه f و g: عندما يكبر يربح شريطين وزاوية صغيرة', 'A rectangle with sides f and g: as it grows it gains two strips and a small corner'))}>
            <rect x={70} y={70} width={240} height={170} fill={STAGE_TINT} stroke={INK} strokeWidth={2} />
            <F x={190} y={162} anchor="middle" size={24}>f · g</F>
            <rect x={310} y={70} width={44} height={170} fill="#f6d8cf" stroke={SECOND} strokeWidth={2} />
            <F x={332} y={162} anchor="middle" size={15} color={SECOND}>Δf·g</F>
            <rect x={70} y={38} width={240} height={32} fill="#d9efe2" stroke={GREEN} strokeWidth={2} />
            <F x={190} y={60} anchor="middle" size={15} color={GREEN}>f·Δg</F>
            <rect x={310} y={38} width={44} height={32} fill={PAPER} stroke={MUTED} strokeWidth={1.6} strokeDasharray="4 3" />
            <F x={190} y={266} anchor="middle" size={20}>f</F>
            <F x={332} y={266} anchor="middle" size={17} color={SECOND}>Δf</F>
            <F x={50} y={162} anchor="middle" size={20}>g</F>
            <F x={44} y={60} anchor="middle" size={17} color={GREEN}>Δg</F>
            <F x={540} y={124} anchor="middle" size={22} color={INK}>(f·g)′ = f′·g + f·g′</F>
            <Label x={540} y={176} textAnchor="middle" fontSize={17} fill={MUTED}>{t(say('Bi zerrendak, gorria eta berdea', 'Las dos tiras, roja y verde', 'الشريطان الأحمر والأخضر', 'The two strips, red and green'))}</Label>
            <Label x={540} y={206} textAnchor="middle" fontSize={17} fill={MUTED}>{t(say('Izkinak ez du kontatzen', 'La esquina no cuenta', 'الزاوية لا تُحسب', 'The corner does not count'))}</Label>
        </Figure>
    )
}

/* ---------- 11. The quotient rule: (2x + 1)/(x − 3) and its tangent at x = 4 ---------- */

export function QuotientTangentFigure({ language }: { language: UnitLanguage }) {
    return (
        <PlotFigure
            language={language}
            height={268}
            label={say('y = (2x + 1)/(x − 3) eta haren zuzen ukitzailea (4, 9) puntuan, −7 maldarekin', 'y = (2x + 1)/(x − 3) y su tangente en (4, 9), de pendiente −7', 'y = (2x + 1)/(x − 3) ومماسها عند (4, 9) بميل −7', 'y = (2x + 1)/(x − 3) and its tangent at (4, 9), with slope −7')}
            box={{ xMin: -2, xMax: 9, yMin: -3, yMax: 6 }}
            cell={22}
            units={[1, 2]}
            curves={[
                { fn: (x) => (2 * x + 1) / (x - 3), from: -2.5, to: 2.95 },
                { fn: (x) => (2 * x + 1) / (x - 3), from: 3.05, to: 9.5 },
                { fn: line(-7, 37), from: 3.55, to: 4.9, color: GREEN, width: 3 }
            ]}
            verticals={[3]}
            horizontals={[2]}
            dots={[{ at: [4, 9], color: GREEN }]}
            notes={[
                { y: 76, formula: 'f′(x) = −7 / (x − 3)²', color: GREEN, size: 19 },
                { y: 124, formula: 'f′(4) = −7', color: GREEN, size: 21 },
                { y: 176, text: say('Zuzen ukitzailea (4, 9) puntuan', 'Tangente en (4, 9)', 'المماس عند (4, 9)', 'Tangent at (4, 9)'), size: 17 },
                { y: 208, formula: 'y = −7x + 37', size: 19 }
            ]}
            notesX={320}
        />
    )
}

/* ---------- 12. The chain rule: two machines, two slopes multiplied ---------- */

export function ChainFigure({ language }: { language: UnitLanguage }) {
    const t = (text: LocalizedText) => pickText(language, text)
    const box = (x: number, fill: string, stroke: string, top: string, bottom: string, name: LocalizedText) => (
        <g>
            <rect x={x} y={52} width={200} height={96} rx={16} fill={fill} stroke={stroke} strokeWidth={2.4} />
            <Label x={x + 100} y={80} textAnchor="middle" fontSize={15} fill={MUTED}>{t(name)}</Label>
            <F x={x + 100} y={118} anchor="middle" size={24}>{top}</F>
            <F x={x + 100} y={186} anchor="middle" size={21} color={stroke}>{bottom}</F>
        </g>
    )
    return (
        <Figure height={290} label={t(say('Bi makinaren katea: barrukoa x² + 3 eta kanpokoa u⁵; maldak biderkatzen dira', 'Cadena de dos máquinas: dentro x² + 3 y fuera u⁵; las pendientes se multiplican', 'سلسلة من آلتين: الداخلية x² + 3 والخارجية u⁵؛ تُضرب الميول', 'A chain of two machines: inside x² + 3 and outside u⁵; the slopes multiply'))}>
            <F x={40} y={110} anchor="middle" size={24}>x</F>
            <text x={78} y={110} textAnchor="middle" fontSize={24} fill={INK}>→</text>
            {box(100, '#d9efe2', GREEN, 'u = x² + 3', 'u′ = 2x', say('Barrukoa', 'Dentro', 'الداخلية', 'Inside'))}
            <text x={330} y={110} textAnchor="middle" fontSize={24} fill={INK}>→</text>
            {box(360, STAGE_TINT, STAGE, 'y = u⁵', '5u⁴', say('Kanpokoa', 'Fuera', 'الخارجية', 'Outside'))}
            <text x={590} y={110} textAnchor="middle" fontSize={24} fill={INK}>→</text>
            <F x={640} y={110} anchor="middle" size={24}>y</F>
            <rect x={110} y={214} width={500} height={56} rx={14} fill={PAPER} stroke={SECOND} strokeWidth={2.4} />
            <F x={360} y={250} anchor="middle" size={22} color={SECOND}>y′ = 5(x² + 3)⁴ · 2x</F>
        </Figure>
    )
}

/* ---------- 13. eˣ and ln x, mirror images, with slope 1 where they cross the axes ---------- */

export function ExpTangentFigure({ language }: { language: UnitLanguage }) {
    return (
        <PlotFigure
            language={language}
            height={304}
            label={say('y = eˣ eta y = ln x, y = x zuzenarekiko simetrikoak; 1 maldako zuzen ukitzaileak (0, 1) eta (1, 0) puntuetan', 'y = eˣ e y = ln x, simétricas respecto de y = x; tangentes de pendiente 1 en (0, 1) y (1, 0)', 'y = eˣ و y = ln x متناظرتان بالنسبة إلى y = x؛ مماسان ميلهما 1 عند (0, 1) و(1, 0)', 'y = eˣ and y = ln x, symmetric about y = x; tangents of slope 1 at (0, 1) and (1, 0)')}
            box={{ xMin: -3, xMax: 4, yMin: -2, yMax: 5 }}
            cell={34}
            curves={[
                { fn: (x) => Math.exp(x), from: -3.3, to: 1.65 },
                { fn: (x) => Math.log(x), from: 0.02, to: 4.3, color: VIOLET },
                { fn: line(1, 1), from: -2.6, to: 2, color: SECOND, width: 2.4 },
                { fn: line(1, -1), from: -0.6, to: 4, color: SECOND, width: 2.4 }
            ]}
            obliques={[[1, 0]]}
            dots={[{ at: [0, 1], color: SECOND }, { at: [1, 0], color: SECOND }]}
            notes={[
                { y: 80, formula: '(eˣ)′ = eˣ', color: STAGE, size: 21 },
                { y: 116, formula: 'x = 0  →  m = 1', color: SECOND, size: 18 },
                { y: 176, formula: '(ln x)′ = 1/x', color: VIOLET, size: 21 },
                { y: 212, formula: 'x = 1  →  m = 1', color: SECOND, size: 18 }
            ]}
            notesX={330}
        />
    )
}

/* ---------- 14. The slope of sin x is cos x ---------- */

export function SinCosFigure({ language }: { language: UnitLanguage }) {
    const sin = sine(language)
    return (
        <PlotFigure
            language={language}
            height={250}
            label={say('y = sin x eta haren deribatua y = cos x, marratuan', 'y = sen x y su derivada y = cos x, a trazos', 'y = sin x ومشتقتها y = cos x بخط متقطع', 'y = sin x and its derivative y = cos x, dashed')}
            box={{ xMin: -4, xMax: 4, yMin: -3, yMax: 3 }}
            cell={28}
            units={[1, 0.5]}
            curves={[
                { fn: Math.sin, from: -4.3, to: 4.3 },
                { fn: Math.cos, from: -4.3, to: 4.3, color: MUTED, dashed: true },
                { fn: line(1, 0), from: -1, to: 1, color: SECOND, width: 2.6 },
                { fn: line(0, 1), from: Math.PI / 2 - 0.8, to: Math.PI / 2 + 0.8, color: SECOND, width: 2.6 }
            ]}
            labels={false}
            dots={[{ at: [0, 0], color: SECOND }, { at: [Math.PI / 2, 1], color: SECOND }]}
            notes={[
                { y: 70, formula: `(${sin} x)′ = cos x`, color: STAGE, size: 20 },
                { y: 106, formula: `(cos x)′ = −${sin} x`, color: MUTED, size: 20 },
                { y: 156, formula: 'x = 0  →  m = 1', color: SECOND, size: 18 },
                { y: 190, formula: 'x = π/2  →  m = 0', color: SECOND, size: 18 }
            ]}
            notesX={300}
        />
    )
}

/* ---------- 15. A tangent parallel to y = 2x + 5 ---------- */

export function ParallelTangentFigure({ language }: { language: UnitLanguage }) {
    return (
        <PlotFigure
            language={language}
            height={330}
            label={say('y = x² − 4x + 1 eta haren zuzen ukitzailea (3, −2) puntuan, y = 2x + 5 zuzenaren paraleloa', 'y = x² − 4x + 1 y su tangente en (3, −2), paralela a y = 2x + 5', 'y = x² − 4x + 1 ومماسها عند (3, −2) الموازي لـ y = 2x + 5', 'y = x² − 4x + 1 and its tangent at (3, −2), parallel to y = 2x + 5')}
            box={{ xMin: -1, xMax: 6, yMin: -4, yMax: 6 }}
            cell={27}
            curves={[
                { fn: (x) => x * x - 4 * x + 1, from: -1.3, to: 5.3 },
                { fn: line(2, 5), from: -1.3, to: 0.6, color: MUTED, width: 2.4, dashed: true },
                { fn: line(2, -8), from: 1.8, to: 5.6, color: SECOND, width: 3 }
            ]}
            dots={[{ at: [3, -2], color: SECOND }]}
            notes={[
                { y: 78, formula: 'y = 2x + 5', color: MUTED, size: 19 },
                { y: 112, text: say('malda 2', 'pendiente 2', 'الميل 2', 'slope 2'), color: MUTED, size: 17 },
                { y: 166, formula: 'f′(x) = 2x − 4 = 2', size: 19 },
                { y: 200, formula: 'x = 3', size: 19 },
                { y: 254, formula: 'y = 2x − 8', color: SECOND, size: 22 }
            ]}
            notesX={290}
        />
    )
}

/* ---------- The unit's cover ---------- */

export function BachDerivativesHeroArt() {
    return (
        <div className="fraction-v2-collage" aria-hidden="true">
            <svg viewBox="0 0 520 400" direction="ltr" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                <g transform="translate(24 28) rotate(-4)">
                    <rect width={270} height={210} rx={16} fill={PAPER} stroke={INK} strokeWidth={2} />
                    <line x1={20} y1={180} x2={255} y2={180} stroke={INK} strokeWidth={2} />
                    <line x1={40} y1={195} x2={40} y2={16} stroke={INK} strokeWidth={2} />
                    <path d="M44 170 Q 130 160 250 30" fill="none" stroke="#2f6fdb" strokeWidth={4} strokeLinecap="round" />
                    <line x1={80} y1={176} x2={250} y2={66} stroke="#c4432a" strokeWidth={3.4} strokeLinecap="round" />
                    <circle cx={160} cy={124} r={7} fill="#c4432a" />
                </g>
                <g transform="translate(316 52) rotate(5)">
                    <rect width={180} height={120} rx={16} fill="#d9efe2" stroke={INK} strokeWidth={2} />
                    <text x={90} y={74} textAnchor="middle" fontSize={34} fontWeight={700} fill={INK} fontFamily={SERIF}>f′(a)</text>
                </g>
                <g transform="translate(60 272) rotate(2)">
                    <rect width={400} height={88} rx={16} fill="#f6d8cf" stroke={INK} strokeWidth={2} />
                    <text x={200} y={58} textAnchor="middle" fontSize={28} fontWeight={700} fill={INK} fontFamily={SERIF}>(f·g)′ = f′g + fg′</text>
                </g>
            </svg>
        </div>
    )
}
