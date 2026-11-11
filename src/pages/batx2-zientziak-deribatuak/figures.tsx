import type { ReactNode } from 'react'
import { pickText, type LocalizedText, type UnitLanguage } from '../../features/unit-v2/types'
import { AxisTitles, Label, PlaneGrid, PlaneLine, PlanePath, PlanePoint } from '../dbh2-funtzioak-v2/plane'
import { useBoxClip } from '../dbh2-funtzioak-v2/planeClip'
import { planeMap } from '../dbh2-funtzioak-v2/planeMap'
import { Figure } from '../dbh2-zatikiak-prototype/figures'
import { LimitPlot } from '../batx2-zientziak-limiteak/figures'

/* ==========================================================================
   Deribatuak · Batxilergoa 2 · Zientziak — the lesson figures. Most are
   one plane with curves, tangents as straight curves and a column of
   notes (LimitPlot of Limiteak 2.º); the circle of the implicit lesson
   is drawn as a closed path, and the rules, the layers, the table of
   composites and the ladder of successive derivatives are drawings of
   their own. Formulas sit in their own <text> (left to right in every
   language); words go through <Label>. Spanish writes sen and tg, Basque
   tg and arctg, English and Arabic tan and arctan. Exported for 2.º
   Sociales, which has the same topic.
   ========================================================================== */

const INK = 'var(--ink, #1d2733)'
const MUTED = 'var(--muted, #58616e)'
const STAGE = 'var(--stage, #2f6fdb)'
const STAGE_TINT = 'var(--stage-tint, #dde7f7)'
const SECOND = 'var(--second, #c4432a)'
const GREEN = 'var(--success, #267b53)'
const VIOLET = '#7a4fc9'
const PAPER = '#fffcf6'
const CARD = 'var(--card, #fffcf6)'
const SERIF = 'Fraunces, serif'

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const line = (m: number, n: number) => (x: number) => m * x + n

/** The names of the trigonometric and arc functions in each language */
const names = (language: UnitLanguage) => ({
    sin: language === 'es' ? 'sen' : 'sin',
    tan: language === 'es' || language === 'eu' ? 'tg' : 'tan',
    arcsin: language === 'es' ? 'arcsen' : 'arcsin',
    arctan: language === 'es' || language === 'eu' ? 'arctg' : 'arctan'
})

/** A formula written left to right whatever the language */
function F({ x, y, children, size = 19, color = INK, anchor = 'start', weight = 700 }: { x: number; y: number; children: ReactNode; size?: number; color?: string; anchor?: 'start' | 'middle' | 'end'; weight?: number }) {
    return <text x={x} y={y} textAnchor={anchor} fontSize={size} fontWeight={weight} fill={color} direction="ltr">{children}</text>
}

/** A raised piece of a formula (an exponent), back to the line afterwards */
const up = (text: string) => <><tspan dy={-9} fontSize="68%">{text}</tspan><tspan dy={9}>{' '}</tspan></>

/* ---------- 1. Review: tangent and normal to x³ − 2x at x = 1 ---------- */

export function ReviewTangentFigure({ language }: { language: UnitLanguage }) {
    return (
        <LimitPlot
            language={language}
            height={304}
            label={say('y = x³ − 2x: zuzen ukitzailea y = x − 2 eta normala y = −x, (1, −1) puntuan', 'y = x³ − 2x: la tangente y = x − 2 y la normal y = −x en (1, −1)', 'y = x³ − 2x: المماس y = x − 2 والعمودي y = −x عند (1, −1)', 'y = x³ − 2x: the tangent y = x − 2 and the normal y = −x at (1, −1)')}
            box={{ xMin: -3, xMax: 3, yMin: -4, yMax: 3 }}
            cell={34}
            curves={[
                { fn: (x) => x ** 3 - 2 * x, from: -3, to: 3 },
                { fn: line(1, -2), from: -2, to: 3, color: SECOND, width: 3 },
                { fn: line(-1, 0), from: -3, to: 3, color: GREEN, width: 3, dashed: true }
            ]}
            dots={[{ at: [1, -1], color: INK }]}
            notes={[
                { y: 72, formula: 'f(x) = x³ − 2x', color: STAGE },
                { y: 112, formula: 'f′(1) = 1', color: INK },
                { y: 158, formula: 'y = x − 2', color: SECOND },
                { y: 188, text: say('zuzen ukitzailea', 'tangente', 'المماس', 'tangent'), color: SECOND, size: 16 },
                { y: 234, formula: 'y = −x', color: GREEN },
                { y: 264, text: say('normala', 'normal', 'العمودي', 'normal'), color: GREEN, size: 16 }
            ]}
            notesX={300}
        />
    )
}

