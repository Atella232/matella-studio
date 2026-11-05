import type { ReactNode } from 'react'
import { pickText, type LocalizedText, type UnitLanguage } from '../../features/unit-v2/types'
import { AxisTitles, Label, PlaneGrid, PlaneLine, PlanePath, PlanePoint } from '../dbh2-funtzioak-v2/plane'
import { useBoxClip } from '../dbh2-funtzioak-v2/planeClip'
import { planeMap, type PlaneBox, type PlaneMap } from '../dbh2-funtzioak-v2/planeMap'
import { Figure } from '../dbh2-zatikiak-prototype/figures'
import { sampled } from '../dbh4-aplikatuak-funtzioak/functions'

/* ==========================================================================
   Funtzio elementalak · Batxilergoa 1 · Zientziak — the new lesson
   figures: the domain as the common part of its conditions, a periodic
   function brought back to its first piece, the translations, reflections
   and stretches of a graph, the machines of a function and its inverse,
   the mirror y = x, the ranges of the arc functions, a piecewise function
   with its jump, |x² − 2x − 3| folded up, the staircase of E(x), the table
   of f·g and f/g and two machines in both orders. Symmetry and the
   exponential and the logarithm reuse the 4. DBH figures. Formulas sit in
   their own <text> (left to right in every language); words go through
   <Label>, and the Arabic captions carry words only.
   ========================================================================== */

const INK = 'var(--ink, #1d2733)'
const MUTED = 'var(--muted, #58616e)'
const STAGE = 'var(--stage, #2f6fdb)'
const STAGE_TINT = 'var(--stage-tint, #dde7f7)'
const SECOND = 'var(--second, #c4432a)'
const GREEN = 'var(--success, #267b53)'
const MUSTARD = 'var(--mustard, #e0a100)'
const CARD = 'var(--card, #fffcf6)'
const PAPER = '#fffcf6'
const SERIF = 'Fraunces, serif'

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const useText = (language: UnitLanguage) => (text: LocalizedText) => pickText(language, text)

function Caption({ y, children, x = 360 }: { y: number; children: ReactNode; x?: number }) {
    return <Label x={x} y={y} textAnchor="middle" fontSize={19} fill={MUTED}>{children}</Label>
}

/** A formula written left to right whatever the language */
function F({ x, y, children, size = 19, color = INK, anchor = 'start', weight = 700 }: { x: number; y: number; children: ReactNode; size?: number; color?: string; anchor?: 'start' | 'middle' | 'end'; weight?: number }) {
    return <text x={x} y={y} textAnchor={anchor} fontSize={size} fontWeight={weight} fill={color} direction="ltr">{children}</text>
}

/** A short coloured stroke used as a legend key */
function Key({ x, y, color, dashed = false }: { x: number; y: number; color: string; dashed?: boolean }) {
    return <line x1={x} y1={y - 6} x2={x + 26} y2={y - 6} stroke={color} strokeWidth={4} strokeLinecap="round" strokeDasharray={dashed ? '6 5' : undefined} />
}

/** A small Cartesian plane placed at (ox, oy) inside a figure */
function Frame({ box, cell, ox, oy, labelStep = 1, children }: { box: PlaneBox; cell: number; ox: number; oy: number; labelStep?: number; children?: (map: PlaneMap, clip: string) => ReactNode }) {
    const map = planeMap(box, cell, ox, oy)
    const [clipPath, clip] = useBoxClip(map)
    return (
        <g>
            <defs>{clipPath}</defs>
            <rect x={ox} y={oy} width={map.width} height={map.height} fill={CARD} />
            <PlaneGrid map={map} labelStep={labelStep} />
            <AxisTitles map={map} />
            {children?.(map, clip)}
        </g>
    )
}

function Arrow({ x1, y1, x2, y2, color = MUTED }: { x1: number; y1: number; x2: number; y2: number; color?: string }) {
    const angle = Math.atan2(y2 - y1, x2 - x1)
    const head = (turn: number) => `${x2 - 12 * Math.cos(angle + turn)},${y2 - 12 * Math.sin(angle + turn)}`
    return (
        <g>
            <line x1={x1} y1={y1} x2={x2 - 8 * Math.cos(angle)} y2={y2 - 8 * Math.sin(angle)} stroke={color} strokeWidth={2.6} strokeLinecap="round" />
            <polygon points={`${x2},${y2} ${head(0.45)} ${head(-0.45)}`} fill={color} />
        </g>
    )
}

/* ---------- 1. The domain: every condition at once ---------- */

