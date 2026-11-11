import { pickText, type LocalizedText, type UnitLanguage } from '../../features/unit-v2/types'
import { AxisTitles, Label, PlaneGrid, PlanePath } from '../dbh2-funtzioak-v2/plane'
import { useBoxClip } from '../dbh2-funtzioak-v2/planeClip'
import { planeMap } from '../dbh2-funtzioak-v2/planeMap'
import { Figure } from '../dbh2-zatikiak-prototype/figures'
import { sampled } from '../dbh4-aplikatuak-funtzioak/functions'
import { BLUE, CARD, GREEN, INK, MUTED, RED, SERIF, STAGE, VIOLET, decimal, say } from '../batx2-zientziak-mugagabeak/figureKit'
import { AreaPlot, ArrowHead, Back, F, Up } from '../batx2-zientziak-mugagabeak/plot'

/* ==========================================================================
   Integral mugatua · Batxilergoa 2 · Zientziak — the lesson figures. Most
   are planes drawn with AreaPlot of Integral mugagabeak: the area that
   Barrow gives, the parts above and below the axis, the lower and upper
   rectangles, the upper sums closing in on ⅓, the rectangle of the mean
   value, the area that grows with x, the strip that ends at x², the
   asymptote that breaks Barrow, |x − 1| split at 1, the two strips of a
   region of three curves, the limit b that gives an area of 9 and F next
   to f with its maximum and minimum. Two are drawn by hand: the limits
   that move from x to t and the solid made of discs.
   ========================================================================== */

const pick = (language: UnitLanguage) => (text: LocalizedText) => pickText(language, text)

/* ---------- 1. Barrow and the properties ---------- */

export function BarrowReviewFigure({ language }: { language: UnitLanguage }) {
    const f = (x: number) => 3 * x * x - 2 * x
    return (
        <AreaPlot
            language={language}
            height={320}
            label={say('y = 3x² − 2x kurbaren azpiko azalera 1 eta 3 artean: F(3) − F(1) = 18; eta integralaren hiru propietate', 'El área bajo y = 3x² − 2x entre 1 y 3: F(3) − F(1) = 18; y tres propiedades de la integral', 'المساحة تحت y = 3x² − 2x بين 1 و3: F(3) − F(1) = 18، وثلاث خصائص للتكامل', 'The area under y = 3x² − 2x between 1 and 3: F(3) − F(1) = 18; and three properties of the integral')}
            box={{ xMin: -1, xMax: 4, yMin: -1, yMax: 7 }}
            cell={34}
            units={[1, 4]}
            labelStep={1}
            curves={[{ fn: f, from: -0.6, to: 3.4 }]}
            fills={[{ fn: f, from: 1, to: 3, color: BLUE }]}
            verticals={[1, 3]}
            marks={[{ at: [2.3, 4], text: '18', color: BLUE, size: 20 }]}
            notes={[
                { y: 64, formula: 'F(x) = x³ − x²', size: 20 },
                { y: 102, formula: 'F(3) − F(1) = 18 − 0 = 18', color: STAGE, size: 20 },
                { y: 158, text: say('Propietateak:', 'Propiedades:', 'الخصائص:', 'Properties:'), size: 17, color: MUTED },
                { y: 196, formula: '∫₃¹ f dx = − ∫₁³ f dx', size: 19 },
                { y: 234, formula: '∫₁³ f dx = ∫₁² f dx + ∫₂³ f dx', size: 19 },
                { y: 272, formula: '∫ (f + g) dx = ∫ f dx + ∫ g dx', size: 19 }
            ]}
            notesX={250}
        />
    )
}

/* ---------- 2. Signed areas and areas between curves ---------- */