/* ---------- 2. Review: the three rules ---------- */

export function RulesFigure({ language }: { language: UnitLanguage }) {
    const t = (text: LocalizedText) => pickText(language, text)
    const rows: Array<[LocalizedText, string, string]> = [
        [say('Biderkadura', 'Producto', 'الجداء', 'Product'), '(u · v)′ = u′v + uv′', STAGE],
        [say('Zatidura', 'Cociente', 'خارج القسمة', 'Quotient'), '(u / v)′ = (u′v − uv′) / v²', VIOLET],
        [say('Katea', 'Cadena', 'السلسلة', 'Chain'), '(f(g(x)))′ = f′(g(x)) · g′(x)', SECOND]
    ]
    return (
        <Figure height={420} label={t(say('Hiru erregelak: biderkadura, zatidura eta katea', 'Las tres reglas: producto, cociente y cadena', 'القواعد الثلاث: الجداء وخارج القسمة والسلسلة', 'The three rules: product, quotient and chain'))}>
            {rows.map(([name, formula, color], index) => {
                const y = 16 + index * 124
                return (
                    <g key={formula}>
                        <rect x={30} y={y} width={660} height={110} rx={16} fill={PAPER} stroke={color} strokeWidth={2.6} />
                        <Label x={360} y={y + 38} textAnchor="middle" fontSize={25} fontWeight={700} fill={color}>{t(name)}</Label>
                        <F x={360} y={y + 86} anchor="middle" size={31}>{formula}</F>
                    </g>
                )
            })}
            <Label x={360} y={406} textAnchor="middle" fontSize={24} fill={MUTED}>{t(say('Lehenik, begiratu funtzioaren forma', 'Primero, mira la forma de la función', 'انظر أولًا إلى شكل الدالة', 'First, look at the shape of the function'))}</Label>
        </Figure>
    )
}

/* ---------- 3. A joint that is continuous but has a corner ---------- */

export function CornerJoinFigure({ language }: { language: UnitLanguage }) {
    return (
        <LimitPlot
            language={language}
            height={304}
            label={say('x² eta 3x − 2 zatiak (1, 1) puntuan elkartzen dira, 2 eta 3 maldekin: punta bat', 'Los trozos x² y 3x − 2 se unen en (1, 1) con pendientes 2 y 3: un pico', 'يلتقي الجزآن x² و3x − 2 عند (1, 1) بميلين 2 و3: زاوية', 'The pieces x² and 3x − 2 meet at (1, 1) with slopes 2 and 3: a corner')}
            box={{ xMin: -1, xMax: 3, yMin: -1, yMax: 5 }}
            cell={40}
            curves={[
                { fn: (x) => x * x, from: -1, to: 1 },
                { fn: line(3, -2), from: 1, to: 3 },
                { fn: line(2, -1), from: 0.1, to: 2.4, color: VIOLET, width: 2.6, dashed: true },
                { fn: line(3, -2), from: 0.2, to: 1, color: SECOND, width: 2.6, dashed: true }
            ]}
            dots={[{ at: [1, 1], color: INK }]}
            notes={[
                { y: 76, formula: 'f′(1⁻) = 2', color: VIOLET, size: 21 },
                { y: 120, formula: 'f′(1⁺) = 3', color: SECOND, size: 21 },
                { y: 176, text: say('jarraitua da,', 'es continua,', 'متصلة،', 'it is continuous,'), size: 17 },
                { y: 206, text: say('baina punta bat du', 'pero tiene un pico', 'لكن فيها زاوية', 'but it has a corner'), size: 17 }
            ]}
            notesX={250}
        />
    )
}

