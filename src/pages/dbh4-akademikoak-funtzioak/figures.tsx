import type { ReactNode } from 'react'
import { pickText, type LocalizedText, type UnitLanguage } from '../../features/unit-v2/types'
import { AxisTitles, Label, PlaneGrid, PlanePath, PlanePoint } from '../dbh2-funtzioak-v2/plane'
import { useBoxClip } from '../dbh2-funtzioak-v2/planeClip'
import { planeMap, type PlaneBox, type PlaneMap } from '../dbh2-funtzioak-v2/planeMap'
import { Figure, Frac } from '../dbh2-zatikiak-prototype/figures'
import { sampled } from '../dbh4-aplikatuak-funtzioak/functions'

/* ==========================================================================
   Funtzioak · 4. DBH akademikoak — the new lesson figures: the domain of a
   fraction (the roots of the denominator taken out of the line), the
   domain of a square root read on a sign chart, three look-alike formulas
   with three different domains, a function defined piecewise, the k that
   joins two pieces, the intercepts of a factorised cubic, the sign of a
   function (and the domains of √f and 1/f) and even and odd functions.
   The "is it a function" test, f(a), domain and range on a graph, the
   three discontinuities, extremes, the T.V.M. and the periodic cistern
   reuse the 2. DBH and 4. DBH aplikatuak figures. Formulas sit in their
   own <text> (left to right in every language); words go through <Label>.
   ========================================================================== */

type Bound = number | '-inf' | 'inf'

const INK = 'var(--ink, #1d2733)'
const MUTED = 'var(--muted, #58616e)'
const STAGE = 'var(--stage, #2f6fdb)'
const STAGE_TINT = 'var(--stage-tint, #dde7f7)'
const SECOND = 'var(--second, #c4432a)'
const GREEN = 'var(--success, #267b53)'
const MUSTARD = 'var(--mustard, #e0a100)'
const MUSTARD_TINT = 'var(--mustard-tint, #fbebc0)'
const GREEN_TINT = '#d6eddf'
const CORAL_TINT = '#f6dcd3'
const CARD = 'var(--card, #fffcf6)'
const PAPER = '#fffcf6'
const SERIF = 'Fraunces, serif'

const say = (eu: string, es: string, ar: string): LocalizedText => ({ eu, es, ar })
const useText = (language: UnitLanguage) => (text: LocalizedText) => pickText(language, text)

function Caption({ y, children, x = 360 }: { y: number; children: ReactNode; x?: number }) {
    return <Label x={x} y={y} textAnchor="middle" fontSize={15} fill={MUTED}>{children}</Label>
}

/** A formula written left to right whatever the language */
function F({ x, y, children, size = 19, color = INK, anchor = 'start', weight = 700 }: { x: number; y: number; children: ReactNode; size?: number; color?: string; anchor?: 'start' | 'middle' | 'end'; weight?: number }) {
    return <text x={x} y={y} textAnchor={anchor} fontSize={size} fontWeight={weight} fill={color} direction="ltr">{children}</text>
}

function Card({ x, y, width, height, tint, children }: { x: number; y: number; width: number; height: number; tint: string; children?: ReactNode }) {
    return (
        <g>
            <rect x={x} y={y} width={width} height={height} rx={14} fill={tint} stroke={INK} strokeWidth={1.6} />
            {children}
        </g>
    )
}

/** A small Cartesian plane placed at (ox, oy) inside a figure */
function Frame({ box, cell, ox, oy, labelStep = 1, yUnit, children }: { box: PlaneBox; cell: number; ox: number; oy: number; labelStep?: number; yUnit?: number; children?: (map: PlaneMap, clip: string) => ReactNode }) {
    const map = planeMap(box, cell, ox, oy)
    const [clipPath, clip] = useBoxClip(map)
    return (
        <g>
            <defs>{clipPath}</defs>
            <rect x={ox} y={oy} width={map.width} height={map.height} fill={CARD} />
            <PlaneGrid map={map} labelStep={labelStep} yUnit={yUnit} />
            <AxisTitles map={map} />
            {children?.(map, clip)}
        </g>
    )
}

/**
 * A number line from `from` to `to` drawn between x0 and x1: the stretches
 * in `shade` are thick, the marks are filled (included) or hollow (left out).
 */