export function AreasReviewFigure({ language }: { language: UnitLanguage }) {
    const f = (x: number) => x * x - 4
    return (
        <AreaPlot
            language={language}
            height={290}
            label={say('y = x² − 4 kurba ardatzaren azpian dago 0 eta 2 artean (gorria), eta gainean 2 eta 3 artean (urdina); azalera 23/3 da', 'La curva y = x² − 4 queda bajo el eje entre 0 y 2 (rojo) y encima entre 2 y 3 (azul); el área es 23/3', 'المنحنى y = x² − 4 تحت المحور بين 0 و2 (أحمر) وفوقه بين 2 و3 (أزرق)؛ والمساحة 23/3', 'The curve y = x² − 4 is below the axis between 0 and 2 (red) and above it between 2 and 3 (blue); the area is 23/3')}
            box={{ xMin: -1, xMax: 4, yMin: -3, yMax: 3 }}
            cell={36}
            units={[1, 2]}
            labelStep={1}
            curves={[{ fn: f, from: -0.8, to: 3.4 }]}
            fills={[{ fn: f, from: 0, to: 2, color: RED }, { fn: f, from: 2, to: 3, color: BLUE }]}
            marks={[{ at: [0.9, -1.9], text: '−', color: RED, size: 30 }, { at: [2.62, 0.9], text: '+', color: BLUE, size: 24 }]}
            notes={[
                { y: 64, formula: '∫₀² (x² − 4) dx = −16/3', color: RED, size: 19 },
                { y: 102, formula: '∫₂³ (x² − 4) dx = 7/3', color: BLUE, size: 19 },
                { y: 146, formula: 'A = 16/3 + 7/3 = 23/3', color: STAGE, size: 20 },
                { y: 204, text: say('Bi kurben artean, goikoa ken behekoa:', 'Entre dos curvas, la de arriba menos la de abajo:', 'بين منحنيين: الأعلى ناقص الأدنى:', 'Between two curves, the top one minus the bottom one:'), size: 16, color: MUTED },
                { y: 240, formula: 'A = ∫ₐᵇ (f − g) dx', size: 19 }
            ]}
            notesX={270}
        />
    )
}

/* ---------- 3. Lower and upper sums ---------- */

export function LowerUpperFigure({ language }: { language: UnitLanguage }) {
    return (
        <AreaPlot
            language={language}
            height={300}
            label={say('y = x² + 1 kurba 0 eta 2 artean: azpiko laukizuzen urdinek s = 3 ematen dute, eta gaineko gorriek S = 7', 'La curva y = x² + 1 entre 0 y 2: los rectángulos azules de abajo dan s = 3 y los rojos de arriba, S = 7', 'المنحنى y = x² + 1 بين 0 و2: المستطيلات الزرقاء السفلية تعطي s = 3 والحمراء العلوية S = 7', 'The curve y = x² + 1 between 0 and 2: the blue rectangles below give s = 3 and the red ones above, S = 7')}
            box={{ xMin: -1, xMax: 3, yMin: -1, yMax: 6 }}
            cell={34}
            curves={[{ fn: (x) => x * x + 1, from: -0.7, to: 2.3 }]}
            bars={[
                { x: 0, width: 1, height: 2, color: RED },
                { x: 1, width: 1, height: 5, color: RED },
                { x: 0, width: 1, height: 1, color: BLUE },
                { x: 1, width: 1, height: 2, color: BLUE }
            ]}
            notes={[
                { y: 62, text: say('Behe-batura: minimoarekin', 'Suma inferior: con el mínimo', 'المجموع الأدنى: بأصغر قيمة', 'Lower sum: with the minimum'), size: 17, color: BLUE },
                { y: 98, formula: 's = 1 · 1 + 1 · 2 = 3', color: BLUE, size: 20 },
                { y: 150, text: say('Goi-batura: maximoarekin', 'Suma superior: con el máximo', 'المجموع الأعلى: بأكبر قيمة', 'Upper sum: with the maximum'), size: 17, color: RED },
                { y: 186, formula: 'S = 1 · 2 + 1 · 5 = 7', color: RED, size: 20 },
                { y: 240, formula: '3 ≤ A ≤ 7', color: STAGE, size: 22 }
            ]}
            notesX={230}
        />
    )
}

/* ---------- 4. The upper sums closing in on ⅓ ---------- */

export function LimitSumsFigure({ language }: { language: UnitLanguage }) {
    const n = 8
    return (
        <AreaPlot
            language={language}
            height={280}
            label={say('y = x² kurbaren gaineko 8 laukizuzen 0 eta 1 artean; n handitzean, Sₙ goi-batura ⅓ zenbakira hurbiltzen da', 'Los 8 rectángulos de arriba bajo y = x² entre 0 y 1; al aumentar n, la suma superior Sₙ se acerca a ⅓', 'المستطيلات العلوية الثمانية لـ y = x² بين 0 و1؛ وعند زيادة n يقترب المجموع الأعلى Sₙ من ⅓', 'The 8 upper rectangles for y = x² between 0 and 1; as n grows, the upper sum Sₙ approaches ⅓')}
            box={{ xMin: -1, xMax: 5, yMin: -1, yMax: 5 }}
            cell={36}
            units={[0.25, 0.25]}
            labelStep={4}
            curves={[{ fn: (x) => x * x, from: -0.2, to: 1.15 }]}
            bars={Array.from({ length: n }, (_, k) => ({ x: k / n, width: 1 / n, height: ((k + 1) / n) ** 2, color: BLUE }))}
            notes={[
                { y: 62, formula: 'Sₙ = (n + 1)(2n + 1) / (6n²)', size: 18 },
                { y: 108, formula: decimal(language, 'n = 2:   S₂ = 0,625'), size: 19 },
                { y: 144, formula: decimal(language, 'n = 4:   S₄ ≈ 0,469'), size: 19 },
                { y: 180, formula: decimal(language, 'n = 8:   S₈ ≈ 0,398'), size: 19, color: BLUE },
                { y: 226, formula: 'n → ∞:   Sₙ → 1/3', color: STAGE, size: 20 }
            ]}
            notesX={300}
        />
    )
}