/** One number line from −4 to 6 with a shaded stretch [from, to) or (from, to] and its ends */
function ConditionLine({ y, from, to, hole, color, label }: { y: number; from: number; to: number; hole?: number; color: string; label: ReactNode }) {
    const x = (value: number) => 250 + (value + 4) * 42
    const left = Math.max(from, -4.4)
    const right = Math.min(to, 6.4)
    return (
        <g>
            {label}
            <line x1={x(-4.4)} x2={x(6.4)} y1={y} y2={y} stroke={INK} strokeWidth={2} />
            {[-4, -2, 0, 2, 4, 6].map((value) => (
                <g key={value}>
                    <line x1={x(value)} x2={x(value)} y1={y - 5} y2={y + 5} stroke={INK} strokeWidth={1.6} />
                    <text x={x(value)} y={y + 26} textAnchor="middle" fontSize={19} fill={MUTED} direction="ltr">{value < 0 ? `−${-value}` : value}</text>
                </g>
            ))}
            <line x1={x(left)} x2={x(right)} y1={y} y2={y} stroke={color} strokeWidth={7} strokeLinecap="butt" opacity={0.85} />
            {from > -4.4 && <circle cx={x(from)} cy={y} r={7} fill={color} stroke={CARD} strokeWidth={2} />}
            {hole !== undefined && <circle cx={x(hole)} cy={y} r={7} fill={CARD} stroke={SECOND} strokeWidth={3} />}
        </g>
    )
}

export function DomainFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    return (
        <Figure height={336} label={t(say('√(x + 2)/(x − 3) funtzioaren izate-eremua: bi baldintzen zati komuna', 'El dominio de √(x + 2)/(x − 3): la parte común de las dos condiciones', 'مجال √(x + 2)/(x − 3): الجزء المشترك بين الشرطين', 'The domain of √(x + 2)/(x − 3): the common part of the two conditions'))}>
            <F x={360} y={40} anchor="middle" size={24} color={STAGE}>f(x) = √(x + 2) / (x − 3)</F>
            <ConditionLine y={100} from={-2} to={7} color={STAGE} label={<F x={30} y={107} size={24} color={STAGE}>x + 2 ≥ 0</F>} />
            <ConditionLine y={180} from={-5} to={7} hole={3} color={MUSTARD} label={<F x={30} y={187} size={24} color={MUSTARD}>x − 3 ≠ 0</F>} />
            <ConditionLine y={260} from={-2} to={7} hole={3} color={GREEN} label={<Label x={30} y={267} fontSize={22} fontWeight={700} fill={GREEN}>{t(say('Biak batera', 'Las dos', 'كلاهما', 'Both'))}</Label>} />
            <F x={460} y={322} anchor="middle" size={24} color={GREEN}>[−2, 3) ∪ (3, +∞)</F>
        </Figure>
    )
}

/* ---------- 3. A periodic function: back to its first piece ---------- */

export function PeriodicFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const piece = (shift: number) => sampled((x) => (x - shift) ** 2, shift - 2, shift + 2, 0.05)
    return (
        <Figure height={318} label={t(say('Periodoa 4 duen funtzioa: f(7) = f(3) = f(−1) = 1', 'Función de periodo 4: f(7) = f(3) = f(−1) = 1', 'دالة دورها 4: f(7) = f(3) = f(−1) = 1', 'A function of period 4: f(7) = f(3) = f(−1) = 1'))}>
            <Frame box={{ xMin: -3, xMax: 9, yMin: -1, yMax: 5 }} cell={40} ox={110} oy={36}>
                {(map, clip) => (
                    <g>
                        {[-4, 0, 4, 8].map((shift) => (
                            <g key={shift}>
                                <PlanePath map={map} points={piece(shift)} color={shift === 0 ? STAGE : MUTED} width={shift === 0 ? 4 : 3} clip={clip} />
                                {shift - 2 >= -3 && <PlanePoint map={map} point={[shift - 2, 4]} color={shift === 0 ? STAGE : MUTED} radius={5} />}
                                {shift + 2 <= 9 && <PlanePoint map={map} point={[shift + 2, 4]} color={shift === 0 ? STAGE : MUTED} radius={5} hollow />}
                            </g>
                        ))}
                        <PlanePoint map={map} point={[7, 1]} color={SECOND} radius={7} />
                        <PlanePoint map={map} point={[3, 1]} color={MUSTARD} radius={6} />
                        <PlanePoint map={map} point={[-1, 1]} color={GREEN} radius={7} />
                        <Arrow x1={map.x(7) - 10} y1={map.y(1) + 34} x2={map.x(3) + 8} y2={map.y(1) + 34} color={SECOND} />
                        <Arrow x1={map.x(3) - 10} y1={map.y(1) + 34} x2={map.x(-1) + 8} y2={map.y(1) + 34} color={SECOND} />
                        <text x={map.x(5)} y={map.y(1) + 26} textAnchor="middle" fontSize={17} fontWeight={700} fill={SECOND} direction="ltr">−4</text>
                        <text x={map.x(1)} y={map.y(1) + 26} textAnchor="middle" fontSize={17} fontWeight={700} fill={SECOND} direction="ltr">−4</text>
                    </g>
                )}
            </Frame>
            <Caption y={306}>{t(say('Zati urdina errepikatzen da 4 unitatez behin', 'El trozo azul se repite cada 4 unidades', 'الجزء الأزرق يتكرر كل 4 وحدات', 'The blue piece repeats every 4 units'))}</Caption>
        </Figure>
    )
}

/* ---------- 4. Translations: √x → √(x + 3) − 2 ---------- */

