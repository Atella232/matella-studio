import type { ReactNode } from 'react'
import { pickText, type LocalizedText, type UnitLanguage } from '../../features/unit-v2/types'
import { AxisTitles, Label, PlaneGrid, PlaneLine, PlanePath, PlanePoint } from '../dbh2-funtzioak-v2/plane'
import { useBoxClip } from '../dbh2-funtzioak-v2/planeClip'
import { planeMap, type PlaneBox, type PlaneMap } from '../dbh2-funtzioak-v2/planeMap'
import { Figure } from '../dbh2-zatikiak-prototype/figures'
import { sampled } from '../dbh4-aplikatuak-funtzioak/functions'

/* ==========================================================================
   Funtzio elementalak · Batxilergoa 1 · Gizarte Zientziak — the new lesson
   figures, each one the «Let's solve» of its lesson already solved: the
   area of a rectangle of perimeter 20, interpolating and extrapolating a
   school's students, two phone tariffs, the revenue of a price, the
   parabola through three points, the average cost falling towards 5, a car
   park and a copy shop. Every plane counts in grid squares; xUnit and yUnit
   say what a square is worth. Formulas sit in their own <text> (left to
   right in every language); words go through <Label>.
   ========================================================================== */

const INK = 'var(--ink, #1d2733)'
const MUTED = 'var(--muted, #58616e)'
const STAGE = 'var(--stage, #2f6fdb)'
const STAGE_TINT = 'var(--stage-tint, #dde7f7)'
const SECOND = 'var(--second, #c4432a)'
const GREEN = 'var(--success, #267b53)'
const MUSTARD = 'var(--mustard, #e0a100)'
const CARD = 'var(--card, #fffcf6)'

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const useText = (language: UnitLanguage) => (text: LocalizedText) => pickText(language, text)
/** A decimal of a formula, with the comma or the point of the language */
const decimal = (language: UnitLanguage, text: string) => (language === 'en' || language === 'ar' ? text.replace(/,/g, '.') : text)
/** A four-digit number of a formula: English writes 2,500 and the others 2500 */
const four = (language: UnitLanguage, value: number) => (language === 'en' ? value.toLocaleString('en-US') : String(value))

/** A formula written left to right whatever the language */
function F({ x, y, children, size = 19, color = INK, anchor = 'start', weight = 700 }: { x: number; y: number; children: ReactNode; size?: number; color?: string; anchor?: 'start' | 'middle' | 'end'; weight?: number }) {
    return <text x={x} y={y} textAnchor={anchor} fontSize={size} fontWeight={weight} fill={color} direction="ltr">{children}</text>
}

/** Words beside a figure, right to left in Arabic */
function Words({ x, y, children, color = INK, size = 16 }: { x: number; y: number; children: string; color?: string; size?: number }) {
    return <Label x={x} y={y} fontSize={size} fill={color}>{children}</Label>
}

/** A Cartesian plane placed at (ox, oy) inside a figure */
function Frame({ box, cell, ox, oy, labelStep = 1, xUnit = 1, yUnit = 1, xTitle, yTitle, children }: { box: PlaneBox; cell: number; ox: number; oy: number; labelStep?: number; xUnit?: number; yUnit?: number; xTitle?: string; yTitle?: string; children?: (map: PlaneMap, clip: string) => ReactNode }) {
    const map = planeMap(box, cell, ox, oy)
    const [clipPath, clip] = useBoxClip(map)
    return (
        <g>
            <defs>{clipPath}</defs>
            <rect x={ox} y={oy} width={map.width} height={map.height} fill={CARD} />
            <PlaneGrid map={map} labelStep={labelStep} xUnit={xUnit} yUnit={yUnit} />
            <AxisTitles map={map} xTitle={xTitle} yTitle={yTitle} />
            {children?.(map, clip)}
        </g>
    )
}

/* ---------- 1.3 The area of a rectangle of perimeter 20 ---------- */

