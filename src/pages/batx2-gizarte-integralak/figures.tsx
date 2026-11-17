import type { UnitLanguage } from '../../features/unit-v2/types'
import { BLUE, GREEN, INK, MUTED, PAPER, RED, SERIF, STAGE, VIOLET, say } from '../batx2-zientziak-mugagabeak/figureKit'
import { AreaPlot } from '../batx2-zientziak-mugagabeak/plot'

/* ==========================================================================
   Integralak · Batxilergoa 2 · Gizarte Zientziak — the lesson figures, all
   drawn with AreaPlot of Integral mugagabeak 2.º Ciencias (imported):
   families of antiderivatives, filled areas above and below the axis,
   rectangles, the region between two curves and the money that piles up
   under a marginal curve. Each plot's height is the box height plus a
   margin, so nothing is cut; the notes carry no decimal commas.
   ========================================================================== */

type Props = { language: UnitLanguage }

/* ---------- 1. Antiderivatives ---------- */

export function PrimitiveFigure({ language }: Props) {
    return (
        <AreaPlot
            language={language}
            height={290}
            label={say('y = x³ + 2x + C kurbak, C = −2, 0 eta 2 balioekin: gora eta behera mugituta daude, malda bera dute', 'Las curvas y = x³ + 2x + C con C = −2, 0 y 2: desplazadas arriba y abajo, con la misma pendiente', 'المنحنيات y = x³ + 2x + C مع C = −2 و0 و2: مزاحة إلى الأعلى والأسفل بالميل نفسه', 'The curves y = x³ + 2x + C with C = −2, 0 and 2: shifted up and down, with the same slope')}
            box={{ xMin: -2, xMax: 2, yMin: -4, yMax: 4 }}
            cell={32}
            curves={[{ fn: (x) => x ** 3 + 2 * x - 2, from: -2.2, to: 2.2, color: MUTED, width: 2.4 }, { fn: (x) => x ** 3 + 2 * x, from: -2.2, to: 2.2, color: STAGE }, { fn: (x) => x ** 3 + 2 * x + 2, from: -2.2, to: 2.2, color: MUTED, width: 2.4 }]}
            notes={[
                { y: 72, formula: "F' = 3x² + 2", color: INK },
                { y: 116, formula: 'x³ + 2x + C', color: STAGE, size: 21 },
                { y: 160, formula: 'C = −2, 0, 2', color: MUTED, size: 17 }
            ]}
            notesX={230}
        />
    )
}

export function PowersFigure({ language }: Props) {
    return (
        <AreaPlot
            language={language}
            height={260}
            label={say('y = 6x² − 4x + 5 eta haren jatorrizko bat, y = 2x³ − 2x² + 5x', 'y = 6x² − 4x + 5 y una primitiva suya, y = 2x³ − 2x² + 5x', 'y = 6x² − 4x + 5 ودالة أصلية لها y = 2x³ − 2x² + 5x', 'y = 6x² − 4x + 5 and one of its antiderivatives, y = 2x³ − 2x² + 5x')}
            box={{ xMin: -1, xMax: 2, yMin: -2, yMax: 5 }}
            cell={32}
            units={[1, 4]}
            curves={[{ fn: (x) => 6 * x * x - 4 * x + 5, from: -1.2, to: 2.2, color: VIOLET }, { fn: (x) => 2 * x ** 3 - 2 * x * x + 5 * x, from: -1.2, to: 2.2 }]}
            notes={[
                { y: 72, formula: 'xⁿ → xⁿ⁺¹ / (n + 1)', color: INK, size: 17 },
                { y: 116, formula: '6x² → 2x³', color: STAGE },
                { y: 152, formula: '−4x → −2x²', color: STAGE }
            ]}
            notesX={200}
        />
    )
}

export function ExpLogFigure({ language }: Props) {
    return (
        <AreaPlot
            language={language}
            height={260}
            label={say('y = 1/x eta haren jatorrizkoa y = ln x, x > 0 denean', 'y = 1/x y su primitiva y = ln x para x > 0', 'y = 1/x ودالتها الأصلية y = ln x عندما x > 0', 'y = 1/x and its antiderivative y = ln x for x > 0')}
            box={{ xMin: 0, xMax: 4, yMin: -2, yMax: 4 }}
            cell={36}
            curves={[{ fn: (x) => 1 / x, from: 0.26, to: 4.2, color: VIOLET }, { fn: (x) => Math.log(x), from: 0.14, to: 4.2 }]}
            notes={[
                { y: 72, formula: '∫ 1/x dx = ln|x|', color: STAGE },
                { y: 116, formula: '∫ eˣ dx = eˣ', color: INK },
                { y: 160, formula: 'n = −1', color: RED, size: 17 }
            ]}
            notesX={200}
        />
    )
}