export function ShiftsFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    return (
        <Figure height={318} label={t(say('y = √x eta y = √(x + 3) − 2: 3 ezkerrera eta 2 behera', 'y = √x e y = √(x + 3) − 2: 3 a la izquierda y 2 hacia abajo', 'y = √x وy = √(x + 3) − 2: ثلاث وحدات إلى اليسار ووحدتان إلى الأسفل', 'y = √x and y = √(x + 3) − 2: 3 to the left and 2 down'))}>
            <Frame box={{ xMin: -4, xMax: 6, yMin: -3, yMax: 4 }} cell={36} ox={36} oy={30}>
                {(map, clip) => (
                    <g>
                        <PlanePath map={map} points={sampled((x) => Math.sqrt(x), 0, 7, 0.02)} color={MUTED} width={3} dashed clip={clip} />
                        <PlanePath map={map} points={sampled((x) => Math.sqrt(x + 3) - 2, -3, 7, 0.02)} color={STAGE} width={4} clip={clip} />
                        <PlanePoint map={map} point={[0, 0]} color={MUTED} radius={6} />
                        <PlanePoint map={map} point={[-3, 0]} color={MUSTARD} radius={5} hollow />
                        <PlanePoint map={map} point={[-3, -2]} color={STAGE} radius={7} />
                        <Arrow x1={map.x(0) - 8} y1={map.y(0)} x2={map.x(-3) + 8} y2={map.y(0)} color={MUSTARD} />
                        <Arrow x1={map.x(-3)} y1={map.y(0) + 8} x2={map.x(-3)} y2={map.y(-2) - 8} color={SECOND} />
                    </g>
                )}
            </Frame>
            <Key x={420} y={70} color={MUTED} dashed />
            <F x={456} y={70} color={MUTED}>y = √x</F>
            <Key x={420} y={106} color={STAGE} />
            <F x={456} y={106} color={STAGE}>y = √(x + 3) − 2</F>
            <F x={420} y={160} color={MUSTARD}>x + 3</F>
            <Label x={420} y={186} fontSize={16} fill={INK}>{t(say('3 unitate ezkerrera', '3 unidades a la izquierda', 'ثلاث وحدات إلى اليسار', '3 units to the left'))}</Label>
            <F x={420} y={226} color={SECOND}>− 2</F>
            <Label x={420} y={252} fontSize={16} fill={INK}>{t(say('2 unitate behera', '2 unidades hacia abajo', 'وحدتان إلى الأسفل', '2 units down'))}</Label>
            <F x={420} y={292} color={STAGE}>(0, 0) → (−3, −2)</F>
        </Figure>
    )
}

/* ---------- 5. Reflections in the axes ---------- */

export function ReflectionsFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    return (
        <Figure height={318} label={t(say('y = √x, X ardatzean islatuta (y = −√x) eta Y ardatzean islatuta (y = √(−x))', 'y = √x reflejada en el eje X (y = −√x) y en el eje Y (y = √(−x))', 'y = √x منعكسة في محور X (y = −√x) وفي محور Y (y = √(−x))', 'y = √x reflected in the x-axis (y = −√x) and in the y-axis (y = √(−x))'))}>
            <Frame box={{ xMin: -5, xMax: 5, yMin: -3, yMax: 3 }} cell={34} ox={36} oy={50}>
                {(map, clip) => (
                    <g>
                        <PlanePath map={map} points={sampled((x) => Math.sqrt(x), 0, 6, 0.02)} color={STAGE} width={4} clip={clip} />
                        <PlanePath map={map} points={sampled((x) => -Math.sqrt(x), 0, 6, 0.02)} color={SECOND} width={3.4} clip={clip} />
                        <PlanePath map={map} points={sampled((x) => Math.sqrt(-x), -6, 0, 0.02)} color={GREEN} width={3.4} clip={clip} />
                        <PlanePoint map={map} point={[4, 2]} color={STAGE} radius={6} />
                        <PlanePoint map={map} point={[4, -2]} color={SECOND} radius={6} />
                        <PlanePoint map={map} point={[-4, 2]} color={GREEN} radius={6} />
                    </g>
                )}
            </Frame>
            <Key x={420} y={84} color={STAGE} />
            <F x={456} y={84} color={STAGE}>y = √x</F>
            <Key x={420} y={130} color={SECOND} />
            <F x={456} y={130} color={SECOND}>y = −√x</F>
            <Label x={456} y={156} fontSize={16} fill={INK}>{t(say('X ardatzean islatuta', 'reflejada en el eje X', 'منعكسة في محور X', 'reflected in the x-axis'))}</Label>
            <Key x={420} y={204} color={GREEN} />
            <F x={456} y={204} color={GREEN}>y = √(−x)</F>
            <Label x={456} y={230} fontSize={16} fill={INK}>{t(say('Y ardatzean islatuta', 'reflejada en el eje Y', 'منعكسة في محور Y', 'reflected in the y-axis'))}</Label>
            <F x={420} y={280} color={MUTED} size={17}>(4, 2) → (4, −2) · (−4, 2)</F>
        </Figure>
    )
}