export function AreaFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    // x in units of 1 m, y in units of 5 m²
    const area = (x: number) => (10 * x - x * x) / 5
    return (
        <Figure height={330} label={t(say('A(x) = 10x − x² azalera: izate-eremua (0, 10) eta ibiltartea (0, 25]', 'Área A(x) = 10x − x²: dominio (0, 10) y recorrido (0, 25]', 'المساحة A(x) = 10x − x²: المجال (0, 10) والمدى (0, 25]', 'Area A(x) = 10x − x²: domain (0, 10) and range (0, 25]'))}>
            <Frame box={{ xMin: 0, xMax: 11, yMin: 0, yMax: 6 }} cell={34} ox={40} oy={40} labelStep={2} yUnit={5}>
                {(map, clip) => (
                    <g>
                        <line x1={map.x(0)} y1={map.y(0)} x2={map.x(10)} y2={map.y(0)} stroke={MUSTARD} strokeWidth={8} opacity={0.55} />
                        <line x1={map.x(0)} y1={map.y(0)} x2={map.x(0)} y2={map.y(5)} stroke={GREEN} strokeWidth={8} opacity={0.45} />
                        <PlanePath map={map} points={sampled(area, 0, 10, 0.05)} color={STAGE} width={4} clip={clip} />
                        <PlanePoint map={map} point={[0, 0]} color={STAGE} radius={6} hollow />
                        <PlanePoint map={map} point={[10, 0]} color={STAGE} radius={6} hollow />
                        <PlanePoint map={map} point={[5, 5]} color={SECOND} radius={6.5} />
                    </g>
                )}
            </Frame>
            <F x={460} y={76} color={STAGE}>A(x) = 10x − x²</F>
            <Words x={460} y={124} color={MUSTARD}>{t(say('Izate-eremua', 'Dominio', 'المجال', 'Domain'))}</Words>
            <F x={460} y={152} color={MUSTARD}>0 &lt; x &lt; 10</F>
            <Words x={460} y={200} color={GREEN}>{t(say('Ibiltartea', 'Recorrido', 'المدى', 'Range'))}</Words>
            <F x={460} y={228} color={GREEN}>0 &lt; A ≤ 25</F>
            <F x={460} y={276} color={SECOND}>A(5) = 25</F>
        </Figure>
    )
}

/* ---------- 2.2 Interpolating and extrapolating ---------- */

export function InterpolationFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    // x in years, y in units of 50 students
    const line = (x: number) => (240 + 15 * x) / 50
    return (
        <Figure height={340} label={t(say('Bi datuen zuzena: 2 urtean interpolatzen da, eta 12 urtean estrapolatzen', 'La recta de dos datos: en 2 años se interpola y en 12 años se extrapola', 'مستقيم بيانتين: عند سنتين نستوفي وعند 12 سنة نستقرئ خارجيًّا', 'The line of two data: at 2 years we interpolate and at 12 years we extrapolate'))}>
            <Frame box={{ xMin: 0, xMax: 13, yMin: 0, yMax: 9 }} cell={28} ox={40} oy={30} labelStep={2} yUnit={50}>
                {(map, clip) => (
                    <g>
                        <rect x={map.x(0)} y={map.y(9)} width={map.x(4) - map.x(0)} height={map.height} fill={STAGE_TINT} opacity={0.8} />
                        <rect x={map.x(4)} y={map.y(9)} width={map.x(13) - map.x(4)} height={map.height} fill={SECOND} opacity={0.08} />
                        <PlanePath map={map} points={[[0, line(0)], [4, line(4)]]} color={STAGE} width={4} clip={clip} />
                        <PlanePath map={map} points={[[4, line(4)], [13, line(13)]]} color={SECOND} width={3} dashed clip={clip} />
                        <PlanePoint map={map} point={[0, line(0)]} color={INK} radius={6} />
                        <PlanePoint map={map} point={[4, line(4)]} color={INK} radius={6} />
                        <PlanePoint map={map} point={[2, line(2)]} color={GREEN} radius={6.5} />
                        <PlanePoint map={map} point={[12, line(12)]} color={SECOND} radius={6.5} />
                    </g>
                )}
            </Frame>
            <F x={430} y={66} color={STAGE}>y = 240 + 15x</F>
            <Words x={430} y={112} color={GREEN}>{t(say('Interpolazioa', 'Interpolación', 'الاستيفاء', 'Interpolation'))}</Words>
            <F x={430} y={140} color={GREEN}>x = 2 → 270</F>
            <Words x={430} y={188} color={SECOND}>{t(say('Estrapolazioa', 'Extrapolación', 'الاستقراء الخارجي', 'Extrapolation'))}</Words>
            <F x={430} y={216} color={SECOND}>x = 12 → 420</F>
            <Words x={430} y={264} color={MUTED}>{t(say('Urrunago, fidagarritasun gutxiago', 'Más lejos, menos fiable', 'كلما ابتعدنا قلّت الثقة', 'Further away, less reliable'))}</Words>
        </Figure>
    )
}

