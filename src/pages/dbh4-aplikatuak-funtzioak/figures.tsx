import type { ReactNode } from 'react'
import { pickText, type LocalizedText, type UnitLanguage } from '../../features/unit-v2/types'
import { Figure, Frac } from '../dbh2-zatikiak-prototype/figures'
import { AxisTitles, Label, PlaneGrid, PlanePath, PlanePoint } from '../dbh2-funtzioak-v2/plane'
import { useBoxClip } from '../dbh2-funtzioak-v2/planeClip'
import { planeMap, type PlaneBox, type PlaneMap } from '../dbh2-funtzioak-v2/planeMap'
import { sampled, smoothThrough, studyKnots, type Point } from './functions'

/* ==========================================================================
   Funtzioak · 4. DBH aplikatuak — the new lesson figures: the four ways
   of giving a function (a taxi fare), domain and range read on a graph and
   from a formula, the intercepts of y = x² − 2x − 3, increasing and
   decreasing intervals of a cubic, relative and absolute extremes, the
   average rate of change as the slope of a chord, three discontinuities,
   a periodic cistern, two tendencies, a glucose curve, a complete study
   and the box made from a 40 × 30 card. The "is it a function" test and
   f(a) reuse the 2. DBH figures. Formulas sit in their own <text> lines
   (left to right in every language); Arabic labels carry words only.
   ========================================================================== */

const INK = 'var(--ink, #1d2733)'
const MUTED = 'var(--muted, #58616e)'
const STAGE = 'var(--stage, #2f6fdb)'
const STAGE_TINT = 'var(--stage-tint, #dde7f7)'
const SECOND = 'var(--second, #c4432a)'
const MUSTARD = 'var(--mustard, #e0a100)'
const MUSTARD_TINT = 'var(--mustard-tint, #fbebc0)'
const GREEN = 'var(--success, #267b53)'
const CARD = 'var(--card, #fffcf6)'
const PAPER = '#fffcf6'
const SERIF = 'Fraunces, serif'

const say = (eu: string, es: string, ar: string): LocalizedText => ({ eu, es, ar })
const pick = (language: UnitLanguage, text: LocalizedText) => pickText(language, text)

function Caption({ y, language, text }: { y: number; language: UnitLanguage; text: LocalizedText }) {
    return <Label x={360} y={y} textAnchor="middle" fontSize={15} fill={MUTED}>{pick(language, text)}</Label>
}

/** A formula written left to right whatever the language */
function Formula({ x, y, children, size = 17, color = INK, anchor = 'start', weight = 700 }: { x: number; y: number; children: ReactNode; size?: number; color?: string; anchor?: 'start' | 'middle' | 'end'; weight?: number }) {
    return <text x={x} y={y} fontSize={size} fontWeight={weight} fill={color} textAnchor={anchor} direction="ltr">{children}</text>
}

/** A small Cartesian plane placed at (ox, oy) inside a figure */
function Frame({ box, cell, ox, oy, labelStep, labels = true, xUnit, yUnit, xTitle, yTitle, children }: {
    box: PlaneBox
    cell: number
    ox: number
    oy: number
    labelStep?: number
    labels?: boolean
    xUnit?: number
    yUnit?: number
    xTitle?: string
    yTitle?: string
    children?: (map: PlaneMap, clip: string) => ReactNode
}) {
    const map = planeMap(box, cell, ox, oy)
    const [clipPath, clip] = useBoxClip(map)
    return (
        <g>
            <defs>{clipPath}</defs>
            <rect x={ox} y={oy} width={map.width} height={map.height} fill={CARD} />
            <PlaneGrid map={map} labelStep={labelStep} labels={labels} xUnit={xUnit} yUnit={yUnit} />
            <AxisTitles map={map} xTitle={xTitle} yTitle={yTitle} />
            {children?.(map, clip)}
        </g>
    )
}

/* ---------- Ways of giving a function ---------- */

export function ExpressionsFigure({ language }: { language: UnitLanguage }) {
    const xs = [0, 1, 2, 3, 4]
    const panel = (x: number, y: number, height: number, tint: string, title: LocalizedText) => (
        <g>
            <rect x={x} y={y} width={336} height={height} rx={16} fill={tint} opacity={0.55} />
            <Label x={x + 18} y={y + 30} fontSize={16} fontWeight={700} fill={STAGE}>{pick(language, title)}</Label>
        </g>
    )
    return (
        <Figure height={410} label={pick(language, say('Taxi baten prezioa lau eratara: enuntziatua, formula, taula eta grafikoa', 'El precio de un taxi de cuatro formas: enunciado, fórmula, tabla y gráfica', 'سعر سيارة أجرة بأربع طرق: نص وصيغة وجدول ورسم'))}>
            {panel(16, 16, 140, STAGE_TINT, say('1. Enuntziatua', '1. Enunciado', '1. النص'))}
            {panel(368, 16, 140, MUSTARD_TINT, say('2. Formula', '2. Fórmula', '2. الصيغة'))}
            {panel(16, 172, 196, MUSTARD_TINT, say('3. Balio-taula', '3. Tabla de valores', '3. جدول القيم'))}
            {panel(368, 172, 196, STAGE_TINT, say('4. Grafikoa', '4. Gráfica', '4. الرسم البياني'))}
            <Label x={34} y={84} fontSize={16} fill={INK}>{pick(language, say('Taxi batek 2 € kobratzen ditu igotzean', 'Un taxi cobra 2 € al subir', 'تأخذ سيارة أجرة 2 € عند الركوب'))}</Label>
            <Label x={34} y={112} fontSize={16} fill={INK}>{pick(language, say('eta 1 € kilometro bakoitzeko.', 'y 1 € por cada kilómetro.', 'و1 € عن كل كيلومتر.'))}</Label>
            <Formula x={536} y={98} size={30} color={SECOND} anchor="middle">y = x + 2</Formula>
            <Label x={536} y={134} textAnchor="middle" fontSize={15} fill={MUTED}>{pick(language, say('x: km · y: €', 'x: km · y: €', 'x: كم · y: €'))}</Label>
            {['x', 'y'].map((name, row) => (
                <g key={name}>
                    <rect x={40} y={222 + row * 50} width={44} height={42} rx={6} fill={row === 0 ? STAGE_TINT : MUSTARD_TINT} stroke={INK} strokeWidth={1.6} />
                    <text x={62} y={250 + row * 50} textAnchor="middle" fontSize={19} fontWeight={700} fontStyle="italic" fill={INK}>{name}</text>
                    {xs.map((x, index) => (
                        <g key={x}>
                            <rect x={90 + index * 50} y={222 + row * 50} width={46} height={42} rx={6} fill={CARD} stroke={INK} strokeWidth={1.3} />
                            <text x={113 + index * 50} y={250 + row * 50} textAnchor="middle" fontSize={18} fill={INK}>{row === 0 ? x : x + 2}</text>
                        </g>
                    ))}
                </g>
            ))}
            <Label x={40} y={346} fontSize={15} fill={MUTED}>{pick(language, say('Balio batzuk bakarrik', 'Solo algunos valores', 'بعض القيم فقط'))}</Label>
            <Frame box={{ xMin: 0, xMax: 5, yMin: 0, yMax: 7 }} cell={21} ox={566} oy={198}>
                {(map, clip) => (
                    <g>
                        <PlanePath map={map} points={[[0, 2], [5, 7]]} color={SECOND} width={3} clip={clip} />
                        {xs.map((x) => <PlanePoint key={x} map={map} point={[x, x + 2]} color={STAGE} radius={4.5} />)}
                    </g>
                )}
            </Frame>
            <Label x={386} y={240} fontSize={15} fill={MUTED}>{pick(language, say('Begiratu batean', 'De un vistazo', 'بنظرة واحدة'))}</Label>
            <Caption y={396} language={language} text={say('Funtzio bera: formulak balio guztiak ematen ditu, grafikoak forma erakusten du', 'La misma función: la fórmula da todos los valores, la gráfica enseña la forma', 'الدالة نفسها: الصيغة تعطي كل القيم والرسم يُظهر الشكل')} />
        </Figure>
    )
}