/* ---------- 6. Stretching and squeezing ---------- */

export function StretchFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const tent = (scale: number, width: number): [number, number][] => [[0, 0], [width / 2, 3 * scale], [width, 0]]
    return (
        <Figure height={318} label={t(say('f, 2f(x) eta f(2x): altuera bikoiztu edo zabalera erdira', 'f, 2f(x) y f(2x): doble de alto o la mitad de ancho', 'f و2f(x) وf(2x): ضعف الارتفاع أو نصف العرض', 'f, 2f(x) and f(2x): twice as tall or half as wide'))}>
            <Frame box={{ xMin: -1, xMax: 9, yMin: -1, yMax: 7 }} cell={34} ox={36} oy={22}>
                {(map, clip) => (
                    <g>
                        <PlanePath map={map} points={tent(1, 8)} color={MUTED} width={3} dashed clip={clip} />
                        <PlanePath map={map} points={tent(2, 8)} color={STAGE} width={3.8} clip={clip} />
                        <PlanePath map={map} points={tent(1, 4)} color={SECOND} width={3.8} clip={clip} />
                        <PlanePoint map={map} point={[4, 3]} color={MUTED} radius={6} />
                        <PlanePoint map={map} point={[4, 6]} color={STAGE} radius={6} />
                        <PlanePoint map={map} point={[2, 3]} color={SECOND} radius={6} />
                    </g>
                )}
            </Frame>
            <Key x={420} y={70} color={MUTED} dashed />
            <F x={456} y={70} color={MUTED}>y = f(x)</F>
            <Key x={420} y={116} color={STAGE} />
            <F x={456} y={116} color={STAGE}>y = 2f(x)</F>
            <Label x={456} y={142} fontSize={16} fill={INK}>{t(say('altuera bider 2', 'altura por 2', 'الارتفاع × 2', 'height times 2'))}</Label>
            <Key x={420} y={190} color={SECOND} />
            <F x={456} y={190} color={SECOND}>y = f(2x)</F>
            <Label x={456} y={216} fontSize={16} fill={INK}>{t(say('zabalera erdira', 'ancho a la mitad', 'نصف العرض', 'half the width'))}</Label>
            <F x={420} y={270} color={MUTED} size={17}>(4, 3) → (4, 6) · (2, 3)</F>
        </Figure>
    )
}

/* ---------- 7. A function and its inverse as machines ---------- */

function Machine({ x, y, text, color }: { x: number; y: number; text: string; color: string }) {
    return (
        <g>
            <rect x={x - 52} y={y - 30} width={104} height={56} rx={12} fill={PAPER} stroke={color} strokeWidth={2.6} />
            <text x={x} y={y + 8} textAnchor="middle" fontSize={24} fontWeight={700} fill={color} direction="ltr">{text}</text>
        </g>
    )
}

function Value({ x, y, text, color = INK }: { x: number; y: number; text: string; color?: string }) {
    return <text x={x} y={y + 8} textAnchor="middle" fontSize={26} fontWeight={700} fill={color} direction="ltr" fontFamily={SERIF}>{text}</text>
}

export function MachineFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    return (
        <Figure height={300} label={t(say('f(x) = 2x − 6: 5 → 4, eta alderantzizkoak 4 → 5 egiten du', 'f(x) = 2x − 6 lleva 5 a 4, y la inversa devuelve 4 a 5', 'f(x) = 2x − 6 تأخذ 5 إلى 4، والعكسية تعيد 4 إلى 5', 'f(x) = 2x − 6 takes 5 to 4, and the inverse takes 4 back to 5'))}>
            <F x={40} y={44} size={22} color={STAGE}>f</F>
            <Value x={70} y={92} text="5" />
            <Arrow x1={92} y1={92} x2={150} y2={92} />
            <Machine x={206} y={92} text="· 2" color={STAGE} />
            <Arrow x1={262} y1={92} x2={318} y2={92} />
            <Value x={350} y={92} text="10" />
            <Arrow x1={384} y1={92} x2={440} y2={92} />
            <Machine x={496} y={92} text="− 6" color={STAGE} />
            <Arrow x1={552} y1={92} x2={608} y2={92} />
            <Value x={640} y={92} text="4" color={STAGE} />
            <F x={40} y={176} size={22} color={GREEN}>f⁻¹</F>
            <Value x={70} y={224} text="5" color={GREEN} />
            <Arrow x1={150} y1={224} x2={92} y2={224} color={GREEN} />
            <Machine x={206} y={224} text="÷ 2" color={GREEN} />
            <Arrow x1={318} y1={224} x2={262} y2={224} color={GREEN} />
            <Value x={350} y={224} text="10" />
            <Arrow x1={440} y1={224} x2={384} y2={224} color={GREEN} />
            <Machine x={496} y={224} text="+ 6" color={GREEN} />
            <Arrow x1={608} y1={224} x2={552} y2={224} color={GREEN} />
            <Value x={640} y={224} text="4" />
            <Caption y={290}>{t(say('Alderantzizkoak eragiketa kontrakoak egiten ditu, alderantzizko ordenan', 'La inversa hace las operaciones contrarias, en orden inverso', 'العكسية تجري العمليات المعاكسة بترتيب معكوس', 'The inverse does the opposite operations, in reverse order'))}</Caption>
        </Figure>
    )
}