/* ---------- 2.3 Two tariffs ---------- */

export function TariffLinesFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    // x in units of 20 minutes, y in units of 10 euros
    return (
        <Figure height={330} label={t(say('A eta B tarifak 100 minututan ebakitzen dira, 30 € balioarekin', 'Las tarifas A y B se cortan en 100 minutos, con 30 €', 'تتقاطع التعرفتان A وB عند 100 دقيقة بقيمة 30 €', 'Tariffs A and B cross at 100 minutes, at €30'))}>
            <Frame box={{ xMin: 0, xMax: 10, yMin: 0, yMax: 6 }} cell={36} ox={40} oy={40} xUnit={20} yUnit={10}>
                {(map, clip) => (
                    <g>
                        <PlaneLine map={map} m={0.2} n={2} color={STAGE} width={4} clip={clip} />
                        <PlaneLine map={map} m={0.6} n={0} color={SECOND} width={4} clip={clip} />
                        <PlanePoint map={map} point={[5, 3]} color={INK} radius={6.5} />
                    </g>
                )}
            </Frame>
            <F x={460} y={80} color={STAGE}>{`A(x) = 20 + ${decimal(language, '0,1')}x`}</F>
            <F x={460} y={118} color={SECOND}>{`B(x) = ${decimal(language, '0,3')}x`}</F>
            <F x={460} y={174} color={INK}>(100, 30)</F>
            <Words x={460} y={222} color={MUTED}>{t(say('Ezkerrean, B merkeagoa', 'A la izquierda, B más barata', 'إلى اليسار B أرخص', 'To the left, B is cheaper'))}</Words>
            <Words x={460} y={256} color={MUTED}>{t(say('Eskuinean, A merkeagoa', 'A la derecha, A más barata', 'إلى اليمين A أرخص', 'To the right, A is cheaper'))}</Words>
        </Figure>
    )
}

/* ---------- 3.2 The price that gives the most revenue ---------- */