/* ---------- 5. The rectangle of the mean value ---------- */

export function MeanValueFigure({ language }: { language: UnitLanguage }) {
    const root3 = Math.sqrt(3)
    return (
        <AreaPlot
            language={language}
            height={290}
            label={say('y = x² kurbaren azpiko azalera 0 eta 3 artean 9 da, 3 altuerako laukizuzenarena bezala; c = √3 puntuan f(c) = 3', 'El área bajo y = x² entre 0 y 3 vale 9, como la del rectángulo de altura 3; en c = √3, f(c) = 3', 'المساحة تحت y = x² بين 0 و3 تساوي 9 مثل مساحة المستطيل الذي ارتفاعه 3؛ وعند c = √3 يكون f(c) = 3', 'The area under y = x² between 0 and 3 is 9, like that of the rectangle of height 3; at c = √3, f(c) = 3')}
            box={{ xMin: -1, xMax: 4, yMin: -1, yMax: 5 }}
            cell={36}
            units={[1, 2]}
            labelStep={1}
            curves={[{ fn: (x) => x * x, from: -0.8, to: 3.3, color: BLUE }]}
            fills={[{ fn: (x) => x * x, from: 0, to: 3, color: BLUE }]}
            bars={[{ x: 0, width: 3, height: 3, color: VIOLET }]}
            dots={[{ at: [root3, 3], color: VIOLET, name: 'c' }]}
            notes={[
                { y: 64, formula: '∫₀³ x² dx = 9', color: BLUE, size: 20 },
                { y: 104, formula: 'f(c) · 3 = 9  →  f(c) = 3', size: 19 },
                { y: 144, formula: decimal(language, 'c = √3 ≈ 1,73'), color: VIOLET, size: 20 },
                { y: 200, text: say('Laukizuzen moreak azalera bera du', 'El rectángulo violeta tiene la misma área', 'للمستطيل البنفسجي المساحة نفسها', 'The violet rectangle has the same area'), size: 17, color: MUTED }
            ]}
            notesX={270}
        />
    )
}

/* ---------- 6. The integral function: the area that grows with x ---------- */

export function AreaFunctionFigure({ language }: { language: UnitLanguage }) {
    const f = (t: number) => 2 * t + 1
    return (
        <AreaPlot
            language={language}
            height={322}
            label={say('y = 2t + 1 zuzenaren azpiko azalera 0 puntutik x puntura: F(x) = x² + x, eta F′(x) = 2x + 1', 'El área bajo y = 2t + 1 desde 0 hasta x: F(x) = x² + x, y F′(x) = 2x + 1', 'المساحة تحت y = 2t + 1 من 0 إلى x: F(x) = x² + x و F′(x) = 2x + 1', 'The area under y = 2t + 1 from 0 to x: F(x) = x² + x, and F′(x) = 2x + 1')}
            box={{ xMin: -1, xMax: 4, yMin: -1, yMax: 8 }}
            cell={30}
            curves={[{ fn: f, from: -1, to: 3.5 }]}
            fills={[{ fn: f, from: 0, to: 2, color: BLUE }]}
            verticals={[2]}
            marks={[{ at: [1, 1.3], text: 'F(x)', color: BLUE, size: 17 }, { at: [2.45, 7.1], text: 'x', size: 20 }]}
            notes={[
                { y: 64, formula: 'F(x) = ∫₀ˣ (2t + 1) dt', size: 20 },
                { y: 102, formula: '= x² + x', size: 20 },
                { y: 156, text: say('x mugitzean, azalera hazi egiten da:', 'Al mover x, el área crece:', 'عند تحريك x تكبر المساحة:', 'As x moves, the area grows:'), size: 17, color: MUTED },
                { y: 192, formula: 'F(1) = 2;  F(2) = 6;  F(3) = 12', size: 18 },
                { y: 244, formula: 'F′(x) = 2x + 1 = f(x)', color: STAGE, size: 21 }
            ]}
            notesX={240}
        />
    )
}