/* ---------- 8. The mirror y = x ---------- */

export function MirrorFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    return (
        <Figure height={330} label={t(say('y = x² − 1 (x ≥ 0) eta haren alderantzizkoa y = √(x + 1), y = x zuzenarekiko simetrikoak', 'y = x² − 1 (x ≥ 0) y su inversa y = √(x + 1), simétricas respecto de y = x', 'y = x² − 1 (x ≥ 0) ودالتها العكسية y = √(x + 1)، متناظرتان بالنسبة إلى y = x', 'y = x² − 1 (x ≥ 0) and its inverse y = √(x + 1), symmetric about y = x'))}>
            <Frame box={{ xMin: -2, xMax: 5, yMin: -2, yMax: 5 }} cell={40} ox={36} oy={24}>
                {(map, clip) => (
                    <g>
                        <PlaneLine map={map} m={1} n={0} color={MUTED} width={2.4} dashed clip={clip} />
                        <PlanePath map={map} points={sampled((x) => x * x - 1, -2.4, 0, 0.02)} color={MUTED} width={2.4} dashed clip={clip} />
                        <PlanePath map={map} points={sampled((x) => x * x - 1, 0, 2.6, 0.02)} color={STAGE} width={4} clip={clip} />
                        <PlanePath map={map} points={sampled((x) => Math.sqrt(x + 1), -1, 6, 0.02)} color={GREEN} width={4} clip={clip} />
                        <line x1={map.x(2)} y1={map.y(3)} x2={map.x(3)} y2={map.y(2)} stroke={SECOND} strokeWidth={2} strokeDasharray="5 4" />
                        <PlanePoint map={map} point={[2, 3]} color={STAGE} radius={6} />
                        <PlanePoint map={map} point={[3, 2]} color={GREEN} radius={6} />
                        <PlanePoint map={map} point={[0, -1]} color={STAGE} radius={5} />
                        <PlanePoint map={map} point={[-1, 0]} color={GREEN} radius={5} />
                    </g>
                )}
            </Frame>
            <Key x={380} y={64} color={STAGE} />
            <F x={414} y={64} color={STAGE}>y = x² − 1</F>
            <Key x={380} y={102} color={GREEN} />
            <F x={414} y={102} color={GREEN}>y = √(x + 1)</F>
            <Key x={380} y={140} color={MUTED} dashed />
            <F x={414} y={140} color={MUTED}>y = x</F>
            <F x={380} y={190} color={SECOND}>(2, 3) ↔ (3, 2)</F>
            <Label x={380} y={232} fontSize={16} fill={INK}>{t(say('Zuzen horizontal batek bi aldiz', 'Una recta horizontal la cortaría', 'المستقيم الأفقي يقطعها مرتين:', 'A horizontal line would cut it twice:'))}</Label>
            <Label x={380} y={256} fontSize={16} fill={INK}>{t(say('mozten du: adar bat hartzen da', 'dos veces: se toma una rama', 'نأخذ فرعًا واحدًا', 'one branch is taken'))}</Label>
            <F x={380} y={296} color={STAGE} size={17}>x ≥ 0</F>
        </Figure>
    )
}

/* ---------- 10. Where the arc functions land ---------- */

function HalfCircle({ cx, cy, from, to, color, ends, title }: { cx: number; cy: number; from: number; to: number; color: string; ends: [string, string]; title: ReactNode }) {
    const r = 92
    const point = (angle: number) => [cx + r * Math.cos(angle), cy - r * Math.sin(angle)]
    const [x1, y1] = point(from)
    const [x2, y2] = point(to)
    return (
        <g>
            {title}
            <circle cx={cx} cy={cy} r={r} fill="none" stroke={MUTED} strokeWidth={1.6} strokeDasharray="5 5" />
            <line x1={cx - r - 16} x2={cx + r + 16} y1={cy} y2={cy} stroke={INK} strokeWidth={1.4} />
            <line x1={cx} x2={cx} y1={cy - r - 16} y2={cy + r + 16} stroke={INK} strokeWidth={1.4} />
            <path d={`M ${x1} ${y1} A ${r} ${r} 0 0 0 ${x2} ${y2}`} fill="none" stroke={color} strokeWidth={7} strokeLinecap="round" />
            <circle cx={x1} cy={y1} r={6} fill={color} />
            <circle cx={x2} cy={y2} r={6} fill={color} />
            <text x={x1 + (from < 0 ? 14 : 0)} y={y1 + (from < 0 ? 22 : -14)} textAnchor="middle" fontSize={18} fontWeight={700} fill={color} direction="ltr">{ends[0]}</text>
            <text x={x2 + (to > 3 ? -18 : 14)} y={y2 - 14} textAnchor="middle" fontSize={18} fontWeight={700} fill={color} direction="ltr">{ends[1]}</text>
        </g>
    )
}