/* ---------- Domain and range on a graph ---------- */

export function DomainGraphFigure({ language }: { language: UnitLanguage }) {
    const knots: Point[] = [[-4, -2], [-2, 3], [0, 1], [2, 4], [5, -1]]
    return (
        <Figure height={318} label={pick(language, say('Grafiko baten izate-eremua eta ibiltartea', 'Dominio y recorrido de una gráfica', 'مجال الرسم ومداه'))}>
            <Frame box={{ xMin: -5, xMax: 6, yMin: -3, yMax: 5 }} cell={26} ox={40} oy={34}>
                {(map) => (
                    <g>
                        <line x1={map.x(-4)} y1={map.y(0)} x2={map.x(5)} y2={map.y(0)} stroke={STAGE} strokeWidth={9} strokeLinecap="round" opacity={0.45} />
                        <line x1={map.x(0)} y1={map.y(-2)} x2={map.x(0)} y2={map.y(4)} stroke={SECOND} strokeWidth={9} strokeLinecap="round" opacity={0.4} />
                        <g stroke={MUTED} strokeWidth={1.6} strokeDasharray="5 4">
                            <line x1={map.x(-4)} y1={map.y(-2)} x2={map.x(-4)} y2={map.y(0)} />
                            <line x1={map.x(5)} y1={map.y(-1)} x2={map.x(5)} y2={map.y(0)} />
                            <line x1={map.x(2)} y1={map.y(4)} x2={map.x(0)} y2={map.y(4)} />
                            <line x1={map.x(-4)} y1={map.y(-2)} x2={map.x(0)} y2={map.y(-2)} />
                        </g>
                        <PlanePath map={map} points={smoothThrough(knots)} color={INK} width={3.4} />
                        <PlanePoint map={map} point={[-4, -2]} color={INK} radius={5} />
                        <PlanePoint map={map} point={[5, -1]} color={INK} radius={5} />
                    </g>
                )}
            </Frame>
            <Label x={380} y={66} fontSize={16} fontWeight={700} fill={STAGE}>{pick(language, say('Izate-eremua: irudia duten x-ak', 'Dominio: las x que tienen imagen', 'المجال: قيم x التي لها صورة'))}</Label>
            <Formula x={380} y={96} size={21} color={STAGE}>Dom f = [−4, 5]</Formula>
            <Label x={380} y={146} fontSize={16} fontWeight={700} fill={SECOND}>{pick(language, say('Ibiltartea: lortzen diren y-ak', 'Recorrido: las y que se alcanzan', 'المدى: قيم y التي تُبلغ'))}</Label>
            <Formula x={380} y={176} size={21} color={SECOND}>Rec f = [−2, 4]</Formula>
            <Label x={380} y={226} fontSize={15} fill={MUTED}>{pick(language, say('Proiektatu kurba X ardatzera', 'Proyecta la curva sobre el eje X', 'أسقِط المنحنى على محور X'))}</Label>
            <Label x={380} y={250} fontSize={15} fill={MUTED}>{pick(language, say('eta Y ardatzera', 'y sobre el eje Y', 'وعلى محور Y'))}</Label>
            <Caption y={304} language={language} text={say('Mutur beteak: tartean sartzen dira, [ ] kortxeteekin', 'Extremos rellenos: entran en el intervalo, con corchetes [ ]', 'الطرفان الممتلئان داخل الفترة، بالأقواس [ ]')} />
        </Figure>
    )
}

/* ---------- Domain from a formula ---------- */