/* ---------- 4. |x² − 4|: two corners where the inside is 0 ---------- */

export function AbsoluteFigure({ language }: { language: UnitLanguage }) {
    return (
        <LimitPlot
            language={language}
            height={262}
            label={say('y = |x² − 4|: azpiko zatia gora islatzen da, eta puntak daude x = −2 eta x = 2 puntuetan', 'y = |x² − 4|: la parte de abajo se refleja hacia arriba y hay picos en x = −2 y x = 2', 'y = |x² − 4|: ينعكس الجزء السفلي إلى الأعلى وتوجد زاويتان عند x = −2 وx = 2', 'y = |x² − 4|: the lower part is reflected upwards and there are corners at x = −2 and x = 2')}
            box={{ xMin: -4, xMax: 4, yMin: -2, yMax: 4 }}
            cell={28}
            units={[1, 2]}
            curves={[
                { fn: (x) => x * x - 4, from: -2, to: 2, color: MUTED, width: 2.4, dashed: true },
                { fn: (x) => Math.abs(x * x - 4), from: -4, to: 4 }
            ]}
            dots={[{ at: [-2, 0], color: SECOND }, { at: [2, 0], color: SECOND }]}
            notes={[
                { y: 76, formula: 'y = |x² − 4|', color: STAGE },
                { y: 126, formula: 'x = ±2', color: SECOND, size: 21 },
                { y: 158, text: say('bi punta', 'dos picos', 'زاويتان', 'two corners'), color: SECOND, size: 17 },
                { y: 208, formula: 'f′(2⁻) = −4', color: INK, size: 18 },
                { y: 238, formula: 'f′(2⁺) = 4', color: INK, size: 18 }
            ]}
            notesX={300}
        />
    )
}

/* ---------- 5. The parameters a = 2 and b = 4: the same height and slope ---------- */

export function ParametersFigure({ language }: { language: UnitLanguage }) {
    return (
        <LimitPlot
            language={language}
            height={330}
            label={say('x² + 2x eta 4 ln x + 3 zatiak (1, 3) puntuan elkartzen dira, y = 4x − 1 zuzen ukitzaile berarekin', 'Los trozos x² + 2x y 4 ln x + 3 se unen en (1, 3) con la misma tangente y = 4x − 1', 'يلتقي الجزآن x² + 2x و4 ln x + 3 عند (1, 3) بالمماس نفسه y = 4x − 1', 'The pieces x² + 2x and 4 ln x + 3 meet at (1, 3) with the same tangent y = 4x − 1')}
            box={{ xMin: -2, xMax: 4, yMin: -2, yMax: 8 }}
            cell={26}
            curves={[
                { fn: (x) => x * x + 2 * x, from: -2, to: 1 },
                { fn: (x) => 4 * Math.log(x) + 3, from: 1, to: 4, color: VIOLET },
                { fn: line(4, -1), from: 0.2, to: 2, color: SECOND, width: 2.6, dashed: true }
            ]}
            dots={[{ at: [1, 3], color: INK }]}
            notes={[
                { y: 76, formula: 'x² + ax', color: STAGE },
                { y: 110, formula: 'b ln x + 3', color: VIOLET },
                { y: 160, formula: 'a = 2   b = 4', color: GREEN, size: 21 },
                { y: 208, formula: 'f′(1) = 4', color: SECOND },
                { y: 254, text: say('altuera bera, malda bera', 'misma altura, misma pendiente', 'الارتفاع نفسه والميل نفسه', 'same height, same slope'), size: 16 }
            ]}
            notesX={250}
        />
    )
}

/* ---------- 6. Three layers, three factors ---------- */