function NumberLine({ x0, x1, y, from, to, shade, marks, color = GREEN, size = 15 }: {
    x0: number
    x1: number
    y: number
    from: number
    to: number
    shade: [Bound, Bound][]
    marks: { value: number; filled: boolean }[]
    color?: string
    size?: number
}) {
    const at = (value: Bound) => (value === '-inf' ? x0 : value === 'inf' ? x1 : x0 + ((value - from) / (to - from)) * (x1 - x0))
    return (
        <g>
            <line x1={x0} y1={y} x2={x1} y2={y} stroke={INK} strokeWidth={1.8} />
            <polygon points={`${x1 + 10},${y} ${x1},${y - 5} ${x1},${y + 5}`} fill={INK} />
            {shade.map(([a, b], index) => <line key={index} x1={at(a)} y1={y} x2={at(b)} y2={y} stroke={color} strokeWidth={7} strokeLinecap="round" opacity={0.8} />)}
            {marks.map((mark) => (
                <g key={mark.value}>
                    <circle cx={at(mark.value)} cy={y} r={6} fill={mark.filled ? color : CARD} stroke={mark.filled ? color : SECOND} strokeWidth={2.6} />
                    <F x={at(mark.value)} y={y + size + 12} size={size} anchor="middle" weight={700}>{mark.value < 0 ? `−${-mark.value}` : mark.value}</F>
                </g>
            ))}
        </g>
    )
}

/* ---------- 4. The domain of a fraction ---------- */

export function RationalDomainFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    return (
        <Figure height={272} label={t(say('y = 1 / (x² + 2x − 8) funtzioaren izate-eremua: izendatzailearen erroak kentzen dira', 'Dominio de y = 1 / (x² + 2x − 8): se quitan las raíces del denominador', 'مجال y = 1 / (x² + 2x − 8): تُحذف جذور المقام'))}>
            <Card x={16} y={18} width={256} height={112} tint={STAGE_TINT}>
                <Frac x={170} y={72} n="1" d="x² + 2x − 8" size={21} sign="y =" />
            </Card>
            <Label x={300} y={42} fontSize={16} fontWeight={700} fill={STAGE}>{t(say('Izendatzailea ezin da 0 izan:', 'El denominador no puede ser 0:', 'لا يكون المقام 0:'))}</Label>
            <F x={300} y={74} size={18}>x² + 2x − 8 = 0</F>
            <F x={300} y={104} size={18}>x = (−2 ± 6) / 2</F>
            <F x={300} y={134} size={18} color={SECOND}>x = −4 · x = 2</F>
            <NumberLine x0={60} x1={650} y={176} from={-6} to={4} shade={[['-inf', -4], [-4, 2], [2, 'inf']]} marks={[{ value: -4, filled: false }, { value: 2, filled: false }]} />
            <F x={360} y={238} size={21} color={SECOND} anchor="middle">Dom f = ℝ − {'{'}−4, 2{'}'}</F>
            <Caption y={264}>{t(say('Zuzen osoa, izendatzailea anulatzen duten bi puntuak izan ezik', 'Toda la recta menos los dos puntos que anulan el denominador', 'المستقيم كله ما عدا النقطتين اللتين تعدمان المقام'))}</Caption>
        </Figure>
    )
}

/* ---------- 5. The domain of a square root: a sign chart ---------- */