export function DomainFormulaFigure({ language }: { language: UnitLanguage }) {
    const cards = [
        { x: 16, tint: STAGE_TINT, title: say('Polinomioa', 'Polinomio', 'كثير حدود'), formula: 'y = x² − 4x', rule: say('edozein x balio du', 'vale cualquier x', 'تصلح أي x'), condition: '', result: 'Dom f = ℝ' },
        { x: 252, tint: MUSTARD_TINT, title: say('Zatikia', 'Fracción', 'كسر'), formula: '', rule: say('izendatzailea ≠ 0', 'denominador ≠ 0', 'المقام ≠ 0'), condition: 'x − 3 ≠ 0 → x ≠ 3', result: 'Dom f = ℝ − {3}' },
        { x: 488, tint: STAGE_TINT, title: say('Erro karratua', 'Raíz cuadrada', 'جذر تربيعي'), formula: 'y = √(x − 2)', rule: say('errokizuna ≥ 0', 'radicando ≥ 0', 'ما تحت الجذر ≥ 0'), condition: 'x − 2 ≥ 0 → x ≥ 2', result: 'Dom f = [2, +∞)' }
    ]
    return (
        <Figure height={262} label={pick(language, say('Izate-eremua formulatik: polinomioa, zatikia eta erroa', 'El dominio desde la fórmula: polinomio, fracción y raíz', 'المجال من الصيغة: كثير حدود وكسر وجذر'))}>
            {cards.map((card, index) => (
                <g key={index}>
                    <rect x={card.x} y={20} width={216} height={200} rx={16} fill={card.tint} opacity={0.6} />
                    <Label x={card.x + 108} y={48} textAnchor="middle" fontSize={16} fontWeight={700} fill={STAGE}>{pick(language, card.title)}</Label>
                    {card.formula ? <Formula x={card.x + 108} y={96} size={22} anchor="middle">{card.formula}</Formula> : <Frac x={card.x + 126} y={88} n="1" d="x − 3" size={20} sign="y =" />}
                    <Label x={card.x + 108} y={140} textAnchor="middle" fontSize={15} fill={MUTED}>{pick(language, card.rule)}</Label>
                    {card.condition && <Formula x={card.x + 108} y={166} size={15} anchor="middle" weight={400}>{card.condition}</Formula>}
                    <Formula x={card.x + 108} y={202} size={18} color={SECOND} anchor="middle">{card.result}</Formula>
                </g>
            ))}
            <Caption y={250} language={language} text={say('Bilatu kalkulatu ezin diren x-ak: 0z zatitzea edo zenbaki negatibo baten erroa', 'Busca las x que no se pueden calcular: dividir entre 0 o la raíz de un negativo', 'ابحث عن قيم x التي لا تُحسب: القسمة على 0 أو جذر عدد سالب')} />
        </Figure>
    )
}

/* ---------- Intercepts from a formula ---------- */

export function InterceptsFormulaFigure({ language }: { language: UnitLanguage }) {
    return (
        <Figure height={318} label={pick(language, say('y = x² − 2x − 3 funtzioaren ebaki-puntuak ardatzekin', 'Puntos de corte de y = x² − 2x − 3 con los ejes', 'نقاط تقاطع y = x² − 2x − 3 مع المحورين'))}>
            <Frame box={{ xMin: -3, xMax: 5, yMin: -5, yMax: 4 }} cell={26} ox={40} oy={34} labelStep={2}>
                {(map, clip) => (
                    <g>
                        <PlanePath map={map} points={sampled((x) => x * x - 2 * x - 3, -2.4, 4.4)} color={STAGE} width={3.4} clip={clip} />
                        <PlanePoint map={map} point={[-1, 0]} color={SECOND} radius={6.5} name="(−1, 0)" dx={-8} dy={-10} anchor="end" />
                        <PlanePoint map={map} point={[3, 0]} color={SECOND} radius={6.5} name="(3, 0)" dx={8} dy={-10} />
                        <PlanePoint map={map} point={[0, -3]} color={MUSTARD} radius={6.5} name="(0, −3)" dx={-10} dy={6} anchor="end" />
                    </g>
                )}
            </Frame>
            <Formula x={340} y={52} size={20} color={STAGE}>y = x² − 2x − 3</Formula>
            <rect x={330} y={70} width={374} height={86} rx={14} fill={MUSTARD_TINT} stroke={INK} strokeWidth={1.6} />
            <Label x={346} y={96} fontSize={16} fontWeight={700} fill={INK}>{pick(language, say('Y ardatzarekin: x = 0 jarri', 'Con el eje Y: pon x = 0', 'مع محور Y: ضع x = 0'))}</Label>
            <Formula x={346} y={134} size={16}>y = 0² − 2 · 0 − 3 = −3 → (0, −3)</Formula>
            <rect x={330} y={170} width={374} height={110} rx={14} fill={STAGE_TINT} stroke={INK} strokeWidth={1.6} />
            <Label x={346} y={196} fontSize={16} fontWeight={700} fill={INK}>{pick(language, say('X ardatzarekin: y = 0 jarri', 'Con el eje X: pon y = 0', 'مع محور X: ضع y = 0'))}</Label>
            <Formula x={346} y={230} size={16}>x² − 2x − 3 = 0 → x = −1, x = 3</Formula>
            <Formula x={346} y={262} size={16} color={SECOND}>(−1, 0) · (3, 0)</Formula>
            <Caption y={308} language={language} text={say('Y ardatza gehienez behin ebakitzen da; X ardatza, ekuazioak dituen soluzio adina aldiz', 'El eje Y se corta como mucho una vez; el eje X, tantas veces como soluciones tenga la ecuación', 'يُقطع محور Y مرة واحدة على الأكثر، ومحور X بعدد حلول المعادلة')} />
        </Figure>
    )
}

/* ---------- Increasing and decreasing ---------- */

const cubic = (x: number) => (x * x * x - 12 * x) / 8