/* ---------- 2. Compound immediate integrals ---------- */

export function PowerChainFigure({ language }: Props) {
    return (
        <AreaPlot
            language={language}
            height={260}
            label={say('y = 2x(x² + 1)³ eta haren jatorrizkoa y = (x² + 1)⁴/4', 'y = 2x(x² + 1)³ y su primitiva y = (x² + 1)⁴/4', 'y = 2x(x² + 1)³ ودالتها الأصلية y = (x² + 1)⁴/4', 'y = 2x(x² + 1)³ and its antiderivative y = (x² + 1)⁴/4')}
            box={{ xMin: -1, xMax: 1, yMin: -2, yMax: 5 }}
            cell={32}
            units={[1, 4]}
            curves={[{ fn: (x) => 2 * x * (x * x + 1) ** 3, from: -1.1, to: 1.1, color: VIOLET }, { fn: (x) => (x * x + 1) ** 4 / 4, from: -1.1, to: 1.1 }]}
            notes={[
                { y: 72, formula: 'u = x² + 1', color: INK },
                { y: 108, formula: "u' = 2x", color: INK },
                { y: 152, formula: 'u⁴ / 4 + C', color: STAGE, size: 21 }
            ]}
            notesX={140}
        />
    )
}

export function LogExpChainFigure({ language }: Props) {
    return (
        <AreaPlot
            language={language}
            height={260}
            label={say('y = 2x/(x² + 5) eta haren jatorrizkoa y = ln(x² + 5)', 'y = 2x/(x² + 5) y su primitiva y = ln(x² + 5)', 'y = 2x/(x² + 5) ودالتها الأصلية y = ln(x² + 5)', 'y = 2x/(x² + 5) and its antiderivative y = ln(x² + 5)')}
            box={{ xMin: -4, xMax: 4, yMin: -1, yMax: 4 }}
            cell={28}
            curves={[{ fn: (x) => (2 * x) / (x * x + 5), from: -4.2, to: 4.2, color: VIOLET }, { fn: (x) => Math.log(x * x + 5), from: -4.2, to: 4.2 }]}
            notes={[
                { y: 72, formula: "u'/u → ln|u|", color: STAGE },
                { y: 116, formula: "u'·eᵘ → eᵘ", color: INK }
            ]}
            notesX={290}
        />
    )
}

export function ConditionFigure({ language }: Props) {
    return (
        <AreaPlot
            language={language}
            height={290}
            label={say('y = x² + 3x + C familia; (1, 6) puntutik igarotzen dena C = 2 da', 'La familia y = x² + 3x + C; la que pasa por (1, 6) es C = 2', 'العائلة y = x² + 3x + C؛ والتي تمر بـ (1, 6) هي C = 2', 'The family y = x² + 3x + C; the one through (1, 6) is C = 2')}
            box={{ xMin: -4, xMax: 2, yMin: -3, yMax: 5 }}
            cell={30}
            units={[1, 2]}
            curves={[{ fn: (x) => x * x + 3 * x - 2, from: -4.2, to: 2.2, color: MUTED, width: 2.4 }, { fn: (x) => x * x + 3 * x + 6, from: -4.2, to: 2.2, color: MUTED, width: 2.4 }, { fn: (x) => x * x + 3 * x + 2, from: -4.2, to: 2.2 }]}
            dots={[{ at: [1, 6], color: RED }]}
            notes={[
                { y: 72, formula: 'F(1) = 6', color: RED },
                { y: 112, formula: '4 + C = 6', color: INK },
                { y: 156, formula: 'C = 2', color: STAGE, size: 21 }
            ]}
            notesX={250}
        />
    )
}

/* ---------- 3. The definite integral ---------- */