export function LayersFigure({ language }: { language: UnitLanguage }) {
    const t = (text: LocalizedText) => pickText(language, text)
    const { sin } = names(language)
    const rows: Array<[string, string, LocalizedText, ReactNode, string]> = [
        [STAGE, STAGE_TINT, say('Kanpokoa', 'Fuera', 'الخارجية', 'Outside'), <>( ){up('2')}</>, `2 ${sin}(3x)`],
        [VIOLET, '#ece4f8', say('Erdikoa', 'En medio', 'الوسطى', 'Middle'), `${sin}( )`, 'cos(3x)'],
        [GREEN, '#d9efe2', say('Barrukoa', 'Dentro', 'الداخلية', 'Inside'), '3x', '3']
    ]
    return (
        <Figure height={430} label={t(say('sin²(3x) funtzioaren hiru geruzak eta haien hiru faktoreak', 'Las tres capas de sen²(3x) y sus tres factores', 'الطبقات الثلاث للدالة sin²(3x) وعواملها الثلاثة', 'The three layers of sin²(3x) and their three factors'))}>
            {rows.map(([color, fill, name, layer, factor], index) => {
                const y = 16 + index * 96
                return (
                    <g key={factor}>
                        <rect x={30} y={y} width={360} height={82} rx={16} fill={fill} stroke={color} strokeWidth={2.6} />
                        <Label x={210} y={y + 30} textAnchor="middle" fontSize={22} fill={MUTED}>{t(name)}</Label>
                        <F x={210} y={y + 66} anchor="middle" size={30}>{layer}</F>
                        <text x={430} y={y + 52} textAnchor="middle" fontSize={30} fill={INK}>→</text>
                        <F x={580} y={y + 52} anchor="middle" size={30} color={color}>{factor}</F>
                    </g>
                )
            })}
            <rect x={30} y={318} width={660} height={92} rx={16} fill={PAPER} stroke={SECOND} strokeWidth={2.6} />
            <F x={360} y={354} anchor="middle" size={28} color={SECOND}>{`f′(x) = 2 ${sin}(3x)`}</F>
            <F x={360} y={394} anchor="middle" size={28} color={SECOND}>{'· cos(3x) · 3'}</F>
        </Figure>
    )
}

/* ---------- 7. The table of composite functions ---------- */

export function TableFigure({ language }: { language: UnitLanguage }) {
    const t = (text: LocalizedText) => pickText(language, text)
    const n = names(language)
    const rows: Array<[ReactNode, ReactNode]> = [
        [<>u{up('n')}</>, <>n · u{up('n − 1')} · u′</>],
        ['√u', 'u′ / (2√u)'],
        [<>e{up('u')}</>, <>e{up('u')} · u′</>],
        ['ln u', 'u′ / u'],
        [`${n.sin} u`, 'cos u · u′'],
        [`cos u`, `−${n.sin} u · u′`],
        [`${n.tan} u`, 'u′ / cos² u'],
        [`${n.arcsin} u`, 'u′ / √(1 − u²)'],
        [`${n.arctan} u`, 'u′ / (1 + u²)']
    ]
    return (
        <Figure height={640} label={t(say('Funtzio konposatuen deribatuen taula: errenkada bakoitza bider u′', 'La tabla de derivadas de las compuestas: cada fila por u′', 'جدول مشتقات الدوال المركبة: كل سطر مضروب في u′', 'The table of derivatives of composite functions: each row times u′'))}>
            {rows.map(([fn, derivative], index) => {
                const y = 16 + index * 64
                const highlight = index === rows.length - 1
                return (
                    <g key={index}>
                        <rect x={30} y={y} width={660} height={56} rx={14} fill={highlight ? '#f6d8cf' : index % 2 ? PAPER : STAGE_TINT} stroke={highlight ? SECOND : INK} strokeWidth={highlight ? 2.6 : 1.8} />
                        <F x={56} y={y + 38} size={29}>{fn}</F>
                        <text x={262} y={y + 38} textAnchor="middle" fontSize={29} fill={SECOND}>→</text>
                        <F x={300} y={y + 38} size={29} color={STAGE}>{derivative}</F>
                    </g>
                )
            })}
            <Label x={360} y={622} textAnchor="middle" fontSize={26} fill={MUTED}>{t(say('beti bider u′', 'siempre por u′', 'دائمًا في u′', 'always times u′'))}</Label>
        </Figure>
    )
}

/* ---------- 8. The ladder of successive derivatives of 1/(x + 1) ---------- */