export function ArcFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const sine = language === 'es' ? 'arcsen x' : 'arcsin x'
    const tangent = language === 'es' || language === 'eu' ? 'arctg x' : 'arctan x'
    return (
        <Figure height={330} label={t(say('Arku sinuak eskuineko erdia ematen du, eta arku kosinuak goiko erdia', 'El arco seno da la mitad derecha y el arco coseno, la mitad de arriba', 'قوس الجيب يعطي النصف الأيمن وقوس جيب التمام النصف العلوي', 'The arc sine gives the right half and the arc cosine, the top half'))}>
            <HalfCircle cx={190} cy={170} from={-Math.PI / 2} to={Math.PI / 2} color={STAGE} ends={['−π/2', 'π/2']} title={<F x={190} y={36} anchor="middle" size={22} color={STAGE}>{`${sine}, ${tangent}`}</F>} />
            <HalfCircle cx={530} cy={170} from={0} to={Math.PI} color={GREEN} ends={['0', 'π']} title={<F x={530} y={36} anchor="middle" size={22} color={GREEN}>arccos x</F>} />
            <Caption y={312}>{t(say('Angelu bakarra, radianetan, zati nabarmendutik', 'Un solo ángulo, en radianes, del trozo marcado', 'زاوية واحدة بالراديان من الجزء المميّز', 'A single angle, in radians, from the marked part'))}</Caption>
        </Figure>
    )
}

/* ---------- 11. A piecewise function with a jump ---------- */

export function PiecewiseBachFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    return (
        <Figure height={330} label={t(say('Hiru zatiko funtzioa: jauzia x = −1 puntuan, eta zatiak elkartuta x = 2 puntuan', 'Función de tres trozos: salta en x = −1 y los trozos se unen en x = 2', 'دالة من ثلاثة أجزاء: قفزة عند x = −1 واتصال عند x = 2', 'A three-piece function: it jumps at x = −1 and the pieces join at x = 2'))}>
            <Frame box={{ xMin: -5, xMax: 6, yMin: -2, yMax: 5 }} cell={36} ox={36} oy={36}>
                {(map, clip) => (
                    <g>
                        <PlanePath map={map} points={[[-6, -3], [-1, 2]]} color={SECOND} width={4} clip={clip} />
                        <PlanePath map={map} points={sampled((x) => x * x, -1, 2, 0.02)} color={STAGE} width={4} clip={clip} />
                        <PlanePath map={map} points={[[2, 4], [7, -1]]} color={GREEN} width={4} clip={clip} />
                        <PlanePoint map={map} point={[-1, 2]} color={SECOND} radius={6} hollow />
                        <PlanePoint map={map} point={[-1, 1]} color={STAGE} radius={6} />
                        <PlanePoint map={map} point={[2, 4]} color={STAGE} radius={6} />
                    </g>
                )}
            </Frame>
            <F x={460} y={74} color={SECOND}>x + 3</F>
            <F x={560} y={74} color={SECOND} weight={400}>x &lt; −1</F>
            <F x={460} y={112} color={STAGE}>x²</F>
            <F x={560} y={112} color={STAGE} weight={400}>−1 ≤ x ≤ 2</F>
            <F x={460} y={150} color={GREEN}>6 − x</F>
            <F x={560} y={150} color={GREEN} weight={400}>x &gt; 2</F>
            <Label x={460} y={204} fontSize={16} fill={INK}>{t(say('x = −1 puntuan, jauzia:', 'En x = −1, salto:', 'عند x = −1 قفزة:', 'At x = −1, a jump:'))}</Label>
            <F x={460} y={232} color={SECOND}>2 ≠ 1</F>
            <Label x={460} y={270} fontSize={16} fill={INK}>{t(say('x = 2 puntuan, elkartuta:', 'En x = 2, se unen:', 'عند x = 2 يتصلان:', 'At x = 2, they join:'))}</Label>
            <F x={460} y={298} color={GREEN}>2² = 6 − 2 = 4</F>
        </Figure>
    )
}

/* ---------- 12. |x² − 2x − 3| folded up ---------- */