export function MonotonyFigure({ language }: { language: UnitLanguage }) {
    return (
        <Figure height={290} label={pick(language, say('Gorakorra eta beherakorra den tarteak', 'Intervalos de crecimiento y de decrecimiento', 'فترات التزايد والتناقص'))}>
            <Frame box={{ xMin: -4, xMax: 4, yMin: -3, yMax: 3 }} cell={30} ox={40} oy={34}>
                {(map, clip) => (
                    <g>
                        <PlanePath map={map} points={sampled(cubic, -4.6, -2)} color={STAGE} width={4} clip={clip} />
                        <PlanePath map={map} points={sampled(cubic, -2, 2)} color={SECOND} width={4} clip={clip} />
                        <PlanePath map={map} points={sampled(cubic, 2, 4.6)} color={STAGE} width={4} clip={clip} />
                        <PlanePoint map={map} point={[-2, 2]} color={INK} radius={5} />
                        <PlanePoint map={map} point={[2, -2]} color={INK} radius={5} />
                    </g>
                )}
            </Frame>
            <Label x={330} y={62} fontSize={16} fontWeight={700} fill={STAGE}>{pick(language, say('Gorakorra ↗', 'Creciente ↗', 'متزايدة ↗'))}</Label>
            <Formula x={330} y={92} size={19} color={STAGE}>(−∞, −2) ∪ (2, +∞)</Formula>
            <Label x={330} y={136} fontSize={16} fontWeight={700} fill={SECOND}>{pick(language, say('Beherakorra ↘', 'Decreciente ↘', 'متناقصة ↘'))}</Label>
            <Formula x={330} y={166} size={19} color={SECOND}>(−2, 2)</Formula>
            <Label x={330} y={212} fontSize={15} fill={MUTED}>{pick(language, say('Tarteak x-ren balioekin idazten dira,', 'Los intervalos se escriben con valores de x,', 'تُكتب الفترات بقيم x،'))}</Label>
            <Label x={330} y={236} fontSize={15} fill={MUTED}>{pick(language, say('irekiak eta ezkerretik eskuinera', 'abiertos y de izquierda a derecha', 'مفتوحة ومن اليسار إلى اليمين'))}</Label>
            <Caption y={280} language={language} text={say('Gorakorra: x handitzean, y ere handitzen da', 'Creciente: al aumentar x, también aumenta y', 'متزايدة: عندما تزيد x تزيد y أيضًا')} />
        </Figure>
    )
}

/* ---------- Relative and absolute extremes ---------- */

export function ExtremaFigure({ language }: { language: UnitLanguage }) {
    const knots: Point[] = [[0, 1], [2, 5], [4, 2], [6, 4], [8, 0]]
    return (
        <Figure height={300} label={pick(language, say('Maximo eta minimo erlatiboak eta absolutuak', 'Máximos y mínimos relativos y absolutos', 'القيم العظمى والصغرى النسبية والمطلقة'))}>
            <Frame box={{ xMin: 0, xMax: 8, yMin: 0, yMax: 6 }} cell={30} ox={44} oy={34}>
                {(map) => (
                    <g>
                        <PlanePath map={map} points={smoothThrough(knots)} color={STAGE} width={3.6} />
                        <PlanePoint map={map} point={[2, 5]} color={SECOND} radius={7} name="(2, 5)" dx={0} dy={-13} anchor="middle" />
                        <PlanePoint map={map} point={[6, 4]} color={SECOND} radius={7} name="(6, 4)" dx={0} dy={-13} anchor="middle" />
                        <PlanePoint map={map} point={[4, 2]} color={GREEN} radius={7} name="(4, 2)" dx={0} dy={26} anchor="middle" />
                        <PlanePoint map={map} point={[8, 0]} color={MUSTARD} radius={7} name="(8, 0)" dx={-10} dy={-12} anchor="end" />
                    </g>
                )}
            </Frame>
            <Label x={340} y={58} fontSize={16} fontWeight={700} fill={SECOND}>{pick(language, say('Maximo erlatiboak', 'Máximos relativos', 'قيم عظمى نسبية'))}</Label>
            <Formula x={340} y={84} size={17} color={SECOND}>(2, 5) · (6, 4)</Formula>
            <Label x={340} y={120} fontSize={16} fontWeight={700} fill={GREEN}>{pick(language, say('Minimo erlatiboa', 'Mínimo relativo', 'قيمة صغرى نسبية'))}</Label>
            <Formula x={340} y={146} size={17} color={GREEN}>(4, 2)</Formula>
            <Label x={340} y={186} fontSize={15} fill={INK}>{pick(language, say('Maximo absolutua: (2, 5), punturik altuena', 'Máximo absoluto: (2, 5), el punto más alto', 'العظمى المطلقة: (2, 5)، أعلى نقطة'))}</Label>
            <Label x={340} y={214} fontSize={15} fill={INK}>{pick(language, say('Minimo absolutua: (8, 0), muturrean', 'Mínimo absoluto: (8, 0), en el extremo', 'الصغرى المطلقة: (8, 0)، عند الطرف'))}</Label>
            <Label x={340} y={242} fontSize={15} fill={MUTED}>{pick(language, say('eta ez da minimo erlatiboa', 'y no es un mínimo relativo', 'وليست صغرى نسبية'))}</Label>
            <Caption y={290} language={language} text={say('Erlatiboa: inguruko punturik altuena edo baxuena. Absolutua: grafiko osokoa', 'Relativo: el más alto o bajo de su entorno. Absoluto: el de toda la gráfica', 'النسبية: الأعلى أو الأدنى في جوارها. المطلقة: في الرسم كله')} />
        </Figure>
    )
}

/* ---------- Average rate of change ---------- */