export function HigherOrderFigure({ language }: { language: UnitLanguage }) {
    const t = (text: LocalizedText) => pickText(language, text)
    const rows: Array<[string, string, string, string]> = [
        ['f', '+', '1', '−1'],
        ['f′', '−', '1', '−2'],
        ['f″', '+', '2', '−3'],
        ['f‴', '−', '6', '−4']
    ]
    return (
        <Figure height={530} label={t(say('1/(x + 1) funtzioaren deribatuak: zeinua txandakatzen da, koefizientea n! da eta berretzailea −(n + 1)', 'Las derivadas de 1/(x + 1): el signo alterna, el coeficiente es n! y el exponente −(n + 1)', 'مشتقات 1/(x + 1): تتناوب الإشارة، والمعامل n!، والأس −(n + 1)', 'The derivatives of 1/(x + 1): the sign alternates, the coefficient is n! and the exponent is −(n + 1)'))}>
            {rows.map(([name, sign, coefficient, exponent], index) => {
                const y = 16 + index * 68
                return (
                    <g key={name}>
                        <rect x={30} y={y} width={660} height={58} rx={14} fill={index % 2 ? PAPER : STAGE_TINT} stroke={INK} strokeWidth={1.8} />
                        <F x={60} y={y + 40} size={30}>{name} =</F>
                        <F x={170} y={y + 40} size={32} color={SECOND}>{sign}</F>
                        <F x={210} y={y + 40} size={30} color={STAGE}>{coefficient}</F>
                        <F x={246} y={y + 40} size={30}>· (x + 1)<tspan dy={-12} fontSize="70%" fill={GREEN}>{exponent}</tspan></F>
                    </g>
                )
            })}
            <rect x={30} y={290} width={660} height={64} rx={14} fill="#f6d8cf" stroke={SECOND} strokeWidth={2.6} />
            <F x={60} y={334} size={30}>f<tspan dy={-12} fontSize="70%">(n)</tspan><tspan dy={12}> = </tspan><tspan fill={SECOND}>(−1)</tspan><tspan dy={-12} fontSize="70%" fill={SECOND}>n</tspan><tspan dy={12} fill={STAGE}> n!</tspan> · (x + 1)<tspan dy={-12} fontSize="70%" fill={GREEN}>−(n + 1)</tspan></F>
            <Label x={360} y={404} textAnchor="middle" fontSize={27} fontWeight={700} fill={SECOND}>{t(say('zeinua txandakatzen da', 'el signo alterna', 'تتناوب الإشارة', 'the sign alternates'))}</Label>
            <F x={360} y={450} anchor="middle" size={28} color={STAGE}>1, 1, 2, 6 = n!</F>
            <Label x={360} y={498} textAnchor="middle" fontSize={27} fontWeight={700} fill={GREEN}>{t(say('berretzailea jaisten da', 'el exponente baja', 'ينزل الأس', 'the exponent goes down'))}</Label>
        </Figure>
    )
}

/* ---------- 9. f = x³ + x and its inverse, mirror images in y = x ---------- */

/** The inverse of x³ + x (increasing everywhere), by Newton's method */
function inverseCubic(y: number) {
    let x = Math.cbrt(y)
    for (let step = 0; step < 30; step++) x -= (x ** 3 + x - y) / (3 * x * x + 1)
    return x
}