export function RectanglesFigure({ language }: Props) {
    const f = (x: number) => x * x
    return (
        <AreaPlot
            language={language}
            height={260}
            label={say('y = x² kurbaren azpiko azalera [0, 2] tartean, eskuineko altuera duten 4 laukizuzenekin', 'El área bajo y = x² en [0, 2] con 4 rectángulos de altura por la derecha', 'المساحة تحت y = x² على [0, 2] بأربعة مستطيلات بارتفاع الطرف الأيمن', 'The area under y = x² on [0, 2] with 4 rectangles of right-hand height')}
            box={{ xMin: 0, xMax: 3, yMin: -1, yMax: 5 }}
            cell={36}
            labelStep={1}
            curves={[{ fn: f, from: 0, to: 2.25 }]}
            bars={[0, 0.5, 1, 1.5].map((x) => ({ x, width: 0.5, height: f(x + 0.5), color: BLUE }))}
            notes={[
                { y: 72, formula: '4 × 1/2', color: INK },
                { y: 116, formula: '≈ 15/4', color: BLUE, size: 21 },
                { y: 160, formula: '∫₀² x² dx = 8/3', color: STAGE, size: 17 }
            ]}
            notesX={200}
        />
    )
}

export function BarrowFigure({ language }: Props) {
    const f = (x: number) => 2 * x + 1
    return (
        <AreaPlot
            language={language}
            height={290}
            label={say('y = 2x + 1 zuzenaren azpiko azalera 1 eta 3 artean: 10', 'El área bajo y = 2x + 1 entre 1 y 3: 10', 'المساحة تحت y = 2x + 1 بين 1 و3: 10', 'The area under y = 2x + 1 between 1 and 3: 10')}
            box={{ xMin: 0, xMax: 4, yMin: -1, yMax: 8 }}
            cell={28}
            labelStep={1}
            curves={[{ fn: f, from: 0, to: 3.6 }]}
            fills={[{ fn: f, from: 1, to: 3, color: BLUE }]}
            verticals={[1, 3]}
            notes={[
                { y: 72, formula: 'F = x² + x', color: INK },
                { y: 116, formula: 'F(3) − F(1)', color: INK },
                { y: 160, formula: '12 − 2 = 10', color: STAGE, size: 21 }
            ]}
            notesX={180}
        />
    )
}

export function PropertiesFigure({ language }: Props) {
    const f = (x: number) => 1 + x - x * x / 6
    return (
        <AreaPlot
            language={language}
            height={240}
            label={say('[0, 4] tarteko azalera bi zatitan: [0, 2] eta [2, 4]; integralak batu egiten dira', 'El área en [0, 4] en dos trozos: [0, 2] y [2, 4]; las integrales se suman', 'المساحة على [0, 4] جزءان: [0, 2] و[2, 4]؛ تُجمع التكاملات', 'The area on [0, 4] in two pieces: [0, 2] and [2, 4]; the integrals add up')}
            box={{ xMin: 0, xMax: 5, yMin: -1, yMax: 5 }}
            cell={30}
            labelStep={1}
            curves={[{ fn: f, from: 0, to: 4.6 }]}
            fills={[{ fn: f, from: 0, to: 2, color: BLUE }, { fn: f, from: 2, to: 4, color: VIOLET }]}
            verticals={[2, 4]}
            notes={[
                { y: 72, formula: '5 + 3 = 8', color: STAGE, size: 21 },
                { y: 116, formula: '∫₄⁰ = −8', color: RED }
            ]}
            notesX={210}
        />
    )
}

/* ---------- 4. Areas ---------- */

export function AreaAxisFigure({ language }: Props) {
    const f = (x: number) => -x * x + 4 * x
    return (
        <AreaPlot
            language={language}
            height={260}
            label={say('y = −x² + 4x kurbak eta X ardatzak mugatutako azalera: 32/3', 'El área limitada por y = −x² + 4x y el eje X: 32/3', 'المساحة المحصورة بين y = −x² + 4x ومحور X: 32/3', 'The area enclosed by y = −x² + 4x and the X axis: 32/3')}
            box={{ xMin: -1, xMax: 5, yMin: -1, yMax: 5 }}
            cell={32}
            labelStep={1}
            curves={[{ fn: f, from: -0.5, to: 4.5 }]}
            fills={[{ fn: f, from: 0, to: 4, color: BLUE }]}
            notes={[
                { y: 72, formula: 'x = 0, x = 4', color: INK },
                { y: 116, formula: 'A = 32/3', color: STAGE, size: 21 }
            ]}
            notesX={240}
        />
    )
}