/* ---------- 7. A limit that is a function ---------- */

export function UpperLimitFigure({ language }: { language: UnitLanguage }) {
    const top = 1.5 ** 2
    return (
        <AreaPlot
            language={language}
            height={236}
            label={say('y = 1/t kurbaren azpiko azalera 1 puntutik x² puntura; deribatzean, f(x²) bider 2x', 'El área bajo y = 1/t desde 1 hasta x²; al derivar, f(x²) por 2x', 'المساحة تحت y = 1/t من 1 إلى x²؛ وعند الاشتقاق f(x²) في 2x', 'The area under y = 1/t from 1 to x²; differentiating gives f(x²) times 2x')}
            box={{ xMin: -1, xMax: 4, yMin: -1, yMax: 3 }}
            cell={36}
            units={[1, 0.5]}
            labelStep={2}
            curves={[{ fn: (t) => 1 / t, from: 0.4, to: 4 }]}
            fills={[{ fn: (t) => 1 / t, from: 1, to: top, color: BLUE }]}
            verticals={[top]}
            marks={[{ at: [top + 0.3, 1.25], text: 'x²', size: 19 }]}
            notes={[
                { y: 60, formula: 'F(x) = ∫₁ˣ² dt / t', size: 20 },
                { y: 100, formula: 'F′(x) = f(x²) · (x²)′', size: 20 },
                { y: 140, formula: '= (1 / x²) · 2x = 2 / x', color: STAGE, size: 20 },
                { y: 190, text: say('Mugaren deribatuaz biderkatzen da', 'Se multiplica por la derivada del límite', 'نضرب في مشتقة الحد', 'Multiply by the derivative of the limit'), size: 17, color: MUTED }
            ]}
            notesX={270}
        />
    )
}

/* ---------- 8. When Barrow does not work ---------- */

export function BarrowConditionsFigure({ language }: { language: UnitLanguage }) {
    const f = (x: number) => 1 / (x * x)
    return (
        <AreaPlot
            language={language}
            height={300}
            label={say('y = 1/x² kurbak asintota bat du x = 0 puntuan, [−1, 1] tartearen barruan: Barrow-k ez du balio', 'La curva y = 1/x² tiene una asíntota en x = 0, dentro de [−1, 1]: Barrow no vale', 'للمنحنى y = 1/x² مقارب عند x = 0 داخل [−1, 1]: لا تصح قاعدة بارو', 'The curve y = 1/x² has an asymptote at x = 0, inside [−1, 1]: Barrow does not work')}
            box={{ xMin: -2, xMax: 2, yMin: -1, yMax: 6 }}
            cell={34}
            curves={[{ fn: f, from: -2, to: -0.38 }, { fn: f, from: 0.38, to: 2 }]}
            fills={[{ fn: f, from: -1, to: -0.39, color: RED }, { fn: f, from: 0.39, to: 1, color: RED }]}
            verticals={[0]}
            notes={[
                { y: 64, formula: '[−1/x]₋₁¹ = −1 − 1 = −2', color: RED, size: 20 },
                { y: 104, text: say('Ezinezkoa: azalera positiboa da', 'Imposible: el área es positiva', 'مستحيل: المساحة موجبة', 'Impossible: the area is positive'), size: 17, color: RED },
                { y: 152, text: say('Asintota tartearen barruan:', 'Asíntota dentro del intervalo:', 'مقارب داخل الفترة:', 'Asymptote inside the interval:'), size: 17 },
                { y: 188, formula: 'x = 0', size: 20 },
                { y: 240, text: say('Barrow-k funtzio jarraitua behar du', 'Barrow necesita una función continua', 'تحتاج قاعدة بارو إلى دالة متصلة', 'Barrow needs a continuous function'), size: 17, color: STAGE }
            ]}
            notesX={230}
        />
    )
}

/* ---------- 9. The limits move from x to t ---------- */