export function RateFigure({ language }: { language: UnitLanguage }) {
    return (
        <Figure height={318} label={pick(language, say('y = x² − 4x + 5 funtzioaren batez besteko aldakuntza-tasa [1, 4] tartean', 'Tasa de variación media de y = x² − 4x + 5 en [1, 4]', 'معدل التغير المتوسط لـ y = x² − 4x + 5 في [1, 4]'))}>
            <Frame box={{ xMin: 0, xMax: 5, yMin: 0, yMax: 7 }} cell={34} ox={50} oy={30}>
                {(map, clip) => (
                    <g>
                        <PlanePath map={map} points={sampled((x) => x * x - 4 * x + 5, 0, 5)} color={STAGE} width={3.4} clip={clip} />
                        <PlanePath map={map} points={[[-1, 0], [6, 7]]} color={SECOND} width={2.4} dashed clip={clip} />
                        <line x1={map.x(1)} y1={map.y(2)} x2={map.x(4)} y2={map.y(2)} stroke={MUSTARD} strokeWidth={3.4} />
                        <line x1={map.x(4)} y1={map.y(2)} x2={map.x(4)} y2={map.y(5)} stroke={GREEN} strokeWidth={3.4} />
                        <text x={map.x(2.5)} y={map.y(2) + 22} textAnchor="middle" fontSize={16} fontWeight={700} fill={MUSTARD}>3</text>
                        <text x={map.x(4) + 10} y={map.y(3.5) + 6} fontSize={16} fontWeight={700} fill={GREEN}>3</text>
                        <PlanePoint map={map} point={[1, 2]} color={SECOND} radius={6} name="(1, 2)" dx={-8} dy={22} anchor="end" />
                        <PlanePoint map={map} point={[4, 5]} color={SECOND} radius={6} name="(4, 5)" dx={-8} dy={-10} anchor="end" />
                    </g>
                )}
            </Frame>
            <Formula x={300} y={56} size={19} color={STAGE}>y = x² − 4x + 5</Formula>
            <Formula x={300} y={112} size={18}>T.V.M. [1, 4] =</Formula>
            <Frac x={500} y={106} n="f(4) − f(1)" d="4 − 1" size={18} />
            <Frac x={622} y={106} n="5 − 2" d="3" size={18} sign="=" />
            <Formula x={668} y={112} size={18}>= 1</Formula>
            <Label x={300} y={178} fontSize={15} fill={INK}>{pick(language, say('y-ren aldaketa zati x-ren aldaketa:', 'Cambio de y entre cambio de x:', 'تغير y مقسومًا على تغير x:'))}</Label>
            <Label x={300} y={204} fontSize={15} fill={INK}>{pick(language, say('bi puntuak lotzen dituen zuzenkiaren malda', 'la pendiente del segmento que une los dos puntos', 'ميل القطعة التي تصل النقطتين'))}</Label>
            <Label x={300} y={242} fontSize={15} fill={MUTED}>{pick(language, say('Positiboa: batez beste hazten da', 'Positiva: crece de media', 'موجب: تزايد في المتوسط'))}</Label>
            <Label x={300} y={266} fontSize={15} fill={MUTED}>{pick(language, say('Negatiboa: batez beste txikitzen da', 'Negativa: decrece de media', 'سالب: تناقص في المتوسط'))}</Label>
            <Caption y={308} language={language} text={say('BATek ez du esaten tartearen barruan zer gertatzen den: muturrei bakarrik begiratzen die', 'La T.V.M. no dice qué pasa dentro del intervalo: solo mira los extremos', 'لا يقول المعدل ما يحدث داخل الفترة، بل ينظر إلى الطرفين فقط')} />
        </Figure>
    )
}

/* ---------- Continuity ---------- */

export function ContinuityFigure({ language }: { language: UnitLanguage }) {
    const box: PlaneBox = { xMin: 0, xMax: 5, yMin: 0, yMax: 5 }
    const panels = [
        { ox: 52, title: say('Jauzia', 'Salto', 'قفزة'), note: say('jauziak x = 1, 2, 3 puntuetan', 'saltos en x = 1, 2, 3', 'قفزات عند x = 1, 2, 3') },
        { ox: 292, title: say('Puntu lekualdatua', 'Punto desplazado', 'نقطة منزاحة'), note: say('x = 2 puntuan', 'en x = 2', 'عند x = 2') },
        { ox: 532, title: say('Adar infinitua', 'Rama infinita', 'فرع لانهائي'), note: say('x = 3 puntuan', 'en x = 3', 'عند x = 3') }
    ]
    return (
        <Figure height={282} label={pick(language, say('Hiru etenune mota: jauzia, puntu lekualdatua eta adar infinitua', 'Tres tipos de discontinuidad: salto, punto desplazado y rama infinita', 'ثلاثة أنواع من الانقطاع: قفزة ونقطة منزاحة وفرع لانهائي'))}>
            {panels.map((panel, index) => (
                <g key={index}>
                    <Label x={panel.ox + 65} y={30} textAnchor="middle" fontSize={16} fontWeight={700} fill={SECOND}>{pick(language, panel.title)}</Label>
                    <Frame box={box} cell={26} ox={panel.ox} oy={56}>
                        {(map, clip) => (
                            <g>
                                {index === 0 && [1, 2, 3, 4].map((step) => (
                                    <g key={step}>
                                        <PlanePath map={map} points={[[step - 1, step], [step, step]]} color={STAGE} width={3.4} />
                                        <PlanePoint map={map} point={[step - 1, step]} color={STAGE} radius={4.5} hollow />
                                        <PlanePoint map={map} point={[step, step]} color={STAGE} radius={4.5} />
                                    </g>
                                ))}
                                {index === 1 && (
                                    <g>
                                        <PlanePath map={map} points={[[0, 1], [5, 3.5]]} color={STAGE} width={3.4} />
                                        <PlanePoint map={map} point={[2, 2]} color={STAGE} radius={5} hollow />
                                        <PlanePoint map={map} point={[2, 4]} color={STAGE} radius={5} />
                                    </g>
                                )}
                                {index === 2 && (
                                    <g>
                                        <PlanePath map={map} points={[[3, -1], [3, 6]]} color={MUTED} width={1.6} dashed clip={clip} />
                                        <PlanePath map={map} points={sampled((x) => 1 / (x - 3) + 2, 0, 2.95, 0.01)} color={STAGE} width={3.4} clip={clip} />
                                        <PlanePath map={map} points={sampled((x) => 1 / (x - 3) + 2, 3.05, 5, 0.01)} color={STAGE} width={3.4} clip={clip} />
                                    </g>
                                )}
                            </g>
                        )}
                    </Frame>
                    <Label x={panel.ox + 65} y={232} textAnchor="middle" fontSize={15} fill={INK}>{pick(language, panel.note)}</Label>
                </g>
            ))}
            <Caption y={268} language={language} text={say('Jarraitua: arkatza altxatu gabe marrazten da. Puntu hutsa: ez dago grafikoan', 'Continua: se dibuja sin levantar el lápiz. Punto hueco: no está en la gráfica', 'المتصلة تُرسم دون رفع القلم. النقطة الفارغة ليست على الرسم')} />
        </Figure>
    )
}