export function AreaSignFigure({ language }: Props) {
    const f = (x: number) => x * x - 1
    return (
        <AreaPlot
            language={language}
            height={260}
            label={say('y = x² − 1 ardatzaren azpian 0 eta 1 artean (gorria) eta gainean 1 eta 2 artean (urdina); azalera 2', 'y = x² − 1 bajo el eje entre 0 y 1 (rojo) y encima entre 1 y 2 (azul); el área es 2', 'y = x² − 1 تحت المحور بين 0 و1 (أحمر) وفوقه بين 1 و2 (أزرق)؛ والمساحة 2', 'y = x² − 1 below the axis between 0 and 1 (red) and above it between 1 and 2 (blue); the area is 2')}
            box={{ xMin: -1, xMax: 3, yMin: -2, yMax: 4 }}
            cell={34}
            labelStep={1}
            curves={[{ fn: f, from: -0.8, to: 2.3 }]}
            fills={[{ fn: f, from: 0, to: 1, color: RED }, { fn: f, from: 1, to: 2, color: BLUE }]}
            marks={[{ at: [0.5, -0.5], text: '−', color: RED, size: 26 }, { at: [1.75, 1.1], text: '+', color: BLUE, size: 22 }]}
            notes={[
                { y: 72, formula: '−2/3', color: RED },
                { y: 108, formula: '4/3', color: BLUE },
                { y: 152, formula: '2/3 + 4/3 = 2', color: STAGE, size: 21 }
            ]}
            notesX={200}
        />
    )
}

export function BetweenFigure({ language }: Props) {
    return (
        <AreaPlot
            language={language}
            height={240}
            label={say('y = x eta y = x² kurben arteko azalera 0 eta 1 artean: 1/6', 'El área entre y = x e y = x² de 0 a 1: 1/6', 'المساحة بين y = x وy = x² من 0 إلى 1: 1/6', 'The area between y = x and y = x² from 0 to 1: 1/6')}
            box={{ xMin: -1, xMax: 2, yMin: -1, yMax: 2 }}
            cell={60}
            labelStep={1}
            curves={[{ fn: (x) => x, from: -0.6, to: 1.6, color: VIOLET }, { fn: (x) => x * x, from: -0.6, to: 1.4 }]}
            fills={[{ fn: (x) => x, base: (x) => x * x, from: 0, to: 1, color: GREEN }]}
            notes={[
                { y: 72, formula: 'x − x²', color: INK },
                { y: 116, formula: '1/2 − 1/3', color: INK },
                { y: 160, formula: 'A = 1/6', color: STAGE, size: 21 }
            ]}
            notesX={250}
        />
    )
}

/* ---------- 5. In economics ---------- */

export function CostFigure({ language }: Props) {
    return (
        <AreaPlot
            language={language}
            height={260}
            label={say("C'(x) = 2x + 10 eta haren azpiko azalera 0 eta 20 artean: 600 euro, kostu finkoari (200) gehitzen zaizkionak", "C'(x) = 2x + 10 y el área bajo ella de 0 a 20: 600 €, que se suman al coste fijo (200)", "C'(x) = 2x + 10 والمساحة تحتها من 0 إلى 20: 600 € تُضاف إلى التكلفة الثابتة (200)", "C'(x) = 2x + 10 and the area under it from 0 to 20: €600, added to the fixed cost (200)")}
            box={{ xMin: 0, xMax: 5, yMin: -1, yMax: 6 }}
            cell={30}
            units={[5, 10]}
            ox={48}
            curves={[{ fn: (x) => 2 * x + 10, from: 0, to: 24, color: GREEN }]}
            fills={[{ fn: (x) => 2 * x + 10, from: 0, to: 20, color: GREEN }]}
            notes={[
                { y: 72, formula: "∫₀²⁰ C' dx = 600", color: GREEN, size: 17 },
                { y: 116, formula: '+ 200', color: INK },
                { y: 160, formula: 'C(20) = 800', color: STAGE, size: 21 }
            ]}
            notesX={220}
        />
    )
}