export function RevenueFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    // x in units of 5 euros, y in units of 500 euros
    const revenue = (x: number) => { const p = 5 * x; return (p * (200 - 4 * p)) / 500 }
    return (
        <Figure height={340} label={t(say('I(p) = p(200 − 4p) diru-sarrerak: maximoa p = 25 denean, 2500 €', 'Ingresos I(p) = p(200 − 4p): máximo en p = 25, con 2500 €', 'الإيرادات I(p) = p(200 − 4p): القيمة العظمى عند p = 25 وهي 2500 €', 'Revenue I(p) = p(200 − 4p): greatest at p = 25, €2,500'))}>
            <Frame box={{ xMin: 0, xMax: 11, yMin: 0, yMax: 6 }} cell={32} ox={70} oy={40} labelStep={2} xUnit={5} yUnit={500}>
                {(map, clip) => (
                    <g>
                        <line x1={map.x(5)} y1={map.y(0)} x2={map.x(5)} y2={map.y(5)} stroke={MUTED} strokeWidth={2} strokeDasharray="6 5" />
                        <PlanePath map={map} points={sampled(revenue, 0, 10, 0.05)} color={STAGE} width={4} clip={clip} />
                        <PlanePoint map={map} point={[5, 5]} color={SECOND} radius={6.5} />
                        <PlanePoint map={map} point={[0, 0]} color={INK} radius={5} />
                        <PlanePoint map={map} point={[10, 0]} color={INK} radius={5} />
                    </g>
                )}
            </Frame>
            <F x={460} y={76} color={STAGE}>I(p) = −4p² + 200p</F>
            <F x={460} y={124} color={SECOND}>p = 25</F>
            <F x={460} y={160} color={SECOND}>{`I(25) = ${four(language, 2500)}`}</F>
            <Words x={460} y={210} color={MUTED}>{t(say('Merkeegi: diru gutxi', 'Demasiado barato: poco dinero', 'رخيص جدًّا: مال قليل', 'Too cheap: little money'))}</Words>
            <Words x={460} y={244} color={MUTED}>{t(say('Garestiegi: salmenta gutxi', 'Demasiado caro: pocas ventas', 'غالٍ جدًّا: مبيعات قليلة', 'Too dear: few sales'))}</Words>
        </Figure>
    )
}

/* ---------- 3.3 The parabola through three points ---------- */

export function ThreePointsFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    return (
        <Figure height={330} label={t(say('y = x² − 2x + 3 parabola (0, 3), (1, 2) eta (3, 6) puntuetatik pasatzen da', 'La parábola y = x² − 2x + 3 pasa por (0, 3), (1, 2) y (3, 6)', 'القطع المكافئ y = x² − 2x + 3 يمر بالنقاط (0, 3) و(1, 2) و(3, 6)', 'The parabola y = x² − 2x + 3 passes through (0, 3), (1, 2) and (3, 6)'))}>
            <Frame box={{ xMin: -2, xMax: 4, yMin: 0, yMax: 8 }} cell={32} ox={60} oy={30}>
                {(map, clip) => (
                    <g>
                        <PlanePath map={map} points={sampled((x) => x * x - 2 * x + 3, -2.5, 4.5, 0.02)} color={STAGE} width={4} clip={clip} />
                        <PlanePath map={map} points={[[-2, 5], [4, -1]]} color={MUTED} width={2.4} dashed clip={clip} />
                        <PlanePoint map={map} point={[0, 3]} color={SECOND} radius={6.5} />
                        <PlanePoint map={map} point={[1, 2]} color={SECOND} radius={6.5} />
                        <PlanePoint map={map} point={[3, 6]} color={SECOND} radius={6.5} />
                    </g>
                )}
            </Frame>
            <F x={330} y={70} color={STAGE}>y = 3 − x + x(x − 1)</F>
            <F x={330} y={106} color={STAGE}>y = x² − 2x + 3</F>
            <F x={330} y={156} color={SECOND}>a = 3   b = −1   c = 1</F>
            <Words x={330} y={206} color={MUTED}>{t(say('Lehen bi puntuen zuzenak (marratua)', 'La recta de los dos primeros (discontinua)', 'مستقيم النقطتين الأوليين (المتقطع)', 'The line through the first two (dashed)'))}</Words>
            <Words x={330} y={234} color={MUTED}>{t(say('ez du hirugarrena ukitzen', 'no pasa por el tercero', 'لا يمر بالثالثة', 'misses the third one'))}</Words>
        </Figure>
    )
}

/* ---------- 4.2 The average cost ---------- */