export function AbsoluteGraphFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const f = (x: number) => x * x - 2 * x - 3
    return (
        <Figure height={330} label={t(say('y = x² − 2x − 3 eta y = |x² − 2x − 3|: −1 eta 3 arteko zatia gora tolesten da', 'y = x² − 2x − 3 e y = |x² − 2x − 3|: el trozo entre −1 y 3 se dobla hacia arriba', 'y = x² − 2x − 3 وy = |x² − 2x − 3|: يُطوى الجزء بين −1 و3 إلى الأعلى', 'y = x² − 2x − 3 and y = |x² − 2x − 3|: the piece between −1 and 3 is folded up'))}>
            <Frame box={{ xMin: -3, xMax: 5, yMin: -5, yMax: 6 }} cell={26} ox={40} oy={24}>
                {(map, clip) => (
                    <g>
                        <PlanePath map={map} points={sampled(f, -1, 3, 0.02)} color={MUTED} width={2.6} dashed clip={clip} />
                        <PlanePath map={map} points={sampled((x) => Math.abs(f(x)), -4, 6, 0.02)} color={STAGE} width={4} clip={clip} />
                        <PlanePoint map={map} point={[-1, 0]} color={SECOND} radius={6} />
                        <PlanePoint map={map} point={[3, 0]} color={SECOND} radius={6} />
                        <PlanePoint map={map} point={[1, -4]} color={MUTED} radius={5} />
                        <PlanePoint map={map} point={[1, 4]} color={STAGE} radius={6} />
                        <Arrow x1={map.x(1) + 18} y1={map.y(-4)} x2={map.x(1) + 18} y2={map.y(4)} color={MUSTARD} />
                    </g>
                )}
            </Frame>
            <Key x={300} y={64} color={MUTED} dashed />
            <F x={334} y={64} color={MUTED}>y = x² − 2x − 3</F>
            <Key x={300} y={102} color={STAGE} />
            <F x={334} y={102} color={STAGE}>y = |x² − 2x − 3|</F>
            <Label x={300} y={150} fontSize={16} fill={INK}>{t(say('Erroak: −1 eta 3', 'Raíces: −1 y 3', 'الجذران: −1 و3', 'Roots: −1 and 3'))}</Label>
            <Label x={300} y={186} fontSize={16} fill={INK}>{t(say('Bien artean negatiboa da: zeinua aldatzen zaio', 'Entre las dos es negativa: se le cambia el signo', 'بينهما سالبة: نغيّر إشارتها', 'Between them it is negative: its sign is changed'))}</Label>
            <F x={300} y={226} color={STAGE}>−x² + 2x + 3</F>
            <F x={300} y={262} color={MUSTARD}>(1, −4) → (1, 4)</F>
        </Figure>
    )
}

/* ---------- 13. The staircase of E(x) ---------- */

export function StairsFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    /** The decimal comma of Basque and Spanish, the point of English and Arabic */
    const d = (value: string) => (language === 'en' || language === 'ar' ? value.replace(/,/g, '.') : value)
    return (
        <Figure height={318} label={t(say('y = E(x) eskailera: maila bakoitza ezkerrean itxita eta eskuinean irekita', 'La escalera y = E(x): cada peldaño cerrado a la izquierda y abierto a la derecha', 'درج y = E(x): كل درجة مغلقة من اليسار ومفتوحة من اليمين', 'The staircase y = E(x): each step closed on the left and open on the right'))}>
            <Frame box={{ xMin: -4, xMax: 4, yMin: -4, yMax: 4 }} cell={34} ox={36} oy={24}>
                {(map, clip) => (
                    <g>
                        {[-4, -3, -2, -1, 0, 1, 2, 3].map((step) => (
                            <g key={step}>
                                <PlanePath map={map} points={[[step, step], [step + 1, step]]} color={STAGE} width={4} clip={clip} />
                                <PlanePoint map={map} point={[step, step]} color={STAGE} radius={5} />
                                <PlanePoint map={map} point={[step + 1, step]} color={STAGE} radius={5} hollow />
                            </g>
                        ))}
                        <PlanePoint map={map} point={[-2.4, -3]} color={SECOND} radius={7} />
                        <line x1={map.x(-2.4)} x2={map.x(-2.4)} y1={map.y(0)} y2={map.y(-3)} stroke={SECOND} strokeWidth={2} strokeDasharray="5 4" />
                    </g>
                )}
            </Frame>
            <F x={360} y={64} size={22} color={STAGE}>y = E(x)</F>
            <F x={360} y={110} color={INK}>{d('E(3,7) = 3')}</F>
            <F x={360} y={150} color={SECOND}>{d('E(−2,4) = −3')}</F>
            <Label x={360} y={194} fontSize={16} fill={INK}>{t(say('Negatiboekin ere behera', 'Con negativos, también hacia abajo', 'مع السالبة أيضًا إلى الأسفل', 'With negatives, also down'))}</Label>
            <F x={360} y={240} color={GREEN}>{d('−2,4 − (−3) = 0,6')}</F>
            <Label x={360} y={272} fontSize={16} fill={INK}>{t(say('zati hamartarra', 'parte decimal', 'الجزء الكسري', 'fractional part'))}</Label>
        </Figure>
    )
}

/* ---------- 14. f·g and f/g, value by value ---------- */