export function InverseFigure({ language }: { language: UnitLanguage }) {
    return (
        <LimitPlot
            language={language}
            height={296}
            label={say('f(x) = x³ + x eta haren alderantzizkoa, y = x zuzenarekiko simetrikoak: maldak 4 eta 1/4', 'f(x) = x³ + x y su inversa, simétricas respecto a y = x: pendientes 4 y 1/4', 'f(x) = x³ + x ودالتها العكسية متناظرتان بالنسبة إلى y = x: الميلان 4 و1/4', 'f(x) = x³ + x and its inverse, symmetric about y = x: slopes 4 and 1/4')}
            box={{ xMin: -1, xMax: 4, yMin: -1, yMax: 4 }}
            cell={46}
            curves={[
                { fn: line(1, 0), from: -1, to: 4, color: MUTED, width: 2, dashed: true },
                { fn: (x) => x ** 3 + x, from: -1, to: 1.6 },
                { fn: inverseCubic, from: -1, to: 4, color: VIOLET },
                { fn: line(4, -2), from: 0.45, to: 1.5, color: SECOND, width: 2.6 },
                { fn: line(0.25, 0.5), from: -0.6, to: 4, color: SECOND, width: 2.6, dashed: true }
            ]}
            dots={[{ at: [1, 2], color: STAGE }, { at: [2, 1], color: VIOLET }]}
            notes={[
                { y: 72, formula: 'f(1) = 2', color: STAGE },
                { y: 104, formula: 'm = f′(1) = 4', color: SECOND, size: 18 },
                { y: 158, formula: 'f⁻¹(2) = 1', color: VIOLET },
                { y: 190, formula: 'm = 1/4', color: SECOND, size: 18 },
                { y: 244, text: say('y = x zuzenean islatuta', 'reflejadas en y = x', 'منعكستان في y = x', 'reflected in y = x'), size: 16 }
            ]}
            notesX={300}
        />
    )
}

/* ---------- 10. The circle x² + y² = 25 and its tangent at (3, 4) ---------- */

export function ImplicitFigure({ language }: { language: UnitLanguage }) {
    const t = (text: LocalizedText) => pickText(language, text)
    const box = { xMin: -6, xMax: 7, yMin: -6, yMax: 7 }
    const map = planeMap(box, 24, 30, 34)
    const [clipPath, clip] = useBoxClip(map)
    const circle = Array.from({ length: 181 }, (_, index) => {
        const angle = (index / 180) * 2 * Math.PI
        return [5 * Math.cos(angle), 5 * Math.sin(angle)] as [number, number]
    })
    const notesX = 372
    return (
        <Figure height={372} label={t(say('x² + y² = 25 zirkunferentzia eta haren zuzen ukitzailea (3, 4) puntuan, −3/4 maldarekin, erradioarekiko perpendikularra', 'La circunferencia x² + y² = 25 y su tangente en (3, 4), de pendiente −3/4, perpendicular al radio', 'الدائرة x² + y² = 25 ومماسها عند (3, 4) بميل −3/4، عمودي على نصف القطر', 'The circle x² + y² = 25 and its tangent at (3, 4), with slope −3/4, perpendicular to the radius'))}>
            <defs>{clipPath}</defs>
            <rect x={30} y={34} width={map.width} height={map.height} fill={CARD} />
            <PlaneGrid map={map} labelStep={2} />
            <AxisTitles map={map} />
            <line x1={map.x(0)} y1={map.y(0)} x2={map.x(3)} y2={map.y(4)} stroke={MUTED} strokeWidth={2} strokeDasharray="7 5" />
            <PlanePath map={map} points={circle} color={STAGE} width={3.4} clip={clip} />
            <PlaneLine map={map} m={-0.75} n={6.25} color={SECOND} width={2.8} clip={clip} />
            <PlanePoint map={map} point={[3, 4]} color={INK} radius={6} />
            <F x={notesX} y={70} color={STAGE} size={27}>x² + y² = 25</F>
            <F x={notesX} y={122} size={25}>2x + 2y · y′ = 0</F>
            <F x={notesX} y={174} color={SECOND} size={27}>y′ = −x / y</F>
            <F x={notesX} y={216} color={SECOND} size={27}>= −3/4</F>
            <Label x={notesX} y={270} fontSize={22} fill={MUTED}>{t(say('erradioarekiko', 'perpendicular', 'عمودي على', 'perpendicular'))}</Label>
            <Label x={notesX} y={300} fontSize={22} fill={MUTED}>{t(say('perpendikularra', 'al radio', 'نصف القطر', 'to the radius'))}</Label>
        </Figure>
    )
}

/* ---------- 11. y = xˣ: the tangent at (1, 1) and the lowest point ---------- */