/* ---------- Periodic functions ---------- */

export function PeriodicFigure({ language }: { language: UnitLanguage }) {
    return (
        <Figure height={272} label={pick(language, say('2 minuturo betetzen eta husten den zisterna bat', 'Una cisterna que se llena y se vacía cada 2 minutos', 'خزان يمتلئ ويفرغ كل دقيقتين'))}>
            <Frame box={{ xMin: 0, xMax: 8, yMin: 0, yMax: 4 }} cell={30} ox={56} oy={58} yUnit={10} xTitle={pick(language, say('denbora (min)', 'tiempo (min)', 'الزمن (د)'))} yTitle={pick(language, say('ura (L)', 'agua (L)', 'الماء (ل)'))}>
                {(map) => (
                    <g>
                        {[0, 2, 4, 6].map((start) => (
                            <g key={start}>
                                <PlanePath map={map} points={[[start, 0], [start + 2, 4]]} color={STAGE} width={3.4} />
                                <PlanePath map={map} points={[[start + 2, 4], [start + 2, 0]]} color={STAGE} width={1.6} dashed />
                            </g>
                        ))}
                        <path d={`M${map.x(4)} ${map.y(4) - 10} v-8 H${map.x(6)} v8`} fill="none" stroke={SECOND} strokeWidth={2.4} />
                        <text x={map.x(5)} y={map.y(4) - 24} textAnchor="middle" fontSize={16} fontWeight={700} fill={SECOND}>T = 2</text>
                        <PlanePoint map={map} point={[1, 2]} color={SECOND} radius={6} />
                    </g>
                )}
            </Frame>
            <Label x={360} y={78} fontSize={16} fontWeight={700} fill={INK}>{pick(language, say('Grafikoa 2 minuturo errepikatzen da:', 'La gráfica se repite cada 2 minutos:', 'يتكرر الرسم كل دقيقتين:'))}</Label>
            <Label x={360} y={104} fontSize={16} fill={INK}>{pick(language, say('periodoa T = 2 da', 'el periodo es T = 2', 'الدور T = 2'))}</Label>
            <Formula x={360} y={142} size={18} color={STAGE}>f(x + 2) = f(x)</Formula>
            <Label x={360} y={182} fontSize={15} fill={MUTED}>{pick(language, say('17 minututan zenbat ur?', '¿Cuánta agua a los 17 min?', 'كم من الماء عند 17 د؟'))}</Label>
            <Formula x={360} y={210} size={17}>17 = 8 · 2 + 1</Formula>
            <Formula x={500} y={210} size={17} color={SECOND}>f(17) = f(1) = 20</Formula>
            <Caption y={262} language={language} text={say('Kendu periodoa behar adina aldiz, lehen periodora iritsi arte', 'Quita el periodo tantas veces como haga falta hasta llegar al primer periodo', 'اطرح الدور بقدر ما يلزم حتى تصل إلى الدور الأول')} />
        </Figure>
    )
}

/* ---------- Tendency ---------- */

export function TendencyFigure({ language }: { language: UnitLanguage }) {
    return (
        <Figure height={294} label={pick(language, say('Bi joera: erradioaktibitatea 0ra eta uraren tenperatura 22 °C-ra', 'Dos tendencias: la radiactividad tiende a 0 y la temperatura del agua a 22 °C', 'اتجاهان: النشاط الإشعاعي يتجه إلى 0 وحرارة الماء إلى 22 °م'))}>
            <Label x={160} y={30} textAnchor="middle" fontSize={16} fontWeight={700} fill={STAGE}>{pick(language, say('Erradioaktibitatea', 'Radiactividad', 'النشاط الإشعاعي'))}</Label>
            <Frame box={{ xMin: 0, xMax: 6, yMin: 0, yMax: 4 }} cell={30} ox={58} oy={56} labels={false} xTitle={pick(language, say('urteak', 'años', 'السنوات'))}>
                {(map) => (
                    <g>
                        <PlanePath map={map} points={sampled((x) => 4 * 0.5 ** x, 0, 6)} color={STAGE} width={3.4} />
                        {[0, 1, 2, 3].map((x) => <PlanePoint key={x} map={map} point={[x, 4 * 0.5 ** x]} color={STAGE} radius={4.5} />)}
                    </g>
                )}
            </Frame>
            <Label x={540} y={30} textAnchor="middle" fontSize={16} fontWeight={700} fill={SECOND}>{pick(language, say('Hozkailutik ateratako ura', 'Agua sacada de la nevera', 'ماء أُخرج من الثلاجة'))}</Label>
            <Frame box={{ xMin: 0, xMax: 6, yMin: 0, yMax: 5 }} cell={26} ox={440} oy={56} labelStep={2} xUnit={10} yUnit={5} xTitle={pick(language, say('min', 'min', 'د'))}>
                {(map) => (
                    <g>
                        <PlanePath map={map} points={[[0, 4.4], [6, 4.4]]} color={MUTED} width={1.6} dashed />
                        <PlanePath map={map} points={sampled((x) => 4.4 - 4 * 0.6 ** x, 0, 6)} color={SECOND} width={3.4} />
                        <text x={map.x(6) - 4} y={map.y(4.4) - 8} textAnchor="end" fontSize={14} fontWeight={700} fill={MUTED}>22 °C</text>
                    </g>
                )}
            </Frame>
            <Label x={160} y={248} textAnchor="middle" fontSize={15} fill={INK}>{pick(language, say('urtero erdira: 0ra jotzen du', 'cada año a la mitad: tiende a 0', 'كل سنة إلى النصف: تتجه إلى 0'))}</Label>
            <Label x={540} y={248} textAnchor="middle" fontSize={15} fill={INK}>{pick(language, say('2 °C-tik 22 °C-ra hurbiltzen da', 'de 2 °C se acerca a 22 °C', 'من 2 °م تقترب من 22 °م'))}</Label>
            <Caption y={280} language={language} text={say('Joera: x oso handia denean y zein baliotara hurbiltzen den', 'Tendencia: a qué valor se acerca y cuando x se hace muy grande', 'الاتجاه: القيمة التي تقترب منها y عندما تكبر x كثيرًا')} />
        </Figure>
    )
}