export function SignChartFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const parabola = (x: number) => (x * x - 9) / 3
    return (
        <Figure height={300} label={t(say('y = √(x² − 9) funtzioaren izate-eremua: x² − 9 ≥ 0 zeinu-taulan', 'Dominio de y = √(x² − 9): x² − 9 ≥ 0 en una tabla de signos', 'مجال y = √(x² − 9): x² − 9 ≥ 0 في جدول الإشارات'))}>
            <Frame box={{ xMin: -5, xMax: 5, yMin: -4, yMax: 5 }} cell={24} ox={30} oy={36} yUnit={3}>
                {(map, clip) => (
                    <g>
                        <PlanePath map={map} points={sampled(parabola, -5, -3)} color={GREEN} width={4} clip={clip} />
                        <PlanePath map={map} points={sampled(parabola, -3, 3)} color={SECOND} width={3} dashed clip={clip} />
                        <PlanePath map={map} points={sampled(parabola, 3, 5)} color={GREEN} width={4} clip={clip} />
                        <PlanePoint map={map} point={[-3, 0]} color={GREEN} radius={6} />
                        <PlanePoint map={map} point={[3, 0]} color={GREEN} radius={6} />
                    </g>
                )}
            </Frame>
            <F x={300} y={56} size={21} color={STAGE}>y = √(x² − 9)</F>
            <Label x={300} y={90} fontSize={16} fontWeight={700} fill={INK}>{t(say('Errokizuna ez da negatiboa:', 'El radicando no es negativo:', 'ما تحت الجذر ليس سالبًا:'))}</Label>
            <F x={300} y={120} size={18}>x² − 9 ≥ 0</F>
            <F x={440} y={120} size={18} color={SECOND}>x = ±3</F>
            {[['+', -4.8, GREEN], ['−', 0, SECOND], ['+', 4.8, GREEN]].map(([sign, value, color]) => (
                <F key={String(value)} x={320 + (((value as number) + 6) / 12) * 360} y={160} size={22} color={color as string} anchor="middle">{sign}</F>
            ))}
            <NumberLine x0={320} x1={680} y={182} from={-6} to={6} shade={[['-inf', -3], [3, 'inf']]} marks={[{ value: -3, filled: true }, { value: 3, filled: true }]} />
            <F x={300} y={246} size={19} color={SECOND}>Dom f = (−∞, −3] ∪ [3, +∞)</F>
            <Caption y={288}>{t(say('Parabola X ardatzaren gainean edo ardatzean dagoen tokian dago erroa definituta', 'La raíz existe donde la parábola está sobre el eje X o en él', 'الجذر معرَّف حيث يكون القطع المكافئ فوق محور X أو عليه'))}</Caption>
        </Figure>
    )
}

/* ---------- 6. Three look-alike formulas, three domains ---------- */

export function DomainCasesFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const cards = [
        { x: 16, tint: STAGE_TINT, title: say('Erroa', 'Raíz', 'جذر'), condition: 'x − 5 ≥ 0', filled: true, shade: [[5, 'inf']] as [Bound, Bound][], result: 'Dom f = [5, +∞)' },
        { x: 252, tint: MUSTARD_TINT, title: say('Erroa izendatzailean', 'Raíz en el denominador', 'جذر في المقام'), condition: 'x − 5 > 0', filled: false, shade: [[5, 'inf']] as [Bound, Bound][], result: 'Dom f = (5, +∞)' },
        { x: 488, tint: GREEN_TINT, title: say('Zatikia', 'Fracción', 'كسر'), condition: 'x − 5 ≠ 0', filled: false, shade: [['-inf', 5], [5, 'inf']] as [Bound, Bound][], result: 'Dom f = ℝ − {5}' }
    ]
    return (
        <Figure height={286} label={t(say('√(x − 5), 1 / √(x − 5) eta 1 / (x − 5): hiru izate-eremu desberdin', '√(x − 5), 1 / √(x − 5) y 1 / (x − 5): tres dominios distintos', '√(x − 5) و1 / √(x − 5) و1 / (x − 5): ثلاثة مجالات مختلفة'))}>
            {cards.map((card, index) => (
                <Card key={index} x={card.x} y={16} width={216} height={240} tint={card.tint}>
                    <Label x={card.x + 108} y={44} textAnchor="middle" fontSize={15} fontWeight={700} fill={STAGE}>{t(card.title)}</Label>
                    {index === 0 && <F x={card.x + 108} y={96} size={21} anchor="middle">y = √(x − 5)</F>}
                    {index === 1 && <Frac x={card.x + 126} y={84} n="1" d="√(x − 5)" size={19} sign="y =" />}
                    {index === 2 && <Frac x={card.x + 126} y={84} n="1" d="x − 5" size={19} sign="y =" />}
                    <F x={card.x + 108} y={146} size={18} anchor="middle" color={index === 1 ? SECOND : INK}>{card.condition}</F>
                    <NumberLine x0={card.x + 18} x1={card.x + 188} y={180} from={2} to={8} shade={card.shade} marks={[{ value: 5, filled: card.filled }]} size={14} />
                    <F x={card.x + 108} y={238} size={17} anchor="middle" color={SECOND}>{card.result}</F>
                </Card>
            ))}
            <Caption y={278}>{t(say('Erroa izendatzailean: ≥ ez, > hertsia, 0z ezin delako zatitu', 'Raíz en el denominador: no ≥ sino > estricto, porque no se divide entre 0', 'جذر في المقام: ليس ≥ بل > لأن القسمة على 0 لا تجوز'))}</Caption>
        </Figure>
    )
}