export function DefiniteChangeFigure({ language }: { language: UnitLanguage }) {
    const t = pick(language)
    const left = 60
    const xLine = { y: 84, unit: 140 }
    const tLine = { y: 214, unit: 70 }
    const arrows: Array<[number, number]> = [[0, 0], [1, 1], [2, 4]]
    return (
        <Figure height={290} label={t(say('t = x² aldaketan, x = 0, 1, 2 mugak t = 0, 1, 4 bihurtzen dira; ∫₀² 2x e^(x²) dx = ∫₀⁴ eᵗ dt = e⁴ − 1', 'Con t = x², los límites x = 0, 1, 2 pasan a t = 0, 1, 4; ∫₀² 2x e^(x²) dx = ∫₀⁴ eᵗ dt = e⁴ − 1', 'مع t = x² تصبح الحدود x = 0 و1 و2 هي t = 0 و1 و4؛ ∫₀² 2x e^(x²) dx = ∫₀⁴ eᵗ dt = e⁴ − 1', 'With t = x², the limits x = 0, 1, 2 become t = 0, 1, 4; ∫₀² 2x e^(x²) dx = ∫₀⁴ eᵗ dt = e⁴ − 1'))}>
            <defs><ArrowHead id="mugatua-change-arrow" color={STAGE} /></defs>
            {[xLine, tLine].map((line, index) => {
                const top = index === 0 ? 2 : 4
                return (
                    <g key={index}>
                        <line x1={left - 14} y1={line.y} x2={left + top * line.unit + 24} y2={line.y} stroke={INK} strokeWidth={2.4} />
                        {Array.from({ length: top + 1 }, (_, k) => (
                            <g key={k}>
                                <line x1={left + k * line.unit} y1={line.y - 7} x2={left + k * line.unit} y2={line.y + 7} stroke={INK} strokeWidth={2} />
                                <F x={left + k * line.unit} y={index === 0 ? line.y - 16 : line.y + 30} anchor="middle" size={18} weight={600} color={MUTED}>{k}</F>
                            </g>
                        ))}
                        <F x={left - 26} y={line.y + 7} anchor="end" size={21} color={index === 0 ? INK : STAGE}>{index === 0 ? 'x' : 't'}</F>
                    </g>
                )
            })}
            {arrows.map(([x, value]) => (
                <line key={x} x1={left + x * xLine.unit} y1={xLine.y + 12} x2={left + value * tLine.unit} y2={tLine.y - 14} stroke={STAGE} strokeWidth={2.4} markerEnd="url(#mugatua-change-arrow)" />
            ))}
            <F x={190} y={154} anchor="middle" size={20} color={STAGE}>t = x<Up>2</Up></F>
            <F x={410} y={70} size={20}>∫₀² 2x e<Up>x²</Up><Back />dx</F>
            <F x={410} y={116} size={20}>= ∫₀⁴ e<Up>t</Up><Back />dt</F>
            <F x={410} y={162} size={21} color={STAGE}>= e<Up>4</Up><Back />− 1</F>
            <Label x={410} y={222} fontSize={17} fill={MUTED}>{t(say('Mugak ere aldatzen dira,', 'También cambian los límites,', 'تتغير الحدود أيضًا،', 'The limits change too,'))}</Label>
            <Label x={410} y={250} fontSize={17} fill={MUTED}>{t(say('eta ez da x aldagaira itzultzen', 'y no se vuelve a x', 'ولا نعود إلى x', 'and you do not go back to x'))}</Label>
        </Figure>
    )
}

/* ---------- 10. By parts between 0 and 1 ---------- */

export function DefinitePartsFigure({ language }: { language: UnitLanguage }) {
    const f = (x: number) => x * Math.exp(x)
    return (
        <AreaPlot
            language={language}
            height={236}
            label={say('y = x eˣ kurbaren azpiko azalera 0 eta 1 artean 1 da: [x eˣ]₀¹ − ∫₀¹ eˣ dx = e − (e − 1)', 'El área bajo y = x eˣ entre 0 y 1 vale 1: [x eˣ]₀¹ − ∫₀¹ eˣ dx = e − (e − 1)', 'المساحة تحت y = x eˣ بين 0 و1 تساوي 1: [x eˣ]₀¹ − ∫₀¹ eˣ dx = e − (e − 1)', 'The area under y = x eˣ between 0 and 1 is 1: [x eˣ]₀¹ − ∫₀¹ eˣ dx = e − (e − 1)')}
            box={{ xMin: -2, xMax: 3, yMin: -1, yMax: 3 }}
            cell={40}
            units={[0.5, 1]}
            labelStep={2}
            curves={[{ fn: f, from: -1, to: 1.3 }]}
            fills={[{ fn: f, from: 0, to: 1, color: BLUE }]}
            marks={[{ at: [0.72, 0.55], text: '1', color: BLUE, size: 21 }]}
            notes={[
                { y: 60, formula: 'u = x;   dv = eˣ dx', size: 19 },
                { y: 96, formula: 'du = dx;   v = eˣ', size: 19 },
                { y: 146, formula: '[x eˣ]₀¹ − ∫₀¹ eˣ dx', size: 20 },
                { y: 184, formula: '= e − (e − 1) = 1', color: STAGE, size: 21 }
            ]}
            notesX={290}
        />
    )
}