/* ---------- Reading a graph in context ---------- */

export function GlucoseFigure({ language }: { language: UnitLanguage }) {
    const knots: Point[] = [[0, 4.5], [1, 6], [4, 4], [5, 4.5], [8, 4.5]]
    return (
        <Figure height={306} label={pick(language, say('Glukemiaren kurba glukosa hartu ondoren', 'Curva de la glucemia después de tomar glucosa', 'منحنى سكر الدم بعد تناول الغلوكوز'))}>
            <Frame box={{ xMin: 0, xMax: 8, yMin: 0, yMax: 7 }} cell={26} ox={62} oy={34} yUnit={20} labelStep={1} xTitle={pick(language, say('denbora (h)', 'tiempo (h)', 'الزمن (س)'))} yTitle="mg/dl">
                {(map) => (
                    <g>
                        <PlanePath map={map} points={[[0, 4.5], [8, 4.5]]} color={MUTED} width={1.4} dashed />
                        <PlanePath map={map} points={smoothThrough(knots)} color={STAGE} width={3.6} />
                        <PlanePoint map={map} point={[1, 6]} color={SECOND} radius={6} name="(1, 120)" dx={8} dy={-10} />
                        <PlanePoint map={map} point={[4, 4]} color={GREEN} radius={6} name="(4, 80)" dx={0} dy={26} anchor="middle" />
                    </g>
                )}
            </Frame>
            <Label x={330} y={62} fontSize={15} fill={INK}>{pick(language, say('0–1 h: 90etik 120ra igotzen da', '0–1 h: sube de 90 a 120', '0–1 س: تصعد من 90 إلى 120'))}</Label>
            <Label x={330} y={92} fontSize={15} fill={SECOND} fontWeight={700}>{pick(language, say('maximoa: 120 mg/dl, 1 h-tan', 'máximo: 120 mg/dl a la 1 h', 'العظمى: 120 mg/dl بعد ساعة'))}</Label>
            <Label x={330} y={122} fontSize={15} fill={INK}>{pick(language, say('1–4 h: jaitsi egiten da', '1–4 h: baja', '1–4 س: تنخفض'))}</Label>
            <Label x={330} y={152} fontSize={15} fill={GREEN} fontWeight={700}>{pick(language, say('minimoa: 80 mg/dl, 4 h-tan', 'mínimo: 80 mg/dl a las 4 h', 'الصغرى: 80 mg/dl بعد 4 ساعات'))}</Label>
            <Label x={330} y={182} fontSize={15} fill={INK}>{pick(language, say('4–5 h: 90era itzultzen da', '4–5 h: vuelve a 90', '4–5 س: تعود إلى 90'))}</Label>
            <Label x={330} y={212} fontSize={15} fill={MUTED}>{pick(language, say('joera: 90 mg/dl (maila normala)', 'tendencia: 90 mg/dl (nivel normal)', 'الاتجاه: 90 mg/dl (المستوى الطبيعي)'))}</Label>
            <Caption y={296} language={language} text={say('Lehenik ardatzak eta eskalak; gero kurba ezkerretik eskuinera', 'Primero los ejes y las escalas; después la curva de izquierda a derecha', 'أولًا المحاور والتدريج، ثم المنحنى من اليسار إلى اليمين')} />
        </Figure>
    )
}

/* ---------- A complete study ---------- */

export function StudyFigure({ language }: { language: UnitLanguage }) {
    const rows = [
        { title: say('1. Izate-eremua eta ibiltartea', '1. Dominio y recorrido', '1. المجال والمدى'), formula: '[0, 8] · [0, 3]' },
        { title: say('2. Ebaki-puntuak', '2. Puntos de corte', '2. نقاط التقاطع'), formula: '(0, 0) · (8, 0)' },
        { title: say('3. Gorakorra', '3. Crece', '3. تتزايد'), formula: '(0, 1) ∪ (3, 5) ∪ (6, 7)' },
        { title: say('4. Maximoak · minimoak', '4. Máximos · mínimos', '4. العظمى · الصغرى'), formula: '(1, 3) (5, 2) (7, 3) · (3, 1) (6, 1)' },
        { title: say('5. Jarraitua, ez periodikoa', '5. Continua, no periódica', '5. متصلة وغير دورية'), formula: '' }
    ]
    return (
        <Figure height={312} label={pick(language, say('Funtzio baten azterketa osoa bost urratsetan', 'Estudio completo de una función en cinco pasos', 'دراسة كاملة لدالة في خمس خطوات'))}>
            <Frame box={{ xMin: 0, xMax: 8, yMin: 0, yMax: 4 }} cell={30} ox={40} oy={56}>
                {(map) => (
                    <g>
                        <PlanePath map={map} points={smoothThrough(studyKnots)} color={STAGE} width={3.6} />
                        {studyKnots.slice(1, -1).map((point) => <PlanePoint key={point[0]} map={map} point={point} color={point[1] >= 2 ? SECOND : GREEN} radius={5} />)}
                    </g>
                )}
            </Frame>
            {rows.map((row, index) => (
                <g key={index}>
                    <Label x={320} y={42 + index * 50} fontSize={15} fontWeight={700} fill={index === 4 ? GREEN : STAGE}>{pick(language, row.title)}</Label>
                    {row.formula && <Formula x={320} y={66 + index * 50} size={15} weight={400}>{row.formula}</Formula>}
                </g>
            ))}
            <Caption y={300} language={language} text={say('Ordena berean beti: horrela ez da ezer ahazten', 'Siempre en el mismo orden: así no se olvida nada', 'دائمًا بالترتيب نفسه: هكذا لا يُنسى شيء')} />
        </Figure>
    )
}