export function LogarithmicFigure({ language }: { language: UnitLanguage }) {
    return (
        <LimitPlot
            language={language}
            height={282}
            label={say('y = xˣ: zuzen ukitzailea (1, 1) puntuan 1 maldarekin, eta malda 0 da x = 1/e puntuan', 'y = xˣ: tangente en (1, 1) con pendiente 1, y pendiente 0 en x = 1/e', 'y = xˣ: المماس عند (1, 1) بميل 1، والميل 0 عند x = 1/e', 'y = xˣ: the tangent at (1, 1) with slope 1, and slope 0 at x = 1/e')}
            box={{ xMin: 0, xMax: 5, yMin: 0, yMax: 5 }}
            cell={42}
            units={[0.5, 1]}
            curves={[
                { fn: (x) => x ** x, from: 0.01, to: 2.15 },
                { fn: line(1, 0), from: 0, to: 2.4, color: SECOND, width: 2.6 }
            ]}
            dots={[{ at: [1, 1], color: SECOND }, { at: [1 / Math.E, Math.exp(-1 / Math.E)], color: GREEN }]}
            notes={[
                { y: 74, formula: 'y = xˣ', color: STAGE, size: 22 },
                { y: 120, formula: 'y′ = xˣ (ln x + 1)', color: INK, size: 18 },
                { y: 166, formula: 'y′(1) = 1', color: SECOND },
                { y: 212, formula: 'x = 1/e :  y′ = 0', color: GREEN, size: 18 }
            ]}
            notesX={300}
        />
    )
}

/* ---------- 12. a = 1, b = 2: the tangent y = 5x − 2 at x = 1 ---------- */

export function CoefficientsFigure({ language }: { language: UnitLanguage }) {
    return (
        <LimitPlot
            language={language}
            height={326}
            label={say('f(x) = x³ + 2x eta haren zuzen ukitzailea y = 5x − 2, (1, 3) puntuan', 'f(x) = x³ + 2x y su tangente y = 5x − 2 en (1, 3)', 'f(x) = x³ + 2x ومماسها y = 5x − 2 عند (1, 3)', 'f(x) = x³ + 2x and its tangent y = 5x − 2 at (1, 3)')}
            box={{ xMin: -4, xMax: 5, yMin: -3, yMax: 7 }}
            cell={26}
            units={[0.5, 1]}
            curves={[
                { fn: (x) => x ** 3 + 2 * x, from: -2, to: 2.5 },
                { fn: line(5, -2), from: -0.3, to: 1.8, color: SECOND, width: 2.8 }
            ]}
            dots={[{ at: [1, 3], color: INK }]}
            notes={[
                { y: 74, formula: 'f(1) = 3', color: INK },
                { y: 106, formula: 'a + b = 3', color: STAGE, size: 18 },
                { y: 150, formula: 'f′(1) = 5', color: INK },
                { y: 182, formula: '3a + b = 5', color: STAGE, size: 18 },
                { y: 230, formula: 'a = 1   b = 2', color: GREEN, size: 21 },
                { y: 274, formula: 'y = 5x − 2', color: SECOND }
            ]}
            notesX={300}
        />
    )
}

/* ---------- 13. Two tangents to x² from P(1, −3) ---------- */

export function ExteriorPointFigure({ language }: { language: UnitLanguage }) {
    return (
        <LimitPlot
            language={language}
            height={290}
            label={say('P(1, −3) puntutik y = x² parabolaren bi zuzen ukitzaile: y = 6x − 9 eta y = −2x − 1', 'Desde P(1, −3), dos tangentes a la parábola y = x²: y = 6x − 9 e y = −2x − 1', 'من P(1, −3) مماسان للقطع المكافئ y = x²: y = 6x − 9 وy = −2x − 1', 'From P(1, −3), two tangents to the parabola y = x²: y = 6x − 9 and y = −2x − 1')}
            box={{ xMin: -3, xMax: 4, yMin: -2, yMax: 5 }}
            cell={32}
            units={[1, 2]}
            curves={[
                { fn: (x) => x * x, from: -3.2, to: 3.3 },
                { fn: line(6, -9), from: 0.4, to: 3.3, color: SECOND, width: 2.6 },
                { fn: line(-2, -1), from: -2.6, to: 1.6, color: VIOLET, width: 2.6 }
            ]}
            dots={[{ at: [1, -3], color: INK, name: 'P' }, { at: [3, 9], color: SECOND }, { at: [-1, 1], color: VIOLET }]}
            notes={[
                { y: 74, formula: 'c² − 2c − 3 = 0', color: INK, size: 18 },
                { y: 124, formula: 'c = 3', color: SECOND, size: 21 },
                { y: 154, formula: 'y = 6x − 9', color: SECOND, size: 18 },
                { y: 204, formula: 'c = −1', color: VIOLET, size: 21 },
                { y: 234, formula: 'y = −2x − 1', color: VIOLET, size: 18 }
            ]}
            notesX={310}
        />
    )
}