/* ---------- 11. |x − 1| split at 1 ---------- */

export function PiecewiseFigure({ language }: { language: UnitLanguage }) {
    const f = (x: number) => Math.abs(x - 1)
    return (
        <AreaPlot
            language={language}
            height={236}
            label={say('y = |x − 1| kurba 1 puntuan zatituta: azaleretako bat ½ da, eta bestea 2; guztira 5/2', 'La curva y = |x − 1| partida en 1: un área vale ½ y la otra 2; en total 5/2', 'المنحنى y = |x − 1| مقسومًا عند 1: مساحة ½ والأخرى 2، والمجموع 5/2', 'The curve y = |x − 1| split at 1: one area is ½ and the other 2; 5/2 in all')}
            box={{ xMin: -1, xMax: 4, yMin: -1, yMax: 3 }}
            cell={36}
            curves={[{ fn: f, from: -0.9, to: 3.7 }]}
            fills={[{ fn: f, from: 0, to: 1, color: BLUE }, { fn: f, from: 1, to: 3, color: VIOLET }]}
            verticals={[1]}
            marks={[{ at: [0.33, 0.22], text: '½', color: BLUE, size: 18 }, { at: [2.3, 0.45], text: '2', color: VIOLET, size: 20 }]}
            notes={[
                { y: 60, formula: 'x < 1:   |x − 1| = 1 − x', color: BLUE, size: 19 },
                { y: 96, formula: 'x ≥ 1:   |x − 1| = x − 1', color: VIOLET, size: 19 },
                { y: 146, formula: '∫₀¹ (1 − x) dx + ∫₁³ (x − 1) dx', size: 18 },
                { y: 184, formula: '= ½ + 2 = 5/2', color: STAGE, size: 21 }
            ]}
            notesX={270}
        />
    )
}

/* ---------- 12. A region of three curves, in two strips ---------- */

export function ThreeCurvesFigure({ language }: { language: UnitLanguage }) {
    return (
        <AreaPlot
            language={language}
            height={290}
            label={say('y = x², y = 2 − x eta X ardatzak mugatutako barrutia, bi zerrendatan: 0 eta 1 artean x² goian, eta 1 eta 2 artean 2 − x', 'El recinto limitado por y = x², y = 2 − x y el eje X, en dos tiras: entre 0 y 1 arriba x², y entre 1 y 2, 2 − x', 'المنطقة التي يحدّها y = x² و y = 2 − x ومحور X في شريحتين: بين 0 و1 في الأعلى x² وبين 1 و2 يكون 2 − x', 'The region bounded by y = x², y = 2 − x and the x-axis, in two strips: between 0 and 1 x² on top, and between 1 and 2, 2 − x')}
            box={{ xMin: -1, xMax: 3, yMin: -1, yMax: 3 }}
            cell={40}
            curves={[{ fn: (x) => x * x, from: -0.6, to: 1.7, color: BLUE }, { fn: (x) => 2 - x, from: -0.8, to: 2.9, color: VIOLET }]}
            fills={[{ fn: (x) => x * x, from: 0, to: 1, color: BLUE }, { fn: (x) => 2 - x, from: 1, to: 2, color: VIOLET }]}
            verticals={[1]}
            dots={[{ at: [1, 1], color: INK, name: '(1, 1)' }]}
            notes={[
                { y: 60, formula: 'x² = 2 − x  →  x = 1', size: 19 },
                { y: 108, text: say('1. zerrenda:', '1.ª tira:', 'الشريحة الأولى:', 'Strip 1:'), size: 17, color: BLUE },
                { y: 142, formula: '∫₀¹ x² dx = 1/3', color: BLUE, size: 19 },
                { y: 186, text: say('2. zerrenda:', '2.ª tira:', 'الشريحة الثانية:', 'Strip 2:'), size: 17, color: VIOLET },
                { y: 220, formula: '∫₁² (2 − x) dx = 1/2', color: VIOLET, size: 19 },
                { y: 264, formula: 'A = 1/3 + 1/2 = 5/6', color: STAGE, size: 21 }
            ]}
            notesX={260}
        />
    )
}

/* ---------- 13. The limit b that gives an area of 9 ---------- */