export function AverageCostFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    // x in units of 100 units, y in units of 5 euros
    const average = (x: number) => (5 + 2000 / (100 * x)) / 5
    return (
        <Figure height={340} label={t(say('M(x) = 5 + 2000/x batez besteko kostua 5 baliora jaisten da, iritsi gabe', 'El coste medio M(x) = 5 + 2000/x baja hacia 5 sin llegar', 'التكلفة المتوسطة M(x) = 5 + 2000/x تنخفض نحو 5 دون أن تبلغها', 'The average cost M(x) = 5 + 2000/x falls towards 5 without reaching it'))}>
            <Frame box={{ xMin: 0, xMax: 11, yMin: 0, yMax: 7 }} cell={32} ox={40} oy={36} labelStep={2} xUnit={100} yUnit={5}>
                {(map, clip) => (
                    <g>
                        <line x1={map.x(0)} y1={map.y(1)} x2={map.x(11)} y2={map.y(1)} stroke={SECOND} strokeWidth={2.4} strokeDasharray="7 5" />
                        <PlanePath map={map} points={sampled(average, 0.55, 11, 0.02)} color={STAGE} width={4} clip={clip} />
                        <PlanePoint map={map} point={[1, 5]} color={INK} radius={6} />
                        <PlanePoint map={map} point={[10, 7 / 5]} color={INK} radius={6} />
                    </g>
                )}
            </Frame>
            <F x={430} y={74} color={STAGE}>{`M(x) = 5 + ${four(language, 2000)}/x`}</F>
            <F x={430} y={122} color={INK}>M(100) = 25</F>
            <F x={430} y={158} color={INK}>{`M(${four(language, 1000)}) = 7`}</F>
            <Words x={430} y={206} color={SECOND}>{t(say('Asintota horizontala', 'Asíntota horizontal', 'الخط المقارب الأفقي', 'Horizontal asymptote'))}</Words>
            <F x={430} y={234} color={SECOND}>y = 5</F>
        </Figure>
    )
}

/* ---------- 5.1 A car park ---------- */

export function ParkingFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    return (
        <Figure height={330} label={t(say('Aparkalekua: 3 € 2 ordura arte, gero 2 € orduko, eta gehienez 11 €', 'Aparcamiento: 3 € hasta 2 horas, después 2 € por hora y como mucho 11 €', 'موقف سيارات: 3 € حتى ساعتين، ثم 2 € للساعة، و11 € على الأكثر', 'Car park: €3 up to 2 hours, then €2 an hour and €11 at most'))}>
            <Frame box={{ xMin: 0, xMax: 10, yMin: 0, yMax: 12 }} cell={22} ox={40} oy={30} labelStep={2}>
                {(map, clip) => (
                    <g>
                        <PlanePath map={map} points={[[0, 3], [2, 3]]} color={SECOND} width={4} clip={clip} />
                        <PlanePath map={map} points={[[2, 3], [6, 11]]} color={STAGE} width={4} clip={clip} />
                        <PlanePath map={map} points={[[6, 11], [10, 11]]} color={GREEN} width={4} clip={clip} />
                        <PlanePoint map={map} point={[0, 3]} color={SECOND} radius={5.5} hollow />
                        <PlanePoint map={map} point={[1, 3]} color={INK} radius={5.5} />
                        <PlanePoint map={map} point={[4, 7]} color={INK} radius={5.5} />
                        <PlanePoint map={map} point={[9, 11]} color={INK} radius={5.5} />
                    </g>
                )}
            </Frame>
            <F x={330} y={74} color={SECOND}>3</F>
            <F x={420} y={74} color={SECOND} weight={400}>0 &lt; x ≤ 2</F>
            <F x={330} y={112} color={STAGE}>3 + 2(x − 2)</F>
            <F x={480} y={112} color={STAGE} weight={400}>2 &lt; x ≤ 6</F>
            <F x={330} y={150} color={GREEN}>11</F>
            <F x={420} y={150} color={GREEN} weight={400}>x &gt; 6</F>
            <F x={330} y={206} color={INK}>P(1) = 3   P(4) = 7   P(9) = 11</F>
            <Words x={330} y={254} color={MUTED}>{t(say('Mugetan zatiak elkartzen dira', 'En los límites los trozos se unen', 'عند الحدود تتصل الأجزاء', 'At the thresholds the pieces join'))}</Words>
        </Figure>
    )
}