/* ---------- 14. y = ex touches eˣ at (1, e) ---------- */

export function TangentCurvesFigure({ language }: { language: UnitLanguage }) {
    return (
        <LimitPlot
            language={language}
            height={318}
            label={say('y = ex zuzenak y = eˣ kurba ukitzen du (1, e) puntuan: altuera bera eta malda bera', 'La recta y = ex toca a la curva y = eˣ en (1, e): misma altura y misma pendiente', 'المستقيم y = ex يمسّ المنحنى y = eˣ عند (1, e): الارتفاع نفسه والميل نفسه', 'The line y = ex touches the curve y = eˣ at (1, e): same height and same slope')}
            box={{ xMin: -3, xMax: 3, yMin: -2, yMax: 7 }}
            cell={28}
            curves={[
                { fn: Math.exp, from: -3, to: 2.1 },
                { fn: line(Math.E, 0), from: -0.8, to: 2.6, color: SECOND, width: 2.8 }
            ]}
            dots={[{ at: [1, Math.E], color: INK }]}
            notes={[
                { y: 74, formula: 'y = eˣ', color: STAGE, size: 22 },
                { y: 116, formula: 'y = kx', color: SECOND, size: 22 },
                { y: 166, formula: 'eᶜ = kc     eᶜ = k', color: INK, size: 18 },
                { y: 212, formula: 'c = 1   k = e', color: GREEN, size: 21 },
                { y: 258, text: say('altuera bera, malda bera', 'misma altura, misma pendiente', 'الارتفاع نفسه والميل نفسه', 'same height, same slope'), size: 16 }
            ]}
            notesX={260}
        />
    )
}

/* ---------- Hero ---------- */

export function Bach2DerivativesHeroArt() {
    return (
        <div className="fraction-v2-collage" aria-hidden="true">
            <svg viewBox="0 0 520 400" direction="ltr" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                <g transform="translate(22 26) rotate(-4)">
                    <rect width={272} height={214} rx={16} fill={PAPER} stroke={INK} strokeWidth={2} />
                    <line x1={20} y1={180} x2={256} y2={180} stroke={INK} strokeWidth={2} />
                    <line x1={40} y1={198} x2={40} y2={16} stroke={INK} strokeWidth={2} />
                    <path d="M44 60 L 136 150 L 248 40" fill="none" stroke="#2f6fdb" strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx={136} cy={150} r={7} fill="#c4432a" />
                    <line x1={96} y1={190} x2={190} y2={96} stroke="#7a4fc9" strokeWidth={3} strokeDasharray="7 5" />
                </g>
                <g transform="translate(318 44) rotate(5)">
                    <rect width={184} height={124} rx={16} fill="#d9efe2" stroke={INK} strokeWidth={2} />
                    <text x={92} y={56} textAnchor="middle" fontSize={22} fontWeight={700} fill={INK} fontFamily={SERIF}>x² + y² = 25</text>
                    <text x={92} y={98} textAnchor="middle" fontSize={24} fontWeight={700} fill={INK} fontFamily={SERIF}>y′ = −x / y</text>
                </g>
                <g transform="translate(56 274) rotate(2)">
                    <rect width={408} height={90} rx={16} fill="#f6d8cf" stroke={INK} strokeWidth={2} />
                    <text x={204} y={58} textAnchor="middle" fontSize={28} fontWeight={700} fill={INK} fontFamily={SERIF}>(f⁻¹)′(b) = 1 / f′(a)</text>
                </g>
            </svg>
        </div>
    )
}