export function ParameterFigure({ language }: { language: UnitLanguage }) {
    const f = (x: number) => x * x
    return (
        <AreaPlot
            language={language}
            height={290}
            label={say('y = x² kurbaren azpiko azalera 0 eta b artean b³/3 da; 9 izan dadin, b = 3', 'El área bajo y = x² entre 0 y b vale b³/3; para que sea 9, b = 3', 'المساحة تحت y = x² بين 0 و b تساوي b³/3؛ ولتكون 9 يجب b = 3', 'The area under y = x² between 0 and b is b³/3; for it to be 9, b = 3')}
            box={{ xMin: -1, xMax: 4, yMin: -1, yMax: 5 }}
            cell={36}
            units={[1, 2]}
            labelStep={1}
            curves={[{ fn: f, from: -0.8, to: 3.3 }]}
            fills={[{ fn: f, from: 0, to: 3, color: BLUE }]}
            verticals={[3]}
            marks={[{ at: [3.45, 5.5], text: 'b', size: 21 }, { at: [2.2, 1.6], text: 'A = 9', color: BLUE, size: 18 }]}
            notes={[
                { y: 64, formula: 'A(b) = ∫₀ᵇ x² dx = b³/3', size: 20 },
                { y: 104, formula: 'b³/3 = 9  →  b³ = 27', size: 20 },
                { y: 144, formula: 'b = 3', color: STAGE, size: 22 },
                { y: 200, text: say('Parametroa, zenbaki bat balitz bezala', 'El parámetro, como si fuera un número', 'الوسيط كأنه عدد', 'The parameter, as if it were a number'), size: 17, color: MUTED }
            ]}
            notesX={270}
        />
    )
}

/* ---------- 14. F next to f: where F has its maximum and minimum ---------- */

export function IntegralExtremaFigure({ language }: { language: UnitLanguage }) {
    const f = (x: number) => x * x - 4
    const F = (x: number) => (x ** 3) / 3 - 4 * x
    return (
        <AreaPlot
            language={language}
            height={290}
            label={say('f(t) = t² − 4 (marra etena) eta F(x) = x³/3 − 4x (osoa): F funtzioak maximoa du x = −2 puntuan eta minimoa x = 2 puntuan, f zeinuz aldatzen den tokian', 'f(t) = t² − 4 (discontinua) y F(x) = x³/3 − 4x (continua): F tiene un máximo en x = −2 y un mínimo en x = 2, donde f cambia de signo', 'f(t) = t² − 4 (متقطع) و F(x) = x³/3 − 4x (متصل): لـ F قيمة عظمى عند x = −2 وصغرى عند x = 2 حيث تتغير إشارة f', 'f(t) = t² − 4 (dashed) and F(x) = x³/3 − 4x (solid): F has a maximum at x = −2 and a minimum at x = 2, where f changes sign')}
            box={{ xMin: -4, xMax: 4, yMin: -4, yMax: 4 }}
            cell={28}
            units={[1, 2]}
            labelStep={2}
            curves={[{ fn: f, from: -3.6, to: 3.6, color: MUTED, dashed: true, width: 2.8 }, { fn: F, from: -3.9, to: 3.9 }]}
            dots={[{ at: [-2, 16 / 3], color: GREEN }, { at: [2, -16 / 3], color: RED }]}
            notes={[
                { y: 54, formula: 'F′(x) = f(x) = x² − 4', size: 19 },
                { y: 92, formula: 'x < −2:  F′ > 0', size: 18 },
                { y: 124, formula: '−2 < x < 2:  F′ < 0', size: 18 },
                { y: 156, formula: 'x > 2:  F′ > 0', size: 18 },
                { y: 196, text: say('Puntu berdea: maximoa', 'Punto verde: máximo', 'النقطة الخضراء: قيمة عظمى', 'Green dot: maximum'), size: 17, color: GREEN },
                { y: 228, text: say('Puntu gorria: minimoa', 'Punto rojo: mínimo', 'النقطة الحمراء: قيمة صغرى', 'Red dot: minimum'), size: 17, color: RED },
                { y: 266, text: say('Marra etena: f; osoa: F', 'Discontinua: f; continua: F', 'المتقطع: f، والمتصل: F', 'Dashed: f; solid: F'), size: 16, color: MUTED }
            ]}
            notesX={300}
        />
    )
}

/* ---------- 15. The solid made of discs ---------- */