export function AccumulatedFigure({ language }: Props) {
    return (
        <AreaPlot
            language={language}
            height={260}
            label={say('v(t) = 3t² + 2 salmenta-erritmoa eta haren azpiko azalera 0 eta 4 artean: 72 mila produktu', 'El ritmo de ventas v(t) = 3t² + 2 y el área bajo él de 0 a 4: 72 mil productos', 'وتيرة المبيعات v(t) = 3t² + 2 والمساحة تحتها من 0 إلى 4: 72 ألف منتج', 'The sales rate v(t) = 3t² + 2 and the area under it from 0 to 4: 72 thousand products')}
            box={{ xMin: 0, xMax: 5, yMin: -1, yMax: 6 }}
            cell={30}
            units={[1, 10]}
            ox={48}
            curves={[{ fn: (t) => 3 * t * t + 2, from: 0, to: 4.3, color: GREEN }]}
            fills={[{ fn: (t) => 3 * t * t + 2, from: 0, to: 4, color: GREEN }]}
            notes={[
                { y: 72, formula: '∫₀⁴ v(t) dt', color: INK },
                { y: 116, formula: '64 + 8 = 72', color: STAGE, size: 21 }
            ]}
            notesX={220}
        />
    )
}

export function IncomeFigure({ language }: Props) {
    return (
        <AreaPlot
            language={language}
            height={260}
            label={say("I'(x) = 100 − 2x eta haren azpiko azalera 10 eta 20 artean: 700 euro gehiago", "I'(x) = 100 − 2x y el área bajo ella entre 10 y 20: 700 € más", "I'(x) = 100 − 2x والمساحة تحتها بين 10 و20: 700 € إضافية", "I'(x) = 100 − 2x and the area under it between 10 and 20: €700 more")}
            box={{ xMin: 0, xMax: 6, yMin: -1, yMax: 6 }}
            cell={30}
            units={[10, 20]}
            ox={48}
            curves={[{ fn: (x) => 100 - 2 * x, from: 0, to: 50, color: GREEN }]}
            fills={[{ fn: (x) => 100 - 2 * x, from: 10, to: 20, color: GREEN }]}
            verticals={[10, 20]}
            notes={[
                { y: 72, formula: 'I = 100x − x²', color: INK, size: 17 },
                { y: 116, formula: '1600 − 900', color: INK },
                { y: 160, formula: '= 700', color: STAGE, size: 21 }
            ]}
            notesX={250}
        />
    )
}

/* ---------- The cover ---------- */

export function Bach2gIntegralsHeroArt() {
    return (
        <div className="fraction-v2-collage" aria-hidden="true">
            <svg viewBox="0 0 520 400" direction="ltr" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                <g transform="translate(22 26) rotate(-4)">
                    <rect width={272} height={214} rx={16} fill={PAPER} stroke={INK} strokeWidth={2} />
                    <line x1={20} y1={180} x2={256} y2={180} stroke={INK} strokeWidth={2} />
                    <path d="M60 180 L60 120 C 100 60, 160 50, 220 80 L220 180 Z" fill="#2f8a57" fillOpacity={0.28} />
                    <path d="M30 150 C 70 90, 150 40, 250 76" fill="none" stroke="#2f8a57" strokeWidth={4} strokeLinecap="round" />
                    <text x={120} y={160} fontSize={26} fontWeight={700} fill={INK} fontFamily={SERIF}>∫</text>
                </g>
                <g transform="translate(318 44) rotate(5)">
                    <rect width={180} height={124} rx={16} fill="#f3d98b" stroke={INK} strokeWidth={2} />
                    <text x={90} y={58} textAnchor="middle" fontSize={24} fontWeight={700} fill={INK} fontFamily={SERIF}>F(b) − F(a)</text>
                    <text x={90} y={98} textAnchor="middle" fontSize={22} fontWeight={700} fill={INK} fontFamily={SERIF}>+ C</text>
                </g>
                <g transform="translate(56 274) rotate(2)">
                    <rect width={408} height={90} rx={16} fill="#d8c9f1" stroke={INK} strokeWidth={2} />
                    <text x={204} y={58} textAnchor="middle" fontSize={26} fontWeight={700} fill={INK} fontFamily={SERIF}>C′ → C · v → ∫ v dt</text>
                </g>
            </svg>
        </div>
    )
}