/* ---------- 8. A function defined piecewise ---------- */

export function PiecewiseFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    return (
        <Figure height={278} label={t(say('Zatika definitutako funtzioa: −x, x² eta 1', 'Una función definida a trozos: −x, x² y 1', 'دالة معرّفة على أجزاء: −x وx² و1'))}>
            <F x={24} y={92} size={21}>f(x) =</F>
            <text x={104} y={108} fontSize={92} fill={INK} fontWeight={300} direction="ltr">{'{'}</text>
            {[['−x', 'x < 0', STAGE], ['x²', '0 ≤ x < 2', SECOND], ['1', 'x ≥ 2', GREEN]].map(([piece, condition, color], index) => (
                <g key={index}>
                    <F x={150} y={52 + index * 36} size={19} color={color}>{piece}</F>
                    <F x={204} y={52 + index * 36} size={19} weight={400}>{condition}</F>
                </g>
            ))}
            <Label x={24} y={170} fontSize={15} fontWeight={700} fill={INK}>{t(say('Lehenik, zein zatitan dagoen x:', 'Primero, en qué trozo está x:', 'أولًا: في أي جزء تقع x:'))}</Label>
            <F x={24} y={204} size={18} color={STAGE}>f(−3) = −(−3) = 3</F>
            <F x={24} y={234} size={18} color={SECOND}>f(1) = 1² = 1</F>
            <F x={24} y={264} size={18} color={GREEN}>f(2) = 1</F>
            <Frame box={{ xMin: -4, xMax: 5, yMin: -1, yMax: 5 }} cell={30} ox={406} oy={34}>
                {(map, clip) => (
                    <g>
                        <PlanePath map={map} points={[[-4, 4], [0, 0]]} color={STAGE} width={3.6} clip={clip} />
                        <PlanePath map={map} points={sampled((x) => x * x, 0, 2)} color={SECOND} width={3.6} clip={clip} />
                        <PlanePath map={map} points={[[2, 1], [5, 1]]} color={GREEN} width={3.6} clip={clip} />
                        <PlanePoint map={map} point={[2, 4]} color={SECOND} radius={5.5} hollow />
                        <PlanePoint map={map} point={[2, 1]} color={GREEN} radius={5.5} />
                        <PlanePoint map={map} point={[-3, 3]} color={STAGE} radius={5} />
                        <PlanePoint map={map} point={[1, 1]} color={SECOND} radius={5} />
                    </g>
                )}
            </Frame>
            <Caption y={246} x={556}>{t(say('Puntu hutsa: zati horrek ez du hartzen', 'Punto hueco: ese trozo no lo incluye', 'النقطة الفارغة لا يشملها ذلك الجزء'))}</Caption>
        </Figure>
    )
}

/* ---------- 9. The k that joins two pieces ---------- */

export function JoinFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    return (
        <Figure height={300} label={t(say('k = 1 denean bi zatiak x = 2 puntuan lotzen dira eta funtzioa jarraitua da', 'Con k = 1 los dos trozos se unen en x = 2 y la función es continua', 'عندما k = 1 يلتقي الجزءان عند x = 2 وتكون الدالة متصلة'))}>
            <Frame box={{ xMin: -2, xMax: 5, yMin: -2, yMax: 7 }} cell={26} ox={36} oy={34}>
                {(map, clip) => (
                    <g>
                        <PlanePath map={map} points={sampled((x) => x * x - 1, -2, 2)} color={STAGE} width={3.6} clip={clip} />
                        <PlanePath map={map} points={[[2, 5], [4, 7]]} color={MUTED} width={2.4} dashed clip={clip} />
                        <PlanePoint map={map} point={[2, 5]} color={MUTED} radius={5} hollow />
                        <PlanePath map={map} points={[[2, 3], [5, 6]]} color={GREEN} width={3.6} clip={clip} />
                        <PlanePoint map={map} point={[2, 3]} color={SECOND} radius={6.5} name="(2, 3)" dx={10} dy={18} />
                    </g>
                )}
            </Frame>
            <F x={290} y={50} size={19}>f(x) =</F>
            <F x={364} y={36} size={18} color={STAGE}>x² − 1</F>
            <F x={464} y={36} size={18} weight={400}>x ≤ 2</F>
            <F x={364} y={66} size={18} color={GREEN}>x + k</F>
            <F x={464} y={66} size={18} weight={400}>x &gt; 2</F>
            <Label x={290} y={108} fontSize={15} fill={INK}>{t(say('Ezkerreko zatiak x = 2 puntuan:', 'El trozo izquierdo en x = 2:', 'الجزء الأيسر عند x = 2:'))}</Label>
            <F x={290} y={134} size={18} color={STAGE}>2² − 1 = 3</F>
            <Label x={290} y={170} fontSize={15} fill={INK}>{t(say('Eskuinekoa hona hurbiltzen da:', 'El derecho se acerca a:', 'الجزء الأيمن يقترب من:'))}</Label>
            <F x={290} y={196} size={18} color={GREEN}>2 + k</F>
            <F x={290} y={236} size={20} color={SECOND}>2 + k = 3 → k = 1</F>
            <Label x={290} y={266} fontSize={15} fill={MUTED}>{t(say('k = 3 bada, jauzi bat dago (marratua)', 'Si k = 3, hay un salto (discontinua)', 'إذا كان k = 3 توجد قفزة (المتقطع)'))}</Label>
            <Caption y={292}>{t(say('Jarraitua izateko, bi zatiek balio bera eman behar dute lotunean', 'Para que sea continua, los dos trozos deben dar el mismo valor en la unión', 'لتكون متصلة يجب أن يعطي الجزءان القيمة نفسها عند نقطة الالتقاء'))}</Caption>
        </Figure>
    )
}