export function OperationsFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const rows: Array<[string, string, string, string, string]> = [
        ['−3', '8', '0', '0', '✗'],
        ['0', '−1', '3', '−3', '−1/3'],
        ['2', '3', '5', '15', '3/5']
    ]
    const heads = ['x', 'f(x)', 'g(x)', 'f · g', 'f / g']
    const columns = [110, 230, 350, 470, 590]
    return (
        <Figure height={300} label={t(say('f(x) = x² − 1 eta g(x) = x + 3: biderkadura eta zatidura, balioz balio', 'f(x) = x² − 1 y g(x) = x + 3: producto y cociente, valor a valor', 'f(x) = x² − 1 وg(x) = x + 3: الجداء وخارج القسمة قيمة بقيمة', 'f(x) = x² − 1 and g(x) = x + 3: product and quotient, value by value'))}>
            <F x={360} y={36} anchor="middle" size={20} color={STAGE}>f(x) = x² − 1    g(x) = x + 3</F>
            <rect x={50} y={58} width={620} height={46} rx={10} fill={STAGE_TINT} stroke={INK} strokeWidth={1.4} />
            {heads.map((head, index) => <F key={head} x={columns[index]} y={88} anchor="middle" size={20}>{head}</F>)}
            {rows.map((row, rowIndex) => (
                <g key={row[0]}>
                    {row.map((cell, index) => (
                        <F key={index} x={columns[index]} y={146 + rowIndex * 48} anchor="middle" size={20} color={cell === '✗' ? SECOND : index >= 3 ? GREEN : INK}>{cell}</F>
                    ))}
                </g>
            ))}
            <Caption y={286}>{t(say('x = −3 denean, g(x) = 0: zatidurarik ez', 'En x = −3, g(x) = 0: no hay cociente', 'عند x = −3 يكون g(x) = 0: لا يوجد خارج قسمة', 'At x = −3, g(x) = 0: there is no quotient'))}</Caption>
        </Figure>
    )
}

/* ---------- 15. Two machines, in both orders ---------- */

export function CompositionFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const chain = (y: number, first: string, middle: string, second: string, end: string, color: string) => (
        <g>
            <Value x={60} y={y} text="1" />
            <Arrow x1={84} y1={y} x2={140} y2={y} />
            <Machine x={196} y={y} text={first} color={color} />
            <Arrow x1={252} y1={y} x2={308} y2={y} />
            <Value x={340} y={y} text={middle} />
            <Arrow x1={372} y1={y} x2={428} y2={y} />
            <Machine x={484} y={y} text={second} color={color} />
            <Arrow x1={540} y1={y} x2={596} y2={y} />
            <Value x={636} y={y} text={end} color={color} />
        </g>
    )
    return (
        <Figure height={300} label={t(say('(f ∘ g)(1) = 16 eta (g ∘ f)(1) = 4: ordenak garrantzia du', '(f ∘ g)(1) = 16 y (g ∘ f)(1) = 4: el orden importa', '(f ∘ g)(1) = 16 و(g ∘ f)(1) = 4: الترتيب مهم', '(f ∘ g)(1) = 16 and (g ∘ f)(1) = 4: the order matters'))}>
            <F x={40} y={44} size={21} color={STAGE}>f ∘ g</F>
            {chain(92, '+ 3', '4', 'x²', '16', STAGE)}
            <F x={40} y={176} size={21} color={GREEN}>g ∘ f</F>
            {chain(224, 'x²', '1', '+ 3', '4', GREEN)}
            <Caption y={290}>{t(say('Goian, lehenik g (+ 3) eta gero f (x²)', 'Arriba, primero g (+ 3) y después f (x²)', 'في الأعلى: أولًا g (+ 3) ثم f (x²)', 'Top row: first g (+ 3) and then f (x²)'))}</Caption>
        </Figure>
    )
}

/* ---------- Hero ---------- */

export function BachFunctionsHeroArt() {
    return (
        <div className="fraction-v2-collage" aria-hidden="true">
            <svg viewBox="0 0 520 400" direction="ltr" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                <g transform="translate(24 28) rotate(-4)">
                    <rect width={270} height={210} rx={16} fill={PAPER} stroke={INK} strokeWidth={2} />
                    <line x1={20} y1={150} x2={255} y2={150} stroke={INK} strokeWidth={2} />
                    <line x1={110} y1={195} x2={110} y2={16} stroke={INK} strokeWidth={2} />
                    <line x1={40} y1={190} x2={230} y2={20} stroke="#58616e" strokeWidth={2.4} strokeDasharray="7 6" />
                    <path d="M110 170 Q 150 165 200 40" fill="none" stroke="#2f6fdb" strokeWidth={4} strokeLinecap="round" />
                    <path d="M90 150 Q 95 110 230 70" fill="none" stroke="#267b53" strokeWidth={4} strokeLinecap="round" />
                </g>
                <g transform="translate(316 52) rotate(5)">
                    <rect width={180} height={120} rx={16} fill="#d9efe2" stroke={INK} strokeWidth={2} />
                    <text x={90} y={74} textAnchor="middle" fontSize={34} fontWeight={700} fill={INK} fontFamily={SERIF}>f⁻¹</text>
                </g>
                <g transform="translate(60 272) rotate(2)">
                    <rect width={400} height={88} rx={16} fill="#f6d8cf" stroke={INK} strokeWidth={2} />
                    <text x={200} y={58} textAnchor="middle" fontSize={30} fontWeight={700} fill={INK} fontFamily={SERIF}>(f ∘ g)(x) = f(g(x))</text>
                </g>
            </svg>
        </div>
    )
}