/* ---------- 5.2 A copy shop ---------- */

export function CopiesFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    // x in units of 50 copies, y in units of 5 euros
    return (
        <Figure height={330} label={t(say('Kopia-denda: 0,20 € kopiako 100 kopiara arte, eta 0,08 € hortik aurrera; 250 kopia, 32 €', 'Copistería: 0,20 € por copia hasta 100 y 0,08 € después; 250 copias, 32 €', 'محل نسخ: 0.20 € للنسخة حتى 100 و0.08 € بعدها؛ 250 نسخة بـ 32 €', 'Copy shop: €0.20 per copy up to 100 and €0.08 after; 250 copies, €32'))}>
            <Frame box={{ xMin: 0, xMax: 6, yMin: 0, yMax: 8 }} cell={32} ox={40} oy={30} xUnit={50} yUnit={5}>
                {(map, clip) => (
                    <g>
                        <PlanePath map={map} points={[[0, 0], [2, 4]]} color={STAGE} width={4} clip={clip} />
                        <PlanePath map={map} points={[[2, 4], [6, 4 + 0.08 * 200 / 5]]} color={GREEN} width={4} clip={clip} />
                        <PlanePath map={map} points={[[2, 4], [6, 12]]} color={MUTED} width={2.4} dashed clip={clip} />
                        <PlanePoint map={map} point={[2, 4]} color={INK} radius={6} />
                        <PlanePoint map={map} point={[5, 6.4]} color={SECOND} radius={6.5} />
                    </g>
                )}
            </Frame>
            <F x={330} y={74} color={STAGE}>{`${decimal(language, '0,2')}x`}</F>
            <F x={460} y={74} color={STAGE} weight={400}>0 ≤ x ≤ 100</F>
            <F x={330} y={112} color={GREEN}>{`20 + ${decimal(language, '0,08')}(x − 100)`}</F>
            <F x={330} y={146} color={GREEN} weight={400}>x &gt; 100</F>
            <F x={330} y={196} color={SECOND}>C(250) = 32</F>
            <Words x={330} y={244} color={MUTED}>{t(say('Marratua: dena 0,20 € balitz', 'Discontinua: si todo costara 0,20 €', 'المتقطع: لو كان الكل بسعر 0.20 €', 'Dashed: if everything cost €0.20'))}</Words>
        </Figure>
    )
}

/* ---------- Hero art ---------- */

export function SocFunctionsHeroArt() {
    const map = planeMap({ xMin: 0, xMax: 10, yMin: 0, yMax: 7 }, 30, 30, 44)
    return (
        <svg viewBox="0 0 360 280" role="img" aria-hidden="true" style={{ width: '100%', height: 'auto', display: 'block' }}>
            <rect x={map.x(0)} y={map.y(7)} width={map.width} height={map.height} fill={CARD} rx={6} />
            <PlaneGrid map={map} labels={false} />
            <PlanePath map={map} points={sampled((x) => 0.5 + 0.55 * x, 0, 10)} color={STAGE} width={4} />
            <PlanePath map={map} points={sampled((x) => 6 - 0.24 * (x - 5) ** 2, 0.1, 9.9)} color={SECOND} width={4} />
            <PlanePath map={map} points={sampled((x) => 1 + 2 / x, 0.4, 10)} color={GREEN} width={4} />
            <PlanePoint map={map} point={[5, 6]} color={SECOND} radius={6} />
            <PlanePoint map={map} point={[2, 1.6]} color={MUSTARD} radius={6} />
            <PlanePoint map={map} point={[6, 3.8]} color={MUSTARD} radius={6} />
        </svg>
    )
}