/* ---------- 10. The intercepts of a factorised cubic ---------- */

export function CubicInterceptsFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const cubic = (x: number) => (x * x * x - x * x - 4 * x + 4) / 2
    return (
        <Figure height={296} label={t(say('y = x³ − x² − 4x + 4 funtzioaren ebaki-puntuak: (−2, 0), (1, 0), (2, 0) eta (0, 4)', 'Puntos de corte de y = x³ − x² − 4x + 4: (−2, 0), (1, 0), (2, 0) y (0, 4)', 'نقاط تقاطع y = x³ − x² − 4x + 4: (−2, 0) و(1, 0) و(2, 0) و(0, 4)'))}>
            <Frame box={{ xMin: -3, xMax: 3, yMin: -2, yMax: 4 }} cell={34} ox={36} oy={40} yUnit={2}>
                {(map, clip) => (
                    <g>
                        <PlanePath map={map} points={sampled(cubic, -2.3, 2.7, 0.02)} color={STAGE} width={3.6} clip={clip} />
                        {[-2, 1, 2].map((x) => <PlanePoint key={x} map={map} point={[x, 0]} color={SECOND} radius={6} />)}
                        <PlanePoint map={map} point={[0, 2]} color={MUSTARD} radius={6} name="(0, 4)" dx={10} dy={-8} />
                    </g>
                )}
            </Frame>
            <F x={276} y={46} size={20} color={STAGE}>y = x³ − x² − 4x + 4</F>
            <Card x={268} y={62} width={436} height={70} tint={MUSTARD_TINT}>
                <Label x={284} y={88} fontSize={15} fontWeight={700} fill={INK}>{t(say('Y ardatzarekin: x = 0', 'Con el eje Y: x = 0', 'مع محور Y: x = 0'))}</Label>
                <F x={284} y={118} size={17}>y = 4 → (0, 4)</F>
            </Card>
            <Card x={268} y={144} width={436} height={118} tint={STAGE_TINT}>
                <Label x={284} y={170} fontSize={15} fontWeight={700} fill={INK}>{t(say('X ardatzarekin: y = 0, faktorizatu', 'Con el eje X: y = 0, factoriza', 'مع محور X: y = 0، حلّل'))}</Label>
                <F x={284} y={198} size={17}>x²(x − 1) − 4(x − 1) = 0</F>
                <F x={284} y={224} size={17}>(x − 1)(x − 2)(x + 2) = 0</F>
                <F x={284} y={250} size={17} color={SECOND}>x = 1 · x = 2 · x = −2</F>
            </Card>
            <Caption y={286}>{t(say('Faktore bakoitza 0 eginez, X ardatzarekiko ebaki-puntu bat', 'Cada factor igualado a 0 da un corte con el eje X', 'كل عامل يساوي 0 يعطي نقطة تقاطع مع محور X'))}</Caption>
        </Figure>
    )
}

/* ---------- 11. The sign of a function ---------- */