export function RevolutionFigure({ language }: { language: UnitLanguage }) {
    const t = pick(language)
    const box = { xMin: -1, xMax: 5, yMin: -3, yMax: 3 }
    const map = planeMap(box, 34, 36, 30)
    const [clipPath, clip] = useBoxClip(map)
    const root = (x: number) => Math.sqrt(Math.max(0, x))
    const xs = Array.from({ length: 81 }, (_, k) => (4 * k) / 80)
    const solid = `M${[...xs.map((x) => `${map.x(x)},${map.y(root(x))}`), ...[...xs].reverse().map((x) => `${map.x(x)},${map.y(-root(x))}`)].join(' L')} Z`
    return (
        <Figure height={270} label={t(say('y = √x kurba X ardatzaren inguruan 0 eta 4 artean biratuta: diskoz egindako gorputza, V = 8π', 'La curva y = √x girada alrededor del eje X entre 0 y 4: un cuerpo hecho de discos, V = 8π', 'المنحنى y = √x مدارًا حول محور X بين 0 و4: جسم مصنوع من أقراص، V = 8π', 'The curve y = √x turned about the x-axis between 0 and 4: a solid made of discs, V = 8π'))}>
            <defs>{clipPath}</defs>
            <rect x={36} y={30} width={map.width} height={map.height} fill={CARD} />
            <PlaneGrid map={map} labelStep={1} />
            <AxisTitles map={map} />
            <path d={solid} fill={BLUE} fillOpacity={0.16} stroke="none" />
            {[1, 2, 3].map((x) => <ellipse key={x} cx={map.x(x)} cy={map.y(0)} rx={7} ry={root(x) * map.cell} fill="none" stroke={BLUE} strokeWidth={1.8} strokeDasharray="5 4" />)}
            <ellipse cx={map.x(4)} cy={map.y(0)} rx={13} ry={2 * map.cell} fill={BLUE} fillOpacity={0.28} stroke={BLUE} strokeWidth={2.4} />
            <PlanePath map={map} points={sampled(root, 0, 4.8, 0.02)} color={STAGE} clip={clip} />
            <PlanePath map={map} points={sampled((x) => -root(x), 0, 4.8, 0.02)} color={STAGE} dashed clip={clip} />
            <F x={map.x(4) + 20} y={map.y(1.1)} size={17} color={BLUE}>r = √x</F>
            <F x={330} y={70} size={20}>V = π ∫₀⁴ (√x)<Up>2</Up><Back />dx</F>
            <F x={330} y={112} size={20}>= π ∫₀⁴ x dx</F>
            <F x={330} y={154} size={21} color={STAGE}>= π · 8 = 8π</F>
            <Label x={330} y={206} fontSize={17} fill={MUTED}>{t(say('Disko bakoitzaren bolumena:', 'Volumen de cada disco:', 'حجم كل قرص:', 'Volume of each disc:'))}</Label>
            <F x={330} y={240} size={19} color={MUTED}>π r<Up>2</Up><Back />dx</F>
        </Figure>
    )
}

/* ---------- The hero of the unit ---------- */

export function Bach2DefiniteHeroArt() {
    return (
        <div className="fraction-v2-collage" aria-hidden="true">
            <svg viewBox="0 0 520 400" direction="ltr" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                <g transform="translate(26 36) rotate(-4)">
                    <rect width={320} height={120} rx={16} fill="#dde7f7" stroke={INK} strokeWidth={2} />
                    <text x={160} y={72} textAnchor="middle" fontSize={26} fontWeight={700} fill={INK} fontFamily={SERIF}>∫ₐᵇ f dx = F(b) − F(a)</text>
                </g>
                <g transform="translate(300 160) rotate(5)">
                    <rect width={196} height={112} rx={16} fill="#f3e3b5" stroke={INK} strokeWidth={2} />
                    <text x={98} y={50} textAnchor="middle" fontSize={22} fontWeight={700} fill={INK} fontFamily={SERIF}>F(x) = ∫ₐˣ f</text>
                    <text x={98} y={86} textAnchor="middle" fontSize={22} fontWeight={700} fill={INK} fontFamily={SERIF}>F′(x) = f(x)</text>
                </g>
                <g transform="translate(40 254) rotate(2)">
                    <rect width={300} height={104} rx={16} fill="#d6eedd" stroke={INK} strokeWidth={2} />
                    <path d="M28 78 Q 60 30 110 26 L 110 82 Z" fill={GREEN} fillOpacity={0.3} stroke={GREEN} strokeWidth={2} />
                    <text x={196} y={64} textAnchor="middle" fontSize={26} fontWeight={700} fill={INK} fontFamily={SERIF}>V = π ∫ f²</text>
                </g>
            </svg>
        </div>
    )
}