/* ---------- A function from a problem ---------- */

export function BoxModelFigure({ language }: { language: UnitLanguage }) {
    const s = 5
    const ox = 64
    const oy = 50
    const cut = 5 * s
    const xs = [1, 2, 5, 10]
    const volume = (x: number) => (40 - 2 * x) * (30 - 2 * x) * x
    return (
        <Figure height={290} label={pick(language, say('40 × 30 cm-ko kartulina batetik egindako kutxa: V(x) = (40 − 2x)(30 − 2x)x', 'Caja hecha con una cartulina de 40 × 30 cm: V(x) = (40 − 2x)(30 − 2x)x', 'علبة من ورق مقوى 40 × 30 سم: V(x) = (40 − 2x)(30 − 2x)x'))}>
            <rect x={ox} y={oy} width={40 * s} height={30 * s} fill={STAGE_TINT} stroke={INK} strokeWidth={2} />
            {[[ox, oy], [ox + 40 * s - cut, oy], [ox, oy + 30 * s - cut], [ox + 40 * s - cut, oy + 30 * s - cut]].map(([x, y], index) => (
                <rect key={index} x={x} y={y} width={cut} height={cut} fill={PAPER} stroke={SECOND} strokeWidth={2} strokeDasharray="5 3" />
            ))}
            <rect x={ox + cut} y={oy + cut} width={40 * s - 2 * cut} height={30 * s - 2 * cut} fill="none" stroke={INK} strokeWidth={1.4} strokeDasharray="6 4" />
            <Formula x={ox + 20 * s} y={oy - 12} size={15} anchor="middle">40 cm</Formula>
            <Formula x={ox - 10} y={oy + 15 * s + 5} size={15} anchor="end">30 cm</Formula>
            <Formula x={ox + cut / 2} y={oy + cut / 2 + 5} size={14} color={SECOND} anchor="middle">x</Formula>
            <Formula x={ox + 40 * s - cut / 2} y={oy + 30 * s - cut / 2 + 5} size={14} color={SECOND} anchor="middle">x</Formula>
            <Formula x={ox + 20 * s} y={oy + 30 * s - cut - 10} size={15} color={STAGE} anchor="middle">40 − 2x</Formula>
            <g transform={`translate(${ox + 40 * s - cut - 12} ${oy + 15 * s}) rotate(-90)`}>
                <Formula x={0} y={0} size={15} color={STAGE} anchor="middle">30 − 2x</Formula>
            </g>
            <Formula x={300} y={64} size={19} color={SECOND}>V(x) = (40 − 2x)(30 − 2x) · x</Formula>
            <Label x={300} y={104} fontSize={15} fill={INK}>{pick(language, say('Zentzua duen izate-eremua:', 'Dominio con sentido:', 'المجال المنطقي:'))}</Label>
            <Formula x={300} y={130} size={17} color={STAGE}>0 &lt; x &lt; 15</Formula>
            {['x', 'V'].map((name, row) => (
                <g key={name}>
                    <rect x={300} y={160 + row * 40} width={40} height={34} rx={6} fill={row === 0 ? STAGE_TINT : MUSTARD_TINT} stroke={INK} strokeWidth={1.4} />
                    <text x={320} y={183 + row * 40} textAnchor="middle" fontSize={16} fontWeight={700} fontStyle="italic" fill={INK}>{name}</text>
                    {xs.map((x, index) => (
                        <g key={x}>
                            <rect x={346 + index * 80} y={160 + row * 40} width={76} height={34} rx={6} fill={CARD} stroke={INK} strokeWidth={1.2} />
                            <text x={384 + index * 80} y={183 + row * 40} textAnchor="middle" fontSize={16} fill={INK} direction="ltr">{row === 0 ? x : volume(x)}</text>
                        </g>
                    ))}
                </g>
            ))}
            <Caption y={276} language={language} text={say('Formula enuntziatutik ateratzen da; izate-eremua, problemaren zentzutik', 'La fórmula sale del enunciado; el dominio, del sentido del problema', 'الصيغة من النص، والمجال من معنى المسألة')} />
        </Figure>
    )
}

/* ---------- Hero art ---------- */

export function FunctionsHeroArt() {
    const curve = smoothThrough([[0, 120], [60, 40], [130, 100], [200, 20], [250, 70]], 4)
    return (
        <div className="fraction-v2-collage" aria-hidden="true">
            <svg viewBox="0 0 520 400" direction="ltr" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                <g transform="translate(30 30) rotate(-4)">
                    <rect width={290} height={190} rx={16} fill={PAPER} stroke={INK} strokeWidth={2} />
                    <line x1={20} y1={160} x2={275} y2={160} stroke={INK} strokeWidth={2} />
                    <line x1={20} y1={170} x2={20} y2={20} stroke={INK} strokeWidth={2} />
                    <polyline points={curve.map(([x, y]) => `${x + 25},${y + 25}`).join(' ')} fill="none" stroke="#2f6fdb" strokeWidth={4} strokeLinecap="round" />
                    <circle cx={85} cy={65} r={7} fill="#267b53" />
                    <circle cx={225} cy={45} r={7} fill="#c4432a" />
                </g>
                <g transform="translate(340 70) rotate(5)">
                    <rect width={150} height={110} rx={16} fill="#d6eddf" stroke={INK} strokeWidth={2} />
                    <text x={75} y={66} textAnchor="middle" fontSize={26} fontWeight={700} fill={INK} fontFamily={SERIF}>Dom f</text>
                </g>
                <g transform="translate(50 260) rotate(2)">
                    <rect width={420} height={90} rx={16} fill="#fbebc0" stroke={INK} strokeWidth={2} />
                    <text x={210} y={58} textAnchor="middle" fontSize={26} fontWeight={700} fill={INK} fontFamily={SERIF}>T.V.M. = (f(b) − f(a)) / (b − a)</text>
                </g>
            </svg>
        </div>
    )
}