export function SignFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const f = (x: number) => (x * (x + 2) * (x - 4)) / 4
    return (
        <Figure height={300} label={t(say('Funtzio baten zeinua: positiboa (−2, 0) eta (4, +∞) tarteetan, negatiboa (−∞, −2) eta (0, 4) tarteetan', 'Signo de una función: positiva en (−2, 0) y (4, +∞), negativa en (−∞, −2) y (0, 4)', 'إشارة دالة: موجبة في (−2, 0) و(4, +∞) وسالبة في (−∞, −2) و(0, 4)'))}>
            <Frame box={{ xMin: -3, xMax: 6, yMin: -5, yMax: 5 }} cell={24} ox={30} oy={28} labelStep={2}>
                {(map, clip) => (
                    <g>
                        <PlanePath map={map} points={sampled(f, -2.7, -2, 0.02)} color={SECOND} width={3.8} clip={clip} />
                        <PlanePath map={map} points={sampled(f, -2, 0, 0.02)} color={GREEN} width={3.8} clip={clip} />
                        <PlanePath map={map} points={sampled(f, 0, 4, 0.02)} color={SECOND} width={3.8} clip={clip} />
                        <PlanePath map={map} points={sampled(f, 4, 5.4, 0.02)} color={GREEN} width={3.8} clip={clip} />
                        {[-2, 0, 4].map((x) => <PlanePoint key={x} map={map} point={[x, 0]} color={INK} radius={5.5} />)}
                    </g>
                )}
            </Frame>
            <Label x={274} y={48} fontSize={15} fontWeight={700} fill={GREEN}>{t(say('f(x) > 0: X ardatzaren gainean', 'f(x) > 0: sobre el eje X', 'f(x) > 0: فوق محور X'))}</Label>
            <F x={274} y={76} size={18} color={GREEN}>(−2, 0) ∪ (4, +∞)</F>
            <Label x={274} y={112} fontSize={15} fontWeight={700} fill={SECOND}>{t(say('f(x) < 0: azpian', 'f(x) < 0: por debajo', 'f(x) < 0: تحته'))}</Label>
            <F x={274} y={140} size={18} color={SECOND}>(−∞, −2) ∪ (0, 4)</F>
            <Card x={266} y={160} width={440} height={104} tint={MUSTARD_TINT}>
                <F x={282} y={194} size={17}>Dom √f(x) = [−2, 0] ∪ [4, +∞)</F>
                <F x={282} y={226} size={17}>Dom 1/f(x) = ℝ − {'{'}−2, 0, 4{'}'}</F>
                <F x={282} y={252} size={14} color={MUTED} weight={400}>√f → f ≥ 0 · 1/f → f ≠ 0</F>
            </Card>
            <Caption y={290}>{t(say('Zeinua X ardatzarekiko ebaki-puntuetan bakarrik alda daiteke (funtzio jarraituetan)', 'El signo solo puede cambiar en los cortes con el eje X (si la función es continua)', 'لا تتغير الإشارة إلا عند التقاطع مع محور X (إذا كانت الدالة متصلة)'))}</Caption>
        </Figure>
    )
}

/* ---------- 12. Even and odd functions ---------- */

export function SymmetryFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const box: PlaneBox = { xMin: -3, xMax: 3, yMin: -3, yMax: 3 }
    return (
        <Figure height={310} label={t(say('Funtzio bikoitia (y = x² − 2, Y ardatzarekiko simetrikoa) eta bakoitia (y = (x³ − 3x)/2, jatorriarekiko simetrikoa)', 'Función par (y = x² − 2, simétrica respecto del eje Y) e impar (y = (x³ − 3x)/2, simétrica respecto del origen)', 'دالة زوجية (y = x² − 2، متناظرة حول محور Y) وفردية (y = (x³ − 3x)/2، متناظرة حول الأصل)'))}>
            <Label x={170} y={24} textAnchor="end" fontSize={16} fontWeight={700} fill={STAGE}>{t(say('Bikoitia', 'Par', 'زوجية'))}</Label>
            <Frame box={box} cell={30} ox={90} oy={48}>
                {(map, clip) => (
                    <g>
                        <line x1={map.x(0)} y1={map.y(3)} x2={map.x(0)} y2={map.y(-3)} stroke={STAGE} strokeWidth={7} opacity={0.25} />
                        <PlanePath map={map} points={sampled((x) => x * x - 2, -3, 3)} color={STAGE} width={3.6} clip={clip} />
                        <line x1={map.x(-2)} y1={map.y(2)} x2={map.x(2)} y2={map.y(2)} stroke={SECOND} strokeWidth={1.8} strokeDasharray="5 4" />
                        <PlanePoint map={map} point={[-2, 2]} color={SECOND} radius={5.5} />
                        <PlanePoint map={map} point={[2, 2]} color={SECOND} radius={5.5} />
                    </g>
                )}
            </Frame>
            <F x={180} y={262} size={18} anchor="middle" color={SECOND}>f(−x) = f(x)</F>
            <Label x={180} y={286} textAnchor="middle" fontSize={14} fill={INK}>{t(say('Y ardatzarekiko simetrikoa', 'Simétrica respecto del eje Y', 'متناظرة حول محور Y'))}</Label>
            <Label x={530} y={24} textAnchor="end" fontSize={16} fontWeight={700} fill={GREEN}>{t(say('Bakoitia', 'Impar', 'فردية'))}</Label>
            <Frame box={box} cell={30} ox={450} oy={48}>
                {(map, clip) => (
                    <g>
                        <PlanePath map={map} points={sampled((x) => (x * x * x - 3 * x) / 2, -3, 3, 0.02)} color={GREEN} width={3.6} clip={clip} />
                        <line x1={map.x(-1)} y1={map.y(1)} x2={map.x(1)} y2={map.y(-1)} stroke={SECOND} strokeWidth={1.8} strokeDasharray="5 4" />
                        <PlanePoint map={map} point={[-1, 1]} color={SECOND} radius={5.5} />
                        <PlanePoint map={map} point={[1, -1]} color={SECOND} radius={5.5} />
                        <PlanePoint map={map} point={[0, 0]} color={INK} radius={4.5} />
                    </g>
                )}
            </Frame>
            <F x={540} y={262} size={18} anchor="middle" color={SECOND}>f(−x) = −f(x)</F>
            <Label x={540} y={286} textAnchor="middle" fontSize={14} fill={INK}>{t(say('Jatorriarekiko simetrikoa', 'Simétrica respecto del origen', 'متناظرة حول الأصل'))}</Label>
            <Caption y={306}>{t(say('Kalkulatu f(−x) eta konparatu f(x)-rekin', 'Calcula f(−x) y compárala con f(x)', 'احسب f(−x) وقارنها بـ f(x)'))}</Caption>
        </Figure>
    )
}

/* ---------- Hero art: a graph with a jump, a domain and a symmetry ---------- */

export function FunctionsAkHeroArt() {
    return (
        <div className="fraction-v2-collage" aria-hidden="true">
            <svg viewBox="0 0 520 400" direction="ltr" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                <g transform="translate(24 28) rotate(-4)">
                    <rect width={270} height={200} rx={16} fill={PAPER} stroke={INK} strokeWidth={2} />
                    <line x1={20} y1={150} x2={255} y2={150} stroke={INK} strokeWidth={2} />
                    <line x1={135} y1={185} x2={135} y2={18} stroke={INK} strokeWidth={2} />
                    <path d="M30 60 Q 80 140 120 120" fill="none" stroke="#2f6fdb" strokeWidth={4} strokeLinecap="round" />
                    <circle cx={120} cy={120} r={6} fill={PAPER} stroke="#2f6fdb" strokeWidth={3} />
                    <path d="M120 70 Q 170 40 245 90" fill="none" stroke="#c4432a" strokeWidth={4} strokeLinecap="round" />
                    <circle cx={120} cy={70} r={6} fill="#c4432a" />
                </g>
                <g transform="translate(316 52) rotate(5)">
                    <rect width={180} height={120} rx={16} fill={GREEN_TINT} stroke={INK} strokeWidth={2} />
                    <text x={90} y={72} textAnchor="middle" fontSize={24} fontWeight={700} fill={INK} fontFamily={SERIF}>ℝ − {'{'}2{'}'}</text>
                </g>
                <g transform="translate(60 268) rotate(2)">
                    <rect width={400} height={88} rx={16} fill={CORAL_TINT} stroke={INK} strokeWidth={2} />
                    <text x={200} y={58} textAnchor="middle" fontSize={30} fontWeight={700} fill={INK} fontFamily={SERIF}>f(−x) = f(x)</text>
                </g>
            </svg>
        </div>
    )
}
